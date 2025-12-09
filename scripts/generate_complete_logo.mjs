import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, 'public');

// Base colors
const COLORS = {
    cyan: '#00e5ff',
    violet: '#9e3eff',
    pink: '#ff3ea5',
    orange: '#ff9900'
};

// CONFIGURAZIONE
const CONFIG = {
    // Colori (weights in %)
    colorWeights: {
        start: 'cyan',
        end: 'orange',
        weights: { cyan: 30, orange: 70 }  // Più arancione
    },

    // Drone
    drone: {
        circleRadius: 12,      // Raggio cerchi drone
        armLength: 48,         // Lunghezza bracci
        strokeWidth: 8,        // Spessore (come la G)
        scale: 0.65,           // Scala del drone
        translateX: 78,        // Posizione X (sulla stanghetta grande)
        translateY: 6,         // Posizione Y (sulla stanghetta grande)
        rotation: 0            // Rotazione
    }
};

/**
 * Interpolate between two hex colors
 */
function interpolateColor(color1, color2, weight) {
    const c1 = parseInt(color1.slice(1), 16);
    const c2 = parseInt(color2.slice(1), 16);

    const r1 = (c1 >> 16) & 0xff;
    const g1 = (c1 >> 8) & 0xff;
    const b1 = c1 & 0xff;

    const r2 = (c2 >> 16) & 0xff;
    const g2 = (c2 >> 8) & 0xff;
    const b2 = c2 & 0xff;

    const r = Math.round(r1 + (r2 - r1) * weight);
    const g = Math.round(g1 + (g2 - g1) * weight);
    const b = Math.round(b1 + (b2 - b1) * weight);

    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

/**
 * Calculate color at a specific percentage of the journey
 */
function getColorAtPosition(percentage, config) {
    const { start, end, weights } = config;
    const startWeight = weights[start] || 50;
    const endWeight = weights[end] || 50;

    if (percentage <= startWeight) {
        const localWeight = percentage / startWeight;
        return interpolateColor(COLORS[start], COLORS.violet, localWeight);
    } else if (percentage <= 50) {
        const localWeight = (percentage - startWeight) / (50 - startWeight);
        return interpolateColor(COLORS.violet, COLORS.pink, localWeight);
    } else {
        const localWeight = (percentage - 50) / (100 - 50);
        return interpolateColor(COLORS.pink, COLORS[end], localWeight);
    }
}

/**
 * Get gradient coordinates for a specific gradient ID
 */
function getGradientCoords(id) {
    const coords = {
        0: 'x1="108.757" y1="-50.714" x2="-50.714" y2="-108.757"',
        1: 'x1="-50.714" y1="-108.757" x2="-108.757" y2="50.714"',
        2: 'x1="-108.757" y1="50.714" x2="50.714" y2="108.757"',
        3: 'x1="50.714" y1="108.757" x2="119.836" y2="6.280"',
        4: 'x1="64.549" y1="66.951" x2="-25.706" y2="89.377"',
        5: 'x1="-25.706" y1="89.377" x2="-90.256" y2="22.426"',
        6: 'x1="-90.256" y1="22.426" x2="-64.549" y2="-66.951"',
        7: 'x1="-64.549" y1="-66.951" x2="25.706" y2="-89.377"',
        8: 'x1="25.706" y1="-89.377" x2="77.956" y2="-50.714"'
    };
    return coords[id] || '';
}

/**
 * Generate drone SVG paths
 */
function generateDronePaths(config) {
    const { circleRadius, armLength } = config;
    const angles = [45, 135, 225, 315];

    let paths = '';

    // Body
    paths += `<circle cx="0" cy="0" r="${circleRadius}" />\n      `;

    // Arms and motors
    angles.forEach((angle) => {
        const rad = (angle * Math.PI) / 180;
        const mx = armLength * Math.cos(rad);
        const my = armLength * Math.sin(rad);
        const endX = circleRadius * Math.cos(rad);
        const endY = circleRadius * Math.sin(rad);

        paths += `<path d="M ${mx.toFixed(1)} ${my.toFixed(1)} L ${endX.toFixed(1)} ${endY.toFixed(1)}" />\n      `;
        paths += `<circle cx="${mx.toFixed(1)}" cy="${my.toFixed(1)}" r="${circleRadius}" />\n      `;
    });

    return paths.trim();
}

/**
 * Generate complete logo with drone
 */
function generateCompleteLogo() {
    const config = CONFIG.colorWeights;
    const droneConfig = CONFIG.drone;

    // Calculate colors for each segment (11 segments total)
    const segmentPercentages = [9, 18, 27, 36, 45, 55, 64, 73, 82, 91, 100];

    // Generate gradient definitions
    let gradientDefs = '';

    // Inner arc (grad-4 to grad-8)
    for (let i = 0; i < 5; i++) {
        const startPct = i === 0 ? 0 : segmentPercentages[i - 1];
        const endPct = segmentPercentages[i];
        const startColor = getColorAtPosition(startPct, config);
        const endColor = getColorAtPosition(endPct, config);

        gradientDefs += `
    <linearGradient id="grad-${i + 4}" ${getGradientCoords(i + 4)} gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${startColor}" />
      <stop offset="100%" stop-color="${endColor}" />
    </linearGradient>`;
    }

    // Short dash (grad-9)
    const dash9Start = getColorAtPosition(segmentPercentages[4], config);
    const dash9End = getColorAtPosition(segmentPercentages[5], config);
    gradientDefs += `
    <linearGradient id="grad-9" x1="78.456" y1="-50.714" x2="108.257" y2="-50.714" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${dash9Start}" />
      <stop offset="100%" stop-color="${dash9End}" />
    </linearGradient>`;

    // Outer arc (grad-0 to grad-3)
    for (let i = 0; i < 4; i++) {
        const startPct = segmentPercentages[5 + i];
        const endPct = segmentPercentages[6 + i];
        const startColor = getColorAtPosition(startPct, config);
        const endColor = getColorAtPosition(endPct, config);

        gradientDefs += `
    <linearGradient id="grad-${i}" ${getGradientCoords(i)} gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${startColor}" />
      <stop offset="100%" stop-color="${endColor}" />
    </linearGradient>`;
    }

    // Long dash (grad-10)
    const dash10Start = getColorAtPosition(segmentPercentages[9], config);
    const dash10End = getColorAtPosition(100, config);
    gradientDefs += `
    <linearGradient id="grad-10" x1="118.836" y1="6.280" x2="37.236" y2="6.280" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${dash10Start}" />
      <stop offset="100%" stop-color="${dash10End}" />
    </linearGradient>`;

    // Drone color (final color)
    const droneColor = getColorAtPosition(100, config);

    // Generate drone paths
    const dronePaths = generateDronePaths(droneConfig);

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-133 -133 266 266">
  <defs>
    ${gradientDefs}
  </defs>
  
  <g fill="none" stroke-width="8" stroke-linecap="round" stroke-linejoin="round">
    <!-- Arco Esterno -->
    <path d="M 108.757 -50.714 A 120 120 0 0 0 -50.714 -108.757" stroke="url(#grad-0)" />
    <path d="M -50.714 -108.757 A 120 120 0 0 0 -108.757 50.714" stroke="url(#grad-1)" />
    <path d="M -108.757 50.714 A 120 120 0 0 0 50.714 108.757" stroke="url(#grad-2)" />
    <path d="M 50.714 108.757 A 120 120 0 0 0 119.836 6.280" stroke="url(#grad-3)" />
    
    <!-- Arco Interno -->
    <path d="M 64.549 66.951 A 93 93 0 0 1 -25.706 89.377" stroke="url(#grad-4)" />
    <path d="M -25.706 89.377 A 93 93 0 0 1 -90.256 22.426" stroke="url(#grad-5)" />
    <path d="M -90.256 22.426 A 93 93 0 0 1 -64.549 -66.951" stroke="url(#grad-6)" />
    <path d="M -64.549 -66.951 A 93 93 0 0 1 25.706 -89.377" stroke="url(#grad-7)" />
    <path d="M 25.706 -89.377 A 93 93 0 0 1 77.956 -50.714" stroke="url(#grad-8)" />
    
    <!-- Stanghette -->
    <path d="M 108.257 -50.714 L 78.456 -50.714" stroke="url(#grad-9)" />
    <path d="M 118.836 6.280 L 37.236 6.280" stroke="url(#grad-10)" />
    
    <!-- Drone -->
    <g transform="translate(${droneConfig.translateX}, ${droneConfig.translateY}) scale(${droneConfig.scale}) rotate(${droneConfig.rotation})" stroke="${droneColor}">
      ${dronePaths}
    </g>
  </g>
</svg>`;

    return svg;
}

// Generate and save
console.log('🎨 Generating complete logo with drone...');
const svgContent = generateCompleteLogo();
const outFile = path.join(OUT_DIR, 'logo_complete_with_drone.svg');

fs.writeFileSync(outFile, svgContent);
console.log(`✅ Saved to: ${outFile}`);
console.log('📍 Drone positioned at end of color sequence (orange)');
