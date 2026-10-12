// Planche 84-03 — L'essai de tirage à la torche, les deux adultes ensemble (ch. 84, §5 et 5-B, étape 33).
// Coupe du chalet par un plan parallèle au faîte, qui passe par le poêle et le tuyau, dessinée en
// perspective cavalière : on voit la moitié arrière du chalet, le versant de devant qui monte au
// faîte, le pignon de droite avec sa porte ouverte. Un adulte à genoux tient la torche contre
// l'entrée du tuyau ; l'autre est dehors, au bout du pignon, hors du versant qui porte le conduit,
// la tête levée vers le chapeau. Trois vignettes : ce qu'on voit à la porte du poêle et au chapeau.
// Aucune cote : rien ne se construit ici, et le chapitre ne donne aucune mesure du chalet.
module.exports = (h) => {
  const F = h.formes;
  const BL = h.a.blanc;
  const r1 = v => Math.round(v * 10) / 10;

  // une courbe lisse fermée par des points (Catmull-Rom)
  const lisseFerme = pts => {
    const n = pts.length, P = i => pts[(i + n) % n];
    let d = `M${r1(P(0)[0])} ${r1(P(0)[1])}`;
    for (let i = 0; i < n; i++) {
      const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C${r1(c1[0])} ${r1(c1[1])} ${r1(c2[0])} ${r1(c2[1])} ${r1(p2[0])} ${r1(p2[1])}`;
    }
    return d + ' Z';
  };

  // une flamme debout, base (cx, by), largeur w, hauteur ht
  const flamme = (cx, by, w, ht) => {
    const d = `M${cx - w / 2} ${by} C${cx - w / 2} ${by - ht * 0.45} ${cx - w * 0.12} ${by - ht * 0.72} ${cx} ${by - ht}`
      + ` C${cx + w * 0.12} ${by - ht * 0.72} ${cx + w / 2} ${by - ht * 0.45} ${cx + w / 2} ${by}`
      + ` Q${cx} ${by + w * 0.4} ${cx - w / 2} ${by} Z`;
    const di = `M${cx - w * 0.18} ${by - ht * 0.05} C${cx - w * 0.2} ${by - ht * 0.35} ${cx} ${by - ht * 0.5} ${cx + w * 0.02} ${by - ht * 0.62}`;
    return [h.path(d, BL), h.path(d, h.a.arete), h.path(di, h.a.fin)].join('\n');
  };

  // la torche : un rouleau de papier journal, de P0 (le bout tenu) à P1 (le bout qui brûle)
  const torche = (P0, P1, w0, w1) => {
    const dx = P1[0] - P0[0], dy = P1[1] - P0[1], L = Math.hypot(dx, dy);
    const u = [dx / L, dy / L], n = [-u[1], u[0]];
    const pt = (t, s, w) => [P0[0] + u[0] * L * t + n[0] * s * w / 2, P0[1] + u[1] * L * t + n[1] * s * w / 2];
    const w = t => w0 + (w1 - w0) * t;
    const corps = [pt(0, 1, w0), pt(1, 1, w1), pt(1, -1, w1), pt(0, -1, w0)];
    const out = [h.chemin(corps, BL, true), h.chemin(corps, h.a.detail, true)];
    for (const t of [0.22, 0.44, 0.66, 0.86]) out.push(h.chemin([pt(t, 1, w(t)), pt(t + 0.07, -1, w(t + 0.07))], h.a.fin));
    return out.join('\n');
  };

  // le chapeau : le grillage sur le bout du tuyau, le capuchon conique au-dessus
  // (cx : axe du tuyau ; yb : haut du tuyau ; d : diamètre du tuyau)
  const chapeau = (cx, yb, d, { neige = false } = {}) => {
    const gH = d * 0.7, capW = d * 2.3, capH = d * 0.62;
    const yg = yb - gH, out = [];
    out.push(h.rect(cx - d / 2, yg, d, gH, BL));
    out.push(h.rect(cx - d / 2, yg, d, gH, neige ? h.a.hachure('neige', 'detail') : h.a.hachure('grillage', 'detail')));
    const cap = [[cx - capW / 2, yg], [cx, yg - capH], [cx + capW / 2, yg]];
    out.push(h.chemin(cap, BL, true), h.chemin([[cx - capW / 2, yg + 1.2], ...cap, [cx + capW / 2, yg + 1.2]], h.a.arete, false));
    out.push(h.ligne(cx - capW / 2, yg + 1.2, cx + capW / 2, yg + 1.2, h.a.detail));
    if (neige) {
      // le bonnet de neige soufflée : une couche bosselée posée sur le cône du capuchon, plus épaisse
      // au sommet ; le bord du capuchon dépasse dessous
      const r = capW / 2;
      const haut = [[cx - r - 1.5, yg + 0.5], [cx - r * 0.8, yg - capH * 0.5 - 4.5], [cx - r * 0.45, yg - capH - 7],
        [cx - r * 0.05, yg - capH - 10], [cx + r * 0.35, yg - capH - 7.5], [cx + r * 0.72, yg - capH * 0.5 - 4.5], [cx + r + 1.5, yg + 0.5]];
      let b = `M${r1(haut[0][0])} ${r1(haut[0][1])}`;
      for (let i = 0; i < haut.length - 1; i++) {
        const p0 = haut[Math.max(0, i - 1)], p1 = haut[i], p2 = haut[i + 1], p3 = haut[Math.min(haut.length - 1, i + 2)];
        b += ` C${r1(p1[0] + (p2[0] - p0[0]) / 6)} ${r1(p1[1] + (p2[1] - p0[1]) / 6)} ${r1(p2[0] - (p3[0] - p1[0]) / 6)} ${r1(p2[1] - (p3[1] - p1[1]) / 6)} ${r1(p2[0])} ${r1(p2[1])}`;
      }
      b += ` L${r1(cx)} ${r1(yg - capH)} Z`;
      out.push(h.path(b, BL), h.path(b, h.a.hachure('neige', 'arete')));
    }
    return { svg: out.join('\n'), yg, capW, capH };
  };

  // un filet de fumée qui monte en ondulant, depuis (x, y), vers le côté s (-1 gauche, +1 droite)
  const filet = (x, y, s, ht, a = 1) =>
    h.path(`M${x} ${y} C${x + s * 5 * a} ${y - ht * 0.15} ${x + s * 7 * a} ${y - ht * 0.4} ${x + s * 3 * a} ${y - ht * 0.55}`
      + ` S${x + s * 2 * a} ${y - ht * 0.85} ${x + s * 6 * a} ${y - ht}`, h.a.detail);
  // l'air chaud qui tremble au-dessus du capuchon
  const tremble = (x, y, ht) => h.path(`M${x} ${y} q2.2 ${-ht / 6} 0 ${-ht / 3} t0 ${-ht / 3} t0 ${-ht / 3}`, h.a.fin);

  // ─── la coupe, en cavalière ───────────────────────────────────────────────────────────
  // Repère en mm : x le long du faîte, y vers le haut depuis la neige, z en profondeur (0 : mur de
  // devant, W : mur du fond). Le plan de coupe est z = zc. La profondeur fuit vers le haut à droite.
  const s = 0.055, KX = 0.5, KY = 0.22;
  const C = {
    L: 5000, W: 3600, t: 150, fb: 200, fl: 350, he: 2650, hr: 4150, ov: 350, rt: 260, zc: 1000,
    st: { x0: 950, x1: 1650, y0: 500, y1: 1100, z1: 1300, d0: 640, d1: 1000 },   // le poêle ; d0-d1 : sa porte
    px: 1300, pd: 150,                                                          // l'axe et le diamètre du tuyau
    porte: { z0: 1900, z1: 2700, y1: 2350 },                                   // la porte du chalet, au pignon
    xi: 2050, xe: 7600,                                                        // où sont les deux adultes
  };
  C.pTop = C.hr + 480;
  C.pente = (C.hr - C.he) / (C.W / 2);
  C.yu = zz => (zz <= C.W / 2 ? C.he + zz * C.pente : C.he + (C.W - zz) * C.pente);   // dessous du toit au droit des murs

  const geoCoupe = z => {
    const ox = 58, oy = z.h - 8;
    const P = (x, y, zz = C.zc) => [r1(ox + s * (x + KX * zz)), r1(oy - s * (y + KY * zz))];
    return { P, ox, oy };
  };
  const perso = (z, P) => {
    const pi = F.personnage({ x: P(C.xi, C.fl)[0], y: P(C.xi, C.fl)[1], pose: 'genou', cote: 'gauche', echelle: s, penche: 22, regard: 10,
      mains: { proche: P(C.st.x1 + 150, C.st.y0 + 250) } });
    // la tête levée vers le chapeau
    const oeil0 = P(C.xe - 150, 1620), ch = P(C.px, C.pTop + 120);
    const ang = Math.atan2(oeil0[1] - ch[1], oeil0[0] - ch[0]) * 180 / Math.PI;
    const pe = F.personnage({ x: P(C.xe, 0)[0], y: P(C.xe, 0)[1], pose: 'debout', cote: 'gauche', echelle: s, regard: -Math.min(40, ang + 6) });
    return { pi, pe };
  };

  const dessinCoupe = z => {
    const { P } = geoCoupe(z), o = [];
    const { L, W, t, fb, fl, he, hr, ov, rt, zc, st, px, pd, porte, yu } = C;
    const poly = (pts, at, ferme = true) => h.chemin(pts, at, ferme);
    // la neige : surface derrière le plan de coupe, coupe franche au plan
    const yFond = P(0, 0, W + 2400)[1], yCoupe = P(0, 0)[1];
    o.push(h.rect(0, yFond, z.l, z.h - yFond, h.a.hachure('neige', 'aucun')));
    o.push(h.ligne(0, yFond, z.l, yFond, h.a.fin));
    // l'intérieur, derrière le plan : plancher, mur du fond, pignon de gauche vu de dedans
    const zf = W - t;
    o.push(poly([P(t, fl), P(L - t, fl), P(L - t, fl, zf), P(t, fl, zf)], BL));
    o.push(poly([P(t, fl, zf), P(L - t, fl, zf), P(L - t, he, zf), P(t, he, zf)], BL));
    o.push(poly([P(t, fl), P(t, fl, zf), P(t, he, zf), P(t, yu(zc) + 400, zf), P(t, yu(zc))], BL));
    o.push(h.ligne(...P(t, fl), ...P(t, fl, zf), h.a.detail), h.ligne(...P(t, fl, zf), ...P(L - t, fl, zf), h.a.detail));
    o.push(h.ligne(...P(t, fl, zf), ...P(t, he, zf), h.a.detail), h.ligne(...P(t, he, zf), ...P(L - t, he, zf), h.a.detail));
    // l'air du dehors, entré par la porte du pignon, qui file au ras du plancher vers le poêle
    o.push(h.fleche(`M${P(L - 500, fl + 120, zc + 150).join(' ')} L${P(C.xi + 750, fl + 120, zc + 150).join(' ')}`, h.a.cache));
    // le poêle, coupé par le milieu : la moitié arrière (dessus et flanc droit) puis la coupe
    const { x0, x1, y0, y1, z1, d0, d1 } = st;
    o.push(poly([P(x0, y1), P(x1, y1), P(x1, y1, z1), P(x0, y1, z1)], BL), poly([P(x0, y1), P(x1, y1), P(x1, y1, z1), P(x0, y1, z1)], h.a.arete));
    o.push(poly([P(x1, y0), P(x1, y1), P(x1, y1, z1), P(x1, y0, z1)], BL));
    o.push(poly([P(x1, d1), P(x1, y1), P(x1, y1, z1), P(x1, d1, z1)], h.a.arete), poly([P(x1, y0), P(x1, d0), P(x1, d0, z1), P(x1, y0, z1)], h.a.arete));
    o.push(h.ligne(...P(x1, d0, z1), ...P(x1, d1, z1), h.a.arete));
    o.push(poly([P(x0, y0), P(x1, y0), P(x1, y1), P(x0, y1)], BL));
    o.push(h.ligne(...P(x0 + 70, y0), ...P(x0 + 70, fl), h.a.arete), h.ligne(...P(x1 - 70, y0), ...P(x1 - 70, fl), h.a.arete));
    o.push(poly([P(x1, d1), P(x1, y1), P(x0, y1), P(x0, y0), P(x1, y0), P(x1, d0)], h.a.contour, false));
    // le tuyau sous le toit, avec la clé : poignée dans le sens du tuyau, ouverte
    const pl = px - pd / 2, pr = px + pd / 2, yc = y1 + 330;
    o.push(poly([P(pl, y1), P(pr, y1), P(pr, yu(zc)), P(pl, yu(zc))], BL));
    o.push(h.ligne(...P(pl, y1), ...P(pl, yu(zc)), h.a.arete), h.ligne(...P(pr, y1), ...P(pr, yu(zc)), h.a.arete));
    o.push(h.ligne(...P(pr, yc), ...P(pr + 90, yc), h.a.arete), h.ligne(...P(pr + 90, yc - 90), ...P(pr + 90, yc + 90), h.a.contour));
    // les deux adultes
    const { pi, pe } = perso(z, P);
    o.push(pi);
    const pw = pi.poignets.proche, pf = pi.mains.proche;
    const T0 = [r1(pw[0] + (pf[0] - pw[0]) * 0.5), r1(pw[1] + (pf[1] - pw[1]) * 0.5)];
    const T1 = P(px + 60, y1 - 150);
    o.push(torche(T0, T1, 2.4, 3.6), flamme(T1[0] - 0.5, T1[1] - 1, 6, 9));
    // le pignon de droite, vu du dehors, avec sa porte ouverte
    const gable = [P(L, fb), P(L, fb, W), P(L, he, W), P(L, hr, W / 2), P(L, yu(zc))];
    o.push(poly(gable, BL), poly(gable, h.a.arete));
    const pz0 = porte.z0, pz1 = porte.z1, py = porte.y1;
    o.push(poly([P(L, fl, pz0), P(L, fl, pz1), P(L, py, pz1), P(L, py, pz0)], h.a.arete));
    const battant = [P(L, fl, pz1), P(L + 780, fl, pz1), P(L + 780, py, pz1), P(L, py, pz1)];
    o.push(poly(battant, BL), poly(battant, h.a.arete));
    o.push(poly([P(L + 130, fl + 150, pz1), P(L + 650, fl + 150, pz1), P(L + 650, py - 150, pz1), P(L + 130, py - 150, pz1)], h.a.fin));
    o.push(h.cercle(...P(L + 660, fl + 1000, pz1), 1.4, h.a.detail));
    // le toit : le bout des deux versants au pignon, puis le versant de devant qui monte au faîte
    const xr = L + ov, ye = he - ov * C.pente;
    const bout2 = [P(xr, hr, W / 2), P(xr, ye, W + ov), P(xr, ye + rt, W + ov), P(xr, hr + rt, W / 2)];
    o.push(poly(bout2, BL), poly(bout2, h.a.arete));
    const bout1 = [P(xr, yu(zc) + 0, zc), P(xr, hr, W / 2), P(xr, hr + rt, W / 2), P(xr, yu(zc) + rt, zc)];
    o.push(poly(bout1, BL), poly(bout1, h.a.arete));
    const vers = [P(-ov, yu(zc) + rt), P(xr, yu(zc) + rt), P(xr, hr + rt, W / 2), P(-ov, hr + rt, W / 2)];
    o.push(poly(vers, BL));
    for (let x = -ov + 450; x < xr - 100; x += 450) o.push(h.ligne(...P(x, yu(zc) + rt), ...P(x, hr + rt, W / 2), h.a.fin));
    o.push(poly(vers, h.a.contour));
    // le plan de coupe : toit, pignons, plancher, poteaux, neige
    o.push(poly([P(-ov, yu(zc)), P(xr, yu(zc)), P(xr, yu(zc) + rt), P(-ov, yu(zc) + rt)], BL), poly([P(-ov, yu(zc)), P(xr, yu(zc)), P(xr, yu(zc) + rt), P(-ov, yu(zc) + rt)], h.a.hachure('bois', 'arete')));
    o.push(poly([P(0, fl), P(t, fl), P(t, yu(zc)), P(0, yu(zc))], BL), poly([P(0, fl), P(t, fl), P(t, yu(zc)), P(0, yu(zc))], h.a.hachure('bois', 'arete')));
    o.push(poly([P(L - t, fl), P(L, fl), P(L, yu(zc)), P(L - t, yu(zc))], BL), poly([P(L - t, fl), P(L, fl), P(L, yu(zc)), P(L - t, yu(zc))], h.a.hachure('bois', 'arete')));
    o.push(poly([P(0, fb), P(L, fb), P(L, fl), P(0, fl)], BL), poly([P(0, fb), P(L, fb), P(L, fl), P(0, fl)], h.a.hachure('bois', 'arete')));
    for (const x of [60, L / 2 - 90, L - 240]) o.push(poly([P(x, 0), P(x + 180, 0), P(x + 180, fb), P(x, fb)], BL), poly([P(x, 0), P(x + 180, 0), P(x + 180, fb), P(x, fb)], h.a.hachure('bois', 'detail')));
    o.push(h.ligne(0, yCoupe, z.l, yCoupe, h.a.arete));
    // le tuyau à travers le toit et au-dessus, le solin, le chapeau
    const yT = C.pTop;
    o.push(poly([P(pl, yu(zc) - 20), P(pr, yu(zc) - 20), P(pr, yT), P(pl, yT)], BL));
    o.push(h.ligne(...P(pl, yu(zc)), ...P(pl, yT), h.a.arete), h.ligne(...P(pr, yu(zc)), ...P(pr, yT), h.a.arete));
    const ys = yu(zc) + rt;
    o.push(poly([P(pl - 110, ys), P(pl, ys + 150), P(pr, ys + 150), P(pr + 110, ys)], BL), poly([P(pl - 110, ys), P(pl, ys + 150), P(pr, ys + 150), P(pr + 110, ys)], h.a.arete));
    const [cx, cyT] = P(px, yT);
    const c = chapeau(cx, cyT, pd * s + 1);
    o.push(c.svg, filet(cx - pd * s / 2 - 1, c.yg + 3, -1, 19, 0.8), filet(cx + pd * s / 2 + 1, c.yg + 3, 1, 21, 0.8));
    // la fumée de la torche, aspirée dans le tuyau
    o.push(h.fleche(`M${P(px, y1 + 60).join(' ')} L${P(px, yT - 100).join(' ')}`, h.a.cache));
    // l'autre adulte, dehors, au bout du pignon
    o.push(pe);
    return o.join('\n');
  };

  // ─── les vignettes ────────────────────────────────────────────────────────────────────
  const geoV = z => {
    const Fy = z.h - 4, bas = Fy - 8, haut = bas - 60, x0 = 16, x1 = 86;
    const px = 46, pd = 15, pTop = 44, rup = [55, 61];
    const pH0 = haut + 12, pH1 = bas - 8;
    const flam = [px, haut + 16];                      // la base de la flamme, sous l'entrée du tuyau
    const H = [x1 + 21, bas - 14];                     // le centre du poing
    return { Fy, bas, haut, x0, x1, px, pd, pTop, rup, pH0, pH1, flam, H };
  };
  const fondV = (z, { neige = false } = {}) => {
    const g = geoV(z), o = [];
    const { Fy, bas, haut, x0, x1, px, pd, pTop, rup, pH0, pH1, flam, H } = g;
    o.push(h.ligne(0, Fy, z.l, Fy, h.a.detail));
    o.push(h.ligne(x0 + 6, bas, x0 + 6, Fy, h.a.arete), h.ligne(x1 - 6, bas, x1 - 6, Fy, h.a.arete));
    o.push(h.chemin([[x1, pH0], [x1, haut], [x0, haut], [x0, bas], [x1, bas], [x1, pH1]], h.a.contour));
    // le tuyau, rompu : le toit n'est pas dessiné
    const l = px - pd / 2, r = px + pd / 2;
    o.push(h.ligne(l, pTop, l, rup[0], h.a.arete), h.ligne(r, pTop, r, rup[0], h.a.arete));
    o.push(h.ligne(l, rup[1], l, haut, h.a.arete), h.ligne(r, rup[1], r, haut, h.a.arete));
    for (const y of rup) o.push(h.path(`M${l - 3} ${y} q${(pd + 6) / 4} -3 ${(pd + 6) / 2} 0 t${(pd + 6) / 2} 0`, h.a.detail));
    const c = chapeau(px, pTop, pd, { neige });
    o.push(c.svg);
    // la torche et la main qui la tient
    const dx = flam[0] - H[0], dy = flam[1] + 2 - H[1];
    const ang = Math.atan2(dx, -dy) * 180 / Math.PI;
    const L = Math.hypot(dx, dy), u = [dx / L, dy / L];
    const Pb = [H[0] - u[0] * 8, H[1] - u[1] * 8];
    const t = torche(Pb, [flam[0], flam[1] + 2], 4.5, 7);
    o.push(F.main({ x: H[0], y: H[1], pose: 'prise', vue: 'dos', cote: 'gauche', echelle: 0.14, angle: ang, diametre: 5, bras: 70, objet: t }));
    o.push(flamme(flam[0], flam[1] + 2, 12, 17));
    return { svg: o.join('\n'), g, c };
  };
  // la fumée qui sort par le haut de la porte et remonte le long du poêle
  const roule = (g, depart) => {
    const { x1, pH0 } = g;
    return `${depart} Q${x1 - 8} ${pH0 - 7} ${x1 + 3} ${pH0 + 3} C${x1 + 15} ${pH0 + 2} ${x1 + 15} ${pH0 - 13} ${x1 + 4} ${pH0 - 17}`
      + ` C${x1 - 8} ${pH0 - 21} ${x1 - 9} ${pH0 - 33} ${x1 + 1} ${pH0 - 38} L${x1 + 5} ${pH0 - 52}`;
  };

  return {
    ref: '84-03',
    titre: 'L’essai de tirage à la torche',
    desc: 'Coupe du chalet parallèle au faîte, en perspective : un adulte à genoux devant le poêle, porte du poêle ouverte, tient une torche de papier allumée haut dans le foyer, contre l’entrée du tuyau ; la clé du tuyau est ouverte, la porte du pignon aussi, l’air file au ras du plancher vers le poêle ; la fumée monte dans le tuyau jusqu’au chapeau, au-dessus du faîte. L’autre adulte est dehors, au bout du pignon, hors du versant qui porte le conduit, la tête levée vers le chapeau. Trois vignettes : dans les premières secondes, la fumée roule dans la pièce puis monte (conduit froid, normal) ; une fois le conduit chauffé, la fumée est aspirée et un filet sort au chapeau (ouvert) ; ou la fumée revient dans la pièce et rien ne sort d’un chapeau pris dans la neige (bouché, pas de feu).',
    format: 'pleine',
    disposition: [['coupe'], ['v1', 'v2', 'v3']],
    hauteurs: [1.9, 1],
    vues: {
      coupe: {
        titre: 'Un adulte au poêle, l’autre dehors au chapeau',
        dessin: dessinCoupe,
        renvois: z => {
          const { P } = geoCoupe(z);
          const { pe } = perso(z, P);
          const st = C.st;
          return [
            { n: 1, rond: [P(C.px, 0)[0] + 58, P(0, C.st.y1 + 330)[1] - 38], cible: P(C.px + C.pd / 2 + 90, C.st.y1 + 380), texte: 'la clé du tuyau, ouverte avant tout' },
            { n: 2, rond: [P(C.t, 0)[0] + 20, P(0, st.y0 + 200)[1]], cible: P(st.x1 - 130, st.y0 + 330), texte: 'torche de papier journal ou d’écorce de bouleau' },
            { n: 3, rond: [P(C.t, 0)[0] + 20, P(0, st.y1 + 750)[1]], cible: P(C.px - 20, st.y1 - 60), texte: 'tenue haut, contre l’entrée du tuyau' },
            { n: 4, rond: [P(C.L + 1500, 0, C.porte.z1)[0] + 14, P(0, C.porte.y1 + 900, C.porte.z1)[1]], cible: P(C.L + 450, C.porte.y1 - 400, C.porte.z1), texte: 'porte et fenêtres encore ouvertes' },
            { n: 5, rond: [z.l - 22, pe.hanche[1] - 60], cible: [pe.hanche[0] + 2, pe.hanche[1] - 45], texte: 'l’autre adulte, dehors, du côté du pignon' },
          ];
        },
      },
      v1: {
        titre: 'Les premières secondes',
        dessin: z => {
          const { svg, g } = fondV(z);
          const { haut, px, flam } = g;
          return [svg,
            h.fleche(roule(g, `M${flam[0] + 7} ${flam[1] - 10}`), h.a.cache),
            // un début de montée, qui hésite
            h.fleche(`M${px} ${flam[1] - 18} L${px} ${haut - 24}`, h.a.cache),
          ].join('\n');
        },
        renvois: z => {
          const g = geoV(z);
          return [
            { n: 6, rond: [z.l - 22, g.pH0 - 44], cible: [g.x1 + 14, g.pH0 - 8], texte: 'la fumée roule dans la pièce, puis monte' },
            { n: 7, rond: [12, g.rup[1] + 4], cible: [g.px - g.pd / 2, g.haut - 18], texte: 'conduit encore froid : c’est normal' },
          ];
        },
      },
      v2: {
        titre: 'Une fois chauffé : ouvert',
        dessin: z => {
          const { svg, g, c } = fondV(z);
          const { x1, pH0, px, pd, pTop, flam } = g;
          return [svg,
            h.fleche(`M${px} ${flam[1] - 18} L${px} ${pTop + 4}`, h.a.cache),
            // l'air de la pièce entre par la porte et nourrit la flamme
            h.fleche(`M${x1 + 34} ${pH0 + 4} L${x1 - 4} ${pH0 + 4} Q${px + 16} ${pH0 + 4} ${px + 10} ${flam[1] - 5}`, h.a.cache),
            filet(px - pd / 2 - 1, c.yg + 4, -1, 30), filet(px + pd / 2 + 1, c.yg + 4, 1, 32),
            tremble(px - 3, c.yg - c.capH - 3, 18), tremble(px + 4, c.yg - c.capH - 5, 16),
          ].join('\n');
        },
        renvois: z => {
          const g = geoV(z);
          return [
            { n: 8, rond: [g.px + 50, g.rup[1] - 4], cible: [g.px + 1, g.haut - 22], texte: 'la fumée est aspirée franchement' },
            { n: 9, rond: [g.px + 62, 16], cible: [g.px + g.pd / 2 + 6, g.pTop - g.pd * 0.7 - 12], texte: 'filet de fumée ou air chaud qui tremble' },
          ];
        },
      },
      v3: {
        titre: 'Une fois chauffé : bouché',
        dessin: z => {
          const { svg, g } = fondV(z, { neige: true });
          const { x1, haut, px, rup } = g;
          // la fumée monte, bute, redescend et sort par la porte
          // en trois flèches : elle monte, elle redescend, elle sort
          const monte = `M${px - 3.5} ${haut + 10} L${px - 3.5} ${rup[1] + 4}`;
          const redescend = `M${px + 3.5} ${rup[1] + 4} L${px + 3.5} ${haut + 2}`;
          const sort = `M${px + 9} ${haut + 7} L${x1 - 14} ${haut + 7}`;
          return [svg, h.fleche(monte, h.a.cache), h.fleche(redescend, h.a.cache), h.fleche(roule(g, sort), h.a.cache)].join('\n');
        },
        renvois: z => {
          const g = geoV(z), yg = g.pTop - g.pd * 0.7;
          return [
            { n: 10, rond: [z.l - 22, g.pH0 - 44], cible: [g.x1 + 14, g.pH0 - 8], texte: 'la fumée revient dans la pièce' },
            { n: 11, rond: [g.px + 62, 14], cible: [g.px + 4, yg - 15], texte: 'rien au chapeau : obstruction, pas de feu' },
            { n: 12, rond: [12, g.pTop - 2], cible: [g.px - g.pd / 2 + 2, g.pTop - 5], texte: 'neige soufflée ou givre sur le grillage' },
          ];
        },
      },
    },
    danger: 'Danger — pas de feu avant d’avoir vu la fumée de la torche aspirée. Dans un conduit bouché, le feu brûle quand même et ses gaz, monoxyde de carbone compris, sortent dans la pièce : ni odeur ni couleur, on s’endort au lieu de sortir.',
  };
};
