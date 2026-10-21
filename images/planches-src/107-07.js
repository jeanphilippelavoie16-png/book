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
    disposition: [['avant', 'pose'], ['vide', 'coupe']],
    hauteurs: [3, 2],
    vues: {
      vide: { dessin: () => '' },
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
            // la charte : le point à contrôler, le trou qui enlève la pointe de la fissure
            h.controle(f[6][0], f[6][1], 11),
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
            // Rappels vers la coupe, au droit de chaque boulon.
            ...e.boulons.map(([x, y]) => h.ligne(x, y + 8.5, x, z.h + 11, 'fill="none" stroke="#1A1A1A" stroke-width="0.5" stroke-dasharray="4 3"')),
            // Trait de coupe A-A en escalier par le centre des quatre boulons.
            (() => {
              const [b0, b1, b2, b3] = e.boulons;
              const m01 = (b0[0] + b1[0]) / 2, m12 = (b1[0] + b2[0]) / 2, m23 = (b2[0] + b3[0]) / 2;
              const xa = g.x0 + 18, xb = g.x1 - 18;
              const pts = [[xa, b0[1]], [m01, b0[1]], [m01, b1[1]], [m12, b1[1]], [m12, b2[1]], [m23, b2[1]], [m23, b3[1]], [xb, b3[1]]];
              const mixte = 'fill="none" stroke="#1A1A1A" stroke-width="0.9" stroke-dasharray="12 3 2 3"';
              const bout = (x, y) => [
                h.ligne(x - 6, y, x + 6, y, 'fill="none" stroke="#1A1A1A" stroke-width="2.4"'),
                h.fleche(`M${x} ${y} L${x} ${y + 14}`, h.a.detail),
              ];
              return [
                h.chemin(pts, mixte),
                ...bout(xa, b0[1]), ...bout(xb, b3[1]),
                h.texte(xa - 9, b0[1] + 14, 'A', { corps: 11 }),
                h.texte(xb + 9, b3[1] + 14, 'A', { corps: 11 }),
              ].join('\n');
            })(),
            // Second trait du renvoi 3, vers l'autre boulon de droite.
            (() => {
              const b = e.boulons[2], r3 = [(e.boulons[2][0] + e.boulons[3][0]) / 2, g.y0 + g.W + 17];
              const [cx, cy] = contact(b[0], b[1], 8.5, r3);
              const dx = cx - r3[0], dy = cy - r3[1], d = Math.hypot(dx, dy);
              const sx = r3[0] + 9 * dx / d, sy = r3[1] + 9 * dy / d;
              return [
                `<line x1="${sx}" y1="${sy}" x2="${cx}" y2="${cy}" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>`,
                `<line x1="${sx}" y1="${sy}" x2="${cx}" y2="${cy}" fill="none" stroke="#1A1A1A" stroke-width="0.5" stroke-dasharray="3 2.5"/>`,
                `<circle cx="${cx}" cy="${cy}" r="1.8" fill="#1A1A1A" stroke="#FFFFFF" stroke-width="0.7"/>`,
              ].join('\n');
            })(),
          ].join('\n');
        },
        renvois: z => {
          const g = plat(z);
          const e = eclisse(g);
          const r2 = [e.ex0 - 4, g.y0 - 20];
          const b = e.boulons[3];
          const r3 = [(e.boulons[2][0] + b[0]) / 2, g.y0 + g.W + 17];   // entre les deux boulons : ses deux traits font un V
          return [
            { n: 2, rond: r2, cible: [e.ex0 + 14, g.y0 + g.W / 2], texte: 'éclisse à cheval sur la cassure' },
            { n: 3, rond: r3, cible: contact(b[0], b[1], 8.5, r3), texte: 'deux boulons décalés par côté' },
          ];
        },
      },
      coupe: {
        titre: 'Coupe A-A',
        dessin: z => {
          const g = plat(z), e = eclisse(g);
          const c = g.c, L = e.L;
          const e0 = e.ex0, e1 = e.ex0 + L;
          const x0 = e0 - 34, x1 = e1 + 34;
          const te = 10, tp = 12, tc = 10;
          const y = (z.h - (te + tp + tc)) / 2 + 2;
          const yp = y + te, yc = y + te + tp, yb = yc + tc;
          const fis = [[c + 2, yp], [c - 3, yp + tp * 0.35], [c + 3, yp + tp * 0.65], [c - 2, yc]];
          const zz = (x) => [[x, yc], [x, yp + tp * 0.6], [x - 3, yp + tp * 0.5], [x + 3, yp + tp * 0.4], [x, yp]];
          const g2 = [...zz(x0), ...fis.map(([a, b]) => [a - 2.5, b])];
          const d2 = [...zz(x1), ...fis.map(([a, b]) => [a + 2.5, b])].reverse();
          const xs = e.boulons.map(b => b[0]);
          const defs = '<defs><pattern id="h-metal135" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)"><line x1="0" y1="0" x2="0" y2="10" stroke="#1A1A1A" stroke-width="0.5"/></pattern></defs>';
          const h135 = (t) => t.replace(/fill="[^"]*"/, 'fill="url(#h-metal135)"');
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
          const liseré = (yy) => h.ligne(e0, yy, e1, yy, 'fill="none" stroke="#FFFFFF" stroke-width="1"');
          return [
            defs,
            h.chemin(g2, h.a.hachure('metal'), true),
            h.chemin(d2, h.a.hachure('metal'), true),
            h135(h.rect(e0, y, L, te - 1, h.a.hachure('metal', 'contour'))),
            h135(h.rect(e0, yc + 1, L, tc - 1, h.a.hachure('metal', 'contour'))),
            liseré(yp - 0.5), liseré(yc + 0.5),
            ...xs.map(x => h.ligne(x, -33, x, y - 11, 'fill="none" stroke="#1A1A1A" stroke-width="0.5" stroke-dasharray="4 3"')),
            ...xs.map(boulon),
          ].join('\n');
        },
        renvois: z => {
          const g = plat(z), e = eclisse(g);
          const y = (z.h - 32) / 2 + 2;
          const yc = y + 22;
          const e0 = e.ex0;
          return [{ n: 4, rond: [e0 - 30, yc + 15], cible: [e0 + 12, yc + 6], texte: 'contreplaque de l’autre côté' }];
        },
      },
    },
  };
};
