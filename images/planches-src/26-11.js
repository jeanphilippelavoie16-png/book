// Planche 26-11 — Les pansements qu'on fabrique (aussi ch. 29).
// Quatre vues : le coton plié en séchant ; le sachet de sphaigne ; la bouteille au bouchon
// percé au clou chauffé ; l'objet planté calé entre deux bourrelets (perspective et coupe).
module.exports = (h) => {
  const BL = h.a.blanc.split(' ')[0];
  const plein = t => t.replace('fill="none"', BL);
  const r1 = v => Math.round(v * 10) / 10;
  const f = p => `${r1(p[0])},${r1(p[1])}`;
  const ferme = (a, at) => h.chemin(a.map(p => [r1(p[0]), r1(p[1])]), at, true);
  const ouvert = (a, at) => h.chemin(a.map(p => [r1(p[0]), r1(p[1])]), at);
  const q = (p0, c, p1, n = 16) => {
    const o = [];
    for (let i = 0; i <= n; i++) {
      const t = i / n, u = 1 - t;
      o.push([u * u * p0[0] + 2 * u * t * c[0] + t * t * p1[0], u * u * p0[1] + 2 * u * t * c[1] + t * t * p1[1]]);
    }
    return o;
  };
  const add = (p, v, k = 1) => [p[0] + v[0] * k, p[1] + v[1] * k];

  // Un rameau effilé : base b, direction ang, longueur L, courbure c, demi-largeur w.
  const branche = (b, ang, L, c, w, at = plein(h.a.detail)) => {
    const ux = Math.cos(ang), uy = Math.sin(ang), nx = -uy, ny = ux;
    const t = [b[0] + ux * L, b[1] + uy * L];
    const m = [(b[0] + t[0]) / 2 + nx * c, (b[1] + t[1]) / 2 + ny * c];
    const G = [], D = [];
    for (let i = 0; i <= 10; i++) {
      const s = i / 10, u = 1 - s;
      const p = [u * u * b[0] + 2 * u * s * m[0] + s * s * t[0], u * u * b[1] + 2 * u * s * m[1] + s * s * t[1]];
      const d = [2 * u * (m[0] - b[0]) + 2 * s * (t[0] - m[0]), 2 * u * (m[1] - b[1]) + 2 * s * (t[1] - m[1])];
      const dl = Math.hypot(d[0], d[1]) || 1, px = -d[1] / dl, py = d[0] / dl;
      const k = w * Math.pow(1 - s, 0.6) + 0.3;
      G.push([p[0] + px * k, p[1] + py * k]);
      D.push([p[0] - px * k, p[1] - py * k]);
    }
    return ferme(G.concat(D.reverse()), at);
  };

  // ─── Le coton ───────────────────────────────────────────────────────────────────────
  const yc = x => 24 + 12 * (1 - Math.pow((x - 144.5) / 150, 2));
  const onde = (x1, x2, y, amp, n) => {
    const o = [];
    for (let i = 0; i <= n * 6; i++) { const t = i / (n * 6); o.push([x1 + (x2 - x1) * t, y + amp * Math.sin(t * n * 2 * Math.PI)]); }
    return o;
  };
  const dessus = (x1, x2) => { const o = []; for (let i = 0; i <= 12; i++) { const x = x1 + (x2 - x1) * i / 12; o.push([x, yc(x) - 2]); } return o; };
  const linge = (x1, x2, bas, amp, n) => ferme([...dessus(x1, x2), ...onde(x2 + 1, x1 - 1, bas, amp, n)], plein(h.a.contour));

  const padA = [26, 262], padB = [122, 262], padC = [138, 214], padD = [44, 214];
  const F1 = [108, 214], F2 = add(padC, [padB[0] - padC[0], padB[1] - padC[1]], 0.36), Tc = [147, 191];

  const coton = () => [
    ouvert(Array.from({ length: 29 }, (_, i) => [4 + i * 10, yc(4 + i * 10)]), h.a.arete),
    // le premier linge, à cheval sur la corde, deux épaisseurs
    linge(22, 108, 150, 2.5, 3),
    linge(22, 108, 139, 2, 2),
    ouvert(q([44, yc(44) + 5], [39, 84], [46, 134]), h.a.fin),
    ouvert(q([80, yc(80) + 5], [86, 76], [81, 135]), h.a.fin),
    // le deuxième, qu'on replie sur lui-même pendant qu'il sèche
    ouvert([[148, 100], [148, 150], ...onde(148, 236, 150, 2, 3), [236, 100]], h.a.cache),
    ferme([...dessus(148, 236), [236, 100], [148, 100]], plein(h.a.contour)),
    ferme([...q([147, 99], [192, 107], [237, 99]), ...onde(241, 143, 60, 1.5, 2)], plein(h.a.contour)),
    ouvert(q([170, 62], [166, 80], [171, 98]), h.a.fin),
    ouvert(q([214, 62], [219, 82], [214, 98]), h.a.fin),
    h.fleche('M246,146 Q276,104 249,66'),
    // plié en quatre, un coin soulevé : la face du dedans n'a pas été touchée
    ferme([padA, padB, [122, 268], [26, 268]], plein(h.a.arete)),
    ferme([padB, padC, [138, 220], [122, 268]], plein(h.a.arete)),
    ouvert([[26, 265], [122, 265], [138, 217]], h.a.fin),
    ferme([padA, padB, F2, F1, padD], plein(h.a.contour)),
    ferme([F1, padC, F2], plein(h.a.detail)),
    ouvert([[64, 238], [118, 238]], h.a.fin),
    ferme([...q(F1, [124, 198], Tc), ...q(Tc, [144, 214], F2)], plein(h.a.contour)),
    h.fleche('M146,248 L178,248'),
    // le sac fermé, les carrés dedans
    ferme([[214, 197], ...q([214, 197], [184, 214], [188, 250]).slice(1), ...q([188, 250], [190, 281], [226, 281]).slice(1),
      ...q([226, 281], [262, 281], [264, 250]).slice(1), ...q([264, 250], [268, 214], [238, 197]).slice(1)], plein(h.a.contour)),
    h.rect(198, 262, 54, 9, h.a.cache),
    h.rect(201, 252, 50, 9, h.a.cache),
    h.rect(199, 242, 52, 9, h.a.cache),
    ouvert(q([218, 199], [207, 214], [203, 232]), h.a.fin),
    ouvert(q([234, 199], [245, 214], [249, 230]), h.a.fin),
    ferme([[213, 191], [204, 173], [212, 177], [220, 171], [227, 176], [234, 170], [241, 177], [249, 173], [239, 191]], plein(h.a.arete)),
    ferme([[211, 190], [241, 190], [239, 199], [213, 199]], plein(h.a.arete)),
  ].join('\n');

  // ─── La sphaigne ────────────────────────────────────────────────────────────────────
  const tigeX = y => { const t = (y - 52) / 236, u = 1 - t; return u * u * 52 + 2 * u * t * 44 + t * t * 56; };
  const fascicule = (y, k) => {
    const sx = tigeX(y), s = 1 - k * 0.03, va = 0.14 * Math.sin(k * 2.1), vb = 0.14 * Math.sin(k * 1.7 + 1);
    return [
      branche([sx - 2, y + 2], Math.PI / 2 + 0.12, 23 * s, -1.5, 1.6),
      branche([sx + 2, y + 2], Math.PI / 2 - 0.08, 21 * s, 1.5, 1.6),
      branche([sx, y], Math.PI - 0.8 + va, (25 + 3 * Math.sin(k * 1.3)) * s, 3, 2.3),
      branche([sx, y], 0.8 + vb, (23 + 3 * Math.cos(k * 1.3)) * s, -3, 2.3),
      branche([sx, y + 1], Math.PI - 1.15 - va, 17 * s, 2, 1.9),
    ].join('\n');
  };
  const capitule = (cx, cy) => {
    const o = [];
    for (let i = 0; i < 17; i++) {
      const a = -Math.PI - 0.6 + i * (Math.PI + 1.2) / 16;
      o.push(branche([cx + Math.cos(a) * 3, cy + Math.sin(a) * 3], a, 19 + 3 * Math.sin(i * 1.9), (Math.cos(a) > 0 ? 1 : -1) * 4, 2.7));
    }
    for (let i = 0; i < 11; i++) {
      const a = -Math.PI + 0.1 + i * (Math.PI - 0.2) / 10;
      o.push(branche([cx, cy + 2], a, 12 + 2 * Math.cos(i * 2.3), (i % 2 ? 2 : -2), 2.3));
    }
    o.push(h.cercle(cx, cy + 1, 3.5, plein(h.a.detail)));
    return o.join('\n');
  };
  const sqFL = [118, 152], sqFR = [276, 152], sqBR = [254, 84], sqBL = [140, 84], sqC = [197, 118];
  const tas = [];
  for (let k = 0; k < 60; k++) {
    const a = 2 * Math.PI * k / 60, r = 1 + 0.06 * Math.sin(9 * a) + 0.04 * Math.sin(13 * a + 1);
    let dy = 19 * r * Math.sin(a); if (dy < 0) dy *= 1.35;
    tas.push([sqC[0] + 42 * r * Math.cos(a), sqC[1] + dy]);
  }
  const brins = [[172, 114, -0.4], [186, 106, 0.3], [204, 120, -2.6], [214, 106, -0.2], [228, 118, 2.8], [180, 124, 0.5], [210, 128, -2.9], [196, 100, -1.2], [222, 100, 0.9]];
  const coin = c => { const d = [sqC[0] - c[0], sqC[1] - c[1]], l = Math.hypot(d[0], d[1]); const u = [d[0] / l, d[1] / l]; return h.fleche(`M${f(add(c, u, 7))} L${f(add(c, u, 25))}`); };
  const sFL = [146, 280], sFR = [248, 280], sBR = [234, 214], sBL = [160, 214], sC = [197, 247];

  const sphaigne = () => [
    ...[78, 106, 134, 162, 190, 218, 246, 272].map((y, k) => fascicule(y, k)),
    ouvert(q([52, 50], [44, 170], [56, 288], 24), h.a.arete),
    capitule(52, 44),
    // le carré de coton ouvert, la mousse lâche au milieu, les coins qu'on rabat
    ferme([sqFL, sqFR, sqBR, sqBL], plein(h.a.contour)),
    ferme(tas, plein(h.a.arete)),
    ...brins.map(([x, y, a]) => branche([x, y], a, 11, 3, 1.6)),
    coin(sqFL), coin(sqFR), coin(sqBR), coin(sqBL),
    h.fleche('M197,162 L197,192'),
    // le sachet fermé
    ferme([...q(sBR, [245, 247], sFR), [248, 286], [234, 220]], plein(h.a.arete)),
    ferme([...q(sFL, [197, 285], sFR), [248, 286], ...q([248, 286], [197, 291], [146, 286]).slice(1)], plein(h.a.arete)),
    ferme([...q(sBL, [197, 209], sBR), ...q(sBR, [245, 247], sFR).slice(1), ...q(sFR, [197, 285], sFL).slice(1), ...q(sFL, [149, 247], sBL).slice(1)], plein(h.a.contour)),
    ouvert(q(sBL, [181, 232], [196, 246]), h.a.arete),
    ouvert(q(sBR, [213, 232], [198, 246]), h.a.arete),
    ouvert(q(sFR, [220, 262], [198, 248]), h.a.arete),
    ouvert(q(sFL, [172, 262], [196, 248]), h.a.arete),
  ].join('\n');

  // ─── La bouteille ───────────────────────────────────────────────────────────────────
  const al = Math.atan2(-70, 130), ua = [Math.cos(al), Math.sin(al)], na = [-Math.sin(al), Math.cos(al)], O = [112, 242];
  const T = (x, y) => [O[0] + ua[0] * y + na[0] * x, O[1] + ua[1] * y + na[1] * x];
  const prof = [[13, 8], [20, 8], [26, 13], [33, 19], [40, 23], [44, 24], [64, 24], [72, 21], [82, 17.5], [90, 16.5], [98, 17.5], [108, 21], [116, 24], [136, 24], [142, 23], [146, 19], [148, 11], [148.5, 0]];
  const bras = (p0, c, p1, w) => {
    const L = q(p0, c, p1, 12), G = [], D = [];
    L.forEach((p, i) => {
      const a = L[Math.max(0, i - 1)], b = L[Math.min(L.length - 1, i + 1)];
      const dx = b[0] - a[0], dy = b[1] - a[1], dl = Math.hypot(dx, dy);
      G.push([p[0] - dy / dl * w, p[1] + dx / dl * w]); D.push([p[0] + dy / dl * w, p[1] - dx / dl * w]);
    });
    return ferme(G.concat(D.reverse()), plein(h.a.arete));
  };
  const J0 = T(0, -1), JC = add(J0, ua, -48), J1 = [40, 280];

  const bouteille = () => [
    // la chandelle et le clou dans la flamme
    h.rect(20, 80, 24, 64, plein(h.a.contour)),
    h.ellipse(32, 80, 12, 3, plein(h.a.arete)),
    h.path('M40,82 Q42,90 40,98 Q38,102 39,106', h.a.detail),
    h.path('M32,78 Q31,74 32,70', h.a.arete),
    h.path('M32,73 C21,66 25,50 32,33 C39,50 43,66 32,73 Z', h.a.arete),
    h.path('M32,69 C28,65 29,57 32,51 C35,57 36,65 32,69 Z', h.a.fin),
    ferme([[25, 53], [33, 51.3], [96, 51.3], [96, 46], [99.5, 46], [99.5, 60], [96, 60], [96, 54.7], [33, 54.7]], h.a.plein),
    // la pince qui le tient
    bras([112, 50], [150, 50], [196, 62], 4.2),
    bras([112, 56], [150, 66], [192, 86], 4.2),
    ferme([[60, 51.2], [100, 51.2], [112, 47], [108, 41], [96, 43], [74, 47.5], [60, 49.6]], plein(h.a.arete)),
    ferme([[60, 54.8], [100, 54.8], [112, 59], [108, 65], [96, 63], [74, 58.5], [60, 56.4]], plein(h.a.arete)),
    h.cercle(110, 53, 7.5, plein(h.a.arete)),
    h.cercle(110, 53, 2.5, h.a.detail),
    // le bouchon percé
    h.path('M216,48 L216,64 A22,8 0 0 0 260,64 L260,48 Z', plein(h.a.contour)),
    ...Array.from({ length: 9 }, (_, i) => {
      const x = 220 + i * 4.5, e = Math.sqrt(Math.max(0, 1 - Math.pow((x - 238) / 22, 2))) * 8;
      return h.ligne(r1(x), r1(48 + e + 1.5), r1(x), r1(64 + e - 1), h.a.fin);
    }),
    h.ellipse(238, 48, 22, 8, plein(h.a.contour)),
    h.ellipse(238, 48, 5, 2, h.a.fin),
    h.ellipse(238, 48, 2.4, 1.1, h.a.plein),
    // la bouteille souple, pressée, qui fait le jet
    ferme([...prof.map(([y, w]) => T(w, y)), ...prof.slice().reverse().map(([y, w]) => T(-w, y))], plein(h.a.contour)),
    ...[50, 57, 124, 131].map(y => ouvert(q(T(-23, y), T(0, y + 3), T(23, y)), h.a.fin)),
    ouvert([T(-13, 78), T(-7, 88)], h.a.fin), ouvert([T(9, 80), T(13, 93)], h.a.fin),
    ouvert([T(-9, 96), T(-14, 105)], h.a.fin), ouvert([T(4, 99), T(10, 108)], h.a.fin),
    ferme([T(-11, 10), T(11, 10), T(11, 13.5), T(-11, 13.5)], plein(h.a.arete)),
    ferme([T(-9, 0), T(9, 0), T(9, 10), T(-9, 10)], plein(h.a.arete)),
    ...[-6, -3, 0, 3, 6].map(x => ouvert([T(x, 1.5), T(x, 8.5)], h.a.fin)),
    h.fleche(`M${f(T(48, 90))} L${f(T(27, 90))}`),
    h.fleche(`M${f(T(-48, 90))} L${f(T(-27, 90))}`),
    h.path(`M${f(J0)} Q${f(JC)} ${f(J1)}`, h.a.arete),
    h.ellipse(33, 287, 1.8, 2.4, h.a.plein),
    h.ellipse(45, 290, 1.5, 2, h.a.plein),
    h.ellipse(37, 294, 1.3, 1.7, h.a.plein),
  ].join('\n');

  // ─── L'objet planté ─────────────────────────────────────────────────────────────────
  const A = 22 * Math.PI / 180, E = 40 * Math.PI / 180;
  const ca = Math.cos(A), sa = Math.sin(A), ce = Math.cos(E), se = Math.sin(E);
  const CX = 146, CY = 112;
  const pr = (X, Y, Z) => { const Xp = X * ca + Z * sa, Zp = -X * sa + Z * ca; return [CX + Xp, CY - Y * ce + Zp * se]; };
  const th1 = Math.atan2(-se, ca * ce), th2 = th1 + Math.PI;
  const Rl = X => 33 + 5 * Math.sin(Math.PI * (X + 130) / 258);
  const X0 = -130, X1 = 128;
  const sil = (fn, xa, xb, p) => { const n = Math.max(2, Math.ceil(Math.abs(xb - xa) / 6)); return Array.from({ length: n + 1 }, (_, i) => fn(xa + (xb - xa) * i / n, p)); };
  const arc = (fn, X, p0, p1, n = 24, wob = 0) => Array.from({ length: n + 1 }, (_, i) => fn(X + wob * Math.sin(i * 1.3), p0 + (p1 - p0) * i / n));
  const membre = (X, p) => pr(X, Rl(X) * Math.cos(p), Rl(X) * Math.sin(p));
  const rr = 8.5, thr = 16 * Math.PI / 180, XR0 = -42, XR1 = 42;
  const roule = s => (X, p) => { const rc = Rl(X) + rr; return pr(X, rc * Math.cos(s * thr) + rr * Math.cos(p), rc * Math.sin(s * thr) + rr * Math.sin(p)); };
  const bourrelet = s => {
    const fn = roule(s), rc = Rl(XR0) + rr;
    const sp = Array.from({ length: 61 }, (_, i) => { const p = i / 60 * 4 * Math.PI, r = rr * 0.82 * (1 - i / 60 * 0.8); return pr(XR0, rc * Math.cos(s * thr) + r * Math.cos(p), rc * Math.sin(s * thr) + r * Math.sin(p)); });
    return [
      ferme([...sil(fn, XR0, XR1, th1), ...arc(fn, XR1, th1, th2, 16), ...sil(fn, XR1, XR0, th2), ...arc(fn, XR0, th2, th1 + 2 * Math.PI, 16)], plein(h.a.arete)),
      ferme(arc(fn, XR0, 0, 2 * Math.PI, 28), plein(h.a.arete)),
      ouvert(sp, h.a.fin),
    ].join('\n');
  };
  const Dt = 24 * Math.PI / 180;
  const rb = (X, p) => {
    const a = Math.abs(p);
    const bosse = a <= thr ? 2 * rr : a < thr + Dt ? 2 * rr * Math.pow(Math.cos(Math.PI / 2 * (a - thr) / Dt), 2) : 0;
    return Rl(X) + 1.2 + bosse;
  };
  const bandeP = (X, p) => pr(X, rb(X, p) * Math.cos(p), rb(X, p) * Math.sin(p));
  const bande = (xa, xb) => {
    const K = bandeP((xa + xb) / 2, 75 * Math.PI / 180);
    return [
      ferme([...arc(bandeP, xa, th1, th2, 48), ...arc(bandeP, xb, th2, th1, 48)], plein(h.a.arete)),
      branche(add(K, [0, 1]), 1.95, 12, 2, 2.4, plein(h.a.arete)),
      branche(add(K, [0, 1]), 1.15, 11, -2, 2.4, plein(h.a.arete)),
      h.ellipse(r1(K[0]), r1(K[1]), 4.5, 3.5, plein(h.a.arete)),
    ].join('\n');
  };
  // le bâton planté, bout éclaté
  const baton = (B, Tp, wb, wt, at = plein(h.a.contour)) => {
    const d = [Tp[0] - B[0], Tp[1] - B[1]], l = Math.hypot(d[0], d[1]), u = [d[0] / l, d[1] / l], n = [-u[1], u[0]];
    return ferme([
      add(B, n, wb), add(add(Tp, n, wt), u, -4), add(add(Tp, n, 1.2), u, 3), add(Tp, u, -1.5),
      add(add(Tp, n, -1.6), u, 5), add(add(Tp, n, -wt), u, -1), add(B, n, -wb),
    ], at);
  };
  const R0 = Rl(0), Bs = pr(0, R0 - 2, 0), Ts = pr(-8, R0 + 80, 5);
  const Cc = [212, 246], Rc = 40;
  const cTop = [208, 170], cSkin = [212.2, 206], cTip = [215, 229];

  const objet = () => [
    ferme([...sil(membre, X0, X1, th1), ...arc(membre, X1, th1, th2, 24, 2.5), ...sil(membre, X1, X0, th2), ...arc(membre, X0, th2, th1, 24, 2.5)], h.a.blanc),
    ouvert(sil(membre, X0, X1, th1), h.a.contour),
    ouvert(sil(membre, X0, X1, th2), h.a.contour),
    ouvert(arc(membre, X1, th1, th2, 24, 2.5), h.a.arete),
    ouvert(arc(membre, X0, th1, th2, 24, 2.5), h.a.arete),
    bourrelet(-1),
    baton(Bs, Ts, 4.2, 3.4),
    ouvert([add(Bs, [-1.2, -8]), add(Ts, [-1, 10])], h.a.fin),
    bourrelet(1),
    bande(-33, -21),
    bande(21, 33),
    // en coupe
    h.cercle(Cc[0], Cc[1], Rc, plein(h.a.contour)),
    h.ellipse(Cc[0] + 4, Cc[1] + 8, 11, 10, plein(h.a.arete)),
    h.ellipse(Cc[0] + 4, Cc[1] + 8, 5, 4.5, h.a.fin),
    ferme([[cSkin[0] - 3.4, cSkin[1]], [cTip[0] - 1, cTip[1] - 4], cTip, [cTip[0] + 1.6, cTip[1] - 5], [cSkin[0] + 3.4, cSkin[1]]], plein(h.a.cache)),
    ...[-1, 1].map(s => {
      const c = [Cc[0] + s * 49 * Math.sin(thr), Cc[1] - 49 * Math.cos(thr)];
      const sp = Array.from({ length: 61 }, (_, i) => { const p = i / 60 * 4 * Math.PI, r = 7.4 * (1 - i / 60 * 0.8); return [c[0] + r * Math.cos(p), c[1] + r * Math.sin(p)]; });
      return [h.cercle(r1(c[0]), r1(c[1]), 9, plein(h.a.arete)), ouvert(sp, h.a.fin)].join('\n');
    }),
    baton([cSkin[0], cSkin[1] + 1], cTop, 3.5, 3.1),
  ].join('\n');

  return {
    ref: '26-11',
    titre: 'Les pansements qu’on fabrique',
    desc: 'Quatre vues. Le coton bouilli séché à cheval sur une corde, replié sur lui-même pendant qu’il sèche, plié en quatre avec la face du dedans jamais touchée, rangé dans un sac fermé. La sphaigne séchée posée lâche sur un carré de coton bouilli dont on rabat les quatre coins en sachet. Un clou tenu à la pince, chauffé dans la flamme d’une chandelle, perce le bouchon d’une bouteille souple qu’on presse pour faire un jet. Un bâton planté dans une cuisse, laissé en place, calé entre deux rouleaux de linge tenus par deux bandes nouées de part et d’autre, en perspective et en coupe.',
    format: 'pleine',
    disposition: [['coton', 'sphaigne'], ['bouteille', 'objet']],
    vues: {
      coton: {
        titre: 'Le coton',
        dessin: () => coton(),
        renvois: () => [
          { n: 1, rond: [13, 176], cible: [40, 126], texte: 'bouilli, essoré sans tordre' },
          { n: 2, rond: [126, 176], cible: [178, 84], texte: 'plié pendant qu’il sèche' },
          { n: 3, rond: [171, 203], cible: [133, 207], texte: 'face de la plaie : en dedans' },
          { n: 4, rond: [277, 212], cible: [250, 236], texte: 'sac fermé, pli en dedans' },
        ],
      },
      sphaigne: {
        titre: 'La sphaigne',
        dessin: () => sphaigne(),
        renvois: () => [
          { n: 5, rond: [104, 20], cible: [64, 36], texte: 'sphaigne des tourbières' },
          { n: 6, rond: [276, 22], cible: [212, 110], texte: 'séchée au poêle, triée' },
          { n: 7, rond: [279, 178], cible: [236, 146], texte: 'carré de coton bouilli' },
          { n: 8, rond: [278, 262], cible: [228, 258], texte: 'c’est le sachet qui se pose' },
        ],
      },
      bouteille: {
        titre: 'La bouteille',
        dessin: () => bouteille(),
        renvois: () => [
          { n: 9, rond: [66, 20], cible: [48, 53], texte: 'clou chauffé, tenu à la pince' },
          { n: 10, rond: [278, 18], cible: [240, 48.5], texte: 'bouchon percé au clou' },
          { n: 11, rond: [276, 150], cible: T(-2, 126), texte: 'souple, eau bouillie refroidie' },
          { n: 12, rond: [22, 214], cible: q(J0, JC, J1, 2)[1], texte: 'le jet décolle la saleté' },
        ],
      },
      objet: {
        titre: 'L’objet planté',
        dessin: () => objet(),
        renvois: () => [
          { n: 13, rond: [104, 22], cible: add(Ts, [1, 10]), texte: 'on ne le retire pas' },
          { n: 14, rond: [34, 58], cible: pr(XR0, (Rl(XR0) + rr) * Math.cos(thr), (Rl(XR0) + rr) * Math.sin(thr)), texte: 'deux bourrelets de linge' },
          { n: 15, rond: [264, 168], cible: bandeP(27, 80 * Math.PI / 180), texte: 'bande à côté de l’objet' },
          { n: 16, rond: [278, 228], cible: [214, 221], texte: 'il bouche ce qu’il a coupé' },
        ],
      },
    },
  };
};
