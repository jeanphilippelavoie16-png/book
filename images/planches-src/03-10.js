// Planche 03-10 — vidanger la maison dans le bon ordre (chapitre 4, étapes 22-23 et
// « La plomberie » de la variante d'urgence ; « Le chauffe-eau est une réserve d'eau »).
//
// La charte : la face de droite du chauffe-eau à l'ombre ; le réservoir vide de la toilette,
// vu par la coupe, en gris loin. Le rouge : deux points à contrôler, ceux qui cassent sur un
// raté — le disjoncteur du chauffe-eau (un élément à sec se détruit) et le robinet chaud de
// l'étage (sans lui, le réservoir ne se vide pas). La flèche d'air reste noire.
module.exports = (h) => {
  const blancArete = h.a.arete.replace('fill="none"', 'fill="#ffffff"');
  const blancContour = h.a.contour.replace('fill="none"', 'fill="#ffffff"');
  const P = pts => pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' L');

  // ─── Outils communs ────────────────────────────────────────────────────────────────
  // Échantillonne une suite de Bézier cubiques [[p0, p1, p2, p3], …] en polyligne.
  const bez = (segs, n = 24) => {
    const out = [];
    segs.forEach(([a, b, c, d], i) => {
      for (let k = i ? 1 : 0; k <= n; k++) {
        const t = k / n, u = 1 - t;
        out.push([
          u * u * u * a[0] + 3 * u * u * t * b[0] + 3 * u * t * t * c[0] + t * t * t * d[0],
          u * u * u * a[1] + 3 * u * u * t * b[1] + 3 * u * t * t * c[1] + t * t * t * d[1],
        ]);
      }
    });
    return out;
  };
  // Les deux parois d'un tuyau de largeur w autour d'une ligne médiane.
  const tube = (c, w) => {
    const g = [], d = [];
    c.forEach((p, i) => {
      const a = c[Math.max(0, i - 1)], b = c[Math.min(c.length - 1, i + 1)];
      const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1;
      const nx = -dy / L, ny = dx / L;
      g.push([p[0] + nx * w / 2, p[1] + ny * w / 2]);
      d.push([p[0] - nx * w / 2, p[1] - ny * w / 2]);
    });
    return [g, d];
  };
  // Garde la partie d'un polygone sous le niveau y = L (Sutherland-Hodgman, un seul bord).
  const sous = (poly, L) => {
    const out = [];
    for (let i = 0; i < poly.length; i++) {
      const A = poly[i], B = poly[(i + 1) % poly.length];
      const ia = A[1] >= L, ib = B[1] >= L;
      if (ia) out.push(A);
      if (ia !== ib) {
        const t = (L - A[1]) / (B[1] - A[1]);
        out.push([A[0] + t * (B[0] - A[0]), L]);
      }
    }
    return out;
  };

  // ─── Le siphon d'évier, commun aux trois petites vues ─────────────────────────────
  // Queue x 50-62, coude centré (72, 118), rayons 10 et 22, branche montante x 82-94,
  // bras vers le mur à y 88-100.
  const arc = (r, n = 30) => Array.from({ length: n + 1 }, (_, k) => {
    const t = Math.PI - (Math.PI * k) / n;
    return [72 + r * Math.cos(t), 118 + r * Math.sin(t)];
  });
  const exterieur = [[50, 50], ...arc(22), [94, 104]];
  const interieur = [[62, 50], ...arc(10), [82, 104]];
  const bras = 'M82,104 A16,16 0 0 1 98,88 L124,88 M94,104 A4,4 0 0 1 98,100 L124,100';
  const cavite = [...exterieur, ...[...interieur].reverse()];
  const liquide = L => {
    const demi = Math.sqrt(Math.max(0, 484 - (L - 118) ** 2));
    const surface = L <= 118
      ? [h.ligne(50, L, 62, L, h.a.detail), h.ligne(82, L, 94, L, h.a.detail)]
      : [h.ligne(72 - demi, L, 72 + demi, L, h.a.detail)];
    return [h.path(`M${P(sous(cavite, L))} Z`, h.a.hachure('eau', 'aucun')), ...surface].join('\n');
  };
  const siphon = (garde) => [
    // le mur où rentre le bras
    h.rect(124, 66, 9, 60, h.a.hachure('bois')),
    // le fond de l'évier, en coupe, et son ouverture
    h.path('M8,12 C8,38 14,50 30,50 L50,50 M62,50 L80,50 C96,50 102,38 102,12', h.a.contour),
    ...(garde || []),
    h.path(`M${P(exterieur)}`, h.a.contour),
    h.path(`M${P(interieur)}`, h.a.contour),
    h.path(bras, h.a.contour),
    // l'écrou coulissant sous la bonde
    h.rect(47, 56, 18, 6, blancArete),
  ].join('\n');

  // Le chiffon dans son sac, tassé dans une gorge de drain.
  const bouchon = (d, twist) => [
    h.path(d, 'fill="#ffffff" stroke="none"'),
    h.path(d, h.a.hachure('paille')),
    h.path(twist, h.a.arete),
  ].join('\n');

  const TY = -36;   // la toilette remonte dans sa vue

  // ─── La maison ─────────────────────────────────────────────────────────────────────
  const robinet = (x, y) => [
    h.rect(x - 4, y - 3, 8, 3, blancArete),
    h.path(`M${x},${y - 3} L${x},${y - 11} Q${x},${y - 17} ${x - 7},${y - 17} L${x - 16},${y - 17} L${x - 16},${y - 13}`, h.a.arete),
    h.ligne(x, y - 11, x + 6, y - 20, h.a.arete),
    h.cercle(x + 6, y - 20, 1.6, h.a.plein),
  ].join('\n');
  // La tasse penchée : les points du chemin tournés de -50° autour de (80, 20).
  const tasse = d => d.replace(/(-?[\d.]+),(-?[\d.]+)/g, (_, x, y) => {
    const a = -50 * Math.PI / 180, dx = +x - 80, dy = +y - 20;
    return `${(80 + dx * Math.cos(a) - dy * Math.sin(a)).toFixed(1)},${(20 + dx * Math.sin(a) + dy * Math.cos(a)).toFixed(1)}`;
  });
  const goutte = (x, y) => h.ellipse(x, y, 1.4, 2.1, h.a.plein);
  const chaudiere = x0 => [
    h.path(`M${x0},348 L${x0 + 30},348 L${x0 + 27},388 L${x0 + 3},388 Z`, h.a.hachure('eau')),
    h.path(`M${x0 + 2},346 Q${x0 + 15},330 ${x0 + 28},346`, h.a.detail),
    h.rect(x0 - 2, 344, 34, 4, blancArete),
  ].join('\n');

  return {
    ref: '03-10',
    titre: 'Vidanger la maison dans le bon ordre',
    desc: 'Coupe d’une maison à étage avec sous-sol : l’entrée d’eau fermée par une vanne à levier mis en travers du tuyau ; le chauffe-eau électrique mis hors tension au panneau ; le robinet d’eau chaude de l’étage ouvert, par où l’air entre ; deux chaudières couvertes remplies d’eau à boire au robinet de vidange avant tout ; puis le boyau du robinet de vidange conduit au drain de plancher ; le robinet de la cuisine ouvert. En bas, la toilette en coupe, réservoir vide et fond épongé, cuvette épongée puis bouchée d’un chiffon dans un sac ; puis le siphon d’évier vidé à la poire, bouché au chiffon ensaché, ou refait avec une tasse d’huile de cuisson.',
    format: 'pleine',
    disposition: [['maison'], ['toilette', 'vider', 'boucher', 'huile']],
    hauteurs: [3.35, 1.4],
    vues: {
      maison: {
        titre: 'La maison en coupe',
        dessin: z => [
          // le sol dehors, les fondations, la dalle et le drain de plancher
          h.rect(0, 276, 100, 128, h.a.hachure('terre', 'aucun')),
          h.rect(540, 276, 60, 128, h.a.hachure('terre', 'aucun')),
          h.ligne(0, 276, 100, 276, h.a.arete), h.ligne(540, 276, 600, 276, h.a.arete),
          h.rect(100, 262, 12, 142, h.a.hachure('pierre')),
          h.rect(528, 262, 12, 142, h.a.hachure('pierre')),
          h.rect(112, 388, 312, 10, h.a.hachure('gravier')),
          h.rect(436, 388, 92, 10, h.a.hachure('gravier')),
          h.path('M424,388 L424,402 L436,402 L436,388', h.a.arete),
          h.ligne(424, 390, 436, 390, h.a.detail), h.ligne(424, 393, 436, 393, h.a.detail),
          // les murs, les planchers, le toit
          h.rect(100, 64, 12, 198, h.a.hachure('isolant')),
          h.rect(528, 64, 12, 198, h.a.hachure('isolant')),
          h.rect(112, 262, 416, 10, h.a.hachure('bois')),
          h.rect(112, 150, 416, 10, h.a.hachure('bois')),
          h.rect(100, 58, 440, 6, h.a.hachure('bois')),
          h.chemin([[84, 64], [320, 8], [556, 64]], h.a.arete),
          h.chemin([[96, 58], [320, 16], [544, 58]], h.a.detail),

          // la cuisine : comptoir, évier et sa descente de drain
          h.ligne(436, 228, 436, 262, h.a.detail),
          h.path('M478,248 L478,254 A5,5 0 0 0 488,254 L488,262', h.a.arete),
          // la salle de bain : lavabo, toilette vue de face
          h.path('M490,122 L490,138 A5,5 0 0 0 500,138 L500,150', h.a.arete),
          h.ligne(466, 122, 466, 150, h.a.detail),

          // l'eau froide : de la rue à la vanne, au plafond du sous-sol, aux étages
          h.chemin([[4, 356], [150, 356], [150, 282], [512, 282], [512, 116]], h.a.contour),
          h.chemin([[306, 282], [306, 300]], h.a.contour),
          h.chemin([[512, 155], [444, 155], [444, 124], [436, 124]], h.a.arete),
          // l'eau chaude : du chauffe-eau à la cuisine et à l'étage
          h.chemin([[338, 300], [338, 290], [520, 290], [520, 116]], h.a.contour),
          // la vanne d'entrée, haut sur la montée pour ne rien laisser piégé au-dessus ;
          // levier en travers : fermée
          h.rect(145, 294, 10, 14, blancContour),
          h.ligne(145, 301, 130, 301, h.a.contour),

          // le panneau et le fil du chauffe-eau
          h.chemin([[185, 292], [185, 276], [322, 276], [322, 296]], h.a.detail),
          h.rect(172, 292, 26, 44, blancArete),
          ...[0, 1, 2, 3, 4].map(i => h.rect(176, 297 + 7 * i, 8, 4, h.a.detail)),
          ...[0, 1, 2, 3].map(i => h.rect(186, 297 + 7 * i, 8, 4, h.a.detail)),
          h.rect(186, 325, 8, 4, h.a.plein),

          // le chauffe-eau
          h.path('M296,306 Q322,294 348,306 L348,362 L296,362 Z', h.a.blanc),
          h.path('M336,301.7 Q342,303.2 348,306 L348,362 L336,362 Z', h.a.ombre),
          h.path('M296,306 Q322,294 348,306 L348,362 L296,362 Z', h.a.contour),
          h.rect(316, 294, 12, 6, blancArete),
          h.rect(300, 362, 6, 6, h.a.arete), h.rect(338, 362, 6, 6, h.a.arete),
          h.rect(292, 368, 58, 20, h.a.hachure('pierre')),
          // le robinet de vidange qui coule dans la chaudière ouverte
          h.rect(348, 350, 9, 8, blancArete),
          h.ligne(352, 350, 352, 344, h.a.detail),
          h.rect(353, 358, 4, 4, blancArete),
          h.ligne(355, 362, 355, 372, h.a.contour),
          h.path('M354,370 L380,370 L378,388 L356,388 Z', h.a.hachure('eau', 'aucun')),
          h.path('M352,364 L382,364 L379,388 L355,388 Z', h.a.arete),
          // le boyau, posé pour l'étape d'après, son bout libre au plancher
          h.path('M392,385 L414,385 C422,385 428,388 430,398', h.a.contour),
          h.rect(388, 382, 5, 6, blancArete),
          // l'autre chaudière, pleine et couverte
          chaudiere(258),

          // la cuisine, devant les colonnes
          h.rect(430, 222, 98, 6, blancArete),
          h.path('M452,228 L452,240 Q452,248 460,248 L496,248 Q504,248 504,240 L504,228', blancArete),
          robinet(500, 222),
          goutte(484, 210), goutte(484, 217),
          // le lavabo
          h.rect(458, 116, 70, 6, blancArete),
          h.path('M470,122 L470,128 Q470,134 478,134 L502,134 Q510,134 510,128 L510,122', blancArete),
          robinet(512, 116),
          h.fleche('M496,113 L496,106', h.a.arete),
          // la toilette de l'étage, vue de face
          h.rect(402, 111, 36, 3, blancArete),
          h.rect(404, 114, 32, 16, blancArete),
          h.path('M400,132 L440,132 L440,136 Q438,146 430,146 L428,150 L412,150 L410,146 Q402,146 400,136 Z', blancArete),
          // les deux points qui cassent sur un raté
          h.controle(190, 327, 8),
          h.controle(505, 105, 13),
        ].join('\n'),
        renvois: z => [
          { n: 1, rond: [126, 334], cible: [147, 306], texte: 'entrée d’eau fermée' },
          { n: 2, rond: [224, 306], cible: [198, 314], texte: 'chauffe-eau hors tension' },
          { n: 3, rond: [452, 84], cible: [503, 102], texte: 'robinet chaud ouvert à l’étage' },
          { n: 4, rond: [392, 330], cible: [368, 366], texte: 'eau à boire tirée d’abord' },
          { n: 5, rond: [446, 352], cible: [414, 385], texte: 'puis le boyau au drain' },
          { n: 6, rond: [452, 196], cible: [484, 208], texte: 'tous les robinets ouverts' },
        ],
      },

      toilette: {
        titre: 'La toilette',
        dessin: z => {
          const voie = bez([
            [[56, 142], [62, 162], [74, 164], [78, 148]],
            [[78, 148], [82, 132], [92, 132], [92, 148]],
            [[92, 148], [92, 164], [86, 174], [86, 186]],
          ]);
          const [g, d] = tube(voie, 8);
          const plug = 'M43,137 C43,130 52,129 56,133 C61,137 63,144 61,149 C58,153 51,151 48,147 C45,144 43,141 43,137 Z';
          return `<g transform="translate(0,${TY})">` + [
            h.rect(0, 186, 133, 8, h.a.hachure('bois')),
            // la porcelaine, avec le creux de la cuvette
            h.path('M8,112 C8,134 20,148 38,152 C41,160 41,172 34,186 L100,186 C102,166 106,150 110,112 L70,112 C64,138 56,146 46,146 C30,146 16,134 16,112 Z', h.a.hachure('metal', 'contour')),
            // la voie du siphon, taillée dans la porcelaine
            h.path(`M${P(g)} L${P([...d].reverse())} Z`, 'fill="#ffffff" stroke="none"'),
            h.path(`M${P(g)}`, h.a.arete), h.path(`M${P(d)}`, h.a.arete),
            // le siège
            h.path('M6,112 L6,108 Q6,105 10,105 L76,105 L76,112', blancArete),
            // le réservoir, vide
            h.rect(76, 50, 38, 62, blancContour),
            h.rect(74, 46, 42, 4, blancArete),
            h.rect(79, 53, 32, 56, h.a.loin),
            h.rect(79, 53, 32, 56, h.a.detail),
            h.path('M88,109 L88,68 M92,109 L92,68', h.a.detail),
            h.path('M84,109 Q90,103 96,109', h.a.detail),
            // l'éponge au fond du réservoir
            h.rect(99, 100, 11, 8, h.a.hachure('gravier')),
            // le chiffon ensaché dans le fond de la cuvette
            bouchon(plug, 'M47,133 L43,126 L51,128 Z'),
          ].join('\n') + '</g>';
        },
        renvois: z => [
          { n: 7, rond: [40, 62 + TY], cible: [100, 104 + TY], texte: 'réservoir vidé, fond épongé' },
          { n: 8, rond: [16, 172 + TY], cible: [52, 142 + TY], texte: 'cuvette épongée, puis bouchée' },
        ],
      },

      vider: {
        titre: 'Vider le siphon',
        dessin: z => [
          siphon([liquide(130)]),
          // la poire : bulbe au-dessus de l'évier, tube jusqu'au fond du coude
          h.path('M54,24 L54,133 Q56,136 58,133 L58,24', blancArete),
          h.ellipse(56, 13, 9, 12, blancArete),
          h.rect(52, 22, 8, 4, blancArete),
        ].join('\n'),
        renvois: z => [
          { n: 9, rond: [26, 92], cible: [54, 100], texte: 'siphon vidé à la poire' },
        ],
      },

      boucher: {
        titre: 'Puis le boucher',
        dessin: z => [
          siphon(),
          bouchon('M50,82 L50,50 C42,48 40,38 50,36 C54,30 60,30 63,36 C72,38 70,48 62,50 L62,82 C58,86 54,86 50,82 Z',
            'M54,32 L50,24 L58,27 Z'),
        ].join('\n'),
        renvois: z => [
          { n: 10, rond: [24, 76], cible: [50, 66], texte: 'chiffon et sac, bien tassés' },
        ],
      },

      huile: {
        titre: 'Ou à l’huile',
        dessin: z => [
          siphon([liquide(101)]),
          // la tasse penchée qui verse dans la bonde
          h.path(tasse('M70,10 L92,10 L90,30 Q81,34 72,30 Z'), blancArete),
          h.path(tasse('M91,15 Q99,16 98,22 Q97,27 90,26'), h.a.arete),
          goutte(60, 34), goutte(58, 42),
        ].join('\n'),
        renvois: z => [
          { n: 11, rond: [24, 96], cible: [56, 112], texte: 'ou une tasse d’huile de cuisson' },
        ],
      },
    },
  };
};
