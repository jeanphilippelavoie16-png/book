// Planche 110-42. Le brêlage diagonal (ch. 110, §9.5, points 21 et 22).
// Quatre temps au même cadrage, puis où va chacun sur un chevalet. Deux perches croisées en X
// (la jambe de force devant, l'autre derrière) : les diagonales du croisement sont alors
// l'horizontale et la verticale, et les tours se lisent en croix.
// Le trajet : Scouting Resources, « Diagonal Lashing », et ScoutPioneering, « Traditional
// Diagonal Lashing » (sources/110-brelages-droit-diagonal-trepied.md) : un nœud de bûcheron autour
// des deux perches, sur une diagonale, qui les serre l'une contre l'autre ; trois tours sur l'autre
// diagonale ; trois tours en travers des premiers ; deux ou trois frappes entre les perches ; un
// nœud de cabestan d'arrêt sur une perche. Aucune cote : le chapitre n'en donne pas.
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

  const F = h.formes, S2 = Math.SQRT2;
  const R = 30, E = 8.5, PAS = E * 1.5;            // demi-épaisseur des perches, corde
  const RX = R * S2;                                // demi-largeur d'une perche à 45°, mesurée à l'horizontale
  const geo = z => ({ cx: Math.round(z.l * 0.5), cy: Math.round(z.h * 0.5), L: (z.h * 0.5 - R / S2 - 10) * S2 });
  const uF = [1 / S2, -1 / S2], uB = [1 / S2, 1 / S2];  // F devant : bas-gauche → haut-droite ; B derrière
  const perches = (z, quoi) => {
    const { cx, cy, L } = geo(z), u = quoi === 'F' ? uF : uB;
    return perche([cx - u[0] * L, cy - u[1] * L], [cx + u[0] * L, cy + u[1] * L], 2 * R, 2 * R, ['rompu', 'rompu']);
  };
  // la silhouette de F, pour cacher les frappes qui passent derrière elle
  let nClip = 0;
  const horsDeF = (z, contenu) => {
    const { cx, cy, L } = geo(z), n = [-uF[1], uF[0]], id = `horsF-110-42-${++nClip}`;
    const c = [[-L, -R], [L, -R], [L, R], [-L, R]].map(([s, t]) => [cx + uF[0] * s + n[0] * t, cy + uF[1] * s + n[1] * t]);
    return `<clipPath id="${id}"><path fill="none" clip-rule="evenodd" d="M -50 -50 H ${z.l + 50} V ${z.h + 50} H -50 Z ${trace(c)} Z"/></clipPath>\n<g clip-path="url(#${id})">\n${contenu}\n</g>`;
  };
  const ouv = { ep: E, debut: 'ouvert', fin: 'ouvert' };
  const ligneH = (cx, y, X, zz) => { const o = []; for (let i = 0; i <= 8; i++) o.push([cx - X + 2 * X * i / 8, y, zz]); return o; };
  const ligneV = (x, cy, X, zz) => { const o = []; for (let i = 0; i <= 8; i++) o.push([x, cy - X + 2 * X * i / 8, zz]); return o; };

  // Un tour sur une diagonale : parallèle aux autres devant le croisement, il se resserre dans les
  // deux fourches où il passe derrière (les tours d'un même jeu s'y rejoignent).
  const tourDiag = (cx, cy, d, vertical, zz) => {
    const P = (a, b) => (vertical ? [cx + b, cy + a, zz] : [cx + a, cy + b, zz]);
    const A = RX + 0.25 * E;
    return [P(-A, 0.45 * d), P(-0.7 * RX, 0.85 * d), P(-0.3 * RX, d), P(0.3 * RX, d), P(0.7 * RX, 0.85 * d), P(A, 0.45 * d)];
  };
  const capsDiag = (cx, cy, d, vertical) => {
    const A = RX + 0.25 * E;
    return vertical ? [[[cx + 0.45 * d, cy - A], [0, -1]], [[cx + 0.45 * d, cy + A], [0, 1]]] : [[[cx - A, cy + 0.45 * d], [-1, 0]], [[cx + A, cy + 0.45 * d], [1, 0]]];
  };

  // ─── le nœud de bûcheron : sur la diagonale verticale ───
  // Le dormant arrive d'en bas à gauche, entre dans la fourche du bas, monte devant (le brin
  // vertical), passe derrière par la fourche du haut, redescend derrière et ressort dans la fourche
  // du bas : le bout fait le tour du dormant, puis se tord trois fois autour du brin, en montant.
  const bucheron = (cx, cy) => {
    const yb = cy + RX, brins = [], caps = [];
    brins.push({ pts: [[cx - 4.2 * E, yb + 4.6 * E, 0], [cx - 1.9 * E, yb + 2.4 * E, 0], [cx - 0.35 * E, yb + 0.5 * E, 0], ...tourDiag(cx, cy, 0, true, 0).reverse().slice(1)],
      ep: E, debut: 'fixe', fin: 'ouvert' });
    caps.push(...capsDiag(cx, cy, 0, true).slice(0, 1));
    // le bout : il ressort de la fourche du bas, à droite, passe derrière le dormant, puis se tord
    // autour du brin vertical : devant, derrière, devant, et il sort libre en haut à gauche
    const k = 1.25 * E, a = 0.8 * E;
    const y0 = cy + 1.3 * k;
    const hel = [[cx + 1.1 * E, yb + 0.45 * E, -1], [cx + 1.3 * E, y0 + 0.9 * k, -1], [cx + a, y0, -1],
      [cx, y0 - 0.5 * k, 1], [cx - a, y0 - k, 1], [cx - 1.05 * a, y0 - 1.25 * k, -1],
      [cx, y0 - 1.5 * k, -1], [cx + a, y0 - 2 * k, -1], [cx + 1.05 * a, y0 - 2.25 * k, -1],
      [cx, y0 - 2.5 * k, 1], [cx - a, y0 - 3 * k, 1], [cx - 1.05 * a, y0 - 3.25 * k, -1],
      [cx, y0 - 3.5 * k, -1], [cx + a, y0 - 4 * k, -1], [cx + 1.6 * E, y0 - 4.4 * k, -1], [cx + 2.6 * E, y0 - 4.6 * k, -1]];
    brins.push({ pts: hel, ep: E, debut: 'ouvert', fin: 'libre' });
    caps.push([[cx + 1.1 * E, yb + 0.45 * E], [0.3, 1]]);
    return { brins, caps, tire: [[cx - 1.9 * E, yb + 2.4 * E], [cx - 4.2 * E, yb + 4.6 * E]], tors: [cx, y0 - 2 * k] };
  };
  const D = [-PAS, 0, PAS];
  const toursH = (cx, cy) => ({ brins: D.map(d => ({ pts: tourDiag(cx, cy, d, false, 2), ...ouv })), caps: D.flatMap(d => capsDiag(cx, cy, d, false)) });
  const toursV = (cx, cy) => ({ brins: D.map(d => ({ pts: tourDiag(cx, cy, d, true, 3), ...ouv })), caps: D.flatMap(d => capsDiag(cx, cy, d, true)) });

  // ─── les frappes : deux tours entre les perches, autour du paquet ; puis l'arrêt ───
  // Un cercle autour du croisement : il passe devant B, derrière F, et par-dessus les coudes
  // des tours dans les quatre fourches.
  const RHO = RX + 0.55 * E;
  const cercle = (cx, cy, rho, a0, a1, zz) => { const o = []; const n = Math.ceil(Math.abs(a1 - a0) / 8);
    for (let i = 0; i <= n; i++) { const a = (a0 + (a1 - a0) * i / n) * Math.PI / 180; o.push([cx + rho * Math.cos(a), cy + rho * Math.sin(a), zz]); } return o; };
  // l'arrêt : un cabestan sur le bras haut-gauche de B, en coordonnées du bras (x le long, y en travers)
  const dB = [-1 / S2, -1 / S2], vB = [1 / S2, -1 / S2];
  const arret = (cx, cy) => {
    const G = ([x, y, zz]) => [cx + dB[0] * x + vB[0] * y, cy + dB[1] * x + vB[1] * y, zz];
    const V = ([x, y]) => [dB[0] * x + vB[0] * y, dB[1] * x + vB[1] * y];
    const e = E, q = 0.7 * e, dH = 0.2 * 2 * R, yT = -R, yB = R;
    const xs = RHO + PAS + 0.6 * e, xa = xs + 1.7 * e, xb = xa + 2.3 * e, dd = xb - xa;
    const pts1 = [[RHO + PAS, yT - 0.2 * e, 0], [xs - 0.6 * e, yT - 0.9 * e, 0], [xs, yT + 2, 0], [xs, dH - q, 0], [xs + 0.3 * q, dH - 0.3 * q, 0], [xs + q, dH, 0],
      [xb - q, dH, 0], [xb - 0.3 * q, dH + 0.3 * q, 0], [xb, dH + q, 0], [xb, yB, 0]];
    const pts2 = [[xb, yT, 1], [xb - 0.06 * dd, yT + 0.14 * 2 * R, 1], [(xa + xb) / 2, 0, 1], [xa + 0.06 * dd, yB - 0.14 * 2 * R, 1], [xa, yB, 1]];
    const pts3 = [[xa, yT, 0], [xa, -dH - q, 0], [xa + 0.3 * q, -dH - 0.3 * q, 0], [xa + q, -dH, 0], [xb + 3 * e, -dH + 0.6, 0]];
    return {
      brins: [{ pts: pts1.map(G), ...ouv }, { pts: pts2.map(G), ...ouv }, { pts: pts3.map(G), ep: e, debut: 'ouvert', fin: 'libre' }],
      caps: [[[xb, yB], [0, 1]], [[xb, yT], [0, -1]], [[xa, yB], [0, 1]], [[xa, yT], [0, -1]]].map(([q0, d]) => [G([...q0, 0]).slice(0, 2), V(d)]),
      centre: G([(xa + xb) / 2, 0, 0]).slice(0, 2),
      entree: G([RHO + PAS, yT - 0.2 * e, 0]).slice(0, 2),
    };
  };

  const capsSvg = caps => caps.map(([q, d]) => { const L = Math.hypot(d[0], d[1]); return tourne(q, [d[0] / L, d[1] / L], E); }).join('\n');
  const tireGeste = (a, c, k = 1) => {
    const L = Math.hypot(c[0] - a[0], c[1] - a[1]), u = [(c[0] - a[0]) / L, (c[1] - a[1]) / L], n = [-u[1], u[0]];
    const o0 = [a[0] + u[0] * L * 0.1 + n[0] * 15 * k, a[1] + u[1] * L * 0.1 + n[1] * 15 * k];
    return h.geste(`M${f(o0[0])} ${f(o0[1])} L${f(o0[0] + u[0] * L * 0.9)} ${f(o0[1] + u[1] * L * 0.9)}`);
  };

  const temps = (z, etape) => {
    const { cx, cy } = geo(z), out = [], g = {};
    const nt = { bucheron: 1, tours: 2, travers: 3, arret: 4 }[etape];
    out.push(perches(z, 'B'));
    // les frappes : un premier passage complet (F le cachera), puis ce qui passe hors de F
    let frap = '';
    if (nt >= 4) {
      const a = arret(cx, cy);
      const f1 = cercle(cx, cy, RHO, -45, 315, 0.5), f2 = cercle(cx, cy, RHO + PAS, -45, 225, 0.5);
      f2.push([a.entree[0], a.entree[1], 0.5]);
      frap = F.cordes([{ pts: f1, ...ouv }, { pts: f2, ...ouv }], { trait: 'arete' });
      out.push(frap);
      g.arret = a;
    }
    out.push(perches(z, 'F'));
    const b = bucheron(cx, cy), brins = [...b.brins], caps = [...b.caps];
    if (nt >= 2) { const t = toursH(cx, cy); brins.push(...t.brins); caps.push(...t.caps); }
    if (nt >= 3) { const t = toursV(cx, cy); brins.push(...t.brins); caps.push(...t.caps); }
    out.push(F.cordes(brins, { trait: 'arete' }), capsSvg(caps));
    if (nt >= 4) {
      out.push(horsDeF(z, frap));
      out.push(F.cordes(g.arret.brins, { trait: 'arete' }), capsSvg(g.arret.caps));
      out.push(h.controle(g.arret.centre[0], g.arret.centre[1], 2.4 * E));
    }
    if (nt === 1) out.push(tireGeste(b.tire[0], b.tire[1], -1));
    g.b = b; g.cx = cx; g.cy = cy;
    return { svg: out.join('\n'), g };
  };

  return {
    ref: '110-42',
    titre: 'Le brêlage diagonal',
    desc: '',
    format: 'pleine',
    disposition: [['bucheron', 'tours'], ['travers', 'arret'], ['ou']],
    hauteurs: [1, 1, 0.8],
    vues: {
      bucheron: { titre: '1. Le nœud de bûcheron serre les perches', dessin: z => temps(z, 'bucheron').svg, renvois: z => [] },
      tours: { titre: '2. Trois tours sur l’autre diagonale', dessin: z => temps(z, 'tours').svg, renvois: z => [] },
      travers: { titre: '3. Trois tours en travers des premiers', dessin: z => temps(z, 'travers').svg, renvois: z => [] },
      arret: { titre: '4. Les frappes, puis l’arrêt', dessin: z => temps(z, 'arret').svg, renvois: z => [] },
      ou: { titre: 'Où va chacun', dessin: z => '', renvois: z => [] },
    },
  };
};
