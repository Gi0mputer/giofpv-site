import fs from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = process.cwd();
const OUTPUT_DIR = path.join(ROOT, "public");
const BASE_ICON = path.join(ROOT, "assets", "icon-base.png");
const G_MASK = path.join(ROOT, "assets", "G-mask.png");
const DRONE_MASK = path.join(ROOT, "assets", "drone-mask.png");
const THEME_COLORS = path.join(ROOT, "theme", "colors.json");

function loadPalette() {
  try {
    const raw = fs.readFileSync(THEME_COLORS, "utf8");
    const json = JSON.parse(raw);
    const [c1, c2, c3] = json.logo || [];
    const drone = json.drone || "#ffffff";
    if (!c1 || !c2 || !c3) throw new Error("Logo palette incompleta");
    return { c1, c2, c3, drone };
  } catch (err) {
    console.warn("Palette non trovata o incompleta, uso fallback:", err.message);
    return { c1: "#00f0ff", c2: "#bd00ff", c3: "#ffcc00", drone: "#ffffff" };
  }
}

const palette = loadPalette();

// Dimensioni standard da generare
const sizes = [
  { size: 512, name: "icon-512x512.png" },
  { size: 192, name: "favicon-192x192.png" },
  { size: 180, name: "apple-touch-icon.png" },
  { size: 48, name: "favicon-48x48.png" },
  { size: 32, name: "favicon-32x32.png" },
];

function makeGradientSvg(width, height, { c1, c2, c3 }) {
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c1}" />
      <stop offset="50%" stop-color="${c2}" />
      <stop offset="100%" stop-color="${c3}" />
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
</svg>`;
}

async function generateForSize(entry) {
  const { size, name } = entry;
  const svg = makeGradientSvg(size, size, palette);
  const svgBuffer = Buffer.from(svg, "utf8");

  // 1) Base gradiente
  const gradient = sharp(svgBuffer).resize(size, size);

  // 1bis) Maschera ridimensionata alla misura corrente
  const maskBuffer = await sharp(BASE_ICON).resize(size, size).toBuffer();

  // 2) Applica la maschera dell'icona (solo dove c'è alpha)
  const maskedBuffer = await gradient
    .composite([
      {
        input: maskBuffer,
        blend: "dest-in",
      },
    ])
    .png()
    .toBuffer();

  // Futuro: applicare la maschera del drone con colore dedicato
  // const droneLayer = await sharp(DRONE_MASK).resize(size, size).tint(DRONE_COLOR).png().toBuffer();
  // const withDrone = await sharp(maskedBuffer)
  //   .composite([{ input: droneLayer, blend: "src-over" }])
  //   .png()
  //   .toBuffer();

  const outPath = path.join(OUTPUT_DIR, name);
  await sharp(maskedBuffer).toFile(outPath);
  console.log(`Generata: ${outPath}`);
}

async function main() {
  if (!fs.existsSync(BASE_ICON)) {
    console.error(`❌ Base icon mancante: ${BASE_ICON}`);
    process.exit(1);
  }

  for (const entry of sizes) {
    await generateForSize(entry);
  }

  console.log("✅ Tutte le icone generate.");
}

main().catch((err) => {
  console.error("Errore durante la generazione delle icone:", err);
  process.exit(1);
});
