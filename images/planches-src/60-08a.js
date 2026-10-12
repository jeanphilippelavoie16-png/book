// Planche 60-08a — la fascine de ruisseau, montée au pieu (ch. 56, variante d'urgence,
// « Le piège fixe au ruisseau ») : le V et sa chambre vus de dessus, la chambre en grand,
// le piquet taillé et durci au feu, le clayonnage de face.
// Aucune cote chiffrée : le chapitre ne donne que « quelques mètres », « la largeur d'une
// main » et « la largeur d'un poing ». La 56-08b porte le chevalet et la version en pierres.

const f = n => Math.round(n * 10) / 10;
const P = (x, y) => `${f(x)} ${f(y)}`;
const BLANC_A = 'fill="#fff" stroke="#000" stroke-width="1.4" stroke-linejoin="round"';

// Points espacés de « pas » le long d'une polyligne, avec la normale à gauche du trajet.
const lePong = (poly, pas, debut = 0) => {
  const out = [];
  let t0 = debut;
  for (let i = 1; i < poly.length; i++) {
    const [ax, ay] = poly[i - 1], [bx, by] = poly[i];
    const L = Math.hypot(bx - ax, by - ay);
    if (!L) continue;
    const ux = (bx - ax) / L, uy = (by - ay) / L;
    let t = t0;
    while (t <= L + 1e-6) { out.push({ x: ax + ux * t, y: ay + uy * t, nx: -uy, ny: ux }); t += pas; }
    t0 = t - L;
  }
  return out;
};
// Courbe lisse (Catmull-Rom) passant par les points.
const lisse = pts => {
  let d = `M ${P(...pts[0])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(i - 1, 0)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(i + 2, pts.length - 1)];
    d += ` C ${P(p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6)} ` +
      `${P(p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)} ${P(...p2)}`;
  }
  return d;
};
const arcPts = (cx, cy, R, a1, a2, n) =>
  Array.from({ length: n + 1 }, (_, i) => { const a = a1 + (a2 - a1) * i / n; return [cx + R * Math.cos(a), cy + R * Math.sin(a)]; });
const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

module.exports = (h) => {
  // Un poisson de profil, tête vers +x, tourné de a degrés autour de (x, y).
  const poisson = (x, y, lg, a = 0) => {
    const c = Math.cos(a * Math.PI / 180), s = Math.sin(a * Math.PI / 180);
    const p = (u, v) => `${f(x + u * lg * c - v * lg * s)} ${f(y + u * lg * s + v * lg * c)}`;
    const d = `M ${p(0.5, 0)} Q ${p(0.12, -0.24)} ${p(-0.3, -0.07)} L ${p(-0.5, -0.2)} L ${p(-0.41, 0)} ` +
      `L ${p(-0.5, 0.2)} L ${p(-0.3, 0.07)} Q ${p(0.12, 0.24)} ${p(0.5, 0)} Z`;
    const [ox, oy] = p(0.3, -0.03).split(' ').map(Number);
    return h.path(d, 'fill="#fff" stroke="#000" stroke-width="1.4" stroke-linejoin="round"') + '\n' +
      h.cercle(ox, oy, 1.3, h.a.plein);
  };

  // Un mur de clayonnage vu de dessus, en grand : les piquets et deux brins qui se croisent.
  const murPlan = (poly, pas, amp, rp) => {
    const pts = lePong(poly, pas);
    const out = [];
    for (const s of [1, -1]) {
      const w = pts.map((p, i) => { const k = s * (i % 2 ? 1 : -1) * amp; return [p.x + p.nx * k, p.y + p.ny * k]; });
      out.push(h.path(lisse(w), h.a.arete));
    }
    for (const p of pts) out.push(h.cercle(p.x, p.y, rp, h.a.plein));
    return out.join('\n');
  };

  // ─── Vu de dessus : le V dans le chenal ───
  const gPlan = z => {
    const cy = z.h / 2, xm = z.l * 0.62;
    const g = x => Math.exp(-(((x - xm) / (z.l * 0.26)) ** 2));
    const yT = x => 12 + 26 * g(x) + 3 * Math.sin(x / 23);
    const yB = x => z.h - 12 - 26 * g(x) + 3 * Math.sin(x / 19 + 1);
    const Rc = Math.min(z.h * 0.16, 36);
    const C = [z.l * 0.56 + Rc, cy];
    const de = Math.asin(4 / Rc);
    const E1 = [C[0] + Rc * Math.cos(Math.PI + de), cy + Rc * Math.sin(Math.PI + de)];
    const E2 = [C[0] + Rc * Math.cos(Math.PI - de), cy + Rc * Math.sin(Math.PI - de)];
    const x0 = z.l * 0.16;
    const S1 = [x0, yT(x0) - 6], S2 = [x0, yB(x0) + 6];
    return { cy, xm, yT, yB, Rc, C, de, E1, E2, S1, S2 };
  };
  const plan = z => {
    const { cy, yT, yB, Rc, C, de, E1, E2, S1, S2 } = gPlan(z);
    const out = [];
    const haut = [], bas = [];
    for (let x = 0; x <= z.l + 0.1; x += 8) { haut.push([x, yT(x)]); bas.push([x, yB(x)]); }
    out.push(h.chemin([...haut, [z.l, 0], [0, 0]], h.a.hachure('terre', 'aucun'), true));
    out.push(h.chemin([...bas, [z.l, z.h], [0, z.h]], h.a.hachure('terre', 'aucun'), true));
    out.push(h.chemin(haut, h.a.arete));
    out.push(h.chemin(bas, h.a.arete));
    // le courant, en amont et à travers le clayonnage
    for (const [x, y] of [[16, cy - 46], [16, cy + 46], [30, cy]])
      out.push(h.fleche(`M ${P(x, y)} L ${P(x + 46, y)}`, h.a.detail));
    for (const [x, y] of [[C[0] + Rc + 22, cy - 18], [C[0] + Rc + 22, cy + 18]])
      out.push(h.fleche(`M ${P(x, y)} L ${P(x + 36, y)}`, h.a.detail));
    // les deux lignes, la chambre, l'entonnoir
    const cercle = arcPts(C[0], cy, Rc, Math.PI + de, 3 * Math.PI - de, 60);
    const W1 = [C[0] - Rc * 0.1, cy - 2.5], W2 = [C[0] - Rc * 0.1, cy + 2.5];
    for (const poly of [[S1, E1], [S2, E2], cercle]) out.push(h.chemin(poly, h.a.contour));
    out.push(h.chemin([E1, W1], h.a.arete), h.chemin([E2, W2], h.a.arete));
    for (const poly of [[S1, E1], [S2, E2], cercle]) for (const p of lePong(poly, 7)) out.push(h.cercle(p.x, p.y, 2.2, h.a.plein));
    // le poisson descend, bute sur la paroi, la suit jusqu'à la chambre
    const L1 = Math.hypot(E1[0] - S1[0], E1[1] - S1[1]);
    const u = [(E1[0] - S1[0]) / L1, (E1[1] - S1[1]) / L1], n = [-u[1], u[0]];
    const le = t => [S1[0] + u[0] * L1 * t + n[0] * 10, S1[1] + u[1] * L1 * t + n[1] * 10];
    const a0 = le(0.34), a1 = le(0.93);
    out.push(h.fleche(`M ${P(...a0)} L ${P(...a1)} Q ${P(E1[0] + 4, cy)} ${P(C[0] - 4, cy + 1)}`, h.a.cache));
    const ang = Math.atan2(u[1], u[0]) * 180 / Math.PI;
    const pf = [S1[0] + u[0] * L1 * 0.24 + n[0] * 15, S1[1] + u[1] * L1 * 0.24 + n[1] * 15];
    out.push(poisson(pf[0], pf[1], 20, ang));
    return out.join('\n');
  };
  const planRenvois = z => {
    const { cy, xm, yT, Rc, C, E1, E2, S1, S2 } = gPlan(z);
    const m2 = lerp(S2, E2, 0.42);
    const L1 = Math.hypot(E1[0] - S1[0], E1[1] - S1[1]);
    const u = [(E1[0] - S1[0]) / L1, (E1[1] - S1[1]) / L1], n = [-u[1], u[0]];
    const pc = [S1[0] + u[0] * L1 * 0.6 + n[0] * 10, S1[1] + u[1] * L1 * 0.6 + n[1] * 10];
    const a = Math.PI * 0.3;
    return [
      { n: 1, rond: [m2[0] - 8, m2[1] - 26], cible: [m2[0] - 1, m2[1] - 3], texte: 'le V ouvert vers l’amont' },
      { n: 2, rond: [pc[0] - 4, pc[1] + 30], cible: [pc[0], pc[1] + 1], texte: 'le poisson longe la paroi' },
      { n: 3, rond: [C[0] + Rc + 30, cy + Rc + 6], cible: [C[0] + Rc * Math.cos(a) + 2, cy + Rc * Math.sin(a) + 2], texte: 'chambre au sommet du V' },
      { n: 4, rond: [C[0] + Rc + 112, cy - 2], cible: [C[0] + Rc + 40, cy],  texte: 'un chenal où tout passe' },
    ];
  };

  // ─── La chambre, de dessus, en grand ───
  const gCh = z => {
    const cy = z.h / 2, R = z.h / 2 - 12, cx = z.l - R - 18;
    const de = Math.asin(20 / R);
    const E1 = [cx + R * Math.cos(Math.PI + de), cy + R * Math.sin(Math.PI + de)];
    const E2 = [cx + R * Math.cos(Math.PI - de), cy + R * Math.sin(Math.PI - de)];
    const W1 = [cx - R * 0.1, cy - 5], W2 = [cx - R * 0.1, cy + 5];
    const S1 = [4, cy - R * 0.92], S2 = [4, cy + R * 0.92];
    return { cy, R, cx, de, E1, E2, W1, W2, S1, S2, rp: R - 13 };
  };
  const chambre = z => {
    const { cy, R, cx, de, E1, E2, W1, W2, S1, S2, rp } = gCh(z);
    const out = [];
    const cercle = arcPts(cx, cy, R, Math.PI + de, 3 * Math.PI - de, 90);
    out.push(murPlan([S1, E1], 11, 2.6, 2.6));
    out.push(murPlan([S2, E2], 11, 2.6, 2.6));
    out.push(murPlan(cercle, 11, 2.6, 2.6));
    out.push(murPlan([E1, W1], 10, 2.4, 2.4));
    out.push(murPlan([E2, W2], 10, 2.4, 2.4));
    // entrée : il suit la paroi, passe l'entonnoir et ressort par le trou au centre
    const L1 = Math.hypot(E1[0] - S1[0], E1[1] - S1[1]);
    const u = [(E1[0] - S1[0]) / L1, (E1[1] - S1[1]) / L1], n = [-u[1], u[0]];
    const le = t => [S1[0] + u[0] * L1 * t + n[0] * 11, S1[1] + u[1] * L1 * t + n[1] * 11];
    const b0 = le(0.3), b1 = le(0.9);
    out.push(h.fleche(`M ${P(...b0)} L ${P(...b1)} Q ${P(E1[0] + 18, cy - 12)} ${P(W1[0] - 6, cy)} L ${P(cx + 14, cy)}`, h.a.cache));
    const pf = [S1[0] + u[0] * L1 * 0.16 + n[0] * 24, S1[1] + u[1] * L1 * 0.16 + n[1] * 24];
    out.push(poisson(pf[0], pf[1], 24, Math.atan2(u[1], u[0]) * 180 / Math.PI));
    // dedans : il tourne sur le pourtour
    const a1 = -Math.PI * 0.22, a2 = Math.PI * 0.8;
    const q = a => [cx + rp * Math.cos(a), cy + rp * Math.sin(a)];
    out.push(h.fleche(`M ${P(...q(a1))} A ${f(rp)} ${f(rp)} 0 0 1 ${P(...q(a2))}`, h.a.cache));
    const pq = q(-Math.PI * 0.5);
    out.push(poisson(pq[0], pq[1], 24, 0));
    const pr = q(Math.PI * 0.3);
    out.push(poisson(pr[0], pr[1], 22, 144));
    return out.join('\n');
  };
  const chambreRenvois = z => {
    const { cy, R, cx, E1, W1, W2, rp } = gCh(z);
    const mw = lerp(E1, W1, 0.55);
    const ar = Math.PI * 0.08, ac = -Math.PI * 0.2;
    return [
      { n: 5, rond: [E1[0] - 52, cy + 8], cible: [E1[0] - 3, cy + 2], texte: 'ouverture étroite' },
      { n: 6, rond: [mw[0] + 22, cy - R * 0.42], cible: [mw[0] + 1, mw[1] - 4], texte: 'deux ailes, presque fermées' },
      { n: 7, rond: [W1[0] + 18, cy + 34], cible: [W2[0] + 3, cy + 1], texte: 'le trou, au centre' },
      { n: 8, rond: [cx + R * 0.48, cy + R * 0.2], cible: [cx + rp * Math.cos(ar) - 2, cy + rp * Math.sin(ar)], texte: 'il tourne sur le pourtour' },
      { n: 9, rond: [z.l - 10, 12], cible: [cx + R * Math.cos(ac) + 2, cy + R * Math.sin(ac) - 2], texte: 'enclos fermé, en clayonnage' },
    ];
  };

  // ─── Le piquet ───
  const gPq = z => {
    const xc = z.l * 0.24, w = 22, yT = 16, yP = z.h - 86, yK = z.h - 14;
    // demi-largeur de la pointe (bézier quadratique du bord)
    const hw = y => {
      if (y <= yP) return w / 2;
      let lo = 0, hi = 1;
      for (let i = 0; i < 30; i++) {
        const s = (lo + hi) / 2, ys = (1 - s) ** 2 * yP + 2 * (1 - s) * s * (yP + 34) + s * s * yK;
        if (ys < y) lo = s; else hi = s;
      }
      return (w / 2) * (1 - lo * lo);
    };
    const yg = z.h - 14, xk = z.l * 0.6, w2 = 16;
    const K = [xk - 12, yg - 12];
    const xs = z.l - 40, S = [xs, yg - 23 - w2 / 2];
    const Ls = Math.hypot(S[0] - K[0], S[1] - K[1]);
    const T = [S[0] + (S[0] - K[0]) / Ls * 26, S[1] + (S[1] - K[1]) / Ls * 26];
    return { xc, w, yT, yP, yK, hw, yg, xk, T, K, xs, w2 };
  };
  const piquet = z => {
    const { xc, w, yT, yP, yK, hw, yg, xk, T, K, xs, w2 } = gPq(z);
    const out = [];
    // 1. Le piquet taillé : fût, pointe à facettes, bout noirci
    let s = 7;
    const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280;
    const bord = `M ${P(xc - w / 2, yT)} L ${P(xc - w / 2, yP)} Q ${P(xc - w / 2, yP + 34)} ${P(xc, yK)} ` +
      `Q ${P(xc + w / 2, yP + 34)} ${P(xc + w / 2, yP)} L ${P(xc + w / 2, yT)}`;
    const A = [xc - w / 2, yP], B = [xc + w / 2, yP - 6], Tp = [xc + 1, yK];
    const F1 = [xc - 3, yP + 12], F2 = [xc + 5, yP + 3];
    const pointe = [A, Tp, B];
    out.push(h.path(`M ${P(xc - w / 2, yT)} L ${P(...A)} L ${P(...Tp)} L ${P(...B)} L ${P(xc + w / 2, yT)} Z`, h.a.blanc));
    // le bois brûlé : aplat noir sur le dernier tiers, taches qui s'éclaircissent vers le fût
    const yN = yK - (yK - yP) * 0.36, yE = yK - (yK - yP) * 0.62;
    const xg = y => A[0] + (Tp[0] - A[0]) * (y - A[1]) / (Tp[1] - A[1]);
    const xd = y => B[0] + (Tp[0] - B[0]) * (y - B[1]) / (Tp[1] - B[1]);
    let dn = `M ${P(xg(yN), yN)}`;
    for (let k = 1; k <= 6; k++) { const x = xg(yN) + (xd(yN) - xg(yN)) * k / 6; dn += ` L ${P(x, yN + (k % 2 ? -2.5 : 1.5))}`; }
    dn += ` L ${P(...Tp)} Z`;
    out.push(h.path(dn, 'fill="#000" stroke="#000" stroke-width="0.8" stroke-linejoin="round"'));
    for (let y = yE; y < yN - 1; y += 3.2) {
      const t = (y - yE) / (yN - yE);
      for (let x = xg(y) + 1.5; x < xd(y) - 1.5; x += 2.2 + rnd() * 2) if (rnd() < 0.15 + 0.75 * t) {
        const r = 0.5 + t * 1.1 + rnd() * 0.5; out.push(h.ellipse(x, y, r * 1.3, r * 0.8, h.a.plein));
      }
    }
    // gerçures blanches
    for (const [y0, x0, l] of [[yN + 5, -4, 7], [yN + 11, 1, 6], [yN + 17, -2, 4], [yN + 23, 0, 3], [yN + 8, 3, 3]]) {
      const x = xc + x0;
      out.push(h.path(`M ${P(x - l / 2, y0)} L ${P(x - l / 6, y0 + 1.2)} L ${P(x + l / 6, y0 - 0.8)} L ${P(x + l / 2, y0 + 0.6)}`, 'fill="none" stroke="#fff" stroke-width="0.9"'));
    }
    // l'écorce sur le fût
    for (const dx of [-5, 1, 6]) {
      let d = `M ${P(xc + dx, yT + 8)}`;
      for (let y = yT + 20; y < yP - 14; y += 12) d += ` L ${P(xc + dx + (y % 24 ? 0.8 : -0.8), y)}`;
      out.push(h.path(d, h.a.fin));
    }
    out.push(h.path(`M ${P(xc - w / 2, yT)} L ${P(...A)} L ${P(...Tp)} L ${P(...B)} L ${P(xc + w / 2, yT)}`, h.a.contour));
    out.push(h.ellipse(xc, yT, w / 2, 3.6, BLANC_A));
    // les facettes de hache : arêtes nettes
    out.push(h.path(`M ${P(...A)} L ${P(...F1)} L ${P(...F2)} L ${P(...B)}`, h.a.arete));
    out.push(h.path(`M ${P(...F1)} L ${P(...Tp)} M ${P(...F2)} L ${P(...Tp)}`, h.a.arete));
    // 2. La pointe dans la braise, le piquet posé sur une pierre
    const L = Math.hypot(T[0] - K[0], T[1] - K[1]);
    const u = [(K[0] - T[0]) / L, (K[1] - T[1]) / L], nn = [-u[1], u[0]];
    const lp = 30;
    const at = (t, k) => [T[0] + u[0] * t + nn[0] * k, T[1] + u[1] * t + nn[1] * k];
    const pierre = [];
    for (let k = 0; k < 10; k++) { const a = Math.PI + k * Math.PI / 9; pierre.push([xs + 17 * Math.cos(a) * (1 + 0.08 * Math.sin(3 * a)), yg + 23 * Math.sin(a) * (0.92 + 0.08 * Math.cos(2 * a))]); }
    out.push(h.chemin(pierre, h.a.hachure('pierre', 'arete'), true));
    const braise = (x, y, r, noir) => {
      const pts = [];
      for (let k = 0; k < 7; k++) { const a = k * 2 * Math.PI / 7 + rnd() * 0.4; const rr = r * (0.75 + rnd() * 0.35); pts.push([x + rr * 1.3 * Math.cos(a), y + rr * 0.7 * Math.sin(a)]); }
      pts.push(pts[0]);
      const d = lisse(pts) + ' Z';
      if (noir) return h.path(d, 'fill="#000" stroke="#999" stroke-width="1.6"') + '\n' + h.path(d, 'fill="none" stroke="#000" stroke-width="0.5"');
      return h.path(d, 'fill="#fff" stroke="#000" stroke-width="1.1"') + '\n' +
        h.path(`M ${P(x - r * 0.6, y - r * 0.1)} L ${P(x - r * 0.1, y + r * 0.2)} L ${P(x + r * 0.4, y - r * 0.15)}`, h.a.fin);
    };
    out.push(h.ligne(z.l * 0.4, yg, z.l - 4, yg, h.a.arete));
    // rang arrière
    [[-30, 6, 1], [-14, 7, 0], [4, 6, 1], [20, 7, 0], [34, 5, 1]].forEach(([dx, r, n]) => out.push(braise(xk + dx, yg - 13, r, n)));
    // le piquet, son bout noirci dans la braise
    out.push(h.chemin([at(0, -w2 / 2), at(L - lp, -w2 / 2), [K[0], K[1]], at(L - lp, w2 / 2), at(0, w2 / 2)], BLANC_A, true));
    out.push(h.chemin([at(L - lp - 4, -w2 / 2), at(L - lp, -w2 / 2), [K[0], K[1]], at(L - lp, w2 / 2), at(L - lp - 4, w2 / 2)], 'fill="#000" stroke="#000" stroke-width="1"', true));
    const bout = [];
    for (let k = 0; k < 16; k++) { const a = k * Math.PI / 8; bout.push(at(3.2 * Math.cos(a), (w2 / 2) * Math.sin(a))); }
    out.push(h.chemin(bout, BLANC_A, true));
    // rang avant
    [[-36, 6, 0], [-22, 7, 1], [-6, 8, 0], [11, 7, 1], [27, 7, 0], [40, 5, 1]].forEach(([dx, r, n]) => out.push(braise(xk + dx, yg - 5, r, n)));
    // la chaleur
    for (const dx of [-30, -2, 26]) {
      const x = xk + dx, y = yg - 24;
      out.push(h.path(`M ${P(x, y)} q 4 -5 0 -10 t 0 -10`, h.a.detail));
    }
    return out.join('\n');
  };
  const piquetRenvois = z => {
    const { xc, w, yP, yg, xk } = gPq(z);
    return [
      { n: 10, rond: [xc + w / 2 + 26, yP - 20], cible: [xc + 4, yP + 20], texte: 'pointe taillée en biseau' },
      { n: 11, rond: [xk - 44, yg - 52], cible: [xk - 18, yg - 15], texte: 'pointe durcie au feu' },
    ];
  };

  // ─── Le clayonnage, de face ───
  const gCl = z => {
    const yt = 64, ys = 78, yb = z.h - 40, dy = 8, yS = 50;
    const x0 = 44, sp = 42;
    const N = Math.floor((z.l - 2 * x0) / sp);
    const dec = ((z.l - 2 * x0) - N * sp) / 2;
    const xs = Array.from({ length: N + 1 }, (_, i) => x0 + dec + i * sp);
    const K = Math.round((yb - yt) / dy);
    const xhc = (xs[Math.floor(N * 0.6)] + xs[Math.floor(N * 0.6) + 1]) / 2;
    const yF = x => yb + 1.4 + 1.2 * Math.sin(x / 17) + 17 * Math.exp(-(((x - xhc) / (sp * 0.95)) ** 4));
    const rowY = k => yb - (k + 1) * dy;          // haut du rang k (0 = au fond)
    const Kr = K - 5;                             // à droite, les rangs du haut ne sont pas encore tressés
    const finRang = k => (k < Kr ? z.l + 20 : (k % 2 ? xs[N - 2] + 7 : xs[N - 3] + 9));
    return { yt, ys, yb, dy, yS, xs, N, K, xhc, yF, rowY, Kr, finRang, sp };
  };
  const clayonnage = z => {
    const { ys, dy, yS, xs, N, K, xhc, yF, rowY, finRang, sp } = gCl(z);
    const out = [];
    // la surface de l'eau
    let d = `M 0 ${ys}`;
    for (let x = 0; x < z.l; x += 16) d += ' q 4 -2.5 8 0 t 8 0';
    out.push(h.path(d, h.a.detail));
    // le fond de gravier, avec un creux
    const fond = [];
    for (let x = 0; x <= z.l + 0.1; x += 4) fond.push([x, yF(x)]);
    out.push(h.chemin([...fond, [z.l, z.h], [0, z.h]], h.a.hachure('gravier', 'aucun'), true));
    out.push(h.chemin(fond, h.a.arete));
    // les piquets, la partie enfoncée cachée
    const pw = 4.6;
    for (const x of xs) {
      const yf = yF(x);
      out.push(h.rect(x - pw, yS, 2 * pw, yf - yS, BLANC_A));
      out.push(h.ellipse(x, yS, pw, 2, BLANC_A));
      out.push(h.chemin([[x - pw, yf], [x - pw, yf + 8], [x, yf + 18], [x + pw, yf + 8], [x + pw, yf]], h.a.cache));
    }
    // les rangs de branches, une dessus une dessous
    const bande = (xa, xb, y, k) => {
      const out2 = [];
      const y1 = y + 0.7, y2 = y + dy - 0.7, r = (y2 - y1) / 2;
      out2.push(h.path(`M ${P(xa + r, y1)} L ${P(xb - r, y1)} A ${f(r)} ${f(r)} 0 0 1 ${P(xb - r, y2)} L ${P(xa + r, y2)} A ${f(r)} ${f(r)} 0 0 1 ${P(xa + r, y1)} Z`, BLANC_A));
      // là où le brin passe derrière, le piquet repasse devant
      xs.forEach((x, i) => {
        if (x < xa + 2 || x > xb - 2 || (i + k) % 2 === 0) return;
        out2.push(h.rect(x - pw + 0.7, y1 - 1, 2 * pw - 1.4, y2 - y1 + 2, h.a.blanc));
        out2.push(h.ligne(x - pw, y1 - 1, x - pw, y2 + 1, h.a.arete), h.ligne(x + pw, y1 - 1, x + pw, y2 + 1, h.a.arete));
      });
      return out2.join('\n');
    };
    for (let k = 0; k < K; k++) out.push(bande(xs[0] - 14, Math.min(finRang(k), z.l - 6), rowY(k), k));
    // les pierres qui ferment le jour sous le rang du fond
    const yb0 = rowY(0) + dy;
    for (const [dx, rx] of [[-33, 11], [-11, 11], [11, 11], [33, 11]]) {
      const x = xhc + dx, yf = yF(x);
      if (yf - yb0 < 7) continue;
      out.push(h.ellipse(x, (yf + yb0) / 2 + 0.3, rx, (yf - yb0) / 2 + 0.6, BLANC_A));
    }
    // un brin neuf posé sur le dessus, pas encore tassé ; le maillet
    const kN = K;
    out.push(bande(xs[0] - 12, xs[3] + 12, rowY(kN) - 5, kN));
    const xm = (xs[1] + xs[2]) / 2, yh = rowY(kN) - 5 + 0.7;
    // tête couchée à plat sur la branche, entre deux piquets, manche qui monte
    out.push(h.path(`M ${P(xm - 7, yh - 3)} L ${P(xm + 34, yh - 52)} L ${P(xm + 39, yh - 48)} L ${P(xm + 2, yh - 3)}`, BLANC_A));
    out.push(h.rect(xm - 15, yh - 18, 30, 18, BLANC_A));
    out.push(h.ellipse(xm - 15, yh - 9, 3, 9, BLANC_A));
    out.push(h.fleche(`M ${P(xm - 6, yh - 44)} L ${P(xm - 6, yh - 22)}`, h.a.arete));
    return out.join('\n');
  };
  const clayonnageRenvois = z => {
    const { yb, dy, xs, N, xhc, yF, rowY, sp } = gCl(z);
    const xm = (xs[1] + xs[2]) / 2;
    return [
      { n: 12, rond: [xs[3] + 34, 24], cible: [(xs[2] + xs[3]) / 2, rowY(gCl(z).K) - 5 + 4], texte: 'tassées au maillet' },
      { n: 13, rond: [xs[5] + sp / 2 + 20, 20], cible: [xs[5] + sp / 2, rowY(gCl(z).K - 3) + 4], texte: 'une dessus, une dessous' },
      { n: 14, rond: [(xs[N - 1] + xs[N]) / 2, 22], cible: [(xs[N - 1] + xs[N]) / 2, rowY(gCl(z).Kr) - 12], texte: 'piquets à une main d’écart' },
      { n: 15, rond: [xs[2] + 24, z.h - 10], cible: [xs[2] + 2, yF(xs[2]) + 14], texte: 'enfoncé, tient à la poussée' },
      { n: 16, rond: [xs[4] + 20, z.h - 10], cible: [xs[4] - sp / 2, yb - 3], texte: 'pied au fond, partout' },
      { n: 17, rond: [xhc + 62, z.h - 10], cible: [xhc + 24, yF(xhc + 22) - 6], texte: 'pierres qui ferment le jour' },
    ];
  };

  return {
    ref: '60-08a',
    titre: 'La fascine de ruisseau, montée au pieu',
    desc: 'Le piège fixe en V vu de dessus dans un rétrécissement du chenal, avec sa chambre au sommet ; ' +
      'la chambre en grand, entonnoir et trou au centre, le poisson qui tourne sur le pourtour ; ' +
      'le piquet taillé en biseau et sa pointe durcie à la braise ; le clayonnage de face, tassé au maillet, pied au fond et pierres dans le creux.',
    format: 'pleine',
    disposition: [['plan'], ['chambre', 'piquet'], ['clayonnage']],
    hauteurs: [2.3, 2.3, 2.3],
    largeurs: [[1], [2.6, 1.5], [1]],
    vues: {
      plan: { titre: 'Vu de dessus, dans le chenal', dessin: plan, renvois: planRenvois },
      chambre: { titre: 'La chambre, de dessus', dessin: chambre, renvois: chambreRenvois },
      piquet: { titre: 'Le piquet', dessin: piquet, renvois: piquetRenvois },
      clayonnage: { titre: 'Le clayonnage, de face', dessin: clayonnage, renvois: clayonnageRenvois },
    },
  };
};
