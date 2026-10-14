// Planche 37-03a — Le bain de vapeur sous bâche : l'abri (chapitre 37, section 9, étapes 1 à 7).
// Quatre vues à la même échelle : l'armature (vue plongeante), la coupe par la porte et
// l'ouverture haute, la paroi au pied (agrandie) et le plan coupé au ras du sol.
// Aucune cote : le chapitre ne donne aucune mesure de l'abri (« assez haut pour s'asseoir »).
// La charte : l'intérieur de l'abri, vu par la coupe, en gris loin (pas de gris sur la paroi
// hachurée, ni sur le plan). Le rouge : la poussée sur le rabat, de l'intérieur (le geste), et le
// rond de sol nu autour du bac, là où le sapinage prendrait feu (la zone).
module.exports = (h) => {
  const A = h.a, RAD = Math.PI / 180;
  const blanc = at => at.replace('fill="none"', 'fill="#ffffff"');
  const epais = w => A.arete.replace(/stroke-width="[^"]*"/, `stroke-width="${w}"`);
  const epaisBlanc = w => epais(w).replace(/stroke="[^"]*"/, 'stroke="#ffffff"');
  const f = p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`;
  // courbe qui passe par chaque point (Catmull-Rom)
  const lisse = (pts, ferme = false) => {
    const n = pts.length; let d = `M${f(pts[0])}`;
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = ferme ? pts[(i - 1 + n) % n] : pts[Math.max(0, i - 1)];
      const p1 = pts[i], p2 = pts[(i + 1) % n];
      const p3 = ferme ? pts[(i + 2) % n] : pts[Math.min(n - 1, i + 2)];
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C${f(c1)} ${f(c2)} ${f(p2)}`;
    }
    return d + (ferme ? ' Z' : '');
  };
  // un caillou : un rond irrégulier, toujours le même pour une graine donnée
  const caillou = (x, y, rx, ry, g = 1, rot = 0) => {
    const pts = [];
    for (let i = 0; i < 8; i++) {
      const t = (i / 8) * 2 * Math.PI + rot, k = 0.88 + 0.16 * Math.abs(Math.sin(g * 12.9898 + i * 78.233));
      pts.push([x + rx * k * Math.cos(t), y + ry * k * Math.sin(t)]);
    }
    return lisse(pts, true);
  };
  const pierre = (x, y, rx, ry, g, rot) => [h.path(caillou(x, y, rx, ry, g, rot), A.blanc),
    h.path(caillou(x, y, rx, ry, g, rot), A.hachure('pierre', 'arete'))].join('\n');

  const RY = 0.86;                         // hauteur du dôme sur son rayon
  const rayon = z => z.l * (z.l < 300 ? 0.4 : 0.36);
  const AZ = [22.5, 67.5, 112.5, 157.5];   // les quatre arches (azimut, 0 = est, 90 = nord)

  // Le sapinage vu de côté : des branches couchées en écailles, la pointe vers l'intérieur.
  const sapinCote = (x1, x2, y, sens = 1, pas = 9, ht = 5) => {
    const out = [];
    for (let x = x1; sens > 0 ? x < x2 - pas : x > x2 + pas; x += sens * pas) {
      const a = [x, y], b = [x + sens * (pas + 5), y - ht];
      out.push(h.path(`M${f(a)} Q${f([x + sens * pas * 0.7, y - ht * 0.2])} ${f(b)}`, A.detail));
      let d = '';
      for (let k = 1; k <= 3; k++) {
        const t = k / 4, px = x + sens * (pas + 5) * t, py = y - ht * t * t;
        d += `M${f([px, py])} L${f([px - sens * 2.5, py - 2.6])} `;
      }
      out.push(h.path(d, A.fin));
    }
    return out.join('\n');
  };

  // ── l'armature, vue plongeante ─────────────────────────────────────────────────────
  const armature = z => {
    const R = rayon(z), ry = R * RY, cx = z.l / 2, e = 24 * RAD, se = Math.sin(e), ce = Math.cos(e);
    const G0 = z.h - 26 - R * se;
    const P = (x, y, zz) => [cx + x, G0 - zz * ce - y * se];
    const arche = (phi, r1, r2) => Array.from({ length: 21 }, (_, i) => {
      const r = r1 + (r2 - r1) * i / 20;
      return P(r * Math.cos(phi * RAD), r * Math.sin(phi * RAD), ry * Math.sqrt(Math.max(0, 1 - (r / R) ** 2)));
    });
    const zm = ry * 0.5, Rm = R * Math.sqrt(0.75);
    const cerceau = (a1, a2) => Array.from({ length: 25 }, (_, i) => {
      const a = (a1 + (a2 - a1) * i / 24) * RAD;
      return P(Rm * Math.cos(a), Rm * Math.sin(a), zm);
    });
    const tube = pts => h.path(lisse(pts), epais(4.4)) + '\n' + h.path(lisse(pts), epaisBlanc(1.9));
    const out = [];
    out.push(h.ellipse(cx, G0, R, R * se, A.fin));
    // les bouts plantés : ce qui est sous la neige, en caché
    for (const phi of AZ) for (const s of [1, -1]) {
      const p = P(s * R * Math.cos(phi * RAD), s * R * Math.sin(phi * RAD), 0);
      out.push(h.ligne(p[0], p[1], p[0], p[1] + 11, A.cache));
    }
    out.push(tube(cerceau(0, 180)));
    for (const phi of AZ) out.push(tube(arche(phi, R, 0)));
    for (const phi of AZ) out.push(tube(arche(phi, 0, -R)));
    out.push(tube(cerceau(180, 360)));
    // les ligatures : au sommet, et à chaque croisement du cerceau
    const S = P(0, 0, ry);
    out.push(h.path([-2, -1, 0, 1, 2].map(k => `M${f([S[0] - 5 + k * 1.6, S[1] - 4])} L${f([S[0] + 5 + k * 1.6, S[1] + 4])}`).join(' '), A.detail));
    for (const phi of AZ) for (const s of [1, -1]) {
      const c = P(s * Rm * Math.cos(phi * RAD), s * Rm * Math.sin(phi * RAD), zm);
      out.push(h.path(`M${f([c[0] - 3.5, c[1] - 3.5])} L${f([c[0] + 3.5, c[1] + 3.5])} M${f([c[0] - 3.5, c[1] + 3.5])} L${f([c[0] + 3.5, c[1] - 3.5])}`, A.detail));
    }
    return out.join('\n');
  };
  const armatureRenvois = z => {
    const R = rayon(z), ry = R * RY, cx = z.l / 2, e = 24 * RAD, se = Math.sin(e), ce = Math.cos(e);
    const G0 = z.h - 26 - R * se;
    const P = (x, y, zz) => [cx + x, G0 - zz * ce - y * se];
    const rp = -0.72 * R, phi = 67.5 * RAD;
    const surArche = P(rp * Math.cos(phi), rp * Math.sin(phi), ry * Math.sqrt(1 - 0.72 ** 2));
    const zm = ry * 0.5, Rm = R * Math.sqrt(0.75), pc = 202.5 * RAD;
    const croise = P(Rm * Math.cos(pc), Rm * Math.sin(pc), zm);
    const pied = P(-R * Math.cos(22.5 * RAD), -R * Math.sin(22.5 * RAD), 0);
    return [
      { n: 1, rond: [surArche[0] - 34, surArche[1] - 30], cible: surArche, texte: 'perches vertes pliées' },
      { n: 2, rond: [cx + 44, G0 - ry * ce - 14], cible: P(0, 0, ry), texte: 'attachées au sommet' },
      { n: 3, rond: [croise[0] + 30, croise[1] + 26], cible: croise, texte: 'cerceau lié aux croisements' },
      { n: 4, rond: [pied[0] - 16, pied[1] + 26], cible: [pied[0], pied[1] + 4], texte: 'plantées dans la neige tapée' },
    ];
  };

  // ── la coupe par la porte (ouest, à gauche) et l'ouverture haute (est, à droite) ─────
  const geoCoupe = z => {
    const R = rayon(z), ry = R * RY, cx = z.l / 2, G = z.h - 34, EP = 8;
    const E = (d, t) => [cx + (R + d) * Math.cos(t * RAD), G - (ry + d) * Math.sin(t * RAD)];
    const tP = 180 - Math.asin(0.46) / RAD;          // haut de la porte
    const T = E(EP, tP), C = [T[0] - 3, G - 9];      // la perche qui leste le rabat
    const wb = 0.36 * R, hb = 0.2 * R, Gb = G - 8.5;   // le bac, posé sur les pierres plates
    const xB = 0.47 * R, rB = 0.075 * R;             // les billes
    return { R, ry, cx, G, EP, E, tP, T, C, wb, hb, Gb, xB, rB, v1: 46, v2: 55 };
  };
  const coupe = z => {
    const { R, ry, cx, G, EP, E, tP, T, C, wb, hb, Gb, xB, rB, v1, v2 } = geoCoupe(z);
    const arc = (d, t1, t2, n = 40) => Array.from({ length: n + 1 }, (_, i) => E(d, t1 + (t2 - t1) * i / n));
    const out = [];
    // le sol
    out.push(h.rect(0, G, z.l, 14, A.hachure('terre', 'aucun')));
    // l'intérieur de l'abri, vu par la coupe : gris loin, jusqu'au rabat de la porte
    out.push(h.chemin([...arc(0, 0, tP), [E(0, tP)[0], G]], A.loin, true));
    // au fond, derrière le plan de coupe : les demi-arches et le cerceau, vus de l'intérieur
    for (const phi of AZ) {
      const pts = Array.from({ length: 25 }, (_, i) => {
        const r = R * i / 24;
        return [cx + r * Math.cos(phi * RAD), G - ry * Math.sqrt(Math.max(0, 1 - (r / R) ** 2))];
      });
      out.push(h.path(lisse(pts), A.fin));
    }
    const zm = 0.5 * ry, Rm = R * Math.sqrt(0.75);
    out.push(h.ligne(cx - Rm, G - zm, cx + Rm, G - zm, A.fin));
    // la paroi : bâche, couvertures de laine, deuxième bâche
    const paroi = (t1, t2) => {
      const inn = arc(0, t1, t2), ext = arc(EP, t1, t2), poly = [...inn, ...ext.slice().reverse()];
      return [h.chemin(poly, A.blanc, true), h.chemin(poly, A.hachure('isolant', 'aucun'), true),
        h.chemin(inn, A.arete), h.chemin(ext, A.arete),
        h.ligne(...E(0, t1), ...E(EP, t1), A.arete), h.ligne(...E(0, t2), ...E(EP, t2), A.arete)].join('\n');
    };
    out.push(paroi(0, v1), paroi(v2, tP));
    // le bout de bâche qui bouche l'ouverture, rabattu
    const v = E(EP, v2), vb = E(EP + 15, v2 - 8);
    out.push(h.path(`M${f(v)} Q${f(E(EP + 10, v2 + 2))} ${f(vb)}`, A.arete));
    // le cerceau, coupé : il passe entre les arches et la bâche, juste au-dessus de la porte
    for (const t of [30, 150]) { const c = E(-3.6, t); out.push(h.cercle(c[0], c[1], 3.4, blanc(A.detail)), h.cercle(c[0], c[1], 3.4, A.hachure('bois', 'detail'))); }
    // la neige pelletée contre le bas, à l'est (à l'ouest, c'est la porte)
    const nb = [...arc(EP, 0, 21, 10), [cx + R + EP + 16, G - 0.22 * ry], [cx + R + EP + 36, G]];
    out.push(h.path(lisse(nb) + ' Z', A.hachure('neige', 'aucun')), h.path(lisse(nb.slice(10)), A.arete));
    // le rabat : bâche ou couverture pendue du haut de la porte, lestée d'une perche
    const fl = [T, [T[0] - 2, T[1] + (C[1] - T[1]) * 0.5], [C[0] - 3.2, C[1] - 1]];
    out.push(h.path(lisse(fl), A.arete), h.path(lisse(fl.map(p => [p[0] + 2.4, p[1]])), A.detail));
    out.push(h.cercle(C[0], C[1], 4.4, A.blanc), h.cercle(C[0], C[1], 4.4, A.hachure('bois', 'arete')));
    // il se pousse de l'intérieur
    out.push(h.geste(`M${f([C[0] + 16, G - 30])} Q${f([C[0] + 2, G - 38])} ${f([C[0] - 14, G - 30])}`));
    // le sapinage, de la bille à la paroi, et le rond de sol nu au milieu
    out.push(sapinCote(cx + xB + rB + 3, cx + R - 2, G, 1));
    out.push(sapinCote(cx - xB - rB - 3, C[0] + 6, G, -1));
    // les pierres plates, le bac de fonte, ses pierres
    out.push(h.path(`M${f([cx - 0.3 * R, G])} L${f([cx - 0.29 * R, G - 7])} L${f([cx - 0.09 * R, G - 9])} L${f([cx - 0.07 * R, G])} Z`, A.hachure('pierre', 'arete')));
    out.push(h.path(`M${f([cx - 0.08 * R, G])} L${f([cx - 0.07 * R, G - 8.5])} L${f([cx + 0.11 * R, G - 8.5])} L${f([cx + 0.12 * R, G])} Z`, A.hachure('pierre', 'arete')));
    out.push(h.path(`M${f([cx + 0.11 * R, G])} L${f([cx + 0.12 * R, G - 9])} L${f([cx + 0.29 * R, G - 7])} L${f([cx + 0.31 * R, G])} Z`, A.hachure('pierre', 'arete')));
    const xl = cx - wb / 2, xr = cx + wb / 2, top = Gb - hb, ep = 3.2;
    const potExt = `M${f([xl - 2, top])} L${f([xl, Gb - 8])} Q${f([xl + 1, Gb])} ${f([xl + 9, Gb])} L${f([xr - 9, Gb])} Q${f([xr - 1, Gb])} ${f([xr, Gb - 8])} L${f([xr + 2, top])}`;
    const potInt = `L${f([xr + 2 - ep, top])} L${f([xr - ep, Gb - 8])} Q${f([xr - ep - 1, Gb - ep])} ${f([xr - 9, Gb - ep])} L${f([xl + 9, Gb - ep])} Q${f([xl + ep + 1, Gb - ep])} ${f([xl + ep, Gb - 8])} L${f([xl - 2 + ep, top])} Z`;
    out.push(h.path(`M${f([xl, top])} L${f([xr, top])} L${f([xr, Gb])} L${f([xl, Gb])} Z`, A.blanc));
    const cail = [[-0.3, 0.3, 0.17, 1], [0.02, 0.28, 0.17, 2], [0.31, 0.31, 0.16, 3], [-0.16, 0.66, 0.16, 4], [0.17, 0.64, 0.16, 5], [0.0, 0.98, 0.14, 6]];
    for (const [fx, fy, fr, g] of cail) out.push(pierre(cx + fx * wb, Gb - ep - fy * hb * 1.05, fr * wb, fr * wb * 0.82, g, g * 0.7));
    out.push(h.path(potExt + ' ' + potInt, A.plein));
    // les billes, coupées
    for (const s of [-1, 1]) {
      const bx = cx + s * xB;
      out.push(h.cercle(bx, G - rB, rB, A.blanc), h.cercle(bx, G - rB, rB, A.hachure('bois', 'arete')), h.cercle(bx, G - rB, rB * 0.28, A.fin));
    }
    // la vapeur qui monte du bac
    for (const dx of [-0.12, 0.02, 0.16]) {
      const x = cx + dx * R, y = top - 0.14 * hb - 6;
      out.push(h.fleche(`M${f([x, y])} c 4,-6 -4,-11 0,-17 c 4,-6 -4,-11 0,-17`, A.detail));
    }
    // l'air : il entre sous le rabat, passe sur le bac et sort par l'ouverture haute
    const air = [[C[0] - 30, G - 3], [C[0], G - 2.5], [cx - 0.66 * R, G - 9], [cx - 0.42 * R, G - 0.36 * ry], [cx + 0.02 * R, G - 0.74 * ry], [cx + 0.38 * R, G - 0.9 * ry], E(EP / 2, (v1 + v2) / 2), E(EP + 22, (v1 + v2) / 2 + 2)];
    out.push(h.fleche(lisse(air), A.cache));
    // le sol
    out.push(h.ligne(0, G, z.l, G, A.arete));
    // le pied de la paroi, repris agrandi dans la vue d'à côté
    out.push(h.cercle(cx + R + EP + 6, G - 12, 24, A.fin));
    return out.join('\n');
  };
  const coupeRenvois = z => {
    const { R, ry, cx, G, EP, E, T, C, wb, hb, Gb, xB, rB, v1, v2 } = geoCoupe(z);
    return [
      { n: 5, rond: [14, G - 0.66 * ry], cible: [T[0] - 1, G - 0.3 * ry], texte: 'rabat lesté, jamais attaché' },
      { n: 6, rond: [z.l - 18, G - ry - 12], cible: E(EP / 2, (v1 + v2) / 2 - 2), texte: 'petite ouverture haute' },
      { n: 7, rond: [cx + 0.34 * R, G - 0.5 * ry], cible: [cx + wb / 2 + 0.5, Gb - hb * 0.45], texte: 'bac de fonte, non galvanisé' },
      { n: 8, rond: [cx + 0.22 * R, G + 21], cible: [cx + 0.2 * R, G - 3], texte: 'lit de pierres plates' },
      { n: 9, rond: [cx + xB + 10, G - 0.34 * ry], cible: [cx + xB + rB * 0.4, G - rB * 1.4], texte: 'deux billes vertes couchées' },
    ];
  };

  // ── la paroi au pied, agrandie ─────────────────────────────────────────────────────
  const geoParoi = z => {
    // la paroi monte jusqu'à 36 degrés : le pied du dôme, presque droit, grossi
    const Gd = z.h - 42, tMax = 30, ryd = (Gd - 34) / Math.sin(tMax * RAD), Rd = ryd / RY;
    const xw = 16 + Rd * (1 - Math.cos(tMax * RAD));
    const E = (d, t) => [xw - Rd + (Rd + d) * Math.cos(t * RAD), Gd - (ryd + d) * Math.sin(t * RAD)];
    return { Rd, ryd, Gd, xw, E, tMax, L: { perche: [0, 10], b1: [10, 13.5], laine: [13.5, 28], b2: [28, 31.5], sapin: [31.5, 47] } };
  };
  const paroi = z => {
    const { Gd, xw, E, tMax, L, ryd } = geoParoi(z);
    const arc = (d, t1, t2, n = 40) => Array.from({ length: n + 1 }, (_, i) => E(d, t1 + (t2 - t1) * i / n));
    const bande = ([d1, d2], t1, t2) => [...arc(d1, t1, t2), ...arc(d2, t2, t1)];
    const out = [];
    out.push(h.rect(0, Gd, z.l, 30, A.hachure('terre', 'aucun')));
    // la perche, plantée : elle entre dans la terre et finit en pointe
    const pa = arc(L.perche[0], 0, tMax), pb = arc(L.perche[1], 0, tMax);
    const perche = [[E(0, 0)[0], Gd + 22], ...pa, ...pb.slice().reverse(), [E(10, 0)[0], Gd + 16], [E(5, 0)[0], Gd + 28]];
    out.push(h.chemin(perche, A.blanc, true), h.chemin(perche, A.hachure('bois', 'arete'), true));
    // la laine
    const tl = 0.6;
    out.push(h.chemin(bande(L.laine, tl, tMax), A.blanc, true), h.chemin(bande(L.laine, tl, tMax), A.hachure('isolant', 'arete'), true));
    // les deux bâches : minces, en noir ; au pied elles se couchent sur le sol, sous la neige
    const jupe = xw + 76;
    const b1 = [...arc(L.b1[0], 0, tMax), ...arc(L.b1[1], tMax, 0)];
    out.push(h.chemin(b1, A.plein, true));
    const b2 = [...arc(L.b2[0], 0, tMax), ...arc(L.b2[1], tMax, 0)];
    out.push(h.chemin(b2, A.plein, true));
    const jupes = [h.rect(E(L.b1[0], 0)[0], Gd - 3.2, jupe - E(L.b1[0], 0)[0], 3.2, A.plein),
      h.rect(E(L.b2[0], 0)[0], Gd - 7.6, jupe - 8 - E(L.b2[0], 0)[0], 3.2, A.plein)];
    // les branches de sapin couchées sur la deuxième bâche, au-dessus de la neige
    const t0 = Math.asin(80 / (ryd + 40)) / RAD;
    for (let t = t0; t < tMax - 2; t += 3.1) {
      const a = E(L.sapin[0] + 1, t), b = E(L.sapin[1] - 2, t + 4.2);
      out.push(h.path(`M${f(a)} Q${f(E(L.sapin[0] + 9, t + 1.2))} ${f(b)}`, A.detail));
      let d = '';
      for (let k = 1; k <= 4; k++) {
        const u = k / 5, p = [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u];
        d += `M${f(p)} L${f([p[0] + 3.2, p[1] + 2.6])} M${f(p)} L${f([p[0] + 4, p[1] - 1.2])} `;
      }
      out.push(h.path(d, A.fin));
    }
    // la neige pelletée contre le bas et tapée
    const xm = E(L.b2[1], 0)[0], hN = 92, tN = Math.asin(hN / (ryd + L.b2[1])) / RAD;
    const nb = [...arc(L.b2[1], 0, tN, 10), [xm + 30, Gd - 64], [xm + 60, Gd - 24], [xm + 80, Gd]];
    out.push(h.path(lisse(nb) + ' Z', A.blanc), h.path(lisse(nb) + ' Z', A.hachure('neige', 'aucun')), h.path(lisse(nb.slice(10)), A.arete), ...jupes);
    // la coupure en haut de la paroi
    out.push(h.ligne(...E(-3, tMax), ...E(L.sapin[1] + 3, tMax), A.fin));
    // dedans : le sapinage sur le sol
    out.push(sapinCote(E(0, 0)[0] - 3, 4, Gd, -1, 13, 7));
    out.push(h.ligne(0, Gd, E(0, 0)[0], Gd, A.arete), h.ligne(E(L.b1[0], 0)[0], Gd, z.l, Gd, A.arete));
    return out.join('\n');
  };
  const paroiRenvois = z => {
    const { Gd, E, tMax, L } = geoParoi(z);
    const { ryd } = geoParoi(z), m = k => (L[k][0] + L[k][1]) / 2;
    const surCouche = (k, ht) => E(m(k), Math.asin(ht / (ryd + m(k))) / RAD);
    const rx = z.l - 14, xm = E(L.b2[1], 0)[0];
    return [
      { n: 11, rond: [rx, Gd - 300], cible: surCouche('b1', 282), texte: 'bâche, sur les perches' },
      { n: 12, rond: [rx, Gd - 268], cible: surCouche('laine', 250), texte: 'couvertures de laine' },
      { n: 13, rond: [rx, Gd - 236], cible: surCouche('b2', 218), texte: 'deuxième bâche' },
      { n: 14, rond: [rx, Gd - 204], cible: surCouche('sapin', 170), texte: 'branches de sapin' },
      { n: 15, rond: [rx, Gd - 92], cible: [xm + 32, Gd - 34], texte: 'neige pelletée, tapée' },
    ];
  };

  // ── le plan, coupé au ras du sol ───────────────────────────────────────────────────
  const plan = z => {
    const R = rayon(z), cx = z.l / 2, cy = z.h / 2 + 4, EP = 8;
    const Q = (r, a) => [cx + r * Math.cos(a * RAD), cy - r * Math.sin(a * RAD)];
    const anneau = (r1, r2, a1, a2, n = 60) => [...Array.from({ length: n + 1 }, (_, i) => Q(r1, a1 + (a2 - a1) * i / n)), ...Array.from({ length: n + 1 }, (_, i) => Q(r2, a2 + (a1 - a2) * i / n))];
    const d1 = 162, d2 = 198;                                  // la porte, à l'ouest
    const out = [];
    // la neige pelletée contre le bas, sauf devant la porte
    const neige = anneau(R + EP, R + EP + 34, d2 + 8, d1 + 360 - 8, 90);
    out.push(h.chemin(neige, A.hachure('neige', 'aucun'), true));
    out.push(h.path(lisse(Array.from({ length: 61 }, (_, i) => Q(R + EP + 34, d2 + 8 + (d1 + 352 - d2 - 8) * i / 60))), A.detail));
    // le sapinage en écailles : des rangées de branches, entre le rond de sol nu et la paroi
    const xB = 0.47 * R, rB = 0.075 * R, rNu = 0.34 * R;
    out.push(h.cercle(cx, cy, rNu, A.zone));           // la zone : le sapinage n'y entre pas
    for (let row = 0, y = cy - R + 8; y < cy + R - 4; y += 9, row++) {
      for (let x = cx - R + (row % 2 ? 6 : 0); x < cx + R; x += 15) {
        const dx = x - cx, dy = y - cy, r = Math.hypot(dx, dy);
        if (r < rNu + 7 || r > R - 9) continue;
        if (Math.abs(Math.abs(dx) - xB) < rB + 8 && Math.abs(dy) < 0.62 * R + 4) continue;
        out.push(h.path(`M${f([x - 7, y + 2])} Q${f([x, y + 1])} ${f([x + 7, y - 2])}`, A.detail));
        let d = '';
        for (let k = 1; k <= 3; k++) { const px = x - 7 + 3.5 * k, py = y + 2 - k; d += `M${f([px, py])} L${f([px - 2.4, py - 2.6])} M${f([px, py])} L${f([px - 2.4, py + 2.2])} `; }
        out.push(h.path(d, A.fin));
      }
    }
    // la paroi coupée, avec les pieds des perches
    const par = anneau(R, R + EP, d2, d1 + 360);
    out.push(h.chemin(par, A.blanc, true), h.chemin(par, A.hachure('isolant', 'arete'), true));
    for (const phi of AZ) for (const a of [phi, phi + 180]) { const c = Q(R - 3.6, a); out.push(h.cercle(c[0], c[1], 3.4, A.blanc), h.cercle(c[0], c[1], 3.4, A.hachure('bois', 'arete'))); }
    // le rabat et sa perche, devant la porte
    const p1 = Q(R + EP, d1), p2 = Q(R + EP, d2);
    out.push(h.path(`M${f(p1)} Q${f(Q(R + EP + 9, 180))} ${f(p2)}`, A.arete));
    const xl = cx - R - EP - 9;
    out.push(h.rect(xl - 3.6, p1[1] - 10, 7.2, p2[1] - p1[1] + 20, A.blanc), h.rect(xl - 3.6, p1[1] - 10, 7.2, p2[1] - p1[1] + 20, A.hachure('bois', 'arete')));
    // les billes, vues de dessus
    for (const s of [-1, 1]) {
      const bx = cx + s * xB;
      out.push(h.rect(bx - rB, cy - 0.62 * R, 2 * rB, 1.24 * R, A.blanc), h.rect(bx - rB, cy - 0.62 * R, 2 * rB, 1.24 * R, A.arete));
      for (const k of [-0.45, 0.1, 0.5]) out.push(h.ligne(bx + k * rB, cy - 0.62 * R + 5, bx + k * rB, cy + 0.62 * R - 5, A.fin));
    }
    // les pierres plates, le bac et ses pierres
    const rb = 0.18 * R;
    out.push(h.path(caillou(cx - 0.12 * R, cy - 0.1 * R, 0.17 * R, 0.13 * R, 7, 0.4), A.hachure('pierre', 'arete')));
    out.push(h.path(caillou(cx + 0.13 * R, cy - 0.08 * R, 0.16 * R, 0.14 * R, 8, 1.1), A.hachure('pierre', 'arete')));
    out.push(h.path(caillou(cx + 0.01 * R, cy + 0.15 * R, 0.18 * R, 0.12 * R, 9, 0.2), A.hachure('pierre', 'arete')));
    out.push(h.cercle(cx, cy, rb + 1.5, A.blanc), h.cercle(cx, cy, rb + 1.5, A.contour), h.cercle(cx, cy, rb - 2, A.detail));
    for (const [dx, dy, r, g] of [[-0.3, -0.25, 0.3, 1], [0.3, -0.22, 0.3, 2], [0, 0.32, 0.32, 3], [0.02, -0.02, 0.26, 4]]) out.push(pierre(cx + dx * rb * 1.5, cy + dy * rb * 1.5, r * rb, r * rb * 0.85, g, g));
    // la trace de la coupe : est-ouest, par la porte et le bac ; on regarde vers le nord
    const xa = cx - R - EP - 36, xz = cx + R + EP + 36;
    out.push(h.ligne(xa, cy, xz, cy, A.fin.replace('stroke-linecap="round"', 'stroke-linecap="butt"') + ' stroke-dasharray="14 3 2 3"'));
    for (const x of [xa, xz]) out.push(h.ligne(x, cy, x + (x < cx ? 12 : -12), cy, A.contour), h.fleche(`M${f([x + (x < cx ? 4 : -4), cy])} L${f([x + (x < cx ? 4 : -4), cy - 13])}`, A.arete));
    return out.join('\n');
  };
  const Q10 = (R, cx, cy) => [cx - 0.34 * R * Math.cos(55 * RAD), cy + 0.34 * R * Math.sin(55 * RAD)];
  const planRenvois = z => {
    const R = rayon(z), cx = z.l / 2, cy = z.h / 2 + 4;
    return [{ n: 10, rond: [cx - R - 18, cy + R * 0.98], cible: Q10(R, cx, cy), texte: 'rond de sol nu' }, { n: 16, rond: [cx + R + 20, cy - R * 0.9], cible: [cx + 0.72 * R, cy - 0.42 * R], texte: 'sapinage en écailles' }];
  };

  return {
    ref: '37-03a',
    titre: 'Le bain de vapeur sous bâche : l’abri',
    desc: 'Quatre vues à la même échelle d’un abri à bain de vapeur. En haut à gauche, l’armature seule, vue d’un peu haut : quatre perches vertes pliées en arches, plantées dans la neige tapée, liées ensemble au sommet, et un cerceau de perche qui les croise à mi-hauteur, lié à chaque croisement. En haut à droite, la coupe par la porte (à gauche) et l’ouverture haute (à droite) : paroi de bâche, couvertures de laine et deuxième bâche ; neige contre le bas ; rabat lesté d’une perche qui se pousse vers dehors ; bac de fonte plein de pierres posé sur des pierres plates au centre, deux billes couchées de chaque côté, rond de sol nu, sapinage jusqu’à la paroi ; l’air entre sous le rabat, passe sur le bac et sort en haut. En bas à droite, le plan coupé au ras du sol, avec la trace de la coupe. En bas à gauche, la paroi au pied, agrandie : perche plantée, bâche, laine, deuxième bâche couchée sur le sol sous la neige tapée, branches de sapin.',
    format: 'pleine',
    disposition: [['armature', 'coupe'], ['paroi', 'plan']],
    hauteurs: [205, 385],
    largeurs: [[2, 3], [2, 3]],
    vues: {
      armature: { titre: 'L’armature, avant la bâche', dessin: armature, renvois: armatureRenvois },
      coupe: { titre: 'En coupe, par la porte et l’ouverture haute', dessin: coupe, renvois: coupeRenvois },
      paroi: { titre: 'La paroi au pied, agrandie', dessin: paroi, renvois: paroiRenvois },
      plan: { titre: 'En plan, coupé au ras du sol', dessin: plan, renvois: planRenvois },
    },
  };
};
