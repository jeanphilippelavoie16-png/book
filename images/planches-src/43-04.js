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
// intervalle nommé comme sur la piste. Vue 3 : la piste perdue, à une échelle où l'empreinte se lit sous
// le bâton. La bête qui bondit (une phrase au chapitre) n'est pas dessinée : la vue n'apprenait rien de plus.
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

  // Une empreinte de sabot d'orignal vue de dessus. Le contour de chaque moitié, du talon au plus large, est
  // relevé sur une photo (Ivan Kristensen, « 1. Footprint from alces alces - 26.04.2008 », Wikimedia Commons,
  // CC BY-SA 3.0 ; crédit dans images/credits.md) : talon rond, plus large au tiers arrière. La pointe est ramenée
  // vers l'axe, comme sur une empreinte nette au pas (sur la photo, sol mou, les deux moitiés s'écartent) ; les
  // deux moitiés sont symétriques, l'espace entre elles laissé ouvert. u : du talon (0) à la pointe (1), vers
  // la marche ; v : de l'axe vers le dehors, en largeur d'empreinte ; 'v' : un angle vif.
  const MOITIE = [[1.0, 0.07, 'v'], [0.9, 0.17], [0.78, 0.28], [0.64, 0.38], [0.5, 0.45], [0.36, 0.48], [0.22, 0.47], [0.1, 0.41], [0.02, 0.31], [0, 0.2], [0.03, 0.11], [0.1, 0.065], [0.35, 0.055], [0.65, 0.055], [0.88, 0.06]];
  const courbeV = (P, vif) => {
    const n = P.length, g = (i) => P[(i + n) % n], v = (i) => vif[(i + n) % n];
    let d = `M${pf(P[0])}`;
    for (let i = 0; i < n; i++) {
      const p1 = g(i), p2 = g(i + 1), p0 = v(i) ? p1 : g(i - 1), p3 = v(i + 1) ? p2 : g(i + 2);
      d += ` C${pf([p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6])} ${pf([p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6])} ${pf(p2)}`;
    }
    return d + ' Z';
  };
  // (cx, cy) le centre, k px par cm ; style : 'net' (contour, léger grisé) ou 'trace' (à peine visible : tireté)
  const sabot = (cx, cy, k, style = 'net') => {
    const l = L * k, w = W * k;
    const at = style === 'net' ? h.a.arete.replace('fill="none"', 'fill="#E6E6E6"') : h.a.cache;
    return [-1, 1].map((sg) => h.path(courbeV(MOITIE.map(([u, v]) => [cx + (u - 0.5) * l, cy + sg * v * w]), MOITIE.map((p) => p[2] === 'v')), at)).join('\n');
  };
  // L'écorce d'une branche (une matière se reconnaît à sa vraie fibre, JP, 19 octobre 2026) : des traits fins,
  // courts et interrompus, dans le sens du bâton, comme les gerçures de l'écorce ; posés en motif, découpés par
  // le contour. Le bois nu des fenêtres écorcées reste blanc. Un motif par vue (id distinct).
  // Des traits de longueurs inégales, en trois rangs décalés : un motif régulier se lirait comme un tireté.
  const ecorceMotif = (id) => `<defs><pattern id="${id}" width="72" height="7.2" patternUnits="userSpaceOnUse">`
    + [[2, 11, 1.1], [15, 31, 1.2], [35, 42, 1.0], [47, 63, 1.2], [67, 72, 1.1], [0, 3, 1.1],
      [6, 20, 3.6], [24, 30, 3.5], [34, 52, 3.7], [57, 68, 3.6],
      [0, 5, 6.0], [9, 17, 6.1], [21, 38, 5.9], [42, 49, 6.0], [53, 69, 6.1]]
      .map(([a, b, y]) => `<line x1="${a}" y1="${y}" x2="${b}" y2="${y}" stroke="${NOIR}" stroke-width="0.5" stroke-linecap="round"/>`).join('')
    + '</pattern></defs>';
  // Le bâton couché le long de x : du gros bout xb à la pointe xt, au centre yc, épais de e.
  // encoches : les x des encoches (entaillées sur le dessus) ; seules ces fenêtres sont écorcées, sur fen de
  // part et d'autre de l'encoche (2 cm, à l'échelle de la vue).
  const baton = (xb, xt, yc, e, encoches, { motif, fen }) => {
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
    {
      const coupes = [xb, ...encoches.slice().sort((p, q) => p - q).flatMap((xe) => [xe - fen, xe + fen]), xp - 4];
      const bandes = [];
      for (let i = 0; i + 1 < coupes.length; i += 2) if (coupes[i + 1] - coupes[i] > 6) bandes.push([coupes[i], coupes[i + 1]]);
      bandes.forEach(([x0, x1]) => {
        const hh = haut.filter((p) => p[0] > x0 && p[0] < x1), bb = bas.filter((p) => p[0] > x0 && p[0] < x1);
        const zone = [[x0, yh + ond(x0)], ...hh, [x1, yh + ond(x1)], [x1, yb + ond(x1 + 40)], ...bb.slice().reverse(), [x0, yb + ond(x0 + 40)]];
        o.push(h.chemin(zone, `fill="url(#${motif})" stroke="none"`, true));
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
  // Une cote oblique, de centre à centre : la ligne fine entre deux points marqués, le mot au milieu, décalé de d.
  const coteOblique = (a, b, mot, d = -11) => {
    const dx = b[0] - a[0], dy = b[1] - a[1], n = Math.hypot(dx, dy), u = [dx / n, dy / n], v = [-u[1], u[0]];
    const m = [(a[0] + b[0]) / 2 + v[0] * d, (a[1] + b[1]) / 2 + v[1] * d + 4];
    return [h.ligne(a[0], a[1], b[0], b[1], h.a.detail), h.texte(m[0], m[1], mot, { lisere: true })].join('\n');
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
    o.push(ecorceMotif('ecorce-43-04-baton'), baton(XB2, XT2, YC2, E2, [e1, e2, e3, e4], { motif: 'ecorce-43-04-baton', fen: 2 * K2 }));
    const yH = YC2 - E2 / 2, yB = YC2 + E2 / 2, yc1 = 34, yc2 = 102, yc3 = 130;
    // les rappels : des encoches vers les cotes du dessus, de la pointe et des encoches vers celles du dessous
    [XT2, e1, e2, e4, e3].forEach((x) => o.push(h.ligne(x, x === XT2 ? YC2 - 3 : yH - 2, x, yc1 - 4, h.a.fin)));
    [XT2, e3].forEach((x) => o.push(h.ligne(x, x === XT2 ? YC2 + 3 : yB + 2, x, yc2 + 4, h.a.fin)));
    [XB2, XT2].forEach((x) => o.push(h.ligne(x, (x === XT2 ? yc2 + 8 : yB + 2), x, yc3 + 4, h.a.fin)));
    o.push(h.cote(e1, yc1, XT2, yc1, 'longueur'));
    o.push(h.cote(e2, yc1, e1, yc1, 'largeur'));
    o.push(h.cote(e3, yc1, e4, yc1, 'largeur de piste'));
    o.push(h.cote(e3, yc2, XT2, yc2, 'pas', { cote: 'dessous' }));
    // les deux mots sous leur ligne : « pas » sous la sienne, « environ 90 cm » sous la sienne
    o.push(h.cote(XB2, yc3, XT2, yc3, 'environ 90 cm', { cote: 'dessous' }));
    return o.join('\n');
  };

  // ─── Vue 3 : la piste perdue ──────────────────────────────────────────────────────────────
  // Pleine largeur, à une échelle où l'empreinte se lit sous le bâton : l'encoche du pas sur son centre.
  const K3 = 6.0;
  const geo3 = (z) => {
    const xt = z.l - 34, X0 = xt - S * K3, Y0 = 62;
    const sure = [X0, Y0], suiv = [X0 + AV * K3, Y0 + DEC * K3];
    return { sure, suiv, xt, xb: xt - BATON * K3 };
  };
  const chercher = (z) => {
    const o = [];
    const { sure, suiv, xt, xb } = geo3(z);
    o.push(sabot(...sure, K3));
    // trois cailloux à côté : la dernière empreinte sûre, marquée
    const caillou = (cx, cy, rx, ry, a) => {
      const P = [];
      for (let i = 0; i < 9; i++) { const t = i / 9 * 2 * Math.PI, rr = 1 + 0.12 * Math.sin(3 * t + a); P.push([cx + rx * rr * Math.cos(t), cy + ry * rr * Math.sin(t)]); }
      // un caillou blanc au trait d'arête, sans ombre portée (la charte)
      return h.path(boucle(P), h.a.arete.replace('fill="none"', 'fill="#FFFFFF"'));
    };
    o.push(caillou(sure[0] - 52, sure[1] - 30, 9, 6.5, 0.4), caillou(sure[0] - 34, sure[1] - 42, 7.5, 6, 1.9), caillou(sure[0] - 66, sure[1] - 16, 8, 6, 3.1));
    // la suivante, à peine visible : là où on cherche
    o.push(sabot(...suiv, K3, 'trace'));
    o.push(h.controle(suiv[0], suiv[1], 52));
    // le bâton couché sur la piste, l'encoche du pas sur le centre de la dernière sûre
    const e3 = xt - S * K3, e1 = xt - L * K3, e2 = xt - (L + W) * K3, e4 = xt - (S - TW) * K3;
    // le même bâton que plus haut, avec son écorce et ses fenêtres
    o.push(ecorceMotif('ecorce-43-04-piste'), baton(xb, xt, sure[1], 12, [e1, e2, e3, e4], { motif: 'ecorce-43-04-piste', fen: 2 * K3 }));
    o.push(h.controle(e3, sure[1], 11));
    // de la pointe à la suivante : à la même hauteur, sur le côté
    o.push(h.ligne(xt, sure[1] + 9, xt, suiv[1] - 50, h.a.cache));
    // la marche
    o.push(h.fleche(`M ${r1(xt - 150)} 12 L ${r1(xt - 90)} 12`));
    return o.join('\n');
  };

  return {
    ref: '43-04',
    titre: 'Le bâton de pistage',
    desc: 'En haut, une piste de cervidé au pas vue de dessus : trois empreintes de sabot, alternées de part et d’autre, et les quatre mesures qu’on prend sur la meilleure : sa longueur, sa largeur, le pas de centre à centre jusqu’à l’empreinte de l’autre pied, la largeur de la piste d’un bord à l’autre. Au milieu, le bâton d’environ 90 cm, pointu au bout, écorcé par endroits, ses quatre encoches comptées depuis la pointe : longueur, puis largeur depuis la première ; le pas depuis la pointe ; la largeur de piste reportée depuis l’encoche du pas vers la pointe. En bas, la piste perdue : la dernière empreinte sûre, marquée de trois cailloux, et le bâton couché dessus dans le sens de la marche, l’encoche du pas sur son centre ; la pointe tombe à la hauteur de l’empreinte suivante, à peine visible, décalée sur le côté : on cherche là.',
    format: 'pleine',
    disposition: [['marquer'], ['baton'], ['chercher']],
    hauteurs: [2.78, 2.27, 3.35],
    largeurs: [[1], [1], [1]],
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
          // la pastille à gauche du rappel vertical de la pointe, entre le dessous du bâton et la cote du pas
          { n: 2, rond: [XT2 - 24, YC2 + 24], cible: [XT2 - 8, YC2 + 2], texte: 'tout mesurer à partir de la pointe' },
          { n: 3, rond: [enc2.e4 + 44, YC2 + 25], cible: [enc2.e4 + 1, YC2 + 2], texte: 'encoches au couteau' },
          // le point dans la fenêtre écorcée de l'encoche du pas, à droite du trait de l'encoche
          { n: 4, rond: [70, YC2 + 25], cible: [enc2.e3 + 7, YC2 + 4], texte: 'écorcé par endroits' },
        ],
      },
      chercher: {
        titre: 'La piste perdue',
        dessin: chercher,
        renvois: (z) => {
          const { sure, suiv, xt } = geo3(z);
          return [
            { n: 5, rond: [sure[0] - 92, sure[1] - 44], cible: [sure[0] - 62, sure[1] - 34], texte: 'trois cailloux : la dernière empreinte sûre' },
            // l'encoche du pas est la plus loin de la pointe (la quatrième qu'on compte sur le bâton, la troisième taillée)
            { n: 6, rond: [sure[0] - 20, sure[1] + 72], cible: [sure[0] - 6, sure[1] + 10], texte: 'poser l’encoche du pas sur son centre' },
            { n: 7, rond: [suiv[0] - 112, suiv[1] + 34], cible: [suiv[0] - 52, suiv[1] + 6], texte: 'à hauteur de la pointe : chercher là' },
          ];
        },
      },
    },
  };
};
