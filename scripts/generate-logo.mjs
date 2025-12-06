// scripts/generate-logo.mjs
// Genera l'SVG del logo partendo da centro + raggi + angoli "umani".

// Parametri principali (0° = destra, angoli positivi = antiorario)
const cx = 0;          // centro X
const cy = 0;          // centro Y
const R = 100;         // raggio cerchio esterno
const r = 78;          // raggio cerchio interno
const strokeWidth = 8;

// Ampiezza del taglio
const gapDeg = 30;
const bridgeInset = 0.5; // togli bump stanghetta di connessione

// Parametri della stanghetta della G:
const barAngleDeg = 10; // angolo verso il basso  
const barInset = 0.5;  // togli bump stanghetta di G
const innerBarLength = R * 0.6; // lunghezza stanghetta G

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

// -------------------------------------------------------------
// 1) GEOMETRIA DEL DOPPIO CERCHIO

// Arco esterno: parte da -gapDeg e arriva a barAngleDeg in senso orario.
// Quando cambi barAngleDeg, l'arco si accorcia/allunga da quel lato.
const outerStartDeg = -gapDeg;
const outerEndDeg = barAngleDeg;
const outerArc = arcPath(cx, cy, R, outerStartDeg, outerEndDeg, "CW");

// Calcolo dell'angolo interno dove i cerchi si "agganciano"
// Relazione sulle Y: R * sin(|outerStart|) = r * sin(innerHalfGap)
const absOuterStartRad = Math.abs(degToRad(outerStartDeg));
let sinInner = (R / r) * Math.sin(absOuterStartRad);
// clamp per sicurezza numerica
sinInner = Math.max(-1, Math.min(1, sinInner));
const innerHalfGapDeg = radToDeg(Math.asin(sinInner));

// Arco interno: quasi cerchio completo, simmetrico rispetto allo 0°
// (non dipende da barAngleDeg, quindi la connessione resta stabile)
const innerStartDeg = +innerHalfGapDeg;
const innerEndDeg = -innerHalfGapDeg;
const innerArc = arcPath(cx, cy, r, innerStartDeg, innerEndDeg, "CCW");

// Segmento di connessione orizzontale (stessa Y sui due cerchi,
// usando sempre gli stessi angoli: outerStartDeg e innerEndDeg)
const outerBridgePoint = polarToCartesian(cx, cy, R, outerStartDeg);
const innerBridgePoint = polarToCartesian(cx, cy, r, innerEndDeg);

// Forziamo stessa Y (media per sicurezza numerica)
const yBridge = (outerBridgePoint.y + innerBridgePoint.y) / 2;

const xOuterBridge = outerBridgePoint.x - bridgeInset;
const xInnerBridge = innerBridgePoint.x + bridgeInset;

const bridgeSegment =
  `M ${xOuterBridge.toFixed(3)} ${yBridge.toFixed(3)} ` +
  `L ${xInnerBridge.toFixed(3)} ${yBridge.toFixed(3)}`;

// -------------------------------------------------------------
// 2) STANGHETTA DELLA G (agganciata alla fine dell'arco esterno)

// Punto sulla circonferenza esterna all'angolo barAngleDeg (fine arco)
const outerBarPoint = polarToCartesian(cx, cy, R, barAngleDeg);

// Stanghetta orizzontale:
// - parte un po' dentro rispetto alla circonferenza (barInset)
// - poi entra verso l'interno di innerBarLength
const barY = outerBarPoint.y;
const barStartX = outerBarPoint.x - barInset;
const barEndX = barStartX - innerBarLength;

const innerBar =
  `M ${barStartX.toFixed(3)} ${barY.toFixed(3)} ` +
  `L ${barEndX.toFixed(3)} ${barY.toFixed(3)}`;

// -------------------------------------------------------------
// 3) ViewBox auto-dimensionato con un piccolo margine

const size = (R + strokeWidth) * 2 + 10;
const half = size / 2;

const svg = `
<svg xmlns="http://www.w3.org/2000/svg"
     viewBox="${-half} ${-half} ${size} ${size}">
  <g fill="none"
     stroke="#666666"
     stroke-width="${strokeWidth}"
     stroke-linecap="round"
     stroke-linejoin="round">
    <path d="${outerArc}" />
    <path d="${bridgeSegment}" />
    <path d="${innerArc}" />
    <path d="${innerBar}" />
  </g>
</svg>
`;

console.log(svg.trim());
