// profil.js — les mains simples DE PROFIL : côté pouce et côté auriculaire (agent 2 de la bibliothèque de mains).
//
// Ce que voit une main de profil, c'est son ÉPAISSEUR : du dos à la paume. Ce fichier la porte, au format du
// moteur (mains/moteur.js, « Le format des formes de segment, par vue ») :
//
//   profil[id] = [[t, demiEpaisseurDorsale, demiEpaisseurPalmaire], …]
//     id   '<doigt>.p1' (mcp → ipp) · '<doigt>.p2' (ipp → ipd) · '<doigt>.p3' (ipd → centre de l'arrondi du bout)
//          · 'pouce.meta' (cmc → mcp : le métacarpien et l'éminence thénar) · 'pouce.p1' · 'pouce.p2'
//          · 'avantbras' (t = 0 au poignet, 1 au coude)
//     t    de 0 (articulation proximale) à 1 (distale) ; mm d'homme adulte ; interpolées en cubique monotone
//     dorsale : le côté de l'ongle, du dos de la main (+n du moteur) ; palmaire : le côté de la pulpe (−n)
//
//   paume   (lu par le moteur à chaque appel) les bosses de la paume du moteur (FORMES.paume), dont les
//           demi-axes DORSAL et PALMAIRE suivent les lignes DOS_PAUME et FACE_PAUME d'ici (les demi-axes radial
//           et ulnaire, qui font la vue de dos, restent ceux du moteur), plus le TALON de la main et les
//           COUSSINETS sous les têtes des métacarpiens. Format du moteur : { nom, c: [x, y, z], h: [le long de x,
//           radial, ulnaire, dorsal, palmaire] }, repère de la main droite, mm d'homme (le moteur met à l'âge).
//           Si le moteur n'exporte plus FORMES.paume, paume vaut undefined et il garde la sienne.
//   bosses()  les ajouts seuls (talon, coussinets), pour qui veut les poser sur sa propre paume.
//   objetDeVue(objet, sq, M, outils)  l'objet tenu coupé au ras de la main, de profil (voir plus bas).
//   loin    { vue: [pièces] } : ce qui est gris de profil quelle que soit la pose (à fusionner avec pose.loin) :
//           vu côté auriculaire, le pouce est de l'autre côté de la paume ; ce qui en dépasse est le côté loin,
//           comme le bras loin des corps.
//   tables  les tables de travail (INDEX, K, POUCE, AVANTBRAS, DOS_PAUME, FACE_PAUME…), pour les feuilles.
//
// ─── Ce que les nombres veulent dessiner (de profil) ──────────────────────────────────────────────────────────
//
// Le doigt : le dos presque droit, la pulpe qui bombe un peu sous chaque phalange, sans bourrelet ni étranglement
// aux jointures (le moteur arrondit le côté extérieur du pli ; le côté intérieur garde un pli net : c'est ce qui
// sépare un doigt d'une saucisse). Le dos est plus près de l'os que la pulpe : un doigt de profil a l'os aux
// deux cinquièmes de son épaisseur. Il s'amincit de la base au bout (≈ 21 → 14 mm pour l'index) ; la pulpe du
// bout bombe aux trois cinquièmes de la troisième phalange, puis le bout se ferme en arrondi (le moteur).
// La base de la première phalange a l'épaisseur de la tête du métacarpien côté dos : le dos de la main passe
// dans le dos du doigt sans marche à la jointure quand le doigt est tendu.
//
// La paume : épaisse au talon (≈ 42 mm, l'éminence thénar et le talon du côté paume), plus mince aux jointures
// (≈ 32 mm avec le coussinet sous la tête du métacarpien, qui déborde la racine du doigt côté paume) ; le dos
// de la main descend en pente douce du poignet aux jointures. Le talon déborde un peu sous le poignet : c'est
// lui qui dit « main » de profil.
//
// L'avant-bras : le poignet un peu plus épais que la paume aux jointures, et l'avant-bras qui s'épaissit vers le
// coude par le côté paume (les fléchisseurs) plus que par le dos ; le plus épais au tiers sous le coude ; juste
// au-dessus du pli du poignet, un rien plus mince que le poignet (les tendons). De profil : 40 au poignet, 55 à
// 9 cm, 76 au tiers sous le coude (proportions.json : poignet 37 à 44 d'épaisseur, tour d'avant-bras fléchi 310 ;
// on dessine un avant-bras d'homme ordinaire, un peu plus mince que celui d'un soldat fléchi).
//
// Le pouce : plus épais et plus large que les doigts (≈ 20 × 22 à l'IP) ; son métacarpien porte l'éminence
// thénar du côté de sa pulpe (vers la paume) : la grosse masse à la base du pouce, qui se fond dans le talon.
//
// Mains plus petites (femme, enfants) : le moteur met ces tables à l'échelle (proportions.json, agent 4).
// Feuilles de contrôle : scratchpad mains-lib/agent2/feuille-finale.js (toutes les poses, de profil, en grand et
// à la taille d'une planche), coude.js (l'avant-bras entier), ages.js, coupe.js (l'objet coupé de profil).

'use strict';

// les doigts : une table par phalange, l'index en référence ; les autres à proportion de leur épaisseur
// relevée (proportions.json, agent 4 : épaisseur à l'IPP de 20,5 / 21,8 / 20,3 / 18,1 mm, à l'IPD de 17,2 /
// 18,1 / 17,0 / 15,1). Ces épaisseurs sont celles des jointures ; le doigt dessiné n'a pas de bosse aux
// jointures : il passe un peu sous elles (18,4 à l'IPP, 15,7 à l'IPD pour l'index), et garde le rapport
// épaisseur / largeur relevé (≈ 0,9) avec les largeurs du moteur.
const INDEX = {
  p1: [[0, 10.7, 10.6], [0.22, 9.7, 11.2], [0.55, 8.9, 10.7], [0.8, 8.5, 10.2], [1, 8.3, 10.1]],
  p2: [[0, 8.3, 10.1], [0.5, 7.7, 9.5], [1, 7.1, 8.6]],
  p3: [[0, 7.0, 8.6], [0.55, 6.5, 8.9], [1, 6.0, 8.2]],
};
const K = { index: 1, majeur: 1.06, annulaire: 0.99, auriculaire: 0.88 };
const POUCE = {
  // le métacarpien : la pulpe (palmaire) porte l'éminence thénar, qui bombe au premier tiers
  meta: [[0, 11.5, 15.5], [0.35, 10.8, 18.0], [0.7, 10.2, 15.2], [0.9, 10.2, 12.4], [1, 10.3, 11.6]],
  // le pouce : ≈ 20 d'épaisseur à l'IP (tour relevé 72 mm, diamètre moyen 23)
  p1: [[0, 10.3, 11.6], [0.5, 9.6, 11.0], [1, 9.2, 10.5]],
  p2: [[0, 9.1, 10.5], [0.5, 8.3, 11.0], [1, 7.6, 9.8]],
};
// t = 0 au poignet, 1 au coude (255 mm chez l'homme). Le poignet : 39,6 (relevé : 37 à 44 selon le modèle de
// section) ; le plus épais au tiers sous le coude (76 ; diamètre moyen relevé au coude ≈ 99, avant-bras d'homme
// fort et fléchi : on dessine plus ordinaire).
const AVANTBRAS = [[0, 18.6, 21.0], [0.07, 18.4, 20.6], [0.2, 21.0, 24.5], [0.35, 24.5, 30.0], [0.5, 28.5, 35.5],
  [0.68, 32.5, 40.5], [0.8, 34.0, 42.0], [0.92, 33.5, 39.5], [1, 31.5, 35.5]];

const r2 = v => Math.round(v * 100) / 100;
const echelle = (T, k) => T.map(([t, a, b]) => [t, r2(a * k), r2(b * k)]);
const profil = {};
for (const d of Object.keys(K)) for (const p of ['p1', 'p2', 'p3']) profil[`${d}.${p}`] = echelle(INDEX[p], K[d]);
profil['pouce.meta'] = POUCE.meta;
profil['pouce.p1'] = POUCE.p1;
profil['pouce.p2'] = POUCE.p2;
profil.avantbras = AVANTBRAS;

// ─── la paume, de profil ─────────────────────────────────────────────────────────────────────────────────
// Ce que la paume doit donner de profil, le long de l'axe de la main (x, mm depuis le pli du poignet) : où
// tombent son dos (z < 0) et sa face palmaire (z > 0). Le moteur fait la paume de bosses (FORMES.paume) ; ici,
// chaque bosse qui touche le dos ou la face palmaire prend le demi-axe qui l'amène sur ces lignes, à son x ; les
// autres demi-axes (radial, ulnaire : la vue de dos) restent ceux du moteur. Les têtes des métacarpiens (les
// jointures) restent celles du moteur.
const DOS_PAUME = [[-5, -18.5], [12, -18.0], [30, -16.5], [50, -14.8], [70, -13.6], [95, -13]];
const FACE_PAUME = [[-5, 19.5], [10, 22.0], [22, 23.5], [36, 23.0], [52, 20.5], [70, 18.0], [95, 16.5]];
const lin = (T, x) => {
  if (x <= T[0][0]) return T[0][1];
  for (let i = 0; i < T.length - 1; i++) if (x <= T[i + 1][0]) { const u = (x - T[i][0]) / (T[i + 1][0] - T[i][0]); return T[i][1] + (T[i + 1][1] - T[i][1]) * u; }
  return T[T.length - 1][1];
};
// Le talon de la main : la bosse sous le carpe, côté paume (le pisiforme et la base des éminences). Les
// coussinets : sous chaque tête de métacarpien, côté paume, le gras qui fait la paume plus épaisse que le doigt
// à sa racine (≈ 33 mm à la tête du 3e métacarpien, proportions.json ; le doigt, 21). Les têtes ne bougent pas
// quand le doigt plie : ces bosses sont fixes dans la main. Leurs demi-axes radial et ulnaire restent dans la
// paume : ils ne changent rien à la vue de dos.
const TALON = { nom: 'talon', c: [17, 1, 6], h: [12, 22, 22, 8, 17.5] };
const COUSSINET = { index: 12.5, majeur: 13, annulaire: 12.5, auriculaire: 11.5 };
function bosses(M) {
  const out = [TALON];
  const an = M && M.ANATOMIE && M.ANATOMIE.doigts;
  if (an) for (const d of Object.keys(COUSSINET)) {
    const m = an[d] && an[d].mcp;
    if (!m) continue;
    out.push({ nom: 'coussinet.' + d, c: [m[0] - 7, m[1], m[2] + 4], h: [9, 8, 8, 6, COUSSINET[d]] });
  }
  return out;
}

let source = null, cache = null;
function paume() {
  let base = null, M = null;
  try { M = require('./moteur'); base = M && M.FORMES && M.FORMES.paume; } catch (e) { base = null; }
  if (!Array.isArray(base)) return undefined;               // le moteur garde la sienne
  if (base === source && cache) return cache;
  source = base;
  cache = base.map(b => {
    const [x, , z] = b.c, h = b.h.slice();
    // une bosse qui fait le dos (son bord dorsal à moins de 8 mm du dos) ou la face palmaire
    if (z - h[3] < -8) h[3] = Math.max(h[3] * 0.8, z - lin(DOS_PAUME, x));
    if (z + h[4] > 10) h[4] = Math.max(h[4] * 0.8, lin(FACE_PAUME, x) - z);
    return Object.assign({}, b, { h: h.map(v => Math.round(v * 10) / 10) });
  }).concat(bosses(M).filter(B => !base.some(b => b.nom === B.nom)));
  return cache;
}

// ─── l'objet tenu, de profil ─────────────────────────────────────────────────────────────────────────────
// Un manche tenu à pleine main traverse le poing de part en part, presque dans l'axe de la vue de profil : sa
// moitié proche vient vers l'œil et couvrirait tout le poing. Le dessin le coupe au ras de la face proche des
// doigts qui l'entourent : on voit la coupe dans le trou du poing, les doigts autour d'elle ; la moitié loin
// file derrière la paume et ne se montre que là où elle dépasse.
//   objetDeVue(objet, sq, M, { demiAxes, F }) → null (l'objet est dans le plan de la vue : rien à couper) ou
//     { objet: le cylindre raccourci (même axe, centre et longueur de la partie gardée),
//       coupe: { centre: [x, y, z] (repère de la main), axe, r } (la face coupée, à dessiner hachurée) }
//   M : la matrice de la vue (3 × 3, la 3e ligne est la profondeur, l'œil du côté des petites).
const DOIGTS = ['index', 'majeur', 'annulaire', 'auriculaire'];
function objetDeVue(objet, sq, M, outils = {}) {
  if (!objet || objet.type === 'plan' || objet.type === 'sphere' || !objet.centre || !objet.axe || !sq || !sq.segments) return null;
  const dep = p => M[2][0] * p[0] + M[2][1] * p[1] + M[2][2] * p[2];
  const A = objet.axe, dA = dep(A);
  if (Math.abs(dA) < 0.35) return null;
  const kW = (sq.age && sq.age.kW) || 1;
  let dMin = Infinity;
  for (const d of DOIGTS) for (const k of ['p1', 'p2', 'p3']) {
    const id = `${d}.${k}`, S = sq.segments[id];
    if (!S) continue;
    const w = outils.demiAxes ? outils.demiAxes(outils.F, id, 0.5, kW) : [10, 10, 9, 10];
    // la demi-épaisseur vers l'œil : le côté de la section qui regarde vers les profondeurs petites
    // (demiAxes : [radial (+r), ulnaire (−r), dorsal (+n), palmaire (−n)])
    const er = dep(S.r), en = dep(S.n);
    const h = Math.hypot(er * (er > 0 ? w[1] : w[0]), en * (en > 0 ? w[3] : w[2]));
    for (const t of [0, 0.5, 1]) dMin = Math.min(dMin, dep([0, 1, 2].map(j => S.de[j] + (S.a[j] - S.de[j]) * t)) - h);
  }
  if (!isFinite(dMin)) return null;
  const L = objet.longueur || 1200;
  const sCut = (dMin + 0.5 - dep(objet.centre)) / dA, sFar = dA > 0 ? L / 2 : -L / 2;
  if ((sFar - sCut) * Math.sign(sFar) <= 0) return null;
  const s0 = Math.min(sCut, sFar), s1 = Math.max(sCut, sFar);
  const P = s => [0, 1, 2].map(j => objet.centre[j] + A[j] * s);
  return { objet: Object.assign({}, objet, { centre: P((s0 + s1) / 2), longueur: s1 - s0 }), coupe: { centre: P(sCut), axe: A, r: (objet.diametre || 32) / 2 } };
}

module.exports = { profil, objetDeVue, loin: { auriculaire: ['pouce'] }, bosses: () => bosses((() => { try { return require('./moteur'); } catch (e) { return null; } })()), tables: { INDEX, K, POUCE, AVANTBRAS, DOS_PAUME, FACE_PAUME, TALON, COUSSINET } };
Object.defineProperty(module.exports, 'paume', { enumerable: true, get: paume });
