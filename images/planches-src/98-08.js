// Planche 98-08 — Vanner et tamiser (chapitre 98, étape 40 et « Vanner sans tarare », § 9).
// Ce que dit le chapitre, et rien de plus : un jour de vent régulier (ou devant le ventilateur),
// verser le grain de la hauteur de l'épaule sur la toile ; la balle part, le grain tombe. Puis deux
// tamis : le premier, du grillage de poulailler cloué sur un cadre de lattes, retient les tiges et
// les épis entiers ; le second, une tôle ou un fond de boîte percé au clou d'un trou juste plus petit
// que le grain entier (le clou essayé d'abord sur une poignée de bon grain), laisse passer la
// poussière, les petites graines et le grain cassé ; le bon grain reste entre les deux.
// Cotes : aucune. Le chapitre ne donne ni la taille des tamis, ni celle du trou, ni la hauteur du
// cadre : le trou se règle sur le grain, pas sur une mesure.
// Géométrie de dessin, jamais imprimée : personnage de 1750 (formes.js), épaule à 1420 ; chaudière
// de 250 à la gueule, 270 de haut, penchée de 105° ; le rebord bas de la gueule à la hauteur de
// l'épaule, à 560 devant les pieds.
module.exports = (h) => {
  const A = h.a, F = h.formes;
  const BLANC = '#FFFFFF';
  const f = v => Math.round(v * 10) / 10;
  const W = at => at.replace('fill="none"', `fill="${BLANC}"`);
  const rappel = A.fin + ' stroke-dasharray="2 3"';
  const alea = g => { let s = g; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; };
  const rot = (p, deg) => { const t = deg * Math.PI / 180, c = Math.cos(t), s = Math.sin(t); return [p[0] * c - p[1] * s, p[0] * s + p[1] * c]; };
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const dL = pts => pts.map((p, i) => `${i ? 'L' : 'M'}${f(p[0])} ${f(p[1])}`).join(' ');
  // courbe lisse (Catmull-Rom) passant par les points
  const lisse = (pts, ferme = false) => {
    const n = pts.length, P = i => ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
    let s = `M${f(pts[0][0])} ${f(pts[0][1])}`;
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
      s += ` C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
    }
    return s + (ferme ? ' Z' : '');
  };
  // le bras proche d'un personnage, repeint par-dessus ce qu'il tient (même découpe que 04-40)
  const brasProche = pers => {
    const L = String(pers).split('\n');
    const i0 = L.findIndex(l => l.includes('stroke="none"'));
    let iF = -1; L.forEach((l, i) => { if (l.includes('stroke="none"')) iF = i; });
    return [L[i0 - 1], ...L.slice(iF, L.length - 1)].join('\n');
  };

  // ── les petites choses : grain, grain cassé, balle, graine ──
  // un grain entier, couché : un fuseau aux bouts arrondis, le sillon au milieu
  const grain = (c, Lg, La, ang, { pli = true, at = W(A.detail), plein = false } = {}) => {
    const pts = [];
    for (let i = 0; i < 20; i++) {
      const t = i / 20 * 2 * Math.PI, ct = Math.cos(t), st = Math.sin(t);
      pts.push(add(c, rot([Lg / 2 * ct, La / 2 * st * (0.78 + 0.22 * st * st)], ang)));
    }
    const o = [h.path(lisse(pts, true), plein ? A.plein : at)];
    if (pli && !plein) o.push(h.path(dL([add(c, rot([-Lg * 0.3, 0], ang)), add(c, rot([Lg * 0.3, 0], ang))]), A.fin));
    return o.join('\n');
  };
  // un grain cassé : la moitié d'un grain, la cassure en dents
  const casse = (c, Lg, La, ang) => {
    const pts = [];
    for (let i = 0; i <= 10; i++) {
      const t = -Math.PI / 2 + i / 10 * Math.PI, ct = Math.cos(t), st = Math.sin(t);
      pts.push(add(c, rot([Lg * ct, La / 2 * st], ang)));
    }
    const brise = [[0, La / 2], [-Lg * 0.12, La * 0.2], [Lg * 0.05, 0], [-Lg * 0.1, -La * 0.22], [0, -La / 2]].map(p => add(c, rot(p, ang)));
    return h.path(lisse(pts) + ' ' + dL(brise.slice(1)).replace('M', 'L') + ' Z', W(A.detail));
  };
  // un bout de balle : une écaille mince et courbe, parfois sa barbe
  const balle = (c, lg, ang, barbe = false) => {
    const a = add(c, rot([-lg / 2, 0], ang)), b = add(c, rot([lg / 2, 0], ang));
    const c1 = add(c, rot([0, -lg * 0.45], ang)), c2 = add(c, rot([0, -lg * 0.12], ang));
    let s = `M${f(a[0])} ${f(a[1])} Q${f(c1[0])} ${f(c1[1])} ${f(b[0])} ${f(b[1])} Q${f(c2[0])} ${f(c2[1])} ${f(a[0])} ${f(a[1])} Z`;
    const o = [h.path(s, W(A.fin))];
    if (barbe) { const e = add(b, rot([lg * 1.3, lg * 0.15], ang)); o.push(h.path(dL([b, e]), A.fin)); }
    return o.join('\n');
  };

  // ═══ Vue 1 : vanner au vent ═══════════════════════════════════════════════════════════
  const vanGeo = z => {
    const G = z.h - 12;
    const e = Math.min((G - 14) / 1800, (z.l - 16) / 3200);
    const x0 = 600 * e + 8;
    const P = ([x, y]) => [x0 + x * e, G + y * e];
    // la chaudière : repère à la gueule, l'axe vers le fond ; penchée de 105°
    const rt = 125, rb = 105, hb = 270, th = 105;
    const Lp = [560, -1420];                            // le rebord bas de la gueule, à hauteur d'épaule
    const M = add(Lp, rot([-rt, 0], th));               // centre de la gueule
    const Q = p => P(add(M, rot(p, th)));               // du repère de la chaudière à la vue
    // le filet de grain : du rebord jusqu'au tas
    const yTas = -150;
    const filet = s => [Lp[0] + 38 * Math.sqrt(s), Lp[1] + s * (yTas - Lp[1])];
    return { G, e, x0, P, rt, rb, hb, th, Lp, M, Q, filet, yTas };
  };
  const vanner = z => {
    const g = vanGeo(z), { P, e, Q, rt, rb, hb, filet } = g, o = [];
    const r = alea(9808);
    // le sol
    const sol0 = P([-600, 0])[0] - 8;
    o.push(h.rect(sol0, g.G, z.l - sol0, 6, A.hachure('terre', 'aucun')));
    o.push(h.ligne(sol0, g.G, z.l, g.G, A.arete));
    // la toile, posée à plat, un bord relevé en pli à chaque bout
    const t0 = 300, t1 = 1330, ep = 24;
    o.push(h.path(lisse([P([t0 - 20, 0]), P([t0 - 50, -34]), P([t0 + 5, -40]), P([t0 + 50, -ep]), P([(t0 + t1) / 2, -ep]),
      P([t1 - 40, -ep]), P([t1 + 30, -44]), P([t1 + 70, -14]), P([t1 + 60, 0])]) + ` L${f(P([t0 - 20, 0])[0])} ${f(g.G)} Z`, W(A.arete)));
    // la balle : partie du filet, emportée par le vent, qui retombe loin, surtout passé la toile
    for (let i = 0; i < 95; i++) {
      const s0 = 0.02 + 0.55 * r(), p0 = filet(s0);
      const d = 90 + 1900 * Math.pow(r(), 0.85), m = 0.18 + 0.42 * r();
      let x = p0[0] + d, y = p0[1] + m * d;
      if (y > -12) { x = 1000 + 1200 * r(); y = -8; if (x < t1 + 90) y = -ep - 6; }
      if (P([x, y])[0] > z.l - 6) continue;
      o.push(balle(P([x, y]), 3.6 + 2.2 * r(), -40 + 80 * r() + (y > -30 ? 0 : 20), r() < 0.2));
    }
    // le tas de grain sur la toile
    const cx = filet(1)[0], lt = 250;
    const tas = [P([cx - lt, -ep]), P([cx - lt * 0.55, -ep - 50]), P([cx - lt * 0.2, g.yTas + 10]), P([cx, g.yTas]), P([cx + lt * 0.25, g.yTas + 14]),
      P([cx + lt * 0.6, -ep - 46]), P([cx + lt, -ep])];
    o.push(h.path(lisse(tas) + ' Z', W(A.arete)));
    for (let i = 0; i < 55; i++) {
      const u = -0.85 + 1.7 * r(), hmax = (1 - u * u) * (-g.yTas - ep) * 0.9;
      const p = P([cx + u * lt, -ep - 6 - r() * Math.max(0, hmax - 10)]);
      o.push(grain(p, 3.6, 1.8, r() * 180, { plein: true }));
    }
    // le filet de grain, qui s'élargit un peu en tombant
    for (let i = 0; i < 150; i++) {
      const s = Math.pow(r(), 0.9), c = filet(s), lg = 12 + 40 * s;
      const p = P([c[0] + (r() - 0.5) * lg, c[1]]);
      o.push(grain(p, 3.6, 1.8, 70 + 40 * r(), { plein: true }));
    }
    // le personnage, puis la chaudière, puis le bras proche par-dessus
    const pers = F.personnage({ x: g.x0, y: g.G, pose: 'debout', echelle: e, penche: -4, regard: 14,
      mains: { proche: P([330, -1500]), loin: P([200, -1400]) } });
    o.push(pers);
    const corps = [Q([-rt, 0]), Q([rt, 0]), Q([rb, hb]), Q([-rb, hb])];
    o.push(h.chemin(corps, W(A.arete), true));
    // la gueule vue un peu en biais : le grain dedans, qui glisse vers le rebord bas
    const gueule = [];
    for (let i = 0; i < 24; i++) { const t = i / 24 * 2 * Math.PI; gueule.push(Q([rt * Math.cos(t), 30 * Math.sin(t)])); }
    o.push(h.path(lisse(gueule, true), W(A.arete)));
    for (let i = 0; i < 16; i++) {
      const u = 0.35 + 0.6 * r(), v = (r() - 0.5) * 34 * (1 - u * u);
      o.push(grain(Q([u * rt * 0.95, v]), 3.6, 1.8, r() * 180, { plein: true }));
    }
    // les nervures et le fond de la chaudière
    for (const k of [0.12, 0.18]) o.push(h.path(dL([Q([-(rt - (rt - rb) * k), hb * k]), Q([rt - (rt - rb) * k, hb * k])]), A.detail));
    o.push(h.path(dL([Q([-rb * 1.01, hb]), Q([rb * 1.01, hb])]), A.arete));
    o.push(brasProche(pers));
    // le vent, dans le dos, et la balle qu'il emporte
    for (const y of [-1600, -1080, -560]) {
      const a = P([-590, y]), b = P([-210, y]);
      o.push(h.fleche(`M${f(a[0])} ${f(a[1])} L${f(b[0])} ${f(b[1])}`, A.arete));
    }
    const fa = P([820, -1300]), fb = P([1350, -1150]), fc = P([1900, -760]);
    o.push(h.fleche(`M${f(fa[0])} ${f(fa[1])} Q${f(fb[0])} ${f(fb[1])} ${f(fc[0])} ${f(fc[1])}`, A.detail));
    return o.join('\n');
  };

  // ═══ Vue 2 : les deux tamis, écartés ════════════════════════════════════════════════
  // Une vue oblique : u en largeur, v en profondeur (fuyante à 40°, réduite à 0,6), w en hauteur.
  const KX = 0.6 * Math.cos(40 * Math.PI / 180), KY = 0.6 * Math.sin(40 * Math.PI / 180);
  const tamGeo = z => {
    const U = Math.min(236, z.l - 125), V = 170, Hf = 15, t = 9;
    const x0 = 14;
    const hc = Hf + V * KY, ht = (V + 28) * KY;
    const gap = (z.h - 8 - 2 * hc - ht - 8) / 2;
    const n0 = 6 + hc, n1 = n0 + gap + hc, n2 = z.h - 8;
    const O = (y0) => ([u, v, w = 0]) => [x0 + u + v * KX, y0 - w - v * KY];
    return { U, V, Hf, t, x0, niv: [n0, n1, n2], O: [n0, n1, n2].map(O) };
  };
  // un cadre de quatre lattes, vu de biais ; le fond (grillage ou tôle) et ce qu'il porte, dessinés avant
  const cadre = (T, U, V, Hf, t) => {
    const o = [];
    const boite = (u0, u1, v0, v1) => {
      const q = pts => h.chemin(pts.map(T), W(A.detail), true);
      o.push(q([[u0, v0, 0], [u1, v0, 0], [u1, v0, Hf], [u0, v0, Hf]]));        // devant
      o.push(q([[u0, v0, Hf], [u1, v0, Hf], [u1, v1, Hf], [u0, v1, Hf]]));      // dessus
      o.push(q([[u1, v0, 0], [u1, v1, 0], [u1, v1, Hf], [u1, v0, Hf]]));        // côté droit
    };
    boite(0, U, V - t, V);        // latte du fond
    boite(0, t, t, V - t);        // latte de gauche
    boite(U - t, U, t, V - t);    // latte de droite
    boite(0, U, 0, t);            // latte de devant
    o.push(h.chemin([[0, 0, 0], [U, 0, 0], [U, V, 0], [U, V, Hf], [0, V, Hf], [0, 0, Hf]].map(T), A.arete, true));
    for (const u of [t / 2, U - t / 2]) { const p = T([u, 0, Hf / 2]); o.push(h.cercle(p[0], p[1], 1.2, A.plein)); }
    for (const v of [t / 2, V - t / 2]) { const p = T([U, v, Hf / 2]); o.push(h.cercle(p[0], p[1], 1.1, A.plein)); }
    return o.join('\n');
  };
  // découpe un segment au rectangle [0, U] × [0, V] (Liang-Barsky)
  const coupe = (a, b, U, V) => {
    let t0 = 0, t1 = 1; const dx = b[0] - a[0], dy = b[1] - a[1];
    for (const [p, q] of [[-dx, a[0]], [dx, U - a[0]], [-dy, a[1]], [dy, V - a[1]]]) {
      if (p === 0) { if (q < 0) return null; continue; }
      const r = q / p;
      if (p < 0) { if (r > t1) return null; if (r > t0) t0 = r; } else { if (r < t0) return null; if (r < t1) t1 = r; }
    }
    return [[a[0] + t0 * dx, a[1] + t0 * dy], [a[0] + t1 * dx, a[1] + t1 * dy]];
  };
  // le grillage de poulailler : des mailles à six côtés
  const grillage = (T, U, V) => {
    const rr = 10, segs = [], vu = new Set();
    for (let j = -1; j * 1.5 * rr < V + rr; j++) for (let i = -1; i * Math.sqrt(3) * rr < U + rr; i++) {
      const c = [i * Math.sqrt(3) * rr + (j % 2 ? Math.sqrt(3) / 2 * rr : 0), j * 1.5 * rr];
      const S = [0, 1, 2, 3, 4, 5].map(k => [c[0] + rr * Math.cos((60 * k + 30) * Math.PI / 180), c[1] + rr * Math.sin((60 * k + 30) * Math.PI / 180)]);
      for (let k = 0; k < 6; k++) {
        const a = S[k], b = S[(k + 1) % 6], cle = [a, b].map(p => `${Math.round(p[0])},${Math.round(p[1])}`).sort().join('|');
        if (vu.has(cle)) continue; vu.add(cle);
        const s = coupe(a, b, U, V); if (!s) continue;
        const p = T([s[0][0], s[0][1], 0]), q = T([s[1][0], s[1][1], 0]);
        segs.push(`M${f(p[0])} ${f(p[1])} L${f(q[0])} ${f(q[1])}`);
      }
    }
    return h.path(segs.join(' '), A.fin);
  };
  const tole = (T, U, V) => {
    const o = [];
    for (let j = 1; j * 9 < V; j++) for (let i = 1; i * 10 < U; i++) {
      const p = T([i * 10 + (j % 2 ? 5 : 0), j * 9, 0]);
      o.push(h.ellipse(p[0], p[1], 1.2, 0.8, A.plein));
    }
    return o.join('\n');
  };
  // une tige : une paille creuse, coupée net aux deux bouts, un nœud
  const tige = (a, b, ep = 4.4) => {
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]), u = [(b[0] - a[0]) / L, (b[1] - a[1]) / L], n = [-u[1] * ep / 2, u[0] * ep / 2];
    const pts = [add(a, n), add(b, n), add(b, n.map(v => -v)), add(a, n.map(v => -v))];
    const k = add(a, [u[0] * L * 0.4, u[1] * L * 0.4]);
    return [h.chemin(pts, W(A.detail), true), h.path(dL([[k[0] + n[0] * 1.3, k[1] + n[1] * 1.3], [k[0] - n[0] * 1.3, k[1] - n[1] * 1.3]]), A.detail)].join('\n');
  };
  // un épi entier : le bout de tige, les grains en deux rangs de part et d'autre de l'axe, les barbes
  const epi = (base, ang, Lg = 50) => {
    const o = [], u = rot([1, 0], ang), n = rot([0, 1], ang);
    o.push(tige(add(base, [-u[0] * 30, -u[1] * 30]), base, 3.2));
    const barbes = [], gr = [];
    for (let i = 0; i < 7; i++) {
      const s = 5 + i * (Lg - 10) / 6;
      for (const cote of [-1, 1]) {
        const c = add(base, [u[0] * (s + (cote > 0 ? 3 : 0)) + n[0] * cote * 3, u[1] * (s + (cote > 0 ? 3 : 0)) + n[1] * cote * 3]);
        gr.push(grain(c, 9, 4.2, ang + cote * 20, { pli: false }));
        const pt = add(c, rot([4.3, 0], ang + cote * 20));
        barbes.push(h.path(dL([pt, add(pt, rot([30 + 5 * (i % 3), 0], ang + cote * 6))]), A.fin));
      }
    }
    o.push(...barbes, ...gr);
    return o.join('\n');
  };
  // une toile posée à plat, vue de biais, les bords un peu ondulés
  const toile = (T, U, V) => {
    const bord = [], pt = (u, v) => T([u, v, 0]);
    for (let i = 0; i <= 8; i++) bord.push(pt(-18 + (U + 36) * i / 8, -14 + (i % 2 ? 3 : 0)));
    for (let i = 1; i <= 4; i++) bord.push(pt(U + 18 + (i % 2 ? 4 : 0), -14 + (V + 28) * i / 4));
    for (let i = 7; i >= 0; i--) bord.push(pt(-18 + (U + 36) * i / 8, V + 14 + (i % 2 ? -3 : 0)));
    for (let i = 3; i >= 1; i--) bord.push(pt(-18 + (i % 2 ? -4 : 0), -14 + (V + 28) * i / 4));
    const o = [h.path(lisse(bord, true), W(A.arete))];
    o.push(h.path(lisse([pt(U * 0.18, -10), pt(U * 0.22, V * 0.3), pt(U * 0.2, V * 0.6)]), A.fin));
    o.push(h.path(lisse([pt(U * 0.86, V + 10), pt(U * 0.8, V * 0.7), pt(U * 0.83, V * 0.45)]), A.fin));
    return o.join('\n');
  };
  // répartit n choses dans [m, U-m] × [m, V-m] sans qu'elles se touchent
  const semis = (r, n, U, V, m, dmin) => {
    const pts = [];
    for (let k = 0; pts.length < n && k < n * 60; k++) {
      const p = [m + (U - 2 * m) * r(), m + (V - 2 * m) * r()];
      if (pts.every(q => Math.hypot((q[0] - p[0]), (q[1] - p[1]) * 0.6) > dmin)) pts.push(p);
    }
    return pts;
  };
  const tamis = z => {
    const g = tamGeo(z), { U, V, Hf, t } = g, o = [];
    const r = alea(4242);
    const [T1, T2, T3] = g.O;
    // en bas : la toile et ce qui a tout traversé
    o.push(toile(T3, U, V));
    for (const [u, v] of semis(r, 170, U, V, 8, 3)) { const p = T3([u, v, 0]); o.push(h.cercle(p[0], p[1], 0.45, A.plein)); }
    for (const [u, v] of semis(r, 28, U, V, 14, 14)) { const p = T3([u, v, 0]); o.push(h.cercle(p[0], p[1], 1.7, W(A.fin))); }
    for (const [u, v] of semis(r, 28, U, V, 14, 16)) o.push(casse(T3([u, v, 0]), 3.8, 3.6, r() * 360));
    // le second tamis : la tôle percée, et le bon grain dessus
    o.push(tole(T2, U, V));
    for (const [u, v] of semis(r, 100, U, V, 14, 12)) o.push(grain(T2([u, v, 0]), 7.6, 3.4, r() * 180));
    o.push(cadre(T2, U, V, Hf, t));
    // le premier tamis : le grillage de poulailler, les tiges et les épis entiers dessus
    o.push(grillage(T1, U, V));
    const tiges = [[[22, 62], [104, 84]], [[64, 144], [150, 122]], [[146, 50], [214, 62]], [[170, 150], [222, 130]], [[24, 104], [66, 150]], [[176, 100], [226, 82]]];
    for (const [a, b] of tiges) o.push(tige(T1([a[0], a[1], 0]), T1([b[0], b[1], 0])));
    o.push(epi(T1([88, 58, 0]), -6), epi(T1([158, 120, 0]), 172));
    o.push(cadre(T1, U, V, Hf, t));
    // les lignes de rappel : le premier tamis se pose sur le second
    for (const q of [[0, 0], [U, 0], [U, V]]) {
      const a = T1([q[0], q[1], 0]), b = T2([q[0], q[1], Hf]);
      o.push(h.ligne(a[0], a[1] + 3, b[0], b[1] - 3, rappel));
    }
    // ce qui passe au travers : le grain au premier, la poussière et le menu au second
    for (const [ta, tb, u, w] of [[T1, T2, 0.3, Hf + 6], [T1, T2, 0.62, Hf + 6], [T2, T3, 0.3, 12], [T2, T3, 0.62, 12]]) {
      const a = ta([U * u, 0, -4]), b = tb([U * u, 0, w]);
      o.push(h.fleche(`M${f(a[0])} ${f(a[1])} L${f(b[0])} ${f(b[1])}`, A.cache));
    }
    return o.join('\n');
  };

  // ═══ Vue 3 : la tôle percée, en coupe et vue de dessus ════════════════════════════════
  // Les deux vues alignées : chaque trou de la coupe tombe sur le même trou du dessus.
  const trouGeo = z => {
    const yT = z.h * 0.42, dh = 14, ep = 3, yP = z.h * 0.84;
    const xs = [z.l * 0.2, z.l * 0.52, z.l * 0.82];
    return { yT, dh, ep, yP, xs };
  };
  const trou = z => {
    const g = trouGeo(z), { yT, dh, ep, yP, xs } = g, o = [];
    const L0 = 8, L1 = z.l - 8;
    // ── la coupe : la tôle en aplat, percée ; au bord de chaque trou, la bavure repoussée vers le bas
    const bords = [L0, ...xs.flatMap(x => [x - dh / 2, x + dh / 2]), L1];
    for (let i = 0; i < bords.length; i += 2) o.push(h.rect(bords[i], yT, bords[i + 1] - bords[i], ep, A.plein));
    for (const x of xs) for (const s of [-1, 1]) {
      const b = x + s * dh / 2;
      o.push(h.path(`M${f(b)} ${f(yT)} Q${f(b - s * 0.5)} ${f(yT + 6)} ${f(b - s * 1.5)} ${f(yT + 8)} L${f(b + s * 1.5)} ${f(yT + 4)} L${f(b + s * 5)} ${f(yT + ep)} Z`, A.plein));
    }
    // le clou dans le premier trou : la pointe passée, la tête en haut ; le coup vers le bas
    const xc = xs[0], hc = yT - 70;
    o.push(h.path(`M${f(xc - dh / 2)} ${f(hc)} L${f(xc + dh / 2)} ${f(hc)} L${f(xc + dh / 2)} ${f(yT)} L${f(xc)} ${f(yT + 18)} L${f(xc - dh / 2)} ${f(yT)} Z`, W(A.arete)));
    o.push(h.path(`M${f(xc - 15)} ${f(hc)} L${f(xc + 15)} ${f(hc)} L${f(xc + 14)} ${f(hc - 5)} Q${f(xc)} ${f(hc - 8)} ${f(xc - 14)} ${f(hc - 5)} Z`, W(A.arete)));
    o.push(h.fleche(`M${f(xc - 24)} ${f(hc - 8)} L${f(xc - 24)} ${f(hc + 28)}`, A.arete));
    // le grain entier couché sur le deuxième trou : il porte sur les deux bords
    const xg = xs[1];
    o.push(grain([xg, yT - 8], 44, 16, 0));
    // le grain cassé qui passe le troisième, une petite graine et de la poussière dessous
    const xk = xs[2];
    o.push(casse([xk, yT - 5], 13, 11, 90));
    o.push(h.cercle(xk, yT + 30, 3.6, W(A.detail)));
    for (const [dx, dy] of [[-4, 44], [3, 50], [-1, 56], [5, 42], [-6, 53], [1, 62]]) o.push(h.cercle(xk + dx, yT + dy, 0.6, A.plein));
    o.push(h.fleche(`M${f(xk + 17)} ${f(yT + 12)} L${f(xk + 17)} ${f(yT + 50)}`, A.arete));
    // ── vue de dessus : la même bande de tôle ; sous le grain et sous la tête du clou, le trou caché en tireté
    const bh = 22;
    o.push(h.rect(L0, yP - bh, L1 - L0, 2 * bh, W(A.arete)));
    for (const x of xs) o.push(h.ligne(x, yT + 22, x, yP - bh - 4, rappel));
    o.push(h.cercle(xs[0], yP, 15, W(A.arete)), h.cercle(xs[0], yP, dh / 2, A.cache));
    o.push(grain([xs[1], yP], 44, dh + 5, 0, { pli: false }));
    o.push(h.cercle(xs[1], yP, dh / 2, A.cache));
    o.push(h.cercle(xs[2], yP, dh / 2, A.plein));
    o.push(casse([xs[2] + 3, yP], 8, 10.5, 180));
    // les trous voisins, pour la bande
    for (const x of [(xs[0] + xs[1]) / 2, (xs[1] + xs[2]) / 2]) o.push(h.cercle(x, yP - 12, dh / 2, A.plein), h.cercle(x, yP + 12, dh / 2, A.plein));
    return o.join('\n');
  };

  return {
    ref: '98-08',
    titre: 'Vanner et tamiser le grain',
    desc: 'Vanner au vent : le grain versé de la hauteur de l’épaule sur une toile, le vent dans le dos emporte la balle loin, le grain tombe en tas. Puis les deux tamis, écartés : le grillage de poulailler cloué sur un cadre de lattes retient tiges et épis, la tôle percée au clou retient le bon grain, et dessous tombent poussière, petites graines et grain cassé. En détail, la tôle en coupe et vue de dessus : le trou fait au clou, le grain entier qui le couvre et reste, le grain cassé qui passe.',
    format: 'pleine',
    disposition: [['vanner'], ['tamis', 'trou']],
    hauteurs: [0.92, 1.1],
    largeurs: [[1], [1.72, 1]],
    vues: {
      vanner: {
        titre: 'Vanner au vent',
        dessin: vanner,
        renvois: z => {
          const g = vanGeo(z), P = g.P;
          const t = g.filet(1);
          return [
            { n: 1, rond: P([-480, -1780]), cible: P([-400, -1600]), texte: 'un vent régulier, ou un ventilateur' },
            { n: 2, rond: P([980, -1640]), cible: P([g.Lp[0] + 20, g.Lp[1] - 10]), texte: 'le grain versé de la hauteur de l’épaule' },
            { n: 3, rond: P([1750, -1350]), cible: P([1560, -1000]), texte: 'la balle, que le vent emporte' },
            { n: 4, rond: P([1000, -520]), cible: P([t[0] + 110, -80]), texte: 'le grain, qui tombe sur la toile' },
          ];
        },
      },
      tamis: {
        titre: 'Les deux tamis, écartés',
        dessin: tamis,
        renvois: z => {
          const g = tamGeo(z), { U, V, Hf } = g, [T1, T2, T3] = g.O, xr = z.l - 12;
          return [
            { n: 5, rond: [xr, T1([U, V, Hf])[1] + 4], cible: T1([U, V * 0.6, Hf * 0.5]), texte: 'grillage de poulailler cloué sur des lattes' },
            { n: 6, rond: [xr, T1([U, 0, 0])[1] - 8], cible: T1([126, 124, 0]), texte: 'il retient les tiges et les épis entiers' },
            { n: 7, rond: [xr, T2([U, V, Hf])[1] + 4], cible: T2([U, V * 0.6, Hf * 0.5]), texte: 'tôle ou fond de boîte percé au clou' },
            { n: 8, rond: [xr, T2([U, 0, 0])[1] - 8], cible: T2([U - 36, 40, 0]), texte: 'il retient le bon grain' },
            { n: 9, rond: [xr, T3([U, V * 0.5, 0])[1]], cible: T3([U - 24, V * 0.5, 0]), texte: 'passent : poussière, graines, grain cassé' },
          ];
        },
      },
      trou: {
        titre: 'La tôle percée, coupe et dessus',
        dessin: trou,
        renvois: z => {
          const g = trouGeo(z), { yT, xs } = g;
          return [
            { n: 10, rond: [xs[0] + 34, yT - 92], cible: [xs[0] + 7, yT - 46], texte: 'le clou, essayé d’abord sur du bon grain' },
            { n: 11, rond: [xs[1] + 6, yT - 46], cible: [xs[1] + 6, yT - 12], texte: 'le grain entier reste : trou juste plus petit' },
            { n: 12, rond: [xs[2] - 26, yT + 52], cible: [xs[2] - 5, yT + 8], texte: 'le grain cassé et les petites graines passent' },
          ];
        },
      },
    },
  };
};
