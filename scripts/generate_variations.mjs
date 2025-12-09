import fs from "fs";
import path from "path";

// 1. Setup Paths
const ROOT = process.cwd();
const ASSETS_DIR = path.join(ROOT, "assets");
const OUT_DIR = path.join(ROOT, "public", "tmp_variations");
const LOG_FILE = path.join(ROOT, "gen_log.txt");

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}\n`;
  console.log(msg);
  try { fs.appendFileSync(LOG_FILE, line); } catch (e) { }
}

log(`Starting generation...`);
log(`ROOT: ${ROOT}`);
log(`OUT_DIR: ${OUT_DIR}`);

// 2. Ensure Output Directory
try {
  if (!fs.existsSync(OUT_DIR)) {
    log("Creating output directory...");
    fs.mkdirSync(OUT_DIR, { recursive: true });
  } else {
    log("Output directory exists.");
  }
} catch (e) {
  log(`Error creating folder: ${e.message}`);
  process.exit(1);
}

// 3. Read Drone Mask
let droneBase64 = "";
try {
  const dronePath = path.join(ASSETS_DIR, "drone-mask.png");
  if (!fs.existsSync(dronePath)) {
    throw new Error(`Drone mask not found at ${dronePath}`);
  }
  const buffer = fs.readFileSync(dronePath);
  droneBase64 = `data:image/png;base64,${buffer.toString("base64")}`;
  log(`Read drone mask (${buffer.length} bytes)`);
} catch (e) {
  log(`Error reading drone mask: ${e.message}`);
  process.exit(1);
}

// 4. Define Palette
const C = {
  cyan: "#00e5ff",
  violet: "#9e3eff",
  pink: "#ff3ea5",
  orange: "#ff9900"
};

// 5. SVG Template
function createSvg(stops, droneColor) {
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-133 -133 266 266">
  <defs>
    <!-- Outer Loop (g0 -> g3) -->
    <linearGradient id="g0" x1="108.7" y1="-50.7" x2="-50.7" y2="-108.7" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${stops.g0[0]}" />
      <stop offset="100%" stop-color="${stops.g0[1]}" />
    </linearGradient>
    <linearGradient id="g1" x1="-50.7" y1="-108.7" x2="-108.7" y2="50.7" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${stops.g1[0]}" />
      <stop offset="100%" stop-color="${stops.g1[1]}" />
    </linearGradient>
    <linearGradient id="g2" x1="-108.7" y1="50.7" x2="50.7" y2="108.7" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${stops.g2[0]}" />
      <stop offset="100%" stop-color="${stops.g2[1]}" />
    </linearGradient>
    <linearGradient id="g3" x1="50.7" y1="108.7" x2="119.8" y2="6.3" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${stops.g3[0]}" />
      <stop offset="100%" stop-color="${stops.g3[1]}" />
    </linearGradient>

    <!-- Inner Loop (g4 -> g8) -->
    <linearGradient id="g4" x1="64.5" y1="66.9" x2="-25.7" y2="89.3" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${stops.g4[0]}" />
      <stop offset="100%" stop-color="${stops.g4[1]}" />
    </linearGradient>
    <linearGradient id="g5" x1="-25.7" y1="89.3" x2="-90.2" y2="22.4" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${stops.g5[0]}" />
      <stop offset="100%" stop-color="${stops.g5[1]}" />
    </linearGradient>
    <linearGradient id="g6" x1="-90.2" y1="22.4" x2="-64.5" y2="-66.9" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${stops.g6[0]}" />
      <stop offset="100%" stop-color="${stops.g6[1]}" />
    </linearGradient>
    <linearGradient id="g7" x1="-64.5" y1="-66.9" x2="25.7" y2="-89.3" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${stops.g7[0]}" />
      <stop offset="100%" stop-color="${stops.g7[1]}" />
    </linearGradient>
    <linearGradient id="g8" x1="25.7" y1="-89.3" x2="77.9" y2="-50.7" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${stops.g8[0]}" />
      <stop offset="100%" stop-color="${stops.g8[1]}" />
    </linearGradient>

    <!-- Connectors -->
    <linearGradient id="g9" x1="108.2" y1="-50.7" x2="78.4" y2="-50.7" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${stops.g9[0]}" />
      <stop offset="100%" stop-color="${stops.g9[1]}" />
    </linearGradient>
    <linearGradient id="g10" x1="118.8" y1="6.3" x2="37.2" y2="6.3" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${stops.g10[0]}" />
      <stop offset="100%" stop-color="${stops.g10[1]}" />
    </linearGradient>

    <mask id="drone-mask-1" x="-125" y="-125" width="250" height="250" maskUnits="userSpaceOnUse">
      <image href="${droneBase64}" x="-125" y="-125" width="250" height="250" />
    </mask>
  </defs>

  <!-- Drone Icon -->
  <g mask="url(#drone-mask-1)" transform="translate(0, 1)">
    <rect x="-125" y="-125" width="250" height="250" fill="${droneColor}" />
  </g>

  <!-- Logo Paths -->
  <g fill="none" stroke-width="8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 108.757 -50.714 A 120 120 0 0 0 -50.714 -108.757" stroke="url(#g0)" />
    <path d="M -50.714 -108.757 A 120 120 0 0 0 -108.757 50.714" stroke="url(#g1)" />
    <path d="M -108.757 50.714 A 120 120 0 0 0 50.714 108.757" stroke="url(#g2)" />
    <path d="M 50.714 108.757 A 120 120 0 0 0 119.836 6.280" stroke="url(#g3)" />
    
    <path d="M 64.549 66.951 A 93 93 0 0 1 -25.706 89.377" stroke="url(#g4)" />
    <path d="M -25.706 89.377 A 93 93 0 0 1 -90.256 22.426" stroke="url(#g5)" />
    <path d="M -90.256 22.426 A 93 93 0 0 1 -64.549 -66.951" stroke="url(#g6)" />
    <path d="M -64.549 -66.951 A 93 93 0 0 1 25.706 -89.377" stroke="url(#g7)" />
    <path d="M 25.706 -89.377 A 93 93 0 0 1 77.956 -50.714" stroke="url(#g8)" />
    
    <path d="M 108.257 -50.714 L 78.456 -50.714" stroke="url(#g9)" />
    <path d="M 118.836 6.280 L 37.236 6.280" stroke="url(#g10)" />
  </g>
</svg>`;
}

// 6. Define Variations
// V1: Current Colors (Outer: O->C, Inner: C->O), Drone: Cyan
const stopsV1 = {
  g0: [C.orange, C.pink],
  g1: [C.pink, C.violet],
  g2: [C.violet, C.cyan],
  g3: [C.cyan, C.cyan],
  g4: [C.cyan, C.violet],
  g5: [C.violet, C.pink],
  g6: [C.pink, C.orange],
  g7: [C.orange, C.orange],
  g8: [C.orange, C.orange],
  g9: [C.orange, C.orange], // Outer Dash
  g10: [C.cyan, C.cyan],    // Inner Dash
};

// V2: Shifted (Inner: Cyan->Orange), Drone: Orange
const stopsV2 = {
  // Outer: Same as V1
  g0: [C.orange, C.pink],
  g1: [C.pink, C.violet],
  g2: [C.violet, C.cyan],
  g3: [C.cyan, C.cyan],
  // Inner: Same as V1 (Cyan -> Orange)
  g4: [C.cyan, C.violet],
  g5: [C.violet, C.pink],
  g6: [C.pink, C.orange],
  g7: [C.orange, C.orange],
  g8: [C.orange, C.orange],
  g9: [C.orange, C.orange],
  g10: [C.orange, C.orange], // Inner Dash: Orange
};

// V3: Inverted (Inner: Orange->Cyan), Drone: Cyan
const stopsV3 = {
  // Outer: Inverted? Cyan -> Orange
  g0: [C.cyan, C.violet],
  g1: [C.violet, C.pink],
  g2: [C.pink, C.orange],
  g3: [C.orange, C.orange],
  // Inner: Orange -> Cyan
  g4: [C.orange, C.pink],
  g5: [C.pink, C.violet],
  g6: [C.violet, C.cyan],
  g7: [C.cyan, C.cyan],
  g8: [C.cyan, C.cyan],
  g9: [C.cyan, C.cyan],     // Outer Dash: Cyan (start of Outer)
  g10: [C.cyan, C.cyan],    // Inner Dash: Cyan (end of Inner)
};

// 7. Write Files
try {
  log("Writing V1...");
  fs.writeFileSync(path.join(OUT_DIR, "v1_cyan.svg"), createSvg(stopsV1, C.cyan));

  log("Writing V2...");
  fs.writeFileSync(path.join(OUT_DIR, "v2_orange.svg"), createSvg(stopsV2, C.orange));

  log("Writing V3...");
  fs.writeFileSync(path.join(OUT_DIR, "v3_inverted.svg"), createSvg(stopsV3, C.cyan));

  log("Done.");
} catch (e) {
  log(`Error writing files: ${e.message}`);
  process.exit(1);
}
