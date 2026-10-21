// Modèle : tête de bébé de quelques mois (3 à 6 mois), de profil vers la droite.
// Pas une planche du livre : une feuille de modèle, à juger en grand avant de porter la
// fonction dessiner() dans formes.js.
//
// Construction (Loomis/Bridgman, adaptée au nourrisson), en unités de H = hauteur sommet → menton,
// u vers l'avant (droite), v vers le bas, sommet du crâne à v = 0 :
//   - la sphère du crâne, énorme : centre (-0.01, 0.43), demi-axes 0.475 × 0.44 (le crâne
//     d'un nourrisson est à peine plus long que haut) ; son contour EST la silhouette du
//     crâne ; le visage n'en sort
//     qu'en bas et en avant, il tient sous la ligne des yeux ;
//   - le plan du visage, presque vertical, à u ≈ 0.43, le front bombé qui le déborde ;
//   - les lignes : mi-hauteur 0.50, sourcils 0.575, yeux 0.635 (bien sous la mi-hauteur),
//     base du nez 0.745, bouche 0.81, menton 1.0 ; tout le visage (sourcil → menton) ne fait
//     que 0.43 H, le crâne prend le reste ;
//   - l'oreille basse : son haut sous la ligne des sourcils, son bas sous la bouche ; elle
//     se place juste derrière le milieu de la sphère, un peu couchée vers l'arrière ;
//   - presque pas de cou : la joue et le double menton tombent sur la poitrine, la nuque
//     n'est qu'un pli sous l'occiput.
// On trace le contour par-dessus et on n'imprime que lui (construction: true pour voir les volumes).
//
// dessiner(x, y, echelle, o) : (x, y) = le conduit de l'oreille ; à l'échelle 1, la tête fait
// 150 du sommet au menton (un adulte en fait 230). Rend une chaîne SVG.

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
  const S = 150 * echelle;
  const OREILLE = [-0.06, 0.70];
  const P = ([u, v]) => [x + (u - OREILLE[0]) * S, y + (v - OREILLE[1]) * S];
  const path = (pts, at) => `<path d="${lisse(pts, P)}" ${at}/>`;
  const out = [];

  if (o.construction) {
    const C = 'fill="none" stroke="#000" stroke-width="0.4" stroke-dasharray="3 3"';
    const [cx, cy] = P([-0.01, 0.43]);
    out.push(`<ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="${f1(0.475 * S)}" ry="${f1(0.44 * S)}" ${C}/>`);
    for (const v of [0, 0.5, 0.575, 0.635, 0.745, 0.81, 1.0]) {
      const a = P([-0.55, v]), b = P([0.6, v]);
      out.push(`<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}" ${C}/>`);
    }
    const a = P([0.43, 0.3]), b = P([0.43, 1.05]);
    out.push(`<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}" ${C}/>`);
  }

  // ── le crâne : l'ellipse de construction elle-même, à peine plus longue que haute ──
  const CR = { cx: -0.01, cy: 0.43, rx: 0.475, ry: 0.44 };   // la sphère du crâne
  const crane = [];
  for (let i = 0; i <= 18; i++) {                     // de l'occiput, par le sommet, au front
    const r = (227 - i * (241 / 18)) * Math.PI / 180;
    crane.push([CR.cx + CR.rx * Math.cos(r), CR.cy - CR.ry * Math.sin(r)]);
  }

  // ── la silhouette, d'un trait : du dos, par la nuque, le crâne, le front, le visage, à la poitrine ──
  out.push(path([
    [-0.51, 1.17],                          // l'épaule, ronde
    [-0.475, 1.06], [-0.425, 0.955],        // le haut du dos, épais, voûté
    [-0.36, 0.865],
    { p: [-0.295, 0.808], c: 1 },           // le pli de la nuque, sous le gras de l'occiput : presque pas de cou
    ...crane,
    [0.435, 0.59],                          // l'arcade, à peine
    [0.420, 0.632],                         // racine du nez, basse, creuse
    [0.428, 0.672], [0.447, 0.703],         // l'arête courte, concave
    [0.465, 0.721], [0.470, 0.738],         // le bouton, rond, retroussé
    [0.459, 0.75], { p: [0.437, 0.755], c: 1 },    // dessous du nez qui remonte, sous-nasal
    [0.443, 0.775], [0.454, 0.795],         // lèvre supérieure, en moue douce
    { p: [0.441, 0.811], c: 1 },            // la commissure, rentrée
    [0.445, 0.827], [0.436, 0.843],         // lèvre inférieure, petite, en retrait
    [0.424, 0.858],                         // le creux sous la lèvre, doux
    [0.427, 0.885], [0.418, 0.918],         // le menton, petit et rond, qui fuit
    [0.392, 0.948], [0.35, 0.968],          // dessous du menton, mou
    [0.295, 0.98],
    { p: [0.25, 0.988], c: 1 },             // le pli : le double menton posé sur la poitrine
    [0.272, 1.03], [0.297, 1.09], [0.31, 1.17],   // la poitrine, qui pousse en avant
  ], T_SIL));

  // ── la joue : la grosse boule de gras, de l'œil au double menton ──
  out.push(path([[0.335, 0.70], [0.37, 0.745], [0.388, 0.80], [0.385, 0.85], [0.37, 0.885]], T_FIN));
  // le dessous de la mâchoire : la joue qui roule dans le double menton
  out.push(path([[0.25, 0.988], [0.20, 0.982], [0.15, 0.968]], T_FIN));
  // le pli de la nuque, derrière
  out.push(path([[-0.295, 0.808], [-0.26, 0.81], [-0.225, 0.825]], T_FIN));

  // ── l'oreille : basse, ronde, un peu couchée en arrière ──
  out.push(path([
    [-0.022, 0.668], [-0.012, 0.635], [-0.03, 0.603],
    [-0.07, 0.589], [-0.11, 0.60], [-0.136, 0.64],
    [-0.142, 0.70], [-0.127, 0.76], [-0.097, 0.80],
    [-0.062, 0.813], [-0.036, 0.797], [-0.026, 0.772],
  ], T_INT));                                                                   // l'ourlet, du pied au lobe
  out.push(path([[-0.022, 0.668], [-0.04, 0.676], [-0.055, 0.672]], T_FIN));    // le pied de l'ourlet, dans la conque
  out.push(path([[-0.042, 0.622], [-0.08, 0.615], [-0.11, 0.642], [-0.118, 0.70], [-0.10, 0.745], [-0.075, 0.765]], T_FIN));   // l'anthélix
  out.push(path([[-0.026, 0.705], [-0.05, 0.692], [-0.074, 0.707], [-0.072, 0.738], [-0.05, 0.752], [-0.03, 0.748]], T_FIN));   // la conque
  out.push(path([[-0.008, 0.70], [0.002, 0.72], [-0.01, 0.742]], T_FIN));       // le tragus

  // ── l'œil : grand pour le visage, sous la mi-hauteur, en retrait du plan du visage ──
  const oe = [0.357, 0.638];
  out.push(path([[0.31, 0.632], [0.325, 0.615], [0.348, 0.609], [0.373, 0.618]], T_INT));   // paupière haute
  out.push(path([[0.307, 0.645], [0.333, 0.659], [0.362, 0.655]], T_FIN));                  // paupière basse
  {
    const c = P(oe);
    out.push(`<ellipse cx="${f1(c[0])}" cy="${f1(c[1])}" rx="${f1(0.013 * S)}" ry="${f1(0.021 * S)}" fill="${NOIR}" stroke="none"/>`);
    const r = P([oe[0] + 0.004, oe[1] - 0.008]);
    out.push(`<circle cx="${f1(r[0])}" cy="${f1(r[1])}" r="${f1(0.004 * S)}" fill="#fff" stroke="none"/>`);   // le reflet
  }
  out.push(path([[0.368, 0.614], [0.379, 0.605], [0.387, 0.603]], T_FIN));   // cils
  out.push(path([[0.322, 0.603], [0.34, 0.596], [0.358, 0.597]], T_FIN));    // pli de la paupière
  out.push(path([[0.30, 0.575], [0.335, 0.565], [0.37, 0.568]], T_FIN));     // sourcil, à peine

  // ── le nez : la narine ; la bouche : la fente ──
  out.push(path([[0.448, 0.744], [0.434, 0.735], [0.44, 0.72], [0.456, 0.724]], T_FIN));
  out.push(path([[0.441, 0.812], [0.425, 0.814], [0.414, 0.809]], T_INT));

  // ── quelques cheveux fins, du tourbillon vers le front ; rien d'une coiffure ──
  const meche = (t1, t2, k) => {     // un arc fin parallèle au crâne, à k du contour
    const pts = [];
    for (let i = 0; i <= 4; i++) {
      const r = (t1 + (t2 - t1) * i / 4) * Math.PI / 180;
      pts.push([CR.cx + (CR.rx - k) * Math.cos(r), CR.cy - (CR.ry - k) * Math.sin(r)]);
    }
    return path(pts, T_FIN);
  };
  // des mèches courtes et fines qui tournent autour du tourbillon, sur le haut et l'arrière
  for (const [t, k, l] of [[128, 0.035, 14], [112, 0.06, 13], [96, 0.04, 14], [80, 0.065, 12], [64, 0.045, 12],
                           [147, 0.065, 11], [158, 0.035, 9], [137, 0.105, 10], [104, 0.1, 13], [50, 0.075, 9]])
    out.push(meche(t + l / 2, t - l / 2, k));

  out.push(path([[-0.07, 0.006], [-0.03, -0.035], [0.02, -0.04], [0.045, -0.02]], T_FIN));   // la mèche sur le sommet

  return out.join('\n');
}

module.exports = (h) => ({
  ref: 'modèle',
  titre: 'Tête de bébé de quelques mois, de profil',
  desc: 'Feuille de modèle : une tête de bébé de quelques mois de profil vers la droite, dessinée en grand.',
  fichier: '_modeles-tete-bebe-construction.svg',
  format: 'pleine',
  disposition: [['a']],
  vues: {
    a: { dessin: z => dessiner(z.l * 0.47, z.h * 0.52, 3.35, { construction: !!process.env.CONSTRUCTION }) },
  },
});
module.exports.dessiner = dessiner;
