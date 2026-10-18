// Feuille des mains Adobe Stock 116570613 (mains/stock.js) : chaque main avec son id et son nom. Pas une planche.
//   node images/planches-src/_palette-mains-stock.js  →  images/_palette-mains-stock.svg
const { h } = require('../../.claude/skills/planches/scripts/composer-planche.js');
const { catalogue, noms } = require('../../.claude/skills/planches/scripts/mains/stock.js');
const ids = Object.keys(catalogue).sort((a, b) => a.localeCompare(b, 'fr', { numeric: true }));
const C = 10, L = 150, Ht = 175, out = [];
ids.forEach((id, i) => {
  const x = (i % C) * L + L / 2, y = Math.floor(i / C) * Ht + 70;
  out.push(String(h.formes.mainStock({ id, x, y, taille: 105, ancre: 'centre' })));
  const n = (noms[id] && noms[id].nom) || '';
  out.push(`<text x="${x}" y="${y + 70}" font-family="IBM Plex Sans, sans-serif" font-size="12" font-weight="700" text-anchor="middle">${id}</text>`);
  if (n) out.push(`<text x="${x}" y="${y + 84}" font-family="IBM Plex Sans, sans-serif" font-size="10" text-anchor="middle">${n}</text>`);
});
const W = C * L, H = Math.ceil(ids.length / C) * Ht + 20;
require('fs').writeFileSync(require('path').join(__dirname, '..', '_palette-mains-stock.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="#fff"/>${out.join('\n')}</svg>\n`);
console.log('images/_palette-mains-stock.svg', ids.length);
