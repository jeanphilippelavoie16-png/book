// Planche 109-12 — le tourniquet espagnol : monter, bloquer, relâcher, renvoyer.
// Chapitre 86, « Le tourniquet espagnol » (boucle entre deux points, bâton tourné, bloqué contre
// un appui fixe, relâché au deuxième bâton un tour à la fois, personne dans l'axe).
// Aussi ch. 38 (tours morts sur la traverse, bâton bloqué contre un piquet ou un tronc) et
// ch. 83 (corde doublée, renvoi par un arbre latéral qui sort le tireur de l'axe).
module.exports = (h) => {
  const B = h.a.blanc.match(/fill="([^"]+)"/)[1];
  const blanc = t => h.a[t].replace('fill="none"', `fill="${B}"`);
  const f = v => Math.round(v * 100) / 100;
  const rad = a => a * Math.PI / 180;
  const pt = p => `${f(p[0])} ${f(p[1])}`;
  const poly = P => 'M ' + P.map(pt).join(' L ');
  const add = (a, b, k = 1) => [a[0] + b[0] * k, a[1] + b[1] * k];
  const norm = v => { const L = Math.hypot(v[0], v[1]) || 1; return [v[0] / L, v[1] / L]; };
  const axe = h.a.fin + ' stroke-dasharray="9 3 2 3"';

  // ─── outils de trait ──────────────────────────────────────────────────────────────────
  const reperes = pts => pts.map((p, i) => {
    const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1, tx = (b[0] - a[0]) / L, ty = (b[1] - a[1]) / L;
    return { p, tx, ty, nx: -ty, ny: tx };
  });
  const lelong = pts => {
    const S = [0];
    for (let i = 1; i < pts.length; i++) S.push(S[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
    const L = S[S.length - 1];
    const at = (s, off = 0) => {
      s = Math.max(0, Math.min(L, s));
      let i = 0;
      while (i < pts.length - 2 && S[i + 1] < s) i++;
      const l = (S[i + 1] - S[i]) || 1, u = (s - S[i]) / l;
      const tx = (pts[i + 1][0] - pts[i][0]) / l, ty = (pts[i + 1][1] - pts[i][1]) / l;
      return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * u - ty * off, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * u + tx * off];
    };
    return { at, L };
  };
  // bande pleine (corde, bâton) le long d'une ligne centrale
  const bande = (pts, e, style = 'arete') => {
    const R = reperes(pts);
    const G = R.map(r => [r.p[0] + r.nx * e / 2, r.p[1] + r.ny * e / 2]);
    const D = R.map(r => [r.p[0] - r.nx * e / 2, r.p[1] - r.ny * e / 2]);
    return h.path(poly(G) + ' L ' + D.reverse().map(pt).join(' L ') + ' Z', blanc(style));
  };
  // traits en biais : les torons d'une corde, la torsade de deux brins
  const biais = (pts, e, pas, pente, attrs = h.a.fin, marge = 0.9) => {
    const { at, L } = lelong(pts);
    let d = '';
    for (let s = pas * 0.7; s < L - pas * 0.5; s += pas) {
      d += `M ${pt(at(s - pente * e / 2, -e / 2 + marge))} L ${pt(at(s + pente * e / 2, e / 2 - marge))} `;
    }
    return d ? h.path(d.trim(), attrs) : '';
  };
  const corde = (pts, e, pente = 0.7) => bande(pts, e, 'arete') + '\n' + biais(pts, e, e * 1.5, pente);
  // deux brins tordus l'un sur l'autre : une file de grains en biais qui se chevauchent
  const grain = (c, v, e, pas, sens, style = 'arete') => {
    const n = [-v[1], v[0]], k = rad(44);
    const m = norm(add([n[0] * Math.cos(k), n[1] * Math.cos(k)], v, sens * Math.sin(k)));
    const mm = [-m[1], m[0]], rx = e / 2 / Math.cos(k), ry = pas * 0.56;
    const P = [];
    for (let i = 0; i < 36; i++) { const t = rad(i * 10); P.push(add(add(c, m, rx * Math.cos(t)), mm, ry * Math.sin(t))); }
    return h.path(poly(P) + ' Z', blanc(style));
  };
  const torsade = (p0, p1, e, sens, style = 'arete') => {
    const v = norm([p1[0] - p0[0], p1[1] - p0[1]]), L = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]);
    const nb = Math.max(1, Math.round(L / (e * 0.7))), pas = L / nb, out = [];
    for (let i = 0; i < nb; i++) out.push(grain(add(p0, v, pas * (i + 0.5)), v, e, pas, sens, style));
    return out.join('\n');
  };
  const bez = (p0, p1, p2, p3, n = 30) => {
    const P = [];
    for (let i = 0; i <= n; i++) {
      const t = i / n, u = 1 - t;
      P.push([u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
        u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1]]);
    }
    return P;
  };
  const cercleP = (c, r, a0, a1, n = 40) => {
    const P = [];
    for (let i = 0; i <= n; i++) { const a = rad(a0 + (a1 - a0) * i / n); P.push([c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)]); }
    return P;
  };

  // ─── la vue de trois quarts : x le long de la corde, y vers le bas, p qui s'enfonce ────
  const KX = 0.32, KY = 0.38;
  const P3 = (x, y, p) => [x + KX * p, y - KY * p];
  const PHI_G = 180 + Math.atan(KX) * 180 / Math.PI, PHI_D = PHI_G + 180; // silhouettes d'un fût
  // cercle horizontal autour d'un fût vertical, à la hauteur image y
  const tour = (x0, y, r, a0, a1, n = 36) => {
    const P = [];
    for (let i = 0; i <= n; i++) { const a = rad(a0 + (a1 - a0) * i / n); P.push(P3(x0 + r * Math.cos(a), y, r * Math.sin(a))); }
    return P;
  };
  // fût vertical (arbre, poteau) de yHaut au sol ; yHaut = null : il sort de la vue par le haut
  const fut = (x0, R, yHaut, ySol, ecorce) => {
    const out = [];
    const base = tour(x0, ySol, R, PHI_G, PHI_D);
    const gx = base[0][0], dx = base[base.length - 1][0];
    if (yHaut === null) {
      const cont = [[gx, 0], ...base, [dx, 0]];
      out.push(h.path(poly(cont) + ' Z', h.a.blanc));
      out.push(h.path(poly(cont), h.a.contour));
    } else {
      // silhouette : le pied par devant, les deux flancs, le dessus par derrière
      const sil = [...base, ...tour(x0, yHaut, R, PHI_D - 360, PHI_G)];
      out.push(h.path(poly(sil) + ' Z', blanc('contour')));
      out.push(h.path(poly(tour(x0, yHaut, R, PHI_G, PHI_D)), h.a.arete));
      out.push(h.path(poly(tour(x0, yHaut, R * 0.62, 0, 360)), h.a.fin));
      out.push(h.path(poly(tour(x0, yHaut, R * 0.28, 0, 360)), h.a.fin));
    }
    // écorce : quelques traits en long, interrompus
    let d = '';
    const yTop = yHaut === null ? 6 : yHaut + 6;
    ecorce.forEach(([k, y0, y1]) => {
      const x = x0 + k * R;
      const a = Math.max(yTop, y0), b = Math.min(ySol - 4, y1);
      if (b - a > 3) d += `M ${f(x)} ${f(a)} Q ${f(x + 1.4)} ${f((a + b) / 2)} ${f(x)} ${f(b)} `;
    });
    if (d) out.push(h.path(d.trim(), h.a.fin));
    return out.join('\n');
  };
  const sol = (x0, x1, y) => h.ligne(f(x0), f(y), f(x1), f(y), h.a.arete);

  // ─── Vue 1 : le montage ───────────────────────────────────────────────────────────────
  const G1 = z => {
    const d = 7, eB = 12;
    const yg = z.h - 12;
    const Ls = Math.min(66, (z.h - 46) / 2);
    const yr = yg - Ls - 12;
    const xA = 66, RA = 22, xB = z.l - 84, RB = 12;
    const xs = (xA + xB) / 2 + 6, Lt = 62, rs = 4.5, th = rad(45);
    const u = [KX * Math.sin(th), -(Math.cos(th) + KY * Math.sin(th))];
    const w = [KX * Math.cos(th), Math.sin(th) - KY * Math.cos(th)];
    const C = [xs, yr];
    const haut = add(C, u, Ls), bas = add(C, u, -Ls);
    const yt = yr - 46;
    const rA = RA + d / 2, rB = RB + d / 2;
    const bkA = P3(xA, yr, rA), frA = P3(xA, yr, -rA);
    const bkB = P3(xB, yr, rB), frB = P3(xB, yr, -rB);
    const gL = xs - Lt, gR = xs + Lt;
    const sA = { bk: bez(bkA, add(bkA, [60, 0]), [gL - 50, yr - eB / 2 + d / 2], [gL + 2, yr - eB / 2 + d / 2]),
      fr: bez(frA, add(frA, [60, 0]), [gL - 50, yr + eB / 2 - d / 2], [gL + 2, yr + eB / 2 - d / 2]) };
    const sB = { bk: bez([gR - 2, yr - eB / 2 + d / 2], [gR + 50, yr - eB / 2 + d / 2], add(bkB, [-50, 0]), bkB),
      fr: bez([gR - 2, yr + eB / 2 - d / 2], [gR + 50, yr + eB / 2 - d / 2], add(frB, [-50, 0]), frB) };
    return { d, eB, yg, Ls, yr, xA, RA, xB, RB, xs, Lt, rs, th, u, w, C, haut, bas, yt, rA, rB, sA, sB, gL, gR };
  };
  const vueMontage = z => {
    const q = G1(z), out = [];
    // le sol, au pied des deux fûts
    out.push(sol(8, q.xA - 1.05 * q.RA, q.yg + 2.5));
    out.push(sol(q.xA + 1.05 * q.RA, q.xA + 70, q.yg - 2.5));
    out.push(sol(q.xB - 60, q.xB - 1.05 * q.RB, q.yg + 1.4));
    out.push(sol(q.xB + 1.05 * q.RB, z.l - 8, q.yg - 1.4));
    // ce qui passe derrière les fûts : brins arrière et tours complets
    out.push(corde(q.sA.bk, q.d));
    out.push(corde(q.sB.bk, q.d));
    out.push(bande(tour(q.xA, q.yr, q.rA, 270, 90), q.d));
    out.push(bande(tour(q.xB, q.yr, q.rB, -90, 90), q.d));
    // les fûts : l'arbre à gauche, le poteau à droite
    const eco = [[-0.7, 0, 40], [-0.7, 52, 1e3], [-0.25, 10, q.yr - 16], [-0.25, q.yr + 16, 1e3], [0.2, 0, q.yr - 18], [0.25, q.yr + 18, 1e3], [0.65, 20, q.yr - 20], [0.62, q.yr + 20, q.yg - 20]];
    out.push(fut(q.xA, q.RA, null, q.yg, eco));
    out.push(fut(q.xB, q.RB, q.yt, q.yg, [[-0.4, q.yt + 10, q.yr - 14], [0.3, q.yr + 16, q.yg - 12], [0.35, q.yt + 16, q.yr - 18]]));
    // ce qui passe devant
    out.push(corde(tour(q.xA, q.yr, q.rA, 270, PHI_G - 2), q.d));
    out.push(corde(tour(q.xB, q.yr, q.rB, -90, PHI_D - 360 + 2), q.d));
    out.push(corde(q.sA.fr, q.d));
    out.push(corde(q.sB.fr, q.d));
    // la torsade, de part et d'autre du bâton
    const tg = [[q.gL, q.yr], [q.xs - q.rs - 1, q.yr]], td = [[q.xs + q.rs + 1, q.yr], [q.gR, q.yr]];
    out.push(torsade(tg[0], tg[1], q.eB, 1));
    out.push(torsade(td[1], td[0], q.eB, 1));
    // le bâton
    const bt = add(q.haut, q.u, -0.5);
    out.push(bande([q.bas, bt], 2 * q.rs, 'contour'));
    const bout = [];
    for (let i = 0; i <= 36; i++) { const a = rad(i * 10); bout.push(add(add(q.haut, [1, 0], q.rs * Math.cos(a)), q.w, q.rs * Math.sin(a) / Math.hypot(q.w[0], q.w[1]))); }
    out.push(h.path(poly(bout) + ' Z', blanc('arete')));
    out.push(h.ligne(f(q.bas[0] + 1.2), f(q.bas[1] - 8), f(q.haut[0] + 1.2 - 3), f(q.haut[1] + 14), h.a.fin));
    // le brin avant passe devant le bâton
    out.push(grain([q.xs, q.yr - 1], [1, 0], q.eB, q.eB * 0.8, 1));
    // le bâton tourne autour de la corde
    const ra = q.Ls + 13, arc = [];
    for (let i = 0; i <= 40; i++) { const a = rad(-55 + 155 * i / 40); arc.push([q.xs + KX * ra * Math.sin(a), q.yr - ra * (Math.cos(a) + KY * Math.sin(a))]); }
    out.push(h.fleche(poly(arc)));
    // le poteau vient vers l'arbre
    out.push(h.fleche(`M ${f(q.xB - 16)} ${f(q.yt + 14)} L ${f(q.xB - 54)} ${f(q.yt + 14)}`));
    return out.join('\n');
  };
  const renvoisMontage = z => {
    const q = G1(z);
    const mA = q.sA.fr[15], mT = [q.xs + q.Lt * 0.55, q.yr + q.eB / 2 - 0.5];
    const pb = add(q.C, q.u, q.Ls * 0.55);
    return [
      { n: 1, rond: [f(q.xA + 62), f(q.yr - 58)], cible: [f(q.xA + 8), f(q.yr - 40)], texte: 'ancrage : arbre ou souche' },
      { n: 2, rond: [f(mA[0] - 6), f(q.yr + 44)], cible: [f(mA[0]), f(mA[1] + q.d / 2 - 0.5)], texte: 'corde en boucle, doublée' },
      { n: 3, rond: [f(q.xs - 58), f(q.yr - 48)], cible: [f(pb[0] - q.rs + 0.5), f(pb[1])], texte: 'bâton, entre les deux brins' },
      { n: 4, rond: [f(mT[0] + 8), f(q.yr + 44)], cible: [f(mT[0]), f(mT[1])], texte: 'les brins se tordent' },
      { n: 5, rond: [f(q.xB + 46), f(q.yt + 10)], cible: [f(q.xB + 5), f(q.yt + 26)], texte: 'ce qu’on tire' },
    ];
  };

  // ─── Vues 2 et 3 : vu dans l'axe de la corde ─────────────────────────────────────────
  const G2 = z => {
    const ws = 11, rc = 5.5;
    const yg = z.h - 30;
    const Ls = Math.min(92, (z.h - 76) / 1.3);
    const al = rad(50);
    const H = 0.643 * Ls + 32;
    const C = [z.l * 0.56, yg - H];
    const u = [-Math.sin(al), Math.cos(al)], n = [Math.cos(al), Math.sin(al)];
    const E = add(C, u, Ls);
    const coin = add(E, n, -ws / 2);
    const wk = 14, xk = coin[0] - 0.4, yk = coin[1] - 16;
    return { ws, rc, yg, Ls, al, H, C, u, n, E, coin, wk, xk, yk };
  };
  const baton = (a, b, ws) => {
    const out = [bande([a, b], ws, 'contour')];
    const v = norm([b[0] - a[0], b[1] - a[1]]), nn = [-v[1], v[0]];
    out.push(h.ligne(...add(add(a, v, 10), nn, 1.5).map(f), ...add(add(b, v, -22), nn, 1.5).map(f), h.a.fin));
    return out.join('\n');
  };
  const socle = (z, q) => {
    const out = [];
    out.push(h.rect(8, f(q.yg), f(z.l - 16), f(z.h - q.yg - 6), h.a.hachure('terre', 'fin')));
    out.push(h.ligne(8, f(q.yg), f(z.l - 8), f(q.yg), h.a.contour));
    // le piquet planté, sa pointe dans la terre
    const x0 = q.xk - q.wk, x1 = q.xk, pied = q.yg + 20;
    out.push(h.path(`M ${f(x0)} ${f(q.yg)} L ${f(x0)} ${f(pied)} L ${f((x0 + x1) / 2)} ${f(pied + 10)} L ${f(x1)} ${f(pied)} L ${f(x1)} ${f(q.yg)}`, h.a.blanc));
    out.push(h.path(`M ${f(x0)} ${f(q.yg)} L ${f(x0)} ${f(pied)} L ${f((x0 + x1) / 2)} ${f(pied + 10)} L ${f(x1)} ${f(pied)} L ${f(x1)} ${f(q.yg)}`, h.a.cache));
    out.push(h.rect(f(x0), f(q.yk), f(q.wk), f(q.yg - q.yk), blanc('contour')));
    out.push(h.ligne(f(x0 + 4.5), f(q.yk + 5), f(x0 + 4.5), f(q.yg - 4), h.a.fin));
    return out.join('\n');
  };
  const section = (c, n, off, r) => [add(c, n, off), add(c, n, -off)].map(p => h.cercle(f(p[0]), f(p[1]), r, h.a.plein)).join('\n');
  const arcFleche = (c, r, a0, a1) => h.fleche(poly(cercleP(c, r, a0, a1)));

  const vueBloquer = z => {
    const q = G2(z), out = [socle(z, q)];
    out.push(baton(q.E, add(q.C, q.u, -q.Ls), q.ws));
    out.push(section(q.C, q.n, q.ws / 2 + q.rc, q.rc));
    // la torsion ramène le bâton : le piquet l'arrête
    out.push(arcFleche(q.C, q.Ls + 12, 316, 346));
    return out.join('\n');
  };
  const renvoisBloquer = z => {
    const q = G2(z), s = add(q.C, q.n, q.ws / 2 + q.rc);
    return [
      { n: 6, rond: [f(q.xk - q.wk / 2 - 38), f(q.yk - 18)], cible: [f(q.xk - q.wk / 2), f(q.yk + 14)], texte: 'piquet planté, ou un tronc' },
      { n: 7, rond: [f(s[0] + 44), f(s[1] + 30)], cible: [f(s[0] + q.rc * 0.7), f(s[1] + q.rc * 0.7)], texte: 'la corde, vue en bout' },
    ];
  };

  const vueRelacher = z => {
    const q = G2(z), out = [socle(z, q)];
    // le premier bâton, remonté dans la torsade : il ne touche plus le piquet
    const g = 22;
    out.push(baton(add(q.E, q.u, -g), add(q.C, q.u, -q.Ls - g), q.ws));
    // le deuxième, passé dans la torsade à côté du premier, presque couché
    const a2 = rad(-4), v2 = [Math.cos(a2), Math.sin(a2)], n2 = [-v2[1], v2[0]];
    out.push(baton(add(q.C, v2, -q.Ls * 0.8), add(q.C, v2, q.Ls), q.ws));
    out.push(section(q.C, n2, q.ws / 2 + q.rc, q.rc));
    // on le laisse revenir, retenu
    out.push(arcFleche(q.C, q.Ls + 12, 2, 58));
    return out.join('\n');
  };
  const renvoisRelacher = z => {
    const q = G2(z), a2 = rad(-4), v2 = [Math.cos(a2), Math.sin(a2)];
    const p2 = add(q.C, v2, q.Ls * 0.72), bout1 = add(q.E, q.u, -22);
    const pa = cercleP(q.C, q.Ls + 12, 2, 58)[26];
    return [
      { n: 8, rond: [f(p2[0] - 2), f(p2[1] + 32)], cible: [f(p2[0]), f(p2[1] + q.ws / 2 - 0.5)], texte: 'le deuxième bâton' },
      { n: 9, rond: [f(q.xk - q.wk / 2 - 38), f(q.yk - 18)], cible: [f(bout1[0] - 2), f(bout1[1])], texte: 'le premier dégage le piquet' },
      { n: 10, rond: [f(pa[0] + 26), f(pa[1] - 8)], cible: [f(pa[0] + 1), f(pa[1])], texte: 'revenir d’un tour, retenu' },
    ];
  };

  // ─── Vue 4 : les tours morts sur la traverse ─────────────────────────────────────────
  const G4 = z => {
    const d = 8, RT = 15, yT = 58, x0 = 22, x1 = z.l - 16;
    const rho = RT + d / 2, pas = 2.3 * d, N = 3;
    const xd = z.l * 0.34;       // premier passage par-dessus
    const hel = (a0, a1) => {
      const P = [];
      for (let i = 0; i <= 24; i++) { const a = a0 + (a1 - a0) * i / 24; P.push([xd + pas * a / (2 * Math.PI), yT - rho * Math.cos(a)]); }
      return P;
    };
    const xCh = xd - pas / 2, xMain = xd + pas * (N - 1) + pas / 2;
    return { d, RT, yT, x0, x1, rho, pas, N, xd, hel, xCh, xMain, bas: z.h - 8 };
  };
  const vueTours = z => {
    const q = G4(z), out = [];
    // les passages arrière, sous la traverse
    for (let k = -1; k < q.N; k++) {
      const a0 = k === -1 ? -Math.PI : (2 * k + 1) * Math.PI;
      if (k === q.N - 1) break;
      out.push(bande(q.hel(a0, a0 + Math.PI), q.d));
    }
    // la traverse, écorce gardée
    const { RT, yT, x0, x1 } = q, ex = RT * 0.36;
    out.push(h.path(`M ${f(x0)} ${f(yT - RT)} L ${f(x1)} ${f(yT - RT)} A ${f(ex)} ${f(RT)} 0 0 1 ${f(x1)} ${f(yT + RT)} L ${f(x0)} ${f(yT + RT)} Z`, blanc('contour')));
    out.push(h.ellipse(f(x0), f(yT), f(ex), f(RT), blanc('arete')));
    out.push(h.ellipse(f(x0), f(yT), f(ex * 0.55), f(RT * 0.55), h.a.fin));
    let ec = '';
    [[x0 + 14, -0.5, 30], [x0 + 40, 0.35, 22], [x1 - 36, -0.3, 26], [x1 - 70, 0.55, 18], [x0 + 22, 0.62, 14], [x1 - 20, 0.1, 12]].forEach(([x, k, l]) => {
      ec += `M ${f(x)} ${f(yT + k * RT)} q ${f(l / 2)} -1.4 ${f(l)} 0 `;
    });
    out.push(h.path(ec.trim(), h.a.fin));
    // les passages avant, par-dessus
    for (let k = 0; k < q.N; k++) {
      const P = q.hel(2 * k * Math.PI, (2 * k + 1) * Math.PI);
      out.push(corde(P, q.d, 0.7));
    }
    // le brin de la charge et le brin de la main
    out.push(corde([[q.xCh, yT + q.rho - 1], [q.xCh, q.bas]], q.d));
    out.push(corde([[q.xMain, yT + q.rho - 1], [q.xMain, q.bas]], q.d));
    out.push(h.fleche(`M ${f(q.xCh - 18)} ${f(q.bas - 10)} L ${f(q.xCh - 18)} ${f(q.bas - 52)}`));
    out.push(h.fleche(`M ${f(q.xMain + 18)} ${f(q.bas - 52)} L ${f(q.xMain + 18)} ${f(q.bas - 10)}`));
    return out.join('\n');
  };
  const renvoisTours = z => {
    const q = G4(z), p = q.hel(2 * Math.PI, 3 * Math.PI)[8];
    return [
      { n: 11, rond: [f(p[0] + 30), f(q.yT - q.RT - 26)], cible: [f(p[0] + 2), f(p[1] - 2)], texte: 'le frottement tient la charge' },
      { n: 12, rond: [f(q.x0 + 18), f(q.yT - q.RT - 26)], cible: [f(q.x0 + 22), f(q.yT - q.RT + 0.5)], texte: 'traverse, écorce gardée' },
      { n: 13, rond: [f(q.xMain + 44), f(q.yT + 76)], cible: [f(q.xMain + q.d / 2 - 0.5), f(q.yT + 76)], texte: 'on tire, on lâche, on reprend' },
    ];
  };

  // ─── Vue 5 : en plan, le renvoi par un arbre latéral ─────────────────────────────────
  const G5 = z => {
    const T1 = [48, 54], R1 = 17, T2 = [z.l * 0.40, z.h - 46], R2 = 12, T3 = [z.l - 46, 58], R3 = 15;
    const g = 6, ri = R2 + 2, ro = R2 + 2 + g;
    const a = norm([T1[0] - T2[0], T1[1] - T2[1]]), b = norm([T3[0] - T2[0], T3[1] - T2[1]]);
    const v = norm([-(a[0] + b[0]), -(a[1] + b[1])]);
    const side = (d) => { const p1 = [d[1], -d[0]], p2 = [-d[1], d[0]]; return (p1[0] * v[0] + p1[1] * v[1]) > 0 ? p1 : p2; };
    const nA = side(a), nB = side(b);
    const L23 = Math.hypot(T3[0] - T2[0], T3[1] - T2[1]);
    const M = add(add(T2, nB, ri + g / 2), b, L23 * 0.47), Lt = 24, Ls = 30;
    return { T1, R1, T2, R2, T3, R3, g, ri, ro, a, b, v, nA, nB, M, Lt, Ls };
  };
  // point de tangence depuis Q sur le cercle (O, r), du côté de n
  const tangente = (Q, O, r, n) => {
    const dx = Q[0] - O[0], dy = Q[1] - O[1], dd = Math.hypot(dx, dy), psi = Math.atan2(dy, dx), be = Math.acos(r / dd);
    const c = [psi + be, psi - be].map(t => [O[0] + r * Math.cos(t), O[1] + r * Math.sin(t)]);
    const s = p => (p[0] - O[0]) * n[0] + (p[1] - O[1]) * n[1];
    return s(c[0]) > s(c[1]) ? c[0] : c[1];
  };
  const angle = (O, p) => Math.atan2(p[1] - O[1], p[0] - O[0]) * 180 / Math.PI;
  // arc de O, de p0 à p1, en passant du côté de dir
  const arcPar = (O, r, p0, p1, dir) => {
    let a0 = angle(O, p0), a1 = angle(O, p1);
    const ad = Math.atan2(dir[1], dir[0]) * 180 / Math.PI;
    const dans = (a, x, y) => { const t = ((a - x) % 360 + 360) % 360, s = ((y - x) % 360 + 360) % 360; return t <= s; };
    if (!dans(ad, a0, a1)) { a1 -= 360; if (a1 > a0) a1 -= 360; } else if (a1 < a0) a1 += 360;
    if (!dans(ad, Math.min(a0, a1), Math.max(a0, a1))) { /* garde-fou */ }
    return cercleP(O, r, a0, a1, 30);
  };
  const vuePlan = z => {
    const q = G5(z), out = [];
    const { T1, T2, T3, a, b, nA, nB, M } = q;
    const neg = v => [-v[0], -v[1]];
    // les axes des brins, prolongés : là où la corde fouette si elle casse
    const prol = (p, dir, L) => h.ligne(f(p[0]), f(p[1]), f(p[0] + dir[0] * L), f(p[1] + dir[1] * L), axe);
    const c2 = add(T2, nA, q.ri + q.g / 2), c3 = add(T2, nB, q.ri + q.g / 2);
    const jusquau = (p, dir) => {            // longueur jusqu'au bord de la vue, moins une marge
      const t = [dir[0] > 0 ? (z.l - 4 - p[0]) / dir[0] : dir[0] < 0 ? (4 - p[0]) / dir[0] : 1e9,
        dir[1] > 0 ? (z.h - 4 - p[1]) / dir[1] : dir[1] < 0 ? (4 - p[1]) / dir[1] : 1e9];
      return Math.min(...t);
    };
    const bouts = [[add(c2, neg(a), 12), neg(a)], [add(c3, neg(b), 12), neg(b)],
      [add(add(T1, nA, 2), a, q.R1 + 6), a], [add(add(T3, nB, 2), b, q.R3 + 6), b]];
    for (const [p, dir] of bouts) out.push(prol(p, dir, jusquau(p, dir)));
    // les brins du premier segment : de l'arbre à tirer au renvoi
    const eA_o = add(T2, nA, q.ro), eA_i = add(T2, nA, q.ri);
    const t1o = tangente(eA_o, T1, q.R1 + 1.5, nA), t1i = tangente(eA_i, T1, q.R1 + 1.5, neg(nA));
    // autour du renvoi
    const eB_o = add(T2, nB, q.ro), eB_i = add(T2, nB, q.ri);
    // vers la torsade
    const g0 = add(M, b, -q.Lt), g1 = add(M, b, q.Lt);
    const t3o = tangente(add(g1, nB, 2), T3, q.R3 + 1.5, nB), t3i = tangente(add(g1, nB, -2), T3, q.R3 + 1.5, neg(nB));
    const brins = [
      [t1o, eA_o], [t1i, eA_i],
      [eB_o, add(g0, nB, 2.5)], [eB_i, add(g0, nB, -2.5)],
      [add(g1, nB, 2.5), t3o], [add(g1, nB, -2.5), t3i],
    ];
    let d = brins.map(s => poly(s)).join(' ');
    d += ' ' + poly(arcPar(T1, q.R1 + 1.5, t1o, t1i, a));
    d += ' ' + poly(arcPar(T2, q.ro, eA_o, eB_o, q.v));
    d += ' ' + poly(arcPar(T2, q.ri, eA_i, eB_i, q.v));
    d += ' ' + poly(arcPar(T3, q.R3 + 1.5, t3o, t3i, b));
    out.push(h.path(d, h.a.arete));
    // les arbres : celui qu'on tire, le renvoi ; la souche d'ancrage
    for (const [T, R] of [[T1, q.R1], [T2, q.R2]]) {
      out.push(h.cercle(f(T[0]), f(T[1]), R, blanc('contour')));
      out.push(h.cercle(f(T[0]), f(T[1]), R - 3, h.a.detail));
    }
    out.push(h.cercle(f(T3[0]), f(T3[1]), q.R3, blanc('contour')));
    for (const k of [0.68, 0.4, 0.14]) out.push(h.cercle(f(T3[0]), f(T3[1]), f(q.R3 * k), h.a.fin));
    // la torsade et le bâton
    out.push(torsade(g0, M, 8, 1), torsade(g1, M, 8, 1));
    const s0 = add(M, nB, -q.Ls), s1 = add(M, nB, q.Ls);
    out.push(bande([s0, s1], 5, 'contour'));
    // le piquet où il bute
    const pk = add(s0, nB, -1);
    const pq = add(add(pk, b, 8), nB, 3);
    out.push(h.cercle(f(pq[0]), f(pq[1]), 5.5, blanc('contour')));
    out.push(h.cercle(f(pq[0]), f(pq[1]), 2.2, h.a.fin));
    // le tireur, au bout du bâton, hors des axes
    // vu d'en haut : les épaules, la tête, deux bras coudés en dehors, les mains sur le bâton
    const tp = add(M, nB, q.Ls + 17);
    // deux empreintes de bottes, pointes vers le bâton
    const ovale = (c, la, lo) => { const e = []; for (let i = 0; i < 36; i++) { const t = rad(i * 10); e.push(add(add(c, b, la * Math.cos(t)), nB, lo * Math.sin(t))); } return poly(e) + ' Z'; };
    for (const s of [-1, 1]) {
      const c = add(tp, b, s * 6);
      out.push(h.path(ovale(add(c, nB, -3), 3.4, 6), blanc('arete')));
      out.push(h.path(ovale(add(c, nB, 6), 2.8, 2.8), blanc('arete')));
    }
    // renvoi 19 : un second trait vers l'autre prolongement
    { const c3b = add(T2, nB, q.ri + q.g / 2), pa = add(c3b, neg(b), 52), r19 = [pa[0] - 30, pa[1] - 6];
      const p1 = add(c2, neg(a), 40), d = norm([p1[0] - r19[0], p1[1] - r19[1]]);
      out.push(`<line x1="${f(r19[0] + d[0] * 7)}" y1="${f(r19[1] + d[1] * 7)}" x2="${f(p1[0])}" y2="${f(p1[1])}" fill="none" stroke="#000" stroke-width="0.5" stroke-dasharray="3 2.5"/>`, h.cercle(f(p1[0]), f(p1[1]), 1.2, h.a.plein)); }
    // l'arbre tiré vient vers le renvoi
    const f0 = add(add(T1, neg(a), q.R1 - 4), nA, q.ro + 4);
    out.push(h.fleche(`M ${pt(f0)} L ${pt(add(f0, neg(a), 30))}`));
    return out.join('\n');
  };
  const renvoisPlan = z => {
    const q = G5(z), { T1, T2, T3, a, b, nA, nB, M } = q;
    const neg = v => [-v[0], -v[1]];
    const tp = add(M, nB, q.Ls + 17);
    const c3 = add(T2, nB, q.ri + q.g / 2), pa = add(c3, neg(b), 52);
    const st = add(M, nB, q.Ls * 0.5);
    return [
      { n: 14, rond: [f(T1[0] + 44), f(T1[1] - 30)], cible: [f(T1[0] + q.R1 * 0.7), f(T1[1] - q.R1 * 0.7)], texte: 'le pied de l’arbre à tirer' },
      { n: 15, rond: [f(T2[0] - 44), f(T2[1] + 4)], cible: [f(T2[0] - q.R2 - 0.5), f(T2[1])], texte: 'arbre latéral : le renvoi' },
      { n: 16, rond: [f(T3[0] - 4), f(T3[1] + 46)], cible: [f(T3[0]), f(T3[1] + q.R3 + 0.5)], texte: 'ancrage' },
      { n: 17, rond: [f(M[0] - 40), f(M[1] - 34)], cible: [f(M[0] - 3), f(M[1] - 4)], texte: 'tourniquet, après le renvoi' },
      { n: 18, rond: [f(tp[0] + 34), f(tp[1] + 4)], cible: [f(tp[0] + 9), f(tp[1])], texte: 'le tireur se tient ici' },
      { n: 19, rond: [f(pa[0] - 30), f(pa[1] - 6)], cible: [f(pa[0]), f(pa[1])], texte: 'axe des brins : personne' },
    ];
    void a; void st;
  };

  return {
    ref: '109-12',
    titre: 'Le tourniquet espagnol',
    desc: 'Cinq vues du tourniquet espagnol. De trois quarts : une corde doublée en boucle entre un arbre et un poteau, un bâton glissé entre les deux brins au milieu ; on le tourne autour de la corde, les brins se tordent de part et d’autre du bâton et la boucle raccourcit, le poteau vient vers l’arbre. Vu dans l’axe de la corde, le bâton bloqué : son bout bas bute contre un piquet planté du côté où la torsion le ramène. Toujours dans l’axe, le relâchement : un deuxième bâton passé dans la torsade à côté du premier, on le tient pendant que le premier se dégage du piquet, et on le laisse revenir d’un tour, retenu. De face, des tours morts sur une traverse écorcée : le frottement retient la charge pendant qu’on reprend prise. En plan, le renvoi : la boucle va du pied de l’arbre à tirer à un arbre latéral, en fait le tour, et repart vers une souche d’ancrage ; le tourniquet est sur ce deuxième brin, le tireur au bout du bâton, hors du prolongement de chacun des brins.',
    format: 'pleine',
    disposition: [['montage'], ['bloquer', 'relacher'], ['tours', 'plan']],
    hauteurs: [1, 1.05, 1.05],
    largeurs: [[1], [1, 1], [2, 3]],
    vues: {
      montage: { titre: 'Monter : on tourne le bâton', dessin: vueMontage, renvois: renvoisMontage },
      bloquer: { titre: 'Bloquer, vu dans l’axe de la corde', dessin: vueBloquer, renvois: renvoisBloquer },
      relacher: { titre: 'Relâcher, un tour à la fois', dessin: vueRelacher, renvois: renvoisRelacher },
      tours: { titre: 'Tours morts sur la traverse', dessin: vueTours, renvois: renvoisTours },
      plan: { titre: 'Renvoyer, vu de dessus', dessin: vuePlan, renvois: renvoisPlan },
    },
  };
};
