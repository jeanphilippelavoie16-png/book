// moteur.js — les mains simples des gros plans : squelette 3D, poses, vues, contour, couches, objet.
//
// Une main de manuel, construite et non calquée, au même esprit que les corps simples (corps/moteur.js) :
// un seul contour continu et lisse pour la main et l'avant-bras, rempli de blanc ; des doigts distincts,
// au bout arrondi, sans boule ni cassure aux articulations ; aucun ongle, aucun pli, aucune ligne de la
// paume. Un trait intérieur (0,7) seulement là où une forme passe devant une autre (un doigt devant un
// doigt, devant la paume ; le pouce devant l'index). Les doigts cachés derrière l'objet : gris #E6E6E6.
//
// ═══ L'API ══════════════════════════════════════════════════════════════════════════════════════════
//
//   mainSimple({ x, y, pose, vue, cote, echelle, angle, rotation, ancre, diametre, doigts, poignet,
//                objet, avantbras, trait, age, loin, masque })
//     pose      un id de mains/poses.json (agent 3) ou des poses intégrées (POSES, plus bas), ou un objet pose
//     vue       'dos' · 'paume' · 'pouce' (de profil, côté pouce) · 'auriculaire' (de profil, côté auriculaire)
//     cote      'droite' (défaut) · 'gauche' : le miroir de la main droite par l'axe de la main
//     echelle   unités de vue par mm (défaut 1 : la main fait 190 du pli du poignet au bout du majeur)
//     angle     où va l'axe de la main (poignet → doigts) à l'écran, en degrés (0 : vers +x, 90 : vers le bas)
//     rotation  [rx, ry, rz] petits angles (degrés) autour des axes de la vue, après la vue : l'inclinaison
//     ancre     ce qui tombe en (x, y) : 'prise' (défaut : l'axe de l'objet tenu, ou le creux de la paume
//               sans objet) · 'poignet' · 'bout' (le bout de l'index) · 'pouce' (le bout du pouce)
//     diametre  le diamètre de l'objet tenu, en mm réels (surcharge celui de la pose)
//     doigts    surcharge des angles de la pose : { index: { mcp: 80 }, pouce: { ip: 10 } }
//     poignet   { flexion, deviation } (degrés) : surcharge la pose
//     objet     g => SVG (ou du SVG) : l'objet tenu, peint à sa profondeur (voir « Les couches »)
//     avantbras { longueur (mm, défaut 70), vers: [x, y] (le point de vue vers lequel il part ; la longueur
//               par défaut l'atteint), bord: { x0, y0, x1, y1 } ou { l, h } (la boîte de la vue : l'avant-bras
//               y file et s'y coupe net, par clipPath), coupe: 'ouverte' (défaut : les deux bords s'arrêtent)
//               · 'franche' (un trait de coupe, 0,7) } ; avantbras: false : pas d'avant-bras (le poignet coupé)
//     trait     'normal' (1,5 / 0,7) · 'fort' (1,9 / 0,9) · ou un nombre (la silhouette)
//     age       'homme' (défaut) · 'femme' · 'enfant6' · 'enfant4' : mains/proportions.json (agent 4)
//     loin      true : toute la main en gris (la main du dessous, la deuxième main derrière la première)
//     masque    false : ne pas peindre le blanc de l'objet sous lui (voir « Les couches »)
//
// Le résultat se colle comme une chaîne SVG et porte la géométrie, en unités de vue :
//   .prise     { x, y, angle, r, axe: [ux, uy], raccourci, bouts }  l'axe de l'objet tenu : son point au creux
//              de la main, l'angle de l'axe à l'écran (degrés), le rayon vu, raccourci (1 : l'axe dans le plan
//              de la vue ; 0 : vu par le bout, l'objet est le cercle r), bouts (les deux bouts de l'objet s'il
//              a une longueur). Sans objet : le creux de la paume, r = 0.
//   .poignet   [x, y]   .coude [x, y] (le coude : l'avant-bras entier, même s'il n'est pas dessiné)
//   .coupe     [[x, y], [x, y]] les deux coins de la coupe de l'avant-bras (null s'il file au bord)
//   .bout      [x, y]  le bout de l'index        .pouce [x, y]  le bout du pouce
//   .doigts    { index: [x, y], majeur, annulaire, auriculaire, pouce }  le bout de chaque doigt
//   .articulations  { 'index.mcp': [x, y], … }   tous les points du squelette, projetés
//   .contact   [[x, y], …]  les points où la main touche l'objet ou la surface (pulpes, paume)
//   .boite     { x0, y0, x1, y1 }   .echelle   .vue   .devant (les pièces peintes devant l'objet)
//
// ═══ LE REPÈRE ET LE SQUELETTE (contrat entre moteur.js, profil.js et prises.js) ═══════════════════════
//
// Repère local de la MAIN DROITE, en mm d'homme adulte : origine au centre du pli du poignet ; x le long de
// l'axe de la main (du poignet vers le bout du majeur, doigts tendus) ; y vers l'auriculaire (le pouce est du
// côté −y : main droite vue du dos, doigts vers +x, pouce en haut de l'écran) ; z vers la paume (x × y = z :
// vue du dos, l'œil est du côté −z). Une flexion est positive vers la paume (+z).
//
// Les articulations (noms des points, `squelette(pose).points`) :
//   'poignet'
//   '<doigt>.cmc' '<doigt>.mcp' '<doigt>.ipp' '<doigt>.ipd' '<doigt>.bout'   doigt : index · majeur · annulaire
//                                                                            · auriculaire
//   'pouce.cmc' 'pouce.mcp' 'pouce.ip' 'pouce.bout'
//   'coude'      (au bout de l'avant-bras entier)
// '.bout' est le CENTRE de l'arrondi du bout du doigt ; le bout réel est à rayon de pulpe plus loin
// (`squelette().extremites['index']`).
//
// Les segments (noms des pièces, `squelette(pose).segments[id] = { de, a, u, n, r, L }`) :
//   '<doigt>.meta' (cmc → mcp, dans la paume) · '<doigt>.p1' (mcp → ipp) · '<doigt>.p2' (ipp → ipd) ·
//   '<doigt>.p3' (ipd → bout) · 'pouce.meta' (cmc → mcp : l'éminence thénar) · 'pouce.p1' (mcp → ip) ·
//   'pouce.p2' (ip → bout) · 'avantbras' (poignet → coude)
//   u : l'axe du segment (vers le bout du doigt ; pour l'avant-bras, du coude vers le poignet) ;
//   n : la normale dorsale (le côté de l'ongle, du dos de la main) ; r = n × u : le côté radial (vers le pouce
//   pour les doigts ; pour le pouce, son bord extérieur, loin de l'index).
//
// ═══ LE FORMAT DES FORMES DE SEGMENT, PAR VUE ════════════════════════════════════════════════════════════
//
// Une section de segment est une ellipse en quatre quarts : demi-largeurs côté radial (+r), ulnaire (−r),
// dorsal (+n) et palmaire (−n). Une vue ne voit que la projection de ces sections, enchaînées le long de l'os :
// la forme vue de n'importe quel côté (et le raccourci d'un doigt plié vers l'œil) vient de la même main 3D.
//
//   FORMES.dos[id]    = [[t, demiLargeurRadiale, demiLargeurUlnaire], …]   (vues dos et paume : la LARGEUR)
//   FORMES.profil[id] = [[t, demiEpaisseurDorsale, demiEpaisseurPalmaire], …]   (vues de profil : l'ÉPAISSEUR)
//   t de 0 (articulation proximale) à 1 (distale), mm d'homme adulte. Les clés s'interpolent en cubique
//   monotone. Le bout du doigt (p3, pouce.p2) se ferme au-delà de t = 1 par un arrondi de la demi-largeur.
//   La paume n'est pas un segment : c'est l'enveloppe convexe de bosses (FORMES.paume, même convention de
//   demi-axes, dans le repère de la main : [le long de x, radial, ulnaire, dorsal, palmaire]).
//
// profil.js (agent 2) exporte { profil: { id: [[t, dD, dP], …], … }, paume?: [bosses…], avantbras?: … } :
// le moteur prend ses tables à la place des provisoires d'ici dès qu'il existe. Il peut aussi exporter
// pieces(sq, vue, outils) → des bosses 3D de plus (coussinets, talon de la main), même format que la paume.
//
// ═══ LE FORMAT DE POSE (mains/poses.json, agent 3) ════════════════════════════════════════════════════════
//
//   { "id": "prise-manche",
//     "doigts": { "index": { "ecart": 0, "mcp": 70, "ipp": 95, "ipd": 50 }, "majeur": {…}, "annulaire": {…},
//                 "auriculaire": {…},
//                 "pouce": { "opposition": 60, "cmc": 30, "mcp": 20, "ip": 25, "rotation": 30 } },
//     "poignet": { "flexion": 0, "deviation": 0 },
//     "objet": { "type": "cylindre", "diametre": 32, "centre": [x, y, z], "axe": [ux, uy, uz], "longueur": 400 },
//     "points": { "pouce.bout": [x, y, z], … },          (facultatif : des articulations imposées, en 3D)
//     "devant": { "dos": ["index", "majeur.p1", …], "paume": [ … ] },   (facultatif : surcharge du calcul)
//     "loin": { "pouce": ["majeur", "annulaire"] },      (facultatif : des pièces peintes en gris)
//     "note": "…" }
//   ecart : l'abduction au MCP, positive en s'éloignant du majeur (le majeur : positive vers le pouce) ; 0 : les
//     doigts serrés, qui se touchent sur toute leur longueur.
//   mcp, ipp, ipd : la flexion, positive vers la paume (négative : en extension).
//   pouce : opposition (0 : le pouce dans le plan de la paume, à côté de l'index ; 90 : devant la paume, la
//     pulpe tournée vers les doigts) ; cmc (la flexion du métacarpien vers la paume et l'auriculaire) ; mcp, ip
//     (flexion) ; rotation (la pronation propre du pouce, défaut 0,6 × opposition).
//   poignet : flexion (positive : la main vers la paume) ; deviation (positive : vers le pouce).
//   objet : type 'cylindre' (manche, bouteille, corde : diametre), 'fil' (cylindre fin : aiguille, ficelle),
//     'sphere' (diametre), 'plan' (une surface : centre = un point du plan, axe = sa normale vers la main).
//     Sans centre ni axe, le moteur le pose au creux de la main (prise) et, si la pose ne donne pas les
//     flexions des doigts (ou "enrouler": true), il les enroule autour (enrouler(), ci-dessous).
// prises.js (agent 3) peut exporter resoudre(pose, outils) → la pose complétée (angles, objet placé) : le moteur
// l'appelle avant tout le reste. outils = { squelette, anatomie, formes, demiAxes, enrouler }.
//
// ═══ LES COUCHES ═══════════════════════════════════════════════════════════════════════════════════════════
//
// Les pièces : 'avantbras', 'paume' (enveloppe + palmures + pouce.meta), '<doigt>.p1|p2|p3', 'pouce.p1|p2'.
// Chacune a sa profondeur (des sphères le long de l'os) ; le moteur décide, pour chaque vue :
//   1. l'ordre des pièces entre elles (deux doigts : celui qui est devant ; un doigt et la paume : se fondent,
//      ou le doigt passe devant avec un écart réel de profondeur, et alors seulement il a son trait 0,7) ;
//   2. pour chaque pièce qui chevauche l'objet, si elle est devant ou derrière lui (pose.devant le surcharge) ;
//      un doigt derrière l'objet (ou caché aux deux tiers derrière un autre doigt) est peint en gris.
// L'ordre de peinture :
//   a. la main entière : le blanc, les pièces grises, la silhouette (1,5) et les traits intérieurs (0,7) ;
//   b. le blanc de l'objet dans la main (masque : une hachure est transparente) ;
//   c. l'objet (option objet) ;
//   d. les pièces DEVANT l'objet, repeintes là où l'objet passe (blanc, silhouette, traits) : le manche
//      entre d'un côté du poing et ressort de l'autre, derrière les doigts qui l'entourent.
//
// Unités internes : mm. L'union, les décalages et les découpes passent par Clipper (corps/clipper.js).

'use strict';

const fs = require('fs');
const path = require('path');
const CL = require('../corps/clipper');

const NOIR = '#1A1A1A', BLANC = '#FFFFFF', GRIS = '#E6E6E6';
const RAD = Math.PI / 180;
const DOIGTS = ['index', 'majeur', 'annulaire', 'auriculaire'];

// ─── vecteurs 3D ────────────────────────────────────────────────────────────────────────────────────────
const a3 = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const s3 = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const m3 = (a, k) => [a[0] * k, a[1] * k, a[2] * k];
const d3 = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const x3 = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const l3 = a => Math.hypot(a[0], a[1], a[2]);
const u3 = a => { const l = l3(a) || 1; return [a[0] / l, a[1] / l, a[2] / l]; };
const i3 = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
// rotation de v autour de l'axe unitaire k, de deg degrés (Rodrigues)
function rot3(v, k, deg) {
  const c = Math.cos(deg * RAD), s = Math.sin(deg * RAD), kv = d3(k, v), kx = x3(k, v);
  return [v[0] * c + kx[0] * s + k[0] * kv * (1 - c), v[1] * c + kx[1] * s + k[1] * kv * (1 - c), v[2] * c + kx[2] * s + k[2] * kv * (1 - c)];
}
const orth = (v, u) => u3(s3(v, m3(u, d3(v, u))));            // v rendu perpendiculaire à u
// v emporté par la plus petite rotation qui amène u0 sur u1
function transporte(v, u0, u1) {
  const k = x3(u0, u1), s = l3(k), c = d3(u0, u1);
  if (s < 1e-9) return v.slice();
  return rot3(v, m3(k, 1 / s), Math.atan2(s, c) / RAD);
}
const matVec = (M, v) => [d3(M[0], v), d3(M[1], v), d3(M[2], v)];
const matMul = (A, B) => A.map(r => [0, 1, 2].map(j => r[0] * B[0][j] + r[1] * B[1][j] + r[2] * B[2][j]));
function matRot(axe, deg) {
  const c = Math.cos(deg * RAD), s = Math.sin(deg * RAD);
  if (axe === 0) return [[1, 0, 0], [0, c, -s], [0, s, c]];
  if (axe === 1) return [[c, 0, s], [0, 1, 0], [-s, 0, c]];
  return [[c, -s, 0], [s, c, 0], [0, 0, 1]];
}

// ─── vecteurs 2D ────────────────────────────────────────────────────────────────────────────────────────
const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const mul = (a, k) => [a[0] * k, a[1] * k];
const lon = a => Math.hypot(a[0], a[1]);
const uni = a => { const l = Math.hypot(a[0], a[1]) || 1; return [a[0] / l, a[1] / l]; };
const dot = (a, b) => a[0] * b[0] + a[1] * b[1];
const crx = (a, b) => a[0] * b[1] - a[1] * b[0];
const tourne = (a, deg) => { const c = Math.cos(deg * RAD), s = Math.sin(deg * RAD); return [a[0] * c - a[1] * s, a[0] * s + a[1] * c]; };
const aire = P => { let s = 0; for (let i = 0; i < P.length; i++) { const a = P[i], b = P[(i + 1) % P.length]; s += a[0] * b[1] - b[0] * a[1]; } return s / 2; };

// enveloppe convexe (chaîne monotone d'Andrew)
function enveloppe(pts) {
  const P = pts.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  if (P.length < 3) return P;
  const c = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const bas = [], haut = [];
  for (const p of P) { while (bas.length >= 2 && c(bas[bas.length - 2], bas[bas.length - 1], p) <= 0) bas.pop(); bas.push(p); }
  for (let i = P.length - 1; i >= 0; i--) { const p = P[i]; while (haut.length >= 2 && c(haut[haut.length - 2], haut[haut.length - 1], p) <= 0) haut.pop(); haut.push(p); }
  haut.pop(); bas.pop();
  return bas.concat(haut);
}

// ─── Clipper : union, décalage, découpe (les mêmes outils que corps/moteur.js) ───────────────────────────
const SC = 100;
const versCL = P => P.map(p => ({ X: Math.round(p[0] * SC), Y: Math.round(p[1] * SC) }));
const deCL = P => P.map(q => [q.X / SC, q.Y / SC]);
const positif = P => (aire(P) < 0 ? P.slice().reverse() : P);
function union(polys) {
  const c = new CL.Clipper();
  c.AddPaths(polys.filter(p => p.length > 2).map(p => versCL(positif(p))), CL.PolyType.ptSubject, true);
  const sol = new CL.Paths();
  c.Execute(CL.ClipType.ctUnion, sol, CL.PolyFillType.pftNonZero, CL.PolyFillType.pftNonZero);
  return sol;
}
function unionCL(listes) {
  const c = new CL.Clipper();
  for (const l of listes) if (l && l.length) c.AddPaths(l, CL.PolyType.ptSubject, true);
  const sol = new CL.Paths();
  c.Execute(CL.ClipType.ctUnion, sol, CL.PolyFillType.pftNonZero, CL.PolyFillType.pftNonZero);
  return sol;
}
function operation(type, a, b) {
  const c = new CL.Clipper();
  c.AddPaths(a, CL.PolyType.ptSubject, true);
  c.AddPaths(b, CL.PolyType.ptClip, true);
  const sol = new CL.Paths();
  c.Execute(type, sol, CL.PolyFillType.pftNonZero, CL.PolyFillType.pftNonZero);
  return sol;
}
const moins = (a, b) => (b.length && a.length ? operation(CL.ClipType.ctDifference, a, b) : a);
const inter = (a, b) => (a.length && b.length ? operation(CL.ClipType.ctIntersection, a, b) : []);
function decale(paths, mm) {
  if (!paths.length || !mm) return paths;
  const propres = CL.Clipper.SimplifyPolygons(CL.Clipper.CleanPolygons(paths, 2), CL.PolyFillType.pftNonZero);
  const co = new CL.ClipperOffset(2, 0.03 * SC);
  co.AddPaths(propres, CL.JoinType.jtRound, CL.EndType.etClosedPolygon);
  const sol = new CL.Paths();
  co.Execute(sol, mm * SC);
  return sol;
}
const ferme = (p, r) => decale(decale(p, r), -r);          // arrondit les coins rentrants
const ouvre = (p, r) => decale(decale(p, -r), r);          // arrondit les coins saillants
const aireCL = paths => paths.reduce((a, P) => a + CL.Clipper.Area(P), 0) / (SC * SC);
function dedans(paths, p) {
  const q = { X: Math.round(p[0] * SC), Y: Math.round(p[1] * SC) };
  let n = 0; for (const P of paths) if (CL.Clipper.PointInPolygon(q, P) !== 0) n++;
  return n % 2 === 1;
}
function recoller(lignes) {
  const pres = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]) < 0.05;
  let L = lignes.filter(l => l.length > 1), change = true;
  while (change) {
    change = false;
    for (let i = 0; i < L.length && !change; i++) for (let j = 0; j < L.length && !change; j++) {
      if (i === j) continue;
      const a = L[i], b = L[j];
      if (pres(a[a.length - 1], b[0])) { L[i] = a.concat(b.slice(1)); L.splice(j, 1); change = true; }
      else if (pres(a[a.length - 1], b[b.length - 1])) { L[i] = a.concat(b.slice().reverse().slice(1)); L.splice(j, 1); change = true; }
    }
  }
  return L;
}
// les bords d'une forme (chemins Clipper fermés) qui tombent dans une région
function bordsDans(formeCL, regionCL) {
  if (!formeCL.length || !regionCL.length) return [];
  return lignesDans(formeCL.map(P => deCL(P.concat([P[0]]))), regionCL);
}
// des lignes ouvertes (mm) découpées par une région : ce qui tombe dedans
function lignesDans(lignes, regionCL, garderDedans = true) {
  if (!lignes.length) return [];
  if (!regionCL.length) return garderDedans ? [] : lignes;
  const c = new CL.Clipper();
  c.AddPaths(lignes.filter(l => l.length > 1).map(versCL), CL.PolyType.ptSubject, false);
  c.AddPaths(regionCL, CL.PolyType.ptClip, true);
  const arbre = new CL.PolyTree();
  c.Execute(garderDedans ? CL.ClipType.ctIntersection : CL.ClipType.ctDifference, arbre, CL.PolyFillType.pftNonZero, CL.PolyFillType.pftNonZero);
  return recoller(CL.Clipper.OpenPathsFromPolyTree(arbre).map(deCL));
}
const lignesHors = (lignes, regionCL) => lignesDans(lignes, regionCL, false);
const longueur = l => { let s = 0; for (let i = 1; i < l.length; i++) s += lon(sub(l[i], l[i - 1])); return s; };
const contourDe = paths => paths.map(P => deCL(P.concat([P[0]])));
function boiteCL(paths) {
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const P of paths) for (const q of P) { const x = q.X / SC, y = q.Y / SC; if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  return { x0, y0, x1, y1 };
}
const seCroisent = (a, b, m = 0) => a.x0 - m < b.x1 && b.x0 - m < a.x1 && a.y0 - m < b.y1 && b.y0 - m < a.y1;
const disque = (c, r, n = 40) => Array.from({ length: n }, (_, k) => add(c, [r * Math.cos(2 * Math.PI * k / n), r * Math.sin(2 * Math.PI * k / n)]));

// Ramer-Douglas-Peucker
function allege(P, tol, ferme_ = false) {
  if (P.length < 4) return P;
  if (ferme_) {
    let im = 0, dm = -1;
    for (let i = 1; i < P.length; i++) { const d = lon(sub(P[i], P[0])); if (d > dm) { dm = d; im = i; } }
    const a = allege(P.slice(0, im + 1), tol), b = allege(P.slice(im).concat([P[0]]), tol);
    return a.concat(b.slice(1, -1));
  }
  const garde = new Uint8Array(P.length); garde[0] = garde[P.length - 1] = 1;
  const pile = [[0, P.length - 1]];
  while (pile.length) {
    const [a, b] = pile.pop(); let dm = 0, im = -1;
    const A = P[a], B = P[b], AB = sub(B, A), L = lon(AB);
    for (let i = a + 1; i < b; i++) { const d = L > 1e-9 ? Math.abs(crx(AB, sub(P[i], A))) / L : lon(sub(P[i], A)); if (d > dm) { dm = d; im = i; } }
    if (dm > tol && im > 0) { garde[im] = 1; pile.push([a, im], [im, b]); }
  }
  return P.filter((_, i) => garde[i]);
}

// lissage de Taubin d'un contour fermé (mm) : rééchantillonné au pas, puis lissé sans rétrécir ; enlève les
// facettes des enveloppes sans toucher aux formes de plus de quelques mm
function lisserBoucle(P, pas = 0.8, iter = 6, lam = 0.5, mu = -0.53) {
  const n0 = P.length; if (n0 < 4) return P;
  let Q = [];
  for (let i = 0; i < n0; i++) {
    const a = P[i], b = P[(i + 1) % n0], d = lon(sub(b, a)), k = Math.max(1, Math.round(d / pas));
    for (let j = 0; j < k; j++) Q.push(add(a, mul(sub(b, a), j / k)));
  }
  const n = Q.length; if (n < 6) return P;
  const pasF = f => { const R = new Array(n); for (let i = 0; i < n; i++) { const a = Q[(i - 1 + n) % n], b = Q[(i + 1) % n], q = Q[i]; R[i] = [q[0] + f * ((a[0] + b[0]) / 2 - q[0]), q[1] + f * ((a[1] + b[1]) / 2 - q[1])]; } Q = R; };
  for (let k = 0; k < iter; k++) { pasF(lam); pasF(mu); }
  return Q;
}
function lisserCL(paths, pas = 0.8, iter = 6) {
  const out = [];
  for (const P of paths) {
    const pts = deCL(P), trou = !CL.Clipper.Orientation(P);
    if (Math.abs(aire(pts)) < 1) continue;
    let Q = allege(lisserBoucle(pts, pas, iter), 0.025, true);
    const q = versCL(Q);
    if (CL.Clipper.Orientation(q) === trou) q.reverse();
    out.push(q);
  }
  return out;
}

// interpolation cubique monotone des tables [t, a, b] (pas de bosse entre deux clés)
function interp(cles) {
  const T = cles.map(c => c[0]), n = T.length;
  const f = j => {
    const Y = cles.map(c => c[j]);
    if (n === 1) return () => Y[0];
    const d = [], m = new Array(n).fill(0);
    for (let i = 0; i < n - 1; i++) d.push((Y[i + 1] - Y[i]) / ((T[i + 1] - T[i]) || 1e-9));
    m[0] = d[0]; m[n - 1] = d[n - 2];
    for (let i = 1; i < n - 1; i++) m[i] = d[i - 1] * d[i] <= 0 ? 0 : (d[i - 1] + d[i]) / 2;
    for (let i = 0; i < n - 1; i++) {
      if (d[i] === 0) { m[i] = m[i + 1] = 0; continue; }
      const a = m[i] / d[i], b = m[i + 1] / d[i], s = a * a + b * b;
      if (s > 9) { const k = 3 / Math.sqrt(s); m[i] = k * a * d[i]; m[i + 1] = k * b * d[i]; }
    }
    return t => {
      if (t <= T[0]) return Y[0];
      if (t >= T[n - 1]) return Y[n - 1];
      let i = 0; while (t > T[i + 1]) i++;
      const h = T[i + 1] - T[i], s = (t - T[i]) / h, s2 = s * s, s3 = s2 * s;
      return (2 * s3 - 3 * s2 + 1) * Y[i] + (s3 - 2 * s2 + s) * h * m[i] + (-2 * s3 + 3 * s2) * Y[i + 1] + (s3 - s2) * h * m[i + 1];
    };
  };
  return { a: f(1), b: f(2) };
}

// ─── l'anatomie : la main de l'homme adulte (mm) ────────────────────────────────────────────────────────
// Repères du dessin, à la mesure d'une main d'homme de 190 du pli du poignet au bout du majeur (largeur aux
// métacarpiens ≈ 86, poignet ≈ 60). proportions.json (agent 4) les met à l'échelle de chaque âge.
// L : longueurs des phalanges d'articulation à articulation ; la dernière va jusqu'au centre de l'arrondi du
// bout (le bout réel est à une demi-largeur plus loin).
const ANATOMIE = {
  longueur: 190, largeur: 86,
  doigts: {
    index:       { mcp: [88, -24, -1], cmc: [12, -15, 1], L: [43, 25, 16] },
    majeur:      { mcp: [89, -5, -3], cmc: [12, -4, 0], L: [47, 29, 17.5] },
    annulaire:   { mcp: [85, 13, -1], cmc: [12, 7, 1], L: [44, 28, 16.5] },
    auriculaire: { mcp: [77, 29, 3], cmc: [12, 17, 3], L: [35, 20, 15] },
  },
  // le pouce au repos (opposition 0, cmc 0) : le métacarpien part à 28° de l'axe, côté radial, plongé de 14°
  // vers la paume ; l'ongle regarde côté radial et dorsal
  pouce: { cmc: [16, -21, 9], L: [46, 32, 18.5], angle: 28, plongee: 14, ongle: [0, -0.75, -0.66] },
  avantbras: { longueur: 255 },
};

// Les formes des segments (voir l'en-tête). Les doigts un peu plus pleins qu'au naturel : une notice arrondit.
const FORMES = {
  dos: {
    'index.p1': [[0, 10.8, 10.8], [1, 9.9, 9.9]],
    'index.p2': [[0, 9.9, 9.9], [1, 8.9, 8.9]],
    'index.p3': [[0, 8.9, 8.9], [0.5, 8.5, 8.5], [1, 7.6, 7.6]],
    'majeur.p1': [[0, 11.0, 11.0], [1, 10.2, 10.2]],
    'majeur.p2': [[0, 10.2, 10.2], [1, 9.2, 9.2]],
    'majeur.p3': [[0, 9.2, 9.2], [0.5, 8.8, 8.8], [1, 7.8, 7.8]],
    'annulaire.p1': [[0, 10.5, 10.5], [1, 9.7, 9.7]],
    'annulaire.p2': [[0, 9.7, 9.7], [1, 8.7, 8.7]],
    'annulaire.p3': [[0, 8.7, 8.7], [0.5, 8.3, 8.3], [1, 7.4, 7.4]],
    'auriculaire.p1': [[0, 9.5, 9.5], [1, 8.7, 8.7]],
    'auriculaire.p2': [[0, 8.7, 8.7], [1, 7.8, 7.8]],
    'auriculaire.p3': [[0, 7.8, 7.8], [0.5, 7.4, 7.4], [1, 6.6, 6.6]],
    'pouce.meta': [[0, 13, 14], [0.35, 15, 15.5], [0.7, 13.5, 13.5], [1, 11.6, 11.6]],
    'pouce.p1': [[0, 11.4, 11.4], [1, 10.9, 10.9]],
    'pouce.p2': [[0, 10.9, 10.9], [0.5, 10.6, 10.6], [1, 9.6, 9.6]],
    'avantbras': [[0, 28.5, 28.5], [0.12, 30.2, 30], [0.3, 34.5, 34], [0.55, 39.5, 38], [0.75, 41, 39.5], [1, 38.5, 37]],
  },
  // provisoire, en attendant profil.js (agent 2)
  profil: {
    'index.p1': [[0, 9.2, 10.4], [1, 8.4, 9.4]],
    'index.p2': [[0, 8.4, 9.4], [1, 7.4, 8.4]],
    'index.p3': [[0, 7.4, 8.4], [0.5, 6.8, 8.2], [1, 5.8, 7.2]],
    'majeur.p1': [[0, 9.4, 10.6], [1, 8.6, 9.6]],
    'majeur.p2': [[0, 8.6, 9.6], [1, 7.6, 8.6]],
    'majeur.p3': [[0, 7.6, 8.6], [0.5, 7.0, 8.4], [1, 6.0, 7.4]],
    'annulaire.p1': [[0, 9.0, 10.2], [1, 8.2, 9.2]],
    'annulaire.p2': [[0, 8.2, 9.2], [1, 7.2, 8.2]],
    'annulaire.p3': [[0, 7.2, 8.2], [0.5, 6.6, 8.0], [1, 5.6, 7.0]],
    'auriculaire.p1': [[0, 8.2, 9.2], [1, 7.4, 8.4]],
    'auriculaire.p2': [[0, 7.4, 8.4], [1, 6.6, 7.6]],
    'auriculaire.p3': [[0, 6.6, 7.6], [0.5, 6.1, 7.4], [1, 5.2, 6.4]],
    'pouce.meta': [[0, 10.5, 16], [0.4, 11, 18], [0.75, 10, 13.5], [1, 9.8, 11]],
    'pouce.p1': [[0, 9.6, 10.6], [1, 8.9, 9.9]],
    'pouce.p2': [[0, 8.9, 9.9], [0.5, 8.5, 9.6], [1, 7.2, 8.6]],
    'avantbras': [[0, 18, 20], [0.12, 20, 22.5], [0.3, 24, 27], [0.65, 32, 33], [1, 31, 31]],
  },
  // la paume : des bosses dont l'enveloppe convexe fait la paume, dans le repère de la main
  // { c: centre, h: [le long de x, radial (−y), ulnaire (+y), dorsal (−z), palmaire (+z)] }
  paume: [
    { nom: 'carpe', c: [3, 1, 1], h: [7, 28, 28.5, 15, 15.5] },
    { nom: 'carpe2', c: [16, 1, 2], h: [10, 28, 28.5, 15, 16] },
    { nom: 'hypothenar', c: [42, 25, 5], h: [26, 10, 12.5, 10.5, 14] },
    { nom: 'thenar', c: [30, -17, 9], h: [18, 8, 8, 8, 12] },
  ],
  // les têtes des métacarpiens (au MCP) et leurs fûts : h comme la paume
  tete: { index: [9, 12, 10, 11.5, 14], majeur: [9, 10.5, 10.5, 12, 14], annulaire: [9, 10.5, 10.5, 11.5, 14], auriculaire: [9, 10, 11.5, 11, 13.5] },
  fut: [12, 9.5, 9.5, 12, 14],
};

// ─── les poses intégrées (en attendant mains/poses.json) ──────────────────────────────────────────────────
const doigtsPareils = (o, pouce) => ({ index: { ...o }, majeur: { ...o }, annulaire: { ...o }, auriculaire: { ...o }, pouce });
const POSES = {
  ouverte: { doigts: { index: { ecart: 9, mcp: 5, ipp: 8, ipd: 5 }, majeur: { ecart: 2, mcp: 6, ipp: 10, ipd: 6 },
    annulaire: { ecart: 8, mcp: 8, ipp: 13, ipd: 7 }, auriculaire: { ecart: 16, mcp: 11, ipp: 16, ipd: 8 },
    pouce: { opposition: 10, cmc: -10, mcp: 8, ip: 12 } }, poignet: { flexion: 0, deviation: 0 } },
  plat: { doigts: doigtsPareils({ ecart: 0, mcp: 0, ipp: 0, ipd: 0 }, { opposition: 0, cmc: 12, mcp: 0, ip: 0 }), poignet: { flexion: 0, deviation: 0 } },
  'prise-manche': { doigts: { index: { ecart: 0 }, majeur: { ecart: 0 }, annulaire: { ecart: 0 }, auriculaire: { ecart: 0 },
    pouce: { opposition: 38, cmc: 9, mcp: 21, ip: 39, rotation: -47 } }, poignet: { flexion: 0, deviation: 0 },
    objet: { type: 'cylindre', diametre: 32 }, enrouler: true },
  poing: { doigts: { index: { ecart: 0, mcp: 85, ipp: 100, ipd: 55 }, majeur: { ecart: 0, mcp: 88, ipp: 102, ipd: 55 },
    annulaire: { ecart: 0, mcp: 90, ipp: 104, ipd: 55 }, auriculaire: { ecart: 0, mcp: 92, ipp: 106, ipd: 55 },
    pouce: { opposition: 36, cmc: 22, mcp: 32, ip: 28 } }, poignet: { flexion: 0, deviation: 0 } },
};

// lus une fois, relus si le fichier change
const CACHE_JSON = new Map();
function chargerJSON(nom) {
  const f = path.join(__dirname, nom);
  try {
    if (!fs.existsSync(f)) return null;
    const t = fs.statSync(f).mtimeMs, c = CACHE_JSON.get(f);
    if (c && c.t === t) return c.v;
    const v = JSON.parse(fs.readFileSync(f, 'utf8'));
    CACHE_JSON.set(f, { t, v });
    return v;
  } catch (e) { return (CACHE_JSON.get(f) || {}).v || null; }
}
function chargerJS(nom) {
  const f = path.join(__dirname, nom + '.js');
  if (!fs.existsSync(f)) return null;
  try { return require(f); } catch (e) { if (process.env.MAINS_DEBUG) console.error(`mains/${nom}.js :`, e.message); return null; }
}
const DEJA_DIT = new Set();
function trouverPose(id) {
  if (id && typeof id === 'object') return id;
  const pj = chargerJSON('poses.json');
  const liste = pj && (Array.isArray(pj) ? pj : (pj.poses || null));
  if (Array.isArray(liste)) { const p = liste.find(q => q && q.id === id); if (p) return p; }
  if (pj && !Array.isArray(pj) && pj[id] && pj[id].doigts) return pj[id];
  if (POSES[id]) return POSES[id];
  if (!DEJA_DIT.has(id)) { DEJA_DIT.add(id); console.warn(`mainSimple : pose « ${id} » inconnue (ni poses.json ni le moteur) — rendue ouverte`); }
  return POSES.ouverte;
}

// ─── proportions par âge (proportions.json, agent 4) ──────────────────────────────────────────────────────
// Clés lues : ages.<age>.main = { longueur, largeur } (mm), ages.<age>.avantbras = { longueur } ; à défaut,
// longueur / 190 pour tout. La forme (les tables) ne change pas : une main d'enfant est une main plus petite,
// plus large pour sa longueur.
const ALIAS = { adulte: 'homme', homme: 'homme', femme: 'femme', enfant: 'enfant6', enfant6: 'enfant6', enfant4: 'enfant4' };
function echellesAge(age) {
  const cle = ALIAS[age] || 'homme';
  const pj = chargerJSON('proportions.json');
  const g = pj && pj.ages && (pj.ages[cle] || pj.ages[(pj.alias || {})[cle]]);
  const m = g && (g.main || g);
  const L = m && (m.longueur || m.longueurMain);
  const W = m && (m.largeur || m.largeurMain);
  const kL = L ? L / ANATOMIE.longueur : ({ homme: 1, femme: 0.91, enfant6: 0.66, enfant4: 0.6 })[cle];
  const kW = W ? W / ANATOMIE.largeur : kL;
  const ab = g && g.avantbras && g.avantbras.longueur ? g.avantbras.longueur / ANATOMIE.avantbras.longueur : kL;
  return { kL, kW, kA: ab, cle };
}

// ─── les tables de formes, avec profil.js s'il existe ────────────────────────────────────────────────────
function formes() {
  const P = chargerJS('profil');
  const prof = Object.assign({}, FORMES.profil, (P && (P.profil || (P.FORMES && P.FORMES.profil))) || {});
  return { dos: FORMES.dos, profil: prof, paume: (P && P.paume) || FORMES.paume, ext: P };
}
const CACHE_INTERP = new Map();
function table(F, id) {
  const cle = id;
  let r = CACHE_INTERP.get(F);
  if (!r) { r = new Map(); CACHE_INTERP.set(F, r); }
  if (r.has(cle)) return r.get(cle);
  const d = F.dos[id] || [[0, 10, 10], [1, 10, 10]], p = F.profil[id] || [[0, 9, 10], [1, 9, 10]];
  const v = { d: interp(d), p: interp(p) };
  r.set(cle, v);
  return v;
}
// les quatre demi-axes d'un segment en t : [radial, ulnaire, dorsal, palmaire]
function demiAxes(F, id, t, kW = 1) {
  const T = table(F, id);
  return [T.d.a(t) * kW, T.d.b(t) * kW, T.p.a(t) * kW, T.p.b(t) * kW];
}

// ─── la cinématique ──────────────────────────────────────────────────────────────────────────────────────
// la direction de base de chaque doigt (écart 0) : les doigts serrés se touchent sur toute leur longueur,
// en se recouvrant d'un millimètre (une seule ligne les sépare) ; le majeur est l'axe
function directionsBase(an, F, kW) {
  const dir = {};
  const ym = an.doigts.majeur.mcp[1];
  dir.majeur = 0;
  const larg = (d, t) => { const w = demiAxes(F, d + '.p2', t, kW); return w[0]; };
  // pour un voisin du côté radial (s = −1) ou ulnaire (s = +1) : l'angle qui met son IPD à la bonne distance
  const cale = (d, voisin, s, angVoisin) => {
    const A = an.doigts[d], B = an.doigts[voisin];
    const LB = B.L[0] + B.L[1], LA = A.L[0] + A.L[1];
    const yB = B.mcp[1] + Math.sin(angVoisin * RAD) * LB;
    const xB = B.mcp[0] + Math.cos(angVoisin * RAD) * LB;
    const ecart = larg(d, 1) + larg(voisin, 1) - 1.0;
    const yCible = yB + s * ecart;
    // A.mcp + LA (cos a, sin a) : on cherche a pour que y = yCible (à x voisin près)
    const sinA = Math.max(-0.6, Math.min(0.6, (yCible - A.mcp[1]) / LA));
    void xB;
    return Math.asin(sinA) / RAD;
  };
  dir.index = cale('index', 'majeur', -1, dir.majeur);
  dir.annulaire = cale('annulaire', 'majeur', +1, dir.majeur);
  dir.auriculaire = cale('auriculaire', 'annulaire', +1, dir.annulaire);
  void ym;
  return dir;
}

// Le squelette 3D d'une pose. Rend { points, segments, extremites, an } ; mm, repère de la main droite.
function squelette(pose, o = {}) {
  const age = echellesAge(o.age || pose.age || 'homme');
  const { kL, kW } = age;
  const F = o.F || formes();
  const an = mettreAEchelle(ANATOMIE, kL, kW);
  const dirs = directionsBase(an, F, kW);
  const D = pose.doigts || {};
  const pts = { poignet: [0, 0, 0] }, seg = {}, ext = {};
  const X = [1, 0, 0], Z = [0, 0, 1];
  for (const d of DOIGTS) {
    const A = an.doigts[d], q = Object.assign({ ecart: 0, mcp: 0, ipp: 0, ipd: 0 }, D[d] || {});
    const s = (d === 'index' || d === 'majeur') ? 1 : -1;               // +écart : vers −y pour l'index et le majeur
    let n = [0, 0, -1];
    let u = rot3(X, n, -dirs[d]);                                        // la direction de base, dans le plan de la main
    // dirs : angle vers +y (sin) ; rot3 autour de n = −z de +θ va vers −y : d'où le signe
    u = rot3(u, n, s * q.ecart);
    pts[d + '.cmc'] = A.cmc.slice();
    pts[d + '.mcp'] = A.mcp.slice();
    seg[d + '.meta'] = cadre(A.cmc, A.mcp, u3(s3(A.mcp, A.cmc)), n);
    const flex = [q.mcp, q.ipp, q.ipd], noms = ['mcp', 'ipp', 'ipd', 'bout'], ids = ['p1', 'p2', 'p3'];
    let P = A.mcp;
    for (let k = 0; k < 3; k++) {
      const a = u3(x3(n, u));                                             // l'axe de flexion
      u = rot3(u, a, flex[k]); n = rot3(n, a, flex[k]);
      const Q = a3(P, m3(u, A.L[k]));
      seg[d + '.' + ids[k]] = cadre(P, Q, u, n, A.L[k], flex[k]);
      P = Q; pts[d + '.' + noms[k + 1]] = Q;
    }
    const wb = demiAxes(F, d + '.p3', 1, kW);
    ext[d] = a3(P, m3(u, (wb[0] + wb[1]) / 2));
    void Z;
  }
  // le pouce : le métacarpien se règle par deux angles (l'écart radial dans le plan de la paume, la montée vers
  // la paume) ; l'ongle suit par la plus petite rotation, puis la pronation propre du pouce
  {
    const T = an.pouce, q = Object.assign({ opposition: 0, cmc: 0, mcp: 0, ip: 0 }, D.pouce || {});
    const dirP = (thR, thP) => u3([Math.cos(thP * RAD) * Math.cos(thR * RAD), -Math.cos(thP * RAD) * Math.sin(thR * RAD), Math.sin(thP * RAD)]);
    const u0 = dirP(T.angle, T.plongee), n0 = orth(T.ongle, u0);
    let u = dirP(T.angle - q.cmc, T.plongee + 0.75 * q.opposition);
    let n = transporte(n0, u0, u);
    n = rot3(n, u, q.rotation !== undefined ? q.rotation : 0.3 * q.opposition);
    let a;
    pts['pouce.cmc'] = T.cmc.slice();
    const M = a3(T.cmc, m3(u, T.L[0]));
    seg['pouce.meta'] = cadre(T.cmc, M, u, n, T.L[0], 0);
    pts['pouce.mcp'] = M;
    let P = M;
    const flex = [q.mcp, q.ip], noms = ['ip', 'bout'], ids = ['p1', 'p2'];
    for (let k = 0; k < 2; k++) {
      a = u3(x3(n, u));
      u = rot3(u, a, flex[k]); n = rot3(n, a, flex[k]);
      const Q = a3(P, m3(u, T.L[k + 1]));
      seg['pouce.' + ids[k]] = cadre(P, Q, u, n, T.L[k + 1], flex[k]);
      P = Q; pts['pouce.' + noms[k]] = Q;
    }
    const wb = demiAxes(F, 'pouce.p2', 1, kW);
    ext.pouce = a3(P, m3(u, (wb[0] + wb[1]) / 2));
  }
  // des articulations imposées (le solveur de prise) : le segment suit, son cadre est transporté
  if (pose.points) for (const [k, v] of Object.entries(pose.points)) if (pts[k]) pts[k] = v.slice();
  if (pose.points) recadrer(pts, seg);
  // le poignet : l'avant-bras part en sens inverse de la main, plié de flexion (vers la paume) et de déviation
  const W = Object.assign({ flexion: 0, deviation: 0 }, pose.poignet || {});
  let uA = [-1, 0, 0], nA = [0, 0, -1];
  // la main plie vers la paume de +f : vu de la main, l'avant-bras part vers la paume ; déviation vers le pouce :
  // l'avant-bras part vers l'auriculaire
  uA = rot3(uA, [0, 1, 0], -W.flexion); nA = rot3(nA, [0, 1, 0], -W.flexion);
  uA = rot3(uA, [0, 0, 1], -W.deviation); nA = rot3(nA, [0, 0, 1], -W.deviation);
  const LA = an.avantbras.longueur * age.kA / kL;
  pts.coude = m3(uA, LA);
  seg.avantbras = cadre(pts.coude, [0, 0, 0], m3(uA, -1), nA, LA, 0);
  return { points: pts, segments: seg, extremites: ext, an, age, F };
}
function cadre(de, a, u, n, L, flex) {
  const nn = orth(n, u);
  return { de: de.slice(), a: a.slice(), u, n: nn, r: x3(nn, u), L: L !== undefined ? L : l3(s3(a, de)), flex: flex || 0 };
}
// après des points imposés : chaque segment reprend sa direction, sa normale transportée au plus court
function recadrer(pts, seg) {
  const chaines = DOIGTS.map(d => [d, ['mcp', 'ipp', 'ipd', 'bout'], ['p1', 'p2', 'p3']]).concat([['pouce', ['cmc', 'mcp', 'ip', 'bout'], ['meta', 'p1', 'p2']]]);
  for (const [d, noms, ids] of chaines) {
    for (let k = 0; k < ids.length; k++) {
      const S = seg[d + '.' + ids[k]], de = pts[d + '.' + noms[k]], a = pts[d + '.' + noms[k + 1]];
      const u = u3(s3(a, de));
      // la normale : celle d'avant, tournée du plus petit angle qui amène l'ancien axe sur le nouveau
      const k_ = x3(S.u, u), s = l3(k_);
      let n = S.n;
      if (s > 1e-6) n = rot3(n, u3(k_), Math.asin(Math.min(1, s)) / RAD * (d3(S.u, u) < 0 ? -1 : 1));
      seg[d + '.' + ids[k]] = cadre(de, a, u, n, l3(s3(a, de)), S.flex);
    }
  }
}
function mettreAEchelle(an, kL, kW) {
  if (kL === 1 && kW === 1) return an;
  const sc = p => [p[0] * kL, p[1] * kW, p[2] * kW];
  const doigts = {};
  for (const d of DOIGTS) { const A = an.doigts[d]; doigts[d] = { mcp: sc(A.mcp), cmc: sc(A.cmc), L: A.L.map(l => l * kL) }; }
  return { ...an, doigts, pouce: { ...an.pouce, cmc: sc(an.pouce.cmc), L: an.pouce.L.map(l => l * kL) }, avantbras: { longueur: an.avantbras.longueur * kL } };
}

// ─── enrouler les doigts autour d'un cylindre (le repli du solveur de prise) ─────────────────────────────
// Dans le plan de flexion de chaque doigt, l'axe du cylindre perce un point C ; chaque phalange se couche
// tangente au cercle de rayon (r + demi-épaisseur palmaire), le cercle à l'intérieur du pli.
function enrouler(pose, objet, o = {}) {
  const sq = squelette(Object.assign({}, pose, { doigts: Object.assign({}, pose.doigts, Object.fromEntries(DOIGTS.map(d => [d, Object.assign({}, (pose.doigts || {})[d], { mcp: 0, ipp: 0, ipd: 0 })]))) }), o);
  const out = JSON.parse(JSON.stringify(pose.doigts || {}));
  const C0 = objet.centre, ax = u3(objet.axe), r = objet.diametre / 2;
  const maxi = [95, 110, 80];
  for (const d of DOIGTS) {
    const S = sq.segments[d + '.p1'];
    const M = S.de, e1 = S.u, e2 = m3(S.n, -1), nrm = u3(x3(e1, e2));
    // l'axe perce le plan de flexion
    const den = d3(ax, nrm);
    if (Math.abs(den) < 0.05) continue;
    const s = d3(s3(M, C0), nrm) / den;
    const C = a3(C0, m3(ax, s));
    const c2 = [d3(s3(C, M), e1), d3(s3(C, M), e2)];
    const cosI = Math.abs(den);
    const rho0 = r * (1 + 1 / Math.max(cosI, 0.5)) / 2;
    const L = sq.an.doigts[d].L;
    let P = [0, 0], dir = 0, flex = [];
    for (let k = 0; k < 3; k++) {
      const w = demiAxes(sq.F, `${d}.p${k + 1}`, 0.5, sq.age.kW);
      const rho = rho0 + w[3] * 0.92;
      const v = sub(c2, P), dd = lon(v);
      let t;
      if (dd <= rho + 0.01) t = Math.atan2(v[1], v[0]) / RAD - 90;
      else t = Math.atan2(v[1], v[0]) / RAD - Math.asin(rho / dd) / RAD;
      let f = t - dir;
      while (f > 180) f -= 360; while (f < -180) f += 360;
      f = Math.max(k === 0 ? 0 : 5, Math.min(maxi[k], f));
      dir += f; flex.push(f);
      P = add(P, [Math.cos(dir * RAD) * L[k], Math.sin(dir * RAD) * L[k]]);
    }
    out[d] = Object.assign({}, out[d], { mcp: Math.round(flex[0]), ipp: Math.round(flex[1]), ipd: Math.round(flex[2]) });
  }
  return Object.assign({}, pose, { doigts: out });
}

// l'objet par défaut d'une prise : un cylindre en travers de la paume, de l'hypothénar vers la base de l'index
function objetParDefaut(ob, an) {
  const o = Object.assign({}, ob);
  const r = (o.diametre || 32) / 2;
  if (o.type === 'plan') {
    if (!o.centre) o.centre = [90, 0, 16];
    if (!o.axe) o.axe = [0, 0, -1];
    return o;
  }
  if (!o.centre) {
    const m = an.doigts.majeur.mcp;
    o.centre = [m[0] - 14 - 0.45 * r, 0, 15.5 + r];
  }
  if (!o.axe) o.axe = u3([-0.28, 1, 0.05]);
  if (!o.longueur) o.longueur = o.type === 'sphere' ? 0 : 1200;
  return o;
}

// ─── la vue : une rotation de la main 3D ─────────────────────────────────────────────────────────────────
// lignes : x de l'écran, y de l'écran, profondeur (l'œil du côté des profondeurs petites)
const VUES = {
  dos: [[1, 0, 0], [0, 1, 0], [0, 0, 1]],
  paume: [[1, 0, 0], [0, -1, 0], [0, 0, -1]],
  pouce: [[1, 0, 0], [0, 0, -1], [0, 1, 0]],
  auriculaire: [[1, 0, 0], [0, 0, 1], [0, -1, 0]],
};
function matriceVue(vue, rotation) {
  let M = VUES[vue];
  if (!M) throw new Error(`mainSimple : vue « ${vue} » inconnue (dos · paume · pouce · auriculaire)`);
  if (rotation) {
    const [rx = 0, ry = 0, rz = 0] = rotation;
    M = matMul(matRot(2, rz), matMul(matRot(1, ry), matMul(matRot(0, rx), M)));
  }
  return M;
}

// ─── les pièces : les sections enchaînées, projetées ──────────────────────────────────────────────────────
const NSEC = 20;                                            // points par section
function section(c, fr, w) {
  const pts = [];
  for (let k = 0; k < NSEC; k++) {
    const ph = 2 * Math.PI * k / NSEC, cr = Math.cos(ph), sn = Math.sin(ph);
    const a = cr >= 0 ? w[0] : w[1], b = sn >= 0 ? w[2] : w[3];
    pts.push(a3(c, a3(m3(fr.r, a * cr), m3(fr.n, b * sn))));
  }
  return pts;
}
// un segment : ses sections le long de l'os (et au-delà au bout), projetées ; les enveloppes de deux sections
// voisines s'unissent en la forme du segment. Les sphères de profondeur suivent l'os.
function formeSegment(S, id, F, kW, M, { bout = false, debut = null, pas = 7, tMax = 1 } = {}) {
  const polys = [], spheres = [];
  const L = S.L, n = Math.max(2, Math.ceil(L * tMax / pas));
  const proj = p => matVec(M, p);
  const secs = [];
  const fr = { r: S.r, n: S.n };
  // la jointure à la base : des sections aux cadres intermédiaires (le côté extérieur du pli s'arrondit)
  if (debut) {
    const k = Math.max(1, Math.ceil(Math.abs(debut.angle) / 15));
    for (let i = 0; i < k; i++) {
      const t = i / k, ang = -debut.angle * (1 - t);
      const fr2 = { r: rot3(S.r, debut.axe, ang), n: rot3(S.n, debut.axe, ang) };
      secs.push(section(S.de, fr2, demiAxes(F, id, 0, kW)));
    }
  }
  for (let i = 0; i <= n; i++) {
    const t = tMax * i / n, c = a3(S.de, m3(S.u, L * t)), w = demiAxes(F, id, t, kW);
    secs.push(section(c, fr, w));
    const pc = proj(c);
    spheres.push({ x: pc[0], y: pc[1], z: pc[2], r: (w[0] + w[1] + w[2] + w[3]) / 4, w });
  }
  if (bout) {
    const w = demiAxes(F, id, 1, kW), rb = (w[0] + w[1]) / 2;
    for (const s of [0.35, 0.62, 0.82, 0.94, 1]) {
      const k = Math.sqrt(Math.max(0, 1 - s * s)), c = a3(S.a, m3(S.u, rb * s * 1.02));
      secs.push(section(c, fr, w.map(v => Math.max(0.15, v * k))));
    }
    const pc = proj(a3(S.a, m3(S.u, rb * 0.45)));
    spheres.push({ x: pc[0], y: pc[1], z: pc[2], r: rb * 0.85 });
  }
  const P2 = secs.map(sec => sec.map(p => { const q = proj(p); return [q[0], q[1]]; }));
  for (let i = 0; i < P2.length - 1; i++) polys.push(enveloppe(P2[i].concat(P2[i + 1])));
  return { polys, spheres };
}

// une bosse (paume, tête de métacarpien) : ses points de surface, projetés
function bosse(c, h, M) {
  const pts = [];
  const [ax, rR, rU, rD, rP] = h;
  for (const ph of [-75, -45, -15, 15, 45, 75]) {
    const cx = Math.sin(ph * RAD), cc = Math.cos(ph * RAD);
    for (let k = 0; k < 16; k++) {
      const th = 2 * Math.PI * k / 16, cy = Math.cos(th), cz = Math.sin(th);
      const p = [c[0] + ax * cx, c[1] + cc * cy * (cy >= 0 ? rU : rR), c[2] + cc * cz * (cz >= 0 ? rP : rD)];
      const q = matVec(M, p); pts.push([q[0], q[1]]);
    }
  }
  for (const p of [[c[0] - ax, c[1], c[2]], [c[0] + ax, c[1], c[2]]]) { const q = matVec(M, p); pts.push([q[0], q[1]]); }
  const pc = matVec(M, c);
  return { pts, sphere: { x: pc[0], y: pc[1], z: pc[2], r: (rR + rU + rD + rP) / 4 } };
}

// une palmure : un voile entre deux os, au bord libre en U (le creux tiré vers la paume)
function palmure(A1, A2, fond, creux, M) {
  const pr = p => { const q = matVec(M, p); return [q[0], q[1]]; };
  const pts = [];
  const a = A1[A1.length - 1], b = A2[A2.length - 1];
  const mil = i3(a, b, 0.5), ctrl = i3(mil, fond, creux);
  for (const p of A1) pts.push(pr(p));
  for (let k = 1; k < 10; k++) {
    const t = k / 10, m = 1 - t;
    pts.push(pr([0, 1, 2].map(j => m * m * a[j] + 2 * m * t * ctrl[j] + t * t * b[j])));
  }
  for (const p of A2.slice().reverse()) pts.push(pr(p));
  return pts;
}

// ─── la profondeur d'une pièce en un point de l'écran ────────────────────────────────────────────────────
// devant : la surface la plus proche de l'œil (une sphère par section) ; axe : la profondeur de l'os le plus proche
function profondeur(P, p) {
  const sph = P.spheres || P;
  let best = Infinity, near = Infinity, dmin = Infinity;
  // la paume : la face qu'on voit, un plan
  if (P.plan !== undefined && Math.abs(P.M[2][2]) > 0.35) {
    const M = P.M, z = (P.plan - M[0][2] * p[0] - M[1][2] * p[1]) / M[2][2];
    best = z;
  }
  for (const s of sph) {
    const dx = p[0] - s.x, dy = p[1] - s.y, d2 = dx * dx + dy * dy;
    if (d2 < s.r * s.r) { const z = s.z - Math.sqrt(s.r * s.r - d2); if (z < best) best = z; }
    const d = Math.sqrt(d2) - s.r;
    if (d < dmin) { dmin = d; near = s.z; }
  }
  return { devant: isFinite(best) ? best : near, axe: near };
}
function profondeurAxe(P, p) {
  const sph = P.spheres || P;
  let near = Infinity, dmin = Infinity;
  for (const s of sph) { const d = Math.hypot(p[0] - s.x, p[1] - s.y) - s.r; if (d < dmin) { dmin = d; near = s.z; } }
  return near;
}

// l'objet, dans la vue : sa région (Clipper) et sa profondeur devant
function objetVue(ob, M) {
  if (!ob) return null;
  if (ob.type === 'plan') return { type: 'plan', region: [], devant: () => Infinity };
  const r = (ob.diametre || 32) / 2;
  const C = matVec(M, ob.centre);
  if (ob.type === 'sphere') {
    return { type: 'sphere', C, r, region: [versCL(positif(disque([C[0], C[1]], r, 48)))],
      devant: p => { const d2 = (p[0] - C[0]) ** 2 + (p[1] - C[1]) ** 2; return d2 < r * r ? C[2] - Math.sqrt(r * r - d2) : Infinity; } };
  }
  const A = u3(matVec(M, ob.axe)), Lg = ob.longueur || 1200;
  const e1 = a3(C, m3(A, -Lg / 2)), e2 = a3(C, m3(A, Lg / 2));
  // les deux cercles des bouts, projetés : leur enveloppe est le cylindre vu
  const b1 = u3(Math.abs(A[2]) < 0.9 ? x3(A, [0, 0, 1]) : x3(A, [1, 0, 0])), b2 = x3(A, b1);
  const pts = [];
  for (const E of [e1, e2]) for (let k = 0; k < 36; k++) { const th = 2 * Math.PI * k / 36; const p = a3(E, a3(m3(b1, r * Math.cos(th)), m3(b2, r * Math.sin(th)))); pts.push([p[0], p[1]]); }
  const region = [versCL(positif(enveloppe(pts)))];
  // la surface devant : le rayon de vue (x, y, z) percé par le cylindre
  const devant = p => {
    // P(z) = (p, z) ; w = P − C ; |w − (w·A)A|² = r²
    const w0 = [p[0] - C[0], p[1] - C[1], -C[2]];
    const ez = [0, 0, 1];
    const a0 = s3(w0, m3(A, d3(w0, A))), a1 = s3(ez, m3(A, d3(ez, A)));
    const qa = d3(a1, a1), qb = 2 * d3(a0, a1), qc = d3(a0, a0) - r * r;
    if (qa < 1e-9) return qc <= 0 ? -Infinity : Infinity;          // l'axe vers l'œil : dedans, il est devant tout
    const disc = qb * qb - 4 * qa * qc;
    if (disc < 0) return Infinity;
    const z = (-qb - Math.sqrt(disc)) / (2 * qa);
    // borné à la longueur
    const P = [p[0], p[1], z], s = d3(s3(P, C), A);
    if (Math.abs(s) > Lg / 2) return Infinity;
    return z;
  };
  return { type: 'cylindre', C, A, r, region, devant, bouts: [[e1[0], e1[1]], [e2[0], e2[1]]], raccourci: Math.hypot(A[0], A[1]) };
}

// des points d'échantillon dans une région (Clipper)
function echantillons(region, n = 7) {
  const b = boiteCL(region), out = [];
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
    const p = [b.x0 + (b.x1 - b.x0) * (i + 0.5) / n, b.y0 + (b.y1 - b.y0) * (j + 0.5) / n];
    if (dedans(region, p)) out.push(p);
  }
  return out;
}

// ─── la construction, dans le repère de la vue (mm, avant le miroir, l'angle et l'échelle) ─────────────────
function construire(o) {
  const F = formes();
  let pose = JSON.parse(JSON.stringify(trouverPose(o.pose || 'ouverte')));
  // surcharges
  if (o.doigts) for (const [d, v] of Object.entries(o.doigts)) pose.doigts = Object.assign({}, pose.doigts, { [d]: Object.assign({}, (pose.doigts || {})[d], v) });
  if (o.poignet) pose.poignet = Object.assign({}, pose.poignet, o.poignet);
  if (o.diametre && pose.objet) pose.objet.diametre = o.diametre;
  if (o.objetPose) pose.objet = Object.assign({}, pose.objet, o.objetPose);
  const age = o.age || pose.age || 'homme';
  // le solveur de prise (agent 3)
  const PR = chargerJS('prises');
  const outils = { squelette: (p, oo = {}) => squelette(p, Object.assign({ age, F }, oo)), anatomie: ANATOMIE, formes: F, demiAxes, enrouler };
  if (PR && typeof PR.resoudre === 'function') {
    try { const r = PR.resoudre(pose, outils); if (r) pose = r; } catch (e) { if (process.env.MAINS_DEBUG) console.error('prises.js :', e.message); }
  }
  const sq0 = squelette(pose, { age, F });
  if (pose.objet) pose.objet = objetParDefaut(pose.objet, sq0.an);
  const sansAngles = pose.objet && pose.objet.type !== 'plan' && pose.objet.type !== 'sphere' &&
    (pose.enrouler || DOIGTS.every(d => !pose.doigts || !pose.doigts[d] || pose.doigts[d].mcp === undefined));
  if (sansAngles) pose = enrouler(pose, pose.objet, { age, F });
  // l'avant-bras dirigé vers un point : le poignet suit, dans le plan de la vue
  const sq = squelette(pose, { age, F });
  const kW = sq.age.kW;
  const M = matriceVue(o.vue || 'dos', o.rotation);
  const proj = p => matVec(M, p);
  const p2 = p => { const q = proj(p); return [q[0], q[1]]; };

  // ── les pièces ──
  const pieces = [];
  const piece = (id, groupe, polys, spheres, rang = 0) => pieces.push({ id, groupe, rang, polys, spheres });
  // les doigts
  for (const d of DOIGTS) {
    for (let k = 1; k <= 3; k++) {
      const id = `${d}.p${k}`, S = sq.segments[id];
      const prec = k === 1 ? sq.segments[d + '.meta'] : sq.segments[`${d}.p${k - 1}`];
      // la jointure : du cadre précédent au cadre de ce segment, autour de l'axe de flexion
      const axe = u3(x3(S.n, S.u));
      const ang = k === 1 ? Math.max(0, S.flex) : S.flex;
      const f = formeSegment(S, id, F, kW, M, { bout: k === 3, debut: Math.abs(ang) > 4 ? { axe, angle: ang } : null });
      piece(id, d, f.polys, f.spheres, k);
      void prec;
    }
  }
  // le pouce
  for (const k of [1, 2]) {
    const id = `pouce.p${k}`, S = sq.segments[id];
    const axe = u3(x3(S.n, S.u));
    const f = formeSegment(S, id, F, kW, M, { bout: k === 2, debut: Math.abs(S.flex) > 4 ? { axe, angle: S.flex } : null });
    piece(id, 'pouce', f.polys, f.spheres, k);
  }
  // la paume : l'enveloppe des bosses, des têtes et des fûts ; le métacarpien du pouce (le thénar) ; les palmures
  {
    const pts = [], sph = [];
    const kk = sq.age;
    const scB = b => ({ c: [b.c[0] * kk.kL, b.c[1] * kW, b.c[2] * kW], h: [b.h[0] * kk.kL, ...b.h.slice(1).map(v => v * kW)] });
    for (const b0 of F.paume) { const b = scB(b0); const r = bosse(b.c, b.h, M); pts.push(...r.pts); sph.push(r.sphere); }
    for (const d of DOIGTS) {
      const S = sq.segments[d + '.meta'];
      const h = FORMES.tete[d].map((v, i) => v * (i ? kW : kk.kL));
      const r = bosse(S.a, h, M); pts.push(...r.pts); sph.push(r.sphere);
      for (const t of [0.35, 0.65]) { const rr = bosse(i3(S.de, S.a, t), FORMES.fut.map((v, i) => v * (i ? kW : kk.kL)), M); pts.push(...rr.pts); sph.push(rr.sphere); }
    }
    const polys = [enveloppe(pts)];
    // le métacarpien du pouce
    const T = sq.segments['pouce.meta'];
    const ft = formeSegment(T, 'pouce.meta', F, kW, M, {});
    polys.push(...ft.polys); sph.push(...ft.spheres);
    // les palmures : entre les doigts (au tiers de la première phalange), entre le pouce et l'index
    const cote = (id, t, s) => { const S = sq.segments[id], w = demiAxes(F, id, t, kW); return a3(a3(S.de, m3(S.u, S.L * t)), m3(S.r, s * (s > 0 ? w[0] : w[1]) * 0.96)); };
    for (let i = 0; i < 3; i++) {
      const d1 = DOIGTS[i], d2 = DOIGTS[i + 1];
      const S1 = sq.segments[d1 + '.p1'], S2 = sq.segments[d2 + '.p1'];
      // le fond de la palmure : au tiers de la phalange, ou plus loin si les doigts se touchent encore
      let tSep = 0;
      for (let k = 0; k <= 20; k++) {
        const t = k / 20, a = a3(S1.de, m3(S1.u, S1.L * t)), b = a3(S2.de, m3(S2.u, S2.L * t));
        const w1 = demiAxes(F, d1 + '.p1', t, kW)[1], w2 = demiAxes(F, d2 + '.p1', t, kW)[0];
        if (l3(s3(a, b)) < w1 + w2 - 0.2) tSep = t; else break;
      }
      const tw = Math.min(0.62, Math.max(0.34, tSep + 0.1));
      const A1 = [S1.de, cote(d1 + '.p1', tw * 0.5, -1), cote(d1 + '.p1', tw, -1)];
      const A2 = [S2.de, cote(d2 + '.p1', tw * 0.5, 1), cote(d2 + '.p1', tw, 1)];
      polys.push(palmure(A1, A2, i3(S1.de, S2.de, 0.5), 0.3, M));
    }
    {
      const P1 = sq.segments['pouce.p1'], I1 = sq.segments['index.p1'], IM = sq.segments['index.meta'];
      const A1 = [T.de, i3(T.de, T.a, 0.5), T.a, cote('pouce.p1', 0.15, -1), cote('pouce.p1', 0.36, -1)];
      const A2 = [i3(IM.de, IM.a, 0.3), i3(IM.de, IM.a, 0.65), cote('index.p1', 0.0, 1), cote('index.p1', 0.16, 1)];
      polys.push(palmure(A1, A2, i3(T.de, IM.a, 0.5), 0.2, M));
      void P1; void I1;
    }
    piece('paume', 'base', polys, sph, 0);
    pieces[pieces.length - 1].plan = M[2][2] > 0 ? -13 * kW : 15 * kW;
  }
  // l'avant-bras
  let coupe = null;
  if (o.avantbras !== false) {
    const ab = o.avantbras || {};
    const S = sq.segments.avantbras;
    let longueurAB = ab.longueur !== undefined ? ab.longueur : (ab.vers ? null : 70);
    let SA = S;
    if (ab.versLocal) {
      // une direction imposée dans le plan de la vue (repère de la vue, mm) : l'avant-bras s'y couche
      const v2 = uni(ab.versLocal);
      const Mi = [[M[0][0], M[1][0], M[2][0]], [M[0][1], M[1][1], M[2][1]], [M[0][2], M[1][2], M[2][2]]];
      const dir = u3(matVec(Mi, [v2[0], v2[1], 0]));
      // la normale dorsale : celle de la main, transportée
      const nA = orth(S.n, dir);
      SA = cadre(m3(dir, S.L), [0, 0, 0], m3(dir, -1), nA, S.L, 0);
      sq.points.coude = m3(dir, S.L);
      if (longueurAB === null) longueurAB = ab.versDist;
    }
    if (longueurAB === null || longueurAB === undefined) longueurAB = 70;
    const tMax = Math.min(1, longueurAB / SA.L);
    // l'avant-bras va du coude au poignet : on le dessine du poignet en remontant, donc on retourne le segment
    const Sinv = cadre([0, 0, 0], SA.de, m3(SA.u, -1), SA.n, SA.L, 0);
    Sinv.r = SA.r;   // le côté radial reste le même
    const Fab = { dos: { 'avantbras': F.dos.avantbras }, profil: { 'avantbras': F.profil.avantbras } };
    const f = formeSegment(Sinv, 'avantbras', Fab, kW, M, { pas: 8, tMax });
    piece('avantbras', 'base', f.polys, f.spheres, -1);
    // la coupe : les deux coins de la dernière section, vue
    const cFin = a3([0, 0, 0], m3(Sinv.u, SA.L * tMax));
    const w = demiAxes(Fab, 'avantbras', tMax, kW);
    const sec = section(cFin, Sinv, w).map(p2);
    // les deux points extrêmes perpendiculairement à l'axe vu
    const ax2 = uni(sub(p2(cFin), p2([0, 0, 0]))), nrm = [-ax2[1], ax2[0]];
    let iMin = 0, iMax = 0;
    sec.forEach((p, i) => { if (dot(p, nrm) < dot(sec[iMin], nrm)) iMin = i; if (dot(p, nrm) > dot(sec[iMax], nrm)) iMax = i; });
    coupe = { a: sec[iMin], b: sec[iMax], c: p2(cFin), ax: ax2, region: null, plein: tMax >= 1 };
  }

  // ── les régions : chaque pièce unifiée, ses plis arrondis ──
  for (const P of pieces) {
    let u = union(P.polys);
    if (P.id === 'paume') u = ferme(u, 5);
    P.region = lisserCL(u, 0.8, 5);
    P.boite = boiteCL(u);
  }
  // la coupe de l'avant-bras : tout ce qui dépasse la dernière section est retranché
  if (coupe) {
    const G = 600, A = coupe.a, B = coupe.b, ax = coupe.ax;
    const dem = [add(A, mul(sub(A, B), 2)), add(B, mul(sub(B, A), 2))];
    coupe.region = [versCL(positif([dem[0], dem[1], add(dem[1], mul(ax, G)), add(dem[0], mul(ax, G))]))];
  }

  const ob = pose.objet ? objetVue(pose.objet, M) : null;
  for (const P of pieces) P.M = M;
  return { pose, sq, M, pieces, coupe, ob, F };
}

// ─── les relations entre pièces : qui est devant qui, qui se fond dans qui ────────────────────────────────
function relations(pieces, vue) {
  const n = pieces.length, rel = [];
  const fondu = (A, B) => A.groupe === B.groupe || A.groupe === 'base' || B.groupe === 'base';
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
    const A = pieces[i], B = pieces[j];
    if (!seCroisent(A.boite, B.boite)) continue;
    let I = inter(A.region, B.region);
    if ((!I.length || Math.abs(aireCL(I)) < 0.5) && !fondu(A, B)) I = inter(decale(A.region, 0.35), decale(B.region, 0.35));
    if (!I.length || Math.abs(aireCL(I)) < 0.5) continue;
    const ech = echantillons(I, 6);
    if (!ech.length) ech.push(deCL(I[0])[0]);
    let s = 0;
    for (const p of ech) s += profondeur(A, p).devant - profondeur(B, p).devant;
    s /= ech.length;
    rel.push({ A: i, B: j, fondu: fondu(A, B), avant: s, I });
  }
  return rel;
}
// devant(i, j) : la pièce i passe-t-elle devant la pièce j ?
const PRIORITE = { dos: ['majeur', 'annulaire', 'index', 'auriculaire', 'pouce'], paume: ['pouce', 'index', 'auriculaire', 'annulaire', 'majeur'] };

// ─── la construction du dessin (repère de la vue, mm) ─────────────────────────────────────────────────────
function dessiner(o) {
  const _t = [Date.now()]; const T_ = n => { if (process.env.MAINS_T) { const t = Date.now(); console.error(n, t - _t[_t.length - 1]); _t.push(t); } };
  const C = construire(o); T_('construire');
  const { pieces, ob, coupe, pose } = C;
  const vue = o.vue || 'dos';
  const E = 0.55;                                   // un trait intérieur s'arrête avant le contour
  const SEUIL = 2.6;                                // l'écart de profondeur qui fait un trait entre deux pièces fondues
  // la coupe de l'avant-bras retranche ce qui dépasse
  if (coupe && coupe.region) for (const P of pieces) { P.region = moins(P.region, coupe.region); P.boite = boiteCL(P.region); }
  const rel = relations(pieces, vue); T_('relations');
  const ordre = new Map();        // 'i,j' → true si i devant j
  const prio = PRIORITE[vue] || PRIORITE.dos;
  for (const R of rel) {
    let iDevant = R.avant < 0;
    if (!R.fondu && Math.abs(R.avant) < 0.6) {
      const a = prio.indexOf(pieces[R.A].groupe), b = prio.indexOf(pieces[R.B].groupe);
      iDevant = a <= b;
    }
    R.iDevant = iDevant;
    ordre.set(R.A + ',' + R.B, iDevant); ordre.set(R.B + ',' + R.A, !iDevant);
  }

  // ── l'objet : chaque pièce qui le chevauche est devant ou derrière ──
  const devantObjet = new Set();
  if (ob && ob.region.length) {
    const imposes = pose.devant && pose.devant[vue];
    pieces.forEach((P, i) => {
      const I = inter(P.region, ob.region);
      P.surObjet = I.length && Math.abs(aireCL(I)) > 1;
      P.partObjet = P.surObjet ? Math.abs(aireCL(I)) / Math.max(1, Math.abs(aireCL(P.region))) : 0;
      if (!P.surObjet) return;
      let dev;
      if (imposes) dev = imposes.includes(P.id) || imposes.includes(P.groupe);
      else {
        const ech = echantillons(I, 7);
        let nDev = 0, nTot = 0;
        for (const p of ech) { const zo = ob.devant(p); if (!isFinite(zo)) continue; nTot++; if (profondeur(P, p).devant < zo) nDev++; }
        dev = nTot ? nDev / nTot > 0.5 : true;
      }
      if (dev) devantObjet.add(i);
    });
  }
  // ── les teintes : un doigt derrière l'objet (qu'il chevauche), ou caché aux deux tiers par un autre doigt ──
  pieces.forEach((P, i) => {
    P.gris = !!o.loin;
    if (P.groupe === 'base') return;
    if (P.surObjet && !devantObjet.has(i) && P.partObjet > 0.35) P.gris = true;
    const loinImp = pose.loin && pose.loin[vue];
    if (loinImp && (loinImp.includes(P.id) || loinImp.includes(P.groupe))) P.gris = true;
  });
  // cachée par d'autres doigts (non fondus) aux deux tiers
  pieces.forEach((P, i) => {
    if (P.groupe === 'base' || P.gris) return;
    const devants = rel.filter(R => !R.fondu && ((R.A === i && !R.iDevant) || (R.B === i && R.iDevant))).map(R => pieces[R.A === i ? R.B : R.A].region);
    if (!devants.length) return;
    const cache = inter(P.region, unionCL(devants));
    if (Math.abs(aireCL(cache)) > 0.66 * Math.abs(aireCL(P.region))) P.gris = true;
  });

  T_('objet+teintes');
  // ── l'ordre de peinture : tri topologique sur « devant » ──
  const n = pieces.length;
  const avant = Array.from({ length: n }, () => []);      // avant[j] : les pièces à peindre avant j (derrière j)
  for (const R of rel) { if (R.iDevant) avant[R.A].push(R.B); else avant[R.B].push(R.A); }
  const vu = new Uint8Array(n), peint = [];
  const moy = i => pieces[i].spheres.reduce((s, q) => s + q.z, 0) / pieces[i].spheres.length;
  const visite = (i, pile = new Set()) => {
    if (vu[i]) return; if (pile.has(i)) return; pile.add(i);
    for (const j of avant[i].slice().sort((a, b) => moy(b) - moy(a))) visite(j, pile);
    vu[i] = 1; peint.push(i);
  };
  for (const i of [...Array(n).keys()].sort((a, b) => moy(b) - moy(a))) visite(i);

  // ── la silhouette : l'union lissée de toutes les pièces ──
  const tout = unionCL(pieces.map(P => P.region));
  // le poignet : un grand arrondi entre l'avant-bras et la main, au voisinage du poignet seulement
  const kL = C.sq.age.kL;
  const zoneP = [versCL(positif(disque([0, 0], 30 * kL, 48)))];
  const poignetRond = inter(ferme(inter(tout, [versCL(positif(disque([0, 0], 70 * kL, 48)))]), 16 * kL), zoneP);
  let U = lisserCL(ferme(unionCL([tout, poignetRond]), 1.2), 0.7, 5);
  if (coupe && coupe.region) U = moins(U, coupe.region);
  T_('U');
  // ── les traits intérieurs : le bord d'une pièce qui passe devant une autre ──
  const traits = pieces.map(() => []);                   // par pièce : des polylignes (mm)
  for (const P of pieces) P.retrait = decale(P.region, -E);
  // chaque doigt d'une pièce : son contour sans les coupes entre phalanges
  const groupes = new Map();
  for (const P of pieces) groupes.set(P.groupe, (groupes.get(P.groupe) || []).concat([P.region]));
  for (const [g, l] of groupes) groupes.set(g, unionCL(l));
  const Uin = decale(U, -E);
  const dansBoite = (P, p) => p[0] >= P.boite.x0 && p[0] <= P.boite.x1 && p[1] >= P.boite.y0 && p[1] <= P.boite.y1;
  const relDe = new Map(); for (const R of rel) { relDe.set(R.A + ',' + R.B, R); relDe.set(R.B + ',' + R.A, R); }
  for (let i = 0; i < n; i++) {
    const A = pieces[i];
    let ls = [];
    for (let j = 0; j < n; j++) {
      if (i === j) continue;
      const R = relDe.get(i + ',' + j); if (!R) continue;
      const B = pieces[j];
      if (!R.fondu) {
        // deux doigts : le bord de celui de devant, là où il touche ou recouvre l'autre (à 0,6 près)
        if (ordre.get(i + ',' + j)) {
          const G = groupes.get(A.groupe);
          ls.push(...lignesDans(bordsDans(G, B.gonfle || (B.gonfle = decale(B.region, 0.6))), A.gonfle3 || (A.gonfle3 = decale(A.region, 0.3))));
        }
        continue;
      }
      const cand = bordsDans(A.region, B.retrait);
      if (!cand.length) continue;
      // fondues : seulement là où A passe nettement devant B
      for (const l of densifier(cand, 1.2)) {
        let run = [];
        for (const p of l) {
          const ok = profondeur(B, p).devant - profondeurAxe(A, p) > SEUIL;
          if (ok) run.push(p); else { if (run.length > 1) ls.push(run); run = []; }
        }
        if (run.length > 1) ls.push(run);
      }
    }
    // caché par une pièce devant elle
    const caches = [];
    for (let j = 0; j < n; j++) {
      if (i === j) continue;
      const R = relDe.get(i + ',' + j); if (!R) continue;
      if (!R.fondu && ordre.get(j + ',' + i)) caches.push(...pieces[j].region);
    }
    if (caches.length) ls = lignesHors(ls, unionCL([caches]));
    // fondues devant : point par point
    const fondDev = [];
    for (let j = 0; j < n; j++) { const R = relDe.get(i + ',' + j); if (R && R.fondu && i !== j) fondDev.push(j); }
    if (fondDev.length) {
      const out = [];
      for (const l of densifier(ls, 1.2)) {
        let run = [];
        for (const p of l) {
          const za = profondeurAxe(A, p);
          // une phalange voisine du même doigt ne cache que si son os passe devant (le doigt replié sur lui-même)
          const cache = fondDev.some(j => dansBoite(pieces[j], p) &&
            (pieces[j].groupe === A.groupe ? profondeurAxe(pieces[j], p) < za - 2 * SEUIL : profondeur(pieces[j], p).devant < za - SEUIL) && dedans(pieces[j].region, p));
          if (!cache) run.push(p); else { if (run.length > 1) out.push(run); run = []; }
        }
        if (run.length > 1) out.push(run);
      }
      ls = out;
    }
    // ni sur la silhouette, ni hors de la main
    ls = lignesDans(ls, Uin);
    traits[i] = recoller(ls).filter(l => longueur(l) > 2.5);
  }
  // une ligne courte qui ne part pas du contour est une saleté
  const rive = decale(U, -(E + 1.6));
  for (let i = 0; i < n; i++) traits[i] = traits[i].filter(l => longueur(l) > 9 || !dedans(rive, l[0]) || !dedans(rive, l[l.length - 1]));

  T_('traits');
  // l'objet : le blanc sous lui dans la main, et les pièces de devant à repeindre là où il passe
  let patch = null;
  if (ob && ob.region.length) {
    patch = { dansMain: inter(ob.region, U), fond: [], bord: [], traits: [] };
    const dev = [...devantObjet];
    if (dev.length) {
      const regDev = unionCL(dev.map(i => pieces[i].region));
      const Ud = regDev;
      // la marge couvre le trait de l'objet (2,4 de vue au plus, la moitié déborde de sa région)
      const ext = decale(ob.region, 1.6);
      patch.fond = inter(ext, decale(regDev, 0.15));
      patch.bord = lignesDans(contourDe(Ud), ext);
      const tDev = dev.flatMap(i => lignesDans(traits[i], decale(regDev, -0.2)));
      patch.traits = lignesDans(tDev, ext);
    }
  }
  T_('patch');
  return { C, pieces, U, traits, peint, devantObjet, rel, ordre, ob, coupe, vue, patch };
}
// des polylignes aux points rapprochés (pour les tests point par point)
function densifier(ls, pas) {
  return ls.map(l => {
    const out = [l[0]];
    for (let i = 1; i < l.length; i++) {
      const a = l[i - 1], b = l[i], d = lon(sub(b, a)), k = Math.max(1, Math.ceil(d / pas));
      for (let j = 1; j <= k; j++) out.push(add(a, mul(sub(b, a), j / k)));
    }
    return out;
  });
}

// ─── le rendu ────────────────────────────────────────────────────────────────────────────────────────────
const CACHE = new Map();
let N_CLIP = 0;
function mainSimple(o = {}) {
  const vue = o.vue || 'dos';
  const s = o.echelle || 1;
  // l'avant-bras vers un point de la vue : la direction, dans le repère local de la vue (avant le miroir,
  // l'angle et l'échelle) — calculée après le placement, d'où deux passes si ancre ≠ poignet
  const cleBase = { pose: o.pose, vue, rotation: o.rotation, doigts: o.doigts, poignet: o.poignet, diametre: o.diametre,
    age: o.age, loin: !!o.loin, objetPose: o.objetPose };
  const ab = o.avantbras === false ? false : Object.assign({}, o.avantbras || {});
  const m = o.cote === 'gauche' ? -1 : 1;
  const ang = o.angle || 0;
  // local (vue, mm) → vue : miroir en y, rotation, échelle, translation
  const Tloc = (p, X, Y) => { const q = tourne([p[0], m * p[1]], ang); return [X + s * q[0], Y + s * q[1]]; };
  const Tinv = (P, X, Y) => { const q = tourne([(P[0] - X) / s, (P[1] - Y) / s], -ang); return [q[0], m * q[1]]; };
  // première passe : la géométrie (pour l'ancre)
  const obtenir = abOpt => {
    const cle = JSON.stringify([cleBase, abOpt]);
    let R = CACHE.get(cle);
    if (!R) { R = dessiner(Object.assign({}, o, { avantbras: abOpt })); CACHE.set(cle, R); if (CACHE.size > 400) CACHE.delete(CACHE.keys().next().value); }
    return R;
  };
  const abBase = ab === false ? false : { longueur: ab.longueur, coupe: ab.coupe };
  let R = obtenir(ab && ab.vers ? false : abBase);
  const ancreLoc = ancreDe(R, o.ancre || 'prise');
  const X = (o.x || 0) - 0, Y = (o.y || 0) - 0;
  // (x, y) est l'ancre : on cherche l'origine qui l'y amène
  const a0 = Tloc(ancreLoc, 0, 0);
  const OX = X - a0[0], OY = Y - a0[1];
  if (ab && (ab.vers || ab.bord)) {
    const abO = { longueur: ab.longueur, coupe: ab.coupe };
    let cible = ab.vers;
    if (!cible && ab.bord) cible = null;
    if (cible) {
      const loc = Tinv(cible, OX, OY);
      const pw = R.C.sq.points.poignet;
      const v = sub(loc, [pw[0], pw[1]]);
      abO.versLocal = [Math.round(v[0] * 100) / 100, Math.round(v[1] * 100) / 100];
      abO.versDist = Math.round(lon(v) * 10) / 10;
    }
    if (ab.bord) abO.longueur = ab.longueur !== undefined ? ab.longueur : Math.max(abO.versDist || 0, 400);
    R = obtenir(abO);
  }
  return rendre(R, o, { Tloc: p => Tloc(p, OX, OY), s, m, ang, ab });
}

function ancreDe(R, ancre) {
  const { C } = R, M = C.M;
  const p2 = p => { const q = matVec(M, p); return [q[0], q[1]]; };
  if (ancre === 'poignet') return [0, 0];
  if (ancre === 'bout') return p2(C.sq.extremites.index);
  if (ancre === 'pouce') return p2(C.sq.extremites.pouce);
  if (ancre === 'prise' && C.pose.objet && C.pose.objet.type !== 'plan') return p2(C.pose.objet.centre);
  // le creux de la paume
  return p2(i3(C.sq.points['majeur.mcp'], [30, 2, 4], 0.45));
}

function rendre(R, o, { Tloc, s, m, ang, ab }) {
  const { C, pieces, U, traits, peint, devantObjet, ob, coupe, vue } = R;
  const tr = o.trait === 'fort' ? { sil: 1.9, int: 0.9 } : (typeof o.trait === 'number' ? { sil: o.trait, int: Math.max(0.5, o.trait * 0.47) } : { sil: 1.5, int: 0.7 });
  const f1 = v => (Math.round(v * 100) / 100).toString();
  const tol = 0.05 / s;
  const dF = paths => paths.map(P => { const q = allege(deCL(P), tol, true).map(Tloc); return 'M' + q.map(p => `${f1(p[0])} ${f1(p[1])}`).join(' L') + ' Z'; }).join(' ');
  const dO = ls => ls.filter(l => l.length > 1).map(l => { const q = allege(l, tol).map(Tloc); return 'M' + q.map(p => `${f1(p[0])} ${f1(p[1])}`).join(' L'); }).join(' ');
  const plein = (paths, coul) => paths.length ? `<path d="${dF(paths)}" fill="${coul}" fill-rule="nonzero" stroke="none"/>` : '';
  const ligne = (ls, ep) => { const d = dO(ls); return d ? `<path d="${d}" fill="none" stroke="${NOIR}" stroke-width="${ep}" stroke-linecap="round" stroke-linejoin="round"/>` : ''; };
  const loin = !!o.loin;
  const FOND = loin ? GRIS : BLANC;

  // la silhouette, sans la coupe de l'avant-bras (ouverte) ni ce qui file au bord
  let silh = contourDe(U);
  if (coupe && coupe.region && !coupe.plein && (!ab || ab.coupe !== 'franche')) silh = lignesHors(silh, decale(coupe.region, 0.4));
  const coupeTrait = coupe && coupe.region && ab && ab.coupe === 'franche' ? lignesDans(contourDe(U), decale(coupe.region, 0.4)) : [];

  const out = [];
  // a. la main entière
  out.push(plein(U, FOND));
  for (const i of peint) out.push(plein(pieces[i].region, loin || pieces[i].gris ? GRIS : BLANC));
  // les fonds blancs sous les pièces blanches peintes après une grise qui les recouvrirait : l'ordre suffit
  out.push(ligne(silh, tr.sil));
  out.push(ligne(traits.flat(), tr.int));
  out.push(ligne(coupeTrait, tr.int));
  // b, c, d. l'objet
  const geo = geometrie(R, Tloc, s, m, ang);
  if (o.objet !== undefined && o.objet !== null) {
    const g = Object.assign({}, geo.prise, { prise: geo.prise, poignet: geo.poignet, bout: geo.bout, pouce: geo.pouce, echelle: s, vue, geo });
    const svgObjet = typeof o.objet === 'function' ? o.objet(g) : String(o.objet);
    const pa = R.patch;
    if (pa) {
      if (o.masque !== false && pa.dansMain.length) out.push(plein(pa.dansMain, loin ? GRIS : BLANC));
      out.push(svgObjet);
      // les pièces devant l'objet, repeintes là où il passe : leur blanc, leur bord contre l'objet, leurs traits
      if (pa.fond.length) out.push(plein(pa.fond, loin ? GRIS : BLANC), ligne(pa.bord, tr.sil), ligne(pa.traits, tr.int));
    } else out.push(svgObjet);
  }
  if (o._debug) { const cols = ['#e33', '#3a3', '#33e', '#e9e', '#e93', '#3cc']; pieces.forEach((P, i) => out.push(`<path d="${dF(P.region)}" fill="none" stroke="${cols[i % 6]}" stroke-width="0.6" stroke-dasharray="2 1.5"/>`)); }
  let svg = out.filter(Boolean).join('\n');
  // l'avant-bras qui file au bord de la vue : coupé net par la boîte
  if (ab && ab.bord) {
    const b = ab.bord, x0 = b.x0 !== undefined ? b.x0 : 0, y0 = b.y0 !== undefined ? b.y0 : 0;
    const x1 = b.x1 !== undefined ? b.x1 : x0 + b.l, y1 = b.y1 !== undefined ? b.y1 : y0 + b.h;
    const id = `mainS-${++N_CLIP}`;
    svg = `<clipPath id="${id}"><rect x="${f1(x0)}" y="${f1(y0)}" width="${f1(x1 - x0)}" height="${f1(y1 - y0)}"/></clipPath>\n<g clip-path="url(#${id})">\n${svg}\n</g>`;
  }
  svg = `<g data-main="${typeof o.pose === 'string' ? o.pose : 'pose'}-${vue}">\n${svg}\n</g>`;
  return Object.assign({ svg, toString() { return svg; } }, geo);
}

function geometrie(R, Tloc, s, m, ang) {
  const { C, U, ob, coupe, devantObjet, pieces } = R;
  const M = C.M;
  const p2 = p => { const q = matVec(M, p); return Tloc([q[0], q[1]]); };
  const r1 = v => Math.round(v * 100) / 100;
  const pt = p => [r1(p[0]), r1(p[1])];
  const geo = { vue: R.vue, echelle: s };
  const art = {}; for (const [k, v] of Object.entries(C.sq.points)) art[k] = pt(p2(v));
  geo.articulations = art;
  geo.poignet = art.poignet; geo.coude = art.coude;
  geo.bout = pt(p2(C.sq.extremites.index));
  geo.pouce = pt(p2(C.sq.extremites.pouce));
  geo.doigts = {}; for (const [k, v] of Object.entries(C.sq.extremites)) geo.doigts[k] = pt(p2(v));
  geo.coupe = coupe && !coupe.plein ? [pt(Tloc(coupe.a)), pt(Tloc(coupe.b))] : null;
  // la prise
  const angEcran = v => { const q = tourne([v[0], m * v[1]], ang); return Math.atan2(q[1], q[0]) / RAD; };
  if (C.pose.objet && C.pose.objet.type !== 'plan' && ob) {
    const c = p2(C.pose.objet.centre);
    const A = ob.A || [1, 0, 0];
    const a = angEcran([A[0], A[1]]);
    geo.prise = { x: r1(c[0]), y: r1(c[1]), angle: r1(a), r: r1((C.pose.objet.diametre || 32) / 2 * s), axe: [r1(Math.cos(a * RAD)), r1(Math.sin(a * RAD))],
      raccourci: r1(ob.raccourci !== undefined ? ob.raccourci : 1), bouts: ob.bouts ? ob.bouts.map(b => pt(Tloc(b))) : null, type: C.pose.objet.type };
  } else {
    const c = ancreDe(R, 'paume');
    const q = Tloc(c);
    geo.prise = { x: r1(q[0]), y: r1(q[1]), angle: r1(angEcran([1, 0])), r: 0, axe: null, raccourci: 1, bouts: null, type: C.pose.objet ? C.pose.objet.type : null };
  }
  // le contact : les pulpes et la paume au ras de l'objet
  geo.contact = [];
  if (C.pose.objet) {
    const O = C.pose.objet, r = (O.diametre || 32) / 2;
    const dist = p => {
      if (O.type === 'plan') return Math.abs(d3(s3(p, O.centre), u3(O.axe)));
      if (O.type === 'sphere') return Math.abs(l3(s3(p, O.centre)) - r);
      const A = u3(O.axe), w = s3(p, O.centre); return Math.abs(l3(s3(w, m3(A, d3(w, A)))) - r);
    };
    for (const [k, S] of Object.entries(C.sq.segments)) {
      if (k === 'avantbras' || k.endsWith('.meta')) continue;
      const w = demiAxes(C.F, k, 0.6, C.sq.age.kW);
      const pulpe = a3(a3(S.de, m3(S.u, S.L * 0.6)), m3(S.n, -w[3]));
      if (dist(pulpe) < 3.5) geo.contact.push(pt(p2(pulpe)));
    }
  }
  // la boîte
  const b = boiteCL(U);
  const coins = [[b.x0, b.y0], [b.x1, b.y0], [b.x1, b.y1], [b.x0, b.y1]].map(Tloc);
  geo.boite = { x0: r1(Math.min(...coins.map(c => c[0]))), y0: r1(Math.min(...coins.map(c => c[1]))), x1: r1(Math.max(...coins.map(c => c[0]))), y1: r1(Math.max(...coins.map(c => c[1]))) };
  geo.devant = [...devantObjet].map(i => pieces[i].id);
  geo.gris = pieces.filter(P => P.gris).map(P => P.id);
  return geo;
}

module.exports = {
  mainSimple,
  pour: () => mainSimple,
  squelette: (pose, o = {}) => squelette(typeof pose === 'string' ? trouverPose(pose) : pose, o),
  ANATOMIE, FORMES, POSES, VUES, DOIGTS,
  demiAxes, enrouler, formes,
  _interne: { construire, dessiner, union, unionCL, decale, ferme, ouvre, moins, inter, bordsDans, lignesDans, allege, versCL, deCL, SC, enveloppe, section, formeSegment, bosse, objetVue, matriceVue, profondeur, CACHE },
};
