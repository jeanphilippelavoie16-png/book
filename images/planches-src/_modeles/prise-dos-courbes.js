// Modèle : main droite qui serre un manche vertical, vue du dos de la main (trois quarts, côté doigts).
// Pas une planche du livre. dessiner(x, y, echelle) est à porter dans formes.js.
// Repère en mm d'adulte : origine sur l'axe du manche, à la hauteur du pli index/majeur ; x vers les
// doigts, y vers le bas. L'avant-bras arrive de la gauche.
//
// Repères anatomiques (mm) :
//   manche Ø 32 : x = -16 … +16
//   poignet (pli) x = -88, de y = -25 (radial) à +33 (ulnaire) : 58 de large
//   avant-bras coupé à x = -150, de -33,5 à +40,5 (74)
//   MCP du pouce (bosse) (-40, -50) ; le pouce passe derrière le manche à y -53 … -42
//   bout du pouce visible à droite du manche, posé sur la 2e phalange de l'index : (16…25, -51…-42)
//   jointures MCP : index (-12, -32) · majeur (-7, -12) · annulaire (-10, 7) · auriculaire (-17, 25)
//   bandes des doigts (largeur) : index -42…-22 (20) · majeur -22…-2 (20) · annulaire -2…17 (19) · auriculaire 17…33 (16)
//   bout de la courbe (IPP) à droite : index 28 · majeur 32 · annulaire 28 · auriculaire 21

function dessiner(x, y, s, opt = {}) {
  const N = '#000';
  const X = v => +(x + v * s).toFixed(1), Y = v => +(y + v * s).toFixed(1);
  const pt = p => `${X(p[0])} ${Y(p[1])}`;
  const d = segs => segs.map(([c, ...ps]) => c + ps.map(pt).join(' ')).join(' ');
  const trait = ep => `fill="none" stroke="${N}" stroke-width="${ep}" stroke-linecap="round" stroke-linejoin="round"`;
  const out = [];

  // le manche, derrière la main
  const [haut, bas] = opt.manche || [140, 140];
  out.push(`<rect x="${X(-16)}" y="${Y(-haut)}" width="${(32 * s).toFixed(1)}" height="${((haut + bas) * s).toFixed(1)}" fill="url(#h-bois)" stroke="${N}" stroke-width="1.4"/>`);

  // la silhouette : un seul chemin fermé
  const sil = d([
    ['M', [-150, -33.5]],
    ['C', [-130, -34.5], [-108, -30], [-88, -26.5]],        // dessus de l'avant-bras → poignet radial
    ['C', [-78, -26], [-67, -35], [-56, -44.5]],          // le long du métacarpe du pouce
    ['C', [-49, -49.5], [-42, -53.5], [-34, -54]],        // bosse de la MCP du pouce
    ['C', [-27, -54.5], [-21, -54.5], [-16, -54]],        // phalange du pouce, jusqu'au manche
    ['L', [-16, -42]],                                    // le manche cache le pouce
    ['C', [-6, -42.3], [6, -42], [16, -41.5]],            // dessus de l'index, devant le manche
    ['L', [16, -54.5]],
    ['C', [22, -55.5], [28.5, -53], [30, -48]],           // bout du pouce, posé sur l'index
    ['C', [31, -44], [29.5, -40], [26.5, -38.8]],
    ['C', [28.6, -36.5], [29.3, -32], [29.2, -28.5]],     // IPP de l'index
    ['C', [29.1, -24.5], [27.5, -21.8], [23.5, -21.5]],
    ['C', [29.5, -20.5], [32.6, -16.5], [32.6, -11]],     // IPP du majeur
    ['C', [32.6, -5.5], [30.2, -1.6], [25.5, -1]],
    ['C', [28.6, 0.8], [29.2, 5], [29.1, 8.5]],           // IPP de l'annulaire
    ['C', [29, 13], [26.2, 17.5], [21, 18]],
    ['C', [22.8, 20.5], [23.2, 24.5], [22.7, 27.5]],      // IPP de l'auriculaire
    ['C', [22.2, 31.5], [19.5, 34.2], [14, 34.5]],
    ['C', [4, 35], [-8, 35.5], [-22, 35.5]],              // dessous de l'auriculaire
    ['C', [-36, 36], [-55, 38], [-73, 36]],               // tranche ulnaire de la main, le talon
    ['C', [-79, 35.2], [-83, 36.8], [-88, 34]],           // styloïde du cubitus
    ['C', [-108, 36], [-130, 39.5], [-150, 40.5]],            // dessous de l'avant-bras
    ['L', [-150, -33.5]],                                   // coupe nette
  ]) + ' Z';
  out.push(`<path d="${sil}" fill="#fff" stroke="${N}" stroke-width="1.5" stroke-linejoin="round"/>`);

  // traits intérieurs
  const det = [
    // bord radial de l'index devant le pouce (bosse du premier interosseux)
    [['M', [-60, -37.5]], ['C', [-50, -40.5], [-34, -43.5], [-16, -42]]],
    // séparations des doigts, de la vallée entre jointures au creux de droite (légère pente)
    [['M', [-14, -24]], ['C', [-2, -23.3], [12, -22.2], [23.5, -21.5]]],
    [['M', [-11, -4]], ['C', [1, -3.3], [14, -1.8], [25.5, -1]]],
    [['M', [-15, 14.5]], ['C', [-3, 15.6], [9, 17.2], [21, 18]]],
    // ongle du pouce, vu de chant
    [['M', [20, -54]], ['C', [24, -54], [27.5, -51.5], [28.3, -48]], ['C', [28.6, -46], [28, -44.5], [27, -44]]],
  ];
  det.forEach(g => out.push(`<path d="${d(g)}" ${trait(0.7)}/>`));
  const fin = [
    // têtes des jointures MCP : l'arc, le majeur le plus avancé, l'index le plus haut
    [['M', [-14, -39.5]], ['C', [-9.5, -38.5], [-7.5, -34.5], [-8, -30.5]]],
    [['M', [-8, -20]], ['C', [-3, -18.5], [-1, -14.5], [-1.5, -10.5]]],
    [['M', [-10, -0.5]], ['C', [-5.5, 1], [-3.5, 5], [-4, 9]]],
    [['M', [-16, 18]], ['C', [-12, 19.5], [-10.5, 23], [-11, 27]]],
    // pli de la MCP du pouce
    [['M', [-37, -53.8]], ['C', [-38.5, -50.8], [-38, -48.3], [-36, -46.8]]],
    // tendons de l'index et du majeur, à peine, près des jointures
    [['M', [-52, -28]], ['C', [-40, -29.5], [-30, -31.5], [-17, -33]]],
    [['M', [-50, -11]], ['C', [-37, -11.5], [-26, -12.5], [-11, -12.5]]],
  ];
  fin.forEach(g => out.push(`<path d="${d(g)}" ${trait(0.5)}/>`));
  return out.join('\n');
}

module.exports = (h) => ({
  ref: 'modele',
  titre: 'La prise, du dos de la main',
  desc: 'Modèle : main droite qui serre un manche vertical, vue du dos de la main.',
  fichier: '_modeles-prise-dos-courbes.svg',
  format: 'pleine',
  disposition: [['a']],
  vues: {
    a: { dessin: z => dessiner(z.l * 0.68, z.h * 0.5, 2.6, { manche: [z.h * 0.5 / 2.6 - 4, z.h * 0.5 / 2.6 - 4] }) },
  },
});
module.exports.dessiner = dessiner;
