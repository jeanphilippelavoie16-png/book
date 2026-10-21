// Planche 79-06 — Le silo de terre (chapitre 76, § Le silo de terre).
// Le chapitre ne donne aucune dimension pour le silo : aucune cote, l'échelle vient de la pelle.
// La charte : coupes hachurées et plan, donc pas de gris ; les poids étaient déjà justes (la terre
// du silo au trait fort). Le rouge : un seul point à contrôler, le bouchon de paille qui sort de la
// terre au sommet (un silo hermétique cuit son contenu). Pas de geste.
module.exports = (h) => {
  const f = n => (+n).toFixed(1);
  const pl = (pts, ferme) => pts.map((p, i) => (i ? 'L' : 'M') + f(p[0]) + ',' + f(p[1])).join(' ') + (ferme ? ' Z' : '');
  const BL = h.a.blanc.split(' ')[0];
  const rempli = t => h.a[t].replace('fill="none"', BL);
  const air = h.a.cache.replace('stroke-width="0.7"', 'stroke-width="1.4"');
  const dome = (a, H, p) => dx => { const u = Math.min(1, Math.abs(dx) / a); return H * (1 - Math.pow(u, p)); };
  const xs = (a, b, n) => Array.from({ length: n + 1 }, (_, i) => a + (b - a) * i / n);
  const alea = g => () => { g = (g * 16807) % 2147483647; return (g - 1) / 2147483646; };
  const tourne = (x, y, ang, pts) => { const c = Math.cos(ang), s = Math.sin(ang); return pts.map(([px, py]) => [x + px * c - py * s, y + px * s + py * c]); };
  const carotte = (x, y, L, e, ang) => h.path(pl(tourne(x, y, ang, [[0, -e], [L * 0.5, -e * 0.72], [L, 0], [L * 0.5, e * 0.72], [0, e], [-e * 0.7, e * 0.55], [-e * 0.85, 0], [-e * 0.7, -e * 0.55]]), true), rempli('detail'));
  const traits = segs => h.path(segs.map(([a, b, c, d]) => `M${f(a)},${f(b)} L${f(c)},${f(d)}`).join(' '), h.a.detail);
  const rave = (x, y, r) => h.cercle(x, y, r, rempli('detail')) + '\n' + traits([[x, y + r, x + r * 0.25, y + r * 1.45]]);
  const rameau = (pts, nl) => {
    let d = pl(pts);
    for (let i = 1; i < pts.length - 1; i++) {
      const [x, y] = pts[i], [x2, y2] = pts[i + 1];
      const L = Math.hypot(x2 - x, y2 - y), ux = (x2 - x) / L, uy = (y2 - y) / L, n = nl(x);
      const px = -uy * n, py = ux * n, gx = ux * 0.45 * n, gy = uy * 0.45 * n;
      d += ` M${f(x - px - gx)},${f(y - py - gy)} L${f(x + px + gx)},${f(y + py + gy)}`;
    }
    return h.path(d, h.a.detail);
  };
  // brins de paille en vrac : un brin par case d'une grille, placé au hasard dans sa case : la paille couvre sans grumeaux
  const brins = (dedans, bx, pas, lg, graine, angle) => {
    const r = alea(graine), segs = [];
    for (let gy = bx[1]; gy < bx[3]; gy += pas) for (let gx = bx[0]; gx < bx[2]; gx += pas) {
      for (let essai = 0; essai < 6; essai++) {
        const x = gx + r() * pas, y = gy + r() * pas;
        const a = angle ? angle(r) : r() * Math.PI, c = Math.cos(a) * lg / 2, s = Math.sin(a) * lg / 2;
        if (dedans(x - c, y - s) && dedans(x + c, y + s) && dedans(x, y)) { segs.push([x - c, y - s, x + c, y + s]); break; }
      }
    }
    return traits(segs);
  };
  const debout = r => Math.PI / 2 + (r() - 0.5) * 0.25;
  // planche posée en pente : repose sur le point S, pied en L, prolongée de `lg` au-delà de S
  const planche = (L, S, lg, ep) => {
    const dx = S[0] - L[0], dy = S[1] - L[1], n = Math.hypot(dx, dy), d = [dx / n, dy / n], p = [d[1], -d[0]];
    const E = [S[0] + d[0] * lg, S[1] + d[1] * lg];
    const q = [p[0] * ep, p[1] * ep];
    const pts = [L, E, [E[0] + q[0], E[1] + q[1]], [L[0] + q[0], L[1] + q[1]]];
    const dessus = x => { const t = (x - L[0]) / (E[0] - L[0]); return [x, L[1] + q[1] + (E[1] - L[1]) * t]; };
    const dessous = x => { const t = (x - L[0]) / (E[0] - L[0]); return [x, L[1] + (E[1] - L[1]) * t]; };
    return { pts, E, dessus, dessous };
  };

  // ─── En coupe ───────────────────────────────────────────────────────────────
  const gC = z => {
    const s = Math.min(z.l / 600, z.h / 252), K = v => v * s;
    const cx = z.l / 2, yg = z.h - K(56), X0 = 3, X1 = z.l - 3;
    const a0 = K(120), d0 = K(16);
    const tt = x => Math.max(0, Math.min(1, (x - cx + a0) / (2 * a0)));
    const bo = x => 4 * tt(x) * (1 - tt(x));
    const ydep = x => yg + d0 * bo(x);
    const ylit = x => ydep(x) - K(9) * bo(x);
    const ytige = x => ydep(x) - K(4.5) * bo(x);
    const cone = dome(K(100), K(92), 1.15), paille = dome(K(135), K(122), 1.35);
    const terre = dome(K(162), K(146), 1.4), neige = dome(K(188), K(178), 1.8);
    const yneige = x => yg - Math.max(K(20), neige(x - cx));
    // la cheminée dépasse à peine la terre ; la planche posée à l'automne sur la terre, la neige passe par-dessus
    const cl = K(7), cb = yg - K(81), ct = yg - K(150);
    const Lx = cx + K(46);
    const pl1 = planche([Lx, yg - terre(Lx - cx)], [cx + K(9), ct - K(7)], K(18), K(5));
    return { s, K, cx, yg, X0, X1, a0, ydep, ylit, ytige, bo, cone, paille, terre, yneige, cl, cb, ct, pl1 };
  };

  const dessinCoupe = z => {
    const g = gC(z), { K, cx, yg, X0, X1, a0 } = g;
    // rigole plus creuse que le fond de la dépression : l'eau descend vers elle, pas sous les racines
    const rg = [cx - K(180), cx + K(180)], rl = K(9), rp = K(22);
    const fosse = xs(cx - a0, cx + a0, 48).map(x => [x, g.ydep(x)]);
    const sol = [[X0, yg], [rg[0] - rl, yg], [rg[0], yg + rp], [rg[0] + rl, yg], ...fosse,
      [rg[1] - rl, yg], [rg[1], yg + rp], [rg[1] + rl, yg], [X1, yg]];
    const neigeHaut = xs(X0, X1, 160).map(x => [x, g.yneige(x)]);
    const couche = (dm, a) => xs(cx - a, cx + a, 72).map(x => [x, yg - dm(x - cx)]);
    const lit = xs(cx + a0, cx - a0, 48).map(x => [x, g.ylit(x)]);
    const coneP = [...xs(cx - K(100), cx + K(100), 64).map(x => [x, yg - g.cone(x - cx)]),
      ...xs(cx + K(100), cx - K(100), 40).map(x => [x, g.ylit(x)])];
    const out = [];
    const poly = (pts, motif) => { out.push(h.path(pl(pts, true), h.a.blanc)); out.push(h.path(pl(pts, true), h.a.hachure(motif, 'aucun'))); };
    poly([...neigeHaut, [X1, yg + K(26)], [X0, yg + K(26)]], 'neige');
    poly([...sol, [X1, z.h - 2], [X0, z.h - 2]], 'terre');
    poly(couche(g.terre, K(162)), 'terre');
    out.push(h.path(pl([...couche(g.paille, K(135)), ...lit], true), h.a.blanc));
    const m = K(1.6);
    out.push(brins((x, y) => {
      const dx = x - cx, ad = Math.abs(dx);
      if (y < yg - g.paille(dx) + m || ad < g.cl + m) return false;
      if (ad < K(100)) return y < yg - g.cone(dx) - m;
      return y < (ad < a0 ? g.ylit(x) : yg) - m;
    }, [cx - K(135), yg - K(122), cx + K(135), yg + K(8)], K(6), K(7), 3));
    // le lit de branches d'épinette dans la dépression
    out.push(h.path(pl([...fosse, ...lit], true), h.a.blanc));
    for (const [a, b] of [[-114, -42], [-38, 38], [42, 114]]) {
      const pts = xs(cx + K(a), cx + K(b), Math.round((b - a) / 4.5)).map(x => [x, g.ytige(x)]);
      out.push(rameau(pts, x => Math.min(K(3.4), K(4.5) * g.bo(x) + K(0.8))));
    }
    // le cône de racines : carottes à gauche, rutabagas à droite
    out.push(h.path(pl(coneP, true), h.a.blanc));
    const r = alea(11), e = K(3.3), Lc = K(17), rr = K(4.6);
    for (let y = yg - K(2); yg - y <= K(78); y -= K(11.5)) {
      const ht = yg - y, w = K(100) * Math.pow(Math.max(0, 1 - ht / K(92)), 1 / 1.15) - K(7);
      for (let x = cx - w + e; x + Lc <= cx - K(2); x += Lc + K(4.5)) out.push(carotte(x, y + (r() - 0.5) * K(2), Lc, e, (r() - 0.5) * 0.35));
      for (let x = cx + K(2) + rr; x + rr <= cx + w; x += 2 * rr + K(3.2)) out.push(rave(x, y, rr));
    }
    out.push(h.path(pl(coneP, true), h.a.arete));
    out.push(h.path(pl(sol), h.a.arete));
    out.push(h.path(pl(couche(g.paille, K(135))), h.a.arete));
    out.push(h.path(pl(couche(g.terre, K(162))), h.a.contour));
    out.push(h.path(pl(neigeHaut), h.a.arete));
    // le bouchon de paille, des racines jusqu'au-dessus de la neige
    out.push(h.rect(cx - g.cl, g.ct, 2 * g.cl, g.cb - g.ct, h.a.blanc));
    out.push(brins((x, y) => Math.abs(x - cx) < g.cl - K(1.5) && y > g.ct + K(2) && y < g.cb - K(1.5),
      [cx - g.cl, g.ct, cx + g.cl, g.cb], K(5), K(10), 5, debout));
    out.push(traits([[cx - g.cl, g.cb, cx - g.cl, g.ct], [cx + g.cl, g.cb, cx + g.cl, g.ct],
      ...[-3, -2, -1, 0, 1, 2, 3].map(i => [cx + i * K(2.2), g.ct + K(1), cx + i * K(3.1), g.ct - K(7)])]));
    out.push(h.path(pl(g.pl1.pts, true), rempli('arete')));
    // le point qui décide : le bouchon de paille traverse la terre et respire
    out.push(h.controle(cx, g.ct + K(8), K(15)));
    return out.join('\n');
  };

  const renvoisCoupe = z => {
    const g = gC(z), { K, cx, yg } = g;
    return [
      { n: 1, rond: [cx - K(75), yg + K(38)], cible: [cx - K(75), g.ytige(cx - K(75))], texte: 'fond d’épinette ou de paille' },
      { n: 2, rond: [cx - K(235), yg - K(62)], cible: [cx - K(55), yg - K(25)], texte: 'racines en cône, triées' },
      { n: 3, rond: [cx - K(215), yg - K(138)], cible: [cx - K(60), yg - K(62)], texte: 'paille ou foin, épais' },
      { n: 4, rond: [cx + K(225), yg - K(110)], cible: [cx + K(110), yg - K(45)], texte: 'terre du déblai' },
      { n: 5, rond: [cx + K(250), yg + K(40)], cible: [cx + K(180), yg + K(16)], texte: 'rigole tout autour du pied' },
      { n: 6, rond: [cx + K(175), yg - K(180)], cible: [cx + K(75), g.yneige(cx + K(75)) + K(10)], texte: 'neige qui finit le travail' },
    ];
  };

  // ─── Le bouchon, de près ────────────────────────────────────────────────────
  const gD = z => {
    const s = Math.min(z.l / 231, z.h / 176), K = v => v * s;
    const cx = z.l * 0.42, yb = z.h - 2, X0 = 2, X1 = z.l - 2;
    const yA = z.h - K(24);
    const yR = dx => Math.min(yb, yA + 0.6 * (Math.hypot(dx, K(10)) - K(10)));
    // à l'automne, sous la pluie : pas encore de neige, la planche repose sur la terre
    const yS0 = yA - K(46), yE0 = yS0 - K(40);
    const yS = dx => Math.min(yb, yS0 + dx * dx / K(300));
    const yE = dx => Math.min(yb, yE0 + dx * dx / K(340));
    const cl = K(11), cb = yA + K(3), ct = yE0 - K(6);
    const Lx = cx + K(95);
    const pl1 = planche([Lx, yE(Lx - cx)], [cx + K(14), ct - K(9)], K(40), K(7));
    const airPts = [[cx - K(2), ct + K(26)], [cx - K(2), ct - K(2)], [cx - K(10), ct - K(12)], [cx - K(36), ct - K(18)], [cx - K(46), ct - K(44)]];
    return { s, K, cx, yb, X0, X1, yA, yR, yS, yE, cl, cb, ct, pl1, airPts };
  };

  const dessinDetail = z => {
    const g = gD(z), { K, cx, yb, X0, X1 } = g;
    const bande = fn => xs(X0, X1, 90).map(x => [x, fn(x - cx)]);
    const out = [];
    const poly = (pts, motif) => { out.push(h.path(pl(pts, true), h.a.blanc)); if (motif) out.push(h.path(pl(pts, true), h.a.hachure(motif, 'aucun'))); };
    const bas = [[X1, yb], [X0, yb]];
    poly([...bande(g.yE), ...bas], 'terre');
    poly([...bande(g.yS), ...bas], null);
    const m = K(1.6);
    out.push(brins((x, y) => x > X0 + m && x < X1 - m && y > g.yS(x - cx) + m && y < g.yR(x - cx) - m && y < yb - m && Math.abs(x - cx) > g.cl + m,
      [X0, g.yA - K(50), X1, yb], K(7), K(9), 9));
    poly([...bande(g.yR), ...bas], null);
    out.push(carotte(cx - K(12), g.yA + K(16), K(24), K(4.2), Math.PI - 0.1));
    out.push(rave(cx + K(9), g.yA + K(13), K(5.5)));
    out.push(rave(cx + K(27), g.yA + K(17), K(4.5)));
    const trait = fn => pl(bande(fn).filter(([, y]) => y < yb - 0.5));
    out.push(h.path(trait(g.yR), h.a.arete));
    out.push(h.path(trait(g.yS), h.a.arete));
    out.push(h.path(trait(g.yE), h.a.contour));
    out.push(h.rect(cx - g.cl, g.ct, 2 * g.cl, g.cb - g.ct, h.a.blanc));
    out.push(brins((x, y) => Math.abs(x - cx) < g.cl - K(1.8) && y > g.ct + K(2) && y < g.cb - K(2) && !(Math.abs(x - g.airPts[0][0]) < K(3.5) && y < g.airPts[0][1] + K(2)),
      [cx - g.cl, g.ct, cx + g.cl, g.cb], K(5.5), K(13), 7, debout));
    out.push(traits([[cx - g.cl, g.cb, cx - g.cl, g.ct], [cx + g.cl, g.cb, cx + g.cl, g.ct],
      ...[-3, -2, -1, 0, 1, 2, 3].map(i => [cx + i * K(3.3), g.ct + K(1), cx + i * K(4.6), g.ct - K(9)])]));
    out.push(h.path(pl(g.pl1.pts, true), h.a.blanc));
    out.push(h.path(pl(g.pl1.pts, true), h.a.hachure('bois', 'arete')));
    // la pluie tombe sur la planche et glisse vers le bas
    for (const dx of [-12, 14, 40]) {
      const [x, y] = g.pl1.dessus(cx + K(dx));
      out.push(h.fleche(pl([[x, y - K(26)], [x, y - K(4)]]), h.a.cache));
    }
    // l'air qui monte par la paille et sort sous la planche
    out.push(h.fleche(pl(g.airPts), air));
    return out.join('\n');
  };

  const renvoisDetail = z => {
    const g = gD(z), { K, cx } = g;
    const a = g.airPts[3], b = g.airPts[4];
    return [
      { n: 7, rond: [cx + K(112), g.ct - K(22)], cible: g.pl1.dessus(cx + K(56)), texte: 'planche ou écorce en pente' },
      { n: 8, rond: [cx - K(74), K(14)], cible: [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], texte: 'air qui sort sous la planche' },
    ];
  };

  // ─── En février ─────────────────────────────────────────────────────────────
  const gF = z => {
    const s = Math.min(z.l / 346, z.h / 180), K = v => v * s;
    const cx = K(128), yG = z.h - K(12), X0 = 2, X1 = z.l - 2;
    const silo = dome(K(78), K(62), 1.4), bosse = dome(K(108), K(84), 1.8);
    const yNs = x => yG - Math.max(K(40), bosse(x - cx));
    const xa = cx + K(50), xb = cx + K(114), px = cx + K(126);
    return { s, K, cx, yG, X0, X1, silo, yNs, xa, xb, px };
  };

  const dessinFevrier = z => {
    const g = gF(z), { K, cx, yG, X0, X1, xa, xb, px } = g;
    const out = [];
    const poly = (pts, motif) => { out.push(h.path(pl(pts, true), h.a.blanc)); out.push(h.path(pl(pts, true), h.a.hachure(motif, 'aucun'))); };
    const haut1 = xs(X0, xa, 70).map(x => [x, g.yNs(x)]);
    const haut2 = xs(xb, X1, 40).map(x => [x, g.yNs(x)]);
    poly([...haut1, [xa, yG], [xb, yG], ...haut2, [X1, yG], [X0, yG]], 'neige');
    poly([[X0, yG], [X1, yG], [X1, z.h - 1], [X0, z.h - 1]], 'terre');
    const mont = xs(cx - K(78), cx + K(78), 60).map(x => [x, yG - g.silo(x - cx)]);
    poly(mont, 'terre');
    out.push(h.path(pl(mont), h.a.contour));
    // la cavité ouverte au pied du silo, côté abrité
    const cav = [[cx + K(77), yG], [cx + K(52), yG], [cx + K(50), yG - K(9)], [cx + K(55), yG - K(16)],
      [cx + K(63), yG - g.silo(K(63))], ...xs(cx + K(63), cx + K(77), 8).map(x => [x, yG - g.silo(x - cx)])];
    out.push(h.path(pl(cav, true), h.a.plein));
    out.push(h.ligne(X0, yG, X1, yG, h.a.arete));
    out.push(h.path(pl(haut1), h.a.arete));
    out.push(h.path(pl(haut2), h.a.arete));
    out.push(h.ligne(xa, g.yNs(xa), xa, yG - g.silo(xa - cx), h.a.arete));
    out.push(h.ligne(xb, yG, xb, g.yNs(xb), h.a.arete));
    // la perche, plantée du côté de l'ouverture
    out.push(h.rect(px - K(2.2), K(10), K(4.4), yG + K(6) - K(10), rempli('arete')));
    // la pelle plantée dans la neige
    const sx = cx + K(172), sy = g.yNs(sx);
    out.push(h.path(pl([[sx - K(9), sy + K(4)], [sx - K(9), sy - K(14)], [sx - K(3), sy - K(18)], [sx + K(3), sy - K(18)], [sx + K(9), sy - K(14)], [sx + K(9), sy + K(4)]]), rempli('arete')));
    out.push(h.rect(sx - K(1.8), sy - K(96), K(3.6), K(78), rempli('arete')));
    out.push(h.path(pl([[sx - K(1.8), sy - K(96)], [sx - K(7), sy - K(100)], [sx - K(7), sy - K(108)], [sx + K(7), sy - K(108)], [sx + K(7), sy - K(100)], [sx + K(1.8), sy - K(96)]], true), rempli('arete')));
    // le vent
    for (const y of [70, 100]) out.push(h.fleche(pl([[X0 + K(10), yG - K(y)], [X0 + K(62), yG - K(y)]]), air));
    return out.join('\n');
  };

  const renvoisFevrier = z => {
    const g = gF(z), { K, cx, yG, px } = g;
    return [
      { n: 9, rond: [px - K(36), K(26)], cible: [px - K(2.2), K(34)], texte: 'perche, côté ouverture' },
      { n: 10, rond: [cx + K(84), yG - K(96)], cible: [cx + K(60), yG - K(8)], texte: 'ouvrir du côté abrité du vent' },
    ];
  };

  // ─── Vu de dessus ───────────────────────────────────────────────────────────
  const gP = z => {
    const s = Math.min(1, z.h / 112), K = v => v * s;
    const cy = z.h / 2, R = K(38), r1 = K(43), r2 = K(49);
    const cxs = [z.l * 0.2, z.l * 0.5, z.l * 0.8];
    const pt = (k, rr, a) => {
      const q = rr * (1 + 0.045 * Math.sin(3 * a + k * 1.9) + 0.03 * Math.sin(5 * a + k * 3.8));
      return [cxs[k] + Math.cos(a) * q, cy + Math.sin(a) * q];
    };
    return { s, K, cy, R, r1, r2, cxs, pt };
  };

  const dessinPlan = z => {
    const g = gP(z), { K, cy, R, r1, r2 } = g;
    const out = [];
    g.cxs.forEach((c, k) => {
      const rond = rr => xs(0, 2 * Math.PI, 72).slice(0, 72).map(a => g.pt(k, rr, a));
      out.push(h.path(pl(rond(r2), true), h.a.arete));
      out.push(h.path(pl(rond(r1), true), h.a.arete));
      out.push(h.path(pl(rond(R), true), h.a.blanc));
      out.push(h.path(pl(rond(R), true), h.a.hachure('terre', 'contour')));
      out.push(h.rect(c - K(10), cy - K(5), K(20), K(10), rempli('arete')));
      out.push(h.cercle(c + K(57), cy, K(3), h.a.plein));
    });
    return out.join('\n');
  };

  const renvoisPlan = z => {
    const g = gP(z), { K, cy, R, r2, cxs } = g;
    const a1 = -Math.PI / 5, a2 = Math.PI / 4;
    return [
      { n: 11, rond: [(cxs[0] + cxs[1]) / 2, K(14)], cible: g.pt(0, R, a1), texte: 'un silo par ouverture prévue' },
      { n: 12, rond: [(cxs[1] + cxs[2]) / 2, z.h - K(14)], cible: g.pt(1, r2, a2), texte: 'une rigole autour de chacun' },
    ];
  };

  return {
    ref: '79-06',
    titre: 'Le silo de terre',
    desc: 'Silo de terre en coupe avec ses couches, la neige par-dessus la planche ; le bouchon de paille et sa planche de près, sous la pluie d’automne ;le silo enneigé en février, ouvert du côté abrité ; plusieurs petits silos vus de dessus avec leur rigole.',
    format: 'pleine',
    disposition: [['coupe'], ['detail', 'fevrier'], ['plan']],
    hauteurs: [4.6, 3.3, 2.1],
    largeurs: [[1], [2, 3], [1]],
    vues: {
      coupe: { titre: 'En coupe', dessin: dessinCoupe, renvois: renvoisCoupe },
      detail: { titre: 'Le bouchon, de près', dessin: dessinDetail, renvois: renvoisDetail },
      fevrier: { titre: 'En février', dessin: dessinFevrier, renvois: renvoisFevrier },
      plan: { titre: 'Vu de dessus', dessin: dessinPlan, renvois: renvoisPlan },
    },
  };
};
