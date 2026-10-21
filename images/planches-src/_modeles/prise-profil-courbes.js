// Modèle : main droite qui serre un manche vu par le bout, vue de profil côté pouce.
// Pas une planche du livre. dessiner(x, y, echelle) est à porter dans formes.js.
// Repère en mm d'adulte : origine au centre du manche ; x vers les jointures, y vers le bas
// (dos de la main en haut, paume en bas). L'avant-bras arrive de la gauche.
// a(deg, r) : un point à l'angle deg (0 = devant, 90 = dessous) et à r mm du centre du manche.
//
// Repères anatomiques (mm) :
//   manche Ø 34 : cercle de centre (0, 0), r 17 ; la paume le touche par-dessus
//   poignet (pli) x = -66, de y = -38 (dos) à +2 (paume) : 40 ; avant-bras coupé à x = -160 (58)
//   dos de la main : droit du poignet à la jointure de l'index, sommet (8, -43)
//   index, axe à r 27 autour du manche : MCP a(-80) · IPP a(8) · IPD a(62) · bout a(100)
//     phalanges 42 · 25 · 18, épaisseur 20 → 16 ; bord extérieur à r 36-37, coins aux jointures
//   majeur et annulaire derrière l'index : leur IPP dépasse de 3 puis 5 mm (l'escalier)
//   pouce : base au poignet (-58, -4) · MCP (-27, 30) · IP a(85, 29) · bout a(38, 26)
//     largeur 22 → 18 ; il couvre la 2e phalange de l'index, le bout vise l'IPP
//   ongle du pouce : sur le dernier tiers, côté extérieur

function dessiner(x, y, s, opt = {}) {
  const N = '#000';
  const X = v => +(x + v * s).toFixed(1), Y = v => +(y + v * s).toFixed(1);
  const pt = p => `${X(p[0])} ${Y(p[1])}`;
  const d = segs => segs.map(([c, ...ps]) => c + ps.map(pt).join(' ')).join(' ');
  const trait = ep => `fill="none" stroke="${N}" stroke-width="${ep}" stroke-linecap="round" stroke-linejoin="round"`;
  const out = [];

  // la silhouette : un seul chemin, ouvert à la coupe de l'avant-bras
  const sil = [
    ['M', [-160, -45]],
    ['C', [-125, -45], [-95, -41.5], [-66, -40]],          // dessus de l'avant-bras → poignet
    ['C', [-45, -40], [-15, -41.5], [4, -43]],           // dos de la main, droit
    ['C', [8, -45], [13, -45.5], [18, -45]],             // jointure du majeur, derrière
    ['C', [23, -44.8], [27, -42.4], [28.6, -39.4]],      // jointure de l'index
    ['C', [31.2, -32], [35.8, -15], [38, -3.5]],         // première phalange de l'index
    ['C', [40.5, -1], [42, 3], [42, 8]],                 // IPP du majeur, qui dépasse : 1re marche
    ['C', [42, 13], [40.5, 17], [38.5, 20]],
    ['L', [35, 25]],                                     // 2e phalange du majeur
    ['C', [36.8, 26.5], [36.8, 29.5], [34.5, 32]],       // IPP de l'annulaire : 2e marche
    ['C', [30, 36], [24, 38.5], [16, 40]],               // dessous des doigts repliés
    ['C', [10, 41], [4, 41], [-2, 40.5]],                // sous le pouce
    ['C', [-12, 40], [-22, 39], [-31, 35.5]],            // sous la MCP du pouce
    ['C', [-44, 30.5], [-60, 22], [-70, 13]],            // l'éminence du pouce, pleine
    ['C', [-74.5, 10], [-79, 8.5], [-86, 8.5]],          // le pli du poignet
    ['C', [-110, 9], [-135, 13], [-160, 16]],            // dessous de l'avant-bras
  ];
  out.push(`<path d="${d(sil)} Z" fill="#fff" stroke="none"/>`);
  out.push(`<path d="${d(sil)}" ${trait(1.5)}/>`);

  const fin = (segs, ep = 0.6) => out.push(`<path d="${d(segs)}" ${trait(ep)}/>`);
  // index : coin de l'IPP et bord de la 2e phalange, jusqu'au bout du pouce
  fin([['M', [38, -3.5]], ['C', [39.5, 1], [39.5, 6.5], [37.5, 10.5]], ['L', [34.2, 15.5]]], 1.0);
  // majeur : le bord de sa 2e phalange, jusqu'au pouce
  fin([['M', [35, 25]], ['L', [31.5, 28.5]]], 0.7);
  // index : le doigt sort de la main sous la jointure
  fin([['M', [15, -45]], ['C', [12, -36], [9.5, -26], [8, -15]]], 0.6);
  // pli de l'IPP, côté pouce
  fin([['M', [33.5, -5]], ['C', [35.5, -2], [35.5, 2], [34, 5.5]]], 0.5);
  // pouce : de la base de la paume au poignet, par-dessus l'index replié ; le bout vise l'IPP
  fin([['M', [-60, -12]], ['C', [-52, -4], [-42, 6], [-30, 12]]], 0.6);   // métacarpe du pouce, fondu dans la main
  fin([['M', [-30, 12]], ['C', [-26, 13.8], [-22, 14], [-18, 15]], ['C', [-12, 16.8], [-8, 17.5], [-4, 17.5]],                      // MCP et première phalange
       ['C', [4, 17.5], [10, 16.5], [16, 14.8]],                       // IP
       ['C', [21, 13.3], [26, 12], [30, 12.5]],                        // dernière phalange, sous l'ongle
       ['C', [33.5, 13], [35, 17.5], [33.5, 22]],                      // le bout
       ['C', [31.5, 27], [27, 31], [20, 35]],                          // la pulpe, posée sur les doigts
       ['C', [14, 38], [8, 39.7], [2, 40.6]]], 1.0);
  // ongle, de côté : le bord libre au bout, la racine vers l'IP
  fin([['M', [17, 17]], ['C', [21, 15], [26, 14], [31.5, 14.6]], ['C', [28, 17.5], [22, 19.5], [17.5, 19.8]],
       ['C', [16.3, 19.6], [16.2, 18], [17, 17]]]);
  // pli de l'IP du pouce
  fin([['M', [9, 21.5]], ['C', [10.5, 26], [10.5, 31], [9, 36]]], 0.5);

  // le bout du manche, devant la main
  out.push(`<circle cx="${X(0)}" cy="${Y(0)}" r="${(17 * s).toFixed(1)}" fill="url(#h-bois)" stroke="${N}" stroke-width="1.4"/>`);
  return out.join('\n');
}

module.exports = (h) => ({
  ref: 'modele',
  titre: 'La prise, de profil',
  desc: 'Modèle : main droite qui serre un manche vu par le bout, vue de profil côté pouce.',
  fichier: '_modeles-prise-profil-courbes.svg',
  format: 'pleine',
  disposition: [['a']],
  vues: {
    a: { dessin: z => dessiner(z.l - 46 * 2.9, z.h * 0.45, 2.9) },
  },
});
module.exports.dessiner = dessiner;
