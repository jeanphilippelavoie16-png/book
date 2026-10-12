// Planche 101-07 — le tablier de grillage au pied du mur (ch. 78, §B point 6, et point 14).
// Cotes : 30 cm au moins, 5 cm de terre au moins (ch. 78, §5-B étape 6, [À VÉRIFIER] n° 3 levé le 23 septembre 2026).
module.exports = (h) => {
  const zig = (x1, y1, x2, y2) => {   // les points d'un trait de rupture en zigzag
    const dx = x2 - x1, dy = y2 - y1, n = 4, pts = [];
    for (let i = 0; i <= n * 2; i++) {
      const t = i / (n * 2), s = i % 2 ? 3 : -3;
      pts.push([x1 + dx * t - (dy ? s : 0), y1 + dy * t + (dx ? s : 0)]);
    }
    return pts;
  };
  const rupture = (x1, y1, x2, y2, at = h.a.fin) => h.chemin(zig(x1, y1, x2, y2), at);
  const blanc = h.a.arete.replace('fill="none"', 'fill="#FFFFFF"');
  // pierre plate vue de dessus, entre deux joints [x haut, x milieu, x bas] ; coupe = bord tranché par la rupture
  const pierrePlate = (G, D, haut, bas, k, coupe = false) => {
    const j = 1.3, m = (haut + bas) / 2, cx = (G[1] + D[1]) / 2;
    const [a, b, c, d] = [[5, 2, 7, 3], [3, 6, 2, 6], [7, 3, 5, 2]][k];   // coins cassés, un par pierre
    const pts = coupe
      ? [[G[0], haut + 1], [cx - 2, haut + 1.2], [D[0] - j - b, haut], [D[0] - j, haut + b], [D[1] - j, m], [D[2] - j, bas - c],
         [D[2] - j - c, bas], [cx + 3, bas + 1], [G[2], bas - 0.6]]
      : [[G[0] + j + a, haut + 0.4], [cx + 3, haut + 1.2], [D[0] - j - b, haut], [D[0] - j, haut + b], [D[1] - j, m - 6], [D[2] - j, bas - c],
         [D[2] - j - c, bas], [cx - 2, bas + 1], [G[2] + j + d, bas - 0.6], [G[2] + j, bas - d], [G[1] + j, m + 5], [G[0] + j, haut + a]];
    const fente = [
      `M${cx - 6},${bas - 22} L${cx - 1},${bas - 15} L${cx + 1},${bas - 8}`,
      `M${cx + 5},${haut + 10} L${cx},${haut + 18} L${cx + 2},${haut + 27}`,
      `M${cx - 5},${m - 4} L${cx + 2},${m + 3}`,
    ][k];
    return h.chemin(pts, blanc.replace('stroke-linejoin="round"', 'stroke-linejoin="miter"'), true) + h.path(fente, h.a.detail);
  };
  // repères communs au dessin et aux renvois
  const geoCoupe = z => {
    const wx = 88, T = 204, g = z.h - 82;
    return { wx, g, fin: wx + T, my: g + Math.round(T / 6) + 1 };   // terre dessus = le sixième du tablier
  };
  const geoPlan = () => {
    const wx = 108, wy = 100, W = 64;
    return { wx, wy, W, bx: wx + 1, by: wy + 1, s: 34, r: 64 };      // s : la couture · r : la rupture de l'arraché
  };

  return {
    ref: '101-07',
    titre: 'Le tablier de grillage contre les bêtes qui creusent',
    desc: 'Au pied du mur du poulailler ou du clapier, le grillage descend le long du mur, crampé jusqu’en bas, se plie à angle droit et se couche à plat vers l’extérieur sur au moins 30 cm, sous au moins 5 cm de terre ou de gravier ; sur le roc, des pierres plates à touche-touche le tiennent ; deux restes de grillage se cousent l’un à l’autre au fil de fer.',
    format: 'demi',
    disposition: [['coupe', 'plan']],
    largeurs: [[3, 2]],
    vues: {
      coupe: {
        titre: 'En coupe, au pied du mur',
        dessin: z => {
          const { g, wx, my, fin } = geoCoupe(z);
          const out = [];
          // le sol, tranché sous le tablier
          out.push(h.rect(0, g, z.l, my + 14 - g, h.a.hachure('terre', 'aucun')));
          out.push(h.ligne(0, g, z.l, g, h.a.arete));
          // la pierre d'assise sous la lisse
          out.push(h.path(`M${wx - 56},${g - 10} L${wx - 6},${g - 10} C${wx - 2},${g} ${wx - 4},${g + 12} ${wx - 12},${g + 16} L${wx - 50},${g + 16} C${wx - 60},${g + 10} ${wx - 60},${g - 2} ${wx - 56},${g - 10} Z`,
            h.a.hachure('pierre', 'arete')));
          // la lisse, le plancher, la planche du mur
          out.push(h.rect(wx - 46, g - 40, 36, 30, h.a.hachure('bois')));
          out.push(h.rect(14, g - 48, wx - 24, 8, h.a.hachure('bois')));
          out.push(rupture(14, g - 52, 14, g - 36));
          out.push(h.rect(wx - 10, 14, 10, g - 22, h.a.hachure('bois')));
          out.push(rupture(wx - 14, 14, wx + 4, 14));
          // le grillage : collé au mur, passe sous le sol, plié à angle droit, couché à plat sous la terre remise
          const gx = wx + 1.5, trace = [[gx, 26], [gx, my], [fin, my]];
          out.push(h.chemin([[gx, g + 1], [gx, my], [fin, my]], 'fill="none" stroke="#FFFFFF" stroke-width="7" stroke-linejoin="miter"'));
          out.push(h.chemin(trace, h.a.contour.replace('stroke-linejoin="round"', 'stroke-linejoin="miter"')));
          for (let y = 30; y < my - 6; y += 9) out.push(h.cercle(gx, y, 1.7, h.a.plein));
          for (let x = wx + 10; x <= fin; x += 9) out.push(h.cercle(x, my, 1.7, h.a.plein));
          // trois crampes, la dernière au bas de la planche : aucun jour entre le mur et le grillage
          [36, 76, g - 13].forEach(y => out.push(h.rect(wx - 5, y - 1, 11, 2.4, h.a.plein)));
          // les cotes : largeur du tablier depuis le nu du mur, terre par-dessus
          const yc = my + 24, xc = fin - 26;
          out.push(h.ligne(wx, my + 4, wx, yc - 6, h.a.fin), h.ligne(fin, my + 4, fin, yc - 6, h.a.fin));
          out.push(h.cote(wx, yc, fin, yc, '30 cm au moins', { cote: 'dessous' }));
          out.push(h.cote(xc, g, xc, my - 1.2, '5 cm au moins', { cote: 'gauche' }));
          return out.join('\n');
        },
        renvois: z => {
          const { g, wx, my } = geoCoupe(z);
          return [
            { n: 1, rond: [wx + 52, 40], cible: [wx + 4, 56], texte: 'grillage descendu le long du mur, crampé jusqu’en bas' },
            { n: 2, rond: [wx + 44, g - 34], cible: [wx + 4, my - 3], texte: 'plié à angle droit, vers l’extérieur' },
            { n: 3, rond: [wx + 100, g - 46], cible: [wx + 70, g + 17], texte: 'recouvert de terre ou de gravier grossier' },
          ];
        },
      },
      plan: {
        titre: 'Vu de dessus, un coin',
        dessin: z => {
          const { wx, wy, W, bx, by, s, r } = geoPlan(z);
          const out = [];
          // le tablier en L autour du coin : le grillage, à nu au bout du bras de la couture et sous les pierres
          out.push(h.rect(bx, 8, W, r - 4, h.a.hachure('grillage', 'aucun')));
          out.push(h.rect(8, by, bx - 6, W, h.a.hachure('grillage', 'aucun')));
          // l'arraché : au-delà du trait de rupture, la terre remise recouvre le tablier jusqu'au coin
          const terre = [...zig(bx, r, bx + W, r), [bx + W, by + W], [bx, by + W]];
          out.push(h.chemin(terre, h.a.blanc, true));
          out.push(h.chemin(terre, h.a.hachure('terre', 'aucun'), true));
          out.push(h.chemin([[bx + W, 8], [bx + W, by + W], [8, by + W]], h.a.contour));
          // les murs du bâtiment
          out.push(h.rect(wx - 10, 8, 10, wy - 8, h.a.hachure('bois')));
          out.push(h.rect(8, wy - 10, wx - 8, 10, h.a.hachure('bois')));
          out.push(rupture(bx, r, bx + W, r, h.a.detail));
          // la couture : deux restes qui se chevauchent, cousus au fil de fer
          out.push(h.ligne(bx, s - 7, bx + W, s - 7, h.a.arete));
          out.push(h.ligne(bx, s + 7, bx + W, s + 7, h.a.arete));
          for (let i = 0; i <= 8; i++) {
            const x = bx + 6 + (W - 12) * i / 8;
            out.push(h.ligne(x - 3, s - 9, x + 3, s + 9, h.a.arete));
          }
          // sur le roc : une rangée de pierres plates à touche-touche, sur toute la largeur du tablier
          const haut = by + 1.5, bas = by + W + 3;
          const joints = [[8, 8, 8], [35, 31, 33], [70, 74, 71], [bx + 2, bx + 3, bx + 1]];
          for (let i = 0; i < 3; i++) out.push(pierrePlate(joints[i], joints[i + 1], haut, bas, i, i === 0));
          // les coupes de la vue
          out.push(rupture(wx - 10, 8, bx + W, 8));
          out.push(rupture(8, wy - 10, 8, bas));
          return out.join('\n');
        },
        renvois: z => {
          const { W, bx, by, s } = geoPlan(z);
          return [
            { n: 4, rond: [bx + W + 22, by + W + 22], cible: [bx + W + 1, by + W + 1], texte: 'tablier sur tout le tour' },
            { n: 5, rond: [bx + W + 24, s + 22], cible: [bx + W - 4, s + 6], texte: 'deux restes cousus au fil de fer' },
            { n: 6, rond: [53, by + W + 22], cible: [53, by + W - 14], texte: 'sur le roc : pierres plates à touche-touche' },
          ];
        },
      },
    },
  };
};
