// Planche 84-01 — Où l'eau se cache dans le chalet (chapitre 84, « Pourquoi ça marche » :
// l'eau se cache aux points bas ; « L'eau », étapes 1 à 8 de la fermeture ; étape 37, l'amorçage).
// La coupe montre le chalet d'été robinets ouverts, pompe coupée : ce qui est hachuré, c'est
// l'eau qui reste. La conduite du lac, tenue pleine par le clapet de pied, et le corps de la
// pompe au bout ; le fond du réservoir et ce qui communique avec lui ; le bol du filtre, pendu
// sous sa tête ; la boucle sous le plancher ; le chauffe-eau, qui ne se vide que par son
// robinet du bas, un robinet chaud ouvert plus haut pour laisser entrer l'air ; les siphons.
// Détails : la pompe de surface et ses deux bouchons (vidange en bas, amorçage en haut), le
// clapet de pied en coupe (il se ferme vers le lac), la toilette et le siphon à l'antigel.
// Aucune cote : le chapitre ne donne aucune dimension de la plomberie. Les seuls chiffres sont
// les volumes d'antigel de l'étape 7, dans la légende.
module.exports = (h) => {
  const f = v => Math.round(v * 10) / 10;
  const blanc = a => a.replace('fill="none"', 'fill="#FFFFFF"');
  const P = pts => pts.map(([x, y]) => `${f(x)} ${f(y)}`).join(' L ');
  const EAU = h.a.hachure('eau', 'aucun');
  const FOND = 'fill="#FFFFFF" stroke="none"';

  // ─── Tuyaux ─────────────────────────────────────────────────────────────────────────
  // Une polyligne aux coins arrondis, échantillonnée fin pour que les parois soient justes.
  const arrondi = (pts, r = 8) => {
    const out = [pts[0]];
    for (let i = 1; i < pts.length - 1; i++) {
      const a = pts[i - 1], b = pts[i], c = pts[i + 1];
      const la = Math.hypot(a[0] - b[0], a[1] - b[1]), lc = Math.hypot(c[0] - b[0], c[1] - b[1]);
      const rr = Math.min(r, la / 2, lc / 2);
      const p1 = [b[0] + (a[0] - b[0]) / la * rr, b[1] + (a[1] - b[1]) / la * rr];
      const p2 = [b[0] + (c[0] - b[0]) / lc * rr, b[1] + (c[1] - b[1]) / lc * rr];
      for (let k = 0; k <= 8; k++) {
        const t = k / 8, u = 1 - t;
        out.push([u * u * p1[0] + 2 * u * t * b[0] + t * t * p2[0], u * u * p1[1] + 2 * u * t * b[1] + t * t * p2[1]]);
      }
    }
    out.push(pts[pts.length - 1]);
    const dense = [out[0]];
    for (let i = 1; i < out.length; i++) {
      const a = out[i - 1], b = out[i], n = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / 2.5));
      for (let k = 1; k <= n; k++) dense.push([a[0] + (b[0] - a[0]) * k / n, a[1] + (b[1] - a[1]) * k / n]);
    }
    return dense;
  };
  const decale = (c, d) => c.map((p, i) => {
    const a = c[Math.max(0, i - 1)], b = c[Math.min(c.length - 1, i + 1)];
    const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1;
    return [p[0] - dy / L * d, p[1] + dx / L * d];
  });
  // Découpe d'un polygone par un demi-plan (Sutherland-Hodgman) : garde où garde(p) est vrai.
  const coupe1 = (poly, dedans, inter) => {
    const out = [];
    for (let i = 0; i < poly.length; i++) {
      const A = poly[i], B = poly[(i + 1) % poly.length];
      const ia = dedans(A), ib = dedans(B);
      if (ia) out.push(A);
      if (ia !== ib) out.push(inter(A, B));
    }
    return out;
  };
  const sousY = (poly, L) => coupe1(poly, p => p[1] >= L, (A, B) => { const t = (L - A[1]) / (B[1] - A[1]); return [A[0] + t * (B[0] - A[0]), L]; });
  const avantX = (poly, X) => coupe1(poly, p => p[0] <= X, (A, B) => { const t = (X - A[0]) / (B[0] - A[0]); return [X, A[1] + t * (B[1] - A[1])]; });
  // Un tuyau : ses parois (trait d'arête) et son fond (blanc, ou l'eau sous le niveau `eau`).
  // `eau` : true = plein ; un nombre = plein sous ce niveau ; `xMax` borne l'eau à gauche d'un x.
  const tuyau = (pts, { w = 7, r = 8, eau = false, xMax = Infinity, trait = h.a.arete } = {}) => {
    const c = arrondi(pts, r);
    const g = decale(c, w / 2), d = decale(c, -w / 2);
    const gi = decale(c, (w - 1.4) / 2), di = decale(c, -(w - 1.4) / 2);
    const inter = [...gi, ...di.slice().reverse()];
    let fond = h.path(`M ${P(inter)} Z`, FOND);
    if (eau !== false) {
      let q = eau === true ? inter : sousY(inter, eau);
      if (xMax < Infinity) q = avantX(q, xMax);
      if (q.length > 2) fond += '\n' + h.path(`M ${P(q)} Z`, EAU);
    }
    return { murs: h.path(`M ${P(g)}`, trait) + '\n' + h.path(`M ${P(d)}`, trait), fond };
  };
  const poser = ts => ts.map(t => t.murs).join('\n') + '\n' + ts.map(t => t.fond).join('\n');

  // Cuve verticale aux bouts arrondis : contour, et l'eau sous le niveau L.
  const cuve = (x, y, l, ht, r) =>
    `M ${x} ${y + r} A ${r} ${r} 0 0 1 ${x + r} ${y} L ${x + l - r} ${y} A ${r} ${r} 0 0 1 ${x + l} ${y + r} L ${x + l} ${y + ht - r} A ${r} ${r} 0 0 1 ${x + l - r} ${y + ht} L ${x + r} ${y + ht} A ${r} ${r} 0 0 1 ${x} ${y + ht - r} Z`;
  const cuveEau = (x, y, l, ht, r, L) =>
    `M ${x} ${L} L ${x + l} ${L} L ${x + l} ${y + ht - r} A ${r} ${r} 0 0 1 ${x + l - r} ${y + ht} L ${x + r} ${y + ht} A ${r} ${r} 0 0 1 ${x} ${y + ht - r} Z`;

  // ─── La coupe du chalet ─────────────────────────────────────────────────────────────
  const Lt = 146;        // niveau de l'eau restée au fond du réservoir et dans ce qui lui est relié
  const coupe = () => {
    const fond = [
      // le terrain et le lac
      h.path(`M 0 369 L ${P([[0, 366], [50, 364], [80, 352], [108, 322], [128, 286], [160, 272], [200, 258], [226, 254], [600, 254]])} L 600 369 Z`, h.a.hachure('terre', 'aucun')),
      h.path(`M ${P([[0, 286], [128, 286], [108, 322], [80, 352], [50, 364], [0, 366]])} Z`, EAU),
      h.chemin([[0, 366], [50, 364], [80, 352], [108, 322], [128, 286], [160, 272], [200, 258], [226, 254], [600, 254]], h.a.arete),
      h.ligne(0, 286, 128, 286, h.a.arete),
      // la roche qui garde la crépine hors de la vase
      h.path('M 22 366 C 20 358 26 351 36 352 C 46 351 52 358 50 365 Z', h.a.hachure('pierre')),
      // les piliers, le plancher, les murs, le plafond, le toit
      h.rect(244, 210, 10, 52, h.a.hachure('bois')),
      h.rect(480, 210, 10, 52, h.a.hachure('bois')),
      h.rect(588, 210, 8, 52, h.a.hachure('bois')),
      h.rect(216, 196, 380, 14, h.a.hachure('bois')),
      h.rect(216, 70, 8, 126, h.a.hachure('bois')),
      h.rect(588, 70, 8, 126, h.a.hachure('bois')),
      h.rect(216, 64, 380, 6, h.a.hachure('bois')),
      h.chemin([[206, 70], [403, 18], [600, 70]], h.a.contour),
      // le comptoir et son armoire
      h.ligne(524, 134, 524, 196, h.a.detail),
      h.ligne(586, 134, 586, 196, h.a.detail),
    ];

    // Les tuyaux. Hachuré = l'eau qui reste, robinets ouverts.
    const conduite = tuyau([[36, 340], [36, 326], [54, 328], [80, 346], [108, 316], [127, 281], [198, 253], [232, 250], [232, 166], [243, 166]], { eau: true, r: 10 });
    const refoulement = tuyau([[264, 158], [264, 124], [308, 124], [308, 178], [362, 178], [362, 131], [370, 131]], { eau: Lt });
    const mamelon = tuyau([[334, 178], [334, 166]], { eau: true, r: 0 });
    const purge = tuyau([[352, 178], [352, 188]], { eau: true, r: 0 });
    const alimentation = tuyau([[392, 131], [404, 131], [404, 244], [440, 244], [440, 218], [536, 218], [536, 117]], { eau: 220.8, r: 10 });
    const froideCE = tuyau([[456, 218], [456, 84], [470, 84], [470, 96]], { r: 6 });
    const chaude = tuyau([[486, 96], [486, 76], [538, 76], [538, 105]], { r: 6 });
    // les drains : siphon de l'évier, drain de plancher, et le renvoi vers la fosse
    const siphonEvier = tuyau([[554, 151], [554, 178], [568, 178], [568, 164], [580, 164], [580, 234]], { w: 9, r: 7, eau: 167.8, xMax: 573 });
    const drainPlancher = tuyau([[520, 199], [520, 238], [536, 238], [536, 224], [552, 224], [600, 239]], { w: 9, r: 7, eau: 227.8, xMax: 541 });
    const boyau = tuyau([[505, 181], [515, 181], [520, 192]], { w: 5, r: 6 });

    const tuyaux = poser([conduite, refoulement, mamelon, purge, alimentation, froideCE, chaude, drainPlancher, siphonEvier, boyau]);

    const appareils = [
      // le clapet de pied, posé sur sa roche
      h.rect(31, 338, 10, 5, blanc(h.a.arete)),
      h.path('M 30 343 L 42 343 L 42 350 Q 42 353 39 353 L 33 353 Q 30 353 30 350 Z', h.a.hachure('grillage')),
      // la pompe de surface : corps plein d'eau, moteur, bloc
      h.rect(268, 182, 40, 14, h.a.hachure('bois')),
      h.rect(271, 157, 32, 24, blanc(h.a.arete)),
      h.path('M 303 157 L 306 157 Q 311 157 311 162 L 311 176 Q 311 181 306 181 L 303 181', blanc(h.a.arete)),
      ...[163, 169, 175].map(y => h.ligne(276, y, 300, y, h.a.detail)),
      h.cercle(256, 166, 15, blanc(h.a.arete)),
      h.cercle(256, 166, 13.6, EAU),
      h.rect(252, 180, 8, 4, blanc(h.a.arete)),            // bouchon de vidange
      h.rect(246, 148, 8, 5, blanc(h.a.arete)),            // bouchon d'amorçage
      // le réservoir sous pression, sur ses pattes ; son robinet du bas
      h.ligne(322, 164, 322, 196, h.a.arete), h.ligne(346, 164, 346, 196, h.a.arete),
      h.path(cuve(318, 96, 32, 72, 10), blanc(h.a.arete)),
      h.path(cuveEau(318.7, 96.7, 30.6, 70.6, 9.3, Lt), EAU),
      h.ligne(318.7, Lt, 349.3, Lt, h.a.detail),
      h.rect(347, 187, 10, 7, blanc(h.a.arete)),
      h.ligne(357, 190, 362, 190, h.a.arete),
      // le filtre : la tête, et le bol pendu dessous
      h.rect(368, 124, 26, 13, blanc(h.a.arete)),
      h.path(cuve(372, 131, 18, 46, 6), blanc(h.a.arete)),
      h.rect(368, 124, 26, 13, blanc(h.a.arete)),
      h.path(cuveEau(372.7, 137.7, 16.6, 38.6, 5.3, 137.7), EAU),
      h.ligne(372.7, 137, 389.3, 137, h.a.arete),
      // le chauffe-eau, plein : il ne se vide que par le bas
      h.rect(465, 186, 26, 10, blanc(h.a.arete)),
      h.path(cuve(462, 94, 32, 94, 8), blanc(h.a.arete)),
      h.path(cuve(462.7, 94.7, 30.6, 92.6, 7.3), EAU),
      h.rect(494, 178, 5, 6, blanc(h.a.arete)),
      h.rect(499, 176, 7, 10, blanc(h.a.arete)),
      // le drain de plancher
      h.rect(513, 194, 14, 4, blanc(h.a.arete)),
      h.ligne(517, 194, 517, 198, h.a.detail), h.ligne(520, 194, 520, 198, h.a.detail), h.ligne(523, 194, 523, 198, h.a.detail),
      // l'évier : comptoir, cuve, robinet mural
      h.rect(524, 128, 62, 6, blanc(h.a.arete)),
      h.path('M 540 134 L 540 144 Q 540 152 548 152 L 564 152 Q 572 152 572 144 L 572 134', blanc(h.a.arete)),
      h.rect(530, 104, 12, 13, blanc(h.a.arete)),
      h.path('M 542 106 L 554 106 Q 561 106 561 113 L 561 119 L 556 119 L 556 113 Q 556 111 554 111 L 542 111 Z', blanc(h.a.arete)),
      // l'air qui entre par le robinet chaud ouvert
      h.fleche('M 558.5 146 L 558.5 123', h.a.cache),
    ];

    return [...fond, tuyaux, ...appareils].join('\n');
  };

  // ─── La pompe de surface ────────────────────────────────────────────────────────────
  const pompe = () => {
    const t = [
      tuyau([[8, 207], [8, 114], [17, 114]], { w: 12, r: 8 }),
      tuyau([[72, 76], [72, 0]], { w: 12, r: 0 }),
    ];
    return [
      h.rect(0, 196, 185, 11, h.a.hachure('bois')),
      h.rect(100, 150, 70, 46, h.a.hachure('bois')),
      poser(t),
      // le moteur
      h.path('M 94 88 L 164 88 Q 174 88 174 98 L 174 140 Q 174 150 164 150 L 94 150 Z', blanc(h.a.arete)),
      ...[100, 110, 120, 130, 140].map(y => h.ligne(104, y, 164, y, h.a.detail)),
      h.rect(118, 76, 28, 12, blanc(h.a.arete)),
      h.rect(86, 82, 8, 74, blanc(h.a.arete)),
      // le corps de la pompe : couvercle à gauche, l'aspiration au centre
      h.path('M 20 84 Q 20 78 26 78 L 70 78 Q 85 80 86 96 L 86 132 Q 85 148 70 150 L 26 150 Q 20 150 20 144 Z', blanc(h.a.contour)),
      h.ligne(29, 79, 29, 149, h.a.detail),
      ...[88, 114, 140].map(y => h.cercle(24.5, y, 1.5, h.a.plein)),
      h.rect(14, 106, 6, 16, blanc(h.a.arete)),
      h.rect(64, 71, 16, 8, blanc(h.a.arete)),
      // le bouchon d'amorçage, en haut, en place
      h.rect(33, 70, 14, 9, blanc(h.a.arete)),
      h.rect(36, 62, 8, 8, blanc(h.a.arete)),
      h.ligne(40, 62, 40, 70, h.a.detail),
      // le trou de vidange, en bas, ouvert ; l'eau qui sort
      h.rect(43, 149, 14, 8, blanc(h.a.arete)),
      h.ellipse(50, 157.5, 3.5, 1.4, h.a.plein),
      h.fleche('M 50 161 L 50 178', h.a.arete),
      h.ellipse(44, 172, 1.3, 2, h.a.plein), h.ellipse(56, 167, 1.3, 2, h.a.plein),
      // la bouteille coupée qui recueille
      h.path('M 34 178 L 34 192 Q 34 196 38 196 L 66 196 Q 70 196 70 192 L 70 178', blanc(h.a.arete)),
      h.path('M 34.7 186 L 69.3 186 L 69.3 192 Q 69.3 195.3 66 195.3 L 38 195.3 Q 34.7 195.3 34.7 192 Z', EAU),
      h.ligne(34.7, 186, 69.3, 186, h.a.detail),
      // le bouchon de vidange, dévissé, posé au sol
      h.rect(76, 189, 8, 7, blanc(h.a.arete)),
      h.rect(84, 190.5, 6, 4, blanc(h.a.detail)),
    ].join('\n');
  };

  // ─── Le clapet de pied, en coupe ────────────────────────────────────────────────────
  const clapet = () => [
    // la conduite, pleine
    h.rect(62, 0, 24, 78, blanc(h.a.arete)),
    h.rect(62.7, 0, 22.6, 78, EAU),
    h.ligne(62, 0, 62, 78, h.a.arete), h.ligne(86, 0, 86, 78, h.a.arete),
    // le raccord fileté, qui se dévisse
    h.rect(56, 76, 36, 13, blanc(h.a.arete)),
    ...[64, 74, 84].map(x => h.ligne(x, 76, x, 89, h.a.detail)),
    // le corps, coupé : parois, siège, clapet fermé
    h.rect(57, 89, 34, 45, blanc(h.a.fin)),
    h.rect(57, 89, 34, 45, EAU),
    h.rect(52, 89, 5, 45, h.a.hachure('metal')),
    h.rect(91, 89, 5, 45, h.a.hachure('metal')),
    h.rect(57, 120, 8, 5, h.a.hachure('metal')),
    h.rect(83, 120, 8, 5, h.a.hachure('metal')),
    h.rect(60, 114.5, 28, 5.5, h.a.plein),
    h.cercle(61, 113, 2.2, blanc(h.a.arete)),
    // la crépine
    h.path('M 54 134 L 94 134 L 94 170 Q 94 178 86 178 L 62 178 Q 54 178 54 170 Z', h.a.hachure('grillage')),
    // la poussée vers le lac, qui ferme le clapet
    `<path d="M 74 16 L 74 102" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round"/>`,
    h.fleche('M 74 16 L 74 104', h.a.arete),
    // le fond du lac
    h.rect(0, 194, 148, 13, h.a.hachure('terre', 'aucun')),
    h.ligne(0, 194, 148, 194, h.a.arete),
  ].join('\n');

  // ─── La toilette et le siphon, à l'antigel ─────────────────────────────────────────
  const toilette = () => {
    const niv = 139.3;                     // l'antigel monte jusqu'au seuil du siphon de la cuvette
    const cavite = [[16, 106], [17, 124], [26, 140], [42, 150], [58, 150], [66, 143], [72, 128], [76, 106]];
    const voie = tuyau([[60, 145], [70, 153], [78, 146], [82, 134], [90, 134], [94, 148], [94, 196]], { w: 12, r: 6, eau: niv, xMax: 88 });
    const siphon = tuyau([[172, 66], [172, 126], [196, 126], [196, 100], [214, 100]], { w: 10, r: 12, eau: 103.8, xMax: 201 });
    const cav = h.path(`M ${P(cavite)} Z`, blanc(h.a.arete));
    const cavEau = h.path(`M ${P(sousY(cavite, niv))} Z`, EAU);
    return [
      h.rect(0, 196, 222, 11, h.a.hachure('bois')),
      h.rect(210, 60, 12, 136, h.a.hachure('bois')),
      // la porcelaine
      h.path('M 8 106 L 120 106 C 117 140 108 170 106 196 L 34 196 C 40 180 41 166 36 156 C 18 148 8 130 8 106 Z', blanc(h.a.contour)),
      cav, voie.murs, voie.fond, cavEau,
      h.ligne(16, niv, 66, niv, h.a.detail),
      // le siège
      h.path('M 6 106 L 6 101 Q 6 99 9 99 L 84 99 L 84 106', blanc(h.a.arete)),
      // le réservoir : épongé, puis une garde d'antigel au fond
      h.rect(82, 28, 50, 6, blanc(h.a.arete)),
      h.rect(86, 34, 42, 72, blanc(h.a.contour)),
      h.path('M 90.7 94 L 123.3 94 L 123.3 101.3 L 90.7 101.3 Z', EAU),
      h.rect(90, 38, 34, 64, h.a.detail),
      h.ligne(90.7, 94, 123.3, 94, h.a.detail),
      h.path('M 104 101 L 104 56 M 110 101 L 110 56', h.a.detail),
      h.path('M 100 101 Q 107 95 114 101', h.a.detail),
      // le lavabo et son siphon
      h.path('M 148 42 C 152 60 160 64 168 64 L 176 64 C 186 64 196 60 200 42', h.a.contour),
      poser([siphon]),
    ].join('\n');
  };

  return {
    ref: '84-01',
    titre: 'Où l’eau se cache dans le chalet',
    desc: 'Coupe d’un chalet d’été sur pilotis, du lac aux robinets, pompe coupée et robinets ouverts ; l’eau qui reste est hachurée. La conduite du lac, posée sur le fond puis sur la berge, reste pleine jusqu’à la pompe : son clapet de pied, posé sur une roche, la retient. Le corps de la pompe est plein. Le réservoir sous pression garde de l’eau au fond, avec ce qui lui est relié, jusqu’à son robinet du bas. Le bol du filtre, pendu sous sa tête, reste plein. La boucle du tuyau sous le plancher garde son eau. Le chauffe-eau reste plein : il se vide par son robinet du bas, un boyau au drain de plancher, pendant que l’air entre par le robinet chaud ouvert de l’évier. Les siphons de l’évier et du drain de plancher gardent leur eau. En détail : la pompe de surface, le bouchon d’amorçage en haut, le bouchon de vidange en bas dévissé et l’eau qui coule dans une bouteille coupée ; le clapet de pied en coupe, fermé par la poussée venue d’en haut, sous son raccord fileté ; la toilette et le lavabo, le réservoir épongé avec un fond d’antigel, la cuvette et le siphon gardés pleins d’antigel.',
    format: 'pleine',
    disposition: [['coupe'], ['pompe', 'clapet', 'toilette']],
    hauteurs: [1.7, 1],
    largeurs: [[1], [1, 0.8, 1.2]],
    vues: {
      coupe: {
        titre: 'Robinets ouverts, l’eau qui reste',
        dessin: z => coupe(z),
        renvois: z => [
          { n: 1, rond: [160, 232], cible: [166, 265], texte: 'conduite du lac, tenue pleine par le clapet' },
          { n: 2, rond: [300, 232], cible: [352, 190], texte: 'réservoir sous pression : robinet du bas' },
          { n: 3, rond: [426, 150], cible: [389, 160], texte: 'boîtier de filtre : vidé, laissé ouvert' },
          { n: 4, rond: [512, 150], cible: [503, 180], texte: 'chauffe-eau : robinet du bas, boyau au drain' },
          { n: 5, rond: [568, 96], cible: [559, 119], texte: 'robinet chaud ouvert : l’air entre' },
          { n: 6, rond: [380, 236], cible: [420, 246], texte: 'boucle sous le plancher : à souffler' },
        ],
      },
      pompe: {
        titre: 'La pompe de surface',
        dessin: z => pompe(z),
        renvois: z => [
          { n: 7, rond: [24, 40], cible: [39, 63], texte: 'bouchon d’amorçage : on remplit par là' },
          { n: 8, rond: [86, 174], cible: [56, 154], texte: 'bouchon de vidange : on vide par là' },
        ],
      },
      clapet: {
        titre: 'Le clapet de pied',
        dessin: z => clapet(z),
        renvois: z => [
          { n: 9, rond: [124, 117], cible: [88, 117], texte: 'fermé vers le lac : on le dévisse' },
        ],
      },
      toilette: {
        titre: 'Toilette et lavabo',
        dessin: z => toilette(z),
        renvois: z => [
          { n: 10, rond: [150, 14], cible: [118, 97], texte: 'réservoir épongé, puis 0,5 L d’antigel' },
          { n: 11, rond: [20, 178], cible: [44, 146], texte: 'cuvette épongée, puis 1 L d’antigel' },
          { n: 12, rond: [148, 132], cible: [184, 131], texte: 'chaque siphon : 0,5 L d’antigel' },
        ],
      },
    },
  };
};
