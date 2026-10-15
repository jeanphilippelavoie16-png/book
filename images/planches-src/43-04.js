// Planche 43-04. Le bâton de pistage (chapitre 43, §9 « Le bâton de pistage » ; « Quand la piste se
// perd », étape 3).
// Le chapitre : une branche droite d'environ 90 cm, écorcée par endroits pour que les marques se voient,
// pointue au bout. Sur la meilleure empreinte, on marque au couteau, à partir de la pointe : 1 la
// longueur de l'empreinte ; 2 sa largeur, comptée depuis la première encoche ; 3 le pas, d'une empreinte
// à la suivante de l'autre pied, de centre à centre, depuis la pointe ; 4 la largeur de la piste,
// reportée depuis la troisième vers la pointe. La piste perdue : la troisième encoche sur le centre de la
// dernière empreinte sûre, le bâton dans le sens de la marche ; la pointe tombe à la hauteur de la
// suivante, de l'autre pied, décalée sur le côté de la largeur de piste. Une bête qui bondit : la
// troisième encoche mesure d'un groupe au suivant.
// Vue 1 : la piste vue de dessus, les quatre mesures. Vue 2 : le bâton et ses quatre encoches, chaque
// intervalle nommé comme sur la piste. Vue 3 : la piste perdue. Vue 4 : la bête qui bondit.
// La piste est celle d'un cervidé au pas (le bâton sert surtout à retrouver une bête blessée, ch. 44).
// Seule cote chiffrée : les 90 cm du bâton (chapitre). Les autres intervalles sont nommés, pas chiffrés :
// ils se prennent sur la bête. Proportions de dessin (pas des cotes) : empreinte 13 × 10, pas 70, largeur
// de piste 30, en cm, les mêmes dans les quatre vues.
module.exports = (h) => {
  const r1 = (v) => Math.round(v * 10) / 10;
  const pf = (p) => `${r1(p[0])} ${r1(p[1])}`;
  const NOIR = '#1A1A1A';
  const boucle = (P) => {
    const n = P.length, g = (i) => P[(i + n) % n];
    let d = `M${pf(P[0])}`;
    for (let i = 0; i < n; i++) {
      const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      d += ` C${pf([p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6])} ${pf([p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6])} ${pf(p2)}`;
    }
    return d + ' Z';
  };
  // Les proportions communes (cm)
  const L = 13, W = 10, S = 70, TW = 30, BATON = 90;
  const DEC = TW - W;                                  // décalage des centres, d'un côté de la piste à l'autre
  const AV = Math.sqrt(S * S - DEC * DEC);             // le pas, compté le long de la marche

  // Une empreinte de sabot vue de dessus : deux demi-sabots en goutte, la pointe vers la marche (+x).
  // (cx, cy) le centre, k px par cm ; style : 'plein' (nette), 'trace' (à peine visible : tireté)
  const sabot = (cx, cy, k, style = 'plein') => {
    const l = L * k, w = W * k;
    const demi = (s) => [
      [0.5, 0.05], [0.32, 0.25], [0.08, 0.44], [-0.2, 0.48], [-0.4, 0.4], [-0.5, 0.24], [-0.46, 0.09], [-0.15, 0.06], [0.25, 0.045],
    ].map(([u, v]) => [cx + u * l, cy + s * v * w]);
    const at = style === 'plein' ? h.a.plein : h.a.cache;
    return [h.path(boucle(demi(1)), at), h.path(boucle(demi(-1)), at)].join('\n');
  };
  // Le bâton couché le long de x : du gros bout xb à la pointe xt, au centre yc, épais de e.
  // encoches : les x des encoches (entaillées sur le dessus) ; seules ces fenêtres sont écorcées.
  const baton = (xb, xt, yc, e, encoches, { ecorce = true } = {}) => {
    const o = [];
    const yh = yc - e / 2, yb = yc + e / 2, xp = xt - 2.2 * e;   // le cône de la pointe
    const ond = (x) => 0.6 * Math.sin(x / 23) + 0.4 * Math.sin(x / 9);
    const xs = [];
    for (let x = xb; x <= xp; x += 6) xs.push(x);
    xs.push(xp);
    const haut = xs.map((x) => [x, yh + ond(x)]), bas = xs.map((x) => [x, yb + ond(x + 40)]);
    const forme = [...haut, [xt, yc], ...bas.slice().reverse()];
    o.push(h.chemin(forme, h.a.blanc, true));
    // l'écorce : des bandes posées en motif, découpées par le contour du bâton ; les fenêtres écorcées
    // autour des encoches et la pointe restent nues
    if (ecorce) {
      const coupes = [xb, ...encoches.slice().sort((p, q) => p - q).flatMap((xe) => [xe - 13, xe + 13]), xp - 4];
      const bandes = [];
      for (let i = 0; i + 1 < coupes.length; i += 2) if (coupes[i + 1] - coupes[i] > 6) bandes.push([coupes[i], coupes[i + 1]]);
      bandes.forEach(([x0, x1]) => {
        const hh = haut.filter((p) => p[0] > x0 && p[0] < x1), bb = bas.filter((p) => p[0] > x0 && p[0] < x1);
        const zone = [[x0, yh + ond(x0)], ...hh, [x1, yh + ond(x1)], [x1, yb + ond(x1 + 40)], ...bb.slice().reverse(), [x0, yb + ond(x0 + 40)]];
        o.push(h.chemin(zone, h.a.hachure('paille', 'aucun'), true));
        if (x0 > xb + 1) o.push(h.ligne(x0, yh + ond(x0) + 0.5, x0, yb + ond(x0 + 40) - 0.5, h.a.detail));
        o.push(h.ligne(x1, yh + ond(x1) + 0.5, x1, yb + ond(x1 + 40) - 0.5, h.a.detail));
      });
    }
    o.push(h.chemin(forme, h.a.contour, true));
    // les encoches : un coin entaillé dans le dessus, la marque qui fait le tour
    encoches.forEach((xe) => {
      o.push(h.chemin([[xe - 4.2, yh + ond(xe) - 0.6], [xe, yh + e * 0.5], [xe + 4.2, yh + ond(xe) - 0.6]], h.a.plein, true));
      o.push(h.ligne(xe, yh + e * 0.5, xe, yb - 0.6, h.a.detail));
    });
    // le gros bout, coupé
    o.push(h.ellipse(xb, yc, e * 0.18, e / 2, h.a.detail));
    return o.join('\n');
  };
  // Une cote oblique : ligne fine, deux traits perpendiculaires, le mot au milieu, décalé de d.
  const coteOblique = (a, b, mot, d = -11) => {
    const dx = b[0] - a[0], dy = b[1] - a[1], n = Math.hypot(dx, dy), u = [dx / n, dy / n], v = [-u[1], u[0]];
    const t = (p) => h.ligne(p[0] - v[0] * 6, p[1] - v[1] * 6, p[0] + v[0] * 6, p[1] + v[1] * 6, h.a.detail);
    const m = [(a[0] + b[0]) / 2 + v[0] * d, (a[1] + b[1]) / 2 + v[1] * d + 4];
    return [h.ligne(a[0], a[1], b[0], b[1], h.a.detail), t(a), t(b), h.texte(m[0], m[1], mot, { lisere: true })].join('\n');
  };

  // ─── Vue 1 : la piste, les quatre mesures ────────────────────────────────────────────────
  // A et C d'un côté de la piste, B de l'autre : le pas se prend de A à B, la longueur et la largeur sur B.
  const K1 = 3.0, Y1 = 98;
  const P1 = { A: [152, Y1 - DEC * K1 / 2], B: [152 + AV * K1, Y1 + DEC * K1 / 2], C: [152 + 2 * AV * K1, Y1 - DEC * K1 / 2] };
  const marquer = (z) => {
    const o = [];
    const { A, B, C } = P1;
    o.push(sabot(...A, K1), sabot(...B, K1), sabot(...C, K1));
    // la marche
    o.push(h.fleche(`M ${r1(C[0] - 34)} ${r1(C[1] - 36)} L ${r1(C[0] + 26)} ${r1(C[1] - 36)}`));
    const l = L * K1, w = W * K1;
    // la longueur, sous B ; la largeur, à droite de B
    o.push(h.ligne(B[0] - l / 2, B[1] + w / 2 + 3, B[0] - l / 2, B[1] + w / 2 + 22, h.a.fin), h.ligne(B[0] + l / 2, B[1] + w / 2 + 3, B[0] + l / 2, B[1] + w / 2 + 22, h.a.fin));
    o.push(h.cote(B[0] - l / 2, B[1] + w / 2 + 18, B[0] + l / 2, B[1] + w / 2 + 18, 'longueur', { cote: 'dessous' }));
    o.push(h.ligne(B[0] + l / 2 + 3, B[1] - w / 2, B[0] + l / 2 + 26, B[1] - w / 2, h.a.fin), h.ligne(B[0] + l / 2 + 3, B[1] + w / 2, B[0] + l / 2 + 26, B[1] + w / 2, h.a.fin));
    o.push(h.cote(B[0] + l / 2 + 22, B[1] - w / 2, B[0] + l / 2 + 22, B[1] + w / 2, 'largeur', { cote: 'droite' }));
    // le pas, de centre à centre, jusqu'à l'empreinte de l'autre pied
    o.push(coteOblique(A, B, 'pas', -13));
    o.push(h.cercle(A[0], A[1], 2.2, h.a.blanc), h.cercle(B[0], B[1], 2.2, h.a.blanc));
    // la largeur de la piste : d'un bord à l'autre, rappelée à gauche
    const yH = A[1] - w / 2, yB = B[1] + w / 2, xc = 18;
    o.push(h.ligne(A[0] - l / 2 - 4, yH, xc - 4, yH, h.a.fin), h.ligne(B[0] - l / 2 - 4, yB, xc - 4, yB, h.a.fin));
    o.push(h.cote(xc, yH, xc, yB, 'largeur de piste', { cote: 'droite' }));
    return o.join('\n');
  };

  // ─── Vue 2 : le bâton ─────────────────────────────────────────────────────────────────────
  const K2 = 580 / BATON, XT2 = 590, XB2 = XT2 - BATON * K2, YC2 = 62, E2 = 15;
  const enc2 = { e1: XT2 - L * K2, e2: XT2 - (L + W) * K2, e3: XT2 - S * K2, e4: XT2 - (S - TW) * K2 };
  const vueBaton = (z) => {
    const o = [];
    const { e1, e2, e3, e4 } = enc2;
    o.push(baton(XB2, XT2, YC2, E2, [e1, e2, e3, e4]));
    const yH = YC2 - E2 / 2, yB = YC2 + E2 / 2, yc1 = 34, yc2 = 102, yc3 = 136;
    // les rappels : des encoches vers les cotes du dessus, de la pointe et des encoches vers celles du dessous
    [XT2, e1, e2, e4, e3].forEach((x) => o.push(h.ligne(x, x === XT2 ? YC2 - 3 : yH - 2, x, yc1 - 4, h.a.fin)));
    [XT2, e3].forEach((x) => o.push(h.ligne(x, x === XT2 ? YC2 + 3 : yB + 2, x, yc2 + 4, h.a.fin)));
    [XB2, XT2].forEach((x) => o.push(h.ligne(x, (x === XT2 ? yc2 + 8 : yB + 2), x, yc3 + 4, h.a.fin)));
    o.push(h.cote(e1, yc1, XT2, yc1, 'longueur'));
    o.push(h.cote(e2, yc1, e1, yc1, 'largeur'));
    o.push(h.cote(e3, yc1, e4, yc1, 'largeur de piste'));
    o.push(h.cote(e3, yc2, XT2, yc2, 'pas', { cote: 'dessous' }));
    o.push(h.cote(XB2, yc3, XT2, yc3, 'environ 90 cm'));
    return o.join('\n');
  };

  // ─── Vue 3 : la piste perdue ──────────────────────────────────────────────────────────────
  const K3 = 3.5, Y3 = 96;
  const geo3 = (z) => {
    const X0 = 74;                                   // la dernière empreinte sûre, côté haut
    const sure = [X0, Y3 - DEC * K3 / 2], suiv = [X0 + AV * K3, Y3 + DEC * K3 / 2];
    const xt = X0 + S * K3, xb = xt - BATON * K3;
    return { sure, suiv, xt, xb };
  };
  const chercher = (z) => {
    const o = [];
    const { sure, suiv, xt, xb } = geo3(z);
    o.push(sabot(...sure, K3));
    // trois cailloux qui la marquent
    const caillou = (cx, cy, rx, ry) => [h.ellipse(cx + 1.2, cy + 1.2, rx, ry, h.a.ombre), h.ellipse(cx, cy, rx, ry, h.a.arete.replace('fill="none"', 'fill="#FFFFFF"'))].join('\n');
    o.push(caillou(sure[0] - 12, sure[1] - W * K3 / 2 - 16, 6, 4.5), caillou(sure[0] + 2, sure[1] - W * K3 / 2 - 22, 5, 4), caillou(sure[0] + 14, sure[1] - W * K3 / 2 - 14, 5.5, 4.2));
    // la suivante, à peine visible : là où on cherche
    o.push(sabot(...suiv, K3, 'trace'));
    o.push(h.controle(suiv[0], suiv[1], 30));
    // le bâton, couché sur la piste : la troisième encoche sur le centre de la dernière sûre
    const e3 = xt - S * K3, e1 = xt - L * K3, e2 = xt - (L + W) * K3, e4 = xt - (S - TW) * K3;
    o.push(baton(xb, xt, sure[1], 9, [e1, e2, e3, e4], { ecorce: false }));
    o.push(h.controle(e3, sure[1], 9));
    // de la pointe à la suivante : à la même hauteur, sur le côté
    o.push(h.ligne(xt, sure[1] + 8, xt, suiv[1] - 6, h.a.cache));
    // la marche
    o.push(h.fleche(`M ${r1(xt - 60)} 12 L ${r1(xt)} 12`));
    return o.join('\n');
  };

  // ─── Vue 4 : la bête qui bondit ───────────────────────────────────────────────────────────
  // Des groupes de quatre : les deux pieds de devant l'un derrière l'autre, les deux grands pieds de
  // derrière côte à côte, en avant. La troisième encoche sur un groupe, la pointe sur le suivant.
  const bondit = (z) => {
    const o = [];
    const yc = 96, g1 = 36, saut = 140;
    const groupe = (x) => [
      h.ellipse(x, yc + 3, 4.2, 3.4, h.a.plein), h.ellipse(x + 12, yc - 1, 4.2, 3.4, h.a.plein),
      h.ellipse(x + 32, yc - 11, 9, 4.6, h.a.plein), h.ellipse(x + 32, yc + 11, 9, 4.6, h.a.plein),
    ].join('\n');
    o.push(groupe(g1), groupe(g1 + saut));
    const xt = g1 + saut, xb = Math.max(4, xt - saut * BATON / S);
    o.push(baton(xb, xt, yc + 30, 8, [g1], { ecorce: false }));
    o.push(h.ligne(g1, yc + 8, g1, yc + 24, h.a.fin), h.ligne(xt, yc + 8, xt, yc + 24, h.a.fin));
    o.push(h.fleche(`M ${r1(xt - 56)} 12 L ${r1(xt + 4)} 12`));
    return o.join('\n');
  };

  return {
    ref: '43-04',
    titre: 'Le bâton de pistage',
    desc: 'En haut, une piste de cervidé au pas vue de dessus : trois empreintes de sabot, alternées de part et d’autre, et les quatre mesures qu’on prend sur la meilleure : sa longueur, sa largeur, le pas de centre à centre jusqu’à l’empreinte de l’autre pied, la largeur de la piste d’un bord à l’autre. Au milieu, le bâton d’environ 90 cm, pointu au bout, écorcé par endroits, ses quatre encoches comptées depuis la pointe : longueur, puis largeur depuis la première ; le pas depuis la pointe ; la largeur de piste reportée depuis la troisième vers la pointe. En bas à gauche, la piste perdue : la troisième encoche posée sur le centre de la dernière empreinte sûre, marquée d’une branche plantée, le bâton dans le sens de la marche ; la pointe tombe à la hauteur de l’empreinte suivante, à peine visible, décalée sur le côté : on cherche là. En bas à droite, une bête qui bondit : la troisième encoche sur un groupe de quatre empreintes, la pointe sur le groupe suivant.',
    format: 'pleine',
    disposition: [['marquer'], ['baton'], ['chercher', 'bondit']],
    hauteurs: [3.2, 2.2, 2.6],
    largeurs: [[1], [1], [3, 2]],
    vues: {
      marquer: {
        titre: 'Sur la meilleure empreinte, les quatre mesures',
        dessin: marquer,
        renvois: (z) => [
          { n: 1, rond: [P1.B[0] + 88, z.h - 22], cible: [P1.B[0] + L * K1 / 2 - 2, P1.B[1] + 5], texte: 'la meilleure empreinte, sur le plat' },
        ],
      },
      baton: {
        titre: 'Le bâton, marqué au couteau à partir de la pointe',
        dessin: vueBaton,
        renvois: (z) => [
          { n: 2, rond: [z.l - 12, YC2 + 25], cible: [XT2 - 8, YC2 + 2], texte: 'la pointe : tout se compte de là' },
          { n: 3, rond: [enc2.e4 + 44, YC2 + 25], cible: [enc2.e4 + 1, YC2 + 2], texte: 'encoches au couteau' },
          { n: 4, rond: [70, YC2 + 25], cible: [96, YC2 + 4], texte: 'écorcé par endroits' },
        ],
      },
      chercher: {
        titre: 'La piste perdue',
        dessin: chercher,
        renvois: (z) => {
          const { sure, suiv, xt } = geo3(z);
          return [
            { n: 5, rond: [150, 48], cible: [sure[0] + 10, sure[1] - W * K3 / 2 + 3], texte: 'troisième encoche sur la dernière sûre' },
            { n: 6, rond: [suiv[0] - 66, suiv[1] + 38], cible: [suiv[0] - 24, suiv[1] + 18], texte: 'à hauteur de la pointe : chercher là' },
          ];
        },
      },
      bondit: {
        titre: 'Une bête qui bondit',
        dessin: bondit,
        renvois: (z) => [
          { n: 7, rond: [112, 168], cible: [112, 130], texte: 'd’un groupe au groupe suivant' },
        ],
      },
    },
  };
};
