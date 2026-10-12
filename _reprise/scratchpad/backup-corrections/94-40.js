// Planche 94-40 — la sève sans équipement (ch. 94 : étapes 14, 15 et 20 ; §9 « Le froid fait le
// travail », « Le chalumeau, le contenant, le couvercle », « Mesurer le sucre de la sève sans balance »).
// Trois gestes : le chalumeau de bois taillé et enfoncé au maillet de bois ; la cryoconcentration (la
// nuit sous couvercle, au matin la plaque de glace qui s'égoutte sur deux bâtons) ; le résidu sec pesé
// contre de l'eau sur une balance d'égalité.
// Cotes : le diamètre du chalumeau (8 ou 11 mm, celui de la mèche) et la profondeur du trou (4 cm
// environ), les seules que le chapitre donne. La longueur du chalumeau n'est pas cotée.
// La main du maillet vient de h.formes.

module.exports = (h) => {
  const F = h.formes;
  const r1 = (n) => Math.round(n * 10) / 10;
  const B = (a) => a.replace('fill="none"', 'fill="#FFFFFF"');   // trait + fond blanc
  const hasard = (graine) => { let s = graine; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; };
  const RAD = Math.PI / 180;

  // Courbe fermée lisse (Catmull-Rom) passant par les points.
  const lisse = (p) => {
    const n = p.length; let d = `M${r1(p[0][0])},${r1(p[0][1])}`;
    for (let i = 0; i < n; i++) {
      const p0 = p[(i - 1 + n) % n], p1 = p[i], p2 = p[(i + 1) % n], p3 = p[(i + 2) % n];
      d += ` C${r1(p1[0] + (p2[0] - p0[0]) / 6)},${r1(p1[1] + (p2[1] - p0[1]) / 6)} ${r1(p2[0] - (p3[0] - p1[0]) / 6)},${r1(p2[1] - (p3[1] - p1[1]) / 6)} ${r1(p2[0])},${r1(p2[1])}`;
    }
    return d + ' Z';
  };

  // Une pierre : contour irrégulier, deux ou trois grains.
  const pierre = (cx, cy, rx, ry, graine) => {
    const R = hasard(graine); const p = [];
    for (let i = 0; i < 9; i++) { const a = i / 9 * 2 * Math.PI; const k = 0.88 + 0.16 * R(); p.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]); }
    const grains = [0, 1, 2].map(() => { const x = cx + (R() - 0.5) * rx, y = cy + (R() - 0.4) * ry * 0.7; return h.ligne(r1(x), r1(y), r1(x + 3), r1(y + 1), h.a.detail); });
    return [h.path(lisse(p), B(h.a.arete)), ...grains].join('\n');
  };

  // Une goutte, pointe en haut ; k : taille.
  const goutte = (x, y, k = 1) => h.path(`M${r1(x)},${r1(y - 9 * k)} C${r1(x + 5 * k)},${r1(y - 2 * k)} ${r1(x + 4.5 * k)},${r1(y + 4 * k)} ${r1(x)},${r1(y + 4 * k)} C${r1(x - 4.5 * k)},${r1(y + 4 * k)} ${r1(x - 5 * k)},${r1(y - 2 * k)} ${r1(x)},${r1(y - 9 * k)} Z`, B(h.a.arete));

  // Un flocon : trois traits croisés.
  const flocon = (x, y, r = 3.5) => [0, 60, 120].map(a => h.ligne(r1(x - Math.cos(a * RAD) * r), r1(y - Math.sin(a * RAD) * r), r1(x + Math.cos(a * RAD) * r), r1(y + Math.sin(a * RAD) * r), h.a.detail)).join('\n');

  // Les fêlures de la glace : de petites lignes brisées, jamais parallèles.
  const reflets = (pts) => pts.map(([x, y], i) => h.chemin(
    (i % 2 ? [[x - 7, y + 3], [x - 2, y - 1], [x + 2, y + 2], [x + 8, y - 3]] : [[x - 6, y - 3], [x - 1, y + 2], [x + 4, y - 1], [x + 7, y + 4]]).map(q => [r1(q[0]), r1(q[1])]), h.a.fin)).join('\n');

  // Points d'une ellipse, et intersection de deux ellipses (convexes) en polygone.
  const ell = (cx, cy, rx, ry, n = 72) => { const a = []; for (let i = 0; i < n; i++) { const t = i / n * 2 * Math.PI; a.push([cx + rx * Math.cos(t), cy + ry * Math.sin(t)]); } return a; };
  const dans = (p, e) => ((p[0] - e[0]) / e[2]) ** 2 + ((p[1] - e[1]) / e[3]) ** 2 <= 1.0001;
  const inter = (e1, e2) => {
    const pts = [...ell(...e1).filter(p => dans(p, e2)), ...ell(...e2).filter(p => dans(p, e1))];
    const c = pts.reduce((s, p) => [s[0] + p[0] / pts.length, s[1] + p[1] / pts.length], [0, 0]);
    return pts.sort((a, b) => Math.atan2(a[1] - c[1], a[0] - c[0]) - Math.atan2(b[1] - c[1], b[0] - c[0])).map(p => [r1(p[0]), r1(p[1])]);
  };
  // L'arc visible d'une ellipse e1 : ses points à l'intérieur de e2, en une polyligne ordonnée.
  const arcDans = (e1, e2) => {
    const P = ell(...e1, 144), ok = P.map(p => dans(p, e2));
    let k = ok.findIndex((v, i) => v && !ok[(i - 1 + P.length) % P.length]);
    if (k < 0) return ok[0] ? P : [];
    const out = []; for (let i = 0; i < P.length && ok[(k + i) % P.length]; i++) out.push(P[(k + i) % P.length]);
    return out.map(p => [r1(p[0]), r1(p[1])]);
  };

  // Une coupe de tronc, arrachée sur trois côtés : écorce à droite (en x = ecorce(y)), fil du bois vertical.
  const serie = (a, b, pas, f) => { const o = []; const n = Math.ceil(Math.abs(b - a) / pas); for (let i = 0; i <= n; i++) o.push(f(a + (b - a) * i / n)); return o.map(p => [r1(p[0]), r1(p[1])]); };
  const tronc = (xL, yT, yB, X0, ep) => {
    const haut = x => yT + 2.2 * Math.sin(x / 9), bas = x => yB - 2.2 * Math.sin(x / 11 + 1), gch = y => xL + 2.2 * Math.sin(y / 10);
    const ecorce = y => X0 + 1.1 * Math.sin(y / 7) + 0.7 * Math.sin(y / 3.1);
    const tour = [...serie(xL, X0, 4, x => [x, haut(x)]), ...serie(yT, yB, 3, y => [ecorce(y), y]), ...serie(X0, xL, 4, x => [x, bas(x)]), ...serie(yB, yT, 4, y => [gch(y), y])];
    const fibres = [];
    for (let x = xL + 8; x < X0 - ep - 3; x += 9) fibres.push(h.chemin(serie(haut(x) + 3, bas(x) - 3, 6, y => [x + 0.9 * Math.sin(y / 17 + x), y]), h.a.fin));
    const tirets = []; for (let y = yT + 7; y < yB - 4; y += 8) tirets.push(h.ligne(r1(ecorce(y) - ep + 1.5), y, r1(ecorce(y) - 1.5), y, h.a.fin));
    return {
      fond: [h.chemin(tour, h.a.blanc, true), ...fibres, h.chemin(serie(yT + 2, yB - 2, 3, y => [ecorce(y) - ep, y]), h.a.detail), ...tirets].join('\n'),
      bords: [h.chemin(serie(yT, yB, 3, y => [ecorce(y), y]), h.a.contour),
        h.chemin(serie(xL, X0, 4, x => [x, haut(x)]), h.a.detail), h.chemin(serie(xL, X0, 4, x => [x, bas(x)]), h.a.detail),
        h.chemin(serie(yT, yB, 4, y => [gch(y), y]), h.a.detail)].join('\n'),
    };
  };
  // Un repère tourné : a le long de l'axe (vers l'extérieur de l'arbre), b vers le bas.
  const TH = 6;                                  // le trou monte de quelques degrés vers le cœur
  const repere = (E) => { const c = Math.cos(TH * RAD), s = Math.sin(TH * RAD); return (a, b) => [E[0] + c * a - s * b, E[1] + s * a + c * b]; };
  const R1 = (p) => [r1(p[0]), r1(p[1])];

  // ─── Vue 1 : le chalumeau taillé, de côté et du bout, puis en place dans le tronc (2,2 px par mm) ───
  const K = 2.2, DIA = 11 * K, RC = DIA / 2, LCH = 70 * K, GW = 4 * K, GD = 4 * K;
  const ENF = 26 * K, PROF = 40 * K;             // enfoncé : dessin seulement ; profondeur du trou : 4 cm environ
  const TA = (z) => {
    const x0 = 60, x1 = x0 + LCH, ye = 26, yc = ye + RC, xb = x1 + 50;
    const xs = x0 + ENF, yA = z.h - 46, Q = repere([xs, yA]);
    return { x0, x1, ye, yc, xb, xs, yA, Q };
  };
  const vueTaille = (z) => {
    const { x0, x1, ye, yc, xb, xs, yA, Q } = TA(z);
    const yg = Math.sqrt(RC * RC - (GW / 2) ** 2);
    const bout = `M${r1(xb + GW / 2)},${r1(yc - yg)} A${r1(RC)},${r1(RC)} 0 1 1 ${r1(xb - GW / 2)},${r1(yc - yg)} L${r1(xb - GW / 2)},${r1(yc - RC + GD - GW / 2)} A${r1(GW / 2)},${r1(GW / 2)} 0 0 0 ${r1(xb + GW / 2)},${r1(yc - RC + GD - GW / 2)} Z`;
    const tr = tronc(12, yA - 74, z.h - 6, xs, 8);
    const aIn = -ENF, aOut = LCH - ENF, rh = RC, gd = GD;
    const trou = [Q(2, -rh), Q(-PROF + 7, -rh), Q(-PROF, 0), Q(-PROF + 7, rh), Q(2, rh)].map(R1);
    const corps = [Q(aIn, rh), Q(aOut, rh), Q(aOut, -rh + gd), Q(aIn, -rh + gd)].map(R1);
    const bt = Q(aOut, rh), fond = Q(-PROF, 0), coteY = Q(-PROF, -rh)[1] - 14;
    return [
      // de côté, et du bout (rappels entre les deux)
      h.ligne(x1 + 6, ye, xb - RC - 6, ye, h.a.fin), h.ligne(x1 + 6, ye + DIA, xb - RC - 6, ye + DIA, h.a.fin),
      h.ligne(x1 + 6, ye + GD, xb - GW / 2 - 6, ye + GD, h.a.fin),
      h.rect(x0, ye, LCH, DIA, B(h.a.contour)),
      h.ligne(x0, ye + GD, x1, ye + GD, h.a.cache),
      h.ligne(x0 + 22, ye + DIA * 0.66, x1 - 36, ye + DIA * 0.66, h.a.fin),
      h.ligne(x0 + 60, ye + DIA * 0.84, x1 - 12, ye + DIA * 0.84, h.a.fin),
      h.path(bout, B(h.a.contour)),
      h.cercle(xb + 1.5, yc + 3, 1, h.a.plein),
      h.cote(xb - RC, ye + DIA + 14, xb + RC, ye + DIA + 14, 'Ø 8 ou 11 mm', { cote: 'dessous' }),
      // en place : le tronc coupé par l'axe du trou
      tr.fond,
      tr.bords,
      h.chemin(trou, h.a.blanc, true),
      h.chemin([Q(1, -rh), Q(-PROF + 7, -rh), Q(-PROF, 0), Q(-PROF + 7, rh), Q(1, rh)].map(R1), h.a.arete),
      // le chalumeau coupé par son axe : le corps hachuré, la gouttière vide au-dessus ;
      // derrière la coupe, l'autre flanc de la gouttière et ses deux bouts
      h.chemin(corps, h.a.hachure('bois', 'arete'), true),
      h.chemin([Q(aIn, -rh + gd), Q(aIn, -rh)].map(R1), h.a.arete),
      h.chemin([Q(0.5, -rh), Q(aOut, -rh), Q(aOut, -rh + gd)].map(R1), h.a.arete),
      // la sève : de la chambre au fond du trou, par la gouttière, jusqu'au bout
      h.fleche(`M${R1(Q(-PROF + 12, 3)).join(',')} L${R1(Q(aIn - 4, -rh + gd / 2)).join(',')} L${R1(Q(aOut - 12, -rh + gd / 2)).join(',')}`, h.a.cache),
      goutte(bt[0] - 2, bt[1] + 8, 0.75), goutte(bt[0] - 3, bt[1] + 28, 0.9),
      // la profondeur du trou
      h.ligne(r1(fond[0]), r1(fond[1] - 3), r1(fond[0]), r1(coteY - 4), h.a.fin),
      h.cote(r1(fond[0]), r1(coteY), r1(xs), r1(coteY), 'env. 40 mm'),
    ].join('\n');
  };

  // ─── Vue 2 : au maillet de bois (le tronc de côté, 0,85 px par mm) ───
  const S = 0.85;
  const GB = (z) => {
    const X0 = 58, yH = 50, Q = repere([X0, yH]);
    const rh = 5.5 * S, gd = 4 * S, aOut = 45 * S;
    const aH0 = aOut + 12, LH = 100 * S, RH = 30 * S, aHc = aH0 + LH / 2, rM = 13 * S, bGrip = 88 * S, bFin = 142 * S;
    return { X0, yH, Q, rh, gd, aOut, aH0, LH, RH, aHc, rM, bGrip, bFin };
  };
  const vueMaillet = (z) => {
    const { X0, yH, Q, rh, gd, aOut, aH0, LH, RH, aHc, rM, bGrip, bFin } = GB(z);
    // le tronc vu de côté : l'écorce et ses lenticelles
    const yT = 8, yB = z.h - 8, xL = 10;
    const ecorce = y => X0 + 1.1 * Math.sin(y / 7) + 0.7 * Math.sin(y / 3.1);
    const haut = x => yT + 2.2 * Math.sin(x / 9), bas = x => yB - 2.2 * Math.sin(x / 11 + 1), gch = y => xL + 2.2 * Math.sin(y / 10);
    const tour = [...serie(xL, X0, 4, x => [x, haut(x)]), ...serie(yT, yB, 3, y => [ecorce(y), y]), ...serie(X0, xL, 4, x => [x, bas(x)]), ...serie(yB, yT, 4, y => [gch(y), y])];
    const R = hasard(7), lent = [];
    for (let y = yT + 10; y < yB - 6; y += 11) { let x = xL + 6 + 8 * R(); while (x < X0 - 10) { const l = 5 + 9 * R(), dy = 3 * R(); lent.push(h.ligne(r1(x), r1(y + dy), r1(Math.min(x + l, X0 - 4)), r1(y + dy), h.a.detail)); x += l + 6 + 10 * R(); } }
    const manche = h.chemin([Q(aHc - rM, RH - 2), Q(aHc - rM, bFin - 3), Q(aHc - rM + 3, bFin), Q(aHc + rM - 3, bFin), Q(aHc + rM, bFin - 3), Q(aHc + rM, RH - 2)].map(R1), B(h.a.contour), true);
    const mG = Q(aHc, bGrip);
    const m = F.main({ x: mG[0], y: mG[1], pose: 'prise', vue: 'dos', cote: 'gauche', echelle: S, angle: TH, diametre: 2 * rM, bras: 26, objet: manche });
    const tete = [Q(aH0, -RH + 5), Q(aH0 + 5, -RH), Q(aH0 + LH - 5, -RH), Q(aH0 + LH, -RH + 5), Q(aH0 + LH, RH - 5), Q(aH0 + LH - 5, RH), Q(aH0 + 5, RH), Q(aH0, RH - 5)].map(R1);
    return [
      h.chemin(tour, h.a.blanc, true), ...lent,
      h.chemin(serie(yT, yB, 3, y => [ecorce(y), y]), h.a.contour),
      h.chemin(serie(xL, X0, 4, x => [x, haut(x)]), h.a.detail), h.chemin(serie(xL, X0, 4, x => [x, bas(x)]), h.a.detail),
      h.chemin(serie(yT, yB, 4, y => [gch(y), y]), h.a.detail),
      // le chalumeau qui dépasse, la gouttière dessus
      h.chemin([Q(-1, -rh), Q(aOut, -rh), Q(aOut, rh), Q(-1, rh)].map(R1), B(h.a.arete), true),
      h.chemin([Q(0, -rh + gd), Q(aOut, -rh + gd)].map(R1), h.a.cache),
      // la main tient le manche ; la tête passe par-dessus
      m,
      h.chemin(tete, B(h.a.contour), true),
      h.chemin([Q(aH0 + 10, -RH * 0.42), Q(aH0 + LH - 24, -RH * 0.42)].map(R1), h.a.fin),
      h.chemin([Q(aH0 + 26, RH * 0.5), Q(aH0 + LH - 9, RH * 0.5)].map(R1), h.a.fin),
      h.chemin([Q(aHc - rM, -RH), Q(aHc - rM, -RH - 5), Q(aHc + rM, -RH - 5), Q(aHc + rM, -RH)].map(R1), B(h.a.arete)),
      h.chemin([Q(aHc, -RH - 5), Q(aHc, -RH - 1)].map(R1), h.a.detail),
      // le coup, dans l'axe du chalumeau
      h.fleche(`M${R1(Q(aH0 + LH * 0.7, -RH - 11)).join(',')} L${R1(Q(aH0 - 2, -RH - 11)).join(',')}`, h.a.arete),
    ].join('\n');
  };

  // ─── Vues 3 et 4 : la nuit, au matin (coupe du contenant) ───
  const BAS = { Wt: 244, Wb: 200, Hb: 50, ep: 3.5 };
  const GC = (z) => {
    const cx = z.l / 2, yr = z.h - 20 - BAS.Hb;
    const { Wt, Wb, Hb, ep } = BAS, yb = yr + Hb, yf = yb - ep;
    const hwOut = y => Wt / 2 - (Wt - Wb) / 2 * (y - yr) / Hb, hwIn = y => hwOut(y) - ep * 1.1;
    const y0 = yr + 15, y1 = yr + 28;           // la glace de y0 à y1, la sève dessous
    const vague = (xa, xb, y, sens) => { const a = []; const n = 24; for (let i = 0; i <= n; i++) { const x = sens > 0 ? xa + (xb - xa) * i / n : xb - (xb - xa) * i / n; a.push([r1(x), r1(y + 1.4 * Math.sin(x / 7) + 0.8 * Math.sin(x / 2.3))]); } return a; };
    return { cx, yr, yb, yf, hwIn, y0, y1, vague };
  };
  const contenant = (g, z, bordArriere = true) => {
    const { cx, yr, yb, yf, hwIn } = g, { Wt, Wb } = BAS;
    return [
      // la neige sous le contenant
      h.chemin([[12, yb], [z.l - 12, yb], [z.l - 12, yb + 11], [12, yb + 11]], h.a.hachure('neige', 'aucun'), true),
      h.ligne(12, yb, z.l - 12, yb, h.a.detail),
      // la paroi coupée, et le bord du fond vu derrière
      h.chemin([[cx - Wt / 2, yr], [cx - Wb / 2, yb], [cx + Wb / 2, yb], [cx + Wt / 2, yr], [cx + hwIn(yr), yr], [cx + hwIn(yf), yf], [cx - hwIn(yf), yf], [cx - hwIn(yr), yr]].map(p => [r1(p[0]), r1(p[1])]), h.a.plein, true),
      bordArriere ? h.ligne(r1(cx - hwIn(yr)), yr, r1(cx + hwIn(yr)), yr, h.a.arete) : '',
    ].join('\n');
  };
  const seve = (g) => {
    const { cx, yf, hwIn, y1, vague } = g;
    const dessus = vague(cx - hwIn(y1), cx + hwIn(y1), y1, 1);
    return [
      h.chemin([...dessus, [r1(cx + hwIn(yf)), yf], [r1(cx - hwIn(yf)), yf]], h.a.hachure('eau', 'aucun'), true),
      h.chemin(dessus, h.a.arete),
    ].join('\n');
  };
  const vueNuit = (z) => {
    const g = GC(z), { cx, yr, hwIn, y0, y1, vague } = g, { Wt } = BAS;
    const dessous = vague(cx - hwIn(y1), cx + hwIn(y1), y1, -1);
    const glace = [[r1(cx - hwIn(y0)), y0], [r1(cx + hwIn(y0)), y0], ...dessous];
    // le couvercle d'écorce, cintré, posé sur le bord
    const W2 = Wt / 2, dep = 16, bas = [], hautC = [];
    for (let i = 0; i <= 40; i++) { const x = cx - W2 - dep + (2 * (W2 + dep)) * i / 40, u = (x - cx) / W2; bas.push([r1(x), r1(yr - 11 * (1 - u * u))]); }
    bas.forEach(p => hautC.push([p[0], r1(p[1] - 4.5)]));
    const tirets = []; for (let i = 3; i < 40; i += 3) { const p = bas[i], q = bas[i + 1]; tirets.push(h.ligne(p[0], r1(p[1] - 2.2), r1(p[0] + (q[0] - p[0]) * 0.6), r1(q[1] - 2.2), h.a.fin)); }
    const yPierre = yr - 11 - 4.5 - 12;
    return [
      contenant(g, z, false),
      seve(g),
      h.chemin(glace, B(h.a.arete), true),
      reflets([[cx - 88, y0 + 7], [cx - 30, y0 + 6], [cx + 30, y0 + 7], [cx + 86, y0 + 6]]),
      h.chemin([...bas, ...hautC.slice().reverse()], B(h.a.arete), true),
      ...tirets,
      pierre(cx + 4, yPierre, 30, 13, 17),
      flocon(cx - 104, yr - 30), flocon(cx - 60, yr - 46), flocon(cx + 64, yr - 42), flocon(cx + 112, yr - 26), flocon(cx + 124, yr - 52, 3), flocon(cx - 126, yr - 54, 3),
    ].join('\n');
  };
  const vueMatin = (z) => {
    const g = GC(z), { cx, yr, hwIn, y0, y1, vague } = g;
    const ep = y1 - y0, yb0 = yr - 10.5, yh0 = yb0 - ep;   // la plaque posée sur les bâtons
    const dessous = vague(cx - hwIn(y1), cx + hwIn(y1), yb0, -1);
    const plaque = [[r1(cx - hwIn(y0)), r1(yh0)], [r1(cx + hwIn(y0)), r1(yh0)], ...dessous];
    return [
      contenant(g, z),
      seve(g),
      // les deux bâtons en travers, coupés
      h.cercle(cx - 54, yr - 5.2, 5.2, h.a.hachure('bois', 'arete')), h.cercle(cx + 54, yr - 5.2, 5.2, h.a.hachure('bois', 'arete')),
      h.chemin(plaque, B(h.a.arete), true),
      reflets([[cx - 88, yh0 + 7], [cx - 30, yh0 + 6], [cx + 30, yh0 + 7], [cx + 86, yh0 + 6]]),
      // ce qui s'égoutte retombe dans le contenant
      goutte(cx - 96, yb0 + 7, 0.6), goutte(cx - 12, yb0 + 7, 0.6), goutte(cx + 98, yb0 + 7, 0.6),
      goutte(cx - 90, yr + 14, 0.75), goutte(cx - 28, yr + 6, 0.75), goutte(cx + 22, yr + 18, 0.75), goutte(cx + 84, yr + 8, 0.75),
      h.path(`M${r1(cx - 98)},${r1(y1 + 3)} q8,-5 16,0`, h.a.detail), h.path(`M${r1(cx + 14)},${r1(y1 + 3)} q8,-5 16,0`, h.a.detail),
    ].join('\n');
  };

  // ─── Vue 5 : la balance d'égalité ───
  const GE = (z) => {
    const cxB = z.l / 2 + 40, yBr = 18, yRod = 56, Lr = 150, yT = yRod + 56, rxT = 40, ryT = 12, hT = 14;
    const xL = cxB - Lr + 10, xR = cxB + Lr - 10;
    const mes = { cx: 92, cy: z.h - 84, rx: 30, ry: 9, ht: 58, xe: 103, pe: 12 };
    return { cxB, yBr, yRod, Lr, yT, rxT, ryT, hT, xL, xR, mes };
  };
  const plateau = (xt, yT, rxT, ryT, hT) => {
    const rxb = rxT - 8, ryb = ryT * rxb / rxT;
    const avant = []; for (let i = 0; i <= 24; i++) { const t = i / 24 * Math.PI; avant.push([r1(xt + rxb * Math.cos(t)), r1(yT + hT + ryb * Math.sin(t))]); }
    const corps = [[r1(xt + rxT), yT], ...avant, [r1(xt - rxT), yT]];
    const tirets = [[-22, 7], [-6, 11], [12, 8], [-14, 15], [6, 17]].map(([dx, dy]) => h.ligne(xt + dx, yT + dy + 2, xt + dx + 5, yT + dy + 2, h.a.fin));
    return [h.chemin(corps, B(h.a.contour), true), ...tirets, h.ellipse(xt, yT, rxT, ryT, B(h.a.arete))].join('\n');
  };
  const vueBalance = (z) => {
    const g = GE(z), { cxB, yBr, yRod, Lr, yT, rxT, ryT, hT, xL, xR, mes } = g;
    const out = [];
    // la branche
    const b0 = cxB - 200, b1 = cxB + 130, bh = [], bb = [];
    for (let i = 0; i <= 30; i++) { const x = b0 + (b1 - b0) * i / 30, e = 7.5 - 1.8 * i / 30 + 0.6 * Math.sin(x / 13); bh.push([r1(x), r1(yBr - e)]); bb.push([r1(x), r1(yBr + e + 0.4 * Math.sin(x / 7))]); }
    out.push(h.chemin([...bh, ...bb.slice().reverse()], B(h.a.contour), true));
    out.push(h.ellipse(b0, yBr, 3.2, 7.5, B(h.a.arete)), h.ellipse(b1, yBr, 2.6, 5.8, B(h.a.arete)));
    out.push(h.ligne(b0 + 40, yBr - 2, b0 + 64, yBr - 2.5, h.a.fin), h.ligne(cxB + 40, yBr + 2, cxB + 70, yBr + 1.5, h.a.fin), h.ligne(cxB - 70, yBr + 1, cxB - 52, yBr + 1, h.a.fin));
    // la corde du milieu, nouée autour de la branche et de la tige
    out.push(F.cordes([
      { pts: [[cxB, yBr + 7], [cxB, yRod - 4]], ep: 3, debut: 'coupe', fin: 'coupe' },
      { pts: [[cxB - 5, yBr - 8], [cxB + 1, yBr + 8]], ep: 3, debut: 'coupe', fin: 'coupe' },
      { pts: [[cxB + 1, yBr - 8], [cxB + 7, yBr + 8]], ep: 3, debut: 'coupe', fin: 'coupe' },
    ], { trait: 'detail' }));
    // la tige
    out.push(h.chemin([[cxB - Lr, yRod - 3.6], [cxB + Lr, yRod - 3.6], [cxB + Lr, yRod + 3.6], [cxB - Lr, yRod + 3.6]], B(h.a.contour), true));
    out.push(h.ellipse(cxB + Lr, yRod, 1.6, 3.6, B(h.a.detail)));
    out.push(h.ligne(cxB - 110, yRod + 0.5, cxB - 60, yRod + 0.5, h.a.fin), h.ligne(cxB + 40, yRod - 0.5, cxB + 96, yRod - 0.5, h.a.fin));
    // les cordes des plateaux, trois par plateau
    for (const xe of [xL, xR]) {
      out.push(F.cordes([
        { pts: [[xe, yRod + 3], [xe - rxT + 1, yT]], ep: 2.4, debut: 'coupe', fin: 'coupe' },
        { pts: [[xe, yRod + 3], [xe + rxT - 1, yT]], ep: 2.4, debut: 'coupe', fin: 'coupe' },
        { pts: [[xe, yRod + 3], [xe, yT - ryT]], ep: 2.4, debut: 'coupe', fin: 'coupe' },
      ], { trait: 'detail' }));
    }
    out.push(F.cordes([
      { pts: [[xL - 5, yRod - 6], [xL + 1, yRod + 6]], ep: 2.6, debut: 'coupe', fin: 'coupe' },
      { pts: [[xR - 1, yRod - 6], [xR + 5, yRod + 6]], ep: 2.6, debut: 'coupe', fin: 'coupe' },
      { pts: [[cxB - 3, yRod - 6], [cxB + 3, yRod + 6]], ep: 2.6, debut: 'coupe', fin: 'coupe' },
    ], { trait: 'detail' }));
    // à gauche : le résidu sec
    out.push(plateau(xL, yT, rxT, ryT, hT));
    const tas = `M${xL - 17},${yT + 6} C${xL - 12},${yT - 3} ${xL - 4},${yT - 6} ${xL + 2},${yT - 5} C${xL + 9},${yT - 4} ${xL + 15},${yT + 1} ${xL + 19},${yT + 6} C${xL + 8},${yT + 9} ${xL - 6},${yT + 9} ${xL - 17},${yT + 6} Z`;
    out.push(h.path(tas, h.a.hachure('gravier', 'detail')));
    // à droite : l'eau, versée jusqu'à ce que la tige soit de niveau
    out.push(plateau(xR, yT, rxT, ryT, hT));
    const eE = [xR, yT + 5, rxT - 3, ryT - 1], eR = [xR, yT, rxT - 1.5, ryT - 1.2];
    out.push(h.chemin(inter(eE, eR), h.a.hachure('eau', 'aucun'), true));
    out.push(h.chemin(arcDans(eE, eR), h.a.detail));
    // le gobelet qui verse, penché
    const phi = -122 * RAD, lip = [xR + 36, yT - 50];
    const Rg = (u, v) => [r1(lip[0] + Math.cos(phi) * u - Math.sin(phi) * v), r1(lip[1] + Math.sin(phi) * u + Math.cos(phi) * v)];
    // repère du gobelet : l'embouchure le long de u (0 à 26), le fond à v = 34
    const emb = [], fond = [];
    for (let i = 0; i <= 24; i++) { const t = i / 24 * 2 * Math.PI; emb.push(Rg(13 + 13 * Math.cos(t), 4 * Math.sin(t))); }
    for (let i = 0; i <= 12; i++) { const t = i / 12 * Math.PI; fond.push(Rg(13 + 11 * Math.cos(t), 34 + 3.4 * Math.sin(t))); }
    out.push(h.chemin([Rg(0, 0), Rg(2, 34), ...fond.slice().reverse(), Rg(24, 34), Rg(26, 0)], B(h.a.contour), true));
    out.push(h.chemin(emb, B(h.a.arete), true));
    const jet = `M${lip[0] - 1},${lip[1] + 1} C${lip[0] - 4},${lip[1] + 14} ${xR + 18},${yT - 26} ${xR + 14},${yT + 4} L${xR + 10},${yT + 4} C${xR + 14},${yT - 24} ${lip[0] - 8},${lip[1] + 12} ${lip[0] - 5},${lip[1] - 1} Z`;
    out.push(h.path(jet, B(h.a.detail)));
    // la mesure de sève, à l'encoche
    const { cx, cy, rx, ry, ht, xe, pe } = mes;
    const avant = x => cy + ry * Math.sqrt(Math.max(0, 1 - ((x - cx) / rx) ** 2));
    const bord = []; for (let i = 0; i <= 36; i++) { const t = i / 36 * Math.PI; bord.push([r1(cx + rx * Math.cos(t)), r1(cy + ht + ry * Math.sin(t))]); }
    out.push(h.chemin([[cx + rx, cy], ...bord, [cx - rx, cy]], B(h.a.contour), true));
    out.push(h.ellipse(cx, cy, rx, ry, B(h.a.arete)));
    const eS = [cx, cy + pe, rx - 1.2, ry], eM = [cx, cy, rx - 1.5, ry - 1.2];
    out.push(h.chemin(inter(eS, eM), h.a.hachure('eau', 'aucun'), true));
    out.push(h.chemin(arcDans(eS, eM), h.a.detail));
    // l'encoche : un V taillé dans le bord, son fond au niveau de la sève
    const v = [[xe - 5, avant(xe - 5)], [xe, avant(xe) + pe], [xe + 5, avant(xe + 5)]].map(p => [r1(p[0]), r1(p[1])]);
    out.push(h.chemin([[v[0][0], v[0][1] - 0.6], [v[2][0], v[2][1] - 0.6], [v[2][0], v[2][1] + 3], [v[0][0], v[0][1] + 3]], h.a.blanc, true));
    out.push(h.chemin(v, h.a.arete));
    out.push(...[[-18, 16], [-4, 26], [10, 36], [-14, 44], [6, 52]].map(([dx, dy]) => h.ligne(cx + dx, cy + dy + 6, cx + dx + 5, cy + dy + 6, h.a.fin)));
    return out.join('\n');
  };

  return {
    ref: '94-40',
    titre: 'La sève sans équipement',
    desc: 'Un goujon de bois dur creusé d’une gouttière sur le dessus, vu de dessus, de côté et du bout ; en coupe dans le tronc, enfoncé au maillet de bois dans un trou qui monte un peu vers le cœur, la sève qui suit la gouttière et tombe au bout. La nuit, la sève gèle par le dessus dans un contenant large et peu profond sous une écorce lestée d’une pierre ; au matin, la plaque de glace s’égoutte dans le contenant, posée sur deux bâtons. Le résidu sec d’une mesure de sève prise à l’encoche est pesé contre de l’eau sur une tige pendue en son milieu.',
    format: 'pleine',
    disposition: [['taille', 'maillet'], ['nuit', 'matin'], ['balance']],
    hauteurs: [1.4, 1, 1.1],
    largeurs: [[1.1, 0.9], [1, 1], [1]],
    vues: {
      taille: {
        titre: 'Le chalumeau, taillé et en place',
        dessin: vueTaille,
        renvois: z => {
          const { x0, ye, xb, xs, yA, Q } = TA(z);
          const aOut = LCH - ENF;
          return [
            { n: 1, rond: [xb + 38, 12], cible: [xb, ye + GD - 2], texte: 'gouttière sur le dessus' },
            { n: 2, rond: [x0 + 112, ye + DIA + 28], cible: [x0 + 112, ye + DIA * 0.75], texte: 'goujon de bois dur' },
            { n: 3, rond: [34, yA + 34], cible: Q(-PROF + 16, RC), texte: 'trou qui monte un peu' },
            { n: 4, rond: [xs + 76, yA - 44], cible: Q(aOut - 30, -RC + GD / 2), texte: 'la sève suit la gouttière' },
          ];
        },
      },
      maillet: {
        titre: 'Au maillet de bois',
        dessin: vueMaillet,
        renvois: z => {
          const { X0, yH, Q, rh, aOut, aH0, LH, RH } = GB(z);
          return [
            { n: 5, rond: [z.l - 18, 16], cible: Q(aH0 + LH * 0.8, -RH * 0.1), texte: 'maillet de bois, pas d’acier' },
            { n: 6, rond: [X0 + 14, yH + 48], cible: Q(aOut * 0.5, rh), texte: 'enfoncé jusqu’à tenir seul' },
          ];
        },
      },
      nuit: {
        titre: 'La nuit, dehors',
        dessin: vueNuit,
        renvois: z => {
          const { cx, yr, yb, hwIn, y0, y1 } = GC(z);
          return [
            { n: 7, rond: [cx + 34, 12], cible: [cx + 22, yr - 30], texte: 'couvercle d’écorce lesté' },
            { n: 8, rond: [z.l - 16, y0 - 4], cible: [cx + hwIn(y0) - 20, y0 + 7], texte: 'l’eau gèle la première' },
            { n: 9, rond: [z.l - 16, y1 + 22], cible: [cx + hwIn(y1) - 40, y1 + 14], texte: 'le sucre reste dessous' },
            { n: 10, rond: [14, yr - 16], cible: [cx - BAS.Wb / 2 - 3, yb - 8], texte: 'large et peu profond' },
          ];
        },
      },
      matin: {
        titre: 'Au matin',
        dessin: vueMatin,
        renvois: z => {
          const { cx, yr, hwIn, y0, y1 } = GC(z);
          const yh0 = yr - 10.5 - (y1 - y0);
          return [
            { n: 11, rond: [cx - 40, 14], cible: [cx - 60, yh0 + 8], texte: 'plaque levée avant le dégel' },
            { n: 12, rond: [16, yr - 5], cible: [cx - 60, yr - 5], texte: 'deux bâtons en travers' },
            { n: 13, rond: [z.l - 16, yr + 10], cible: [cx + 84, yr + 6], texte: 'ce qui tombe est du sucre' },
          ];
        },
      },
      balance: {
        titre: 'Le résidu sec pesé contre de l’eau',
        dessin: vueBalance,
        renvois: z => {
          const { cxB, yRod, yT, rxT, xL, xR, mes } = GE(z);
          return [
            { n: 14, rond: [cxB - 64, 36], cible: [cxB - 64, yRod - 3], texte: 'tige pendue en son milieu' },
            { n: 15, rond: [xL - 70, yT + 4], cible: [xL - rxT + 6, yT + 10], texte: 'plateau d’écorce' },
            { n: 16, rond: [xL + 66, yT + 22], cible: [xL + 8, yT + 2], texte: 'résidu sec de la sève' },
            { n: 17, rond: [xR - 70, yT + 22], cible: [xR - 14, yT + 6], texte: 'eau jusqu’à l’équilibre' },
            { n: 18, rond: [mes.xe + 46, mes.cy - 16], cible: [mes.xe + 1, mes.cy + mes.ry + 4], texte: 'sève prise à l’encoche' },
          ];
        },
      },
    },
    danger: 'Danger — le chalumeau trempe des semaines dans la sève : ni thuya, ni cerisier, ni if, ni sureau.',
  };
};
