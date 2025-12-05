
const fs = require('fs');

function polarToCartesian(cx, cy, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees * Math.PI) / 180.0;
    return {
        x: cx + radius * Math.cos(angleInRadians),
        y: cy + radius * Math.sin(angleInRadians)
    };
}

// Restoration to Clean Geometry with Standard Proportions
const CX = 256;
const CY = 256;
const RO = 215; // Outer Radius
const RI = 145; // Inner Radius
const SW = 15;  // Stroke Width (Thinner, cleaner)

// Angles
const ANGLE_START = 45;  // Bottom Right
const ANGLE_END = 315;   // Top Right (-45)

const pOutStart = polarToCartesian(CX, CY, RO, ANGLE_START);
const pOutEnd = polarToCartesian(CX, CY, RO, ANGLE_END);
const pInStart = polarToCartesian(CX, CY, RI, ANGLE_START);
const pInEnd = polarToCartesian(CX, CY, RI, ANGLE_END);

const dOuter = [
    "M", pOutStart.x.toFixed(1), pOutStart.y.toFixed(1),
    "A", RO, RO, 0, 1, 0, pOutEnd.x.toFixed(1), pOutEnd.y.toFixed(1)
].join(" ");

const dInner = [
    "M", pInStart.x.toFixed(1), pInStart.y.toFixed(1),
    "A", RI, RI, 0, 1, 0, pInEnd.x.toFixed(1), pInEnd.y.toFixed(1)
].join(" ");

// Connections (Straight lines for verify positions)
const topConn = `M ${pOutEnd.x.toFixed(1)} ${pOutEnd.y.toFixed(1)} L ${pInEnd.x.toFixed(1)} ${pInEnd.y.toFixed(1)}`;
const botConn = `M ${pOutStart.x.toFixed(1)} ${pOutStart.y.toFixed(1)} L ${pInStart.x.toFixed(1)} ${pInStart.y.toFixed(1)}`;

// Bar: Horizontal from Center+RI to Center
const bar = `M ${CX} ${CY} L ${CX + RI} ${CY}`;

const dAll = `${dOuter} ${dInner} ${topConn} ${botConn} ${bar}`;

const svgContent = `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <path d="${dAll}" stroke="#4B5563" stroke-width="${SW}" stroke-linecap="round" fill="none" stroke-linejoin="round"/>
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
  <h1>Generated SVG Preview (Clean Lines)</h1>
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
