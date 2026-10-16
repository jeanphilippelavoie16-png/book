// Frise de la page d'ouverture du tome 1 (Tenir) : JP, 16 octobre 2026, plan de match point 30.
// Le style de images/references/style-pages-de-tome.jpg : les pictogrammes du livre en aplat noir
// (h.formes.personnage, rendu 'plein'), la famille serrée près d'un feu, les catastrophes en gris derrière.
//   node images/tomes/_frise-tome-1.js  → images/tomes/tome-1.svg
const { h } = require('../../.claude/skills/planches/scripts/composer-planche.js');
const F = h.formes;
const W = 2100, H = 630, SOL = 612;
const NOIR = '#1A1A1A', GRIS = '#B4BCC2', OR = '#EE7219';
const out = [];
const P = (d, f = GRIS) => out.push(`<path d="${d}" fill="${f}"/>`);
const C = (x, y, r, f = GRIS) => out.push(`<circle cx="${x}" cy="${y}" r="${r}" fill="${f}"/>`);

// ── le champignon nucléaire, à gauche
P(`M240 ${SOL} C 250 520 262 400 262 300 L 318 300 C 318 400 330 520 340 ${SOL} Z`);
for (const [x, y, r] of [[200, 600, 34], [250, 590, 40], [330, 590, 40], [380, 600, 34], [160, 606, 22], [420, 606, 22]]) C(x, y, r);
for (const [x, y, r] of [[230, 300, 30], [290, 290, 38], [350, 300, 30]]) C(x, y, r);
for (const [x, y, r] of [[170, 180, 62], [230, 130, 76], [310, 110, 84], [390, 140, 72], [440, 190, 56], [300, 200, 70], [210, 215, 50], [380, 220, 48]]) C(x, y, r);

// ── le poteau cassé et les fils tombés
out.push(`<g transform="rotate(-24 600 ${SOL})"><rect x="590" y="200" width="20" height="${SOL - 200}" fill="${GRIS}"/>`
  + `<rect x="530" y="232" width="140" height="14" fill="${GRIS}"/></g>`);
out.push(`<path d="M455 312 C 470 420 500 520 470 ${SOL} M478 300 C 520 420 560 540 600 ${SOL - 4} M548 270 C 590 380 640 520 700 ${SOL - 2}" fill="none" stroke="${GRIS}" stroke-width="6" stroke-linecap="round"/>`);

// ── la tempête : le nuage, la pluie, l'éclair
for (const [x, y, r] of [[1030, 120, 54], [1100, 90, 66], [1180, 80, 72], [1260, 100, 60], [1320, 130, 46], [1150, 140, 60], [1240, 145, 50], [1070, 150, 44]]) C(x, y, r);
const pluie = [];
for (let i = 0; i < 11; i++) { const x = 1010 + i * 30, y = 205 + (i % 3) * 18; pluie.push(`M${x} ${y} l -18 60`); }
out.push(`<path d="${pluie.join(' ')}" stroke="${GRIS}" stroke-width="7" stroke-linecap="round"/>`);
P(`M1205 170 L 1172 262 L 1202 262 L 1176 350 L 1246 236 L 1214 236 L 1238 170 Z`);

// ── le feu de forêt, à droite : des épinettes et les flammes
const epinette = (x, ht, f) => { const b = ht * 0.32; let d = `M${x} ${SOL - ht}`; const n = 5;
  for (let i = 1; i <= n; i++) { const y = SOL - ht + ht * 0.88 * i / n, l = b * i / n; d += ` L ${x + l} ${y} L ${x + l * 0.45} ${y}`; }
  for (let i = n; i >= 1; i--) { const y = SOL - ht + ht * 0.88 * i / n, l = b * i / n; d += ` L ${x - l * 0.45} ${y} L ${x - l} ${y}`; }
  d += ` Z M${x - 9} ${SOL - ht * 0.12} h18 V${SOL} h-18 Z`; P(d, f); };
const flamme = (x, y, ht, f = OR) => P(`M${x} ${y - ht} C ${x + ht * 0.08} ${y - ht * 0.62} ${x + ht * 0.42} ${y - ht * 0.5} ${x + ht * 0.3} ${y - ht * 0.12} C ${x + ht * 0.24} ${y + 2} ${x - ht * 0.24} ${y + 2} ${x - ht * 0.3} ${y - ht * 0.12} C ${x - ht * 0.38} ${y - ht * 0.4} ${x - ht * 0.12} ${y - ht * 0.5} ${x} ${y - ht} Z`, f);
// la fumée
for (const [x, y, r] of [[1700, 100, 46], [1770, 72, 56], [1860, 66, 60], [1950, 82, 52], [2030, 110, 40], [1820, 120, 44], [1920, 135, 40]]) C(x, y, r);
for (const [x, ht] of [[1640, 330], [1760, 430], [1880, 380], [1990, 460], [2070, 320]]) epinette(x, ht);
for (const [x, y, ht] of [[1760, 290, 180], [1990, 280, 200], [1880, 370, 160], [1640, 420, 130], [2070, 430, 140], [1820, 480, 110], [1935, 500, 120], [1700, 540, 100]]) flamme(x, y, ht);

// ── le sol
out.push(`<rect x="0" y="${SOL}" width="${W}" height="6" fill="${NOIR}"/>`);

// ── la famille, serrée, tournée vers le feu
const E = 0.235;
out.push(String(F.personnage({ x: 760, y: SOL, pose: 'debout', echelle: E, rendu: 'plein', mains: { proche: [850, 418] } })));
out.push(String(F.personnage({ x: 868, y: SOL, pose: 'debout', age: 'enfant', echelle: E, rendu: 'plein' })));
out.push(String(F.personnage({ x: 1120, y: SOL, pose: 'genou', echelle: E, rendu: 'plein', mains: { proche: [1172, 446] } })));
out.push(String(F.personnage({ x: 1188, y: SOL, pose: 'debout', age: 'enfant', echelle: E * 0.9, rendu: 'plein' })));

// ── le feu de la famille
out.push(`<g transform="rotate(14 1420 ${SOL - 14})"><rect x="1340" y="${SOL - 26}" width="160" height="24" rx="12" fill="${NOIR}"/></g>`);
out.push(`<g transform="rotate(-14 1420 ${SOL - 14})"><rect x="1340" y="${SOL - 26}" width="160" height="24" rx="12" fill="${NOIR}"/></g>`);
flamme(1420, SOL - 22, 150); flamme(1392, SOL - 24, 96); flamme(1452, SOL - 24, 104);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">\n${out.join('\n')}\n</svg>\n`;
require('fs').writeFileSync(require('path').join(__dirname, 'tome-1.svg'), svg);
console.log('images/tomes/tome-1.svg');
