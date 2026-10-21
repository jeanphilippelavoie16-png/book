// Modèle : main droite qui pince une aiguille entre le pouce et l'index, vue de profil côté pouce.
// Pas une planche du livre. dessiner(x, y, echelle) est à porter dans formes.js.
//
// Repère en mm d'adulte : origine au centre du pli du poignet ; x vers la droite (le poignet),
// les doigts vers la GAUCHE (main droite vue côté pouce) ; y vers le bas, dos de la main en haut.
// Vue très légèrement par en dessous : les doigts éloignés (annulaire, auriculaire) descendent
// un peu, ce qui les fait sortir sous le pouce en escalier.
//
// Repères anatomiques (mm) :
//   avant-bras coupé à x = 80 : dessus y = -24, dessous y = 28,5 ; poignet (pli) -19,5 / +25
//   dos de la main presque droit jusqu'à la jointure de l'index, sommet (-88, -25,5)
//   index : MCP (-84, -7) · IPP (-115, 19) · IPD (-116, 42) · bout (-113, 63)
//     phalanges 41 · 23 · 20 ; flexions 40° · 48° · 12° : un arc doux, pas un crochet
//     épaisseur 21 → 17 → 14 ; pulpe tournée vers le poignet, vers le pouce
//   pouce, le plus près de l'œil, posé DEVANT la pulpe de l'index :
//     CMC (-16, 30) · MCP (-51, 60) · IP (-81, 60) · centre du bout (-101, 54,5), rayon 9
//     métacarpien 46 · phalanges 30 · 30 ; épaisseur 24 → 19 → 17 ; ongle côté bas
//   le « O » entre pouce et index : fermé à droite par la palmure (-56, 48,5) → (-79, 5)
//   majeur : vu dans le O sous l'index, puis replié sous le pouce, dessous à y = 79
//   annulaire en retrait : dessous à y = 84, de x = -76 à -56
//   auriculaire en retrait : dessous à y = 88, de x = -56 à -30, puis le talon de la main
//   aiguille Ø 1,3, longueur 62 : passe entre les pulpes, pointe en bas à gauche (-121, 84),
//     chas dans le O (-89, 29) ; cachée derrière le bout du pouce

function dessiner(x, y, s) {
  const N = '#000';
  const X = v => +(x + v * s).toFixed(2), Y = v => +(y + v * s).toFixed(2);
  const d = (...segs) => segs.map(([c, ...v]) => {
    const ps = []; for (let i = 0; i < v.length; i += 2) ps.push(`${X(v[i])} ${Y(v[i + 1])}`);
    return c + ps.join(' ');
  }).join(' ');
  const trait = ep => `fill="none" stroke="${N}" stroke-width="${ep}" stroke-linecap="round" stroke-linejoin="round"`;
  const out = [];

  // ── la silhouette : un seul chemin fermé, avec le « O » en trou ─────────────────────────
  const tour = [
    ['M', 40, -23],
    ['C', 28, -22, 14, -20.5, 2, -19.5],            // dessus de l'avant-bras → poignet
    ['C', -22, -19, -52, -21.5, -76, -24.5],          // dos de la main
    ['C', -82, -25.5, -87.5, -24, -90.5, -19.5],      // jointure de l'index
    ['C', -101, -8.5, -112, 0.5, -121.5, 7.8],        // 1re phalange, dos
    ['C', -124, 9.7, -125.8, 11.8, -126.8, 14.5],     // IPP
    ['C', -128.8, 20.5, -131.5, 27.5, -133.4, 34.5],  // 2e phalange
    ['C', -133.9, 36.4, -134, 38, -133.8, 39.6],      // IPD
    ['C', -133.2, 44, -132, 49.5, -130, 53.7],        // 3e phalange
    ['C', -128.5, 57.2, -126, 60.2, -123, 60.6],      // bout de l'index, qui dépasse sous le pouce
    ['C', -120.5, 61, -118.3, 59.8, -116.9, 57.8],
    ['C', -115.8, 58.7, -114.6, 59.3, -113.2, 59.6],  // dessous du bout du pouce
    ['C', -108, 60.6, -104, 61.6, -102.5, 62],
    ['C', -103.6, 63.8, -104.3, 66, -104.4, 68.4],    // IPP du majeur, sous le pouce
    ['C', -104.5, 71.5, -102.8, 74.2, -99.5, 74.6],
    ['C', -94, 74.8, -88.5, 73.8, -84, 72.6],         // dos de la 2e phalange, qui remonte vers la paume
    ['C', -83.4, 75.4, -81.8, 77.8, -78.5, 78.6],     // annulaire, en retrait : 1re marche
    ['C', -73.5, 79.6, -67.5, 78.8, -62, 77],
    ['C', -61.2, 79.6, -59.5, 81.6, -56, 82.1],       // auriculaire, en retrait : 2e marche
    ['C', -51.8, 82.4, -48.4, 79.6, -46.8, 75.2],     // il remonte jusqu'à l'éminence du pouce
    ['C', -45.8, 72.2, -45.4, 68.6, -45.6, 65.2],
    ['C', -36, 57, -23, 46.5, -13, 38],               // éminence du pouce jusqu'au poignet
    ['C', -9, 34.5, -5, 30.5, 0, 28.6],
    ['C', 10, 26.9, 24, 27.3, 40, 27.8],              // dessous de l'avant-bras
  ];
  const trou = [
    ['M', -80, 48.2],
    ['C', -81.5, 36, -87.5, 23, -96, 15.6],           // la palmure
    ['C', -97.2, 14.6, -98.6, 14.5, -99.8, 15.4],     // le creux entre pouce et index
    ['C', -103, 18.3, -106.3, 21.4, -109.5, 23.7],    // dessous de la 1re phalange de l'index
    ['C', -111.3, 24.6, -112.4, 26, -112.7, 27.8],    // pli de l'IPP
    ['C', -113.8, 31.5, -115.6, 35.4, -117.8, 37.9],  // 2e phalange
    ['C', -118.5, 38.9, -118.4, 40.2, -118, 41],      // pli de l'IPD
    ['C', -117.4, 42.2, -117, 43.2, -117, 44.3],      // pulpe de l'index, qui plonge sous le pouce
    ['C', -115, 42.6, -112, 41.6, -108.5, 41.8],      // pulpe du pouce, dessus
    ['C', -103, 42, -96, 44, -91, 47],
    ['C', -88.5, 48, -84, 48.4, -80, 48.2],
  ];
  // le remplissage blanc ferme tout ; l'encre ne passe pas sur la coupe de l'avant-bras
  out.push(`<path d="${d(...tour)} Z ${d(...trou)} Z" fill="#fff" fill-rule="evenodd" stroke="none"/>`);
  out.push(`<path d="${d(...tour)}" ${trait(1.5)}/>`);
  out.push(`<path d="${d(...trou)}" ${trait(1.5)}/>`);

  // ── contours qui passent devant (le pouce sur l'index et sur les doigts repliés) ──────
  const devant = (...segs) => out.push(`<path d="${d(...segs)}" ${trait(1.1)}/>`);
  const fin = (...segs) => out.push(`<path d="${d(...segs)}" ${trait(0.6)}/>`);
  // bout du pouce posé devant la pulpe de l'index
  devant(['M', -116.9, 57.8], ['C', -119.8, 55.3, -120.6, 51, -119.6, 48.2], ['C', -119.1, 46.6, -118.2, 45.3, -117, 44.3]);
  // dessous du pouce, devant les doigts repliés
  devant(['M', -102.5, 62], ['C', -98, 62.8, -94, 64, -91, 65], ['C', -89.5, 65.6, -88.5, 66.6, -87.5, 67.6],
         ['C', -82, 68.2, -66, 68.3, -56, 68.3], ['C', -50, 68.2, -47.5, 66.8, -45.6, 65.2]);
  // bouts repliés : le majeur devant l'annulaire, l'annulaire devant l'auriculaire
  devant(['M', -84, 72.6], ['C', -83, 71.2, -82.8, 69.6, -83, 67.9]);
  devant(['M', -62, 77], ['C', -60.8, 74.6, -60.6, 71, -61.3, 68.2]);

  // ── détails fins ────────────────────────────────────────────────────────────────────────
  // ongle de l'index, de profil
  fin(['M', -133.2, 43.6], ['C', -132.4, 44.1, -131.7, 44.3, -131, 44.2], ['C', -130.6, 47.5, -129.5, 51, -127.8, 54]);
  // plis du dos de l'index, à l'IPP et à l'IPD
  fin(['M', -123.6, 12.2], ['C', -122.9, 14, -123.1, 16, -124.1, 17.8]);
  fin(['M', -131.4, 34.6], ['C', -130.7, 36, -130.8, 37.6, -131.6, 39]);
  // ongle du pouce, sur le bord bas
  fin(['M', -101.3, 62.3], ['C', -101.4, 61.6, -101.3, 61.1, -101, 60.6], ['C', -105, 60, -109.5, 58.8, -114, 57.1]);
  // plis de l'IP du pouce, côté pulpe et côté dos
  fin(['M', -91, 47.2], ['C', -90.4, 49.5, -90.6, 51.6, -91.4, 53.4]);
  fin(['M', -88.8, 64.2], ['C', -88, 62.8, -87.7, 61.5, -88, 60.3]);
  // l'éminence du pouce contre la paume
  fin(['M', -80, 48.2], ['C', -72, 44, -63, 40.5, -54, 38]);
  // plis des jointures repliées
  fin(['M', -102.6, 67.6], ['C', -101.5, 69.2, -101.4, 71, -102.1, 72.6]);
  fin(['M', -80.2, 75.2], ['C', -79.2, 76.2, -79, 77.3, -79.5, 78.4]);
  fin(['M', -58.3, 78.8], ['C', -57.3, 79.8, -57.1, 80.9, -57.6, 81.9]);

  // ── l'aiguille : entre les pulpes, cachée derrière le bout du pouce ────────────────────
  // axe : passe en (-116, 49), direction (0,5 ; -0,866) ; Ø 1,3 ; pointe en bas à gauche
  const ux = 0.5, uy = -0.866, r = 0.65;
  const P = t => [-116 + ux * t, 49 + uy * t];
  const bande = (t1, t2) => { const [a, b] = P(t1), [c, e] = P(t2);
    return [['M', a - uy * r, b + ux * r], ['L', c - uy * r, e + ux * r], ['L', c + uy * r, e - ux * r], ['L', a + uy * r, b - ux * r]]; };
  // côté pointe : sort sous le bout du pouce, passe devant le bout de l'index
  const [p1x, p1y] = P(-6.5), [pkx, pky] = P(-26), [ptx, pty] = P(-32);
  out.push(`<path d="${d(['M', p1x - uy * r, p1y + ux * r], ['L', pkx - uy * r, pky + ux * r], ['L', ptx, pty], ['L', pkx + uy * r, pky - ux * r], ['L', p1x + uy * r, p1y - ux * r])} Z" fill="${N}" stroke="none"/>`);
  // côté chas : sort par-dessus le pouce, dans le O ; le bout arrondi, le chas en blanc
  out.push(`<path d="${d(...bande(8, 33.4))} Z" fill="${N}" stroke="none"/>`);
  const [ex, ey] = P(33.4);
  out.push(`<circle cx="${X(ex)}" cy="${Y(ey)}" r="${(r * s).toFixed(2)}" fill="${N}"/>`);
  const [c1x, c1y] = P(28.6), [c2x, c2y] = P(32.4);
  out.push(`<line x1="${X(c1x)}" y1="${Y(c1y)}" x2="${X(c2x)}" y2="${Y(c2y)}" stroke="#fff" stroke-width="${(0.42 * s).toFixed(2)}" stroke-linecap="round"/>`);
  return out.join('\n');
}

module.exports = (h) => ({
  ref: 'modele',
  titre: 'La pince, de profil',
  desc: 'Modèle : main droite qui pince une aiguille entre le pouce et l’index, vue de profil côté pouce.',
  fichier: '_modeles-pince-courbes.svg',
  format: 'pleine',
  disposition: [['a']],
  vues: {
    a: { dessin: z => { const s = Math.min((z.l - 20) / 174, (z.h - 20) / 115); return dessiner(z.l / 2 + 47 * s, z.h / 2 - 31 * s, s); } },
  },
});
module.exports.dessiner = dessiner;
