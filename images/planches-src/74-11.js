// Planche 74-11 — la tente à boucane (ch. 69, « Monter un séchoir sans fumoir » ; sert aussi
// aux ch. 65, 66, 67). Le chapitre ne donne aucune dimension : aucune cote. L'échelle est
// portée par un homme debout, la claie à hauteur de sa poitrine.
module.exports = (h) => {
  const A = h.a;
  const BL = (A.blanc.match(/fill="([^"]+)"/) || [])[1] || '#FFFFFF';
  const blanc = at => at.replace('fill="none"', `fill="${BL}"`);
  const bA = blanc(A.arete), bC = blanc(A.contour), bD = blanc(A.detail);
  const rappel = A.fin + ' stroke-dasharray="2 3"';
  const r1 = n => Math.round(n * 10) / 10;
  const P = pts => pts.map(([x, y]) => [r1(x), r1(y)]);
  const j = (k, i) => Math.sin(k * 7.3 + i * 2.9);           // petit désordre reproductible
  const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

  // perche effilée, du pied p0 à la tête p1
  const perche = (p0, p1, w0, w1, at = bA) => {
    const dx = p1[0] - p0[0], dy = p1[1] - p0[1], n = Math.hypot(dx, dy), nx = -dy / n, ny = dx / n;
    return h.chemin(P([[p0[0] + nx * w0 / 2, p0[1] + ny * w0 / 2], [p1[0] + nx * w1 / 2, p1[1] + ny * w1 / 2],
      [p1[0] - nx * w1 / 2, p1[1] - ny * w1 / 2], [p0[0] - nx * w0 / 2, p0[1] - ny * w0 / 2]]), at, true);
  };
  // branche d'épaisseur w le long d'une polyligne
  const branche = (pts, w, at = bA) => {
    const G = [], D = [];
    const nrm = (a, b) => { const dx = b[0] - a[0], dy = b[1] - a[1], n = Math.hypot(dx, dy); return [-dy / n, dx / n]; };
    pts.forEach((p, i) => {
      const n1 = i > 0 ? nrm(pts[i - 1], p) : nrm(p, pts[i + 1]);
      const n2 = i < pts.length - 1 ? nrm(p, pts[i + 1]) : n1;
      let nx = n1[0] + n2[0], ny = n1[1] + n2[1]; const n = Math.hypot(nx, ny); nx /= n; ny /= n;
      const k = Math.min(2.5, 1 / Math.max(0.2, nx * n1[0] + ny * n1[1])) * w / 2;
      G.push([p[0] + nx * k, p[1] + ny * k]); D.push([p[0] - nx * k, p[1] - ny * k]);
    });
    return h.chemin(P([...G, ...D.reverse()]), at, true);
  };
  // bûche de bouleau vert couchée, avec ses lenticelles
  const buche = (x1, y1, x2, y2, d) => {
    const a = Math.atan2(y2 - y1, x2 - x1), nx = -Math.sin(a) * d / 2, ny = Math.cos(a) * d / 2;
    const out = [h.chemin(P([[x1 + nx, y1 + ny], [x2 + nx, y2 + ny], [x2 - nx, y2 - ny], [x1 - nx, y1 - ny]]), bA, true),
      h.ellipse(r1(x2), r1(y2), r1(d * 0.22), r1(d / 2), bA)];
    for (let t = 0.12; t < 0.85; t += 0.14) {
      const px = x1 + (x2 - x1) * t, py = y1 + (y2 - y1) * t, o = (Math.round(t * 100) % 2 ? 0.16 : -0.12) * d;
      out.push(h.ligne(r1(px - 1.2), r1(py + o), r1(px + 1.2), r1(py + o), A.detail));
    }
    return out.join('\n');
  };
  // silhouette debout, pieds en (x, y), hauteur ht — l'échelle
  const homme = (x, y, ht) => {
    const d = [[0.028, 0.868], [0.118, 0.832], [0.14, 0.66], [0.142, 0.48], [0.13, 0.43], [0.116, 0.45], [0.112, 0.64],
      [0.097, 0.73], [0.088, 0.58], [0.097, 0.49], [0.083, 0.27], [0.068, 0.04], [0.088, 0.0], [0.02, 0.0], [0.024, 0.04],
      [0.02, 0.27], [0, 0.465]];
    const g = d.slice(0, -1).reverse().map(([u, v]) => [-u, v]);
    const pts = [...d, ...g].map(([u, v]) => [x + u * ht, y - v * ht]);
    return [h.chemin(P(pts), A.detail, true), h.cercle(r1(x), r1(y - 0.935 * ht), r1(0.064 * ht), A.detail)].join('\n');
  };
  // tours de ligature : n bandes minces orientées selon ang (degrés), centrées en (x, y)
  const tours = (x, y, n, ang, len, w = 1.8, pas = 2.6) => {
    const u = [Math.cos(ang * Math.PI / 180), Math.sin(ang * Math.PI / 180)], v = [-u[1], u[0]], o = [];
    for (let i = 0; i < n; i++) {
      const k = (i - (n - 1) / 2) * pas, c = [x + v[0] * k, y + v[1] * k];
      const p0 = [c[0] - u[0] * len / 2, c[1] - u[1] * len / 2], p1 = [c[0] + u[0] * len / 2, c[1] + u[1] * len / 2];
      o.push(h.chemin(P([[p0[0] + v[0] * w / 2, p0[1] + v[1] * w / 2], [p1[0] + v[0] * w / 2, p1[1] + v[1] * w / 2],
        [p1[0] - v[0] * w / 2, p1[1] - v[1] * w / 2], [p0[0] - v[0] * w / 2, p0[1] - v[1] * w / 2]]), bD, true));
    }
    return o.join('\n');
  };
  // ligature en tête : quelques tours autour du croisement
  const teteLiee = (cx, cy, w) => {
    const o = [h.chemin(P([[cx - w, cy - 4], [cx + w, cy - 6], [cx + w, cy + 3], [cx - w, cy + 5]]), bD, true)];
    for (let i = 1; i < 4; i++) o.push(h.ligne(r1(cx - w), r1(cy - 4 + i * 2.25), r1(cx + w), r1(cy - 6 + i * 2.25), A.fin));
    o.push(h.path(`M${r1(cx + w - 1)} ${r1(cy + 3)} q 3 6 -1 12`, A.detail));
    return o.join('\n');
  };

  return {
    ref: '74-11',
    titre: 'La tente à boucane',
    desc: 'Tente à boucane montée en une journée avec ce qui traîne : quatre perches liées en tête, une vieille toile ou une bâche jetée dessus et laissée ouverte en haut pour que la fumée tire, un pan relevé au pied pour l’air et pour nourrir le feu. En dedans, deux traverses liées aux perches à hauteur de poitrine portent une claie de branches écorcées où les lanières minces sont posées à plat sans se toucher ; dessous, un lit de braises, du bois vert de bouleau pour la fumée et une motte de gazon qui étouffe la flamme. Vue de l’extérieur, en coupe avec un homme debout pour l’échelle, coupée au-dessus de la claie, et un croisement lié à la babiche en détail.',
    format: 'pleine',
    disposition: [['elev', 'coupe'], ['plan', 'lien']],
    hauteurs: [2.3, 1.25],
    largeurs: [[1.1, 1.4], [1.3, 1]],
    vues: {
      // ── De l'extérieur ───────────────────────────────────────────────────────────────
      elev: {
        titre: 'De l’extérieur',
        dessin: z => {
          const o = [];
          const yg = z.h - 20;
          const H = Math.min((z.h - 34) / 1.22, (z.l - 30) / 0.88);
          const b = 0.423 * H, cx = z.l / 2, ya = yg - H, yr = yg - 0.78 * H;
          // sol
          o.push(h.rect(r1(6), r1(yg), r1(z.l - 12), 10, A.hachure('terre', 'aucun')));
          o.push(h.ligne(6, r1(yg), r1(z.l - 6), r1(yg), A.arete));
          // perches : pied, point de passage au croisement, prolongées au-delà
          const P4 = [[[cx - 0.47 * b, yg], [cx + 2, ya + 1]], [[cx + b, yg], [cx - 2.5, ya + 1.5]],
            [[cx - b, yg], [cx + 2.5, ya + 0.5]], [[cx + 0.47 * b, yg], [cx - 1.5, ya - 1]]];
          P4.forEach(([f, t]) => o.push(perche(f, lerp(f, t, 1.22), 6.5, 3.6)));
          o.push(teteLiee(cx, ya, 7));
          // la toile, ouverte en haut
          const hw = 0.22 * b + 4;
          const toile = [[cx + hw, yr + 2], [cx + b * 0.55, yg - 0.45 * H], [cx + b + 6, yg - 2], [cx + b + 10, yg],
            [cx + 0.5 * b, yg], [cx - 0.2 * b, yg], [cx - b - 10, yg], [cx - b - 6, yg - 2], [cx - b * 0.55, yg - 0.45 * H],
            [cx - hw, yr + 2], [cx - 0.12 * b, yr - 3], [cx - 0.05 * b, yr + 1], [cx + 0.02 * b, yr - 2.5],
            [cx + 0.09 * b, yr - 4], [cx + 0.15 * b, yr + 0.5]];
          o.push(h.chemin(P(toile), bC, true));
          // arête de la perche avant, sous la toile
          o.push(h.ligne(r1(cx + 0.09 * b), r1(yr - 2), r1(cx + 0.47 * b), r1(yg - 1), A.arete));
          // plis
          [[-0.16, 0.5, 0], [-0.05, 0.62, 1], [0.03, 0.4, 2], [0.14, 0.78, 3], [0.2, 0.5, 4]].forEach(([u, L, k]) => {
            const x0 = cx + u * b, y0 = yr + 2, x1 = cx + u * b * (1 + 3.2 * L) + j(k, 1) * 3, y1 = yr + 2 + L * 0.78 * H;
            o.push(h.path(`M${r1(x0)} ${r1(y0)} Q${r1((x0 + x1) / 2 + j(k, 2) * 4)} ${r1((y0 + y1) / 2)} ${r1(x1)} ${r1(y1)}`, A.fin));
          });
          // pan relevé : ouverture en arche et le rouleau de toile au-dessus
          const xL = cx - 0.8 * b, xR = cx - 0.22 * b, hO = 0.22 * H;
          const arche = (e) => { const pts = []; for (let i = 0; i <= 16; i++) { const t = i / 16; pts.push([xL - e * 0.4 + (xR - xL + e * 0.8) * t, yg - (hO + e) * Math.pow(Math.sin(Math.PI * t), 0.75)]); } return pts; };
          const inter = arche(0), exter = arche(7);
          o.push(h.chemin(P([...inter, [xR, yg], [xL, yg]]), bA, true));
          // le feu entrevu par l'ouverture, et le bas de la toile du fond
          o.push(h.ligne(r1(xL + 6), r1(yg - 7), r1(xR - 4), r1(yg - 8), A.fin));
          [[0.3, 2.2], [0.4, 2.6], [0.5, 2.2], [0.6, 2.5], [0.7, 2]].forEach(([t, r]) => o.push(h.cercle(r1(xL + (xR - xL) * t), r1(yg - 2.4), r, bD)));
          o.push(buche(xL + (xR - xL) * 0.28, yg - 6, xL + (xR - xL) * 0.7, yg - 7, 5));
          o.push(h.chemin(P([...exter, ...inter.slice().reverse()]), bA, true));
          for (let i = 2; i < 15; i += 2) { const p = inter[i], q = exter[i]; o.push(h.ligne(r1(p[0]), r1(p[1]), r1(q[0]), r1(q[1]), A.fin)); }
          return o.join('\n');
        },
        renvois: z => {
          const yg = z.h - 20, H = Math.min((z.h - 34) / 1.22, (z.l - 30) / 0.88);
          const b = 0.423 * H, cx = z.l / 2, ya = yg - H, yr = yg - 0.78 * H;
          return [
            { n: 1, rond: [cx + 0.6 * b, ya + 0.04 * H], cible: [cx + 8, ya - 1] },
            { n: 2, rond: [cx + 0.95 * b, yg - 0.55 * H], cible: [cx + 0.55 * b, yg - 0.42 * H] },
            { n: 3, rond: [cx - 0.55 * b, yr - 0.1 * H], cible: [cx - 0.13 * b, yr - 3] },
            { n: 4, rond: [cx - 0.97 * b, yg - 0.42 * H], cible: [cx - 0.64 * b, yg - 0.25 * H] },
          ].map((r, i) => ({ ...r, texte: [
            'quatre perches liées en tête',
            'vieille toile ou bâche',
            'haut ouvert : la fumée tire',
            'pan relevé : l’air entre',
          ][i] }));
        },
      },

      // ── En coupe ─────────────────────────────────────────────────────────────────────
      coupe: {
        titre: 'En coupe',
        dessin: z => {
          const o = [];
          const yg = z.h - 24;
          const H = Math.min((z.h - 34) / 1.22, (z.l - 86) / 0.95);
          const b = 0.423 * H, cx = 34 + b, ya = yg - H, yr = yg - 0.78 * H, yc = yg - 0.5 * H;
          const px = (s, y) => cx + s * b * (1 - (yg - y) / H);         // axe d'une perche à la hauteur y
          // terre en coupe, avec le creux du feu
          const sol = [[4, yg], [cx - 0.44 * b, yg], [cx - 0.4 * b, yg + 7], [cx + 0.4 * b, yg + 7], [cx + 0.44 * b, yg], [z.l - 4, yg]];
          o.push(h.chemin(P([...sol, [z.l - 4, z.h - 4], [4, z.h - 4]]), A.hachure('terre', 'aucun'), true));
          o.push(h.chemin(P(sol), A.arete));
          // perches du fond
          o.push(perche([cx - b, yg], lerp([cx - b, yg], [cx + 2, ya], 1.22), 7, 4));
          o.push(perche([cx + b, yg], lerp([cx + b, yg], [cx - 2, ya], 1.22), 7, 4));
          o.push(teteLiee(cx, ya, 7));
          // la claie : traverse du fond, branches coupées, lanières à plat
          const xa = px(-1, yc), xb = px(1, yc);
          o.push(h.rect(r1(xa - 7), r1(yc + 1), r1(xb - xa + 14), 5, bA));
          [xa, xb].forEach((x, k) => o.push(tours(x, yc + 3.5, 3, k ? 65 : 115, 10)));
          const n = 11, x0 = xa + 9, st = (xb - xa - 18) / (n - 1), xi = i => x0 + i * st;
          for (let i = 0; i < n; i++) o.push(h.cercle(r1(xi(i)), r1(yc - 1.9), 2.9, bA));
          [[0, 2], [4, 6], [8, 10]].forEach(([s, e], k) => {
            const top = [], bot = [];
            for (let x = xi(s) - 6; x <= xi(e) + 6.01; x += 1.5) {
              const t = (x - x0) / st, fr = t - Math.floor(t);
              let sag = 0.9 * Math.pow(Math.sin(Math.PI * fr), 2);
              if (x < xi(s)) sag = Math.pow((xi(s) - x) / 6, 1.6) * 3.2;
              if (x > xi(e)) sag = Math.pow((x - xi(e)) / 6, 1.6) * 3.2;
              bot.push([x, yc - 4.8 + sag]); top.push([x, yc - 7.6 + sag - (x < xi(s) || x > xi(e) ? 0 : 0)]);
            }
            o.push(h.chemin(P([...top, ...bot.reverse()]), bA, true));
          });
          // la toile coupée : ouverte en haut, roulée à gauche au pied, couchée à droite
          const yRoul = yg - 0.15 * H;
          o.push(h.chemin(P([[px(-1, yr) - 5, yr + 1], [px(-1, yRoul) - 5, yRoul]]), A.contour));
          o.push(h.cercle(r1(px(-1, yRoul) - 8), r1(yRoul + 3), 4.2, bC));
          o.push(h.chemin(P([[px(1, yr) + 5, yr + 1], [cx + b + 5, yg - 1.5], [cx + b + 18, yg - 1.5]]), A.contour));
          // le feu : braises, bois vert, motte de gazon
          const braises = [];
          for (let i = 0; i < 15; i++) braises.push([cx - 0.36 * b + i * 0.052 * b, yg + 4.2 + j(i, 3) * 0.8, 2.3 + j(i, 5) * 0.5]);
          for (let i = 0; i < 13; i++) braises.push([cx - 0.33 * b + i * 0.055 * b, yg + 0.3 + j(i, 7) * 0.8, 2.1 + j(i, 9) * 0.5]);
          braises.forEach(([x, y, r]) => o.push(h.cercle(r1(x), r1(y), r1(r), bD)));
          o.push(buche(cx - 0.36 * b, yg - 3.5, cx - 0.02 * b, yg - 5, 6.5));
          o.push(buche(cx - 0.3 * b, yg - 9.5, cx + 0.04 * b, yg - 11, 5.5));
          const mx0 = cx + 0.1 * b, mx1 = cx + 0.37 * b;
          o.push(h.chemin(P([[mx0, yg - 1], [mx0 - 1.5, yg - 7], [mx0 + 3, yg - 12], [(mx0 + mx1) / 2, yg - 13], [mx1 - 2, yg - 11.5],
            [mx1 + 1, yg - 6], [mx1, yg - 1]]), A.hachure('terre', 'arete'), true));
          for (let i = 0; i < 7; i++) {
            const x = mx0 + 4 + i * (mx1 - mx0 - 8) / 6, y = yg - 12.3 - (i > 0 && i < 6 ? 0.7 : 0);
            o.push(h.path(`M${r1(x)} ${r1(y)} l -2 -5 M${r1(x)} ${r1(y)} l 0.5 -6 M${r1(x)} ${r1(y)} l 2.5 -4.5`, A.fin));
          }
          // la fumée monte à travers la claie et sort par le haut ; l'air entre sous le rouleau
          o.push(h.fleche(`M${r1(cx - 0.1 * b)} ${r1(yg - 16)} C${r1(cx - 0.2 * b)} ${r1(yc + 20)} ${r1(xi(3))} ${r1(yc + 16)} ${r1(xi(3))} ${r1(yc - 2)} S${r1(cx - 4)} ${r1(yr + 10)} ${r1(cx - 8)} ${r1(ya - 0.17 * H)}`, A.cache));
          o.push(h.fleche(`M${r1(cx + 0.02 * b)} ${r1(yg - 18)} C${r1(cx + 0.1 * b)} ${r1(yc + 22)} ${r1(xi(7))} ${r1(yc + 16)} ${r1(xi(7))} ${r1(yc - 2)} S${r1(cx + 4)} ${r1(yr + 10)} ${r1(cx + 9)} ${r1(ya - 0.2 * H)}`, A.cache));
          o.push(h.fleche(`M${r1(cx - b - 30)} ${r1(yg - 8)} L${r1(cx - 0.5 * b)} ${r1(yg - 8)}`, A.cache));
          // l'homme debout : la claie à hauteur de sa poitrine
          const hm = 0.673 * H, xm = cx + b + 42;
          o.push(homme(xm, yg, hm));
          o.push(h.ligne(r1(xb + 9), r1(yc), r1(xm - 0.15 * hm), r1(yc), rappel));
          return o.join('\n');
        },
        renvois: z => {
          const yg = z.h - 24, H = Math.min((z.h - 34) / 1.22, (z.l - 86) / 0.95);
          const b = 0.423 * H, cx = 34 + b, yc = yg - 0.5 * H;
          const px = (s, y) => cx + s * b * (1 - (yg - y) / H);
          return [
            { n: 9, rond: [px(-1, yc - 30) - 22, yc - 30], cible: [px(-1, yc) - 6, yc + 3.5], texte: 'claie à hauteur de poitrine' },
            { n: 10, rond: [px(1, yc - 32) + 24, yc - 32], cible: [px(1, yc) - 12, yc - 8], texte: 'lanières minces, à plat' },
            { n: 11, rond: [cx - 0.64 * b, yg - 30], cible: [cx - 0.4 * b, yg + 1], texte: 'lit de braises' },
            { n: 12, rond: [cx - 0.36 * b, yg - 58], cible: [cx - 0.2 * b, yg - 13], texte: 'bois vert ou bouleau pourri' },
            { n: 13, rond: [cx + 0.55 * b, yg - 44], cible: [cx + 0.3 * b, yg - 13], texte: 'motte de gazon sur la braise' },
          ];
        },
      },

      // ── Coupée au-dessus de la claie ─────────────────────────────────────────────────
      plan: {
        titre: 'Coupée au-dessus de la claie',
        dessin: z => {
          const o = [];
          const a = Math.min((z.h - 26) / 2, (z.l - 96) / 2), cx = z.l / 2, cy = z.h / 2 + 1;
          const e = a - 5.5;                                             // axe des traverses
          // traverses
          [-1, 1].forEach(s => o.push(h.rect(r1(cx - a - 3), r1(cy + s * e - 3.5), r1(2 * a + 6), 7, bA)));
          // branches écorcées posées en travers
          const nb = Math.max(9, Math.round((2 * a - 28) / 10) + 1), bx = i => cx - a + 14 + i * (2 * a - 28) / (nb - 1);
          for (let i = 0; i < nb; i++) o.push(branche(P([[bx(i) + j(i, 1) * 0.8, cy - a + 3], [bx(i) + j(i, 2) * 1.6, cy], [bx(i) + j(i, 3) * 0.8, cy + a - 3]]), 4.4, bD));
          // lanières posées à plat, sans se toucher
          [[-0.62, -0.72, 0.1], [-0.32, -0.3, 0.66], [-0.02, -0.7, 0.28], [0.28, -0.4, 0.7], [0.58, -0.66, 0.4]].forEach(([v, u0, u1], k) => {
            const y = cy + v * a, w = 0.17 * a, x0 = cx + u0 * a, x1 = cx + u1 * a, m = (x0 + x1) / 2;
            o.push(h.path(`M${r1(x0 + 2)} ${r1(y - w / 2)} Q${r1(m)} ${r1(y - w / 2 - 1.5 + j(k, 1))} ${r1(x1 - 1)} ${r1(y - w / 2 + 0.5)}`
              + ` Q${r1(x1 + 2.5)} ${r1(y)} ${r1(x1 - 1.5)} ${r1(y + w / 2)} Q${r1(m)} ${r1(y + w / 2 + 1.5 + j(k, 2))} ${r1(x0 + 1)} ${r1(y + w / 2 - 0.5)}`
              + ` Q${r1(x0 - 2)} ${r1(y)} ${r1(x0 + 2)} ${r1(y - w / 2)} Z`, bA));
            o.push(h.path(`M${r1(x0 + 6)} ${r1(y + j(k, 4))} Q${r1(m)} ${r1(y + 1.5)} ${r1(x1 - 6)} ${r1(y - 0.5)}`, A.fin));
          });
          // ligatures des traverses aux perches
          [-1, 1].forEach(sx => [-1, 1].forEach(sy => {
            const x = cx + sx * (a - 1), y = cy + sy * e;
            o.push(tours(x - sx * 3, y, 3, sx * sy > 0 ? 60 : 120, 11));
          }));
          // la toile coupée et les perches coupées
          const c = a + 7, q = 3;
          o.push(h.path(`M${r1(cx - c)} ${r1(cy - c)} Q${r1(cx)} ${r1(cy - c + q)} ${r1(cx + c)} ${r1(cy - c)} Q${r1(cx + c - q)} ${r1(cy)} ${r1(cx + c)} ${r1(cy + c)}`
            + ` Q${r1(cx)} ${r1(cy + c - q)} ${r1(cx - c)} ${r1(cy + c)} Q${r1(cx - c + q)} ${r1(cy)} ${r1(cx - c)} ${r1(cy - c)} Z`, A.contour));
          [-1, 1].forEach(sx => [-1, 1].forEach(sy => o.push(h.ellipse(r1(cx + sx * a), r1(cy + sy * a), 5.5, 5.5, A.hachure('bois', 'arete')))));
          return o.join('\n');
        },
        renvois: z => {
          const a = Math.min((z.h - 26) / 2, (z.l - 96) / 2), cx = z.l / 2, cy = z.h / 2 + 1, e = a - 5.5;
          return [
            { n: 5, rond: [cx - a - 30, cy + e - 14], cible: [cx - a + 6, cy + e + 3.5], texte: 'traverse liée à deux perches' },
            { n: 6, rond: [cx + a + 30, cy - 0.47 * a], cible: [cx + a - 11, cy - 0.47 * a], texte: 'branches écorcées, posées' },
          ];
        },
      },

      // ── Un croisement lié ────────────────────────────────────────────────────────────
      lien: {
        titre: 'Un croisement lié',
        dessin: z => {
          const o = [];
          const s = Math.min(z.h / 190, z.l / 230), cx = z.l * 0.5, cy = z.h * 0.5;
          const wp = 30 * s, wt = 22 * s, ang = 12 * Math.PI / 180;
          const ux = Math.sin(ang), uy = -Math.cos(ang);                    // sens de la perche, vers le haut
          const L = (z.h / 2 - 8) / Math.cos(ang);
          const bas = [cx - ux * L, cy - uy * L], haut = [cx + ux * L, cy + uy * L];
          // la perche, avec son écorce
          o.push(perche(bas, haut, wp * 1.06, wp * 0.94));
          o.push(h.ellipse(r1(haut[0]), r1(haut[1]), r1(wp * 0.47), r1(wp * 0.12), bA));
          [-0.28, 0.05, 0.3].forEach((f, k) => {
            const nx = -uy, ny = ux, d = f * wp;
            o.push(h.path(`M${r1(bas[0] + nx * d)} ${r1(bas[1] + ny * d - 4)} L${r1(cx - ux * 30 * s + nx * d + j(k, 1))} ${r1(cy - uy * 30 * s + ny * d)}`, A.fin));
            o.push(h.path(`M${r1(cx + ux * 26 * s + nx * d)} ${r1(cy + uy * 26 * s + ny * d)} L${r1(haut[0] + nx * d + j(k, 2))} ${r1(haut[1] + ny * d + 6)}`, A.fin));
          });
          // la traverse, devant
          const tx0 = cx - 92 * s, tx1 = cx + 92 * s;
          o.push(h.rect(r1(tx0), r1(cy - wt / 2), r1(tx1 - tx0), r1(wt), bA));
          o.push(h.ellipse(r1(tx0), r1(cy), r1(wt * 0.14), r1(wt / 2), bA));
          o.push(h.ellipse(r1(tx1), r1(cy), r1(wt * 0.14), r1(wt / 2), bA));
          o.push(h.ellipse(r1(tx1), r1(cy), r1(wt * 0.06), r1(wt * 0.22), A.fin));
          [[-0.18, 0], [0.2, 1]].forEach(([f, k]) => {
            o.push(h.path(`M${r1(tx0 + 8 * s)} ${r1(cy + f * wt)} Q${r1(cx - 50 * s)} ${r1(cy + f * wt + j(k, 1) * 1.5)} ${r1(cx - 26 * s)} ${r1(cy + f * wt)}`, A.fin));
            o.push(h.path(`M${r1(cx + 26 * s)} ${r1(cy + f * wt)} Q${r1(cx + 55 * s)} ${r1(cy + f * wt + j(k, 2) * 1.5)} ${r1(tx1 - 8 * s)} ${r1(cy + f * wt)}`, A.fin));
          });
          // le nœud de départ sous la traverse, et le bout libre
          const yN = cy + wt / 2 + 7 * s;
          for (let i = 0; i < 2; i++) {
            const yy = yN + i * 5 * s, xl = cx - ux * (yy - cy) / -uy;
            o.push(h.chemin(P([[xl - wp * 0.54, yy + 1], [xl + wp * 0.54, yy - 1], [xl + wp * 0.54, yy - 1 + 3.6 * s], [xl - wp * 0.54, yy + 1 + 3.6 * s]]), bD, true));
          }
          o.push(branche(P([[cx - wp * 0.5, yN + 8 * s], [cx - wp * 0.5 - 14 * s, yN + 16 * s], [cx - wp * 0.5 - 22 * s, yN + 30 * s], [cx - wp * 0.5 - 18 * s, yN + 42 * s]]), 3.4 * s, bD));
          // les tours en croix : un sens, puis l'autre par-dessus
          const R = 22 * s, bw = 3.6 * s, pas = 4.6 * s;
          [[1, 1], [-1, 1]].forEach(([dx, dy]) => {
            const n = Math.hypot(dx, dy), u = [dx / n, dy / n], v = [-u[1], u[0]];
            for (let k = -1.5; k <= 1.5; k++) {
              const c = [cx + v[0] * k * pas, cy + v[1] * k * pas];
              const p0 = [c[0] - u[0] * R, c[1] - u[1] * R], p1 = [c[0] + u[0] * R, c[1] + u[1] * R];
              o.push(h.chemin(P([[p0[0] + v[0] * bw / 2, p0[1] + v[1] * bw / 2], [p1[0] + v[0] * bw / 2, p1[1] + v[1] * bw / 2],
                [p1[0] - v[0] * bw / 2, p1[1] - v[1] * bw / 2], [p0[0] - v[0] * bw / 2, p0[1] - v[1] * bw / 2]]), bD, true));
            }
          });
          return o.join('\n');
        },
        renvois: z => {
          const s = Math.min(z.h / 190, z.l / 230), cx = z.l * 0.5, cy = z.h * 0.5, wp = 30 * s, wt = 22 * s;
          const yN = cy + wt / 2 + 7 * s;
          return [
            { n: 7, rond: [cx - 70 * s, yN + 36 * s], cible: [cx - wp * 0.5 - 21 * s, yN + 28 * s], texte: 'babiche mouillée : elle serre' },
            { n: 8, rond: [cx + 62 * s, cy - 44 * s], cible: [cx + 16 * s, cy - 14 * s], texte: 'tours en croix, deux sens' },
          ];
        },
      },
    },
    danger: 'Danger — la boucane chasse les mouches, elle ne rend pas la viande sûre. Seule la cuisson le fait, à 74 °C à cœur pour le gibier et 70 °C pour le poisson.',
  };
};
