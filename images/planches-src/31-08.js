// Planche 31-08 — Creuser un sol gelé au feu (ch. 28, « Creuser un trou dans un sol gelé »)
module.exports = (h) => {
  const S = 22;                                   // épaisseur de la neige au sol
  const forme = (t) => 1 - Math.pow(Math.abs(t), 4);   // fond plat, parois raides
  const R = (v) => Math.round(v * 10) / 10;

  // géométrie commune aux quatre coupes de la séquence
  const geo = (z) => {
    const GS = Math.round(z.h * 0.44);            // dessus du sol
    const cx = z.l / 2;
    return {
      GS, cx,
      xn1: z.l * 0.15, xn2: z.l * 0.85,          // bords du dégagement
      xa: z.l * 0.27, xb: z.l * 0.73,            // bords du trou
      d1: Math.max(16, Math.round(z.h * 0.12)),   // épaisseur dégelée par un feu
      yb: z.h - 4,                                // bas de la coupe
    };
  };
  // courbe y = GS + k·d1·forme(t) entre xa et xb
  const profil = (g, k, n = 28) => {
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const t = -1 + 2 * i / n;
      pts.push([g.xa + (g.xb - g.xa) * i / n, g.GS + k * g.d1 * forme(t)]);
    }
    return pts;
  };
  const casse = (z, y) => {                       // ligne de coupe du bas, irrégulière
    const pts = [];
    for (let i = 0; i <= 12; i++) pts.push([z.l * i / 12, y - (i % 3 === 1 ? 3 : i % 3 === 2 ? 1 : 0)]);
    return pts;
  };
  // le sol, creusé jusqu'à la profondeur k·d1
  const sol = (z, g, k) => {
    const dessus = k ? [[0, g.GS], ...profil(g, k), [z.l, g.GS]] : [[0, g.GS], [z.l, g.GS]];
    const bas = casse(z, g.yb).reverse();
    return [
      h.chemin([...dessus, ...bas], h.a.hachure('terre', 'aucun'), true),
      h.chemin(casse(z, g.yb), h.a.fin),
      h.chemin(dessus, h.a.contour),
    ].join('\n');
  };
  // la couche dégelée sous le fond : entre k·d1 et (k+1)·d1
  const degel = (g, k) => {
    const haut = k ? profil(g, k) : [[g.xa, g.GS], [g.xb, g.GS]];
    const bas = profil(g, k + 1).reverse();
    const forme2 = [...haut, ...bas];
    return [
      h.chemin(forme2, h.a.blanc, true),
      h.chemin(forme2, h.a.hachure('gravier', 'aucun'), true),
      h.chemin(profil(g, k + 1), h.a.cache),
    ].join('\n');
  };
  // la neige de part et d'autre du dégagement, pelletée en bourrelet sur le bord
  const neige = (z, g) => {
    const y0 = g.GS - S;
    const gauche = [[0, g.GS], [0, y0 + 1], [z.l * 0.05, y0 - 1], [g.xn1 - 18, y0 - 2], [g.xn1 - 8, y0 - 7],
      [g.xn1 - 2, y0 - 5], [g.xn1, y0 + 2], [g.xn1, g.GS]];
    const droite = [[z.l, g.GS], [z.l, y0 + 1], [z.l * 0.95, y0 - 1], [g.xn2 + 18, y0 - 2], [g.xn2 + 8, y0 - 7],
      [g.xn2 + 2, y0 - 5], [g.xn2, y0 + 2], [g.xn2, g.GS]];
    return [gauche, droite].map((p) => [
      h.chemin(p, h.a.blanc, true),
      h.chemin(p, h.a.hachure('neige', 'arete'), true),
    ].join('\n')).join('\n');
  };
  // un feu de quartiers de bois empilés, vus par le bout : trois rangs, flammes entre et au-dessus
  const feu = (cx, yb, w) => {
    const out = [];
    const sp = w / 4.2, r = sp * 0.45;
    const tips = [[-0.3, 50], [-0.08, 62], [0.14, 56], [0.34, 44]];
    const vals = [[-0.43, 4], [-0.2, 32], [0.03, 36], [0.24, 30], [0.43, 4]];
    let d = `M ${R(cx + vals[0][0] * w)} ${R(yb - vals[0][1])}`;
    tips.forEach(([tx, th], i) => {
      const v0 = vals[i], v1 = vals[i + 1];
      const X = cx + tx * w, Y = yb - th, V0x = cx + v0[0] * w, V0y = yb - v0[1], V1x = cx + v1[0] * w, V1y = yb - v1[1];
      d += ` C ${R(V0x + 1)} ${R(V0y - 0.55 * (V0y - Y))} ${R(X - 4)} ${R(Y + 0.4 * (V0y - Y))} ${R(X)} ${R(Y)}`;
      d += ` C ${R(X + 1)} ${R(Y + 0.35 * (V1y - Y))} ${R(V1x - 2)} ${R(V1y - 0.5 * (V1y - Y))} ${R(V1x)} ${R(V1y)}`;
    });
    out.push(h.path(d + ' Z', `fill="#FFFFFF" stroke="#1A1A1A" stroke-width="0.7" stroke-linejoin="round"`));
    // flammes intérieures
    [[-0.08, 48], [0.14, 44]].forEach(([tx, th]) => {
      const fx = cx + tx * w, y1 = yb - 30;
      out.push(h.path(`M ${R(fx - 5)} ${R(y1)} C ${R(fx - 6)} ${R(y1 - 8)} ${R(fx - 2)} ${R(yb - th + 8)} ${R(fx)} ${R(yb - th)} C ${R(fx + 2)} ${R(yb - th + 8)} ${R(fx + 6)} ${R(y1 - 8)} ${R(fx + 4)} ${R(y1)}`, h.a.fin));
    });
    // bûches par le bout
    const rangs = [[[-1.2, 0, 1.2], 1], [[-0.6, 0.6], 2.75]];
    rangs.forEach(([xs, k]) => xs.forEach((dx, j) => {
      const x = cx + dx * sp, y = yb - k * r;
      out.push(h.cercle(x, y, r, h.a.blanc), h.cercle(x, y, r, h.a.arete), h.cercle(x, y, r * 0.45, h.a.fin));
    }));
    return out.join('\n');
  };
  // les braises repoussées : un tas bas de morceaux
  const braises = (x1, x2, y) => {
    const m = (x1 + x2) / 2, l = x2 - x1;
    const out = [h.path(`M ${R(x1)} ${R(y)} Q ${R(m)} ${R(y - 28)} ${R(x2)} ${R(y)} Z`, h.a.blanc),
      h.path(`M ${R(x1)} ${R(y)} Q ${R(m)} ${R(y - 28)} ${R(x2)} ${R(y)}`, h.a.detail)];
    [[0.18, 1.5, 1], [0.34, 5, 1], [0.5, 9.5, 1], [0.66, 5, 1], [0.82, 1.5, 1], [0.42, 1.5, 0], [0.58, 1.5, 0], [0.4, 8.5, 0], [0.6, 8.5, 0], [0.5, 4.5, 0]]
      .forEach(([t, dy, p]) => {
        const x = x1 + t * l, yy = y - dy - 2;
        out.push(p ? h.ellipse(x, yy, 3.8, 2.3, h.a.plein) : h.ellipse(x, yy, 3.4, 2.1, h.a.detail));
      });
    return out.join('\n');
  };
  // tas de terre sortie, posé sur la neige
  const tas = (x1, x2, y, ht) => {
    const pts = [];
    for (let i = 0; i <= 14; i++) {
      const t = i / 14;
      pts.push([x1 + (x2 - x1) * t, y - ht * Math.pow(Math.sin(Math.PI * t), 0.75) + (i % 2 && i < 14 ? 1.2 : 0)]);
    }
    return [h.chemin(pts, h.a.blanc, true), h.chemin(pts, h.a.hachure('gravier', 'arete'), true)].join('\n');
  };
  // la pelle, de profil : lame à plat au fond (bx = pointe, by = fond), douille, manche qui remonte
  const pelle = (bx, by, deg) => {
    const L = 34;                                   // lame : environ 1/4 du manche (130)
    const lame = [[bx, by - 1], [bx + L, by - 1]];  // dessous de la lame, posé sur le fond
    const plaque = [[bx - 2, by - 3.5], [bx, by - 1], [bx + L * 0.5, by + 0.2], [bx + L, by - 1], [bx + L + 2, by - 9],
      [bx + L, by - 7], [bx + L * 0.5, by - 2.4], [bx + 1, by - 3.2]];
    const charge = [];
    for (let i = 0; i <= 10; i++) { const t = i / 10; charge.push([bx + 2 + (L - 3) * t, by - 2.6 - 9 * Math.pow(Math.sin(Math.PI * t), 0.8)]); }
    const a = deg * Math.PI / 180, ox = bx + L + 1, oy = by - 8;   // départ de la douille, au talon
    const P = ([dx, dy]) => [ox + dx * Math.cos(a) - dy * Math.sin(a), oy + dx * Math.sin(a) + dy * Math.cos(a)];
    const pts = (l) => l.map(P);
    return [
      h.chemin(charge, h.a.blanc, true),
      h.chemin(charge, h.a.hachure('gravier', 'detail'), true),
      h.chemin(plaque, h.a.blanc, true), h.chemin(plaque, h.a.arete, true),
      h.chemin(pts([[0, -3.6], [14, -2.6], [14, 2.6], [0, 3.6]]), h.a.blanc, true),
      h.chemin(pts([[0, -3.6], [14, -2.6], [14, 2.6], [0, 3.6]]), h.a.arete, true),
      h.ligne(...P([5, -3.2]), ...P([5, 3.2]), h.a.fin),
      h.chemin(pts([[14, -2.2], [120, -2.2], [120, 2.2], [14, 2.2]]), h.a.blanc, true),
      h.chemin(pts([[14, -2.2], [120, -2.2], [120, 2.2], [14, 2.2]]), h.a.arete, true),
      h.chemin(pts([[120, -2.2], [128, -8], [136, -8], [136, 8], [128, 8], [120, 2.2]]), h.a.arete),
    ].join('\n');
  };

  return {
    ref: '31-08',
    titre: 'Creuser un sol gelé au feu',
    desc: 'Quatre coupes du même trou en février, puis une cinquième du trou creusé d’avance en septembre, vu en hiver. On dégage la neige jusqu’au sol ; on y fait un feu vif, qui dégèle une épaisseur de terre sous lui ; on repousse les braises sur le bord et on sort la couche dégelée à la pelle, la terre en tas sur la neige ; on refait le feu au fond du trou et on recommence. En bas, le trou creusé en septembre, 1200 mm de profondeur, couvert d’une perche d’un bord à l’autre, de branches en travers et de neige tassée par-dessus.',
    format: 'pleine',
    disposition: [['neige', 'feu'], ['gratter', 'refaire'], ['septembre']],
    hauteurs: [1, 1, 1.15],
    vues: {
      neige: {
        titre: 'Dégager jusqu’au sol',
        dessin: (z) => {
          const g = geo(z);
          return [sol(z, g, 0), neige(z, g)].join('\n');
        },
        renvois: (z) => {
          const g = geo(z);
          return [
            { n: 1, rond: [z.l / 2, g.GS - 34], cible: [z.l / 2, g.GS - 2], texte: 'neige dégagée jusqu’au sol' },
            { n: 2, rond: [z.l * 0.62, z.h - 24], cible: [z.l * 0.5, g.GS + 26], texte: 'sol gelé' },
          ];
        },
      },
      feu: {
        titre: 'Feu vif, plusieurs heures',
        dessin: (z) => {
          const g = geo(z);
          return [sol(z, g, 0), degel(g, 0), neige(z, g), feu(g.cx, g.GS, z.l * 0.3)].join('\n');
        },
        renvois: (z) => {
          const g = geo(z);
          return [
            { n: 3, rond: [z.l * 0.8, g.GS - 62], cible: [g.cx + 0.14 * z.l * 0.3 + 2, g.GS - 50], texte: 'feu vif de bois sec' },
            { n: 4, rond: [z.l * 0.86, g.GS + g.d1 + 18], cible: [z.l * 0.6, g.GS + g.d1 * 0.6], texte: 'couche dégelée sous le feu' },
          ];
        },
      },
      gratter: {
        titre: 'Repousser les braises, gratter',
        dessin: (z) => {
          const g = geo(z);
          const fond = g.GS + g.d1;
          return [
            sol(z, g, 1), neige(z, g),
            braises(g.xn1 + 2, g.xa - 3, g.GS),
            tas(z.l * 0.865, z.l - 3, g.GS - S, 15),
            tas(g.cx - 60, g.cx - 45, fond, 6),
            pelle(g.cx - 46, fond, -32),
            h.fleche(`M ${R(g.cx - 24)} ${R(fond - 16)} Q ${R(g.cx + 30)} ${R(g.GS - 78)} ${R(z.l * 0.9)} ${R(g.GS - S - 22)}`, h.a.arete),
          ].join('\n');
        },
        renvois: (z) => {
          const g = geo(z);
          const fond = g.GS + g.d1;
          return [
            { n: 5, rond: [g.xn1 + 12, g.GS - 42], cible: [(g.xn1 + g.xa) / 2, g.GS - 6], texte: 'braises repoussées' },
            { n: 6, rond: [g.cx - 40, fond + 32], cible: [g.cx - 30, fond - 5], texte: 'couche dégelée grattée' },
            { n: 7, rond: [z.l - 20, g.GS - S - 42], cible: [z.l * 0.93, g.GS - S - 10], texte: 'terre sortie' },
          ];
        },
      },
      refaire: {
        titre: 'Refaire le feu au fond, recommencer',
        dessin: (z) => {
          const g = geo(z);
          return [
            sol(z, g, 2), degel(g, 2), neige(z, g),
            tas(z.l * 0.855, z.l - 3, g.GS - S, 24),
            feu(g.cx, g.GS + 2 * g.d1, z.l * 0.26),
          ].join('\n');
        },
        renvois: (z) => {
          const g = geo(z);
          return [
            { n: 8, rond: [z.l * 0.2, g.GS - 50], cible: [g.cx - 0.3 * z.l * 0.26 + 1, g.GS + 2 * g.d1 - 44], texte: 'nouveau feu au fond' },
          ];
        },
      },
      septembre: {
        titre: 'Creusé en septembre, couvert pour l’hiver',
        dessin: (z) => {
          const GS = Math.round(z.h * 0.3), yb = z.h - 4;
          const D = Math.round(yb - GS - 22);                 // 1,2 m
          const cx = z.l / 2, xa = cx - D / 2, xb = cx + D / 2;
          const y0 = GS - S;
          const out = [];
          // sol et trou
          const trou = [[0, GS], [xa, GS], [xa + 1, GS + D * 0.4], [xa - 1, GS + D * 0.75], [xa + 2, GS + D],
            [xb - 1, GS + D], [xb + 1, GS + D * 0.7], [xb - 1, GS + D * 0.35], [xb, GS], [z.l, GS]];
          const bas = casse(z, yb).reverse();
          out.push(h.chemin([...trou, ...bas], h.a.hachure('terre', 'aucun'), true));
          out.push(h.chemin(casse(z, yb), h.a.fin));
          out.push(h.chemin(trou, h.a.contour));
          // neige : couche continue, bombée au-dessus du trou, portée par les branchages
          const nx1 = xa - 34, nx2 = xb + 34, yB = GS - 13;
          const dessus = [[0, y0 + 1], [z.l * 0.1, y0 - 1], [z.l * 0.2, y0 + 1], [nx1 - 10, y0], [nx1 + 10, y0 - 6],
            [cx - D * 0.25, y0 - 11], [cx + D * 0.25, y0 - 11], [nx2 - 10, y0 - 6], [nx2 + 10, y0],
            [z.l * 0.8, y0 + 1], [z.l * 0.9, y0 - 1], [z.l, y0 + 1]];
          const dessous = [[z.l, GS], [xb + 26, GS], [xb + 26, yB], [xa - 26, yB], [xa - 26, GS], [0, GS]];
          const pn = [...dessus, ...dessous];
          out.push(h.chemin(pn, h.a.blanc, true), h.chemin(pn, h.a.hachure('neige', 'aucun'), true));
          out.push(h.chemin(dessus, h.a.arete));
          // branchages : une perche posée d'un bord à l'autre, des branches en travers par-dessus (vues par le bout)
          out.push(h.rect(xa - 26, yB, D + 52, GS - yB, h.a.blanc));
          // perche ronde, bouts arrondis, qui porte sur le sol au-delà des deux bords
          const perche = `M ${R(xa - 22)} ${R(GS - 5)} L ${R(xb + 22)} ${R(GS - 5)} A 2.5 2.5 0 0 1 ${R(xb + 22)} ${R(GS)} L ${R(xa - 22)} ${R(GS)} A 2.5 2.5 0 0 1 ${R(xa - 22)} ${R(GS - 5)} Z`;
          out.push(h.path(perche, h.a.blanc), h.path(perche, h.a.arete), h.ligne(xa - 18, GS - 3.6, xb + 18, GS - 3.6, h.a.fin));
          const nb = 13, r = 3.6;
          for (let i = 0; i < nb; i++) {
            const x = xa - 18 + (D + 36) * i / (nb - 1), y = GS - 5 - r;
            out.push(h.cercle(x, y, r, h.a.blanc), h.cercle(x, y, r, h.a.detail));
          }
          // cote de profondeur, dans le vide du trou
          const xc = xb + 44;
          out.push(h.ligne(xb + 28, GS, xc + 6, GS, h.a.fin), h.ligne(xb + 4, GS + D, xc + 6, GS + D, h.a.fin));
          out.push(h.fleche(`M ${R(xc)} ${R(GS + D / 2)} L ${R(xc)} ${R(GS + 1)}`, h.a.detail), h.fleche(`M ${R(xc)} ${R(GS + D / 2)} L ${R(xc)} ${R(GS + D - 1)}`, h.a.detail));
          out.push(h.texte(xc + 8, GS + D / 2 + 4, '1200', { ancre: 'start', lisere: true }));
          return out.join('\n');
        },
        renvois: (z) => {
          const GS = Math.round(z.h * 0.3), yb = z.h - 4;
          const D = Math.round(yb - GS - 22);
          const cx = z.l / 2, xa = cx - D / 2, xb = cx + D / 2;
          return [
            { n: 9, rond: [xa - 60, GS + D * 0.6], cible: [xa + 2, GS + D * 0.6], texte: 'trou creusé en septembre' },
            { n: 10, rond: [xb + 70, GS + 16], cible: [xb + 18, GS - 2.5], texte: 'branchages en travers' },
            { n: 11, rond: [xa - 60, GS + 22], cible: [xa - 14, GS - 2.5], texte: 'perche d’un bord à l’autre' },
            { n: 12, rond: [cx + D * 1.0, 15], cible: [cx + D * 0.28, GS - S - 6], texte: 'neige tassée par-dessus' },
          ];
        },
      },
    },
  };
};
