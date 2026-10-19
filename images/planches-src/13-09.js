// Planche 13-09. Le briquet à pierre. Refaite au complet le 19 octobre 2026 (règle 12 : planche signalée, la main
// de la pierre en « pince de homard », le poing de l'acier en « gant de boxe », puis l'avant-bras au plan de match).
// Rien n'est repris de l'ancienne version.
//
// Les repères 1 à 9 sont ceux du chapitre 13 (section 7, « Le briquet à pierre »), dans l'ordre du texte :
//   l'acier cintré en U (1), ou la lime (2, au lieu de 1) ; la pierre de grève (3), cassée (4), qui raye le verre (5) ;
//   pincer l'amadou (6) ; passer les doigts dans le U (7) ; frapper vers le bas en rasant l'arête (8) ; la paillette
//   qui tombe sur l'amadou (9).
//
// Les mains : h.formes.mainStock seulement (brief-agent.md), aucune main dessinée, aucune main déformée. Les deux
// sont la main 1-01 « poing-barre » (le poing serré, le pouce refermé par-dessus), retournée (miroir), sans son
// objet (objet: false) :
//   la pierre   tournée de 96° : l'avant-bras descend vers le bas à gauche, les doigts repliés en haut ; la pierre
//               sort du poing à droite, du côté du pouce, et le bout du pouce appuie sur l'amadou couché dessus ;
//   l'acier     tournée de 16,4° : l'avant-bras descend vers le bas à droite, les doigts repliés tournés vers la
//               pierre ; le U de l'acier passe devant les doigts, ses deux bras rentrent dans le poing. La face du
//               fond du U est la face qui frappe : elle est droite, et descend en rasant l'arête.
// L'avant-bras (signalé au plan de match) : celui de la main de la bibliothèque, prolongé tout droit dans le sens de
// ses bords jusqu'au bord de la vue, sans coude ni courbe (comme 04-41 et 13-40) ; les deux viennent du bas, du
// corps de celui qui frappe.
//
// Le rouge : la flèche du verre (5) et la flèche du coup (8), chacune avec son repère.
// Aucune cote : le chapitre ne donne aucune mesure de l'acier ni de la pierre.
// Se lit en regard de la 13-40 (le nid qu'on souffle ensuite).
//
// 19 octobre 2026, JP sur la vue « La pierre » : « la coupe est pas bonne de la roche, c'est offset ». La cassure était
// une ellipse à part, avec son propre contour fort, posée sur le bout d'un cortex qui ne se fermait pas au même
// endroit : elle dépassait. La pierre a maintenant une seule silhouette ; la face cassée en est découpée (la moitié de
// droite de son ellipse fait le bout de la silhouette, la moitié de gauche est l'arête) ; le pointillé du cortex est
// découpé sur l'arête ; les ondes partent du point d'impact, posé sur l'arête. L'éclat sur la vitre n'avait pas le
// défaut (sa face est bâtie sur les sommets de son contour) : il ne change pas, ni le reste de la planche.

module.exports = (h) => {
  const path = require('path');
  const A = h.a, F = h.formes;
  const CAT = require(path.resolve(__dirname, '../../.claude/skills/planches/scripts/mains/stock.js')).catalogue;
  const f = v => Math.round(v * 10) / 10;
  const RAD = Math.PI / 180;
  const add = (p, q) => [p[0] + q[0], p[1] + q[1]];
  const sub = (p, q) => [p[0] - q[0], p[1] - q[1]];
  const mul = (p, k) => [p[0] * k, p[1] * k];
  const lon = p => Math.hypot(p[0], p[1]);
  const unit = p => mul(p, 1 / lon(p));
  const perp = p => [-p[1], p[0]];
  const gen = s => { let g = s; return () => (g = (g * 16807) % 2147483647) / 2147483647; };
  const M = p => `M ${f(p[0])} ${f(p[1])}`;
  const Lp = p => ` L ${f(p[0])} ${f(p[1])}`;
  const poly = (pts, ferme = true) => pts.map((p, i) => (i ? Lp(p) : M(p))).join('') + (ferme ? ' Z' : '');
  // Courbe lisse (Catmull-Rom) par tous les points.
  const lisse = (pts, ferme = false) => {
    const n = pts.length, p = i => ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
    let d = M(pts[0]);
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = p(i - 1), p1 = p(i), p2 = p(i + 1), p3 = p(i + 2);
      d += ` C ${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
    }
    return ferme ? d + ' Z' : d;
  };
  const dansPoly = pl => ([x, y]) => {
    let c = false;
    for (let i = 0, j = pl.length - 1; i < pl.length; j = i++) {
      const [xi, yi] = pl[i], [xj, yj] = pl[j];
      if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c;
    }
    return c;
  };
  // Le grain roulé d'un caillou de grève : un semis de points dans une forme (test), tirés dans la boîte du repère.
  const semis = (boite, dedans, n, graine, T, ep = 1.4) => {
    const r = gen(graine), [x0, y0, x1, y1] = boite;
    let d = '';
    for (let i = 0; i < n; i++) {
      const p = [x0 + r() * (x1 - x0), y0 + r() * (y1 - y0)];
      if (!dedans(p)) continue;
      const q = T(p);
      d += `M${f(q[0])} ${f(q[1])}h0.01`;
    }
    return d ? `<path d="${d}" fill="none" stroke="#1A1A1A" stroke-width="${ep}" stroke-linecap="round"/>` : '';
  };
  // Une fenêtre d'un repère de dessin, ramenée à la vue (même échelle en x et en y, centrée).
  const fenetre = (z, x0, y0, x1, y1) => {
    const k = Math.min(z.l / (x1 - x0), z.h / (y1 - y0));
    const ox = (z.l - (x1 - x0) * k) / 2 - x0 * k, oy = (z.h - (y1 - y0) * k) / 2 - y0 * k;
    return { k, T: ([x, y]) => [ox + x * k, oy + y * k] };
  };
  // Ce qui sort d'une vue (un avant-bras, l'acier) est coupé net par son bord.
  const decoupe = (id, z, s) => `<clipPath id="vue-${id}-1309"><rect x="0" y="0" width="${z.l}" height="${z.h}"/></clipPath>\n<g clip-path="url(#vue-${id}-1309)">\n${s}\n</g>`;
  // Un corps vu un peu de haut, par l'extrusion d'un profil : les faces de côté qu'on voit (celles qui regardent vers
  // le fond D), la face qui regarde à droite à l'ombre (la lumière vient d'en haut à gauche), puis le profil devant.
  const extrusion = (P, D, T, devant) => {
    const n = P.length, out = [];
    const aire = P.reduce((s, p, i) => { const q = P[(i + 1) % n]; return s + p[0] * q[1] - q[0] * p[1]; }, 0);
    const faces = [];
    for (let i = 0; i < n; i++) {
      const p = P[i], q = P[(i + 1) % n], e = sub(q, p);
      const no = aire > 0 ? [e[1], -e[0]] : [-e[1], e[0]];            // la normale vers l'extérieur
      if (no[0] * D[0] + no[1] * D[1] > 0.01) faces.push({ p, q, no });
    }
    // les faces du fond d'abord : celles dont le milieu est le plus loin dans le sens de D
    faces.sort((a, b) => ((a.p[0] + a.q[0]) * D[0] + (a.p[1] + a.q[1]) * D[1]) - ((b.p[0] + b.q[0]) * D[0] + (b.p[1] + b.q[1]) * D[1]));
    // chaque face, de la plus loin à la plus proche : son aplat, le bord de son fond, et ses arêtes de côté aux vrais
    // angles seulement (un coin arrondi fait de petites faces ne doit pas se lire en hachures)
    const vue = new Set(faces.map(({ p }) => P.indexOf(p)));
    const angle = i => { const e0 = sub(P[i], P[(i - 1 + n) % n]), e1 = sub(P[(i + 1) % n], P[i]); return (e0[0] * e1[0] + e0[1] * e1[1]) / (lon(e0) * lon(e1)); };
    faces.forEach(({ p, q, no }) => {
      const ombre = no[0] > 0.6 * lon(no), gris = ombre ? '#CFCFCF' : '#FFFFFF';
      out.push(h.path(poly([p, q, add(q, D), add(p, D)].map(T)), `fill="${gris}" stroke="${gris}" stroke-width="0.5" stroke-linejoin="round"`));
      let d = M(T(add(p, D))) + Lp(T(add(q, D)));
      const i = P.indexOf(p), j = (i + 1) % n;
      [[i, (i - 1 + n) % n], [j, i]].forEach(([k, voisin]) => { if (!vue.has(k === i ? voisin : j) || angle(k) < 0.85) d += ' ' + M(T(P[k])) + Lp(T(add(P[k], D))); });
      out.push(h.path(d, A.arete));
    });
    out.push(h.path(poly(P.map(T)), devant));
    return out.join('\n');
  };

  // ═══ Les mains ═════════════════════════════════════════════════════════════════════════════════════
  // La main 1-01 « poing-barre », dans le repère de son objet (l'axe de la barre) : s le long de la barre, vers le
  // côté du pouce ; t en travers, vers le bout du pouce et le devant des doigts repliés. Unités du fichier.
  const M101 = CAT['1-01'];
  const C0 = [M101.objet.x, M101.objet.y];
  const uB = [Math.cos(M101.objet.angle * RAD), Math.sin(M101.objet.angle * RAD)], nB = perp(uB);
  const ST = (s, t) => add(C0, add(mul(uB, s), mul(nB, t)));
  // Les bords de l'avant-bras, là où ils finissent droits avant l'arrondi de la coupe du fichier, et leur sens.
  const BORDS = [[178, 434.3], [182, 596]], SENS_BRAS = unit([-1, 0.012]);

  // Du fichier à la scène (k = 1), comme mainStock retourné (miroir) : l'ancre au centre de l'objet, puis la rotation.
  const versScene = o => {
    const c = Math.cos(o.angle * RAD), s = Math.sin(o.angle * RAD);
    return ([px, py]) => { const u = -(px - C0[0]), v = py - C0[1]; return [o.x + c * u - s * v, o.y + s * u + c * v]; };
  };
  // La main dans la vue, son avant-bras prolongé tout droit jusqu'au bord de la vue : deux traits qui continuent ses
  // bords, et un fond blanc qui couvre l'arrondi de la coupe du fichier. La main n'est ni déformée ni redessinée.
  const main = (o, T, k) => {
    const sc = versScene(o), p0 = T([o.x, o.y]);
    const m = F.mainStock({ id: '1-01', miroir: true, angle: o.angle, x: p0[0], y: p0[1], echelle: k, ancre: 'objet', objet: false });
    const [e1, e2] = BORDS.map(q => T(sc(q)));
    const d = unit(sub(T(sc(add(BORDS[0], SENS_BRAS))), e1));
    const a1 = add(e1, mul(d, -1.2)), a2 = add(e2, mul(d, -1.2)), b1 = add(e1, mul(d, 2000)), b2 = add(e2, mul(d, 2000));
    const tr = 'fill="none" stroke="#1A1A1A" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"';
    return [String(m), h.path(poly([a1, b1, b2, a2]), A.blanc), h.path(M(e1) + Lp(b1) + ' ' + M(e2) + Lp(b2), tr)].join('\n');
  };

  // ═══ La pierre dans le poing ══════════════════════════════════════════════════════════════════════
  const PIERRE_M = { angle: 96, x: 0, y: 0 };
  const sP = versScene(PIERRE_M);
  const P = (s, t) => sP(ST(s, t));
  // En (s, t) de la main de la pierre : +s vers le bout qui sort du poing, +t vers le dessus (le bout du pouce).
  // Un caillou de grève cassé, vu un peu de haut : la face qu'on voit (le grain roulé, puis les éclats frais), le
  // dessus (où l'amadou est couché) et le bout (la cassure fraîche, à l'ombre). L'arête est le bord entre le dessus
  // et la cassure du bout.
  const PROF = [20, 48];
  const fond = q => add(q, mul(PROF, 1 + 0.07 * Math.sin(q[0] / 21)));          // un fond un peu irrégulier
  const HAUT = [[112, 30], [146, 37], [186, 35], [226, 38], [258, 31]];         // le bord du dessus, devant
  const A1 = HAUT[HAUT.length - 1];                                               // le bout de l'arête, devant
  const BOUT = [A1, [253, 2], [243, -28], [226, -56]];                           // le bord de la cassure, devant
  const DESSOUS = [[226, -56], [194, -74], [150, -74], [116, -60], [98, -20]];
  const FACE = [...HAUT.slice().reverse(), ...BOUT.slice(1), ...DESSOUS.slice(1)];
  const DESSUS = [...HAUT, ...HAUT.slice().reverse().map(fond)];
  const CASSE = [...BOUT, ...BOUT.slice().reverse().map(fond)];
  const ROULE = [[112, 30], [146, 37], [186, 35], [196, -6], [192, -74], [150, -74], [116, -60], [98, -20]];
  const ECLATS = [[[186, 35], [196, -6], [192, -74]], [[226, 38], [232, -10], [226, -56]]];
  // les éclats frais de la face qu'on voit, et le point d'où partent leurs ondes
  const FACETTES = [{ pl: [[186, 35], [226, 38], [232, -10], [226, -56], [192, -74], [196, -6]], c: [206, -70], r: [26, 46, 66] },
    { pl: [[226, 38], [258, 31], [253, 2], [243, -28], [226, -56], [232, -10]], c: [236, -52], r: [24, 44, 64] }];
  const SILHOUETTE = [...DESSOUS.slice().reverse(), ...BOUT.slice().reverse().map(fond), ...HAUT.slice().reverse().map(fond).slice(1), HAUT[0]];
  // L'amadou : un carré de toile carbonisée couché sur le dessus, du dessous du pouce jusqu'au ras de l'arête, les
  // bords effilochés.
  const AMADOU = (() => {
    const g = gen(7);
    const bord = (a, b, n, j) => { const o = []; for (let i = 0; i < n; i++) { const t = i / n, q = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]; o.push(i ? add(q, [(g() - 0.5) * j, (g() - 0.5) * j]) : q); } return o; };
    const p1 = add([104, 34], mul(PROF, 0.08)), p2 = add([248, 34], mul(PROF, 0.08)), p3 = add([248, 34], mul(PROF, 0.9)), p4 = add([104, 34], mul(PROF, 0.9));
    return [...bord(p1, p2, 18, 4), ...bord(p2, p3, 6, 4), ...bord(p3, p4, 18, 4), ...bord(p4, p1, 6, 4)];
  })();
  // où la paillette tombe : sur l'amadou, près de l'arête
  const CHUTE = add([222, 36], mul(PROF, 0.5));

  // ═══ L'acier dans la main ═════════════════════════════════════════════════════════════════════════
  // Le U en (s, t) de la main de l'acier : le fond devant les doigts repliés (le devant des doigts est à t ≈ 111 à
  // 117), sa face extérieure en t = 136, la face qui frappe ; les bras au-dessus de l'index et sous l'auriculaire,
  // qui rentrent dans le poing.
  const U = { s0: -64, s1: 152, t0: 118, t1: 136, ep: 18, fin: 58, r: 10 };
  const arcs = (out, cs, ct, rr, a0, a1, n = 6) => { for (let i = 0; i <= n; i++) { const a = (a0 + (a1 - a0) * i / n) * RAD; out.push([cs + rr * Math.cos(a), ct + rr * Math.sin(a)]); } return out; };
  const profilU = () => {
    const { s0, s1, t0, t1, ep, fin, r } = U, out = [[s1, fin]];
    arcs(out, s1 - r, t1 - r, r, 0, 90);           // le coin du haut, dehors
    arcs(out, s0 + r, t1 - r, r, 90, 180);         // le coin du bas, dehors
    out.push([s0, fin], [s0 + ep, fin], [s0 + ep, t0], [s1 - ep, t0], [s1 - ep, fin]);
    return out;
  };
  const ACIER_ANGLE = 16.4;                         // la face qui frappe est droite
  // le point de contact : le point de la pierre le plus à droite, le bout de l'arête
  const E = SILHOUETTE.map(q => P(...q)).reduce((m, p) => (p[0] > m[0] ? p : m));
  const face0 = versScene({ angle: ACIER_ANGLE, x: 0, y: 0 })(ST(U.s0, U.t1));
  // la main de l'acier placée pour que la face qui frappe passe au ras de l'arête, son bas à « ecart » au-dessus
  const acier = ecart => {
    const o = { angle: ACIER_ANGLE, x: E[0] + 1 - face0[0], y: E[1] - ecart - face0[1] };
    return { o, sc: versScene(o) };
  };
  const AVANT = 40, APRES = -60;                    // le bas de la face : au-dessus de l'arête, puis passé dessous

  // ═══ La scène ═════════════════════════════════════════════════════════════════════════════════════
  const pierreSVG = (T, k) => {
    const TT = pts => pts.map(q => T(P(...q))), out = [];
    [FACE, DESSUS, CASSE].forEach(pl => out.push(h.path(poly(TT(pl)), A.blanc)));
    out.push(semis([90, -70, 200, 60], q => dansPoly(ROULE)(q) && q[0] > 136, Math.round(1800 * k * k), 13, q => T(P(...q)), 1.4));
    out.push(h.path(poly(TT(CASSE)), A.ombre));
    if (k > 0.6) FACETTES.forEach(({ pl, c, r }, i) => {
      const id = `onde-1309-${i}`;
      let d = '';
      r.forEach(rr => { const pts = []; for (let j = 0; j <= 14; j++) { const a = (-160 + 140 * j / 14) * RAD; pts.push(T(P(c[0] + rr * Math.cos(a), c[1] - rr * Math.sin(a) * 0.9))); } d += lisse(pts) + ' '; });
      out.push(`<clipPath id="${id}"><path d="${poly(TT(pl))}" fill="#FFFFFF" stroke="none"/></clipPath>`, `<g clip-path="url(#${id})">${h.path(d, A.fin)}</g>`);
    });
    ECLATS.forEach(o => out.push(h.path(poly(TT(o), false), A.detail)));
    out.push(h.path(poly(TT(HAUT), false), A.arete));
    out.push(h.path(poly(TT(BOUT), false), A.arete));
    out.push(h.path(poly(TT([A1, fond(A1)]), false), A.arete));
    out.push(h.path(poly(TT(SILHOUETTE)), A.contour));
    out.push(h.path(poly(TT(AMADOU)), A.plein));
    // de près, le tissage de la toile carbonisée
    if (k > 0.6) {
      let d = '';
      for (let i = 1; i < 12; i++) { const a = add([126 + i * 10, 37], mul(PROF, 0.14)), b = add([126 + i * 10, 36], mul(PROF, 0.84)); d += M(T(P(...a))) + Lp(T(P(...b))) + ' '; }
      for (let j = 1; j < 4; j++) { const a = add([132, 37], mul(PROF, 0.08 + 0.2 * j)), b = add([242, 34], mul(PROF, 0.08 + 0.2 * j)); d += M(T(P(...a))) + Lp(T(P(...b))) + ' '; }
      out.push(h.path(d, 'fill="none" stroke="#FFFFFF" stroke-width="0.5"'));
    }
    return out.join('\n');
  };
  // l'état : 'avant' (l'acier levé) ou 'apres' (l'acier qui passe l'arête)
  const scene = (T, k, etat) => {
    const out = [pierreSVG(T, k), main(PIERRE_M, T, k)];
    const { o, sc } = acier(etat === 'avant' ? AVANT : APRES);
    out.push(h.path(poly(profilU().map(q => T(sc(ST(...q))))), A.plein));
    out.push(main(o, T, k));
    return out.join('\n');
  };
  const scenePt = etat => q => acier(etat === 'avant' ? AVANT : APRES).sc(ST(...q));

  // Les paillettes, du point de contact : l'une remonte et retombe sur l'amadou, les autres filent en bas.
  const paillettes = (T, k) => {
    const c = T(E), chute = T(P(...CHUTE)), out = [];
    const traj = [
      { q: [8, 46], fin: [14, 92] },
      { q: [16, 30], fin: [30, 70] },
      { q: [4, 60], fin: [-2, 110] },
      { q: [24, 14], fin: [44, 40] },
    ];
    traj.forEach(({ q, fin }) => {
      const a = T(add(E, q)), b = T(add(E, fin));
      out.push(h.path(`M ${f(c[0])} ${f(c[1])} Q ${f(a[0])} ${f(a[1])} ${f(b[0])} ${f(b[1])}`, A.cache));
      out.push(h.cercle(b[0], b[1], 2.2, A.plein));
    });
    // la paillette qui retombe sur l'amadou : elle y brûle, un point clair sur la toile noire
    // son trajet passe au-dessus de la toile noire : un liseré blanc sous le tireté le garde lisible
    const sommet = T(add(E, [-16, -120]));
    const trajet = `M ${f(c[0])} ${f(c[1])} Q ${f(sommet[0])} ${f(sommet[1])} ${f(chute[0])} ${f(chute[1])}`;
    out.push(h.path(trajet, 'fill="none" stroke="#FFFFFF" stroke-width="2.4" stroke-linecap="round"'), h.path(trajet, A.cache));
    let r = '';
    for (let i = 0; i < 8; i++) { const a = (i * 45 + 20) * RAD; r += M(add(chute, [Math.cos(a) * 4.5, Math.sin(a) * 4.5])) + Lp(add(chute, [Math.cos(a) * 8, Math.sin(a) * 8])) + ' '; }
    out.push(h.path(r, 'fill="none" stroke="#FFFFFF" stroke-width="1.4" stroke-linecap="round"'));
    out.push(h.cercle(chute[0], chute[1], 3.2, A.blanc));
    return out.join('\n');
  };

  // ═══ L'acier seul ═════════════════════════════════════════════════════════════════════════════════
  // Le même U, vu un peu de haut : x vers la face qui frappe, y vers le bas ; la largeur de la bande vers le fond.
  const UV = profilU().map(([s, t]) => [t - U.fin, U.s1 - s]);
  const DU = [30, -22];

  // ═══ La lime ══════════════════════════════════════════════════════════════════════════════════════
  // Une vieille lime plate, la soie à gauche, vue un peu de haut : le dessus taillé, la tranche à l'ombre.
  const LIME = { x0: 0, x1: 230, y0: 0, y1: 26, soie: 52, ep: 6 };

  // ═══ La pierre seule et l'essai du verre ══════════════════════════════════════════════════════════
  // Le caillou cassé, une seule silhouette (JP, 19 octobre 2026 : « la coupe est pas bonne de la roche, c'est
  // offset »). Le bout cassé est une face plane, vue de trois quarts : une ellipse un peu bosselée (eF). Sa moitié de
  // droite fait le bout de la silhouette ; sa moitié de gauche est l'arête, où le cortex pointillé s'arrête net. Les
  // trois formes (la silhouette, le cortex, la face) sont bâties sur les mêmes points : la face ne peut ni dépasser ni
  // se décaler. Les ondes de la cassure sont des arcs concentriques autour du point d'impact, posé sur l'arête, et
  // découpés dans la face.
  const eF = a => { const m = 1 + 0.05 * Math.sin(3 * a + 1) + 0.04 * Math.sin(5 * a); return [126 + 19 * Math.cos(a) * m, 58 + 34 * Math.sin(a) * m]; };
  const arcF = (a0, a1, n = 60) => Array.from({ length: n + 1 }, (_, i) => eF(a0 + (a1 - a0) * i / n));
  const F_DROITE = arcF(Math.PI / 2, -Math.PI / 2);          // du bas au haut de la face, par la droite : le bout
  const F_GAUCHE = arcF(Math.PI / 2, 3 * Math.PI / 2);       // du bas au haut de la face, par la gauche : l'arête
  // le cortex : du haut de la face, par la gauche du caillou, jusqu'au bas de la face (une courbe Catmull-Rom,
  // échantillonnée pour que les trois formes partagent exactement ses points)
  const CORTEX = (() => {
    const pts = [F_DROITE[F_DROITE.length - 1], [96, 15], [64, 12], [34, 20], [12, 38], [6, 62], [18, 86], [48, 100], [84, 102], [110, 97], F_DROITE[0]];
    const n = pts.length, p = i => pts[Math.max(0, Math.min(n - 1, i))], o = [pts[0]];
    for (let i = 0; i < n - 1; i++) {
      const p0 = p(i - 1), p1 = p(i), p2 = p(i + 1), p3 = p(i + 2);
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6], c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      for (let k = 1; k <= 12; k++) {
        const t = k / 12, u = 1 - t;
        o.push([u * u * u * p1[0] + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * p2[0], u * u * u * p1[1] + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * p2[1]]);
      }
    }
    return o;
  })();
  const SIL_PIERRE = [...CORTEX, ...F_DROITE.slice(1, -1)];                  // la silhouette : le cortex, puis le bout
  const CORTEX_ZONE = [...CORTEX, ...F_GAUCHE.slice(1, -1)];                 // le cortex, fermé sur l'arête
  const FACE_CASSEE = [...F_DROITE, ...F_GAUCHE.slice(1, -1).reverse()];     // la face, toute l'ellipse
  const COUP = eF(128 * RAD);                                                // le point d'impact, sur l'arête
  // L'essai : un éclat de la même pierre, son arête traînée sur un morceau de vitre ; la rayure reste derrière.
  const VITRE = [[64, 168], [204, 140], [252, 168], [112, 198]];
  const ECLAT = [[176, 166], [168, 140], [176, 116], [198, 108], [214, 122], [208, 146]];
  const ECLAT_C = [[176, 166], [208, 146], [214, 122], [196, 138]];

  // Les fenêtres des deux vues du geste, autour du point de contact.
  const POUCE = P(132, 62);
  const FG = [E[0] - 400, E[1] - 275, E[0] + 290, E[1] + 270];
  const FD = [POUCE[0] - 30, E[1] - 90, E[0] + 56, E[1] + 150];

  return {
    ref: '13-09',
    titre: 'Le briquet à pierre',
    desc: 'En haut, l’acier : un morceau d’acier au carbone cintré en U, vu un peu de haut ; à côté, séparée par un filet, l’autre façon, une vieille lime plate telle quelle ; puis la pierre : un caillou de grève cassé, le grain roulé d’un côté, la cassure fraîche de l’autre, dont le bord fait une arête coupante, et l’essai : l’arête qu’on traîne sur un morceau de verre y laisse une rayure (flèche rouge). En bas, le geste : la main gauche serre la pierre dans le poing, l’avant-bras qui descend vers le corps ; la pierre sort du côté du pouce, et le bout du pouce appuie sur un carré d’amadou noir couché sur la pierre jusqu’au ras de l’arête. La main droite, en poing, a les doigts passés dans le U ; la face du fond du U est juste au-dessus de l’arête, et la flèche rouge dit de frapper vers le bas en la rasant. De plus près, au point de frappe : l’acier qui passe l’arête, les paillettes qui partent, et l’une qui retombe et brûle sur l’amadou.',
    format: 'pleine',
    disposition: [['acier', 'lime', 'pierre'], ['geste', 'detail']],
    hauteurs: [0.84, 1.16],
    largeurs: [[0.78, 0.9, 1.4], [2, 1]],
    vues: {
      acier: {
        titre: 'L’acier, cintré en U',
        dessin: z => {
          const { T } = fenetre(z, -26, -36, 140, 236);
          const out = [h.ligne(z.l + 11, 0, z.l + 11, z.h, A.fin)];    // le filet de l'autre façon (règle 10)
          out.push(extrusion(UV, DU, T, A.plein));
          return out.join('\n');
        },
        renvois: z => {
          const { T } = fenetre(z, -26, -36, 140, 236);
          return [{ n: 1, rond: T([-12, 30]), cible: T([12, 9]), texte: 'acier au carbone cintré en U' }];
        },
      },
      lime: {
        titre: 'Sans forge : une lime',
        dessin: z => {
          const { T } = fenetre(z, -60, -150, 210, 80);
          const { x0, x1, y0, y1, soie, ep } = LIME;
          const R = p => { const a = -32 * RAD, c = Math.cos(a), s = Math.sin(a); return T([p[0] * c - p[1] * s, p[0] * s + p[1] * c]); };
          const out = [];
          // la soie, qui s'amincit vers son bout
          const soieP = [[x0, y0 + 6], [x0 - soie, 11], [x0 - soie, 15], [x0, y1 - 6]];
          out.push(h.path(poly(soieP.map(R)), A.blanc), h.path(poly(soieP.map(R)), A.contour));
          // la tranche, à l'ombre, puis le dessus
          const tranche = [[x0, y1], [x1, y1 - 2], [x1, y1 - 2 + ep], [x0, y1 + ep]];
          out.push(h.path(poly(tranche.map(R)), A.ombre), h.path(poly(tranche.map(R)), A.arete));
          const dessus = [[x0, y0], [x1 - 14, y0 + 1], [x1, y0 + 6], [x1, y1 - 2], [x0, y1]];
          out.push(h.path(poly(dessus.map(R)), A.blanc));
          // la taille croisée, coupée au dessus de la lime
          let d = '';
          for (let x = x0 - 30; x < x1 + 30; x += 5) d += M(R([x, y0])) + Lp(R([x + 9, y1])) + ' ';
          for (let x = x0 - 30; x < x1 + 30; x += 8) d += M(R([x + 7, y0])) + Lp(R([x - 3, y1])) + ' ';
          out.push(`<clipPath id="lime-1309"><path d="${poly(dessus.map(R))}" fill="#FFFFFF" stroke="none"/></clipPath>`);
          out.push(`<g clip-path="url(#lime-1309)">${h.path(d, A.fin)}</g>`);
          out.push(h.path(poly(dessus.map(R)), A.contour));
          return out.join('\n');
        },
        renvois: z => {
          const { T } = fenetre(z, -60, -150, 210, 80);
          const R = p => { const a = -32 * RAD, c = Math.cos(a), s = Math.sin(a); return T([p[0] * c - p[1] * s, p[0] * s + p[1] * c]); };
          return [{ n: 2, rond: T([150, 30]), cible: R([150, 26]), texte: 'au lieu de 1 : une vieille lime' }];
        },
      },
      pierre: {
        titre: 'La pierre',
        dessin: z => {
          const { T, k } = fenetre(z, 0, 4, 262, 206);
          const out = [];
          // le caillou cassé : la silhouette en blanc ; le grain roulé, découpé dans le cortex (il s'arrête net sur
          // l'arête) ; la face cassée à l'ombre (elle regarde à droite) et ses ondes, découpées dans la face ; l'arête ;
          // la silhouette par-dessus
          out.push(h.path(poly(SIL_PIERRE.map(T)), A.blanc));
          out.push(`<clipPath id="cortex-1309"><path d="${poly(CORTEX_ZONE.map(T))}" fill="#FFFFFF" stroke="none"/></clipPath>`);
          out.push(`<g clip-path="url(#cortex-1309)">${semis([0, 6, 128, 106], dansPoly(CORTEX_ZONE), Math.round(1130 * k * k), 41, T, 1.4)}</g>`);
          out.push(h.path(poly(FACE_CASSEE.map(T)), A.ombre));
          out.push(`<clipPath id="cassure-1309"><path d="${poly(FACE_CASSEE.map(T))}" fill="#FFFFFF" stroke="none"/></clipPath>`);
          let ondes = '';
          [5, 13, 23, 34, 46, 59].forEach(r => { const pts = []; for (let i = 0; i <= 24; i++) { const a = (-150 + 210 * i / 24) * RAD; pts.push(T([COUP[0] + r * Math.cos(a), COUP[1] + r * Math.sin(a)])); } ondes += lisse(pts) + ' '; });
          out.push(`<g clip-path="url(#cassure-1309)">${h.path(ondes, A.fin)}</g>`);
          out.push(h.path(poly(F_GAUCHE.map(T), false), A.arete));
          out.push(h.path(poly(SIL_PIERRE.map(T)), A.contour));
          // l'essai du verre : la vitre, sa tranche, deux reflets ; la rayure derrière l'éclat
          const ep = [0, 5];
          out.push(h.path(poly([VITRE[2], VITRE[3], add(VITRE[3], ep), add(VITRE[2], ep)].map(T)), A.blanc));
          out.push(h.path(poly([VITRE[3], add(VITRE[3], ep), add(VITRE[2], ep), VITRE[2]].map(T), false), A.arete));
          out.push(h.path(poly(VITRE.map(T)), A.blanc), h.path(poly(VITRE.map(T)), A.arete));
          out.push(h.path(M(T([84, 176])) + Lp(T([100, 166])) + ' ' + M(T([92, 180])) + Lp(T([104, 172])) + ' ' + M(T([222, 160])) + Lp(T([232, 154])), A.fin));
          out.push(h.path(M(T([112, 178])) + Lp(T([128, 175.6])) + Lp(T([142, 172.4])) + Lp(T([156, 170.6])) + Lp(T([170, 167.4])) + Lp(T([176, 166])), A.detail));
          out.push(h.path(poly(ECLAT.map(T)), A.blanc));
          out.push(semis([166, 106, 216, 168], p => dansPoly(ECLAT)(p) && !dansPoly(ECLAT_C)(p), Math.round(700 * k * k), 7, T, 1.4));
          out.push(h.path(poly(ECLAT_C.map(T)), A.ombre));
          out.push(h.path(poly([[198, 108], [196, 138], [176, 166]].map(T), false), A.detail));
          out.push(h.path(poly(ECLAT.map(T)), A.contour));
          out.push(h.geste(M(T([214, 158])) + Lp(T([246, 151]))));
          return out.join('\n');
        },
        renvois: z => {
          const { T } = fenetre(z, 0, 4, 262, 206);
          return [
            { n: 3, rond: T([30, 134]), cible: T([42, 96]), texte: 'silex, chert, quartz ou jaspe de grève' },
            { n: 4, rond: T([176, 30]), cible: T([142, 44]), texte: 'casser pour avoir une arête fraîche et coupante' },
            { n: 5, rond: T([136, 136]), cible: T([150, 171]), texte: 'la pierre doit rayer le verre' },
          ];
        },
      },
      geste: {
        titre: 'Le geste',
        dessin: z => {
          const { T, k } = fenetre(z, ...FG);
          const out = [scene(T, k, 'avant')];
          // le coup : la face du U descend en rasant l'arête
          out.push(h.geste(M(T(add(E, [12, -34]))) + Lp(T(add(E, [12, 120])))));
          return decoupe('geste', z, out.join('\n'));
        },
        renvois: z => {
          const { T } = fenetre(z, ...FG);
          const sA = scenePt('avant');
          return [
            { n: 6, rond: T(add(E, [-150, -150])), cible: T(P(...add([186, 36], mul(PROF, 0.5)))), texte: 'pincer l’amadou au ras de l’arête' },
            { n: 7, rond: T(add(E, [-90, -240])), cible: T(sA([40, U.t1 - 9])), texte: 'passer les doigts dans le U' },
            { n: 8, rond: T(add(E, [80, 90])), cible: T(add(E, [12, 50])), texte: 'frapper vers le bas, en rasant l’arête' },
          ];
        },
      },
      detail: {
        titre: 'Au point de frappe',
        dessin: z => {
          const { T, k } = fenetre(z, ...FD);
          return decoupe('detail', z, scene(T, k, 'apres') + '\n' + paillettes(T, k));
        },
        renvois: z => {
          const { T } = fenetre(z, ...FD);
          return [{ n: 9, rond: T(add(P(...CHUTE), [-96, -56])), cible: T(P(...CHUTE)), texte: 'la paillette brûle en tombant sur l’amadou' }];
        },
      },
    },
  };
};
