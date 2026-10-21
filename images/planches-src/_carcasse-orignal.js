// La carcasse d'orignal commune à toutes les planches du chapitre 62 (et de ceux qui la reprennent).
//
// Une seule bête, dessinée une fois : profil GAUCHE, avant à gauche, debout, écorchée, la tête
// retirée (JP, 29 septembre) : le cou finit net à l'atlas, comme sur une carcasse. Toutes les planches qui l'importent montrent donc la
// même carcasse, à la même échelle quand elles le demandent (ECHELLE_CARTE).
//
// D'où vient le dessin (suivi/62-documentation-planches.md, section 5) :
//   - la silhouette : le dessin NIH de l'orignal (images/references/62/nih-orignal-profil.png),
//     retourné en miroir, pour la ligne du dos, la bosse du garrot, la croupe et le ventre ;
//   - le squelette et les muscles : les planches du cerf élaphe d'Ellenberger (t3 muscles, t4
//     squelette), déformées sur la silhouette de l'orignal par une spline de plaque mince calée
//     sur les repères palpables (pointe du coude au bas de la poitrine, rotule au pli du flanc,
//     pointe de la hanche à l'avant-haut de la croupe, pointe de la fesse à l'arrière, pointe du
//     jarret), puis relevés à la main dans ce repère. Aucune proportion d'os d'orignal n'est
//     établie : ce sont celles du cerf, recalées sur la silhouette de l'orignal ;
//   - les pattes : posées debout (la planche du cerf marche), les pattes du côté opposé
//     décalées derrière celles du côté vu, puis allongées (S_PATTES, sous le coude et le grasset)
//     et amincies aux canons : relevées à la hauteur du cerf, elles faisaient un poney.
//
// Le repère U : x vers la droite (du cou vers la queue), y vers le bas. La bête tient dans CADRE
// (x 362 à 1504, y 132 à 1380) ; le sol est à y ≈ 1378. Les tableaux ci-dessous sont écrits
// AVANT l'allongement des pattes (sol à 1242) ; le bloc « Les pattes de l'orignal » les convertit
// au chargement. Tout ce que le module expose (POINTS, CADRES, p.pt) est dans le repère final.
//
// ─── Mode d'emploi ────────────────────────────────────────────────────────────────────────
//
//   const C = require('./_carcasse-orignal');
//   const p = C.placer(z);                       // cadre la bête entière dans la vue z = { l, h }
//   const p = C.placer(z, { echelle: C.ECHELLE_CARTE });           // même échelle que la 62-02
//   const p = C.placer(z, { cadre: C.CADRES.quartierArriere });    // un gros plan sur une partie
//   C.dessiner(h, p, {
//     id: 'a',                                    // obligatoire, unique dans la planche
//     regions: true | [2, 3],                     // trame des régions (toutes, ou celles-là)
//     limites: 'plein' | 'tirete' | false,        // traits entre les régions
//     os: true | ['femur', 'rotule'] ,            // os dessinés (trait fin)
//     osForts: ['rotule', 'femur'],               // os mis en valeur (trait 1,4)
//     muscles: ['bicepsFemoral'],                 // contours de muscles (trait 0,7)
//     valeur: { muscles: ['semitendineux'], trame: 'r2' },   // muscle(s) en trame
//     muscles: true,                              // tous les muscles de surface en contour
//     loin: 'fin',                                // pattes du côté opposé en trait 0,7 (défaut 1,4)
//     loin: 'gris',                               // pattes du côté opposé en gris loin, trait 0,7 (la charte)
//     fondOs: false,                              // os sans fond blanc (défaut : fond blanc)
//   })
//   p.pt('rotule')  -> [x, y] dans la vue, pour la cible d'un renvoi
//   p.pt([x, y])    -> un point U quelconque ramené dans la vue
//
// Noms exposés : C.NOMS.os, C.NOMS.muscles, C.NOMS.points, C.NOMS.regions, C.NOMS.cadres.

'use strict';

// ─── Outils de géométrie ───────────────────────────────────────────────────────────────────

// Spline de Catmull-Rom uniforme, rendue en points serrés. Un point marqué d'un troisième
// élément 'c' est un angle : la courbe s'y casse.
function dense(pts, pas = 3, ferme = false) {
  const morceaux = [];
  let cur = [];
  pts.forEach((p, i) => {
    cur.push(p);
    if (p[2] === 'c' && i > 0 && i < pts.length - 1) { morceaux.push(cur); cur = [p]; }
  });
  morceaux.push(cur);
  if (ferme && morceaux.length === 1) return spline(pts, pas, true);
  if (ferme) { const d = morceaux.pop(); morceaux[0] = d.concat(morceaux[0].slice(1)); }
  const out = [];
  morceaux.forEach((m, k) => { const s = spline(m, pas, false); out.push(...(k ? s.slice(1) : s)); });
  return out;
}
function spline(P, pas, ferme) {
  const n = P.length;
  if (n < 3) return P.map(p => [p[0], p[1]]);
  const g = i => ferme ? P[(i + n) % n] : P[Math.max(0, Math.min(n - 1, i))];
  const out = [];
  const nseg = ferme ? n : n - 1;
  for (let i = 0; i < nseg; i++) {
    const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
    const L = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]);
    const k = Math.max(2, Math.ceil(L / pas));
    for (let j = 0; j < k; j++) {
      const t = j / k, t2 = t * t, t3 = t2 * t;
      out.push([0, 1].map(c => 0.5 * (2 * p1[c] + (-p0[c] + p2[c]) * t
        + (2 * p0[c] - 5 * p1[c] + 4 * p2[c] - p3[c]) * t2 + (-p0[c] + 3 * p1[c] - 3 * p2[c] + p3[c]) * t3)));
    }
  }
  if (!ferme) out.push([P[n - 1][0], P[n - 1][1]]);
  return out;
}
const unit = (a, b) => { const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1; return [dx / L, dy / L]; };
const add = (a, b, k = 1) => [a[0] + b[0] * k, a[1] + b[1] * k];
const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
// bande de largeur variable autour d'une ligne médiane (w0 au départ, w1 à l'arrivée)
function bande(mediane, w0, w1 = w0) {
  const n = mediane.length, g = [], d = [];
  mediane.forEach((p, i) => {
    const t = unit(mediane[Math.max(0, i - 1)], mediane[Math.min(n - 1, i + 1)]);
    const w = (w0 + (w1 - w0) * i / (n - 1)) / 2;
    g.push([p[0] + t[1] * w, p[1] - t[0] * w]);
    d.push([p[0] - t[1] * w, p[1] + t[0] * w]);
  });
  return g.concat(d.reverse());
}
// courbe quadratique de a à b, bombée de f × longueur vers la gauche du sens de marche
function arc(a, b, f, n = 14) {
  const m = lerp(a, b, 0.5), t = unit(a, b), L = Math.hypot(b[0] - a[0], b[1] - a[1]);
  const c = [m[0] + t[1] * f * L * 2, m[1] - t[0] * f * L * 2];
  return Array.from({ length: n + 1 }, (_, i) => { const s = i / n; return [0, 1].map(k => (1 - s) * (1 - s) * a[k] + 2 * s * (1 - s) * c[k] + s * s * b[k]); });
}

// ─── Silhouette ────────────────────────────────────────────────────────────────────────────
// Le corps avec les pattes du côté vu, dans le sens des aiguilles d'une montre, de la nuque.
const CORPS = [
  [405, 222, 'c'],                                                           // nuque, trait de coupe à l'atlas
  [440, 232], [480, 240], [530, 241], [578, 232], [618, 214], [650, 190], [676, 164], [700, 148], [726, 142],
  [752, 147], [782, 162], [814, 182], [852, 206], [887, 228], [921, 245], [954, 261],
  [989, 272], [1052, 283], [1105, 288], [1145, 287], [1187, 291], [1241, 304], [1284, 314],
  [1318, 325], [1365, 345], [1412, 367], [1446, 386], [1465, 405], [1474, 428], [1476, 460],   // croupe
  [1471, 510], [1461, 560], [1446, 605], [1429, 645], [1416, 688], [1411, 730], [1418, 770],   // fesse, cuisse
  [1437, 810], [1458, 842], [1476, 860], [1484, 876, 'c'],                   // pointe du jarret
  [1480, 902], [1476, 945], [1477, 1000], [1482, 1060], [1488, 1110], [1492, 1138],   // canon arrière
  [1500, 1154], [1498, 1172], [1494, 1190], [1497, 1215], [1494, 1236, 'c'],         // ergot, talon
  [1440, 1242, 'c'], [1437, 1234], [1445, 1216], [1454, 1197], [1455, 1178],          // onglon, paturon
  [1450, 1155], [1443, 1110], [1437, 1060], [1432, 1000], [1427, 960], [1422, 930],   // canon, devant
  [1408, 902], [1392, 885], [1372, 860], [1350, 833], [1325, 804], [1300, 776],       // jambe, devant
  [1276, 748], [1256, 726], [1241, 708], [1233, 696, 'c'],                   // devant du grasset
  [1223, 692], [1205, 703], [1180, 709], [1150, 710], [1100, 705], [1040, 698],       // pli du flanc, ventre
  [980, 688], [930, 677], [890, 669], [855, 665], [821, 667], [800, 678, 'c'],        // passage des sangles
  [792, 692], [782, 720], [771, 760], [760, 810], [750, 860], [744, 895], [741, 914],   // avant-bras, derrière
  [745, 925], [738, 942], [731, 956], [729, 1000], [728, 1060], [729, 1110], [732, 1138],   // carpe, canon
  [742, 1156], [740, 1174], [736, 1192], [739, 1214], [734, 1236, 'c'],               // ergot, talon
  [664, 1242, 'c'], [661, 1235], [668, 1217], [679, 1198], [686, 1178], [688, 1160],   // onglon, paturon
  [685, 1140], [684, 1100], [685, 1040], [686, 980], [684, 950], [680, 925],         // canon, carpe
  [676, 890], [672, 840], [669, 790], [667, 745], [666, 713, 'c'],                   // avant-bras, devant
  [640, 695], [600, 685], [566, 673], [545, 658], [530, 640], [518, 619], [505, 600],  // poitrine
  [488, 574], [466, 545], [441, 513], [413, 481], [372, 440, 'c'],                   // dessous du cou, gorge
];
// Les pattes du côté opposé : les mêmes, décalées, sous le corps.
const decale = (pts, dx, dy) => pts.map(p => [p[0] + dx, p[1] + dy, p[2]]);
const tranche = (a, b) => { const i = CORPS.findIndex(p => p[0] === a[0] && p[1] === a[1]); const j = CORPS.findIndex(p => p[0] === b[0] && p[1] === b[1]); return CORPS.slice(i, j + 1); };
const I_AV = [[800, 678], [666, 713]].map(q => CORPS.findIndex(p => p[0] === q[0] && p[1] === q[1]));
const I_AR = [[1411, 730], [1233, 696]].map(q => CORPS.findIndex(p => p[0] === q[0] && p[1] === q[1]));
// tournées un peu autour du coude et du grasset pour que la bête ne tienne pas sur deux paires de pattes jumelles
const tourne = (pts, c, deg) => { const a = deg * Math.PI / 180, co = Math.cos(a), si = Math.sin(a); return pts.map(p => [c[0] + (p[0] - c[0]) * co - (p[1] - c[1]) * si, c[1] + (p[0] - c[0]) * si + (p[1] - c[1]) * co, p[2]]); };
let PATTE_AV_LOIN, PATTE_AR_LOIN;
function pattesLoin() {
  PATTE_AV_LOIN = decale(tourne([[806, 640], ...CORPS.slice(I_AV[0] + 1, I_AV[1]), [666, 700], [690, 640]], [722, 690], -3.5), 34, -8);
  PATTE_AR_LOIN = decale(tourne([[1410, 660], CORPS[I_AR[0]], ...CORPS.slice(I_AR[0] + 1, I_AR[1]), [1240, 700], [1260, 650]], [1290, 700], 5), -22, -8);
}

// La tête, en trait de rappel pointillé : ce n'est plus la carcasse.
// le mufle de l'orignal : le nez busqué, la lèvre supérieure qui déborde largement l'inférieure
const TETE = [
  [405, 222], [352, 234], [290, 256], [215, 287], [140, 322], [80, 349], [40, 368], [16, 390],
  [4, 420], [3, 452], [12, 478], [30, 492], [52, 492], [64, 486, 'c'], [74, 494], [98, 501],
  [126, 500], [146, 506], [190, 506], [240, 499], [292, 484], [333, 464], [358, 450], [372, 440],
];
const NASEAU = [[24, 404], [36, 400], [46, 408], [44, 420]];
const OREILLE = [[368, 228], [357, 188], [369, 148], [390, 127], [404, 146], [409, 188], [405, 222]];
const OEIL = [[284, 282], [296, 276], [309, 279], [300, 288], [287, 288]];
const COUPE_ATLAS = [[405, 222], [372, 440]];

// ─── Squelette ─────────────────────────────────────────────────────────────────────────────
// Colonne : centres des corps vertébraux (C1 à L6), du crâne vers la queue.
const VERT = {
  C1: [428, 272], C2: [466, 300], C3: [504, 329], C4: [540, 355], C5: [574, 379], C6: [606, 399], C7: [634, 415],
  T1: [664, 423], T2: [690, 414], T3: [715, 406], T4: [740, 400], T5: [765, 395], T6: [790, 391], T7: [815, 387],
  T8: [840, 384], T9: [865, 381], T10: [890, 378], T11: [915, 375], T12: [940, 373], T13: [965, 371],
  L1: [1000, 368], L2: [1037, 366], L3: [1074, 365], L4: [1111, 365], L5: [1148, 366], L6: [1184, 367],
};
// pointe de l'apophyse épineuse de chaque vertèbre (les longues du garrot font la bosse)
const EPINE = {
  C2: [470, 283], C3: [508, 318], C4: [544, 344], C5: [578, 368], C6: [610, 386], C7: [640, 372],
  T1: [680, 196], T2: [706, 172], T3: [731, 170], T4: [758, 180], T5: [785, 192], T6: [810, 203],
  T7: [835, 217], T8: [860, 232], T9: [884, 246], T10: [906, 256], T11: [928, 266], T12: [950, 276],
  T13: [972, 284], L1: [1000, 294], L2: [1034, 300], L3: [1070, 303], L4: [1107, 306], L5: [1145, 305], L6: [1180, 308],
};
const ORDRE = Object.keys(VERT);
// Repère local d'une vertèbre : t le long de la colonne vers la queue, n vers le dos.
function repereV(nom, i) {
  const c = VERT[nom];
  const av = VERT[ORDRE[i - 1]] || add(c, unit(VERT[ORDRE[i + 1]], c), 36);
  const ap = VERT[ORDRE[i + 1]] || [1206, 369];
  const t = unit(av, ap), n = [t[1], -t[0]];
  const pas = (Math.hypot(ap[0] - av[0], ap[1] - av[1])) / 2;
  const P = (a, b) => [c[0] + t[0] * a + n[0] * b, c[1] + t[1] * a + n[1] * b];
  return { c, t, n, pas, P };
}
function vertebres() {
  const out = [];
  ORDRE.forEach((nom, i) => {
    const { c, pas, P } = repereV(nom, i);
    const reg = nom[0];
    const Lg = pas - 3;                                    // un jour entre deux corps
    if (reg === 'C') {
      const H = nom === 'C1' ? 20 : 22, a = Lg / 2;
      let corps = [P(-a, -H / 2), P(a - 4, -H / 2), P(a + 2, -H / 2 + 5), P(a, H / 2), P(a - 3, H / 2 + 9),
        P(-a + 5, H / 2 + 9), P(-a - 1, H / 2 + 3), P(-a - 2, -H / 2 + 5)];
      if (nom === 'C1') corps = [P(-a, -10), P(a, -12), P(a + 4, 4), P(a - 2, 20), P(-a + 4, 22), P(-a - 5, 8)];
      if (nom === 'C2') corps = [P(-a - 4, -H / 2 + 2), P(a - 4, -H / 2), P(a + 2, -H / 2 + 5), P(a, H / 2), P(a + 2, H / 2 + 16),
        P(-a + 2, H / 2 + 18), P(-a - 8, H / 2 + 6), P(-a - 6, -2)];
      if (nom === 'C6') corps.splice(1, 0, P(-a + 6, -H / 2 - 9), P(a - 8, -H / 2 - 9));   // la lame ventrale
      out.push({ nom, corps, centre: c });
    } else {
      const H = reg === 'T' ? 20 : 22, a = Lg / 2, r = 3;
      out.push({ nom, corps: [P(-a, -H / 2 + r), P(-a + r, -H / 2), P(a - r, -H / 2), P(a, -H / 2 + r), P(a, H / 2 - r),
        P(a - r, H / 2), P(-a + r, H / 2), P(-a, H / 2 - r)], centre: c });
    }
    if (EPINE[nom] && nom !== 'C2') {
      const base = P(reg === 'L' ? -2 : 1, (reg === 'C' ? 11 : 10)), tip = EPINE[nom];
      const u = unit(base, tip), m = [u[1], -u[0]], Lsp = Math.hypot(tip[0] - base[0], tip[1] - base[1]);
      const lb = reg === 'L' ? Lg * 0.72 : reg === 'T' ? Lg * 0.6 : Lg * 0.45;
      const lt = reg === 'L' ? Lg * 0.62 : reg === 'T' ? Lg * 0.46 : Lg * 0.3;
      const Q = (a, b) => [base[0] + u[0] * a + m[0] * b, base[1] + u[1] * a + m[1] * b];
      out.push({ nom: nom + '-epine', ligne: [base, tip],
        epine: [Q(0, lb / 2), Q(Lsp * 0.8, lt / 2), Q(Lsp - lt * 0.3, lt / 2), Q(Lsp + 1, 0), Q(Lsp - lt * 0.3, -lt / 2), Q(Lsp * 0.8, -lt / 2), Q(0, -lb / 2)] });
    }
  });
  return out;
}
const SACRUM = [[1204, 356], [1214, 334], [1242, 328], [1268, 331], [1302, 343], [1342, 359], [1382, 376],
  [1410, 389], [1412, 398], [1396, 402], [1352, 394], [1302, 386], [1256, 381], [1212, 379]];
const QUEUE = [[1414, 396], [1431, 409], [1446, 424], [1457, 439], [1464, 453]];

// Côtes : tête (sur la vertèbre), jonction avec le cartilage, et bout du cartilage (sur le
// sternum pour les huit premières, sur le cartilage d'avant pour les suivantes).
const COTES = [
  { h: [662, 431], j: [626, 570], s: [604, 612] },
  { h: [688, 423], j: [648, 588], s: [628, 624] },
  { h: [713, 416], j: [681, 602], s: [655, 633] },
  { h: [738, 410], j: [716, 612], s: [683, 640] },
  { h: [763, 405], j: [753, 618], s: [711, 646] },
  { h: [788, 400], j: [791, 620], s: [739, 650] },
  { h: [813, 396], j: [829, 618], s: [767, 653] },
  { h: [838, 393], j: [867, 613], s: [796, 656] },
  { h: [863, 390], j: [906, 603], s: [826, 659] },
  { h: [888, 387], j: [946, 591], s: [862, 657] },
  { h: [913, 384], j: [986, 575], s: [902, 649] },
  { h: [938, 381], j: [1026, 554], s: [946, 636] },
  { h: [963, 379], j: [1068, 522], s: [1076, 534] },                  // la 13e, flottante
];
function cotes() {
  return COTES.map((c, i) => {
    const med = arc(c.h, c.j, i < 3 ? 0.03 : 0.06);
    const w = i === 0 ? 9 : 11;
    const cart = arc(c.j, c.s, -0.04, 8);
    return { nom: `cote${i + 1}`, cote: bande(med, w, w * 0.9), cartilage: bande(cart, w * 0.75, w * 0.6), mediane: med, cartMediane: cart };
  });
}
const STERNUM = [[596, 603], [620, 612], [650, 624], [700, 638], [750, 646], [800, 651], [836, 654], [852, 660],
  [838, 664], [800, 664], [750, 660], [700, 654], [650, 641], [616, 628], [598, 616]];

const OS = {
  omoplate: [[650, 548, 'c'], [664, 540], [684, 546, 'c'], [694, 526], [712, 500], [738, 466], [768, 430], [798, 400],
    [822, 386], [834, 382, 'c'], [812, 368], [780, 352], [748, 336], [720, 325], [704, 322, 'c'], [700, 340], [692, 370],
    [682, 410], [670, 452], [660, 490], [653, 520], [650, 536]],
  cartilageOmoplate: [[704, 322, 'c'], [700, 310], [716, 302], [748, 300], [786, 308], [818, 326], [840, 350], [846, 372],
    [834, 382, 'c'], [812, 368], [780, 352], [748, 336], [720, 325]],
  humerus: [[626, 540], [644, 535], [662, 543], [678, 555], [683, 572], [690, 592], [702, 620], [714, 650], [727, 674],
    [735, 690], [732, 706], [719, 713], [703, 710], [694, 698], [689, 679], [679, 654], [667, 629], [654, 607],
    [637, 589], [624, 571], [620, 553]],
  radius: [[697, 707], [716, 703], [734, 707], [736, 720], [728, 742], [722, 782], [718, 832], [716, 880], [720, 904],
    [715, 915], [700, 916], [688, 911], [686, 889], [687, 839], [690, 789], [693, 744], [694, 721]],
  cubitus: [[733, 701], [742, 686], [751, 668], [762, 652], [775, 647], [783, 656], [780, 673], [767, 692], [752, 712],
    [742, 737], [734, 772], [727, 812], [721, 838], [719, 808], [723, 758], [728, 718]],
  carpe: [[689, 915], [716, 914], [724, 921], [733, 917], [738, 924], [727, 934], [721, 948], [694, 949], [687, 933]],
  metacarpe: [[692, 948], [718, 948], [716, 982], [712, 1060], [712, 1120], [716, 1140], [713, 1152], [694, 1153],
    [690, 1140], [692, 1100], [694, 1040], [694, 982]],
  phalangesAvant: [[692, 1153], [714, 1152], [712, 1170], [705, 1186], [703, 1200], [682, 1201], [684, 1184], [688, 1168]],
  onglonAvant: [[682, 1200, 'c'], [704, 1200], [714, 1218], [722, 1236, 'c'], [668, 1239, 'c'], [666, 1234], [673, 1216]],
  bassin: [[1238, 312, 'c'], [1215, 309], [1200, 318], [1194, 340], [1196, 366], [1203, 388, 'c'], [1226, 398], [1256, 414],
    [1285, 435], [1306, 454], [1316, 470], [1332, 481], [1362, 479], [1402, 471], [1440, 466], [1462, 462, 'c'], [1469, 450],
    [1457, 437], [1433, 424], [1417, 416], [1405, 403, 'c'], [1393, 414], [1362, 419], [1330, 411], [1302, 394],
    [1277, 370], [1256, 342]],
  femur: [[1316, 452], [1330, 446], [1346, 449], [1360, 448], [1371, 442], [1381, 446], [1385, 459], [1380, 473],
    [1369, 490], [1356, 512], [1343, 541], [1330, 575], [1318, 605], [1308, 628], [1305, 648], [1310, 666], [1306, 683],
    [1296, 694], [1279, 697], [1262, 690], [1252, 676], [1250, 660], [1255, 640], [1265, 612], [1280, 575], [1296, 538],
    [1309, 505], [1315, 485], [1312, 470]],
  rotule: [[1243, 636], [1254, 638], [1260, 650], [1257, 664], [1248, 670], [1239, 663], [1236, 648]],
  tibia: [[1262, 702], [1280, 698], [1301, 699], [1319, 703], [1325, 714], [1319, 726], [1341, 753], [1363, 782],
    [1385, 812], [1404, 842], [1420, 868], [1432, 888], [1440, 902], [1436, 913], [1423, 915], [1413, 908], [1403, 888],
    [1387, 862], [1365, 832], [1341, 800], [1316, 768], [1290, 739], [1269, 718]],
  calcaneum: [[1448, 858], [1462, 853], [1475, 860], [1477, 876], [1471, 900], [1466, 924], [1458, 940], [1448, 936],
    [1446, 910], [1445, 884]],
  tarse: [[1413, 905], [1433, 900], [1446, 912], [1458, 929], [1459, 948], [1432, 951], [1427, 938], [1417, 925]],
  metatarse: [[1432, 951], [1459, 950], [1462, 1000], [1470, 1080], [1480, 1140], [1478, 1152], [1460, 1154], [1456, 1140],
    [1448, 1080], [1440, 1000]],
  phalangesArriere: [[1460, 1154], [1479, 1152], [1481, 1170], [1478, 1188], [1477, 1203], [1456, 1204], [1457, 1186], [1458, 1170]],
  onglonArriere: [[1455, 1203, 'c'], [1478, 1203], [1487, 1220], [1490, 1236, 'c'], [1441, 1240, 'c'], [1438, 1234], [1446, 1218]],
};
const EPINE_OMOPLATE = [[740, 333], [726, 375], [710, 420], [694, 465], [682, 500], [674, 522]];

// ─── Repères nommés (cibles de renvoi) ─────────────────────────────────────────────────────
const POINTS = {
  rotule: [1248, 653], grasset: [1290, 697], femur: [1300, 560], teteFemur: [1326, 461], grandTrochanter: [1377, 452],
  pointeHanche: [1201, 382], ilium: [1250, 360], acetabulum: [1326, 461], pointeFesse: [1462, 452], sacrum: [1300, 360],
  tibia: [1360, 800], pointeJarret: [1468, 866], tarse: [1438, 928],
  olecrane: [775, 652], coude: [722, 706], humerus: [690, 620], radius: [705, 820], carpe: [712, 932],
  omoplate: [760, 420], epineOmoplate: [712, 415], cartilageOmoplate: [760, 301], pointeEpaule: [630, 545],
  c7t1: [649, 419], atlas: [428, 272], premiereCote: [645, 500], derniereCote: [1021, 452], sternum: [700, 646],
  cartilagesCostaux: [760, 640], coteHuit: [867, 613],
  garrot: [735, 150], lombes: [1100, 290], flanc: [1110, 560], cou: [520, 330], poitrine: [590, 660],
  canonAvant: [706, 1050], canonArriere: [1460, 1050], cuisse: [1350, 560], croupe: [1320, 350], dos: [900, 300], epaule: [760, 450],
};

// ─── Régions (tableau 5.1) ─────────────────────────────────────────────────────────────────
// Les limites, tracées dans la carcasse ; les régions sont des polygones découpés par la silhouette.
const L = {
  coude: [[652, 699], [690, 694], [712, 688], [736, 670], [756, 648], [778, 641], [793, 658], [804, 684]],
  grasset: [[1236, 697], [1268, 699], [1300, 701], [1340, 708], [1380, 713], [1416, 718]],
  hanche: [[1190, 280], [1192, 403], [1195, 470], [1203, 560], [1213, 630], [1224, 686], [1232, 697]],
  lombes: [[992, 403], [1100, 403], [1192, 403]],
  derniereCote: [[992, 403], [1003, 422], [1027, 452], [1052, 490], [1073, 527], [1062, 558], [1030, 590], [986, 617],
    [936, 640], [900, 650], [871, 655]],
  poitrine: [[786, 620], [828, 618], [867, 613], [871, 655], [873, 690]],
  epaule: [[503, 611], [545, 592], [572, 556], [600, 515], [628, 466], [648, 414], [664, 362], [684, 324], [700, 306],
    [720, 297], [750, 294], [790, 302], [824, 321], [848, 348], [856, 378], [848, 420], [832, 480], [812, 540], [794, 600],
    [786, 620], [779, 641]],
  cou: [[730, 140], [712, 200], [694, 262], [676, 322], [668, 348]],
};
const bas = 1500, haut = 60;
// les points d'une limite, de a à b inclus
const entre = (l, a, b) => { const i = l.findIndex(p => p[0] === a[0] && p[1] === a[1]), j = l.findIndex(p => p[0] === b[0] && p[1] === b[1]); if (i < 0 || j < 0) throw new Error('limite : point absent'); return l.slice(i, j + 1); };
const REGIONS = {
  1: { nom: 'Jarrets et bas de pattes', polys: [
    [...L.coude, [900, 700], [900, bas], [600, bas], [600, 710]],
    [...L.grasset, [1560, 722], [1560, bas], [1150, bas], [1150, 760], [1215, 740]],
  ], loin: true },
  2: { nom: 'Quartier arrière', polys: [[[1190, haut], ...L.hanche.slice(1), ...L.grasset.slice(1), [1560, 722], [1560, haut]]] },
  3: { nom: 'Dos', polys: [[
    [740, haut], ...L.cou, ...entre(L.epaule, [684, 324], [794, 600]), ...L.poitrine.slice(0, 4),
    ...L.derniereCote.slice().reverse().slice(1), [1100, 403], [1192, 403], [1190, haut],
  ]] },
  4: { nom: 'Quartier avant', polys: [[
    ...entre(L.epaule, [503, 611], [786, 620]), ...L.poitrine.slice(1), [873, 720], [806, 720],
    ...L.coude.slice().reverse(), [560, 730], [490, 650], [490, 612],
  ]] },
  5: { nom: 'Cou et flanc', polys: [
    [[300, haut], [740, haut], ...L.cou, ...entre(L.epaule, [503, 611], [664, 362]).reverse(), [480, 650], [300, 650]],
    [...L.derniereCote.slice(0, -1), [871, 655], [873, 690], [873, 760], [1240, 760], [1232, 697], ...L.hanche.slice().reverse().slice(1, -1), [1192, 403], [1100, 403]],
  ] },
};

// ─── Cadrages ──────────────────────────────────────────────────────────────────────────────
const CADRE = [362, 132, 1504, 1244];      // la carcasse entière, sans la tête
const CADRES = {
  entier: CADRE,
  quartierArriere: [1150, 270, 1510, 1244],
  cuisse: [1170, 280, 1500, 760],
  jarretArriere: [1220, 660, 1510, 1244],
  dos: [620, 130, 1220, 560],
  quartierAvant: [480, 270, 880, 1244],
  epaule: [490, 270, 880, 720],
  jarretAvant: [640, 620, 800, 1244],
  cou: [340, 138, 740, 620],
  flanc: [950, 380, 1260, 730],
  poitrine: [490, 520, 900, 720],
};
const ECHELLE_CARTE = 0.238;   // l'échelle de la 62-02, pour qu'une vignette « où est le morceau » s'y accorde

// ─── Mise en place dans une vue ────────────────────────────────────────────────────────────
function placer(z, { cadre = CADRE, echelle, marge = 6, ancre = 'centre' } = {}) {
  const c = typeof cadre === 'string' ? CADRES[cadre] : cadre;
  const lc = c[2] - c[0], hc = c[3] - c[1];
  const k = echelle || Math.min((z.l - 2 * marge) / lc, (z.h - 2 * marge) / hc);
  const dx = ancre === 'gauche' ? marge - c[0] * k : (z.l - lc * k) / 2 - c[0] * k;
  const dy = (z.h - hc * k) / 2 - c[1] * k;
  const T = p => [p[0] * k + dx, p[1] * k + dy];
  return { k, dx, dy, cadre: c, z, T, pt: n => T(typeof n === 'string' ? POINTS[n] : n) };
}

// ─── Rendu ─────────────────────────────────────────────────────────────────────────────────
const NOIR = '#1A1A1A', BLANC = '#FFFFFF';
const GRIS_LOIN = '#E6E6E6';   // la charte (JP, 13 octobre 2026) : ce qui est derrière
const f1 = v => Math.round(v * 10) / 10;
const trait = (ep, extra = '') => `fill="none" stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="round"${extra}`;
const plein = (fond, ep) => `fill="${fond}" stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round"`;
const d = (pts, ferme) => 'M' + pts.map(p => `${f1(p[0])} ${f1(p[1])}`).join(' L') + (ferme ? ' Z' : '');

// Trames des régions : des traits droits tournés par patternTransform (règle du livre).
function trames(id) {
  const L = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${NOIR}" stroke-width="0.5"/>`;
  return {
    r1: `<pattern id="${id}-r1" width="4" height="4" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="0.75" fill="${NOIR}" stroke="none"/><circle cx="3" cy="3" r="0.75" fill="${NOIR}" stroke="none"/></pattern>`,
    r2: `<pattern id="${id}-r2" width="4.5" height="4.5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">${L(0, 0, 0, 4.5)}</pattern>`,
    r3: `<pattern id="${id}-r3" width="4.5" height="4.5" patternUnits="userSpaceOnUse" patternTransform="rotate(90)">${L(0, 0, 0, 4.5)}</pattern>`,
    r4: `<pattern id="${id}-r4" width="4.5" height="4.5" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">${L(0, 0, 0, 4.5)}</pattern>`,
    r5: `<pattern id="${id}-r5" width="4.5" height="4.5" patternUnits="userSpaceOnUse">${L(0, 0, 0, 4.5)}</pattern>`,
    gris: `<pattern id="${id}-gris" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">${L(0, 0, 0, 3)}</pattern>`,
  };
}

function dessiner(h, p, o = {}) {
  const id = o.id || 'c';
  const T = p.T, k = p.k;
  const tr = pts => pts.map(T);
  const lisse = (pts, ferme = false, pas = 3 / Math.max(k, 0.2)) => tr(dense(pts, Math.min(pas, 6), ferme));
  const out = [];
  const defs = [];
  const tm = trames(id);
  const corps = lisse(CORPS, true);
  const corpsD = d(corps, true);
  defs.push(`<clipPath id="${id}-corps"><path d="${corpsD}" fill="${BLANC}"/></clipPath>`);
  const regions = o.regions === true ? [1, 2, 3, 4, 5] : (o.regions || []);
  regions.forEach(n => defs.push(tm['r' + n]));
  if (o.valeur) defs.push(tm[o.valeur.trame || 'gris'] || '');
  const cadrePx = [T([p.cadre[0], p.cadre[1]]), T([p.cadre[2], p.cadre[3]])];
  const vueClip = `<clipPath id="${id}-vue"><rect x="${f1(Math.max(0, cadrePx[0][0] - 2))}" y="${f1(Math.max(0, cadrePx[0][1] - 2))}" width="${f1(Math.min(p.z.l, cadrePx[1][0] + 2) - Math.max(0, cadrePx[0][0] - 2))}" height="${f1(Math.min(p.z.h, cadrePx[1][1] + 2) - Math.max(0, cadrePx[0][1] - 2))}"/></clipPath>`;
  defs.push(vueClip);
  out.push(`<defs>${defs.join('')}</defs>`);
  out.push(`<g clip-path="url(#${id}-vue)">`);

  // 1. Pattes du côté opposé, derrière. La charte : loin: 'gris' les peint en gris loin, au
  //    trait fin (elles reculent derrière la patte du côté vu).
  const loin = [PATTE_AV_LOIN, PATTE_AR_LOIN].map(q => lisse(q, true));
  const loinAt = o.loin === 'gris' ? plein(GRIS_LOIN, 0.7) : plein(BLANC, o.loin === 'fin' ? 0.7 : 1.4);
  loin.forEach(q => {
    out.push(`<path d="${d(q, true)}" ${loinAt}/>`);
    if (regions.includes(1)) out.push(`<path d="${d(q, true)}" fill="url(#${id}-r1)" stroke="none"/>`);
  });
  // 2. Le corps, en blanc, qui cache le haut des pattes opposées
  out.push(`<path d="${corpsD}" fill="${BLANC}" stroke="none"/>`);
  // 3. Trames des régions, découpées par la silhouette
  if (regions.length) {
    out.push(`<g clip-path="url(#${id}-corps)">`);
    regions.forEach(n => REGIONS[n].polys.forEach(q => out.push(`<path d="${d(tr(q), true)}" fill="url(#${id}-r${n})" stroke="none"/>`)));
    out.push('</g>');
  }
  // 4. Muscles en valeur (trame)
  if (o.valeur && o.valeur.muscles) {
    out.push(`<g clip-path="url(#${id}-corps)">`);
    o.valeur.muscles.forEach(m => out.push(`<path d="${d(lisse(MUSCLES[m].pts, true), true)}" fill="url(#${id}-${o.valeur.trame || 'gris'})" stroke="none"/>`));
    out.push('</g>');
  }
  // 5. Os
  const osNoms = o.os === true ? NOMS_OS : (o.os || []);
  const forts = o.osForts || [];
  if (osNoms.length || forts.length) out.push(dessinerOs(p, lisse, [...new Set([...osNoms, ...forts])], forts, o.fondOs !== false));
  // 6. Muscles en contour
  const mus = o.muscles === true ? Object.keys(MUSCLES).filter(m => !MUSCLES[m].profond) : (o.muscles || []);
  mus.forEach(m => out.push(`<path d="${d(lisse(MUSCLES[m].pts, true), true)}" ${MUSCLES[m].profond ? trait(0.7, ' stroke-dasharray="4 3"') : trait(0.7)}/>`));
  // 7. Limites des régions
  if (o.limites) {
    const at = o.limites === 'tirete' ? trait(0.7, ' stroke-dasharray="4 3"') : trait(1.4);
    out.push(`<g clip-path="url(#${id}-corps)">`);
    Object.values(L).forEach(l => out.push(`<path d="${d(lisse(l), false)}" ${at}/>`));
    out.push('</g>');
    // les pattes opposées : la limite du coude et du grasset se voit aussi dessus
  }
  // 8. Contour
  out.push(`<path d="${corpsD}" ${trait(2.4)}/>`);
  // 9. Tête en pointillé
  if (o.tete === true) {
    out.push(`<path d="${d(lisse(TETE), false)}" ${trait(0.7, ' stroke-dasharray="3 3"')}/>`);
    out.push(`<path d="${d(lisse(OREILLE), false)}" ${trait(0.7, ' stroke-dasharray="3 3"')}/>`);
    out.push(`<path d="${d(lisse(OEIL, true), true)}" ${trait(0.7)}/>`);
    out.push(`<path d="${d(lisse(NASEAU), false)}" ${trait(0.7, ' stroke-dasharray="3 3"')}/>`);
  }
  out.push('</g>');
  return out.join('\n');
}

const NOMS_OS = ['vertebres', 'sacrum', 'queue', 'cotes', 'sternum', 'omoplate', 'cartilageOmoplate', 'humerus', 'radius', 'cubitus',
  'carpe', 'metacarpe', 'phalangesAvant', 'onglonAvant', 'bassin', 'femur', 'rotule', 'tibia', 'calcaneum', 'tarse', 'metatarse',
  'phalangesArriere', 'onglonArriere'];

// Deux manières : « simple » en petit (k < 0,45 : épines et côtes en un trait, lisibles à
// l'échelle de la carte), « détail » en grand (lames et bandes, comme les planches d'Ellenberger).
function dessinerOs(p, lisse, noms, forts, fond) {
  const out = [];
  const simple = p.k < 0.45;
  const ep = n => forts.includes(n) ? 1.4 : 0.5;
  const at = n => fond ? plein(BLANC, ep(n)) : trait(ep(n));
  const T = p.T;
  const poly = (pts, n) => out.push(`<path d="${d(lisse(pts, true, 2), true)}" ${at(n)}/>`);
  const brut = (pts, n) => out.push(`<path d="${d(pts.map(T), true)}" ${at(n)}/>`);
  const ligne = (pts, n, extra = '') => out.push(`<path d="${d(pts.map(T), false)}" ${trait(ep(n) === 0.5 && simple ? 0.5 : ep(n), extra)}/>`);
  const veut = (n, groupe) => noms.includes(groupe) || noms.includes(n);
  // du plus profond au plus proche
  if (noms.includes('sacrum')) poly(SACRUM, 'sacrum');
  if (noms.includes('queue')) {
    for (let i = 0; i < QUEUE.length - 1; i++) {
      const a = QUEUE[i], b = QUEUE[i + 1], u = unit(a, b), n = [u[1], -u[0]], w = 7 - i;
      brut([add(add(a, n, w), u, 1.5), add(add(b, n, w - 1), u, -1.5), add(add(b, n, -(w - 1)), u, -1.5), add(add(a, n, -w), u, 1.5)], 'queue');
    }
  }
  const vs = vertebres();
  if (simple && noms.includes('vertebres')) {
    // la colonne d'un seul tenant, un trait entre deux vertèbres, les épines en un trait
    vs.filter(v => v.ligne).forEach(v => ligne(v.ligne, v.nom.replace('-epine', '')));
    const axe = ORDRE.map(n => VERT[n]).concat([[1206, 369]]);
    const larg = ORDRE.map(n => n[0] === 'C' ? (n === 'C1' ? 26 : 24) : n[0] === 'T' ? 19 : 21).concat([20]);
    const g = [], dr = [];
    axe.forEach((p, i) => {
      const t = unit(axe[Math.max(0, i - 1)], axe[Math.min(axe.length - 1, i + 1)]), w = larg[i] / 2;
      g.push([p[0] + t[1] * w, p[1] - t[0] * w]); dr.push([p[0] - t[1] * w, p[1] + t[0] * w]);
    });
    const bord = [add(axe[0], unit(axe[1], axe[0]), 14), ...g, ...dr.reverse()];
    out.push(`<path d="${d(lisse(bord, true, 2), true)}" ${at('vertebres')}/>`);
    for (let i = 0; i < axe.length - 1; i++) {
      const m = lerp(axe[i], axe[i + 1], 0.5), t = unit(axe[i], axe[i + 1]), w = (larg[i] + larg[i + 1]) / 4;
      ligne([[m[0] + t[1] * w, m[1] - t[0] * w], [m[0] - t[1] * w, m[1] + t[0] * w]], 'vertebres');
    }
    ['C7', 'T1'].filter(n => forts.includes(n)).forEach(n => brut(vs.find(v => v.nom === n).corps, n));
  } else {
    vs.filter(v => v.epine).forEach(v => {
      const n = v.nom.replace('-epine', '');
      if (veut(n, 'vertebres')) poly(v.epine, n);
    });
    vs.filter(v => v.corps).forEach(v => veut(v.nom, 'vertebres') && brut(v.corps, v.nom));
  }
  cotes().forEach(c => {
    if (!veut(c.nom, 'cotes')) return;
    if (simple) {
      ligne(c.mediane, c.nom);
      ligne(c.cartMediane, c.nom, ' stroke-dasharray="1.5 1.5"');
    } else {
      out.push(`<path d="${d(c.cartilage.map(T), true)}" ${fond ? plein(BLANC, ep(c.nom)) : trait(ep(c.nom))} stroke-dasharray="2 1.5"/>`);
      brut(c.cote, c.nom);
    }
  });
  if (noms.includes('sternum')) poly(STERNUM, 'sternum');
  if (noms.includes('bassin')) poly(OS.bassin, 'bassin');
  ['omoplate', 'cartilageOmoplate'].forEach(n => noms.includes(n) && poly(OS[n], n));
  if (noms.includes('omoplate')) out.push(`<path d="${d(lisse(EPINE_OMOPLATE), false)}" ${trait(ep('omoplate'))}/>`);
  ['cubitus', 'humerus', 'radius', 'carpe', 'metacarpe', 'phalangesAvant', 'onglonAvant',
    'femur', 'tibia', 'rotule', 'tarse', 'calcaneum', 'metatarse', 'phalangesArriere', 'onglonArriere'].forEach(n => noms.includes(n) && poly(OS[n], n));
  return out.join('\n');
}

// ─── Muscles (profil gauche) ──────────────────────────────────────────────────────────────
// Contours de POSITION : où est le muscle sur la carcasse, pour le mettre en valeur ou le cerner.
// Les muscles de surface sont relevés sur la planche d'Ellenberger du cerf (t3) déformée sur
// l'orignal ; ceux de l'épaule sont placés sur l'omoplate et l'humérus du module (sus-épineux
// devant l'épine, sous-épineux derrière, triceps dans l'angle de l'omoplate et de l'humérus) ;
// les profonds (profond: true) sont cachés par d'autres de profil : une planche les dessine en
// tireté ou dans une vue qui les découvre. Chaque planche de morceau reprend le contour de son
// muscle contre la figure nommée dans sa section de suivi/62-documentation-planches.md.
// La face interne de la cuisse (gracilis, couturier, semi-membraneux, adducteur, pectiné) ne se
// voit pas de profil gauche : elle n'est pas dans ce module.
const MUSCLES = {
  // quartier arrière
  fessierMoyen: { nom: 'haut de surlonge', latin: 'M. gluteus medius', pts: [[1203, 310], [1260, 318], [1320, 336], [1370, 356],
    [1402, 372], [1392, 396], [1378, 420], [1366, 442], [1340, 441], [1300, 422], [1262, 409], [1226, 397], [1204, 386], [1197, 350]] },
  pointeSurlonge: { nom: 'pointe de surlonge', latin: 'M. quadriceps femoris et M. tensor fasciae latae', pts: [[1203, 390],
    [1226, 399], [1262, 410], [1300, 423], [1334, 442], [1316, 460], [1296, 515], [1276, 580], [1260, 628], [1249, 660],
    [1236, 682], [1226, 688], [1216, 640], [1206, 560], [1198, 470], [1195, 415]] },
  bicepsFemoral: { nom: 'extérieur de ronde', latin: 'M. biceps femoris', pts: [[1340, 441], [1366, 442], [1378, 420], [1392, 396],
    [1406, 382], [1430, 395], [1440, 430], [1438, 480], [1430, 540], [1416, 600], [1400, 655], [1386, 700], [1372, 720],
    [1330, 712], [1290, 700], [1262, 690], [1249, 668], [1262, 628], [1280, 572], [1300, 512], [1318, 462]] },
  semitendineux: { nom: 'noix de ronde', latin: 'M. semitendinosus', pts: [[1406, 382], [1430, 390], [1452, 405], [1468, 428],
    [1474, 462], [1470, 510], [1460, 560], [1445, 606], [1428, 648], [1414, 690], [1408, 728], [1398, 742], [1386, 724],
    [1400, 670], [1416, 610], [1430, 545], [1438, 480], [1440, 430], [1428, 398]] },
  gastrocnemien: { nom: 'gastrocnémien', latin: 'M. gastrocnemius', pts: [[1330, 712], [1372, 720], [1398, 740], [1410, 768],
    [1420, 796], [1434, 822], [1448, 842], [1440, 846], [1422, 830], [1400, 808], [1378, 786], [1356, 762], [1338, 738]] },
  tendonAchille: { nom: 'tendon d’Achille', latin: 'tendo calcaneus', pts: [[1420, 800], [1436, 822], [1452, 842], [1466, 856],
    [1474, 862], [1468, 868], [1452, 856], [1434, 838], [1418, 818], [1410, 804]] },
  flechisseursJarret: { nom: 'fléchisseurs du jarret', latin: 'Mm. flexores digitorum', profond: true, pts: [[1324, 724],
    [1346, 746], [1372, 778], [1398, 810], [1420, 842], [1436, 866], [1442, 884], [1432, 890], [1416, 868], [1396, 840],
    [1372, 810], [1348, 780], [1328, 756], [1318, 736]] },
  extenseursJarret: { nom: 'extenseurs du jarret', latin: 'Mm. tibialis cranialis, peroneus, extensor digitorum', pts: [[1242, 708],
    [1264, 704], [1288, 736], [1314, 766], [1339, 798], [1363, 830], [1385, 860], [1402, 886], [1414, 906], [1404, 904],
    [1390, 886], [1370, 862], [1348, 834], [1324, 805], [1300, 776], [1276, 748], [1254, 724]] },
  // dos et flanc
  longe: { nom: 'longe', latin: 'M. longissimus dorsi', pts: [[1214, 322], [1180, 312], [1140, 305], [1090, 302], [1040, 300],
    [990, 297], [950, 293], [910, 295], [870, 302], [830, 312], [790, 322], [750, 334], [712, 348], [680, 364], [664, 384],
    [676, 400], [705, 404], [745, 400], [790, 398], [840, 397], [890, 395], [940, 391], [990, 387], [1040, 385], [1090, 384],
    [1140, 384], [1186, 386], [1210, 378], [1222, 350]] },
  filet: { nom: 'filet', latin: 'M. psoas major', profond: true, pts: [[950, 386], [1000, 383], [1060, 381], [1120, 382],
    [1180, 385], [1230, 394], [1272, 412], [1302, 432], [1292, 442], [1252, 427], [1202, 413], [1142, 406], [1082, 405],
    [1022, 405], [972, 400]] },
  grandDorsal: { nom: 'grand dorsal', latin: 'M. latissimus dorsi', pts: [[852, 300], [920, 300], [990, 314], [1035, 340],
    [1024, 376], [992, 418], [968, 458], [940, 494], [911, 528], [868, 572], [834, 598], [808, 600], [814, 545], [830, 470],
    [846, 402], [856, 350]] },
  dentelVentral: { nom: 'dentelé ventral', latin: 'M. serratus ventralis', pts: [[808, 600], [812, 545], [830, 470], [846, 410],
    [862, 446], [884, 500], [904, 556], [914, 598], [890, 611], [860, 616], [830, 618]] },
  obliqueExterne: { nom: 'oblique externe', latin: 'M. obliquus externus abdominis', pts: [[1024, 376], [1100, 390], [1180, 398],
    [1196, 412], [1198, 470], [1205, 560], [1214, 630], [1222, 686], [1205, 702], [1150, 709], [1100, 704], [1040, 697],
    [980, 687], [930, 676], [890, 668], [862, 662], [872, 622], [904, 584], [936, 544], [968, 498], [994, 446], [1010, 410]] },
  droitAbdomen: { nom: 'bavette de flanchet', latin: 'M. rectus abdominis', profond: true, pts: [[845, 652], [900, 648],
    [960, 660], [1030, 672], [1100, 680], [1160, 684], [1212, 676], [1220, 690], [1205, 702], [1150, 709], [1100, 704],
    [1040, 697], [980, 687], [930, 676], [890, 668], [855, 664]] },
  // quartier avant
  trapeze: { nom: 'trapèze', latin: 'M. trapezius', pts: [[470, 244], [560, 244], [640, 204], [700, 158], [750, 156], [820, 188],
    [880, 224], [940, 258], [946, 272], [880, 292], [822, 330], [772, 380], [738, 420], [716, 426], [690, 410], [640, 378],
    [582, 330], [522, 282], [476, 246]] },
  rhomboide: { nom: 'rhomboïde', latin: 'M. rhomboideus', profond: true, pts: [[704, 316], [716, 250], [760, 205], [820, 215], [860, 262], [866, 330], [850, 360], [824, 332], [788, 312], [748, 304], [716, 306]] },
  susEpineux: { nom: 'sus-épineux', latin: 'M. supraspinatus', pts: [[704, 322], [740, 333], [726, 375], [710, 420], [694, 465], [682, 500], [674, 522], [660, 548], [640, 556], [630, 540],
    [636, 510], [646, 478], [658, 440], [670, 400], [682, 362], [694, 334]] },
  sousEpineux: { nom: 'sous-épineux', latin: 'M. infraspinatus', pts: [[740, 333], [780, 352], [812, 368], [834, 382], [822, 392], [798, 404], [770, 432], [742, 462], [716, 496],
    [698, 524], [686, 548], [674, 542], [674, 522], [682, 500], [694, 465], [710, 420], [726, 375]] },
  deltoide: { nom: 'deltoïde', latin: 'M. deltoideus', pts: [[710, 420], [742, 432], [776, 440], [760, 470], [732, 510], [704, 560], [684, 600], [664, 614], [652, 592], [668, 556],
    [684, 520], [694, 480], [702, 445]] },
  tricepsLong: { nom: 'triceps, chef long', latin: 'M. triceps brachii, caput longum', pts: [[834, 382], [846, 400], [838, 440], [828, 480], [812, 540], [796, 600], [786, 632], [776, 648], [760, 642],
    [746, 626], [742, 600], [752, 560], [770, 500], [795, 445], [815, 410]] },
  tricepsLateral: { nom: 'triceps, chef latéral', latin: 'M. triceps brachii, caput laterale', pts: [[742, 600], [746, 626],
    [760, 642], [776, 648], [766, 662], [746, 668], [724, 660], [706, 640], [692, 614], [688, 592], [704, 572], [724, 574]] },
  pectoralSuperficiel: { nom: 'pectoral superficiel', latin: 'M. pectoralis superficialis', pts: [[505, 600], [530, 640],
    [545, 658], [566, 673], [600, 685], [640, 695], [666, 712], [670, 690], [662, 660], [646, 630], [620, 602], [590, 582],
    [560, 574], [530, 582]] },
  pectoralProfond: { nom: 'pectoral profond', latin: 'M. pectoralis profundus', pts: [[600, 640], [650, 646], [700, 650],
    [750, 650], [800, 642], [834, 628], [872, 622], [873, 652], [858, 663], [830, 667], [806, 676], [770, 674], [720, 668],
    [670, 662], [620, 656]] },
  extenseursAvantBras: { nom: 'extenseurs de l’avant-bras', latin: 'Mm. extensor carpi radialis, extensor digitorum', pts: [[668, 722],
    [690, 712], [694, 745], [690, 790], [687, 840], [686, 890], [689, 912], [682, 928], [678, 898], [674, 850], [670, 800], [667, 760]] },
  flechisseursAvantBras: { nom: 'fléchisseurs de l’avant-bras', latin: 'Mm. flexor carpi, flexor digitorum', pts: [[736, 714],
    [752, 712], [786, 700], [781, 730], [771, 770], [759, 820], [749, 868], [743, 906], [724, 906], [719, 862], [722, 800], [730, 750]] },
  // cou
  ligamentNuchal: { nom: 'ligament nuchal', latin: 'ligamentum nuchae', profond: true, pts: [[408, 236], [470, 246], [540, 248],
    [600, 232], [652, 200], [706, 174], [712, 184], [680, 206], [652, 262], [640, 372], [608, 386], [578, 368], [544, 344],
    [508, 318], [470, 290], [440, 262], [410, 242]] },
  splenius: { nom: 'splénius', latin: 'M. splenius', profond: true, pts: [[412, 240], [470, 250], [560, 250], [640, 214], [690, 192],
    [700, 222], [660, 262], [600, 302], [540, 322], [480, 316], [432, 300], [408, 270]] },
  complexus: { nom: 'complexus', latin: 'M. semispinalis capitis', profond: true, pts: [[414, 246], [470, 250], [540, 254], [620, 244],
    [682, 232], [690, 262], [640, 302], [560, 340], [490, 330], [436, 302]] },
};

// ─── Les pattes de l'orignal ───────────────────────────────────────────────────────────────
// Relevées d'abord à la hauteur du cerf, les pattes sont trop courtes pour un orignal : chez lui,
// du sol au dessous du poitrail, il y a autant ou plus que du garrot au poitrail (silhouette NIH ;
// JP, 29 septembre : « on dirait un poney »). Tout ce qui est sous le coude et le grasset (y > 700)
// est donc allongé de S_PATTES, et les canons, sous le carpe et le jarret, amincis vers leur axe.
// Le repère U de ce module est celui d'APRÈS cet allongement : les points de POINTS, les cadres et
// toute coordonnée qu'une planche passe à p.pt([x, y]) sont dans ce repère-là.
const S_PATTES = 1.25, Y_PATTES = 700;
function allonge(p) {
  let [x, y] = p;
  const w = Math.max(0, Math.min(1, (y - 880) / 70)), f = 1 - 0.2 * w;
  if (w > 0 && x < 1000) x = 707 + (x - 707) * f;                         // canon avant
  if (w > 0 && x > 1200) { const ax = 1452 + 0.1 * (y - 960); x = ax + (x - ax) * f; }   // canon arrière
  if (y > Y_PATTES) y = Y_PATTES + (y - Y_PATTES) * S_PATTES;
  return p.length > 2 ? [x, y, p[2]] : [x, y];
}
const allongeY = y => y > Y_PATTES ? Y_PATTES + (y - Y_PATTES) * S_PATTES : y;
(function () {
  const tout = a => a.forEach((p, i) => { a[i] = allonge(p); });
  tout(CORPS);
  Object.values(OS).forEach(tout);
  tout(STERNUM);
  COTES.forEach(c => { c.h = allonge(c.h); c.j = allonge(c.j); c.s = allonge(c.s); });
  Object.keys(POINTS).forEach(k => { POINTS[k] = allonge(POINTS[k]); });
  Object.values(L).forEach(tout);
  Object.values(REGIONS).forEach(r => r.polys.forEach(tout));
  Object.values(MUSCLES).forEach(m => tout(m.pts));
  new Set([CADRE, ...Object.values(CADRES)]).forEach(c => { c[1] = allongeY(c[1]); c[3] = allongeY(c[3]); });
  pattesLoin();
})();

const NOMS = {
  os: NOMS_OS.concat(ORDRE, COTES.map((_, i) => `cote${i + 1}`)),
  muscles: Object.keys(MUSCLES),
  points: Object.keys(POINTS),
  regions: Object.fromEntries(Object.entries(REGIONS).map(([n, r]) => [n, r.nom])),
  cadres: Object.keys(CADRES),
};

module.exports = {
  placer, dessiner, dense, NOMS, POINTS, CADRES, CADRE, ECHELLE_CARTE, MUSCLES, REGIONS,
  LIMITES: L, SILHOUETTE: CORPS, TETE, OS, VERT, EPINE, COTES,
};
