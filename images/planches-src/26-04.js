// Planche 26-04 — Le garrot improvisé. Trois temps sur la même cuisse, vue de face.
module.exports = (h) => {
  const BL = h.a.blanc.split(' ')[0];            // fill="…blanc…"
  const plein = t => t.replace('fill="none"', BL); // trait + fond blanc qui cache ce qui est dessous

  // Géométrie commune d'une vue : cuisse verticale, genou en bas.
  const geo = z => {
    const H = z.h, cx = Math.round(z.l / 2);
    return { H, cx, yb: Math.round(H * 0.27), yw: Math.round(H * 0.58), yk: Math.round(H * 0.8) };
  };
  const PL = [[0, 44], [0.27, 42], [0.58, 36], [0.72, 31], [0.80, 34], [0.90, 27], [1.0, 26]];
  const PR = [[0, 47], [0.27, 44], [0.58, 37], [0.72, 32], [0.80, 34], [0.90, 28], [1.0, 27]];
  const interp = (P, f) => {
    for (let i = 0; i < P.length - 1; i++) {
      const [f0, w0] = P[i], [f1, w1] = P[i + 1];
      if (f <= f1) { const t = (f - f0) / (f1 - f0); const s = (1 - Math.cos(Math.PI * t)) / 2; return w0 + (w1 - w0) * s; }
    }
    return P[P.length - 1][1];
  };
  const hw = (P, g, y, pince) => interp(P, y / g.H) - pince * Math.exp(-Math.pow((y - g.yb) / 12, 2));

  const jambe = (g, pince) => {
    const G = [], D = [];
    for (let y = 0; y <= g.H; y += 3) { G.push([g.cx - hw(PL, g, y, pince), y]); D.push([g.cx + hw(PR, g, y, pince), y]); }
    const { cx, yk } = g;
    return [
      h.chemin(G, h.a.contour),
      h.chemin(D, h.a.contour),
      // rotule et vaste interne : ce qui fait lire un genou
      h.path(`M${cx - 13},${yk - 10} Q${cx - 16},${yk + 12} ${cx},${yk + 15} Q${cx + 16},${yk + 12} ${cx + 13},${yk - 10}`, h.a.detail),
      h.path(`M${cx - 31},${yk - 44} Q${cx - 26},${yk - 18} ${cx - 14},${yk - 12}`, h.a.detail),
      h.path(`M${cx + 30},${yk + 2} Q${cx + 26},${yk + 10} ${cx + 27},${yk + 20}`, h.a.detail),
    ].join('\n');
  };

  const plaie = (g, coule) => {
    const x = g.cx + 8, y = g.yw;
    const out = [h.path(`M${x - 9},${y + 3} Q${x},${y - 4} ${x + 9},${y - 3} Q${x},${y + 3} ${x - 9},${y + 3} Z`, h.a.plein)];
    if (coule) {
      out.push(h.path(`M${x - 3},${y + 3} Q${x - 5},${y + 12} ${x - 4},${y + 20}`, h.a.detail));
      out.push(h.cercle(x - 4, y + 21, 2, h.a.plein));
      out.push(h.path(`M${x + 4},${y + 1} Q${x + 6},${y + 7} ${x + 5},${y + 12}`, h.a.detail));
      out.push(h.cercle(x + 5, y + 13, 1.8, h.a.plein));
    }
    return out.join('\n');
  };

  // Une bande qui fait le tour du membre à la hauteur yc, demi-hauteur e.
  const bande = (g, yc, e, pince, tors) => {
    const t = yc - e, b = yc + e, cx = g.cx;
    const xlt = cx - hw(PL, g, t, pince) - 2, xrt = cx + hw(PR, g, t, pince) + 2;
    const xlb = cx - hw(PL, g, b, pince) - 2, xrb = cx + hw(PR, g, b, pince) + 2;
    const xlm = cx - hw(PL, g, yc, pince) - 3, xrm = cx + hw(PR, g, yc, pince) + 3;
    if (!tors) {
      return h.path(`M${xlt},${t} Q${cx},${t + 6} ${xrt},${t} Q${xrm},${yc} ${xrb},${b} Q${cx},${b + 6} ${xlb},${b} Q${xlm},${yc} ${xlt},${t} Z`, plein(h.a.arete));
    }
    // tordue : les deux bords se resserrent vers le nœud
    return h.path(`M${xlt},${t} Q${cx - 22},${t + 1} ${cx - 9},${yc - 4} L${cx + 9},${yc - 4} Q${cx + 22},${t + 1} ${xrt},${t} Q${xrm},${yc} ${xrb},${b} Q${cx + 22},${b + 1} ${cx + 9},${yc + 4} L${cx - 9},${yc + 4} Q${cx - 22},${b + 1} ${xlb},${b} Q${xlm},${yc} ${xlt},${t} Z`, plein(h.a.arete));
  };

  // Un bout de bande qui pend, de (x0,y0) à (x1,y1), largeur w, cambré de c.
  const bout = (x0, y0, x1, y1, w, c) => {
    const dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux;
    const mx = (x0 + x1) / 2 + nx * c, my = (y0 + y1) / 2 + ny * c, k = w / 2;
    const P = (x, y, s) => `${(x + nx * k * s).toFixed(1)},${(y + ny * k * s).toFixed(1)}`;
    return h.path(`M${P(x0, y0, 1)} Q${P(mx, my, 1)} ${P(x1, y1, 1)} L${P(x1 + ux * 2, y1 + uy * 2, -1)} Q${P(mx, my, -1)} ${P(x0, y0, -1)} Z`, plein(h.a.arete));
  };

  // Un bâton, de p1 à p2, épaisseur w, bouts arrondis, un fil du bois et un nœud de branche.
  const baton = (x1, y1, x2, y2, w) => {
    const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, k = w / 2;
    const rot = Math.atan2(dy, dx) * 180 / Math.PI;
    const p = (x, y, s) => `${(x + nx * k * s).toFixed(1)},${(y + ny * k * s).toFixed(1)}`;
    const q = (a, s) => [x1 + ux * a + nx * k * s, y1 + uy * a + ny * k * s];
    const f1 = q(L * 0.12, -0.3), f2 = q(L * 0.4, -0.3), f3 = q(L * 0.62, 0.35), f4 = q(L * 0.86, 0.35);
    const n = q(L * 0.72, -0.2);
    return [
      h.path(`M${p(x1, y1, 1)} L${p(x2, y2, 1)} A${(k * 0.55).toFixed(1)} ${k} ${rot.toFixed(1)} 0 0 ${p(x2, y2, -1)} L${p(x1, y1, -1)} A${(k * 0.55).toFixed(1)} ${k} ${rot.toFixed(1)} 0 0 ${p(x1, y1, 1)} Z`, plein(h.a.contour)),
      h.ligne(f1[0], f1[1], f2[0], f2[1], h.a.detail),
      h.ligne(f3[0], f3[1], f4[0], f4[1], h.a.detail),
      h.ellipse(n[0], n[1], 2.6, 1.6, h.a.detail),
    ].join('\n');
  };

  // Nœud plat vu de face, dans la largeur de la bande : deux bouts qui se croisent, l'un passe
  // par-dessus puis autour de l'autre. k = échelle (1 = bande du garrot, 0.5 = deuxième lien).
  // dessous() = premier demi-nœud ; dessus() = second demi-nœud, qui croise par-dessus (et le bâton).
  const ndDessous = (x, y, k) => [
    bout(x - 14 * k, y - 3 * k, x + 12 * k, y + 5 * k, 7 * k, -2 * k),
    bout(x + 14 * k, y - 3 * k, x - 12 * k, y + 5 * k, 7 * k, 2 * k),
  ].join('\n');
  const ndDessus = (x, y, k, ouvert) => {
    const e = ouvert ? 9 * k : 5 * k; // écart des deux brins de la boucle (laisse passer le bâton)
    return [
      bout(x - e, y + 6 * k, x - e - 1 * k, y - 7 * k, 6 * k, -3 * k),
      bout(x + e, y + 6 * k, x + e + 1 * k, y - 7 * k, 6 * k, 3 * k),
      bout(x - e - 3 * k, y - 8 * k, x + e + 3 * k, y - 8 * k, 6 * k, -3 * k),
    ].join('\n');
  };
  const noeud = (x, y, k = 1) => ndDessous(x, y, k) + '\n' + ndDessus(x, y, k, false);

  const plis = (g, n) => {
    const out = [];
    for (let i = 0; i < n; i++) {
      const d = 18 + i * 8;
      out.push(h.ligne(g.cx - d - 2, g.yb - 6, g.cx - d + 3, g.yb + 6, h.a.detail));
      out.push(h.ligne(g.cx + d + 2, g.yb - 6, g.cx + d - 3, g.yb + 6, h.a.detail));
    }
    return out.join('\n');
  };

  const R = 64; // rayon de la rotation du bâton
  const arc = (g, a0, a1) => {
    const P = a => [g.cx + R * Math.cos(a * Math.PI / 180), g.yb + R * Math.sin(a * Math.PI / 180)];
    const [x0, y0] = P(a0), [x1, y1] = P(a1);
    return `M${x0.toFixed(1)},${y0.toFixed(1)} A${R} ${R} 0 0 1 ${x1.toFixed(1)},${y1.toFixed(1)}`;
  };
  const surArc = (g, a) => [g.cx + R * Math.cos(a * Math.PI / 180), g.yb + R * Math.sin(a * Math.PI / 180)];

  return {
    ref: '26-04',
    titre: 'Le garrot improvisé',
    desc: 'Trois temps sur une cuisse vue de face : une bande large nouée haut au-dessus de la plaie ; un bâton passé dans le nœud et tourné ; le bâton rabattu le long de la cuisse et tenu par un deuxième lien.',
    format: 'demi',
    disposition: [['noue', 'tourne', 'bloque']],
    vues: {
      noue: {
        titre: 'Nouer',
        dessin: z => {
          const g = geo(z);
          return [
            jambe(g, 0), plaie(g, true), bande(g, g.yb, 9, 0, false),
            bout(g.cx - 5, g.yb + 6, g.cx - 20, g.yb + 46, 8, -3),
            bout(g.cx + 5, g.yb + 6, g.cx + 15, g.yb + 50, 8, 3),
            noeud(g.cx, g.yb + 1, 1.4),
          ].join('\n');
        },
        renvois: z => {
          const g = geo(z);
          return [
            { n: 1, rond: [z.l - 16, g.yb - 30], cible: [g.cx + 30, g.yb - 7.5], texte: 'bande large : répartit la pression' },
            { n: 2, rond: [16, g.yb - 30], cible: [g.cx - 6, g.yb - 6.5], texte: 'nœud simple, au-dessus de la plaie' },
          ];
        },
      },
      tourne: {
        titre: 'Tourner',
        dessin: z => {
          const g = geo(z);
          return [
            jambe(g, 2), plaie(g, true), bande(g, g.yb, 9, 2, false), plis(g, 3),
            bout(g.cx - 5, g.yb + 6, g.cx - 20, g.yb + 46, 8, -3),
            bout(g.cx + 5, g.yb + 6, g.cx + 15, g.yb + 50, 8, 3),
            ndDessous(g.cx, g.yb, 1.4),
            baton(g.cx - 56, g.yb, g.cx + 56, g.yb, 9),
            ndDessus(g.cx, g.yb, 1.4, true),
            h.fleche(arc(g, -8, 58)),
            h.fleche(arc(g, 172, 238)),
          ].join('\n');
        },
        renvois: z => {
          const g = geo(z);
          const a = surArc(g, 34);
          return [
            { n: 3, rond: [16, g.yb + 34], cible: [g.cx - 48, g.yb + 4.5], texte: 'bâton passé dans le nœud' },
            { n: 4, rond: [z.l - 14, g.yb + 76], cible: [a[0] + 1, a[1] + 1], texte: 'tourner jusqu’à l’arrêt du saignement' },
          ];
        },
      },
      bloque: {
        titre: 'Bloquer',
        dessin: z => {
          const g = geo(z), y2 = g.yb - 40;
          return [
            jambe(g, 5), plaie(g, false), bande(g, g.yb, 9, 5, true),
            h.path(`M${g.cx - 38},${g.yb - 7} Q${g.cx - 24},${g.yb - 2} ${g.cx - 11},${g.yb + 2}`, h.a.detail),
            h.path(`M${g.cx - 36},${g.yb + 8} Q${g.cx - 22},${g.yb + 3} ${g.cx - 11},${g.yb - 1}`, h.a.detail),
            h.path(`M${g.cx + 38},${g.yb + 7} Q${g.cx + 24},${g.yb + 2} ${g.cx + 11},${g.yb - 2}`, h.a.detail),
            h.path(`M${g.cx + 36},${g.yb - 8} Q${g.cx + 22},${g.yb - 3} ${g.cx + 11},${g.yb + 1}`, h.a.detail),
            bout(g.cx - 5, g.yb + 8, g.cx - 22, g.yb + 40, 8, -4),
            bout(g.cx + 5, g.yb + 8, g.cx + 18, g.yb + 44, 8, 4),
            ndDessous(g.cx, g.yb, 1.4),
            baton(g.cx, g.yb + 56, g.cx, g.yb - 56, 9),
            ndDessus(g.cx, g.yb, 1.4, true),
            bande(g, y2, 5, 0, false),
            bout(g.cx + 16, y2 + 3, g.cx + 24, y2 + 22, 6, 2),
            bout(g.cx + 18, y2 + 2, g.cx + 34, y2 + 16, 6, -2),
            noeud(g.cx + 16, y2 + 1, 0.5),
          ].join('\n');
        },
        renvois: z => {
          const g = geo(z), y2 = g.yb - 40;
          return [
            { n: 5, rond: [16, y2 + 34], cible: [g.cx - 34, y2 + 6.5], texte: 'deuxième lien : bloque le bâton' },
          ];
        },
      },
    },
  };
};
