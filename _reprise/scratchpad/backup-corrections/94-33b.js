// Planche 94-33b — le casseau d'écorce de bouleau, deuxième page : plier, coudre, cercler, étancher.
// ch. 60, §9 « Le contenant », « Réparer au lieu de remplacer », « Écorce : ce que la saison
// donne » (percer au poinçon), étape 10 (racine d'épinette refendue), §5-F (la poix).
// Première page en 60-33a : lever l'écorce, l'aplatir, le gabarit de plis.
// Aucune cote : le chapitre ne donne aucune dimension de casseau.

module.exports = (h) => {
  const r1 = (n) => Math.round(n * 10) / 10;
  const B = (a) => a.replace('fill="none"', 'fill="#FFFFFF"');
  const hasard = (g) => { let s = g; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; };
  const pl = (p) => p.map(q => [r1(q[0]), r1(q[1])]);

  // ─── Vue 1 : le casseau monté, de trois quarts ───
  const gM = (z) => {
    const w = 190, d = 104, s = 76, kx = 0.5, ky = 0.42, e = 3, rb = 7;
    const f = Math.min((z.l - 60) / (w + d * kx + 8), (z.h - 52) / (s + d * ky + 12));
    const X0 = (z.l - (w + d * kx) * f) / 2 - 4, Y0 = z.h - 32;
    const P = (x, y, zz) => [r1(X0 + (x + y * kx) * f), r1(Y0 - (zz + y * ky) * f)];
    return { w, d, s, kx, ky, e, rb, f, X0, Y0, P };
  };
  const vueMonte = (z) => {
    const { w, d, s, ky, e, rb, P } = gM(z), o = [], rnd = hasard(41);
    const T = s + 1;                                         // dessus de la baguette
    // l'intérieur, vu par-dessus le bord
    o.push(h.chemin([P(0, 0, s), P(w, 0, s), P(w, d, s), P(0, d, s)], h.a.blanc, true));
    o.push(h.ligne(...P(0, d, s), ...P(0, d, s - d * ky + 3), h.a.detail));
    // les deux faces vues de dehors
    o.push(h.chemin([P(0, 0, 0), P(w, 0, 0), P(w, 0, s), P(0, 0, s)], h.a.blanc, true));
    o.push(h.chemin([P(w, 0, 0), P(w, d, 0), P(w, d, s), P(w, 0, s)], h.a.blanc, true));
    // lenticelles
    for (let i = 0; i < 40; i++) {
      const zz = 6 + rnd() * (s - rb - 14), x = zz + 6 + rnd() * (w - 2 * zz - 20);
      o.push(h.ligne(...P(x, 0, zz), ...P(x + 4 + 5 * rnd(), 0, zz), h.a.fin));
    }
    // les oreilles des coins, rabattues sur la paroi longue
    o.push(h.chemin([P(0, 0, 0), P(0, 0, s), P(s, 0, s)], B(h.a.arete), true));
    o.push(h.ligne(...P(2.5, 0, 0.5), ...P(s, 0, s - 2.5), h.a.fin));
    o.push(h.chemin([P(w, 0, 0), P(w, 0, s), P(w - s, 0, s)], B(h.a.arete), true));
    // à gauche : les points de racine à nu
    [0.2, 0.38, 0.56, 0.74].forEach(t => {
      const q = P(s * t, 0, s * t);
      o.push(h.ligne(r1(q[0] - 4), r1(q[1] - 4), r1(q[0] + 4), r1(q[1] + 4), h.a.contour));
    });
    // à droite : la même couture, passée à la poix
    const a0 = P(w, 0, 0), a1 = P(w - s, 0, s - rb);
    const dx = a1[0] - a0[0], dy = a1[1] - a0[1], L = Math.hypot(dx, dy), nx = -dy / L * 4, ny = dx / L * 4;
    o.push(h.path(`M${r1(a0[0] - dx / L * 2 + nx * 0.4)},${r1(a0[1] - dy / L * 2 + ny * 0.4)} Q${r1((a0[0] + a1[0]) / 2 + nx * 1.6)},${r1((a0[1] + a1[1]) / 2 + ny * 1.6)} ${r1(a1[0])},${r1(a1[1])} Q${r1((a0[0] + a1[0]) / 2 - nx * 1.6)},${r1((a0[1] + a1[1]) / 2 - ny * 1.6)} ${r1(a0[0] - dx / L * 2 - nx * 0.4)},${r1(a0[1] - dy / L * 2 - ny * 0.4)} Z`, h.a.plein));
    // arêtes : coin avant droit, puis la silhouette
    o.push(h.ligne(...P(w, 0, 0), ...P(w, 0, s), h.a.arete));
    o.push(h.chemin([P(0, 0, s - rb), P(0, 0, 0), P(w, 0, 0), P(w, d, 0), P(w, d, s - rb)], h.a.contour));
    // la baguette cerclée : face avant, face de bout, dessus du cerceau
    o.push(h.chemin([P(-e, -e, T), P(w + e, -e, T), P(w + e, d + e, T), P(-e, d + e, T)], h.a.contour, true));
    o.push(h.chemin([P(0, 0, T), P(w, 0, T), P(w, d, T), P(0, d, T)], h.a.arete, true));
    o.push(h.chemin([P(-e, -e, T), P(w + e, -e, T), P(w + e, -e, T - rb), P(-e, -e, T - rb)], B(h.a.arete), true));
    o.push(h.chemin([P(w + e, -e, T), P(w + e, d + e, T), P(w + e, d + e, T - rb), P(w + e, -e, T - rb)], B(h.a.arete), true));
    o.push(h.chemin([P(-e, -e, T - rb), P(-e, -e, T), P(-e, d + e, T), P(w + e, d + e, T), P(w + e, d + e, T - rb)], h.a.contour));
    // la racine enroulée sur la baguette, par les trous sous le cerceau
    for (let x = 7; x < w - 4; x += 12) {
      o.push(h.ligne(...P(x, -e, T), ...P(x + 4, -e, T - rb), h.a.arete));
      o.push(h.ligne(...P(x + 4, -e, T - rb), ...P(x + 5, 0, T - rb - 4), h.a.arete));
    }
    for (let y = 7; y < d - 2; y += 12) {
      o.push(h.ligne(...P(w + e, y, T), ...P(w + e, y + 4, T - rb), h.a.arete));
      o.push(h.ligne(...P(w + e, y + 4, T - rb), ...P(w, y + 5, T - rb - 4), h.a.arete));
    }
    return o.join('\n');
  };

  // Deux épaisseurs d'écorce couchées, percées aux x donnés.
  const EP = 6.5;
  const couches = (x0, x1, y, trous) => {
    const o = [h.rect(x0, r1(y - EP), r1(x1 - x0), EP, B(h.a.arete)), h.rect(x0, r1(y), r1(x1 - x0), EP, B(h.a.arete))];
    trous.forEach(x => o.push(h.rect(r1(x - 2), r1(y - EP - 1), 4, 2 * EP + 2, h.a.blanc)));
    return o.join('\n');
  };
  // Un point de racine vu en coupe : dessus, dans le trou, dessous, dans l'autre trou, dessus.
  const point = (xa, x1, x2, xb, y) => {
    const yt = y - EP - 1.4, yb = y + EP + 1.4;
    return h.chemin(pl([[xa, yt], [x1 - 3, yt], [x1, yt + 3], [x1, yb - 3], [x1 + 3, yb], [x2 - 3, yb], [x2, yb - 3], [x2, yt + 3], [x2 + 3, yt], [xb, yt]]), h.a.contour);
  };

  // ─── Vue 2 : percer au poinçon, puis coudre ───
  const gC = (z) => ({ yA: Math.max(70, z.h * 0.34), yB: z.h * 0.66, nx: z.l * 0.44, hx1: z.l * 0.3, hx2: z.l * 0.56 });
  const vueCouture = (z) => {
    const { yA, yB, nx, hx1, hx2 } = gC(z), o = [];
    // percer : le clou aiguisé traverse les deux épaisseurs
    o.push(couches(12, z.l - 12, yA, [nx]));
    o.push(h.chemin(pl([[nx - 2.3, yA - 50], [nx + 2.3, yA - 50], [nx + 2.3, yA + 6], [nx, yA + 15], [nx - 2.3, yA + 6]]), B(h.a.arete), true));
    o.push(h.rect(r1(nx - 8), r1(yA - 54), 16, 4, h.a.plein));
    o.push(h.fleche(`M${r1(nx + 20)},${r1(yA - 48)} L${r1(nx + 20)},${r1(yA - 16)}`));
    // coudre : la racine passe dans les trous
    o.push(couches(12, z.l - 12, yB, [hx1, hx2]));
    o.push(point(20, hx1, hx2, z.l - 58, yB));
    o.push(h.fleche(`M${r1(z.l - 58)},${r1(yB - 5.9)} L${r1(z.l - 34)},${r1(yB - 5.9)}`));
    // la racine refendue, vue par le bout : deux demi-rondins
    const cxr = z.l * 0.5, cyr = yB + 44, r = 9;
    o.push(h.path(`M${r1(cxr - 2)},${r1(cyr - r)} A${r},${r} 0 0 0 ${r1(cxr - 2)},${r1(cyr + r)} Z`, h.a.hachure('bois')));
    o.push(h.path(`M${r1(cxr + 2)},${r1(cyr - r)} A${r},${r} 0 0 1 ${r1(cxr + 2)},${r1(cyr + r)} Z`, h.a.hachure('bois')));
    return o.join('\n');
  };

  // ─── Vue 3 : le rebord en coupe ───
  const gR = (z) => {
    const t = 7, cx = z.l * 0.34, yT = 30, yBot = z.h - 8, r = 18;
    const xo = cx + 3 * t, bx = xo + r, by = yT + r - 2, yH = by + r + 12, yE = yT + (yBot - yT) * 0.7;
    return { t, cx, xo, yT, yBot, r, bx, by, yH, yE };
  };
  const vueRebord = (z) => {
    const { t, cx, xo, yT, yBot, r, bx, by, yH, yE } = gR(z), o = [];
    // paroi, dedans à gauche
    o.push(h.rect(r1(cx), yT, t, r1(yBot - yT), B(h.a.arete)));
    // l'oreille : deux épaisseurs repliées, le pli en bas
    o.push(h.path(`M${r1(cx + t)},${yT} L${r1(cx + t)},${r1(yE)} A${t},${t} 0 0 0 ${r1(xo)},${r1(yE)} L${r1(xo)},${yT} Z`, B(h.a.arete)));
    o.push(h.ligne(r1(cx + 2 * t), yT, r1(cx + 2 * t), r1(yE), h.a.detail));
    // le trou sous la baguette, à travers les trois épaisseurs
    o.push(h.rect(r1(cx - 1), r1(yH - 2.4), r1(3 * t + 2), 4.8, h.a.blanc));
    // la baguette, en bout
    o.push(h.cercle(r1(bx), r1(by), r, h.a.hachure('bois')));
    // la racine : dans le trou, autour de la baguette, par-dessus le bord, redescend dedans
    const R = r + 1.8, c = Math.SQRT1_2;
    o.push(h.path(`M${r1(cx - 1.8)},${r1(yH)} L${r1(xo + 1.5)},${r1(yH)} Q${r1(bx - 2)},${r1(by + R + 1)} ${r1(bx)},${r1(by + R)} A${r1(R)},${r1(R)} 0 0 0 ${r1(bx)},${r1(by - R)} A${r1(R)},${r1(R)} 0 0 0 ${r1(bx - R * c)},${r1(by - R * c)} L${r1(cx + t)},${r1(yT - 2.4)} Q${r1(cx - 1.8)},${r1(yT - 2)} ${r1(cx - 1.8)},${r1(yT + 4)} Z`, h.a.contour));
    return o.join('\n');
  };

  // ─── Vue 4 : la couture étanchée à la poix ───
  const gP = (z) => {
    const y = z.h * 0.66, hx1 = z.l * 0.38, hx2 = z.l * 0.6, xa = z.l * 0.2, xb = z.l * 0.8, ep = 6.5;
    return { y, hx1, hx2, xa, xb, ep };
  };
  const vuePoix = (z) => {
    const { y, hx1, hx2, xa, xb, ep } = gP(z), o = [];
    o.push(couches(12, z.l - 12, y, [hx1, hx2]));
    o.push(point(xa + 14, hx1, hx2, xb - 14, y));
    // poix : couche aplatie par la palette
    const yP = y - EP - 2.8;
    o.push(h.path(`M${r1(xa)},${r1(yP)} Q${r1(xa + 10)},${r1(yP - ep)} ${r1(xa + 24)},${r1(yP - ep - 2)} L${r1(xb - 24)},${r1(yP - ep - 2)} Q${r1(xb - 10)},${r1(yP - ep)} ${r1(xb)},${r1(yP)} Z`, h.a.plein));
    // tissu pris dedans, qui dépasse des deux bouts
    const yt = yP - ep * 0.62;
    o.push(h.path(`M${r1(xa - 12)},${r1(yP - 1.2)} Q${r1(xa + 8)},${r1(yt)} ${r1(xa + 26)},${r1(yt)} L${r1(xb - 26)},${r1(yt)} Q${r1(xb - 8)},${r1(yt)} ${r1(xb + 12)},${r1(yP - 1.2)} L${r1(xb + 12)},${r1(yP - 2.8)} Q${r1(xb - 8)},${r1(yt - 1.6)} ${r1(xb - 26)},${r1(yt - 1.6)} L${r1(xa + 26)},${r1(yt - 1.6)} Q${r1(xa + 8)},${r1(yt - 1.6)} ${r1(xa - 12)},${r1(yP - 2.8)} Z`, B(h.a.fin)));
    // la palette qui presse
    const yq = yP - ep - 2;
    o.push(h.rect(r1(xa + 18), r1(yq - 8), r1(xb - xa - 36), 8, B(h.a.contour)));
    o.push(h.ligne(r1(xa + 30), r1(yq - 4), r1(xb - 40), r1(yq - 4.6), h.a.fin));
    [0.36, 0.64].forEach(k => { const x = xa + (xb - xa) * k; o.push(h.fleche(`M${r1(x)},${r1(yq - 44)} L${r1(x)},${r1(yq - 12)}`)); });
    return o.join('\n');
  };

  return {
    ref: '94-33b',
    titre: 'Le casseau d’écorce, plié, cousu, étanché',
    desc: 'Le casseau monté, vu de trois quarts : chaque coin plié en oreille rabattue sur la paroi longue et cousu à la racine d’épinette refendue, la même couture passée à la poix de l’autre côté, le bord cerclé d’une baguette que la racine enroule en passant par des trous. En détail : un clou aiguisé perce les deux épaisseurs avant que la racine passe ; la racine fendue en deux ; le rebord en coupe, l’oreille pincée entre la paroi et la baguette ; la couture en coupe sous une couche de poix chaude où un tissu est pris, pressée à la palette jusqu’au froid.',
    format: 'pleine',
    disposition: [['monte', 'couture'], ['rebord', 'poix']],
    hauteurs: [1.35, 1],
    largeurs: [[1.9, 1], [1, 1]],
    vues: {
      monte: {
        titre: 'Plié, cousu, cerclé',
        dessin: vueMonte,
        renvois: (z) => {
          const { w, s, e, rb, P, Y0 } = gM(z);
          const c1 = P(s * 0.2, 0, s * 0.62), c2 = P(s * 0.38, 0, s * 0.38), c3 = P(w * 0.46, -e, s + 1 - rb / 2), c4 = P(w - s * 0.5, 0, s * 0.45);
          return [
            { n: 1, rond: [P(0, 0, s)[0] + 4, P(0, 0, s)[1] - 44], cible: c1, texte: 'oreille rabattue sur la paroi' },
            { n: 2, rond: [c2[0] + 18, Math.min(z.h - 13, Y0 + 18)], cible: [c2[0] + 3, c2[1] + 3], texte: 'cousue à la racine refendue' },
            { n: 3, rond: [c3[0] - 30, Math.max(12, P(0, 104, s)[1] - 30)], cible: c3, texte: 'baguette liée à la racine' },
            { n: 4, rond: [c4[0] + 34, Math.min(z.h - 13, Y0 + 18)], cible: c4, texte: 'la couture passée à la poix' },
          ];
        },
      },
      couture: {
        titre: 'Percer, puis coudre',
        dessin: vueCouture,
        renvois: (z) => {
          const { yA, yB, nx } = gC(z);
          return [
            { n: 5, rond: [nx - 34, yA - 40], cible: [nx - 2, yA - 30], texte: 'poinçon : clou, os ou bois' },
            { n: 6, rond: [z.l - 24, yA - 28], cible: [z.l - 30, yA - 2], texte: 'oreille et paroi ensemble' },
            { n: 7, rond: [z.l * 0.5 + 40, yB + 30], cible: [z.l * 0.5 + 8, yB + 40], texte: 'racine fendue, remouillée' },
          ];
        },
      },
      rebord: {
        titre: 'Le rebord, en coupe',
        dessin: vueRebord,
        renvois: (z) => {
          const { t, cx, xo, r, bx, by, yH, yE } = gR(z);
          return [
            { n: 8, rond: [bx + r + 40, by - 2], cible: [bx + 5, by + 3], texte: 'baguette cintrée, dehors' },
            { n: 9, rond: [cx - 46, yH + 20], cible: [cx - 1.8, yH - 8], texte: 'racine passée dans le trou' },
            { n: 10, rond: [bx + r + 40, yE - 20], cible: [xo, yE - 16], texte: 'l’oreille, pincée dessous' },
          ];
        },
      },
      poix: {
        titre: 'La couture étanchée, en coupe',
        dessin: vuePoix,
        renvois: (z) => {
          const { y, xa, xb, ep } = gP(z), yP = y - EP - 2.8;
          return [
            { n: 11, rond: [xa - 4, yP + 30], cible: [xa + 10, yP - 2], texte: 'couture sèche, poix chaude' },
            { n: 12, rond: [xb + 14, yP + 26], cible: [xb + 8, yP - 2], texte: 'tissu ou écorce pris dedans' },
            { n: 13, rond: [xb - 8, yP - ep - 44], cible: [xb - 30, yP - ep - 8], texte: 'pressé jusqu’au froid' },
          ];
        },
      },
    },
    danger: 'Danger — la poix fondue colle à la peau, durcit dessus et continue de la cuire : on ne l’arrache pas, on refroidit longtemps à l’eau froide. Poix qui prend feu : on couvre, jamais d’eau, elle la projette.',
  };
};
