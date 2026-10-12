// 40-09 — Le froid qu'on fabrique au bois (aussi 41, 42, 53).
// Chapitre 40, section 9 : « Le froid qu'on fabrique, quand l'air ne le donne pas » — le
// ruisseau (chaudière fermée, couvercle bien assis, coulée au creux du courant, ombragée,
// lestée d'une roche) et le trou dans la mousse (talus exposé au nord, tapis levé d'un
// morceau, trou garni de sapin, bacs fermés, tapis remis en couvercle).
// Chapitre 53 : la corde qui remonte la chaudière ; la niche de berge (sable saturé, rive
// nord, sous un surplomb ou un paquet de racines, poissons en sac, sable mouillé et mousse).
// Chapitre 42 : le contenant enfoncé dans la neige tassée jusqu'au bord, couvercle à demi,
// contre le chaudron posé sur la croûte.
// Aucune dimension au chapitre : aucune cote sur la planche. Le linge mouillé est en 50-08.

module.exports = (h) => {
  const f = v => Math.round(v * 10) / 10;
  const pt = p => `${f(p[0])} ${f(p[1])}`;
  const blanc = s => s.replace('fill="none"', 'fill="#fff"');

  // Chaque vue est dessinée dans un cadre de 320 × 318, mis à l'échelle de la vue.
  const W = 320, H = 318;
  const repere = z => {
    const s = Math.min(z.l / W, z.h / H);
    const ox = (z.l - W * s) / 2, oy = (z.h - H * s) / 2;
    return { s, ox, oy, T: p => [ox + p[0] * s, oy + p[1] * s] };
  };

  // Courbe lisse (Catmull-Rom) par des points déjà placés dans la vue.
  const cr = (pts, avecM = true) => {
    const n = pts.length;
    let d = avecM ? `M${pt(pts[0])}` : '';
    for (let i = 0; i < n - 1; i++) {
      const p0 = pts[Math.max(i - 1, 0)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(i + 2, n - 1)];
      d += ` C${pt([p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6])} ` +
        `${pt([p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6])} ${pt(p2)}`;
    }
    return d;
  };
  const crFerme = pts => {
    const n = pts.length;
    let d = `M${pt(pts[0])}`;
    for (let i = 0; i < n; i++) {
      const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
      d += ` C${pt([p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6])} ` +
        `${pt([p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6])} ${pt(p2)}`;
    }
    return d + 'Z';
  };

  // Points répartis le long d'une polyligne, tous les « pas ».
  const leLong = (pts, pas) => {
    const out = [pts[0]];
    let t0 = pas;
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i], b = pts[i + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]);
      let t = t0;
      while (t <= L) { out.push([a[0] + (b[0] - a[0]) * t / L, a[1] + (b[1] - a[1]) * t / L]); t += pas; }
      t0 = t - L;
    }
    return out;
  };

  // Tapis de mousse posé sur une ligne de sol (de gauche à droite), épaisseur e.
  const mousse = (T, base, e) => {
    const pts = leLong(base, 3.2);
    const nrm = pts.map((p, i) => {
      const a = pts[Math.max(i - 1, 0)], b = pts[Math.min(i + 1, pts.length - 1)];
      const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1;
      return [dy / L, -dx / L];
    });
    const off = (i, k) => [pts[i][0] + nrm[i][0] * k, pts[i][1] + nrm[i][1] * k];
    const haut = pts.map((p, i) => off(i, e));
    let dHaut = `M${pt(T(haut[0]))}`;
    let i = 0;
    for (; i + 2 < haut.length; i += 2) dHaut += ` Q${pt(T(off(i + 1, e + 2.6)))} ${pt(T(haut[i + 2]))}`;
    if (i < haut.length - 1) dHaut += ` L${pt(T(haut[haut.length - 1]))}`;
    let brins = '';
    pts.forEach((p, j) => {
      const tg = [-nrm[j][1], nrm[j][0]], sg = j % 2 ? 1.3 : -1.3;
      const a = off(j, 1.2), b = [p[0] + nrm[j][0] * (e - 1.4) + tg[0] * sg, p[1] + nrm[j][1] * (e - 1.4) + tg[1] * sg];
      brins += ` M${pt(T(a))} L${pt(T(b))}`;
    });
    return [
      h.chemin(pts.concat(haut.slice().reverse()).map(T), h.a.blanc, true),
      h.path(brins, h.a.fin),
      h.path(dHaut, h.a.arete),
    ].join('\n');
  };

  // Branche de sapin : un axe et ses aiguilles.
  const rameau = (T, a, b, lg = 4.2) => {
    const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy);
    const u = [dx / L, dy / L], v = [-u[1], u[0]], ca = Math.cos(0.9), sa = Math.sin(0.9);
    let d = '';
    for (let t = 1.5; t < L - 1; t += 2.4) {
      const p = [a[0] + u[0] * t, a[1] + u[1] * t];
      for (const sg of [1, -1]) {
        const q = [p[0] + (u[0] * ca + v[0] * sa * sg) * lg, p[1] + (u[1] * ca + v[1] * sa * sg) * lg];
        d += ` M${pt(T(p))} L${pt(T(q))}`;
      }
    }
    return h.path(d, h.a.fin) + '\n' + h.ligne(...T(a), ...T(b), h.a.detail);
  };

  // Roche : contour irrégulier fermé.
  const roche = (T, cx, cy, rx, ry, graine = 1, attrs = blanc(h.a.arete)) => {
    const k = [1, 0.86, 1.05, 0.93, 1.08, 0.9, 1.02, 0.88, 0.97];
    const pts = k.map((_, i) => {
      const a = (i / k.length) * Math.PI * 2 + graine;
      const r = k[(i + graine * 3) % k.length];
      return T([cx + Math.cos(a) * rx * r, cy + Math.sin(a) * ry * r]);
    });
    return h.path(crFerme(pts), attrs);
  };

  // Poisson de profil, tête à gauche.
  const poisson = (T, cx, cy, L) => {
    const e = L * 0.24;
    const rel = [[-0.5, 0], [-0.4, -0.36], [-0.2, -0.5], [0.1, -0.44], [0.3, -0.2], [0.37, -0.12],
      [0.5, -0.5], [0.45, 0], [0.5, 0.5], [0.37, 0.12], [0.3, 0.2], [0.1, 0.4], [-0.2, 0.45], [-0.4, 0.3]];
    const pts = rel.map(([a, b]) => T([cx + a * L, cy + b * e * 2]));
    return [
      h.chemin(pts, blanc(h.a.arete), true),
      h.path(`M${pt(T([cx - 0.3 * L, cy - 0.7 * e]))} Q${pt(T([cx - 0.24 * L, cy]))} ${pt(T([cx - 0.3 * L, cy + 0.65 * e]))}`, h.a.detail),
      h.cercle(...T([cx - 0.4 * L, cy - 0.2 * e]), 1, h.a.plein),
    ].join('\n');
  };

  // Épinette en silhouette, pied au sol en (x, ySol).
  const epinette = (T, x, yHaut, ySol, largeur) => {
    const n = 9, y1 = ySol - 10;
    const droite = [], gauche = [];
    for (let k = 0; k < n; k++) {
      const y = yHaut + 6 + (y1 - yHaut - 6) * k / (n - 1);
      const w = 3 + (largeur - 3) * k / (n - 1);
      droite.push([x + w, y + 3], [x + w * 0.42, y + 1.5]);
      gauche.push([x - w, y + 3], [x - w * 0.42, y + 1.5]);
    }
    droite.pop(); gauche.pop();
    const pts = [[x, yHaut]].concat(droite, [[x + 2.5, y1 + 3], [x + 2.5, ySol], [x - 2.5, ySol], [x - 2.5, y1 + 3]], gauche.reverse());
    return h.chemin(pts.map(T), blanc(h.a.arete), true);
  };

  // Chaudron en coupe : paroi, contenu, couvercle glissé à demi, oreilles.
  const chaudron = (T, x, yBas, l, ht) => {
    const yH = yBas - ht, ep = 2.6, niv = yH + 13;
    const ext = [[x, yH], [x, yBas - 4], [x + 4, yBas], [x + l - 4, yBas], [x + l, yBas - 4], [x + l, yH]];
    const int = [[x + ep, yH], [x + ep, yBas - ep - 3], [x + ep + 3, yBas - ep], [x + l - ep - 3, yBas - ep], [x + l - ep, yBas - ep - 3], [x + l - ep, yH]];
    const contenu = [[x + ep, niv]].concat(int.slice(1, 5), [[x + l - ep, niv]]);
    const dec = l * 0.28;
    return [
      h.chemin(ext.map(T), blanc(h.a.contour)),
      h.chemin(contenu.map(T), h.a.hachure('eau', 'aucun'), true),
      h.ligne(...T([x + ep, niv]), ...T([x + l - ep, niv]), h.a.detail),
      h.chemin(int.map(T), h.a.detail),
      h.path(`M${pt(T([x, yH + 5]))} Q${pt(T([x - 8, yH + 5]))} ${pt(T([x - 8, yH + 11]))} Q${pt(T([x - 8, yH + 15]))} ${pt(T([x, yH + 15]))}`, h.a.arete),
      h.path(`M${pt(T([x + l, yH + 5]))} Q${pt(T([x + l + 8, yH + 5]))} ${pt(T([x + l + 8, yH + 11]))} Q${pt(T([x + l + 8, yH + 15]))} ${pt(T([x + l, yH + 15]))}`, h.a.arete),
      h.chemin([[x + dec - 2, yH], [x + dec - 2, yH - 3.5], [x + l + dec + 2, yH - 3.5], [x + l + dec + 2, yH]].map(T), blanc(h.a.arete), true),
      h.path(`M${pt(T([x + dec + l / 2 - 6, yH - 3.5]))} Q${pt(T([x + dec + l / 2, yH - 11]))} ${pt(T([x + dec + l / 2 + 6, yH - 3.5]))}`, blanc(h.a.arete)),
    ].join('\n');
  };

  // Bac de plastique fermé, en élévation.
  const bac = (T, x, yBas, l, ht) => {
    const yH = yBas - ht;
    return [
      h.chemin([[x, yH], [x + 1.5, yBas - 3], [x + 4.5, yBas], [x + l - 4.5, yBas], [x + l - 1.5, yBas - 3], [x + l, yH]].map(T), blanc(h.a.contour)),
      h.chemin([[x - 2.5, yH + 2], [x - 2.5, yH - 3.5], [x + l + 2.5, yH - 3.5], [x + l + 2.5, yH + 2]].map(T), blanc(h.a.arete), true),
      h.ligne(...T([x + 3, yH + 8]), ...T([x + l - 3, yH + 8]), h.a.fin),
    ].join('\n');
  };

  return {
    ref: '65-09',
    titre: 'Le froid qu’on fabrique au bois',
    desc: 'Quatre coupes. Au ruisseau : une chaudière fermée, couvercle bien assis, posée au plus creux du courant sous une épinette, ' +
      'une roche sur le couvercle et une corde qui remonte à un piquet de la rive. Au pied d’un talus exposé au nord : le tapis de mousse ' +
      'levé d’un morceau, un trou dans le sol minéral garni de branches de sapin, deux bacs fermés, le tapis remis par-dessus en couvercle. ' +
      'Dans la neige : un chaudron posé sur la croûte, qui ne perd sa chaleur que par le fond, à côté du même chaudron enfoncé dans un trou, ' +
      'la neige tassée tout autour jusqu’au bord, couvercle à demi. À la berge d’un ruisseau, rive nord : une niche creusée dans le sable ' +
      'saturé sous un surplomb de racines, les poissons dans un sac au fond, du sable mouillé par-dessus, un bouchon de mousse à l’entrée.',
    format: 'pleine',
    disposition: [['ruisseau', 'mousse'], ['neige', 'berge']],
    vues: {
      // ─── La chaudière au creux du ruisseau, coupe en travers du lit ─────────────────────
      ruisseau: {
        titre: 'Au creux du ruisseau',
        dessin: z => V1(z).dessin,
        renvois: z => V1(z).renvois,
      },
      // ─── Le trou sous la mousse, coupe au pied du talus ─────────────────────────────────
      mousse: {
        titre: 'Sous la mousse, au pied du talus',
        dessin: z => V2(z).dessin,
        renvois: z => V2(z).renvois,
      },
      // ─── La neige : posé contre enfoncé ─────────────────────────────────────────────────
      neige: {
        titre: 'Dans la neige : enfoncé, pas posé',
        dessin: z => V3(z).dessin,
        renvois: z => V3(z).renvois,
      },
      // ─── La niche de berge, coupe en travers de la rive ─────────────────────────────────
      berge: {
        titre: 'La niche de berge',
        dessin: z => V4(z).dessin,
        renvois: z => V4(z).renvois,
      },
    },
  };

  // ── Vue 1 : le ruisseau ──────────────────────────────────────────────────────────────
  function V1(z) {
    const { T } = repere(z);
    const yw = 150;
    const sol = [[0, 108], [40, 108], [64, 110], [84, 120], [98, 136], [108, yw],
      [118, 172], [138, 202], [165, 228], [192, 245], [218, 248], [244, 245], [266, 230], [286, 200], [302, 168], [310, yw], [320, 146]];
    const lit = sol.slice(5, 16);
    const cx = 218, yB = 245, yT = 189, wb = 44, wt = 54;
    const oreilleG = [cx - wt / 2 + 1, yT + 8], oreilleD = [cx + wt / 2 - 1, yT + 8];
    const anse = t => {
      const b = [3 * (1 - t) ** 2 * t, 3 * (1 - t) * t * t];
      return [oreilleG[0] + (oreilleD[0] - oreilleG[0]) * (b[1] + t ** 3), oreilleG[1] - 44 * (b[0] + b[1])];
    };
    const sommet = anse(0.5);
    const piquet = [58, 94];
    const c1 = [170, 150], c2 = [110, 112];
    const corde = t => [0, 1].map(k => (1 - t) ** 3 * sommet[k] + 3 * (1 - t) ** 2 * t * c1[k] + 3 * (1 - t) * t * t * c2[k] + t ** 3 * piquet[k]);
    const filet = (y, l, ht) => {
      const x = cx - l / 2;
      return [
        h.path(`M${pt(T([x + ht / 2, y]))} L${pt(T([x + l - ht / 2, y]))} Q${pt(T([x + l, y]))} ${pt(T([x + l, y + ht / 2]))} ` +
          `Q${pt(T([x + l, y + ht]))} ${pt(T([x + l - ht / 2, y + ht]))} L${pt(T([x + ht / 2, y + ht]))} ` +
          `Q${pt(T([x, y + ht]))} ${pt(T([x, y + ht / 2]))} Q${pt(T([x, y]))} ${pt(T([x + ht / 2, y]))}Z`, blanc(h.a.arete)),
        h.path(`M${pt(T([x + 6, y + ht * 0.4]))} Q${pt(T([cx, y + ht * 0.2]))} ${pt(T([x + l - 6, y + ht * 0.45]))} ` +
          `M${pt(T([x + 8, y + ht * 0.72]))} Q${pt(T([cx, y + ht * 0.55]))} ${pt(T([x + l - 8, y + ht * 0.75]))}`, h.a.fin),
      ].join('\n');
    };
    const dessin = [
      h.path(cr(sol.map(T)) + ` L${pt(T([W, H]))} L${pt(T([0, H]))}Z`, h.a.hachure('terre', 'aucun')),
      h.path(cr(lit.map(T)) + 'Z', blanc(h.a.hachure('eau', 'aucun'))),
      h.path(cr(lit.map(T)) + 'Z', h.a.hachure('eau', 'aucun')),
      h.path(cr(lit.map(T)) + ' L' + cr(lit.slice().reverse().map(([x, y]) => T([x, y + 7])), true).slice(1), blanc(h.a.hachure('gravier', 'aucun'))),
      h.path(cr(lit.map(T)) + ' L' + cr(lit.slice().reverse().map(([x, y]) => T([x, y + 7])), true).slice(1), h.a.hachure('gravier', 'aucun')),
      h.path(cr(sol.map(T)), h.a.arete),
      h.ligne(...T([108, yw]), ...T([310, yw]), h.a.arete),
      epinette(T, 22, 4, 108, 24),
      // piquet planté dans la rive
      h.chemin([[piquet[0] - 2.5, piquet[1]], [piquet[0] + 2.5, piquet[1]], [piquet[0] + 2.5, 124], [piquet[0], 129], [piquet[0] - 2.5, 124]].map(T), blanc(h.a.arete), true),
      // la corde
      h.path(`M${pt(T(sommet))} C${pt(T(c1))} ${pt(T(c2))} ${pt(T(piquet))}`, h.a.arete),
      // la chaudière en coupe
      h.chemin([[cx - wt / 2, yT], [cx - wb / 2, yB], [cx + wb / 2, yB], [cx + wt / 2, yT]].map(T), blanc(h.a.contour), true),
      filet(yB - 17, 40, 14),
      filet(yB - 32, 44, 14),
      filet(yB - 47, 48, 14),
      // couvercle, rebord pris sur la lèvre
      h.chemin([[cx - wt / 2 - 3, yT + 5], [cx - wt / 2 - 3, yT - 3], [cx + wt / 2 + 3, yT - 3], [cx + wt / 2 + 3, yT + 5]].map(T), blanc(h.a.contour), true),
      // roche sur le couvercle
      roche(T, cx, yT - 12, 16, 9, 2, blanc(h.a.arete)),
      // anse
      h.path(`M${pt(T(oreilleG))} C${pt(T([oreilleG[0], oreilleG[1] - 44]))} ${pt(T([oreilleD[0], oreilleD[1] - 44]))} ${pt(T(oreilleD))}`, h.a.arete),
      h.cercle(...T(oreilleG), 1.6, h.a.plein),
      h.cercle(...T(oreilleD), 1.6, h.a.plein),
    ].join('\n');
    const renvois = [
      { n: 1, rond: T([298, 84]), cible: T([cx + 15, yT - 9]), texte: 'Couvercle bien assis, roche en lest dessus' },
      { n: 2, rond: T([300, 254]), cible: T([262, 218]), texte: 'Au plus creux du courant, à l’ombre' },
      { n: 3, rond: T([150, 62]), cible: T(corde(0.62)), texte: 'Corde jusqu’à un piquet de la rive' },
    ];
    return { dessin, renvois };
  }

  // ── Vue 2 : le trou sous la mousse ───────────────────────────────────────────────────
  function V2(z) {
    const { T } = repere(z);
    const e = 10;
    const gauche = [[0, 152], [34, 151], [70, 152]];
    const droite = [[182, 145], [205, 128], [240, 100], [275, 76], [305, 60], [320, 55]];
    const trou = [[70, 152], [76, 238], [176, 238], [182, 145]];
    const couvercle = [[71.5, 151], [126, 149.5], [180.5, 144.5]];
    const dessin = [
      h.chemin(gauche.concat(trou.slice(1, 3), droite, [[W, H], [0, H]]).map(T), h.a.hachure('terre', 'aucun'), true),
      h.chemin(trou.map(T), h.a.blanc, true),
      // garniture de sapin : fond, parois
      rameau(T, [80, 234], [128, 233]),
      rameau(T, [124, 235], [172, 233]),
      rameau(T, [77, 230], [73, 176]),
      rameau(T, [175, 230], [179, 172]),
      // les bacs fermés
      bac(T, 84, 229, 42, 50),
      bac(T, 132, 229, 39, 50),
      // sapin par-dessus
      rameau(T, [80, 168], [128, 166]),
      rameau(T, [124, 167], [177, 164]),
      rameau(T, [78, 158], [122, 157]),
      rameau(T, [126, 157], [179, 153]),
      // le sol et les parois du trou
      h.chemin(gauche.map(T), h.a.arete),
      h.chemin(droite.map(T), h.a.arete),
      h.chemin(trou.map(T), h.a.contour),
      // la mousse en place, et le tapis remis en couvercle
      mousse(T, gauche, e),
      mousse(T, droite, e),
      mousse(T, couvercle, e),
      h.ligne(...T([71.5, 151]), ...T([71.5, 141]), h.a.arete),
      h.ligne(...T([180.5, 144.5]), ...T([180.5, 134.5]), h.a.arete),
      h.chemin(couvercle.map(T), h.a.arete),
    ].join('\n');
    const renvois = [
      { n: 4, rond: T([282, 238]), cible: T([248, 196]), texte: 'Pied du talus nord : sol minéral froid' },
      { n: 5, rond: T([124, 108]), cible: T([124, 140]), texte: 'Tapis levé d’un morceau, remis en couvercle' },
      { n: 6, rond: T([28, 205]), cible: T([96, 205]), texte: 'Bacs fermés, garnis de sapin tout autour' },
    ];
    return { dessin, renvois };
  }

  // ── Vue 3 : la neige, posé contre enfoncé ────────────────────────────────────────────
  function V3(z) {
    const { T, s, ox, oy } = repere(z);
    const yc = 128;
    const trouG = y => 180 + (y - yc) / 70 * 6, trouD = y => 300 - (y - yc) / 70 * 6;
    const xP = 202, lP = 80, hP = 54;
    // neige tassée : des points de plus entre ceux du motif, dans le trou, hors du chaudron
    let tasse = '';
    const X0 = Math.floor(T([180, 0])[0]), X1 = Math.ceil(T([300, 0])[0]);
    const Y0 = Math.floor(T([0, yc])[1]), Y1 = Math.ceil(T([0, 198])[1]);
    for (let X = X0 - (X0 % 4); X <= X1; X += 4) {
      for (let Y = Y0 - (Y0 % 4); Y <= Y1; Y += 4) {
        const m = `${X % 8},${Y % 8}`;
        const okMotif = ['6,2', '2,6', '4,0', '0,4'].includes(m);
        if (!okMotif) continue;
        const x = (X - ox) / s, y = (Y - oy) / s;
        if (y < yc + 1.5 || y > 197 || x < trouG(y) + 1.5 || x > trouD(y) - 1.5) continue;
        if (x > xP - 3 && x < xP + lP + 3 && y < yc + hP + 3) continue;
        tasse += `<circle cx="${X}" cy="${Y}" r="0.7"/>`;
      }
    }
    const fl = (a, b) => h.fleche(`M${pt(T(a))} L${pt(T(b))}`, h.a.detail);
    const dessin = [
      h.chemin([[0, yc], [W, yc], [W, H], [0, H]].map(T), h.a.hachure('neige', 'aucun'), true),
      `<g fill="#1A1A1A" stroke="none">${tasse}</g>`,
      // croûte, cassée là où on a creusé
      h.ligne(...T([0, yc]), ...T([W, yc]), h.a.arete),
      h.ligne(...T([0, yc + 4]), ...T([180, yc + 4]), h.a.detail),
      h.ligne(...T([300, yc + 4]), ...T([W, yc + 4]), h.a.detail),
      // le trou, rempli de neige tassée
      h.chemin([[180, yc], [186, 198], [294, 198], [300, yc]].map(T), h.a.cache),
      // posé sur la croûte
      chaudron(T, 30, yc, lP, hP),
      fl([52, yc + 3], [52, yc + 16]),
      fl([88, yc + 3], [88, yc + 16]),
      // enfoncé jusqu'au bord
      chaudron(T, xP, yc + hP, lP, hP),
      ...[yc + 18, yc + 38].flatMap(y => [fl([xP - 2, y], [xP - 14, y]), fl([xP + lP + 2, y], [xP + lP + 14, y])]),
      fl([xP + 22, yc + hP + 3], [xP + 22, yc + hP + 15]),
      fl([xP + lP - 22, yc + hP + 3], [xP + lP - 22, yc + hP + 15]),
    ].join('\n');
    const renvois = [
      { n: 7, rond: T([40, 30]), cible: T([36, 100]), texte: 'Posé sur la croûte : des heures de plus' },
      { n: 8, rond: T([228, 72]), cible: T([xP + 8, yc - 2]), texte: 'Enfoncé jusqu’au bord, couvercle à demi' },
      { n: 9, rond: T([240, 234]), cible: T([240, 192]), texte: 'Neige tassée tout autour' },
    ];
    return { dessin, renvois };
  }

  // ── Vue 4 : la niche de berge ────────────────────────────────────────────────────────
  function V4(z) {
    // La scène est agrandie autour de la niche, et découpée au bord de la vue.
    const T0 = repere(z).T, k = 1.3, c = [146, 150];
    const T = p => T0([c[0] + (p[0] - c[0]) * k, c[1] + (p[1] - c[1]) * k]);
    const yw = 160;
    const dessus = [[0, 62], [60, 64], [120, 62], [150, 63], [172, 66], [188, 74]];
    const dessous = [[186, 82], [170, 88], [150, 94], [138, 98], [100, 96], [0, 95]];
    const face = [[138, 98], [131, 112], [134, 130], [141, 148], [146, yw]];
    const lit = [[146, yw], [156, 196], [184, 222], [230, 231], [W, 233]];
    // La niche plonge sous le niveau de l'eau derrière une lèvre qui reste hors de l'eau : les
    // poissons sont dans le sable saturé, et le courant n'entre pas par l'ouverture.
    const niche = [[131, 112], [100, 106], [70, 110], [54, 126], [51, 152], [58, 178], [90, 191], [120, 188], [134, 174], [138, 158], [141, 148]];
    const sac = [[64, 147], [90, 143], [110, 146], [116, 156], [116, 172], [108, 180], [86, 183], [64, 179], [60, 164]];
    const sable = dessous.slice(3).reverse().concat(face.slice(1), lit.slice(1), [[W, H], [0, H]]);
    const sature = [[0, yw], [146, yw]].concat(lit.slice(1), [[W, H], [0, H]]);
    const eau = [[146, yw]].concat(lit.slice(1), [[W, yw]]);
    // racines : dans la motte, et qui pendent sous le surplomb
    let racines = '';
    [[[84, 66], [120, 76], [160, 74], [184, 78]], [[82, 70], [110, 86], [150, 88], [176, 84]],
      [[74, 68], [40, 80], [8, 78]], [[78, 72], [52, 90], [20, 90]], [[90, 70], [118, 94], [132, 108]]]
      .forEach(p => { racines += ' ' + cr(p.map(T)); });
    [[150, 94, 8], [160, 91, 12], [170, 88, 7], [180, 84, 10]].forEach(([x, y, l]) => {
      racines += ` M${pt(T([x, y]))} Q${pt(T([x - 3, y + l / 2]))} ${pt(T([x + 1, y + l]))}`;
    });
    const dessin = [
      `<clipPath id="rogne-40-09-berge"><rect x="0" y="0" width="${f(z.l)}" height="${f(z.h)}"/></clipPath>`,
      '<g clip-path="url(#rogne-40-09-berge)">',
      h.chemin(sable.map(T), h.a.hachure('gravier', 'aucun'), true),
      h.chemin(sature.map(T), h.a.hachure('eau', 'aucun'), true),
      h.chemin(eau.map(T), h.a.blanc, true),
      h.chemin(eau.map(T), h.a.hachure('eau', 'aucun'), true),
      // la motte de racines, et l'arbre qui la tient
      h.chemin(dessus.concat(dessous).map(T), h.a.blanc, true),
      h.path(racines, h.a.detail),
      h.chemin([[70, 0], [70, 63], [86, 63], [86, 0]].map(T), blanc(h.a.arete)),
      h.path(`M${pt(T([74, 6]))} L${pt(T([75, 30]))} M${pt(T([81, 18]))} L${pt(T([80, 48]))} M${pt(T([76, 40]))} L${pt(T([77, 58]))}`, h.a.fin),
      mousse(T, dessus.slice(0, 1).concat([[68, 64]]), 7),
      mousse(T, [[88, 63.5], [120, 62], [150, 63], [172, 66], [184, 71.5]], 7),
      h.chemin(dessous.map(T), h.a.arete),
      h.ligne(...T([188, 74]), ...T([186, 82]), h.a.arete),
      // la rive, le lit, l'eau
      h.path(cr(face.map(T)) + ' ' + cr(lit.map(T), false), h.a.arete),
      h.ligne(...T([146, yw]), ...T([W, yw]), h.a.arete),
      h.ligne(...T([34, yw]), ...T([52, yw]), h.a.cache),
      // la niche : sable mouillé, le sac et ses poissons, la mousse à l'entrée
      h.path(crFerme(niche.map(T)), h.a.blanc),
      h.path(crFerme(niche.map(T)), h.a.hachure('gravier', 'aucun')),
      h.path(crFerme(niche.map(T)), h.a.hachure('eau', 'aucun')),
      h.path(crFerme(sac.map(T)), blanc(h.a.arete)),
      poisson(T, 86, 156, 44),
      poisson(T, 90, 170, 44),
      h.path(`M${pt(T([116, 159]))} L${pt(T([122, 162.5]))} M${pt(T([116, 169]))} L${pt(T([122, 165.5]))}`, h.a.detail),
      h.ligne(...T([119, 160]), ...T([119, 168]), h.a.arete),
      mousse(T, [[124, 113], [124, 130], [128, 144], [131, 150]], 11),
      h.path(cr(niche.map(T)), h.a.contour),
      '</g>',
    ].join('\n');
    const renvois = [
      { n: 10, rond: T0([262, 30]), cible: T([183, 76]), texte: 'Rive nord, sous un surplomb de racines' },
      { n: 11, rond: T0([40, 300]), cible: T([60, 215]), texte: 'Sable saturé, au froid de l’eau courante' },
      { n: 12, rond: T0([16, 200]), cible: T([66, 170]), texte: 'Poissons en sac, sable mouillé, mousse' },
    ];
    return { dessin, renvois };
  }
};
