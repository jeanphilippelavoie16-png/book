// Planche 43-01e — l'ours noir, pied arrière grandeur nature (ch. 43, §5-C ; « Les gabarits à
// l'échelle », §9). Géométrie, échelle et règle : voir 43-01a.js (K = 680 / 167,2 unités par mm).
//
// LES MESURES, toutes du chapitre (§5-C) : arrière comme un pied humain élargi, talon entier :
// 14 à 22,5 cm de long sur 9 à 15 cm. Cinq doigts, le plus petit à l'intérieur, à l'inverse du
// pied humain ; griffes pas toujours visibles. Longueur prise talon compris (§5-A, étape 6).
// Dessiné : le plus grand, 225 × 150 mm. Pied droit : l'intérieur est à gauche.
//
// LA PLACE. 225 mm plus les griffes, c'est 950 unités pour une page qui en a 826, et tourner le
// pied n'y change rien : il est long et étroit. La vue est donc interrompue, comme un plan de
// pièce trop longue : 65 mm du milieu de la plante, là où le bord est presque droit, sont retirés
// entre deux traits de coupure. Les doigts, la largeur à la plante et le talon restent à 1:1 ;
// la longueur vraie est dans la légende, en chiffre du chapitre.

const { pistes } = require('./43-01a.js');

module.exports = (h) => {
  const P = pistes(h);
  const { K, A, f } = P;
  const Ox = 346, Oy = 46;
  const coupe1 = 110, coupe2 = 175, retrait = 60;      // mm : on retire de 110 à 175, il reste 5 mm d'écart
  const T = P.repere({ x0: Ox, y0: Oy });
  const T2 = P.repere({ x0: Ox, y0: Oy - retrait * K });
  const yC1 = Oy + coupe1 * K, yC2 = Oy + (coupe2 - retrait) * K;

  const doigts = [
    [-58, 29.5, 9.5, 11.5, -20],       // le plus petit, à l'intérieur
    [-31, 19, 11.5, 13.5, -10],
    [-4, 13.5, 12.5, 13.5, -2],
    [23, 14.5, 12.5, 14, 6],
    [50, 21, 12.5, 14, 15],        // le doigt extérieur
  ];
  // La plante : large sous les doigts, le bord extérieur presque droit, le talon entier et rond.
  const plante = [
    [-66, 52], [-48, 43], [-25, 37.5], [0, 35], [26, 36], [51, 39.5], [68, 46.5], [76.5, 58], [77.5, 76],
    [75.5, 100], [71, 130], [65, 160], [59, 185], [49, 205], [33, 219], [12, 225], [-10, 224.5],
    [-28, 219], [-40, 207], [-46, 188], [-50, 162], [-55, 135], [-61, 108], [-67, 84], [-71.5, 65],
  ];
  const bout = ([cx, cy, , ry, rot], d) => { const r = rot * Math.PI / 180; return [cx + (ry + d) * Math.sin(r), cy - (ry + d) * Math.cos(r)]; };
  // Un trait de coupure : droit, avec un Z au milieu.
  const coupure = (y, xg, xd) => {
    const xm = (xg + xd) / 2;
    return h.chemin([[xg, y], [xm - 7, y], [xm - 2.5, y - 8], [xm + 2.5, y + 8], [xm + 7, y], [xd, y]], h.a.arete);
  };

  return {
    ref: '43-01e',
    titre: 'L’ours noir, pied arrière grandeur nature',
    desc: 'Gabarit à l’échelle 1:1 du plus grand pied arrière d’ours noir, pied droit : 22,5 cm de long sur 15 de large. Cinq doigts en arc, le plus petit à l’intérieur (à gauche), une courte griffe devant chacun ; la plante d’un seul tenant comme un pied humain élargi, talon entier. Le milieu de la plante est retiré entre deux traits de coupure pour que le pied tienne sur la page : doigts, largeur et talon sont à 1:1, la longueur vraie est dans la légende. Une flèche donne le sens de la marche. Règle de 10 cm dans la marge : la page n’est à l’échelle que si elle mesure 10 cm une fois imprimée.',
    format: 'pleine',
    vues: {
      pied: {
        dessin: z => P.vue([
          `<clipPath id="pl43e-haut"><rect x="0" y="0" width="680" height="${f(yC1)}"/></clipPath>`,
          `<clipPath id="pl43e-bas"><rect x="0" y="${f(yC2)}" width="680" height="${f(826 - yC2)}"/></clipPath>`,
          `<g clip-path="url(#pl43e-haut)">${h.path(P.courbe(plante, T), A.plein)}</g>`,
          `<g clip-path="url(#pl43e-bas)">${h.path(P.courbe(plante, T2), A.plein)}</g>`,
          coupure(yC1, Ox - 66 * K, Ox + 80 * K),
          coupure(yC2, Ox - 53 * K, Ox + 67 * K),
          ...doigts.map(d => h.path(P.courbe(P.ovale(...d), T), A.pleinBlanc)),
          ...doigts.map(d => h.path(P.griffe(bout(d, 1), bout(d, 6.5), 4, T), A.noir)),
          P.regle(8, 300, 'v'),
          P.marche(650, 640, 540),
        ]),
        renvois: z => [
          P.renvoi(1, [60, 232], T([-66.5, 31]), 'le plus petit doigt, à l’intérieur'),
          P.renvoi(2, [575, 700], T2([30, 219.5]), 'talon entier'),
          P.renvoi(3, [100, 570], [Ox - 56 * K, yC1], 'raccourci ici : pied de 22,5 cm'),
        ],
      },
    },
  };
};
