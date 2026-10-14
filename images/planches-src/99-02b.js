// Planche 99-02b — Le séchage du foin : la tente canadienne (chapitre 99, §5-G, étape 58, et la
// variante d'urgence « Le séchage du foin sans bâtiment »).
// Le chapitre dit : deux chevalets en A reliés par une perche faîtière, des perches sur les côtés ;
// le foin étendu dessus sèche là où le sol mouillé l'aurait fait pourrir ; c'est long à monter et
// ça demande des perches. La source enregistrée (sources/99-foin-a-la-main-et-feu-de-foin.md, FAO)
// dit la même chose : « two A-frames with a ridge pole and one or more poles on the sides ». Le
// dessin met une perche de côté par pente, liée aux pattes des deux chevalets, et une traverse à
// chaque A (c'est ce qui en fait un A) ; les croisements sont liés, sinon rien ne tient.
// Aucune cote : le chapitre ne donne ni longueur, ni hauteur, ni écart.
//
// Repère : unités de dessin ; y vers le haut, sol en y = 0. L'élévation de bout (en coupe) et
// l'élévation de côté ont la même échelle K et le même sol : faîtière, perches de côté et bas du
// foin tombent aux mêmes hauteurs. La charpente de trois quarts est à son échelle.
module.exports = (h) => {
  const A = h.a;
  const NOIR = '#1A1A1A';
  const f1 = v => Math.round(v * 10) / 10;
  const poly = (pts, ferme) => pts.map((p, i) => `${i ? 'L' : 'M'}${f1(p[0])} ${f1(p[1])}`).join(' ') + (ferme ? ' Z' : '');
  const blanc = ep => `fill="#FFFFFF" stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="round"`;
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const mul = (a, k) => [a[0] * k, a[1] * k];
  const uni = a => { const l = Math.hypot(a[0], a[1]) || 1; return [a[0] / l, a[1] / l]; };

  // ── la charpente ──
  const W = 50, HC = 94, EXT = 15;        // demi-écart des pieds, croisement des pattes, bout qui dépasse
  const DL0 = 3.4, DL1 = 2.6;             // patte : gros bout, petit bout
  const RF = 2.7, RS = 2.4, DX = 2.4;     // rayon faîtière, rayon perche de côté, traverse
  const HS = 36, HX = 24;                 // hauteur des perches de côté, de la traverse
  const LH = 80, OR = 12;                 // demi-distance des chevalets, débord de la faîtière
  const BETA = Math.atan(W / HC);
  const YR = HC + (RF + DL1 / 2) / Math.sin(BETA);          // centre de la faîtière, dans la fourche
  const xPatte = y => W * (1 - y / HC);                      // axe de la patte, côté droit
  const XS = xPatte(HS) + (DL0 / 2 + RS) / Math.cos(BETA);    // centre de la perche de côté
  const XX = xPatte(HX) + 3.5;                                // bout de la traverse
  // ── le foin ──
  const T = 15, B = 1.5, G = 14, M = 5;
  const K = 1.75;                         // bout et côté

  // une perche vue de côté, en coordonnées d'écran
  // La charte : les perches sont l'objet, leur contour pèse (2,4) ; ce qui est derrière (la pente du
  // fond, le chevalet derrière le plan de coupe) recule en gris loin (fond = '#E6E6E6').
  const perche = (p0, p1, d0, d1, ep = 2.4, fond = '#FFFFFF') => {
    const u = uni(sub(p1, p0)), n = [-u[1], u[0]];
    const a = add(p0, mul(n, d0 / 2)), b = add(p1, mul(n, d1 / 2)), c = add(p1, mul(n, -d1 / 2)), d = add(p0, mul(n, -d0 / 2));
    const pt = q => `${f1(q[0])} ${f1(q[1])}`;
    const r1 = d1 / 2, r0 = d0 / 2;
    const S = `M${pt(a)} L${pt(b)} A${f1(r1)} ${f1(r1 * 0.55)} 0 0 0 ${pt(c)} L${pt(d)} A${f1(r0)} ${f1(r0 * 0.55)} 0 0 0 ${pt(a)} Z`;
    const L = Math.hypot(...sub(p1, p0));
    const ec = (t0, t1, o) => h.path(poly([add(add(p0, mul(u, L * t0)), mul(n, o)), add(add(p0, mul(u, L * t1)), mul(n, o * 0.9))]), A.detail);
    // le rond du bout : on écrase l'arc dans le sens de la perche
    const ax = Math.atan2(n[1], n[0]) * 180 / Math.PI;
    const S2 = S.replace(/A(\S+) (\S+) 0 0 0/g, (m, rx, ry) => `A${rx} ${ry} ${f1(ax)} 0 0`);
    return [h.path(S2, blanc(ep).replace('fill="#FFFFFF"', `fill="${fond}"`)), ec(0.12, 0.34, d0 * 0.18), ec(0.55, 0.8, -d0 * 0.14)].join('\n');
  };
  // un bout de perche vu en bout (coupé ou scié)
  // (le bout d'une perche : un rond, un cerne, le cœur)
  const bout = (x, y, r) => [h.cercle(x, y, r, blanc(1.4)), h.cercle(x, y, r * 0.55, A.fin), h.cercle(x, y, Math.max(0.8, r * 0.14), A.plein)].join('\n');
  // un lien : n tours serrés, centré en (x, y), largeur l, hauteur t, tourné de ang degrés
  const lien = (x, y, l, t, n = 3, ang = 0) => {
    const out = [], hc = t / n, bo = hc * 0.35, r = hc / 2;
    const c = Math.cos(ang * Math.PI / 180), s = Math.sin(ang * Math.PI / 180);
    const q = (u, v) => { const dx = u - x, dy = v - y; return `${f1(x + dx * c - dy * s)} ${f1(y + dx * s + dy * c)}`; };
    for (let i = 0; i < n; i++) {
      const y0 = y - t / 2 + hc * i, y1 = y0 + hc;
      out.push(h.path(`M${q(x - l / 2, y0)} Q${q(x, y0 + 2 * bo)} ${q(x + l / 2, y0)} A${f1(r)} ${f1(r)} 0 0 1 ${q(x + l / 2, y1)} Q${q(x, y1 + 2 * bo)} ${q(x - l / 2, y1)} A${f1(r)} ${f1(r)} 0 0 1 ${q(x - l / 2, y0)} Z`, blanc(0.7)));
    }
    return out.join('\n');
  };
  const sol = (z, y, x0 = 6, x1 = z.l - 6) => [
    h.rect(x0, y, x1 - x0, 7, h.a.hachure('terre', 'aucun')),
    h.ligne(x0, y, x1, y, A.arete),
  ].join('\n');
  const ySol = z => z.h - 20;

  // ── la pente de foin, en monde (côté gauche ; le droit en miroir) ──
  // ligne d'appui : tangente à la perche de côté et à la faîtière, du côté de l'extérieur
  const CS = [-XS, HS], CR = [0, YR];
  const U = uni(sub(CR, CS)), NO = [-U[1], U[0]];
  const base = add(CS, mul(NO, RS));
  const sLip = (G - base[1]) / U[1], sTop = Math.hypot(CR[0] - CS[0], CR[1] - CS[1]);
  const LS = sTop - sLip, PAS = LS / M, REC = PAS * 0.55;
  const Sw = (s, o, sgn = -1) => { const p = add(add(base, mul(U, sLip + s)), mul(NO, o)); return [sgn < 0 ? p[0] : -p[0], p[1]]; };
  const LIPS = [];                        // hauteur du bas de chaque couche, vue de côté
  for (let j = 0; j < M; j++) LIPS.push(Sw(j * PAS, T + B)[1]);
  const BAS = Math.min(Sw(PAS * 0.02, T * 0.2)[1], Sw(-PAS * 0.06, T * 0.62)[1], LIPS[0]);
  const HAUT_BANDE = Sw(LS, T - B)[1];
  const CAP = YR + RF + T;                // dessus de la coiffe

  // ── de bout, en coupe entre les chevalets ──
  const repB = z => ([x, y]) => [z.l / 2 + x * K, ySol(z) - y * K];
  const deBout = z => {
    const P = repB(z);
    const out = [sol(z, ySol(z))];
    // le chevalet du fond, derrière le plan de coupe
    for (const sgn of [-1, 1]) {
      const pied = [sgn * W, 0], cr = [-sgn * DL1 * 0.4, HC];
      const dir = uni(sub(cr, pied));
      out.push(perche(P(pied), P(add(cr, mul(dir, EXT))), DL0 * K, DL1 * K, 1.4, '#E6E6E6'));
    }
    out.push(perche(P([-XX, HX]), P([XX, HX]), DX * K, DX * K, 1.4, '#E6E6E6'));
    for (const sgn of [-1, 1]) {
      const [lx, ly] = P([sgn * xPatte(HX), HX]);
      out.push(lien(lx, ly, (DX + 1.2) * K, (DL0 + 1) * K, 3, sgn * (90 - BETA * 180 / Math.PI)));
    }
    const [fx, fy] = P([0, HC]);
    out.push(lien(fx, fy - 1, (2 * DL1 + 1) * K, 3.6 * K, 3));
    // le foin, les deux pentes
    const tops = [];
    for (const sgn of [-1, 1]) {
      const S = (s, o) => P(Sw(s, o, sgn));
      const ext = [];
      for (let j = M - 1; j >= 0; j--) { ext.push(S((j + 1) * PAS, T - B)); ext.push(S(j * PAS, T + B)); }
      const contour = [S(PAS * 0.12, 0), S(LS, 0), ...ext, S(-PAS * 0.06, T * 0.62), S(PAS * 0.02, T * 0.2)];
      out.push(h.path(poly(contour, true), A.blanc), h.path(poly(contour, true), h.a.hachure('paille', 'arete')));
      for (let j = 1; j < M; j++) out.push(h.path(poly([S(j * PAS, T - B), S(j * PAS + REC, 0.4)]), A.detail));
      tops.push({ ext: S(LS, T - B), int: S(LS, 0) });
    }
    const [g, d] = tops;
    const coiffe = [g.int, P([-RF * 0.9, YR + RF * 0.6]), P([0, YR + RF + 0.3]), P([RF * 0.9, YR + RF * 0.6]), d.int, d.ext,
      P([7, CAP - 1.4]), P([0, CAP]), P([-7, CAP - 1.4]), g.ext];
    out.push(h.path(poly(coiffe, true), A.blanc), h.path(poly(coiffe, true), h.a.hachure('paille', 'arete')));
    out.push(h.path(poly([g.ext, P([-4, YR + RF + 2])]), A.detail), h.path(poly([d.ext, P([4, YR + RF + 2])]), A.detail));
    // faîtière et perches de côté : coupées
    const [rx, ry] = P([0, YR]);
    out.push(bout(rx, ry, RF * K));
    for (const sgn of [-1, 1]) { const [sx, sy] = P([sgn * XS, HS]); out.push(bout(sx, sy, RS * K)); }
    // l'air : entre sous le bord du foin, monte dans le creux
    for (const sgn of [-1, 1]) {
      const a = P([sgn * (W + 11), 5]), b = P([sgn * (W - 4), 5]), c = P([sgn * 16, 12]), e = P([sgn * 10, 50]);
      out.push(h.fleche(`M${f1(a[0])} ${f1(a[1])} C${f1(b[0])} ${f1(b[1])} ${f1(c[0])} ${f1(c[1])} ${f1(e[0])} ${f1(e[1])}`, A.cache));
    }
    // La charte : le point à contrôler, le jour entre le bas du foin et le sol, par où l'air entre
    const jour = P([-54, 7]);
    out.push(h.controle(jour[0], jour[1], 13));
    return out.join('\n');
  };

  // ── de côté : le foin posé sur la moitié gauche, la charpente nue à droite ──
  const XC = 12;                          // où s'arrête le foin déjà posé
  const repC = z => ([x, y]) => [z.l / 2 + x * K, ySol(z) - y * K];
  const deCote = z => {
    const P = repC(z);
    const out = [sol(z, ySol(z))];
    const x0 = -LH - OR, x1 = LH + OR;
    // faîtière, puis les chevalets (la patte cache l'autre), la perche de côté devant
    out.push(perche(P([x0, YR]), P([x1, YR]), 2 * RF * K, 2 * RF * K * 0.85));
    for (const X of [-LH, LH]) {
      out.push(perche(P([X, 0]), P([X, HC + EXT * Math.cos(BETA)]), DL0 * K, DL1 * K));
      const [cx, cy] = P([X, HX]);
      out.push(bout(cx, cy, DX / 2 * K + 0.6));
      const [fx, fy] = P([X, YR]);
      out.push(lien(fx, fy, (DL1 + 1.4) * K, (2 * RF + 1.6) * K, 3));
    }
    out.push(perche(P([x0, HS]), P([x1, HS]), 2 * RS * K, 2 * RS * K * 0.85));
    for (const X of [-LH, LH]) { const [lx, ly] = P([X, HS]); out.push(lien(lx, ly, (DL0 + 1.2) * K, (2 * RS + 1.4) * K, 3)); }
    // le foin : une couche par rangée, de bas en haut ; chacune recouvre le haut de la précédente.
    // Le bout droit de chaque rangée s'arrête un peu plus court ou plus long : c'est là qu'on en est.
    const bord = (yb, xa, xb, seed) => {
      const pts = [];
      const n = Math.max(4, Math.round((xb - xa) / 7));
      for (let i = 0; i <= n; i++) {
        const x = xa + ((xb - xa) * i) / n;
        pts.push([x, yb - (i % 2 ? 0.9 : 0) - 0.5 * Math.sin(i * 1.7 + seed)]);
      }
      return pts;
    };
    const HAUTS = [...LIPS.slice(1), HAUT_BANDE];
    for (let j = 0; j < M; j++) {
      const yb = j === 0 ? BAS : LIPS[j];
      const yt = j === M - 1 ? HAUT_BANDE + 1 : HAUTS[j] + 3;
      const xe = XC + [6, -3, 4, -5, 2][j];
      const bas = bord(yb, x0 - 1.5, xe, j);
      const forme = [...bas.map(P), P([xe + 2.5, (yb + yt) / 2]), P([xe, yt]), P([x0 - 1.5, yt])];
      out.push(h.path(poly(forme, true), A.blanc), h.path(poly(forme, true), h.a.hachure('paille', 'arete')));
    }
    // la coiffe par-dessus la faîtière
    const xe = XC + 1;
    const bc = bord(HAUT_BANDE, x0 - 3, xe, 7);
    const coiffe = [...bc.map(P), P([xe + 2, (HAUT_BANDE + CAP) / 2]), P([xe - 2, CAP - 0.6]), P([x0 + 2, CAP - 0.6]), P([x0 - 3, CAP - 3])];
    out.push(h.path(poly(coiffe, true), A.blanc), h.path(poly(coiffe, true), h.a.hachure('paille', 'arete')));
    return out.join('\n');
  };

  // ── la charpente nue, de trois quarts ──
  const AZ = 38 * Math.PI / 180, EL = 17 * Math.PI / 180;
  const CA = Math.cos(AZ), SA = Math.sin(AZ), CE = Math.cos(EL), SE = Math.sin(EL);
  const proj = ([X, Y, Z]) => { const x1 = X * CA + Y * SA, d = -X * SA + Y * CA; return [x1, Z * CE - d * SE]; };
  // l'étendue projetée de la charpente, pour la centrer et la faire remplir sa vue
  const COINS = [];
  for (const sx of [-1, 1]) for (const sy of [-1, 1]) COINS.push([sx * LH, sy * W, 0], [sx * (LH + OR), sy * XS, HS], [sx * (LH + OR), 0, YR], [sx * LH, sy * 4, HC + EXT]);
  const BX = COINS.map(p => proj(p)[0]), BY = COINS.map(p => proj(p)[1]);
  const X0 = Math.min(...BX), X1 = Math.max(...BX), Y0 = Math.min(...BY), Y1 = Math.max(...BY);
  const K3 = z => Math.min((z.l - 60) / (X1 - X0), (z.h - 30) / (Y1 - Y0));
  const rep3 = z => { const k = K3(z); return p => { const [x, y] = proj(p); return [z.l / 2 + (x - (X0 + X1) / 2) * k, z.h / 2 + 4 - (y - (Y0 + Y1) / 2) * k]; }; };
  const charpente = z => {
    const k = K3(z), P = rep3(z);
    const out = [];
    const d3 = (a, b) => [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
    const n3 = a => { const l = Math.hypot(...a); return a.map(v => v / l); };
    const plus = (a, b, t) => [a[0] + b[0] * t, a[1] + b[1] * t, a[2] + b[2] * t];
    // une patte : pied (X, sy·W, 0) → croisement (X ± DL0/2, 0, HC), prolongée de EXT
    const patte = (X, sy) => {
      const dx = sy > 0 ? -DL0 * 0.5 : DL0 * 0.5;
      const pied = [X + dx, sy * W, 0], cr = [X + dx, 0, HC];
      const dir = n3(d3(pied, cr));
      return { pied, cr, tip: plus(cr, dir, EXT) };
    };
    const LOIN = '#E6E6E6';
    const seg = (a, b, d0, d1, fond) => perche(P(a), P(b), d0 * k, d1 * k, 2.4, fond);
    const lowerSeg = (p, fond) => seg(p.pied, p.cr, DL0, (DL0 + DL1) / 2, fond);
    const tipSeg = (p, fond) => seg(plus(p.cr, n3(d3(p.pied, p.cr)), -1.5), p.tip, (DL0 + DL1) / 2, DL1, fond);
    const angDe = (a, b) => { const [ax, ay] = P(a), [bx, by] = P(b); return Math.atan2(by - ay, bx - ax) * 180 / Math.PI; };
    const fr = { R: { X: LH }, L: { X: -LH } };
    for (const f of Object.values(fr)) { f.near = patte(f.X, 1); f.far = patte(f.X, -1); f.xb = f.X + (f.X > 0 ? DL0 : -DL0); }
    const x0 = -LH - OR, x1 = LH + OR;
    // pieds au sol : un petit trait
    for (const f of Object.values(fr)) for (const p of [f.near, f.far]) { const [px, py] = P(p.pied); out.push(h.ligne(px - 7, py + 1, px + 7, py + 1, A.fin)); }
    out.push(seg([x0, -XS, HS], [x1 + 5, -XS, HS], 2 * RS, 2 * RS * 0.85, LOIN));       // perche de côté du fond, qui dépasse la patte arrière de droite
    out.push(seg([fr.R.xb, -XX, HX], [fr.R.xb, XX, HX], DX, DX, LOIN));                  // traverse, chevalet du fond
    out.push(lowerSeg(fr.R.far, LOIN), tipSeg(fr.R.near, LOIN), lowerSeg(fr.L.far, LOIN), tipSeg(fr.L.near, LOIN));
    // la perche de côté du fond, liée aux deux pattes arrière : trois tours, comme devant
    for (const f of Object.values(fr)) {
      const [sx, sy] = P([f.far.pied[0], -XS, HS]);
      out.push(lien(sx, sy, (2 * RS + 1.2) * k, (DL0 + 1.2) * k, 3, angDe(f.far.pied, f.far.cr) + 90));
    }
    out.push(seg([x0, 0, YR], [x1, 0, YR], 2 * RF, 2 * RF * 0.85));                      // faîtière
    out.push(lowerSeg(fr.R.near), tipSeg(fr.R.far), lowerSeg(fr.L.near), tipSeg(fr.L.far));
    // la traverse du chevalet de droite (du fond), liée à ses deux pattes
    for (const sy of [1, -1]) {
      const p = sy > 0 ? fr.R.near : fr.R.far;
      const [lx, ly] = P([fr.R.xb, sy * xPatte(HX), HX]);
      out.push(lien(lx, ly, (DX + 1.2) * k, (DL0 + 1) * k, 3, angDe(p.pied, p.cr) + 90));
    }
    out.push(seg([fr.L.xb, -XX, HX], [fr.L.xb, XX, HX], DX, DX));                        // traverse, chevalet de devant
    out.push(seg([x0, XS, HS], [x1, XS, HS], 2 * RS, 2 * RS * 0.85));                    // perche de côté de devant
    // les liens : fourches, perche de côté devant, traverse devant
    for (const f of Object.values(fr)) {
      const [cx, cy] = P([f.X, 0, YR - 0.5]);
      out.push(lien(cx, cy, (2 * DL1 + 2 * RF) * k * 0.8, 3.4 * k, 3, angDe([x0, 0, YR], [x1, 0, YR]) + 90));
      const [sx, sy] = P([f.near.pied[0], XS, HS]);
      out.push(lien(sx, sy, (2 * RS + 1.2) * k, (DL0 + 1.2) * k, 3, angDe(f.near.pied, f.near.cr) + 90));
    }
    for (const sy of [1, -1]) {
      const p = sy > 0 ? fr.L.near : fr.L.far;
      const [lx, ly] = P([fr.L.xb, sy * xPatte(HX), HX]);
      out.push(lien(lx, ly, (DX + 1.2) * k, (DL0 + 1) * k, 3, angDe(p.pied, p.cr) + 90));
    }
    return out.join('\n');
  };

  return {
    ref: '99-02b',
    titre: 'Le séchage du foin : la tente canadienne',
    desc: 'La charpente nue, de trois quarts : deux chevalets en A, un à chaque bout, faits de deux perches croisées et liées en haut, avec une traverse liée en bas ; la perche faîtière posée d’un chevalet à l’autre dans la fourche que font les deux perches au-dessus du croisement ; une perche de côté sur chaque pente, liée à l’extérieur des pattes des deux chevalets. De bout, en coupe entre les deux chevalets : le foin étendu en couches sur la faîtière et les perches de côté, chaque couche recouvrant le haut de celle du dessous, une coiffe par-dessus la faîtière ; il s’arrête au-dessus du sol ; dessous, un creux où l’air entre sous le bord du foin et monte. De côté, aux mêmes hauteurs : le foin posé sur la moitié gauche, rangée par rangée, et la charpente encore nue à droite.',
    format: 'pleine',
    disposition: [['charpente'], ['bout', 'cote']],
    hauteurs: [1.4, 1],
    largeurs: [[1], [2, 3]],
    vues: {
      charpente: {
        titre: 'La charpente, avant le foin',
        dessin: charpente,
        renvois: z => {
          const P = rep3(z);
          const pa = P([-LH - DL0 * 0.5, W * 0.55, HC * 0.45]);
          const fa = P([-LH * 0.2, 0, YR]);
          const cs = P([LH * 0.45, XS, HS]);
          return [
            { n: 1, rond: [pa[0] - 48, pa[1] - 10], cible: pa, texte: 'chevalet en A, un à chaque bout' },
            { n: 2, rond: [fa[0] - 10, fa[1] - 36], cible: fa, texte: 'perche faîtière dans la fourche' },
            { n: 3, rond: [cs[0] + 30, cs[1] + 30], cible: cs, texte: 'perche de côté, liée aux pattes' },
          ];
        },
      },
      bout: {
        titre: 'De bout, en coupe, chargée',
        dessin: deBout,
        renvois: z => {
          const P = repB(z);
          const air = P([-12, 34]);
          const pr = P([2, 66]);
          return [{ n: 5, rond: pr, cible: air, texte: 'foin au-dessus du sol : l’air entre dessous' }];
        },
      },
      cote: {
        titre: 'De côté, en train de charger',
        dessin: deCote,
        renvois: z => {
          const P = repC(z);
          const c = P([-40, (LIPS[2] + LIPS[3]) / 2]);
          return [{ n: 4, rond: [c[0] + 20, c[1] - 62], cible: c, texte: 'foin étendu en couches sur les perches' }];
        },
      },
    },
  };
};
