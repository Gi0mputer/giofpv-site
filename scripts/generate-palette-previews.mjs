import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// scripts/generate-palette-previews.mjs
// Genera l'SVG con solo i gradienti richiesti (grad-2, grad-3, grad-4, grad-10, grad-11)
// Usage: node scripts/generate-palette-previews.mjs

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "..");
const OUTPUT_PATH = path.join(PROJECT_ROOT, "dev", "palette-previews.svg");

const gradients = [
  {
    id: "grad-2",
    stops: [
      { offset: 10, color: "#7e34fdff" },
      { offset: 38, color: "#06b6d4" },
      { offset: 75, color: "#f9739eff" },
      { offset: 100, color: "#ff4e27ff" }
    ]
  },
  {
    id: "grad-3",
    stops: [
      { offset: 0, color: "#d946ef" },
      { offset: 33, color: "#2da7d4ff" },
      { offset: 66, color: "#ff8d69" },
      { offset: 100, color: "#ff7043" }
    ]
  },
  {
    id: "grad-4",
    stops: [
      { offset: 0, color: "#9e3effff" },
      { offset: 49, color: "#00e5ff" },
      { offset: 67, color: "#ff3ea5" },
      { offset: 80, color: "#ffac47ff" }
    ]
  },
  {
    id: "grad-10",
    stops: [
      { offset: 0, color: "#0eb7d8" },
      { offset: 40, color: "#e8d7b1" },
      { offset: 66, color: "#d9b892" },
      { offset: 100, color: "#b9cf77ff" }
    ]
  },
  {
    id: "grad-11",
    stops: [
      { offset: 0, color: "#df95ffff" },
      { offset: 33, color: "#1ea7c6" },
      { offset: 70, color: "#f9e3c3" },
      { offset: 100, color: "#f8dcb4" }
    ]
  }
];

function render() {
  const rowHeight = 70;
  const width = 520;
  const rectWidth = 380;
  const rectHeight = 36;
  const paddingX = 20;
  const paddingY = 20;
  const totalHeight = paddingY * 2 + gradients.length * rowHeight;

  const defs = gradients.map(g => {
    const stops = g.stops
      .map(s => `<stop offset="${s.offset.toFixed(1)}%" stop-color="${s.color}" />`)
      .join("\n      ");
    return `
    <linearGradient id="${g.id}" x1="0%" y1="0%" x2="100%" y2="0%">
      ${stops}
    </linearGradient>`;
  }).join("\n");

  const rows = gradients.map((g, idx) => {
    const y = paddingY + idx * rowHeight;
    const colorsTxt = g.stops.map(s => s.color).join("  ");
    return `
  <g transform="translate(${paddingX}, ${y})">
    <text x="0" y="18" font-size="14" font-family="Arial, sans-serif" fill="#0f172a">${g.id}</text>
    <rect x="0" y="24" width="${rectWidth}" height="${rectHeight}" rx="8" fill="url(#${g.id})" stroke="#e2e8f0" stroke-width="1" />
    <text x="${rectWidth + 12}" y="42" font-size="12" font-family="Arial, sans-serif" fill="#334155">${colorsTxt}</text>
  </g>`;
  }).join("\n");

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${totalHeight}" viewBox="0 0 ${width} ${totalHeight}">
  <style>
    text { dominant-baseline: middle; }
  </style>
  <defs>
${defs}
  </defs>
${rows}
</svg>`.trim();
}

function main() {
  const svg = render();
  fs.writeFileSync(OUTPUT_PATH, svg, "utf8");
  console.log(`Palette preview generata in: ${OUTPUT_PATH}`);
}

main();
