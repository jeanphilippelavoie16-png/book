// Planche 43-03 — Les petites empreintes, grandeur nature
// (chapitre 43, §9 « Les gabarits à l'échelle » : les planches d'empreintes sont dessinées grandeur
// nature, règle imprimée à côté ; on pose le livre ouvert à côté de l'empreinte et on compare.)
//
// L'échelle. La planche fait 680 unités de large et, au format « pleine », s'imprime sur l'empagement
// de 167,2 mm, comme 43-01 et 43-02 : 1 mm = 680 / 167,2 = 4,067 unités. La règle de 10 cm le vérifie sur le papier.
//
// Les tailles viennent du tableau 5-E et 5-F du chapitre ; chaque empreinte est dessinée au milieu
// de la fourchette que le chapitre donne (la fourchette est dans la légende) :
//   lièvre, arrière    8 à 15 cm de long, 4 à 12,5 de large     → 115 × 82,5 mm, talon compris (§6)
//   lièvre, avant      5 à 7,5 cm de long, largeur non donnée   → 62,5 mm ; largeur de proportion
//   martre, avant      4 à 7 × 3,5 à 6,5 cm                     → 55 × 50 mm, pied poilu, coussinets flous
//   vison, avant       3 à 5 × 2 à 4,5 cm                       → 40 × 32,5 mm
//   belette            2 à 3 × 1 à 2 cm                         → 25 × 15 mm
//   gélinotte huppée   4 à 5,5 × 4,5 à 6 cm                     → 47,5 × 52,5 mm, écailles d'hiver
// Mustélidés : cinq doigts un-trois-un, griffes (5-E) ; les griffes ne comptent pas dans la
// longueur (§6). Gélinotte : trois doigts devant, un petit derrière, les écailles de l'hiver sur
// les côtés des doigts (5-F).
// Laissés de côté : l'écureuil roux et le rat musqué (le chapitre ne donne que des longueurs, ni
// le nombre de doigts ni la forme), le canard et le tétras (aucune mesure dans le chapitre).
// Toutes les empreintes ont les doigts vers le haut : la bête allait vers le haut de la page.
// La charte (empreinte grandeur nature : pas de gris, pas de rouge) : le bord des pieds poilus du
// lièvre et de la martre passe à 2,4, comme le contour des grands gabarits de la 43-01.
module.exports = (h) => {
  const S = 680 / 167.2;                       // unités de vue par mm, à l'impression
  const f = (n) => (Math.round(n * 10) / 10).toFixed(1);

  // Catmull-Rom fermé ou ouvert → segments de Bézier
  const lisse = (P, ferme = true) => {
    const n = P.length, g = (i) => (ferme ? P[(i + n) % n] : P[Math.max(0, Math.min(n - 1, i))]);
    let d = `M${f(P[0][0])} ${f(P[0][1])}`;
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      d += ` C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
    }
    return d + (ferme ? ' Z' : '');
  };
  // point d'une Catmull-Rom, pour densifier un contour
  const cr = (p0, p1, p2, p3, t) => [0, 1].map((k) => 0.5 * (2 * p1[k] + (-p0[k] + p2[k]) * t
    + (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * t * t + (-p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k]) * t * t * t));
  const densifie = (P, pas) => {
    const n = P.length, out = [];
    for (let i = 0; i < n; i++) {
      const p0 = P[(i - 1 + n) % n], p1 = P[i], p2 = P[(i + 1) % n], p3 = P[(i + 2) % n];
      const k = Math.max(1, Math.round(Math.hypot(p2[0] - p1[0], p2[1] - p1[1]) / pas));
      for (let j = 0; j < k; j++) out.push(cr(p0, p1, p2, p3, j / k));
    }
    return out;
  };
  // contour d'un pied poilu : le bord de l'empreinte n'est pas net, il frise un peu
  const poilu = (P, amp, pas, graine) => {
    const D = densifie(P, pas), n = D.length;
    return D.map((p, i) => {
      const a = D[(i - 1 + n) % n], b = D[(i + 1) % n];
      const tx = b[0] - a[0], ty = b[1] - a[1], l = Math.hypot(tx, ty) || 1;
      const r = amp * (0.6 * Math.sin(i * 2.7 + graine) + 0.4 * Math.sin(i * 5.3 + 3 * graine));
      return [p[0] + (ty / l) * r, p[1] - (tx / l) * r];
    });
  };
  // demi-contour (côté droit, de l'avant au talon) → contour fermé
  const miroir = (demi) => [...demi, ...demi.slice(1, -1).reverse().map(([x, y]) => [-x, y])];
  // repère d'une empreinte : origine (ox, oy) en unités de vue ; x à droite, y vers l'avant, en mm
  const rep = (ox, oy) => ([x, y]) => [ox + x * S, oy - y * S];
  // ovale de centre (cx, cy), demi-axes rx (en travers) et ry (dans l'axe), axe penché de ang
  // (radians, depuis l'avant vers la droite), en mm
  const ovale = (cx, cy, rx, ry, ang) => {
    const P = [];
    for (let k = 0; k < 14; k++) {
      const t = (k / 14) * 2 * Math.PI, lx = rx * Math.cos(t), ly = ry * Math.sin(t);
      P.push([cx + lx * Math.cos(ang) + ly * Math.sin(ang), cy - lx * Math.sin(ang) + ly * Math.cos(ang)]);
    }
    return P;
  };

  // ─── Le lièvre : pied poilu, doigts qui s'écartent devant, talon long et étroit ─────────────────
  const LIEVRE_ARR = miroir([[0, 57.5], [17, 55.8], [30, 50.5], [38.5, 41], [41.25, 28], [40, 15], [35.5, 2],
    [29, -12], [23, -26], [19, -38], [16.5, -47], [12.5, -54], [6, -57.2], [0, -57.5]]);
  const LIEVRE_AV = miroir([[0, 31.25], [11, 29.8], [18.5, 24], [22.5, 13], [22, 1], [18.5, -12], [13, -23],
    [6.5, -29.8], [0, -31.25]]);
  // le creux du pied poilu est pointillé : c'est la surface que le pied a tassée
  const pied = (ox, oy, contour, graine) => h.path(lisse(poilu(contour, 0.45, 2.2, graine).map(rep(ox, oy))), h.a.hachure('neige', 'contour'));

  // ─── Les mustélidés : cinq doigts un-trois-un, coussinet en chevron, griffes ───────────────────
  // En fraction de la largeur (u) et de la longueur (v) ; pied avant droit, petit doigt à gauche.
  const DOIGTS = [[-0.42, 0.03, 0.062, 0.058], [-0.19, 0.33, 0.078, 0.075], [0, 0.425, 0.08, 0.075],
    [0.19, 0.36, 0.078, 0.075], [0.42, 0.13, 0.07, 0.068]];
  const CHEVRON = [[0, 0.15], [0.14, 0.09], [0.24, -0.03], [0.29, -0.2], [0.28, -0.37], [0.22, -0.47],
    [0.14, -0.43], [0.07, -0.29], [0, -0.22], [-0.07, -0.30], [-0.14, -0.46], [-0.22, -0.50], [-0.29, -0.40],
    [-0.31, -0.22], [-0.26, -0.04], [-0.15, 0.09]];
  const mustelide = (ox, oy, W, L, flou = false) => {
    const T = rep(ox, oy), out = [];
    const coussinet = flou ? h.a.hachure('bois', 'detail') : h.a.plein;
    const pose = (d) => (flou ? [h.path(d, h.a.blanc), h.path(d, coussinet)] : [h.path(d, coussinet)]);
    out.push(...pose(lisse(CHEVRON.map(([u, v]) => T([u * W, v * L])))));
    for (const [u, v, ru, rv] of DOIGTS) {
      const cx = u * W, cy = v * L, rx = ru * W, ry = rv * L;
      const ang = Math.atan2(cx, cy + 0.12 * L);          // le doigt pointe à l'opposé du coussinet
      out.push(...pose(lisse(ovale(cx, cy, rx, ry, ang).map(T))));
      const dx = Math.sin(ang), dy = Math.cos(ang), nx = dy, ny = -dx;
      const d0 = ry + 0.03 * L, d1 = d0 + 0.065 * L, b = 0.32 * rx;
      const griffe = [[cx + dx * d0 + nx * b, cy + dy * d0 + ny * b], [cx + dx * d1, cy + dy * d1],
        [cx + dx * d0 - nx * b, cy + dy * d0 - ny * b]].map(T);
      out.push(h.chemin(griffe, h.a.plein, true));
    }
    return out.join('\n');
  };
  // la martre l'hiver : pied poilu (le contour de l'empreinte), coussinets flous en dedans
  const MARTRE_POIL = miroir([[0, 0.5], [0.2, 0.48], [0.37, 0.39], [0.47, 0.22], [0.5, 0.02], [0.47, -0.18],
    [0.39, -0.36], [0.24, -0.47], [0, -0.5]]);
  const martre = (ox, oy) => [
    h.path(lisse(poilu(MARTRE_POIL.map(([u, v]) => [u * 50, v * 55]), 0.4, 2, 5).map(rep(ox, oy))), h.a.hachure('neige', 'contour')),
    mustelide(ox, oy, 40, 44, true),
  ].join('\n');

  // ─── La gélinotte l'hiver : trois doigts frangés d'écailles devant, un petit derrière ──────────
  const doigtOiseau = (T, a, b, w0, w1, frange) => {
    const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy), ux = dx / l, uy = dy / l, nx = uy, ny = -ux;
    const P = (s, t) => [a[0] + ux * s + nx * t, a[1] + uy * s + ny * t];
    const w = (s) => (w0 + (w1 - w0) * s / l) / 2;
    const corps = [P(0, w(0)), P(l * 0.5, w(l * 0.5)), P(l, w(l)), P(l + w1 * 0.45, w1 * 0.3), P(l + w1 * 0.55, 0),
      P(l + w1 * 0.45, -w1 * 0.3), P(l, -w(l)), P(l * 0.5, -w(l * 0.5)), P(0, -w(0))];
    const out = [h.chemin(corps.map(T), h.a.plein, true)];
    out.push(h.chemin([P(l + 0.2, 0.75), P(l + 2.0, 0), P(l + 0.2, -0.75)].map(T), h.a.plein, true));
    if (frange) {               // les écailles de l'hiver : une frange courte de chaque côté du doigt
      let d = '';
      for (let s = l * 0.12; s <= l * 0.9; s += 1.45) {
        for (const c of [1, -1]) {
          const [x1, y1] = T(P(s, c * (w(s) - 0.1))), [x2, y2] = T(P(s + 0.35, c * (w(s) + 1.4)));
          d += `M${f(x1)} ${f(y1)} L${f(x2)} ${f(y2)} `;
        }
      }
      out.push(h.path(d.trim(), h.a.detail));
    }
    return out.join('\n');
  };
  const gelinotte = (ox, oy) => {
    const T = rep(ox, oy);
    return [
      doigtOiseau(T, [0, 1.5], [0, 31], 3.8, 2.4, true),
      doigtOiseau(T, [1.2, 1.0], [23.2, 17.0], 3.6, 2.3, true),
      doigtOiseau(T, [-1.2, 1.0], [-23.2, 17.0], 3.6, 2.3, true),
      doigtOiseau(T, [0, -1.2], [-1.0, -12.6], 3.0, 2.2, false),
      h.path(lisse(ovale(0, 0.4, 3.0, 3.4, 0).map(T)), h.a.plein),
    ].join('\n');
  };

  // ─── La règle de 10 cm : un trait par mm, un moyen aux 5 mm, un long et un chiffre par cm ─────
  const regle = (x, yHaut) => {
    const out = [h.ligne(x, yHaut, x, f(yHaut + 100 * S), h.a.arete)];
    for (let mm = 0; mm <= 100; mm += 1) {
      const y = f(yHaut + (100 - mm) * S);
      const long = mm % 10 === 0 ? 14 : mm % 5 === 0 ? 9 : 5;
      out.push(h.ligne(x - long, y, x, y, mm % 5 === 0 ? h.a.detail : h.a.fin));
      if (mm % 10 === 0) out.push(h.texte(x + 9, f(+y + 4), String(mm / 10)));
    }
    out.push(h.texte(x + 6, yHaut - 10, 'cm'));
    return out.join('\n');
  };

  // positions (unités de vue) — voir la mise en place en tête du fichier
  const H = [170, 240], F = [495, 135], M = [495, 385], V = [75, 560], B = [530, 580], G = [295, 575];

  return {
    ref: '43-03',
    titre: 'Les petites empreintes, grandeur nature',
    desc: 'Six empreintes dessinées à l’échelle 1:1, doigts vers le haut, avec une règle de 10 cm pour vérifier '
      + 'l’échelle à l’impression : le pied arrière du lièvre, long et étroit au talon, élargi devant, et son pied '
      + 'avant, plus petit ; le pied avant de la martre l’hiver, poilu, aux coussinets flous ; ceux du vison et de la '
      + 'belette, cinq doigts disposés un-trois-un devant un coussinet en chevron, avec les griffes ; la gélinotte '
      + 'huppée l’hiver, trois doigts frangés d’écailles devant et un petit derrière.',
    format: 'pleine',
    vues: {
      gabarits: {
        dessin: () => [
          pied(H[0], H[1], LIEVRE_ARR, 1),
          pied(F[0], F[1], LIEVRE_AV, 2),
          martre(M[0], M[1]),
          mustelide(V[0], V[1], 32.5, 40),
          mustelide(B[0], B[1], 15, 25),
          gelinotte(G[0], G[1]),
          regle(358, 22),
        ].join('\n'),
        renvois: () => [
          { n: 1, rond: [18, 300], cible: [58, 300], texte: 'lièvre, pied arrière, 8 à 15 cm' },
          { n: 2, rond: [585, 270], cible: [548, 226], texte: 'lièvre, pied avant, 5 à 7,5 cm' },
          { n: 3, rond: [400, 520], cible: [430, 470], texte: 'martre, pied avant l’hiver, 4 à 7 cm' },
          { n: 4, rond: [170, 625], cible: [112, 600], texte: 'vison, pied avant, 3 à 5 cm' },
          { n: 5, rond: [585, 625], cible: [549, 612], texte: 'belette, 2 à 3 cm' },
          { n: 6, rond: [430, 590], cible: [372, 522], texte: 'gélinotte huppée l’hiver, 4 à 5,5 cm' },
        ],
      },
    },
  };
};
