// Planche 75-04 — le bac de glace monté en couches (chapitre 75, étapes 19 à 24 et section 9).
// La charte : coupe hachurée sans gris ; en travers, la cavité du ventre en gris loin. Le rouge :
// la pointe de la sonde (là où on lit 4 à -1 °C) et le drain ouvert. L'eau de fonte reste en noir.
module.exports = (h) => {
  const blanc = t => t.replace('fill="none"', 'fill="#ffffff"');
  const halo = (ep = 5) => `fill="none" stroke="#ffffff" stroke-width="${ep}" stroke-linecap="round" stroke-linejoin="round"`;
  const r1 = v => Math.round(v * 10) / 10;

  // hasard reproductible
  const alea = graine => { let s = graine; return () => { s = (s * 16807) % 2147483647; return s / 2147483647; }; };

  // glace concassée : morceaux anguleux séparés, dans un rectangle
  const glace = (x0, y0, x1, y1, graine, o = {}) => {
    const r = alea(graine), cw = o.cw || 13, ch = o.ch || 11;
    const nc = Math.max(1, Math.round((x1 - x0) / cw)), nr = Math.max(1, Math.round((y1 - y0) / ch));
    const dx = (x1 - x0) / nc, dy = (y1 - y0) / nr, V = [];
    for (let j = 0; j <= nr; j++) {
      V[j] = [];
      for (let i = 0; i <= nc; i++) {
        let x = x0 + i * dx, y = y0 + j * dy;
        const bordX = i === 0 || i === nc, bordY = j === 0 || j === nr;
        if (!bordX || o.bord) x += (r() - 0.5) * dx * 0.6;
        if (!bordY || o.bord || j === 0) y += (r() - 0.5) * dy * 0.6;
        V[j][i] = [x, y];
      }
    }
    const out = [];
    for (let j = 0; j < nr; j++) for (let i = 0; i < nc; i++) {
      const q = [V[j][i], V[j][i + 1], V[j + 1][i + 1], V[j + 1][i]];
      const cx = q.reduce((s, p) => s + p[0], 0) / 4, cy = q.reduce((s, p) => s + p[1], 0) / 4;
      const k = 0.78;
      out.push(h.chemin(q.map(([x, y]) => [r1(cx + (x - cx) * k), r1(cy + (y - cy) * k)]), h.a.detail, true));
      if (r() < 0.3) out.push(h.ligne(r1(cx - dx * 0.18), r1(cy - dy * 0.12), r1(cx + dx * 0.08), r1(cy - dy * 0.22), h.a.detail));
    }
    return out.join('\n');
  };

  // truite de profil, tête à gauche, ventre ouvert (cavité en caché)
  const truite = (x, y, L, D) => {
    const X = f => r1(x + f * L), Y = f => r1(y + f * D);
    const P = (fx, fy) => `${X(fx)},${Y(fy)}`;
    const nageoires = [
      `M${P(0.37, -0.48)} L${P(0.41, -0.86)} Q${P(0.47, -0.8)} ${P(0.53, -0.44)}`,
      `M${P(0.69, -0.3)} Q${P(0.73, -0.5)} ${P(0.77, -0.25)}`,
      `M${P(0.47, 0.48)} L${P(0.54, 0.72)} L${P(0.56, 0.45)}`,
      `M${P(0.64, 0.38)} L${P(0.72, 0.58)} L${P(0.75, 0.28)}`,
    ].map(d => h.path(d, blanc(h.a.arete)));
    const corps = `M${P(0, 0.02)} C${P(0.03, -0.2)} ${P(0.1, -0.38)} ${P(0.22, -0.44)}`
      + ` C${P(0.34, -0.5)} ${P(0.5, -0.5)} ${P(0.62, -0.38)}`
      + ` C${P(0.72, -0.28)} ${P(0.8, -0.18)} ${P(0.86, -0.15)}`
      + ` L${P(0.99, -0.46)} Q${P(0.94, 0)} ${P(0.99, 0.46)} L${P(0.86, 0.15)}`
      + ` C${P(0.78, 0.2)} ${P(0.7, 0.32)} ${P(0.6, 0.42)}`
      + ` C${P(0.48, 0.52)} ${P(0.3, 0.5)} ${P(0.2, 0.42)}`
      + ` C${P(0.12, 0.36)} ${P(0.05, 0.2)} ${P(0, 0.02)} Z`;
    const taches = [[0.3, -0.3], [0.42, -0.34], [0.5, -0.24], [0.58, -0.3], [0.66, -0.2], [0.36, -0.18], [0.74, -0.1]]
      .map(([fx, fy]) => h.cercle(X(fx), Y(fy), 0.9, h.a.plein));
    return [
      ...nageoires,
      h.path(corps, blanc(h.a.arete)),
      h.path(`M${P(0.2, -0.36)} C${P(0.245, -0.1)} ${P(0.245, 0.2)} ${P(0.19, 0.4)}`, h.a.detail),
      h.path(`M${P(0.25, 0.26)} L${P(0.35, 0.44)} L${P(0.32, 0.24)}`, h.a.detail),
      h.ligne(X(0.005), Y(0.04), X(0.09), Y(0.1), h.a.detail),
      h.cercle(X(0.085), Y(-0.12), 2.4, h.a.detail),
      h.cercle(X(0.085), Y(-0.12), 1.1, h.a.plein),
      h.path(`M${P(0.22, 0.42)} C${P(0.3, 0.06)} ${P(0.54, 0.06)} ${P(0.61, 0.41)}`, h.a.cache),
      ...taches,
    ].join('\n');
  };

  // goutte d'eau
  const goutte = (x, y) => h.path(`M${x},${y - 4} Q${x + 3},${y + 1} ${x},${y + 3} Q${x - 3},${y + 1} ${x},${y - 4} Z`, h.a.detail);

  // géométrie de la vue en long, partagée entre dessin et renvois
  const geo = z => {
    const p = 4, g = 16, W = p + g + p;
    const X0 = 30, X1 = z.l - 58, G = z.h - 10, F = G - W;
    const xi0 = X0 + W, xi1 = X1 - W;
    const L1 = (xi1 - xi0 - 32 - 14) / 2, D = L1 * 0.18;
    const y1 = F - 12 - D * 0.5 - 2, y2 = y1 - D - 20;
    const T = r1(y2 - D * 0.86 - 20);
    const c1 = [[xi0 + 16, L1], [xi0 + 30 + L1, L1]];
    const c2 = [[xi0 + 16, L1 + 6], [xi0 + 36 + L1, L1 - 6]];
    const xs = c2[0][0] + 0.29 * c2[0][1];
    return { p, g, W, X0, X1, G, F, T, xi0, xi1, L1, D, y1, y2, c1, c2, xs };
  };

  return {
    ref: '75-04',
    titre: 'Le bac de glace, monté en couches',
    desc: 'Coupe en long d’une glacière de bois à double paroi, couvercle soulevé : glace au fond, '
      + 'deux couches de truites ventre ouvert vers le bas séparées par la glace, glace contre les parois, '
      + 'sonde piquée derrière la tête, eau de fonte qui traverse la pile et sort par le drain débouché. '
      + 'En travers, la cavité ouverte vers le bas qui s’égoutte dans la glace.',
    format: 'demi',
    disposition: [['coupe', 'travers']],
    largeurs: [[3, 1]],
    vues: {
      coupe: {
        titre: 'En long',
        dessin: z => {
          const q = geo(z), { p, g, W, X0, X1, G, F, T, xi0, xi1, D, y1, y2 } = q;
          const out = [];
          // sol
          out.push(h.rect(0, G, z.l, z.h - G, h.a.hachure('terre', 'aucun')));
          out.push(h.ligne(0, G, z.l, G, h.a.arete));
          // paroi double : isolant sec entre deux caisses
          out.push(h.rect(X0 + p, T + p, X1 - X0 - 2 * p, G - T - 2 * p, h.a.hachure('isolant', 'detail')));
          const bois = h.a.hachure('bois', 'detail');
          out.push(h.rect(X0, T, p, G - T, bois), h.rect(X1 - p, T, p, G - T, bois));
          out.push(h.rect(X0 + p, G - p, X1 - X0 - 2 * p, p, bois));
          out.push(h.rect(X0 + p, T, g, p, bois), h.rect(X1 - p - g, T, g, p, bois));
          out.push(h.rect(xi0, T, xi1 - xi0, F - T, h.a.blanc));
          out.push(h.rect(X0 + p + g, T, p, F + p - T, bois), h.rect(xi1, T, p, F + p - T, bois));
          out.push(h.rect(X0 + p + g, F, X1 - X0 - 2 * (p + g), p, bois));
          // drain au point bas, traversant les deux parois
          out.push(h.rect(xi1, F - 6, X1 - xi1 + 1, 6, h.a.blanc));
          // glace concassée dans tout le bac
          out.push(glace(xi0 + 1, T + 8, xi1 - 1, F - 1, 7));
          // deux couches de poisson
          q.c1.forEach(([x, L]) => out.push(truite(x, y1, L, D)));
          q.c2.forEach(([x, L]) => out.push(truite(x, y2, L, D)));
          // eau de fonte : traverse la pile, file au fond, sort par le drain
          const xb = r1(q.c1[0][0] + q.c1[0][1] + 7), xa = r1(q.c2[0][0] + q.c2[0][1] + 7);
          const d = `M${xa},${T + 14} L${xa},${r1(y2 + 8)} L${xb},${r1(y1 - 16)} L${xb},${F - 3}`
            + ` L${X1 - 4},${F - 3} Q${X1 + 8},${F - 3} ${X1 + 8},${F + 8}`;
          const eau = 'fill="none" stroke="#000000" stroke-width="1.1" stroke-linejoin="round" stroke-linecap="round" stroke-dasharray="5 3.5"';
          out.push(h.path(d, halo(6)), h.fleche(d, eau));
          // deux pointes en route : milieu de la descente, milieu du fond
          const ym = r1((T + 14 + y2 + 8) / 2), xm = r1((xb + X1 - 4) / 2);
          out.push(h.fleche(`M${xa},${ym - 3} L${xa},${ym}`, eau));
          out.push(h.fleche(`M${xm - 3},${F - 3} L${xm},${F - 3}`, eau));
          out.push(goutte(X1 + 8, F + 17));
          // silhouette de la coupe
          out.push(h.chemin([[X0, T], [xi0, T], [xi0, F], [X1, F], [X1, G], [X0, G]], h.a.contour, true));
          out.push(h.chemin([[xi1, F - 6], [xi1, T], [X1, T], [X1, F - 6]], h.a.contour, true));
          // sonde : cadran au-dessus de la glace, tige piquée derrière la tête
          const xs = r1(q.xs), yd = T - 12, yb = r1(y2 - D * 0.47), yp = r1(y2 + D * 0.05);
          out.push(h.ligne(xs, yd, xs, yb, halo(4)));
          out.push(h.ligne(xs, yd + 7, xs, yb, h.a.arete));
          out.push(h.ligne(xs, yb, xs, yp, h.a.cache));
          out.push(h.cercle(xs, yd, 7, blanc(h.a.arete)));
          out.push(h.ligne(xs, yd, xs + 4, yd - 5, h.a.detail));
          // ce qu'on vérifie : la pointe de la sonde dans la chair épaisse, et le drain qui coule
          out.push(h.controle(xs, yp, 9));
          out.push(h.controle(X1 + 2, F - 3, 10));
          // couvercle soulevé, même épaisseur que les parois, débordant
          const th = 6 * Math.PI / 180, cs = Math.cos(th), sn = Math.sin(th), ov = 8;
          const rot = pts => pts.map(([x, y]) => [r1(X1 + (x - X1) * cs - (y - T) * sn), r1(T + (x - X1) * sn + (y - T) * cs)]);
          const rr = (x, y, l, ht) => rot([[x, y], [x + l, y], [x + l, y + ht], [x, y + ht]]);
          const a0 = X0 - ov, a1 = X1 + ov;
          out.push(h.chemin(rr(a0 + p, T - W + p, a1 - a0 - 2 * p, g), h.a.hachure('isolant', 'detail'), true));
          out.push(h.chemin(rr(a0, T - W, a1 - a0, p), bois, true));
          out.push(h.chemin(rr(a0, T - p, a1 - a0, p), bois, true));
          out.push(h.chemin(rr(a0, T - W + p, p, g), bois, true));
          out.push(h.chemin(rr(a1 - p, T - W + p, p, g), bois, true));
          out.push(h.chemin(rr(a0, T - W, a1 - a0, W), h.a.contour, true));
          // cheville tirée, posée au sol
          const cx0 = X1 + 20;
          out.push(h.path(`M${cx0},${G} L${cx0},${G - 9} L${cx0 + 26},${G - 7} Q${cx0 + 29},${G - 3.5} ${cx0 + 26},${G} Z`, blanc(h.a.arete)));
          out.push(h.ligne(cx0 + 4, G - 5, cx0 + 20, G - 4.5, h.a.detail));
          // la cote que donne le chapitre : l'isolant fait une main
          out.push(h.cote(X0 + p, T - 6, X0 + p + g, T - 6, 'une main', { cote: 'dessus' }));
          return out.join('\n');
        },
        renvois: z => {
          const q = geo(z), { X1, F, T, xi0, xi1, y1, y2 } = q;
          return [
            { n: 1, rond: [13, F - 7], cible: [xi0 + 18, F - 7], texte: 'glace au fond, avant tout poisson' },
            { n: 3, rond: [z.l - 13, r1(y2)], cible: [xi1 - 7, r1(y2)], texte: 'glace entre poisson et paroi' },
            { n: 4, rond: [13, r1(y1 - 24)], cible: [xi0 + 20, r1(y1 - 24)], texte: 'glace dessus, puis même couche' },
            { n: 5, rond: [z.l - 13, F - 26], cible: [X1 - 10, F - 3], texte: 'drain ouvert, cheville tirée' },
            { n: 6, rond: [r1(q.xs + 42), T - 8], cible: [r1(q.xs + 2), T - 1], texte: 'sonde derrière la tête, chair épaisse' },
          ];
        },
      },
      travers: {
        titre: 'En travers',
        dessin: z => {
          const cx = r1(z.l / 2), cy = r1(z.h / 2 - 10), k = 1;
          const P = (fx, fy) => `${r1(cx + fx * k)},${r1(cy + fy * k)}`;
          const out = [];
          out.push(glace(8, cy - 80, z.l - 8, cy + 80, 11, { bord: true }));
          // cavité : vide, ouverte vers le bas
          const cav = `M${P(7, 44)} C${P(14, 32)} ${P(18, 14)} ${P(15, 2)} C${P(12, -6)} ${P(5, -8)} ${P(0, -8)}`
            + ` C${P(-5, -8)} ${P(-12, -6)} ${P(-15, 2)} C${P(-18, 14)} ${P(-14, 32)} ${P(-7, 44)} Z`;
          out.push(h.path(cav, h.a.loin));   // la cavité, vide : on voit l'intérieur, en gris loin
          out.push(h.path(`M${P(-2.5, -45)} L${P(0, -63)} L${P(2.5, -45)} Z`, blanc(h.a.arete)));
          const chair = `M${P(0, -46)} C${P(18, -44)} ${P(29, -20)} ${P(28, 2)} C${P(27, 22)} ${P(20, 38)} ${P(13, 46)}`
            + ` L${P(7, 44)} C${P(14, 32)} ${P(18, 14)} ${P(15, 2)} C${P(12, -6)} ${P(5, -8)} ${P(0, -8)}`
            + ` C${P(-5, -8)} ${P(-12, -6)} ${P(-15, 2)} C${P(-18, 14)} ${P(-14, 32)} ${P(-7, 44)}`
            + ` L${P(-13, 46)} C${P(-20, 38)} ${P(-27, 22)} ${P(-28, 2)} C${P(-29, -20)} ${P(-18, -44)} ${P(0, -46)} Z`;
          out.push(h.path(chair, blanc(h.a.contour)));
          out.push(h.cercle(cx, r1(cy - 24 * k), 4.5, h.a.plein));
          // l'eau file le long des flancs et sort de la cavité par le bas
          const fl = [`M${P(0, 2)} L${P(0, 72)}`];
          fl.forEach(d => out.push(h.path(d, halo(5)), h.fleche(d, h.a.cache)));
          return out.join('\n');
        },
        renvois: z => {
          const cx = z.l / 2, cy = z.h / 2 - 10, k = 1;
          return [
            { n: 2, rond: [z.l - 14, z.h - 13], cible: [r1(cx + 12 * k), r1(cy + 48 * k)], texte: 'ventre ouvert tourné vers le bas' },
          ];
        },
      },
    },
  };
};
