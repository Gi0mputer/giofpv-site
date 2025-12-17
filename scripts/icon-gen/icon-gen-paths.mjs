import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const ROOT = path.resolve(__dirname, "..", "..");

// Public output directories
export const PUBLIC_ICONS_DIR = path.join(ROOT, "public", "icons");
export const PUBLIC_IMAGES_DIR = path.join(ROOT, "public", "images");

// Legacy compatibility (deprecated - use PUBLIC_ICONS_DIR)
export const ICON_GEN_DIR = PUBLIC_ICONS_DIR;

// Assets Sorgente (maschere, etc.)
export const ASSETS_DIR = path.join(__dirname, "assets");

export function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}
