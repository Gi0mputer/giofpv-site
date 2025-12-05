
const fs = require('fs');

function polarToCartesian(cx, cy, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees * Math.PI) / 180.0;
  return {
    x: cx + radius * Math.cos(angleInRadians),
    y: cy + radius * Math.sin(angleInRadians)
  };
}

// Parameters
const CX = 256;
const CY = 256;
const RO = 210; // Outer Radius
const RI = 135; // Inner Radius
const SW = 65;  // Stroke Width INCREASED to match reference

// Angles
const ANGLE_TOP = 315; // -45 deg
const ANGLE_BOTTOM = 45;
const ANGLE_BAR = 0;   // Bar is on the horizontal right

// Coordinates
const pOutTop = polarToCartesian(CX, CY, RO, ANGLE_TOP);
const pOutBottom = polarToCartesian(CX, CY, RO, ANGLE_BOTTOM);
const pInBottom = polarToCartesian(CX, CY, RI, ANGLE_BOTTOM);
const pInBarStart = polarToCartesian(CX, CY, RI, ANGLE_BAR);
const pInTop = polarToCartesian(CX, CY, RI, ANGLE_TOP); // Inner Top End

// Turn Radius for U-turns
const turnRadius = (RO - RI) / 2;

// Path Construction Logic - SINGLE CONTINUOUS PATH
// 1. Move to Inner Top End (Start of loop)
// 2. Line to Outer Top End (Closing the top gap)
// 3. Arc Outer CW to Bottom
// 4. Arc/Turn to Inner Bottom (Closing the bottom gap)
// 5. Arc Inner CCW to Bar Start
// 6. Line to Bar End (Center)

const d = [
  "M", pInTop.x.toFixed(1), pInTop.y.toFixed(1), // Move to Inner Top
  "L", pOutTop.x.toFixed(1), pOutTop.y.toFixed(1), // Line to Outer Top (Top Connection)
  "A", RO, RO, 0, 0, 1, pOutBottom.x.toFixed(1), pOutBottom.y.toFixed(1), // Outer Arc (CW to Bottom)
  "A", turnRadius, turnRadius, 0, 0, 1, pInBottom.x.toFixed(1), pInBottom.y.toFixed(1), // Bottom U-Turn
  "A", RI, RI, 0, 0, 0, pInBarStart.x.toFixed(1), pInBarStart.y.toFixed(1), // Inner Arc (CCW to Bar)
  "L", (CX + 40), CY // Bar Line (to center-ish)
].join(" ");

const svgContent = `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <path d="${d}" stroke="#4B5563" stroke-width="${SW}" stroke-linecap="round" fill="none" stroke-linejoin="round"/>
</svg>`;

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    body { background: #111; color: white; display: flex; flex-direction: column; align-items: center; gap: 20px; font-family: sans-serif; }
    svg { width: 300px; height: 300px; border: 1px solid #333; }
    .row { display: flex; gap: 20px; }
  </style>
</head>
<body>
  <h1>Generated SVG Preview (Single Path Spiral)</h1>
  <div class="row">
    <div>
      <h3>New Generator Output</h3>
      ${svgContent}
    </div>
    <div>
      <h3>Original (for reference)</h3>
      <img src="/icon-512x512.png" width="300" height="300" style="border: 1px solid #333">
    </div>
  </div>
</body>
</html>
`;

fs.writeFileSync('public/g-logo.svg', svgContent);
fs.writeFileSync('public/g-logo-preview.html', htmlContent);
console.log('SVG and Preview generated.');
