// Planche 109-02 — la boucle au bout d'un câble d'acier, sur serre-câbles.
// Chapitre 86, § 5-E (procédure, étrier sur le brin mort) et tableau Matériel (cosses de fortune).
module.exports = (h) => {
  const B = h.a.blanc.match(/fill="([^"]+)"/)[1];
  const blanc = t => h.a[t].replace('fill="none"', `fill="${B}"`);
  const f = v => Math.round(v * 100) / 100;
  const rad = a => a * Math.PI / 180;
  const pt = p => `${f(p[0])} ${f(p[1])}`;

  // Ligne centrale échantillonnée : ['L', x, y] ou ['A', cx, cy, r, a0, a1] (degrés, y vers le bas).
  const echant = (x0, y0, segs, pas = 1.5) => {
    const pts = [[x0, y0]];
    let x = x0, y = y0;
    for (const s of segs) {
      if (s[0] === 'L') {
        const [, x1, y1] = s;
        const n = Math.max(1, Math.ceil(Math.hypot(x1 - x, y1 - y) / pas));
        for (let i = 1; i <= n; i++) pts.push([x + (x1 - x) * i / n, y + (y1 - y) * i / n]);
        x = x1; y = y1;
      } else {
        const [, cx, cy, r, a0, a1] = s;
        const n = Math.max(2, Math.ceil(Math.abs(rad(a1 - a0)) * r / pas));
        for (let i = 1; i <= n; i++) {
          const a = rad(a0 + (a1 - a0) * i / n);
          pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
        }
        [x, y] = pts[pts.length - 1];
      }
    }
    // points confondus : on les retire
    return pts.filter((p, i) => i === 0 || Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1]) > 0.05);
  };

  // Tangente et normale en chaque point d'une polyligne.
  const reperes = pts => pts.map((p, i) => {
    const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1, tx = (b[0] - a[0]) / L, ty = (b[1] - a[1]) / L;
    return { p, tx, ty, nx: -ty, ny: tx };
  });
  const decale = (R, e) => R.map(r => [r.p[0] + r.nx * e, r.p[1] + r.ny * e]);

  // Bout d'un câble : droit (coupé) ou en S (rompu, il continue).
  const bout = (a, b, r, sens, rompu) => {
    if (!rompu) return `L ${pt(b)}`;
    const t = [r.tx * sens * 6, r.ty * sens * 6];
    const c1 = [a[0] + (b[0] - a[0]) * 0.25 + t[0], a[1] + (b[1] - a[1]) * 0.25 + t[1]];
    const c2 = [a[0] + (b[0] - a[0]) * 0.75 - t[0], a[1] + (b[1] - a[1]) * 0.75 - t[1]];
    return `C ${pt(c1)} ${pt(c2)} ${pt(b)}`;
  };

  // Un câble d'acier : silhouette à 2,4, torons en biais à 0,7.
  const corde = (pts, d, rompuDebut, rompuFin) => {
    const R = reperes(pts), G = decale(R, d / 2), D = decale(R, -d / 2), n = pts.length - 1;
    let s = `M ${pt(G[0])} ` + G.slice(1).map(p => `L ${pt(p)}`).join(' ');
    s += ' ' + bout(G[n], D[n], R[n], 1, rompuFin) + ' ';
    s += D.slice(0, n).reverse().map(p => `L ${pt(p)}`).join(' ');
    s += ' ' + bout(D[0], G[0], R[0], -1, rompuDebut) + ' Z';
    const out = [h.path(s, blanc('contour'))];
    // torons : chaque sillon entre deux torons est une demi-hélice vue de côté
    const S = [0];
    for (let i = 1; i <= n; i++) S.push(S[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
    const at = (sv, off) => {
      let i = 0;
      while (i < n - 1 && S[i + 1] < sv) i++;
      const r = R[i], u = (sv - S[i]) / ((S[i + 1] - S[i]) || 1);
      const x = pts[i][0] + (pts[i + 1][0] - pts[i][0]) * u, y = pts[i][1] + (pts[i + 1][1] - pts[i][1]) * u;
      return [x + r.nx * off, y + r.ny * off];
    };
    const demi = 1.6 * d, a = d / 2 - 1.4;
    let tors = '';
    for (let s0 = -demi; s0 < S[n] + demi; s0 += 1.08 * d) {
      const P = [];
      for (let k = 0; k <= 12; k++) {
        const u = -1 + k / 6, sv = s0 + u * demi;
        if (sv < 0.8 || sv > S[n] - 0.8) continue;
        P.push(at(sv, a * Math.sin(u * Math.PI / 2)));
      }
      if (P.length > 1) tors += 'M ' + P.map(pt).join(' L ') + ' ';
    }
    out.push(h.path(tors.trim(), h.a.detail));
    return out.join('\n');
  };

  // Une tige ronde (l'étrier) : fond blanc, deux flancs à 1,4, bouts ouverts.
  // loin = true : la branche de derrière, peinte au gris loin de la charte.
  const tige = (pts, e, loin = false) => {
    const R = reperes(pts), G = decale(R, e / 2), D = decale(R, -e / 2);
    const fond = 'M ' + G.map(pt).join(' L ') + ' L ' + D.slice().reverse().map(pt).join(' L ') + ' Z';
    return [h.path(fond, loin ? h.a.loin : h.a.blanc), h.path('M ' + G.map(pt).join(' L '), h.a.arete), h.path('M ' + D.map(pt).join(' L '), h.a.arete)].join('\n');
  };

  // Œil de câble autour d'un appui : cercles de centres (0,0) et (ll,0), rayon Rc de la ligne
  // centrale ; les deux brins se rejoignent en pointe vers +x puis courent côte à côte.
  const oeil = (Rc, d, ll = 0) => {
    const L = 2.2 * Rc, sinA = Rc / L, tanA = Math.tan(Math.asin(sinA));
    const th = Math.acos(Rc / L) * 180 / Math.PI;
    const xa = ll + L, xs = xa - (d / 2) / tanA;
    return { Rc, d, ll, L, sinA, tanA, th, xa, xs };
  };
  const cheminOeil = (g, xBas, xHaut) => echant(xBas, g.d / 2, [
    ['L', g.xs, g.d / 2],
    ['L', g.ll + g.Rc * Math.cos(rad(g.th)), g.Rc * Math.sin(rad(g.th))],
    ['A', g.ll, 0, g.Rc, g.th, 90],
    ['L', 0, g.Rc],
    ['A', 0, 0, g.Rc, 90, 270],
    ['L', g.ll, -g.Rc],
    ['A', g.ll, 0, g.Rc, 270, 360 - g.th],
    ['L', g.xs, -g.d / 2],
    ['L', xHaut, -g.d / 2],
  ]);

  // La cosse (ou le tuyau cintré) : bande en goutte qui tient le câble dans sa gorge.
  const cosse = (g, dIn, T) => {
    const ro = g.Rc - 1, ri = g.Rc - g.d / 2 - dIn;
    const apO = g.xa - 1 / g.sinA, apI = g.xa - (g.d / 2 + dIn) / g.sinA;
    const xt = g.xs - 1, yt = (apO - xt) * g.tanA;
    const c = Math.cos(rad(g.th)), s = Math.sin(rad(g.th));
    const ext = echant(xt, -yt, [['L', ro * c, -ro * s], ['A', 0, 0, ro, 360 - g.th, g.th], ['L', xt, yt]]).map(T);
    const int = echant(apI, 0, [['L', ri * c, -ri * s], ['A', 0, 0, ri, 360 - g.th, g.th], ['L', apI, 0]]).map(T);
    const gm = g.Rc - g.d / 2 - dIn / 2 - 1, apM = g.xa - (g.d / 2 + dIn / 2 + 1) / g.sinA;
    const xm = g.xs - 7, ym = (apM - xm) * g.tanA;
    const milieu = echant(xm, -ym, [['L', gm * c, -gm * s], ['A', 0, 0, gm, 360 - g.th, g.th], ['L', xm, ym]]).map(T);
    const d = P => 'M ' + P.map(pt).join(' L ') + ' Z';
    return [
      h.path(d(ext) + ' ' + d(int), blanc('arete') + ' fill-rule="evenodd"'),
      h.path('M ' + milieu.map(pt).join(' L '), h.a.detail),
    ].join('\n');
  };

  // ─── Vue 1 : la boucle montée ───────────────────────────────────────────────────────
  const G1 = z => {
    const d = 14, g = oeil(40, d);
    const xc = 63, yc = f(Math.max(72, (z.h - 157) / 2 + 69));
    const hs = 1.6 * d, rd = 0.6 * d, ez = d / 2 + rd / 2 + 0.5, ox = ez * 0.55;
    const sp = 6.5 * d;
    const k2 = g.xs + hs + 6, k3 = k2 + sp, k1 = k3 + sp;
    const mort = k1 + 3 * hs, vif = z.l - 70 - xc;
    const selH = d / 2 + 1.5, selB = d + 0.9 * d;          // en local, sous l'axe
    const ecH = 0.75 * d, ecL = 1.6 * rd, bt = 6;
    const T = p => [xc + p[0], yc + p[1]];
    return { d, g, xc, yc, hs, rd, ez, ox, sp, k1, k2, k3, mort, vif, selH, selB, ecH, ecL, bt, T };
  };
  const coude = (k, q, a0, a1) => {           // demi-coude de l'étrier, vu de trois quarts
    const pts = [];
    for (let i = 0; i <= 16; i++) {
      const a = rad(a0 + (a1 - a0) * i / 16);
      pts.push([k - q.ox * Math.cos(a), -q.d / 2 - q.ez * Math.sin(a)]);
    }
    return pts;
  };

  const vueBoucle = z => {
    const q = G1(z), g = q.g, T = q.T, yH = q.selB + 3;
    const out = [];
    const clips = [q.k1, q.k2, q.k3];
    // tiges arrière : derrière le câble
    for (const k of clips) out.push(tige([[k + q.ox, yH], [k + q.ox, -q.d / 2], ...coude(k, q, 180, 90)].map(T), q.rd, true));
    out.push(corde(cheminOeil(g, q.vif, q.mort).map(T), q.d, true, false));
    out.push(cosse(g, 5, T));
    // tiges avant : devant le câble
    for (const k of clips) out.push(tige([...coude(k, q, 90, 0), [k - q.ox, -q.d / 2], [k - q.ox, yH]].map(T), q.rd));
    // selles
    for (const k of clips) {
      const t = q.selH, b = q.selB, e = q.hs, w = 0.55 * q.hs, P = (x, y) => pt(T([x, y]));
      out.push(h.path(`M ${P(k - e, t)} L ${P(k + e, t)} L ${P(k + e, t + 3.5)} Q ${P(k + 0.62 * e, t + 3.5)} ${P(k + w, b)} L ${P(k - w, b)} Q ${P(k - 0.62 * e, t + 3.5)} ${P(k - e, t + 3.5)} Z`, blanc('arete')));
    }
    // écrous : l'arrière d'abord
    for (const k of clips) for (const x of [k + q.ox, k - q.ox]) {
      const [X, Y] = T([x, q.selB]);
      out.push(h.rect(f(X - q.rd / 2 + 1), f(Y + q.ecH), f(q.rd - 2), q.bt, blanc('detail')));
      out.push(h.rect(f(X - q.ecL / 2), f(Y), f(q.ecL), f(q.ecH), blanc('arete')));
      out.push(h.ligne(f(X - q.ecL / 4), f(Y), f(X - q.ecL / 4), f(Y + q.ecH), h.a.detail));
      out.push(h.ligne(f(X + q.ecL / 4), f(Y), f(X + q.ecL / 4), f(Y + q.ecH), h.a.detail));
    }
    // cote : 6 à 7 diamètres d'un serre-câble à l'autre
    const yTop = q.yc - q.d / 2 - q.ez - q.rd / 2, yCote = yTop - 16;
    for (const k of [q.k2, q.k3]) out.push(h.ligne(f(q.xc + k), f(yTop - 3), f(q.xc + k), f(yCote - 4), h.a.fin));
    out.push(h.cote(f(q.xc + q.k2), f(yCote), f(q.xc + q.k3), f(yCote), '6 à 7 diamètres', { cote: 'dessus' }));
    // le brin vivant continue jusqu'à la charge
    out.push(h.fleche(`M ${f(q.xc + q.vif + 12)} ${f(q.yc + q.d / 2)} L ${f(z.l - 12)} ${f(q.yc + q.d / 2)}`));
    return out.join('\n');
  };

  const renvoisBoucle = z => {
    const q = G1(z), X = x => f(q.xc + x), Y = y => f(q.yc + y);
    const ri = q.g.Rc - q.d / 2 - 5, nut = q.selB + q.ecH;
    const xv = (q.mort + q.vif) / 2 + 10;
    return [
      { n: 1, rond: [X(-4), Y(0)], cible: [X(-ri), Y(0)], texte: 'cosse : tient le rayon du câble' },
      { n: 2, rond: [X(xv + 22), Y(q.d + 48)], cible: [X(xv), Y(q.d + 1.4)], texte: 'brin vivant, tiré par la charge' },
      { n: 3, rond: [X(q.mort + 26), Y(-q.d - 44)], cible: [X(q.mort - 10), Y(-q.d - 1.4)], texte: 'brin mort, le bout libre' },
      { n: 4, rond: [X(q.k1 + 4), Y(nut + 42)], cible: [X(q.k1 - q.ox), Y(nut + 0.7)], texte: 'premier, à une selle du bout' },
      { n: 5, rond: [X(q.k2 - 8), Y(nut + 42)], cible: [X(q.k2 - q.ox), Y(nut + 0.7)], texte: 'deuxième, au ras, écrous lâches' },
      { n: 6, rond: [X(q.k3 - 4), Y(nut + 42)], cible: [X(q.k3 - q.ox), Y(nut + 0.7)], texte: 'entre les deux ; tendre, puis serrer' },
    ];
  };

  // ─── Vue 2 : un serre-câble en coupe ────────────────────────────────────────────────
  const G2 = z => {
    const s = Math.min((z.h - 44) / 152, (z.l - 70) / 106);
    const D = 46 * s, R = 18 * s, e = D / 2 + R / 2 + 4 * s;
    const cx = f(z.l / 2 - 16), haut = (z.h - 152 * s) / 2;
    const yb = haut + e + R / 2;
    const yd = yb - e + R / 2 + D / 2, yl = yd + D;
    const selH = yl + (D / 2 + s) * Math.sin(rad(20)), selB = yl + D / 2 + 18 * s, selX = e + R / 2 + 8 * s;
    const ecH = 14 * s, ecL = 1.7 * R, bt = 10 * s;
    return { s, D, R, e, cx, yb, yd, yl, selH, selB, selX, ecH, ecL, bt };
  };
  const sectionCable = (cx, cy, D) => {
    const out = [h.cercle(f(cx), f(cy), f(D / 2), blanc('contour'))];
    const r = D / 6.3;
    out.push(h.cercle(f(cx), f(cy), f(r), h.a.detail));
    for (let i = 0; i < 6; i++) {
      const a = rad(30 + 60 * i);
      out.push(h.cercle(f(cx + (D / 3) * Math.cos(a)), f(cy + (D / 3) * Math.sin(a)), f(r), h.a.detail));
    }
    return out.join('\n');
  };
  const vueCoupe = z => {
    const q = G2(z), { cx, e, R, D } = q, out = [];
    // selle, en coupe
    const rs = D / 2 + q.s, a = rad(20);
    out.push(h.path(`M ${f(cx - q.selX)} ${f(q.selH)} L ${f(cx - rs * Math.cos(a))} ${f(q.selH)} A ${f(rs)} ${f(rs)} 0 0 0 ${f(cx + rs * Math.cos(a))} ${f(q.selH)} L ${f(cx + q.selX)} ${f(q.selH)} L ${f(cx + q.selX)} ${f(q.selB - 6 * q.s)} Q ${f(cx + q.selX)} ${f(q.selB)} ${f(cx + q.selX - 6 * q.s)} ${f(q.selB)} L ${f(cx - q.selX + 6 * q.s)} ${f(q.selB)} Q ${f(cx - q.selX)} ${f(q.selB)} ${f(cx - q.selX)} ${f(q.selB - 6 * q.s)} Z`, h.a.hachure('metal', 'contour')));
    // étrier en U
    const yF = q.selB + q.ecH + q.bt, ro = e + R / 2, ri = e - R / 2;
    out.push(h.path(`M ${f(cx - ro)} ${f(yF)} L ${f(cx - ro)} ${f(q.yb)} A ${f(ro)} ${f(ro)} 0 0 1 ${f(cx + ro)} ${f(q.yb)} L ${f(cx + ro)} ${f(yF)} L ${f(cx + ri)} ${f(yF)} L ${f(cx + ri)} ${f(q.yb)} A ${f(ri)} ${f(ri)} 0 0 0 ${f(cx - ri)} ${f(q.yb)} L ${f(cx - ri)} ${f(yF)} Z`, blanc('contour')));
    // filets du bout des tiges
    let fil = '';
    for (const x of [cx - e, cx + e]) for (let i = 1; i <= 3; i++) {
      const y = q.selB + q.ecH + i * q.bt / 4;
      fil += `M ${f(x - R / 2)} ${f(y + 1)} L ${f(x + R / 2)} ${f(y - 1)} `;
    }
    out.push(h.path(fil.trim(), h.a.detail));
    // écrous
    for (const x of [cx - e, cx + e]) {
      out.push(h.rect(f(x - q.ecL / 2), f(q.selB), f(q.ecL), f(q.ecH), blanc('arete')));
      out.push(h.ligne(f(x - q.ecL * 0.22), f(q.selB), f(x - q.ecL * 0.22), f(q.selB + q.ecH), h.a.detail));
      out.push(h.ligne(f(x + q.ecL * 0.22), f(q.selB), f(x + q.ecL * 0.22), f(q.selB + q.ecH), h.a.detail));
    }
    out.push(sectionCable(cx, q.yd, D));
    out.push(sectionCable(cx, q.yl, D));
    // la charte : le point à contrôler, l'étrier qui chevauche le brin mort
    out.push(h.controle(cx, q.yb - e + R / 2, R / 2 + 12 * q.s));
    return out.join('\n');
  };
  const renvoisCoupe = z => {
    const q = G2(z), ro = q.e + q.R / 2, a = rad(-40);
    return [
      { n: 7, rond: [f(q.cx + ro + 20), f(q.yb - ro - 4)], cible: [f(q.cx + ro * Math.cos(a)), f(q.yb + ro * Math.sin(a))], texte: 'étrier en U, sur le brin mort' },
      { n: 8, rond: [f(q.cx + q.selX + 20), f(q.selB + 22)], cible: [f(q.cx + q.selX - 4), f(q.selB - 0.7)], texte: 'selle, sous le brin vivant' },
    ];
  };

  // ─── Vue 3 : cosses de fortune ──────────────────────────────────────────────────────
  const G3 = z => {
    const d = 12;
    const gA = oeil(34, d), gB = oeil(27 + d / 2 + 0.6, d), gC = oeil(17 + d / 2 + 0.6, d, 34);
    const col = [z.l / 6 - 5.7, z.l / 2 - 4, 5 * z.l / 6 + 4].map(f);
    const cy = g => f(26 + g.Rc + d / 2 + 2);
    const bas = f(z.h * 0.56);                             // brins raccourcis, cassure gardée
    const sx = f(col[0] + 14), sy = f(bas + (z.h - bas) / 2 - 4);
    return { d, gA, gB, gC, col, cyA: cy(gA), cyB: cy(gB), cyC: cy(gC), bas, sx, sy };
  };
  // la boucle pend : le x local descend
  const pend = (cx, cy) => p => [cx - p[1], cy + p[0]];
  const vueCosses = z => {
    const q = G3(z), out = [];
    // a. tuyau fendu, cintré en goutte
    const TA = pend(q.col[0], q.cyA), xA = q.bas - q.cyA;
    out.push(corde(cheminOeil(q.gA, xA, xA).map(TA), q.d, true, true));
    out.push(cosse(q.gA, 4, TA));
    // trait de coupe A : en travers du côté droit de la boucle 9, flèches vers le bas
    const yk = f(q.cyA + 14), axe = cheminOeil(q.gA, xA, xA).map(TA).filter(p => p[0] > q.col[0] && Math.abs(p[1] - yk) < 2);
    const xr = axe.reduce((m, p) => Math.max(m, p[0]), q.col[0]);
    out.push(h.ligne(f(xr - 13), yk, f(xr + 13), yk, h.a.detail + ' stroke-dasharray="9 3 2 3"'));
    for (const xe of [xr - 13, xr + 13]) {
      out.push(h.ligne(f(xe), yk, f(xe), yk, h.a.contour));
      out.push(h.fleche(`M ${f(xe)} ${yk} L ${f(xe)} ${f(yk + 11)}`, h.a.detail));
    }
    out.push(h.texte(f(xr + 13), f(yk - 5), 'A', { ancre: 'middle' }));
    // coupe A-A, ×2 : fente ouverte vers l'extérieur (+x), câble au fond du C
    const { sx, sy } = q, ro = 34, ri = 25, o = 48;
    const P = (r, a) => `${f(sx + r * Math.cos(rad(a)))} ${f(sy + r * Math.sin(rad(a)))}`;
    out.push(h.path(`M ${P(ro, o)} A ${ro} ${ro} 0 1 1 ${P(ro, 360 - o)} L ${P(ri, 360 - o)} A ${ri} ${ri} 0 1 0 ${P(ri, o)} Z`, h.a.hachure('metal', 'arete')));
    out.push(sectionCable(sx - 5, sy, 38));
    out.push(h.texte(sx, f(sy + ro + 18), 'A-A', { ancre: 'middle' }));
    // b. anneau d'attelage
    const TB = pend(q.col[1], q.cyB), xB = q.bas - q.cyB;
    out.push(corde(cheminOeil(q.gB, xB, xB).map(TB), q.d, true, true));
    out.push(h.cercle(q.col[1], q.cyB, 27, blanc('arete')));
    out.push(h.cercle(q.col[1], q.cyB, 22.5, h.a.detail));
    out.push(h.cercle(q.col[1], q.cyB, 18, h.a.arete));
    // c. gros maillon de chaîne
    const TC = pend(q.col[2], q.cyC), xC = q.bas - q.cyC, ll = q.gC.ll;
    out.push(corde(cheminOeil(q.gC, xC, xC).map(TC), q.d, true, true));
    const stade = w => {
      const x = q.col[2], y = q.cyC;
      return `M ${f(x - w)} ${f(y)} L ${f(x - w)} ${f(y + ll)} A ${w} ${w} 0 0 0 ${f(x + w)} ${f(y + ll)} L ${f(x + w)} ${f(y)} A ${w} ${w} 0 0 0 ${f(x - w)} ${f(y)} Z`;
    };
    out.push(h.path(stade(17) + ' ' + stade(9), blanc('arete') + ' fill-rule="evenodd"'));
    out.push(h.path(stade(13), h.a.detail));
    return out.join('\n');
  };
  const renvoisCosses = z => {
    const q = G3(z), ri = q.gA.Rc - q.d / 2 - 4;
    const x11 = f((q.col[0] + q.gA.Rc + q.d / 2 + 1.2 + q.col[1] - q.gB.Rc - q.d / 2 - 1.2) / 2);
    return [
      { n: 9, rond: [q.col[0], f(q.cyA + 8)], cible: [q.col[0], f(q.cyA - ri)], texte: 'tuyau fendu, cintré en goutte' },
      { n: 10, rond: [f(q.sx + 62), f(q.sy - 20)], cible: [f(q.sx + 22), f(q.sy - 5)], texte: 'le câble couché dans la fente' },
      { n: 11, rond: [x11, q.cyB], cible: [f(q.col[1] - 24), q.cyB], texte: 'anneau d’attelage' },
      { n: 12, rond: [f(q.col[2] - 50), f(q.cyC + q.gC.ll / 2)], cible: [f(q.col[2] - 17.7), f(q.cyC + q.gC.ll / 2)], texte: 'gros maillon de chaîne' },
    ];
  };

  return {
    ref: '109-02',
    titre: 'La boucle au bout d’un câble d’acier',
    desc: 'Un câble d’acier replié autour d’une cosse et tenu par trois serre-câbles : l’étrier en U de chacun sur le brin mort, le bout libre, et la selle sous le brin vivant, celui qui part à la charge. Le premier serre-câble à une longueur de selle du bout, le deuxième au ras de la cosse, le troisième entre les deux, de 6 à 7 diamètres de câble l’un de l’autre. Une coupe d’un serre-câble montre l’étrier autour du brin mort et la selle sous le brin vivant. Trois cosses de fortune : un bout de tuyau fendu sur sa longueur et cintré en goutte, avec sa coupe A-A agrandie : la fente ouverte vers l’extérieur de la boucle, le câble couché au fond du C, un anneau d’attelage, un gros maillon de chaîne.',
    format: 'pleine',
    disposition: [['boucle'], ['coupe', 'cosses']],
    hauteurs: [0.72, 1.28],
    largeurs: [[1], [2, 3]],
    vues: {
      boucle: { titre: 'La boucle montée', dessin: vueBoucle, renvois: renvoisBoucle },
      coupe: { titre: 'Un serre-câble, en coupe', dessin: vueCoupe, renvois: renvoisCoupe },
      cosses: { titre: 'Cosses de fortune', dessin: vueCosses, renvois: renvoisCosses },
    },
  };
};
