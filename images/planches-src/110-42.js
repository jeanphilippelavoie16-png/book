// Planche 110-42. Le brêlage diagonal (ch. 110, §9.5, points 21 et 22).
// Quatre temps au même cadrage, puis où va chacun sur un chevalet. Deux perches croisées en X
// (la jambe de force devant, l'autre derrière) : les diagonales du croisement sont alors
// l'horizontale et la verticale, et les tours se lisent en croix.
// La corde se peint par couches, de l'arrière vers l'avant (les tronçons qui passent derrière
// d'abord) : chaque croisement est franc, sans calcul de croisement.
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

  const S2 = Math.SQRT2;
  const R = 26, E = 8, S = E * 1.06;                  // demi-épaisseur des perches, corde, pas entre deux tours
  const RX = R * S2;                                  // de la croisée à la pointe d'une fourche
  const geo = z => ({ cx: Math.round(z.l * 0.5), cy: Math.round(z.h * 0.5), L: (z.h * 0.5 - R / S2 - 4) * S2 });
  const uF = [1 / S2, -1 / S2], uB = [1 / S2, 1 / S2];  // F devant : bas-gauche → haut-droite ; B derrière
  const perches = (z, quoi) => {
    const { cx, cy, L } = geo(z), u = quoi === 'F' ? uF : uB;
    return perche([cx - u[0] * L, cy - u[1] * L], [cx + u[0] * L, cy + u[1] * L], 2 * R, 2 * R, ['coupe', 'coupe']);
  };
  let nClip = 0;
  const horsDeF = (z, contenu) => {
    const { cx, cy, L } = geo(z), n = [-uF[1], uF[0]], id = `horsF-110-42-${++nClip}`;
    const c = [[-L - 5, -R], [L + 5, -R], [L + 5, R], [-L - 5, R]].map(([s, t]) => [cx + uF[0] * s + n[0] * t, cy + uF[1] * s + n[1] * t]);
    return `<clipPath id="${id}"><path fill="none" clip-rule="evenodd" d="M -50 -50 H ${z.l + 50} V ${z.h + 50} H -50 Z ${trace(c)} Z"/></clipPath>\n<g clip-path="url(#${id})">\n${contenu}\n</g>`;
  };
  // un tronçon de corde, bouts ouverts : il se raccorde au suivant sans couture
  const tube = (pts, e = E) => bande(pts, e, 'arete', false).svg;
  const cap = (q, d) => { const L = Math.hypot(d[0], d[1]); return tourne(q, [d[0] / L, d[1] / L], E); };
  // le bout libre : une coupe en travers et trois brins défaits
  const libre = (a, b, e = E) => {
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]), u = [(b[0] - a[0]) / L, (b[1] - a[1]) / L], n = [-u[1], u[0]];
    const o = [h.ligne(b[0] + n[0] * e / 2, b[1] + n[1] * e / 2, b[0] - n[0] * e / 2, b[1] - n[1] * e / 2, h.a.arete)];
    for (const k of [-0.28, 0, 0.28]) o.push(h.ligne(b[0] + n[0] * e * k, b[1] + n[1] * e * k, b[0] + n[0] * e * k * 1.5 + u[0] * e * 0.9, b[1] + n[1] * e * k * 1.5 + u[1] * e * 0.9, h.a.detail));
    return o.join('\n');
  };
  const bez = (p0, p1, p2, p3, n = 16) => Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n, u = 1 - t;
    return [u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0], u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1]];
  });
  const droite = (a, b, n = 6) => Array.from({ length: n + 1 }, (_, i) => [a[0] + (b[0] - a[0]) * i / n, a[1] + (b[1] - a[1]) * i / n]);

  // ─── un tour sur une diagonale ───
  // Avant les frappes, les tours sont parallèles et se touchent ; chacun finit au bord de la perche
  // où il passe derrière, sur le bord de la fourche. Les frappes les serrent dans la fourche.
  const tourDiag = (cx, cy, d, vertical, serre) => {
    const P = (a, b) => (vertical ? [cx + b, cy + a] : [cx + a, cy + b]);
    const A = serre ? RX + 0.15 * E : RX + Math.abs(d);
    const pts = serre
      ? [...bez(P(-A, 0.45 * d), P(-0.88 * RX, 0.8 * d), P(-0.68 * RX, d), P(-0.5 * RX, d), 8), ...droite(P(-0.5 * RX, d), P(0.5 * RX, d)).slice(1),
        ...bez(P(0.5 * RX, d), P(0.68 * RX, d), P(0.88 * RX, 0.8 * d), P(A, 0.45 * d), 8).slice(1)]
      : droite(P(-A, d), P(A, d), 10);
    const e0 = pts[0], e1 = pts[pts.length - 1];
    const dir = vertical ? [0, 1] : [1, 0];
    return { svg: tube(pts), caps: cap(e0, [-dir[0], -dir[1]]) + '\n' + cap(e1, dir) };
  };
  const jeu = (cx, cy, vertical, serre) => {
    // le tour du milieu d'abord, les deux autres par-dessus : serrés, ils se recouvrent dans la fourche
    const t = [0, -S, S].map(d => tourDiag(cx, cy, d, vertical, serre));
    return t.map(x => x.svg + '\n' + x.caps).join('\n');
  };

  // ─── le nœud de bûcheron, sur la diagonale verticale ───
  // Le dormant arrive d'en bas à gauche par-dessus F, entre dans la fourche du bas, monte devant
  // (le brin vertical) et passe derrière les deux perches par la fourche du haut. Le bout ressort de
  // la fourche du bas, à droite, et se tord trois fois autour du brin vertical en montant.
  const bucheron = (cx, cy) => {
    const yb = cy + RX, a = 0.78 * E, k = 1.7 * E;
    const dormant = [...bez([cx - 5.6 * E, yb + 5.2 * E], [cx - 3 * E, yb + 2.6 * E], [cx, yb + 1.6 * E], [cx, yb - 0.6 * E], 14),
      ...droite([cx, yb - 0.6 * E], [cx, cy - RX], 12).slice(1)];
    // la torsade : x = cx + a cos t ; devant quand sin t > 0
    const y0 = yb - 0.2 * E, t0 = -0.25, t1 = 4 * Math.PI + Math.PI * 0.92;
    const hel = [];
    for (let i = 0; i <= 120; i++) { const t = t0 + (t1 - t0) * i / 120; hel.push({ p: [cx + a * Math.cos(t), y0 - k * (t - t0) / (2 * Math.PI)], av: Math.sin(t) > 0 }); }
    const runs = [];
    hel.forEach((q, i) => { if (!i || q.av !== hel[i - 1].av) runs.push({ av: q.av, pts: i ? [hel[i - 1].p] : [] }); runs[runs.length - 1].pts.push(q.p); });
    const fin = hel[hel.length - 1].p;
    const queue = bez(fin, [fin[0] - 0.8 * E, fin[1] - 0.35 * E], [fin[0] - 1.8 * E, fin[1] - 0.4 * E], [fin[0] - 2.6 * E, fin[1] - 0.2 * E], 8);
    // l'entrée du bout : il sort de derrière, dans la fourche du bas, à droite du dormant
    const entree = bez([cx + 1.15 * E, yb + 1.1 * E], [cx + 1.2 * E, yb + 0.5 * E], [cx + a + 0.2 * E, y0 + 0.4 * E], hel[0].p, 6);
    const derriere = runs.filter(r => !r.av).map(r => tube(r.pts)).join('\n');
    const devant = runs.filter(r => r.av).map(r => tube(r.pts)).join('\n');
    const svg = [tube(entree), derriere, tube(dormant), cap([cx, cy - RX], [0, -1]), devant, tube(queue), libre(queue[queue.length - 2], queue[queue.length - 1]),
      cap([cx + 1.15 * E, yb + 1.1 * E], [0.15, 1])].join('\n');
    return { svg, tire: [[cx - 2.6 * E, yb + 2.6 * E], [cx - 5.6 * E, yb + 5.2 * E]], torsade: [cx, y0 - k * 1.2], dormant: [cx - 4 * E, yb + 3.8 * E] };
  };

  // ─── les frappes, puis l'arrêt ───
  // Deux tours entre les perches, autour du paquet : devant B, derrière F, et par-dessus les coudes
  // des tours au fond de chaque fourche. Le bout file sur le bras haut-gauche de B et l'arrête d'un
  // nœud de cabestan.
  const RHO = RX + 0.35 * E;
  const arc = (cx, cy, rho, a0, a1) => { const o = [], n = Math.ceil(Math.abs(a1 - a0) / 5);
    for (let i = 0; i <= n; i++) { const a = (a0 + (a1 - a0) * i / n) * Math.PI / 180; o.push([cx + rho * Math.cos(a), cy + rho * Math.sin(a)]); } return o; };
  const dB = [-1 / S2, -1 / S2], vB = [1 / S2, -1 / S2];
  const arret = (cx, cy) => {
    const G = ([x, y]) => [cx + dB[0] * x + vB[0] * y, cy + dB[1] * x + vB[1] * y];
    const V = ([x, y]) => [dB[0] * x + vB[0] * y, dB[1] * x + vB[1] * y];
    const e = E, q = 0.7 * e, dH = 0.4 * R, yT = -R, yB = R;
    const xs = RHO + 1.3 * S, xa = xs + 1.6 * e, xb = xa + 2.2 * e;
    const lisse = pts => { const o = [pts[0]]; for (let i = 1; i < pts.length; i++) o.push(...droite(pts[i - 1], pts[i], 4).slice(1)); return o; };
    // la fin de la deuxième frappe arrive sur le bras (y négatif : le bord du dessus)
    const p1 = [[RHO + 0.3 * S, yT - 0.55 * e], [xs - 0.5 * e, yT - 0.5 * e], [xs, yT + 1], [xs, dH - q], [xs + q, dH], [xb - q, dH], [xb, dH + q], [xb, yB]];
    const p2 = [[xb, yT], [(xa + xb) / 2, 0], [xa, yB]];
    const p3 = [[xa, yT], [xa, -dH - q], [xa + q, -dH], [xb + 2.6 * e, -dH + 0.5]];
    const dessous = [tube(lisse(p1).map(G)), tube(lisse(p3).map(G))].join('\n');
    const dessus = tube(lisse(p2).map(G));
    const caps = [[[xb, yB], [0, 1]], [[xb, yT], [0, -1]], [[xa, yB], [0, 1]], [[xa, yT], [0, -1]]].map(([q0, d]) => cap(G(q0), V(d))).join('\n');
    const fin = lisse(p3).map(G);
    return { svg: [dessous, dessus, caps, libre(fin[fin.length - 2], fin[fin.length - 1])].join('\n'), centre: G([(xa + xb) / 2, 0]), entree: G([RHO + 0.3 * S, yT - 0.55 * e]) };
  };

  const tireGeste = (a, c, k = 1) => {
    const L = Math.hypot(c[0] - a[0], c[1] - a[1]), u = [(c[0] - a[0]) / L, (c[1] - a[1]) / L], n = [-u[1], u[0]];
    const o0 = [a[0] + u[0] * L * 0.1 + n[0] * 15 * k, a[1] + u[1] * L * 0.1 + n[1] * 15 * k];
    return h.geste(`M${f(o0[0])} ${f(o0[1])} L${f(o0[0] + u[0] * L * 0.9)} ${f(o0[1] + u[1] * L * 0.9)}`);
  };

  const temps = (z, etape) => {
    const { cx, cy } = geo(z), out = [], g = { cx, cy };
    const nt = { bucheron: 1, tours: 2, travers: 3, arret: 4 }[etape], serre = nt >= 4;
    out.push(perches(z, 'B'));
    let frap = '';
    if (serre) {
      const a = arret(cx, cy);
      const f1 = arc(cx, cy, RHO, -45, 315), f2 = [...arc(cx, cy, RHO + S, -45, 223), a.entree];
      frap = tube(f1) + '\n' + tube(f2);
      out.push(frap);
      g.arret = a;
    }
    out.push(perches(z, 'F'));
    const b = bucheron(cx, cy);
    out.push(b.svg);
    if (nt >= 2) out.push(jeu(cx, cy, false, serre));
    if (nt >= 3) out.push(jeu(cx, cy, true, serre));
    if (serre) {
      out.push(horsDeF(z, frap));
      out.push(g.arret.svg);
      out.push(h.controle(g.arret.centre[0], g.arret.centre[1], 2.3 * E));
    }
    if (nt === 1) out.push(tireGeste(b.tire[0], b.tire[1], -1));
    g.b = b;
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
