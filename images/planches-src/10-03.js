// Planche 10-03. L'alambic de fortune.
// Le texte : ch. 10, variante d'urgence, « L'alambic de fortune » : une marmite, un couvercle bombé posé à l'envers,
// un bol sur un trépied au centre ; la vapeur monte, frappe le couvercle froid, glisse vers le creux et tombe dans le
// bol ; le joint, un boudin de guenille mouillée ou une pâte de farine et d'eau ; de la neige sur le couvercle,
// renouvelée ; un bouillon doux ; un bout de tuyau de cuivre enroulé dans un banc de neige, en guise de serpentin.
//
// Refaite le 18 octobre 2026 : la légende nommait des pièces au lieu des gestes, et le serpentin, une autre façon de
// condenser, se lisait comme la suite (règle 10). Il porte maintenant le titre « Autre façon : un serpentin » et son
// repère dit ce qu'il remplace (« au lieu de 1, 2 et 3 » : le bol, le couvercle à l'envers et son creux). La disposition et la largeur des vues ne bougent pas : la
// quatrième de couverture du tome 1 découpe la vue « serpentin » de ce fichier (build_couvertures_6.py).
//
// La charte : le dedans de la marmite, au-dessus de l'eau, vu par la coupe, en gris loin ; le bol reste blanc, c'est
// lui qu'on regarde. Le rouge : un seul point à contrôler, le point bas du couvercle à l'aplomb du bol (repère 3).
// Pas de geste : les flèches de vapeur restent noires. Aucune main : rien n'est tenu.
// Toute l'eau liquide en bleu, h.a.hachure('eau'), jusqu'aux gouttes qui tombent dans le bol (JP, 19 octobre 2026).
//
// Reprise le 19 octobre 2026 (second regard) : le motif de l'eau est calé pour qu'aucune vaguelette ne soit coupée.
// Une forme calée est tracée décalée de (−tx, −ty) dans un groupe déplacé de (tx, ty) : elle reste en place, seules les
// vaguelettes bougent. En coupe, l'eau de la marmite est peinte en quatre morceaux, de ligne d'axe à ligne d'axe des
// pattes et du poteau du trépied (les traits des pattes couvrent les joints), chacun calé : trois rangées, à 153,5,
// 164,5 et 175,5, aucune vaguelette sous une patte ni sous le poteau. L'eau du bol porte une vaguelette entière au
// centre ; les gouttes tombent dans un vide du motif. Dans le serpentin, la marmite et la goutte sont calées aussi.
module.exports = (h) => {
  const blancArete = h.a.arete.replace('fill="none"', 'fill="#ffffff"');
  // Une goutte en larme, la pointe en haut, en bleu cernée d'un trait fin.
  const goutte = (x, y, r = 1.7) => h.path(`M${x},${y - 1.8 * r} C${x + 0.3 * r},${y - 0.9 * r} ${x + r},${y - 0.2 * r} ${x + r},${y + 0.5 * r} A${r},${r} 0 0 1 ${x - r},${y + 0.5 * r} C${x - r},${y - 0.2 * r} ${x - 0.3 * r},${y - 0.9 * r} ${x},${y - 1.8 * r} Z`, h.a.hachure('eau', 'fin'));
  const halo = 'fill="none" stroke="#ffffff" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"';
  const cale = ([tx, ty], dessin) => `<g transform="translate(${tx} ${ty})">\n${dessin(-tx, -ty)}\n</g>`;
  const f1 = v => Math.round(v * 10) / 10;
  // En coupe : la ligne d'axe d'une patte du trépied, x à la hauteur y ; les quatre morceaux de l'eau de la marmite,
  // du mur à la patte de gauche, de la patte au poteau, du poteau à la patte de droite, de la patte au mur.
  const patte = (xa, ya, xb, yb) => y => xa + (xb - xa) * (y - ya) / (yb - ya);
  const PG = patte(158, 128, 146, 181), PD = patte(188, 128, 200, 181), Y0 = 148, Y1 = 180.8;
  const MORCEAUX = [
    { g: () => 96.2, d: PG, cal: [-1.5, 3.5] },
    { g: PG, d: () => 173, cal: [-10.5, -7.5] },
    { g: () => 173, d: PD, cal: [-19.5, 3.5] },
    { g: PD, d: () => 249.8, cal: [-28.5, -7.5] },
  ];
  const eauMarmite = () => MORCEAUX.map(({ g, d, cal }) => cale(cal, (dx, dy) =>
    h.chemin([[g(Y0), Y0], [d(Y0), Y0], [d(Y1), Y1], [g(Y1), Y1]].map(([x, y]) => [f1(x + dx), f1(y + dy)]), h.a.hachure('eau', 'aucun'), true))).join('\n');
  const CALE_BOL = [-31, 4.5], CALE_GOUTTES = [16, 5], CALE_SERPENTIN = [-4, -11];

  // Le feu entre deux pierres, sous une marmite dont le fond est à y = 182 ; sol à y = 218.
  const feu = (cx, s) => {
    const X = dx => cx + s * dx;
    const pierre = g => `M${X(g * 76)},218 Q${X(g * 80)},200 ${X(g * 72)},183 L${X(g * 50)},182 Q${X(g * 43)},198 ${X(g * 47)},218 Z`;
    const r = 8 * Math.max(s, 0.7);
    const w = 5 * Math.max(s, 0.7);
    const flammes = [[-12, 187], [0, 184], [12, 188]].map(([dx, top]) => {
      const x = X(dx), yb = 206;
      return h.path(`M${x - w},${yb} C${x - w - 1},${yb - 9} ${x - 2},${top + 6} ${x},${top} C${x + 2},${top + 7} ${x + w + 1},${yb - 8} ${x + w},${yb}`, h.a.arete);
    });
    const buche = (x, y, rr) => [h.cercle(x, y, rr, h.a.blanc), h.cercle(x, y, rr, h.a.hachure('bois'))];
    return [
      ...flammes,
      ...buche(X(-18), 218 - r, r), ...buche(X(18), 218 - r, r), ...buche(X(0), 219 - 2 * r, r * 0.9),
      h.path(pierre(-1), h.a.hachure('pierre')), h.path(pierre(1), h.a.hachure('pierre')),
    ];
  };
  const sol = (x1, x2) => [h.rect(x1, 218, x2 - x1, 10, h.a.hachure('terre', 'aucun')), h.ligne(x1, 218, x2, 218, h.a.arete)];

  return {
    ref: '10-03',
    titre: 'L’alambic de fortune',
    desc: 'Coupe d’une marmite sur le feu : couvercle bombé posé à l’envers, chargé de neige, joint de guenille au bord, bol sur trépied au centre, au-dessus de l’eau et à l’aplomb du point bas du couvercle ; la vapeur monte, suit le couvercle froid et tombe goutte à goutte dans le bol. À droite, la variante au tuyau de cuivre enroulé dans un banc de neige, qui dégoutte dans un bol.',
    format: 'demi',
    disposition: [['coupe', 'serpentin']],
    largeurs: [[3, 2]],
    vues: {
      coupe: {
        titre: 'En coupe',
        dessin: z => [
          ...sol(40, 306),
          ...feu(173, 1),
          // le dedans de la marmite, sous le couvercle et au-dessus de l'eau
          h.path('M95,62 L96,62 Q173,98 250,62 L251,62 L251,148 L95,148 Z', h.a.loin),
          // l'eau qui bout doucement
          eauMarmite(),
          h.ligne(95, 148, 251, 148, h.a.arete),
          h.cercle(108, 145, 2, h.a.detail), h.cercle(137, 146, 1.6, h.a.detail),
          h.cercle(212, 146, 1.6, h.a.detail), h.cercle(240, 145, 2, h.a.detail),
          // le trépied et le bol
          h.ligne(173, 128, 173, 181, h.a.detail),
          h.ligne(158, 128, 146, 181, h.a.arete), h.ligne(188, 128, 200, 181, h.a.arete),
          h.ligne(152, 128, 194, 128, h.a.arete),
          h.path('M146,106 Q148,126 162,126 L184,126 Q198,126 200,106 Z', h.a.blanc),
          cale(CALE_BOL, (dx, dy) => h.path(`M${148.5 + dx},${117 + dy} L${197.5 + dx},${117 + dy} Q${196.5 + dx},${126 + dy} ${184 + dx},${126 + dy} L${162 + dx},${126 + dy} Q${149.5 + dx},${126 + dy} ${148.5 + dx},${117 + dy} Z`, h.a.hachure('eau', 'aucun'))),
          h.ligne(148.5, 117, 197.5, 117, h.a.detail),
          h.path('M146,106 Q148,126 162,126 L184,126 Q198,126 200,106', h.a.arete),
          // la marmite et ses anses
          h.chemin([[95, 62], [95, 182], [251, 182], [251, 62]], h.a.contour),
          h.path('M95,86 L86,86 Q80,86 80,92 L80,94 Q80,100 86,100 L95,100', h.a.arete),
          h.path('M251,86 L260,86 Q266,86 266,92 L266,94 Q266,100 260,100 L251,100', h.a.arete),
          // la neige dans le creux du couvercle retourné
          h.path('M96,62 C118,50 138,44 158,46 C172,40 196,43 212,48 C232,52 244,56 250,62 Q173,98 96,62 Z', h.a.hachure('neige')),
          // le couvercle à l'envers, sa poignée en bas
          h.path('M90,62 L96,62 Q173,98 250,62 L256,62', h.a.contour),
          h.path('M166,80 L180,80 L177,90 Q173,92 169,90 Z', blancArete),
          // les gouttes
          cale(CALE_GOUTTES, (dx, dy) => [goutte(173 + dx, 96 + dy), goutte(173 + dx, 103.5 + dy)].join('\n')),
          // le joint de guenille
          h.cercle(90, 63, 5.5, h.a.hachure('paille')), h.cercle(256, 63, 5.5, h.a.hachure('paille')),
          // le trajet de la vapeur
          h.fleche('M118,142 C112,130 124,118 118,106 C112,94 114,80 126,77 L150,83', h.a.cache),
          h.fleche('M228,142 C234,130 222,118 228,106 C234,94 232,80 220,77 L196,83', h.a.cache),
          // le point bas, à l'aplomb du bol
          h.controle(173, 95, 13),
        ].join('\n'),
        renvois: z => [
          { n: 1, rond: [312, 126], cible: [198.5, 114], texte: 'poser le bol sur un trépied, hors de l’eau' },
          { n: 2, rond: [36, 88], cible: [112, 69], texte: 'poser le couvercle bombé à l’envers' },
          { n: 3, rond: [312, 100], cible: [176.5, 90], texte: 'centrer le point bas au-dessus du bol' },
          { n: 4, rond: [312, 70], cible: [261.5, 64], texte: 'faire le joint : guenille ou pâte de farine' },
          { n: 5, rond: [312, 40], cible: [236, 56], texte: 'charger de neige et la renouveler' },
          { n: 6, rond: [36, 146], cible: [106, 145], texte: 'garder un bouillon doux' },
        ],
      },
      serpentin: {
        titre: 'Autre façon : un serpentin',
        dessin: z => {
          const spire = [];
          for (let i = 0; i <= 140; i++) {
            const p = (7 * Math.PI * i) / 140;
            spire.push([158 - 16 * Math.cos(p), 146 + (12 * p) / (2 * Math.PI) + 5 * Math.sin(p)]);
          }
          const tuyau = 'M56,107 L56,86 Q56,74 68,74 L130,74 Q142,74 142,86 L142,146';
          const sortie = 'M174,188 L206,192 Q212,193 212,198';
          return [
            ...sol(4, 227),
            ...feu(56, 0.51),
            // la marmite, couvercle à l'endroit ; le dedans, au-dessus de l'eau
            h.path('M16,118 L17,118 Q56,96 95,118 L96,118 L96,152 L16,152 Z', h.a.loin),
            cale(CALE_SERPENTIN, (dx, dy) => h.rect(17 + dx, 152 + dy, 78, 29, h.a.hachure('eau', 'aucun'))),
            h.ligne(16, 152, 96, 152, h.a.arete),
            h.chemin([[16, 118], [16, 182], [96, 182], [96, 118]], h.a.contour),
            h.path('M16,128 L11,128 Q8,128 8,131 L8,133 Q8,136 11,136 L16,136', h.a.arete),
            h.path('M96,128 L101,128 Q104,128 104,131 L104,133 Q104,136 101,136 L96,136', h.a.arete),
            h.path('M13,118 L17,118 Q56,96 95,118 L99,118', h.a.contour),
            h.cercle(15, 119, 4, h.a.hachure('paille')), h.cercle(97, 119, 4, h.a.hachure('paille')),
            // le banc de neige
            h.path('M110,218 C112,168 132,124 156,122 C180,120 191,160 191,218 Z', h.a.hachure('neige')),
            // le tuyau de cuivre et ses spires
            h.path(tuyau, h.a.contour),
            h.chemin(spire, halo), h.chemin(spire, h.a.contour),
            h.path(sortie, halo), h.path(sortie, h.a.contour),
            h.ellipse(56, 106, 5, 2.5, h.a.hachure('paille')),
            // la goutte et le bol
            cale(CALE_SERPENTIN, (dx, dy) => goutte(212 + dx, 203 + dy)),
            h.path('M200,207 Q201,218 207,218 L217,218 Q223,218 224,207', h.a.arete),
          ].join('\n');
        },
        renvois: z => [
          { n: 7, rond: [100, 40], cible: [99, 72.5], texte: 'au lieu de 1, 2 et 3 : un tuyau de cuivre' },
          { n: 8, rond: [206, 104], cible: [175, 151], texte: 'l’enrouler dans un banc de neige' },
        ],
      },
    },
  };
};
