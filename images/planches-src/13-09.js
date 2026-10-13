// Planche 13-09 — le briquet à pierre, refaite avec les mains de la bibliothèque (h.formes).
//
// Le geste (refait le 12 octobre, JP : « mains ») : la main de la pierre est la main gauche vue du
// côté du pouce, en poing : le caillou couché dans la palmure sur l'index replié, le pouce couché
// dessus, sa pulpe sur l'amadou ; le majeur, l'annulaire et l'auriculaire repliés en dessous ; le
// nez de la pierre sort devant l'index et finit en arête vive. La main de l'acier (h.formes.main,
// prise / dos) a les doigts passés dans l'acier cintré en U : le fond du U devant les doigts
// repliés, les bras le long de l'index et de l'auriculaire, le pouce couché sur le bras du haut. La
// face extérieure du fond est la face qui frappe : elle descend en rasant l'arête (tireté).
// Au point de frappe : la même scène de près, l'acier descendu contre l'arête, les paillettes.
// L'acier : un bout de vieille lime gardé tel quel, ou cintré en U (même longueur dépliée).
// La pierre : le galet cassé (cortex roulé, cassure fraîche à arête vive) et l'essai du verre.
// Aucune cote : le chapitre ne donne aucune mesure à reporter (les « deux centimètres » sont la
// chute de la paillette, pas une mesure de fabrication).
// Se lit en regard de la 13-40 (le nid qu'on souffle ensuite).

module.exports = (h) => {
  const F = h.formes, A = h.a;
  const f = v => Math.round(v * 10) / 10;
  const gen = s => { let g = s; return () => (g = (g * 16807) % 2147483647) / 2147483647; };

  // Courbe lisse (Catmull-Rom) passant par chaque point ; suite = sans le M de départ.
  const lisse = (pts, ferme, suite = false) => {
    const n = pts.length;
    const p = i => ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
    let d = suite ? '' : `M ${f(pts[0][0])} ${f(pts[0][1])}`;
    const segs = ferme ? n : n - 1;
    for (let i = 0; i < segs; i++) {
      const p0 = p(i - 1), p1 = p(i), p2 = p(i + 1), p3 = p(i + 2);
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C ${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
    }
    return ferme ? d + ' Z' : d;
  };
  const pt = p => `${f(p[0])} ${f(p[1])}`;
  const poly = pts => 'M ' + pts.map(pt).join(' L ');
  const dansPoly = pl => ([x, y]) => {
    let c = false;
    for (let i = 0, j = pl.length - 1; i < pl.length; j = i++) {
      const [xi, yi] = pl[i], [xj, yj] = pl[j];
      if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c;
    }
    return c;
  };
  // Semis de points (surface roulée d'un caillou) dans une forme donnée par un test.
  const semis = (x0, y0, x1, y1, dedans, n, graine, T = p => p, ep = 1.4) => {
    const r = gen(graine);
    let d = '';
    for (let i = 0; i < n; i++) {
      const p = [x0 + r() * (x1 - x0), y0 + r() * (y1 - y0)];
      if (!dedans(p)) continue;
      const q = T(p);
      d += `M${f(q[0])} ${f(q[1])}h0.01`;
    }
    return `<path d="${d}" fill="none" stroke="#000" stroke-width="${ep}" stroke-linecap="round"/>`;
  };
  const arc = (cx, cy, r, a0, a1, n = 6) => {
    const out = [];
    for (let i = 0; i <= n; i++) {
      const a = (a0 + (a1 - a0) * i / n) * Math.PI / 180;
      out.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
    }
    return out;
  };
  // Une fenêtre du repère de la scène (mm), ramenée à la vue.
  const fenetre = (z, x0, y0, x1, y1) => {
    const k = Math.min(z.l / (x1 - x0), z.h / (y1 - y0));
    const ox = (z.l - (x1 - x0) * k) / 2 - x0 * k, oy = (z.h - (y1 - y0) * k) / 2 - y0 * k;
    return { k, T: ([x, y]) => [ox + x * k, oy + y * k] };
  };
  const decoupe = (id, z, contenu) =>
    `<clipPath id="${id}"><rect x="0" y="0" width="${z.l}" height="${z.h}"/></clipPath>\n<g clip-path="url(#${id})">\n${contenu}\n</g>`;

  // ─── La scène, en mm, origine au centre de la pierre ───────────────────────────────────
  // La main de la pierre : la main gauche vue du côté du pouce, l'avant-bras à droite. Le caillou
  // est couché dans la palmure, sur la deuxième jointure de l'index replié ; le pouce couche sa
  // pulpe dessus, sur l'amadou ; le majeur, l'annulaire et l'auriculaire sont repliés dans la
  // paume, sous l'index. Le nez de la pierre sort devant l'index et finit en arête vive.
  const E = [-30, -24];                              // l'arête, vue par le bout
  const C2 = [-25, -15];                             // bas de la cassure
  const dessus = [E, [-22, -27], [-12, -28.6], [-2, -29], [8, -28.2], [16, -25.5], [21, -21]];
  const reste = [[23, -14], [21, -7], [15, -2.5], [5, -0.8], [-6, -1], [-15, -3], [-21, -7.5], [-24, -12]];
  const contourPierre = [...dessus, ...reste, C2];
  // la cassure fraîche, vue en fuite : une mince facette le long du dessous du nez
  const facette = [E, C2, [-23.7, -17.4], [-27.3, -24.6]];
  const yDessus = x => {
    for (let i = 0; i < dessus.length - 1; i++) {
      const [xa, ya] = dessus[i], [xb, yb] = dessus[i + 1];
      if (x >= xa && x <= xb) return ya + (yb - ya) * (x - xa) / (xb - xa);
    }
    return dessus[dessus.length - 1][1];
  };
  // l'amadou : un carré de tissu carbonisé, plat, posé sur le dessus, son bord avant au ras de
  // l'arête, son bord arrière effiloché sous la pulpe du pouce
  const amX0 = E[0] + 0.6, amX1 = 10, amEp = 3;
  const amadou = (() => {
    const bas = [], haut = [];
    for (let x = amX0; x <= amX1 + 0.01; x += 2.5) { bas.push([x, yDessus(x) - 0.2]); haut.push([x, yDessus(x) - 0.2 - amEp]); }
    const yb = yDessus(amX1) - 0.2, yh = yb - amEp;
    const effiloche = [[amX1 + 1.4, yb - 0.3], [amX1 + 0.5, yb - 0.9], [amX1 + 2.2, yb - 1.4], [amX1 + 0.7, yh + 1.1], [amX1 + 1.8, yh + 0.4]];
    return [...bas, ...effiloche, ...haut.reverse()];
  })();

  // La pierre et l'amadou, dans la vue (T : scène → vue).
  // l'arête E et le bas de la cassure C2 restent des angles vifs ; le reste est roulé
  const cheminPierre = T => `M ${pt(T(E))} L ${pt(T(contourPierre[1]))}` + lisse(contourPierre.slice(1, -1).map(T), false, true) + ` L ${pt(T(C2))} Z`;
  const pierreSVG = (T, k) => {
    const TT = pts => pts.map(T);
    const dP = cheminPierre(T);
    const out = [h.path(dP, A.blanc)];
    const dansCortex = p => dansPoly(contourPierre)(p) && !dansPoly(facette)(p);
    out.push(semis(-32, -31, 25, 1, dansCortex, Math.round(2400 * 0.055 * k * k), 29, T));
    out.push(h.path(poly(TT([facette[3], facette[2], C2])), A.detail));
    // les ondes de la cassure, bombées vers l'arête
    [[-28.6, -21, -26.6, -21.8], [-27, -18.2, -25, -19.2]].forEach(([xa, ya, xb, yb]) =>
      out.push(h.path(`M ${pt(T([xa, ya]))} Q ${pt(T([xa + 0.6, yb + 0.4]))} ${pt(T([xb, yb]))}`, A.fin)));
    out.push(h.path(dP, A.contour));
    out.push(h.path(poly(TT(amadou)) + ' Z', `fill="none" stroke="#FFFFFF" stroke-width="${f(Math.max(1.6, 0.9 * k))}" stroke-linejoin="round"`));
    out.push(h.chemin(TT(amadou), A.plein, true));
    return out.join('\n');
  };

  // ─── Les mains, en pièces : un doigt est un tube effilé au bout rond ───────────────────
  const RAD = Math.PI / 180;
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]], sub = (a, b) => [a[0] - b[0], a[1] - b[1]], mul = (a, s) => [a[0] * s, a[1] * s];
  const uni = a => { const l = Math.hypot(a[0], a[1]) || 1; return [a[0] / l, a[1] / l]; };
  const gau = u => [u[1], -u[0]], dirA = d => [Math.cos(d * RAD), Math.sin(d * RAD)];
  // une chaîne d'os depuis P0 : [direction (°), longueur] par phalange
  const chaine = (P0, segs) => { const out = [P0]; let P = P0; segs.forEach(([a, L]) => { P = add(P, mul(dirA(a), L)); out.push(P); }); return out; };
  // Un doigt : le contour (dos, bout rond, ventre), la jointure qui saille au dos, le ventre qui
  // se creuse au pli. dosS : +1 si le dos est à gauche du sens de marche, -1 à droite.
  const doigt = (pts, w, dosS, o = {}) => {
    const n = pts.length - 1, U = [];
    for (let i = 0; i < n; i++) U.push(uni(sub(pts[i + 1], pts[i])));
    const dos = [], ven = [];
    for (let i = 0; i <= n; i++) {
      const u = i === 0 ? U[0] : i === n ? U[n - 1] : uni(add(U[i - 1], U[i]));
      const nd = mul(gau(u), dosS);
      const pli = i > 0 && i < n ? Math.min(1, Math.acos(Math.max(-1, Math.min(1, U[i - 1][0] * U[i][0] + U[i - 1][1] * U[i][1]))) / RAD / 70) : 0;
      dos.push(add(pts[i], mul(nd, w[i] * (1 + 0.1 * pli))));
      ven.push(sub(pts[i], mul(nd, w[i] * (1 - 0.12 * pli))));
      if (i < n) for (const t of [0.33, 0.66]) {
        const m = add(pts[i], mul(sub(pts[i + 1], pts[i]), t)), wm = w[i] + (w[i + 1] - w[i]) * t, ndm = mul(gau(U[i]), dosS);
        dos.push(add(m, mul(ndm, wm))); ven.push(sub(m, mul(ndm, wm * 1.03)));
      }
    }
    const c = pts[n], u = U[n - 1], nd = mul(gau(u), dosS), r = w[n];
    const bout = [add(c, mul(add(mul(nd, 0.72), mul(u, 0.72)), r)), add(c, mul(u, r * 1.02)), add(c, mul(add(mul(nd, -0.72), mul(u, 0.72)), r))];
    const L = [...dos, ...bout, ...ven.reverse()];
    // l'ongle vu de côté : il longe le dos, du bout vers la dernière jointure
    const at = (s, t) => add(add(c, mul(u, s)), mul(nd, t));
    const ongle = o.ongle === false ? null : [at(r * 0.55, r * 0.5), at(-r * 0.4, r * 0.62), at(-r * 1.3, r * 0.82)];
    return { L, ongle, base: o.base == null ? 0 : o.base };
  };
  // Peint une main faite de pièces (du fond vers l'œil) : toutes les silhouettes à 2,4 d'abord,
  // puis chaque pièce en blanc et son trait intérieur à 0,7 ; obj[i] se peint avant la pièce i.
  const peindreMain = (pieces, T, obj = {}) => {
    const out = [];
    const chem = p => p.ferme ? lisse(p.L.map(T), true) : lisse(p.L.map(T), false);
    pieces.forEach(p => { if (p.trait !== false) out.push(h.path(p.trait ? p.trait(T) : chem(p), `fill="none" stroke="#1A1A1A" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"`)); });
    pieces.forEach((p, i) => {
      if (obj[i]) out.push(obj[i]);
      out.push(h.path(lisse(p.L.map(T), true), `fill="#FFFFFF" stroke="none"`));
      if (p.trait !== false) out.push(h.path(p.trait ? p.trait(T) : chem(p), `fill="none" stroke="#1A1A1A" stroke-width="0.7" stroke-linejoin="round" stroke-linecap="round"`));
      if (p.ongle) out.push(h.path(lisse(p.ongle.map(T), false), `fill="none" stroke="#1A1A1A" stroke-width="0.5" stroke-linecap="round"`));
      (p.plis || []).forEach(([a, b, cc]) => out.push(h.path(`M ${pt(T(a))} Q ${pt(T(cc))} ${pt(T(b))}`, `fill="none" stroke="#1A1A1A" stroke-width="0.5" stroke-linecap="round"`)));
    });
    if (obj.fin) out.push(obj.fin);
    return out.join('\n');
  };
  // un contour ouvert : on ne trace que les plages [a, b] d'indices de points
  const plages = (L, pl) => T => pl.map(([a, b]) => lisse(L.slice(a, b + 1).map(T), false)).join(' ');

  // La main gauche de la pierre. Proportions d'adulte : paume de 96 du poignet à la jointure du
  // majeur ; index 43 · 25 · 21 ; pouce 44 · 31 · 25.
  const MP = (() => {
    const pouce = chaine([84, -4], [[-144, 41], [-160, 32], [179, 16.4]]);
    const index = chaine([40, 4], [[174, 42], [100, 25], [30, 14.5]]);
    const majeur = chaine([44, 20], [[176, 44], [97, 27], [20, 14.3]]);
    const annul = chaine([46, 34], [[178, 41], [95, 26], [12, 13.7]]);
    const auric = chaine([47, 47], [[180, 31], [93, 20], [5, 12.4]]);
    const fd = (pts, w, o) => doigt(pts, w, -1, o);
    const paume = [[220, -14], [104, -15], [84, -18], [60, -27], [44, -18], [32, -8], [34, -3], [48, 0],
      [44, 12], [34, 26], [33, 40], [32, 56], [32, 72], [60, 70], [100, 54], [220, 53]];
    return [
      fd(auric, [8.2, 7.1, 6.3, 5.6], { ongle: false }),
      fd(annul, [9.2, 8.1, 7.2, 6.3], { ongle: false }),
      fd(majeur, [9.7, 8.6, 7.6, 6.7], { ongle: false }),
      { L: paume, trait: plages(paume, [[0, 5], [12, 15]]) },
      { ...fd(index, [9.8, 9.2, 8.2, 7.2]), trait: null, plis: [[[2, 16], [6, 12.5], [5.5, 15.5]]] },
      { ...fd(pouce, [13, 11.5, 10, 8.6]), trait: null, plis: [[[17, -31], [22, -30.5], [19.5, -32.4]]] },
    ].map(p => p.trait === null ? { ...p, trait: plages(p.L, [[0, 16]]) } : p);
  })();
  const mainPierre = (T, k) => peindreMain(MP, T, { 5: pierreSVG(T, k) });

  // L'acier en U, dans le repère de sa prise (centre de la prise en 0 0, main droite vue du dos) :
  // le fond du U devant les doigts repliés, face extérieure en x = xo ; les bras le long de
  // l'index et de l'auriculaire ; épaisseur 5.
  const U = { xi: 39.1, xo: 44.9, yh: -52.9, yhi: -47.2, yb: 49.5, ybi: 43.7, xg: -16.1, ro: 8, ri: 2.3 };   // à la taille du poing calqué
  const profilU = () => [
    [U.xg, U.yh], ...arc(U.xo - U.ro, U.yh + U.ro, U.ro, 270, 360), ...arc(U.xo - U.ro, U.yb - U.ro, U.ro, 0, 90),
    [U.xg, U.yb], [U.xg, U.ybi], ...arc(U.xo - U.ro, U.yb - U.ro, U.ri, 90, 0), ...arc(U.xo - U.ro, U.yh + U.ro, U.ri, 0, -90), [U.xg, U.yhi],
  ];
  const ACIER_D = 12;                               // diamètre de la prise, repère du U
  const TX = E[0] - U.xo;                           // la face qui frappe passe au ras de l'arête
  const TY_AVANT = E[1] - U.yb - 14, TY_FRAPPE = E[1] + 4;

  // Les paillettes, du point de contact : trois retombent sur l'amadou, les autres filent en bas.
  const C = [E[0] + 0.3, E[1] + 0.5];
  const surAmadou = x => [x, yDessus(x) - amEp - 1.1];
  const paillettes = [
    { q: [-27, -47], fin: surAmadou(-22.5) },
    { q: [-24, -48], fin: surAmadou(-19) },
    { q: [-30, -43], fin: surAmadou(-26) },
    { q: [-28.5, -13], fin: [-26.5, -3] },
    { q: [-29, -11], fin: [-29, 3] },
    { q: [-27.5, -15], fin: [-22, -9] },
  ];

  // Le poing calqué (modèle k11 : poing fermé sur un bâton, vu du dos de la main), son bâton
  // masqué. centre : le milieu de la prise, en coordonnées de la scène ; sigma : pixels du modèle
  // → unités de scène ; bras : l'avant-bras, en unités de scène. Au gros plan, le modèle aminci
  // (k11f) garde un trait du poids de celui du livre.
  const poing = (T, k, o) => {
    const id = k > 2.4 ? 'k11f' : 'k11', c = T(o.centre), SM = o.sigma * k;
    return String(F.modele(id, { x: c[0], y: c[1], ancre: [72, 47.5], angle: o.angle, echelle: SM, miroir: o.miroir,
      masquer: [[0, 36, 29.9, 57.5], [29.9, 39.6, 35.8, 43.1], [107, 34, 140, 57.3], [0, 104, 140, 135]], masquerEncre: [[83.5, 43.5, 97.5, 57]],
      bras: { a: [32.1, 104], a0: [31.6, 92], b: [73.6, 104], b0: [73.2, 92], long: o.bras * k, ep: (id === 'k11f' ? 0.85 : 1.85) * SM } }));
  };

  const scene = (T, k, frappe) => {
    const out = [];
    // la main de la pierre : le poing tourné d'un quart, l'avant-bras à droite, le pouce en haut à
    // gauche sur la pierre ; la pierre se peint d'abord, elle passe derrière les doigts
    out.push(pierreSVG(T, k));
    out.push(poing(T, k, { centre: [45.5, -4.8], angle: -90, sigma: 0.95, miroir: false, bras: 110 }));
    const ty = frappe ? TY_FRAPPE : TY_AVANT;
    const TU = p => T([TX + p[0], ty + p[1]]);
    // la main de l'acier (prise / dos) : le poing fermé, les doigts passés dans le U ; les bras du
    // U passent sous le pouce et sous le bord de la main, le fond devant les doigts repliés.
    out.push(h.chemin(profilU().map(TU), A.plein, true));
    const cible = T([TX, ty]);
    // la main de l'acier : le même poing, en main droite, l'avant-bras à gauche, les doigts dans le U
    out.push(poing(T, k, { centre: [TX, ty], angle: 90, sigma: 0.95, miroir: true, bras: 100 }));
    if (!frappe) {
      // la course de la face qui frappe : elle descend au ras de l'arête et continue
      out.push(h.path(`M ${pt(TU([U.xo, U.yb - U.ro]))} L ${pt(T([E[0], 40]))}`, A.cache));
      out.push(h.fleche(`M ${pt(T([-46, -34]))} L ${pt(T([-46, 24]))}`, A.arete));
    } else {
      paillettes.forEach(({ q, fin }) => {
        out.push(h.path(`M ${pt(T(C))} Q ${pt(T(q))} ${pt(T(fin))}`, A.cache));
        const c = T(fin);
        out.push(h.cercle(c[0], c[1], 2.4, A.plein));
      });
    }
    return out.join('\n');
  };

  const FG = [-206, -142, 124, 82];                  // fenêtre du geste
  const FD = [-50, -60, 14, 26];                      // fenêtre du point de frappe

  // ─── L'acier (repère 200 × 280) ────────────────────────────────────────────────────────
  const U3 = { xr: 150, bras: 46, y0: 140, y1: 230, t: 6, R: 11, D: [18, -13] };
  const lime = { x0: 12, x1: 12 + (120 - 30) + 2 * 46 - 12, y0: 40, y1: 64 };
  const profilU3 = () => {
    const { xr, bras, y0, y1, t, R: r } = U3, xl = xr - bras;
    return [
      [xl, y0], ...arc(xr - r, y0 + r, r, 270, 360, 7), ...arc(xr - r, y1 - r, r, 0, 90, 7),
      [xl, y1], [xl, y1 - t], ...arc(xr - r, y1 - r, r - t, 90, 0, 5),
      ...arc(xr - r, y0 + r, r - t, 0, -90, 5), [xl, y0 + t],
    ];
  };

  // ─── La pierre (repère 200 × 300) ──────────────────────────────────────────────────────
  const gal = { cx: 92, cy: 78, rx: 76, ry: 42, fx: 146, fry: 38, frx: 17 };
  const verre = [[140, 180], [230, 164], [292, 190], [222, 216], [146, 206]];
  const contact = [226, 190];
  const eclat = [contact, [214, 170], [216, 146], [232, 130], [252, 132], [262, 148], [256, 170]];

  return {
    ref: '13-09',
    titre: 'Le briquet à pierre',
    desc: 'Le geste, vu de côté : à droite, la main de la pierre tient un caillou de grève cassé dans le creux de la paume, le pouce dessus, les doigts repliés dessous ; le nez tourné vers la gauche qui finit en arête vive ; l’amadou carbonisé, un carré plat de tissu noirci, posé sur le dessus et arrivant au ras de l’arête. À gauche, la main de l’acier est fermée, les doigts passés dans l’acier cintré en U, la face extérieure du fond tournée vers la pierre ; un tireté montre qu’elle descend en rasant l’arête, une flèche le sens du coup, vers le bas. De près, au point de frappe : l’acier contre l’arête, les paillettes qui partent, trois qui retombent sur l’amadou. En bas, l’acier : un bout de vieille lime gardé tel quel, dessous le même cintré en U ; et la pierre : un galet dont la cassure fraîche fait une arête coupante, et l’essai qui la juge, l’arête qui raye un éclat de verre.',
    format: 'pleine',
    disposition: [['geste'], ['detail', 'acier', 'pierre']],
    hauteurs: [1.12, 1],
    largeurs: [[1], [1.12, 1, 1]],
    vues: {
      geste: {
        titre: 'Le geste',
        dessin: z => {
          const { T, k } = fenetre(z, ...FG);
          return decoupe('vue-geste', z, scene(T, k, false));
        },
        renvois: z => {
          const { T } = fenetre(z, ...FG);
          return [
            { n: 1, rond: T([-4, -112]), cible: T([TX + U.xo - 2.5, TY_AVANT - 10]), texte: 'acier en U, les doigts passés dedans' },
            { n: 2, rond: T([-104, 40]), cible: T([-46, 2]), texte: 'frapper vers le bas, en rasant l’arête' },
            { n: 3, rond: T([-60, 50]), cible: T([-24, -14]), texte: 'la pierre, l’arête tournée vers l’acier' },
          ];
        },
      },
      detail: {
        titre: 'Au point de frappe',
        dessin: z => {
          const { T, k } = fenetre(z, ...FD);
          return decoupe('vue-detail', z, scene(T, k, true));
        },
        renvois: z => {
          const { T } = fenetre(z, ...FD);
          return [
            { n: 4, rond: T([-8, -56]), cible: T([-14, yDessus(-14) - 1.5]), texte: 'amadou carbonisé, au ras de l’arête' },
            { n: 5, rond: T([-23, -56]), cible: T(surAmadou(-22.5)), texte: 'la paillette brûle en tombant sur l’amadou' },
          ];
        },
      },
      acier: {
        titre: 'L’acier',
        dessin: z => {
          const { T } = fenetre(z, 0, 0, 200, 280);
          const TT = pts => pts.map(T);
          const out = [];

          // ── Le bout de lime, à plat, taillé des deux sens ──
          const { x0, x1, y0, y1 } = lime;
          const casse = [[x1, y0], [x1 + 5, y0 + 6], [x1 + 1, y0 + 11], [x1 + 6, y0 + 17], [x1 + 2, y1]];
          const contourL = [[x0 + 6, y0], ...casse, [x0 + 6, y1], [x0, y1 - 5], [x0, y0 + 5]];
          out.push(h.chemin(TT(contourL), A.blanc, true));
          let taille = '';
          const coupe = (ax, ay, bx, by) => {             // trait coupé au rectangle intérieur
            const xa = x0 + 3, xb = x1 - 1, ya = y0 + 2, yb = y1 - 2;
            let t0 = 0, t1 = 1; const dx = bx - ax, dy = by - ay;
            for (const [p, q] of [[-dx, ax - xa], [dx, xb - ax], [-dy, ay - ya], [dy, yb - ay]]) {
              if (p === 0) { if (q < 0) return; continue; }
              const r = q / p;
              if (p < 0) { if (r > t1) return; if (r > t0) t0 = r; } else { if (r < t0) return; if (r < t1) t1 = r; }
            }
            taille += `M ${pt(T([ax + dx * t0, ay + dy * t0]))} L ${pt(T([ax + dx * t1, ay + dy * t1]))} `;
          };
          for (let x = x0 - 20; x < x1 + 10; x += 4.2) coupe(x, y0, x + 12, y1);
          for (let x = x0 - 20; x < x1 + 20; x += 6) coupe(x + 10, y0, x - 2, y1);
          out.push(h.path(taille, A.fin));
          out.push(h.chemin(TT(contourL), A.contour, true));

          // ── Le U en relief : le fond à droite, la face qui frappe en dehors ──
          const P = profilU3(), D = U3.D, n = P.length;
          const aire = P.reduce((s, p, i) => { const q = P[(i + 1) % n]; return s + p[0] * q[1] - q[0] * p[1]; }, 0);
          const sens = aire > 0 ? 1 : -1;
          const faces = P.map((p, i) => {
            const q = P[(i + 1) % n], ex = q[0] - p[0], ey = q[1] - p[1];
            const no = sens > 0 ? [ey, -ex] : [-ey, ex];
            return { p, q, vis: no[0] * D[0] + no[1] * D[1] > 0.01, dir: [ex, ey] };
          });
          const Dp = p => [p[0] + D[0], p[1] + D[1]];
          out.push(h.chemin(TT(P.map(Dp)), A.blanc, true), h.chemin(TT(P.map(Dp)), A.arete, true));
          const xl = U3.xr - U3.bras;
          const interieur = i => {
            const m = [(faces[i].p[0] + faces[i].q[0]) / 2, (faces[i].p[1] + faces[i].q[1]) / 2];
            return m[0] < U3.xr - U3.t + 0.5 && m[1] > U3.y0 + U3.t - 0.5 && m[1] < U3.y1 - U3.t + 0.5 && m[0] > xl + 0.5;
          };
          const ordre = [...faces.keys()].sort((a, b) => (interieur(b) ? 1 : 0) - (interieur(a) ? 1 : 0));
          ordre.forEach(i => {
            const Fc = faces[i];
            if (!Fc.vis) return;
            out.push(h.chemin(TT([Fc.p, Fc.q, Dp(Fc.q), Dp(Fc.p)]), A.blanc, true));
            out.push(h.ligne(...T(Dp(Fc.p)), ...T(Dp(Fc.q)), A.arete));
            [[i, (i + 1) % n, Fc.q], [(i - 1 + n) % n, i, Fc.p]].forEach(([a, b, s]) => {
              const Aa = faces[a], B = faces[b];
              const cosang = (Aa.dir[0] * B.dir[0] + Aa.dir[1] * B.dir[1]) / (Math.hypot(...Aa.dir) * Math.hypot(...B.dir));
              if (Aa.vis !== B.vis || cosang < 0.5) out.push(h.ligne(...T(s), ...T(Dp(s)), A.arete));
            });
          });
          out.push(h.chemin(TT(P), A.plein, true));
          return out.join('\n');
        },
        renvois: z => {
          const { T } = fenetre(z, 0, 0, 200, 280);
          return [
            { n: 6, rond: T([22, 14]), cible: T([48, lime.y0 + 9]), texte: 'vieille lime, gardée telle quelle' },
            { n: 7, rond: T([40, 170]), cible: T([U3.xr - U3.bras + 14, U3.y0 + 3]), texte: 'ou cintrée en U à la forge' },
          ];
        },
      },
      pierre: {
        titre: 'La pierre',
        dessin: z => {
          const { T: T0 } = fenetre(z, 0, 0, 200, 300);
          const out = [];
          const { cx, cy, rx, ry, fx, fry, frx } = gal;

          // ── Le galet cassé : cortex roulé, fermé à droite par la cassure ──
          {
            const T = p => T0([p[0] + 2, p[1] + 6]);
            const TT = pts => pts.map(T);
            const haut = [fx - 4, cy - fry], bas = [fx - 4, cy + fry];
            const polyCortex = [haut, [cx + 20, cy - ry], [cx - 30, cy - ry + 4], [cx - rx + 4, cy - 12], [cx - rx + 6, cy + 16], [cx - 32, cy + ry], [cx + 22, cy + ry], bas];
            const cortex = lisse(TT(polyCortex), false);
            const ell = (a0, a1) => {
              const pts = [];
              for (let i = 0; i <= 24; i++) {
                const a = (a0 + (a1 - a0) * i / 24) * Math.PI / 180;
                const m = 1 + 0.07 * Math.sin(3 * a + 0.6) + 0.05 * Math.sin(5 * a + 2);   // cassure irrégulière
                pts.push([fx - 4 + Math.cos(a) * frx * m, cy + Math.sin(a) * fry * m]);
              }
              return pts;
            };
            out.push(h.path(cortex + ' ' + lisse(TT(ell(90, -90)), false, true) + ' Z', A.blanc));
            out.push(semis(cx - rx, cy - ry, fx, cy + ry, p => dansPoly(polyCortex)(p) && Math.hypot((p[0] - fx + 4) / frx, (p[1] - cy) / fry) > 1.15, 420, 41, T));
            out.push(h.path(cortex, A.contour));
            const bordCasse = lisse(TT(ell(90, -270).slice(0, -1)), true);
            out.push(h.path(bordCasse, A.blanc));
            [0.3, 0.52, 0.74].forEach(kk => {
              const pts = [];
              for (let i = 0; i <= 10; i++) {
                const a = (-160 + 140 * i / 10) * Math.PI / 180;
                pts.push([fx - 4 + Math.cos(a) * frx * kk * 1.5, cy + fry * 0.82 + Math.sin(a) * fry * kk * 1.5]);
              }
              const dans = pts.filter(([x, y]) => Math.hypot((x - fx + 4) / frx, (y - cy) / fry) < 0.93);
              if (dans.length > 1) out.push(h.path(lisse(TT(dans), false), A.fin));
            });
            out.push(h.path(bordCasse, A.contour));
          }

          // ── L'essai : l'arête raye le verre ──
          {
            const T = p => T0([p[0] - 112, p[1] + 66]);
            const TT = pts => pts.map(T);
            const ep = 4, Vb = verre.map(([x, y]) => [x, y + ep]);
            out.push(h.chemin(TT([verre[2], verre[3], verre[4], Vb[4], Vb[3], Vb[2]]), A.blanc, true));
            out.push(h.chemin(TT([verre[2], Vb[2], Vb[3], Vb[4], verre[4]]), A.arete, false));
            out.push(h.ligne(...T(verre[3]), ...T(Vb[3]), A.arete));
            out.push(h.chemin(TT(verre), A.blanc, true), h.chemin(TT(verre), A.arete, true));
            out.push(h.ligne(...T([160, 196]), ...T([174, 186]), A.fin), h.ligne(...T([166, 200]), ...T([176, 193]), A.fin));
            out.push(h.ligne(...T([262, 184]), ...T([272, 178]), A.fin));
            // la rayure, derrière l'arête qui avance
            out.push(h.path(`M ${pt(T([176, 192.5]))} L ${pt(T([188, 191.6]))} L ${pt(T([199, 192.2]))} L ${pt(T([212, 190.8]))} L ${pt(T(contact))}`, A.detail));
            // l'éclat : cortex en haut à gauche, cassure en bas à droite, arête sur le verre
            out.push(h.chemin(TT(eclat), A.blanc, true));
            const faceE = [contact, [256, 170], [262, 148], [240, 156]];
            out.push(semis(214, 130, 262, 172, p => dansPoly(eclat)(p) && !dansPoly(faceE)(p), 150, 7, T));
            out.push(h.chemin(TT([[232, 130], [240, 156], contact]), A.detail));
            out.push(h.chemin(TT([[240, 156], [262, 148]]), A.detail));
            out.push(h.path(`M ${pt(T([244, 170]))} Q ${pt(T([250, 164]))} ${pt(T([252, 172]))}`, A.fin));
            out.push(h.chemin(TT(eclat), A.contour, true));
            out.push(h.fleche(`M ${pt(T([266, 160]))} L ${pt(T([292, 160]))}`, A.arete));
          }
          return out.join('\n');
        },
        renvois: z => {
          const { T: T0 } = fenetre(z, 0, 0, 200, 300);
          const Tg = p => T0([p[0] + 2, p[1] + 6]), Tv = p => T0([p[0] - 112, p[1] + 66]);
          return [
            { n: 8, rond: T0([40, 150]), cible: Tg([62, 104]), texte: 'caillou de grève : silex, chert, quartz, jaspe' },
            { n: 9, rond: T0([178, 22]), cible: Tg([gal.fx + 2, gal.cy - 30]), texte: 'cassure fraîche : arête coupante' },
            { n: 10, rond: T0([40, 290]), cible: Tv([193, 191.9]), texte: 'raye le verre : assez dure' },
          ];
        },
      },
    },
  };
};
