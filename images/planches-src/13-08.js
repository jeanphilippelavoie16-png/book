// Planche 13-08 — la boîte à braise : chargée en coupe, portée au bout de son anse,
// et le geste de la percer au clou sur une bûche.
// Aucune cote : le chapitre ne donne aucune dimension, et la durée porte [À VÉRIFIER].

module.exports = (h) => {
  const f = v => Math.round(v * 10) / 10;
  const blancTrait = 'fill="none" stroke="#ffffff" stroke-width="1" stroke-linecap="round"';

  // Graine fixe : la cendre est la même à chaque composition.
  let graine = 17;
  const hasard = () => (graine = (graine * 16807) % 2147483647) / 2147483647;

  // Cendre : un semis de points fins dans un rectangle.
  const cendre = (x0, y0, x1, y1, dens = 34) => {
    const n = Math.round((x1 - x0) * (y1 - y0) / dens);
    let d = '';
    for (let i = 0; i < n; i++) d += `M${f(x0 + hasard() * (x1 - x0))} ${f(y0 + hasard() * (y1 - y0))}h0.01`;
    return `<path d="${d}" fill="none" stroke="#000" stroke-width="1.4" stroke-linecap="round"/>`;
  };

  // Torsade : le bout du fil enroulé sur son brin, de (x0,y0) vers (x1,y1).
  const torsade = (x0, y0, x1, y1, n = 4) => {
    const dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy);
    const ux = dx / L, uy = dy / L, px = -uy, py = ux;
    const out = [];
    for (let i = 0; i < n; i++) {
      const t = (i + 0.5) / n;
      const cx = x0 + dx * t, cy = y0 + dy * t;
      out.push(h.path(`M ${f(cx + px * 3.5 - ux * 2)} ${f(cy + py * 3.5 - uy * 2)} Q ${f(cx + ux * 2.5)} ${f(cy + uy * 2.5)} ${f(cx - px * 3.5 + ux * 1)} ${f(cy - py * 3.5 + uy * 1)}`, h.a.arete));
    }
    return out.join('\n');
  };

  // Braise : un morceau noir, fendu de blanc.
  const braise = (cx, cy, rx, ry) => {
    const pts = [[-1, 0.1], [-0.8, -0.6], [-0.3, -0.95], [0.25, -0.85], [0.75, -0.7], [1, -0.05], [0.8, 0.6], [0.2, 0.95], [-0.5, 0.85]]
      .map(([u, v]) => [cx + u * rx, cy + v * ry]);
    return [
      h.chemin(pts, h.a.plein, true),
      h.path(`M ${f(cx - rx * 0.6)} ${f(cy - ry * 0.1)} L ${f(cx - rx * 0.15)} ${f(cy + ry * 0.2)} L ${f(cx + rx * 0.3)} ${f(cy - ry * 0.25)} L ${f(cx + rx * 0.65)} ${f(cy + ry * 0.1)}`, blancTrait),
      h.path(`M ${f(cx - rx * 0.15)} ${f(cy + ry * 0.2)} L ${f(cx - rx * 0.05)} ${f(cy + ry * 0.65)}`, blancTrait),
      h.path(`M ${f(cx + rx * 0.3)} ${f(cy - ry * 0.25)} L ${f(cx + rx * 0.2)} ${f(cy - ry * 0.7)}`, blancTrait),
    ].join('\n');
  };

  // ─── Géométries partagées par le dessin et les renvois ──────────────────────────────
  const coupe = z => {
    const W = Math.round(Math.min(160, z.l * 0.5));
    const H = Math.round(W * 1.45);
    const cx = Math.round(z.l / 2);
    const bail = 78;
    const yT = Math.round(Math.max(bail + 20, (z.h - H - bail) / 2 + bail + 6));
    const yB = yT + H;
    const xl = cx - W / 2, xr = cx + W / 2;
    const yL = yT + 15;                              // couvercle, enfoncé sur la cendre
    const yBr = yB - Math.round(H * 0.3);            // centre de la braise
    const bw = Math.round(W * 0.56);
    const bBas = yBr - 7, bHaut = bBas - Math.round(H * 0.28);
    const xTrou = Math.round(W * 0.24);              // trous du couvercle, de part et d'autre du centre
    return { W, H, cx, bail, yT, yB, xl, xr, yL, yBr, bw, bBas, bHaut, xTrou };
  };

  const portee = z => {
    const W = Math.round(Math.min(116, z.l * 0.36));
    const H = Math.round(W * 1.3);
    const cx = Math.round(z.l * 0.52);
    const yB = z.h - 18, yT = yB - H;
    const ry = Math.round(W * 0.16);
    const xl = cx - W / 2, xr = cx + W / 2;
    const yA = yT + 11;                              // trous de l'anse
    const poing = { x: cx, y: 66 };
    return { W, H, cx, yB, yT, ry, xl, xr, yA, poing };
  };

  const percer = z => {
    const G = z.h - 12;                              // le sol
    const Dc = Math.round(Math.min(96, z.h * 0.46)); // la boîte couchée
    const D = Dc - 8;                                // la bûche qui entre dedans
    const ya = G - Dc / 2 - 2;                       // axe commun
    const Lc = Math.round(Dc * 1.3);
    const cxC = Math.round(z.l * 0.6);
    const xo = cxC - Lc / 2, xf = cxC + Lc / 2;      // bord ouvert (gauche), fond (droite)
    const xb0 = Math.round(z.l * 0.1);               // bout scié de la bûche
    const xh = Math.round(xf - Lc * 0.3);            // rangée de trous, à hauteur de braise
    const yP = ya - Dc / 2;                          // dessus de la paroi
    return { G, Dc, D, ya, Lc, cxC, xo, xf, xb0, xh, yP };
  };

  return {
    ref: '13-08',
    titre: 'La boîte à braise',
    desc: 'Une boîte de conserve percée au clou sur le pourtour et dans le couvercle. En coupe : un lit de cendre au fond, une braise vive au centre, un bloc d’amadouvier ou de bois pourri sec posé dessus, encore de la cendre, et le couvercle enfoncé par-dessus ; l’air entre par les trous du pourtour, la fumée sort par ceux du couvercle. Portée : une anse de fil de broche passée dans deux trous sous le bord, le bout tordu sur son brin, la boîte pendue au bout du fil, loin de la main. Percée : la boîte couchée, enfilée sur le bout d’une bûche, et le clou frappé au marteau à travers la paroi.',
    format: 'pleine',
    disposition: [['coupe', 'portee'], ['percer']],
    hauteurs: [3, 1.45],
    largeurs: [[1, 1], [1]],
    vues: {
      coupe: {
        titre: 'En coupe, chargée',
        dessin: z => {
          const g = coupe(z);
          const { W, H, cx, bail, yT, yB, xl, xr, yL, yBr, bw, bBas, bHaut, xTrou } = g;
          const out = [];

          // La cendre remplit tout, du fond au couvercle.
          out.push(cendre(xl + 3, yL + 3, xr - 3, yB - 7));

          // La braise, dans un creux de la cendre.
          out.push(h.ellipse(cx, yBr + 2, 37, 18, h.a.blanc));
          out.push(braise(cx, yBr, 30, 14));

          // Le bloc d'amadouvier, en coupe de sabot : le côté cassé à gauche, la croûte
          // bosselée qui descend vers la marge à droite, les couches de tubes dessous.
          const bx0 = cx - bw / 2, bh = bBas - bHaut;
          const P = (u, v, dy = 0) => `${f(bx0 + u * bw)} ${f(bHaut + v * bh + dy)}`;
          const dessus = [[0, 0.2], [0.24, 0.02], [0.48, 0.07], [0.7, 0.22], [0.87, 0.42], [0.98, 0.62]];
          const bosses = [[0.1, -0.04], [0.37, -0.03], [0.62, 0.08], [0.82, 0.26], [0.96, 0.46]];
          const crete = (dy, sens) => {
            const pts = sens > 0 ? dessus : [...dessus].reverse();
            const bs = sens > 0 ? bosses : [...bosses].reverse();
            return pts.slice(1).map((p, i) => `Q ${P(bs[i][0], bs[i][1], dy)} ${P(p[0], p[1], dy)}`).join(' ');
          };
          const blocD = `M ${P(0.03, 1)} L ${P(0, 0.2)} ${crete(0, 1)} Q ${P(1.04, 0.9)} ${P(0.93, 1)} Z`;
          out.push(h.path(blocD, h.a.blanc));
          out.push(h.path(`M ${P(0, 0.2)} ${crete(0, 1)} L ${P(0.97, 0.62, 5)} ${crete(5, -1)} Z`, h.a.plein));
          const tHaut = bHaut + Math.round(bh * 0.64);
          let tubes = '';
          for (let x = bx0 + 5; x < bx0 + bw * 0.92; x += 3.5) tubes += `M ${f(x)} ${tHaut} V ${bBas - 1} `;
          out.push(h.path(tubes, h.a.fin));
          out.push(h.ligne(bx0 + 1, tHaut, bx0 + bw * 0.99, tHaut, h.a.detail));
          out.push(h.ligne(bx0 + 1, bHaut + Math.round(bh * 0.83), bx0 + bw * 0.97, bHaut + Math.round(bh * 0.83), h.a.detail));
          out.push(h.path(blocD, h.a.arete));

          // Les parois, ouvertes aux trous à hauteur de braise.
          const t = 3.5;
          out.push(h.ligne(xl, yT, xl, yBr - t, h.a.contour), h.ligne(xl, yBr + t, xl, yB, h.a.contour));
          out.push(h.ligne(xr, yT, xr, yBr - t, h.a.contour), h.ligne(xr, yBr + t, xr, yB, h.a.contour));
          // Le fond, en retrait, et les bords roulés.
          out.push(h.ligne(xl, yB - 5, xr, yB - 5, h.a.contour));
          for (const x of [xl, xr]) {
            out.push(h.cercle(x, yT, 2.8, h.a.plein));
            out.push(h.cercle(x, yB, 2.6, h.a.plein));
          }

          // Le couvercle, enfoncé sous le bord, ouvert à ses trous.
          const tl = 3.5;
          const segs = [[xl + 3, cx - xTrou - tl], [cx - xTrou + tl, cx + xTrou - tl], [cx + xTrou + tl, xr - 3]];
          for (const [a, b] of segs) out.push(h.ligne(a, yL, b, yL, h.a.contour));
          out.push(h.ligne(xl + 3, yL, xl + 3, yL - 5, h.a.arete), h.ligne(xr - 3, yL, xr - 3, yL - 5, h.a.arete));

          // L'anse : le fil passe dans un trou sous le bord, revient et se tord sur son brin.
          const yA = yT + 9, ax = cx, ay = yT - bail;
          out.push(h.path(`M ${xl + 6} ${yA} L ${xl - 6} ${yA} Q ${xl - 11} ${yA} ${xl - 10} ${yA - 7} L ${ax - 7} ${ay + 6} Q ${ax} ${ay - 4} ${ax + 7} ${ay + 6} L ${xr + 10} ${yA - 7} Q ${xr + 11} ${yA} ${xr + 6} ${yA} L ${xr - 6} ${yA}`, h.a.arete));
          const k = 22 / Math.hypot(cx - xl, bail);
          out.push(torsade(xl - 10, yA - 7, xl - 10 + (ax - xl + 3) * k, yA - 7 - (bail - 2) * k));
          out.push(torsade(xr + 10, yA - 7, xr + 10 - (xr - ax + 3) * k, yA - 7 - (bail - 2) * k));

          // L'air entre par le pourtour, la fumée sort par le couvercle.
          out.push(h.fleche(`M ${xl - 36} ${yBr} L ${xl - 8} ${yBr}`));
          out.push(h.fleche(`M ${xr + 36} ${yBr} L ${xr + 8} ${yBr}`));
          out.push(h.fleche(`M ${cx - xTrou} ${yL - 5} L ${cx - xTrou} ${yT - 18}`));
          out.push(h.fleche(`M ${cx + xTrou} ${yL - 5} L ${cx + xTrou} ${yT - 18}`));

          return out.filter(Boolean).join('\n');
        },
        renvois: z => {
          const { cx, yT, yB, xl, xr, yL, yBr, bw, bBas, bHaut, xTrou } = coupe(z);
          const bMid = Math.round((bBas + bHaut) / 2);
          return [
            { n: 1, rond: [xl - 36, yB - 18], cible: [xl + 20, yB - 20], texte: 'lit de cendre ou de sable' },
            { n: 2, rond: [xr + 34, yBr + 38], cible: [cx + 14, yBr + 6], texte: 'braise vive, au centre' },
            { n: 3, rond: [xr + 34, bMid], cible: [cx + Math.round(bw * 0.2), bMid], texte: 'amadouvier ou bois pourri sec' },
            { n: 4, rond: [xl - 36, Math.round((yL + bHaut) / 2)], cible: [xl + 18, Math.round((yL + bHaut) / 2)], texte: 'encore de la cendre' },
            { n: 5, rond: [xr + 34, yL - 4], cible: [cx + xTrou + 22, yL], texte: 'couvercle percé au clou' },
            { n: 6, rond: [xl - 36, yBr - 32], cible: [xl, yBr - 1], texte: 'trous au clou, tout autour' },
          ];
        },
      },

      portee: {
        titre: 'Portée',
        dessin: z => {
          const { W, H, cx, yB, yT, ry, xl, xr, yA, poing } = portee(z);
          const out = [];

          // Le corps de la boîte, ses ondulations, son fond.
          out.push(h.path(`M ${xl} ${yT} L ${xl} ${yB} A ${W / 2} ${ry} 0 0 0 ${xr} ${yB} L ${xr} ${yT}`, h.a.contour));
          for (const k of [0.2, 0.44, 0.9]) {
            const y = yT + H * k;
            out.push(h.path(`M ${xl} ${f(y)} A ${W / 2} ${ry} 0 0 0 ${xr} ${f(y)}`, h.a.fin));
            out.push(h.path(`M ${xl} ${f(y + 3)} A ${W / 2} ${ry} 0 0 0 ${xr} ${f(y + 3)}`, h.a.fin));
          }
          // Le bord roulé et le couvercle enfoncé dedans.
          out.push(h.ellipse(cx, yT, W / 2, ry, h.a.contour));
          out.push(h.ellipse(cx, yT + 4, W / 2 - 5, ry - 3, h.a.detail));
          for (const [u, v] of [[-0.26, -0.3], [0.26, -0.3], [-0.22, 0.4], [0.22, 0.4]]) {
            out.push(h.ellipse(cx + u * W, yT + 4 + v * (ry - 3), 2.4, 1.3, h.a.plein));
          }

          // La rangée de trous du pourtour, à hauteur de braise.
          const yh = yB - H * 0.3;
          for (const deg of [-68, -40, -12, 16, 44, 70]) {
            const a = deg * Math.PI / 180;
            out.push(h.ellipse(cx + (W / 2) * Math.sin(a), yh + ry * Math.cos(a), Math.max(0.9, 2.6 * Math.cos(a)), 2.4, h.a.plein));
          }

          // Un filet de fumée au couvercle.
          const sx = cx + 0.22 * W, sy = yT + 4 + 0.4 * (ry - 3);
          out.push(h.path(`M ${f(sx)} ${f(sy - 3)} C ${f(sx - 8)} ${f(sy - 14)} ${f(sx + 8)} ${f(sy - 24)} ${f(sx)} ${f(sy - 34)} S ${f(sx + 6)} ${f(sy - 52)} ${f(sx - 2)} ${f(sy - 60)}`, h.a.fin));

          // L'anse : les deux brins montent jusqu'au bord de la vue (la main est hors champ, loin du corps).
          const py = 2;
          out.push(h.path(`M ${xl + 3} ${yA} L ${xl - 5} ${yA} Q ${xl - 9} ${yA} ${xl - 8} ${yA - 6} L ${poing.x - 5} ${py}`, h.a.arete));
          out.push(h.path(`M ${xr - 3} ${yA} L ${xr + 5} ${yA} Q ${xr + 9} ${yA} ${xr + 8} ${yA - 6} L ${poing.x + 5} ${py}`, h.a.arete));
          const kx = (poing.x - 5 - (xl - 8)), ky = (py - (yA - 6)), kL = Math.hypot(kx, ky);
          out.push(torsade(xl - 8, yA - 6, xl - 8 + kx * 24 / kL, yA - 6 + ky * 24 / kL));
          out.push(torsade(xr + 8, yA - 6, xr + 8 - kx * 24 / kL, yA - 6 + ky * 24 / kL));
          out.push(h.cercle(xl, yA, 2.2, h.a.plein), h.cercle(xr, yA, 2.2, h.a.plein));

          return out.join('\n');
        },
        renvois: z => {
          const { xl, yA, poing, cx } = portee(z);
          return [
            { n: 7, rond: [xl - 26, yA + 34], cible: [xl - 7, yA - 12], texte: 'fil de broche, bout tordu' },
            { n: 8, rond: [poing.x + 70, 40], cible: [poing.x + 8, 40], texte: 'tenue au bout du fil, loin du corps' },
          ];
        },
      },

      percer: {
        titre: 'Percée au clou, la boîte enfilée sur une bûche',
        dessin: z => {
          const { G, Dc, D, ya, Lc, xo, xf, xb0, xh, yP } = percer(z);
          const out = [];
          const r = D / 2, R = Dc / 2, ex = Math.round(D * 0.16), exC = Math.round(Dc * 0.16);

          // Le sol.
          out.push(h.ligne(12, G, z.l - 12, G, h.a.arete));
          out.push(h.rect(12, G, z.l - 24, 8, h.a.hachure('terre', 'aucun')));

          // La bûche : le bout scié à gauche, l'écorce, puis la partie cachée dans la boîte.
          const yb0 = ya - r, yb1 = ya + r;
          out.push(h.ligne(xb0, yb0, xo, yb0, h.a.contour), h.ligne(xb0, yb1, xo, yb1, h.a.contour));
          out.push(h.ellipse(xb0, ya, ex, r, h.a.blanc));
          out.push(h.ellipse(xb0, ya, ex, r, h.a.contour));
          for (const k of [0.62, 0.3]) out.push(h.ellipse(xb0, ya, ex * k, r * k, h.a.fin));
          for (const [u, v0, v1] of [[0.25, -0.7, -0.62], [0.45, -0.2, -0.28], [0.6, 0.35, 0.44], [0.8, -0.5, -0.42], [0.35, 0.72, 0.64], [0.7, 0.1, 0.02]]) {
            const x0 = xb0 + ex + (xo - xb0 - ex - 20) * u;
            out.push(h.path(`M ${f(x0)} ${f(ya + v0 * r)} q 14 ${f((v1 - v0) * r)} 34 ${f((v1 - v0) * r * 0.5)}`, h.a.detail));
          }
          out.push(h.ligne(xo, yb0, xf - 10, yb0, h.a.cache), h.ligne(xo, yb1, xf - 10, yb1, h.a.cache));
          out.push(h.ligne(xf - 10, yb0, xf - 10, yb1, h.a.cache));

          // La boîte couchée : bord ouvert à gauche, fond à droite, ondulations.
          const yc0 = ya - R, yc1 = ya + R;
          out.push(h.path(`M ${xo} ${yc0} L ${xf} ${yc0} A ${exC} ${R} 0 0 1 ${xf} ${yc1} L ${xo} ${yc1}`, h.a.contour));
          out.push(h.path(`M ${xo} ${yc0} A ${exC} ${R} 0 0 1 ${xo} ${yc1}`, h.a.contour));
          for (const k of [0.12, 0.5]) {
            const x = xo + Lc * k;
            out.push(h.path(`M ${f(x)} ${yc0} A ${exC} ${R} 0 0 1 ${f(x)} ${yc1}`, h.a.fin));
            out.push(h.path(`M ${f(x + 3)} ${yc0} A ${exC} ${R} 0 0 1 ${f(x + 3)} ${yc1}`, h.a.fin));
          }
          // Les trous déjà faits, en rangée autour de la boîte.
          for (const deg of [-50, -18, 14, 46]) {
            const a = deg * Math.PI / 180;
            out.push(h.ellipse(xh + exC * Math.cos(a), ya + R * Math.sin(a), 2.2, Math.max(1, 2.6 * Math.cos(a)), h.a.plein));
          }

          // Le clou, pointe sur la paroi, et le marteau qui descend.
          const nh = 40;
          out.push(h.rect(xh - 1.6, yP - nh, 3.2, nh - 3, h.a.plein));
          out.push(h.chemin([[xh - 1.6, yP - 3], [xh + 1.6, yP - 3], [xh, yP + 2]], h.a.plein, true));
          out.push(h.rect(xh - 6, yP - nh - 3, 12, 3, h.a.plein));
          const mh = yP - nh - 12;
          out.push(h.rect(xh - 12, mh - 22, 24, 22, h.a.hachure('metal', 'contour')));
          out.push(h.chemin([[xh + 12, mh - 14], [xh + 118, mh - 36], [xh + 120, mh - 26], [xh + 12, mh - 7]], h.a.hachure('bois', 'arete'), true));
          out.push(h.fleche(`M ${xh - 26} ${mh - 30} L ${xh - 26} ${mh + 4}`));

          return out.join('\n');
        },
        renvois: z => {
          const { ya, xo, xb0, xh, yP, D } = percer(z);
          return [
            { n: 9, rond: [xh + 50, yP - 12], cible: [xh + 3, yP - 16], texte: 'clou' },
            { n: 10, rond: [Math.round((xb0 + xo) / 2), ya - D / 2 - 28], cible: [Math.round((xb0 + xo) / 2) + 6, ya - D / 2 + 2], texte: 'bout de bûche dans la boîte' },
          ];
        },
      },
    },
  };
};
