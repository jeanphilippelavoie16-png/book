// Planche 43-01d — l'ours noir, pied avant grandeur nature (ch. 43, §5-C ; « Les gabarits à
// l'échelle », §9). Géométrie, échelle et règle : voir 43-01a.js (K = 680 / 167,2 unités par mm).
//
// LES MESURES, toutes du chapitre (§5-C) : avant large et court, le petit talon rond marque
// rarement : jusqu'à 15 cm de large, et jusqu'à 20 cm de long quand le talon marque. Cinq doigts,
// le plus petit à l'intérieur, à l'inverse du pied humain ; griffes pas toujours visibles.
// Dessiné : le plus grand, 150 mm de large, 200 mm du bout du doigt le plus avancé à l'arrière du
// petit talon (tireté : il marque rarement). Pied droit : l'intérieur est à gauche.
//
// LA PLACE. 200 mm plus les griffes, c'est plus de 840 unités pour une page qui en a 826. Le pied est
// donc tourné de 13° la pointe vers l'intérieur — c'est ainsi que l'ours pose ses pieds avant —
// et le petit talon descend à droite, à côté de la légende. La flèche de la marche reste droite :
// on voit l'écart entre le sens du pied et le sens de la marche.

const { pistes } = require('./43-01a.js');

module.exports = (h) => {
  const P = pistes(h);
  const { A } = P;
  const T = P.repere({ x0: 271, y0: 61, a: -13 });

  // En mm, pied droit : x vers l'extérieur (à droite), y vers l'arrière. [cx, cy, rx, ry, rotation]
  const doigts = [
    [-58, 38, 10, 12, -24],          // le plus petit, à l'intérieur
    [-32, 22, 12, 14, -12],
    [-4.5, 15, 13, 15, -3],
    [22.5, 15.5, 13, 15, 6],
    [50, 23, 13, 15, 16],            // le doigt extérieur
  ];
  // Le grand coussinet : large et court, bord avant bombé, bout intérieur plus étroit.
  const coussinet = [
    [-62, 64], [-47, 51.5], [-26, 44], [-2, 40.5], [24, 41], [48, 46], [66, 56], [75.5, 70], [77, 86],
    [71, 100], [55, 108.5], [28, 112], [0, 112], [-28, 109], [-52, 103.5], [-67, 95], [-73, 80],
  ];
  const talon = P.ovale(34, 180, 16.5, 20, 0);   // arrière à 200 mm du bout des doigts
  const bout = ([cx, cy, , ry, rot], d) => { const r = rot * Math.PI / 180; return [cx + (ry + d) * Math.sin(r), cy - (ry + d) * Math.cos(r)]; };

  return {
    ref: '43-01d',
    titre: 'L’ours noir, pied avant grandeur nature',
    desc: 'Gabarit à l’échelle 1:1 du plus grand pied avant d’ours noir, pied droit : 15 cm de large, 20 cm de long quand le talon marque. Cinq doigts en arc, le plus petit à l’intérieur (à gauche), une courte griffe devant chacun ; le grand coussinet large et court ; derrière, à l’extérieur, le petit talon rond en tireté parce qu’il marque rarement. Le pied est tourné la pointe vers l’intérieur, comme l’ours le pose ; la flèche donne le sens de la marche. Règle de 10 cm sous le dessin : la page n’est à l’échelle que si elle mesure 10 cm une fois imprimée.',
    format: 'pleine',
    vues: {
      pied: {
        dessin: z => P.vue([
          ...doigts.map(d => h.path(P.courbe(P.ovale(...d), T), A.pleinBlanc)),
          h.path(P.courbe(coussinet, T), A.pleinBlanc),
          h.path(P.courbe(talon, T), A.tirete),
          ...doigts.map(d => h.path(P.griffe(bout(d, 1), bout(d, 7.5), 4.2, T), A.noir)),
          P.regle(52, 694, 'h'),
          P.marche(640, 215, 115),
        ]),
        renvois: z => [
          P.renvoi(1, [62, 128], T([-60, 26.5]), 'le plus petit doigt, à l’intérieur'),
          P.renvoi(2, [612, 60], T(bout(doigts[4], 5)), 'griffes : pas toujours visibles'),
          P.renvoi(3, [520, 600], T([22.5, 167]), 'petit talon rond : marque rarement'),
        ],
      },
    },
  };
};
