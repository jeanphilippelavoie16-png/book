'use strict';
// extremites.js — les mains et les pieds SIMPLES des corps entiers (bibliothèque de corps, agent 2).
//
// Les mains calquées (formes.modele) restent pour les gros plans, où on ne voit que la main. Ici :
// la main d'un personnage entier, en moufle à pouce séparé, et le pied, en botte de travail ou nu.
// Un seul contour lisse, au plus un trait intérieur (0,7) qui sépare le pouce, marque le poing ou la
// semelle. Lisible à 25 px de haut comme à 300.
//
//   main(pose, vue, cote, options)    pose  ouverte · plat · prise · porte · pointe · pince
//                                     vue   profil · face · dos · dessus  (la vue du CORPS)
//                                     cote  'P' | 'L'  (ou 'droite' | 'gauche' : P = main droite)
//   pied(type, vue, cote, options)    type  botte · nu
//                                     vue   profil · face · dos · dessus · dessous
//
// Les deux rendent { contour, details, prise, attache, … } dans un REPÈRE LOCAL en millimètres
// d'homme adulte (main 190 du poignet au bout du majeur, botte 290, pied nu 266) :
//   main  origine au poignet, l'avant-bras le long de +x (la main va vers +x). Pour la main
//         droite vue du dos (la main proche qui pend, de profil), le pouce est du côté −y : quand
//         le moteur fait pendre la main (+x vers le bas), −y est l'avant du corps.
//   pied  origine à la cheville, la jambe vers −y (le haut), la pointe vers +x en profil.
//
//   contour   d SVG fermé (cubiques) : la silhouette. Elle déborde de `recouvrement` mm dans le
//             membre (coupe nette à x = −recouvrement pour la main, y = −recouvrement pour le pied),
//             bords parallèles à l'axe sur ce débord : une union avec la bande de l'avant-bras ou de
//             la jambe se fait bord à bord, sans marche. Les trous éventuels suivent (evenodd).
//   details   [d…] traits intérieurs ouverts, à peindre à 0,7 (zéro ou un, deux sous une semelle)
//   attache   { x, y, largeur, angle, coupe } : le poignet / la cheville, sa largeur VUE dans cette
//             vue (le bord de la bande doit tomber à ±largeur/2), angle de l'axe du membre (0 : +x
//             pour la main, −90 : vers le haut pour le pied), coupe : où le contour est tranché
//   prise     { x, y, angle, … } : main — le point utile de la pose et l'axe de l'objet (degrés
//             écran, dans le repère local) ; pied — le point d'appui principal
//   polygone  le contour en points (≈ 0,05 mm), pour une union qui ne veut pas de courbes
//   boite     { x, y, l, h }
//   placer({ x, y, angle, echelle, miroir }) → le même objet, en coordonnées de la vue
//   svg({ x, y, angle, echelle, miroir, objet, trait }) → le SVG, l'objet tenu à sa profondeur
//
// La main en prise tient un manche (diametre, défaut 32 mm). L'objet se peint selon r.objet :
//   'derriere'  avant la main (vue du dos : le manche passe derrière tout le poing) ;
//   'entre'     après le contour, avant r.devant (vue de la paume : derrière les doigts repliés,
//               devant la paume) — r.devant = { contour, bord: [d…] (à repeindre au trait de
//               silhouette), details } ;
//   'devant'    après la main (manche vu par le bout : le cercle r.prise.r tombe dans le poing).
// svg({ objet }) fait cet ordre tout seul.
//
// Options communes : face, rotation, plie, recouvrement, poignet / cheville (largeur vue imposée,
// pour coller à la bande du moteur), age ('homme' · 'femme' · 'enfant6' · 'enfant4', lu dans
// proportions.json ; défaut : aucune mise à l'échelle, le moteur s'en charge).
// Main : diametre (prise), inclinaison (prise : le manche penché, degrés), face :
//   'dos' · 'paume' (la main vue à plat, côté dos ou côté paume) · 'pouce' · 'tranche' (vue par la
//   tranche, côté pouce ou côté petit doigt) ; rotation : un angle de pronation libre (0 dos,
//   90 pouce, 180 paume, 270 tranche pour la main droite) ; plie : l'angle main − avant-bras dans
//   le plan de la vue (convention du brief : positif vers −y local, l'avant quand la main pend).
// Pied : angle (pied − jambe, convention du brief : 90 = pied d'équerre), orteils (pli des orteils
//   ou de la botte à la plante, degrés, positif vers le haut : 90 − angle absolu du pied pour des
//   orteils à plat au sol), pointe: true (sur la pointe : orteils posés à plat d'après `angle`).
//
// Construction : chaque extrémité est un petit volume — des sphères dont on prend l'enveloppe
// convexe par morceaux (la paume, la moufle des quatre doigts, le pouce ; la tige, la semelle, le
// talon). Le volume tourne pour la vue et se projette ; les enveloppes se remplissent sur une grille
// de 0,5 mm, un flou gaussien arrondit l'union (c'est lui qui fait les congés : pas de couture au
// poignet, pas de bosse aux jointures), le contour à mi-hauteur se lit puis s'ajuste en cubiques.
// Le trait intérieur est le bord de la pièce de devant là où elle passe sur celle de derrière, et
// il s'arrête avant le contour. Tout est calculé une fois par jeu d'options (cache).

const fs = require('fs');
const path = require('path');

const RAD = Math.PI / 180;
const RES = 0.5;                       // pas de la grille, mm
const f2 = v => Math.round(v * 100) / 100;

// ─── vecteurs ──────────────────────────────────────────────────────────────────────────────
const A3 = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const S3 = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const M3 = (a, k) => [a[0] * k, a[1] * k, a[2] * k];
const D3 = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const X3 = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const L3 = a => Math.hypot(a[0], a[1], a[2]);
const U3 = a => { const l = L3(a) || 1; return [a[0] / l, a[1] / l, a[2] / l]; };
function rot3(v, k, deg) {                         // Rodrigues : v autour de l'axe unitaire k
  const t = deg * RAD, c = Math.cos(t), s = Math.sin(t), kv = X3(k, v), kd = D3(k, v);
  return [v[0] * c + kv[0] * s + k[0] * kd * (1 - c), v[1] * c + kv[1] * s + k[1] * kd * (1 - c), v[2] * c + kv[2] * s + k[2] * kd * (1 - c)];
}
const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const mul = (a, k) => [a[0] * k, a[1] * k];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1];
const lon = a => Math.hypot(a[0], a[1]);
const uni = a => { const l = Math.hypot(a[0], a[1]) || 1; return [a[0] / l, a[1] / l]; };
const tourne = (a, deg) => { const c = Math.cos(deg * RAD), s = Math.sin(deg * RAD); return [a[0] * c - a[1] * s, a[0] * s + a[1] * c]; };
const borne = (v, a, b) => Math.max(a, Math.min(b, v));

// ─── enveloppes de disques, grille, flou ───────────────────────────────────────────────────
function enveloppe(pts) {                          // Andrew : enveloppe convexe, sens trigo (y bas : horaire à l'écran)
  const P = pts.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  if (P.length < 3) return P;
  const cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lo = [], hi = [];
  for (const p of P) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], p) <= 0) lo.pop(); lo.push(p); }
  for (let i = P.length - 1; i >= 0; i--) { const p = P[i]; while (hi.length >= 2 && cr(hi[hi.length - 2], hi[hi.length - 1], p) <= 0) hi.pop(); hi.push(p); }
  lo.pop(); hi.pop();
  return lo.concat(hi);
}
const NDISQUE = 36, KDISQUE = (1 + 1 / Math.cos(Math.PI / NDISQUE)) / 2;
function polyDisques(disques) {
  const pts = [];
  for (const d of disques) for (let k = 0; k < NDISQUE; k++) {
    const a = (k / NDISQUE) * 2 * Math.PI, r = d.r * KDISQUE;
    pts.push([d.x + r * Math.cos(a), d.y + r * Math.sin(a)]);
  }
  return enveloppe(pts);
}
// remplit un polygone convexe dans la grille (couverture exacte en x, 4 sous-lignes en y)
function remplir(poly, G, cible) {
  const n = poly.length; if (n < 3) return;
  let ymin = Infinity, ymax = -Infinity;
  for (const p of poly) { ymin = Math.min(ymin, p[1]); ymax = Math.max(ymax, p[1]); }
  const j0 = Math.max(0, Math.floor((ymin - G.y0) / G.res)), j1 = Math.min(G.ny - 1, Math.ceil((ymax - G.y0) / G.res) + 1);
  const SUB = 4, ligne = new Float32Array(G.nx);
  for (let j = j0; j <= j1; j++) {
    ligne.fill(0); let imin = G.nx, imax = -1;
    for (let k = 0; k < SUB; k++) {
      const y = G.y0 + (j - 0.5 + (k + 0.5) / SUB) * G.res;
      let xa = Infinity, xb = -Infinity;
      for (let e = 0; e < n; e++) {
        const p = poly[e], q = poly[(e + 1) % n];
        if ((p[1] <= y && q[1] > y) || (q[1] <= y && p[1] > y)) {
          const x = p[0] + ((y - p[1]) / (q[1] - p[1])) * (q[0] - p[0]);
          if (x < xa) xa = x; if (x > xb) xb = x;
        }
      }
      if (!(xa < xb)) continue;
      const ia = Math.max(0, Math.floor((xa - G.x0) / G.res + 0.5)), ib = Math.min(G.nx - 1, Math.floor((xb - G.x0) / G.res + 0.5));
      for (let i = ia; i <= ib; i++) {
        const cl = G.x0 + (i - 0.5) * G.res, cv = (Math.min(cl + G.res, xb) - Math.max(cl, xa)) / G.res;
        if (cv > 0) ligne[i] += cv / SUB;
      }
      imin = Math.min(imin, ia); imax = Math.max(imax, ib);
    }
    const o = j * G.nx;
    for (let i = imin; i <= imax; i++) if (ligne[i] > cible[o + i]) cible[o + i] = ligne[i];
  }
}
// flou gaussien : trois flous en boîte (Kovesi), séparables
function flou(src, G, sigma) {
  if (!(sigma > 0)) return Float32Array.from(src);
  const s = sigma / G.res, n = 3;
  const wIdeal = Math.sqrt((12 * s * s) / n + 1);
  let wl = Math.floor(wIdeal); if (wl % 2 === 0) wl--;
  const wu = wl + 2, m = Math.round((12 * s * s - n * wl * wl - 4 * n * wl - 3 * n) / (-4 * wl - 4));
  const tailles = [0, 1, 2].map(i => (i < m ? wl : wu));
  let a = Float32Array.from(src), b = new Float32Array(src.length);
  const boite = (inp, out, r, horiz) => {
    const { nx, ny } = G, k = 1 / (2 * r + 1);
    if (horiz) for (let j = 0; j < ny; j++) {
      const o = j * nx; let acc = 0;
      for (let i = -r; i <= r; i++) acc += i >= 0 && i < nx ? inp[o + i] : 0;
      for (let i = 0; i < nx; i++) {
        out[o + i] = acc * k;
        const ia = i + r + 1, ir = i - r;
        acc += (ia < nx ? inp[o + ia] : 0) - (ir >= 0 ? inp[o + ir] : 0);
      }
    } else for (let i = 0; i < nx; i++) {
      let acc = 0;
      for (let j = -r; j <= r; j++) acc += j >= 0 && j < ny ? inp[j * nx + i] : 0;
      for (let j = 0; j < ny; j++) {
        out[j * nx + i] = acc * k;
        const ja = j + r + 1, jr = j - r;
        acc += (ja < ny ? inp[ja * nx + i] : 0) - (jr >= 0 ? inp[jr * nx + i] : 0);
      }
    }
  };
  for (const w of tailles) { const r = (w - 1) / 2; boite(a, b, r, true); boite(b, a, r, false); }
  return a;
}
// valeur du champ en un point (bilinéaire)
function valeur(F, G, p) {
  const fx = (p[0] - G.x0) / G.res, fy = (p[1] - G.y0) / G.res;
  const i = Math.floor(fx), j = Math.floor(fy);
  if (i < 0 || j < 0 || i >= G.nx - 1 || j >= G.ny - 1) return 0;
  const tx = fx - i, ty = fy - j, o = j * G.nx + i;
  return (F[o] * (1 - tx) + F[o + 1] * tx) * (1 - ty) + (F[o + G.nx] * (1 - tx) + F[o + G.nx + 1] * tx) * ty;
}

// ─── courbes de niveau (carrés marchants) ──────────────────────────────────────────────────
function isolignes(F, G, iso = 0.5) {
  const { nx, ny } = G, segs = [], pts = new Map();
  const v = (i, j) => F[j * nx + i];
  const P = (id, i, j, horiz) => {
    if (pts.has(id)) return id;
    const a = horiz ? v(i, j) : v(i, j), b = horiz ? v(i + 1, j) : v(i, j + 1);
    const t = borne((iso - a) / (b - a), 0, 1);
    pts.set(id, horiz ? [G.x0 + (i + t) * G.res, G.y0 + j * G.res] : [G.x0 + i * G.res, G.y0 + (j + t) * G.res]);
    return id;
  };
  const H = (i, j) => P(2 * (j * nx + i), i, j, true), V = (i, j) => P(2 * (j * nx + i) + 1, i, j, false);
  for (let j = 0; j < ny - 1; j++) for (let i = 0; i < nx - 1; i++) {
    const a = v(i, j) > iso, b = v(i + 1, j) > iso, c = v(i + 1, j + 1) > iso, d = v(i, j + 1) > iso;
    const cas = (a ? 8 : 0) | (b ? 4 : 0) | (c ? 2 : 0) | (d ? 1 : 0);
    if (cas === 0 || cas === 15) continue;
    const T = () => H(i, j), R = () => V(i + 1, j), B = () => H(i, j + 1), L = () => V(i, j);
    switch (cas) {
      case 1: case 14: segs.push([L(), B()]); break;
      case 2: case 13: segs.push([B(), R()]); break;
      case 3: case 12: segs.push([L(), R()]); break;
      case 4: case 11: segs.push([T(), R()]); break;
      case 6: case 9: segs.push([T(), B()]); break;
      case 7: case 8: segs.push([L(), T()]); break;
      case 5: case 10: {
        const centre = (v(i, j) + v(i + 1, j) + v(i + 1, j + 1) + v(i, j + 1)) / 4 > iso;
        if ((cas === 5) === centre) { segs.push([L(), T()]); segs.push([B(), R()]); }
        else { segs.push([L(), B()]); segs.push([T(), R()]); }
        break;
      }
    }
  }
  const par = new Map();
  segs.forEach((s, k) => { for (const id of s) { if (!par.has(id)) par.set(id, []); par.get(id).push(k); } });
  const vu = new Uint8Array(segs.length), boucles = [];
  for (let k0 = 0; k0 < segs.length; k0++) {
    if (vu[k0]) continue;
    vu[k0] = 1;
    const ids = [segs[k0][0], segs[k0][1]];
    let cur = segs[k0][1], ferme = false;
    for (;;) {
      const l = par.get(cur).filter(k => !vu[k]);
      if (!l.length) { ferme = cur === ids[0]; break; }
      const k = l[0]; vu[k] = 1;
      const nxt = segs[k][0] === cur ? segs[k][1] : segs[k][0];
      if (nxt === ids[0]) { ferme = true; break; }
      ids.push(nxt); cur = nxt;
    }
    const pl = [];
    for (const id of ids) { const p = pts.get(id); if (!pl.length || lon(sub(p, pl[pl.length - 1])) > 1e-4) pl.push(p); }
    if (pl.length > 3) boucles.push({ pts: pl, ferme });
  }
  return boucles;
}
const aire = pts => { let s = 0; for (let i = 0; i < pts.length; i++) { const p = pts[i], q = pts[(i + 1) % pts.length]; s += p[0] * q[1] - q[0] * p[1]; } return s / 2; };

// ─── ajustement en cubiques (Schneider) ────────────────────────────────────────────────────
function bez(b, t) { const m = 1 - t; return [0, 1].map(k => m * m * m * b[0][k] + 3 * m * m * t * b[1][k] + 3 * m * t * t * b[2][k] + t * t * t * b[3][k]); }
function bezD(b, t) { const m = 1 - t; return [0, 1].map(k => 3 * m * m * (b[1][k] - b[0][k]) + 6 * m * t * (b[2][k] - b[1][k]) + 3 * t * t * (b[3][k] - b[2][k])); }
function bezDD(b, t) { const m = 1 - t; return [0, 1].map(k => 6 * m * (b[2][k] - 2 * b[1][k] + b[0][k]) + 6 * t * (b[3][k] - 2 * b[2][k] + b[1][k])); }
function genere(pts, u, t1, t2) {
  const p0 = pts[0], p3 = pts[pts.length - 1];
  let c00 = 0, c01 = 0, c11 = 0, x0 = 0, x1 = 0;
  for (let i = 0; i < pts.length; i++) {
    const t = u[i], m = 1 - t, b0 = m * m * m, b1 = 3 * m * m * t, b2 = 3 * m * t * t, b3 = t * t * t;
    const A1 = mul(t1, b1), A2 = mul(t2, b2);
    c00 += dot(A1, A1); c01 += dot(A1, A2); c11 += dot(A2, A2);
    const tmp = sub(pts[i], add(mul(p0, b0 + b1), mul(p3, b2 + b3)));
    x0 += dot(A1, tmp); x1 += dot(A2, tmp);
  }
  const det = c00 * c11 - c01 * c01, L = lon(sub(p3, p0));
  let a1 = det ? (x0 * c11 - x1 * c01) / det : 0, a2 = det ? (c00 * x1 - c01 * x0) / det : 0;
  if (!(a1 > L * 1e-3) || !(a2 > L * 1e-3) || a1 > L * 2 || a2 > L * 2) { a1 = a2 = L / 3; }
  return [p0, add(p0, mul(t1, a1)), add(p3, mul(t2, a2)), p3];
}
function erreurMax(pts, b, u) {
  let m = 0, k = Math.floor(pts.length / 2);
  for (let i = 1; i < pts.length - 1; i++) { const d = lon(sub(bez(b, u[i]), pts[i])); if (d > m) { m = d; k = i; } }
  return [m, k];
}
function ajuste(pts, t1, t2, tol, out) {
  if (pts.length === 2) { const L = lon(sub(pts[1], pts[0])) / 3; out.push([pts[0], add(pts[0], mul(t1, L)), add(pts[1], mul(t2, L)), pts[1]]); return; }
  const u = [0]; for (let i = 1; i < pts.length; i++) u.push(u[i - 1] + lon(sub(pts[i], pts[i - 1])));
  const Lt = u[u.length - 1]; for (let i = 0; i < u.length; i++) u[i] /= Lt;
  let b = genere(pts, u, t1, t2), [e, k] = erreurMax(pts, b, u);
  if (e < tol) { out.push(b); return; }
  if (e < tol * 6) for (let it = 0; it < 6; it++) {
    for (let i = 1; i < pts.length - 1; i++) {
      const d = sub(bez(b, u[i]), pts[i]), d1 = bezD(b, u[i]), d2 = bezDD(b, u[i]);
      const den = dot(d1, d1) + dot(d, d2); if (den) u[i] = borne(u[i] - dot(d, d1) / den, 0, 1);
    }
    b = genere(pts, u, t1, t2); [e, k] = erreurMax(pts, b, u);
    if (e < tol) { out.push(b); return; }
  }
  k = borne(k, 1, pts.length - 2);
  const tc = uni(sub(pts[k - 1], pts[k + 1]));
  ajuste(pts.slice(0, k + 1), t1, tc, tol, out);
  ajuste(pts.slice(k), mul(tc, -1), t2, tol, out);
}
// rééchantillonne une polyligne à pas régulier
function reechantillonne(pts, pas, ferme) {
  const P = ferme ? pts.concat([pts[0]]) : pts, out = [P[0]];
  let reste = pas;
  for (let i = 1; i < P.length; i++) {
    let a = P[i - 1]; const b = P[i]; let d = lon(sub(b, a));
    while (d >= reste) { a = add(a, mul(sub(b, a), reste / d)); out.push(a); d -= reste; reste = pas; }
    reste -= d;
  }
  if (ferme) { if (lon(sub(out[out.length - 1], out[0])) < pas * 0.5) out.pop(); }
  else if (lon(sub(out[out.length - 1], P[P.length - 1])) > pas * 0.2) out.push(P[P.length - 1]);
  return out;
}
// coins vrais : virage de plus de `seuil` degrés sur ±w mm, maximum local
function coins(pts, ferme, pas, seuil = 42, w = 1.6) {
  const n = pts.length, k = Math.max(1, Math.round(w / pas)), out = [];
  const at = i => pts[ferme ? (i + n) % n : borne(i, 0, n - 1)];
  const vir = [];
  for (let i = 0; i < n; i++) {
    if (!ferme && (i < k || i > n - 1 - k)) { vir.push(0); continue; }
    const a = uni(sub(at(i), at(i - k))), b = uni(sub(at(i + k), at(i)));
    vir.push(Math.acos(borne(dot(a, b), -1, 1)) / RAD);
  }
  for (let i = 0; i < n; i++) {
    if (vir[i] < seuil) continue;
    let max = true;
    for (let d = -k; d <= k; d++) { const j = ferme ? (i + d + n) % n : i + d; if (j < 0 || j >= n || j === i) continue; if (vir[j] > vir[i] || (vir[j] === vir[i] && j < i)) { max = false; break; } }
    if (max) out.push(i);
  }
  return out;
}
const tangenteEn = (pts, i, sens, k = 3) => { const n = pts.length; const j = borne(i + sens * k, 0, n - 1); return uni(sub(pts[j], pts[i])); };
// polyligne → cubiques. Une courbe fermée se coupe à ses coins ; sans coin, en deux.
function versCubiques(brut, ferme, tol = 0.07) {
  const pas = 0.4, pts = reechantillonne(brut, pas, ferme);
  if (pts.length < 4) return [];
  const out = [];
  if (!ferme) {
    const cs = coins(pts, false, pas);
    const cuts = [0, ...cs, pts.length - 1];
    for (let c = 0; c < cuts.length - 1; c++) {
      const sl = pts.slice(cuts[c], cuts[c + 1] + 1); if (sl.length < 2) continue;
      ajuste(sl, tangenteEn(sl, 0, 1), tangenteEn(sl, sl.length - 1, -1), tol, out);
    }
    return out;
  }
  const n = pts.length, vrais = coins(pts, true, pas), estCoin = new Set(vrais);
  let cuts = vrais.slice();
  if (!cuts.length) cuts = [0, Math.floor(n / 2)];
  else if (cuts.length === 1) cuts.push((cuts[0] + Math.floor(n / 2)) % n);
  cuts.sort((a, b) => a - b);
  const P = i => pts[((i % n) + n) % n];
  const tc = i => uni(sub(P(i + 2), P(i - 2)));
  for (let c = 0; c < cuts.length; c++) {
    const a = cuts[c], b = c + 1 < cuts.length ? cuts[c + 1] : cuts[0] + n;
    const sl = []; for (let i = a; i <= b; i++) sl.push(P(i));
    if (sl.length < 2) continue;
    const t1 = estCoin.has(a % n) ? tangenteEn(sl, 0, 1) : tc(a);
    const t2 = estCoin.has(b % n) ? tangenteEn(sl, sl.length - 1, -1) : mul(tc(b), -1);
    ajuste(sl, t1, t2, tol, out);
  }
  return out;
}
const fmt = v => { const r = Math.round(v * 100) / 100; return (Object.is(r, -0) ? 0 : r).toString(); };
function dDe(cubes, ferme, T = p => p) {
  if (!cubes.length) return '';
  const q = p => { const r = T(p); return `${fmt(r[0])} ${fmt(r[1])}`; };
  let s = `M${q(cubes[0][0])}`;
  for (const b of cubes) s += ` C${q(b[1])} ${q(b[2])} ${q(b[3])}`;
  return ferme ? s + ' Z' : s;
}

// ─── du volume au dessin ───────────────────────────────────────────────────────────────────
// modele : { coques: [{ s: [[x, y, z, r, mobile]…], piece, groupe }], groupes: { nom: sigma },
//            lignes: [[[pieces A], [pieces B]], …] (par priorité), nLignes, points: { nom: [x,y,z] } }
// vue    : { proj: p3 → [x, y, z] (z : profondeur, petit = près de l'œil), plie, coupe: { axe, val } }
function construire(modele, vue) {
  const plie = vue.plie || 0;
  const pj = (s) => {
    const q = vue.proj([s[0], s[1], s[2]]);
    let xy = [q[0], q[1]];
    if (plie && s[4]) xy = tourne(xy, -plie);
    return { x: xy[0], y: xy[1], z: q[2], r: s[3] };
  };
  const coques = modele.coques.map(c => {
    const d = c.s.map(pj);
    return { piece: c.piece, groupe: c.groupe, devant: c.devant, d, poly: polyDisques(d), zAvant: Math.min(...d.map(q => q.z - q.r)), zMoy: d.reduce((a, q) => a + q.z, 0) / d.length };
  });
  const sigMax = Math.max(...Object.values(modele.groupes));
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const c of coques) for (const p of c.poly) { x0 = Math.min(x0, p[0]); y0 = Math.min(y0, p[1]); x1 = Math.max(x1, p[0]); y1 = Math.max(y1, p[1]); }
  const marge = 3 * sigMax + 2;
  x0 -= marge; y0 -= marge; x1 += marge; y1 += marge;
  const cp = vue.coupe;
  if (cp) { if (cp.axe === 0) x0 = Math.max(x0, cp.val - 3); else y0 = Math.max(y0, cp.val - 3); }
  const G = { x0, y0, res: RES, nx: Math.ceil((x1 - x0) / RES) + 2, ny: Math.ceil((y1 - y0) / RES) + 2 };
  const N = G.nx * G.ny;
  // masques et profondeurs par pièce
  const pieces = {};
  for (const c of coques) {
    if (!pieces[c.piece]) pieces[c.piece] = { m: new Float32Array(N), groupe: c.groupe, coques: [] };
    pieces[c.piece].coques.push(c);
    remplir(c.poly, G, pieces[c.piece].m);
  }
  // le champ de la silhouette : chaque groupe flouté, puis le plus fort ; la coupe nette
  const parGroupe = {};
  for (const [nom, p] of Object.entries(pieces)) {
    if (!parGroupe[p.groupe]) parGroupe[p.groupe] = new Float32Array(N);
    const g = parGroupe[p.groupe]; for (let i = 0; i < N; i++) if (p.m[i] > g[i]) g[i] = p.m[i];
  }
  const U = new Float32Array(N);
  for (const [g, m] of Object.entries(parGroupe)) { const F = flou(m, G, modele.groupes[g]); for (let i = 0; i < N; i++) if (F[i] > U[i]) U[i] = F[i]; }
  if (cp) for (let j = 0; j < G.ny; j++) for (let i = 0; i < G.nx; i++) {
    const t = cp.axe === 0 ? G.x0 + i * RES : G.y0 + j * RES;
    const r = borne(0.5 + (t - cp.val) / RES, 0, 1), o = j * G.nx + i;
    if (r < U[o]) U[o] = r;
  }
  // le contour
  const boucles = isolignes(U, G, 0.5).filter(b => b.ferme);
  boucles.sort((a, b) => Math.abs(aire(b.pts)) - Math.abs(aire(a.pts)));
  if (!boucles.length) throw new Error('extremites : contour vide');
  const ext = boucles[0];
  if (aire(ext.pts) < 0) ext.pts.reverse();
  // pas de trou, sauf demandé (l'anneau de la pince) : un jour entre deux pièces se bouche
  const contour = [versCubiques(ext.pts, true)];
  if (modele.trous) for (const t of boucles.slice(1)) if (Math.abs(aire(t.pts)) > modele.trous && dedans(t.pts[0], ext.pts)) contour.push(versCubiques(t.pts, true));
  const champ = noms => {
    const cle = noms.join('+');
    if (!champ.c[cle]) {
      const m = new Float32Array(N);
      for (const nm of noms) if (pieces[nm]) { const pm = pieces[nm].m; for (let i = 0; i < N; i++) if (pm[i] > m[i]) m[i] = pm[i]; }
      const sg = noms.map(nm => pieces[nm] && modele.groupes[pieces[nm].groupe]).filter(Boolean);
      champ.c[cle] = flou(m, G, sg.length ? Math.max(...sg) : sigMax);
    }
    return champ.c[cle];
  };
  champ.c = {};
  // profondeur d'une pièce en un point : la plus proche des coques qui le couvrent (ou les plus proches)
  const profondeur = (noms, p) => {
    let best = Infinity, dmin = Infinity, zProche = Infinity;
    for (const nm of noms) if (pieces[nm]) for (const c of pieces[nm].coques) {
      const d = distPoly(p, c.poly);
      if (d <= 1.5) best = Math.min(best, c.zAvant);
      if (d < dmin) { dmin = d; zProche = c.zAvant; }
    }
    return best < Infinity ? best : zProche;
  };
  // les traits intérieurs : bord de A à l'intérieur de B, quand A est devant
  const lignes = [];
  const essais = modele.lignes || [];
  for (const [Aa, Bb, force] of essais) {
    if (lignes.length >= (modele.nLignes || 1)) break;
    const tr = force ? traitInterieur(Aa, Bb, true) : traitInterieur(Aa, Bb).concat(traitInterieur(Bb, Aa));
    tr.sort((a, b) => longueur(b) - longueur(a));
    for (const t of tr) if (lignes.length < (modele.nLignes || 1)) lignes.push(t);
  }
  function traitInterieur(Aa, Bb, force = false) {
    if (!Aa.some(n => pieces[n]) || !Bb.some(n => pieces[n])) return [];
    const FA = champ(Aa), FB = champ(Bb), out = [];
    const marge = modele.margeTrait || 0.2;
    for (const b of isolignes(FA, G, 0.5)) {
      const pts = reechantillonne(b.pts, 0.4, b.ferme), n = pts.length;
      const ok = pts.map(p => valeur(FB, G, p) > 0.5 + marge && valeur(U, G, p) > 0.5 + marge && (force || profondeur(Aa, p) < profondeur(Bb, p) - 0.5)
        && (!cp || (cp.axe === 0 ? p[0] : p[1]) > cp.val + 2));
      // des suites de points retenus (la boucle peut commencer au milieu d'une suite)
      let deb = 0; if (b.ferme && ok.every(Boolean)) { out.push(pts); continue; }
      if (b.ferme) { while (deb < n && ok[deb]) deb++; }
      // les suites séparées par un trou de moins de 3 mm se recollent (un pli de la grille, pas un vrai bout)
      const trou = Math.round(3 / 0.4);
      let cur = [], vide = 0, enAttente = [];
      for (let k = 0; k <= n; k++) {
        const i = (deb + k) % n, bon = k < n && ok[i] && (b.ferme || deb + k < n);
        if (bon) { if (vide && vide <= trou && cur.length) cur.push(...enAttente); else if (vide && cur.length) { out.push(cur); cur = []; }
          vide = 0; enAttente = []; cur.push(pts[i]); }
        else { vide++; if (k < n) enAttente.push(pts[i]); }
      }
      if (cur.length) out.push(cur);
    }
    const rogne = modele.rogne == null ? 1.2 : modele.rogne, mini = modele.traitMin || 14;
    return out.map(l => rogner(l, rogne)).filter(l => l.length > 2 && longueur(l) >= mini);
  }
  const details = lignes.map(l => versCubiques(l, false, 0.06));
  // les points utiles
  const pts = {};
  for (const [k, p] of Object.entries(modele.points || {})) { const q = pj([p[0], p[1], p[2], 0, p[3] == null ? 1 : p[3]]); pts[k] = [q.x, q.y, q.z]; }
  // la pièce de devant (prise : les doigts devant le manche)
  let devant = null;
  if (modele.devant) {
    const zAxe = pts[modele.devant.repere][2];
    const paume = coques.filter(c => c.piece === 'paume'), zPaume = paume.reduce((a, c) => a + c.zMoy, 0) / (paume.length || 1);
    const avant = zPaume > zAxe ? coques.filter(c => c.devant) : [];
    if (avant.length) {
      // la pièce de devant : min(silhouette, champ des doigts + 0,2) — là où elle touche le dehors,
      // son bord EST la silhouette (même courbe de niveau), à l'intérieur c'est le bord des doigts
      const m = new Float32Array(N); for (const c of avant) remplir(c.poly, G, m);
      const F = flou(m, G, modele.groupes[avant[0].groupe]);
      for (let i = 0; i < N; i++) F[i] = Math.min(U[i], F[i] + 0.2);
      const bs = isolignes(F, G, 0.5).filter(b => b.ferme).sort((a, b) => Math.abs(aire(b.pts)) - Math.abs(aire(a.pts)));
      if (bs.length) {
        const pl = bs[0].pts; if (aire(pl) < 0) pl.reverse();
        const R = reechantillonne(pl, 0.4, true), sur = R.map(p => valeur(U, G, p) < 0.53);
        const bords = [], interieurs = []; let cur = [], etat = sur[0];
        let deb = 0; while (deb < R.length && sur[deb] === sur[0]) deb++;
        if (deb >= R.length) deb = 0;
        etat = sur[deb]; cur = [];
        for (let k = 0; k <= R.length; k++) {
          const i = (deb + k) % R.length;
          if (k < R.length && sur[i] === etat) cur.push(R[i]);
          else { if (cur.length > 2) (etat ? bords : interieurs).push(cur); if (k < R.length) { cur = [R[(i - 1 + R.length) % R.length], R[i]]; etat = sur[i]; } }
        }
        devant = { contour: versCubiques(pl, true), bord: bords.map(l => versCubiques(l, false)), interieur: interieurs.filter(l => longueur(l) > 2).map(l => versCubiques(l, false)) };
      }
    }
  }
  return { contour, details, pts, devant, polygone: decime(ext.pts, 0.05), G, debug: coques.map(c => ({ piece: c.piece, poly: c.poly, z: c.zAvant })) };
}
function dedans(p, poly) {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const a = poly[i], b = poly[j];
    if ((a[1] > p[1]) !== (b[1] > p[1]) && p[0] < ((b[0] - a[0]) * (p[1] - a[1])) / (b[1] - a[1]) + a[0]) c = !c;
  }
  return c;
}
function distPoly(p, poly) {                       // 0 dedans, sinon la distance au bord
  if (dedans(p, poly)) return 0;
  let m = Infinity;
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i], b = poly[(i + 1) % poly.length], ab = sub(b, a);
    const t = borne(dot(sub(p, a), ab) / (dot(ab, ab) || 1), 0, 1);
    m = Math.min(m, lon(sub(p, add(a, mul(ab, t)))));
  }
  return m;
}
const longueur = l => { let s = 0; for (let i = 1; i < l.length; i++) s += lon(sub(l[i], l[i - 1])); return s; };
function rogner(l, d) {
  if (longueur(l) <= 2 * d + 1) return [];
  const coupe = (pts, d) => { let s = 0; for (let i = 1; i < pts.length; i++) { const e = lon(sub(pts[i], pts[i - 1])); if (s + e >= d) { const t = (d - s) / e; return [add(pts[i - 1], mul(sub(pts[i], pts[i - 1]), t)), ...pts.slice(i)]; } s += e; } return pts.slice(-1); };
  return coupe(coupe(l, d).reverse(), d).reverse();
}
function decime(pts, tol) {                        // Douglas-Peucker sur une boucle
  const dp = (P) => {
    if (P.length < 3) return P;
    let m = 0, k = 0; const a = P[0], b = P[P.length - 1], ab = sub(b, a), L = lon(ab) || 1;
    for (let i = 1; i < P.length - 1; i++) { const d = Math.abs((ab[0] * (P[i][1] - a[1]) - ab[1] * (P[i][0] - a[0])) / L); if (d > m) { m = d; k = i; } }
    if (m <= tol) return [a, b];
    return dp(P.slice(0, k + 1)).slice(0, -1).concat(dp(P.slice(k)));
  };
  const h = Math.floor(pts.length / 2);
  return dp(pts.slice(0, h + 1)).slice(0, -1).concat(dp(pts.slice(h).concat([pts[0]])).slice(0, -1)).map(p => [f2(p[0]), f2(p[1])]);
}

// ─── la main ───────────────────────────────────────────────────────────────────────────────
// Repère du volume (main DROITE) : X le long de l'avant-bras vers les doigts, Y du pouce (−) vers
// le petit doigt (+), Z du dos (−) vers la paume (+). Poignet en (0, 0, 0). Millimètres d'homme.
// Une sphère : [x, y, z, r, mobile] ; mobile = 1 : elle suit la main quand le poignet plie.
const DOIGTS = [
  // Les doigts de la moufle : un peu plus pleins et plus égaux qu'au naturel, qui convergent
  // légèrement vers le bout (la moufle s'arrondit au lieu de finir en biais).
  //            MCP [X, Y]     écart (°, + vers le petit doigt)  phalanges   rayons : MCP, IPP, IPD, bout
  { nom: 'index',       mcp: [94, -29],  ecart: 3,  ph: [43, 26, 21], r: [11.0, 9.9, 9.1, 8.8] },
  { nom: 'majeur',      mcp: [95, -9.5], ecart: 0.5, ph: [44, 27, 21], r: [11.2, 10.1, 9.3, 9.0] },
  { nom: 'annulaire',   mcp: [91, 9.5],  ecart: -2.5, ph: [44, 27, 21], r: [10.8, 9.8, 9.0, 8.7] },
  { nom: 'auriculaire', mcp: [85, 27],   ecart: -7, ph: [41, 25, 21], r: [10.0, 9.1, 8.4, 8.1] },
];
const POUCE = { cmc: [16, -20, 6], ph: [44, 33, 28], r: [13.5, 11.8, 10.8, 9.6] };
const MOIGNON = { W: 60, T: 40 };                   // le poignet : 60 de large, 40 d'épais

// une chaîne de phalanges pliée dans son plan (plan de d0 et de +Z), flexions en degrés
function doigtPlie(D, flex) {
  const d0 = [Math.cos(D.ecart * RAD), Math.sin(D.ecart * RAD), 0], k = U3(X3(d0, [0, 0, 1]));
  const P = [[D.mcp[0], D.mcp[1], 0]];
  let d = d0;
  D.ph.forEach((L, i) => { d = U3(rot3(d, k, flex[i] || 0)); const l = i === 2 ? L - D.r[3] : L; P.push(A3(P[i], M3(d, l))); });
  return P;
}
// une chaîne qui s'enroule autour d'un cylindre d'axe (H, a) et de rayon R (le manche)
function doigtEnroule(D, H, a, R, maxi = [92, 108, 80], serre = 0) {
  const d0 = [Math.cos(D.ecart * RAD), Math.sin(D.ecart * RAD), 0], z = [0, 0, 1], k = U3(X3(d0, z));
  const M = [D.mcp[0], D.mcp[1], 0];
  const t = D3(k, S3(M, H)) / (D3(k, a) || 1e-6);
  const C3 = A3(H, M3(a, t));                         // l'axe du manche dans le plan du doigt
  const Rp = R / Math.max(0.3, Math.abs(D3(k, a)));
  const C = [D3(S3(C3, M), d0), D3(S3(C3, M), z)];    // (u, w) dans le plan
  let P = [0, 0], dir = [1, 0];
  const pts2 = [P.slice()];
  D.ph.forEach((L, i) => {
    const rho = Rp + (D.r[i] + D.r[i + 1]) / 2 + 0.5 - serre;
    const v = sub(C, P), dd = lon(v);
    let tan;
    if (dd <= rho + 0.01) tan = tourne(uni(v), -90);
    else tan = tourne(uni(v), -Math.asin(rho / dd) / RAD);
    // le doigt tourne de +u vers +w (sens trigo dans (u, w))
    let f = Math.atan2(dir[0] * tan[1] - dir[1] * tan[0], dot(dir, tan)) / RAD;
    f = borne(f, 0, maxi[i]);
    dir = tourne(dir, f);
    const l = i === 2 ? L - D.r[3] : L;
    P = add(P, mul(dir, l)); pts2.push(P.slice());
  });
  return pts2.map(([u, w]) => A3(M, A3(M3(d0, u), M3(z, w))));
}
// deux segments de A vers la cible, la jointure du côté de `pole`
function ik3(A, L1, L2, cible, pole) {
  const v = S3(cible, A), d = borne(L3(v), Math.abs(L1 - L2) + 0.01, L1 + L2 - 0.01), u = U3(v);
  const ca = borne((L1 * L1 + d * d - L2 * L2) / (2 * L1 * d), -1, 1), sa = Math.sqrt(1 - ca * ca);
  const pp = U3(S3(pole, M3(u, D3(pole, u))));
  const J = A3(A, A3(M3(u, L1 * ca), M3(pp, L1 * sa)));
  return [J, A3(J, M3(U3(S3(A3(A, M3(u, d)), J)), L2))];
}
// le pouce : métacarpien dans la direction dm, bout de la phalange visé, jointure vers pole
function pouce(dm, cible, pole) {
  const C = POUCE.cmc, Mp = A3(C, M3(U3(dm), POUCE.ph[0]));
  const [I, B] = ik3(Mp, POUCE.ph[1], POUCE.ph[2] - POUCE.r[3], cible, pole);
  return [C, Mp, I, B];
}
const sph = (p, r, m = 1) => [p[0], p[1], p[2], r, m];

// Les poses. Chacune rend { doigts: [chaînes de 4 points], pouce: [4 points], points, devant? }.
function poseMain(pose, o) {
  const R = (o.diametre || 32) / 2;
  const fl = (a, b, c) => [a, b, c];
  switch (pose) {
    case 'ouverte': {     // la main qui pend, détendue
      const doigts = [fl(5, 9, 4), fl(6, 11, 5), fl(8, 13, 6), fl(10, 15, 7)].map((f, i) => doigtPlie(DOIGTS[i], f));
      const p = pouce([0.7, -0.7, 0.18], [118, -72, 6], [0, -1, -0.2]);
      return { doigts, pouce: p, points: { prise: [70, 0, 20], bout: doigts[1][3] } };
    }
    case 'plat': {        // posée à plat, paume en bas : la paume et les doigts sur un même plan
      const doigts = [fl(9, 2, 1), fl(9, 2, 1), fl(10, 2, 1), fl(11, 2, 1)].map((f, i) => doigtPlie(DOIGTS[i], f));
      const p = pouce([0.66, -0.72, 0.22], [114, -74, 13], [0, -0.3, -1]);
      return { doigts, pouce: p, points: { prise: [70, 0, 24], bout: doigts[1][3] }, appui: true };
    }
    case 'prise': {       // le poing fermé autour d'un manche
      const inc = (o.inclinaison || 0) * RAD;
      const a = U3([-Math.sin(inc), Math.cos(inc), 0]);           // l'axe du manche, du pouce vers le petit doigt
      const H = [72 + R * 0.12, 0, 12.5 + R];
      const doigts = DOIGTS.map(D => doigtEnroule(D, H, a, R));
      // le pouce passe par-dessus l'index et le majeur, sur leur phalange du milieu
      const i1 = doigts[0], mi = A3(M3(i1[1], 0.45), M3(i1[2], 0.55));
      const kI = U3(X3([1, 0, 0], [0, 0, 1]));
      const tI = D3(kI, S3(i1[1], H)) / (D3(kI, a) || 1e-6), Ci = A3(H, M3(a, tI));
      const out = U3(S3(mi, Ci));
      const cible = A3(A3(mi, M3(out, DOIGTS[0].r[1] + POUCE.r[3] - 2)), [0, 1, 0]);
      const p = pouce([0.5, -0.45, 0.74], cible, A3(out, [0, -0.6, 0]));
      return { doigts, pouce: p, points: { prise: H, axe: A3(H, a), bout: doigts[1][2] }, manche: { H, a, R },
        devant: { pieces: ['doigts', 'pouce'], repere: 'prise' } };
    }
    case 'porte': {       // paume en haut sous une charge (le fond d'une caisse), le pouce le long du côté
      const doigts = [fl(6, 6, 3), fl(6, 6, 3), fl(7, 7, 3), fl(8, 8, 4)].map((f, i) => doigtPlie(DOIGTS[i], f));
      const p = pouce([0.7, -0.7, 0.24], [118, -70, 15], [0, -1, 0.1]);
      // le plan de charge : tangent au dessus de la paume et des doigts
      return { doigts, pouce: p, points: { bout: doigts[1][3] }, plan: true };
    }
    case 'pointe': {      // l'index tendu, les autres repliés
      const H = [74, 0, 22];
      const doigts = [doigtPlie(DOIGTS[0], [2, 6, 3]), ...DOIGTS.slice(1).map(D => doigtEnroule(D, H, [0, 1, 0], 7, [90, 108, 80], 1.5))];
      const m1 = doigts[1], mi = A3(M3(m1[1], 0.4), M3(m1[2], 0.6));
      const out = U3(S3(mi, H));
      const p = pouce([0.5, -0.42, 0.75], A3(A3(mi, M3(out, 14)), [0, -9, 0]), A3(out, [0, -0.6, 0]));
      return { doigts, pouce: p, points: { prise: doigts[0][3], bout: doigts[0][3] }, index: true };
    }
    case 'pince': {       // le pouce et l'index qui pincent
      // l'index s'enroule vers la paume, le pouce vient chercher sa pulpe : un anneau. Les trois
      // autres doigts restent presque tendus, dans le plan de la main : l'anneau se détache.
      const doigts = [doigtPlie(DOIGTS[0], [42, 66, 32]), doigtPlie(DOIGTS[1], [14, 20, 10]), doigtPlie(DOIGTS[2], [18, 24, 12]), doigtPlie(DOIGTS[3], [22, 28, 14])];
      const ix = doigts[0], dd = U3(S3(ix[3], ix[2])), k = U3(X3([Math.cos(DOIGTS[0].ecart * RAD), Math.sin(DOIGTS[0].ecart * RAD), 0], [0, 0, 1]));
      const pad = U3(rot3(dd, k, 90));                                  // la pulpe de l'index
      const cible = A3(ix[3], M3(pad, DOIGTS[0].r[3] + POUCE.r[3] - 3));
      const p = pouce([0.72, -0.32, 0.62], cible, [0, -0.5, -1]);
      return { doigts, pouce: p, points: { prise: A3(ix[3], M3(pad, DOIGTS[0].r[3] - 0.5)), bout: ix[3] }, index: true };
    }
    default: throw new Error(`main : pose « ${pose} » inconnue (connues : ouverte, plat, prise, porte, pointe, pince)`);
  }
}
// le volume d'une main : le moignon (fixe), la paume, la moufle, le pouce
function volumeMain(pose, o) {
  const P = poseMain(pose, o), coques = [];
  const kW = o.kPoignet || 1;
  const { W, T } = MOIGNON, rw = (T / 2) * kW, yw = ((W - T) / 2) * kW;
  // le moignon, dans l'avant-bras
  coques.push({ s: [sph([-60, -yw, 0], rw, 0), sph([-60, yw, 0], rw, 0), sph([-10, -yw, 0], rw, 0), sph([-10, yw, 0], rw, 0)], piece: 'moignon', groupe: 'main' });
  const kP = 1 + (kW - 1) * 0.6;
  const base = [sph([7, -12 * kP, 0], 18.5 * kP), sph([7, 12 * kP, 0], 18.5 * kP)];
  // le poignet : du moignon à la base de la paume (il plie)
  coques.push({ s: [sph([-10, -yw, 0], rw, 0), sph([-10, yw, 0], rw, 0), ...base], piece: 'paume', groupe: 'main' });
  // la paume : base, éminences du pouce et du petit doigt, rangée des jointures
  const mcp = P.doigts.map((c, i) => sph(c[0], DOIGTS[i].r[0]));
  coques.push({ s: [...base, sph([33, -21, 7], 15.5), sph([46, 24, 4], 15), sph(POUCE.cmc, POUCE.r[0]), ...mcp], piece: 'paume', groupe: 'main' });
  // les doigts : une moufle, l'enveloppe de deux doigts voisins phalange par phalange
  const rails = P.doigts.map((c, i) => c.map((p, k) => sph(p, DOIGTS[i].r[k])));
  const pieceDoigt = i => (P.index && i === 0 ? 'index' : 'doigts');
  for (let i = 0; i < 4; i++) for (let k = 0; k < 3; k++) {
    const dv = k >= 1 ? 1 : 0;           // prise : les phalanges du milieu et du bout passent devant le manche
    if (i < 3 && !(P.index && i === 0)) coques.push({ s: [rails[i][k], rails[i][k + 1], rails[i + 1][k], rails[i + 1][k + 1]], piece: 'doigts', groupe: 'main', devant: dv });
    coques.push({ s: [rails[i][k], rails[i][k + 1]], piece: pieceDoigt(i), groupe: 'main', devant: dv });
  }
  // le pouce : le métacarpien dans la paume, les deux phalanges à part
  const pc = P.pouce, rp = POUCE.r;
  coques.push({ s: [sph(pc[0], rp[0]), sph(pc[1], rp[1])], piece: 'paume', groupe: 'main' });
  // l'éminence du pouce : la masse entre le métacarpien du pouce et la paume (la palmure)
  coques.push({ s: [sph(pc[0], rp[0]), sph(A3(M3(pc[0], 0.45), M3(pc[1], 0.55)), rp[0] * 0.95), sph([33, -21, 7], 15.5), mcp[0]], piece: 'paume', groupe: 'main' });
  coques.push({ s: [sph(pc[1], rp[1]), sph(pc[2], rp[2])], piece: 'pouce', groupe: 'main' });
  coques.push({ s: [sph(pc[2], rp[2]), sph(pc[3], rp[3])], piece: 'pouce', groupe: 'main' });
  const points = Object.assign({}, P.points, { poignet: [0, 0, 0, 0], pouceBout: pc[3] });
  if (P.plan) {           // porte : le plan de charge, tangent au côté paume (paume et doigts, sans le pouce)
    let Zp = -Infinity;
    for (const c of coques) if (c.piece !== 'pouce' && c.piece !== 'moignon') for (const s of c.s) if (s[0] > 30 && s[0] < 178) Zp = Math.max(Zp, s[2] + s[3]);
    Object.assign(points, { charge: [110, 0, Zp], chargeX: [130, 0, Zp], normale: [110, 0, Zp + 20] });
  }
  for (const k of Object.keys(points)) if (points[k].length === 3) points[k] = [...points[k], 1];
  points.poignet = [0, 0, 0, 0];
  return { coques, P, points };
}

const FACES = { dos: 0, pouce: 90, paume: 180, tranche: 270 };
const FACE_DEFAUT = {
  profil: { P: { ouverte: 'dos', plat: 'tranche', prise: 'dos', porte: 'pouce', pointe: 'dos', pince: 'pouce' },
            L: { ouverte: 'paume', plat: 'pouce', prise: 'paume', porte: 'tranche', pointe: 'paume', pince: 'pouce' } },
  face:   { P: { ouverte: 'pouce', plat: 'dos', prise: 'dos', porte: 'pouce', pointe: 'dos', pince: 'pouce' },
            L: { ouverte: 'pouce', plat: 'dos', prise: 'dos', porte: 'pouce', pointe: 'dos', pince: 'pouce' } },
  dos:    { P: { ouverte: 'tranche', plat: 'dos', prise: 'dos', porte: 'tranche', pointe: 'dos', pince: 'tranche' },
            L: { ouverte: 'tranche', plat: 'dos', prise: 'dos', porte: 'tranche', pointe: 'dos', pince: 'tranche' } },
  dessus: { P: { ouverte: 'dos', plat: 'dos', prise: 'pouce', porte: 'paume', pointe: 'dos', pince: 'dos' },
            L: { ouverte: 'dos', plat: 'dos', prise: 'pouce', porte: 'paume', pointe: 'dos', pince: 'dos' } },
};
const coteDe = c => (c === 'L' || c === 'loin' || c === 'gauche' ? 'L' : 'P');

// ─── proportions par âge ───────────────────────────────────────────────────────────────────
let PROP = null;
function facteurs(age) {
  if (!age) return { main: 1, pied: 1 };
  if (PROP === null) { try { PROP = JSON.parse(fs.readFileSync(path.join(__dirname, 'proportions.json'), 'utf8')); } catch (e) { PROP = false; } }
  const TABLE = { homme: [189, 266], femme: [176, 247.8], enfant6: [122.3, 180.5], enfant4: [108, 156.6] };
  const cle = (PROP && PROP.alias && PROP.alias[age]) || ({ adulte: 'homme', enfant: 'enfant6' }[age]) || age;
  const g = PROP && PROP.ages && PROP.ages[cle];
  const [m, p] = g ? [g.main, g.pied && g.pied.longueur] : (TABLE[cle] || TABLE.homme);
  return { main: (m || 189) / 190, pied: (p || 266) / 266 };
}

// ─── le résultat : géométrie + placement + SVG ─────────────────────────────────────────────
const NOIR = '#1A1A1A', BLANC = '#FFFFFF';
function resultat(base, k) {
  const S = p => [p[0] * k, p[1] * k];
  const sc = cubes => cubes.map(b => b.map(S));
  const geo = {
    contour: base.contour.map(sc), details: base.details.map(sc),
    devant: base.devant ? { contour: sc(base.devant.contour), bord: base.devant.bord.map(sc), interieur: base.devant.interieur.map(sc) } : null,
    polygone: base.polygone.map(p => S(p).map(f2)),
  };
  const echPoint = (q, T, ang) => q && Object.assign({}, q, T([q.x, q.y]).reduce((o, v, i) => (o[i ? 'y' : 'x'] = f2(v), o), {}),
    q.angle != null ? { angle: f2(ang(q.angle)) } : {}, q.r != null ? { r: f2(q.r * T.k) } : {}, q.largeur != null ? { largeur: f2(q.largeur * T.k) } : {});
  const fabrique = (T, ang, Tk) => {
    T.k = Tk;
    const dd = (c, ferme) => dDe(c, ferme, T);
    const r = {
      contour: geo.contour.map(c => dd(c, true)).join(' '),
      details: geo.details.map(c => dd(c, false)),
      polygone: geo.polygone.map(p => T(p).map(f2)),
      objet: base.objet || 'derriere',
      prise: echPoint(base.prise, T, ang), attache: echPoint(base.attache, T, ang),
      boite: (() => { const P = geo.polygone.map(T); const xs = P.map(p => p[0]), ys = P.map(p => p[1]);
        const x = Math.min(...xs), y = Math.min(...ys); return { x: f2(x), y: f2(y), l: f2(Math.max(...xs) - x), h: f2(Math.max(...ys) - y) }; })(),
    };
    for (const [nom, q] of Object.entries(base.extras || {})) r[nom] = Array.isArray(q) ? T(q).map(f2) : echPoint(q, T, ang);
    if (geo.devant) r.devant = { contour: dd(geo.devant.contour, true), bord: geo.devant.bord.map(c => dd(c, false)), details: geo.devant.interieur.map(c => dd(c, false)) };
    r.face = base.face; r.sorte = base.sorte;
    return r;
  };
  const id = p => [p[0], p[1]];
  const loc = fabrique(id, a => a, 1);
  loc.placer = (o = {}) => {
    const e = o.echelle || 1, a = o.angle || 0, mi = !!o.miroir, x = o.x || 0, y = o.y || 0;
    const T = p => { const q = tourne([p[0] * e, (mi ? -p[1] : p[1]) * e], a); return [x + q[0], y + q[1]]; };
    const ang = d => (mi ? -d : d) + a;
    const r = fabrique(T, ang, e);
    r.svg = (op = {}) => peindre(r, Object.assign({}, op, { echelle: e }));
    r.toString = () => peindre(r, { echelle: e });
    return r;
  };
  loc.svg = (o = {}) => { const r = loc.placer(o); return peindre(r, Object.assign({ echelle: o.echelle || 1 }, o)); };
  loc.toString = () => peindre(loc, {});
  return loc;
}
// peint un résultat placé : silhouette 1,5 (ou l'épaisseur donnée), traits intérieurs 0,7,
// l'objet tenu à sa place dans la profondeur
function peindre(r, o = {}) {
  const eS = o.silhouette || (o.trait === 'fort' ? 2 : 1.5), eI = o.interieur || (o.trait === 'fort' ? 1 : 0.7);
  const tr = ep => `fill="none" stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="round"`;
  const out = [];
  const objet = o.objet || '';
  if (objet && r.objet === 'derriere') out.push(objet);
  out.push(`<path d="${r.contour}" fill="${BLANC}" fill-rule="evenodd" stroke="${NOIR}" stroke-width="${eS}" stroke-linejoin="round"/>`);
  for (const d of r.details) out.push(`<path d="${d}" ${tr(eI)}/>`);
  if (objet && r.objet !== 'derriere') out.push(objet);
  if (r.devant && r.objet === 'entre') {
    out.push(`<path d="${r.devant.contour}" fill="${BLANC}" stroke="${NOIR}" stroke-width="${eI}" stroke-linejoin="round"/>`);
    for (const d of r.devant.bord) out.push(`<path d="${d}" ${tr(eS)}/>`);
  }
  return `<g data-forme="${r.sorte || 'extremite'}">\n${out.join('\n')}\n</g>`;
}

const CACHE = new Map();
function argsDe(a, defs) {                        // (pose, vue, cote, options) ou ({ pose, vue, cote, … })
  if (a[0] && typeof a[0] === 'object') { const o = a[0]; return [o[defs[0]], o.vue, o.cote, o]; }
  return [a[0], a[1], a[2], a[3] || {}];
}

// main(pose, vue, cote, options)
function main(...args) {
  const [poseIn, vueIn, coteIn, o] = argsDe(args, ['pose']);
  const pose = { poing: 'prise', pend: 'ouverte', ouvert: 'ouverte', 'à plat': 'plat', pointer: 'pointe' }[poseIn] || poseIn || 'ouverte';
  const vue = vueIn || 'profil', cote = coteDe(coteIn);
  const face = o.face || (FACE_DEFAUT[vue] || FACE_DEFAUT.profil)[cote][pose] || 'dos';
  let phi = o.rotation != null ? o.rotation : FACES[face];
  if (phi == null) throw new Error(`main : face « ${face} » inconnue (dos, paume, pouce, tranche)`);
  const gauche = cote === 'L';
  const rec = o.recouvrement == null ? 18 : o.recouvrement;
  const k = o.age ? facteurs(o.age).main : 1;
  const cle = JSON.stringify(['main', pose, phi, gauche, o.diametre || 32, o.inclinaison || 0, o.plie || 0, rec, o.poignet || 0, k]);
  if (!CACHE.has(cle)) {
    // la largeur vue du poignet, et l'ajustement demandé
    const c = Math.abs(Math.cos(phi * RAD)), larg0 = 2 * ((MOIGNON.W - MOIGNON.T) / 2 * c + MOIGNON.T / 2);
    const kPoignet = o.poignet ? (o.poignet / k) / larg0 : 1;
    const V = volumeMain(pose, Object.assign({}, o, { kPoignet }));
    // la main gauche : le miroir de la droite (Y → −Y), vue de la même face
    const ph = phi * RAD, cs = Math.cos(ph), sn = Math.sin(ph);
    const proj = p => { const Y = p[1] * cs - p[2] * sn, Z = p[1] * sn + p[2] * cs; return [p[0], gauche ? -Y : Y, Z]; };
    // le trait intérieur : il sépare le pouce, ou il marque le poing (les doigts repliés)
    const lignes = [[['pouce'], ['paume', 'doigts', 'index']]];
    if (pose === 'prise' || pose === 'pointe' || pose === 'pince') lignes.push([['index'], ['doigts', 'paume']], [['doigts'], ['paume']]);
    const modele = { coques: V.coques, groupes: { main: pose === 'prise' || pose === 'pointe' ? 3.9 : 3.4 }, lignes, nLignes: 1, points: V.points, trous: pose === 'pince' ? 25 : 0,
      devant: V.P.devant || null };
    const g = construire(modele, { proj, plie: o.plie || 0, coupe: { axe: 0, val: -rec } });
    const base = { contour: g.contour, details: g.details, polygone: g.polygone, devant: g.devant, sorte: `main-${pose}-${face}`, face };
    const larg = larg0 * kPoignet;
    base.attache = { x: 0, y: 0, largeur: f2(larg), angle: 0, coupe: -rec };
    // la prise
    const pt = n => g.pts[n] && { x: f2(g.pts[n][0]), y: f2(g.pts[n][1]) };
    if (pose === 'prise') {
      const H = g.pts.prise, A = g.pts.axe, dir = sub([A[0], A[1]], [H[0], H[1]]), raccourci = lon(dir) / 1;
      const angle = raccourci > 0.05 ? Math.atan2(dir[1], dir[0]) / RAD : 90;
      const R = (o.diametre || 32) / 2;
      base.prise = { x: f2(H[0]), y: f2(H[1]), angle: f2(angle), r: f2(R), raccourci: f2(Math.min(1, raccourci)) };
      if (raccourci < 0.5) base.objet = 'devant';
      else if (g.devant) base.objet = 'entre';
      else base.objet = 'derriere';
      // vue par le bout : le cercle du manche (ellipse si penché)
      base.extras = { trou: { x: H[0], y: H[1], r: R } };
    } else if (pose === 'porte') {
      // le plan de charge : tangent au côté paume (la caisse pose dessus), le long de la main
      const C = g.pts.charge, N = g.pts.normale, X = g.pts.chargeX, n2 = sub([N[0], N[1]], [C[0], C[1]]);
      const dx = sub([X[0], X[1]], [C[0], C[1]]);
      base.prise = { x: f2(C[0]), y: f2(C[1]), angle: f2(Math.atan2(dx[1], dx[0]) / RAD), normale: [f2(n2[0] / 20), f2(n2[1] / 20)] };
    } else {
      const q = pt('prise') || { x: 100, y: 0 };
      base.prise = Object.assign(q, { angle: 0 });
    }
    base.extras = Object.assign(base.extras || {}, { bout: g.pts.bout ? [g.pts.bout[0], g.pts.bout[1]] : null, pouce: g.pts.pouceBout ? [g.pts.pouceBout[0], g.pts.pouceBout[1]] : null });
    for (const kx of Object.keys(base.extras)) if (base.extras[kx] == null) delete base.extras[kx];
    CACHE.set(cle, resultat(base, k));
  }
  return CACHE.get(cle);
}

// ─── le pied ───────────────────────────────────────────────────────────────────────────────
// Repère du volume (pied DROIT) : X vers l'avant, Y vers la droite (le dehors du pied droit),
// Z vers le bas. La cheville (l'articulation) en (0, 0, 0). Millimètres d'homme.
//   nu     266 de long, sol à Z = 68, cheville 68 de large
//   botte  290 de long, sol à Z = 92 (semelle de 16, talon net, cambrure relevée de 6), tige
//          ronde de 75 à la cheville ; elle plie à la plante de 50° au plus (une botte est raide)
// Le volume est un « loft » : à chaque station X, une section (stade arrondi) tirée de trois
// courbes dessinées — le dessus zt(X), le dessous zb(X), la demi-largeur w(X) et son centre yc(X).
const courbe = pts => x => {                       // Catmull-Rom par des points [x, v] triés
  const n = pts.length;
  if (x <= pts[0][0]) return pts[0][1];
  if (x >= pts[n - 1][0]) return pts[n - 1][1];
  let i = 0; while (pts[i + 1][0] < x) i++;
  const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(n - 1, i + 2)];
  const t = (x - p1[0]) / (p2[0] - p1[0]);
  const m1 = ((p2[1] - p0[1]) / (p2[0] - p0[0] || 1)) * (p2[0] - p1[0]), m2 = ((p3[1] - p1[1]) / (p3[0] - p1[0] || 1)) * (p2[0] - p1[0]);
  const t2 = t * t, t3 = t2 * t;
  return (2 * t3 - 3 * t2 + 1) * p1[1] + (t3 - 2 * t2 + t) * m1 + (-2 * t3 + 3 * t2) * p2[1] + (t3 - t2) * m2;
};
function volumePied(type, o) {
  const coques = [], nu = type === 'nu';
  const rc = (o.cheville || (nu ? 68 : 75)) / 2;
  const plante = nu ? [142, 68] : [150, 92];          // la charnière des orteils : X, Z (sous la plante)
  const ang = o.angle == null ? 90 : o.angle;
  const pf = 90 - ang;                                 // flexion plantaire : la pointe descend
  let ort = o.orteils || 0;
  if (o.pointe && o.orteils == null) ort = 90 - (o.piedAbs == null ? ang : o.piedAbs);
  ort = borne(ort, nu ? -30 : -15, nu ? 95 : 50);
  const kY = [0, 1, 0];
  const piedT = p => rot3(p, kY, -pf);
  const ortT = p => { const q = [p[0] - plante[0], p[1], p[2] - plante[1]]; const r = rot3(q, kY, ort); return [r[0] + plante[0], r[1], r[2] + plante[1]]; };
  const S = (p, r, part) => { let q = p; if (part === 2) q = ortT(q); if (part >= 1) q = piedT(q); return [q[0], q[1], q[2], r, part ? 1 : 0]; };
  const partDe = x => (x > plante[0] + 0.01 ? 2 : 1);
  // une section plate (une super-ellipse de points, r = 0) : l'enveloppe de deux sections voisines
  // est le tronçon de loft, sans rien qui déborde en X ; les bouts se ferment par les courbes
  const NS = 28, EXP = 2.6;
  const section = (x, w, zt, zb, yc, part) => {
    const h = Math.max(0.2, (zb - zt) / 2), zc = (zt + zb) / 2, ww = Math.max(0.2, w), pts = [];
    for (let k = 0; k < NS; k++) {
      const a = (k / NS) * 2 * Math.PI, c = Math.cos(a), sn = Math.sin(a);
      pts.push(S([x, yc + ww * Math.sign(c) * Math.pow(Math.abs(c), 2 / EXP), zc + h * Math.sign(sn) * Math.pow(Math.abs(sn), 2 / EXP)], 0, part));
    }
    return pts;
  };
  const loft = (x0, x1, pas, f, piece, groupe) => {
    const xs = []; for (let x = x0; x < x1 - 1e-6; x += pas) xs.push(x); xs.push(x1);
    const anneaux = xs.map(x => section(x, f.w(x), f.zt(x), f.zb(x), f.yc(x), partDe(x)));
    for (let i = 0; i < anneaux.length - 1; i++) coques.push({ s: [...anneaux[i], ...anneaux[i + 1]], piece, groupe });
  };
  // une dalle de semelle : boîte aux coins arrondis de r, dessus zt, dessous zb(x)
  const dalle = (x0, x1, pas, w, zt, zb, yc, piece, r = 3) => {
    const xs = []; for (let x = x0; x < x1 - 1e-6; x += pas) xs.push(x); xs.push(x1);
    const an = xs.map((x, i) => { const xx = x, ww = Math.max(0.1, w(x) - r), y = yc(x);
      return [S([xx, y - ww, zt + r], r, partDe(x)), S([xx, y + ww, zt + r], r, partDe(x)), S([xx, y - ww, zb(x) - r], r, partDe(x)), S([xx, y + ww, zb(x) - r], r, partDe(x))]; });
    for (let i = 0; i < an.length - 1; i++) coques.push({ s: [...an[i], ...an[i + 1]], piece, groupe: 'semelle' });
  };
  // la jambe (ou la tige) au-dessus de la cheville : fixe
  coques.push({ s: [S([0, 0, -70], rc, 0), S([0, 0, -6], rc, 0)], piece: nu ? 'jambe' : 'tige', groupe: 'haut' });
  if (nu) {
    const f = {
      zt: courbe([[-64, 44], [-61, 22], [-56, 8], [-48, -2], [-39, -9], [0, -18], [32, -10], [52, 4], [80, 19], [110, 30], [140, 39], [162, 44], [182, 46], [196, 49], [204, 55], [208, 62]]),
      zb: courbe([[-64, 50], [-60, 61], [-52, 66], [-40, 68], [-10, 68], [20, 67], [60, 66], [100, 67], [130, 68], [182, 68], [198, 67], [205, 65], [208, 63]]),
      w: courbe([[-64, 6], [-60, 19], [-52, 26], [-38, 30], [0, 32], [40, 35], [80, 41], [115, 47], [140, 50], [160, 49], [178, 45], [192, 37], [202, 25], [208, 8]]),
      yc: courbe([[-64, 2], [0, 3], [60, 4], [120, 2], [160, -2], [185, -7], [208, -18]]),
    };
    loft(-64, 208, 6, f, 'pied', 'haut');
    return { coques, groupes: { haut: 3.2 }, points: { talon: [-50, 0, 68, 1], plante: [plante[0], 0, plante[1], 1], pointe: [208, -18, 63, 2] }, piedT, ortT, plante };
  }
  // la botte : la tige arrondie (contrefort, cou-de-pied bombé, bout dur), posée dans la semelle
  const f = {
    zt: courbe([[-66, 58], [-64, 40], [-61, 20], [-56, 6], [-49, -4], [-41, -11], [0, -22], [36, -14], [54, 0], [76, 14], [100, 23], [125, 30], [150, 34], [172, 36], [190, 39], [202, 45], [210, 54], [214, 67]]),
    zb: courbe([[-66, 70], [-64, 78], [-58, 82], [0, 82], [204, 82], [211, 80], [214, 75]]),
    w: courbe([[-66, 8], [-62, 24], [-54, 31], [-40, 35], [0, 38], [40, 42], [80, 47], [120, 51], [150, 52], [172, 49], [190, 42], [202, 33], [210, 22], [214, 9]]),
    yc: courbe([[-66, 1], [0, 1], [100, 1], [160, -2], [200, -6], [214, -9]]),
  };
  loft(-66, 214, 6, f, 'tige', 'haut');
  // la semelle : 3 mm de débord autour de la tige ; le talon net, la cambrure relevée de 6, le
  // bout relevé de 8
    const ws = courbe([[-66, 3.2], [-65.4, 11], [-64, 17], [-61.5, 23], [-57, 28.5], [-50, 33], [-40, 36.5], [0, 41], [40, 45], [80, 50], [120, 54], [150, 55], [172, 52], [188, 47], [199, 40], [207, 31], [212, 21], [214.6, 11], [215, 3.2]]), ycS = x => f.yc(borne(x, -66, 214));
  const zS = 76, zB = 92;
  dalle(-66, -14, 3, ws, zS, () => zB, ycS, 'talon');
  dalle(-16, 50, 4, ws, zS, () => zB - 6, ycS, 'cambrure');
  dalle(48, 215, 3, ws, zS, x => zB - Math.pow(Math.max(0, (x - 150) / 67), 2) * 8, ycS, 'semelle');
  return { coques, groupes: { haut: 3.0, semelle: 1.4 }, points: { talon: [-67, 0, zB, 1], plante: [plante[0], 0, plante[1], 1], pointe: [215, -8, zB - 8, 2] }, piedT, ortT, plante };
}
const VUES_PIED = {
  // [x, y, z] depuis (X, Y, Z) ; z petit = près de l'œil
  profil:  p => [p[0], p[2], -p[1]],
  face:    p => [-p[1], p[2], -p[0]],
  dos:     p => [p[1], p[2], p[0]],
  dessus:  p => [p[0], p[1], p[2]],
  dessous: p => [p[0], -p[1], -p[2]],
};

function pied(...args) {
  const [typeIn, vueIn, coteIn, o] = argsDe(args, ['type']);
  const type = typeIn === 'nu' || typeIn === 'pied' ? 'nu' : 'botte';
  const vue = vueIn || 'profil', cote = coteDe(coteIn), gauche = cote === 'L';
  if (!VUES_PIED[vue]) throw new Error(`pied : vue « ${vue} » inconnue (profil, face, dos, dessus, dessous)`);
  const rec = o.recouvrement == null ? 18 : o.recouvrement;
  const k = o.age ? facteurs(o.age).pied : 1;
  const cle = JSON.stringify(['pied', type, vue, gauche, o.angle == null ? 90 : o.angle, o.orteils == null ? null : o.orteils, !!o.pointe, rec, o.cheville || 0, k]);
  if (!CACHE.has(cle)) {
    const V = volumePied(type, Object.assign({}, o, { cheville: o.cheville ? o.cheville / k : 0 }));
    const vp = VUES_PIED[vue];
    const proj = p => { const q = vp(gauche ? [p[0], -p[1], p[2]] : p); return q; };
    const enBout = vue === 'dessus' || vue === 'dessous';
    const coques = enBout ? V.coques.filter(c => c.piece !== 'jambe' && !(c.piece === 'tige' && c.s.every(s => !s[4]))) : V.coques;
    // botte : la semelle d'un trait (le dessus de la semelle dans la tige ; vue de dessus, le bord
    // de la tige sur la semelle) ; dessous, le talon net et l'avant de la cambrure
    const SEM = ['talon', 'cambrure', 'semelle'];
    const lignes = type === 'botte'
      ? (vue === 'dessous' ? [[['talon'], ['cambrure'], true], [['semelle'], ['cambrure'], true]] : vue === 'dessus' ? [[['tige'], SEM, true]] : [[SEM, ['tige'], true]])
      : [];
    const modele = { coques, groupes: V.groupes, lignes, nLignes: type === 'botte' && vue === 'dessous' ? 2 : 1, points: V.points,
      margeTrait: type === 'botte' ? 0.12 : 0.2, rogne: type === 'botte' ? 0.8 : 1.2, traitMin: 10 };
    const g = construire(modele, { proj, coupe: enBout ? null : { axe: 1, val: -rec } });
    const larg = (o.cheville ? o.cheville / k : (type === 'nu' ? 68 : 75));
    const base = { contour: g.contour, details: g.details, polygone: g.polygone, sorte: `pied-${type}-${vue}` };
    base.attache = enBout ? { x: 0, y: 0, largeur: f2(larg), angle: -90, coupe: null, section: f2(larg / 2) }
      : { x: 0, y: 0, largeur: f2(larg), angle: -90, coupe: -rec };
    const P2 = n => g.pts[n] && [f2(g.pts[n][0]), f2(g.pts[n][1])];
    base.prise = g.pts.plante ? { x: g.pts.plante[0], y: g.pts.plante[1], angle: 0 } : null;
    base.extras = { talon: P2('talon'), pointe: P2('pointe'), plante: P2('plante') };
    CACHE.set(cle, resultat(base, k));
  }
  return CACHE.get(cle);
}

module.exports = { main, pied, peindre, FACES, FACE_DEFAUT, _interne: { construire, volumeMain, volumePied, isolignes, versCubiques } };
