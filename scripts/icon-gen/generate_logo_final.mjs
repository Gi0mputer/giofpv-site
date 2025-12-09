import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import { PUBLIC_BRAND_DIR, ROOT, ensureDir } from "./icon-gen-paths.mjs";

// scripts/icon-gen/generate_logo_final.mjs
// Genera l'SVG finale del logo combinando Geometria G e Drone Geometrico.

const PROJECT_ROOT = ROOT;

// #region 1. CONFIGURATION
const CONFIG = {
    outputPath: path.join(PUBLIC_BRAND_DIR, "logo_final.svg"),
    strokeWidth: 8,

    geometry: {
        R: 120, // Raggio esterno
        r: 93,  // Raggio interno
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
        offsetX: 1,
        offsetY: 5,
        rotation: 0,
        circleRadius: 12,
        armLength: 48,
        strokeWidth: 8,
    },

    colors: {
        cyan: '#00e5ff',
        violet: '#9e3eff',
        pink: '#ff3ea5',
        orange: '#ff9900'
    },
    gradient: {
        start: 'cyan',
        end: 'orange',
        weights: { cyan: 30, orange: 70 }
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

    const getColorAtPct = (pct) => {
        const { start, end, weights } = cfg.gradient;
        const sW = weights[start];
        const colors = cfg.colors;

        if (pct <= sW) {
            return interpolate(colors[start], colors.violet, pct / sW);
        } else if (pct <= 50) {
            return interpolate(colors.violet, colors.pink, (pct - sW) / (50 - sW));
        } else {
            return interpolate(colors.pink, colors[end], (pct - 50) / 50);
        }
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
        const { circleRadius, armLength, strokeWidth, scale, offsetX, offsetY, rotation } = this.cfg.drone;
        const color = this.colorSystem.getColorAtPct(100);
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

    builder.addArc(r, geo.inner.start, geo.inner.end, "CCW", { start: 0, end: 45 });
    builder.addLine(geo.bridge.end, geo.bridge.start, 45, 55);
    builder.addArc(R, geo.outer.start, geo.outer.end, "CW", { start: 55, end: 90 });
    builder.addLine(geo.bar.start, geo.bar.end, 90, 100);

    return builder.render(geo.droneCenter);
}

function run() {
    console.log("Final logo generation...");
    const svg = buildLogoSvg();
    ensureDir(PUBLIC_BRAND_DIR);
    fs.writeFileSync(CONFIG.outputPath, svg);
    console.log(`Saved: ${CONFIG.outputPath}`);
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
    run();
}
// #endregion
