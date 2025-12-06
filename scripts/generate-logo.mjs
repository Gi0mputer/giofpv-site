import fs from "fs";
import path from "path";

// scripts/generate-logo.mjs
// Genera l'SVG del logo partendo da centro + raggi + angoli, con sfumatura che segue la curva.
// node scripts/generate-logo.mjs > assets/g-logo-generated.svg

// Impostazioni base (coloring in pausa: gradient off di default)
const enableGradient = false;
const strokeColor = "#666666";
const droneFillColor = strokeColor;
const droneOpacity = 0.9;

// Parametri principali (0° = destra, angoli positivi = antiorario)
const cx = 0;          // centro X
const cy = 0;          // centro Y
const R = 120;         // raggio cerchio esterno
const r = 93;          // raggio cerchio interno
const strokeWidth = 8;

// Ampiezza del taglio
const gapDeg = 25;
const bridgeInset = 0.5; // togli bump stanghetta di connessione

// Parametri della stanghetta della G:
const barAngleDeg = 3; // angolo verso il basso
const barInset = 1;  // togli bump stanghetta di G
const innerBarLength = R * 0.70; // lunghezza stanghetta G
const innerTopAdjustDeg = 10;

// Drone mask placement
const droneMaskSize = 220;
const droneMaskPath = path.join(process.cwd(), "assets", "drone-mask.png");

// -------------------------------------------------------------
function degToRad(deg) {
  return (deg * Math.PI) / 180;
}

function radToDeg(rad) {
  return (rad * 180) / Math.PI;
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

  return (
    `M ${start.x.toFixed(3)} ${start.y.toFixed(3)} ` +
    `A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ` +
    `${end.x.toFixed(3)} ${end.y.toFixed(3)}`
  );
}

function angularDistanceCW(startDeg, endDeg) {
  return ((startDeg - endDeg) % 360 + 360) % 360;
}

function angularDistanceCCW(startDeg, endDeg) {
  return ((endDeg - startDeg) % 360 + 360) % 360;
}

function splitArc(startDeg, endDeg, direction, maxSpanDeg = 90) {
  const segments = [];
  let current = startDeg;
  const span = Math.max(1, maxSpanDeg);
  const distance = direction === "CW" ? angularDistanceCW : angularDistanceCCW;
  const advance = direction === "CW" ? (angle, step) => angle - step : (angle, step) => angle + step;

  while (true) {
    const remaining = distance(current, endDeg);
    if (remaining <= span) {
      segments.push({ start: current, end: endDeg });
      break;
    }
    const next = advance(current, span);
    segments.push({ start: current, end: next });
    current = next;
  }

  return segments;
}

function midAngle(startDeg, endDeg, direction, t = 0.5) {
  const dist =
    direction === "CW" ? -angularDistanceCW(startDeg, endDeg) : angularDistanceCCW(startDeg, endDeg);
  return startDeg + dist * t;
}

// -------------------------------------------------------------
// 1) GEOMETRIA DEL DOPPIO CERCHIO

// Arco esterno: parte da -gapDeg (zona connessione) e arriva a barAngleDeg (zona stanghetta)
const outerStartDeg = -gapDeg;
const outerEndDeg = barAngleDeg;

// Calcolo dell'angolo interno dove i cerchi si "agganciano"
// Relazione sulle Y: R * sin(|outerStart|) = r * sin(innerHalfGap)
const absOuterStartRad = Math.abs(degToRad(outerStartDeg));
let sinInner = (R / r) * Math.sin(absOuterStartRad);
// clamp per sicurezza numerica
sinInner = Math.max(-1, Math.min(1, sinInner));
const innerHalfGapDeg = radToDeg(Math.asin(sinInner));

// Angoli dell'arco interno:
// - innerConnDeg: punto di connessione in basso a destra (fisso)
// - innerTopDeg: punto lato gap (regolabile)
const innerConnDeg = -innerHalfGapDeg;
const innerTopDeg = innerHalfGapDeg + innerTopAdjustDeg;

// Segmento di connessione orizzontale
const outerBridgePoint = polarToCartesian(cx, cy, R, outerStartDeg);
const innerBridgePoint = polarToCartesian(cx, cy, r, innerConnDeg);
// Forziamo stessa Y (media per sicurezza numerica)
const yBridge = (outerBridgePoint.y + innerBridgePoint.y) / 2;
const xOuterBridge = outerBridgePoint.x - bridgeInset;
const xInnerBridge = innerBridgePoint.x + bridgeInset;

// Punto sulla circonferenza esterna all'angolo barAngleDeg (fine arco esterno)
const outerBarPoint = polarToCartesian(cx, cy, R, barAngleDeg);
const barY = outerBarPoint.y;
const barStartX = outerBarPoint.x - barInset;
const barEndX = barStartX - innerBarLength;

// -------------------------------------------------------------
// 2) PALETTE E SFUMATURA ANGOLARE (circolare)

const colorsPath = path.join(process.cwd(), "app", "theme", "colors.json");

function loadPalette() {
  try {
    const raw = fs.readFileSync(colorsPath, "utf8");
    const json = JSON.parse(raw);
    const [c1, c2, c3] = json.logo || [];
    if (!c1 || !c2 || !c3) throw new Error("Palette logo incompleta");
    return { c1, c2, c3 };
  } catch (err) {
    console.warn("Palette non trovata o incompleta, uso fallback:", err.message);
    return { c1: "#fbbf24", c2: "#0ea5e9", c3: "#a855f7" };
  }
}

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);
  return {
    r: (num >> 16) & 0xff,
    g: (num >> 8) & 0xff,
    b: num & 0xff,
  };
}

function rgbToHex({ r, g, b }) {
  const toHex = (v) => v.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function mixColors(a, b, t) {
  const c1 = hexToRgb(a);
  const c2 = hexToRgb(b);
  return rgbToHex({
    r: Math.round(c1.r + (c2.r - c1.r) * t),
    g: Math.round(c1.g + (c2.g - c1.g) * t),
    b: Math.round(c1.b + (c2.b - c1.b) * t),
  });
}

const palette = loadPalette();

// Stops distribuiti lungo la circonferenza (clockwise) per simulare un gradiente "conico"
// Manteniamo i colori pieni più a lungo e rendiamo le transizioni brevi per evitare verdoni/marroni.
const skyBright = mixColors(palette.c2, "#ffffff", 0.2);
const violetBright = mixColors(palette.c3, "#ffffff", 0.12);
const sweepStops = [
  { stop: 0, color: palette.c1 },
  { stop: 0.35, color: palette.c1 },
  { stop: 0.52, color: palette.c2 },
  { stop: 0.64, color: skyBright },
  { stop: 0.82, color: palette.c3 },
  { stop: 0.94, color: violetBright },
  { stop: 1, color: palette.c1 },
];

function sampleSweep(t) {
  const wrapped = ((t % 1) + 1) % 1;
  for (let i = 0; i < sweepStops.length - 1; i++) {
    const a = sweepStops[i];
    const b = sweepStops[i + 1];
    if (wrapped >= a.stop && wrapped <= b.stop) {
      const localT = (wrapped - a.stop) / (b.stop - a.stop || 1);
      return mixColors(a.color, b.color, localT);
    }
  }
  return sweepStops[0].color;
}

function cwProgress(angleDeg) {
  const norm = ((angleDeg - outerStartDeg) % 360 + 360) % 360;
  const cwDeg = (360 - norm) % 360;
  return cwDeg / 360;
}

function colorAtAngle(angleDeg) {
  return sampleSweep(cwProgress(angleDeg));
}

// -------------------------------------------------------------
// 3) COSTRUZIONE DEI SEGMENTI COLORATI

const gradients = [];
const paths = [];

function addGradient(id, start, end, stops) {
  if (!enableGradient) return;
  gradients.push({ id, start, end, stops });
}

function addArcSegments(idPrefix, radius, startDeg, endDeg, direction, maxSpanDeg = 90) {
  const segments = splitArc(startDeg, endDeg, direction, maxSpanDeg);
  segments.forEach((segment, idx) => {
    const startPoint = polarToCartesian(cx, cy, radius, segment.start);
    const endPoint = polarToCartesian(cx, cy, radius, segment.end);
    const midDeg = midAngle(segment.start, segment.end, direction);
    const stops = [
      { offset: 0, color: colorAtAngle(segment.start) },
      { offset: 0.5, color: colorAtAngle(midDeg) },
      { offset: 1, color: colorAtAngle(segment.end) },
    ];
    const gradientId = `${idPrefix}-grad-${idx}`;
    addGradient(gradientId, startPoint, endPoint, stops);
    paths.push({
      id: `${idPrefix}-path-${idx}`,
      d: arcPath(cx, cy, radius, segment.start, segment.end, direction),
      stroke: gradientId,
    });
  });
}

function addLine(id, from, to) {
  const mid = { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 };
  const gradientId = `${id}-grad`;
  addGradient(gradientId, from, to, [
    { offset: 0, color: colorAtAngle(radToDeg(Math.atan2(from.y - cy, from.x - cx))) },
    { offset: 0.5, color: colorAtAngle(radToDeg(Math.atan2(mid.y - cy, mid.x - cx))) },
    { offset: 1, color: colorAtAngle(radToDeg(Math.atan2(to.y - cy, to.x - cx))) },
  ]);
  paths.push({
    id: `${id}-path`,
    d: `M ${from.x.toFixed(3)} ${from.y.toFixed(3)} L ${to.x.toFixed(3)} ${to.y.toFixed(3)}`,
    stroke: gradientId,
  });
}

// Arco esterno suddiviso per seguire meglio la curva
addArcSegments("outer", R, outerStartDeg, outerEndDeg, "CW", 90);
// Arco interno con step più piccolo per avere sfumatura fluida sul tratto corto
addArcSegments("inner", r, innerTopDeg, innerConnDeg, "CCW", 60);
// Segmento di connessione
addLine("bridge", { x: xOuterBridge, y: yBridge }, { x: xInnerBridge, y: yBridge });
// Stanghetta orizzontale della G
addLine("bar", { x: barStartX, y: barY }, { x: barEndX, y: barY });

// -------------------------------------------------------------
// 4) ViewBox auto-dimensionato con un piccolo margine

const size = (R + strokeWidth) * 2 + 10;
const half = size / 2;

function renderGradient(def) {
  const { id, start, end, stops } = def;
  const stopsStr = stops
    .map((s) => `      <stop offset="${(s.offset * 100).toFixed(1)}%" stop-color="${s.color}" />`)
    .join("\n");
  return `
    <linearGradient id="${id}" x1="${start.x.toFixed(3)}" y1="${start.y.toFixed(3)}" x2="${end.x.toFixed(3)}" y2="${end.y.toFixed(3)}" gradientUnits="userSpaceOnUse">
${stopsStr}
    </linearGradient>`;
}

function renderPath(p) {
  const strokeAttr = enableGradient ? `stroke="url(#${p.stroke})"` : `stroke="${strokeColor}"`;
  return `    <path d="${p.d}" ${strokeAttr} />`;
}

// -------------------------------------------------------------
// 5) MASK DRONE AL CENTRO (usa il PNG come mask per riempire di colore uniforme)

let droneMaskDef = "";
let droneMaskedShape = "";
if (fs.existsSync(droneMaskPath)) {
  const dataUri = `data:image/png;base64,${fs.readFileSync(droneMaskPath).toString("base64")}`;
  const halfMask = droneMaskSize / 2;
  droneMaskDef = `
    <mask id="drone-mask" x="${-halfMask}" y="${-halfMask}" width="${droneMaskSize}" height="${droneMaskSize}" maskUnits="userSpaceOnUse">
      <image href="${dataUri}" x="${-halfMask}" y="${-halfMask}" width="${droneMaskSize}" height="${droneMaskSize}" />
    </mask>`;
  droneMaskedShape = `
  <g mask="url(#drone-mask)">
    <rect x="${-halfMask}" y="${-halfMask}" width="${droneMaskSize}" height="${droneMaskSize}" fill="${droneFillColor}" opacity="${droneOpacity}" />
  </g>`;
} else {
  console.warn("Attenzione: drone-mask.png non trovato, salto il drone centrale.");
}

// -------------------------------------------------------------
// 6) OUTPUT SVG

const defsContent = [];
if (enableGradient && gradients.length) {
  defsContent.push(gradients.map(renderGradient).join("\n"));
}
if (droneMaskDef) {
  defsContent.push(droneMaskDef);
}

const defsBlock = defsContent.length ? `  <defs>\n${defsContent.join("\n")}\n  </defs>\n` : "";

const svg = `
<svg xmlns="http://www.w3.org/2000/svg"
     viewBox="${-half} ${-half} ${size} ${size}">
${defsBlock.trimEnd()}
  ${droneMaskedShape.trim()}
  <g fill="none"
     stroke-width="${strokeWidth}"
     stroke-linecap="round"
     stroke-linejoin="round">
${paths.map(renderPath).join("\n")}
  </g>
</svg>
`;

console.log(svg.trim());
