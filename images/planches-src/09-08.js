// Planche 09-08 — le joint de cuir gras et son emporte-pièce de tuyau (chapitre 12,
// « Les joints, dans le cuir gras »).
module.exports = (h) => {
  const blanc = a => a.replace('fill="none"', 'fill="#ffffff"');
  const halo = 'fill="none" stroke="#ffffff" stroke-width="6" stroke-linecap="round"';
  const P = pts => pts.map(p => p.map(v => +v.toFixed(1)));

  // ─── Le tuyau limé : le biseau de droite va de (133,172) à (125,200) ───
  const u = [0.2747, -0.9615], nn = [0.9615, 0.2747];
  const B = (t, o = 0) => [133 + u[0] * t + nn[0] * o, 172 + u[1] * t + nn[1] * o];
  const lime = () => {
    const corps = P([B(-26, 0), B(100, 0), B(100, 11), B(-26, 11)]);
    const soie = P([B(100, 3.5), B(110, 4), B(110, 7), B(100, 7.5)]);
    const manche = P([B(110, -2.5), B(152, -2.5), B(152, 13.5), B(110, 13.5)]);
    const dents = [];
    for (let t = -22; t <= 94; t += 6) {
      const a = B(t, 0.8), b = B(t + 4, 10.2);
      dents.push(h.ligne(+a[0].toFixed(1), +a[1].toFixed(1), +b[0].toFixed(1), +b[1].toFixed(1), h.a.fin));
    }
    return [
      h.chemin(corps, blanc(h.a.arete), true), ...dents,
      h.chemin(soie, blanc(h.a.arete), true),
      h.chemin(manche, h.a.hachure('bois'), true),
    ];
  };

  // ─── La bille : cx 150, rx 78, dessus à y 150 (ry 24), pied à y 214 ───
  const bx = 150, brx = 78, bry = 24, by = 150, bp = 214;
  const avant = x => by + bry * Math.sqrt(Math.max(0, 1 - ((x - bx) / brx) ** 2));
  const ecorce = [80, 97, 116, 139, 166, 188, 207, 220].map((x, i) => {
    const y0 = avant(x) - by + by + 3, y1 = avant(x) - by + bp - 2;
    const w = i % 2 ? 2 : -2;
    return h.path(`M${x},${y0.toFixed(1)} Q${x + w},${((y0 + y1) / 2).toFixed(1)} ${x},${y1.toFixed(1)}`, h.a.detail);
  });
  const cernes = [12, 24, 38, 52, 64].map(r => h.ellipse(150, 148, r, +(r * 0.31).toFixed(1), h.a.fin));
  const cuir = 'M124,150 Q126,142 144,141 Q168,139 188,143 Q198,148 192,155 Q178,162 150,162 Q126,161 124,150 Z';

  return {
    ref: '09-08',
    titre: 'Le joint de cuir gras et l’emporte-pièce de tuyau',
    desc: 'Cinq vues. En coupe, un bout de tuyau dont l’extrémité est limée en biseau par l’extérieur, le tranchant restant au bord intérieur, la lime posée à plat sur le biseau et le tuyau qu’on tourne à mesure. La frappe : le tuyau tenu d’aplomb sur un morceau de cuir posé sur le bois de bout d’une bille debout, le marteau au-dessus ; en coupe, les pastilles déjà découpées empilées dans le tuyau. Vu de dessus, le cuir : le petit trou du milieu percé d’abord au petit tuyau, puis le grand cercle coupé au gros tuyau centré sur le trou. La rondelle pendue à un fil de fer dans une boîte de suif fondu, sur le poêle. En coupe, la rondelle graissée serrée entre la tête d’un bouchon de vidange et le bossage d’un réservoir d’eau. L’encadré danger rappelle qu’aucun joint improvisé ne va sur une ligne de gaz ou de carburant.',
    format: 'pleine',
    disposition: [['tuyau', 'frappe'], ['rondelle', 'suif', 'place']],
    largeurs: [[2, 3], [1, 1, 1.2]],
    vues: {
      tuyau: {
        titre: 'Le tuyau limé en biseau',
        dessin: z => [
          h.path('M57,26 Q61,20 65,24 L65,200 L57,172 Z', h.a.hachure('metal', 'aucun')),
          h.path('M125,26 Q129,20 133,24 L133,172 L125,200 Z', h.a.hachure('metal', 'aucun')),
          h.chemin([[57, 26], [57, 172], [65, 200]], h.a.contour),
          h.chemin([[133, 24], [133, 172], [125, 200]], h.a.contour),
          h.ligne(65, 24, 65, 200, h.a.arete), h.ligne(125, 26, 125, 200, h.a.arete),
          h.path('M57,26 Q61,20 65,24', h.a.detail), h.path('M125,26 Q129,20 133,24', h.a.detail),
          h.ligne(65, 200, 125, 200, h.a.arete),
          // on tourne le tuyau à mesure qu'on lime
          h.path('M46,50 Q95,76 144,50', halo),
          h.fleche('M46,50 Q95,76 144,50', h.a.arete),
          ...lime(),
        ].join('\n'),
        renvois: z => [
          { n: 1, rond: [22, 178], cible: [60, 186], texte: 'biseau limé par l’extérieur' },
          { n: 2, rond: [30, 226], cible: [66, 200], texte: 'tranchant au bord intérieur du tuyau' },
          { n: 3, rond: [212, 120], cible: [155, 116], texte: 'lime à plat, en tournant le tuyau' },
        ],
      },
      frappe: {
        titre: 'La frappe, sur du bois de bout',
        dessin: z => [
          // la bille debout
          h.path(`M${bx - brx},${by} L${bx - brx},${bp} A${brx},${bry} 0 0 0 ${bx + brx},${bp} L${bx + brx},${by}`, h.a.contour),
          h.ellipse(bx, by, brx, bry, h.a.contour),
          h.ellipse(bx, by, 73, 22.5, h.a.fin),
          ...ecorce,
          ...cernes,
          h.ligne(150, 148, 108, 136, h.a.detail),
          // le cuir posé à plat
          `<g transform="translate(0,3)">${h.path(cuir, blanc(h.a.arete))}</g>`,
          h.path(cuir, blanc(h.a.arete)),
          // le tuyau, en coupe, et les pastilles déjà coupées
          h.path('M141,64 L146,64 L146,152 L141,145 Z', h.a.hachure('metal', 'aucun')),
          h.path('M170,64 L175,64 L175,145 L170,152 Z', h.a.hachure('metal', 'aucun')),
          h.chemin([[141, 64], [141, 145], [146, 152]], h.a.contour),
          h.chemin([[175, 64], [175, 145], [170, 152]], h.a.contour),
          h.ligne(146, 64, 146, 152, h.a.arete), h.ligne(170, 64, 170, 152, h.a.arete),
          h.ligne(141, 64, 146, 64, h.a.arete), h.ligne(170, 64, 175, 64, h.a.arete),
          h.rect(146, 145.6, 24, 3.2, h.a.plein), h.rect(146, 141.4, 24, 3.2, h.a.plein), h.rect(146, 137.2, 24, 3.2, h.a.plein),
          // le marteau
          h.path('M184,24 L296,23 Q302,23 302,29 Q302,35 296,35 L184,34 Z', blanc(h.a.arete)),
          h.ligne(200, 28, 250, 27.6, h.a.fin), h.ligne(230, 31.4, 285, 31, h.a.fin),
          h.path('M144,12 L172,12 L172,44 L170,48 L146,48 L144,44 Z', blanc(h.a.contour)),
          h.ligne(172, 20, 184, 22, h.a.arete), h.ligne(172, 38, 184, 36, h.a.arete),
          h.fleche('M126,14 L126,54', h.a.arete),
        ].join('\n'),
        renvois: z => [
          { n: 4, rond: [292, 176], cible: [212, 150], texte: 'bille de bois debout, bois de bout dessus' },
          { n: 5, rond: [34, 132], cible: [125, 151], texte: 'cuir de botte, semelle ou chambre à air' },
          { n: 6, rond: [232, 98], cible: [176, 100], texte: 'tuyau d’aplomb, frappé au marteau' },
          { n: 7, rond: [76, 104], cible: [152, 142], texte: 'la pastille remonte dans le tuyau' },
        ],
      },
      rondelle: {
        titre: 'Le trou, puis le tour',
        dessin: z => [
          h.path('M22,62 Q44,46 72,46 Q112,44 138,52 Q158,66 156,100 Q156,148 148,172 Q138,200 112,206 Q76,210 50,202 Q22,190 18,156 Q12,110 22,62 Z', blanc(h.a.contour)),
          h.cercle(86, 128, 44, h.a.arete),
          h.cercle(86, 128, 11, h.a.plein),
        ].join('\n'),
        renvois: z => [
          { n: 8, rond: [150, 28], cible: [94, 120], texte: 'petit tuyau d’abord : le trou du milieu' },
          { n: 9, rond: [22, 226], cible: [55, 159], texte: 'puis le gros tuyau, centré sur le trou' },
        ],
      },
      suif: {
        titre: 'Au suif',
        dessin: z => [
          // le dessus du poêle, en coupe
          h.rect(8, 212, 157, 10, h.a.hachure('metal')),
          // la boîte et le suif fondu
          h.rect(47.2, 150, 79.6, 61, h.a.hachure('eau', 'aucun')),
          h.ligne(47, 150, 127, 150, h.a.arete),
          h.chemin([[46, 100], [46, 212], [128, 212], [128, 100]], h.a.contour),
          // la rondelle et son fil
          h.cercle(87, 180, 20, blanc(h.a.arete)),
          h.cercle(87, 180, 7, h.a.hachure('eau')),
          // le crochet porte la rondelle par le haut du trou ; le fil repose sur le bord de la boîte
          h.path('M90.5,173.5 Q90.5,177.5 87,177.5 Q83.5,177.5 83.5,173.5 L83.5,108 Q83.5,98.5 93,98.5 L126,98.5 Q130,98.5 130,102.5 L130,116', h.a.arete),
        ].join('\n'),
        renvois: z => [
          { n: 10, rond: [22, 172], cible: [56, 196], texte: 'suif fondu' },
          { n: 11, rond: [152, 168], cible: [106, 184], texte: 'rondelle pendue à un fil de fer' },
        ],
      },
      place: {
        titre: 'Sous un bouchon de vidange',
        dessin: z => [
          // l'eau du réservoir, jusque sur le bouchon
          h.rect(8, 30, 192, 58, h.a.hachure('eau', 'aucun')),
          h.rect(90, 88, 28, 24, h.a.hachure('eau', 'aucun')),
          h.ligne(8, 30, 200, 30, h.a.detail),
          // le fond et le bossage, en coupe
          h.path('M8,88 L90,88 L90,148 L66,148 L66,100 L8,100 Z', h.a.hachure('metal')),
          h.path('M200,88 L118,88 L118,148 L142,148 L142,100 L200,100 Z', h.a.hachure('metal')),
          // le bouchon, en vue
          h.path('M90,156 L90,115 L93,112 L115,112 L118,115 L118,156', blanc(h.a.arete)),
          ...[116, 120, 124, 128, 132, 136, 140, 144].map(y => h.ligne(90, y, 118, y, h.a.fin)),
          h.rect(78, 156, 52, 24, blanc(h.a.contour)),
          h.ligne(91, 156, 91, 180, h.a.detail), h.ligne(117, 156, 117, 180, h.a.detail),
          // la rondelle de cuir, serrée
          h.path('M80,148 L90,148 L90,156 L80,156 Q76,152 80,148 Z', h.a.plein),
          h.path('M118,148 L128,148 Q132,152 128,156 L118,156 Z', h.a.plein),
          h.fleche('M82,196 Q104,208 126,196', h.a.arete),
        ].join('\n'),
        renvois: z => [
          { n: 12, rond: [30, 194], cible: [79, 153], texte: 'cuir gras serré, que l’eau fait gonfler' },
        ],
      },
    },
    danger: 'Jamais de joint de cuir ou de caoutchouc improvisé sur une ligne de gaz ou de carburant : l’essence et le propane dessèchent le cuir. Le propane, plus lourd que l’air, coule au plancher, s’accumule dans le creux et attend l’étincelle. Une ligne de gaz qui fuit se ferme au robinet de la bouteille.',
  };
};
