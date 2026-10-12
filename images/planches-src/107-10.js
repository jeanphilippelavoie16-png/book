// Planche 107-10 — La couture de vis, pour la fonte fendue (ch. 103, variante d'urgence C).
// Quatre temps (trous d'arrêt et premier trou, visser et couper, mater, trou suivant), puis la
// fente cousue vue de dessus et en coupe le long de la fente, aux mêmes abscisses.
module.exports = (h) => {
  const blanc = (t) => t.replace('fill="none"', 'fill="#fff"');

  // La ligne : un trou d'arrêt à chaque bout (rayon rs), des vis de rayon r au pas r — chaque trou
  // percé à moitié dans la vis d'avant. La première et la dernière vis mordent un peu le trou d'arrêt.
  const ligne = (l, r, rs, marge) => {
    const ov = 1;
    const n = Math.floor((l - 2 * marge - 2 * rs + 2 * ov) / r) - 1;
    const len = 2 * rs - 2 * ov + (n + 1) * r;
    const xa = (l - len) / 2, xb = xa + len;
    const c = Array.from({ length: n }, (_, k) => xa + rs - ov + r + k * r);
    return { n, xa, xb, c, r, rs };
  };

  // La fente : un trait brisé qui reste dans le diamètre des vis.
  const DEC = [0, 0.5, 0.9, 0.4, -0.2, -0.7, -0.3, 0.2, 0.7, 0.1, -0.5, -1, -0.6, 0, 0.4, 0.8, 0.3, -0.4, -0.8, -0.2];
  const fente = (xa, xb, y, amp) => {
    const m = Math.max(2, Math.round((xb - xa) / 4));
    const pts = [];
    for (let i = 0; i <= m; i++) pts.push([xa + (xb - xa) * i / m, y + (i === 0 || i === m ? 0 : amp * DEC[i % DEC.length])]);
    return h.chemin(pts, h.a.arete);
  };

  // Plaque vue de dessus : deux bords, deux traits de coupure.
  const zig = (x, y0, W, a) => [[x, y0], [x, y0 + 0.38 * W], [x - a, y0 + 0.46 * W], [x + a, y0 + 0.54 * W], [x, y0 + 0.62 * W], [x, y0 + W]];
  const bande = (x0, x1, y0, W) => [
    h.chemin([[x0, y0], [x1, y0]], h.a.contour),
    h.chemin([[x0, y0 + W], [x1, y0 + W]], h.a.contour),
    h.chemin(zig(x0, y0, W, 5), h.a.arete),
    h.chemin(zig(x1, y0, W, 5), h.a.arete),
  ];
  const trou = (x, y, r) => h.cercle(x, y, r, h.a.plein);
  const filet = (x, y, R) => h.path(`M ${x + R} ${y} A ${R} ${R} 0 1 1 ${x} ${y - R}`, h.a.fin);
  const vis = (x, y, r) => h.cercle(x, y, r, blanc(h.a.arete));

  // Petites vues de dessus (temps 1 et 4).
  const planT = (z) => {
    const W = 84;
    const y0 = (z.h - W) / 2;
    const L = ligne(z.l, 15, 5, 34);
    return { W, y0, yc: y0 + W / 2, x0: 8, x1: z.l - 8, L };
  };

  // Filetage en coupe : dent triangulaire, pas p, profondeur a, autour de l'abscisse x.
  const filetage = (x, y1, y2, a, p) => {
    const q = p / 4;
    const m = Math.max(4, Math.round((y2 - y1) / q));
    const pts = [];
    for (let i = 0; i <= m; i++) {
      const o = (i === m || i % 2 === 0) ? 0 : (i % 4 === 1 ? a / 2 : -a / 2);
      pts.push([x + o, y1 + (y2 - y1) * i / m]);
    }
    return pts;
  };
  // Hélice d'une vis vue de face entre xg et xd, de y1 à y2 : traits fins obliques.
  const helice = (xg, xd, y1, y2, p) => {
    const t = [];
    for (let y = y1 + p * 0.5; y + p / 2 <= y2 + 0.01; y += p) t.push(h.ligne(xg + 1, y, xd - 1, y + p / 2, h.a.fin));
    return t;
  };
  const brisure = (x, y1, y2, a) => [[x, y2], [x, y1 + 0.62 * (y2 - y1)], [x + a, y1 + 0.54 * (y2 - y1)], [x - a, y1 + 0.46 * (y2 - y1)], [x, y1 + 0.38 * (y2 - y1)], [x, y1]];

  // Petites coupes (temps 2 et 3) : la plaque coupée au droit d'un trou, la vis dedans.
  const TH = 40, P = 5, A = 3;
  const coupeT = (z) => {
    const r = 20, cx = z.l / 2 - 30;
    const yT = z.h / 2 - 8, yB = yT + TH;
    const x0 = cx - 100, x1 = cx + 100;
    const gauche = [[x0, yT], [cx - r, yT], ...filetage(cx - r, yT, yB, A, P).slice(1), [x0, yB], ...brisure(x0, yT, yB, 4).slice(1, -1)];
    const droite = [[x1, yT], [cx + r, yT], ...filetage(cx + r, yT, yB, A, P).slice(1), [x1, yB], ...brisure(x1, yT, yB, 4).slice(1, -1)];
    return { r, cx, yT, yB, x0, x1, gauche, droite };
  };
  const plaqueCoupe = (g) => [
    h.chemin(g.gauche, h.a.hachure('metal'), true),
    h.chemin(g.droite, h.a.hachure('metal'), true),
    h.ligne(g.x0, g.yT, g.cx - g.r, g.yT, h.a.contour),
    h.ligne(g.cx + g.r, g.yT, g.x1, g.yT, h.a.contour),
    h.ligne(g.x0, g.yB, g.cx - g.r, g.yB, h.a.contour),
    h.ligne(g.cx + g.r, g.yB, g.x1, g.yB, h.a.contour),
  ];
  const visCoupe = (g) => [
    ...helice(g.cx - g.r, g.cx + g.r, g.yT, g.yB, P),
    h.ligne(g.cx - g.r, g.yT, g.cx + g.r, g.yT, h.a.arete),
    h.ligne(g.cx - g.r, g.yB, g.cx + g.r, g.yB, h.a.arete),
  ];

  // Grande vue : la ligne entière, mêmes abscisses dessus et en coupe.
  const grande = (z) => ({ x0: 10, x1: z.l - 10, L: ligne(z.l, 20, 6, 40) });

  return {
    ref: '107-10',
    titre: 'La couture de vis, pour la fonte fendue',
    desc: 'Réparer une fonte fendue sans chaleur. Un trou d’arrêt percé à chaque bout de la fissure, puis un premier trou percé et taraudé sur la fente. Une vis d’acier doux ou de laiton vissée dedans, coupée à ras, matée au marteau pour qu’elle s’écrase dans le filet. Le trou suivant se perce à moitié dans la vis d’avant, et ainsi de suite jusqu’à l’autre bout. Vue de dessus, la ligne de vis qui se chevauchent d’un trou d’arrêt à l’autre ; en coupe le long de la fente, chaque vis mordue par le filet de la suivante.',
    format: 'pleine',
    disposition: [['t1', 't2'], ['t3', 't4'], ['plan'], ['coupe']],
    hauteurs: [2, 2, 2, 1.6],
    vues: {
      t1: {
        titre: '1. Les bouts, puis un trou',
        dessin: z => {
          const g = planT(z), L = g.L;
          return [
            ...bande(g.x0, g.x1, g.y0, g.W),
            fente(L.xa, L.xb, g.yc, 2.4),
            trou(L.xa, g.yc, L.rs),
            trou(L.xb, g.yc, L.rs),
            trou(L.c[0], g.yc, L.r),
            filet(L.c[0], g.yc, L.r * 1.2),
          ].join('\n');
        },
        renvois: z => {
          const g = planT(z), L = g.L;
          return [
            { n: 1, rond: [L.xb - 16, g.y0 - 14], cible: [L.xb, g.yc - L.rs - 1], texte: 'trou d’arrêt à chaque bout de la fente' },
            { n: 2, rond: [L.c[0] + 12, g.y0 + g.W + 14], cible: [L.c[0] + 3, g.yc + L.r * 1.2], texte: 'premier trou, percé et taraudé sur la fente' },
          ];
        },
      },
      t2: {
        titre: '2. Visser, couper à ras',
        dessin: z => {
          const g = coupeT(z);
          const e = 8, tl = 2 * g.r + 12, th = 11;
          return [
            ...plaqueCoupe(g),
            ...visCoupe(g),
            h.rect(g.cx - g.r, g.yT - e, 2 * g.r, e, h.a.cache),
            h.rect(g.cx - tl / 2, g.yT - e - th, tl, th, h.a.cache),
          ].join('\n');
        },
        renvois: z => {
          const g = coupeT(z);
          return [
            { n: 3, rond: [g.cx + 34, g.yB + 22], cible: [g.cx + 6, g.yB - 9], texte: 'vis d’acier doux ou de laiton' },
            { n: 4, rond: [g.cx + g.r + 40, g.yT - 30], cible: [g.cx + g.r + 6, g.yT - 13], texte: 'tête coupée à ras de la fonte' },
          ];
        },
      },
      t3: {
        titre: '3. Mater',
        dessin: z => {
          const g = coupeT(z);
          const d = 3, hc = 3;                   // tête écrasée : déborde de 3 px de chaque côté
          const fy = g.yT - hc - 5;              // face du marteau, à 5 px du dessus de la vis
          const lt = 24, ht = 34;
          const hx = g.cx - lt / 2, hy = fy - ht;
          const xg = g.cx - g.r, xd = g.cx + g.r, yf = g.yT + 2 * P;
          return [
            ...plaqueCoupe(g),
            ...visCoupe(g),
            // Les deux filets du haut refermés : la vis a rempli le creux, paroi droite et pleine.
            h.rect(xg - A / 2 - 0.6, g.yT - 0.5, 2 * g.r + A + 1.2, yf - g.yT + 0.5, 'fill="#fff" stroke="none"'),
            h.ligne(xg, g.yT, xg, yf, h.a.contour),
            h.ligne(xd, g.yT, xd, yf, h.a.contour),
            // Le dessus de la vis aplati et élargi par-dessus l'arête du trou.
            h.path(`M ${xg - d} ${g.yT} L ${xg - d} ${g.yT - hc + 1} Q ${xg - d} ${g.yT - hc} ${xg} ${g.yT - hc} L ${xd} ${g.yT - hc} Q ${xd + d} ${g.yT - hc} ${xd + d} ${g.yT - hc + 1} L ${xd + d} ${g.yT} Z`, blanc(h.a.contour)),
            // Le marteau, face en bas, manche vers la droite.
            h.path(`M ${hx} ${fy - 3} L ${hx} ${hy + 6} Q ${hx} ${hy} ${hx + 6} ${hy} L ${hx + lt - 6} ${hy} Q ${hx + lt} ${hy} ${hx + lt} ${hy + 6} L ${hx + lt} ${fy - 3} L ${hx + lt - 2} ${fy} L ${hx + 2} ${fy} Z`, blanc(h.a.contour)),
            h.path(`M ${hx + lt} ${hy + 10} L ${hx + lt + 84} ${hy + 12} L ${hx + lt + 84} ${hy + 18} L ${hx + lt} ${hy + 19} Z`, blanc(h.a.arete)),
            // Le coup : dans l'axe de la vis, pointe contre le dos de la tête.
            h.fleche(`M ${g.cx} ${hy - 26} L ${g.cx} ${hy - 2}`),
          ].join('\n');
        },
        renvois: z => {
          const g = coupeT(z);
          return [
            { n: 5, rond: [g.cx + g.r + 32, g.yT - 13], cible: [g.cx + g.r + 2, g.yT - 1.5], texte: 'matée : elle s’écrase dans le filet' },
          ];
        },
      },
      t4: {
        titre: '4. Le trou suivant',
        dessin: z => {
          const g = planT(z), L = g.L;
          return [
            ...bande(g.x0, g.x1, g.y0, g.W),
            fente(L.xa, L.xb, g.yc, 2.4),
            trou(L.xa, g.yc, L.rs),
            trou(L.xb, g.yc, L.rs),
            vis(L.c[0], g.yc, L.r),
            vis(L.c[1], g.yc, L.r),
            trou(L.c[2], g.yc, L.r),
            filet(L.c[2], g.yc, L.r * 1.2),
          ].join('\n');
        },
        renvois: z => {
          const g = planT(z), L = g.L;
          const rond = [L.c[2] + 24, g.y0 + g.W + 14];
          return [
            { n: 6, rond, cible: [L.c[2] + 2, g.yc + L.r - 2], texte: 'percé à moitié dans la vis d’avant' },
          ];
        },
      },
      plan: {
        titre: 'La fente cousue, vue de dessus',
        dessin: z => {
          const g = grande(z), L = g.L;
          const W = 80, y0 = (z.h - W) / 2, yc = y0 + W / 2;
          return [
            ...bande(g.x0, g.x1, y0, W),
            trou(L.xa, yc, L.rs),
            trou(L.xb, yc, L.rs),
            ...L.c.map(x => vis(x, yc, L.r)),
          ].join('\n');
        },
        renvois: z => {
          const g = grande(z), L = g.L;
          const W = 80, y0 = (z.h - W) / 2, yc = y0 + W / 2;
          const k = Math.round(L.n * 0.62);
          return [
            { n: 7, rond: [L.c[k] + 30, y0 + W + 16], cible: [L.c[k] - 2, yc + L.r - 1], texte: 'vis d’un trou d’arrêt à l’autre' },
          ];
        },
      },
      coupe: {
        titre: 'En coupe, le long de la fente',
        dessin: z => {
          const g = grande(z), L = g.L;
          const t = 40, yT = (z.h - t) / 2 + 2, yB = yT + t;
          const ga = L.xa - L.rs, dr = L.xb + L.rs;           // bords des trous d'arrêt
          const bords = [L.c[0] - L.r, ...L.c.map(x => x + L.r)];  // bord gauche de la 1re vis, puis bord droit de chacune
          const out = [
            h.chemin([[g.x0, yT], [ga, yT], [ga, yB], [g.x0, yB], ...brisure(g.x0, yT, yB, 4).slice(1, -1)], h.a.hachure('metal'), true),
            h.chemin([[g.x1, yT], [dr, yT], [dr, yB], [g.x1, yB], ...brisure(g.x1, yT, yB, 4).slice(1, -1)], h.a.hachure('metal'), true),
          ];
          // Chaque vis : son hélice entre son bord gauche (le filet de son trou) et le filet du trou suivant.
          for (let k = 0; k < L.n; k++) {
            const xg = bords[0] + k * L.r;
            const xd = k === L.n - 1 ? L.c[k] + L.r : L.c[k + 1] - L.r;
            out.push(...helice(xg, xd, yT, yB, P));
          }
          // Les filets : le bord gauche de chaque trou, et le bord droit de la dernière vis.
          for (let k = 0; k < L.n; k++) out.push(h.chemin(filetage(L.c[k] - L.r, yT, yB, A, P), h.a.arete));
          out.push(h.chemin(filetage(L.c[L.n - 1] + L.r, yT, yB, A, P), h.a.arete));
          // Dessus et dessous à ras, d'un bord à l'autre.
          out.push(h.ligne(g.x0, yT, g.x1, yT, h.a.contour), h.ligne(g.x0, yB, g.x1, yB, h.a.contour));
          return out.join('\n');
        },
        renvois: z => {
          const g = grande(z), L = g.L;
          const t = 40, yT = (z.h - t) / 2 + 2, yB = yT + t;
          const k = Math.round(L.n * 0.38);
          return [
            { n: 8, rond: [L.c[k] - L.r - 28, yT - 16], cible: [L.c[k] - L.r, yT + 6], texte: 'chaque vis mord la voisine' },
          ];
        },
      },
    },
  };
};
