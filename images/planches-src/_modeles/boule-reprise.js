// Modèle (reprise de bouleProfil2 de formes.js) : main droite qui tient une boule (pierre ronde
// Ø 70) par-dessous, vue de profil côté pouce. Pas une planche du livre.
//
// Ce qui ratait dans bouleProfil2 : la boule était tenue de côté dans un « C » (pouce dessus,
// index dessous, paume verticale) au lieu de reposer dans la paume ; l'avant-bras arrivait dans
// l'axe de la boule ; les doigts ne remontaient pas le côté ; le pouce partait du milieu du dos.
//
// dessiner(x, y, echelle, objet) : (x, y) le centre de la boule ; echelle en unités de vue par mm
// (1 : main de 190 du poignet au bout du majeur) ; objet : le SVG de la boule (sinon un cercle).
// Repère en mm : origine au centre de la boule, x vers les doigts, y vers le bas, paume en haut.
//   boule R 35 · poignet x = -72 (épaisseur 40) · dos de la main y = 66, paume sous la boule y = 35
//   majeur, derrière : MCP (28, 48) · IPP (45, 9,6) · IPD (42, -16) · bout (30,5, -27,4) ; 42 · 26 · 17+7
//   index, devant : MCP (21, 46) · IPP (38, 12,4) · IPD (37,4, -9,3) · bout (30,2, -19,6) ; 38 · 22 · 13+6,5
//   pouce, le plus près : CMC (-76, 32) · MCP (-58, -4) · IP (-37,2, -21,5) · bout (-12,7, -39) ; 40 · 27 · 30+9

function dessiner(x, y, e, objet) {
  const N = '#1A1A1A', B = '#FFFFFF';
  const R = 35;
  const f = v => Math.round(v * 100) / 100;
  const T = p => [f(x + p[0] * e), f(y + p[1] * e)];
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]], sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const mul = (a, k) => [a[0] * k, a[1] * k], uni = a => { const l = Math.hypot(a[0], a[1]) || 1; return [a[0] / l, a[1] / l]; };
  const gau = u => [u[1], -u[0]], lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  const pol = (deg, r) => [r * Math.cos(deg * Math.PI / 180), r * Math.sin(deg * Math.PI / 180)];

  // Catmull-Rom → Bézier, en coordonnées de vue
  function courbe(pts, ferme = false) {
    const P = pts.map(T), n = P.length;
    const g = i => ferme ? P[(i + n) % n] : P[Math.max(0, Math.min(n - 1, i))];
    let d = `M${P[0][0]} ${P[0][1]}`;
    const fin = ferme ? n : n - 1;
    for (let i = 0; i < fin; i++) {
      const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
    }
    return d + (ferme ? ' Z' : '');
  }
  const trait = w => `fill="none" stroke="${N}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"`;

  // Un doigt : axe (articulations) et demi-épaisseurs ; côté A = gauche de la marche, B = droite.
  // Rend le contour ouvert (sans la base, cachée dans la paume) et la géométrie pour les détails.
  function doigt(c, w, { bout = 1, renfle = [] } = {}) {
    const n = c.length, u = [], nn = [];
    for (let i = 0; i < n - 1; i++) u.push(uni(sub(c[i + 1], c[i])));
    for (let i = 0; i < n; i++) nn.push(gau(uni(i === 0 ? u[0] : i === n - 1 ? u[n - 2] : add(u[i - 1], u[i]))));
    const A = [], Bs = [];
    for (let i = 0; i < n; i++) {
      const r = renfle[i] || 0;                       // la jointure un peu plus large
      A.push(add(c[i], mul(nn[i], w[i] + r))); Bs.push(sub(c[i], mul(nn[i], w[i] + r)));
      if (i < n - 1) {
        const m = lerp(c[i], c[i + 1], 0.5), g = gau(u[i]), wm = (w[i] + w[i + 1]) / 2 - 0.4;
        A.push(add(m, mul(g, wm))); Bs.push(sub(m, mul(g, wm)));
      }
    }
    const ue = u[n - 2], ne = nn[n - 1], we = w[n - 1], ce = c[n - 1], cap = [];
    for (const a of [60, 30, 0, -30, -60]) {
      const k = Math.PI / 180 * a;
      cap.push(add(ce, add(mul(ne, Math.sin(k) * we), mul(ue, Math.cos(k) * we * bout))));
    }
    const pts = [...A, ...cap, ...Bs.reverse()];
    return { pts, A, B: Bs.slice().reverse(), u, nn, c, w };
  }
  const forme = pts => ({ fond: courbe(pts, true), bord: courbe(pts) });

  // ── les pièces, du fond vers l'œil ──
  // majeur, derrière l'index : sa bande dépasse au-delà de l'index, son bout plus haut. Son dos
  // descend à la jointure et file en dos de la main, puis en dessous de l'avant-bras.
  const maj = doigt([[6, 46.5], [27, 47], [45, 9.6], [42, -16], [30.5, -27.4]], [13.2, 12, 9, 8.2, 7.4], { renfle: [0, 1.8, 0.8, 0.5, 0] });
  const dos = [[-10, 59.6], [-40, 58.6], [-72, 59], [-100, 62], [-150, 67]];
  const fondDos = [[-150, 40], [0, 40]];
  // index, devant la boule : la pulpe contre la pierre, le bout sur le haut du côté
  const ind = doigt([[19, 46], [38.8, 13.3], [37.4, -9.3], [30.2, -19.6]], [8.6, 8, 7.2, 6.5], { renfle: [0, 0.8, 0.5, 0] });
    // pouce, le plus près de l'œil : il sort du gras de la paume et se couche sur le dessus
  const pou = doigt([[-60, 22], [-50, -6], [-30.7, -23.2], [-10, -30.7]], [11.5, 9.8, 8.8, 7.9], { renfle: [0, 0.6, 0.4, 0], bout: 1.05 });
  const nP = pou.pts.length, kMCP = nP - 3;            // côté B (pulpe) : on ne trace pas sous la MCP
  const pA0 = pou.A[0];

  // la paume : l'avant-bras (dessus), le gras du pouce, puis le rebord du creux devant la boule
  const avantBras = [[-150, 20], [-118, 19.5], [-92, 23], [-79, 22]];
  const rebord = [[-42, 6.5], [-37.5, 13], [-28, 18.5], [-14, 21.5], [2, 22.6], [12, 23], [19, 21.6], [24.6, 18.6], ind.A[2]];
  const fondPaume = [...avantBras, pA0, [-60, -2], [-48, -4], pou.B[2], ...rebord, [24, 40], [26, 50], [0, 54], [-72, 55], [-150, 62]];

  const pieces = [
    { fond: courbe([...maj.pts, ...dos, ...fondDos], true), bord: [courbe([...maj.pts, ...dos])] },
    { fond: courbe(fondPaume, true), bord: [] },
    { fond: courbe(ind.pts, true), bord: [courbe([...ind.pts.slice(2), [22.5, 55]])] },
    { fond: courbe(pou.pts, true), bord: [courbe([...avantBras, ...pou.pts.slice(0, kMCP + 1), ...rebord])] },
  ];

  // ── les détails, 0,5 ──
  const det = [];
  const surAxe = (dg, i, t, cote, k) => {   // un point sur le doigt : segment i, fraction t, côté ±1, k × demi-épaisseur
    const p = lerp(dg.c[i], dg.c[i + 1], t), g = gau(dg.u[i]), w = dg.w[i] + (dg.w[i + 1] - dg.w[i]) * t;
    return add(p, mul(g, cote * w * k));
  };
  // ongle : sur le côté B (le dos du doigt), du dernier segment
  const ongle = (dg, cote, t0 = 0.15) => {
    const i = dg.c.length - 2;
    const a = surAxe(dg, i, t0, cote, 1.0), b = surAxe(dg, i, 0.35, cote, 0.62), c = surAxe(dg, i, 0.95, cote, 0.58);
    const bout = add(dg.c[i + 1], add(mul(dg.u[i], dg.w[i + 1] * 0.85), mul(gau(dg.u[i]), cote * dg.w[i + 1] * 0.5)));
    return courbe([a, b, c, bout]);
  };
  det.push(ongle(ind, -1), ongle(maj, -1, 0.2), ongle(pou, 1, 0.42));
  // plis de flexion côté pulpe (A, vers la boule) aux jointures de l'index et du pouce
  const pli = (dg, i, cote, k0, k1) => {
    const p = dg.c[i], g = dg.nn[i];
    return courbe([add(p, mul(g, cote * dg.w[i] * k0)), add(add(p, mul(g, cote * dg.w[i] * (k0 + k1) / 2)), mul(dg.u[i - 1], -1.2)), add(p, mul(g, cote * dg.w[i] * k1))]);
  };
  det.push(pli(ind, 1, 1, 1, 0.7), pli(ind, 2, 1, 1, 0.7));
  // rides du dos de la jointure (IPP de l'index, IP du pouce)
  const rides = (dg, i, cote) => [0.3, 0.45].map((k, j) => {
    const p = add(dg.c[i], mul(dg.u[i], (j - 0.5) * 2.6)), g = dg.nn[i];
    return courbe([add(p, mul(g, cote * dg.w[i] * (1 - 0.05))), add(add(p, mul(g, cote * dg.w[i] * (1 - k / 2))), mul(dg.u[i], 1)), add(p, mul(g, cote * dg.w[i] * (1 - k)))]);
  });
  det.push(...rides(ind, 1, -1), ...rides(pou, 2, 1));
  // le gras du pouce : le pli qui le borne, de la commissure vers le poignet
  det.push(courbe([[-42, 4], [-46, 16], [-54, 26], [-64, 30]]));
  // la jointure de l'index au dos de la main (la bosse sous la peau)
  

  const out = [];
  out.push(objet || `<circle cx="${f(x)}" cy="${f(y)}" r="${f(R * e)}" fill="${B}" stroke="${N}" stroke-width="2.4"/>`);
  // le trait de silhouette : un 3 sous les fonds, dont la forme couvre la moitié intérieure (≈ 1,5)
  for (const p of pieces) for (const b of p.bord) out.push(`<path d="${b}" ${trait(3)}/>`);
  for (const p of pieces) { out.push(`<path d="${p.fond}" fill="${B}" stroke="none"/>`); for (const b of p.bord) out.push(`<path d="${b}" ${trait(0.7)}/>`); }
  for (const d of det) out.push(`<path d="${d}" ${trait(0.5)}/>`);
  return `<g data-forme="main-boule-profil">\n${out.join('\n')}\n</g>`;
}

module.exports = (h) => ({
  ref: 'modele',
  titre: 'La boule, de profil (reprise)',
  desc: 'Modèle : main droite qui tient une pierre ronde de 70 mm par-dessous, vue de profil côté pouce.',
  fichier: '_modeles-boule-reprise.svg',
  format: 'pleine',
  disposition: [['a'], ['b']],
  hauteurs: [3, 1],
  vues: {
    a: { dessin: z => {
      const s = Math.min((z.l - 20) / 205, (z.h - 20) / 135);
      const x = z.l / 2 + 47 * s, y = z.h / 2 - 10 * s;
      return dessiner(x, y, s, h.cercle(x, y, 35 * s, h.a.hachure('pierre', 'contour')));
    } },
    b: { titre: 'À l’échelle 1', dessin: z => {
      const x = z.l / 2 + 47, y = z.h / 2 - 5;
      return dessiner(x, y, 1, h.cercle(x, y, 35, h.a.hachure('pierre', 'contour')));
    } },
  },
});
module.exports.dessiner = dessiner;
