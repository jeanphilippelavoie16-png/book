// Planche 17-06 — Le renfort de porte (chapitre 22, « La porte, et l'endroit où elle cède »).
// Aucune cote : le chapitre ne donne aucune dimension. L'échelle est portée par les objets
// connus (le montant en coupe, la porte, la poignée).

module.exports = (h) => {
  const W = t => h.a[t].replace('fill="none"', 'fill="#ffffff"');   // trait sur aplat blanc
  const hb = (t = 'arete') => h.a.hachure('bois', t);
  const coupure = (x1, y1, x2, y2) => {
    const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
    const nx = -uy, ny = ux, mx = (x1 + x2) / 2, my = (y1 + y2) / 2, a = 4;
    return h.chemin([[x1, y1], [mx - ux * a, my - uy * a], [mx + nx * a - ux * a * 0.3, my + ny * a - uy * a * 0.3],
      [mx - nx * a + ux * a * 0.3, my - ny * a + uy * a * 0.3], [mx + ux * a, my + uy * a], [x2, y2]], h.a.fin);
  };
  // repère en mm : y vers le bas (vues en plan) ou vers le haut (vues de face et de côté)
  const outils = (s, X, Y, haut) => ({
    R: (x1, y1, x2, y2, a) => haut
      ? h.rect(X(x1), Y(y2), (x2 - x1) * s, (y2 - y1) * s, a)
      : h.rect(X(x1), Y(y1), (x2 - x1) * s, (y2 - y1) * s, a),
    P: (pts, a, ferme = true) => h.chemin(pts.map(([x, y]) => [X(x), Y(y)]), a, ferme),
  });

  // ── Plan de la gâche : dehors en haut, x de -45 (porte coupée) à 330 (mur coupé)
  const gPlan = z => {
    const s = Math.min((z.h - 40) / 137, 1.3);
    const x0 = (z.l - 375 * s) / 2 + 45 * s, y0 = 8;
    return { s, X: x => x0 + x * s, Y: y => y0 + y * s };
  };
  // ── Porte vue de l'intérieur : x = 0 au bord côté pentures, y = 0 au plancher
  const gPorte = z => {
    const s = Math.min((z.h - 16) / 2330, (z.l - 44) / 1180);
    const x0 = (z.l - 813 * s) / 2, yF = z.h - 8;
    return { s, X: x => x0 + x * s, Y: y => yF - y * s };
  };
  // ── Bloc en coupe : x = 0 à la face du gypse, dehors à gauche
  const gBloc = z => {
    const s = Math.min((z.l - 44) / 212, (z.h - 20) / 300);
    const x0 = 30 + 102 * s, y0 = (z.h - 300 * s) / 2 + 70 * s;
    return { s, X: x => x0 + x * s, Y: y => y0 + y * s };
  };
  // ── Contrefort de côté : x = 0 à la face intérieure de la porte, y = 0 au plancher
  const gPerche = z => {
    const s = Math.min((z.h - 14) / 2340, (z.l - 24) / 1330);
    const x0 = (z.l - 1330 * s) / 2 + 250 * s, yF = z.h - 6 - 50 * s;
    return { s, X: x => x0 + x * s, Y: y => yF - y * s };
  };
  // ── Pied de la perche : même repère que le contrefort, agrandi
  const gEnc = z => {
    const s = Math.min((z.h - 10) / 105, (z.l - 50) / 360);
    const x0 = (z.l - 30 - 360 * s) / 2 - 700 * s, yH = 5;
    return { s, X: x => x0 + x * s, Y: y => yH + (55 - y) * s };
  };
  // ── Penture en plan : dehors en haut, chambranle à gauche, porte entrouverte à droite
  const K = [1.5, -3];
  const gPen = z => {
    const s = Math.min((z.h - 8) / 80, (z.l - 30) / 95);
    const x0 = (z.l - 95 * s) / 2 + 32 * s, y0 = 4 + 25 * s;
    return { s, X: x => x0 + x * s, Y: y => y0 + y * s };
  };
  // la porte de la penture tourne de 30° autour de la broche
  const tourne = ([x, y]) => {
    const a = -30 * Math.PI / 180, c = Math.cos(a), sn = Math.sin(a), dx = x - K[0], dy = y - K[1];
    return [K[0] + dx * c - dy * sn, K[1] + dx * sn + dy * c];
  };

  // perche : arête haute de (2, 905) à (972, -20), arête basse de (2, 836) à (900, -20)
  const perche = [[2, 905], [972, -20], [900, -20], [2, 836]];
  const plancherEntaille = [[879, 0], [900, -20], [972, -20], [972, 0]];

  return {
    ref: '17-06',
    titre: 'Le renfort de porte',
    desc: 'En plan, une vis longue traverse la gâche, le chambranle et le vide qui le sépare du montant, '
      + 'et mord dans le montant du mur. Vue de l’intérieur, une barre de bois franc repose dans deux blocs '
      + 'entaillés posés sur les montants, de part et d’autre du chambranle ; en coupe, le bloc entaillé en U '
      + 'cloué jusque dans le montant. De côté, une perche d’épinette en contrefort sous la poignée, le pied '
      + 'calé dans une encoche du plancher. En plan, la penture d’une porte qui ouvre dehors : un clou à tête '
      + 'coupée dépasse d’une aile, un trou percé dans l’autre le reçoit.',
    format: 'pleine',
    disposition: [['plan'], ['porte', 'perche', 'bloc'], ['encoche', 'penture']],
    hauteurs: [3.8, 4.4, 2.8],
    largeurs: [[1], [1, 1, 1], [3, 2]],
    vues: {
      plan: {
        titre: 'La gâche, vue de dessus, dehors en haut',
        dessin: z => {
          const { s, X, Y } = gPlan(z), { R, P } = outils(s, X, Y, false);
          return [
            // le mur
            R(190, 0, 330, 14, hb('detail')),
            R(160, 14, 330, 25, h.a.detail),
            R(236, 25, 330, 114, h.a.hachure('isolant', 'detail')),
            R(160, 114, 330, 127, h.a.detail),
            R(160, 25, 198, 114, hb('contour')),
            R(198, 25, 236, 114, hb('contour')),
            // le cadre
            R(123, 0, 190, 14, hb('arete')),
            R(126, 127, 200, 137, hb('arete')),
            R(123, 14, 148, 127, hb('contour')),
            R(108, 14, 123, 32, hb('arete')),
            R(123, 47, 139, 62, h.a.blanc),
            P([[123, 47], [139, 47], [139, 62], [123, 62]], h.a.detail, false),
            R(121.5, 38, 123.5, 47, h.a.plein),
            R(121.5, 62, 123.5, 74, h.a.plein),
            // la porte, coupée à gauche
            R(-45, 32, 118, 77, h.a.blanc),
            P([[-45, 32], [118, 32], [118, 77], [-45, 77]], h.a.contour, false),
            coupure(X(-45), Y(24), X(-45), Y(85)),
            R(98, 49.5, 136, 59.5, h.a.plein),
            // la vis longue
            P([[121.5, 63.5], [126, 66], [212, 66], [219, 68], [212, 70], [126, 70], [121.5, 72.5]], h.a.plein),
            coupure(X(330), Y(-4), X(330), Y(131)),
          ].join('\n');
        },
        renvois: z => {
          const { X, Y } = gPlan(z);
          return [
            { n: 1, rond: [X(154), z.h - 12], cible: [X(154), Y(70)], texte: 'vis longue passée dans la gâche' },
            { n: 2, rond: [X(78), Y(104)], cible: [X(123), Y(104)], texte: 'chambranle, où s’arrêtait la vis d’origine' },
            { n: 3, rond: [X(222), z.h - 12], cible: [X(222), Y(114)], texte: 'montant, où la vis doit mordre' },
          ];
        },
      },

      porte: {
        titre: 'La barre, vue de l’intérieur',
        dessin: z => {
          const { s, X, Y } = gPorte(z), { R } = outils(s, X, Y, true);
          // bloc de 160 de haut comme en coupe ; la joue avant, pleine hauteur, cache la barre
          const bloc = x => R(x, 1400, x + 100, 1560, W('arete'));
          const tete = 2330;
          return [
            // les montants derrière le mur, et le linteau
            h.ligne(X(-116), Y(0), X(-116), Y(tete), h.a.cache),
            h.ligne(X(-78), Y(0), X(-78), Y(tete), h.a.cache),
            h.ligne(X(-40), Y(0), X(-40), Y(2072), h.a.cache),
            h.ligne(X(929), Y(0), X(929), Y(tete), h.a.cache),
            h.ligne(X(891), Y(0), X(891), Y(tete), h.a.cache),
            h.ligne(X(853), Y(0), X(853), Y(2072), h.a.cache),
            R(-78, 2072, 891, 2256, h.a.cache),
            // la moulure et la porte
            R(-73, 0, 886, 2105, W('arete')),
            R(-3, 0, 816, 2035, W('arete')),
            h.ligne(X(-73), Y(2105), X(-3), Y(2035), h.a.detail),
            h.ligne(X(886), Y(2105), X(816), Y(2035), h.a.detail),
            R(0, 12, 813, 2032, W('contour')),
            R(120, 1170, 693, 1880, h.a.detail),
            R(120, 190, 693, 950, h.a.detail),
            h.cercle(X(748), Y(915), 34 * s, W('arete')),
            R(-10, 1790, 6, 1890, h.a.plein),
            R(-10, 1000, 6, 1100, h.a.plein),
            R(-10, 200, 6, 300, h.a.plein),
            // la barre, puis les blocs par-dessus : elle passe dans l'entaille, derrière la joue avant
            R(-215, 1485, 1028, 1550, W('contour')),
            bloc(-173), bloc(886),
            h.ligne(6, Y(0), z.l - 6, Y(0), h.a.contour),
          ].join('\n');
        },
        renvois: z => {
          const { X, Y } = gPorte(z);
          return [
            { n: 4, rond: [X(1070), Y(1230)], cible: [X(986), Y(1440)], texte: 'bloc posé sur le montant' },
            { n: 5, rond: [X(-250), Y(1800)], cible: [X(-200), Y(1550)], texte: 'barre de bois franc, hauteur d’adulte' },
          ];
        },
      },

      bloc: {
        titre: 'Le bloc, en coupe',
        dessin: z => {
          const { s, X, Y } = gBloc(z), { R, P } = outils(s, X, Y, false);
          const clou = (y, xt, xh) => [
            R(xt + 5, y - 2, xh, y + 2, h.a.plein),
            P([[xt + 5, y - 2], [xt, y], [xt + 5, y + 2]], h.a.plein),
            R(xh, y - 4.5, xh + 2.5, y + 4.5, h.a.plein),
          ].join('\n');
          return [
            R(-102, -70, -13, 230, hb('arete')),
            R(-13, -70, 0, 230, W('arete')),
            coupure(X(-102), Y(-70), X(0), Y(-70)),
            coupure(X(-102), Y(230), X(0), Y(230)),
            P([[0, 0], [25, 0], [25, 75], [75, 75], [75, 0], [100, 0], [100, 160], [0, 160]], hb('contour')),
            R(29, 10, 72, 75, W('contour')),
            h.cercle(X(50.5), Y(44), 7 * s, h.a.detail),
            h.cercle(X(50.5), Y(44), 15 * s, h.a.detail),
            // deux clous par l'entaille avant d'y mettre la barre, un long par le devant
            clou(22, -70, 25),
            clou(52, -70, 25),
            clou(120, -50, 100),
          ].join('\n');
        },
        renvois: z => {
          const { X, Y } = gBloc(z);
          return [
            { n: 6, rond: [X(58), Y(-40)], cible: [X(88), Y(0)], texte: 'bloc de bois entaillé en U' },
            { n: 7, rond: [X(76), Y(190)], cible: [X(101), Y(124.5)], texte: 'clous longs jusque dans le montant' },
          ];
        },
      },

      perche: {
        titre: 'Le contrefort, de côté',
        dessin: z => {
          const { s, X, Y } = gPerche(z), { R, P } = outils(s, X, Y, true);
          return [
            R(-77, 2045, 52, 2290, hb('arete')),
            coupure(X(-77), Y(2290), X(52), Y(2290)),
            R(-45, 10, 0, 2035, W('contour')),
            R(0, 885, 8, 955, h.a.plein),
            R(8, 910, 55, 930, h.a.plein),
            h.ellipse(X(76), Y(920), 22 * s, 32 * s, h.a.plein),
            R(-53, 885, -45, 955, h.a.plein),
            R(-100, 910, -53, 930, h.a.plein),
            h.ellipse(X(-121), Y(920), 22 * s, 32 * s, h.a.plein),
            P([[-250, -30], [-95, -30], [-95, -20], [-45, 5], [15, 5], [15, 0], ...plancherEntaille, [1080, 0]], h.a.contour, false),
            P(perche, W('contour')),
            h.fleche(`M${X(-240)} ${Y(1350)} L${X(-58)} ${Y(1350)}`, h.a.arete),
          ].join('\n');
        },
        renvois: z => {
          const { X, Y } = gPerche(z);
          return [
            { n: 8, rond: [X(640), Y(660)], cible: [X(487), Y(442.5)], texte: 'perche d’épinette, calée sous la poignée' },
          ];
        },
      },

      encoche: {
        titre: 'Le pied de la perche',
        dessin: z => {
          const { s, X, Y } = gEnc(z), { P } = outils(s, X, Y, false);
          const tanT = 925 / 970;
          const hautH = 972 - 75 / tanT, hautB = 879 - 55 / tanT;
          return [
            P([[700, 0], ...plancherEntaille, [1060, 0], [1060, -45], [700, -45]], hb('arete')),
            P([[700, 0], ...plancherEntaille, [1060, 0]], h.a.contour, false),
            P([[hautH, 55], [972, -20], [900, -20], [hautB, 55]], h.a.blanc),
            P([[hautH, 55], [972, -20], [900, -20], [hautB, 55]], h.a.contour, false),
            coupure(X(hautB), Y(55), X(hautH), Y(55)),
          ].join('\n');
        },
        renvois: z => {
          const { X, Y } = gEnc(z);
          return [
            { n: 9, rond: [X(1010), Y(34)], cible: [X(972), Y(0)], texte: 'pied calé dans une encoche' },
          ];
        },
      },

      penture: {
        titre: 'Penture, porte qui ouvre dehors',
        dessin: z => {
          const { s, X, Y } = gPen(z), { R, P } = outils(s, X, Y, false);
          const Pr = (pts, a, ferme = true) => P(pts.map(tourne), a, ferme);
          const carre = (x1, y1, x2, y2) => [[x1, y1], [x2, y1], [x2, y2], [x1, y2]];
          return [
            R(-30, 0, 0, 40, hb('fin')),
            P([[-30, 0], [0, 0], [0, 40]], h.a.contour, false),
            // la porte, entrouverte de 30° autour de la broche
            Pr(carre(3, 0, 45, 45), hb('fin')),
            Pr([[45, 0], [3, 0], [3, 45], [45, 45]], h.a.contour, false),
            Pr(carre(3, -2, 6.5, 42), h.a.plein),
            Pr(carre(3, 20, 14, 24), h.a.blanc),
            Pr([[3, 20], [14, 20], [14, 24], [3, 24]], h.a.detail, false),
            R(-3.5, -2, 0, 38, h.a.plein),
            P([[-22, 20.5], [10, 20.5], [10, 23.5], [-22, 23.5], [-27, 22]], h.a.plein),
            h.cercle(X(K[0]), Y(K[1]), 5 * s, W('arete')),
            h.cercle(X(K[0]), Y(K[1]), 1.8 * s, h.a.plein),
            // la porte et le chambranle continuent : lignes de coupure
            (() => { const [ax, ay] = tourne([45, -4]), [bx, by] = tourne([45, 49]); return coupure(X(ax), Y(ay), X(bx), Y(by)); })(),
            coupure(X(-30), Y(-4), X(-30), Y(44)),
            coupure(X(-34), Y(40), X(4), Y(40)),
          ].join('\n');
        },
        renvois: z => {
          const { X, Y } = gPen(z);
          const [bx, by] = tourne([3, 22]);
          return [
            { n: 10, rond: [X(6), Y(48)], cible: [X(7), Y(23.5)], texte: 'clou à tête coupée, dans l’aile' },
            { n: 11, rond: [X(22), Y(48)], cible: [X(bx), Y(by)], texte: 'trou en face, dans l’autre aile' },
          ];
        },
      },
    },
  };
};
