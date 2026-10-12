// Planche 12-02 — le sapinage posé en écailles (ch. 12, section 5E ; 5D point 4 ; 5G point 10).
// En coupe : le bout coupé piqué dans la neige vers le fond, la courbe de la branche vers le haut,
// la pointe vers la porte ; les rangs se recouvrent et il ne reste en surface que des pointes.
// Vu de dessus : la tente à une porte, du fond vers la porte, le rond de neige nue autour du poêle ;
// la tente à deux portes, du milieu vers chaque porte. Aucune cote : la section 5E n'a pas de chiffre.

module.exports = (h) => {
  const f = v => Math.round(v * 10) / 10;
  const blanc = a => a.replace('fill="none"', 'fill="#ffffff"');
  const P = pts => pts.map(([x, y], i) => `${i ? 'L' : 'M'} ${f(x)} ${f(y)}`).join(' ');
  const ell = (cx, cy, rx, ry) =>
    `M ${f(cx - rx)} ${f(cy)} a ${f(rx)} ${f(ry)} 0 1 0 ${f(2 * rx)} 0 a ${f(rx)} ${f(ry)} 0 1 0 ${f(-2 * rx)} 0 Z`;

  // ─── Vue de dessus : une branche, bout coupé en (x, y), pointe dans le sens d (+1 : vers la droite).
  const U0 = 0.08;
  const larg = (u, w) => u <= U0 ? 0 : w * Math.sin(Math.PI * Math.pow((u - U0) / (1 - U0), 0.7));
  const branchePlan = (x, y, L, w, d) => {
    const n = 14, haut = [], bas = [];
    for (let i = 0; i <= n; i++) {
      const u = U0 + (1 - U0) * i / n;
      haut.push([x + d * u * L, y - larg(u, w)]);
      bas.unshift([x + d * u * L, y + larg(u, w)]);
    }
    const out = [h.chemin(haut.concat(bas), blanc(h.a.detail), true)];
    out.push(h.path(`M ${f(x)} ${f(y)} L ${f(x + d * 0.9 * L)} ${f(y)}`, h.a.detail));
    const ai = [];
    for (const t of [0.24, 0.38, 0.52, 0.66, 0.8]) {
      const u2 = t + 0.12, dy = 0.78 * larg(u2, w);
      ai.push(`M ${f(x + d * u2 * L)} ${f(y - dy)} L ${f(x + d * t * L)} ${f(y)} L ${f(x + d * u2 * L)} ${f(y + dy)}`);
    }
    out.push(h.path(ai.join(' '), h.a.fin));
    return out.join('\n');
  };

  // Les rangs, du fond (x0) vers la porte (x1). La porte se dessine d'abord : chaque rang posé
  // avant couvre ainsi le pied du rang suivant, et il ne reste en surface que des pointes.
  const PL = { L: 62, w: 13, s: 38, p: 21 };
  const tapis = (x0, x1, y0, y1, d) => {
    const { L, w, s, p } = PL, rangs = [];
    for (let k = 0; ; k++) {
      const xb = x0 + d * k * s;
      if (d > 0 ? xb > x1 - 0.25 * L : xb < x1 + 0.25 * L) break;
      const col = [];
      for (let j = -1; ; j++) {
        const y = y0 + (j + (k % 2) * 0.5) * p;
        if (y > y1 + p) break;
        col.push(branchePlan(xb, y, L, w, d));
      }
      rangs.push(col.join('\n'));
    }
    return rangs.reverse().join('\n');
  };

  // Le poêle vu de dessus : caisse, tuyau du côté de la porte (d), quatre pieux ; le rond nu devant.
  const poele = (sx, sy, d) => [
    h.rect(sx - 23, sy - 12, 46, 24, blanc(h.a.arete)),
    h.cercle(sx + d * 12, sy, 6, blanc(h.a.arete)),
    ...[[-27, -16], [27, -16], [-27, 16], [27, 16]].map(([a, b]) => h.cercle(sx + a, sy + b, 3.2, h.a.plein)),
  ].join('\n');
  const rond = (sx, sy, d) => ({ cx: sx - d * 10, cy: sy, rx: 44, ry: 31 });

  // ─── En coupe : géométrie partagée par le dessin et les renvois.
  const coupe = z => {
    const S = z.h - 44, XW = 30, e0 = XW + 22;
    const L = Math.round(0.31 * z.l), A = 40;
    const s = Math.round((z.l - 14 - e0 - L) / 3);
    return { S, XW, e0, L, A, s, n: 4 };
  };
  // Hauteur de la tige au-dessus de la neige, u de 0 (bout coupé) à 1 (pointe).
  const hauteur = (u, A, derniere) => {
    const monte = A * Math.sin(Math.PI / 2 * Math.min(1, u / 0.55));
    if (u <= 0.55) return monte;
    const t = (u - 0.55) / 0.45;
    return derniere ? A * (1 - t * t) + 3 * t * t : A - 2 * t;
  };
  const brancheCoupe = (g, xe, derniere) => {
    const { S, L, A } = g, out = [], pts = [];
    for (let i = 0; i <= 24; i++) {
      const u = i / 24;
      pts.push([xe + u * L, S - hauteur(u, A, derniere)]);
    }
    // Le bout coupé, piqué dans la neige vers le fond.
    const bout = [[xe, S], [xe - 13, S + 19]];
    out.push(h.chemin(bout, 'fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round"'));
    out.push(h.chemin(bout, h.a.arete));
    out.push(h.path(`M ${f(xe - 17)} ${f(S + 16)} L ${f(xe - 9)} ${f(S + 22)}`, h.a.detail));
    // Les aiguilles, couchées vers la pointe, de part et d'autre de la tige.
    const aig = [];
    for (let i = 0; ; i++) {
      const u = 0.07 + i * 0.03;
      if (u > 0.97) break;
      const x = xe + u * L, y = S - hauteur(u, A, derniere);
      const l = 10 * (1 - 0.55 * u), sg = i % 2 ? -1 : 1;
      aig.push(`M ${f(x)} ${f(y)} L ${f(x + 0.8 * l)} ${f(y + sg * 0.6 * l)}`);
    }
    out.push(h.path(aig.join(' '), h.a.fin));
    out.push(h.chemin(pts, h.a.arete));
    return out.join('\n');
  };

  // ─── Les deux plans.
  const plan1 = z => {
    const X0 = 36, X1 = z.l - 34, Y0 = 22, Y1 = z.h - 22, cy = (Y0 + Y1) / 2, gd = Math.round((Y1 - Y0) * 0.17);
    const sx = X1 - 64, sy = Y0 + Math.round((Y1 - Y0) * 0.29);
    return { X0, X1, Y0, Y1, cy, gd, sx, sy, r: rond(sx, sy, 1) };
  };
  const plan2 = z => {
    const cx = Math.round(z.l / 2), cy = Math.round(z.h / 2), rx = cx - 30, ry = cy - 22, al = 0.36;
    // Section 12-G : le shaputuan « porte ses feux en ligne dans l'axe », un poêle près de chaque porte.
    const sxD = cx + rx - 70, syD = cy;
    const sxG = cx - rx + 70, syG = cy;
    return { cx, cy, rx, ry, al, sxD, syD, sxG, syG, rD: rond(sxD, syD, 1), rG: rond(sxG, syG, -1) };
  };

  return {
    ref: '12-02',
    titre: 'Le sapinage posé en écailles',
    desc: 'En coupe, du fond de la tente vers la porte : chaque branche a son bout coupé piqué dans la neige, vers le fond, sa courbe vers le haut comme un ressort, et sa pointe vers la porte ; les rangs se recouvrent comme des écailles, si bien qu’il ne reste en surface que des pointes. Vue de dessus, la tente à une porte : les rangs partent du mur du fond et avancent vers la porte ; près de la porte, le poêle sur ses quatre pieux, et autour de lui un rond de neige nue sans sapinage. La tente à deux portes : le sapinage part du milieu vers chaque porte, avec un poêle et son rond nu près de chaque porte.',
    format: 'pleine',
    disposition: [['coupe'], ['plan'], ['deux']],
    hauteurs: [1.15, 1, 1],
    vues: {
      coupe: {
        titre: 'En coupe, du fond vers la porte',
        dessin: z => {
          const g = coupe(z), { S, XW, e0, s, n, A } = g, out = [];
          // La neige : le plancher foulé, et la neige pelletée contre le mur du fond.
          out.push(h.rect(4, S, z.l - 8, z.h - 6 - S, h.a.hachure('neige', 'aucun')));
          out.push(h.chemin([[4, 36], [XW, 22], [XW, S], [4, S]], h.a.hachure('neige', 'aucun'), true));
          out.push(h.chemin([[4, 36], [XW, 22]], h.a.detail));
          out.push(h.ligne(XW, S, z.l - 4, S, h.a.detail));
          out.push(h.ligne(XW, 10, XW, S, h.a.contour));
          // Les rangs : le dernier posé d'abord, pour que chaque tige passe par-dessus le pied du suivant.
          for (let k = n - 1; k >= 0; k--) out.push(brancheCoupe(g, e0 + k * s, k === n - 1));
          // Le sens de la pose.
          const yf = S - A - 34;
          out.push(h.fleche(`M ${e0 + 10} ${yf} L ${e0 + 3 * s + 40} ${yf}`));
          return out.join('\n');
        },
        renvois: z => {
          const g = coupe(z), { S, e0, s, L, A } = g;
          const yh = u => S - hauteur(u, A, false);
          return [
            { n: 1, rond: [e0 + 34, S + 26], cible: [e0 - 8, S + 13], texte: 'bout coupé piqué vers le fond' },
            { n: 2, rond: [e0 + s + 0.2 * L, S - A - 26], cible: [e0 + s + 0.3 * L, yh(0.3) - 3], texte: 'courbe vers le haut, en ressort' },
            { n: 3, rond: [e0 + 3 * s + L - 6, S - 34], cible: [e0 + 3 * s + L - 4, S - 5], texte: 'pointe vers la porte' },
            { n: 4, rond: [e0 + 2 * s + 16, S + 26], cible: [e0 + 2 * s + 1, S - 2], texte: 'bouts cachés sous les pointes' },
            { n: 5, rond: [e0 + 3 * s + 70, S - A - 34], cible: [e0 + 3 * s + 44, S - A - 34], texte: 'on pose du fond vers la porte' },
          ];
        },
      },
      plan: {
        titre: 'Tente à une porte, vue de dessus',
        dessin: z => {
          const g = plan1(z), { X0, X1, Y0, Y1, cy, gd, sx, sy, r } = g;
          const plancher = `M ${X0} ${Y0} H ${X1} V ${Y1} H ${X0} Z`;
          const out = [];
          out.push(`<clipPath id="sapin-une"><path fill="none" clip-rule="evenodd" d="${plancher} ${ell(r.cx, r.cy, r.rx, r.ry)}"/></clipPath>`);
          out.push(`<g clip-path="url(#sapin-une)">`, tapis(X0 + 2, X1, Y0 - PL.p, Y1, 1), '</g>');
          out.push(h.ellipse(r.cx, r.cy, r.rx, r.ry, h.a.hachure('neige', 'aucun')));
          out.push(poele(sx, sy, 1));
          out.push(h.chemin([[X1, cy - gd], [X1, Y0], [X0, Y0], [X0, Y1], [X1, Y1], [X1, cy + gd]], h.a.contour));
          return out.join('\n');
        },
        renvois: z => {
          const g = plan1(z), { X0, X1, Y1, cy, gd, sx, sy, r } = g;
          return [
            { n: 6, rond: [16, Y1 - 12], cible: [X0 + 8, Y1 - 24], texte: 'premier rang au mur du fond' },
            { n: 7, rond: [X1 + 18, 22], cible: [sx + 27, sy - 16], texte: 'poêle sur ses quatre pieux' },
            { n: 8, rond: [r.cx - r.rx - 18, 11], cible: [r.cx - r.rx + 10, r.cy - 6], texte: 'rond de neige nue, sans sapin' },
            { n: 9, rond: [X1 + 18, cy + gd + 20], cible: [X1 + 2, cy], texte: 'porte' },
          ];
        },
      },
      deux: {
        titre: 'Tente à deux portes, vue de dessus',
        dessin: z => {
          const g = plan2(z), { cx, cy, rx, ry, al, sxD, syD, sxG, syG, rD, rG } = g;
          const pt = t => [f(cx + rx * Math.cos(t)), f(cy + ry * Math.sin(t))];
          const out = [];
          out.push(`<clipPath id="sapin-deux"><path fill="none" clip-rule="evenodd" d="${ell(cx, cy, rx, ry)} ${ell(rD.cx, rD.cy, rD.rx, rD.ry)} ${ell(rG.cx, rG.cy, rG.rx, rG.ry)}"/></clipPath>`);
          out.push(`<g clip-path="url(#sapin-deux)">`,
            tapis(cx, cx + rx, cy - ry - PL.p, cy + ry, 1),
            tapis(cx, cx - rx, cy - ry - PL.p, cy + ry, -1), '</g>');
          out.push(h.ellipse(rD.cx, rD.cy, rD.rx, rD.ry, h.a.hachure('neige', 'aucun')));
          out.push(h.ellipse(rG.cx, rG.cy, rG.rx, rG.ry, h.a.hachure('neige', 'aucun')));
          out.push(poele(sxD, syD, 1), poele(sxG, syG, -1));
          const [a1, a2, a3, a4] = [pt(al), pt(Math.PI - al), pt(Math.PI + al), pt(2 * Math.PI - al)];
          out.push(h.path(`M ${a1[0]} ${a1[1]} A ${rx} ${ry} 0 0 1 ${a2[0]} ${a2[1]}`, h.a.contour));
          out.push(h.path(`M ${a3[0]} ${a3[1]} A ${rx} ${ry} 0 0 1 ${a4[0]} ${a4[1]}`, h.a.contour));
          return out.join('\n');
        },
        renvois: z => {
          const g = plan2(z), { cx, cy, ry, sxG, syG } = g;
          return [
            { n: 10, rond: [cx, 11], cible: [cx, cy - ry * 0.5], texte: 'du milieu vers chaque porte' },
            { n: 11, rond: [sxG + 4, cy + ry - 4], cible: [sxG + 4, syG + 12], texte: 'poêle et rond nu à chaque bout' },
          ];
        },
      },
    },
  };
};
