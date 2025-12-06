import fs from "fs";
import path from "path";

// scripts/generate-logo.mjs
// Genera l'SVG del logo partendo da centro + raggi + angoli, evitando coordinate assolute.

// Parametri principali (0° = destra, angoli positivi = antiorario)
const cx = 0; // centro X
const cy = 0; // centro Y
const R = 100; // raggio cerchio esterno
const r = 78; // raggio cerchio interno
const strokeWidth = 8;

// Angoli (in gradi) per gli archi
const outerStartDeg = -30; // arco esterno inizia in alto-dx
const outerEndDeg = 0; // termina a destra
const innerStartDeg = 40; // arco interno, leggermente più alto
const innerEndDeg = -40; // termina più in basso a destra

// Lunghezza stanghetta della G (parte dal punto a 0° del cerchio esterno)
const innerBarLength = R * 0.6;

// -------------------------------------------------------------
function degToRad(deg) {
  return (deg * Math.PI) / 180;
}

// 0° = destra, Y verso il basso (convenzione SVG)
function polarToCartesian(cx, cy, radius, deg) {
  const rad = degToRad(deg);
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  };
}

// Arco SVG tra startDeg e endDeg
// direction = "CW" (orario) o "CCW" (antiorario)
function arcPath(cx, cy, radius, startDeg, endDeg, direction) {
  const start = polarToCartesian(cx, cy, radius, startDeg);
  const end = polarToCartesian(cx, cy, radius, endDeg);

  let delta;
  let sweepFlag;
  if (direction === "CW") {
    delta = ((startDeg - endDeg) % 360 + 360) % 360;
    sweepFlag = 0;
  } else {
    delta = ((endDeg - startDeg) % 360 + 360) % 360;
    sweepFlag = 1;
  }

  const largeArcFlag = delta > 180 ? 1 : 0;

  return `M ${start.x.toFixed(3)} ${start.y.toFixed(3)} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${end.x.toFixed(3)} ${end.y.toFixed(3)}`;
}

// 1) Arco esterno (grande "C")
const outerArc = arcPath(cx, cy, R, outerStartDeg, outerEndDeg, "CW");

// 2) Segmento di collegamento orizzontale: stessa y sui due cerchi
const outerStartPoint = polarToCartesian(cx, cy, R, outerStartDeg);
const yBridge = outerStartPoint.y;
const dy = yBridge - cy;
const xInnerBridge = cx + Math.sqrt(r * r - dy * dy) + 0.5;
const bridgeSegment = `M ${(outerStartPoint.x - 0.5).toFixed(3)} ${yBridge.toFixed(3)} L ${xInnerBridge.toFixed(3)} ${yBridge.toFixed(3)}`;

// 3) Arco interno (antiorario)
const innerArc = arcPath(cx, cy, r, innerStartDeg, innerEndDeg, "CCW");

// 4) Stanghetta della G: parte dal punto a 0° del cerchio esterno
const outerZero = polarToCartesian(cx, cy, R, 0);
const innerBarEndX = outerZero.x - innerBarLength;
const innerBar = `M ${outerZero.x.toFixed(3)} ${outerZero.y.toFixed(3)} L ${innerBarEndX.toFixed(3)} ${outerZero.y.toFixed(3)}`;

// ViewBox auto dimensionato con un piccolo margine
const size = (R + strokeWidth) * 2 + 10;
const half = size / 2;

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-half} ${-half} ${size} ${size}">
  <g fill="none" stroke="#666666" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">
    <path d="${outerArc}" />
    <path d="${bridgeSegment}" />
    <path d="${innerArc}" />
    <path d="${innerBar}" />
  </g>
</svg>
`;

const outputPath = path.join(process.cwd(), "assets", "g-logo.svg");
fs.writeFileSync(outputPath, svg.trim(), "utf8");
console.log(`SVG generato in ${outputPath}`);
