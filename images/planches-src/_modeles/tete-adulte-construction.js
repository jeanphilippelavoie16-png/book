// Modèle — tête d'homme adulte de profil (regard à droite), avec le cou.
// Feuille de modèle, pas une planche du livre. Construction Loomis : on pose d'abord la sphère
// du crâne, le plan du visage et les lignes de repère (sourcils, nez, menton), puis on trace le
// contour par-dessus. Seul le contour s'imprime ; CONSTRUCTION=1 dans l'environnement montre
// les traits de construction pour juger le modèle.
//
// dessiner(x, y, echelle) : (x, y) = le sommet du crâne ; à l'échelle 1 la tête fait 230 du
// sommet au menton. Rend une chaîne SVG autonome (traits en dur, sans h).

const NOIR = '#000';
const trait = ep => `fill="none" stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="round"`;

// Courbe lisse (Catmull-Rom → Bézier) passant par tous les points.
function lisse(P, ferme = false) {
  const n = P.length, q = i => ferme ? P[(i + n) % n] : P[Math.max(0, Math.min(n - 1, i))];
  let d = `M${P[0][0].toFixed(1)},${P[0][1].toFixed(1)}`;
  const fin = ferme ? n : n - 1;
  for (let i = 0; i < fin; i++) {
    const p0 = q(i - 1), p1 = q(i), p2 = q(i + 1), p3 = q(i + 2);
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d + (ferme ? 'Z' : '');
}

function dessiner(x, y, echelle = 1, { construction = false } = {}) {
  // Repère du modèle : origine au sommet du crâne, y vers le bas. Le sommet est à x = 0 ;
  // l'arrière du crâne à x ≈ −105, la pointe du nez à x ≈ +120.
  const T = ([px, py]) => [x + px * echelle, y + py * echelle];
  const P = pts => pts.map(T);
  const chemin = (pts, ep, ferme) => `<path d="${lisse(P(pts), ferme)}" ${trait(ep)}/>`;
  const droit = (pts, ep) => `<path d="M${P(pts).map(p => p.map(v => v.toFixed(1)).join(',')).join(' L')}" ${trait(ep)}/>`;
  const S = 1.5, D = 0.7, F = 0.5;
  const PATTE = 9;   // pointe du favori, contre le haut de l'oreille
  const out = [];

  // ── Construction (repères) ──
  const Y = { sommet: 0, cheveux: 32, sourcil: 98, oeil: 115, nez: 164, bouche: 184, menton: 230 };
  if (construction) {
    const g = `fill="none" stroke="#c33" stroke-width="0.5" stroke-dasharray="4 3"`;
    const [cx, cy] = T([-10, 92]);
    out.push(`<circle cx="${cx}" cy="${cy}" r="${92 * echelle}" ${g}/>`);
    for (const k in Y) { const [a, b] = T([-120, Y[k]]), [c] = T([135, 0]); out.push(`<line x1="${a}" y1="${b}" x2="${c}" y2="${b}" ${g}/>`); }
    const [m1, m2] = T([-10, -10]), [, m3] = T([0, 330]); out.push(`<line x1="${m1}" y1="${m2}" x2="${m1}" y2="${m3}" ${g}/>`);
  }

  // Les épaisseurs ne suivent pas l'échelle : sous 0,45 les détails fins se bouchent (l'œil de
  // 14 mm passe à 4 mm et devient une tache). On ne les trace qu'au-dessus du seuil.
  const fins = echelle >= 0.45;

  // ── Le visage : du front à la gorge, d'un trait ──
  const profil = [
    [72, 30],    // naissance des cheveux
    [82, 42], [89, 60], [93, 80], [95, 93],   // front, arcade
    [93, 103], [90.5, 110], [92, 116], // racine du nez (creux, au niveau de l'œil)
    [99, 130], [108, 144], [116, 154], // dos du nez
    [120, 160], [117, 165.5],         // pointe arrondie, dessous
    [108, 166.5], [97, 168],          // columelle → sous le nez
    [99, 174], [102, 181],            // lèvre supérieure
    [98, 186],                         // commissure
    [100, 191], [98, 198],            // lèvre inférieure
    [92, 205],                         // creux sous la lèvre
    [97, 213], [98, 222],             // menton
    [88, 230], [68, 236],             // dessous du menton, assez long pour ouvrir l'angle de la gorge
    [46, 246],                         // le cou quitte la mâchoire
  ];
  out.push(chemin(profil, S));

  // Le cou, devant : pomme d'Adam, coupé à y 285 (pas d'épaules : sinon buste de vitrine).
  out.push(chemin([[46, 246], [45.5, 259], [48.5, 268], [48, 285]], S));
  // Le cou, derrière : part sous l'arrière du crâne avec un léger creux, s'évase un peu, coupé à 272.
  out.push(chemin([[-60, 190], [-59, 204], [-62, 222], [-67, 242], [-73, 259], [-80, 272]], S));

  // ── Crâne et cheveux : une seule masse ──
  const cheveux = [
    [-60, 190], [-66, 180], [-78, 163], [-90, 140], [-100, 108], [-102, 78], [-94, 46], [-74, 18],
    [-44, 1], [-6, -4], [30, 2], [56, 14], [72, 30],
  ];
  out.push(chemin(cheveux, S));
  // limite des cheveux : tempe, favori devant l'oreille, qui finit en pointe contre l'oreille
  out.push(chemin([[72, 30], [62, 38], [54, 56], [44, 72], [28, 82], [21, 96], [19, 121], [16, 130], [PATTE, 129]], D));
  out.push(chemin([[-46, 112], [-48, 136], [-53, 164], [-60, 190]], D));             // derrière l'oreille
  // mèches : deux traits fins dans le sens de la pousse
  if (fins) {
    out.push(chemin([[56, 22], [30, 12], [0, 10], [-30, 18]], F));
    out.push(chemin([[48, 40], [26, 32], [0, 32]], F));
  }

  // ── L'oreille : entre la ligne des sourcils et la base du nez, juste derrière le milieu ──
  // l'axe penche vers l'arrière, à peu près parallèle à l'arête du nez ; le tout reculé de 5.
  const OX = -5;
  const penche = pts => pts.map(([px, py]) => [px - (160 - py) * 0.14 + OX, py]);
  // contour : le haut se referme en crochet qui plonge dans la conque
  out.push(chemin(penche([[0, 118], [5, 113], [6, 106], [1, 99], [-12, 95], [-25, 102], [-30, 122], [-27, 142], [-20, 157], [-10, 164], [-2, 161], [2, 151]]), D));
  if (fins) {
    out.push(chemin(penche([[-4, 105], [-17, 102], [-24, 116], [-23, 134]]), F));   // repli de l'hélix
    out.push(chemin(penche([[-12, 152], [-15, 138], [-14, 124], [-11, 110]]), F));     // anthélix, branche haute
    out.push(chemin(penche([[-14, 124], [-8, 119], [-3, 119]]), F));                   // sa branche basse (Y couché)
    out.push(chemin(penche([[-2, 134], [-6, 140], [-6, 146]]), F));                     // bord de la conque
    out.push(chemin([[4 + OX, 126], [8 + OX, 132], [4 + OX, 138]], F));                // tragus
  }

  // ── La mâchoire : de l'angle sous l'oreille jusqu'au menton ──
  out.push(chemin([[-3 + OX, 168], [-6, 186], [-1, 197], [9, 204], [30, 222], [46, 246]], D));

  // ── L'œil de profil : un V couché, ouvert vers l'avant, à 10 derrière la racine du nez ──
  const OE = -4;
  const oe = pts => pts.map(([px, py]) => [px + OE, py]);
  out.push(chemin(oe([[70, 115], [76, 111], [84, 112]]), D));   // paupière supérieure
  out.push(chemin(oe([[70, 115], [76, 118.5], [82, 119]]), F));   // paupière inférieure
  if (fins) {
    out.push(chemin(oe([[81, 112.5], [79.5, 115.5], [80.5, 118.5]]), F));   // l'iris, vu de côté
    out.push(chemin(oe([[72, 108], [80, 106], [86, 108]]), F));   // pli de la paupière
  }
  out.push(chemin([[66, 101], [76, 96], [90, 98]], D));     // sourcil

  // ── Le nez, la bouche ──
  out.push(chemin([[106, 165], [99, 163.5], [97, 158.5], [101, 154], [107, 155]], D));   // aile du nez
  if (fins) out.push(chemin([[93, 169], [90, 175], [88, 181]], F));                 // pli du nez à la bouche
  out.push(chemin([[98, 186], [90, 186]], D));                            // fente de la bouche

  // ── Le cou : le sterno-cléido-mastoïdien, de derrière l'oreille vers le creux du sternum ──
  out.push(chemin([[-28, 172], [-12, 215], [10, 255], [30, 282]], F));

  return out.join('\n');
}

module.exports = (h) => ({
  ref: 'modele-tete',
  titre: 'Modèle : tête d’homme adulte, de profil',
  desc: 'Feuille de modèle : tête d’homme adulte de profil avec le cou, construite sur les proportions canoniques.',
  fichier: '_modeles-tete-adulte-construction.svg',
  format: 'pleine',
  disposition: [['tete']],
  vues: {
    tete: {
      dessin: z => {
        const e = Math.min(z.h / 300, z.l / 260);
        return dessiner(z.l / 2 - 8 * e, (z.h - 289 * e) / 2 + 4 * e, e, { construction: !!process.env.CONSTRUCTION });
      },
    },
  },
});
module.exports.dessiner = dessiner;
