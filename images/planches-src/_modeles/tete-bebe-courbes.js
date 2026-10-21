// Modèle — tête de bébé de quelques mois, de profil vers la droite, encrée à la main en Bézier.
// Pas une planche du livre. dessiner(x, y, echelle) rend le SVG ; (x, y) = le conduit de l'oreille.
//
// Repères (mm, origine au conduit auditif, x vers l'avant, y vers le bas) :
//   vertex (-8,-84) · occiput (-81,-12) · bosse frontale (55,-40) · nasion (54,-10)
//   bout du nez (67,12) · sous-nasal (58,20) · lèvre sup. (61,28) · commissure (56,31)
//   lèvre inf. (58,35) · sillon mentonnier (52,42) · menton (49,51) · pli sous-menton (34,57)
//   nuque (-45,58) · œil (41,-5) · oreille : haut (-6,-9), bas (-4,22)
function dessiner(x, y, echelle) {
  const s = echelle;
  const P = (px, py) => `${(x + px * s).toFixed(1)},${(y + py * s).toFixed(1)}`;
  const d = (cmds) => cmds.map(c => c[0] === 'M' ? `M${P(c[1], c[2])}`
    : `C${P(c[1], c[2])} ${P(c[3], c[4])} ${P(c[5], c[6])}`).join(' ');
  const sil = [
    ['M', -84, 80],
    ['C', -72, 72, -63, 60, -61, 46],          // le haut du dos, rond : la nuque presque nulle
    ['C', -61, 43, -64, 41, -67, 37],          // pli sous l'occiput
    ['C', -77, 24, -82, 6, -81, -14],          // occiput
    ['C', -79, -52, -48, -84, -8, -84],        // vertex
    ['C', 28, -85, 54, -68, 57, -42],          // front bombé
    ['C', 58, -28, 56, -16, 53, -8],           // le front fuit vers le nasion
    ['C', 52.5, -5, 53, -2, 55.5, 0.5],        // nasion bas, arête plate
    ['C', 58, 2.5, 60.8, 4.5, 60.8, 7.5],      // bouton retroussé
    ['C', 60.8, 10.5, 58.5, 12, 56.5, 12.3],   // dessous du bouton
    ['C', 55.5, 13.5, 55.5, 15, 56.5, 17],     // sous-nasal
    ['C', 57.5, 19, 58, 21, 56.5, 23],         // lèvre supérieure, en moue
    ['C', 55.8, 23.6, 55, 24, 54.5, 24.2],     // commissure
    ['C', 56, 25.5, 56.5, 28, 54, 29.5],       // lèvre inférieure
    ['C', 51.5, 31, 50.5, 32, 50.8, 35],       // sillon
    ['C', 51.2, 39, 50.5, 43, 47, 45.5],       // menton fuyant, mou
    ['C', 44, 48, 39, 51, 33, 52],             // sous le menton, la graisse qui pend
    ['C', 30, 52.5, 28, 54.5, 27.5, 57],       // le pli du double menton
    ['C', 27.5, 65, 34, 73, 46, 80],           // poitrine
  ];
  const fin = `fill="none" stroke="#000" stroke-width="0.6" stroke-linecap="round" stroke-linejoin="round"`;
  const tr = (cmds, w = 0.6) => `<path d="${d(cmds)}" fill="none" stroke="#000" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
  const out = [];
  out.push(`<path d="${d(sil)} Z" fill="#fff" stroke="none"/>`);   // le fond, fermé
  out.push(tr(sil, 1.5));
  // œil, grand : paupière supérieure épaisse, iris vu de biais, paupière inférieure, cils
  out.push(tr([['M', 31.6, -8.4], ['C', 35.2, -13.2, 41.2, -12.6, 44.8, -6.6]], 0.7));
  out.push(tr([['M', 32.8, -6], ['C', 36.4, -2.4, 41.2, -2.4, 44.2, -5.4]], 0.5));
  out.push(tr([['M', 44.8, -6.6], ['C', 46, -8.4, 47.2, -9.1, 48.6, -9.4]], 0.5));
  out.push(`<path d="M${P(41.4, -10)} C${P(43.8, -9.1)} ${P(44.1, -5.3)} ${P(41.9, -3.6)} C${P(40.5, -4.6)} ${P(40.2, -8.6)} ${P(41.4, -10)} Z" fill="#000"/>`);
  // sourcil à peine
  out.push(tr([['M', 36, -18], ['C', 41, -20, 46, -19, 50, -16]], 0.5));
  // aile du nez
  out.push(tr([['M', 53.5, 6.8], ['C', 51.5, 8.2, 52, 11.5, 55.5, 11.8]], 0.6));
  // commissure qui rentre dans la joue
  out.push(tr([['M', 54.5, 24.2], ['C', 53.5, 24.4, 52.5, 24.2, 51.5, 23.5]], 0.5));
  // joue
  out.push(tr([['M', 38, 9], ['C', 46, 14, 49, 24, 46.5, 32], ['C', 45.5, 35, 44, 37, 42, 38.5]], 0.5));
  // oreille : hélix, anthélix, tragus, lobe
  out.push(tr([['M', -3, -5], ['C', -11, -8, -17, -1, -16, 9], ['C', -15, 18, -11, 25, -5, 25], ['C', -2, 25, -1, 22, -2, 19]], 0.7));
  out.push(tr([['M', -5, -1], ['C', -10, -1, -12, 7, -10.5, 12], ['C', -9.5, 15.5, -7, 17, -5, 15.5]], 0.5));
  out.push(tr([['M', -1, 2], ['C', 0.5, 3, 0.5, 6, -1, 7]], 0.5));
  // l'épaule, qui remonte presque sous l'oreille
  out.push(tr([['M', 14, 66], ['C', -6, 60, -30, 60, -46, 68], ['C', -52, 71, -56, 75, -58, 80]], 0.6));
  // plis du cou
  out.push(tr([['M', 10, 58], ['C', 16, 60, 22, 60, 27, 58]], 0.5));
  out.push(tr([['M', -52, 46], ['C', -48, 48, -44, 48, -40, 47]], 0.5));
  // cheveux : mèches courtes qui suivent le crâne, une boucle au sommet
  const meches = [   // [départ], [c1, c2, arrivée] : peu de cheveux, fins, courts, autour du tourbillon
    [[-14, -84], [-12, -90, -4, -92, 2, -88]],          // la mèche qui dépasse au sommet
    [[-4, -84], [0, -89, 8, -89, 10, -85]],
    [[-22, -74], [-17, -78, -11, -79.5, -5, -79]],       // du tourbillon vers l'avant
    [[-20, -71], [-14, -73, -8, -73, -2, -71.5]],
    [[-26, -73], [-31, -71, -35, -67, -38, -62]],        // du tourbillon vers l'arrière
    [[-30, -77], [-36, -76, -41, -73, -45, -69]],
    [[16, -74], [19, -72.5, 22, -70.5, 24, -68]],        // le duvet du front
    [[22, -76], [25, -75, 28, -73, 30, -70.5]],
  ];
  for (const [m, c] of meches) out.push(tr([['M', ...m], ['C', ...c]], 0.5));
  return out.join('\n');
}
module.exports = (h) => ({
  ref: 'modele-bebe',
  titre: 'Modèle : tête de bébé de profil',
  desc: 'Tête de bébé de quelques mois, de profil vers la droite, silhouette encrée en courbes de Bézier.',
  fichier: '_modeles-tete-bebe-courbes.svg',
  format: 'pleine',
  disposition: [['a']],
  vues: { a: { dessin: z => dessiner(z.l * 0.56, z.h * 0.48, Math.min(z.l / 170, z.h / 190)) } },
});
module.exports.dessiner = dessiner;
