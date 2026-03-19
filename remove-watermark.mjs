import sharp from 'sharp';
import { readdir } from 'fs/promises';
import path from 'path';

// Watermark is in the bottom-right corner of each frame
// Paint a black rectangle over it

async function removeWatermark(dir, width, height) {
  const files = (await readdir(dir)).filter(f => f.endsWith('.jpg')).sort();
  console.log(`Processing ${files.length} frames in ${dir} (${width}x${height})`);

  // Size of the black patch — covers the watermark generously
  const patchW = Math.round(width * 0.08);
  const patchH = Math.round(height * 0.10);
  const patchX = width - patchW;
  const patchY = height - patchH;

  // Create a black rectangle as a PNG buffer
  const patch = await sharp({
    create: {
      width: patchW,
      height: patchH,
      channels: 3,
      background: { r: 0, g: 0, b: 0 }
    }
  }).png().toBuffer();

  let count = 0;
  for (const file of files) {
    const filePath = path.join(dir, file);
    const output = await sharp(filePath)
      .composite([{
        input: patch,
        left: patchX,
        top: patchY,
      }])
      .jpeg({ quality: 90 })
      .toBuffer();

    await sharp(output).toFile(filePath);
    count++;
    if (count % 20 === 0) console.log(`  ${count}/${files.length}`);
  }
  console.log(`  Done: ${count} frames`);
}

// Process all three frame directories
await removeWatermark('frames-360', 1948, 1060);
await removeWatermark('frames-arch', 974, 532);
await removeWatermark('frames-hand', 974, 532);

console.log('All watermarks removed!');
