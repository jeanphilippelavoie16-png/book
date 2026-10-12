// Planche 25-40 — le bain de gelure (ch. 25, étapes 16 à 20 et variante d'urgence).
module.exports = (h) => {
  const f = (n) => Math.round(n * 10) / 10;
  const blancA = h.a.arete.replace('fill="none"', 'fill="#FFFFFF"');
  const eau = h.a.hachure('eau', 'aucun');

  // Chaque vue est dessinée dans un cadre fixe, mis à l'échelle et centré dans sa zone.
  const cadre = (z, FW, FH) => {
    const k = Math.min(z.l / FW, z.h / FH);
    const ox = (z.l - FW * k) / 2, oy = (z.h - FH * k) / 2;
    const M = (p) => [f(ox + p[0] * k), f(oy + p[1] * k)];
    M.P = (x, y) => M([x, y]).join(' ');
    M.k = k;
    return M;
  };
  const dpoly = (Q, ferme) => 'M' + Q.map((p) => `${f(p[0])} ${f(p[1])}`).join(' L') + (ferme ? ' Z' : '');

  // Catmull-Rom centripète : une courbe douce par des points (ouverte ou fermée).
  const cr = (P, ferme) => {
    const n = P.length;
    const E = ferme ? [P[n - 1], ...P, P[0], P[1]]
      : [[2 * P[0][0] - P[1][0], 2 * P[0][1] - P[1][1]], ...P,
        [2 * P[n - 1][0] - P[n - 2][0], 2 * P[n - 1][1] - P[n - 2][1]]];
    const tj = (ti, a, b) => ti + Math.max(1e-3, Math.sqrt(Math.hypot(b[0] - a[0], b[1] - a[1])));
    const out = [];
    for (let i = 1; i < E.length - 2; i++) {
      const p0 = E[i - 1], p1 = E[i], p2 = E[i + 1], p3 = E[i + 2];
      const t0 = 0, t1 = tj(t0, p0, p1), t2 = tj(t1, p1, p2), t3 = tj(t2, p2, p3);
      const m = Math.max(3, Math.ceil(Math.hypot(p2[0] - p1[0], p2[1] - p1[1]) / 2));
      for (let q = 0; q < m; q++) {
        const t = t1 + (t2 - t1) * q / m;
        const L = (a, b, ta, tb) => [((tb - t) * a[0] + (t - ta) * b[0]) / (tb - ta), ((tb - t) * a[1] + (t - ta) * b[1]) / (tb - ta)];
        const A1 = L(p0, p1, t0, t1), A2 = L(p1, p2, t1, t2), A3 = L(p2, p3, t2, t3);
        out.push(L(L(A1, A2, t0, t2), L(A2, A3, t1, t3), t1, t2));
      }
    }
    if (!ferme) out.push(P[n - 1]);
    return out;
  };

  // Le chaudron en coupe, posé sur la table : parois, anses, eau hachurée, surface.
  const chaudron = (M, c) => {
    const P = M.P, r = 8;
    const fond = `L${P(c.g, c.b - r)} Q${P(c.g, c.b)} ${P(c.g + r, c.b)} L${P(c.d - r, c.b)} Q${P(c.d, c.b)} ${P(c.d, c.b - r)}`;
    return [
      h.rect(...M([c.t0, c.b]), (c.t1 - c.t0) * M.k, 9 * M.k, h.a.hachure('bois', 'detail')),
      h.path(`M${P(c.g, c.s)} ${fond} L${P(c.d, c.s)} Z`, eau),
      h.ligne(...M([c.g, c.s]), ...M([c.d, c.s]), h.a.arete),
      h.path(`M${P(c.g, c.r + 12)} C${P(c.g - 20, c.r + 10)} ${P(c.g - 20, c.r + 30)} ${P(c.g, c.r + 28)}`, h.a.arete),
      h.path(`M${P(c.d, c.r + 12)} C${P(c.d + 20, c.r + 10)} ${P(c.d + 20, c.r + 30)} ${P(c.d, c.r + 28)}`, h.a.arete),
      h.path(`M${P(c.g, c.r)} ${fond} L${P(c.d, c.r)}`, h.a.contour),
      h.ligne(...M([c.t0, c.b]), ...M([c.t1, c.b]), h.a.arete),
    ].join('\n');
  };

  // Thermomètre de cuisson à tube de verre, 0 à 100 : colonne à la valeur lue.
  const thermo = (M, x, yH, yB, lu) => {
    const y0 = yB - 14, y100 = yH + 10, yc = y0 - (lu / 100) * (y0 - y100);
    const P = M.P, out = [];
    out.push(h.path(`M${P(x - 4, yB - 3)} L${P(x - 4, yH + 4)} Q${P(x - 4, yH)} ${P(x, yH)} Q${P(x + 4, yH)} ${P(x + 4, yH + 4)} L${P(x + 4, yB - 3)} Z`, blancA));
    for (let i = 0; i <= 20; i++) {
      const y = y0 - i * (y0 - y100) / 20, long = i % 5 === 0;
      out.push(h.ligne(...M([x + (long ? 0.5 : 2), y]), ...M([x + 4, y]), h.a.fin));
    }
    out.push(h.cercle(...M([x, yB]), 5.5 * M.k, h.a.arete.replace('fill="none"', 'fill="#000000"')));
    out.push(h.rect(...M([x - 1.3, yc]), 2.6 * M.k, (yB - yc) * M.k, h.a.plein));
    return { svg: out.join('\n'), colonne: [x - 1.3, yc] };
  };

  // ─── Le bain : la main gelée pend dans l'eau ───────────────────────────────
  const C = { g: 150, d: 350, r: 125, b: 340, s: 145, t0: 110, t1: 480 };
  const a = 10 * Math.PI / 180, sa = Math.sin(a), ca = Math.cos(a);
  const XW = 236, YW = 165;                         // le poignet, sous la surface
  const mainG = ([v, u]) => [XW + u * sa + v * ca, YW + u * ca - v * sa];
  const UH = -150;                                  // l'avant-bras sort du cadre, coupé
  // Règle 9 : le membre en bande arrondie du pictogramme, sans doigts ; le bout arrondi pend dans l'eau.
  const bande = (u0, u1, r) => {
    const Q = [[r, u0], [r, u1 - r]];
    for (let i = 1; i < 12; i++) { const an = i * Math.PI / 12; Q.push([r * Math.cos(an), u1 - r + r * Math.sin(an)]); }
    return Q.concat([[-r, u1 - r], [-r, u0]]);
  };
  const courbeMain = () => bande(UH, 136, 22);

  // La bouilloire, penchée, bec au-dessus du bord droit.
  const t = -50 * Math.PI / 180, ct = Math.cos(t), st = Math.sin(t);
  const BEC = [338, 106];
  const T = [BEC[0] - (-82 * ct - (-62) * st), BEC[1] - (-82 * st + (-62) * ct)];
  const bouil = ([x, y]) => [T[0] + x * ct - y * st, T[1] + x * st + y * ct];
  const CORPS = [[-44, 0], [-42, -30], [-36, -56], [-24, -68], [24, -68], [36, -56], [42, -30], [44, 0]];
  const BEC_F = [[-40, -36], [-60, -52], [-78, -66], [-86, -58], [-64, -30], [-43, -8]];
  const ANSE = cr([[-30, -62], [-28, -90], [0, -104], [28, -90], [30, -62]], false)
    .concat(cr([[22, -66], [20, -85], [0, -96], [-20, -85], [-22, -66]], false));
  const vueBain = {
    titre: 'Le bain',
    dessin: (z) => {
      const M = cadre(z, 600, 370), P = M.P;
      const th = thermo(M, 158, 60, 200, 38);
      const Mp = (Q) => Q.map(M);
      const out = [chaudron(M, C)];
      // l'eau chaude, de la bouilloire à la surface, contre la paroi opposée à la main
      out.push(h.path(`M${P(339, 104)} C${P(322, 106)} ${P(316, 122)} ${P(316, 145)} L${P(322, 145)} C${P(322, 130)} ${P(327, 117)} ${P(336, 110)} Z`, blancA));
      // brassage : l'eau versée tourne et se mêle avant d'arriver à la main
      out.push(h.fleche(`M${P(334, 160)} C${P(346, 205)} ${P(345, 262)} ${P(320, 272)} C${P(300, 279)} ${P(292, 252)} ${P(300, 230)}`, h.a.arete));
      // la bouilloire : bec, corps, couvercle, anse
      out.push(h.path(dpoly(Mp(BEC_F.map(bouil)), true), blancA));
      out.push(h.path(dpoly(Mp(cr(CORPS, false).map(bouil)), true), blancA));
      out.push(h.path(dpoly(Mp([[-44, 0], [44, 0]].map(bouil))), h.a.contour));
      out.push(h.path(dpoly(Mp(cr([[-22, -67], [-12, -75], [0, -77], [12, -75], [22, -67]], false).map(bouil)), true), blancA));
      out.push(h.path(dpoly(Mp([[-4, -76.5], [-4, -84], [4, -84], [4, -76.5]].map(bouil)), true), blancA));
      out.push(h.path(dpoly(Mp(ANSE.map(bouil)), true), blancA));
      // le thermomètre pincé au bord gauche, bulbe à hauteur de la main
      out.push(th.svg);
      out.push(h.path(`M${P(154, 116)} L${P(146, 116)} L${P(146, 134)}`, h.a.arete));
      // la main et l'avant-bras
      out.push(h.path(dpoly(Mp(courbeMain().map(mainG)), true), blancA));
      return out.join('\n');
    },
    renvois: (z) => {
      const M = cadre(z, 600, 370);
      return [
        { n: 1, rond: M([96, 196]), cible: M([154, 196]), texte: 'thermomètre : 37 à 39 °C' },
        { n: 2, rond: M([96, 230]), cible: M(mainG([-6, 136])), texte: 'ne touche ni fond ni parois' },
        { n: 3, rond: M([96, 300]), cible: M([150, 300]), texte: 'chaudron ou glacière de camp' },
        { n: 4, rond: M([292, 64]), cible: M(mainG([8, 55])), texte: 'souple, rouge-violacé, 30 min' },
        { n: 5, rond: M([408, 186]), cible: M([319, 138]), texte: 'versée à côté, jamais dessus' },
        { n: 6, rond: M([408, 250]), cible: M([344, 240]), texte: 'brasser en versant' },
      ];
    },
  };

  // ─── Vérifier le thermomètre dans la neige fondante ───────────────────────
  const bez = (p0, p1, p2, p3, n) => Array.from({ length: n + 1 }, (_, i) => {
    const s = i / n, r = 1 - s;
    return [r * r * r * p0[0] + 3 * r * r * s * p1[0] + 3 * r * s * s * p2[0] + s * s * s * p3[0],
      r * r * r * p0[1] + 3 * r * r * s * p1[1] + 3 * r * s * s * p2[1] + s * s * s * p3[1]];
  });
  const BOL = bez([95, 70], [95, 150], [112, 185], [150, 185], 30).concat(bez([150, 185], [188, 185], [205, 150], [205, 70], 30).slice(1));
  const bloc = (cx, cy, r, g) => {
    const Q = [];
    for (let i = 0; i < 7; i++) {
      const an = i * 2 * Math.PI / 7 + g, rr = r * (0.75 + 0.25 * Math.sin(i * 2.3 + g * 5));
      Q.push([cx + rr * Math.cos(an), cy + rr * 0.8 * Math.sin(an)]);
    }
    return cr(Q, true);
  };
  const murBol = (y) => {                         // x des deux parois du bol à la hauteur y
    const g = BOL.slice(0, 31), d = BOL.slice(30);
    const x = (Q) => { for (let i = 1; i < Q.length; i++) { const [a0, b0] = [Q[i - 1], Q[i]]; if ((a0[1] - y) * (b0[1] - y) <= 0) return a0[0] + (b0[0] - a0[0]) * (y - a0[1]) / ((b0[1] - a0[1]) || 1); } return 150; };
    return [x(g), x(d)];
  };
  const BATON = [[212, 8], [178, 170]];
  const xBaton = (y) => BATON[0][0] + (BATON[1][0] - BATON[0][0]) * (y - BATON[0][1]) / (BATON[1][1] - BATON[0][1]);
  const BLOCS = [];
  [88, 100, 112, 124, 136, 148, 160, 171].forEach((y, j) => {
    const r = j < 2 ? 8.5 : 7, [xg, xd] = murBol(y + r * 0.8);
    for (let x = 100 + (j % 2) * 7; x < 206; x += 14) {
      const xx = x + 3 * Math.sin(x * 1.7 + j), yy = y + 2 * Math.cos(x + j * 2);
      if (xx - r < xg + 2 || xx + r > xd - 2) continue;
      if (Math.abs(xx - 146) < r + 5 || Math.abs(xx - xBaton(yy)) < r + 5) continue;
      BLOCS.push([xx, yy, r, (x * 0.37 + j) % 6.28]);
    }
  });

  const vueGlace = {
    titre: 'Vérifier le thermomètre',
    dessin: (z) => {
      const M = cadre(z, 300, 200);
      const Mp = (Q) => Q.map(M);
      const sous = BOL.filter((p) => p[1] >= 84);
      const out = [
        h.path(dpoly(Mp(sous), true), eau),
        h.ligne(...M([sous[0][0], 84]), ...M([sous[sous.length - 1][0], 84]), h.a.detail),
      ];
      BLOCS.forEach(([x, y, r, g]) => out.push(h.path(dpoly(Mp(bloc(x, y, r, g)), true), h.a.hachure('neige', 'detail'))));
      out.push(h.path(dpoly(Mp(BOL)), h.a.contour));
      out.push(h.ligne(...M([60, 185]), ...M([240, 185]), h.a.arete));
      // le bâton qui brasse
      const [b0, b1] = BATON, nb = Math.hypot(b1[0] - b0[0], b1[1] - b0[1]);
      const px = -(b1[1] - b0[1]) / nb * 3.5, py = (b1[0] - b0[0]) / nb * 3.5;
      out.push(h.path(dpoly(Mp([[b0[0] + px, b0[1] + py], [b1[0] + px, b1[1] + py], [b1[0] - px, b1[1] - py], [b0[0] - px, b0[1] - py]]), true), blancA));
      out.push(thermo(M, 146, 12, 168, 0).svg);
      return out.join('\n');
    },
    renvois: (z) => {
      const M = cadre(z, 300, 200);
      const c = thermo(M, 146, 12, 168, 0).colonne;
      return [
        { n: 7, rond: M([48, 100]), cible: M(BLOCS.reduce((b, q) => (Math.hypot(q[0] - 108, q[1] - 104) < Math.hypot(b[0] - 108, b[1] - 104) ? q : b)).slice(0, 2)), texte: 'neige fondante, brassée' },
        { n: 8, rond: M([48, 150]), cible: M([c[0], c[1] + 0.5]), texte: 'lit 0 °C, même écart à 38' },
      ];
    },
  };

  // ─── Sans thermomètre : la main saine du secouriste dans l'eau ─────────────
  const Cp = { g: 60, d: 220, r: 70, b: 185, s: 95, t0: 40, t1: 262 };
  const d = [-Math.cos(35 * Math.PI / 180), Math.sin(35 * Math.PI / 180)];
  const nrm = [d[1], -d[0]];
  const WP = [172, 102];
  const brasS = ([u, v]) => [WP[0] + u * d[0] + v * nrm[0], WP[1] + u * d[1] + v * nrm[1]];
  const UP = -125;
  // la bande arrondie du pictogramme, bout dans l'eau
  const courbeProfil = () => bande(UP, 90, 12).map(([v, u]) => [u, v]);

  const vuePoignet = {
    titre: 'Sans thermomètre',
    dessin: (z) => {
      const M = cadre(z, 300, 200);
      const Mp = (Q) => Q.map(M);
      return [
        chaudron(M, Cp),
        h.path(dpoly(Mp(courbeProfil().map(brasS)), true), blancA),
      ].join('\n');
    },
    renvois: (z) => {
      const M = cadre(z, 300, 200);
      return [
        { n: 9, rond: M([262, 136]), cible: M(brasS([0, 11])), texte: 'poignet : tiède et neutre' },
        { n: 10, rond: M([28, 130]), cible: M(brasS([74, 0])), texte: 'main saine 30 s sans effort' },
      ];
    },
  };

  return {
    ref: '25-40',
    titre: 'Le bain de gelure',
    desc: 'En haut, en coupe : une main gelée pend dans un chaudron d’eau à 37 à 39 °C, sans toucher le fond ni les parois ; '
      + 'un thermomètre de cuisson est pincé au bord, le bulbe à hauteur de la main ; l’eau chaude de la bouilloire est versée '
      + 'de l’autre côté, contre la paroi, et brassée. En bas à gauche : le thermomètre plongé dans de la neige fondante brassée '
      + 'doit lire 0 °C. En bas à droite : sans thermomètre, l’intérieur du poignet et la main saine du secouriste dans l’eau. L’encadré danger rappelle qu’aucune autre chaleur ne touche la gelure.',
    format: 'pleine',
    disposition: [['bain'], ['glace', 'poignet']],
    hauteurs: [3, 2],
    largeurs: [[1], [1, 1]],
    vues: { bain: vueBain, glace: vueGlace, poignet: vuePoignet },
    danger: 'Aucune autre chaleur sur la gelure : ni feu, ni poêle, ni bouillotte. Le tissu gelé ne sent pas la brûlure. '
      + 'On ne dégèle pas si le membre peut regeler avant les soins.',
  };
};
