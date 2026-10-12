// Planche 10-03 — l'alambic de fortune (chapitre 13, « L'alambic de fortune »).
module.exports = (h) => {
  const blancArete = h.a.arete.replace('fill="none"', 'fill="#ffffff"');
  const halo = 'fill="none" stroke="#ffffff" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"';

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
          // l'eau qui bout doucement
          h.rect(96.2, 148, 153.6, 32.8, h.a.hachure('eau', 'aucun')),
          h.ligne(95, 148, 251, 148, h.a.arete),
          h.cercle(108, 145, 2, h.a.detail), h.cercle(137, 146, 1.6, h.a.detail),
          h.cercle(212, 146, 1.6, h.a.detail), h.cercle(240, 145, 2, h.a.detail),
          // le trépied et le bol
          h.ligne(173, 128, 173, 181, h.a.detail),
          h.ligne(158, 128, 146, 181, h.a.arete), h.ligne(188, 128, 200, 181, h.a.arete),
          h.ligne(152, 128, 194, 128, h.a.arete),
          h.path('M148.5,117 L197.5,117 Q196.5,126 184,126 L162,126 Q149.5,126 148.5,117 Z', h.a.hachure('eau', 'aucun')),
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
          h.ellipse(173, 95, 1.5, 2.3, h.a.plein), h.ellipse(173, 102, 1.4, 2.2, h.a.plein),
          // le joint de guenille
          h.cercle(90, 63, 5.5, h.a.hachure('paille')), h.cercle(256, 63, 5.5, h.a.hachure('paille')),
          // le trajet de la vapeur
          h.fleche('M118,142 C112,130 124,118 118,106 C112,94 114,80 126,77 L150,83', h.a.cache),
          h.fleche('M228,142 C234,130 222,118 228,106 C234,94 232,80 220,77 L196,83', h.a.cache),
        ].join('\n'),
        renvois: z => [
          { n: 1, rond: [312, 126], cible: [198.5, 114], texte: 'bol sur trépied, au-dessus de l’eau' },
          { n: 2, rond: [36, 88], cible: [112, 69], texte: 'couvercle bombé posé à l’envers' },
          { n: 3, rond: [312, 100], cible: [176.5, 90], texte: 'point bas à l’aplomb du bol' },
          { n: 4, rond: [312, 70], cible: [261.5, 64], texte: 'joint de guenille ou pâte de farine' },
          { n: 5, rond: [312, 40], cible: [236, 56], texte: 'neige sur le couvercle, renouvelée' },
          { n: 6, rond: [36, 146], cible: [106, 145], texte: 'bouillon doux, jamais gros bouillon' },
        ],
      },
      serpentin: {
        titre: 'Avec un serpentin',
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
            // la marmite, couvercle à l'endroit
            h.rect(17, 152, 78, 29, h.a.hachure('eau', 'aucun')),
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
            h.ellipse(212, 202.5, 1.5, 2.3, h.a.plein),
            h.path('M200,207 Q201,218 207,218 L217,218 Q223,218 224,207', h.a.arete),
          ].join('\n');
        },
        renvois: z => [
          { n: 7, rond: [206, 104], cible: [175, 151], texte: 'tuyau de cuivre enroulé dans la neige' },
        ],
      },
    },
  };
};
