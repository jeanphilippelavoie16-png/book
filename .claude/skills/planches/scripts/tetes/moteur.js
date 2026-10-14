// moteur.js — les têtes simples de profil : la tête du corps simple, avec juste ce qu'il faut de visage.
//
// La même tête que le corps simple de profil (corps/moteur.js) : le même crâne, la même nuque, le même cou,
// raccordés de la même façon (union Clipper, l'arrondi de 20 mm à la nuque et sous le menton). Le visage
// s'ajoute par le contour : le front, le nez, les lèvres, le menton, la mâchoire, d'un seul trait lisse et
// continu jusqu'au cou. Dedans, au trait de 0,7 : l'œil (fermé, un petit trait ; ouvert, une amande vide),
// l'oreille (un C), un sourcil au plus, la limite des cheveux. L'iris plein et la commissure de la bouche
// fermée existent sur demande seulement (JP, 14 octobre : « enlève l'iris pi la commissure »).
// Pas de narine, de cil, de ride, de dent ni de pupille détaillée. Les cheveux sont une ligne de contour autour
// du crâne, jamais un aplat gris ni des mèches. Une tête de moins de 45 de haut dans la vue perd le sourcil,
// la commissure et la limite des cheveux : à cette taille, ce n'est plus que du bruit.
//
// ═══ L'API ══════════════════════════════════════════════════════════════════════════════════════════
//
//   teteSimple({ x, y, echelle, angle, penche, cote, age, yeux, bouche, ouverture, epaisseur, cheveux,
//                sourcil, iris, oreille, commissure, cou, raccord, trait, ancre, objet })
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
//     iris       true : l'œil ouvert avec son iris plein (défaut : false, l'amande vide ; JP, 14 octobre)
//     oreille    false : pas d'oreille · true : l'oreille toujours · défaut : l'oreille, sauf sur une tête
//                couchée sur le dos (le visage vers le haut, à 40° près) qui n'a pas de limite des cheveux (petite,
//                ou sans cheveux) : seul au milieu du crâne, le C couché se lit comme un sourire
//     commissure true : un trait de commissure à la bouche fermée (défaut : false ; JP, 14 octobre)
//     cou        true (défaut : 95 mm sous la nuque × la largeur du cou de l'âge ; 18 mm pour le bébé, dont le
//                cou ne se voit pas) · false (coupé juste sous le menton) · un nombre : la longueur, en mm réels
//     raccord    [[x, y], [x, y]] (unités de vue) : le cou va de la nuque à ces deux points, le devant puis le
//                derrière, et la coupe est ce segment : le haut d'un corps que la planche dessine elle-même
//                (le bébé couché de 29-05). La tête se pose par x, y, ancre ('oreille' ou 'nuque'), angle.
//     trait      'normal' (silhouette 1,5) · 'fort' (1,9) ; les traits intérieurs restent à 0,7
//     ancre      'oreille' (défaut : le centre de l'oreille) · 'cou' (le milieu de la coupe du cou)
//                · 'nuque' (le haut du cou, le pivot de la tête : le point .nuque du corps simple)
//     objet      SVG (ou fonction geo => SVG) peint DERRIÈRE la tête : le bout qui entre dans la bouche se
//                cache sous les lèvres, ce qui dépasse se voit (le linge, le sifflet, le rameau)
//
// Le résultat se colle comme une chaîne SVG et porte la géométrie, en unités de vue :
//   .oeil .nez (le bout) .menton .sommet .nuque (le pivot, haut du cou) .oreille (le centre)   [x, y]
//   .bouche    [x, y] : le devant des lèvres, entre les deux (bouche serre : le milieu de l'objet, au ras des lèvres)
//   .levres    { haut: [x, y], bas: [x, y] } : là où chaque lèvre touche l'objet (serre) ou s'arrête (ouverte) ; null
//              la bouche fermée
//   .regard    l'angle à l'écran (degrés) de la direction où regarde le visage ; .axe [ux, uy] le même, unitaire
//   .cou       [[x, y], [x, y]] : les deux coins de la coupe du cou (devant, derrière)
//   .boite     { x0, y0, x1, y1 }       .echelle      .age
//
// Pour le corps simple : corps({ …, visage: true }) (ou visage: { yeux, bouche, cheveux, … }) reçoit cette
// tête, par pourCorps() ci-dessous, au même pivot (la nuque) et au même angle que sa tête par défaut ; le
// résultat du corps porte alors .visage { oeil, nez, bouche, menton, sommet, oreille, levres }.
//
// Les proportions et leurs sources : tetes/proportions.json. Les têtes des planches : tetes/inventaire.md.
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
// crane : du haut du front, par le sommet et l'occiput, jusqu'à la nuque (sens inverse du contour : on le
// renverse au montage). visage : du haut du front jusqu'à la gorge. Le contour = visage + gorge + crâne.
//   rep : les repères (œil, oreille…) ; zone : x au-delà duquel c'est le visage (l'arrondi de la nuque ne
//   s'y applique pas) ; mach : le pivot de la mâchoire (devant l'oreille) ; cheveux : lignes d'implantation.
const TETES = {
  homme: {
    crane: [[76, -153], [42, -181], [-4, -190], [-36, -186], [-66, -170], [-92, -136], [-102, -90], [-94, -50], [-72, -16], [-40, 6]],
    gorge: [[22, 34], [-6, 14]],
    visage: {
      front: [[91, -116], [94.5, -97]],           // le front, la bosse du sourcil
      nasion: [92.6, -82],
      nez: [[99, -63], [107.5, -42.5], [110.5, -35]],  // l'arête, droite, puis le bout
      bout: [[109.5, -29.5], [103.5, -26]],       // le dessous du nez, jusqu'au creux sous le nez
      sous: [99.5, -24.5],                          // le creux sous le nez (subnasale)
      levreH: [101, -13], stomion: [100.9, -4.5], levreB: [100.4, 2],
      sillon: [96.8, 11],                          // le creux sous la lèvre
      menton: [[97.8, 23], [93, 36.5], [77, 45.5], [52, 46.5]],   // le menton, la mâchoire dessous
    },
    rep: { oeil: [79, -71.5], kOeil: 1, sourcil: [[87, -81.5], [77, -84.5], [66, -82.5]], oreille: { c: [-16, -55], h: 62, l: 30 }, mach: [-8, -48] },
    zone: 64,
    cheveux: {
      ep: 7, tri: [80, -147],
      // la ligne d'implantation : du front, par la tempe et la patte, jusque dans l'oreille ; elle ressort derrière
      // l'oreille et descend à la nuque (ou le long du cou). Elle se coupe autour de l'oreille, qui passe devant.
      court: [[80, -147], [68, -142], [57, -133], [48, -121], [41, -108], [33, -98], [22, -92], [12, -87], [7, -79], [5.5, -70], [5, -62], [2, -58.5], [-4, -58], [-12, -58], [-24, -52], [-34, -42], [-42, -33], [-56, -22], [-74, -17]],
      long: { ligne: [[79.5, -148], [67, -142], [56, -133], [47, -121], [40, -108], [32, -98], [22, -91], [13, -86], [8, -79], [6.5, -72], [4, -67.5], [-2, -66.5], [-10, -66], [-22, -58], [-30, -46], [-37, -28], [-39, 0], [-43, 30], [-52, 60], [-70, 86]],
        occiput: [-101, -80], chute: [[-112, -58], [-115, -20], [-112, 20], [-104, 54], [-90, 78]] },
      queue: { ligne: [[79.5, -148], [67, -142], [56, -133], [47, -121], [40, -108], [32, -98], [22, -91], [13, -86], [8, -79], [6.5, -72], [4, -67.5], [-2, -66.5], [-10, -66], [-22, -58], [-30, -46], [-40, -32], [-56, -21], [-74, -17]],
        queue: [[-99, -106], [-114, -106], [-126, -94], [-133, -70], [-134, -40], [-131, -10], [-126, 16], [-120, 34], [-115, 12], [-112, -16], [-108, -44], [-103, -66], [-98, -88]],
        lien: [[[-100, -104], [-104, -88]], [[-105, -107], [-109, -90]]] },
    },
  },
};
// La femme : le même crâne (à sa taille), le menton plus fin et moins avancé, le nez plus petit.
TETES.femme = {
  crane: TETES.homme.crane, gorge: TETES.homme.gorge,
  visage: {
    front: [[90.5, -116], [93.5, -97]], nasion: [91.6, -83],
    nez: [[97.5, -65], [105, -45], [107.5, -37.5]], bout: [[106.5, -31.5], [101.5, -27.5]], sous: [98, -26],
    levreH: [100.2, -14.5], stomion: [100, -6], levreB: [99.4, 0.5], sillon: [95.6, 9.5],
    menton: [[96, 21], [90.5, 34.5], [74, 44], [50, 45.5]],
  },
  rep: { oeil: [78, -72], kOeil: 1, sourcil: [[86, -82], [76, -85.5], [65, -83.5]], oreille: { c: [-16, -55], h: 60, l: 28 }, mach: [-8, -48] },
  zone: 62,
  cheveux: TETES.homme.cheveux,
};
// L'enfant de 6 ans : le crâne plus long et plus rond, le front qui bombe, le visage plus petit et plus bas
// (proportions.json : la part du visage dans la hauteur de la tête), le nez court qui retrousse, le menton rond.
TETES.enfant6 = {
  crane: [[70, -170], [30, -187], [-10, -191], [-50, -183], [-86, -161], [-110, -126], [-120, -82], [-115, -42], [-96, -12], [-62, 8]],
  gorge: [[18, 32], [-14, 14]],
  visage: {
    front: [[96, -138], [103.5, -108], [104.5, -85]], nasion: [102.6, -69.5],
    nez: [[104.6, -58], [108.5, -45], [111, -38]], bout: [[110.5, -32.5], [106, -28]], sous: [102, -25],
    levreH: [103.8, -15], stomion: [103.6, -7], levreB: [103, 0],
    sillon: [99.8, 9.5],
    menton: [[100.4, 20.5], [95, 33.5], [80, 42.5], [56, 45]],
  },
  rep: { oeil: [86, -60], kOeil: 1.05, sourcil: [[93, -71], [84, -74], [74, -72]], oreille: { c: [-14, -42], h: 64, l: 30 }, mach: [-8, -38] },
  zone: 66,
  cheveux: {
    ep: 7, tri: [101, -126],
    court: [[101.5, -125], [91, -123], [78, -117], [66, -108], [56, -97], [46, -86], [34, -79], [22, -75], [12, -71], [7, -64], [5.5, -56], [3, -51.5], [-3, -50.5], [-10, -50.5], [-22, -42], [-32, -28], [-42, -20], [-60, -12], [-90, -9]],
    long: { ligne: [[101.5, -125], [91, -123], [78, -117], [66, -108], [56, -97], [46, -86], [34, -79], [22, -75], [12, -71], [7, -64], [5.5, -56], [3, -51.5], [-3, -50.5], [-10, -50.5], [-22, -42], [-32, -30], [-38, -12], [-41, 14], [-45, 38], [-55, 62], [-72, 82]],
      occiput: [-118, -78], chute: [[-128, -54], [-130, -18], [-125, 20], [-113, 54], [-94, 76]] },
    queue: { ligne: [[101.5, -125], [91, -123], [78, -117], [66, -108], [56, -97], [46, -86], [34, -79], [22, -75], [12, -71], [7, -64], [5.5, -56], [3, -51.5], [-3, -50.5], [-10, -50.5], [-22, -42], [-32, -28], [-42, -20], [-60, -12], [-90, -9]],
      queue: [[-114, -112], [-129, -112], [-141, -100], [-148, -76], [-149, -46], [-146, -16], [-141, 10], [-135, 28], [-130, 6], [-127, -22], [-123, -50], [-118, -72], [-113, -94]],
      lien: [[[-115, -110], [-119, -94]], [[-120, -113], [-124, -96]]] },
  },
};
// L'enfant de 4 ans : le même dessin, le visage encore un peu plus petit et plus bas, le crâne plus long.
TETES.enfant4 = {
  crane: [[72, -168], [32, -187], [-12, -191], [-54, -183], [-92, -159], [-117, -122], [-126, -77], [-119, -35], [-97, -6], [-62, 10]],
  gorge: [[18, 32], [-14, 14]],
  visage: {
    front: [[98, -136], [106, -104], [106.5, -79]], nasion: [104, -62.5],
    nez: [[106, -52.5], [109.5, -41], [111.5, -35]], bout: [[111, -29], [106.5, -24.5]], sous: [102.5, -22],
    levreH: [104.2, -11.5], stomion: [104, -3.5], levreB: [103.3, 3.5],
    sillon: [100, 12.5],
    menton: [[100.4, 23], [95, 35], [80, 43], [56, 45.2]],
  },
  rep: { oeil: [87, -53], kOeil: 1.08, sourcil: [[94, -64], [85, -67], [75, -65]], oreille: { c: [-14, -37], h: 65, l: 31 }, mach: [-8, -33] },
  zone: 66,
  cheveux: TETES.enfant6.cheveux,
};
// Le nouveau-né : le crâne énorme, le visage minuscule tassé dans le bas, le nez à peine marqué, le menton
// fuyant ; le cou ne se voit pas (court et large : cou par défaut très court).
TETES.bebe = {
  crane: [[66, -168], [24, -188], [-20, -191], [-60, -182], [-94, -159], [-114, -122], [-120, -78], [-112, -36], [-94, -4], [-64, 14]],
  gorge: [[16, 34], [-16, 18]],
  visage: {
    front: [[92, -142], [104, -110], [106.5, -80]], nasion: [101.5, -56],
    nez: [[103, -45], [106, -32], [107, -26.5]], bout: [[106, -21.5], [102.5, -19]], sous: [99.5, -17.5],
    levreH: [101.6, -9.5], stomion: [101.4, -3], levreB: [100.8, 3],
    sillon: [96.8, 11],
    menton: [[95, 21], [89, 33], [74, 42], [52, 45.5]],
  },
  rep: { oeil: [85, -47], kOeil: 1.3, sourcil: null, oreille: { c: [-12, -30], h: 64, l: 31 }, mach: [-8, -28] },
  zone: 62,
  cheveux: TETES.enfant6.cheveux,
};

// ─── le contour d'une tête ────────────────────────────────────────────────────────────────
// Rend { pts (le contour fermé, unités de tête, avant lissage), levres, bouche (le point de la bouche), mach
// (l'angle d'ouverture de la mâchoire), zoneBas, zoneCoin (le bas de la zone du visage) } selon la bouche.
function contourTete(D, o) {
  const V = D.visage;
  const bouche = o.bouche || 'fermee';
  const mach = D.rep.mach;
  // la mâchoire : tout ce qui est sous la lèvre du haut tourne autour du pivot, d'un angle a
  let a = 0, ecart = 0;
  const dO = lon(sub(V.stomion, mach));
  if (bouche === 'ouverte') { const ov = o.ouverture == null ? 0.35 : Math.max(0, Math.min(1, o.ouverture)); a = 2 + 18 * Math.pow(ov, 1.3); }
  if (bouche === 'serre') { ecart = (o.epaisseur == null ? 8 : o.epaisseur) / o.k; a = Math.atan2(ecart, dO) / RAD; }
  const J = (p, w = 1) => autour(p, mach, a * w);
  const pts = [];
  pts.push(...V.front, V.nasion, ...V.nez, ...V.bout, V.sous, V.levreH);
  const levres = {};
  if (bouche === 'fermee') {
    pts.push(V.stomion, V.levreB);
  } else if (bouche === 'ouverte') {
    // les lèvres s'écartent et s'arrondissent ; entre elles, le creux de la bouche, qui rentre jusqu'aux
    // commissures (d'autant plus loin que l'écart est grand, 22 au plus)
    const O = V.stomion;
    const hautL = add(O, [-1.4, -0.6]), basL = add(J(O), [-1.4, 0.6]);
    const lb = J(V.levreB);
    const ecartL = lon(sub(basL, hautL));
    const prof = Math.min(22, 3 + 1.05 * ecartL);
    const fond = add(lerp(hautL, basL, 0.45), [-prof, 0]);
    pts.push(hautL, add(lerp(hautL, fond, 0.5), [0, -0.12 * ecartL]), fond, add(lerp(basL, fond, 0.5), [0, 0.12 * ecartL]), basL, lb);
    levres.haut = hautL; levres.bas = basL;
  } else {
    // serre : les lèvres se posent sur l'objet, écartées de son épaisseur, et l'enveloppent un peu
    const O = V.stomion, lb = J(V.levreB);
    const h0 = add(O, [0.3, -0.2]), b0 = add(J(O), [0.3, 0.2]);
    const dedans = 6;
    pts.push(add(h0, [-dedans, 0.3]), add(b0, [-dedans, -0.3]), lb);
    levres.haut = h0; levres.bas = b0;
  }
  pts.push(J(V.sillon), ...V.menton.map((p, i) => J(p, 1 - 0.25 * i / Math.max(1, V.menton.length - 1))));
  pts.push(...D.gorge.map((p, i) => J(p, 0.35 - 0.3 * i)));
  // le crâne est donné du front vers la nuque : on le parcourt de la nuque vers le front
  pts.push(...D.crane.slice().reverse());
  const bouchePt = bouche === 'fermee' ? V.stomion : lerp(levres.haut, levres.bas, 0.5);
  const js = J(V.sillon);
  return { pts, levres, bouche: bouchePt, mach: a, zoneBas: js[1] + 8, zoneCoin: Math.min(D.zone + 16, js[0] - 14) };
}

// ─── les cheveux : une masse autour du crâne, sa limite au front et à la tempe ─────────────────────
// C : le contour lissé (unités de tête). La masse : le bord du crâne décalé vers l'extérieur de ep (nul à la
// limite du front, plein dès le haut du front, qui retombe à la nuque), refermée par la ligne d'implantation.
function cheveuxDe(D, C, sorte) {
  const H = D.cheveux;
  if (!H || !sorte || sorte === 'aucun') return { polys: [], liens: [] };
  const proche = q => { let im = 0, dm = Infinity; C.forEach((p, i) => { const d = lon(sub(p, q)); if (d < dm) { dm = d; im = i; } }); return im; };
  const cx = C.reduce((s, p) => s + p[0], 0) / C.length, cy = C.reduce((s, p) => s + p[1], 0) / C.length;
  // le bord du crâne de i0 (le front) à i1, en reculant dans le contour (le front → le sommet → l'occiput)
  const bordCrane = (i0, i1) => { const out = []; for (let i = i0; ; i = (i - 1 + C.length) % C.length) { out.push(C[i]); if (i === i1) break; } return out; };
  const decaleBord = (pts, ep) => {
    const L = [0]; for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + lon(sub(pts[i], pts[i - 1])));
    const tot = L[L.length - 1] || 1;
    return pts.map((p, i) => {
      const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
      let nn = gau(uni(sub(b, a))); if ((p[0] - cx) * nn[0] + (p[1] - cy) * nn[1] < 0) nn = mul(nn, -1);
      return add(p, mul(nn, ep(L[i] / tot, L[i])));
    });
  };
  const lisse = t => t * t * (3 - 2 * t);
  const monte = (d, l) => lisse(Math.min(1, d / l));
  const polys = [], liens = [];
  if (sorte === 'court' || sorte === 'queue') {
    const ligne = sorte === 'court' ? H.court : H.queue.ligne;
    const i0 = proche(ligne[0]), i1 = proche(ligne[ligne.length - 1]);
    const bord = bordCrane(i0, i1);
    const ep = sorte === 'queue' ? H.ep * 0.8 : H.ep;
    const dessus = decaleBord(bord, (t, d) => ep * monte(d, 26) * (1 - 0.85 * lisse(Math.max(0, (t - 0.82) / 0.18))));
    polys.push(dessus.concat(lisseOuvert(ligne, 6).reverse()));
    if (sorte === 'queue') {
      polys.push(lisseFerme(H.queue.queue, 8));
      for (const l of H.queue.lien) liens.push(lisseOuvert(l, 4));
    }
  } else if (sorte === 'long') {
    const Lg = H.long, ligne = Lg.ligne;
    const i0 = proche(ligne[0]), i1 = proche(Lg.occiput);
    const bord = bordCrane(i0, i1);
    const dessus = decaleBord(bord, (t, d) => H.ep * 1.3 * monte(d, 26));
    const chute = lisseOuvert([dessus[dessus.length - 1], ...Lg.chute, ligne[ligne.length - 1]], 8).slice(1);
    polys.push(dessus.concat(chute, lisseOuvert(ligne, 6).reverse().slice(1)));
  }
  return { polys, liens };
}

// ─── les pièces d'une tête, en mm réels, repère du corps (origine à la nuque, x vers l'avant) ────────
// pieces(age, o) → { contour (polygone lissé), cheveux: [polygones], details: [lignes], zone (le visage,
// polygone), rep { oeil, nez, bouche, menton, sommet, oreille, levres }, k, kT }
function pieces(ageDemande, o = {}) {
  const age = ALIAS[ageDemande] || 'homme';
  const D = TETES[age] || TETES.homme;
  const { k, kT } = echelleAge(age);
  const c = contourTete(D, Object.assign({}, o, { k }));
  const K = p => mul(p, k);
  const C = lisseFerme(c.pts, 8);
  const contour = C.map(K);
  const details = [], pleins = [];
  const R = D.rep;
  // petite (moins de 45 de haut dans la vue) : ni sourcil, ni commissure, ni limite des cheveux ; l'œil,
  // l'oreille et la silhouette suffisent
  const petit = o._echelle ? 234 * k * o._echelle < 45 : false;
  // l'œil : un petit trait (fermé) ou une amande ouverte vers l'avant
  const E = R.oeil, ke = R.kOeil || 1, e = v => add(E, mul(v, ke));
  if ((o.yeux || 'ouverts') === 'fermes') {
    details.push(lisseOuvert([e([5, 0.1]), e([0, 2]), e([-5.5, 0.4])], 8).map(K));
  } else {
    // l'amande : la paupière du haut et celle du bas, qui se rejoignent au coin de l'œil (derrière) ; l'iris
    // plein, devant, sur demande seulement (iris: true)
    details.push(lisseOuvert([e([4, -2.4]), e([-0.5, -2.2]), e([-5, 0.3])], 8).map(K));
    details.push(lisseOuvert([e([4.3, 2.2]), e([-0.5, 1.8]), e([-5, 0.3])], 8).map(K));
    if (o.iris === true) pleins.push(lisseFerme([e([3.6, -2.1]), e([2.2, -2.3]), e([1.2, 0]), e([2.2, 1.9]), e([3.8, 1.9]), e([4.1, 0])], 6).map(K));
  }
  // le sourcil
  const sourcil = o.sourcil == null ? (age === 'homme' || age === 'femme') && !petit : !!o.sourcil;
  if (sourcil && R.sourcil) details.push(lisseOuvert(R.sourcil, 8).map(K));
  // l'oreille : un C ouvert vers l'avant
  const Oc = R.oreille.c, oh = R.oreille.h / 2, ol = R.oreille.l;
  // (o._regard : l'angle à l'écran où regarde le visage, en degrés, y vers le bas ; vers le haut à 40° près et sans
  // limite des cheveux autour, le C couché fait un sourire : pas d'oreille, sauf oreille: true)
  const Cor = lisseOuvert([add(Oc, [6, -oh * 0.86]), add(Oc, [-ol * 0.35, -oh]), add(Oc, [-ol * 0.62, -oh * 0.55]),
    add(Oc, [-ol * 0.6, oh * 0.15]), add(Oc, [-ol * 0.35, oh * 0.82]), add(Oc, [0, oh]), add(Oc, [5, oh * 0.8])], 8).map(K);
  const versHaut = o._regard != null && Math.abs((((o._regard + 90) % 360) + 540) % 360 - 180) <= 40;
  const sorte0 = o.cheveux == null ? (age === 'femme' ? 'long' : age === 'bebe' ? 'aucun' : 'court') : o.cheveux;
  const oreilleVue = o.oreille === false ? false : o.oreille === true ? true : !(versHaut && (petit || sorte0 === 'aucun'));
  const oreille = oreilleVue ? Cor : [];
  if (oreilleVue) details.push(oreille);
  // la commissure : la bouche fermée, un trait court qui part des lèvres (sur demande seulement)
  if ((o.bouche || 'fermee') === 'fermee' && o.commissure === true) {
    const O = D.visage.stomion;
    details.push(lisseOuvert([add(O, [0.5, 0]), add(O, [-4, 0.6]), add(O, [-8.5, 1.1])], 4).map(K));
  }
  // les cheveux
  const sorte = sorte0;
  const ch = cheveuxDe(D, C, sorte);
  // la zone du visage : devant x = zone, du sommet au menton
  // (serrée sur le visage : du sommet jusque sous le creux de la lèvre, 20 devant le bout du nez)
  const xNez = D.visage.nez[D.visage.nez.length - 1][0] + 22;
  const zone = [[D.zone, -260], [xNez, -260], [xNez, c.zoneBas], [c.zoneCoin, c.zoneBas]].map(K);
  const rep = {
    oeil: K(E), nez: K(D.visage.nez[D.visage.nez.length - 1]), bouche: K(c.bouche),
    menton: K(D.visage.menton[1]), sommet: K(C.reduce((m, p) => (p[1] < m[1] ? p : m))), oreille: K(Oc),
    levres: c.levres.haut ? { haut: K(c.levres.haut), bas: K(c.levres.bas) } : null,
  };
  return { contour, cheveux: ch.polys.map(P => P.map(K)), liens: petit ? [] : ch.liens.map(l => l.map(K)), details, pleins, zone, rep, k, kT, age, sorte, oreille, petit };
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
  const regard0 = (o.cote === 'gauche' ? 180 - (o.penche || 0) : (o.penche || 0)) + (o.angle || 0);
  const T0 = pieces(age, Object.assign({}, o, { _echelle: o.echelle || 1, _regard: regard0 }));
  const { k, kT } = T0;
  const penche = o.penche || 0;
  const PT = p => tourne(p, penche);                 // la tête sur le cou, autour de la nuque
  const tete = T0.contour.map(PT);
  const cheveux = T0.cheveux.map(P => P.map(PT));
  // ── le repère de la vue (l'ancre 'cou' sans raccord attend la coupe, plus bas) ──
  const s = o.echelle || 1, m = o.cote === 'gauche' ? -1 : 1, ang = o.angle || 0;
  const X0 = o.x || 0, Y0 = o.y || 0;
  const raccord = Array.isArray(o.raccord) && o.raccord.length === 2 ? o.raccord : null;
  const ancreQ = o.ancre === 'cou' && raccord ? 'oreille' : (o.ancre || 'oreille');
  const ancreDe = q => (q === 'nuque' ? [0, 0] : PT(T0.rep.oreille));   // (oreille: false : le même point)
  const versVue = a => p => { const q = tourne([m * s * (p[0] - a[0]), s * (p[1] - a[1])], ang); return [X0 + q[0], Y0 + q[1]]; };
  const deVue = a => v => { const q = tourne([v[0] - X0, v[1] - Y0], -ang); return [a[0] + q[0] / (m * s), a[1] + q[1] / s]; };

  // le cou : sa longueur sous la nuque, en mm réels ; avec raccord, il va de la nuque aux deux points donnés
  // (le devant, le derrière : le haut d'un corps dessiné par la planche), et la coupe est ce segment
  const pj = propTetes(), couBebe = (pj && pj.ages && pj.ages.bebe && pj.ages.bebe.cou && pj.ages.bebe.cou.longueur) || 18;
  let Lcou = typeof o.cou === 'number' ? o.cou : o.cou === false ? (age === 'bebe' ? 0.6 * couBebe : 62 * k) : (age === 'bebe' ? couBebe : 95 * kT);
  // la bouche ouverte ou serrée : le menton descend avec la mâchoire, la coupe du cou descend d'autant (sans quoi le
  // cou court du bébé coupe le menton et laisse un crochet)
  if (typeof o.cou !== 'number' && !raccord && (o.bouche || 'fermee') !== 'fermee') {
    const uC = haut(12), prof = C => Math.max(...C.map(p => -(p[0] * uC[0] + p[1] * uC[1])));
    const ferme = pieces(age, Object.assign({}, o, { bouche: 'fermee', _echelle: o.echelle || 1 })).contour.map(PT);
    Lcou += Math.max(0, prof(tete) - prof(ferme));
  }
  let couPoly, u, n, P0, coupeA, coupeB;
  if (raccord) {
    const Ti = deVue(ancreDe(ancreQ));
    coupeA = Ti(raccord[0]); coupeB = Ti(raccord[1]);
    const M = lerp(coupeA, coupeB, 0.5);
    u = uni(sub([0, 0], M)); n = mul(gau(u), -1);
    if ((coupeA[0] - M[0]) * n[0] + (coupeA[1] - M[1]) * n[1] < 0) n = mul(n, -1);
    const Qf = mul(n, COU[2][1] * kT), Qb = mul(n, -COU[2][2] * kT), haut = mul(u, 15);
    couPoly = [add(coupeA, mul(u, -3)), Qf, add(Qf, haut), add(Qb, haut), Qb, add(coupeB, mul(u, -3))];
    P0 = M;
  } else {
    const cou = bandeCou(Lcou + 60, kT);
    couPoly = cou.poly; u = cou.u; n = cou.nAv; P0 = mul(u, -Lcou);
  }
  // l'union, l'arrondi hors du visage (la nuque, la gorge), puis la coupe
  const zone = [I.versCL(T0.zone.map(PT))];
  // la peau (la tête et le cou) s'arrondit à la nuque et sous le menton, hors du visage ; les cheveux
  // s'ajoutent ensuite tels quels (l'arrondi boucherait le jour entre la queue et la nuque)
  // la tête penchée vers l'avant (penche > 0) : la peau de la nuque se tend de l'occiput au dos du cou. Le creux que
  // laisse l'occiput qui remonte se comble d'un grand arrondi (60 mm), derrière l'axe du cou seulement : la gorge et
  // le menton, devant, gardent leur dessin.
  let peau0 = I.unionCL([I.union([tete]), I.union([couPoly])]);
  if (penche > 0 && !raccord) {
    const derriere = [I.versCL([add(mul(n, -2), mul(u, 400)), add(mul(n, -2), mul(u, -400)), add(mul(n, -600), mul(u, -400)), add(mul(n, -600), mul(u, 400))])];
    peau0 = I.unionCL([peau0, I.inter(I.ferme(peau0, 60 * k), derriere)]);
  }
  const peau = I.unionCL([peau0, I.moins(I.ferme(peau0, 20), zone)]);
  const chCL = cheveux.length ? I.union(cheveux) : [];
  let S = I.unionCL([peau, chCL]);
  // la coupe : on garde le côté de la nuque (la droite perpendiculaire à l'axe du cou, ou celle du raccord)
  const dirC = raccord ? uni(sub(coupeA, coupeB)) : n;
  const nC = raccord ? (u[0] * -dirC[1] + u[1] * dirC[0] > 0 ? [-dirC[1], dirC[0]] : [dirC[1], -dirC[0]]) : u;
  const demi = [I.versCL([add(P0, mul(dirC, -400)), add(P0, mul(dirC, 400)), add(add(P0, mul(dirC, 400)), mul(nC, 900)), add(add(P0, mul(dirC, -400)), mul(nC, 900))])];
  S = I.inter(S, demi);
  // les bords de la coupe (devant, derrière) : où la coupe rencontre la silhouette
  const coins = raccord ? [coupeA, coupeB] : coinsCoupe(S, P0, n);
  const ancre = ancreQ === 'cou' ? (coins ? lerp(coins[0], coins[1], 0.5) : P0) : ancreDe(ancreQ);
  const T = versVue(ancre);

  const tr = o.trait === 'fort' ? 1.9 : (typeof o.trait === 'number' ? o.trait : 1.5), ti = 0.7;
  const tol = 0.05 / s;
  const dFerme = paths => paths.map(Pp => { const q = I.allege(I.deCL(Pp), tol, true).map(T); return 'M' + q.map(p => `${f1(p[0])} ${f1(p[1])}`).join(' L') + ' Z'; }).join(' ');
  const dOuvert = ls => ls.filter(l => l.length > 1).map(l => { const q = I.allege(l, tol).map(T); return 'M' + q.map(p => `${f1(p[0])} ${f1(p[1])}`).join(' L'); }).join(' ');
  // le trait de la silhouette : tout le bord, sauf la coupe du cou
  const bandeCoupe = [I.versCL([add(add(P0, mul(dirC, -400)), mul(nC, -0.6)), add(add(P0, mul(dirC, 400)), mul(nC, -0.6)), add(add(P0, mul(dirC, 400)), mul(nC, 0.6)), add(add(P0, mul(dirC, -400)), mul(nC, 0.6))])];
  const bord = I.bordsDans(S, I.moins([I.versCL([[-2000, -2000], [2000, -2000], [2000, 2000], [-2000, 2000]])], bandeCoupe));
  // les traits intérieurs, coupés au contour
  const E = 1.0;
  const dedans = I.decale(S, -E);
  const lignes = T0.details.concat(T0.liens).map(l => l.map(PT));
  const intLignes = lignesDans(lignes, dedans);
  // la limite des cheveux : le bord de la masse qui tombe sur la peau (le front, la tempe, la nuque, le cou)
  // (coupée autour de l'oreille, qui passe devant)
  if (chCL.length && !T0.petit) {
    const zOr = T0.oreille.length ? I.decale([I.versCL(T0.oreille.map(PT))], 3 * k) : [];
    intLignes.push(...I.bordsDans(chCL, I.moins(I.inter(I.decale(peau, -E), dedans), zOr)));
  }

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
  if (T0.pleins.length) out.push(`<path d="${T0.pleins.map(P => 'M' + P.map(PT).map(T).map(p => `${f1(p[0])} ${f1(p[1])}`).join(' L') + ' Z').join(' ')}" fill="${NOIR}" stroke="none"/>`);
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

// ─── pour le corps simple ─────────────────────────────────────────────────────────────────
// pourCorps(age, angleTete, nuque, opts) : les pièces de la tête dans le repère du corps (mm, l'origine au
// bassin), posées comme sa tête par défaut : tournées de angleTete (degrés, + vers l'avant) autour de la
// nuque (le haut du cou). opts : les options de visage de teteSimple (yeux, bouche, cheveux, sourcil…).
function pourCorps(age, angleTete, nuque, opts = {}) {
  const T0 = pieces(age, Object.assign({ _regard: angleTete }, opts));
  const P = p => add(nuque, tourne(p, angleTete));
  const rep = {};
  for (const [cle, v] of Object.entries(T0.rep)) rep[cle] = Array.isArray(v) ? P(v) : (v ? { haut: P(v.haut), bas: P(v.bas) } : null);
  return { contour: T0.contour.map(P), cheveux: T0.cheveux.map(Q => Q.map(P)), zone: T0.zone.map(P), oreille: T0.oreille.map(P),
    details: T0.details.concat(T0.liens).map(l => l.map(P)), pleins: T0.pleins.map(Q => Q.map(P)), rep, k: T0.k, age: T0.age, sorte: T0.sorte, petit: T0.petit };
}

module.exports = { teteSimple, pieces, pourCorps, TETES, _interne: { contourTete, bandeCou, echelleAge, lisseOuvert, lignesDans } };
