// Planche 47-02 — l'affût et les appelants (ch. 47, étapes 31 et 32 ; appelant de fortune : étape 32
// et ch. 54, « Quand il n'y a plus de cartouches »).
// Aucune cote : le chapitre ne donne ni la taille de la cache ni la distance des appelants, seulement
// la portée du tir. Deux plans (le C et le J), l'affût de côté dans le sens du vent, et l'appelant
// de fortune. Le vent souffle partout de gauche à droite : du dos du chasseur vers les appelants.
// Refaite le 13 octobre 2026 : le chasseur est le corps simple de profil (assis au fond du canot ;
// le buste de face est sorti, JP ne veut plus de corps de face). La charte : la coque à 2,4 avec sa
// face à l'ombre ; un seul rouge, le cercle du trou à garder à portée (étape 32). Les flèches du vent
// et de l'arrivée des oiseaux restent noires.

module.exports = (h) => {
  const f = v => Math.round(v * 10) / 10;
  const P = p => `${f(p[0])},${f(p[1])}`;
  const blanc = a => a.replace('fill="none"', 'fill="#FFFFFF"');
  const gen = s => { let g = s; return () => (g = (g * 16807) % 2147483647) / 2147483647; };

  // Catmull-Rom en Bézier : une courbe lisse qui passe par les points.
  const cr = (pts, debut = true) => {
    let d = debut ? `M${P(pts[0])}` : '';
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      d += ` C${P([p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6])} ${P([p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6])} ${P(p2)}`;
    }
    return d;
  };
  const crFerme = pts => {
    const n = pts.length; let d = `M${P(pts[0])}`;
    for (let i = 0; i < n; i++) {
      const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
      d += ` C${P([p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6])} ${P([p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6])} ${P(p2)}`;
    }
    return d + ' Z';
  };
  // Échantillonne une courbe de Catmull-Rom ; garde ce qui est dans le cadre (x >= 0).
  const echant = (pts, pas = 8) => {
    const out = [pts[0]];
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6], c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      for (let k = 1; k <= pas; k++) { const t = k / pas, u = 1 - t; out.push([0, 1].map(j => u * u * u * p1[j] + 3 * u * u * t * c1[j] + 3 * u * t * t * c2[j] + t * t * t * p2[j])); }
    }
    return out;
  };
  const garde = pts => {
    const out = [], coupe = (q, p) => [0, q[1] + (0 - q[0]) / (p[0] - q[0]) * (p[1] - q[1])];
    pts.forEach((p, i) => {
      const q = pts[i - 1];
      if (p[0] >= 0) { if (q && q[0] < 0) out.push(coupe(q, p)); out.push(p); }
      else if (q && q[0] >= 0) out.push(coupe(q, p));
    });
    return out;
  };
  // Repère local : origine, échelle, angle (rad), miroir (regard vers la gauche).
  const rep = (ox, oy, s, ang = 0, mir = false) => ([x, y]) => {
    const X = mir ? -x : x, c = Math.cos(ang), sn = Math.sin(ang);
    return [ox + s * (X * c - y * sn), oy + s * (X * sn + y * c)];
  };

  // ── Le canard de profil, posé sur l'eau (regard vers +x, flottaison en y = 0, 122 de long) ──
  const canardPose = T => {
    const Q = a => a.map(T);
    const d = cr(Q([[-40, 0], [-47, -5], [-52, -12], [-38, -20], [-20, -27], [0, -29], [18, -28], [27, -32], [30, -42], [32, -50], [38, -56], [46, -56], [52, -52], [55, -48]]))
      + ` L${P(T([63, -45.5]))} L${P(T([70, -43]))} L${P(T([67, -41]))} L${P(T([57, -41.5]))} L${P(T([53, -41]))}`
      + cr(Q([[53, -41], [47, -36], [44, -28], [48, -19], [47, -9], [43, -3], [40, 0]]), false) + ' Z';
    const o = T([47.5, -49.5]), r = Math.hypot(...[0, 1].map(i => T([1.4, 0])[i] - T([0, 0])[i]));
    return [
      h.path(d, blanc(h.a.arete)),
      h.path(cr(Q([[33, -15], [12, -14], [-14, -15], [-34, -14], [-47, -11]])), h.a.detail),     // bord de l'aile pliée
      h.path(cr(Q([[-14, -24], [-30, -19], [-44, -13]])), h.a.fin),                              // les tertiaires
      h.path(`M${P(T([55, -48]))} L${P(T([53, -41]))}`, h.a.fin),                                // base du bec
      h.cercle(o[0], o[1], r, h.a.plein),
    ].join('\n');
  };

  // ── Le canard qui se pose : ailes levées et creusées, pattes tendues (regard vers +x) ──
  const canardVol = T => {
    const Q = a => a.map(T);
    const aileLoin = crFerme(Q([[22, -12], [22, -32], [16, -50], [6, -64], [-4, -72], [-10, -66], [-10, -50], [-4, -32], [6, -14]]));
    const corps = cr(Q([[-48, 2], [-36, -5], [-15, -9], [10, -10], [24, -11], [32, -15], [36, -21], [42, -25], [49, -24], [53, -20]]))
      + ` L${P(T([61, -17.5]))} L${P(T([66, -16]))} L${P(T([62, -14.2]))} L${P(T([55, -14.5]))} L${P(T([51, -14]))}`
      + cr(Q([[51, -14], [45, -9], [41, -3], [36, 3], [24, 8], [0, 10], [-24, 8], [-40, 6], [-48, 2]]), false) + ' Z';
    // l'aile proche : bord d'attaque arrondi, pointe en rémiges écartées, bord de fuite creusé
    const aile = cr(Q([[18, -9], [17, -28], [10, -46], [-2, -60], [-18, -70]]))
      + ` L${P(T([-26, -72]))} L${P(T([-22, -66]))} L${P(T([-31, -66]))} L${P(T([-26, -60]))} L${P(T([-34, -58]))} L${P(T([-28, -53]))}`
      + cr(Q([[-28, -53], [-32, -44], [-28, -32], [-18, -20], [-4, -11]]), false) + ' Z';
    const pied = (a, b, c) => `M${P(T(a))} L${P(T(b))} L${P(T(c))} L${P(T([c[0] - 3, c[1] + 4]))} L${P(T(b))}`;
    const o = T([45.5, -20]), r = Math.hypot(...[0, 1].map(i => T([1.4, 0])[i] - T([0, 0])[i]));
    return [
      h.path(aileLoin, blanc(h.a.detail)),
      h.path(pied([4, 8], [12, 21], [21, 22]), blanc(h.a.detail)),
      h.path(pied([-4, 9], [3, 23], [12, 24]), blanc(h.a.detail)),
      h.path(corps, blanc(h.a.arete)),
      h.path(aile, blanc(h.a.arete)),
      h.path(cr(Q([[4, -40], [-10, -52], [-24, -60]])), h.a.fin),
      h.path(cr(Q([[8, -24], [-8, -34], [-24, -44]])), h.a.fin),
      h.path(`M${P(T([53, -20]))} L${P(T([51, -14]))}`, h.a.fin),
      h.cercle(o[0], o[1], r, h.a.plein),
    ].join('\n');
  };

  // ── L'appelant vu de dessus (regard vers +x, 21 de long à l'échelle 1) ──
  const appelantDessus = (x, y, s, ang) => {
    const T = rep(x, y, s, ang);
    return [
      h.path(crFerme([[-9.5, 0], [-6, -3.8], [0, -4.6], [5, -3.8], [7.4, 0], [5, 3.8], [0, 4.6], [-6, 3.8]].map(T)), blanc(h.a.detail)),
      h.path(crFerme([[4.2, 0], [7, -3.2], [10, 0], [7, 3.2]].map(T)), blanc(h.a.detail)),
      h.path(`M${P(T([9.7, -1.3]))} L${P(T([13.4, -0.9]))} L${P(T([13.4, 0.9]))} L${P(T([9.7, 1.3]))}`, blanc(h.a.fin)),
    ].join('\n');
  };

  // ── Le canot vu de dessus ──
  const canotDessus = (x0, x1, y, w) => {
    const L = x1 - x0, k = 1.33;
    const coque = `M${P([x0, y])} C${P([x0 + 0.3 * L, y - w * k])} ${P([x1 - 0.3 * L, y - w * k])} ${P([x1, y])} C${P([x1 - 0.3 * L, y + w * k])} ${P([x0 + 0.3 * L, y + w * k])} ${P([x0, y])} Z`;
    const wi = w * 0.72, a = x0 + L * 0.05, b = x1 - L * 0.05;
    const dedans = `M${P([a, y])} C${P([a + 0.3 * L, y - wi * k])} ${P([b - 0.3 * L, y - wi * k])} ${P([b, y])} C${P([b - 0.3 * L, y + wi * k])} ${P([a + 0.3 * L, y + wi * k])} ${P([a, y])} Z`;
    const xm = x0 + L * 0.5;
    return [h.path(coque, blanc(h.a.arete)), h.path(dedans, h.a.fin), h.ligne(xm, y - wi * 0.98, xm, y + wi * 0.98, h.a.detail)].join('\n');
  };

  // ── Une branche plantée vue de dessus : une touffe festonnée ──
  const touffe = (cx, cy, r, rnd) => {
    const n = 8, pts = [];
    for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2 + rnd() * 0.3, rr = r * 0.78 * (0.9 + rnd() * 0.2); pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, a]); }
    let d = `M${P(pts[0])}`;
    for (let i = 0; i < n; i++) { const p = pts[i], q = pts[(i + 1) % n]; let am = (p[2] + q[2] + (i === n - 1 ? Math.PI * 2 : 0)) / 2; d += ` Q${P([cx + Math.cos(am) * r * 1.3, cy + Math.sin(am) * r * 1.3])} ${P(q)}`; }
    const tr = [];
    for (let i = 0; i < 4; i++) { const a = rnd() * Math.PI * 2, l = r * 0.45; tr.push(`M${P([cx, cy])} L${P([cx + Math.cos(a) * l, cy + Math.sin(a) * l])}`); }
    return h.path(d + " Z", blanc(h.a.detail)) + '\n' + h.path(tr.join(' '), h.a.fin);
  };

  // ── La quenouillère vue de dessus : un champ de feuilles, le bord irrégulier ──
  const quenouillereDessus = (z, xBord, seed) => {
    const rnd = gen(seed), out = [];
    const bord = []; for (let y = 0; y <= z.h + 12; y += 12) bord.push([xBord + (rnd() - 0.5) * 10, Math.min(y, z.h)]);
    const xb = y => { for (let i = 0; i < bord.length - 1; i++) if (y >= bord[i][1] && y <= bord[i + 1][1]) { const t = (y - bord[i][1]) / (bord[i + 1][1] - bord[i][1] || 1); return bord[i][0] + t * (bord[i + 1][0] - bord[i][0]); } return xBord; };
    for (let k = 0; k < z.h * xBord / 50; k++) {
      const y = 3 + rnd() * (z.h - 6), xm = xb(y) - 4, x = 2 + rnd() * (xm - 2);
      const a = -Math.PI / 2 + (rnd() - 0.5) * 1.6, l = 4 + rnd() * 4;
      out.push(`M${P([x, y])} L${P([Math.max(1, x + Math.cos(a) * l), Math.max(1, y + Math.sin(a) * l)])}`);
    }
    return h.path(out.join(' '), h.a.fin) + '\n' + h.path(cr(bord), h.a.detail);
  };

  // Le vent : deux flèches parallèles.
  const vent = (x, y, l) => [h.fleche(`M${f(x)},${f(y)} h${f(l)}`), h.fleche(`M${f(x + 12)},${f(y + 9)} h${f(l)}`)].join('\n');

  // Un plan du plan d'eau : quenouillère à gauche, affût, appelants à découvert à droite.
  const plan = (z, forme) => {
    const out = [];
    out.push(quenouillereDessus(z, z.l * 0.2, forme === 'C' ? 7 : 11));
    const rw = gen(forme === 'C' ? 3 : 5);
    for (let k = 0; k < 6; k++) { const x = z.l * (0.4 + rw() * 0.5), y = z.h * (0.12 + rw() * 0.8); out.push(h.path(`M${f(x)},${f(y)} q3,-2 6,0 q3,2 6,0`, h.a.fin)); }
    const yc = z.h * 0.52;
    const x0 = z.l * 0.03, x1 = z.l * 0.33;
    out.push(canotDessus(x0, x1, yc, 7));
    // branches plantées autour de la pince et le long des flancs
    const rb = gen(forme === 'C' ? 21 : 23);
    const br = [[x1 + 5, yc], [x1 - 8, yc - 12], [x1 - 8, yc + 12], [x1 - 22, yc - 13], [x1 - 22, yc + 13], [x1 - 36, yc - 12], [x1 - 36, yc + 12]];
    br.forEach(([x, y]) => out.push(touffe(x, y, 7, rb)));
    // les appelants, bec au vent (vers la gauche)
    const ra = gen(forme === 'C' ? 31 : 37), A = [];
    let trou, R;
    const arc = (t0, t1, n, rr) => { for (let i = 0; i < n; i++) { const t = (t0 + (t1 - t0) * i / (n - 1)) * Math.PI / 180; A.push([trou[0] + rr * Math.cos(t) + (ra() - 0.5) * 3, trou[1] + rr * Math.sin(t) + (ra() - 0.5) * 3]); } };
    if (forme === 'C') {
      R = z.l * 0.2; trou = [z.l * 0.68, yc];
      arc(-50, -310, 13, R);
      arc(-110, -250, 4, R + 13);
    } else {
      R = z.l * 0.16; trou = [z.l * 0.62, yc + 12];
      arc(-90, -300, 10, R);
      for (let i = 1; i <= 6; i++) A.push([trou[0] + i * 16 + (ra() - 0.5) * 3, trou[1] - R - i * 2.2 + (ra() - 0.5) * 3]);
    }
    A.forEach(([x, y]) => out.push(appelantDessus(x, y, 0.85, Math.PI + (ra() - 0.5) * 0.35)));
    // l'arrivée des oiseaux, face au vent, par l'ouverture
    const xe = z.l - 4;
    if (forme === 'C') {
      out.push(h.fleche(`M${f(xe)},${f(yc - z.h * 0.34)} C${f(z.l * 0.9)},${f(yc - z.h * 0.2)} ${f(trou[0] + 30)},${f(yc - 6)} ${f(trou[0] + 6)},${f(yc - 3)}`, h.a.cache));
      out.push(h.fleche(`M${f(xe)},${f(yc + z.h * 0.3)} C${f(z.l * 0.9)},${f(yc + z.h * 0.18)} ${f(trou[0] + 30)},${f(yc + 8)} ${f(trou[0] + 8)},${f(yc + 5)}`, h.a.cache));
    } else {
      out.push(h.fleche(`M${f(xe)},${f(trou[1] + z.h * 0.3)} C${f(z.l * 0.92)},${f(trou[1] + z.h * 0.15)} ${f(trou[0] + 30)},${f(trou[1] + 2)} ${f(trou[0] + 6)},${f(trou[1])}`, h.a.cache));
    }
    out.push(vent(z.l * 0.34, 10, z.l * 0.34));
    // le point à contrôler (étape 32) : le trou doit rester à portée de l'affût — en C seulement
    if (forme === 'C') out.push(h.controle(trou[0] - 4, trou[1] + 2, R * 0.3));
    return { svg: out.join('\n'), yc, x0, x1, trou, R, A };
  };

  // ── L'affût de côté ──
  // une touffe de quenouilles : trois feuilles en lame, et l'épi (le « cigare ») sur sa tige
  const quenouilleCote = (x, yb, ht, rnd, S, epi = true) => {
    const out = [];
    for (let i = 0; i < 3; i++) {
      const lh = ht * (0.72 + rnd() * 0.3), pen = (rnd() - 0.5) * ht * 0.4, casse = rnd() < 0.3;
      const pts = casse ? [[x, yb], [x + pen * 0.3, yb - lh * 0.55], [x + pen * 0.8, yb - lh * 0.9], [x + pen * 1.3 + (pen > 0 ? 7 : -7), yb - lh * 0.78]]
        : [[x, yb], [x + pen * 0.25, yb - lh * 0.5], [x + pen, yb - lh]];
      out.push(h.path(cr(pts.map(([a, b]) => [Math.max(1, a), b])), h.a.detail));
    }
    if (epi) {
      const top = yb - ht * (0.78 + rnd() * 0.15), lean = (rnd() - 0.5) * 8, le = S * 0.16, ep = Math.max(4, S * 0.035);
      out.push(h.path(`M${f(x)},${f(yb)} Q${f(x + lean * 0.2)},${f((yb + top) / 2)} ${f(x + lean)},${f(top)}`, h.a.detail));
      out.push(h.rect(x + lean - ep / 2, top + 4, ep, le, h.a.plein + ` rx="${f(ep / 2)}"`));
      out.push(h.path(`M${f(x + lean)},${f(top + 4)} L${f(x + lean * 1.04)},${f(top - le * 0.5)}`, h.a.fin));
    }
    return out.join('\n');
  };
  // un sapin coupé, planté debout : la tige jusque dans la vase, les rameaux qui pendent, les aiguilles
  const brancheCote = (x, yb, yt, larg, rnd, nu) => {
    const tige = `M${f(x)},${f(yb)} L${f(x)},${f(yt)}`, ram = [];
    const yf = yt + (yb - yt) * (1 - nu);
    let cote = 1;
    for (let y = yt + 5; y < yf; y += 6) {
      const t = (y - yt) / (yf - yt), l = larg * (0.25 + 0.75 * t) * (0.8 + rnd() * 0.3);
      const ex = x + cote * l, ey = y + l * 0.35;
      ram.push(`M${f(x)},${f(y)} Q${f(x + cote * l * 0.5)},${f(y - 1.5)} ${f(ex)},${f(ey)}`);
      for (let s = 0.28; s < 0.95; s += 0.18) {
        const bx = x + cote * l * s, by = y + l * 0.35 * s * s - 0.5;
        ram.push(`M${f(bx)},${f(by)} l${f(cote * 2.4)},${f(2.8)} M${f(bx)},${f(by)} l${f(cote * 0.6)},${f(-2.6)}`);
      }
      cote = -cote;
    }
    return h.path(tige, h.a.detail) + '\n' + h.path(ram.join(' '), h.a.fin);
  };

  const cote = z => {
    const out = [];
    const S = Math.min(z.l / 5.3, (z.h - 34) / 1.95);
    const yw = z.h - 0.42 * S - 16, ym = yw + 0.42 * S;
    const X = m => (m - 1.3) * S, Y = m => yw + m * S;
    const rq = gen(41), rb = gen(43), rl = gen(47);
    // l'eau et la vase
    out.push(h.rect(0, yw, z.l, ym - yw, h.a.hachure('eau', 'aucun')));
    out.push(h.rect(0, ym, z.l, z.h - ym, h.a.hachure('terre', 'aucun')));
    out.push(h.ligne(0, ym, z.l, ym, h.a.detail));
    // la quenouillère, derrière le canot
    for (let m = 1.33; m < 2.0; m += 0.08) out.push(quenouilleCote(X(m) + rq() * 5, yw, S * (1.25 + rq() * 0.4), rq, S, rq() < 0.5));
    // le chasseur, assis au fond du canot, le regard vers les appelants : le corps simple de profil
    // (assis-sol, le dos redressé) ; le canot, peint après lui, cache tout ce qui est sous le plat-bord
    const xh = X(2.05);
    out.push(h.formes.corps({ x: xh, y: Y(0.09), pose: 'assis-sol', vue: 'profil', age: 'adulte', echelle: S / 1000,
      angles: { tronc: 4, cou: 10, tete: 2 } }).toString());
    // le canot
    const G = [[0, -0.55], [0.25, -0.36], [0.8, -0.25], [2.15, -0.21], [3.5, -0.25], [4.05, -0.36], [4.3, -0.55]].map(([a, b]) => [X(a), Y(b)]);
    const F = [[4.3, -0.55], [4.33, -0.4], [4.25, -0.15], [4.1, 0], [3.8, 0.1], [2.15, 0.13], [0.5, 0.1], [0.2, 0], [0.05, -0.15], [-0.03, -0.4], [0, -0.55]].map(([a, b]) => [X(a), Y(b)]);
    const Gc = garde(echant(G)), Fc = garde(echant(F));
    // la coque : le blanc, la face à l'ombre (le bas du flanc, la lumière venant d'en haut à gauche)
    const dCoque = 'M' + [...Gc, ...Fc].map(P).join(' L') + ' Z';
    out.push(`<clipPath id="coque-47-02"><path d="${dCoque}" fill="#FFFFFF"/></clipPath>`, h.path(dCoque, h.a.blanc),
      `<g clip-path="url(#coque-47-02)">${h.path(dCoque, h.a.ombre)}<path d="${dCoque}" transform="translate(-3 -7)" ${h.a.blanc}/></g>`);
    out.push(h.chemin(Fc, h.a.contour));
    const bordure = h.chemin(Gc, h.a.contour);
    out.push(h.ligne(0, yw, z.l, yw, h.a.detail));
    // quenouilles et herbes sèches couchées sur le plat-bord, les feuilles qui pendent sur le flanc
    const gw = m => Y(-0.21 - 0.04 * Math.pow((m - 2.15) / 1.8, 2) * 3.3);
    const m0 = 1.45, m1 = 3.85, haut = [], bas = [];
    for (let m = m0; m <= m1 + 1e-6; m += 0.12) { haut.push([X(m), gw(m) - S * (0.09 + rl() * 0.05)]); bas.push([X(m), gw(m)]); }
    out.push(h.path(cr(haut) + ` L${P(bas[bas.length - 1])}` + cr(bas.slice().reverse(), false) + ' Z', blanc(h.a.fin)));
    const lit = [];
    for (let m = m0; m < m1; m += 0.07) {
      const x = X(m), yg = gw(m), l = S * (0.45 + rl() * 0.35), dy = -S * (0.02 + rl() * 0.08);
      lit.push(`M${f(x - l / 2)},${f(yg + dy + 2)} q${f(l / 2)},${f(-3 - rl() * 3)} ${f(l)},${f(rl() * 4 - 1)}`);
    }
    for (let m = m0 + 0.1; m < m1; m += 0.22) {
      const x = X(m), yg = gw(m) + S * 0.01, sens = rl() < 0.5 ? 1 : -1;
      lit.push(`M${f(x)},${f(yg)} q${f(sens * S * 0.06)},${f(S * 0.05)} ${f(sens * S * (0.08 + rl() * 0.05))},${f(S * (0.12 + rl() * 0.08))}`);
    }
    out.push(bordure);
    out.push(h.path(lit.join(' '), h.a.detail));
    for (const [m, a] of [[1.6, -0.08], [2.75, 0.06], [3.35, -0.05]]) {
      const x = X(m), yg = gw(m) - S * 0.1, le = S * 0.16, ep = Math.max(4, S * 0.035);
      const T = rep(x, yg, 1, a);
      out.push(h.path(`M${P(T([-le * 1.4, 0]))} L${P(T([le * 1.6, 0]))}`, h.a.detail));
      out.push(h.path(crFerme([[-le / 2, 0], [-le / 2 + ep / 2, -ep / 2], [le / 2 - ep / 2, -ep / 2], [le / 2, 0], [le / 2 - ep / 2, ep / 2], [-le / 2 + ep / 2, ep / 2]].map(T)), h.a.plein));
    }
    // la quenouillère, devant la poupe
    for (let m = 1.35; m < 1.75; m += 0.1) out.push(quenouilleCote(X(m) + rq() * 5, yw + 3, S * (1.15 + rq() * 0.35), rq, S, rq() < 0.45));
    // les branches plantées dans la vase, le long du flanc et devant la pince
    [[2.45, 1.0, 0.3], [3.05, 1.15, 0.32], [3.65, 1.1, 0.3], [4.2, 1.2, 0.3], [4.6, 1.05, 0.28]]
      .forEach(([m, hm, lm]) => out.push(brancheCote(X(m), ym + 8, Y(-hm), S * lm, rb, 0.5)));
    // appelants, et l'oiseau qui arrive face au vent
    const s = S * 0.55 / 122;
    out.push(canardPose(rep(X(5.0), yw, s, 0, true)));
    out.push(canardPose(rep(X(6.3), yw, s, 0, true)));
    out.push(h.fleche(`M${f(z.l - 2)},${f(Y(-1.75))} Q${f(X(5.85))},${f(Y(-1.05))} ${f(X(5.6))},${f(yw - 4)}`, h.a.cache));
    const oiseau = [X(6.0), Y(-1.1)];
    out.push(canardVol(rep(oiseau[0], oiseau[1], s, 0.3, true)));
    out.push(vent(X(2.3), 8, S * 1.5));
    return { svg: out.join('\n'), S, X, Y, yw, ym, gw, oiseau };
  };

  // ── L'appelant de fortune ──
  const fortune = z => {
    const out = [];
    const yw = z.h * 0.5, ym = z.h * 0.74, s = (z.l - 14) / 124;
    const T = rep(z.l * 0.56, yw, s, 0, true);
    out.push(h.rect(0, yw, z.l, ym - yw, h.a.hachure('eau', 'aucun')));
    out.push(h.rect(0, ym, z.l, z.h - ym, h.a.hachure('terre', 'aucun')));
    out.push(h.ligne(0, ym, z.l, ym, h.a.detail));
    // le bâton fourchu : la tige plantée, la branche de la fourche qui passe derrière le cou
    const base = T([60, (ym - yw) / s + 42]), fourche = T([52, -27]);
    out.push(h.path(`M${P(base)} Q${P(T([60, 0]))} ${P(fourche)} L${P(T([56.5, -40]))}`, h.a.arete));
    out.push(canardPose(T));
    out.push(h.ligne(0, yw, z.l, yw, h.a.detail));
    // la branche de la fourche qui passe devant le cou
    out.push(h.path(`M${P(fourche)} L${P(T([37, -42]))}`, h.a.arete));
    return { svg: out.join('\n'), T, yw, ym, base, fourche };
  };

  return {
    ref: '47-02',
    titre: 'L’affût et les appelants',
    desc: 'Deux plans vus de dessus : le canot tiré dans le bord de la quenouillère, entouré de branches plantées, le vent dans le dos ; les appelants posés à découvert en C ou en J, avec un trou devant l’affût, ouvert sous le vent, où les oiseaux se posent en arrivant face au vent. De côté : le chasseur bas dans le canot, derrière des branches plantées dans la vase et des quenouilles couchées sur le plat-bord, et l’oiseau qui arrive de face.',
    format: 'pleine',
    disposition: [['planC', 'planJ'], ['cote']],
    hauteurs: [0.8, 0.8],
    largeurs: [[1, 1], [1]],
    vues: {
      planC: {
        titre: 'Vu de dessus, en C',
        dessin: z => plan(z, 'C').svg,
        renvois: z => {
          const p = plan(z, 'C');
          const bas = p.A.reduce((a, b) => (b[1] > a[1] ? b : a));
          return [
            { n: 1, rond: [z.l * 0.34 - 14, 30], cible: [z.l * 0.34 + 14, 10], texte: 'le vent dans le dos' },
            { n: 2, rond: [14, z.h - 14], cible: [p.x0 + (p.x1 - p.x0) * 0.3, p.yc + 3], texte: 'le canot dans le bord' },
            { n: 3, rond: [z.l * 0.12, z.h * 0.22], cible: [p.x1 - 22, p.yc - 16], texte: 'branches plantées' },
            { n: 4, rond: [bas[0] - 26, z.h - 14], cible: [bas[0] - 2, bas[1] + 2], texte: 'appelants à découvert' },
            { n: 5, rond: [p.trou[0] - 10, p.trou[1] - p.R * 0.3 - 22], cible: [p.trou[0] - 4, p.trou[1] + 2], texte: 'le trou, à portée du fusil' },
            { n: 6, rond: [z.l - 10, p.yc + 3], cible: [p.trou[0] + p.R * 0.7, p.yc + 3], texte: 'l’ouverture sous le vent' },
          ];
        },
      },
      planJ: {
        titre: 'Ou en J',
        dessin: z => plan(z, 'J').svg,
        renvois: z => {
          const p = plan(z, 'J');
          return [
            { n: 7, rond: [z.l - 14, p.trou[1] - p.R - 40], cible: [p.trou[0] + p.R * 0.9, p.trou[1] - p.R * 0.3], texte: 'le trou dans le crochet du J' },
          ];
        },
      },
      cote: {
        titre: 'De côté, le vent dans le dos',
        dessin: z => cote(z).svg,
        renvois: z => {
          const c = cote(z);
          return [
            { n: 8, rond: [16, 30], cible: [c.X(1.55), c.Y(-1.0)], texte: 'la quenouillère' },
            { n: 9, rond: [c.X(3.05) + 40, 46], cible: [c.X(3.05) + 4, c.Y(-0.95)], texte: 'branches piquées au fond' },
            { n: 10, rond: [c.X(2.6), z.h - 12], cible: [c.X(2.6), c.gw(2.6) - c.S * 0.03], texte: 'quenouilles sur le plat-bord' },
            { n: 11, rond: [c.X(5.0), z.h - 12], cible: [c.X(5.0), c.yw - c.S * 0.12], texte: 'un appelant, bec au vent' },
            { n: 12, rond: [z.l - 16, c.Y(-0.75)], cible: [c.oiseau[0] + 4, c.oiseau[1] + 2], texte: 'l’oiseau arrive face au vent' },
          ];
        },
      },
    },
  };
};
