// Planche 110-42. Le brêlage diagonal (ch. 110, §9.5, points 21 et 22).
// Quatre temps au même cadrage que le brêlage droit (110-41) : le montant derrière, la traverse
// devant. Les tours passent en travers de l'angle, sur les diagonales du croisement : ils se lisent
// en X, là où ceux du brêlage droit se lisent en carré. Puis où va chacun sur un chevalet.
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
  const WV = 60, WT = 54, E = 10, S = E * 1.06;        // perches (montant, traverse), corde, pas entre deux tours
  const wv = WV / 2, wt = WT / 2;
  const geo = z => ({ cx: Math.round(z.l * 0.4), cy: Math.round(z.h * 0.47) });
  const u1 = [1 / S2, 1 / S2], u2 = [1 / S2, -1 / S2];        // u1 : haut-gauche → bas-droite ; u2 : bas-gauche → haut-droite
  const nrm = u => [-u[1], u[0]];
  const dansCroix = (q, cx, cy) => Math.abs(q[0] - cx) <= wv || Math.abs(q[1] - cy) <= wt;
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

  // ─── un tour sur une diagonale : il couvre la croix et finit au bord de la fourche ───
  const sortie = (c, u, sens) => { let s = 0; while (s < 400) { const q = [c[0] + u[0] * s * sens, c[1] + u[1] * s * sens]; if (!dansCroix(q, ...c0)) return s; s += 0.5; } return s; };
  let c0 = [0, 0];
  const tourDiag = (cx, cy, u, d) => {
    c0 = [cx, cy];
    const n = nrm(u), c = [cx + n[0] * d, cy + n[1] * d];
    const sa = sortie(c, u, -1), sb = sortie(c, u, 1);
    const A = [c[0] - u[0] * sa, c[1] - u[1] * sa], B = [c[0] + u[0] * sb, c[1] + u[1] * sb];
    return { svg: tube(droite(A, B, 12)), caps: cap(A, [-u[0], -u[1]]) + '\n' + cap(B, u), A, B };
  };
  const jeu = (cx, cy, u) => [0, -S, S].map(d => tourDiag(cx, cy, u, d));

  // ─── le nœud de bûcheron, sur la diagonale u1 ───
  // Le dormant arrive par la fourche du bas à droite, passe devant la traverse et file derrière le
  // montant par la fourche du haut à gauche. Le bout ressort de la fourche du bas, à côté du
  // dormant, et se tord trois fois autour de lui en remontant.
  const bucheron = (cx, cy, entier) => {
    const t0 = tourDiag(cx, cy, u1, 0), n = nrm(u1), A = t0.A, B = t0.B;   // A : haut-gauche, B : bas-droite
    const along = (s, o) => [B[0] - u1[0] * s + n[0] * o, B[1] - u1[1] * s + n[1] * o];
    const dehors = [B[0] + u1[0] * 5.5 * E, B[1] + u1[1] * 5.5 * E];
    const out = [];
    // le bout ressort de derrière le montant, dans la fourche du bas à droite, côté +n du dormant
    const s0 = 0.5 * E, k = 1.25 * E, a = 1.0 * E, N = 3;
    const e0 = along(-0.2 * E, a + 0.3 * E);
    out.push(tube(bez(e0, along(0.1 * E, a + 0.2 * E), along(s0 - 0.2 * E, a + 0.1 * E), along(s0, a), 6)));
    out.push(cap(e0, [u1[0] * 0.8 + n[0] * 0.6, u1[1] * 0.8 + n[1] * 0.6]));
    // le dormant (le brin devant la traverse), puis la torsade par-dessus : trois passages devant,
    // chacun en travers du dormant, de +n vers −n en remontant ; derrière, il revient de −n à +n.
    out.push(tube(droite(B, A, 14)), cap(A, [-u1[0], -u1[1]]));
    if (entier) out.push(h.formes.cordes([{ pts: droite(B, dehors, 8).map(q => [q[0], q[1], 0]), ep: E, debut: 'ouvert', fin: 'fixe' }], { trait: 'arete' }).toString());
    else out.push(cap(B, u1));
    let fin = null;
    for (let i = 0; i < N; i++) {
      const sa = s0 + i * k, sb = sa + 0.5 * k;
      const q0 = along(sa, a), q1 = along(sb, -a);
      out.push(tube(bez(q0, along(sa + 0.12 * k, 0.4 * a), along(sb - 0.12 * k, -0.4 * a), q1, 10)));
      out.push(cap(q0, [n[0] - u1[0] * 0.5, n[1] - u1[1] * 0.5]));
      if (i < N - 1) out.push(cap(q1, [-n[0] - u1[0] * 0.5, -n[1] - u1[1] * 0.5]));
      fin = q1;
    }
    // le bout libre, après le dernier passage
    const queue = bez(fin, along(s0 + (N - 0.5) * k + 0.4 * E, -a - 0.5 * E), along(s0 + (N - 0.5) * k + 0.9 * E, -a - 1.3 * E), along(s0 + (N - 0.5) * k + 1.1 * E, -a - 2.2 * E), 8);
    out.push(tube(queue), libre(queue[queue.length - 2], queue[queue.length - 1]));
    return { svg: out.join('\n'), tire: [[B[0] + u1[0] * 1.5 * E, B[1] + u1[1] * 1.5 * E], dehors], torsade: along(s0 + k, 0), A, B };
  };

  // ─── les frappes, puis l'arrêt sur la traverse ───
  // Deux tours entre les perches, autour du paquet : devant le montant, derrière la traverse, et
  // par-dessus les bouts des tours au fond des quatre fourches. Le bout file sur la traverse, à
  // droite, et l'arrête d'un nœud de cabestan (le même qu'au brêlage droit).
  let nClip = 0;
  const horsDeT = (z, cy, contenu) => {
    const id = `horsT-110-42-${++nClip}`;
    return `<clipPath id="${id}"><path fill="none" clip-rule="evenodd" d="M -50 -50 H ${z.l + 50} V ${z.h + 50} H -50 Z M -50 ${f(cy - wt)} H ${z.l + 50} V ${f(cy + wt)} H -50 Z"/></clipPath>\n<g clip-path="url(#${id})">\n${contenu}\n</g>`;
  };
  const anneau = (cx, cy, rho, a0, a1) => { const o = [], n = Math.ceil(Math.abs(a1 - a0) / 5);
    for (let i = 0; i <= n; i++) { const a = (a0 + (a1 - a0) * i / n) * Math.PI / 180; o.push([cx + rho * Math.cos(a), cy + rho * Math.sin(a)]); } return o; };
  const RHO = Math.hypot(wv, wt) + S + 0.5 * E;
  const arret = (cx, cy) => {
    const q = 0.7 * E, dH = 0.2 * WT, yT = cy - wt, yB = cy + wt;
    const xs = cx + RHO + S + 1.4 * E, xa = xs + 1.8 * E, xb = xa + 2.4 * E;
    const depart = anneau(cx, cy, RHO + S, 180, 360 - 32);
    const d0 = depart[depart.length - 1];
    const p1 = [...depart, ...arrondi([d0, [xs - 0.6 * E, yT - 0.9 * E], [xs, yT + 1], [xs, cy + dH], [xb, cy + dH], [xb, yB]], 0.9 * E).slice(1)];
    const p2 = droite([xb, yT], [xa, yB], 8);
    const p3 = arrondi([[xa, yT], [xa, cy - dH], [xb + 2.8 * E, cy - dH]], 0.9 * E);
    const p1c = p1.slice(depart.length - 1);
    const svg = [tube(p1c), tube(p3), libre(p3[p3.length - 2], p3[p3.length - 1]), tube(p2),
      cap([xb, yB], [0, 1]), cap([xb, yT], [0, -1]), cap([xa, yB], [0, 1]), cap([xa, yT], [0, -1])].join('\n');
    return { avant: tube(depart), svg, centre: [(xa + xb) / 2, cy], xa, xb };
  };

  const tireGeste = (a, c, k = 1) => {
    const L = Math.hypot(c[0] - a[0], c[1] - a[1]), u = [(c[0] - a[0]) / L, (c[1] - a[1]) / L], n = [-u[1], u[0]];
    const o0 = [a[0] + u[0] * L * 0.15 + n[0] * 15 * k, a[1] + u[1] * L * 0.15 + n[1] * 15 * k];
    return h.geste(`M${f(o0[0])} ${f(o0[1])} L${f(o0[0] + u[0] * L * 0.85)} ${f(o0[1] + u[1] * L * 0.85)}`);
  };
  // le bout qui continue : un tronçon qui ressort de derrière, et sa flèche
  // l'amorce du tour suivant : un tronçon qui finit en cassure (la corde continue), et le sens de marche
  const amorce = pts => h.formes.cordes([{ pts: pts.map(p => [p[0], p[1], 5]), ep: E, debut: 'ouvert', fin: 'fixe', fleche: { de: 0.2, a: 0.95, cote: 'gauche' } }], { trait: 'arete' });

  const temps = (z, etape) => {
    const { cx, cy } = geo(z), out = [], g = { cx, cy };
    const nt = { bucheron: 1, tours: 2, travers: 3, arret: 4 }[etape];
    out.push(perche([cx, 4], [cx, z.h - 4], WV, WV * 1.04, ['rompu', 'rompu']));
    let frap = '', ar = null;
    if (nt >= 4) {
      ar = arret(cx, cy);
      frap = tube(anneau(cx, cy, RHO, 180, 540)) + '\n' + ar.avant;
      out.push(frap);
    }
    out.push(perche([10, cy], [z.l - 10, cy], WT, WT, ['rompu', 'rompu']));
    const b = bucheron(cx, cy, nt === 1);
    out.push(b.svg);
    let j2 = null, j1 = null;
    if (nt >= 2) { j2 = jeu(cx, cy, u2); out.push(j2.map(t => t.svg + '\n' + t.caps).join('\n')); }
    if (nt >= 3) { j1 = jeu(cx, cy, u1); out.push(j1.map(t => t.svg + '\n' + t.caps).join('\n')); }
    if (nt === 2) {
      // le bout ressort de derrière le montant, dans la fourche du haut à gauche, et part en travers
      const t = tourDiag(cx, cy, u1, -S), A = t.A;
      out.push(cap(A, [-u1[0], -u1[1]]), amorce(droite(A, [A[0] + u1[0] * 3.2 * E, A[1] + u1[1] * 3.2 * E], 8)));
    }
    if (nt === 3) {
      // le bout ressort dans la fourche du bas à gauche et commence les frappes, devant le montant
      const r0 = RHO, pts = anneau(cx, cy, r0, 160, 112);
      out.push(cap(pts[0], [-Math.sin(160 * Math.PI / 180), Math.cos(160 * Math.PI / 180)].map(v => -v)), amorce(pts));
    }
    if (nt >= 4) {
      out.push(horsDeT(z, cy, frap));
      out.push(ar.svg);
      out.push(h.controle(ar.centre[0], ar.centre[1], 2.6 * E));
    }
    if (nt === 1) out.push(tireGeste(b.tire[0], b.tire[1], 1));
    Object.assign(g, { b, j1, j2, ar });
    return { svg: out.join('\n'), g };
  };

  // ─── Où va chacun : un cadre de perches, le brêlage droit aux coins, le diagonal au croisement ───
  const geoOu = z => {
    const x0 = z.l * 0.24, x1 = z.l * 0.62, yH = 26, yB = z.h - 34, w = 12;
    const bh = yH + 26, bb = yB - 22;                              // les bouts des jambes de force sur les montants
    const X = [(x0 + x1) / 2, (bh + bb) / 2];
    return { x0, x1, yH, yB, w, bh, bb, X };
  };
  const ou = z => {
    const { x0, x1, yH, yB, w, bh, bb, X } = geoOu(z), out = [], e = 3.6;
    const tb = (pts) => bande(pts, e, 'detail', false).svg;
    out.push(perche([x0, 6], [x0, z.h - 6], 2 * w, 2 * w, ['coupe', 'coupe'], false), perche([x1, 6], [x1, z.h - 6], 2 * w, 2 * w, ['coupe', 'coupe'], false));
    out.push(perche([x0 - 34, yH], [x1 + 34, yH], 2 * w, 2 * w, ['coupe', 'coupe'], false), perche([x0 - 34, yB], [x1 + 34, yB], 2 * w, 2 * w, ['coupe', 'coupe'], false));
    // les jambes de force, en X : l'une derrière, l'autre devant
    out.push(perche([x0 - 6, bh - 8], [x1 + 6, bb + 8], 1.6 * w, 1.6 * w, ['coupe', 'coupe'], false));
    out.push(perche([x1 + 6, bh - 8], [x0 - 6, bb + 8], 1.6 * w, 1.6 * w, ['coupe', 'coupe'], false));
    // le brêlage droit, en petit, aux quatre coins : trois tours de chaque côté du montant
    for (const x of [x0, x1]) for (const y of [yH, yB]) {
      for (const sgn of [-1, 1]) for (let k = 0; k < 3; k++) {
        const xx = x + sgn * (w + 2.2 + k * e * 1.05);
        out.push(tb([[xx, y - w - 1], [xx, y + w + 1]]));
      }
    }
    // le brêlage diagonal, en petit, au croisement : trois tours sur chaque bissectrice
    const ang = Math.atan2(bb - bh, x1 - x0), b1 = [Math.cos(ang / 2 + Math.PI / 4 - Math.PI / 4), 0];
    const bis = [[1, 0], [0, 1]];
    for (const [bx, by] of bis) for (let k = -1; k <= 1; k++) {
      const nx = -by, ny = bx, L = bx ? 20 : 14;
      out.push(tb([[X[0] - bx * L + nx * k * e * 1.05, X[1] - by * L + ny * k * e * 1.05], [X[0] + bx * L + nx * k * e * 1.05, X[1] + by * L + ny * k * e * 1.05]]));
    }
    // la charge descend sur la traverse ; la poussée de côté couche le cadre : les jambes de force la tiennent
    out.push(h.fleche(`M ${f(x0 + 70)} ${f(yH - 22)} L ${f(x0 + 70)} ${f(yH - w - 3)}`));
    out.push(h.fleche(`M ${f(x0 - 54)} ${f(yH)} L ${f(x0 - 38)} ${f(yH)}`));
    return out.join('\n');
  };

  return {
    ref: '110-42',
    titre: 'Le brêlage diagonal',
    desc: 'Le brêlage diagonal lie deux perches croisées au même cadrage que le brêlage droit : le montant derrière, la traverse devant. Quatre temps : un nœud de bûcheron autour des deux perches, sur une diagonale du croisement, le bout tordu trois fois sur le brin, qu’on tire pour serrer les perches l’une contre l’autre ; trois tours sur l’autre diagonale, serrés l’un contre l’autre ; trois tours en travers des premiers, qui forment un X sur le croisement ; deux frappes entre les perches, devant le montant et derrière la traverse, par-dessus les tours au fond des fourches, et un nœud de cabestan d’arrêt sur la traverse. Dessous, un cadre de perches : le brêlage droit aux quatre coins, où la traverse porte la charge qui descend ; le brêlage diagonal au croisement des deux jambes de force en X, qui empêchent le cadre de se coucher en losange sous une poussée de côté.',
    format: 'pleine',
    disposition: [['bucheron', 'tours'], ['travers', 'arret'], ['ou']],
    hauteurs: [1, 1, 0.8],
    vues: {
      bucheron: {
        titre: '1. Le nœud de bûcheron serre les perches', dessin: z => temps(z, 'bucheron').svg,
        renvois: z => {
          const { g } = temps(z, 'bucheron');
          return [
            { n: 1, rond: [z.l - 20, 24], cible: [g.b.A[0] + 22, g.b.A[1] + 20], texte: 'autour des deux perches, en diagonale' },
            { n: 2, rond: [26, z.h - 30], cible: [g.b.torsade[0] - 6, g.b.torsade[1] + 4], texte: 'le bout tordu trois fois sur le brin' },
          ];
        },
      },
      tours: {
        titre: '2. Trois tours sur l’autre diagonale', dessin: z => temps(z, 'tours').svg,
        renvois: z => {
          const { g } = temps(z, 'tours'), t = g.j2[2];
          return [{ n: 3, rond: [z.l - 20, 24], cible: [t.B[0] - 14, t.B[1] + 14], texte: 'chaque tour serré contre le précédent' }];
        },
      },
      travers: {
        titre: '3. Trois tours en travers des premiers', dessin: z => temps(z, 'travers').svg,
        renvois: z => {
          const { g } = temps(z, 'travers'), t = g.j1[1];
          return [{ n: 4, rond: [z.l - 20, 24], cible: [t.A[0] + 22, t.A[1] + 22], texte: 'par-dessus les premiers, en X' }];
        },
      },
      arret: {
        titre: '4. Les frappes, puis l’arrêt', dessin: z => temps(z, 'arret').svg,
        renvois: z => {
          const { g } = temps(z, 'arret'), { cx, cy } = g;
          return [
            { n: 5, rond: [26, 24], cible: [cx - (RHO + S / 2) * 0.62, cy - (RHO + S / 2) * 0.78], texte: 'deux frappes entre les perches' },
            { n: 6, rond: [z.l - 20, z.h - 26], cible: [g.ar.centre[0] + 6, g.ar.centre[1] + 16], texte: 'cabestan d’arrêt sur la traverse' },
          ];
        },
      },
      ou: {
        titre: 'Où va chacun, sur un cadre', dessin: ou,
        renvois: z => {
          const { x0, x1, yH, yB, w, X } = geoOu(z);
          return [
            { n: 7, rond: [x1 + 120, yH + 6], cible: [x1 + w + 6, yH + 6], texte: 'droit : la charge descend sur la traverse' },
            { n: 8, rond: [x1 + 120, X[1] + 4], cible: [X[0] + 16, X[1] + 4], texte: 'diagonal : au croisement des jambes de force' },
            { n: 9, rond: [x1 + 120, yB + 8], cible: [x1 - 30, yB - 34], texte: 'les jambes de force : le cadre ne se couche pas' },
          ];
        },
      },
    },
  };
};
