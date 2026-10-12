// 55-40 — La planche à tendre une peau en fourreau : la planche et sa cale (vues alignées,
// coupe rabattue), la peau enfilée cuir dehors, la coupe en travers de la peau montée, et
// la peau bien montée contre mal montée (trop lâche, trop tendue, arête vive).
// Aucune cote : le chapitre ne donne aucune mesure de planche.
// Repère en unités de planche : x centré, y vers le bas, pointe à y = 0, base à y = 100.

module.exports = (h) => {
  // ─── géométrie ────────────────────────────────────────────────────────────────────
  const cr = (p0, p1, p2, p3, t) => {
    const t2 = t * t, t3 = t2 * t;
    return [0, 1].map(k => 0.5 * (2 * p1[k] + (-p0[k] + p2[k]) * t
      + (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * t2
      + (-p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k]) * t3));
  };
  // courbe par les points ; avant / apres : points fantômes qui fixent la tangente aux bouts
  const lisse = (pts, avant, apres, m = 8) => {
    const P = [avant || pts[0], ...pts, apres || pts[pts.length - 1]], out = [];
    for (let i = 1; i < P.length - 2; i++)
      for (let j = 0; j < m; j++) out.push(cr(P[i - 1], P[i], P[i + 1], P[i + 2], j / m));
    out.push(pts[pts.length - 1]);
    return out;
  };
  const miroir = pts => pts.map(([x, y]) => [-x, y]);
  const sym = droite => droite.concat(miroir(droite).reverse().slice(1));
  // normales vers l'extérieur d'une demi-forme droite parcourue de la pointe vers la base
  const decale = (pts, e) => pts.map((p, i) => {
    const a = i === 0 ? [-pts[1][0], pts[1][1]] : pts[i - 1];
    const b = pts[Math.min(pts.length - 1, i + 1)];
    const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1;
    const ee = typeof e === 'function' ? e(p[1]) : e;
    return [p[0] + ee * dy / L, p[1] - ee * dx / L];
  });
  const jusque = (pts, y) => {            // coupe une demi-forme à l'ordonnée y
    const out = [];
    for (let i = 0; i < pts.length; i++) {
      if (pts[i][1] <= y) { out.push(pts[i]); continue; }
      const a = pts[i - 1], b = pts[i], t = (y - a[1]) / (b[1] - a[1]);
      out.push([a[0] + (b[0] - a[0]) * t, y]);
      break;
    }
    return out;
  };
  // enveloppe convexe, puis décalage rond (somme avec un cercle)
  const enveloppe = pts => {
    const P = pts.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const x = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
    const lo = [], hi = [];
    for (const p of P) { while (lo.length > 1 && x(lo[lo.length - 2], lo[lo.length - 1], p) <= 0) lo.pop(); lo.push(p); }
    for (const p of P.slice().reverse()) { while (hi.length > 1 && x(hi[hi.length - 2], hi[hi.length - 1], p) <= 0) hi.pop(); hi.push(p); }
    return lo.slice(0, -1).concat(hi.slice(0, -1));
  };
  const arrondi = (pts, e) => enveloppe(pts.flatMap(([x, y]) =>
    Array.from({ length: 24 }, (_, k) => [x + e * Math.cos(k * Math.PI / 12), y + e * Math.sin(k * Math.PI / 12)])));

  // ─── la planche ───────────────────────────────────────────────────────────────────
  const BR = lisse([[0, 0], [1.5, 0.35], [2.4, 1.3], [3.0, 3.2], [3.45, 6.5], [3.85, 11], [4.3, 18],
    [4.8, 30], [5.3, 48], [5.7, 68], [5.95, 88], [6.0, 98]], [-1.5, 0.35], [6.02, 102], 10);
  const wAt = y => {
    for (let i = 1; i < BR.length; i++) if (BR[i][1] >= y) {
      const a = BR[i - 1], b = BR[i], t = (y - a[1]) / (b[1] - a[1] || 1);
      return a[0] + (b[0] - a[0]) * t;
    }
    return 6;
  };
  const planche = sym(BR.concat([[5.97, 99.3], [5.7, 99.85], [5.3, 100]]));
  // vue sur la rive : la demi-épaisseur, amincie vers la pointe
  const rive = sym(lisse([[0, 0], [0.42, 0.25], [0.62, 1.1], [0.78, 4], [0.92, 9], [1.0, 16], [1.0, 99.4]],
    [-0.42, 0.25], [1.0, 102], 8).concat([[0.95, 99.85], [0.8, 100]]));
  // la cale, vue de face : mince, pointe amincie en haut, bout carré en bas (y 32 à 92)
  const CALE_H = 32, CALE_B = 92;
  const cale = sym(lisse([[0, CALE_H], [0.6, CALE_H + 0.5], [0.95, CALE_H + 2.2], [1.1, CALE_H + 7],
    [1.2, CALE_H + 25], [1.3, CALE_B - 0.4]], [-0.6, CALE_H + 0.5], [1.3, CALE_B + 3], 6).concat([[1.2, CALE_B]]));
  const fil = [-0.62, -0.2, 0.28, 0.66];         // lignes du fil, en fraction de la demi-largeur

  // ─── la peau (fourreau, cuir dehors), demi-contour droit ──────────────────────────
  const peauHaut = (e, yFin) => decale(jusque(BR, yFin), e);
  const peauJuste = () => {
    const haut = peauHaut(0.9, 68);
    const pattes = lisse([haut[haut.length - 1], [6.62, 73], [6.45, 79], [6.25, 84.5], [6.0, 88.2], [5.3, 89.1],
      [4.1, 89.1], [3.45, 88.3], [3.2, 84], [2.75, 78.5], [2.05, 73.6], [1.35, 71.1], [0, 70.4]],
      haut[haut.length - 2], [-1.35, 71.1], 6);
    return haut.concat(pattes.slice(1));
  };
  const manche = (P, cote) => {             // la patte avant retournée, couchée sur la planche
    const k = cote;
    const ext = lisse([[5.3, 22], [5.0, 28], [4.45, 34.5], [4.25, 37]], [5.4, 18], [4.2, 39], 6);
    const int = lisse([[3.5, 25.5], [3.25, 30], [2.55, 35.6]], [3.6, 22], [2.3, 38], 6);
    const bout = lisse([[4.25, 37], [3.55, 37.3], [2.9, 36.8], [2.55, 35.6]], [4.4, 36], [2.4, 34.5], 5);
    const ouv = lisse([[4.1, 36.2], [3.4, 35.9], [2.8, 35.3]], [4.3, 36.3], [2.6, 35], 5);
    const K = pts => pts.map(([x, y]) => [k * x, y]);
    const tour = K(ext.concat(bout.slice(1), int.slice().reverse()));
    return [
      h.chemin(P(tour), h.a.blanc, true),
      h.chemin(P(tour), h.a.arete),
      h.chemin(P(K(ouv)), h.a.fin),
    ];
  };
  const yeux = (P) => [1, -1].map(k => {
    const a = 64 * Math.PI / 180 * k, pts = [];
    for (let i = 0; i < 16; i++) {
      const t = i / 16 * 2 * Math.PI, u = 0.85 * Math.cos(t), v = 0.3 * Math.sin(t) * (1 - 0.3 * Math.cos(t));
      pts.push([k * 2.35 + u * Math.cos(a) - v * Math.sin(a), 7.0 + u * Math.sin(a) + v * Math.cos(a)]);
    }
    return h.chemin(P(pts), h.a.plein, true);
  });

  const cadre = (s, ox, oy) => {
    const T = ([x, y]) => [ox + s * x, oy + s * y];
    return { T, P: pts => pts.map(T) };
  };
  const CHAINE = 'fill="none" stroke="#000" stroke-width="0.7" stroke-dasharray="10 3 2 3"';

  // la peau coupée en travers d'une vue partielle : ligne de cassure en bas
  const peauCoupee = (P, droite, yC) => {
    const g = miroir(droite).reverse();
    const xr = droite[droite.length - 1][0], cass = [];
    for (let i = 0; i <= 12; i++) {
      const t = i / 12;
      cass.push([xr - 2 * xr * t, yC + (i % 2 ? 0.7 : -0.1) * (i % 4 === 1 ? 1 : 0.6)]);
    }
    const ferme = droite.concat(cass.slice(1, -1), g);
    return {
      fond: h.chemin(P(ferme), h.a.blanc, true),
      bord: [h.chemin(P(droite), h.a.contour), h.chemin(P(g), h.a.contour), h.chemin(P(cass), h.a.detail)],
    };
  };

  // ─── coupe en travers (planche, cale, poil, cuir) ─────────────────────────────────
  const W = wAt(46);
  const stade = (W, t) => {
    const c = W - t, out = [];
    for (let k = 0; k <= 16; k++) { const a = -Math.PI / 2 + k * Math.PI / 16; out.push([c + t * Math.cos(a), t * Math.sin(a)]); }
    for (let k = 0; k <= 16; k++) { const a = Math.PI / 2 + k * Math.PI / 16; out.push([-c + t * Math.cos(a), t * Math.sin(a)]); }
    return out;
  };
  const dansPlanche = ([x, y], ww, t) => (Math.abs(y) <= t && Math.abs(x) <= ww - t) || Math.hypot(Math.abs(x) - (ww - t), y) <= t;
  const CX = 1.25, CY0 = 1, CY1 = 1.72;           // la cale en travers
  const dansCale = ([x, y]) => Math.abs(x) <= CX && y >= CY0 - 0.01 && y <= CY1;
  // poils : traits courts du bord extérieur du poil vers le bois, penchés
  const poils = (P, contour, dedans, e1, pas = 0.36, garde = () => true) => {
    const out = [], n = contour.length;
    let acc = 0;
    for (let i = 0; i < n; i++) {
      const a = contour[i], b = contour[(i + 1) % n], L = Math.hypot(b[0] - a[0], b[1] - a[1]);
      for (let d = pas - acc; d < L; d += pas) {
        const t = d / L, p = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
        const nx = (b[1] - a[1]) / L, ny = -(b[0] - a[0]) / L;      // vers l'extérieur (sens horaire à l'écran)
        const ca = Math.cos(0.42), sa = Math.sin(0.42);
        const vx = -(nx * ca - ny * sa), vy = -(nx * sa + ny * ca);
        let q = p, k = 0;
        while (k < 80 && !dedans([q[0] + vx * 0.05, q[1] + vy * 0.05])) { q = [q[0] + vx * 0.05, q[1] + vy * 0.05]; k++; }
        const lg = Math.min(k * 0.05 - 0.12, e1 * 1.25);
        if (lg > 0.25 && garde(p)) out.push(h.chemin(P([[p[0] + vx * 0.1, p[1] + vy * 0.1], [p[0] + vx * lg, p[1] + vy * lg]]), h.a.fin));
      }
      acc = (acc + L) % pas;
    }
    return out;
  };
  // le poil en coupe : traits courts et courbes sur une trame décalée, couchés vers le bois
  const dansPoly = (q, poly) => { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if ((yi > q[1]) !== (yj > q[1]) && q[0] < (xj - xi) * (q[1] - yi) / (yj - yi) + xi) c = !c; } return c; };
  const frac = v => v - Math.floor(v);
  const pelage = (P, poly, versBois, dansBois, pas, lg, garde = () => true) => {
    const xs = poly.map(q => q[0]), ys = poly.map(q => q[1]), out = [];
    for (let r = 0, y = Math.min(...ys); y <= Math.max(...ys); y += pas * 0.85, r++)
      for (let x = Math.min(...xs) + (r % 2) * pas / 2; x <= Math.max(...xs); x += pas) {
        const j1 = frac(Math.sin(x * 12.9898 + y * 78.233) * 43758.5453), j2 = frac(Math.sin(x * 39.3468 + y * 11.135) * 24634.6345);
        const q = [x + (j1 - 0.5) * pas * 0.5, y + (j2 - 0.5) * pas * 0.5], c = versBois(q);
        let vx = c[0] - q[0], vy = c[1] - q[1]; const L = Math.hypot(vx, vy) || 1; vx /= L; vy /= L;
        const a = 0.35 + (j1 - 0.5) * 0.7, ux = vx * Math.cos(a) - vy * Math.sin(a), uy = vx * Math.sin(a) + vy * Math.cos(a);
        const n = lg * (0.8 + 0.4 * j2), b = [q[0] + ux * n, q[1] + uy * n], k = (j2 > 0.5 ? 1 : -1) * n * 0.2;
        const m = [(q[0] + b[0]) / 2 - uy * k, (q[1] + b[1]) / 2 + ux * k];
        if (!garde(q) || !dansPoly(q, poly) || !dansPoly(b, poly) || !dansPoly(m, poly) || dansBois(q) || dansBois(b) || dansBois(m)) continue;
        const [Q, M, B] = P([q, m, b]);
        out.push(h.path(`M${Q[0].toFixed(1)},${Q[1].toFixed(1)} Q${M[0].toFixed(1)},${M[1].toFixed(1)} ${B[0].toFixed(1)},${B[1].toFixed(1)}`, h.a.fin));
      }
    return out;
  };
  const sensHoraire = pts => {                    // à l'écran (y vers le bas) : aire positive
    let a = 0;
    for (let i = 0; i < pts.length; i++) { const p = pts[i], q = pts[(i + 1) % pts.length]; a += p[0] * q[1] - q[0] * p[1]; }
    return a > 0 ? pts : pts.slice().reverse();
  };

  // ─── les vues ─────────────────────────────────────────────────────────────────────
  const HAUT = 14, BAS = 10;                      // marges de la planche dans les vues de la rangée 1
  const echelle1 = z => (z.h - HAUT - BAS) / 100;
  const yB = 46;                                  // la coupe en travers

  const geomPlanche = z => {
    const s = echelle1(z), oy = HAUT, sA = s;          // la coupe rabattue à l'échelle de la face et de la rive
    const xF = 26 + 6 * s, xR = xF + 6 * s + 20, xS = xR + s + 12 + (wAt(50) + 0.1) * sA, xC = z.l - 16;
    return { s, oy, sA, xF, xR, xS, xC, yA: oy + s * 50 };
  };
  const vuePlanche = {
    titre: 'La planche et sa cale',
    dessin: z => {
      const { s, oy, sA, xF, xR, xS, xC, yA } = geomPlanche(z);
      const F = cadre(s, xF, oy), R = cadre(s, xR, oy), C = cadre(s, xC, oy);
      const A = cadre(sA, xS, yA);
      const o = [];
      // traits de rappel entre la face et la rive : pointe et base
      o.push(h.ligne(xF + 4, oy, xR - 4, oy, h.a.fin), h.ligne(xF + 6 * s + 4, oy + s * 100, xR - s - 4, oy + s * 100, h.a.fin));
      // la face
      o.push(h.chemin(F.P(planche), h.a.blanc, true));
      for (const k of fil) {
        const ys = []; for (let y = 5; y <= 99; y += 2) ys.push([k * wAt(y), y]);
        o.push(h.chemin(F.P(ys), h.a.fin));
      }
      o.push(h.chemin(F.P(planche), h.a.contour, true));
      // la rive
      o.push(h.chemin(R.P(rive), h.a.blanc, true), h.chemin(R.P(rive), h.a.contour, true));
      // la coupe rabattue : trait de coupe sur la face et la rive, prolongé jusqu'à la coupe
      o.push(h.ligne(xF - 6.8 * s, yA, xS - (wAt(50) + 0.5) * sA, yA, CHAINE));
      o.push(h.ligne(xF - 7.6 * s, yA, xF - 6.3 * s, yA, h.a.contour), h.ligne(xR + 1.4 * s, yA, xR + 2.7 * s, yA, h.a.contour));
      const WA = wAt(50), stA = stade(WA, 1);
      o.push(h.chemin(A.P(stA), h.a.hachure('bois'), true), h.chemin(A.P(stA), h.a.contour, true));
      // la cale, alignée sur sa place dans la vue suivante
      o.push(h.chemin(C.P(cale), h.a.blanc, true));
      const ys = []; for (let y = CALE_H + 4; y <= CALE_B - 1; y += 2) ys.push([0.1, y]);
      o.push(h.chemin(C.P(ys), h.a.fin), h.chemin(C.P(cale), h.a.contour, true));
      return o.join('\n');
    },
    renvois: z => {
      const { s, oy, sA, xF, xS, xC, yA } = geomPlanche(z);
      return [
        { n: 1, rond: [12, oy + 4], cible: [xF - 1.3 * s, oy + 1.0 * s], texte: 'pointe arrondie' },
        { n: 2, rond: [12, oy + s * 78], cible: [xF - 0.62 * wAt(78) * s, oy + s * 78], texte: 'fendue droit dans le fil' },
        { n: 3, rond: [xS + wAt(50) * sA - 4, yA - 34], cible: [xS + (wAt(50) - 0.2) * sA, yA - 0.6 * sA], texte: 'toutes les arêtes arrondies' },
        { n: 4, rond: [xC - 2, oy + s * 22], cible: [xC, oy + s * (CALE_H + 1)], texte: 'cale mince, même bille' },
      ];
    },
  };

  const vueMontee = {
    titre: 'La peau enfilée, cuir dehors',
    dessin: z => {
      const s = echelle1(z), oy = HAUT, cx = z.l / 2 - 8;
      const { T, P } = cadre(s, cx, oy);
      const peau = sym(peauJuste());
      const o = [];
      // la planche, son fil, puis la cale posée dessus
      o.push(h.chemin(P(planche), h.a.blanc, true));
      for (const k of fil) {
        const ys = []; for (let y = 60; y <= 99; y += 2) ys.push([k * wAt(y), y]);
        o.push(h.chemin(P(ys), h.a.fin));
      }
      o.push(h.chemin(P(planche), h.a.contour, true));
      o.push(h.chemin(P(cale), h.a.blanc, true), h.chemin(P(cale), h.a.arete, true));
      // la peau par-dessus
      o.push(h.chemin(P(peau), h.a.blanc, true), h.chemin(P(peau), h.a.contour, true));
      o.push(...manche(P, 1), ...manche(P, -1), ...yeux(P));
      // la cale sous la peau, en caché
      o.push(h.chemin(P(jusque(cale.slice(0, Math.ceil(cale.length / 2)), 70.2)), h.a.cache));
      o.push(h.chemin(P(miroir(jusque(cale.slice(0, Math.ceil(cale.length / 2)), 70.2))), h.a.cache));
      // les broquettes, de chaque côté de la cale
      for (const [x, y] of [[4.7, 86.6], [5.75, 73.5], [-4.7, 86.6], [-5.75, 73.5]]) {
        const [px, py] = T([x, y]);
        o.push(h.cercle(px, py, 2.6, h.a.blanc), h.cercle(px, py, 2.6, h.a.detail), h.cercle(px, py, 1.1, h.a.plein));
      }
      // second rappel du renvoi 7, vers une broquette du bas (sous la pastille, même trait)
      {
        const [ax, ay] = [cx - 9 * s - 6, oy + s * 72], [bx, by] = T([-4.7, 86.6]);
        o.push(`<line x1="${ax.toFixed(1)}" y1="${ay.toFixed(1)}" x2="${bx.toFixed(1)}" y2="${by.toFixed(1)}" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`,
          `<line x1="${ax.toFixed(1)}" y1="${ay.toFixed(1)}" x2="${bx.toFixed(1)}" y2="${by.toFixed(1)}" fill="none" stroke="#000" stroke-width="0.5" stroke-dasharray="3 2.5"/>`,
          `<circle cx="${bx.toFixed(1)}" cy="${by.toFixed(1)}" r="1.8" fill="#000" stroke="#fff" stroke-width="0.7"/>`);
      }
      // la cale se retire vers le bas à mi-séchage
      const [fx, fy] = T([0, CALE_B + 1.2]);
      o.push(h.fleche(`M${fx.toFixed(1)},${fy.toFixed(1)} L${fx.toFixed(1)},${(fy + 5.2 * s).toFixed(1)}`));
      // le trait de la coupe en travers, prolongé vers la vue suivante
      const [xa, ya] = T([-7.3, yB]), [xb] = T([7.3, yB]);
      o.push(h.ligne(xa, ya, z.l, ya, CHAINE));
      o.push(h.ligne(xa - 0.2 * s, ya, xa + 1.1 * s, ya, h.a.contour), h.ligne(xb - 1.1 * s, ya, xb + 0.2 * s, ya, h.a.contour));
      return o.join('\n');
    },
    renvois: z => {
      const s = echelle1(z), oy = HAUT, cx = z.l / 2 - 8;
      const { T } = cadre(s, cx, oy);
      return [
        { n: 5, rond: [cx - 9 * s - 6, oy + 6], cible: T([-1.2, -0.3]), texte: 'le nez sur la pointe' },
        { n: 6, rond: [cx + 9 * s + 10, oy + s * 26], cible: T([2.1, 30]), texte: 'cuir dehors, sans étirer' },
        { n: 7, rond: [cx - 9 * s - 6, oy + s * 72], cible: T([-5.75, 73.5]), texte: 'broquettes de chaque côté' },
        { n: 8, rond: [cx + 9 * s + 10, oy + s * 82], cible: T([1.3, 88]), texte: 'tirée à mi-séchage' },
        { n: 9, rond: [cx - 9 * s - 14, oy + s * 97], cible: T([-5.9, 95]), texte: 'plus longue que la peau' },
      ];
    },
  };

  const geomCoupe = z => {
    const s1 = echelle1(z), yc = HAUT + s1 * yB;
    const sC = Math.min((z.l - 36) / 13.6, 15);
    return { sC, yc, cx: z.l / 2 + 4 };
  };
  const vueCoupe = {
    titre: 'En travers, au trait de coupe',
    dessin: z => {
      const { sC, yc, cx } = geomCoupe(z);
      const { P } = cadre(sC, cx, yc);
      const bois = stade(W, 1);
      const caleR = [[-CX, CY0 - 0.05], [CX, CY0 - 0.05], [CX, CY1 - 0.12], [CX - 0.12, CY1], [-CX + 0.12, CY1], [-CX, CY1 - 0.12]];
      const env = enveloppe(bois.concat(caleR));
      const poil = sensHoraire(arrondi(env, 1.1)), cuir = arrondi(env, 1.45);
      const o = [];
      o.push(h.ligne(0, yc, cx - 7.4 * sC, yc, CHAINE));
      o.push(h.chemin(P(cuir), h.a.blanc, true), h.chemin(P(cuir), h.a.arete, true), h.chemin(P(poil), h.a.arete, true));
      const versBois = q => {
        const c = [Math.min(Math.max(q[0], -(W - 1)), W - 1), 0], d = Math.hypot(q[0] - c[0], q[1] - c[1]) || 1;
        const a = [c[0] + (q[0] - c[0]) / d, c[1] + (q[1] - c[1]) / d];
        const b = [Math.min(Math.max(q[0], -CX), CX), Math.min(Math.max(q[1], CY0), CY1)];
        return Math.hypot(q[0] - a[0], q[1] - a[1]) < Math.hypot(q[0] - b[0], q[1] - b[1]) ? a : b;
      };
      o.push(...pelage(P, poil, versBois, q => dansPlanche(q, W + 0.08, 1.08) || (Math.abs(q[0]) <= CX + 0.08 && q[1] >= 0.9 && q[1] <= CY1 + 0.08), 0.33, 0.5));
      o.push(h.chemin(P(bois), h.a.hachure('bois'), true), h.chemin(P(bois), h.a.contour, true));
      o.push(h.chemin(P(caleR), h.a.hachure('bois'), true), h.chemin(P(caleR), h.a.contour, true));
      return o.join('\n');
    },
    renvois: z => {
      const { sC, yc, cx } = geomCoupe(z);
      const { T } = cadre(sC, cx, yc);
      return [
        { n: 10, rond: [cx + 3 * sC, yc - 5.4 * sC], cible: T([2.4, -2.3]), texte: 'le cuir, dehors' },
        { n: 11, rond: [cx - 3.2 * sC, yc - 5.4 * sC], cible: T([-3.6, -1.6]), texte: 'le poil, contre le bois' },
        { n: 12, rond: [cx + 1.6 * sC, yc + 5.2 * sC], cible: T([0.6, 1.4]), texte: 'la cale donne le jeu' },
        { n: 13, rond: [cx - 3.8 * sC, yc + 5.2 * sC], cible: T([-3.2, 0.3]), texte: 'la planche' },
      ];
    },
  };

  // rangée 2 : la peau montée, du nez au ventre, à la même échelle pour les trois
  const Y2 = 64;
  const geom2 = z => {
    const s = Math.min((z.h - 16) / (Y2 + 1.5), (z.l - 50) / 16);
    return { s, cx: z.l / 2 + 8, oy: 8 + 0.9 * s };
  };
  const vuePartielle = (etat) => ({
    titre: { lache: 'Raté : trop lâche', juste: 'Juste', tendue: 'Raté : trop tendue' }[etat],
    dessin: z => {
      const { s, cx, oy } = geom2(z);
      const { P } = cadre(s, cx, oy);
      const o = [];
      let droite;
      if (etat === 'lache') droite = peauHaut(y => 1.5 + 0.3 * Math.sin(0.38 * y + 0.8) + 0.12 * Math.sin(1.3 * y), Y2);
      else if (etat === 'juste') droite = peauHaut(0.9, Y2);
      else droite = peauHaut(0.42, Y2);
      const pc = peauCoupee(P, droite, Y2);
      o.push(pc.fond);
      if (etat === 'tendue') {                     // le bois qu'on voit au travers
        for (const k of [-0.2, 0.28, 0.66, 0.98]) {
          const ys = []; for (let y = 27; y <= 55; y += 1) ys.push([k * wAt(y), y]);
          o.push(h.chemin(P(ys), 'fill="none" stroke="#000" stroke-width="0.5" stroke-dasharray="1.4 2"'));
        }
        const dech = lisse([[3.3, 39.5], [3.95, 43], [4.0, 46.5], [3.5, 50.5]], [3.1, 36], [3.1, 53], 6);
        const dech2 = lisse([[3.5, 50.5], [3.05, 47], [3.0, 43.2], [3.3, 39.5]], [3.4, 53], [3.4, 36], 6);
        const dd = dech.concat(dech2.slice(1));
        o.push(h.chemin(P(dd), h.a.blanc, true), h.chemin(P(dd), h.a.arete, true));
      }
      o.push(...pc.bord);
      o.push(...manche(P, 1), ...manche(P, -1), ...yeux(P));
      if (etat === 'lache') {                      // les plis de la peau qui pend
        const w = y => wAt(y) + 1.4;
        for (const y of [17, 27, 38, 49]) {
          o.push(h.chemin(P(lisse([[-w(y) + 0.5, y], [-w(y) * 0.45, y + 1.9], [0, y + 2.5], [w(y) * 0.45, y + 2.1], [w(y) - 0.5, y + 0.4]])), h.a.detail));
        }
        for (const [y, k] of [[21, 1], [32, -1], [43, 1], [55, -1], [58, 1]]) {
          const x0 = k * (w(y) - 0.3);
          o.push(h.chemin(P(lisse([[x0, y], [x0 - k * 1.3, y + 1.6], [x0 - k * 2.6, y + 2.4]])), h.a.detail));
        }
      }
      return o.join('\n');
    },
    renvois: z => {
      const { s, cx, oy } = geom2(z);
      const { T } = cadre(s, cx, oy);
      if (etat === 'lache') return [{ n: 14, rond: [cx + 8 * s + 6, oy + s * 30], cible: T([wAt(38) * 0.5, 40.2]), texte: 'elle sèche fripée' }];
      if (etat === 'juste') return [{ n: 15, rond: [cx + 8 * s + 6, oy + s * 30], cible: T([wAt(34) + 0.9, 34]), texte: 'sans pli, sans transparence' }];
      return [{ n: 16, rond: [cx + 8 * s + 6, oy + s * 30], cible: T([3.95, 45]), texte: 'zone translucide, déchirure' }];
    },
  });

  // le détail : le bout droit d'une planche à arêtes vives, coupée en travers
  const X0 = W - 3.6;
  const geomArete = z => {
    const sD = Math.min((z.l - 26) / (W + 0.6 - X0), (z.h - 70) / 4.8);
    return { sD, ox: 10 - sD * X0, cy: z.h / 2 + 8 };
  };
  const vueArete = {
    titre: 'Raté : arête vive',
    dessin: z => {
      const { sD, ox, cy } = geomArete(z);
      const { P } = cadre(sD, ox, cy);
      const t = 1;
      // le cuir tendu d'un coin à l'autre : le poil écrasé sur la rive, le cuir cassé net au coin
      const demi = (eFace, eCoin, eRive) => lisse([[X0, -t - eFace], [W - 2, -t - eFace * 0.93], [W - 0.9, -t - eFace * 0.7],
        [W + eCoin, -t - eCoin]], [X0 - 1, -t - eFace], [W + eCoin + 0.6, -t - eCoin + 0.4], 6).concat([[W + eRive, 0]]);
      const tour = (a, b, c) => { const d = demi(a, b, c); return d.concat(d.slice(0, -1).reverse().map(([x, y]) => [x, -y])); };
      const poil = tour(1.1, 0.1, 0.13), cuir = tour(1.45, 0.4, 0.44);
      const bois = [[X0, -t], [W, -t], [W, t], [X0, t]];
      const o = [];
      o.push(h.chemin(P(cuir), h.a.blanc, true));
      o.push(...pelage(P, poil, q => [Math.min(Math.max(q[0], X0), W), Math.min(Math.max(q[1], -t), t)],
        q => q[0] <= W + 0.08 && Math.abs(q[1]) <= t + 0.08, 0.25, 0.42, q => q[0] > X0 + 0.15));
      o.push(h.chemin(P(bois), h.a.hachure('bois', 'aucun'), true));
      o.push(h.chemin(P([[X0, -t], [W, -t], [W, t], [X0, t]]), h.a.contour));
      o.push(h.chemin(P(cuir), h.a.arete), h.chemin(P(poil), h.a.arete));
      // la cassure à gauche
      const cass = [];
      for (let i = 0; i <= 10; i++) cass.push([X0 + (i % 2 ? 0.12 : -0.05), -2.5 + i * 0.5]);
      o.push(h.chemin(P(cass), h.a.detail));
      return o.join('\n');
    },
    renvois: z => {
      const { sD, ox, cy } = geomArete(z);
      const { T } = cadre(sD, ox, cy);
      return [{ n: 17, rond: [z.l - 14, cy - 3.3 * sD], cible: T([W + 0.42, -1.42]), texte: 'le coin marque le cuir' }];
    },
  };

  return {
    ref: '55-40',
    titre: 'La planche à tendre une peau en fourreau',
    desc: 'Sept vues. La planche vue de face et sur la rive, alignées : longue, étroite, en pointe arrondie, le fil du bois droit sur toute la longueur, et sa coupe rabattue aux arêtes arrondies ; à côté, la cale mince, à la hauteur où elle se pose. La peau de martre enfilée cuir dehors, à la même échelle : le nez sur la pointe, les pattes avant couchées, les pattes arrière rabattues à la base et fixées de quatre broquettes de part et d’autre de la cale, la cale cachée sous la peau et qui dépasse par le bas pour se tirer à mi-séchage, la planche plus longue que la peau. La coupe en travers de la peau montée : le cuir dehors, le poil en dedans contre le bois, la cale sous une face, la planche. Trois peaux côte à côte : trop lâche et plissée, juste, trop tendue avec le bois qu’on voit au travers et une déchirure. Et le bout d’une planche à arêtes vives, coupé en travers et grossi : le poil écrasé sur la rive, le cuir cassé net au coin, là où il garde la ligne.',
    format: 'pleine',
    disposition: [['planche', 'montee', 'coupe'], ['lache', 'juste', 'tendue', 'arete']],
    hauteurs: [3, 2],
    largeurs: [[5, 4, 4], [1, 1, 1, 1.15]],
    vues: {
      planche: vuePlanche,
      montee: vueMontee,
      coupe: vueCoupe,
      lache: vuePartielle('lache'),
      juste: vuePartielle('juste'),
      tendue: vuePartielle('tendue'),
      arete: vueArete,
    },
  };
};
