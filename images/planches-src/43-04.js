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

  // Une empreinte de sabot d'orignal vue de dessus, décalquée sur une photo (Ivan Kristensen, « 1. Footprint
  // from alces alces - 26.04.2008 », Wikimedia Commons, CC BY-SA 3.0 ; crédit dans images/credits.md) : les
  // deux moitiés relevées au contour de l'ombre, la pointe un peu affinée. Points en px de la photo
  // agrandie (pointes vers le haut) ; le dessin les tourne pour que les pointes aillent vers la marche (+x).
  // 'v' : la pointe, un angle vif. Les proportions de la photo sont gardées dans chaque moitié ; l'ensemble
  // est remis à 13 × 10 (le rapport de longueur à largeur que le chapitre donne pour l'orignal, environ 1,2 à 1,3).
  const MOITIE_G = [[200, 148, 'v'], [168, 180], [150, 230], [143, 300], [148, 370], [160, 440], [178, 510], [204, 570], [240, 606], [284, 612], [322, 596], [344, 560], [348, 500], [338, 430], [318, 350], [296, 275], [274, 210], [240, 165]];
  const MOITIE_D = [[376, 150, 'v'], [356, 190], [345, 250], [348, 320], [360, 390], [382, 450], [414, 494], [456, 518], [500, 520], [538, 498], [562, 450], [568, 390], [556, 320], [530, 255], [492, 205], [440, 168]];
  const SAB_C = [355, 380], SAB_L = 464, SAB_W = 425;
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
    const el = (L * k) / SAB_L, ew = (W * k) / SAB_W;
    const T = ([x, y]) => [cx - (y - SAB_C[1]) * el, cy + (x - SAB_C[0]) * ew];
    const at = style === 'net' ? h.a.arete.replace('fill="none"', 'fill="#E6E6E6"') : h.a.cache;
    return [MOITIE_G, MOITIE_D].map((M) => h.path(courbeV(M.map(T), M.map((p) => p[2] === 'v')), at)).join('\n');
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
  // Pleine largeur, à une échelle où l'empreinte se lit sous le bâton : la troisième encoche sur son centre.
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
      return [h.path(boucle(P.map(([x, y]) => [x + 1.6, y + 1.6])), h.a.ombre), h.path(boucle(P), h.a.arete.replace('fill="none"', 'fill="#FFFFFF"'))].join('\n');
    };
    o.push(caillou(sure[0] - 52, sure[1] - 30, 9, 6.5, 0.4), caillou(sure[0] - 34, sure[1] - 42, 7.5, 6, 1.9), caillou(sure[0] - 66, sure[1] - 12, 8, 6, 3.1));
    // la suivante, à peine visible : là où on cherche
    o.push(sabot(...suiv, K3, 'trace'));
    o.push(h.controle(suiv[0], suiv[1], 52));
    // le bâton couché sur la piste, la troisième encoche sur le centre de la dernière sûre
    const e3 = xt - S * K3, e1 = xt - L * K3, e2 = xt - (L + W) * K3, e4 = xt - (S - TW) * K3;
    o.push(baton(xb, xt, sure[1], 12, [e1, e2, e3, e4], { ecorce: false }));
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
    desc: 'En haut, une piste de cervidé au pas vue de dessus : trois empreintes de sabot, alternées de part et d’autre, et les quatre mesures qu’on prend sur la meilleure : sa longueur, sa largeur, le pas de centre à centre jusqu’à l’empreinte de l’autre pied, la largeur de la piste d’un bord à l’autre. Au milieu, le bâton d’environ 90 cm, pointu au bout, écorcé par endroits, ses quatre encoches comptées depuis la pointe : longueur, puis largeur depuis la première ; le pas depuis la pointe ; la largeur de piste reportée depuis la troisième vers la pointe. En bas, la piste perdue : la dernière empreinte sûre, marquée de trois cailloux, et le bâton couché dessus dans le sens de la marche, la troisième encoche sur son centre ; la pointe tombe à la hauteur de l’empreinte suivante, à peine visible, décalée sur le côté : on cherche là.',
    format: 'pleine',
    disposition: [['marquer'], ['baton'], ['chercher']],
    hauteurs: [3, 2.1, 3.3],
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
            { n: 5, rond: [sure[0] - 92, sure[1] - 44], cible: [sure[0] - 62, sure[1] - 34], texte: 'trois cailloux : la dernière sûre' },
            { n: 6, rond: [sure[0] - 20, sure[1] + 72], cible: [sure[0] - 6, sure[1] + 10], texte: 'troisième encoche sur son centre' },
            { n: 7, rond: [suiv[0] - 112, suiv[1] + 34], cible: [suiv[0] - 52, suiv[1] + 6], texte: 'à hauteur de la pointe : chercher là' },
          ];
        },
      },
    },
  };
};
