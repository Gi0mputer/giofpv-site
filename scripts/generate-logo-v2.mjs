import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

// scripts/generate-logo-v2.mjs
// Genera l'SVG del logo con fix definitivi.

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

// #region Configuration
const CONFIG = {
    enableGradient: true,
    strokeColor: "#ffffff",
    strokeWidth: 8,
    R: 120, r: 93,
    cx: 0, cy: 0,
    gapDeg: 25, bridgeInset: 0.5,
    barAngleDeg: 3, barInset: 1, innerBarScale: 0.68, innerTopAdjustDeg: 13,
    drone: {
        size: 250, offsetX: 0, offsetY: 1,
        fill: "#ffffff", opacity: 1,
        path: path.join(PROJECT_ROOT, "assets", "drone-mask.png"),
    },
    colorsPath: path.join(PROJECT_ROOT, "app", "theme", "colors.json"),
};
// #endregion

// #region Math Helpers
const MathUtils = {
    degToRad: (deg) => (deg * Math.PI) / 180,
    radToDeg: (rad) => (rad * 180) / Math.PI,
    polarToCartesian: (cx, cy, radius, deg) => {
        const rad = MathUtils.degToRad(deg);
        return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
    },
    angularDistanceCW: (start, end) => ((start - end) % 360 + 360) % 360,
    angularDistanceCCW: (start, end) => ((end - start) % 360 + 360) % 360,
    midAngle: (start, end, dir, t = 0.5) => {
        const dist = dir === "CW" ? -MathUtils.angularDistanceCW(start, end) : MathUtils.angularDistanceCCW(start, end);
        return start + dist * t;
    },
    splitArc: (start, end, dir, maxSpan = 90) => {
        const segments = [];
        let current = start;
        const span = Math.max(1, maxSpan);
        const distFn = dir === "CW" ? MathUtils.angularDistanceCW : MathUtils.angularDistanceCCW;
        const advFn = dir === "CW" ? (a, s) => a - s : (a, s) => a + s;
        while (true) {
            if (distFn(current, end) <= span) { segments.push({ start: current, end }); break; }
            const next = advFn(current, span);
            segments.push({ start: current, end: next });
            current = next;
        }
        return segments;
    },
    svgArcPath: (cx, cy, r, start, end, dir) => {
        const s = MathUtils.polarToCartesian(cx, cy, r, start);
        const e = MathUtils.polarToCartesian(cx, cy, r, end);
        const sweep = dir === "CW" ? 0 : 1;
        const delta = dir === "CW" ? MathUtils.angularDistanceCW(start, end) : MathUtils.angularDistanceCCW(start, end);
        const large = delta > 180 ? 1 : 0;
        return `M ${s.x.toFixed(3)} ${s.y.toFixed(3)} A ${r} ${r} 0 ${large} ${sweep} ${e.x.toFixed(3)} ${e.y.toFixed(3)}`;
    }
};
// #endregion

// #region Color System
const ColorSystem = {
    loadPalette: () => {
        try {
            const raw = fs.readFileSync(CONFIG.colorsPath, "utf8");
            const json = JSON.parse(raw);
            return { c1: json.logo[0], c2: json.logo[1], c3: json.logo[2] };
        } catch { return { c1: "#fbbf24", c2: "#0ea5e9", c3: "#a855f7" }; }
    },
    hexToRgb: (h) => {
        const n = parseInt(h.replace("#", ""), 16);
        return { r: (n >> 16) & 0xff, g: (n >> 8) & 0xff, b: n & 0xff };
    },
    rgbToHex: ({ r, g, b }) => `#${[r, g, b].map(x => Math.round(x).toString(16).padStart(2, "0")).join("")}`,
    mix: (a, b, t) => {
        const c1 = ColorSystem.hexToRgb(a), c2 = ColorSystem.hexToRgb(b);
        return ColorSystem.rgbToHex({ r: c1.r + (c2.r - c1.r) * t, g: c1.g + (c2.g - c1.g) * t, b: c1.b + (c2.b - c1.b) * t });
    },
    getColorAtAngle: (angle) => {
        const p = ColorSystem.loadPalette();
        const sky = ColorSystem.mix(p.c2, "#ffffff", 0.2), vio = ColorSystem.mix(p.c3, "#ffffff", 0.12);
        const stops = [
            { s: 0, c: p.c1 }, { s: 0.35, c: p.c1 }, { s: 0.52, c: p.c2 },
            { s: 0.64, c: sky }, { s: 0.82, c: p.c3 }, { s: 0.94, c: vio }, { s: 1, c: p.c1 }
        ];
        const norm = (angle + 25 + 360) % 360; // gapDeg is 25
        const t = ((360 - norm) % 360) / 360;
        const w = ((t % 1) + 1) % 1;
        for (let i = 0; i < stops.length - 1; i++) {
            if (w >= stops[i].s && w <= stops[i + 1].s) {
                return ColorSystem.mix(stops[i].c, stops[i + 1].c, (w - stops[i].s) / (stops[i + 1].s - stops[i].s || 1));
            }
        }
        return stops[0].c;
    }
};
// #endregion

// #region Geometry
function calculateLogoGeometry() {
    const { R, r, gapDeg, barAngleDeg, cx, cy, bridgeInset, barInset, innerBarScale, innerTopAdjustDeg } = CONFIG;
    const outerStartDeg = -gapDeg, outerEndDeg = barAngleDeg;
    const absOuterStartRad = Math.abs(MathUtils.degToRad(outerStartDeg));
    let sinInner = (R / r) * Math.sin(absOuterStartRad);
    sinInner = Math.max(-1, Math.min(1, sinInner));
    const innerHalfGapDeg = MathUtils.radToDeg(Math.asin(sinInner));
    const innerConnDeg = -innerHalfGapDeg, innerTopDeg = innerHalfGapDeg + innerTopAdjustDeg;
    const outerBridgePoint = MathUtils.polarToCartesian(cx, cy, R, outerStartDeg);
    const innerBridgePoint = MathUtils.polarToCartesian(cx, cy, r, innerConnDeg);
    const yBridge = (outerBridgePoint.y + innerBridgePoint.y) / 2;
    const outerBarPoint = MathUtils.polarToCartesian(cx, cy, R, barAngleDeg);
    const barY = outerBarPoint.y, barStartX = outerBarPoint.x - barInset, barEndX = barStartX - R * innerBarScale;
    return {
        outer: { start: outerStartDeg, end: outerEndDeg },
        inner: { start: innerTopDeg, end: innerConnDeg },
        bridge: { start: { x: outerBridgePoint.x - bridgeInset, y: yBridge }, end: { x: innerBridgePoint.x + bridgeInset, y: yBridge } },
        bar: { start: { x: barStartX, y: barY }, end: { x: barEndX, y: barY } }
    };
}
// #endregion

// #region SVG Builder
class SVGBuilder {
    constructor() { this.defs = []; this.paths = []; this.gCount = 0; }
    addGradient(s, e, stops) {
        if (!CONFIG.enableGradient) return null;
        const id = `grad-${this.gCount++}`;
        const st = stops.map(x => `<stop offset="${(x.offset * 100).toFixed(1)}%" stop-color="${x.color}" />`).join("");
        this.defs.push(`<linearGradient id="${id}" x1="${s.x.toFixed(3)}" y1="${s.y.toFixed(3)}" x2="${e.x.toFixed(3)}" y2="${e.y.toFixed(3)}" gradientUnits="userSpaceOnUse">${st}</linearGradient>`);
        return id;
    }
    addArc(r, s, e, dir, span = 90) {
        MathUtils.splitArc(s, e, dir, span).forEach(seg => {
            const pS = MathUtils.polarToCartesian(CONFIG.cx, CONFIG.cy, r, seg.start);
            const pE = MathUtils.polarToCartesian(CONFIG.cx, CONFIG.cy, r, seg.end);
            const mid = MathUtils.midAngle(seg.start, seg.end, dir);
            const gid = this.addGradient(pS, pE, [
                { offset: 0, color: ColorSystem.getColorAtAngle(seg.start) },
                { offset: 0.5, color: ColorSystem.getColorAtAngle(mid) },
                { offset: 1, color: ColorSystem.getColorAtAngle(seg.end) }
            ]);
            this.paths.push({ d: MathUtils.svgArcPath(CONFIG.cx, CONFIG.cy, r, seg.start, seg.end, dir), s: gid });
        });
    }
    addLine(pb, pe) {
        const pm = { x: (pb.x + pe.x) / 2, y: (pb.y + pe.y) / 2 };
        const gid = this.addGradient(pb, pe, [
            { offset: 0, color: ColorSystem.getColorAtAngle(MathUtils.radToDeg(Math.atan2(pb.y, pb.x))) },
            { offset: 0.5, color: ColorSystem.getColorAtAngle(MathUtils.radToDeg(Math.atan2(pm.y, pm.x))) },
            { offset: 1, color: ColorSystem.getColorAtAngle(MathUtils.radToDeg(Math.atan2(pe.y, pe.x))) }
        ]);
        this.paths.push({ d: `M ${pb.x.toFixed(3)} ${pb.y.toFixed(3)} L ${pe.x.toFixed(3)} ${pe.y.toFixed(3)}`, s: gid });
    }
    render() {
        // DRONE MASK
        let droneSvg = "";
        if (fs.existsSync(CONFIG.drone.path)) {
            const b64 = fs.readFileSync(CONFIG.drone.path).toString("base64");
            const { size, offsetX, offsetY } = CONFIG.drone;
            this.defs.push(`<mask id="drone-mask" x="${-size / 2}" y="${-size / 2}" width="${size}" height="${size}" maskUnits="userSpaceOnUse"><image href="data:image/png;base64,${b64}" x="${-size / 2}" y="${-size / 2}" width="${size}" height="${size}" /></mask>`);
            droneSvg = `<g mask="url(#drone-mask)" transform="translate(${offsetX}, ${offsetY})"><rect x="${-size / 2}" y="${-size / 2}" width="${size}" height="${size}" fill="${CONFIG.drone.fill}" opacity="${CONFIG.drone.opacity}" /></g>`;
        }
        // PATHS - THE FIX IS HERE
        const pathsSvg = this.paths.map(p => {
            const sVal = p.s ? `url(#${p.s})` : CONFIG.strokeColor;
            return `<path d="${p.d}" stroke="${sVal}" />`; // QUOTES ADDED
        }).join("\n    ");

        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-133} ${-133} ${266} ${266}">
<defs>
${this.defs.join("\n")}
</defs>
${droneSvg}
<g fill="none" stroke-width="${CONFIG.strokeWidth}" stroke-linecap="round" stroke-linejoin="round">
    ${pathsSvg}
</g>
</svg>`;
    }
}
// #endregion

// #region Main
function main() {
    const geo = calculateLogoGeometry();
    const builder = new SVGBuilder();
    builder.addArc(CONFIG.R, geo.outer.start, geo.outer.end, "CW", 90);
    builder.addArc(CONFIG.r, geo.inner.start, geo.inner.end, "CCW", 60);
    builder.addLine(geo.bridge.start, geo.bridge.end);
    builder.addLine(geo.bar.start, geo.bar.end);

    const out = path.join(PROJECT_ROOT, "public", "g-logo-generated.svg");
    fs.writeFileSync(out, builder.render());
    console.log("DONE V2");
}
main();
// #endregion
