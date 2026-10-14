// Planche 27-01 — l'attelle de fil (ch. 27, « L'attelle de fil : la dent qui bouge avec l'os »).
//
// Ce que le chapitre dit, et rien de plus : une tige de métal ronde, mince et rigide, cintrée à la
// courbe des dents côté lèvre, assez longue pour atteindre deux dents solides de chaque côté des
// dents lâches, les deux bouts adoucis à la lime ou sur une pierre ; pour chaque dent, un bout de
// fil d'acier fin (0,4 à 0,5 mm) passé sous la tige, autour de l'arrière de la dent, ramené en
// avant par-dessus la tige, les deux bouts tordus ensemble dans le sens des aiguilles d'une montre
// en regardant le bout de la torsade ; tige et fil entre le plus large de la dent et la gencive ;
// les bouts coupés et repliés vers les dents ; resserrer d'un demi-tour, pas plus, même sens.
//
// Les dents lâches sont les deux centrales du haut ; les deux dents solides de chaque côté, la
// latérale et la canine. Toutes les vues sortent d'un seul modèle en mm : l'arcade (une parabole),
// la largeur de chaque dent le long de l'arcade, la hauteur de la tige. La vue de face et la vue
// de dessus sont à la même échelle et alignées. Partout, le fil entre à gauche
// sous la tige et ressort à droite par-dessus ; la vue de côté, lèvre à gauche, montre donc le
// flanc droit, où le brin visible passe par-dessus la tige. La vue de dessus porte la pointe
// mousse qui retient le fil derrière la dent pendant qu'on tord (étape 4).
//
// Aucune mesure de tige, de dent ni de hauteur dans le chapitre : aucune cote. Le 0,4 à 0,5 mm du
// fil est dans la légende.
//
// La charte : la tige est l'objet, contour fort partout où on la voit en long. Les dents du fond
// de l'arcade (les prémolaires, de face) reculent en gris loin. Pas de gris sur la vue coupée. Le
// rouge : la torsion en sens horaire, la torsade qu'on rabat, et le cercle sur la hauteur de la
// tige, entre la gencive et le renflement. Le trajet du fil derrière la dent reste noir.

'use strict';

module.exports = (h) => {
  const F = h.formes;
  const f = n => Math.round(n * 10) / 10;
  const NOIR = '#1A1A1A';
  const BT = ep => `fill="#FFFFFF" stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="round"`;
  const BLANC = 'fill="#FFFFFF" stroke="none"';
  const LOIN = ep => `fill="#E6E6E6" stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="round"`;
  const RAD = Math.PI / 180;

  // Catmull-Rom → Bézier : la courbe passe par chaque point
  const cr = (pts, ferme = false) => {
    const n = pts.length;
    const g = i => (ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))]);
    let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      d += ` C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
    }
    return d + (ferme ? ' Z' : '');
  };
  const ligneD = pts => pts.map((p, i) => `${i ? 'L' : 'M'}${f(p[0])} ${f(p[1])}`).join(' ');

  // ─── le modèle, en mm ─────────────────────────────────────────────────────────────────
  // L'arcade vue de dessus : d = K x² (d, la profondeur vers le palais). s : longueur le long
  // de l'arcade, signée comme x.
  const K = 0.032;
  const TAB = [[0, 0]];
  { let s = 0, x = 0; const dx = 0.01; while (x < 34) { const xm = x + dx / 2; s += Math.hypot(1, 2 * K * xm) * dx; x += dx; TAB.push([s, x]); } }
  const xDe = s => {
    const a = Math.abs(s); let lo = 0, hi = TAB.length - 1;
    while (hi - lo > 1) { const m = (lo + hi) >> 1; if (TAB[m][0] < a) lo = m; else hi = m; }
    const [s0, x0] = TAB[lo], [s1, x1] = TAB[hi];
    return Math.sign(s) * (x0 + (x1 - x0) * (a - s0) / ((s1 - s0) || 1));
  };
  const arche = s => {
    const x = xDe(s), l = Math.hypot(1, 2 * K * x);
    return { p: [x, K * x * x], t: [1 / l, 2 * K * x / l], n: [-2 * K * x / l, 1 / l] };
  };

  // Les dents, du milieu vers l'extérieur : largeur le long de l'arcade, forme, collet (v0, plus
  // petit = plus haut), hauteur de la couronne, épaisseur lèvre-palais au collet.
  const TYPES = [
    { type: 'inc', w: 8.5, v0: 0, H: 10.5, D: 7.0 },    // centrale
    { type: 'inc', w: 6.6, v0: 0.6, H: 9.0, D: 6.2 },   // latérale
    { type: 'can', w: 7.6, v0: -0.8, H: 11.0, D: 8.0 }, // canine
    { type: 'pm', w: 7.0, v0: -0.3, H: 8.4, D: 9.0 },   // prémolaire, de face seulement
  ];
  const DENTS = [];
  for (const sg of [-1, 1]) {
    let s = 0;
    TYPES.forEach((T, i) => {
      const s0 = s, s1 = s + T.w; s = s1;
      const a = xDe(s0), b = xDe(s1);
      DENTS.push({ ...T, sg, i, s0, s1, sm: sg * (s0 + s1) / 2, W: b - a,
        xL: sg < 0 ? -b : a, xR: sg < 0 ? -a : b, xc: sg * (a + b) / 2 });
    });
  }
  const ATT = DENTS.filter(d => d.i < 3);            // les six dents de l'attelle
  const V = 4.6, R = 0.5, RF = 0.25;                 // hauteur de la tige sous le collet ; rayons tige et fil
  const S_BOUT = TYPES[0].w + TYPES[1].w + TYPES[2].w + 0.45;   // la tige dépasse à peine la canine
  const X_BOUT = xDe(S_BOUT);
  const V_HAUT = -4.4;                                // haut de la gencive dessinée

  // ─── de face ──────────────────────────────────────────────────────────────────────────
  const couronne = d => {
    const xm = d.sg < 0 ? d.xR : d.xL, xd = d.sg < 0 ? d.xL : d.xR;   // côté du milieu, côté du fond
    const X = u => xm + u * (xd - xm), H = d.H;
    const P = {
      inc: [[0.17, -1.2], [0.07, 0.4 * H], [0, 0.78 * H], [0.05, 0.96 * H], [0.2, H], [0.55, H + 0.05], [0.84, 0.97 * H], [0.97, 0.85 * H], [1, 0.66 * H], [0.93, 0.4 * H], [0.83, -1.2], [0.5, -1.7]],
      can: [[0.2, -1.2], [0.06, 0.4 * H], [0, 0.66 * H], [0.22, 0.85 * H], [0.41, 0.985 * H], [0.47, H], [0.53, 0.985 * H], [0.75, 0.82 * H], [1, 0.58 * H], [0.92, 0.36 * H], [0.8, -1.2], [0.5, -1.7]],
      pm: [[0.2, -1.2], [0.05, 0.4 * H], [0, 0.62 * H], [0.26, 0.87 * H], [0.46, 0.99 * H], [0.54, 0.99 * H], [0.74, 0.87 * H], [1, 0.62 * H], [0.95, 0.4 * H], [0.8, -1.2], [0.5, -1.7]],
    }[d.type];
    return P.map(([u, v]) => [X(u), d.v0 + v]);
  };
  const marge = () => {
    const ds = DENTS.slice().sort((a, b) => a.xc - b.xc), pts = [];
    ds.forEach((d, k) => {
      if (k === 0) pts.push([d.xL - 0.1, d.v0 + 2.4]);
      pts.push([d.xL + 0.2 * d.W, d.v0 + 1.3], [d.xc, d.v0], [d.xR - 0.2 * d.W, d.v0 + 1.3]);
      const e = ds[k + 1];
      pts.push(e ? [d.xR, Math.min(d.v0, e.v0) + 3.0] : [d.xR + 0.1, d.v0 + 2.4]);
    });
    return pts;
  };
  const vague = (xa, xb, v, M, amp = 0.22, per = 3.6) => {
    const pts = [];
    for (let x = xa; x <= xb + 1e-6; x += (xb - xa) / Math.ceil((xb - xa) / 0.6)) pts.push(M([x, v + amp * Math.sin(2 * Math.PI * (x - xa) / per)]));
    return pts;
  };

  // La scène de face : dents, gencive, tige. M : (x mm, v mm) → vue.
  const faceScene = (M, S) => {
    const out = [];
    // les couronnes, du fond vers l'avant
    for (let i = 3; i >= 0; i--) for (const d of DENTS.filter(e => e.i === i)) out.push(h.path(cr(couronne(d).map(M), true), d.i === 3 ? LOIN(0.7) : BT(1.4)));
    // la gencive, par-dessus les collets
    const mg = marge(), g0 = mg[0], g1 = mg[mg.length - 1];
    const haut = vague(g0[0] - 0.4, g1[0] + 0.4, V_HAUT, M);
    const gum = cr(mg.map(M)) + ` L${haut[haut.length - 1].map(f).join(' ')} ` + haut.slice().reverse().map(p => `L${f(p[0])} ${f(p[1])}`).join(' ') + ' Z';
    out.push(h.path(gum, BLANC));
    out.push(h.path(cr(mg.map(M)), h.a.arete));
    out.push(h.path(ligneD(haut), h.a.fin));
    out.push(h.path(ligneD([M(g0), M([g0[0] - 0.4, V_HAUT])]), h.a.detail), h.path(ligneD([M(g1), M([g1[0] + 0.4, V_HAUT])]), h.a.detail));
    // le relief des racines sous la gencive
    const rac = [];
    for (const d of DENTS) for (const k of [-1, 1]) {
      const a = M([d.xc + k * 0.27 * d.W, d.v0 - 0.9]), b = M([d.xc + k * 0.2 * d.W, V_HAUT + 1.0]), c = M([d.xc + k * 0.25 * d.W, (d.v0 - 0.9 + V_HAUT + 1) / 2]);
      rac.push(`M${f(a[0])} ${f(a[1])} Q${f(c[0])} ${f(c[1])} ${f(b[0])} ${f(b[1])}`);
    }
    out.push(h.path(rac.join(' '), h.a.fin));
    // la tige, bouts arrondis, un reflet
    const A = M([-X_BOUT, V - R]), B = M([X_BOUT, V + R]), r = R * S;
    out.push(h.path(`M${f(A[0] + r)} ${f(A[1])} L${f(B[0] - r)} ${f(A[1])} A${f(r)} ${f(r)} 0 0 1 ${f(B[0] - r)} ${f(B[1])} L${f(A[0] + r)} ${f(B[1])} A${f(r)} ${f(r)} 0 0 1 ${f(A[0] + r)} ${f(A[1])} Z`, BT(2.4)));
    out.push(h.path(`M${f(A[0] + r)} ${f(A[1] + 0.3 * r)} L${f(B[0] - r)} ${f(A[1] + 0.3 * r)}`, h.a.fin));
    return out.join('\n');
  };

  // Les deux brins d'une ligature, de face, qui se rejoignent devant la tige, au milieu de la dent.
  const brinsFace = d => ({
    sous: [[d.xL + 0.03 * d.W, V + R + RF + 0.05], [d.xc - 0.34 * d.W, V + 0.8], [d.xc - 0.1 * d.W, V + 0.6], [d.xc, V + 0.05]],
    dessus: [[d.xR - 0.03 * d.W, V - R - RF - 0.05], [d.xc + 0.34 * d.W, V - 0.8], [d.xc + 0.1 * d.W, V - 0.6], [d.xc, V - 0.05]],
  });
  const torsadeRepliee = d => [[d.xc, V - 0.3], [d.xc + 0.06, V + 0.7], [d.xc + 0.45, V + 2.7]];

  const filsFinis = (ds, M, S, trait) => {
    const brins = [], tors = [];
    for (const d of ds) {
      const b = brinsFace(d);
      brins.push({ pts: b.sous.map(M), ep: 2 * RF * S, debut: 'ouvert', fin: 'ouvert' }, { pts: b.dessus.map(M), ep: 2 * RF * S, debut: 'ouvert', fin: 'ouvert' });
      tors.push({ pts: torsadeRepliee(d).map(M), ep: 2.2 * RF * S, torons: true, debut: 'ouvert', fin: 'coupe' });
    }
    return F.cordes(brins, { trait }).toString() + '\n' + F.cordes(tors, { trait }).toString();
  };

  // ─── vu de dessus, coupé à la hauteur du fil ──────────────────────────────────────────
  // Section de chaque dent en (u vers le fond, w vers le palais), face côté lèvre à w ≈ 0.
  const section = d => {
    const A = d.w - 1.4, D = d.D;
    return d.type === 'can'
      ? [[0, -0.12], [0.3 * A, 0.1], [0.48 * A, 0.3 * D], [0.4 * A, 0.62 * D], [0.18 * A, 0.9 * D], [0, D], [-0.18 * A, 0.9 * D], [-0.4 * A, 0.62 * D], [-0.48 * A, 0.3 * D], [-0.3 * A, 0.1]]
      : [[0, -0.1], [0.3 * A, 0.02], [0.47 * A, 0.45], [0.47 * A, 1.6], [0.3 * A, 0.6 * D], [0.12 * A, 0.92 * D], [0, D], [-0.12 * A, 0.92 * D], [-0.3 * A, 0.6 * D], [-0.47 * A, 1.6], [-0.47 * A, 0.45], [-0.3 * A, 0.02]];
  };
  // décalage vers l'extérieur d'un contour fermé
  const decale = (pts, o) => {
    const n = pts.length;
    let aire = 0; for (let i = 0; i < n; i++) { const p = pts[i], q = pts[(i + 1) % n]; aire += p[0] * q[1] - q[0] * p[1]; }
    const sgn = aire > 0 ? 1 : -1;
    return pts.map((p, i) => {
      const a = pts[(i - 1 + n) % n], b = pts[(i + 1) % n], t = [b[0] - a[0], b[1] - a[1]], l = Math.hypot(...t);
      return [p[0] + sgn * o * t[1] / l, p[1] - sgn * o * t[0] / l];
    });
  };
  // la ligature vue de dessus : de la torsade, sous ou par-dessus la tige, le tour de la dent
  const boucle = d => {
    const A = d.w - 1.4, sec = section(d), off = decale(sec, RF + 0.2);
    const T = [0, -(0.1 + 2 * R + 0.55)];
    const idx = d.type === 'can' ? [8, 7, 6, 5, 4, 3, 2] : [10, 9, 8, 7, 6, 5, 4, 3, 2];
    const app = d.type === 'can' ? 0.2 : -0.1;
    return [T, [-0.2 * A, -0.6], [-0.4 * A, app], ...idx.map(i => off[i]), [0.4 * A, app], [0.2 * A, -0.6], T];
  };
  const pulpe = d => {
    const D = d.D, A = d.w - 1.4;
    return d.type === 'can'
      ? [[0, 0.32 * D], [0.1 * A, 0.45 * D], [0, 0.62 * D], [-0.1 * A, 0.45 * D]]
      : [[0, 0.3 * D], [0.16 * A, 0.36 * D], [0, 0.6 * D], [-0.16 * A, 0.36 * D]];
  };
  // local (u, w) d'une dent → monde (x, d)
  const monde = (d, [u, w]) => {
    const a = arche(d.sm), ud = d.sg > 0 ? a.t : [-a.t[0], -a.t[1]];
    return [a.p[0] + ud[0] * u + a.n[0] * w, a.p[1] + ud[1] * u + a.n[1] * w];
  };
  // la tige de dessus : le trait de l'arcade décalé vers la lèvre
  const tigeDessus = (s0, s1, cote) => {   // cote : 0,1 (bord lèvre) … -1 (bord palais) : décalage w
    const pts = [];
    const n = Math.max(2, Math.ceil(Math.abs(s1 - s0) / 0.25));
    for (let k = 0; k <= n; k++) { const s = s0 + (s1 - s0) * k / n, a = arche(s), w = -(0.1 + R) + cote * R; pts.push([a.p[0] + a.n[0] * w, a.p[1] + a.n[1] * w]); }
    return pts;
  };

  // la pointe mousse, dans le repère de la centrale de droite : le bout rond contre le fil,
  // derrière la dent, le manche vers le palais, un peu de biais
  const DP = DENTS.find(d => d.sg > 0 && d.i === 0);
  const pointe = () => {
    const r = 0.75, dir = [Math.sin(30 * RAD), Math.cos(30 * RAD)], w0 = DP.D + 0.2 + 2 * RF + r - 0.08;
    return { r, dir, axe: [[0, w0], [dir[0] * 16, w0 + dir[1] * 16]] };
  };
  const plan = (z, S, X0, Y0) => {
    const M = ([x, dd]) => [X0 + x * S, Y0 - dd * S];
    const out = [];
    for (const d of ATT) {
      out.push(h.path(cr(section(d).map(p => M(monde(d, p))), true), BT(1.4)));
      out.push(h.path(cr(pulpe(d).map(p => M(monde(d, p))), true), h.a.fin));
    }
    // la tige, bouts arrondis
    const bordL = tigeDessus(-S_BOUT, S_BOUT, -1).map(M), bordP = tigeDessus(-S_BOUT, S_BOUT, 1).map(M), r = R * S;
    out.push(h.path(ligneD(bordL) + ` A${f(r)} ${f(r)} 0 0 0 ${bordP[bordP.length - 1].map(f).join(' ')} ` + bordP.slice().reverse().map(p => `L${f(p[0])} ${f(p[1])}`).join(' ') + ` A${f(r)} ${f(r)} 0 0 0 ${bordL[0].map(f).join(' ')} Z`, BT(2.4)));
    // les ligatures
    const brins = [], sous = [], tors = [];
    for (const d of ATT) {
      const b = boucle(d).map(p => M(monde(d, p)));
      brins.push({ pts: b, ep: 2 * RF * S, debut: 'ouvert', fin: 'ouvert' });
      // le brin de gauche passe sous la tige : on remet la tige par-dessus
      const A = d.w - 1.4;
      const gauche = M(monde(d, [-0.2 * A, -0.6]))[0] < M(monde(d, [0.2 * A, -0.6]))[0] ? -1 : 1;
      const sa = d.sm + gauche * 0.06 * A, sb = d.sm + gauche * 0.46 * A;
      sous.push([Math.min(sa, sb), Math.max(sa, sb)]);
      tors.push(M(monde(d, [0, -(0.1 + 2 * R + 0.55)])));
    }
    out.push(F.cordes(brins, { trait: 'detail' }).toString());
    for (const [s0, s1] of sous) {
      const L = tigeDessus(s0, s1, -1).map(M), P = tigeDessus(s0, s1, 1).map(M);
      out.push(h.path(ligneD([...L, ...P.slice().reverse()]) + ' Z', `fill="#FFFFFF" stroke="#FFFFFF" stroke-width="2.4" stroke-linejoin="round"`));
      out.push(h.path(ligneD(L), h.a.contour), h.path(ligneD(P), h.a.contour));
    }
    for (const t of tors) out.push(h.cercle(t[0], t[1], 0.62 * S, BT(1.4)));
    // la pointe mousse qui retient le fil derrière la centrale de droite pendant qu'on tord
    const pm = pointe();
    const bord = sg => pm.axe.map(([u, w]) => [u + sg * pm.r * pm.dir[1], w - sg * pm.r * pm.dir[0]]);
    const g1 = bord(1).map(p => M(monde(DP, p))), g2 = bord(-1).map(p => M(monde(DP, p)));
    const rr = pm.r * S;
    // le manche sort de la vue par le haut : on le coupe au bord
    out.push(`<clipPath id="pointe-mousse"><rect x="0" y="3" width="${z.l}" height="${z.h - 3}"/></clipPath>`);
    out.push(`<g clip-path="url(#pointe-mousse)">` + h.path(`M${f(g1[1][0])} ${f(g1[1][1])} L${f(g1[0][0])} ${f(g1[0][1])} A${f(rr)} ${f(rr)} 0 0 1 ${f(g2[0][0])} ${f(g2[0][1])} L${f(g2[1][0])} ${f(g2[1][1])}`, BT(1.4)) + '</g>');
    return { svg: out.join('\n'), M };
  };

  // ─── les échelles ─────────────────────────────────────────────────────────────────────
  const XMAX = Math.max(...DENTS.map(d => Math.abs(d.xL)));   // bout de la prémolaire
  const faceHaut = 11.2 - V_HAUT;
  const planBas = -(0.1 + 2 * R + 0.55 + 0.7);
  const planHaut = Math.max(...ATT.map(d => Math.max(...section(d).map(p => monde(d, p)[1])))) + 0.5;
  // La vue de face fixe l'échelle ; la vue de dessus, dessinée après, la reprend.
  const etat = { S: null };
  const geoFace = z => {
    const S = Math.min((z.l - 150) / (2 * XMAX), (z.h - 8) / faceHaut);
    etat.S = S;
    return { S, X0: z.l / 2, Y0: (z.h - faceHaut * S) / 2 - V_HAUT * S };
  };
  const geoPlan = z => {
    const S = etat.S;
    if ((planHaut - planBas) * S > z.h - 4) console.error(`27-01 : la vue de dessus demande ${Math.round((planHaut - planBas) * S)} de haut, elle en a ${z.h}`);
    return { S, X0: z.l / 2, Y0: z.h - (z.h - (planHaut - planBas) * S) / 2 + planBas * S };
  };

  // ─── gros plans sur une centrale ──────────────────────────────────────────────────────
  const DC = DENTS.find(d => d.sg < 0 && d.i === 0);          // la centrale de gauche
  const LARG_GP = 13.6, V_GP0 = -3.2, V_GP1 = 12.6;
  const geoGP = z => {
    const S = Math.min((z.l - 8) / LARG_GP, (z.h - 4) / (V_GP1 - V_GP0));
    const X0 = z.l / 2 - DC.xc * S, Y0 = (z.h - (V_GP1 - V_GP0) * S) / 2 - V_GP0 * S;
    return { S, X0, Y0, M: ([x, v]) => [X0 + x * S, Y0 + v * S] };
  };
  const clip = (id, z, contenu) => `<clipPath id="${id}"><rect x="4" y="2" width="${z.l - 8}" height="${z.h - 4}"/></clipPath>\n<g clip-path="url(#${id})">\n${contenu}\n</g>`;
  const faceGP = (z, g) => {
    // la gencive dessinée plus bas : on ne garde que le haut du gros plan
    return faceScene(g.M, g.S);
  };

  // ─── de côté : la centrale en profil, la lèvre à gauche ────────────────────────────────
  // Repère de la dent (b vers le palais, a vers le bout de la dent), origine à la gencive côté
  // lèvre ; puis la dent penche de 14° : le bout vers la lèvre.
  const PENCHE = 14 * RAD;
  const DENT_P = [[0.1, -1.5], [-0.15, 0], [-0.35, 1.6], [-0.42, 3.2], [-0.3, 5.3], [0.2, 8.2], [0.75, 9.9], [1.2, 10.5], [1.65, 10.6], [1.95, 10.2], [2.15, 8.6], [2.6, 6.6], [3.5, 4.8], [5.2, 3.3], [6.45, 2.0], [6.95, 0.6], [7.05, -1.5], [3.5, -1.9]];
  // la gencive, coupée court : une bande côté lèvre, une côté palais, et entre les deux le bord
  // de gencive sur le flanc de la dent, qui descend un peu entre les dents
  const GENC_HAUT = -2.8, GENC_B0 = -1.15, GENC_B1 = 8.5;
  const GENC_P = {
    levre: [[-0.05, 0], [-0.6, -0.5], [-0.98, -1.5], [GENC_B0, GENC_HAUT]],
    palais: [[GENC_B1, GENC_HAUT], [8.25, -1.6], [7.75, -0.55], [7.1, 0.0]],
    papille: [[7.1, 0.0], [5.6, 0.95], [3.5, 1.45], [1.6, 1.0], [0.4, 0.35], [-0.05, 0]],
  };
  const TIGE_P = [-0.86, V];
  const O_P = [-1.6, V];                         // où les deux bouts se rejoignent, devant la tige
  // La lèvre à gauche : on voit le flanc droit de la dent (droite de la vue de face), celui où
  // le fil ressort par-dessus la tige. Le brin qui entre sous la tige, à gauche, passe derrière.
  const PROCHE_P = [O_P, [-1.3, V - 0.6], [-0.86, V - R - RF - 0.02], [-0.3, V - 0.72], [1.4, 3.55], [3.3, 2.95], [5.0, 2.3], [6.3, 1.65], [6.95, 1.3], [7.2, 1.15]];
  const LOIN_CACHE_P = [[7.2, 1.15], [6.3, 1.9], [5.0, 2.8], [3.3, 3.9], [1.4, 4.75], [-0.44, V + R + RF + 0.02]];
  const LOIN_VU_P = [[-0.44, V + R + RF + 0.02], [-0.86, V + R + RF + 0.02], [-1.3, V + 0.6], O_P];
  const TORS_P = [[-1.6, V - 0.25], [-1.78, V + 0.8], [-1.1, V + 2.05], [-0.62, V + 3.1]];
  const geoProfil = z => {
    const B0 = -5.2, B1 = 9.0, A0 = -3.1, A1 = 11.0;
    // étendue une fois penchée
    const coins = [[B0, A0], [B1, A0], [B0, A1], [B1, A1]].map(([b, a]) => [b * Math.cos(PENCHE) - a * Math.sin(PENCHE), b * Math.sin(PENCHE) + a * Math.cos(PENCHE)]);
    const xs = coins.map(c => c[0]), ys = coins.map(c => c[1]);
    const lx = Math.max(...xs) - Math.min(...xs), ly = Math.max(...ys) - Math.min(...ys);
    const S = Math.min((z.l - 6) / (lx * 0.86), (z.h - 4) / (ly * 0.86));
    const cx = (Math.max(...xs) + Math.min(...xs)) / 2, cy = (Math.max(...ys) + Math.min(...ys)) / 2;
    const M = ([b, a]) => { const x = b * Math.cos(PENCHE) - a * Math.sin(PENCHE), y = b * Math.sin(PENCHE) + a * Math.cos(PENCHE); return [z.l / 2 + (x - cx) * S, z.h / 2 + (y - cy) * S]; };
    return { S, M };
  };

  // ─── la planche ───────────────────────────────────────────────────────────────────────
  return {
    ref: '27-01',
    titre: 'L’attelle de fil',
    desc: 'L’attelle de fil sur les six dents du devant du haut : de face ; vue de dessus, coupée à la hauteur du fil ; puis une ligature en trois temps sur une dent : le fil passé sous la tige, autour de l’arrière de la dent et ramené par-dessus la tige ; les deux bouts tordus dans le sens des aiguilles d’une montre, vus du bout ; la torsade coupée court et repliée contre la dent, vue de côté.',
    format: 'pleine',
    disposition: [['face'], ['plan'], ['e1', 'e2', 'e3']],
    hauteurs: [1, 1.08, 1.32],
    vues: {
      face: {
        titre: 'De face',
        dessin: z => {
          const { S, X0, Y0 } = geoFace(z), M = ([x, v]) => [X0 + x * S, Y0 + v * S];
          const out = [faceScene(M, S), filsFinis(ATT, M, S, 'detail')];
          // le plan de coupe de la vue de dessus, marqué hors du dessin
          for (const k of [-1, 1]) {
            const a = M([k * (XMAX + 0.8), V]), b = M([k * (XMAX + 3.6), V]);
            out.push(h.ligne(a[0], a[1], b[0], b[1], `fill="none" stroke="${NOIR}" stroke-width="1.4" stroke-dasharray="9 2.5 1.5 2.5"`));
            out.push(h.fleche(`M${f(b[0] - k * 5)} ${f(b[1])} L${f(b[0] - k * 5)} ${f(b[1] + 16)}`, h.a.detail));
          }
          // ce qu'on vérifie : la hauteur de la tige, entre la gencive et le renflement de la dent
          const lc = DENTS.find(d => d.sg < 0 && d.i === 2), ct = M([lc.xc - 0.3 * lc.W, V]);
          out.push(h.controle(ct[0], ct[1], 15));
          return out.join('\n');
        },
        renvois: z => {
          const { S, X0, Y0 } = geoFace(z), M = ([x, v]) => [X0 + x * S, Y0 + v * S];
          const c = DENTS.find(d => d.sg > 0 && d.i === 0), l = DENTS.find(d => d.sg < 0 && d.i === 1), cn = DENTS.find(d => d.sg > 0 && d.i === 2), lc = DENTS.find(d => d.sg < 0 && d.i === 2);
          const bas = Math.min(z.h - 11, M([0, 10.5])[1] + 16);
          const P = p => p.map(v => Math.round(v));
          return [
            { n: 1, rond: P([M([c.xc + 2.2, 0])[0], bas]), cible: P(M([c.xc + 0.5, 8.4])), texte: 'dents lâches, remises en place avec leur os' },
            { n: 2, rond: P([M([l.xc - 3.0, 0])[0], bas]), cible: P(M([l.xc, 7.6])), texte: 'deux dents solides de chaque côté' },
            { n: 3, rond: P([M([XMAX + 4.4, 0])[0], M([0, V - 3.6])[1]]), cible: P(M([X_BOUT - 0.2, V - 0.35])), texte: 'bouts adoucis : lime ou pierre' },
            { n: 4, rond: P([M([XMAX + 4.4, 0])[0], M([0, V + 4.2])[1]]), cible: P(M([cn.xc + 0.35, V + 2.2])), texte: 'une ligature par dent, bout replié' },
            { n: 5, rond: P([M([-XMAX - 4.4, 0])[0], M([0, V - 3.6])[1]]), cible: P(M([lc.xc - 0.3 * lc.W, V - 0.1])), texte: 'hauteur : entre la gencive et le renflement' },
          ];
        },
      },
      plan: {
        titre: 'Vu de dessus, coupé à la hauteur du fil',
        dessin: z => {
          const { S, X0, Y0 } = geoPlan(z);
          return plan(z, S, X0, Y0).svg;
        },
        renvois: z => {
          const { S, X0, Y0 } = geoPlan(z);
          const M = ([x, dd]) => [X0 + x * S, Y0 - dd * S];
          const P = p => p.map(v => Math.round(v));
          const cg = DENTS.find(d => d.sg < 0 && d.i === 0);
          const bt = tigeDessus(15.5, 15.6, 0)[0];
          const lingual = monde(cg, decale(section(cg), RF + 0.2)[6]);
          const pm = pointe();
          // un point de l'axe de la pointe à la hauteur y de la vue, décalé de dx
          const surPointe = (pm, M, y, dx) => { const a = M(monde(DP, pm.axe[0])), b = M(monde(DP, pm.axe[1])), t = (y - a[1]) / (b[1] - a[1]); return [a[0] + t * (b[0] - a[0]) + dx, y]; };
          return [
            { n: 6, rond: P([M([XMAX + 4.4, 0])[0], M([0, K * 15 * 15 - 2])[1]]), cible: P(M(bt)), texte: 'tige cintrée à la courbe, côté lèvre' },
            { n: 7, rond: P([M([-3.0, 0])[0], Math.max(12, M([0, planHaut - 0.5])[1])]), cible: P(M(lingual)), texte: 'le fil fait le tour de l’arrière' },
            { n: 8, rond: P(surPointe(pm, M, 20, 32)), cible: P(surPointe(pm, M, 44, 0)), texte: 'pointe mousse : retient le fil derrière' },
          ];
        },
      },
      e1: {
        titre: 'Sous la tige, derrière, par-dessus',
        dessin: z => {
          const g = geoGP(z), d = DC, M = g.M, S = g.S, W = d.W;
          const out = [faceScene(M, S)];
          // le trajet caché, derrière la dent
          const cache = [[d.xL + 0.03 * W, V + 0.8], [d.xL + 0.2 * W, V - 1.4], [d.xc, V - 2.5], [d.xR - 0.2 * W, V - 2.0], [d.xR - 0.03 * W, V - 0.8]];
          out.push(h.path(cr(cache.map(M)), h.a.cache));
          const m1 = M([d.xc - 0.02 * W, V - 2.5]), m2 = M([d.xc + 0.16 * W, V - 2.36]);
          out.push(h.fleche(`M${f(m1[0])} ${f(m1[1])} L${f(m2[0])} ${f(m2[1])}`, h.a.detail));
          // le bout qui reste devant, puis le passage sous la tige vers la gauche
          const queue = [[d.xc - 0.02 * W, V + 7.6], [d.xc - 0.05 * W, V + 3.2], [d.xc - 0.14 * W, V + 1.2], [d.xc - 0.38 * W, V + 0.8], [d.xL + 0.03 * W, V + 0.8]];
          // le bout qui ressort à droite, par-dessus la tige, ramené devant vers le milieu
          const tete = [[d.xR - 0.03 * W, V - 0.8], [d.xc + 0.32 * W, V - 1.02], [d.xc + 0.08 * W, V - 1.12]];
          // la flèche du bout qui entre sous la tige : du côté de la dent, pas sur la tige
          out.push(F.cordes([
            { pts: queue.map(M), ep: 2 * RF * S, debut: 'coupe', fin: 'ouvert', fleche: { de: 0.7, a: 0.96, cote: 'gauche' } },
            { pts: tete.map(M), ep: 2 * RF * S, debut: 'ouvert', fin: 'coupe' },
          ]).toString());
          return clip('gros-plan-a', z, out.join('\n'));
        },
        renvois: z => {
          const g = geoGP(z), d = DC;
          const c = g.M([d.xc - 0.04 * d.W, V + 6.4]);
          return [{ n: 9, rond: [Math.round(c[0] - 40), Math.round(Math.min(z.h - 12, c[1] + 10))], cible: [Math.round(c[0]), Math.round(c[1])], texte: 'fil d’acier fin, 0,4 à 0,5 mm' }];
        },
      },
      e2: {
        titre: 'Tordu en sens horaire, vu du bout',
        dessin: z => {
          const g = geoGP(z), d = DC, M = g.M, S = g.S;
          const out = [faceScene(M, S)];
          const b = brinsFace(d);
          out.push(F.cordes([
            { pts: b.sous.map(M), ep: 2 * RF * S, debut: 'ouvert', fin: 'ouvert' },
            { pts: b.dessus.map(M), ep: 2 * RF * S, debut: 'ouvert', fin: 'ouvert' },
          ]).toString());
          // la torsade vue par le bout : les deux fils tordus ensemble
          const c = M([d.xc, V]);
          out.push(h.cercle(c[0], c[1], 0.62 * S, BT(1.4)));
          out.push(h.cercle(c[0] - 0.2 * S, c[1] + 0.05 * S, 0.17 * S, h.a.plein), h.cercle(c[0] + 0.2 * S, c[1] - 0.05 * S, 0.17 * S, h.a.plein));
          // le sens : celui des aiguilles d'une montre
          const rr = 2.3 * S, a0 = 200 * RAD, a1 = 470 * RAD;
          const p0 = [c[0] + rr * Math.cos(a0), c[1] + rr * Math.sin(a0)], p1 = [c[0] + rr * Math.cos(a1), c[1] + rr * Math.sin(a1)];
          out.push(h.geste(`M${f(p0[0])} ${f(p0[1])} A${f(rr)} ${f(rr)} 0 1 1 ${f(p1[0])} ${f(p1[1])}`));
          return clip('gros-plan-b', z, out.join('\n'));
        },
        renvois: z => {
          const g = geoGP(z), c = g.M([DC.xc, V]), rr = 2.3 * g.S, a = -40 * RAD;
          const t = [c[0] + rr * Math.cos(a), c[1] + rr * Math.sin(a)];
          return [{ n: 10, rond: [Math.round(Math.min(z.l - 12, t[0] + 34)), Math.round(Math.max(12, t[1] - 34))], cible: [Math.round(t[0]), Math.round(t[1])], texte: 'resserrer d’un demi-tour, pas plus, même sens' }];
        },
      },
      e3: {
        titre: 'De côté : coupé, replié',
        dessin: z => {
          const { S, M } = geoProfil(z), out = [];
          out.push(h.path(cr(DENT_P.map(M), true), BT(1.4)));
          // la gencive : côté lèvre, palais, papille ; coupée en haut
          const haut = [];
          for (let k = 0; k <= 10; k++) { const b = GENC_B0 + (GENC_B1 - GENC_B0) * k / 10; haut.push([b, GENC_HAUT + 0.18 * Math.sin(k * 1.9)]); }
          const tour = [...GENC_P.levre, ...haut.slice(1, -1), ...GENC_P.palais, ...GENC_P.papille.slice(1)];
          out.push(h.path(cr(tour.map(M), true), BLANC));
          out.push(h.path(cr(GENC_P.levre.map(M)), h.a.arete), h.path(cr(GENC_P.palais.map(M)), h.a.arete), h.path(cr(GENC_P.papille.map(M)), h.a.detail));
          out.push(h.path(ligneD([GENC_P.levre[GENC_P.levre.length - 1], ...haut.slice(1, -1), GENC_P.palais[0]].map(M)), h.a.fin));
          // le brin du fond, caché derrière la dent
          out.push(h.path(cr(LOIN_CACHE_P.map(M)), h.a.cache));
          // la tige, vue par le bout
          const t = M(TIGE_P);
          out.push(h.cercle(t[0], t[1], R * S, h.a.plein));
          // les deux brins visibles
          out.push(F.cordes([
            { pts: PROCHE_P.map(M), ep: 2 * RF * S, debut: 'ouvert', fin: 'ouvert' },
            { pts: LOIN_VU_P.map(M), ep: 2 * RF * S, debut: 'ouvert', fin: 'ouvert' },
          ]).toString());
          // la torsade avant d'être repliée, en fantôme
          const e = 0.55, gh = [[-1.6, V - e], [-4.5, V - e], [-4.5, V + e], [-1.6, V + e]].map(M);
          out.push(h.path(ligneD(gh), h.a.cache));
          // repliée contre la dent
          out.push(F.cordes([{ pts: TORS_P.map(M), ep: 2.2 * RF * S, torons: true, debut: 'ouvert', fin: 'coupe' }]).toString());
          // le geste : on la rabat
          const rr = 3.6, a0 = 172 * RAD, a1 = 98 * RAD;
          const q0 = M([O_P[0] + rr * Math.cos(a0), O_P[1] + rr * Math.sin(a0)]), q1 = M([O_P[0] + rr * Math.cos(a1), O_P[1] + rr * Math.sin(a1)]);
          out.push(h.geste(`M${f(q0[0])} ${f(q0[1])} A${f(rr * S)} ${f(rr * S)} 0 0 0 ${f(q1[0])} ${f(q1[1])}`));
          return out.join('\n');
        },
        renvois: z => {
          const { S, M } = geoProfil(z), t = M(TIGE_P);
          return [{ n: 11, rond: [Math.round(Math.max(12, t[0] - 46)), Math.round(Math.max(12, t[1] - 58))], cible: [Math.round(t[0] - R * S * 0.2), Math.round(t[1] + R * S * 0.1)], texte: 'la tige, vue par le bout' }];
        },
      },
    },
  };
};
