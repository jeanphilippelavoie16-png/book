// Planche 67-14 — la pesée par substitution (ch. 67, §9 « Peser par substitution, ce qui corrige un
// fléau mal fait » ; ch. 68, §9.1 « La pesée par substitution »).
// Le fléau est celui de la 67-09 (latte, piquets, billot, plateaux de toile) : mêmes formes, plus
// petit. Deux temps, même cadrage : la viande dans le plateau de gauche, du sable versé dans celui de
// droite jusqu'à l'équilibre ; puis la viande ôtée, et des étalons dans le MÊME plateau de gauche
// jusqu'au même équilibre, sans toucher au sable. Les étalons sont des sachets fermés et marqués,
// comme à la 67-09 ; les marques (1 kg, 500 g) sont un exemple, pas une donnée du chapitre.
// Cette planche devait être une vignette de plus sur la 67-09 ; la 67-09 est pleine (douze renvois,
// la légende à deux colonnes de six), et ses vues ne rapetissent pas sans casser : elle reste telle
// quelle et la pesée par substitution prend sa demi-page, au paragraphe qui la décrit.
// La charte : la latte et la viande au contour fort ; le flanc droit du billot à l'ombre. Le rouge :
// le sable qu'on verse (le geste du premier temps), la viande qu'on ôte (le geste du second), et le
// sable de droite qu'on ne touche pas (le point à contrôler).
module.exports = (h) => {
  const f = (v) => (+v).toFixed(1);
  const ficelle = (x1, y1, x2, y2) => h.path(`M ${f(x1)} ${f(y1)} L ${f(x2)} ${f(y2)}`, h.a.detail);

  // Latte vue de face : dessus à y, hauteur e, entailles en V (profondeur p, demi-ouverture w)
  const latte = (x0, x1, y, e, xs, p, w) => {
    const pts = [[x0, y]];
    xs.forEach(x => pts.push([x - w, y], [x, y + p], [x + w, y]));
    pts.push([x1, y], [x1, y + e], [x0, y + e]);
    return [h.chemin(pts, h.a.blanc, true), h.chemin(pts, h.a.contour, true)];
  };
  // Piquet de face, encoche en V au sommet, planté à yb
  const piquet = (cx, ys, vb, yb, m, v) => {
    const pts = [[cx - m, yb], [cx - m, ys], [cx - v, ys], [cx, vb], [cx + v, ys], [cx + m, ys], [cx + m, yb]];
    return [h.chemin(pts, h.a.blanc, true), h.chemin(pts, h.a.arete), h.ligne(cx - m * 0.35, vb + 12, cx - m * 0.3, yb - 6, h.a.fin)];
  };
  // Billot debout, le flanc droit à l'ombre
  const billot = (cx, yt, yb, r) => {
    const o = [
      h.path(`M ${f(cx - r)} ${f(yt)} L ${f(cx - r)} ${f(yb)} L ${f(cx + r)} ${f(yb)} L ${f(cx + r)} ${f(yt)} Z`, h.a.blanc),
      h.path(`M ${f(cx + 0.45 * r)} ${f(yt)} L ${f(cx + r)} ${f(yt)} L ${f(cx + r)} ${f(yb)} L ${f(cx + 0.45 * r)} ${f(yb)} Z`, h.a.ombre),
      h.path(`M ${f(cx - r)} ${f(yt)} L ${f(cx - r)} ${f(yb)} M ${f(cx + r)} ${f(yb)} L ${f(cx + r)} ${f(yt)}`, h.a.arete),
      h.ellipse(cx, yt, r, 4.5, h.a.blanc),
      h.ellipse(cx, yt, r, 4.5, h.a.arete),
    ];
    [-0.6, -0.15, 0.3].forEach(k => {
      const x = cx + k * r;
      o.push(h.path(`M ${f(x)} ${f(yt + 8)} C ${f(x + 3)} ${f(yt + 14)} ${f(x - 3)} ${f(yb - 10)} ${f(x + 1)} ${f(yb - 3)}`, h.a.detail));
    });
    return o;
  };

  // La géométrie d'une vignette ; les deux sont cadrées pareil.
  const G = (z) => {
    const cx = z.l / 2 + 8, bt = 26, e = 11, p = 6, w = 3;
    const L2 = Math.min(z.l / 2 - 52, 112);
    const x0 = cx - L2, x1 = cx + L2, xl = x0 + 11, xr = x1 - 11;
    const hy = bt + 4, ky = bt + e + 10, sy = ky + 70;
    const table = z.h - 6, bb = table - 34, br = 26, tw = 44;
    return { cx, bt, e, p, w, L2, x0, x1, xl, xr, hy, ky, sy, table, bb, br, tw };
  };
  // un plateau de toile noué aux quatre coins, son contenu peint avant la toile
  const toile = (x, ky, sy, tw, contenu) => {
    const o = [];
    const cL = [x - tw, sy], cR = [x + tw, sy], fond = sy + tw * 0.48;
    o.push(ficelle(x, ky, cL[0], cL[1]), ficelle(x, ky, cR[0], cR[1]));
    o.push(...contenu);
    const poche = `M ${f(cL[0])} ${f(cL[1])} Q ${f(x)} ${f(fond)} ${f(cR[0])} ${f(cR[1])} Q ${f(x + tw * 0.92)} ${f(fond)} ${f(x)} ${f(fond)} Q ${f(x - tw * 0.92)} ${f(fond)} ${f(cL[0])} ${f(cL[1])} Z`;
    o.push(h.path(poche, h.a.blanc), h.path(poche, h.a.arete));
    o.push(h.path(`M ${f(x - tw * 0.8)} ${f(sy + 6)} Q ${f(x - tw * 0.5)} ${f(sy + tw * 0.34)} ${f(x - tw * 0.15)} ${f(sy + tw * 0.4)}`, h.a.detail));
    o.push(h.path(`M ${f(x + tw * 0.8)} ${f(sy + 6)} Q ${f(x + tw * 0.5)} ${f(sy + tw * 0.34)} ${f(x + tw * 0.15)} ${f(sy + tw * 0.4)}`, h.a.detail));
    [cL, cR].forEach(([cx, cy], i) => {
      const sg = i ? 1 : -1;
      o.push(h.cercle(cx, cy, 2.2, h.a.plein));
      o.push(h.path(`M ${f(cx)} ${f(cy)} l ${f(sg * 6)} ${f(-3)} M ${f(cx)} ${f(cy)} l ${f(sg * 5)} 3.5`, h.a.detail));
    });
    o.push(h.cercle(x, ky, 2.2, h.a.plein));
    return o;
  };
  // le fléau monté, sans ses plateaux
  const fleau = (g, z) => {
    const o = [];
    o.push(h.ligne(6, g.table, z.l - 6, g.table, h.a.arete));
    o.push(...billot(g.cx, g.bb, g.table, g.br));
    o.push(...latte(g.x0, g.x1, g.bt, g.e, [g.xl, g.xr], g.p, g.w));
    [g.xl, g.xr].forEach(x => o.push(h.ligne(x, g.bt + g.p, x, g.ky, h.a.detail)));
    { const t = 40 * Math.PI / 180, vb = g.hy + 3.6 / Math.sin(t); o.push(...piquet(g.cx, vb - 5 / Math.tan(t), vb, g.bb, 6, 5)); }
    o.push(h.cercle(g.cx, g.hy, 3.6, h.a.blanc), h.cercle(g.cx, g.hy, 3.6, h.a.arete), h.cercle(g.cx, g.hy, 1, h.a.plein));
    return o;
  };
  // une pièce de viande : un bloc arrondi, une veine de gras
  const viande = (x, y) => {
    const d = `M ${f(x - 28)} ${f(y)} C ${f(x - 31)} ${f(y - 15)} ${f(x - 13)} ${f(y - 22)} ${f(x + 4)} ${f(y - 20)} C ${f(x + 22)} ${f(y - 19)} ${f(x + 31)} ${f(y - 11)} ${f(x + 28)} ${f(y)} Z`;
    return [
      h.path(d, h.a.blanc), h.path(d, h.a.contour),
      h.path(`M ${f(x - 20)} ${f(y - 10)} C ${f(x - 8)} ${f(y - 15)} ${f(x + 6)} ${f(y - 7)} ${f(x + 20)} ${f(y - 12)}`, h.a.detail),
    ];
  };
  // le tas de sable dans la toile
  const sable = (x, y) => {
    const bord = `M ${f(x - 32)} ${f(y)} Q ${f(x - 15)} ${f(y - 22)} ${f(x)} ${f(y - 23)} Q ${f(x + 15)} ${f(y - 22)} ${f(x + 32)} ${f(y)}`;
    return [h.path(bord + ' Z', h.a.blanc), h.path(bord + ' Z', h.a.hachure('neige', 'aucun')), h.path(bord, h.a.arete)];
  };
  // un étalon : le sachet fermé et marqué
  const sachet = (x, yb, k, marque) => {
    const d = `M ${f(x - 8 * k)} ${f(yb - 40 * k)} C ${f(x - 13 * k)} ${f(yb - 32 * k)} ${f(x - 21 * k)} ${f(yb - 26 * k)} ${f(x - 21 * k)} ${f(yb - 10 * k)} Q ${f(x - 21 * k)} ${f(yb)} ${f(x)} ${f(yb)} Q ${f(x + 21 * k)} ${f(yb)} ${f(x + 21 * k)} ${f(yb - 10 * k)} C ${f(x + 21 * k)} ${f(yb - 26 * k)} ${f(x + 13 * k)} ${f(yb - 32 * k)} ${f(x + 8 * k)} ${f(yb - 40 * k)} Z`;
    return [
      h.path(d, h.a.blanc), h.path(d, h.a.arete),
      h.path(`M ${f(x - 8 * k)} ${f(yb - 40 * k)} l ${f(-4 * k)} ${f(-6 * k)} M ${f(x - 8 * k)} ${f(yb - 40 * k)} l ${f(16 * k)} 0 l ${f(4 * k)} ${f(-6 * k)}`, h.a.detail),
      h.rect(x - 8 * k, yb - 43 * k, 16 * k, 3.5 * k, h.a.plein),
      h.texte(x, yb - 9 * k, marque),
    ];
  };
  const yContenu = g => g.sy + g.tw * 0.38;

  // ── Premier temps : la viande contre du sable ─────────────────────────────────
  const temps1 = (z) => {
    const g = G(z), o = fleau(g, z);
    o.push(...toile(g.xl, g.ky, g.sy, g.tw, viande(g.xl, yContenu(g))));
    o.push(...toile(g.xr, g.ky, g.sy, g.tw, sable(g.xr, yContenu(g) + 2)));
    // le sable qu'on verse : une boîte penchée au-dessus du plateau de droite, un filet de grains
    const a = -2.3, pcx = g.xr + 22, pcy = g.ky + 8, hw = 11, hh = 13;
    const rot = ([x, y]) => [pcx + (x - pcx) * Math.cos(a) - (y - pcy) * Math.sin(a), pcy + (x - pcx) * Math.sin(a) + (y - pcy) * Math.cos(a)];
    const coins = [[pcx - hw, pcy - hh], [pcx + hw, pcy - hh], [pcx + hw, pcy + hh], [pcx - hw, pcy + hh]].map(rot);
    o.push(h.chemin(coins, h.a.blanc, true), h.chemin(coins, h.a.contour, true));
    const lev = [coins[0], coins[1]].reduce((m, c) => (c[1] > m[1] ? c : m));
    for (let i = 0; i < 6; i++) {
      const t = (i + 0.5) / 6;
      o.push(h.cercle(lev[0] + (g.xr + 4 - lev[0]) * t + (i % 2 ? 1 : -1), lev[1] + (yContenu(g) - 24 - lev[1]) * t, 0.9, h.a.plein));
    }
    o.push(h.geste(`M ${f(lev[0] + 18)} ${f(lev[1] - 14)} Q ${f(lev[0] + 14)} ${f(lev[1] + 4)} ${f(lev[0] + 4)} ${f(lev[1] + 10)}`));
    return { svg: o.join('\n'), g };
  };
  // ── Second temps : la viande ôtée, des étalons à sa place ─────────────────────
  const temps2 = (z) => {
    const g = G(z), o = fleau(g, z);
    const y = yContenu(g);
    o.push(...toile(g.xl, g.ky, g.sy, g.tw, [...sachet(g.xl - 14, y + 1, 0.66, '1 kg'), ...sachet(g.xl + 16, y + 1, 0.54, '500 g')]));
    o.push(...toile(g.xr, g.ky, g.sy, g.tw, sable(g.xr, y + 2)));
    // la viande ôtée, posée sur la table, à gauche du billot
    const xv = g.x0 + 4;
    o.push(...viande(xv, g.table));
    o.push(h.geste(`M ${f(g.xl - g.tw - 4)} ${f(g.sy + 4)} Q ${f(xv - 30)} ${f(g.sy + 20)} ${f(xv - 22)} ${f(g.table - 26)}`));
    // le sable de droite : on n'y touche pas
    o.push(h.controle(g.xr, y - 10, 21));
    return { svg: o.join('\n'), g, xv };
  };

  return {
    ref: '67-14',
    titre: 'La pesée par substitution',
    desc: 'Deux fois le même fléau de chalet, cadré pareil. D’abord, la viande dans le plateau de toile de gauche, et du sable versé d’une boîte dans celui de droite jusqu’à l’équilibre. '
      + 'Ensuite, la viande ôtée et posée sur la table ; dans le même plateau de gauche, des sachets étalons marqués 1 kg et 500 g jusqu’au même équilibre ; le sable de droite n’a pas bougé. '
      + 'Ce qu’on a mis dans le plateau de gauche pèse ce que pesait la viande, que les deux bras soient égaux ou non.',
    format: 'demi',
    disposition: [['t1', 't2']],
    vues: {
      t1: {
        titre: 'La viande contre du sable',
        dessin: z => temps1(z).svg,
        renvois: (z) => {
          const g = temps1(z).g;
          return [
            { n: 1, rond: [14, g.sy - 22], cible: [g.xl - 20, yContenu(g) - 12], texte: 'la viande dans le plateau de gauche' },
            { n: 2, rond: [g.xr + g.tw + 2 > z.l - 12 ? z.l - 12 : g.xr + g.tw + 2, yContenu(g) + 34], cible: [g.xr + 18, yContenu(g) - 6], texte: 'du sable à droite, jusqu’à l’équilibre' },
          ];
        },
      },
      t2: {
        titre: 'Puis des étalons à sa place',
        dessin: z => temps2(z).svg,
        renvois: (z) => {
          const g = temps2(z).g;
          return [
            { n: 3, rond: [g.xl + g.tw + 12, g.sy + 40], cible: [g.xl + 22, yContenu(g) - 12], texte: 'étalons dans le même plateau' },
            { n: 4, rond: [g.xr + g.tw + 2 > z.l - 12 ? z.l - 12 : g.xr + g.tw + 2, g.ky + 6], cible: [g.xr + 14, yContenu(g) - 28], texte: 'le même sable, sans y toucher' },
          ];
        },
      },
    },
  };
};
