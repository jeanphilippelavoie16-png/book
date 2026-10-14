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
//           et ulnaire, qui font la vue de dos, restent ceux du moteur), plus le TALON de la main, le PONT du
//           pli du poignet (pas de cran entre l'avant-bras et le carpe), la CARÈNE (une rangée de bosses qui
//           porte FACE_PAUME de 8 en 8 mm : le bord palmaire en une seule courbe) et les COUSSINETS sous les têtes
//           des métacarpiens. Format du moteur : { nom, c: [x, y, z], h: [le long de x,
//           radial, ulnaire, dorsal, palmaire] }, repère de la main droite, mm d'homme (le moteur met à l'âge).
//           Si le moteur n'exporte plus FORMES.paume, paume vaut undefined et il garde la sienne.
//   bosses()  les ajouts seuls (talon, pont, carène, coussinets), pour qui veut les poser sur sa propre paume.
//   objetDeVue(objet, sq, M, outils)  l'objet tenu coupé dans le trou du poing, de profil (voir plus bas).
//   presentation(pose, vue, sq)  la petite rotation qui montre les doigts repliés d'un poing de profil.
//   raccords(sq, vue, M)  les arrondis rentrants à la racine d'un doigt tendu devant des doigts repliés.
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
// coude par le côté paume (les fléchisseurs) plus que par le dos ; le plus épais au tiers sous le coude. Côté
// paume, le pli du poignet est le creux d'une seule courbe qui va de l'avant-bras au talon puis au thénar, sans
// bosse ni cran (agent 5, P2 : trois petites bosses en chapelet). De profil : 39 au poignet, 55 à
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
// jointures : il passe un peu sous elles (19,3 à l'IPP, 16,2 à l'IPD pour l'index), et garde le rapport
// épaisseur / largeur relevé (≈ 0,9) avec les largeurs du moteur. Le dos se renfle à peine aux jointures (IPP,
// IPD) : doigt tendu, on ne le voit pas ; doigt replié, c'est l'arrondi du nez de la phalange repliée (un poing
// de profil montre ces nez en marches ; avec un dos plat, ils sortaient en rectangles : agent 5, P1).
const INDEX = {
  p1: [[0, 10.7, 10.6], [0.22, 9.7, 11.2], [0.55, 8.9, 10.7], [0.85, 8.9, 10.2], [1, 9.2, 10.1]],
  p2: [[0, 9.2, 10.1], [0.3, 8.4, 9.7], [0.7, 7.7, 9.2], [1, 7.6, 8.6]],
  p3: [[0, 7.6, 8.6], [0.55, 6.6, 8.9], [1, 6.0, 8.2]],
};
const K = { index: 1, majeur: 1.06, annulaire: 0.99, auriculaire: 0.88 };
const POUCE = {
  // le métacarpien : la pulpe (palmaire) porte l'éminence thénar, qui bombe au premier tiers
  meta: [[0, 11.5, 15.0], [0.35, 10.8, 17.0], [0.7, 10.2, 14.2], [0.9, 10.2, 12.0], [1, 10.3, 11.6]],
  // le pouce : ≈ 20 d'épaisseur à l'IP (tour relevé 72 mm, diamètre moyen 23)
  p1: [[0, 10.3, 11.6], [0.5, 9.6, 11.0], [1, 9.2, 10.5]],
  p2: [[0, 9.1, 10.5], [0.5, 8.3, 11.0], [1, 7.6, 9.8]],
};
// t = 0 au poignet, 1 au coude (255 mm chez l'homme). Le poignet : 39,6 (relevé : 37 à 44 selon le modèle de
// section) ; le plus épais au tiers sous le coude (76 ; diamètre moyen relevé au coude ≈ 99, avant-bras d'homme
// fort et fléchi : on dessine plus ordinaire).
const AVANTBRAS = [[0, 18.5, 20.4], [0.07, 18.8, 21.1], [0.2, 21.0, 24.5], [0.35, 24.5, 30.0], [0.5, 28.5, 35.5],
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
// une seule courbe du pli du poignet au pli des doigts : le creux du poignet, le talon, le thénar, puis la
// paume qui descend vers les coussinets (agent 5, P2 : pas de bosses en chapelet)
const FACE_PAUME = [[-5, 20.4], [0, 20.6], [6, 21.9], [12, 22.8], [18, 23.4], [24, 23.75], [30, 23.9], [36, 23.85],
  [42, 23.5], [48, 22.9], [54, 22.0], [60, 21.0], [66, 19.8], [75, 18.4], [95, 16.5]];
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
// Le pli du poignet : l'avant-bras s'arrête au pli, et le carpe, une bosse arrondie au bout, y laissait un cran
// dans le dos de la main. Une bosse longue et plate, à cheval sur le pli, fait le pont (dans la largeur du
// poignet : rien ne change de dos).
const PONT = { nom: 'pont-poignet', c: [2, 0, 0], h: [26, 25, 25, 18.6, 20.6] };
const COUSSINET = { index: 12.5, majeur: 13, annulaire: 12.5, auriculaire: 11.5 };
// La carène : une rangée de bosses le long de la face palmaire, au milieu de la paume, qui porte FACE_PAUME de
// 10 en 10 mm. L'enveloppe des bosses du moteur ne passe que par leurs sommets, en lignes droites de l'une à
// l'autre : seules, elles faisaient de profil un bord en marches (talon, thénar, hypothénar). Dans la largeur
// de la paume : rien ne change de dos.
// Le moteur prend chaque bosse par des points de surface aux latitudes ±15°, ±45°, ±75° (bosse()) : le sommet
// atteint 0,966 du demi-axe ; on vise donc la ligne divisée d'autant.
const K_BOSSE = 1 / Math.cos(15 * Math.PI / 180);
const CARENE = [4, 12, 20, 28, 36, 44, 52, 60].map(x => ({ nom: 'carene.' + x, c: [x, 2, 8], h: [8, 17, 17, 6, Math.round((lin(FACE_PAUME, x) - 8) * K_BOSSE * 10) / 10] }));
function bosses(M) {
  const out = [TALON, PONT, ...CARENE];
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
    if (z - h[3] < -8) h[3] = Math.max(h[3] * 0.8, (z - lin(DOS_PAUME, x)) * K_BOSSE);
    if (z + h[4] > 10) h[4] = Math.max(h[4] * 0.8, (lin(FACE_PAUME, x) - z) * K_BOSSE);
    return Object.assign({}, b, { h: h.map(v => Math.round(v * 10) / 10) });
  }).concat(bosses(M).filter(B => !base.some(b => b.nom === B.nom)));
  return cache;
}

// ─── l'objet tenu, de profil ─────────────────────────────────────────────────────────────────────────────
// Un manche tenu à pleine main traverse le poing de part en part, presque dans l'axe de la vue de profil : sa
// moitié proche vient vers l'œil et couvrirait tout le poing ; sa moitié loin file derrière la main et, sur toute
// sa longueur, le long de l'avant-bras (on lirait une planchette attachée au bras). Le dessin :
//   - coupe le manche au ras de la peau du trou du poing : la face coupée tout entière au plan de la face proche
//     des doigts qui l'entourent, rien que le pouce ne passe devant elle ; on voit un rond dans le trou du poing,
//     les doigts autour (coupée plus loin, les doigts la mordaient : agent 5, P3) ;
//   - ne garde, par défaut, que la tranche coupée (8 mm) : le corps du manche derrière la main ne se dessine pas
//     (il ressortait en boîte entre le pouce et la paume, ou longeait l'avant-bras : « une planchette attachée
//     au bras », agent 5, P3) ; objet.loin = n (mm) : le manche va jusqu'à n mm derrière la face loin des doigts
//     qui l'entourent ; objet.loin = false : toute sa longueur.
//   objetDeVue(objet, sq, M, { demiAxes, F }) → null (l'objet est dans le plan de la vue : rien à couper) ou
//     { objet: le cylindre raccourci (même axe ; bouts : la face coupée et le bout loin),
//       coupe: { centre: [x, y, z] (repère de la main), axe, r } (la face coupée, à dessiner hachurée) }
//   M : la matrice de la vue (3 × 3, la 3e ligne est la profondeur, l'œil du côté des petites).
// Conseil aux planches : de profil, dessiner la face coupée (prise.coupe, hachurée) et ne pas prolonger le manche
// au-delà de prise.bouts[1] : un manche qui doit se lire long (une hache) se montre dans une vue où il est dans
// le plan (dos, paume), ou sort de la vue d'une cassure.
const DOIGTS = ['index', 'majeur', 'annulaire', 'auriculaire'];
function objetDeVue(objet, sq, M, outils = {}) {
  if (!objet || objet.type === 'plan' || objet.type === 'sphere' || !objet.centre || !objet.axe || !sq || !sq.segments) return null;
  // un fil, une aiguille, une ficelle (moins de 8 mm) ne se coupe pas : vu par le bout, il reste un point net,
  // et coupé il sortait en petit rectangle (agent 5, P5)
  if (objet.type === 'fil' || (objet.diametre || 32) < 8) return null;
  const dep = p => M[2][0] * p[0] + M[2][1] * p[1] + M[2][2] * p[2];
  const A = objet.axe, dA = dep(A);
  // l'objet ne se coupe que s'il vient vraiment vers l'œil (à moins de 45° de l'axe de vue) : à 0,35 (70°), une
  // petite inclinaison de la vue (rotation de 25 à 50°) coupait déjà le manche, et sa face coupée flottait loin de
  // la main, sur le plan du doigt le plus proche (agent 5, révision)
  if (Math.abs(dA) < 0.7) return null;
  const kW = (sq.age && sq.age.kW) || 1;
  const R = (objet.diametre || 32) / 2, C = objet.centre;
  const distAxe = p => { const w = [0, 1, 2].map(j => p[j] - C[j]), t = w[0] * A[0] + w[1] * A[1] + w[2] * A[2]; return Math.hypot(w[0] - t * A[0], w[1] - t * A[1], w[2] - t * A[2]); };
  // les phalanges qui entourent l'objet (leur axe à moins d'une épaisseur de doigt de sa surface)
  let dAxe = Infinity, dLoin = -Infinity, dProche = Infinity;
  for (const d of DOIGTS) for (const k of ['p1', 'p2', 'p3']) {
    const id = `${d}.${k}`, S = sq.segments[id];
    if (!S) continue;
    const w = outils.demiAxes ? outils.demiAxes(outils.F, id, 0.5, kW) : [10, 10, 9, 10];
    // la demi-épaisseur vers l'œil et vers le fond (demiAxes : [radial (+r), ulnaire (−r), dorsal (+n), palmaire (−n)])
    const er = dep(S.r), en = dep(S.n);
    const hVers = Math.hypot(er * (er > 0 ? w[1] : w[0]), en * (en > 0 ? w[3] : w[2]));
    const hFond = Math.hypot(er * (er > 0 ? w[0] : w[1]), en * (en > 0 ? w[2] : w[3]));
    for (const t of [0, 0.25, 0.5, 0.75, 1]) {
      const p = [0, 1, 2].map(j => S.de[j] + (S.a[j] - S.de[j]) * t);
      if (distAxe(p) > R + Math.max(...w) + 8) continue;
      const z = dep(p);
      dAxe = Math.min(dAxe, z); dProche = Math.min(dProche, z - hVers); dLoin = Math.max(dLoin, z + hFond);
    }
  }
  if (!isFinite(dAxe)) return null;
  const L = objet.longueur || 1200, s = d => (d - dep(C)) / dA;
  // la face coupée au plan de la face proche des doigts qui l'entourent : le pouce, s'il passe devant, la couvre
  // (c'est vrai) ; plus près de l'œil, son bord penché passait devant l'index et le moteur grisait toute la main ;
  // plus loin (au plan de leur axe), les doigts la mordaient
  const sCut = s(dProche), sBout = dA > 0 ? L / 2 : -L / 2;
  let sFar = sBout;
  if (typeof objet.loin === 'number') {
    const sL = s(dLoin + objet.loin);
    if (Math.abs(sL) < Math.abs(sBout)) sFar = sL;
  } else if (objet.loin !== false) sFar = sCut + Math.sign(sBout) * 8;     // la coupe seule : un rond dans le poing
  if ((sFar - sCut) * Math.sign(sBout) <= 0) return null;
  const s0 = Math.min(sCut, sFar), s1 = Math.max(sCut, sFar);
  const P = t => [0, 1, 2].map(j => C[j] + A[j] * t);
  void dAxe;
  return { objet: Object.assign({}, objet, { centre: P((s0 + s1) / 2), longueur: s1 - s0 }), coupe: { centre: P(sCut), axe: A, r: R } };
}

// ─── la présentation d'un poing de profil ─────────────────────────────────────────────────────────────────
// Vu exactement par la tranche, un poing est une boîte : les doigts repliés sont derrière l'index, à la même
// place, et on n'en voit que des filets (agent 5, P1). Le dessinateur tourne le poing d'un quart de tour vers les
// doigts : les deuxièmes phalanges repliées se montrent en marches arrondies sous l'index (5.jpg : le pistolet,
// le pouce levé). presentation(pose, vue, sq) donne cette petite rotation de vue, à ajouter à celle de l'appel :
//   [rx, 0, 0] (degrés, autour de l'axe de la main à l'écran) — vue pouce : +rx ; vue auriculaire : −rx — quand
//   au moins deux des trois derniers doigts sont repliés (mcp + ipp ≥ 140°), que la main ne tient rien (sinon
//   l'objet décide de la vue) et que le pouce ne pince pas (son bout à plus de 28 mm de celui de l'index : une
//   pince se lit de profil franc) ; sinon null.
//   rx : 26° pour trois doigts repliés, 20° pour deux.
function presentation(pose, vue, sq) {
  if (vue !== 'pouce' && vue !== 'auriculaire') return null;
  // une main qui tient un objet garde la vue franche : c'est l'objet qui décide de la vue (la coupe du manche)
  if (pose && pose.objet && pose.objet.type !== 'plan') return null;
  const D = (pose && pose.doigts) || {};
  const plie = d => { const q = D[d] || {}; return (q.mcp || 0) + (q.ipp || 0) >= 140; };
  const n = ['majeur', 'annulaire', 'auriculaire'].filter(plie).length;
  if (n < 2) return null;
  const e = sq && sq.extremites;
  if (e && e.pouce && e.index && Math.hypot(e.pouce[0] - e.index[0], e.pouce[1] - e.index[1], e.pouce[2] - e.index[2]) < 28) return null;
  const rx = n >= 3 ? 26 : 20;
  return [vue === 'pouce' ? rx : -rx, 0, 0];
}

// ─── les raccords de profil : le coin à la racine d'un doigt tendu ──────────────────────────────────────────
// L'index tendu devant les doigts repliés (pointe, deux-doigts, appui de l'index) : vu de côté, le dessous de
// l'index et le dos du majeur replié se rencontrent à angle droit, un coin net (agent 5, P4). La peau de la
// palmure y fait un arrondi. raccords(sq, vue, M) → [{ c: [x, y] (mm, repère de la vue), zone, r }] : le moteur
// ferme la silhouette de r mm (un arrondi rentrant) dans le disque de rayon zone autour de c, comme il le fait
// au poignet. Une entrée par paire de doigts voisins dont l'un est tendu (mcp + ipp < 40°) et l'autre replié
// (mcp + ipp ≥ 140°) ; rien hors des vues de profil.
function raccords(sq, vue, M) {
  if ((vue !== 'pouce' && vue !== 'auriculaire') || !sq || !sq.segments) return [];
  const k = (sq.age && sq.age.kW) || 1;
  const pl = d => { const a = sq.segments[d + '.p1'], b = sq.segments[d + '.p2']; return a && b ? (a.flex || 0) + (b.flex || 0) : null; };
  const pr = p => [M[0][0] * p[0] + M[0][1] * p[1] + M[0][2] * p[2], M[1][0] * p[0] + M[1][1] * p[1] + M[1][2] * p[2]];
  const out = [];
  for (let i = 0; i < DOIGTS.length - 1; i++) for (const [t, r] of [[DOIGTS[i], DOIGTS[i + 1]], [DOIGTS[i + 1], DOIGTS[i]]]) {
    const ft = pl(t), fr = pl(r);
    if (ft === null || fr === null || ft >= 40 || fr < 140) continue;
    const S = sq.segments[t + '.p1'];
    // le coin : sous la racine du doigt tendu, côté paume, un peu en avant de la jointure
    const c = [0, 1, 2].map(j => S.de[j] - S.n[j] * 10 * k + S.u[j] * 6 * k);
    out.push({ c: pr(c), zone: 22 * k, r: 7 * k });
  }
  return out;
}

module.exports = { profil, objetDeVue, presentation, raccords, loin: { auriculaire: ['pouce'] }, bosses: () => bosses((() => { try { return require('./moteur'); } catch (e) { return null; } })()), tables: { INDEX, K, POUCE, AVANTBRAS, DOS_PAUME, FACE_PAUME, TALON, PONT, COUSSINET } };
Object.defineProperty(module.exports, 'paume', { enumerable: true, get: paume });
