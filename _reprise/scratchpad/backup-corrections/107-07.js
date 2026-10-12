// Planche 107-07 — L'éclisse boulonnée (ch. 84, variante d'urgence B).
module.exports = (h) => {
  // Le plat fissuré, vu de face, dans une vue z. Renvoie sa géométrie.
  const plat = (z) => {
    const x0 = 16, x1 = z.l - 16;
    const W = Math.min(z.h * 0.46, 72);
    const y0 = (z.h - W) / 2 + 4;
    const c = z.l / 2;
    return { x0, x1, W, y0, c };
  };
  const zig = (x, y0, W, a) => [[x, y0], [x, y0 + 0.38 * W], [x - a, y0 + 0.46 * W], [x + a, y0 + 0.54 * W], [x, y0 + 0.62 * W], [x, y0 + W]];
  const fissure = (c, y0, W) => [[c + 1, y0 + 0.18 * W], [c - 3, y0 + 0.3 * W], [c + 2, y0 + 0.41 * W], [c - 2, y0 + 0.52 * W], [c + 3, y0 + 0.63 * W], [c - 1, y0 + 0.73 * W], [c + 1, y0 + 0.82 * W]];
  const contact = (cx, cy, r, rond) => {
    const dx = rond[0] - cx, dy = rond[1] - cy, n = Math.hypot(dx, dy);
    return [cx + dx / n * r, cy + dy / n * r];
  };
  const dessinPlat = (g) => [
    h.chemin([[g.x0, g.y0], [g.x1, g.y0]], h.a.contour),
    h.chemin([[g.x0, g.y0 + g.W], [g.x1, g.y0 + g.W]], h.a.contour),
    h.chemin(zig(g.x0, g.y0, g.W, 5), h.a.arete),
    h.chemin(zig(g.x1, g.y0, g.W, 5), h.a.arete),
  ];
  // Éclisse et boulons dans la vue de face.
  const eclisse = (g) => {
    const L = 0.62 * (g.x1 - g.x0);
    const pres = 0.3 * L / 2, loin = 0.72 * L / 2;
    const haut = g.y0 + 0.3 * g.W, bas = g.y0 + 0.7 * g.W;
    const boulons = [[g.c - loin, haut], [g.c - pres, bas], [g.c + pres, haut], [g.c + loin, bas]];
    return { L, ex0: g.c - L / 2, ey0: g.y0 + 5, eh: g.W - 10, boulons };
  };
  const plein = (t) => t.replace('fill="none"', 'fill="#fff"');
  const hexa = (cx, cy, r) => h.chemin([0, 1, 2, 3, 4, 5].map(i => [cx + r * Math.cos(Math.PI / 6 + i * Math.PI / 3), cy + r * Math.sin(Math.PI / 6 + i * Math.PI / 3)]), h.a.arete, true);

  return {
    ref: '107-07',
    titre: 'L’éclisse boulonnée',
    desc: 'Réparer un plat d’acier fissuré sans souder. D’abord un trou percé à chaque bout de la fissure. Puis une plaque de ferraille posée à cheval sur la cassure, tenue par deux boulons de chaque côté, décalés, jamais en ligne dans l’axe de la fissure. En coupe, la contreplaque de l’autre côté, le plat pris en sandwich et les boulons qui traversent les trois épaisseurs.',
    format: 'demi',
    disposition: [['avant', 'pose'], ['coupe']],
    hauteurs: [3, 2],
    vues: {
      avant: {
        titre: 'Percer les bouts de la fissure',
        dessin: z => {
          const g = plat(z);
          const f = fissure(g.c, g.y0, g.W);
          return [
            ...dessinPlat(g),
            h.chemin(f, h.a.arete),
            h.cercle(f[0][0], f[0][1], 4, plein(h.a.arete)),
            h.cercle(f[6][0], f[6][1], 4, plein(h.a.arete)),
          ].join('\n');
        },
        renvois: z => {
          const g = plat(z);
          const f = fissure(g.c, g.y0, g.W);
          const rond = [g.c + 46, g.y0 - 20];
          return [{ n: 1, rond, cible: contact(f[0][0], f[0][1], 4, rond), texte: 'trou d’arrêt à chaque bout' }];
        },
      },
      pose: {
        titre: 'L’éclisse posée',
        dessin: z => {
          const g = plat(z);
          const f = fissure(g.c, g.y0, g.W);
          const e = eclisse(g);
          return [
            ...dessinPlat(g),
            h.rect(e.ex0, e.ey0, e.L, e.eh, plein(h.a.contour)),
            h.chemin(f, h.a.cache),
            h.cercle(f[0][0], f[0][1], 4, h.a.cache),
            h.cercle(f[6][0], f[6][1], 4, h.a.cache),
            ...e.boulons.map(([x, y]) => h.cercle(x, y, 8.5, plein(h.a.detail))),
            ...e.boulons.map(([x, y]) => hexa(x, y, 6)),
          ].join('\n');
        },
        renvois: z => {
          const g = plat(z);
          const e = eclisse(g);
          const r2 = [e.ex0 - 4, g.y0 - 20];
          const b = e.boulons[3];
          const r3 = [b[0] + 26, g.y0 + g.W + 16];
          return [
            { n: 2, rond: r2, cible: [e.ex0 + 14, g.y0 + g.W / 2], texte: 'éclisse à cheval sur la cassure' },
            { n: 3, rond: r3, cible: contact(b[0], b[1], 8.5, r3), texte: 'deux boulons décalés par côté' },
          ];
        },
      },
      coupe: {
        titre: 'En coupe',
        dessin: z => {
          const x0 = 20, x1 = z.l - 20, c = z.l / 2;
          const L = 0.62 * (x1 - x0);
          const te = 10, tp = 12, tc = 10;
          const y = (z.h - (te + tp + tc)) / 2 + 2;
          const yp = y + te, yc = y + te + tp, yb = yc + tc;
          const e0 = c - L / 2, e1 = c + L / 2;
          // Le plat, en deux morceaux de part et d'autre de la fissure.
          const fis = [[c + 2, yp], [c - 3, yp + tp * 0.35], [c + 3, yp + tp * 0.65], [c - 2, yc]];
          const zz = (x) => [[x, yc], [x, yp + tp * 0.6], [x - 3, yp + tp * 0.5], [x + 3, yp + tp * 0.4], [x, yp]];
          const g2 = [...zz(x0), ...fis.map(([a, b]) => [a - 2.5, b])];
          const d2 = [...zz(x1), ...fis.map(([a, b]) => [a + 2.5, b])];
          const pres = 0.3 * L / 2, loin = 0.72 * L / 2;
          const xs = [c - loin, c - pres, c + pres, c + loin];
          const boulon = (x) => {
            const d = 8, t = 18, lr = 22;
            return [
              h.rect(x - d / 2, y - 3, d, (yb + 3 + 9 + 6) - (y - 3), plein(h.a.arete)),
              h.rect(x - lr / 2, y - 3, lr, 3, plein(h.a.arete)),
              h.rect(x - t / 2, y - 11, t, 8, plein(h.a.arete)),
              h.ligne(x - t / 6, y - 11, x - t / 6, y - 3, h.a.detail),
              h.ligne(x + t / 6, y - 11, x + t / 6, y - 3, h.a.detail),
              h.rect(x - lr / 2, yb, lr, 3, plein(h.a.arete)),
              h.rect(x - t / 2, yb + 3, t, 9, plein(h.a.arete)),
              h.ligne(x - t / 6, yb + 3, x - t / 6, yb + 12, h.a.detail),
              h.ligne(x + t / 6, yb + 3, x + t / 6, yb + 12, h.a.detail),
              h.ligne(x - d / 2, yb + 14, x + d / 2, yb + 14, h.a.detail),
              h.ligne(x - d / 2, yb + 16.5, x + d / 2, yb + 16.5, h.a.detail),
            ].join('\n');
          };
          return [
            h.chemin(g2, h.a.hachure('metal'), true),
            h.chemin(d2, h.a.hachure('metal'), true),
            h.rect(e0, y, L, te, h.a.hachure('metal', 'contour')),
            h.rect(e0, yc, L, tc, h.a.hachure('metal', 'contour')),
            ...xs.map(boulon),
          ].join('\n');
        },
        renvois: z => {
          const x0 = 20, x1 = z.l - 20, c = z.l / 2;
          const L = 0.62 * (x1 - x0);
          const y = (z.h - 32) / 2 + 2;
          const yc = y + 22;
          const e0 = c - L / 2;
          return [{ n: 4, rond: [e0 - 32, yc + 17], cible: [e0 + 12, yc + 5], texte: 'contreplaque de l’autre côté' }];
        },
      },
    },
  };
};
