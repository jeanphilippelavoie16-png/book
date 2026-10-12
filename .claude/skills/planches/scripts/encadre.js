#!/usr/bin/env node
// Compose un encadré de planche — danger ou note — dont la boîte est construite
// AUTOUR du texte, avec la même marge sur les quatre côtés.
//
//   node encadre.js --x 40 --y 700 --max 600 --danger "Danger — jamais adossé au chalet…"
//   node encadre.js --x 40 --y 700 --max 600 "Texte d'une note ordinaire"
//
// Sort le fragment SVG prêt à coller, et sa hauteur (pour placer ce qui suit).
//
// Pourquoi un outil plutôt qu'une consigne : le SVG ne mesure pas son texte. Un agent
// qui trace la boîte puis pose le texte dedans à l'œil obtient 18 de marge à gauche,
// 48 à droite, 16 en haut et 4 en bas — ce qui a l'air croche au premier regard.

const { largeur, couper } = require('./mesure-texte');

const MARGE = 14;          // la même sur les quatre côtés
const CORPS = 13;          // corps des légendes du livre
const INTERLIGNE = 1.38;   // en fraction du corps
const HAUT_X = 0.72;       // hauteur des capitales de Georgia, en fraction du corps
const JAMBAGE = 0.22;      // descente sous la ligne de base

const NOIR = '#1A1A1A';
const ROUGE = '#9B2C1E';
const FONTE = "Georgia, 'Times New Roman', serif";

function echapper(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * @param {object} o
 * @param {number} o.x      bord gauche de la boîte
 * @param {number} o.y      bord haut de la boîte
 * @param {number} o.max    largeur maximale de la boîte
 * @param {string} o.texte  le paragraphe, sans retour à la ligne
 * @param {boolean} o.danger  filet rouge et texte rouge
 * @param {boolean} o.pleineLargeur  la boîte prend toute la largeur max (sinon elle épouse le texte)
 */
function encadre({ x, y, max, texte, danger = false, pleineLargeur = true }) {
  const utile = max - 2 * MARGE;
  const lignes = couper(texte, CORPS, utile);
  const plusLongue = Math.max(...lignes.map(l => largeur(l, CORPS)));
  const trop = lignes.filter(l => largeur(l, CORPS) > utile);

  const larg = pleineLargeur ? max : Math.ceil(plusLongue + 2 * MARGE);
  const pas = CORPS * INTERLIGNE;
  // hauteur du bloc de texte : de la tête des capitales de la 1re ligne
  // au bas des jambages de la dernière
  const bloc = CORPS * HAUT_X + (lignes.length - 1) * pas + CORPS * JAMBAGE;
  const haut = Math.ceil(bloc + 2 * MARGE);
  const premiereBase = y + MARGE + CORPS * HAUT_X;

  const couleur = danger ? ROUGE : NOIR;
  const out = [];
  out.push(`<rect x="${x}" y="${y}" width="${larg}" height="${haut}" fill="none" stroke="${couleur}" stroke-width="${danger ? 2 : 0.7}"/>`);
  lignes.forEach((l, i) => {
    out.push(`<text x="${x + MARGE}" y="${(premiereBase + i * pas).toFixed(1)}" font-family="${FONTE}" font-size="${CORPS}" fill="${couleur}">${echapper(l)}</text>`);
  });

  return { svg: out.join('\n'), hauteur: haut, largeur: larg, lignes, trop };
}

module.exports = { encadre, MARGE };

// --- ligne de commande ---------------------------------------------------
if (require.main === module) {
  const a = process.argv.slice(2);
  const get = k => { const i = a.indexOf('--' + k); return i >= 0 ? a[i + 1] : undefined; };
  const danger = a.includes('--danger');
  const serre = a.includes('--serre');
  const texte = a.filter((v, i) => !v.startsWith('--') && !(i > 0 && a[i - 1].startsWith('--') && !['--danger', '--serre'].includes(a[i - 1]))).pop();
  if (!texte) {
    console.error('usage : encadre.js --x 40 --y 700 --max 600 [--danger] [--serre] "texte"');
    process.exit(2);
  }
  const r = encadre({
    x: Number(get('x') || 40), y: Number(get('y') || 40), max: Number(get('max') || 600),
    texte, danger, pleineLargeur: !serre,
  });
  if (r.trop.length) console.error(`attention : ${r.trop.length} mot(s) plus long(s) que la boîte`);
  console.log(r.svg);
  console.error(`\n${r.lignes.length} ligne(s), boîte ${r.largeur} × ${r.hauteur}. Ce qui suit se pose à y = ${Number(get('y') || 40) + r.hauteur + 18}.`);
}
