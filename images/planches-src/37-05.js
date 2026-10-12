// Planche 37-05 — Le sauna à fumée : le poêle de pierres sèches
// (ch. 37, « Le sauna à fumée, quand il n'y a pas de tuyau », et 5-A étapes 2 à 5, 5-B étapes 13 et 15)
// Cote : la taille des pierres de sauna, « 100 à 150 » comme en 37-01b (étape 13). Aucune autre : le chapitre ne donne ni la
// largeur du foyer, ni l'épaisseur des murets, ni celle de la dalle, ni la taille de la cabane. Proportions seulement.
// La voûte sans mortier n'est pas dessinée : le chapitre dit qu'il ne l'enseigne pas. La dalle-linteau et les
// deux dalles en toit, qu'il décrit, le sont.
module.exports = (h) => {
  const A = h.a;
  const W = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const f = n => Math.round(n * 10) / 10;
  const rnd = k => { const x = Math.sin(k * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  const HALO = 'fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"';

  // ── formes de base ────────────────────────────────────────────────────────────────
  const lisse = P => {
    const n = P.length, m = (p, q) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
    const s0 = m(P[n - 1], P[0]);
    let d = `M${f(s0[0])} ${f(s0[1])}`;
    for (let i = 0; i < n; i++) { const p = P[i], q = m(P[i], P[(i + 1) % n]); d += ` Q${f(p[0])} ${f(p[1])} ${f(q[0])} ${f(q[1])}`; }
    return d + ' Z';
  };
  // une pierre de sauna : ronde, irrégulière, le dessous un peu aplati
  const galet = (cx, cy, rx, ry, k, at = W(A.arete)) => {
    const n = 9, P = [];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * 2 * Math.PI + (rnd(k + i * 1.7) - 0.5) * 0.4;
      const r = 0.9 + rnd(k * 3.1 + i) * 0.2;
      P.push([cx + Math.cos(a) * rx * r, cy + Math.min(Math.sin(a) * ry * r, ry * 0.9)]);
    }
    return h.path(lisse(P), at);
  };
  // un bloc de muret ou une dalle : dessus et dessous d'aplomb, coins abattus, côtés un peu bruts
  const bloc = (x, y, l, ht, k, at) => {
    const j = i => (rnd(k + i * 2.3) - 0.5) * Math.min(l, ht) * 0.1;
    const c = Math.min(l, ht) * 0.13;
    return h.chemin([[x + c, y], [x + l - c + j(1), y], [x + l, y + c + j(2)], [x + l + j(3) * 0.4, y + ht - c],
      [x + l - c, y + ht], [x + c + j(4), y + ht], [x, y + ht - c + j(5)], [x + j(6) * 0.4, y + c]], at, true);
  };
  const vague = (x1, x2, y, amp = 2.2, per = 18) => {
    let d = `M${f(x1)} ${f(y)}`, x = x1, haut = true;
    while (x + per / 2 <= x2) { d += ` Q${f(x + per / 4)} ${f(y + (haut ? -amp : amp))} ${f(x + per / 2)} ${f(y)}`; x += per / 2; haut = !haut; }
    return d;
  };
  const fl = (d, at) => h.path(d, HALO) + '\n' + h.fleche(d, at);
  const sol = (z, yG) => h.rect(0, yG, z.l, z.h - yG, A.hachure('terre', 'aucun')) + '\n' + h.ligne(0, yG, z.l, yG, A.arete);

  // ── le poêle (mm ; des proportions, pas des cotes) ────────────────────────────────
  const F = 260, T = 300, C = [150, 140, 130], HM = 420, D = 110;
  const RANGS = [[5, 75, 62], [4, 65, 55], [3, 58, 50], [2, 52, 46], [1, 50, 44]];
  const pile = (ox, yb, s, pas, k) => {
    const P = [];
    let cy = yb - RANGS[0][2] * s * 0.86, prev = null;
    RANGS.forEach(([n, rx, ry], r) => {
      if (prev) cy -= (prev + ry) * 0.8 * s;
      for (let i = 0; i < n; i++) {
        const kk = k + r * 10 + i;
        P.push({ x: ox + ((i - (n - 1) / 2) * pas + (rnd(kk) - 0.5) * 16) * s, y: cy,
          rx: (rx + (rnd(kk + 5) - 0.5) * 12) * s, ry: (ry + (rnd(kk + 7) - 0.5) * 8) * s, r });
      }
      prev = ry;
    });
    return { svg: P.map((p, i) => galet(p.x, p.y, p.rx, p.ry, k + i * 3)).join('\n'), P };
  };

  // un quartier de bûche vu du bout : deux faces de fente, l'écorce, un cerne
  const quartier = (ax, ay, r, a0, a1, sw) => {
    const pt = (rr, a) => [f(ax + rr * Math.cos(a)), f(ay + rr * Math.sin(a))];
    const [p0, p1, q0, q1] = [pt(r, a0), pt(r, a1), pt(r * 0.6, a0), pt(r * 0.6, a1)];
    const [e0, e1] = [pt(r * 0.88, a0), pt(r * 0.88, a1)];
    return h.path(`M${f(ax)} ${f(ay)} L${p0[0]} ${p0[1]} A${f(r)} ${f(r)} 0 0 ${sw} ${p1[0]} ${p1[1]} Z`, W(A.arete)) + '\n' +
      h.path(`M${e0[0]} ${e0[1]} A${f(r * 0.88)} ${f(r * 0.88)} 0 0 ${sw} ${e1[0]} ${e1[1]}`, A.detail) + '\n' +
      h.path(`M${q0[0]} ${q0[1]} A${f(r * 0.6)} ${f(r * 0.6)} 0 0 ${sw} ${q1[0]} ${q1[1]}`, A.fin);
  };
  const feu = (ox, yG, s) => {
    const X = v => ox + v * s, Y = v => yG - v * s, o = [];
    // une flamme à trois pointes qui monte lécher le dessous de la dalle
    const Q = pts => pts.map(([cx, cy, x, y]) => ` Q${f(X(cx))} ${f(Y(cy))} ${f(X(x))} ${f(Y(y))}`).join('');
    o.push(h.path(`M${f(X(-105))} ${f(Y(80))}` + Q([[-112, 220, -72, 300], [-58, 225, -30, 200], [-18, 300, 6, 380], [26, 290, 40, 210], [56, 245, 78, 310], [112, 210, 105, 80]]) + ' Z', W(A.detail)));
    o.push(h.path(`M${f(X(-30))} ${f(Y(110))}` + Q([[-34, 215, 0, 275], [16, 210, 28, 110]]), A.fin));
    o.push(quartier(X(-118), Y(0), 115 * s, -Math.PI / 2, 0, 1), quartier(X(118), Y(0), 115 * s, -Math.PI / 2, -Math.PI, 0));
    o.push(quartier(X(0), Y(40), 105 * s, 1.25 * Math.PI, 1.75 * Math.PI, 1));
    return o.join('\n');
  };

  // le poêle coupé en travers du foyer ; toit = 'dalle' ou 'deux'
  const DEC = [
    [[[0, 300]], [[0, 170], [170, 300]], [[0, 300]]],
    [[[0, 140], [140, 300]], [[0, 300]], [[0, 160], [160, 300]]],
  ];
  const murets = (ox, yG, s, k) => {
    const X = v => ox + v * s, Y = v => yG - v * s, o = [];
    [-F / 2 - T, F / 2].forEach((x0, m) => {
      let z0 = 0;
      C.forEach((hc, c) => {
        DEC[m][c].forEach(([a, b], i) => o.push(bloc(X(x0 + a + 4), Y(z0 + hc), (b - a - 8) * s, (hc - 5) * s, k + m * 20 + c * 5 + i, A.hachure('pierre'))));
        z0 += hc;
      });
    });
    return o.join('\n');
  };
  const poeleCoupe = (ox, yG, s, k) => {
    const X = v => ox + v * s, Y = v => yG - v * s;
    const p = pile(ox, Y(HM + D), s, 172, k + 100);
    return { P: p.P, svg: [feu(ox, yG, s), murets(ox, yG, s, k),
      bloc(X(-F / 2 - T), Y(HM + D), (2 * T + F) * s, D * s, k + 60, A.hachure('pierre', 'contour')), p.svg].join('\n') };
  };

  const sRang1 = z => (z.h - 34) / 1000;

  // ── 1. le poêle coupé en travers du foyer ──────────────────────────────────────────
  let B = null;
  const vueCoupe = z => {
    const s = sRang1(z), yG = z.h - 12, ox = z.l / 2;
    const X = v => ox + v * s, Y = v => yG - v * s;
    const pc = poeleCoupe(ox, yG, s, 11);
    const top = pc.P[pc.P.length - 1];
    B = { s, yG, ox, X, Y, P: pc.P };
    return [sol(z, yG), pc.svg,
      h.cote(top.x - top.rx, top.y - top.ry - 7, top.x + top.rx, top.y - top.ry - 7, '100 à 150'),
      h.ligne(top.x - top.rx, top.y - top.ry - 7, top.x - top.rx, top.y, A.fin), h.ligne(top.x + top.rx, top.y - top.ry - 7, top.x + top.rx, top.y, A.fin),
    ].join('\n');
  };

  // ── 2. deux dalles en toit ────────────────────────────────────────────────────────
  const vueToit = z => {
    const s = sRang1(z), yG = z.h - 12, ox = z.l / 2;
    const X = v => ox + v * s, Y = v => yG - v * s, o = [sol(z, yG)];
    o.push(feu(ox, yG, s), murets(ox, yG, s, 41));
    // les deux dalles : le pied à plat sur le muret, les têtes l'une contre l'autre
    const dalle = sd => h.chemin([[X(sd * 300), Y(HM)], [X(sd * 190), Y(HM)], [X(0), Y(HM + 230)], [X(0), Y(HM + 350)]], A.hachure('pierre', 'contour'), true);
    o.push(dalle(-1), dalle(1));
    // le tas par-dessus : grosses pierres au pied des dalles, qui les calent, puis de plus petites
    const G = [[-365, 55, 68, 58], [365, 55, 68, 58], [-262, 132, 62, 52], [262, 132, 62, 52], [-150, 262, 58, 50], [150, 262, 58, 50],
      [-330, 212, 56, 48], [330, 212, 56, 48], [0, 395, 58, 50], [-225, 318, 54, 46], [225, 318, 54, 46], [-105, 400, 52, 45], [105, 400, 52, 45],
      [-170, 450, 50, 44], [170, 450, 50, 44], [0, 488, 50, 44]];
    G.forEach(([x, y, rx, ry], i) => o.push(galet(X(x), Y(HM + y), rx * s, ry * s, 70 + i * 3)));
    return o.join('\n');
  };

  // ── 3. la cabane pendant la chauffe ───────────────────────────────────────────────
  let K = null;
  const vueCabane = z => {
    const o = [];
    const yG = z.h - 10;
    const Li = 3000, E = 150, HW = 2000, HD = 1700, WD = 700;
    const s = Math.min((yG - 6) / 2560, (z.l - 78) / 4330);
    const X0 = 700 * s + 34 + E * s + Li * s / 2;
    const xLi = X0 - Li * s / 2, xRi = X0 + Li * s / 2, xLo = xLi - E * s, xRo = xRi + E * s;
    const Y = v => yG - v * s;
    const yW = Y(HW), yL = Y(1050);
    const bois = A.hachure('bois');
    o.push(sol(z, yG));
    // la porte ouverte vers le dehors : le battant, vu de face, derrière le plan de coupe
    const xp1 = xLo - WD * s, xp2 = xLo - 2, yp1 = Y(HD - 15), yp2 = Y(25);
    o.push(h.rect(xp1, yp1, xp2 - xp1, yp2 - yp1, W(A.arete)));
    for (const t of [0.25, 0.5, 0.75]) o.push(h.ligne(xp1 + (xp2 - xp1) * t, yp1, xp1 + (xp2 - xp1) * t, yp2, A.fin));
    o.push(h.rect(xp1 + 2, Y(HD - 170), xp2 - xp1 - 4, 90 * s, W(A.detail)), h.rect(xp1 + 2, Y(260), xp2 - xp1 - 4, 90 * s, W(A.detail)));
    o.push(h.ligne(xp2 - 4, Y(260), xp1 + 4, Y(HD - 260), A.detail));   // l'écharpe monte du côté des pentures
    o.push(h.rect(xp1 + 3, Y(1000), 3, 150 * s, A.plein));            // la poignée, sans loquet
    for (const yy of [Y(HD - 260), Y(350)]) o.push(h.rect(xp2 - 9, yy, 12, 3, A.plein));   // les pentures, côté mur
    // murs coupés : le linteau au-dessus de la porte, le mur d'en face percé de la trappe
    o.push(h.rect(xLo, yW, E * s, Y(HD) - yW, bois));
    o.push(h.rect(xRo - E * s, yW, E * s, 60 * s, bois), h.rect(xRo - E * s, Y(HW - 460), E * s, yG - Y(HW - 460), bois));
    // la trappe : volet de bois pendu par le haut, poussé vers le dehors
    const a = 0.6, yt = Y(HW - 60), sa = Math.sin(a), ca = Math.cos(a), lv = 420 * s, ev = 35 * s;
    o.push(h.chemin([[xRo, yt], [xRo + lv * sa, yt + lv * ca], [xRo + lv * sa + ev * ca, yt + lv * ca - ev * sa], [xRo + ev * ca, yt - ev * sa]], A.hachure('bois'), true));
    // plafond bas et toit
    const yP = yW - 45 * s;
    o.push(h.rect(xLo, yP, xRo - xLo, 45 * s, bois));
    const ridge = yP - 430 * s, m = (yP - ridge) / (X0 - xLo), deb = 330 * s, tR = 75 * s;
    const yEb = yP + m * deb;
    o.push(h.chemin([[xLo - deb, yEb], [X0, ridge], [xRo + deb, yEb], [xRo + deb, yEb - tR], [X0, ridge - tR], [xLo - deb, yEb - tR]], A.hachure('bois', 'contour'), true));
    // les deux bancs, du côté opposé au poêle
    const eb = 45 * s;
    o.push(h.rect(xRi - 560 * s, yL + eb, 40 * s, yG - yL - eb, W(A.arete)), h.rect(xRi - 1000 * s, Y(550) + eb, 40 * s, yG - Y(550) - eb, W(A.arete)));
    o.push(h.rect(xRi - 35 * s, yL + eb, 35 * s, 70 * s, W(A.arete)));
    o.push(h.rect(xRi - 560 * s, yL, 560 * s, eb, bois), h.rect(xRi - 1000 * s, Y(550), 440 * s, eb, bois));
    // la couche de fumée, du plafond jusqu'au niveau du banc du haut
    const nV = 4, pasV = (yL - yW - 14) / nV;
    for (let i = 0; i < nV; i++) o.push(h.path(vague(xLi + 5, xRi - 5, yW + 10 + i * pasV), A.fin));
    o.push(h.path(vague(xLi + 3, xRi - 3, yL - 4, 2.6, 22), A.detail));
    // le poêle, pendant la chauffe
    const ox = xLi + 950 * s;
    o.push(poeleCoupe(ox, yG, s, 11).svg);
    // la fumée monte du poêle, s'étale sous le plafond, sort par le haut de la porte et par la trappe
    o.push(fl(`M${f(ox + 12)} ${f(Y(990))} C${f(ox + 20)} ${f(Y(1300))} ${f(ox - 10)} ${f(Y(1600))} ${f(ox + 30)} ${f(Y(1880))}`, A.cache));
    const yS = Y(1610);
    o.push(fl(`M${f(xLi + 60)} ${f(yS)} L${f(xLo - 10)} ${f(yS)} Q${f(xLo - 34)} ${f(yS)} ${f(xLo - 36)} ${f(yS - 22)} L${f(xLo - deb - 12)} ${f(yEb - tR - 22)}`, A.cache));
    const yT = Y(HW - 330);
    o.push(fl(`M${f(xRi - 70)} ${f(Y(HW - 180))} Q${f(xRi - 20)} ${f(yT)} ${f(xRo + 22)} ${f(yT + 4)} Q${f(xRo + deb + 14)} ${f(yT + 2)} ${f(xRo + deb + 14)} ${f(yEb - tR - 20)}`, A.cache));
    // l'air du feu entre par le bas de la porte
    o.push(fl(`M${f(xLo - 22)} ${f(Y(230))} L${f(ox - (F / 2 + T) * s - 6)} ${f(Y(230))}`, A.detail));
    K = { s, yG, Y, xLo, xRo, xLi, xRi, xp1, xp2, yL, yW, yt, a, ox };
    return o.join('\n');
  };

  // ── 4. par la bouche du foyer, vidé ───────────────────────────────────────────────
  let V = null;
  const vueVidange = z => {
    const o = [], yG = z.h - 10;
    const s = Math.min((z.h - 30) / 1000, (z.l - 30) / 1440);
    const ox = 14 + (F / 2 + T) * s;
    const X = v => ox + v * s, Y = v => yG - v * s;
    o.push(sol(z, yG));
    // le poêle comme la première vue, mais la bouche vide : sol nu, ni flamme ni bûche
    o.push(murets(ox, yG, s, 23), bloc(X(-F / 2 - T), Y(HM + D), (2 * T + F) * s, D * s, 63, A.hachure('pierre', 'contour')));
    o.push(pile(ox, Y(HM + D), s, 172, 400).svg);
    // le contenant métallique
    const xc = 770, rT = 150, rB = 128, Hp = 300, ey = 32;
    o.push(h.path(`M${f(X(xc - rT))} ${f(Y(Hp))} L${f(X(xc - rB))} ${f(Y(ey * 0.7))} A${f(rB * s)} ${f(ey * 0.7 * s)} 0 0 0 ${f(X(xc + rB))} ${f(Y(ey * 0.7))} L${f(X(xc + rT))} ${f(Y(Hp))} Z`, W(A.arete)));
    for (const [yy, rr] of [[100, 135], [200, 142]]) o.push(h.path(`M${f(X(xc - rr))} ${f(Y(yy))} A${f(rr * s)} ${f(ey * s)} 0 0 0 ${f(X(xc + rr))} ${f(Y(yy))}`, A.fin));
    o.push(h.ellipse(X(xc), Y(Hp), rT * s, ey * s, W(A.arete)), h.ellipse(X(xc), Y(Hp), (rT - 12) * s, (ey - 7) * s, A.fin));
    [[-60, 4], [-20, -6], [25, 3], [62, -4], [-95, -2]].forEach(([dx, dy], i) => o.push(galet(X(xc + dx), Y(Hp) + dy * s, 16 * s, 9 * s, 500 + i, A.plein)));
    // le couvercle, debout contre le contenant, sa poignée dehors
    const lx = X(xc + rT + 44), ly = Y(152), ang = -0.24, Pl = [];
    for (let i = 0; i < 16; i++) {
      const t = i / 16 * 2 * Math.PI, ex = 22 * s * Math.cos(t), ez = 156 * s * Math.sin(t);
      Pl.push([lx + ex * Math.cos(ang) - ez * Math.sin(ang), ly + ex * Math.sin(ang) + ez * Math.cos(ang)]);
    }
    o.push(h.path(lisse(Pl), W(A.arete)));
    o.push(h.path(`M${f(lx + 18 * s)} ${f(ly - 30 * s)} C${f(lx + 52 * s)} ${f(ly - 36 * s)} ${f(lx + 56 * s)} ${f(ly + 18 * s)} ${f(lx + 22 * s)} ${f(ly + 24 * s)}`, A.arete));
    // la pelle qui sort de la bouche, chargée de charbon : la lame à plat sur le sol du foyer, le manche vers le dehors
    const ux = 1, uy = 0, nx = 0, ny = -1;
    const tx = X(-90), ty = Y(8);
    const P = (a, b) => [tx + (a * ux + b * nx) * s, ty + (a * uy + b * ny) * s];
    const vx = Math.cos(0.55), vy = -Math.sin(0.55), wx = vy, wy = -vx;
    const [bx, by] = P(250, 30), Lm = 420, em = 18;
    const M = (a, b) => [bx + (a * vx + b * wx) * s, by + (a * vy + b * wy) * s];
    o.push(h.chemin([M(0, -em), M(Lm, -em), M(Lm + 14, 0), M(Lm, em), M(0, em)], W(A.arete), true));   // le manche
    o.push(h.chemin([P(215, 8), M(45, -em - 5), M(45, em + 5), P(250, 52)], W(A.arete), true));        // la douille
    o.push(h.chemin([P(0, 0), P(240, 0), P(255, 58), P(0, 50)], W(A.contour), true));                   // la lame
    [[30, 14], [70, 16], [110, 15], [150, 16], [190, 14], [50, 34], [95, 36], [140, 35], [180, 32], [120, 52]].forEach(([a, b], i) => { const [x, y] = P(a, b); o.push(galet(x, y, 18 * s, 11 * s, 520 + i, A.plein)); });
    // le trajet : de la bouche du foyer jusqu'au contenant
    o.push(fl(`M${f(X(F / 2 + T + 20))} ${f(Y(330))} C${f(X(F / 2 + T + 90))} ${f(Y(520))} ${f(X(xc - 200))} ${f(Y(520))} ${f(X(xc - 70))} ${f(Y(Hp + 70))}`, A.cache));
    V = { s, X, Y, xc, P };
    return o.join('\n');
  };

  return {
    ref: '37-05',
    titre: 'Le sauna à fumée : le poêle de pierres sèches',
    desc: 'Le poêle du sauna à fumée coupé en travers de son foyer étroit : deux murets de grosses pierres sèches, une dalle plate posée à plat sur toute leur épaisseur, le tas de pierres de sauna par-dessus, grosses en bas et petites en haut, de l’air entre toutes, et le feu de bûches refendues dessous. À côté, à la même échelle, la variante à deux dalles appuyées en toit. En bas, la cabane en coupe pendant la chauffe, porte ouverte vers le dehors et trappe haute ouverte en face : la fumée monte, s’étale sous le plafond bas jusqu’au niveau du banc du haut, sort par le haut de la porte et par la trappe, et l’air du feu entre par le bas de la porte. Enfin le poêle vu par la bouche du foyer, vide, charbon et cendre sortis à la pelle dans un contenant métallique à couvercle avant de fermer. L’encadré danger dit pourquoi : ce sont les braises laissées au foyer qui font le monoxyde.',
    format: 'pleine',
    disposition: [['coupe', 'toit'], ['cabane', 'vidange']],
    hauteurs: [1.25, 1],
    largeurs: [[3, 2], [3.4, 1.6]],
    vues: {
      coupe: {
        titre: 'Le poêle, coupé en travers du foyer',
        dessin: vueCoupe,
        renvois: z => {
          vueCoupe(z); const { X, Y, P } = B;
          const r3 = P.filter(p => p.r === 3), r0 = P.filter(p => p.r === 0);
          const d = r3[1], g1 = r0[3], g2 = r0[4];
          return [
            { n: 1, rond: [z.l - 16, Y(900)], cible: [d.x + d.rx * 0.4, d.y - d.ry * 0.3], texte: 'petites pierres en haut' },
            { n: 2, rond: [z.l - 16, Y(640)], cible: [(g1.x + g1.rx + g2.x - g2.rx) / 2, g1.y - 2], texte: 'grosses en bas, de l’air entre toutes' },
            { n: 3, rond: [16, Y(560)], cible: [X(-F / 2 - T + 70), Y(HM + D / 2)], texte: 'dalle plate, épaisse et dense' },
            { n: 4, rond: [z.l - 16, Y(380)], cible: [X(F / 2 + T - 12), Y(HM) - 1], texte: 'la dalle porte sur tout le muret' },
            { n: 5, rond: [16, Y(230)], cible: [X(-F / 2 - T + 90), Y(215)], texte: 'muret de grosses pierres sèches' },
            { n: 6, rond: [z.l - 16, Y(110)], cible: [X(95), Y(50)], texte: 'foyer étroit : les bûches refendues' },
          ];
        },
      },
      toit: {
        titre: 'Sans grande dalle',
        dessin: vueToit,
        renvois: z => {
          const s = sRang1(z), yG = z.h - 12, ox = z.l / 2;
          return [{ n: 7, rond: [14, yG - 880 * s], cible: [ox - 150 * s, yG - (HM + 110) * s], texte: 'ou deux dalles appuyées en toit' }];
        },
      },
      cabane: {
        titre: 'Pendant la chauffe, en coupe',
        dessin: vueCabane,
        renvois: z => {
          vueCabane(z); const { Y, xRo, xRi, xp1, xp2, yL, yt, a, s } = K;
          return [
            { n: 8, rond: [xp1 - 22, Y(1050)], cible: [(xp1 + xp2) / 2 - 6, Y(1050)], texte: 'porte ouverte : fumée en haut, air dessous' },
            { n: 9, rond: [z.l - 14, Y(1400)], cible: [xRo + 150 * s * Math.sin(a), yt + 150 * s * Math.cos(a)], texte: 'trappe haute, en face de la porte' },
            { n: 10, rond: [z.l - 14, Y(1060)], cible: [xRi - 120 * s, yL - 4], texte: 'fumée : pas plus bas que le banc' },
          ];
        },
      },
      vidange: {
        titre: 'Avant de fermer : le foyer vidé',
        dessin: vueVidange,
        renvois: z => {
          vueVidange(z); const { X, Y, xc, P } = V;
          const [cx, cy] = P(115, 45);
          return [
            { n: 11, rond: [X(xc - 120), Y(820)], cible: [cx, cy], texte: 'charbon et cendre, à la pelle' },
            { n: 12, rond: [z.l - 12, Y(560)], cible: [X(xc + 20), Y(190)], texte: 'contenant métallique à couvercle' },
          ];
        },
      },
    },
    danger: 'Des braises laissées au foyer font du monoxyde, sans odeur ni couleur. Trappe et porte fermées dessus, il monte très haut et reste ; l’eau jetée sur les pierres ne le chasse pas, elle ranime les braises. Au moins une heure tout ouvert, le charbon et la cendre dehors, et seulement ensuite on ferme.',
  };
};
