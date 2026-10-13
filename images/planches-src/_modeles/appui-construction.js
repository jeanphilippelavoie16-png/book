// Modèle : main droite à plat qui appuie sur une planche — de profil (côté pouce) et vue du dos.
// Pas une planche du livre. dessiner(x, y, echelle, vue, opts) rend le SVG ; à porter dans formes.js.
//
// Méthode : construction d'illustrateur. On pose d'abord le squelette (paume en coin, métacarpes,
// trois phalanges par doigt aux rapports vrais, pouce qui part du trapèze au poignet), on en tire
// les repères du contour, puis on ne trace que le contour. opts.construction = true imprime aussi
// le squelette, en tireté fin, pour juger la mise en place.
//
// Repère en mm d'adulte (échelle 1 : 190 du pli du poignet au bout du majeur), y vers le bas.
//   dos    : origine au milieu du pli du poignet ; x vers les doigts ; y négatif côté pouce.
//   profil : origine au pli du poignet, sur le dessus de la planche ; y négatif = hauteur.
// Les deux vues partagent les x : jointures, plis et bouts tombent au même endroit.

// ─── Le squelette (commun aux deux vues) ──────────────────────────────────────────────────
// Têtes des métacarpes (jointures MCP), angle de l'axe du doigt (degrés, + vers l'auriculaire),
// phalanges P1 · P2 · P3 (dos, en mm), largeurs à la base · IPP · IPD · bout.
const DOIGTS = {
  index: { mcp: [94, -31], a: -8, ph: [41, 24, 19.5], w: [22, 20, 17.5, 16], web: 19 },
  majeur: { mcp: [99, -10], a: -1, ph: [44, 27, 20], w: [22.5, 20.5, 18, 16.5], web: 20 },
  annulaire: { mcp: [95, 10], a: 5.5, ph: [42, 26, 19], w: [21, 19, 17, 15.5], web: 19 },
  auriculaire: { mcp: [85, 28], a: 13, ph: [35, 20, 18], w: [18, 16.5, 15, 14], web: 15 },
};
// Pouce : du trapèze (CMC, au poignet) à la MCP, à l'IP, au bout ; il s'écarte de 33° puis se
// referme doucement vers les doigts (phalanges à -20° et -12°).
const POUCE = { cmc: [14, -27], seg: [[46, -31], [32, -18], [27, -10]], w: [27, 21.5, 20, 17.5] };

function dessiner(x, y, s, vue = 'profil', opts = {}) {
  const N = '#000';
  const X = v => +(x + v * s).toFixed(2), Y = v => +(y + v * s).toFixed(2);
  const P = p => `${X(p[0])} ${Y(p[1])}`;
  const trait = ep => `fill="none" stroke="${N}" stroke-width="${ep}" stroke-linecap="round" stroke-linejoin="round"`;
  const EP = { silhouette: 1.5, devant: 1.1, detail: 0.7, fin: 0.5 };

  // Catmull-Rom → Bézier : la courbe passe par chaque repère, sans cassure.
  const courbe = (pts, ferme = false, k = 1 / 6) => {
    const n = pts.length, g = i => ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
    let d = `M${P(pts[0])}`;
    const fin = ferme ? n : n - 1;
    for (let i = 0; i < fin; i++) {
      const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      const c1 = [p1[0] + (p2[0] - p0[0]) * k, p1[1] + (p2[1] - p0[1]) * k];
      const c2 = [p2[0] - (p3[0] - p1[0]) * k, p2[1] - (p3[1] - p1[1]) * k];
      d += ` C${P(c1)} ${P(c2)} ${P(p2)}`;
    }
    return d + (ferme ? ' Z' : '');
  };
  const out = [], cons = [];
  const tracer = (d, ep) => out.push(`<path d="${d}" ${trait(ep)}/>`);
  const blanc = d => out.push(`<path d="${d}" fill="#fff" stroke="none"/>`);
  const rad = a => a * Math.PI / 180;

  // ─── Repère d'un doigt : T(u, v), u le long de l'axe depuis la MCP, v en travers (+ côté auriculaire)
  const repere = F => {
    const c = Math.cos(rad(F.a)), si = Math.sin(rad(F.a));
    const L = F.ph[0] + F.ph[1] + F.ph[2];
    const j = [0, F.ph[0], F.ph[0] + F.ph[1], L];          // MCP, IPP, IPD, bout
    // demi-largeur le long du doigt : renflée aux articulations, un peu creusée entre elles
    const h = u => {
      const [w0, w1, w2, w3] = F.w.map(v => v / 2);
      if (u <= j[1]) { const t = u / j[1]; return w0 + (w1 - w0) * t - 0.45 * Math.sin(Math.PI * t); }
      if (u <= j[2]) { const t = (u - j[1]) / (j[2] - j[1]); return w1 + (w2 - w1) * t - 0.55 * Math.sin(Math.PI * t); }
      const t = (u - j[2]) / (L - j[2]); return w2 + (w3 - w2) * t - 0.2 * Math.sin(Math.PI * t);
    };
    const T = (u, v) => [F.mcp[0] + u * c - v * si, F.mcp[1] + u * si + v * c];
    return { ...F, L, j, h, T };
  };

  if (vue === 'dos') {
    const D = Object.fromEntries(Object.entries(DOIGTS).map(([k, F]) => [k, repere(F)]));
    const ordre = ['index', 'majeur', 'annulaire', 'auriculaire'];

    // un bord de doigt, de la palmure au bout (cote = -1 côté pouce, +1 côté auriculaire)
    const bord = (F, cote, u0) => {
      const us = [u0 + 5, (u0 + F.j[1]) / 2 + 3, F.j[1], (F.j[1] + F.j[2]) / 2, F.j[2], F.j[2] + (F.L - F.j[2]) * 0.5];
      return us.map(u => F.T(u, cote * F.h(u)));
    };
    // le bout : un demi-ovale un peu plus long que large (la pulpe dépasse l'ongle)
    const bout = F => {
      const r = F.h(F.L - 0.01), c = F.L - r * 1.2, pts = [];
      for (const a of [-55, -25, 0, 25, 55]) pts.push(F.T(c + r * 1.2 * Math.cos(rad(a)), r * 0.93 * Math.sin(rad(a))));
      return pts;
    };
    const doigt = (F, u0r, u0u) => [...bord(F, -1, u0r), ...bout(F), ...bord(F, +1, u0u).reverse()];
    // creux d'une palmure entre deux doigts voisins : un U, un peu en retrait
    const creux = (A, B) => {
      // partant des deux premiers repères des bords qui se font face, le fond de la palmure est
      // un petit U posé 4 mm plus près du poignet, dans l'axe moyen des deux doigts
      const ea = A.T(A.web + 5, A.h(A.web + 5)), eb = B.T(B.web + 5, -B.h(B.web + 5));
      const ang = rad((A.a + B.a) / 2), d = [Math.cos(ang), Math.sin(ang)], n = [-d[1], d[0]];
      const pr = p => [p[0] * d[0] + p[1] * d[1], p[0] * n[0] + p[1] * n[1]];   // (le long, en travers)
      const [ua, va] = pr(ea), [ub, vb] = pr(eb);
      const u = Math.min(ua, ub) - 4, v = (va + vb) / 2, g = Math.max(1.2, (vb - va) * 0.22);
      const at = (uu, vv) => [uu * d[0] + vv * n[0], uu * d[1] + vv * n[1]];
      return [at(u + 1.3, v - g), at(u, v), at(u + 1.3, v + g)];
    };

    // pouce : repères le long de sa ligne brisée
    const pj = [POUCE.cmc];
    POUCE.seg.forEach(([l, a]) => { const p = pj[pj.length - 1]; pj.push([p[0] + l * Math.cos(rad(a)), p[1] + l * Math.sin(rad(a))]); });
    const pAng = POUCE.seg.map(([, a]) => a);
    const pT = (i, t, v) => {          // segment i, fraction t, décalage v (+ vers les doigts)
      const a = rad(pAng[i]), p = pj[i], l = POUCE.seg[i][0];
      return [p[0] + l * t * Math.cos(a) - v * Math.sin(a), p[1] + l * t * Math.sin(a) + v * Math.cos(a)];
    };
    const pw = (i, t) => (POUCE.w[i] + (POUCE.w[i + 1] - POUCE.w[i]) * t) / 2;

    // ── le contour, d'un seul trait : avant-bras côté pouce → pouce → quatre doigts → bord cubital
    const tipP = pj[3], rP = pw(2, 1);
    const cP = [tipP[0] - rP * Math.cos(rad(-12)), tipP[1] - rP * Math.sin(rad(-12))];
    const boutPouce = [-75, -40, 0, 40, 80].map(a => {
      const aa = rad(-12 + a);
      return [cP[0] + rP * 1.1 * Math.cos(aa), cP[1] + rP * Math.sin(aa)];
    });
    const contour = [
      [-80, -35.6], [-50, -33.4], [-26, -31.4], [-9, -31.2],        // avant-bras, bord radial
      [3, -32.6], [12, -36.4],                                                     // tabatière, la base du pouce sort
      pT(0, 0.45, -pw(0, 0.45) - 0.6), pT(0, 0.8, -pw(0, 0.8) - 0.4), // éminence thénar vue d'en haut
      pT(1, 0.02, -pw(1, 0) - 0.8),                                  // bosse de la MCP du pouce
      pT(1, 0.55, -pw(1, 0.55)), pT(2, 0.02, -pw(2, 0) - 0.5),       // P1, bosse de l'IP
      pT(2, 0.5, -pw(2, 0.5)),
      ...boutPouce,
      pT(2, 0.45, pw(2, 0.45)), pT(1, 0.95, pw(1, 0.95) + 0.3), pT(1, 0.62, pw(1, 0.62) + 0.2),
      [71.6, -44.6], [71.8, -42.2], [78, -40.4], [90, -39.8],                       // la palmure du pouce : un U ouvert
      ...doigt(D.index, 9, D.index.web), ...creux(D.index, D.majeur),
      ...doigt(D.majeur, D.majeur.web, D.majeur.web), ...creux(D.majeur, D.annulaire),
      ...doigt(D.annulaire, D.annulaire.web, D.annulaire.web), ...creux(D.annulaire, D.auriculaire),
      ...doigt(D.auriculaire, D.auriculaire.web, 6),
      [72, 38.2], [50, 39.8], [26, 37.5], [8, 33],                   // bord cubital, hypothénar
      [-6, 32], [-16, 32.9], [-30, 33.4],                            // tête du cubitus
      [-55, 34.6], [-80, 36],
    ];
    tracer(courbe(contour), EP.silhouette);

    // ── détails fins : ongles, plis des articulations, jointures, base du pouce
    ordre.forEach(k => {
      const F = D[k], r = F.h(F.L - 0.01);
      const uB = F.j[2] + (F.L - F.j[2]) * 0.27, uE = F.L - 3, hw = F.h(uB) * 0.58;
      // l'ongle : un rectangle aux coins ronds, repli de la peau en arc à la base, bord libre en arc
      tracer(courbe([F.T(uB, 0), F.T(uB + 0.9, hw * 0.8), F.T(uB + 3, hw), F.T(uE - 2, hw * 0.98), F.T(uE - 0.5, hw * 0.6),
        F.T(uE, 0), F.T(uE - 0.5, -hw * 0.6), F.T(uE - 2, -hw * 0.98), F.T(uB + 3, -hw), F.T(uB + 0.9, -hw * 0.8)], true), EP.fin);
      // IPP : deux petits plis courbes ; IPD : un seul
      const wI = F.h(F.j[1]) * 0.38;
      tracer(courbe([F.T(F.j[1] - 2.6, -wI), F.T(F.j[1] - 1.6, 0), F.T(F.j[1] - 2.6, wI)]), EP.fin);
      tracer(courbe([F.T(F.j[1] + 0.8, -wI * 0.75), F.T(F.j[1] + 1.6, 0), F.T(F.j[1] + 0.8, wI * 0.75)]), EP.fin);
      const wD = F.h(F.j[2]) * 0.3;
      tracer(courbe([F.T(F.j[2] - 1.2, -wD), F.T(F.j[2] - 0.5, 0), F.T(F.j[2] - 1.2, wD)]), EP.fin);
      // jointure MCP : une petite courbe qui coiffe la tête du métacarpe
      const wM = F.w[0] * 0.2;
      tracer(courbe([F.T(-0.6, -wM), F.T(0.6, -wM * 0.4), F.T(0.6, wM * 0.4), F.T(-0.6, wM)]), EP.fin);
    });
    // ongle du pouce, vu de côté (il regarde vers le dehors) ; pli de l'IP
    {
      const a = pT(2, 0.36, -pw(2, 0.36) * 0.15), b = pT(2, 0.9, -pw(2, 0.9) * 0.2);
      const c = pT(2, 0.88, -pw(2, 0.88) * 0.78), d = pT(2, 0.4, -pw(2, 0.4) * 0.8);
      tracer(courbe([b, a, d, c]), EP.fin);
      tracer(courbe([pT(2, 0.02, -pw(2, 0) * 0.6), pT(2, 0.06, -pw(2, 0) * 0.1)]), EP.fin);
    }
    // le dos du pouce rejoint le dos de la main : une ligne douce de la tabatière à la MCP
    tracer(courbe([[12, -27.5], [28, -33.5], [44, -41]]), EP.fin);
    // tête du cubitus au poignet
    tracer(courbe([[-18, 28.4], [-12, 26.6], [-6, 28]]), EP.fin);

    if (opts.construction) {
      const c = `fill="none" stroke="${N}" stroke-width="0.4" stroke-dasharray="2 2"`;
      ordre.forEach(k => {
        const F = D[k];
        cons.push(`<path d="M${P([12, F.mcp[1] * 0.45])} L${P(F.mcp)} L${P(F.T(F.L, 0))}" ${c}/>`);
        F.j.forEach(u => cons.push(`<circle cx="${X(F.T(u, 0)[0])}" cy="${Y(F.T(u, 0)[1])}" r="${1.2 * s}" ${c}/>`));
      });
      cons.push(`<path d="M${pj.map(P).join(' L')}" ${c}/>`);
      pj.forEach(p => cons.push(`<circle cx="${X(p[0])}" cy="${Y(p[1])}" r="${1.2 * s}" ${c}/>`));
      cons.push(`<path d="M${P([0, -30])} L${P([0, 30])} M${P([12, -27])} L${P([94, -42])} L${P([85, 37])} L${P([10, 31])}" ${c}/>`);
    }
    return [...cons, ...out].join('\n');
  }

  // ═══ De profil, côté pouce. Planche à y = 0. ════════════════════════════════════════════
  // Plans de profondeur, du fond vers l'œil : la main et le majeur (silhouette) → l'index → le
  // pouce et l'éminence thénar. Chaque plan est rempli de blanc et cache ce qu'il a derrière.

  // 1. la silhouette : avant-bras, dos de la main, majeur qui dépasse l'index de 13
  const dessus = [
    [-80, -76], [-52, -63.2], [-26, -51.6], [-8, -44.6], [4, -42.8],  // avant-bras qui monte à 22°
    [14, -43], [28, -44.2], [48, -42.2], [70, -38.8],                 // carpe, dos de la main
    [87, -36.4], [99, -35.2], [109, -32.2], [124, -27.6], [142, -22.8], [157, -19.2], [170, -16.2], // majeur : MCP, IPP, IPD
    [181, -13], [187.6, -8.8], [190.2, -4.2], [188.6, -1.2], [184.6, 0],              // ongle, bout
  ];
  tracer(courbe(dessus), EP.silhouette);
  const dessous = [[5, -0.3], [-1.5, -2.8], [-8, -7.2], [-24, -14], [-50, -24], [-80, -34.6]];
  tracer(courbe(dessous), EP.silhouette);

  // 2. l'index, devant le majeur : son dos se détache à la jointure
  const idx = [
    [66, -36.4], [84, -33.4], [95, -31.6], [113, -26.4], [134, -20.8],
    [147, -17.4], [159, -15.2], [167, -13.4], [173.6, -10], [177.4, -5], [176, -1.4], [172, 0],
  ];
  blanc(courbe(idx) + ` L${P([120, -0.8])} L${P([70, -0.8])} Z`);
  tracer(courbe(idx.slice(1)), EP.devant);

  // 3. le pouce et le thénar, le plus près de l'œil. Le pouce est couché sur sa tranche : on le
  //    voit par le dos, l'ongle de face. Sa pulpe décolle de 4 à 6 de la planche.
  const pDessus = [
    [-8, -33], [6, -31.4], [22, -30.6], [38, -29.6], [52, -28],      // tabatière, métacarpe, MCP
    [66, -25.4], [83, -22.6], [96, -20.2], [104.6, -17],              // P1, bosse de l'IP, P2
    [109.4, -12.6], [110, -8.4], [106.6, -4.8],                       // le bout
  ];
  const pDessous = [
    [106.6, -4.8], [99, -4.3], [90, -5], [83, -5.8], [76, -6.1],      // pulpe, pli de l'IP
    [66, -6.6], [56, -6.4], [44, -3.6], [32, -1], [20, -0.1], [12, 0],          // P1, puis le thénar descend
  ];
  blanc(courbe(pDessus) + ' ' + courbe(pDessous).replace(/^M[^C]*/, 'L' + P(pDessous[0]) + ' ') +
    ` L${P([4, -0.8])} L${P([-10, -10])} Z`);
  tracer(courbe([...pDessus, ...pDessous.slice(1)]), EP.devant + 0.2);

  // ── détails fins
  // ongle du pouce, de face : un ovale sur la phalange du bout
  tracer(courbe([[93, -12.4], [96.2, -17.4], [102.4, -16.6], [105.8, -12.4], [104.2, -8.2], [97.6, -7.6]], true), EP.fin);
  tracer(courbe([[84.4, -19.4], [83.6, -15.4], [84.4, -11.2]]), EP.fin);    // pli de l'IP, sur le dos
  // ongles de l'index et du majeur, vus de côté
  tracer(courbe([[161.4, -13.2], [166.4, -11.6], [170.6, -9]]), EP.fin);
  // plis de l'index : IPP (deux petits plis du dos, un pli du dessous), IPD
  tracer(courbe([[132.2, -19.8], [132.8, -17.2]]), EP.fin);
  tracer(courbe([[135.6, -19.2], [136.2, -17.2]]), EP.fin);
  tracer(courbe([[137.4, -0.6], [137.8, -4.4]]), EP.fin);
  tracer(courbe([[160.4, -0.6], [160.6, -3.4]]), EP.fin);
  // pli du poignet, au talon de la paume ; styloïde du radius
  tracer(courbe([[-6.6, -7.8], [-4.6, -12.8], [-4, -16.6]]), EP.fin);
  tracer(courbe([[-14, -38.4], [-9, -39.6], [-4, -38.4]]), EP.fin);

  if (opts.construction) {
    const c = `fill="none" stroke="${N}" stroke-width="0.4" stroke-dasharray="2 2"`;
    const jj = [[94, -24], [134, -10], [158, -8], [176, -6]];
    cons.push(`<path d="M${P([0, -22])} L${jj.map(P).join(' L')}" ${c}/>`);
    cons.push(`<path d="M${P([14, -24])} L${P([52.6, -19])} L${P([82.7, -15.5])} L${P([109, -12])}" ${c}/>`);
  }
  return [...cons, ...out].join('\n');
}

module.exports = (h) => ({
  ref: 'modele',
  titre: 'La main à plat qui appuie',
  desc: 'Modèle : main droite à plat qui appuie sur une planche, de profil côté pouce et vue du dos.',
  fichier: '_modeles-appui-construction.svg',
  format: 'pleine',
  disposition: [['profil'], ['dos']],
  hauteurs: [1, 1.2],
  vues: {
    profil: {
      titre: 'De profil, côté pouce',
      dessin: z => {
        const s = 2.1, x0 = 82 * s + 6, y0 = z.h * 0.74;
        return [h.rect(x0 - 84 * s, y0, 280 * s, 14 * s, h.a.hachure('bois', 'arete')),
          dessiner(x0, y0, s, 'profil', { construction: !!process.env.CONSTRUCTION })].join('\n');
      },
    },
    dos: {
      titre: 'Vue du dos',
      dessin: z => dessiner(82 * 2.1 + 6, z.h * 0.6, 2.1, 'dos', { construction: !!process.env.CONSTRUCTION }),
    },
  },
});
module.exports.dessiner = dessiner;
