// Planche 12-06a — le quinzhee (ch. 12, section I, règles communes ; I-1, points 1 à 11).
// La butte en coupe : perche droite au centre, plus haute que la butte ; perche couchée au sol
// vers la future porte ; neige brassée ; bâtons enfoncés jusqu'à la tête, d'équerre avec la
// surface ; plus de 2 m de haut. Vu de dessus : la porte sous le vent, là où sort la perche
// couchée ; les têtes de bâtons partout. Creusé : voûte en arc, paroi d'au moins 30 cm (la
// longueur des bâtons), trou d'aération au sommet avec son bâton, banc plus haut que la porte,
// porte basse fermée d'un bloc qui coupe le vent sans boucher ; l'air entre bas, sort en haut.
// Le banc : la rigole contre la paroi, où l'eau de la voûte descend ; le sapinage en écailles,
// la bâche, les matelas et les sacs, en escalier pour qu'on voie chaque couche.
// Seuls chiffres : plus de 2 m (point 2) et 30 cm (point 3).

module.exports = (h) => {
  const f = v => Math.round(v * 10) / 10;
  const blanc = a => a.replace('fill="none"', 'fill="#ffffff"');
  const P = (pts, ferme = false) => pts.map(([x, y], i) => `${i ? 'L' : 'M'} ${f(x)} ${f(y)}`).join(' ') + (ferme ? ' Z' : '');
  const neige = h.a.hachure('neige', 'aucun');

  // Profil de la butte, de la base gauche à la base droite par le sommet.
  const profil = (cx, G, R, H, n = 72) => {
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const th = Math.PI * (1 - i / n), c = Math.cos(th), s = Math.sin(th);
      pts.push([cx + R * Math.sign(c) * Math.pow(Math.abs(c), 0.87), G - H * Math.pow(Math.abs(s), 0.87)]);
    }
    return pts;
  };
  // Décalage vers l'intérieur, perpendiculaire à la surface.
  const decale = (pts, e) => pts.map((p, i) => {
    const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
    const tx = b[0] - a[0], ty = b[1] - a[1], L = Math.hypot(tx, ty);
    return [p[0] - e * ty / L, p[1] + e * tx / L];
  });
  const xA = (pts, y, cote) => {
    const s = cote < 0 ? pts : pts.slice().reverse();
    for (let i = 0; i < s.length - 1; i++) {
      const [x1, y1] = s[i], [x2, y2] = s[i + 1];
      if ((y1 - y) * (y2 - y) <= 0 && y1 !== y2) return x1 + (x2 - x1) * (y - y1) / (y2 - y1);
    }
    return s[0][0];
  };
  const yA = (pts, x) => {
    for (let i = 0; i < pts.length - 1; i++) {
      const [x1, y1] = pts[i], [x2, y2] = pts[i + 1];
      if ((x1 - x) * (x2 - x) <= 0 && x1 !== x2) return y1 + (y2 - y1) * (x - x1) / (x2 - x1);
    }
    return pts[0][1];
  };

  // ─── La butte, en coupe ─────────────────────────────────────────────────────────────
  const gb = z => {
    const G = z.h - 20;
    const H = Math.min(0.6 * z.h, (z.l - 125) / 2);
    const R = H, cx = Math.round(z.l * 0.59), m = H / 2.2;
    const O = profil(cx, G, R, H), B = decale(O, 0.3 * m);
    const idx = [6, 13, 20, 27, 45, 52, 59, 66];
    return { G, H, R, cx, m, O, B, idx, haut: G - H - 0.45 * m };
  };

  // ─── Vu de dessus ───────────────────────────────────────────────────────────────────
  const gd = z => {
    const cx = Math.round(z.l * 0.6), cy = Math.round(z.h * 0.5);
    const R = Math.min(z.l * 0.3, z.h * 0.36), sp = R / 4.3;
    const tetes = [];
    for (let j = -6; j <= 6; j++) for (let i = -6; i <= 6; i++) {
      const x = cx + (i + (j % 2 ? 0.5 : 0)) * sp, y = cy + j * sp * 0.87;
      const d = Math.hypot(x - cx, y - cy);
      if (d < R - 5 && d > 9 && !(Math.abs(y - cy) < 4 && x > cx)) tetes.push([x, y]);
    }
    return { cx, cy, R, tetes };
  };

  // ─── Creusé, en coupe ───────────────────────────────────────────────────────────────
  const gc = z => {
    const G = z.h - 20;
    const H = Math.min(0.62 * z.h, (z.l - 105) / 2);
    const R = H, cx = Math.round(z.l * 0.47), m = H / 2.2, e = 0.3 * m;
    const O = profil(cx, G, R, H), I = decale(O, e);
    const hd = 0.52 * m, yb = G - 0.62 * m, wt = 10, wr = 8;
    const xg = cx - wt / 2, xd = cx + wt / 2;
    const yOg = yA(O, xg), yIg = yA(I, xg), yOd = yA(O, xd), yId = yA(I, xd);
    const xi = xA(I, yb, -1), xr = xA(I, yb + 6, -1), xbe = cx + 0.22 * R;
    const yp = G - hd, xpo = xA(O, yp, 1), xpi = xA(I, yp, 1);
    const gauche = [
      ...O.filter(p => p[0] < xg), [xg, yOg], [xg, yIg],
      ...I.filter(p => p[0] < xg && p[1] < yb).reverse(),
      [xi, yb], [xr, yb + 6], [xi + wr, yb + 6], [xi + wr, yb], [xbe - 3, yb], [xbe, yb + 3], [xbe, G], [cx - R, G],
    ];
    const droite = [
      [xd, yOd], ...O.filter(p => p[0] > xd && p[1] < yp), [xpo, yp], [xpi, yp],
      ...I.filter(p => p[0] > xd && p[1] < yp).reverse(), [xd, yId],
    ];
    const idx = [5, 12, 19, 26, 45, 52, 58];
    const bh = 0.72 * hd, bx = cx + R + 3;
    const yc = G - 0.36 * H;
    return { G, H, R, cx, m, e, O, I, hd, yb, xg, xd, yOg, yIg, yOd, xi, xbe, yp, xpo, xpi, wr, gauche, droite, idx, bh, bx, yc };
  };

  // ─── Le banc, en détail ─────────────────────────────────────────────────────────────
  const gn = z => {
    const yb = Math.round(z.h * 0.7), x0 = 24, wr = 14, dr = 9;
    const xw = y => x0 + 0.62 * z.l * Math.pow(Math.max(0, yb - y) / yb, 1.8);
    const xs = x0 + wr + 5;
    return { yb, x0, wr, dr, xw, xs, xb: xs + 16, xm: xs + 32, xsac: xs + 56 };
  };
  // Une branche de sapin de profil : bout coupé en (x, y), pointe vers la droite.
  const branche = (x, y, L, A) => {
    const mil = u => [x + u * L, y - A * Math.sin(Math.PI / 2 * Math.min(1, u / 0.5)) + (u > 0.5 ? (u - 0.5) * 3 : 0)];
    const ep = u => u < 0.18 ? 0.6 : 0.6 + 0.3 * A * Math.sin(Math.PI * (u - 0.18) / 0.82);
    const haut = [], bas = [];
    for (let i = 0; i <= 16; i++) {
      const u = i / 16, [mx, my] = mil(u), t = ep(u);
      haut.push([mx, my - t]); bas.unshift([mx, my + t]);
    }
    const out = [h.chemin(haut.concat(bas), blanc(h.a.detail), true), h.chemin([0, 0.25, 0.5, 0.75, 0.95].map(mil), h.a.fin)];
    const aig = [];
    for (const u of [0.3, 0.45, 0.6, 0.75]) {
      const [mx, my] = mil(u), t = ep(u);
      aig.push(`M ${f(mx + 5)} ${f(my - t * 0.85)} L ${f(mx)} ${f(my)} L ${f(mx + 5)} ${f(my + t * 0.85)}`);
    }
    out.push(h.path(aig.join(' '), h.a.fin));
    return out.join('\n');
  };

  return {
    ref: '12-06a',
    titre: 'Le quinzhee',
    desc: 'La maison de neige brassée. En coupe, la butte de plus de 2 m montée autour d’une perche plantée au centre, une seconde perche couchée au sol vers la porte, les bâtons enfoncés jusqu’à la tête. Vu de dessus, la porte sous le vent et les têtes de bâtons partout. Creusé, la voûte en arc de 30 cm au moins, le trou d’aération au sommet avec son bâton, le banc plus haut que la porte, la porte basse à demi fermée d’un bloc ; l’air entre par le bas de la porte et sort par le trou. En détail, la rigole entre le banc et la paroi, puis le sapinage en écailles, la bâche, les matelas et les sacs. Encadré danger : aucune flamme dedans, et celui qui creuse n’est jamais seul.',
    format: 'pleine',
    disposition: [['butte', 'dessus'], ['creuse', 'banc']],
    hauteurs: [1, 1.2],
    largeurs: [[3, 2], [5, 2]],
    vues: {
      butte: {
        titre: 'La butte, en coupe',
        dessin: z => {
          const g = gb(z), { G, H, R, cx, m, O, B, idx, haut } = g;
          return [
            h.rect(6, G, z.l - 12, 12, neige),
            h.path(P(O, true), neige),
            h.path(P(O), h.a.contour),
            h.ligne(6, G, z.l - 6, G, h.a.arete),
            ...idx.map(i => h.ligne(O[i][0], O[i][1], B[i][0], B[i][1], h.a.contour)),
            h.rect(cx + 2.5, G - 5, R + 18, 5, blanc(h.a.arete)),
            h.rect(cx - 2.5, haut, 5, G - haut, blanc(h.a.arete)),
            h.ligne(cx - 6, G - H, cx - R - 12, G - H, h.a.fin),
            h.cote(cx - R - 16, G, cx - R - 16, G - H, 'plus de 2 m', { cote: 'gauche' }),
          ].join('\n');
        },
        renvois: z => {
          const { G, H, R, cx, O, B, haut } = gb(z);
          const b = 20;
          return [
            { n: 1, rond: [cx + 34, haut + 2], cible: [cx + 3, haut + 8], texte: 'perche du centre, plus haute' },
            { n: 2, rond: [z.l - 14, G - 34], cible: [cx + R + 12, G - 3], texte: 'perche couchée vers la porte' },
            { n: 3, rond: [cx + R - 4, G - H + 10], cible: [cx + 0.42 * R, G - 0.4 * H], texte: 'neige brassée, foulée' },
            { n: 4, rond: [cx - 0.62 * R, G - H - 8], cible: [(O[b][0] + B[b][0]) / 2, (O[b][1] + B[b][1]) / 2], texte: 'bâtons enfoncés d’équerre' },
          ];
        },
      },
      dessus: {
        titre: 'Vu de dessus',
        dessin: z => {
          const { cx, cy, R, tetes } = gd(z);
          const out = [h.cercle(cx, cy, R, h.a.contour)];
          tetes.forEach(([x, y]) => out.push(h.cercle(x, y, 1.9, h.a.plein)));
          out.push(
            h.ligne(cx + 4, cy, cx + R - 2, cy, h.a.cache),
            h.rect(cx + R, cy - 2.5, 20, 5, blanc(h.a.arete)),
            h.rect(cx + R - 17, cy - 11, 15, 22, h.a.cache),
            h.cercle(cx, cy, 4, blanc(h.a.arete)),
          );
          for (const dy of [-0.55, 0, 0.55]) {
            const y = cy + dy * R, xe = cx - Math.sqrt(R * R - (dy * R) ** 2) - 10;
            out.push(h.fleche(`M 8 ${f(y)} L ${f(xe)} ${f(y)}`, h.a.arete));
          }
          return out.join('\n');
        },
        renvois: z => {
          const { cx, cy, R, tetes } = gd(z);
          const vise = [cx + 0.3 * R, cy - 0.55 * R];
          const t = tetes.reduce((a, b) => Math.hypot(b[0] - vise[0], b[1] - vise[1]) < Math.hypot(a[0] - vise[0], a[1] - vise[1]) ? b : a);
          return [
            { n: 5, rond: [16, cy - 0.55 * R - 20], cible: [26, cy - 0.55 * R], texte: 'le vent' },
            { n: 6, rond: [cx + 0.75 * R, cy - R - 14], cible: t, texte: 'têtes de bâtons, partout' },
            { n: 7, rond: [cx + R + 4, cy + 0.62 * R + 8], cible: [cx + R - 10, cy + 11], texte: 'la porte, dos au vent' },
          ];
        },
      },
      creuse: {
        titre: 'Creusé, en coupe',
        dessin: z => {
          const g = gc(z), { G, H, R, cx, O, I, yb, xg, xd, yOg, yIg, yOd, xi, xbe, wr, gauche, droite, idx, bh, bx, xpo, xpi, yp } = g;
          const out = [
            h.rect(6, G, z.l - 12, 12, neige),
            h.path(P(gauche, true), neige),
            h.path(P(droite, true), neige),
            h.path(P(gauche.slice(0, -1)), h.a.contour),
            h.path(P(droite, true), h.a.contour),
            h.ligne(6, G, z.l - 6, G, h.a.arete),
          ];
          // Au-delà de la coupe, les deux joues de la porte descendent jusqu'au sol.
          out.push(h.chemin([[xpo, yp], ...O.filter(p => p[0] > xpo && p[1] > yp)], h.a.detail));
          out.push(h.chemin([[xpi, yp], ...I.filter(p => p[0] > xpi && p[1] > yp), [xA(I, G, 1), G]], h.a.detail));
          idx.forEach(i => out.push(h.ligne(O[i][0], O[i][1], I[i][0], I[i][1], h.a.contour)));
          // Le bâton laissé dans le trou d'aération.
          out.push(h.ligne(xd - 2.5, yIg + 1, xd + 5, yOg - 24, h.a.arete));
          // Le bloc devant la porte.
          out.push(h.rect(bx, G - bh, 11, bh, h.a.hachure('neige', 'contour')));
          // Sur le banc : le lit, puis le dormeur dans son sac, la tête au fond.
          const x1 = xi + wr + 6, x2 = xbe - 7, yl = yb - 5;
          out.push(h.rect(xi + wr + 3, yl, xbe - 5 - (xi + wr + 3), 5, blanc(h.a.detail)));
          out.push(h.path(`M ${f(x1 + 12)} ${f(yl - 13)} L ${f(x2 - 6)} ${f(yl - 13)} Q ${f(x2)} ${f(yl - 13)} ${f(x2)} ${f(yl - 6)} Q ${f(x2)} ${f(yl)} ${f(x2 - 6)} ${f(yl)} L ${f(x1 + 12)} ${f(yl)} Z`, blanc(h.a.arete)));
          out.push(h.cercle(x1 + 6, yl - 7, 6.5, blanc(h.a.arete)));
          // L'air : il entre par-dessus le bloc, par le bas, et sort par le trou du sommet.
          const ax = xg + 2.5;
          out.push(h.fleche(`M ${f(cx + R + 44)} ${f(G - bh - 6)} L ${f(bx + 4)} ${f(G - bh - 4)} Q ${f(xpo)} ${f(G - bh - 4)} ${f(xpi)} ${f(G - 25)} L ${f(cx + 80)} ${f(G - 25)} C ${f(cx + 45)} ${f(G - 27)} ${f(cx + 32)} ${f(yIg + 30)} ${f(ax)} ${f(yIg + 2)} L ${f(ax)} ${f(yOg - 18)}`, h.a.cache));
          // La paroi : au moins la longueur des bâtons.
          const ic = 9, [ox, oy] = O[ic], [ix, iy] = I[ic];
          const tx = O[ic + 1][0] - O[ic - 1][0], ty = O[ic + 1][1] - O[ic - 1][1], tl = Math.hypot(tx, ty);
          const ux = tx / tl * 5, uy = ty / tl * 5, nx = (ox - ix) / Math.hypot(ox - ix, oy - iy), ny = (oy - iy) / Math.hypot(ox - ix, oy - iy);
          out.push(h.ligne(ox + nx * 9, oy + ny * 9, ix, iy, h.a.detail), h.ligne(ox - ux, oy - uy, ox + ux, oy + uy, h.a.detail), h.ligne(ix - ux, iy - uy, ix + ux, iy + uy, h.a.detail));
          out.push(h.texte(ox + nx * 26 - 4, oy + ny * 26 + 4, '30 cm', { lisere: true }));
          return out.join('\n');
        },
        renvois: z => {
          const { G, H, R, cx, O, I, yb, xd, yOg, yIg, xbe, bh, bx } = gc(z);
          const b = 52, xv = cx - 0.62 * R;
          return [
            { n: 8, rond: [cx + 42, yOg - 44], cible: [xd + 4, yOg - 20], texte: 'trou d’aération et son bâton' },
            { n: 9, rond: [cx - 0.42 * R, yIg + 38], cible: [xv, yA(I, xv) + 1], texte: 'voûte en arc, lisse' },
            { n: 10, rond: [cx + R - 4, G - H + 4], cible: [(O[b][0] + I[b][0]) / 2, (O[b][1] + I[b][1]) / 2], texte: 'arrêt au premier bâton' },
            { n: 11, rond: [xbe + 18, G - 12], cible: [xbe + 1, yb + 8], texte: 'banc plus haut que la porte' },
            { n: 12, rond: [z.l - 12, G - 12], cible: [bx + 10, G - bh / 2], texte: 'porte basse, bloc devant' },
            { n: 13, rond: [z.l - 14, G - bh - 44], cible: [cx + R + 34, G - bh - 6], texte: 'l’air entre bas, sort en haut' },
          ];
        },
      },
      banc: {
        titre: 'Le banc',
        dessin: z => {
          const { yb, x0, wr, dr, xw, xs, xb, xm, xsac } = gn(z);
          const paroi = [];
          for (let y = 0; y <= yb; y += 4) paroi.push([xw(y), y]);
          const rigole = [[x0, yb], [x0, yb + dr - 3], [x0 + 3, yb + dr], [x0 + wr - 3, yb + dr], [x0 + wr, yb + dr - 3], [x0 + wr, yb], [z.l, yb]];
          const out = [
            h.path(P([[0, 0], ...paroi, ...rigole, [z.l, z.h], [0, z.h]], true), neige),
            h.path(P([...paroi, ...rigole]), h.a.contour),
          ];
          const br = [];
          for (let x = xs; x + 44 <= z.l - 2; x += 18) br.push(x);
          br.reverse().forEach(x => out.push(branche(x, yb, 44, 15)));
          out.push(h.ligne(xb, yb - 17, z.l - 2, yb - 17, h.a.arete));
          out.push(h.rect(xm, yb - 32, z.l - 2 - xm, 14, blanc(h.a.arete)));
          out.push(h.path(`M ${f(z.l - 2)} ${yb - 66} L ${xsac + 17} ${yb - 66} A 17 17 0 0 0 ${xsac + 17} ${yb - 32} L ${f(z.l - 2)} ${yb - 32}`, blanc(h.a.arete)));
          for (let x = xsac + 40; x < z.l - 8; x += 32) out.push(h.ligne(x, yb - 66, x, yb - 32, h.a.fin));
          // L'eau de la voûte coule le long de la paroi jusque dans la rigole.
          const eau = [];
          for (let y = 16; y <= yb - 4; y += 6) eau.push([xw(y) + 5, y]);
          eau.push([x0 + 5, yb], [x0 + 6, yb + 4]);
          out.push(h.fleche(P(eau), h.a.cache));
          return out.join('\n');
        },
        renvois: z => {
          const { yb, x0, xs, xb, xm } = gn(z);
          return [
            { n: 14, rond: [16, yb + 42], cible: [x0 + 7, yb + 6], texte: 'rigole pour l’eau de fonte' },
            { n: 15, rond: [xs + 12, yb - 46], cible: [xs + 6, yb - 6], texte: 'sapinage en écailles' },
            { n: 16, rond: [xs + 38, yb - 82], cible: [xb + 6, yb - 17], texte: 'bâche' },
            { n: 17, rond: [xs + 64, yb - 116], cible: [xm + 5, yb - 25], texte: 'matelas, puis sacs' },
          ];
        },
      },
    },
    danger: 'Aucune flamme dedans, éveillé ou non : la neige se fait fondre dehors. Celui qui creuse n’est jamais seul : un autre adulte reste à l’entrée, pelle en main, et lui parle sans arrêt. Celui qui arrête de répondre est dessous.',
  };
};
