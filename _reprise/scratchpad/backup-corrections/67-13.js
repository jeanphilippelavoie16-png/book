// Planche 67-13 — tirer le sel du fleuve (chapitre 62, « Tirer du sel du fleuve » et
// « Récupérer et réparer au lieu de racheter »).
module.exports = (h) => {
  const blanc = a => a.replace('fill="none"', 'fill="#ffffff"');
  const arBlanc = blanc(h.a.arete);
  const deBlanc = blanc(h.a.detail);
  const coBlanc = blanc(h.a.contour);
  const f1 = v => Math.round(v * 10) / 10;

  // hasard reproductible
  let graine = 7;
  const rnd = () => (graine = (graine * 16807) % 2147483647) / 2147483647;

  // points tournés de a degrés autour de l'origine locale, puis posés en (cx, cy)
  const tourne = (pts, cx, cy, a) => {
    const c = Math.cos(a * Math.PI / 180), s = Math.sin(a * Math.PI / 180);
    return pts.map(([x, y]) => [f1(cx + x * c - y * s), f1(cy + x * s + y * c)]);
  };
  const goutte = (x, y, k = 1) => h.ellipse(x, y, 1.3 * k, 2 * k, h.a.plein);
  const cristal = (x, y) => h.rect(x, y, 3, 3, deBlanc);
  const pierre = (x, y, w, t) => {
    const d = `M${x + 4},${y} L${x + w - 5},${y + 1} Q${x + w},${y + 1} ${x + w},${y + 5} L${x + w},${y + t - 3} Q${x + w},${y + t} ${x + w - 3},${y + t} L${x + 3},${y + t} Q${x},${y + t} ${x},${y + t - 3} L${x},${y + 4} Q${x},${y} ${x + 4},${y} Z`;
    return [h.path(d, h.a.blanc), h.path(d, h.a.hachure('pierre'))];
  };
  const flamme = (x, yb, top, w, pente = 0) =>
    h.path(`M${x - w},${yb} C${x - w - 1},${yb - 7} ${x - w * 0.2},${top + 9} ${x + pente},${top} C${x + w * 0.5},${top + 8} ${x + w + 1},${yb - 6} ${x + w},${yb}`, h.a.arete);
  const buche = (x, y, r) => [h.cercle(x, y, r, h.a.blanc), h.cercle(x, y, r, h.a.hachure('bois'))];
  const sol = (x1, x2, y, ep = 7) => [h.rect(x1, y, x2 - x1, ep, h.a.hachure('terre', 'aucun')), h.ligne(x1, y, x2, y, h.a.arete)];
  const neige = (x1, x2, y, ep) => [h.rect(x1, y, x2 - x1, ep, h.a.hachure('neige', 'aucun')), h.ligne(x1, y, x2, y, h.a.arete)];

  // une chaudière vue de côté, penchée de a degrés, le milieu de sa gueule en (cx, cy)
  const chaudiere = (cx, cy, a, w, b, H) => {
    const corps = tourne([[-w / 2, 0], [w / 2, 0], [b / 2, H], [-b / 2, H]], cx, cy, a);
    const bord = tourne([[-w / 2 + 0.6, 4], [w / 2 - 0.6, 4]], cx, cy, a);
    const cul = tourne([[-b / 2 + 0.4, H - 4], [b / 2 - 0.4, H - 4]], cx, cy, a);
    const oreilles = tourne([[-w / 2 + 3, 7], [w / 2 - 3, 7]], cx, cy, a);
    const gueule = tourne(Array.from({ length: 24 }, (_, i) => [w / 2 * Math.cos(i * Math.PI / 12), 3.2 * Math.sin(i * Math.PI / 12)]), cx, cy, a);
    return [
      h.chemin(corps, coBlanc, true),
      h.chemin(gueule, arBlanc, true),
      h.chemin(bord, h.a.detail), h.chemin(cul, h.a.detail),
      ...oreilles.map(([x, y]) => h.cercle(x, y, 1.6, h.a.detail)),
    ];
  };

  // un morceau de glace : dalle blanche aux bouts cassés, quelques traits fins dedans
  const dalle = (cx, cy, a, L, e) => {
    const bord = tourne([[-L / 2, -e / 2], [L / 2 - 3, -e / 2], [L / 2, -1], [L / 2 - 2, e / 2], [-L / 2 + 2, e / 2], [-L / 2 - 1, 1]], cx, cy, a);
    const traits = [[-L / 3, -1, -L / 3 + 4, 2], [-2, -2, 2, 1.5], [L / 4, -1.5, L / 4 + 3, 2]]
      .map(([x1, y1, x2, y2]) => tourne([[x1, y1], [x2, y2]], cx, cy, a));
    return [h.chemin(bord, arBlanc, true), ...traits.map(p => h.chemin(p, h.a.fin))];
  };

  // une branche de sapin vue de côté : tige, aiguilles en arêtes de poisson
  const branche = (x0, y0, len, dir) => {
    const tige = `M${f1(x0)},${f1(y0)} Q${f1(x0 + dir * len / 2)},${f1(y0 + 1.2)} ${f1(x0 + dir * len)},${f1(y0 + 3)}`;
    let aig = '';
    for (let t = 3; t < len - 1; t += 3.4) {
      const px = x0 + dir * t, py = y0 + 3 * (t / len) ** 2, n = 3.3 * (1 - 0.45 * t / len);
      aig += `M${f1(px)},${f1(py)} l${f1(dir * n * 0.75)},${f1(-n * 0.7)} M${f1(px)},${f1(py)} l${f1(dir * n * 0.75)},${f1(n * 0.7)} `;
    }
    return [h.path(tige, h.a.detail), h.path(aig.trim(), h.a.fin)];
  };

  // les branches coupées en travers : bouts de tige et touffes d'aiguilles
  const touffes = (x1, x2, y1, y2) => {
    const out = [];
    for (let y = y1 + 3; y <= y2 - 3; y += 6) {
      for (let x = x1 + 4; x <= x2 - 3; x += 8) {
        const cx = x + (rnd() - 0.5) * 3, cy = y + (rnd() - 0.5) * 3, p = rnd() * 60;
        let d = '';
        for (const k of [0, 60, 120]) {
          const r = (p + k) * Math.PI / 180;
          d += `M${f1(cx - 2.2 * Math.cos(r))},${f1(cy - 2.2 * Math.sin(r))} L${f1(cx + 2.2 * Math.cos(r))},${f1(cy + 2.2 * Math.sin(r))} `;
        }
        out.push(h.path(d.trim(), h.a.fin));
        if (rnd() < 0.45) out.push(h.cercle(f1(cx), f1(cy), 1, deBlanc));
      }
    }
    return out;
  };

  // ── Le mur de la claie : mêmes hauteurs en coupe et de face ──
  const MUR_H = 74, MUR_B = 142;                 // haut et bas des branches
  const PERCHES = [76, 106, 134];                // haut de chaque perche, 8 d'épaisseur
  const SOL2 = 170;

  return {
    ref: '67-13',
    titre: 'Tirer le sel du fleuve',
    desc: 'Six vues. Filtrer : une chaudière penchée verse l’eau puisée sur une toile nouée sur une autre chaudière, en coupe ; sable et algue restent dans la toile. L’hiver : en coupe, un bac large et peu profond posé sur la neige, sa croûte de glace cassée, un morceau sorti et mis à égoutter sur deux bûches. L’été, en coupe et de face : un mur de branches de sapin pincé entre des perches liées à des piquets, sous un toit à deux versants sur quatre poteaux ; la saumure versée au sommet descend de branche en branche pendant que le vent traverse le mur, une auge au pied la reprend et on la reverse en haut ; un dépôt croûteux marque les branches du bas. Le feu : un récipient large et peu profond sur un foyer de pierres, feu doux, les cristaux cueillis à l’écumoire et mis à égoutter dans une toile tendue au-dessus d’un bol ; le fond qui reste dans le récipient se jette. La saumure d’une salaison : un chaudron sur le feu, l’écume enlevée à l’écumoire jusqu’à ce que le liquide soit clair. Encadré danger : le gel et le feu concentrent aussi les métaux et les hydrocarbures, et seul le point de puisage les tient hors du sel.',
    format: 'pleine',
    disposition: [['filtre', 'gel'], ['coupe', 'elevation'], ['feu', 'saumure']],
    largeurs: [[2, 3], [2, 3], [3, 2]],
    hauteurs: [1, 1.25, 1],
    danger: 'Le gel et le feu concentrent tout ce que l’eau contient : métaux et hydrocarbures finissent dans le sel. Le point de puisage est la seule barrière.',
    vues: {
      // ───────────────────────── puiser et filtrer ─────────────────────────
      filtre: {
        titre: 'Filtrer',
        dessin: z => {
          const G = 130;
          const xg = y => 100 + (y - 66) * 8 / 64, xd = y => 186 - (y - 66) * 8 / 64;
          return [
            h.ligne(62, G, 226, G, h.a.arete),
            // l'eau filtrée dans la chaudière du bas
            h.chemin([[f1(xg(100)), 100], [f1(xd(100)), 100], [178, G], [108, G]], h.a.hachure('eau', 'aucun'), true),
            h.ligne(f1(xg(100)), 100, f1(xd(100)), 100, h.a.detail),
            // la chaudière du bas, en coupe
            h.chemin([[100, 66], [108, G], [178, G], [186, 66]], h.a.contour),
            // la toile nouée, creusée par le poids de l'eau
            h.path('M94,82 L97,65 Q143,112 189,65 L192,82', h.a.arete),
            h.cercle(98.3, 73, 2, h.a.plein), h.cercle(187.7, 73, 2, h.a.plein),
            // ce que la toile retient
            h.path('M123,84.2 q2.5,-2.6 5,0 t5,0', h.a.detail),
            h.cercle(138, 86.6, 0.9, h.a.plein), h.cercle(142.5, 87.3, 0.9, h.a.plein),
            h.cercle(146, 86, 0.8, h.a.plein), h.cercle(149.5, 87.1, 0.9, h.a.plein),
            h.cercle(153, 86.4, 0.8, h.a.plein),
            // la chaudière qui verse, et le filet d'eau
            h.path('M125,51 C136,53 143,65 145,85', h.a.detail),
            h.path('M122.5,55 C130,59 135,70 137,86', h.a.detail),
            ...chaudiere(132.4, 35, 115, 40, 28, 40),
          ].join('\n');
        },
        renvois: z => [
          { n: 1, rond: [30, 28], cible: [104, 28], texte: 'eau puisée au large' },
          { n: 2, rond: [214, 48], cible: [191, 76], texte: 'toile serrée, nouée' },
        ],
      },

      // ───────────────────────── l'hiver : le gel ─────────────────────────
      gel: {
        titre: 'L’hiver : le gel',
        dessin: z => {
          const G = 112;
          return [
            ...neige(4, 342, G, 20),
            // la saumure sous la croûte
            h.rect(35, 84, 190, 21, h.a.hachure('eau', 'aucun')),
            h.ligne(89, 84, 150, 84, h.a.detail),
            // le bac, en coupe
            h.rect(28, 70, 7, 42, h.a.hachure('bois', 'aucun')),
            h.rect(225, 70, 7, 42, h.a.hachure('bois', 'aucun')),
            h.rect(35, 105, 190, 7, h.a.hachure('bois', 'aucun')),
            h.chemin([[35, 70], [35, 105], [225, 105], [225, 70]], h.a.arete),
            h.chemin([[28, 70], [28, G], [232, G], [232, 70]], h.a.contour),
            h.ligne(28, 70, 35, 70, h.a.arete), h.ligne(225, 70, 232, 70, h.a.arete),
            // la croûte qui reste, cassée au milieu
            h.chemin([[35, 79], [86, 79], [90, 83], [85, 88], [35, 88]], arBlanc, true),
            h.chemin([[225, 79], [152, 79], [155, 84], [149, 88], [225, 88]], arBlanc, true),
            h.ligne(46, 81.5, 50, 85.5, h.a.fin), h.ligne(64, 81, 67, 86, h.a.fin),
            h.ligne(172, 81.5, 176, 85.5, h.a.fin), h.ligne(203, 81, 206, 86, h.a.fin),
            // le morceau sorti
            h.fleche('M124,76 L124,52', h.a.arete),
            ...dalle(116, 38, -10, 58, 9),
            goutte(96, 50), goutte(99, 58, 0.85),
            h.fleche('M152,24 C196,6 250,14 276,62', h.a.arete),
            // à égoutter sur deux bûches
            ...buche(270, 100, 12), ...buche(322, 104, 8),
            ...dalle(295, 87.8, 9.1, 76, 8),
            ...dalle(290, 79.3, 9.1, 46, 7),
            goutte(333, 103), goutte(333, 110, 0.85), goutte(296, 97), goutte(296, 104, 0.85),
          ].join('\n');
        },
        renvois: z => [
          { n: 3, rond: [14, 60], cible: [31, 78], texte: 'bac large, peu profond' },
          { n: 4, rond: [40, 20], cible: [100, 38], texte: 'croûte cassée et sortie' },
          { n: 5, rond: [14, 96], cible: [60, 97], texte: 'saumure qui se concentre' },
          { n: 6, rond: [330, 48], cible: [312, 82], texte: 'glace égouttée, puis rincée' },
        ],
      },

      // ───────────────────────── l'été : la claie, en coupe ─────────────────────────
      coupe: {
        titre: 'L’été : le vent, en coupe',
        dessin: z => {
          graine = 11;
          return [
            ...sol(8, 223, SOL2, 8),
            // les poteaux du toit, au-delà de la coupe
            h.rect(33, 48, 6, SOL2 - 48, arBlanc), h.rect(193, 48, 6, SOL2 - 48, arBlanc),
            // les piquets du mur, au-delà
            h.rect(90, 62, 6, SOL2 - 62, arBlanc), h.rect(136, 62, 6, SOL2 - 62, arBlanc),
            // le toit à deux versants
            h.chemin([[22, 52], [116, 4], [210, 52], [210, 57], [116, 9], [22, 57]], h.a.hachure('bois', 'contour'), true),
            // le mur de branches coupé en travers
            h.rect(104, MUR_H, 24, MUR_B - MUR_H, h.a.blanc),
            ...touffes(104, 128, MUR_H, MUR_B),
            ...PERCHES.flatMap(y => [h.rect(96, y, 8, 8, h.a.hachure('bois')), h.rect(128, y, 8, 8, h.a.hachure('bois'))]),
            // la saumure versée au sommet
            ...chaudiere(117, 53.9, 120, 28, 20, 30),
            goutte(110.5, 69.5, 0.85),
            // le vent qui traverse
            h.fleche('M46,112 L86,112', h.a.cache), h.fleche('M146,112 L188,112', h.a.cache),
            // ce qui retombe dans l'auge
            goutte(108, 147, 0.8), goutte(117, 149.5, 0.8), goutte(125, 146.5, 0.8),
            // l'auge, en coupe
            h.path('M97,152 L135,152 C135,163 128,170 116,170 C104,170 97,163 97,152 Z', h.a.blanc),
            h.path('M97,152 L135,152 C135,163 128,170 116,170 C104,170 97,163 97,152 Z', h.a.hachure('bois', 'contour')),
            h.path('M102,152 L130,152 C130,159 125,164 116,164 C107,164 102,159 102,152 Z', arBlanc),
            h.path('M102.6,156 L129.4,156 C129,160.6 124,164 116,164 C108,164 103,160.6 102.6,156 Z', h.a.hachure('eau', 'aucun')),
            h.ligne(102.6, 156, 129.4, 156, h.a.detail),
          ].join('\n');
        },
        renvois: z => [
          { n: 7, rond: [58, 76], cible: [100, 42], texte: 'saumure versée au sommet' },
          { n: 8, rond: [168, 90], cible: [120, 98], texte: 'sapin ou épinette, en mur' },
          { n: 9, rond: [206, 16], cible: [170, 33], texte: 'toit ouvert sur poteaux' },
          { n: 10, rond: [182, 150], cible: [132, 159], texte: 'auge : reversée au sommet' },
        ],
      },

      // ───────────────────────── la claie, de face ─────────────────────────
      elevation: {
        titre: 'La claie, de face',
        dessin: z => {
          graine = 23;
          const br = [];
          for (let y = 77; y <= 137; y += 8) {
            let x = 53 + rnd() * 10;
            while (x < 286) {
              let len = 40 + rnd() * 30;
              if (x + len > 292) len = 292 - x;
              if (len < 16) break;
              const dir = rnd() < 0.5 ? 1 : -1;
              br.push(...branche(dir > 0 ? x : x + len, y + (rnd() - 0.5) * 2, len, dir));
              x += len * 0.62 + rnd() * 8;
            }
          }
          const croute = [];
          for (let i = 0; i < 34; i++) croute.push(h.cercle(f1(58 + rnd() * 60), f1(117 + rnd() * 16), f1(0.6 + rnd() * 0.5), h.a.plein));
          const planches = [];
          for (let x = 20; x < 340; x += 16) planches.push(h.ligne(x, 5, x, 51, h.a.fin));
          return [
            ...sol(2, 344, SOL2, 8),
            // le toit : le versant de devant, et sa rive
            h.rect(4, 4, 338, 48, arBlanc), ...planches,
            h.rect(4, 52, 338, 5, arBlanc),
            // les poteaux du toit
            h.rect(8, 57, 6, SOL2 - 57, arBlanc), h.rect(332, 57, 6, SOL2 - 57, arBlanc),
            // les branches empilées, et le dépôt sur celles du bas
            ...br, ...croute,
            // les perches qui pincent les branches, derrière les piquets qui les retiennent
            ...PERCHES.map(y => h.rect(40, y, 266, 8, arBlanc)),
            // ce qui retombe dans l'auge
            ...[70, 104, 139, 176, 212, 247, 280].map((x, i) => goutte(x, 147.5 + (i % 2) * 1.5, 0.8)),
            // l'auge, de face
            h.path('M44,154 L302,154 L302,161 Q302,170 292,170 L54,170 Q44,170 44,161 Z', coBlanc),
            h.ligne(44, 158, 302, 158, h.a.detail),
            h.path('M70,163 Q120,161 170,164 M190,165 Q240,162 286,164', h.a.fin),
            // les piquets, plantés de part et d'autre de l'auge, et les liures
            h.rect(46, 62, 6, SOL2 - 62, arBlanc), h.rect(294, 62, 6, SOL2 - 62, arBlanc),
            ...PERCHES.flatMap(y => [
              h.path(`M46,${y - 1} L52,${y + 9} M52,${y - 1} L46,${y + 9} M294,${y - 1} L300,${y + 9} M300,${y - 1} L294,${y + 9}`, h.a.detail),
            ]),
            // on reprend l'auge et on reverse au sommet
            h.fleche('M304,160 C318,142 318,86 300,68', h.a.cache),
          ].join('\n');
        },
        renvois: z => [
          { n: 11, rond: [29, 124], cible: [84, 126], texte: 'dépôt de sels de calcium' },
        ],
      },

      // ───────────────────────── le feu, pour finir ─────────────────────────
      feu: {
        titre: 'Le feu, pour finir',
        dessin: z => {
          const G = 128;
          return [
            ...sol(6, 340, G, 8),
            // le feu doux entre les pierres
            flamme(106, 118, 103, 5, -2), flamme(120, 118, 99, 6, 1.5), flamme(134, 118, 104, 5, 2),
            ...buche(103, 121, 7), ...buche(137, 121, 7),
            ...pierre(26, 112, 38, 16), ...pierre(30, 97, 32, 15),
            ...pierre(176, 112, 38, 16), ...pierre(178, 97, 32, 15),
            // la saumure qui réduit, les cristaux qui se forment
            h.chemin([[18.9, 82], [221.1, 82], [216, 96], [24, 96]], h.a.hachure('eau', 'aucun'), true),
            h.ligne(18.9, 82, 221.1, 82, h.a.detail),
            cristal(48, 80.5), cristal(76, 81), cristal(140, 80.5), cristal(166, 81),
            cristal(58, 92.5), cristal(98, 93), cristal(150, 92.5), cristal(188, 93),
            h.cercle(38, 86, 1.5, h.a.detail), h.cercle(120, 87, 1.5, h.a.detail), h.cercle(202, 86, 1.5, h.a.detail),
            // le récipient large et peu profond
            h.chemin([[16, 74], [24, 96], [216, 96], [224, 74]], h.a.contour),
            // l'écumoire et sa charge
            h.ligne(182, 62, 132, 28, h.a.arete), h.cercle(131, 27, 2, h.a.arete),
            h.path('M182,62 L210,62 Q196,72 182,62 Z', arBlanc),
            h.cercle(190, 65, 0.6, h.a.plein), h.cercle(196, 66.5, 0.6, h.a.plein), h.cercle(202, 65, 0.6, h.a.plein),
            cristal(187, 58.5), cristal(191, 58), cristal(195, 58.5), cristal(199, 58), cristal(203, 58.5), cristal(193, 54.5), cristal(197.5, 54.5),
            h.fleche('M214,54 C236,34 262,32 282,46', h.a.arete),
            // la toile tendue sur son chevalet, au-dessus d'un bol
            h.ligne(266, 56, 260, G, h.a.arete), h.ligne(330, 56, 336, G, h.a.arete),
            h.ligne(262, 56, 334, 56, h.a.arete),
            h.path('M268,57 Q297,100 326,57', h.a.arete),
            h.cercle(268, 57, 2, h.a.plein), h.cercle(326, 57, 2, h.a.plein),
            cristal(284, 68), cristal(289, 71), cristal(294, 73), cristal(299, 73), cristal(304, 71), cristal(309, 68),
            cristal(292, 67.5), cristal(297, 69), cristal(302, 67.5), cristal(297, 64.5),
            goutte(297, 86), goutte(297, 96, 0.85),
            h.path('M284,119 L310,119 Q308,127 297,127 Q286,127 284,119 Z', h.a.hachure('eau', 'aucun')),
            h.path('M281,115 Q283,128 297,128 Q311,128 313,115', h.a.arete),
          ].join('\n');
        },
        renvois: z => [
          { n: 12, rond: [16, 50], cible: [19, 76], texte: 'récipient large, à découvert' },
          { n: 13, rond: [244, 108], cible: [140, 110], texte: 'feu doux dès les cristaux' },
          { n: 14, rond: [242, 82], cible: [200, 64], texte: 'cueillis à l’écumoire' },
          { n: 15, rond: [70, 44], cible: [100, 88], texte: 'le fond amer se jette' },
          { n: 16, rond: [334, 28], cible: [320, 64], texte: 'égouttés sur une toile' },
        ],
      },

      // ───────────────────────── la saumure d'une salaison ─────────────────────────
      saumure: {
        titre: 'La saumure d’une salaison',
        dessin: z => {
          const G = 128;
          const bulles = [];
          graine = 5;
          for (let x = 68; x < 118; x += 4.2) {
            bulles.push(h.cercle(f1(x + rnd()), f1(55 + rnd() * 2), f1(1.8 + rnd() * 1.4), deBlanc));
            if (rnd() < 0.6) bulles.push(h.cercle(f1(x + 1.5 + rnd()), f1(52 + rnd() * 1.5), f1(1.3 + rnd()), deBlanc));
          }
          return [
            ...sol(20, 212, G, 8),
            // le feu qui fait bouillir
            flamme(101, 118, 103, 6, -2.5), flamme(115, 118, 101, 7, 2), flamme(129, 118, 104, 6, 3),
            ...buche(100, 121, 7), ...buche(130, 121, 7),
            ...pierre(50, 112, 36, 16), ...pierre(54, 100, 30, 12),
            ...pierre(144, 112, 36, 16), ...pierre(146, 100, 30, 12),
            // la saumure de fond de bac, et son écume
            h.path('M64.8,58 L165.2,58 L164,90 Q163,100 150,100 L80,100 Q67,100 66,90 Z', h.a.hachure('eau', 'aucun')),
            h.ligne(64.8, 58, 165.2, 58, h.a.detail),
            ...bulles,
            // le chaudron, en coupe
            h.path('M64,38 L66,90 Q67,100 80,100 L150,100 Q163,100 164,90 L166,38', h.a.contour),
            // l'écumoire qui emporte l'écume
            h.ligne(150, 42, 206, 10, h.a.arete), h.cercle(207, 9.5, 2, h.a.arete),
            h.path('M122,42 L150,42 Q136,52 122,42 Z', arBlanc),
            h.cercle(130, 45, 0.6, h.a.plein), h.cercle(136, 46.5, 0.6, h.a.plein), h.cercle(142, 45, 0.6, h.a.plein),
            h.cercle(128, 39.5, 2.2, deBlanc), h.cercle(133, 38.5, 2.6, deBlanc), h.cercle(139, 39, 2.3, deBlanc),
            h.cercle(144, 40, 1.8, deBlanc), h.cercle(136, 35, 1.8, deBlanc),
          ].join('\n');
        },
        renvois: z => [
          { n: 17, rond: [30, 30], cible: [84, 55], texte: 'écumer jusqu’au clair' },
        ],
      },
    },
  };
};
