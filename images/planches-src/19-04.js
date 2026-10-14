// Planche 19-04 — Bouillir aux pierres, sans chaudron.
// Chapitre 24, « Bouillir sans chaudron » et « Les pierres se choisissent ».
//
// La charte : le creux de la fosse, au-dessus de l'eau, vu par la coupe, en gris loin (la terre
// et l'eau gardent leur trame). Le rouge : la pierre chaude qu'on lâche dans l'eau (le geste) ;
// la pierre du brasier cerclée, parce que c'est son choix qui est dangereux. Le trajet de la
// pierre refroidie qu'on ressort reste noir.
module.exports = (h) => {
  const f = n => n.toFixed(1);
  const blanc = at => at.replace('fill="none"', 'fill="#fff"');

  // Pierre irrégulière, contour lissé par des quadratiques entre les milieux.
  const bloc = (cx, cy, rx, ry, k = [1, 0.86, 0.97, 0.8, 1.04, 0.9, 0.84], rot = 0) => {
    const n = k.length;
    const p = k.map((m, i) => {
      const t = rot + (i / n) * Math.PI * 2;
      return [cx + Math.cos(t) * rx * m, cy + Math.sin(t) * ry * m];
    });
    const mi = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    const m0 = mi(p[n - 1], p[0]);
    let d = `M${f(m0[0])},${f(m0[1])}`;
    for (let i = 0; i < n; i++) {
      const q = mi(p[i], p[(i + 1) % n]);
      d += ` Q${f(p[i][0])},${f(p[i][1])} ${f(q[0])},${f(q[1])}`;
    }
    return d + ' Z';
  };
  const pierre = (cx, cy, rx, ry, k, rot) => {
    const d = bloc(cx, cy, rx, ry, k, rot);
    return h.path(d, h.a.blanc) + h.path(d, h.a.hachure('pierre'));
  };
  const buche = (x, y, r) => [h.cercle(x, y, r, blanc(h.a.arete)), h.cercle(x, y, r * 0.62, h.a.detail), h.cercle(x, y, r * 0.28, h.a.detail)].join('\n');
  // Géométrie commune au dessin et aux renvois.
  const geo = z => {
    const W = z.l, H = z.h;
    const g = Math.round(H * 0.5);
    const x1 = W * 0.45, x2 = W * 0.8, yb = H - 16, pm = (x1 + x2) / 2;
    const fx = W * 0.17;
    const F = [x1 - 42, g - H * 0.22];
    const S = [pm - 22, g - 14];
    const ang = Math.atan2(S[1] - F[1], S[0] - F[0]);
    const Lp = Math.hypot(S[0] - F[0], S[1] - F[1]);
    const monde = (x, y) => [F[0] + x * Math.cos(ang) - y * Math.sin(ang), F[1] + x * Math.sin(ang) + y * Math.cos(ang)];
    return { W, H, g, x1, x2, yb, pm, fx, F, S, ang, Lp, monde };
  };

  // Cuvette : deux cubiques, du bord gauche (x1, y) au bord droit (x2, y), fond à yb.
  const cuvette = (x1, x2, y, yb) => {
    const m = (x1 + x2) / 2, e = (x2 - x1) * 0.28;
    return [
      [[x1, y], [x1 + 6, y + (yb - y) * 0.8], [m - e, yb], [m, yb]],
      [[m, yb], [m + e, yb], [x2 - 6, y + (yb - y) * 0.8], [x2, y]],
    ];
  };
  const bez = (c, t) => {
    const u = 1 - t;
    return [0, 1].map(k => u * u * u * c[0][k] + 3 * u * u * t * c[1][k] + 3 * u * t * t * c[2][k] + t * t * t * c[3][k]);
  };
  const dcub = cs => cs.map(c => `C${c.slice(1).map(p => `${f(p[0])},${f(p[1])}`).join(' ')}`).join(' ');
  const points = (cs, n = 30) => cs.flatMap(c => Array.from({ length: n + 1 }, (_, i) => bez(c, i / n)));

  // Flamme : une goutte pointue vers le haut.
  const flamme = (x, y, l, ht, pen = 0) =>
    h.path(`M${f(x - l / 2)},${f(y)} C${f(x - l / 2 - 2)},${f(y - ht * 0.45)} ${f(x + pen - l * 0.1)},${f(y - ht * 0.6)} ${f(x + pen)},${f(y - ht)} ` +
      `C${f(x + pen + l * 0.25)},${f(y - ht * 0.55)} ${f(x + l / 2 + 3)},${f(y - ht * 0.4)} ${f(x + l / 2)},${f(y)}`, h.a.arete);

  return {
    ref: '19-04',
    titre: 'Bouillir aux pierres, sans chaudron',
    desc: 'Coupe d’une fosse doublée d’une peau fraîche et pleine d’eau, avec un feu allumé à l’écart. ' +
      'Deux bâtons verts en pince, bouts écartés, lâchent une pierre chaude dans l’eau ; une pierre refroidie ' +
      'est ressortie sur le bord. Le feu ne touche jamais la peau.',
    format: 'demi',
    disposition: [['coupe']],
    vues: {
      coupe: {
        dessin: z => {
          const { W, H, g, x1, x2, yb, pm, fx, S, Lp, monde } = geo(z);
          const sol = cuvette(x1, x2, g, yb);
          const hx1 = x1 + 6, hx2 = x2 - 6, hyb = yb - 6;
          const peau = cuvette(hx1, hx2, g + 5, hyb);
          const wl = g + 20;                        // surface de l'eau

          // Eau : la cuvette de la peau sous la ligne d'eau.
          const pe = points(peau).filter(p => p[1] >= wl);
          const eau = [[pe[0][0], wl], ...pe, [pe[pe.length - 1][0], wl]];

          // Poils de la peau, entre la peau et la terre.
          const poils = [];
          peau.forEach(c => {
            for (let i = 1; i < 18; i++) {
              const t = i / 18, a = bez(c, t), b = bez(c, t + 0.01);
              let nx = b[1] - a[1], ny = -(b[0] - a[0]);
              const L = Math.hypot(nx, ny); nx /= L; ny /= L;
              // normale vers l'extérieur de la cuvette (vers la terre)
              if (ny < 0 || (Math.abs(ny) < 0.3 && (a[0] - pm) * nx < 0)) { nx = -nx; ny = -ny; }
              poils.push(`M${f(a[0] + nx * 1.5)},${f(a[1] + ny * 1.5)} L${f(a[0] + nx * 5 + ny * 1.5)},${f(a[1] + ny * 5 - nx * 1.5)}`);
            }
          });
          poils.splice(0, poils.length, h.path(poils.join(' '), h.a.detail));   // le poil, entre peau et terre

          // Rabats de la peau sur le sol, et piquets.
          const rabatG = `M${f(x1 - 40)},${f(g - 3)} L${f(x1 - 2)},${f(g - 3)} Q${f(hx1)},${f(g - 3)} ${f(hx1)},${f(g + 5)}`;
          const rabatD = `M${f(hx2)},${f(g + 5)} Q${f(hx2)},${f(g - 3)} ${f(x2 + 2)},${f(g - 3)} L${f(x2 + 40)},${f(g - 3)}`;
          const piquet = x => h.chemin([[x - 3, g - 12], [x + 3, g - 12], [x + 3, g + 12], [x, g + 19], [x - 3, g + 12]], blanc(h.a.arete), true);

          // Terre coupée, avec la fosse en creux.
          const terre = `M0,${g} L${f(x1)},${g} ${dcub(sol)} L${W},${g} L${W},${H} L0,${H} Z`;

          // Feu, à gauche, posé sur le sol.
          const braise = `M${f(fx - 88)},${g} Q${f(fx - 70)},${g - 16} ${f(fx - 30)},${g - 20} Q${f(fx)},${g - 24} ${f(fx + 30)},${g - 20} Q${f(fx + 70)},${g - 16} ${f(fx + 88)},${g} Z`;

          // Pince et main.
          // Tout est dessiné dans le repère du poing (x le long des bâtons), puis porté au monde.
          const tp = d => d.replace(/(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/g, (_, x, y) => monde(+x, +y).map(f).join(','));
          const bois1 = tp(`M-80,-5 L${f(Lp - 4)},-14 L${f(Lp - 3)},-10 L-80,-1 Z`);
          const bois2 = tp(`M-80,1 L${f(Lp - 3)},10 L${f(Lp - 4)},14 L-80,5 Z`);
          const poing = tp('M-15,-13 C-8,-19 6,-19 13,-16 Q20,-14 19,-8 Q22,-5 20,-1 Q23,2 20,6 Q22,10 17,13 ' +
            'C10,17 -6,18 -14,13 C-18,8 -18,-6 -15,-13 Z');
          const doigts = tp('M19,-8 L12,-8 M20,-1 L12,-1 M20,6 L12,5');
          const pouce = tp('M-11,-10 C-3,-12 6,-12 12,-9');
          // avant-bras et manche, qui montent hors du cadre
          const dir = [Math.cos(-2.09), Math.sin(-2.09)];
          const hautDe = (p, e) => { const t = p[1] / -dir[1]; return [p[0] + dir[0] * t + e, 0]; };
          const A = monde(-1.8, -21.1), B = monde(-14.2, -2.9);
          const tc = ((A[1] + B[1]) / 2 - 20) / -dir[1];   // la manchette, à 20 du haut du cadre
          const Bc = [B[0] + dir[0] * tc, B[1] + dir[1] * tc], Ac = [A[0] + dir[0] * tc, A[1] + dir[1] * tc];
          const nrm = [-dir[1], dir[0]];
          const Bm = [Bc[0] - nrm[0] * 1.5, Bc[1] - nrm[1] * 1.5], Am = [Ac[0] + nrm[0] * 1.5, Ac[1] + nrm[1] * 1.5];
          const bras = [A, Ac, Am, hautDe(Am, 3), hautDe(Bm, -3), Bm, Bc, B];

          // le creux de la fosse, au-dessus de l'eau : la peau d'en face, vue par la coupe
          const pp = points(peau);
          const creux = [...pp.filter(p => p[1] < wl && p[0] < pm), [pe[0][0], wl], [pe[pe.length - 1][0], wl], ...pp.filter(p => p[1] < wl && p[0] > pm), [hx2, g], [hx1, g]];

          return [
            h.path(terre, h.a.hachure('terre', 'aucun')),
            h.chemin(creux, h.a.loin, true),
            h.path(`M0,${g} L${f(x1)},${g} ${dcub(sol)} L${W},${g}`, h.a.arete),
            h.chemin(eau, h.a.hachure('eau', 'aucun'), true),
            h.ligne(pe[0][0], wl, pe[pe.length - 1][0], wl, h.a.arete),
            // pierres au fond, dont la dernière lâchée
            pierre(pm + 34, hyb - 12, 17, 11, undefined, 0.3),
            pierre(pm - 20, hyb - 11, 14, 10, [1, 0.9, 0.8, 1, 0.92, 0.86, 0.95], 1.1),
            ...[[pm + 30, hyb - 34, 2.6], [pm + 36, hyb - 50, 2], [pm + 28, hyb - 64, 2.8], [pm + 35, wl + 12, 2.2],
              [pm - 18, hyb - 30, 2], [pm - 24, hyb - 46, 2.4]].map(([x, y, r]) => h.cercle(x, y, r, blanc(h.a.detail))),
            ...poils,
            h.path(`M${f(hx1)},${f(g + 5)} ${dcub(peau)}`, h.a.contour),
            h.path(rabatG, h.a.contour), h.path(rabatD, h.a.contour),
            piquet(x1 - 26), piquet(x2 + 26),
            // vapeur
            ...[pm + 38, pm + 60].map((x, i) =>
              h.path(`M${f(x)},${f(wl - 6)} C${f(x - 8)},${f(wl - 18)} ${f(x + 8)},${f(wl - 28)} ${f(x)},${f(wl - 40 - i * 6)}`, h.a.cache)),
            // pierres refroidies ressorties, sur le bord droit
            pierre(x2 + 62, g - 9, 15, 9, [1, 0.9, 0.84, 1, 0.9, 0.8, 0.96], 0.2),
            pierre(x2 + 88, g - 7, 11, 7, undefined, 1.4),
            h.fleche(`M${f(pm + 82)},${f(wl - 8)} C${f(pm + 96)},${f(g - 56)} ${f(x2 + 44)},${f(g - 60)} ${f(x2 + 60)},${f(g - 24)}`, h.a.cache),
            // feu à l'écart : braises, deux bûches en bout, flammes derrière les pierres
            flamme(fx - 19, g - 24, 26, 64, 4), flamme(fx + 23, g - 22, 24, 54, -4),
            pierre(fx - 40, g - 24, 15, 11, undefined, 0.5),
            pierre(fx + 2, g - 28, 17, 12, [1, 0.9, 0.8, 1, 0.92, 0.86, 0.95], 0.2),
            pierre(fx + 42, g - 23, 14, 10, [1, 0.84, 0.95, 0.9, 1.02, 0.86, 0.9], 1),
            h.path(braise, h.a.blanc), h.path(braise, h.a.hachure('gravier')),
            buche(fx - 70, g - 11, 11), buche(fx + 72, g - 10, 10),
            // pince, pierre tenue, main
            h.path(bois1, blanc(h.a.arete)), h.path(bois2, blanc(h.a.arete)),
            pierre(S[0], S[1], 12, 9, [1, 0.9, 0.84, 1, 0.9, 0.8, 0.96], 0.7),
            h.geste(`M${f(S[0])},${f(S[1] + 12)} L${f(S[0])},${f(wl - 3)}`),
            // la pierre du brasier : sèche, dense, ramassée en hauteur
            h.controle(fx - 40, g - 24, 18),
          ].join('\n');
        },
        renvois: z => {
          const { H, g, x1, x2, yb, pm, fx, S, Lp, monde } = geo(z);
          const peau = cuvette(x1 + 6, x2 - 6, g + 5, yb - 6);
          const p1 = bez(peau[1], 0.72);
          const p4 = monde(Lp * 0.55, -12.1);
          return [
            { n: 1, rond: [p1[0] + 44, H - 12], cible: [p1[0] + 3, p1[1] + 3], texte: 'fosse doublée d’une peau fraîche' },
            { n: 2, rond: [fx - 88, g + 30], cible: [fx - 20, g - 7], texte: 'brasier à l’écart du contenant' },
            { n: 3, rond: [fx - 78, g - 72], cible: [fx - 51, g - 32], texte: 'pierre sèche, dense, ramassée en hauteur' },
            { n: 4, rond: [p4[0] + 16, p4[1] - 30], cible: [p4[0], p4[1]], texte: 'pince de deux bâtons verts' },
            { n: 5, rond: [S[0] + 30, S[1] - 38], cible: [S[0] + 7, S[1] - 8], texte: 'pierre chaude lâchée dans l’eau' },
            { n: 6, rond: [x2 + 76, g - 52], cible: [x2 + 66, g - 19], texte: 'pierre refroidie, ressortie et remplacée' },
          ];
        },
      },
    },
  };
};
