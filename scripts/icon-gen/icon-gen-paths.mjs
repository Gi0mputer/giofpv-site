import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const ROOT = path.resolve(__dirname, "..", "..");

// Cartelle Output Public
export const PUBLIC_ICONS_DIR = path.join(ROOT, "public", "icons");
export const PUBLIC_BRAND_DIR = path.join(ROOT, "public", "brand");
export const PUBLIC_IMAGES_DIR = path.join(ROOT, "public", "images");

// Cartelle Output Vecchie (per compatibilità script non aggiornati se ce ne sono)
// Ma cercheremo di aggiornare gli script
export const ICON_GEN_DIR = PUBLIC_ICONS_DIR;

// Assets Sorgente (maschere, etc.)
export const ASSETS_DIR = path.join(__dirname, "assets");

export function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}
