// Planche 107-03 — Trois cordons en coupe (ch. 84, §5.6 et §7).
// Deux plats bout à bout, tranchés en travers du cordon. Le métal des plats est hachuré, le
// métal fondu est blanc : là où le blanc mord dans la hachure, le cordon est entré dans la pièce.
module.exports = (h) => {
  // Géométrie commune aux trois vues.
  const geo = (z) => {
    const t = 60;                         // épaisseur des plats
    const c = z.l / 2;
    const ys = z.h / 2 - t / 2 + 4;       // surface du dessus
    return { t, c, ys, yb: ys + t, x0: 6, x1: z.l - 6, g: 3, w: 96, hc: 10, rw: 16 };
  };
  const zig = (x, y0, W, a) => [[x, y0], [x, y0 + 0.38 * W], [x - a, y0 + 0.46 * W], [x + a, y0 + 0.54 * W], [x, y0 + 0.62 * W], [x, y0 + W]];

  // Le sillon du caniveau : part de la surface, plonge, et son fond est le pied du cordon.
  // Le flanc du cordon fait la paroi intérieure du sillon (pas de crochet sous le pied).
  const GW = 18, DT = 9;                  // largeur du sillon ; son creux, où s'arrête le pied du cordon
  const sillon = (G, sens) => {
    const toe = G.c + sens * G.w / 2;
    const P = [[toe + sens * GW, G.ys], [toe + sens * GW * 0.5, G.ys], [toe + sens * GW * 0.12, G.ys + DT], [toe, G.ys + DT]];
    const pts = [];
    for (let i = 0; i <= 12; i++) {
      const s = i / 12, u = 1 - s, k = [u * u * u, 3 * u * u * s, 3 * u * s * s, s * s * s];
      pts.push([0, 1].map(j => k.reduce((a, kk, m) => a + kk * P[m][j], 0)));
    }
    return pts;
  };

  // Un plat (sens -1 : celui de gauche ; +1 : celui de droite). Le dessus peut porter un sillon.
  const plat = (G, sens, caniveau) => {
    const xe = sens < 0 ? G.x0 : G.x1;          // bout cassé
    const xi = G.c + sens * G.g / 2;            // bord du joint
    const dessus = caniveau ? [[xe, G.ys], ...sillon(G, sens), [xi, G.ys + DT]] : [[xe, G.ys], [xi, G.ys]];
    const vis = [...dessus, [xi, G.yb], [xe, G.yb]];
    const poly = [...vis, ...zig(xe, G.ys, G.t, 4).reverse().slice(1)];
    return [
      h.chemin(poly, h.a.hachure('metal'), true),
      h.chemin(vis, h.a.contour),
    ];
  };
  const plats = (G, caniveau) => [...plat(G, -1, caniveau), ...plat(G, 1, caniveau)];

  // Le bon cordon : dessus légèrement bombé qui se raccorde en douceur, fusion qui descend
  // dans les deux plats jusqu'à la racine, petit bourrelet dessous.
  const fondu = (G, dt = 0) => {
    const L = G.c - G.w / 2, R = G.c + G.w / 2, r = G.rw / 2;
    // dt > 0 (caniveau) : le pied descend au fond du sillon, le dessus plus plat.
    const { yb, c, hc, t } = G, ys = G.ys + dt, yc = G.ys - (dt ? hc * 0.6 : hc), kp = dt ? 0.05 : 0.18;
    const dessus = `M ${L} ${ys} C ${L + G.w * kp} ${G.ys} ${c - G.w * 0.28} ${yc} ${c} ${yc} C ${c + G.w * 0.28} ${yc} ${R - G.w * kp} ${G.ys} ${R} ${ys}`;
    const fusD = `C ${R - 3} ${ys + t * 0.45} ${c + r + 7} ${yb - 9} ${c + r} ${yb}`;
    const racine = `Q ${c} ${yb + 9} ${c - r} ${yb}`;
    const fusG = `C ${c - r - 7} ${yb - 9} ${L + 3} ${ys + t * 0.45} ${L} ${ys}`;
    return [
      h.path(`${dessus} ${fusD} ${racine} ${fusG} Z`, h.a.blanc),
      h.path(dessus, h.a.contour),
      h.path(`M ${R} ${ys} ${fusD}`, h.a.arete),
      h.path(`M ${c + r} ${yb} ${racine}`, h.a.contour),
      h.path(`M ${c - r} ${yb} ${fusG}`, h.a.arete),
    ];
  };
  // Point de la ligne de fusion de droite, à mi-épaisseur (pour la pastille).
  const surFusion = (G) => {
    const R = G.c + G.w / 2, r = G.rw / 2, s = 0.4, u = 1 - s;
    const P = [[R, G.ys], [R - 3, G.ys + G.t * 0.45], [G.c + r + 7, G.yb - 9], [G.c + r, G.yb]];
    const k = [u * u * u, 3 * u * u * s, 3 * u * s * s, s * s * s];
    return [0, 1].map(i => k.reduce((a, kk, j) => a + kk * P[j][i], 0));
  };

  // Le cordon pas fondu : un boudin posé sur la surface, les flancs qui débordent en surplomb.
  const boudin = (G) => {
    const { c, ys } = G, b = 28, hb = 30;
    const d = `M ${c - b} ${ys} C ${c - b - 16} ${ys - 2} ${c - b - 13} ${ys - hb} ${c} ${ys - hb} C ${c + b + 13} ${ys - hb} ${c + b + 16} ${ys - 2} ${c + b} ${ys} Z`;
    return [h.path(d, h.a.contour.replace('fill="none"', 'fill="#fff"'))];
  };

  const G0 = (z) => geo(z);
  return {
    ref: '107-03',
    titre: 'Trois cordons en coupe',
    desc: 'Deux plats d’acier soudés bout à bout, tranchés en travers du cordon, trois fois. À gauche, le bon cordon : un dessus à peine bombé qui se raccorde en douceur aux deux plats, et le métal fondu qui descend dans les deux pièces jusqu’en dessous. Au milieu, le manque de fusion : un boudin rond posé sur la surface, les flancs en surplomb, les bords nets ; dessous, les deux plats et le jour entre eux sont restés intacts. À droite, le caniveau : le cordon est entré dans la pièce, mais un sillon est creusé dans chaque plat le long de son bord.',
    format: 'demi',
    disposition: [['sain', 'froid', 'caniveau']],
    vues: {
      sain: {
        titre: 'Bon',
        dessin: z => { const G = G0(z); return [...plats(G, false), ...fondu(G)].join('\n'); },
        renvois: z => {
          const G = G0(z);
          return [{ n: 1, rond: [G.c + 64, G.yb + 36], cible: surFusion(G), texte: 'fondu dans les deux pièces' }];
        },
      },
      froid: {
        titre: 'Manque de fusion',
        dessin: z => { const G = G0(z); return [...plats(G, false), ...boudin(G)].join('\n'); },
        renvois: z => {
          const G = G0(z);
          return [{ n: 2, rond: [G.c - 72, G.ys - 40], cible: [G.c - 28 - 12, G.ys - 10], texte: 'bords nets, posé sur la surface' }];
        },
      },
      caniveau: {
        titre: 'Caniveau',
        dessin: z => { const G = G0(z); return [...plats(G, true), ...fondu(G, DT)].join('\n'); },
        renvois: z => {
          const G = G0(z);
          const s = sillon(G, -1);
          return [{ n: 3, rond: [G.c - 74, G.ys - 40], cible: s[8], texte: 'sillon creusé le long du bord' }];
        },
      },
    },
  };
};
