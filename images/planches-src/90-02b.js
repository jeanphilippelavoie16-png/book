// 90-02b — Le canot de peaux d'orignal, la coque (ch. 90, « Le canot de peaux d'orignal »,
// étapes 9 à 13). Suite de 90-02a (les peaux sur le lit, le cadre, les flancs relevés).
// Cotes, toutes du chapitre : 3,8 m de long, 36 à 48 cm de creux, bordé à 5 à 10 cm d'écart.
// La largeur (1 m) est cotée en 90-02a, sur le cadre soulevé. L'étrave fait environ 90 cm : son tracé caché en élévation a cette longueur
// développée (courbe de 0,8 m + talon de 0,1 m), sans cote, parce qu'une cote sur une courbe
// cachée ne se lit pas.
// Le bordé fait les trois quarts de la longueur : il s'arrête à 1,425 m du milieu de chaque
// côté, le bout sous une membrure.

module.exports = (h) => {
  const f = (v) => Math.round(v * 10) / 10;
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
  // Mêmes courbes, échantillonnées (pour les décalages).
  function echant(p, k = 12) {
    const n = p.length, g = (i) => p[Math.max(0, Math.min(n - 1, i))], out = [];
    for (let i = 0; i < n - 1; i++) {
      const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      for (let j = 0; j < k; j++) {
        const t = j / k, t2 = t * t, t3 = t2 * t;
        out.push([0, 1].map(c => 0.5 * ((2 * p1[c]) + (-p0[c] + p2[c]) * t + (2 * p0[c] - 5 * p1[c] + 4 * p2[c] - p3[c]) * t2 + (-p0[c] + 3 * p1[c] - 3 * p2[c] + p3[c]) * t3)));
      }
    }
    out.push(p[n - 1]);
    return out;
  }
  function decale(pts, e) {           // décalage à gauche du sens de parcours
    return pts.map((p, i) => {
      const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
      const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1;
      return [p[0] - dy / L * e, p[1] + dx / L * e];
    });
  }
  function bande(pts, ep) {
    const g = decale(pts, ep / 2), d = decale(pts, -ep / 2);
    return g.concat(d.reverse());
  }
  const trait = (pts) => pts.map((p, i) => `${i ? 'L' : 'M'} ${f(p[0])} ${f(p[1])}`).join(' ');

  // ─── Géométrie commune, en mètres ──────────────────────────────────────────────────
  const DL = 1.9, D = 0.42;
  const w = (x) => { const u = Math.min(1, Math.abs(x) / DL); return 0.5 * (1 - u * u) * (1 + 0.3 * u * u); };
  const ep = (x) => 0.058 - 0.028 * Math.min(1, Math.abs(x) / DL);
  const fond = (x) => { const a = Math.abs(x); return a <= 1.3 ? D : D * Math.sqrt(Math.max(0, 1 - ((a - 1.3) / 0.6) ** 2)); };

  // ─── Vue 1 : de côté ───────────────────────────────────────────────────────────────
  function geomCote(z) {
    const s = Math.min((z.l - 40) / 4.0, (z.h - 44) / 0.46), cx = z.l / 2, y0 = 20;
    return { s, P: (x, y) => [cx + x * s, y0 + y * s] };
  }
  function cote(z) {
    const { s, P } = geomCote(z), o = [];
    // Coque : le livet au haut du plat-bord, le fond, les étraves en courbe.
    const bas = [];
    for (let x = DL; x >= -DL - 1e-9; x -= 0.02) bas.push(P(x, fond(x)));
    const coque = `M ${P(-DL, 0).map(f).join(' ')} L ${P(DL, 0).map(f).join(' ')} ` + bas.map(p => `L ${f(p[0])} ${f(p[1])}`).join(' ') + ' Z';
    o.push(h.path(coque, h.a.blanc));
    // Plat-bord : caché derrière la peau, taillée à sa ligne ; seuls les bouts croisés dépassent.
    [-1, 1].forEach(sx => {
      const a = P(sx * (DL - 0.02), -0.012), b = P(sx * (DL + 0.08), 0.02);
      o.push(h.rect(Math.min(a[0], b[0]), a[1], Math.abs(b[0] - a[0]), b[1] - a[1], h.a.hachure('bois', 'aucun')));
      o.push(h.rect(Math.min(a[0], b[0]), a[1], Math.abs(b[0] - a[0]), b[1] - a[1], h.a.arete));
    });
    o.push(h.path(coque, h.a.contour));
    // Étraves, cachées dans la peau : de la tête, liée au croisement des plats-bords, au talon.
    [-1, 1].forEach(sx => {
      const pts = [];
      for (let x = DL - 0.005; x >= 1.21; x -= 0.02) pts.push([sx * x, Math.min(fond(x), D)]);
      const ext = pts.map(p => P(p[0], p[1]));
      const int = decale(ext, sx > 0 ? 0.04 * s : -0.04 * s);
      const ext2 = decale(ext, sx > 0 ? 0.01 * s : -0.01 * s);
      o.push(h.path(trait(ext2), h.a.cache), h.path(trait(int), h.a.cache));
      // Ligature de la tête dans la pointe des plats-bords.
      const [hx, hy] = P(sx * (DL + 0.01), 0);
      o.push(h.path(`M ${f(hx - 4)} ${f(hy - 4)} L ${f(hx + 4)} ${f(hy + 5)} M ${f(hx - 1)} ${f(hy - 5)} L ${f(hx + 6)} ${f(hy + 3)} M ${f(hx - 6)} ${f(hy - 2)} L ${f(hx + 1)} ${f(hy + 6)}`, h.a.detail));
      // Points de la couture au profil de l'étrave.
      let dz = '';
      for (let x = DL - 0.03; x >= 1.32; x -= 0.045) {
        const a = P(sx * x, fond(x)), b = P(sx * (x - 0.01), fond(x - 0.01));
        const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy);
        const nx = -dy / L * 4, ny = dx / L * 4;
        dz += ` M ${f(a[0] - nx)} ${f(a[1] - ny)} L ${f(a[0] + nx)} ${f(a[1] + ny)}`;
      }
      o.push(h.path(dz.trim(), h.a.arete));
      // Pinces cousues, près des bouts.
      [1.5, 1.66].forEach(x0 => {
        const x1 = x0 - 0.1;
        const a = P(sx * x0, ep(x0) * 0.7), b = P(sx * x1, fond(x1) - 0.005);
        o.push(h.ligne(a[0], a[1], b[0], b[1], h.a.arete));
        let dp = '';
        for (let t = 0.15; t < 0.95; t += 0.2) {
          const px = a[0] + (b[0] - a[0]) * t, py = a[1] + (b[1] - a[1]) * t;
          dp += ` M ${f(px - 3)} ${f(py - 1)} L ${f(px + 3)} ${f(py + 1)}`;
        }
        o.push(h.path(dp.trim(), h.a.detail));
      });
    });
    // Laçage : la babiche passe par-dessus le plat-bord, d'un trou de la peau au suivant.
    let dl = '';
    for (let x = -DL + 0.2; x <= DL - 0.2; x += 0.09) {
      const a = P(x, 0.05), b = P(x + 0.05, 0);
      dl += ` M ${f(a[0])} ${f(a[1])} L ${f(b[0])} ${f(b[1])}`;
    }
    o.push(h.path(dl.trim(), h.a.arete));
    // Cote : la longueur.
    const [xa, ya] = P(-DL, D), [xb] = P(DL, D);
    o.push(h.cote(xa, ya + 14, xb, ya + 14, '3,8 m', { cote: 'dessous' }));
    return o.join('\n');
  }

  // ─── Vue 2 : vu de dessus, l'intérieur ─────────────────────────────────────────────
  function geomDessus(z) {
    const s = Math.min((z.l - 40) / 4.0, (z.h - 60) / 1.0), cx = z.l / 2 - 10, cy = z.h / 2;
    return { s, P: (x, y) => [cx + x * s, cy + y * s] };
  }
  const win = (x) => Math.max(0, w(x) - ep(x) - 0.006);
  const KB = [0, -0.26, 0.26, -0.5, 0.5, -0.72, 0.72, -0.9, 0.9];   // bordé
  const XB = 1.42;                                                  // 3/4 de 3,8 m
  const XM = [];
  for (let j = 1; j <= 8; j++) { const x = j === 7 ? 1.405 : j === 8 ? 1.6 : j * 0.2; XM.push(x, -x); }
  function dessus(z) {
    const { s, P } = geomDessus(z), o = [];
    // Peau : l'intérieur de la coque, jusqu'au plat-bord.
    const tour = [];
    for (let x = -DL; x <= DL + 1e-9; x += 0.02) tour.push(P(x, -w(x)));
    for (let x = DL; x >= -DL - 1e-9; x -= 0.02) tour.push(P(x, w(x)));
    o.push(h.chemin(tour, h.a.blanc, true));
    // Étraves : du milieu de la pointe vers l'intérieur, dans l'axe.
    [-1, 1].forEach(sx => {
      const [x1, y1] = P(sx > 0 ? 1.21 : -DL, -0.016);
      o.push(h.rect(x1, y1, 0.69 * s, 0.032 * s, h.a.hachure('bois', 'aucun')), h.rect(x1, y1, 0.69 * s, 0.032 * s, h.a.arete));
    });
    // Bordé : perches couchées dans la longueur, les trois quarts de la longueur du canot.
    KB.forEach(k => {
      const pts = [];
      for (let x = -XB; x <= XB + 1e-9; x += 0.05) pts.push(P(x, k * win(x)));
      const b = bande(pts, 0.022 * s);
      o.push(h.chemin(b, h.a.blanc, true), h.chemin(b, h.a.arete, true));
    });
    // Membrures, par-dessus le bordé.
    XM.forEach(x => {
      const y = win(x);
      o.push(h.rect(...P(x - 0.02, -y), 0.04 * s, 2 * y * s, h.a.blanc), h.rect(...P(x - 0.02, -y), 0.04 * s, 2 * y * s, h.a.arete));
    });
    // Plats-bords, bouts croisés.
    const xs = (a, b, n) => Array.from({ length: n + 1 }, (_, i) => a + (b - a) * i / n);
    [-1, 1].forEach(sy => {
      const pts = xs(-DL - 0.08, DL + 0.08, 80).map(x => {
        if (Math.abs(x) <= DL) return [x, sy * (w(x) - ep(x) / 2)];
        return [x, sy * (w(DL) - ep(DL) / 2) - sy * 0.62 * (Math.abs(x) - DL)];
      });
      const b = bande(pts.map(p => P(...p)), 0.042 * s).map(p => p);
      o.push(h.chemin(b, h.a.hachure('bois', 'aucun'), true), h.chemin(b, h.a.arete, true));
    });
    // Traverse du centre, bouts enroulés au plat-bord ; cordes de babiche torse près des bouts.
    const yT = w(0) - ep(0) / 2;
    o.push(h.rect(...P(-0.03, -yT), 0.06 * s, 2 * yT * s, h.a.hachure('bois', 'aucun')), h.rect(...P(-0.03, -yT), 0.06 * s, 2 * yT * s, h.a.arete));
    [-1, 1].forEach(sx => {
      const x = sx * 1.16, y0 = -(w(x) - ep(x)), y1 = w(x) - ep(x);
      let dz = '', k = 0;
      for (let y = y0; y <= y1 + 1e-6; y += 0.022) { const [px, py] = P(x + (k++ % 2 ? 0.009 : -0.009), y); dz += (dz ? ' L ' : 'M ') + f(px) + ' ' + f(py); }
      o.push(h.path(dz, h.a.detail));
    });
    return o.join('\n');
  }

  // ─── Vue 3 : demi-coupe au milieu ──────────────────────────────────────────────────
  const PEAU = [[-0.06, D], [0, D], [0.18, D - 0.004], [0.31, D - 0.022], [0.40, D - 0.065], [0.455, D - 0.14],
    [0.485, D - 0.24], [0.498, D - 0.33], [0.503, 0.07], [0.505, 0.0]];
  const RP = 0.035, CP = [0.505 - 0.004 - RP, RP], RB = 0.013;
  function geomCoupe(z) {
    const s = Math.min((z.l - 110) / 0.62, (z.h - 46) / 0.5), x0 = 22 + 0.06 * s, y0 = 16;
    return { s, P: (x, y) => [x0 + x * s, y0 + y * s] };
  }
  function geomCoupeCalc() {
    const pe = echant(PEAU, 16);
    // Longueur d'arc depuis l'axe.
    const arc = [0];
    for (let i = 1; i < pe.length; i++) arc.push(arc[i - 1] + Math.hypot(pe[i][0] - pe[i - 1][0], pe[i][1] - pe[i - 1][1]));
    const a0 = arc[pe.findIndex(p => p[0] >= 0)];
    const inter = decale(pe, -(0.004 + RB));              // centres des perches du bordé
    const memb = decale(pe, -(0.004 + 2 * RB + 0.006));   // fibre moyenne de la membrure
    const perches = [];
    for (let a = a0 + 0.05; ; a += 0.1) {
      const i = arc.findIndex(v => v >= a); if (i < 0) break;
      if (inter[i][1] < 0.13) break;
      perches.push(inter[i]);
    }
    return { pe, inter, memb, perches };
  }
  function coupe(z) {
    const { s, P } = geomCoupe(z), o = [], G = geomCoupeCalc();
    const Q = (p) => P(p[0], p[1]);
    // Laçage (derrière la membrure) : trou dans la peau sous le plat-bord, tour du plat-bord.
    {
      const yt = CP[1] + RP + 0.03, xo = 0.505 + 0.006, Rl = RP + 0.007;
      const a = Q([xo, yt]), b = Q([0.49, yt]), c = Q([CP[0] - Rl, CP[1] + 0.012]), d = Q([CP[0] - Rl, CP[1]]);
      const e = Q([CP[0] + Rl * Math.cos(-0.35), CP[1] + Rl * Math.sin(-0.35)]), g = Q([xo, CP[1] + 0.01]);
      const dd = `M ${f(a[0])} ${f(a[1])} L ${f(b[0])} ${f(b[1])} L ${f(c[0])} ${f(c[1])} L ${f(d[0])} ${f(d[1])} ` +
        `A ${f(Rl * s)} ${f(Rl * s)} 0 0 1 ${f(e[0])} ${f(e[1])} L ${f(g[0])} ${f(g[1])} Z`;
      o.push(h.path(dd, h.a.arete));
    }
    // Plat-bord en coupe, le trou percé par-dessous.
    const [pcx, pcy] = Q(CP);
    o.push(h.cercle(pcx, pcy, RP * s, h.a.hachure('bois', 'aucun')), h.cercle(pcx, pcy, RP * s, h.a.arete));
    // Membrure : bande pliée, de l'axe jusqu'au dessous du plat-bord, la tête dans le trou.
    const xm = G.memb.filter(p => p[1] > 0.075);
    const mb = bande(xm.map(Q), 0.012 * s);
    o.push(h.chemin(mb, h.a.hachure('bois', 'aucun'), true), h.chemin(mb, h.a.arete, true));
    const top = xm[xm.length - 1], tx = Q(top)[0], lt = 0.006 * s;
    const yBas = pcy + Math.sqrt(Math.max(0, (RP * s) ** 2 - (tx - pcx) ** 2));
    o.push(h.rect(tx - lt - 1.5, yBas - 0.034 * s, 2 * lt + 3, 0.034 * s, h.a.blanc));
    o.push(h.path(`M ${f(tx - lt - 1.5)} ${f(yBas)} V ${f(yBas - 0.034 * s)} H ${f(tx + lt + 1.5)} V ${f(yBas)}`, h.a.arete));
    o.push(h.path(`M ${f(tx - lt)} ${f(Q(top)[1])} V ${f(yBas - 0.03 * s)} H ${f(tx + lt)} V ${f(Q(top)[1])}`, h.a.detail));
    // Perches du bordé, en bout.
    G.perches.forEach(p => { const [x, y] = Q(p); o.push(h.cercle(x, y, RB * s, h.a.hachure('bois', 'aucun')), h.cercle(x, y, RB * s, h.a.arete)); });
    // Peau.
    o.push(h.path(lisse(PEAU.map(Q), false), h.a.contour));
    // Coupure dans l'axe.
    const [bx, by] = Q([-0.06, D]);
    o.push(h.path(`M ${f(bx + 2)} ${f(by - 0.07 * s)} L ${f(bx - 3)} ${f(by - 0.035 * s)} L ${f(bx + 3)} ${f(by - 0.01 * s)} L ${f(bx - 2)} ${f(by + 10)}`, h.a.fin));
    // Cotes : le creux, l'écart du bordé.
    const [cx1, cy1] = P(0.56, 0), [, cy2] = P(0.56, D + 0.004);
    o.push(h.cote(cx1 + 8, cy1, cx1 + 8, cy2, '36 à 48 cm', { cote: 'droite' }));
    const p1 = Q(G.perches[0]), p2 = Q(G.perches[1]), r = RB * s, yc = Q([0, D])[1] + 12;
    o.push(h.cote(p1[0] + r, yc, p2[0] - r, yc, '5 à 10 cm', { cote: 'dessous' }));
    return o.join('\n');
  }

  // ─── Vue 4 : l'étrave, coupée à plat ───────────────────────────────────────────────
  // Coupe horizontale à mi-hauteur de l'étrave : la pointe du canot à gauche, l'intérieur
  // de la coque à droite. Les deux pans de peau, taillés au profil, se pincent devant
  // l'étrave : le point les traverse là, devant elle. De temps en temps, un tour passe par
  // un trou de chaque pan derrière l'étrave et fait le tour de son dos : c'est lui qui tient
  // la charpente dans la peau.
  function geomEtrave(z) {
    const r = 24, sx = z.l * 0.42, cy = z.h * 0.5;
    const peau = (sg) => [[z.l - 8, cy + sg * 100], [sx + r + 46, cy + sg * (r + 30)], [sx + r * 0.3, cy + sg * (r + 1.8)],
      [sx - r * 0.72, cy + sg * (r * 0.72 + 1.2)], [sx - r - 2, cy + sg * 3.2], [sx - r - 12, cy + sg * 1.8], [sx - r - 48, cy + sg * 1.8]];
    const surPeau = (sg, x) => { const p = echant(peau(sg), 20); let m = p[0]; p.forEach(q => { if (Math.abs(q[0] - x) < Math.abs(m[0] - x)) m = q; }); return m; };
    return { r, sx, cy, peau, surPeau, xp: sx - r - 36, xq: sx - r - 14, xh: sx + r + 14 };
  }
  function etrave(z) {
    const { r, sx, cy, peau, surPeau, xp, xq, xh } = geomEtrave(z), o = [];
    o.push(h.cercle(sx, cy, r, h.a.hachure('bois', 'aucun')), h.cercle(sx, cy, r, h.a.arete));
    // Le tour : dehors le long du pan du haut, trou derrière l'étrave, autour de son dos,
    // trou dans le pan du bas, dehors le long du pan, à travers la pince devant l'étrave.
    const h1 = surPeau(-1, xh), h2 = surPeau(1, xh);
    const bord = (sg) => { const q = echant(peau(sg), 24).filter(p => p[0] >= xq && p[0] <= xh); return decale(q, sg < 0 ? 3.5 : -3.5).reverse(); };
    const dehorsH = bord(-1), dehorsB = bord(1).reverse();
    const L = (p) => `L ${f(p[0])} ${f(p[1])}`;
    const tour = `M ${f(xq)} ${f(cy - 5)} ` + dehorsH.map(L).join(' ') +
      ` L ${f(h1[0])} ${f(h1[1] + 3)} C ${f(sx + r + 10)} ${f(cy - r * 0.5)} ${f(sx + r + 7)} ${f(cy - 4)} ${f(sx + r + 7)} ${f(cy)}` +
      ` C ${f(sx + r + 7)} ${f(cy + 4)} ${f(sx + r + 10)} ${f(cy + r * 0.5)} ${f(h2[0])} ${f(h2[1] - 3)} ` +
      dehorsB.map(L).join(' ') + ` L ${f(xq)} ${f(cy + 5)} Z`;
    o.push(h.path(tour, h.a.detail));
    // Les deux pans de peau.
    [-1, 1].forEach(sg => o.push(h.path(lisse(peau(sg), false), h.a.contour)));
    // Le point ordinaire : la babiche traverse les deux pans pincés, devant l'étrave.
    o.push(h.path(`M ${f(xp - 10)} ${f(cy - 5.5)} L ${f(xp)} ${f(cy - 5.5)} L ${f(xp)} ${f(cy + 5.5)} L ${f(xp + 10)} ${f(cy + 5.5)}`, h.a.arete));
    return o.join('\n');
  }

  return {
    ref: '90-02b',
    titre: 'Le canot de peaux d’orignal, la coque',
    desc: 'La coque finie du canot de peaux d’orignal. De côté : 3,8 m de long ; l’étrave, cachée dans la peau, a sa tête liée dans la pointe où se croisent les plats-bords ; la peau est taillée au profil de l’étrave et cousue ; les pinces sont cousues près des bouts ; la babiche lace la peau par-dessus le plat-bord. Vu de dessus : le bordé, des perches couchées dans la longueur, fait les trois quarts de la longueur et ses bouts glissent sous une membrure ; les membrures traversent par-dessus. En demi-coupe au milieu : 36 à 48 cm de creux ; les perches du bordé, à 5 à 10 cm l’une de l’autre, couchées contre la peau ; la membrure pliée les pousse contre la peau, sa tête entrée dans un trou percé sous le plat-bord ; la peau lacée autour du plat-bord. L’étrave coupée à plat : les deux pans de peau pincés devant elle et cousus, les points passant à l’extérieur de l’étrave, et de temps en temps un tour qui passe derrière l’étrave pour la tenir.',
    format: 'pleine',
    disposition: [['cote'], ['dessus'], ['coupe', 'etrave']],
    hauteurs: [0.8, 1.05, 1.45],
    largeurs: [[1], [1], [3, 2]],
    vues: {
      cote: {
        titre: 'De côté',
        dessin: cote,
        renvois: z => {
          const { P } = geomCote(z);
          return [
            { n: 1, rond: P(-1.15, 0.2), cible: P(-1.706, 0.279), texte: 'étrave, tête liée aux plats-bords' },
            { n: 2, rond: P(1.35, 0.07), cible: P(1.8, fond(1.8) - 0.01), texte: 'peau cousue à l’étrave' },
            { n: 3, rond: P(1.1, 0.25), cible: P(1.5, 0.2), texte: 'pince cousue' },
          ];
        },
      },
      dessus: {
        titre: 'Vu de dessus : le bordé, les membrures',
        dessin: dessus,
        renvois: z => {
          const { P } = geomDessus(z);
          return [
            { n: 4, rond: P(-0.7, -0.62), cible: P(-0.6, -0.5 * win(-0.6)), texte: 'bordé, trois quarts de la longueur' },
            { n: 5, rond: P(1.45, -0.55), cible: P(1.405, -0.26 * win(1.405)), texte: 'bouts du bordé sous une membrure' },
            { n: 6, rond: P(0.8, 0.62), cible: P(0.775, 0.3), texte: 'membrures forcées une à une' },
          ];
        },
      },
      coupe: {
        titre: 'Demi-coupe au milieu',
        dessin: coupe,
        renvois: z => {
          const { P } = geomCoupe(z), G = geomCoupeCalc();
          const Q = (p) => P(p[0], p[1]);
          const pr = G.perches[1]; let mm = G.memb[0]; G.memb.forEach(q => { if (Math.abs(q[0] - 0.33) < Math.abs(mm[0] - 0.33)) mm = q; });
          return [
            { n: 7, rond: P(0.04, 0.24), cible: Q(pr), texte: 'bordé couché contre la peau' },
            { n: 8, rond: P(0.2, 0.13), cible: Q(mm), texte: 'membrure qui pousse le bordé' },
            { n: 9, rond: P(0.32, 0.02), cible: P(CP[0], CP[1] + 0.02), texte: 'tête dans le trou du plat-bord' },
            { n: 10, rond: P(0.64, 0.12), cible: P(0.512, 0.035), texte: 'babiche autour du plat-bord' },
          ];
        },
      },
      etrave: {
        titre: 'L’étrave, coupée à plat',
        dessin: etrave,
        renvois: z => {
          const { r, sx, cy, xp, xh, surPeau } = geomEtrave(z);
          const h1 = surPeau(-1, xh);
          return [
            { n: 11, rond: [xp - 4, cy - 58], cible: [xp, cy - 4], texte: 'points devant l’étrave' },
            { n: 12, rond: [sx + r + 50, cy - 70], cible: [sx + r + 7, cy - 6], texte: 'un tour autour, de temps en temps' },
          ];
        },
      },
    },
  };
};
