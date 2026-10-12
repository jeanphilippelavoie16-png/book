// Planche 94-31 — l'auge au billot et les pierres chaudes (ch. 60, §9, « Faire bouillir sans casserole »).
// Séquence : creuser aux braises, gratter le charbon entre deux passes, bouillir aux pierres.
// Aucune cote : le chapitre ne donne aucune dimension d'auge. L'échelle, c'est le couteau.

module.exports = (h) => {
  const r1 = (n) => Math.round(n * 10) / 10;
  const B = (a) => a.replace('fill="none"', 'fill="#FFFFFF"');   // trait + fond blanc
  const hasard = (graine) => { let s = graine; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; };

  // Courbe fermée lisse (Catmull-Rom) passant par les points.
  const lisse = (p) => {
    const n = p.length; let d = `M${r1(p[0][0])},${r1(p[0][1])}`;
    for (let i = 0; i < n; i++) {
      const p0 = p[(i - 1 + n) % n], p1 = p[i], p2 = p[(i + 1) % n], p3 = p[(i + 2) % n];
      d += ` C${r1(p1[0] + (p2[0] - p0[0]) / 6)},${r1(p1[1] + (p2[1] - p0[1]) / 6)} ${r1(p2[0] - (p3[0] - p1[0]) / 6)},${r1(p2[1] - (p3[1] - p1[1]) / 6)} ${r1(p2[0])},${r1(p2[1])}`;
    }
    return d + ' Z';
  };

  // Une pierre : contour irrégulier, deux ou trois grains.
  const pierre = (cx, cy, rx, ry, graine, trait = h.a.arete) => {
    const R = hasard(graine); const p = [];
    for (let i = 0; i < 9; i++) { const a = i / 9 * 2 * Math.PI; const k = 0.86 + 0.2 * R(); p.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]); }
    const grains = [0, 1, 2].map(() => { const x = cx + (R() - 0.5) * rx, y = cy + (R() - 0.3) * ry * 0.8; return h.ligne(r1(x), r1(y), r1(x + 3), r1(y + 1), h.a.detail); });
    return [h.path(lisse(p), B(trait)), ...grains].join('\n');
  };

  // Une braise : petit éclat anguleux, noir ou rougeoyant (blanc cerné).
  const braise = (cx, cy, r, graine, noire) => {
    const R = hasard(graine); const p = [];
    for (let i = 0; i < 5; i++) { const a = i / 5 * 2 * Math.PI + R(); const k = 0.6 + 0.5 * R(); p.push([cx + Math.cos(a) * r * k * 1.3, cy + Math.sin(a) * r * k * 0.8]); }
    return h.chemin(p.map(q => [r1(q[0]), r1(q[1])]), noire ? h.a.plein : B(h.a.detail), true);
  };

  // Demi-bille couchée, face fendue en dessus, vue de trois quarts.
  // xa, yf : coin avant gauche de la face plane ; L : longueur ; (ox, oy) : profondeur projetée ; R : creux du ventre.
  const bille = (xa, yf, L, ox, oy, R, graine) => {
    const P = (u, t, dy = 0) => [r1(xa + u + t * ox), r1(yf - t * oy + dy)];
    const S = (t, u, fr = 1) => {
      const tt = 0.5 + fr * (t - 0.5), s = fr * Math.sqrt(Math.max(0, 0.25 - (t - 0.5) ** 2));
      return [r1(xa + u + tt * ox), r1(yf - tt * oy + 2 * R * s)];
    };
    let ts = 0, ym = -1e9;
    for (let t = 0; t <= 1.0001; t += 0.005) { const y = S(t, 0)[1]; if (y > ym) { ym = y; ts = t; } }
    const arc = (u, t0, t1, fr = 1, n = 32) => { const a = []; for (let i = 0; i <= n; i++) a.push(S(t0 + (t1 - t0) * i / n, u, fr)); return a; };
    // x du flanc gauche à une hauteur y donnée
    const xg = (y) => { let best = 0, e = 1e9; for (let t = 0; t <= ts; t += 0.005) { const d = Math.abs(S(t, 0)[1] - y); if (d < e) { e = d; best = t; } } return S(best, 0)[0]; };
    const R2 = hasard(graine);
    const ecorce = [0.05, 0.13, 0.22].map(t => {
      const y = S(t, 0)[1], x0 = S(t, 0)[0] + 5, x1 = S(t, L)[0] - 4; const seg = []; let x = x0;
      while (x < x1) { const l = 14 + 30 * R2(); seg.push(h.ligne(r1(x), r1(y), r1(Math.min(x + l, x1)), r1(y), h.a.detail)); x += l + 6 + 10 * R2(); }
      return seg.join('\n');
    });
    const svg = [
      h.chemin([P(0, 0), P(0, 1), P(L, 1), ...arc(L, 1, ts), ...arc(0, ts, 0)], B(h.a.contour), true),
      h.ligne(...P(0, 0), ...P(L, 0), h.a.arete),
      h.chemin(arc(L, ts, 0), h.a.arete),
      h.chemin(arc(L, 0, 1, 0.9), h.a.detail),
      ...[0.28, 0.52, 0.74].map(fr => h.chemin(arc(L, 0, 1, fr), h.a.detail)),
      h.ligne(...S(0.5, L, 0.1), ...S(0.5, L, 0.62), h.a.detail),
      ...ecorce,
    ];
    // Contour d'un creux dans la face plane (forme de stade), portion th0 → th1.
    const creux = (cu, ct, a, b, dy = 0, th0 = 0, th1 = 2 * Math.PI, n = 64) => {
      const out = [];
      for (let i = 0; i <= n; i++) {
        const th = th0 + (th1 - th0) * i / n, c = Math.cos(th), s = Math.sin(th);
        out.push(P(cu + a * Math.sign(c) * Math.abs(c) ** 0.45, ct + b * Math.sign(s) * Math.abs(s) ** 0.45, dy));
      }
      return out;
    };
    return { P, S, ts, ybot: ym, svg: svg.join('\n'), creux };
  };

  // Paroi arrière d'un creux, entre la lèvre et le fond, de th0 à th1.
  const paroi = (bl, cu, ct, a, b, a2, b2, dh, th0, th1, attrs) =>
    h.chemin([...bl.creux(cu, ct, a, b, 0, th0, th1, 32), ...bl.creux(cu, ct, a2, b2, dh, th0, th1, 32).reverse()], attrs, true);

  const goutte = (x, y) => h.path(`M${x},${y - 9} C${x + 5},${y - 2} ${x + 4.5},${y + 4} ${x},${y + 4} C${x - 4.5},${y + 4} ${x - 5},${y - 2} ${x},${y - 9} Z`, B(h.a.arete));

  // ─── Vue 1 : braises au centre du tracé ───
  const A = { xa: 18, L: 190, ox: 62, oy: 58, R: 70 };
  const vueBraises = (z) => {
    const yf = z.h - 72, bl = bille(A.xa, yf, A.L, A.ox, A.oy, A.R, 11), cu = A.L / 2;
    const trace = bl.creux(cu, 0.5, 66, 0.33);
    const brule = bl.creux(cu, 0.5, 40, 0.17);
    const tas = []; const R = hasard(5);
    for (let i = 0; i < 16; i++) {
      const u = cu + (R() - 0.5) * 66, t = 0.5 + (R() - 0.5) * 0.24, p = bl.P(u, t, 2 - 8 * (1 - Math.abs(u - cu) / 33) * R());
      tas.push({ p, r: 5 + 3 * R(), g: 100 + i, noire: R() < 0.45 });
    }
    tas.sort((a, b) => a.p[1] - b.p[1]);
    const cx = bl.P(cu, 0.5)[0], cy = bl.P(cu, 0.5)[1];
    return [
      bl.svg,
      h.chemin(trace, h.a.detail, true),
      h.chemin(brule, h.a.arete, true),
      ...tas.map(b => braise(b.p[0], b.p[1], b.r, b.g, b.noire)),
      // souffler
      h.fleche(`M${r1(cx - 118)},${r1(cy - 92)} Q${r1(cx - 70)},${r1(cy - 70)} ${r1(cx - 30)},${r1(cy - 22)}`, h.a.cache),
      h.fleche(`M${r1(cx - 124)},${r1(cy - 70)} Q${r1(cx - 78)},${r1(cy - 52)} ${r1(cx - 40)},${r1(cy - 12)}`, h.a.cache),
      // mouiller les bords
      goutte(...bl.P(cu + 78, 0.72, -34)), goutte(...bl.P(cu + 86, 0.55, -18)), goutte(...bl.P(cu + 70, 0.9, -52)),
      ...[[cu + 80, 0.58], [cu + 72, 0.8], [cu - 72, 0.76], [cu + 20, 0.92]].map(([u, t]) => h.ellipse(...bl.P(u, t), 7, 2.2, h.a.detail)),
    ].join('\n');
  };

  // ─── Vue 2 : gratter le charbon ───
  const couteau = (tx, ty, ang, lb, lm) => {
    const e = [Math.cos(ang), Math.sin(ang)], n = [-e[1], e[0]], Q = (a, b) => [r1(tx + e[0] * a + n[0] * b), r1(ty + e[1] * a + n[1] * b)];
    const lame = `M${Q(0, 0)} Q${Q(lb * 0.35, 8.5)} ${Q(lb, 7)} L${Q(lb, -6)} L${Q(lb * 0.3, -6)} Q${Q(lb * 0.1, -5)} ${Q(0, 0)} Z`;
    const manche = `M${Q(lb, 8.5)} L${Q(lb + lm - 6, 8)} Q${Q(lb + lm + 2, 7)} ${Q(lb + lm + 1, 0)} Q${Q(lb + lm + 2, -7)} ${Q(lb + lm - 6, -8)} L${Q(lb, -8.5)} Z`;
    return [
      h.path(lame, B(h.a.contour)),
      h.ligne(...Q(lb * 0.22, -2.5), ...Q(lb - 4, -2.5), h.a.detail),
      h.path(manche, B(h.a.contour)),
      h.cercle(...Q(lb + lm * 0.35, 0), 1.8, h.a.plein), h.cercle(...Q(lb + lm * 0.72, 0), 1.8, h.a.plein),
    ].join('\n');
  };
  const vueGratter = (z) => {
    const yf = z.h - 72, bl = bille(A.xa, yf, A.L, A.ox, A.oy, A.R, 11), cu = A.L / 2;
    const trace = bl.creux(cu, 0.5, 66, 0.33);
    const rim = bl.creux(cu, 0.5, 60, 0.29);
    const R = hasard(9);
    const tip = bl.P(cu - 18, 0.66, 12);
    const eclats = []; for (let i = 0; i < 9; i++) { const p = bl.P(cu - 34 + R() * 34, 0.46 + R() * 0.2, 6 + 8 * R()); eclats.push(braise(p[0], p[1], 2.2 + 1.6 * R(), 300 + i, true)); }
    return [
      bl.svg,
      h.chemin(trace, h.a.detail, true),
      h.chemin(rim, h.a.arete, true),
      paroi(bl, cu, 0.5, 60, 0.29, 44, 0.16, 18, 0.05, 1.64, h.a.plein),
      paroi(bl, cu, 0.5, 60, 0.29, 44, 0.16, 18, 1.64, Math.PI - 0.05, h.a.hachure('bois', 'detail')),
      h.chemin(bl.creux(cu, 0.5, 44, 0.16, 18, 0.12, Math.PI - 0.12), h.a.detail),
      ...eclats,
      couteau(tip[0], tip[1], -0.62, 72, 62),
    ].join('\n');
  };

  // ─── Vue 3 : bouillir aux pierres ───
  const buche = (x1, y1, x2, y2, r) => {
    const dx = x2 - x1, dy = y2 - y1, l = Math.hypot(dx, dy), n = [-dy / l * r, dx / l * r];
    const bout = []; for (let i = 0; i < 24; i++) { const a = i / 24 * 2 * Math.PI; bout.push([r1(x2 + Math.cos(a) * r * 0.42 * dx / l + Math.sin(a) * n[0]), r1(y2 + Math.cos(a) * r * 0.42 * dy / l + Math.sin(a) * n[1])]); }
    return [
      h.chemin([[x1 + n[0], y1 + n[1]], [x2 + n[0], y2 + n[1]], [x2 - n[0], y2 - n[1]], [x1 - n[0], y1 - n[1]]].map(p => [r1(p[0]), r1(p[1])]), B(h.a.arete), true),
      h.chemin(bout, B(h.a.arete), true),
      h.ellipse(r1(x2), r1(y2), r1(r * 0.12), r1(r * 0.3), h.a.detail),
    ].join('\n');
  };
  const flamme = (x, yb, w, ht, pen) =>
    h.path(`M${x - w / 2},${yb} C${x - w / 2},${yb - ht * 0.45} ${x + pen - w * 0.15},${yb - ht * 0.62} ${x + pen},${yb - ht} C${x + w * 0.28},${yb - ht * 0.58} ${x + w / 2},${yb - ht * 0.38} ${x + w / 2},${yb} Z`, B(h.a.arete)) + '\n' +
    h.path(`M${x - w / 5},${yb} C${x - w / 5},${yb - ht * 0.3} ${x + pen * 0.4},${yb - ht * 0.4} ${x + pen * 0.45},${yb - ht * 0.55} C${x + w * 0.12},${yb - ht * 0.35} ${x + w / 5},${yb - ht * 0.2} ${x + w / 5},${yb}`, h.a.detail);

  const C = { xa: 196, L: 262, ox: 80, oy: 84, R: 86 };
  const vueBouillir = (z) => {
    const g = z.h - 36, yf = g - 54, bl = bille(C.xa, yf, C.L, C.ox, C.oy, C.R, 23), cu = C.L / 2;
    const rim = bl.creux(cu, 0.5, cu - 22, 0.34);
    const seve = bl.creux(cu, 0.5, cu - 25, 0.315, 6);
    const pA = bl.P(cu + 38, 0.5, 6);             // pierre qui bout
    const pB = bl.P(cu - 62, 0.46, 6);            // pierre qu'on plonge
    const rs = 20;
    // pince : branche verte pliée en deux
    const dir = [-0.74, -0.67], nl = [0.67, -0.74], Lp = 200;
    const H = [pB[0] + dir[0] * Lp, pB[1] - 4 + dir[1] * Lp];
    const bord = (off0, off1) => [[H[0] + nl[0] * off0, H[1] + nl[1] * off0], [pB[0] + nl[0] * off1, pB[1] - 4 + nl[1] * off1]];
    const o1 = bord(9, rs + 7), i1 = bord(3, rs + 1), o2 = bord(-9, -rs - 7), i2 = bord(-3, -rs - 1);
    const tour = (r) => { const a = []; for (let i = 0; i <= 14; i++) { const th = i / 14 * Math.PI; a.push([r1(H[0] + nl[0] * r * Math.cos(th) + dir[0] * r * Math.sin(th)), r1(H[1] + nl[1] * r * Math.cos(th) + dir[1] * r * Math.sin(th))]); } return a; };
    const pinceSvg = h.chemin([o1[1], o1[0], ...tour(9).slice(1, -1), o2[0], o2[1], i2[1], i2[0], ...tour(3).slice(1, -1).reverse(), i1[0], i1[1]].map(p => [r1(p[0]), r1(p[1])]), B(h.a.arete), true);
    const noeud = (k, cote) => { const p = [H[0] + (pB[0] - H[0]) * k + nl[0] * 9 * cote, H[1] + (pB[1] - 4 - H[1]) * k + nl[1] * 9 * cote]; return h.ligne(r1(p[0]), r1(p[1]), r1(p[0] + nl[0] * 7 * cote + dir[0] * 5), r1(p[1] + nl[1] * 7 * cote + dir[1] * 5), h.a.arete); };
    const bulles = []; const R = hasard(41);
    for (let i = 0; i < 12; i++) { const a = i / 12 * 2 * Math.PI + R() * 0.4, k = 1.25 + 0.5 * R(); bulles.push(h.cercle(r1(pA[0] + Math.cos(a) * 22 * k), r1(pA[1] + 1 + Math.sin(a) * 6 * k), r1(1.6 + 1.6 * R()), B(h.a.detail))); }
    const vapeur = [-14, 2, 18].map((dx, i) => { const x = pA[0] + dx, y = pA[1] - 22; return h.path(`M${r1(x)},${r1(y)} c-7,-10 7,-16 0,-26 c-7,-10 7,-16 0,-26`, h.a.cache); });
    const fx = 108;
    return [
      // le sol
      h.ligne(12, g, 196, g, h.a.detail), h.ligne(206, g, 590, g, h.a.detail),
      // le feu : flammes derrière, bûches, pierres dans la braise
      flamme(fx - 38, g - 16, 36, 104, -6), flamme(fx + 36, g - 16, 34, 96, 8), flamme(fx, g - 18, 46, 146, 4),
      buche(fx + 48, g - 32, fx - 80, g - 8, 12), buche(fx - 42, g - 36, fx + 82, g - 7, 12),
      ...[[fx - 70, g - 4, 7], [fx - 50, g - 5, 6], [fx + 58, g - 4, 7], [fx + 76, g - 5, 5], [fx - 20, g - 4, 6], [fx + 22, g - 3, 6]].map(([x, y, r], i) => braise(x, y, r, 500 + i, i % 2 === 0)),
      pierre(fx - 42, g - 18, 22, 16, 61), pierre(fx + 4, g - 20, 25, 18, 62), pierre(fx + 46, g - 17, 20, 15, 63),
      // l'auge pleine
      bl.svg,
      h.chemin(rim, h.a.arete, true),
      h.chemin(seve, h.a.hachure('eau', 'detail'), true),
      // pierre qui bout
      h.path(`M${r1(pA[0] - 21)},${r1(pA[1] + 1)} C${r1(pA[0] - 23)},${r1(pA[1] - 14)} ${r1(pA[0] - 10)},${r1(pA[1] - 24)} ${r1(pA[0] + 3)},${r1(pA[1] - 23)} C${r1(pA[0] + 16)},${r1(pA[1] - 22)} ${r1(pA[0] + 23)},${r1(pA[1] - 10)} ${r1(pA[0] + 21)},${r1(pA[1] + 1)} Z`, B(h.a.arete)),
      h.ellipse(r1(pA[0]), r1(pA[1] + 1), 24, 5, h.a.detail),
      ...bulles, ...vapeur,
      // pierre qu'on plonge, et la pince
      pierre(pB[0], pB[1] - 4, rs, 15, 64),
      h.ellipse(r1(pB[0]), r1(pB[1] + 4), 20, 4.5, h.a.detail),
      pinceSvg, noeud(0.34, 1), noeud(0.55, -1),
      // la pierre descend : flèche parallèle à la pince, dégagée de sa branche du dessus
      h.fleche(`M${r1(pB[0] - 66)},${r1(pB[1] - 117)} L${r1(pB[0] - 18)},${r1(pB[1] - 74)}`, h.a.arete),
      // pierre refroidie, ressortie
      pierre(C.xa + C.L + C.ox + 34, g - 12, 17, 12, 65),
      h.fleche(`M${r1(bl.P(C.L - 10, 0.9)[0])},${r1(bl.P(C.L - 10, 0.9)[1] - 16)} Q${r1(C.xa + C.L + C.ox + 40)},${r1(yf - 96)} ${r1(C.xa + C.L + C.ox + 36)},${r1(g - 34)}`, h.a.cache),
    ].join('\n');
  };

  return {
    ref: '94-31',
    titre: 'L’auge au billot et les pierres chaudes',
    desc: 'Une demi-bille creusée aux braises : contour tracé au couteau, braises soufflées au centre, bords mouillés, charbon gratté entre deux passes. Puis la sève bout dans l’auge autour de pierres chauffées au feu et portées à la pince de bois vert.',
    format: 'pleine',
    disposition: [['braises', 'gratter'], ['bouillir']],
    hauteurs: [1, 1.25],
    vues: {
      braises: {
        titre: 'Creuser aux braises',
        dessin: vueBraises,
        renvois: z => {
          const yf = z.h - 72, bl = bille(A.xa, yf, A.L, A.ox, A.oy, A.R, 11), cu = A.L / 2;
          const t1 = bl.creux(cu, 0.5, 66, 0.33, 0, 3.6, 3.6, 1)[0];
          const t3 = bl.P(cu + 86, 0.55, -18);
          return [
            { n: 1, rond: [t1[0] - 4, yf + 58], cible: [t1[0], t1[1] + 1], texte: 'contour tracé au couteau' },
            { n: 2, rond: [bl.P(cu, 0.5)[0] + 18, 22], cible: [bl.P(cu, 0.5)[0] + 6, bl.P(cu, 0.5)[1] - 8], texte: 'braises au centre, on souffle' },
            { n: 3, rond: [z.l - 22, t3[1] - 30], cible: [t3[0] + 5, t3[1] - 4], texte: 'bords mouillés, ils ne descendent pas' },
          ];
        },
      },
      gratter: {
        titre: 'Gratter, puis recommencer',
        dessin: vueGratter,
        renvois: z => {
          const yf = z.h - 72, bl = bille(A.xa, yf, A.L, A.ox, A.oy, A.R, 11), cu = A.L / 2;
          // pastille à droite du manche : la ligne de rappel ne croise pas le couteau
          const c = bl.P(cu + 42, 0.62, 8);
          return [
            { n: 4, rond: [c[0] + 80, yf - 100], cible: [c[0], c[1]], texte: 'charbon gratté entre deux passes' },
          ];
        },
      },
      bouillir: {
        titre: 'Bouillir aux pierres',
        dessin: vueBouillir,
        renvois: z => {
          const g = z.h - 36, yf = g - 54, bl = bille(C.xa, yf, C.L, C.ox, C.oy, C.R, 23), cu = C.L / 2;
          const pA = bl.P(cu + 38, 0.5, 6), pB = bl.P(cu - 62, 0.46, 6);
          const nv = bl.P(cu + 60, 0.24, 6);
          return [
            { n: 5, rond: [34, g - 150], cible: [108 - 58, g - 26], texte: 'pierres sèches, prises loin de l’eau' },
            { n: 6, rond: [pB[0] - 150, pB[1] - 80], cible: [pB[0] - 124, pB[1] - 104], texte: 'pince de bois vert' },
            { n: 7, rond: [pA[0] + 30, pA[1] - 100], cible: [pA[0] + 30, pA[1] - 4], texte: 'la sève bout autour de la pierre' },
            { n: 8, rond: [z.l - 20, g - 70], cible: [z.l - 34, g - 22], texte: 'pierre refroidie ressortie, une chaude remise' },
            { n: 9, rond: [nv[0] + 10, g + 20], cible: [nv[0], nv[1] + 2], texte: 'niveau tenu haut contre les bords' },
          ];
        },
      },
    },
  };
};
