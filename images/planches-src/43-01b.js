// Planche 43-01b — le caribou, sabot grandeur nature (ch. 43, §5-B ; « Les gabarits à l'échelle », §9).
// Géométrie, échelle et règle : voir 43-01a.js (K = 680 / 167,2 unités par mm).
//
// LES MESURES, toutes du chapitre (§5-B) : caribou avant 8 à 13 cm de long sur 10 à 15 cm de large ;
// arrière 7,5 à 11,5 sur 9 à 12. Plus large que long : les sabots les plus ronds des cervidés,
// deux demi-lunes creuses très écartées.
// Trait plein : le plus grand avant (130 × 150 mm). Tireté, centré dedans : le plus petit
// arrière (75 × 90 mm). Pas d'ergots : le chapitre ne dit pas où ils marquent.

const { pistes } = require('./43-01a.js');

module.exports = (h) => {
  const P = pistes(h);
  const { K, A } = P;
  const cx = 360, y0 = 118;
  const grand = P.repere({ x0: cx, y0 });
  const petit = P.repere({ x0: cx, y0: y0 + (130 - 75) / 2 * K });
  const G = ([x, y]) => grand([x * 150, y * 130]);
  const p = ([x, y]) => petit([x * 90, y * 75]);

  return {
    ref: '43-01b',
    titre: 'Le caribou, sabot grandeur nature',
    desc: 'Gabarit à l’échelle 1:1 d’une empreinte de caribou : en trait plein, le plus grand sabot avant (13 cm de long sur 15 de large), plus large que long, deux demi-lunes creuses très écartées dont le rebord seul marque ; en tireté, centré dedans, le plus petit sabot arrière (7,5 sur 9 cm). Une flèche donne le sens de la marche. Règle de 10 cm sous le dessin : la page n’est à l’échelle que si elle mesure 10 cm une fois imprimée.',
    format: 'pleine',
    vues: {
      sabot: {
        dessin: z => P.vue([
          P.sabot(P.caribouDroit, 75, 90, petit, A.tirete),
          P.sabot(P.caribouDroit, 130, 150, grand, A.plein, P.caribouRebord, h.a.detail),
          P.regle(150, 712, 'h'),
          P.marche(648, 200, 100),
        ]),
        renvois: z => [
          P.renvoi(1, [612, 90], G([0.42, 0.12]), 'le plus grand sabot avant'),
          P.renvoi(2, [70, 610], p([-0.42, 0.78]), 'le plus petit sabot arrière'),
          P.renvoi(3, [110, 110], G([-0.455, 0.28]), 'demi-lune creuse : le rebord marque'),
        ],
      },
    },
  };
};
