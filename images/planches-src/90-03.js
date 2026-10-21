// 90-03 — Le portage (ch. 90, §5-D étapes 23 à 26 ; §9 « Porter sans courroie ni joug » et
// « La courroie de front se taille dans une peau »).
// Cotes, en mm, seulement celles du chapitre — une trentaine de centimètres entre les pagaies
// (≈ 300 mm), 5 à 10 cm de l'épaulement au plat-bord (50 à 100 mm), pièce du front d'environ
// 10 × 46 cm (≈ 100 × 460 mm), courroies de 5 à 6,4 cm (50 à 64 mm) sur environ 3 m
// (≈ 3000 mm). La longueur du canot, son creux, l'écart des traverses, la longueur des cordons
// et la hauteur du haussement d'épaules sont dessinés sans cote : le chapitre ne les donne pas.
// Passe qualité (lot 20) : courroie en bande plate et écorce en feuille sous elle (vues de
// face) ; loupe ×3 sur le bout de la traverse ; cote de largeur de courroie sortie du cuir ;
// bras du porteur en tube à bouts ronds, poing recourbé sur le plat-bord ; cotes en mm.
// Corps simples (13 oct.) : le porteur est la pose « portage-canot », les bras relevés vers les
// plats-bords de derrière (ch. 90, étape 23) ; les deux bustes, autrefois de face, sont de profil,
// le canot coupé dans son axe. Rouge : la flèche du haussement, le jour sous la traverse relâchée,
// la lanière contre l'épaulement (loupe). Gris loin : l'intérieur du canot.
// Le montage, suivi comme une charge : le canot pend par deux cordons noués près des bouts de
// la traverse du centre ; les cordons montent aux tempes et passent sur le front. Épaules
// haussées, la traverse porte sur les épaules et les cordons se relâchent ; épaules relâchées,
// la traverse quitte les épaules et le canot pend au front par les cordons tendus.

module.exports = (h) => {
  const r1 = v => Math.round(v * 10) / 10;
  const pt = p => `${r1(p[0])} ${r1(p[1])}`;
  const aBlanc = h.a.blanc;

  // Courbe lisse (Catmull-Rom) par des points déjà mis à l'écran.
  function cr(pts, ferme = false) {
    const n = pts.length;
    const P = i => (ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))]);
    let d = `M ${pt(pts[0])}`;
    const fin = ferme ? n : n - 1;
    for (let i = 0; i < fin; i++) {
      const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C ${pt(c1)} ${pt(c2)} ${pt(p2)}`;
    }
    return d + (ferme ? ' Z' : '');
  }
  // Échantillonne une courbe Catmull-Rom ouverte en polyligne.
  function lisse(pts, pas = 6) {
    const n = pts.length, o = [];
    const P = i => pts[Math.max(0, Math.min(n - 1, i))];
    for (let i = 0; i < n - 1; i++) {
      const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
      for (let k = 0; k < pas; k++) {
        const t = k / pas, t2 = t * t, t3 = t2 * t;
        const c = (a, b, c_, d) => 0.5 * (2 * b + (-a + c_) * t + (2 * a - 5 * b + 4 * c_ - d) * t2 + (-a + 3 * b - 3 * c_ + d) * t3);
        o.push([c(p0[0], p1[0], p2[0], p3[0]), c(p0[1], p1[1], p2[1], p3[1])]);
      }
    }
    o.push(pts[n - 1]);
    return o;
  }
  // Un membre ou une lanière : polygone autour d'une ligne médiane, largeur par point.
  function membre(pts, ws) {
    const g = [], d = [];
    pts.forEach((p, i) => {
      const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
      const L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
      const nx = -(b[1] - a[1]) / L, ny = (b[0] - a[0]) / L;
      const w = (Array.isArray(ws) ? ws[i] : ws) / 2;
      g.push([p[0] + nx * w, p[1] + ny * w]);
      d.push([p[0] - nx * w, p[1] - ny * w]);
    });
    return g.concat(d.reverse());
  }
  // Ligne de coupure à main levée entre deux points.
  function zig(a, b, n, amp) {
    const o = [a];
    const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L;
    for (let i = 1; i < n; i++) {
      const t = i / n, s = (i % 2 ? 1 : -1) * amp;
      o.push([a[0] + dx * t + nx * s, a[1] + dy * t + ny * s]);
    }
    o.push(b);
    return o;
  }
  const forme = (pts, trait = h.a.arete) => h.path(cr(pts, true), aBlanc) + '\n' + h.path(cr(pts, true), trait);
  const poly = (pts, trait = h.a.arete) => h.chemin(pts, aBlanc, true) + '\n' + h.chemin(pts, trait, true);

  // ───────────────────────── Vue 1 : le porteur de profil ─────────────────────────
  // Monde en cm, y vers le haut, sol à 0. Le canot est décrit dans son repère (u le long,
  // v vers le haut depuis le dessous du plat-bord), pivot à la traverse du centre, nez levé de
  // 10° : le bout de derrière cherche le sol, et les mains, lancées vers l'arrière, le tiennent.
  const TH = 10 * Math.PI / 180, XT = -9.5, YG = 147.2;
  function geomPorte(z) {
    const s = Math.min((z.l - 24) / 491, (z.h - 6) / 219);
    const ox = z.l / 2 + 10.5 * s, oy = z.h - 5;
    const P = (x, y) => [ox + x * s, oy - y * s];
    const W = (u, v) => [XT + u * Math.cos(TH) - v * Math.sin(TH), YG + u * Math.sin(TH) + v * Math.cos(TH)];
    const C = (u, v) => P(...W(u, v));
    return { s, P, W, C };
  }
  const vQuille = u => 35 - 5 * (u / 212) ** 2;
  const vBord = u => -15 * (Math.abs(u) / 241) ** 2.2;       // dessous du plat-bord
  const vBordHaut = u => vBord(u) + 3.3;                      // dessus du plat-bord
  function bez(p0, p1, p2, p3, n = 14) {
    const o = [];
    for (let i = 0; i <= n; i++) {
      const t = i / n, m = 1 - t;
      o.push([m * m * m * p0[0] + 3 * m * m * t * p1[0] + 3 * m * t * t * p2[0] + t * t * t * p3[0],
        m * m * m * p0[1] + 3 * m * m * t * p1[1] + 3 * m * t * t * p2[1] + t * t * t * p3[1]]);
    }
    return o;
  }
  const etrave = sg => bez([212 * sg, 30], [236 * sg, 29.5], [249 * sg, 8], [241 * sg, -15]);
  const echant = (f, a, b, n) => Array.from({ length: n + 1 }, (_, i) => { const u = a + (b - a) * i / n; return [u, f(u)]; });
  const FEN = [-5, 29];          // la fenêtre ouverte dans le flanc proche
  const ENC = [-6, 5.5];         // l'entaille dans le plat-bord proche, qui montre la traverse

  // Le porteur : le corps simple de la bibliothèque (pose « portage-canot »), en marche, face au
  // nez levé. La traverse du centre pose sur ses épaules, contre la nuque ; ses bras, lancés vers
  // l'arrière, vont chercher les plats-bords du bout qui baisse.
  const BRAS = { brasP: -87, avantbrasP: -81, mainP: -73, brasL: -85, avantbrasL: -79, mainL: -71 };
  const XA = -13.5;                 // le sol sous le porteur, entre les chevilles (cm)
  function porteur(z) {
    const { s, P } = geomPorte(z);
    return h.formes.corps({ x: P(XA, 0)[0], y: P(XA, 0)[1], pose: 'portage-canot', echelle: s / 10, angles: BRAS });
  }
  // La courroie sur le front d'une tête de corps simple : une bande pleine sur le haut du front, qui
  // file sur la tempe ; le cordon part de son bout. Rend [svg, le bout de la bande, le rayon].
  function courroie(t, k = 1) {
    const r = 0.9 * Math.hypot(t.haut[0] - t.x, t.haut[1] - t.y), c = [t.x + 0.04 * r, t.y + 0.05 * r];
    const sur = (deg, q = 1) => [c[0] + r * q * Math.cos(deg * Math.PI / 180), c[1] + r * q * Math.sin(deg * Math.PI / 180)];
    const haut = [-54, -45, -36, -27, -20].map(d => sur(d, 1.05));
    const bt = [c[0] - 0.05 * r, c[1] - 0.4 * r], hw = 0.11 * r * k;
    const d = `M ${pt(sur(-54, 1.05))} ${cr(haut).replace(/^M [^C]*/, '')} L ${pt(sur(-20, 0.96))} L ${pt([bt[0], bt[1] + hw])} A ${r1(hw)} ${r1(hw)} 0 0 1 ${pt([bt[0], bt[1] - hw])} L ${pt(sur(-54, 0.96))} Z`;
    // l'écorce de bouleau : une feuille plus large que la bande, qui dépasse dessus et dessous
    const ec = [sur(-60, 1.0), sur(-58, 1.1), sur(-37, 1.11), sur(-16, 1.1), sur(-13, 1.0), sur(-15, 0.91), sur(-37, 0.9), sur(-58, 0.91)];
    return { ecorce: h.path(cr(ec, true), aBlanc) + '\n' + h.path(cr(ec, true), h.a.detail), bande: h.path(d, h.a.plein), bout: bt, r, sur };
  }
  function porte(z) {
    const { P, C } = geomPorte(z);
    const o = [];
    const Cm = pts => pts.map(p => C(...p));
    o.push(h.ligne(...P(-60, 0), ...P(60, 0), h.a.fin));
    // Par la fenêtre, l'intérieur du flanc loin, en gris : c'est ce qu'on voit derrière la tête.
    o.push(h.chemin(Cm([...echant(vBordHaut, FEN[0], FEN[1], 12), ...echant(vQuille, FEN[1], FEN[0], 12)]), h.a.loin, true));
    // Le porteur, puis la courroie sur son front et le cordon noué à la traverse du centre.
    const pers = porteur(z), t = pers.tete;
    o.push(pers.toString());
    const co = courroie(t);
    o.push(co.ecorce, co.bande);
    o.push(h.path(`M ${pt(co.bout)} Q ${pt([co.bout[0] - 0.5 * co.r, co.bout[1] + 0.9 * co.r])} ${pt(C(0.4, 3.3))}`, h.a.arete));
    // La traverse du centre, vue en bout.
    o.push(h.chemin(Cm([[-3.25, 0.8], [3.25, 0.8], [3.25, 3.3], [-3.25, 3.3]]), h.a.plein, true));
    // Le flanc proche, ouvert d'une fenêtre sur la tête.
    const quilleA = echant(vQuille, -212, FEN[0], 30), quilleB = echant(vQuille, FEN[1], 212, 30);
    const hautA = echant(vBordHaut, -240, FEN[0], 30), hautB = echant(vBordHaut, FEN[1], 240, 30);
    const flA = [[-242, vBordHaut(-240)], ...etrave(-1).slice().reverse().filter(p => p[1] > vBordHaut(-240)),
      ...quilleA, ...lisse(zig([FEN[0] - 1, vQuille(FEN[0])], [FEN[0], vBordHaut(FEN[0])], 3, 1.6), 5).slice(1),
      ...hautA.slice().reverse()];
    const flB = [...lisse(zig([FEN[1], vBordHaut(FEN[1])], [FEN[1] + 0.5, vQuille(FEN[1])], 3, 1.6), 5), ...quilleB.slice(1),
      ...etrave(1).filter(p => p[1] > vBordHaut(240)), [242, vBordHaut(240)], ...hautB.slice().reverse()];
    o.push(h.chemin(Cm(flA), aBlanc, true));
    o.push(h.chemin(Cm(flB), aBlanc, true));
    // Le plat-bord proche, en deux morceaux de part et d'autre de l'entaille.
    const bordA = echant(vBord, -241, ENC[0], 40), bordB = echant(vBord, ENC[1], 241, 40);
    const hA = echant(vBordHaut, -240, ENC[0], 40), hB = echant(vBordHaut, ENC[1], 240, 40);
    const entA = zig([ENC[0], vBord(ENC[0])], [ENC[0], vBordHaut(ENC[0])], 3, 0.6);
    const entB = zig([ENC[1], vBordHaut(ENC[1])], [ENC[1], vBord(ENC[1])], 3, 0.6);
    o.push(h.chemin(Cm([...bordA, ...entA.slice(1, -1), ...hA.slice().reverse()]), aBlanc, true));
    o.push(h.chemin(Cm([...hB, ...entB.slice(1, -1), ...bordB.slice().reverse()]), aBlanc, true));
    // Les traits du canot.
    o.push(h.chemin(Cm([...etrave(-1).slice().reverse(), ...echant(vQuille, -212, 212, 80), ...etrave(1)]), h.a.contour));
    o.push(h.chemin(Cm(bordA), h.a.contour));
    o.push(h.chemin(Cm(bordB), h.a.contour));
    o.push(h.chemin(Cm([...echant(vBordHaut, -240, ENC[0], 40)]), h.a.arete));
    o.push(h.chemin(Cm([...echant(vBordHaut, ENC[1], 240, 40)]), h.a.arete));
    o.push(h.path(cr(Cm(zig([FEN[0], vBordHaut(FEN[0])], [FEN[0] - 1, vQuille(FEN[0])], 3, 1.6))), h.a.detail));
    o.push(h.path(cr(Cm(zig([FEN[1] + 0.5, vQuille(FEN[1])], [FEN[1], vBordHaut(FEN[1])], 3, 1.6))), h.a.detail));
    o.push(h.chemin(Cm(entA), h.a.detail));
    o.push(h.chemin(Cm(entB), h.a.detail));
    // Les poings sur le plat-bord : le porteur une seconde fois, découpé autour des deux poings,
    // au-dessus du dessous du plat-bord : ils serrent le plat-bord, ils passent devant lui.
    const pm = [pers.mainP, pers.mainL];
    const x0 = Math.min(...pm.map(m => m.x)) - 16, x1 = Math.max(...pm.map(m => m.x)) + 14;
    const yh = Math.min(...pm.map(m => m.y)) - 16;
    const yb = Math.max(...pm.map(m => C((((m.x - P(0, 0)[0]) / geomPorte(z).s) - XT) / Math.cos(TH), vBord(-56))[1])) + 0.6;
    o.push(`<clipPath id="main-90-03"><rect x="${r1(x0)}" y="${r1(yh)}" width="${r1(x1 - x0)}" height="${r1(yb - yh)}"/></clipPath>`);
    o.push(`<g clip-path="url(#main-90-03)">${pers.toString()}</g>`);
    return o.join('\n');
  }

  // ───────────────────────── Vues 2 et 3 : de profil, coupé dans l'axe du canot ─────────────────────────
  // mm, x vers l'avant depuis les chevilles du porteur, y vers le haut depuis le sol. Le canot est coupé
  // dans son axe : derrière la tête, l'intérieur du flanc loin (en gris) et son plat-bord ; la traverse
  // du centre tranchée, sur les épaules, contre la nuque ; le fond du canot au-dessus de la tête.
  // Haussées, les épaules montent de 55 mm (angles.hausse) et portent la traverse : les cordons
  // pendent. Relâchées, le canot descend de 15 mm jusqu'à ce que les cordons se tendent et pend au
  // front ; les épaules, plus bas, laissent un jour sous la traverse.
  const HAUSSE = 70, TRAV = { hausse: 1548, relache: 1536 }, X_TRAV = 40;
  function geomBuste(z) {
    const X0 = -200, X1 = 320, Y0 = 1390, Y1 = 1905;
    const e = Math.min(z.l / (X1 - X0), z.h / (Y1 - Y0));
    const dx = (z.l - (X1 - X0) * e) / 2;
    const P = (x, y) => [dx + (x - X0) * e, z.h - (y - Y0) * e];
    return { e, P, X0, X1, Y0, Y1, dx };
  }
  function busteGeo(z, mode) {
    const { e, P, Y0 } = geomBuste(z);
    const R = mode === 'relache';
    const yT = TRAV[mode];                                     // le dessous de la traverse, à X_TRAV
    // le canot, dans son repère : u le long (vers le nez), v vers le haut depuis le dessous du plat-bord
    const Cb = (u, v) => P(X_TRAV + u, yT - 8 + v);           // le canot à plat : c'est un détail
    const g = P(0, 0);
    const pers = h.formes.corps({ x: g[0], y: g[1], pose: 'portage-canot', echelle: e, angles: Object.assign({}, BRAS, R ? {} : { hausse: HAUSSE }) });
    const co = courroie(pers.tete);
    const nd = Cb(-30, 22);                                    // le nœud, au bout de la traverse
    const q = [(co.bout[0] + nd[0]) / 2 - 10, Math.max(co.bout[1], nd[1]) + 34];   // le creux du cordon lâche
    const milieu = R ? [(co.bout[0] + nd[0]) / 2, (co.bout[1] + nd[1]) / 2] : [(co.bout[0] + 2 * q[0] + nd[0]) / 4, (co.bout[1] + 2 * q[1] + nd[1]) / 4];
    return { e, P, Y0, R, Cb, pers, co, nd, q, milieu };
  }
  function buste(z, mode) {
    const { e, P, Y0, R, Cb, pers, co, nd, q } = busteGeo(z, mode);
    const ligne = (v, a = -1200, b = 1200) => [Cb(a, v), Cb(b, v)];
    const o = [], id = `buste-90-03-${mode}`;
    o.push(`<clipPath id="${id}"><rect x="0" y="0" width="${r1(z.l)}" height="${r1(z.h)}"/></clipPath>`, `<g clip-path="url(#${id})">`);
    // le flanc loin vu de l'intérieur (gris), entre son plat-bord et le fond
    o.push(h.chemin([...ligne(33), ...ligne(338).reverse()], h.a.loin, true));
    // le plat-bord loin
    o.push(h.chemin([...ligne(0), ...ligne(33).reverse()], aBlanc, true), h.chemin(ligne(0), h.a.arete), h.chemin(ligne(33), h.a.arete));
    // le fond du canot, tranché : l'écorce (trait fort) et les membrures (trait fin)
    o.push(h.chemin([...ligne(338), ...ligne(352).reverse()], aBlanc, true), h.chemin(ligne(352), h.a.contour), h.chemin(ligne(338), h.a.detail));
    // le porteur, coupé sous les épaules par un arrachement
    const yc = Y0 + 22, coupe = zig(P(-260, yc), P(380, yc), 12, 2.2);
    o.push(`<clipPath id="${id}-c"><path d="M ${pt([-5, -5])} L ${pt([z.l + 5, -5])} L ${pt([z.l + 5, coupe[coupe.length - 1][1]])} ${coupe.slice().reverse().map(p => 'L ' + pt(p)).join(' ')} Z"/></clipPath>`);
    o.push(`<g clip-path="url(#${id}-c)">${pers.toString()}</g>`);
    o.push(h.chemin(coupe.filter(p => p[0] > P(-120, 0)[0] && p[0] < P(150, 0)[0]), h.a.detail));
    // la traverse du centre, tranchée, sur les épaules ou au-dessus d'elles
    o.push(h.chemin([Cb(-32.5, 8), Cb(32.5, 8), Cb(32.5, 33), Cb(-32.5, 33)], h.a.hachure('bois'), true));
    // la courroie, l'écorce dessous, et le cordon de la tempe à la traverse : lâche ou tendu
    o.push(co.ecorce, co.bande);
    if (R) o.push(h.ligne(...co.bout, ...nd, h.a.arete));
    else o.push(h.path(`M ${pt(co.bout)} Q ${pt(q)} ${pt(nd)}`, h.a.arete));
    o.push(h.cercle(...nd, 2.2, h.a.plein));
    o.push('</g>');
    // le geste des épaules, derrière le dos, sous le bras
    const f0 = P(-110, R ? 1490 : 1415), f1 = P(-110, R ? 1415 : 1490);
    o.push(R ? h.fleche(`M ${pt(f0)} L ${pt(f1)}`, h.a.arete) : h.geste(`M ${pt(f0)} L ${pt(f1)}`));
    // relâchées : le jour sous la traverse, le point qui dit que le cordon est à la longueur du cou
    if (R) o.push(h.controle(...P(X_TRAV, 1508), 12));
    return o.join('\n');
  }

  // ───────────────────────── Vue 4 : deux pagaies liées, vu de dessus, et le bout de près ─────────────────────────
  // Monde en cm, x en travers, y le long du canot (négatif vers le nez, en haut de la vue).
  // Le canot est à l'endroit, pagaies liées ; retourné, elles passent sous les traverses et
  // leurs manches se posent sur les épaules, la boucle pend jusqu'au front.
  // À gauche le plan, à droite une loupe ×3 sur le bout droit de la traverse du centre.
  const Y_AV = -54, Y_AR = 50, X_G = -63;
  function geomPlan(z) {
    const s = (z.h - 6) / (Y_AR - Y_AV + 18);
    const ox = 3 - X_G * s, oy = 3 - (Y_AV - 2) * s;
    const P = (x, y) => [ox + x * s, oy + y * s];
    return { s, P };
  }
  const LC = [29.5, 0.5], GROS = 3, R_LOUPE = 70;
  function geomLoupe(z) {
    const { s, P } = geomPlan(z);
    const r = R_LOUPE, sl = GROS * s, R = r / sl;
    const c = [z.l - 25 - r, z.h / 2];
    const Q = (x, y) => [c[0] + (x - LC[0]) * sl, c[1] + (y - LC[1]) * sl];
    return { s, P, Q, c, r, R, sl };
  }
  const bi = y => 42.5 - 0.0004 * y * y;          // bord intérieur du plat-bord
  const XE = 35, TL = 3.5, TE = 1.8;               // l'épaulement ; demi-largeurs de la traverse
  const LW = 1.5;                                   // largeur de la lanière
  // Le tour : la lanière passe par-dessus (X_TOUR), redescend en biais sous la traverse, ressort
  // du côté du nez contre l'épaulement (X_SORT) et file vers la pagaie.
  const X_TOUR = 39.1, X_SORT = 36.3;
  // La moitié droite de la boucle, du tour jusqu'au milieu (vers le nez).
  const BOUCLE_D = [[X_TOUR, -2.2], [39.3, -5], [38.2, -9.5], [34.3, -14.5], [28, -18.5], [17, -22.5], [0, -25]];
  const BOUCLE = [...BOUCLE_D.map(([x, y]) => [-x, y]), ...BOUCLE_D.slice(0, -1).reverse()];
  // Le bout qui ressort de sous la traverse, puis file sur elle jusque sous la pagaie.
  const BOUT_D = [[X_SORT, -2.25], [X_SORT, -1.1], [35.9, 0.05], [35, 0.55], [33.5, 0.6], [24, 0.6], [18, 0.6], [13.5, 0.6]];
  function pagaie(c) {
    const g = [[-4, 47.5], [-4.6, 45.5], [-3.4, 42.5], [-1.7, 40], [-1.7, -28], [-3.4, -35], [-6.3, -41], [-7.5, -47], [-7.5, -56]];
    const d = g.map(([x, y]) => [-x, y]).reverse();
    return [...g, ...d].map(([x, y]) => [c + x, y]);
  }
  // La ligature en croix sur la pagaie : la lanière en noir ; le second brin, qui passe
  // par-dessus, est détouré de blanc pour qu'on voie le croisement.
  const croix = (c, w, Tm) => [
    h.chemin(Tm(membre([[c - 3.2, -4.6], [c + 3.2, 4.6]], w)), h.a.plein, true),
    h.chemin(Tm(membre([[c + 3.5, -5], [c - 3.5, 5]], w * 1.6)), aBlanc, true),
    h.chemin(Tm(membre([[c + 3.2, -4.6], [c - 3.2, 4.6]], w)), h.a.plein, true),
  ];
  const traverseCentre = x0 => [[-x0, -TE], [-XE, -TE], [-XE, -TL], [XE, -TL], [XE, -TE], [x0, -TE], [x0, TE], [XE, TE], [XE, TL], [-XE, TL], [-XE, TE], [-x0, TE]];
  const bandeLisse = (pts, w, pas = 6) => membre(lisse(pts, pas), w);
  // Un ruban lissé dont le début est arrondi : la lanière qui tourne sur le bord de la traverse.
  function ruban(pts0, w) {
    const pts = lisse(pts0, 8), n = pts.length, hw = w / 2;
    const nor = i => {
      const a = pts[Math.max(0, i - 1)], b = pts[Math.min(n - 1, i + 1)], L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
      return [-(b[1] - a[1]) / L, (b[0] - a[0]) / L];
    };
    const g = pts.map((p, i) => { const [nx, ny] = nor(i); return [p[0] + nx * hw, p[1] + ny * hw]; });
    const d = pts.map((p, i) => { const [nx, ny] = nor(i); return [p[0] - nx * hw, p[1] - ny * hw]; });
    const [nx, ny] = nor(0), u = [ny, -nx], p0 = pts[0], cap = [];
    for (let k = 1; k < 8; k++) {
      const t = Math.PI * k / 8;
      cap.push([p0[0] + hw * (-Math.cos(t) * nx - Math.sin(t) * u[0]), p0[1] + hw * (-Math.cos(t) * ny - Math.sin(t) * u[1])]);
    }
    return [...g, ...d.reverse(), ...cap];
  }
  function plan(z) {
    const { P, s } = geomPlan(z);
    const L = geomLoupe(z);
    const Pm = pts => pts.map(p => P(...p));
    const o = [];
    const ys = echant(y => y, Y_AV - 3, Y_AR + 3, 30).map(p => p[0]);
    // Le fond du canot, entre les plats-bords : le plan d'arrière, en gris
    o.push(h.chemin(Pm([...ys.map(y => [-bi(y), y]), ...ys.slice().reverse().map(y => [bi(y), y])]), h.a.loin, true));
    // La boucle de la lanière, couchée au fond (retourné, elle pend sur le front).
    o.push(h.chemin(Pm(bandeLisse(BOUCLE, 1.7)), h.a.plein, true));
    // Les traverses : celle du centre, avec son épaulement de chaque côté, et ses deux voisines.
    o.push(poly(Pm(traverseCentre(bi(0) + 0.5))));
    [-40, 40].forEach(y => { const c = bi(y) + 0.5; o.push(poly(Pm([[-c, y - 2.5], [c, y - 2.5], [c, y + 2.5], [-c, y + 2.5]]))); });
    // Les plats-bords : lisse intérieure, lisse extérieure.
    [1, -1].forEach(sg => {
      const int = ys.map(y => [sg * bi(y), y]), ext = ys.map(y => [sg * (bi(y) + 4.6), y]);
      o.push(h.chemin(Pm([...int, ...ext.slice().reverse()]), aBlanc, true));
      o.push(h.chemin(Pm(int), h.a.arete));
      o.push(h.chemin(Pm(ys.map(y => [sg * (bi(y) + 2.7), y])), h.a.fin));
      o.push(h.chemin(Pm(ext), h.a.contour));
    });
    // La lanière : un tour sur le bout de la traverse, contre l'épaulement ; son bout file sur la
    // traverse jusqu'à la pagaie.
    [1, -1].forEach(sg => {
      o.push(h.chemin(Pm(bandeLisse(BOUT_D.map(([x, y]) => [sg * x, y]), 1.3)), h.a.plein, true));
      o.push(h.chemin(Pm(membre([[sg * X_TOUR, -2.2], [sg * X_TOUR, 2.2]], 1.3)), h.a.plein, true));
    });
    // Les pagaies, par-dessus les trois traverses, liées en croix sur celle du centre.
    [-15, 15].forEach(c => {
      o.push(forme(Pm(pagaie(c))));
      o.push(h.ligne(...P(c, -36), ...P(c, -56), h.a.fin));
      croix(c, 1.3, Pm).forEach(t => o.push(t));
    });
    // Coupures du canot, devant et derrière : ce qui dépasse est masqué jusqu'au bord de la vue.
    [[Y_AV, 0], [Y_AR, z.h]].forEach(([y, bordY]) => {
      const l = Pm(zig([-51, y], [51, y], 12, 1.1));
      o.push(h.chemin([...l, [l[l.length - 1][0], bordY], [l[0][0], bordY]], aBlanc, true));
      o.push(h.chemin(l, h.a.detail));
    });
    // Cote entre les pagaies.
    [-15, 15].forEach(c => o.push(h.ligne(...P(c, 48.5), ...P(c, 59), h.a.fin)));
    o.push(h.cote(...P(-15, 57), ...P(15, 57), '≈ 300 mm', { cote: 'dessous' }));
    // Le cercle d'appel sur le plan, et le trait qui le relie à la loupe.
    const ca = P(...LC), ra = L.R * s;
    o.push(h.cercle(...ca, ra, h.a.detail));
    const dx = L.c[0] - ca[0], dy = L.c[1] - ca[1], dl = Math.hypot(dx, dy);
    o.push(h.ligne(ca[0] + dx / dl * ra, ca[1] + dy / dl * ra, L.c[0] - dx / dl * L.r, L.c[1] - dy / dl * L.r, h.a.fin));
    o.push(loupe(z));
    return o.join('\n');
  }
  // La loupe : le bout droit de la traverse du centre, grossi trois fois. On y voit l'épaulement
  // (la marche taillée dans la traverse), le tour complet de la lanière derrière lui (dessus en
  // plein, dessous en tireté), la boucle qui part vers le nez, et le bout qui file sur la
  // traverse jusqu'à la ligature en croix de la pagaie.
  function loupe(z) {
    const { Q, c, r, R } = geomLoupe(z);
    const Qm = pts => pts.map(p => Q(...p));
    const id = 'loupe-90-03';
    const o = [];
    const x0 = LC[0] - R - 2, y0 = LC[1] - R - 2, y1 = LC[1] + R + 2;
    o.push(h.cercle(...c, r, aBlanc));
    // le fond du canot, en gris, jusqu'au plat-bord
    {
      const yy = echant(y => y, LC[1] - R - 3, LC[1] + R + 3, 12).map(p => p[0]);
      o.push(h.chemin(Qm([...yy.map(y => [LC[0] - R - 3, y]), ...yy.slice().reverse().map(y => [bi(y), y])]), h.a.loin, true));
    }
    // La traverse : pleine largeur jusqu'à l'épaulement, puis amincie jusque sous le plat-bord.
    const trav = [[x0, -TL], [XE, -TL], [XE, -TE], [bi(0) + 0.5, -TE], [bi(0) + 0.5, TE], [XE, TE], [XE, TL], [x0, TL]];
    o.push(poly(Qm(trav)));
    // Le dessous du tour, caché par la traverse : de l'arrière au nez, en biais, en tireté.
    const dessous = membre([[X_TOUR, 1.8], [X_SORT, -1.8]], LW);
    o.push(h.chemin(Qm([dessous[0], dessous[1]]), h.a.cache));
    o.push(h.chemin(Qm([dessous[3], dessous[2]]), h.a.cache));
    // Le bout qui ressort au bord de la traverse, contre l'épaulement, et file sur elle jusque
    // sous la pagaie.
    o.push(h.chemin(Qm(ruban(BOUT_D, LW)), h.a.plein, true));
    // La pagaie, couchée sur la traverse.
    o.push(poly(Qm([[13.3, y0], [16.7, y0], [16.7, y1], [13.3, y1]])));
    // La ligature en croix, par-dessus le manche et la traverse.
    croix(15, LW, Qm).forEach(t => o.push(t));
    // Le tour par-dessus la traverse, qui monte en boucle vers le nez.
    o.push(h.chemin(Qm(ruban([[X_TOUR, 2.25], [X_TOUR, 0], ...BOUCLE_D], LW)), h.a.plein, true));
    // Le plat-bord : lisse intérieure (sur le bout de la traverse), lisse extérieure.
    const ys = echant(y => y, y0, y1, 12).map(p => p[0]);
    const int = ys.map(y => [bi(y), y]), ext = ys.map(y => [bi(y) + 4.6, y]);
    o.push(h.chemin(Qm([...int, ...ext.slice().reverse()]), aBlanc, true));
    o.push(h.chemin(Qm(int), h.a.arete));
    o.push(h.chemin(Qm(ys.map(y => [bi(y) + 2.7, y])), h.a.fin));
    o.push(h.chemin(Qm(ext), h.a.contour));
    // Cote : de l'épaulement au plat-bord. Trait de rappel sous l'épaulement ; l'autre bout
    // s'arrête sur le bord du plat-bord. Le chiffre sous la ligne de cote.
    const yc = 7;
    o.push(h.ligne(...Q(XE, TL + 0.8), ...Q(XE, yc + 1.2), h.a.fin));
    const [ca, cy] = Q(XE, yc), [cb] = Q(bi(yc), yc);
    o.push(h.ligne(ca, cy, cb, cy, h.a.detail));
    o.push(h.ligne(ca, cy - 6, ca, cy + 6, h.a.detail));
    o.push(h.ligne(cb, cy - 6, cb, cy + 6, h.a.detail));
    o.push(h.texte(Q(41.4, 0)[0], cy + 15, '50 à 100 mm', { ancre: 'end', lisere: true }));
    // le point à contrôler : la lanière appuyée contre l'épaulement (sans lui, elle glisse au milieu)
    return [`<clipPath id="${id}"><circle cx="${r1(c[0])}" cy="${r1(c[1])}" r="${r1(r)}"/></clipPath>`,
      `<g clip-path="url(#${id})">`, ...o, '</g>', h.cercle(...c, r, h.a.detail), h.controle(...Q((XE + X_TOUR) / 2, 0), 12)].join('\n');
  }

  // ───────────────────────── Vue 5 : la courroie de front, à plat ─────────────────────────
  // Les courroies sont coupées pour la longueur : on n'en voit que le bout cousu et le bout libre.
  const XG_GAB = -58, XD_GAB = 42;
  function geomGab(z) {
    const s = Math.min((z.l - 8) / (XD_GAB - XG_GAB), (z.h - 6) / 30);
    const ox = 4 - XG_GAB * s, oy = z.h / 2;
    const P = (x, y) => [ox + x * s, oy + y * s];
    return { s, P };
  }
  const demi = x => 3.4 + 1.6 * (1 - (x / 23) ** 2);
  const W_C = 2.85;
  function gabarit(z) {
    const { P } = geomGab(z);
    const Pm = pts => pts.map(p => P(...p));
    const o = [];
    // La pièce du front.
    const xs = echant(x => x, -23, 23, 30).map(p => p[0]);
    const piece = [...xs.map(x => [x, -demi(x)]), ...xs.slice().reverse().map(x => [x, demi(x)])];
    o.push(poly(Pm(piece), h.a.contour));
    // Les deux courroies, cousues sur les bouts.
    [1, -1].forEach(sg => {
      const w = W_C;
      o.push(poly(Pm([[17 * sg, -w], [28 * sg, -w], [28 * sg, w], [17 * sg, w]]), h.a.arete));
      const q = [[30.5 * sg, -w], [33 * sg, -w], [36.5 * sg, -2.1], [38.6 * sg, -0.9], [39.5 * sg, 0], [38.6 * sg, 0.9], [36.5 * sg, 2.1], [33 * sg, w], [30.5 * sg, w]];
      o.push(h.chemin(Pm(q), aBlanc, true));
      o.push(h.chemin(Pm(q), h.a.arete));
      [28, 30.5].forEach(x => o.push(h.chemin(Pm(zig([x * sg, -w - 1.2], [x * sg, w + 1.2], 4, 0.5)), h.a.detail)));
      // La couture au point sellier.
      o.push(h.chemin(Pm([[17.7 * sg, -2.05], [22.3 * sg, -2.05], [22.3 * sg, 2.05], [17.7 * sg, 2.05]]), h.a.cache, true));
    });
    // Longueur de la pièce, au-dessus.
    o.push(h.ligne(...P(-23, -3.8), ...P(-23, -9.6), h.a.fin));
    o.push(h.ligne(...P(23, -3.8), ...P(23, -9.6), h.a.fin));
    o.push(h.cote(...P(-23, -8.6), ...P(23, -8.6), '≈ 460 mm'));
    // Largeur de la pièce, au milieu : la ligne de cote s'interrompt pour le chiffre.
    const [xm, ym] = P(0, 0), [, yh] = P(0, -demi(0)), [, yb] = P(0, demi(0));
    o.push(h.ligne(xm, yh, xm, ym - 7, h.a.detail), h.ligne(xm, ym + 6, xm, yb, h.a.detail));
    o.push(h.ligne(xm - 6, yh, xm + 6, yh, h.a.detail), h.ligne(xm - 6, yb, xm + 6, yb, h.a.detail));
    o.push(h.texte(xm, ym + 4, '≈ 100 mm'));
    // Longueur de la courroie, du bout cousu au bout libre, dessous à droite.
    o.push(h.ligne(...P(17, 3.4), ...P(17, 8.2), h.a.fin));
    o.push(h.ligne(...P(39.5, 1), ...P(39.5, 8.2), h.a.fin));
    o.push(h.cote(...P(17, 7.2), ...P(39.5, 7.2), '≈ 3000 mm', { cote: 'dessous' }));
    // Largeur de la courroie, hors du cuir : les bords du bout libre prolongés vers la gauche, la
    // ligne de cote entre eux au-delà de la pointe, le chiffre dessous.
    const XR = -44.3;
    [-W_C, W_C].forEach(y => o.push(h.ligne(...P(-35, y), ...P(XR - 1.4, y), h.a.fin)));
    const [xr, ya] = P(XR, -W_C), [, yr] = P(XR, W_C);
    o.push(h.ligne(xr, ya, xr, yr, h.a.detail));
    o.push(h.texte(xr, yr + 15, '50 à 64 mm'));
    return o.join('\n');
  }

  return {
    ref: '90-03',
    titre: 'Le portage',
    desc: 'Un porteur marche seul, le canot retourné sur les épaules, nez levé, le bout de derrière qui cherche le sol, la traverse du centre contre la nuque et les mains lancées vers l’arrière sur le plat-bord ; une fenêtre dans le flanc montre la courroie passée sur le front et son cordon noué à la traverse. De profil, le canot coupé dans son axe (l’intérieur du flanc en gris) : épaules haussées (flèche rouge), la traverse repose sur les épaules et le cordon pend, lâche ; épaules relâchées, la traverse quitte les épaules (le jour, cerclé de rouge) et le canot pend au front par le cordon tendu. De l’écorce de bouleau est glissée sous la courroie. Sans courroie : deux pagaies couchées sur trois traverses, à environ 300 mm l’une de l’autre, liées en croix sur celle du centre ; la boucle de la lanière passera sur le front. Une loupe grossit trois fois le bout de la traverse du centre : la marche de l’épaulement, à 50 à 100 mm du plat-bord ; la lanière qui en fait un tour complet derrière lui (dessus en plein, dessous en tireté) et monte en boucle vers le nez ; son bout qui file sur la traverse jusqu’à la ligature en croix de la pagaie. La courroie à plat : une pièce de cuir épais d’environ 100 × 460 mm, amincie vers les bouts, et deux courroies souples de 50 à 64 mm de large sur environ 3000 mm, cousues au point sellier.',
    format: 'pleine',
    disposition: [['porte'], ['hausse', 'relache'], ['pagaies', 'gabarit']],
    hauteurs: [1.35, 1.2, 0.85],
    largeurs: [[1], [1, 1], [321, 257]],
    vues: {
      porte: {
        titre: 'Seul, la traverse du centre sur la nuque',
        dessin: z => porte(z),
        renvois: z => {
          const { P, C } = geomPorte(z);
          const pers = porteur(z), co = courroie(pers.tete), m = pers.mainP;
          return [
            { n: 1, rond: P(-48, 196), cible: C(-1.5, 2), texte: 'traverse du centre' },
            { n: 2, rond: P(40, 205), cible: co.sur(-38, 1.08), texte: 'courroie de front' },
            { n: 3, rond: P(-95, 112), cible: [m.x, m.y + 6], texte: 'mains sur le bout qui baisse' },
          ];
        },
      },
      hausse: {
        titre: 'Épaules haussées : elles portent le canot',
        dessin: z => buste(z, 'hausse'),
        renvois: z => {
          const G = busteGeo(z, 'hausse');
          return [
            { n: 4, rond: [z.l - 14, 20], cible: G.co.sur(-10, 0.98), texte: 'écorce de bouleau' },
            { n: 5, rond: [14, G.milieu[1] - 52], cible: [G.milieu[0], G.milieu[1] + 1.5], texte: 'cordon lâche' },
            { n: 6, rond: [14, G.Cb(0, 20)[1] + 40], cible: G.Cb(-12, 8), texte: 'traverse sur les épaules' },
          ];
        },
      },
      relache: {
        titre: 'Épaules relâchées : le canot pend au front',
        dessin: z => buste(z, 'relache'),
        renvois: z => {
          const G = busteGeo(z, 'relache');
          return [
            { n: 7, rond: [14, G.milieu[1] - 30], cible: G.milieu, texte: 'cordon tendu, coupé au cou' },
            { n: 8, rond: [14, G.nd[1] + 30], cible: [G.nd[0] - 2, G.nd[1] + 1.5], texte: 'cordon noué à la traverse' },
          ];
        },
      },
      pagaies: {
        titre: 'Sans courroie : deux pagaies liées',
        dessin: z => plan(z),
        renvois: z => {
          const { P } = geomPlan(z);
          const { Q, c, r } = geomLoupe(z);
          const xr = c[0] + r + 13;
          return [
            { n: 9, rond: [Math.max(13, P(-56, -30)[0]), P(-56, -30)[1]], cible: P(-30.9, -16.5), texte: 'boucle, sur le front' },
            { n: 10, rond: [Math.max(13, P(-56, 8)[0]), P(-56, 8)[1]], cible: P(-16.8, 2.5), texte: 'bouts liant les pagaies' },
            { n: 11, rond: [Math.max(13, P(-56, 37)[0]), P(-56, 37)[1]], cible: P(-15.5, 33), texte: 'manches sur les épaules' },
            { n: 12, rond: [xr, c[1] - 24], cible: Q(X_TOUR, 0.6), texte: 'un tour, contre l’épaulement' },
            { n: 13, rond: [xr, c[1] + 24], cible: Q(XE, 2.65), texte: 'épaulement, sinon encoche' },
          ];
        },
      },
      gabarit: {
        titre: 'La courroie de front, taillée dans une peau',
        dessin: z => gabarit(z),
        renvois: z => {
          const { P } = geomGab(z);
          return [
            { n: 14, rond: P(8, 12.4), cible: P(8, 4.4), texte: 'cuir épais, ne roule pas' },
            { n: 15, rond: P(-29.5, -10.5), cible: P(-32, -1.2), texte: 'courroie souple, amincie' },
            { n: 16, rond: P(-10, 12.4), cible: P(-19.5, 2.05), texte: 'couture au point sellier' },
          ];
        },
      },
    },
  };
};
