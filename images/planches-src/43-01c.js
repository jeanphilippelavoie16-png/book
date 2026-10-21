// Planche 43-01c — le loup, pied avant grandeur nature (ch. 43, §5-D, note 2 ; « Les gabarits à
// l'échelle », §9). Géométrie, échelle et règle : voir 43-01a.js (K = 680 / 167,2 unités par mm).
//
// LES MESURES, toutes du chapitre (§5-D) : loup avant 9,5 à 14,5 cm de long sur 7 à 12,5 cm ;
// arrière nettement plus petit, 9,5 à 13 sur 6,5 à 11,5. Quatre doigts, griffes, ovale, X entre
// doigts et coussinet ; coussinet en triangle (note 2).
// Dessiné : le plus grand pied avant, 145 × 125 mm, longueur prise du bout du coussinet du doigt
// le plus avancé à l'arrière du grand coussinet, griffes en plus (§5-A, étape 6). Pied droit.
// Pas de petit pied tireté : dans une empreinte de canidé, un second contour tomberait en travers
// des coussinets et effacerait le X ; il n'y a pas la place de le poser à côté.

const { pistes } = require('./43-01a.js');

module.exports = (h) => {
  const P = pistes(h);
  const { K, A } = P;
  const cx = 372, y0 = 70;                 // le bout des deux doigts du milieu
  const T = P.repere({ x0: cx, y0 });

  // En mm, pied droit : x vers l'extérieur à droite, y vers l'arrière.
  const doigts = [
    P.ovale(-15.5, 23, 14.5, 23, -4),       // doigt du milieu, intérieur
    P.ovale(15.5, 23, 14.5, 23, 4),         // doigt du milieu, extérieur
    P.ovale(-47, 57, 15, 19.5, -16),      // doigt de côté, intérieur
    P.ovale(47, 57, 15, 19.5, 16),        // doigt de côté, extérieur
  ];
  // Le grand coussinet : un triangle aux coins ronds, pointe vers l'avant, trois lobes derrière.
  const coussinet = [
    [0, 67.5], [10, 70], [21, 80], [30.5, 96], [37.5, 114], [36.5, 130], [27, 141.5], [17, 139.5],
    [8, 144.6], [-8, 144.6], [-17, 139.5], [-27, 141.5], [-36.5, 130], [-37.5, 114], [-30.5, 96], [-21, 80], [-10, 70],
  ];
  const griffes = [
    [[-14.5, 0.5], [-13.5, -9]], [[14.5, 0.5], [13.5, -9]],
    [[-53, 39.5], [-56, 30.5]], [[53, 39.5], [56, 30.5]],
  ];
  // Le X : deux lignes par les vides, entre les doigts et le coussinet.
  const X = [[[-29, 48], [29, 64]], [[29, 48], [-29, 64]]];   // presque à plat, bouts dans le vide

  return {
    ref: '43-01c',
    titre: 'Le loup, pied avant grandeur nature',
    desc: 'Gabarit à l’échelle 1:1 du plus grand pied avant de loup, 14,5 cm de long sur 12,5 de large : quatre doigts dont les deux du milieu en avant, une griffe marquée devant chaque doigt, le grand coussinet en triangle, pointe en avant ; en tireté fin, le X qu’on trace dans les vides entre les doigts et le coussinet. Pied droit. Une flèche donne le sens de la marche. Règle de 10 cm dans la marge : la page n’est à l’échelle que si elle mesure 10 cm une fois imprimée.',
    format: 'pleine',
    vues: {
      pied: {
        dessin: z => P.vue([
          ...X.map(([a, b]) => h.path(`M${T(a).map(P.f).join(' ')} L${T(b).map(P.f).join(' ')}`, A.tireteFin)),
          ...doigts.map(d => h.path(P.courbe(d, T), A.pleinBlanc)),
          h.path(P.courbe(coussinet, T), A.pleinBlanc),
          ...griffes.map(([b, p]) => h.path(P.griffe(b, p, 4.5, T), A.noir)),
          P.regle(14, 60, 'v'),
          P.marche(655, 240, 140),
        ]),
        renvois: z => [
          P.renvoi(1, [560, 50], T([13.8, -6]), 'griffe : elle marque'),
          P.renvoi(2, [150, 165], T([-20, 50.5]), 'le X, entre doigts et coussinet'),
          P.renvoi(3, [610, 610], T([36.5, 124]), 'grand coussinet en triangle'),
        ],
      },
    },
  };
};
