// Planche 98-07 — Battre sans fléau : l’aire à perches au-dessus de la toile, et le sac piétiné.
// Chapitre 98, §9 « Battre sans fléau », et étapes 38-39 (les épis rentrés la tête la première,
// les sacs posés sur un plancher dur). Une seule cote, la seule que le chapitre donne : les perches
// espacées de 2,5 à 5 cm. Le chapitre ne donne ni le diamètre des perches, ni leur longueur, ni la
// hauteur des traverses (« surélevées assez pour laisser de la place au grain ») : proportions à
// l’œil, sans cote. Il dit « on bat » sans nommer l’outil, dans la section « sans fléau » : un bâton.
module.exports = (h) => {
  const f = n => Math.round(n * 10) / 10;
  const rad = d => d * Math.PI / 180;
  const alea = graine => { let s = graine; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; };
  const blanc = t => h.a[t].replace('fill="none"', 'fill="#FFFFFF"');

  // Une courbe qui passe par chaque point (Catmull-Rom).
  const courbe = (pts, ferme = false) => {
    const n = pts.length, P = i => ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
    let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
      d += ` C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
    }
    return d + (ferme ? ' Z' : '');
  };
  // L’enveloppe convexe d’un nuage de points (la silhouette d’un rondin vu en biais).
  const enveloppe = pts => {
    const p = pts.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
    const lo = [], hi = [];
    for (const q of p) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop(); lo.push(q); }
    for (const q of p.slice().reverse()) { while (hi.length >= 2 && cr(hi[hi.length - 2], hi[hi.length - 1], q) <= 0) hi.pop(); hi.push(q); }
    return lo.slice(0, -1).concat(hi.slice(0, -1));
  };

  // L’épi d’orge : les barbes, le corps, les grains en chevrons. (x, y) : la base, a : vers la pointe.
  const epi = (x, y, a, L, barbes = 1) => {
    const c = Math.cos(rad(a)), s = Math.sin(rad(a)), w = L * 0.13;
    const T = (u, v) => [x + u * c - v * s, y + u * s + v * c];
    const out = [];
    // une barbe par grain, toutes vers l’avant, presque parallèles, plus longues que l’épi
    for (let k = 0; k < 8; k++) {
      const u0 = L * (0.2 + 0.1 * k), cote = k % 2 ? 1 : -1;
      out.push(h.chemin([T(u0, cote * w * 0.6), T(L * (1 + 1.25 * barbes) + L * 0.05 * k, cote * w * (0.35 + 1.5 * k / 7) * (0.4 + 0.6 * barbes))], h.a.fin));
    }
    const corps = [T(0, 0), T(L * 0.12, -w * 0.8), T(L * 0.5, -w), T(L * 0.88, -w * 0.7), T(L, 0), T(L * 0.88, w * 0.7), T(L * 0.5, w), T(L * 0.12, w * 0.8)];
    out.push(h.path(courbe(corps, true), blanc('detail')));
    for (let k = 1; k <= 5; k++) out.push(h.chemin([T(L * (k - 0.7) / 6, -w * 0.7), T(L * k / 6, 0), T(L * (k - 0.7) / 6, w * 0.7)], h.a.fin));
    return out.join('\n');
  };
  // Un grain, noir, un peu plus gros que nature pour se voir.
  const grain = (x, y, a, l) => {
    const c = Math.cos(rad(a)), s = Math.sin(rad(a));
    const pts = Array.from({ length: 10 }, (_, k) => { const t = 2 * Math.PI * k / 10, u = l / 2 * Math.cos(t), v = l / 4.4 * Math.sin(t); return [x + u * c - v * s, y + u * s + v * c]; });
    return h.path(courbe(pts, true), h.a.plein);
  };

  // ─── L’aire, en perspective cavalière : X en travers des perches, Y le long, Z vers le haut ───
  // Fuyante raide (55°) : c’est elle qui laisse voir le jour entre les perches.
  const KX = 0.5 * Math.cos(rad(55)), KY = 0.5 * Math.sin(rad(55));
  const Pd = 55, Pg = 48, Pn = 10, PL = 1400, Td = 140;   // perche, écart, nombre, longueur ; traverse
  const PW = Pn * Pd + (Pn - 1) * Pg;                        // largeur du lit
  const PX = i => Pd / 2 + i * (Pd + Pg);
  const PZ = Td + Pd / 2;                                    // l’axe des perches, posées sur les traverses
  const TY = [180, 1220], TX = [-190, PW + 190];
  const TOILE = [-300, PW + 300, -240, 1640];
  const TAS = { xc: PW / 2, yc: 1060, ax: 400, ay: 330, zb: Td + Pd - 12, ht: 150 };   // le tas de paille
  const tasZ = (X, Y) => { const q = ((X - TAS.xc) / TAS.ax) ** 2 + ((Y - TAS.yc) / TAS.ay) ** 2; return TAS.zb + TAS.ht * Math.pow(Math.max(0, 1 - q), 0.6); };

  const geoAire = z => {
    const xmin = TOILE[0] + KX * TOILE[2], xmax = TOILE[1] + KX * TOILE[3];
    const vmin = KY * TOILE[2], vmax = TAS.zb + TAS.ht + 40 + KY * TAS.yc;
    const s = Math.min((z.l - 16) / (xmax - xmin), (z.h - 8) / (vmax - vmin));
    const Ox = z.l / 2 - s * (xmin + xmax) / 2, Oy = z.h / 2 + s * (vmin + vmax) / 2;
    return { s, P: (X, Y, Z) => [Ox + s * (X + KX * Y), Oy - s * (Z + KY * Y)] };
  };
  // Un rondin couché : sa silhouette, et le bout qui regarde vers nous avec ses cernes.
  const cercleM = (P, C, r, axe, n = 36) => Array.from({ length: n }, (_, k) => {
    const a = 2 * Math.PI * k / n, u = r * Math.cos(a), v = r * Math.sin(a);
    return axe === 'Y' ? P(C[0] + u, C[1], C[2] + v) : P(C[0], C[1] + u, C[2] + v);
  });
  const rondin = (P, A, B, r, axe, ecorce = []) => {
    const pres = axe === 'Y' ? A : B;
    const out = [h.chemin(enveloppe(cercleM(P, A, r, axe).concat(cercleM(P, B, r, axe))), blanc('arete'), true)];
    for (const [t0, t1, ang] of ecorce) {
      const a = rad(ang), u = r * Math.cos(a), v = r * Math.sin(a);
      const Q = t => axe === 'Y' ? P(A[0] + u, A[1] + (B[1] - A[1]) * t, A[2] + v) : P(A[0] + (B[0] - A[0]) * t, A[1] + u, A[2] + v);
      out.push(h.chemin([Q(t0), Q(t1)], h.a.fin));
    }
    out.push(h.chemin(cercleM(P, pres, r, axe), h.a.detail, true));
    out.push(h.chemin(cercleM(P, pres, r * 0.55, axe, 24), h.a.fin, true));
    const c = P(...pres);
    out.push(h.cercle(c[0], c[1], 0.9, h.a.plein));
    return out.join('\n');
  };

  const dessinAire = z => {
    const { s, P } = geoAire(z), r = alea(5), out = [];
    // la toile, étendue à plat, bords un peu mous, quelques plis
    const coins = [[TOILE[0], TOILE[2]], [TOILE[1], TOILE[2]], [TOILE[1], TOILE[3]], [TOILE[0], TOILE[3]]];
    const bord = [];
    coins.forEach((a, i) => { const b = coins[(i + 1) % 4]; for (let k = 0; k < 6; k++) { const t = k / 6, j = k ? 8 : 0; bord.push(P(a[0] + (b[0] - a[0]) * t + (r() - 0.5) * j, a[1] + (b[1] - a[1]) * t + (r() - 0.5) * j, 0)); } });
    out.push(h.path(courbe(bord, true), blanc('arete')));
    [[[-250, -200], [-40, -120]], [[PW + 60, -210], [PW + 240, -150]], [[-270, 300], [-200, 700]], [[PW + 250, 900], [PW + 200, 1300]], [[200, -230], [420, -170]]]
      .forEach(([a, b]) => out.push(h.chemin([P(a[0], a[1], 0), P((a[0] + b[0]) / 2 + 12, (a[1] + b[1]) / 2 + 20, 0), P(b[0], b[1], 0)], h.a.fin)));
    // les deux traverses, couchées sur la toile en travers des perches : celle du fond d’abord
    for (const ty of [TY[1], TY[0]]) out.push(rondin(P, [TX[0], ty, Td / 2], [TX[1], ty, Td / 2], Td / 2, 'X', [[0.02, 0.1, 130], [0.9, 0.97, 150]]));
    // les perches, de la gauche vers la droite (la droite est plus près de l’œil)
    for (let i = 0; i < Pn; i++) out.push(rondin(P, [PX(i), 0, PZ], [PX(i), PL, PZ], Pd / 2, 'Y', [[0.08, 0.3, 70]]));
    // la paille jetée sur la moitié du fond : un tas mou, des tiges couchées dans tous les sens, des épis
    const rp = alea(11), nuage = [];
    for (let i = 0; i <= 8; i++) for (let k = 0; k < 36; k++) {
      const q = i / 8, t = 2 * Math.PI * k / 36, X = TAS.xc + TAS.ax * q * Math.cos(t), Y = TAS.yc + TAS.ay * q * Math.sin(t);
      nuage.push(P(X, Y, tasZ(X, Y)));
    }
    const env = enveloppe(nuage), tas = [];
    env.forEach((a, i) => { const b = env[(i + 1) % env.length], n = Math.max(1, Math.round(Math.hypot(b[0] - a[0], b[1] - a[1]) / 7)); for (let k = 0; k < n; k++) tas.push([a[0] + (b[0] - a[0]) * k / n + (rp() - 0.5) * 4, a[1] + (b[1] - a[1]) * k / n + (rp() - 0.5) * 4]); });
    out.push(h.path(courbe(tas, true), blanc('arete')));
    const surf = (X, Y) => P(X, Y, tasZ(X, Y) + 3);
    const dedans = (X, Y, m) => ((X - TAS.xc) / TAS.ax) ** 2 + ((Y - TAS.yc) / TAS.ay) ** 2 < m;
    for (let k = 0, essais = 0; k < 46 && essais < 600; essais++) {
      const X = TAS.xc + (rp() - 0.5) * 2 * TAS.ax, Y = TAS.yc + (rp() - 0.5) * 2 * TAS.ay, phi = rad((rp() - 0.5) * 110 + (rp() < 0.25 ? 90 : 0)), len = 200 + rp() * 330;
      const Xa = X - Math.cos(phi) * len / 2, Ya = Y - Math.sin(phi) * len / 2, Xb = X + Math.cos(phi) * len / 2, Yb = Y + Math.sin(phi) * len / 2;
      if (!dedans(Xa, Ya, 0.8) || !dedans(Xb, Yb, 0.8)) continue;
      out.push(h.path(courbe([surf(Xa, Ya), surf(X, Y), surf(Xb, Yb)]), h.a.fin)); k++;
    }
    const Le = 85 * s;
    for (let k = 0, essais = 0; k < 8 && essais < 200; essais++) {
      const X = TAS.xc + (rp() - 0.5) * 1.6 * TAS.ax, Y = TAS.yc + (rp() - 0.5) * 1.6 * TAS.ay;
      if (!dedans(X, Y, 0.55)) continue;
      const phi = rad((rp() - 0.5) * 80 + (rp() < 0.5 ? 180 : 0)), a = surf(X, Y), b = surf(X + Math.cos(phi) * 60, Y + Math.sin(phi) * 60);
      out.push(epi(a[0], a[1], Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI, Le, 0.7)); k++;
    }
    // des épis qui dépassent du bord du tas, pointés vers l’extérieur
    for (const t of [165, 200, 235, 305, 345, 15]) {
      const tr = rad(t), X = TAS.xc + TAS.ax * 0.9 * Math.cos(tr), Y = TAS.yc + TAS.ay * 0.9 * Math.sin(tr);
      const a = P(X, Y, tasZ(X, Y) * 0.5 + TAS.zb * 0.5 + 10), b = P(X + Math.cos(tr) * 60, Y + Math.sin(tr) * 60, TAS.zb + 20);
      out.push(epi(a[0], a[1], Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI, Le, 0.6));
    }
    return out.join('\n');
  };
  const renvoisAire = z => {
    const { P } = geoAire(z);
    const c1 = P(-230, -130, 0), c2 = P(-120, TY[0] - 30, Td / 2 + 30), c3 = P(PX(7) - 22, 0, PZ + 8);
    return [
      { n: 1, rond: [f(c1[0] - 34), f(c1[1] + 4 > z.h - 12 ? z.h - 12 : c1[1] + 4)], cible: c1.map(f), texte: 'toile, ou aire raclée et balayée' },
      { n: 2, rond: [f(c2[0] - 44), f(c2[1] - 30)], cible: c2.map(f), texte: 'traverse qui surélève les perches' },
      { n: 3, rond: [f(c3[0] - 6), f(Math.min(z.h - 12, c3[1] + 46))], cible: c3.map(f), texte: 'lit de perches à claire-voie' },
    ];
  };

  // ─── En coupe à travers les perches : X en travers, Z vers le haut ───
  const PAILLE_X = [-45, PX(6) + 70];
  const S0 = [-80, 392], S1 = [585, 312], SR = 17;          // le bâton, du bout tenu au bout qui frappe
  const geoCoupe = z => {
    const xmin = -135, xmax = PW + 135, zmin = -40, zmax = 450;
    const s = Math.min((z.l - 12) / (xmax - xmin), (z.h - 6) / (zmax - zmin));
    const Ox = z.l / 2 - s * (xmin + xmax) / 2, Oy = z.h / 2 + s * (zmin + zmax) / 2;
    return { s, P: (X, Z) => [Ox + s * X, Oy - s * Z] };
  };
  const dessinCoupe = z => {
    const { s, P } = geoCoupe(z), r = alea(3), out = [];
    // le sol et la toile étendue dessus
    const g0 = P(-135, 0), g1 = P(PW + 135, -40);
    out.push(h.rect(g0[0], g0[1], g1[0] - g0[0], g1[1] - g0[1], h.a.hachure('terre', 'aucun')));
    out.push(h.chemin([P(-135, 0), P(PW + 135, 0)], h.a.detail));
    out.push(h.chemin([P(-100, 0), P(-88, 5), P(PW + 88, 5), P(PW + 100, 0)], h.a.arete));
    // la paille couchée sur les perches (avant les perches : elles passent devant son bas)
    const haut = [];
    for (let x = -20; x <= PAILLE_X[1] - 25; x += 55) haut.push(P(x, 283 + (r() - 0.5) * 22));
    const contour = [P(PAILLE_X[0], 160), P(PAILLE_X[0] - 8, 225), ...haut, P(PAILLE_X[1], 250), P(PAILLE_X[1] + 6, 196),
      ...Array.from({ length: 12 }, (_, k) => P(PAILLE_X[1] - 30 - k * (PAILLE_X[1] - 10) / 11, 184 + (r() - 0.5) * 6))];
    const d = courbe(contour, true);
    out.push(h.path(d, h.a.blanc), h.path(d, h.a.hachure('paille', 'detail')));
    // les perches, coupées : le bois en hachure
    for (let i = 0; i < Pn; i++) { const c = P(PX(i), PZ); out.push(h.cercle(c[0], c[1], Pd / 2 * s, h.a.blanc), h.cercle(c[0], c[1], Pd / 2 * s, h.a.hachure('bois', 'arete'))); }
    // des épis sur le dessus de la paille, et qui pendent au bout
    const Le = 85 * s;
    [[40, 280, -12], [210, 288, 170], [330, 280, 8], [470, 286, 186], [600, 276, -6], [130, 272, 196]]
      .forEach(([x, zz, a]) => { const p = P(x, zz); out.push(epi(p[0], p[1], a, Le)); });
    // le grain qui passe entre les perches, et qui s’amasse sur la toile sous chaque jour
    const gl = 14 * s;
    for (let i = 0; i < 6; i++) {
      const xg = PX(i) + (Pd + Pg) / 2;
      [[-15, 8], [0, 8], [15, 8], [-8, 14], [8, 14], [0, 20], [-24, 7], [24, 7]].forEach(([dx, zz]) => { const p = P(xg + dx + (r() - 0.5) * 3, zz); out.push(grain(p[0], p[1], (r() - 0.5) * 40, gl)); });
      if (i === 2) { const a = P(xg, 168), b = P(xg, 34); out.push(h.fleche(`M${f(a[0])} ${f(a[1])} L${f(b[0])} ${f(b[1])}`, h.a.detail)); continue; }
      [150, 116, 84, 52].forEach(zz => { const p = P(xg + (r() - 0.5) * 18, zz + (r() - 0.5) * 12); out.push(grain(p[0], p[1], 50 + r() * 80, gl)); });
    }
    // le bâton qui tombe à plat sur la paille
    const a0 = P(...S0), a1 = P(...S1), dx = a1[0] - a0[0], dy = a1[1] - a0[1], L = Math.hypot(dx, dy);
    const u = [dx / L, dy / L], n = [-u[1], u[0]], R = SR * s;
    const bout = (c, sens) => Array.from({ length: 9 }, (_, k) => { const t = rad(-90 + k * 22.5); return [c[0] + sens * u[0] * R * Math.cos(t) + n[0] * R * Math.sin(t), c[1] + sens * u[1] * R * Math.cos(t) + n[1] * R * Math.sin(t)]; });
    const poly = [...bout(a1, 1), ...bout(a0, -1)];
    out.push(h.chemin(enveloppe(poly), blanc('arete'), true));
    out.push(h.chemin([[a0[0] + u[0] * 30 + n[0] * R * 0.35, a0[1] + u[1] * 30 + n[1] * R * 0.35], [a1[0] - u[0] * 60 + n[0] * R * 0.35, a1[1] - u[1] * 60 + n[1] * R * 0.35]], h.a.fin));
    // le coup : le bout du bâton descend
    const f0 = P(650, 448), fc = P(672, 390), f1 = P(626, 340);
    out.push(h.fleche(`M${f(f0[0])} ${f(f0[1])} Q${f(fc[0])} ${f(fc[1])} ${f(f1[0])} ${f(f1[1])}`));
    // l’écart entre deux perches, là où la paille n’est pas encore jetée
    const x1 = PX(8) + Pd / 2, x2 = PX(9) - Pd / 2;
    for (const x of [x1, x2]) out.push(h.chemin([P(x, PZ - 6), P(x, 88)], h.a.fin));
    const c1 = P(x1, 100), c2 = P(x2, 100);
    out.push(h.cote(c1[0], c1[1], c2[0], c2[1], '25 à 50 mm', { cote: 'dessous' }));
    return out.join('\n');
  };
  const renvoisCoupe = z => {
    const { P } = geoCoupe(z);
    const cb = P(S0[0] + (S1[0] - S0[0]) * 0.28, S0[1] + (S1[1] - S0[1]) * 0.28 + SR * 0.6);
    const cp = P(-10, 232), cg = P(PX(1) + (Pd + Pg) / 2 + 20, 9);
    return [
      { n: 4, rond: [f(cb[0] + 40), f(Math.max(12, cb[1] - 34))], cible: cb.map(f), texte: 'on bat la paille jetée dessus' },
      { n: 5, rond: P(-112, 300).map(f), cible: cp.map(f), texte: 'la paille reste, s’enlève d’un coup' },
      { n: 6, rond: P(-118, 40).map(f), cible: cg.map(f), texte: 'le grain passe, tombe sur la toile' },
    ];
  };

  // ─── Le sac, en coupe : X le long du sac, Z vers le haut ───
  const geoSacC = z => {
    const xmin = -40, xmax = 940, zmin = -80, zmax = 310;
    const s = Math.min((z.l - 10) / (xmax - xmin), (z.h - 6) / (zmax - zmin));
    const Ox = z.l / 2 - s * (xmin + xmax) / 2, Oy = z.h / 2 + s * (zmin + zmax) / 2;
    return { s, P: (X, Z) => [Ox + s * X, Oy - s * Z] };
  };
  const dessinSacC = z => {
    const { s, P } = geoSacC(z), r = alea(9), out = [];
    // le plancher, coupé : planches en hachure de bois
    for (let x = -40; x < 940; x += 150) { const a = P(x, 0), b = P(Math.min(x + 150, 940), -28); out.push(h.rect(a[0], a[1], b[0] - a[0], b[1] - a[1], h.a.hachure('bois', 'detail'))); }
    // le sac, couché : le corps, puis le collet noué et sa fraise
    const corps = [[114, 96], [150, 128], [215, 164], [330, 180], [480, 182], [630, 178], [760, 168], [835, 142], [864, 94], [855, 38], [820, 5], [760, 1], [520, 0], [300, 1], [190, 5], [140, 30], [118, 64]].map(p => P(...p));
    out.push(h.path(courbe(corps, true), blanc('arete')));
    // les tiges, couchées de l’épi vers la bouche
    for (let k = 0; k < 11; k++) {
      const zb = 14 + k * 14.5, xa = 150 + r() * 25, za = 72 + (k - 5) * 4.5;
      out.push(h.path(courbe([P(xa, za), P(360, za + (zb - za) * 0.6), P(620 - Math.abs(zb - 90) * 0.5, zb)]), h.a.fin));
    }
    // les épis, entrés la tête la première : tassés au fond
    const Le = 82 * s;
    const range = (xb, zs) => zs.forEach(zz => { const p = P(xb - Math.abs(zz - 90) * 0.55, zz); out.push(epi(p[0], p[1], (r() - 0.5) * 12 - (zz - 90) * 0.12, Le, 0.3)); });
    range(610, [40, 72, 104, 136]);
    range(680, [24, 56, 88, 120, 150]);
    const fraise = [[110, 98], [84, 118], [52, 132], [24, 116], [14, 86], [28, 58], [60, 48], [92, 58], [110, 64]].map(p => P(...p));
    out.push(h.path(courbe(fraise, true), blanc('arete')));
    [[[100, 92], [44, 122]], [[100, 80], [22, 90]], [[100, 70], [40, 56]]].forEach(([a, b]) => out.push(h.chemin([P(...a), P(...b)], h.a.fin)));
    const l0 = P(102, 102), l1 = P(118, 60);
    out.push(h.rect(l0[0], l0[1], l1[0] - l0[0], l1[1] - l0[1], blanc('detail')));
    [72, 81, 90].forEach(zz => out.push(h.chemin([P(102, zz), P(118, zz + 4)], h.a.fin)));
    out.push(h.path(courbe([P(108, 62), P(98, 40), P(86, 22)]), h.a.detail), h.path(courbe([P(114, 62), P(126, 42), P(122, 22)]), h.a.detail));
    // les pieds appuient sur le bout des épis
    for (const x of [690, 790]) { const a = P(x, 300), b = P(x, 200); out.push(h.fleche(`M${f(a[0])} ${f(a[1])} L${f(b[0])} ${f(b[1])}`)); }
    return out.join('\n');
  };
  const renvoisSacC = z => {
    const { P } = geoSacC(z);
    return [
      { n: 7, rond: P(-10, 240).map(f), cible: P(62, 118).map(f), texte: 'sac de toile, bouche nouée' },
      { n: 8, rond: P(900, 250).map(f), cible: P(770, 118).map(f), texte: 'les épis au fond du sac' },
      { n: 9, rond: P(230, -62).map(f), cible: P(300, -14).map(f), texte: 'plancher dur' },
    ];
  };

  // ─── Le sac vu de dessus : X le long du sac, Y en travers ───
  const geoSacP = z => {
    const xmin = -30, xmax = 960, ymin = -245, ymax = 245;
    const s = Math.min((z.l - 10) / (xmax - xmin), (z.h - 6) / (ymax - ymin));
    const Ox = z.l / 2 - s * (xmin + xmax) / 2, Oy = z.h / 2 - s * (ymin + ymax) / 2;
    return { s, P: (X, Y) => [Ox + s * X, Oy + s * Y] };
  };
  // Une empreinte de botte, pied droit, orteils vers le haut ; gauche en miroir. (cx, cy) : son milieu.
  const empreinte = (P, cx, cy, gauche, ang = 0) => {
    const m = gauche ? -1 : 1, c = Math.cos(rad(ang)), sn = Math.sin(rad(ang)), out = [];
    const Q = (u, v) => P(cx + m * u * c - v * sn, cy + m * u * sn + v * c);
    const avant = [[-6, -140], [18, -137], [36, -124], [47, -100], [51, -66], [48, -32], [40, 0], [34, 24], [-28, 24], [-38, 0], [-45, -32], [-49, -66], [-45, -100], [-33, -125]];
    const talon = [[-33, 64], [0, 59], [33, 64], [38, 100], [31, 127], [0, 137], [-31, 127], [-38, 100]];
    out.push(h.path(courbe(avant.map(p => Q(...p)), true), h.a.plein));
    out.push(h.path(courbe(talon.map(p => Q(...p)), true), h.a.plein));
    for (const [v, w] of [[-112, 26], [-88, 34], [-64, 36], [-40, 34], [-16, 30], [6, 24], [84, 26], [108, 26]]) out.push(h.chemin([Q(-w + 5, v), Q(w - 1, v)], h.a.fin.replace('#1A1A1A', '#FFFFFF').replace('0.5', '1.1')));
    return out.join('\n');
  };
  const dessinSacP = z => {
    const { s, P } = geoSacP(z), out = [];
    // le plancher : les planches vues de dessus, leurs joints décalés
    for (const y of [-225, -75, 75, 225]) out.push(h.chemin([P(-30, y), P(960, y)], h.a.detail));
    for (const [x, y0, y1] of [[330, -225, -75], [760, -75, 75], [180, 75, 225], [610, -245, -225], [930, 225, 245]]) out.push(h.chemin([P(x, y0), P(x, y1)], h.a.detail));
    // le sac, couché
    const corps = [[112, -22], [150, -70], [205, -150], [290, -196], [450, -207], [650, -204], [800, -200], [846, -206], [862, -170], [866, 0], [862, 170], [846, 206], [800, 200], [650, 204], [450, 207], [290, 196], [205, 150], [150, 70], [112, 22]].map(p => P(...p));
    out.push(h.path(courbe(corps, true), blanc('arete')));
    out.push(h.path(courbe([P(846, -188), P(852, 0), P(846, 188)]), h.a.fin));
    [[[130, -14], [240, -110]], [[130, 14], [250, 120]], [[150, 0], [300, -20]]].forEach(([a, b]) => out.push(h.chemin([P(...a), P(...b)], h.a.fin)));
    const fraise = [[108, -24], [70, -58], [34, -66], [14, -30], [10, 8], [26, 48], [62, 62], [106, 26]].map(p => P(...p));
    out.push(h.path(courbe(fraise, true), blanc('arete')));
    [[[100, -12], [36, -48]], [[100, 0], [20, -2]], [[100, 12], [42, 44]]].forEach(([a, b]) => out.push(h.chemin([P(...a), P(...b)], h.a.fin)));
    const l0 = P(102, -26), l1 = P(118, 26);
    out.push(h.rect(l0[0], l0[1], l1[0] - l0[0], l1[1] - l0[1], blanc('detail')));
    [-12, 0, 12].forEach(y => out.push(h.chemin([P(102, y - 3), P(118, y + 3)], h.a.fin)));
    out.push(h.path(courbe([P(110, 26), P(100, 60), P(92, 96)]), h.a.detail), h.path(courbe([P(116, 26), P(130, 58), P(146, 86)]), h.a.detail));
    // les empreintes sur le bout des épis
    out.push(empreinte(P, 638, 62, true, -6), empreinte(P, 796, -64, false, 6));
    void s;
    return out.join('\n');
  };
  const renvoisSacP = z => {
    const { P } = geoSacP(z);
    return [{ n: 10, rond: P(915, 205).map(f), cible: P(672, 168).map(f), texte: 'on marche sur le bout des épis' }];
  };

  return {
    ref: '98-07',
    titre: 'Battre sans fléau : les perches et le sac piétiné',
    desc: 'Quatre vues. En perspective, une toile étendue au sol, deux traverses couchées dessus, et un lit de dix perches posées en travers des traverses, avec un jour entre chaque perche ; un tas de paille à épis jeté sur la moitié du fond. En coupe à travers les perches : un bâton tombe à plat sur la paille couchée sur les perches ; le grain passe entre les perches et s’amasse sur la toile, la paille reste dessus ; l’écart entre deux perches est coté de 25 à 50 mm. Le sac de toile noué, couché sur un plancher, en coupe : les tiges vers la bouche, les épis tassés au fond ; deux flèches appuient sur le bout des épis. Le même sac vu de dessus, sur les planches : deux empreintes de bottes sur ce bout du sac.',
    format: 'pleine',
    disposition: [['aire'], ['coupe'], ['sacC', 'sacP']],
    hauteurs: [1.3, 1.05, 0.75],
    vues: {
      aire: { titre: 'L’aire à perches, montée', dessin: dessinAire, renvois: renvoisAire },
      coupe: { titre: 'En coupe à travers les perches, pendant qu’on bat', dessin: dessinCoupe, renvois: renvoisCoupe },
      sacC: { titre: 'Le sac, en coupe', dessin: dessinSacC, renvois: renvoisSacC },
      sacP: { titre: 'Le même sac, vu de dessus', dessin: dessinSacP, renvois: renvoisSacP },
    },
  };
};
