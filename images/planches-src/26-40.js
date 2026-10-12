// Planche 26-40 — La plaie : appuyer, puis laver.
// Chapitre 26, étapes 15 à 17 et 22, « Les gestes qui remplacent un appareil » et le tableau
// du matériel : pression directe, la paume sur la plaie même, sans relâcher ; si le sang
// traverse, un seul pansement de plus par-dessus et appuyer plus fort ; plaie profonde de
// cuisse bourrée de gaze tassée au fond au doigt ganté, puis la pression par-dessus ; laver au
// jet d'eau bouillie refroidie, bouteille souple percée au clou chauffé ; sans bouteille, un sac
// de plastique épais percé d'un trou d'épingle et tordu pour faire pression.
// Les mesures du dessin sont celles d'un corps d'adulte, en cm, mises à l'échelle s (px/cm).
// Passe qualité (lot 06) : plus de personnage ; les mains viennent de h.formes (appui de profil,
// prise vue du dos) ; la coupe de cuisse tramée, avec sa vignette de repère.
module.exports = (h) => {
  const F = h.formes;
  const BL = h.a.blanc.split(' ')[0];
  const plein = t => t.replace('fill="none"', BL);
  const f = v => (+v).toFixed(1);
  const pt = p => `${f(p[0])},${f(p[1])}`;
  const RAD = Math.PI / 180;
  const tourne = (a, d) => { const c = Math.cos(d * RAD), s = Math.sin(d * RAD); return [a[0] * c - a[1] * s, a[0] * s + a[1] * c]; };
  const repere = (x, y, e, ang) => p => { const q = tourne([p[0] * e, p[1] * e], ang); return [x + q[0], y + q[1]]; };
  const lisse = (P, t) => {
    if (t <= P[0][0]) return P[0][1];
    for (let i = 0; i < P.length - 1; i++) {
      const [t0, w0] = P[i], [t1, w1] = P[i + 1];
      if (t <= t1) { const q = (1 - Math.cos(Math.PI * (t - t0) / (t1 - t0))) / 2; return w0 + (w1 - w0) * q; }
    }
    return P[P.length - 1][1];
  };
  const sol = (z, yg) => [h.rect(0, yg, z.l, 8, h.a.hachure('terre', 'aucun')), h.ligne(0, yg, z.l, yg, h.a.arete)].join('\n');
  // ce qui dépasse de la vue (un bras qui sort du cadre) est coupé net au bord
  const decoupe = (id, z, contenu) => `<clipPath id="rogne-26-40-${id}"><rect x="0" y="0" width="${f(z.l)}" height="${f(z.h)}" fill="none"/></clipPath>\n<g clip-path="url(#rogne-26-40-${id})">\n${contenu}\n</g>`;

  // ─── La jambe couchée sur le dos, vue de côté. u : cm depuis la hanche vers le pied.
  const HAUT = [[-10, 17.5], [0, 17.2], [12, 16.4], [26, 14.8], [36, 13], [42, 11.8], [46, 12.8], [50, 11.6], [56, 10.6], [68, 9.8], [78, 8.2], [83, 7.4]];
  const BAS = [[-10, 0], [87, 0]];
  // le dessous de la cuisse : à plat sur le sol, puis le creux du genou qui se soulève
  const BASC = [[-10, 0], [36, 0], [41, 0.8], [46, 2], [51, 2.2], [57, 1.3], [64, 0.3], [70, 0]];
  const PIED = [[84.3, 10], [85.3, 16], [86.3, 21], [87.4, 24.3], [89.5, 25.3], [91.6, 24.3], [92.6, 20.5], [93, 13], [92.7, 6], [91.8, 2], [90, 0.3], [88, 0]];
  const profilJambe = (X, Y, u0) => {
    const p = [];
    for (let u = u0; u < 83; u += 1) p.push([X(u), Y(lisse(HAUT, u))]);
    p.push([X(83), Y(7.4)]);
    for (const [u, v] of PIED) p.push([X(u), Y(v)]);
    for (let u = 87; u >= u0; u -= 1) p.push([X(u), Y(lisse(BAS, u))]);
    return p;
  };
  const jambe = (z, u0, s, yg) => {
    const X = u => (u - u0) * s, Y = v => yg - v * s;
    const top = x => Y(lisse(HAUT, x / s + u0));
    const dessin = [
      sol(z, yg),
      h.chemin(profilJambe(X, Y, u0), plein(h.a.contour)),
      h.path(`M${f(X(88.2))},${f(Y(24.8))} l${f(0.2 * s)},${f(1.8 * s)}`, h.a.detail),
      h.path(`M${f(X(90.2))},${f(Y(25))} l${f(0)},${f(1.8 * s)}`, h.a.detail),
    ].join('\n');
    return { X, Y, top, dessin };
  };
  // La cuisse seule, de la hanche au genou, posée sur le sol : le dessus, le dessous, le creux du genou.
  const cuisse = (z, u0, s, yg) => {
    const X = u => (u - u0) * s, Y = v => yg - v * s, U = x => u0 + x / s;
    const top = x => Y(lisse(HAUT, U(x))), bot = x => Y(lisse(BASC, U(x)));
    const haut = [], bas = [];
    for (let x = 0; x < z.l; x += 1.5) { haut.push([x, top(x)]); bas.push([x, bot(x)]); }
    haut.push([z.l, top(z.l)]); bas.push([z.l, bot(z.l)]);
    const dessin = [
      sol(z, yg),
      h.chemin([...haut, ...bas.slice().reverse()], h.a.blanc, true),
      h.chemin(haut, h.a.contour),
      h.chemin(bas, h.a.contour),
    ].join('\n');
    return { X, Y, U, top, bot, dessin };
  };

  // Une compresse pliée posée sur la surface base(x), épaisseur e.
  const compresse = (base, xa, xb, e, trempe) => {
    const bas = [], haut = [];
    for (let x = xa; x < xb; x += 2) { bas.push([x, base(x)]); haut.push([x, base(x) - e]); }
    bas.push([xb, base(xb)]); haut.push([xb, base(xb) - e]);
    const out = [h.chemin([...bas, ...haut.reverse()], plein(h.a.arete), true)];
    if (trempe) {
      const b2 = [], h2 = [], m = e * 0.12;
      for (let x = xa + e * 0.8; x < xb - e * 0.8; x += 2) { b2.push([x, base(x) - m]); h2.push([x, base(x) - e + m + Math.abs(Math.sin(x * 0.7)) * e * 0.12]); }
      out.push(h.chemin([...b2, ...h2.reverse()], h.a.plein, true));
    } else {
      const m = []; for (let x = xa + 3; x < xb - 3; x += 2) m.push([x, base(x) - e / 2]);
      out.push(h.chemin(m, h.a.fin));
    }
    return out.join('\n');
  };

  // ─── Les deux mains l'une sur l'autre, de profil, bras tendus à la verticale.
  // La main du dessous à plat sur la surface (base), talon et doigts compris ; la main du dessus
  // couchée sur son dos, ses doigts sur les doigts de la première. em : px par mm.
  const deuxMains = (base, xo, em) => {
    const xh = xo - 60 * em, xt = xo + 130 * em;
    const ang = Math.atan2(base(xt) - base(xh), xt - xh) / RAD;
    const yo = base(xh) + (xo - xh) * Math.tan(ang * RAD) + 0.4;
    const Tb = repere(xo, yo, em, ang);
    const o2 = Tb([20, -28]), a2 = ang + 8;
    const bas = F.main({ x: xo, y: yo, pose: 'appui', vue: 'profil', echelle: em, angle: ang, inclinaison: 90 - ang, bras: 800 });
    const haut = F.main({ x: o2[0], y: o2[1], pose: 'appui', vue: 'profil', echelle: em, angle: a2, inclinaison: 90 - a2, bras: 800 });
    // les bords de chaque avant-bras, à hauteur y (bras vertical) : dos à droite, paume à gauche
    const bords = (m, y) => { const d = Math.max(30, (m.poignet[1] - y) / em); return [m.poignet[0] - lisse(DEVANT, d) * em, m.poignet[0] + lisse(DOS, d) * em]; };
    return { bas, haut, Tb, Th: repere(o2[0], o2[1], em, a2), ang, bords };
  };
  // Les plis sur le dos de l'index, aux deux articulations du doigt (repère de la main, mm).
  const plisIndex = T => [[82, -16.4], [106.5, -14.4]].map(([x, y]) =>
    h.path(`M${pt(T([x + 1.8, y + 0.2]))} Q${pt(T([x - 0.6, y + 2.6]))} ${pt(T([x - 0.4, y + 6.2]))}`, h.a.fin)).join('\n');
  // Le bras tendu à la verticale, du haut du poignet jusqu'au bord de la vue : l'avant-bras qui
  // s'épaissit vers le coude, le coude verrouillé (l'os qui saille derrière, le pli devant), le bras.
  // Largeurs en mm depuis l'axe, selon la hauteur d au-dessus du poignet : devant (gauche), dos (droite).
  const DEVANT = [[30, 24.2], [170, 33], [255, 30], [320, 33], [500, 35]];
  const DOS = [[30, 22], [170, 28.5], [238, 27], [255, 30.5], [272, 27.5], [320, 29], [500, 30]];
  const brasTendu = (m, em, yHaut = -4) => {
    const [px, py] = m.poignet, G = [], D = [];
    for (let d = 30; py - d * em > yHaut - 6; d += 6) {
      const y = py - d * em;
      G.push([px - lisse(DEVANT, d) * em, y]); D.push([px + lisse(DOS, d) * em, y]);
    }
    const out = [h.chemin([...G, ...D.slice().reverse()], h.a.blanc, true), h.chemin(G, h.a.arete), h.chemin(D, h.a.arete)];
    const yE = py - 255 * em;
    if (yE > yHaut + 10) {
      const xl = px - lisse(DEVANT, 255) * em;
      out.push(h.path(`M${f(xl)},${f(yE + 4 * em)} Q${f(xl + 7 * em)},${f(yE + 1 * em)} ${f(xl + 13 * em)},${f(yE - 7 * em)}`, h.a.detail));
    }
    return out.join('\n');
  };

  // ─── A. Appuyer : la cuisse de la hanche au genou, les deux bras tendus qui descendent du haut.
  const geoA = z => {
    const yg = z.h - 10, u0 = -1, s = z.l / 50, em = s / 10, e = 1.2 * s;
    const C = cuisse(z, u0, s, yg);
    const surf = x => C.top(x) - e;
    const M = deuxMains(surf, C.X(23), em);
    const [xg] = M.bords(M.bas, 0);
    return { yg, s, em, e, C, surf, M, ca: C.X(14.5), cb: C.X(37.5), xf: xg - 13 };
  };
  const dessinA = z => {
    const g = geoA(z), out = [g.C.dessin];
    out.push(compresse(g.C.top, g.ca, g.cb, g.e, false));
    out.push(g.M.bas, brasTendu(g.M.bas, g.em), plisIndex(g.M.Tb));
    out.push(g.M.haut, brasTendu(g.M.haut, g.em), plisIndex(g.M.Th));
    out.push(h.fleche(`M${f(g.xf)},8 L${f(g.xf)},${f(g.M.bas.poignet[1] - 60 * g.em)}`, h.a.arete));
    return decoupe('a', z, out.join('\n'));
  };

  // ─── B. Le sang traverse : gros plan, la cuisse posée au sol, deux compresses.
  const geoB = z => {
    const yg = z.h - 10, s = Math.min(5, z.l / 37), em = s / 10, e = 1.5 * s;
    const u0 = 49 - z.l / s;                       // le genou au bord droit
    const C = cuisse(z, u0, s, yg);
    const c1 = [C.X(15.5), C.X(38.6)], c2 = [C.X(16.1), C.X(38.1)];
    const surf = x => C.top(x) - 2 * e;
    const M = deuxMains(surf, C.X(24), em);
    const [, xd] = M.bords(M.haut, 0);
    return { yg, s, em, e, C, c1, c2, surf, M, xf: xd + 16 };
  };
  // Un filet de sang qui descend le flanc de la cuisse : mince, qui serpente, qui s'amincit ; une
  // goutte au bout ; au sol, s'il y arrive, la flaque.
  const filet = (x0, y0, y1, amp, ph, w0, w1, flaque) => {
    const N = 28, G = [], D = [];
    for (let i = 0; i <= N; i++) {
      const t = i / N, y = y0 + (y1 - y0) * t, xc = x0 + amp * (Math.sin(t * 9 + ph) - Math.sin(ph)) * (0.3 + t);
      const w = w0 + (w1 - w0) * t + (i === 0 ? w0 * 0.6 : 0);
      G.push([xc - w, y]); D.push([xc + w, y]);
    }
    const xe = (G[N][0] + D[N][0]) / 2, r = w1 * 2.1;
    const out = [h.chemin([...G, ...D.reverse()], h.a.plein, true),
      h.path(`M${f(xe - w1)},${f(y1 - 1)} Q${f(xe - r)},${f(y1 + r * 0.6)} ${f(xe)},${f(y1 + r * 1.1)} Q${f(xe + r)},${f(y1 + r * 0.6)} ${f(xe + w1)},${f(y1 - 1)} Z`, h.a.plein)];
    if (flaque) out.push(h.path(`M${f(xe - flaque)},${f(y1 + r * 1.1 + 0.6)} Q${f(xe)},${f(y1 + r * 1.1 - flaque * 0.3)} ${f(xe + flaque)},${f(y1 + r * 1.1 + 0.6)} Z`, h.a.plein));
    return out.join('\n');
  };
  const dessinB = z => {
    const g = geoB(z), s = g.s, e = g.e, C = g.C, out = [C.dessin];
    // le sang passé à travers la première compresse coule sur le flanc jusqu'au sol
    const xa = g.c1[0] + 1.5, xb = g.c1[1] - 2, ya = C.top(xa) - 1.2, yb = C.top(xb) - 1.2;
    out.push(filet(xa, ya, g.yg - 4.6, 1.1, 0.4, 1.6, 0.6, 2.6 * s));
    out.push(filet(xa + 0.7 * s, ya + 1, ya + (g.yg - ya) * 0.4, 0.8, 2.1, 1.25, 0.5, 0));
    out.push(filet(xb, yb, Math.min(C.bot(xb), g.yg) - 4.6, 0.9, 1.3, 1.6, 0.6, 2.4 * s));
    out.push(filet(xb - 0.8 * s, yb + 1, yb + (C.bot(xb) - yb) * 0.5, 0.7, 3.2, 1.25, 0.5, 0));
    out.push(compresse(C.top, g.c1[0], g.c1[1], e, true));
    out.push(compresse(x => C.top(x) - e, g.c2[0], g.c2[1], e, false));
    out.push(g.M.bas, brasTendu(g.M.bas, g.em), plisIndex(g.M.Tb), g.M.haut, brasTendu(g.M.haut, g.em), plisIndex(g.M.Th));
    out.push(h.fleche(`M${f(g.xf)},8 L${f(g.xf)},${f(g.M.haut.poignet[1] - 30 * g.em)}`, h.a.contour));
    return decoupe('b', z, out.join('\n'));
  };

  // ─── C. Plaie profonde, coupe en travers de la cuisse : la gaze tassée au fond au doigt ganté.
  const WC = [[0, 1.9], [0.35, 1.6], [0.7, 1.2], [0.9, 0.7], [1, 0.1]];
  const geoC = z => {
    const s = Math.min(z.l / 27, z.h / 35.5), yg = z.h - 10, cx = z.l * 0.57;
    const rx = 8.5 * s, ry = 7.5 * s, cy = yg - ry + 0.5 * s;
    const ytop = x => cy - ry * Math.sqrt(Math.max(0, 1 - Math.pow((x - cx) / rx, 2)));
    const xm = cx - 1.5 * s, yM = ytop(xm), xB = cx - 1.1 * s, yB = cy - 1 * s;
    const ax = t => xm + (xB - xm) * t, ay = t => yM + (yB - yM) * t;
    const w = (t, c) => s * (lisse(WC, t) + (t > 0.05 && t < 0.9 ? 0.12 * Math.sin(t * 21 + c) : 0));
    const xf = ax(0.3) + 0.25 * s, K = [xf, yM - 3 * s];
    // la vignette : la jambe entière, en petit, avec le trait de coupe sur la cuisse
    const vg = { x: 2, y: 2, l: Math.min(z.l * 0.47, xf - 1.4 * s - 8) };
    vg.sv = (vg.l - 8) / 104; vg.h = 27 * vg.sv + 12; vg.yg = vg.y + vg.h - 4;
    vg.X = u => vg.x + 4 + (u + 10) * vg.sv; vg.Y = v => vg.yg - v * vg.sv;
    return { s, yg, cx, cy, rx, ry, ytop, xm, yM, ax, ay, w, xf, K, femur: [cx + 1 * s, cy + 2 * s], vg };
  };
  const dessinC = z => {
    const g = geoC(z), s = g.s, out = [sol(z, g.yg)];
    // la vignette
    const vg = g.vg;
    out.push(h.rect(vg.x, vg.y, vg.l, vg.h, h.a.fin));
    out.push(h.ligne(vg.x + 3, vg.yg, vg.x + vg.l - 3, vg.yg, h.a.detail));
    out.push(h.chemin(profilJambe(vg.X, vg.Y, -10), plein(h.a.arete), true));
    const xc = vg.X(24), yh = vg.Y(lisse(HAUT, 24));
    out.push(h.path(`M${f(xc - 1.3)},${f(yh + 0.6)} Q${f(xc)},${f(yh - 0.9)} ${f(xc + 1.3)},${f(yh + 0.6)} Z`, h.a.plein));   // la plaie
    out.push(h.path(`M${f(xc)},${f(yh - 6)} L${f(xc)},${f(vg.yg + 2.5)}`, `fill="none" stroke="#1A1A1A" stroke-width="1.4" stroke-dasharray="4 2.2"`));
    out.push(h.fleche(`M${f(xc)},${f(yh - 6)} L${f(xc + 7)},${f(yh - 6)}`, h.a.arete));
    out.push(h.fleche(`M${f(xc)},${f(vg.yg + 2.5)} L${f(xc + 7)},${f(vg.yg + 2.5)}`, h.a.arete));
    // la coupe : la chair tramée, le fémur en hachure croisée
    const ovale = (a, b) => { const p = []; for (let i = 0; i <= 120; i++) { const t = i / 120 * 2 * Math.PI; p.push([g.cx + a * Math.cos(t), Math.min(g.cy + b * Math.sin(t), g.yg)]); } return p; };
    out.push(h.chemin(ovale(g.rx, g.ry), h.a.blanc, true));
    out.push(h.chemin(ovale(g.rx, g.ry), h.a.hachure('bois', 'contour'), true));
    out.push(h.ellipse(g.femur[0], g.femur[1], 1.6 * s, 1.4 * s, plein(h.a.arete)));
    out.push(h.ellipse(g.femur[0], g.femur[1], 1.6 * s, 1.4 * s, h.a.hachure('grillage', 'arete')));
    // la plaie : un trou blanc dans la chair
    const T = []; for (let t = 0; t <= 1.0001; t += 0.025) T.push(t);
    const G = t => [g.ax(t) - g.w(t, 0), g.ay(t)], D = t => [g.ax(t) + g.w(t, 2), g.ay(t)];
    const gauche = T.map(G), droite = T.map(D).reverse();
    out.push(h.chemin([[gauche[0][0] - 1, gauche[0][1] - 3], ...gauche, ...droite, [droite[droite.length - 1][0] + 1, droite[droite.length - 1][1] - 3]], h.a.blanc, true));
    out.push(h.chemin([...gauche, ...droite], h.a.arete));
    // la gaze repliée en accordéon, du fond jusqu'à mi-hauteur : un ruban plié d'une paroi à l'autre
    const plis = [];
    const n = 5;
    for (let i = 0; i <= n; i++) {
      const t = 0.97 - i * (0.47 / n), c = i % 2 ? 2 : 0;
      const xa = g.ax(t) - g.w(t, 0) + 0.25 * s, xb = g.ax(t) + g.w(t, 2) - 0.25 * s;
      plis.push(i % 2 ? [xb, g.ay(t)] : [xa, g.ay(t)]);
      plis.push(i % 2 ? [xa, g.ay(t) - 0.12 * s] : [xb, g.ay(t) - 0.12 * s]);
    }
    let d = `M${pt(plis[0])}`;
    for (let i = 1; i < plis.length; i++) {
      const a = plis[i - 1], b = plis[i];
      if (i % 2) d += ` L${pt(b)}`;
      else { const sx = Math.sign(a[0] - g.cx) || 1; d += ` Q${f(a[0] + sx * 0.45 * s)},${f((a[1] + b[1]) / 2)} ${pt(b)}`; }
    }
    out.push(h.path(d, h.a.detail));
    // le ruban remonte le long de la paroi et sort : le bout libre couché sur la peau
    const bd = []; for (let t = 0.5; t >= 0.03; t -= 0.04) bd.push([g.ax(t) - g.w(t, 0) + 0.45 * s, g.ay(t)]);
    const b0 = bd[bd.length - 1], x1 = b0[0] - 1.6 * s, xq = b0[0] - 3.4 * s;
    out.push(h.path(`M${bd.map(pt).join(' L')} Q${f(b0[0])},${f(g.ytop(b0[0]) - 0.9 * s)} ${f(x1)},${f(g.ytop(x1) - 0.3 * s)} Q${f((x1 + xq) / 2)},${f(g.ytop((x1 + xq) / 2) - 0.35 * s)} ${f(xq)},${f(g.ytop(xq) - 0.3 * s)}`, h.a.arete));
    out.push(h.path(`M${f(xq - 0.2 * s)},${f(g.ytop(xq) - 0.9 * s)} L${f(xq + 0.2 * s)},${f(g.ytop(xq) + 0.3 * s)}`, h.a.fin));
    // le doigt ganté, droit dans la plaie ; le poing et l'avant-bras montent à droite du doigt
    const xf = g.xf, K = g.K, yT = g.ay(0.5), r = 0.9 * s;
    const M = x => 2 * xf - x;                       // le poing passe à droite du doigt
    out.push(h.path(`M${f(xf - r)},${f(K[1])} L${f(xf - r)},${f(yT - r)} A${f(r)} ${f(r)} 0 0 0 ${f(xf + r)},${f(yT - r)} L${f(xf + r)},${f(K[1])} Z`, plein(h.a.arete)));
    out.push(h.path(`M${f(xf - r * 0.8)},${f(g.yM - 1.4 * s)} Q${f(xf)},${f(g.yM - 1.05 * s)} ${f(xf + r * 0.8)},${f(g.yM - 1.4 * s)}`, h.a.fin));
    const yP = K[1] - 7 * s;            // poignet
    const poing = [
      `M${f(M(xf + r))},${f(K[1] + 0.2 * s)}`,
      `Q${f(M(xf + 1.6 * s))},${f(K[1] - 3 * s)} ${f(M(xf + 1.4 * s))},${f(yP)}`,
      `L${f(M(xf - 5.4 * s))},${f(yP)}`,
      `Q${f(M(xf - 7.6 * s))},${f(K[1] - 3.5 * s)} ${f(M(xf - 6.6 * s))},${f(K[1] - 0.6 * s)}`,
      `Q${f(M(xf - 5.9 * s))},${f(K[1] + 1.1 * s)} ${f(M(xf - 4.6 * s))},${f(K[1] + 0.2 * s)}`,
      `Q${f(M(xf - 3.8 * s))},${f(K[1] + 1.2 * s)} ${f(M(xf - 2.7 * s))},${f(K[1] + 0.3 * s)}`,
      `Q${f(M(xf - 1.9 * s))},${f(K[1] + 1.2 * s)} ${f(M(xf - r))},${f(K[1] + 0.4 * s)} Z`,
    ].join(' ');
    out.push(h.path(poing, plein(h.a.arete)));
    for (const x of [-4.6, -2.7]) out.push(h.path(`M${f(M(xf + x * s))},${f(K[1] + 0.2 * s)} Q${f(M(xf + (x + 0.2) * s))},${f(K[1] - 0.6 * s)} ${f(M(xf + (x - 0.2) * s))},${f(K[1] - 1.8 * s)}`, h.a.detail));
    out.push(h.path(`M${f(M(xf - 6.3 * s))},${f(K[1] - 2.2 * s)} Q${f(M(xf - 3.5 * s))},${f(K[1] - 3.4 * s)} ${f(M(xf - 1 * s))},${f(K[1] - 2.3 * s)}`, h.a.detail));
    out.push(h.path(`M${f(M(xf - 6.8 * s))},0 L${f(M(xf - 5.4 * s))},${f(yP)} L${f(M(xf + 1.4 * s))},${f(yP)} L${f(M(xf + 0.4 * s))},0 Z`, h.a.blanc));
    out.push(h.path(`M${f(M(xf - 6.8 * s))},0 L${f(M(xf - 5.4 * s))},${f(yP)}`, h.a.arete));
    out.push(h.path(`M${f(M(xf + 0.4 * s))},0 L${f(M(xf + 1.4 * s))},${f(yP)}`, h.a.arete));
    for (const dy of [0.7, 1.3]) out.push(h.ligne(M(xf + 1.3 * s), yP - dy * s, M(xf - 5.5 * s), yP - dy * s, h.a.detail));
    return out.join('\n');
  };

  // ─── D. Laver : bouteille souple pointe en bas, serrée au poing, jet sur la plaie.
  // Le point p (mm, repère de la main « prise vue du dos ») mis dans la vue, comme le fait h.formes.
  const ptPrise = (o, R, p) => {
    const pre = Math.atan(-0.22) / RAD, c0 = tourne([12 - 0.05 * R, 0], pre);
    let q = tourne(p, pre); q = [q[0] - c0[0], q[1] - c0[1]];
    if (o.cote === 'gauche') q = [-q[0], q[1]];
    q = tourne([q[0] * o.echelle, q[1] * o.echelle], o.angle || 0);
    return [o.x + q[0], o.y + q[1]];
  };
  const geoD = z => {
    const yg = z.h - 10, u0 = -4, s = (z.l - 3) / 97;
    const J = jambe(z, u0, s, yg);
    const xw = J.X(24), yw = J.top(xw);
    const aF = -18, axe = tourne([0, -1], aF), nrm = tourne([1, 0], aF), nd = [-axe[0], -axe[1]];
    const C0 = [xw - nd[0] * 6.5 * s, yw - 1 - nd[1] * 6.5 * s];                            // le bout du bouchon
    const W = (u, v) => [C0[0] + (u * axe[0] + v * nrm[0]) * s, C0[1] + (u * axe[1] + v * nrm[1]) * s];   // u, v en cm
    const uG = 17.5, rG = 4.15;                                                                // la main, et la taille pincée
    const P = W(uG, 0);
    const eH = 1.15 * s / 10;                                                                 // la main un peu grossie, pour se lire
    const main = { x: P[0], y: P[1], pose: 'prise', vue: 'dos', cote: 'gauche', angle: aF, diametre: 2 * rG * s, echelle: eH, bras: 60 };
    const R = main.diametre / 2 / eH;
    const pouce = ptPrise(main, R, [14 + 0.3 * R, -41]);
    const jet = { a: W(-0.1, 0), c: W(-3.6, 0.5), b: [xw + 0.5, yw - 1.5] };
    const qj = t => { const m = 1 - t; return [0, 1].map(i => m * m * jet.a[i] + 2 * m * t * jet.c[i] + t * t * jet.b[i]); };
    return { yg, s, J, xw, yw, W, jet, qj, main, pouce, axe, nrm, uG, rG, R, eH };
  };
  // L'avant-bras qui prolonge celui de la main « prise vue du dos » (coupé à 60 mm du poignet), le
  // coude, et le bras qui remonte vers l'épaule hors du cadre. rot : de combien le bras tourne au coude.
  const brasCoude = (o, R, eH, rot) => {
    const P = p => ptPrise(o, R, p), add = (a, b) => [a[0] + b[0], a[1] + b[1]], mul = (a, k) => [a[0] * k, a[1] * k];
    const uni = a => { const l = Math.hypot(a[0], a[1]); return [a[0] / l, a[1] / l]; };
    const inter = (p, u, q, v) => { const d = u[0] * v[1] - u[1] * v[0], t = ((q[0] - p[0]) * v[1] - (q[1] - p[1]) * v[0]) / d; return [p[0] + u[0] * t, p[1] + u[1] * t]; };
    const A = P([-148, -33]), B = P([-148, 34]), c0 = P([-148, 0]), E = P([-330, 0]);
    const dF = uni([E[0] - c0[0], E[1] - c0[1]]), dU = tourne(dF, rot), nA = uni([A[0] - c0[0], A[1] - c0[1]]);
    let nU = [dU[1], -dU[0]]; if (nU[0] * nA[0] + nU[1] * nA[1] < 0) nU = [-nU[0], -nU[1]];
    const wU = 40 * eH, rC = 30 * eH, loin = 900;
    const Ci = inter(A, dF, add(E, mul(nU, wU)), dU), Co = inter(B, dF, add(E, mul(nU, -wU)), dU);
    const o1 = add(Co, mul(dF, -rC)), o2 = add(Co, mul(dU, rC)), Ti = add(Ci, mul(dU, loin)), To = add(Co, mul(dU, loin));
    return [
      h.path(`M${pt(A)} L${pt(Ci)} L${pt(Ti)} L${pt(To)} L${pt(o2)} Q${pt(Co)} ${pt(o1)} L${pt(B)} Z`, h.a.blanc),
      h.path(`M${pt(A)} L${pt(Ci)} L${pt(Ti)}`, h.a.arete),
      h.path(`M${pt(B)} L${pt(o1)} Q${pt(Co)} ${pt(o2)} L${pt(To)}`, h.a.arete),
      h.path(`M${pt(add(Ci, mul(dF, -12 * eH)))} Q${pt(add(Ci, mul(nU, -6 * eH)))} ${pt(add(Ci, add(mul(dU, 8 * eH), mul(nU, -9 * eH))))}`, h.a.detail),
    ].join('\n');
  };
  const sousNiveau = (poly, y0) => {
    const out = [];
    for (let i = 0; i < poly.length; i++) {
      const a = poly[i], b = poly[(i + 1) % poly.length], ia = a[1] >= y0, ib = b[1] >= y0;
      if (ia) out.push(a);
      if (ia !== ib) { const t = (y0 - a[1]) / (b[1] - a[1]); out.push([a[0] + (b[0] - a[0]) * t, y0]); }
    }
    return out;
  };
  // Le profil de la bouteille, bouchon en bas : u depuis le bout du bouchon (cm), demi-largeur.
  const BOUT = [[0, 1.2], [0.4, 1.9], [2.9, 1.95], [3.2, 1.45], [3.9, 1.5], [4.6, 2.2], [6, 3.6], [7.6, 4.5], [9.2, 4.8], [12, 4.72], [17.5, 4.0], [22.8, 4.72], [24.5, 4.8], [28.4, 4.8]];
  const LB = 30;
  const dessinD = z => {
    const g = geoD(z), s = g.s, W = g.W, out = [g.J.dessin];
    const x = g.xw, y = g.yw, yg = g.yg;
    // l'eau qui descend le flanc et fait une flaque au pied de la cuisse
    for (const [d0, d1, lg] of [[-1.2, -4.2, 1], [-0.2, -1, 0.62], [0.6, 1.4, 1], [1.4, 4.6, 0.8]]) {
      const x0 = x + d0 * s, y0 = y + 0.9 * s, y1 = y0 + (yg - 1.2 * s - y0) * lg, x1 = x + d1 * s;
      out.push(h.path(`M${f(x0)},${f(y0)} C${f(x0 + (x1 - x0) * 0.1 + 0.9 * s)},${f(y0 + (y1 - y0) * 0.35)} ${f(x1 - 0.9 * s)},${f(y0 + (y1 - y0) * 0.65)} ${f(x1)},${f(y1)}`, h.a.detail));
      out.push(h.path(`M${f(x1 - 0.45 * s)},${f(y1 + 0.2 * s)} Q${f(x1)},${f(y1 - 0.8 * s)} ${f(x1 + 0.45 * s)},${f(y1 + 0.2 * s)} A${f(0.45 * s)} ${f(0.45 * s)} 0 0 1 ${f(x1 - 0.45 * s)},${f(y1 + 0.2 * s)} Z`, h.a.plein));
    }
    out.push(h.path(`M${f(x - 9 * s)},${f(yg)} Q${f(x)},${f(yg - 2 * s)} ${f(x + 10 * s)},${f(yg)} Z`, h.a.hachure('eau', 'detail')));
    // la plaie et la saleté
    out.push(h.path(`M${f(x - 2.2 * s)},${f(y + 0.9 * s)} Q${f(x)},${f(y - 0.7 * s)} ${f(x + 2.2 * s)},${f(y - 0.3 * s)} Q${f(x)},${f(y + 0.9 * s)} ${f(x - 2.2 * s)},${f(y + 0.9 * s)} Z`, h.a.plein));
    for (const [dx, dy] of [[-3.4, 1.8], [3.3, 1.2], [-1.2, 2.6], [1.8, 2.4], [4.4, 3]]) out.push(h.cercle(x + dx * s, y + dy * s, 0.28 * s, h.a.plein));
    // la bouteille : le corps pincé sous la main, l'épaule, le goulot, le bouchon
    const cote = sg => { const p = []; for (let u = 0.4; u <= 28.4 + 1e-6; u += 0.4) p.push(W(u, sg * lisse(BOUT, u))); return p; };
    const coin = sg => { const p = []; for (let i = 0; i <= 6; i++) { const a = Math.PI / 2 * i / 6; p.push(W(28.4 + 1.6 * Math.sin(a), sg * (3.2 + 1.6 * Math.cos(a)))); } return p; };
    const corps = [W(0, -1.2), ...cote(-1), ...coin(-1), ...coin(1).reverse(), ...cote(1).reverse(), W(0, 1.2)];
    out.push(h.chemin(corps, plein(h.a.contour), true));
    const yn = W(25.5, 0)[1];
    const eau = sousNiveau(corps, yn);
    out.push(h.chemin(eau, h.a.hachure('eau', 'aucun'), true));
    const surf = eau.filter(p => Math.abs(p[1] - yn) < 0.01).map(p => p[0]).sort((a, b) => a - b);
    if (surf.length >= 2) out.push(h.ligne(surf[0], yn, surf[surf.length - 1], yn, h.a.detail));
    out.push(h.chemin(corps, h.a.contour, true));
    // le bouchon : une bague, et le trou au bout
    out.push(h.path(`M${pt(W(3.05, -1.95))} L${pt(W(3.05, 1.95))}`, h.a.detail));
    out.push(h.path(`M${pt(W(2.5, -1.9))} L${pt(W(2.5, 1.9))}`, h.a.fin));
    out.push(h.cercle(...W(0, 0), 0.35 * s, h.a.plein));
    // la main qui serre : les doigts repliés autour du corps, le pouce qui creuse la paroi
    out.push(F.main(g.main), brasCoude(g.main, g.R, g.eH, -58));
    const P0 = g.pouce;
    const uP = [g.axe[0], g.axe[1]], vP = [g.nrm[0], g.nrm[1]];
    const Q = (a, b) => [P0[0] + (a * uP[0] + b * vP[0]) * s, P0[1] + (a * uP[1] + b * vP[1]) * s];
    // les plis du plastique enfoncé sous le bout du pouce : ils partent du pouce et montent sur la paroi
    for (const [a0, b0, a1, b1, a2, b2] of [[0.7, -0.9, 1.6, -1.5, 2.9, -1.9], [0.9, -0.2, 2, -0.3, 3.4, -0.1], [0.6, 0.5, 1.5, 0.9, 2.6, 1.6]])
      out.push(h.path(`M${pt(Q(a0, b0))} Q${pt(Q(a1, b1))} ${pt(Q(a2, b2))}`, h.a.detail));
    // le jet et ses éclaboussures
    out.push(h.path(`M${pt(g.jet.a)} Q${pt(g.jet.c)} ${pt(g.jet.b)}`, h.a.arete));
    for (const [dx, dy] of [[-1.8, -1.4], [1.6, -1.7], [-2.9, -0.6], [2.7, -0.7]]) out.push(h.cercle(g.jet.b[0] + dx * s, g.jet.b[1] + dy * s, 0.25 * s, h.a.plein));
    return decoupe('d', z, out.join('\n'));
  };

  // ─── E. Sans bouteille : le sac plein d'eau, le cou tordu au poing, le trou d'épingle en bas,
  // le jet sur la plaie de la cuisse.
  const geoE = z => {
    const yg = z.h - 10, s = Math.min(z.l / 64, 3.6), u0 = -2;
    const X = u => (u - u0) * s, Y = v => yg - v * s;
    const top = x => Y(lisse(HAUT, u0 + x / s));
    const xw = X(22), yw = top(xw);
    const Wd = 10 * s, cx = xw + 4.8 * s + 0.78 * Wd, yb = yw - 7.6 * s;
    const yn = yb - 19.5 * s, yt = yn - 4.4 * s, yF = yt - 5.6 * s;
    return { s, yg, X, Y, top, xw, yw, cx, yn, yb, Wd, yt, yF, trou: [cx - Wd * 0.8, yb - 0.3 * s] };
  };
  const dessinE = z => {
    const g = geoE(z), s = g.s, cx = g.cx, yn = g.yn, yb = g.yb, Wd = g.Wd, yt = g.yt, out = [sol(z, g.yg)];
    // la cuisse, posée au sol, et la plaie sous le jet
    const hp = [], bp = [];
    for (let x = 0; x < z.l; x += 1.5) { hp.push([x, g.top(x)]); bp.push([x, g.Y(lisse(BASC, -2 + x / s))]); }
    hp.push([z.l, g.top(z.l)]); bp.push([z.l, g.Y(lisse(BASC, -2 + z.l / s))]);
    out.push(h.chemin([...hp, ...bp.slice().reverse()], h.a.blanc, true), h.chemin(hp, h.a.contour), h.chemin(bp, h.a.contour));
    const x = g.xw, y = g.yw;
    out.push(h.path(`M${f(x - 2.2 * s)},${f(y + 0.9 * s)} Q${f(x)},${f(y - 0.7 * s)} ${f(x + 2.2 * s)},${f(y - 0.3 * s)} Q${f(x)},${f(y + 0.9 * s)} ${f(x - 2.2 * s)},${f(y + 0.9 * s)} Z`, h.a.plein));
    for (const [dx, dy] of [[-3.4, 1.8], [3.3, 1.2], [-1.2, 2.6], [1.8, 2.4]]) out.push(h.cercle(x + dx * s, y + dy * s, 0.28 * s, h.a.plein));
    // le sac : étroit au cou, lourd et rond en bas, plein d'eau
    const sac = `M${f(cx - 1.5 * s)},${f(yn)} C${f(cx - 2.5 * s)},${f(yn + 5 * s)} ${f(cx - Wd)},${f(yn + 7 * s)} ${f(cx - Wd)},${f(yn + 13 * s)} ` +
      `Q${f(cx - Wd)},${f(yb)} ${f(cx)},${f(yb + 0.4 * s)} ` +
      `Q${f(cx + Wd)},${f(yb)} ${f(cx + Wd)},${f(yn + 13 * s)} ` +
      `C${f(cx + Wd)},${f(yn + 7 * s)} ${f(cx + 2.5 * s)},${f(yn + 5 * s)} ${f(cx + 1.5 * s)},${f(yn)} Z`;
    out.push(h.path(sac, h.a.hachure('eau', 'contour')));
    out.push(h.path(`M${f(cx - 0.8 * s)},${f(yn + 1 * s)} Q${f(cx - 3 * s)},${f(yn + 6 * s)} ${f(cx - 6 * s)},${f(yn + 10.5 * s)}`, h.a.detail));
    out.push(h.path(`M${f(cx + 0.8 * s)},${f(yn + 1 * s)} Q${f(cx + 2.5 * s)},${f(yn + 5 * s)} ${f(cx + 4.6 * s)},${f(yn + 8.6 * s)}`, h.a.detail));
    // le cou tordu, du sac jusqu'au poing, et la touffe de plastique qui dépasse au-dessus
    const yH = g.yF - 6.8 * s;
    out.push(h.path(`M${f(cx - 1.5 * s)},${f(yn + 0.3 * s)} L${f(cx - 1.1 * s)},${f(g.yF)} L${f(cx + 1.1 * s)},${f(g.yF)} L${f(cx + 1.5 * s)},${f(yn + 0.3 * s)} Z`, plein(h.a.arete)));
    for (let i = 0; i < 5; i++) { const yy = yn - 0.2 * s - i * 1 * s; out.push(h.path(`M${f(cx - 1.3 * s)},${f(yy)} Q${f(cx)},${f(yy - 0.1 * s)} ${f(cx + 1.3 * s)},${f(yy - 0.9 * s)}`, h.a.detail)); }
    out.push(h.path(`M${f(cx - 1 * s)},${f(g.yF)} L${f(cx - 1 * s)},${f(yH)} Q${f(cx - 2.6 * s)},${f(yH - 1 * s)} ${f(cx - 1.8 * s)},${f(yH - 2.3 * s)} Q${f(cx - 0.8 * s)},${f(yH - 1.5 * s)} ${f(cx - 0.2 * s)},${f(yH - 2.6 * s)} Q${f(cx + 1.3 * s)},${f(yH - 2.1 * s)} ${f(cx + 1.5 * s)},${f(yH - 0.9 * s)} L${f(cx + 1 * s)},${f(yH)} L${f(cx + 1 * s)},${f(g.yF)} Z`, plein(h.a.arete)));
    out.push(h.path(`M${f(cx - 1.2 * s)},${f(yH - 1.6 * s)} Q${f(cx - 0.4 * s)},${f(yH - 0.8 * s)} ${f(cx + 0.2 * s)},${f(yH + 0.2 * s)}`, h.a.fin));
    // le poing fermé sur le cou tordu, vu du dos, dans l'axe de l'avant-bras : le pouce refermé sur l'index
    out.push(F.main({ x: cx, y: g.yF, pose: 'prise', vue: 'dos', cote: 'gauche', angle: -12, diametre: 2.3 * s, echelle: 1.25 * s / 10, bras: 900 }));
    // tordre : la flèche passe devant le cou
    const ya = (yn + yt) / 2 + 0.3 * s;
    out.push(h.fleche(`M${f(cx - 4.4 * s)},${f(ya - 0.5 * s)} A${f(4.4 * s)} ${f(1.5 * s)} 0 0 0 ${f(cx + 4.2 * s)},${f(ya - 0.9 * s)}`, h.a.arete));
    // le trou d'épingle, sous l'eau, et le jet jusqu'à la plaie
    const t = g.trou;
    out.push(h.cercle(t[0], t[1], 0.45 * s, h.a.plein));
    out.push(h.path(`M${f(t[0] - 0.3 * s)},${f(t[1] + 0.3 * s)} Q${f(t[0] - 3.2 * s)},${f(t[1] + 1.6 * s)} ${f(g.xw + 0.3 * s)},${f(g.yw - 0.6 * s)}`, h.a.arete));
    for (const [dx, dy] of [[-1.6, -1.3], [1.5, -1.5], [-2.6, -0.5]]) out.push(h.cercle(g.xw + dx * s, g.yw + dy * s, 0.25 * s, h.a.plein));
    return decoupe('e', z, out.join('\n'));
  };

  return {
    ref: '26-40',
    titre: 'Appuyer sur la plaie, puis la laver',
    desc: 'Cinq gestes. Appuyer : la cuisse couchée, de la hanche au genou, une compresse sur la plaie ; les deux avant-bras tendus descendent droit du haut, coudes verrouillés, les deux mains à plat l’une sur l’autre, la paume du dessous sur la compresse, et tout le poids qui descend. Gros plan quand le sang traverse : la cuisse posée au sol, la première compresse trempée reste en place, une seule autre par-dessus, les mains à plat qui appuient plus fort ; le sang passé coule le long du flanc jusqu’au sol. Une plaie profonde de cuisse en coupe, repérée sur une petite jambe entière : la chair tramée, le fémur en hachure croisée, la gaze repliée en accordéon tassée jusqu’au fond au doigt ganté, son bout libre couché sur la peau. Laver : une bouteille souple tenue bouchon en bas, serrée au poing, les doigts repliés autour du corps et le pouce qui enfonce la paroi, le jet sur la plaie, l’eau sale qui descend le flanc jusqu’au sol. Sans bouteille : un sac de plastique plein d’eau tenu au poing par le cou tordu, le pouce refermé sur l’index, le jet qui sort d’un trou d’épingle dans le coin du bas et tombe sur la plaie de la cuisse.',
    format: 'pleine',
    disposition: [['appuyer', 'traverse', 'bourrer'], ['laver', 'sac']],
    largeurs: [[1, 1, 1], [3, 2]],
    vues: {
      appuyer: {
        titre: 'Appuyer',
        dessin: dessinA,
        renvois: z => {
          const g = geoA(z), em = g.em;
          const talon = g.M.Tb([-40, 0]);
          const [, xd] = g.M.bords(g.M.haut, 58);
          return [
            { n: 1, rond: [12, talon[1] - 34], cible: talon, texte: 'la paume sur la plaie même' },
            { n: 2, rond: [z.l - 12, 24], cible: [xd, 58], texte: 'bras tendus : tout son poids' },
          ];
        },
      },
      traverse: {
        titre: 'Le sang traverse',
        dessin: dessinB,
        renvois: z => {
          const g = geoB(z), s = g.s, C = g.C, x1 = g.c1[0] + 0.4 * s, x2 = g.c2[1] - 1.2 * s;
          return [
            { n: 3, rond: [12, C.top(x1) - 9 * s], cible: [x1, C.top(x1) - g.e / 2], texte: 'la première reste en place' },
            { n: 4, rond: [z.l - 12, C.top(x2) - 8 * s], cible: [x2, C.top(x2) - 1.5 * g.e], texte: 'une seule autre par-dessus' },
            { n: 5, rond: [z.l - 12, 20], cible: [g.xf, 40], texte: 'appuyer plus fort' },
          ];
        },
      },
      bourrer: {
        titre: 'Plaie profonde',
        dessin: dessinC,
        renvois: z => {
          const g = geoC(z), s = g.s;
          return [
            { n: 6, rond: [12, g.K[1] - 2 * s], cible: [g.xf - 0.9 * s, g.yM - 1.8 * s], texte: 'au doigt ganté' },
            { n: 7, rond: [z.l - 11, g.yM - 1.5 * s], cible: [g.xm + 2.6 * s, g.ytop(g.xm + 2.6 * s) + 0.3], texte: 'trou plein, puis appuyer' },
            { n: 8, rond: [z.l - 11, g.cy + 3.6 * s], cible: [g.ax(0.8), g.ay(0.8)], texte: 'gaze tassée jusqu’au fond' },
          ];
        },
      },
      laver: {
        titre: 'Laver',
        dessin: dessinD,
        renvois: z => {
          const g = geoD(z), s = g.s, W = g.W;
          const pc = W(0, 0), pj = g.qj(0.5), pe = W(8.5, -2.2);
          return [
            { n: 9, rond: [pc[0] + 13 * s, pc[1] - 3 * s], cible: [pc[0] + 0.4 * s, pc[1]], texte: 'percée au clou chauffé' },
            { n: 10, rond: [14, pj[1] + 1 * s], cible: pj, texte: 'le jet décolle, sans frotter' },
            { n: 11, rond: [14, pe[1] - 4 * s], cible: pe, texte: 'eau bouillie, puis refroidie' },
            { n: 12, rond: [14, 18], cible: g.pouce, texte: 'presser la bouteille souple' },
            { n: 13, rond: [g.xw + 16 * s, g.yg - 20 * s], cible: [g.xw + 1.2 * s, g.yw + 6 * s], texte: 'tant qu’on voit de la saleté' },
          ];
        },
      },
      sac: {
        titre: 'Sans bouteille',
        dessin: dessinE,
        renvois: z => {
          const g = geoE(z), s = g.s;
          return [
            { n: 14, rond: [z.l - 12, g.yn - 1 * s], cible: [g.cx + 1.3 * s, g.yn - 2.6 * s], texte: 'le cou tordu pousse l’eau' },
            { n: 15, rond: [z.l - 12, g.yn + 15 * s], cible: [g.cx + g.Wd, g.yn + 13 * s], texte: 'sac de plastique épais' },
            { n: 16, rond: [14, g.yb - 8 * s], cible: g.trou, texte: 'trou d’épingle' },
          ];
        },
      },
    },
    danger: 'Danger — chaque coup d’œil sous la compresse défait le caillot qui commençait. Compter à voix haute au moins cinq minutes pleines avant de regarder, et compter large : sous stress, on compte trop vite.',
  };
};
