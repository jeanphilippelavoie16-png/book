// Planche 58-09 — le montage en gorge (ch. 54, section 9-C, point 13).
// Rien de chiffré dans le chapitre sur cette pièce : pas de cote. L'échelle vient du poisson.

module.exports = (h) => {
  const plein = (d, t = h.a.contour) => h.path(d, h.a.blanc) + '\n' + h.path(d, t);
  const decale = (dy, s) => `<g transform="translate(0 ${dy})">\n${s}\n</g>`;

  // Une truite entière, vue de côté, la gorge ouverte en écorché : même cadrage dans les deux vues.
  const GOSIER = 'M 562 96 C 520 92 420 86 310 86 C 280 86 280 116 310 116 C 420 116 520 110 556 108';
  const truite = () => [
    h.path('M 562 96 C 536 62 470 44 390 42 C 300 40 190 56 104 84 L 62 52 Q 84 100 62 148 L 104 114 C 190 140 300 162 390 160 C 470 158 530 134 556 108', h.a.contour),
    h.path('M 352 42 C 342 30 334 20 326 16 L 296 22 L 290 46', h.a.arete),   // dorsale
    h.path('M 164 66 Q 152 52 142 72', h.a.arete),                             // adipeuse
    h.path('M 200 139 L 188 160 L 168 152 L 172 132', h.a.arete),              // anale
    h.path('M 300 156 L 286 174 L 272 152', h.a.arete),                        // pelvienne
    h.path('M 476 54 C 450 86 450 120 476 148', h.a.arete),                    // opercule
    h.cercle(512, 80, 8, h.a.arete),
    h.cercle(513, 80, 3.5, h.a.plein),
    h.path(GOSIER + ' Z', h.a.blanc),
    h.path(GOSIER, h.a.arete),
    // l'appât, avalé tête la première
    h.path('M 330 100 C 334.8 90.4 349.2 88 366 88 C 408 89.2 444 94 462 96.4 L 479 93 L 474 100 L 479 107 L 462 103.6 C 444 106 408 110.8 366 112 C 349.2 112 334.8 109.6 330 100 Z', h.a.detail),
    h.path('M 354 90 Q 359 100 354 110', h.a.detail),
    h.cercle(340, 98, 2, h.a.detail),
  ].join('\n');

  return {
    ref: '58-09',
    titre: 'Le montage en gorge',
    desc: 'Un éclat d’os aiguisé aux deux bouts, la ligne nouée en son milieu, couché dans l’axe d’un petit poisson servant d’appât. La truite l’avale en long ; à la traction, la pièce pivote en travers de la gorge et ses deux pointes se plantent.',
    format: 'pleine',
    disposition: [['piece', 'appat'], ['avale'], ['tire']],
    hauteurs: [2, 3, 3],
    largeurs: [[2, 3], [1], [1]],
    vues: {
      piece: {
        titre: 'La pièce',
        dessin: z => decale(10, [
          plein('M 22 60 C 60 50 90 49 115 50 C 145 49 175 52 209 60 C 175 68 145 71 115 70 C 90 71 60 69 22 60 Z'),
          h.path('M 48 54 Q 45 60 48 66', h.a.detail),      // début de l'aiguisage, à gauche
          h.path('M 183 55 Q 186 60 183 65', h.a.detail),   // et à droite
          h.path('M 62 57 L 96 55.5', h.a.detail),          // grain de l'os
          h.path('M 132 64.5 L 166 63.5', h.a.detail),
          h.ligne(110, 48, 113, 72, h.a.arete),             // tours de ligne
          h.ligne(114, 48, 117, 72, h.a.arete),
          h.ligne(118, 48, 121, 72, h.a.arete),
          h.cercle(116, 46, 3, h.a.plein),                  // nœud
          h.path('M 116 44 C 122 24 170 18 226 14', h.a.arete),
        ].join('\n')),
        renvois: z => [
          { n: 1, rond: [30, 32], cible: [34, 67], texte: 'éclat d’os aiguisé aux deux bouts' },
          { n: 2, rond: [152, 104], cible: [120, 82], texte: 'ligne nouée en son milieu' },
        ],
      },
      appat: {
        titre: 'Dans l’appât',
        dessin: z => decale(12, [
          h.path('M 40 55 C 48 39 72 35 100 35 C 170 37 230 45 260 49 L 292 41 L 282 55 L 292 69 L 260 61 C 230 65 170 73 100 75 C 72 75 48 71 40 55 Z', h.a.contour),
          h.path('M 72 39 Q 80 55 72 71', h.a.detail),
          h.path('M 130 36 L 142 26 L 162 38', h.a.arete),
          h.cercle(56, 51, 3.5, h.a.arete),
          h.cercle(56.5, 51, 1.5, h.a.plein),
          // la pièce, cachée dans l'axe, et la ligne qui la suit jusqu'à la queue
          h.path('M 96 55 Q 160 41 224 55 Q 160 69 96 55 Z', h.a.cache.replace('stroke-width="0.7"', 'stroke-width="1.4"')),
          h.cercle(160, 55, 2.5, h.a.plein),
          h.path('M 160 55 L 282 55', h.a.cache),
          h.path('M 282 55 C 305 55 322 50 342 40', h.a.arete),
        ].join('\n')),
        renvois: z => [
          { n: 3, rond: [200, 106], cible: [190, 72.5], texte: 'couché dans l’appât, dans l’axe' },
        ],
      },
      avale: {
        titre: 'Avalé',
        dessin: z => [
          truite(),
          plein('M 355 100 Q 400 92 445 100 Q 400 108 355 100 Z'),
          h.cercle(400, 100, 2.6, h.a.plein),
          h.path('M 400 100 L 474 100 C 510 100 540 102 559 102 C 575 103 588 112 598 126', h.a.arete),
        ].join('\n'),
        renvois: z => [
          { n: 4, rond: [470, 16], cible: [430, 97.8], texte: 'le poisson l’avale en long' },
        ],
      },
      tire: {
        titre: 'Tiré',
        dessin: z => [
          truite(),
          h.path('M 400 100 L 474 100 C 510 100 540 102 559 102 L 598 102', h.a.arete),
          plein('M 390 56 Q 407.8 98.2 410 144 Q 392.2 101.8 390 56 Z'),
          h.cercle(400, 100, 2.6, h.a.plein),
          h.fleche('M 566 118 L 596 118'),
        ].join('\n'),
        renvois: z => [
          { n: 5, rond: [372, 14], cible: [390.5, 58], texte: 'la traction met la pièce en travers' },
          { n: 6, rond: [376, 186], cible: [409.5, 142], texte: 'plantée, elle ne ressort plus' },
        ],
      },
    },
  };
};
