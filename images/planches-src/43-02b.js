// Planche 43-02b — Le castor grandeur nature : pied avant et pied arrière
// (chapitre 43, §5-F, et « Les gabarits à l'échelle » : planches dessinées grandeur nature, règle
// imprimée dans la marge ; on pose le livre ouvert à côté de l'empreinte et on compare les formes.)
//
// ÉCHELLE 1:1, la même que 43-02a : 680 unités = 167,2 mm, largeur de l'empagement. La règle de 10 cm
// du haut le vérifie à l'impression.
//
// Tailles : le milieu de la fourchette du chapitre.
//   castor, avant   : 6 à 10 cm → 80 mm de long ; largeur non donnée, dessinée ~60 mm
//   castor, arrière : 12 à 18 cm sur 8 à 13 → 150 × 105 mm (du talon au bout des griffes)
// Formes, seulement ce que dit le chapitre : l'avant « comme une petite main, sans palmure » ; l'arrière,
// cinq doigts entièrement palmés, le plus grand pied de rongeur. Doigts, plante et griffes en noir ; la
// palmure, qui marque plus légèrement, en blanc dans son contour. Pieds droits, le doigt intérieur à gauche.
// Le porc-épic prévu au même gabarit n'est pas dessiné : le chapitre donne ses tailles, pas la forme de
// son empreinte.
module.exports = (h) => {
  const A = h.a;
  const K = 680 / 167.2;                       // unités de vue par mm, à l'échelle de l'empagement
  const f = (v) => (Math.round(v * 10) / 10).toFixed(1);
  const pf = (p) => `${f(p[0])} ${f(p[1])}`;
  const NOIR = '#1A1A1A';
  const poil = `fill="none" stroke="${NOIR}" stroke-width="0.7" stroke-linecap="round" stroke-dasharray="0.1 2.8"`;
  const guide = `fill="none" stroke="${NOIR}" stroke-width="0.7" stroke-linecap="round" stroke-dasharray="4 3"`;

  // Catmull-Rom fermé : une forme lisse qui passe par chaque point
  const boucle = (P) => {
    const n = P.length, g = (i) => P[(i + n) % n];
    let d = `M${pf(P[0])}`;
    for (let i = 0; i < n; i++) {
      const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      d += ` C${pf([p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6])} ${pf([p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6])} ${pf(p2)}`;
    }
    return d + ' Z';
  };

  // Repère d'une empreinte : origine au talon, x vers la droite, y négatif vers l'avant, en mm.
  const rep = (cx, cy) => {
    const T = ([x, y]) => [cx + x * K, cy + y * K];
    const dir = (a) => [Math.sin(a * Math.PI / 180), -Math.cos(a * Math.PI / 180)];
    return {
      T,
      forme: (pts, at = A.plein) => h.path(boucle(pts.map(T)), at),
      // doigt : une ellipse tournée de rot degrés (vers la droite si positif), tracée en chemin
      doigt: ([x, y], rx, ry, rot, at = A.plein) => {
        const a = rot * Math.PI / 180, P = [];
        for (let i = 0; i < 16; i++) {
          const t = i * Math.PI / 8, u = rx * Math.cos(t), v = ry * Math.sin(t);
          P.push(T([x + u * Math.cos(a) - v * Math.sin(a), y + u * Math.sin(a) + v * Math.cos(a)]));
        }
        return h.path(boucle(P), at);
      },
      // griffe au bout d'un doigt : base à `ecart` mm de la pointe du doigt, longue de `l` mm
      griffe: ([x, y], ry, rot, ecart, l, larg = 2.4) => {
        const d = dir(rot), n = [-d[1], d[0]];
        const b = [x + d[0] * (ry + ecart), y + d[1] * (ry + ecart)];
        const p = [b[0] + d[0] * l, b[1] + d[1] * l];
        const g1 = [b[0] + n[0] * larg / 2, b[1] + n[1] * larg / 2], g2 = [b[0] - n[0] * larg / 2, b[1] - n[1] * larg / 2];
        const [P, G1, G2] = [p, g1, g2].map(T);
        return `<path d="M${pf(G1)} Q${pf(T([b[0] + d[0] * l * 0.5 + n[0] * larg * 0.45, b[1] + d[1] * l * 0.5 + n[1] * larg * 0.45]))} ${pf(P)} Q${pf(T([b[0] + d[0] * l * 0.5 - n[0] * larg * 0.45, b[1] + d[1] * l * 0.5 - n[1] * larg * 0.45]))} ${pf(G2)} Z" ${A.plein}/>`;
      },
      trait: (pts, at = guide) => h.chemin(pts.map(T), at),
    };
  };

  // Règle de 10 cm couchée, graduée au millimètre : le zéro à gauche, en (x, y) ; chiffres dessous.
  const regle = (x, y) => {
    const out = [h.ligne(x, y, x + 100 * K, y, A.detail)];
    for (let mm = 0; mm <= 100; mm++) {
      const X = x + mm * K;
      const t = mm % 10 === 0 ? 9 : mm % 5 === 0 ? 6 : 3.5;
      out.push(h.ligne(X, y, X, y - t, mm % 10 === 0 ? A.detail : A.fin));
      if (mm % 10 === 0) out.push(h.texte(X, y + 15, String(mm / 10)));
    }
    out.push(h.texte(x + 100 * K + 9, y + 15, 'cm', { ancre: 'start' }));
    return out.join('\n');
  };

  // un doigt tracé de sa base à sa pointe (mm), large de 2 × rx ; rend aussi le centre, la demi-longueur et l'angle
  const axe = (b, p) => {
    const dx = p[0] - b[0], dy = p[1] - b[1];
    return { c: [(b[0] + p[0]) / 2, (b[1] + p[1]) / 2], ry: Math.hypot(dx, dy) / 2, rot: Math.atan2(dx, -dy) * 180 / Math.PI };
  };

  // ── Placement dans la vue (unités de vue) : talon de chaque empreinte ──
  const AVANT = [128, 705], ARRIERE = [380, 700];

  // Castor, pied avant droit : 80 mm ; une petite main, cinq doigts séparés, griffes, sans palmure.
  const avant = () => {
    const r = rep(...AVANT);
    const paume = [[-15, -22], [-7, -27], [3, -28], [12, -25], [17, -17], [16, -8], [9, -1.5], [0, 0], [-8, -2], [-14, -8], [-17, -15]];
    const doigts = [[[-18, -33], -45, 9], [[-11, -47], -16, 14], [[0, -52.5], -2, 16.5], [[12, -49], 14, 15], [[19.5, -35], 42, 10]];
    const griffes = [5.5, 7, 8.5, 7.5, 6];
    return [
      r.forme(paume),
      ...doigts.map(([c, a, ry]) => r.doigt(c, 3.6, ry, a)),
      ...doigts.map(([c, a, ry], i) => r.griffe(c, ry, a, 1, griffes[i], 2.6)),
    ].join('\n');
  };

  // Castor, pied arrière droit : 150 × 105 mm ; plante longue, cinq doigts réunis par la palmure.
  const TOES = [[[-23, -71], [-47, -115]], [[-12, -78], [-27, -135]], [[0, -80], [-1, -141]], [[12, -78], [25, -137]], [[23, -69], [49, -110]]];
  const RX = 4.6;
  const arriere = () => {
    const r = rep(...ARRIERE);
    const plante = [[0, 0], [8, -1.5], [12.5, -9], [14, -24], [15.5, -40], [18, -54], [20, -64], [15, -70.5], [7, -73.5], [0, -74],
      [-7, -73.5], [-15, -70.5], [-20, -64], [-18, -54], [-15.5, -40], [-14, -24], [-12.5, -9], [-8, -1.5]];
    const ax = TOES.map(([b, p]) => ({ b, p, ...axe(b, p) }));
    const u = (t) => { const d = [t.p[0] - t.b[0], t.p[1] - t.b[1]], L = Math.hypot(...d); return [d[0] / L, d[1] / L]; };
    const le = (t, k, cote) => {            // point du bord d'un doigt : k de 0 (base) à 1 (pointe), cote = ±1
      const d = u(t), n = [-d[1] * cote, d[0] * cote];
      return [t.b[0] + (t.p[0] - t.b[0]) * k + n[0] * RX, t.b[1] + (t.p[1] - t.b[1]) * k + n[1] * RX];
    };
    const bout = (t) => { const d = u(t); return [t.p[0] + d[0] * RX * 0.6, t.p[1] + d[1] * RX * 0.6]; };
    const creux = (t1, t2) => {             // fond de la palmure entre deux doigts : 7 mm en retrait de leurs pointes
      const m = [(t1.p[0] + t2.p[0]) / 2, (t1.p[1] + t2.p[1]) / 2];
      const d = [(u(t1)[0] + u(t2)[0]) / 2, (u(t1)[1] + u(t2)[1]) / 2], L = Math.hypot(...d);
      return [m[0] - d[0] / L * 7, m[1] - d[1] / L * 7];
    };
    const [t1, t2, t3, t4, t5] = ax;
    // la palmure part de l'avant de la plante (le bord qui passe sous la plante est caché par le noir)
    const palmure = [
      [0, -56], [16, -63],
      le(t5, 0.15, 1), le(t5, 0.5, 1), le(t5, 0.85, 1), bout(t5),
      creux(t5, t4), bout(t4), creux(t4, t3), bout(t3), creux(t3, t2), bout(t2), creux(t2, t1),
      bout(t1), le(t1, 0.85, -1), le(t1, 0.5, -1), le(t1, 0.15, -1),
      [-16, -63],
    ];
    return [
      r.forme(palmure, h.a.arete.replace('fill="none"', 'fill="#FFFFFF"')),
      r.forme(plante),
      ...ax.map((t) => r.doigt(t.c, RX, t.ry, t.rot)),
      ...ax.map((t) => r.griffe(t.c, t.ry, t.rot, 1, 7, 3)),
    ].join('\n');
  };

  return {
    ref: '43-02b',
    titre: 'Le castor grandeur nature : pied avant et pied arrière',
    desc: 'Les deux empreintes du castor dessinées grandeur nature, en noir, à poser à côté d’une empreinte '
      + 'pour comparer les formes. En bas à gauche, le pied avant : une paume ronde et cinq doigts minces et '
      + 'séparés, écartés comme une petite main, chacun avec sa griffe, sans palmure. À droite, le pied '
      + 'arrière, presque deux fois plus long : une plante étroite et longue, et cinq longs doigts griffus en éventail, '
      + 'réunis jusque près de leurs pointes par une palmure dont le bord, creusé entre chaque doigt, est '
      + 'tracé en trait plein. Une règle de 10 cm graduée au millimètre court en haut à gauche pour vérifier '
      + 'l’échelle à l’impression.',
    format: 'pleine',
    disposition: [['castor']],
    vues: {
      castor: {
        dessin: () => [avant(), arriere(), regle(12, 40)].join('\n'),
        renvois: () => {
          const V = rep(...AVANT), R = rep(...ARRIERE);
          return [
            { n: 1, rond: [22, 345], cible: V.T([-15.5, -64]), texte: 'castor, avant : une petite main, sans palmure' },
            { n: 2, rond: [560, 130], cible: R.T([35.5, -118]), texte: 'castor, arrière : doigts entièrement palmés' },
          ];
        },
      },
    },
  };
};
