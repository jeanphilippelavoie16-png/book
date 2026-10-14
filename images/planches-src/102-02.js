// Planche 102-02 — La poutre à écharner et l'angle du couteau.
// 13 oct. : l'homme est le corps simple (pose « penche-pousse ») ; « En travers de la poutre » est un
// gros plan de mains calquées, laissé tel quel pour la nouvelle bibliothèque. La charte : le dessous
// de la bille à l'ombre, la flèche de la poussée en rouge.
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
  // l'homme : le corps simple (pose « penche-pousse ») ; le devant des cuisses touche le bout de la
  // poutre, les bras recalculés pour que les deux poings tombent sur les poignées (vues par le bout,
  // l'une derrière l'autre)
  const X_PIEDS = 196.5, E_HOMME = 0.18;
  const BRAS = { brasP: -5.3, avantbrasP: 60.6, mainP: 60, brasL: -8.3, avantbrasL: 62.9, mainL: 60 };
  // le couteau : posé sur la peau à KD le long de la poutre, la lame penchée vers celui qui pousse
  const KD = 118, KB = [A[0] + v[0] * KD + w[0] * 9, A[1] + v[1] * KD + w[1] * 9], KH = [KB[0] - 11.5, KB[1] - 24];
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
    // le dessous de la bille, à l'ombre, puis le contour repassé par-dessus
    h.chemin([P(150, -2), [536.5, G], [513.5, G], P(150, -12)], h.a.ombre, true),
    h.chemin([P(0, 12), [568.7, G], [513.5, G], P(0, -12)], h.a.contour, true),
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
    // la lame vue par le bout, puis l'homme penché par-dessus, les deux poings fermés sur les
    // poignées (la poignée de derrière cachée par celle de devant) ; le bout de la poignée se voit
    // dans le poing proche
    h.path(membre([KB, KH], [7, 7], 'rond', 'plat'), h.a.hachure('metal', 'contour')),
    String(h.formes.corps({ x: X_PIEDS, y: G, pose: 'penche-pousse', echelle: E_HOMME, angles: BRAS,
      objet: c => h.cercle(c.mainP.x, c.mainP.y, 4.5, W(h.a.arete)) })),
    // le geste : la poussée, vers le bas de la poutre
    h.geste(`M${KH[0] + 34},${KH[1] + 2} L${KH[0] + 88},${KH[1] + 28}`),
  ].join('\n') + '</g>';

  const T = (x, y) => [x + DX, y];

  // ─── vue 2 : en travers de la poutre ────────────────────────────────────
  const prise = z => [
    // la poutre coupée
    h.cercle(144, 140, 36, h.a.hachure('bois', 'contour')),
    // la peau qui épouse la courbe et pend des deux côtés
    h.path('M102,226 L102,140 A42,42 0 0 1 186,140 L187,214 L189,224 L185,236 L183,229 L180,233 L180,140 A36,36 0 0 0 108,140 L108,222 L106,236 L103,231 L99,238 Z', W(h.a.arete)),
    // la lame, droite, qui ne touche la peau qu'au sommet
    h.rect(64, 86, 160, 12, W(h.a.contour)),
    h.ligne(66, 94.5, 222, 94.5, h.a.detail),
    // les poignées aux deux bouts, au diamètre du poing du modèle
    h.path(membre([[12, 92], [64, 92]], [11, 11], 'rond', 'plat'), W(h.a.arete)),
    h.path(membre([[276, 92], [224, 92]], [11, 11], 'rond', 'plat'), W(h.a.arete)),
    // un poing fermé sur chaque poignée, qui appuie vers le bas : modèle s11 (poing fermé, vu de la
    // paume) retourné, l'avant-bras qui monte et sort du cadre, le pouce du côté de la lame
    ...[[46, true], [242, false]].map(([x, mir]) => String(h.formes.modele('s11', { x, y: 92, ancre: [68, 42], angle: 180, echelle: 0.42, miroir: mir,
      masquer: [[0, 150, 140, 175]], bras: { a: [21.8, 150], a0: [20.8, 135], b: [76.3, 150], b0: [76.2, 135], bord: z } }))),
    h.fleche('M84,30 L84,54', h.a.arete),
    h.fleche('M204,30 L204,54', h.a.arete),
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
    desc: 'De côté : un tronc écorcé planté en biais, calé par un piquet à hauteur de hanche ; la peau, chair en l’air, est appuyée contre le ventre et tenue par le poids du corps ; l’homme penché par-dessus pousse le couteau à deux mains vers le bas de la poutre (flèche rouge). En travers : la lame droite ne touche la peau qu’au sommet de la courbe, les poignées sont aux deux bouts. En coupe : la lame, dos arrondi sur la peau, penchée vers celui qui pousse, décolle la membrane en une seule feuille qui monte sur la lame.',
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
          { n: 4, rond: T(244, 172), cible: T(229, 140), texte: 'appuyée au ventre, poids du corps' },
          { n: 5, rond: T(KB[0] + 22, KB[1] - 52), cible: T(KB[0] - 5, KB[1] - 10), texte: 'poussée à deux mains, corps par-dessus' },
        ],
      },
      prise: {
        titre: 'En travers de la poutre',
        dessin: prise,
        renvois: z => [
          { n: 6, rond: [144, 218], cible: [144, 176], texte: 'billot gros comme une cuisse' },
          { n: 7, rond: [212, 128], cible: [171, 107.8], texte: 'la courbe présente la peau' },
          { n: 8, rond: [22, 128], cible: [16, 92], texte: 'poignées aux deux bouts' },
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
