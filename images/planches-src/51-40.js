// Planche 51-40 — Le porc-épic : le retourner, l'ouvrir par le ventre, ôter un piquant
// (chapitre 51 : § 3 « Pourquoi ça marche » pour les zones sans piquants, § 4 étapes 9, 11, 16
// pour retourner et ouvrir, § 9 « Fabriquer la pince » étapes 4 à 6 pour le piquant).
// Aucune cote : le chapitre ne donne aucune mesure en mm de ce qui se construit (la pince est
// « grosse comme le pouce, fendue à la longueur de la main »). Le seul chiffre, 0,6 cm, est dans
// la légende, pas sur le dessin : c'est une chose à reconnaître, pas à construire.
module.exports = (h) => {
  const A = h.a;
  const BLANC = A.blanc.match(/fill="([^"]+)"/)[1];
  const blanc = (a) => a.replace('fill="none"', `fill="${BLANC}"`);
  const f = (p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const mul = (a, k) => [a[0] * k, a[1] * k];
  const uni = (a) => { const n = Math.hypot(a[0], a[1]) || 1; return [a[0] / n, a[1] / n]; };
  const tourne = (a, deg) => { const r = deg * Math.PI / 180, c = Math.cos(r), s = Math.sin(r); return [a[0] * c - a[1] * s, a[0] * s + a[1] * c]; };
  const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

  // Catmull-Rom → Bézier : une courbe lisse par des points
  const lisse = (P, ferme = false) => {
    const n = P.length, g = (i) => (ferme ? P[(i + n) % n] : P[Math.max(0, Math.min(n - 1, i))]);
    let d = `M${f(P[0])}`;
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      d += ` C${f([p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6])} ${f([p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6])} ${f(p2)}`;
    }
    return d + (ferme ? ' Z' : '');
  };
  // hasard reproductible
  const hasard = (graine) => { let a = graine >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };
  // interpolation d'une ligne décrite par x décroissant
  const surX = (L, x) => {
    for (let i = 0; i < L.length - 1; i++) {
      const [a, b] = [L[i], L[i + 1]];
      if (x <= a[0] && x >= b[0]) return a[1] + (b[1] - a[1]) * (a[0] - x) / (a[0] - b[0]);
    }
    return x > L[0][0] ? L[0][1] : L[L.length - 1][1];
  };

  // ─── Les piquants et le jarre ─────────────────────────────────────────────────────────────
  // Un piquant : une tige pâle, effilée, la pointe noire (c'est ce qui se voit sur la bête) ;
  // le jarre : de longs poils fins qui dépassent les piquants sur le bas du dos et la croupe.
  const piquant = (P, B, d, L, ep = 1) => {
    const n = [-d[1], d[0]];
    const T = add(B, mul(d, L)), M = add(B, mul(d, L * 0.7));
    const w = 0.75 * ep;
    return [
      h.path(`M${f(P(B))} L${f(P(M))}`, A.fin),
      h.chemin([P(add(M, mul(n, w))), P(T), P(add(M, mul(n, -w)))], A.plein, true),
    ].join('\n');
  };
  const poil = (P, B, d, L, courbe) => {
    const n = [-d[1], d[0]];
    const M = add(add(B, mul(d, L * 0.5)), mul(n, courbe)), T = add(add(B, mul(d, L)), mul(n, courbe * 0.4));
    return h.path(`M${f(P(B))} Q${f(P(M))} ${f(P(T))}`, A.fin);
  };

  // un membre court et épais (a → b), puis la paume ou la plante, ses doigts et ses griffes
  const pattePlante = (Q, s, r, a, b, w, plante, doigts) => {
    const d = uni([b[0] - a[0], b[1] - a[1]]), n = [-d[1], d[0]];
    const bras = [add(a, mul(n, w)), add(b, mul(n, w * 0.8)), add(b, mul(n, -w * 0.8)), add(a, mul(n, -w))];
    const o = [h.path(lisse(bras.map(Q), true), blanc(A.arete))];
    const c = add(b, mul(d, plante[0] * 0.5));
    // la plante, nue et grenue
    const pl = [];
    for (let i = 0; i < 12; i++) { const t = i / 12 * Math.PI * 2; pl.push(add(c, add(mul(d, plante[0] * 0.55 * Math.cos(t)), mul(n, plante[1] * 0.5 * Math.sin(t))))); }
    o.push(h.path(lisse(pl.map(Q), true), blanc(A.arete)));
    for (let i = 0; i < 12; i++) {
      const t = r() * Math.PI * 2, rr = Math.sqrt(r()) * 0.75;
      o.push(h.cercle(...Q(add(c, add(mul(d, plante[0] * 0.5 * rr * Math.cos(t)), mul(n, plante[1] * 0.45 * rr * Math.sin(t))))), 0.8 * s, A.fin));
    }
    // les doigts, courts, serrés au bout de la plante, chacun avec sa griffe noire, longue et courbe
    doigts.forEach((t) => {
      const dd = tourne(d, t), nn = [-dd[1], dd[0]];
      const base = add(c, mul(dd, plante[0] * 0.44)), bout = add(base, mul(dd, 7));
      o.push(h.path(lisse([add(base, mul(nn, 3)), add(bout, mul(nn, 2.6)), add(bout, mul(dd, 2.4)), add(bout, mul(nn, -2.6)), add(base, mul(nn, -3))].map(Q), true), blanc(A.detail)));
      const g0 = add(bout, mul(dd, 1.8)), dg = tourne(dd, 22);
      const tip = add(add(g0, mul(dd, 7)), mul(dg, 5));
      o.push(h.path(lisse([add(g0, mul(nn, 1.6)), add(add(g0, mul(dd, 6)), mul(nn, 1.2)), tip, add(add(g0, mul(dd, 5)), mul(nn, -0.6)), add(g0, mul(nn, -1.6))].map(Q), true), A.plein));
    });
    return o.join('\n');
  };

  // ─── Le porc-épic de profil, la tête à droite, le sol en y = 0 ───────────────────────────
  // Le vrai porc-épic d'Amérique : trapu, le dos qui monte vers la croupe (le point haut est
  // sur les hanches, pas sur les épaules), la tête petite, ronde et portée bas, le museau court
  // et noir, l'œil petit, l'oreille presque cachée dans le poil, les pattes très courtes, le
  // ventre à quelques centimètres du sol, les pieds à plat avec de longues griffes courbes, la
  // queue courte et épaisse en massue. Unités : environ 350 du nez au bout de la queue.
  // La peau du dos (sous le pelage), du crâne vers le bout de la queue
  const PEAU = [[104, -78], [82, -92], [50, -105], [10, -116], [-30, -122], [-70, -118], [-104, -102], [-126, -84], [-140, -66], [-156, -56], [-172, -48], [-184, -40], [-188, -32]];
  // la limite basse des piquants sur le flanc
  const LIM = [[104, -62], [80, -54], [50, -47], [10, -43], [-30, -43], [-70, -47], [-104, -52], [-128, -50], [-146, -42], [-164, -38], [-180, -34], [-188, -32]];
  const longueur = (x) => (x > 84 ? 6 + (104 - x) * 0.3 : 10 + 24 * Math.exp(-(((x + 75) / 90) ** 2)) - (x < -150 ? 4 : 0));
  // la tête : du crâne au museau, puis la mâchoire jusqu'à la gorge
  const TETE = [[104, -78], [118, -73], [131, -63], [140, -53], [146, -43], [145, -34], [136, -28], [122, -26], [106, -30], [96, -35]];
  // le dessous : poitrail, ventre, fesse, dessous de la queue
  const VENTRE = [[96, -35], [80, -30], [40, -24], [0, -22], [-40, -24], [-80, -32], [-112, -42], [-130, -40], [-150, -34], [-170, -28], [-182, -26], [-188, -32]];
  // les pattes du côté proche
  // les pattes du côté proche : seulement ce qui sort du pelage, le haut caché dans le corps
  const AVANT = [[60, -40], [57, -24], [62, -9], [61, -2], [64, 0], [92, 0], [93, -3], [86, -7], [80, -12], [82, -26], [86, -40]];
  const ARRIERE = [[-60, -46], [-62, -30], [-70, -14], [-58, -7], [-50, -3], [-52, 0], [-102, 0], [-107, -6], [-102, -20], [-104, -32], [-112, -44]];

  const porcProfil = (ox, oy, s) => {
    const P = (p) => [ox + s * p[0], oy + s * p[1]];
    const out = [];
    const r = hasard(51);
    // les pattes du côté loin, derrière, un peu décalées
    const patte = (Q, dx, t) => {
      const R = Q.map(([x, y]) => P([x + dx, y]));
      return [h.path(lisse(R, true), A.blanc), h.path(lisse(R), t)].join('\n');
    };
    out.push(patte(AVANT, -14, A.detail), patte(ARRIERE, 12, A.detail));
    // l'aplat du corps (sans trait sur le dos : c'est le pelage qui fait la ligne du dos)
    const corps = [...TETE, ...VENTRE.slice(1), ...[...PEAU].reverse().slice(1, -1)];
    out.push(h.path(lisse(corps.map(P), true), A.blanc));
    // le trait de la tête, du poitrail, du ventre et du dessous de la queue
    out.push(h.path(lisse([...TETE, ...VENTRE.slice(1)].map(P)), A.arete));
    // le poil du ventre : court, raide, vers le bas
    for (let x = 62; x > -110; x -= 6) {
      const xj = x + (r() - 0.5) * 3, yh = surX(LIM, xj), yb = surX(VENTRE, xj);
      for (let y = yh + 2 + r() * 3; y < yb - 5; y += 7) out.push(poil(P, [xj, y], uni([-0.25, 1]), 4 + r() * 2, 0.5));
    }
    // les pattes du côté proche, par-dessus
    out.push(patte(AVANT, 0, A.arete), patte(ARRIERE, 0, A.arete));
    // les piquants : neuf rangs du dos au flanc, couchés vers l'arrière, plus longs sur la croupe
    const rangs = 9;
    for (let k = rangs - 1; k >= 0; k--) {
      const v = k / (rangs - 1);
      for (let x = 102 - (k % 2) * 3; x > -190; x -= 5.8) {
        const xj = x + (r() - 0.5) * 3;
        const yT = surX(PEAU, xj), yB = surX(LIM, xj);
        if (yB - yT < 5 && k > 0) continue;
        const B = [xj, yT + (yB - yT) * v * 0.95 + (r() - 0.5) * 2];
        const ta = uni([-4, surX(PEAU, xj - 2) - surX(PEAU, xj + 2)]);
        const leve = xj > 84 ? 6 : xj > 40 ? 14 : xj > -150 ? 24 : 14;
        const d = tourne(ta, leve * (1 - 0.6 * v) + (r() - 0.5) * 12);
        const L = longueur(xj) * (1 - 0.4 * v) * (0.8 + r() * 0.4);
        out.push(piquant(P, B, d, L, xj > 84 ? 0.7 : 1));
      }
    }
    // le jarre : longs poils fins qui dépassent les piquants, du milieu du dos à la croupe
    for (let x = 30; x > -150; x -= 4.5) {
      const xj = x + (r() - 0.5) * 3;
      const B = [xj, surX(PEAU, xj) + 3 + r() * 8];
      const ta = uni([-4, surX(PEAU, xj - 2) - surX(PEAU, xj + 2)]);
      const d = tourne(ta, 32 + (r() - 0.5) * 20);
      const L = (longueur(xj) + 14) * (0.8 + r() * 0.4) * (xj > -10 ? 0.75 : 1);
      out.push(poil(P, B, d, L, (r() - 0.3) * 6));
    }
    // la tête : poil court et serré des joues et du front, couché vers l'arrière
    for (let i = 0; i < 34; i++) {
      const B = [98 + r() * 34, -72 + r() * 42];
      const yHaut = B[0] < 118 ? -76 + (B[0] - 104) * 0.3 : -73 + (B[0] - 118) * 0.77;
      if (B[1] < yHaut + 5 || B[1] > -31 || B[0] > 132 - (B[1] + 50) * 0.3) continue;
      if (Math.hypot(B[0] - 121, B[1] + 57) < 6) continue;
      out.push(poil(P, B, uni([-1, -0.35 + (B[1] + 52) * 0.025]), 4 + r() * 2, 0.6));
    }
    // griffes : longues et courbes, devant les doigts
    const griffe = (b, L) => h.path(lisse([add(b, [0, -1.8]), add(b, [L * 0.6, -2.2]), add(b, [L, 2.2]), add(b, [L * 0.5, 0]), add(b, [0, 1])].map(P), true), A.plein);
    [[92, -4.5], [91, -2.5]].forEach((b) => out.push(griffe(b, 11)));
    [[-51, -4.5], [-52, -2.5]].forEach((b) => out.push(griffe(b, 10)));
    out.push(h.path(`M${f(P([84, -6]))} L${f(P([85, -1]))}`, A.fin), h.path(`M${f(P([-58, -6]))} L${f(P([-59, -1]))}`, A.fin));
    // la face : le museau noir et rond, la bouche, l'œil petit, l'oreille ronde à demi cachée
    out.push(h.path(lisse([[146, -43], [141, -53], [134, -54], [131, -46], [133, -37], [139, -32], [145, -34]].map(P), true), A.plein));
    out.push(h.path(`M${f(P([139, -28]))} Q${f(P([134, -30]))} ${f(P([127, -28]))}`, A.detail));
    out.push(h.cercle(...P([121, -57]), 2.5 * s, A.plein));
    out.push(h.path(lisse([[106, -66], [104, -75], [97, -77], [94, -69]].map(P)), A.detail));
    [[-9, 18], [-2, 20], [5, 17]].forEach(([dy, L]) => out.push(h.path(`M${f(P([142, -40]))} Q${f(P([142 + L * 0.6, -40 + dy * 0.4]))} ${f(P([142 + L, -40 + dy]))}`, A.fin)));
    return { svg: out.join('\n'), P };
  };

  // ─── Le porc-épic vu de face (le museau vers l'œil), debout : centre du corps (0, -60) ───
  // Derrière la tête, le dos en dôme hérissé ; devant, la tête ronde et large, le museau noir
  // court, les yeux petits et écartés, les oreilles rondes à demi dans le poil, les pattes
  // de devant courtes sous les joues, les griffes au sol.
  const FACE_PEAU = [[-52, -16], [-66, -34], [-72, -58], [-66, -84], [-46, -108], [-16, -120], [16, -120], [46, -108], [66, -84], [72, -58], [66, -34], [52, -16]];
  const porcFace = (ox, oy, s, rot, sol) => {
    // rot : rotation de la bête autour du centre de son corps ; sol : y du sol dans la vue
    const C = [0, -60];
    const P = (p) => { const q = tourne([p[0] - C[0], p[1] - C[1]], rot); return [ox + s * q[0], oy + s * q[1]]; };
    const out = [];
    const r = hasard(7 + Math.round(rot));
    const sousSol = (p) => p[1] > sol - 1.5;
    // l'aplat du corps
    out.push(h.path(lisse([...FACE_PEAU, [30, -10], [-30, -10]].map(P), true), A.blanc));
    // les piquants, en rayons autour du dôme : de la peau vers l'extérieur, plus longs en haut
    const rayon = (t) => {   // point de la peau dans la direction t (degrés, 0 = droite, -90 = haut)
      const a = t * Math.PI / 180;
      return [72 * Math.cos(a) * (1 - 0.08 * Math.abs(Math.sin(a))), -60 + 60 * Math.sin(a)];
    };
    // vus de face, les piquants fuient vers l'arrière : courts sur le dôme (raccourcis), plus
    // longs au bord, où on les voit de côté
    for (let k = 0; k <= 5; k++) {
      const rr = 0.42 + k * 0.115;
      for (let th = -205 + (k % 2) * 3; th <= 25; th += 7 - k * 0.5) {
        const t = th + (r() - 0.5) * 4, a = t * Math.PI / 180;
        const B = add(C, mul(add(rayon(t), [-C[0], -C[1]]), rr));
        if (Math.abs(B[0]) < 34 && B[1] > -78) continue;   // derrière la tête
        const d = tourne([Math.cos(a), Math.sin(a)], (r() - 0.5) * 22);
        const L = (k === 5 ? 15 : 5 + k * 1.4) * (0.75 + r() * 0.5);
        const E = add(B, mul(d, L));
        if (sousSol(P(E)) || sousSol(P(B))) continue;
        out.push(piquant(P, B, d, L, 0.9));
      }
    }
    // le jarre, sur le haut du dôme
    for (let th = -170; th <= -10; th += 4) {
      const t = th + (r() - 0.5) * 3, a = t * Math.PI / 180;
      const B = rayon(t), d = tourne([Math.cos(a), Math.sin(a)], (r() - 0.5) * 24);
      const L = 22 * (0.8 + r() * 0.4);
      if (sousSol(P(add(B, mul(d, L))))) continue;
      out.push(poil(P, B, d, L, (r() - 0.5) * 8));
    }
    // le poil du ventre, sous la tête
    for (let x = -50; x <= 50; x += 6) {
      const B = [x + (r() - 0.5) * 3, -28 - r() * 6];
      if (Math.abs(B[0]) < 34) continue;
      if (!sousSol(P(B))) out.push(poil(P, B, uni([Math.sign(x) * 0.3, 1]), 6, 0.4));
    }
    out.push(h.path(lisse([[-66, -34], [-52, -16], [-30, -11], [30, -11], [52, -16], [66, -34]].map(P)), A.arete));
    // les pattes de devant, courtes, sous les joues : la plante nue, les griffes
    const patte = (sx) => pattePlante(P, s, r, [sx * 30, -40], [sx * 34, -18], 8, [18, 17], [-28, -9, 9, 28]);
    out.push(patte(1), patte(-1));
    // la tête
    const TETE = [[0, -84], [16, -82], [27, -74], [31, -60], [28, -46], [21, -34], [12, -25], [0, -22], [-12, -25], [-21, -34], [-28, -46], [-31, -60], [-27, -74], [-16, -82]];
    out.push(h.path(lisse(TETE.map(P), true), A.blanc));
    // le contour des joues et de la mâchoire ; le haut de la tête se perd dans les piquants
    out.push(h.path(lisse(TETE.slice(2, 13).map(P)), A.arete));
    // le poil des joues et du front, serré, couché vers l'extérieur
    for (let i = 0; i < 90; i++) {
      const a = (-200 + r() * 220) * Math.PI / 180, rr = 0.35 + r() * 0.6;
      const B = [28 * rr * Math.cos(a), -56 + 28 * rr * Math.sin(a)];
      if (Math.abs(B[0]) < 16 && B[1] > -52) continue;            // le museau
      if (Math.hypot(Math.abs(B[0]) - 13, B[1] + 58) < 5) continue;  // les yeux
      out.push(poil(P, B, uni([Math.cos(a), Math.sin(a) - 0.3]), 4 + r() * 3, 0.3));
    }
    // les piquants du crâne : ils commencent au-dessus des yeux et couvrent le haut de la tête
    for (let k = 0; k < 2; k++) {
      for (let t = -170; t <= -10; t += 7) {
        const a = (t + (r() - 0.5) * 4) * Math.PI / 180;
        const B = [(18 + k * 6) * Math.cos(a), -66 + (12 + k * 8) * Math.sin(a)];
        out.push(piquant(P, B, tourne([Math.cos(a), Math.sin(a)], (r() - 0.5) * 16), 8 + k * 5 + r() * 4, 0.8));
      }
    }
    // le museau : la truffe noire, large et ronde ; la bouche dessous
    out.push(h.path(lisse([[0, -46], [8, -45], [11, -40], [9, -34], [0, -31], [-9, -34], [-11, -40], [-8, -45]].map(P), true), A.plein));
    out.push(h.path(`M${f(P([-7, -27]))} Q${f(P([0, -24]))} ${f(P([7, -27]))}`, A.detail));
    out.push(h.cercle(...P([-14, -60]), 2.3 * s, A.plein), h.cercle(...P([14, -60]), 2.3 * s, A.plein));
    return { svg: out.join('\n'), P };
  };

  // ─── Vue 1 : de profil, les zones sans piquants ──────────────────────────────────────────
  const profil = (z) => {
    const s = Math.min((z.l - 20) / 372, (z.h - 14) / 162);
    const ox = z.l / 2 + 12 * s, oy = z.h - 8;
    const b = porcProfil(ox, oy, s);
    const svg = [h.ligne(ox - 200 * s, oy, ox + 172 * s, oy, A.detail), b.svg].join('\n');
    const P = b.P;
    return {
      svg,
      renvois: [
        { n: 1, rond: P([154, -92]), cible: P([140, -44]), texte: 'museau nu' },
        { n: 2, rond: add(P([122, -12]), [6, 0]), cible: P([81, -16]), texte: 'pattes nues' },
        { n: 3, rond: P([0, -10]), cible: P([-24, -24]), texte: 'dessous du corps nu' },
      ],
    };
  };

  // ─── Vue 2 : retourner au bâton (vu du museau) ───────────────────────────────────────────
  // La bête couchée sur le flanc, le ventre à gauche, le dos à droite. Le bâton se glisse sous
  // elle côté ventre ; on soulève, elle roule sur le dos (la vue 3 la montre calée).
  const retourner = (z) => {
    const sol = z.h - 8;
    const s = Math.min((z.l - 80) / 160, (z.h - 30) / 186);
    const out = [h.ligne(6, sol, z.l - 6, sol, A.detail)];
    const xa = z.l - 10 - 90 * s, ya = sol - 76 * s;
    const a = porcFace(xa, ya, s, 90, sol);
    // le bâton passe sous le flanc du ventre, entre la bête et le sol, la pointe au-delà
    const t0 = [xa - 4 * s, sol - 4], dirB = uni([-1, -0.3]);
    const t1 = add(t0, mul(dirB, (t0[0] - 8) / Math.abs(dirB[0])));
    const n = [-dirB[1], dirB[0]], e = 4.2;
    out.push(h.chemin([add(t0, mul(n, e)), add(t1, mul(n, e)), add(t1, mul(n, -e)), add(t0, mul(n, -e))], blanc(A.contour), true));
    out.push(a.svg);
    // on soulève le bâton : la bête roule sur le dos (flèche par-dessus, de gauche à droite)
    const c = [xa, ya], R = 108 * s;
    const pol = (deg) => add(c, [R * Math.cos(deg * Math.PI / 180), R * Math.sin(deg * Math.PI / 180)]);
    out.push(h.fleche(`M${f(pol(-158))} A${R.toFixed(1)} ${R.toFixed(1)} 0 0 1 ${f(pol(-40))}`));
    const lv = lerp(t0, t1, 0.88);
    // le geste : soulever le bâton
    out.push(h.geste(`M${f(add(lv, [-2, 12]))} L${f(add(lv, [-2, -18]))}`));
    return {
      svg: out.join('\n'),
      renvois: [
        { n: 4, rond: add(lerp(t0, t1, 0.5), [-6, -40]), cible: lerp(t0, t1, 0.5), texte: 'bâton glissé côté ventre' },
      ],
    };
  };

  // ─── Vue 3 : sur le dos, vue de dessus : le ventre nu et l'incision ──────────────────────
  const dessous = (z) => {
    const s = Math.min((z.h - 12) / 384, (z.l - 8) / 264);
    const ox = z.l / 2, oy = z.h / 2 + 8 * s;
    const P = (p) => [ox + s * p[0], oy + s * p[1]];
    const Pm = (p) => P([-p[0], p[1]]);
    const out = [];
    const r = hasard(3);
    // les bûches, de chaque côté
    const buche = (sx) => {
      const x0 = sx * 112, w = 15;
      const pts = [[x0 - w, -120], [x0 + w, -120], [x0 + w, 124], [x0 - w, 124]].map(P);
      const ecorce = [];
      for (let i = -1; i <= 1; i++) {
        const x = x0 + i * 8;
        ecorce.push(h.path(`M${f(P([x, -110 + Math.abs(i) * 16]))} L${f(P([x + 1, 10 + i * 12]))}`, A.fin));
        ecorce.push(h.path(`M${f(P([x - 1, 36 + i * 10]))} L${f(P([x, 114 - Math.abs(i) * 14]))}`, A.fin));
      }
      return [h.chemin(pts, blanc(A.arete), true), ...ecorce].join('\n');
    };
    out.push(buche(-1), buche(1));
    // le corps vu par le ventre : la tête courte et ronde, le cou épais, le corps en poire, large
    // aux hanches, la queue courte et épaisse
    const cote = [[0, -164], [11, -162], [21, -154], [29, -140], [35, -124], [40, -110], [52, -94], [64, -68], [74, -32], [80, 8], [80, 48], [72, 84], [56, 108], [32, 124],
      [27, 136], [26, 152], [20, 168], [0, 174]];
    const contour = [...cote, ...cote.slice(1, -1).reverse().map(([x, y]) => [-x, y])];
    // la frange de piquants : la bête couchée dessus, ils débordent des flancs, vers l'arrière
    const demi = cote.map(([x, yy]) => [-yy, x]);
    const frange = [];
    for (let k = 0; k < 3; k++) {
      for (let y = -134; y <= 166; y += 4.5) {
        const yj = y + k * 1.7 + (r() - 0.5) * 2;
        const xb = surX(demi, -yj);
        const L = (y < -90 ? 12 : y > 128 ? 16 : 22 + 14 * Math.exp(-(((y - 50) / 80) ** 2))) * (0.8 + r() * 0.4) * (1 - k * 0.2);
        [1, -1].forEach((sx) => {
          const B = [sx * (xb - 4 - k * 2), yj];
          const d = uni([sx * 1, 0.5 + (r() - 0.5) * 0.5 + (y > 128 ? 0.5 : 0) + (y < -90 ? 0.3 : 0)]);
          frange.push(piquant(P, B, d, L + 4));
        });
      }
    }
    // le jarre qui dépasse sur les hanches
    for (let y = 0; y <= 110; y += 5) [1, -1].forEach((sx) => {
      const B = [sx * (surX(demi, -y) - 2), y];
      frange.push(poil(P, B, uni([sx * 1, 0.7 + (r() - 0.5) * 0.4]), 34 * (0.8 + r() * 0.4), sx * (r() - 0.5) * 8));
    });
    out.push(frange.join('\n'));
    // les pattes, molles, ouvertes vers l'extérieur : la paume et la plante en l'air, nues, grenues
    [P, Pm].forEach((Q) => {
      out.push(pattePlante(Q, s, r, [48, -90], [66, -106], 11, [28, 26], [-39, -13, 13, 39]));
      out.push(pattePlante(Q, s, r, [62, 72], [80, 88], 13, [36, 26], [-40, -20, 0, 20, 40]));
    });
    out.push(h.path(lisse(contour.map(P), true), blanc(A.arete)));
    // le poil court du ventre, couché vers la queue, sauf sur la ligne médiane
    for (let y = -100; y <= 112; y += 8) {
      const xmax = surX(demi, -y) - 8;
      for (let x = 12 + (y % 16 ? 4 : 0); x < xmax; x += 10) [1, -1].forEach((sx) => {
        const B = [sx * (x + (r() - 0.5) * 3), y + (r() - 0.5) * 3];
        out.push(poil(P, B, uni([sx * 0.25, 1]), 5 + r() * 2, 0.3));
      });
    }
    // la tête par-dessous : le menton, la truffe au bout, la bouche
    out.push(h.path(lisse([[0, -172], [8, -171], [11, -165], [6, -161], [0, -162], [-6, -161], [-11, -165], [-8, -171]].map(P), true), A.plein));
    out.push(h.path(`M${f(P([-10, -154]))} Q${f(P([0, -149]))} ${f(P([10, -154]))}`, A.detail));
    out.push(h.path(`M${f(P([-22, -126]))} Q${f(P([0, -116]))} ${f(P([22, -126]))}`, A.fin));
    // la queue : ses soies raides dessous
    for (let y = 134; y <= 162; y += 5) [-12, -6, 0, 6, 12].forEach((x) => { if (Math.abs(x) < 20 - (y - 134) * 0.3) out.push(poil(P, [x + (r() - 0.5) * 2, y], uni([x * 0.02, 1]), 6, 0.3)); });
    // l'anus
    out.push(h.ellipse(...P([0, 118]), 3 * s, 4 * s, A.detail));
    // l'incision : ligne médiane de la gorge à l'anus, puis chaque patte par l'intérieur
    out.push(h.path(`M${f(P([0, -116]))} L${f(P([0, 112]))}`, A.cache));
    const branche = (Q, pts, anneau) => [h.path(lisse(pts.map(Q)), A.cache), h.path(lisse(anneau.map(Q), true), A.cache)].join('\n');
    [P, Pm].forEach((Q) => {
      out.push(branche(Q, [[0, -60], [26, -70], [44, -84], [57, -96]], [[52, -107], [64, -110], [68, -97], [56, -93]]));
      out.push(branche(Q, [[0, 100], [30, 96], [52, 90], [70, 84]], [[66, 72], [80, 74], [80, 92], [66, 92]]));
    });
    return {
      svg: out.join('\n'),
      renvois: [
        { n: 5, rond: P([112, -150]), cible: P([112, -96]), texte: 'deux bûches qui la calent' },
        { n: 6, rond: P([36, 20]), cible: P([0, 0]), texte: 'incision, gorge à l’anus' },
        { n: 7, rond: P([-50, 66]), cible: Pm([40, 96]), texte: 'les pattes, par l’intérieur' },
      ],
    };
  };

  // ─── Vue 4 : ôter un piquant, en coupe dans la peau ──────────────────────────────────────
  const oter = (z) => {
    const out = [];
    const ys = z.h * 0.6, ep = 8;
    const E = [z.l * 0.56, ys];            // entrée du piquant
    const dIn = uni([-0.34, 1]), dOut = mul(dIn, -1), nq = [-dIn[1], dIn[0]];
    // la peau retenue : un petit creux sous le bout de bois, à gauche de l'entrée
    const xb = E[0] - 34;
    const surf = (x) => ys + 2.5 * Math.exp(-(((x - xb) / 9) ** 2));
    const S = [];
    for (let x = 6; x <= z.l - 6; x += 3) S.push([x, surf(x)]);
    const ond = [];
    for (let x = z.l - 6; x >= 6; x -= 6) ond.push([x, z.h - 8 + 2.5 * Math.sin(x / 8)]);
    out.push(h.chemin([...S, ...ond], blanc(A.arete), true));
    out.push(h.chemin(S.map(([x, y]) => [x, y + ep]), A.detail));
    // le piquant : planté de biais, les aiguillons au bout, dans la chair
    const w = 2.6, Lin = 82, Lout = 150;
    const Q = (s, t) => add(add(E, mul(dIn, s)), mul(nq, t));
    const pointe = Q(Lin, 0);
    out.push(h.chemin([Q(-Lout, w), Q(Lin - 18, w), pointe, Q(Lin - 18, -w), Q(-Lout, -w)], blanc(A.detail), true));
    for (let s = Lin - 24; s < Lin - 3; s += 3.4) {
      const tt = w * (1 - Math.max(0, s - (Lin - 18)) / 18);
      [1, -1].forEach((sg) => {
        const b = Q(s, sg * tt), e = add(b, add(mul(dOut, 3.4), mul(nq, sg * 2.4)));
        out.push(h.path(`M${f(b)} L${f(e)}`, A.fin));
      });
    }
    // la pince : les deux moitiés de chaque côté du piquant, serrées au ras de la peau,
    // qui continuent vers le haut hors de la vue
    const smax = (ys - 6) / dIn[1];
    const a = (sg, s) => Q(-s, sg * (w + 0.3 + s * 0.02));
    const b = (sg, s) => Q(-s, sg * (w + 0.3 + s * 0.02 + 11));
    [1, -1].forEach((sg) => {
      out.push(h.chemin([a(sg, smax), a(sg, 3), b(sg, 3), b(sg, smax)], blanc(A.contour)));
      out.push(h.chemin([a(sg, smax), add(lerp(a(sg, smax), b(sg, smax), 0.35), mul(dIn, 3)), add(lerp(a(sg, smax), b(sg, smax), 0.65), mul(dIn, -3)), b(sg, smax)], A.detail));
    });
    // tirer d'un coup sec, dans l'axe
    const f0 = add(Q(-40, 0), mul(nq, -30)), f1 = add(Q(-100, 0), mul(nq, -30));
    out.push(h.geste(`M${f(f0)} L${f(f1)}`));
    // le point qui décide : la pince serre au ras de la peau, pas plus haut
    out.push(h.controle(...Q(-4, 0), 17));
    // le bout de bois qui retient la peau, à gauche
    const bw = 7;
    out.push(h.chemin([[xb - bw - 10, 8], [xb - bw, surf(xb) - 0.5], [xb + bw, surf(xb) - 0.5], [xb + bw - 10, 8]], blanc(A.arete)));
    out.push(h.chemin([[xb - bw - 10, 8], [xb - bw - 5, 5], [xb - 3, 11], [xb + bw - 10, 8]], A.detail));
    out.push(h.fleche(`M${f([xb - bw - 20, ys - 70])} L${f([xb - bw - 14, ys - 36])}`));
    return {
      svg: out.join('\n'),
      renvois: [
        { n: 8, rond: add(Q(-18, 0), mul(nq, 30)), cible: Q(-10, w + 8), texte: 'pince au ras de la peau' },
        { n: 9, rond: [xb - bw - 26, ys - 18], cible: [xb - 8, ys - 14], texte: 'bois qui retient la peau' },
        { n: 10, rond: add(pointe, [-30, 2]), cible: Q(Lin - 12, w + 1), texte: 'aiguillons, dans la chair' },
        { n: 11, rond: add(f1, add(mul(nq, -14), mul(dIn, -2))), cible: lerp(f0, f1, 0.8), texte: 'coup sec, dans l’axe' },
      ],
    };
  };

  // ─── Vue 5 : la pince de bois vert ───────────────────────────────────────────────────────
  const pince = (z) => {
    const out = [];
    const cx = z.l * 0.5, yh = 10, yb = z.h - 10;
    const Ltot = yb - yh, D = Ltot / 12, r = D / 2;
    const yF = yh + Ltot * 0.24;           // le haut de la fente
    const yC = yF + D * 0.7;               // le coin
    const yL = yC + D * 0.55;              // la ligature, juste sous le coin
    const gC = 3.4, ouv = 6;               // demi-écart au coin, demi-écart de plus aux mâchoires
    const ecart = (y) => (y <= yF ? 0 : y <= yC ? gC * (y - yF) / (yC - yF) : gC + ouv * (y - yC) / (yb - yC));
    // le bout non fendu, en haut, arrondi
    const dHaut = `M${f([cx - r, yF + 1])} L${f([cx - r, yh + 5])} Q${f([cx, yh - 4])} ${f([cx + r, yh + 5])} L${f([cx + r, yF + 1])}`;
    out.push(h.path(dHaut, A.blanc));
    // la face de droite du bâton, à l'ombre
    out.push(h.chemin([[cx + r * 0.45, yh + 2], [cx + r, yh + 5], [cx + r, yF + 1], [cx + r * 0.45, yF + 1]], A.ombre, true));
    out.push(h.path(dHaut, A.contour));
    // les deux moitiés, de la fente aux mâchoires
    const moitie = (sg) => {
      const pts = [];
      for (let y = yF; y < yb; y += 4) pts.push([cx + sg * ecart(y), y]);
      pts.push([cx + sg * ecart(yb), yb]);
      const ext = pts.map(([x, y]) => [x + sg * r, y]).reverse();
      const o = [h.chemin([...pts, ...ext], A.blanc, true)];
      if (sg > 0) o.push(h.chemin([...pts.map(([x, y]) => [x + r * 0.45, y]), ...ext], A.ombre, true));
      o.push(h.chemin([...pts, ...ext], A.contour, true));
      return o.join('\n');
    };
    out.push(moitie(-1), moitie(1));
    // le fil du bois, le long des moitiés
    [-1, 1].forEach((sg) => out.push(h.path(`M${f([cx + sg * (ecart(yF + 60) + r * 0.5), yF + 60])} L${f([cx + sg * (ecart(yb - 30) + r * 0.5), yb - 30])}`, A.fin)));
    out.push(h.ligne(cx - r * 0.4, yh + 10, cx - r * 0.35, yF - 6, A.fin), h.ligne(cx + r * 0.35, yh + 14, cx + r * 0.4, yF - 8, A.fin));
    // le coin, vu par son bout : il tient la fente ouverte
    out.push(h.rect(cx - gC - 0.2, yC - 4, 2 * gC + 0.4, 9, A.hachure('bois', 'detail')));
    // la ligature : cinq tours juste sous le coin
    const tours = [];
    for (let i = 0; i < 5; i++) {
      const y = yL + i * 3.8, g = ecart(y);
      tours.push({ pts: [[cx - g - r - 1.5, y + 1.4], [cx + g + r + 1.5, y - 1.4]], ep: 3.2, debut: 'ouvert', fin: 'ouvert' });
    }
    out.push(h.formes.cordes(tours).toString());
    // les bouts recoupés à plat
    const xe = ecart(yb);
    out.push(h.ligne(cx - xe - r, yb, cx - xe, yb, A.contour), h.ligne(cx + xe, yb, cx + xe + r, yb, A.contour));
    // le geste : on serre, les mâchoires se ferment
    out.push(h.fleche(`M${f([cx - xe - r - 14, yb - 46])} L${f([cx - xe - r - 3, yb - 46])}`), h.fleche(`M${f([cx + xe + r + 14, yb - 46])} L${f([cx + xe + r + 3, yb - 46])}`));
    const xR = cx + r + 26, xG = cx - r - 26;
    return {
      svg: out.join('\n'),
      renvois: [
        { n: 12, rond: [xR, yh + 34], cible: [cx + r - 1, yh + 40], texte: 'bâton vert fendu' },
        { n: 13, rond: [xG, yC - 4], cible: [cx - gC, yC], texte: 'petit coin de bois' },
        { n: 14, rond: [xR + 2, yL + 12], cible: [cx + ecart(yL + 8) + r + 1, yL + 8], texte: 'ligature sous le coin' },
        { n: 15, rond: [xR + 6, yb - 12], cible: [cx + xe + r * 0.6, yb - 2], texte: 'bouts recoupés à plat' },
      ],
    };
  };

  const vue = (titre, fn) => ({ titre, dessin: (z) => fn(z).svg, renvois: (z) => fn(z).renvois });

  return {
    ref: '51-40',
    titre: 'Le porc-épic : le retourner, l’ouvrir par le ventre, ôter un piquant',
    desc: 'De profil, le porc-épic trapu, le dos qui monte vers la croupe, la tête petite et basse, les pattes courtes aux longues griffes : piquants à pointe noire et long jarre sur le dos, les flancs et la queue ; museau, pattes et dessous du corps nus. '
      + 'Vu du museau, la bête couchée sur le flanc, un bâton glissé sous elle côté ventre : on soulève, elle roule sur le dos. '
      + 'Vue de dessus, la bête sur le dos calée entre deux bûches : le ventre nu, l’incision en tireté sur la ligne médiane de la gorge à l’anus, et le long de l’intérieur de chaque patte. '
      + 'En coupe dans la peau, un piquant planté de biais, ses aiguillons au bout dans la chair, la pince de bois serrée au ras de la peau et un bout de bois qui retient la peau à côté ; la flèche tire dans l’axe. '
      + 'Enfin la pince : un bâton vert fendu, un petit coin en haut de la fente, une ligature juste sous le coin, les deux bouts recoupés à plat.',
    format: 'pleine',
    disposition: [['profil', 'retourner'], ['dessous', 'oter', 'pince']],
    hauteurs: [0.9, 1.45],
    largeurs: [[1.3, 1], [1.05, 1.2, 0.6]],
    vues: {
      profil: vue('Où il n’y a pas de piquants', profil),
      retourner: vue('Retourner au bâton', retourner),
      dessous: vue('Calée sur le dos, ouvrir le ventre', dessous),
      oter: vue('Ôter un piquant, dans l’axe', oter),
      pince: vue('La pince de bois vert', pince),
    },
    danger: 'Danger — couper le piquant à ras avant de tirer ne sert à rien : les aiguillons sont au bout planté, dans la chair. Couper enlève la prise et laisse le piquant avancer.',
  };
};
