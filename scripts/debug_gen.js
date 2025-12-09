const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const OUT = path.join(ROOT, 'public', 'tmp_variations');
const ASSETS = path.join(ROOT, 'assets');

console.log("Debug script started.");
console.log("ROOT:", ROOT);

try {
    if (!fs.existsSync(OUT)) {
        console.log("Creating output dir:", OUT);
        fs.mkdirSync(OUT, { recursive: true });
    }

    // Check asset
    const dronePath = path.join(ASSETS, 'drone-mask.png');
    if (fs.existsSync(dronePath)) {
        const stats = fs.statSync(dronePath);
        console.log(`Asset found: ${dronePath} (${stats.size} bytes)`);

        // Read it
        const buf = fs.readFileSync(dronePath);
        console.log("Read asset successfully.");

        // Write dummy file
        const dummyPath = path.join(OUT, 'test.txt');
        fs.writeFileSync(dummyPath, `Asset size: ${stats.size}`);
        console.log("Wrote dummy file:", dummyPath);

    } else {
        console.error("Asset NOT found:", dronePath);
    }

} catch (e) {
    console.error("Error:", e);
}
console.log("Debug script finished.");
