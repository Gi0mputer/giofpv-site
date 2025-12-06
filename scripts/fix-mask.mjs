import sharp from 'sharp';
import path from 'path';

const inputPath = path.join(process.cwd(), 'assets', 'drone-mask.png');
const outputPath = inputPath;

async function fixMask() {
    try {
        console.log('Processing:', inputPath);

        // Load the image
        const image = sharp(inputPath);
        const metadata = await image.metadata();

        // Create a new image based on the alpha channel
        // We want: Visible pixels -> 255 (White), Invisible -> 0 (Black)
        // approach: extract alpha, then threshold.

        // Ensure we are working with the alpha channel.
        // If we simply extract alpha, we get a grayscale where 255=opaque, 0=transparent.
        // We then force it to a 2-color palette (threshold) to remove partial transparency.

        await image
            .ensureAlpha() // Make sure we have alpha
            .extractChannel('alpha') // Get the opacity map
            .toColorspace('b-w') // Grayscale
            .threshold(128)      // < 128 -> 0, >= 128 -> 255
            .toFile(outputPath + '.tmp.png'); // Save to temp

        import('fs').then(fs => {
            // Force file overwrite
            try {
                if (fs.existsSync(outputPath)) {
                    fs.unlinkSync(outputPath);
                }
                fs.renameSync(outputPath + '.tmp.png', outputPath);
                console.log('Done: Drone mask is now valid B/W binary.');
            } catch (e) {
                console.error('File lock error:', e);
            }
        });

    } catch (err) {
        console.error('Error:', err);
    }
}

fixMask();
