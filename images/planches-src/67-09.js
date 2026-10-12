// Planche 67-09 — Le fléau et ses étalons d'eau (ch. 62, §9 « Peser sans balance »)
module.exports = (h) => {
  const f = (v) => (+v).toFixed(1);

  // Latte vue de face : dessus à y, hauteur e, entailles en V (profondeur p, demi-ouverture w)
  const latte = (x0, x1, y, e, xs, p, w) => {
    const pts = [[x0, y]];
    xs.forEach(x => pts.push([x - w, y], [x, y + p], [x + w, y]));
    pts.push([x1, y], [x1, y + e], [x0, y + e]);
    return [h.chemin(pts, h.a.blanc, true), h.chemin(pts, h.a.contour, true)];
  };
  // Ficelle tendue (tracée en chemin : ce n'est pas une hachure)
  const ficelle = (x1, y1, x2, y2) => h.path(`M ${f(x1)} ${f(y1)} L ${f(x2)} ${f(y2)}`, h.a.detail);
  // Fil du bois le long d'une latte
  const fil = (x0, x1, y, e) => [
    h.path(`M ${f(x0 + 18)} ${f(y + e * 0.62)} C ${f(x0 + 90)} ${f(y + e * 0.55)} ${f(x1 - 160)} ${f(y + e * 0.75)} ${f(x1 - 40)} ${f(y + e * 0.66)}`, h.a.fin),
  ];
  // Piquet de face, encoche en V au sommet (épaules à ys, fond à vb), planté à yb
  const piquet = (cx, ys, vb, yb, m, v) => {
    const pts = [[cx - m, yb], [cx - m, ys], [cx - v, ys], [cx, vb], [cx + v, ys], [cx + m, ys], [cx + m, yb]];
    return [
      h.chemin(pts, h.a.blanc, true),
      h.chemin(pts, h.a.arete),
      h.ligne(cx - m * 0.35, vb + 14, cx - m * 0.3, yb - 6, h.a.fin),
    ];
  };
  // Billot debout
  const billot = (cx, yt, yb, r) => {
    const o = [
      h.path(`M ${f(cx - r)} ${f(yt)} L ${f(cx - r)} ${f(yb)} L ${f(cx + r)} ${f(yb)} L ${f(cx + r)} ${f(yt)} Z`, h.a.blanc),
      h.path(`M ${f(cx - r)} ${f(yt)} L ${f(cx - r)} ${f(yb)} M ${f(cx + r)} ${f(yb)} L ${f(cx + r)} ${f(yt)}`, h.a.arete),
      h.ellipse(cx, yt, r, 5, h.a.blanc),
      h.ellipse(cx, yt, r, 5, h.a.arete),
    ];
    [-0.7, -0.3, 0.3, 0.7].forEach(k => {
      const x = cx + k * r;
      o.push(h.path(`M ${f(x)} ${f(yt + 9)} C ${f(x + 3)} ${f(yt + 16)} ${f(x - 3)} ${f(yb - 12)} ${f(x + 1)} ${f(yb - 3)}`, h.a.detail));
    });
    return o;
  };
  // Boîte de conserve debout, bord à yr, percée de trois trous sous le bord
  const boite = (cx, yr, w, ht) => {
    const rx = w / 2, ry = 5, o = [];
    const corps = `M ${f(cx - rx)} ${f(yr)} L ${f(cx - rx)} ${f(yr + ht)} A ${rx} ${ry} 0 0 0 ${f(cx + rx)} ${f(yr + ht)} L ${f(cx + rx)} ${f(yr)}`;
    o.push(h.path(corps + ' Z', h.a.blanc));
    o.push(h.path(corps, h.a.contour));
    o.push(h.ellipse(cx, yr, rx, ry, h.a.blanc));
    o.push(h.ellipse(cx, yr, rx, ry, h.a.arete));
    [0.32, 0.5, 0.68].forEach(t => o.push(h.path(`M ${f(cx - rx)} ${f(yr + ht * t)} A ${rx} ${ry} 0 0 0 ${f(cx + rx)} ${f(yr + ht * t)}`, h.a.detail)));
    const trous = [[cx - rx + 4, yr + 3], [cx + rx - 4, yr + 3], [cx, yr - ry + 2.5]];
    trous.forEach(([x, y]) => o.push(h.cercle(x, y, 1.4, h.a.plein)));
    return { o, trous };
  };

  // ── Vue 1 : le fléau monté, à vide ──────────────────────────────────────────
  const M = (z) => {
    const cx = z.l / 2, bt = 50, e = 16, p = 9, w = 4.5;
    const L2 = Math.min(z.l / 2 - 34, 220);
    const x0 = cx - L2, x1 = cx + L2, xl = x0 + 16, xr = x1 - 16;
    const hy = bt + 5;
    const table = z.h - 12, bb = table - 44, br = 44;
    const cw = 54, ch = 54;
    const libre = table - 46 - (bt + e) - ch;
    const ky = bt + e + libre * 0.42, yr = ky + libre * 0.58;
    const rub = cx + L2 * 0.5;
    return { cx, bt, e, p, w, x0, x1, xl, xr, hy, table, bb, br, cw, ch, ky, yr, rub };
  };

  // ── Vue 2 : au pivot, en coupe ──────────────────────────────────────────────
  const B = (z) => {
    const cx = z.l / 2, ny = 96, nr = 4;
    const bw = 22, bh = 46, bT = ny - 14;
    const g = 6, mw = 22;
    const yg = ny + nr, ys = ny - 34;
    const mL = cx - bw / 2 - g - mw, mR = cx + bw / 2 + g;
    const bas = z.h - 40;
    return { cx, ny, nr, bw, bh, bT, g, mw, yg, ys, mL, mR, bas };
  };

  // ── Vue 3 : la latte, percée et entaillée ───────────────────────────────────
  const L = (z) => {
    const cx = z.l / 2, e = 28, bt = Math.round(z.h / 2 - e / 2);
    const L2 = Math.min(z.l / 2 - 30, 290);
    const x0 = cx - L2, x1 = cx + L2, xl = x0 + 22, xr = x1 - 22;
    const p = 16, w = 7, hy = bt + 7, hr = 4;
    const R = Math.hypot(cx - xl, bt + p - hy);
    return { cx, e, bt, x0, x1, xl, xr, p, w, hy, hr, R };
  };

  // ── Vue 4 : un étalon de 2 kg ───────────────────────────────────────────────
  const E = (z) => {
    const cx = z.l / 2 - 24, bt = 26, e = 12, p = 6, w = 3;
    const L2 = 170;
    const x0 = cx - L2, x1 = cx + L2, xl = x0 + 12, xr = x1 - 12;
    const hy = bt + 4;
    const ky = bt + e + 10, sy = ky + 96;
    const table = z.h - 10, bb = table - 30, br = 34;
    // boîte qui verse, penchée
    const a = -2.3, pcx = xr + 3, pcy = sy - 32 - 35;
    const rot = ([x, y]) => [pcx + (x - pcx) * Math.cos(a) - (y - pcy) * Math.sin(a), pcy + (x - pcx) * Math.sin(a) + (y - pcy) * Math.cos(a)];
    const xs = z.l - 46;
    return { cx, bt, e, p, w, x0, x1, xl, xr, hy, ky, sy, table, bb, br, a, pcx, pcy, rot, xs };
  };

  // Plateau de toile noué aux quatre coins, sous le nœud (x, ky), coins à sy
  const toile = (x, ky, sy, contenu) => {
    const o = [];
    const cL = [x - 54, sy], cR = [x + 54, sy];
    o.push(ficelle(x, ky, cL[0], cL[1]));
    o.push(ficelle(x, ky, cR[0], cR[1]));
    o.push(...contenu);
    // la toile tendue par la charge : elle épouse le fond, elle ne pend pas à vide sous lui
    const poche = `M ${f(cL[0])} ${f(cL[1])} Q ${f(x)} ${f(sy + 28)} ${f(cR[0])} ${f(cR[1])} Q ${f(x + 50)} ${f(sy + 28)} ${f(x)} ${f(sy + 28)} Q ${f(x - 50)} ${f(sy + 28)} ${f(cL[0])} ${f(cL[1])} Z`;
    o.push(h.path(poche, h.a.blanc));
    o.push(h.path(poche, h.a.arete));
    // plis qui partent des coins
    o.push(h.path(`M ${f(x - 44)} ${f(sy + 8)} Q ${f(x - 28)} ${f(sy + 20)} ${f(x - 8)} ${f(sy + 24)}`, h.a.detail));
    o.push(h.path(`M ${f(x + 44)} ${f(sy + 8)} Q ${f(x + 28)} ${f(sy + 20)} ${f(x + 8)} ${f(sy + 24)}`, h.a.detail));
    // coins noués, bouts qui dépassent
    [cL, cR].forEach(([cx, cy], i) => {
      const s = i ? 1 : -1;
      o.push(h.cercle(cx, cy, 2.4, h.a.plein));
      o.push(h.path(`M ${f(cx)} ${f(cy)} l ${f(s * 7)} ${f(-3)} M ${f(cx)} ${f(cy)} l ${f(s * 6)} 4`, h.a.detail));
    });
    o.push(h.cercle(x, ky, 2.2, h.a.plein));
    return o;
  };

  return {
    ref: '67-09',
    titre: 'Le fléau et ses étalons d’eau',
    desc: 'Un fléau de chalet : une latte droite percée au milieu, pendue par un clou posé dans l’encoche de deux piquets plantés dans un billot, une boîte de conserve pendue à trois ficelles sous l’entaille de chaque bout, un ruban sur le bras léger pour qu’elle tienne droite à vide. En coupe au pivot, le clou couché en travers des deux encoches et la latte libre entre les piquets. La latte seule : le trou plus haut que le fond des deux entailles, la distance reportée d’un bout à l’autre avec une ficelle. Un étalon : une bouteille de 2 L pleine à ras bord dans un plateau de toile, contre un sachet qu’on remplit de sable jusqu’à l’équilibre, puis qu’on ferme et qu’on marque.',
    format: 'pleine',
    disposition: [['monte', 'pivot'], ['latte'], ['etalon']],
    hauteurs: [4.5, 2.1, 4.2],
    largeurs: [[3, 1], [1], [1]],
    vues: {
      monte: {
        titre: 'Le fléau monté, à vide',
        dessin: (z) => {
          const g = M(z), o = [];
          o.push(h.ligne(8, g.table, z.l - 8, g.table, h.a.arete));
          o.push(...billot(g.cx, g.bb, g.table, g.br));
          o.push(...latte(g.x0, g.x1, g.bt, g.e, [g.xl, g.xr], g.p, g.w));
          o.push(...fil(g.x0, g.x1, g.bt, g.e));
          // ruban enroulé sur le bras léger
          o.push(h.rect(g.rub - 8, g.bt - 1.5, 16, g.e + 3, h.a.blanc));
          o.push(h.rect(g.rub - 8, g.bt - 1.5, 16, g.e + 3, h.a.detail));
          [-4, 1, 6].forEach(d => o.push(h.path(`M ${f(g.rub + d - 4)} ${f(g.bt + g.e + 1.5)} L ${f(g.rub + d + 2)} ${f(g.bt - 1.5)}`, h.a.fin)));
          // plateaux : boucle dans l'entaille, nœud, trois ficelles, boîte
          [g.xl, g.xr].forEach(x => {
            o.push(h.ligne(x, g.bt + g.p, x, g.ky, h.a.detail));
            const b = boite(x, g.yr, g.cw, g.ch);
            o.push(...b.o);
            b.trous.forEach(([tx, ty]) => o.push(ficelle(x, g.ky, tx, ty)));
            o.push(h.cercle(x, g.ky, 2.4, h.a.plein));
          });
          // piquet de devant, par-dessus la latte ; clou dans l'encoche
          o.push(...piquet(g.cx, g.bt - 8, g.hy + 4.5, g.bb, 8, 5.5));
          o.push(h.cercle(g.cx, g.hy, 4.6, h.a.blanc));
          o.push(h.cercle(g.cx, g.hy, 4.6, h.a.arete));
          o.push(h.cercle(g.cx, g.hy, 1.3, h.a.plein));
          return o.join('\n');
        },
        renvois: (z) => {
          const g = M(z);
          return [
            { n: 1, rond: [g.cx - 46, g.bt - 30], cible: [g.cx - 5, g.hy - 2], texte: 'clou dans le trou du milieu' },
            { n: 2, rond: [g.xr - 38, g.bt - 28], cible: [g.xr - 1, g.bt + 4], texte: 'entaille à chaque bout, boucle de ficelle' },
            { n: 3, rond: [g.xl + g.cw / 2 + 32, g.yr + g.ch / 2], cible: [g.xl + g.cw / 2 + 1, g.yr + g.ch / 2], texte: 'boîte de conserve percée de trois trous' },
            { n: 4, rond: [g.rub, g.bt + g.e + 34], cible: [g.rub, g.bt + g.e + 2.5], texte: 'à vide : ruban sur le bras léger' },
          ];
        },
      },
      pivot: {
        titre: 'Au pivot, en coupe',
        dessin: (z) => {
          const g = B(z), o = [];
          // piquets : la face de l'encoche au-delà, puis la coupe au fond de l'encoche
          [g.mL, g.mR].forEach(x => {
            o.push(h.rect(x, g.ys, g.mw, g.yg - g.ys, h.a.blanc));
            o.push(h.rect(x, g.ys, g.mw, g.yg - g.ys, h.a.detail));
            o.push(h.rect(x, g.yg, g.mw, g.bas - g.yg, h.a.hachure('bois', 'arete')));
            // arrachement
            o.push(h.path(`M ${f(x - 3)} ${f(g.bas + 2)} l ${f(g.mw / 3 + 1)} -5 l ${f(g.mw / 3)} 8 l ${f(g.mw / 3 + 2)} -5`, h.a.detail));
          });
          // latte en coupe, trou plus grand que le clou
          o.push(h.rect(g.cx - g.bw / 2, g.bT, g.bw, g.bh, h.a.hachure('bois', 'arete')));
          o.push(h.rect(g.cx - g.bw / 2 + 0.7, g.ny - g.nr, g.bw - 1.4, 2 * g.nr + 3, h.a.blanc));
          // clou couché en travers, tête à gauche
          const n0 = g.mL - 9, n1 = g.mR + g.mw + 12;
          o.push(h.rect(n0, g.ny - g.nr, n1 - n0, 2 * g.nr, h.a.plein));
          o.push(h.rect(n0 - 3.5, g.ny - 10, 3.5, 20, h.a.plein));
          o.push(h.chemin([[n1, g.ny - g.nr], [n1 + 9, g.ny], [n1, g.ny + g.nr]], h.a.plein, true));
          return o.join('\n');
        },
        renvois: (z) => {
          const g = B(z);
          return [
            { n: 5, rond: [g.mR + g.mw + 8, g.ny - 40], cible: [g.mR + g.mw + 6, g.ny - g.nr - 1], texte: 'clou couché en travers des deux encoches' },
            { n: 6, rond: [g.cx, g.bT + g.bh + 34], cible: [g.cx, g.bT + g.bh + 1], texte: 'latte libre entre les piquets' },
          ];
        },
      },
      latte: {
        titre: 'La latte, percée et entaillée',
        dessin: (z) => {
          const g = L(z), o = [];
          o.push(...latte(g.x0, g.x1, g.bt, g.e, [g.xl, g.xr], g.p, g.w));
          o.push(h.cercle(g.cx, g.hy, g.hr, h.a.blanc));
          o.push(h.cercle(g.cx, g.hy, g.hr, h.a.arete));
          // ficelle tendue du trou au fond de l'entaille de gauche
          o.push(ficelle(g.cx - g.hr, g.hy + 0.2, g.xl, g.bt + g.p));
          // la même longueur reportée à droite : arc tireté centré sur le trou
          const a0 = Math.atan2(g.bt + g.p - g.hy, g.xr - g.cx), da = 0.11;
          const pt = (t) => [g.cx + g.R * Math.cos(t), g.hy + g.R * Math.sin(t)];
          const [ax, ay] = pt(a0 - da), [bx, by] = pt(a0 + da);
          o.push(h.path(`M ${f(ax)} ${f(ay)} A ${f(g.R)} ${f(g.R)} 0 0 1 ${f(bx)} ${f(by)}`, h.a.cache));
          return o.join('\n');
        },
        renvois: (z) => {
          const g = L(z);
          const mx = (g.cx + g.xl) / 2, my = (g.hy + g.bt + g.p) / 2;
          return [
            { n: 7, rond: [g.cx, g.bt - 20], cible: [g.cx, g.hy - g.hr - 1], texte: 'trou au milieu, plus haut que les entailles' },
            { n: 8, rond: [mx, g.bt + g.e + 20], cible: [mx, my + 1], texte: 'ficelle reportée d’une entaille à l’autre' },
          ];
        },
      },
      etalon: {
        titre: 'Un étalon de 2 kg',
        dessin: (z) => {
          const g = E(z), o = [];
          o.push(h.ligne(8, g.table, z.l - 8, g.table, h.a.arete));
          o.push(...billot(g.cx, g.bb, g.table, g.br));
          o.push(...latte(g.x0, g.x1, g.bt, g.e, [g.xl, g.xr], g.p, g.w));
          // le même ruban sur le bras léger : c'est le même fléau
          const rub = g.cx + 85;
          o.push(h.rect(rub - 6, g.bt - 1.5, 12, g.e + 3, h.a.blanc));
          o.push(h.rect(rub - 6, g.bt - 1.5, 12, g.e + 3, h.a.detail));
          [-3, 2].forEach(d => o.push(h.path(`M ${f(rub + d - 3)} ${f(g.bt + g.e + 1.5)} L ${f(rub + d + 2)} ${f(g.bt - 1.5)}`, h.a.fin)));
          [g.xl, g.xr].forEach(x => o.push(h.ligne(x, g.bt + g.p, x, g.ky, h.a.detail)));
          o.push(...piquet(g.cx, g.bt - 6, g.hy + 3.5, g.bb, 6, 4));
          o.push(h.cercle(g.cx, g.hy, 3.6, h.a.blanc));
          o.push(h.cercle(g.cx, g.hy, 3.6, h.a.arete));
          o.push(h.cercle(g.cx, g.hy, 1, h.a.plein));

          // bouteille de 2 L couchée, pleine à ras bord, bouchée
          const bx = g.xl, cy = g.sy + 6, b0 = bx - 42, b1 = bx + 12;
          const bout = `M ${f(b0 + 6)} ${f(cy - 14)} L ${f(b1)} ${f(cy - 14)} C ${f(b1 + 8)} ${f(cy - 14)} ${f(b1 + 8)} ${f(cy - 6)} ${f(bx + 24)} ${f(cy - 6)} L ${f(bx + 31)} ${f(cy - 6)} L ${f(bx + 31)} ${f(cy + 6)} L ${f(bx + 24)} ${f(cy + 6)} C ${f(b1 + 8)} ${f(cy + 6)} ${f(b1 + 8)} ${f(cy + 14)} ${f(b1)} ${f(cy + 14)} L ${f(b0 + 6)} ${f(cy + 14)} Q ${f(b0)} ${f(cy + 14)} ${f(b0)} ${f(cy + 8)} L ${f(b0)} ${f(cy - 8)} Q ${f(b0)} ${f(cy - 14)} ${f(b0 + 6)} ${f(cy - 14)} Z`;
          const bouteille = [
            h.path(bout, h.a.blanc),
            h.path(bout, h.a.hachure('eau', 'aucun')),
            h.path(bout, h.a.contour),
            h.ligne(b0 + 22, cy - 14, b0 + 22, cy + 14, h.a.detail),
            h.ligne(b0 + 44, cy - 14, b0 + 44, cy + 14, h.a.detail),
            h.rect(bx + 31, cy - 7.5, 5, 15, h.a.plein),
          ];
          o.push(...toile(g.xl, g.ky, g.sy, bouteille));

          // sachet de sable ouvert, qu'on remplit
          const sx = g.xr, my = g.sy - 32;
          const sac = `M ${f(sx - 13)} ${f(my)} C ${f(sx - 18)} ${f(my + 12)} ${f(sx - 26)} ${f(my + 22)} ${f(sx - 25)} ${f(my + 44)} Q ${f(sx - 24)} ${f(my + 58)} ${f(sx)} ${f(my + 58)} Q ${f(sx + 24)} ${f(my + 58)} ${f(sx + 25)} ${f(my + 44)} C ${f(sx + 26)} ${f(my + 22)} ${f(sx + 18)} ${f(my + 12)} ${f(sx + 13)} ${f(my)} Z`;
          const sachet = [
            h.path(sac, h.a.blanc),
            h.path(sac, h.a.arete),
            h.path(`M ${f(sx - 8)} ${f(my + 6)} Q ${f(sx - 14)} ${f(my + 22)} ${f(sx - 12)} ${f(my + 34)}`, h.a.detail),
            h.path(`M ${f(sx + 7)} ${f(my + 5)} Q ${f(sx + 12)} ${f(my + 16)} ${f(sx + 16)} ${f(my + 26)}`, h.a.detail),
            h.ellipse(sx, my, 13, 3.5, h.a.blanc),
            h.ellipse(sx, my, 13, 3.5, h.a.arete),
            h.path(`M ${f(sx - 9)} ${f(my + 1)} Q ${f(sx)} ${f(my - 5)} ${f(sx + 9)} ${f(my + 1)}`, h.a.hachure('terre', 'detail')),
          ];
          o.push(...toile(g.xr, g.ky, g.sy, sachet));

          // boîte penchée qui verse le sable
          const r = g.rot, hw = 14, hh = 16;
          const coins = [[g.pcx - hw, g.pcy - hh], [g.pcx + hw, g.pcy - hh], [g.pcx + hw, g.pcy + hh], [g.pcx - hw, g.pcy + hh]].map(r);
          o.push(h.chemin(coins, h.a.blanc, true));
          o.push(h.chemin(coins, h.a.contour, true));
          [-0.35, 0.05, 0.45].forEach(t => {
            const [ax, ay] = r([g.pcx - hw, g.pcy + hh * t]), [bx2, by2] = r([g.pcx + hw, g.pcy + hh * t]);
            o.push(h.path(`M ${f(ax)} ${f(ay)} L ${f(bx2)} ${f(by2)}`, h.a.detail));
          });
          const deg = g.a * 180 / Math.PI, ca = Math.cos(g.a), sa = Math.sin(g.a);
          const [ocx, ocy] = r([g.pcx, g.pcy - hh]);
          const p1 = [ocx + hw * ca, ocy + hw * sa], p2 = [ocx - hw * ca, ocy - hw * sa];
          const bord = `M ${f(p1[0])} ${f(p1[1])} A ${hw} 4 ${f(deg)} 1 1 ${f(p2[0])} ${f(p2[1])} A ${hw} 4 ${f(deg)} 1 1 ${f(p1[0])} ${f(p1[1])} Z`;
          o.push(h.path(bord, h.a.blanc));
          o.push(h.path(bord, h.a.arete));
          // filet de sable, de la lèvre à la bouche du sachet
          const lev = [coins[0], coins[1]].reduce((m, c) => (c[1] > m[1] ? c : m));
          for (let i = 0; i < 7; i++) {
            const t = (i + 0.5) / 7;
            o.push(h.cercle(lev[0] + (sx - lev[0]) * t + (i % 2 ? 1.2 : -1.2), lev[1] + (my - 2 - lev[1]) * t, 0.9, h.a.plein));
          }

          // étalon fini, fermé et marqué, posé sur la table
          const x = g.xs, yb = g.table;
          const fini = `M ${f(x - 8)} ${f(yb - 46)} C ${f(x - 14)} ${f(yb - 36)} ${f(x - 25)} ${f(yb - 30)} ${f(x - 25)} ${f(yb - 12)} Q ${f(x - 25)} ${f(yb)} ${f(x)} ${f(yb)} Q ${f(x + 25)} ${f(yb)} ${f(x + 25)} ${f(yb - 12)} C ${f(x + 25)} ${f(yb - 30)} ${f(x + 14)} ${f(yb - 36)} ${f(x + 8)} ${f(yb - 46)} Z`;
          o.push(h.path(fini, h.a.blanc));
          o.push(h.path(fini, h.a.arete));
          o.push(h.path(`M ${f(x - 8)} ${f(yb - 46)} l -5 -8 M ${f(x - 8)} ${f(yb - 46)} l 16 0 l 5 -8`, h.a.detail));
          o.push(h.rect(x - 9, yb - 49, 18, 4, h.a.plein));
          o.push(h.texte(x, yb - 13, '2 kg'));
          return o.join('\n');
        },
        renvois: (z) => {
          const g = E(z);
          const coins = [[g.pcx + 14, g.pcy - 16], [g.pcx + 14, g.pcy + 16], [g.pcx - 14, g.pcy + 16], [g.pcx - 14, g.pcy - 16]].map(g.rot);
          const droite = coins.reduce((m, c) => (c[0] > m[0] ? c : m));
          return [
            { n: 9, rond: [g.xl - 84, g.sy - 24], cible: [g.xl - 43, g.sy + 1], texte: 'bouteille de 2 L à ras bord : 2 kg' },
            { n: 10, rond: [g.xl + 72, g.sy + 38], cible: [g.xl + 42, g.sy + 22], texte: 'carré de toile noué aux quatre coins' },
            { n: 11, rond: [droite[0] + 30, droite[1] - 6], cible: [droite[0] + 1, droite[1]], texte: 'sable versé jusqu’à l’équilibre' },
            { n: 12, rond: [g.xs, g.table - 76], cible: [g.xs, g.table - 50], texte: 'sachet fermé, marqué au marqueur' },
          ];
        },
      },
    },
  };
};
