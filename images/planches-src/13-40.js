// Planche 13-40. Le ferrocérium, du tri du bois à la flamme. Refaite depuis zéro le 16 octobre 2026
// (règle 12 : JP, sur la version retouchée, « les mains, l'amadou, le tipi, c'est laid en câlisse »).
//
// Six vues, dans l'ordre des gestes du chapitre (étapes 10 à 17) : trier les quatre tas ; monter le tipi,
// l'ouverture face au vent ; faire le nid ; faire l'étincelle (le couteau immobile, la tige tirée) ; refermer et
// souffler ; glisser le nid sous le tipi. Les repères 1 à 18 sont ceux du texte.
//
// Les mains de l'étincelle ne passent plus par mainSimple (jugée laide sur cette planche) : ce sont deux poings
// vus du côté des doigts, dessinés ici au trait égal du style cible (dessin-notice, style-cible.md) : quatre
// doigts repliés en marches, le pouce couché sur l'index, le poignet ouvert. La main qui porte la boule est la
// même construction, ouverte en coupe sous la boule.
// L'amadou est fait de brins : des arcs fins qui tournent autour du creux (le nid) ou de la boule, jamais un
// contour gribouillé. Le tipi est construit : des bâtons droits, tous dressés vers un même sommet et prolongés
// au-delà, qui se croisent en haut ; ceux de derrière sont dessinés d'abord, l'ouverture face au vent est un
// vide franc dans le cercle de base.
// Aucune cote : les calibres (moins de 2 cm, 2 à 5 cm, moins de 15 cm) sont des bornes de tri, dans la légende.

module.exports = (h) => {
  const A = h.a;
  const NOIR = '#1A1A1A';
  const f = v => Math.round(v * 10) / 10;
  const deg = a => a * Math.PI / 180;
  const add = (p, q) => [p[0] + q[0], p[1] + q[1]];
  const mul = (p, k) => [p[0] * k, p[1] * k];
  const gen = s => { let g = s; return () => (g = (g * 16807) % 2147483647) / 2147483647; };
  const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const T1 = (w) => `fill="none" stroke="${NOIR}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"`;

  // Courbe lisse (Catmull-Rom) par tous les points.
  const lisse = (pts, ferme = false) => {
    const n = pts.length, p = i => ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
    let d = `M ${f(pts[0][0])} ${f(pts[0][1])}`;
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = p(i - 1), p1 = p(i), p2 = p(i + 1), p3 = p(i + 2);
      d += ` C ${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
    }
    return ferme ? d + ' Z' : d;
  };
  const arc = (cx, cy, rx, ry, a0, a1, n = 8) => {
    const o = [];
    for (let i = 0; i <= n; i++) { const a = deg(a0 + (a1 - a0) * i / n); o.push([cx + rx * Math.cos(a), cy + ry * Math.sin(a)]); }
    return o;
  };

  // ── Le poing, vu du côté des doigts ─────────────────────────────────────────────────────────────────
  // Repère local en mm : le manche suit l'axe y (le pouce du côté −y), le poignet vers +x. T : local → vue.
  const PEAU = T1(1.4), PEAU_IN = T1(0.7);
  const phalange = (xL, xR, c, r, rt, rot = 0) => {
    const k = r * 0.82, pts = [], m = (xL + xR) / 2;
    pts.push(...arc(xR - rt, c, rt, rt, -90, 90, 10).slice(1, -1));
    pts.push([xR - rt - 4, c + rt + (r - rt) * 0.3], [m, c + r * 1.02], [xL + k + 2, c + r]);
    pts.push(...arc(xL + k, c + r - k, k, k, 90, 180, 6).slice(1, -1));
    pts.push([xL, c + (r - k) / 2], [xL, c - (r - k) / 2]);
    pts.push(...arc(xL + k, c - r + k, k, k, 180, 270, 6).slice(1, -1));
    pts.push([xL + k + 2, c - r], [m, c - r * 1.02], [xR - rt - 4, c - rt - (r - rt) * 0.3]);
    const a = deg(rot), ca = Math.cos(a), sa = Math.sin(a);
    return pts.map(([x, y]) => [xL + (x - xL) * ca - (y - c) * sa, c + (x - xL) * sa + (y - c) * ca]);
  };
  const poing = (T, avantbras = 90) => {
    const P = pts => pts.map(T);
    const L = 100 + avantbras;
    const dessous = [[L, 33], [100, 30], [82, 31], [62, 38], [34, 46], [8, 47], [-12, 44]];
    const fond = [[-14, -38], [10, -44], [40, -45]];
    // le dessus : de l'avant-bras au bout du pouce, d'un seul trait ; puis le dessous du pouce qui rentre dans la paume
    const dessus = [[L, -31], [100, -29], [82, -31.5], [62, -40], [46, -47], [26, -48], [10, -46],
      ...arc(4, -37, 9.2, 9, -90, -255, 8).slice(1), [13, -28.5], [27, -28], [42, -24]];
    const derriere = [
      `<path d="${lisse(P([...fond, ...dessus.slice(0, 4).reverse(), ...dessous]), true)}" fill="#FFFFFF" stroke="none"/>`,
      `<path d="${lisse(P(dessous))}" ${PEAU}/>`,
    ].join('\n');
    const doigts = [phalange(-25, 9, 34.5, 8.5, 7.5, 4), phalange(-31, 15, 16, 10, 8.5, 1.5), phalange(-33, 18, -4, 11, 9.5, 0), phalange(-30, 19, -25, 10.5, 9, -3)];
    const devant = [
      ...doigts.map(d => `<path d="${lisse(P(d), true)}" fill="#FFFFFF" ${PEAU.replace('fill="none" ', '')}/>`),
      `<path d="${lisse(P([...dessus, [56, -30], [70, -34]]), true)}" fill="#FFFFFF" stroke="none"/>`,
      `<path d="${lisse(P(dessus))}" ${PEAU}/>`,
    ].join('\n');
    return { derriere, devant, articulation: T([-33, -4]), pouce: T([-5, -37]) };
  };
  // Repère d'un poing posé : c le point du manche au creux de la main, X la direction de l'avant-bras, Y la
  // direction du manche vers l'auriculaire (unitaires), e l'échelle (unités de vue par mm).
  // Ce qui sort d'une vue (les avant-bras) est coupé net par son bord.
  const coupe = (id, z, svg) => `<clipPath id="c1340-${id}"><rect x="0" y="0" width="${z.l}" height="${z.h}"/></clipPath>\n<g clip-path="url(#c1340-${id})">\n${svg}\n</g>`;
  const repere = (c, X, Y, e) => ([x, y]) => [c[0] + e * (x * X[0] + y * Y[0]), c[1] + e * (x * X[1] + y * Y[1])];

  // ── L'amadou : des brins ────────────────────────────────────────────────────────────────────────────
  // Le nid vu un peu d'en haut : des brins qui tournent autour du creux, une paroi qui se voit sur le devant,
  // des brins libres qui débordent. cx, cy : le centre du creux ; R, Ry : le bord extérieur ; ep : la hauteur.
  const nid = (cx, cy, R, Ry, ep, graine, { creux = 0.42, poudre = true } = {}) => {
    const r = gen(graine), out = [];
    const ri = R * creux, riy = Ry * creux;
    // le fond blanc : le dessus (ellipse) et la paroi du devant
    out.push(h.path(`M ${f(cx - R)} ${f(cy)} A ${f(R)} ${f(Ry)} 0 0 1 ${f(cx + R)} ${f(cy)} L ${f(cx + R * 0.97)} ${f(cy + ep * 0.7)} A ${f(R * 0.97)} ${f(Ry + ep * 0.4)} 0 0 1 ${f(cx - R * 0.97)} ${f(cy + ep * 0.7)} Z`, A.blanc));
    let fin = '', moyen = '';
    // les brins du dessus : des arcs autour du creux, du bord du creux au bord extérieur
    const nb = Math.round(R * 1.3);
    for (let i = 0; i < nb; i++) {
      const t = Math.pow(r(), 0.8), rx = ri + (R - ri) * t, ry = riy + (Ry - riy) * t;
      const a0 = r() * 360, span = 35 + r() * 70, n = 6, pts = [];
      for (let k = 0; k <= n; k++) {
        const a = deg(a0 + span * k / n), w = 1 + (r() - 0.5) * 0.06;
        pts.push([cx + Math.cos(a) * rx * w, cy + Math.sin(a) * ry * w]);
      }
      const d = lisse(pts);
      if (i % 4 === 0) moyen += d + ' '; else fin += d + ' ';
    }
    // la paroi du devant : des brins presque horizontaux qui suivent la courbe
    for (let i = 0; i < Math.round(R * 0.5); i++) {
      const s = r() * ep * 0.85, a0 = 15 + r() * 120, span = 25 + r() * 40, pts = [];
      for (let k = 0; k <= 5; k++) {
        const a = deg(a0 + span * k / 5);
        pts.push([cx + Math.cos(a) * R * 0.985, cy + Math.sin(a) * (Ry + s * 0.25) + s]);
      }
      fin += lisse(pts) + ' ';
    }
    // les brins libres qui débordent du bord
    for (let i = 0; i < Math.round(R * 0.32); i++) {
      const a = deg(r() * 360), x0 = cx + Math.cos(a) * R * 0.92, y0 = cy + Math.sin(a) * Ry * 0.92 + (Math.sin(a) > 0 ? ep * 0.5 : 0);
      const L = 5 + r() * 9, b = a + deg((r() - 0.5) * 70);
      fin += `M ${f(x0)} ${f(y0)} q ${f(Math.cos(b) * L * 0.5 + (r() - 0.5) * 3)} ${f(Math.sin(b) * L * 0.5 * Ry / R)} ${f(Math.cos(b) * L)} ${f(Math.sin(b) * L * Ry / R + (r() - 0.5) * 2)} `;
    }
    out.push(h.path(fin, T1(0.5)), h.path(moyen, T1(0.7)));
    // le creux : son bord, plus dense, et la poudre au fond
    let bord = '';
    for (let k = 0; k < 5; k++) {
      const a0 = k * 72 + r() * 20, pts = arc(cx, cy, ri * (1.02 + r() * 0.06), riy * (1.02 + r() * 0.06), a0, a0 + 80 + r() * 30, 6);
      bord += lisse(pts) + ' ';
    }
    out.push(h.path(bord, T1(0.7)));
    if (poudre) {
      let pts = '';
      for (let i = 0; i < 26; i++) {
        const a = r() * 2 * Math.PI, t = Math.sqrt(r()) * 0.6;
        pts += `<circle cx="${f(cx + Math.cos(a) * ri * t)}" cy="${f(cy + Math.sin(a) * riy * t + riy * 0.15)}" r="${f(0.55 + r() * 0.45)}" ${A.plein}/>`;
      }
      out.push(pts);
    }
    return out.join('\n');
  };
  // La boule refermée : des brins enroulés comme une pelote lâche, quelques-uns qui dépassent.
  const boule = (cx, cy, R, graine) => {
    const r = gen(graine), out = [h.cercle(cx, cy, R * 0.97, A.blanc)];
    let fin = '', moyen = '';
    for (let i = 0; i < Math.round(R * 1.6); i++) {
      const th = r() * Math.PI, rx = R * (0.55 + r() * 0.42), ry = R * (0.12 + r() * 0.5);
      const a0 = r() * 360, span = 60 + r() * 110, pts = [];
      for (let k = 0; k <= 8; k++) {
        const a = deg(a0 + span * k / 8), x = Math.cos(a) * rx, y = Math.sin(a) * ry;
        pts.push([cx + x * Math.cos(th) - y * Math.sin(th), cy + x * Math.sin(th) + y * Math.cos(th)]);
      }
      if (i % 4 === 0) moyen += lisse(pts) + ' '; else fin += lisse(pts) + ' ';
    }
    // le tour : des arcs courts au bord, qui ne se ferment pas en un seul contour
    for (let k = 0; k < 9; k++) {
      const a0 = k * 40 + r() * 15, rr = R * (0.96 + r() * 0.06);
      moyen += lisse(arc(cx, cy, rr, rr, a0, a0 + 34 + r() * 14, 5)) + ' ';
    }
    for (let i = 0; i < 12; i++) {
      const a = deg(r() * 360), L = 4 + r() * 7, b = a + deg((r() - 0.5) * 80);
      const x0 = cx + Math.cos(a) * R * 0.95, y0 = cy + Math.sin(a) * R * 0.95;
      fin += `M ${f(x0)} ${f(y0)} q ${f(Math.cos(b) * L * 0.5 + (r() - 0.5) * 3)} ${f(Math.sin(b) * L * 0.5 + (r() - 0.5) * 3)} ${f(Math.cos(b) * L)} ${f(Math.sin(b) * L)} `;
    }
    out.push(h.path(fin, T1(0.5)), h.path(moyen, T1(0.7)));
    return out.join('\n');
  };
  // Une touffe d'amadou posée (le premier tas) : un nid plat sans creux marqué.
  const touffe = (cx, cyS, R, graine) => nid(cx, cyS - R * 0.28, R, R * 0.32, R * 0.28, graine, { creux: 0.2, poudre: false });

  // ── Le bois ─────────────────────────────────────────────────────────────────────────────────────────
  // Un bâton droit de a à b, de rayon ra au pied et rb en haut ; le bout coupé en b se voit (une ellipse).
  const baton = (a, b, ra, rb, { at = A.detail, bout = true, gris = false } = {}) => {
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]), u = [(b[0] - a[0]) / L, (b[1] - a[1]) / L], n = [-u[1], u[0]];
    const pts = [add(a, mul(n, ra)), add(b, mul(n, rb)), add(b, mul(n, -rb)), add(a, mul(n, -ra))];
    const out = [h.chemin(pts, gris ? A.loin : A.blanc, true)];
    out.push(h.ligne(...pts[0], ...pts[1], at), h.ligne(...pts[3], ...pts[2], at));
    if (bout) {
      const ang = Math.atan2(n[1], n[0]) * 180 / Math.PI;
      out.push(`<ellipse cx="${f(b[0])}" cy="${f(b[1])}" rx="${f(rb)}" ry="${f(rb * 0.45)}" transform="rotate(${f(ang)} ${f(b[0])} ${f(b[1])})" ${gris ? A.loin.replace('stroke="none"', '') : 'fill="#FFFFFF"'} ${at.replace('fill="none" ', '')}/>`);
    }
    return out.join('\n');
  };
  // Une pile de bois rond vue de trois quarts : les bouts vers nous, le fût qui fuit vers le haut à droite.
  const FUITE = [0.86, -0.5];
  const pile = (x0, yS, r, rangs, long, graine, { cernes = false } = {}) => {
    const rnd = gen(graine), items = [];
    rangs.forEach((nb, j) => {
      const xg = x0 + (rangs[0] - nb) * r + r;
      for (let i = 0; i < nb; i++) items.push({ cx: xg + i * 2 * r + (rnd() - 0.5) * r * 0.15, cy: yS - r - j * r * 1.72, r: r * (0.9 + rnd() * 0.18), l: long * (0.88 + rnd() * 0.2) });
    });
    // les fûts, du rang du haut (le plus loin) au rang du bas, puis tous les bouts
    const futs = [], bouts = [];
    items.slice().reverse().forEach(it => {
      const b = [it.cx + FUITE[0] * it.l, it.cy + FUITE[1] * it.l];
      const n = [-FUITE[1], FUITE[0]];
      const p = [add([it.cx, it.cy], mul(n, it.r)), add(b, mul(n, it.r)), add(b, mul(n, -it.r)), add([it.cx, it.cy], mul(n, -it.r))];
      futs.push(h.chemin(p, A.blanc, true), h.ligne(...p[0], ...p[1], it.r > 6 ? A.arete : A.detail), h.ligne(...p[3], ...p[2], it.r > 6 ? A.arete : A.detail));
      futs.push(h.path(`M ${f(p[1][0])} ${f(p[1][1])} A ${f(it.r)} ${f(it.r)} 0 0 0 ${f(p[2][0])} ${f(p[2][1])}`, it.r > 6 ? A.arete : A.detail));
    });
    items.forEach(it => {
      bouts.push(h.cercle(it.cx, it.cy, it.r, blanc(it.r > 6 ? A.arete : A.detail)));
      if (cernes) {
        bouts.push(h.cercle(it.cx, it.cy, it.r - 2.6, T1(0.5)), h.cercle(it.cx + 0.6, it.cy - 0.4, it.r * 0.5, T1(0.5)), h.cercle(it.cx + 0.9, it.cy - 0.6, 1.2, A.plein));
      } else if (it.r > 3) bouts.push(h.cercle(it.cx + 0.3, it.cy - 0.2, it.r * 0.3, T1(0.5)));
    });
    return { svg: futs.concat(bouts).join('\n'), items };
  };

  // ── Le tipi ─────────────────────────────────────────────────────────────────────────────────────────
  // Des bâtons droits dressés autour d'un cercle de base, tous vers un même sommet et prolongés au-delà : ils
  // se croisent en haut. L'ouverture est un vide dans le cercle, du côté du vent (devant à gauche).
  const tipi = (cx, yB, rx, ry, haut, graine, { ouverture = [118, 178], N = 13, ra = 2.6, rb = 1.9, dedans = '' } = {}) => {
    const r = gen(graine), S = [cx + 2, yB - haut];
    const batons = [];
    for (let i = 0; i < N; i++) {
      const phi = i * 360 / N + 8 + (r() - 0.5) * 8;
      const p = ((phi % 360) + 360) % 360;
      if (p > ouverture[0] && p < ouverture[1]) continue;
      const b = [cx + Math.cos(deg(p)) * rx, yB + Math.sin(deg(p)) * ry];
      const s = [S[0] + (r() - 0.5) * 6, S[1] + (r() - 0.5) * 4];
      const pro = 0.14 + r() * 0.14;
      const t = [b[0] + (s[0] - b[0]) * (1 + pro), b[1] + (s[1] - b[1]) * (1 + pro)];
      batons.push({ p, avant: Math.sin(deg(p)) > 0.05, b, t });
    }
    const derriere = batons.filter(b => !b.avant).map(b => baton(b.b, b.t, ra, rb, { at: A.detail }));
    const devant = batons.filter(b => b.avant).sort((a, b) => a.b[1] - b.b[1]).map(b => baton(b.b, b.t, ra, rb, { at: A.arete }));
    return { svg: [...derriere, dedans, ...devant].join('\n'), sommet: S, batons };
  };

  // ── La flamme ───────────────────────────────────────────────────────────────────────────────────────
  const langue = (x, yB, l, ht, pench = 0) => {
    const d = `M ${f(x - l / 2)} ${f(yB)} C ${f(x - l / 2 - l * 0.12)} ${f(yB - ht * 0.38)} ${f(x + pench * 0.2 - l * 0.38)} ${f(yB - ht * 0.6)} ${f(x + pench)} ${f(yB - ht)} `
      + `C ${f(x + pench * 0.5 + l * 0.12)} ${f(yB - ht * 0.66)} ${f(x + l / 2 + l * 0.16)} ${f(yB - ht * 0.42)} ${f(x + l / 2)} ${f(yB)} Z`;
    const di = `M ${f(x - l * 0.2)} ${f(yB - ht * 0.08)} C ${f(x - l * 0.28)} ${f(yB - ht * 0.3)} ${f(x + pench * 0.2 - l * 0.12)} ${f(yB - ht * 0.42)} ${f(x + pench * 0.45)} ${f(yB - ht * 0.58)} `
      + `C ${f(x + pench * 0.3 + l * 0.12)} ${f(yB - ht * 0.38)} ${f(x + l * 0.24)} ${f(yB - ht * 0.24)} ${f(x + l * 0.18)} ${f(yB - ht * 0.06)}`;
    return [h.path(d, blanc(A.arete)), h.path(di, A.detail)].join('\n');
  };
  const flammes = (x, yB, l, ht) => [
    langue(x - l * 0.42, yB, l * 0.55, ht * 0.55, -l * 0.12),
    langue(x + l * 0.4, yB, l * 0.55, ht * 0.62, l * 0.14),
    langue(x, yB, l * 0.72, ht, -l * 0.05),
  ].join('\n');

  // ═══ Les vues ═══════════════════════════════════════════════════════════════════════════════════════

  // Vue 1 : les quatre tas, du plus fin au plus gros, sur une même ligne de sol.
  const tas = z => {
    const yS = z.h - 10, e = 0.2;          // unités de vue par mm
    const x1 = 6, x2 = x1 + 74, x3 = x2 + 70, x4 = x3 + 84;
    return { yS, e, x1, x2, x3, x4,
      fin: pile(x2, yS, 2.2, [6, 5, 4, 3, 2], 44, 5),
      moy: pile(x3, yS, 5, [4, 3, 2], 50, 7),
      gros: pile(x4, yS, 13, [3, 2], 58, 9, { cernes: true }) };
  };

  // Vue 4 : l'étincelle. Tout en mm × e.
  const TH = deg(52);
  const u = [Math.cos(TH), -Math.sin(TH)];            // le long de la tige, de la pointe vers le manche
  const nT = [Math.sin(TH), Math.cos(TH)];            // perpendiculaire, vers le bas à droite
  const etincelle = z => {
    const e = Math.min(1, (z.h - 20) / 270, z.l / 400);
    const G = z.h - 6;
    const T = [Math.round(z.l * 0.36), G - 58 * e];  // la pointe de la tige
    const nidC = [T[0] - 22 * e, G - 34 * e];        // le centre du creux, sous la pointe
    const C = add(T, mul(u, 26 * e));                // le dos du couteau sur la tige
    return { e, G, T, nidC, C };
  };


  // Vue 5 : la tête de profil (le visage à droite), la boule à une longueur d'avant-bras devant la bouche.
  const souffler = z => {
    const e = Math.min(0.6, (z.h - 8) / 290);
    const tete = h.formes.teteSimple({ x: 52 * e + 8, y: z.h - 150 * e, echelle: e, bouche: 'ouverte', ouverture: 0.25, cou: 70 });
    const L0 = tete.bouche;
    const R = 40 * e, B = [L0[0] + 255 * e + R * 0.4, L0[1] + 6 * e];
    return { e, tete, B, R };
  };
  // La main qui porte la boule, vue de côté : la paume dessous, les doigts qui remontent derrière la boule,
  // le pouce devant. Repère local en mm : origine au centre de la boule, y vers le bas.
  const main = ({ e, B, R }) => {
    const k = R / 40 / e;                               // la boule fait 80 mm ; tout le reste suit
    const P = pts => pts.map(([x, y]) => [B[0] + x * e * k, B[1] + y * e * k]);
    const ax = [-0.62, 0.78], pe = [0.78, 0.62];         // l'avant-bras vers le bas à gauche ; sa normale
    const W = [-58, 46], lb = 160;
    const hautW = add(W, mul(pe, -26)), basW = add(W, mul(pe, 26));
    const dos = [add(hautW, mul(ax, lb)), hautW, [-64, 14], [-52, 30], [-26, 50], [4, 56], [30, 50], [48, 34],
      [57, 12], [58, -8], ...arc(50, -14, 8.5, 8.5, -10, -170, 7).slice(1), [41, -2], [40, 12], [32, 28], [16, 38], [-6, 40], [-30, 34],
      basW, add(basW, mul(ax, lb))];
    // le côté de l'avant-bras et de la paume (le contour ouvert), puis l'aplat
    const contour = [add(basW, mul(ax, lb)), basW, [-26, 50], [4, 56], [30, 50], [48, 34], [57, 12], [58, -8], ...arc(50, -14, 8.5, 8.5, -10, -175, 7).slice(1), [41.5, -4]];
    const fond = [add(hautW, mul(ax, lb)), hautW, [-56, 8], [-30, 26], [0, 38], [30, 26], [41.5, -4], ...contour.slice().reverse()];
    const dosSvg = [h.path(lisse(P(fond), true), A.blanc), h.path(lisse(P(contour)), PEAU),
      h.path(lisse(P([[52, 18], [48, 32], [40, 42]])), PEAU_IN)].join('\n');
    // le pouce, devant la boule : de la base du poignet, le long du bas de la boule, le bout vers l'avant
    const pouce = [add(hautW, mul(ax, lb)), hautW, [-62, 10], [-56, -2], [-46, -10], ...arc(-40, -8, 7, 7, -150, 40, 8).slice(1), [-36, 2], [-38, 14], [-34, 28], [-20, 40]];
    const pouceSvg = [h.path(lisse(P([...pouce, [-30, 46], basW, add(basW, mul(ax, lb))]), true), A.blanc),
      h.path(lisse(P(pouce)), PEAU)].join('\n');
    return { dos: dosSvg, pouce: pouceSvg };
  };
  // La fumée : deux bords qui s'écartent en ondulant, une volute au bout.
  const fumee = (x, y, l0, z) => {
    const pts = (s) => { const o = []; for (let yy = y; yy >= 10; yy -= 6) { const m = (y - yy); o.push([x + s * (l0 + m * 0.2) + 6 * Math.sin(m / 16), yy]); } return o; };
    const a = pts(-1), b = pts(1);
    return [h.path(lisse(a), A.detail), h.path(lisse(b), A.detail),
      h.path(lisse(pts(0.15).map(([px, py], i) => [px + 3 * Math.sin(i / 2), py]).slice(2)), A.fin)].join('\n');
  };
  // Vue 6 : le tipi, plus grand, le nid en flammes à l'intérieur.
  const glisser = z => {
    const cx = z.l * 0.5, yB = z.h - 20, ht = Math.min(130, z.h - 26);
    return { cx, yB, rx: 54, ry: 13, ht, nx: cx - 6 };
  };

  return {
    ref: '13-40',
    titre: 'Le ferrocérium, du tri du bois à la flamme',
    desc: 'Six vues dans l’ordre des gestes. Les quatre tas triés côte à côte : une touffe d’amadou, une botte de petit bois de moins de 2 cm, une pile de bois de 2 à 5 cm, une pile de bûches de moins de 15 cm. Le tipi : des bâtons droits dressés en cône lâche, qui se croisent au sommet, avec une ouverture du côté d’où vient le vent. Le nid vu d’en haut : des fibres écharpées qui tournent autour d’un creux, de la poudre de tige au fond. L’étincelle : la pointe de la tige posée au bord du nid, le dos du couteau appuyé en travers de la tige et tenu immobile dans un poing, la tige tirée vers soi par l’autre poing, la gerbe qui tombe dans le creux. Puis la boule refermée, tenue par-dessous à une longueur d’avant-bras du visage, soufflée en continu, la fumée qui monte. Enfin le nid en flammes glissé sous le tipi par l’ouverture, le bois de 2 à 5 cm qui attend à côté.',
    format: 'pleine',
    disposition: [['tas', 'tipi'], ['nid', 'etincelle'], ['souffler', 'glisser']],
    hauteurs: [0.82, 1.42, 1.08],
    largeurs: [[1.45, 1], [0.78, 1.42], [1.12, 1]],
    vues: {
      // ── 1. Trier ───────────────────────────────────────────────────────────────────────────────────
      tas: {
        titre: 'Trier en quatre tas',
        dessin: z => {
          const t = tas(z), out = [];
          out.push(h.ligne(0, t.yS, z.l, t.yS, A.arete));
          out.push(touffe(t.x1 + 26, t.yS, 26, 11));
          out.push(t.fin.svg, t.moy.svg, t.gros.svg);
          return out.join('\n');
        },
        renvois: z => {
          const t = tas(z), y = 14;
          const haut = p => p.items[p.items.length - 1];
          const hf = haut(t.fin), hm = haut(t.moy), hg = haut(t.gros);
          return [
            { n: 1, rond: [t.x1 + 14, y], cible: [t.x1 + 22, t.yS - 15], texte: 'amadou fin' },
            { n: 2, rond: [t.x2 + 16, y], cible: [hf.cx + 1, hf.cy - hf.r - 1], texte: 'bois de moins de 2 cm' },
            { n: 3, rond: [t.x3 + 18, y], cible: [hm.cx + 2, hm.cy - hm.r - 1], texte: 'bois de 2 à 5 cm' },
            { n: 4, rond: [t.x4 + 22, y], cible: [hg.cx - 2, hg.cy - hg.r - 1], texte: 'bûches de moins de 15 cm' },
          ];
        },
      },
      // ── 2. Le tipi ─────────────────────────────────────────────────────────────────────────────────
      tipi: {
        titre: 'Monter le tipi',
        dessin: z => {
          const cx = z.l * 0.6, yB = z.h - 18, out = [];
          out.push(h.ligne(0, yB + 12, z.l, yB + 12, A.arete));
                    out.push(tipi(cx, yB, 54, 13, Math.min(92, z.h - 22), 13).svg);
          // le vent, qui entrera par l'ouverture
          out.push(h.fleche(`M 6 ${f(yB - 26)} L ${f(cx - 54)} ${f(yB - 6)}`, A.detail));
          out.push(h.fleche(`M 6 ${f(yB - 2)} L ${f(cx - 56)} ${f(yB + 4)}`, A.detail));
          return out.join('\n');
        },
        renvois: z => {
          const cx = z.l * 0.6, yB = z.h - 18, ht = Math.min(92, z.h - 22);
          return [
            { n: 5, rond: [z.l - 14, yB - ht * 0.55], cible: [cx + 23, yB - ht * 0.5], texte: 'cône lâche, du vide entre' },
            { n: 6, rond: [16, yB - 50], cible: [cx - 34, yB - 14], texte: 'ouverture du côté du vent' },
          ];
        },
      },
      // ── 3. Le nid ──────────────────────────────────────────────────────────────────────────────────
      nid: {
        titre: 'Faire le nid',
        dessin: z => {
          const cx = z.l / 2, cy = z.h * 0.52, R = Math.min(z.l * 0.44, 96);
          return [h.ligne(0, cy + R * 0.5 + R * 0.24 + 2, z.l, cy + R * 0.5 + R * 0.24 + 2, A.arete),
            nid(cx, cy, R, R * 0.5, R * 0.24, 3)].join('\n');
        },
        renvois: z => {
          const cx = z.l / 2, cy = z.h * 0.52, R = Math.min(z.l * 0.44, 96);
          return [
            { n: 7, rond: [16, cy - R * 0.5 - 40], cible: [cx - R * 0.72, cy - R * 0.18], texte: 'fibres lâches : le jour passe' },
            { n: 8, rond: [z.l - 16, cy - R * 0.5 - 40], cible: [cx + 3, cy + 2], texte: 'poudre de tige dans le creux' },
          ];
        },
      },
      // ── 4. L'étincelle ─────────────────────────────────────────────────────────────────────────────
      etincelle: {
        titre: 'Tirer la tige, le couteau immobile',
        dessin: z => {
          const g = etincelle(z), { e, G, T, nidC, C } = g, out = [];
          out.push(h.ligne(0, G, z.l, G, A.arete));
          out.push(nid(nidC[0], nidC[1], 58 * e, 21 * e, 13 * e, 4));
          // la tige : 100 mm de métal, 62 mm de manche ; le bout arrondi
          const P = (s, t) => add(add(T, mul(u, s * e)), mul(nT, t * e));
          const metal = h.path(`M ${f(P(0, -5)[0])} ${f(P(0, -5)[1])} L ${f(P(100, -5)[0])} ${f(P(100, -5)[1])} L ${f(P(100, 5)[0])} ${f(P(100, 5)[1])} L ${f(P(0, 5)[0])} ${f(P(0, 5)[1])} Q ${f(P(-4, 0)[0])} ${f(P(-4, 0)[1])} ${f(P(0, -5)[0])} ${f(P(0, -5)[1])} Z`, A.hachure('metal', 'arete'));
          const manche = h.path(lisse([P(98, -9), P(160, -9.5), P(170, -7), P(172, 0), P(170, 7), P(160, 9.5), P(98, 9)]) + ' Z', A.hachure('bois', 'arete'));
          // le poing de la tige : X vers le bas à droite (l'avant-bras), Y le long de la tige vers le bout du manche
          const pT = poing(repere(P(128, 0), nT, u, e), 120);
          // le couteau : le manche part du contact vers le haut à gauche, la lame croise la tige
          const kd = [-nT[0], -nT[1]];                          // vers le manche du couteau
          const Q = (s, t) => add(add(C, mul(kd, s * e)), mul(u, t * e));   // s le long du couteau, t vers le manche de la tige
          // la lame : le dos (t = 0) sur la tige, le tranchant vers la pointe de la tige (t négatif)
          const lame = h.path(`M ${f(Q(62, 0)[0])} ${f(Q(62, 0)[1])} L ${f(Q(-18, 0)[0])} ${f(Q(-18, 0)[1])} Q ${f(Q(-30, -1)[0])} ${f(Q(-30, -1)[1])} ${f(Q(-36, -5)[0])} ${f(Q(-36, -5)[1])} `
            + `C ${f(Q(-26, -16)[0])} ${f(Q(-26, -16)[1])} ${f(Q(-8, -21)[0])} ${f(Q(-8, -21)[1])} ${f(Q(12, -21)[0])} ${f(Q(12, -21)[1])} L ${f(Q(62, -21)[0])} ${f(Q(62, -21)[1])} Z`, blanc(A.arete));
          const biseau = h.path(`M ${f(Q(60, -12)[0])} ${f(Q(60, -12)[1])} L ${f(Q(8, -12)[0])} ${f(Q(8, -12)[1])} Q ${f(Q(-22, -11)[0])} ${f(Q(-22, -11)[1])} ${f(Q(-34, -6)[0])} ${f(Q(-34, -6)[1])}`, A.fin);
          const dos = h.chemin([Q(-17, 0), Q(62, 0)], A.contour);
          const garde = h.path(lisse([Q(62, 3), Q(68, 3), Q(68, -24), Q(62, -24)]) + ' Z', blanc(A.arete));
          const mancheK = h.path(lisse([Q(68, 1), Q(110, 2), Q(160, 1.5), Q(170, -4), Q(170, -18), Q(160, -23), Q(110, -24), Q(68, -22)], true), A.hachure('bois', 'arete'));
          const pK = poing(repere(Q(118, -11), u, kd, e), 160);
          // la gerbe : du dos du couteau dans le creux
          const r = gen(21);
          let gerbe = '', etoiles = '';
          const S = add(C, mul(u, -2 * e));
          for (let i = 0; i < 9; i++) {
            const cible = [nidC[0] + (i - 4) * 5.2 * e + (r() - 0.5) * 3, nidC[1] - 2 + (r() - 0.5) * 4 * e];
            const ctrl = add(add(S, mul(u, -30 * e)), mul(nT, (i - 4) * 7 * e - 8 * e));
            const q = t => [(1 - t) ** 2 * S[0] + 2 * t * (1 - t) * ctrl[0] + t * t * cible[0], (1 - t) ** 2 * S[1] + 2 * t * (1 - t) * ctrl[1] + t * t * cible[1]];
            for (let k = 0; k < 6; k++) {
              const t0 = 0.12 + k * 0.15 + r() * 0.03, p0 = q(t0), p1 = q(Math.min(1, t0 + 0.07));
              gerbe += `M ${f(p0[0])} ${f(p0[1])} L ${f(p1[0])} ${f(p1[1])} `;
            }
            const p = q(1);
            etoiles += h.cercle(p[0], p[1], 1, A.plein);
          }
          let eclat = '';
          for (let k = 0; k < 6; k++) {
            const a = deg(150 + k * 22), d = [Math.cos(a), Math.sin(a)];
            eclat += `M ${f(C[0] + d[0] * 6 * e)} ${f(C[1] + d[1] * 6 * e)} L ${f(C[0] + d[0] * (11 + (k % 2) * 5) * e)} ${f(C[1] + d[1] * (11 + (k % 2) * 5) * e)} `;
          }
          // l'ordre : les avant-bras et les paumes ; la tige ; le manche de la tige ; le poing de la tige ;
          // la gerbe ; la lame, le manche du couteau, son poing
          out.push(pT.derriere, metal, manche, pT.devant);
          out.push(h.path(gerbe, A.detail), etoiles, h.path(eclat, A.detail));
          out.push(pK.derriere, lame, biseau, dos, garde, mancheK, pK.devant);
          // le geste : la tige tirée vers soi, le long de son axe
          out.push(h.geste(`M ${f(P(178, 0)[0])} ${f(P(178, 0)[1])} L ${f(P(228, 0)[0])} ${f(P(228, 0)[1])}`));
          // le point à contrôler : le dos du couteau, qui ne bouge pas
          out.push(h.controle(C[0], C[1], 10 * e + 3));
          return coupe('etincelle', z, out.join('\n'));
        },
        renvois: z => {
          const g = etincelle(z), { e, G, T, nidC, C } = g;
          const P = (s, t) => add(add(T, mul(u, s * e)), mul(nT, t * e));
          return [
            { n: 9, rond: [T[0] - 70 * e, T[1] - 60 * e], cible: add(T, [-3 * e, 1]), texte: 'pointe à un doigt du nid' },
            { n: 10, rond: [C[0] + 54 * e, C[1] + 34 * e], cible: add(C, [9 * e + 3, 4]), texte: 'cercle : couteau immobile' },
            { n: 11, rond: [P(212, 30)[0], P(212, 30)[1]], cible: P(208, 1.5), texte: 'flèche : tige tirée vers soi' },
            { n: 12, rond: [Math.max(16, nidC[0] - 70 * e), nidC[1] - 2], cible: [nidC[0] - 20 * e, nidC[1] - 2], texte: 'la gerbe tombe dans le creux' },
          ];
        },
      },
      // ── 5. Souffler ────────────────────────────────────────────────────────────────────────────────
      souffler: {
        titre: 'Refermer et souffler',
        dessin: z => {
          const s = souffler(z), { e, B, R, tete } = s, out = [];
          out.push(main(s).dos);
          out.push(boule(B[0], B[1], R, 8));
          out.push(main(s).pouce);
          out.push(String(tete));
          // la fumée : un filet mince au-dessus de la boule, qui s'épaissit en montant
          out.push(fumee(B[0] + R * 0.15, B[1] - R * 0.92, 4, z));
          // le souffle, en continu, de la bouche à la boule
          const L0 = tete.bouche;
          out.push(h.fleche(`M ${f(L0[0] + 8)} ${f(L0[1] - 3)} L ${f(B[0] - R - 8)} ${f(B[1] - R * 0.3)}`, A.cache));
          out.push(h.fleche(`M ${f(L0[0] + 8)} ${f(L0[1] + 4)} L ${f(B[0] - R - 8)} ${f(B[1] + R * 0.05)}`, A.cache));
          return coupe('souffler', z, out.join('\n'));
        },
        renvois: z => {
          const s = souffler(z), { B, R, tete } = s, L0 = tete.bouche;
          const mx = (L0[0] + B[0] - R) / 2;
          return [
            { n: 13, rond: [z.l - 14, B[1] + R + 4], cible: [B[0] + R * 0.6, B[1] - R * 0.3], texte: 'en boule, sans serrer' },
            { n: 14, rond: [mx, z.h - 14], cible: [mx, L0[1] + 12], texte: 'à un avant-bras du visage' },
            { n: 15, rond: [mx - 6, L0[1] - 40], cible: [mx - 6, L0[1] - 6], texte: 'souffler sans à-coups' },
            { n: 16, rond: [z.l - 14, 40], cible: [B[0] + R * 0.15 + 14, 22], texte: 'fumée mince, puis épaisse' },
          ];
        },
      },
      // ── 6. Glisser ─────────────────────────────────────────────────────────────────────────────────
      glisser: {
        titre: 'Glisser le nid sous le tipi',
        dessin: z => {
          const g = glisser(z), out = [];
          out.push(h.ligne(0, g.yB + 12, z.l, g.yB + 12, A.arete));
          const dedans = [nid(g.nx, g.yB + 2, 26, 8, 6, 17, { creux: 0.3, poudre: false }), flammes(g.nx + 2, g.yB, 30, g.ht * 0.62)].join('\n');
          out.push(tipi(g.cx, g.yB, g.rx, g.ry, g.ht, 13, { dedans }).svg);
          out.push(h.geste(`M ${f(g.nx - 98)} ${f(g.yB + 8)} L ${f(g.nx - 36)} ${f(g.yB + 6)}`));
          // le bois de 2 à 5 cm, prêt à côté
          out.push(pile(g.cx + g.rx + 14, g.yB + 12, 4.5, [3, 2], 34, 31).svg);
          return out.join('\n');
        },
        renvois: z => {
          const g = glisser(z);
          return [
            { n: 17, rond: [g.nx - 90, g.yB - 18], cible: [g.nx - 70, g.yB + 6], texte: 'flèche : par l’ouverture' },
            { n: 18, rond: [z.l - 16, g.yB - 50], cible: [g.cx + g.rx + 26, g.yB - 8], texte: 'le 2 à 5 cm, quand ça crépite' },
          ];
        },
      },
    },
  };
};
