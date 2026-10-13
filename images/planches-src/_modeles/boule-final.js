// Modèle : main droite qui tient une boule (pierre ronde Ø 70) par-dessous, vue de profil côté pouce.
// Pas une planche du livre. dessiner(x, y, echelle) est à porter dans formes.js ; (x, y) est le
// centre de la boule, l'échelle 1 donne des mm d'adulte (main de 190 du poignet au bout du majeur).
// Reprise de boule-courbes.js avec les huit corrections du juge.
//
// Repère en mm : origine au centre de la boule ; x vers la droite (les doigts), l'avant-bras vient
// de la gauche ; y vers le bas. Paume vers le haut, le pouce vers l'œil.
//
// Repères anatomiques (mm) :
//   boule : centre (0, 0), rayon 35
//   avant-bras coupé à x = -130 : dessus (paume) y = 52, dessous (dos) y = 94 ; épaisseur 42
//   poignet : pli côté paume (-71, 31), dos (-60, 63)
//   dos de la main : y = 57,5 sous la boule, 33 sous le rebord du creux ; bombe de 2 sous les jointures
//   jointures (MCP) : index (34, 46), majeur (40, 46) ; paume du poignet à la jointure : 100
//   pouce, le plus près de l'œil : CMC (-50, 14) · MCP (-36, -24) · IP (-14, -42) · bout (10, -40)
//     l'éminence part du pli du poignet en S doux et bombe de 3 à 4 hors de la corde
//     métacarpien et 1re phalange : un seul arc (pas d'angle à la MCP, un pli fin sur le dos)
//     ongle fermé 11 × 4, à 2,5 du bout ; la pulpe épouse le dessus de la boule
//   le creux de la paume : le rebord (éminence du pouce → base de l'index) passe devant la boule
//     à y = 24 ; le bas de la boule (y 24 à 35) est dedans, caché
//   index, devant : MCP (34, 46) · IPP (40,6 ; 5,7) · IPD (38, -12,4) · centre du bout (33,2 ; -23,2)
//   majeur, derrière, plus long : bout centré vers (32, -29), haut à y = -36 ;
//     18 de vide entre le bout du pouce et le bout du majeur (pas de pince)
//   annulaire et auriculaire : derrière la boule, cachés

function dessiner(x, y, s) {
  const N = '#1A1A1A';
  const X = v => +(x + v * s).toFixed(2), Y = v => +(y + v * s).toFixed(2);
  const d = (...segs) => segs.map(([c, ...v]) => {
    const ps = []; for (let i = 0; i < v.length; i += 2) ps.push(`${X(v[i])} ${Y(v[i + 1])}`);
    return c + ps.join(' ');
  }).join(' ');
  const trait = ep => `fill="none" stroke="${N}" stroke-width="${ep}" stroke-linecap="round" stroke-linejoin="round"`;
  const out = [];

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
  const sur = a => [35 * Math.cos(a * Math.PI / 180), 35 * Math.sin(a * Math.PI / 180)];

  // courbe lisse (Catmull-Rom → C) par des points ; t0 et t1 : directions imposées aux bouts
  const lisse = (pts, t0, t1) => {
    const T = pts.map((p, i) => {
      const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
      return [(b[0] - a[0]) / (i && i < pts.length - 1 ? 2 : 1), (b[1] - a[1]) / (i && i < pts.length - 1 ? 2 : 1)];
    });
    const imp = (i, dir, j) => {
      if (!dir) return;
      const l = Math.hypot(pts[j][0] - pts[i][0], pts[j][1] - pts[i][1]), n = Math.hypot(dir[0], dir[1]);
      T[i] = [dir[0] / n * l, dir[1] / n * l];
    };
    imp(0, t0, 1); imp(pts.length - 1, t1, pts.length - 2);
    const segs = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const p = pts[i], q = pts[i + 1];
      segs.push(['C', p[0] + T[i][0] / 3, p[1] + T[i][1] / 3, q[0] - T[i + 1][0] / 3, q[1] - T[i + 1][1] / 3, q[0], q[1]]);
    }
    return segs;
  };

  // ── la boule, derrière tout : le trait s'arrête 4 mm avant que le pouce la quitte ─────
  const b0 = sur(-142);
  out.push(`<circle cx="${X(0)}" cy="${Y(0)}" r="${(35 * s).toFixed(2)}" fill="#fff" stroke="none"/>`);
  out.push(`<path d="${d(['M', b0[0], b0[1]], ...arc(-142, 212))}" ${trait(1.5)}/>`);

  // ── la silhouette : un seul chemin fermé, en C autour de la boule ───────────────────
  const tour = [
    ['M', -130, 52],
    ['C', -112, 45.6, -94, 38.4, -78, 33.6],         // dessus de l'avant-bras → pli du poignet
    // le pli du poignet, puis l'éminence du pouce en S doux, le métacarpien et la 1re phalange
    // du pouce d'un seul arc : la MCP ne casse pas la silhouette
    ...lisse([[-78, 33.6], [-72.6, 31.4], [-68.6, 27.8], [-66.4, 23.2], [-65, 17.8], [-63.2, 11.4], [-60.2, 3],
              [-56.2, -7.4], [-51.4, -16.4], [-45.6, -24.4], [-38.8, -31.4], [-31.4, -37.6],
              [-24.6, -42.8], [-18.6, -46.6]], [16, -4.8], [6.4, -1.9]),
    ['C', -12.5, -48.4, -6, -49.4, 0, -48.8],       // dessus de la phalange du bout
    ['C', 5, -48.2, 9.4, -46.6, 10.6, -43],         // bout du pouce
    ['C', 11.8, -39.6, 11, -36.8, 8.6, -35.4],
    ['C', 6.6, -34.2, 3, -33.8, -1, -33.4],
    ['C', -2.4, -33.3, -3.8, -33.1, -5, -33],            // pulpe, posée à plat sur le dessus de la boule
    ['C', -7.4, -32.6, -9.4, -32, -11, -31],        // pli de l'IP
    ['C', -16, -29, -21, -24.5, -24.5, -22],
    ['C', -26.4, -20.8, -28, -19.8, -29.68, -18.55],  // le pouce quitte la boule
    ...arc(-148, -210),                              // l'éminence épouse le côté de la boule
    ['C', -16, 23.4, 12, 24.4, 28.2, 20.4],         // rebord du creux de la paume, devant le bas de la boule
    ['C', 30.2, 17.4, 32.2, 14.6, 33.2, 11.6],      // pulpe de l'index, devant le bord de la boule
    ['C', 33.4, 10.4, 33.2, 9.4, 33, 8.4],          // pli de l'IPP
    ['C', 32.6, 3, 31.8, -1.6, 31.4, -4.6],
    ['C', 31.2, -5.6, 30.6, -6.6, 30, -7.4],        // pli de l'IPD
    ['C', 27.4, -10.6, 25.6, -13.6, 25.4, -16.4],   // pulpe du bout de l'index
    ['C', 25.3, -18.4, 26, -20.4, 27.5, -21.7],
    // bout du majeur, derrière l'index : plus bas et plus à droite, loin du bout du pouce
    ['C', 26.2, -24.4, 25.8, -31, 29.8, -34.8],
    ['C', 32.4, -36.7, 36, -36.6, 39, -34.8],
    ['C', 42.6, -32.6, 46, -29, 48.6, -25.8],       // dos de la 3e phalange
    ['C', 50, -24.2, 51, -22.8, 51.6, -21.2],       // IPD
    // dos du majeur : l'IPP et la jointure bombent, le dos de la main remonte
    ...lisse([[51.6, -21.2], [54.2, -12.6], [56.6, -4], [58.6, 2.4], [58.4, 8], [56.2, 16], [52.6, 26.4],
              [50, 35.2], [48, 42.4], [45.6, 49], [41.8, 54.8], [36, 58.4], [28, 59.4],
              [14, 58.6], [-10, 57.8], [-36, 58.4], [-52, 60.8], [-60, 63.2], [-72, 67.8],
              [-90, 75.6], [-110, 84.4], [-130, 94]], [1, 3.3], [-20, 9.6]),
  ];
  out.push(`<path d="${d(...tour)} Z" fill="#fff" stroke="none"/>`);
  out.push(`<path d="${d(...tour)}" ${trait(1.5)}/>`);

  // ── contours qui passent devant : l'index sur le majeur ──────────────────────────────
  const devant = [
    [['M', 27.5, -21.7], ['C', 30.2, -22.4, 33.8, -21.6, 36.6, -19.6], ['C', 39.8, -17.2, 42.6, -13, 44.4, -9.4],
     ['C', 45.6, -7.2, 46.2, -5, 46, -2.6], ['C', 46.8, 3, 48, 9, 48.6, 14.2], ['C', 48.8, 16.4, 48.4, 18.4, 47.4, 20.4],
     ['C', 46.4, 23.6, 45.6, 26.8, 44.6, 30]],
  ];
  for (const f of devant) out.push(`<path d="${d(...f)}" ${trait(1)}/>`);

  // ── traits intérieurs ───────────────────────────────────────────────────────────────
  const fins = [
    // ongle du pouce, fermé : 11 × 4, s'arrête à 2,5 du bout
    [['M', -3.6, -48.2], ['C', 0, -48.5, 4.2, -47.9, 7.4, -46.1], ['C', 8.4, -45.5, 8.4, -44.2, 7.2, -43.7],
     ['C', 4.4, -43.6, 0.8, -44, -2.4, -45], ['C', -4, -45.6, -4.8, -47.6, -3.6, -48.2]],
    // ongles du majeur et de l'index
    [['M', 36.2, -34.6], ['C', 39.4, -33.2, 42.2, -30.8, 44.2, -28]],
    [['M', 35.2, -20.6], ['C', 37.6, -19.4, 39.6, -17.4, 41, -15.2]],
    // pli de l'IP du pouce
    [['M', -11, -31], ['C', -12.4, -34, -14.4, -36.6, -17, -38.4]],
    // pli du dos de la MCP du pouce
    [['M', -44.2, -23.4], ['C', -42.8, -22.8, -41.4, -21.6, -40.4, -20]],
    // pli de l'éminence du pouce : le creux de la paume rejoint le poignet
    [['M', -30.7, 17.7], ['C', -42, 23.6, -54, 28.2, -69, 30.6]],
    // plis de l'index (IPP, IPD), côté pulpe
    [['M', 33, 8.6], ['C', 35.8, 8.2, 38.4, 8.8, 40.6, 10]],
    [['M', 30.2, -7.2], ['C', 32.6, -7.4, 34.8, -7, 36.6, -6]],
    // plis du dos de l'IPP du majeur et de l'IPD de l'index
    [['M', 56.4, -0.6], ['C', 55.4, 2, 55.4, 5, 56.2, 7.8]],
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
  fichier: '_modeles-boule-final.svg',
  format: 'pleine',
  disposition: [['a']],
  vues: {
    a: { dessin: z => { const s = Math.min((z.l - 20) / 190, (z.h - 20) / 152); return dessiner(z.l / 2 + 36 * s, z.h / 2 - 25 * s, s); } },
  },
});
module.exports.dessiner = dessiner;
