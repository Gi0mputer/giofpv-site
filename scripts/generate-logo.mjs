import fs from "fs";
import path from "path";

// scripts/generate-logo.mjs
// Genera l'SVG del logo partendo da centro + raggi + angoli.
// Usage: node scripts/generate-logo.mjs > assets/g-logo-generated.svg

// #region Configuration
// -----------------------------------------------------------------------------
const CONFIG = {
  enableGradient: false,
  strokeColor: "#666666",
  strokeWidth: 8,

  // Dimensioni Cerchi
  R: 120, // Raggio esterno
  r: 93,  // Raggio interno
  cx: 0,
  cy: 0,

  // Geometria Taglio
  gapDeg: 25,          // Ampiezza taglio
  bridgeInset: 0.5,    // Correzione bump connessione

  // Geometria "G" Bar
  barAngleDeg: 3,      // Angolo coda G
  barInset: 1,         // Correzione bump G
  innerBarScale: 0.70, // Lunghezza stanghetta relativa a R
  innerTopAdjustDeg: 10,

  // Drone Mask (Centrale)
  drone: {
    size: 280,
    fill: "#666666", // Copia strokeColor per default
    opacity: 1,
    path: path.join(process.cwd(), "assets", "drone-mask.png"),
  },

  // Color Palette File
  colorsPath: path.join(process.cwd(), "app", "theme", "colors.json"),
};
// #endregion

// #region Math Helpers
// -----------------------------------------------------------------------------
const MathUtils = {
  degToRad: (deg) => (deg * Math.PI) / 180,
  radToDeg: (rad) => (rad * 180) / Math.PI,

  // 0° = destra, Y verso il basso
  polarToCartesian: (cx, cy, radius, deg) => {
    const rad = MathUtils.degToRad(deg);
    return {
      x: cx + radius * Math.cos(rad),
      y: cy + radius * Math.sin(rad),
    };
  },

  angularDistanceCW: (startDeg, endDeg) => ((startDeg - endDeg) % 360 + 360) % 360,
  angularDistanceCCW: (startDeg, endDeg) => ((endDeg - startDeg) % 360 + 360) % 360,

  midAngle: (startDeg, endDeg, direction, t = 0.5) => {
    const dist = direction === "CW"
      ? -MathUtils.angularDistanceCW(startDeg, endDeg)
      : MathUtils.angularDistanceCCW(startDeg, endDeg);
    return startDeg + dist * t;
  },

  // Suddivide un arco in segmenti più piccoli per gestire gradienti o curve complesse
  splitArc: (startDeg, endDeg, direction, maxSpanDeg = 90) => {
    const segments = [];
    let current = startDeg;
    const span = Math.max(1, maxSpanDeg);
    const distance = direction === "CW" ? MathUtils.angularDistanceCW : MathUtils.angularDistanceCCW;
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
  },

  // Genera il path SVG "d" per un arco
  svgArcPath: (cx, cy, radius, startDeg, endDeg, direction) => {
    const start = MathUtils.polarToCartesian(cx, cy, radius, startDeg);
    const end = MathUtils.polarToCartesian(cx, cy, radius, endDeg);

    let delta, sweepFlag;
    if (direction === "CW") {
      delta = MathUtils.angularDistanceCW(startDeg, endDeg);
      sweepFlag = 0;
    } else {
      delta = MathUtils.angularDistanceCCW(startDeg, endDeg);
      sweepFlag = 1;
    }
    const largeArcFlag = delta > 180 ? 1 : 0;

    return `M ${start.x.toFixed(3)} ${start.y.toFixed(3)} ` +
      `A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ` +
      `${end.x.toFixed(3)} ${end.y.toFixed(3)}`;
  }
};
// #endregion

// #region Color System
// -----------------------------------------------------------------------------
const ColorSystem = {
  loadPalette: () => {
    try {
      if (!fs.existsSync(CONFIG.colorsPath)) throw new Error("File missing");
      const raw = fs.readFileSync(CONFIG.colorsPath, "utf8");
      const json = JSON.parse(raw);
      const [c1, c2, c3] = json.logo || [];
      if (!c1 || !c2 || !c3) throw new Error("Incomplete logo palette");
      return { c1, c2, c3 };
    } catch (err) {
      // Fallback
      return { c1: "#fbbf24", c2: "#0ea5e9", c3: "#a855f7" };
    }
  },

  hexToRgb: (hex) => {
    const clean = hex.replace("#", "");
    const num = parseInt(clean, 16);
    return { r: (num >> 16) & 0xff, g: (num >> 8) & 0xff, b: num & 0xff };
  },

  rgbToHex: ({ r, g, b }) => {
    const toHex = (v) => v.toString(16).padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  },

  mix: (a, b, t) => {
    const c1 = ColorSystem.hexToRgb(a);
    const c2 = ColorSystem.hexToRgb(b);
    return ColorSystem.rgbToHex({
      r: Math.round(c1.r + (c2.r - c1.r) * t),
      g: Math.round(c1.g + (c2.g - c1.g) * t),
      b: Math.round(c1.b + (c2.b - c1.b) * t),
    });
  },

  // Calcola il colore in base all'angolo (progresso CW da CONFIG.gapDeg)
  getColorAtAngle: (angleDeg) => {
    // Definizione gradienti (Lazy load o calcolati qui)
    const palette = ColorSystem.loadPalette();
    const skyBright = ColorSystem.mix(palette.c2, "#ffffff", 0.2);
    const violetBright = ColorSystem.mix(palette.c3, "#ffffff", 0.12);

    // Stops
    const stops = [
      { stop: 0, color: palette.c1 },
      { stop: 0.35, color: palette.c1 },
      { stop: 0.52, color: palette.c2 },
      { stop: 0.64, color: skyBright },
      { stop: 0.82, color: palette.c3 },
      { stop: 0.94, color: violetBright },
      { stop: 1, color: palette.c1 },
    ];

    // Normalize angle 0..1 based on start (-gapDeg)
    const startDeg = -CONFIG.gapDeg;
    const norm = ((angleDeg - startDeg) % 360 + 360) % 360;
    const t = ((360 - norm) % 360) / 360; // CW progress

    // Sample
    const wrapped = ((t % 1) + 1) % 1;
    for (let i = 0; i < stops.length - 1; i++) {
      const a = stops[i];
      const b = stops[i + 1];
      if (wrapped >= a.stop && wrapped <= b.stop) {
        const localT = (wrapped - a.stop) / (b.stop - a.stop || 1);
        return ColorSystem.mix(a.color, b.color, localT);
      }
    }
    return stops[0].color;
  }
};
// #endregion

// #region Geometry Core
// -----------------------------------------------------------------------------
function calculateLogoGeometry() {
  const { R, r, gapDeg, barAngleDeg, cx, cy, bridgeInset, barInset, innerBarScale, innerTopAdjustDeg } = CONFIG;

  // 1. Arco Esterno
  const outerStartDeg = -gapDeg;
  const outerEndDeg = barAngleDeg;

  // 2. Arco Interno (calcolo intersezione per connessione fluida)
  // R * sin(|outerStart|) = r * sin(innerHalfGap)
  const absOuterStartRad = Math.abs(MathUtils.degToRad(outerStartDeg));
  let sinInner = (R / r) * Math.sin(absOuterStartRad);
  sinInner = Math.max(-1, Math.min(1, sinInner)); // clamp
  const innerHalfGapDeg = MathUtils.radToDeg(Math.asin(sinInner));

  const innerConnDeg = -innerHalfGapDeg; // In basso a destra
  const innerTopDeg = innerHalfGapDeg + innerTopAdjustDeg; // In alto a destra

  // 3. Ponte (Bridge)
  const outerBridgePoint = MathUtils.polarToCartesian(cx, cy, R, outerStartDeg);
  const innerBridgePoint = MathUtils.polarToCartesian(cx, cy, r, innerConnDeg);
  const yBridge = (outerBridgePoint.y + innerBridgePoint.y) / 2; // Average Y

  const bridgeLine = {
    start: { x: outerBridgePoint.x - bridgeInset, y: yBridge },
    end: { x: innerBridgePoint.x + bridgeInset, y: yBridge }
  };

  // 4. Stanghetta G (Bar)
  const outerBarPoint = MathUtils.polarToCartesian(cx, cy, R, barAngleDeg);
  const innerBarLength = R * innerBarScale;
  const barY = outerBarPoint.y;
  const barStartX = outerBarPoint.x - barInset;
  const barEndX = barStartX - innerBarLength;

  const barLine = {
    start: { x: barStartX, y: barY },
    end: { x: barEndX, y: barY }
  };

  return {
    outer: { start: outerStartDeg, end: outerEndDeg },
    inner: { start: innerTopDeg, end: innerConnDeg },
    bridge: bridgeLine,
    bar: barLine
  };
}
// #endregion

// #region SVG Generator
// -----------------------------------------------------------------------------
class SVGBuilder {
  constructor() {
    this.defs = [];
    this.paths = [];
    this.gradientCount = 0;
  }

  addGradient(start, end, stops) {
    if (!CONFIG.enableGradient) return null;

    const id = `grad-${this.gradientCount++}`;
    const stopsStr = stops
      .map(s => `<stop offset="${(s.offset * 100).toFixed(1)}%" stop-color="${s.color}" />`)
      .join("\n      ");

    this.defs.push(`
    <linearGradient id="${id}" x1="${start.x.toFixed(3)}" y1="${start.y.toFixed(3)}" x2="${end.x.toFixed(3)}" y2="${end.y.toFixed(3)}" gradientUnits="userSpaceOnUse">
      ${stopsStr}
    </linearGradient>`);

    return id;
  }

  addArc(radius, startDeg, endDeg, direction, maxSpan = 90) {
    const segments = MathUtils.splitArc(startDeg, endDeg, direction, maxSpan);

    segments.forEach((seg) => {
      const pStart = MathUtils.polarToCartesian(CONFIG.cx, CONFIG.cy, radius, seg.start);
      const pEnd = MathUtils.polarToCartesian(CONFIG.cx, CONFIG.cy, radius, seg.end);
      const midDeg = MathUtils.midAngle(seg.start, seg.end, direction);

      const stops = [
        { offset: 0, color: ColorSystem.getColorAtAngle(seg.start) },
        { offset: 0.5, color: ColorSystem.getColorAtAngle(midDeg) },
        { offset: 1, color: ColorSystem.getColorAtAngle(seg.end) },
      ];

      const gradId = this.addGradient(pStart, pEnd, stops);
      const d = MathUtils.svgArcPath(CONFIG.cx, CONFIG.cy, radius, seg.start, seg.end, direction);
      this.paths.push({ d, stroke: gradId });
    });
  }

  addLine(pStart, pEnd) {
    const mid = { x: (pStart.x + pEnd.x) / 2, y: (pStart.y + pEnd.y) / 2 };
    const stops = [
      { offset: 0, color: ColorSystem.getColorAtAngle(MathUtils.radToDeg(Math.atan2(pStart.y, pStart.x))) },
      { offset: 0.5, color: ColorSystem.getColorAtAngle(MathUtils.radToDeg(Math.atan2(mid.y, mid.x))) },
      { offset: 1, color: ColorSystem.getColorAtAngle(MathUtils.radToDeg(Math.atan2(pEnd.y, pEnd.x))) }
    ];

    const gradId = this.addGradient(pStart, pEnd, stops);
    const d = `M ${pStart.x.toFixed(3)} ${pStart.y.toFixed(3)} L ${pEnd.x.toFixed(3)} ${pEnd.y.toFixed(3)}`;
    this.paths.push({ d, stroke: gradId });
  }

  addDroneMask() {
    if (!fs.existsSync(CONFIG.drone.path)) {
      console.warn("WARN: Drone mask not found at " + CONFIG.drone.path);
      return "";
    }
    const b64 = fs.readFileSync(CONFIG.drone.path).toString("base64");
    const size = CONFIG.drone.size;
    const half = size / 2;

    this.defs.push(`
    <mask id="drone-mask" x="${-half}" y="${-half}" width="${size}" height="${size}" maskUnits="userSpaceOnUse">
      <image href="data:image/png;base64,${b64}" x="${-half}" y="${-half}" width="${size}" height="${size}" />
    </mask>`);

    return `
  <g mask="url(#drone-mask)">
    <rect x="${-half}" y="${-half}" width="${size}" height="${size}" fill="${CONFIG.drone.fill}" opacity="${CONFIG.drone.opacity}" />
  </g>`;
  }

  render() {
    const size = (CONFIG.R + CONFIG.strokeWidth) * 2 + 10;
    const half = size / 2;
    const droneShape = this.addDroneMask();

    // Render Paths
    const pathElements = this.paths.map(p => {
      const strokeAttr = p.stroke ? `url(#${p.stroke})` : CONFIG.strokeColor;
      // Se gradient spento, usa config color
      const color = CONFIG.enableGradient ? strokeAttr : `"${CONFIG.strokeColor}"`;
      return `    <path d="${p.d}" stroke=${color} />`;
    }).join("\n");

    return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-half} ${-half} ${size} ${size}">
  <defs>
${this.defs.join("\n")}
  </defs>
  ${droneShape}
  <g fill="none" stroke-width="${CONFIG.strokeWidth}" stroke-linecap="round" stroke-linejoin="round">
${pathElements}
  </g>
</svg>`;
  }
}
// #endregion

// #region Main Execution
// -----------------------------------------------------------------------------
function main() {
  const geo = calculateLogoGeometry();
  const builder = new SVGBuilder();

  // 1. Arco Esterno (CW)
  builder.addArc(CONFIG.R, geo.outer.start, geo.outer.end, "CW", 90);

  // 2. Arco Interno (CCW)
  builder.addArc(CONFIG.r, geo.inner.start, geo.inner.end, "CCW", 60);

  // 3. Ponte
  builder.addLine(geo.bridge.start, geo.bridge.end);

  // 4. Stanghetta G
  builder.addLine(geo.bar.start, geo.bar.end);

  console.log(builder.render().trim());
}

main();
// #endregion
