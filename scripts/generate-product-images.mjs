#!/usr/bin/env node
/**
 * Generates product-specific SVG images for MyPavitra catalog.
 * Run: node scripts/generate-product-images.mjs
 */
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "../apps/web/public/images");

const BRASS = { light: "#E8C872", mid: "#C9A227", dark: "#8B6914", shine: "#F5E6B8" };
const COPPER = { light: "#E8987A", mid: "#B87333", dark: "#7A4A1E", shine: "#FFD4C4" };
const IVORY = "#FAF7F2";
const CREAM = "#FFFDF9";

function svgWrap(content, label, sublabel = "MyPavitra") {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${CREAM}"/>
      <stop offset="100%" style="stop-color:${IVORY}"/>
    </linearGradient>
    <radialGradient id="spot" cx="50%" cy="40%" r="50%">
      <stop offset="0%" style="stop-color:#fff;stop-opacity:0.9"/>
      <stop offset="100%" style="stop-color:${IVORY};stop-opacity:0"/>
    </radialGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#3D2914" flood-opacity="0.15"/>
    </filter>
  </defs>
  <rect width="800" height="800" fill="url(#bg)"/>
  <rect width="800" height="800" fill="url(#spot)"/>
  <g filter="url(#shadow)">${content}</g>
  <text x="400" y="720" text-anchor="middle" font-family="Georgia, serif" font-size="22" fill="#3D2914" opacity="0.85">${label}</text>
  <text x="400" y="748" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" fill="#8B6914" opacity="0.6">${sublabel}</text>
</svg>`;
}

function brassGrad(id) {
  return `<linearGradient id="${id}" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" style="stop-color:${BRASS.shine}"/>
    <stop offset="40%" style="stop-color:${BRASS.light}"/>
    <stop offset="100%" style="stop-color:${BRASS.dark}"/>
  </linearGradient>`;
}

function copperGrad(id) {
  return `<linearGradient id="${id}" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" style="stop-color:${COPPER.shine}"/>
    <stop offset="50%" style="stop-color:${COPPER.mid}"/>
    <stop offset="100%" style="stop-color:${COPPER.dark}"/>
  </linearGradient>`;
}

const renderers = {
  "brass-diya-classic": () => {
    const g = brassGrad("b");
    return svgWrap(`${g}
      <ellipse cx="400" cy="620" rx="120" ry="18" fill="#3D2914" opacity="0.08"/>
      <path d="M340 520 Q400 480 460 520 L450 580 Q400 600 350 580 Z" fill="url(#b)"/>
      <ellipse cx="400" cy="520" rx="70" ry="12" fill="${BRASS.mid}"/>
      <path d="M385 520 L400 420 L415 520 Z" fill="url(#b)"/>
      <ellipse cx="400" cy="415" rx="8" ry="20" fill="${BRASS.dark}"/>
      <ellipse cx="400" cy="395" rx="25" ry="35" fill="#FF9933" opacity="0.85"/>
      <ellipse cx="400" cy="390" rx="15" ry="25" fill="#FFD700" opacity="0.9"/>
    `, "Classic Brass Diya", "Deepak · Oil Lamp");
  },

  "brass-diya-set-of-5": () => {
    const g = brassGrad("b");
    let diyas = "";
    [280, 360, 440, 520].forEach((x, i) => {
      const y = 480 + (i % 2) * 30;
      diyas += `<g transform="translate(${x - 400},${y - 520})">
        <ellipse cx="400" cy="520" rx="45" ry="8" fill="url(#b)"/>
        <path d="M370 520 L400 460 L430 520 Z" fill="url(#b)"/>
        <ellipse cx="400" cy="455" rx="12" ry="18" fill="#FF9933" opacity="0.7"/>
      </g>`;
    });
    diyas += `<g transform="translate(0,-40)">
      <ellipse cx="400" cy="520" rx="55" ry="10" fill="url(#b)"/>
      <path d="M360 520 L400 440 L440 520 Z" fill="url(#b)"/>
      <ellipse cx="400" cy="435" rx="18" ry="28" fill="#FF9933" opacity="0.85"/>
    </g>`;
    return svgWrap(`${g}${diyas}`, "Brass Diya Set of 5", "Panch Deep · Five Lamps");
  },

  "brass-hanging-diya-pair": () => svgWrap(`${brassGrad("b")}
    <line x1="320" y1="200" x2="320" y2="350" stroke="${BRASS.dark}" stroke-width="3"/>
    <line x1="480" y1="200" x2="480" y2="350" stroke="${BRASS.dark}" stroke-width="3"/>
    <line x1="280" y1="200" x2="520" y2="200" stroke="${BRASS.mid}" stroke-width="4"/>
    <ellipse cx="320" cy="380" rx="40" ry="10" fill="url(#b)"/>
    <path d="M290 380 L320 320 L350 380 Z" fill="url(#b)"/>
    <ellipse cx="320" cy="315" rx="10" ry="15" fill="#FF9933" opacity="0.8"/>
    <ellipse cx="480" cy="380" rx="40" ry="10" fill="url(#b)"/>
    <path d="M450 380 L480 320 L510 380 Z" fill="url(#b)"/>
    <ellipse cx="480" cy="315" rx="10" ry="15" fill="#FF9933" opacity="0.8"/>
  `, "Brass Hanging Diya Pair", "Jhumar Deepak"),

  "brass-puja-thali-medium": () => svgWrap(`${brassGrad("b")}
    <ellipse cx="400" cy="450" rx="200" ry="200" fill="url(#b)"/>
    <ellipse cx="400" cy="450" rx="180" ry="180" fill="${BRASS.mid}" opacity="0.3"/>
    <ellipse cx="400" cy="450" rx="160" ry="160" fill="none" stroke="${BRASS.dark}" stroke-width="2" opacity="0.4"/>
    <circle cx="400" cy="450" r="35" fill="url(#b)"/>
    <circle cx="280" cy="380" r="28" fill="url(#b)"/>
    <circle cx="520" cy="380" r="28" fill="url(#b)"/>
    <circle cx="280" cy="520" r="28" fill="url(#b)"/>
    <circle cx="520" cy="520" r="28" fill="url(#b)"/>
    <circle cx="400" cy="320" r="22" fill="url(#b)"/>
    <circle cx="400" cy="450" r="12" fill="#CC0000" opacity="0.8"/>
    <circle cx="285" cy="385" r="8" fill="#CC0000" opacity="0.6"/>
  `, "Brass Puja Thali — Medium", "Complete Pooja Plate Set"),

  "brass-puja-bell-medium": () => svgWrap(`${brassGrad("b")}
    <rect x="385" y="250" width="30" height="80" rx="5" fill="url(#b)"/>
    <path d="M300 330 Q400 280 500 330 L480 520 Q400 560 320 520 Z" fill="url(#b)"/>
    <ellipse cx="400" cy="330" rx="100" ry="25" fill="${BRASS.light}"/>
    <circle cx="400" cy="540" r="15" fill="${BRASS.dark}"/>
    <ellipse cx="400" cy="555" rx="8" ry="12" fill="${BRASS.mid}"/>
  `, "Brass Puja Bell — Medium", "Ghanti · Hand Bell"),

  "brass-kalash-medium": () => svgWrap(`${brassGrad("b")}
    <ellipse cx="400" cy="580" rx="90" ry="20" fill="${BRASS.dark}" opacity="0.3"/>
    <path d="M320 580 L330 380 Q400 340 470 380 L480 580 Z" fill="url(#b)"/>
    <ellipse cx="400" cy="380" rx="75" ry="25" fill="url(#b)"/>
    <rect x="370" y="340" width="60" height="45" rx="5" fill="url(#b)"/>
    <circle cx="400" cy="330" r="20" fill="${BRASS.light}"/>
    <path d="M390 320 Q400 280 410 320" fill="none" stroke="${BRASS.dark}" stroke-width="3"/>
    <ellipse cx="400" cy="420" rx="60" ry="8" fill="${BRASS.shine}" opacity="0.5"/>
  `, "Brass Kalash — Medium", "Purna Kalash · Sacred Vessel"),

  "brass-camphor-holder": () => svgWrap(`${brassGrad("b")}
    <ellipse cx="400" cy="550" rx="80" ry="15" fill="url(#b)"/>
    <path d="M340 550 L350 420 Q400 400 450 420 L460 550 Z" fill="url(#b)"/>
    <ellipse cx="400" cy="420" rx="55" ry="15" fill="url(#b)"/>
    <rect x="370" y="380" width="60" height="45" fill="url(#b)" rx="3"/>
    <circle cx="400" cy="365" r="8" fill="#fff" opacity="0.9"/>
    <circle cx="400" cy="365" r="4" fill="${BRASS.mid}"/>
  `, "Brass Camphor Holder", "Kapoor Dani"),

  "cotton-wicks-pack": () => svgWrap(`
    <rect x="280" y="320" width="240" height="200" rx="12" fill="#fff" stroke="#E0D5C5" stroke-width="2"/>
    <rect x="300" y="340" width="200" height="160" rx="8" fill="${IVORY}"/>
    ${Array.from({ length: 8 }, (_, i) => {
      const x = 320 + (i % 4) * 45;
      const y = 360 + Math.floor(i / 4) * 70;
      return `<line x1="${x}" y1="${y + 50}" x2="${x}" y2="${y}" stroke="#F5E6C8" stroke-width="3"/>
              <circle cx="${x}" cy="${y}" r="4" fill="#E8841A"/>`;
    }).join("")}
    <text x="400" y="480" text-anchor="middle" font-size="14" fill="#5C4033" opacity="0.7">100 Wicks</text>
  `, "Cotton Wicks — Pack of 100", "Batti · Diya Wicks"),

  "pure-camphor-tablets": () => svgWrap(`
    <rect x="260" y="350" width="280" height="180" rx="10" fill="#fff" stroke="#E0D5C5" stroke-width="2"/>
    ${[[320, 400], [400, 400], [480, 400], [360, 460], [440, 460]].map(([x, y]) =>
      `<rect x="${x - 25}" y="${y - 25}" width="50" height="50" rx="4" fill="#F8F8FF" stroke="#E8E8F0" stroke-width="1"/>
       <rect x="${x - 20}" y="${y - 20}" width="40" height="40" rx="3" fill="#fff" opacity="0.9"/>`
    ).join("")}
  `, "Pure Camphor Tablets", "Kapoor · Natural Camphor"),

  "kumkum-vermillion": () => svgWrap(`
    <ellipse cx="400" cy="520" rx="100" ry="25" fill="${BRASS.mid}" opacity="0.8"/>
    <path d="M310 520 L320 380 Q400 350 480 380 L490 520 Z" fill="url(#b)"/>
    <ellipse cx="400" cy="380" rx="85" ry="30" fill="url(#b)"/>
    <ellipse cx="400" cy="420" rx="70" ry="50" fill="#CC0000"/>
    <ellipse cx="400" cy="410" rx="50" ry="35" fill="#E60000" opacity="0.8"/>
  `, "Kumkum — Vermillion Powder", "Sindoor · Roli"),

  "chandan-sandalwood-paste": () => svgWrap(`
    <ellipse cx="400" cy="520" rx="90" ry="22" fill="${BRASS.mid}"/>
    <path d="M320 520 L330 390 Q400 360 470 390 L480 520 Z" fill="url(#b)"/>
    <ellipse cx="400" cy="390" rx="75" ry="28" fill="url(#b)"/>
    <ellipse cx="400" cy="430" rx="60" ry="45" fill="#D4A574"/>
    <ellipse cx="400" cy="420" rx="45" ry="30" fill="#E8C9A0"/>
  `, "Chandan — Sandalwood Paste", "Sandalwood · Tilak"),

  "akshat-unbroken-rice": () => svgWrap(`
    <ellipse cx="400" cy="520" rx="95" ry="24" fill="${BRASS.mid}"/>
    <path d="M315 520 L325 385 Q400 355 475 385 L485 520 Z" fill="url(#b)"/>
    <ellipse cx="400" cy="385" rx="80" ry="28" fill="url(#b)"/>
    <ellipse cx="400" cy="430" rx="65" ry="48" fill="#FFF8E7"/>
    ${Array.from({ length: 40 }, () => {
      const x = 340 + Math.random() * 120;
      const y = 395 + Math.random() * 70;
      return `<ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="3" ry="6" fill="#F5F0E0" transform="rotate(${Math.random() * 360} ${x} ${y})"/>`;
    }).join("")}
  `, "Akshat — Unbroken Rice", "Sacred Rice · Puja"),

  "sandalwood-incense-sticks": () => svgWrap(`
    <rect x="290" y="380" width="220" height="140" rx="8" fill="#8B4513" opacity="0.9"/>
    ${Array.from({ length: 12 }, (_, i) => {
      const x = 310 + i * 16;
      return `<line x1="${x}" y1="520" x2="${x + 5}" y2="400" stroke="#D4A574" stroke-width="4" stroke-linecap="round"/>
              <circle cx="${x + 5}" cy="395" r="3" fill="#E8841A" opacity="0.6"/>`;
    }).join("")}
    <ellipse cx="400" cy="530" rx="110" ry="12" fill="#3D2914" opacity="0.1"/>
  `, "Sandalwood Incense Sticks", "Agarbatti · Dhoop"),

  "jain-brass-samai": () => svgWrap(`${brassGrad("b")}
    <rect x="375" y="480" width="50" height="80" fill="url(#b)" rx="5"/>
    <path d="M350 480 L450 480 L440 350 Q400 320 360 350 Z" fill="url(#b)"/>
    <ellipse cx="400" cy="350" rx="45" ry="12" fill="url(#b)"/>
    <path d="M385 350 L400 250 L415 350 Z" fill="url(#b)"/>
    <ellipse cx="400" cy="245" rx="20" ry="30" fill="#FF9933" opacity="0.85"/>
    <circle cx="400" cy="300" r="8" fill="${BRASS.shine}" opacity="0.6"/>
  `, "Jain Brass Samai", "Traditional Jain Oil Lamp"),

  "jain-brass-camphor-holder": () => svgWrap(`${brassGrad("b")}
    <ellipse cx="400" cy="540" rx="70" ry="14" fill="url(#b)"/>
    <path d="M340 540 L350 400 Q400 380 450 400 L460 540 Z" fill="url(#b)"/>
    <path d="M360 400 L400 320 L440 400 Z" fill="url(#b)"/>
    <circle cx="400" cy="310" r="12" fill="#fff" opacity="0.95"/>
    <text x="400" y="315" text-anchor="middle" font-size="14" fill="${BRASS.dark}">☸</text>
  `, "Jain Brass Camphor Holder", "Jain Kapoor Dani"),

  "ganesh-idol-brass-small": () => svgWrap(`${brassGrad("b")}
    <ellipse cx="400" cy="580" rx="80" ry="15" fill="#3D2914" opacity="0.1"/>
    <ellipse cx="400" cy="480" rx="70" ry="90" fill="url(#b)"/>
    <ellipse cx="400" cy="380" rx="55" ry="65" fill="url(#b)"/>
    <ellipse cx="370" cy="360" rx="25" ry="35" fill="url(#b)"/>
    <ellipse cx="430" cy="360" rx="25" ry="35" fill="url(#b)"/>
    <ellipse cx="400" cy="400" rx="30" ry="20" fill="${BRASS.mid}"/>
    <path d="M350 450 Q400 520 450 450" fill="none" stroke="${BRASS.dark}" stroke-width="3"/>
    <text x="400" y="620" text-anchor="middle" font-size="11" fill="#8B6914" opacity="0.5">Decorative brass form</text>
  `, "Ganesh Idol — Brass Small", "Brass Murti · Home Mandir"),

  "lakshmi-idol-brass-small": () => svgWrap(`${brassGrad("b")}
    <ellipse cx="400" cy="580" rx="80" ry="15" fill="#3D2914" opacity="0.1"/>
    <ellipse cx="400" cy="500" rx="55" ry="75" fill="url(#b)"/>
    <ellipse cx="400" cy="390" rx="45" ry="55" fill="url(#b)"/>
    <ellipse cx="400" cy="350" rx="35" ry="25" fill="url(#b)"/>
    ${[0, 72, 144, 216, 288].map((a) => {
      const rad = (a * Math.PI) / 180;
      const x = 400 + 60 * Math.cos(rad);
      const y = 420 + 40 * Math.sin(rad);
      return `<ellipse cx="${x}" cy="${y}" rx="20" ry="12" fill="url(#b)" transform="rotate(${a} ${x} ${y})"/>`;
    }).join("")}
    <circle cx="400" cy="370" r="15" fill="${BRASS.shine}" opacity="0.5"/>
  `, "Lakshmi Idol — Brass Small", "Brass Murti · Diwali Puja"),

  "copper-lota-500ml": () => svgWrap(`${copperGrad("c")}
    <ellipse cx="400" cy="560" rx="75" ry="18" fill="${COPPER.dark}" opacity="0.3"/>
    <path d="M340 560 L345 380 Q400 350 455 380 L460 560 Z" fill="url(#c)"/>
    <ellipse cx="400" cy="380" rx="60" ry="22" fill="url(#c)"/>
    <ellipse cx="400" cy="450" rx="55" ry="8" fill="${COPPER.shine}" opacity="0.4"/>
  `, "Copper Lota — 500 ml", "Tamba Lota · Sacred Water"),

  "tambe-ka-kalash": () => svgWrap(`${copperGrad("c")}
    <ellipse cx="400" cy="580" rx="85" ry="18" fill="${COPPER.dark}" opacity="0.3"/>
    <path d="M320 580 L330 370 Q400 330 470 370 L480 580 Z" fill="url(#c)"/>
    <ellipse cx="400" cy="370" rx="70" ry="22" fill="url(#c)"/>
    <rect x="368" y="330" width="64" height="42" rx="4" fill="url(#c)"/>
    <circle cx="400" cy="318" r="18" fill="${COPPER.light}"/>
    <ellipse cx="400" cy="410" rx="55" ry="8" fill="${COPPER.shine}" opacity="0.5"/>
  `, "Tambe Ka Kalash — Copper", "Copper Kalash · Puja"),

  "daily-puja-samagri-kit": () => svgWrap(`
    <rect x="220" y="300" width="360" height="260" rx="16" fill="#fff" stroke="#E8841A" stroke-width="3"/>
    <rect x="240" y="320" width="320" height="220" rx="10" fill="${IVORY}"/>
    <circle cx="320" cy="400" r="30" fill="url(#b)"/><circle cx="320" cy="395" r="8" fill="#CC0000"/>
    <ellipse cx="400" cy="410" rx="35" ry="8" fill="url(#b)"/>
    <rect x="460" y="370" width="60" height="80" rx="4" fill="#D4A574"/>
    <circle cx="490" cy="360" r="15" fill="#CC0000" opacity="0.7"/>
    <ellipse cx="360" cy="480" rx="40" ry="10" fill="url(#b)"/>
    ${brassGrad("b")}
    <text x="400" y="350" text-anchor="middle" font-size="13" fill="#E8841A" font-weight="bold">DAILY PUJA KIT</text>
  `, "Daily Puja Samagri Kit", "Complete Samagri Set"),

  "loban-dhoop-cups": () => svgWrap(`
    <rect x="270" y="360" width="260" height="160" rx="10" fill="#8B4513"/>
    ${[[340, 430], [400, 430], [460, 430]].map(([x, y]) =>
      `<circle cx="${x}" cy="${y}" r="35" fill="#D4A574"/>
       <circle cx="${x}" cy="${y}" r="25" fill="#A0522D"/>
       <path d="M${x - 5} ${y - 40} Q${x} ${y - 70} ${x + 5} ${y - 40}" fill="none" stroke="#888" stroke-width="2" opacity="0.5"/>
       <ellipse cx="${x}" cy="${y - 45}" rx="8" ry="15" fill="#999" opacity="0.4"/>`
    ).join("")}
  `, "Loban Dhoop Cups", "Sambrani · Dhoop Cups"),

  "rudraksha-mala-108": () => svgWrap(`
    <ellipse cx="400" cy="420" rx="130" ry="150" fill="none" stroke="#8B4513" stroke-width="18" stroke-linecap="round" opacity="0.15"/>
    ${Array.from({ length: 36 }, (_, i) => {
      const a = (i / 36) * Math.PI * 2 - Math.PI / 2;
      const x = 400 + 120 * Math.cos(a);
      const y = 420 + 130 * Math.sin(a);
      return `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="9" ry="11" fill="#5C4033"/>
              <ellipse cx="${x.toFixed(1)}" cy="${(y - 2).toFixed(1)}" rx="4" ry="6" fill="#3D2914"/>`;
    }).join("")}
    <ellipse cx="400" cy="250" rx="14" ry="18" fill="url(#b)"/>
    <circle cx="400" cy="245" r="5" fill="${BRASS.dark}"/>
    ${brassGrad("b")}
  `, "Rudraksha Mala — 108 Beads", "Japa Mala · Prayer Beads"),

  "diwali-gift-hamper": () => svgWrap(`
    <rect x="240" y="340" width="320" height="220" rx="8" fill="#8B0000"/>
    <rect x="255" y="355" width="290" height="190" rx="6" fill="#A52A2A"/>
    <rect x="370" y="300" width="60" height="50" fill="#8B0000"/>
    <ellipse cx="400" cy="420" rx="40" ry="10" fill="url(#b)"/>
    <path d="M375 420 L400 360 L425 420 Z" fill="url(#b)"/>
    <ellipse cx="400" cy="355" rx="12" ry="20" fill="#FF9933" opacity="0.9"/>
    <rect x="320" y="460" width="50" height="60" rx="3" fill="#D4A574"/>
    <circle cx="480" cy="480" r="25" fill="url(#b)"/>
    ${brassGrad("b")}
    <path d="M240 340 L560 340" stroke="#FFD700" stroke-width="4"/>
    <text x="400" y="330" text-anchor="middle" font-size="16" fill="#FFD700">🎁</text>
  `, "Diwali Gift Hamper", "Festive Gift Set"),

  "brass-aarti-diya": () => svgWrap(`${brassGrad("b")}
    <rect x="250" y="420" width="300" height="12" rx="4" fill="url(#b)"/>
    <ellipse cx="280" cy="410" rx="25" ry="8" fill="url(#b)"/>
    <path d="M265 410 L280 350 L295 410 Z" fill="url(#b)"/>
    <ellipse cx="280" cy="345" rx="8" ry="14" fill="#FF9933" opacity="0.85"/>
    <ellipse cx="400" cy="410" rx="30" ry="10" fill="url(#b)"/>
    <path d="M380 410 L400 330 L420 410 Z" fill="url(#b)"/>
    <ellipse cx="400" cy="325" rx="12" ry="22" fill="#FF9933" opacity="0.9"/>
    <ellipse cx="520" cy="410" rx="25" ry="8" fill="url(#b)"/>
    <path d="M505 410 L520 350 L535 410 Z" fill="url(#b)"/>
    <ellipse cx="520" cy="345" rx="8" ry="14" fill="#FF9933" opacity="0.85"/>
    <rect x="395" y="432" width="10" height="100" fill="url(#b)"/>
  `, "Brass Aarti Diya", "Aarti Deepak · Five Wick"),

  "copper-puja-thali": () => svgWrap(`${copperGrad("c")}
    <ellipse cx="400" cy="450" rx="190" ry="190" fill="url(#c)"/>
    <ellipse cx="400" cy="450" rx="170" ry="170" fill="${COPPER.mid}" opacity="0.25"/>
    <circle cx="400" cy="450" r="32" fill="url(#c)"/>
    <circle cx="290" cy="390" r="26" fill="url(#c)"/>
    <circle cx="510" cy="390" r="26" fill="url(#c)"/>
    <circle cx="290" cy="510" r="26" fill="url(#c)"/>
    <circle cx="510" cy="510" r="26" fill="url(#c)"/>
    <circle cx="400" cy="340" r="20" fill="url(#c)"/>
    <circle cx="400" cy="450" r="10" fill="#CC0000" opacity="0.7"/>
  `, "Copper Puja Thali", "Tamba Thali · Copper Plate"),

  "tulsi-mala-108": () => svgWrap(`
    <ellipse cx="400" cy="420" rx="125" ry="145" fill="none" stroke="#2D5016" stroke-width="16" opacity="0.12"/>
    ${Array.from({ length: 36 }, (_, i) => {
      const a = (i / 36) * Math.PI * 2 - Math.PI / 2;
      const x = 400 + 115 * Math.cos(a);
      const y = 420 + 125 * Math.sin(a);
      return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="8" fill="#4A7C23"/>
              <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" fill="#2D5016"/>`;
    }).join("")}
    <ellipse cx="400" cy="255" rx="12" ry="16" fill="url(#b)"/>
    ${brassGrad("b")}
  `, "Tulsi Mala — 108 Beads", "Tulsi Japa Mala"),
};

// Category images
const categories = {
  "puja-samagri": () => svgWrap(`
    ${Array.from({ length: 6 }, (_, i) => {
      const x = 280 + (i % 3) * 120;
      const y = 320 + Math.floor(i / 3) * 120;
      const colors = ["#CC0000", "#D4A574", "#FFF8E7", "#F5E6C8", "#E8841A", "#fff"];
      return `<circle cx="${x}" cy="${y}" r="35" fill="${colors[i]}"/>`;
    }).join("")}
    ${brassGrad("b")}<ellipse cx="400" cy="480" rx="50" ry="12" fill="url(#b)"/>
  `, "Puja Samagri", "Daily Ritual Essentials"),
  "brass-puja-items": renderers["brass-puja-thali-medium"],
  "copper-puja-items": renderers["copper-lota-500ml"],
  diyas: renderers["brass-diya-classic"],
  "puja-kits": renderers["daily-puja-samagri-kit"],
  "incense-dhoop": renderers["sandalwood-incense-sticks"],
  "idols-murtis": renderers["ganesh-idol-brass-small"],
  "jain-puja-products": renderers["jain-brass-samai"],
  "puja-gifts": renderers["diwali-gift-hamper"],
  "pooja-thali": renderers["brass-puja-thali-medium"],
  kalash: renderers["brass-kalash-medium"],
  mala: renderers["rudraksha-mala-108"],
};

const bundles = {
  "daily-puja-starter-kit": renderers["daily-puja-samagri-kit"],
  "diwali-complete-puja-kit": renderers["diwali-gift-hamper"],
  "new-home-puja-kit": () => svgWrap(`
    ${brassGrad("b")}${copperGrad("c")}
    <ellipse cx="320" cy="420" rx="50" ry="12" fill="url(#b)"/>
    <path d="M295 420 L320 340 L345 420 Z" fill="url(#b)"/>
    <ellipse cx="480" cy="430" rx="45" ry="10" fill="url(#c)"/>
    <ellipse cx="400" cy="500" rx="60" ry="15" fill="url(#b)"/>
    <rect x="350" y="350" width="100" height="70" rx="6" fill="#fff" stroke="#E8841A" stroke-width="2"/>
    <text x="400" y="395" text-anchor="middle" font-size="12" fill="#E8841A">NEW HOME</text>
  `, "New Home Puja Kit", "Griha Pravesh Set"),
  "jain-puja-essentials": renderers["jain-brass-samai"],
  "brass-puja-essentials-set": () => svgWrap(`
    ${brassGrad("b")}
    <ellipse cx="300" cy="400" rx="45" ry="10" fill="url(#b)"/>
    <path d="M275 400 L300 330 L325 400 Z" fill="url(#b)"/>
    <ellipse cx="400" cy="480" rx="70" ry="70" fill="url(#b)" opacity="0.9"/>
    <path d="M500 380 L520 320 L540 380 Z" fill="url(#b)"/>
    <ellipse cx="520" cy="400" rx="30" ry="8" fill="url(#b)"/>
  `, "Brass Puja Essentials Set", "Brass Collection Kit"),
};

const festivals = {
  diwali: renderers["diwali-gift-hamper"],
  navratri: () => svgWrap(`
    ${Array.from({ length: 9 }, (_, i) => {
      const x = 200 + i * 50;
      return `<rect x="${x}" y="${400 - i * 15}" width="35" height="${120 + i * 10}" fill="#E8841A" opacity="${0.5 + i * 0.05}"/>`;
    }).join("")}
    <ellipse cx="400" cy="420" rx="40" ry="10" fill="url(#b)"/>
    ${brassGrad("b")}
  `, "Navratri Puja Essentials", "Navratri Collection"),
  "ganesh-chaturthi": renderers["ganesh-idol-brass-small"],
  dhanteras: renderers["brass-kalash-medium"],
  paryushan: renderers["jain-brass-samai"],
  "mahavir-jayanti": renderers["jain-brass-camphor-holder"],
};

function writeImages(map, subdir) {
  const dir = join(OUT, subdir);
  mkdirSync(dir, { recursive: true });
  for (const [slug, render] of Object.entries(map)) {
    const fn = typeof render === "function" ? render : renderers[render];
    if (!fn) {
      console.warn(`Skip ${slug}: no renderer`);
      continue;
    }
    const path = join(dir, `${slug}.svg`);
    writeFileSync(path, fn());
    console.log(`Created ${subdir}/${slug}.svg`);
  }
}

writeImages(renderers, "products");
writeImages(categories, "categories");
writeImages(bundles, "bundles");
writeImages(festivals, "festivals");

// Hero
mkdirSync(join(OUT, "hero"), { recursive: true });
writeFileSync(join(OUT, "hero/main.svg"), renderers["brass-diya-classic"]());
console.log("Created hero/main.svg");
console.log("\nDone! All product images generated.");
