// Modèle : main droite qui serre un manche vertical, vue côté paume.
// Feuille de modèle, pas une planche du livre. Le dessin est la fonction dessiner(),
// écrite pour être portée telle quelle dans formes.js.
//
// Repère : millimètres d'une main d'adulte, origine au centre du manche à mi-prise,
// x vers la droite (le poignet est à droite), y vers le bas. Manche de 32 mm.
// La paume regarde l'œil ; le manche est posé dans la paume, les doigts passent DEVANT
// lui (on voit le dos de leurs phalanges moyennes) et leurs bouts reviennent s'appuyer
// dans la paume ; le pouce vient par-dessus, en travers de l'index et du majeur.
//
// Repères anatomiques (mm) :
//   poignet (pli)          x 66, de y -32 (côté pouce) à y 30 (côté auriculaire) : 62 de large
//   avant-bras coupé à x 119, presque droit (il ne s'élargit que plus haut, vers le coude)
//   tête du 1er métacarpien (MCP du pouce)   (27, -50), bord radial à peu près droit jusqu'au poignet
//   articulation du pouce (IP)               (-2, -38)
//   bout du pouce                            (-24, -20), posé sur la phalange moyenne du majeur
//   articulations moyennes (IPP), bord gauche du poing :
//     index (-37, -33) · majeur (-40, -12) · annulaire (-38, 8) · auriculaire (-31, 26)
//   bandes des doigts (haut / bas) : index -45/-23 · majeur -23/-1 · annulaire -1/19 · auriculaire 19/35
//   bouts des doigts dans la paume : majeur (20, -10) · annulaire (20, 8) · auriculaire (18, 27)
//   éminence thénar : bornée par le pli qui prolonge le dessous du pouce, (22,-26) → (48,25)
//   éminence hypothénar : bord inférieur, bombé jusqu'à y 42 vers x 30
//   poing, des IPP au pli du poignet : 106 ; hauteur du poing (pouce compris) : 92
//   main ouverte, du poignet au bout du majeur : 190 (paume 105, majeur 85)

function dessiner(x, y, echelle = 1) {
  const k = echelle;
  const P = (px, py) => `${(x + px * k).toFixed(1)} ${(y + py * k).toFixed(1)}`;
  // une suite de courbes : départ, puis [c1, c2, point] en mm
  const courbe = (depart, segs) => (typeof segs[0][0] === "number" && (segs = [segs]), `M ${P(...depart)} ` + segs.map(([a, b, c]) => `C ${P(...a)} ${P(...b)} ${P(...c)}`).join(' '));
  const N = '#000';
  const sil = `fill="#fff" stroke="${N}" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"`;
  const det = `fill="none" stroke="${N}" stroke-width="0.7" stroke-linejoin="round" stroke-linecap="round"`;
  const fin = `fill="none" stroke="${N}" stroke-width="0.5" stroke-linecap="round"`;
  const blanc = `fill="#fff" stroke="none"`;

  // ── 1. La silhouette : un seul chemin, de l'avant-bras (haut) autour du poing jusqu'à
  //       l'avant-bras (bas). Ouvert à droite : l'avant-bras sort du dessin.
  const silhouette = courbe([119, -34], [
    [[102, -32], [80, -32], [68, -32]],           // avant-bras, bord du pouce, jusqu'au poignet
    [[57, -33], [41, -46], [27, -50]],            // bord du 1er métacarpien, monte à la MCP du pouce
    [[14, -53], [2, -50], [-6, -46]],             // dessus du pouce, qui passe par-dessus l'index
    [[-14, -45], [-24, -46], [-30, -45]],         // dessus de l'index
    [[-35, -44], [-37, -39], [-37, -33]],         // IPP de l'index
    [[-37, -27], [-36, -24], [-34, -23]],
    [[-38, -22], [-40, -17], [-40, -12]],         // IPP du majeur, la plus à gauche
    [[-40, -6], [-38, -3], [-36, -2]],
    [[-38, -1], [-38, 3], [-38, 8]],              // IPP de l'annulaire
    [[-38, 13], [-36, 17], [-33, 18]],
    [[-32, 20], [-31, 22], [-31, 26]],            // IPP de l'auriculaire, plus courte, plus bas
    [[-31, 31], [-28, 34], [-23, 34]],
    [[-10, 34], [2, 35], [12, 36]],               // dessous de l'auriculaire
    [[18, 37], [22, 42], [29, 42]],               // naissance de l'hypothénar
    [[44, 41], [58, 31], [68, 30]],               // hypothénar jusqu'au poignet
    [[78, 29], [102, 30], [119, 31]],            // avant-bras, bord de l'auriculaire
  ]);

  // ── 2. Les doigts, sous le pouce : séparations, bouts dans la paume, plis.
  const doigts = [
    courbe([-34, -23], [[-31, -23], [-28, -23], [-25, -23]]),              // index / majeur, jusqu'au pouce
    courbe([-36, -2], [[-20, -1], [0, -1], [14, -1]]),                    // majeur / annulaire
    courbe([-33, 18], [[-18, 19], [0, 19], [12, 19]]),                    // annulaire / auriculaire
    courbe([4, -23], [[14, -21], [21, -10], [14, -1]]),                   // bout du majeur
    courbe([14, -1], [[20, 1], [21, 14], [12, 19]]),                      // bout de l'annulaire
    courbe([12, 19], [[17, 21], [18, 32], [12, 36]]),                     // bout de l'auriculaire
  ].map(d => `<path d="${d}" ${det}/>`);
  const plis = [
    courbe([-29, -18], [[-30, -15], [-30, -10], [-29, -7]]),              // IPP du majeur
    courbe([-29, 2], [[-30, 5], [-30, 10], [-29, 13]]),                   // IPP de l'annulaire
    courbe([-24, 22], [[-25, 25], [-25, 28], [-24, 31]]),                 // IPP de l'auriculaire
    courbe([4, -16], [[3, -13], [3, -9], [4, -6]]),                       // IPD du majeur
    courbe([5, 3], [[4, 6], [4, 10], [5, 13]]),                           // IPD de l'annulaire
    courbe([3, 22], [[2, 25], [2, 28], [3, 31]]),                         // IPD de l'auriculaire
  ].map(d => `<path d="${d}" ${fin}/>`);

  // ── 3. Le pouce, posé par-dessus : un aplat blanc qui cache les doigts, puis son bord.
  const poucePlein = courbe([-6, -46], [
    [[-12, -40], [-18, -33], [-22, -28]],
    [[-27, -22], [-25, -16], [-20, -16]],
    [[-12, -16], [-4, -21], [4, -25]],
    [[10, -28], [16, -29], [22, -26]],
    [[29, -36], [29, -46], [27, -50]],
    [[14, -53], [2, -50], [-6, -46]],
  ]) + ' Z';
  const pouceBord = courbe([-6, -46], [
    [[-12, -40], [-18, -33], [-22, -28]],
    [[-27, -22], [-25, -16], [-20, -16]],
    [[-12, -16], [-4, -21], [4, -25]],
    [[10, -28], [16, -29], [22, -26]],
  ]);
  const ongle = courbe([-23, -24], [[-21, -28], [-18, -32], [-14, -33]]) + ' '      // bord de l'ongle
    + courbe([-14, -33], [[-11, -30], [-12, -25], [-17, -21]]);                      // et sa lunule
  const pliPouce = courbe([-4, -44], [[-1, -42], [1, -39], [1, -36]]);

  // ── 4. La paume : le pli du thénar, les plis du poignet.
  const paume = [
    courbe([22, -26], [[30, -18], [41, 2], [48, 25]]),                   // pli du thénar, suite du bord du pouce
    courbe([63, -20], [[65, -10], [65, 6], [63, 16]]),                    // pli du poignet
  ].map(d => `<path d="${d}" ${fin}/>`);

  return [
    `<path d="${silhouette}" ${sil.replace('stroke="#000"', 'stroke="none"')}/>`,
    ...doigts, ...plis,
    `<path d="${poucePlein}" ${blanc}/>`,
    `<path d="${pouceBord}" ${det.replace('0.7', '1.1')}/>`,
    `<path d="${ongle}" ${fin}/>`, `<path d="${pliPouce}" ${fin}/>`,
    ...paume,
    `<path d="${silhouette}" ${sil.replace('fill="#fff"', 'fill="none"')}/>`,
  ].join('\n');
}

module.exports = (h) => ({
  ref: 'modele',
  titre: 'Modèle : la prise côté paume',
  desc: 'Feuille de modèle : main droite qui serre un manche vertical, vue côté paume, en grand.',
  fichier: '_modeles-prise-paume-courbes.svg',
  format: 'pleine',
  disposition: [['a']],
  vues: {
    a: {
      dessin: z => {
        const k = Math.min((z.l - 40) / 160, (z.h - 40) / 105);
        const x = z.l * 0.5 - 40 * k, y = z.h * 0.5;
        const r = 16 * k;
        return [
          h.rect(x - r, 10, 2 * r, z.h - 20, h.a.hachure('bois', 'arete')),
          dessiner(x, y, k),
        ].join('\n');
      },
    },
  },
});
module.exports.dessiner = dessiner;
