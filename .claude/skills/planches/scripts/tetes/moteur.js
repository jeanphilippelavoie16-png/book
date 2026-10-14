// moteur.js — les têtes simples de profil : la tête du corps simple, avec juste ce qu'il faut de visage.
//
// La même tête que le corps simple de profil (corps/moteur.js) : le même crâne, la même nuque, le même cou,
// raccordés de la même façon (union Clipper, l'arrondi de 20 mm à la nuque et sous le menton). Le visage
// s'ajoute par le contour : le front, le nez, les lèvres, le menton, la mâchoire, d'un seul trait lisse et
// continu jusqu'au cou. Dedans, au trait de 0,7 : l'œil (un petit trait ou une amande), l'oreille (un C),
// un sourcil au plus, la limite des cheveux. Pas de narine, de cil, de ride, de dent ni de pupille.
// Les cheveux sont une ligne de contour autour du crâne, jamais un aplat gris ni des mèches.
//
// ═══ L'API ══════════════════════════════════════════════════════════════════════════════════════════
//
//   teteSimple({ x, y, echelle, angle, penche, cote, age, yeux, bouche, ouverture, epaisseur, cheveux,
//                sourcil, cou, trait, ancre, objet })
//     x, y       le point d'ancre, en unités de vue (voir ancre)
//     echelle    unités de vue par mm (défaut 1 : l'homme fait 227,5 du sommet au menton)
//     angle      la tête ET le cou tournent ensemble, en degrés à l'écran (+ : sens horaire), après le miroir
//                (comme l'ancienne tete() : cote 'droite', + penche le visage vers le bas)
//     penche     la tête seule sur le cou, en degrés (+ : le menton vers la poitrine, − : la tête renversée),
//                le cou garde son axe ; la nuque reste d'un seul trait (union et arrondi, comme le corps)
//     cote       'droite' (défaut : le visage regarde vers +x) · 'gauche' (miroir)
//     age        'homme' (défaut ; 'adulte') · 'femme' · 'enfant6' ('enfant') · 'enfant4' · 'bebe' (nouveau-né)
//                (la hauteur de tête et le raccord au cou : corps/proportions.json ; le visage : tetes/proportions.json)
//     yeux       'ouverts' (défaut) · 'fermes'
//     bouche     'fermee' (défaut) · 'ouverte' (entrouverte : souffler, ventiler, crier) · 'serre' (les lèvres
//                serrées sur un objet : un linge mordu, un sifflet, un bout de rameau)
//     ouverture  bouche 'ouverte' : de 0 à 1 (défaut 0,35 : entrouverte ; 1 : la grande bouche du bébé au sein)
//     epaisseur  bouche 'serre' : l'épaisseur de l'objet entre les lèvres, en mm réels (défaut 8)
//     cheveux    'court' (défaut, homme et enfants) · 'long' (défaut, femme) · 'queue' · 'aucun' (défaut, bébé)
//     sourcil    true : un trait de sourcil au-dessus de l'œil (défaut : adultes oui, enfants et bébé non)
//     cou        true (défaut : le cou jusque sous la base, coupé net) · false (coupé juste sous le menton)
//                · un nombre : la longueur du cou sous la nuque, en mm réels
//     trait      'normal' (silhouette 1,5) · 'fort' (1,9) ; les traits intérieurs restent à 0,7
//     ancre      'oreille' (défaut : le centre de l'oreille) · 'cou' (le milieu de la coupe du cou)
//                · 'nuque' (le haut du cou, le pivot de la tête : le point .nuque du corps simple)
//     objet      SVG (ou fonction geo => SVG) peint DERRIÈRE la tête : le bout qui entre dans la bouche se
//                cache sous les lèvres, ce qui dépasse se voit (le linge, le sifflet, le rameau)
//
// Le résultat se colle comme une chaîne SVG et porte la géométrie, en unités de vue :
//   .oeil .nez (le bout) .menton .sommet .nuque (le pivot, haut du cou) .oreille (le centre)   [x, y]
//   .bouche    [x, y] : le devant des lèvres, entre les deux (bouche serre : le milieu de l'objet, au ras des lèvres)
//   .levres    { haut: [x, y], bas: [x, y] } : là où chaque lèvre touche l'objet (serre) ou s'arrête (ouverte)
//   .regard    l'angle à l'écran (degrés) de la direction où regarde le visage ; .axe [ux, uy] le même, unitaire
//   .cou       [[x, y], [x, y]] : les deux coins de la coupe du cou (devant, derrière) ; null sans cou
//   .boite     { x0, y0, x1, y1 }       .echelle      .age
//
// Pour le corps simple : corps({ …, visage: true }) (ou visage: { yeux, bouche, cheveux, … }) reçoit cette
// tête, par pieces() ci-dessous, au même pivot (la nuque) et au même angle que sa tête par défaut.
//
// Unités internes : la tête est dessinée en « unités de tête » (celles de TETE_PROFIL du corps simple : 234
// du sommet au menton, origine au haut du cou, x vers l'avant, y vers le bas), puis mise à sa hauteur réelle
// (proportions.json du corps) : k = hauteur / 234. Tout ce qui sort est en mm réels, puis en unités de vue.

'use strict';

const fs = require('fs');
const path = require('path');
const CORPS = require('../corps/moteur');
const I = CORPS._interne;
const CL = require('../corps/clipper');

const NOIR = '#1A1A1A', BLANC = '#FFFFFF';
const RAD = Math.PI / 180;

// ─── géométrie ────────────────────────────────────────────────────────────────────────────
const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const mul = (a, k) => [a[0] * k, a[1] * k];
const lon = a => Math.hypot(a[0], a[1]);
const uni = a => { const l = Math.hypot(a[0], a[1]) || 1; return [a[0] / l, a[1] / l]; };
const gau = u => [u[1], -u[0]];
const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
const tourne = (a, deg) => { const c = Math.cos(deg * RAD), s = Math.sin(deg * RAD); return [a[0] * c - a[1] * s, a[0] * s + a[1] * c]; };
const autour = (p, c, deg) => add(c, tourne(sub(p, c), deg));
const haut = a => [Math.sin(a * RAD), -Math.cos(a * RAD)];
const f1 = v => (Math.round(v * 100) / 100).toString();
const longueur = l => { let s = 0; for (let i = 1; i < l.length; i++) s += lon(sub(l[i], l[i - 1])); return s; };

// une courbe ouverte lisse par des points (Catmull-Rom), échantillonnée
function lisseOuvert(pts, n = 8) {
  const N = pts.length, out = [pts[0]];
  const P = i => pts[Math.max(0, Math.min(N - 1, i))];
  for (let i = 0; i < N - 1; i++) {
    const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
    for (let k = 1; k <= n; k++) {
      const t = k / n, t2 = t * t, t3 = t2 * t;
      out.push([0, 1].map(j => 0.5 * ((2 * p1[j]) + (-p0[j] + p2[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t3)));
    }
  }
  return out;
}
const lisseFerme = (pts, n = 8) => I.lisseFerme(pts, n);

// ─── proportions ──────────────────────────────────────────────────────────────────────────
// La hauteur de la tête (sommet → menton) et la largeur du cou viennent du corps simple (corps/proportions.json
// et ses PROPORTIONS) : la tête raccorde au corps. Le bébé n'est pas dans le corps : tetes/proportions.json.
const ALIAS = { adulte: 'homme', homme: 'homme', femme: 'femme', enfant: 'enfant6', enfant6: 'enfant6', enfant4: 'enfant4',
  bebe: 'bebe', 'bébé': 'bebe', 'nouveau-ne': 'bebe', 'nouveau-né': 'bebe' };
let CACHE_PJ = null;
function propTetes() {
  const f = path.join(__dirname, 'proportions.json');
  try {
    const t = fs.statSync(f).mtimeMs;
    if (CACHE_PJ && CACHE_PJ.t === t) return CACHE_PJ.v;
    CACHE_PJ = { t, v: JSON.parse(fs.readFileSync(f, 'utf8')) };
    return CACHE_PJ.v;
  } catch (e) { return CACHE_PJ ? CACHE_PJ.v : null; }
}
// k : mm réels par unité de tête ; kT : largeur du cou (facteur du tronc du corps)
function echelleAge(age) {
  if (age === 'bebe') {
    const pj = propTetes(), b = pj && pj.ages && pj.ages.bebe;
    const H = b && b.tete && b.tete.hauteur ? b.tete.hauteur : 125;
    return { k: H / 234, kT: b && b.cou && b.cou.largeur ? b.cou.largeur : 0.6, H };
  }
  const Pr = I.proportionsDe(age === 'homme' ? 'adulte' : age);
  return { k: Pr.tete, kT: Pr.largeurs.tronc, H: Pr.tete * 234 };
}

// ─── les têtes, en unités de tête ─────────────────────────────────────────────────────────
// TETE_PROFIL du corps simple (le crâne et la nuque de l'adulte, gardés tels quels) :
//   [-4,-190] sommet … [91,-116] front … [44,44] dessous du menton, [18,33], [-6,14], [-40,6] nuque …
const TP = CORPS.tete.profil;
// crane : du haut du front, par le sommet et l'occiput, jusqu'à la nuque (sens inverse du contour : on le
// renverse au montage). visage : du haut du front jusqu'à la gorge. Le contour = visage + gorge + crâne.
//   rep : les repères (œil, oreille…) ; zone : x au-delà duquel c'est le visage (l'arrondi de la nuque ne
//   s'y applique pas) ; mach : le pivot de la mâchoire (devant l'oreille) ; cheveux : lignes d'implantation.
const TETES = {
  homme: {
    crane: [[76, -153], [42, -181], [-4, -190], [-36, -186], [-66, -170], [-92, -136], [-102, -90], [-94, -50], [-72, -16], [-40, 6]],
    gorge: [[22, 34], [-6, 14]],
    visage: {
      front: [[91, -116], [95, -96]],             // le front, la bosse du sourcil
      nasion: [93, -84],
      nez: [[101, -63], [111, -42], [114, -35]],  // l'arête, droite, puis le bout
      bout: [[112, -30], [104, -27]],             // le dessous du nez, jusqu'au creux sous le nez
      sous: [100, -25],                           // le creux sous le nez (subnasale)
      levreH: [102, -13], stomion: [99.5, -5], levreB: [100.5, 3],
      sillon: [94, 14],                           // le creux sous la lèvre
      menton: [[98, 26], [92, 39], [76, 46], [52, 46]],   // le menton, la mâchoire dessous
    },
    rep: { oeil: [79, -70], sourcil: [[87, -80], [77, -83], [66, -81]], oreille: { c: [-16, -55], h: 62, l: 30 }, mach: [-8, -48] },
    zone: 64,
  },
};
// La femme : le même crâne (à sa taille), le menton plus fin et moins avancé, le nez plus petit.
TETES.femme = {
  crane: TETES.homme.crane, gorge: TETES.homme.gorge,
  visage: {
    front: [[90, -116], [93, -97]], nasion: [91, -85],
    nez: [[98, -66], [107, -45], [110, -38]], bout: [[108, -32], [101, -28]], sous: [97.5, -26],
    levreH: [100.5, -14], stomion: [97.5, -6], levreB: [99, 2.5], sillon: [92.5, 13],
    menton: [[95, 24], [88, 37], [72, 44], [50, 45]],
  },
  rep: { oeil: [77, -71], sourcil: [[85, -81], [75, -84.5], [64, -82]], oreille: { c: [-16, -55], h: 60, l: 28 }, mach: [-8, -48] },
  zone: 62,
};

// ─── le contour d'une tête ────────────────────────────────────────────────────────────────
// Rend { pts (le contour fermé, unités de tête, non lissé), lissage (les indices des coins), rep (les repères
// placés), levres } selon la bouche.
function contourTete(D, o) {
  const V = D.visage;
  const bouche = o.bouche || 'fermee';
  const mach = D.rep.mach;
  // la mâchoire : tout ce qui est sous la lèvre du haut tourne autour du pivot, d'un angle a
  let a = 0, ecart = 0;
  const dO = lon(sub(V.stomion, mach));
  if (bouche === 'ouverte') { const ov = o.ouverture == null ? 0.35 : Math.max(0, Math.min(1, o.ouverture)); a = 3 + 19 * ov; }
  if (bouche === 'serre') { ecart = (o.epaisseur == null ? 8 : o.epaisseur) / o.k; a = Math.atan2(ecart, dO) / RAD; }
  const J = (p, w = 1) => autour(p, mach, a * w);
  const pts = [];
  pts.push(...V.front, V.nasion, ...V.nez, ...V.bout, V.sous, V.levreH);
  const levres = {};
  if (bouche === 'fermee') {
    pts.push(V.stomion, V.levreB);
  } else if (bouche === 'ouverte') {
    // les lèvres s'écartent ; entre elles, le creux de la bouche (un V arrondi qui rentre)
    const lb = J(V.levreB), O = V.stomion;
    const prof = 4 + 8 * (a - 3) / 19;
    const hautL = add(O, [-1.5, -0.5]), basL = add(J(O), [-1.5, 0.8]);
    const fond = add(lerp(hautL, basL, 0.5), [-prof, 0]);
    pts.push(hautL, fond, basL, lb);
    levres.haut = hautL; levres.bas = basL;
  } else {
    // serre : les lèvres s'avancent un peu et se posent sur l'objet, écartées de son épaisseur
    const O = V.stomion, lb = J(V.levreB);
    const h0 = add(O, [0.5, -0.4]), b0 = add(J(O), [0.5, 0.4]);
    const dedans = 7;
    pts.push(h0, add(h0, [-dedans, 0]), add(b0, [-dedans, 0]), b0, lb);
    levres.haut = h0; levres.bas = b0;
  }
  pts.push(J(V.sillon), ...V.menton.map((p, i) => J(p, 1 - 0.25 * i / Math.max(1, V.menton.length - 1))));
  pts.push(...D.gorge.map((p, i) => J(p, 0.35 - 0.3 * i)));
  // le crâne est donné du front vers la nuque : on le parcourt de la nuque vers le front
  pts.push(...D.crane.slice().reverse());
  const bouchePt = bouche === 'fermee' ? V.stomion : lerp(levres.haut, levres.bas, 0.5);
  return { pts, levres, bouche: bouchePt, mach: a };
}

// ─── les pièces d'une tête, en mm réels, repère du corps (origine à la nuque, x vers l'avant) ────────
// pieces(age, o) → { contour (polygone lissé), cheveux: [polygones], details: [lignes], zone (le visage,
// polygone), rep { oeil, nez, bouche, menton, sommet, oreille, levres }, k }
function pieces(ageDemande, o = {}) {
  const age = ALIAS[ageDemande] || 'homme';
  const D = TETES[age] || TETES.homme;
  const { k, kT } = echelleAge(age);
  const c = contourTete(D, Object.assign({}, o, { k }));
  const K = p => mul(p, k);
  const contour = lisseFerme(c.pts, 8).map(K);
  const details = [];
  const R = D.rep;
  // l'œil
  const E = R.oeil;
  if ((o.yeux || 'ouverts') === 'fermes') {
    details.push(lisseOuvert([add(E, [4.5, 0.3]), add(E, [0, 1.6]), add(E, [-5, 0.6])], 8).map(K));
  } else {
    details.push(lisseOuvert([add(E, [4, -2.4]), add(E, [-0.5, -2.2]), add(E, [-5, 0.3])], 8).map(K));
    details.push(lisseOuvert([add(E, [4.3, 2.2]), add(E, [-0.5, 1.8]), add(E, [-5, 0.3])], 8).map(K));
  }
  // le sourcil
  const sourcil = o.sourcil == null ? (age === 'homme' || age === 'femme') : !!o.sourcil;
  if (sourcil && R.sourcil) details.push(lisseOuvert(R.sourcil, 8).map(K));
  // l'oreille : un C ouvert vers l'avant
  const Oc = R.oreille.c, oh = R.oreille.h / 2, ol = R.oreille.l;
  details.push(lisseOuvert([add(Oc, [6, -oh * 0.86]), add(Oc, [-ol * 0.35, -oh]), add(Oc, [-ol * 0.62, -oh * 0.55]),
    add(Oc, [-ol * 0.6, oh * 0.15]), add(Oc, [-ol * 0.35, oh * 0.82]), add(Oc, [0, oh]), add(Oc, [5, oh * 0.8])], 8).map(K));
  // la zone du visage : devant x = zone, du sommet au menton
  const zone = [[D.zone, -260], [260, -260], [260, 90], [D.zone, 90]].map(K);
  const rep = {
    oeil: K(E), nez: K(D.visage.nez[D.visage.nez.length - 1]), bouche: K(c.bouche),
    menton: K(D.visage.menton[1]), sommet: K([-4, -190]), oreille: K(Oc),
    levres: c.levres.haut ? { haut: K(c.levres.haut), bas: K(c.levres.bas) } : null,
  };
  return { contour, cheveux: [], details, zone, rep, k, kT, age };
}

// ─── le cou, comme le corps simple ────────────────────────────────────────────────────────
// Une bande de Q (la nuque) vers le bas, le long de l'axe du cou (inclinaison 12° vers l'avant, comme debout),
// aux largeurs du cou du corps simple × kT.
const COU = CORPS.segments.profil.cou;          // [t, avant, arrière], t de 0 (base) à 1 (nuque)
function bandeCou(L, kT, incl = 12) {
  const u = haut(incl), nAv = mul(gau(u), -1);   // u : de la base vers la nuque ; nAv : l'avant
  const C0 = mul(u, -L);                            // la base, sous la nuque
  const prof = I.profil(COU.map(([t, a, b]) => [t, a * kT, b * kT]));
  const av = [], ar = [];
  for (let i = 0; i <= 24; i++) {
    const t = i / 24, p = lerp(C0, [0, 0], t);
    av.push(add(p, mul(nAv, prof.av(t)))); ar.push(sub(p, mul(nAv, prof.ar(t))));
  }
  return { poly: av.concat(ar.reverse()), u, nAv, base: C0, prof };
}

// ─── teteSimple ───────────────────────────────────────────────────────────────────────────
function teteSimple(o = {}) {
  const age = ALIAS[o.age] || 'homme';
  const T0 = pieces(age, o);
  const { k, kT } = T0;
  const penche = o.penche || 0;
  const PT = p => tourne(p, penche);                 // la tête sur le cou, autour de la nuque
  const tete = T0.contour.map(PT);
  // le cou : sa longueur sous la nuque, en mm réels
  const Lcou = o.cou === false ? 22 * k / 0.97 : (typeof o.cou === 'number' ? o.cou : 120 * kT);
  const cou = bandeCou(Lcou + 60, kT);
  // l'union, l'arrondi hors du visage (la nuque, la gorge), puis la coupe
  const zone = [I.versCL(T0.zone.map(PT))];
  const X = I.unionCL([I.union([tete]), I.union([cou.poly])]);
  const F = I.ferme(X, 20);
  const horsZone = I.moins(F, zone);
  let S = I.unionCL([X, horsZone]);
  // la coupe : perpendiculaire à l'axe du cou, à Lcou sous la nuque
  const u = cou.u, n = cou.nAv, P0 = mul(u, -Lcou);
  const demi = [I.versCL([add(P0, mul(n, -400)), add(P0, mul(n, 400)), add(add(P0, mul(n, 400)), mul(u, 900)), add(add(P0, mul(n, -400)), mul(u, 900))])];
  S = I.inter(S, demi);
  // les bords de la coupe (devant, derrière) : où la coupe rencontre la silhouette
  const coins = coinsCoupe(S, P0, n);

  // ── le repère de la vue ──
  const s = o.echelle || 1, m = o.cote === 'gauche' ? -1 : 1, ang = o.angle || 0;
  let ancre;
  const ancreQ = o.ancre || 'oreille';
  if (ancreQ === 'cou') ancre = coins ? lerp(coins[0], coins[1], 0.5) : P0;
  else if (ancreQ === 'nuque') ancre = [0, 0];
  else ancre = PT(T0.rep.oreille);
  const X0 = o.x || 0, Y0 = o.y || 0;
  const T = p => { const q = tourne([m * s * (p[0] - ancre[0]), s * (p[1] - ancre[1])], ang); return [X0 + q[0], Y0 + q[1]]; };

  const tr = o.trait === 'fort' ? 1.9 : (typeof o.trait === 'number' ? o.trait : 1.5), ti = 0.7;
  const tol = 0.05 / s;
  const dFerme = paths => paths.map(Pp => { const q = I.allege(I.deCL(Pp), tol, true).map(T); return 'M' + q.map(p => `${f1(p[0])} ${f1(p[1])}`).join(' L') + ' Z'; }).join(' ');
  const dOuvert = ls => ls.filter(l => l.length > 1).map(l => { const q = I.allege(l, tol).map(T); return 'M' + q.map(p => `${f1(p[0])} ${f1(p[1])}`).join(' L'); }).join(' ');
  // le trait de la silhouette : tout le bord, sauf la coupe du cou
  const bandeCoupe = [I.versCL([add(P0, mul(n, -400)), add(P0, mul(n, 400)), add(add(P0, mul(n, 400)), mul(u, 0.6)), add(add(P0, mul(n, -400)), mul(u, 0.6))])];
  const bord = I.bordsDans(S, I.moins([I.versCL([[-2000, -2000], [2000, -2000], [2000, 2000], [-2000, 2000]])], bandeCoupe));
  // les traits intérieurs, coupés au contour
  const E = 1.0;
  const dedans = I.decale(S, -E);
  const lignes = T0.details.map(l => l.map(PT));
  const intLignes = lignesDans(lignes, dedans);

  // ── la géométrie ──
  const geo = {};
  const R = T0.rep;
  for (const cle of ['oeil', 'nez', 'bouche', 'menton', 'sommet', 'oreille']) geo[cle] = T(PT(R[cle])).map(v => Math.round(v * 100) / 100);
  geo.nuque = T([0, 0]).map(v => Math.round(v * 100) / 100);
  geo.levres = R.levres ? { haut: T(PT(R.levres.haut)), bas: T(PT(R.levres.bas)) } : null;
  const regard = m > 0 ? penche + ang : 180 - penche + ang;
  geo.regard = regard; geo.axe = [Math.cos(regard * RAD), Math.sin(regard * RAD)].map(v => Math.round(v * 1e4) / 1e4);
  geo.cou = coins ? [T(coins[0]), T(coins[1])] : null;
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const Pp of S) for (const q of I.deCL(Pp)) { const v = T(q); x0 = Math.min(x0, v[0]); y0 = Math.min(y0, v[1]); x1 = Math.max(x1, v[0]); y1 = Math.max(y1, v[1]); }
  geo.boite = { x0, y0, x1, y1 };
  geo.echelle = s; geo.age = age;

  const quoi = v => (typeof v === 'function' ? v(geo) : (v || ''));
  const out = [`<g data-forme="tete-simple-${age}">`];
  if (o.objet) out.push(quoi(o.objet));
  out.push(`<path d="${dFerme(S)}" fill="${BLANC}" stroke="none"/>`);
  out.push(`<path d="${dOuvert(bord)}" fill="none" stroke="${NOIR}" stroke-width="${tr}" stroke-linecap="round" stroke-linejoin="round"/>`);
  const di = dOuvert(intLignes);
  if (di) out.push(`<path d="${di}" fill="none" stroke="${NOIR}" stroke-width="${ti}" stroke-linecap="round" stroke-linejoin="round"/>`);
  if (o._reperes) for (const p of o._reperes(T0, PT)) out.push(`<circle cx="${f1(T(p)[0])}" cy="${f1(T(p)[1])}" r="1.2" fill="#C00"/>`);
  out.push('</g>');
  const svg = out.join('\n');
  return Object.assign({ svg, toString() { return svg; } }, geo);
}

// des lignes ouvertes (mm), découpées par une région Clipper
function lignesDans(lignes, regionCL) {
  if (!lignes.length || !regionCL.length) return [];
  const c = new CL.Clipper();
  c.AddPaths(lignes.filter(l => l.length > 1).map(I.versCL), CL.PolyType.ptSubject, false);
  c.AddPaths(regionCL, CL.PolyType.ptClip, true);
  const arbre = new CL.PolyTree();
  c.Execute(CL.ClipType.ctIntersection, arbre, CL.PolyFillType.pftNonZero, CL.PolyFillType.pftNonZero);
  return CL.Clipper.OpenPathsFromPolyTree(arbre).map(I.deCL);
}

// la coupe du cou : les deux points où la droite P0 + t·n coupe le bord de la silhouette (devant, derrière)
function coinsCoupe(S, P0, n) {
  let tMin = Infinity, tMax = -Infinity;
  for (const Pp of S) {
    const q = I.deCL(Pp);
    for (let i = 0; i < q.length; i++) {
      const a = q[i], b = q[(i + 1) % q.length];
      const da = (a[0] - P0[0]) * -n[1] + (a[1] - P0[1]) * n[0], db = (b[0] - P0[0]) * -n[1] + (b[1] - P0[1]) * n[0];
      if (Math.abs(da) < 0.02 && Math.abs(db) < 0.02) {
        for (const p of [a, b]) { const t = (p[0] - P0[0]) * n[0] + (p[1] - P0[1]) * n[1]; tMin = Math.min(tMin, t); tMax = Math.max(tMax, t); }
      }
    }
  }
  if (!isFinite(tMin)) return null;
  return [add(P0, mul(n, tMax)), add(P0, mul(n, tMin))];
}

module.exports = { teteSimple, pieces, TETES, _interne: { contourTete, bandeCou, echelleAge, lisseOuvert, lignesDans } };
