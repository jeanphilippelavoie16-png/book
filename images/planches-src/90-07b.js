// 90-07b — Le canot d'écorce d'épinette : le bout pincé et la couture (ch. 90, §9 « Le canot
// d'écorce d'épinette »).
// Aucune cote : le chapitre ne donne ni la taille des lattes ni l'écart des points.
// Le bout : « chaque bout se pince entre deux lattes, avec une corde d'écorce, et le tout se lie
// à la racine. Les bouts s'étanchent à la gomme ou au suif ; les grandes ouvertures se bouchent
// à l'herbe, aux copeaux, à la mousse ou à l'écorce interne mêlées de gomme ou de glaise. »
// Pour serrer deux lattes l'une contre l'autre, la corde fait le tour des deux : devant, elle
// passe sur la tranche ; derrière, elle traverse l'écorce doublée. Ces trous sont sous l'eau :
// la gomme des bouts les couvre aussi.
// La couture (le canot cousu, pour durer) : bords amincis avant de coudre et de gommer ; là où
// la couture suit le fil, points courts et longs en alternance, ou une latte cousue dans la
// couture ; deux ou trois tours dans un même trou ; racine, ou babiche.
// La latte de couture est posée sur la couture, dehors : le chapitre ne dit pas de quel côté.
// La charte : la coque garde son contour fort, le fil de la couture en travers aussi. Pas de gris :
// les deux coupes sont hachurées, la couture vue de dehors est à plat, et les lattes sont trop
// minces pour porter une ombre. Pas de rouge : un montage, sans geste ni point que le chapitre dit
// de vérifier ; les flèches du trait de coupe disent d'où on regarde et restent noires.

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
  let sd = 29;
  const rnd = () => (sd = (sd * 9301 + 49297) % 233280) / 233280;
  // Un bord cassé (arrachement) : ligne ondulée.
  const onde = (a, b, n = 18, amp = 2.2) => samp(t => {
    const x = a[0] + (b[0] - a[0]) * t, y = a[1] + (b[1] - a[1]) * t;
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]), nx = -(b[1] - a[1]) / L, ny = (b[0] - a[0]) / L;
    const w = amp * Math.sin(t * L / 6.5);
    return [x + nx * w, y + ny * w];
  }, 0, 1, n);

  // ─── Le bout, de côté ──────────────────────────────────────────────────────────────
  function gB(z) {
    const x0 = 12, xT = z.l - 58, yT = 30;
    const yg0 = yT + z.h * 0.24, yk0 = z.h - 40;
    const xK = x0 + (xT - x0) * 0.56, yK = yk0 - (yk0 - yg0) * 0.42;
    const yG = x => yg0 - (yg0 - yT) * Math.pow((x - x0) / (xT - x0), 2.2);
    const yKq = x => yk0 - (yk0 - yK) * Math.pow(Math.max(0, x - x0) / (xK - x0), 2);
    const pente = 2 * (yk0 - yK) / (xK - x0), lam = 0.9 * (xT - xK);
    const Cc = [xK + lam, yK - lam * pente], bzf = bez([xT, yT], Cc, [xK, yK]);
    const etr = samp(bzf, 0, 1, 60);
    const nn = normales(etr);
    // un point de l'étrave, décalé de e vers l'intérieur
    const E = (t, e) => { const i = Math.round(t * 60); return [etr[i][0] + nn[i][0] * e, etr[i][1] + nn[i][1] * e]; };
    // le même, sans arrondir t (pour une forme lisse le long de l'étrave)
    const Ef = (t, e) => {
      const p = bzf(t);
      const dx = 2 * (1 - t) * (Cc[0] - xT) + 2 * t * (xK - Cc[0]), dy = 2 * (1 - t) * (Cc[1] - yT) + 2 * t * (yK - Cc[1]);
      const L = Math.hypot(dx, dy);
      return [p[0] - dy / L * e, p[1] + dx / L * e];
    };
    const bas = x => {
      if (x <= xK) return yKq(x);
      let best = etr[0]; etr.forEach(p => { if (Math.abs(p[0] - x) < Math.abs(best[0] - x)) best = p; });
      return best[1];
    };
    const LAT = [4, 16], FIN = 0.76, LIENS = [0.08, 0.24, 0.4, 0.56, 0.71];
    const racine = [];
    for (let x = x0 + 18; x < xT - 26; x += 26) racine.push(x);
    // Le trait de coupe de la vue « coupé à plat » : à plat, à mi-hauteur de la latte, par le
    // lien du milieu. xg : là où il sort de l'écorce, au plat-bord ; xe : là où il sort à l'étrave.
    const yC = Ef(0.4, 8)[1];
    const xg = x0 + (xT - x0) * Math.pow((yg0 - yC) / (yg0 - yT), 1 / 2.2);
    let ta = 0, tb = 1;
    for (let k = 0; k < 40; k++) { const tm = (ta + tb) / 2; if (bzf(tm)[1] < yC) ta = tm; else tb = tm; }
    const xe = bzf(ta)[0];
    // Le bouchon du pied, sous le bout des lattes : un ovale le long de l'étrave, à cheval sur la tranche.
    const BO = { tc: 0.87, dt: 0.1, ec: 6, de: 11 };
    return { x0, xT, yT, yg0, yk0, xK, yK, yG, yKq, etr, E, Ef, bas, LAT, FIN, LIENS, racine, yC, xg, xe, BO };
  }
  function bout(z) {
    const g = gB(z), { x0, xT, yT, yG, yKq, xK, etr, E, bas, LAT, FIN, LIENS, racine } = g, o = [];
    const haut = samp(x => [x, yG(x)], x0, xT, 60);
    const quille = samp(x => [x, yKq(x)], xK, x0, 50);
    const gauche = onde([x0, yKq(x0)], [x0, yG(x0)], 16);
    const coque = haut.concat(etr.slice(1), quille.slice(1), gauche.slice(1, -1));
    o.push(h.path(D(coque, true), h.a.blanc));
    // Le fil de l'écorce, dans la longueur.
    [0.22, 0.42, 0.62, 0.82].forEach(t => {
      let x = x0 + 6 + rnd() * 10;
      while (x < xT - 40) {
        const x2 = x + 16 + rnd() * 30;
        const pts = samp(v => [v, yG(v) + t * (bas(v) - yG(v))], x, Math.min(x2, xT - 40), 6);
        // pas de fil sous les lattes ni dans la gomme
        const libre = pts.filter(p => etr.every(q => Math.hypot(q[0] - p[0], q[1] - p[1]) > LAT[1] + 10));
        if (libre.length > 2) o.push(h.path(D(libre), h.a.fin));
        x = x2 + 5 + rnd() * 8;
      }
    });
    // Le plat-bord, caché ; la racine qui lie l'écorce au plat-bord.
    o.push(h.path(D(samp(x => [x, yG(x) + 10], x0 + 3, xT - 14, 40)), h.a.cache));
    racine.forEach(x => {
      for (const k of [-2.2, 0, 2.2]) o.push(h.path(D([[x + k, yG(x + k) - 0.3], [x + k + 1.2, yG(x + k) + 15]]), h.a.detail));
      o.push(h.cercle(f(x + 1.2), f(yG(x) + 16.5), 1.5, h.a.plein));
    });
    // La gomme sur la tranche, toute la hauteur de l'étrave.
    o.push(h.path(bande(etr, 0, 3.2), h.a.plein));
    // La latte du dehors ; l'autre est derrière l'écorce.
    const lat = samp(t => E(t, 0), 0, FIN, 40).map((p, i, a) => p);
    const t0 = lat[0], t1 = lat[1], L = Math.hypot(t0[0] - t1[0], t0[1] - t1[1]);
    lat.unshift([t0[0] + (t0[0] - t1[0]) / L * 8, t0[1] + (t0[1] - t1[1]) / L * 8]);
    o.push(h.path(bande(lat, LAT[0], LAT[1]), h.a.blanc), h.path(bande(lat, LAT[0], LAT[1]), h.a.arete));
    o.push(h.path(D(decale(lat, (LAT[0] + LAT[1]) / 2).slice(3, -3)), h.a.fin));
    // La corde d'écorce : trois tours autour des deux lattes, par un trou derrière elles ;
    // le trou gommé.
    LIENS.forEach(t => {
      const i = Math.round(t * 60), nv = normales(etr)[i], tg = [nv[1], -nv[0]];
      for (const k of [-2.2, 0, 2.2]) {
        const a = [etr[i][0] + tg[0] * k - nv[0] * 0.8, etr[i][1] + tg[1] * k - nv[1] * 0.8];
        o.push(h.path(D([a, [a[0] + nv[0] * (LAT[1] + 4.5), a[1] + nv[1] * (LAT[1] + 4.5)]]), h.a.arete));
      }
      const p = E(t, LAT[1] + 5);
      o.push(h.ellipse(f(p[0]), f(p[1]), 3.4, 3.4, h.a.plein));
    });
    o.push(h.path(D(haut), h.a.contour), h.path(D(etr), h.a.contour), h.path(D(quille), h.a.contour));
    o.push(h.path(D(gauche), h.a.detail));
    // Le bouchon du pied, sous le bout des lattes : mousse, herbe ou copeaux mêlés de gomme,
    // une masse ovale qui remplit l'ouverture et déborde un peu la tranche.
    const { BO } = g;
    const bord = samp(a => g.Ef(BO.tc + BO.dt * Math.cos(a), BO.ec + BO.de * Math.sin(a)), 0, 2 * Math.PI, 36).slice(0, -1);
    o.push(h.path(lisse(bord, true), h.a.blanc));
    let sb = 7;
    const rb = () => (sb = (sb * 9301 + 49297) % 233280) / 233280;
    // les fibres, courtes, couchées à peu près dans la longueur du bouchon
    const pa = g.Ef(BO.tc - 0.05, BO.ec), pb = g.Ef(BO.tc + 0.05, BO.ec), a0 = Math.atan2(pb[1] - pa[1], pb[0] - pa[0]);
    for (let u = -0.86; u <= 0.87; u += 0.215) for (let v = -0.78; v <= 0.79; v += 0.26) {
      const uu = u + (rb() - 0.5) * 0.1, vv = v + (rb() - 0.5) * 0.12;
      if (uu * uu + vv * vv > 0.66) continue;
      const p = g.Ef(BO.tc + BO.dt * uu, BO.ec + BO.de * vv), a = a0 + (rb() - 0.5) * 1.3, l = 1.8 + rb() * 1.1;
      const c = Math.cos(a), s = Math.sin(a), k = (rb() - 0.5) * 1.6;
      o.push(h.path(`M ${f(p[0] - c * l)} ${f(p[1] - s * l)} Q ${f(p[0] - s * k)} ${f(p[1] + c * k)} ${f(p[0] + c * l)} ${f(p[1] + s * l)}`, h.a.fin));
    }
    o.push(h.path(lisse(bord, true), h.a.arete));
    // Le trait de coupe de la vue « coupé à plat » : deux traits épais hors du dessin, et la
    // flèche qui dit d'où on regarde (d'en haut).
    const { yC, xg, xe } = g;
    const xl0 = xg - 78, xl1 = xg - 64, xr0 = xe + 10, xr1 = xe + 24;
    o.push(h.ligne(xl0, yC, xl1, yC, h.a.contour), h.ligne(xr0, yC, xr1, yC, h.a.contour));
    o.push(h.fleche(`M ${f(xl0 + 1)} ${f(yC - 19)} L ${f(xl0 + 1)} ${f(yC - 3)}`));
    o.push(h.fleche(`M ${f(xr1 - 1)} ${f(yC - 19)} L ${f(xr1 - 1)} ${f(yC - 3)}`));
    return o.join('\n');
  }

  // ─── Le bout, coupé à plat ─────────────────────────────────────────────────────────
  function gBC(z) {
    const cx = z.l / 2, ys = 34, eb = 3.6, Lt = 15, Lw = Math.min(56, z.h * 0.2);
    const yl0 = ys + 7, yl1 = yl0 + Lw, yh = yl1 + 7, yd = yh + 22;
    const yEnd = z.h - 18, xw = Math.min(z.l / 2 - 16, 92);
    // la ligne moyenne de chaque épaisseur d'écorce, de la tranche jusqu'au canot ouvert
    const couche = s => [[cx + s * eb / 2, ys]].concat(
      samp(bez([cx + s * eb / 2, yd], [cx + s * eb / 2, yd + (yEnd - yd) * 0.55], [cx + s * xw, yEnd]), 0, 1, 30));
    return { cx, ys, eb, Lt, Lw, yl0, yl1, yh, yd, yEnd, xw, couche };
  }
  function boutc(z) {
    const g = gBC(z), { cx, ys, eb, Lt, yl0, yl1, yh, couche } = g, o = [];
    // Les deux lattes, de part et d'autre de l'écorce doublée.
    for (const s of [-1, 1]) {
      const x = s < 0 ? cx - eb - Lt : cx + eb;
      o.push(h.rect(f(x), f(yl0), Lt, f(yl1 - yl0), h.a.hachure('bois')));
    }
    // L'écorce des deux flancs.
    for (const s of [-1, 1]) o.push(h.path(bande(couche(s), -eb / 2, eb / 2), h.a.plein));
    o.push(h.path(D([[cx, ys + 1], [cx, g.yd - 2]]), h.a.detail.replace('#1A1A1A', '#FFFFFF')));
    // La corde : devant, sur la tranche ; derrière, à travers l'écorce, dans un trou.
    const xo = eb + Lt + 3.5;
    const corde = [[cx, yh], [cx - xo + 2, yh + 0.5], [cx - xo, yh - 6], [cx - xo, yl0 + 2], [cx - xo + 3, ys - 1],
      [cx, ys - 5], [cx + xo - 3, ys - 1], [cx + xo, yl0 + 2], [cx + xo, yh - 6], [cx + xo - 2, yh + 0.5]];
    o.push(h.rect(f(cx - eb - 1.5), f(yh - 1.8), f(2 * eb + 3), 3.6, h.a.blanc));
    o.push(h.path(lisse(corde, true), h.a.arete));
    // La gomme : sur la tranche, et sur le trou de chaque côté.
    o.push(h.path(lisse([[cx - 7, ys + 2], [cx - 5, ys - 6], [cx, ys - 9], [cx + 5, ys - 6], [cx + 7, ys + 2], [cx, ys + 4]], true), h.a.plein));
    for (const s of [-1, 1]) o.push(h.ellipse(f(cx + s * (eb + 2.5)), f(yh), 3.2, 4.2, h.a.plein));
    return o.join('\n');
  }

  // ─── La couture, vue de dehors ─────────────────────────────────────────────────────
  function gCo(z) {
    const yA = 22, yZ = z.h - 14, ys = Math.round((yA + yZ) / 2) + 4, ov = 18;
    const xm = Math.round(z.l * 0.54);
    const g1 = [10, xm - 8], g2 = [xm + 8, z.l - 10];
    const pts1 = [];
    for (let x = g1[0] + 16, i = 0; x < g1[1] - 10; x += 21, i++) pts1.push({ x, long: i % 2 === 1 });
    const pts2 = [];
    for (let x = g2[0] + 14; x < g2[1] - 8; x += 20) pts2.push(x);
    // Le médaillon : un point court grossi trois fois, sous le point qu'il grossit.
    const src = pts1[2], rs = 11, R = 38, K = 3;
    const M = [src.x, ys + rs + 8 + R];
    return { yA, yZ, ys, ov, xm, g1, g2, pts1, pts2, src, rs, R, K, M };
  }
  function couture(z) {
    const g = gCo(z), { yA, yZ, ys, ov, g1, g2, pts1, pts2 } = g, o = [];
    // Un point : trois tours dans le même trou. Les brins sortent tous du trou du haut, s'écartent
    // un peu en passant sur le bord, et rentrent tous dans le trou du bas.
    const brins = (x, yh, yb, ecart, ep, halo, rt) => {
      const d = k => `M ${f(x)} ${f(yh)} Q ${f(x + 2 * k)} ${f((yh + yb) / 2)} ${f(x)} ${f(yb)}`;
      const ks = [-ecart, 0, ecart];
      ks.forEach(k => o.push(h.path(d(k), `fill="none" stroke="#FFFFFF" stroke-width="${halo}" stroke-linecap="round"`)));
      // entre les brins, le bord et le fil de l'écorce sont cachés : les tours couvrent le bord
      o.push(h.path(`${d(-ecart)} Q ${f(x + 2 * ecart)} ${f((yh + yb) / 2)} ${f(x)} ${f(yh)} Z`, h.a.blanc));
      ks.forEach(k => o.push(h.path(d(k), ep)));
      o.push(h.cercle(f(x), f(yh), rt, h.a.plein), h.cercle(f(x), f(yb), rt, h.a.plein));
    };
    const point = (x, yh, yb) => brins(x, yh, yb, yb - yh > 20 ? 2.4 : 2, h.a.detail, 2, 1.7);
    for (const [xa, xb] of [g1, g2]) {
      const bords = [onde([xa, yA], [xb, yA], 20), onde([xb, yA], [xb, yZ], 16), onde([xb, yZ], [xa, yZ], 20), onde([xa, yZ], [xa, yA], 16)];
      o.push(h.path(D([].concat(...bords), true), h.a.blanc));
      // Le fil de l'écorce, dans le sens de la couture.
      for (let y = yA + 9; y < yZ - 5; y += 11) {
        if (Math.abs(y - ys) < 5 || Math.abs(y - (ys - ov)) < 3) continue;
        let x = xa + 5 + rnd() * 8;
        while (x < xb - 8) {
          const x2 = Math.min(xb - 5, x + 14 + rnd() * 28);
          o.push(h.path(D([[x, y], [x2, y]]), h.a.fin));
          x = x2 + 4 + rnd() * 7;
        }
      }
      // Le bord de la pièce du dessous, caché sous celle du dessus.
      o.push(h.path(D([[xa + 3, ys - ov], [xb - 3, ys - ov]]), h.a.cache));
      bords.forEach(b => o.push(h.path(D(b), h.a.detail)));
    }
    // À gauche : points courts et longs en alternance, trois tours par trou.
    o.push(h.path(D([[g1[0] + 2, ys], [g1[1] - 2, ys]]), h.a.arete));
    pts1.forEach(({ x, long }) => point(x, long ? ys - 14 : ys - 6, long ? ys + 14 : ys + 6));
    // À droite : une latte cousue sur la couture.
    o.push(h.path(D([[g2[0] + 2, ys], [g2[1] - 2, ys]]), h.a.arete));
    o.push(h.rect(f(g2[0] + 4), f(ys - 5), f(g2[1] - g2[0] - 8), 10, h.a.blanc), h.rect(f(g2[0] + 4), f(ys - 5), f(g2[1] - g2[0] - 8), 10, h.a.arete));
    o.push(h.path(D([[g2[0] + 10, ys + 0.5], [g2[1] - 10, ys - 0.5]]), h.a.fin));
    pts2.forEach(x => point(x, ys - 10, ys + 10));
    // Le médaillon : le point cerclé, grossi trois fois juste en dessous.
    const { src, rs, R, K, M } = g;
    o.push(h.cercle(src.x, ys, rs, h.a.detail));
    o.push(h.ligne(src.x, ys + rs, src.x, M[1] - R, h.a.detail));
    o.push(h.cercle(M[0], M[1], R, h.a.blanc));
    // le fil de l'écorce, grossi
    for (let dy = -R + 6; dy < R - 4; dy += 8) {
      if (Math.abs(dy) < 4) continue;
      const c = Math.sqrt(R * R - dy * dy) - 3;
      let x = M[0] - c + rnd() * 6;
      while (x < M[0] + c - 4) {
        const x2 = Math.min(M[0] + c, x + 12 + rnd() * 22);
        o.push(h.path(D([[x, M[1] + dy], [x2, M[1] + dy]]), h.a.fin));
        x = x2 + 4 + rnd() * 6;
      }
    }
    // le bord de la pièce du dessus, aminci
    const cb = Math.sqrt(R * R) - 1.5;
    o.push(h.path(D([[M[0] - cb, M[1]], [M[0] + cb, M[1]]]), h.a.arete));
    // les trois brins : sortis du trou du haut (les deux pièces), rentrés au trou du bas (celle du dessous)
    const ym = (src.long ? 14 : 6) * K;
    brins(M[0], M[1] - ym, M[1] + ym, 6, h.a.arete, 4.2, 3.4);
    o.push(h.cercle(M[0], M[1], R, h.a.arete));
    return o.join('\n');
  }

  // ─── La couture, en travers ────────────────────────────────────────────────────────
  function gCt(z) {
    const x0 = 10, x1 = z.l - 10, yo = Math.round(z.h * 0.42), tk = 22;
    const xe2 = Math.round(z.l * 0.26), Lt = Math.round(z.l * 0.4), xe1 = xe2 + Lt;
    const b = x => yo + tk - 2 - (tk - 4) * (x - xe2) / Lt;   // la face commune des deux biseaux
    const xA = xe1 - 22, xB = xe1 + 12;                      // A dans le biseau, B passé le bord
    const yH = yo - 1.9, yB = yo + tk + 1.9;                   // le fil, serré dessus et dessous
    return { x0, x1, yo, tk, xe2, Lt, xe1, b, xA, xB, yH, yB };
  }
  function couturec(z) {
    const g = gCt(z), { x0, x1, yo, tk, xe2, xe1, b, xA, xB, yH, yB } = g, o = [];
    // Deux trames qui se croisent, pour voir deux pièces : la gauche en /, la droite en \.
    o.push('<defs><pattern id="h9007b-bois-g" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">'
      + '<line x1="0" y1="0" x2="0" y2="6" stroke="#1A1A1A" stroke-width="0.7"/></pattern></defs>');
    // La pièce de gauche, amincie par-dessous ; celle de droite, amincie par-dessus. Les deux
    // biseaux se complètent : dessus et dessous de niveau, une seule épaisseur.
    const p1 = [[x0, yo], [xe1, yo], [xe1, yo + 2], [xe2, b(xe2)], [xe2, yo + tk]].concat(onde([x0, yo + tk], [x0, yo], 4, 1.6).slice(0, -1));
    const p2 = [[xe2, yo + tk], [xe2, b(xe2)], [xe1, yo + 2], [xe1, yo], [x1, yo]].concat(onde([x1, yo], [x1, yo + tk], 4, 1.6).slice(0, -1), [[x1, yo + tk]]);
    o.push(h.chemin(p1, h.a.hachure('bois'), true));
    o.push(h.chemin(p2, 'fill="url(#h9007b-bois-g)" stroke="#1A1A1A" stroke-width="1.4" stroke-linejoin="round"', true));
    // La gomme, chaude, sur la couture, dehors.
    const gm = [[xA - 20, yo - 0.2], [xA - 5, yo - 7.6], [(xA + xB) / 2, yo - 10], [xB + 5, yo - 7.6], [xB + 18, yo - 0.2]];
    o.push(h.path(lisse(gm) + ` L ${f(xA - 18)} ${f(yo - 0.2)} Z`, h.a.plein));
    // Les deux trous, en blanc dans la trame : A à travers les deux pièces, dans le biseau ;
    // B dans la pièce du dessous seule, passé le bord aminci de celle du dessus. Puis le fil,
    // qui passe par A, sous les pièces, remonte par B et revient par-dessus, dans la gomme.
    const blanc = w => `fill="none" stroke="#FFFFFF" stroke-width="${w}" stroke-linecap="butt"`;
    for (const x of [xA, xB]) o.push(h.path(`M ${f(x)} ${f(yo - 1.2)} L ${f(x)} ${f(yo + tk + 1.2)}`, blanc(5.6)));
    const r = 3.4, xm = (xA + xB) / 2;
    const dessus = `M ${f(xB)} ${f(yH + r)} Q ${f(xB)} ${f(yH)} ${f(xB - r)} ${f(yH - 0.6)} Q ${f(xm)} ${f(yH - 1.2)} ${f(xA + r)} ${f(yH - 0.6)} Q ${f(xA)} ${f(yH)} ${f(xA)} ${f(yH + r)}`;
    const fil = `M ${f(xA)} ${f(yH + r)} L ${f(xA)} ${f(yB - r)} Q ${f(xA)} ${f(yB)} ${f(xA + r)} ${f(yB + 0.3)}`
      + ` Q ${f(xm)} ${f(yB + 0.6)} ${f(xB - r)} ${f(yB + 0.3)} Q ${f(xB)} ${f(yB)} ${f(xB)} ${f(yB - r)}`
      + ` L ${f(xB)} ${f(yH + r)} Q ${f(xB)} ${f(yH)} ${f(xB - r)} ${f(yH - 0.6)}`
      + ` Q ${f(xm)} ${f(yH - 1.2)} ${f(xA + r)} ${f(yH - 0.6)} Q ${f(xA)} ${f(yH)} ${f(xA)} ${f(yH + r)} Z`;
    o.push(h.path(dessus, 'fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round"'));
    o.push(h.ligne(xA + 2.8, yo, xB - 2.8, yo, h.a.arete));   // le dessus de l'écorce, sous le fil
    o.push(h.path(fil, h.a.contour));
    return o.join('\n');
  }

  return {
    ref: '90-07b',
    titre: 'Le canot d’écorce d’épinette, le bout et la couture',
    desc: 'Le bout du canot d’une feuille, de côté : les deux flancs d’écorce pincés entre deux lattes, une dehors de chaque côté, qui descendent de la pointe du plat-bord le long de l’étrave ; cinq liens de corde d’écorce, trois tours chacun, font le tour des deux lattes et traversent l’écorce derrière elles ; la tranche et les trous sont gommés ; au pied, sous le bout des lattes, l’ouverture est bouchée d’un tampon ovale de mousse ou d’herbe mêlée de gomme, collé sur la tranche ; l’écorce est liée au plat-bord à la racine ; un trait de coupe, à plat, à mi-hauteur de la latte, par le lien du milieu, avec les flèches qui regardent d’en haut. Le bout coupé à plat à cet endroit : l’écorce des deux flancs doublée entre les deux lattes, la corde qui passe devant sur la tranche et derrière à travers l’écorce, la gomme sur la tranche et sur les trous. Le canot cousu, pour durer, la couture le long du fil vue de dehors : à gauche, des points courts et des points longs en alternance, chacun de trois brins qui sortent du même trou et rentrent dans le même trou, et un point court grossi trois fois dans un médaillon ; à droite, une latte cousue sur la couture. La couture en travers : les deux bords amincis en biseau et posés l’un sur l’autre, de niveau dessus et dessous, chaque pièce hachurée dans son sens ; le point, en trait noir, entre par un trou dans la pièce du dessus, traverse les deux épaisseurs, passe dessous, remonte par un trou dans la pièce du dessous passé le bord aminci, et revient par-dessus ; la gomme couvre la couture.',
    format: 'pleine',
    disposition: [['bout', 'boutc'], ['couture', 'couturec']],
    hauteurs: [1.35, 1],
    largeurs: [[3, 2], [3, 2]],
    vues: {
      bout: {
        titre: 'Le bout, de côté',
        dessin: bout,
        renvois: z => {
          const g = gB(z);
          const xr = g.racine[g.racine.length - 2];
          return [
            { n: 1, rond: [g.xT - 72, g.yT + 8], cible: g.E(0.2, (g.LAT[0] + g.LAT[1]) / 2), texte: 'une latte de chaque côté' },
            { n: 2, rond: [g.xT + 34, g.E(0.56, 0)[1] - 18], cible: g.E(0.56, 1), texte: 'serrées à la corde d’écorce' },
            { n: 5, rond: [g.xK - 24, g.yK + 40], cible: g.Ef(g.BO.tc + g.BO.dt * 0.48, g.BO.ec + g.BO.de * 0.88), texte: 'ouverture, mousse gommée' },
            { n: 6, rond: [xr - 20, g.yT + 14], cible: [xr, g.yG(xr) + 8], texte: 'le tout lié à la racine' },
          ];
        },
      },
      boutc: {
        titre: 'Le bout, coupé à plat',
        dessin: boutc,
        renvois: z => {
          const g = gBC(z);
          return [
            { n: 3, rond: [g.cx + 52, g.yh + 24], cible: [g.cx + g.eb + 4.6, g.yh + 2.6], texte: 'trous de la corde, gommés' },
            { n: 4, rond: [g.cx + 56, g.ys - 10], cible: [g.cx + 2.5, g.ys - 8.4], texte: 'tranche : gomme ou suif' },
            { n: 7, rond: [g.cx + 46, g.yd + 40], cible: [g.cx + g.eb * 0.6, g.yd - 4], texte: 'les deux flancs, pincés' },
            { n: 8, rond: [g.cx - 50, g.yh + 34], cible: [g.cx - g.eb - g.Lt - 3.5, g.yh - 10], texte: 'corde autour des deux lattes' },
          ];
        },
      },
      couture: {
        titre: 'Cousu, pour durer : la couture le long du fil',
        dessin: couture,
        renvois: z => {
          const g = gCo(z);
          const lg = g.pts1.find(p => p.long), ym = (g.src.long ? 14 : 6) * g.K;
          return [
            { n: 9, rond: [lg.x + 12, g.yA - 12], cible: [lg.x, g.ys - 14], texte: 'points courts, points longs' },
            { n: 10, rond: [g.M[0] + 48, g.yZ + 2], cible: [g.M[0] + 2.2, g.M[1] + ym + 3], texte: 'deux ou trois tours par trou' },
            { n: 11, rond: [g.g2[0] + 40, g.yA - 12], cible: [g.g2[0] + 44, g.ys - 5], texte: 'ou une latte cousue dessus' },
          ];
        },
      },
      couturec: {
        titre: 'La couture, en travers',
        dessin: couturec,
        renvois: z => {
          const g = gCt(z);
          return [
            { n: 12, rond: [(g.xA + g.xB) / 2 + 34, g.yo + g.tk + 40], cible: [(g.xA + g.xB) / 2 + 6, g.yB + 1.9], texte: 'racine fendue, ou babiche' },
            { n: 13, rond: [g.xe2 + 10, g.yo + g.tk + 34], cible: [g.xe2 + g.Lt * 0.25, g.b(g.xe2 + g.Lt * 0.25)], texte: 'bords amincis d’abord' },
            { n: 14, rond: [(g.xA + g.xB) / 2 + 26, g.yo - 40], cible: [(g.xA + g.xB) / 2 + 10, g.yo - 9.7], texte: 'gomme sur la couture' },
          ];
        },
      },
    },
  };
};
