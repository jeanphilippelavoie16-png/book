// Planche 04-01a — La pièce d'abri chargée (chapitre 6, variante « Sans sous-sol et sans caveau »)
// Cotes : 200 mm (mur de bois rond, étape 2) · 2/3 (sacs remplis aux deux tiers, variante).
module.exports = (h) => {
  const A = h.a;
  const W = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const rr = (x, y, l, ht, r, at) => h.rect(x, y, l, ht, `${at} rx="${r}"`);

  // ── En coupe : le chalet de plain-pied, la pièce chargée ──────────────────────────
  const coupe = z => {
    const o = [];
    const yg = 300, yf = 278;
    // sol
    o.push(h.rect(30, yg, 540, 18, A.hachure('terre', 'aucun')));
    o.push(h.ligne(30, yg, 570, yg, A.arete));
    // solage et plancher
    for (const x of [179, 410]) o.push(h.rect(x, yf, 11, 40, A.blanc), h.rect(x, yf, 11, 40, A.hachure('pierre')));
    o.push(h.rect(190, yf, 220, 10, A.blanc), h.rect(190, yf, 220, 10, A.hachure('bois')));
    // plafond et toit
    o.push(h.rect(190, 141, 220, 5, A.hachure('bois')));
    o.push(h.chemin([[151, 158], [300, 41], [449, 158], [449, 168], [300, 51], [151, 168]], A.hachure('bois', 'contour'), true));
    // murs de bois rond : 12 billes de 200 mm
    const bille = (x, k) => {
      const cy = yf - 5.5 - 11 * k;
      return h.cercle(x, cy, 5.5, W(A.arete)) + h.cercle(x, cy, 1.8, A.fin);
    };
    for (let k = 0; k < 12; k++) {
      if (k < 5 || k > 9) o.push(bille(184.5, k));
      o.push(bille(415.5, k));
    }
    // fenêtre du mur gauche
    o.push(h.rect(179, 168, 11, 4, W(A.arete)), h.rect(172, 219, 18, 4, W(A.arete)));
    o.push(h.ligne(183.5, 172, 183.5, 219, A.detail), h.ligne(185.5, 172, 185.5, 219, A.detail));

    // banc de neige contre le solage, jusqu'au bas de la fenêtre
    o.push(h.path('M179 300 L179 223 C170 221, 156 221, 146 225 L55 300 Z', A.hachure('neige', 'arete')));
    const xb = y => 146 - (y - 225) * (91 / 75);
    for (const y of [243, 262, 281]) o.push(h.ligne(xb(y) + 1, y, 178, y, A.detail));

    // bois cordé contre le mur de droite, jusque sous le débord du toit
    const sousToit = x => (x < 449 ? 146 + 0.785 * (x - 421) + 3 : 171);
    for (let j = 0; j < 20; j++) {
      const cy = yg - 4 - 7 * j;
      const n = j % 2 ? 5 : 6;
      for (let i = 0; i < n; i++) {
        const cx = 425 + (j % 2 ? 4 : 0) + 8 * i;
        const r = 3.5 + ((i * 7 + j * 13) % 5) * 0.15;
        if (cy - r >= sousToit(cx + r)) o.push(h.cercle(cx, cy, r, W(A.detail)));
      }
    }

    // sous la fenêtre : bidons d'eau, sacs de farine, livres
    const bidon = (x, y) => [
      h.rect(x + 13, y - 4, 4, 4, W(A.arete)),
      rr(x, y, 19, 25, 2, W(A.arete)),
      h.path(`M${x + 4} ${y + 5} L${x + 15} ${y + 20} M${x + 15} ${y + 5} L${x + 4} ${y + 20}`, A.detail),
    ].join('\n');
    const sac = (x, y, l, ht) =>
      rr(x, y, l, ht, 6, W(A.arete)) + h.path(`M${x + 5} ${y + 6} Q${x + l / 2} ${y + 3} ${x + l - 5} ${y + 6}`, A.detail);
    o.push(bidon(192, 253), bidon(192, 228));
    o.push(sac(213, 261, 25, 17), sac(213, 244, 25, 17), sac(213, 227, 25, 17));
    for (let i = 0; i < 7; i++) o.push(h.rect(240 + (i % 2), yf - 5 * (i + 1), 18 - (i % 3), 5, W(A.detail)));

    // la table, les deux portes, la charge
    o.push(h.rect(276, 237, 106, 4, W(A.arete)), h.rect(279, 241, 4, 37, W(A.arete)), h.rect(375, 241, 4, 37, W(A.arete)));
    o.push(h.rect(268, 232, 122, 5, A.blanc), h.rect(268, 232, 122, 5, A.hachure('bois')));
    o.push(h.rect(270, 227, 118, 5, A.blanc), h.rect(270, 227, 118, 5, A.hachure('bois')));
    o.push(h.rect(280, 202, 28, 25, A.blanc), h.rect(282, 204, 24, 23, A.hachure('terre', 'aucun')), h.rect(280, 202, 28, 25, A.arete));
    for (const cy of [222, 212, 202]) for (const cx of [316, 326, 336]) o.push(h.cercle(cx, cy, 5, W(A.arete)), h.cercle(cx, cy, 1.6, A.fin));
    o.push(bidon(344, 202));
    for (let i = 0; i < 5; i++) o.push(h.rect(366 + (i % 2), 227 - 4 * (i + 1), 20 - (i % 3), 4, W(A.detail)));
    // un dormeur sous la table
    o.push(rr(284, 272, 88, 6, 2, W(A.arete)));
    o.push(h.path('M297 272 C300 259, 318 259, 335 262 C352 264, 364 263, 370 272 Z', W(A.arete)));
    o.push(h.cercle(291, 266, 5.5, W(A.arete)));

    // cote : le mur de bois rond
    o.push(h.ligne(401, 160, 421, 160, A.detail), h.ligne(410, 154, 410, 166, A.detail), h.ligne(421, 154, 421, 166, A.detail));
    o.push(h.texte(398, 164, '200 mm', { ancre: 'end', lisere: true }));
    return `<g transform="translate(0,-21)">\n${o.join('\n')}\n</g>`;
  };

  // ── Les portes appuyées au mur, chargées de sacs ───────────────────────────────────
  const appentis = z => {
    const o = [];
    const yf = 192;
    o.push(h.rect(40, yf, 290, 8, A.hachure('bois', 'aucun')), h.ligne(40, yf, 330, yf, A.arete));
    o.push(h.rect(90, 14, 10, yf - 14, A.hachure('bois')));
    o.push(h.chemin([[196, 192], [100, 64], [104.8, 60.4], [200.8, 188.4]], A.hachure('bois', 'contour'), true));
    const xout = y => 104.8 + 0.75 * (y - 60.4);
    for (let j = 0; j < 10; j++) {
      const yl = yf - 14 * j, yh = yl - 14;
      const xs = xout(Math.min(yl, 188.4)) + 1;
      for (let k = 0; k < 3; k++) o.push(rr(xs + 24 * k, yh + 0.5, 23.5, 13, 5, A.hachure('terre', 'arete')));
    }
    // quelqu'un assis dessous, le dos au mur
    const tube = (x1, y1, x2, y2, r) => {
      const L = Math.hypot(x2 - x1, y2 - y1), nx = -(y2 - y1) / L * r, ny = (x2 - x1) / L * r;
      return h.path(`M${x1 + nx} ${y1 + ny} L${x2 + nx} ${y2 + ny} A${r} ${r} 0 0 0 ${x2 - nx} ${y2 - ny} L${x1 - nx} ${y1 - ny} A${r} ${r} 0 0 0 ${x1 + nx} ${y1 + ny} Z`, W(A.arete));
    };
    o.push(tube(110, 184, 110, 147, 7), h.cercle(110, 132, 6.6, W(A.arete)));
    o.push(tube(112, 185, 140, 164, 5), tube(140, 164, 160, 187, 3.9), tube(160, 189, 170, 189, 2.8));
    o.push(tube(112, 150, 123, 170, 3.3), tube(123, 170, 137, 165, 3), h.cercle(139, 164, 2.8, W(A.arete)));
    return `<g transform="translate(0,-6)">\n${o.join('\n')}\n</g>`;
  };

  // ── Les sacs de terre, sans sacs ────────────────────────────────────────────────────
  const sacs = z => {
    const o = [];
    // une taie remplie aux deux tiers, nouée
    o.push(h.path('M31 62 C31 47, 38 43.5, 56 43.5 L118 44.5 C126 45.5, 130 52, 130 62 C130 72, 126 78.5, 118 79.5 L56 80.5 C38 80.5, 31 77, 31 62 Z', A.hachure('terre', 'aucun')));
    o.push(h.path('M30 62 C30 46, 38 42, 56 42 L118 43 C130 44, 140 52, 168 59 L168 65 C140 72, 130 80, 118 81 L56 82 C38 82, 30 78, 30 62 Z', A.contour));
    o.push(h.path('M118 44.5 C126 45.5, 130 52, 130 62 C130 72, 126 78.5, 118 79.5', A.cache));
    o.push(h.ligne(140, 56, 160, 60, A.detail), h.ligne(140, 68, 160, 64, A.detail));
    o.push(h.path('M179 64 Q187 70 193 72', A.arete), h.path('M178 67 Q183 75 189 79', A.arete));
    o.push(h.cercle(174, 62, 6, W(A.arete)));
    o.push(h.cote(30, 94, 130, 94, '2/3', { cote: 'dessous' }));
    // un mur de sacs, joints croisés
    o.push(h.ligne(15, 194, 216, 194, A.arete));
    const sacE = (x, y, l) => rr(x + 0.5, y + 0.5, l - 1, 21, 8, W(A.arete)) + h.ligne(x + l - 9, y + 6, x + l - 9, y + 16, A.detail);
    for (const y of [172, 128]) for (const x of [25, 85, 145]) o.push(sacE(x, y, 60));
    o.push(sacE(25, 150, 30), sacE(55, 150, 60), sacE(115, 150, 60), sacE(175, 150, 30));
    return o.join('\n');
  };

  return {
    ref: '04-01a',
    titre: 'La pièce d’abri chargée',
    desc: 'Coupe d’un chalet sans sous-sol : bois cordé contre le mur extérieur jusque sous le débord du toit, neige tassée en banc jusqu’au bas de la fenêtre, eau, farine et livres sous la fenêtre, deux portes démontées à plat sur une table chargée de terre, de bûches, de bidons et de livres, un dormeur dessous. Variante des portes appuyées contre un mur intérieur, chargées de sacs de terre montés du plancher, quelqu’un assis dessous le dos au mur. Détail d’une taie remplie aux deux tiers et nouée, et d’un mur de sacs à joints croisés.',
    format: 'pleine',
    disposition: [['coupe'], ['appentis', 'sacs']],
    hauteurs: [3, 2],
    largeurs: [[1], [3, 2]],
    vues: {
      coupe: {
        titre: 'En coupe, le chalet sans sous-sol',
        dessin: coupe,
        renvois: z => [
          { n: 1, rond: [525, 194], cible: [470, 201], texte: 'bois cordé sur toute la hauteur' },
          { n: 2, rond: [72, 175], cible: [128, 219], texte: 'neige montée jusqu’aux fenêtres' },
          { n: 3, rond: [42, 231], cible: [112, 241], texte: 'tassée par couches, arrosée entre chacune' },
          { n: 4, rond: [228, 175], cible: [225, 206], texte: 'eau, farine, livres sous la fenêtre' },
          { n: 5, rond: [258, 171], cible: [268, 213], texte: 'deux portes démontées, à plat sur la table' },
          { n: 6, rond: [330, 147], cible: [326, 176], texte: 'chargées de terre, bûches, bidons, livres' },
        ],
      },
      appentis: {
        titre: 'Ou les portes appuyées au mur',
        dessin: appentis,
        renvois: z => [
          { n: 7, rond: [118, 22], cible: [102, 56.5], texte: 'portes appuyées à un mur intérieur' },
          { n: 8, rond: [300, 94], cible: [214, 95], texte: 'sacs montés du plancher contre la porte' },
        ],
      },
      sacs: {
        titre: 'Les sacs de terre, sans sacs',
        dessin: sacs,
        renvois: z => [
          { n: 9, rond: [78, 16], cible: [84, 42.4], texte: 'terre ou sable aux deux tiers' },
          { n: 10, rond: [208, 36], cible: [178.8, 58.4], texte: 'taie ou jambe de pantalon nouée' },
          { n: 11, rond: [212, 112], cible: [145, 130], texte: 'joints croisés d’un rang à l’autre' },
        ],
      },
    },
    danger: 'Danger — un poêle au propane, une chaufferette ou une génératrice dans la pièce scellée tue avant les retombées : le monoxyde n’a ni odeur ni couleur, on s’endort au lieu de sortir.',
  };
};
