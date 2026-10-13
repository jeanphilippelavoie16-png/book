// Modèle — tête de bébé de quelques mois, de profil vers la droite, encrée à la main en Bézier.
// Pas une planche du livre. dessiner(x, y, echelle) rend le SVG ; (x, y) = le conduit de l'oreille.
// Reprise de tete-bebe-courbes.js avec les huit corrections du juge.
//
// Repères (mm, origine au conduit auditif, x vers l'avant, y vers le bas) :
//   vertex (-8,-84) · occiput (-82,-11) · bosse frontale (58,-34) · nasion (53,-8)
//   bout du nez (59,7.5) · sous-nasal (56.5,17) · lèvre sup. (56.5,23) · commissure (54.5,24.2)
//   menton (47,45.5) · pli sous-menton (27.5,57) · pli de nuque (-61,46) · bas du buste y = 72
//   œil (41,-7) · oreille pivotée de 12° autour de (-8,10), le haut vers l'arrière
function dessiner(x, y, echelle) {
  const s = echelle;
  const P = (px, py) => `${(x + px * s).toFixed(1)},${(y + py * s).toFixed(1)}`;
  const d = (cmds) => cmds.map(c => c[0] === 'M' ? `M${P(c[1], c[2])}`
    : `C${P(c[1], c[2])} ${P(c[3], c[4])} ${P(c[5], c[6])}`).join(' ');
  const sil = [
    ['M', -84, 72],
    ['C', -73, 66, -63, 58, -61, 46],          // le haut du dos, rond : la nuque presque nulle
    ['C', -60, 42, -64.5, 40, -67, 37],          // pli sous l'occiput
    ['C', -75, 28, -83, 8, -82, -11],          // occiput
    ['C', -80.5, -52, -48, -84, -8, -84],        // vertex
    ['C', 28, -85, 57.5, -58, 58, -34],          // front bombé
    ['C', 58.5, -24, 55.5, -13, 53, -8],           // le front fuit vers le nasion
    ['C', 52.5, -5, 53, -2, 55.5, 0.5],        // nasion bas, arête plate
    ['C', 57.8, 2.6, 59.8, 4.6, 59.3, 7.6],      // bouton retroussé
    ['C', 59, 9.9, 58.4, 11.2, 57, 11],   // dessous du bouton
    ['C', 56, 12, 55.5, 15, 56.5, 17],     // sous-nasal
    ['C', 57.5, 19, 58, 21, 56.5, 23],         // lèvre supérieure, en moue
    ['C', 55.8, 23.6, 55, 24, 54.5, 24.2],     // commissure
    ['C', 56, 25.5, 56.5, 28, 54, 29.5],       // lèvre inférieure
    ['C', 51.5, 31, 50.5, 32, 50.8, 35],       // sillon
    ['C', 51.2, 39, 50.5, 43, 47, 45.5],       // menton fuyant, mou
    ['C', 44, 48, 39, 51, 33, 52],             // sous le menton, la graisse qui pend
    ['C', 30, 52.5, 28, 54.5, 27.5, 57],       // le pli du double menton
    ['C', 27.5, 63, 33, 68, 46, 72],           // poitrine
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
  out.push(tr([['M', 39, -17], ['C', 41.5, -18.2, 44.5, -18, 47, -16.5]], 0.5));
  // aile du nez
  out.push(tr([['M', 54.6, 7.4], ['C', 53.2, 8.4, 53.4, 10.4, 55.4, 10.6]], 0.6));
  // commissure qui rentre dans la joue
  out.push(tr([['M', 54.5, 24.2], ['C', 53.5, 24.4, 52.5, 24.2, 51.5, 23.5]], 0.5));
  // joue
  out.push(tr([['M', 35, 8], ['C', 46, 13, 48, 33, 42, 46.5]], 0.5));
  // oreille : hélix, anthélix, tragus, lobe
  const R = 12 * Math.PI / 180, ox = -8, oy = 10;   // le haut de l'oreille vers l'arrière, comme l'arête du nez
  const rot = (cmds) => cmds.map(c => { const o = [c[0]];
    for (let i = 1; i < c.length; i += 2) { const dx = c[i] - ox, dy = c[i + 1] - oy;
      o.push(ox + dx * Math.cos(R) + dy * Math.sin(R), oy - dx * Math.sin(R) + dy * Math.cos(R)); }
    return o; });
  out.push(tr(rot([['M', -3, -5], ['C', -11, -8, -17, -1, -16, 9], ['C', -15, 18, -11, 25, -5, 25], ['C', -2, 25, -1, 22, -2, 19]]), 0.7));
  out.push(tr(rot([['M', -5, -1], ['C', -10, -1, -12, 7, -10.5, 12], ['C', -9.5, 15.5, -7, 17, -5, 15.5]]), 0.5));
  out.push(tr(rot([['M', -1, 2], ['C', 0.5, 3, 0.5, 6, -1, 7]]), 0.5));
  // l'épaule, qui remonte presque sous l'oreille
  out.push(tr([['M', 22, 60], ['C', 5, 54, -28, 54, -46, 62], ['C', -52, 65, -56, 68.5, -58, 72]], 0.6));
  // plis du cou
  out.push(tr([['M', -52, 46], ['C', -48, 48, -44, 48, -40, 47]], 0.5));
  // cheveux : mèches courtes qui suivent le crâne, une boucle au sommet
  const meches = [   // cinq traits fins et courts : une mèche au sommet, quatre autour du tourbillon, sous le contour
    [[-12, -84], [-11.5, -86.5, -10, -87.5, -8, -88]],        // la mèche qui dépasse au sommet
    [[-22, -79], [-20, -80.2, -18.5, -79.6, -16, -80.6]],      // du tourbillon vers l'avant
    [[-20, -75.5], [-18, -76.6, -16, -75.9, -13.5, -76.8]],
    [[-28, -78.5], [-30, -78.4, -31.5, -76.8, -33.5, -76.2]],  // du tourbillon vers l'arrière
    [[-31, -74], [-33, -74, -34.5, -72.2, -36.5, -71.4]],
  ];
  for (const [m, c] of meches) out.push(tr([['M', ...m], ['C', ...c]], 0.5));
  return out.join('\n');
}
module.exports = (h) => ({
  ref: 'modele-bebe',
  titre: 'Modèle : tête de bébé de profil',
  desc: 'Tête de bébé de quelques mois, de profil vers la droite, silhouette encrée en courbes de Bézier.',
  fichier: '_modeles-tete-bebe-final.svg',
  format: 'pleine',
  disposition: [['a']],
  vues: { a: { dessin: z => dessiner(z.l * 0.56, z.h * 0.52, Math.min(z.l / 170, z.h / 190)) } },
});
module.exports.dessiner = dessiner;
