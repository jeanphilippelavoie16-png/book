// 90-02a — Le canot de peaux d'orignal, sur le lit (ch. 90, « Le canot de peaux d'orignal »,
// étapes 1 à 8). Suite en 90-02b (étraves, bordé, membrures).
// Cotes, du chapitre, en mm : le recouvrement des peaux (environ 15 cm → 150 mm) et la largeur
// (1 m → 1000 mm), posée sur le cadre soulevé, parce que c'est le cadre qui la fixe. Le reste
// (3,8 m, creux, bordé) est coté en 90-02b.
// Les peaux sont cousues l'une au bout de l'autre : deux peaux côte à côte ne donneraient pas
// 3,8 m, et « c'est la taille des peaux qui décide de la longueur ».
// Passe qualité (lot 20) : pli et couture des pinces redessinés ; en travers, ligature
// cadre-piquet et laçage peau-plat-bord des deux côtés ; le laçage grossi dans une vue à lui,
// sous la coupe (un geste fin se lit en gros plan, pas dans un rond de 13 px) ; le trou du
// piquet nommé sur le plan et en coupe. Une vue n'a droit qu'à six renvois et un numéro ne
// sert qu'une fois : le plan prend le trou (6), la demi-coupe garde la pierre (7) et redit le
// trou en coupe (8) ; la suite est décalée d'un numéro.
//
// La charte : en travers, le creux de la coque, vu par la coupe, en gris loin ; au pli de la
// première pince, la face à l'ombre en aplat (elle était hachurée de traits). Pas de gris sur le
// plan, sur la demi-coupe hachurée ni sur le plat-bord grossi (la peau en cache le dessous). Le rouge : le
// bord de la peau qui roule (le signe à guetter, étape 6). Pas de geste fléché sur cette page.

module.exports = (h) => {
  const f = (v) => Math.round(v * 10) / 10;

  // Courbe lisse (Catmull-Rom → Bézier) par des points.
  function lisse(p, ferme = true) {
    const n = p.length, g = (i) => ferme ? p[(i + n) % n] : p[Math.max(0, Math.min(n - 1, i))];
    let d = `M ${f(p[0][0])} ${f(p[0][1])}`;
    const fin = ferme ? n : n - 1;
    for (let i = 0; i < fin; i++) {
      const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C ${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
    }
    return d + (ferme ? ' Z' : '');
  }
  // Pierre : polygone irrégulier lissé.
  function pierre(cx, cy, rx, ry, graine) {
    const pts = [];
    for (let i = 0; i < 7; i++) {
      const a = (i / 7) * Math.PI * 2 + graine;
      const k = 0.82 + 0.18 * Math.sin(graine * 3.1 + i * 2.3);
      pts.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]);
    }
    return [h.path(lisse(pts), h.a.hachure('pierre', 'aucun')), h.path(lisse(pts), h.a.arete)].join('\n');
  }
  // Bande de largeur variable le long d'une polyligne (pour les perches).
  function bande(pts, ep) {
    const g = [], d = [];
    pts.forEach((p, i) => {
      const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
      const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1;
      const nx = -dy / L, ny = dx / L, e = (typeof ep === 'function' ? ep(i / (pts.length - 1)) : ep) / 2;
      g.push([p[0] + nx * e, p[1] + ny * e]); d.push([p[0] - nx * e, p[1] - ny * e]);
    });
    return g.concat(d.reverse());
  }
  // Rectangle aux coins arrondis, en chemin (pour les ligatures).
  function arrondi(x1, y1, x2, y2, k) {
    return `M ${f(x1 + k)} ${f(y1)} H ${f(x2 - k)} Q ${f(x2)} ${f(y1)} ${f(x2)} ${f(y1 + k)} V ${f(y2 - k)} Q ${f(x2)} ${f(y2)} ${f(x2 - k)} ${f(y2)} ` +
      `H ${f(x1 + k)} Q ${f(x1)} ${f(y2)} ${f(x1)} ${f(y2 - k)} V ${f(y1 + k)} Q ${f(x1)} ${f(y1)} ${f(x1 + k)} ${f(y1)} Z`;
  }
  // Trait caché fin, à petits tirets : le brin de babiche qui passe derrière le plat-bord.
  const cacheFin = 'fill="none" stroke="#1A1A1A" stroke-width="0.5" stroke-linejoin="round" stroke-linecap="round" stroke-dasharray="2.2 1.8"';

  // ─── Géométrie du cadre, en mètres ─────────────────────────────────────────────────
  const DL = 1.9;                                       // demi-longueur, pointe à pointe
  const w = (x) => { const u = Math.min(1, Math.abs(x) / DL); return 0.5 * (1 - u * u) * (1 + 0.3 * u * u); };
  const ep = (x) => 0.058 - 0.028 * Math.min(1, Math.abs(x) / DL);   // plat-bord : gros bout au milieu

  // ─── Vue 1 : le plan sur le lit ────────────────────────────────────────────────────
  function geomPlan(z) {
    const s = Math.min((z.l - 36) / 4.74, (z.h - 34) / 2.16);
    const cx = z.l / 2, cy = z.h / 2 + 10;
    return { s, P: (x, y) => [cx + x * s, cy + y * s] };
  }
  function plan(z) {
    const { s, P } = geomPlan(z), o = [];
    const peauA = [[-0.2, -0.93], [-0.6, -0.96], [-1.0, -0.93], [-1.4, -0.97], [-1.8, -0.94], [-2.0, -1.0], [-2.14, -1.06],
      [-2.26, -1.0], [-2.22, -0.85], [-2.3, -0.6], [-2.35, -0.3], [-2.33, 0], [-2.36, 0.3], [-2.3, 0.6], [-2.22, 0.85],
      [-2.26, 1.0], [-2.14, 1.06], [-2.0, 1.0], [-1.8, 0.95], [-1.4, 0.97], [-1.0, 0.93], [-0.6, 0.96], [-0.2, 0.94]];
    const peauB = [[-0.35, -0.94], [0.1, -0.97], [0.6, -0.94], [1.1, -0.97], [1.6, -0.95], [1.95, -0.98], [2.1, -1.05],
      [2.23, -1.02], [2.2, -0.88], [2.3, -0.6], [2.34, -0.3], [2.31, 0], [2.35, 0.3], [2.3, 0.6], [2.2, 0.88],
      [2.23, 1.02], [2.1, 1.05], [1.95, 0.98], [1.6, 0.95], [1.1, 0.97], [0.6, 0.94], [0.1, 0.97], [-0.35, 0.95]];
    // Peau A : bord droit droit (taillé pour la couture), le reste lissé.
    const dA = lisse(peauA.map(p => P(...p)), false) + ` L ${P(-0.2, -0.93).map(f).join(' ')} Z`;
    const dB = lisse(peauB.map(p => P(...p)), false) + ` L ${P(-0.35, -0.94).map(f).join(' ')} Z`;
    o.push(h.path(dA, h.a.blanc), h.path(dA, h.a.contour));
    o.push(h.path(dB, h.a.blanc), h.path(dB, h.a.contour));
    // Bord de la peau du dessous, sous le recouvrement.
    o.push(h.ligne(...P(-0.2, -0.92), ...P(-0.2, 0.93), h.a.cache));
    // Deux rangs de points de babiche dans le recouvrement.
    [-0.305, -0.245].forEach(x => {
      for (let y = -0.9; y <= 0.9; y += 0.075) o.push(h.ligne(...P(x, y), ...P(x, y + 0.035), h.a.arete));
    });
    // Trous des piquets, sous la peau : au contour du cadre.
    trousPlan().forEach(t => o.push(h.cercle(...P(...t), 4, h.a.cache)));

    // Plats-bords : deux jeunes arbres par côté, gros bouts recouverts au milieu, bouts croisés.
    const xs = (a, b, n) => Array.from({ length: n + 1 }, (_, i) => a + (b - a) * i / n);
    const cote = (sy) => {
      const perche = (a, b) => {
        const pts = xs(a, b, 40).map(x => {
          if (Math.abs(x) <= DL) return [x, sy * (w(x) - ep(x) / 2)];
          const d = Math.abs(x) - DL;           // au-delà de la pointe : on croise
          return [x, sy * (w(DL) - ep(DL) / 2) - sy * 0.62 * d];
        });
        return bande(pts.map(p => P(...p)), (t) => {
          const x = a + (b - a) * t; return ep(Math.min(Math.abs(x), DL)) * s;
        });
      };
      return [perche(-DL - 0.1, 0.16), perche(-0.16, DL + 0.1)];
    };
    [-1, 1].forEach(sy => cote(sy).forEach(b => {
      o.push(h.chemin(b, h.a.hachure('bois', 'aucun'), true), h.chemin(b, h.a.arete, true));
    }));
    // Ligatures du joint des gros bouts (dans leurs rainures) et du croisement des bouts.
    [-1, 1].forEach(sy => [-0.1, 0.1].forEach(x => {
      const yc = sy * (w(x) - ep(x) / 2), e = ep(x) / 2 + 0.012;
      for (let k = -1; k <= 1; k++) o.push(h.ligne(...P(x + k * 0.014, yc - e), ...P(x + k * 0.014, yc + e), h.a.detail));
    }));
    [-1, 1].forEach(sx => {
      for (let k = -1; k <= 1; k++) o.push(h.ligne(...P(sx * (DL + 0.01) + k * 0.016, -0.045), ...P(sx * (DL + 0.01) + k * 0.016 + 0.01, 0.045), h.a.detail));
    });
    // Traverse du centre : bouts amincis enroulés autour des plats-bords.
    const yT = w(0) - ep(0);
    o.push(h.rect(...P(-0.03, -yT), 0.06 * s, 2 * yT * s, h.a.hachure('bois', 'aucun')));
    o.push(h.rect(...P(-0.03, -yT), 0.06 * s, 2 * yT * s, h.a.arete));
    [-1, 1].forEach(sy => o.push(h.rect(...P(-0.018, sy > 0 ? w(0) - ep(0) - 0.008 : -w(0) - 0.008), 0.036 * s, (ep(0) + 0.016) * s, h.a.detail)));
    // Cordes de babiche torse, à la place des traverses des bouts.
    [-1, 1].forEach(sx => {
      const x = sx * 1.15, y0 = -(w(x) - ep(x)), y1 = w(x) - ep(x);
      o.push(h.ligne(...P(x, y0), ...P(x, y1), h.a.detail));
      let dz = ''; let k = 0;
      for (let y = y0; y <= y1 + 1e-6; y += 0.022) { const [px, py] = P(x + (k++ % 2 ? 0.01 : -0.01), y); dz += (dz ? ' L ' : 'M ') + f(px) + ' ' + f(py); }
      o.push(h.path(dz, h.a.fin));
    });
    // Pierres posées sur les plats-bords.
    let g = 1;
    [-1, 1].forEach(sy => [-1.5, -0.95, -0.45, 0.45, 0.95, 1.5].forEach(x => {
      const [px, py] = P(x, sy * (w(x) - ep(x) / 2));
      o.push(pierre(px, py, 0.085 * s, 0.065 * s, g)); g += 0.9;
    }));
    // Cote : le recouvrement.
    const [xa, ya] = P(-0.35, -1.0), [xb] = P(-0.2, -1.0);
    o.push(h.cote(xa, ya - 6, xb, ya - 6, '150 mm'));
    return o.join('\n');
  }
  function trousPlan() {
    const trous = [];
    [0.25, 0.75, 1.2, 1.55].forEach(x => [-1, 1].forEach(sx => [-1, 1].forEach(sy => trous.push([sx * x, sy * (w(x) + 0.045)]))));
    trous.push([DL + 0.06, 0], [-DL - 0.06, 0]);
    return trous;
  }

  // ─── Vue 2 : demi-coupe sur le lit ──────────────────────────────────────────────────
  function geomLit(z) {
    const s = (z.l - 30) / 1.12, x0 = 16 + 0.1 * s, Y = z.h - 48;
    return { s, Y, X: (x) => x0 + x * s };
  }
  function lit(z) {
    const { s, Y, X } = geomLit(z), o = [];
    const rP = 0.03 * s, xP = 0.5 - 0.03;                 // plat-bord, son bord extérieur au contour
    const xT = 0.5 + 0.03, lT = 0.05 * s, pT = 34;        // trou du piquet, contre le contour
    // Sol : lit plat et lisse, coupé à gauche.
    const sol = `M ${f(X(-0.1))} ${Y} H ${f(X(1.08))} V ${Y + 40} H ${f(X(-0.1))} L ${f(X(-0.1) + 4)} ${Y + 28} L ${f(X(-0.1) - 3)} ${Y + 16} Z`;
    o.push(h.path(sol, h.a.hachure('terre', 'aucun')));
    const trou = `M ${f(X(xT) - lT / 2)} ${Y} V ${Y + pT} H ${f(X(xT) + lT / 2)} V ${Y}`;
    o.push(h.rect(X(xT) - lT / 2, Y, lT, pT, h.a.blanc));
    o.push(h.path(trou, h.a.arete));
    o.push(h.ligne(X(-0.1), Y, X(xT) - lT / 2, Y, h.a.arete), h.ligne(X(xT) + lT / 2, Y, X(1.08), Y, h.a.arete));
    // Peau à plat, les bords qui roulent.
    const yP = Y - 1.5;
    const peau = `M ${f(X(-0.1))} ${yP} H ${f(X(0.84))} C ${f(X(0.93))} ${yP} ${f(X(0.975))} ${f(yP - 6)} ${f(X(0.975))} ${f(yP - 15)} ` +
      `C ${f(X(0.975))} ${f(yP - 24)} ${f(X(0.92))} ${f(yP - 25)} ${f(X(0.915))} ${f(yP - 17)} C ${f(X(0.912))} ${f(yP - 12)} ${f(X(0.94))} ${f(yP - 11)} ${f(X(0.945))} ${f(yP - 15)}`;
    o.push(h.path(peau, h.a.contour));
    // le signe à guetter : le bord de la peau qui roule
    o.push(h.controle(X(0.947), yP - 14, 15));
    // Plat-bord en coupe, pierre dessus.
    o.push(h.cercle(X(xP), yP - 1.5 - rP, rP, h.a.hachure('bois', 'aucun')), h.cercle(X(xP), yP - 1.5 - rP, rP, h.a.arete));
    o.push(pierre(X(xP) - 4, yP - 1.5 - 2 * rP - 0.052 * s, 0.1 * s, 0.055 * s, 2.2));
    // La peau continue vers l'axe : coupure.
    o.push(h.path(`M ${f(X(-0.1) - 3)} ${f(yP - 6)} L ${f(X(-0.1) + 3)} ${f(yP - 2)} L ${f(X(-0.1) - 3)} ${f(yP + 2)} L ${f(X(-0.1) + 3)} ${f(yP + 6)}`, h.a.fin));
    return o.join('\n');
  }

  // ─── Vue 3 : coupe, flancs relevés ─────────────────────────────────────────────────
  // En mètres : plat-bord Ø 6 cm centré à 0,47 m de l'axe, son haut à 0,42 m ; peau au bord
  // extérieur du plat-bord ; piquet de 5 cm, un doigt plus loin, la ligature prend les trois.
  const RL = { H: 0.42, rP: 0.03, xP: 0.47, yP: 0.39, xi: 0.535, xo: 0.585, haut: 0.48, bas: -0.12 };
  function geomReleve(z) {
    const s = Math.min((z.l - 44) / (2 * RL.xo), (z.h - 46) / 0.51);
    const cx = 34 + RL.xo * s, Y = z.h - 30;
    const P = (x, y) => [cx + x * s, Y - y * s];
    // Un côté : le plat-bord, les tours de babiche, la ligature.
    const cote = (sx) => {
      const [gx, gy] = P(sx * RL.xP, RL.yP), r = RL.rP * s;
      const xPeau = P(sx * 0.503, 0)[0];
      const Rl = r + 3.2;
      const tours = [0, 1, 2].map(i => ({ x: gx + sx * (1 + 1.1 * i), y: gy - 1.2 * i }));
      // Chaque tour passe la peau par un trou, juste sous le plat-bord.
      const trous = tours.map(t => { const dx = Math.abs(xPeau - t.x); return [xPeau, t.y + Math.sqrt(Math.max(0, Rl * Rl - dx * dx))]; });
      const e = r + 7.5;
      const xIn = gx - sx * (r + 7), xOut = P(sx * RL.xo, 0)[0] + sx * 3;
      const lig = { x1: Math.min(xIn, xOut), x2: Math.max(xIn, xOut), y1: gy - e, y2: gy + e };
      return { gx, gy, r, Rl, tours, trous, lig, xIn };
    };
    return { s, Y, P, cote };
  }
  function releve(z) {
    const { s, Y, P, cote } = geomReleve(z), o = [];
    const { H } = RL;
    // Sol avec les deux piquets replantés.
    const [gx0] = P(-0.64, 0), [dx0] = P(0.64, 0);
    o.push(h.rect(gx0, Y, dx0 - gx0, 30, h.a.hachure('terre', 'aucun')));
    o.push(h.ligne(gx0, Y, dx0, Y, h.a.arete));
    // Peau : fond à plat sur le sol, bouchains, flancs montés jusqu'au haut du plat-bord.
    const demi = (sx) => [P(0, 0.002), P(sx * 0.36, 0.002), P(sx * 0.47, 0.03), P(sx * 0.497, 0.12), P(sx * 0.502, 0.3), P(sx * 0.503, H)];
    // le creux de la coque, vu par la coupe : gris loin, sous la peau et les plats-bords
    o.push(h.path(lisse([...demi(-1)].reverse().concat(demi(1).slice(1)), false) + ' Z', h.a.loin));
    [-1, 1].forEach(sx => o.push(h.path(lisse(demi(sx), false), h.a.contour)));
    [-1, 1].forEach(sx => {
      const c = cote(sx);
      // Les trous de la peau, puis les tours de babiche : ils passent la peau et font le tour du plat-bord.
      c.trous.forEach(t => o.push(h.cercle(t[0], t[1], 1.3, h.a.blanc)));
      c.tours.forEach(t => o.push(h.cercle(t.x, t.y, c.Rl, h.a.detail)));
      // Le plat-bord.
      o.push(h.cercle(c.gx, c.gy, c.r, h.a.blanc), h.cercle(c.gx, c.gy, c.r, h.a.hachure('bois', 'aucun')), h.cercle(c.gx, c.gy, c.r, h.a.arete));
      // Le piquet.
      const [x1, y1] = P(sx > 0 ? RL.xi : -RL.xo, RL.haut), l = (RL.xo - RL.xi) * s, ht = (RL.haut - RL.bas) * s;
      o.push(h.rect(x1, y1, l, ht, h.a.blanc), h.rect(x1, y1, l, ht, h.a.hachure('bois', 'aucun')), h.rect(x1, y1, l, ht, h.a.arete));
      // La ligature cadre-piquet : elle prend le plat-bord, la peau et le piquet ensemble.
      o.push(h.path(arrondi(c.lig.x1, c.lig.y1, c.lig.x2, c.lig.y2, 5), h.a.arete));
    });
    // Cote : la largeur au plat-bord, d'un flanc à l'autre.
    { const [xa, ya] = P(-0.505, H + 0.09), [xb] = P(0.505, 0); o.push(h.cote(xa, ya, xb, ya, '1000 mm')); }
    return o.join('\n');
  }

  // ─── Vue 4 : les pinces, vues de dehors ────────────────────────────────────────────
  function geomPinces(z) {
    const pas = z.l / 3, bw = Math.min(130, pas - 46), by = 12, bh = z.h - by - 16;
    const boite = (i) => {
      const bx = pas * i + 4, xm = bx + bw / 2, bas = by + bh, lv = Math.min(17, bw * 0.17);
      const haut = (x) => by + 2 * Math.sin((x - bx) / 11);
      // Pince cousue : un point tous les 8, en biais d'un bord à l'autre du joint.
      const points = [];
      for (let y = bas - 7; y > haut(xm) + 5; y -= 8) points.push(y);
      return { bx, xm, bas, lv, haut, points };
    };
    return { bw, bh, by, boite };
  }
  function pinces(z) {
    const { bw, bh, by, boite } = geomPinces(z), o = [];
    for (let i = 0; i < 3; i++) {
      const { bx, xm, bas, lv, haut, points } = boite(i);
      // Pan de peau relevé : bas au bouchain, côtés coupés, haut au plat-bord.
      const bordG = `M ${f(bx)} ${f(bas)} L ${f(bx + 3)} ${f(bas - bh * 0.35)} L ${f(bx - 2)} ${f(bas - bh * 0.7)} L ${f(bx + 2)} ${f(haut(bx))}`;
      const bordD = `M ${f(bx + bw)} ${f(bas)} L ${f(bx + bw - 3)} ${f(bas - bh * 0.35)} L ${f(bx + bw + 2)} ${f(bas - bh * 0.7)} L ${f(bx + bw - 2)} ${f(haut(bx + bw))}`;
      o.push(h.path(bordG, h.a.fin), h.path(bordD, h.a.fin));
      o.push(h.ligne(bx, bas, bx + bw, bas, h.a.arete));
      o.push(h.ligne(bx, bas + 7, bx + bw, bas + 7, h.a.fin));          // le fond, vu au loin
      const ouvert = i < 2 ? lv : 0;
      const topG = [], topD = [];
      for (let x = bx + 2; x <= xm - ouvert; x += 3) topG.push([x, haut(x)]);
      topG.push([xm - ouvert, haut(xm - ouvert)]);
      topD.push([xm + ouvert, haut(xm + ouvert)]);
      for (let x = xm + ouvert + 3; x <= bx + bw - 2; x += 3) topD.push([x, haut(x)]);
      if (i === 0) {
        // Le pli : la peau en trop sort du pan en arête. Deux bords qui se rejoignent en pointe
        // au bouchain, la pliure au milieu, la face à l'ombre hachurée parallèlement à la pliure.
        o.push(h.chemin(topG, h.a.contour), h.chemin(topD, h.a.contour));
        const A = [xm - lv, haut(xm - lv)], B = [xm + lv, haut(xm + lv)];
        const T = [xm, Math.min(A[1], B[1]) - 6], C = [xm, bas - 2];
        o.push(h.chemin([A, T, B, C], h.a.blanc, true));
        // la face à l'ombre du pli : un aplat (la charte), plus de hachure
        o.push(h.chemin([T, B, C], h.a.ombre, true));
        o.push(h.chemin([A, C, B], h.a.arete));
        o.push(h.ligne(T[0], T[1], C[0], C[1], h.a.arete));
        o.push(h.chemin([A, T, B], h.a.contour));
      } else if (i === 1) {
        // La pince taillée : le pli coupé, un V ouvert.
        o.push(h.chemin(topG, h.a.contour), h.chemin(topD, h.a.contour));
        o.push(h.chemin([[xm - lv, haut(xm - lv)], [xm, bas - 1], [xm + lv, haut(xm + lv)]], h.a.contour));
      } else {
        // La pince cousue : les deux bords aboutés, les points en biais qui traversent le joint,
        // un trou à chaque bout de chaque point.
        o.push(h.chemin(topG.concat(topD), h.a.contour));
        o.push(h.ligne(xm, haut(xm), xm, bas - 1, h.a.arete));
        points.forEach(y => {
          o.push(h.ligne(xm - 4.6, y + 2.6, xm + 4.6, y - 2.6, h.a.arete));
          o.push(h.cercle(xm - 5.4, y + 3.1, 1.5, h.a.plein), h.cercle(xm + 5.4, y - 3.1, 1.5, h.a.plein));
        });
      }
    }
    return o.join('\n');
  }

  // ─── Vue 5 : le laçage de près, le plat-bord de droite ─────────────────────────────
  // Même coupe que « En travers », côté droit, grossie ; la longueur fuit en haut à droite.
  // u : le long du plat-bord · v : vers le haut · w : vers le dehors (la peau).
  function geomLacage(z) {
    const r = 0.03, wi = r, wo = r + 0.005, L = 0.26, vb = 0.055, kx = 0.6, ky = 0.25, pas = 0.05;
    const sd = Math.min((z.h - 16) / (r + L * ky + vb + 0.012), (z.l - 30) / (r + wo + L * kx));
    const ox = (z.l - (r + wo + L * kx) * sd) / 2 + r * sd, oy = 8 + (r + L * ky + 0.012) * sd;
    const Q = (u, v, ww) => [ox + (ww + u * kx) * sd, oy - (v + u * ky) * sd];
    const vt = -r - 0.007;                                     // les trous, sous le plat-bord
    const us = [0, 1, 2, 3, 4].map(k => 0.03 + k * pas);
    return { r, wi, wo, L, vb, kx, ky, pas, sd, Q, vt, us };
  }
  function lacage(z) {
    const { r, wi, wo, L, vb, kx, ky, pas, sd, Q, vt, us } = geomLacage(z), o = [];
    const re = r + 0.002;                                      // la babiche couchée sur le plat-bord
    // Le plat-bord : corps (enveloppe de la coupe avant et du bout arrière), puis la coupe.
    const n = [ky, kx], nn = Math.hypot(...n), nx = n[0] / nn, ny = n[1] / nn;   // normale écran à la fuite
    const [c0x, c0y] = Q(0, 0, 0), [c1x, c1y] = Q(L, 0, 0), R = r * sd;
    const a0 = [c0x - R * nx, c0y - R * ny], a1 = [c1x - R * nx, c1y - R * ny];
    const b0 = [c0x + R * nx, c0y + R * ny], b1 = [c1x + R * nx, c1y + R * ny];
    const corps = `M ${f(a0[0])} ${f(a0[1])} L ${f(a1[0])} ${f(a1[1])} A ${f(R)} ${f(R)} 0 0 1 ${f(b1[0])} ${f(b1[1])} L ${f(b0[0])} ${f(b0[1])} A ${f(R)} ${f(R)} 0 0 0 ${f(a0[0])} ${f(a0[1])} Z`;
    o.push(h.path(corps, h.a.blanc), h.path(corps, h.a.arete));
    const pt = (u, th, rr = re) => Q(u, rr * Math.cos(th), rr * Math.sin(th));   // th : 0 en haut, + vers le dehors
    // La peau : sa face du dehors, taillée au haut du plat-bord, cassée en bas et au fond.
    const Ft = Q(0, r, wo), Bt = Q(L, r, wo), Bb = Q(L, -vb, wo), Fb = Q(0, -vb, wo);
    o.push(h.chemin([Ft, Bt, Bb, Fb], h.a.blanc, true));
    o.push(h.ligne(...Ft, ...Bt, h.a.arete));
    const casse = (p, q, nb) => {
      const out = [];
      for (let k = 0; k <= nb; k++) {
        const t = k / nb, dx = q[0] - p[0], dy = q[1] - p[1], Lq = Math.hypot(dx, dy);
        const off = (k % 2 ? 1.6 : -1.6) * (k > 0 && k < nb ? 1 : 0);
        out.push([p[0] + dx * t - dy / Lq * off, p[1] + dy * t + dx / Lq * off]);
      }
      return lisse(out, false);
    };
    o.push(h.path(casse(Fb, Bb, 10), h.a.fin), h.path(casse(Bt, Bb, 8), h.a.fin));
    // Brins cachés, en tireté fin : derrière le plat-bord, le brin descend en dedans, passe
    // dessous, entre plat-bord et peau, et vient ressortir au trou suivant.
    for (let k = 0; k < us.length - 1; k++) {
      const u0 = us[k] + 0.55 * pas, u1 = us[k + 1];
      const pts = [];
      for (let j = 0; j <= 10; j++) {
        const t = j / 10, th = -0.42 - t * (Math.PI - 0.42 + 0.35);
        pts.push(pt(u0 + (u1 - u0) * 0.75 * t, th));
      }
      pts.push(Q(u1, vt + 0.001, wi));
      o.push(h.path(lisse(pts, false), cacheFin));
    }
    // La coupe avant du plat-bord, hachurée : devant tout le reste.
    o.push(h.cercle(c0x, c0y, R, h.a.blanc), h.cercle(c0x, c0y, R, h.a.hachure('bois', 'aucun')), h.cercle(c0x, c0y, R, h.a.arete));
    // La tranche de la peau, en coupe, au bord du plat-bord.
    o.push(h.ligne(...Q(0, r, (wi + wo) / 2), ...Q(0, -vb, (wi + wo) / 2), h.a.contour));
    // Les trous, puis les brins qui en sortent, montent sur la peau et passent par-dessus.
    const ruban = h.formes && h.formes.corde;
    us.forEach(u => {
      const [tx, ty] = Q(u, vt, wo);
      const brin = [
        [tx, ty - 2.4],
        Q(u + 0.10 * pas, -0.35 * r, wo + 0.002),
        Q(u + 0.22 * pas, r * 0.75, wo + 0.002),
        Q(u + 0.32 * pas, r + 0.003, wo * 0.55),
        pt(u + 0.42 * pas, 0),
        pt(u + 0.55 * pas, -0.42),
      ];
      o.push(h.ellipse(tx, ty, 2.6, 3.1, h.a.plein));
      if (ruban) o.push(String(ruban(brin, { ep: 3, debut: 'ouvert', fin: 'ouvert', trait: 'detail' })));
      else o.push(h.path(lisse(brin, false), h.a.arete));
    });
    return o.join('\n');
  }

  return {
    ref: '90-02a',
    titre: 'Le canot de peaux d’orignal, sur le lit',
    desc: 'Deux peaux d’orignal cousues l’une au bout de l’autre, recouvertes d’environ 150 mm, avec deux rangs de points de babiche. Vu de dessus, sur le lit : le cadre des plats-bords posé sur les peaux et chargé de pierres ; chaque plat-bord est fait de deux jeunes arbres joints par le gros bout au milieu, les bouts croisés et liés, une traverse au centre et une corde de babiche torse près de chaque bout ; les trous des piquets, en tireté, marquent le contour sous la peau. En demi-coupe : la pierre sur le plat-bord, le même trou de piquet contre le contour, le bord de la peau qui roule quand elle a raidi. En coupe : le cadre soulevé, de chaque côté lié au piquet replanté par une ligature qui prend le plat-bord, la peau et le piquet, et la peau taillée au haut du plat-bord et lacée autour de lui à la babiche ; 1000 mm d’un flanc à l’autre. De près, le plat-bord de droite : chaque tour de babiche sort d’un trou percé dans la peau sous le plat-bord, monte sur la peau, passe par-dessus et redescend en dedans jusqu’au trou suivant. Aux bouts, vu de dehors : le pli de peau en trop qui sort du pan, la pince taillée en V, la pince cousue bord à bord, points en biais.',
    format: 'pleine',
    disposition: [['plan'], ['lit', 'releve'], ['pinces', 'lacage']],
    hauteurs: [1.35, 0.95, 0.75],
    largeurs: [[1], [0.94, 1.06], [1.9, 1]],
    vues: {
      plan: {
        titre: 'Sur le lit, vu de dessus',
        dessin: plan,
        renvois: z => {
          const { P } = geomPlan(z);
          return [
            { n: 1, rond: P(-0.72, 0.74), cible: P(-0.275, 0.62), texte: 'peaux cousues, deux rangs' },
            { n: 2, rond: P(0.42, -0.76), cible: P(0.1, -w(0.1) + ep(0.1) / 2), texte: 'joint des gros bouts' },
            { n: 3, rond: P(2.08, -0.5), cible: P(DL + 0.02, 0.0), texte: 'bouts croisés et liés' },
            { n: 4, rond: P(0.34, 0.72), cible: P(0.02, 0.25), texte: 'traverse du centre' },
            { n: 5, rond: P(-1.52, 0.72), cible: P(-1.15, 0.12), texte: 'corde de babiche torse' },
            { n: 6, rond: P(1.34, 0.74), cible: P(1.2, w(1.2) + 0.045), texte: 'trou du piquet' },
          ];
        },
      },
      lit: {
        titre: 'Demi-coupe : chargé de pierres',
        dessin: lit,
        renvois: z => {
          const { s, Y, X } = geomLit(z);
          return [
            { n: 7, rond: [X(0.2), Y - 0.2 * s], cible: [X(0.42), Y - 0.1 * s], texte: 'pierres sur le cadre' },
            { n: 8, rond: [X(0.72), Y - 0.2 * s], cible: [X(0.54), Y + 22], texte: 'le même trou, en coupe' },
            { n: 9, rond: [X(0.98), Y - 0.28 * s], cible: [X(0.95), Y - 20], texte: 'le bord roule : peau raidie' },
          ];
        },
      },
      releve: {
        titre: 'En travers : cadre soulevé, flancs relevés',
        dessin: releve,
        renvois: z => {
          const { P, cote } = geomReleve(z);
          const g = cote(-1), d = cote(1);
          const [xp, yp] = P(-RL.xo, 0.2);
          const t = d.tours[0], a = Math.PI * 0.78;
          return [
            { n: 10, rond: [xp - 22, yp], cible: [xp, yp], texte: 'piquet replanté' },
            { n: 11, rond: P(-0.25, 0.24), cible: [g.lig.x2, g.gy + 3], texte: 'cadre lié au piquet' },
            { n: 12, rond: P(0.25, 0.24), cible: [t.x + d.Rl * Math.cos(a), t.y + d.Rl * Math.sin(a)], texte: 'peau lacée au plat-bord' },
          ];
        },
      },
      pinces: {
        titre: 'Aux bouts, vu de dehors : les pinces',
        dessin: pinces,
        renvois: z => {
          const { bw, bh, by, boite } = geomPinces(z);
          return [0, 1, 2].map(i => {
            const { bx, xm, bas, lv, haut, points } = boite(i);
            let cible;
            if (i === 0) cible = [xm + lv * 0.28, by + bh * 0.42];
            else if (i === 1) { const y = by + bh * 0.45; cible = [xm + lv * (bas - 1 - y) / (bas - 1 - haut(xm + lv)), y]; }
            else { const y = points.reduce((m, p) => Math.abs(p - (by + bh * 0.45)) < Math.abs(m - (by + bh * 0.45)) ? p : m, points[0]); cible = [xm + 1.5, y - 0.9]; }
            return { n: 13 + i, rond: [bx + bw + 22, by + bh * 0.3], cible,
              texte: ['le pli de peau en trop', 'la pince taillée', 'la pince cousue'][i] };
          });
        },
      },
      lacage: {
        titre: 'Le plat-bord lacé, de près',
        dessin: lacage,
      },
    },
  };
};
