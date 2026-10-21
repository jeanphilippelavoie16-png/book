// Planche 110-43. Le brêlage de trépied (ch. 110, §9.5, point 21 ; ch. 109, §5-A).
// Trois perches couchées côte à côte, celle du milieu tête-bêche, écartées d'une demi-épaisseur ;
// un cabestan sur une perche du bord, huit tours autour des trois, deux frappes entre chaque paire,
// pas trop serrées, un cabestan d'arrêt sur celle du milieu ; puis le trépied dressé, les pattes
// écartées qui tendent le lien, les pieds reliés par une corde au ras du sol.
// Le trajet et la perche du milieu tête-bêche : US Army FM 5-125, ch. 5, « Rigging tripods,
// Method 1 » (sources/110-brelages-droit-diagonal-trepied.md). Les nombres (huit tours, deux frappes,
// une demi-épaisseur, l'écartement de la moitié aux deux tiers des pattes) sont ceux du ch. 109.
// La corde se peint par couches, de l'arrière vers l'avant.
module.exports = (h) => {
  const B = h.a.blanc.match(/fill="([^"]+)"/)[1];
  const blanc = t => h.a[t].replace('fill="none"', `fill="${B}"`);
  const f = v => Math.round(v * 100) / 100;
  const pt = p => `${f(p[0])} ${f(p[1])}`;
  const trace = pts => 'M ' + pts.map(pt).join(' L ');

  // Hasard reproductible (lenticelles de l'aulne).
  let graine = 11;
  const alea = () => (graine = (graine * 16807) % 2147483647) / 2147483647;

  const bez = (p0, p1, p2, p3, n = 18) => {
    const out = [];
    for (let i = 0; i <= n; i++) {
      const t = i / n, u = 1 - t;
      out.push([u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
        u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1]]);
    }
    return out;
  };
  const arc = (cx, cy, r, a0, a1, n = 14) => {
    const out = [];
    for (let i = 0; i <= n; i++) {
      const a = (a0 + (a1 - a0) * i / n) * Math.PI / 180;
      out.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
    }
    return out;
  };
  // Un quart d'ellipse (ou de cercle), avec une hauteur z pour les croisements de cordes.
  const ell = (c, rx, ry, a0, a1, z, m = 8) => {
    const out = [];
    for (let i = 0; i <= m; i++) {
      const a = (a0 + (a1 - a0) * i / m) * Math.PI / 180;
      out.push([c[0] + rx * Math.cos(a), c[1] + ry * Math.sin(a), z]);
    }
    return out;
  };
  // Enchaîne des tronçons continus (le premier point de chaque tronçon suivant est retiré).
  const suite = (...tr) => tr.reduce((acc, s) => acc.concat(acc.length ? s.slice(1) : s), []);
  // Rééchantillonne une polyligne à pas constant.
  const reech = (pts, pas) => {
    const out = [pts[0]];
    let reste = 0;
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1], b = pts[i], L = Math.hypot(b[0] - a[0], b[1] - a[1]);
      if (L < 1e-6) continue;
      let s = pas - reste;
      while (s <= L) { out.push([a[0] + (b[0] - a[0]) * s / L, a[1] + (b[1] - a[1]) * s / L]); s += pas; }
      reste = L - (s - pas);
    }
    const der = pts[pts.length - 1], p = out[out.length - 1];
    if (Math.hypot(der[0] - p[0], der[1] - p[1]) > 0.4) out.push(der);
    return out;
  };
  const reperes = pts => pts.map((p, i) => {
    const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1, tx = (b[0] - a[0]) / L, ty = (b[1] - a[1]) / L;
    return { p, tx, ty, nx: -ty, ny: tx };
  });
  const decale = (R, e) => R.map(r => [r.p[0] + r.nx * e, r.p[1] + r.ny * e]);

  // Une bande d'épaisseur e le long d'une ligne : fond blanc, deux flancs, bouts fermés.
  const bande = (pts0, e, trait = 'arete', bouts = true) => {
    const pts = reech(pts0, 1.5), R = reperes(pts), G = decale(R, e / 2), D = decale(R, -e / 2), n = pts.length - 1;
    const fond = 'M ' + G.map(pt).join(' L ') + ' L ' + D.slice().reverse().map(pt).join(' L ') + ' Z';
    const out = [h.path(fond, h.a.blanc), h.path(trace(G), h.a[trait]), h.path(trace(D), h.a[trait])];
    if (bouts) {
      out.push(h.ligne(G[0][0], G[0][1], D[0][0], D[0][1], h.a[trait]));
      out.push(h.ligne(G[n][0], G[n][1], D[n][0], D[n][1], h.a[trait]));
    }
    return { svg: out.join('\n'), R, G, D };
  };
  // Une corde : la bande, et les torons en biais.
  const corde = (pts0, e = 4, bouts = true) => {
    const b = bande(pts0, e, 'arete', bouts);
    let s = '';
    for (let i = 1; i < b.R.length - 1; i += 2) {
      const r = b.R[i], k = e * 0.4;
      s += `M ${pt([r.p[0] + r.nx * e / 2 - r.tx * k, r.p[1] + r.ny * e / 2 - r.ty * k])} L ${pt([r.p[0] - r.nx * e / 2 + r.tx * k, r.p[1] - r.ny * e / 2 + r.ty * k])} `;
    }
    return b.svg + (s ? '\n' + h.path(s.trim(), h.a.fin) : '');
  };
  // Le bout arrondi d'une corde qui tourne autour d'une perche : au bord de la silhouette, la
  // corde passe derrière ; son dos dépasse un peu du bord. q : milieu du bout, d : vers dehors.
  const tourne = (q, d, e, trait = 'arete') => {
    const nx = -d[1], ny = d[0], w = e / 2, k = e * 0.55;
    const G = [q[0] + nx * w, q[1] + ny * w], D = [q[0] - nx * w, q[1] - ny * w];
    const c1 = [G[0] + d[0] * k, G[1] + d[1] * k], c2 = [D[0] + d[0] * k, D[1] + d[1] * k];
    const dd = `M ${pt(G)} C ${pt(c1)} ${pt(c2)} ${pt(D)}`;
    return h.path(dd + ' Z', h.a.blanc) + '\n' + h.path(dd, h.a[trait]);
  };
  // Une perche d'aulne droite, amincie d'un bout à l'autre ; bouts « coupe » ou « rompu ».
  const perche = (a, b, w1, w2, bouts = ['coupe', 'coupe'], lent = true) => {
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]), tx = (b[0] - a[0]) / L, ty = (b[1] - a[1]) / L, nx = -ty, ny = tx;
    const P = (s, o) => [a[0] + tx * s + nx * o, a[1] + ty * s + ny * o];
    const w = s => w1 + (w2 - w1) * s / L;
    const bout = (p, q, s, type, sens) => {
      if (type !== 'rompu') return `L ${pt(q)}`;
      const k = Math.max(4, w(s) * 0.35);
      const c1 = [p[0] + (q[0] - p[0]) * 0.3 + tx * k * sens, p[1] + (q[1] - p[1]) * 0.3 + ty * k * sens];
      const c2 = [p[0] + (q[0] - p[0]) * 0.7 - tx * k * sens, p[1] + (q[1] - p[1]) * 0.7 - ty * k * sens];
      return `C ${pt(c1)} ${pt(c2)} ${pt(q)}`;
    };
    const g0 = P(0, w1 / 2), g1 = P(L, w2 / 2), d1 = P(L, -w2 / 2), d0 = P(0, -w1 / 2);
    const d = `M ${pt(g0)} L ${pt(g1)} ${bout(g1, d1, L, bouts[1], 1)} L ${pt(d0)} ${bout(d0, g0, 0, bouts[0], -1)} Z`;
    const out = [h.path(d, blanc('contour'))];
    if (lent) {
      // L'écorce : quelques traits fins le long de la tige.
      let s = '';
      const nb = Math.floor(L / 16);
      for (let i = 0; i < nb; i++) {
        const lg = 8 + alea() * 16, sv = 5 + alea() * Math.max(1, L - lg - 10), ww = w(sv) / 2 - 3;
        if (ww < 1.5) continue;
        const o = (alea() * 2 - 1) * ww;
        s += `M ${pt(P(sv, o))} L ${pt(P(sv + lg, o))} `;
      }
      if (s) out.push(h.path(s.trim(), h.a.fin));
    }
    return out.join('\n');
  };
  const neige = h.a.hachure('neige').replace(/stroke="[^"]*"/, 'stroke="none"');
  // La face à l'ombre d'un volume (la charte) : le gris là où la forme, poussée vers le bas à droite,
  // sort d'elle-même ; le blanc, l'ombre, puis le contour à 2,4 par-dessus.
  let nOmbre = 0;
  const ombre = (d, dx, dy) => {
    const id = `ombre-110-42-${++nOmbre}`;
    return `<clipPath id="${id}"><path d="${d}" fill="#FFFFFF"/></clipPath>\n${h.path(d, h.a.blanc)}\n<g clip-path="url(#${id})">${h.path(d, h.a.ombre)}` +
      `<path d="${d}" transform="translate(${-dx} ${-dy})" ${h.a.blanc}/></g>\n${h.path(d, h.a.contour)}`;
  };
  const chemin = (P, cmds) => cmds.map(c => {
    if (c === 'Z') return 'Z';
    const [k, ...v] = c, pts = [];
    for (let i = 0; i < v.length; i += 2) pts.push(pt(P(v[i], v[i + 1])));
    return k + ' ' + pts.join(' ');
  }).join(' ');

  const E = 9, S = E * 1.06;
  // un tronçon de corde, bouts ouverts : il se raccorde au suivant sans couture
  const tube = (pts, e = E) => bande(pts, e, 'arete', false).svg;
  const cap = (q, d) => { const L = Math.hypot(d[0], d[1]); return tourne(q, [d[0] / L, d[1] / L], E); };
  const libre = (a, b, e = E) => {
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]), u = [(b[0] - a[0]) / L, (b[1] - a[1]) / L], n = [-u[1], u[0]];
    const o = [h.ligne(b[0] + n[0] * e / 2, b[1] + n[1] * e / 2, b[0] - n[0] * e / 2, b[1] - n[1] * e / 2, h.a.arete)];
    let d = '';
    for (const k of [-0.28, 0, 0.28]) d += `M ${pt([b[0] + n[0] * e * k, b[1] + n[1] * e * k])} L ${pt([b[0] + n[0] * e * k * 1.5 + u[0] * e * 0.9, b[1] + n[1] * e * k * 1.5 + u[1] * e * 0.9])} `;
    o.push(h.path(d.trim(), h.a.detail));
    return o.join('\n');
  };
  const droite = (a, b, n = 6) => Array.from({ length: n + 1 }, (_, i) => [a[0] + (b[0] - a[0]) * i / n, a[1] + (b[1] - a[1]) * i / n]);
  const coin = (a, c, b, n = 6) => bez(a, [a[0] + (c[0] - a[0]) * 0.6, a[1] + (c[1] - a[1]) * 0.6], [b[0] + (c[0] - b[0]) * 0.6, b[1] + (c[1] - b[1]) * 0.6], b, n);
  // une polyligne aux coins arrondis (rayon r), pour une corde qui tourne net
  const arrondi = (P, r) => {
    const o = [P[0]];
    for (let i = 1; i < P.length - 1; i++) {
      const a = P[i - 1], c = P[i], b = P[i + 1];
      const la = Math.hypot(c[0] - a[0], c[1] - a[1]), lb = Math.hypot(b[0] - c[0], b[1] - c[1]), k = Math.min(r, la / 2, lb / 2);
      const p1 = [c[0] + (a[0] - c[0]) * k / la, c[1] + (a[1] - c[1]) * k / la], p2 = [c[0] + (b[0] - c[0]) * k / lb, c[1] + (b[1] - c[1]) * k / lb];
      o.push(...droite(o[o.length - 1], p1, 4).slice(1), ...coin(p1, c, p2, 6).slice(1));
    }
    o.push(...droite(o[o.length - 1], P[P.length - 1], 4).slice(1));
    return o;
  };


  // ─── un nœud de cabestan sur une perche couchée (axe horizontal) ───
  // Deux tours côte à côte, le croisement par-dessus en diagonale, les deux bouts qui sortent sous
  // le croisement de part et d'autre. m = 1 : l'entrée à gauche, la sortie à droite (−1 : l'inverse) ;
  // vy = 1 : l'entrée arrive par le haut (−1 : par le bas).
  const cabestan = (xm, yc, w, m = 1, vy = 1, entree = null, longSortie = 2.6 * E) => {
    const X = u => xm + m * u, Y = v => yc + vy * v, P = (u, v) => [X(u), Y(v)];
    const ua = -1.15 * E, ub = 1.15 * E, us = ua - 1.25 * E, dH = 0.38 * w;
    const p1 = arrondi([P(us, -w - 0.2 * E), P(us, dH), P(ub, dH), P(ub, w)], 0.8 * E);
    const e0 = entree || [P(us - 2.2 * E, -w - 0.7 * E)];
    const debut = bez(e0[0], [e0[0][0] + m * 1.1 * E, e0[0][1]], [X(us), Y(-w - 0.7 * E)], P(us, -w - 0.2 * E), 8);
    const p2 = droite(P(ub, -w), P(ua, w), 8);
    const p3 = arrondi([P(ua, -w), P(ua, -dH), P(ub + longSortie, -dH)], 0.8 * E);
    const svg = [tube([...debut, ...p1.slice(1)]), tube(p3), tube(p2),
      cap(P(ub, w), [0, vy]), cap(P(ub, -w), [0, -vy]), cap(P(ua, w), [0, vy]), cap(P(ua, -w), [0, -vy])].join('\n');
    return { svg, debut: debut[0], fin: p3[p3.length - 1], avantFin: p3[p3.length - 2], centre: P(0, 0), p3 };
  };

  // ─── les trois perches couchées, vues de dessus, au cadrage des gros plans ───
  const W = 36, G = W / 2;                                   // diamètre, écart d'une demi-épaisseur
  const geo = z => {
    const cy = Math.round(z.h * 0.5), xc = Math.round(z.l * 0.47);
    const ys = [cy - W - G, cy, cy + W + G];
    const xs = Array.from({ length: 8 }, (_, i) => xc + (i - 3.5) * S);
    return { cy, xc, ys, xs, haut: ys[0] - W / 2, bas: ys[2] + W / 2 };
  };
  const perches3 = z => {
    const { ys } = geo(z);
    // les deux du bord ont la tête à droite (elles s'amincissent vers la droite) ; celle du milieu, à gauche
    return [perche([4, ys[0]], [z.l - 4, ys[0]], W + 3, W - 3, ['rompu', 'rompu']),
      perche([4, ys[1]], [z.l - 4, ys[1]], W - 3, W + 3, ['rompu', 'rompu']),
      perche([4, ys[2]], [z.l - 4, ys[2]], W + 3, W - 3, ['rompu', 'rompu'])].join('\n');
  };
  // les huit tours, et le cabestan de départ sur la perche du haut, du côté de sa tête (à droite)
  const tours = z => {
    const { ys, xs, haut, bas } = geo(z), out = [], w = W / 2;
    const xm = xs[7] + 3.6 * E;
    const c = cabestan(xm, ys[0], w, -1, 1, null, xm - xs[7] - 1.15 * E - 0.9 * E);
    // le premier tour part de la sortie du cabestan et descend devant les trois perches
    const s0 = c.fin;
    const premier = [...bez(s0, [s0[0] - 0.6 * E, s0[1]], [xs[7], s0[1]], [xs[7], s0[1] + 0.9 * E], 8), ...droite([xs[7], s0[1] + 0.9 * E], [xs[7], bas], 12).slice(1)];
    for (let i = 0; i < 7; i++) out.push(tube(droite([xs[i], haut], [xs[i], bas], 12)), cap([xs[i], haut], [0, -1]), cap([xs[i], bas], [0, 1]));
    out.push(c.svg, tube(premier), cap([xs[7], bas], [0, 1]));
    // le bout libre du cabestan (l'entrée), à droite
    out.push(libre([c.debut[0] - 0.6 * E, c.debut[1]], c.debut), cap(c.debut, [-1, 0]).length ? '' : '');
    return { svg: out.join('\n'), c };
  };
  // les frappes : deux tours dans chaque écart, en travers des huit tours, puis l'arrêt sur la perche du milieu
  const frappes = z => {
    const { ys, xs } = geo(z), out = [], w = W / 2;
    const xg = xs[0] - 0.95 * E, xd = xs[7] + 0.95 * E;
    const ecarts = [(ys[0] + ys[1]) / 2, (ys[1] + ys[2]) / 2];
    ecarts.forEach((ye, j) => [-0.53, 0.53].forEach((k, i) => {
      const y = ye + k * E;
      const der = j === 1 && i === 1;
      out.push(tube(droite([xg, y], [xd, y], 12)), cap([xd, y], [1, 0]));
      if (!der) out.push(cap([xg, y], [-1, 0]));
    }));
    // l'arrêt : la dernière frappe ressort à gauche et monte sur la perche du milieu, côté tête (à gauche)
    const y = ecarts[1] + 0.53 * E, xm = xg - 3.4 * E;
    const c = cabestan(xm, ys[1], w, -1, -1, [[xg, y]], 2.2 * E);
    out.push(c.svg, libre(c.avantFin, c.fin));
    return { svg: out.join('\n'), c, ecarts, xg, xd };
  };

  // l'écart d'une demi-épaisseur, coté dans l'écart du haut, à gauche des tours
  const coteEcart = z => {
    const { ys, xs } = geo(z), x = xs[0] - 4.6 * E;
    return h.cote(x, ys[0] + W / 2, x, ys[1] - W / 2, '½ ép.', { cote: 'droite' });
  };

  // ─── 1. la mise en place, de dessus : la perche du milieu tête-bêche, les têtes sur un billot ───
  const geo1 = z => {
    const cy = z.h * 0.5, w = 9, g = w;                       // demi-diamètre au gros bout ; écart d'une demi-épaisseur
    const xm = z.l * 0.5;                                    // les marques de brêlage, alignées
    const ys = [cy - 2 * w - g, cy, cy + 2 * w + g];
    return { cy, w, g, xm, ys, a0: 14, a1: xm + 60, b0: xm - 60, b1: z.l - 14, xbil: xm + 34 };
  };
  const miseEnPlace = z => {
    const { w, xm, ys, a0, a1, b0, b1, xbil } = geo1(z), out = [];
    // le billot sous les têtes
    out.push(perche([xbil, ys[0] - 2 * w - 10], [xbil, ys[2] + 2 * w + 10], 26, 26, ['coupe', 'coupe'], false));
    out.push(perche([a0, ys[0]], [a1, ys[0]], 2.3 * w, 1.6 * w, ['coupe', 'coupe']));
    out.push(perche([b1, ys[1]], [b0, ys[1]], 2.3 * w, 1.6 * w, ['coupe', 'coupe']));
    out.push(perche([a0, ys[2]], [a1, ys[2]], 2.3 * w, 1.6 * w, ['coupe', 'coupe']));
    // les marques de brêlage, un trait de charbon en travers de chacune, alignées
    for (const y of ys) out.push(h.ligne(xm, y - 0.7 * w, xm, y + 0.7 * w, 'fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round"'));
    return out.join('\n');
  };

  // ─── 4. dressé, de côté : les pattes écartées tendent le lien ───
  const geo4 = z => {
    const sol = z.h - 30, top = 18, cx = z.l * 0.5, H = sol - top;
    const pieds = [[cx - 0.52 * H, sol], [cx + 0.52 * H, sol], [cx + 0.05 * H, sol + 10]];
    return { sol, cx, H, pieds, tete: [cx, top + 26] };
  };
  const dresse = z => {
    const { sol, H, pieds, tete } = geo4(z), out = [];
    out.push(h.rect(0, sol, z.l, z.h - sol - 2, h.a.hachure('terre', 'aucun')), h.ligne(0, sol, z.l, sol, h.a.arete));
    // chaque patte part de son pied, passe à la tête et la dépasse : au-dessus du lien, les trois
    // têtes se croisent (celle du milieu, tête-bêche, part de l'autre côté)
    const patte = (p, w1, w2, au) => {
      const d = [tete[0] - p[0], tete[1] - p[1]], L = Math.hypot(d[0], d[1]), u = [d[0] / L, d[1] / L];
      return perche(p, [tete[0] + u[0] * au, tete[1] + u[1] * au], w1, w2, ['coupe', 'coupe'], false);
    };
    // les piquets, chassés contre le pied de chaque patte, du côté du dehors
    for (const [p, k] of [[pieds[0], -1], [pieds[1], 1]]) {
      const x = p[0] + k * 14;
      out.push(h.path(`M ${f(x - 3)} ${f(sol - 14)} L ${f(x + 3)} ${f(sol - 14)} L ${f(x + 3)} ${f(sol + 10)} L ${f(x)} ${f(sol + 16)} L ${f(x - 3)} ${f(sol + 10)} Z`, h.a.arete.replace('fill="none"', 'fill="#FFFFFF"')));
    }
    out.push(patte(pieds[0], 16, 11, 30), patte(pieds[1], 16, 11, 30));
    out.push(patte(pieds[2], 17, 12, 34));
    // le lien serré autour du croisement : un manchon de tours, coupé des frappes
    const lw = 24, lh = 30, c = tete;
    out.push(h.path(`M ${f(c[0] - lw / 2)} ${f(c[1] - lh / 2)} Q ${f(c[0])} ${f(c[1] - lh / 2 + 5)} ${f(c[0] + lw / 2)} ${f(c[1] - lh / 2)} L ${f(c[0] + lw / 2)} ${f(c[1] + lh / 2)} Q ${f(c[0])} ${f(c[1] + lh / 2 + 5)} ${f(c[0] - lw / 2)} ${f(c[1] + lh / 2)} Z`, blanc('arete')));
    let d = '';
    for (let i = 1; i < 8; i++) { const y = c[1] - lh / 2 + i * lh / 8; d += `M ${f(c[0] - lw / 2 + 1)} ${f(y)} Q ${f(c[0])} ${f(y + 5)} ${f(c[0] + lw / 2 - 1)} ${f(y)} `; }
    out.push(h.path(d.trim(), h.a.detail));
    // les pieds reliés au ras du sol, d'un pied à l'autre
    out.push(tube([[pieds[0][0] + 9, sol - 5], [pieds[2][0] - 9, sol - 4]], 3.6), tube([[pieds[2][0] + 9, sol - 4], [pieds[1][0] - 9, sol - 5]], 3.6));
    // le geste : écarter les pattes jusqu'à ce que la corde du sol se tende
    out.push(h.geste(`M ${f(pieds[0][0] + 4)} ${f(sol - 30)} L ${f(pieds[0][0] - 28)} ${f(sol - 30)}`));
    out.push(h.geste(`M ${f(pieds[1][0] - 4)} ${f(sol - 30)} L ${f(pieds[1][0] + 28)} ${f(sol - 30)}`));
    out.push(h.cote(pieds[0][0], sol + 18, pieds[1][0], sol + 18, '½ à ⅔ de la longueur des pattes', { cote: 'dessous' }));
    return out.join('\n');
  };

  return {
    ref: '110-43',
    titre: 'Le brêlage de trépied',
    desc: 'Le brêlage de trépied, en quatre temps. Trois perches couchées côte à côte, celle du milieu tête-bêche, le gros bout de l’autre côté, les têtes sur un billot, les marques de brêlage alignées en travers des trois. De dessus, au même cadrage : un nœud de cabestan sur une perche du bord, du côté de sa tête, puis huit tours autour des trois perches, sans refermer l’écart d’une demi-épaisseur entre elles ; deux frappes dans chaque écart, en travers des tours, sans forcer, et un nœud de cabestan d’arrêt sur la perche du milieu. Dressé, de côté : les pattes écartées tendent le lien, les têtes se croisent au-dessus ; les pieds sont reliés par une corde au ras du sol, un piquet chassé contre chaque pied, l’écartement de la moitié aux deux tiers de la longueur des pattes.',
    format: 'pleine',
    disposition: [['mise'], ['tours', 'frappes'], ['dresse']],
    hauteurs: [0.6, 1, 1],
    vues: {
      mise: {
        titre: '1. Couchées, celle du milieu tête-bêche', dessin: miseEnPlace,
        renvois: z => {
          const { w, xm, ys, b1, xbil } = geo1(z);
          return [
            { n: 1, rond: [b1 - 40, ys[1] + 40], cible: [b1 - 60, ys[1] + 1.1 * w], texte: 'celle du milieu, gros bout de l’autre côté' },
            { n: 2, rond: [xm - 80, ys[0] - 22], cible: [xm - 2, ys[0] - 0.7 * w], texte: 'marques de brêlage alignées' },
            { n: 3, rond: [xbil + 64, ys[2] + 16], cible: [xbil + 13, ys[2] + 2 * w + 4], texte: 'les têtes sur un billot' },
          ];
        },
      },
      tours: {
        titre: '2. Un cabestan, puis huit tours', dessin: z => perches3(z) + '\n' + tours(z).svg + '\n' + coteEcart(z) + '\n' + h.controle(...tours(z).c.centre, 2.1 * E),
        renvois: z => {
          const { ys, xs, bas } = geo(z), c = tours(z).c;
          return [
            { n: 4, rond: [z.l - 18, ys[0] - W / 2 - 22], cible: [c.centre[0] + 1.2 * E, ys[0] - W / 2 - 2], texte: 'cabestan sur une perche du bord' },
            { n: 5, rond: [xs[1] - 30, bas + 18], cible: [xs[1], bas + 2], texte: 'huit tours, l’écart gardé' },
          ];
        },
      },
      frappes: {
        titre: '3. Deux frappes dans chaque écart', dessin: z => perches3(z) + '\n' + tours(z).svg + '\n' + frappes(z).svg + '\n' + h.controle(...frappes(z).c.centre, 2.1 * E),
        renvois: z => {
          const { ys, bas } = geo(z), fr = frappes(z);
          return [
            { n: 6, rond: [z.l - 18, fr.ecarts[0] + 30], cible: [fr.xd + 4, fr.ecarts[0] + 2], texte: 'deux frappes par écart, sans forcer' },
            { n: 7, rond: [24, ys[1] + 48], cible: [fr.c.centre[0] - 6, ys[1] + 10], texte: 'cabestan d’arrêt sur celle du milieu' },
          ];
        },
      },
      dresse: {
        titre: '4. Dressé : l’écartement tend le lien', dessin: dresse,
        renvois: z => {
          const { sol, pieds, tete } = geo4(z);
          return [
            { n: 8, rond: [tete[0] + 120, tete[1] - 4], cible: [tete[0] + 13, tete[1] - 4], texte: 'les pattes écartées tendent le lien' },
            { n: 9, rond: [pieds[1][0] + 70, sol - 48], cible: [pieds[1][0] - 40, sol - 5], texte: 'pieds reliés au ras du sol' },
            { n: 10, rond: [pieds[0][0] - 60, sol - 48], cible: [pieds[0][0] - 14, sol - 14], texte: 'un piquet contre chaque pied' },
          ];
        },
      },
    },
  };
};
