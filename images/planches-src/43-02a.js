// Planche 43-02a — Les empreintes moyennes grandeur nature : lynx, renard, coyote, loutre
// (chapitre 43, §5-D et §5-E, et « Les gabarits à l'échelle » : planches dessinées grandeur nature,
// règle imprimée dans la marge ; on pose le livre ouvert à côté de l'empreinte et on compare les formes.)
//
// ÉCHELLE 1:1. La planche est dessinée pour occuper toute la largeur de l'empagement, 167,2 mm
// (plan/normes-graphiques.md) : 680 unités = 167,2 mm, donc K = 4,067 unités par mm. La règle de 10 cm
// du bas le vérifie à l'impression : si elle ne mesure pas 10 cm, la planche n'est pas à la bonne taille.
//
// Tailles : le milieu de la fourchette du chapitre, jamais un chiffre à côté.
//   lynx, avant   : moyenne du chapitre, 87 mm de long sur 90 de large (contour du poil compris)
//   renard, avant : 5 à 7 cm sur 3,5 à 5,5 → 60 × 45 mm (contour du poil compris)
//   coyote, avant : 5,5 à 8 cm sur 4 à 6 → 67,5 × 50 mm (du talon du coussinet au bout des griffes)
//   loutre, avant : 5,5 à 8 cm → 67,5 mm de long ; le chapitre ne donne pas la largeur, dessinée ~60 mm
// Formes, seulement ce que dit le chapitre : lynx rond, sans griffes, doigts et coussinet flous, un doigt
// central en avance ; renard au pied poilu, doigts flous, coussinet avant en barre, X franc ; coyote
// net, griffu, un H entre doigts et coussinet ; loutre (mustélidé) cinq doigts un-trois-un, griffes.
// Le nombre de doigts du lynx (quatre, comme tout félin) n'est pas écrit au chapitre ; les autres
// canidés en ont quatre (« le renard, quatre doigts »).
// Coussinets en noir, comme dans la neige ; le poil (lynx, renard) en pointillé autour ; le X et le H
// en tireté fin, là où l'œil doit les chercher. Tous des pieds droits, le doigt intérieur à gauche.
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

  // Règle de 10 cm debout, graduée au millimètre : le zéro en bas, en (x, y) ; chiffres à gauche.
  const regle = (x, y) => {
    const out = [h.ligne(x, y, x, y - 100 * K, A.detail)];
    for (let mm = 0; mm <= 100; mm++) {
      const Y = y - mm * K;
      const t = mm % 10 === 0 ? 9 : mm % 5 === 0 ? 6 : 3.5;
      out.push(h.ligne(x, Y, x - t, Y, mm % 10 === 0 ? A.detail : A.fin));
      if (mm % 10 === 0) out.push(h.texte(x - 13, Y + 4, mm === 100 ? '10 cm' : String(mm / 10), { ancre: 'end' }));
    }
    return out.join('\n');
  };

  // ── Placement dans la vue (unités de vue) : talon de chaque empreinte ──
  const LYNX = [183, 355], RENARD = [478, 250], COYOTE = [140, 655], LOUTRE = [398, 655];

  // Lynx, pied avant droit : 87 × 90 mm, rond, sans griffes, un doigt central en avance.
  const lynx = () => {
    const r = rep(...LYNX);
    const contour = [[0, 0], [16, -1.5], [31, -9], [41, -23], [45, -42], [42, -60], [32, -76], [16, -85.5], [-2, -87],
      [-19, -84], [-33, -74], [-42, -58], [-44.5, -40], [-40, -22], [-30, -8], [-16, -1.5]];
    const coussinet = [[-14, -42], [0, -39.5], [14, -42], [21, -34], [24, -22], [22, -12], [14, -7], [7, -9.5], [0, -7.5],
      [-7, -9.5], [-14, -7], [-22, -12], [-24, -22], [-21, -34]];
    return [
      r.forme(contour, poil),
      r.forme(coussinet),
      r.doigt([-28.5, -52], 7.5, 9.5, -22),
      r.doigt([-9.5, -69], 7.5, 9.8, -5),
      r.doigt([10.5, -64], 7.5, 9.5, 6),
      r.doigt([29, -50], 7.5, 9.5, 24),
    ].join('\n');
  };

  // Renard, pied avant droit : 60 × 45 mm ; poil épais, petits doigts, coussinet en barre, X franc.
  const renard = () => {
    const r = rep(...RENARD);
    const contour = [[0, 0], [11, -2], [18.5, -10], [22.5, -23], [22, -37], [17, -49.5], [8.5, -57.5], [0, -60], [-8.5, -57.5],
      [-17, -49.5], [-22, -37], [-22.5, -23], [-18.5, -10], [-11, -2]];
    const barre = [[-10, -10], [-5, -14], [0, -16], [5, -14], [10, -10], [9.5, -7], [5, -10], [0, -11.8], [-5, -10], [-9.5, -7]];
    const doigts = [[[-13.5, -29], -12], [[-5, -41.5], -3], [[5, -41.5], 3], [[13.5, -29], 12]];
    return [
      r.forme(contour, poil),
      r.forme(barre),
      ...doigts.map(([c, a]) => r.doigt(c, 4, 5.5, a)),
      ...doigts.map(([c, a]) => r.griffe(c, 5.5, a * 1.4, 1.2, 3.6, 2)),
      r.trait([[-12.5, -41.5], [12.5, -15.5]]),
      r.trait([[12.5, -41.5], [-12.5, -15.5]]),
    ].join('\n');
  };

  // Coyote, pied avant droit : 67,5 × 50 mm ; net, griffu, coussinet large au dessus plat, un H.
  const coyote = () => {
    const r = rep(...COYOTE);
    const coussinet = [[-9.5, -23], [0, -24], [9.5, -23], [12.5, -18], [13.5, -9], [11, -2], [5, -0.5], [0, -2.5], [-5, -0.5],
      [-11, -2], [-13.5, -9], [-12.5, -18]];
    const doigts = [[[-19.5, -34], -8, 7.5], [[-6, -49.5], -3, 8], [[6, -49.5], 3, 8], [[19.5, -34], 8, 7.5]];
    return [
      r.forme(coussinet),
      ...doigts.map(([c, a, ry]) => r.doigt(c, 5.5, ry, a)),
      ...doigts.map(([c, a, ry]) => r.griffe(c, ry, a * 1.3, 1.5, 6.5, 2.8)),
      r.trait([[-12.9, -57], [-12.9, -24.5]]),
      r.trait([[12.9, -57], [12.9, -24.5]]),
      r.trait([[-12.9, -32.5], [12.9, -32.5]]),
    ].join('\n');
  };

  // Loutre, pied avant droit : 67,5 mm ; cinq doigts un-trois-un, griffes, coussinet en arc.
  const loutre = () => {
    const r = rep(...LOUTRE);
    const coussinet = [[-17, -7], [-14, -14], [-7, -18.5], [0, -20], [7, -18.5], [14, -14], [17.5, -7.5], [15.5, -2], [10, -3.5],
      [5, -7], [0, -8.5], [-5, -7], [-10, -3.5], [-15.5, -1.5]];
    const doigts = [[[-22.5, -25.5], -34, 5.5], [[-11.5, -47], -12, 6.5], [[0, -53.5], 0, 6.5], [[11.5, -48.5], 12, 6.5], [[23, -28.5], 36, 5.5]];
    return [
      r.forme(coussinet),
      ...doigts.map(([c, a, ry]) => r.doigt(c, 4.3, ry, a)),
      ...doigts.map(([c, a, ry]) => r.griffe(c, ry, a, 1.2, 5.5, 2.4)),
    ].join('\n');
  };

  return {
    ref: '43-02a',
    titre: 'Les empreintes moyennes grandeur nature : lynx, renard, coyote, loutre',
    desc: 'Quatre empreintes de pied avant dessinées grandeur nature, coussinets en noir, à poser à côté '
      + 'd’une empreinte pour comparer les formes. En haut à gauche, le lynx : une empreinte ronde, aussi large '
      + 'que longue, quatre doigts sans griffes autour d’un gros coussinet, un des deux doigts du milieu en avance '
      + 'sur l’autre ; un pointillé en fait le tour, la marque floue du poil. En haut à droite, le renard : '
      + 'petits doigts griffus dans un grand contour de poil en pointillé, un coussinet réduit à une barre '
      + 'étroite en travers, et un X franc tracé en tireté dans le vide entre doigts et coussinet. En bas à '
      + 'gauche, le coyote : quatre doigts nets et griffus, un coussinet large au dessus plat, et le vide entre '
      + 'eux tracé en H. En bas à droite, la loutre : cinq doigts griffus, un de chaque côté plus en arrière et '
      + 'trois devant, sur un coussinet en arc. Une règle de 10 cm graduée au millimètre, debout le long du bord '
      + 'droit, sert à vérifier l’échelle à l’impression.',
    format: 'pleine',
    disposition: [['empreintes']],
    vues: {
      empreintes: {
        dessin: (z) => [lynx(), renard(), coyote(), loutre(), regle(590, 652)].join('\n'),
        renvois: (z) => {
          const L = rep(...LYNX), R = rep(...RENARD), C = rep(...COYOTE), O = rep(...LOUTRE);
          return [
            { n: 1, rond: [22, 22], cible: L.T([-31.5, -60]), texte: 'lynx, avant : pas de griffes' },
            { n: 2, rond: [350, 22], cible: L.T([-7.5, -78]), texte: 'doigt central en avance' },
            { n: 3, rond: [530, 300], cible: R.T([10, -9.5]), texte: 'renard, avant : barre et X franc' },
            { n: 4, rond: [22, 420], cible: C.T([-12.9, -45]), texte: 'coyote, avant : un H' },
            { n: 5, rond: [545, 395], cible: O.T([13.5, -54.5]), texte: 'loutre, avant : un-trois-un' },
          ];
        },
      },
    },
  };
};
