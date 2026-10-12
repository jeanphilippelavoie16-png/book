// Planche 24-03 — Le chevalet de sciage (chapitre 24, section 9 « Le chevalet de sciage » ; étape 12).
// Ce que dit le chapitre, et rien de plus : deux paires de perches croisées en X, assemblées à
// mi-bois et liées à la croisée ; une traverse basse et une perche en diagonale qui relient les deux
// X pour qu'ils ne s'écartent pas ; la bille couchée dans les deux X, à hauteur de hanche ; on scie
// debout, le dos droit ; on coupe à l'extérieur des appuis, et la bille ne pince pas la lame.
// Cotes : aucune. Le chapitre ne donne aucune mesure (perches, écartement, hauteur) : la hauteur se
// lit sur le scieur, la bille à sa hanche.
// Géométrie de dessin, jamais imprimée : perches de 80, bille de 260, jambes à 30° de la verticale,
// croisée à 610, axe de la bille à 950 (la hanche du personnage de formes.js), X à 1000 l'un de
// l'autre, trait de scie à 250 au-delà du second X ; du bout, le scieur à 780 de l'axe, la poignée à 505.
// Repère : x le long de la bille (vers le bout qu'on scie), y en travers (−y : le côté du scieur, de
// la traverse et de la diagonale), z vers le haut ; en mm.
module.exports = (h) => {
  const A = h.a;
  const NOIR = /stroke="([^"]+)"/.exec(A.arete)[1];
  const BLANC = /fill="([^"]+)"/.exec(A.blanc)[1];
  const f = v => Math.round(v * 10) / 10;
  const W = at => at.replace('fill="none"', `fill="${BLANC}"`);
  const rappel = A.fin + ' stroke-dasharray="2 3"';
  const axeTrait = A.fin + ' stroke-dasharray="10 3 2 3"';

  // ── vecteurs ──
  const add3 = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
  const sub3 = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  const mul3 = (a, k) => [a[0] * k, a[1] * k, a[2] * k];
  const dot3 = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const cross3 = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const uni3 = a => mul3(a, 1 / Math.hypot(...a));
  const rot2 = (p, c, deg) => { const t = deg * Math.PI / 180, dx = p[0] - c[0], dy = p[1] - c[1];
    return [c[0] + dx * Math.cos(t) - dy * Math.sin(t), c[1] + dx * Math.sin(t) + dy * Math.cos(t)]; };

  // enveloppe convexe : la silhouette d'un rondin vu de biais
  const enveloppe = pts => {
    const p = pts.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const x = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
    const bas = [], haut = [];
    for (const q of p) { while (bas.length >= 2 && x(bas[bas.length - 2], bas[bas.length - 1], q) <= 0) bas.pop(); bas.push(q); }
    for (const q of p.slice().reverse()) { while (haut.length >= 2 && x(haut[haut.length - 2], haut[haut.length - 1], q) <= 0) haut.pop(); haut.push(q); }
    return bas.slice(0, -1).concat(haut.slice(0, -1));
  };
  // points d'une courbe lisse (Catmull-Rom), pour une bande à deux bords
  const courbe = pts => {
    const out = [pts[0]];
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(i - 1, 0)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(i + 2, pts.length - 1)];
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      for (let k = 1; k <= 14; k++) {
        const t = k / 14, u = 1 - t;
        out.push([u * u * u * p1[0] + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * p2[0],
          u * u * u * p1[1] + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * p2[1]]);
      }
    }
    return out;
  };
  // une bande (cadre de scie, tour de corde) : le dedans blanc, deux bords, les bouts ouverts
  const bande = (pts, ep, at = A.detail) => {
    const c = courbe(pts), g = [], d = [];
    c.forEach((p, i) => {
      const a = c[Math.max(i - 1, 0)], b = c[Math.min(i + 1, c.length - 1)], L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
      const n = [-(b[1] - a[1]) / L * ep / 2, (b[0] - a[0]) / L * ep / 2];
      g.push([p[0] + n[0], p[1] + n[1]]); d.push([p[0] - n[0], p[1] - n[1]]);
    });
    return [h.chemin([...g, ...d.slice().reverse()], A.blanc, true), h.chemin(g, at), h.chemin(d, at)].join(String.fromCharCode(10));
  };
  // ── la géométrie ──
  const R = 40, RB = 130, RT = 35;
  const T30 = Math.tan(Math.PI / 6), C30 = Math.cos(Math.PI / 6), S30 = 0.5;
  const ZC = 610, ZB = 950, ZH = 1160, ZK = 940;      // croisée, axe de la bille, haut des jambes, fond du trait
  const XS = [0, 1000], XB0 = -300, XB1 = 1800, XK = 1250;
  const surJ = (x, s, z) => [x, s * (z - ZC) * T30, z];   // s = +1 : la jambe dont le pied est côté scieur
  const dirJ = s => uni3([0, s * S30, C30]);
  const nOut = [0, -C30, S30];                            // la face extérieure de cette jambe, côté scieur
  const contre = (x, z, rr) => add3(surJ(x, 1, z), mul3(nOut, R + rr));
  const tra0 = contre(-120, 130, RT), tra1 = contre(1120, 130, RT);          // traverse basse
  const dg0 = contre(XS[0], 250, RT), dg1 = contre(XS[1], 545, RT);           // diagonale
  const dgU = uni3(sub3(dg1, dg0));
  const dgA = sub3(dg0, mul3(dgU, 60)), dgB = add3(dg1, mul3(dgU, 60));

  // ── la vue d'ensemble, en axonométrie ──
  const AZ = 55 * Math.PI / 180, EL = 20 * Math.PI / 180;   // l'œil : du côté du scieur, vers le bout qu'on scie, un peu au-dessus
  const VD = [Math.cos(EL) * Math.sin(AZ), -Math.cos(EL) * Math.cos(AZ), Math.sin(EL)];
  const RR = [Math.cos(AZ), Math.sin(AZ), 0], UP = [-Math.sin(EL) * Math.sin(AZ), Math.sin(EL) * Math.cos(AZ), Math.cos(EL)];
  const repAxo = z => {
    const cles = [];
    for (const x of XS) for (const s of [1, -1]) { cles.push(add3(surJ(x, s, 0), [0, s * -60, 0]), add3(surJ(x, s, ZH), [0, 0, 40])); }
    for (const x of [XB0, XB1]) for (const [dy, dz] of [[RB, 0], [-RB, 0], [0, RB], [0, -RB]]) cles.push([x, dy, ZB + dz]);
    cles.push(tra0, tra1);
    const pr = q => [dot3(q, RR), -dot3(q, UP)];
    const us = cles.map(q => pr(q)[0]), vs = cles.map(q => pr(q)[1]);
    const u0 = Math.min(...us), u1 = Math.max(...us), v0 = Math.min(...vs), v1 = Math.max(...vs);
    const s = Math.min((z.l - 16) / (u1 - u0), (z.h - 12) / (v1 - v0));
    const ox = (z.l - (u1 - u0) * s) / 2 - u0 * s, oy = (z.h - (v1 - v0) * s) / 2 - v0 * s;
    const P = q => { const p = pr(q); return [ox + p[0] * s, oy + p[1] * s]; };
    P.s = s;
    return P;
  };

  // un rondin vu de biais : fond blanc, deux génératrices, les bouts (plein si le bout regarde l'œil)
  const rondin = (P, a0, b0, r, o = {}) => {
    const ax = uni3(sub3(b0, a0)), m = uni3(cross3(ax, VD)), w = cross3(ax, m), N = 44;
    const pt = (c, t, sg = 1) => add3(c, add3(mul3(m, r * Math.cos(t)), mul3(w, sg * r * Math.sin(t))));
    const cercle = c => Array.from({ length: N }, (_, i) => P(pt(c, 2 * Math.PI * i / N)));
    const capA = o.capA !== false, capB = o.capB !== false, at = o.trait || A.arete;
    const pA = capA ? cercle(a0) : [P(pt(a0, 0)), P(pt(a0, Math.PI))];
    const pB = capB ? cercle(b0) : [P(pt(b0, 0)), P(pt(b0, Math.PI))];
    const out = [h.chemin(enveloppe([...pA, ...pB]), A.blanc, true)];
    out.push(h.chemin([P(pt(a0, 0)), P(pt(b0, 0))], at), h.chemin([P(pt(a0, Math.PI)), P(pt(b0, Math.PI))], at));
    const bout = (c, dehors) => {
      if (dot3(dehors, VD) > 0) { out.push(h.chemin(cercle(c), at, true)); return; }
      const pc = P(c), po = P(add3(c, dehors)), pw = P(add3(c, w));
      const sg = (pw[0] - pc[0]) * (po[0] - pc[0]) + (pw[1] - pc[1]) * (po[1] - pc[1]) >= 0 ? 1 : -1;
      out.push(h.chemin(Array.from({ length: N / 2 + 1 }, (_, i) => P(pt(c, Math.PI * i / (N / 2), sg))), at));
    };
    if (capA) bout(a0, mul3(ax, -1));
    if (capB) bout(b0, ax);
    return out.join('\n');
  };
  // la partie vue d'un cercle autour d'un rondin (tour de corde, trait de scie)
  const anneau = (P, c, ax, r, garde = () => true, at = A.detail) => {
    const m = uni3(cross3(ax, VD)), w = cross3(ax, m), runs = [[]];
    for (let i = 0; i <= 90; i++) {
      const t = 2 * Math.PI * i / 90, n = add3(mul3(m, Math.cos(t)), mul3(w, Math.sin(t))), p = add3(c, mul3(n, r));
      if (dot3(n, VD) > 0 && garde(p)) runs[runs.length - 1].push(P(p)); else if (runs[runs.length - 1].length) runs.push([]);
    }
    return runs.filter(u => u.length > 1).map(u => h.chemin(u, at)).join('\n');
  };
  const quad = (P, pts, at) => h.chemin(pts.map(P), at, true);
  // la ligature de la croisée, sur la face qui regarde l'œil : deux faisceaux de tours croisés
  const ligatureAxo = (P, x) => {
    const xf = x + R + 4, out = [];
    const V = [[-18, -80], [18, -80], [18, 80], [-18, 80]].map(([y, dz]) => [xf, y, ZC + dz]);
    out.push(quad(P, V, W(A.detail)));
    for (const y of [-6, 6]) out.push(h.chemin([P([xf, y, ZC - 80]), P([xf, y, ZC + 80])], A.fin));
    const H = [[-46, -18], [46, -18], [46, 18], [-46, 18]].map(([y, dz]) => [xf + 2, y, ZC + dz]);
    out.push(quad(P, H, W(A.detail)));
    for (const dz of [-6, 6]) out.push(h.chemin([P([xf + 2, -46, ZC + dz]), P([xf + 2, 46, ZC + dz])], A.fin));
    return out.join('\n');
  };
  // les tours de corde d'une jonction (traverse ou diagonale sur une jambe)
  const toursAxo = (P, c, ax, r, decal) => [-1, 1].map(sg => [0, 9, 18].map(k =>
    anneau(P, add3(c, mul3(ax, sg * (decal + k))), ax, r + 2, () => true, A.detail)).join('\n')).join('\n');

  const dessinAxo = z => {
    const P = repAxo(z), out = [];
    const split = 90;
    for (const x of XS) {
      const Cc = [x, 0, ZC];
      // la jambe dont le haut passe devant la bille : le bas d'abord
      out.push(rondin(P, surJ(x, -1, 0), add3(Cc, mul3(dirJ(-1), split)), R, { capB: false }));
      out.push(rondin(P, surJ(x, 1, 0), surJ(x, 1, ZH), R));
      out.push(ligatureAxo(P, x));
    }
    // traverse basse et diagonale, avec leurs tours de corde
    out.push(rondin(P, tra0, tra1, RT));
    for (const x of XS) out.push(toursAxo(P, [x, tra0[1], tra0[2]], [1, 0, 0], RT, R + 10));
    out.push(rondin(P, dgA, dgB, RT));
    for (const c of [dg0, dg1]) out.push(toursAxo(P, c, dgU, RT, R + 10));
    // la bille
    out.push(rondin(P, [XB0, 0, ZB], [XB1, 0, ZB], RB, { trait: A.contour }));
    for (const [rho, dy, dz] of [[98, 6, -4], [66, 4, -2], [34, 2, 0]]) {
      const pts = Array.from({ length: 48 }, (_, i) => { const t = 2 * Math.PI * i / 48; return P([XB1, dy + rho * Math.cos(t), ZB + dz + rho * Math.sin(t)]); });
      out.push(h.chemin(pts, A.fin, true));
    }
    const gen = (phi, xa, xb) => h.chemin([P([xa, -RB * Math.sin(phi), ZB + RB * Math.cos(phi)]), P([xb, -RB * Math.sin(phi), ZB + RB * Math.cos(phi)])], A.fin);
    const d2r = Math.PI / 180;
    out.push(gen(28 * d2r, 150, 850), gen(64 * d2r, -150, 520), gen(64 * d2r, 1380, 1700), gen(100 * d2r, 380, 1120));
    // le trait de scie, entamé par le dessus
    out.push(anneau(P, [XK, 0, ZB], [1, 0, 0], RB, p => p[2] >= ZK, A.arete));
    // le haut des jambes qui passe devant la bille
    for (const x of XS) out.push(rondin(P, add3([x, 0, ZC], mul3(dirJ(-1), split)), surJ(x, -1, ZH), R, { capA: false }));
    return out.join('\n');
  };

  // ── les vues orthogonales : même échelle, même sol ──
  const H_TOTALE = 1800;
  // les deux vues de la rangée partagent l'échelle : la plus serrée des deux (largeurs données par --zones)
  const echelle2 = z => Math.min((z.h - 12) / H_TOTALE, 351 / 2290, 226 / 1480);
  const sol = z => z.h - 6;

  // de côté : on regarde depuis le côté du scieur, le bout qu'on scie à droite
  const XMIN = -330, XMAX = 1960;
  const repCote = z => {
    const s = echelle2(z), gy = sol(z), ox = (z.l - (XMAX - XMIN) * s) / 2 - XMIN * s;
    const X = x => ox + x * s, Z = zz => gy - zz * s;
    return { s, gy, X, Z };
  };
  const THETA = 5;   // le bout libre qui pend, un peu forcé pour se voir
  const dessinCote = z => {
    const { s, gy, X, Z } = repCote(z), out = [];
    const rect = (x0, x1, z0, z1, at) => h.chemin([[X(x0), Z(z0)], [X(x1), Z(z0)], [X(x1), Z(z1)], [X(x0), Z(z1)]], at, true);
    const bandeJambe = (x, z0, z1, fond = true) => [
      fond ? h.chemin([[X(x - R), Z(z0)], [X(x + R), Z(z0)], [X(x + R), Z(z1)], [X(x - R), Z(z1)]], A.blanc, true) : '',
      h.ligne(X(x - R), Z(z0), X(x - R), Z(z1), A.arete), h.ligne(X(x + R), Z(z0), X(x + R), Z(z1), A.arete)].join('\n');
    out.push(h.ligne(X(XMIN), gy, z.l, gy, A.arete));
    // la hauteur de la hanche, reprise de la vue du bout
    out.push(h.ligne(X(XB1) + 14, Z(ZB), z.l, Z(ZB), rappel));
    // les deux X, vus par la tranche
    for (const x of XS) {
      out.push(bandeJambe(x, 0, ZH));
      out.push(h.ellipse(X(x), Z(ZH), R * s, 20 * s, W(A.arete)));
    }
    // la bille : le bout libre d'abord, tourné autour du fond du trait
    const piv = [X(XK), Z(ZK)];
    const bouts = [[XK + 3, ZK], [XK + 3, ZB + RB], [XB1, ZB + RB], [XB1, ZB - RB], [XK - 12, ZB - RB]].map(([x, zz]) => rot2([X(x), Z(zz)], piv, THETA));
    out.push(h.chemin(bouts, A.blanc, true));
    out.push(h.chemin(bouts.slice(0, 5), A.contour));
    out.push(h.chemin([[XK + 400, ZB + 70], [XB1 - 30, ZB + 70]].map(([x, zz]) => rot2([X(x), Z(zz)], piv, THETA)), A.fin));
    out.push(h.chemin([[XK + 120, ZB - 60], [XB1 - 80, ZB - 60]].map(([x, zz]) => rot2([X(x), Z(zz)], piv, THETA)), A.fin));
    // la partie qui reste sur le chevalet
    out.push(h.chemin([[X(XB0), Z(ZB - RB)], [X(XB0), Z(ZB + RB)], [X(XK - 3), Z(ZB + RB)], [X(XK - 3), Z(ZK)], [X(XK + 3), Z(ZK)], [X(XK + 3), Z(ZB - RB)]], A.blanc, true));
    out.push(h.chemin([[X(XK - 3), Z(ZK)], [X(XK - 3), Z(ZB + RB)], [X(XB0), Z(ZB + RB)], [X(XB0), Z(ZB - RB)], [X(XK + 3), Z(ZB - RB)]], A.contour));
    out.push(h.ligne(X(XK - 3), Z(ZK), X(XK + 3), Z(ZK), A.detail));
    out.push(h.ligne(X(-150), Z(ZB + 70), X(420), Z(ZB + 70), A.fin), h.ligne(X(250), Z(ZB - 60), X(1150), Z(ZB - 60), A.fin));
    // le trait qu'on ne donne pas : entre les X, en tireté
    out.push(h.ligne(X(500), Z(ZB + RB), X(500), Z(ZB + RB - 110), A.cache));
    // le bout qui pend
    const fx = X(XB1) + 16;
    out.push(h.fleche(`M${f(fx)} ${f(Z(ZB - 30))} Q${f(fx + 7)} ${f(Z(ZB - 110))} ${f(fx + 2)} ${f(Z(ZB - 200))}`));
    // le haut des jambes côté scieur passe devant la bille ; la ligature de la croisée, par la tranche
    for (const x of XS) {
      out.push(bandeJambe(x, ZB - RB - 20, ZH));
      out.push(h.ellipse(X(x), Z(ZH), R * s, 20 * s, W(A.arete)));
      out.push(rect(x - R - 6, x + R + 6, ZC - 80, ZC + 80, W(A.detail)));
      for (const dz of [-60, -40, -20, 0, 20, 40, 60]) out.push(h.ligne(X(x - R - 6), Z(ZC + dz), X(x + R + 6), Z(ZC + dz), A.fin));
    }
    // la traverse basse et la diagonale, côté scieur, devant les jambes
    out.push(rect(tra0[0], tra1[0], tra0[2] - RT, tra0[2] + RT, W(A.arete)));
    out.push(h.ellipse(X(tra1[0]), Z(tra0[2]), 4, RT * s, W(A.detail)));
    const nD = [-dgU[2], dgU[0]];
    const dq = [[dgA, 1], [dgB, 1], [dgB, -1], [dgA, -1]].map(([p, sg]) => [X(p[0] + sg * nD[0] * RT), Z(p[2] + sg * nD[1] * RT)]);
    out.push(h.chemin(dq, W(A.arete), true));
    // les tours de corde aux jonctions
    const toursV = (x, zc, rr) => [-1, 1].map(sg => [0, 9, 18].map(k => h.ligne(X(x + sg * (R + 10 + k)), Z(zc - rr), X(x + sg * (R + 10 + k)), Z(zc + rr), A.detail)).join('\n')).join('\n');
    for (const x of XS) out.push(toursV(x, tra0[2], RT + 3));
    for (const [c, x] of [[dg0, XS[0]], [dg1, XS[1]]]) {
      out.push([-1, 1].map(sg => [0, 9, 18].map(k => {
        const px = c[0] + sg * (R + 10 + k), pz = c[2] + dgU[2] / dgU[0] * (px - c[0]);
        return h.ligne(X(px - nD[0] * (RT + 3)), Z(pz - nD[1] * (RT + 3)), X(px + nD[0] * (RT + 3)), Z(pz + nD[1] * (RT + 3)), A.detail);
      }).join('\n')).join('\n'));
    }
    return out.join('\n');
  };

  // du bout : on regarde le bout qu'on scie ; le scieur à gauche, face à la bille
  const YMIN = -960, YMAX = 520;
  const repBout = z => {
    const s = echelle2(z), gy = sol(z), ox = (z.l - (YMAX - YMIN) * s) / 2 - YMIN * s;
    return { s, gy, Y: y => ox + y * s, Z: zz => gy - zz * s };
  };
  const YSC = -780;   // les pieds du scieur
  const dessinBout = z => {
    const { s, gy, Y, Z } = repBout(z), out = [];
    const q = p => [Y(p[1]), Z(p[2])];
    out.push(h.ligne(0, gy, z.l, gy, A.arete));
    out.push(h.ligne(0, Z(ZB), Y(YSC - 140), Z(ZB), rappel));
    // le second X, qui cache le premier (la diagonale, parallèle à une jambe, se confondrait avec elle)
    const jambe = sg => {
      const d = dirJ(sg), nn = [0, d[2], -d[1]];
      const pied = surJ(XS[1], sg, 0), haut = surJ(XS[1], sg, ZH);
      const dy = R / C30;
      return h.chemin([[Y(pied[1] - dy), Z(0)], [Y(pied[1] + dy), Z(0)], q(add3(haut, mul3(nn, sg * R))), q(add3(haut, mul3(nn, -sg * R)))], W(A.arete), true);
    };
    out.push(jambe(1), jambe(-1));
    // la ligature de la croisée : deux faisceaux de tours croisés
    const lig = [];
    lig.push(h.chemin([[Y(-18), Z(ZC - 80)], [Y(18), Z(ZC - 80)], [Y(18), Z(ZC + 80)], [Y(-18), Z(ZC + 80)]], W(A.detail), true));
    for (const y of [-6, 6]) lig.push(h.ligne(Y(y), Z(ZC - 80), Y(y), Z(ZC + 80), A.fin));
    lig.push(h.chemin([[Y(-46), Z(ZC - 18)], [Y(46), Z(ZC - 18)], [Y(46), Z(ZC + 18)], [Y(-46), Z(ZC + 18)]], W(A.detail), true));
    for (const dz of [-6, 6]) lig.push(h.ligne(Y(-46), Z(ZC + dz), Y(46), Z(ZC + dz), A.fin));
    out.push(lig.join('\n'));
    // la traverse basse, par le bout
    out.push(h.cercle(Y(tra1[1]), Z(tra1[2]), RT * s, W(A.arete)), h.cercle(Y(tra1[1]) + 0.5, Z(tra1[2]), RT * s * 0.45, A.fin));
    // la sciotte : lame dans le trait, cadre en arc ; la poignée au bout proche, du côté du scieur,
    // en dehors de la jambe du X, pour que la main ne se mêle pas au chevalet.
    // Le scieur, debout, le dos droit, la main proche fermée sur la poignée (main de la
    // bibliothèque, vue du dos) ; l'autre main, derrière elle, ne se voit pas.
    const YP = -505, PG = [YP, 1000], g = [Y(PG[0]), Z(PG[1])], RAD = Math.PI / 180;
    let ang = 30, mn, pers, u;
    for (let it = 0; it < 6; it++) {
      mn = h.formes.main({ x: g[0], y: g[1], pose: 'prise', vue: 'dos', echelle: s, diametre: 30 * s, angle: ang, bras: 80 });
      u = [Math.cos(ang * RAD), Math.sin(ang * RAD)];
      const w = [mn.poignet[0] - u[0] * 45 * s, mn.poignet[1] - u[1] * 45 * s];
      pers = h.formes.personnage({ x: Y(YSC), y: gy, pose: 'debout', echelle: s, penche: 4, mains: { proche: w, loin: [w[0] - 1.5, w[1] - 2] } });
      const d = [pers.mains.proche[0] - pers.poignets.proche[0], pers.mains.proche[1] - pers.poignets.proche[1]];
      ang = Math.atan2(d[1], d[0]) / RAD;
    }
    // le montant de la poignée suit l'axe de la main ; en mm : a = (dy, dz) par mm de hauteur
    const ax = [mn.trou.axe[0], -mn.trou.axe[1]], surAxe = zz => [PG[0] + ax[0] / ax[1] * (zz - PG[1]), zz];
    const B0 = surAxe(ZK + 11), T0 = surAxe(ZK + 200);
    const lame = [[B0[0] + 6, ZK + 22], [400, ZK + 22], [400, ZK], [B0[0] + 6, ZK]].map(([y, zz]) => [Y(y), Z(zz)]);
    out.push(h.chemin(lame, W(A.detail), true));
    const dents = [];
    for (let y = B0[0] + 16; y <= 388; y += 22) dents.push([Y(y), Z(ZK)], [Y(y + 11), Z(ZK - 7)]);
    out.push(h.chemin(dents, A.fin));
    const cadre = [B0, PG, T0, [-300, ZK + 318], [-110, ZK + 362], [120, ZK + 350], [300, ZK + 285], [392, ZK + 160], [408, ZK - 8]].map(([y, zz]) => [Y(y), Z(zz)]);
    out.push(bande(cadre, 24 * s, A.detail));
    // la poignée : plus grosse que le cadre, sous la main
    const pg0 = surAxe(ZK + 24), pg1 = surAxe(PG[1] + 65);
    out.push(bande([pg0, pg1].map(([y, zz]) => [Y(y), Z(zz)]), 34 * s, A.detail));
    out.push(pers, mn);
    // la bille, par le bout : elle cache la lame et le bas des mains
    out.push(h.cercle(Y(0), Z(ZB), RB * s, W(A.contour)));
    out.push(h.cercle(Y(0), Z(ZB), (RB - 9) * s, A.fin));
    for (const [rho, dy, dz] of [[92, 5, -4], [60, 3, -2], [30, 2, 0]]) out.push(h.cercle(Y(dy), Z(ZB + dz), rho * s, A.fin));
    out.push(h.cercle(Y(2), Z(ZB), 1.2, A.plein));
    // la lame, cachée par la bille
    const yin = Math.sqrt(RB * RB - (ZK - ZB) ** 2);
    out.push(h.ligne(Y(-yin), Z(ZK), Y(yin), Z(ZK), A.cache));
    return { svg: out.join('\n'), pers };
  };

  // ── la croisée, de face et en coupe ──
  const DL = 150;          // longueur de perche montrée de part et d'autre de la croisée
  const repDet = z => {
    const s = Math.min((z.l - 20) / 330, (z.h - 14) / 470);
    const cx = z.l / 2, cy = 8 + 150 * s + 4, sx = z.l / 2, sy = z.h - 8 - 62 * s;
    return { s, cx, cy, sx, sy };
  };
  const dessinDet = z => {
    const { s, cx, cy, sx, sy } = repDet(z), out = [];
    const F = (y, zz) => [cx + y * s, cy - zz * s];     // de face : y à droite, z vers le haut, la croisée au centre
    const perche = sg => {
      const u = [sg * S30, C30], n = [C30, -sg * S30];
      const pt = (t, k) => F(t * u[0] + k * R * n[0], t * u[1] + k * R * n[1]);
      const casse = t => { const pts = []; for (let i = 0; i <= 6; i++) { const k = -1 + i / 3; pts.push(pt(t + (i % 2 ? 7 : -7), k)); } return pts; };
      const c1 = casse(DL), c0 = casse(-DL).reverse();
      return [h.chemin([...c1, ...c0], A.blanc, true), h.chemin([pt(-DL - 7, 1), pt(DL - 7, 1)], A.arete), h.chemin([pt(-DL - 7, -1), pt(DL - 7, -1)], A.arete),
        h.chemin(c1, A.detail), h.chemin(c0, A.detail), h.chemin([pt(-DL + 20, 0.55), pt(DL - 30, 0.55)], A.fin)].join('\n');
    };
    // le trait de la coupe, le long de la perche qui passe dessous
    const uA = [S30, C30], nA = [C30, -S30];
    const e0 = F(-(DL + 26) * uA[0], -(DL + 26) * uA[1]), e1 = F((DL + 26) * uA[0], (DL + 26) * uA[1]);
    out.push(h.ligne(...e0, ...e1, axeTrait));
    for (const e of [e0, e1]) {
      const dirE = [e[0] - (e0[0] + e1[0]) / 2, e[1] - (e0[1] + e1[1]) / 2], Le = Math.hypot(...dirE), ue = [dirE[0] / Le, dirE[1] / Le];
      out.push(h.ligne(e[0] - ue[0] * 12, e[1] - ue[1] * 12, e[0], e[1], A.contour));
      // la flèche du sens de vue : vers le bas, à droite de la perche
      const pn = [nA[0], nA[1]];   // (y, z) → écran : y à droite, z vers le haut
      const v = [pn[0], -pn[1]];
      const b = [e[0] - ue[0] * 6, e[1] - ue[1] * 6];
      out.push(h.chemin([[b[0] - v[0] * 0 - ue[0] * 0, b[1]], [b[0] + v[0] * 14, b[1] + v[1] * 14]], A.detail));
      out.push(h.chemin([[b[0] + v[0] * 14 + ue[0] * 4 - v[0] * 5, b[1] + v[1] * 14 + ue[1] * 4 - v[1] * 5], [b[0] + v[0] * 14, b[1] + v[1] * 14], [b[0] + v[0] * 14 - ue[0] * 4 - v[0] * 5, b[1] + v[1] * 14 - ue[1] * 4 - v[1] * 5]], A.plein, true));
    }
    out.push(perche(1), perche(-1));
    // les tours de corde : un faisceau pincé dans les fourches du haut et du bas, un autre dans celles des côtés
    const ep = 9 * s;
    for (const c of [-21, -7, 7, 21]) out.push(bande([F(c * 0.35, -78), F(c, -30), F(c, 30), F(c * 0.35, 78)], ep));
    for (const d of [-14, 0, 14]) out.push(bande([F(-44, d * 0.4), F(-20, d), F(20, d), F(44, d * 0.4)], ep));
    // la coupe, le long de la perche : l'une entaillée de moitié par-dessus, l'autre de moitié par-dessous
    const Cp = (u, x) => [sx + u * s, sy - x * s];
    const L2 = 150, wn = R / Math.sin(Math.PI / 3);
    const zig = (u0, sens) => { const pts = []; for (let i = 0; i <= 6; i++) { const x = R - i * (2 * R / 6); pts.push(Cp(u0 + (i % 2 ? 7 : -7) * sens, x)); } return pts; };
    const gauche = zig(-L2, 1), droite = zig(L2, -1);        // du dessus vers le dessous
    const polyA2 = [...gauche, ...droite.slice().reverse(), Cp(wn, R), Cp(wn, 0), Cp(-wn, 0), Cp(-wn, R)];
    out.push(h.chemin(polyA2, A.hachure('bois'), true));
    // l'autre perche, coupée en biais : sa moitié avant, dans l'entaille ; hachure tournée
    const [bx, by] = Cp(0, 0);
    const demi = Array.from({ length: 33 }, (_, i) => { const t = Math.PI * i / 32; return Cp(wn * Math.cos(t), R * Math.sin(t)); });
    out.push(`<defs><pattern id="h-bois-contre-24-03" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)"><line x1="0" y1="0" x2="0" y2="6" stroke="${NOIR}" stroke-width="0.7"/></pattern></defs>`);
    out.push(h.chemin(demi, `fill="url(#h-bois-contre-24-03)" stroke="${NOIR}" stroke-width="1.4" stroke-linejoin="round"`, true));
    // les tours de corde, coupés, sur les deux faces
    for (let u = -55; u <= 55; u += 11) out.push(h.cercle(...Cp(u, R + 5.5), 5.5 * s, A.plein), h.cercle(...Cp(u, -R - 5.5), 5.5 * s, A.plein));
    return { svg: out.join('\n'), F, Cp, wn };
  };

  return {
    ref: '24-03',
    titre: 'Le chevalet de sciage',
    desc: 'Le chevalet de sciage en vue d’ensemble : deux X de perches, chacun assemblé à mi-bois et lié à la croisée, reliés par une traverse basse et une perche en diagonale, la bille couchée dans les deux fourches du haut, le trait de scie entamé sur le bout qui dépasse. De côté, le même chevalet : le trait est donné à l’extérieur du second X, le bout libre pend et le trait s’ouvre ; en tireté, entre les X, le trait qui pincerait la lame. Du bout, à la même échelle, le scieur debout, le dos droit, la main fermée sur la poignée de la sciotte, la bille à la hauteur de sa hanche. En détail, la croisée de face avec ses tours de corde croisés, et sa coupe le long d’une perche : chaque perche entaillée de la moitié de son épaisseur, les deux ensemble de l’épaisseur d’une seule.',
    format: 'pleine',
    disposition: [['axo', 'detail'], ['cote', 'bout']],
    hauteurs: [9, 10],
    largeurs: [[13, 7], [2290, 1480]],
    vues: {
      axo: {
        titre: 'Le chevalet monté',
        dessin: z => dessinAxo(z),
        renvois: z => {
          const P = repAxo(z);
          return [
            { n: 1, rond: [P([XS[0], -300, 1200])[0] - 30, P([XS[0], -300, 1200])[1]], cible: P(surJ(XS[0], -1, 380)), texte: 'deux paires de perches croisées en X' },
            { n: 2, rond: [P([XS[1], 0, ZC])[0] + 60, P([XS[1], 0, ZC])[1] + 34], cible: P([XS[1] + R + 6, 30, ZC]), texte: 'la croisée à mi-bois, liée' },
            { n: 3, rond: [P(tra0)[0] + 14, P(tra0)[1] + 34], cible: P([200, tra0[1], tra0[2] - RT + 6]), texte: 'traverse basse' },
            { n: 4, rond: [P(add3(dg0, mul3(dgU, 500)))[0] - 26, P(add3(dg0, mul3(dgU, 500)))[1] + 40], cible: P(add3(add3(dg0, mul3(dgU, 500)), [0, -RT + 8, 0])), texte: 'diagonale : les X ne s’écartent pas' },
            { n: 5, rond: [P([400, 0, ZB + RB])[0], P([400, 0, ZB + RB])[1] - 30], cible: P([400, -40, ZB + RB - 10]), texte: 'la bille, couchée dans les deux X' },
          ];
        },
      },
      detail: {
        titre: 'La croisée, de face et en coupe',
        dessin: z => dessinDet(z).svg,
        renvois: z => {
          const { F, Cp, wn } = dessinDet(z);
          return [
            { n: 6, rond: [F(0, 0)[0] + 82, F(0, 0)[1] - 30], cible: F(38, 5), texte: 'tours de corde croisés dans les fourches' },
            { n: 7, rond: [Cp(-112, 0)[0], Cp(0, R)[1] - 24], cible: Cp(-wn + 8, 3), texte: 'chaque perche entaillée à mi-épaisseur' },
            { n: 8, rond: [Cp(112, 0)[0], Cp(0, R)[1] - 24], cible: Cp(12, 20), texte: 'les deux ensemble : une seule épaisseur' },
          ];
        },
      },
      cote: {
        titre: 'De côté',
        dessin: z => dessinCote(z),
        renvois: z => {
          const { X, Z } = repCote(z);
          return [
            { n: 9, rond: [X(XK) - 8, Z(ZB + RB) - 34], cible: [X(XK) + 1, Z(ZB + RB) - 2], texte: 'couper hors des appuis : le trait s’ouvre' },
            { n: 10, rond: [X(330), Z(ZB + RB) - 34], cible: [X(500) - 1, Z(ZB + RB) - 1], texte: 'entre les X, le trait pincerait la lame' },
          ];
        },
      },
      bout: {
        titre: 'Du bout, à la même échelle',
        dessin: z => dessinBout(z).svg,
        renvois: z => {
          const { Y, Z } = repBout(z);
          const { pers } = dessinBout(z);
          return [
            { n: 11, rond: [Y(330), Z(ZB) + 6], cible: [Y(RB * 0.7), Z(ZB - RB * 0.7)], texte: 'la bille à hauteur de hanche' },
            { n: 12, rond: [12, Z(1640)], cible: [Y(YSC - 116), Z(1300)], texte: 'on scie debout, le dos droit' },
          ];
        },
      },
    },
  };
};
