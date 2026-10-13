// Planche 22-40 — parer le cœur en croix, pocher et peler la langue (chapitre 22, section C,
// points 14 à 16). Les joues ne sont pas dans le chapitre : pas de vue.
module.exports = (h) => {
  const A = h.a, F = h.formes, I = F._interne;
  const f1 = v => Math.round(v * 10) / 10;
  const FOND = A.blanc.match(/fill="[^"]*"/)[0];
  const plein = at => at.replace('fill="none"', FOND);
  const COUPE = A.arete + ' stroke-dasharray="7 4"';          // où passe la lame
  const AXE = A.fin + ' stroke-dasharray="14 3 2 3"';          // trait de coupe de la section

  // ── outils ─────────────────────────────────────────────────────────────────────────────
  const fit = (z, bb, m = 4) => {
    const [x0, y0, x1, y1] = bb;
    const s = Math.min((z.l - 2 * m) / (x1 - x0), (z.h - 2 * m) / (y1 - y0));
    const ox = (z.l - s * (x1 - x0)) / 2 - s * x0, oy = (z.h - s * (y1 - y0)) / 2 - s * y0;
    return { s, T: p => [ox + s * p[0], oy + s * p[1]] };
  };
  const lis = (pts, T, ferme = false) => I.ser(I.lisse(pts, ferme), T);
  const suiteC = (pts, T) => lis(pts, T).replace(/^M[^C]*/, '');   // la même courbe, sans son M
  const poly = (pts, T, ferme = false) => 'M ' + pts.map(p => T(p).map(f1).join(' ')).join(' L ') + (ferme ? ' Z' : '');
  const pt = (T, p) => T(p).map(f1);
  const rot = (p, deg, k = 1) => {
    const a = deg * Math.PI / 180, c = Math.cos(a), s = Math.sin(a);
    return [k * (p[0] * c - p[1] * s), k * (p[0] * s + p[1] * c)];
  };
  const polaire = (r, deg) => [r * Math.cos(deg * Math.PI / 180), r * Math.sin(deg * Math.PI / 180)];
  const ovale = (c, rx, ry, deg, T) => poly(Array.from({ length: 32 }, (_, i) => {
    const a = i / 32 * 2 * Math.PI, q = rot([rx * Math.cos(a), ry * Math.sin(a)], deg);
    return [c[0] + q[0], c[1] + q[1]];
  }), T, true);
  const decale = (pts, d) => pts.map((p, i) => {
    const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
    const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1;
    const k = typeof d === 'function' ? d(i / (pts.length - 1)) : d;
    return [p[0] - dy / l * k, p[1] + dx / l * k];
  });
  let graine = 7;
  const alea = () => { graine = (graine * 16807) % 2147483647; return graine / 2147483647; };
  const motte = (c, rx, ry, n = 9) => Array.from({ length: n }, (_, i) => {
    const a = i / n * 2 * Math.PI, k = 0.78 + 0.34 * alea();
    return [c[0] + rx * k * Math.cos(a), c[1] + ry * k * Math.sin(a)];
  });
  const point = (p, r) => `M ${f1(p[0] - r)} ${f1(p[1])} a ${r} ${r} 0 1 0 ${2 * r} 0 a ${r} ${r} 0 1 0 ${-2 * r} 0`;
  // petits lobes de gras : des « c » fins
  const lobes = (T, s, pts) => h.path(pts.map(([x, y]) => {
    const a = T([x - 3, y]), b = T([x + 3, y]);
    return `M ${f1(a[0])} ${f1(a[1])} A ${f1(3 * s)} ${f1(2.4 * s)} 0 0 1 ${f1(b[0])} ${f1(b[1])}`;
  }).join(' '), A.fin);

  // Le couteau : la pointe en tip, dir va de la pointe vers le manche, cote = côté du fil (+1/−1).
  const couteau = (tip, dir, cote, Lb, wb, Lh) => {
    const n = [-dir[1] * cote, dir[0] * cote];
    const P = (u, v) => [tip[0] + u * dir[0] + v * n[0], tip[1] + u * dir[1] + v * n[1]];
    const q = (u, v) => P(u, v).map(f1).join(' ');
    const lame = `M ${q(0, 0)} C ${q(Lb * 0.1, -wb * 0.32)} ${q(Lb * 0.2, -wb * 0.5)} ${q(Lb * 0.32, -wb * 0.5)} L ${q(Lb, -wb * 0.5)} L ${q(Lb, wb * 0.5)} L ${q(Lb * 0.45, wb * 0.5)} C ${q(Lb * 0.2, wb * 0.5)} ${q(Lb * 0.06, wb * 0.25)} ${q(0, 0)} Z`;
    const biseau = `M ${q(Lb * 0.12, wb * 0.08)} C ${q(Lb * 0.3, wb * 0.3)} ${q(Lb * 0.6, wb * 0.3)} ${q(Lb, wb * 0.3)}`;
    const wh = wb * 1.05, u0 = Lb + 4, u1 = u0 + Lh;
    const mitre = `M ${q(Lb, -wb * 0.58)} L ${q(u0, -wb * 0.58)} L ${q(u0, wb * 0.58)} L ${q(Lb, wb * 0.58)} Z`;
    const manche = `M ${q(u0, -wh / 2)} L ${q(u1 - wh * 0.4, -wh / 2)} C ${q(u1, -wh / 2)} ${q(u1, wh / 2)} ${q(u1 - wh * 0.4, wh / 2)} L ${q(u0, wh / 2)} Z`;
    const r1 = P(u0 + Lh * 0.28, 0), r2 = P(u0 + Lh * 0.68, 0);
    return [h.path(lame, plein(A.arete)), h.path(biseau, A.fin), h.path(manche, A.hachure('bois', 'arete')),
      h.path(mitre, plein(A.arete)), h.path(point(r1, 1.6) + ' ' + point(r2, 1.6), plein(A.fin))].join('\n');
  };

  // ── le cœur, de face ; la section rabattue à droite ────────────────────────────────────
  const BB_C = [-100, -70, 250, 184];
  const SX = 178, SY = 90;                                   // centre de la section, repère du cœur
  const S = p => [SX + p[0], SY + p[1]];
  const coeur = z => {
    const { s, T } = fit(z, BB_C);
    const TS = p => T(S(p));
    const o = [];
    // le corps (les ventricules), fermé sous le gras
    const corps = [[-60, 0], [-66, 30], [-61, 75], [-44, 122], [-18, 160], [4, 178], [18, 172], [38, 140], [54, 92], [62, 42], [60, 0]];
    o.push(h.path(lis(corps, T) + ` L ${pt(T, [60, -14]).join(' ')} L ${pt(T, [-60, -14]).join(' ')} Z`, plein(A.contour)));
    // l'aorte, derrière, et le tronc pulmonaire devant elle : des bouts courts, coupés en biais
    const tube = (g, d, c, rx, ry, deg) => [
      h.path(lis(g, T) + ` L ${pt(T, d[d.length - 1]).join(' ')} ` + suiteC(d.slice().reverse(), T) + ' Z', plein(A.arete)),
      h.path(ovale(c, rx, ry, deg, T), plein(A.arete)),
      h.path(ovale([c[0], c[1] + 0.4], rx * 0.68, ry * 0.58, deg, T), A.detail)];
    o.push(...tube([[-2, -20], [-1, -40], [1, -57]], [[28, -20], [29, -38], [31, -55]], [16, -56], 15, 5.5, -4));
    o.push(...tube([[-44, -18], [-44, -34], [-43, -48]], [[-18, -16], [-18, -32], [-18, -46]], [-30.5, -47], 12.8, 5, 5));
    // le gras dur du sommet, qui chevauche le haut du corps
    const gras = [[66, 4], [54, 15], [42, 9], [30, 17], [16, 10], [2, 18], [-12, 11], [-26, 17], [-40, 10], [-52, 15], [-66, 5],
      [-71, -9], [-63, -22], [-48, -30], [-30, -33], [-4, -34], [22, -34], [44, -30], [60, -21], [69, -8]];
    o.push(h.path(lis(gras, T, true), plein(A.arete)));
    o.push(lobes(T, s, [[-56, -8], [-42, -18], [-30, 2], [-14, -22], [-2, 4], [12, -24], [26, 0], [40, -18], [52, -4], [-50, 6], [58, -12]]));
    // l'oreillette, un lambeau fripé sur le côté
    const or = [[60, -20], [70, -25], [78, -21], [84, -24], [90, -16], [86, -9], [91, -2], [84, 5], [74, 3], [64, 6]];
    o.push(h.path(lis(or, T, true), plein(A.arete)));
    o.push(h.path(lis([[70, -16], [76, -6], [72, 1]], T), A.fin));
    // le sillon entre les ventricules, avec son vaisseau
    const sillon = [[-12, 16], [-18, 60], [-16, 110], [-6, 160]];
    o.push(h.path(lis(sillon, T), A.detail), h.path(lis(sillon.map(p => [p[0] + 3.2, p[1]]), T), A.detail));
    // la coupe de face (un bras de la croix), et le sens de la lame
    o.push(h.path(lis([[30, -33], [31, 20], [30, 80], [24, 130], [14, 162]], T), COUPE));
    const fa = pt(T, [45, 20]), fb = pt(T, [41, 116]);
    o.push(h.fleche(`M ${fa.join(' ')} L ${fb.join(' ')}`, A.arete));
    // le trait de coupe de la section
    const t1 = pt(T, [-80, SY]), t2 = pt(T, [80, SY]);
    o.push(h.ligne(...t1, ...t2, AXE),
      h.ligne(t1[0], t1[1] - 5, t1[0], t1[1] + 5, A.arete), h.ligne(t2[0], t2[1] - 5, t2[0], t2[1] + 5, A.arete));
    // la section, vue de dessus, le devant du cœur en bas
    const tour = [[-60, 0], [-53, -30], [-24, -45], [12, -43], [44, -28], [57, 0], [45, 30], [14, 45], [-24, 44], [-53, 28]];
    o.push(h.path(lis(tour, TS, true), plein(A.contour)));
    // ventricule gauche (paroi épaisse) à droite, ventricule droit (croissant mince) à gauche
    o.push(h.cercle(...pt(TS, [20, 2]), f1(19 * s), plein(A.arete)));
    const vd = [[-6, -32], [-30, -26], [-43, 0], [-30, 26], [-6, 32], [-15, 18], [-18, 0], [-15, -18]];
    o.push(h.path(lis(vd, TS, true), plein(A.arete)));
    const arcF = (r, a0, a1) => lis(Array.from({ length: 9 }, (_, i) => { const a = (a0 + (a1 - a0) * i / 8) * Math.PI / 180; return [20 + r * Math.cos(a), 2 + r * Math.sin(a)]; }), TS);
    o.push(h.path(arcF(26, -70, 70) + ' ' + arcF(32, -50, 50), A.fin));
    // la croix : un bras traverse les deux ventricules, l'autre ouvre le gauche de part en part
    o.push(h.path(poly([[-68, 0], [66, 0]], TS), COUPE), h.path(poly([[30, -54], [30, 54]], TS), COUPE));
    return o.join('\n');
  };
  const coeurRenvois = z => {
    const { T } = fit(z, BB_C);
    return [
      { n: 1, rond: pt(T, [-86, -50]), cible: pt(T, [-44, -31]), texte: 'gras dur et gros vaisseaux' },
      { n: 2, rond: pt(T, [88, 50]), cible: pt(T, [31, 50]), texte: 'deux coupes en croix' },
      { n: 3, rond: pt(T, S([62, -58])), cible: pt(T, S([33, -10])), texte: 'ouvre les deux ventricules' },
    ];
  };

  // ── le cœur ouvert, vu de dessus : quatre quartiers qui tiennent par la pointe ─────────
  const BB_O = [-178, -146, 150, 146];
  const QA = [-90, -2, 88, 180], QW = [30, 27, 31, 26], QR = [124, 112, 120, 114], QB = [13, 8, 13, 7];
  const ouvert = z => {
    const { s, T } = fit(z, BB_O);
    const o = [];
    // repère d'un quartier : u le long de l'axe (depuis la pointe), v en travers
    const Q = i => ([u, v]) => { const a = QA[i] * Math.PI / 180; return [u * Math.cos(a) - v * Math.sin(a), u * Math.sin(a) + v * Math.cos(a)]; };
    const W = (i, u) => Math.tan(QW[i] * Math.PI / 180) * u;         // demi-largeur à u
    // le contour : chaque quartier, un coin, l'encoche vers le suivant
    let cmds = [];
    for (let i = 0; i < 4; i++) {
      const R = QR[i], q = Q(i);
      const cote = (sg) => [[27, sg * W(i, 27)], [R * 0.45, sg * W(i, R * 0.45) * 1.06], [R * 0.8, sg * W(i, R * 0.8) * 1.05]];
      const bout = [[R * 0.97, -W(i, R) * 0.86], [R + 5, -W(i, R) * 0.45], [R + 8, 0], [R + 5, W(i, R) * 0.45], [R * 0.97, W(i, R) * 0.86]];
      const pts = [...cote(-1), ...bout, ...cote(1).reverse()];
      const c = I.lisse(pts.map(q));
      if (i === 0) cmds = c; else cmds.push(['L', q(pts[0])], ...c.slice(1));
      const mid = (QA[i] + QA[(i + 1) % 4] + (i === 3 ? 360 : 0)) / 2;
      cmds.push(['L', polaire(19, mid)]);
    }
    cmds.push(['Z']);
    o.push(h.path(I.ser(cmds, T), plein(A.contour)));
    for (let i = 0; i < 4; i++) {
      const R = QR[i], q = Q(i), Tq = p => T(q(p)), b = QB[i];
      // la tranche de la paroi le long des deux coupes, striée de fibres
      for (const sg of [-1, 1]) {
        const bord = [[29, sg * (W(i, 29) - 3)], [R * 0.45, sg * (W(i, R * 0.45) - b)], [R * 0.78, sg * (W(i, R * 0.78) - b * 1.1)]];
        o.push(h.path(lis(bord, Tq), A.detail));
        const tics = [];
        for (let u = 34; u < R * 0.78; u += 8) {
          const w = W(i, u), wi = w - b * Math.min(1, u / (R * 0.4));
          tics.push(poly([[u, sg * (wi + 1.5)], [u + 3, sg * (w - 1)]], Tq));
        }
        o.push(h.path(tics.join(' '), A.fin));
      }
      // l'anneau du sommet, la valve pendue dessous, ses cordages et le pilier qui les tient
      const ua = R * 0.84;
      o.push(h.path(lis([[ua, -W(i, ua) * 0.92], [ua + 4, 0], [ua, W(i, ua) * 0.92]], Tq), A.detail));
      const wv = W(i, ua) * 0.7;
      const valve = [[ua, -wv], [ua - 9, -wv * 0.8], [ua - 13, -wv * 0.35], [ua - 11, 0], [ua - 13, wv * 0.35], [ua - 9, wv * 0.8], [ua, wv], [ua + 3, 0]];
      o.push(h.path(lis(valve, Tq, true), plein(A.detail)));
      const pil = [[R * 0.24, -5], [R * 0.4, -6], [R * 0.5, -3], [R * 0.5, 3], [R * 0.4, 6], [R * 0.24, 5]];
      o.push(h.path(lis(pil, Tq), plein(A.detail)));
      o.push(h.path([-0.75, -0.35, 0, 0.35, 0.75].map(k => poly([[ua - 12 + Math.abs(k) * 3, k * wv * 0.9], [R * 0.5, k * 2]], Tq)).join(' '), A.fin));
      // trabécules au fond de la cavité
      const tr = [];
      for (const sg of [-1, 1]) {
        tr.push(lis([[R * 0.2, sg * (W(i, R * 0.2) - b - 3)], [R * 0.36, sg * (W(i, R * 0.36) - b - 6)], [R * 0.52, sg * (W(i, R * 0.52) - b - 5)]], Tq));
        tr.push(lis([[R * 0.55, sg * (W(i, R * 0.55) - b - 4)], [R * 0.66, sg * (W(i, R * 0.66) - b - 9)]], Tq));
      }
      o.push(h.path(tr.join(' '), A.fin));
      // le gras dur au bout du quartier
      const lb = [];
      for (let k = -2; k <= 2; k++) lb.push([R * 0.93 + (k % 2 ? 2 : -1), k * W(i, R) * 0.32]);
      o.push(lobes(Tq, s, lb));
      // le trait où l'on pare : sous la valve, en travers du quartier
      const ut = R * 0.7;
      o.push(h.path(lis([[ut, -W(i, ut) - 2], [ut + 2.5, 0], [ut, W(i, ut) + 2]], Tq), COUPE));
    }
    // les bouts de gros vaisseaux au bout de deux quartiers
    for (const [i, dv] of [[0, 8], [3, -6]]) {
      const c = Q(i)([QR[i] + 7, dv]);
      o.push(h.path(ovale(c, 12, 7.5, QA[i] + 90, T), plein(A.arete)), h.path(ovale(c, 7.5, 4, QA[i] + 90, T), A.detail));
    }
    // les caillots : un en place, un qu'on sort
    graine = 11;
    o.push(h.path(lis(motte(Q(1)([QR[1] * 0.55, -12]), 11, 7), T, true), A.plein));
    o.push(h.path(lis(motte([118, 110], 12, 8), T, true), A.plein));
    const d0 = pt(T, Q(2)([QR[2] * 0.5, -10])), d1 = pt(T, [104, 102]);
    o.push(h.fleche(`M ${d0.join(' ')} Q ${pt(T, [60, 110]).join(' ')} ${d1.join(' ')}`, A.arete));
    // le couteau qui pare le quartier du haut, du bord gauche vers la droite
    const ut0 = QR[0] * 0.7, tip = Q(0)([ut0, -W(0, ut0) - 4]);
    o.push(couteau(pt(T, tip), [-1, 0], 1, 64 * s, 13 * s, 54 * s));
    const g0 = pt(T, Q(0)([ut0 - 11, -W(0, ut0 - 11) + 16])), g1 = pt(T, Q(0)([ut0 - 10, W(0, ut0 - 10) - 12]));
    o.push(h.fleche(`M ${g0.join(' ')} L ${g1.join(' ')}`, A.detail));
    return o.join('\n');
  };
  const ouvertRenvois = z => {
    const { T } = fit(z, BB_O);
    const Q = i => ([u, v]) => { const a = QA[i] * Math.PI / 180; return [u * Math.cos(a) - v * Math.sin(a), u * Math.sin(a) + v * Math.cos(a)]; };
    const W = (i, u) => Math.tan(QW[i] * Math.PI / 180) * u;
    return [
      { n: 4, rond: pt(T, [140, -62]), cible: pt(T, Q(1)([QR[1] * 0.55, -14])), texte: 'caillots : les retirer' },
      { n: 5, rond: pt(T, [-150, 108]), cible: pt(T, Q(3)([QR[3] * 0.84 - 10, 0])), texte: 'valves et cordages' },
      { n: 6, rond: pt(T, [140, -128]), cible: pt(T, Q(0)([QR[0] * 0.7 + 1, W(0, QR[0] * 0.7) - 6])), texte: 'parer au trait' },
      { n: 7, rond: pt(T, [-104, 134]), cible: pt(T, Q(2)([QR[2] * 0.45, W(2, QR[2] * 0.45) - 5])), texte: 'reste : un muscle dense' },
    ];
  };

  // ── la langue, vue de dessus ────────────────────────────────────────────────────────────
  const HAUT = [[0, -44], [20, -47], [50, -47], [90, -44], [130, -38], [160, -34], [200, -29], [235, -23], [258, -15], [270, -7]];
  const planLangue = [...HAUT, [274, 0], ...HAUT.slice().reverse().map(p => [p[0], -p[1]]), [-3, 22], [-4, 0], [-3, -22]];
  const BB_R = [-120, -66, 318, 60];
  const racine = z => {
    const { s, T } = fit(z, BB_R);
    const o = [];
    o.push(h.path(lis(planLangue, T, true), plein(A.contour)));
    // le bourrelet, le creux en travers, le sillon du milieu
    o.push(h.path(lis([[40, -32], [80, -35], [124, -29], [143, -15], [147, 0], [143, 15], [124, 29], [80, 35], [40, 32]], T), A.fin));
    o.push(h.path(lis([[150, -26], [155, 0], [150, 26]], T) + ' ' + lis([[156, -24], [160, 0], [156, 24]], T), A.detail));
    o.push(h.path(lis([[182, 0], [220, 1], [262, 0]], T), A.fin));
    // les papilles : serrées devant, clairsemées sur le bourrelet
    graine = 5;
    const dots = [];
    for (let x = 166; x <= 266; x += 6.5) {
      const w = 33 - (x - 160) * 0.2 - Math.max(0, x - 240) * 0.55;
      for (let y = -w + 5; y <= w - 5; y += 6.5) dots.push(point(T([x + (alea() - 0.5) * 3, y + (alea() - 0.5) * 3]), 0.8));
    }
    for (let x = 50; x <= 136; x += 10) for (let y = -26; y <= 26; y += 10) dots.push(point(T([x + (alea() - 0.5) * 5, y + (alea() - 0.5) * 5]), 1.1));
    o.push(h.path(dots.join(' '), A.fin));
    // la racine, rugueuse
    o.push(lobes(T, s, [[10, -30], [22, -16], [12, 0], [24, 14], [10, 28], [34, -36], [34, 34]]));
    // ce qui a été coupé à la base : la masse de la gorge, grasse et glanduleuse
    graine = 21;
    const masse = [];
    for (let k = 0; k < 16; k++) {
      const a = k / 16 * 2 * Math.PI, rr = (k % 2 ? 0.9 : 1.02) * (0.94 + 0.1 * alea());
      masse.push([-50 + 34 * rr * Math.cos(a), 44 * rr * Math.sin(a)]);
    }
    for (const p of masse) if (p[0] > -22) p[0] = -20 + (p[0] + 22) * 0.12;        // la face coupée, presque droite
    o.push(h.path(lis(masse, T, true), plein(A.arete)));
    o.push(lobes(T, s, [[-34, -30], [-58, -24], [-46, -6], [-64, 6], [-36, 18], [-56, 30], [-30, 0], [-72, -12]]));
    o.push(h.path(lis([[-40, -38], [-50, -16], [-44, 8], [-52, 36]], T), A.fin));
    // le couteau qui gratte la racine, en travers ; il tire vers le bout coupé
    o.push(couteau(pt(T, [24, -40]), [0, 1], 1, 70 * s, 13 * s, 52 * s));
    const a0 = pt(T, [18, 0]), a1 = pt(T, [-14, 0]);
    o.push(h.fleche(`M ${a0.join(' ')} L ${a1.join(' ')}`, A.arete));
    // la brosse, sur le dessus, en va-et-vient
    const bx = 206, by = 0;
    const tete = [[bx - 26, by - 12], [bx + 20, by - 12], [bx + 26, by - 6], [bx + 26, by + 6], [bx + 20, by + 12], [bx - 26, by + 12], [bx - 30, by + 6], [bx - 30, by - 6]];
    o.push(h.path(lis(tete, T, true), plein(A.arete)));
    const touffes = [];
    for (let i = 0; i < 7; i++) for (let j = 0; j < 3; j++) touffes.push(point(T([bx - 24 + i * 7.3, by - 7 + j * 7]), 1.7));
    o.push(h.path(touffes.join(' '), A.detail));
    const m0 = [bx + 25, by - 4], m1 = [bx + 76, by - 44], m2 = [bx + 82, by - 37], m3 = [bx + 27, by + 4];
    o.push(h.path(lis([m0, [bx + 50, by - 25], m1], T) + ` L ${pt(T, m2).join(' ')} ` + suiteC([m2, [bx + 53, by - 16], m3], T) + ' Z', A.hachure('bois', 'arete')));
    const b0 = pt(T, [bx - 4, 46]), b1 = pt(T, [bx - 32, 46]), b2 = pt(T, [bx + 24, 46]);
    o.push(h.fleche(`M ${b0.join(' ')} L ${b1.join(' ')}`, A.detail), h.fleche(`M ${b0.join(' ')} L ${b2.join(' ')}`, A.detail));
    return o.join('\n');
  };
  const racineRenvois = z => {
    const { T } = fit(z, BB_R);
    return [
      { n: 8, rond: pt(T, [-104, -50]), cible: pt(T, [-11, -30]), texte: 'couper à la base' },
      { n: 9, rond: pt(T, [-104, 44]), cible: pt(T, [21, 18]), texte: 'gratter la racine' },
      { n: 10, rond: pt(T, [304, 40]), cible: pt(T, [226, 8]), texte: 'brosser la surface' },
    ];
  };

  // ── la langue de profil, parée : le dessus rugueux, le dessous qui porte ───────────────
  const PROF = [[0, -46], [16, -50], [50, -53], [88, -54], [118, -49], [138, -40], [150, -36], [172, -34], [205, -28], [236, -20], [258, -13], [272, -7], [280, -3],
    [276, 1], [250, 1], [200, 0], [140, 0], [80, 0], [30, 0], [6, -1], [0, -8], [-2, -27]];
  const FLANC = [[272, -6], [244, -12], [206, -18], [170, -21], [150, -23], [124, -29], [90, -34], [50, -34], [16, -32], [2, -30]];

  // ── pocher ──────────────────────────────────────────────────────────────────────────────
  const BB_P = [-172, -170, 140, 12];
  const KL = 0.72, LX = -102;                                 // la langue dans la marmite
  const L = p => [LX + p[0] * KL, p[1] * KL];
  const PTE = [100, -47];                                     // où entre la pointe, repère de la langue
  const pocher = z => {
    const { s, T } = fit(z, BB_P);
    const o = [];
    // la marmite en coupe, avec ses deux oreilles
    o.push(h.path(poly([[-116, -80], [-116, 6], [116, 6], [116, -80], [110, -80], [110, 0], [-110, 0], [-110, -80]], T, true), A.hachure('metal', 'arete')));
    o.push(h.cercle(...pt(T, [-113, -81]), f1(3.4 * s), plein(A.arete)), h.cercle(...pt(T, [113, -81]), f1(3.4 * s), plein(A.arete)));
    for (const sg of [-1, 1]) o.push(h.path(lis([[sg * 116, -70], [sg * 130, -72], [sg * 134, -62], [sg * 128, -54], [sg * 116, -56]], T), A.arete));
    // l'eau qui frémit
    const surf = [[-110, -62], [-70, -63], [-30, -61.5], [10, -63], [50, -61.5], [110, -62]];
    o.push(h.path(lis(surf, T) + ` L ${pt(T, [110, 0]).join(' ')} L ${pt(T, [-110, 0]).join(' ')} Z`, A.hachure('eau', 'aucun')));
    o.push(h.path(lis(surf, T), A.arete));
    const bulles = [[-98, -12, 2.6], [-92, -30, 2.2], [-99, -48, 1.8], [96, -14, 2.6], [90, -32, 2.1], [97, -50, 1.7], [66, -54, 1.6], [-70, -55, 1.6]];
    o.push(h.path(bulles.map(([x, y, r]) => point(T([x, y]), f1(r * s))).join(' '), plein(A.detail)));
    for (const x of [-86, -52, 30, 78]) o.push(h.path(lis([[x - 5, -62], [x, -66.5], [x + 5, -62]], T), A.detail));
    // le couteau tenu droit, la pointe dans le bourrelet, la main au-dessus de la marmite
    const tip = L(PTE), Lb = 76, Lh = 58, u0 = Lb + 4;
    const kn = couteau(pt(T, tip), [0, -1], 1, Lb * s, 11 * s, Lh * s);
    const cM = pt(T, [tip[0], tip[1] - u0 - Lh * 0.48]);
    // modèle s11 (poing fermé, vu de la paume) tourné d'un quart : l'avant-bras part à gauche, le
    // pouce en bas vers la lame ; le manche, peint d'abord, passe dans le poing (25 px de bâton = le manche)
    o.push(kn);
    o.push(F.modele('s11', { x: cM[0], y: cM[1], ancre: [68, 42], angle: 90, echelle: 0.46 * s, masquer: [[0, 150, 140, 175]],
      bras: { a: [21.8, 150], a0: [20.8, 135], b: [76.3, 150], b0: [76.2, 135], bord: z } }).toString());
    // la langue, sous l'eau, sur le fond
    o.push(h.path(lis(PROF.map(L), T, true), plein(A.contour)));
    o.push(h.path(lis(FLANC.map(L), T), A.fin));
    // la lame cachée dans la chair
    const pp = (u, v) => pt(T, [tip[0] + v, tip[1] - u]).join(' ');
    o.push(h.path(`M ${pp(0, 0)} C ${pp(Lb * 0.1, -3.5)} ${pp(Lb * 0.2, -5.5)} ${pp(Lb * 0.32, -5.5)} M ${pp(0, 0)} C ${pp(Lb * 0.06, 2.7)} ${pp(Lb * 0.2, 5.5)} ${pp(Lb * 0.45, 5.5)}`, A.cache));
    const fl0 = pt(T, [tip[0] + 14, tip[1] - 48]), fl1 = pt(T, [tip[0] + 14, tip[1] - 22]);
    o.push(h.fleche(`M ${fl0.join(' ')} L ${fl1.join(' ')}`, A.detail));
    return o.join('\n');
  };
  const pocherRenvois = z => {
    const { T } = fit(z, BB_P);
    const tip = L(PTE);
    return [
      { n: 11, rond: pt(T, [80, -104]), cible: pt(T, [60, -63]), texte: 'eau frémissante' },
      { n: 12, rond: pt(T, [-156, -26]), cible: pt(T, [tip[0] - 1, tip[1] + 4]), texte: 'la pointe entre sans forcer' },
    ];
  };

  // ── peler à chaud ───────────────────────────────────────────────────────────────────────
  const BB_E = [-24, -158, 312, 14];
  const PF = 150;                                             // où en est la membrane
  const PINCE = [234, -90];
  const peler = z => {
    const { s, T } = fit(z, BB_E);
    const o = [];
    o.push(h.rect(...pt(T, [-20, 1]), f1(318 * s), f1(9 * s), A.hachure('bois', 'arete')));
    o.push(h.path(lis(PROF, T, true), plein(A.contour)));
    // côté pointe : la membrane encore en place, rugueuse, jusqu'à la ligne du flanc
    const dessus = PROF.filter((p, i) => i <= 12 && p[0] > PF + 2);
    const memb = [[PF, -36.2], ...dessus];
    o.push(h.path(lis(decale(memb, 3), T), A.fin));
    o.push(h.path(lis(FLANC.filter(p => p[0] >= PF), T), A.detail));
    graine = 9;
    const pap = [];
    for (let x = PF + 6; x < 272; x += 6) {
      const yh = x < 172 ? -34 : x < 205 ? -34 + (x - 172) * 6 / 33 : x < 236 ? -28 + (x - 205) * 8 / 31 : -20 + (x - 236) * 13 / 36;
      const yb = x < 170 ? -22 : x < 206 ? -21 + (x - 170) * 3 / 36 : -18 + (x - 206) * 12 / 66;
      for (let y = yh + 4; y < yb - 1.5; y += 4.5) pap.push(point(T([x + (alea() - 0.5) * 2.5, y + (alea() - 0.5) * 1.5]), 0.75));
    }
    o.push(h.path(pap.join(' '), A.fin));
    // côté racine : la chair nue, lisse, fibreuse
    o.push(h.path([[[26, -40], [70, -45], [118, -40]], [[18, -22], [70, -28], [130, -24]], [[30, -10], [90, -12], [138, -9]]].map(l => lis(l, T)).join(' '), A.fin));
    // le front de pelage, du dessus au flanc
    o.push(h.path(lis([[PF, -36], [PF + 1, -30], [PF, -23]], T), A.arete));
    // la membrane décollée, retournée, qu'on tire vers la pointe
    const b1 = [[PF, -36], [150, -56], [166, -76], [198, -90], PINCE];
    const b2 = [PINCE, [226, -84], [204, -76], [180, -62], [166, -44], [PF + 1, -23]];
    const bout = [[246, -94], [252, -91], [249, -87], [252, -83], [244, -84]];
    const flap = lis(b1, T) + ' ' + poly(bout, T).replace(/^M/, 'L') + ' ' + suiteC([bout[bout.length - 1], ...b2.slice(1)], T) + ' Z';
    const envers = lis(decale(b1.slice(0, 4), -3.2), T);          // le rebord rugueux, qui s'enroule
    const papF = b1.slice(1, 4).map((p, i) => point(T(decale(b1, -1.6)[i + 1]), 0.7)).join(' ');
    const flapSvg = [h.path(flap, plein(A.arete)), h.path(envers, A.fin), h.path(papF, A.fin),
      h.path(lis([[160, -48], [178, -70], [204, -83]], T), A.fin)].join('\n');
    o.push(flapSvg);
    // le bord tiré, roulé sur lui-même
    o.push(h.path(lis([[236, -88], [244, -95], [250, -93], [249, -87], [243, -86]], T), A.arete));
    const p0 = pt(T, [262, -100]), p1 = pt(T, [300, -122]);
    o.push(h.fleche(`M ${p0.join(' ')} L ${p1.join(' ')}`, A.arete));
    return o.join('\n');
  };
  const pelerRenvois = z => {
    const { T } = fit(z, BB_E);
    return [
      { n: 13, rond: pt(T, [292, -60]), cible: pt(T, [212, -80]), texte: 'peler brûlante, d’une pièce' },
    ];
  };

  return {
    ref: '22-40',
    titre: 'Parer le cœur en croix, pocher et peler la langue',
    desc: 'Le cœur vu de face, avec le gras dur du sommet et les gros vaisseaux : on l’ouvre par deux coupes en croix, du sommet vers la pointe ; la section montre que la croix ouvre les deux ventricules. Ouvert, vu de dessus, il s’étale en quatre quartiers : on retire les caillots, puis on pare au trait les vaisseaux, le gras dur et les valves avec leurs cordages ; reste un muscle dense. La langue, vue de dessus : on la coupe à la base, on gratte la racine au couteau, on brosse la surface. On la poche dans l’eau frémissante jusqu’à ce que la pointe du couteau entre sans forcer, puis on la pèle tant qu’elle est brûlante : la membrane vient d’une seule pièce.',
    format: 'pleine',
    disposition: [['coeur', 'ouvert'], ['racine'], ['pocher', 'peler']],
    hauteurs: [2.2, 1.05, 1.45],
    largeurs: [[1.08, 1], [1], [1, 1.08]],
    vues: {
      coeur: { titre: 'Le cœur : ouvrir en croix', dessin: coeur, renvois: coeurRenvois },
      ouvert: { titre: 'Ouvert : vider, puis parer', dessin: ouvert, renvois: ouvertRenvois },
      racine: { titre: 'La langue, vue de dessus : couper, gratter, brosser', dessin: racine, renvois: racineRenvois },
      pocher: { titre: 'Pocher', dessin: pocher, renvois: pocherRenvois },
      peler: { titre: 'Peler à chaud', dessin: peler, renvois: pelerRenvois },
    },
    danger: 'Danger — chez l’ours noir et le phoque, le cœur est un muscle, donc un site possible de trichinelle. 74 °C à cœur, sans version saignante ; la sonde dans l’épaisseur de la paroi, pas dans une cavité.',
  };
};
