// Planche 62-15 — le quartier avant : ce qui le tient au corps.
// Chapitre 62, § 5.1 (tableau 5.1, région 4 : « L'épaule ne tient à rien d'autre qu'à des muscles :
// aucune articulation ne la relie au squelette ») et § 9, étape 3 (« On soulève le coude, on coupe ce
// qui résiste sous l'omoplate, et l'épaule entière vient d'un morceau »). Le geste, avec la main, est
// à la planche 64-40 : ici, la carte et le chemin de la lame. Documentation :
// suivi/62-documentation-planches.md, section 18 (ce qui est établi vue par vue), section 2
// (conventions), section 5 et « Base commune » (la carcasse commune, _carcasse-orignal.js).
// Figures regardées : usda-imps-coupe-5e-6e-cote-boeuf (IMPS 7.3.1 : trapèze, rhomboïde, omoplate,
// dentelé ventral, longissimus, épineux, dans cet ordre de dehors en dedans), sisson-1914-fig277
// (le sous-scapulaire qui remplit la face interne de l'omoplate), sisson-1914-fig304 et
// ellenberger-rind-t14 fig. 67 (le dentelé ventral en éventail de l'omoplate aux côtes, le
// rhomboïde sur le cartilage) et fig. 69 (le cartilage de l'omoplate sous le garrot), acia-boeuf-03,
// nmsu-cr508-fig01.
//
// Vue 1 — où il est : l'avant de la carcasse commune, de profil gauche ; le quartier avant en trame
//   (l'omoplate et son cartilage, le bras jusqu'au coude, l'avant-bras jusqu'au carpe : le même
//   contour que le quartier détaché de la vue 3) ; les os vus au travers, omoplate, cartilage,
//   humérus et cubitus en trait appuyé ; la ligne de levée en pointillé, le demi-cercle au-dessus du
//   bord du cartilage (CEE-ONU 9124, côté externe) ; le trait vertical de la coupe de la vue 2.
// Vue 2 — le plan de glissement, en coupe transversale à la hauteur de l'omoplate (la 5e côte du
//   module), vue de l'arrière, le côté gauche de la bête à gauche. Ce qui part avec l'épaule
//   (muscles de l'omoplate et du bras) dans la trame de la vue 1 ; le tronc (trapèze, rhomboïde,
//   épineux, longe, dentelé ventral) en blanc, cerné ; l'os en noir, le cartilage en blanc cerné
//   appuyé. Côté gauche, la couture qu'on ouvre : du bas, entre le bras et le dentelé ventral, entre
//   le sous-scapulaire et le dentelé (CEE-ONU 9124, côté interne : « the natural seam between the
//   front limbs and ribs »), contre l'omoplate où le dentelé s'y attache, le long du cartilage,
//   autour de son bord, puis dehors à travers le trapèze (le demi-cercle de la vue 1). Flèche de bas
//   en haut : on soulève le membre et la dernière coupe est en haut de l'omoplate (NMSU, fig. 2-3).
// Vue 3 — le quartier détaché, face externe, couché (le cartilage à gauche, le carpe à droite) :
//   ses blocs délimités en pointillé, chacun sa trame : palette (sus- et sous-épineux, et le
//   deltoïde collé dessus, planche 62-16), bras (triceps, planche 62-16), jarret avant sous le coude
//   (planche 62-19 ; CEE-ONU 9126 : radius, cubitus et leurs muscles) ; le cartilage à nu au bout.
//
// NON ÉTABLI, donc pas dessiné : la main et le geste (64-40) ; toute proportion d'épaule d'orignal
// (celles du module, cerf recalé sur la silhouette) ; toute épaisseur (aucune cote). Le grain n'est
// pas porté : la section 18 ne l'établit pas (celui du sous-épineux et du chef long du triceps est à
// la 62-16). La lame de nerf du sous-épineux est à la 62-16. De quel côté reste le dentelé ventral
// n'est pas tranché par la source (CEE-ONU : « M. serratus ventralis retained or removed », à
// l'épaule comme aux côtes) : la couture est tirée contre le sous-scapulaire, le dentelé laissé sur
// les côtes, comme à la coupe IMPS 7.3.1 ; seule son attache à l'omoplate est tranchée. La partie
// brachiale (biceps, brachial, devant l'humérus) n'a pas de bloc à elle dans la section 18 : elle
// est comptée dans le bras, sans renvoi. Les proportions de la coupe (largeur du thorax, épaisseur
// des muscles) ne sont pas établies : seules les hauteurs viennent du module (épine de T4-T5,
// omoplate et cartilage à x = 760).
const C = require('./_carcasse-orignal');

const NOIR = '#1A1A1A', BLANC = '#FFFFFF';
const f1 = v => Math.round(v * 10) / 10;
const dP = (pts, ferme) => 'M' + pts.map(p => `${f1(p[0])} ${f1(p[1])}`).join(' L') + (ferme ? ' Z' : '');
const trait = (ep, extra = '') => `fill="none" stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="round"${extra}`;
const pointille = trait(1.4, ' stroke-dasharray="0.1 3.4"');
const sousPointille = `fill="none" stroke="${BLANC}" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round"`;
const chemin = (out, pts) => { out.push(`<path d="${dP(pts, false)}" ${sousPointille}/>`, `<path d="${dP(pts, false)}" ${pointille}/>`); };

// Les motifs : « gris », le même qu'à la carcasse commune (ce qui part avec l'épaule, et la palette
// à la vue 3) ; « bras », plus lâche et dans l'autre sens ; « jarret », en traits droits (pas en
// points : le pointillé de la couture du coude s'y perdrait).
const motifs = id => [
  `<pattern id="${id}-gris" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="3" stroke="${NOIR}" stroke-width="0.5"/></pattern>`,
  `<pattern id="${id}-bras" width="4.5" height="4.5" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)"><line x1="0" y1="0" x2="0" y2="4.5" stroke="${NOIR}" stroke-width="0.5"/></pattern>`,
  `<pattern id="${id}-jarret" width="4" height="4" patternUnits="userSpaceOnUse"><line x1="0" y1="0" x2="0" y2="4" stroke="${NOIR}" stroke-width="0.5"/></pattern>`,
].join('');

// ─── Le repère U du module et ses pattes allongées ─────────────────────────────────────────
// Les points ci-dessous sont relevés dans les tableaux du module, AVANT l'allongement des pattes ;
// allonge() les passe dans le repère final, exactement comme le module (bloc « Les pattes »).
function allonge(p) {
  let [x, y] = p;
  const w = Math.max(0, Math.min(1, (y - 880) / 70)), f = 1 - 0.2 * w;
  if (w > 0 && x < 1000) x = 707 + (x - 707) * f;
  if (y > 700) y = 700 + (y - 700) * 1.25;
  return p.length > 2 ? [x, y, p[2]] : [x, y];
}

// Le contour du quartier avant, face externe (vue 1 en trame, vue 3 sorti) : le cartilage de
// l'omoplate en haut (tableau cartilageOmoplate du module) ; derrière, le bord du chef long du
// triceps jusqu'à l'olécrane, puis le derrière de l'avant-bras (silhouette) ; coupé au carpe, sous
// le radius (CEE-ONU 9126) ; devant, l'avant-bras (silhouette), le devant du bras un peu en avant de
// l'humérus (biceps et brachial), la pointe de l'épaule et le bord avant du sus-épineux.
const QUARTIER_BRUT = [
  [704, 322, 'c'], [700, 310], [716, 302], [748, 300], [786, 308], [818, 326], [840, 350], [846, 372],
  [846, 400], [838, 440], [828, 480], [812, 540], [796, 600], [786, 632], [786, 652], [792, 672], [792, 692],
  [782, 720], [771, 760], [760, 810], [750, 860], [744, 895], [741, 914, 'c'],
  [680, 914, 'c'], [676, 890], [672, 840], [669, 790], [667, 745], [666, 713], [662, 690], [656, 665],
  [646, 640], [632, 615], [620, 590], [614, 568], [618, 552], [626, 543], [634, 512], [646, 478], [658, 440],
  [670, 400], [682, 362], [694, 334],
];
const QUARTIER = QUARTIER_BRUT.map(allonge);
// Les blocs de la vue 3, découpés dans ce contour. Palette | bras : le bord avant du triceps, de
// l'angle arrière de l'omoplate jusque sous l'articulation de l'épaule (contour tricepsLong du
// module), puis sous la pointe de l'épaule, le long du bas du deltoïde, jusqu'au devant du bras.
// Bras | jarret : la limite du coude du module (C.LIMITES.coude), qui passe entre l'humérus et
// l'avant-bras et contourne l'olécrane (ACIA 4.6 ; CEE-ONU 9126).
const COUTURE_PALETTE = [[846, 386], [834, 396], [815, 412], [795, 446], [770, 500], [752, 556], [728, 572],
  [702, 580], [678, 590], [656, 592], [636, 578], [616, 566]];
const COUTURE_COUDE = [[664, 702], [690, 694], [712, 688], [736, 670], [756, 648], [778, 641], [789, 656], [792, 676]];
// Le bord commun d'une couture et du contour : les points du contour entre deux indices
const tranche = (a, b) => (a <= b ? QUARTIER_BRUT.slice(a, b + 1) : [...QUARTIER_BRUT.slice(a), ...QUARTIER_BRUT.slice(0, b + 1)]);
const iQ = (x, y) => QUARTIER_BRUT.findIndex(p => p[0] === x && p[1] === y);
// palette : du bout avant de la couture, par le haut (sus-épineux, cartilage), jusqu'à l'angle arrière
const PALETTE = [...tranche(iQ(618, 552), iQ(846, 372)), ...COUTURE_PALETTE].map(allonge);
// bras : de l'angle arrière, le derrière du triceps jusqu'à l'olécrane, la couture du coude, le devant du bras
const BRAS = [...tranche(iQ(846, 400), iQ(792, 672)), ...COUTURE_COUDE.slice().reverse(), ...tranche(iQ(662, 690), iQ(614, 568)),
  ...COUTURE_PALETTE.slice().reverse()].map(allonge);
// jarret avant : sous la couture du coude, jusqu'au carpe
const JARRET = [...COUTURE_COUDE, ...tranche(iQ(792, 692), iQ(666, 713))].map(allonge);
// Le cartilage seul : il vient avec l'épaule, la coupe passe sur son bord
const CARTILAGE = C.OS.cartilageOmoplate;
// La ligne de levée (vue 1) : le haut de la limite de l'épaule, le demi-cercle au-dessus du cartilage
const LEVEE = C.LIMITES.epaule.slice(C.LIMITES.epaule.findIndex(p => p[0] === 684 && p[1] === 324),
  C.LIMITES.epaule.findIndex(p => p[0] === 848 && p[1] === 420) + 1);
// Le trait de la coupe de la vue 2 : à la 5e côte (tête à x 763 dans le module), à travers l'omoplate
const X_COUPE = 760;

// Le quartier avant entre dans le module comme un « muscle » à mettre en valeur : sa trame passe
// sous les os, comme celle des muscles de la carcasse commune. (En mémoire seulement : le fichier
// du module n'est pas touché.)
// « profond » : ainsi, une planche qui demande muscles: true dans le même processus ne le dessine pas.
C.MUSCLES.quartierAvant6215 = { nom: 'quartier avant', latin: '', profond: true, pts: QUARTIER };

// ─── Vue 1 ────────────────────────────────────────────────────────────────────────────────
// L'avant de la carcasse, du cou coupé à la dernière côte, du garrot au carpe
const CADRE_1 = [362, 128, 985, 990];

// ─── Vue 2 : la coupe ─────────────────────────────────────────────────────────────────────
// Repère u : origine au centre du corps de la vertèbre (T5 : [765, 395] dans le module), x vers la
// droite de la bête (on regarde de l'arrière : la droite de la bête est à droite du dessin), y vers
// le bas ; même unité que le repère U. Les hauteurs viennent du module à x = 760 : pointe de
// l'apophyse épineuse vers -210, dessus du garrot vers -240, haut du cartilage vers -100, jonction du
// cartilage et de l'omoplate vers -60, bord arrière de l'omoplate vers +45. La largeur est dessinée,
// pas mesurée.
const miroir = pts => pts.map(p => [-p[0], p[1], p[2]]);
const sym = droite => [...droite, ...miroir(droite).reverse().slice(1, -1)];
const lisse = (pts, ferme = false) => C.dense(pts, 1.2, ferme);
function decaler(ligne, d) {
  const n = ligne.length;
  return ligne.map((p, i) => {
    const a = ligne[Math.max(0, i - 1)], b = ligne[Math.min(n - 1, i + 1)];
    const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1;
    const dd = typeof d === 'function' ? d(p, i) : d;
    return [p[0] - dy / L * dd, p[1] + dx / L * dd];
  });
}
function bande(ligne, w0, w1 = w0) {
  const n = ligne.length;
  const w = i => w0 + (w1 - w0) * i / (n - 1);
  return [...decaler(ligne, (p, i) => -w(i) / 2), ...decaler(ligne, (p, i) => w(i) / 2).reverse()];
}
const proche = (l, q) => l.reduce((b, p, i) => (Math.hypot(p[0] - q[0], p[1] - q[1]) < Math.hypot(l[b][0] - q[0], l[b][1] - q[1]) ? i : b), 0);
const BAS = 104;                  // le bas arraché de la coupe
const HAUT = -242;                // le dessus du garrot

const S = (() => {
  // vertèbre (T5) : corps, arc, apophyse transverse courte, la longue apophyse épineuse du garrot
  const vert = sym([
    [0, -211], [2.6, -210], [3.9, -206], [3.5, -190], [3.1, -150], [2.9, -100], [3, -60], [3.2, -32], [4.6, -26.5],
    [8.5, -22.5, 'c'], [13, -20.5], [21, -20], [25, -17.5], [24.5, -13.5, 'c'], [16, -12.5], [11.5, -10.5, 'c'],
    [14.5, -6], [15.2, 0.5], [12.8, 7], [6.5, 11], [0, 12.5],
  ]);
  const canal = { c: [0, -16], r: 4.8 };
  // la côte : tête, tubercule sous l'apophyse transverse, puis elle plonge ; le thorax est étroit à
  // cette hauteur, l'omoplate couchée contre lui
  const coteL = lisse([[13, -3], [18, -10], [26, -15.5], [38, -18.5], [47, -16.5], [54, -10], [59, 0], [63, 15],
    [66.5, 35], [68.5, 60], [69.5, 90], [70, 140]]);
  const cote = bande(coteL, 6.5, 7.5);
  const coteDehors = decaler(coteL, -4.2);
  // la face interne de l'omoplate, du haut du cartilage au bord arrière
  const med = lisse([[43, -99], [47.5, -90], [52.5, -80], [57.5, -69], [63, -58], [68, -47], [73, -35], [78, -22],
    [83, -9], [87.5, 4], [91.5, 18], [94.5, 31], [97, 42], [98.5, 50]]);
  const iJ = med.findIndex(p => p[1] >= -58);                 // jonction du cartilage et de l'os
  const epais = (p, i) => (i < iJ ? -6.5 : -4.2 - Math.max(0, (p[1] - 20) / 30) * 1.8);
  const dehors = decaler(med, epais);
  const cartilage = [...med.slice(0, iJ + 1), ...dehors.slice(0, iJ + 1).reverse()];
  const omoplate = [...med.slice(iJ), ...dehors.slice(iJ).reverse()];
  // le contour extérieur, moitié droite, du dessus du garrot au bas arraché : le garrot étroit, puis
  // les épaules qui s'élargissent d'un coup
  const contour = lisse([[0, HAUT], [7, -240.5], [13, -236], [18, -228], [22, -216], [25, -200], [28, -180],
    [31.5, -160], [37, -140], [47, -122], [60, -108], [74, -94], [87, -78], [98, -60], [107, -40], [113.5, -19],
    [117.5, 3], [120, 26], [121, 50], [121.5, 80], [121.5, 110], [121.5, 140]]);
  // La couture (moitié droite), de bas en haut : entre le bras et le dentelé ventral ; entre le
  // sous-scapulaire et le dentelé ; contre l'os où le dentelé s'attache (il est tranché là) ; le long
  // de la face interne du cartilage ; autour de son bord ; et dehors à travers le trapèze.
  const SOUS = 10.8;            // épaisseur du sous-scapulaire, dessinée
  const off = y => (y > -34 ? SOUS : y < -50 ? 1.6 : 1.6 + (SOUS - 1.6) * (y + 50) / 16);
  const long = decaler(med, p => off(p[1]));
  const prolong = lisse([[98.5, 50], [100, 64], [101, 80], [101.5, 100], [101.5, 140]]);
  const bas = decaler(prolong, SOUS).slice(1);
  // autour du bord du cartilage
  const u = [med[1][0] - med[0][0], med[1][1] - med[0][1]], Lu = Math.hypot(u[0], u[1]);
  const [ux, uy] = [u[0] / Lu, u[1] / Lu];
  const dOut = decaler(med, (p, i) => epais(p, i) - 1.6);
  const bord = [[long[0][0] - ux * 2, long[0][1] - uy * 2], [(med[0][0] + dehors[0][0]) / 2 - ux * 3.6, (med[0][1] + dehors[0][1]) / 2 - uy * 3.6],
    [dOut[0][0] - ux * 2, dOut[0][1] - uy * 2]];
  // dehors, à travers le trapèze, jusqu'au contour le plus proche
  const iSortie = proche(contour, [dOut[0][0] + 10, dOut[0][1] - 6]);
  const couture = [...bas.slice().reverse(), ...long.slice().reverse(), ...bord, contour[iSortie]];
  // ce qui part avec l'épaule : tout ce qui est dehors de la couture, jusqu'au contour
  const epaule = [...couture, ...contour.slice(iSortie + 1)];
  // la longe dans la gouttière entre l'épine et la côte
  const dessus = decaler(coteL, -4.6).filter(p => p[0] >= 22 && p[0] <= 52);
  const longe = lisse([[7.5, -28], [16, -24.5], ...dessus, [54.5, -27], [56, -38], [54.5, -50], [49.5, -60], [41, -66.5],
    [30, -70], [19, -69], [10.5, -63.5], [6.8, -52], [6.2, -40]], true);
  // l'épineux contre l'apophyse, au-dessus de la longe
  const epineux = lisse([[4.2, -30], [6.8, -40], [7, -52], [10.5, -63.5], [19, -69], [25, -78], [27, -100], [24, -130],
    [18.5, -158], [11.5, -182], [4.2, -194], [4, -150], [4, -90], [4.2, -60]], true);
  // le trapèze : une nappe sous le contour, du dessus du garrot à l'épaule ; sa face profonde
  const iTrapBas = contour.findIndex(p => p[1] >= -36);
  const trapezeDedans = decaler(contour.slice(0, iTrapBas + 1), (p, i) => 7 * Math.min(1, (iTrapBas - i) / 22));
  // le rhomboïde, du cartilage à l'épine : sa limite avec le haut du dentelé ventral
  const iRh = long.findIndex(p => p[1] >= -84);
  const rhomboideBas = lisse([[25.8, -84], [33, -85], [40, -85], long[iRh]]);
  // le dentelé ventral : de son attache sous le cartilage jusqu'aux côtes, entre la couture et la
  // longe puis la côte
  const iSurCote = coteDehors.findIndex(p => p[0] >= 55);
  const dentele = [
    ...long.slice(iRh), ...bas, [coteDehors[coteDehors.length - 1][0], 140], ...coteDehors.slice(iSurCote).reverse(),
    [56, -38], [54.5, -50], [49.5, -60], [41, -66.5], [30, -70], [25, -78], [25.8, -84], [33, -85], [40, -85],
  ];
  // dans l'épaule : le bas du sous-scapulaire, le bas du sous-épineux (le bras en dessous)
  const iBas = med.length - 1;
  const sousScapBas = [med[iBas], long[iBas]];
  const sousEpBas = [dehors[iBas], contour[proche(contour, [121, 42])]];
  // la flèche : de bas en haut, dans le dentelé, le long de la couture
  const fleche = decaler([...prolong.slice().reverse().filter(p => p[1] <= 96), ...med.slice().reverse().filter(p => p[1] <= 50 && p[1] >= -26)].reverse(), SOUS + 7).reverse();
  return { vert, canal, cote, coteL, cartilage, omoplate, contour, couture, epaule, longe, epineux,
    trapezeDedans, rhomboideBas, dentele, sousScapBas, sousEpBas, fleche, med };
})();

const X2 = 140;                   // demi-largeur de la vue 2, pastilles comprises
function repere2(z) {
  const k = Math.min(z.l / (2 * X2), (z.h - 4) / (BAS + 28 - HAUT + 6));
  const ox = z.l / 2, oy = 6 - HAUT * k;
  return { k, V: p => [ox + p[0] * k, oy + p[1] * k] };
}

function dessinerCoupe(h, z) {
  const id = 'v2';
  const { k, V } = repere2(z);
  const tr = pts => pts.map(V);
  const deux = pts => [pts, miroir(pts)];
  const out = [];
  const yBas = V([0, BAS])[1];
  const contour = [...miroir(S.contour).reverse(), ...S.contour.slice(1)];
  const noir = `fill="${NOIR}" stroke="${NOIR}" stroke-width="0.7" stroke-linejoin="round"`;
  out.push(`<defs>${motifs(id)}<clipPath id="${id}-bas"><rect x="0" y="0" width="${z.l}" height="${f1(yBas)}"/></clipPath></defs>`);
  out.push(`<g clip-path="url(#${id}-bas)">`);
  // 1. le tronc : blanc, chaque muscle cerné
  out.push(`<path d="${dP(tr(contour), true)}" fill="${BLANC}" stroke="none"/>`);
  deux(S.longe).forEach(m => out.push(`<path d="${dP(tr(m), true)}" ${trait(1.4)}/>`));
  deux(S.epineux).forEach(m => out.push(`<path d="${dP(tr(m), true)}" ${trait(0.7)}/>`));
  deux(S.dentele).forEach(m => out.push(`<path d="${dP(tr(m), true)}" ${trait(0.7)}/>`));
  deux(S.rhomboideBas).forEach(m => out.push(`<path d="${dP(tr(m), false)}" ${trait(0.7)}/>`));
  // 2. l'épaule : ce qui part avec elle, dans la trame de la vue 1
  deux(S.epaule).forEach(m => {
    out.push(`<path d="${dP(tr(m), true)}" fill="${BLANC}" stroke="none"/>`);
    out.push(`<path d="${dP(tr(m), true)}" fill="url(#${id}-gris)" stroke="${NOIR}" stroke-width="0.7" stroke-linejoin="round"/>`);
  });
  deux(S.sousScapBas).forEach(m => out.push(`<path d="${dP(tr(m), false)}" ${trait(0.7)}/>`));
  deux(S.sousEpBas).forEach(m => out.push(`<path d="${dP(tr(m), false)}" ${trait(0.7)}/>`));
  // le trapèze : sa face profonde, au travers du tronc et de l'épaule
  deux(S.trapezeDedans).forEach(m => out.push(`<path d="${dP(tr(m), false)}" ${trait(0.7)}/>`));
  // 3. les os en noir, le cartilage en blanc
  deux(S.cote).forEach(m => out.push(`<path d="${dP(tr(m), true)}" ${noir}/>`));
  out.push(`<path d="${dP(tr(lisse(S.vert, true)), true)}" ${noir}/>`);
  out.push(`<circle cx="${f1(V(S.canal.c)[0])}" cy="${f1(V(S.canal.c)[1])}" r="${f1(S.canal.r * k)}" fill="${BLANC}" stroke="none"/>`);
  deux(S.omoplate).forEach(m => out.push(`<path d="${dP(tr(m), true)}" ${noir}/>`));
  deux(S.cartilage).forEach(m => out.push(`<path d="${dP(tr(m), true)}" fill="${BLANC}" stroke="${NOIR}" stroke-width="1.4" stroke-linejoin="round"/>`));
  // 4. le contour
  out.push(`<path d="${dP(tr(contour), false)}" ${trait(2.4)}/>`);
  out.push('</g>');
  // 5. l'arrachement du bas, à travers chaque paroi
  [1, -1].forEach(s => {
    const a = V([s * 66, BAS]), b = V([s * 121.5, BAS]);
    const L = b[0] - a[0];
    out.push(`<path d="M${f1(a[0])} ${f1(a[1])} C${f1(a[0] + L * 0.35)} ${f1(a[1] - 5)} ${f1(a[0] + L * 0.65)} ${f1(a[1] + 5)} ${f1(b[0])} ${f1(b[1])}" ${trait(0.7)}/>`);
  });
  // 6. la couture qu'on ouvre, côté gauche, et la lame qui monte le long d'elle
  chemin(out, tr(miroir(S.couture.filter(p => p[1] <= BAS - 2))));
  out.push(h.fleche(dP(tr(miroir(S.fleche)), false), h.a.arete));
  // le contour repasse par-dessus le liseré de la couture, là où elle sort
  out.push(`<g clip-path="url(#${id}-bas)"><path d="${dP(tr(contour), false)}" ${trait(2.4)}/></g>`);
  return out.join('\n');
}

// ─── Vue 3 : le quartier couché ───────────────────────────────────────────────────────────
// Couché face externe en l'air : le haut (le cartilage) à gauche, le carpe à droite ; l'avant de
// l'épaule en bas, le triceps en haut. Un quart de tour du repère U, rien d'autre.
const ROT = p => [p[1], -p[0]];
function repere3(z) {
  const pts = QUARTIER.map(ROT);
  const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
  const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
  const mx = 16, my = 26;
  const k = Math.min((z.l - 2 * mx) / (x1 - x0), (z.h - 2 * my) / (y1 - y0));
  const dx = (z.l - (x1 - x0) * k) / 2 - x0 * k, dy = (z.h - (y1 - y0) * k) / 2 - y0 * k;
  const Q = p => { const r = ROT(p); return [r[0] * k + dx, r[1] * k + dy]; };
  return { k, Q };
}

module.exports = (h) => {
  const place1 = z => C.placer(z, { cadre: CADRE_1 });
  const lisseU = (pts, ferme = false) => C.dense(pts, 3, ferme);

  return {
    ref: '62-15',
    titre: 'Le quartier avant : ce qui le tient au corps',
    desc: "Trois vues du quartier avant d'une carcasse d'orignal écorchée, sans la tête. En haut à gauche, l'avant de la "
      + "carcasse de profil gauche, le quartier avant en trame : l'omoplate et son cartilage sous le garrot, l'humérus, "
      + "le coude, l'avant-bras jusqu'au carpe ; au-dessus du cartilage, la ligne de levée en pointillé, un demi-cercle ; "
      + "un trait vertical marque la coupe. En haut à droite, la coupe à travers les deux omoplates, vue de l'arrière : "
      + "la vertèbre et sa longue apophyse épineuse au centre, la longe dans la gouttière, les côtes qui descendent ; "
      + "de chaque côté, l'omoplate couchée contre le thorax, le sous-scapulaire contre sa face interne, le dentelé "
      + "ventral entre elle et les côtes, le rhomboïde et le trapèze au-dessus. Ce qui part avec l'épaule est dans la "
      + "même trame qu'à la première vue, le tronc en blanc. À gauche, la couture qu'on ouvre, en pointillé : du bas, "
      + "entre l'épaule et les côtes, jusqu'au bord du cartilage, puis dehors à travers le trapèze ; une flèche monte le "
      + "long d'elle. En bas, le quartier détaché couché, face externe, le cartilage à gauche : la palette, le bras et "
      + "le jarret avant, chacun sa trame, séparés en pointillé.",
    format: 'pleine',
    disposition: [['ou', 'coupe'], ['sorti']],
    hauteurs: [1.6, 1],
    largeurs: [[1.12, 1], [1]],
    vues: {
      ou: {
        titre: 'Où il est',
        dessin: z => {
          const p = place1(z);
          const out = [C.dessiner(h, p, {
            id: 'v1', fondOs: false, loin: 'fin',
            os: ['vertebres', 'cotes', 'sternum', 'omoplate', 'cartilageOmoplate', 'humerus', 'radius', 'cubitus', 'carpe'],
            osForts: ['omoplate', 'cartilageOmoplate', 'humerus', 'cubitus'],
            valeur: { muscles: ['quartierAvant6215'], trame: 'gris' },
          })];
          // le contour du quartier, en trait fin
          out.push(`<path d="${dP(lisseU(QUARTIER, true).map(p.T), true)}" ${trait(0.7)}/>`);
          // la ligne de levée : le demi-cercle au-dessus du bord du cartilage
          chemin(out, lisseU(LEVEE).map(p.T));
          // le trait de la coupe
          const a = p.pt([X_COUPE, 132]), b = p.pt([X_COUPE, 500]);
          out.push(h.ligne(a[0], a[1], b[0], b[1], h.a.arete));
          return out.join('\n');
        },
        renvois: z => {
          const p = place1(z);
          return [
            { n: 1, texte: 'omoplate et son cartilage', rond: p.pt([560, 360]), cible: p.pt([700, 420]) },
            { n: 2, texte: 'humérus', rond: p.pt([470, 660]), cible: p.pt([662, 612]) },
            { n: 3, texte: 'coude, pointe de l’olécrane', rond: p.pt([900, 790]), cible: p.pt('olecrane') },
            { n: 4, texte: 'ligne de levée, au bord du cartilage', rond: p.pt([900, 190]), cible: p.pt([824, 321]) },
          ];
        },
      },
      coupe: {
        titre: 'En coupe, au trait de la vue de gauche',
        dessin: z => dessinerCoupe(h, z),
        renvois: z => {
          const { V } = repere2(z);
          return [
            { n: 5, texte: 'omoplate, doublée du M. subscapularis', rond: V([126, -64]), cible: V([75, -32]) },
            { n: 6, texte: 'dentelé ventral, M. serratus ventralis', rond: V([104, BAS + 17]), cible: V([81.5, 70]) },
            { n: 7, texte: 'trapèze et rhomboïde', rond: V([66, -200]), cible: V([24, -186]) },
            { n: 8, texte: 'longe, M. longissimus dorsi', rond: V([-70, -206]), cible: V([-32, -50]) },
            { n: 9, texte: 'la lame à plat, entre omoplate et côtes', rond: V([-124, 74]), cible: V([-86.2, 44]) },
          ];
        },
      },
      sorti: {
        titre: 'Le quartier détaché, face externe',
        dessin: z => {
          const { Q } = repere3(z);
          const id = 'v3';
          const q = dP(lisseU(QUARTIER, true).map(Q), true);
          const out = [`<defs>${motifs(id)}<clipPath id="${id}-q"><path d="${q}" fill="${BLANC}"/></clipPath></defs>`];
          out.push(`<path d="${q}" fill="${BLANC}" stroke="none"/>`);
          // les trois blocs, chacun sa trame, découpés par le contour
          out.push(`<g clip-path="url(#${id}-q)">`);
          [[PALETTE, 'gris'], [BRAS, 'bras'], [JARRET, 'jarret']].forEach(([b, t]) =>
            out.push(`<path d="${dP(lisseU(b, true).map(Q), true)}" fill="url(#${id}-${t})" stroke="none"/>`));
          // le cartilage, à nu : la coupe a passé sur son bord
          out.push(`<path d="${dP(lisseU(CARTILAGE, true).map(Q), true)}" fill="${BLANC}" stroke="${NOIR}" stroke-width="1.4" stroke-linejoin="round"/>`);
          // l'épine de l'omoplate, entre le sus-épineux et le sous-épineux
          const epine = C.MUSCLES.susEpineux.pts.slice(1, 8);
          out.push(`<path d="${dP(lisseU(epine).map(Q), false)}" ${trait(0.7)}/>`);
          out.push('</g>');
          // les coutures entre les blocs
          chemin(out, lisseU(COUTURE_PALETTE.map(allonge)).map(Q));
          chemin(out, lisseU(COUTURE_COUDE.map(allonge)).map(Q));
          out.push(`<path d="${q}" ${trait(2.4)}/>`);
          return out.join('\n');
        },
        renvois: z => {
          const { Q } = repere3(z);
          return [
            { n: 10, texte: 'palette, Mm. supraspinatus et infraspinatus', rond: [Q([720, 470])[0], z.h - 12], cible: Q([720, 470]) },
            { n: 11, texte: 'bras, M. triceps brachii', rond: [Q([790, 560])[0], 12], cible: Q([790, 560]) },
            { n: 12, texte: 'jarret avant : radius, cubitus, leurs muscles', rond: [Q(allonge([716, 840]))[0], z.h - 12], cible: Q(allonge([716, 840])) },
          ];
        },
      },
    },
  };
};
