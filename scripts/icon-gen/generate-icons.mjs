import fs from "fs";
import path from "path";
import sharp from "sharp";
import { PUBLIC_ICONS_DIR, ROOT, ensureDir } from "./icon-gen-paths.mjs";
import { buildLogoSvg } from "./generate_logo_final.mjs";

const THEME_COLORS = path.join(ROOT, "app", "theme", "colors.json");

function loadPalette() {
    try {
        const raw = fs.readFileSync(THEME_COLORS, "utf8");
        const json = JSON.parse(raw);
        const [c1, c2, c3, c4] = json.logo || [];
        const drone = json.drone || c4 || c3 || "#ffffff";
        if (!c1 || !c2 || !c3) throw new Error("Logo palette incompleta");
        return { c1, c2, c3, c4: c4 || c3, drone };
    } catch (err) {
        console.warn("Palette non trovata o incompleta, uso fallback:", err.message);
        return { c1: "#ff9900", c2: "#9e3eff", c3: "#ff3ea5", c4: "#00e5ff", drone: "#ffffff" };
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


async function generateForSize(entry) {
    const { size, name } = entry;

    // Usa la configurazione definita in generate_logo_final.mjs (che l'utente ha modificato)
    const svg = buildLogoSvg({
        drone: { enabled: true }
    });

    const outPath = path.join(PUBLIC_ICONS_DIR, name);
    await sharp(Buffer.from(svg, "utf8"))
        .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toFile(outPath);

    console.log(`Generata: ${outPath}`);
}

async function cleanOldIcons() {
    console.log("Cleaning old icons in " + PUBLIC_ICONS_DIR + "...");
    if (fs.existsSync(PUBLIC_ICONS_DIR)) {
        const files = fs.readdirSync(PUBLIC_ICONS_DIR);
        for (const file of files) {
            if (file.endsWith(".png") || file.endsWith(".ico")) {
                fs.unlinkSync(path.join(PUBLIC_ICONS_DIR, file));
                console.log(`Deleted: ${file}`);
            }
        }
    }
}

async function main() {
    ensureDir(PUBLIC_ICONS_DIR);

    await cleanOldIcons();

    for (const entry of sizes) {
        await generateForSize(entry);
    }

    console.log("Tutte le icone generate.");
}

main().catch((err) => {
    console.error("Errore durante la generazione delle icone:", err);
    process.exit(1);
});
