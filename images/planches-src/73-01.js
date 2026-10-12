// Planche 73-01 — la cache de gel sur poteaux (chapitre 68, Le froid naturel).
// Aucune cote : le chapitre ne donne aucune dimension de la cache. L'échelle vient de la
// boîte de conserve (collet, rapiéçage).

const blanc = (a) => a.replace('fill="none"', 'fill="#FFFFFF"');

module.exports = (h) => {
  // Grillage vu sur la tranche : un fil fin ponctué de nœuds.
  const maille = (pts, pas = 5) => {
    const out = [h.chemin(pts, h.a.fin)];
    for (let i = 0; i < pts.length - 1; i++) {
      const [ax, ay] = pts[i], [bx, by] = pts[i + 1];
      const n = Math.max(1, Math.floor(Math.hypot(bx - ax, by - ay) / pas));
      for (let k = 0; k <= n; k++) out.push(h.cercle(ax + (bx - ax) * k / n, ay + (by - ay) * k / n, 1.1, h.a.plein));
    }
    return out.join('\n');
  };
  const paquet = (x, y, l, ht) => [
    h.rect(x, y, l, ht, blanc(h.a.arete)),
    h.ligne(x + l * 0.3, y + 1.5, x + l * 0.3, y + ht - 1.5, h.a.detail),
  ].join('\n');

  // ── Géométrie de la coupe (sud à gauche) ──
  const gc = (z) => {
    const L = z.l, H = z.h;
    const W = Math.min(224, L - 110);
    const x0 = Math.round((L - W) / 2), x1 = x0 + W, t = 10;
    const ySol = H - 22;
    const yF = Math.round(H * 0.46);          // dessus des lattes
    const yS = yF - 100, yN = yF - 128;       // haut des parois sud et nord
    const m = (yN - yS) / (x1 - x0);
    const lid = (x) => yS + m * (x - x0);     // dessous du couvercle
    const xp = [x0 + 2, x1 - 18];             // poteaux, 16 de large
    const yC = Math.round(yF + 25 + (ySol - yF - 25) * 0.42);
    return { L, H, W, x0, x1, t, ySol, yF, yS, yN, m, lid, xp, yC };
  };

  // ── Géométrie du plan (nord en haut) ──
  const gp = (z) => {
    const Bw = 140, Bh = 224, bx0 = 28, bx1 = bx0 + Bw;
    const y0 = Math.round((z.h - Bh) / 2) + 6, y1 = y0 + Bh;
    return { Bw, Bh, bx0, bx1, y0, y1, t: 10 };
  };

  // ── Géométrie du collet ──
  const gk = (z) => {
    const L = z.l, H = z.h;
    const pc = Math.round(L * 0.7), pl = pc - 22, pr = pc + 22;
    const yb = Math.round(H * 0.3), bh = 30;
    return { L, H, pc, pl, pr, yb, bh };
  };

  return {
    ref: '73-01',
    titre: 'La cache de gel sur poteaux',
    desc: 'Cache de gel sur quatre poteaux, en coupe nord-sud et vue de dessus, avec le collet de tôle posé sur chaque poteau et le grillage rapiécé avec des boîtes de conserve aplaties.',
    format: 'pleine',
    disposition: [['coupe', 'plan'], ['collet', 'bardeaux']],
    hauteurs: [3, 2],
    largeurs: [[3, 2], [1, 1]],
    vues: {
      coupe: {
        titre: 'En coupe, le sud à gauche',
        dessin: (z) => {
          const g = gc(z);
          const { L, H, W, x0, x1, t, ySol, yF, yS, yN, lid, xp, yC } = g;
          const out = [];
          // sol enneigé
          out.push(h.rect(0, ySol, L, H - ySol, h.a.hachure('neige', 'aucun')));
          out.push(h.ligne(0, ySol, L, ySol, h.a.arete));
          // poteaux écorcés et collets
          for (const p of xp) {
            out.push(h.rect(p, yF + 25, 16, ySol - yF - 25, blanc(h.a.contour)));
            out.push(h.ligne(p + 5, yF + 31, p + 5, yC - 5, h.a.detail));
            out.push(h.ligne(p + 11, yC + 21, p + 11, ySol - 8, h.a.detail));
            out.push(h.chemin([[p - 1, yC], [p + 17, yC], [p + 23, yC + 15], [p - 7, yC + 15]], blanc(h.a.arete), true));
            out.push(h.cercle(p + 5, yC + 4, 1.3, h.a.plein), h.cercle(p + 11, yC + 4, 1.3, h.a.plein));
          }
          // lambourde, vue derrière le plan de coupe
          out.push(h.rect(x0 - 14, yF + 14, W + 28, 11, blanc(h.a.arete)));
          // grillage : parois et dessous
          out.push(maille([[x0 - 3, yS + 2], [x0 - 3, yF + 11], [x1 + 3, yF + 11], [x1 + 3, yN + 2]]));
          // parois coupées
          out.push(h.rect(x0, yS - 1, t, yF + 8 - yS + 1, h.a.hachure('bois', 'contour')));
          out.push(h.rect(x1 - t, yN - 1, t, yF + 8 - yN + 1, h.a.hachure('bois', 'contour')));
          // lattes coupées
          for (let r = 18; r + 15 <= W - t - 1; r += 22) out.push(h.rect(x0 + r, yF, 15, 8, h.a.hachure('bois', 'arete')));
          // l'air monte entre les poteaux, devant la lambourde, et passe entre les lattes jusque sous la charge
          for (const r of [80.5, 124.5, 168.5]) out.push(h.fleche(`M ${x0 + r} ${yF + 88} L ${x0 + r} ${yF + 3}`, h.a.cache));
          // couvercle, grillage dessus, bâche pâle
          const pA = [x0 - 12, lid(x0 - 12)], pB = [x1 + 2, lid(x1 + 2)];
          out.push(h.chemin([pA, pB, [pB[0], pB[1] - 8], [pA[0], pA[1] - 8]], h.a.hachure('bois', 'contour'), true));
          out.push(maille([[pA[0] + 2, pA[1] - 10.5], [pB[0], pB[1] - 10.5]]));
          out.push(h.path(`M ${pA[0] - 10} ${pA[1] + 26} Q ${pA[0] - 4} ${pA[1] + 6} ${pA[0] - 3} ${pA[1] - 16} L ${pB[0] + 3} ${pB[1] - 16} L ${pB[0] + 4} ${pB[1] - 10}`, h.a.arete));
          // charnière de cuir, côté nord
          out.push(h.rect(x1 + 5, pB[1] - 9, 4, 28, h.a.plein));
          out.push(h.cercle(x1 + 7, pB[1] - 5, 1.1, h.a.blanc), h.cercle(x1 + 7, pB[1] + 14, 1.1, h.a.blanc));
          // moraillon et cadenas, côté sud : la patte part du couvercle, se rabat sur la paroi,
          // le crampon cloué dans la paroi passe dans sa fente et le cadenas s'y accroche
          out.push(h.rect(x0 - 8, lid(x0 - 8), 5, 44, blanc(h.a.arete)));
          out.push(h.path(`M ${x0 - 3} ${yS + 35} h -10 v 5 h 10`, h.a.arete));
          out.push(h.path(`M ${x0 - 14} ${yS + 46} v -5 a 3 3 0 0 1 6 0 v 5`, h.a.arete));
          out.push(h.rect(x0 - 16, yS + 46, 10, 9, blanc(h.a.arete)));
          // thermomètre min-max contre la paroi sud, à mi-hauteur de la pile
          out.push(h.rect(x0 + t, yF - 52, 9, 38, blanc(h.a.arete)));
          out.push(h.path(`M ${x0 + t + 3} ${yF - 47} V ${yF - 22} a 1.5 1.5 0 0 0 3 0 V ${yF - 47}`, h.a.detail));
          // pile de paquets gelés
          const dec = [0, 2, -1, 1, 0];
          for (let k = 0; k < 5; k++) {
            out.push(paquet(x0 + 30 + dec[k], yF - 13 * (k + 1), 29, 13));
            out.push(paquet(x0 + 62 - dec[k], yF - 13 * (k + 1), 29, 13));
          }
          // paquets frais, une couche, espacés
          for (const r of [104, 142, 180]) out.push(paquet(x0 + r, yF - 11, 26, 11));
          return out.join('\n');
        },
        renvois: (z) => {
          const { L, x0, x1, t, yF, yS, yN, xp, yC } = gc(z);
          return [
            { n: 1, rond: [16, yC + 4], cible: [xp[0] - 6, yC + 11], texte: 'collet de tôle au poteau' },
            { n: 2, rond: [x0 + 100, yF - 78], cible: [x0 + 95, yF], texte: 'lattes espacées : l’air monte' },
            { n: 3, rond: [L - 16, yF + 38], cible: [x1 + 4, yF + 12], texte: 'grillage, dessous compris' },
            { n: 4, rond: [L - 16, yN + 5], cible: [x1 + 10, yN + 5], texte: 'charnière : cuir cloué large' },
            { n: 5, rond: [16, yS - 28], cible: [x0 - 17, yS - 2], texte: 'bâche pâle sur le couvercle' },
            { n: 6, rond: [x0 + 30, yF - 90], cible: [x0 + t + 10, yF - 51], texte: 'min-max à hauteur de pile' },
          ];
        },
      },

      plan: {
        titre: 'Vu de dessus, couvercle enlevé',
        dessin: (z) => {
          const { Bw, Bh, bx0, bx1, y0, y1, t } = gp(z);
          const out = [];
          out.push(h.rect(bx0, y0, Bw, Bh, h.a.hachure('bois', 'contour')));
          out.push(h.rect(bx0 + t, y0 + t, Bw - 2 * t, Bh - 2 * t, blanc(h.a.arete)));
          out.push(h.rect(bx0 + t, y0 + t, Bw - 2 * t, Bh - 2 * t, h.a.hachure('grillage', 'aucun')));
          for (let r = 18; r + 15 <= Bh - t - 1; r += 22) out.push(h.rect(bx0 + t, y1 - r - 15, Bw - 2 * t, 15, blanc(h.a.detail)));
          out.push(maille([[bx0 - 3, y0 - 3], [bx1 + 3, y0 - 3], [bx1 + 3, y1 + 3], [bx0 - 3, y1 + 3], [bx0 - 3, y0 - 3]]));
          // paquets frais au nord : une couche, espacés
          for (const r of [104, 142, 180]) for (const c of [13, 55, 97]) out.push(paquet(bx0 + c, y1 - r - 26, 30, 26));
          // pile au sud : chaque tas montre ses paquets décalés dessous
          for (const r of [30, 62]) for (const c of [13, 53, 93]) {
            out.push(h.rect(bx0 + c + 4, y1 - r - 29 + 4, 34, 29, blanc(h.a.detail)));
            out.push(h.rect(bx0 + c + 2, y1 - r - 29 + 2, 34, 29, blanc(h.a.detail)));
            out.push(paquet(bx0 + c, y1 - r - 29, 34, 29));
          }
          // thermomètre sur la paroi sud
          out.push(h.rect(bx0 + 64, y1 - t - 5, 12, 5, blanc(h.a.arete)));
          // témoin de dégel posé sur la pile
          out.push(h.cercle(bx0 + 110, y1 - 78, 8, blanc(h.a.arete)));
          out.push(h.cercle(bx0 + 110, y1 - 78, 6, h.a.detail));
          out.push(h.cercle(bx0 + 111, y1 - 77, 2.4, h.a.plein));
          // nord
          const xn = bx1 + 36;
          out.push(h.ligne(xn, y0 + 48, xn, y0 + 20, h.a.arete));
          out.push(h.chemin([[xn - 5, y0 + 24], [xn, y0 + 11], [xn + 5, y0 + 24]], h.a.plein, true));
          out.push(h.texte(xn, y0 + 4, 'N', { ancre: 'middle' }));
          return out.join('\n');
        },
        renvois: (z) => {
          const { bx0, bx1, y1 } = gp(z);
          return [
            { n: 7, rond: [bx1 + 38, y1 - 155], cible: [bx0 + 128, y1 - 155], texte: 'frais : une couche, espacés' },
            { n: 8, rond: [bx1 + 38, y1 - 44], cible: [bx0 + 132, y1 - 40], texte: 'empilés une fois gelés durs' },
            { n: 9, rond: [bx1 + 38, y1 - 92], cible: [bx0 + 119, y1 - 80], texte: 'tasse gelée, pièce dessus' },
          ];
        },
      },

      collet: {
        titre: 'Le collet de tôle',
        dessin: (z) => {
          const { L, H, pc, pl, pr, yb, bh } = gk(z);
          const out = [];
          // poteau écorcé, coupé en haut et en bas
          out.push(h.ligne(pl, 10, pl, H - 10, h.a.contour), h.ligne(pr, 10, pr, H - 10, h.a.contour));
          out.push(h.path(`M ${pl} 10 q 11 -5 22 0 t 22 0`, h.a.arete));
          out.push(h.path(`M ${pl} ${H - 10} q 11 -5 22 0 t 22 0`, h.a.arete));
          for (const dx of [9, 20, 33]) out.push(h.path(`M ${pl + dx} 14 C ${pl + dx + 3} ${H * 0.35} ${pl + dx - 3} ${H * 0.65} ${pl + dx} ${H - 14}`, h.a.detail));
          out.push(h.ellipse(pl + 27, H * 0.8, 3, 6, h.a.detail));
          // la bande de tôle, rebord évasé vers le bas
          out.push(h.path(`M ${pl - 2} ${yb} Q ${pc} ${yb + 9} ${pr + 2} ${yb} L ${pr + 2} ${yb + bh} L ${pr + 12} ${yb + bh + 14} Q ${pc} ${yb + bh + 26} ${pl - 12} ${yb + bh + 14} L ${pl - 2} ${yb + bh} Z`, blanc(h.a.arete)));
          out.push(h.path(`M ${pl - 2} ${yb + bh} Q ${pc} ${yb + bh + 9} ${pr + 2} ${yb + bh}`, h.a.detail));
          out.push(h.ligne(pc + 14, yb + 7, pc + 14, yb + bh + 8, h.a.arete));
          for (const y of [yb + 12, yb + 20, yb + 28]) out.push(h.cercle(pc + 17, y, 1.8, h.a.plein));
          for (const x of [pl + 6, pc - 6]) out.push(h.cercle(x, yb + 14, 1.8, h.a.plein));
          // la boîte de conserve, ouverte aux deux bouts et fendue
          out.push(h.ellipse(60, 24, 24, 7, blanc(h.a.arete)), h.ellipse(60, 24, 20, 5, h.a.detail));
          out.push(h.ligne(36, 24, 36, 76, h.a.arete), h.ligne(84, 24, 84, 76, h.a.arete));
          out.push(h.path('M 36 76 A 24 7 0 0 0 84 76', h.a.arete));
          for (const y of [42, 58]) out.push(h.path(`M 36 ${y} A 24 7 0 0 0 84 ${y}`, h.a.detail));
          out.push(h.ligne(70, 31, 70, 82, h.a.cache));
          out.push(h.fleche('M 60 92 L 60 116', h.a.arete));
          // déroulée à plat : son tour complet, un peu plus que le tour du poteau
          out.push(h.rect(12, 124, 136, 46, blanc(h.a.arete)));
          for (const y of [139, 155]) out.push(h.ligne(14, y, 146, y, h.a.detail));
          out.push(h.path('M 148 124 q 8 4 7 23 q -1 19 -7 23', h.a.arete));
          return out.join('\n');
        },
        renvois: (z) => {
          const { L, H, pc, pr, yb, bh } = gk(z);
          return [
            { n: 10, rond: [L - 16, H - 50], cible: [pr + 1, H - 50], texte: 'poteau écorcé, bois lisse' },
            { n: 11, rond: [80, 198], cible: [80, 170.6], texte: 'boîte fendue, déroulée' },
            { n: 12, rond: [L - 16, yb + 12], cible: [pc + 19, yb + 13], texte: 'clouée en bande autour' },
            { n: 13, rond: [L - 16, yb + bh + 36], cible: [pr + 13, yb + bh + 15], texte: 'rebord évasé vers le bas' },
          ];
        },
      },

      bardeaux: {
        titre: 'Rapiécer le grillage',
        dessin: (z) => {
          const L = z.l, H = z.h;
          const out = [];
          out.push(h.rect(16, 14, L - 32, H - 28, h.a.hachure('grillage', 'arete')));
          // le trou
          // le trou : la tôle déborde sur le grillage sain tout autour
          out.push(h.path('M 82 60 L 96 44 L 118 50 L 150 38 L 184 46 L 212 42 L 228 62 L 226 120 L 228 164 L 84 166 L 78 120 Z', `fill="#FFFFFF" stroke="#1A1A1A" stroke-width="0.7" stroke-linejoin="round"`));
          for (const [x, y, dx, dy] of [[96, 44, 3, 8], [150, 38, -2, 9], [212, 42, -4, 8], [228, 62, -8, 3], [82, 60, 8, 2]]) out.push(h.ligne(x, y, x + dx, y + dy, h.a.detail));
          // rang du bas, puis rang du dessus décalé qui couvre les clous du premier
          const tole = (x, y) => [
            h.rect(x, y, 64, 40, blanc(h.a.arete)),
            h.ligne(x + 2, y + 13, x + 62, y + 13, h.a.detail),
            h.ligne(x + 2, y + 27, x + 62, y + 27, h.a.detail),
          ].join('\n');
          for (const x of [64, 122, 180]) out.push(tole(x, 136));
          for (const x of [35, 93, 151, 209]) out.push(tole(x, 104));
          for (const x of [35, 93, 151, 209]) for (const dx of [10, 32, 54]) out.push(h.cercle(x + dx, 109, 1.8, h.a.plein));
          return out.join('\n');
        },
        renvois: (z) => {
          const L = z.l;
          return [
            { n: 14, rond: [34, 180], cible: [63, 164], texte: 'boîte fendue, aplatie' },
            { n: 15, rond: [L - 34, 72], cible: [242, 107], texte: 'clous le long du bord haut' },
            { n: 16, rond: [30, 152], cible: [64, 145], texte: 'rang du dessus sur les clous' },
          ];
        },
      },
    },
  };
};
