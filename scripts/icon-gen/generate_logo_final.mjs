/* eslint-disable */
import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import { ROOT, ensureDir } from "./icon-gen-paths.mjs";

// scripts/icon-gen/generate_logo_final.mjs
// Genera l'SVG finale del logo combinando Geometria G e Drone Geometrico.

const PROJECT_ROOT = ROOT;

// #region ========================================
// 1. CONFIGURATION & PARAMETERS
// ========================================
/**
 * Main configuration object for the static logo generation.
 * Modify these values to customize the logo appearance.
 * This configuration matches the DynamicLogo component for consistency.
 */
const CONFIG = {
    /** Output file path - generated in icons directory with other generated assets */
    outputPath: path.join(ROOT, "public", "icons", "logo.svg"),

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

        /** 
         * Color mode for drone.
         * If true: uses gradient end color (synced with bar end)
         * If false: uses customColor below
         */
        autoColor: true,
        customColor: '#4400feff' // Color when autoColor is false
    },

    /**
     * Color palette for gradient.
     * Define your colors here using hex format (#RRGGBB or #RRGGBBAA).
     */
    colors: {
        c1: '#9e3eff',  // Violet
        c2: '#00e5ff',  // Cyan
        c3: '#ff3ea5',  // Pink
        c4: '#ffac47'   // Orange
    },

    /**
     * Gradient configuration.
     * Controls color distribution along the path.
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
         * - c4→c1 from 75% to 100% (wraps for smooth rotation)
         */
        stops: [10, 20, 60, 90, 100],

        /**
         * Color shift (0-100%).
         * Change this to rotate the gradient along the path.
         * - 0: Default position
         * - 25: Rotated 25%
         * - 50: Rotated 50% (halfway)
         * - 100: Full rotation (same as 0)
         */
        shift: 84,

        /** Reverse the color sequence */
        reverse: false
    }
};
// #endregion

// #region 2. MATH HELPERS
const MathUtils = {
    degToRad: (deg) => (deg * Math.PI) / 180,
    radToDeg: (rad) => (rad * 180) / Math.PI,

    polarToCartesian: (cx, cy, radius, deg) => {
        const rad = MathUtils.degToRad(deg);
        return {
            x: cx + radius * Math.cos(rad),
            y: cy + radius * Math.sin(rad),
        };
    },

    angularDistanceCW: (start, end) => ((start - end) % 360 + 360) % 360,
    angularDistanceCCW: (start, end) => ((end - start) % 360 + 360) % 360,

    splitArc: (start, end, dir, maxSpan = 90) => {
        const segments = [];
        let current = start;
        const distFn = dir === "CW" ? MathUtils.angularDistanceCW : MathUtils.angularDistanceCCW;
        const stepFn = dir === "CW" ? (a, s) => a - s : (a, s) => a + s;

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
function mergeConfig(overrides = {}) {
    const merge = (base, extra = {}) => ({ ...base, ...extra });
    return {
        ...CONFIG,
        ...overrides,
        geometry: merge(CONFIG.geometry, overrides.geometry),
        drone: merge(CONFIG.drone, overrides.drone),
        colors: merge(CONFIG.colors, overrides.colors),
        gradient: merge(CONFIG.gradient, overrides.gradient),
    };
}

function createColorSystem(cfg) {
    const interpolate = (color1, color2, weight) => {
        const c1 = parseInt(color1.slice(1), 16);
        const c2 = parseInt(color2.slice(1), 16);
        const r = Math.round(((c1 >> 16) & 0xff) + (((c2 >> 16) & 0xff) - ((c1 >> 16) & 0xff)) * weight);
        const g = Math.round(((c1 >> 8) & 0xff) + (((c2 >> 8) & 0xff) - ((c1 >> 8) & 0xff)) * weight);
        const b = Math.round((c1 & 0xff) + ((c2 & 0xff) - (c1 & 0xff)) * weight);
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    };

    // Build color sequence with wrapping for smooth animation
    const seq = [...cfg.gradient.sequence];
    if (cfg.gradient.reverse) seq.reverse();

    // Add first color at end for wrapping
    const wrappedSeq = [...seq, seq[0]];
    const baseStops = cfg.gradient.stops;

    const getColorAtPct = (pct) => {
        // Apply shift and wrap (0-100)
        const normalizedPos = ((pct + (cfg.gradient.shift || 0)) % 100 + 100) % 100;

        // Find which segment we're in
        for (let i = 0; i < baseStops.length - 1; i++) {
            const stop1 = baseStops[i];
            const stop2 = baseStops[i + 1];

            if (normalizedPos >= stop1 && normalizedPos <= stop2) {
                const range = stop2 - stop1;
                const localT = range > 0 ? (normalizedPos - stop1) / range : 0;

                const c1 = cfg.colors[wrappedSeq[i]];
                const c2 = cfg.colors[wrappedSeq[i + 1]];

                if (!c1) return c2 || '#000000';
                if (!c2) return c1;

                return interpolate(c1, c2, localT);
            }
        }

        return cfg.colors[wrappedSeq[0]];
    };

    return { interpolate, getColorAtPct };
}
// #endregion

// #region 4. GEOMETRY ENGINE
function calculateGeometry(cfg) {
    const { R, r, cx, cy, gapDeg, barAngleDeg, innerTopAdjustDeg, barInset, innerBarScale } = cfg.geometry;

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

    return {
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
}
// #endregion

// #region 5. SVG BUILDER
class SVGBuilder {
    constructor(cfg, colorSystem) {
        this.cfg = cfg;
        this.colorSystem = colorSystem;
        this.defs = [];
        this.paths = [];
        this.gradCount = 0;
    }

    addGradient(start, end, colorStart, colorEnd) {
        const id = `g${this.gradCount++}`;
        this.defs.push(`
        <linearGradient id="${id}" x1="${start.x.toFixed(2)}" y1="${start.y.toFixed(2)}" x2="${end.x.toFixed(2)}" y2="${end.y.toFixed(2)}" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="${colorStart}" />
            <stop offset="100%" stop-color="${colorEnd}" />
        </linearGradient>`);
        return id;
    }

    addArc(radius, startDeg, endDeg, dir, pctRange) {
        const segments = MathUtils.splitArc(startDeg, endDeg, dir);
        const totalAngle = dir === "CW" ? MathUtils.angularDistanceCW(startDeg, endDeg) : MathUtils.angularDistanceCCW(startDeg, endDeg);

        let currentAngle = 0;
        segments.forEach(seg => {
            const segAngle = dir === "CW" ? MathUtils.angularDistanceCW(seg.start, seg.end) : MathUtils.angularDistanceCCW(seg.start, seg.end);
            const localStart = currentAngle / totalAngle;
            const localEnd = (currentAngle + segAngle) / totalAngle;
            const pctStart = pctRange.start + localStart * (pctRange.end - pctRange.start);
            const pctEnd = pctRange.start + localEnd * (pctRange.end - pctRange.start);
            const color1 = this.colorSystem.getColorAtPct(pctStart);
            const color2 = this.colorSystem.getColorAtPct(pctEnd);
            const p1 = MathUtils.polarToCartesian(this.cfg.geometry.cx, this.cfg.geometry.cy, radius, seg.start);
            const p2 = MathUtils.polarToCartesian(this.cfg.geometry.cx, this.cfg.geometry.cy, radius, seg.end);
            const gradId = this.addGradient(p1, p2, color1, color2);
            const d = `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} A ${radius} ${radius} 0 0 ${dir === "CW" ? 0 : 1} ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
            this.paths.push(`<path d="${d}" stroke="url(#${gradId})" />`);
            currentAngle += segAngle;
        });
    }

    addLine(p1, p2, pctStart, pctEnd) {
        const c1 = this.colorSystem.getColorAtPct(pctStart);
        const c2 = this.colorSystem.getColorAtPct(pctEnd);
        const gradId = this.addGradient(p1, p2, c1, c2);
        this.paths.push(`<path d="M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} L ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}" stroke="url(#${gradId})" />`);
    }

    addDrone(center) {
        const { circleRadius, armLength, strokeWidth, scale, offsetX, rotation, offsetY, autoColor, customColor } = this.cfg.drone;

        /**
         * Get drone color.
         * If autoColor is true, uses color at end of bar (99.9% to avoid wrapping to 0%).
         * This ensures the drone color matches the bar's end color exactly.
         */
        const color = autoColor ? this.colorSystem.getColorAtPct(99.9) : customColor;

        const angles = [45, 135, 225, 315];
        let dPaths = '';
        dPaths += `<circle cx="0" cy="0" r="${circleRadius}" />`;
        angles.forEach(ang => {
            const rad = MathUtils.degToRad(ang);
            const mx = armLength * Math.cos(rad);
            const my = armLength * Math.sin(rad);
            const ex = circleRadius * Math.cos(rad);
            const ey = circleRadius * Math.sin(rad);
            dPaths += `<path d="M ${mx.toFixed(1)} ${my.toFixed(1)} L ${ex.toFixed(1)} ${ey.toFixed(1)}" />`;
            dPaths += `<circle cx="${mx.toFixed(1)}" cy="${my.toFixed(1)}" r="${circleRadius}" />`;
        });
        const finalX = center.x + offsetX;
        const finalY = center.y + offsetY;
        return `
        <g transform="translate(${finalX.toFixed(2)}, ${finalY.toFixed(2)}) scale(${scale}) rotate(${rotation})" stroke="${color}" stroke-width="${strokeWidth}" fill="none" stroke-linecap="round" stroke-linejoin="round">
            ${dPaths}
        </g>`;
    }

    render(droneCenter) {
        const size = (this.cfg.geometry.R + 20) * 2;
        const half = size / 2;
        return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-half} ${-half} ${size} ${size}">
    <defs>${this.defs.join('')}</defs>
    <g fill="none" stroke-width="${this.cfg.strokeWidth}" stroke-linecap="round" stroke-linejoin="round">
        ${this.paths.join('\n        ')}
        ${this.cfg.drone.enabled ? this.addDrone(droneCenter) : ''}
    </g>
</svg>`;
    }
}
// #endregion

// #region 6. MAIN EXECUTION
export function buildLogoSvg(overrides = {}) {
    const cfg = mergeConfig(overrides);
    const colorSystem = createColorSystem(cfg);
    const geo = calculateGeometry(cfg);
    const builder = new SVGBuilder(cfg, colorSystem);
    const { R, r } = cfg.geometry;

    // Calcolo lunghezze reali per mappare il gradiente in modo lineare
    const distCCW = MathUtils.angularDistanceCCW(geo.inner.start, geo.inner.end);
    const distCW = MathUtils.angularDistanceCW(geo.outer.start, geo.outer.end);

    const lenInner = (distCCW * Math.PI / 180) * r;
    const lenBridge = Math.sqrt(Math.pow(geo.bridge.start.x - geo.bridge.end.x, 2) + Math.pow(geo.bridge.start.y - geo.bridge.end.y, 2));
    const lenOuter = (distCW * Math.PI / 180) * R;
    const lenBar = Math.sqrt(Math.pow(geo.bar.start.x - geo.bar.end.x, 2) + Math.pow(geo.bar.start.y - geo.bar.end.y, 2));

    const totalLen = lenInner + lenBridge + lenOuter + lenBar;

    // Percentuali cumulative
    const pInner = (lenInner / totalLen) * 100;
    const pBridge = pInner + (lenBridge / totalLen) * 100;
    const pOuter = pBridge + (lenOuter / totalLen) * 100;

    builder.addArc(r, geo.inner.start, geo.inner.end, "CCW", { start: 0, end: pInner });
    builder.addLine(geo.bridge.end, geo.bridge.start, pInner, pBridge);
    builder.addArc(R, geo.outer.start, geo.outer.end, "CW", { start: pBridge, end: pOuter });
    builder.addLine(geo.bar.start, geo.bar.end, pOuter, 100);

    return builder.render(geo.droneCenter);
}

function run() {
    console.log("Final logo generation...");
    const svg = buildLogoSvg();
    const publicDir = path.join(ROOT, "public");
    ensureDir(publicDir);
    fs.writeFileSync(CONFIG.outputPath, svg);
    console.log(`Saved: ${CONFIG.outputPath}`);
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
    run();
}
// #endregion
