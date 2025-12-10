"use client";

import React, { useEffect, useMemo, useRef } from "react";

// #region 1. CONFIGURATION (Synced with generate_logo_final.mjs)
const CONFIG = {
    strokeWidth: 8,
    geometry: {
        R: 120,
        r: 93,
        cx: 0,
        cy: 0,
        gapDeg: 25,
        bridgeInset: 0.5,
        barAngleDeg: 3,
        barInset: 1,
        innerBarScale: 0.68,
        innerTopAdjustDeg: 13,
    },
    drone: {
        enabled: true,
        scale: 1,
        offsetX: 0,
        offsetY: 5,
        rotation: 0,
        circleRadius: 14,
        armLength: 50,
        strokeWidth: 8,
        autoColor: false,
        customColor: '#4400feff',
    },
    colors: {
        c1: '#9e3eff',
        c2: '#00e5ff',
        c3: '#ff3ea5',
        c4: '#ffac47'
    } as Record<string, string>,
    gradient: {
        sequence: ['c1', 'c2', 'c3', 'c4'],
        stops: [17, 33, 40, 80],
        weights: [10, 10, 10, 30] as number[], // Add fallback weights to type
        shift: 40, // Base shift
        reverse: false
    }
};
// #endregion

// #region 2. MATH HELPERS
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

// #region 3. COLOR SYSTEM
const createColorSystem = () => {
    const interpolate = (color1: string, color2: string, weight: number) => {
        const parse = (c: string) => {
            const hex = c.replace('#', '');
            if (hex.length === 8) {
                return {
                    r: parseInt(hex.substring(0, 2), 16),
                    g: parseInt(hex.substring(2, 4), 16),
                    b: parseInt(hex.substring(4, 6), 16)
                };
            }
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

    let stops: number[] = [];
    const seq = [...CONFIG.gradient.sequence];
    const userStops = CONFIG.gradient.stops ? [...CONFIG.gradient.stops] : null;
    const weights = CONFIG.gradient.weights ? [...CONFIG.gradient.weights] : [];

    if (CONFIG.gradient.reverse) {
        seq.reverse();
        if (userStops) {
            userStops.reverse();
            for (let i = 0; i < userStops.length; i++) userStops[i] = 100 - userStops[i];
        }
        if (weights.length > 0) weights.reverse();
    }

    if (userStops && userStops.length === seq.length) {
        stops = userStops.map(s => s / 100);
    } else if (weights && weights.length >= seq.length) {
        const intervals = weights.slice(0, seq.length - 1);
        const totalDist = intervals.reduce((a, b) => a + b, 0) || 1;
        stops = [0];
        let acc = 0;
        for (const w of intervals) {
            acc += w;
            stops.push(acc / totalDist);
        }
    } else {
        stops = seq.map((_, i) => i / Math.max(1, seq.length - 1));
    }

    const getColorAtPct = (pct: number, shift: number) => {
        let shifted = pct + shift;
        let tPct = shifted % 100;
        const t = Math.max(0, Math.min(1, tPct / 100));

        if (t <= stops[0]) return CONFIG.colors[seq[0]];
        if (t >= stops[stops.length - 1]) return CONFIG.colors[seq[seq.length - 1]];

        for (let i = 0; i < stops.length - 1; i++) {
            if (t >= stops[i] && t <= stops[i + 1]) {
                const range = stops[i + 1] - stops[i];
                const localT = (t - stops[i]) / (range || 1);
                return interpolate(CONFIG.colors[seq[i]], CONFIG.colors[seq[i + 1]], localT);
            }
        }
        return CONFIG.colors[seq[seq.length - 1]];
    };

    return { getColorAtPct };
};
// #endregion

// #region 4. GEOMETRY ENGINE
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

    // Calculate Real Lengths
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

// #region 5. COMPONENT
interface GradientDef {
    id: string;
    x1: number; y1: number;
    x2: number; y2: number;
    pctStart: number;
    pctEnd: number;
}

interface PathDef {
    d: string;
    gradId: string;
}

export default function DynamicLogo({ className }: { className?: string }) {
    // References to stop elements for direct DOM manipulation
    const stopsRef = useRef<Map<string, SVGStopElement>>(new Map());
    const requestRef = useRef<number>();
    const shiftRef = useRef<number>(CONFIG.gradient.shift);

    // 1. Static Geometry Calculation (Memoized)
    const { paths, gradients, droneCenter } = useMemo(() => {
        const geo = calculateGeometry();
        const { R, r } = CONFIG.geometry;

        const localPaths: PathDef[] = [];
        const localGrads: GradientDef[] = [];
        let gradCount = 0;

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

        // --- Build Segments ---
        // Percentages
        const pInner = (geo.lenInner / geo.totalLen) * 100;
        const pBridge = pInner + (geo.lenBridge / geo.totalLen) * 100;
        const pOuter = pBridge + (geo.lenOuter / geo.totalLen) * 100;

        // Inner Arc (CCW)
        const segsInner = MathUtils.splitArc(geo.inner.start, geo.inner.end, "CCW");
        let currentAngle = 0;
        const totalAngleInner = MathUtils.angularDistanceCCW(geo.inner.start, geo.inner.end);
        segsInner.forEach(seg => {
            const segAng = MathUtils.angularDistanceCCW(seg.start, seg.end);
            const lStart = currentAngle / totalAngleInner;
            const lEnd = (currentAngle + segAng) / totalAngleInner;
            const pctS = 0 + lStart * (pInner - 0);
            const pctE = 0 + lEnd * (pInner - 0);

            const p1 = MathUtils.polarToCartesian(CONFIG.geometry.cx, CONFIG.geometry.cy, r, seg.start);
            const p2 = MathUtils.polarToCartesian(CONFIG.geometry.cx, CONFIG.geometry.cy, r, seg.end);
            const gid = addGradient(p1, p2, pctS, pctE);
            const d = `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} A ${r} ${r} 0 0 1 ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
            localPaths.push({ d, gradId: gid });
            currentAngle += segAng;
        });

        // Bridge
        const gidBridge = addGradient(geo.bridge.end, geo.bridge.start, pInner, pBridge);
        localPaths.push({ d: `M ${geo.bridge.end.x.toFixed(2)} ${geo.bridge.end.y.toFixed(2)} L ${geo.bridge.start.x.toFixed(2)} ${geo.bridge.start.y.toFixed(2)}`, gradId: gidBridge });

        // Outer Arc (CW)
        const segsOuter = MathUtils.splitArc(geo.outer.start, geo.outer.end, "CW");
        currentAngle = 0;
        const totalAngleOuter = MathUtils.angularDistanceCW(geo.outer.start, geo.outer.end);
        segsOuter.forEach(seg => {
            const segAng = MathUtils.angularDistanceCW(seg.start, seg.end);
            const lStart = currentAngle / totalAngleOuter;
            const lEnd = (currentAngle + segAng) / totalAngleOuter;
            const pctS = pBridge + lStart * (pOuter - pBridge);
            const pctE = pBridge + lEnd * (pOuter - pBridge);

            const p1 = MathUtils.polarToCartesian(CONFIG.geometry.cx, CONFIG.geometry.cy, R, seg.start);
            const p2 = MathUtils.polarToCartesian(CONFIG.geometry.cx, CONFIG.geometry.cy, R, seg.end);
            const gid = addGradient(p1, p2, pctS, pctE);
            const d = `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} A ${R} ${R} 0 0 0 ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
            localPaths.push({ d, gradId: gid });
            currentAngle += segAng;
        });

        // Bar
        const gidBar = addGradient(geo.bar.start, geo.bar.end, pOuter, 100);
        localPaths.push({ d: `M ${geo.bar.start.x.toFixed(2)} ${geo.bar.start.y.toFixed(2)} L ${geo.bar.end.x.toFixed(2)} ${geo.bar.end.y.toFixed(2)}`, gradId: gidBar });

        // --- Drone ---
        const { circleRadius, armLength } = CONFIG.drone;
        const angles = [45, 135, 225, 315];
        let dDrone = `M ${geo.droneCenter.x + circleRadius} ${geo.droneCenter.y} A ${circleRadius} ${circleRadius} 0 1 0 ${geo.droneCenter.x - circleRadius} ${geo.droneCenter.y} A ${circleRadius} ${circleRadius} 0 1 0 ${geo.droneCenter.x + circleRadius} ${geo.droneCenter.y} `; // Main circle approximation or just use <circle>
        // Actually better to return structure for cleaner render

        return { paths: localPaths, gradients: localGrads, droneCenter: geo.droneCenter };
    }, []);

    const colorSystem = useMemo(() => createColorSystem(), []);

    // 2. Animation Loop
    useEffect(() => {
        let lastTime = performance.now();
        const SPEED = 0.01; // Speed of color shift (points per ms) => 10 points per second?
        // Let's make it slow and smooth. 0.05 per frame (approx 3 per sec) -> 33 secs for full loop?
        // User requested "shift moving".

        const animate = (time: number) => {
            const delta = time - lastTime;
            lastTime = time;

            // Update shift
            // Adjust speed here. 5 full cycles per minute? 
            // 100 units / 12000ms = 0.008
            shiftRef.current = (shiftRef.current + delta * 0.02) % 100;

            // Update Stops
            gradients.forEach(g => {
                const c1 = colorSystem.getColorAtPct(g.pctStart, shiftRef.current);
                const c2 = colorSystem.getColorAtPct(g.pctEnd, shiftRef.current);

                const el1 = stopsRef.current.get(`${g.id}-start`);
                const el2 = stopsRef.current.get(`${g.id}-end`);
                if (el1) el1.setAttribute('stop-color', c1);
                if (el2) el2.setAttribute('stop-color', c2);
            });

            // Update Drone Color
            if (CONFIG.drone.enabled) {
                const droneColor = CONFIG.drone.autoColor
                    ? colorSystem.getColorAtPct(100, shiftRef.current)
                    : CONFIG.drone.customColor;

                const droneEl = document.getElementById('dyn_drone_g'); // Easy ID access
                if (droneEl) droneEl.setAttribute('stroke', droneColor);
            }

            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current!);
    }, [colorSystem, gradients]);


    // Render
    const size = (CONFIG.geometry.R + 20) * 2;
    const half = size / 2;

    // Drone SVG construction
    const { circleRadius, armLength, strokeWidth, scale, offsetX, offsetY, rotation } = CONFIG.drone;
    const dCenter = droneCenter || { x: 0, y: 0 };
    const finalX = dCenter.x + offsetX;
    const finalY = dCenter.y + offsetY;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`${-half} ${-half} ${size} ${size}`}
            className={className}
        >
            <defs>
                {gradients.map(g => (
                    <linearGradient
                        key={g.id} id={g.id}
                        x1={g.x1.toFixed(2)} y1={g.y1.toFixed(2)}
                        x2={g.x2.toFixed(2)} y2={g.y2.toFixed(2)}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0%" ref={(el) => { if (el) stopsRef.current.set(`${g.id}-start`, el); }} />
                        <stop offset="100%" ref={(el) => { if (el) stopsRef.current.set(`${g.id}-end`, el); }} />
                    </linearGradient>
                ))}
            </defs>

            <g fill="none" strokeWidth={CONFIG.strokeWidth} strokeLinecap="round" strokeLinejoin="round">
                {paths.map((p, i) => (
                    <path key={i} d={p.d} stroke={`url(#${p.gradId})`} />
                ))}

                {CONFIG.drone.enabled && (
                    <g
                        id="dyn_drone_g"
                        transform={`translate(${finalX}, ${finalY}) scale(${scale}) rotate(${rotation})`}
                        strokeWidth={strokeWidth}
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
}
