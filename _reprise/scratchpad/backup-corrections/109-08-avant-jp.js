// Planche 109-08 — le vindas, treuil de bois à deux barres.
// Chapitre 86, « Le vindas, treuil de bois à deux barres », points 1 à 5 : poteaux fourchus,
// billot tambour, deux trous à angle droit près d'un bout, corde amarrée au milieu en une
// seule couche, chevilles en couronne dans le bout et planche pivotante, barre poussée vers
// le bas, corps hors du cercle. Cotes : 1,5 m (barre depuis l'axe) et 150 mm (rayon).
//
// Sens, vu du bout des barres : la corde part par-dessus le tambour vers la droite (la
// charge). La charge tire en horaire ; on enroule en antihoraire en poussant vers le bas la
// barre de gauche. Les chevilles de droite descendent sous la charge et butent sur le bout
// de la planche, qui s'appuie sur son pivot en bas à droite : le tambour ne revient pas.
module.exports = (h) => {
  const B = h.a.blanc.match(/fill="([^"]+)"/)[1];
  const blanc = t => h.a[t].replace('fill="none"', `fill="${B}"`);
  const f = v => Math.round(v * 100) / 100;
  const rad = a => a * Math.PI / 180;
  const D = pts => 'M ' + pts.map(p => `${f(p[0])} ${f(p[1])}`).join(' L ') + ' Z';
  const add = (a, b, k = 1) => [a[0] + b[0] * k, a[1] + b[1] * k];
  const axe = `${h.a.fin} stroke-dasharray="12 3 2 3"`;

  // Membre arrondi aux deux bouts (le bonhomme).
  const capsule = (a, b, w) => {
    const a0 = Math.atan2(b[1] - a[1], b[0] - a[0]) + Math.PI / 2, r = w / 2, pts = [];
    for (let i = 0; i <= 12; i++) { const t = a0 - Math.PI * i / 12; pts.push([b[0] + r * Math.cos(t), b[1] + r * Math.sin(t)]); }
    for (let i = 0; i <= 12; i++) { const t = a0 - Math.PI - Math.PI * i / 12; pts.push([a[0] + r * Math.cos(t), a[1] + r * Math.sin(t)]); }
    return h.path(D(pts), blanc('arete'));
  };
  // Pièce droite de section w, bouts francs ou rompus (coupure en zigzag).
  const piece = (p0, p1, w, at, rompu0, rompu1) => {
    const L = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]), t = [(p1[0] - p0[0]) / L, (p1[1] - p0[1]) / L];
    const n = [-t[1], t[0]], e = w / 2;
    const bout = (p, s, rompu) => rompu
      ? [add(p, n, e), add(add(p, n, e * 0.35), t, s * 3.5), add(add(p, n, -e * 0.3), t, -s * 2.5), add(p, n, -e)]
      : [add(p, n, e), add(p, n, -e)];
    return h.path(D([...bout(p1, 1, rompu1), ...bout(p0, -1, rompu0).reverse()]), at);
  };
  // Coude ou genou : deux segments l1, l2 de a à c, plié du côté s.
  const plie = (a, c, l1, l2, s) => {
    const L = Math.hypot(c[0] - a[0], c[1] - a[1]), u = [(c[0] - a[0]) / L, (c[1] - a[1]) / L];
    const d = Math.min(L, l1 + l2 - 0.5), x = (l1 * l1 - l2 * l2 + d * d) / (2 * d), y = Math.sqrt(Math.max(0, l1 * l1 - x * x));
    return [a[0] + u[0] * x - u[1] * y * s, a[1] + u[1] * x + u[0] * y * s];
  };

  // ─── Vue 1 : en élévation ───────────────────────────────────────────────────────────
  const E = z => {
    const gy = z.h - 22, ya = gy - 162, Re = 15;   // l'axe à 10,8 rayons du sol, comme dans la vue du bout
    return { gy, ya, Re, x0: 96, xe: 470, p1: 150, p2: 388, xb1: 424, xb2: 446, pas: 6, nt: 10, xt0: 272, bas: z.h - 5 };
  };
  const tour = (q, x) => {
    const yt = q.ya - q.Re - 1.5, yb = q.ya + q.Re + 1.5, p = q.pas;
    return h.path(`M ${f(x - p / 2)} ${f(yt)} Q ${f(x)} ${f(yt - 4)} ${f(x + p / 2)} ${f(yt)} L ${f(x)} ${f(yb)} Q ${f(x - p / 2)} ${f(yb + 4)} ${f(x - p)} ${f(yb)} Z`, blanc('arete'));
  };
  const poteau = (q, x) => {
    const t = q.ya - q.Re, b = q.ya + q.Re;
    return [
      h.path(D([[x - 10, q.bas], [x - 10, b + 12], [x - 8, b + 2], [x - 7, t - 5], [x - 4, t - 10], [x + 6, t - 8], [x + 8, t - 3], [x + 8, b + 2], [x + 10, b + 12], [x + 10, q.bas]]), blanc('contour')),
      h.ligne(x - 3, b + 22, x - 3, q.gy - 14, h.a.fin),
      h.ligne(x + 4, b + 40, x + 4, q.gy - 30, h.a.fin),
      h.ligne(x + 1, t - 2, x + 1, t + 16, h.a.fin),
    ].join('\n');
  };
  const vueElevation = z => {
    const q = E(z), out = [];
    const { ya, Re, x0, xe } = q;
    out.push(h.rect(0, q.gy, z.l, z.h - q.gy - 1, h.a.hachure('terre', 'aucun')));
    out.push(h.ligne(0, q.gy, z.l, q.gy, h.a.arete));
    // le billot tambour
    out.push(h.rect(x0, ya - Re, xe - x0, 2 * Re, blanc('contour')));
    for (const [a, b, y] of [[104, 134, -9], [112, 138, 7], [166, 200, -6], [172, 196, 10], [304, 372, -8], [318, 366, 6], [398, 416, -5], [454, 466, 8]])
      out.push(h.ligne(a, ya + y, b, ya + y, h.a.fin));
    out.push(h.ligne(x0 - 22, ya, xe - 3, ya, axe));
    // le bout de la corde, pris sous le premier tour
    out.push(piece([q.xt0 - 2, ya + 1], [q.xt0 + 22, ya + 12], 7, blanc('arete'), false, false));
    out.push(h.ligne(q.xt0 + 17, ya + 7, q.xt0 + 14.5, ya + 12.5, h.a.fin));
    // les tours, en une seule couche, du milieu vers la gauche
    for (let k = q.nt - 1; k >= 0; k--) {
      const x = q.xt0 - k * q.pas, p = q.pas;
      out.push(tour(q, x));
      for (const y of [-0.5 * Re, 0, 0.5 * Re]) {
        const yt = ya - Re - 1.5, yb = ya + Re + 1.5, xl = x - p / 2 - (p / 2) * (ya + y - yt) / (yb - yt);
        out.push(h.ligne(xl + 1, ya + y + 1.1, xl + p - 1, ya + y - 1.1, h.a.fin));
      }
    }
    // les barres : une dans le plan, l'autre vue en bout
    out.push(piece([q.xb1, ya - Re + 0.5], [q.xb1, ya - 50], 8, blanc('arete'), false, true));
    out.push(piece([q.xb1, ya + Re - 0.5], [q.xb1, ya + 74], 8, blanc('arete'), false, true));
    out.push(h.cercle(q.xb2, ya, 4.2, blanc('arete')));
    // la planche pivotante, le piquet et les chevilles du bout
    out.push(piece([xe + 14, q.bas], [xe + 14, ya + 0.86 * Re], 16, blanc('arete'), false, false));
    out.push(h.ligne(xe + 11, ya + 34, xe + 11, q.gy - 16, h.a.fin));
    out.push(h.ligne(xe + 17, ya + 44, xe + 17, q.gy - 6, h.a.fin));
    out.push(h.rect(xe + 1.5, ya - 0.22 * Re, 4, 1.53 * Re, blanc('arete')));
    for (const y of [-0.573, -0.237, 0.237, 0.573]) out.push(h.rect(xe, ya + y * Re - 0.12 * Re, 7, 0.24 * Re, blanc('detail')));
    // les deux poteaux fourchus, devant le billot
    out.push(poteau(q, q.p1), poteau(q, q.p2));
    // cote : le rayon du billot, depuis l'axe
    out.push(h.ligne(x0 - 3, ya - Re, x0 - 14, ya - Re, h.a.fin));
    out.push(h.cote(x0 - 9, ya, x0 - 9, ya - Re, 'R 150 mm', { cote: 'gauche' }));
    return out.join('\n');
  };
  const renvoisElevation = z => {
    const q = E(z), { ya, Re } = q;
    return [
      { n: 1, rond: [q.p1 + 50, q.gy - 30], cible: [q.p1 + 10, q.gy - 44], texte: 'poteau fourchu bien planté' },
      { n: 2, rond: [340, ya + 64], cible: [340, ya + 11], texte: 'le tambour, un billot droit' },
      { n: 3, rond: [q.xt0 + 18, ya + 64], cible: [q.xt0 + 16, ya + 10], texte: 'corde amarrée au milieu' },
      { n: 4, rond: [q.xt0 - 5 * q.pas, ya + 64], cible: [q.xt0 - 5 * q.pas, ya + Re + 3], texte: 'une seule couche de tours' },
      { n: 5, rond: [q.xb2 + 10, 14], cible: [q.xb2, ya - 4.2], texte: 'deux trous à angle droit' },
    ];
  };

  // ─── Vue 2 : la manœuvre, vue du bout ───────────────────────────────────────────────
  // Les bras des barres : k = 0 à gauche un peu vers le bas, puis de quart en quart.
  const bras = (al, k) => { const a = rad(180 - al - 90 * k); return [Math.cos(a), Math.sin(a)]; };
  const M = z => {
    const gy = z.h - 18, Rs = 110, cy = gy - 118, cx = 188, r = 11, al = 25;
    const b0 = bras(al, 0), H = [cx + b0[0] * Rs, cy + b0[1] * Rs];   // les mains, sur le bout de la barre, à hauteur de hanche
    const pe = [Math.sin(rad(25)), -Math.cos(rad(25))];              // le tronc penché de 25°
    const S = [cx - 130, cy + 8];                    // l'épaule, au-dessus du bout de barre, hors du cercle
    const hanche = add(S, pe, -40);
    const tete = add(S, pe, 15);
    const pa = [cx - 136, gy - 4], pr = [cx - 168, gy - 4];   // chevilles avant et arrière
    return { gy, Rs, cy, cx, r, al, H, S, hanche, tete, pa, pr };
  };
  // Le cliquet à l'échelle de la vue 3 : bout de planche T, sens u, pivot à 88.
  const U = [0.6, 0.8], NN = [0.8, -0.6], T3 = [37.2, -8.6];
  const vueManoeuvre = z => {
    const q = M(z), { cx, cy, r, Rs, gy } = q, out = [];
    out.push(h.rect(0, gy, z.l, z.h - gy - 1, h.a.hachure('terre', 'aucun')));
    out.push(h.ligne(0, gy, z.l, gy, h.a.arete));
    out.push(h.cercle(cx, cy, Rs, h.a.cache));
    // la corde part par-dessus, vers la charge ; elle s'enroule au milieu, plus loin que le poteau
    out.push(h.rect(cx, cy - r - 4, z.l - 1 - cx, 3.8, blanc('detail')));
    // poteau fourchu, entre la corde et les barres : les fourchons montent plus haut que l'axe
    out.push(h.path(D([[cx - 7, gy + 12], [cx - 7, cy + 38], [cx - 26, cy - 12], [cx - 20, cy - 16], [cx, cy + 22], [cx + 20, cy - 16], [cx + 26, cy - 12], [cx + 7, cy + 38], [cx + 7, gy + 12]]), blanc('arete')));
    // les barres, la plus proche du bout en dernier
    const bA = [bras(q.al, 0), bras(q.al, 2)], bB = [bras(q.al, 1), bras(q.al, 3)];
    for (const [a, b] of [bB, bA]) out.push(piece([cx + a[0] * Rs, cy + a[1] * Rs], [cx + b[0] * Rs, cy + b[1] * Rs], 6, blanc('arete'), false, false));
    // le bout du billot et ses chevilles
    out.push(h.cercle(cx, cy, r, blanc('contour')));
    for (let i = 0; i < 8; i++) { const a = rad(22.5 + 45 * i); out.push(h.cercle(cx + 6.8 * Math.cos(a), cy - 6.8 * Math.sin(a), 1.2, h.a.fin)); }
    // la planche, son piquet, sa cheville
    const k = 11 / 58, t = [cx + T3[0] * k, cy + T3[1] * k], pv = add(t, U, 88 * k), e = 1.6;
    out.push(h.path(D([add(t, NN, e), add(add(t, U, 94 * k), NN, e), add(add(t, U, 94 * k), NN, -e), add(t, NN, -e)]), blanc('detail')));
    out.push(piece([pv[0], gy + 12], [pv[0], cy + 9], 7, blanc('arete'), false, false));
    out.push(h.cercle(pv[0], pv[1], 1.4, blanc('detail')));
    // cote : la barre, depuis l'axe
    {
      const b2 = bras(q.al, 2), nb = [-b2[1], b2[0]], o = 15;
      const a0 = add([cx, cy], nb, o), a1 = add(add([cx, cy], b2, Rs), nb, o);
      out.push(h.ligne(a0[0], a0[1], a1[0], a1[1], h.a.detail));
      for (const p of [a0, a1]) out.push(h.ligne(p[0] - nb[0] * 6, p[1] - nb[1] * 6, p[0] + nb[0] * 6, p[1] + nb[1] * 6, h.a.detail));
      const m = add([(a0[0] + a1[0]) / 2, (a0[1] + a1[1]) / 2], nb, 13);
      out.push(h.texte(m[0], m[1] + 4, '1,5 m', { lisere: true }));
    }
    // on pousse vers le bas
    const P = a => `${f(cx + 88 * Math.cos(rad(a)))} ${f(cy + 88 * Math.sin(rad(a)))}`;
    out.push(h.fleche(`M ${P(157)} A 88 88 0 0 0 ${P(124)}`));
    // l'homme, hors du cercle
    const { H, S, hanche, tete, pa, pr } = q;
    const gr = plie(hanche, pr, 35, 34, -1), ga = plie(hanche, pa, 35, 33, -1), cd = plie(S, H, 25, 25, -1);
    out.push(capsule(hanche, gr, 12.5), capsule(gr, pr, 10), capsule([pr[0] - 3, gy - 3], [pr[0] + 11, gy - 3], 6));
    out.push(capsule(hanche, S, 18));
    out.push(capsule(hanche, ga, 12.5), capsule(ga, pa, 10), capsule([pa[0] - 3, gy - 3], [pa[0] + 11, gy - 3], 6));
    out.push(capsule(S, tete, 7), h.cercle(tete[0], tete[1], 8.5, blanc('arete')));
    out.push(capsule(S, cd, 7.5), capsule(cd, H, 6.5), h.cercle(H[0], H[1], 3.6, blanc('arete')));
    return out.join('\n');
  };
  const renvoisManoeuvre = z => {
    const q = M(z), { cx, cy } = q, b0 = bras(q.al, 0), ang = rad(215);
    return [
      { n: 6, rond: [cx - 62, cy - 24], cible: [f(cx + b0[0] * 72), f(cy + b0[1] * 72 - 3)], texte: 'barre : pousser vers le bas' },
      { n: 7, rond: [cx - 120, cy - 92], cible: [f(cx + q.Rs * Math.cos(ang)), f(cy + q.Rs * Math.sin(ang))], texte: 'cercle balayé par la barre' },
      { n: 8, rond: [cx - 166, cy - 12], cible: [cx - 148, cy + 30], texte: 'le corps hors du cercle' },
      { n: 9, rond: [cx + 116, cy - 62], cible: [cx + 125, cy - q.r - 4.5], texte: 'corde vers la charge' },
    ];
  };

  // ─── Vue 3 : le cliquet, vu du bout ─────────────────────────────────────────────────
  const C = z => ({ cx: 112, cy: 118, R: 58, rc: 36, rp: 6.5, bas: z.h - 8 });
  const vueCliquet = z => {
    const q = C(z), { cx, cy, R } = q, c = [cx, cy], out = [];
    // les barres, derrière le bout, rompues
    for (const [i, j] of [[1, 3], [0, 2]]) {
      const a = bras(15, i), b = bras(15, j);
      out.push(piece(add(c, a, 90), add(c, b, 90), 30, blanc('arete'), true, true));
    }
    // le bout du billot et ses cernes
    out.push(h.cercle(cx, cy, R, blanc('contour')));
    for (const rr of [10, 22, 48]) out.push(h.cercle(cx, cy, rr, h.a.fin));
    out.push(h.cercle(cx, cy, 2, h.a.fin));
    // les chevilles en couronne
    for (let i = 0; i < 8; i++) {
      const a = rad(22.5 + 45 * i), x = cx + q.rc * Math.cos(a), y = cy - q.rc * Math.sin(a);
      out.push(h.cercle(x, y, q.rp, blanc('arete')), h.cercle(x, y, 2.2, h.a.fin));
    }
    // la planche pivotante
    const t = add(c, T3), fin = add(t, U, 94), e = 6, pv = add(t, U, 88);
    out.push(h.path(D([add(t, NN, e), add(fin, NN, e), add(fin, NN, -e), add(t, NN, -e)]), blanc('contour')));
    for (const o of [-2.5, 2.5]) out.push(h.ligne(add(add(t, U, 8), NN, o)[0], add(add(t, U, 8), NN, o)[1], add(add(t, U, 66), NN, o)[0], add(add(t, U, 66), NN, o)[1], h.a.fin));
    // le piquet, devant, et la cheville-pivot
    out.push(piece([pv[0], q.bas], [pv[0], cy + 50], 18, blanc('contour'), true, false));
    out.push(h.ligne(pv[0] - 4, cy + 76, pv[0] - 4, q.bas - 18, h.a.fin));
    out.push(h.ligne(pv[0] + 4, cy + 92, pv[0] + 4, q.bas - 8, h.a.fin));
    out.push(h.cercle(pv[0], pv[1], 4, blanc('arete')), h.cercle(pv[0], pv[1], 1.3, h.a.plein));
    // on enroule : les chevilles passent sous la planche et la soulèvent
    const P = a => `${f(cx + 72 * Math.cos(rad(a)))} ${f(cy + 72 * Math.sin(rad(a)))}`;
    out.push(h.fleche(`M ${P(236)} A 72 72 0 0 0 ${P(186)}`));
    return out.join('\n');
  };
  const renvoisCliquet = z => {
    const q = C(z), { cx, cy } = q, t = [cx + T3[0], cy + T3[1]], pv = add(t, U, 88), mi = add(t, U, 50);
    const pg = [cx + q.rc * Math.cos(rad(247.5)), cy - q.rc * Math.sin(rad(247.5))];
    return [
      { n: 10, rond: [cx - 44, cy + 100], cible: [f(pg[0] - 2), f(pg[1] + 4)], texte: 'chevilles en couronne' },
      { n: 11, rond: [cx + 118, cy + 18], cible: [f(mi[0] + 3), f(mi[1] - 2)], texte: 'planche pivotante' },
      { n: 12, rond: [cx + 60, cy - 62], cible: [f(t[0] + 1), f(t[1] - 2)], texte: 'son bout bloque le retour' },
      { n: 13, rond: [cx + 128, cy + 98], cible: [f(pv[0] + 3), f(pv[1] + 3)], texte: 'pivot sur un piquet planté' },
    ];
  };

  return {
    ref: '109-08',
    titre: 'Le vindas, treuil de bois à deux barres',
    desc: 'Un vindas monté sur deux poteaux fourchus bien plantés. Un billot droit couché dans les fourches sert de tambour ; la corde s’amarre au milieu, le bout pris sous le premier tour, et s’enroule en une seule couche. Près d’un bout, deux trous percés à angle droit reçoivent deux barres. Vu du bout : la corde part par-dessus le tambour vers la charge ; un homme pousse vers le bas la barre de l’autre côté, debout hors du cercle que balaie la barre, qui sort de 1,5 m de l’axe sur un billot de 150 mm de rayon. Le cliquet, en détail : des chevilles plantées en couronne dans le bout du billot, et une planche qui pivote sur une cheville plantée dans un piquet ; son bout tombe entre deux chevilles et bute sur la suivante quand la charge tire, et les chevilles la soulèvent au passage quand on enroule. L’encadré danger rappelle le retour de barre.',
    format: 'pleine',
    disposition: [['elevation'], ['manoeuvre', 'cliquet']],
    hauteurs: [1, 1.2],
    largeurs: [[1], [1.25, 1]],
    vues: {
      elevation: { titre: 'En élévation', dessin: vueElevation, renvois: renvoisElevation },
      manoeuvre: { titre: 'La manœuvre, vue du bout', dessin: vueManoeuvre, renvois: renvoisManoeuvre },
      cliquet: { titre: 'Le cliquet, vu du bout', dessin: vueCliquet, renvois: renvoisCliquet },
    },
    danger: 'Sans cliquet, la charge fait tourner le tambour à l’envers et la barre revient à la vitesse de la charge : c’est le retour de barre. La barre se pousse vers le bas, jamais tirée vers soi, et le corps reste hors du cercle qu’elle balaie.',
  };
};
