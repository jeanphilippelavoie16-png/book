// Planche 94-33a — le casseau d'écorce de bouleau, première page : lever, aplatir, tailler.
// ch. 60, §5-G (étapes 38 à 42), §9 « Le contenant », « Écorce : ce que la saison donne ».
// Suite en 60-33b : plier, coudre à la racine, cercler, étancher à la poix.
// Aucune cote : le chapitre ne donne aucune dimension de casseau.

module.exports = (h) => {
  const r1 = (n) => Math.round(n * 10) / 10;
  const B = (a) => a.replace('fill="none"', 'fill="#FFFFFF"');
  const hasard = (g) => { let s = g; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; };
  const pl = (p) => p.map(q => [r1(q[0]), r1(q[1])]);

  const lisse = (p) => {
    const n = p.length; let d = `M${r1(p[0][0])},${r1(p[0][1])}`;
    for (let i = 0; i < n; i++) {
      const p0 = p[(i - 1 + n) % n], p1 = p[i], p2 = p[(i + 1) % n], p3 = p[(i + 2) % n];
      d += ` C${r1(p1[0] + (p2[0] - p0[0]) / 6)},${r1(p1[1] + (p2[1] - p0[1]) / 6)} ${r1(p2[0] - (p3[0] - p1[0]) / 6)},${r1(p2[1] - (p3[1] - p1[1]) / 6)} ${r1(p2[0])},${r1(p2[1])}`;
    }
    return d + ' Z';
  };
  const pierre = (cx, cy, rx, ry, g) => {
    const R = hasard(g); const p = [];
    for (let i = 0; i < 9; i++) { const a = i / 9 * 2 * Math.PI; const k = 0.86 + 0.2 * R(); p.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]); }
    const grains = [0, 1, 2].map(() => { const x = cx + (R() - 0.5) * rx, y = cy + (R() - 0.3) * ry * 0.8; return h.ligne(r1(x), r1(y), r1(x + 3), r1(y + 1), h.a.detail); });
    return [h.path(lisse(p), B(h.a.contour)), ...grains].join('\n');
  };

  // ─── Vue 1 : lever l'écorce sur l'arbre abattu ───
  const gL = (z) => {
    const R = Math.min(40, z.h * 0.25), cy = z.h * 0.56, x0 = 46, x1 = z.l - 40, rx = R * 0.34;
    const yt = cy - R, yb = cy + R, ys = cy - R * 0.28, xp = x0 + (x1 - x0) * 0.52, xf = x1 - 8, hf = 30;
    const yF = (x) => { const t = Math.max(0, Math.min(1, (x - xp) / (xf - xp))); return ys - (ys - (yt - hf)) * (1 - (1 - t) ** 2.4); };
    let xc = xp; while (yF(xc) > yt && xc < xf) xc += 0.5;          // où le bord libre passe le dessus du tronc
    return { R, cy, x0, x1, rx, yt, yb, ys, xp, xf, hf, yF, xc };
  };
  const vueLever = (z) => {
    const g = gL(z), { R, cy, x0, x1, rx, yt, yb, ys, xp, xf, hf, yF, xc } = g, o = [];
    const rnd = hasard(7);
    // sol
    o.push(h.ligne(8, yb + 1, z.l - 8, yb + 1, h.a.arete));
    // corps du tronc et bout droit
    o.push(h.path(`M${r1(x0)},${r1(yt)} L${r1(x1)},${r1(yt)} A${r1(rx)},${r1(R)} 0 0 1 ${r1(x1)},${r1(yb)} L${r1(x0)},${r1(yb)} Z`, B(h.a.contour)));
    // bois mis à nu, entre l'entaille et le bord soulevé
    const bord = []; for (let x = xp; x <= xc; x += 2) bord.push([x, yF(x)]);
    o.push(h.chemin(pl([[xp, ys], [x1, ys], [x1 + rx * 0.62, yt + (ys - yt) * 0.45], [x1, yt], [xc, yt], ...bord.reverse()]), B(h.a.detail), true));
    for (let k = 1; k <= 3; k++) {
      const y = ys - (ys - yt) * k / 4.2; let xs = xp; while (yF(xs) > y && xs < xc) xs += 0.5;
      o.push(h.ligne(r1(xs + 6), r1(y), r1(x1 - 4), r1(y), h.a.fin));
    }
    // le feuillet soulevé, face intérieure vers nous, bord libre roulé
    const lev = []; for (let x = xc; x <= xf; x += 2) lev.push([x, yF(x)]);
    o.push(h.chemin(pl([[xc, yt], ...lev, [x1 - 2, yt - hf + 4], [x1 + 1, yt]]), B(h.a.contour), true));
    const lev2 = []; for (let x = xc + 30; x <= xf - 2; x += 2) lev2.push([x, yF(x) + 3.2]);
    o.push(h.chemin(pl(lev2), h.a.detail));
    for (let k = 1; k <= 2; k++) {
      const pts = []; for (let x = xc + 24 + 10 * k; x <= xf - 6; x += 3) pts.push([x, yt - (yt - yF(x)) * k / 3]);
      o.push(h.chemin(pl(pts), h.a.fin));
    }
    // entaille, sur toute la longueur
    const xe = x0 + rx * Math.sqrt(1 - ((ys - cy) / R) ** 2);
    o.push(h.ligne(r1(xe), r1(ys), r1(x1), r1(ys), h.a.arete));
    // bout gauche : l'anneau d'écorce et les cernes
    o.push(h.ellipse(x0, cy, rx, R, B(h.a.contour)));
    o.push(h.ellipse(x0, cy, r1(rx - 2.4), r1(R - 3.6), h.a.arete));
    [0.72, 0.46, 0.22].forEach(k => o.push(h.ellipse(x0, r1(cy + 1), r1(rx * k), r1(R * k), h.a.fin)));
    // lenticelles : traits courts en travers de l'axe
    for (let i = 0; i < 70; i++) {
      const x = x0 + rx + 6 + rnd() * (x1 - x0 - rx - 12), y = yt + 4 + rnd() * (yb - yt - 8);
      if (x > xp - 4 && y < ys + 3) continue;
      if (Math.abs(y - ys) < 3) continue;
      const l = 3 + 5 * rnd();
      o.push(h.ligne(r1(x), r1(y), r1(x), r1(y + l), h.a.detail));
    }
    // couteau croche : manche droit, lame recourbée dont le crochet passe sous le bord
    const A = [xp - 4, ys + 14], Bm = [xp - 52, ys + 40];
    const L0 = Math.hypot(Bm[0] - A[0], Bm[1] - A[1]), ux = (Bm[0] - A[0]) / L0, uy = (Bm[1] - A[1]) / L0;
    const nx = -uy * 5.5, ny = ux * 5.5;
    o.push(h.path(`M${r1(A[0] + nx)},${r1(A[1] + ny)} L${r1(Bm[0] + nx)},${r1(Bm[1] + ny)} Q${r1(Bm[0] + ux * 7)},${r1(Bm[1] + uy * 7)} ${r1(Bm[0] - nx)},${r1(Bm[1] - ny)} L${r1(A[0] - nx)},${r1(A[1] - ny)} Z`, B(h.a.contour)));
    [5, 9].forEach(k => o.push(h.ligne(r1(A[0] + ux * k + nx), r1(A[1] + uy * k + ny), r1(A[0] + ux * k - nx), r1(A[1] + uy * k - ny), h.a.detail)));
    const gch = [], dr = []; let px = A[0], py = A[1], th = Math.atan2(-uy, -ux);
    for (let i = 0; i <= 20; i++) {
      const t = i / 20, w = 2.6 - 1.9 * t;
      if (t > 0.55) th -= 0.075;
      gch.push([px + Math.sin(th) * w, py - Math.cos(th) * w]); dr.push([px - Math.sin(th) * w, py + Math.cos(th) * w]);
      px += Math.cos(th) * 1.5; py += Math.sin(th) * 1.5;
    }
    o.push(h.chemin(pl([...gch, ...dr.reverse()]), B(h.a.arete), true));
    return o.join('\n');
  };

  // ─── Vue 2 : en coupe, la lame s'arrête au bois ───
  const gT = (z) => { const R = Math.min(z.l * 0.36, (z.h - 64) * 0.52), cx = z.l / 2, cy = z.h - R - 10; return { R, cx, cy, e: 7 }; };
  const vueTronc = (z) => {
    const { R, cx, cy, e } = gT(z), o = [];
    o.push(h.cercle(cx, r1(cy), r1(R), B(h.a.contour)));
    o.push(h.cercle(cx, r1(cy), r1(R - e), B(h.a.arete)));
    [0.78, 0.56, 0.36, 0.17].forEach(k => o.push(h.cercle(cx, r1(cy + 1), r1((R - e) * k), h.a.fin)));
    o.push(h.cercle(cx, r1(cy + 1), 1.4, h.a.plein));
    // l'entaille dans l'anneau d'écorce, et le bord gauche qui décolle
    o.push(h.rect(r1(cx - 2.2), r1(cy - R - 2), 4.4, e + 1.4, h.a.blanc));
    o.push(h.ligne(r1(cx - 2.2), r1(cy - R + 0.6), r1(cx - 2.2), r1(cy - R + e), h.a.arete));
    o.push(h.ligne(r1(cx + 2.2), r1(cy - R + 0.6), r1(cx + 2.2), r1(cy - R + e), h.a.arete));
    // la lame, vue par la tranche, pointe posée sur le bois
    // manche par la tranche, avec ses deux bagues comme en vue 1 : ça reste un couteau, pas un clou
    const yp = cy - R + e - 0.6, ym = cy - R - 20;
    o.push(h.chemin(pl([[cx, yp], [cx - 2.4, ym], [cx + 2.4, ym]]), B(h.a.arete), true));
    o.push(h.path(`M${r1(cx - 6)},${r1(ym)} L${r1(cx - 6)},12 Q${r1(cx)},5 ${r1(cx + 6)},12 L${r1(cx + 6)},${r1(ym)} Z`, B(h.a.contour)));
    [4, 8].forEach(k => o.push(h.ligne(r1(cx - 6), r1(ym - k), r1(cx + 6), r1(ym - k), h.a.detail)));
    return o.join('\n');
  };

  // ─── Vue 3 : aplatir sous une planche lestée ───
  const gA = (z) => { const yg = z.h - 16, xa = 34, xb = Math.min(330, z.l * 0.6); const yT = yg - 4 * 3.6 - 1.5; return { yg, xa, xb, yT }; };
  const vueAplatir = (z) => {
    const { yg, xa, xb, yT } = gA(z), o = [], rnd = hasard(19);
    o.push(h.ligne(8, yg, z.l - 8, yg, h.a.arete));
    // feuillets empilés, bouts qui dépassent
    for (let i = 0; i < 4; i++) {
      const y = yg - 2 - i * 3.6, a = xa - 12 + 8 * rnd(), b = xb + 12 - 8 * rnd();
      o.push(h.path(`M${r1(a)},${r1(y - 2.5)} Q${r1(a + 4)},${r1(y)} ${r1(a + 12)},${r1(y)} L${r1(b - 12)},${r1(y)} Q${r1(b - 4)},${r1(y)} ${r1(b)},${r1(y - 2.5)}`, h.a.arete));
    }
    // planche
    const py = yT - 13;
    o.push(h.rect(xa - 6, r1(py), r1(xb - xa + 12), 13, B(h.a.contour)));
    o.push(h.path(`M${xa + 8},${r1(py + 4.5)} C${xa + 80},${r1(py + 3)} ${xa + 150},${r1(py + 6.5)} ${r1(xb - 20)},${r1(py + 4.5)}`, h.a.fin));
    o.push(h.path(`M${xa + 30},${r1(py + 9)} C${xa + 100},${r1(py + 10.5)} ${xa + 170},${r1(py + 7.5)} ${r1(xb - 4)},${r1(py + 9)}`, h.a.fin));
    // pierres
    const s1 = xa + (xb - xa) * 0.27, s2 = xb - (xb - xa) * 0.24;
    o.push(pierre(s1, py - 16, 32, 17, 5));
    o.push(pierre(s2, py - 13, 24, 14, 13));
    // laissé libre : le feuillet roulé, vu par le bout
    const cxR = xb + (z.l - xb) * 0.55, cyR = yg - 17.2, sp = [];
    for (let t = 0; t <= 4 * Math.PI + 0.001; t += 0.12) { const r = 3 + 13.5 * t / (4 * Math.PI); sp.push([cxR + r * Math.cos(t + Math.PI / 2), cyR + r * Math.sin(t + Math.PI / 2)]); }
    const fin = sp[sp.length - 1];
    sp.push([fin[0] - 40, fin[1]]);
    o.push(h.chemin(pl(sp), h.a.arete));
    return o.join('\n');
  };

  // ─── Vue 4 : le gabarit ───
  const gG = (z) => {
    const u = Math.min((z.h - 22) / 7, (z.l - 220) / 9), W = 9 * u, H = 7 * u, s = 2 * u;
    const X0 = r1((z.l - W) / 2 - 40), Y0 = r1((z.h - H) / 2 + 2);
    return { u, W, H, s, X0, Y0 };
  };
  const vueGabarit = (z) => {
    const { W, H, s, X0, Y0 } = gG(z), o = [], rnd = hasard(29);
    const diag = h.a.cache.replace('5 3.5', '10 3 2 3');
    o.push(h.rect(X0, Y0, r1(W), r1(H), B(h.a.contour)));
    for (let i = 0; i < 48; i++) {
      const x = X0 + 8 + rnd() * (W - 24), y = Y0 + 6 + rnd() * (H - 12);
      o.push(h.ligne(r1(x), r1(y), r1(x + 4 + 6 * rnd()), r1(y), h.a.fin));
    }
    // plis des parois, sur toute la feuille
    o.push(h.ligne(X0, r1(Y0 + s), r1(X0 + W), r1(Y0 + s), h.a.cache));
    o.push(h.ligne(X0, r1(Y0 + H - s), r1(X0 + W), r1(Y0 + H - s), h.a.cache));
    o.push(h.ligne(r1(X0 + s), Y0, r1(X0 + s), r1(Y0 + H), h.a.cache));
    o.push(h.ligne(r1(X0 + W - s), Y0, r1(X0 + W - s), r1(Y0 + H), h.a.cache));
    // diagonales des coins
    o.push(h.ligne(X0, Y0, r1(X0 + s), r1(Y0 + s), diag));
    o.push(h.ligne(r1(X0 + W), Y0, r1(X0 + W - s), r1(Y0 + s), diag));
    o.push(h.ligne(X0, r1(Y0 + H), r1(X0 + s), r1(Y0 + H - s), diag));
    o.push(h.ligne(r1(X0 + W), r1(Y0 + H), r1(X0 + W - s), r1(Y0 + H - s), diag));
    // les parois se relèvent
    const cx = X0 + W / 2, yb = Y0 + H;
    o.push(h.fleche(`M${r1(cx - 20)},${r1(yb - s * 0.3)} Q${r1(cx)},${r1(yb - s - 16)} ${r1(cx + 20)},${r1(yb - s - s * 0.45)}`));
    const xr = X0 + W, cyy = Y0 + H / 2;
    o.push(h.fleche(`M${r1(xr - s * 0.3)},${r1(cyy + 20)} Q${r1(xr - s - 16)},${r1(cyy)} ${r1(xr - s - s * 0.45)},${r1(cyy - 20)}`));
    // l'oreille du coin se rabat sur la paroi longue
    o.push(h.fleche(`M${r1(xr - s * 0.25)},${r1(yb - s * 0.55)} Q${r1(xr - s * 0.6)},${r1(yb - s * 0.2)} ${r1(xr - s - 16)},${r1(yb - s * 0.35)}`));
    return o.join('\n');
  };

  return {
    ref: '94-33a',
    titre: 'Le casseau d’écorce, de l’arbre au gabarit',
    desc: 'Un bouleau abattu, entaillé sur toute sa longueur dans l’écorce seule : un couteau croche décolle le bord et le feuillet se lève d’un seul morceau. En coupe, la lame s’arrête au bois. Les feuillets sèchent à plat sous une planche chargée de pierres ; laissé libre, un feuillet s’enroule. Le gabarit vu de dessus : un rectangle d’écorce, le fond et les parois marqués de plis, chaque coin plié sur sa diagonale en oreille qui se rabat sur la paroi longue, sans fente.',
    format: 'pleine',
    disposition: [['lever'], ['tronc', 'aplatir'], ['gabarit']],
    hauteurs: [1, 0.9, 1.45],
    largeurs: [[1], [1, 2.9], [1]],
    vues: {
      lever: {
        titre: 'Lever l’écorce, sur l’arbre abattu',
        dessin: vueLever,
        renvois: (z) => {
          const g = gL(z), xm = g.x0 + (g.xp - g.x0) * 0.42;
          return [
            { n: 1, rond: [xm - 30, 14], cible: [xm, g.ys], texte: 'entaillée dans l’écorce seule' },
            { n: 2, rond: [g.xp - 100, Math.min(z.h - 9, g.yb + 14)], cible: [g.xp - 36, g.ys + 32], texte: 'couteau croche sous le bord' },
            { n: 3, rond: [g.xf - 104, 14], cible: [g.xf - 44, g.yF(g.xf - 44) + 8], texte: 'puis à la main, d’un morceau' },
          ];
        },
      },
      tronc: {
        titre: 'En coupe',
        dessin: vueTronc,
        renvois: (z) => {
          const { R, cx, cy, e } = gT(z);
          return [
            { n: 4, rond: [cx + R * 0.72, cy - R - 20], cible: [cx + 2, cy - R + e - 1.5], texte: 'la lame s’arrête au bois' },
          ];
        },
      },
      aplatir: {
        titre: 'Aplatir jusqu’au séchage',
        dessin: vueAplatir,
        renvois: (z) => {
          const { yg, xa, xb, yT } = gA(z), cxR = xb + (z.l - xb) * 0.55;
          return [
            { n: 5, rond: [xa - 18, yg - 40], cible: [xa - 10, yg - 6], texte: 'feuillets à plat, empilés' },
            { n: 6, rond: [xa + (xb - xa) * 0.52, 14], cible: [xa + (xb - xa) * 0.52, yT - 8], texte: 'planche lestée de pierres' },
            { n: 7, rond: [cxR + 30, yg - 58], cible: [cxR + 10, yg - 24], texte: 'laissé libre, il s’enroule' },
          ];
        },
      },
      gabarit: {
        titre: 'Le gabarit, vu de dessus',
        dessin: vueGabarit,
        renvois: (z) => {
          const { W, H, s, X0, Y0 } = gG(z), xr = X0 + W, yb = Y0 + H;
          return [
            { n: 8, rond: [X0 - 34, Y0 + H * 0.5], cible: [X0 + s, Y0 + H * 0.5], texte: 'plis marqués, jamais coupés' },
            { n: 9, rond: [xr + 34, Y0 + H * 0.5], cible: [xr - s - 10, Y0 + H / 2 - 12], texte: 'les parois se relèvent' },
            { n: 10, rond: [xr + 34, Y0 + s * 0.5], cible: [xr - s * 0.5, Y0 + s * 0.5], texte: 'le coin plié en diagonale' },
            { n: 11, rond: [xr + 34, yb - s * 0.4], cible: [xr - s * 0.55, yb - s * 0.32], texte: 'oreille rabattue sur la paroi' },
          ];
        },
      },
    },
  };
};
