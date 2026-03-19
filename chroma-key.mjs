import sharp from 'sharp';
import path from 'path';
import { readdir } from 'fs/promises';

const INPUT_DIR = 'assets/images';
const OUTPUT_DIR = 'assets/images/processed';

// Files to process
const FILES = ['globe1.png', 'globe2.png', 'plate1.png', 'map2.png', 'paper1.png', 'paper2.png', 'new_globe.png'];

async function chromaKey(inputPath, outputPath) {
  const image = sharp(inputPath);
  const { width, height, channels } = await image.metadata();

  // Get raw pixel data
  const raw = await image.ensureAlpha().raw().toBuffer();
  const pixels = new Uint8Array(raw);

  // Multi-pass chroma key
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];

    // Convert to HSL-ish for better green detection
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    // Green dominance ratio
    const greenDominance = g - Math.max(r, b);
    const brightness = (r + g + b) / 3;
    const saturation = max === 0 ? 0 : delta / max;

    // Calculate hue
    let hue = 0;
    if (delta > 0) {
      if (max === g) {
        hue = 60 * (((b - r) / delta) + 2);
      } else if (max === r) {
        hue = 60 * (((g - b) / delta) % 6);
      } else {
        hue = 60 * (((r - g) / delta) + 4);
      }
    }
    if (hue < 0) hue += 360;

    // Strong green screen: high saturation green
    const isStrongGreen = hue > 70 && hue < 170 && saturation > 0.3 && greenDominance > 20;

    // Medium green: less saturated but still green-dominant
    const isMediumGreen = hue > 60 && hue < 180 && saturation > 0.15 && greenDominance > 10 && brightness > 40;

    // Edge green: very subtle green tint (for halos)
    const isEdgeGreen = hue > 55 && hue < 185 && saturation > 0.08 && greenDominance > 5 && brightness > 30;

    if (isStrongGreen) {
      // Fully transparent
      pixels[i + 3] = 0;
    } else if (isMediumGreen) {
      // Mostly transparent with some feathering
      const strength = Math.min(1, (greenDominance - 10) / 30);
      pixels[i + 3] = Math.round(pixels[i + 3] * (1 - strength * 0.95));
      // Despill: remove green cast from remaining pixels
      if (pixels[i + 3] > 0) {
        const spill = Math.max(0, g - Math.max(r, b));
        pixels[i + 1] = Math.max(0, g - spill * 0.8);
      }
    } else if (isEdgeGreen) {
      // Subtle edge cleanup — despill only
      const spill = Math.max(0, g - Math.max(r, b));
      if (spill > 3) {
        pixels[i + 1] = Math.max(0, g - spill * 0.6);
        // Slight alpha reduction for halo
        const alphaReduce = Math.min(0.3, spill / 80);
        pixels[i + 3] = Math.round(pixels[i + 3] * (1 - alphaReduce));
      }
    } else {
      // Non-green pixels: still despill any remaining green cast
      const spill = Math.max(0, g - ((r + b) / 2) - 15);
      if (spill > 0) {
        pixels[i + 1] = Math.max(0, g - spill * 0.4);
      }
    }
  }

  // Second pass: clean up isolated opaque pixels surrounded by transparent (noise)
  const w = width;
  const h = height;
  const alpha = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) {
    alpha[i] = pixels[i * 4 + 3];
  }

  for (let y = 2; y < h - 2; y++) {
    for (let x = 2; x < w - 2; x++) {
      const idx = y * w + x;
      if (alpha[idx] > 0) {
        // Count transparent neighbors in 5x5 area
        let transparentCount = 0;
        let totalCount = 0;
        for (let dy = -2; dy <= 2; dy++) {
          for (let dx = -2; dx <= 2; dx++) {
            if (dx === 0 && dy === 0) continue;
            const nIdx = (y + dy) * w + (x + dx);
            totalCount++;
            if (alpha[nIdx] === 0) transparentCount++;
          }
        }
        // If mostly surrounded by transparent, fade this pixel
        if (transparentCount > totalCount * 0.7) {
          const fade = transparentCount / totalCount;
          pixels[idx * 4 + 3] = Math.round(pixels[idx * 4 + 3] * (1 - fade * 0.8));
        }
      }
    }
  }

  // Third pass: edge smoothing — feather the boundary
  const alpha2 = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) {
    alpha2[i] = pixels[i * 4 + 3];
  }

  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const idx = y * w + x;
      if (alpha2[idx] > 0 && alpha2[idx] < 255) continue; // already feathered
      if (alpha2[idx] === 0) continue;

      // Check if this is an edge pixel (has transparent neighbor)
      let hasTransparent = false;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (alpha2[(y + dy) * w + (x + dx)] === 0) {
            hasTransparent = true;
            break;
          }
        }
        if (hasTransparent) break;
      }

      if (hasTransparent) {
        // Feather this edge pixel
        pixels[idx * 4 + 3] = Math.round(pixels[idx * 4 + 3] * 0.7);
        // Extra despill on edges
        const r = pixels[idx * 4];
        const g = pixels[idx * 4 + 1];
        const b = pixels[idx * 4 + 2];
        const spill = Math.max(0, g - Math.max(r, b));
        if (spill > 0) {
          pixels[idx * 4 + 1] = Math.max(0, g - spill * 0.7);
        }
      }
    }
  }

  await sharp(Buffer.from(pixels.buffer), {
    raw: { width, height, channels: 4 }
  })
    .png()
    .toFile(outputPath);

  console.log(`Processed: ${outputPath}`);
}

for (const file of FILES) {
  const input = path.join(INPUT_DIR, file);
  const output = path.join(OUTPUT_DIR, file);
  await chromaKey(input, output);
}

console.log('Done!');
