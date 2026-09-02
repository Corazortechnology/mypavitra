#!/usr/bin/env node
/** Generate room background SVGs for Place in Room feature */
import { mkdirSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "../apps/web/public/images/rooms");

mkdirSync(OUT, { recursive: true });

function roomSvg(name, body) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="wall" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#FAF7F2"/>
      <stop offset="100%" style="stop-color:#F0EBE3"/>
    </linearGradient>
    <radialGradient id="warmLight" cx="50%" cy="20%" r="60%">
      <stop offset="0%" style="stop-color:#FFE4B5;stop-opacity:0.4"/>
      <stop offset="100%" style="stop-color:#FAF7F2;stop-opacity:0"/>
    </radialGradient>
  </defs>
  ${body}
  <text x="400" y="580" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="#8B6914" opacity="0.5">${name}</text>
</svg>`;
}

const rooms = {
  "puja-room": roomSvg("Puja Room", `
  <rect width="800" height="600" fill="url(#wall)"/>
  <rect width="800" height="600" fill="url(#warmLight)"/>
  <!-- Maroon accent wall -->
  <rect x="0" y="0" width="800" height="280" fill="#6B2D2D" opacity="0.15"/>
  <!-- Floor -->
  <rect x="0" y="420" width="800" height="180" fill="#E8D5B5" opacity="0.5"/>
  <line x1="0" y1="420" x2="800" y2="420" stroke="#C4A265" stroke-width="2" opacity="0.3"/>
  <!-- Puja platform / chowki -->
  <rect x="200" y="380" width="400" height="45" rx="4" fill="#8B6914" opacity="0.25"/>
  <rect x="220" y="365" width="360" height="20" rx="2" fill="#C4A265" opacity="0.2"/>
  <!-- Mandir arch frame -->
  <path d="M280 120 Q400 40 520 120 L520 380 L280 380 Z" fill="none" stroke="#C4A265" stroke-width="3" opacity="0.4"/>
  <path d="M300 140 Q400 80 500 140" fill="none" stroke="#E8841A" stroke-width="1.5" opacity="0.3"/>
  <!-- Shelf -->
  <rect x="250" y="200" width="300" height="8" fill="#8B6914" opacity="0.35"/>
  <rect x="250" y="280" width="300" height="8" fill="#8B6914" opacity="0.35"/>
  <!-- Diya glow spots -->
  <ellipse cx="400" cy="350" rx="80" ry="15" fill="#FF9933" opacity="0.08"/>
  <!-- Decorative toran -->
  <path d="M150 100 Q400 60 650 100" fill="none" stroke="#E8841A" stroke-width="2" opacity="0.25"/>
  <circle cx="400" cy="75" r="8" fill="#FFD700" opacity="0.3"/>
  `),

  "mandir-shelf": roomSvg("Mandir Shelf", `
  <rect width="800" height="600" fill="#FFFDF9"/>
  <rect width="800" height="600" fill="url(#warmLight)"/>
  <!-- Wooden mandir unit -->
  <rect x="180" y="80" width="440" height="420" rx="8" fill="#5C4033" opacity="0.12"/>
  <rect x="200" y="100" width="400" height="380" rx="6" fill="#8B6914" opacity="0.08"/>
  <!-- Shelves -->
  <rect x="210" y="180" width="380" height="6" fill="#8B6914" opacity="0.4"/>
  <rect x="210" y="280" width="380" height="6" fill="#8B6914" opacity="0.4"/>
  <rect x="210" y="380" width="380" height="6" fill="#8B6914" opacity="0.4"/>
  <!-- Center niche (product placement zone) -->
  <rect x="320" y="290" width="160" height="85" rx="4" fill="#E8841A" opacity="0.06" stroke="#C4A265" stroke-width="1" stroke-dasharray="4 4" opacity-stroke="0.3"/>
  <!-- Top arch -->
  <path d="M300 100 Q400 50 500 100" fill="none" stroke="#C4A265" stroke-width="4" opacity="0.35"/>
  <!-- Brass bells hint -->
  <circle cx="350" cy="130" r="6" fill="#C4A265" opacity="0.3"/>
  <circle cx="450" cy="130" r="6" fill="#C4A265" opacity="0.3"/>
  <!-- Base platform -->
  <rect x="240" y="460" width="320" height="25" rx="3" fill="#8B6914" opacity="0.2"/>
  `),

  "living-room": roomSvg("Living Room", `
  <rect width="800" height="600" fill="#FAF7F2"/>
  <rect width="800" height="600" fill="url(#warmLight)"/>
  <!-- Wall -->
  <rect x="0" y="0" width="800" height="350" fill="#F0EBE3"/>
  <!-- Side table -->
  <rect x="280" y="320" width="240" height="120" rx="4" fill="#5C4033" opacity="0.15"/>
  <rect x="270" y="310" width="260" height="15" rx="2" fill="#8B6914" opacity="0.25"/>
  <!-- Table legs -->
  <rect x="290" y="430" width="12" height="50" fill="#5C4033" opacity="0.2"/>
  <rect x="498" y="430" width="12" height="50" fill="#5C4033" opacity="0.2"/>
  <!-- Sofa hint -->
  <rect x="80" y="380" width="180" height="100" rx="20" fill="#6B2D2D" opacity="0.08"/>
  <!-- Plant -->
  <ellipse cx="650" cy="400" rx="40" ry="60" fill="#8B6914" opacity="0.1"/>
  <!-- Window light -->
  <rect x="550" y="60" width="120" height="160" fill="#FFE4B5" opacity="0.2" rx="4"/>
  <!-- Product zone on table -->
  <ellipse cx="400" cy="305" rx="70" ry="12" fill="#FF9933" opacity="0.06"/>
  `),

  "festival-table": roomSvg("Festival Table", `
  <rect width="800" height="600" fill="#FFF8F0"/>
  <rect width="800" height="600" fill="url(#warmLight)"/>
  <!-- Festive maroon backdrop -->
  <rect x="0" y="0" width="800" height="200" fill="#6B2D2D" opacity="0.12"/>
  <!-- Rangoli hint -->
  <circle cx="400" cy="480" r="60" fill="none" stroke="#E8841A" stroke-width="1" opacity="0.2"/>
  <circle cx="400" cy="480" r="40" fill="none" stroke="#FFD700" stroke-width="1" opacity="0.15"/>
  <!-- Festival table -->
  <rect x="120" y="280" width="560" height="20" rx="2" fill="#8B6914" opacity="0.3"/>
  <rect x="100" y="300" width="600" height="140" rx="6" fill="#C4A265" opacity="0.12"/>
  <!-- Cloth drape -->
  <path d="M100 300 Q400 280 700 300" fill="none" stroke="#E8841A" stroke-width="2" opacity="0.2"/>
  <!-- Diya row hints -->
  <ellipse cx="250" cy="295" rx="15" ry="5" fill="#FF9933" opacity="0.15"/>
  <ellipse cx="550" cy="295" rx="15" ry="5" fill="#FF9933" opacity="0.15"/>
  <!-- Center placement -->
  <ellipse cx="400" cy="290" rx="90" ry="18" fill="#FFD700" opacity="0.08"/>
  <!-- String lights -->
  <path d="M80 80 Q200 120 400 90 Q600 60 720 100" fill="none" stroke="#FFD700" stroke-width="1.5" opacity="0.25"/>
  `),
};

for (const [slug, svg] of Object.entries(rooms)) {
  writeFileSync(join(OUT, `${slug}.svg`), svg);
  console.log(`Created rooms/${slug}.svg`);
}

console.log("Done!");
