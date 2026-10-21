// Planche 03-12. La couverture de fenêtre scellée sur quatre côtés (chapitre 3, section 9, « Le chauffage »,
// le paragraphe « Fermer les fenêtres »). Dessinée le 16 octobre 2026.
// 19 octobre 2026 : la ligne « Planche 03-12. … » sort du dessin (le moteur de pages pose le bandeau) ; la légende
// remonte sous les vues. Les vues passent de 60 à 57 cm de large (FX, LCM) pour que le dessin prenne la hauteur
// libérée ; la boucle d'air du raté suit (montée à 50 cm au lieu de 51,5).
//
// Ce que dit le chapitre (texte du 16 octobre) : on tend une couverture à environ 2,5 cm de la vitre et on la cloue
// sur le chambranle, sur ses quatre côtés, avec une latte de bois tout le long de chaque bord ; l'air pris entre la
// vitre et la couverture ne bouge plus. Une couverture de laine laisse passer l'air : une toile de plastique agrafée
// côté pièce le bloque. Par les bords ouverts, l'air de la pièce entre par le haut, se refroidit sur la vitre,
// descend et ressort par le bas, en boucle. Source : sources/03-cornell-cce-traitements-fenetres-economie-energie.md
// (joint continu sur les quatre bords, latte de 1 × 2 po, environ 2,5 cm du verre, la boucle de la draperie).
//
// Trois vues alignées, à la même échelle : le plancher, le plafond, la tête et le bas de la fenêtre tombent à la même
// hauteur dans les trois. Pourquoi pas la coupe horizontale de l'audit : la boucle est verticale (l'air entre en
// haut et ressort en bas) ; elle ne se voit qu'en coupe verticale. Les côtés se voient dans la vue de la pièce.
// La fenêtre est posée près de la face intérieure du mur, pour que le chambranle tienne la couverture à 2,5 cm du
// verre. Le 2,5 cm est dans le renvoi : une cote sur un écart de 6 px ne se lit pas.
// Le raté : la couverture accrochée à une tringle (son support, hors de la coupe, en gris), ouverte en haut et en bas.
//
// La charte : la couverture, sujet de la planche, en trait fort ; le chambranle, les lattes et l'ossature en bois
// coupé ; le trajet de l'air en tireté noir. Le rouge : quatre cercles de contrôle (le coin des lattes, le bas fermé,
// les deux bords ouverts du raté). Pas de flèche rouge : clouer n'a pas de sens de geste à montrer.
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
  // panneau de 0 à 1,2, montants de 1,2 à 15,2, gypse de 15,2 à 16,5. La fenêtre, posée près de la face
  // intérieure : cadre de 6 à 16,5, deux vitres à 13,5 et 16. Le chambranle de 16,5 à 18,5 ; la couverture à
  // 19 (sa face côté vitre à 18,5 : 2,5 cm du verre, la distance du chapitre) ; la toile de plastique à 20,4 ;
  // les lattes de 20,9 à 22,9. Ouverte : la couverture pend d'une tringle à 28,5, loin du mur, et ses bords
  // du haut et du bas restent ouverts.
  const XMIN = -5, LCM = 57;
  const coupe = (z, ouverte) => {
    const R = repere(z, LCM, XMIN), { X, Y, L, s } = R, o = [];
    const B = (x1, y1, x2, y2, at) => boite(R, x1, y1, x2, y2, at);
    const P = pts => pts.map(([c, d]) => [X(c), Y(d)]);
    const XF = XMIN + LCM;
    // plancher et plafond, dans la pièce
    o.push(B(1.2, BAS, XF, 0, A.hachure('bois', 'arete')));
    o.push(B(1.2, PLAFOND, XF, HAUT, A.hachure('bois', 'arete')));
    // le déclin, en dents de scie : chaque planche plus épaisse en bas ; coupé par la fenêtre
    const declin = (y1, y2) => {
      const pts = [[0, y2]];
      for (let y = y2; y > y1; y -= 14) {
        const yb = Math.max(y1, y - 14);
        pts.push([-0.5, y], [-1.6, yb]);
        if (yb > y1) pts.push([-0.5, yb]);
      }
      pts.push([0, y1]);
      return h.chemin(P(pts), W(A.arete), true);
    };
    o.push(declin(BAS, 70), declin(216, HAUT));
    // le panneau, l'ossature, l'isolant, le gypse
    o.push(B(0, BAS, 1.2, 70, A.hachure('bois', 'arete')), B(0, 216, 1.2, HAUT, A.hachure('bois', 'arete')));
    o.push(B(1.2, 0, 15.2, 4, A.hachure('bois', 'arete')));              // lisse basse
    o.push(B(1.2, 4, 15.2, 68, A.hachure('isolant', 'arete')));
    o.push(B(1.2, 68, 15.2, 72, A.hachure('bois', 'arete')));            // appui de l'ouverture
    o.push(B(1.2, 214, 15.2, 236, A.hachure('bois', 'arete')));          // linteau
    o.push(B(1.2, 236, 15.2, PLAFOND, A.hachure('bois', 'arete')));      // sablières
    o.push(B(15.2, 0, 16.5, 72, W(A.arete)), B(15.2, 214, 16.5, PLAFOND, W(A.arete)));
    // la fenêtre : le cadre en bas et en haut, l'allège qui déborde dehors, le larmier, les deux vitres
    o.push(B(6, 72, 16.5, 79, A.hachure('bois', 'arete')), B(6, 207, 16.5, 214, A.hachure('bois', 'arete')));
    o.push(h.chemin(P([[-4, 70.2], [6, 72], [6, 75], [-4, 72.6]]), A.hachure('bois', 'arete'), true));
    o.push(B(-1, 214, 6, 215.6, W(A.arete)));
    o.push(h.ligne(X(13.5), Y(79), X(13.5), Y(207), A.arete), h.ligne(X(16), Y(79), X(16), Y(207), A.arete));
    o.push(B(13.5, 79, 16, 81, A.plein), B(13.5, 205, 16, 207, A.plein));
    // le chambranle, en haut et en bas, qui chevauche le cadre
    o.push(B(16.5, CH_B[0], 18.5, CH_B[1], A.hachure('bois', 'arete')), B(16.5, CH_H[0], 18.5, CH_H[1], A.hachure('bois', 'arete')));
    // la plinthe
    o.push(B(16.5, 0, 17.8, 9, W(A.arete)));

    const tirete = A.arete.replace('stroke-linecap="round"', 'stroke-linecap="round" stroke-dasharray="6 4"');
    if (!ouverte) {
      // la couverture tendue sur le chambranle, la toile de plastique côté pièce, les deux serrées par les lattes
      o.push(h.ligne(X(19), Y(COUV[0]), X(19), Y(COUV[1]), A.contour));
      o.push(h.ligne(X(20.4), Y(COUV[0] + 1), X(20.4), Y(COUV[1] - 1), A.arete));
      const latte = ([y1, y2]) => {
        const yc = (y1 + y2) / 2;
        return [
          B(20.9, y1, 22.9, y2, A.hachure('bois', 'arete')),
          h.rect(X(12.5), Y(yc) - 0.6, X(22.9) - X(12.5), 1.2, A.plein),
          h.rect(X(22.9), Y(yc) - 2.6, 1.6, 5.2, A.plein),
        ].join('\n');
      };
      o.push(latte(LAT_H), latte(LAT_B));
      o.push(h.controle(X(21.4), Y(71), 13));
    } else {
      // la tringle, tenue par un support hors de la coupe (en gris, derrière) ; la couverture qui y pend
      const support = P([[16.5, 223.5], [17.8, 223.5], [17.8, 227.2], [28.5, 227.2], [28.5, 229], [16.5, 229]]);
      o.push(h.chemin(support, A.loin, true), h.chemin(support, A.detail, true));
      o.push(h.cercle(X(28.5), Y(228.1), L(1.3), W(A.arete)));
      o.push(h.path(`M${X(27.1)} ${Y(222)} L${X(27.1)} ${Y(228.1)} Q${X(27.1)} ${Y(229.9)} ${X(28.5)} ${Y(229.9)} Q${X(29.9)} ${Y(229.9)} ${X(29.9)} ${Y(228.1)} L${X(29.9)} ${Y(60)} Q${X(29.9)} ${Y(56)} ${X(29.4)} ${Y(54)}`, A.contour));
      // l'air de la pièce entre par le haut, descend le long de la vitre, ressort par le bas et coule au
      // plancher ; dans la pièce, il remonte : la boucle
      o.push(h.fleche(`M${X(48.5)} ${Y(238.6)} L${X(25)} ${Y(238.6)} Q${X(22.6)} ${Y(238.6)} ${X(22.6)} ${Y(235)} L${X(22.6)} ${Y(14)} Q${X(22.6)} ${Y(6)} ${X(29)} ${Y(6)} L${X(44)} ${Y(6)}`, tirete));
      o.push(h.fleche(`M${X(50)} ${Y(14)} L${X(50)} ${Y(226)}`, tirete));
      o.push(h.controle(X(23.4), Y(232.4), 12), h.controle(X(25.6), Y(54), 12));
    }
    // dehors, la pièce
    o.push(etiquette(X(-2.5), z.h - 4, 'dehors'));
    o.push(etiquette(X(38), z.h - 4, 'la pièce'));
    return { svg: o.join('\n'), R };
  };

  // ─── La vue de la pièce : la couverture, les quatre lattes, la fenêtre derrière en tireté ──────────
  // x en cm, 0 au milieu de la fenêtre. Ouverture de -45 à 45, chambranle de 9 cm (jusqu'à ±54), couverture
  // jusqu'à ±55, lattes de 4 cm sur le chambranle : en haut et en bas sur toute la largeur, les côtés entre elles.
  const FX = 57;
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
    desc: 'Trois vues alignées, du plancher au plafond, à la même échelle. À gauche, la fenêtre vue de la pièce : une couverture de laine à bandes couvre la fenêtre et son chambranle ; une latte de bois est clouée par-dessus sur chacun des quatre côtés, le haut et le bas sur toute la largeur, les côtés bout à bout entre eux, les clous rapprochés tout le long ; la fenêtre, derrière, est en tireté. Au milieu, la même fenêtre en coupe verticale, dehors à gauche : le mur, le cadre et ses deux vitres, le chambranle sur la face intérieure ; la couverture est tendue sur le chambranle, à 2,5 cm de la vitre, une toile de plastique par-dessus côté pièce, les deux serrées par une latte en haut et en bas ; entre la vitre et la couverture, la lame d’air est fermée. À droite, la même coupe, la couverture accrochée à une tringle, loin du mur, ouverte en haut et en bas : l’air de la pièce entre par le haut, descend le long de la vitre, ressort par le bas et coule au plancher, puis remonte dans la pièce.',
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
            { n: 4, rond: [X(42), Y(178)], cible: [X(17.3), Y(178)], texte: 'lame d’air de 2,5 cm, fermée' },
            { n: 5, rond: [X(42), Y(112)], cible: [X(20.4), Y(112)], texte: 'toile de plastique, côté pièce' },
            { n: 6, rond: [X(42), Y(40)], cible: [X(22.9), Y(69.5)], texte: 'le bas tenu par sa latte' },
          ];
        },
      },
      rate: {
        titre: 'Les bords ouverts',
        dessin: z => coupe(z, true).svg,
        renvois: z => {
          const { X, Y } = coupe(z, true).R;
          return [
            { n: 7, rond: [X(41), Y(150)], cible: [X(29.9), Y(150)], texte: 'couverture accrochée, bords ouverts' },
            { n: 8, rond: [X(41), Y(36)], cible: [X(37), Y(6) - 2], texte: 'l’air entre en haut, ressort en bas' },
          ];
        },
      },
    },
  };
};
