// Planche 99-11 — Le maïs à la lessive de cendre (chapitre 99, étape 22).
// Une séquence de six vues, dans l'ordre du geste : tamiser la cendre ; faire gonfler le maïs au
// chaudron, l'eau de rinçage prête à côté, puis verser la cendre ; les pointes noires qui flottent
// et le grain sorti à la cuillère, passé à l'eau froide ; le grain roulé entre les doigts, grossi ;
// le panier secoué dans le ruisseau ; le second bouillon dans une eau neuve.
// Le chaudron, le seau et le bol sont en coupe ; le poêle et le panier, en élévation.
// Les mains viennent de h.formes.main (la pince de profil, la prise vue du dos).
module.exports = (h) => {
  const F = h.formes, A = h.a;
  const RAD = Math.PI / 180, f1 = v => Math.round(v * 10) / 10;
  const P = p => `${f1(p[0])} ${f1(p[1])}`;
  const blanc = at => 'fill="#FFFFFF" ' + at.replace('fill="none" ', '');
  const alea = graine => { let g = graine; return () => { g = (g * 16807) % 2147483647; return (g - 1) / 2147483646; }; };
  const Tr = (cx, cy, k, ang = 0) => {
    const c = Math.cos(ang * RAD), s = Math.sin(ang * RAD);
    return p => [cx + k * (p[0] * c - p[1] * s), cy + k * (p[0] * s + p[1] * c)];
  };
  const dP = (segs, T) => segs.map(([c, ...ps]) => c + ps.map(p => P(T(p))).join(' ')).join(' ');
  const dedans = (p, poly) => {
    let d = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const [xi, yi] = poly[i], [xj, yj] = poly[j];
      if ((yi > p[1]) !== (yj > p[1]) && p[0] < (xj - xi) * (p[1] - yi) / (yj - yi) + xi) d = !d;
    }
    return d;
  };
  // des points semés dans un polygone : la cendre qui tombe, la poussière
  const semis = (rnd, poly, n, r) => {
    const xs = poly.map(p => p[0]), ys = poly.map(p => p[1]);
    const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
    const out = [];
    let essais = 0;
    while (out.length < n && essais++ < n * 40) {
      const p = [x0 + rnd() * (x1 - x0), y0 + rnd() * (y1 - y0)];
      if (dedans(p, poly)) out.push(h.cercle(p[0], p[1], r * (0.7 + 0.5 * rnd()), A.plein));
    }
    return out.join('');
  };

  // ─── le grain de maïs à grain dur : la couronne en haut, la pointe noire en bas ─────────
  // Unités du grain : 10 de haut sans la pointe ; k = unités de vue par unité de grain.
  const CORPS = [['M', [-4, -1.5]], ['C', [-4.2, -4.6], [-1.5, -5.2], [0, -5.2]], ['C', [1.5, -5.2], [4.2, -4.6], [4, -1.5]],
    ['C', [3.8, 1], [2.4, 3], [1.5, 4]], ['L', [-1.5, 4]], ['C', [-2.4, 3], [-3.8, 1], [-4, -1.5]], ['Z']];
  const POINTE = [['M', [-1.5, 4]], ['L', [1.5, 4]], ['L', [0.8, 5.9]], ['L', [-0.8, 5.9]], ['Z']];
  const POINTE_SEULE = [['M', [-1.5, -0.95]], ['L', [1.5, -0.95]], ['L', [0.8, 0.95]], ['L', [-0.8, 0.95]], ['Z']];
  const GERME = [['M', [0, 3.2]], ['C', [-2.2, 2.3], [-2.1, -1.5], [0, -2.1]], ['C', [2.1, -1.5], [2.2, 2.3], [0, 3.2]], ['Z']];
  const grain = (x, y, k, ang, o = {}) => {
    const T = Tr(x, y, k, ang), out = [];
    if (o.pointe !== false) out.push(h.path(dP(POINTE, T), A.plein));
    out.push(h.path(dP(CORPS, T), blanc(o.trait || A.detail)));
    if (o.germe) out.push(h.path(dP(GERME, T), A.fin));
    return out.join('');
  };
  const pointe = (x, y, k, ang) => h.path(dP(POINTE_SEULE, Tr(x, y, k, ang)), A.plein);

  // un tas de grains dans un fond : largeur libre wl(y) (demi-largeur), du bas yBas au haut yHaut
  const tas = (rnd, cx, wl, yBas, yHaut, k, o = {}) => {
    const out = [];
    const pas = 6.2 * k;
    const rangs = [];
    for (let y = yBas - 4.2 * k; y >= yHaut; y -= pas) rangs.push(y);
    rangs.reverse().forEach((y, i) => {
      const hw = wl(y) - 4.6 * k;
      const dec = (i % 2) * 3.6 * k;
      for (let x = -hw + dec; x <= hw; x += 7.4 * k) {
        const ang = (rnd() - 0.5) * 150 + (rnd() < 0.3 ? 180 : 0);
        out.push(grain(cx + x + (rnd() - 0.5) * 2 * k, y + (rnd() - 0.5) * 2 * k, k, ang, o));
      }
    });
    return out.join('');
  };

  // ─── le chaudron de fonte, en coupe ────────────────────────────────────────────────────
  // cx : l'axe ; yb : le dessous ; W : la largeur au ventre ; H : la hauteur ; t : la paroi.
  const chaudron = (cx, yb, W, H, t) => {
    const top = yb - H, r = Math.min(12, H * 0.16);
    const w = y => W / 2 * (0.85 + 0.15 * Math.sin(Math.PI * Math.min(1.05, (y - top) / H * 0.95 + 0.12)));
    const ext = [[w(top) + 3, top], [w(top) + 3, top + 4]];
    const n = 14;
    for (let i = 0; i <= n; i++) { const y = top + 6 + (H - 6 - r) * i / n; ext.push([w(y), y]); }
    const wr = w(yb - r);
    for (let a = 10; a <= 90; a += 10) ext.push([wr - r + r * Math.cos(a * RAD), yb - r + r * Math.sin(a * RAD)]);
    const ri = Math.max(3, r - t);
    const wi = y => w(y) - t;
    const int = [[wi(top), top]];
    for (let i = 1; i <= n; i++) { const y = top + (H - t - ri) * i / n; int.push([wi(y), y]); }
    const wri = wi(yb - t - ri);
    for (let a = 10; a <= 90; a += 10) int.push([wri - ri + ri * Math.cos(a * RAD), yb - t - ri + ri * Math.sin(a * RAD)]);
    const D = p => [cx + p[0], p[1]], G = p => [cx - p[0], p[1]];
    const coupe = [...ext.map(D), ...ext.slice().reverse().map(G), ...int.map(G), ...int.slice().reverse().map(D)];
    // l'intérieur sous un niveau y : le polygone de ce qu'il contient
    const sous = y => {
      const pts = int.filter(p => p[1] > y);
      const bord = [wi(y), y];
      return [...[bord, ...pts].map(G), ...[bord, ...pts].slice().reverse().map(D)];
    };
    // la demi-largeur libre à la hauteur y (au fond, le coin arrondi la réduit)
    const libre = y => {
      if (y <= yb - t - ri) return wi(y);
      const dy = y - (yb - t - ri);
      return wri - ri + Math.sqrt(Math.max(0, ri * ri - dy * dy));
    };
    return { svg: h.chemin(coupe, A.hachure('metal', 'contour'), true), top, fond: yb - t, sous, libre, wi, ext: w };
  };

  // le contenu : l'eau, le maïs, les bulles, la surface
  const bouillon = (rnd, ch, cx, niveau, hautTas, k, o = {}) => {
    const out = [h.chemin(ch.sous(niveau), A.hachure('eau', 'aucun'), true)];
    out.push(tas(rnd, cx, ch.libre, ch.fond, hautTas, k, o));
    if (o.bulles) {
      for (let i = 0; i < o.bulles; i++) {
        const y = niveau + 6 + rnd() * (hautTas - niveau - 10);
        const hw = ch.wi(y) - 8;
        out.push(h.cercle(cx + (rnd() * 2 - 1) * hw, y, 1.4 + rnd() * 1.6, blanc(A.detail)));
      }
    }
    const wv = ch.wi(niveau), vag = [];
    for (let x = -wv; x <= wv + 0.1; x += 3) vag.push([cx + x, niveau + (o.calme ? 0 : 0.9 * Math.sin(x / 4))]);
    out.push(h.chemin(vag, A.arete));
    return out.join('\n');
  };

  // le dessus du poêle à bois : la plaque, le corps, la porte, les pattes (ySol : le plancher)
  const poele = (cx, y, L, ySol, tuyau) => {
    const out = [];
    const xb = cx - L / 2 + 8, lb = L - 16, yB = y + 7, hb = ySol - 9 - yB;
    if (hb > 8) {
      out.push(h.rect(xb, yB, lb, hb, A.contour));
      out.push(h.rect(xb + lb * 0.18, yB + hb * 0.2, lb * 0.5, hb * 0.6, A.arete));
      out.push(h.cercle(xb + lb * 0.62, yB + hb * 0.5, 2.4, blanc(A.arete)));
      out.push(h.rect(xb + 4, yB + hb, 9, ySol - yB - hb, A.arete));
      out.push(h.rect(xb + lb - 13, yB + hb, 9, ySol - yB - hb, A.arete));
    } else {
      out.push(h.chemin([[xb, ySol], [xb, yB], [xb + lb, yB], [xb + lb, ySol]], A.contour));
    }
    out.push(h.rect(cx - L / 2, y, L, 7, A.hachure('metal', 'contour')));
    if (tuyau) out.push(h.chemin([[tuyau[0], 0], [tuyau[0], y], [tuyau[0] + tuyau[1], y], [tuyau[0] + tuyau[1], 0]], blanc(A.contour)));
    return out.join('\n');
  };

  // le seau en coupe, posé : (x, y) le milieu du fond. niveau : fraction de la hauteur pleine.
  const seau = (x, y, Wt, Wb, H, o = {}) => {
    const out = [];
    const bord = f => -Wb / 2 - (Wt - Wb) / 2 * f;
    if (o.niveau) {
      const yN = y - H * o.niveau, xl = x + bord(o.niveau);
      const poly = [[xl, yN], [x - Wb / 2, y], [x + Wb / 2, y], [2 * x - xl, yN]];
      out.push(h.chemin(poly, A.hachure(o.contenu || 'eau', 'aucun'), true));
      out.push(h.chemin([[xl, yN], [2 * x - xl, yN]], A.arete));
    }
    if (o.tas) out.push(o.tas);
    out.push(h.chemin([[x - Wt / 2, y - H], [x - Wb / 2, y], [x + Wb / 2, y], [x + Wt / 2, y - H]], A.contour));
    if (o.anse !== false) {
      const anse = [];
      for (let i = 0; i <= 24; i++) { const a = Math.PI * i / 24; anse.push([x - Wt / 2 * Math.cos(a), y - H + 5 - Wt * 0.5 * Math.sin(a)]); }
      out.push(h.chemin(anse, A.arete));
      out.push(h.cercle(x - Wt / 2 + 1, y - H + 5, 2.2, blanc(A.arete)), h.cercle(x + Wt / 2 - 1, y - H + 5, 2.2, blanc(A.arete)));
    }
    return out.join('\n');
  };

  // le seau penché qui verse, en élévation : (x, y) le bec ; ang : de combien il penche
  const seauVerse = (x, y, Wt, Wb, H, ang) => {
    const T = Tr(x, y, 1, ang);
    // repère : le bec (le bord droit du haut) à l'origine
    const pts = [[0, 0], [Wt, 0], [(Wt + Wb) / 2, H], [(Wt - Wb) / 2, H]];
    const out = [h.chemin(pts.map(T), blanc(A.contour), true)];
    out.push(h.chemin([[1.2, 5], [Wt - 1.2, 5]].map(T), A.detail));
    out.push(h.chemin([[(Wt - Wb) / 2 + 1, H - 5], [(Wt + Wb) / 2 - 1, H - 5]].map(T), A.detail));
    out.push(h.cercle(...T([1.5, 7]), 2.2, blanc(A.arete)), h.cercle(...T([Wt - 1.5, 7]), 2.2, blanc(A.arete)));
    return out.join('\n');
  };

  // ─── les vues, calculées une fois par taille ───────────────────────────────────────────
  const cache = {};
  const vue = (nom, fab) => z => { const c = `${nom}:${z.l}:${z.h}`; return (cache[c] = cache[c] || fab(z)); };

  // 1. Tamiser la cendre : le tamis en coupe, posé au-dessus du seau.
  const tamis = vue('tamis', z => {
    const rnd = alea(11);
    const sx = z.l * 0.5, Ws = Math.min(z.l * 0.62, 150), my = z.h * 0.46;
    const out = [];
    // le seau dessous, avec la cendre fine
    const yS = z.h - 4, Hs = yS - my - 4, Wt = Ws + 4, Wb = Ws * 0.78;
    const ySommet = yS - Hs * 0.36;
    const tasSeau = [[sx - Wb / 2 - 1, yS], [sx - Wb / 2 - 3, yS - Hs * 0.22],
      ...Array.from({ length: 13 }, (_, i) => { const u = i / 12; return [sx - Wb / 2 + u * Wb, ySommet + (yS - ySommet) * 0.6 * Math.pow(2 * u - 1, 2)]; }),
      [sx + Wb / 2 + 3, yS - Hs * 0.22], [sx + Wb / 2 + 1, yS]];
    out.push(seau(sx, yS, Wt, Wb, Hs, { anse: false, tas: h.chemin(tasSeau, A.hachure('neige', 'detail'), true) }));
    // la cendre qui tombe à travers la toile
    const chute = [[sx - Ws / 2 + 12, my + 3], [sx + Ws / 2 - 12, my + 3], [sx + Ws * 0.3, ySommet - 4], [sx - Ws * 0.3, ySommet - 4]];
    out.push(semis(rnd, chute, 55, 0.75));
    // la cendre sur la toile, avec ses charbons
    const tasT = [[sx - Ws / 2 + 3, my]];
    for (let i = 0; i <= 16; i++) { const u = i / 16; tasT.push([sx - Ws / 2 + 6 + u * (Ws - 12), my - 13 * Math.sin(Math.PI * u) - 1.5 * Math.sin(9 * u)]); }
    tasT.push([sx + Ws / 2 - 3, my]);
    out.push(h.chemin(tasT, A.hachure('neige', 'detail'), true));
    const charbon = (x, y, s, a) => h.chemin([[-1, -0.6], [0.2, -1], [1.1, -0.3], [0.8, 0.8], [-0.6, 0.9], [-1.2, 0.2]].map(Tr(x, y, s, a)), A.plein, true);
    [[-0.3, 7, 4.2, 10], [-0.12, 10, 3.2, 70], [0.08, 11, 3.8, 30], [0.22, 7.5, 3, 120], [0.34, 4, 2.6, 50], [-0.38, 3, 2.8, 80]]
      .forEach(([u, dy, s, a]) => out.push(charbon(sx + u * Ws, my - dy, s, a)));
    // la toile et le cadre de bois
    out.push(`<line x1="${f1(sx - Ws / 2)}" y1="${f1(my)}" x2="${f1(sx + Ws / 2)}" y2="${f1(my)}" fill="none" stroke="#1A1A1A" stroke-width="1.6" stroke-dasharray="1.6 1.6"/>`);
    out.push(h.rect(sx - Ws / 2 - 6, my - 17, 6, 21, A.hachure('bois', 'arete')));
    out.push(h.rect(sx + Ws / 2, my - 17, 6, 21, A.hachure('bois', 'arete')));
    // secouer
    const yF = my - 30;
    out.push(`<path d="M${P([sx - 34, yF])} L${P([sx + 34, yF])}" ${A.arete} marker-start="url(#fl)" marker-end="url(#fl)"/>`);
    return { svg: out.join('\n'), sx, my, Ws, yS, Hs, ySommet };
  });

  // 2. Faire gonfler, puis verser la cendre : le chaudron sur le poêle, l'eau de rinçage à côté.
  const chaud = vue('chaud', z => {
    const rnd = alea(23);
    const ySol = z.h - 3, yP = ySol - 54, cx = z.l * 0.36;
    const W = 124, H = 80;
    const ch = chaudron(cx, yP, W, H, 5);
    const niveau = ch.top + H * 0.22;
    const tuyau = [cx + W / 2 + 18, 15];
    const out = [poele(cx + 14, yP, 200, ySol, tuyau), h.ligne(4, ySol, z.l - 4, ySol, A.arete)];
    out.push(bouillon(rnd, ch, cx, niveau, ch.fond - H * 0.42, 0.95, { bulles: 9 }));
    out.push(ch.svg);
    // la boîte de mesure penchée, et la cendre qui tombe dans l'eau
    const bec = [cx - 10, ch.top - 14];
    const T = Tr(bec[0], bec[1], 1, -66), Dm = 24, Lm = 30;
    const boite = [[-Dm / 2, 0], [Dm / 2, 0], [Dm / 2, -Lm], [-Dm / 2, -Lm]].map(T);
    const levre = T([Dm / 2, 0]);
    const chute = [[levre[0] - 2, levre[1]], [levre[0] + 3, levre[1] + 1], [levre[0] + 7, niveau - 1], [levre[0] - 5, niveau - 1]];
    out.push(semis(rnd, chute, 46, 0.8));
    out.push(h.chemin(boite, blanc(A.contour), true));
    out.push(h.chemin([[-Dm / 2, -Lm * 0.34], [Dm / 2, -Lm * 0.34]].map(T), A.detail));
    out.push(h.chemin([[-Dm / 2, -Lm * 0.67], [Dm / 2, -Lm * 0.67]].map(T), A.detail));
    const tasBoite = [[-Dm / 2 + 2, 0], [-Dm / 2 + 4, 4], [0, 5.5], [Dm / 2 - 2, 3.5], [Dm / 2, 0]].map(T);
    out.push(h.chemin(tasBoite, A.hachure('neige', 'detail'), true));
    // l'eau de rinçage, dans son seau
    const sxs = z.l * 0.86;
    out.push(seau(sxs, ySol, 52, 42, 58, { niveau: 0.78 }));
    return { svg: out.join('\n'), cx, ch, niveau, levre, sxs, ySol, yP, W, H, tuyau, T };
  });

  // 3. Les pointes noires flottent ; le grain sorti à la cuillère, passé à l'eau froide.
  const pointes = vue('pointes', z => {
    const rnd = alea(37);
    const cx = z.l * 0.30, yP = z.h - 10;
    const W = 158, H = Math.min(112, z.h - 48);
    const ch = chaudron(cx, yP, W, H, 5);
    const niveau = ch.top + H * 0.16;
    const out = [h.rect(cx - W * 0.62, yP, W * 1.24, 7, A.hachure('metal', 'contour'))];
    out.push(bouillon(rnd, ch, cx, niveau, ch.fond - H * 0.46, 1.05, { bulles: 12 }));
    // les pointes noires qui flottent
    const flot = [];
    const wv = ch.wi(niveau) - 6;
    for (let i = 0; i < 11; i++) {
      const x = cx - wv + (2 * wv) * (i + 0.2 + 0.6 * rnd()) / 11;
      flot.push([x, niveau - 0.4]);
      out.push(pointe(x, niveau - 0.6, 2.2, (rnd() - 0.5) * 70));
    }
    // deux qui montent encore
    [[-0.3, 0.45], [0.18, 0.6]].forEach(([u, v]) => out.push(pointe(cx + u * W, niveau + v * (ch.fond - H * 0.46 - niveau), 2.2, 40 * u)));
    out.push(ch.svg);
    // la cuillère : le cuilleron juste au-dessus de l'eau, le manche sur le bord
    const cb = [cx + W * 0.16, niveau - 12];
    const angM = -38, u = [Math.cos(angM * RAD), Math.sin(angM * RAD)], nrm = [-u[1], u[0]];
    const m0 = [cb[0] + 9, cb[1] - 1], m1 = [m0[0] + u[0] * 118, m0[1] + u[1] * 118];
    const manche = [[m0[0] + nrm[0] * 1.6, m0[1] + nrm[1] * 1.6], [m1[0] + nrm[0] * 2.6, m1[1] + nrm[1] * 2.6],
      [m1[0] - nrm[0] * 2.6, m1[1] - nrm[1] * 2.6], [m0[0] - nrm[0] * 1.6, m0[1] - nrm[1] * 1.6]];
    out.push(h.chemin(manche, blanc(A.arete), true));
    out.push(grain(cb[0] + 1, cb[1] - 4.5, 1.05, 12, {}));
    out.push(h.path(`M${P([cb[0] - 11, cb[1]])} A11 6 0 0 0 ${P([cb[0] + 11, cb[1]])} Z`, blanc(A.arete)));
    // vers le bol d'eau froide
    const bx = z.l * 0.83, yT = z.h - 18, rb = 36, hb = 26;
    out.push(h.ligne(bx - rb - 16, yT, bx + rb + 16, yT, A.arete));
    const bolExt = `M${P([bx - rb, yT - hb])} C${P([bx - rb, yT - 4])} ${P([bx - rb * 0.55, yT])} ${P([bx - rb * 0.4, yT])} L${P([bx + rb * 0.4, yT])} C${P([bx + rb * 0.55, yT])} ${P([bx + rb, yT - 4])} ${P([bx + rb, yT - hb])}`;
    const ni = yT - hb * 0.62, wn = rb - 4;
    out.push(h.path(`M${P([bx - wn, ni])} C${P([bx - wn, yT - 7])} ${P([bx - rb * 0.5, yT - 4])} ${P([bx - rb * 0.36, yT - 4])} L${P([bx + rb * 0.36, yT - 4])} C${P([bx + rb * 0.5, yT - 4])} ${P([bx + wn, yT - 7])} ${P([bx + wn, ni])} Z`, A.hachure('eau', 'aucun')));
    out.push(grain(bx + 3, yT - 10, 1.05, 70, {}));
    out.push(h.ligne(bx - wn, ni, bx + wn, ni, A.arete));
    out.push(h.path(bolExt, A.contour));
    const dep = [cb[0] + 10, cb[1] - 22], arr = [bx - 8, ni - 14];
    out.push(h.fleche(`M${P(dep)} Q${P([(dep[0] + arr[0]) / 2 + 10, dep[1] - 46])} ${P(arr)}`, A.arete));
    return { svg: out.join('\n'), cx, ch, niveau, flot, cb, bx, ni, yT, rb, W, H };
  });

  // 4. Le grain grossi, roulé entre le pouce et l'index : pas de main (une pince de profil cache
  // le grain), les deux flèches en sens contraires disent le geste. À côté, le même grain quand
  // c'est prêt : la pelure qui glisse, la pointe noire qui s'est détachée.
  const doigts = vue('doigts', z => {
    const k = Math.min(5.2, (z.h - 60) / 17);
    const A1 = [z.l * 0.26, z.h * 0.5], B1 = [z.l * 0.74, z.h * 0.46];
    const out = [grain(A1[0], A1[1], k, 0, { germe: true, trait: A.arete })];
    // le pouce pousse d'un côté, l'index de l'autre : le grain roule sur lui-même
    const yH = A1[1] - 5.2 * k - 9, yB = A1[1] + 5.9 * k + 9, dx = 4.6 * k;
    out.push(h.fleche(`M${P([A1[0] - dx, yH])} L${P([A1[0] + dx, yH])}`, A.arete));
    out.push(h.fleche(`M${P([A1[0] + dx, yB])} L${P([A1[0] - dx, yB])}`, A.arete));
    // prêt : le grain nu, la pelure lâche qui glisse vers le haut, la pointe tombée
    const T = Tr(B1[0], B1[1], k, 0);
    out.push(grain(B1[0], B1[1], k, 0, { pointe: false, germe: true, trait: A.arete }));
    const film = [['M', [-4.6, 0.8]], ['C', [-5.6, -3], [-3, -6.8], [0.4, -6.9]], ['C', [4, -6.9], [5.9, -4], [5.4, -0.2]],
      ['C', [4.4, 0.9], [3.6, -0.3], [2.6, 0.5]], ['C', [1.6, 1.3], [0.6, -0.2], [-0.6, 0.7]], ['C', [-1.8, 1.6], [-3, 0], [-4.6, 0.8]], ['Z']];
    out.push(h.path(dP(film.map(([c, ...ps]) => [c, ...ps.map(p => { const q = [p[0] + 1.2, p[1] - 1.9], a = 16 * RAD, d = [q[0] - 2, q[1] + 3]; return [2 + d[0] * Math.cos(a) - d[1] * Math.sin(a), -3 + d[0] * Math.sin(a) + d[1] * Math.cos(a)]; })]), T), A.detail));
    out.push(h.fleche(`M${P(T([6.4, -7.4]))} L${P(T([8.8, -8.8]))}`, A.detail));
    const Pt = [B1[0] + 1.4 * k, B1[1] + 8.8 * k];
    out.push(h.path(dP(POINTE_SEULE, Tr(Pt[0], Pt[1], k, 24)), A.plein));
    return { svg: out.join('\n'), A1, B1, k, yH, yB, dx, T, Pt };
  });

  // 5. Au ruisseau : le panier tenu par l'anse, secoué dans le courant.
  const ruisseau = vue('ruisseau', z => {
    const rnd = alea(51);
    const yE = z.h * 0.5, yF = z.h - 16;
    const out = [];
    // le lit : gravier, galets
    out.push(h.rect(0, yF, z.l, z.h - yF, A.hachure('gravier', 'aucun')));
    out.push(h.chemin([[0, yF], [z.l, yF]], A.arete));
    [[0.07, 14, 6], [0.2, 10, 5], [0.62, 16, 6], [0.78, 11, 5], [0.93, 13, 6]].forEach(([u, rx, ry]) =>
      out.push(h.ellipse(z.l * u, yF - ry * 0.55, rx, ry, blanc(A.detail))));
    // l'eau
    out.push(h.rect(0, yE, z.l, yF - yE, A.hachure('eau', 'aucun')));
    const vag = [];
    for (let x = 0; x <= z.l; x += 4) vag.push([x, yE + 1.1 * Math.sin(x / 6)]);
    out.push(h.chemin(vag, A.arete));
    // le panier
    const bx = z.l * 0.40, Wt = 124, Wb = 92, yR = yE - 8, Hb = Math.min(76, yF - 10 - yR), ry = 9;
    const yBas = yR + Hb;
    const corps = [[bx - Wt / 2, yR], [bx - Wb / 2, yBas - 6], [bx - Wb / 2 + 8, yBas], [bx + Wb / 2 - 8, yBas], [bx + Wb / 2, yBas - 6], [bx + Wt / 2, yR]];
    out.push(h.chemin(corps, blanc(A.contour), true));
    // le tressage : les montants, et les rangs de brins qui passent devant, un sur deux
    const bordX = (y, s) => { const f = (y - yR) / (yBas - 6 - yR); return bx + s * (Wt / 2 - (Wt - Wb) / 2 * Math.min(1, f)); };
    const nM = 11;
    for (let i = 1; i < nM; i++) {
      const u = i / nM;
      out.push(h.ligne(bx - Wt / 2 + u * Wt, yR + 5, bx - Wb / 2 + u * Wb, yBas - 2, A.detail));
    }
    let r = 0;
    for (let y = yR + 11; y < yBas - 5; y += 8.5, r++) {
      const xl = bordX(y, -1), xr = bordX(y, 1);
      const lm = (xr - xl) / nM;
      for (let i = 0; i < nM; i++) {
        if ((i + r) % 2) continue;
        const x0 = xl + i * lm + 0.6, x1 = x0 + lm - 1.2;
        out.push(h.path(`M${P([x0, y - 2.2])} Q${P([(x0 + x1) / 2, y - 3.4])} ${P([x1, y - 2.2])} L${P([x1, y + 2.2])} Q${P([(x0 + x1) / 2, y + 3.4])} ${P([x0, y + 2.2])} Z`, blanc(A.fin)));
      }
    }
    // le bord roulé et le maïs dedans
    const idClip = 'p9911-bord';
    out.push(`<defs><clipPath id="${idClip}"><ellipse cx="${f1(bx)}" cy="${f1(yR)}" rx="${f1(Wt / 2 - 3)}" ry="${f1(ry - 2)}"/></clipPath></defs>`);
    out.push(h.ellipse(bx, yR, Wt / 2, ry, blanc(A.contour)));
    const gr = [];
    for (let i = 0; i < 26; i++) gr.push(grain(bx + (rnd() * 2 - 1) * (Wt / 2 - 6), yR + (rnd() * 2 - 1) * (ry - 1), 1.0, rnd() * 360, {}));
    out.push(`<g clip-path="url(#${idClip})">${gr.join('')}</g>`);
    out.push(h.ellipse(bx, yR, Wt / 2 - 3, ry - 2, A.detail));
    // l'anse, tenue en haut
    const yA = yR - 36;
    const anse = (d) => { const p = []; for (let i = 0; i <= 30; i++) { const a = Math.PI * i / 30; p.push([bx - (Wt / 2 - 8 - d) * Math.cos(a), yR - (yR - yA - d) * Math.sin(a)]); } return p; };
    const bandeAnse = [...anse(0), ...anse(5).reverse()];
    out.push(h.chemin(bandeAnse, blanc(A.arete), true));
    const e = 0.42;
    const m = F.main({ x: bx, y: yA + 2.5, pose: 'prise', vue: 'dos', angle: 90, diametre: 6, echelle: e, bras: Math.max(4, (yA - 2) / e - 88) });
    // le bord de l'anse appuyé là où les doigts passent dessous
    [anse(0), anse(5)].forEach(a => { const s = a.filter(q => Math.abs(q[0] - bx) < 24); if (s.length > 1) out.push(h.chemin(s, A.contour)); });
    // l'avant-bras coupé net, les deux bords à la même hauteur
    const yCoupe = m.bras[1] + 6, idBras = 'p9911-bras';
    out.push(`<defs><clipPath id="${idBras}"><rect x="${f1(bx - 80)}" y="${f1(yCoupe)}" width="160" height="${f1(yR - yCoupe + 40)}"/></clipPath></defs>`);
    out.push(`<g clip-path="url(#${idBras})">${m.toString()}</g>`);
    // secouer, brasser
    const yS = yR - 14;
    out.push(`<path d="M${P([bx - Wt / 2 - 58, yS])} L${P([bx - Wt / 2 - 8, yS])}" ${A.arete} marker-start="url(#fl)" marker-end="url(#fl)"/>`);
    // le courant, et ce qu'il emporte
    [[yE + 16, 8, bx - Wt / 2 - 14], [yF - 18, 8, bx - Wb / 2 - 14]].forEach(([y, x0, x1]) => out.push(h.fleche(`M${P([x0, y])} L${P([x1, y])}`, A.cache)));
    [[yE + 16, bx + Wt / 2 + 8, z.l - 8], [yF - 18, bx + Wb / 2 + 8, z.l - 8]].forEach(([y, x0, x1]) => out.push(h.fleche(`M${P([x0, y])} L${P([x1, y])}`, A.cache)));
    const emporte = [];
    for (let i = 0; i < 14; i++) {
      const x = bx + Wt / 2 + 12 + rnd() * (z.l - bx - Wt / 2 - 26), y = yE + 26 + rnd() * (yF - yE - 52);
      if (i % 3 === 0) out.push(pointe(x, y, 1.6, rnd() * 180));
      else {
        const a = rnd() * 360, T = Tr(x, y, 1, a);
        out.push(h.path(`M${P(T([-4.5, 0]))} Q${P(T([0, -3.2]))} ${P(T([4.5, 0]))} Q${P(T([0, -1.2]))} ${P(T([-4.5, 0]))} Z`, blanc(A.fin)));
      }
      emporte.push([x, y]);
    }
    return { svg: out.join('\n'), bx, yR, yBas, Wt, Wb, yE, yF, yS, yA, m, emporte };
  });

  // 6. Le second bouillon : une eau neuve.
  const second = vue('second', z => {
    const rnd = alea(67);
    const cx = z.l * 0.40, yP = z.h - 12;
    const W = 118, H = 80;
    const ch = chaudron(cx, yP, W, H, 5);
    const niveau = ch.top + H * 0.26;
    const out = [h.rect(cx - W * 0.66, yP, W * 1.32, 7, A.hachure('metal', 'contour'))];
    out.push(bouillon(rnd, ch, cx, niveau, ch.fond - H * 0.4, 0.95, { bulles: 4, pointe: false }));
    out.push(ch.svg);
    // le seau penché qui verse l'eau neuve
    const bec = [cx + W * 0.18, ch.top - 26];
    out.push(seauVerse(bec[0], bec[1], 48, 32, 50, -108));
    const jet = [];
    for (let i = 0; i < 3; i++) {
      const dx = -3 + 3 * i;
      jet.push(h.path(`M${P([bec[0] + dx, bec[1] + 1])} C${P([bec[0] + dx - 4, bec[1] + 16])} ${P([bec[0] + dx - 6, niveau - 20])} ${P([bec[0] + dx - 7, niveau - 1])}`, A.detail));
    }
    out.push(jet.join(''));
    return { svg: out.join('\n'), cx, ch, niveau, bec, W, H };
  });

  return {
    ref: '99-11',
    titre: 'Le maïs à la lessive de cendre',
    desc: 'Six temps, dans l’ordre. La cendre de bois franc passée au tamis au-dessus d’un seau : les charbons restent sur la toile. Le maïs à grain dur gonflé dans l’eau bouillante d’un chaudron de fonte posé sur le poêle, le seau d’eau de rinçage tiède prêt à côté, et la cendre tamisée versée d’une boîte, un volume pour quatre d’eau. Après environ 45 minutes, les petites pointes noires du grain flottent à la surface ; un grain sorti à la cuillère passe dans un bol d’eau froide. Roulé entre le pouce et l’index, le grain perd sa pelure, et sa pointe noire, le bout qui tenait à l’épi, se détache. Le maïs versé dans un panier tenu par l’anse, secoué dans le courant d’un ruisseau qui emporte pelures et pointes. Puis un second bouillon dans une eau neuve, environ 30 minutes, et un second rinçage.',
    format: 'pleine',
    disposition: [['tamis', 'chaud'], ['pointes', 'doigts'], ['ruisseau', 'second']],
    largeurs: [[2, 3], [3, 2.3], [3, 2]],
    vues: {
      tamis: {
        titre: 'Tamiser la cendre',
        dessin: z => tamis(z).svg,
        renvois: z => {
          const v = tamis(z);
          return [
            { n: 1, rond: [v.sx - v.Ws / 2 - 4, v.my - 34], cible: [v.sx - v.Ws * 0.24, v.my - 6], texte: 'cendre de bois franc' },
          ];
        },
      },
      chaud: {
        titre: 'Faire gonfler, puis verser la cendre',
        dessin: z => chaud(z).svg,
        renvois: z => {
          const v = chaud(z);
          return [
            { n: 2, rond: [v.sxs, v.ySol - 92], cible: [v.sxs, v.ySol - 26], texte: 'l’eau de rinçage, d’avance' },
            { n: 3, rond: [v.tuyau[0] + v.tuyau[1] + 22, v.ch.top + 8], cible: [v.cx + v.W / 2 - 1, v.ch.top + v.H * 0.45], texte: 'fonte ou inox, jamais d’alu' },
            { n: 4, rond: [v.cx - v.W / 2 - 24, v.yP - 16], cible: [v.cx - v.W * 0.2, v.yP - 16], texte: 'maïs à grain dur, gonflé' },
            { n: 5, rond: [v.cx - v.W / 2 - 18, v.ch.top + 4], cible: [v.levre[0] + 1, (v.levre[1] + v.niveau) / 2], texte: 'un volume pour quatre d’eau' },
          ];
        },
      },
      pointes: {
        titre: 'Les pointes noires flottent',
        dessin: z => pointes(z).svg,
        renvois: z => {
          const v = pointes(z);
          const f = v.flot[2];
          return [
            { n: 6, rond: [v.cx - v.W / 2 - 4, v.ch.top - 22], cible: [f[0], f[1] - 1], texte: 'pointes noires, vers 45 min' },
            { n: 7, rond: [v.cb[0] + 70, 14], cible: [v.cb[0] + 40, v.cb[1] - 26], texte: 'un grain sorti à la cuillère' },
            { n: 8, rond: [v.bx + v.rb + 6, v.ni - 32], cible: [v.bx + v.rb * 0.6, v.ni + 6], texte: 'eau froide, avant les doigts' },
          ];
        },
      },
      doigts: {
        titre: 'Le grain roulé entre les doigts',
        dessin: z => doigts(z).svg,
        renvois: z => {
          const v = doigts(z);
          return [
            { n: 9, rond: [v.A1[0], v.yB + 24], cible: [v.A1[0] - v.dx * 0.5, v.yB], texte: 'rouler entre pouce et index' },
            { n: 10, rond: [v.B1[0] - 8 * v.k, v.B1[1] - 8 * v.k], cible: v.T([-3.2, -6.4]), texte: 'la pelure glisse : c’est prêt' },
            { n: 11, rond: [v.Pt[0] - 30, v.Pt[1] + 12], cible: v.Pt, texte: 'la pointe, qui tenait à l’épi' },
          ];
        },
      },
      ruisseau: {
        titre: 'Secouer au ruisseau',
        dessin: z => ruisseau(z).svg,
        renvois: z => {
          const v = ruisseau(z);
          const p = v.emporte[1];
          return [
            { n: 12, rond: [v.bx - v.Wt / 2 - 20, v.yBas - 10], cible: [v.bx - v.Wb / 2 + 4, v.yBas - 18], texte: 'le maïs dans le panier' },
            { n: 13, rond: [v.bx - v.Wt / 2 - 33, v.yS - 24], cible: [v.bx - v.Wt / 2 - 33, v.yS], texte: 'secouer et brasser' },
            { n: 14, rond: [z.l - 18, v.yE - 18], cible: [p[0], p[1]], texte: 'pelures et pointes parties' },
          ];
        },
      },
      second: {
        titre: 'Le second bouillon',
        dessin: z => second(z).svg,
        renvois: z => {
          const v = second(z);
          return [
            { n: 15, rond: [v.bec[0] + 44, v.niveau - 10], cible: [v.bec[0] - 4, v.niveau - 14], texte: 'eau neuve, environ 30 min' },
            { n: 16, rond: [v.cx - v.W / 2 - 18, v.niveau + 30], cible: [v.cx - v.W * 0.25, v.niveau + 30], texte: 'puis rincer : plus de lessive' },
          ];
        },
      },
    },
  };
};
