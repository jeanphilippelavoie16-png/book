// Modèle : main droite qui tient une boule (pierre ronde Ø 70) par-dessous, vue de profil côté pouce.
// Pas une planche du livre. dessiner(x, y, echelle) est à porter dans formes.js ; (x, y) est le
// centre de la boule, l'échelle 1 donne des mm d'adulte (main de 190 du poignet au bout du majeur).
//
// Repère en mm : origine au centre de la boule ; x vers la droite (les doigts), l'avant-bras vient
// de la gauche ; y vers le bas. Paume vers le haut, le pouce vers l'œil.
//
// Repères anatomiques (mm) :
//   boule : centre (0, 0), rayon 35
//   avant-bras coupé à x = -130 : dessus (paume) y = 32, dessous (dos) y = 80
//   poignet : pli côté paume (-66, 26), dos (-62, 66) ; épaisseur 40
//   dos de la main : presque droit, y = 67 sous la boule ; épaisseur de la main 29 sous la boule
//   jointures (MCP) : index (34, 46), majeur (40, 46) ; paume du poignet à la jointure : 100
//   pouce, le plus près de l'œil : CMC (-50, 14) · MCP (-36, -24) · IP (-14, -42) · bout (10, -40)
//     métacarpien 40 · phalanges 28 · 24 (raccourcie : le bout part vers le fond) ;
//     épaisseur 26 → 21 → 18 ; la pulpe épouse le dessus de la boule ; ongle en haut
//   le creux de la paume : le rebord (éminence du pouce → base de l'index) passe devant la boule
//     à y = 25 ; le bas de la boule (y 25 à 35) est dedans, caché
//   index, devant : MCP (34, 46) · IPP (40,6 ; 5,7) · IPD (38, -12,4) · centre du bout (33,2 ; -23,2)
//     phalanges 41 · 18 · 19 ; épaisseur 18 → 16 → 14 ; la pulpe sur le bord de la boule
//   majeur, derrière, plus long : MCP (40, 46) · IPP (45,8 ; 4) · IPD (39,9 ; -18,6) · bout (30,4 ; -30,4)
//     phalanges 42 · 24 · 23 ; ne se voit qu'en bande au-delà de l'index, et par son bout plus haut
//   annulaire et auriculaire : derrière la boule, cachés
//   du poignet (-62) au bout du majeur, en suivant les os : 100 + 89 = 189

function dessiner(x, y, s) {
  const N = '#1A1A1A';
  const X = v => +(x + v * s).toFixed(2), Y = v => +(y + v * s).toFixed(2);
  const d = (...segs) => segs.map(([c, ...v]) => {
    const ps = []; for (let i = 0; i < v.length; i += 2) ps.push(`${X(v[i])} ${Y(v[i + 1])}`);
    return c + ps.join(' ');
  }).join(' ');
  const trait = ep => `fill="none" stroke="${N}" stroke-width="${ep}" stroke-linecap="round" stroke-linejoin="round"`;
  const out = [];

  // ── la boule, derrière tout ─────────────────────────────────────────────────────────
  out.push(`<circle cx="${X(0)}" cy="${Y(0)}" r="${(35 * s).toFixed(2)}" fill="#fff" ${trait(1.5).replace('fill="none" ', '')}/>`);

  // arc de la boule (centre 0, rayon r) de a1 à a2 en degrés, en C : là où la peau l'épouse
  const arc = (a1, a2, r = 35) => {
    const segs = [], n = Math.max(1, Math.ceil(Math.abs(a2 - a1) / 45)), da = (a2 - a1) / n;
    const k = 4 / 3 * Math.tan((da * Math.PI / 180) / 4) * r;
    for (let i = 0; i < n; i++) {
      const t1 = (a1 + i * da) * Math.PI / 180, t2 = (a1 + (i + 1) * da) * Math.PI / 180;
      segs.push(['C', r * Math.cos(t1) - k * Math.sin(t1), r * Math.sin(t1) + k * Math.cos(t1),
                      r * Math.cos(t2) + k * Math.sin(t2), r * Math.sin(t2) - k * Math.cos(t2),
                      r * Math.cos(t2), r * Math.sin(t2)]);
    }
    return segs;
  };

  // ── la silhouette : un seul chemin fermé, en C autour de la boule ───────────────────
  const tour = [
    ['M', -130, 52],
    ['C', -108, 44, -85, 35, -64, 30],              // dessus de l'avant-bras → pli du poignet
    ['C', -61, 28.6, -58.6, 25.4, -58.4, 19],       // l'éminence du pouce, bombée
    ['C', -58.2, 7, -53.4, -8, -47.6, -21],         // bord du métacarpien du pouce
    ['C', -47, -23.6, -45.6, -25.6, -43.4, -27.4],  // MCP du pouce
    ['C', -37, -33.5, -30, -40, -23.6, -45],        // 1re phalange, dessus
    ['C', -22, -46.2, -20.5, -46.8, -18.6, -47],    // IP
    ['C', -12.5, -48.6, -6, -49.4, 0, -48.8],       // l'ongle, la phalange un peu renversée
    ['C', 5, -48.2, 9.4, -46.6, 10.6, -43],         // bout du pouce
    ['C', 11.6, -40, 10, -37, 6.6, -35.4],
    ['C', 3, -34, -1.6, -33.4, -5, -33],            // pulpe, posée à plat sur le dessus de la boule
    ['C', -7.4, -32.6, -9.4, -32, -11, -31],        // pli de l'IP
    ['C', -16, -29, -21, -24.5, -24.5, -22],
    ['C', -26.4, -20.8, -28, -19.8, -29.68, -18.55],  // le pouce quitte la boule
    ...arc(-148, -210),                              // l'éminence épouse le côté de la boule
    ['C', -16, 23.4, 12, 24.4, 28.2, 20.4],         // rebord du creux de la paume, devant le bas de la boule
    ['C', 30.2, 17.4, 32.2, 14.6, 33.2, 11.6],        // pulpe de l'index, devant le bord de la boule
    ['C', 33.4, 10.4, 33.2, 9.4, 33, 8.4],          // pli de l'IPP
    ['C', 32.6, 3, 31.8, -1.6, 31.4, -4.6],
    ['C', 31.2, -5.6, 30.6, -6.6, 30, -7.4],        // pli de l'IPD
    ['C', 27.4, -10.6, 25.6, -13.6, 25.4, -16.4],   // pulpe du bout de l'index
    ['C', 25.3, -18.4, 26, -20.4, 27.5, -21.7],
    ...arc(-38, -49.4, 35),                              // la boule, entre l'index et le majeur
    ['C', 21.6, -29.4, 20.6, -33.4, 22.2, -36.6],   // bout du majeur
    ['C', 24.4, -40.6, 29.4, -41, 33.2, -38.6],
    ['C', 38.4, -35.2, 44.2, -30.2, 47.8, -26.4],   // dos de la 3e phalange
    ['C', 49.6, -24.6, 50.8, -23.4, 51.4, -21.8],   // IPD
    ['C', 53.4, -15, 55.6, -7, 57, -1.4],           // dos de la 2e phalange
    ['C', 57.8, 1.4, 58, 3.6, 57.4, 6.2],           // IPP
    ['C', 53.6, 20, 48, 35, 43.6, 46.6],            // dos de la 1re phalange
    ['C', 42, 51, 39.6, 54.6, 35.4, 57.4],          // jointure du majeur, puis de l'index
    ['C', 32, 59.6, 27, 60.6, 20, 61],
    ['C', 4, 62, -14, 62.4, -30, 62.6],             // dos de la main
    ['C', -42, 62.8, -52, 63.6, -60, 66],           // poignet
    ['C', -82, 74, -106, 86, -130, 100],            // dessous de l'avant-bras
  ];
  out.push(`<path d="${d(...tour)} Z" fill="#fff" stroke="none"/>`);
  out.push(`<path d="${d(...tour)}" ${trait(1.5)}/>`);

  // ── contours qui passent devant : l'index sur le majeur ──────────────────────────────
  const devant = [
    [['M', 27.5, -21.7], ['C', 30.2, -22.4, 33.8, -21.6, 36.6, -19.6], ['C', 39.8, -17.2, 42.6, -13, 44.4, -9.4],
     ['C', 45.6, -7.2, 46.2, -5, 46, -2.6], ['C', 46.8, 3, 48, 9, 48.6, 14.2], ['C', 48.8, 16.4, 48.4, 18.4, 47.4, 20.4],
     ['C', 44.4, 29, 41.6, 37.6, 39, 45]],
  ];
  for (const f of devant) out.push(`<path d="${d(...f)}" ${trait(1)}/>`);

  // ── traits intérieurs ───────────────────────────────────────────────────────────────
  const fins = [
    // ongles : pouce, majeur, index
    [['M', -6, -47.6], ['C', -1, -47.2, 4.4, -46, 8.4, -43.2]],
    [['M', 29, -39.6], ['C', 32.4, -38.4, 35.4, -36.2, 37.6, -33.4]],
    [['M', 35.2, -20.6], ['C', 37.6, -19.4, 39.6, -17.4, 41, -15.2]],
    // pli de l'IP du pouce
    [['M', -11, -31], ['C', -12.4, -34, -14.4, -36.6, -17, -38.4]],
    // pli de l'éminence du pouce : le creux de la paume rejoint le poignet
    [['M', -30.7, 17.7], ['C', -40, 23, -50, 27, -60, 29]],
    // plis de l'index (IPP, IPD), côté pulpe
    [['M', 33, 8.6], ['C', 35.8, 8.2, 38.4, 8.8, 40.6, 10]],
    [['M', 30.2, -7.2], ['C', 32.6, -7.4, 34.8, -7, 36.6, -6]],
    // plis du dos de l'IPP du majeur et de l'IPD de l'index
    [['M', 55, -1], ['C', 54, 1.6, 54, 4.6, 55, 7.4]],
    [['M', 43.6, -8.6], ['C', 42.6, -6.6, 42.4, -4.4, 43, -2.2]],
  ];
  for (const f of fins) out.push(`<path d="${d(...f)}" ${trait(0.6)}/>`);

  // ── grain de la pierre : quelques marques, pas un motif ─────────────────────────────
  const grain = [[-10, -18], [4, -24], [16, -12], [-18, -2], [-4, 6], [10, 4], [20, 8], [-8, 15], [6, 14], [-20, -14]];
  for (const [gx, gy] of grain) out.push(`<circle cx="${X(gx)}" cy="${Y(gy)}" r="${(0.5 * s).toFixed(2)}" fill="${N}"/>`);
  return out.join('\n');
}

module.exports = (h) => ({
  ref: 'modele',
  titre: 'La boule, de profil',
  desc: 'Modèle : main droite qui tient une pierre ronde de 70 mm par-dessous, vue de profil côté pouce.',
  fichier: '_modeles-boule-courbes.svg',
  format: 'pleine',
  disposition: [['a']],
  vues: {
    a: { dessin: z => { const s = Math.min((z.l - 20) / 190, (z.h - 20) / 152); return dessiner(z.l / 2 + 36 * s, z.h / 2 - 25 * s, s); } },
  },
});
module.exports.dessiner = dessiner;
