// Modèle : main droite qui serre un manche vertical, vue du dos de la main (trois quarts, côté doigts).
// Pas une planche du livre. dessiner(x, y, echelle) est à porter dans formes.js.
// Reprise de prise-dos-courbes.js avec les huit corrections du juge.
// Repère en mm d'adulte : origine sur l'axe du manche, à la hauteur du pli index/majeur ; x vers les
// doigts, y vers le bas. L'avant-bras arrive de la gauche.
//
// Repères anatomiques (mm) :
//   manche Ø 32 : x = -16 … +16
//   poignet (pli) x = -88, de y = -26,5 (radial) à +33 (ulnaire)
//   avant-bras coupé à x = -150, de -33,5 à +40,5 (74)
//   replat du métacarpe du pouce (-70, -33) ; MCP du pouce (bosse) (-36, -51) ;
//   la phalange du pouce descend en biais jusqu'au manche (-16, -48)
//   bout du pouce, posé sur la 2e phalange de l'index : x 16 … 28, y -48 … -34
//   jointures MCP : index (-12, -32) · majeur (-7, -12) · annulaire (-10, 7) · auriculaire (-17, 25)
//   bouts des doigts (face presque verticale, coins r 3) : index 25 · majeur 28,5 · annulaire 25 · auriculaire 20

function dessiner(x, y, s, opt = {}) {
  const N = '#000';
  const X = v => +(x + v * s).toFixed(2), Y = v => +(y + v * s).toFixed(2);
  const pt = p => `${X(p[0])} ${Y(p[1])}`;
  const d = segs => segs.map(([c, ...ps]) => c + ps.map(pt).join(' ')).join(' ');
  const trait = ep => `fill="none" stroke="${N}" stroke-width="${ep}" stroke-linecap="round" stroke-linejoin="round"`;
  const out = [];

  // un trait qui s'amincit le long d'une cubique (e0 au départ, e1 à l'arrivée), en aplat
  const effile = (p0, p1, p2, p3, e0, e1) => {
    const n = 24, g = [], dr = [];
    for (let i = 0; i <= n; i++) {
      const t = i / n, u = 1 - t;
      const px = u*u*u*p0[0] + 3*u*u*t*p1[0] + 3*u*t*t*p2[0] + t*t*t*p3[0];
      const py = u*u*u*p0[1] + 3*u*u*t*p1[1] + 3*u*t*t*p2[1] + t*t*t*p3[1];
      const dx = 3*u*u*(p1[0]-p0[0]) + 6*u*t*(p2[0]-p1[0]) + 3*t*t*(p3[0]-p2[0]);
      const dy = 3*u*u*(p1[1]-p0[1]) + 6*u*t*(p2[1]-p1[1]) + 3*t*t*(p3[1]-p2[1]);
      const L = Math.hypot(dx, dy) || 1, w = (e0 + (e1 - e0) * t) / 2 / s;   // demi-épaisseur en mm
      g.push([px - dy / L * w, py + dx / L * w]); dr.push([px + dy / L * w, py - dx / L * w]);
    }
    const pts = g.concat(dr.reverse());
    return `<path d="M${pts.map(pt).join(' L')} Z" fill="${N}" stroke="none"/>`;
  };

  // le manche, derrière la main
  const [haut, bas] = opt.manche || [140, 140];
  out.push(`<rect x="${X(-16)}" y="${Y(-haut)}" width="${(32 * s).toFixed(1)}" height="${((haut + bas) * s).toFixed(1)}" fill="url(#h-bois)" stroke="${N}" stroke-width="1.4"/>`);

  // la silhouette : un seul chemin fermé
  const sil = d([
    ['M', [-150, -33.5]],
    ['C', [-130, -34.5], [-108, -30], [-88, -26.5]],        // dessus de l'avant-bras → poignet radial
    ['C', [-80, -27.6], [-75, -31.8], [-70, -33]],          // replat sur le métacarpe du pouce
    ['C', [-63, -34.8], [-57, -39], [-51, -44]],            // remontée vers la MCP
    ['C', [-46.5, -48], [-41.5, -51], [-36, -51]],          // bosse de la MCP du pouce
    ['C', [-29.5, -51], [-21.5, -49.5], [-16, -48]],        // la phalange descend en biais vers l'index
    ['L', [-16, -42]],                                      // le manche cache le pouce
    ['C', [-6, -42.3], [6, -42], [16, -41.5]],              // dessus de l'index, devant le manche
    ['L', [16, -48]],                                       // le bout du pouce sort de derrière le manche
    ['C', [19.5, -48.2], [23, -48.2], [25, -48]],           // dessus du bout, presque plat
    ['C', [26.8, -47.8], [28, -46.7], [28, -45]],           // coin arrondi (r 3)
    ['C', [28.1, -42], [28, -39.4], [27.6, -37.4]],         // tranche du bout du pouce
    ['C', [27.2, -35.4], [26.2, -34.2], [25.1, -33.6]],     // il se pose sur l'index
    // index : son coin du haut est sous le pouce ; face, coin du bas
    ['C', [25.2, -31], [25.1, -28.3], [24.9, -25.8]],
    ['C', [24.8, -23.8], [23.5, -22], [21, -21.5]],
    // majeur
    ['C', [24, -21.4], [26.6, -21], [27.8, -19.6]],
    ['C', [28.4, -18.9], [28.6, -18.2], [28.5, -17.3]],
    ['C', [28.5, -14.6], [28.3, -12], [28.1, -9.4]],
    ['C', [27.9, -5.8], [25.8, -2.1], [22.5, -1]],
    // annulaire
    ['C', [23.5, -0.7], [24.3, 0], [24.8, 1]],
    ['C', [25.1, 1.6], [25.1, 2.1], [25, 2.6]],
    ['C', [25, 5.3], [24.9, 8], [24.7, 10.5]],
    ['C', [24.5, 14], [22.1, 16.9], [19, 18]],
    // auriculaire
    ['C', [19.6, 18.4], [20, 19.3], [20.1, 20.3]],
    ['C', [20.1, 22.4], [20, 24.6], [19.8, 26.5]],
    ['C', [19.6, 30.6], [16.4, 34.3], [11, 34.6]],
    ['C', [2, 35.2], [-8, 35.5], [-22, 35.5]],              // dessous de l'auriculaire
    ['C', [-36, 36], [-55, 38], [-73, 36]],                 // tranche ulnaire de la main, le talon
    ['C', [-77, 35.8], [-82, 35.2], [-88, 33]],             // styloïde du cubitus : une seule bosse douce
    ['C', [-108, 35], [-130, 39.5], [-150, 40.5]],          // dessous de l'avant-bras
    ['L', [-150, -33.5]],                                   // coupe nette
  ]) + ' Z';
  out.push(`<path d="${sil}" fill="#fff" stroke="${N}" stroke-width="1.5" stroke-linejoin="round"/>`);

  // traits intérieurs (0,7)
  const det = [
    // pli du premier interosseux : sépare le pouce de l'index ; crochet de la commissure à sa racine
    [['M', [-66.4, -33.7]], ['C', [-67.6, -33.4], [-68.6, -32.6], [-68.2, -31.9]],
     ['C', [-67.6, -31], [-62, -32.6], [-56, -35.4]], ['C', [-43, -39], [-30, -40.6], [-16, -42]]],
    // séparations des doigts, de la vallée entre jointures au creux de droite
    [['M', [-14, -24]], ['C', [-2, -23.3], [10, -22.2], [21, -21.5]]],
    [['M', [-11, -4]], ['C', [1, -3.3], [12, -1.8], [22.5, -1]]],
    [['M', [-15, 14.5]], ['C', [-3, 15.6], [8, 17.2], [19, 18]]],
    // bord du bout du pouce posé sur l'index
    [['M', [16, -36]], ['C', [20, -36.2], [24, -35.8], [27, -35]]],
    // ongle du pouce vu de chant : court, presque droit, parallèle au dessus du bout
    [['M', [20, -46.5]], ['C', [22, -46.5], [24.4, -46.1], [26, -45.5]], ['C', [26.4, -45.2], [26.6, -44.8], [26.5, -44.3]]],
  ];
  det.forEach(g => out.push(`<path d="${d(g)}" ${trait(0.7)}/>`));
  const fin = [
    // têtes des jointures MCP : l'arc, le majeur le plus avancé, l'index le plus haut
    [['M', [-14, -39.5]], ['C', [-9.3, -38.3], [-7.2, -33.5], [-8, -28.5]]],
    [['M', [-8, -20]], ['C', [-2.8, -18.3], [-0.7, -13.3], [-1.5, -8.5]]],
    [['M', [-10, -0.5]], ['C', [-5.3, 1.2], [-3.2, 6.2], [-4, 11]]],
    [['M', [-16, 18]], ['C', [-11.8, 19.7], [-10.2, 24.2], [-11, 29]]],
    // pli de la MCP du pouce
    [['M', [-38.5, -50.6]], ['C', [-39.8, -48], [-39.4, -45.8], [-37.6, -44.4]]],
  ];
  fin.forEach(g => out.push(`<path d="${d(g)}" ${trait(0.6)}/>`));
  // tendons de l'index et du majeur : en éventail depuis le milieu du poignet, effilés vers la gauche
  out.push(effile([-17, -33], [-30, -28.5], [-46, -20.5], [-60, -14], 0.6, 0.12));
  out.push(effile([-11, -12.5], [-26, -9.8], [-43, -6], [-58, -3], 0.6, 0.12));
  return out.join('\n');
}

module.exports = (h) => ({
  ref: 'modele',
  titre: 'La prise, du dos de la main',
  desc: 'Modèle : main droite qui serre un manche vertical, vue du dos de la main.',
  fichier: '_modeles-prise-dos-final.svg',
  format: 'pleine',
  disposition: [['a']],
  vues: {
    a: { dessin: z => dessiner(z.l * 0.68, z.h * 0.5, 2.6, { manche: [z.h * 0.5 / 2.6 - 4, z.h * 0.5 / 2.6 - 4] }) },
  },
});
module.exports.dessiner = dessiner;
