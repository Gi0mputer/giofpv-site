import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

// scripts/generate_logo_final.mjs
// Genera l'SVG finale del logo combinando Geometria G e Drone Geometrico.
// Configurazione completa all'inizio del file.

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

// #region 1. CONFIGURATION
// =============================================================================
const CONFIG = {
    outputPath: path.join(PROJECT_ROOT, "public", "logo_final.svg"),
    strokeWidth: 8,

    // -------------------------------------------------------------------------
    // GEOMETRIA "G" (Parametri Originali)
    // -------------------------------------------------------------------------
    geometry: {
        // Dimensioni Cerchi
        R: 120, // Raggio esterno
        r: 93,  // Raggio interno
        cx: 0,
        cy: 0,

        // Geometria Taglio
        gapDeg: 25,          // Ampiezza taglio
        bridgeInset: 0.5,    // Correzione bump connessione

        // Geometria "G" Bar
        barAngleDeg: 3,      // Angolo coda G ('Stanghetta Grande')
        barInset: 1,         // Correzione bump G
        innerBarScale: 0.68, // Lunghezza stanghetta relativa a R
        innerTopAdjustDeg: 13, // Aggiustamento arco interno
    },

    // -------------------------------------------------------------------------
    // DRONE GEOMETRICO
    // -------------------------------------------------------------------------
    drone: {
        enabled: true,
        scale: 0.65,
        offsetX: 0,      // Spostamento X rispetto al centro della stanghetta
        offsetY: 0,      // Spostamento Y rispetto al centro della stanghetta
        rotation: 0,     // Rotazione extra in gradi

        // Geometria interna del drone
        circleRadius: 12,
        armLength: 48,
        strokeWidth: 8,
    },

    // -------------------------------------------------------------------------
    // COLORI & TRANSIZIONI (Weighted)
    // -------------------------------------------------------------------------
    colors: {
        cyan: '#00e5ff',
        violet: '#9e3eff',
        pink: '#ff3ea5',
        orange: '#ff9900'
    },
    gradient: {
        start: 'cyan',
        end: 'orange',
        // Pesi: minore è il valore, più veloce è la transizione iniziale
        // Cyan 30% -> Orange 70%
        weights: { cyan: 30, orange: 70 }
    }
};
// #endregion


// #region 2. MATH HELPERS
// =============================================================================
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

    // Suddivide un arco in segmenti per gestire il gradiente
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
// =============================================================================
const ColorSystem = {
    interpolate: (color1, color2, weight) => {
        const c1 = parseInt(color1.slice(1), 16);
        const c2 = parseInt(color2.slice(1), 16);
        const r = Math.round(((c1 >> 16) & 0xff) + (((c2 >> 16) & 0xff) - ((c1 >> 16) & 0xff)) * weight);
        const g = Math.round(((c1 >> 8) & 0xff) + (((c2 >> 8) & 0xff) - ((c1 >> 8) & 0xff)) * weight);
        const b = Math.round((c1 & 0xff) + ((c2 & 0xff) - (c1 & 0xff)) * weight);
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    },

    // Calcola il colore basato sulla percentuale del percorso (0-100)
    getColorAtPct: (pct) => {
        const { start, end, weights } = CONFIG.gradient;
        const sW = weights[start];
        const colors = CONFIG.colors;

        if (pct <= sW) {
            return ColorSystem.interpolate(colors[start], colors.violet, pct / sW);
        } else if (pct <= 50) {
            return ColorSystem.interpolate(colors.violet, colors.pink, (pct - sW) / (50 - sW));
        } else {
            return ColorSystem.interpolate(colors.pink, colors[end], (pct - 50) / 50);
        }
    }
};
// #endregion


// #region 4. GEOMETRY ENGINE
// =============================================================================
function calculateGeometry() {
    const { R, r, cx, cy, gapDeg, barAngleDeg, innerTopAdjustDeg, barInset, innerBarScale } = CONFIG.geometry;

    // 1. Arco Esterno (Start -> End)
    const outerStart = -gapDeg;
    const outerEnd = barAngleDeg;

    // 2. Arco Interno (Start -> End)
    const absOuterStartRad = Math.abs(MathUtils.degToRad(outerStart));
    const sinInner = Math.max(-1, Math.min(1, (R / r) * Math.sin(absOuterStartRad)));
    const innerHalfGap = MathUtils.radToDeg(Math.asin(sinInner));

    const innerConn = -innerHalfGap; // Punto basso
    const innerTop = innerHalfGap + innerTopAdjustDeg; // Punto alto

    // 3. Ponte (Bridge)
    const pOuterBridge = MathUtils.polarToCartesian(cx, cy, R, outerStart);
    const pInnerBridge = MathUtils.polarToCartesian(cx, cy, r, innerConn);
    const yBridge = (pOuterBridge.y + pInnerBridge.y) / 2;

    // 4. Stanghetta G (Bar)
    const pBarOuter = MathUtils.polarToCartesian(cx, cy, R, barAngleDeg);
    // Usa innerBarScale per coerenza col vecchio script
    const barLength = R * innerBarScale;
    const barStartX = pBarOuter.x - barInset;
    const barEndX = barStartX - barLength;
    const barY = pBarOuter.y;

    return {
        // Arcs defined by Angles
        outer: { start: outerStart, end: outerEnd },
        inner: { start: innerTop, end: innerConn },

        // Lines defined by Points
        bridge: {
            start: { x: pOuterBridge.x - 0.5, y: yBridge },
            end: { x: pInnerBridge.x + 0.5, y: yBridge }
        },
        bar: {
            start: { x: barStartX, y: barY },
            end: { x: barEndX, y: barY }
        },

        // Drone Center (Midpoint of Bar)
        droneCenter: {
            x: (barStartX + barEndX) / 2,
            y: barY
        }
    };
}
// #endregion


// #region 5. SVG BUILDER
// =============================================================================
class SVGBuilder {
    constructor() {
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

    // Aggiunge un arco con gradiente spezzato in segmenti
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

            const color1 = ColorSystem.getColorAtPct(pctStart);
            const color2 = ColorSystem.getColorAtPct(pctEnd);

            const p1 = MathUtils.polarToCartesian(CONFIG.geometry.cx, CONFIG.geometry.cy, radius, seg.start);
            const p2 = MathUtils.polarToCartesian(CONFIG.geometry.cx, CONFIG.geometry.cy, radius, seg.end);

            const gradId = this.addGradient(p1, p2, color1, color2);
            const d = `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} A ${radius} ${radius} 0 0 ${dir === "CW" ? 0 : 1} ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;

            this.paths.push(`<path d="${d}" stroke="url(#${gradId})" />`);
            currentAngle += segAngle;
        });
    }

    // Aggiunge una linea con gradiente
    addLine(p1, p2, pctStart, pctEnd) {
        const c1 = ColorSystem.getColorAtPct(pctStart);
        const c2 = ColorSystem.getColorAtPct(pctEnd);
        const gradId = this.addGradient(p1, p2, c1, c2);
        this.paths.push(`<path d="M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} L ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}" stroke="url(#${gradId})" />`);
    }

    // Genera l'SVG per il drone geometrico
    addDrone(center) {
        const { circleRadius, armLength, strokeWidth, scale, offsetX, offsetY, rotation } = CONFIG.drone;
        const color = ColorSystem.getColorAtPct(100);

        const angles = [45, 135, 225, 315];
        let dPaths = '';

        dPaths += `<circle cx="0" cy="0" r="${circleRadius}" />`; // Body

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
        const size = (CONFIG.geometry.R + 20) * 2;
        const half = size / 2;

        return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-half} ${-half} ${size} ${size}">
    <defs>${this.defs.join('')}</defs>
    <g fill="none" stroke-width="${CONFIG.strokeWidth}" stroke-linecap="round" stroke-linejoin="round">
        ${this.paths.join('\n        ')}
        ${CONFIG.drone.enabled ? this.addDrone(droneCenter) : ''}
    </g>
</svg>`;
    }
}
// #endregion


// #region 6. MAIN EXECUTION
// =============================================================================
function main() {
    console.log("🚀 Generating Final Logo...");
    const geo = calculateGeometry();
    const builder = new SVGBuilder();
    const { R, r } = CONFIG.geometry;

    // DEFINIZIONE PERCORSO E PERCENTUALI COLORE (0-100%)

    // 1. Inner Arc (Bottom Right -> Top Right) [0% - 45%]
    builder.addArc(r, geo.inner.start, geo.inner.end, "CCW", { start: 0, end: 45 });

    // 2. Bridge (Inner -> Outer) [45% - 55%]
    builder.addLine(geo.bridge.end, geo.bridge.start, 45, 55);

    // 3. Outer Arc (Top -> Right) [55% - 90%]
    builder.addArc(R, geo.outer.start, geo.outer.end, "CW", { start: 55, end: 90 });

    // 4. Bar (Right Outer -> Right Inner) [90% - 100%]
    builder.addLine(geo.bar.start, geo.bar.end, 90, 100);

    // 5. Render
    const svg = builder.render(geo.droneCenter);

    fs.writeFileSync(CONFIG.outputPath, svg);
    console.log(`✅ Saved: ${CONFIG.outputPath}`);
}

main();
// #endregion
