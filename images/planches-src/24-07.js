// Planche 24-07 — L'étrier de cheville en écorce (ch. 24, « L'étrier de cheville »).
// Une jambe droite, en millimètres d'adulte. De côté (face extérieure, orteils à droite) et de
// face (côté extérieur à gauche), à la même échelle et sur la même ligne de sol ; la coupe est
// prise à la hauteur des chevilles, marquée sur les deux vues ; enfin la variante des bardeaux.
module.exports = (h) => {
  const f = v => Math.round(v * 10) / 10;
  const pt = p => `${f(p[0])} ${f(p[1])}`;
  const rempli = a => a.replace('fill="none"', 'fill="#FFFFFF"');
  const trace = (Q, ferme = false) => 'M' + Q.map(pt).join(' L') + (ferme ? ' Z' : '');
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const mul = (a, k) => [a[0] * k, a[1] * k];
  const norm = a => { const L = Math.hypot(a[0], a[1]) || 1; return [a[0] / L, a[1] / L]; };
  let nid = 0;
  const decoupe = (formes, contenu) => {
    const id = `pl2407c${++nid}`;
    return `<clipPath id="${id}">${formes.map(Q => `<path d="${trace(Q, true)}" fill="none"/>`).join('')}</clipPath><g clip-path="url(#${id})">${contenu}</g>`;
  };

  // Courbe lissée (Catmull-Rom) échantillonnée en polyligne.
  const courbe = (P, ferme = false, n = 8) => {
    const N = P.length, g = i => ferme ? P[((i % N) + N) % N] : P[Math.max(0, Math.min(N - 1, i))];
    const out = [], segs = ferme ? N : N - 1;
    for (let i = 0; i < segs; i++) {
      const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      for (let k = 0; k < n; k++) {
        const t = k / n, t2 = t * t, t3 = t2 * t;
        out.push([0, 1].map(j => 0.5 * (2 * p1[j] + (p2[j] - p0[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2 + (3 * p1[j] - p0[j] - 3 * p2[j] + p3[j]) * t3)));
      }
    }
    if (!ferme) out.push(P[N - 1].slice());
    return out;
  };
  // x d'une polyligne (mm, y vers le haut) à la hauteur y.
  const xA = (Q, y) => {
    for (let i = 0; i < Q.length - 1; i++) {
      const a = Q[i], b = Q[i + 1];
      if ((a[1] - y) * (b[1] - y) <= 0 && a[1] !== b[1]) return a[0] + (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1]);
    }
    return Q[Q.length - 1][0];
  };
  // Une bande droite de demi-largeur hw, de a à b.
  const bande = (a, b, hw) => {
    const u = norm([b[0] - a[0], b[1] - a[1]]), n = [-u[1] * hw, u[0] * hw];
    return [add(a, n), add(b, n), add(b, mul(n, -1)), add(a, mul(n, -1))];
  };
  const lignesBande = (a, b, hw, V) => {
    const u = norm([b[0] - a[0], b[1] - a[1]]), n = [-u[1], u[0]];
    return [-0.35, 0.35].map(k => h.ligne(...V(add(a, mul(n, hw * k))), ...V(add(b, mul(n, hw * k))), h.a.fin)).join('\n');
  };
  const cloche = (u) => { u = Math.abs(u); return u >= 1 ? 0 : (1 + Math.cos(Math.PI * u)) / 2; };

  // Le trait de coupe : mixte fin, bouts épais, flèches vers le bas (on regarde d'en haut).
  const traitCoupe = (V, x1, x2, y) => {
    const [a, b] = [V([x1, y]), V([x2, y])];
    const out = [h.ligne(a[0], a[1], b[0], b[1], h.a.fin + ' stroke-dasharray="10 3 2 3"')];
    for (const [px, py, sgn] of [[a[0], a[1], 1], [b[0], b[1], -1]]) {
      out.push(h.ligne(px, py, px + sgn * 9, py, h.a.contour));
      out.push(h.ligne(px + sgn * 4, py, px + sgn * 4, py + 9, h.a.arete));
      out.push(h.path(`M${f(px + sgn * 4 - 3.5)} ${f(py + 7)} L${f(px + sgn * 4 + 3.5)} ${f(py + 7)} L${f(px + sgn * 4)} ${f(py + 13)} Z`, h.a.plein));
    }
    return out.join('\n');
  };

  // ─── La jambe, vues de côté et de face : même échelle, même sol ─────────────────────
  const H = 445, Y_COUPE = 85;
  const echelle = z => (z.h - 20) / (H + 8);

  // De côté, face extérieure d'une jambe droite : devant à droite, talon à gauche.
  const jambeCote = courbe([
    [40, 445], [42, 400], [41, 340], [38, 270], [34, 200], [30, 145], [29, 112], [31, 95], [36, 84],
    [48, 74], [70, 63], [100, 52], [132, 42], [160, 33], [183, 27], [198, 22], [205, 16], [207, 9], [203, 3], [194, 0],
    [160, 0], [120, 1.5], [80, 2], [40, 1.5], [10, 0], [-25, 0], [-42, 2], [-54, 9], [-60, 22], [-59, 37],
    [-54, 52], [-47, 70], [-43, 95], [-42, 125], [-46, 160], [-56, 205], [-67, 250], [-73, 295], [-73, 340], [-68, 385], [-61, 425], [-58, 445],
  ]);
  const ECORCE_C = { x1: -38, x2: 14, haut: 402, bas: -4 };
  const geoCote = z => {
    const s = echelle(z);
    const ox = z.l / 2 - s * 62, oy = z.h - 10 - 4 * s;
    return { s, V: p => [ox + p[0] * s, oy - p[1] * s] };
  };
  const bandeA = [[-80, 61], [50, 48]];          // la boucle de la cheville, côté extérieur (bords)
  const bandeA_poly = [[-80, 101], [-80, 61], [50, 48], [50, 88]];
  const D2c = [[107, -10], [50.3, 101.4]];        // la diagonale qui remonte de dessous le pied

  const dessinCote = z => {
    const { s, V } = geoCote(z);
    const Vq = Q => Q.map(V);
    const out = [];
    const silh = Vq(jambeCote);
    const ferme = silh.concat([silh[0]]);
    out.push(h.path(trace(ferme, true), h.a.blanc));
    out.push(h.path(trace(silh), h.a.contour));
    // la cassure en haut
    const [g0, d0] = [V([-58, 445]), V([40, 445])];
    out.push(h.path(`M${pt(g0)} C${f(g0[0] + 25)} ${f(g0[1] - 8)} ${f(g0[0] + 40)} ${f(g0[1] + 8)} ${f((g0[0] + d0[0]) / 2)} ${f(g0[1])} S${f(d0[0] - 15)} ${f(d0[1] - 8)} ${pt(d0)}`, h.a.detail));
    // orteils : le petit orteil et l'ongle du gros
    out.push(h.path(`M${pt(V([150, 19]))} Q${pt(V([166, 24]))} ${pt(V([174, 13]))} Q${pt(V([177, 5]))} ${pt(V([171, 0.5]))}`, h.a.detail));
    out.push(h.path(`M${pt(V([197, 21]))} Q${pt(V([204, 18]))} ${pt(V([205, 11]))}`, h.a.detail));
    // l'écorce : la branche extérieure du U, qui passe sous le talon
    const e = ECORCE_C, r = 8;
    const [a, b] = [V([e.x1, e.haut]), V([e.x2, e.bas])];
    out.push(h.rect(a[0], a[1], b[0] - a[0], b[1] - a[1], rempli(h.a.arete) + ` rx="${f(r * s)}"`));
    out.push(h.path(`M${pt(V([e.x1, 2]))} Q${pt(V([e.x1, e.bas]))} ${pt(V([e.x1 + 4, e.bas]))} L${pt(V([e.x2 - 4, e.bas]))} Q${pt(V([e.x2, e.bas]))} ${pt(V([e.x2, 2]))}`, h.a.contour));
    for (let i = 0; i < 30; i++) {           // lenticelles de l'écorce de bouleau
      const x = e.x1 + 5 + ((i * 29) % 42), y = 12 + ((i * 97) % 380), l = 5 + (i * 7) % 6;
      if (y + l > e.haut - 6) continue;
      out.push(h.ligne(...V([x, y]), ...V([x, y + l]), h.a.detail));
    }
    // la bande en huit : la boucle derrière la cheville, puis la diagonale qui descend sous le pied
    const clipJambe = [silh];
    out.push(decoupe(clipJambe, [
      h.path(trace(Vq(bandeA_poly), true), rempli(h.a.arete)),
      lignesBande([-80, 81], [50, 68], 20, V),
    ].join('\n')));
    const pD2 = bande(D2c[0], D2c[1], 20);
    out.push(decoupe(clipJambe, [
      h.path(trace(Vq(pD2), true), rempli(h.a.arete)),
      lignesBande(D2c[0], D2c[1], 20, V),
    ].join('\n')));
    // la silhouette reprend par-dessus la bande, sauf là où l'écorce la cache sous le talon
    const bouts = [];
    let cur = [];
    for (const p of jambeCote) {
      const cache = p[0] > e.x1 + 1 && p[0] < e.x2 - 1 && p[1] < 6;
      if (cache) { if (cur.length > 1) bouts.push(cur); cur = []; } else cur.push(p);
    }
    if (cur.length > 1) bouts.push(cur);
    bouts.forEach(q => out.push(h.path(trace(Vq(q)), h.a.contour)));
    out.push(traitCoupe(V, -64, 50, Y_COUPE));
    return out.join('\n');
  };

  // De face : côté extérieur à gauche, côté intérieur à droite (la cheville intérieure est plus haute).
  const gaucheF = courbe([[-50, 445], [-53, 400], [-57, 345], [-53, 295], [-46, 240], [-39, 185], [-34, 140], [-32, 112], [-33, 96], [-37, 80], [-39, 66], [-37, 52], [-37, 42], [-41, 30], [-46, 17], [-48, 7], [-46, 0]]);
  const droiteF = courbe([[52, 445], [56, 400], [63, 340], [58, 295], [49, 240], [41, 185], [35, 140], [33, 118], [36, 104], [39, 90], [38, 76], [35, 64], [36, 52], [41, 38], [47, 24], [51, 11], [50, 0]]);
  const padG = y => 9 * cloche((y - 64) / 30), padD = y => 9 * cloche((y - 80) / 30);
  // bord extérieur d'une branche d'écorce, de haut en bas jusqu'au dessous du talon
  const brancheF = (cote) => {
    const pts = [];
    for (let y = 402; y >= 44; y -= 4) {
      const xl = xA(gaucheF, y), xr = xA(droiteF, y);
      pts.push(cote < 0 ? [xl - padG(y) - 4, y] : [xr + padD(y) + 4, y]);
    }
    const bas = cote < 0 ? [[-40, 34], [-36, 20], [-35, 6], [-33, -2]] : [[42, 34], [37, 20], [35, 6], [33, -2]];
    return courbe(pts.concat(bas), false, 3);
  };
  const avantF = (cote) => {       // bord avant de la branche : elle couvre le côté, pas le devant
    const pts = [];
    for (let y = 402; y >= 40; y -= 4) {
      const xl = xA(gaucheF, y), xr = xA(droiteF, y), xc = (xl + xr) / 2;
      pts.push(cote < 0 ? [xl + 0.2 * (xc - xl), y] : [xr - 0.2 * (xr - xc), y]);
    }
    return pts;
  };
  const ORTEILS = [[-40, -27, 12], [-26, -12, 14], [-11, 3, 16], [4, 19, 18], [20, 47, 25]];
  const D1f = [[-62, 99], [60, 13]], D2f = [[-60, 12], [60, 104]];

  const geoFace = z => {
    const s = echelle(z);
    const ox = z.l / 2 - s * 4, oy = z.h - 10 - 4 * s;
    return { s, V: p => [ox + p[0] * s, oy - p[1] * s] };
  };
  const dessinFace = z => {
    const { s, V } = geoFace(z);
    const Vq = Q => Q.map(V);
    const out = [];
    const G = Vq(gaucheF), D = Vq(droiteF);
    const silh = G.concat(D.slice().reverse());
    out.push(h.path(trace(silh, true), h.a.blanc));
    out.push(h.path(trace(G), h.a.contour), h.path(trace(D), h.a.contour));
    const [g0, d0] = [V([-50, 445]), V([52, 445])];
    out.push(h.path(`M${pt(g0)} C${f(g0[0] + 20)} ${f(g0[1] - 7)} ${f(g0[0] + 30)} ${f(g0[1] + 7)} ${f((g0[0] + d0[0]) / 2)} ${f(g0[1])} S${f(d0[0] - 12)} ${f(d0[1] - 7)} ${pt(d0)}`, h.a.detail));
    // les deux branches d'écorce
    const branches = [];
    for (const c of [-1, 1]) {
      const ext = brancheF(c), av = avantF(c);
      const xl = c < 0 ? xA(gaucheF, 402) : xA(droiteF, 402);
      const poly = [[xl, 402]].concat(ext.filter(p => p[1] >= 30), av.filter(p => p[1] >= 30).reverse());
      branches.push(Vq(poly));
      out.push(h.path(trace(Vq(poly), true), rempli(h.a.arete)));
      for (let i = 0; i < 12; i++) {       // lenticelles
        const y = 60 + ((i * 131) % 330), xa = xA(av, y), xe = xA(ext, y);
        const x = xa + (xe - xa) * (0.3 + 0.4 * ((i * 37) % 10) / 10);
        out.push(h.ligne(...V([x, y]), ...V([x, y + 6]), h.a.detail));
      }
    }
    // le pied passe devant le bas des branches
    const piedG = gaucheF.filter(p => p[1] <= 46), piedD = droiteF.filter(p => p[1] <= 46);
    out.push(h.path(trace(Vq(piedG.concat(piedD.slice().reverse())), true), h.a.blanc));
    // le bas du U, sous le talon : caché derrière le pied, sauf son épaisseur sous la semelle
    const u = brancheF(-1).filter(p => p[1] <= 44).concat(brancheF(1).filter(p => p[1] <= 44).reverse());
    const [ua, ub] = [V([-33, 0]), V([33, -4])];
    out.push(h.rect(ua[0], ua[1], ub[0] - ua[0], ub[1] - ua[1], rempli(h.a.arete)));
    out.push(h.path(trace(Vq(u)), h.a.cache));
    // la bande en huit : les deux diagonales se croisent sur le cou-de-pied
    const env = [silh].concat(branches);
    for (const dg of [D1f, D2f]) {
      out.push(decoupe(env, [h.path(trace(Vq(bande(dg[0], dg[1], 20)), true), rempli(h.a.arete)), lignesBande(dg[0], dg[1], 20, V)].join('\n')));
    }
    // les orteils, devant tout
    for (const [x0, x1, top] of ORTEILS) {
      const r = (x1 - x0) / 2, xm = (x0 + x1) / 2;
      out.push(h.path(`M${pt(V([x0, 0]))} L${pt(V([x0, top - r]))} Q${pt(V([x0, top]))} ${pt(V([xm, top]))} Q${pt(V([x1, top]))} ${pt(V([x1, top - r]))} L${pt(V([x1, 0]))}`, rempli(h.a.arete)));
      out.push(h.path(`M${pt(V([x0 + r * 0.45, top - r * 0.35]))} Q${pt(V([xm, top - r * 0.05]))} ${pt(V([x1 - r * 0.45, top - r * 0.35]))}`, h.a.fin));
    }
    // silhouette reprise : le pied, le haut de la jambe, le bord extérieur des branches
    out.push(h.path(trace(Vq(piedG)), h.a.contour), h.path(trace(Vq(piedD)), h.a.contour));
    out.push(h.ligne(...V([-46, 0]), ...V([50, 0]), h.a.contour));
    out.push(h.path(trace(Vq(gaucheF.filter(p => p[1] >= 400))), h.a.contour), h.path(trace(Vq(droiteF.filter(p => p[1] >= 400))), h.a.contour));
    for (const c of [-1, 1]) {
      const ext = brancheF(c).filter(p => p[1] >= 34);
      const xl = c < 0 ? xA(gaucheF, 402) : xA(droiteF, 402);
      out.push(h.path(trace(Vq([[xl, 402]].concat(ext))), h.a.contour));
    }
    out.push(traitCoupe(V, -66, 66, Y_COUPE));
    return out.join('\n');
  };

  // ─── La coupe à la hauteur des chevilles, vue de dessus : devant en bas ───────────────
  // X : extérieur à gauche (comme la vue de face) ; Z : vers l'avant, en bas de la page.
  const peauPts = [[0, -41], [-6, -39], [-11, -33], [-20, -27], [-29, -21], [-36, -13], [-38, -3], [-36, 10], [-29, 23], [-16, 33], [0, 37],
    [16, 35], [28, 27], [36, 16], [39, 5], [37, -8], [30, -19], [20, -27], [11, -33], [6, -39]];
  const peau = courbe(peauPts, true, 10);
  const C = [0, -2];
  const ang = p => Math.atan2(p[1] - C[1], p[0] - C[0]) * 180 / Math.PI;
  const dA = (a, b) => ((a - b + 540) % 360) - 180;
  const plateau = (phi, c, demi) => { const u = Math.abs(dA(phi, c)) / demi; return u >= 1 ? 0 : u < 0.55 ? 1 : (1 + Math.cos(Math.PI * (u - 0.55) / 0.45)) / 2; };
  const nPeau = peau.map((p, i) => {
    const a = peau[(i - 1 + peau.length) % peau.length], b = peau[(i + 1) % peau.length];
    let n = norm([b[1] - a[1], -(b[0] - a[0])]);
    if ((p[0] - C[0]) * n[0] + (p[1] - C[1]) * n[1] < 0) n = mul(n, -1);
    return n;
  });
  const phis = peau.map(ang);
  const tPad = phi => 8 * Math.max(plateau(phi, -171, 38), plateau(phi, 15, 38));
  const ecorceIci = phi => Math.abs(dA(phi, -172)) <= 50 || Math.abs(dA(phi, 8)) <= 48;
  const eEnv = phis.map(phi => ecorceIci(phi) ? tPad(phi) + 4.3 : 0);
  // La bande, tendue, ne suit pas les creux : elle suit l'enveloppe convexe de la peau et de l'écorce.
  const enveloppe = P => {
    const pts = P.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
    const lo = [], up = [];
    for (const p of pts) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], p) <= 0) lo.pop(); lo.push(p); }
    for (const p of pts.slice().reverse()) { while (up.length >= 2 && cr(up[up.length - 2], up[up.length - 1], p) <= 0) up.pop(); up.push(p); }
    return lo.slice(0, -1).concat(up.slice(0, -1));
  };
  const decale = (E, d) => {          // l'enveloppe convexe, repoussée de d, coins arrondis
    const n = E.length, out = [];
    const nrm = (a, b) => norm([b[1] - a[1], -(b[0] - a[0])]);
    for (let i = 0; i < n; i++) {
      const p = E[i], n1 = nrm(E[(i - 1 + n) % n], p), n2 = nrm(p, E[(i + 1) % n]);
      const t1 = Math.atan2(n1[1], n1[0]);
      let dt = Math.atan2(n2[1], n2[0]) - t1;
      while (dt < 0) dt += 2 * Math.PI;
      const m = Math.max(1, Math.ceil(dt / 0.12));
      for (let k = 0; k <= m; k++) out.push(add(p, [d * Math.cos(t1 + dt * k / m), d * Math.sin(t1 + dt * k / m)]));
    }
    return out;
  };
  const off = (k) => peau.map((p, i) => add(p, mul(nPeau[i], k(i))));
  const suites = pred => {         // indices contigus où pred est vrai
    const r = []; let c = null;
    peau.forEach((_, i) => { if (pred(i)) { if (!c) { c = []; r.push(c); } c.push(i); } else c = null; });
    return r;
  };
  const geoCoupe = z => {
    const s = Math.min((z.l - 120) / 116, (z.h - 16) / 112);
    const ox = z.l / 2, oy = 8 + 50 * s;
    return { s, V: p => [ox + p[0] * s, oy + p[1] * s] };
  };
  const OS = { talus: [[-19, -13], [-6, -16], [7, -16], [18, -10], [21, 4], [18, 17], [7, 24], [-7, 24], [-18, 15], [-21, 1]], ext: [-30, -9, 5.5, 12], int: [29.5, 7, 5.5, 12] };
  const dessinCoupe = z => {
    const { s, V } = geoCoupe(z);
    const Vq = Q => Q.map(V);
    const out = [];
    // la bande, seule à faire le tour
    const E = enveloppe(off(i => eEnv[i]));
    const bIn = decale(E, 0.3), bOut = decale(E, 2.8);
    out.push(h.path(trace(Vq(bOut), true) + ' ' + trace(Vq(bIn), true), rempli(h.a.detail) + ' fill-rule="evenodd"'));
    // la peau et la chair
    out.push(h.path(trace(Vq(peau), true), rempli(h.a.contour)));
    // les rembourrages
    for (const run of suites(i => tPad(phis[i]) > 0.15)) {
      const inn = run.map(i => peau[i]), ext = run.map(i => add(peau[i], mul(nPeau[i], tPad(phis[i]))));
      out.push(h.path(trace(Vq(inn.concat(ext.reverse())), true), h.a.hachure('isolant', 'detail')));
    }
    // l'écorce, d'un côté et de l'autre seulement
    for (const run of suites(i => ecorceIci(phis[i]))) {
      const inn = run.map(i => add(peau[i], mul(nPeau[i], tPad(phis[i]) + 0.3)));
      const ext = run.map(i => add(peau[i], mul(nPeau[i], tPad(phis[i]) + 4.3)));
      out.push(h.path(trace(Vq(inn.concat(ext.reverse())), true), h.a.plein));
    }
    // les os : l'astragale au milieu, les deux chevilles osseuses juste sous la peau
    out.push('<defs><pattern id="pl2407-os" width="3.6" height="3.6" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="0.6" fill="#1A1A1A"/><circle cx="2.8" cy="2.8" r="0.45" fill="#1A1A1A"/></pattern></defs>');
    const os = ep => `fill="url(#pl2407-os)" stroke="#1A1A1A" stroke-width="${ep}" stroke-linejoin="round"`;
    out.push(h.path(trace(Vq(courbe(OS.talus, true, 6)), true), os(0.7)));
    for (const [cx, cz, rx, rz] of [OS.ext, OS.int]) {
      const c = V([cx, cz]);
      out.push(h.ellipse(c[0], c[1], rx * s, rz * s, os(1.4)));
    }
    // l'enflure pousse par le devant ouvert
    for (const phi of [70, 90, 110]) {
      let best = 0; phis.forEach((p, i) => { if (Math.abs(dA(p, phi)) < Math.abs(dA(phis[best], phi))) best = i; });
      const a = add(peau[best], mul(nPeau[best], 1)), b = add(peau[best], mul(nPeau[best], 15));
      out.push(h.fleche(`M${pt(V(a))} L${pt(V(b))}`, h.a.arete));
    }
    return out.join('\n');
  };

  // ─── Faute d'écorce : deux bardeaux et une bande de cuir, en perspective ───────────
  const KX = 0.5, KY = 0.29, YB = 190;
  const geoBard = z => {
    const s = Math.min((z.h - 16) / (YB + 26 + 100 * KY), (z.l - 110) / (108 + 100 * KX));
    const ox = z.l / 2 - s * 25, oy = z.h - 8 - 4 * s;
    return { s, P: (X, Y, Zp) => [ox + s * (X + KX * Zp), oy - s * (Y + KY * Zp)] };
  };
  const EP = 8;                                   // épaisseur du bardeau, bout scié d'équerre
  const dessinBard = z => {
    const { s, P } = geoBard(z);
    const out = [];
    const face = (Q, a = rempli(h.a.arete)) => h.path(trace(Q, true), a);
    const grain = (X, zs) => zs.map(zz => h.path(trace([0, 1, 2, 3, 4, 5, 6, 7, 8].map(k => P(X, 6 + k * (YB - 12) / 8, zz + 1.5 * Math.sin(k * 1.3 + zz)))), h.a.fin)).join('\n');
    // bardeau de gauche : face intérieure, tranche avant, bout scié
    out.push(face([P(-42, 0, 0), P(-42, 0, 100), P(-42, YB, 100), P(-42, YB, 0)]), grain(-42, [14, 32, 52, 70, 86]));
    out.push(face([P(-50, 0, 0), P(-42, 0, 0), P(-42, YB, 0), P(-50, YB, 0)]));
    out.push(face([P(-50, YB, 0), P(-42, YB, 0), P(-42, YB, 100), P(-50, YB, 100)]));
    // la bande de cuir : le dessus, sous le talon, entre les bardeaux
    out.push(face([P(-42, 0, 25), P(42, 0, 25), P(42, 0, 75), P(-42, 0, 75)]));
    // la jambe, posée entre les deux : cachée en tireté, visible au-dessus des bardeaux
    const jg = gaucheF.filter(q => q[1] <= YB + 18).map(q => [q[0] * 0.95, q[1] + 3]);
    const jd = droiteF.filter(q => q[1] <= YB + 18).map(q => [q[0] * 0.95, q[1] + 3]);
    const PJ = q => P(q[0], q[1], 50);
    const jambe = jg.concat(jd.slice().reverse());
    out.push(h.path(trace(jambe.map(PJ), true), h.a.blanc));
    const coupe = (Q, haut) => Q.filter(q => haut ? q[1] >= YB - 2 : q[1] <= YB + 2);
    for (const Q of [jg, jd]) out.push(h.path(trace(coupe(Q, true).map(PJ)), h.a.contour));
    const [c0, c1] = [PJ(jg[0]), PJ(jd[0])];
    out.push(h.path(`M${pt(c0)} C${f(c0[0] + 14)} ${f(c0[1] - 6)} ${f(c0[0] + 22)} ${f(c0[1] + 6)} ${f((c0[0] + c1[0]) / 2)} ${f((c0[1] + c1[1]) / 2)} S${f(c1[0] - 9)} ${f(c1[1] - 6)} ${pt(c1)}`, h.a.detail));
    const cache = [jg, jd].map(Q => h.path(trace(coupe(Q, false).map(PJ)), h.a.cache)).join('\n') + h.path(trace([jg[jg.length - 1], jd[jd.length - 1]].map(PJ)), h.a.cache);
    // bardeau de droite : tranche avant, face extérieure, bout scié (il cache la jambe)
    out.push(face([P(42, 0, 0), P(50, 0, 0), P(50, YB, 0), P(42, YB, 0)]));
    out.push(face([P(50, 0, 0), P(50, 0, 100), P(50, YB, 100), P(50, YB, 0)]), grain(50, [16, 36, 56, 76, 90]));
    out.push(face([P(42, YB, 0), P(50, YB, 0), P(50, YB, 100), P(42, YB, 100)]));
    // la bande de cuir : sa tranche, sous les deux bardeaux, puis collée à plat sur la face
    // extérieure de droite, clouée de deux pointes ; de même à gauche, de l'autre côté
    out.push(face([P(-50, -3, 25), P(53, -3, 25), P(53, 0, 25), P(-50, 0, 25)]));
    out.push(face([P(53, -3, 25), P(53, -3, 75), P(53, 0, 75), P(53, 0, 25)]));
    const [l0, l1, l2, l3, lm] = [P(50.4, 0, 25), P(50.4, 58, 25), P(50.4, 58, 75), P(50.4, 0, 75), P(50.4, 63, 50)];
    out.push(h.path(`M${pt(l0)} L${pt(l1)} Q${pt(lm)} ${pt(l2)} L${pt(l3)} Z`, rempli(h.a.contour)));
    for (const zz of [38, 62]) { const c = P(50.4, 44, zz); out.push(h.cercle ? h.cercle(c[0], c[1], 2.4, h.a.plein) : `<circle cx="${f(c[0])}" cy="${f(c[1])}" r="2.4" fill="#1A1A1A"/>`); }
    out.push(cache);
    return out.join('\n');
  };

  return {
    ref: '24-07',
    titre: 'L’étrier de cheville en écorce',
    desc: 'L’attelle en U d’une cheville tordue, sur une jambe droite. De côté : la plaque d’écorce de bouleau moulée sur la face extérieure du mollet descend jusque sous le talon ; la bande élastique fait le tour de la cheville par derrière et redescend sous le pied. De face : une branche d’écorce de chaque côté, bombée sur le rembourrage des chevilles osseuses ; le devant de la jambe reste à découvert et la bande se croise en X sur le cou-de-pied ; le fond du U, caché sous le talon, ne montre que son épaisseur sous la semelle. En coupe à la hauteur des chevilles, vue de dessus, orteils vers le bas : l’os juste sous la peau, le rembourrage, l’écorce d’un côté et de l’autre seulement, la bande qui fait seule le tour, et l’enflure qui pousse par le devant ouvert. Faute d’écorce : deux bardeaux reliés par une bande de cuir qui passe sous le talon et remonte, clouée à plat, sur leur face extérieure ; la jambe, en tireté, est posée entre les deux.',
    format: 'pleine',
    disposition: [['cote', 'face'], ['coupe', 'bardeaux']],
    hauteurs: [3.1, 2],
    largeurs: [[2, 1.15], [1.3, 1]],
    vues: {
      cote: {
        titre: 'De côté, face extérieure',
        dessin: dessinCote,
        renvois: z => {
          const { V } = geoCote(z);
          return [
            { n: 1, rond: V([110, 330]), cible: V([2, 318]), texte: 'écorce de bouleau moulée, séchée en place' },
            { n: 2, rond: V([-100, 22]), cible: V([-20, -2]), texte: 'l’écorce passe sous le talon' },
            { n: 3, rond: V([150, 110]), cible: V([96, 22]), texte: 'bande élastique en huit, desserrée la nuit' },
          ];
        },
      },
      face: {
        titre: 'De face',
        dessin: dessinFace,
        renvois: z => {
          const { V } = geoFace(z);
          return [
            { n: 4, rond: V([95, 150]), cible: V([2, 66]), texte: 'le huit se croise sur le cou-de-pied' },
            { n: 5, rond: V([95, 290]), cible: V([2, 280]), texte: 'devant ouvert : le tibia à découvert' },
          ];
        },
      },
      coupe: {
        titre: 'Coupe aux chevilles, vue d’en haut, orteils en bas',
        dessin: dessinCoupe,
        renvois: z => {
          const { V } = geoCoupe(z);
          return [
            { n: 6, rond: V([72, -30]), cible: V([31, 4]), texte: 'cheville osseuse, juste sous la peau' },
            { n: 7, rond: V([-74, 18]), cible: V([-41.5, 4]), texte: 'rembourrage sur chaque cheville osseuse' },
            { n: 8, rond: V([74, 28]), cible: V([48, 14]), texte: 'écorce des deux côtés, jamais le tour' },
            { n: 9, rond: V([-72, -40]), cible: V([-24, -32]), texte: 'bande élastique, seule à faire le tour' },
            { n: 10, rond: V([62, 58]), cible: V([10, 50]), texte: 'l’enflure pousse par le devant ouvert' },
          ];
        },
      },
      bardeaux: {
        titre: 'Faute d’écorce : deux bardeaux',
        dessin: dessinBard,
        renvois: z => {
          const { P } = geoBard(z);
          const [a, b, g] = [P(50, 130, 55), P(-18, 0, 58), P(-50, 0, 0)];
          return [
            { n: 11, rond: [a[0] + 52, a[1] - 20], cible: a, texte: 'un bardeau de chaque côté de la jambe' },
            { n: 12, rond: [g[0] - 24, b[1] + 2], cible: b, texte: 'bande de cuir qui les relie sous le talon' },
          ];
        },
      },
    },
    danger: 'Danger — les premiers jours, l’enflure monte, et c’est la nuit qu’une attelle bien serrée devient un garrot. La bande se desserre pour la nuit ; la couleur et la chaleur des orteils se regardent au lever, au coucher et, les deux premières nuits, à chaque réveil pour le poêle.',
  };
};
