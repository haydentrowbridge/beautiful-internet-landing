#!/usr/bin/env python3
"""High-quality green screen removal with edge refinement."""

import os
import numpy as np
from PIL import Image, ImageFilter

def chroma_key(input_path, output_path, crop_margin=True):
    """Remove green screen with multi-pass refinement."""
    img = Image.open(input_path).convert('RGBA')
    w, h = img.size
    data = np.array(img, dtype=np.float64)
    r, g, b = data[:,:,0], data[:,:,1], data[:,:,2]

    # ── Pass 1: Build raw green mask ──
    # Normalize channels
    total = r + g + b + 1e-6
    rn, gn, bn = r / total, g / total, b / total

    # Green screen has high green ratio and green >> red, blue
    green_ratio = gn  # how much of total is green
    green_diff = g - np.maximum(r, b)  # absolute green excess

    # Core mask: definitely green screen
    mask = np.zeros((h, w), dtype=np.float64)

    # Tier 1: Obviously green (bright green screen)
    t1 = (green_diff > 25) & (green_ratio > 0.40)
    mask[t1] = 1.0

    # Tier 2: Medium green (dimmer areas, edges)
    t2 = (green_diff > 12) & (green_ratio > 0.37) & ~t1
    strength = np.clip((green_diff[t2] - 12) / 13, 0.3, 1.0)
    mask[t2] = strength

    # Tier 3: Weak green fringe
    t3 = (green_diff > 4) & (green_ratio > 0.35) & ~t1 & ~t2
    strength3 = np.clip((green_diff[t3] - 4) / 8, 0.1, 0.7)
    mask[t3] = strength3

    # Tier 4: Dark green shadows (low brightness but still green-tinted)
    brightness = total / 3.0
    t4 = (green_ratio > 0.40) & (brightness < 80) & (green_diff > 2) & ~t1 & ~t2 & ~t3
    mask[t4] = np.clip((green_ratio[t4] - 0.40) / 0.05, 0.3, 0.9)

    # ── Pass 2: Refine mask edges with blur + threshold ──
    # Convert to PIL for Gaussian blur
    mask_img = Image.fromarray((mask * 255).astype(np.uint8), 'L')
    # Dilate slightly to catch fringe pixels
    mask_dilated = mask_img.filter(ImageFilter.MaxFilter(3))
    # Smooth edges
    mask_smooth = mask_dilated.filter(ImageFilter.GaussianBlur(radius=1.2))
    mask_refined = np.array(mask_smooth, dtype=np.float64) / 255.0

    # Re-threshold: push near-zero back to zero, near-one to one
    mask_refined = np.clip((mask_refined - 0.08) / 0.84, 0, 1)

    # ── Pass 3: Despill green from kept pixels ──
    alpha = 1.0 - mask_refined
    # For pixels we're keeping, remove green contamination
    keep = alpha > 0.05
    avg_rb = (r + b) / 2.0
    spill = g - avg_rb

    # Despill strength based on how green the pixel is
    despill_strength = np.clip(spill / 60, 0, 1) * 0.85
    g_new = g.copy()
    g_new[keep] = g[keep] - spill[keep] * despill_strength[keep]
    g_new = np.clip(g_new, 0, 255)

    # Also slightly warm the despilled pixels (add a tiny bit of red)
    r_new = r.copy()
    warm_mask = keep & (spill > 15)
    r_new[warm_mask] = np.clip(r[warm_mask] + spill[warm_mask] * 0.08, 0, 255)

    # ── Pass 4: Remove watermark (bottom-right sparkle) ──
    # Watermark is in bottom-right ~8% area
    wm_y = int(h * 0.88)
    wm_x = int(w * 0.88)
    alpha[wm_y:, wm_x:] = 0

    # Also kill the very bottom strip (sometimes has text watermark)
    alpha[int(h * 0.97):, :] = 0

    # ── Compose output ──
    out = np.zeros_like(data)
    out[:,:,0] = r_new
    out[:,:,1] = g_new
    out[:,:,2] = b
    out[:,:,3] = np.clip(alpha * 255, 0, 255)

    result = Image.fromarray(out.astype(np.uint8), 'RGBA')

    # ── Crop to content bounds (remove empty space) ──
    if crop_margin:
        bbox = result.getbbox()
        if bbox:
            # Add small padding
            pad = 20
            x1 = max(0, bbox[0] - pad)
            y1 = max(0, bbox[1] - pad)
            x2 = min(w, bbox[2] + pad)
            y2 = min(h, bbox[3] + pad)
            result = result.crop((x1, y1, x2, y2))

    result.save(output_path, 'PNG', optimize=True)

    # Stats
    alpha_arr = np.array(result)[:,:,3]
    total_px = alpha_arr.size
    trans = np.sum(alpha_arr == 0)
    opaque = np.sum(alpha_arr == 255)
    semi = total_px - trans - opaque
    print(f"  {os.path.basename(output_path)}: {opaque/total_px*100:.0f}% opaque, {semi/total_px*100:.0f}% edge, {trans/total_px*100:.0f}% transparent")


# ── Process all images ──
images = [
    'new_globe.png',
    'globe2.png',
    'paper1.png',
    'paper2.png',
    'map2.png',
    'plate1.png',
]

base = 'assets/images'
out_dir = 'assets/images/processed'
os.makedirs(out_dir, exist_ok=True)

for name in images:
    src = os.path.join(base, name)
    dst = os.path.join(out_dir, name)
    if os.path.exists(src):
        print(f"Processing {name}...")
        chroma_key(src, dst)
    else:
        print(f"  SKIP (not found): {src}")

# Also create dark-bg composites for verification
print("\nGenerating dark-bg previews...")
for name in images:
    src = os.path.join(out_dir, name)
    if os.path.exists(src):
        img = Image.open(src).convert('RGBA')
        bg = Image.new('RGBA', img.size, (37, 33, 24, 255))
        comp = Image.alpha_composite(bg, img)
        comp.save(os.path.join(out_dir, f'preview_{name}'))

print("Done.")
