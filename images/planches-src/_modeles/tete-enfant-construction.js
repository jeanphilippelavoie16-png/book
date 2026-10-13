// Modèle : tête d'enfant de 4 à 6 ans, de profil vers la droite, avec le cou.
// Pas une planche du livre : une feuille de modèle, à juger en grand avant de porter la
// fonction dessiner() dans formes.js.
//
// Construction (Loomis/Bridgman, adaptée à l'enfant), en unités de H = hauteur sommet → menton :
//   - la sphère du crâne, très grosse : centre (-0.03, 0.44), rayon 0.44 ; elle porte presque
//     toute la tête, le visage n'en sort qu'en bas et en avant ;
//   - le plan du visage, presque vertical, à x ≈ 0.41 ;
//   - les lignes : mi-hauteur 0.50, sourcils 0.545, yeux 0.60 (sous la mi-hauteur), base du nez
//     0.775, bouche 0.84, menton 1.0 ; le bas du visage est court (nez → menton = 0.225 H) ;
//   - l'oreille entre la ligne des sourcils et la base du nez, juste derrière le milieu du crâne ;
//   - le cou mince (≈ 0.32 H), incliné vers l'avant, la nuque rentrée sous l'occiput qui déborde.
// On trace le contour par-dessus et on n'imprime que lui (construction: true pour voir les volumes).
//
// dessiner(x, y, echelle, o) : (x, y) = le centre de l'oreille ; à l'échelle 1, la tête fait
// 200 du sommet au menton (un adulte en fait 230). Rend une chaîne SVG.

const NOIR = '#000';
const trait = ep => `fill="none" stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="round"`;
const T_SIL = trait(1.5), T_INT = trait(0.7), T_FIN = trait(0.5);
const f1 = v => Math.round(v * 10) / 10;

// Spline de Catmull-Rom passant par les points ; un point { c: 1 } casse la courbe (angle vif).
function lisse(pts, P) {
  const q = pts.map(p => (Array.isArray(p) ? { p, c: 0 } : { p: p.p, c: p.c || 0 }));
  const X = q.map(o => P(o.p));
  let d = `M${f1(X[0][0])} ${f1(X[0][1])}`;
  for (let i = 0; i < X.length - 1; i++) {
    const p1 = X[i], p2 = X[i + 1];
    const p0 = (i === 0 || q[i].c) ? p1 : X[i - 1];
    const p3 = (i + 2 >= X.length || q[i + 1].c) ? p2 : X[i + 2];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${f1(c1[0])} ${f1(c1[1])} ${f1(c2[0])} ${f1(c2[1])} ${f1(p2[0])} ${f1(p2[1])}`;
  }
  return d;
}

function dessiner(x, y, echelle = 1, o = {}) {
  const S = 200 * echelle;
  const OREILLE = [-0.095, 0.655];
  const P = ([u, v]) => [x + (u - OREILLE[0]) * S, y + (v - OREILLE[1]) * S];
  const path = (pts, at) => `<path d="${lisse(pts, P)}" ${at}/>`;
  const out = [];

  if (o.construction) {
    const C = 'fill="none" stroke="#000" stroke-width="0.4" stroke-dasharray="3 3"';
    const [cx, cy] = P([-0.03, 0.44]);
    out.push(`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(0.44 * S)}" ${C}/>`);
    for (const v of [0, 0.5, 0.545, 0.60, 0.775, 0.84, 1.0]) {
      const a = P([-0.55, v]), b = P([0.6, v]);
      out.push(`<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}" ${C}/>`);
    }
    const a = P([0.41, 0.3]), b = P([0.41, 1.05]);
    out.push(`<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}" ${C}/>`);
  }

  // ── la silhouette du visage : du bas de la frange jusqu'à la gorge ──
  out.push(path([
    [0.418, 0.415],                       // la peau sort sous la frange
    [0.432, 0.48], [0.425, 0.545],        // front bombé d'enfant, arcade à peine marquée
    [0.407, 0.60],                        // racine du nez, basse et creuse
    [0.418, 0.655], [0.442, 0.705],       // l'arête courte, concave
    [0.461, 0.732], [0.458, 0.755],       // le bout rond, retroussé
    [0.444, 0.766], { p: [0.424, 0.774], c: 1 },   // dessous du nez qui remonte, sous-nasal
    [0.431, 0.80], { p: [0.44, 0.822], c: 1 },     // lèvre supérieure, ourlée en avant
    { p: [0.427, 0.84], c: 1 },           // la commissure
    [0.434, 0.857], [0.426, 0.876],       // lèvre inférieure, ronde
    [0.408, 0.897],                       // le creux sous la lèvre
    [0.416, 0.935], [0.402, 0.972],       // petit menton rond, en retrait
    [0.36, 0.998], [0.33, 1.012],         // dessous du menton, court et rond
    [0.25, 1.03], [0.20, 1.045],          // l'angle de gorge, doux
    [0.165, 1.085], [0.15, 1.14],         // le devant du cou, presque vertical
  ], T_SIL));

  // L'arrière du crâne, tiré sur le cercle (centre (-0.03, 0.44)), de -108° à -198° ;
  // le contour reste lisse ; les encoches de mèche sont des traits qui partent du contour (plus bas).
  const C_CRANE = [-0.03, 0.44];
  const ptc = (deg, r) => [C_CRANE[0] + r * Math.cos(deg * Math.PI / 180), C_CRANE[1] + r * Math.sin(deg * Math.PI / 180)];
  const Rc = deg => 0.433 + (0.447 - 0.433) * (-108 - deg) / 90;

  // ── les cheveux : la masse ronde du crâne, frange sur le front, nuque courte ──
  out.push(path([
    [0.418, 0.415],                       // pointe de la frange, sur le front
    [0.438, 0.38], [0.446, 0.32],          // la frange se gonfle en avant
    [0.415, 0.18], [0.31, 0.07],
    [0.16, 0.008], [0.0, -0.005],         // le sommet, au-dessus de l'oreille
    [-0.17, 0.03], [-0.32, 0.12],
    [-0.43, 0.27], [-0.475, 0.43],        // l'occiput qui déborde
    [-0.455, 0.58],
    [-0.40, 0.70],
    [-0.345, 0.77], [-0.27, 0.815],       // les cheveux finissent en douceur
    [-0.232, 0.87], [-0.208, 0.95],       // la nuque, rentrée sous le crâne
    [-0.198, 1.03], [-0.205, 1.10],
  ], T_SIL));
  // le bas de la frange : deux mèches douces qui se posent sur le front
  out.push(path([[0.418, 0.415], [0.385, 0.405], { p: [0.345, 0.405], c: 1 }, [0.315, 0.415], [0.28, 0.418], { p: [0.25, 0.41], c: 1 },
    [0.235, 0.43], [0.22, 0.445]], T_INT));
  // la ligne des cheveux : de la frange à la tempe, la patte devant l'oreille
  out.push(path([[0.22, 0.445], [0.16, 0.50], [0.06, 0.545], [-0.042, 0.582]], T_INT));   // un seul arc de tempe
  out.push(path([[0.008, 0.56], [0.006, 0.595], [-0.003, 0.618], [-0.014, 0.627]], T_INT));   // la patte, courte
  // derrière l'oreille, jusqu'à la nuque
  out.push(path([
    [-0.045, 0.545], [-0.12, 0.53], [-0.19, 0.56],
    [-0.215, 0.63], [-0.22, 0.72], [-0.24, 0.785], [-0.27, 0.815],
  ], T_INT));
  // quelques mèches dans le sens de la pousse, du tourbillon vers la frange
  out.push(path([[-0.22, 0.13], [-0.05, 0.08], [0.12, 0.10], [0.28, 0.185]], T_FIN));
  out.push(path([[-0.12, 0.21], [0.03, 0.19], [0.20, 0.26]], T_FIN));
  // deux encoches de mèche : le bout d'une mèche qui rejoint le contour, dans le sens de la pousse
  out.push(path([ptc(-113, Rc(-113)), ptc(-118, Rc(-113) - 0.022), ptc(-123, Rc(-113) - 0.036)], T_INT));
  out.push(path([[-0.441, 0.30], [-0.431, 0.335], [-0.424, 0.368]], T_INT));

  // ── le cou mince et la nuque ──
  // le col du chandail et la naissance des épaules
  out.push(path([[0.15, 1.14], [0.177, 1.19], [0.203, 1.25], [0.215, 1.30]], T_SIL));
  out.push(path([[-0.205, 1.10], [-0.26, 1.15], [-0.31, 1.21], [-0.335, 1.30]], T_SIL));
  out.push(path([[-0.205, 1.10], [-0.09, 1.13], [0.04, 1.147], [0.15, 1.14]], T_INT));

  // ── l'oreille : grande, entre le sourcil et la base du nez ──
  out.push(path([
    [-0.045, 0.585], [-0.085, 0.558], [-0.135, 0.563],
    [-0.165, 0.61], [-0.168, 0.675], [-0.152, 0.735],
    [-0.127, 0.772], [-0.095, 0.79], [-0.066, 0.782],   // le lobe, rond et charnu
    [-0.05, 0.757], [-0.045, 0.725], [-0.043, 0.69],   // qui rejoint la joue
  ], T_INT));
  out.push(path([[-0.06, 0.60], [-0.105, 0.588], [-0.138, 0.62], [-0.142, 0.675], [-0.125, 0.72], [-0.10, 0.74]], T_FIN));  // l'ourlet
  out.push(path([[-0.055, 0.66], [-0.076, 0.663], [-0.087, 0.685], [-0.075, 0.71]], T_FIN));  // la conque

  // ── l'œil : grand, rond, sous la mi-hauteur, en retrait du plan du visage ──
  const oe = [0.336, 0.603];
  out.push(path([[0.295, 0.60], [0.31, 0.582], [0.332, 0.573], [0.355, 0.582]], T_INT));   // paupière haute
  out.push(path([[0.295, 0.60], [0.312, 0.615], [0.33, 0.62]], T_FIN));                   // paupière basse : un < ouvert vers le nez
  {
    const c = P(oe);
    out.push(`<ellipse cx="${f1(c[0])}" cy="${f1(c[1])}" rx="${f1(0.011 * S)}" ry="${f1(0.024 * S)}" fill="${NOIR}" stroke="none"/>`);
    const r = P([oe[0] + 0.005, oe[1] - 0.009]);
    out.push(`<circle cx="${f1(r[0])}" cy="${f1(r[1])}" r="${f1(0.0045 * S)}" fill="#fff" stroke="none"/>`);   // le reflet
  }
  out.push(path([[0.352, 0.58], [0.362, 0.571], [0.37, 0.569]], T_FIN));   // un seul cil
  out.push(path([[0.26, 0.53], [0.295, 0.516], [0.335, 0.515], [0.365, 0.522]], T_INT));   // sourcil, fin et haut

  // ── le nez : la narine ──
  out.push(path([[0.43, 0.762], [0.417, 0.75], [0.424, 0.734], [0.443, 0.738]], T_FIN));

  // ── la bouche, la joue, la mâchoire ──
  out.push(path([[0.427, 0.84], [0.41, 0.842], [0.397, 0.836]], T_INT));    // la fente, qui sourit un peu

  return out.join('\n');
}

module.exports = (h) => ({
  ref: 'modèle',
  titre: 'Tête d’enfant de quatre à six ans, de profil',
  desc: 'Feuille de modèle : une tête d’enfant de profil vers la droite, avec le cou, dessinée en grand.',
  fichier: '_modeles-tete-enfant-final.svg',
  format: 'pleine',
  disposition: [['a']],
  vues: {
    a: { dessin: z => [
      dessiner(z.l * 0.47, z.h * 0.45, 2.35, { construction: !!process.env.CONSTRUCTION }),
      dessiner(90, z.h - 52, 0.35),        // à la taille d'une vignette
      dessiner(z.l - 80, z.h - 70, 0.5),
    ].join('\n') },
  },
});
module.exports.dessiner = dessiner;
