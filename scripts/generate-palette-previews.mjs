import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// scripts/generate-palette-previews.mjs
// Genera un'anteprima delle palette
// Usage: node scripts/generate-palette-previews.mjs

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "..");
const COLORS_PATH = path.join(PROJECT_ROOT, "app", "theme", "colors.json");
const OUTPUT_PATH = path.join(PROJECT_ROOT, "dev", "palette-previews.svg");

// Helpers --------------------------------------------------------------------
const hexToRgb = (hex) => {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);
  return { r: (num >> 16) & 0xff, g: (num >> 8) & 0xff, b: num & 0xff };
};

const rgbToHex = ({ r, g, b }) => {
  const toHex = (v) => v.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const mix = (a, b, t) => {
  const c1 = hexToRgb(a);
  const c2 = hexToRgb(b);
  return rgbToHex({
    r: Math.round(c1.r + (c2.r - c1.r) * t),
    g: Math.round(c1.g + (c2.g - c1.g) * t),
    b: Math.round(c1.b + (c2.b - c1.b) * t),
  });
};

const ensureFourColors = (colors) => {
  if (colors.length >= 4) return colors.slice(0, 4);
  if (colors.length === 3) {
    const [c1, c2, c3] = colors;
    const c3Light = mix(c3, "#ffffff", 0.2);
    return [c1, c2, c3Light, c3];
  }
  if (colors.length === 2) {
    const [c1, c2] = colors;
    return [c1, mix(c1, c2, 0.33), mix(c1, c2, 0.66), c2];
  }
  return colors;
};

const loadCurrentPalette = () => {
  try {
    const raw = fs.readFileSync(COLORS_PATH, "utf8");
    const json = JSON.parse(raw);
    const [c1, c2, c3] = json.logo || [];
    if (!c1 || !c2 || !c3) throw new Error("Palette incompleta");
    return { name: "current", colors: [c1, c2, c3] };
  } catch (err) {
    return { name: "current (fallback)", colors: ["#fbbf24", "#0ea5e9", "#a855f7"] };
  }
};

// Palette proposte -----------------------------------------------------------
// Ripristinate le palette precedenti + richieste specifiche
const palettes = [
  loadCurrentPalette(),
  { name: "sunset-vibrant", colors: ["#c026d3", "#22d3ee", "#f97316"] },
  { name: "sunset-deep", colors: ["#9333ea", "#06b6d4", "#ff6b35"] },
  { name: "sunset-soft", colors: ["#a21caf", "#2dd4bf", "#ff8a3d"] },
  { name: "sunset-neon", colors: ["#ff3ea5", "#00e5ff", "#ffb347"] },
  { name: "sunset-gold", colors: ["#c084fc", "#22d3ee", "#f59e0b"] },
  { name: "sunset-coral", colors: ["#d946ef", "#2dd4bf", "#ff7043"] },
  { name: "sunset-ember", colors: ["#a855f7", "#06b6d4", "#fb5607"] },
  { name: "sunset-horizon", colors: ["#7c3aed", "#38bdf8", "#f97316"] },
  { name: "sunset-melon", colors: ["#ec4899", "#22d3ee", "#ff8a3d"] },
  // Nuove richieste
  { name: "sea-sardinia", colors: ["#0eb7d8", "#e8d7b1", "#cfa677"] },
  { name: "desert-sea", colors: ["#f2b134", "#1ea7c6", "#f8dcb4"] },
  { name: "violet-cyan-amber", colors: ["#8b5cf6", "#06b6d4", "#f59e0b"] }
];

// Gradient stops uniformi con 4 colori equidistanti (0, 0.33, 0.66, 1)
const buildStops = (colors) => {
  const [c1, c2, c3, c4] = ensureFourColors(colors);
  const offsets = [0, 0.33, 0.66, 1];
  return [
    { offset: offsets[0], color: c1 },
    { offset: offsets[1], color: c2 },
    { offset: offsets[2], color: c3 },
    { offset: offsets[3], color: c4 },
  ];
};

// SVG builder ---------------------------------------------------------------
function render() {
  const rowHeight = 70;
  const width = 520;
  const rectWidth = 380;
  const rectHeight = 36;
  const paddingX = 20;
  const paddingY = 20;
  const totalHeight = paddingY * 2 + palettes.length * rowHeight;

  const defs = [];
  const rows = [];

  palettes.forEach((p, idx) => {
    const id = `grad-${idx}`;
    const stops = buildStops(p.colors)
      .map(s => `<stop offset="${(s.offset * 100).toFixed(1)}%" stop-color="${s.color}" />`)
      .join("\n      ");
    defs.push(`
    <linearGradient id="${id}" x1="0%" y1="0%" x2="100%" y2="0%">
      ${stops}
    </linearGradient>`);

    const y = paddingY + idx * rowHeight;
    rows.push(`
  <g transform="translate(${paddingX}, ${y})">
    <text x="0" y="18" font-size="14" font-family="Arial, sans-serif" fill="#0f172a">${p.name}</text>
    <rect x="0" y="24" width="${rectWidth}" height="${rectHeight}" rx="8" fill="url(#${id})" stroke="#e2e8f0" stroke-width="1" />
    <text x="${rectWidth + 12}" y="42" font-size="12" font-family="Arial, sans-serif" fill="#334155">${ensureFourColors(p.colors).join("  ")}</text>
  </g>`);
  });

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${totalHeight}" viewBox="0 0 ${width} ${totalHeight}">
  <style>
    text { dominant-baseline: middle; }
  </style>
  <defs>
${defs.join("\n")}
  </defs>
${rows.join("\n")}
</svg>`.trim();
}

function main() {
  const svg = render();
  fs.writeFileSync(OUTPUT_PATH, svg, "utf8");
  console.log(`Palette preview generata in: ${OUTPUT_PATH}`);
}

main();
