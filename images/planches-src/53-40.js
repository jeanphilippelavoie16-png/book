// Planche 53-40. La perche à écureuils (chapitre 53, §9, « L'écureuil roux se prend à la perche »).
// Dessinée le 15 octobre 2026 (inventaire des planches, priorité moyenne).
//
// Le texte dit les collets « posés à plat sur le dessus ». Le sens de la boucle est tranché par la
// source : US Army FM 21-76, p. 82 et figure 8-8 (sources/49-us-army-fm21-76-perche-a-ecureuils.md) :
// le fil fait un tour sur la perche, la boucle se dresse en travers de la perche, décollée du bois,
// sur le dessus et sur les côtés. La planche dessine ce sens-là.
// Aucune cote : le chapitre ne donne ni la longueur de la perche, ni le diamètre de la boucle, ni sa
// hauteur au-dessus du bois. Les proportions de la boucle (5 à 6 cm, à 2,5 cm du bois) suivent la
// source, sans chiffre imprimé. L'échelle se lit à la bête et au poignet que fait la perche.
module.exports = (h) => {
  const A = h.a;
  const f1 = v => Math.round(v * 10) / 10;
  const W = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const RAD = Math.PI / 180;

  // Courbe lisse (Catmull-Rom) par des points.
  const lisse = (pts, ferme = false) => {
    const n = pts.length, P = i => ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
    let d = `M${f1(pts[0][0])} ${f1(pts[0][1])}`;
    const fin = ferme ? n : n - 1;
    for (let i = 0; i < fin; i++) {
      const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C${f1(c1[0])} ${f1(c1[1])} ${f1(c2[0])} ${f1(c2[1])} ${f1(p2[0])} ${f1(p2[1])}`;
    }
    return ferme ? d + ' Z' : d;
  };
  // Repère : mm locaux (x le long de la perche, vers le haut ; y vers le bas) → unités de vue.
  const rep = (ox, oy, s, ang) => {
    const c = Math.cos(ang * RAD), si = Math.sin(ang * RAD);
    return p => [ox + s * (p[0] * c - p[1] * si), oy + s * (p[0] * si + p[1] * c)];
  };
  const map = (T, pts) => pts.map(T);

  // ─── L'écureuil, de profil, tourné vers +x, les pattes sur y = 0 (mm) ────────────────────────
  // Silhouette simple : corps, tête, oreille en pinceau, patte avant, patte arrière, queue en panache.
  const CORPS = [
    [191, -46], [188, -52], [180, -60], [168, -65], [156, -62], [146, -58], [128, -62], [100, -68], [70, -65],
    [48, -55], [35, -38], [34, -22], [38, -10], [44, -2], [64, -1], [80, 0], [81, -4], [70, -9], [80, -22],
    [100, -27], [120, -27], [127, -16], [130, -4], [137, 0], [148, 0], [148, -4], [140, -12], [144, -26], [158, -32],
    [172, -36], [184, -39], [190, -42],
  ];
  const QUEUE = [
    [46, -58], [30, -64], [17, -82], [14, -104], [22, -126], [38, -140], [56, -144], [70, -138], [74, -127],
    [66, -121], [56, -124], [44, -118], [36, -104], [36, -88], [44, -76], [58, -66],
  ];
  const OREILLE = [[153, -60], [152, -70], [155, -79], [160, -70], [162, -61]];
  const ecureuil = (T, s) => [
    h.path(lisse(map(T, QUEUE), true), W(A.arete)),
    h.path(lisse(map(T, CORPS), true), W(A.arete)),
    h.path(lisse(map(T, OREILLE), true), W(A.arete)),
    s > 0.3 ? h.path(lisse(map(T, [[52, -52], [70, -46], [82, -34], [82, -24]])), A.detail) : '',
    h.cercle(...T([174, -53]), Math.max(1, 2.8 * s), A.plein),
  ].join('\n');

  // ─── La perche vue de côté : un segment de cylindre, axe x local, rayon r (mm) ─────────────────
  const R_P = 30;                                        // grosse comme un poignet : ~6 cm de diamètre
  const perche = (T, x0, x1, { bout0 = 'casse', bout1 = 'casse' } = {}) => {
    const o = [];
    const haut = [[x0, -R_P], [x1, -R_P]], bas = [[x1, R_P], [x0, R_P]];
    o.push(h.chemin(map(T, [...haut, ...bas]), A.blanc, true));
    o.push(h.chemin(map(T, haut), A.contour), h.chemin(map(T, bas), A.contour));
    // l'écorce : quelques traits longs dans le fil
    for (const [y, a, b] of [[-12, 0.08, 0.42], [6, 0.3, 0.7], [18, 0.55, 0.92], [-4, 0.62, 0.95]]) {
      o.push(h.chemin(map(T, [[x0 + (x1 - x0) * a, y], [x0 + (x1 - x0) * b, y + 1.5]]), A.detail));
    }
    // les bouts cassés : un zigzag fin (la perche continue)
    const casse = x => map(T, [[x, -R_P], [x + 4, -R_P / 2], [x - 3, 0], [x + 4, R_P / 2], [x, R_P]]);
    if (bout0 === 'casse') o.push(h.chemin(casse(x0), A.detail));
    if (bout1 === 'casse') o.push(h.chemin(casse(x1), A.detail));
    return o.join('\n');
  };
  // Le collet vu de côté : deux tours de fil sur la perche, la tige, la boucle vue un peu de biais
  // (une ellipse, en travers de la perche), décollée du bois. xc : où il se fixe.
  const BOUCLE = 28;                                       // rayon de la boucle (mm), d'après la source
  const ECART = 25;                                        // décollée du bois (mm), d'après la source
  const BIAIS = 15;                                        // demi-largeur apparente de la boucle (vue de biais)
  const boucle = (xc, biais = BIAIS) => {
    const yB = -R_P - ECART, pts = [];
    for (let k = 0; k <= 32; k++) {
      const a = k / 32 * 2 * Math.PI;
      pts.push([xc + biais * Math.sin(a), yB - BOUCLE + BOUCLE * Math.cos(a)]);
    }
    return pts;                                            // 0…16 : moitié de devant ; 16…32 : derrière
  };
  const attache = (T, xc) => [
    // deux tours de fil sur la perche, en travers ; puis la tige qui décolle la boucle du bois
    ...[-3, 3].map(dx => h.chemin(map(T, [[xc + dx - 2.5, -R_P - 0.5], [xc + dx + 2.5, R_P + 0.5]]), A.arete)),
    h.chemin(map(T, [[xc, -R_P - 0.5], [xc, -R_P - ECART]]), A.arete),
  ].join('\n');
  const colletCote = (T, xc, biais) => [attache(T, xc), h.path(lisse(map(T, boucle(xc, biais)), true), A.arete)].join('\n');

  // ─── Vue 1 : posée contre l'arbre ─────────────────────────────────────────────────────────────
  const geomArbre = z => {
    const yG = z.h - 14, xT = z.l - 40, demiT = 14;
    const x0 = 30, yH = 50;                                 // pied de la perche ; hauteur du contact au tronc
    const xC = xT - demiT;
    const ang = Math.atan2(yH - yG, xC - x0) / RAD;       // la perche monte vers la droite
    const Lv = Math.hypot(xC - x0, yG - yH);
    const s = Math.min(0.16, Math.hypot(xC - x0, yG - yH) / 1300);   // unités de vue par mm
    const L = Lv / s;
    const T = rep(x0, yG, s, ang);
    return { yG, xT, demiT, s, L, T, ang };
  };
  const vueArbre = {
    titre: 'Contre l’arbre qu’il fréquente',
    dessin: z => {
      const { yG, xT, demiT, s, L, T, ang } = geomArbre(z);
      const o = [];
      // le sol
      o.push(h.chemin([[4, yG], [z.l - 4, yG]], A.arete));
      // l'amas de cônes au pied de l'arbre : un tas bas et quelques cônes
      o.push(h.path(lisse([[xT - 56, yG], [xT - 36, yG - 8], [xT - 10, yG - 12], [xT + 22, yG - 8], [xT + 34, yG]]), A.detail));
      for (const [dx, dy, a] of [[-42, -5, 20], [-28, -8, -10], [-12, -11, 35], [24, -6, -25], [6, -12, 5]]) {
        o.push(`<ellipse cx="${f1(xT + dx)}" cy="${f1(yG + dy)}" rx="4" ry="2.1" transform="rotate(${a} ${f1(xT + dx)} ${f1(yG + dy)})" ${W(A.detail)}/>`);
      }
      // le tronc, coupé en haut
      const tronc = [[xT - demiT, 4], [xT - demiT - 1, yG], [xT + demiT + 1, yG], [xT + demiT, 4]];
      o.push(h.chemin(tronc, A.blanc, true));
      o.push(h.chemin([[xT - demiT, 4], [xT - demiT - 1, yG]], A.contour), h.chemin([[xT + demiT, 4], [xT + demiT + 1, yG]], A.contour));
      o.push(h.chemin([[xT - demiT, 4], [xT - 6, 9], [xT + 2, 3], [xT + 9, 8], [xT + demiT, 4]], A.detail));
      for (const [y0, y1, dx] of [[20, 60, -6], [48, 110, 4], [96, 150, -2], [130, 180, 7]]) if (y1 < yG - 14) o.push(h.chemin([[xT + dx, y0], [xT + dx + 1, y1]], A.detail));
      // la perche, du sol au tronc : son bas posé sur le sol, son haut contre l'écorce
      o.push(perche(rep(...T([0, -R_P]), s, ang), 0, L, { bout0: 'net', bout1: 'net' }));
      // les collets : une file sur le dessus, ni au pied ni contre le tronc
      const Tp = rep(...T([0, -R_P]), s, ang);
      const n = 6;
      for (let i = 0; i < n; i++) o.push(colletCote(Tp, L * (0.3 + 0.55 * i / (n - 1)), 22));
      // l'écureuil qui monte, sur le bas de la perche
      o.push(ecureuil(rep(...Tp([L * 0.05, -R_P]), s * 1.25, ang), s * 1.25));
      return o.join('\n');
    },
    renvois: z => {
      const { s, L, T, xT, demiT, ang } = geomArbre(z);
      const Tp = rep(...T([0, -R_P]), s, ang);
      return [
        { n: 1, rond: [86, z.h - 30], cible: Tp([L * 0.4, R_P]), texte: 'perche grosse comme un poignet' },
        { n: 2, rond: [xT - demiT - 40, 22], cible: [xT - demiT, 36], texte: 'appuyée contre son arbre' },
      ];
    },
  };

  // ─── Vue 2 : en bout de perche (coupe) ───────────────────────────────────────────────────────
  const geomBout = z => {
    const s = Math.min((z.l - 24) / (2 * (R_P + ECART + 2 * BOUCLE) + 10), (z.h - 30) / (2 * R_P + ECART + 2 * BOUCLE + 40));
    const cx = z.l / 2, cy = z.h - 24 - R_P * s - 18;
    return { s, cx, cy };
  };
  const vueBout = {
    titre: 'En bout de perche',
    dessin: z => {
      const { s, cx, cy } = geomBout(z);
      const o = [];
      // la perche coupée : bois en hachure, écorce
      o.push(h.cercle(cx, cy, R_P * s, A.hachure('bois', 'contour')));
      // le fil : un tour serré autour de la perche
      o.push(h.cercle(cx, cy, R_P * s + 2.2, A.arete));
      // les trois collets : la tige qui part du tour de fil, puis la boucle debout (de face)
      for (const a of [-90, 180, 0]) {
        const u = [Math.cos(a * RAD), Math.sin(a * RAD)];
        const p0 = [cx + u[0] * (R_P * s + 2.2), cy + u[1] * (R_P * s + 2.2)];
        const p1 = [cx + u[0] * (R_P + ECART) * s, cy + u[1] * (R_P + ECART) * s];
        const c = [cx + u[0] * (R_P + ECART + BOUCLE) * s, cy + u[1] * (R_P + ECART + BOUCLE) * s];
        o.push(h.ligne(p0[0], p0[1], p1[0], p1[1], A.arete));
        o.push(h.cercle(c[0], c[1], BOUCLE * s, A.arete));
        // l'œillet : le petit tour qui ferme la boucle sur sa tige
        o.push(h.cercle(p1[0], p1[1], 2.2, W(A.arete)));
      }
      return o.join('\n');
    },
    renvois: z => {
      const { s, cx, cy } = geomBout(z);
      const r = R_P * s;
      return [
        { n: 3, rond: [cx + r + 30, cy + r + 16], cible: [cx + (r + 2.2) * Math.cos(50 * RAD), cy + (r + 2.2) * Math.sin(50 * RAD)], texte: 'un tour de fil sur la perche' },
        { n: 4, rond: [cx + 44, cy - (R_P + ECART + 2 * BOUCLE) * s - 4], cible: [cx + BOUCLE * s * 0.72, cy - (R_P + ECART + BOUCLE) * s - BOUCLE * s * 0.7], texte: 'boucle debout, décollée du bois' },
        { n: 5, rond: [cx - (R_P + ECART + 2 * BOUCLE) * s + 4, cy + r + 22], cible: [cx - (R_P + ECART + BOUCLE) * s, cy + BOUCLE * s], texte: 'sur le dessus et sur les côtés' },
      ];
    },
  };

  // ─── Vue 3 : au passage, de côté (gros plan) ─────────────────────────────────────────────────
  const ANG3 = -22;
  const geomPassage = z => {
    const s = 0.86;
    const T = rep(8, z.h - 30, s, ANG3);
    const L = (z.l - 16) / Math.cos(ANG3 * RAD) / s;
    const xc = 206;
    return { s, T, L, xc };
  };
  const vuePassage = {
    titre: 'Au passage',
    dessin: z => {
      const { s, T, L, xc } = geomPassage(z);
      const o = [];
      o.push(perche(T, 0, L));
      o.push(attache(T, xc));
      const b = boucle(xc, 19);
      // la bête : le cou dans la boucle, juste derrière l'oreille ; les pattes sur la perche
      const Tb = rep(...T([xc - 140, -R_P]), s, ANG3);
      o.push(h.path(lisse(map(T, b.slice(16))), A.arete));            // moitié de derrière, cachée par le cou
      o.push(ecureuil(Tb, s));
      const devant = lisse(map(T, b.slice(0, 17)));
      o.push(`<path d="${devant}" fill="none" stroke="#FFFFFF" stroke-width="5.5" stroke-linecap="round"/>`);
      o.push(h.path(devant, A.contour));                              // moitié de devant, sur le cou
      // là où ça se joue : les épaules qui butent contre le fil
      o.push(h.controle(...Tb([138, -62]), 11));
      return o.join('\n');
    },
    renvois: z => {
      const { s, T, xc } = geomPassage(z);
      return [
        { n: 6, rond: [z.l - 26, 18], cible: T([xc + BIAIS * 0.75, -R_P - ECART - 2 * BOUCLE + 7]), texte: 'la tête passe, les épaules butent' },
      ];
    },
  };

  return {
    ref: '53-40',
    titre: 'La perche à écureuils',
    desc: 'Trois vues. À gauche, l’arbre où l’écureuil roux mange, un petit tas de cônes au pied ; une perche de la grosseur d’un poignet appuyée en biais contre le tronc ; une file de collets de fil fin sur le dessus de la perche, ni au pied ni contre le tronc ; un écureuil qui monte par la perche. Au milieu, la perche coupée en travers : le fil fait un tour serré autour du bois, puis une courte tige le décolle de la surface et la boucle se dresse en travers de la perche, une sur le dessus et une de chaque côté. À droite, le gros plan de côté : l’écureuil qui court sur la perche a passé la tête dans la boucle, le fil lui serre le cou et ses épaules butent contre la boucle.',
    format: 'demi',
    disposition: [['arbre', 'bout', 'passage']],
    largeurs: [[1.25, 0.85, 1.3]],
    vues: { arbre: vueArbre, bout: vueBout, passage: vuePassage },
  };
};
