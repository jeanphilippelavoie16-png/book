// Planche 99-07a — La marcotte du groseillier : coucher et crocheter la branche (ch. 99, §E,
// étape 42 « Marcotter le groseillier »).
// Ce que dit le chapitre, et rien d'autre : coucher une branche encore attachée au plant, la
// couvrir de terre en partie, la fixer au sol avec un crochet de bois. Elle racine là où elle
// touche la terre ; après une saison, on la sèvre et on la déterre. Une seule branche donne
// souvent plusieurs plants. (Le plant fait 1 à 1,25 m : tableau des petits fruits.)
// Page a : la branche couchée (élévation en coupe du sol, la position d'avant en tireté), le
// crochet taillé dans une fourche, et la coupe A–A en travers au crochet.
// Page b (99-07b) : après une saison, au même repère : sevrer, déterrer, partager.
// Aucune cote : le chapitre ne donne aucune mesure pour la marcotte ni pour le crochet.
// Le crochet : une fourche prise sur une branche, retournée ; la tige au-dessus de la fourche
// devient le piquet, la branche de côté, coupée court, pointe vers le bas et appuie la branche
// couchée au sol, coincée entre elle et le piquet.

const RAD = Math.PI / 180;
const r1 = v => Math.round(v * 10) / 10;

const outils = (h) => {
  const A = h.a, NOIR = '#1A1A1A';
  const pt = p => `${r1(p[0])} ${r1(p[1])}`;
  const tr = (ep, fill = 'none') => `fill="${fill}" stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="round"`;
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const mul = (a, k) => [a[0] * k, a[1] * k];
  const uni = a => { const l = Math.hypot(a[0], a[1]) || 1; return [a[0] / l, a[1] / l]; };
  const perp = u => [-u[1], u[0]];
  const tourne = (a, deg) => { const c = Math.cos(deg * RAD), s = Math.sin(deg * RAD); return [a[0] * c - a[1] * s, a[0] * s + a[1] * c]; };

  // Catmull-Rom : la courbe passe par chaque point.
  const segCR = (pts, ferme) => {
    const n = pts.length, get = i => (ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))]);
    const out = [];
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = get(i - 1), p1 = get(i), p2 = get(i + 1), p3 = get(i + 2);
      out.push([p1, [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6], [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6], p2]);
    }
    return out;
  };
  const lisse = (pts, ferme = false) => `M ${pt(pts[0])}` + segCR(pts, ferme).map(([, c1, c2, p2]) => ` C ${pt(c1)} ${pt(c2)} ${pt(p2)}`).join('') + (ferme ? ' Z' : '');
  const suite = (pts) => lisse(pts).replace(/^M [^C]*/, '');
  const echant = (pts, parSeg = 12) => {
    const out = [pts[0]];
    for (const [p1, c1, c2, p2] of segCR(pts, false)) for (let k = 1; k <= parSeg; k++) {
      const t = k / parSeg, u = 1 - t;
      out.push([u * u * u * p1[0] + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * p2[0],
        u * u * u * p1[1] + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * p2[1]]);
    }
    return out;
  };
  const aLongueur = (ech, L) => {
    let acc = 0;
    for (let i = 1; i < ech.length; i++) {
      const d = Math.hypot(ech[i][0] - ech[i - 1][0], ech[i][1] - ech[i - 1][1]);
      if (acc + d >= L) { const t = (L - acc) / d; return { p: add(ech[i - 1], mul(sub(ech[i], ech[i - 1]), t)), u: uni(sub(ech[i], ech[i - 1])) }; }
      acc += d;
    }
    const n = ech.length; return { p: ech[n - 1], u: uni(sub(ech[n - 1], ech[n - 2])) };
  };
  const longueur = ech => ech.reduce((s, q, i) => i ? s + Math.hypot(q[0] - ech[i - 1][0], q[1] - ech[i - 1][1]) : 0, 0);
  // Le point d'une courbe à une abscisse donnée (la courbe avance vers la droite).
  const aX = (pts, x) => {
    const ech = echant(pts, 24);
    for (let i = 1; i < ech.length; i++) if ((ech[i - 1][0] - x) * (ech[i][0] - x) <= 0) {
      const t = (x - ech[i - 1][0]) / ((ech[i][0] - ech[i - 1][0]) || 1);
      return { p: add(ech[i - 1], mul(sub(ech[i], ech[i - 1]), t)), u: uni(sub(ech[i], ech[i - 1])) };
    }
    return null;
  };

  // Un trait noir sur un halo blanc : lisible sur la hachure de terre.
  const halo = (d, ep, eh = 3) => h.path(d, `fill="none" stroke="#fff" stroke-width="${r1(ep + eh)}" stroke-linecap="round" stroke-linejoin="round"`) + '\n' + h.path(d, tr(ep));

  // La branche couchée en tube : deux contours, fond blanc, de w0 (au collet) à w1 (au bout).
  const tube = (P, pts, w0, w1, ep = 1.4) => {
    const ech = echant(pts, 10), lon = longueur(ech), n = ech.length, G = [], D = [];
    let acc = 0;
    for (let i = 0; i < n; i++) {
      if (i) acc += Math.hypot(ech[i][0] - ech[i - 1][0], ech[i][1] - ech[i - 1][1]);
      const u = uni(sub(ech[Math.min(i + 1, n - 1)], ech[Math.max(i - 1, 0)])), no = perp(u);
      const w = (w0 + (w1 - w0) * acc / lon) / 2;
      G.push(add(ech[i], mul(no, w))); D.push(sub(ech[i], mul(no, w)));
    }
    return h.chemin(G.concat(D.reverse()).map(q => P(...q)), tr(ep, '#fff'), true);
  };

  // ── La feuille du groseillier : trois lobes arrondis et deux petits à la base ───────────────
  const FEUILLE = [[0, -0.06], [0.12, 0.03], [0.3, 0.02], [0.46, -0.12], [0.42, -0.24], [0.3, -0.3], [0.46, -0.44],
    [0.42, -0.58], [0.2, -0.62], [0.22, -0.8], [0.1, -0.94], [0, -0.97], [-0.1, -0.94], [-0.22, -0.8], [-0.2, -0.62],
    [-0.42, -0.58], [-0.46, -0.44], [-0.3, -0.3], [-0.42, -0.24], [-0.46, -0.12], [-0.3, 0.02], [-0.12, 0.03]];
  const feuille = (P, n, ang, L, queue = 0.45) => {
    const u = [Math.cos(ang * RAD), Math.sin(ang * RAD)], v = perp(u);
    const b = add(n, mul(u, L * queue));
    const loc = ([x, y]) => add(b, add(mul(u, -y * L), mul(v, x * L)));
    return [h.path(`M ${pt(P(...n))} L ${pt(P(...b))}`, A.fin),
      h.path(lisse(FEUILLE.map(q => P(...loc(q))), true), tr(0.7, '#fff')),
      h.path(`M ${pt(P(...b))} L ${pt(P(...loc([0, -0.72])))}`, A.fin)].join('\n');
  };
  // Une tige : le trait, puis à chaque nœud une épine et, un nœud sur deux, une feuille.
  const tige = (P, pts, o = {}) => {
    const ep = o.ep || 1.4, pas = o.pas || 8, L = o.L || 5.6;
    const ech = echant(pts), lon = longueur(ech);
    const d0 = lisse(pts.map(q => P(...q)));
    const out = [o.halo ? halo(d0, ep) : h.path(d0, tr(ep))];
    let k = 0;
    for (let d = o.debut || 14; d < lon - 3; d += pas, k++) {
      const { p, u } = aLongueur(ech, d);
      const cote = k % 2 ? 1 : -1;
      const a0 = Math.atan2(u[1], u[0]) / RAD;
      if (o.epines !== false) {
        const e = tourne(u, cote * 118);
        out.push(h.path(`M ${pt(P(...p))} L ${pt(P(...add(p, mul(e, 1.9))))}`, A.detail));
      }
      if (k % 2 === (o.impair ? 1 : 0) && (!o.feuillesDes || d >= o.feuillesDes)) {
        let a = a0 - cote * 55;
        if (Math.sin(a * RAD) > 0.3) a = a0 + cote * 55;
        out.push(feuille(P, p, a, L));
      }
    }
    const fin = aLongueur(ech, lon);
    out.push(feuille(P, fin.p, Math.atan2(fin.u[1], fin.u[0]) / RAD, L * 0.8, 0.15));
    return out.join('\n');
  };

  // ── Le plant mère (cm ; le collet en (0, 0), y vers le bas, sol à y = 0) ────────────────────
  const TIGES = [
    [[0, 0], [-3, -26], [-8, -52], [-15, -77], [-26, -95], [-37, -103]],
    [[0, 0], [2, -32], [4, -64], [1, -88], [-4, -106]],
    [[0, 0], [5, -26], [11, -52], [20, -73], [32, -88], [44, -95]],
    [[0, 0], [-8, -20], [-21, -39], [-38, -54], [-56, -63], [-70, -65]],
    [[0, 0], [-12, -11], [-29, -19], [-47, -24], [-61, -24]],
  ];
  const plantMere = P => TIGES.map((t, i) => tige(P, t, { debut: [26, 30, 26, 20, 16][i], impair: i % 2 === 1 })).join('\n');

  // ── La branche : avant (en tireté) et couchée ───────────────────────────────────────────────
  const RB = 0.9;                                      // rayon de la branche couchée (cm)
  const AVANT = [[0, 0], [8, -12], [20, -24], [36, -36], [56, -46], [78, -52], [100, -54], [117, -52]];
  const COUCHEE = [[0, 0], [5, -6], [12, -10], [20, -10.5], [28, -8], [35, -4], [41, -1.3], [48, -RB], [70, -RB],
    [90, -RB], [104, -RB], [110, -1.6], [114, -5], [116.5, -11], [117.5, -18], [117, -26]];
  const XCROCHET = 47;
  // Les deux pousses de côté, sur le dessus de la branche couchée.
  const POUSSES = {
    courtes: [
      [[62, -1.8], [61.5, -10], [62, -18], [63.5, -26], [65.5, -32]],
      [[86, -1.8], [86, -10], [87, -18], [88.5, -26], [91, -32]],
    ],
    longues: [
      [[62, -1.8], [61.5, -12], [62, -24], [63.5, -36], [66, -47], [69, -56]],
      [[86, -1.8], [86, -12], [87, -24], [88.5, -36], [91, -47], [94, -56]],
    ],
  };
  const BOUT_LONG = [[114, -5], [116.5, -11], [117.5, -18], [117.5, -30], [117, -42], [116, -52]];

  // La butte de terre sur la branche.
  const BUTTE = [[33, 0], [38, -4.5], [46, -8.5], [60, -10], [90, -10], [102, -8.5], [109, -4.5], [113, 0]];

  // Le sol en coupe, avec la butte ; la ligne du sol d'origine en fin sous la butte.
  const sol = (P, x0, x1, fond) => {
    const b0 = BUTTE[0][0], b1 = BUTTE[BUTTE.length - 1][0];
    return [
      h.path(`M ${pt(P(x0, 0))} L ${pt(P(b0, 0))} ${suite(BUTTE.map(q => P(...q)))} L ${pt(P(x1, 0))} L ${pt(P(x1, fond))} L ${pt(P(x0, fond))} Z`, A.hachure('terre', 'aucun')),
      h.ligne(...P(b0, 0), ...P(b1, 0), A.fin),
    ].join('\n');
  };
  const dessusSol = (P, x0, x1) => [
    h.ligne(...P(x0, 0), ...P(BUTTE[0][0], 0), A.contour),
    h.ligne(...P(BUTTE[BUTTE.length - 1][0], 0), ...P(x1, 0), A.contour),
    h.path(lisse(BUTTE.map(q => P(...q))), A.contour)].join('\n');

  // ── Le crochet (cm, repère : la fourche en (0, 0), le piquet vers le bas, y +) ──────────────
  const CR = { haut: -1.2, bas: 21, bras: 6.4, angle: 50, r: 0.75, rb: 0.6 };
  const dirBras = (sens = 1) => [sens * Math.sin(CR.angle * RAD), Math.cos(CR.angle * RAD)];
  // Un bâton de a à b, en contour fermé ; pointe : effilé au bout b.
  const baton = (P, a, b, r, pointe = false, attrs) => {
    const u = uni(sub(b, a)), n = perp(u);
    const pts = pointe
      ? [add(a, mul(n, r)), add(sub(b, mul(u, r * 3.5)), mul(n, r)), b, sub(sub(b, mul(u, r * 3.5)), mul(n, r)), sub(a, mul(n, r))]
      : [add(a, mul(n, r)), add(b, mul(n, r)), sub(b, mul(n, r)), sub(a, mul(n, r))];
    return h.chemin(pts.map(q => P(...q)), attrs || tr(1.4, '#fff'), true);
  };
  // Le crochet d'un seul tenant : le bras, le piquet, puis un fond blanc sur la jonction.
  // v : le vecteur du bras dans le plan du dessin ; bas : le bout du piquet.
  const crochet = (P, J, v, o = {}) => {
    const bas = o.bas || CR.bas, out = [];
    const pique = [add(J, [0, CR.haut]), add(J, [0, bas])], fb = add(J, v);
    if (o.halo) {
      const blanc = 'fill="#fff" stroke="#fff" stroke-width="5" stroke-linejoin="round"';
      out.push(baton(P, ...pique, CR.r, true, blanc), baton(P, J, fb, CR.rb, false, blanc));
    }
    out.push(baton(P, add(J, mul(uni(v), 0.2)), fb, CR.rb, false, tr(1.4, '#fff')));
    out.push(baton(P, ...pique, CR.r, true, tr(1.4, '#fff')));
    out.push(baton(P, J, add(J, mul(uni(v), CR.r * 1.5)), CR.rb - 0.12, false, 'fill="#fff" stroke="none"'));
    // le bout coupé du dessus : une ellipse de coupe
    return out.join('\n');
  };
  // La fourche J, pour la branche couchée (centre en (0, −RB)) : le piquet à gauche, contre
  // elle ; le bras passe par-dessus et l'appuie dans l'angle.
  const posJ = () => {
    const d = dirBras(), C = [0, -RB], xP = -(CR.r + RB + 0.25), cible = RB + CR.rb;
    return [xP, C[1] - (d[1] * (C[0] - xP) + cible) / d[0]];
  };

  // Le trait de coupe en travers d'une tige, comme à la planche 99-06 : un trait fin, prolongé.
  const traitCoupe = (P, p, u, long = 5) => {
    const n = perp(u), a = sub(p, mul(n, long / 2)), b = add(p, mul(n, long / 2));
    const u2 = tourne(u, 18), nn = perp(u2);
    const a2 = sub(p, mul(nn, long / 2)), b2 = add(p, mul(nn, long / 2));
    return [h.ligne(...P(...a2), ...P(...b2), A.detail),
      h.ligne(...P(...sub(a2, mul(nn, long * 0.35))), ...P(...a2), A.cache),
      h.ligne(...P(...b2), ...P(...add(b2, mul(nn, long * 0.35))), A.cache)].join('\n');
  };

  // ── Les racines : une touffe sous la branche, au point (x, y) ───────────────────────────────
  const alea = (s) => () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
  const racines = (P, x, y, graine, taille = 1, avecHalo = true) => {
    const rnd = alea(graine), out = [];
    const nb = 5;
    for (let i = 0; i < nb; i++) {
      const ang = 30 + (120 * (i + 0.5)) / nb + (rnd() - 0.5) * 14;     // de 25° à 155° : vers le bas
      const L = taille * (8 + rnd() * 7);
      let p = [x + (rnd() - 0.5) * 2.4, y], dir = ang;
      const pts = [p];
      for (let k = 0; k < 5; k++) {
        dir += (rnd() - 0.5) * 30 + (90 - dir) * 0.12;
        p = add(p, mul([Math.cos(dir * RAD), Math.sin(dir * RAD)], L / 5));
        pts.push(p);
        if (k >= 1 && k <= 3 && rnd() < 0.55) {
          const s = rnd() < 0.5 ? -1 : 1, dd = dir + s * (35 + rnd() * 25), l2 = L * (0.22 + rnd() * 0.15);
          const q1 = add(p, mul([Math.cos(dd * RAD), Math.sin(dd * RAD)], l2 * 0.5));
          const q2 = add(q1, mul([Math.cos((dd + s * 10) * RAD), Math.sin((dd + s * 10) * RAD)], l2 * 0.5));
          const d2 = lisse([p, q1, q2].map(q => P(...q)));
          out.push(avecHalo ? halo(d2, 0.5, 1.2) : h.path(d2, A.fin));
        }
      }
      const d1 = lisse(pts.map(q => P(...q)));
      out.unshift(avecHalo ? halo(d1, 0.7, 1.6) : h.path(d1, A.detail));
    }
    return out.join('\n');
  };

  return { A, RB, posJ, pt, tr, tube, add, sub, mul, uni, perp, tourne, lisse, suite, echant, aLongueur, longueur, aX, halo,
    feuille, tige, plantMere, AVANT, COUCHEE, XCROCHET, POUSSES, BOUT_LONG, BUTTE, sol, dessusSol, CR, dirBras, baton,
    crochet, traitCoupe, racines };
};

// Repère commun des élévations (pages a et b) : même échelle, même collet.
const ECH = 2.35;                                  // px par cm
const repere = z => {
  const ox = r1(z.l / 2 - 26 * ECH), oy = r1(4 + 110 * ECH);
  return (x, y) => [r1(ox + x * ECH), r1(oy + y * ECH)];
};
const SOL = { x0: -80, x1: 132, fond: 24 };

const planche = (h) => {
  const O = outils(h), A = h.a;
  const { pt, tr, add, lisse, halo, tige } = O;

  // ── Vue 1 : coucher la branche ────────────────────────────────────────────────────────────
  const coucher = z => {
    const P = repere(z);
    const out = [];
    out.push(O.sol(P, SOL.x0, SOL.x1, SOL.fond));
    // la position d'avant, en tireté, et le geste
    out.push(h.path(lisse(O.AVANT.map(q => P(...q))), A.cache));
    out.push(h.fleche(`M ${pt(P(74, -49))} C ${pt(P(76, -40))} ${pt(P(76, -30))} ${pt(P(74, -17))}`, A.arete));
    out.push(h.fleche(`M ${pt(P(112, -49))} C ${pt(P(114, -44))} ${pt(P(115, -38))} ${pt(P(115, -31))}`, A.arete));
    // le plant mère
    out.push(O.plantMere(P));
    // la branche couchée : du collet au sol, sous la butte, le bout dehors
    out.push(O.tube(P, O.COUCHEE, 2 * O.RB, 1.1));
    // les pousses de côté (elles sortent de la butte) et le bout
    for (const p of O.POUSSES.courtes) out.push(tige(P, p, { ep: 1.4, debut: 12, pas: 7, L: 5, halo: true, feuillesDes: 12 }));
    out.push(O.feuille(P, [117, -26], -95, 4.4, 0.15), O.feuille(P, [117.4, -19], -20, 4.4), O.feuille(P, [116.3, -12], 200, 4.2));
    // le crochet, devant la branche : le bras part vers l'arrière et vers le bas (perspective
    // cavalière, la profondeur fuit en haut à droite)
    const J0 = O.posJ(), J = [O.XCROCHET + J0[0] * 0, J0[1]];
    const bras = [O.CR.bras * (Math.sin(O.CR.angle * RAD) * 0.5 * Math.SQRT1_2),
      O.CR.bras * (Math.cos(O.CR.angle * RAD) - Math.sin(O.CR.angle * RAD) * 0.5 * Math.SQRT1_2)];
    out.push(O.crochet(P, J, bras, { halo: true }));
    // redessine le dessus de la butte et du sol par-dessus
    out.push(O.dessusSol(P, SOL.x0, SOL.x1));
    // la coupe A–A, au crochet, regard vers le plant
    for (const [y0, y1] of [[-22, -14], [SOL.fond + 2, SOL.fond + 9]]) {
      out.push(h.ligne(...P(O.XCROCHET, y0), ...P(O.XCROCHET, y1), A.contour));
      const q = P(O.XCROCHET, y0 < 0 ? y0 : y1);
      out.push(h.fleche(`M ${q[0]} ${q[1]} L ${r1(q[0] - 14)} ${q[1]}`, A.detail));
      out.push(h.texte(r1(q[0] - 26), r1(q[1] + 4), 'A'));
    }
    return out.join('\n');
  };

  // ── Vue 2 : le crochet taillé dans une fourche ─────────────────────────────────────────────
  // Deux dessins côte à côte, même échelle : la fourche sur la branche, puis retournée.
  // Repère cm ; sur l'arbre, la fourche en (0, 0), la tige monte (y −), la branche de côté part
  // en haut à gauche ; retournée (demi-tour), le piquet descend et le bras part en bas à droite.
  const repF = z => {
    const s = Math.min((z.h - 14) / 41, (z.l - 40) / 34);
    const y1 = 6 + 29 * s, y2 = r1(z.h / 2 - 10 * s);
    return { s, P1: (x, y) => [r1(z.l * 0.25 + x * s), r1(y1 + y * s)], P2: (x, y) => [r1(z.l * 0.66 + x * s), r1(y2 + y * s)] };
  };
  const fourche = z => {
    const { s, P1, P2 } = repF(z);
    const out = [];
    const d = O.dirBras();                            // en bas à droite, une fois retourné
    const dA = [-d[0], -d[1]];                        // sur l'arbre : en haut à gauche
    // Sur l'arbre : la branche porteuse continue en bas (tireté), la tige monte, la branche de côté.
    out.push(O.baton(P1, [0, 0], [0, 12], O.CR.r * 1.15, false, A.cache));
    out.push(O.baton(P1, [0, -(O.CR.bas + 2.5)], [0, -(O.CR.bas + 7)], O.CR.r * 0.9, false, A.cache));
    out.push(O.baton(P1, O.mul(dA, O.CR.bras), O.mul(dA, O.CR.bras + 6), O.CR.rb * 0.9, false, A.cache));
    out.push(O.baton(P1, O.mul(dA, 0.2), O.mul(dA, O.CR.bras), O.CR.rb, false, tr(1.4, '#fff')));
    out.push(O.baton(P1, [0, 0.6], [0, -(O.CR.bas + 2.5)], O.CR.r, false, tr(1.4, '#fff')));
    out.push(O.baton(P1, [0, 0], O.mul(dA, O.CR.r * 1.5), O.CR.rb - 0.12, false, 'fill="#fff" stroke="none"'));
    // les trois traits de coupe
    out.push(O.traitCoupe(P1, [0, 0.9], [0, 1], 3.4));
    out.push(O.traitCoupe(P1, [0, -(O.CR.bas + 2.5)], [0, -1], 3.4));
    out.push(O.traitCoupe(P1, O.mul(dA, O.CR.bras), dA, 3));
    // le demi-tour
    const c = [z.l * 0.45, 8 + 12 * s];
    out.push(h.fleche(`M ${r1(c[0] - 14)} ${r1(c[1] + 12)} A 16 16 0 1 1 ${r1(c[0] + 14)} ${r1(c[1] + 12)}`, A.arete));
    // Retourné : le crochet, le pied taillé en pointe
    out.push(O.crochet(P2, [0, 0], O.mul(d, O.CR.bras)));
    out.push(h.ligne(...P2(-0.25, O.CR.bas - 2.4), ...P2(0, O.CR.bas - 0.2), A.fin));
    // quelques fils du bois
    for (const x of [-0.3, 0.3]) out.push(h.ligne(...P2(x, 3 + (x > 0 ? 2 : 0)), ...P2(x, 9 + (x > 0 ? 3 : 0)), A.fin));
    return out.join('\n');
  };

  // ── Vue 3 : coupe A–A en travers, au crochet ───────────────────────────────────────────────
  // Repère cm, la branche au centre (x = 0), sol à y = 0. Regard vers le plant mère : le piquet,
  // devant la branche sur l'élévation, est ici à sa gauche.
  const repA = z => {
    const s = Math.min((z.h - 10) / 36, (z.l - 60) / 40);
    const ox = z.l / 2 - 2 * s, oy = 5 + 12 * s;
    return { s, P: (x, y) => [r1(ox + x * s), r1(oy + y * s)] };
  };
  const BT = [[-18, 0], [-13, -5], [-6, -8.5], [0, -9.2], [6, -8.5], [13, -5], [18, 0]];
  const coupeA = z => {
    const { s, P } = repA(z);
    const out = [];
    const YA = 23.5, vag = []; for (let x = 22; x >= -22; x -= 2) vag.push([x, YA + 0.6 * Math.sin(x * 0.9)]);
    const vague = lisse(vag.map(q => P(...q)));
    out.push(h.path(`M ${pt(P(-22, 0))} L ${pt(P(-18, 0))} ${O.suite(BT.map(q => P(...q)))} L ${pt(P(22, 0))} L ${pt(P(22, YA))} ${vague.replace(/^M [^C]*/, '')} Z`, A.hachure('terre', 'aucun')));
    out.push(h.ligne(...P(-18, 0), ...P(18, 0), A.fin));
    // la branche en coupe, et le crochet qui l'appuie
    const Cb = [0, -O.RB], J = O.posJ();
    out.push(h.cercle(...P(...Cb), O.RB * s + 2.5, 'fill="#fff" stroke="none"'));
    out.push(O.crochet(P, J, O.mul(O.dirBras(), O.CR.bras), { halo: true }));
    out.push(h.cercle(...P(...Cb), O.RB * s, O.A.hachure('bois', 'arete')));
    // la section du bras, là où il touche la branche : rien de plus
    out.push(h.ligne(...P(-22, 0), ...P(-18, 0), A.contour), h.ligne(...P(18, 0), ...P(22, 0), A.contour));
    out.push(h.path(lisse(BT.map(q => P(...q))), A.contour));
    out.push(h.path(vague, A.detail));
    return out.join('\n');
  };

  return {
    ref: '99-07a',
    titre: 'La marcotte du groseillier : coucher et crocheter la branche',
    desc: 'Une branche basse du groseillier, encore attachée au plant, est couchée au sol, tenue par un crochet de bois et couverte de terre sur une partie de sa longueur ; ses pousses de côté et son bout restent dehors. Le crochet se taille dans une fourche prise sur une branche, puis retournée : la tige devient le piquet, la branche de côté, coupée court, appuie la branche couchée au sol, comme on le voit en coupe A–A.',
    format: 'pleine',
    disposition: [['coucher'], ['fourche', 'coupeA']],
    hauteurs: [3.2, 2],
    largeurs: [[1], [1, 1.25]],
    vues: {
      coucher: {
        titre: 'Coucher la branche sans la couper, la crocheter, la couvrir en partie',
        dessin: coucher,
        renvois: z => {
          const P = repere(z);
          return [
            { n: 1, rond: [z.l - 16, P(0, -76)[1]], cible: P(92, -53.6), texte: 'une branche basse, encore attachée au plant' },
            { n: 2, rond: [P(-40, 0)[0], z.h - 14], cible: P(20, -10.5), texte: 'pliée jusqu’au sol, sans casser' },
            { n: 3, rond: [P(24, 0)[0], z.h - 14], cible: P(O.XCROCHET, 14), texte: 'le crochet de bois la tient au sol' },
            { n: 4, rond: [P(80, 0)[0], z.h - 14], cible: P(76, -5), texte: 'couverte de terre en partie' },
            { n: 5, rond: [z.l - 16, P(0, -30)[1]], cible: P(117.5, -20), texte: 'le bout et les pousses restent dehors' },
          ];
        },
      },
      fourche: {
        titre: 'Le crochet : une fourche retournée',
        dessin: fourche,
        renvois: z => {
          const { P1, P2 } = repF(z);
          const d = O.dirBras();
          return [
            { n: 6, rond: [16, P1(0, 9)[1]], cible: P1(-0.9, 0.9), texte: 'couper juste sous la fourche' },
            { n: 7, rond: [z.l - 16, P2(0, 9)[1]], cible: P2(d[0] * 4.2 + 0.4, d[1] * 4.2), texte: 'la branche de côté, coupée court' },
            { n: 8, rond: [z.l - 16, P2(0, 19)[1]], cible: P2(0.5, 17.5), texte: 'la tige : le piquet, taillé en pointe' },
          ];
        },
      },
      coupeA: {
        titre: 'En coupe A–A',
        dessin: coupeA,
        renvois: z => {
          const { P } = repA(z);
          const J = O.posJ();
          return [
            { n: 9, rond: [z.l - 16, 16], cible: P(0.3, -O.RB), texte: 'la branche, coincée sous le crochet' },
            { n: 10, rond: [16, P(0, 12)[1]], cible: P(J[0] - 0.5, 12), texte: 'le piquet, enfoncé contre la branche' },
            { n: 11, rond: [16, 16], cible: P(-9, -3), texte: 'la terre remise par-dessus' },
          ];
        },
      },
    },
  };
};

module.exports = planche;
module.exports.outils = outils;
module.exports.repere = repere;
module.exports.ECH = ECH;
module.exports.SOL = SOL;
