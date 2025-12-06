import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

const CONFIG = {
    R: 120, r: 93,
    gapDeg: 25,
    barAngleDeg: 3,
    bridgeInset: 0.5,
    barInset: 1,
    innerBarScale: 0.68,
    innerTopAdjustDeg: 13,
    cx: 0, cy: 0
};

const MathUtils = {
    degToRad: (deg) => (deg * Math.PI) / 180,
    radToDeg: (rad) => (rad * 180) / Math.PI,
    polarToCartesian: (cx, cy, radius, deg) => {
        const rad = MathUtils.degToRad(deg);
        return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
    },
    angularDistanceCW: (start, end) => ((start - end) % 360 + 360) % 360,
    angularDistanceCCW: (start, end) => ((end - start) % 360 + 360) % 360
};

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

const geo = calculateLogoGeometry();
console.log("Geometry:", JSON.stringify(geo, null, 2));

// Calcola lunghezze
const { R, r } = CONFIG;
const innerArcLen = MathUtils.angularDistanceCW(geo.inner.start, geo.inner.end) * Math.PI * r / 180;
const bridgeLen = Math.hypot(geo.bridge.end.x - geo.bridge.start.x, geo.bridge.end.y - geo.bridge.start.y);
const outerArcLen = MathUtils.angularDistanceCW(geo.outer.start, geo.outer.end) * Math.PI * R / 180;
const barLen = Math.abs(geo.bar.end.x - geo.bar.start.x);

console.log("\nLengths:");
console.log("innerArcLen:", innerArcLen);
console.log("bridgeLen:", bridgeLen);
console.log("outerArcLen:", outerArcLen);
console.log("barLen:", barLen);
console.log("totalLength:", innerArcLen + bridgeLen + outerArcLen + barLen);
