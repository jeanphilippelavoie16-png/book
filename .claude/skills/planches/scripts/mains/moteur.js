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
//     avantbras { longueur : en mm (défaut 85 × l'âge : un gros plan coupe l'avant-bras court, JP : « au pire, le
//               couper ») · 'entier' (jusqu'au coude, qui finit arrondi : .coude pour enchaîner le bras) · 'bord'
//               (jusqu'à sortir de la boîte bord) ; vers: [x, y] (la direction : un point de la vue vers lequel il
//               part ; le poignet y tourne en courbe sur 45 mm) ; bord: { x0, y0, x1, y1 } ou { l, h } (la boîte
//               de la vue : ce qui en sort est coupé net, par clipPath) ; coupe: 'ouverte' (défaut : les deux
//               bords s'arrêtent ; une main loin, grise, la ferme d'un trait) · 'franche' (un trait de coupe, 0,7) ;
//               fin: [[x0, y0], [x1, y1]] (une droite de la vue où le membre s'arrête, quelle que soit sa longueur :
//               deux mains l'une sur l'autre coupées à la même droite, ouverte pour les deux, même la grise) ;
//               bras: { vers: [x, y] (un point de la vue vers lequel le bras part du coude) ou pli: degrés (le coude
//               plié à l'écran, + : sens horaire, comme angle), longueur: mm · 'entier' (jusqu'à l'épaule, 325 × l'âge)
//               · 'bord' (défaut avec bord : sortir de la boîte, coupé net) ; défaut : la moitié du bras } : le bras
//               enchaîné au coude dans le même contour (l'avant-bras est alors entier) ; le coude plié arrondi dehors,
//               net dedans, replié de plus de 100° un trait de pli ; 150° au plus (au-delà, la butée et un
//               avertissement). .coude, .articulations.epaule, .coupe (au bout du bras) suivent }
//               avantbras: false : pas d'avant-bras (le poignet coupé)
//     trait     'normal' (1,5 / 0,7) · 'fort' (1,9 / 0,9) · ou un nombre (la silhouette)
//     age       'homme' (défaut) · 'femme' · 'enfant6' · 'enfant4' : mains/proportions.json (agent 4)
//     loin      true : toute la main en gris (la main du dessous, la deuxième main derrière la première)
//     gant      true ou { epaisseur (mm, défaut 1,8 : chaque demi-largeur gonflée d'autant), manchette (mm de
//               manchette sur l'avant-bras, défaut 45 ; false : sans) } : la main gantée
//     masque    false : ne pas peindre le blanc de l'objet sous lui (voir « Les couches »)
//     presentation  false : sans la petite rotation de présentation que profil.js donne à certaines poses de profil
//               (le poing, la pointe : 26° pour montrer les doigts en marches)
//
// Le résultat se colle comme une chaîne SVG et porte la géométrie, en unités de vue :
//   .prise     { x, y, angle, r, axe: [ux, uy], raccourci, bouts, coupe }  l'axe de l'objet tenu : son point au
//              creux de la main, l'angle de l'axe à l'écran (degrés), le rayon vu, raccourci (1 : l'axe dans le
//              plan de la vue ; 0 : vu par le bout), bouts (les deux bouts de l'objet, vus). De profil, l'objet
//              qui vient vers l'œil est coupé au ras de la main (profil.js, objetDeVue) : coupe = { x, y, rx, ry,
//              angle } est sa face coupée, à hachurer, et bouts[0] le bout coupé. Sans objet : le creux de la
//              paume, r = 0.
//   .poignet   [x, y]   .coude [x, y] (le coude : l'avant-bras entier, même s'il n'est pas dessiné)
//   .coupe     [[x, y], [x, y]] les deux coins de la coupe de l'avant-bras (du bras, avec bras ; sur la droite
//              de fin, avec fin ; null s'il est entier)
//   .bout      [x, y]  le bout de l'index        .pouce [x, y]  le bout du pouce
//   .doigts    { index: [x, y], majeur, annulaire, auriculaire, pouce }  le bout de chaque doigt
//   .articulations  { 'index.mcp': [x, y], … }   tous les points du squelette, projetés
//   .contact   [[x, y], …]  les points où la main touche l'objet ou la surface (pulpes, paume)
//   .boite     { x0, y0, x1, y1 }   .echelle   .vue   .devant (les pièces peintes devant l'objet)   .gris
//   .couches   { main, masque, devant } : les couches en SVG, pour peindre l'objet soi-même entre elles (deux
//              mains sur un même manche : mainA.main, mainB.main, les masques, l'objet, mainA.devant,
//              mainB.devant). Elles existent dès que la pose a un objet, même sans l'option objet.
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
//   'coude'      (au bout de l'avant-bras entier)   'epaule' (avec avantbras.bras : au bout du bras entier)
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
//   demi-axes, dans le repère de la main : [le long de x, radial, ulnaire, dorsal, palmaire]), des têtes des
//   métacarpiens (FORMES.tete[doigt], centrées au MCP) et de leurs fûts (FORMES.fut, ou fut[doigt], à 35 et 65 %
//   du métacarpien).
//
// profil.js (agent 2) exporte { profil: { id: [[t, dD, dP], …], … }, paume?: [bosses…], tete?: { doigt: h },
// fut?: h | { doigt: h } } :
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
//   pouce : le métacarpien part du cmc à 28° de l'axe (côté radial), plongé de 14° vers la paume, au repos.
//     opposition : il monte vers la paume de 0,75 × opposition degrés (90 : à 81°, devant la paume) ;
//     cmc : il se rapproche de l'index de cmc degrés dans le plan de la paume (négatif : il s'écarte) ;
//     rotation : la pronation propre du pouce autour de son axe (défaut 0,3 × opposition ; l'ongle au repos
//     regarde côté radial et dorsal) ; mcp, ip : la flexion, vers la pulpe.
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
// Chacune a sa profondeur (des sphères le long de l'os ; la paume : le plan de la face vue) ; le moteur décide,
// pour chaque vue :
//   1. l'ordre des doigts entre eux, par doigt entier (la moyenne des écarts de profondeur sur leurs
//      recouvrements ; à égalité, PRIORITE de la vue) ;
//   2. les traits intérieurs, par doigt entier : entre deux doigts, le contour de celui de devant là où il touche
//      l'autre à 1,3 mm près (une seule ligne entre deux doigts serrés) ; entre un doigt et la paume, seulement
//      là où l'un passe devant l'autre de plus de 2,6 mm (à la racine, ils se fondent) ; entre deux phalanges
//      d'un même doigt, jamais. Un trait court qui ne part pas du contour tombe ;
//   3. pour chaque pièce qui chevauche l'objet, si elle est devant ou derrière lui, par la profondeur des deux
//      surfaces, point par point sur leur recouvrement ; si l'objet passe en partie devant, en partie derrière la
//      même phalange (un fil entre deux doigts), elle est partagée par la droite qui sépare le mieux les deux
//      (pose.devant[vue] surcharge le tout : ids de pièces ou de doigts). Une phalange qui ne fait qu'effleurer
//      l'objet (moins de 12 % de son aire) suit, pour la peinture, sa voisine du même doigt qui y est franchement
//      (sans quoi le doigt change de côté au ras du bord : une marche) ; une pièce derrière l'objet qui n'en
//      dépasse que d'un ergot (moins de 3 mm de large ou de 20 mm²) ne s'y dessine pas ;
//   4. le gris, par doigt entier : un doigt dont aucune phalange ne passe devant l'objet et qui s'y cache ; vu de
//      dos ou de paume, un doigt caché pour plus de moitié par les doigts devant lui (de profil, les doigts
//      repliés restent blancs, en marches) ; un doigt dont ce qu'on voit est plus loin que
//      la face loin de la paume (le pouce vu côté auriculaire, le pouce qui tient le manche vu du dos) ;
//      pose.loin[vue] et profil.loin[vue]. Un filet gris de moins de 4 mm ou de 25 mm² ne se dessine pas.
// L'ordre de peinture :
//   a. la main entière : le blanc, les pièces grises, la silhouette (1,5) et les traits intérieurs (0,7) ;
//   b. le blanc de l'objet dans la main (masque : une hachure est transparente) ;
//   c. l'objet (option objet) ;
//   d. les pièces DEVANT l'objet, repeintes là où l'objet passe (blanc, silhouette, traits) : le manche
//      entre d'un côté du poing et ressort de l'autre, derrière les doigts qui l'entourent. Le blanc déborde
//      l'objet de quoi couvrir son trait ; les traits, d'un demi-trait seulement (la couche a les continue).
//
// ═══ LES COUPLAGES DU SQUELETTE (proportions.json, articulations.couplages) ═════════════════════════════════
//
//   l'écart d'un doigt s'efface quand sa MCP plie : écart × (1 − mcp / 90) ;
//   l'arche : la tête du métacarpien de l'annulaire descend vers la paume de 10° × mcp / 90, celle de
//   l'auriculaire de 20° × mcp / 90, autour de l'axe du majeur (doigts.annulaire.arche l'impose, en degrés).
//
// Unités internes : mm. L'union, les décalages et les découpes passent par Clipper (corps/clipper.js).
// Un appel neuf coûte 40 à 120 ms (le premier du processus, ~200 : la compilation) ; le même pose/vue/âge à
// une autre place, une autre échelle ou un autre angle sort du cache en ~2 ms. Les constructions se gardent
// aussi sur disque (MAINS_CACHE, défaut : <tmp>/mains-simples-cache ; MAINS_CACHE=0 : sans) : une planche
// recomposée les relit en ~10 ms ; la clé porte la date des fichiers du moteur, des poses, du profil, des prises
// et des proportions.

'use strict';

const fs = require('fs');
const path = require('path');
const CL = require('../corps/clipper');

const NOIR = '#1A1A1A', BLANC = '#FFFFFF', GRIS = '#E6E6E6';
const RAD = Math.PI / 180;
const DOIGTS = ['index', 'majeur', 'annulaire', 'auriculaire'];
const ARCHE = { annulaire: 10, auriculaire: 20 };
const BRAS_SUR_AVANTBRAS = 325.5 / 255.5;                    // épaule → coude sur coude → poignet (corps/proportions.json, homme)
const PLI_COUDE_MAX = 150;                                    // degrés : le coude replié au plus
const AVANTBRAS_COURT = 85;                                   // mm : l'avant-bras d'un gros plan, coupé              // degrés, à MCP pliée de 90°

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
// propre : la forme sort d'une union (simple, sans point double) : pas de nettoyage
function decale(paths, mm, propre = true) {
  if (!paths.length || !mm) return paths;
  const propres = propre ? paths : CL.Clipper.SimplifyPolygons(CL.Clipper.CleanPolygons(paths, 2), CL.PolyFillType.pftNonZero);
  const co = new CL.ClipperOffset(2, 0.05 * SC);
  co.AddPaths(propres, CL.JoinType.jtRound, CL.EndType.etClosedPolygon);
  const sol = new CL.Paths();
  co.Execute(sol, mm * SC);
  return sol;
}
const ferme = (p, r) => decale(decale(p, r), -r);          // arrondit les coins rentrants
const ouvre = (p, r) => decale(decale(p, -r), r);          // arrondit les coins saillants
// les morceaux séparés d'une forme, chacun avec ses trous
function composantes(paths) {
  if (!paths.length) return [];
  const c = new CL.Clipper();
  c.AddPaths(paths, CL.PolyType.ptSubject, true);
  const arbre = new CL.PolyTree();
  c.Execute(CL.ClipType.ctUnion, arbre, CL.PolyFillType.pftNonZero, CL.PolyFillType.pftNonZero);
  const out = [];
  const visite = n => { for (const e of n.Childs()) { if (!e.IsHole()) { out.push([e.Contour()].concat(e.Childs().map(t => t.Contour()))); for (const t of e.Childs()) visite(t); } } };
  visite(arbre);
  return out;
}
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
// le rayon p + t·d sort du polygone convexe Q (local, mm) en t (le plus loin des croisements) ; null s'il ne le croise pas
function sortieRayon(p, d, Q) {
  let t = null;
  for (let i = 0; i < Q.length; i++) {
    const a = Q[i], b = Q[(i + 1) % Q.length], e = sub(b, a), den = crx(d, e);
    if (Math.abs(den) < 1e-12) continue;
    const w = sub(a, p), tt = crx(w, e) / den, u = crx(w, d) / den;
    if (tt > 0 && u >= -1e-9 && u <= 1 + 1e-9 && (t === null || tt > t)) t = tt;
  }
  return t;
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
function lisserBoucle(P, pas = 0.8, iter = 6, lam = 0.5, mu = -0.53, poids = null) {
  const n0 = P.length; if (n0 < 4) return P;
  let Q = [];
  for (let i = 0; i < n0; i++) {
    const a = P[i], b = P[(i + 1) % n0], d = lon(sub(b, a)), k = Math.max(1, Math.round(d / pas));
    for (let j = 0; j < k; j++) Q.push(add(a, mul(sub(b, a), j / k)));
  }
  const n = Q.length; if (n < 6) return P;
  const W = poids ? Q.map(poids) : null;
  const pasF = f => { const R = new Array(n); for (let i = 0; i < n; i++) { const a = Q[(i - 1 + n) % n], b = Q[(i + 1) % n], q = Q[i], g = W ? f * W[i] : f; R[i] = [q[0] + g * ((a[0] + b[0]) / 2 - q[0]), q[1] + g * ((a[1] + b[1]) / 2 - q[1])]; } Q = R; };
  for (let k = 0; k < iter; k++) { pasF(lam); pasF(mu); }
  return Q;
}
function lisserCL(paths, pas = 0.8, iter = 6, zone = null) {
  const out = [];
  for (const P of paths) {
    const pts = deCL(P), trou = !CL.Clipper.Orientation(P);
    if (Math.abs(aire(pts)) < 1) continue;
    let Q = lisserBoucle(pts, pas, iter);
    // une zone (le poignet) lissée plus fort : { c, r } ; le poids tombe à 0 au bord de la zone
    if (zone) Q = lisserBoucle(Q, pas, 40, 0.5, -0.53, p => { const d = Math.hypot(p[0] - zone.c[0], p[1] - zone.c[1]) / zone.r; return d >= 1 ? 0 : (1 - d * d); });
    Q = allege(Q, 0.025, true);
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
// La main de l'homme ramenée à 190 du pli du poignet au bout du majeur, largeur 88,5 aux métacarpiens :
// proportions.json, bloc dessin_homme (agent 4 : Greiner 1991 recoupé ANSUR II), lu au chargement ; les
// valeurs d'ici en sont la copie, pour un moteur qui tourne sans le fichier. z (l'arche des métacarpiens) et les
// bases des métacarpiens (cmc) sont du dessin.
// L : longueurs des phalanges d'articulation à articulation ; la dernière va jusqu'au centre de l'arrondi du
// bout (la longueur sourcée, pulpe comprise, moins le rayon du bout).
const ANATOMIE = {
  longueur: 190, largeur: 88.5,
  doigts: {
    index:       { mcp: [75.1, -34.5, -1], cmc: [12, -18, 1], L: [46.9, 22.2, 26.8], rBout: 8.7 },
    majeur:      { mcp: [81.3, -11.5, -3], cmc: [12, -6, 0], L: [52.3, 26.4, 26.8], rBout: 8.5 },
    annulaire:   { mcp: [74.4, 11.5, -1], cmc: [12, 6, 1], L: [50.9, 23.9, 27.4], rBout: 7.9 },
    auriculaire: { mcp: [62.5, 34.5, 3], cmc: [12, 17, 3], L: [39.7, 17.1, 24.9], rBout: 7.0 },
  },
  // le pouce au repos (opposition 0, cmc 0) : le métacarpien part à 28° de l'axe, côté radial, plongé de 14°
  // vers la paume ; l'ongle regarde côté radial et dorsal
  pouce: { cmc: [22.8, -21.2, 9], L: [44.1, 31.4, 26.6], rBout: 10, angle: 28, plongee: 14, ongle: [0, -0.75, -0.66] },
  avantbras: { longueur: 255.5 },
};
(function lireDessin() {
  try {
    const pj = JSON.parse(fs.readFileSync(path.join(__dirname, 'proportions.json'), 'utf8'));
    const d = pj && pj.dessin_homme;
    if (!d || !d.doigts) return;
    if (d.largeur) ANATOMIE.largeur = d.largeur;
    for (const k of Object.keys(ANATOMIE.doigts)) {
      const s = d.doigts[k], A = ANATOMIE.doigts[k];
      if (!s || !s.mcp) continue;
      A.mcp = [s.mcp[0], s.mcp[1], A.mcp[2]];
      A.L = [s.p1, s.p2, s.p3];
    }
    if (d.pouce) {
      const P = ANATOMIE.pouce;
      if (d.pouce.cmc) P.cmc = [d.pouce.cmc[0], d.pouce.cmc[1], P.cmc[2]];
      P.L = [d.pouce.metacarpe || P.L[0], d.pouce.p1 || P.L[1], d.pouce.p2 || P.L[2]];
    }
    if (d.avantbras && d.avantbras.longueur) ANATOMIE.avantbras.longueur = d.avantbras.longueur;
  } catch (e) { /* le fichier manque ou s'écrit : les valeurs d'ici */ }
})();
// la dernière phalange va au centre de l'arrondi
for (const A of Object.values(ANATOMIE.doigts).concat([ANATOMIE.pouce])) A.L = [A.L[0], A.L[1], A.L[2] - A.rBout];

// Les formes des segments (voir l'en-tête). Les doigts un peu plus pleins qu'au naturel : une notice arrondit.
const FORMES = {
  dos: {
    // largeurs : racine, IPP, IPD de proportions.json (ages.homme × 0,979) ; le bout, un peu moins que l'IPD
    'index.p1': [[0, 11.6, 11.6], [0.5, 11.1, 11.1], [1, 10.9, 10.9]],
    'index.p2': [[0, 10.9, 10.9], [1, 9.45, 9.45]],
    'index.p3': [[0, 9.45, 9.45], [0.55, 9.3, 9.3], [1, 8.7, 8.7]],
    'majeur.p1': [[0, 11.8, 11.8], [0.5, 11.0, 11.0], [1, 10.8, 10.8]],
    'majeur.p2': [[0, 10.8, 10.8], [1, 9.15, 9.15]],
    'majeur.p3': [[0, 9.15, 9.15], [0.55, 9.0, 9.0], [1, 8.5, 8.5]],
    'annulaire.p1': [[0, 11.0, 11.0], [0.5, 10.4, 10.4], [1, 10.1, 10.1]],
    'annulaire.p2': [[0, 10.1, 10.1], [1, 8.55, 8.55]],
    'annulaire.p3': [[0, 8.55, 8.55], [0.55, 8.4, 8.4], [1, 7.9, 7.9]],
    'auriculaire.p1': [[0, 9.8, 9.8], [0.5, 9.2, 9.2], [1, 9.0, 9.0]],
    'auriculaire.p2': [[0, 9.0, 9.0], [1, 7.65, 7.65]],
    'auriculaire.p3': [[0, 7.65, 7.65], [0.55, 7.5, 7.5], [1, 7.0, 7.0]],
    'pouce.meta': [[0, 13, 14], [0.35, 15, 15.5], [0.7, 13.5, 13.5], [1, 11.6, 11.6]],
    'pouce.p1': [[0, 12, 12], [1, 11.3, 11.3]],
    'pouce.p2': [[0, 11.3, 11.3], [0.5, 11.0, 11.0], [1, 10, 10]],
    // le poignet : 64 de large (proportions.json) ; les tendons restent minces sur 3 cm, puis le ventre des
    // muscles s'élargit, plus du côté radial (le long supinateur), jusqu'aux trois quarts (≈ 93 de large : le tour
    // relevé est de 310 mm près du coude) ; un peu moins au coude
    'avantbras': [[0, 32, 32], [0.1, 32.4, 32.2], [0.22, 35.5, 34], [0.4, 42.5, 38.5], [0.58, 47.5, 42], [0.75, 48.5, 44], [0.9, 46, 42.5], [1, 42.5, 40]],
    // le bras (avantbras.bras), du coude (t = 0) à l'épaule (t = 1) : un peu moins large que l'avant-bras au coude,
    // puis le biceps et le deltoïde (≈ 100 de large à l'épaule : corps/moteur.js, mis à cette main)
    'bras': [[0, 41, 41], [0.15, 43, 43], [0.45, 46.5, 46.5], [0.75, 49, 49], [1, 51, 51]],
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
    'avantbras': [[0, 20.5, 22], [0.12, 22, 24], [0.3, 25, 28], [0.65, 32, 33], [1, 31, 31]],
    'bras': [[0, 33, 35], [0.15, 37, 39], [0.45, 42, 45], [0.75, 45, 47], [1, 50, 50]],
  },
  // la paume : des bosses dont l'enveloppe convexe fait la paume, dans le repère de la main
  // { c: centre, h: [le long de x, radial (−y), ulnaire (+y), dorsal (−z), palmaire (+z)] }
  paume: [
    { nom: 'carpe', c: [2, 0, 1], h: [9, 32.5, 33, 17, 18] },
    { nom: 'carpe2', c: [16, 0, 2], h: [10, 33, 33.5, 16, 17] },
    { nom: 'hypothenar', c: [36, 29, 5], h: [22, 10, 12, 10.5, 14] },
    { nom: 'thenar', c: [33, -23, 10], h: [16, 8, 8, 8, 12] },
  ],
  // les têtes des métacarpiens (au MCP) et leurs fûts : h comme la paume
  tete: { index: [9, 12.5, 11.5, 11.5, 14], majeur: [9, 11.8, 11.8, 12, 14], annulaire: [9, 11.5, 11.5, 11.5, 14], auriculaire: [9, 11, 11.5, 11, 13.5] },
  fut: [12, 11, 11, 12, 14],
};

// ─── les poses intégrées (en attendant mains/poses.json) ──────────────────────────────────────────────────
const doigtsPareils = (o, pouce) => ({ index: { ...o }, majeur: { ...o }, annulaire: { ...o }, auriculaire: { ...o }, pouce });
const POSES = {
  ouverte: { doigts: { index: { ecart: 12, mcp: 5, ipp: 8, ipd: 5 }, majeur: { ecart: 3, mcp: 6, ipp: 10, ipd: 6 },
    annulaire: { ecart: 10, mcp: 8, ipp: 13, ipd: 7 }, auriculaire: { ecart: 20, mcp: 11, ipp: 16, ipd: 8 },
    pouce: { opposition: 12, cmc: -22, mcp: 8, ip: 14 } }, poignet: { flexion: 0, deviation: 0 } },
  plat: { doigts: doigtsPareils({ ecart: 0, mcp: 0, ipp: 0, ipd: 0 }, { opposition: -16, cmc: 4, mcp: 0, ip: 0 }), poignet: { flexion: 0, deviation: 0 } },
  'prise-manche': { doigts: { index: { ecart: 0 }, majeur: { ecart: 0 }, annulaire: { ecart: 0 }, auriculaire: { ecart: 0 },
    pouce: { opposition: 48, cmc: -12, mcp: 50, ip: 12, rotation: -50 } }, poignet: { flexion: 0, deviation: 0 },
    objet: { type: 'cylindre', diametre: 32 }, enrouler: true },
  poing: { doigts: { index: { ecart: 0, mcp: 85, ipp: 100, ipd: 55 }, majeur: { ecart: 0, mcp: 88, ipp: 102, ipd: 55 },
    annulaire: { ecart: 0, mcp: 90, ipp: 104, ipd: 55 }, auriculaire: { ecart: 0, mcp: 92, ipp: 106, ipd: 55 },
    pouce: { opposition: 30, cmc: 3, mcp: 23, ip: 70, rotation: 12 } }, poignet: { flexion: 0, deviation: 0 } },
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
  const tete = Object.assign({}, FORMES.tete, (P && P.tete) || {});
  return { dos: FORMES.dos, profil: prof, paume: (P && P.paume) || FORMES.paume, tete, fut: (P && P.fut) || FORMES.fut, ext: P };
}
// le gant : chaque demi-largeur et demi-épaisseur gonflée de d mm (le cuir, la doublure), la paume aussi
const CACHE_GANT = new Map();
function formesGant(F, d = 1.8) {
  const cle = F.ext ? 1 : 0;
  const c = CACHE_GANT.get(F);
  if (c && c.d === d) return c.v;
  const plus = T => Object.fromEntries(Object.entries(T).map(([k, l]) => [k, l.map(([t, a, b]) => [t, a + d, b + d])]));
  const v = { dos: plus(F.dos), profil: plus(F.profil), paume: F.paume.map(b => Object.assign({}, b, { h: b.h.map((x, i) => (i ? x + d * 0.8 : x)) })),
    tete: Object.fromEntries(Object.entries(F.tete).map(([k, h]) => [k, h.map((x, i) => (i ? x + d : x))])),
    fut: Array.isArray(F.fut) ? F.fut.map((x, i) => (i ? x + d : x)) : Object.fromEntries(Object.entries(F.fut).map(([k, h]) => [k, h.map((x, i) => (i ? x + d : x))])),
    ext: F.ext, gant: d };
  CACHE_GANT.set(F, { d, v }); void cle;
  return v;
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
    // l'écart s'efface quand la MCP plie (proportions.json, couplages : écart × (1 − flexion MCP / 90))
    u = rot3(u, n, s * q.ecart * Math.max(0, Math.min(1, 1 - Math.max(0, q.mcp) / 90)));
    // l'arche : dans une prise, la tête du métacarpien de l'annulaire descend vers la paume (jusqu'à 10°), celle
    // de l'auriculaire jusqu'à 20° (couplages : 0 à 15°, 0 à 25°), autour de l'axe du majeur ; la paume se creuse
    let mcp = A.mcp.slice();
    const kArche = q.arche !== undefined ? q.arche : (ARCHE[d] || 0) * Math.max(0, Math.min(1, q.mcp / 90));
    if (kArche) {
      const ym = an.doigts.majeur.mcp[1], zm = an.doigts.majeur.mcp[2], c = Math.cos(kArche * RAD), sn = Math.sin(kArche * RAD);
      const dy = mcp[1] - ym, dz = mcp[2] - zm;
      mcp = [mcp[0], ym + dy * c - dz * sn, zm + dy * sn + dz * c];
      u = rot3(u, X, kArche); n = rot3(n, X, kArche);
    }
    pts[d + '.cmc'] = A.cmc.slice();
    pts[d + '.mcp'] = mcp;
    seg[d + '.meta'] = cadre(A.cmc, mcp, u3(s3(mcp, A.cmc)), n);
    const flex = [q.mcp, q.ipp, q.ipd], noms = ['mcp', 'ipp', 'ipd', 'bout'], ids = ['p1', 'p2', 'p3'];
    let P = mcp;
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
  for (const d of DOIGTS) { const A = an.doigts[d]; doigts[d] = { ...A, mcp: sc(A.mcp), cmc: sc(A.cmc), L: A.L.map(l => l * kL) }; }
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
function formeSegment(S, id, F, kW, M, { bout = false, debut = null, pas = 7, tMax = 1, largeur = null } = {}) {
  const polys = [], spheres = [];
  const LG = largeur || (t => demiAxes(F, id, t, kW));
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
      secs.push(section(S.de, fr2, LG(0)));
    }
  }
  for (let i = 0; i <= n; i++) {
    const t = tMax * i / n, c = a3(S.de, m3(S.u, L * t)), w = LG(t);
    secs.push(section(c, fr, w));
    const pc = proj(c);
    spheres.push({ x: pc[0], y: pc[1], z: pc[2], r: (w[0] + w[1] + w[2] + w[3]) / 4, w });
  }
  if (bout) {
    const w = LG(1), rb = (w[0] + w[1]) / 2;
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
  // la surface la plus proche de l'œil le long du rayon de vue (x, y) : le flanc, ou une face des bouts
  const devant = p => {
    let best = Infinity;
    const w0 = [p[0] - C[0], p[1] - C[1], -C[2]];
    const ez = [0, 0, 1];
    const a0 = s3(w0, m3(A, d3(w0, A))), a1 = s3(ez, m3(A, d3(ez, A)));
    const qa = d3(a1, a1), qb = 2 * d3(a0, a1), qc = d3(a0, a0) - r * r;
    if (qa > 1e-9) {
      const disc = qb * qb - 4 * qa * qc;
      if (disc >= 0) for (const sg of [-1, 1]) {
        const z = (-qb + sg * Math.sqrt(disc)) / (2 * qa), s = d3(s3([p[0], p[1], z], C), A);
        if (Math.abs(s) <= Lg / 2 + 1e-6 && z < best) best = z;
      }
    }
    if (Math.abs(A[2]) > 1e-6) for (const E of [e1, e2]) {
      const z = (d3(E, A) - p[0] * A[0] - p[1] * A[1]) / A[2], P = [p[0], p[1], z], w = s3(P, E);
      if (l3(s3(w, m3(A, d3(w, A)))) <= r && z < best) best = z;
    }
    return best;
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
// la pose résolue, le squelette et la vue : ce qu'il faut pour placer la main (l'ancre), sans la dessiner
function preparer(o) {
  const g0 = o.gant ? (typeof o.gant === 'object' ? o.gant : {}) : null;
  const F = g0 ? formesGant(formes(), g0.epaisseur !== undefined ? g0.epaisseur : 1.8) : formes();
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
  // la présentation (profil.js, agent 2) : de profil, un poing se tourne un peu (≈ 26°) pour montrer ses doigts
  // en marches sous le pouce, au lieu d'une boîte ; une main qui tient un objet garde la vue franche
  let rot = o.rotation;
  if (o.presentation !== false && F.ext && typeof F.ext.presentation === 'function') {
    try { const rp = F.ext.presentation(pose, o.vue || 'dos', sq); if (rp) rot = [0, 1, 2].map(i => (rp[i] || 0) + ((o.rotation || [])[i] || 0)); }
    catch (e) { if (process.env.MAINS_DEBUG) console.error('presentation :', e.message); }
  }
  const M = matriceVue(o.vue || 'dos', rot);
  return { pose, sq, M, F, g0 };
}
function construire(o, prep = null) {
  const P0 = prep || preparer(o);
  const { pose, M, F, g0 } = P0;
  const sq = Object.assign({}, P0.sq, { points: Object.assign({}, P0.sq.points) });   // le coude bouge selon l'avant-bras
  const kW = sq.age.kW, kL0 = sq.age.kL;
  const proj = p => matVec(M, p);
  const p2 = p => { const q = proj(p); return [q[0], q[1]]; };

  // ── les pièces ──
  const pieces = [];
  const piece = (id, groupe, polys, spheres, rang = 0) => pieces.push({ id, groupe, rang, polys, spheres });
  // les largeurs d'un doigt : ses trois tables bout à bout, une seule courbe le long du doigt (pas de cassure de
  // pente aux articulations d'un doigt tendu : agent 5, M6)
  const chaine = ids => {
    const L = ids.map(id => sq.segments[id].L), offs = [], cles = [[], []];
    let off = 0;
    ids.forEach((id, i) => {
      offs.push(off);
      [F.dos[id] || [[0, 10, 10], [1, 10, 10]], F.profil[id] || [[0, 9, 10], [1, 9, 10]]].forEach((tab, j) => {
        for (const [t, a, b] of tab) {
          const x = off + t * L[i], arr = cles[j], der = arr[arr.length - 1];
          if (der && Math.abs(der[0] - x) < 1e-6) { der[1] = (der[1] + a) / 2; der[2] = (der[2] + b) / 2; } else arr.push([x, a, b]);
        }
      });
      off += L[i];
    });
    const D = interp(cles[0]), P_ = interp(cles[1]);
    return i => t => { const x = offs[i] + t * L[i]; return [D.a(x) * kW, D.b(x) * kW, P_.a(x) * kW, P_.b(x) * kW]; };
  };
  // les doigts
  for (const d of DOIGTS) {
    const lg = chaine([1, 2, 3].map(k => `${d}.p${k}`));
    for (let k = 1; k <= 3; k++) {
      const id = `${d}.p${k}`, S = sq.segments[id];
      const prec = k === 1 ? sq.segments[d + '.meta'] : sq.segments[`${d}.p${k - 1}`];
      // la jointure : du cadre précédent au cadre de ce segment, autour de l'axe de flexion
      const axe = u3(x3(S.n, S.u));
      const ang = k === 1 ? Math.max(0, S.flex) : S.flex;
      const f = formeSegment(S, id, F, kW, M, { bout: k === 3, debut: Math.abs(ang) > 4 ? { axe, angle: ang } : null, largeur: lg(k - 1) });
      piece(id, d, f.polys, f.spheres, k);
      void prec;
    }
  }
  // le pouce
  const lgP = chaine(['pouce.p1', 'pouce.p2']);
  for (const k of [1, 2]) {
    const id = `pouce.p${k}`, S = sq.segments[id];
    const axe = u3(x3(S.n, S.u));
    const f = formeSegment(S, id, F, kW, M, { bout: k === 2, debut: Math.abs(S.flex) > 4 ? { axe, angle: S.flex } : null, largeur: lgP(k - 1) });
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
      const h = F.tete[d].map((v, i) => v * (i ? kW : kk.kL));
      const r = bosse(S.a, h, M); pts.push(...r.pts); sph.push(r.sphere);
      for (const t of [0.35, 0.65]) { const rr = bosse(i3(S.de, S.a, t), (Array.isArray(F.fut) ? F.fut : (F.fut[d] || FORMES.fut)).map((v, i) => v * (i ? kW : kk.kL)), M); pts.push(...rr.pts); sph.push(rr.sphere); }
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
      // le fond de la palmure : là où la fente entre les deux doigts s'ouvre (plus de 2,4 mm : le contour s'y
      // referme sinon), si elle s'ouvre avant les trois quarts de la phalange ; des doigts serrés : aux 4/10
      let tOuv = 0;
      for (let k = 0; k <= 24; k++) {
        const t = k / 24, a = a3(S1.de, m3(S1.u, S1.L * t)), b = a3(S2.de, m3(S2.u, S2.L * t));
        const w1 = demiAxes(F, d1 + '.p1', t, kW)[1], w2 = demiAxes(F, d2 + '.p1', t, kW)[0];
        if (l3(s3(a, b)) < w1 + w2 + 2.4) tOuv = t;
      }
      // là où la fente s'ouvre, mais borné à 60 % de la phalange : les palmures restent proches en hauteur d'un doigt à
      // l'autre (agent 5, M7) ; deux doigts qui se touchent plus loin ont leur trait de séparation au-delà. (Deux
      // doigts dont les écarts de la pose diffèrent de moins de ~8° se touchent sur toute la phalange : écart 0, ce
      // sont des doigts serrés jusqu'à l'IPD.)
      const tw = Math.min(0.6, Math.max(0.34, tOuv + 0.04)), creux = tOuv > 0.3 ? 0.12 : 0.3;
      const A1 = [S1.de, cote(d1 + '.p1', tw * 0.5, -1), cote(d1 + '.p1', tw, -1)];
      const A2 = [S2.de, cote(d2 + '.p1', tw * 0.5, 1), cote(d2 + '.p1', tw, 1)];
      polys.push(palmure(A1, A2, i3(S1.de, S2.de, 0.5), creux, M));
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
  // l'avant-bras. Son axe part du poignet dans le prolongement de la pose ; si la planche impose une direction
  // (vers), il y tourne sur les 45 premiers mm, en courbe : le poignet plie sans coin ni bosse. Il s'élargit
  // vers le coude par le ventre des muscles ; entier, il finit sur l'arrondi du coude (l'olécrane).
  let coupe = null;
  if (o.avantbras !== false) {
    const ab = o.avantbras || {};
    const S = sq.segments.avantbras, LA = S.L;
    const d0 = m3(S.u, -1);                                   // du poignet vers le coude, selon la pose
    const Mi = [[M[0][0], M[1][0], M[2][0]], [M[0][1], M[1][1], M[2][1]], [M[0][2], M[1][2], M[2][2]]];
    const bras = ab.bras || null;
    let d1 = d0;
    if (ab.versLocal) {
      const v2 = uni(ab.versLocal);
      d1 = u3(matVec(Mi, [v2[0], v2[1], 0]));
      // le poignet ne plie pas au-delà de ce qu'il peut (proportions.json, articulations) : la déviation dans le
      // plan de la paume jusqu'à 40°, la flexion ou l'extension jusqu'à 75° ; au-delà, l'avant-bras s'arrête à la
      // butée, et le moteur le dit (la planche tourne la main avec angle)
      const nP = [0, 0, 1], devie = Math.abs(d3(d1, nP)) < Math.abs(d3(d1, [0, 1, 0]));   // dans le plan de la paume ?
      const lim = (devie ? 40 : 75) * RAD;
      const a01 = Math.acos(Math.max(-1, Math.min(1, d3(d0, d1))));
      if (a01 > lim + 1e-3) {
        const k = u3(x3(d0, d1));
        d1 = u3(rot3(d0, k, lim / RAD));
        const cle = `poignet:${Math.round(a01 / RAD)}:${devie}`;
        if (!DEJA_DIT.has(cle)) { DEJA_DIT.add(cle); console.warn(`mainSimple : l'avant-bras demandé fait ${Math.round(a01 / RAD)}° avec la main (le poignet plie de ${devie ? 40 : 75}° au plus) : il s'arrête à la butée ; tourner la main (angle) vers l'avant-bras`); }
      }
    }
    // la longueur dessinée : courte par défaut (un gros plan coupe l'avant-bras), 'entier' jusqu'au coude, ou
    // celle qui sort de la boîte de la vue ('bord', calculée par mainSimple) ; avec le bras, entier
    let Ldes = bras ? LA : (typeof ab.longueur === 'number' ? ab.longueur : (ab.longueur === 'entier' ? LA : (ab.longueur === 'bord' && ab.versDist ? ab.versDist : AVANTBRAS_COURT * kL0)));
    Ldes = Math.max(10, Math.min(Ldes, LA));
    const Fab = { dos: { 'avantbras': F.dos.avantbras }, profil: { 'avantbras': F.profil.avantbras } };
    // l'axe : échantillonné tous les 2 mm ; la direction glisse de d0 à d1 sur Lb
    const Lb = Math.min(LA, 45 * kL0), ang01 = Math.acos(Math.max(-1, Math.min(1, d3(d0, d1)))) / RAD;
    const kRot = ang01 > 0.1 ? u3(x3(d0, d1)) : null;
    const dirA = s_ => { if (!kRot) return d0; const t = Math.min(1, s_ / Lb), w = t * t * (3 - 2 * t); return u3(rot3(d0, kRot, ang01 * w)); };
    const axe = [{ s: 0, c: [0, 0, 0], d: dirA(0) }];
    for (let s_ = 2; s_ <= LA + 1e-6; s_ += 2) { const pr = axe[axe.length - 1], dm = dirA(s_ - 1); axe.push({ s: s_, c: a3(pr.c, m3(dm, 2)), d: dirA(s_) }); }
    const surAxe = s_ => { const k = Math.max(0, Math.min(axe.length - 2, Math.floor(s_ / 2))), A = axe[k], B = axe[k + 1], t = (s_ - A.s) / 2; return { c: i3(A.c, B.c, t), d: u3(i3(A.d, B.d, t)) }; };
    const cadreEn = s_ => { const q = surAxe(s_), n = orth(transporte(S.n, d0, q.d), q.d), uD = m3(q.d, -1); return { c: q.c, d: q.d, fr: { r: x3(n, uD), n } }; };
    // la fin : une droite de la vue où le membre s'arrête, quelle que soit sa longueur (deux mains l'une sur
    // l'autre coupées au même trait : agent 5, M11). Le côté gardé est celui de la main.
    const finL = ab.finLocal && ab.finLocal.length === 2 ? ab.finLocal : null;
    let nFin = null, cGarde = 1, parFin = false;
    if (finL && lon(sub(finL[1], finL[0])) > 1e-6) {
      const u = uni(sub(finL[1], finL[0])); nFin = [-u[1], u[0]];
      cGarde = Math.sign(dot(sub(p2(sq.points['majeur.mcp']), finL[0]), nFin)) || 1;
    }
    const auDela = q => nFin !== null && dot(sub(q, finL[0]), nFin) * cGarde < 0;
    // toute la section au-delà de la droite (ses deux bords, vus) : une droite en biais coupe un bord plus loin que
    // l'axe, et le membre arrêté trop tôt y laissait un chanfrein
    const sectionAuDela = (c, d, w) => { const q = p2(c), t = p2(d), lt = lon(t), nn = lt > 1e-6 ? [-t[1] / lt, t[0] / lt] : [0, 0]; return auDela(add(q, mul(nn, w))) && auDela(add(q, mul(nn, -w))); };
    if (nFin && !bras) {
      const A = axe.find(A => sectionAuDela(A.c, A.d, 52 * kW));
      if (A && A.s < LA - 1) { Ldes = Math.max(10, Math.min(LA, A.s + 4)); parFin = true; }
      else if (!A && axe.some(A => auDela(p2(A.c)))) { Ldes = LA; parFin = true; }
    }
    const entier = !bras && !parFin && Ldes >= LA - 0.5;
    // les demi-axes le long du membre (s : mm depuis le poignet ; au-delà de LA, le bras) ; avec le bras, le coude
    // se raccorde en douceur (une cubique d'Hermite de 0,8 LA à LA + 0,25 LB : sans elle, la taille du coude
    // faisait un coin, bras tendu)
    const Fbr = { dos: { bras: FORMES.dos.bras }, profil: { bras: FORMES.profil.bras } }, LB = LA * BRAS_SUR_AVANTBRAS;
    const wBrut = s_ => (s_ <= LA ? demiAxes(Fab, 'avantbras', Math.max(0, s_) / LA, kW) : demiAxes(Fbr, 'bras', Math.min(1, (s_ - LA) / LB), kW));
    const sH0 = 0.8 * LA, sH1 = LA + 0.25 * LB;
    const pente = s_ => { const a = wBrut(s_ - 1), b = wBrut(s_ + 1); return a.map((v, i) => (b[i] - v) / 2); };
    const wH0 = wBrut(sH0), wH1 = wBrut(sH1), mH0 = pente(sH0), mH1 = pente(sH1);
    const largeurs = s_ => {
      if (!bras || s_ <= sH0 || s_ >= sH1) return wBrut(s_);
      const h = sH1 - sH0, t = (s_ - sH0) / h, t2 = t * t, t3 = t2 * t;
      return wH0.map((v, i) => (2 * t3 - 3 * t2 + 1) * v + (t3 - 2 * t2 + t) * h * mH0[i] + (-2 * t3 + 3 * t2) * wH1[i] + (t3 - t2) * h * mH1[i]);
    };
    const secs = [], sph = [];
    const nS = Math.max(3, Math.ceil(Ldes / 6));
    for (let k = 0; k <= nS; k++) {
      const s_ = Ldes * k / nS, q = cadreEn(s_), w = largeurs(s_);
      secs.push(section(q.c, q.fr, w).map(p2));
      const pc = matVec(M, q.c); sph.push({ x: pc[0], y: pc[1], z: pc[2], r: (w[0] + w[1] + w[2] + w[3]) / 4 });
    }
    // le coude : un arrondi au-delà du bout, plus plein côté dos (l'olécrane)
    if (entier) {
      const q = cadreEn(LA), w = demiAxes(Fab, 'avantbras', 1, kW), rb = (w[0] + w[1]) / 2 * 0.62;
      for (const k of [0.35, 0.6, 0.8, 0.93, 1]) {
        const f = Math.sqrt(Math.max(0, 1 - k * k)), c = a3(a3(q.c, m3(q.d, rb * k)), m3(q.fr.n, w[2] * 0.25 * k));
        secs.push(section(c, q.fr, [w[0] * f, w[1] * f, w[2] * Math.max(f, 0.35), w[3] * f].map(v => Math.max(0.3, v))).map(p2));
      }
    }
    const polysAB = [];
    for (let k = 0; k < secs.length - 1; k++) polysAB.push(enveloppe(secs[k].concat(secs[k + 1])));
    const qF = cadreEn(Ldes);
    sq.points.coude = entier || bras ? cadreEn(LA).c : a3(qF.c, m3(qF.d, LA - Ldes));
    // la dernière section du membre dessiné : celle de l'avant-bras, ou celle du bras
    let bout = { c: qF.c, fr: qF.fr, w: demiAxes(Fab, 'avantbras', Ldes / LA, kW), d: qF.d };
    let plisCoude = null;
    // le bras (agent 5, M10) : il repart du coude dans la même union, vers bras.vers (ou plié de bras.pli à
    // l'écran) ; le coude tourne en éventail autour de son centre (l'extérieur du pli arrondi, l'intérieur net) ;
    // replié de plus de 100°, l'avant-bras appuyé sur le biceps y laisse un trait (le pli du coude, comme
    // corps/moteur.js). Le bout du bras est une coupe, comme celle de l'avant-bras.
    if (bras) {
      const qE = cadreEn(LA), cE = qE.c, dA3 = qE.d, wA = largeurs(LA);
      const e2 = p2(cE);
      const pA = p2(dA3), dA2 = lon(pA) > 1e-6 ? uni(pA) : [1, 0];
      let dB2 = dA2;
      if (bras.versLocal) { const v = sub(bras.versLocal, e2); if (lon(v) > 1) dB2 = uni(v); }
      else if (typeof bras.pli === 'number') dB2 = tourne(dA2, bras.pli);
      let dB3 = u3(matVec(Mi, [dB2[0], dB2[1], 0]));
      let flex = Math.acos(Math.max(-1, Math.min(1, d3(dA3, dB3)))) / RAD;
      if (flex > PLI_COUDE_MAX + 0.01) {
        const k = l3(x3(dA3, dB3)) > 1e-6 ? u3(x3(dA3, dB3)) : u3(x3(dA3, qE.fr.n));
        const cle = `coude:${Math.round(flex)}`;
        if (!DEJA_DIT.has(cle)) { DEJA_DIT.add(cle); console.warn(`mainSimple : le bras demandé replie le coude de ${Math.round(flex)}° (${PLI_COUDE_MAX}° au plus) : il s'arrête à la butée`); }
        dB3 = u3(rot3(dA3, k, PLI_COUDE_MAX)); flex = PLI_COUDE_MAX;
      }
      const pB = p2(dB3), kB = Math.max(0.2, lon(pB));      // 2D par mm de bras
      const dBv = lon(pB) > 1e-6 ? uni(pB) : dB2;
      // sa longueur : en mm, 'entier' (jusqu'à l'épaule), 'bord' (sortir de la boîte de la vue, + 15 mm), ou la moitié
      let LBd = typeof bras.longueur === 'number' ? bras.longueur : (bras.longueur === 'entier' ? LB : 0.5 * LB);
      if (bras.bordLocal && bras.longueur !== 'entier' && typeof bras.longueur !== 'number') {
        const t = sortieRayon(e2, dBv, bras.bordLocal);
        if (t !== null) LBd = t / kB + 15 * kL0;
      }
      if (nFin) {
        for (let s_ = 0; s_ <= 1.6 * LB; s_ += 2) if (sectionAuDela(a3(cE, m3(dB3, s_)), dB3, 56 * kW)) { LBd = s_ + 4; parFin = true; break; }
      }
      LBd = Math.max(10, Math.min(LBd, 1.6 * LB));
      const nE = qE.fr.n, frEn = d => { const n = orth(transporte(nE, dA3, d), d); return { r: x3(n, m3(d, -1)), n }; };
      const polysBR = [];
      // l'éventail du coude : la section tourne autour du centre de l'articulation, de l'avant-bras au bras ; son
      // centre glisse vers l'extérieur du pli au milieu (sin², nul aux deux bouts : sans coin), ce qui fait la pointe
      // arrondie de l'olécrane (l'éventail seul en faisait un tuyau coudé)
      if (flex > 0.5) {
        const kE = u3(x3(dA3, dB3)), K = Math.max(4, Math.ceil(flex / 6)), ev = [];
        const lisse = t0 => { const v = Math.max(0, Math.min(1, t0)); return v * v * (3 - 2 * v); };
        const rw = (wA[0] + wA[1] + wA[2] + wA[3]) / 4, bis = u3(s3(dA3, dB3));
        // (replié serré, la pointe s'affine : sinon un talon de chaussette)
        const kO = rw * (0.3 * lisse((flex - 30) / 60) + 0.12 * lisse((flex - 90) / 45)), kF = 0.2 * lisse((flex - 80) / 50);
        for (let j = 0; j <= K; j++) {
          const t = j / K, d = u3(rot3(dA3, kE, flex * t)), b = Math.sin(Math.PI * t) ** 2;
          ev.push(section(a3(cE, m3(bis, kO * b)), frEn(d), wA.map(v => v * (1 - kF * b))).map(p2));
        }
        for (let j = 0; j < K; j++) polysBR.push(enveloppe(ev[j].concat(ev[j + 1])));
      }
      const frB = frEn(dB3), secB = [];
      const nB = Math.max(3, Math.ceil(LBd / 6));
      for (let k = 0; k <= nB; k++) {
        const s_ = LBd * k / nB, c = a3(cE, m3(dB3, s_)), w = largeurs(LA + s_);
        secB.push(section(c, frB, w).map(p2));
        const pc = matVec(M, c); sph.push({ x: pc[0], y: pc[1], z: pc[2], r: (w[0] + w[1] + w[2] + w[3]) / 4 });
      }
      for (let k = 0; k < secB.length - 1; k++) polysBR.push(enveloppe(secB[k].concat(secB[k + 1])));
      if (flex > 100) plisCoude = { fa: polysAB.slice(), br: polysBR.slice(Math.max(0, polysBR.length - nB)), centre: e2, r: 1.25 * (wA[0] + wA[1]) / 2 };
      polysAB.push(...polysBR);
      sq.points.epaule = a3(cE, m3(dB3, LB));
      bout = { c: a3(cE, m3(dB3, LBd)), fr: frB, w: largeurs(LA + LBd), d: dB3 };
    }
    piece('avantbras', 'base', polysAB, sph, -1);
    if (plisCoude) pieces[pieces.length - 1].plisCoude = plisCoude;
    // la coupe : les deux coins de la dernière section, vue (sur la droite de fin, si elle coupe)
    const sec = section(bout.c, bout.fr, bout.w).map(p2);
    const ax2 = uni(sub(p2(a3(bout.c, bout.d)), p2(bout.c))), nrm = [-ax2[1], ax2[0]];
    let iMin = 0, iMax = 0;
    sec.forEach((p, i) => { if (dot(p, nrm) < dot(sec[iMin], nrm)) iMin = i; if (dot(p, nrm) > dot(sec[iMax], nrm)) iMax = i; });
    let cA = sec[iMin], cB = sec[iMax];
    if (parFin && Math.abs(dot(ax2, nFin)) > 0.1) {
      const surFin = p => add(p, mul(ax2, dot(sub(finL[0], p), nFin) / dot(ax2, nFin)));
      cA = surFin(cA); cB = surFin(cB);
    }
    coupe = { a: cA, b: cB, c: p2(bout.c), ax: ax2, region: null, plein: entier, fin: parFin ? { A: finL[0], n: nFin, garde: cGarde } : null };
    // la manchette du gant : une bande plus large autour du poignet, son bord côté main en trait intérieur
    if (g0 && g0.manchette !== false) {
      const Lm = (g0.manchette || 45) * kL0, s0 = 4, s1 = Math.min(Ldes, s0 + Lm), mp = [], sm = [];
      for (let k = 0; k <= 6; k++) {
        const s_ = s0 + (s1 - s0) * k / 6, q = cadreEn(s_), w = demiAxes(Fab, 'avantbras', s_ / LA, kW).map(v => v + 3.5);
        sm.push(section(q.c, q.fr, w).map(p2));
      }
      for (let k = 0; k < sm.length - 1; k++) mp.push(enveloppe(sm[k].concat(sm[k + 1])));
      piece('manchette', 'base', mp, sph.map(q => Object.assign({}, q, { r: q.r + 3.5 })), -2);
      pieces[pieces.length - 1].bordTrait = true;
    }
  }

  // ── les régions : chaque pièce unifiée, ses plis arrondis ──
  for (const P of pieces) {
    let u = union(P.polys);
    if (P.id === 'paume') u = ferme(u, 5);
    // les autres : un segment couché dans le plan de la vue a ses sections vues par la tranche, et ses
    // enveloppes ne font que se toucher bord à bord ; l'union y laisse des fentes de largeur nulle et des
    // trous en aiguille, dont le contour sortait en tirets (le long de l'avant-bras de profil, en travers d'un
    // doigt). Une fermeture de 0,3 mm les recoud sans rien changer à la forme. (agent 5, révision)
    else u = ferme(u, 0.3);
    P.region = lisserCL(u, 0.8, 5);
    P.boite = boiteCL(u);
  }
  // la coupe de l'avant-bras : tout ce qui dépasse la dernière section est retranché
  if (coupe && !coupe.plein && coupe.fin) {
    // (la droite de fin : tout le demi-plan au-delà)
    const G = 3000, f = coupe.fin, u = [f.n[1], -f.n[0]], ex = mul(f.n, -f.garde * G);
    const a = add(f.A, mul(u, -G)), b = add(f.A, mul(u, G));
    coupe.region = [versCL(positif([a, b, add(b, ex), add(a, ex)]))];
  } else if (coupe && !coupe.plein) {
    // juste ce qui déborde la dernière section : une bande à peine plus large que le membre (le bras replié
    // revient le long de l'avant-bras : une coupe large et profonde mordait la main)
    const A = coupe.a, B = coupe.b, ax = coupe.ax, lAB = Math.max(1, lon(sub(B, A))), G = 1.5 * lAB;
    const dem = [add(A, mul(sub(A, B), 0.18)), add(B, mul(sub(B, A), 0.18))];
    coupe.region = [versCL(positif([dem[0], dem[1], add(dem[1], mul(ax, G)), add(dem[0], mul(ax, G))]))];
  }
  // le pli du coude replié : le bord de l'avant-bras là où il s'appuie sur le bras, loin de l'articulation
  for (const P of pieces) if (P.plisCoude) {
    const pc = P.plisCoude;
    // (le bras un peu gonflé : replié serré, les deux bords se longent, et le trait sortait en tirets)
    const ls = bordsDans(union(pc.fa), decale(union(pc.br), 0.8));
    P.plis = lignesHors(ls, [versCL(positif(disque(pc.centre, pc.r, 40)))]).filter(l => longueur(l) > 6);
    delete P.plisCoude;
  }

  // de profil, l'objet qui vient vers l'œil est coupé au ras de la main (profil.js, agent 2) : sa face coupée
  // se dessine (g.coupe), la partie proche ne couvre plus le poing
  let obVue = pose.objet, coupeObjet = null;
  if (obVue && F.ext && typeof F.ext.objetDeVue === 'function' && obVue.coupe !== false) {
    try { const r = F.ext.objetDeVue(obVue, sq, M, { demiAxes, F }); if (r && r.objet) { obVue = r.objet; coupeObjet = r.coupe || null; } }
    catch (e) { if (process.env.MAINS_DEBUG) console.error('objetDeVue :', e.message); }
  }
  const ob = obVue ? objetVue(obVue, M) : null;
  if (ob) ob.coupe = coupeObjet;
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
    rel.push({ A: i, B: j, fondu: fondu(A, B), joint: A.groupe === B.groupe && A.groupe !== 'base' && Math.abs(A.rang - B.rang) === 1, avant: s, I });
  }
  return rel;
}
// devant(i, j) : la pièce i passe-t-elle devant la pièce j ?
const PRIORITE = { dos: ['majeur', 'annulaire', 'index', 'auriculaire', 'pouce'], paume: ['pouce', 'index', 'auriculaire', 'annulaire', 'majeur'],
  pouce: ['pouce', 'index', 'majeur', 'annulaire', 'auriculaire'], auriculaire: ['auriculaire', 'annulaire', 'majeur', 'index', 'pouce'] };

// ─── la construction du dessin (repère de la vue, mm) ─────────────────────────────────────────────────────
function dessiner(o, prep = null) {
  const _t = [Date.now()]; const T_ = n => { if (process.env.MAINS_T) { const t = Date.now(); console.error(n, t - _t[_t.length - 1]); _t.push(t); } };
  const C = construire(o, prep); T_('construire');
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
        // la profondeur, point par point sur le recouvrement (une grille de ~1,2 mm) : si l'objet passe en partie
        // devant, en partie derrière la même phalange (un fil entre deux doigts), la phalange est partagée par la
        // droite qui sépare le mieux les deux (agent 5, M1) ; sinon elle est devant ou derrière d'un bloc
        const b = boiteCL(I), nx = Math.max(4, Math.min(22, Math.ceil((b.x1 - b.x0) / 1.2))), ny = Math.max(4, Math.min(22, Math.ceil((b.y1 - b.y0) / 1.2)));
        const F_ = [], B_ = [];
        for (let a = 0; a < nx; a++) for (let c = 0; c < ny; c++) {
          const pt = [b.x0 + (b.x1 - b.x0) * (a + 0.5) / nx, b.y0 + (b.y1 - b.y0) * (c + 0.5) / ny];
          if (!dedans(I, pt)) continue;
          const zo = ob.devant(pt); if (!isFinite(zo)) continue;
          (profondeur(P, pt).devant < zo ? F_ : B_).push(pt);
        }
        const nT = F_.length + B_.length;
        dev = nT ? F_.length / nT > 0.5 : true;
        // pas quand l'objet est coupé de profil : sa face coupée est au plan de la face proche des doigts qui
        // l'entourent, ils sont à sa profondeur et la droite la mordait en dents de scie (agent 5, tour 2)
        if (!ob.coupe && nT >= 6 && F_.length / nT > 0.1 && F_.length / nT < 0.9) {
          const moy = L => L.reduce((m, q) => [m[0] + q[0] / L.length, m[1] + q[1] / L.length], [0, 0]);
          const nrm = uni(sub(moy(F_), moy(B_)));
          const T = F_.map(q => [dot(q, nrm), 1]).concat(B_.map(q => [dot(q, nrm), 0])).sort((u, v) => u[0] - v[0]);
          // le seuil qui classe le mieux : à gauche les « derrière », à droite les « devant »
          let err = F_.length, best = err, tau = T[0][0] - 1;
          for (let k = 0; k < T.length; k++) { err += T[k][1] ? -1 : 1; if (err < best) { best = err; tau = k + 1 < T.length ? (T[k][0] + T[k + 1][0]) / 2 : T[k][0] + 1; } }
          const G_ = 400, c0 = mul(nrm, tau), tg = [-nrm[1], nrm[0]];
          const demi = [versCL(positif([add(c0, mul(tg, -G_)), add(c0, mul(tg, G_)), add(add(c0, mul(tg, G_)), mul(nrm, G_)), add(add(c0, mul(tg, -G_)), mul(nrm, G_))]))];
          P.partDevant = inter(P.region, demi);
          P.coupeObjet = decale([versCL(positif([add(c0, mul(tg, -G_)), add(c0, mul(tg, G_)), add(c0, add(mul(tg, G_), mul(nrm, 0.01))), add(c0, add(mul(tg, -G_), mul(nrm, 0.01)))]))], 0.4);
          dev = true;
        }
      }
      if (dev) devantObjet.add(i);
    });
    // une phalange qui ne fait qu'effleurer le bord de l'objet (moins de 12 % de son aire dessus) suit, pour la
    // peinture, sa voisine du même doigt qui y est franchement : sinon le doigt change de côté à l'articulation,
    // au ras du bord, et la couche de devant y fait une marche (agent 5, M12 : l'index de prise-pouce-dos de
    // profil, qui passe derrière le manche après une P1 peinte devant ; M13 : la P1 derrière la face coupée de
    // prise-grosse, sous une P2 devant, une encoche dans le bord de la face). Devant → derrière : la phalange
    // n'est plus repeinte sur l'objet, mais le doigt reste « devant » pour le gris (il fait le tour, il reste blanc).
    if (!imposes && !process.env.MAINS_SANS_BASCULE) {
      const parId = new Map(pieces.map((P, i) => [P.id, i]));
      const voisins = id => { const m = /^(\w+)\.p(\d)$/.exec(id); if (!m) return []; const k = +m[2]; return [k - 1, k + 1].map(j => parId.get(`${m[1]}.p${j}`)).filter(j => j !== undefined); };
      const bascule = [];
      pieces.forEach((P, i) => {
        if (!P.surObjet || P.partObjet >= 0.12) return;
        let v = null;
        for (const j of voisins(P.id)) { const Q = pieces[j]; if (Q.surObjet && !Q.partDevant && Q.partObjet > Math.max(0.1, 1.8 * P.partObjet) && (!v || Q.partObjet > pieces[v].partObjet)) v = j; }
        if (v !== null && devantObjet.has(v) !== devantObjet.has(i)) bascule.push([i, devantObjet.has(v)]);
      });
      for (const [i, dev] of bascule) { if (dev) devantObjet.add(i); else pieces[i].pasRepeinte = true; }
    }
    if (process.env.MAINS_DBG_OBJ) pieces.forEach((P, i) => { if (P.surObjet) console.error(P.id, 'part', P.partObjet.toFixed(3), devantObjet.has(i) ? 'DEVANT' : 'derriere', P.pasRepeinte ? '(pas repeinte)' : ''); });
  }
  // ── les doigts entiers (groupes) : leur contour, leurs sphères, l'ordre entre eux ──
  const groupes = new Map();
  pieces.forEach((P, i) => { if (!groupes.has(P.groupe)) groupes.set(P.groupe, { nom: P.groupe, ids: [], spheres: [] }); const G = groupes.get(P.groupe); G.ids.push(i); G.spheres.push(...P.spheres); });
  for (const G of groupes.values()) {
    G.region = unionCL(G.ids.map(i => pieces[i].region)); G.boite = boiteCL(G.region); G.aire = Math.abs(aireCL(G.region));
    G.base = G.nom === 'base';
  }
  // l'ordre entre deux doigts : la moyenne, pondérée par les recouvrements, de l'écart de profondeur
  const ordreG = new Map();
  {
    const acc = new Map();
    for (const R of rel) {
      const a = pieces[R.A].groupe, b = pieces[R.B].groupe;
      if (a === b || a === 'base' || b === 'base') continue;
      const w = Math.max(0.5, Math.abs(aireCL(R.I))), k = a < b ? a + ',' + b : b + ',' + a, sg = a < b ? 1 : -1;
      const v = acc.get(k) || { s: 0, w: 0 }; v.s += sg * w * R.avant; v.w += w; acc.set(k, v);
    }
    for (const [k, v] of acc) {
      const [a, b] = k.split(','); let m = v.s / v.w, aDevant = m < 0;
      if (Math.abs(m) < 0.6) aDevant = prio.indexOf(a) <= prio.indexOf(b);
      ordreG.set(a + ',' + b, aDevant); ordreG.set(b + ',' + a, !aDevant);
    }
  }
  // la profondeur du bord d'un groupe en p : la sphère la plus proche de l'œil dont le cercle passe par p
  const rim = (G, p) => {
    let best = Infinity, near = Infinity, dmin = Infinity;
    for (const q of G.spheres) {
      const d = Math.hypot(p[0] - q.x, p[1] - q.y), e = Math.abs(d - q.r);
      if (e < Math.max(1.2, 0.18 * q.r) && q.z < best) best = q.z;
      if (e < dmin) { dmin = e; near = q.z; }
    }
    return isFinite(best) ? best : near;
  };
  const devantG = (G, p) => { let z = Infinity; for (const i of G.ids) { const P = pieces[i]; if (p[0] < P.boite.x0 - 1 || p[0] > P.boite.x1 + 1 || p[1] < P.boite.y0 - 1 || p[1] > P.boite.y1 + 1) continue; z = Math.min(z, profondeur(P, p).devant); } return z; };

  // la face loin de la paume, dans cette vue
  let loinPaume = null;
  { const Pa = pieces.find(P => P.id === 'paume'); if (Pa) { loinPaume = -Infinity; for (const q of Pa.spheres) loinPaume = Math.max(loinPaume, q.z + q.r * 0.8); } }
  // ── les teintes : un doigt entier derrière l'objet, ou caché pour moitié par ce qui passe devant lui ──
  pieces.forEach(P => { P.gris = !!o.loin; });
  const loinImp = [].concat((pose.loin && pose.loin[vue]) || [], (C.F.ext && C.F.ext.loin && C.F.ext.loin[vue]) || []);
  for (const G of groupes.values()) {
    if (G.base) continue;
    let gris = loinImp.includes(G.nom) || G.ids.some(i => loinImp.includes(pieces[i].id));
    // derrière l'objet : le doigt entier, si aucune de ses phalanges ne passe devant lui et qu'une s'y cache (le
    // doigt qui fait le tour d'un manche reste blanc ; celui qui passe derrière une barre est gris)
    if (!gris && ob && ob.region.length) {
      const devant = G.ids.some(i => devantObjet.has(i));
      // derrière un objet mince (un fil, une ficelle : moins de 8 mm), il faut que le doigt y soit caché pour une
      // part sensible (le quart de son aire) : un fil qui passe devant un doigt ne le rend pas gris (pince
      // latérale : l'index restait gris derrière une ficelle de 3 mm) ; agent 5, révision. Derrière un manche,
      // la règle d'avant : une phalange qui s'y cache.
      let derriere;
      // (de même derrière la face coupée d'un manche de profil : elle est au plan de la face proche des doigts qui
      // l'entourent, elle les recouvre un peu sans les cacher ; agent 5, tour 2)
      if ((ob.r || 16) < 4 || ob.coupe) {
        let cache = 0;
        for (const i of G.ids) if (pieces[i].surObjet && !devantObjet.has(i)) cache += pieces[i].partObjet * Math.abs(aireCL(pieces[i].region));
        derriere = cache > 0.25 * G.aire;
      } else derriere = G.ids.some(i => pieces[i].surObjet && !devantObjet.has(i) && pieces[i].partObjet > 0.05);
      if (!devant && derriere) gris = true;
    }
    // caché pour plus de moitié par les doigts devant lui. Le pouce ne compte pas : il passe devant l'index dans
    // la pince et le poing vus de côté, et l'index, l'acteur de la pince, devenait gris (agent 5, révision) ;
    // le gris reste celui des doigts loin, cachés derrière les doigts proches
    let devantLui = [], devantPouce = [];
    for (const H of groupes.values()) if (H !== G && !H.base && seCroisent(G.boite, H.boite) && ordreG.get(H.nom + ',' + G.nom)) (H.nom === 'pouce' ? devantPouce : devantLui).push(...H.region);
    // (de profil, non : les doigts repliés derrière l'index restent blancs, en marches séparées par leurs traits,
    // comme dans la référence 5.jpg ; agent 2, tour 2)
    const profilV = vue === 'pouce' || vue === 'auriculaire';
    if (!gris && !profilV && devantLui.length && Math.abs(aireCL(inter(G.region, unionCL([devantLui])))) > 0.55 * G.aire) gris = true;
    // de l'autre côté de la paume : ce qu'on en voit est plus loin que la face loin de la paume (le pouce vu côté
    // auriculaire, le pouce qui tient le manche vu du dos)
    if (!gris && loinPaume !== null) {
      const caches = devantLui.concat(devantPouce);
      for (const j of groupes.get('base').ids) caches.push(...pieces[j].region);
      const vis = moins(G.region, unionCL([caches]));
      const ech = vis.length ? echantillons(vis, 7) : [];
      if (ech.length >= 3) {
        let z = 0; for (const p of ech) z += devantG(G, p);
        if (z / ech.length > loinPaume) gris = true;
      }
    }
    if (gris) for (const i of G.ids) pieces[i].gris = true;
  }
  // un doigt gris qui ne dépasse de ce qui est devant lui que d'un filet (moins de 2 mm de large, ou moins de
  // 25 mm²) : ce filet ne se dessine pas (il doublerait la silhouette)
  {
    const blancs = pieces.filter(P => !P.gris).map(P => P.region);
    const devantTout = blancs.length ? unionCL(blancs) : [];
    for (const G of groupes.values()) {
      const gr = G.ids.filter(i => pieces[i].gris);
      if (G.base || !gr.length || o.loin) continue;
      const vis = moins(unionCL(gr.map(i => pieces[i].region)), devantTout), jette = [];
      for (const cp of composantes(vis)) if (Math.abs(aireCL(cp)) < 25 || !ouvre(cp, 2.0).length) jette.push(...cp);
      if (!jette.length) continue;
      const J = decale(jette, 0.2);
      for (const i of gr) { pieces[i].region = moins(pieces[i].region, J); pieces[i].boite = boiteCL(pieces[i].region); }
      G.region = unionCL(G.ids.map(i => pieces[i].region)); G.boite = boiteCL(G.region);
    }
  }
  // de même, une pièce cachée derrière l'objet qui n'en dépasse que d'un ergot (moins de 3 mm de large, ou moins de
  // 20 mm²), là où rien d'autre de la main ne la prolonge : ce bout ne se dessine pas, il bosselait le bord de
  // l'objet (agent 5, M12 : le bout de l'index au haut du manche de prise-pouce-dos, de profil)
  if (ob && ob.region.length) {
    pieces.forEach((P, i) => {
      if (!P.surObjet || (devantObjet.has(i) && !P.pasRepeinte) || P.groupe === 'base') return;
      const autres = pieces.filter((Q, j) => j !== i).map(Q => Q.region);
      const vis = moins(P.region, unionCL([ob.region, ...autres]));
      const jette = [];
      for (const cp of composantes(vis)) if (Math.abs(aireCL(cp)) < 20 || !ouvre(cp, 1.5).length) jette.push(...cp);
      if (!jette.length) return;
      P.region = moins(P.region, decale(jette, 0.2)); P.boite = boiteCL(P.region);
      const G = groupes.get(P.groupe); G.region = unionCL(G.ids.map(k => pieces[k].region)); G.boite = boiteCL(G.region);
    });
  }
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
  const zoneP = [versCL(positif(disque([0, 0], 38 * kL, 48)))];
  const poignetRond = inter(ferme(inter(tout, [versCL(positif(disque([0, 0], 70 * kL, 48)))]), 16 * kL), zoneP);
  // les raccords de profil (profil.js, agent 2, P4) : le coin rentrant entre la pulpe du doigt tendu et le dos de
  // la P1 repliée voisine, arrondi (sans lui, un coin net à la racine de l'index : la pointe, deux-doigts)
  const rac = [];
  if (C.F.ext && typeof C.F.ext.raccords === 'function') {
    try { for (const r of C.F.ext.raccords(C.sq, vue, C.M) || []) rac.push(inter(ferme(inter(tout, [versCL(positif(disque(r.c, r.zone * 2, 48)))]), r.r), [versCL(positif(disque(r.c, r.zone, 48)))])); }
    catch (e) { if (process.env.MAINS_DEBUG) console.error('raccords :', e.message); }
  }
  let U = lisserCL(ferme(unionCL([tout, poignetRond, ...rac]), 1.2), 0.7, 5, { c: [0, 0], r: 42 * kL });
  if (coupe && coupe.region) U = moins(U, coupe.region);
  // un trou mince dans la silhouette (moins de 6 mm de large, ou moins de 60 mm²) : une fente entre le pouce et
  // l'index, entre deux doigts qui se touchent presque ; dessiné, il se lit comme une faute (une boutonnière).
  // On le bouche ; un vrai jour entre le pouce et l'index (la pince ouverte) reste. (agent 5, révision)
  U = U.filter(P => {
    if (CL.Clipper.Orientation(P)) return true;
    const trou = [P.slice().reverse()];
    return !(Math.abs(aireCL(trou)) < 60 || !ouvre(trou, 3.0).length);
  });
  T_('U');
  // ── les traits intérieurs : le bord d'un doigt (ou de la paume) qui passe devant autre chose ──
  // Un doigt devant un autre doigt : le contour du doigt de devant, là où il touche ou recouvre l'autre (une
  // seule ligne entre deux doigts serrés). Un doigt et la paume : seulement là où l'un passe nettement devant
  // l'autre (le doigt replié sur la paume) ; à la racine, ils se fondent. Deux phalanges d'un même doigt : rien.
  const traits = pieces.map(() => []);                   // rangés par pièce : la première du groupe
  for (const G of groupes.values()) { G.retrait = decale(G.region, -E); G.gonfle = decale(G.region, 1.3); G.bord = contourDe(G.region); }
  for (const P of pieces) Object.defineProperty(P, 'retrait', { configurable: true, get() { const v = decale(P.region, -E); Object.defineProperty(P, 'retrait', { value: v }); return v; } });
  const Uin = decale(U, -E);
  // (dans l'arrondi d'un raccord, un bout de contour de doigt restait en ergot : on l'y retire)
  const UinR = rac.length ? moins(Uin, decale(moins(unionCL(rac), tout), 1.2)) : Uin;
  const dansBoite = (B, p) => p[0] >= B.x0 && p[0] <= B.x1 && p[1] >= B.y0 && p[1] <= B.y1;
  const parPoints = (ls, garder) => {
    const out = [];
    for (const l of densifier(ls, 1.2)) {
      let run = [];
      for (const p of l) { if (garder(p)) run.push(p); else { if (run.length > 1) out.push(run); run = []; } }
      if (run.length > 1) out.push(run);
    }
    return out;
  };
  const listeG = [...groupes.values()];
  // la racine de chaque doigt, vue : là où il sort de la paume
  const racines = new Map();
  for (const d of DOIGTS.concat(['pouce'])) { const q = matVec(C.M, C.sq.points[d + '.mcp']); racines.set(d, [q[0], q[1]]); }
  for (const A of listeG) {
    // les bords candidats : le contour de A dans ce qu'il recouvre
    const bordsA = A.base ? null : A.bord;
    let ls = [];
    for (const B of listeG) {
      if (B === A || !seCroisent(A.boite, B.boite, 1)) continue;
      if (!A.base && !B.base) {
        if (ordreG.get(A.nom + ',' + B.nom)) ls.push(...lignesDans(bordsA, B.gonfle));
        continue;
      }
      if (A.base && B.base) continue;
      if (!A.base) {
        // un doigt sur la paume ou l'avant-bras : à sa racine, l'écart de profondeur décide (ils se fondent) ; plus
        // loin, le doigt qui passe devant a son bord, même posé sur la paume (le bout d'un doigt replié : sans ça,
        // son contour restait ouvert en « J », agent 5, M5)
        const rac = racines.get(A.nom), rR = 28 * C.sq.age.kL;
        for (const j of B.ids) {
          const Bp = pieces[j];
          ls.push(...parPoints(lignesDans(bordsA, Bp.retrait), p => {
            const gap = profondeur(Bp, p).devant - rim(A, p);
            return gap > SEUIL || (rac && Math.hypot(p[0] - rac[0], p[1] - rac[1]) > rR && gap > -0.5);
          }));
        }
      } else {
        // la paume (ou l'avant-bras) devant un doigt
        for (const i of A.ids) {
          const Ap = pieces[i];
          ls.push(...parPoints(bordsDans(Ap.region, B.retrait), p => devantG(B, p) - profondeurAxe(Ap, p) > SEUIL));
        }
      }
    }
    if (!ls.length) continue;
    ls = recoller(ls);
    // caché : par un doigt devant A (l'ordre des doigts), par la paume quand elle passe devant le bord de A
    const devantA = [];
    for (const H of listeG) {
      if (H === A || H.base || A.base || !seCroisent(A.boite, H.boite)) continue;
      if (ordreG.get(H.nom + ',' + A.nom)) devantA.push(...H.region);
    }
    if (devantA.length) ls = lignesHors(ls, unionCL([devantA]));
    const autres = listeG.filter(H => H !== A && (H.base || A.base) && seCroisent(A.boite, H.boite));
    if (autres.length) ls = parPoints(ls, p => {
      const za = A.base ? null : rim(A, p);
      for (const H of autres) {
        if (!dansBoite(H.boite, p)) continue;
        if (H.base) { for (const j of H.ids) { const Hp = pieces[j]; if (dansBoite(Hp.boite, p) && profondeur(Hp, p).devant < (za === null ? Infinity : za) - SEUIL && dedans(Hp.region, p)) return false; } }
        else if (A.base) { const zA = Math.min(...A.ids.map(i => profondeurAxe(pieces[i], p))); if (devantG(H, p) < zA - SEUIL && dedans(H.region, p)) return false; }
      }
      return true;
    });
    ls = lignesDans(ls, UinR);
    traits[A.ids[0]] = recoller(ls).filter(l => longueur(l) > 2.5);
  }
  // la manchette du gant : son bord dans la main (le cuir qui finit sur le poignet)
  pieces.forEach((P, i) => {
    if (!P.bordTrait) return;
    const autres = unionCL(pieces.filter(Q => Q !== P).map(Q => Q.region));
    traits[i] = traits[i].concat(lignesDans(bordsDans(P.region, decale(autres, -E)), Uin));
  });
  // le pli du coude (avantbras.bras replié)
  pieces.forEach((P, i) => { if (P.plis && P.plis.length) traits[i] = traits[i].concat(lignesDans(P.plis, Uin)); });
  // une ligne courte qui ne part pas du contour est une saleté
  const rive = decale(U, -(E + 1.6));
  for (let i = 0; i < n; i++) traits[i] = traits[i].filter(l => longueur(l) > 12 || !dedans(rive, l[0]) || !dedans(rive, l[l.length - 1]));   // 9 → 12 : un tiret flottant de 9 à 12 mm sur les jointures du poing (agent 5, tour 2)
  // une fourche : un bout de contour de la paume (la jointure qui passe devant la racine d'un doigt plié),
  // court, qui part du trait entre deux doigts ou y arrive ; il fait un crochet ou un Y au pied du trait (vues
  // dos et paume des prises). On le laisse tomber. (agent 5, révision)
  {
    const base = groupes.get('base');
    const iB = base ? base.ids[0] : -1;
    const tDoigts = [];
    for (const G of groupes.values()) if (!G.base) tDoigts.push(...traits[G.ids[0]]);
    if (iB >= 0 && traits[iB].length && tDoigts.length) {
      const dSeg = (p, a, b) => { const ab = sub(b, a), l2 = dot(ab, ab) || 1e-9, t = Math.max(0, Math.min(1, dot(sub(p, a), ab) / l2)); return lon(sub(p, add(a, mul(ab, t)))); };
      const pres = (p, l, d) => { for (let k = 1; k < l.length; k++) if (dSeg(p, l[k - 1], l[k]) < d) return true; return false; };
      const touche = l => tDoigts.some(m => pres(l[0], m, 2.5) || pres(l[l.length - 1], m, 2.5) || pres(m[0], l, 2.5) || pres(m[m.length - 1], l, 2.5));
      // (ou une épingle : un aller-retour plus long, dont les deux bouts sont proches, doublé sur le trait du doigt ;
      // agent 5, tour 2)
      const epingle = l => lon(sub(l[0], l[l.length - 1])) < 0.35 * longueur(l);
      traits[iB] = traits[iB].filter(l => (longueur(l) > 22 && !(epingle(l) && longueur(l) < 40)) || !touche(l));
    }
  }

  T_('traits');
  // l'objet : le blanc sous lui dans la main, et les pièces de devant à repeindre là où il passe
  let patch = null;
  if (ob && ob.region.length) {
    patch = { dansMain: inter(ob.region, U), parMarge: new Map(), regDev: null };
    const dev = [...devantObjet].filter(i => !pieces[i].pasRepeinte);
    if (dev.length) {
      patch.regDev = unionCL(dev.map(i => pieces[i].partDevant || pieces[i].region));
      patch.tDev = lignesDans(traits.flat(), decale(patch.regDev, -0.2));
      // le bord des pièces de devant, sans la droite qui partage une phalange (là, le doigt et l'objet se touchent)
      const coupesObj = dev.filter(i => pieces[i].coupeObjet).map(i => pieces[i].coupeObjet);
      patch.bordDev = coupesObj.length ? lignesHors(contourDe(patch.regDev), unionCL(coupesObj)) : contourDe(patch.regDev);
      patch.Ug = decale(U, 0.2);
    }
    patchPour(patch, ob.region);
  }
  T_('patch');
  // ce que le rendu garde (le cache) : le reste (enveloppes, sphères, intersections) est jeté
  return {
    C: { pose: { objet: C.pose.objet }, sq: { points: C.sq.points, extremites: C.sq.extremites, segments: C.sq.segments, age: C.sq.age }, M: C.M, F: C.F },
    pieces: pieces.map(P => ({ id: P.id, groupe: P.groupe, region: P.region, gris: P.gris })),
    U, traits, peint, devantObjet, vue, patch,
    ob: ob ? { region: ob.region, A: ob.A, raccourci: ob.raccourci, bouts: ob.bouts, coupe: ob.coupe } : null,
    coupe: coupe ? { a: coupe.a, b: coupe.b, region: coupe.region, plein: coupe.plein } : null,
  };
}
// la marge (mm) couvre le trait de l'objet et son anticrénelage : 2,4 de vue au moins (le trait de contour du
// livre, dont la moitié déborde de la région de l'objet) ; calculée au rendu, selon l'échelle
function patchPour(patch, regionObjet) {
  patch.parMarge = new Map();
  // mm : la marge le long des bords de l'objet (elle couvre son trait, jusqu'à 2,4 de vue, et son
  // anticrénelage) ; le long des pièces de devant, le blanc ne déborde que de 0,25 mm (plus, il posait un liseré
  // blanc sur l'objet entre les doigts : agent 5, C8)
  // les traits (le bord des pièces de devant, leurs traits intérieurs) ne débordent l'objet que de mmT : la moitié
  // de son trait. Plus loin, la couche du dessous les dessine déjà ; un bout de contour de doigt qui longeait le
  // bord de l'objet dans la marge du blanc y faisait un ergot (agent 5, M13 : la face coupée de prise-grosse)
  patch.pour = (mm, mmT = mm) => {
    const k = Math.round(mm * 5) / 5, kT = Math.min(k, Math.round(mmT * 10) / 10), cle = k + ',' + kT;
    if (patch.parMarge.has(cle)) return patch.parMarge.get(cle);
    let v = { fond: [], bord: [], traits: [] };
    if (patch.regDev) {
      const ext = decale(regionObjet, k), extT = kT < k ? decale(regionObjet, kT) : ext;
      v = { fond: inter(ext, inter(decale(patch.regDev, 0.25), patch.Ug)), bord: lignesDans(patch.bordDev, extT), traits: lignesDans(patch.tDev, extT) };
    }
    patch.parMarge.set(cle, v);
    return v;
  };
  return patch;
}
// ─── le cache sur disque : une construction se garde d'un processus à l'autre (une planche par processus) ────
// La clé porte la date des fichiers qui la font (moteur, poses, profil, prises, proportions) : un fichier qui
// change rend les anciennes constructions caduques. Le dossier : MAINS_CACHE, ou le dossier temporaire.
const os = require('os');
const crypto = require('crypto');
const DOSSIER_CACHE = process.env.MAINS_CACHE || path.join(os.tmpdir(), 'mains-simples-cache');
function versionSources() {
  return ['moteur.js', 'poses.json', 'profil.js', 'prises.js', 'proportions.json'].map(f => { try { return fs.statSync(path.join(__dirname, f)).mtimeMs; } catch (e) { return 0; } }).join(',');
}
const plat = paths => paths.map(P => { const a = new Array(P.length * 2); P.forEach((q, i) => { a[2 * i] = q.X; a[2 * i + 1] = q.Y; }); return a; });
const deplat = A => A.map(a => { const P = []; for (let i = 0; i < a.length; i += 2) P.push({ X: a[i], Y: a[i + 1] }); return P; });
function versDisque(R) {
  const pa = R.patch;
  return JSON.stringify({
    C: { pose: R.C.pose, sq: R.C.sq, M: R.C.M },
    pieces: R.pieces.map(P => ({ id: P.id, groupe: P.groupe, region: plat(P.region), gris: P.gris })),
    U: plat(R.U), traits: R.traits, peint: R.peint, devantObjet: [...R.devantObjet], vue: R.vue,
    ob: R.ob ? Object.assign({}, R.ob, { region: plat(R.ob.region) }) : null,
    coupe: R.coupe ? Object.assign({}, R.coupe, { region: R.coupe.region ? plat(R.coupe.region) : null }) : null,
    patch: pa ? { dansMain: plat(pa.dansMain), regDev: pa.regDev ? plat(pa.regDev) : null, tDev: pa.tDev || [], bordDev: pa.bordDev || [], Ug: pa.Ug ? plat(pa.Ug) : null } : null,
  });
}
function deDisque(txt, F) {
  const J = JSON.parse(txt);
  const R = {
    C: { pose: J.C.pose, sq: J.C.sq, M: J.C.M, F },
    pieces: J.pieces.map(P => Object.assign(P, { region: deplat(P.region) })),
    U: deplat(J.U), traits: J.traits, peint: J.peint, devantObjet: new Set(J.devantObjet), vue: J.vue,
    ob: J.ob ? Object.assign(J.ob, { region: deplat(J.ob.region) }) : null,
    coupe: J.coupe ? Object.assign(J.coupe, { region: J.coupe.region ? deplat(J.coupe.region) : null }) : null,
    patch: null,
  };
  if (J.patch) {
    R.patch = { dansMain: deplat(J.patch.dansMain), regDev: J.patch.regDev ? deplat(J.patch.regDev) : null, tDev: J.patch.tDev, bordDev: J.patch.bordDev, Ug: J.patch.Ug ? deplat(J.patch.Ug) : null };
    patchPour(R.patch, R.ob ? R.ob.region : []);
  }
  return R;
}
function lireDisque(cle, F) {
  if (process.env.MAINS_CACHE === '0') return null;
  try { const f = path.join(DOSSIER_CACHE, cle + '.json'); if (!fs.existsSync(f)) return null; return deDisque(fs.readFileSync(f, 'utf8'), F); } catch (e) { return null; }
}
function ecrireDisque(cle, R) {
  if (process.env.MAINS_CACHE === '0') return;
  try {
    fs.mkdirSync(DOSSIER_CACHE, { recursive: true });
    const f = path.join(DOSSIER_CACHE, cle + '.json'), tmp = f + '.' + process.pid + '.tmp';
    fs.writeFileSync(tmp, versDisque(R)); fs.renameSync(tmp, f);
    // de temps en temps, les constructions de plus de trois jours s'en vont
    if (Math.random() < 0.02) for (const n of fs.readdirSync(DOSSIER_CACHE)) { const g = path.join(DOSSIER_CACHE, n); try { if (Date.now() - fs.statSync(g).mtimeMs > 3 * 864e5) fs.unlinkSync(g); } catch (e) { /* un autre processus */ } }
  } catch (e) { /* le cache n'est qu'un raccourci */ }
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
const CACHE = new Map(), CACHE_PREP = new Map();
let N_CLIP = 0;
function mainSimple(o = {}) {
  const vue = o.vue || 'dos';
  const s = o.echelle || 1;
  // l'avant-bras vers un point de la vue : la direction, dans le repère local de la vue (avant le miroir,
  // l'angle et l'échelle) — calculée après le placement, d'où deux passes si ancre ≠ poignet
  const cleBase = { pose: o.pose, vue, rotation: o.rotation, doigts: o.doigts, poignet: o.poignet, diametre: o.diametre,
    age: o.age, loin: !!o.loin, objetPose: o.objetPose, gant: o.gant || null, presentation: o.presentation };
  const ab = o.avantbras === false ? false : Object.assign({}, o.avantbras || {});
  const m = o.cote === 'gauche' ? -1 : 1;
  const ang = o.angle || 0;
  // local (vue, mm) → vue : miroir en y, rotation, échelle, translation
  const Tloc = (p, X, Y) => { const q = tourne([p[0], m * p[1]], ang); return [X + s * q[0], Y + s * q[1]]; };
  const Tinv = (P, X, Y) => { const q = tourne([(P[0] - X) / s, (P[1] - Y) / s], -ang); return [q[0], m * q[1]]; };
  // première passe : la géométrie (pour l'ancre)
  const clePrep = JSON.stringify(cleBase);
  let prep = CACHE_PREP.get(clePrep);
  if (!prep) { prep = preparer(o); CACHE_PREP.set(clePrep, prep); if (CACHE_PREP.size > 150) CACHE_PREP.delete(CACHE_PREP.keys().next().value); }
  const obtenir = abOpt => {
    const cle = JSON.stringify([cleBase, abOpt]);
    let R = CACHE.get(cle);
    if (!R) {
      const h = crypto.createHash('sha1').update(cle + '|' + versionSources()).digest('hex').slice(0, 24);
      R = lireDisque(h, prep.F);
      if (!R) { R = dessiner(Object.assign({}, o, { avantbras: abOpt }), prep); ecrireDisque(h, R); }
      CACHE.set(cle, R); if (CACHE.size > 150) CACHE.delete(CACHE.keys().next().value);
    }
    return R;
  };
  const ancreLoc = ancreDe({ C: prep }, o.ancre || 'prise');
  const X = (o.x || 0) - 0, Y = (o.y || 0) - 0;
  // (x, y) est l'ancre : on cherche l'origine qui l'y amène
  const a0 = Tloc(ancreLoc, 0, 0);
  const OX = X - a0[0], OY = Y - a0[1];
  let R;
  if (ab) {
    const abO = { longueur: ab.longueur, coupe: ab.coupe };
    let dirL = null;                                          // la direction de l'avant-bras, repère local de la vue
    if (ab.vers) {
      const v = Tinv(ab.vers, OX, OY);                        // le poignet est à l'origine locale
      abO.versLocal = [Math.round(v[0] * 100) / 100, Math.round(v[1] * 100) / 100];
      dirL = uni(v);
    }
    // 'bord' : la longueur qui fait sortir l'avant-bras de la boîte de la vue (plus 15 mm), le long de sa direction
    if (ab.longueur === 'bord' && ab.bord) {
      if (!dirL) { const S = prep.sq.segments.avantbras, q = matVec(prep.M, m3(S.u, -1)); dirL = uni([q[0], q[1]]); }
      const b = ab.bord, x0 = b.x0 !== undefined ? b.x0 : 0, y0 = b.y0 !== undefined ? b.y0 : 0;
      const x1 = b.x1 !== undefined ? b.x1 : x0 + b.l, y1 = b.y1 !== undefined ? b.y1 : y0 + b.h;
      const W = Tloc([0, 0], OX, OY), D = sub(Tloc(dirL, OX, OY), W);
      let t = Infinity;
      if (D[0] > 1e-9) t = Math.min(t, (x1 - W[0]) / D[0]); if (D[0] < -1e-9) t = Math.min(t, (x0 - W[0]) / D[0]);
      if (D[1] > 1e-9) t = Math.min(t, (y1 - W[1]) / D[1]); if (D[1] < -1e-9) t = Math.min(t, (y0 - W[1]) / D[1]);
      abO.versDist = Math.round(Math.max(20, (isFinite(t) ? t : 300) + 15));
    }
    const r2 = p => [Math.round(p[0] * 100) / 100, Math.round(p[1] * 100) / 100];
    // la droite de fin, dans le repère local
    if (Array.isArray(ab.fin) && ab.fin.length === 2) abO.finLocal = ab.fin.map(p => r2(Tinv(p, OX, OY)));
    // le bras : sa direction (un point de la vue, ou le pli du coude à l'écran : le miroir l'inverse), et la boîte
    // de la vue pour 'bord' (ses quatre coins, dans le repère local)
    if (ab.bras) {
      const b = ab.bras === true ? {} : ab.bras, bo = { longueur: b.longueur };
      if (Array.isArray(b.vers)) bo.versLocal = r2(Tinv(b.vers, OX, OY));
      else if (typeof b.pli === 'number') bo.pli = m * b.pli;
      if (ab.bord && b.longueur !== 'entier' && typeof b.longueur !== 'number') {
        const q = ab.bord, x0 = q.x0 !== undefined ? q.x0 : 0, y0 = q.y0 !== undefined ? q.y0 : 0;
        const x1 = q.x1 !== undefined ? q.x1 : x0 + q.l, y1 = q.y1 !== undefined ? q.y1 : y0 + q.h;
        bo.bordLocal = [[x0, y0], [x1, y0], [x1, y1], [x0, y1]].map(p => r2(Tinv(p, OX, OY)));
      }
      abO.bras = bo;
      delete abO.versDist;
    }
    R = obtenir(abO);
  } else R = obtenir(false);
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
  // une main loin (grise) ferme sa coupe : un aplat gris sans bord se lit comme une tache (agent 5, M8)
  // (sauf sur une droite de fin : elle est le bord commun des deux mains, ouvert pour l'une comme pour l'autre)
  const franche = (ab && ab.coupe === 'franche') || (o.loin && !(ab && (ab.coupe === 'ouverte' || ab.fin)));
  // (les bords s'arrêtent à un demi-trait de la coupe : leur bout rond ne dépasse pas l'aplat ; deux mains coupées à
  // la même droite de fin, celui de la main du dessous pointait sous la coupe de celle du dessus)
  if (coupe && coupe.region && !coupe.plein && !franche) silh = lignesHors(silh, decale(coupe.region, 0.4 + tr.sil / 2 / s));
  const coupeTrait = coupe && coupe.region && franche ? lignesDans(contourDe(U), decale(coupe.region, 0.4)) : [];
  if (coupeTrait.length) silh = lignesHors(silh, decale(coupe.region, 0.4));

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
  // les couches séparées (deux mains sur un même outil : les deux corps, l'objet une fois, puis les deux devants)
  const couches = { main: out.filter(Boolean).join('\n'), masque: '', devant: '' };
  const pa = R.patch;
  if (pa) {
    // le masque déborde la silhouette d'un demi-trait : sinon la moitié extérieure du contour de la main (le bord
    // de l'avant-bras, du talon) restait visible sous l'objet, à travers sa hachure (agent 5, tour 2 : 99-04)
    if (o.masque !== false && pa.dansMain.length) {
      const dm = R.ob && R.ob.region && R.ob.region.length ? inter(R.ob.region, decale(U, (tr.sil / 2 + 0.3) / s)) : pa.dansMain;
      couches.masque = plein(dm.length ? dm : pa.dansMain, loin ? GRIS : BLANC);
    }
    // les pièces devant l'objet, repeintes là où il passe : leur blanc, leur bord contre l'objet, leurs traits
    // la marge : la moitié du trait de contour de l'objet (1,2 de vue) et un peu d'anticrénelage ; plus large, elle
    // posait un liseré blanc sur l'objet le long des doigts de devant (des encoches entre les doigts, la face
    // coupée du manche « mordue ») — agent 5, révision ; c'était max(1,6 mm, 2,6 de vue)
    const pv = pa.pour(Math.max(1.0, 2.0 / s), 1.25 / s);
    // la coupe ouverte de l'avant-bras ne se redessine pas non plus là où l'objet passe derrière elle (un manche
    // qui file derrière le bout coupé du bras y laissait un tiret : agent 5, tour 2)
    const bordDev = coupe && coupe.region && !coupe.plein && !franche ? lignesHors(pv.bord, decale(coupe.region, 0.4)) : pv.bord;
    if (pv.fond.length) couches.devant = [plein(pv.fond, loin ? GRIS : BLANC), ligne(bordDev, tr.sil), ligne(pv.traits, tr.int)].filter(Boolean).join('\n');
  }
  if (o.objet !== undefined && o.objet !== null) {
    const g = Object.assign({}, geo.prise, { prise: geo.prise, poignet: geo.poignet, bout: geo.bout, pouce: geo.pouce, echelle: s, vue, geo });
    const svgObjet = typeof o.objet === 'function' ? o.objet(g) : String(o.objet);
    out.push(couches.masque, svgObjet, couches.devant);
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
  // avec un bord, chaque couche porte la même découpe
  if (ab && ab.bord) {
    const b = ab.bord, x0 = b.x0 !== undefined ? b.x0 : 0, y0 = b.y0 !== undefined ? b.y0 : 0;
    const x1 = b.x1 !== undefined ? b.x1 : x0 + b.l, y1 = b.y1 !== undefined ? b.y1 : y0 + b.h;
    for (const k of Object.keys(couches)) if (couches[k]) { const id = `mainS-${++N_CLIP}`; couches[k] = `<clipPath id="${id}"><rect x="${f1(x0)}" y="${f1(y0)}" width="${f1(x1 - x0)}" height="${f1(y1 - y0)}"/></clipPath>\n<g clip-path="url(#${id})">\n${couches[k]}\n</g>`; }
  }
  return Object.assign({ svg, toString() { return svg; }, couches }, geo);
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
    // la face coupée de l'objet (de profil) : une ellipse, centre, demi-axes et angle à l'écran
    if (ob.coupe) {
      const cc = p2(ob.coupe.centre), Av = u3(matVec(M, ob.coupe.axe)), rr = ob.coupe.r * s;
      const aa = angEcran([-Av[1], Av[0]]);
      geo.prise.coupe = { x: r1(cc[0]), y: r1(cc[1]), rx: r1(rr), ry: r1(rr * Math.abs(Av[2])), angle: r1(aa) };
      // bouts[0] est toujours le bout coupé (l'en-tête le promet ; vu côté auriculaire, l'ordre venait inversé)
      const B = geo.prise.bouts;
      if (B && Math.hypot(B[1][0] - cc[0], B[1][1] - cc[1]) < Math.hypot(B[0][0] - cc[0], B[0][1] - cc[1])) geo.prise.bouts = [B[1], B[0]];
    }
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
