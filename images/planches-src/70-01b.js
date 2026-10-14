// Planche 70-01b — deuxième page du fumoir à froid (la page a, 65-01, est la coupe de profil).
// Même fumoir, mêmes mesures de dessin que la coupe : trou à feu de 82 à 150, tranchée de
// 150 à 500, chambre de 440 à 585 (parois de 9), plancher percé de 468 à 500, sortie du toit
// de 518 à 552, registre de 480 à 538, bâton de 453 à 572, pièces centrées à 480, 512, 544.
// Seule la longueur de la tranchée n'est pas cotée : elle est [À VÉRIFIER] au chapitre.
// La charte : plans à plat sans gris ; en travers, le vide de la tranchée en gris loin (on la voit
// filer). Le rouge : la fuite de fumée à reboucher, et le jeu entre la pièce et la paroi.
// La fumée et le vent restent en noir.

module.exports = (h) => {
  const f = (v) => Math.round(v * 10) / 10;
  const d = (P, liste, ferme = false) =>
    liste.map(([x, y], i) => `${i ? 'L' : 'M'}${f(P(x, y)[0])} ${f(P(x, y)[1])}`).join(' ') + (ferme ? ' Z' : '');

  return {
    ref: '70-01b',
    titre: 'Le fumoir à froid, vu de dessus et en détail',
    desc: "Trois vues du même fumoir que la coupe de la page précédente. Vu de dessus : le trou à feu rond, large comme une chaudière, fermé d'une tôle carrée posée à plat, sous laquelle on devine en tireté le rebord et les trois bûches ; seule une entaille d’entrée d’air, ouverte de côté face au vent, passe sous la tôle ; de lui part une butte de terre allongée, en talus, sous laquelle la tranchée court en tireté jusque sous le plancher de la chambre ; un filet de fumée s'échappe d'un point du talus ; la chambre carrée en planches, toit fermé, porte une tôle glissée à moitié sur la sortie du haut. La tranchée en travers : un vide carré creusé dans le sol, aussi profond que large, d'un avant-bras ; une tôle posée à plat sur ses deux bords ; de la terre tassée en butte par-dessus. La chambre, toit enlevé : quatre parois de planches, un taquet le long de chaque côté, trois bâtons ligaturés sur les taquets, trois pièces pendues à chaque bâton sans se toucher ni toucher la paroi, et en dessous, en tireté, le trou du plancher par où arrive la fumée.",
    format: 'pleine',
    disposition: [['plan'], ['travers', 'chambre']],
    hauteurs: [1, 1.12],
    largeurs: [[1], [1, 1.1]],
    vues: {
      // ── Vu de dessus : la disposition au sol ─────────────────────────────────────────
      plan: {
        titre: 'Vu de dessus',
        dessin: (z) => {
          const s = 1.05, ox = (z.l - 503 * s) / 2, oy = 116;
          const P = (x, y) => [ox + (x - 82) * s, oy + y * s];
          const X = (x) => P(x, 0)[0], Y = (y) => P(0, y)[1];
          const o = [];

          // butte de terre sur la tranchée : bord, puis traits de talus
          const bord = (sg) =>
            `M${f(X(142))} ${f(Y(22 * sg))} C${f(X(162))} ${f(Y(40 * sg))} ${f(X(182))} ${f(Y(60 * sg))} ${f(X(215))} ${f(Y(60 * sg))} L${f(X(440))} ${f(Y(60 * sg))}`;
          o.push(h.path(bord(-1), h.a.arete), h.path(bord(1), h.a.arete));
          let ticks = '';
          for (let x = 224, k = 0; x <= 432; x += 13, k++) {
            const lg = k % 2 ? 6 : 12;
            ticks += `M${f(X(x))} ${f(Y(-60))} L${f(X(x))} ${f(Y(-60 + lg))} M${f(X(x))} ${f(Y(60))} L${f(X(x))} ${f(Y(60 - lg))} `;
          }
          o.push(h.path(ticks, h.a.detail));

          // la fumée suit la tranchée, cachée sous la butte (la tranchée est tracée en dernier)
          o.push(h.fleche(d(P, [[232, 0], [352, 0]])));

          // trou à feu fermé d’une tôle : l'air n'entre que par l'entaille, la fumée n'a que la
          // tranchée. Ouvert, le trou tire droit en l'air et la chambre ne reçoit presque rien.
          o.push(h.rect(X(76), Y(-40), 80 * s, 80 * s, h.a.blanc), h.rect(X(76), Y(-40), 80 * s, 80 * s, h.a.contour));
          const r = 34 * s;
          o.push(h.path(`M${f(X(125))} ${f(Y(32.8))} A${f(r)} ${f(r)} 0 1 0 ${f(X(107))} ${f(Y(32.8))}`, h.a.cache));
          o.push(h.path(d(P, [[107, 32.8], [107, 40]]) + ' ' + d(P, [[125, 32.8], [125, 40]]), h.a.cache));
          o.push(h.path(d(P, [[107, 40], [107, 80]]) + ' ' + d(P, [[125, 40], [125, 80]]), h.a.contour));
          o.push(h.path(d(P, [[107, 80], [125, 80]]), h.a.arete));
          // bûches au fond : deux dessous, une par-dessus
          const buche = (x0, y0, lg) => {
            const [a, b] = P(x0, y0), l = 17 * s, L = lg * s, q = 4 * s;
            return `M${f(a + q)} ${f(b)} L${f(a + l - q)} ${f(b)} Q${f(a + l)} ${f(b)} ${f(a + l)} ${f(b + q)} L${f(a + l)} ${f(b + L - q)} Q${f(a + l)} ${f(b + L)} ${f(a + l - q)} ${f(b + L)} L${f(a + q)} ${f(b + L)} Q${f(a)} ${f(b + L)} ${f(a)} ${f(b + L - q)} L${f(a)} ${f(b + q)} Q${f(a)} ${f(b)} ${f(a + q)} ${f(b)} Z`;
          };
          o.push(h.path(buche(94.5, -24, 44), h.a.cache), h.path(buche(112, -19, 42), h.a.cache));
          o.push(h.path(buche(103.25, -17, 42), h.a.blanc), h.path(buche(103.25, -17, 42), h.a.cache));
          // le vent entre par l'entaille
          o.push(h.fleche(d(P, [[116, 130], [116, 88]])));
          o.push(h.ligne(X(82), Y(-4), X(82), Y(-56), h.a.fin));
          o.push(h.ligne(X(150), Y(-4), X(150), Y(-56), h.a.fin));
          o.push(h.cote(X(82), Y(-50), X(150), Y(-50), 'une chaudière', { cote: 'dessus' }));

          // trait de coupe mixte en travers de la butte : repère la vue « La tranchée en travers »,
          // flèches vers le trou à feu (sens de vue)
          o.push(h.ligne(X(290), Y(-82), X(290), Y(82), 'fill="none" stroke="#1A1A1A" stroke-width="0.7" stroke-dasharray="14 3 2 3"'));
          o.push(h.path(d(P, [[290, -82], [290, -74]]) + ' ' + d(P, [[290, 74], [290, 82]]), h.a.arete));
          o.push(h.fleche(d(P, [[290, -82], [272, -82]])), h.fleche(d(P, [[290, 82], [272, 82]])));

          // fuite : un filet de fumée sort du talus
          o.push(h.fleche(`M${f(X(330))} ${f(Y(-44))} c7.5 -6 -5 -12.5 2.5 -20 c7.5 -6 -5 -12.5 2.5 -20`));
          // le point à surveiller : là où la butte laisse fuir
          o.push(h.controle(X(330) + 1, Y(-44) - 1, 10));

          // chambre, toit fermé : planches du toit, sortie, registre
          o.push(h.rect(X(440), Y(-72.5), 145 * s, 145 * s, h.a.blanc));
          let joints = '';
          for (const x of [464.2, 488.3, 512.5, 536.7, 560.8]) {
            if (x > 478 && x < 540) joints += d(P, [[x, -72.5], [x, -24]]) + ' ' + d(P, [[x, 24], [x, 72.5]]) + ' ';
            else joints += d(P, [[x, -72.5], [x, 72.5]]) + ' ';
          }
          o.push(h.path(joints, h.a.detail));
          o.push(h.rect(X(538), Y(-17), 14 * s, 34 * s, h.a.plein));
          o.push(h.path(d(P, [[538, -17], [552, -17], [552, 17], [538, 17]]), h.a.arete));
          o.push(h.rect(X(480), Y(-24), 58 * s, 48 * s, h.a.blanc));
          o.push(h.rect(X(480), Y(-24), 58 * s, 48 * s, h.a.arete));
          o.push(h.rect(X(440), Y(-72.5), 145 * s, 145 * s, h.a.contour));
          // la tranchée, cachée sous la butte puis sous le toit, jusqu'à la remontée (468 à 500)
          o.push(h.path(d(P, [[142, -22], [500, -22], [500, 22], [142, 22]]), h.a.cache));
          return o.join('\n');
        },
        renvois: (z) => {
          const s = 1.05, ox = (z.l - 503 * s) / 2, oy = 116;
          const X = (x) => ox + (x - 82) * s, Y = (y) => oy + y * s;
          return [
            { n: 1, rond: [22, Y(58)], cible: [X(96), Y(40) + 1.5], texte: "trou à feu fermé d’une tôle" },
            { n: 2, rond: [X(160), Y(100)], cible: [X(125) + 1.5, Y(72)], texte: "entaille d’entrée d’air, face au vent" },
            { n: 3, rond: [X(468), Y(100)], cible: [X(468), Y(22) + 1.5], texte: 'la tranchée finit sous le plancher' },
            { n: 4, rond: [X(509), Y(-94)], cible: [X(509), Y(-24) - 1.5], texte: 'registre : tôle glissée sur la sortie' },
            { n: 5, rond: [X(372), Y(-94)], cible: [X(330) + 6, Y(-44) - 39], texte: 'fumée qui fuit : remettre de la terre' },
          ];
        },
      },

      // ── La tranchée en travers ───────────────────────────────────────────────────────
      travers: {
        titre: 'La tranchée en travers',
        dessin: (z) => {
          const s = 2, cx = z.l / 2, gy = z.h * 0.42;
          const T = (x, y) => [cx + x * s, gy + y * s];
          const o = [];
          // sol en place, creusé du vide
          o.push(h.path(d(T, [[-66, 0], [-22, 0], [-22, 44], [22, 44], [22, 0], [66, 0], [66, 68], [-66, 68]], true), h.a.hachure('terre', 'aucun')));
          // terre tassée par-dessus la tôle
          const [ax, ay] = T(-60, 0), [bx, by] = T(-45, -4), [c1x, c1y] = T(-38, -33), [ex, ey] = T(-28, -35);
          const [fx, fy] = T(28, -35), [g1x, g1y] = T(38, -33), [g2x, g2y] = T(45, -4), [kx, ky] = T(60, 0);
          const dessus = `M${f(ax)} ${f(ay)} C${f(bx)} ${f(by)} ${f(c1x)} ${f(c1y)} ${f(ex)} ${f(ey)} L${f(fx)} ${f(fy)} C${f(g1x)} ${f(g1y)} ${f(g2x)} ${f(g2y)} ${f(kx)} ${f(ky)}`;
          o.push(h.path(dessus + ' ' + d(T, [[32, 0], [32, -3], [-32, -3], [-32, 0]]).replace(/^M/, 'L') + ' Z', h.a.hachure('terre', 'aucun')));
          o.push(h.path(dessus, h.a.arete));
          // sol d'origine sous la butte
          o.push(h.path(d(T, [[-60, 0], [-32, 0]]) + ' ' + d(T, [[32, 0], [60, 0]]), h.a.detail));
          o.push(h.path(d(T, [[-66, 0], [-60, 0]]) + " " + d(T, [[60, 0], [66, 0]]), h.a.arete));
          // la tôle, à plat sur les deux bords
          o.push(h.rect(T(-32, -3)[0], T(-32, -3)[1], 64 * s, 3 * s, h.a.blanc));
          o.push(h.rect(T(-32, -3)[0], T(-32, -3)[1], 64 * s, 3 * s, h.a.arete));
          // le vide où passe la fumée : on voit la tranchée filer au loin, en gris loin
          o.push(h.path(d(T, [[-22, 0], [-22, 44], [22, 44], [22, 0]], true), h.a.loin));
          o.push(h.path(d(T, [[-22, 0], [-22, 44], [22, 44], [22, 0]]), h.a.contour));
          // cotes : largeur sous le fond, profondeur du fond au dessous de la tôle
          o.push(h.ligne(T(-22, 46)[0], T(-22, 46)[1], T(-22, 58)[0], T(-22, 58)[1], h.a.fin));
          o.push(h.ligne(T(22, 46)[0], T(22, 46)[1], T(22, 58)[0], T(22, 58)[1], h.a.fin));
          o.push(h.fleche(d(T, [[0, 54], [-21.5, 54]]), h.a.detail), h.fleche(d(T, [[0, 54], [21.5, 54]]), h.a.detail));
          o.push(h.texte(T(0, 54)[0], T(0, 54)[1] + 16, 'un avant-bras', { lisere: true }));
          o.push(h.ligne(T(24, 0)[0], T(24, 0)[1], T(36, 0)[0], T(36, 0)[1], h.a.fin));
          o.push(h.ligne(T(24, 44)[0], T(24, 44)[1], T(36, 44)[0], T(36, 44)[1], h.a.fin));
          o.push(h.fleche(d(T, [[32, 22], [32, 0.5]]), h.a.detail), h.fleche(d(T, [[32, 22], [32, 43.5]]), h.a.detail));
          o.push(h.texte(T(36, 22)[0] + 4, T(36, 22)[1] + 4, 'un avant-bras', { ancre: 'start', lisere: true }));
          return o.join('\n');
        },
        renvois: (z) => {
          const s = 2, cx = z.l / 2, gy = z.h * 0.42;
          const T = (x, y) => [cx + x * s, gy + y * s];
          return [
            { n: 6, rond: [T(-58, -40)[0], T(-58, -40)[1]], cible: [T(-30, -3)[0], T(-30, -3)[1] - 1] , texte: 'tôle, écorce ou pierres plates' },
            { n: 7, rond: [T(56, -42)[0], T(56, -42)[1]], cible: [T(36, -30)[0], T(36, -30)[1] - 1.5], texte: 'terre tassée : scelle et refroidit' },
          ];
        },
      },

      // ── La chambre, toit enlevé ──────────────────────────────────────────────────────
      chambre: {
        titre: 'La chambre, toit enlevé',
        dessin: (z) => {
          const s = 1.6, ox = z.l - 20 - 145 * s, oy = z.h / 2;
          const C = (x, y) => [ox + (x - 440) * s, oy + y * s];
          const o = [];
          // parois de planches coupées à hauteur des bâtons
          o.push(h.path(d(C, [[440, -72.5], [585, -72.5], [585, 72.5], [440, 72.5]], true) + ' ' + d(C, [[449, -63.5], [576, -63.5], [576, 63.5], [449, 63.5]], true),
            h.a.hachure('bois', 'aucun') + ' fill-rule="evenodd"'));
          o.push(h.path(d(C, [[440, -72.5], [585, -72.5], [585, 72.5], [440, 72.5]], true), h.a.contour));
          o.push(h.path(d(C, [[449, -63.5], [576, -63.5], [576, 63.5], [449, 63.5]], true), h.a.arete));
          // trou du plancher, en dessous
          o.push(h.path(d(C, [[468, -22], [500, -22], [500, 22], [468, 22]], true), h.a.cache));
          // taquets le long des deux côtés
          o.push(h.path(d(C, [[449, -63.5], [455, -63.5], [455, 63.5], [449, 63.5]]), h.a.arete));
          o.push(h.path(d(C, [[576, -63.5], [570, -63.5], [570, 63.5], [576, 63.5]]), h.a.arete));
          for (const y of [-40, 0, 40]) {
            // pièces vues du dessus, pendues sous le bâton
            for (const c of [480, 512, 544]) {
              const [x1, yy] = C(c - 9, y), [x2] = C(c + 9, y), [xc] = C(c, y), e = 4.5 * s;
              const lent = `M${f(x1)} ${f(yy)} Q${f(xc)} ${f(yy - 2 * e)} ${f(x2)} ${f(yy)} Q${f(xc)} ${f(yy + 2 * e)} ${f(x1)} ${f(yy)} Z`;
              o.push(h.path(lent, h.a.blanc), h.path(lent, h.a.arete));
            }
            // bâton
            const [bx, by] = C(451, y - 1.5);
            o.push(h.rect(bx, by, 123 * s, 3 * s, h.a.blanc), h.rect(bx, by, 123 * s, 3 * s, h.a.arete));
            // ligatures de babiche sur chaque taquet
            let lig = '';
            for (const x0 of [449.6, 570.6]) {
              for (let k = 0; k < 3; k++) {
                const [p1x, p1y] = C(x0 + k * 1.9, y - 3.2), [p2x, p2y] = C(x0 + k * 1.9 + 1.2, y + 3.2);
                lig += `M${f(p1x)} ${f(p1y)} L${f(p2x)} ${f(p2y)} `;
              }
            }
            o.push(h.path(lig, h.a.detail));
          }
          // le jeu à vérifier : la pièce ne touche ni sa voisine ni la paroi
          { const [cx, cy] = C(561.5, 40); o.push(h.controle(cx, cy, 11)); }
          return o.join('\n');
        },
        renvois: (z) => {
          const s = 1.6, ox = z.l - 20 - 145 * s, oy = z.h / 2;
          const C = (x, y) => [ox + (x - 440) * s, oy + y * s];
          const top = C(0, -72.5)[1], bas = C(0, 72.5)[1];
          return [
            { n: 8, rond: [16, C(0, 20)[1]], cible: [C(468, 0)[0], C(0, 20)[1]], texte: 'trou du plancher, sur la tranchée' },
            { n: 9, rond: [C(528, 0)[0], top - 20], cible: [C(528, 0)[0], C(0, -41.5)[1] - 1], texte: 'bâton de bois franc écorcé' },
            { n: 10, rond: [16, top - 14], cible: [C(450.5, 0)[0], C(0, -43.5)[1]], texte: 'ligaturé à la babiche posée mouillée' },
            { n: 11, rond: [C(512, 0)[0], bas + 20], cible: [C(512, 0)[0], C(0, 44.5)[1] + 1.5], texte: 'chaque pièce libre de tous côtés' },
          ];
        },
      },
    },
  };
};
