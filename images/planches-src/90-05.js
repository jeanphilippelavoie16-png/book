// 90-05 — La traverse de fortune (ch. 90, étape 21 « Traverse cassée » ; §9, étape 2 et
// « Remplacer une pièce de bois en route » ; la ligature : racine d'épinette fendue).
// Aucune cote : le chapitre ne donne ni le diamètre du jeune arbre ni la longueur à amincir.
//
// Le montage, suivi de bout en bout :
//  - Les flancs qui rentrent poussent le plat-bord contre le plein du bois : la traverse
//    travaille en compression, le bout du plein bute sur la face intérieure du plat-bord.
//  - Les flancs qui s'écartent tirent sur la boucle : la bande du dessus est d'un seul bois
//    avec la traverse, le bout revenu dessous est serré contre elle par la ligature.
//  - Porté sur la nuque (étape 23), le plat-bord pend dans le bas de la boucle, qui revient
//    sous la traverse et y est ligaturé.
//  - Sur un canot fini, le flanc est lacé au plat-bord : le bout repasse à l'intérieur sous
//    le plat-bord à travers le flanc, comme le laçage, au-dessus de l'eau.

module.exports = (h) => {
  const rad = d => d * Math.PI / 180;
  const arc = (cx, cy, r, a0, a1, n = 28) => {
    const o = [];
    for (let i = 0; i <= n; i++) {
      const a = rad(a0 + (a1 - a0) * i / n);
      o.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
    }
    return o;
  };
  const cubique = (p0, c1, c2, p3, n = 24) => {
    const o = [];
    for (let i = 0; i <= n; i++) {
      const t = i / n, u = 1 - t;
      o.push([
        u * u * u * p0[0] + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * p3[0],
        u * u * u * p0[1] + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * p3[1],
      ]);
    }
    return o;
  };
  // Bande d'épaisseur e autour d'une ligne médiane : polygone fermé.
  const bande = (pts, e) => {
    const g = [], d = [];
    pts.forEach((p, i) => {
      const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
      const tx = b[0] - a[0], ty = b[1] - a[1], L = Math.hypot(tx, ty) || 1;
      const nx = -ty / L, ny = tx / L;
      g.push([p[0] + nx * e / 2, p[1] + ny * e / 2]);
      d.push([p[0] - nx * e / 2, p[1] - ny * e / 2]);
    });
    return g.concat(d.reverse());
  };
  const bois = h.a.hachure('bois', 'aucun');

  // Plat-bord en coupe : bout d'un jeune arbre, cernes et cœur.
  function platbord(cx, cy, r) {
    const o = [h.cercle(cx, cy, r, h.a.blanc), h.cercle(cx, cy, r, h.a.contour)];
    if (r > 14) {
      o.push(h.cercle(cx, cy, r * 0.62, h.a.fin));
      o.push(h.cercle(cx, cy, r * 0.3, h.a.fin));
    }
    o.push(h.cercle(cx, cy, Math.max(1.2, r * 0.05), h.a.plein));
    return o.join('\n');
  }

  // ── Géométrie d'un bout, côté droit : plat-bord en (gx, yg) de rayon rg ; flanc d'épaisseur
  // s lacé à l'extérieur ; bande amincie d'épaisseur t, de R1 à R2 autour du plat-bord.
  function geo(gx, yg, rg, s, t) {
    const R1 = rg + s, R2 = R1 + t;
    return { gx, yg, rg, s, t, R1, R2, face: gx - rg };
  }
  // La boucle autour du plat-bord droit, de dessus à dessous. Posée à même le bois en haut,
  // par-dessus le flanc sur le côté extérieur ; elle descend dehors le long du flanc, puis
  // rentre à travers le flanc, sous le plat-bord, et revient sous la traverse.
  function boucleMed(gx, yg, rg, s, t, n = 36) {
    const w = a => a < -66 ? (a + 90) / 24 : 1;
    const o = [];
    for (let i = 0; i <= n; i++) {
      const a = -90 + 90 * i / n, r = rg + s * w(a) + t / 2;
      o.push([gx + r * Math.cos(rad(a)), yg + r * Math.sin(rad(a))]);
    }
    const rc = rg + s + t / 2, yb = yg + rg + t / 2;
    o.push([gx + rc, yg + rg * 0.7]);
    return densifie(o.concat(cubique([gx + rc, yg + rg * 0.7], [gx + rc, yb], [gx + rg * 0.3, yb], [gx, yb], 16).slice(1)), 1.5);
  }
  function boucle(gx, yg, rg, s, t) {
    const m = boucleMed(gx, yg, rg, s, t), P = bande(m, t), k = m.length;
    return { int: P.slice(0, k), ext: P.slice(k).reverse() };
  }
  const densifie = (pts, pas = 1) => {
    const o = [pts[0]];
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1], b = pts[i], n = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / pas));
      for (let k = 1; k <= n; k++) o.push([a[0] + (b[0] - a[0]) * k / n, a[1] + (b[1] - a[1]) * k / n]);
    }
    return o;
  };
  const dedans = (p, poly) => {
    let c = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const [xi, yi] = poly[i], [xj, yj] = poly[j];
      if ((yi > p[1]) !== (yj > p[1]) && p[0] < (xj - xi) * (p[1] - yi) / (yj - yi) + xi) c = !c;
    }
    return c;
  };
  // Le flanc coupé net là où la bande le traverse : le morceau du haut (lacé au plat-bord,
  // jusqu'à la bande) et celui du bas (la coque). Seule la partie qui rentre compte.
  function flancTroue(pts, gx, yg, rg, s, t, marge) {
    const m = boucleMed(gx, yg, rg, s, t), i0m = m.findIndex(p => p[1] > yg + rg * 0.7);
    const zone = bande(m.slice(i0m), t + 2 * marge);
    const i0 = pts.findIndex(p => dedans(p, zone));
    let i1 = i0;
    while (i1 < pts.length && dedans(pts[i1], zone)) i1++;
    return { haut: pts.slice(0, i0), bas: pts.slice(i1), trou: pts[Math.round((i0 + i1) / 2)] };
  }

  // ── La pièce ─────────────────────────────────────────────────────────────────────────
  function Gp(z) {
    const x0 = 34, x1 = z.l - 120, yc = Math.round(z.h * 0.42), D = 24, t = 4;
    const Lt = Math.round((x1 - x0) * 0.2);
    const yt = yc - D / 2, xs1 = x1 - Lt, L = x1 - (xs1 + 12), rb = L / rad(95);
    return { x0, x1, yc, D, t, Lt, yt, yb: yc + D / 2, xs0: x0 + Lt, xs1, rb, cxb: xs1 + 12, cyb: yt + t / 2 + rb };
  }
  function piece(z) {
    const { x0, x1, yc, D, t, yt, yb, xs0, xs1 } = Gp(z);
    const o = [];
    const d = `M ${x0} ${yt} L ${x1} ${yt} L ${x1} ${yt + t * 0.7} L ${xs1 + 12} ${yt + t} ` +
      `C ${xs1 + 3} ${yt + t} ${xs1} ${yt + t + 4} ${xs1} ${yb} L ${xs0} ${yb} ` +
      `C ${xs0} ${yt + t + 4} ${xs0 - 3} ${yt + t} ${xs0 - 12} ${yt + t} L ${x0} ${yt + t * 0.7} Z`;
    o.push(h.path(d, h.a.blanc));
    // Fil du bois sur le plein.
    o.push(h.ligne(xs0 + 10, yc - 3, xs1 - 30, yc - 3, h.a.fin));
    o.push(h.ligne(xs0 + 40, yc + 4, xs1 - 10, yc + 4, h.a.fin));
    // Facettes du couteau sur les rampes.
    [xs0 - 5, xs1 + 5].forEach((x, k) => {
      const sg = k ? 1 : -1;
      o.push(h.path(`M ${x} ${yt + t + 1} Q ${x - sg * 2} ${yt + t + 6} ${x - sg * 6} ${yb - 3}`, h.a.fin));
    });
    o.push(h.path(d, h.a.contour));
    // Le bout droit qui plie : position fléchie au trait fin.
    const { rb, cxb, cyb } = Gp(z);
    const med = arc(cxb, cyb, rb, -90, 5, 20);
    o.push(h.chemin(bande(med, t * 0.85), h.a.blanc, true));
    o.push(h.chemin(bande(med, t * 0.85), h.a.fin, true));
    const bout = med[med.length - 1];
    o.push(h.fleche(`M ${x1 + 8} ${yt + t + 4} Q ${bout[0] + 22} ${yt + 16} ${bout[0] + 8} ${bout[1] - 8}`));
    return o.join('\n');
  }

  // ── En travers du canot ──────────────────────────────────────────────────────────────
  function Gt(z) {
    const cx = z.l / 2, rg = 9, s = 2, t = 3.5, yg = 30;
    const ybot = z.h - 8;
    const W = Math.min(z.l - 140, 2.6 * (ybot - yg));
    const gxR = cx + W / 2, gxL = cx - W / 2;
    const R = geo(gxR, yg, rg, s, t);
    return { cx, rg, s, t, yg, gxR, gxL, R, ybot, nL: 5, dr: 1.7 };
  }
  function travers(z) {
    const G = Gt(z), { cx, rg, s, t, yg, gxR, gxL, ybot, nL, dr } = G;
    const { R1, R2 } = G.R;
    const o = [];
    const mir = p => [2 * cx - p[0], p[1]];
    // Flanc (coque en coupe) : lacé au plat-bord, descend jusqu'au fond.
    const a = rg + s / 2;
    const haut = arc(gxR, yg, a, -64, 0, 16);
    const p0 = haut[haut.length - 1];
    const desc = cubique(p0, [p0[0], p0[1] + (ybot - yg) * 0.6], [p0[0] - (gxR - cx) * 0.22, ybot],
      [cx + (gxR - cx) * 0.3, ybot]);
    const F = flancTroue(densifie(haut.concat(desc.slice(1), [[cx, ybot]]), 0.5), gxR, yg, rg, s, t, 1.6);
    const coque = F.bas.slice().reverse().map(mir).concat(F.bas.slice(1));
    o.push(h.chemin(bande(coque, s + 0.6), h.a.plein, true));
    [F.haut, F.haut.map(mir)].forEach(m => o.push(h.chemin(bande(m, s + 0.6), h.a.plein, true)));
    // Plats-bords.
    o.push(platbord(gxL, yg, rg));
    o.push(platbord(gxR, yg, rg));
    // Traverse : le plein entre les plats-bords, la bande amincie par-dessus et autour.
    const xtip = gxR - rg - 8 - nL * (2 * dr + 1) - 10;
    const B = boucle(gxR, yg, rg, s, t);
    const Bg = { int: B.int.map(mir).reverse(), ext: B.ext.map(mir).reverse() };
    const ext = [[2 * cx - xtip, yg + rg + t * 0.65]].concat(Bg.ext, B.ext, [[xtip, yg + rg + t * 0.65]]);
    const int = [[2 * cx - xtip, yg + rg]].concat(Bg.int, B.int, [[xtip, yg + rg]]);
    const strip = ext.concat(int.slice().reverse());
    const plein = [[gxL + rg, yg - rg], [gxR - rg, yg - rg], [gxR - rg, yg + rg], [gxL + rg, yg + rg]];
    [plein, strip].forEach(p => { o.push(h.chemin(p, h.a.blanc, true)); o.push(h.chemin(p, bois, true)); });
    o.push(h.chemin(ext, h.a.contour));
    o.push(h.chemin(int.slice(0, 1).concat(Bg.int, [[gxL + rg, yg - rg]]), h.a.contour));
    o.push(h.chemin([[gxR - rg, yg - rg]].concat(B.int, [[xtip, yg + rg]]), h.a.contour));
    o.push(h.ligne(gxL + rg, yg - rg, gxL + rg, yg + rg, h.a.contour));
    o.push(h.ligne(gxR - rg, yg - rg, gxR - rg, yg + rg, h.a.contour));
    o.push(h.ligne(2 * cx - xtip, yg + rg, xtip, yg + rg, h.a.contour));
    o.push(h.ligne(xtip, yg + rg, xtip, yg + rg + t * 0.65, h.a.contour));
    o.push(h.ligne(2 * cx - xtip, yg + rg, 2 * cx - xtip, yg + rg + t * 0.65, h.a.contour));
    // Ligatures en coupe.
    for (let i = 0; i < nL; i++) {
      const x = gxR - rg - 8 - i * (2 * dr + 1);
      [x, 2 * cx - x].forEach(xx => {
        o.push(h.cercle(xx, yg - rg - t - dr - 0.3, dr, h.a.plein));
        o.push(h.cercle(xx, yg + rg + t + dr + 0.3, dr, h.a.plein));
      });
    }
    return o.join('\n');
  }

  // ── En coupe : le bout autour du plat-bord ───────────────────────────────────────────
  function Gd(z) {
    const rg = 34, s = 4, t = 9;
    const gx = z.l - 82, yg = Math.round(z.h * 0.42);
    const G = geo(gx, yg, rg, s, t);
    const nL = 7, dr = 3.5, pas = 2 * dr + 1;
    const xL0 = G.face - 16, xLn = xL0 - (nL - 1) * pas;
    return Object.assign(G, { xb: 14, nL, dr, pas, xL0, xLn, xtap: xLn - 10, xtip: xLn - 32 });
  }
  function detail(z) {
    const G = Gd(z), { gx, yg, rg, s, t, R2, face, xb, nL, dr, pas, xL0, xtap, xtip } = G;
    const o = [];
    // Flanc : lacé au plat-bord, coupé à la ligne du plat-bord, descend hors de la vue.
    const a = rg + s / 2;
    const haut = arc(gx, yg, a, -64, 0, 20);
    const p0 = haut[haut.length - 1];
    const bas = cubique(p0, [p0[0], p0[1] + 40], [p0[0] - 2, z.h - 30], [p0[0] - 5, z.h - 2], 16);
    const F = flancTroue(densifie(haut.concat(bas.slice(1))), gx, yg, rg, s, t, 4);
    [F.haut, F.bas].forEach(m => o.push(h.chemin(bande(m, s), h.a.plein, true)));
    o.push(platbord(gx, yg, rg));
    // La bande amincie : d'un bois avec la traverse, par-dessus, autour, revenue dessous.
    const B = boucle(gx, yg, rg, s, t);
    const ext = [[xb, yg - rg - t]].concat(B.ext, [[xtap, yg + rg + t], [xtip, yg + rg + t * 0.6]]);
    const int = [[xb, yg - rg], [face, yg - rg]].concat(B.int, [[xtip, yg + rg]]);
    const plein = [[xb, yg - rg], [face, yg - rg], [face, yg + rg], [xb, yg + rg]];
    [plein, ext.concat(int.slice().reverse())].forEach(p => {
      o.push(h.chemin(p, h.a.blanc, true)); o.push(h.chemin(p, bois, true));
    });
    o.push(h.chemin(ext, h.a.contour));
    o.push(h.chemin(int.slice(1), h.a.contour));
    o.push(h.ligne(xtip, yg + rg, xtip, yg + rg + t * 0.6, h.a.contour));
    o.push(h.ligne(face, yg - rg, face, yg + rg, h.a.contour));
    o.push(h.ligne(xb, yg + rg, xtip, yg + rg, h.a.contour));
    // Cassure à gauche : la traverse continue jusqu'à l'autre plat-bord.
    const zz = [];
    for (let i = 0; i <= 8; i++) zz.push([xb + (i % 2 ? 3 : -3), yg - rg - t + (2 * rg + t) * i / 8]);
    o.push(h.chemin(zz, h.a.arete));
    // Ligature en coupe : chaque tour coupé dessus et dessous.
    for (let i = 0; i < nL; i++) {
      const x = xL0 - i * pas;
      o.push(h.cercle(x, yg - rg - t - dr - 0.5, dr, h.a.plein));
      o.push(h.cercle(x, yg + rg + t + dr + 0.5, dr, h.a.plein));
    }
    // Le sens du tour : par-dessus, dehors, dessous.
    const Rf = R2 + 13, f0 = rad(-78), f1 = rad(38);
    o.push(h.fleche(`M ${gx + Rf * Math.cos(f0)} ${yg + Rf * Math.sin(f0)} ` +
      `A ${Rf} ${Rf} 0 0 1 ${gx + Rf * Math.cos(f1)} ${yg + Rf * Math.sin(f1)}`));
    return o.join('\n');
  }

  // ── Vu de dessus ─────────────────────────────────────────────────────────────────────
  function Gs(z) {
    const rg = 34, s = 4, t = 9, R1 = rg + s, R2 = R1 + t;
    const gx = z.l - 56, yc = Math.round(z.h * 0.46);
    const D = 2 * rg + t, Ws = Math.round(D * 0.78);
    const nL = 7, dr = 3.5, pas = 2 * dr + 1, face = gx - rg;
    const xL0 = face - 16, xLn = xL0 - (nL - 1) * pas;
    return { rg, s, t, R1, R2, gx, yc, D, Ws, nL, dr, pas, face, xL0, xLn, xtip: xLn - 32, xb: 12 };
  }
  function dessus(z) {
    const { rg, s, R2, gx, yc, D, Ws, nL, dr, pas, face, xL0, xtip, xb } = Gs(z);
    const o = [];
    // Plat-bord, le long du canot ; le flanc juste dehors.
    o.push(h.rect(gx - rg, 0, 2 * rg, z.h, h.a.blanc));
    o.push(h.ligne(gx - rg, 0, gx - rg, z.h, h.a.contour));
    o.push(h.ligne(gx + rg, 0, gx + rg, z.h, h.a.contour));
    o.push(h.ligne(gx + rg + s, 0, gx + rg + s, z.h, h.a.arete));
    o.push(h.ligne(gx - 8, 6, gx - 8, z.h - 6, h.a.fin));
    o.push(h.ligne(gx + 12, 0, gx + 12, z.h, h.a.fin));
    // Le plein de la traverse.
    const y0 = yc - D / 2, y1 = yc + D / 2;
    o.push(h.rect(xb, y0, face - xb, D, h.a.blanc));
    o.push(h.ligne(xb + 10, yc - D * 0.2, face - 6, yc - D * 0.2, h.a.fin));
    o.push(h.ligne(xb + 30, yc + D * 0.18, face - 20, yc + D * 0.18, h.a.fin));
    // Le bout revenu dessous : caché.
    o.push(h.chemin([[face, yc - Ws / 2], [xtip, yc - Ws / 2], [xtip, yc + Ws / 2], [face, yc + Ws / 2]], h.a.cache));
    o.push(h.chemin([[xb, y0], [face, y0], [face, y1], [xb, y1]], h.a.contour));
    // La bande amincie par-dessus le plat-bord, qui tourne vers le bas au bord extérieur.
    const bd = [[face, yc - Ws / 2], [gx + R2 - 6, yc - Ws / 2], [gx + R2, yc - Ws / 2 + 5],
      [gx + R2, yc + Ws / 2 - 5], [gx + R2 - 6, yc + Ws / 2], [face, yc + Ws / 2]];
    o.push(h.chemin(bd, h.a.blanc, true));
    o.push(h.chemin(bd, h.a.contour));
    o.push(h.ligne(face + 12, yc - 5, gx + R2 - 14, yc - 5, h.a.fin));
    o.push(h.ligne(gx + R2 - 7, yc - Ws / 2 + 3, gx + R2 - 7, yc + Ws / 2 - 3, h.a.fin));
    // Tours de ligature.
    for (let i = 0; i < nL; i++) {
      const x = xL0 - i * pas;
      o.push(h.rect(x - dr, y0 - 2, 2 * dr, D + 4, h.a.blanc));
      o.push(h.rect(x - dr, y0 - 2, 2 * dr, D + 4, h.a.detail));
    }
    const zz = [];
    for (let i = 0; i <= 8; i++) zz.push([xb + (i % 2 ? 3 : -3), y0 + D * i / 8]);
    o.push(h.chemin(zz, h.a.arete));
    return o.join('\n');
  }

  return {
    ref: '90-05',
    titre: 'La traverse de fortune',
    desc: 'Une traverse cassée remplacée par un jeune arbre. La pièce : les deux bouts amincis au couteau croche jusqu’à ce qu’ils plient. En travers du canot : la traverse posée d’un plat-bord à l’autre, chaque bout enroulé autour du plat-bord. En coupe : le plein du bois bute contre le plat-bord ; le bout aminci, d’un seul bois avec la traverse, passe par-dessus le plat-bord, redescend dehors, repasse dessous et revient sous la traverse, côté intérieur, où une ligature de racine d’épinette fendue le serre contre elle. Vu de dessus : les tours de ligature prennent la traverse et le bout revenu dessous, caché.',
    format: 'pleine',
    disposition: [['piece'], ['travers'], ['detail', 'dessus']],
    hauteurs: [0.55, 0.8, 1.45],
    largeurs: [[1], [1], [1.5, 1]],
    vues: {
      piece: {
        titre: 'La pièce : un jeune arbre, les deux bouts amincis',
        dessin: z => piece(z),
        renvois: z => {
          const P = Gp(z);
          const mid = (P.xs0 + P.xs1) / 2;
          return [
            { n: 1, rond: [mid, P.yb + 28], cible: [mid, P.yc + 3], texte: 'jeune arbre' },
            { n: 2, rond: [P.x0 + 22, P.yb + 28], cible: [P.x0 + 44, P.yt + P.t - 1], texte: 'aminci au couteau croche' },
            { n: 3, rond: [P.cxb + P.rb + 70, P.yb + 28], cible: [P.cxb + P.rb * Math.cos(rad(-30)) + 2, P.cyb + P.rb * Math.sin(rad(-30))], texte: 'aminci jusqu’à ce qu’il plie' },
          ];
        },
      },
      travers: {
        titre: 'En travers du canot : la traverse posée',
        dessin: z => travers(z),
        renvois: z => {
          const G = Gt(z);
          return [
            { n: 4, rond: [G.gxR + 36, G.yg + 36], cible: [G.gxR + 3, G.yg + 4], texte: 'plat-bord' },
            { n: 5, rond: [G.cx, G.yg + 46], cible: [G.cx, G.yg + 4], texte: 'tient les flancs' },
          ];
        },
      },
      detail: {
        titre: 'En coupe : le bout autour du plat-bord',
        dessin: z => detail(z),
        renvois: z => {
          const G = Gd(z);
          const a = rad(-40), Rm = (G.R1 + G.R2) / 2;
          return [
            { n: 6, rond: [G.gx + 10, 16], cible: [G.gx + Rm * Math.cos(a) - 2, G.yg + Rm * Math.sin(a)], texte: 'dessus, dehors, dessous' },
            { n: 7, rond: [G.face - 6, G.yg - G.rg - G.t - 34], cible: [G.face - 4, G.yg - 8], texte: 'le plein bute sur le plat-bord' },
            { n: 8, rond: [G.face - 8, G.yg + G.rg + G.t + 34], cible: [G.face - 6, G.yg + G.rg + G.t / 2], texte: 'revient sous la traverse' },
            { n: 9, rond: [G.xLn - 20, G.yg + G.rg + G.t + 34], cible: [G.xLn + G.pas, G.yg + G.rg + G.t + G.dr + 0.5], texte: 'racine d’épinette fendue' },
            { n: 10, rond: [G.gx + 58, G.yg + 96], cible: [G.gx + G.rg + 2, G.yg + 80], texte: 'flanc du canot' },
            { n: 13, rond: [G.gx + 64, G.yg + 64], cible: [G.gx + G.rg + 6, G.yg + G.rg + 2], texte: 'passe le flanc, sous le bord' },
          ];
        },
      },
      dessus: {
        titre: 'Vu de dessus',
        dessin: z => dessus(z),
        renvois: z => {
          const G = Gs(z);
          return [
            { n: 11, rond: [G.xL0 - 3 * G.pas, G.yc - G.D / 2 - 30], cible: [G.xL0 - 3 * G.pas, G.yc - G.D / 2 - 1], texte: 'chaque tour prend les deux' },
            { n: 12, rond: [G.xtip + 10, G.yc + G.D / 2 + 30], cible: [G.xtip + 1, G.yc + G.Ws / 2 - 6], texte: 'bout revenu dessous, caché' },
          ];
        },
      },
    },
  };
};
