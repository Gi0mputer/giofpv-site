import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, 'public');

// CONFIGURAZIONE DEL DRONE
const CONFIG = {
    // Geometria
    circleRadius: 18,     // Raggio dei 5 cerchi (motori + centro)
    armLength: 70,        // Distanza dal centro (0,0) al centro dei motori
    strokeWidth: 8,       // Spessore linee (come la G)

    // Posizionamento nel Logo Finale
    scale: 0.8,           // Fattore di scala
    translateX: 0,        // Spostamento X
    translateY: 0,        // Spostamento Y
    rotation: 0           // Rotazione in gradi (opzionale, es. 45 per configurazione +)
};

function generateDroneSVG() {
    const { circleRadius, armLength, strokeWidth, scale, translateX, translateY, rotation } = CONFIG;

    // Calcola posizioni motori (Configurazione a X: 45, 135, 225, 315 gradi)
    const angles = [45, 135, 225, 315];

    let pathContent = '';

    // 1. Cerchio Centrale
    pathContent += `<!-- Body -->\n`;
    pathContent += `<circle cx="0" cy="0" r="${circleRadius}" />\n`;

    // 2. Bracci e Motori
    angles.forEach((angle, index) => {
        const rad = (angle * Math.PI) / 180;

        // Centro del motore
        const mx = armLength * Math.cos(rad);
        const my = armLength * Math.sin(rad);

        // Punto di inizio braccio (dal centro del motore)
        // Punto di fine braccio (sulla circonferenza del corpo centrale)
        const startX = mx;
        const startY = my;
        const endX = circleRadius * Math.cos(rad); // Si ferma sul bordo del corpo centrale
        const endY = circleRadius * Math.sin(rad);

        pathContent += `<!-- Arm & Motor ${index} (${angle}°) -->\n`;
        // Braccio
        pathContent += `<path d="M ${startX.toFixed(3)} ${startY.toFixed(3)} L ${endX.toFixed(3)} ${endY.toFixed(3)}" />\n`;
        // Motore
        pathContent += `<circle cx="${mx.toFixed(3)}" cy="${my.toFixed(3)}" r="${circleRadius}" />\n`;
    });

    // Costruisci SVG completo
    // Viewbox larga abbastanza per contenere tutto anche ruotato
    const viewSize = (armLength + circleRadius + strokeWidth) * 2 + 20;
    const halfView = viewSize / 2;

    const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-halfView} ${-halfView} ${viewSize} ${viewSize}">
  <g transform="translate(${translateX}, ${translateY}) scale(${scale}) rotate(${rotation})">
    <g fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" color="#000">
      ${pathContent}
    </g>
  </g>
</svg>
`.trim();

    return svg;
}

// Genera e salva
console.log("Generating Geometric Drone SVG...");
const svgContent = generateDroneSVG();
const outFile = path.join(OUT_DIR, 'drone_geometric_preview.svg');

fs.writeFileSync(outFile, svgContent);
console.log(`✅ Saved preview to: ${outFile}`);
console.log("Open this file in browser to check geometry and proportions.");
