// Planche 61-09 — le camp de viande : refroidir, couvrir, boucaner, suspendre
// (chapitre 36, section 9, « Le travail, seul et sans rien », points 6 à 10).
module.exports = (h) => {
  // ── outils de géométrie ──────────────────────────────────────────────────────────────
  const f = n => (+n).toFixed(1);
  const D = (pts, ferme) => 'M ' + pts.map(p => f(p[0]) + ' ' + f(p[1])).join(' L ') + (ferme ? ' Z' : '');
  const FOND = h.a.blanc.match(/fill="[^"]*"/)[0];
  const plein = attrs => attrs.replace('fill="none"', FOND);
  let graine = 11;
  const alea = () => { graine = (graine * 16807) % 2147483647; return graine / 2147483647; };
  const entre = (a, b) => a + (b - a) * alea();
  const lisse = t => t * t * (3 - 2 * t);
  const borne = t => Math.min(1, Math.max(0, t));

  // forme fermée irrégulière autour d'un centre ; k = [[amplitude, fréquence, phase], …]
  const galet = (cx, cy, rx, ry, k = [], n = 64) => Array.from({ length: n }, (_, i) => {
    const a = i / n * 2 * Math.PI;
    const r = 1 + k.reduce((s, [am, fr, ph]) => s + am * Math.sin(fr * a + ph), 0);
    return [cx + rx * r * Math.cos(a), cy + ry * r * Math.sin(a)];
  });
  const quad = (a, c, b, n = 24) => Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n, u = 1 - t;
    return [0, 1].map(k => u * u * a[k] + 2 * u * t * c[k] + t * t * b[k]);
  });
  const normales = pts => pts.map((p, i) => {
    const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
    const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1;
    return [-dy / L, dx / L];
  });
  const decale = (pts, d) => { const N = normales(pts); return pts.map((p, i) => [p[0] + N[i][0] * d, p[1] + N[i][1] * d]); };

  // aiguilles le long d'une tige (rameau de sapin ou d'épinette)
  const aiguilles = (pts, long = 3.6, pas = 3, attrs = h.a.fin) => {
    const out = [];
    let acc = pas / 2;
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1], b = pts[i];
      const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1;
      const ux = dx / L, uy = dy / L;
      let s = acc;
      for (; s < L; s += pas) {
        const x = a[0] + ux * s, y = a[1] + uy * s;
        for (const c of [-1, 1]) {
          const vx = ux * 0.6 - c * uy * 0.8, vy = uy * 0.6 + c * ux * 0.8;
          out.push(`M ${f(x)} ${f(y)} L ${f(x + vx * long)} ${f(y + vy * long)}`);
        }
      }
      acc = s - L;
    }
    return h.path(out.join(' '), attrs);
  };
  const rameau = (x0, y0, dir, long, chute, aig = 3.4) => {
    const pts = Array.from({ length: 13 }, (_, i) => { const t = i / 12; return [x0 + dir * long * t, y0 + chute * t * t]; });
    return [h.path(D(pts), h.a.detail), aiguilles(pts.slice(1), aig, 2.8)].join('\n');
  };

  // un sac de coton plein, pendu par le col (élévation)
  const sac = (cx, haut, l, ht, loin = false) => {
    const w = l / 2, b = haut + ht;
    const d = `M ${f(cx - 3)} ${f(haut)} C ${f(cx - 7)} ${f(haut + 8)} ${f(cx - w)} ${f(haut + 9)} ${f(cx - w)} ${f(haut + ht * 0.5)}`
      + ` C ${f(cx - w)} ${f(haut + ht * 0.86)} ${f(cx - w * 0.55)} ${f(b + 1)} ${f(cx - w * 0.05)} ${f(b)}`
      + ` C ${f(cx + w * 0.55)} ${f(b - 1)} ${f(cx + w * 1.02)} ${f(haut + ht * 0.84)} ${f(cx + w * 0.96)} ${f(haut + ht * 0.48)}`
      + ` C ${f(cx + w * 0.95)} ${f(haut + 9)} ${f(cx + 7)} ${f(haut + 8)} ${f(cx + 3)} ${f(haut)} Z`;
    const plis = [
      `M ${f(cx - 2)} ${f(haut + 4)} C ${f(cx - w * 0.3)} ${f(haut + 13)} ${f(cx - w * 0.5)} ${f(haut + ht * 0.3)} ${f(cx - w * 0.55)} ${f(haut + ht * 0.46)}`,
      `M ${f(cx + 2)} ${f(haut + 4)} C ${f(cx + w * 0.25)} ${f(haut + 15)} ${f(cx + w * 0.38)} ${f(haut + ht * 0.28)} ${f(cx + w * 0.42)} ${f(haut + ht * 0.4)}`,
      `M ${f(cx)} ${f(haut + 6)} C ${f(cx - 1)} ${f(haut + ht * 0.15)} ${f(cx - 3)} ${f(haut + ht * 0.22)} ${f(cx - 4)} ${f(haut + ht * 0.28)}`,
      `M ${f(cx - w * 0.4)} ${f(b - 3)} C ${f(cx - w * 0.2)} ${f(b - 8)} ${f(cx + w * 0.1)} ${f(b - 7)} ${f(cx + w * 0.3)} ${f(b - 3)}`,
    ].join(' ');
    const frange = `M ${f(cx - 2.5)} ${f(haut - 1)} L ${f(cx - 6)} ${f(haut - 7)} M ${f(cx + 2.5)} ${f(haut - 1)} L ${f(cx + 6)} ${f(haut - 7)}`;
    const noeud = `M ${f(cx - 4.5)} ${f(haut - 1)} L ${f(cx + 4.5)} ${f(haut - 1)} M ${f(cx - 4)} ${f(haut + 2)} L ${f(cx + 4)} ${f(haut + 2)}`;
    // la charte : un sac derrière un autre recule, en gris loin
    const fond = loin ? h.a.contour.replace('fill="none"', 'fill="#E6E6E6"') : plein(h.a.contour);
    return [h.path(d, fond), h.path(plis, h.a.fin), h.path(frange, h.a.detail), h.path(noeud, h.a.arete)].join('\n');
  };

  // un morceau de viande en coupe : la chair, l'os, le fil des fibres
  const morceau = (cx, cy, rx, ry, base, k) => {
    const pts = galet(cx, cy, rx, ry, k).map(p => [p[0], Math.min(p[1], base)]);
    const fibres = [0.72, 0.46].map(s => galet(cx, cy, rx * s, ry * s, k).slice(8, 30)).map(p => h.path(D(p), h.a.fin));
    return [
      h.path(D(pts, true), plein(h.a.contour)),
      ...fibres,
      h.ellipse(f(cx + rx * 0.12), f(cy + ry * 0.1), f(rx * 0.2), f(ry * 0.25), plein(h.a.arete)),
      h.ellipse(f(cx + rx * 0.12), f(cy + ry * 0.1), f(rx * 0.1), f(ry * 0.12), h.a.detail),
    ].join('\n');
  };

  // un tronc d'arbre coupé par le haut du cadre, évasé au sol
  const tronc = (x, y1, lb, lh) => {
    const g = [[x - lh / 2, 0], [x - lb / 2, y1 - 12], [x - lb / 2 - 5, y1]];
    const d = [[x + lb / 2 + 5, y1], [x + lb / 2, y1 - 12], [x + lh / 2, 0]];
    const ecorce = [];
    for (let i = 0; i < 30; i++) {
      const t = alea(), y = (y1 - 16) * t, w = lh + (lb - lh) * t;
      const xx = x + (alea() - 0.5) * (w - 6), l = entre(5, 11);
      ecorce.push(`M ${f(xx)} ${f(y)} L ${f(xx + entre(-0.6, 0.6))} ${f(y + l)}`);
    }
    // la charte : la face à l'ombre du tronc, à droite, peinte avant le trait
    const ombre = [[x + lh / 6, 0], [x + lh / 2, 0], [x + lb / 2, y1 - 12], [x + lb / 2 + 5, y1], [x + lb / 6 + 3, y1], [x + lb / 6, y1 - 12]];
    return [h.path(D(g.concat(d), true), h.a.blanc), h.path(D(ombre, true), h.a.ombre), h.path(`${D(g)} ${D(d)}`, h.a.contour), h.path(ecorce.join(' '), h.a.fin)].join('\n');
  };

  const sol = (x0, x1, y) => {
    const touffes = [];
    for (let x = x0 + 8; x < x1 - 6; x += entre(16, 30)) touffes.push(`M ${f(x - 3)} ${f(y)} L ${f(x - 4)} ${f(y - 4)} M ${f(x)} ${f(y)} L ${f(x + 0.5)} ${f(y - 5)} M ${f(x + 3)} ${f(y)} L ${f(x + 4.5)} ${f(y - 3.5)}`);
    return [h.ligne(x0, y, x1, y, h.a.arete), h.path(touffes.join(' '), h.a.fin)].join('\n');
  };

  // ── vue 1 : sur la neige, en coupe ───────────────────────────────────────────────────
  const litNeige = z => {
    const L = z.l, H = z.h;
    const y0 = H - 56;
    const dessus = Array.from({ length: 31 }, (_, i) => { const x = 4 + (L - 8) * i / 30; return [x, y0 + 2 * Math.sin(i * 1.3) + 1.2 * Math.sin(i * 0.45)]; });
    const neige = [h.path(D(dessus.concat([[L - 4, H - 4], [4, H - 4]]), true), h.a.hachure('neige', 'aucun')), h.path(D(dessus), h.a.contour)];
    // le lit : des branches de sapin couchées en plusieurs épaisseurs, à même la neige ;
    // assez épais pour que la viande ne s'y enfonce pas quand la neige fond dessous
    const yl = y0 - 16;
    const tige = (x0, x1, y, pente, ph) => Array.from({ length: 21 }, (_, i) => { const x = x0 + (x1 - x0) * i / 20; return [x, y + pente * i / 20 + 1.1 * Math.sin(i * 0.9 + ph)]; });
    const tiges = [
      tige(0.04 * L, 0.54 * L, y0 - 5, -1, 0), tige(0.46 * L, 0.96 * L, y0 - 4.5, 1, 1),
      tige(0.1 * L, 0.62 * L, y0 - 10, 1.5, 2), tige(0.38 * L, 0.9 * L, y0 - 10.5, -1.5, 0.5),
      tige(0.05 * L, 0.66 * L, yl, 0, 1.4), tige(0.34 * L, 0.95 * L, yl + 1, 0, 2.3),
    ];
    const lit = tiges.map(t => [h.path(D(t), h.a.arete), aiguilles(t.slice(1), 3.4, 2.6, h.a.detail)].join('\n'));
    // la viande posée dessus
    const cx = 0.5 * L, base = yl - 3, ry = 31, cy = base - 28;
    const viande = morceau(cx, cy, 0.2 * L, ry, base, [[0.06, 2, 0.4], [0.04, 3, 1.2]]);
    // l'écorce de bouleau, deux feuilles qui se chevauchent, roulées au bout
    const feuille = (p0, c, p1, sens) => {
      const m = quad(p0, c, p1, 30);
      const a = decale(m, 1.7), b = decale(m, -1.7);
      const roule = h.cercle(f(p0[0] + sens * 3.2), f(p0[1] + 1), 3.4, h.a.arete);
      const lenticelles = m.filter((_, i) => i % 4 === 2).map(p => `M ${f(p[0] - 1.8)} ${f(p[1])} L ${f(p[0] + 1.8)} ${f(p[1])}`).join(' ');
      return [roule, h.path(D(a.concat(b.slice().reverse()), true), plein(h.a.arete)), h.path(lenticelles, h.a.detail)].join('\n');
    };
    const ecorce = [
      feuille([cx - 0.32 * L, base - 2], [cx - 0.29 * L, cy - ry - 18], [cx + 0.09 * L, cy - ry - 6], -1),
      feuille([cx + 0.32 * L, base - 2], [cx + 0.29 * L, cy - ry - 20], [cx - 0.1 * L, cy - ry - 9], 1),
    ];
    return { dessin: [...neige, ...lit, viande, ...ecorce].join('\n'), yl, cx, cy, ry, base };
  };

  // ── vue 2 : au ruisseau, en coupe ────────────────────────────────────────────────────
  const auRuisseau = z => {
    const L = z.l, H = z.h;
    const yRive = 0.3 * H, yFond = 0.86 * H, yEau = 0.4 * H;
    const fondY = x => {
      const g = lisse(borne((x - 0.1 * L) / (0.2 * L)));
      const d = lisse(borne((x - 0.8 * L) / (0.14 * L)));
      return yRive + (yFond - yRive) * g - (yFond - yRive - 0.05 * H) * d + 1.6 * Math.sin(x * 0.11);
    };
    const lit = Array.from({ length: 81 }, (_, i) => { const x = 4 + (L - 8) * i / 80; return [x, fondY(x)]; });
    const mouille = lit.filter(p => p[1] > yEau);
    const xa = mouille[0][0], xb = mouille[mouille.length - 1][0];
    const eau = h.path(D([[xa, yEau], ...mouille, [xb, yEau]], true), h.a.hachure('eau', 'aucun'));
    const terre = h.path(D(lit.concat([[L - 4, H - 4], [4, H - 4]]), true), h.a.hachure('terre', 'aucun'));
    const galets = [0.34, 0.41, 0.74, 0.79, 0.85].map((t, i) => {
      const x = t * L, rx = entre(4, 7), ry = rx * 0.6;
      return h.path(D(galet(x, fondY(x) - ry * 0.6, rx, ry, [[0.08, 3, i]]), true), plein(h.a.detail));
    });
    // le sac étanche, fermé, au fond ; la viande dedans, au sec
    const cx = 0.56 * L, base = yFond - 1;
    const sacPts = galet(cx, base - 21, 0.2 * L, 25, [[0.05, 2, 1], [0.03, 3, 0.3]]).map(p => [p[0], Math.min(p[1], base)]);
    const viande = morceau(cx + 3, base - 17, 0.15 * L, 16, base - 3, [[0.05, 2, 0.8], [0.04, 3, 2]]);
    // le col : tordu, replié, noué
    const c0 = [cx - 0.14 * L, base - 38], c1 = [cx - 0.2 * L, base - 55];
    const col = [
      h.path(`M ${f(c0[0] - 7)} ${f(c0[1] + 5)} C ${f(c0[0] - 10)} ${f(c0[1] - 6)} ${f(c1[0] - 2)} ${f(c1[1] + 8)} ${f(c1[0] - 2)} ${f(c1[1])}`
        + ` L ${f(c1[0] + 2)} ${f(c1[1] - 1)} C ${f(c1[0] + 3)} ${f(c1[1] + 8)} ${f(c0[0] + 2)} ${f(c0[1] - 6)} ${f(c0[0] + 7)} ${f(c0[1] - 2)}`, plein(h.a.arete)),
      h.path(`M ${f(c1[0] - 3)} ${f(c1[1] + 8)} L ${f(c1[0] + 4)} ${f(c1[1] + 5)} M ${f(c1[0] - 5)} ${f(c1[1] + 14)} L ${f(c1[0] + 3)} ${f(c1[1] + 12)}`, h.a.fin),
      h.path(`M ${f(c1[0] - 4)} ${f(c1[1] + 1)} L ${f(c1[0] + 4)} ${f(c1[1] - 1)} M ${f(c1[0] - 4)} ${f(c1[1] + 4)} L ${f(c1[0] + 4)} ${f(c1[1] + 2)}`, h.a.arete),
      h.path(`M ${f(c1[0] - 1)} ${f(c1[1] - 1)} L ${f(c1[0] - 5)} ${f(c1[1] - 7)} M ${f(c1[0] + 1.5)} ${f(c1[1] - 1.5)} L ${f(c1[0] + 1)} ${f(c1[1] - 8)}`, h.a.detail),
    ];
    const froncesPts = [[-0.02, 0.2], [0.03, 0.3], [0.1, 0.36]].map(([dx, dy]) =>
      `M ${f(c0[0] + 3)} ${f(c0[1] + 1)} Q ${f(c0[0] + 0.08 * L)} ${f(c0[1] + 4)} ${f(c0[0] + (dx + 0.14) * L)} ${f(c0[1] + dy * 60)}`);
    const fronces = h.path(froncesPts.join(' '), h.a.fin);
    // le piquet planté dans la rive, la corde qui y mène
    const p0 = [0.1 * L, yRive + 16], p1 = [0.135 * L, yRive - 22];
    const tp = (yRive - p0[1]) / (p1[1] - p0[1]), pS = [p0[0] + (p1[0] - p0[0]) * tp, yRive];
    const piquet = [
      h.path(D([[pS[0] - 2.2, pS[1]], [p1[0] - 2.2, p1[1]], [p1[0] + 2.2, p1[1] - 1], [pS[0] + 2.2, pS[1]]]), plein(h.a.arete)),
      h.ligne(f(p0[0]), f(p0[1]), f(pS[0]), f(pS[1]), h.a.cache),
    ];
    const yN = yRive - 14, xN = pS[0] + (p1[0] - pS[0]) * ((pS[1] - yN) / (pS[1] - p1[1]));
    const corde = [
      h.path(`M ${f(c1[0])} ${f(c1[1] + 2)} C ${f(c1[0] - 12)} ${f(yEau + 4)} ${f(xN + 20)} ${f(yN + 16)} ${f(xN + 2.5)} ${f(yN)}`, h.a.arete),
      h.path(`M ${f(xN - 3.5)} ${f(yN - 3)} L ${f(xN + 3.5)} ${f(yN)} M ${f(xN - 3.5)} ${f(yN + 1)} L ${f(xN + 3.5)} ${f(yN + 4)}`, h.a.arete),
    ];
    const surface = h.path(D([[xa, yEau], [xb, yEau]]), h.a.arete);
    const pierreP = galet(cx + 0.05 * L, base - 50, 19, 10, [[0.07, 3, 0.5], [0.05, 5, 1]]);
    const pierre = h.path(D(pierreP, true), h.a.hachure('pierre', 'contour'));
    return {
      dessin: [eau, terre, h.path(D(lit), h.a.contour), ...galets, surface, ...piquet, ...corde,
        h.path(D(sacPts, true), plein(h.a.arete)), fronces, viande, ...col, pierre,
        // la charte : le point à contrôler, le col noué (c'est par là que l'eau entre)
        h.controle(c1[0], c1[1] + 6, 13)].join('\n'),
      c1, xN, yN, cx, base, pierreP, L, H,
    };
  };

  // ── vue 3 : par redoux ───────────────────────────────────────────────────────────────
  const parRedoux = z => {
    const L = z.l, H = z.h, yg = H - 12;
    const xT = 14, yB = 26;
    const branche = [[xT + 7, yB - 5], [0.93 * L, yB + 4], [0.93 * L, yB + 8], [xT + 7, yB + 5]];
    const xs = 0.57 * L, haut = 0.27 * H, ls = 0.36 * L, hs = 0.38 * H;
    const yBx = x => yB + (x - xT - 7) / (0.93 * L - xT - 7) * 6;
    const corde = [
      h.ellipse(f(xs), f(yBx(xs)), 3, 5.5, h.a.arete),
      h.ligne(f(xs), f(yBx(xs) + 5), f(xs), f(haut - 1), h.a.arete),
    ];
    const vent = [0.36, 0.5, 0.64].map((t, i) => {
      const y = t * H, x0 = 0.18 * L + i * 4, x1 = xs - ls / 2 - 10;
      return h.fleche(`M ${f(x0)} ${f(y)} C ${f(x0 + 20)} ${f(y - 6)} ${f(x1 - 24)} ${f(y + 6)} ${f(x1)} ${f(y)}`);
    });
    const vapeur = [0.33, 0.46, 0.59].map((t, i) => {
      const y = t * H, x0 = xs + ls / 2 + 8;
      return h.path(`M ${f(x0)} ${f(y)} C ${f(x0 + 8)} ${f(y - 8)} ${f(x0 + 10)} ${f(y + 2)} ${f(x0 + 18)} ${f(y - 6)} S ${f(x0 + 26)} ${f(y - 4)} ${f(x0 + 30)} ${f(y - 12)}`, h.a.detail);
    });
    const goutte = (x, y) => `M ${f(x)} ${f(y)} C ${f(x - 2)} ${f(y + 3)} ${f(x - 2.6)} ${f(y + 5)} ${f(x)} ${f(y + 6.5)} C ${f(x + 2.6)} ${f(y + 5)} ${f(x + 2)} ${f(y + 3)} ${f(x)} ${f(y)} Z`;
    const gouttes = h.path([[xs - 4, haut + hs + 7], [xs + 6, haut + hs + 16], [xs - 1, haut + hs + 28]].map(p => goutte(...p)).join(' '), h.a.detail);
    return {
      dessin: [
        tronc(xT, yg, 22, 16),
        h.path(D(branche, true), plein(h.a.arete)),
        rameau(0.62 * L, yB + 4, 1, 0.26 * L, 12), rameau(0.35 * L, yB + 2, 1, 0.16 * L, 10),
        sol(0, L, yg), ...corde, sac(xs, haut, ls, hs), ...vent, ...vapeur, gouttes,
      ].join('\n'),
      xs, haut, ls, hs,
    };
  };

  // ── vue 4 : hors de portée, sur la boucane ───────────────────────────────────────────
  const surBoucane = z => {
    const L = z.l, H = z.h, yg = H - 16;
    const xG = 42, xD = L - 42, lb = 24, lh = 15;
    const larg = y => lh + (lb - lh) * y / (yg - 12);
    const yC = 0.18 * H, fl = 0.07 * H;
    const A = [xG + larg(yC) / 2, yC + 2], B = [xD - larg(yC) / 2, yC + 2];
    const xm = (A[0] + B[0]) / 2, dm = (B[0] - A[0]) / 2;
    // la corde tendue haut entre les deux troncs : elle plie en V sous la charge, au milieu
    const yP = yC + 2 + fl;
    const cordeY = x => yC + 2 + fl * (1 - Math.abs(x - xm) / dm);
    const corde = h.path(D([A, [xm, yP], B]), h.a.arete);
    // la corde de hissage : lancée par-dessus le milieu, les morceaux au bout, l'autre bout
    // tiré à terre et noué au tronc de gauche à hauteur de main
    const yT = yg - 0.3 * (yg - yC), xT = xG + larg(yT) / 2 + 0.5;
    const K = [xm, yP + 38];
    const hissage = h.path(`M ${f(K[0])} ${f(K[1])} L ${f(xm)} ${f(yP - 1)} Q ${f(xm - 0.5)} ${f(yP - 4.5)} ${f(xm - 4)} ${f(yP - 3)} L ${f(xT)} ${f(yT)}`, h.a.arete);
    const noeudT = (() => {
      const w = larg(yT) / 2 + 0.5;
      return h.path(`M ${f(xG - w)} ${f(yT - 4)} L ${f(xG + w)} ${f(yT - 1)} M ${f(xG - w)} ${f(yT + 1)} L ${f(xG + w)} ${f(yT + 4)}`
        + ` M ${f(xT)} ${f(yT + 2)} L ${f(xT + 7)} ${f(yT + 13)}`, h.a.arete);
    })();
    const tours = x => {
      const w = larg(yC) / 2 + 0.5;
      return h.path(`M ${f(x - w)} ${f(yC - 3)} L ${f(x + w)} ${f(yC)} M ${f(x - w)} ${f(yC + 2)} L ${f(x + w)} ${f(yC + 5)}`, h.a.arete);
    };
    // rameaux d'épinette du côté extérieur, chicots du côté de la corde
    const rameaux = [];
    for (const [x, dir] of [[xG, -1], [xD, 1]]) {
      for (let y = 10; y < 0.62 * H; y += 21) {
        const w = larg(y) / 2;
        rameaux.push(rameau(x + dir * w, y, dir, Math.min(x - 4 - w, 30), 10 + y * 0.04, 3.2));
      }
      for (const y of [0.34 * H, 0.47 * H, 0.6 * H, 0.08 * H]) {
        const w = larg(y) / 2;
        rameaux.push(h.path(`M ${f(x - dir * w)} ${f(y)} L ${f(x - dir * (w + 9))} ${f(y + 5)}`, h.a.detail));
      }
    }
    // les morceaux, chacun dans son sac, pendus au milieu de la corde
    // les morceaux, chacun dans son sac, en grappe au bout de la corde de hissage
    const grappe = [[-19, 30, 48, 8], [19, 28, 44, 10], [0, 36, 56, 14]];
    const pieces = [h.cercle(f(K[0]), f(K[1] + 1.5), 2.4, h.a.plein), ...grappe.map(([dx, l, ht, c]) => {
      const x = xm + dx;
      return [h.ligne(f(K[0]), f(K[1] + 2), f(x), f(K[1] + c), h.a.arete), sac(x, K[1] + c + 1, l, ht, dx !== 0)].join('\n');
    })];
    const basSacs = K[1] + 15 + 56;
    // le feu de boucane, loin en dessous
    const xf = xm - 6;
    const pierres = [[-46, 10, 7.5], [-30, 8, 6.5], [29, 9, 7], [45, 10, 8]].map(([dx, rx, ry], i) =>
      h.path(D(galet(xf + dx, yg - ry + 1, rx, ry, [[0.08, 3, i]]), true), plein(h.a.arete)));
    const tasPts = Array.from({ length: 25 }, (_, i) => { const t = i / 24; return [xf - 34 + 68 * t, yg - 8 - 26 * Math.pow(Math.sin(Math.PI * t), 0.8)]; });
    const tas = h.path(D(tasPts, true), plein(h.a.arete));
    const brins = [
      quad([xf - 31, yg - 11], [xf - 14, yg - 29], [xf + 10, yg - 35], 12),
      quad([xf - 18, yg - 27], [xf + 5, yg - 22], [xf + 31, yg - 12], 12),
      quad([xf - 26, yg - 15], [xf - 3, yg - 12], [xf + 18, yg - 26], 12),
    ].map(p => [h.path(D(p), h.a.detail), aiguilles(p.slice(1), 3, 2.6)].join('\n'));
    const mousse = h.path(D(galet(xf + 14, yg - 29, 13, 7, [[0.14, 9, 0], [0.05, 4, 1]]), true), plein(h.a.detail));
    const braises = [[-19, 3.4], [-9, 3.8], [2, 3.6], [12, 3.4], [21, 3]].map(([dx, r], i) =>
      h.path(D(galet(xf + dx, yg - r, r * 1.3, r, [[0.1, 4, i]]), true), h.a.plein));
    const fumeePt = (dx, cible, ph, t) => {
      const x0 = xf + dx, y0 = yg - 38, x1 = xm + cible, y1 = basSacs + 10;
      return [x0 + (x1 - x0) * lisse(t) + 6 * Math.sin(t * 8 + ph) * t, y0 + (y1 - y0) * t];
    };
    const fumees = [[-8, -16, 0], [2, 0, 1.7], [10, 16, 3.1]].map(([dx, cible, ph]) =>
      h.path(D(Array.from({ length: 41 }, (_, i) => fumeePt(dx, cible, ph, i / 40))), h.a.cache));
    // la charte : le geste, on tire le bout libre vers le bas pour hisser, en rouge
    const Hh = [xm - 4, yP - 3], vh = [xT - Hh[0], yT - Hh[1]], lv = Math.hypot(...vh), uh = [vh[0] / lv, vh[1] / lv], nh = [-uh[1], uh[0]];
    const ph = t => [Hh[0] + vh[0] * t + nh[0] * 12, Hh[1] + vh[1] * t + nh[1] * 12];
    const geste = h.geste(D([ph(0.6), ph(0.82)]));
    return {
      dessin: [
        tronc(xG, yg, lb, lh), tronc(xD, yg, lb, lh), ...rameaux, tours(xG), tours(xD), corde, hissage, noeudT, ...pieces,
        sol(0, L, yg), ...fumees, tas, ...brins, mousse, ...braises, ...pierres, geste,
      ].join('\n'),
      xm, cordeY, B, xf, yg, basSacs, K, xT, yT, fumee: fumeePt(-8, -16, 0, 0.3),
    };
  };

  return {
    ref: '61-09',
    titre: 'Le camp de viande',
    desc: 'Quatre façons de garder les morceaux dans le bois. Sur la neige : un lit épais de branches de sapin couché sur la neige, la viande dessus, deux feuilles d’écorce de bouleau par-dessus. Au ruisseau : la viande dans un sac étanche au col tordu et noué, tenue au fond par une pierre et attachée à un piquet de la rive. Par redoux : le sac de coton mouillé, pendu au vent, se refroidit en séchant. Ce qui reste au bois : une corde tendue haut entre deux épinettes, une seconde corde lancée par-dessus son milieu, les morceaux ensachés au bout, hissés, l’autre bout noué au tronc à hauteur de main ; un feu de boucane de bois vert et de mousse loin en dessous.',
    format: 'pleine',
    disposition: [['neige', 'ruisseau'], ['redoux', 'boucane']],
    hauteurs: [2, 3],
    largeurs: [[1, 1], [2, 3]],
    vues: {
      neige: {
        titre: 'Sur la neige, en coupe',
        dessin: z => litNeige(z).dessin,
        renvois: z => {
          const v = litNeige(z);
          return [
            { n: 1, rond: [0.07 * z.l, v.yl - 30], cible: [+f(0.09 * z.l), +f(v.yl)], texte: 'lit de branches sur la neige' },
            { n: 2, rond: [0.88 * z.l, 18], cible: [+f(0.74 * z.l), +f(v.cy - v.ry + 4)], texte: 'écorce de bouleau ou toile' },
          ];
        },
      },
      ruisseau: {
        titre: 'Au ruisseau, en coupe',
        dessin: z => auRuisseau(z).dessin,
        renvois: z => {
          const v = auRuisseau(z);
          const pd = v.pierreP.reduce((a, p) => (p[0] > a[0] ? p : a));
          return [
            { n: 3, rond: [0.36 * v.L, 0.12 * v.H], cible: [+f(v.c1[0] + 4), +f(v.c1[1])], texte: 'sac étanche, col noué' },
            { n: 4, rond: [0.93 * v.L, 0.62 * v.H], cible: [+f(v.cx + 0.15 * v.L + 3), +f(v.base - 16)], texte: 'la viande reste au sec' },
            { n: 5, rond: [0.8 * v.L, 0.12 * v.H], cible: [+f(pd[0] - 1), +f(pd[1] - 3)], texte: 'une pierre le tient au fond' },
            { n: 6, rond: [0.05 * v.L, 0.12 * v.H], cible: [+f(v.xN - 1), +f(v.yN - 6)], texte: 'corde à un piquet de la rive' },
          ];
        },
      },
      redoux: {
        titre: 'Par redoux',
        dessin: z => parRedoux(z).dessin,
        renvois: z => {
          const v = parRedoux(z);
          return [
            { n: 7, rond: [0.2 * z.l, 0.82 * z.h], cible: [+f(v.xs - v.ls * 0.42), +f(v.haut + v.hs * 0.78)], texte: 'coton mouillé, pas la viande' },
            { n: 8, rond: [0.24 * z.l, 0.2 * z.h], cible: [+f(0.24 * z.l), +f(0.36 * z.h - 2)], texte: 'pendu là où passe un air sec' },
            { n: 9, rond: [0.9 * z.l, 0.72 * z.h], cible: [+f(v.xs + v.ls / 2 + 22), +f(0.59 * z.h - 3)], texte: 'le coton sèche et refroidit' },
          ];
        },
      },
      boucane: {
        titre: 'Hors de portée, sur la boucane',
        dessin: z => surBoucane(z).dessin,
        renvois: z => {
          const v = surBoucane(z);
          const xc = v.B[0] - 26;
          return [
            { n: 10, rond: [v.xm + 0.17 * z.l, 0.06 * z.h], cible: [+f(xc), +f(v.cordeY(xc) - 1.5)], texte: 'corde tendue, deux arbres' },
            { n: 11, rond: [0.29 * z.l, v.yT - 14], cible: [+f(v.xT + 2), +f(v.yT + 1)], texte: 'on hisse, on noue au tronc' },
            { n: 12, rond: [v.xm + 0.26 * z.l, 0.44 * z.h], cible: [+f(v.xm + 33), +f(v.K[1] + 11 + 22)], texte: 'morceaux hors de portée' },
            { n: 13, rond: [v.xm + 0.26 * z.l, v.yg - 44], cible: [+f(v.xf + 28), +f(v.yg - 18)], texte: 'bois vert ou mousse humide' },
            { n: 14, rond: [0.23 * z.l, v.yg - 40], cible: [+f(v.fumee[0]), +f(v.fumee[1])], texte: 'la fumée, pas la chaleur' },
          ];
        },
      },
    },
  };
};
