"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

// #region ========================================
// 1. CONFIGURATION & PARAMETERS
// ========================================
/**
 * Main configuration object for the dynamic logo.
 * Modify these values to customize the logo appearance and animation.
 */
const CONFIG = {
    /** SVG stroke width in pixels */
    strokeWidth: 8,

    /** Geometric parameters for the 'G' shape */
    geometry: {
        R: 120,              // Outer radius
        r: 93,               // Inner radius
        cx: 0,               // Center X
        cy: 0,               // Center Y
        gapDeg: 25,          // Gap angle in degrees
        bridgeInset: 0.5,    // Bridge inset adjustment
        barAngleDeg: 3,      // Bar angle in degrees
        barInset: 1,         // Bar inset from outer arc
        innerBarScale: 0.68, // Bar length as fraction of R
        innerTopAdjustDeg: 13, // Inner arc top adjustment
    },

    /** Drone configuration */
    drone: {
        enabled: true,       // Show/hide drone
        scale: 1,            // Overall scale
        offsetX: 0,          // X offset from center
        offsetY: 5,          // Y offset from center
        rotation: 0,         // Rotation in degrees
        circleRadius: 14,    // Drone body radius
        armLength: 50,       // Drone arm length
        strokeWidth: 8,      // Drone stroke width

        /** Color mode for drone */
        autoColor: true,     // If true, uses gradient end color; if false, uses customColor
        customColor: '#4400feff', // Color when autoColor is false
    },

    /** 
     * Color palette for gradient.
     * Define your colors here using hex format.
     */
    colors: {
        c1: '#9e3eff',  // Violet
        c2: '#00e5ff',  // Cyan
        c3: '#ff3ea5',  // Pink
        c4: '#ffac47'   // Orange
    } as Record<string, string>,

    /**
     * Gradient configuration.
     * Controls color distribution and animation.
     */
    gradient: {
        /** 
         * Color sequence along the path.
         * Use keys from 'colors' object above.
         */
        sequence: ['c1', 'c2', 'c3', 'c4'],

        /**
         * Stop positions (0-100%).
         * Must have length = sequence.length + 1 for smooth wrapping.
         * Example: [0, 25, 50, 75, 100] creates 4 color transitions:
         * - c1→c2 from 0% to 25%
         * - c2→c3 from 25% to 50%
         * - c3→c4 from 50% to 75%
         * - c4→c1 from 75% to 100% (wraps for smooth animation)
         */
        stops: [0, 25, 50, 75, 100],

        /**
         * Initial shift value (0-100%).
         * Change this to rotate the gradient statically.
         */
        shift: 0,

        /**
         * Animation speed (percentage units per millisecond).
         * Positive = clockwise, Negative = counter-clockwise.
         * Example values:
         * - 0.01 = slow (current)
         * - 0.02 = medium
         * - 0.05 = fast
         */
        speed: 0.01,

        /** Reverse the color sequence */
        reverse: false
    }
};
// #endregion

// #region ========================================
// 2. MATH UTILITIES
// ========================================
const MathUtils = {
    degToRad: (deg: number) => (deg * Math.PI) / 180,
    radToDeg: (rad: number) => (rad * 180) / Math.PI,

    polarToCartesian: (cx: number, cy: number, radius: number, deg: number) => {
        const rad = MathUtils.degToRad(deg);
        return {
            x: cx + radius * Math.cos(rad),
            y: cy + radius * Math.sin(rad),
        };
    },

    angularDistanceCW: (start: number, end: number) => ((start - end) % 360 + 360) % 360,
    angularDistanceCCW: (start: number, end: number) => ((end - start) % 360 + 360) % 360,

    splitArc: (start: number, end: number, dir: "CW" | "CCW", maxSpan = 90) => {
        const segments = [];
        let current = start;
        const distFn = dir === "CW" ? MathUtils.angularDistanceCW : MathUtils.angularDistanceCCW;
        const stepFn = dir === "CW" ? (a: number, s: number) => a - s : (a: number, s: number) => a + s;

        while (true) {
            const rem = distFn(current, end);
            if (rem <= maxSpan) {
                segments.push({ start: current, end: end });
                break;
            }
            const next = stepFn(current, maxSpan);
            segments.push({ start: current, end: next });
            current = next;
        }
        return segments;
    }
};
// #endregion

// #region ========================================
// 3. COLOR SYSTEM
// ========================================
/**
 * Creates a color interpolation system based on CONFIG.
 * Handles smooth color transitions along the gradient path.
 */
const createColorSystem = () => {
    /** Interpolates between two hex colors */
    const interpolate = (color1: string, color2: string, weight: number) => {
        const parse = (c: string) => {
            const hex = c.replace('#', '');
            return {
                r: parseInt(hex.substring(0, 2), 16),
                g: parseInt(hex.substring(2, 4), 16),
                b: parseInt(hex.substring(4, 6), 16)
            };
        };

        const rgb1 = parse(color1);
        const rgb2 = parse(color2);

        const r = Math.round(rgb1.r + (rgb2.r - rgb1.r) * weight);
        const g = Math.round(rgb1.g + (rgb2.g - rgb1.g) * weight);
        const b = Math.round(rgb1.b + (rgb2.b - rgb1.b) * weight);

        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    };

    // Build color sequence with wrapping for smooth animation
    const seq = [...CONFIG.gradient.sequence];
    if (CONFIG.gradient.reverse) seq.reverse();

    // Add first color at end for seamless loop
    const wrappedSeq = [...seq, seq[0]];
    const baseStops = CONFIG.gradient.stops;

    /**
     * Gets color at a specific position (0-100%) with shift applied.
     * @param position - Position along gradient (0-100)
     * @returns Hex color string
     */
    const getColorAtPosition = (position: number) => {
        // Normalize position to 0-100 range
        const normalizedPos = ((position % 100) + 100) % 100;

        // Find which gradient segment we're in
        for (let i = 0; i < baseStops.length - 1; i++) {
            const stop1 = baseStops[i];
            const stop2 = baseStops[i + 1];

            if (normalizedPos >= stop1 && normalizedPos <= stop2) {
                const range = stop2 - stop1;
                const localT = range > 0 ? (normalizedPos - stop1) / range : 0;
                return interpolate(CONFIG.colors[wrappedSeq[i]], CONFIG.colors[wrappedSeq[i + 1]], localT);
            }
        }

        return CONFIG.colors[wrappedSeq[0]];
    };

    return { getColorAtPosition };
};
// #endregion

// #region ========================================
// 4. GEOMETRY ENGINE
// ========================================
/**
 * Calculates all geometric properties of the 'G' logo.
 * Returns coordinates for arcs, bridge, bar, and drone position.
 */
const calculateGeometry = () => {
    const { R, r, cx, cy, gapDeg, barAngleDeg, innerTopAdjustDeg, barInset, innerBarScale } = CONFIG.geometry;

    const outerStart = -gapDeg;
    const outerEnd = barAngleDeg;
    const absOuterStartRad = Math.abs(MathUtils.degToRad(outerStart));
    const sinInner = Math.max(-1, Math.min(1, (R / r) * Math.sin(absOuterStartRad)));
    const innerHalfGap = MathUtils.radToDeg(Math.asin(sinInner));
    const innerConn = -innerHalfGap;
    const innerTop = innerHalfGap + innerTopAdjustDeg;
    const pOuterBridge = MathUtils.polarToCartesian(cx, cy, R, outerStart);
    const pInnerBridge = MathUtils.polarToCartesian(cx, cy, r, innerConn);
    const yBridge = (pOuterBridge.y + pInnerBridge.y) / 2;
    const pBarOuter = MathUtils.polarToCartesian(cx, cy, R, barAngleDeg);
    const barLength = R * innerBarScale;
    const barStartX = pBarOuter.x - barInset;
    const barEndX = barStartX - barLength;
    const barY = pBarOuter.y;

    const geo = {
        outer: { start: outerStart, end: outerEnd },
        inner: { start: innerTop, end: innerConn },
        bridge: {
            start: { x: pOuterBridge.x - 0.5, y: yBridge },
            end: { x: pInnerBridge.x + 0.5, y: yBridge }
        },
        bar: {
            start: { x: barStartX, y: barY },
            end: { x: barEndX, y: barY }
        },
        droneCenter: {
            x: cx,
            y: cy
        }
    };

    // Calculate real arc lengths for accurate gradient mapping
    const distCCW = MathUtils.angularDistanceCCW(geo.inner.start, geo.inner.end);
    const distCW = MathUtils.angularDistanceCW(geo.outer.start, geo.outer.end);

    const lenInner = (distCCW * Math.PI / 180) * r;
    const lenBridge = Math.sqrt(Math.pow(geo.bridge.start.x - geo.bridge.end.x, 2) + Math.pow(geo.bridge.start.y - geo.bridge.end.y, 2));
    const lenOuter = (distCW * Math.PI / 180) * R;
    const lenBar = Math.sqrt(Math.pow(geo.bar.start.x - geo.bar.end.x, 2) + Math.pow(geo.bar.start.y - geo.bar.end.y, 2));

    const totalLen = lenInner + lenBridge + lenOuter + lenBar;

    return { ...geo, totalLen, lenInner, lenBridge, lenOuter, lenBar };
};
// #endregion

// #region ========================================
// 5. TYPESCRIPT INTERFACES
// ========================================
interface GradientDef {
    id: string;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    pctStart: number;  // Start position in path (0-100%)
    pctEnd: number;    // End position in path (0-100%)
}

interface PathDef {
    d: string;
    gradId: string;
}
// #endregion

// #region ========================================
// 6. MAIN COMPONENT
// ========================================
export default function DynamicLogo({ className }: { className?: string }) {
    // Animation state
    const requestRef = useRef<number>(0);
    const shiftRef = useRef<number>(CONFIG.gradient.shift);

    // React-managed gradient colors (triggers re-render on update)
    const [gradientStops, setGradientStops] = useState<Map<string, [string, string]>>(new Map());
    const [droneColor, setDroneColor] = useState<string>(CONFIG.drone.customColor);

    // #region Geometry & Path Generation (Memoized)
    /**
     * Generates all SVG paths and gradient definitions.
     * Memoized to avoid recalculation on every render.
     */
    const { paths, gradients, droneCenter, barEndPercent } = useMemo(() => {
        const geo = calculateGeometry();
        const { R, r, cx, cy } = CONFIG.geometry;

        const localPaths: PathDef[] = [];
        const localGrads: GradientDef[] = [];
        let gradCount = 0;

        /** Helper to create a gradient definition */
        const addGradient = (start: { x: number, y: number }, end: { x: number, y: number }, pctStart: number, pctEnd: number) => {
            const id = `g_dyn_${gradCount++}`;
            localGrads.push({
                id,
                x1: start.x, y1: start.y,
                x2: end.x, y2: end.y,
                pctStart, pctEnd
            });
            return id;
        };

        // Calculate cumulative percentages along path
        const pInner = (geo.lenInner / geo.totalLen) * 100;
        const pBridge = pInner + (geo.lenBridge / geo.totalLen) * 100;
        const pOuter = pBridge + (geo.lenOuter / geo.totalLen) * 100;

        // Inner Arc (CCW direction)
        const segsInner = MathUtils.splitArc(geo.inner.start, geo.inner.end, "CCW");
        let currentAngle = 0;
        const totalAngleInner = MathUtils.angularDistanceCCW(geo.inner.start, geo.inner.end);
        segsInner.forEach(seg => {
            const segAng = MathUtils.angularDistanceCCW(seg.start, seg.end);
            const lStart = currentAngle / totalAngleInner;
            const lEnd = (currentAngle + segAng) / totalAngleInner;
            const pctS = 0 + lStart * (pInner - 0);
            const pctE = 0 + lEnd * (pInner - 0);

            const p1 = MathUtils.polarToCartesian(cx, cy, r, seg.start);
            const p2 = MathUtils.polarToCartesian(cx, cy, r, seg.end);
            const gid = addGradient(p1, p2, pctS, pctE);
            const d = `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} A ${r} ${r} 0 0 1 ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
            localPaths.push({ d, gradId: gid });
            currentAngle += segAng;
        });

        // Bridge (straight line)
        const gidBridge = addGradient(geo.bridge.end, geo.bridge.start, pInner, pBridge);
        localPaths.push({ d: `M ${geo.bridge.end.x.toFixed(2)} ${geo.bridge.end.y.toFixed(2)} L ${geo.bridge.start.x.toFixed(2)} ${geo.bridge.start.y.toFixed(2)}`, gradId: gidBridge });

        // Outer Arc (CW direction)
        const segsOuter = MathUtils.splitArc(geo.outer.start, geo.outer.end, "CW");
        currentAngle = 0;
        const totalAngleOuter = MathUtils.angularDistanceCW(geo.outer.start, geo.outer.end);
        segsOuter.forEach(seg => {
            const segAng = MathUtils.angularDistanceCW(seg.start, seg.end);
            const lStart = currentAngle / totalAngleOuter;
            const lEnd = (currentAngle + segAng) / totalAngleOuter;
            const pctS = pBridge + lStart * (pOuter - pBridge);
            const pctE = pBridge + lEnd * (pOuter - pBridge);

            const p1 = MathUtils.polarToCartesian(cx, cy, R, seg.start);
            const p2 = MathUtils.polarToCartesian(cx, cy, R, seg.end);
            const gid = addGradient(p1, p2, pctS, pctE);
            const d = `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} A ${R} ${R} 0 0 0 ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
            localPaths.push({ d, gradId: gid });
            currentAngle += segAng;
        });

        // Bar (horizontal line) - this is where the drone connects
        const gidBar = addGradient(geo.bar.start, geo.bar.end, pOuter, 100);
        localPaths.push({ d: `M ${geo.bar.start.x.toFixed(2)} ${geo.bar.start.y.toFixed(2)} L ${geo.bar.end.x.toFixed(2)} ${geo.bar.end.y.toFixed(2)}`, gradId: gidBar });

        return {
            paths: localPaths,
            gradients: localGrads,
            droneCenter: geo.droneCenter,
            barEndPercent: 100 // Bar ends exactly at 100% of path
        };
    }, []);
    // #endregion

    const colorSystem = useMemo(() => createColorSystem(), []);

    // #region Animation Loop
    /**
     * Continuous animation loop that updates gradient colors.
     * Runs at ~60fps using requestAnimationFrame.
     */
    useEffect(() => {
        let lastTime = performance.now();

        const animate = (time: number) => {
            const delta = time - lastTime;
            lastTime = time;

            // Update shift value (creates rotation effect)
            shiftRef.current = (shiftRef.current + delta * CONFIG.gradient.speed) % 100;

            // Calculate new colors for ALL gradient stops
            const newStops = new Map<string, [string, string]>();
            gradients.forEach(g => {
                const c1 = colorSystem.getColorAtPosition(g.pctStart + shiftRef.current);
                const c2 = colorSystem.getColorAtPosition(g.pctEnd + shiftRef.current);
                newStops.set(g.id, [c1, c2]);
            });

            // Update gradient state (triggers React re-render)
            setGradientStops(newStops);

            // Update drone color (synced to end of bar at 100%)
            if (CONFIG.drone.autoColor) {
                // Use 99.9% instead of 100% to avoid wrapping to 0%
                // This ensures we get the actual end color before the loop
                const barEndPosition = 99.9;
                setDroneColor(colorSystem.getColorAtPosition(barEndPosition + shiftRef.current));
            }

            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, [colorSystem, gradients]);
    // #endregion

    // #region SVG Rendering
    const size = (CONFIG.geometry.R + 20) * 2;
    const half = size / 2;

    const { circleRadius, armLength, strokeWidth, scale, offsetX, offsetY, rotation } = CONFIG.drone;
    const dCenter = droneCenter || { x: 0, y: 0 };
    const finalX = dCenter.x + offsetX;
    const finalY = dCenter.y + offsetY;
    const droneStrokeColor = CONFIG.drone.autoColor ? droneColor : CONFIG.drone.customColor;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`${-half} ${-half} ${size} ${size}`}
            className={className}
        >
            <defs>
                {/* Generate linear gradients for each path segment */}
                {gradients.map(g => {
                    const colors = gradientStops.get(g.id) || ['#9e3eff', '#9e3eff'];
                    return (
                        <linearGradient
                            key={g.id}
                            id={g.id}
                            x1={g.x1}
                            y1={g.y1}
                            x2={g.x2}
                            y2={g.y2}
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop offset="0%" stopColor={colors[0]} />
                            <stop offset="100%" stopColor={colors[1]} />
                        </linearGradient>
                    );
                })}
            </defs>

            <g fill="none" strokeWidth={CONFIG.strokeWidth} strokeLinecap="round" strokeLinejoin="round">
                {/* Render all path segments */}
                {paths.map((p, i) => (
                    <path key={i} d={p.d} stroke={`url(#${p.gradId})`} />
                ))}

                {/* Render drone (if enabled) */}
                {CONFIG.drone.enabled && (
                    <g
                        id="dyn_drone_g"
                        transform={`translate(${finalX}, ${finalY}) scale(${scale}) rotate(${rotation})`}
                        strokeWidth={strokeWidth}
                        stroke={droneStrokeColor}
                    >
                        <circle cx="0" cy="0" r={circleRadius} />
                        {[45, 135, 225, 315].map(ang => {
                            const rad = MathUtils.degToRad(ang);
                            const mx = armLength * Math.cos(rad);
                            const my = armLength * Math.sin(rad);
                            const ex = circleRadius * Math.cos(rad);
                            const ey = circleRadius * Math.sin(rad);
                            return (
                                <React.Fragment key={ang}>
                                    <path d={`M ${mx.toFixed(1)} ${my.toFixed(1)} L ${ex.toFixed(1)} ${ey.toFixed(1)}`} />
                                    <circle cx={mx.toFixed(1)} cy={my.toFixed(1)} r={circleRadius} />
                                </React.Fragment>
                            );
                        })}
                    </g>
                )}
            </g>
        </svg>
    );
    // #endregion
}
// #endregion
