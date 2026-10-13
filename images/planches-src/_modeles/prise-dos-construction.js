// Modèle : la main droite qui serre un manche vertical, vue du dos de la main (trois quarts).
// Feuille de modèle, pas une planche du livre.
//
// Construction d'illustrateur (Loomis / Bridgman), faite en volume puis projetée :
//   1. le manche : un cylindre de 32 mm, axe vertical ;
//   2. chaque doigt s'enroule dans un plan horizontal autour du manche : métacarpo-phalangienne
//      (MCP) à 30 mm de l'axe, puis trois phalanges aux longueurs vraies, chaque articulation
//      reposée à ~26 mm de l'axe (la phalange est une corde du cercle) ;
//   3. la paume en coin : l'axe de la main monte de 20° vers les doigts (le manche traverse la
//      paume en oblique, de la base de l'index à l'éminence hypothénar) ;
//   4. le pouce part du trapèze (côté radial du poignet, face paume), passe derrière le manche
//      et vient se poser sur la deuxième phalange de l'index ;
//   5. le volume est vu à 50° du dos vers les doigts, 6° d'en haut. Chaque os devient une
//      sphère à chaque articulation ; une sphère se projette en cercle, une phalange en tube.
//   6. le contour : la main et l'avant-bras d'une courbe passée par le bord des volumes ; chaque
//      P1 en tube au bout carré (le coude de l'interphalangienne), P2 et P3 restent derrière le
//      manche ; du pouce, seul le bord passe au-dessus de l'index. Peint de l'arrière vers
//      l'avant : silhouette ~1,5, contours intérieurs 0,7, jointures et plis 0,5.
//
// Le manche se remplit de url(#h-bois) : le motif que composer-planche.js met dans les defs.
//
// dessiner(x, y, echelle) : (x, y) = l'axe du manche à la hauteur de la jointure du majeur ;
// echelle = unités de vue par mm (à 1, la main fait 190 du poignet au bout du majeur).
// Options : { construction: true } superpose les volumes en trait fin (pour juger).

'use strict';

const NOIR = '#1A1A1A', BLANC = '#FFFFFF';
const RAD = Math.PI / 180;
const f1 = v => Math.round(v * 10) / 10;

// ─── le volume (mm, repère du manche : u, v horizontaux, Y vers le haut) ─────────────────
// u : vers les doigts (projection horizontale du métacarpe) · v : vers le dos de la main.
const cyl = (ang, r, Y) => [r * Math.cos(ang * RAD), Y, r * Math.sin(ang * RAD)];   // [u, Y, v]

// un doigt : MCP à (angle, rayon, Y), puis phalanges en cordes du cercle de rayon R
function doigt({ mcp, Y, P, R, rayons, dY = [0, 0, 0] }) {
  const pts = [[mcp[0], Y, mcp[1]]];
  const a0 = Math.atan2(mcp[1], mcp[0]) / RAD;
  // première phalange : de la MCP vers le cercle R
  let [u, , v] = pts[0];
  let ang = a0;
  for (let i = 0; i < 3; i++) {
    // cherche l'angle a < ang tel que |cyl(a,R) - p| = P[i]
    let lo = ang - 179, hi = ang, a = ang;
    for (let k = 0; k < 60; k++) {
      a = (lo + hi) / 2;
      const q = cyl(a, R[i], 0);
      const d = Math.hypot(q[0] - u, q[2] - v);
      if (d > P[i]) lo = a; else hi = a;
    }
    const q = cyl(a, R[i], pts[i][1] + dY[i]);
    pts.push(q); u = q[0]; v = q[2]; ang = a;
  }
  return { pts, rayons };
}

// Longueurs (mm) : phalanges d'une main de 190 mm. Index 42/25/20 · majeur 46/28/22 ·
// annulaire 43/27/21 · auriculaire 34/20/18. Épaisseurs : 19, 20, 19, 16 à la MCP.
const DOIGTS = {
  index:  doigt({ mcp: [-5, 30], Y: 23.5, P: [44, 25, 21], R: [25, 25, 25], rayons: [9.6, 9.6, 8.0, 6.8], dY: [-1.5, -0.5, 0] }),
  majeur: doigt({ mcp: [0, 31], Y: 5,  P: [46, 28, 22], R: [25.5, 25, 25], rayons: [10.0, 10.0, 8.2, 7.0], dY: [-3, -1, 0] }),
  annul:  doigt({ mcp: [-2.5, 30], Y: -13, P: [43, 27, 21], R: [25, 24.5, 24.5], rayons: [9.6, 9.6, 7.8, 6.6], dY: [-3.5, -1, 0] }),
  auric:  doigt({ mcp: [-6, 28], Y: -28.5, P: [35, 21, 18], R: [23, 22.5, 22.5], rayons: [8.4, 8.4, 6.8, 5.8], dY: [-4, -1, 0] }),
};

// la paume en coin : l'axe distal monte de 20° ; poignet à 72 mm de la MCP du majeur
const TAU = 8 * RAD;
const M = [Math.cos(TAU), Math.sin(TAU), 0];                 // direction distale [u, Y, v]
const le = (p, k, q = [0, 0, 0]) => [p[0] + M[0] * k + q[0], p[1] + M[1] * k + q[1], p[2] + M[2] * k + q[2]];
const MCPm = DOIGTS.majeur.pts[0];
const POIGNET = le(MCPm, -78, [0, 0, -6]);                   // centre du poignet
// le poignet : ellipse 58 (radial-cubital, le long de Y') × 38 (dos-paume, le long de v)
const NORMALE_Y = [-Math.sin(TAU), Math.cos(TAU), 0];         // vers le radial, dans le plan de la paume
const ellipse3 = (c, a, b, n = 28) => Array.from({ length: n }, (_, i) => {
  const t = i / n * 2 * Math.PI;
  return [c[0] + NORMALE_Y[0] * a * Math.cos(t), c[1] + NORMALE_Y[1] * a * Math.cos(t), c[2] + b * Math.sin(t)];
});
const COUPE = le(POIGNET, -42, [0, 0, -2]);                   // l'avant-bras coupé net à 90 mm

// le pouce : trapèze (côté radial du poignet, face paume) → MCP → IP → bout sur l'index (P2)
const iP2 = DOIGTS.index.pts;
const milieuP2 = [(iP2[1][0] + iP2[2][0]) / 2, (iP2[1][1] + iP2[2][1]) / 2, (iP2[1][2] + iP2[2][2]) / 2];
const angP2 = Math.atan2(milieuP2[2], milieuP2[0]) / RAD;
const POUCE = {
  pts: [
    le(POIGNET, 16, [0, 20, -12]),                            // trapèze (CMC)
    cyl(186, 36, 25.5),                                       // MCP du pouce
    cyl(235, 36, 29.5),                                       // IP
    cyl(-97, 34, 29),                                  // le bout, posé sur la 2e phalange de l'index
  ],
  rayons: [10, 9.3, 8.3, 7],
};

// ─── la vue ───────────────────────────────────────────────────────────────────────────
// Le spectateur regarde à 50° du dos (v) vers les doigts (u), et 12° d'en haut.
const VUE = 50 * RAD, ELEV = 6 * RAD;
function projeter([u, Y, v]) {
  const phi = VUE - Math.PI / 2;
  const X = u * Math.cos(phi) + v * Math.sin(phi);
  const Z = v * Math.cos(phi) - u * Math.sin(phi);
  // X à droite, Z vers l'œil ; élévation : on regarde d'en haut
  const sy = -(Y * Math.cos(ELEV)) + Z * Math.sin(ELEV);
  const prof = Z * Math.cos(ELEV) + Y * Math.sin(ELEV);
  return [X, sy, prof];
}

// ─── géométrie plane ──────────────────────────────────────────────────────────────────
// une gélule : l'enveloppe de deux cercles (c1, r1) et (c2, r2), en polygone échantillonné
function gelule(c1, r1, c2, r2, pas = 8) {
  const dx = c2[0] - c1[0], dy = c2[1] - c1[1], d = Math.hypot(dx, dy);
  if (d < Math.abs(r1 - r2) + 0.01) {               // un cercle dans l'autre
    const [c, r] = r1 > r2 ? [c1, r1] : [c2, r2];
    return Array.from({ length: 360 / pas }, (_, i) => [c[0] + r * Math.cos(i * pas * RAD), c[1] + r * Math.sin(i * pas * RAD)]);
  }
  const a = Math.atan2(dy, dx), g = Math.acos((r1 - r2) / d);
  const out = [];
  for (let t = a + g; t <= a + 2 * Math.PI - g + 1e-9; t += pas * RAD) out.push([c1[0] + r1 * Math.cos(t), c1[1] + r1 * Math.sin(t)]);
  for (let t = a - g; t <= a + g + 1e-9; t += pas * RAD) out.push([c2[0] + r2 * Math.cos(t), c2[1] + r2 * Math.sin(t)]);
  return out;
}
const uni2 = a => { const l = Math.hypot(a[0], a[1]) || 1; return [a[0] / l, a[1] / l]; };
// Catmull-Rom ouverte par des repères (le dernier se referme droit sur le premier : la coupe)
function catmull(pts, n = 10) {
  const out = [], P = i => pts[Math.max(0, Math.min(pts.length - 1, i))];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
    for (let k = 0; k < n; k++) {
      const t = k / n, t2 = t * t, t3 = t2 * t;
      out.push([0, 1].map(j => 0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t3)));
    }
  }
  out.push(pts[pts.length - 1]);
  return out;
}
// un tube de c1 à c2, rayon r[0] → r[1] (au 6/10) → r[2], bouts ronds
function tube(c1, c2, r, carre = 2) {
  const dx = c2[0] - c1[0], dy = c2[1] - c1[1], L = Math.hypot(dx, dy);
  const u = [dx / L, dy / L], nn = [-u[1], u[0]];
  const rr = t => t < 0.6 ? r[0] + (r[1] - r[0]) * Math.sin(t / 0.6 * Math.PI / 2) : r[1] + (r[2] - r[1]) * (1 - Math.cos((t - 0.6) / 0.4 * Math.PI / 2));
  const g = [], dr = [];
  for (let i = 0; i <= 12; i++) { const t = i / 12; g.push([c1[0] + dx * t + nn[0] * rr(t), c1[1] + dy * t + nn[1] * rr(t)]); }
  const a = Math.atan2(u[1], u[0]);
  // le bout carré de la phalange pliée : un « squircle » plutôt qu'un demi-cercle
  for (let t = 90; t >= -90; t -= 6) { const c = Math.cos(t * RAD), sn = Math.sin(t * RAD), k = Math.pow(Math.pow(Math.abs(c), carre) + Math.pow(Math.abs(sn), carre), -1 / carre); g.push([c2[0] + r[2] * k * (c * u[0] - sn * u[1]), c2[1] + r[2] * k * (c * u[1] + sn * u[0])]); }
  for (let i = 12; i >= 0; i--) { const t = i / 12; g.push([c1[0] + dx * t - nn[0] * rr(t), c1[1] + dy * t - nn[1] * rr(t)]); }
  for (let t = -90; t >= -270; t -= 6) { const c = Math.cos(t * RAD), sn = Math.sin(t * RAD), k = Math.pow(Math.pow(Math.abs(c), carre) + Math.pow(Math.abs(sn), carre), -1 / carre); g.push([c1[0] + r[0] * k * (c * u[0] - sn * u[1]), c1[1] + r[0] * k * (c * u[1] + sn * u[0])]); }
  return lisser(reechantillonner(g, 2), 1);
}
// enveloppe convexe (chaîne monotone)
function enveloppe(pts) {
  const p = pts.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lo = [], hi = [];
  for (const q of p) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop(); lo.push(q); }
  for (const q of p.reverse()) { while (hi.length >= 2 && cr(hi[hi.length - 2], hi[hi.length - 1], q) <= 0) hi.pop(); hi.push(q); }
  return lo.slice(0, -1).concat(hi.slice(0, -1));
}
const cercle = (c, r, n = 24) => Array.from({ length: n }, (_, i) => [c[0] + r * Math.cos(i / n * 2 * Math.PI), c[1] + r * Math.sin(i / n * 2 * Math.PI)]);
function dedans(pt, poly) {
  let ins = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if ((yi > pt[1]) !== (yj > pt[1]) && pt[0] < (xj - xi) * (pt[1] - yi) / (yj - yi) + xi) ins = !ins;
  }
  return ins;
}
// ré-échantillonne un polygone fermé à pas régulier (pour un trait lisse et des coupes propres)
function reechantillonner(poly, pas) {
  const out = [];
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i], b = poly[(i + 1) % poly.length];
    const d = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(1, Math.ceil(d / pas));
    for (let k = 0; k < n; k++) out.push([a[0] + (b[0] - a[0]) * k / n, a[1] + (b[1] - a[1]) * k / n]);
  }
  return out;
}
// lissage d'un polygone fermé (Chaikin, deux passes) : arrondit les facettes sans bouger la forme
function lisser(poly, passes = 2) {
  let p = poly;
  for (let k = 0; k < passes; k++) {
    const q = [];
    for (let i = 0; i < p.length; i++) {
      const a = p[i], b = p[(i + 1) % p.length];
      q.push([a[0] * 0.75 + b[0] * 0.25, a[1] * 0.75 + b[1] * 0.25], [a[0] * 0.25 + b[0] * 0.75, a[1] * 0.25 + b[1] * 0.75]);
    }
    p = q;
  }
  return p;
}
// les tronçons d'un contour fermé qui restent hors des formes « fondues »
function troncons(poly, fondus) {
  const hors = poly.map(p => !fondus.some(f => dedans(p, f)));
  if (hors.every(Boolean)) return [poly.concat([poly[0]])];
  const n = poly.length, out = [];
  let i0 = hors.findIndex(x => !x);
  let cur = null;
  for (let k = 1; k <= n; k++) {
    const i = (i0 + k) % n;
    if (hors[i]) { if (!cur) cur = [poly[(i - 1 + n) % n]]; cur.push(poly[i]); }
    else if (cur) { cur.push(poly[i]); out.push(cur); cur = null; }
  }
  if (cur) out.push(cur);
  return out;
}

// ─── le dessin ────────────────────────────────────────────────────────────────────────
function dessiner(x, y, echelle = 1, { construction = false, manche = true, longManche = [95, 105] } = {}) {
  const k = echelle;
  const P = p => { const q = projeter(p); return [q[0], q[1], q[2]]; };
  const vers = ([px, py]) => [x + px * k, y + py * k];
  const d = (poly, ferme = true) => poly.map((p, i) => { const [a, b] = vers(p); return `${i ? 'L' : 'M'}${f1(a)} ${f1(b)}`; }).join(' ') + (ferme ? ' Z' : '');
  const T = ep => `fill="none" stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="round"`;
  const y0 = projeter(MCPm)[1];          // la jointure du majeur à y
  const yv = py => py - y0;

  // pièces : { poly (contour plan), prof, fondus: [polys] } ; peintes de l'arrière vers l'avant
  const pieces = [];
  const ajoute = (poly, prof, opts = {}) => { const p = { poly: poly.map(q => [q[0], yv(q[1])]), prof, ...opts }; pieces.push(p); return p; };

  // la main et l'avant-bras d'une pièce : une courbe passée par les repères de la construction
  // (bord de chaque volume, perpendiculaire à l'axe), coupée net du côté du coude
  const cP = P(COUPE), wP = P(POIGNET), mP = P(MCPm);
  const ax = uni2([mP[0] - cP[0], mP[1] - cP[1]]);
  const haut = [ax[1], -ax[0]], bas = [-ax[1], ax[0]];
  const bord = (p3, r, n = haut, dx = 0) => { const q = P(p3); return [q[0] + n[0] * r + ax[0] * dx, q[1] + n[1] * r + ax[1] * dx]; };
  const lerp3 = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
  const I = DOIGTS.index, Mj = DOIGTS.majeur, An = DOIGTS.annul, Au = DOIGTS.auric;
  const reperes = [
    bord(COUPE, 29.5),                                 // la coupe, côté radial
    bord(lerp3(COUPE, POIGNET, 0.45), 28.5),            // l'avant-bras qui s'amincit
    bord(lerp3(COUPE, POIGNET, 0.9), 26.5),            // le poignet
    bord(POUCE.pts[0], POUCE.rayons[0] + 1),           // la base du pouce, sur le trapèze
    bord(POUCE.pts[1], POUCE.rayons[1], haut, -2),     // la MCP du pouce
    bord(I.pts[0], I.rayons[0], ax),                   // le front des jointures (sous les doigts)
    bord(Mj.pts[0], Mj.rayons[0], ax),
    bord(An.pts[0], An.rayons[0], ax),
    bord(Au.pts[0], Au.rayons[0], ax),
    bord(Au.pts[0], Au.rayons[0], bas, 6),             // l'auriculaire, son bord
    bord(le(POIGNET, 34, [0, 0, -2]), 33, bas),        // l'hypothénar
    bord(le(POIGNET, 6, [0, 0, 0]), 29, bas),          // la styloïde du cubitus
    bord(lerp3(COUPE, POIGNET, 0.85), 26.5, bas),      // le poignet
    bord(lerp3(COUPE, POIGNET, 0.4), 28, bas),         // l'avant-bras
    bord(COUPE, 29, bas),                              // la coupe, côté cubital
  ];
  const paume = ajoute(reechantillonner(catmull(reperes), 2), -10, { nom: 'paume', fondus: [] });
  paume.reperes = reperes;

  // le pouce : trois gélules (métacarpe, P1, P2)
  const pp = POUCE.pts.map(P);
  const pouce = [];
  for (let i = 0; i < 3; i++) pouce.push(gelule(pp[i], POUCE.rayons[i], pp[i + 1], POUCE.rayons[i + 1], 6));
  const poucePoly = lisser(reechantillonner(enveloppe(pouce[1].concat(pouce[2])), 2), 1);
  ajoute(poucePoly, -40, { nom: 'pouce', fondus: [] });

  // les doigts : une gélule par phalange ; P3 derrière le manche
  const doigtsPieces = {};
  const ordre = ['auric', 'annul', 'majeur', 'index'];
  for (const n of ordre) {
    const D = DOIGTS[n], q = D.pts.map(P);
    // P1 : un tube qui s'amincit entre la jointure et l'interphalangienne (la taille du doigt)
    const p1 = tube(q[0], q[1], [D.rayons[0], D.rayons[0] * 0.99, D.rayons[1]], 2.6);
    // P2 : une gélule ; P3 derrière le manche
    const p2 = tube(q[1], q[2], [D.rayons[1], (D.rayons[1] + D.rayons[2]) / 2, D.rayons[2]], 3);
    const p3 = lisser(reechantillonner(gelule(q[2], D.rayons[2], q[3], D.rayons[3], 6), 2), 1);
    // P2 et P3 tournent derrière le manche : ils restent dans la construction, pas dans le trait
    // (le coude carré de P1 fait le bord droit du poing)
    doigtsPieces[n] = { p1: ajoute(p1, 0, { nom: n + '-p1' }), p2, p3, q };
  }

  // le plein entre les doigts serrés : ni trait ni silhouette, il bouche les jours
  const axes = [];
  for (const n of ordre) { const q = doigtsPieces[n].q; axes.push([q[0][0], q[0][1]], [q[1][0], q[1][1]]); }
  ajoute(enveloppe(axes), 0, { nom: 'plein', invisible: true });

  // ordre de profondeur des doigts : l'index devant (vu d'en haut, le doigt du dessus couvre)
  const avant = [];
  const arriere = [];
  // derrière le manche : P3, pouce ; devant : avant-bras, paume, P1-P2
  for (const p of pieces) (p.prof < -25 ? arriere : avant).push(p);
  arriere.sort((a, b) => a.prof - b.prof);
  const rang = { paume: 1, plein: 1.5, 'auric-p2': 2, 'auric-p1': 3, 'annul-p2': 4, 'annul-p1': 5, 'majeur-p2': 6, 'majeur-p1': 7, 'index-p2': 8, 'index-p1': 9 };
  avant.sort((a, b) => rang[a.nom] - rang[b.nom]);

  // le contour du doigt qui entre dans le dos de la main se fond dans la jointure
  for (const n of ordre) {
    // la base de P1 se fond dans le dos de la main : on ne trace rien en deçà de la jointure
    const D = doigtsPieces[n], q = D.q, r = DOIGTS[n].rayons[0];
    const u = uni2([q[1][0] - q[0][0], q[1][1] - q[0][1]]), nn = [-u[1], u[0]];
    const o = [q[0][0], yv(q[0][1])], av = 0.7 * r, ar = -4 * r, l = 2 * r;
    D.p1.fondus = [[[o[0] + u[0] * ar + nn[0] * l, o[1] + u[1] * ar + nn[1] * l], [o[0] + u[0] * av + nn[0] * l, o[1] + u[1] * av + nn[1] * l],
                    [o[0] + u[0] * av - nn[0] * l, o[1] + u[1] * av - nn[1] * l], [o[0] + u[0] * ar - nn[0] * l, o[1] + u[1] * ar - nn[1] * l]]];
  }

  const peindre = liste => {
    const out = [];
    // passe 1 : la silhouette du groupe (un 2,4 sous tout)
    for (const p of liste) if (!p.invisible) out.push(`<path d="${d(p.poly)}" fill="${NOIR}" stroke="${NOIR}" stroke-width="2.4" stroke-linejoin="round"/>`);
    // passe 2 : chaque pièce, son blanc, son trait 0,7
    for (const p of liste) {
      out.push(`<path d="${d(p.poly)}" fill="${BLANC}" stroke="none"/>`);
      if (!p.invisible) for (const t of troncons(p.poly, p.fondus || [])) out.push(`<path d="${d(t, false)}" ${T(0.7)}/>`);
    }
    return out.join('\n');
  };

  // les jointures : un petit arc sur chaque tête métacarpienne, un pli sur chaque interphalangienne
  const plis = [];
  for (const n of ordre) {
    const D = DOIGTS[n];
    const mcp = projeter(D.pts[0]), pip = projeter(D.pts[1]);
    const r = D.rayons[0];
    // l'arc de la jointure : le bord de la tête métacarpienne, du côté du dos de la main
    // (la crête de la jointure est presque au droit de son centre : vue de trois quarts, le dos
    // de la main fuit, le doigt fait face)
    const c = [mcp[0] - 0.2 * r + 0.6 * r, yv(mcp[1]) - 0.1 * r];
    const arc = [];
    for (let t = 145; t <= 220; t += 15) arc.push([c[0] + r * 0.7 * Math.cos(t * RAD), c[1] + r * 0.7 * Math.sin(t * RAD)]);
    plis.push(arc);
    // le coude de l'interphalangienne : un trait court qui suit le bout, là où P2 tourne derrière
    const pi = [pip[0], yv(pip[1])], u = uni2([pip[0] - mcp[0], pip[1] - mcp[1]]), nn = [-u[1], u[0]];
    const rp = D.rayons[1], arc2 = [];
    for (let t = 10; t <= 62; t += 8) arc2.push([pi[0] - u[0] * rp * 0.35 + rp * 0.75 * (Math.cos(t * RAD) * u[0] + Math.sin(t * RAD) * nn[0]),
                                                 pi[1] - u[1] * rp * 0.35 + rp * 0.75 * (Math.cos(t * RAD) * u[1] + Math.sin(t * RAD) * nn[1])]);
    plis.push(arc2);
  }

  const out = [];
  // le manche : derrière les doigts, devant les bouts
  out.push(peindre(arriere));
  if (manche) {
    const R = 16;
    const haut = -longManche[0], bas = longManche[1];
    const e = R * Math.sin(ELEV);
    const top = [], corps = [];
    for (let t = 0; t <= 360; t += 10) top.push([R * Math.cos(t * RAD), haut + e * Math.sin(t * RAD)]);
    corps.push([-R, haut], [-R, bas]);
    for (let t = 180; t >= 0; t -= 10) corps.push([R * Math.cos(t * RAD), bas + e * Math.sin(t * RAD)]);
    corps.push([R, haut]);
    out.push(`<path d="${d(corps)}" fill="${BLANC}" stroke="none"/>`);
    out.push(`<path d="${d(corps)}" fill="url(#h-bois)" stroke="${NOIR}" stroke-width="1.4" stroke-linejoin="round"/>`);
    out.push(`<path d="${d(top)}" fill="${BLANC}" stroke="${NOIR}" stroke-width="1.4"/>`);
  }
  out.push(peindre(avant));
  for (const p of plis) out.push(`<path d="${d(p, false)}" ${T(0.5)}/>`);

  if (construction) {
    const C = `fill="none" stroke="#C03030" stroke-width="0.4"`;
    for (const r of paume.reperes) { const [a, b] = vers([r[0], yv(r[1])]); out.push(`<circle cx="${f1(a)}" cy="${f1(b)}" r="2.5" fill="#C03030"/>`); }
    for (const n of ordre) {
      const D = DOIGTS[n];
      D.pts.forEach((p, i) => { const q = projeter(p); const [a, b] = vers([q[0], yv(q[1])]); out.push(`<circle cx="${f1(a)}" cy="${f1(b)}" r="${f1(D.rayons[i] * k)}" ${C}/>`); });
      out.push(`<path d="${d(D.pts.map(p => { const q = projeter(p); return [q[0], yv(q[1])]; }), false)}" ${C}/>`);
    }
    POUCE.pts.forEach((p, i) => { const q = projeter(p); const [a, b] = vers([q[0], yv(q[1])]); out.push(`<circle cx="${f1(a)}" cy="${f1(b)}" r="${f1(POUCE.rayons[i] * k)}" ${C}/>`); });
    out.push(`<path d="${d(POUCE.pts.map(p => { const q = projeter(p); return [q[0], yv(q[1])]; }), false)}" ${C}/>`);
  }
  return out.join('\n');
}

module.exports = (h) => ({
  ref: 'modele',
  titre: 'Modèle de main : la prise vue du dos',
  desc: 'Feuille de modèle : la main droite serre un manche vertical de 32 mm, vue du dos de la main, construite en volume puis tracée.',
  fichier: '_modeles-prise-dos-construction.svg',
  format: 'pleine',
  disposition: [['a']],
  vues: {
    a: { dessin: z => dessiner(z.l * 0.725, z.h * 0.47, 3.9, { longManche: [80, 80] }) },
  },
});
module.exports.dessiner = dessiner;
