// Planche 75-40 — saigner et vider au bord de l'eau ou sur la glace (ch. 75, étapes 8 à 14 ;
// section J : sur la glace, on vide pendant que c'est encore souple, avec les mêmes gestes).
// Rien ici ne se construit : aucune cote. Le chapitre ne donne ni la taille du poisson ni celle
// du couteau ; le poisson dessiné fait 500 mm, seulement pour que les mains soient à l'échelle.
// Le poisson est couché sur le flanc, ventre vers soi (étape 12) : vu de dessus, la tête à
// droite, le ventre en bas, du côté de celui qui travaille.
module.exports = (h) => {
  const A = h.a, F = h.formes;
  const r1 = n => Math.round(n * 10) / 10;
  const f = p => `${r1(p[0])} ${r1(p[1])}`;
  const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const bC = blanc(A.contour), bA = blanc(A.arete);
  const LMM = 500;
  const seg = (a, b, at) => h.path(`M${f(a)} L${f(b)}`, at);
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]], mul = (a, k) => [a[0] * k, a[1] * k];
  const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  const dir = deg => [Math.cos(deg * Math.PI / 180), Math.sin(deg * Math.PI / 180)];

  // Catmull-Rom : la courbe passe par chaque point
  const lisse = (pts, ferme = false) => {
    const n = pts.length, get = i => ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
    let d = `M${f(pts[0])}`;
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = get(i - 1), p1 = get(i), p2 = get(i + 1), p3 = get(i + 2);
      d += ` C${f([p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6])} ${f([p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6])} ${f(p2)}`;
    }
    return ferme ? d + ' Z' : d;
  };
  const suite = pts => lisse(pts).replace(/^M[^C]*/, ' ');
  // la même courbe, échantillonnée (pour poser des points dessus)
  const dense = (pts, k = 8) => {
    const n = pts.length, get = i => pts[Math.max(0, Math.min(n - 1, i))], out = [];
    for (let i = 0; i < n - 1; i++) {
      const p0 = get(i - 1), p1 = get(i), p2 = get(i + 1), p3 = get(i + 2);
      for (let j = 0; j < k; j++) {
        const t = j / k, t2 = t * t, t3 = t2 * t;
        out.push([0, 1].map(c => 0.5 * (2 * p1[c] + (-p0[c] + p2[c]) * t + (2 * p0[c] - 5 * p1[c] + 4 * p2[c] - p3[c]) * t2 + (-p0[c] + 3 * p1[c] - 3 * p2[c] + p3[c]) * t3)));
      }
    }
    out.push(pts[n - 1]);
    return out;
  };

  // ─── le poisson, en fractions de sa longueur : u de la bouche (0) au bout de la queue (1),
  //     v vers le ventre ─────────────────────────────────────────────────────────────────
  const DOS = dense([[0, 0.012], [0.02, -0.018], [0.05, -0.045], [0.09, -0.07], [0.14, -0.092], [0.2, -0.108], [0.28, -0.12],
    [0.36, -0.125], [0.46, -0.12], [0.56, -0.105], [0.66, -0.083], [0.76, -0.06], [0.84, -0.046], [0.875, -0.043]]);
  const VEN = dense([[0, 0.012], [0.02, 0.03], [0.05, 0.046], [0.1, 0.063], [0.16, 0.079], [0.2, 0.088], [0.27, 0.1],
    [0.36, 0.106], [0.46, 0.105], [0.55, 0.097], [0.63, 0.085], [0.7, 0.07], [0.76, 0.058], [0.84, 0.046], [0.875, 0.043]]);
  const interp = (T, u) => {
    for (let i = 1; i < T.length; i++) if (u <= T[i][0]) {
      const [u0, v0] = T[i - 1], [u1, v1] = T[i];
      return u1 === u0 ? v1 : v0 + (v1 - v0) * (u - u0) / (u1 - u0);
    }
    return T[T.length - 1][1];
  };
  const dos = u => interp(DOS, u), ven = u => interp(VEN, u);
  // le bord arrière de l'opercule, de la nuque à l'isthme
  const OPER = dense([[0.142, -0.08], [0.168, -0.062], [0.186, -0.025], [0.188, 0.02], [0.177, 0.058], [0.162, 0.079]], 6);
  const PREOP = [[0.112, -0.062], [0.125, -0.02], [0.123, 0.03], [0.108, 0.062]];
  const U_ANUS = 0.63, U_ISTHME = 0.162;

  // o : { xs (bouche), yc (axe), L, u1 (vue coupée à u1, ligne de rupture), pectorale, lateral }
  const poisson = o => {
    const { xs, yc, L } = o, coupe = !!o.u1, u1 = o.u1 || 0.875;
    const P = (u, v) => [xs - u * L, yc + v * L];
    const Q = pts => pts.map(([u, v]) => P(u, v));
    const out = [];
    const nag = (d, rayons) => { out.push(h.path(d, bA)); rayons.forEach(([a, b]) => out.push(seg(P(...a), P(...b), A.fin))); };
    const M = (...pts) => pts.map(p => f(P(...p)));
    if (!coupe) {
      // dorsale
      const [a, b, c, d, e, g, i, j] = M([0.362, -0.117], [0.39, -0.2], [0.402, -0.21], [0.422, -0.195], [0.45, -0.162], [0.476, -0.142], [0.483, -0.111], [0.476, -0.142]);
      nag(`M${a} L${b} Q${c} ${d} Q${e} ${g} L${i} Z`,
        [0, 1, 2, 3, 4].map(k => [[0.372 + k * 0.022, dos(0.372 + k * 0.022) + 0.004], [0.394 + k * 0.019, -0.197 + k * 0.012 + (k > 1 ? (k - 1) * 0.004 : 0)]]));
      // adipeuse
      out.push(h.path(`M${f(P(0.742, -0.052))} Q${f(P(0.75, -0.088))} ${f(P(0.768, -0.085))} Q${f(P(0.782, -0.078))} ${f(P(0.79, -0.047))} Z`, bA));
      // anale
      nag(`M${f(P(0.652, 0.074))} L${f(P(0.672, 0.146))} Q${f(P(0.684, 0.158))} ${f(P(0.698, 0.148))} Q${f(P(0.718, 0.112))} ${f(P(0.746, 0.08))} L${f(P(0.748, 0.05))} Z`,
        [0, 1, 2, 3].map(k => [[0.662 + k * 0.022, ven(0.662 + k * 0.022) - 0.004], [0.676 + k * 0.018, 0.14 - k * 0.018]]));
      // pelvienne
      nag(`M${f(P(0.462, 0.097))} L${f(P(0.5, 0.152))} Q${f(P(0.512, 0.165))} ${f(P(0.524, 0.15))} L${f(P(0.512, 0.096))} Z`,
        [[[0.475, 0.104], [0.503, 0.148]], [[0.492, 0.104], [0.515, 0.15]]]);
      // caudale
      nag(`M${f(P(0.86, -0.03))} L${f(P(0.875, -0.043))} L${f(P(0.9, -0.052))} Q${f(P(0.95, -0.085))} ${f(P(0.998, -0.13))}`
        + ` Q${f(P(0.972, -0.062))} ${f(P(0.955, 0))} Q${f(P(0.972, 0.062))} ${f(P(0.998, 0.13))}`
        + ` Q${f(P(0.95, 0.085))} ${f(P(0.9, 0.052))} L${f(P(0.875, 0.043))} L${f(P(0.86, 0.03))} Z`,
        [-1, -0.6, -0.25, 0.25, 0.6, 1].map(k => [[0.888, 0.03 * k], [0.99 - 0.03 * (1 - Math.abs(k)), 0.118 * k]]));
    }
    // le corps
    const dosV = DOS.filter(p => p[0] < u1).concat([[u1, dos(u1)]]);
    const venV = VEN.filter(p => p[0] < u1).concat([[u1, ven(u1)]]);
    const rupture = [[u1, dos(u1)], [u1 - 0.012, dos(u1) * 0.5], [u1 + 0.01, 0], [u1 - 0.012, ven(u1) * 0.5], [u1, ven(u1)]];
    const tour = Q(dosV).slice().reverse().concat(Q(venV).slice(1));
    out.push(h.path(lisse(tour) + (coupe ? suite(Q(rupture.slice().reverse())) : '') + ' Z', A.blanc));
    out.push(h.path(lisse(tour), A.contour));
    if (coupe) out.push(h.path(lisse(Q(rupture)), A.arete));
    // la tête : l'œil, la gueule, le préopercule
    out.push(h.cercle(...P(0.06, -0.028), r1(0.0135 * L), bA), h.cercle(...P(0.06, -0.028), r1(0.0065 * L), A.plein));
    out.push(h.path(`M${f(P(0.002, 0.012))} Q${f(P(0.045, 0.012))} ${f(P(0.088, 0.026))}`, A.arete));
    out.push(h.path(`M${f(P(0.07, 0.016))} Q${f(P(0.086, 0.018))} ${f(P(0.092, 0.03))}`, A.detail));
    out.push(h.path(lisse(Q(PREOP)), A.detail));
    if (o.opercule !== 'leve') out.push(h.path(lisse(Q(OPER)), A.arete));
    // la ligne latérale
    if (o.lateral !== false) out.push(h.path(lisse(Q([[0.2, -0.036], [0.3, -0.03], [0.45, -0.022], [0.6, -0.014], [0.75, -0.006], [0.86, -0.001]].filter(p => p[0] <= u1 - 0.015))), A.detail));
    // la pectorale, couchée sur le flanc
    if (o.pectorale) {
      nag(`M${f(P(0.192, 0.042))} Q${f(P(0.24, 0.046))} ${f(P(0.284, 0.071))} Q${f(P(0.296, 0.082))} ${f(P(0.282, 0.09))} Q${f(P(0.236, 0.082))} ${f(P(0.198, 0.066))} Z`,
        [0, 1, 2].map(k => [[0.2, 0.049 + k * 0.006], [0.268 + k * 0.006, 0.07 + k * 0.007]]));
    }
    return { svg: out.join('\n'), P };
  };

  // ─── le couteau de profil : pointe en T, `d` va de la pointe vers le manche, le dos du côté
  //     `dos` (+1 : à gauche de d, vu à l'écran) ; `tranche` : vu par le tranchant ────────────
  const couteau = (T, deg, e, o = {}) => {
    const d = dir(deg), s = o.dos || 1, n = [-d[1] * s, d[0] * s];
    const K = (a, b) => add(add(T, mul(d, a)), mul(n, b));
    const lb = 80 * e, hb = (o.tranche ? 6 : 16) * e, s0 = lb + 5 * e, lm = 100 * e, hm = (o.tranche ? 18 : 20) * e;
    const out = [];
    const manche = h.path(`M${f(K(s0, 0.46 * hm))} L${f(K(s0 + lm - 0.12 * lm, 0.52 * hm))} Q${f(K(s0 + lm + 0.02 * lm, 0.52 * hm))} ${f(K(s0 + lm + 0.02 * lm, 0))}`
      + ` Q${f(K(s0 + lm + 0.02 * lm, -0.52 * hm))} ${f(K(s0 + lm - 0.12 * lm, -0.52 * hm))} L${f(K(s0, -0.46 * hm))} Z`, bC)
      + (o.tranche ? '' : '\n' + [0.3, 0.72].map(k => h.cercle(...K(s0 + k * lm, 0), r1(0.09 * hm), bA)).join('\n'));
    const lame = o.tranche
      ? h.path(`M${f(K(lb, 0.5 * hb))} L${f(K(0, 0))} L${f(K(lb, -0.5 * hb))} Z`, bA)
      : h.path(`M${f(K(lb, 0.5 * hb))} L${f(K(0.24 * lb, 0.5 * hb))} Q${f(K(0.05 * lb, 0.45 * hb))} ${f(K(0, 0.18 * hb))}`
        + ` Q${f(K(0.14 * lb, -0.5 * hb))} ${f(K(0.42 * lb, -0.5 * hb))} L${f(K(lb, -0.5 * hb))} Z`, bA)
        + '\n' + h.path(`M${f(K(0.4 * lb, -0.22 * hb))} L${f(K(lb, -0.22 * hb))}`, A.fin);
    const mitre = h.path(`M${f(K(lb, 0.6 * hm))} L${f(K(s0, 0.56 * hm))} L${f(K(s0, -0.56 * hm))} L${f(K(lb, -0.6 * hm))} Z`, bA);
    return { lame, mitre, manche, K, lb, s0, lm, hm, hb, d };
  };

  // ─── vue 1 : saigner ─────────────────────────────────────────────────────────────────
  const geoSaigner = z => {
    const L = Math.min((z.h - 16) / 0.232, 820), e = L / LMM;
    const xs = Math.round(z.l - (z.l - 0.52 * L) / 2 + 12), yc = 8 + 0.125 * L;
    const P = (u, v) => [xs - u * L, yc + v * L];
    // l'opercule soulevé : son bord arrière avance, l'écart découvre les arcs
    const n = OPER.length, lev = OPER.map(([u, v], i) => [u - 0.046 * Math.pow(Math.sin(Math.PI * i / (n - 1)), 0.75), v]);
    const arcs = [0.2, 0.42, 0.64, 0.86].map(k => OPER.map((p, i) => lerp(lev[i], p, k)));
    const iT = Math.round(0.68 * (n - 1));
    const pointe = add(P(...lev[iT]), [-0.006 * L, 0]);
    return { L, e, xs, yc, P, lev, arcs, pointe, iT };
  };
  const vueSaigner = z => {
    const g = geoSaigner(z), { P, L, e } = g, out = [];
    const fish = poisson({ xs: g.xs, yc: g.yc, L, u1: 0.38, opercule: 'leve' });
    out.push(fish.svg);
    const Q = pts => pts.map(([u, v]) => P(u, v));
    // la chambre des branchies découverte : entre le bord soulevé et le bord du corps
    const cham = Q(g.lev).concat(Q(OPER).slice().reverse());
    out.push(h.chemin(cham, A.blanc, true));
    // les arcs branchiaux, avec leurs lamelles tournées vers l'arrière
    const gaps = OPER.map((p, i) => Math.abs(P(...p)[0] - P(...g.lev[i])[0]));
    const i0 = gaps.findIndex(v => v >= 6), i1 = gaps.length - 1 - gaps.slice().reverse().findIndex(v => v >= 6);
    const dl = [-0.91, 0.41];                          // les lamelles pendent vers l'arrière et le bas
    g.arcs.forEach(arc => {
      const pts = Q(arc).slice(i0, i1 + 1);
      pts.forEach((p, j) => {
        const lg = 0.15 * gaps[i0 + j];
        if (lg < 1.8) return;
        [p, j < pts.length - 1 ? lerp(p, pts[j + 1], 0.5) : null].filter(Boolean)
          .forEach(q => out.push(seg(q, add(q, mul(dl, lg)), A.fin)));
      });
      out.push(h.path(lisse(pts), A.arete));
    });
    out.push(h.path(lisse(Q(OPER)), A.arete));
    // l'opercule lui-même, levé : son bord libre
    out.push(h.path(lisse(Q(g.lev)), A.contour));
    // le couteau : la pointe glissée sous l'opercule, la lame couchée en travers des arcs,
    // le tranchant vers le ventre, où les arcs se rejoignent
    const c = couteau(g.pointe, 172, e, { dos: 1 });
    out.push(h.path(`M${f(c.K(0.02 * c.lb, 0))} L${f(c.K(c.lb, 0))}`, `fill="none" stroke="#FFFFFF" stroke-width="${r1(c.hb + 7)}" stroke-linecap="round"`));
    out.push(c.lame, c.mitre, c.manche);
    return out.join('\n');
  };

  // ─── vue 2 : ouvrir ──────────────────────────────────────────────────────────────────
  const PENTE = 18;                        // la lame entre en montant un peu vers la tête
  const geoOuvrir = z => {
    const L = Math.min(z.l - 22, (z.h - 10) / (0.295 + 172 / LMM)), e = L / LMM;
    const xs = z.l - 10, yc = 6 + 0.21 * L;
    const P = (u, v) => [xs - u * L, yc + v * L];
    const anus = P(U_ANUS, ven(U_ANUS));
    const Db = dir(-PENTE);                         // de la main vers la pointe
    const pointe = add(anus, mul(Db, 9 * e));
    return { L, e, xs, yc, P, anus, Db, pointe };
  };
  const vueOuvrir = z => {
    const g = geoOuvrir(z), { P, L, e } = g, out = [];
    out.push(poisson({ xs: g.xs, yc: g.yc, L }).svg);
    // l'anus
    out.push(h.ellipse(...add(g.anus, [0, -0.004 * L]), r1(0.008 * L), r1(0.0035 * L), bA));
    // le trajet de la lame, juste sous la peau du ventre, de l'anus à l'isthme
    const traj = [];
    for (let u = U_ANUS - 0.02; u >= U_ISTHME + 0.012; u -= 0.03) traj.push(P(u, ven(u) - 0.018));
    traj.push(P(U_ISTHME + 0.004, ven(U_ISTHME + 0.004) - 0.01));
    out.push(h.fleche(lisse(traj), A.cache));
    // le couteau vu par le tranchant (tranchant vers le haut, donc vers l'œil), tenu paume en haut
    const c = couteau(g.pointe, 180 - PENTE, e, { tranche: true });
    // la partie de la lame déjà dans le ventre
    const entree = 9 * e;
    out.push(h.path(`M${f(c.K(entree, 0))} L${f(c.K(c.lb, 0))}`, `fill="none" stroke="#FFFFFF" stroke-width="${r1(c.hb + 5)}" stroke-linecap="round"`));
    out.push(h.path(`M${f(c.K(entree, 0.5 * c.hb * entree / c.lb))} L${f(c.K(c.lb, 0.5 * c.hb))} L${f(c.K(c.lb, -0.5 * c.hb))} L${f(c.K(entree, -0.5 * c.hb * entree / c.lb))}`, bA));
    out.push(h.ligne(...c.K(0, 0), ...c.K(entree, 0), A.cache));
    out.push(c.mitre);
    const grip = c.s0 + 0.5 * c.lm;
    const cen = c.K(grip, 0);
    // le manche, puis la main paume en haut : modèle s11 (poing fermé, vu de la paume), le manche
    // couché dans le poing, le pouce du côté de la lame ; l'avant-bras descend et sort du cadre
    out.push(c.manche);
    out.push(F.modele('s11', { x: r1(cen[0]), y: r1(cen[1]), ancre: [68, 42], angle: -PENTE, echelle: 0.8 * e, masquer: [[0, 150, 140, 175]],
      bras: { a: [21.8, 150], a0: [20.8, 135], b: [76.3, 150], b0: [76.2, 135], bord: z } }));
    return out.join('\n');
  };

  // ─── vue 3 : la pointe, en coupe (on regarde de la queue vers la tête) ───────────────
  const geoCoupe = z => {
    const Rx = Math.min((z.l - 36) / 2, (z.h - 40) / 1.05), Ry = 0.5 * Rx;
    const cx = z.l / 2, cy = 8 + 0.1 * Rx + Ry;
    const eC = Rx / (0.5 * 0.187 * LMM);                // unités de vue par mm
    const cav = { x: cx + 0.37 * Rx, y: cy, rx: 0.49 * Rx, ry: 0.66 * Ry };
    const xb = cx + 0.74 * Rx;
    const dx = (xb - cav.x) / cav.rx, hy = cav.ry * Math.sqrt(1 - dx * dx);
    const hLame = 16 * eC;
    const lame = { x: xb, haut: cy - hy + 1, bas: cy - hy + 1 + hLame };
    const intestin = { x: cx + 0.5 * Rx, y: cy + 0.1 * Ry, r: 0.085 * Rx };
    return { Rx, Ry, cx, cy, eC, cav, lame, intestin };
  };
  const vueCoupe = z => {
    const g = geoCoupe(z), { Rx, Ry, cx, cy } = g, out = [];
    const bas = 0.92;
    const tourPts = [];
    for (let i = 0; i < 48; i++) {
      const t = i / 48 * 2 * Math.PI, c = Math.cos(t), s = Math.sin(t);
      const k = (1 + 0.12 * c) * (s > 0 ? bas : 1);          // le dos (à gauche) plus mince ; le flanc du dessous tassé
      tourPts.push([cx + Rx * c, cy + Ry * s * k]);
    }
    const yPlanche = cy + Ry * bas * 0.88 + 0.5;
    // la planche sous le poisson
    out.push(h.rect(r1(cx - Rx - 14), r1(yPlanche), r1(2 * Rx + 28), 11, A.hachure('bois', 'arete')));
    const tour = lisse(tourPts, true);
    out.push(h.path(tour, bC));
    // la chair : les cloisons et les cônes de muscle, en anneaux
    const id = 'coupe-75-40';
    out.push(`<clipPath id="${id}"><path d="${tour}" fill="none"/></clipPath>`);
    const xv = cx - 0.3 * Rx, rv = 0.075 * Rx;
    const anneaux = [];
    for (const sg of [-1, 1]) {
      const c0 = [cx - 0.6 * Rx, cy + sg * 0.42 * Ry];
      [0.17, 0.34].forEach(r => anneaux.push(h.ellipse(r1(c0[0]), r1(c0[1]), r1(r * Rx), r1(r * Ry * 1.25), A.fin)));
    }
    out.push(`<g clip-path="url(#${id})">${anneaux.join('')}${seg([cx - Rx, cy], [xv, cy], A.detail)}${seg([xv, cy - Ry * 1.2], [xv, cy + Ry * 1.2], A.detail)}</g>`);
    // la vertèbre et le rein, collé dessous (du côté du ventre)
    out.push(h.cercle(r1(xv), r1(cy), r1(rv), bA), h.cercle(r1(xv), r1(cy), r1(rv * 0.35), A.plein));
    out.push(h.ellipse(r1(xv + rv + 0.06 * Rx), r1(cy), r1(0.055 * Rx), r1(0.09 * Ry), A.plein));
    // la cavité et les viscères
    const cv = g.cav;
    out.push(h.ellipse(r1(cv.x), r1(cv.y), r1(cv.rx), r1(cv.ry), bA));
    out.push(h.ellipse(r1(cv.x - 0.12 * Rx), r1(cy - 0.22 * Ry), r1(0.16 * Rx), r1(0.3 * Ry), bA));            // l'estomac
    out.push(h.path(`M${f([cv.x - 0.34 * Rx, cy + 0.28 * Ry])} Q${f([cv.x - 0.1 * Rx, cy + 0.02 * Ry])} ${f([cv.x + 0.08 * Rx, cy + 0.26 * Ry])} Q${f([cv.x - 0.08 * Rx, cy + 0.6 * Ry])} ${f([cv.x - 0.34 * Rx, cy + 0.28 * Ry])} Z`, bA));   // le foie
    [[-0.3, -0.05], [-0.22, 0.02], [-0.3, 0.1], [-0.36, -0.14]].forEach(([a, b]) => out.push(h.cercle(r1(cv.x + a * Rx), r1(cy + b * Rx), r1(0.035 * Rx), bA)));   // les cæcums
    const it = g.intestin;
    out.push(h.cercle(r1(it.x), r1(it.y), r1(it.r), bA), h.cercle(r1(it.x), r1(it.y), r1(it.r * 0.45), A.detail));
    // la lame, coupée en travers : le dos en bas, le tranchant en haut contre la paroi
    const lm = g.lame, ep = 2.6 * g.eC / 2;
    out.push(h.path(`M${f([lm.x - ep, lm.bas])} L${f([lm.x + ep, lm.bas])} L${f([lm.x + 0.5, lm.haut])} L${f([lm.x - 0.5, lm.haut])} Z`, A.plein));
    return out.join('\n');
  };

  // ─── vue 4 : sortir le bloc ──────────────────────────────────────────────────────────
  const geoBloc = z => {
    const L = Math.min(z.l * 0.62, (z.h - 10) / 0.5), e = L / LMM;
    const xs = z.l - 14, yc = 6 + 0.21 * L;
    const P = (u, v) => [xs - u * L, yc + v * L];
    const haut = u => 0.006 + 0.012 * Math.pow((u - 0.4) / 0.2, 2);     // le haut de la cavité, sous l'arête
    const pince = P(1.03, 0.255);
    return { L, e, xs, yc, P, haut, pince };
  };
  const vueBloc = z => {
    const g = geoBloc(z), { P, L, e } = g, out = [];
    out.push(poisson({ xs: g.xs, yc: g.yc, L }).svg);
    const Q = pts => pts.map(([u, v]) => P(u, v));
    // le ventre ouvert de l'isthme à l'anus : la paroi du dessus relevée, on voit dans la cavité
    const hautPts = [[U_ISTHME, ven(U_ISTHME)], [0.19, 0.045], [0.22, g.haut(0.22)]];
    for (let u = 0.26; u <= 0.58; u += 0.04) hautPts.push([u, g.haut(u)]);
    hautPts.push([0.605, 0.045], [U_ANUS, ven(U_ANUS)]);
    const venPts = VEN.filter(p => p[0] > U_ISTHME && p[0] < U_ANUS).reverse();
    out.push(h.path(lisse(Q(hautPts)) + ' L' + suite(Q(venPts)).replace(/^ C/, ' C') + ' Z', A.blanc));
    // les côtes, sur la paroi du dessous
    for (let u = 0.235; u <= 0.575; u += 0.034) {
      const a = P(u, g.haut(u) + 0.016), b = P(u + 0.03, ven(u + 0.03) - 0.012), m = P(u + 0.01, (g.haut(u) + ven(u)) / 2 + 0.006);
      out.push(h.path(`M${f(a)} Q${f(m)} ${f(b)}`, A.fin));
    }
    // le rein : la ligne de sang collée sous l'arête, sous sa membrane
    const reinH = [], reinB = [];
    for (let u = 0.215; u <= 0.585; u += 0.02) { reinH.push(P(u, g.haut(u) + 0.003)); reinB.push(P(u, g.haut(u) + 0.013)); }
    out.push(h.path(lisse(reinH) + ' L' + suite(reinB.slice().reverse()).replace(/^ C/, ' C') + ' Z', A.plein));
    out.push(h.path(lisse(Q([[0.215, g.haut(0.215) + 0.019], [0.4, g.haut(0.4) + 0.019], [0.585, g.haut(0.585) + 0.019]])), A.fin));
    // le bord de la paroi relevée, puis le tour de l'ouverture
    out.push(h.path(lisse(Q([[0.19, 0.036], [0.22, g.haut(0.22) - 0.012], [0.3, g.haut(0.3) - 0.012], [0.4, g.haut(0.4) - 0.012],
      [0.5, g.haut(0.5) - 0.012], [0.58, g.haut(0.58) - 0.012], [0.607, 0.036]])), A.arete));
    out.push(h.path(lisse(Q(hautPts)), A.arete));
    out.push(h.path(lisse(Q(VEN.filter(p => p[0] >= U_ISTHME - 0.02 && p[0] <= U_ANUS + 0.02))), A.contour));

    // le bloc sorti, encore tenu à l'anus : l'intestin, l'estomac, le foie, le cœur, les branchies
    const tube = (pts, ep) => {
      const c = dense(pts, 6), g1 = [], g2 = [];
      c.forEach((p, i) => {
        const a = c[Math.max(0, i - 1)], b = c[Math.min(c.length - 1, i + 1)], l = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
        const nn = [-(b[1] - a[1]) / l * ep / 2, (b[0] - a[0]) / l * ep / 2];
        g1.push(add(p, nn)); g2.push(add(p, mul(nn, -1)));
      });
      return h.path(lisse(g1) + ' L' + suite(g2.reverse()).replace(/^ C/, ' C') + ' Z', bA);
    };
    out.push(tube(Q([[U_ANUS, ven(U_ANUS) - 0.006], [0.632, 0.13], [0.645, 0.19], [0.672, 0.222], [0.71, 0.232]]), 0.017 * L));
    // l'estomac : un sac replié
    out.push(h.path(lisse(Q([[0.7, 0.212], [0.735, 0.2], [0.775, 0.204], [0.8, 0.224], [0.79, 0.257], [0.755, 0.266], [0.72, 0.257], [0.698, 0.237]]), true), bA));
    out.push(h.path(lisse(Q([[0.715, 0.227], [0.748, 0.22], [0.778, 0.23]])), A.fin));
    // le foie : deux lobes
    out.push(h.path(lisse(Q([[0.772, 0.242], [0.81, 0.22], [0.86, 0.217], [0.9, 0.232], [0.905, 0.262], [0.87, 0.284], [0.82, 0.287], [0.785, 0.274]]), true), bA));
    out.push(h.path(lisse(Q([[0.83, 0.224], [0.842, 0.252], [0.832, 0.284]])), A.detail));
    // le cœur
    out.push(h.path(lisse(Q([[0.9, 0.242], [0.925, 0.23], [0.945, 0.242], [0.938, 0.264], [0.912, 0.268]]), true), bA));
    // les branchies : quatre arcs et leurs lamelles, tenus dans la pince
    const bra = [];
    [0, 1, 2, 3].forEach(k => {
      const x0 = 0.95 + k * 0.018;
      const arc = [[x0, 0.21], [x0 + 0.012, 0.232], [x0 + 0.014, 0.257], [x0 + 0.008, 0.284], [x0 - 0.004, 0.302]];
      const pts = dense(arc, 3);
      pts.forEach((p, i) => { if (i % 1 === 0 && i > 0 && i < pts.length - 1) { const a = P(...p); bra.push(seg(a, [a[0] - 0.012 * L, a[1] + 0.002 * L], A.fin)); } });
      bra.push(h.path(lisse(Q(arc)), A.arete));
    });
    out.push(bra.join('\n'));
    // la main qui tire vers l'arrière, et le sens
    // modèle s09 (le pouce et l'index qui pincent, de côté) en miroir : la pince sur les branchies,
    // l'avant-bras qui repart vers la gauche
    out.push(F.modele('s09', { x: r1(g.pince[0]), y: r1(g.pince[1]), ancre: [12, 66], angle: 12, miroir: true, echelle: 0.85 * e, masquer: [[200, 0, 230, 125]],
      bras: { a: [200, 64.1], a0: [185, 63.9], b: [200, 112.1], b0: [185, 108.4], long: 120 * e, fin: 'ouvert' } }));
    out.push(h.fleche(`M${f(P(1.05, 0.085))} L${f(P(1.26, 0.085))}`, A.arete));
    return out.join('\n');
  };

  return {
    ref: '75-40',
    titre: 'Saigner et vider au bord de l’eau ou sur la glace',
    desc: 'Le poisson couché sur le flanc, ventre vers soi. Saigner : l’opercule soulevé, la pointe coupe les arcs branchiaux où ils se rejoignent, des deux côtés. Ouvrir : la pointe entre à l’anus, peu profond, tranchant vers le haut, et remonte jusqu’à l’isthme ; en coupe, la lame reste sous la paroi du ventre et l’intestin n’est pas touché. Sortir le bloc : les branchies pincées, tout vient d’un morceau en tirant vers l’arrière, et il reste le rein à racler le long de l’arête.',
    format: 'pleine',
    disposition: [['saigner'], ['ouvrir', 'coupe'], ['bloc']],
    hauteurs: [0.93, 1.07, 1],
    largeurs: [[1], [3, 2], [1]],
    vues: {
      saigner: {
        titre: 'Saigner',
        dessin: vueSaigner,
        renvois: z => {
          const g = geoSaigner(z), { P, L } = g;
          const crane = P(0.098, dos(0.098) + 0.012);
          const oper = P(...g.lev[Math.round(0.3 * (g.lev.length - 1))]);
          const arc = P(...g.arcs[2][Math.round(0.82 * (g.lev.length - 1))]);
          return [
            { n: 1, rond: [crane[0] + 34, 14], cible: crane, texte: 'assommer : un coup sec ici' },
            { n: 2, rond: [oper[0] - 44, 14], cible: add(oper, [2, 0]), texte: 'l’opercule soulevé' },
            { n: 3, rond: [Math.min(z.l - 14, g.xs + 40), z.h - 16], cible: arc, texte: 'les arcs coupés, puis l’autre côté' },
          ];
        },
      },
      ouvrir: {
        titre: 'Ouvrir le ventre',
        dessin: vueOuvrir,
        renvois: z => {
          const g = geoOuvrir(z), { P } = g;
          const flanc = P(0.42, -0.06), isth = P(U_ISTHME + 0.004, ven(U_ISTHME + 0.004) + 0.002);
          return [
            { n: 4, rond: [flanc[0] + 30, 12], cible: flanc, texte: 'sur le flanc, ventre vers soi' },
            { n: 5, rond: [g.anus[0] + 40, z.h - 14], cible: add(g.anus, [2, 2]), texte: 'la pointe à l’anus, tranchant en haut' },
            { n: 6, rond: [isth[0] + 10, z.h - 14], cible: isth, texte: 'jusqu’à l’isthme, sous la mâchoire' },
          ];
        },
      },
      coupe: {
        titre: 'À la pointe, en coupe',
        dessin: vueCoupe,
        renvois: z => {
          const g = geoCoupe(z);
          return [
            { n: 7, rond: [g.lame.x + 16, 12], cible: [g.lame.x, g.lame.haut + 2], texte: 'la lame, juste sous la paroi' },
            { n: 8, rond: [g.intestin.x - 10, z.h - 12], cible: [g.intestin.x, g.intestin.y + g.intestin.r * 0.6], texte: 'l’intestin, que la pointe évite' },
          ];
        },
      },
      bloc: {
        titre: 'Sortir le bloc',
        dessin: vueBloc,
        renvois: z => {
          const g = geoBloc(z), { P } = g;
          const isth = P(U_ISTHME + 0.004, ven(U_ISTHME + 0.004));
          const rein = P(0.44, g.haut(0.44) + 0.008);
          return [
            { n: 9, rond: [isth[0] + 16, z.h - 14], cible: isth, texte: 'l’isthme coupé : les branchies suivent' },
            { n: 10, rond: [P(1.16, 0)[0] - 26, 14], cible: P(1.16, 0.085), texte: 'tirer d’un bloc vers l’arrière' },
            { n: 11, rond: [rein[0] - 20, 14], cible: rein, texte: 'le rein, à racler le long de l’arête' },
          ];
        },
      },
    },
  };
};
