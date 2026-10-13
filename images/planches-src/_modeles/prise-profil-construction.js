// Modèle — la main droite qui serre un manche vu par le bout, de profil côté pouce.
// Pas une planche du livre : une feuille de modèle, à juger avant de porter dessiner() dans formes.js.
//
// Construction (Loomis/Bridgman), en mm, à l'échelle 1 ; origine au centre du manche, y vers le bas,
// l'avant-bras arrive de la gauche, le dos de la main en haut. Les volumes (os, articulations) sont
// posés d'abord ; seul le contour s'imprime. MODELE_CONSTRUCTION=1 les montre en trait tireté.

const NOIR = '#1A1A1A', BLANC = '#FFFFFF';
const trait = (ep, cap = 'round') => `fill="none" stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="${cap}"`;
const FOND = `fill="${BLANC}" stroke="none"`;

// Catmull-Rom → Bézier : une courbe lisse qui passe par chaque point.
function lisse(P, ferme = false) {
  const n = P.length, f = v => Math.round(v * 10) / 10;
  const g = i => ferme ? P[(i + n) % n] : P[Math.max(0, Math.min(n - 1, i))];
  let d = `M${f(P[0][0])} ${f(P[0][1])}`;
  const fin = ferme ? n : n - 1;
  for (let i = 0; i < fin; i++) {
    const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d + (ferme ? ' Z' : '');
}

// ─── la construction ────────────────────────────────────────────────────────────────────
const R_MANCHE = 17;                          // manche de 34 mm
const C = {
  poignet: [-72, -18],                        // milieu du pli du poignet
  trapeze: [-64, -6],                         // base du pouce (articulation trapézo-métacarpienne)
  // index : métacarpe, puis trois phalanges 43 · 25 · 19
  K: [22, -30], J1: [28, 12], J2: [8, 27], T: [-9, 19],
  // pouce : métacarpe 44, phalange 28, phalange distale 30 avec la pulpe
  Mp: [-33, 25], Ip: [-6, 31], Tp: [25, 21],
};

function dessiner(x, y, echelle = 1, { construction = false } = {}) {
  const T = ([u, v]) => [x + u * echelle, y + v * echelle];
  const tr = (pts, ferme) => lisse(pts.map(T), ferme);
  // Chaque pièce : son blanc (fond), ses bords de silhouette (sil : un 2,4 posé sous tout, dont
  // le blanc recouvre la moitié, plus un 0,7 par-dessus : ~1,6 à l'œil), ses bords de recouvrement
  // (rec : 1,4, la pièce de devant sur celle de derrière) et ses détails (det : 0,5 à 0,7).
  // Peintes de l'arrière vers l'avant.
  const pieces = [];
  const piece = (p) => { pieces.push({ sil: [], rec: [], det: [], ...p }); };

  // 1. Avant-bras, paume et dos de la main : le volume du fond. Le dos file droit au poignet.
  piece({
    fond: [[-150, -45.2], [-120, -43.8], [-74, -39], [-20, -40.4], [12, -41.6], [26, -38], [28, -16], [8, 4],
           [-30, 24], [-72, 5], [-120, 9.5], [-150, 12.4]],
    det0: [[[-150, -46.8], [-138, -46.3]]],
    sil: [[[-140, -46.38], [-125, -45.6], [-90, -41.6], [-74, -40.6], [-40, -41.8], [0, -43.2], [14, -43.4]]],
  });

  // 2. Majeur, annulaire, auriculaire : derrière l'index. On n'en voit que l'articulation du
  //    milieu et le dos de la phalange du milieu ; les trois bosses font l'escalier sous la main.
  piece({
    fond: [[30, 6], [38.5, 13], [40.5, 21], [39, 27], [34.5, 32], [31, 37.5], [25.5, 40.5], [20, 41.8], [12, 40.4], [5, 37.8],
           [1, 35], [0, 30], [10, 20]],
    sil: [[[39.4, 13], [41.6, 20], [40.6, 26.5], [36.4, 31]],                          // majeur
          [[36.4, 31], [35.3, 35.4], [31.4, 39], [26.6, 40.8]],                        // annulaire
          [[26.6, 40.8], [25, 42.6], [20, 43.4], [12, 42], [5, 39.4], [0.5, 37]]],   // auriculaire
    det: [[[36.4, 31], [32.8, 28.8], [29.5, 28]], [[26.6, 40.8], [22.5, 38.4], [18.5, 37.8]],    // les doigts se séparent
          [[38.6, 21], [39, 23.6]], [[33, 34.6], [32.8, 36.8]]],                                // plis
  });

  // 3. L'index, qui s'enroule autour du manche : articulation du milieu en coin, phalange du milieu
  //    qui repasse sous le manche et file sous le pouce.
  piece({
    fond: [[10, -28], [12, -42], [25, -41.4], [32.6, -35.4], [36, -20], [37.8, -3], [38.8, 7.5], [38, 14.5], [33.5, 20.5], [24, 27],
           [14, 33.5], [2, 35], [-4, 32], [-10, 26], [-11, 19], [-6, 15], [6, 17], [18, 12], [19, 0], [17, -16]],
    sil: [[[12, -43.4], [21, -43], [29, -40.5], [35, -34], [37.5, -20], [39.3, -4], [40.4, 7], [39.6, 14.5], [37.4, 18.6]]],
    rec: [[[37.4, 18.6], [33.6, 22], [26, 27], [17, 32], [8, 35.2], [2, 36]]],
    det: [[[16.5, -6], [14.6, -18], [11.4, -26.5], [6.5, -31]],                       // le bord de l'index contre la paume
          [[34.2, 12.2], [35.6, 14.6], [35.9, 17]], [[31.6, 14.6], [32.8, 16.6], [32.9, 18.8]],   // plis de l'articulation
          [[27, -38], [31, -34.5], [32.5, -30]]],                                     // la tête du métacarpe
  });

  // 4. Le pouce : part de la base de la paume au poignet, passe par-dessus l'index replié et se
  //    couche le long de lui, l'ongle de côté.
  piece({
    fond: [[-84, -17], [-64, -15], [-50, -4], [-38, 8], [-31, 12.6], [-25.5, 15.6], [-16, 18.4], [-4, 19.5], [6, 17], [16, 14.5],
           [23, 14.2], [27.5, 17.5], [27, 23], [22, 27.5], [12, 31.5], [2, 36], [-8, 38.8], [-20, 39.2], [-34, 37.2],
           [-50, 27.6], [-63, 16.6], [-73, 8.2], [-86, 5.4]],
    det0: [[[-66, -16.4], [-62, -13.5], [-56, -8.6]], [[-138, 13.45], [-150, 14.4]]],
    rec: [[[-56, -8.6], [-50, -4], [-38, 8], [-31, 12.6], [-25.5, 15.6], [-16, 18.4], [-4, 19.5], [6, 17], [16, 14.5], [23, 14.2],
           [27.5, 17.5], [27, 23], [22, 27.5], [12, 31.5], [2, 36], [-8, 40], [-18, 40.6]]],
    sil: [[[-18, 40.6], [-34, 38.5], [-50, 30], [-63, 19], [-72, 11], [-84, 8.2], [-100, 9.4], [-130, 12.8], [-140, 13.6]]],
    det: [[[8, 17.6], [14, 15.2], [21, 14.8], [24.6, 16.3]], [[8, 17.6], [12, 19.6], [18, 19.3], [24.6, 16.3]],   // l'ongle
          [[-6, 37], [-4, 33], [-5, 29]],                                            // pli de l'articulation du pouce
          [[-30, 17.5], [-27, 21], [-27.5, 25]]],                                    // la bosse de l'articulation de base
    epDet: [0.7, 0.7, 0.5, 0.5],
  });

  const out = [];
  for (const p of pieces) for (const t of p.sil) out.push(`<path d="${tr(t)}" ${trait(2.4, 'butt')}/>`);
  for (const p of pieces) {
    out.push(`<path d="${tr(p.fond, true)}" ${FOND}/>`);
    for (const t of p.sil) out.push(`<path d="${tr(t)}" ${trait(0.7)}/>`);
    for (const t of p.det0 || []) out.push(`<path d="${tr(t)}" ${trait(0.7)}/>`);
    for (const t of p.rec) out.push(`<path d="${tr(t)}" ${trait(1.4)}/>`);
    p.det.forEach((t, i) => out.push(`<path d="${tr(t)}" ${trait((p.epDet || [])[i] || 0.5)}/>`));
  }

  // 5. Le bout du manche, qui sort de la main vers l'œil.
  const [cx, cy] = T([0, 0]);
  out.push(`<circle cx="${cx}" cy="${cy}" r="${R_MANCHE * echelle}" fill="url(#h-bois)" stroke="${NOIR}" stroke-width="1.4"/>`);

  if (construction) {
    const L = (a, b) => { const [p, q] = [T(a), T(b)]; out.push(`<line x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}" stroke="${NOIR}" stroke-width="0.5" stroke-dasharray="3 2"/>`); };
    const O = a => { const p = T(a); out.push(`<circle cx="${p[0]}" cy="${p[1]}" r="${2 * echelle}" fill="none" stroke="${NOIR}" stroke-width="0.5"/>`); };
    [[C.poignet, C.K], [C.K, C.J1], [C.J1, C.J2], [C.J2, C.T], [C.trapeze, C.Mp], [C.Mp, C.Ip], [C.Ip, C.Tp]].forEach(([a, b]) => L(a, b));
    [C.poignet, C.trapeze, C.K, C.J1, C.J2, C.Mp, C.Ip].forEach(O);
  }
  return out.join('\n');
}

module.exports = (h) => ({
  ref: 'modele',
  titre: 'La prise, de profil côté pouce',
  desc: 'Modèle : la main droite serre un manche vu par le bout ; le pouce passe par-dessus l’index replié.',
  fichier: '_modeles-prise-profil-construction.svg',
  format: 'pleine',
  disposition: [['a']],
  vues: {
    a: { dessin: z => dessiner(z.l / 2 + 54 * 2.7, z.h / 2, 2.7, { construction: !!process.env.MODELE_CONSTRUCTION }) },
  },
});
module.exports.dessiner = dessiner;
