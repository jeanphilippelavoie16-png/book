// 90-07a — Le canot d'une seule feuille d'écorce d'épinette (ch. 90, §9 « Le canot d'écorce
// d'épinette », premier paragraphe ; le plat-bord et la traverse : §9 « Remplacer une pièce de
// bois en route »).
// Aucune cote : le chapitre ne donne aucune mesure de ce canot.
// Ce que le chapitre dit, et rien d'autre : une seule grande feuille, pliée le long des
// plats-bords à deux endroits ou plus de chaque côté (les plis aplatissent le fond et relèvent
// les bouts), pas de pince taillée ; chaque bout pincé entre deux lattes (page b) ; plats-bords
// de jeunes arbres joints par le gros bout, traverses à bouts amincis enroulés, membrures de
// jeunes arbres fendus ; le tout lié à la racine.
// Le sens des plis (tous rabattus vers la droite) n'est pas dans le chapitre : un pli doit bien
// se rabattre d'un côté ou de l'autre, le dessin en choisit un.

module.exports = (h) => {
  const f = n => Math.round(n * 10) / 10;
  const D = (a, ferme = false) => 'M ' + a.map(([x, y]) => `${f(x)} ${f(y)}`).join(' L ') + (ferme ? ' Z' : '');
  const samp = (fn, a, b, n) => Array.from({ length: n + 1 }, (_, i) => fn(a + (b - a) * i / n));
  const normales = p => p.map((q, i) => {
    const a = p[Math.max(0, i - 1)], b = p[Math.min(p.length - 1, i + 1)];
    const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1;
    return [-dy / L, dx / L];
  });
  const decale = (p, e) => { const n = normales(p); return p.map((q, i) => [q[0] + n[i][0] * e, q[1] + n[i][1] * e]); };
  const bande = (p, e1, e2) => D(decale(p, e1).concat(decale(p, e2).reverse()), true);
  const bez = (A, C, B) => t => [(1 - t) * (1 - t) * A[0] + 2 * (1 - t) * t * C[0] + t * t * B[0],
    (1 - t) * (1 - t) * A[1] + 2 * (1 - t) * t * C[1] + t * t * B[1]];
  // Courbe lisse par les points (Catmull-Rom).
  const lisse = (p, ferme = false) => {
    const n = p.length; let d = `M ${f(p[0][0])} ${f(p[0][1])}`;
    const k = ferme ? n : n - 1;
    for (let i = 0; i < k; i++) {
      const g = j => p[ferme ? (j + n) % n : Math.max(0, Math.min(n - 1, j))];
      const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      d += ` C ${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
    }
    return d + (ferme ? ' Z' : '');
  };
  // Le segment d'une droite (point p, direction d) qui tombe dans un polygone convexe.
  const dansPoly = (poly, p, d) => {
    let s = 0;
    poly.forEach((a, i) => { const b = poly[(i + 1) % poly.length]; s += a[0] * b[1] - b[0] * a[1]; });
    const sg = s > 0 ? 1 : -1;
    let t0 = -1e9, t1 = 1e9;
    for (let i = 0; i < poly.length; i++) {
      const a = poly[i], b = poly[(i + 1) % poly.length];
      const nx = -(b[1] - a[1]) * sg, ny = (b[0] - a[0]) * sg;
      const num = (p[0] - a[0]) * nx + (p[1] - a[1]) * ny, den = d[0] * nx + d[1] * ny;
      if (Math.abs(den) < 1e-9) { if (num < 0) return null; continue; }
      const t = -num / den;
      if (den > 0) t0 = Math.max(t0, t); else t1 = Math.min(t1, t);
    }
    return t0 < t1 ? [[p[0] + d[0] * t0, p[1] + d[1] * t0], [p[0] + d[0] * t1, p[1] + d[1] * t1]] : null;
  };
  const raccourci = ([a, b], e) => {
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]); if (L < 2 * e + 2) return null;
    const ux = (b[0] - a[0]) / L, uy = (b[1] - a[1]) / L;
    return [[a[0] + ux * e, a[1] + uy * e], [b[0] - ux * e, b[1] - uy * e]];
  };
  let sd = 17;
  const rnd = () => (sd = (sd * 9301 + 49297) % 233280) / 233280;

  // Le pli rabattu : A au plat-bord, C la pointe en bas, M le bout de l'arête de pliure au
  // plat-bord. Le fil de l'écorce, dans le rabat, est renvoyé par la pliure.
  function pli(A, C, M, pas) {
    const o = [];
    const tri = [A, C, M];
    o.push(h.chemin(tri, h.a.blanc, true));
    const phi = Math.atan2(M[1] - C[1], M[0] - C[0]);
    const dir = [Math.cos(2 * phi), Math.sin(2 * phi)];
    for (let s = pas; s < 1; s += pas) {
      const p = [A[0] + (C[0] - A[0]) * s, A[1] + (C[1] - A[1]) * s];
      const seg = dansPoly(tri, p, dir);
      const r = seg && raccourci(seg, 2.5);
      if (r) o.push(h.chemin(r, h.a.fin));
    }
    // l'épaisseur doublée le long de l'arête de pliure
    const L = Math.hypot(M[0] - C[0], M[1] - C[1]), nx = -(M[1] - C[1]) / L, ny = (M[0] - C[0]) / L;
    const e = 1.8 * ((A[0] - C[0]) * nx + (A[1] - C[1]) * ny > 0 ? 1 : -1);
    o.push(h.chemin([[C[0] + nx * e + (M[0] - C[0]) * 0.08, C[1] + ny * e + (M[1] - C[1]) * 0.08], [M[0] + nx * e, M[1] + ny * e]], h.a.fin));
    o.push(h.chemin([A, C], h.a.arete));
    o.push(h.chemin([C, M], h.a.arete));
    return o.join('\n');
  }

  // ─── De côté ───────────────────────────────────────────────────────────────────────
  const PLIS = [-0.6, 0.5];            // attache de chaque pli (u), le rabat part vers la droite
  const LPLI = 0.1;
  function gC(z) {
    const cx = z.l / 2, Lh = z.l / 2 - 26;
    const Dp = Math.min(z.h * 0.4, 62), S = Dp * 0.55, R = Dp * 0.5;
    const yG0 = Math.max(S + 16, z.h * 0.36), yK0 = yG0 + Dp, uk = 0.84;
    const X = u => cx + u * Lh;
    const yG = u => yG0 - S * Math.pow(Math.abs(u), 2.4);
    const yK = u => { const a = Math.min(1, Math.max(0, (Math.abs(u) - 0.3) / (uk - 0.3))); return yK0 - R * a * a; };
    const P = (u, t) => [X(u), yG(u) + t * (yK(u) - yG(u))];
    // L'étrave arrive au pied dans la pente de la quille : pas de cran.
    const pente = 2 * R / ((uk - 0.3) * Lh), lam = 0.92 * (1 - uk) * Lh;
    const etrave = sg => samp(bez([X(sg), yG(1)], [X(sg * uk) + sg * lam, yK(uk) - lam * pente], [X(sg * uk), yK(uk)]), 0, 1, 40);
    const plis = PLIS.map(ua => ({ A: [X(ua), yG(ua)], M: [X(ua + LPLI), yG(ua + LPLI)], C: P(ua + 0.016, 0.72) }));
    return { cx, Lh, Dp, S, yG0, yK0, uk, X, yG, yK, P, etrave, plis };
  }
  function cote(z) {
    const g = gC(z), { X, yG, yK, uk, P } = g, o = [];
    const haut = samp(u => [X(u), yG(u)], -1, 1, 100);
    const ed = g.etrave(1), eg = g.etrave(-1);
    const quille = samp(u => [X(u), yK(u)], uk, -uk, 100);
    const coque = haut.concat(ed.slice(1), quille.slice(1), eg.slice().reverse().slice(1, -1));
    o.push(h.path(D(coque, true), h.a.blanc));
    // Le fil de l'écorce, dans la longueur.
    [0.27, 0.5, 0.73].forEach((t, k) => {
      let u = -0.8 + rnd() * 0.05;
      while (u < 0.8) {
        const l = 0.05 + rnd() * 0.11, u2 = Math.min(0.8, u + l);
        const touche = t < 0.74 && PLIS.some(ua => u2 > ua - 0.01 && u < ua + LPLI + 0.02);
        if (!touche && u2 - u > 0.02) o.push(h.path(D(samp(v => P(v, t + (rnd() - 0.5) * 0.0), u, u2, 6)), h.a.fin));
        u = u2 + 0.02 + rnd() * 0.04;
      }
    });
    // Les plis.
    g.plis.forEach(p => o.push(pli(p.A, p.C, p.M, 0.25)));
    // Le plat-bord, caché derrière l'écorce ; la racine qui lie l'écorce au plat-bord.
    o.push(h.path(D(samp(u => [X(u), yG(u) + 7], -0.965, 0.965, 80)), h.a.cache));
    for (let u = -0.9; u <= 0.901; u += 0.1) {
      for (const k of [-1, 1]) {
        const x = X(u) + k * 1.6;
        o.push(h.ligne(f(x), f(yG(u) - 0.3), f(x + 1), f(yG(u) + 10), h.a.detail));
      }
    }
    // Les bouts : la gomme sur la tranche, la latte, les tours de corde.
    for (const [sg, e] of [[1, ed], [-1, eg]]) {
      o.push(h.path(bande(e, 0, sg * 2.6), h.a.plein));
      const n = e.length - 1, fin = Math.round(n * 0.8);
      const lat = e.slice(0, fin + 1);
      const t0 = lat[0], t1 = lat[1], L = Math.hypot(t0[0] - t1[0], t0[1] - t1[1]);
      lat.unshift([t0[0] + (t0[0] - t1[0]) / L * 5, t0[1] + (t0[1] - t1[1]) / L * 5]);
      o.push(h.path(bande(lat, sg * 3.2, sg * 10.5), h.a.blanc), h.path(bande(lat, sg * 3.2, sg * 10.5), h.a.arete));
      const nn = normales(e);
      [0.12, 0.3, 0.48, 0.66].forEach(t => {
        const i = Math.round(n * t), q = e[i], nv = nn[i];
        const tg = [nv[1], -nv[0]];
        for (const k of [-1, 1]) {
          const a = [q[0] + tg[0] * k * 1.4, q[1] + tg[1] * k * 1.4];
          o.push(h.path(D([a, [a[0] + nv[0] * sg * 13.5, a[1] + nv[1] * sg * 13.5]]), h.a.detail));
        }
        o.push(h.cercle(f(q[0] + nv[0] * sg * 14.3), f(q[1] + nv[1] * sg * 14.3), 1.4, h.a.plein));
      });
    }
    o.push(h.path(D(coque, true), h.a.contour));
    return o.join('\n');
  }

  // ─── Vu de dessus ──────────────────────────────────────────────────────────────────
  const TRAV = [-0.62, 0, 0.62];
  function gD(z) {
    const cx = z.l / 2, Lh = z.l / 2 - 26;
    const B = Math.min(z.h * 0.37, 54), cy = z.h * 0.5;
    const X = u => cx + u * Lh;
    const W = u => B * Math.pow(Math.max(0, 1 - u * u), 0.62);
    const eB = 1.6, ep = u => 2.8 + 3.8 * (1 - u * u);
    const Wi = u => W(u) - eB - ep(u);
    const memb = [];
    for (let u = -0.84; u <= 0.841; u += 0.07) if (TRAV.every(t => Math.abs(t - u) > 0.03)) memb.push(u);
    return { cx, Lh, B, cy, X, W, eB, ep, Wi, memb };
  }
  function dessus(z) {
    const g = gD(z), { cy, X, W, eB, Wi, memb } = g, o = [];
    const bord = samp(u => [X(u), cy - W(u)], -1, 1, 120).concat(samp(u => [X(u), cy + W(u)], 1, -1, 120).slice(1, -1));
    o.push(h.path(D(bord, true), h.a.blanc));
    // Le fond, le fil dans la longueur.
    [-0.62, -0.25, 0.25, 0.62].forEach(k => {
      let u = -0.82 + rnd() * 0.04;
      while (u < 0.82) {
        const u2 = Math.min(0.82, u + 0.06 + rnd() * 0.12);
        o.push(h.path(D(samp(v => [X(v), cy + k * Wi(v)], u, u2, 6)), h.a.fin));
        u = u2 + 0.02 + rnd() * 0.04;
      }
    });
    // Les membrures, d'un plat-bord à l'autre.
    memb.forEach(u => {
      const w = Wi(u) + 1;
      o.push(h.rect(f(X(u) - 2.6), f(cy - w), 5.2, f(2 * w), h.a.blanc));
      o.push(h.rect(f(X(u) - 2.6), f(cy - w), 5.2, f(2 * w), h.a.detail));
    });
    // Les plats-bords : gros bout au milieu, minces aux bouts.
    const ue = 0.975;
    for (const s of [-1, 1]) {
      const pb = samp(u => [X(u), cy + s * (W(u) - eB)], -ue, ue, 100).concat(samp(u => [X(u), cy + s * Wi(u)], ue, -ue, 100));
      o.push(h.path(D(pb, true), h.a.blanc), h.path(D(pb, true), h.a.arete));
      // Le joint des deux gros bouts, taillés à plat, face contre face.
      const mil = u => [X(u), cy + s * (W(u) - eB - g.ep(u) / 2)];
      o.push(h.path(D(samp(mil, -0.15, 0.15, 12)), h.a.detail));
      o.push(h.ligne(f(X(-0.15)), f(mil(-0.15)[1]), f(X(-0.15)), f(cy + s * Wi(-0.15)), h.a.detail));
      o.push(h.ligne(f(X(0.15)), f(mil(0.15)[1]), f(X(0.15)), f(cy + s * (W(0.15) - eB)), h.a.detail));
      for (const uc of [-0.085, 0.085]) {
        for (const k of [-2, 0, 2]) {
          const x = X(uc) + k * 1.3;
          o.push(h.ligne(f(x), f(cy + s * (W(uc) + 0.8)), f(x), f(cy + s * (Wi(uc) - 1)), h.a.detail));
        }
      }
    }
    // Les traverses : le bout aminci passe sur le plat-bord et revient dessous.
    TRAV.forEach(u => {
      const x = X(u), wi = Wi(u), w = W(u);
      o.push(h.rect(f(x - 4.2), f(cy - wi - 0.5), 8.4, f(2 * wi + 1), h.a.blanc));
      o.push(h.rect(f(x - 4.2), f(cy - wi - 0.5), 8.4, f(2 * wi + 1), h.a.arete));
      o.push(h.ligne(f(x), f(cy - wi + 12), f(x), f(cy + wi - 12), h.a.fin));
      for (const s of [-1, 1]) {
        o.push(h.rect(f(x - 2.5), f(s < 0 ? cy - w - 0.4 : cy + wi + 0.5), 5, f(w - wi + 0.1), h.a.blanc));
        o.push(h.rect(f(x - 2.5), f(s < 0 ? cy - w - 0.4 : cy + wi + 0.5), 5, f(w - wi + 0.1), h.a.detail));
        for (const d of [4.5, 7.5, 10.5]) o.push(h.ligne(f(x - 5.4), f(cy + s * (wi - d)), f(x + 5.4), f(cy + s * (wi - d)), h.a.detail));
      }
    });
    // Les bouts : la tête des deux lattes, l'écorce pincée entre elles.
    for (const sg of [-1, 1]) {
      const xa = X(sg * 0.965), xb = X(sg * 1) + sg * 2.5;
      const x0 = Math.min(xa, xb), l = Math.abs(xb - xa);
      o.push(h.rect(f(x0), f(cy - 5.2), f(l), 3.6, h.a.blanc), h.rect(f(x0), f(cy - 5.2), f(l), 3.6, h.a.arete));
      o.push(h.rect(f(x0), f(cy + 1.6), f(l), 3.6, h.a.blanc), h.rect(f(x0), f(cy + 1.6), f(l), 3.6, h.a.arete));
      o.push(h.rect(f(Math.min(xa, xb + sg * 2)), f(cy - 1.4), f(l + 2), 2.8, h.a.plein));
    }
    o.push(h.path(D(bord, true), h.a.contour));
    return o.join('\n');
  }

  // ─── Demi-coupe au milieu ──────────────────────────────────────────────────────────
  // Le canot est symétrique : on n'en dessine que la moitié droite, plus grande, pour que le
  // tour de la traverse autour du plat-bord se lise.
  function gK(z) {
    const cx = 26;
    const Dd = Math.min(z.h * 0.56, 150);
    const yT = Math.max(34, (z.h - Dd) * 0.5), yB = yT + Dd;
    const Bw = Math.min(z.l - cx - 182, Dd * 1.45);
    const fl = Dd * 0.1, rb = Dd * 0.4, eb = 2;
    const R = [];
    const xs1 = Bw - fl, ys1 = yB - rb;
    for (let i = 0; i <= 10; i++) R.push([cx + (xs1 - rb) * (i / 10), yB]);
    for (let i = 1; i <= 16; i++) { const a = (Math.PI / 2) * (1 - i / 16); R.push([cx + xs1 - rb + rb * Math.cos(a), ys1 + rb * Math.sin(a)]); }
    for (let i = 1; i <= 14; i++) { const s = 1 - i / 14; R.push([cx + Bw - fl * s, yT + (ys1 - yT) * s]); }
    const rg = Math.max(8, Dd * 0.075), tt = 3.4;
    const xb = cx + Bw, xg = xb - eb - tt - rg + 0.4, yc = yT + tt + rg;
    const rr = rg + tt / 2, xe = xg - rg - 12;
    // Le détail cerclé, grossi trois fois, à droite : le tour du plat-bord.
    const K = 3, rD = 52, sx = xg + 3, sy = yc + 1;
    const xD = z.l - rD - 4, yD = Math.min(z.h - rD - 6, yc + rD + 18);
    const T = ([x, y]) => [xD + (x - sx) * K, yD + (y - sy) * K];
    return { cx, Dd, yT, yB, Bw, eb, R, rg, tt, xb, xg, yc, rr, xe, K, rD, sx, sy, xD, yD, T };
  }
  function contenu(g, det) {
    const { cx, yT, yB, eb, R, rg, tt, xb, xg, yc, rr, xe } = g, o = [];
    const bois = det ? 'fill="url(#h90-bois3)" stroke="#000" stroke-width="1.4" stroke-linejoin="round"' : h.a.hachure('bois');
    // La membrure, forcée contre l'écorce, sa tête sous le plat-bord.
    const yM = yc + rr + tt / 2 + 1.5;
    const ligne = R.filter(p => p[1] >= yM || p[0] < xg - rg);
    o.push(h.path(bande(ligne, -eb - 0.2, -eb - 7), h.a.blanc), h.path(bande(ligne, -eb - 0.2, -eb - 7), h.a.arete));
    // L'écorce, en coupe.
    o.push(h.path(bande(R, -eb, eb), h.a.plein));
    // Le plat-bord, un jeune arbre en coupe.
    o.push(h.cercle(f(xg), f(yc), f(rg), bois));
    // La racine qui lie l'écorce au plat-bord, passée dans un trou sous le plat-bord.
    const boucle = [[xb - 0.3, yc + rg + 6.5], [xg - rg * 0.4, yc + rg + 5.6], [xg - rg - 4, yc + 1], [xg - rg * 0.3, yc - rg - tt - 2],
      [xb + 0.4, yc - rg - 1.6], [xb + 3.6, yc + 2], [xb + 2.2, yc + rg + 6]];
    const racine = h.path(lisse(boucle, true), det ? h.a.arete.replace('stroke-width="1.4"', 'stroke-width="4.2"') : h.a.detail);
    if (!det) o.push(racine);
    // Le bout aminci de la traverse : par-dessus le plat-bord, dehors, dessous, et il revient
    // sous la traverse.
    const lang = [[xe, yc + 0.6], [xe + 5, yc + 0.2]];
    for (let i = 0; i <= 30; i++) { const a = Math.PI * 1.06 + (Math.PI * 1.44) * i / 30; lang.push([xg + rr * Math.cos(a), yc + rr * Math.sin(a)]); }
    lang.push([xg - rg * 0.5, yc + rr], [xe - 26, yc + rr]);
    o.push(h.path(bande(lang, -tt / 2, tt / 2), h.a.blanc), h.path(bande(lang, -tt / 2, tt / 2), h.a.detail));
    // La traverse, coupée dans sa longueur, amincie vers son bout.
    const yb = yc + rr - tt / 2 - 0.4;
    const trav = [[cx, yc - 5.5], [xe - 9, yc - 5.5], [xe, yc - 1.6], [xe, yc + 2.2], [xe - 9, yb], [cx, yb]];
    o.push(h.chemin(trav, bois, true));
    // Deux ligatures prennent la traverse et le bout revenu dessous.
    for (const dx of [7, 17]) {
      const x0 = xe - dx - 1.5;
      o.push(h.rect(f(x0), f(yc - 6.8), 3, f(rr + tt / 2 + 8), h.a.blanc), h.rect(f(x0), f(yc - 6.8), 3, f(rr + tt / 2 + 8), h.a.detail));
    }
    // Dans le détail, la racine passe par-dessus tout, pour qu'on suive son tour.
    if (det) o.push(racine);
    return o.join('\n');
  }
  function coupe(z) {
    const g = gK(z), { cx, yT, yB, K, rD, sx, sy, xD, yD } = g, o = [];
    // L'axe du canot.
    o.push(h.ligne(cx, f(yT - 14), cx, f(yB + 12), h.a.cache));
    o.push(contenu(g, false));
    // Le cercle tireté qui renvoie au détail.
    const rs = rD / K;
    o.push(h.cercle(f(sx), f(sy), f(rs), h.a.cache));
    const ang = Math.atan2(yD - sy, xD - sx);
    o.push(h.ligne(f(sx + Math.cos(ang) * rs), f(sy + Math.sin(ang) * rs), f(xD - Math.cos(ang) * rD), f(yD - Math.sin(ang) * rD), h.a.fin));
    // Le détail grossi : traits ramenés à leur épaisseur, hachure à son pas.
    const dedans = contenu(g, true).replace(/stroke-width="([\d.]+)"/g, (m, v) => `stroke-width="${f(v / K)}"`)
      .replace(/stroke-dasharray="[^"]*"/g, m => m);
    o.push(`<defs><pattern id="h90-bois3" width="2" height="2" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="2" stroke="#000" stroke-width="${f(0.7 / K * 100) / 100}"/></pattern>`
      + `<clipPath id="c90-07a-det"><circle cx="${f(xD)}" cy="${f(yD)}" r="${rD}"/></clipPath></defs>`);
    o.push(h.cercle(f(xD), f(yD), rD, h.a.blanc));
    o.push(`<g clip-path="url(#c90-07a-det)"><g transform="translate(${f(xD)} ${f(yD)}) scale(${K}) translate(${f(-sx)} ${f(-sy)})">${dedans}</g></g>`);
    o.push(h.cercle(f(xD), f(yD), rD, h.a.arete));
    return o.join('\n');
  }

  // ─── Un pli, vu de dehors ──────────────────────────────────────────────────────────
  function gP(z) {
    const x0 = 12, x1 = z.l - 12;
    const y0 = Math.max(36, z.h * 0.2), pente = 0.06;
    const yH = x => y0 - (x - x0) * pente;
    const yBas = z.h - 16, gw = 11;
    const xa = x0 + (x1 - x0) * 0.26, w = (x1 - x0) * 0.36;
    const A = [xa, yH(xa)], M = [xa + w, yH(xa + w)];
    const C = [xa + w * 0.14, yH(xa) + (yBas - yH(xa)) * 0.8];
    const lig = [];
    for (let x = x0 + 12; x < x1 - 6; x += 24) lig.push(x);
    return { x0, x1, y0, yH, yBas, gw, A, M, C, lig };
  }
  function vuePli(z) {
    const g = gP(z), { x0, x1, yH, yBas, gw, A, M, C, lig } = g, o = [];
    const vague = (a, b, n, fn) => samp(fn, a, b, n);
    const gauche = vague(yBas, yH(x0), 16, y => [x0 + 2.2 * Math.sin(y / 6), y]);
    const bas = vague(x1, x0, 30, x => [x, yBas + 2.2 * Math.sin(x / 7)]);
    const droite = vague(yH(x1), yBas, 16, y => [x1 + 2.2 * Math.sin(y / 6 + 1), y]);
    const frag = [[x0, yH(x0)], [x1, yH(x1)]].concat(droite, bas, gauche);
    o.push(h.path(D(frag, true), h.a.blanc));
    // Le fil de l'écorce, dans la longueur.
    const tri = [A, C, M];
    for (let y = yH(x0) + gw + 14; y < yBas - 8; y += 15) {
      let x = x0 + 6 + rnd() * 10;
      while (x < x1 - 8) {
        const x2 = Math.min(x1 - 8, x + 18 + rnd() * 34);
        const yy = y - (x - x0) * 0.06, yy2 = y - (x2 - x0) * 0.06;
        // on coupe le fil là où passe le rabat
        const seg = dansPoly(tri, [x, yy], [x2 - x, yy2 - yy]);
        if (!seg) o.push(h.ligne(f(x), f(yy), f(x2), f(yy2), h.a.fin));
        else {
          const ta = (seg[0][0] - x) / (x2 - x), tb = (seg[1][0] - x) / (x2 - x);
          if (ta > 0.05) o.push(h.ligne(f(x), f(yy), f(x + (x2 - x) * Math.min(1, ta) - 2), f(yy + (yy2 - yy) * Math.min(1, ta)), h.a.fin));
          if (tb < 0.95) o.push(h.ligne(f(x + (x2 - x) * Math.max(0, tb) + 2), f(yy + (yy2 - yy) * Math.max(0, tb)), f(x2), f(yy2), h.a.fin));
        }
        x = x2 + 5 + rnd() * 8;
      }
    }
    o.push(pli(A, C, M, 0.14));
    // Le plat-bord caché, et la racine qui le prend avec l'écorce et le pli.
    o.push(h.ligne(f(x0 + 3), f(yH(x0) + gw), f(x1 - 3), f(yH(x1) + gw), h.a.cache));
    lig.forEach(x => {
      for (const k of [-2.2, 0, 2.2]) o.push(h.ligne(f(x + k), f(yH(x + k) - 0.3), f(x + k + 1.2), f(yH(x + k) + gw + 5), h.a.detail));
      o.push(h.cercle(f(x + 1.2), f(yH(x) + gw + 6.5), 1.6, h.a.plein));
    });
    o.push(h.ligne(f(x0), f(yH(x0)), f(x1), f(yH(x1)), h.a.contour));
    o.push(h.path(D(gauche), h.a.detail), h.path(D(bas), h.a.detail), h.path(D(droite), h.a.detail));
    return o.join('\n');
  }

  return {
    ref: '90-07a',
    titre: 'Le canot d’écorce d’épinette, d’une seule feuille',
    desc: 'Le canot d’urgence fait d’une seule grande feuille d’écorce d’épinette, pour une traversée. De côté : la feuille entière, le fil dans la longueur, pliée le long du plat-bord à deux endroits de chaque côté ; les plis aplatissent le fond et relèvent les bouts ; chaque bout pincé entre deux lattes serrées à la corde passée dans l’écorce, la tranche gommée. Vu de dessus : chaque plat-bord fait de deux jeunes arbres joints au milieu par le gros bout, taillés à plat et liés ; trois traverses dont le bout aminci passe par-dessus le plat-bord ; des membrures de jeunes arbres fendus d’un plat-bord à l’autre. En travers, au milieu : le fond plat ; la membrure forcée contre l’écorce, sa tête sous le plat-bord ; le bout aminci de la traverse enroulé autour du plat-bord et revenu sous la traverse, où il est lié ; la racine passée dans l’écorce sous le plat-bord et par-dessus. Un pli vu de dehors : l’écorce rabattue à plat, sans pince taillée, prise en haut dans la ligature du plat-bord.',
    format: 'pleine',
    disposition: [['cote'], ['dessus'], ['coupe', 'pli']],
    hauteurs: [1, 1, 1.3],
    largeurs: [[1], [1], [3, 2]],
    vues: {
      cote: {
        titre: 'De côté',
        dessin: cote,
        renvois: z => {
          const g = gC(z), p = g.plis[1], e = g.etrave(1);
          return [
            { n: 1, rond: [g.X(-0.22), g.yG0 - 20], cible: g.P(-0.25, 0.5), texte: 'une seule feuille, le fil en long' },
            { n: 2, rond: [g.X(0.3), g.yG0 - 20], cible: [(p.A[0] + p.C[0] + p.M[0]) / 3, (p.A[1] + p.C[1] + p.M[1]) / 3], texte: 'plis au plat-bord, deux ou plus' },
            { n: 3, rond: [g.X(0.96), g.yK(g.uk) + 22], cible: [e[14][0] - 7, e[14][1] + 1], texte: 'bout pincé entre deux lattes' },
          ];
        },
      },
      dessus: {
        titre: 'Vu de dessus',
        dessin: dessus,
        renvois: z => {
          const g = gD(z);
          let mm = g.memb[0]; g.memb.forEach(u => { if (Math.abs(u + 0.4) < Math.abs(mm + 0.4)) mm = u; });
          return [
            { n: 4, rond: [g.X(0.24), g.cy - g.W(0.24) - 13], cible: [g.X(0.11), g.cy - g.W(0.11) + g.eB + g.ep(0.11) / 2], texte: 'plat-bord joint au gros bout' },
            { n: 5, rond: [g.X(0.74), g.cy - g.W(0.74) - 13], cible: [g.X(0.62), g.cy - g.W(0.62) + 2], texte: 'traverse aux bouts enroulés' },
            { n: 6, rond: [g.X(-0.3), g.cy + g.W(-0.3) + 13], cible: [g.X(mm), g.cy + g.Wi(mm) * 0.45], texte: 'membrure : jeune arbre fendu' },
          ];
        },
      },
      coupe: {
        titre: 'Demi-coupe au milieu',
        dessin: coupe,
        renvois: z => {
          const g = gK(z);
          const m = g.R[Math.round(g.R.length * 0.52)];
          return [
            { n: 7, rond: [g.cx + 70, g.yB + 20], cible: [g.cx + 50, g.yB + 1.5], texte: 'fond aplati par les plis' },
            { n: 8, rond: [g.xb + 30, m[1] + 6], cible: [m[0] - 6, m[1] - 3], texte: 'membrure pliée contre l’écorce' },
            { n: 9, rond: [g.xD - g.rD - 4, g.yD - g.rD + 2], cible: g.T([g.xg - 3, g.yc - g.rr]), texte: 'bout enroulé, lié dessous' },
            { n: 10, rond: [g.xD + 10, g.yD - g.rD - 14], cible: g.T([g.xb + 3.4, g.yc + 3]), texte: 'écorce liée à la racine' },
          ];
        },
      },
      pli: {
        titre: 'Un pli, vu de dehors',
        dessin: vuePli,
        renvois: z => {
          const g = gP(z);
          const xl = g.lig.find(x => x > g.A[0] + 6 && x < g.M[0] - 6) || g.lig[2];
          return [
            { n: 11, rond: [g.M[0] + 26, (g.C[1] + g.M[1]) / 2 + 14], cible: [(g.C[0] + g.M[0]) / 2 + 1, (g.C[1] + g.M[1]) / 2], texte: 'rabattu à plat, pas taillé' },
            { n: 12, rond: [xl + 18, g.yH(xl) - 20], cible: [xl + 1, g.yH(xl) + 4], texte: 'pris dans la ligature' },
          ];
        },
      },
    },
  };
};
