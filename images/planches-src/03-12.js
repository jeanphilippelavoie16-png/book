// Planche 03-12. La couverture de fenêtre scellée sur quatre côtés (chapitre 3, section 9, « Le chauffage »,
// le paragraphe « Aux fenêtres, l'isolant est la lame d'air emprisonnée »). Dessinée le 16 octobre 2026.
//
// Ce que dit le chapitre : une couverture tendue à quelques centimètres de la vitre et scellée sur ses quatre
// côtés isole par la lame d'air ; scellée sur trois côtés, l'air descend le long de la vitre froide, ressort par
// le bas et refroidit la pièce.
// Ce que la planche ajoute, sourcé (sources/03-cornell-cce-traitements-fenetres-economie-energie.md) : le joint se
// fait en continu sur chaque bord, pas de place en place, et une latte de bois serre le bord (la fiche nomme une
// latte de 1 × 2 po). D'où la couverture clouée sur le chambranle (c'est lui qui la tient à quelques
// centimètres du verre) et une latte clouée par-dessus, tout le long de chaque côté, bout à bout aux coins.
//
// Trois vues alignées, à la même échelle (2,37 px au cm) : le plancher, le plafond, la tête et le bas de la fenêtre
// tombent à la même hauteur dans les trois. Pourquoi pas la coupe horizontale de l'audit : la boucle que décrit le
// texte est verticale (l'air descend le long de la vitre et ressort par le bas) ; elle ne se voit qu'en coupe
// verticale. Les côtés se voient dans la vue de la pièce.
// Aucune cote : le chapitre dit « quelques centimètres » (la fiche dit environ 2,5 cm du verre, ce n'est pas au
// chapitre). L'écart dessiné est celui que donne un chambranle ordinaire.
//
// La charte : la couverture, sujet de la planche, en trait fort ; le chambranle, les lattes et l'ossature en bois
// coupé ; le trajet de l'air en tireté noir. Le rouge : trois cercles de contrôle, les deux bas (fermé, libre) et un
// coin. Pas de flèche rouge : clouer n'a pas de sens de geste à montrer.
module.exports = (h) => {
  const A = h.a;
  const f1 = v => Math.round(v * 10) / 10;
  const W = at => at.replace('fill="none"', 'fill="#FFFFFF"');

  // ─── Les hauteurs, en cm, communes aux trois vues ─────────────────────────────────────────────
  const BAS = -6, HAUT = 250;              // le bas de la vue (sous le plancher), le haut (au-dessus du plafond)
  const PLAFOND = 244;
  const OUV = [74, 212];                   // l'ouverture finie, du bas au haut
  const CH_B = [67, 76], CH_H = [210, 219];   // le chambranle du bas, du haut
  const COUV = [66, 220];                  // la couverture
  const LAT_B = [69, 73], LAT_H = [213, 217]; // les lattes du bas et du haut
  const SOUS = 18;                         // la place sous le plancher pour « dehors », « la pièce »

  // Le repère d'une vue : s px au cm, le plancher à yP, l'abscisse c en cm depuis xmin.
  const repere = (z, lcm, xmin) => {
    const s = Math.min(z.l / lcm, (z.h - SOUS) / (HAUT - BAS));
    const yP = z.h - SOUS + BAS * s;
    const x0 = (z.l - lcm * s) / 2;
    return { s, X: c => f1(x0 + (c - xmin) * s), Y: c => f1(yP - c * s), L: c => f1(c * s) };
  };
  const boite = (R, x1, y1, x2, y2, at) => h.rect(R.X(x1), R.Y(y2), R.L(x2 - x1), R.L(y2 - y1), at);
  const etiquette = (x, y, s, ancre = 'middle') => h.texte(x, y, s, { italique: true, ancre });

  // ─── La coupe verticale du mur et de la fenêtre ──────────────────────────────────────────────
  // x en cm : 0 à la face extérieure du revêtement intermédiaire, vers la pièce. Déclin de -1,6 à 0,
  // panneau de 0 à 1,2, montants de 1,2 à 15,2, gypse de 15,2 à 16,5. La fenêtre : cadre de 0,5 à 10,5,
  // deux vitres à 5,5 et 8,5. Le prolongement de cadre de 10,5 à 16,5, le chambranle de 16,5 à 18,5, la
  // couverture à 19, les lattes de 19,5 à 21,5.
  const XMIN = -5, LCM = 55;
  const coupe = (z, libre) => {
    const R = repere(z, LCM, XMIN), { X, Y, L, s } = R, o = [];
    const B = (x1, y1, x2, y2, at) => boite(R, x1, y1, x2, y2, at);
    // plancher et plafond, dans la pièce
    o.push(B(1.2, BAS, 50, 0, A.hachure('bois', 'arete')));
    o.push(B(1.2, PLAFOND, 50, HAUT, A.hachure('bois', 'arete')));
    // le déclin, en dents de scie : chaque planche plus épaisse en bas ; coupé par la fenêtre
    const declin = (y1, y2) => {
      const pts = [[0, y2]];
      for (let y = y2; y > y1; y -= 14) {
        const yb = Math.max(y1, y - 14);
        pts.push([-0.5, y], [-1.6, yb]);
        if (yb > y1) pts.push([-0.5, yb]);
      }
      pts.push([0, y1]);
      return h.chemin(pts.map(([c, d]) => [X(c), Y(d)]), W(A.arete), true);
    };
    o.push(declin(BAS, 70), declin(216, HAUT));
    // le panneau, l'ossature, l'isolant, le gypse
    o.push(B(0, BAS, 1.2, 70, A.hachure('bois', 'arete')), B(0, 216, 1.2, HAUT, A.hachure('bois', 'arete')));
    o.push(B(1.2, 0, 15.2, 4, A.hachure('bois', 'arete')));              // lisse basse
    o.push(B(1.2, 4, 15.2, 68, A.hachure('isolant', 'arete')));
    o.push(B(1.2, 68, 15.2, 72, A.hachure('bois', 'arete')));            // appui de l'ouverture
    o.push(B(1.2, 214, 15.2, 236, A.hachure('bois', 'arete')));          // linteau
    o.push(B(1.2, 236, 15.2, PLAFOND, A.hachure('bois', 'arete')));      // sablières
    o.push(B(15.2, 0, 16.5, 67, W(A.arete)), B(15.2, 219, 16.5, PLAFOND, W(A.arete)));
    // la fenêtre : le cadre en bas et en haut, l'allège qui déborde dehors, les deux vitres et leur intercalaire
    o.push(h.chemin([[X(-4), Y(70.5)], [X(0.5), Y(72)], [X(10.5), Y(72)], [X(10.5), Y(79)], [X(0.5), Y(79)], [X(0.5), Y(74)], [X(-4), Y(72.5)]], A.hachure('bois', 'arete'), true));
    o.push(B(0.5, 207, 10.5, 214, A.hachure('bois', 'arete')));
    o.push(B(0, 214, 1.2, 216, W(A.arete)));
    o.push(h.ligne(X(5.5), Y(79), X(5.5), Y(207), A.arete), h.ligne(X(8.5), Y(79), X(8.5), Y(207), A.arete));
    o.push(B(5.5, 79, 8.5, 81, A.plein), B(5.5, 205, 8.5, 207, A.plein));
    // le prolongement de cadre, du cadre au mur
    o.push(B(10.5, 72, 16.5, 74, A.hachure('bois', 'arete')), B(10.5, 212, 16.5, 214, A.hachure('bois', 'arete')));
    // le chambranle, en haut et en bas
    o.push(B(16.5, CH_B[0], 18.5, CH_B[1], A.hachure('bois', 'arete')), B(16.5, CH_H[0], 18.5, CH_H[1], A.hachure('bois', 'arete')));
    // la plinthe
    o.push(B(16.5, 0, 17.8, 9, W(A.arete)));

    // la couverture : tendue sur le chambranle ; libre, le bas pend et s'écarte du chambranle
    const xc = 19;
    if (!libre) o.push(h.ligne(X(xc), Y(COUV[0]), X(xc), Y(COUV[1]), A.contour));
    else o.push(h.path(`M${X(xc)} ${Y(COUV[1])} L${X(xc)} ${Y(118)} C${X(xc)} ${Y(96)} ${X(21.6)} ${Y(82)} ${X(22.6)} ${Y(COUV[0])}`, A.contour));
    // les lattes et leurs clous, qui traversent la latte, la couverture, le chambranle et vont dans l'ossature
    const latte = ([y1, y2]) => {
      const yc = (y1 + y2) / 2;
      return [
        B(19.5, y1, 21.5, y2, A.hachure('bois', 'arete')),
        h.rect(X(11.5), Y(yc) - 0.6, X(21.5) - X(11.5), 1.2, A.plein),
        h.rect(X(21.5), Y(yc) - 2.6, 1.6, 5.2, A.plein),
      ].join('\n');
    };
    o.push(latte(LAT_H));
    if (!libre) o.push(latte(LAT_B));

    // l'air : fermé, il reste en place ; libre, il descend le long de la vitre, passe sous la couverture et
    // coule au plancher, vers la pièce
    if (libre) {
      const p = [
        `M${X(10.4)} ${Y(198)}`,
        `L${X(10.4)} ${Y(86)}`,
        `Q${X(10.4)} ${Y(80.5)} ${X(14)} ${Y(80.5)}`,
        `L${X(17.4)} ${Y(80.5)}`,
        `Q${X(20.3)} ${Y(80.5)} ${X(20.3)} ${Y(74)}`,
        `L${X(20.3)} ${Y(12)}`,
        `Q${X(20.3)} ${Y(4.5)} ${X(26)} ${Y(4.5)}`,
        `L${X(46)} ${Y(4.5)}`,
      ].join(' ');
      o.push(h.fleche(p, A.arete.replace('stroke-linecap="round"', 'stroke-linecap="round" stroke-dasharray="6 4"')));
      o.push(h.controle(X(20.6), Y(67.5), 13));
    } else {
      o.push(h.controle(X(20.5), Y(71), 13));
    }
    // dehors, la pièce
    o.push(etiquette(X(-2.5), z.h - 4, 'dehors'));
    o.push(etiquette(X(35), z.h - 4, 'la pièce'));
    return { svg: o.join('\n'), R };
  };

  // ─── La vue de la pièce : la couverture, les quatre lattes, la fenêtre derrière en tireté ──────────
  // x en cm, 0 au milieu de la fenêtre. Ouverture de -45 à 45, chambranle de 9 cm (jusqu'à ±54), couverture
  // jusqu'à ±55, lattes de 4 cm sur le chambranle : en haut et en bas sur toute la largeur, les côtés entre elles.
  const FX = 62;
  const face = z => {
    const R = repere(z, 2 * FX, -FX), { X, Y, L } = R, o = [];
    const B = (x1, y1, x2, y2, at) => boite(R, x1, y1, x2, y2, at);
    o.push(B(-FX, BAS, FX, 0, A.hachure('bois', 'arete')));
    o.push(B(-FX, PLAFOND, FX, HAUT, A.hachure('bois', 'arete')));
    o.push(B(-FX, 0, FX, 9, W(A.arete)));
    // la couverture, puis la fenêtre derrière elle en tireté (l'ouverture, les deux vitres)
    o.push(B(-55, COUV[0], 55, COUV[1], W(A.contour)));
    // les bandes d'une couverture de laine, près du haut et du bas : c'est elles qui disent « couverture »
    for (const yb of [196, 90]) {
      for (const [dy, at] of [[4.5, A.detail], [1.4, A.arete], [-1.4, A.arete], [-4.5, A.detail]]) o.push(h.ligne(X(-55), Y(yb + dy), X(55), Y(yb + dy), at));
    }
    o.push(B(-45, OUV[0], 45, OUV[1], A.cache));
    o.push(B(-40, 80, -1.5, 206, A.cache), B(1.5, 80, 40, 206, A.cache));
    // les lattes : le haut et le bas sur toute la largeur, les côtés bout à bout entre eux
    // (sur le chambranle, à 2 cm de son bord : la couverture déborde un peu autour)
    const lattes = [
      [-53, LAT_H[0], 53, LAT_H[1]], [-53, LAT_B[0], 53, LAT_B[1]],
      [-51.5, LAT_B[1], -47.5, LAT_H[0]], [47.5, LAT_B[1], 51.5, LAT_H[0]],
    ];
    for (const l of lattes) o.push(B(...l, W(A.arete)));
    // les clous, rapprochés, tout le long
    const clou = (c, d) => h.cercle(X(c), Y(d), 1.7, A.plein);
    for (const c of [-50, -33, -16.5, 0, 16.5, 33, 50]) o.push(clou(c, 215), clou(c, 71));
    for (const d of [88, 106, 124, 142, 160, 178, 196]) o.push(clou(-49.5, d), clou(49.5, d));
    o.push(h.controle(X(-49.5), Y(73), 12));
    return { svg: o.join('\n'), R };
  };

  return {
    ref: '03-12',
    titre: 'La couverture de fenêtre scellée sur quatre côtés',
    fichier: 'planche-03-12-couverture-fenetre-scellee.svg',
    desc: 'Trois vues alignées, du plancher au plafond, à la même échelle. À gauche, la fenêtre vue de la pièce : une couverture couvre la fenêtre et son chambranle ; une latte de bois est clouée par-dessus sur chacun des quatre côtés, le haut et le bas sur toute la largeur, les côtés bout à bout entre eux, les clous rapprochés tout le long ; la fenêtre, derrière, est en tireté. Au milieu, la même fenêtre en coupe verticale, dehors à gauche : le mur, le cadre et ses deux vitres, le chambranle sur la face intérieure ; la couverture est tendue sur le chambranle, à quelques centimètres de la vitre, et serrée par une latte en haut et en bas ; entre la vitre et la couverture, la lame d’air est fermée. À droite, la même coupe, la couverture clouée en haut seulement : le bas pend et s’écarte du chambranle ; l’air descend le long de la vitre, passe sous la couverture et coule le long du mur jusqu’au plancher, vers la pièce.',
    format: 'pleine',
    disposition: [['face', 'bon', 'rate']],
    largeurs: [[2 * FX, LCM, LCM]],
    vues: {
      face: {
        titre: 'Vue de la pièce',
        dessin: z => face(z).svg,
        renvois: z => {
          const { X, Y } = face(z).R;
          return [
            { n: 1, rond: [X(-24), Y(236) + 2], cible: [X(-24), Y(COUV[1]) + 1], texte: 'couverture tendue sur le chambranle' },
            { n: 2, rond: [X(-24), Y(150)], cible: [X(-47.5), Y(150)], texte: 'une latte clouée sur chaque côté' },
            { n: 3, rond: [X(-24), Y(40)], cible: [X(-46.6), Y(73.4)], texte: 'les lattes bout à bout aux coins' },
          ];
        },
      },
      bon: {
        titre: 'Quatre côtés fermés',
        dessin: z => coupe(z, false).svg,
        renvois: z => {
          const { X, Y } = coupe(z, false).R;
          return [
            { n: 4, rond: [X(36), Y(150)], cible: [X(14), Y(150)], texte: 'lame d’air fermée' },
            { n: 5, rond: [X(38), Y(40)], cible: [X(21.3), Y(70)], texte: 'le bas tenu par sa latte' },
          ];
        },
      },
      rate: {
        titre: 'Le bas libre',
        dessin: z => coupe(z, true).svg,
        renvois: z => {
          const { X, Y } = coupe(z, true).R;
          return [
            { n: 6, rond: [X(38), Y(104)], cible: [X(22.2), Y(76)], texte: 'le bas s’écarte du chambranle' },
            { n: 7, rond: [X(38), Y(32)], cible: [X(36), Y(4.5) - 2], texte: 'l’air froid coule au plancher' },
          ];
        },
      },
    },
  };
};
