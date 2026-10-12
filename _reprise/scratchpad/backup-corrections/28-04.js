// Planche 28-04 — La compresse chaude qui garde sa chaleur (ch. 28, « La compresse chaude qui
// garde sa chaleur »). Le linge de coton trempé dans l'eau de la bouilloire et essoré, testé sur
// l'intérieur du poignet ; la bouteille de métal d'eau chaude roulée dans un linge sec ; le malade
// couché, la compresse sur la cuisse ; la même, coupée par le milieu, couche par couche ; le linge
// qui a servi part à la casserole. Aucune cote : le chapitre ne donne aucune mesure de la compresse.
module.exports = (h) => {
  const A = h.a, F = h.formes;
  const f = v => Math.round(v * 10) / 10;
  const pt = p => `${f(p[0])} ${f(p[1])}`;
  const trace = (Q, ferme = false) => 'M' + Q.map(pt).join(' L') + (ferme ? ' Z' : '');
  const blanc = a => a.replace('fill="none"', 'fill="#FFFFFF"');
  const sansTrait = a => a.replace(/stroke="[^"]*"/, 'stroke="none"');
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const mul = (a, k) => [a[0] * k, a[1] * k];
  const norm = a => { const L = Math.hypot(a[0], a[1]) || 1; return [a[0] / L, a[1] / L]; };
  const cloche = u => { u = Math.abs(u); return u >= 1 ? 0 : (1 + Math.cos(Math.PI * u)) / 2; };

  // Courbe lissée (Catmull-Rom) échantillonnée en polyligne.
  const courbe = (P, ferme = false, n = 10) => {
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
  // Décale une polyligne de d vers sa gauche (y vers le bas : vers le haut pour une ligne qui va à droite).
  const decale = (Q, d) => Q.map((p, i) => {
    const a = Q[Math.max(0, i - 1)], b = Q[Math.min(Q.length - 1, i + 1)];
    const u = norm([b[0] - a[0], b[1] - a[1]]);
    return [p[0] + u[1] * d, p[1] - u[0] * d];
  });
  // y d'une polyligne (x croissant) à l'abscisse x.
  const yA = (Q, x) => {
    for (let i = 0; i < Q.length - 1; i++) {
      const a = Q[i], b = Q[i + 1];
      if ((a[0] - x) * (b[0] - x) <= 0 && a[0] !== b[0]) return a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0]);
    }
    return x < Q[0][0] ? Q[0][1] : Q[Q.length - 1][1];
  };
  // Une goutte qui tombe, pointe en haut.
  const goutte = (x, y, s = 1) => h.path(`M${f(x)} ${f(y - 6 * s)} Q${f(x + 4.2 * s)} ${f(y + 0.5 * s)} ${f(x)} ${f(y + 3.5 * s)} Q${f(x - 4.2 * s)} ${f(y + 0.5 * s)} ${f(x)} ${f(y - 6 * s)} Z`, blanc(A.detail));
  // Une cubique échantillonnée, sans son premier point.
  const cub = (p0, c1, c2, p3, n = 8) => {
    const out = [];
    for (let k = 1; k <= n; k++) {
      const t = k / n, m = 1 - t;
      out.push([0, 1].map(j => m * m * m * p0[j] + 3 * m * m * t * c1[j] + 3 * m * t * t * c2[j] + t * t * t * p3[j]));
    }
    return out;
  };
  // La silhouette d'une bouteille de métal couchée, le fond en s = 0, le goulot vers +s, rentrée de k :
  // corps de rayon r jusqu'à L, épaule jusqu'à L + 10, goulot de rayon rn jusqu'à L + 17.
  const silhouette = (L, r, k = 0) => {
    const rn = r * 0.42, R = r - k, Rn = rn - k, c = 5;
    const haut = [[k + c, -R], [L, -R], ...cub([L, -R], [L + 7, -R], [L + 7, -Rn], [L + 11, -Rn]), [L + 17, -Rn]];
    const bas = haut.map(([s, v]) => [s, -v]).reverse();
    return [...haut, ...bas, [k + c, R], ...cub([k + c, R], [k, R], [k, R], [k, R - c], 4), ...cub([k, -R + c], [k, -R], [k, -R], [k + c, -R], 4).slice(0, -1)];
  };
  // Une bouteille vue de côté, le fond à gauche : silhouette hachurée métal et bouchon.
  const bouteille = (x0, y, L, r) => {
    const rc = r * 0.52, Q = silhouette(L, r).map(([s, v]) => [x0 + s, y + v]);
    return [h.path(trace(Q, true), A.hachure('metal', 'contour')), h.rect(x0 + L + 17, y - rc, 11, 2 * rc, blanc(A.arete)),
      h.ligne(x0 + L + 20.5, y - rc, x0 + L + 20.5, y + rc, A.fin), h.ligne(x0 + L + 24, y - rc, x0 + L + 24, y + rc, A.fin)].join('\n');
  };

  // ─── 1. Tremper, essorer : les deux poings tordent le linge au-dessus du bol ─────────────
  const essorer = z => {
    const yc = 62, xL = 40, xR = z.l - 40, xm = (xL + xR) / 2, e = 0.4;
    const out = [];
    // le bol d'eau chaude, sous le milieu du linge
    const yb = z.h - 44, rx = 36;
    out.push(h.path(`M${xm - rx} ${yb} C${xm - rx + 2} ${yb + 28}, ${xm - 26} ${yb + 38}, ${xm} ${yb + 38} C${xm + 26} ${yb + 38}, ${xm + rx - 2} ${yb + 28}, ${xm + rx} ${yb}`, blanc(A.contour)));
    out.push(h.ellipse(xm, yb, rx, 7, blanc(A.contour)));
    out.push(h.ellipse(xm, yb + 2.5, rx - 5, 4.2, A.hachure('eau', 'detail')));
    // les gouttes qui retombent dans le bol
    out.push(goutte(xm - 3, yc + 20), goutte(xm + 4, yc + 39, 0.9), goutte(xm - 2, yc + 57, 0.85));
    // les bouts du linge qui dépassent des poings, lâches
    for (const s of [1, -1]) {
      const x = s > 0 ? xR : xL, X = d => x + s * d;
      out.push(h.path(`M${X(8)} ${yc - 9} C${X(22)} ${yc - 16}, ${X(30)} ${yc - 12}, ${X(34)} ${yc - 6} C${X(38)} ${yc + 8}, ${X(34)} ${yc + 26}, ${X(30)} ${yc + 36} C${X(24)} ${yc + 30}, ${X(16)} ${yc + 22}, ${X(8)} ${yc + 9} Z`, blanc(A.arete)));
      out.push(h.path(`M${X(20)} ${yc - 12} C${X(26)} ${yc + 4}, ${X(28)} ${yc + 18}, ${X(30)} ${yc + 34}`, A.fin));
    }
    // le linge tordu : plus mince au milieu, les plis en spirale
    const hw = x => 5.5 + 4 * Math.pow(Math.abs((x - xm) / (xR - xm)), 1.5);
    const xs = []; for (let x = xL - 8; x <= xR + 8.01; x += 3) xs.push(x);
    const haut = xs.map(x => [x, yc - hw(x)]), bas = xs.map(x => [x, yc + hw(x)]);
    out.push(h.path(trace([...haut, ...bas.reverse()], true), blanc(A.arete)));
    for (let x = xL + 6; x < xR - 10; x += 8) {
      const a = hw(x), b = hw(x + 7);
      out.push(h.path(`M${f(x)} ${f(yc - a)} Q${f(x + 1)} ${f(yc)} ${f(x + 7)} ${f(yc + b)}`, A.detail));
    }
    // le sens de la torsion : les deux poings tournent en sens contraires
    const tour = (x, s) => h.fleche(`M${x - 6} ${yc - 14 * s} C${x - 1} ${yc - 22 * s}, ${x + 8} ${yc - 16 * s}, ${x + 8} ${yc - 2 * s} C${x + 8} ${yc + 12 * s}, ${x + 2} ${yc + 20 * s}, ${x - 5} ${yc + 17 * s}`, A.arete);
    out.push(tour(xL + 28, -1), tour(xR - 36, 1));
    // les poings, vus du dos de la main, les avant-bras qui descendent vers soi
    out.push(F.main({ x: xR, y: yc, pose: 'prise', vue: 'dos', angle: -90, diametre: 19, echelle: e, bras: 120 }));
    out.push(F.main({ x: xL, y: yc, pose: 'prise', vue: 'dos', cote: 'gauche', angle: 90, diametre: 19, echelle: e, bras: 120 }));
    return out.join('\n');
  };

  // ─── 2. Tester : le linge plié posé sur l'intérieur du poignet ───────────────────────────
  const mainTest = z => {
    const m = F.main({ x: z.l - 42, y: z.h * 0.46, pose: 'prise', vue: 'paume', angle: -28, diametre: 13, echelle: 0.6, bras: 130 });
    const P = m.poignet, B = m.bras, u = norm([B[0] - P[0], B[1] - P[1]]), n = [-u[1], u[0]];
    return { m, u, n, c: add(P, mul(u, 12)) };
  };
  const tester = z => {
    const { m, u, n, c } = mainTest(z);
    const L = 15, W = 30;
    // le linge plié en travers du poignet ; ses bords retombent de part et d'autre de l'avant-bras
    const coin = (a, b) => add(c, add(mul(u, a), mul(n, b)));
    const Q = [coin(-L, -W), coin(-L * 0.2, -W - 3), coin(L, -W), coin(L + 2, 0), coin(L, W), coin(L * 0.2, W + 3), coin(-L, W), coin(-L - 2, 0)];
    const linge = courbe(Q, true, 6);
    return [m.toString(), h.path(trace(linge, true), blanc(A.arete)), h.path(trace(linge, true), sansTrait(A.hachure('eau', 'detail'))),
      h.path(trace(courbe([coin(-L + 4, -W + 3), coin(-L + 5, 0), coin(-L + 4, W - 3)])), A.fin)].join('\n');
  };

  // ─── 3. Rouler : la bouteille posée au bord du linge sec, puis roulée dedans ─────────────
  const rouleau = z => ({ yR: z.h - 36, rR: 19, xr1: 22, xr2: 136 });
  const rouler = z => {
    const out = [];
    // avant : le linge à plat, vu d'en haut et de devant, la bouteille couchée le long du bord proche
    const yN = 100, yF = 28, dx = 16, x1 = 10, x2 = z.l - 26;
    out.push(h.path(trace(courbe([[x1, yN], [(x1 + x2) / 2, yN + 1.5], [x2, yN]]).concat(courbe([[x2 + dx, yF], [(x1 + x2) / 2 + dx, yF - 1.5], [x1 + dx, yF]])), true), blanc(A.arete)));
    const yB = yN - 16, rB = 12;
    out.push(bouteille(x1 + 14, yB, 108, rB));
    // le sens du roulé : le bord proche du linge passe par-dessus la bouteille et file vers le bord loin
    const xa = x1 + 70;
    out.push(h.fleche(`M${xa - 8} ${yN + 8} C${xa - 34} ${yN - 8}, ${xa - 20} ${yB - 30}, ${xa + 6} ${yF + 20}`, A.arete));
    // après : le rouleau, le fond de la bouteille à gauche, le goulot et le bouchon qui dépassent à droite
    const { yR, rR, xr1, xr2 } = rouleau(z), rb = rR - 5, rn = rb * 0.42, rc = rb * 0.52;
    out.push(h.path(`M${xr1} ${yR - rR} L${xr2} ${yR - rR} Q${xr2 + 4} ${yR} ${xr2} ${yR + rR} L${xr1} ${yR + rR} Z`, blanc(A.contour)));
    out.push(h.path(`M${xr1 + 18} ${yR - rR} C${xr1 + 40} ${yR - 4}, ${xr1 + 70} ${yR + 6}, ${xr2 - 6} ${yR + rR}`, A.detail));
    out.push(h.path(`M${xr2 - 30} ${yR - rR + 2} Q${xr2 - 24} ${yR - 6} ${xr2 - 18} ${yR - rR + 3}`, A.fin));
    // le bout du rouleau : les tours de linge autour du fond de la bouteille
    out.push(h.ellipse(xr1, yR, 7, rR, blanc(A.contour)));
    out.push(h.ellipse(xr1, yR, 5, rb, A.hachure('metal', 'detail')));
    out.push(h.path(`M${xr1} ${yR - rR + 2.5} A6 ${rR - 2.5} 0 0 0 ${xr1} ${yR + rR - 2.5}`, A.fin));
    out.push(h.rect(xr2 + 2, yR - rn, 12, 2 * rn, A.hachure('metal', 'contour')));
    out.push(h.rect(xr2 + 14, yR - rc, 11, 2 * rc, blanc(A.arete)));
    out.push(h.ligne(xr2 + 17.5, yR - rc, xr2 + 17.5, yR + rc, A.fin), h.ligne(xr2 + 21, yR - rc, xr2 + 21, yR + rc, A.fin));
    return out.join('\n');
  };

  // ─── 4. Couché : le malade sur le dos, la tête sur un oreiller, la compresse sur la cuisse ─
  const ang = -89, eP = 0.2;
  const couche = z => {
    const X0 = z.l / 2 + 190;
    const a = ang * Math.PI / 180, ca = Math.cos(a), sa = Math.sin(a);
    const TvY = Y0 => l => [X0 + eP * (l[0] * ca - l[1] * sa), Y0 + eP * (l[0] * sa + l[1] * ca)];
    const perso = Y0 => {
      const Tv = TvY(Y0);
      const p = F.personnage({ x: X0, y: Y0, pose: 'debout', echelle: eP, angle: ang });
      const s = String(p);
      const v = [...s.matchAll(/ d="([^"]*)"/g)].map(m => m[1]).join(' ').match(/-?\d+\.?\d*/g).map(Number);
      const pts = []; for (let i = 0; i + 1 < v.length; i += 2) pts.push([v[i], v[i + 1]]);
      return { s, pts, Tv };
    };
    // premier passage pour mesurer, second pour poser le corps sur le lit, au bas de la vue
    const essai = perso(0), bas = Math.max(...essai.pts.map(q => q[1]));
    const Y0 = z.h - 3 - bas, { s, pts, Tv } = perso(Y0);
    const lit = Math.max(...pts.map(q => q[1]));
    // repère du personnage debout : x vers l'avant, y vers le haut négatif, en mm
    const Tl = q => { const d = [(q[0] - X0) / eP, (q[1] - Y0) / eP]; return [d[0] * ca + d[1] * sa, -d[0] * sa + d[1] * ca]; };
    // le devant de la cuisse, au milieu entre la hanche et le genou
    const yc = -720, avant = Math.max(...pts.map(Tl).filter(l => Math.abs(l[1] - yc) < 70 && l[0] > 0).map(l => l[0]));
    const out = [];
    out.push(h.ligne(0, lit, z.l, lit, A.arete));
    // l'oreiller sous la tête et les épaules
    const xT = Math.min(...pts.map(q => q[0]));
    out.push(h.path(`M${f(xT - 10)} ${f(lit)} C${f(xT - 14)} ${f(lit - 18)}, ${f(xT + 28)} ${f(lit - 21)}, ${f(xT + 76)} ${f(lit - 10)} C${f(xT + 90)} ${f(lit - 6)}, ${f(xT + 92)} ${f(lit)}, ${f(xT + 92)} ${f(lit)} Z`, blanc(A.arete)));
    out.push(s);
    // la compresse sous sa serviette, bombée sur le devant de la cuisse
    const c0 = Tv([avant - 4, yc]), c1 = Tv([avant - 4, yc + 150]), c2 = Tv([avant - 4, yc - 150]);
    const d = norm([c1[0] - c2[0], c1[1] - c2[1]]), nn = [d[1], -d[0]];
    const P = (t, hgt) => add(add(c0, mul(d, t)), mul(nn, hgt));
    const bosse = courbe([P(-30, -1), P(-26, 4), P(-16, 11), P(0, 12.5), P(16, 11), P(26, 4), P(30, -1)], false, 8);
    out.push(h.path(trace(bosse, true), A.hachure('isolant', 'arete')));
    return out.join('\n');
  };

  // ─── 5. En coupe : la compresse sur l'abcès, coupée par le milieu ───────────────────────
  // La cuisse vue de côté comme au-dessus (hanche à gauche, genou à droite), coupée net en
  // dessous ; la compresse coupée en long, dans l'axe de la cuisse.
  const geo = z => {
    const xm = z.l / 2 - 6, yS = z.h - 46, xa = xm - 14;
    const peau = []; for (let x = 0; x <= z.l + 0.01; x += 3) peau.push([x, yS + 0.00032 * (x - xm) * (x - xm) - 6 * cloche((x - xa) / 22)]);
    // le linge mouillé : sur la peau, par-dessus la bosse
    const lm = peau.filter(p => p[0] >= xa - 48 && p[0] <= xa + 52);
    const lmDessus = decale(lm, 6.5);
    const profil = x => (x >= xa - 48 && x <= xa + 52) ? yA(lmDessus, x) : yA(peau, x);
    // le rouleau : la bouteille couchée dans l'axe de la cuisse, deux tours de linge sec autour
    const L = 176, r = 24, ep = 9, s1 = -7, s2 = L + 6, u0 = xm - (L + 17) / 2 - 4;
    let appuiMin = Infinity;
    for (let s = s1; s <= s2; s += 2) appuiMin = Math.min(appuiMin, profil(u0 + s));
    const O = [u0, appuiMin - r - ep + 2];
    const T = (s, v) => [O[0] + s, O[1] + v];
    // la serviette : de la peau à la peau, par-dessus le rouleau et le bouchon
    const xG = u0 + s1 - 34, xD = u0 + L + 17 + 11 + 36, rc = r * 0.52;
    const servIn = courbe([[xG - 22, yA(peau, xG - 22)], [xG, yA(peau, xG) - 0.5], [xG + 18, yA(peau, xG + 18) - 12], T(s1 - 4, -r - ep - 1),
      T(60, -r - ep - 0.5), T(120, -r - ep - 0.5), T(s2 + 3, -r - ep - 1), T(L + 17 + 14, -rc - 3), [xD - 16, yA(peau, xD - 16) - 4], [xD, yA(peau, xD)], [xD + 22, yA(peau, xD + 22)]], false, 10);
    const serv = decale(servIn, 12);
    return { xa, peau, lm, lmDessus, profil, T, L, r, ep, s1, s2, rc, servIn, serv };
  };
  const monte = z => {
    const g = geo(z), { T, L, r, ep, s1, s2, peau, profil } = g;
    const out = [];
    // la cuisse : la peau en haut, coupée net en dessous d'un trait de coupure
    const fondY = z.h - 16;
    const coupure = []; for (let x = z.l; x >= 0; x -= 6) coupure.push([x, fondY + 4 * Math.sin(x / 19)]);
    out.push(h.path(trace([...peau, ...coupure], true), blanc('fill="none" stroke="none"')));
    out.push(h.path(trace(peau), A.contour), h.path(trace(coupure), A.detail));
    // l'abcès : la poche de pus sous la bosse
    const yAb = yA(peau, g.xa) + 16;
    out.push(h.ellipse(g.xa, yAb, 20, 10, A.hachure('neige', 'cache')));
    // le linge mouillé
    out.push(h.path(trace([...g.lm, ...g.lmDessus.slice().reverse()], true), A.hachure('eau', 'arete')));
    // le linge sec : la bande du dessous épouse le linge mouillé et la peau, celle du dessus est droite
    const dessous = []; for (let s = s1; s <= s2 + 0.01; s += 2) dessous.push(T(s, r));
    const appui = dessous.map(p => [p[0], profil(p[0])]);
    out.push(h.path(trace([...dessous, ...appui.slice().reverse()], true), A.hachure('grillage', 'arete')));
    out.push(h.path(trace([T(s1, -r - ep), T(s2, -r - ep), T(s2, -r), T(s1, -r)], true), A.hachure('grillage', 'arete')));
    out.push(h.path(trace([T(s1, -r - ep / 2), T(s2, -r - ep / 2)]), A.detail));
    out.push(h.path(trace(dessous.map(p => [p[0], (p[1] + profil(p[0])) / 2])), A.detail));
    // la bouteille, coupée en long : la paroi de métal en noir, l'eau chaude dedans, le bouchon
    const w = 2.6, rc = g.rc;
    const dehors = silhouette(L, r).map(([s, v]) => T(s, v)), dedans = silhouette(L, r, w).map(([s, v]) => T(s, v));
    out.push(h.path(trace(dehors, true), A.plein));
    out.push(h.path(trace(dedans, true), 'fill="#FFFFFF" stroke="none"'));
    out.push(h.path(trace(dedans, true), sansTrait(A.hachure('eau', 'fin'))));
    out.push(h.path(trace([T(L + 17, -rc), T(L + 29, -rc), T(L + 29, rc), T(L + 17, rc)], true), A.plein));
    // la serviette
    out.push(h.path(trace([...g.servIn, ...g.serv.slice().reverse()], true), A.hachure('isolant', 'arete')));
    return out.join('\n');
  };

  // ─── 6. Après : le linge qui a servi part à la casserole ─────────────────────────────────
  const bouillir = z => {
    const out = [], yP = z.h - 44, xc = z.l / 2 - 8;
    // le poêle : le dessus de fonte, le devant et sa porte
    out.push(h.rect(0, yP, z.l, 10, A.hachure('metal', 'contour')));
    out.push(h.ligne(6, yP + 10, 6, z.h, A.contour), h.ligne(z.l - 6, yP + 10, z.l - 6, z.h, A.contour));
    out.push(h.path(`M26 ${z.h} L26 ${yP + 20} L${z.l - 26} ${yP + 20} L${z.l - 26} ${z.h}`, A.arete));
    out.push(h.ligne(z.l - 40, yP + 28, z.l - 40, yP + 40, A.contour), h.cercle(z.l - 40, yP + 28, 2.5, blanc(A.detail)));
    // la casserole, coupée : parois, eau, bulles, queue
    const x1 = xc - 52, x2 = xc + 52, yH = yP - 56, w = 4, yE = yH + 12;
    out.push(h.path(trace([[x1, yH], [x1, yP], [x2, yP], [x2, yH], [x2 - w, yH], [x2 - w, yP - w], [x1 + w, yP - w], [x1 + w, yH]], true), A.plein));
    out.push(h.rect(x1 + w, yE, x2 - x1 - 2 * w, yP - w - yE, sansTrait(A.hachure('eau', 'fin'))));
    out.push(h.ligne(x1 + w, yE, x2 - w, yE, A.detail));
    for (const [bx, by, br] of [[xc - 30, yP - 12, 3], [xc - 22, yP - 26, 2.4], [xc + 26, yP - 15, 3], [xc + 36, yP - 32, 2.2], [xc - 38, yE + 10, 2], [xc + 18, yE + 8, 2]]) out.push(h.cercle(bx, by, br, blanc(A.fin)));
    out.push(h.path(`M${x2} ${yH + 10} L${z.l - 4} ${yH + 4} L${z.l - 4} ${yH + 12} L${x2} ${yH + 17} Z`, blanc(A.contour)));
    // la vapeur
    for (const vx of [x1 + 10, x2 - 10]) out.push(h.path(`M${vx} ${yH - 4} c-5 -7 5 -10 0 -16 c-5 -7 5 -10 0 -16`, A.detail));
    // le linge qui a servi, mou, qui tombe dedans
    const y0 = yH - 80;
    const lin = courbe([[xc - 20, y0], [xc + 2, y0 + 4], [xc + 22, y0 + 1], [xc + 26, y0 + 22], [xc + 30, y0 + 44], [xc + 18, y0 + 52], [xc + 6, y0 + 46], [xc - 6, y0 + 56], [xc - 20, y0 + 48], [xc - 28, y0 + 52], [xc - 26, y0 + 26]], true, 6);
    out.push(h.path(trace(lin, true), blanc(A.arete)));
    out.push(h.path(trace(lin, true), sansTrait(A.hachure('eau', 'detail'))));
    out.push(h.path(`M${xc - 10} ${y0 + 3} Q${xc - 12} ${y0 + 26} ${xc - 6} ${y0 + 54}`, A.fin), h.path(`M${xc + 12} ${y0 + 3} Q${xc + 12} ${y0 + 26} ${xc + 16} ${y0 + 50}`, A.fin));
    out.push(h.fleche(`M${xc} ${y0 + 62} L${xc} ${yE + 12}`, A.arete));
    return out.join('\n');
  };

  return {
    ref: '28-04',
    titre: 'La compresse chaude qui garde sa chaleur',
    desc: 'Le linge de coton trempé dans l’eau chaude et essoré en le tordant, testé sur l’intérieur du poignet ; une bouteille de métal d’eau chaude (ou le sac de sable chauffé) roulée dans un linge sec ; le malade couché, la compresse sur la cuisse sous une serviette ; la même en coupe : le linge mouillé sur l’abcès, le rouleau par-dessus, la serviette sur le tout ; le linge qui a servi part bouillir.',
    format: 'pleine',
    disposition: [['essorer', 'tester', 'rouler'], ['couche'], ['monte', 'bouillir']],
    hauteurs: [1.95, 1.3, 2.05],
    largeurs: [[1.1, 1, 1.1], [1], [2.1, 1]],
    vues: {
      essorer: {
        titre: 'Tremper, essorer',
        dessin: essorer,
        renvois: z => [{ n: 1, rond: [z.l / 2, 18], cible: [z.l / 2 - 6, 60], texte: 'Linge de coton trempé, essoré' }],
      },
      tester: {
        titre: 'Tester sur le poignet',
        dessin: tester,
        renvois: z => { const t = mainTest(z); return [{ n: 2, rond: [26, 30], cible: add(t.c, mul(t.n, -8)), texte: 'Chaud, jamais brûlant' }]; },
      },
      rouler: {
        titre: 'Rouler la bouteille',
        dessin: rouler,
        renvois: z => { const r = rouleau(z); return [{ n: 3, rond: [z.l - 14, r.yR + 22], cible: [r.xr2 - 22, r.yR + 9], texte: 'Roulée dans un linge sec' }]; },
      },
      couche: {
        titre: 'Couché, la compresse sur la cuisse',
        dessin: couche,
      },
      monte: {
        titre: 'La même, coupée par le milieu',
        dessin: monte,
        renvois: z => {
          const g = geo(z), T = g.T, sv = g.serv[Math.round(g.serv.length * 0.42)];
          return [
            { n: 4, rond: [sv[0] - 60, 18], cible: add(sv, [0, 6]), texte: 'Serviette par-dessus le tout' },
            { n: 5, rond: [22, 70], cible: T(10, -g.r - g.ep / 2), texte: 'Linge sec roulé autour' },
            { n: 6, rond: [z.l - 22, 64], cible: T(g.L - 50, 8), texte: 'Bouteille d’eau chaude' },
            { n: 7, rond: [z.l - 70, z.h - 30], cible: [g.xa + 44, g.profil(g.xa + 44) - 3], texte: 'Linge mouillé sur l’abcès' },
            { n: 8, rond: [70, z.h - 30], cible: [g.xa - 10, yA(g.peau, g.xa) + 16], texte: 'Abcès' },
          ];
        },
      },
      bouillir: {
        titre: 'Après, à la casserole',
        dessin: bouillir,
        renvois: z => [{ n: 9, rond: [z.l - 16, 58], cible: [z.l / 2 + 12, z.h - 44 - 56 - 52], texte: 'Sert une fois, puis bouilli' }],
      },
    },
    danger: 'Danger — une peau déjà insensible, celle d’une cellulite ou d’un malade qui somnole, ne dit pas que ça brûle : le test se fait sur l’intérieur de son propre poignet, avant de poser le linge.',
  };
};
