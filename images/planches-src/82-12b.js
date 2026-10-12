// Planche 82-12b — L'abri ouvert : le plancher et les roches chaudes (chapitre 16, « Sortir et
// tenir la nuit » ; aussi ch. 22). Suite de 16-12a. Aucune cote : le chapitre n'en donne pas.

module.exports = (h) => {
  const W = t => h.a[t].replace('fill="none"', 'fill="#ffffff"');   // trait sur aplat blanc
  const f = v => +v.toFixed(1);

  // ── courbes : quadratique, dérivée, aiguilles de sapin le long d'une tige
  const q = (a, b, c, t) => [(1 - t) * (1 - t) * a[0] + 2 * (1 - t) * t * b[0] + t * t * c[0],
    (1 - t) * (1 - t) * a[1] + 2 * (1 - t) * t * b[1] + t * t * c[1]];
  const dq = (a, b, c, t) => [2 * (1 - t) * (b[0] - a[0]) + 2 * t * (c[0] - b[0]),
    2 * (1 - t) * (b[1] - a[1]) + 2 * t * (c[1] - b[1])];
  const aiguilles = (a, b, c, lg, n, bombe = false) => {
    let d = '';
    for (let i = 1; i < n; i++) {
      const t = i / n, p = q(a, b, c, t), v = dq(a, b, c, t), L = Math.hypot(v[0], v[1]);
      const ux = v[0] / L, uy = v[1] / L, nx = -uy, ny = ux;
      const l = bombe ? lg * (0.35 + 2.6 * t * (1 - t)) : lg;
      d += `M${f(p[0])} ${f(p[1])}l${f((ux * 0.55 + nx * 0.85) * l)} ${f((uy * 0.55 + ny * 0.85) * l)}`;
      d += `M${f(p[0])} ${f(p[1])}l${f((ux * 0.55 - nx * 0.85) * l)} ${f((uy * 0.55 - ny * 0.85) * l)}`;
    }
    return h.path(d, h.a.fin);
  };
  // branche de sapin vue de côté, posée courbe vers le haut : pied B, pointe T, bosse r (px)
  const brancheCote = (B, T, r, ep, trait = 'arete') => {
    const C = [(B[0] + T[0]) / 2 - (T[0] - B[0]) * 0.06, Math.min(B[1], T[1]) - 2 * r];
    const Cu = [C[0], C[1] - ep], Cl = [C[0], C[1] + ep];
    return [
      h.path(`M${f(B[0])} ${f(B[1])}Q${f(Cu[0])} ${f(Cu[1])} ${f(T[0])} ${f(T[1])}`
        + `Q${f(Cl[0])} ${f(Cl[1])} ${f(B[0])} ${f(B[1])}Z`, W(trait)),
      h.path(`M${f(B[0])} ${f(B[1])}Q${f(C[0])} ${f(C[1])} ${f(T[0])} ${f(T[1])}`, h.a.detail),
      aiguilles(B, C, T, ep * 0.42, 9),
    ].join('\n');
  };
  // branche de sapin vue de dessus : pied B, pointe T, demi-largeur w (px). Une tige, trois paires
  // de rameaux, des aiguilles ; l'aplat blanc dessous cache le rang d'en dessous.
  const brancheDessus = (B, T, w, trait = 'detail') => {
    const dx = T[0] - B[0], dy = T[1] - B[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux;
    const M = [(B[0] + T[0]) / 2, (B[1] + T[1]) / 2];
    const out = [h.path(`M${f(B[0])} ${f(B[1])}Q${f(M[0] + nx * 2.1 * w)} ${f(M[1] + ny * 2.1 * w)} ${f(T[0])} ${f(T[1])}`
      + `Q${f(M[0] - nx * 2.1 * w)} ${f(M[1] - ny * 2.1 * w)} ${f(B[0])} ${f(B[1])}Z`, h.a.blanc)];
    let d = `M${f(B[0])} ${f(B[1])}L${f(T[0])} ${f(T[1])}`;
    const aig = [];
    [0.14, 0.28, 0.42, 0.56, 0.7].forEach(t => [1, -1].forEach(sg => {
      const p = [B[0] + dx * t, B[1] + dy * t], l = w * 1.35 * (1 - t * 0.6);
      const e = [p[0] + (ux * 0.72 + sg * nx * 0.7) * l, p[1] + (uy * 0.72 + sg * ny * 0.7) * l];
      d += `M${f(p[0])} ${f(p[1])}L${f(e[0])} ${f(e[1])}`;
      aig.push(aiguilles(p, [(p[0] + e[0]) / 2, (p[1] + e[1]) / 2], e, w * 0.3, 6));
    }));
    out.push(h.path(d, h.a[trait]));
    out.push(aiguilles(B, M, T, w * 0.34, 18));
    return out.concat(aig).join('\n');
  };
  // flamme : base au centre cx, largeur l, hauteur ht (px, y vers le bas)
  const flamme = (cx, yb, l, ht, pen = 0.15) => h.path(
    `M${f(cx - l / 2)} ${f(yb)}C${f(cx - l / 2)} ${f(yb - ht * 0.5)} ${f(cx - l * pen)} ${f(yb - ht * 0.7)} `
    + `${f(cx + l * pen)} ${f(yb - ht)}C${f(cx + l * 0.05)} ${f(yb - ht * 0.6)} ${f(cx + l / 2)} ${f(yb - ht * 0.45)} `
    + `${f(cx + l / 2)} ${f(yb)}`, h.a.detail);
  // bout de bille coupé : cercle, cerne, cœur
  const bout = (cx, cy, r) => [
    h.cercle(cx, cy, r, W('arete')),
    h.cercle(cx, cy, r * 0.6, h.a.fin),
    h.cercle(cx, cy, Math.max(r * 0.12, 0.8), h.a.plein),
  ].join('\n');
  // rectangle arrondi (sac de couchage vu de dessus)
  const arrondi = (x, y, l, ht, r, at) => h.path(
    `M${f(x + r)} ${f(y)}H${f(x + l - r)}Q${f(x + l)} ${f(y)} ${f(x + l)} ${f(y + r)}V${f(y + ht - r)}`
    + `Q${f(x + l)} ${f(y + ht)} ${f(x + l - r)} ${f(y + ht)}H${f(x + r)}Q${f(x)} ${f(y + ht)} ${f(x)} ${f(y + ht - r)}`
    + `V${f(y + r)}Q${f(x)} ${f(y)} ${f(x + r)} ${f(y)}Z`, at);

  // ── repères
  // la pose du plancher : x en unités de modèle, de côté en haut, de dessus en bas, alignés
  const RANGS = 5, LB = 60, PAS = 30, LM = (RANGS - 1) * PAS + LB;
  const gBr = z => {
    const s = Math.min((z.l - 60) / LM, (z.h - 56) / 116);
    const x0 = (z.l - LM * s) / 2, yG = 26 + ((z.h - 56) - 116 * s) / 2 + 26 * s, yP = yG + 18 * s;
    return { s, X: x => x0 + x * s, YG: yG, YP: y => yP + y * s };
  };
  // roches : quatre scènes de 100 × 60 en deux rangs, y vers le haut
  const gRo = (z, i) => {
    const cw = z.l / 2, ch = z.h / 2, col = i % 2, rang = Math.floor(i / 2);
    const s = Math.min((cw - 24) / 100, (ch - 22) / 60);
    const x0 = col * cw + (cw - 100 * s) / 2, yB = rang * ch + ch - 6 - ((ch - 22) - 60 * s) / 2;
    return { s, X: x => x0 + x * s, Y: y => yB - y * s };
  };

  return {
    ref: '82-12b',
    titre: 'L’abri ouvert : le plancher et les roches chaudes',
    desc: 'La pose du plancher de l’abri, de côté puis de dessus, alignés : chaque branche de sapin baumier '
      + 'posée courbe vers le haut, les rangs serrés, chacun couvrant le pied du précédent. Les roches chaudes, '
      + 'en quatre gestes : la roche prise au sec, fendue à la masse, pleine ; roulée à la pelle hors des '
      + 'braises ; roulée dans un tissu ; glissée dans le sac de couchage. L’encadré danger dit pourquoi la '
      + 'roche se prend au sec.',
    format: 'pleine',
    disposition: [['branches'], ['roches']],
    hauteurs: [1.15, 1.3],
    vues: {
      branches: {
        titre: 'Le plancher, de côté et de dessus',
        dessin: z => {
          const { s, X, YG, YP } = gBr(z);
          const out = [
            h.rect(X(-4), YG, (LM + 8) * s, 5 * s, h.a.hachure('terre', 'aucun')),
            h.ligne(X(-4), YG, X(LM + 4), YG, h.a.arete),
          ];
          // de côté : chaque rang posé par-dessus le pied du précédent
          for (let i = RANGS - 1; i >= 0; i--) {
            out.push(brancheCote([X(PAS * i), YG - 0.5], [X(PAS * i + LB), YG - 2 * s], 9 * s, 7 * s,
              i === 0 ? 'contour' : 'arete'));
          }
          // de dessus : les mêmes rangs, serrés
          for (let i = RANGS - 1; i >= 0; i--) {
            for (let k = 0; k < 4; k++) {
              const d = ((i * 5 + k * 3) % 5) - 2;
              out.push(brancheDessus([X(PAS * i), YP(9 + 18 * k)], [X(PAS * i + LB), YP(9 + 18 * k + d)], 11 * s, 'detail'));
            }
          }
          return out.join('\n');
        },
        renvois: z => {
          const { s, X, YG, YP } = gBr(z);
          return [
            { n: 1, rond: [X(26), 12], cible: [X(26), YG - 14 * s], texte: 'chaque branche courbe vers le haut' },
            { n: 2, rond: [X(-7), YP(27)], cible: [X(38), YP(27)], texte: 'chaque rang couvre le pied du précédent' },
          ];
        },
      },

      roches: {
        titre: 'Les roches chaudes',
        dessin: z => {
          const out = [];
          // a · fendue à la masse : pleine, elle tient
          {
            const { s, X, Y } = gRo(z, 0), P = pts => pts.map(([x, y]) => [X(x), Y(y)]);
            out.push(h.ligne(X(4), Y(0), X(96), Y(0), h.a.arete));
            out.push(h.chemin(P([[46, 0], [46, 24], [38, 27], [29, 26], [22, 20], [20, 11], [24, 3], [32, 0]]),
              h.a.hachure('pierre', 'arete'), true));
            out.push(h.chemin(P([[54, 0], [54, 24], [62, 27], [71, 26], [78, 20], [80, 11], [76, 3], [68, 0]]),
              h.a.hachure('pierre', 'arete'), true));
            out.push(h.rect(X(44), Y(54), 12 * s, 17 * s, W('contour')));
            out.push(h.chemin(P([[56, 47], [92, 52], [92, 48], [56, 43]]), W('arete'), true));
            out.push(h.fleche(`M${f(X(38))} ${f(Y(52))}L${f(X(38))} ${f(Y(34))}`));
          }
          // b · roulée à la pelle hors des braises
          {
            const { s, X, Y } = gRo(z, 1), P = pts => pts.map(([x, y]) => [X(x), Y(y)]);
            out.push(h.ligne(X(2), Y(0), X(98), Y(0), h.a.arete));
            [[5, 3.4, 0], [12, 4.2, 0], [20, 3.6, 0], [28, 4.6, 0], [36, 3.8, 0], [43, 3, 0],
              [9, 3.2, 4.5], [17, 3.8, 5], [26, 3.4, 5.5], [34, 3, 5], [14, 2.8, 9.5], [23, 3, 10]]
              .forEach(([cx, r, y0], i) => {
                out.push(h.chemin(P([[cx - r, y0], [cx - r * 0.7, y0 + r * 0.9], [cx + r * 0.2, y0 + r * 1.2],
                  [cx + r, y0 + r * 0.6], [cx + r * 0.9, y0]]), i % 3 === 1 ? h.a.plein : W('detail'), true));
              });
            out.push(flamme(X(13), Y(12), 6 * s, 12 * s));
            out.push(flamme(X(22), Y(13), 7 * s, 16 * s, -0.12));
            out.push(flamme(X(31), Y(11), 5 * s, 10 * s));
            out.push(h.chemin(P([[61, 0], [57, 4], [56, 10], [59, 16], [66, 19], [73, 17], [77, 11], [76, 4], [72, 0]]),
              h.a.hachure('pierre', 'arete'), true));
            // la pelle tenue du côté opposé au feu : la lame glissée derrière la roche, on la tire à soi
            out.push(h.path(`M${f(X(53.5))} ${f(Y(15))}Q${f(X(49))} ${f(Y(7))} ${f(X(50.5))} ${f(Y(0.6))}`
              + `L${f(X(53))} ${f(Y(0.6))}Q${f(X(52.5))} ${f(Y(7))} ${f(X(57))} ${f(Y(15))}Z`, W('contour')));
            out.push(h.chemin(P([[53.5, 15], [57, 15], [58.4, 20.6], [56.4, 20.6]]), W('arete'), true));
            out.push(h.ligne(X(57.4), Y(20.6), X(72), Y(58), h.a.arete));
            out.push(h.ligne(X(68.3), Y(59.5), X(75.7), Y(56.5), h.a.arete));
            out.push(h.fleche(`M${f(X(69))} ${f(Y(24))}Q${f(X(79))} ${f(Y(29))} ${f(X(91))} ${f(Y(19))}`));
          }
          // c · laissée grisonner, puis roulée dans le tissu : le baluchon, la roche dedans
          {
            const { s, X, Y } = gRo(z, 2), P = pts => pts.map(([x, y]) => [X(x), Y(y)]);
            out.push(h.ligne(X(10), Y(0), X(90), Y(0), h.a.arete));
            out.push(h.path(`M${f(X(30))} ${f(Y(0))}C${f(X(22))} ${f(Y(10))} ${f(X(28))} ${f(Y(26))} ${f(X(45))} ${f(Y(29))}`
              + `L${f(X(55))} ${f(Y(29))}C${f(X(72))} ${f(Y(26))} ${f(X(78))} ${f(Y(10))} ${f(X(70))} ${f(Y(0))}Z`, W('arete')));
            out.push(h.ellipse(X(50), Y(12), 14 * s, 9 * s, h.a.cache));
            out.push(h.chemin(P([[45, 29], [38, 41], [44, 40], [49, 31]]), W('arete'), true));
            out.push(h.chemin(P([[55, 29], [63, 40], [57, 41], [51, 31]]), W('arete'), true));
            out.push(h.ellipse(X(50), Y(30.5), 4.5 * s, 3 * s, W('arete')));
            out.push(h.path(`M${f(X(46))} ${f(Y(27))}Q${f(X(36))} ${f(Y(20))} ${f(X(33))} ${f(Y(8))}`
              + `M${f(X(54))} ${f(Y(27))}Q${f(X(64))} ${f(Y(20))} ${f(X(67))} ${f(Y(8))}`
              + `M${f(X(50))} ${f(Y(27))}L${f(X(50))} ${f(Y(22))}`, h.a.detail));
          }
          // d · glissée dans le sac de couchage
          {
            const { s, X, Y } = gRo(z, 3);
            out.push(h.path(`M${f(X(12))} ${f(Y(43))}L${f(X(84))} ${f(Y(38))}Q${f(X(96))} ${f(Y(37))} ${f(X(96))} ${f(Y(28))}`
              + `Q${f(X(96))} ${f(Y(19))} ${f(X(84))} ${f(Y(18))}L${f(X(12))} ${f(Y(13))}Q${f(X(3))} ${f(Y(13))} ${f(X(3))} ${f(Y(28))}`
              + `Q${f(X(3))} ${f(Y(43))} ${f(X(12))} ${f(Y(43))}Z`, W('arete')));
            out.push(h.ellipse(X(15), Y(28), 6 * s, 9 * s, h.a.detail));
            out.push(arrondi(X(71), Y(34), 17 * s, 12 * s, 5 * s, h.a.cache));
            out.push(h.fleche(`M${f(X(27))} ${f(Y(28))}L${f(X(67))} ${f(Y(28))}`));
          }
          return out.join('\n');
        },
        renvois: z => {
          const a = gRo(z, 0), b = gRo(z, 1), c = gRo(z, 2), d = gRo(z, 3);
          return [
            { n: 3, rond: [a.X(8), a.Y(50)], cible: [a.X(28), a.Y(14)], texte: 'prise au sec, fendue à la masse, pleine' },
            { n: 4, rond: [b.X(40), b.Y(52)], cible: [b.X(52), b.Y(6)], texte: 'roulée à la pelle hors des braises' },
            { n: 5, rond: [c.X(14), c.Y(44)], cible: [c.X(31), c.Y(14)], texte: 'laissée grisonner, roulée dans le tissu' },
            { n: 6, rond: [d.X(79), d.Y(56)], cible: [d.X(79), d.Y(30)], texte: 'glissée dans le sac de couchage' },
          ];
        },
      },
    },
    danger: 'Jamais une roche ramassée dans un ruisseau ou au bord du lac : l’eau prise dedans devient '
      + 'vapeur au feu, et la roche éclate en projetant des éclats brûlants.',
  };
};
