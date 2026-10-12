module.exports = (h) => {
  // ─── petits outils de tracé ──────────────────────────────────────────────
  const f = p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`;
  const seg = (p0, p1, p2, p3, t = 1 / 6) =>
    `C${f([p1[0] + (p2[0] - p0[0]) * t, p1[1] + (p2[1] - p0[1]) * t])} ${f([p2[0] - (p3[0] - p1[0]) * t, p2[1] - (p3[1] - p1[1]) * t])} ${f(p2)} `;
  const courbe = pts => {
    const n = pts.length, g = i => pts[Math.max(0, Math.min(n - 1, i))];
    let s = '';
    for (let i = 0; i < n - 1; i++) s += seg(g(i - 1), g(i), g(i + 1), g(i + 2));
    return s;
  };
  // un membre, une lanière : ligne médiane lissée, largeur à chaque point
  const membre = (pts, ws, cap0 = 'rond', cap1 = 'rond') => {
    const n = pts.length, L = [], R = [];
    for (let i = 0; i < n; i++) {
      const a = pts[Math.max(0, i - 1)], b = pts[Math.min(n - 1, i + 1)];
      let tx = b[0] - a[0], ty = b[1] - a[1];
      const l = Math.hypot(tx, ty); tx /= l; ty /= l;
      const w = ws[i] / 2;
      L.push([pts[i][0] - ty * w, pts[i][1] + tx * w]);
      R.push([pts[i][0] + ty * w, pts[i][1] - tx * w]);
    }
    let d = `M${f(L[0])} ${courbe(L)}`;
    d += cap1 === 'rond' ? `A${ws[n - 1] / 2},${ws[n - 1] / 2} 0 0 0 ${f(R[n - 1])} ` : `L${f(R[n - 1])} `;
    d += courbe(R.slice().reverse());
    d += cap0 === 'rond' ? `A${ws[0] / 2},${ws[0] / 2} 0 0 0 ${f(L[0])} ` : `L${f(L[0])} `;
    return d + 'Z';
  };
  const blanc = h.a.blanc.match(/fill="[^"]*"/)[0];
  const W = a => a.replace('fill="none"', blanc);

  // ─── vue 1 : le poste, de côté ───────────────────────────────────────────
  // Poutre : axe depuis le bout haut A, pente vers le sol à droite.
  const DX = -62;
  const A = [230, 144], v = [0.9006, 0.4343], w = [0.4343, -0.9006], r = 12;
  const P = (d, e) => [A[0] + v[0] * d + w[0] * e, A[1] + v[1] * d + w[1] * e];
  const G = 294;
  // bord bas de la peau pendante, et ses poils
  const bordPeau = [[221, 194], [233, 199], [245, 206], [258, 208], [270, 213], [283, 224], [295, 230],
    [308, 231], [320, 237], [333, 243], [345, 244], [358, 252], [370, 256], [383, 257], [395, 260], [404, 259], [412, 256]];
  const poils = [];
  for (let i = 0; i < bordPeau.length - 1; i++) {
    const [a, b] = [bordPeau[i], bordPeau[i + 1]];
    for (let k = 0.25; k < 1; k += 0.5) {
      const x = a[0] + (b[0] - a[0]) * k, y = a[1] + (b[1] - a[1]) * k;
      poils.push(h.ligne(x, y, x + 1.5, y + 5, h.a.detail));
    }
  }

  const poste = z => `<g transform="translate(${DX},0)">` + [
    // le sol
    h.rect(110, G, 490, 22, h.a.hachure('terre', 'aucun')),
    h.ligne(110, G, 600, G, h.a.arete),
    // bout enterré de la poutre
    h.chemin([[568.7, G], P(380, 12), P(380, -12), [513.5, G]], W(h.a.cache), true),
    // la poutre, hors terre
    h.chemin([P(0, 12), [568.7, G], [513.5, G], P(0, -12)], W(h.a.contour), true),
    h.chemin([P(212, 4), P(320, 4)], h.a.detail),
    h.chemin([P(232, -5), P(300, -5)], h.a.detail),
    h.chemin([P(250, 1), P(282, 1)], h.a.detail),
    // le piquet qui cale le haut de la poutre
    h.chemin([[269, 180], [270, G], [278, G], [279, 180]], W(h.a.arete)),
    h.chemin([[270, G], [274, 309], [278, G]], W(h.a.cache)),
    // la peau, chair en l'air, qui pend du côté du lecteur
    h.chemin([P(0, 15), P(200, 15), [418, 232], [414, 246], ...bordPeau.slice().reverse(), [219, 175], P(-4, -12), P(-4, 8)], W(h.a.arete), true),
    ...poils,
    // partie du piquet cachée derrière la peau : une fourche qui prend la poutre de part et
    // d'autre, sans quoi la bille ronde roule du piquet au premier coup de travers
    h.chemin([[269.2, 212], [269.1, 188], [263.5, 163], [268.5, 163], [274, 179], [279.5, 163],
      [284.5, 163], [278.9, 188], [278.8, 216]], h.a.cache),
    // les jambes, sous le tronc
    h.path(membre([[186, 142], [174, 218], [160, 284]], [27, 19, 13]), W(h.a.arete)),
    h.chemin([[153, 280], [167, 280], [170, 287], [186, 289], [188, G], [150, G], [150, 286]], W(h.a.arete), true),
    h.path(membre([[192, 148], [214, 216], [212, 284]], [27, 19, 13]), W(h.a.arete)),
    h.chemin([[205, 280], [219, 280], [222, 287], [238, 289], [240, G], [202, G], [202, 286]], W(h.a.arete), true),
    // le tronc, appuyé du ventre sur le bout de la poutre
    h.path(membre([[186, 146], [216, 117], [247, 88]], [46, 46, 40]), W(h.a.arete)),
    // la tête, penchée sur l'ouvrage
    h.ellipse(271, 57, 14, 16, W(h.a.arete)),
    h.chemin([[283.2, 61], [288, 67.5], [281.5, 69.5]], h.a.arete),
    // le couteau (vu par le bout) et le bras de devant
    h.chemin([[320.2, 172.4], [323.6, 171], [320.9, 165], [317.5, 166.4]], h.a.plein, true),
    h.path(membre([[249, 90], [284, 125], [312, 155]], [15, 12, 10]), W(h.a.arete)),
    h.ellipse(318, 160, 9, 8, W(h.a.arete)),
    // le sens de la poussée
    h.fleche('M343,163 L397,189', h.a.arete),
  ].join('\n') + '</g>';

  const T = (x, y) => [x + DX, y];

  // ─── vue 2 : en travers de la poutre ────────────────────────────────────
  const prise = z => [
    // avant-bras, coupés par le cadre
    h.path(membre([[50, 84], [72, 6]], [22, 24], 'rond', 'plat'), W(h.a.arete)),
    h.path(membre([[238, 84], [216, 6]], [22, 24], 'rond', 'plat'), W(h.a.arete)),
    // la poutre coupée
    h.cercle(144, 140, 36, h.a.hachure('bois', 'contour')),
    // la peau qui épouse la courbe et pend des deux côtés
    h.path('M102,226 L102,140 A42,42 0 0 1 186,140 L187,214 L189,224 L185,236 L183,229 L180,233 L180,140 A36,36 0 0 0 108,140 L108,222 L106,236 L103,231 L99,238 Z', W(h.a.arete)),
    // la lame, droite, qui ne touche la peau qu'au sommet
    h.rect(64, 86, 160, 12, W(h.a.contour)),
    h.ligne(66, 94.5, 222, 94.5, h.a.detail),
    // les poignées aux deux bouts
    h.path(membre([[28, 92], [64, 92]], [16, 16], 'rond', 'plat'), W(h.a.arete)),
    h.path(membre([[260, 92], [224, 92]], [16, 16], 'rond', 'plat'), W(h.a.arete)),
    // les poings
    h.rect(38, 78, 24, 28, W(h.a.arete).replace('fill=', 'rx="8" fill=')),
    h.rect(226, 78, 24, 28, W(h.a.arete).replace('fill=', 'rx="8" fill=')),
    ...[44, 50, 56].map(x => h.ligne(x, 97, x, 105, h.a.detail)),
    ...[232, 238, 244].map(x => h.ligne(x, 97, x, 105, h.a.detail)),
  ].join('\n');

  // ─── vue 3 : la lame, en coupe le long de la poutre ─────────────────────
  const Q = [150, 141], b = [-0.766, -0.643];
  const Q2 = [Q[0] + 105 * b[0], Q[1] + 105 * b[1]];
  const poilsCoupe = [];
  for (let x = 16; x < 272; x += 5) poilsCoupe.push(h.ligne(x, 160.5, x + 2, 165.5, h.a.detail));
  const angle = z => [
    h.rect(14, 166, 261, 72, h.a.hachure('bois', 'arete')),
    ...poilsCoupe,
    h.rect(14, 146, 261, 14, W(h.a.arete)),
    // la membrane : collée devant la lame, décollée en une seule feuille qui monte sur la lame
    h.path(membre([[275, 143.5], [200, 143.5], [168, 143.5], [159.5, 141], [155.6, 135.5], [148, 128.5],
      [139.8, 122], [124.5, 109.2], [113, 99.5], [105.5, 90], [106, 80], [113, 73], [124, 69.5], [136, 71.5],
      [144, 78], [147.5, 88], [147, 96]], Array(17).fill(5), 'plat', 'rond'), W(h.a.arete)),
    // la lame, dos arrondi sur la peau, penchée vers celui qui pousse
    h.path(membre([Q, Q2], [10, 10], 'rond', 'plat'), h.a.hachure('metal', 'contour')),
    h.fleche('M78,46 L140,46', h.a.arete),
  ].join('\n');

  return {
    ref: '102-02',
    titre: 'La poutre à écharner et l’angle du couteau',
    desc: 'De côté : un tronc écorcé planté en biais, calé par un piquet à hauteur de hanche ; la peau, chair en l’air, est appuyée contre le ventre et tenue par le poids du corps ; le couteau est poussé à deux mains vers le bas de la poutre. En travers : la lame droite ne touche la peau qu’au sommet de la courbe, les poignées sont aux deux bouts. En coupe : la lame, dos arrondi sur la peau, penchée vers celui qui pousse, décolle la membrane en une seule feuille qui monte sur la lame.',
    format: 'pleine',
    disposition: [['poste'], ['prise', 'angle']],
    hauteurs: [5, 4],
    largeurs: [[1], [1, 1]],
    vues: {
      poste: {
        titre: 'Le poste, de côté',
        dessin: poste,
        renvois: z => [
          { n: 1, rond: T(520, 215), cible: T(...P(280, 12)), texte: 'tronc d’épinette écorcé, planté en biais' },
          { n: 2, rond: T(320, 272), cible: T(278.6, 262), texte: 'calé à hauteur de hanche' },
          { n: 3, rond: T(445, 175), cible: T(...P(190, 15)), texte: 'peau chair en l’air' },
          { n: 4, rond: T(256, 126), cible: T(231, 133), texte: 'appuyée au ventre, poids du corps' },
          { n: 5, rond: T(345, 128), cible: T(324.4, 154.3), texte: 'poussée à deux mains, corps par-dessus' },
        ],
      },
      prise: {
        titre: 'En travers de la poutre',
        dessin: prise,
        renvois: z => [
          { n: 6, rond: [144, 218], cible: [144, 176], texte: 'billot gros comme une cuisse' },
          { n: 7, rond: [212, 128], cible: [171, 107.8], texte: 'la courbe présente la peau' },
          { n: 8, rond: [30, 130], cible: [30, 100], texte: 'poignées aux deux bouts' },
        ],
      },
      angle: {
        titre: 'La lame, en coupe',
        dessin: angle,
        renvois: z => [
          { n: 9, rond: [95, 134], cible: [147, 144.6], texte: 'dos arrondi, sans fil' },
          { n: 10, rond: [38, 100], cible: [97, 103], texte: 'lame penchée vers soi, poussée devant' },
          { n: 11, rond: [200, 95], cible: [150.2, 87], texte: 'membrane qui part en feuille continue' },
        ],
      },
    },
  };
};
