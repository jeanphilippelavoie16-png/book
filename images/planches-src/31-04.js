// Planche 31-04 — Le piège à graisse à deux chaudières (ch. 28, « Le piège à graisse fabriqué »)
module.exports = (h) => {
  const N = '#1A1A1A', B = '#FFFFFF';
  const geo = (z) => {
    const G = z.h - 12;                       // plancher
    const H = Math.min(z.h - 66, 230);        // hauteur d'une chaudière
    const wt = H * 0.84, wb = wt * 0.84;      // largeur en haut, au fond
    const yT = G - H;
    const x1 = z.l * 0.34, x2 = x1 + wt + 72;
    const w = (y) => wb / 2 + (wt / 2 - wb / 2) * (G - y) / H;   // demi-largeur à la hauteur y
    const yc = yT + 0.22 * H;                 // traversée du boyau
    const yS = yc + 2;                        // surface dans la première
    const yG = yS + 0.11 * H;                 // dessous de la graisse
    const yF = G - 0.15 * H;                  // dessus des solides
    const yM = G - 0.5 * H;                   // bouche du boyau
    const y2S = G - 0.42 * H;                 // surface dans la seconde
    const hx = x1 + wt * 0.2;                 // branche montante du boyau
    return { G, H, wt, wb, yT, x1, x2, w, yc, yS, yG, yF, yM, y2S, hx };
  };
  // tranche de contenu entre ya et yb, qui suit la dépouille de la chaudière
  const couche = (g, c, ya, yb, at) => h.chemin([
    [c - g.w(ya) + 1.2, ya], [c + g.w(ya) - 1.2, ya], [c + g.w(yb) - 1.2, yb], [c - g.w(yb) + 1.2, yb],
  ], at, true);
  const chaudiere = (g, c) => [
    h.chemin([[c - g.wt / 2, g.yT], [c - g.wb / 2, g.G], [c + g.wb / 2, g.G], [c + g.wt / 2, g.yT]], h.a.contour),
    h.rect(c - g.wt / 2 - 5, g.yT - 1, 5, 8, h.a.plein),     // bourrelet du bord
    h.rect(c + g.wt / 2, g.yT - 1, 5, 8, h.a.plein),
  ].join('\n');

  return {
    ref: '31-04',
    titre: 'Le piège à graisse à deux chaudières',
    desc: 'Deux chaudières côte à côte, vues en coupe. La première reçoit l’eau de vaisselle : la graisse figée flotte en galette sur le dessus, les solides reposent au fond. Un bout de boyau a sa bouche à mi-hauteur, dans l’eau claire entre les deux couches ; il monte, traverse la paroi près du bord et se déverse dans la seconde chaudière. Une cuillère lève la galette.',
    format: 'demi',
    disposition: [['coupe']],
    vues: {
      coupe: {
        dessin: (z) => {
          const g = geo(z);
          const { G, H, wt, yT, x1, x2, yc, yS, yG, yF, yM, y2S, hx } = g;
          // dessus des solides, bosselé
          const n = 9, sol = [];
          for (let i = 0; i <= n; i++) {
            const y = yF + (i % 2 ? 4 : -3) + (i === 0 || i === n ? 5 : 0);
            const x = x1 - g.w(y) + 1.2 + (2 * g.w(y) - 2.4) * i / n;
            sol.push([x, y]);
          }
          sol.push([x1 + g.wb / 2 - 1.2, G - 1.2], [x1 - g.wb / 2 + 1.2, G - 1.2]);
          // interface graisse / eau, irrégulière
          const itf = [];
          for (let i = 0; i <= 8; i++) {
            const y = yG + (i % 2 ? 2.5 : -2);
            itf.push([x1 - g.w(y) + 1.2 + (2 * g.w(y) - 2.4) * i / 8, y]);
          }
          // boyau : bouche à mi-hauteur, monte, traverse près du bord, entre dans la seconde
          const R = 16, r = 7.5, xe = x2 - g.w(yc) + 16;
          const paroiExt = `M ${hx - r} ${yM} L ${hx - r} ${yc + R} A ${R + r} ${R + r} 0 0 1 ${hx + R} ${yc - r} L ${xe} ${yc - r}`;
          const paroiInt = `M ${hx + r} ${yM} L ${hx + r} ${yc + R} A ${R - r} ${R - r} 0 0 1 ${hx + R} ${yc + r} L ${xe} ${yc + r}`;
          const creux = `${paroiExt} L ${xe} ${yc + r} L ${hx + R} ${yc + r} A ${R - r} ${R - r} 0 0 0 ${hx + r} ${yc + R} L ${hx + r} ${yM} Z`;
          // cuillère qui lève la galette, penchée de 32°
          const bx = x1 - wt * 0.12, by = yS - 9, a = -32 * Math.PI / 180;
          const P = (dx, dy) => [bx + dx * Math.cos(a) - dy * Math.sin(a), by + dx * Math.sin(a) + dy * Math.cos(a)];
          const pts = (l) => l.map(([dx, dy]) => P(dx, dy));
          const d = (l) => l.map((p, i) => `${i ? 'L' : 'M'} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
          const bol = [], motte = [];
          for (let i = 0; i <= 12; i++) { const t = Math.PI * i / 12; bol.push([-20 * Math.cos(t), 9 * Math.sin(t)]); }
          for (let i = 0; i <= 12; i++) { const t = Math.PI * i / 12; motte.push([-17 * Math.cos(t), -8 * Math.sin(t) * (1 - 0.25 * Math.sin(3 * t))]); }
          const manche = pts([[20, -1.5], [104, -4.5], [106, -2], [104, 0.5], [20, 1.5]]);
          const xp = x1 - wt * 0.37;
          return [
            h.ligne(x1 - wt / 2 - 40, G, x2 + wt / 2 + 40, G, h.a.arete),
            // première chaudière : eau, graisse, solides
            couche(g, x1, yG, yF + 4, h.a.hachure('eau', 'aucun')),
            couche(g, x1, yS, yG, h.a.hachure('neige', 'aucun')),
            h.chemin(sol, h.a.hachure('gravier', 'aucun'), true),
            h.chemin(sol.slice(0, n + 1), h.a.detail),
            h.chemin(itf, h.a.detail),
            h.ligne(x1 - g.w(yS) + 1.2, yS, x1 + g.w(yS) - 1.2, yS, h.a.arete),
            chaudiere(g, x1),
            // seconde chaudière : eau dégraissée, anse levée
            couche(g, x2, y2S, G - 1.2, h.a.hachure('eau', 'aucun')),
            h.ligne(x2 - g.w(y2S) + 1.2, y2S, x2 + g.w(y2S) - 1.2, y2S, h.a.arete),
            chaudiere(g, x2),
            h.cercle(x2 - wt / 2 - 3, yT + 14, 3, h.a.arete),
            h.cercle(x2 + wt / 2 + 3, yT + 14, 3, h.a.arete),
            h.path(`M ${x2 - wt / 2 - 3} ${yT + 14} C ${x2 - wt / 2 - 3} ${yT - 0.4 * wt} ${x2 + wt / 2 + 3} ${yT - 0.4 * wt} ${x2 + wt / 2 + 3} ${yT + 14}`, h.a.detail),
            // le boyau en coupe : deux parois, intérieur blanc, bouts ouverts
            h.path(creux, h.a.blanc),
            h.path(paroiExt, h.a.arete),
            h.path(paroiInt, h.a.arete),
            // l'eau : versée, aspirée par la bouche, déversée dans la seconde
            h.fleche(`M ${xp - 14} ${yT - 40} Q ${xp - 2} ${yT - 20} ${xp + 2} ${yS - 6}`, h.a.cache),
            h.fleche(`M ${hx - 30} ${yM + 26} Q ${hx} ${yM + 26} ${hx} ${yM + 6}`, h.a.cache),
            h.fleche(`M ${xe + 2} ${yc} Q ${xe + 20} ${yc + 2} ${xe + 24} ${y2S - 5}`, h.a.cache),
            // la cuillère
            h.path(d(pts(bol)) + ' Z', h.a.blanc),
            h.path(d(pts(motte)) + ' Z', h.a.hachure('neige', 'detail')),
            h.path(d(pts(bol)), h.a.arete),
            h.chemin(manche, h.a.plein, true),
            h.chemin(manche, h.a.detail, true),
          ].join('\n');
        },
        renvois: (z) => {
          const g = geo(z);
          const { G, H, wt, yT, x1, x2, yS, yG, yF, yM, y2S, hx } = g;
          const xp = x1 - wt * 0.37, ym = (yS + yG) / 2;
          return [
            { n: 1, rond: [xp - 40, yT - 38], cible: [xp - 12, yT - 37], texte: 'eau de vaisselle, chaudière de 20 L' },
            { n: 2, rond: [x1 - wt / 2 - 32, ym - 10], cible: [x1 - g.w(ym) + 14, ym], texte: 'graisse figée, levée à la cuillère' },
            { n: 3, rond: [(x1 + g.w(yM) + x2 - g.w(yM)) / 2, yM + 30], cible: [hx + 8, yM + 4], texte: 'bout de boyau, bouche à mi-hauteur' },
            { n: 4, rond: [x1 - wt / 2 - 32, G - 0.08 * H], cible: [x1 - g.w(G - 0.07 * H) + 18, G - 0.07 * H], texte: 'solides tombés au fond' },
            { n: 5, rond: [x2 + wt / 2 + 34, y2S + 28], cible: [x2 + g.w(y2S + 28) - 14, y2S + 28], texte: 'eau dégraissée, vers le puits absorbant' },
          ];
        },
      },
    },
  };
};
