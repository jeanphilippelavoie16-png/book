// Planche 95-10 — Le tunnel de perches, la cloche, le bidon noirci et le drap des nuits claires
// (chapitre 95, § « Voler des degrés aux deux bouts » et § « Le paillis et le gel »).
// Le chapitre dit : perches d'épinette pliées en arceaux, n'importe quelle pellicule claire
// dessus, lestée au sol sur tout le pourtour ; un bidon translucide coupé à mi-hauteur posé sur
// le plant, bouchon enlevé le jour ; une pierre noire ou un bidon plein d'eau noirci à la suie
// entre deux plants, qui prennent le soleil le jour et le rendent la nuit ; un drap, une toile ou
// des branches de conifère qui bloquent la vue du ciel les nuits claires. Aucune mesure : aucune
// cote. Le lest est dessiné en pierres, le pied des perches piqué en terre.
// La charte : la pellicule garde son contour fort ; les pierres du lest qui sont derrière le
// tunnel reculent en gris loin. Pas d'ombre : la pellicule et la cloche sont claires, on voit au
// travers. Le rouge : le bord de la pellicule à plat sous les pierres et le goulot débouché le jour
// (les deux points que le chapitre dit de tenir). Les flèches de chaleur et de soleil restent noires.
module.exports = (h) => {
  const f = (n) => Math.round(n * 10) / 10;
  const blanc = (a) => a.replace('fill="none"', 'fill="#FFFFFF"');
  const noir = (a) => a.replace('fill="none"', 'fill="#1A1A1A"');
  const deg = Math.PI / 180;

  // ─── outils de forme ───
  const lisse = (pts, ferme) => {
    const n = pts.length;
    const at = (i) => (ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))]);
    let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
    const fin = ferme ? n : n - 1;
    for (let i = 0; i < fin; i++) {
      const p0 = at(i - 1), p1 = at(i), p2 = at(i + 1), p3 = at(i + 2);
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
    }
    return d + (ferme ? ' Z' : '');
  };
  // Une pierre posée : contour irrégulier, dessous aplati, une ombre fine en bas à droite.
  const pierre = (cx, cy, rx, ry, g, at = blanc(h.a.arete)) => {
    const pts = [];
    for (let k = 0; k < 9; k++) {
      const a = (k / 9) * 2 * Math.PI + g * 0.4;
      const r = 1 + 0.13 * Math.sin(g * 2.7 + k * 1.9) + 0.07 * Math.cos(g * 1.3 + k * 3.1);
      let y = cy + ry * r * Math.sin(a);
      if (y > cy + ry * 0.55) y = cy + ry * 0.55 + (y - cy - ry * 0.55) * 0.25;
      pts.push([cx + rx * r * Math.cos(a), y]);
    }
    const out = [h.path(lisse(pts, true), at)];
    if (at.indexOf('#FFFFFF') >= 0) {
      const o = [15, 40, 65, 90].map((a) => [cx + rx * 0.72 * Math.cos(a * deg - 0.5), cy + ry * 0.5 * Math.sin(a * deg - 0.5) + ry * 0.05]);
      out.push(h.path(lisse(o, false), h.a.fin));
    }
    return out.join('\n');
  };
  // Un jeune plant : tige, deux paires de feuilles, deux petites au bout.
  const feuille = (px, py, len, ang, at) => {
    const tx = px + len * Math.cos(ang), ty = py - len * Math.sin(ang);
    const mx = (px + tx) / 2, my = (py + ty) / 2, w = len * 0.3;
    const nx = -Math.sin(ang) * w, ny = -Math.cos(ang) * w;
    return h.path(`M${f(px)} ${f(py)} Q${f(mx + nx)} ${f(my + ny)} ${f(tx)} ${f(ty)} Q${f(mx - nx)} ${f(my - ny)} ${f(px)} ${f(py)} Z`, blanc(at));
  };
  const plante = (x, gy, ht, at = h.a.detail) => {
    const top = [x + ht * 0.03, gy - ht];
    const out = [h.path(`M${f(x)} ${f(gy)} Q${f(x + ht * 0.07)} ${f(gy - ht * 0.5)} ${f(top[0])} ${f(top[1])}`, at)];
    const y1 = gy - ht * 0.42, y2 = gy - ht * 0.72;
    out.push(feuille(x + ht * 0.035, y1, ht * 0.46, 152 * deg, at), feuille(x + ht * 0.035, y1, ht * 0.46, 28 * deg, at));
    out.push(feuille(x + ht * 0.04, y2, ht * 0.34, 140 * deg, at), feuille(x + ht * 0.04, y2, ht * 0.34, 40 * deg, at));
    out.push(feuille(top[0], top[1], ht * 0.2, 115 * deg, at), feuille(top[0], top[1], ht * 0.2, 65 * deg, at));
    return out.join('\n');
  };
  // Le sol en coupe : fond blanc (cache ce qui est enfoui), trame de terre, ligne du sol.
  const sol = (x1, x2, gy, ep) => [
    h.rect(x1, gy, x2 - x1, ep, h.a.blanc),
    h.rect(x1, gy, x2 - x1, ep, h.a.hachure('terre', 'aucun')),
    h.ligne(x1, gy, x2, gy, h.a.arete),
  ].join('\n');
  // Un tube (perche) le long d'une polyligne, en polygone fermé.
  const tube = (pts, ep) => {
    const g = [], d = [];
    pts.forEach((p, i) => {
      const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
      const l = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
      const nx = -(b[1] - a[1]) / l * ep / 2, ny = (b[0] - a[0]) / l * ep / 2;
      g.push([p[0] + nx, p[1] + ny]); d.push([p[0] - nx, p[1] - ny]);
    });
    return g.concat(d.reverse());
  };
  const cubique = (p0, p1, p2, p3, n) => Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n, m = 1 - t;
    return [0, 1].map((k) => m * m * m * p0[k] + 3 * m * m * t * p1[k] + 3 * m * t * t * p2[k] + t * t * t * p3[k]);
  });
  const enveloppe = (pts) => {                       // enveloppe convexe (chaîne monotone)
    const p = pts.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
    const bas = [], haut = [];
    p.forEach((q) => { while (bas.length > 1 && cr(bas[bas.length - 2], bas[bas.length - 1], q) <= 0) bas.pop(); bas.push(q); });
    p.slice().reverse().forEach((q) => { while (haut.length > 1 && cr(haut[haut.length - 2], haut[haut.length - 1], q) <= 0) haut.pop(); haut.push(q); });
    return bas.slice(0, -1).concat(haut.slice(0, -1));
  };

  // ─── le bidon : profil en unités (hauteur 1), x centré, y vers le haut ───
  // Côté droit du bas vers le haut ; le gauche en miroir. bw : demi-largeur du corps, nw : du col.
  const cote = (bw, nw, yb, yt, arrondi) => {
    const pts = arrondi ? [[bw * 0.82, yb], [bw * 0.95, yb + 0.012], [bw, yb + 0.05]] : [[bw, yb]];
    return pts.concat(cubique([bw, 0.66], [bw, 0.8], [nw + 0.05, 0.84], [nw, 0.88], 8), [[nw, yt]]);
  };
  // Le contour fermé : on part du bas à droite, on monte à droite, on redescend à gauche.
  const bidon = (bw, nw, yb, yt, arrondi) => {
    const d = cote(bw, nw, yb, yt, arrondi);
    const g = d.map(([x, y]) => [-x, y]).reverse();
    return d.concat(g);
  };
  const ANSE_EXT = [[0.2, 0.83], [0.44, 0.86], [0.47, 0.64], [0.31, 0.6]];
  const ANSE_INT = [[0.265, 0.785], [0.375, 0.79], [0.395, 0.69], [0.312, 0.665]];
  const anse = (T, attAnse, attTrou) => {
    const ext = cubique(...ANSE_EXT, 10).map(T);
    const int = cubique(...ANSE_INT, 10).map(T);
    return [h.chemin(ext, attAnse, true), h.chemin(int, attTrou, true)].join('\n');
  };

  // ─── la vue d'ensemble du tunnel : projection oblique, le long du tunnel vers le fond à droite ───
  const RX = 1, RZ = 0.95, ARCS = [0, 1, 2, 3, 4], JUPE = 1.38, LY = 4;
  const A = [0, -0.9, 0], B = [0, LY + 0.9, 0];
  const kc = 0.5 * Math.cos(38 * deg), ks = 0.5 * Math.sin(38 * deg);
  const repT = (z) => {
    const umin = -1.52, umax = 3.02;
    const vmin = A[1] * ks - 0.12, vmax = RZ + LY * ks + 0.05;
    const s = Math.min((z.l - 56) / (umax - umin), (z.h - 44) / (vmax - vmin));
    const ox = 28 + (z.l - 56 - s * (umax - umin)) / 2 - s * umin;
    const oy = z.h - 18 - (z.h - 44 - s * (vmax - vmin)) / 2 + s * vmin;
    const p = (x, y, zz) => [ox + s * (x + y * kc), oy - s * (zz + y * ks)];
    return { s, p };
  };
  const arc = (p, y, dr = 0, t0 = 0, t1 = 180, n = 36) =>
    Array.from({ length: n + 1 }, (_, i) => { const t = (t0 + (t1 - t0) * i / n) * deg; return p((RX + dr) * Math.cos(t), y, (RZ + dr) * Math.sin(t)); });
  const LEST = [[1.19, LY], [1.19, 0], [0.22, -0.8], [-0.22, -0.8], [-1.19, 0], [-1.19, LY], [-0.22, LY + 0.8], [0.22, LY + 0.8]];
  const pierresLest = () => {                        // des pierres tout le long du pourtour
    const out = [];
    let reste = 0.2;
    LEST.forEach((a, i) => {
      const b = LEST[(i + 1) % LEST.length];
      const l = Math.hypot(b[0] - a[0], b[1] - a[1]);
      for (let d = reste; d < l; d += 0.42) out.push([a[0] + (b[0] - a[0]) * d / l, a[1] + (b[1] - a[1]) * d / l]);
      reste = 0.42 - ((l - reste) % 0.42);
    });
    return out;
  };

  // ─── la coupe en travers, sur un arceau ───
  const repC = (z) => {
    const umin = -1.6, umax = 1.6, vmin = -0.45, vmax = RZ + 0.1;
    const s = Math.min((z.l - 20) / (umax - umin), (z.h - 16) / (vmax - vmin));
    const ox = z.l / 2, oy = z.h - 8 - (z.h - 16 - s * (vmax - vmin)) / 2 + s * vmin;
    return { s, q: (x, v) => [ox + s * x, oy - s * v] };
  };

  // ─── la cloche : un bidon entier coupé, puis la cloche la nuit et le jour ───
  const repK = (z) => {
    const W = 2.1, H = 2.1;
    const u = Math.min((z.l - 16) / W, (z.h - 12) / H);
    const x0 = (z.l - u * W) / 2, gy = z.h - 6 - (z.h - 12 - u * H) / 2 - u * 0.22;
    return { u, k: (x, v) => [x0 + u * x, gy - u * v], X: [0.5, 1.5] };
  };

  // ─── le bidon noirci : le jour à gauche, la nuit à droite ───
  const repN = (z) => {
    const W = 6.0, H = 1.72, DX = 3.2;
    const u = Math.min((z.l - 14) / W, (z.h - 10) / H);
    const x0 = (z.l - u * W) / 2 + u * 0.05;
    const gy = z.h - 5 - (z.h - 10 - u * H) / 2 - u * 0.16;
    return { u, gy, k: (x, v, sc) => [x0 + u * (x + sc * DX), gy - u * v] };
  };
  const XN = { a: 0.1, b: 0.78, c: 1.46, d: 1.98, e: 2.52 };   // plant, bidon, plant, pierre, plant

  // ─── le drap : un rang couvert, un plant à découvert ───
  const repD = (z) => {
    const W = 2.5, H = 1.45;
    const u = Math.min((z.l - 14) / W, (z.h - 10) / H);
    const x0 = (z.l - u * W) / 2 + u * 0.28;
    const gy = z.h - 5 - (z.h - 10 - u * H) / 2 - u * 0.22;
    return { u, k: (x, v) => [x0 + u * x, gy - u * v] };
  };
  const DRAP = [[-0.26, 0.012], [-0.12, 0.012], [-0.04, 0.26], [0.06, 0.52], [0.2, 0.61], [0.4, 0.59], [0.6, 0.575], [0.8, 0.59], [1.0, 0.61], [1.14, 0.52], [1.24, 0.26], [1.32, 0.012], [1.46, 0.012]];

  return {
    ref: '95-10',
    titre: 'Le tunnel de perches, la cloche, le bidon noirci et le drap',
    desc: 'Le tunnel : des perches d’épinette pliées en arceaux, une pellicule claire dessus, lestée de pierres sur tout le pourtour, les bouts ramassés et lestés eux aussi ; en travers, la perche piquée en terre et le bord de la pellicule à plat au sol sous les pierres. La cloche : un bidon translucide coupé à mi-hauteur, le haut posé sur le plant, bouchon vissé la nuit, enlevé le jour pour laisser sortir la chaleur. Le bidon plein d’eau noirci à la suie et la pierre noire entre les plants prennent le soleil le jour et rendent la chaleur aux plants la nuit. Les nuits claires, un drap sur le rang garde dessous la chaleur que le sol rend ; à découvert, elle monte vers le ciel.',
    format: 'pleine',
    disposition: [['tunnel', 'cloche'], ['coupe', 'drap'], ['bidon']],
    largeurs: [[2, 1], [3, 2], [1]],
    hauteurs: [1.4, 0.95, 0.8],
    vues: {
      tunnel: {
        titre: 'Le tunnel de perches',
        dessin: (z) => {
          const { s, p } = repT(z);
          const out = [];
          // La pellicule à plat au sol, tout autour : son bord extérieur.
          const bord = [[JUPE, LY], [JUPE, 0], [0.3, -0.98], [-0.3, -0.98], [-JUPE, 0], [-JUPE, LY], [-0.3, LY + 0.98], [0.3, LY + 0.98]];
          out.push(h.chemin(bord.map(([x, y]) => p(x, y, 0)), blanc(h.a.detail), true));
          const pierres = pierresLest();
          const derriere = (q) => q[0] < -0.6 || q[1] > LY + 0.3;
          const gris = (a) => a.replace('fill="none"', 'fill="#E6E6E6"');
          const peint = (q, i, at) => { const [cx, cy] = p(q[0], q[1], 0); return pierre(cx, cy - s * 0.06, s * 0.2, s * 0.12, i + 1, at); };
          pierres.forEach((q, i) => { if (derriere(q)) out.push(peint(q, i, gris(h.a.arete))); });
          // Le corps du tunnel : l'enveloppe des arceaux et des deux bouts, pellicule claire.
          const env = enveloppe([...arc(p, 0), ...arc(p, LY), p(...A), p(...B)]);
          out.push(h.chemin(env, h.a.blanc, true));
          // Dessous, vus au travers : les plants et les perches, du fond vers l'avant.
          const choses = [];
          ARCS.forEach((y) => choses.push({ y, d: () => h.chemin(tube(arc(p, y), s * 0.075), blanc(h.a.arete), true) }));
          [0.5, 1.5, 2.5, 3.5].forEach((y) => [-0.45, 0.45].forEach((x) => choses.push({ y: y + x * 0.01, d: () => {
            const [gx, gy] = p(x, y, 0);
            return plante(gx, gy, s * 0.42, h.a.fin);
          } })));
          choses.sort((a, b) => b.y - a.y).forEach((c) => out.push(c.d()));
          // La pellicule : le faîte, les plis du bout ramassé, le contour.
          [40, 90, 140].forEach((t) => {
            const pts = [];
            for (let y = 0; y <= LY + 1e-9; y += 0.1) {
              const creux = 0.05 * Math.sin(Math.PI * (y % 1));      // la pellicule creuse entre deux perches
              pts.push(p((RX + 0.04 - creux) * Math.cos(t * deg), y, (RZ + 0.04 - creux) * Math.sin(t * deg)));
            }
            out.push(h.chemin(pts, h.a.fin));
          });
          [25, 55, 90, 125, 155].forEach((t) => out.push(h.chemin([p(...A), p((RX + 0.04) * Math.cos(t * deg), 0, (RZ + 0.04) * Math.sin(t * deg))], h.a.fin)));
          out.push(h.chemin(arc(p, 0, 0.04), h.a.detail));
          out.push(h.chemin(env, h.a.contour, true));
          pierres.forEach((q, i) => { if (!derriere(q)) out.push(peint(q, i)); });
          return out.join('\n');
        },
        renvois: (z) => {
          const { s, p } = repT(z);
          const c1 = p(RX * Math.cos(152 * deg), 0, RZ * Math.sin(152 * deg));
          const c2 = p(RX * Math.cos(112 * deg), 2.5, RZ * Math.sin(112 * deg) + 0.03);
          const c3 = p(1.19, 2.1, 0.05);
          const c4 = p(-0.22, -0.8, 0.05);
          return [
            { n: 1, rond: [c1[0] - 34, c1[1] - 30], cible: c1, texte: 'perche d’épinette en arceau' },
            { n: 2, rond: [c2[0] - 40, c2[1] - 30], cible: c2, texte: 'pellicule claire' },
            { n: 3, rond: [c3[0] + 30, c3[1] + 24], cible: [c3[0] + s * 0.05, c3[1] - s * 0.02], texte: 'pierres sur tout le pourtour' },
            { n: 4, rond: [c4[0] - 34, c4[1] + 8], cible: [c4[0] - s * 0.1, c4[1] - s * 0.04], texte: 'le bout ramassé, lesté aussi' },
          ];
        },
      },
      coupe: {
        titre: 'En travers, sur un arceau',
        dessin: (z) => {
          const { s, q } = repC(z);
          const out = [];
          const gy = q(0, 0)[1];
          out.push(sol(q(-1.6, 0)[0], q(1.6, 0)[0], gy, s * 0.45));
          // Les plants sous le tunnel.
          [-0.45, 0.45].forEach((x) => out.push(plante(q(x, 0)[0], gy, s * 0.45)));
          // La perche : pliée en arceau, les deux pieds piqués en terre.
          const ax = Array.from({ length: 41 }, (_, i) => { const t = i / 40 * 180 * deg; return q(RX * Math.cos(t), RZ * Math.sin(t)); });
          const perche = [q(RX + 0.012, -0.28), ...ax, q(-RX - 0.012, -0.28)];
          out.push(h.chemin(tube(perche, s * 0.085), h.a.blanc, true), h.chemin(tube(perche, s * 0.085), h.a.hachure('bois'), true));
          [-1, 1].forEach((c) => out.push(h.chemin([q(c * RX, -0.28), q(c * (RX - 0.02), -0.33), q(c * (RX + 0.04), -0.28)], h.a.detail)));
          // La pellicule : par-dessus la perche, jusqu'au sol, puis à plat de chaque côté.
          const e = 0.135;
          const film = [q(1.56, 0.025), q(RX + e, 0.025),
            ...Array.from({ length: 41 }, (_, i) => { const t = i / 40 * 180 * deg; return q((RX + e) * Math.cos(t), (RZ + e) * Math.sin(t)); }),
            q(-RX - e, 0.025), q(-1.56, 0.025)];
          out.push(h.chemin(film, h.a.arete));
          // Les pierres sur le bord à plat.
          [[-1.25, 3], [1.25, 7]].forEach(([x, g]) => { const [cx, cy] = q(x, 0.02); out.push(pierre(cx, cy - s * 0.08, s * 0.18, s * 0.145, g)); });
          // le point à tenir : le bord de la pellicule, à plat sous la pierre, sur tout le pourtour
          { const [cx, cy] = q(1.31, 0.05); out.push(h.controle(cx, cy, s * 0.165)); }
          return out.join('\n');
        },
        renvois: (z) => {
          const { s, q } = repC(z);
          const c5 = q(1.25, 0.1), c6 = q(1.0, -0.2);
          return [
            { n: 8, rond: [c5[0] + 2, c5[1] - 34], cible: c5, texte: 'bord à plat, sous les pierres' },
            { n: 9, rond: [c6[0] - 40, c6[1] + 4], cible: c6, texte: 'pied piqué en terre' },
          ];
        },
      },
      cloche: {
        titre: 'La cloche',
        dessin: (z) => {
          const { u, k } = repK(z);
          const out = [];
          const T = (cx, vb) => ([x, y]) => k(cx + x, vb + y);
          // Le bidon entier, la ligne de coupe à mi-hauteur.
          const Te = T(0.5, 1.02);
          out.push(h.chemin(cubique(...ANSE_EXT, 10).map(Te).concat([Te([0.31, 0.83])]), blanc(h.a.arete), true));
          out.push(h.chemin(bidon(0.31, 0.09, 0, 0.97, true).map(Te), blanc(h.a.arete), true));
          out.push(h.chemin(cubique(...ANSE_INT, 10).map(Te), blanc(h.a.detail), true));
          out.push(h.chemin([Te([-0.2, 0.12]), Te([-0.2, 0.58])], h.a.fin));
          const bo = (Tb) => h.path(`M${f(Tb([-0.1, 0.97])[0])} ${f(Tb([-0.1, 0.97])[1])} H${f(Tb([0.1, 0.97])[0])} V${f(Tb([0.1, 1.06])[1])} H${f(Tb([-0.1, 1.06])[0])} Z`, blanc(h.a.arete));
          out.push(bo(Te));
          out.push(h.chemin([Te([-0.42, 0.5]), Te([0.58, 0.5])], h.a.cache));
          out.push(h.chemin([Te([-0.08, 0]), Te([0.08, 0])].map(([x, y]) => [x, y]), h.a.fin));
          out.push(h.chemin([k(0.05, 1.02), k(0.95, 1.02)], h.a.detail));
          // Les deux cloches sur le plant : le haut du bidon, le bord enfoncé dans la terre.
          [[0.45, true], [1.35, false]].forEach(([cx, bouche]) => {
            const Tc = T(cx, -0.53);
            out.push(plante(k(cx, 0)[0], k(cx, 0)[1], u * 0.3));
            out.push(h.chemin(cubique(...ANSE_EXT, 10).map(Tc).concat([Tc([0.31, 0.83])]), blanc(h.a.arete), true));
            // la paroi translucide : le plant se voit au travers, donc pas de fond blanc
            out.push(h.chemin(bidon(0.31, 0.09, 0.5, 0.97, false).map(Tc), h.a.arete, true));
            out.push(h.chemin(cubique(...ANSE_INT, 10).map(Tc), blanc(h.a.detail), true));
            if (bouche) out.push(bo(Tc));
            else {
              const [mx, my] = Tc([0, 0.97]);
              out.push(h.ellipse(mx, my, u * 0.09, u * 0.025, blanc(h.a.detail)));
              // le point à tenir : le goulot débouché le jour
              out.push(h.controle(mx, my, u * 0.14));
              // le bouchon posé à côté, sur le flanc
              const [bx, by] = k(cx + 0.64, 0);
              out.push(h.rect(bx - u * 0.1, by - u * 0.09, u * 0.2, u * 0.09, blanc(h.a.arete)));
            }
          });
          out.push(sol(k(0, 0)[0], k(2.1, 0)[0], k(0, 0)[1], u * 0.22));
          // Le jour : la chaleur sort par le goulot.
          const [a0, a1, a2, a3] = [k(1.35, 0.26), k(1.35, 0.62), k(1.37, 0.8), k(1.51, 0.95)];
          out.push(h.fleche(`M${f(a0[0])} ${f(a0[1])} L${f(a1[0])} ${f(a1[1])} Q${f(a2[0])} ${f(a2[1])} ${f(a3[0])} ${f(a3[1])}`, h.a.cache));
          return out.join('\n');
        },
        renvois: (z) => {
          const { u, k } = repK(z);
          return [
            { n: 5, rond: k(1.45, 1.52), cible: k(1.08, 1.52), texte: 'couper à mi-hauteur' },
            { n: 6, rond: k(0.08, 0.72), cible: k(0.39, 0.5), texte: 'la nuit : bouchon vissé' },
            { n: 7, rond: k(1.02, 0.8), cible: k(1.32, 0.46), texte: 'le jour : bouchon enlevé' },
          ];
        },
      },
      bidon: {
        titre: 'Le bidon plein d’eau noirci et la pierre noire, le jour et la nuit',
        dessin: (z) => {
          const { u, gy, k } = repN(z);
          const out = [];
          [0, 1].forEach((sc) => {
            const T = ([x, y]) => k(XN.b + x, y, sc);
            [XN.a, XN.c, XN.e].forEach((x) => out.push(plante(k(x, 0, sc)[0], gy, u * 0.7)));
            // Le bidon plein d'eau, noirci : la paroi noire, l'eau dedans jusqu'au col.
            out.push(h.chemin(cubique(...ANSE_EXT, 10).map(T).concat([T([0.31, 0.83])]), noir(h.a.arete), true));
            out.push(h.chemin(cubique(...ANSE_INT, 10).map(T), h.a.blanc, true));
            out.push(h.chemin(bidon(0.31, 0.09, 0, 0.97, true).map(T), noir(h.a.arete), true));
            const eau = bidon(0.255, 0.045, 0.05, 0.92, false).map(T);
            out.push(h.chemin(eau, h.a.blanc, true), h.chemin(eau, h.a.hachure('eau', 'aucun'), true));
            const [b1, b2] = [T([-0.1, 0.97]), T([0.1, 1.06])];
            out.push(h.rect(b1[0], b2[1], b2[0] - b1[0], b1[1] - b2[1], noir(h.a.arete)));
            const [px, py] = k(XN.d, 0, sc);
            out.push(pierre(px, py - u * 0.1, u * 0.24, u * 0.17, 5, noir(h.a.arete)));
            out.push(sol(k(-0.25, 0, sc)[0], k(2.8, 0, sc)[0], gy, u * 0.15));
          });
          // Le jour : le soleil tombe sur le noir.
          [[0.56, 0.84], [1.0, 0.84], [1.94, 0.27]].forEach(([x, v]) => {
            const [e0, e1] = [k(x - 0.16, v + 0.62, 0), k(x - 0.01, v + 0.05, 0)];
            out.push(h.fleche(`M${f(e0[0])} ${f(e0[1])} L${f(e1[0])} ${f(e1[1])}`, h.a.detail));
          });
          // La nuit : ils rendent la chaleur aux plants d'à côté.
          [[0.45, 0.42, 0.22], [1.11, 0.42, 1.36], [1.74, 0.2, 1.54], [2.22, 0.2, 2.44]].forEach(([xa, va, xb]) => {
            const [e0, e1, e2] = [k(xa, va, 1), k((xa + xb) / 2, va + 0.16, 1), k(xb, va + 0.08, 1)];
            out.push(h.fleche(`M${f(e0[0])} ${f(e0[1])} Q${f(e1[0])} ${f(e1[1])} ${f(e2[0])} ${f(e2[1])}`, h.a.cache));
          });
          return out.join('\n');
        },
        renvois: (z) => {
          const { k } = repN(z);
          return [
            { n: 13, rond: k(1.35, 1.25, 0), cible: k(1.08, 0.66, 0), texte: 'bidon d’eau noirci à la suie' },
            { n: 14, rond: k(2.3, 0.85, 0), cible: k(2.1, 0.24, 0), texte: 'pierre noire' },
            { n: 15, rond: k(0.12, 1.4, 0), cible: k(0.42, 1.4, 0), texte: 'le jour : ils chauffent' },
            { n: 16, rond: k(1.45, 1.1, 1), cible: k(1.24, 0.56, 1), texte: 'la nuit : ils la rendent' },
          ];
        },
      },
      drap: {
        titre: 'Les nuits claires, le drap',
        dessin: (z) => {
          const { u, k } = repD(z);
          const out = [];
          const gy = k(0, 0)[1];
          [0.2, 1.0, 1.88].forEach((x) => out.push(plante(k(x, 0)[0], gy, u * 0.5)));
          out.push(sol(k(-0.3, 0)[0], k(2.2, 0)[0], gy, u * 0.22));
          out.push(h.path(lisse(DRAP.map(([x, v]) => k(x, v)), false), h.a.contour));
          // Sous le drap, la chaleur du sol remonte et reste dessous.
          [0.48].forEach((x) => {
            const pts = [k(x, 0.04), k(x, 0.36), k(x, 0.5), k(x + 0.12, 0.5), k(x + 0.24, 0.5), k(x + 0.24, 0.36), k(x + 0.24, 0.1)];
            out.push(h.fleche(`M${f(pts[0][0])} ${f(pts[0][1])} L${f(pts[1][0])} ${f(pts[1][1])} Q${f(pts[2][0])} ${f(pts[2][1])} ${f(pts[3][0])} ${f(pts[3][1])} Q${f(pts[4][0])} ${f(pts[4][1])} ${f(pts[5][0])} ${f(pts[5][1])} L${f(pts[6][0])} ${f(pts[6][1])}`, h.a.cache));
          });
          // À découvert, elle part vers le ciel.
          [1.62, 2.14].forEach((x) => {
            const [e0, e1] = [k(x, 0.04), k(x, 1.18)];
            out.push(h.fleche(`M${f(e0[0])} ${f(e0[1])} L${f(e1[0])} ${f(e1[1])}`, h.a.cache));
          });
          return out.join('\n');
        },
        renvois: (z) => {
          const { u, k } = repD(z);
          return [
            { n: 10, rond: k(0.2, 1.0), cible: k(0.2, 0.62), texte: 'drap, toile ou branches' },
            { n: 11, rond: k(0.75, 1.0), cible: k(0.6, 0.5), texte: 'la chaleur reste dessous' },
            { n: 12, rond: k(1.36, 1.0), cible: k(1.62, 0.9), texte: 'à découvert, elle s’en va' },
          ];
        },
      },
    },
  };
};
