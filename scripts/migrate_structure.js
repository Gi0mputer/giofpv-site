const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();

// Helper to move file
function move(src, dest) {
    const srcPath = path.join(ROOT, src);
    const destPath = path.join(ROOT, dest);
    const destDir = path.dirname(destPath);

    if (!fs.existsSync(srcPath)) {
        console.log(`SKIP: Source not found ${src}`);
        return;
    }

    if (!fs.existsSync(destDir)) {
        console.log(`MKDIR: ${destDir}`);
        fs.mkdirSync(destDir, { recursive: true });
    }

    fs.renameSync(srcPath, destPath);
    console.log(`MOVED: ${src} -> ${dest}`);
}

// 1. Move Images -> public/images
move('public/mini3pro.png', 'public/images/mini3pro.png');
move('public/avata2.png', 'public/images/avata2.png');
move('public/profilepic.png', 'public/images/profilepic.png');

// 2. Move Icons -> public/icons
move('public/apple-touch-icon.png', 'public/icons/apple-touch-icon.png');
move('public/favicon-192x192.png', 'public/icons/favicon-192x192.png');
move('public/favicon-32x32.png', 'public/icons/favicon-32x32.png');
move('public/favicon-48x48.png', 'public/icons/favicon-48x48.png');
['512x512'].forEach(size => {
    move(`public/icon-${size}.png`, `public/icons/icon-${size}.png`);
});

// 3. Move Brand -> public/brand
move('public/logo_final.svg', 'public/brand/logo_final.svg');
move('public/logo_complete_with_drone.svg', 'public/brand/logo_complete_with_drone.svg');
move('public/drone_geometric.svg', 'public/brand/drone_geometric.svg');

// 4. Move Scripts -> scripts/icon-gen
const scriptsToMove = [
    'generate-logo.mjs',
    'generate-icons.mjs',
    'generate-palette-previews.mjs',
    'debug-geometry.mjs',
    'fix-mask.mjs',
    'icon-gen-paths.mjs'
];

scriptsToMove.forEach(script => {
    move(`public/icon-gen/${script}`, `scripts/icon-gen/${script}`);
});

// 5. Move Assets -> scripts/icon-gen/assets
move('public/icon-gen/drone-mask.png', 'scripts/icon-gen/assets/drone-mask.png');

console.log('Migration Complete');
