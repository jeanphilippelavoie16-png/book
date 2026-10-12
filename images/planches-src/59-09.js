// 59-09 — La trappe de batture (ch. 59, section F, points 29 et 30)
// Aucune cote chiffrée : le chapitre ne donne aucune dimension de la trappe. Il dit : haie de
// piquets et de branchages plantée en V sur le plat, la pointe vers le large, les bras plus
// hauts que la pleine mer ; le poisson entre à la montante, longe la haie à la baisse et reste
// dans la pointe à mer basse, où il se ramasse à sec. Une trappe qu'on ne lève plus s'ouvre.

module.exports = (h) => {
  const f = (n) => Math.round(n * 10) / 10;
  const lerp = (p, q, t) => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t];
  const bez = (p0, p1, p2, p3, t) => {
    const u = 1 - t;
    return [0, 1].map(k => u * u * u * p0[k] + 3 * u * u * t * p1[k] + 3 * u * t * t * p2[k] + t * t * t * p3[k]);
  };
  const d = (pts) => pts.map((p, i) => `${i ? (i === 1 && pts.length === 4 ? 'C' : '') : 'M'}${f(p[0])} ${f(p[1])}`).join(' ');

  // un poisson vu de dessus ou de côté, tête dans la direction ang
  const poisson = (x, y, ang, s = 1) => {
    const pts = [[7, 0], [4, -2.4], [-2, -2.6], [-6, -0.8], [-9.5, -3.2], [-8.5, 0], [-9.5, 3.2], [-6, 0.8], [-2, 2.6], [4, 2.4]];
    const c = Math.cos(ang), sn = Math.sin(ang);
    const P = pts.map(([u, v]) => [f(x + s * (u * c - v * sn)), f(y + s * (u * sn + v * c))]);
    return h.chemin(P, h.a.blanc, true) + '\n' + h.chemin(P, h.a.detail, true);
  };

  // un bout de haie vu de dessus : piquets en noir, deux branchages qui passent devant, derrière
  const haie = (p0, p1, pas = 11) => {
    const dx = p1[0] - p0[0], dy = p1[1] - p0[1], L = Math.hypot(dx, dy), n = Math.max(1, Math.round(L / pas));
    const nx = -dy / L, ny = dx / L;
    const pts = [...Array(n + 1)].map((_, i) => [p0[0] + dx * i / n, p0[1] + dy * i / n]);
    const w = (sg) => pts.map((p, i) => { const e = (i % 2 ? 2 : -2) * sg; return [p[0] + nx * e, p[1] + ny * e]; });
    return [h.chemin(w(1), h.a.detail), h.chemin(w(-1), h.a.detail),
      ...pts.map(p => h.cercle(p[0], p[1], 2.3, h.a.plein))].join('\n');
  };

  // ── le plan ──
  const PL = (z) => {
    const cx = z.l / 2, yT = 0.11 * z.h, yS = 0.9 * z.h, yM = 0.25 * z.h, yP = 0.74 * z.h, W = 0.37 * z.l;
    const A = [cx - W, yM], B = [cx + W, yM], P = [cx, yP];
    const L = Math.hypot(W, yP - yM);
    const inG = [(yP - yM) / L, -W / L];          // vers l'intérieur du V, bras gauche
    const miroir = (p) => [2 * cx - p[0], p[1]];
    // la montante : du large, le long du dehors du bras, par-dessus le bout, dans l'ouverture
    const mont = [[cx - 0.62 * W, yS - 4], [cx - W - 12, yP - 6], [cx - W - 34, yM - 24], [cx - W + 42, yM - 6]];
    // la baisse : dans le V, le long du bras, vers la pointe
    const off = (p, k) => [p[0] + inG[0] * k, p[1] + inG[1] * k];
    const bas = [off(lerp(A, P, 0.1), 26), off(lerp(A, P, 0.66), 20)];
    // l'eau qui passe au travers des branchages, près de la pointe
    const eau = [0.72, 0.88].map(t => { const q = lerp(A, P, t); return [off(q, 9), off(q, -17)]; });
    return { cx, yT, yS, yM, yP, W, A, B, P, mont, bas, eau, miroir };
  };

  // ── l'élévation, le long d'un bras : la terre à gauche, le large à droite ──
  const EL = (z) => {
    const x1 = 0.14 * z.l;
    const g = (x) => x <= x1 ? 0.1 * z.h + (x / x1) * 0.36 * z.h : 0.46 * z.h + ((x - x1) / (z.l - x1)) * 0.38 * z.h;
    const gx = (y) => y <= 0.46 * z.h ? (y - 0.1 * z.h) / (0.36 * z.h) * x1 : x1 + (y - 0.46 * z.h) / (0.38 * z.h) * (z.l - x1);
    const xm = 0.25 * z.l, xp = 0.69 * z.l;
    const yTop = 0.13 * z.h, yPM = 0.24 * z.h, yMo = 0.6 * z.h, yMB = 0.765 * z.h;
    return { g, gx, xm, xp, yTop, yPM, yMo, yMB };
  };

  // ── la haie de près ──
  const DE = (z) => {
    const gG = 0.6 * z.h, top = 0.1 * z.h, bout = 0.95 * z.h;
    const xs = [0.22, 0.42, 0.62, 0.82].map(t => t * z.l);
    const xa = 0.12 * z.l, xb = 0.93 * z.l;
    const rangs = [];
    for (let y = top + 7; y < gG - 3; y += 10) rangs.push(y);
    return { gG, top, bout, xs, xa, xb, rangs };
  };

  // ── la brèche ──
  const BR = (z) => {
    const cx = 0.46 * z.l, yP = 0.62 * z.h, yS = 0.86 * z.h;
    const A = [cx - 0.4 * z.l, 0.04 * z.h], B = [cx + 0.4 * z.l, 0.04 * z.h], P = [cx, yP];
    const t0 = 0.66;
    return { cx, yP, yS, A, B, P, t0, qa: lerp(A, P, t0), qb: lerp(B, P, t0) };
  };

  const mer = (z, y0) => {
    const pts = [];
    for (let x = 0; x <= z.l + 0.1; x += z.l / 12) pts.push([x, y0 + (Math.round(x / (z.l / 12)) % 2 ? 2.5 : -2.5)]);
    return h.chemin([...pts, [z.l, z.h], [0, z.h]], h.a.hachure('eau', 'aucun'), true) + '\n' + h.chemin(pts, h.a.arete);
  };

  return {
    ref: '59-09',
    titre: 'La trappe de batture',
    desc: 'Vue de dessus, une haie de piquets et de branchages plantée en V sur la batture plate, la pointe vers le large et l’ouverture côté terre. À la marée montante, le poisson contourne les bras et entre par l’ouverture ; à la baisse, il longe la haie en cherchant le large, l’eau passe au travers des branchages et le poisson reste dans la pointe, où il se ramasse à sec à mer basse. En élévation le long d’un bras, le dessus de la haie passe la pleine mer d’un bout à l’autre, donc plus haut vers la pointe, où la batture descend. De près, les piquets appointés enfoncés dans la batture et les branchages passés devant, derrière. Pour la fermer, on ouvre la pointe en arrachant ses piquets, et le poisson repart avec la baisse.',
    format: 'pleine',
    disposition: [['plan'], ['elevation'], ['detail', 'breche']],
    hauteurs: [3, 2, 2],
    largeurs: [[1], [1], [3, 2]],
    vues: {
      plan: {
        titre: 'Vu de dessus',
        dessin: z => {
          const p = PL(z), out = [];
          // le haut de grève, côté terre
          const rive = [];
          for (let x = 0; x <= z.l + 0.1; x += z.l / 10) rive.push([x, p.yT + (Math.round(x / (z.l / 10)) % 2 ? 3 : -2)]);
          out.push(h.chemin([[0, 0], [z.l, 0], ...rive.slice().reverse()], h.a.hachure('gravier', 'aucun'), true));
          out.push(h.chemin(rive, h.a.arete));
          // le large, à mer basse
          out.push(mer(z, p.yS));
          // la haie
          out.push(haie(p.A, p.P), haie(p.B, p.P));
          // la montante, des deux côtés
          out.push(h.fleche(d(p.mont), h.a.arete));
          out.push(h.fleche(d(p.mont.map(p.miroir)), h.a.arete));
          // la baisse, dans le V
          out.push(h.fleche(d(p.bas), h.a.arete));
          out.push(h.fleche(d(p.bas.map(p.miroir)), h.a.arete));
          // l'eau au travers des branchages
          for (const [a, b] of p.eau) {
            out.push(h.fleche(d([a, b]), h.a.cache));
            out.push(h.fleche(d([p.miroir(a), p.miroir(b)]), h.a.cache));
          }
          // le poisson resté dans la pointe
          const v = Math.PI / 2;
          out.push(poisson(p.cx, p.yP - 15, v - 0.1), poisson(p.cx - 9, p.yP - 31, v + 0.25),
            poisson(p.cx + 10, p.yP - 34, v - 0.3), poisson(p.cx, p.yP - 50, v + 0.1));
          return out.join('\n');
        },
        renvois: z => {
          const p = PL(z);
          const hb = lerp(p.B, p.P, 0.42);
          const m = bez(...p.mont, 0.45);
          const bm = lerp(...p.bas, 0.55);
          const e = p.miroir(p.eau[0][1]);
          return [
            { n: 1, rond: [f(hb[0] + 52), f(hb[1] - 6)], cible: [f(hb[0] + 3), f(hb[1])], texte: 'haie de piquets, branchages' },
            { n: 2, rond: [f(m[0] - 26), f(m[1] + 10)], cible: [f(m[0] - 1), f(m[1])], texte: 'montante : le poisson entre' },
            { n: 3, rond: [f(p.cx - 14), f(p.yM + 0.3 * (p.yP - p.yM))], cible: [f(bm[0] + 2), f(bm[1])], texte: 'baisse : il longe la haie' },
            { n: 4, rond: [f(e[0] + 40), f(e[1] + 8)], cible: [f(e[0] + 2), f(e[1])], texte: 'l’eau passe au travers' },
            { n: 5, rond: [f(p.cx - 58), f(p.yP + 14)], cible: [f(p.cx - 3), f(p.yP - 2)], texte: 'la pointe : il y reste à sec' },
          ];
        },
      },
      elevation: {
        titre: 'En élévation, le long d’un bras',
        dessin: z => {
          const e = EL(z), out = [];
          const sol = [[0, e.g(0)], [0.14 * z.l, e.g(0.14 * z.l)], [z.l, e.g(z.l)]];
          // la mer basse, du bord de l'eau au large
          const xb = e.gx(e.yMB);
          out.push(h.chemin([[xb, e.yMB], [z.l, e.yMB], [z.l, e.g(z.l)]], h.a.hachure('eau', 'aucun'), true));
          out.push(h.ligne(xb, e.yMB, z.l, e.yMB, h.a.arete));
          // la pleine mer et la montante
          out.push(h.ligne(e.gx(e.yPM), e.yPM, z.l, e.yPM, h.a.arete));
          out.push(h.ligne(e.gx(e.yMo), e.yMo, z.l, e.yMo, h.a.cache));
          for (const y of [e.yPM, e.yMo, e.yMB]) {
            const x = 0.95 * z.l;
            out.push(h.chemin([[x - 5, y - 8], [x + 5, y - 8], [x, y]], h.a.detail, true));
          }
          // la batture
          out.push(h.chemin([...sol, [z.l, z.h], [0, z.h]], h.a.hachure('terre', 'aucun'), true));
          out.push(h.chemin(sol, h.a.arete));
          // la haie, devant l'eau
          const bord = [[e.xm, e.yTop], [e.xp, e.yTop], [e.xp, e.g(e.xp)], [e.xm, e.g(e.xm)]];
          out.push(h.chemin(bord, h.a.blanc, true), h.chemin(bord, h.a.hachure('paille', 'aucun'), true));
          for (let x = e.xm; x <= e.xp + 0.1; x += (e.xp - e.xm) / 12) {
            out.push(h.ligne(x, e.yTop - 4, x, e.g(x), h.a.arete));
          }
          out.push(h.chemin(bord, h.a.arete, true));
          out.push(h.chemin(sol, h.a.arete));
          return out.join('\n');
        },
        renvois: z => {
          const e = EL(z);
          const xr = 0.82 * z.l;
          return [
            { n: 6, rond: [f(e.xp + 30), f(e.yTop - 2)], cible: [f(e.xp - 4), f(e.yTop)], texte: 'plus haut que la pleine mer' },
            { n: 7, rond: [f(xr), f(e.yPM - 12)], cible: [f(xr - 22), f(e.yPM)], texte: 'pleine mer' },
            { n: 8, rond: [f(xr), f(e.yMo - 14)], cible: [f(xr - 22), f(e.yMo)], texte: 'marée montante' },
            { n: 9, rond: [f(0.9 * z.l), f(e.yMB + 14)], cible: [f(0.86 * z.l), f(e.yMB + 5)], texte: 'mer basse : pointe à sec' },
          ];
        },
      },
      detail: {
        titre: 'La haie, de près',
        dessin: z => {
          const k = DE(z), out = [];
          out.push(h.rect(0, k.gG, z.l, z.h - k.gG, h.a.hachure('terre', 'aucun')));
          const branche = (i, y, x0, x1) => {
            const sens = i % 2 ? 1 : -1;
            const ep = (x) => { const t = (x - k.xa) / (k.xb - k.xa); return 2.2 + 3.6 * (sens > 0 ? 1 - t : t); };
            const cy = (x) => y + 1.6 * Math.sin(Math.PI * (x - k.xa) / (k.xb - k.xa)) * (i % 3 === 1 ? -1 : 1);
            const n = Math.max(2, Math.ceil((x1 - x0) / 12));
            const xs = [...Array(n + 1)].map((_, j) => x0 + (x1 - x0) * j / n);
            return { haut: xs.map(x => [x, cy(x) - ep(x) / 2]), bas: xs.map(x => [x, cy(x) + ep(x) / 2]), cy, ep };
          };
          // les branchages, derrière
          k.rangs.forEach((y, i) => {
            const b = branche(i, y, k.xa, k.xb);
            const pol = [...b.haut, ...b.bas.slice().reverse()];
            out.push(h.chemin(pol, h.a.blanc, true), h.chemin(pol, h.a.detail, true));
            // le petit bout de la branche, fourchu
            const xe = i % 2 ? k.xb : k.xa, dx = i % 2 ? 1 : -1, ye = b.cy(xe);
            out.push(h.ligne(xe, ye, xe + 8 * dx, ye - 2, h.a.fin), h.ligne(xe - 3 * dx, ye, xe + 5 * dx, ye + 3, h.a.fin));
          });
          // les piquets, appointés, enfoncés
          for (const x of k.xs) {
            const r = 5;
            const pq = [[x - r, k.top], [x + r, k.top], [x + r, k.bout - 12], [x, k.bout], [x - r, k.bout - 12]];
            out.push(h.chemin(pq, h.a.blanc, true), h.chemin(pq, h.a.arete, true));
            out.push(h.ellipse(x, k.top, r, 1.8, h.a.detail));
          }
          // les branchages qui passent devant un piquet sur deux
          k.rangs.forEach((y, i) => k.xs.forEach((x, j) => {
            if ((i + j) % 2) return;
            const b = branche(i, y, x - 7, x + 7);
            out.push(h.chemin([...b.haut, ...b.bas.slice().reverse()], h.a.blanc, true));
            out.push(h.chemin(b.haut, h.a.detail), h.chemin(b.bas, h.a.detail));
          }));
          out.push(h.ligne(0, k.gG, z.l, k.gG, h.a.arete));
          return out.join('\n');
        },
        renvois: z => {
          const k = DE(z);
          return [
            { n: 10, rond: [f(k.xs[0] - 28), f(0.8 * z.h)], cible: [f(k.xs[0] - 5), f(0.8 * z.h)], texte: 'piquet appointé, enfoncé' },
            { n: 11, rond: [f(k.xa - 18), f(k.rangs[1] - 10)], cible: [f(k.xa + 6), f(k.rangs[1])], texte: 'branchages devant, derrière' },
          ];
        },
      },
      breche: {
        titre: 'Fermée : la pointe ouverte',
        dessin: z => {
          const b = BR(z), out = [];
          out.push(mer(z, b.yS));
          out.push(haie(b.A, b.qa), haie(b.B, b.qb));
          // les trous des piquets arrachés
          for (const q of [b.qa, b.qb]) {
            const n = 4;
            for (let i = 1; i <= n; i++) {
              const p = lerp(q, b.P, i / n);
              if (q === b.qb && i === n) continue;
              out.push(h.cercle(p[0], p[1], 2.3, h.a.fin));
            }
          }
          // les piquets arrachés, couchés sur la batture
          for (let i = 0; i < 3; i++) {
            const x0 = 0.72 * z.l, y0 = 0.5 * z.h + i * 9, lg = 0.2 * z.l;
            const pq = [[x0, y0 - 2.5], [x0 + lg - 6, y0 - 2.5], [x0 + lg, y0], [x0 + lg - 6, y0 + 2.5], [x0, y0 + 2.5]];
            out.push(h.chemin(pq, h.a.blanc, true), h.chemin(pq, h.a.detail, true));
          }
          // le poisson repart avec la baisse
          out.push(h.fleche(d([[b.cx, 0.22 * z.h], [b.cx, 0.97 * z.h]]), h.a.arete));
          out.push(poisson(b.cx - 11, 0.4 * z.h, Math.PI / 2), poisson(b.cx + 11, b.yP + 2, Math.PI / 2 + 0.15));
          return out.join('\n');
        },
        renvois: z => {
          const b = BR(z);
          return [
            { n: 12, rond: [f(0.8 * z.l), f(0.3 * z.h)], cible: [f(0.8 * z.l), f(0.5 * z.h - 4)], texte: 'piquets arrachés à la pointe' },
            { n: 13, rond: [f(b.cx - 30), f(0.8 * z.h)], cible: [f(b.cx - 1), f(0.8 * z.h)], texte: 'le poisson repart au large' },
          ];
        },
      },
    },
    danger: 'Danger — sur une batture, la marée ne revient pas par devant : elle remonte les chenaux derrière soi avant de recouvrir la pointe où l’on ramasse, et on se retrouve au sec sur une butte, de l’eau froide entre soi et la terre. Le chemin de retraite se marche à sec avant de descendre, et l’heure de la pleine mer suivante s’écrit sur la main.',
  };
};
