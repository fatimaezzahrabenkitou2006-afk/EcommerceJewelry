import sharp from "sharp";
import { mkdirSync } from "node:fs";

// Preserve the exact photographs supplied in the reference, without regenerating them.
const source = "Éclat Joaillerie — Lumière Éternelle.png";
const destination = "public/images/eclat";
mkdirSync(destination, { recursive: true });
const crops = {
  hero: [325, 60, 521, 221],
  "hero-texture": [0, 60, 76, 221],
  "category-rings": [41, 329, 150, 70],
  "category-necklaces": [197, 329, 147, 70],
  "category-earrings": [351, 329, 147, 70],
  "category-bracelets": [505, 329, 145, 70],
  "category-collections": [657, 329, 148, 70],
  "ring-eternity": [43, 484, 147, 81],
  "necklace-flower": [198, 484, 146, 81],
  "earrings-light": [352, 484, 145, 81],
  "bracelet-elegance": [505, 484, 145, 81],
  "ring-solitaire": [658, 484, 145, 81],
  "ring-pear": [42, 671, 184, 68],
  "necklace-clover": [236, 671, 183, 68],
  "earrings-royal": [429, 671, 182, 68],
  "bracelet-river": [623, 671, 181, 68],
  artisan: [0, 786, 365, 171],
  seasonal: [316, 1009, 530, 137],
  "seasonal-texture": [0, 1009, 65, 137],
  gift: [36, 1191, 184, 90],
  "inspiration-1": [35, 1448, 106, 92],
  "inspiration-2": [148, 1448, 106, 92],
  "inspiration-3": [261, 1448, 106, 92],
  "inspiration-4": [373, 1448, 106, 92],
  "inspiration-5": [486, 1448, 106, 92],
  "inspiration-6": [599, 1448, 106, 92],
  "inspiration-7": [712, 1448, 100, 92],
  "diamond-decoration": [40, 1566, 160, 94],
  "flowers-left": [0, 1295, 115, 99],
  "flowers-right": [747, 1295, 99, 99],
  "newsletter-left": [0, 1673, 128, 74],
  "newsletter-right": [728, 1673, 118, 74],
};
await Promise.all(
  Object.entries(crops).map(async ([name, [left, top, width, height]]) => {
    await sharp(source)
      .extract({ left, top, width, height })
      .webp({ quality: 96 })
      .toFile(`${destination}/${name}.webp`);
  }),
);
console.log(`Extracted ${Object.keys(crops).length} reference assets.`);
