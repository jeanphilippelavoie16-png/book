// Planche 31-01 — La bécosse à fosse sèche. Chapitre 28, section C (étapes 13 à 20, 23)
// et variante d'urgence « La bécosse devient un trou et une planche » (siège, couvercle, colonne).
module.exports = (h) => {
  const blanc = (t) => t.replace('fill="none"', 'fill="#ffffff"');
  const zigzag = (x, y1, y2) => {
    const pts = []; const pas = 10; let g = true;
    for (let y = y1; y <= y2; y += pas) { pts.push([x + (g ? -2.5 : 2.5), y]); g = !g; }
    return h.chemin(pts, h.a.fin);
  };

  return {
    ref: '31-01',
    titre: 'La bécosse à fosse sèche',
    desc: 'Bécosse à fosse sèche. En coupe : fosse de 1,2 m garnie de planches ajourées en bas et serrées en haut, fond à 60 cm au-dessus du roc, soubassement posé sur le sol ferme hors du bord, plancher étanche, siège fermé, tertre qui rechausse le bas de l’abri, encoche du niveau plein à 40 cm, colonne qui part de la fosse et dépasse le toit de 60 cm. Vu de dessus : fosse de 1,2 × 1 m dans son cadre de soubassement. La colonne : caisson de quatre planches clouées, joints calfeutrés, moustiquaire ficelée au sommet. Le siège : planche de 5 cm percée d’une couronne de trous, arête cassée, couvercle à charnière de cuir.',
    format: 'pleine',
    disposition: [['coupe', 'colonne'], ['plan', 'siege']],
    hauteurs: [2, 1],
    largeurs: [[3, 2], [1, 1]],
    vues: {
      // ── En coupe ─────────────────────────────────────────────────────────────────────
      coupe: {
        titre: 'En coupe',
        dessin: z => {
          const s = 78;                       // px par mètre
          const yg = 231;                      // surface du sol
          const pxL = 123, pxR = pxL + 1.2 * s; // fosse, 1,2 m
          const yF = yg + 1.2 * s;             // fond
          const yMid = yg + 0.6 * s;           // mi-hauteur
          const yRoc = yg + 1.8 * s;           // roc
          const sbT = yg - 8;                  // dessus du soubassement
          const plT = sbT - 4;                 // dessus du plancher
          const wL = 103, wR = 237, e = 4;     // abri
          const yWL = plT - 2.1 * s, yWR = plT - 1.9 * s;
          const pente = (yWR - yWL) / (wR - wL);
          const toit = x => yWL + pente * (x - wL);
          const xc = 205, lc = 8;              // colonne 10 cm
          const colBas = yg + 11;
          const toitCol = toit(xc + lc / 2) - 5;
          const colHaut = toitCol - 0.6 * s;
          const out = [];

          // sol et roc
          out.push(h.chemin([[55, yg], [69, yg], [wL, yg - 17], [wL, yg], [wR, yg], [wR, yg - 17], [271, yg], [272, yg], [272, yRoc], [55, yRoc]], h.a.hachure('terre', 'fin'), true));
          out.push(h.rect(55, yRoc, 217, 16, h.a.hachure('pierre', 'fin')));
          out.push(h.ligne(55, yRoc, 272, yRoc, h.a.arete));
          // la fosse vide
          out.push(h.rect(pxL, yg, pxR - pxL, yF - yg, h.a.blanc));
          // paroi du fond, vue en élévation : serrée en haut, ajourée en bas
          for (let y = yg + 11.7; y < yMid; y += 11.7) out.push(h.ligne(pxL + 3, y, pxR - 3, y, h.a.detail));
          out.push(h.ligne(pxL + 3, yMid, pxR - 3, yMid, h.a.detail));
          const bas = [[yMid, yMid + 9], [yMid + 13, yMid + 22], [yMid + 26, yMid + 35], [yMid + 39, yF]];
          for (let i = 0; i < bas.length - 1; i++) {
            out.push(h.rect(pxL + 3, bas[i][1], pxR - pxL - 6, bas[i + 1][0] - bas[i][1], h.a.hachure('terre', 'detail')));
          }
          // parois coupées : planches serrées en haut, ajourées en bas
          out.push(h.rect(pxL, yg, 3, yMid - yg, blanc(h.a.arete)));
          out.push(h.rect(pxR - 3, yg, 3, yMid - yg, blanc(h.a.arete)));
          for (const [a, b] of bas) {
            out.push(h.rect(pxL, a, 3, b - a, blanc(h.a.arete)));
            out.push(h.rect(pxR - 3, a, 3, b - a, blanc(h.a.arete)));
          }
          // le tas sous le siège
          const tas = `M ${pxL + 30} ${yF} Q ${pxL + 62} ${yF - 30} ${pxR - 3} ${yF - 6} L ${pxR - 3} ${yF} Z`;
          out.push(h.path(tas, h.a.blanc), h.path(tas, h.a.hachure('gravier', 'detail')));
          // encoche du niveau plein, à 40 cm
          out.push(h.ligne(pxR - 10, yg + 0.4 * s, pxR, yg + 0.4 * s, h.a.contour));
          // bord de la fosse
          out.push(h.chemin([[pxL, yg], [pxL, yF], [pxR, yF], [pxR, yg]], h.a.contour));
          out.push(h.ligne(wL + 8, yg, pxL, yg, h.a.arete), h.ligne(pxR, yg, wR - 8, yg, h.a.arete));
          // surface du tertre
          out.push(h.chemin([[55, yg], [69, yg], [wL, yg - 17]], h.a.contour));
          out.push(h.chemin([[wR, yg - 17], [271, yg], [272, yg]], h.a.contour));

          // soubassement 10 × 10, coupé
          for (const x of [wL, wR - 8]) {
            out.push(h.rect(x, sbT, 8, 8, blanc(h.a.arete)));
            out.push(h.path(`M ${x} ${sbT} L ${x + 8} ${sbT + 8} M ${x + 8} ${sbT} L ${x} ${sbT + 8}`, h.a.detail));
          }
          // plancher, percé sous le siège et pour la colonne
          const trou = [175, 199];
          for (const [a, b] of [[wL, trou[0]], [trou[1], xc], [xc + lc, wR]]) out.push(h.rect(a, plT, b - a, 4, h.a.hachure('bois')));
          // murs, avec la moustiquaire du haut
          out.push(h.rect(wL, yWL + 32, e, plT - yWL - 32, h.a.hachure('bois')));
          out.push(h.rect(wL, toit(wL), e, 12, h.a.hachure('bois')));
          out.push(h.ligne(wL + 2, toit(wL) + 12, wL + 2, yWL + 32, h.a.cache));
          out.push(h.rect(wR - e, yWR + 32, e, plT - yWR - 32, h.a.hachure('bois')));
          out.push(h.rect(wR - e, toit(wR), e, 12, h.a.hachure('bois')));
          out.push(h.ligne(wR - 2, toit(wR) + 12, wR - 2, yWR + 32, h.a.cache));
          // toit qui déborde
          out.push(h.chemin([[80, toit(80)], [260, toit(260)], [260, toit(260) - 5], [80, toit(80) - 5]], h.a.hachure('bois', 'contour'), true));
          // siège : caisson, planche percée, couvercle fermé
          const yS = plT - 0.45 * s;
          out.push(h.rect(160, yS + 4, 4, plT - yS - 4, h.a.hachure('bois')));
          out.push(h.rect(160, yS, trou[0] - 160, 4, h.a.hachure('bois')));
          out.push(h.rect(trou[1], yS, wR - e - trou[1], 4, h.a.hachure('bois')));
          out.push(h.rect(trou[0] - 4, yS - 4, trou[1] - trou[0] + 8, 4, h.a.hachure('bois')));
          // colonne de 10 cm, de la fosse jusqu'au-dessus du toit
          out.push(h.rect(xc, colHaut, lc, colBas - colHaut, blanc(h.a.arete)));
          out.push(h.rect(xc - 2, colHaut - 5, lc + 4, 7, h.a.hachure('grillage', 'detail')));
          out.push(h.ligne(xc - 2, colHaut, xc + lc + 2, colHaut, h.a.arete));

          // cotes
          out.push(h.ligne(pxR, yg + 0.4 * s, 324, yg + 0.4 * s, h.a.fin));
          out.push(h.ligne(272, yg, 342, yg, h.a.fin));
          out.push(h.ligne(pxR, yF, 342, yF, h.a.fin));
          out.push(h.ligne(272, yRoc, 342, yRoc, h.a.fin));
          out.push(h.cote(320, yg, 320, yg + 0.4 * s, '40 cm', { cote: 'gauche' }));
          out.push(h.cote(338, yg, 338, yF, '1,2 m', { cote: 'gauche' }));
          out.push(h.cote(338, yF, 338, yRoc, '60 cm', { cote: 'gauche' }));
          out.push(h.ligne(xc + lc, colHaut, xc + lc + 20, colHaut, h.a.fin));
          out.push(h.ligne(xc + lc, toitCol, xc + lc + 20, toitCol, h.a.fin));
          out.push(h.cote(xc + lc + 16, colHaut, xc + lc + 16, toitCol, '60 cm', { cote: 'droite' }));
          return out.join('\n');
        },
        renvois: z => [
          { n: 1, rond: [30, 296], cible: [122, 296], texte: 'planches ajourées en bas' },
          { n: 2, rond: [30, 252], cible: [122, 252], texte: 'planches serrées en haut' },
          { n: 3, rond: [30, 208], cible: [102, 227], texte: 'soubassement, hors du bord' },
          { n: 4, rond: [134, 190], cible: [134, 218], texte: 'plancher, fentes bouchées' },
          { n: 5, rond: [300, 196], cible: [262, 226], texte: 'tertre qui rechausse le bas' },
          { n: 6, rond: [178, 262], cible: [206, 262], texte: 'encoche du niveau plein' },
        ],
      },

      // ── La colonne ───────────────────────────────────────────────────────────────────
      colonne: {
        titre: 'La colonne',
        dessin: z => {
          const k = 8;                         // px par cm
          const ep = 2 * k, int = 10 * k, L = int + 2 * ep;
          const x0 = Math.round((z.l - L) / 2);
          const out = [];
          // élévation du sommet
          const yT = 40, yB = 200;
          const casse = [[x0 + L, yB - 2], [x0 + L * 0.6, yB + 4], [x0 + L * 0.3, yB - 5], [x0, yB]];
          out.push(h.chemin([[x0, yT], [x0 + L, yT], ...casse], h.a.hachure('bois', 'detail'), true));
          out.push(h.chemin([[x0, yB], [x0, yT], [x0 + L, yT], [x0 + L, yB - 2]], h.a.contour));
          for (let y = 84; y < yB; y += 34) {
            out.push(h.rect(x0 + ep / 2 - 1.5, y, 3, 3, h.a.plein), h.rect(x0 + L - ep / 2 - 1.5, y, 3, 3, h.a.plein));
          }
          // moustiquaire rabattue et ficelée
          const m = `M ${x0 - 5} ${yT + 26} L ${x0 - 5} ${yT - 4} Q ${x0 + L / 2} ${yT - 12} ${x0 + L + 5} ${yT - 4} L ${x0 + L + 5} ${yT + 24} L ${x0 + L * 0.7} ${yT + 28} L ${x0 + L * 0.35} ${yT + 25} Z`;
          out.push(h.path(m, h.a.blanc), h.path(m, h.a.hachure('grillage', 'arete')));
          out.push(h.ligne(x0 - 6, yT + 13, x0 + L + 6, yT + 13, h.a.contour));
          out.push(h.ligne(x0 - 6, yT + 18, x0 + L + 6, yT + 18, h.a.arete));
          out.push(h.path(`M ${x0 + L + 6} ${yT + 15} q 8 6 4 20 M ${x0 + L + 6} ${yT + 15} q 12 2 14 14`, h.a.arete));

          // coupe du caisson
          const yS = 250;
          const pl = [
            [x0, yS, L, ep], [x0, yS + ep + int, L, ep],
            [x0, yS + ep, ep, int], [x0 + L - ep, yS + ep, ep, int],
          ];
          for (const [x, y, l, ht] of pl) out.push(h.rect(x, y, l, ht, h.a.hachure('bois', 'arete')));
          out.push(h.rect(x0, yS, L, L, h.a.contour));
          // clous
          for (const x of [x0 + ep / 2, x0 + L - ep / 2]) {
            out.push(h.rect(x - 1, yS + 2, 2, ep + 14, h.a.plein));
            out.push(h.rect(x - 1, yS + L - ep - 16, 2, ep + 14, h.a.plein));
          }
          // joints calfeutrés
          for (const [x, y] of [[x0, yS + ep], [x0 + L, yS + ep], [x0, yS + ep + int], [x0 + L, yS + ep + int]]) {
            out.push(h.ellipse(x, y, 3.5, 5.5, h.a.plein));
          }
          out.push(h.cote(x0 + ep, yS + ep + int / 2, x0 + ep + int, yS + ep + int / 2, '10 cm', { cote: 'dessus' }));
          return out.join('\n');
        },
        renvois: z => {
          const L = 112, x0 = Math.round((z.l - L) / 2);
          return [
            { n: 7, rond: [z.l - 18, 30], cible: [x0 + L + 6, 44], texte: 'moustiquaire ficelée' },
            { n: 8, rond: [z.l - 18, 306], cible: [x0 + L + 1, 306], texte: 'quatre planches clouées' },
            { n: 9, rond: [18, 236], cible: [x0 - 4, 263], texte: 'joints à la mousse' },
          ];
        },
      },

      // ── Vu de dessus ─────────────────────────────────────────────────────────────────
      plan: {
        titre: 'Vu de dessus, plancher enlevé',
        dessin: z => {
          const s = 88;
          const W = 1.7 * s, H = 1.5 * s, t = 0.1 * s, r = 0.15 * s;
          const x0 = Math.round((z.l - W) / 2) - 18, y0 = 12;
          const fx = x0 + t + r, fy = y0 + t + r, fl = 1.2 * s, fh = 1.0 * s;
          const out = [];
          // cadre de soubassement
          out.push(h.rect(x0, y0, W, t, h.a.hachure('bois')));
          out.push(h.rect(x0, y0 + H - t, W, t, h.a.hachure('bois')));
          out.push(h.rect(x0, y0 + t, t, H - 2 * t, h.a.hachure('bois')));
          out.push(h.rect(x0 + W - t, y0 + t, t, H - 2 * t, h.a.hachure('bois')));
          // fosse et sa paroi de planches
          out.push(h.rect(fx, fy, fl, fh, h.a.contour));
          out.push(h.rect(fx + 3, fy + 3, fl - 6, fh - 6, h.a.detail));
          // trou du siège au-dessus, et la colonne dans le coin
          out.push(h.cercle(fx + fl - 0.38 * s, fy + fh / 2, 13, h.a.cache));
          const cx = fx + fl - 3 - 1 - t, cy = fy + 4;
          out.push(h.rect(cx, cy, t, t, blanc(h.a.arete)));
          out.push(h.rect(cx + 2, cy + 2, t - 4, t - 4, h.a.detail));
          // cotes
          out.push(h.ligne(fx, fy + fh, fx, y0 + H + 20, h.a.fin), h.ligne(fx + fl, fy + fh, fx + fl, y0 + H + 20, h.a.fin));
          out.push(h.cote(fx, y0 + H + 16, fx + fl, y0 + H + 16, '1,2 m', { cote: 'dessous' }));
          out.push(h.ligne(fx + fl, fy, x0 + W + 26, fy, h.a.fin), h.ligne(fx + fl, fy + fh, x0 + W + 26, fy + fh, h.a.fin));
          out.push(h.cote(x0 + W + 22, fy, x0 + W + 22, fy + fh, '1 m', { cote: 'droite' }));
          return out.join('\n');
        },
        renvois: z => [],
      },

      // ── Le siège ─────────────────────────────────────────────────────────────────────
      siege: {
        titre: 'Le siège et son couvercle',
        dessin: z => {
          const out = [];
          // planche vue de dessus, percée en couronne
          out.push(h.rect(10, 34, 124, 110, h.a.hachure('bois', 'arete')));
          const cx = 72, cy = 89, R = 32, n = 21;
          for (let i = 0; i < n; i++) {
            const a = (i / n) * 2 * Math.PI;
            out.push(h.cercle(cx + R * Math.cos(a), cy + R * Math.sin(a), 4, blanc(h.a.arete)));
          }
          // planche en coupe : 5 cm, arête cassée au bord du trou
          const yS = 120, ep = 16;
          out.push(h.path(`M 180 ${yS} L 206 ${yS} Q 211 ${yS} 211 ${yS + 5} L 211 ${yS + ep} L 180 ${yS + ep} Z`, h.a.hachure('bois', 'arete')));
          out.push(h.path(`M 283 ${yS} L 256 ${yS} Q 251 ${yS} 251 ${yS + 5} L 251 ${yS + ep} L 283 ${yS + ep} Z`, h.a.hachure('bois', 'arete')));
          out.push(h.cote(174, yS, 174, yS + ep, '5 cm', { cote: 'gauche' }));
          // couvercle soulevé, pivotant sur sa charnière de cuir
          const px = 262, py = yS - ep;
          const c = Math.cos(28 * Math.PI / 180), sn = Math.sin(28 * Math.PI / 180);
          const rot = ([x, y]) => [px + (x - px) * c - (y - py) * sn, py + (x - px) * sn + (y - py) * c];
          out.push(h.chemin([[196, py], [px, py], [px, py + ep], [196, py + ep]].map(rot), h.a.hachure('bois', 'arete'), true));
          out.push(h.chemin([[246, py], [px, py]].map(rot), h.a.contour));
          out.push(h.chemin([[249, py - 3.2], [252, py - 3.2], [252, py - 0.2], [249, py - 0.2]].map(rot), h.a.plein, true));
          out.push(h.path(`M ${px} ${py} C ${px + 5} ${py + 2} ${px + 5} ${yS - 4} ${px + 6} ${yS} L 283 ${yS}`, h.a.contour));
          out.push(h.rect(274, yS - 3.2, 3, 3, h.a.plein));
          return out.join('\n');
        },
        renvois: z => [
          { n: 10, rond: [20, 16], cible: [47, 63], texte: 'couronne de trous de mèche' },
          { n: 11, rond: [100, 172], cible: [84, 106], texte: 'rond sorti au ciseau' },
          { n: 12, rond: [226, 168], cible: [209.5, 121.5], texte: 'arête cassée à la lime' },
          { n: 13, rond: [205, 40], cible: [232, 88], texte: 'couvercle, même planche' },
          { n: 14, rond: [278, 72], cible: [267, 110], texte: 'charnière de cuir de botte' },
        ],
      },
    },
  };
};
