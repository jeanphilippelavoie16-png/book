// stock.js — les mains des planches, tirées du fichier Adobe Stock 116570613 (JP, 18 octobre 2026 : « les bonnes
// mains »). Ce sont les tracés exacts de l'illustratrice, posés au style du livre : la main blanche cernée de noir,
// l'objet tenu en gris cerné. Rien n'est redessiné : on choisit une main, on la place, on la tourne, on la retourne.
//
// La bibliothèque : stock/catalogue.json (construit par stock/construire.py depuis le .ai ; les noms dans
// stock/noms.json). La feuille des ids : images/planches-src/_palette-mains-stock.js.
//
// ═══ L'API ══════════════════════════════════════════════════════════════════════════════════════════
//
//   mainStock({ id, x, y, taille, echelle, angle, miroir, ancre, objet, objetCouleur, trait, loin })
//     id        un id du catalogue ('2-09') ou un nom de stock/noms.json ('poing-tige')
//     x, y      où tombe l'ancre, en unités de la vue
//     taille    le plus grand côté de la main, en unités de la vue (défaut 120) ; ou echelle (unités de vue par
//               unité du fichier)
//     angle     rotation à l'écran autour de l'ancre, en degrés (sens horaire), après le miroir
//     miroir    true : la main gauche (le miroir horizontal)
//     ancre     'objet' (défaut s'il y a un objet : le centre de l'objet tenu) · 'coupe' (le milieu de la coupe
//               de l'avant-bras) · 'centre' (le centre de la boîte ; défaut sans objet) · [u, v] (un point de la
//               boîte, en fractions : [0, 0] le coin haut gauche, [1, 1] le coin bas droit)
//     objet     true (défaut : l'objet du fichier, en gris) · false (sans : la planche dessine le sien, AVANT la
//               main, sur l'axe .objet rendu)
//     objetCouleur  le gris de l'objet (défaut #E6E6E6)
//     trait     l'épaisseur du contour en unités de la vue (défaut 1,5, celui de la silhouette du livre)
//     loin      true : la main en gris (#E6E6E6), la main de derrière
//
// Le résultat se colle comme une chaîne SVG et porte, en unités de la vue :
//   .objet   { x, y, angle, longueur, largeur }  l'axe de l'objet tenu dans le fichier (null sans objet) : la
//            planche y pose son propre objet (objet: false) ;
//   .coupe   [[x, y], [x, y]]  les deux bouts de la coupe de l'avant-bras ;
//   .boite   { x0, y0, x1, y1 } ; .centre [x, y] ; .echelle.
'use strict';
const path = require('path');
const CAT = require('./stock/catalogue.json');
let NOMS = {};
try { NOMS = require('./stock/noms.json'); } catch (e) { /* pas encore nommées */ }

const NOIR = '#1A1A1A', BLANC = '#FFFFFF', GRIS = '#E6E6E6';
const r1 = v => Math.round(v * 100) / 100;

function trouver(id) {
  if (CAT[id]) return [id, CAT[id]];
  for (const [k, v] of Object.entries(NOMS)) if (v.nom === id) return [k, CAT[k]];
  throw new Error(`mainStock : main « ${id} » introuvable (un id 'R-CC' de stock/catalogue.json ou un nom de stock/noms.json)`);
}

function mainStock(o = {}) {
  const [id, M] = trouver(o.id);
  const [bx0, by0, bx1, by1] = M.boite;
  const W = bx1 - bx0, H = by1 - by0;
  const k = o.echelle || (o.taille || 120) / Math.max(W, H);
  const sx = o.miroir ? -1 : 1;
  const avecObjet = o.objet !== false;
  // le point d'ancre, dans le fichier
  let A;
  const ancre = o.ancre || (M.objet ? 'objet' : 'centre');
  if (Array.isArray(ancre)) A = [bx0 + ancre[0] * W, by0 + ancre[1] * H];
  else if (ancre === 'objet' && M.objet) A = [M.objet.x, M.objet.y];
  else if (ancre === 'coupe' && M.coupe) A = [(M.coupe[0][0] + M.coupe[1][0]) / 2, (M.coupe[0][1] + M.coupe[1][1]) / 2];
  else A = [(bx0 + bx1) / 2, (by0 + by1) / 2];
  const x = o.x || 0, y = o.y || 0, ang = o.angle || 0;
  const tr = `translate(${r1(x)} ${r1(y)}) rotate(${r1(ang)}) scale(${r1(sx * k * 1e4) / 1e4} ${r1(k * 1e4) / 1e4}) translate(${r1(-A[0])} ${r1(-A[1])})`;
  // le même passage, pour la géométrie rendue
  const c = Math.cos(ang * Math.PI / 180), s = Math.sin(ang * Math.PI / 180);
  const T = ([px, py]) => { const u = sx * k * (px - A[0]), v = k * (py - A[1]); return [r1(x + c * u - s * v), r1(y + s * u + c * v)]; };
  const ep = (o.trait || 1.5) / k;
  const fondMain = o.loin ? GRIS : BLANC, fondObjet = o.objetCouleur || GRIS;
  const out = [];
  for (const ch of M.chemins) {
    if (ch.role === 'objet' && !avecObjet) continue;
    const fond = ch.role === 'objet' ? fondObjet : fondMain;
    const e = ch.role === 'objet' ? ep * 0.8 : ep;
    out.push(`<path fill="${fond}" stroke="${NOIR}" stroke-width="${r1(e * 100) / 100}" stroke-linejoin="round" fill-rule="${ch.regle}" d="${ch.d}"/>`);
  }
  const svg = `<g data-main="${id}" transform="${tr}">${out.join('')}</g>`;
  const coins = [[bx0, by0], [bx1, by0], [bx1, by1], [bx0, by1]].map(T);
  const geo = {
    id, echelle: k,
    boite: { x0: Math.min(...coins.map(p => p[0])), y0: Math.min(...coins.map(p => p[1])), x1: Math.max(...coins.map(p => p[0])), y1: Math.max(...coins.map(p => p[1])) },
    centre: T([(bx0 + bx1) / 2, (by0 + by1) / 2]),
    coupe: M.coupe ? M.coupe.map(T) : null,
    objet: M.objet ? Object.assign({}, { x: T([M.objet.x, M.objet.y])[0], y: T([M.objet.x, M.objet.y])[1] },
      { angle: r1((o.miroir ? 180 - M.objet.angle : M.objet.angle) + ang), longueur: r1(M.objet.longueur * k), largeur: r1(M.objet.largeur * k) }) : null,
  };
  return Object.assign({ svg, toString() { return svg; } }, geo);
}

module.exports = { mainStock, catalogue: CAT, noms: NOMS };
