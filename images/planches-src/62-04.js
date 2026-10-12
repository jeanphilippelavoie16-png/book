// Planche 62-04 — le quartier arrière à la couture.
// Chapitre 62, § 3 (« chaque muscle a sa membrane, et la couture entre deux membranes s'ouvre au
// doigt ; le muscle sort entier ») et tableau 5.2 ; le geste est au ch. 63, étapes 8 à 10.
// Documentation : suivi/62-documentation-planches.md, section 7 (ce qui est établi, vue par vue),
// sections 2 et 3 (conventions, écarts), « Base commune » (la carcasse du module).
//
// Une seule carcasse : la silhouette, les os et les contours de muscles de profil viennent du
// module _carcasse-orignal.js, dans son repère U. Le quartier est découpé dans la silhouette par
// la limite de la région 2 de la 62-02 (devant du bassin) et sous le tarse (le bas de patte part
// avant, région 1). Aucune cote : on ne construit rien et aucune dimension d'orignal n'est établie.
//
// Conventions (section 2) : trait plein = bord de muscle ou d'os ; pointillé = couture qu'on ouvre
// (gros points entre deux morceaux, petits points entre deux muscles d'un même morceau) ; tireté
// mixte = le trait de la coupe. Une trame par morceau, la même dans les cinq vues, pour qu'on
// retrouve dans la coupe le morceau vu de l'extérieur ou de l'intérieur. Aucune flèche de grain :
// la section 7 n'en établit aucune (le grain est aux planches 62-05 à 62-09).
//
// Vues :
//   ext     face externe, profil gauche (le quartier tel que le montre la 62-02) ; le chemin du
//           couteau de la pointe (de la rotule au grand trochanter, CEE-ONU 9240) puis du haut de surlonge
//           (du grand trochanter vers le devant du bassin, CEE-ONU 9220) ;
//   int     face interne, l'avant à gauche comme la face externe (le quartier droit par-dedans,
//           comme Sisson fig. 287) : le gracilis en chapeau, le couturier, le semi-membraneux ;
//   dessous la même face, gracilis et couturier ôtés (Sisson fig. 288) : pectiné, adducteur,
//           semi-membraneux, et le chemin du couteau de l'intérieur, du bas du fémur vers la
//           pointe de la fesse (CEE-ONU 9237), le long des attaches au fémur puis à l'ischium ;
//   ou      la carcasse entière, le quartier en aplat noir (où est le morceau) ;
// Les os sont en tireté dans les trois vues du quartier : ils sont sous la viande.
//   coupe   la coupe au milieu de la cuisse, au trait mixte de la face externe, vue d'en haut :
//           l'avant à gauche, le dehors (le côté de la face externe) en bas. Disposition relevée
//           sur Sisson fig. 290 (cheval, cuisse droite : retournée pour la cuisse gauche) et la
//           légende de GUELPH ; proportions du cheval, celles de l'orignal n'étant pas établies.
'use strict';
const C = require('./_carcasse-orignal');

const NOIR = '#1A1A1A', BLANC = '#FFFFFF';
const f1 = v => Math.round(v * 10) / 10;
const dD = (pts, ferme) => 'M' + pts.map(p => `${f1(p[0])} ${f1(p[1])}`).join(' L') + (ferme ? ' Z' : '');
const trait = (ep, extra = '') => `fill="none" stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="round"${extra}`;
const lisere = ep => `fill="none" stroke="${BLANC}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="round"`;
const COUTURE = trait(2.4, ' stroke-dasharray="0.1 5"');          // entre deux morceaux
const COUTURE_FINE = trait(1.4, ' stroke-dasharray="0.1 3.4"');    // entre deux muscles d'un morceau
const MIXTE = trait(0.7, ' stroke-dasharray="10 3 1.5 3"');        // trait de coupe

// ─── Outils ────────────────────────────────────────────────────────────────────────────────
const nu = pts => pts.map(p => [p[0], p[1]]);
const sd = (pts, pas = 2.5) => C.dense(nu(pts), pas, false);        // courbe ouverte lissée
// Courbe fermée lissée ; les points marqués 'c' sont des angles (le lissage du module perd le
// premier point d'une liste fermée qui ne commence pas par un angle : on coupe soi-même).
function lisseFerme(pts, pas = 2.5) {
  const i0 = pts.findIndex(p => p[2] === 'c');
  if (i0 < 0) return C.dense(nu(pts), pas, true);
  const r = pts.slice(i0).concat(pts.slice(0, i0), [pts[i0]]);
  const out = [];
  let cur = [r[0]];
  for (let i = 1; i < r.length; i++) {
    cur.push(r[i]);
    if (r[i][2] === 'c' || i === r.length - 1) {
      const s = C.dense(nu(cur), pas, false);
      out.push(...(out.length ? s.slice(1) : s));
      cur = [r[i]];
    }
  }
  out.pop();
  return out;
}
const rev = a => a.slice().reverse();
const interpY = (a, b, y) => a[0] + (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1]);
// décale une polyligne de d (en U) du côté où se trouve le point « vers »
function decale(pts, d, vers) {
  const n = pts.length;
  const m = pts[Math.floor(n / 2)], a = pts[Math.max(0, Math.floor(n / 2) - 1)], b = pts[Math.min(n - 1, Math.floor(n / 2) + 1)];
  let nx = -(b[1] - a[1]), ny = b[0] - a[0];
  const L = Math.hypot(nx, ny) || 1; nx /= L; ny /= L;
  const s = ((vers[0] - m[0]) * nx + (vers[1] - m[1]) * ny) > 0 ? 1 : -1;
  return pts.map((p, i) => {
    const q = pts[Math.max(0, i - 1)], r = pts[Math.min(n - 1, i + 1)];
    let tx = r[0] - q[0], ty = r[1] - q[1]; const l = Math.hypot(tx, ty) || 1; tx /= l; ty /= l;
    return [p[0] - ty * d * s, p[1] + tx * d * s];
  });
}
// retire une longueur (en U) au début et à la fin d'une polyligne
function rogne(pts, debut, fin) {
  const coupe = (P, L) => {
    let acc = 0;
    for (let i = 1; i < P.length; i++) {
      const s = Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]);
      if (acc + s >= L) { const t = (L - acc) / s; return [[P[i - 1][0] + (P[i][0] - P[i - 1][0]) * t, P[i - 1][1] + (P[i][1] - P[i - 1][1]) * t], ...P.slice(i)]; }
      acc += s;
    }
    return P.slice(-2);
  };
  return rev(coupe(rev(coupe(pts, debut)), fin));
}

// ─── Les trames : une par morceau, les mêmes dans toutes les vues ──────────────────────────
function trames(id) {
  const L = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${NOIR}" stroke-width="0.5"/>`;
  const pat = (nom, w, rot, corps) => `<pattern id="${id}-${nom}" width="${w}" height="${w}" patternUnits="userSpaceOnUse"${rot ? ` patternTransform="rotate(${rot})"` : ''}>${corps}</pattern>`;
  const pt = (x, y) => `<circle cx="${x}" cy="${y}" r="0.7" fill="${NOIR}" stroke="none"/>`;
  return [
    pat('croupe', 4.5, 0, L(0, 0, 0, 4.5)),                        // haut de surlonge : traits debout
    pat('pointe', 4, 0, pt(1, 1) + pt(3, 3)),                        // pointe de surlonge : points
    pat('exterieur', 4.5, 45, L(0, 0, 0, 4.5)),                      // extérieur de ronde : ////
    pat('noix', 4.5, 45, L(0, 0, 0, 4.5) + L(0, 0, 4.5, 0)),         // noix de ronde : quadrillé
    pat('interieur', 4.5, -45, L(0, 0, 0, 4.5)),                     // intérieur de ronde : \\\\
    pat('chapeau', 4, 0, L(0, 0, 4, 0)),                              // chapeau de l'intérieur et côté mou : traits couchés
  ].join('');
}

// ─── Le quartier dans la silhouette (repère U du module) ────────────────────────────────────
const S = C.SILHOUETTE;
const Y_CANON = 1035;                                   // sous le tarse : le bas de patte est parti
const HAUT = [1190, S[21][1] + (S[22][1] - S[21][1]) * (1190 - S[21][0]) / (S[22][0] - S[21][0]), 'c'];   // la limite coupe le dos
const QUARTIER = [
  ...S.slice(30, 44),
  [interpY(S[43], S[44], Y_CANON), Y_CANON, 'c'], [interpY(S[62], S[61], Y_CANON), Y_CANON, 'c'],
  ...S.slice(62, 74),                                    // devant de la jambe, jusqu'au grasset
  ...rev(C.LIMITES.hanche.slice(1, -1)),                 // la limite de la région 2 (62-02)
  HAUT,
  ...S.slice(22, 30),                                    // la ligne du dos, la croupe
];
const Q = lisseFerme(QUARTIER);
const CADRE = [1168, 276, 1512, 1042];

// ─── Face externe : les coutures (CEE-ONU 9220, 9240, 9217, 9218, 9116 ; IMPS 184) ──────────
const GT = [1370, 447];                                  // le grand trochanter, où elles se rejoignent
const F1 = [1191.8, 388];                                // la couture croupe / pointe sort devant
const E1 = [1406, 384];                                  // haut de la couture extérieur / noix
const D1 = [1413, 367.5];                                // où elle touche la ligne du dos
const A1 = [1262, 698.6], A2 = [1388, 717.6];           // les coutures qui tombent sur le grasset
const S1 = sd([F1, [1205, 389], [1226, 398], [1262, 410], [1300, 423], [1335, 437], GT]);       // croupe / pointe
const S2 = sd([A1, [1262, 672], [1263, 645], [1268, 620], [1280, 580], [1296, 540], [1309, 507], [1320, 478], [1340, 458], GT]);   // pointe / extérieur
const S3a = sd([GT, [1380, 425], [1393, 401], E1]);                                             // croupe / extérieur
const S3b = sd([E1, D1]);                                                                       // croupe / noix
const S4 = sd([E1, [1428, 398], [1440, 430], [1438, 480], [1430, 542], [1416, 605], [1401, 660], [1392, 695], A2]);   // extérieur / noix
const GR = [[1236, 697], A1, [1268, 699], [1300, 701.25], [1340, 710], [1380, 716.25], A2, [1416, 722.5]];
const Ga = sd(GR.slice(0, 2)), Gb = sd(GR.slice(1, 7)), Gc = sd(GR.slice(6));                   // le grasset
const MORCEAUX_EXT = {
  croupe: [[1150, 200], [1440, 200], [1440, 350], ...rev(S3b), ...rev(S3a), ...rev(S1), [1150, 388]],
  pointe: [[1150, 388], ...S1, ...rev(S2), ...rev(Ga), [1150, 697]],
  exterieur: [...S3a, ...S4, ...rev(Gb), ...S2],
  noix: [...S3b, [1440, 350], [1520, 350], [1520, 722.5], ...rev(Gc), ...rev(S4)],
};
const Y_COUPE = 575;                                     // le trait de la coupe, au milieu de la cuisse
const X_COUPE = [interpY([1203, 560], [1213, 630], Y_COUPE), interpY(S[32], S[33], Y_COUPE)];

// ─── Face interne (Sisson fig. 287, 288 ; CEE-ONU 9237, 9239 ; IMPS 169A ; GUELPH) ───────────
// Le bas du bassin (pubis et ischium) de profil, d'après le contour du module.
const PLANCHER = [[1316, 471], [1332, 481], [1362, 479], [1402, 471], [1440, 466], [1462, 461]];
const SART_AV = [[1258, 436], [1262, 470], [1263, 520], [1264, 580], [1266, 640], [1270, 685], [1274, 699.4]];
const SART_AR = [[1284, 436], [1287, 480], [1289, 540], [1289, 600], [1290, 650], [1291, 700.6]];
const SART_HAUT = [[1258, 436], [1262, 429], [1271, 426], [1280, 429], [1284, 436]];
const HAUT_POINTE = [[1150, 414], [1193, 415], [1230, 428], [1258, 436]];
const GRAC_AR = [[1432, 467], [1428, 500], [1418, 550], [1404, 600], [1388, 650], [1372, 692], [1366, 714]];
const GRAC_HAUT = [[1287, 476], [1316, 471], [1332, 481], [1362, 479], [1402, 471], [1432, 467]];
const PECT_AV = [[1316, 471], [1311, 485], [1304, 510], [1297, 545], [1293, 578], [1298, 598]];
const PECT_AR = [[1348, 482], [1341, 510], [1327, 545], [1311, 578], [1298, 598]];
const ADD_AR = [[1415, 469], [1411, 505], [1398, 552], [1380, 600], [1360, 640], [1340, 664], [1322, 668]];
const ADD_AV = [[1298, 598], [1302, 620], [1306, 648], [1322, 668]];
const SM_AV = [[1322, 668], [1318, 688], [1316, 704.8]];
const grasset = (x0, x1) => { const g = sd(GR); return g.filter(p => p[0] >= x0 && p[0] <= x1); };
const MORCEAUX_INT = {
  pointe: [[1150, 414], ...HAUT_POINTE.slice(1), ...SART_AV.slice(1), ...rev(grasset(1150, 1274)), [1150, 697]],
  sartorius: [...SART_HAUT, ...SART_AR.slice(1), ...rev(grasset(1274, 1291)), ...rev(SART_AV)],
  gracilis: [...GRAC_HAUT, ...GRAC_AR.slice(1), ...rev(grasset(1291, 1366)), ...rev(SART_AR.slice(1))],
  semimembraneux: [[1432, 467], [1440, 466], [1462, 461], [1520, 458], [1520, 722.5], ...rev(grasset(1366, 1417)), ...rev(GRAC_AR)],
};
const MORCEAUX_DESSOUS = {
  pointe: [[1150, 414], ...HAUT_POINTE.slice(1), [1290, 446], [1316, 471], ...PECT_AV.slice(1), ...ADD_AV.slice(1), ...SM_AV.slice(1), ...rev(grasset(1150, 1316)), [1150, 697]],
  pectine: [...PECT_AV, ...rev(PECT_AR), [1332, 481]],
  adducteur: [[1348, 482], [1362, 479], [1402, 471], ...ADD_AR, ...rev(ADD_AV), ...rev(PECT_AR)],
  semimembraneux: [[1415, 469], [1440, 466], [1462, 461], [1520, 458], [1520, 722.5], ...rev(grasset(1316, 1417)), ...rev(SM_AV), ...rev(ADD_AR)],
};
// le chemin du couteau de l'intérieur : du bas du fémur, le long des attaches au fémur, puis sous
// l'ischium jusqu'à la pointe de la fesse
const COUTEAU_INT = sd([[1330, 690], [1319, 656], [1315, 626], [1319, 598], [1329, 568], [1342, 532], [1353, 505], [1370, 490], [1400, 484], [1430, 478], [1450, 471]]);

// ─── La coupe (Sisson fig. 290, relevée dans son cadre : avant en haut, dehors à droite) ──────
const CT = [[240, 14], [278, 55], [335, 95], [405, 152], [472, 222], [532, 302], [582, 382], [625, 465],
  [652, 545], [669, 625], [675, 705], [671, 785], [658, 862], [636, 930], [608, 985], [570, 1035], [515, 1078],
  [448, 1110], [365, 1130], [295, 1128], [248, 1116], [215, 1102], [188, 1086], [150, 1060], [98, 1002],
  [58, 925], [32, 840], [18, 750], [15, 660], [18, 600], [24, 540], [34, 470], [52, 395], [92, 290], [142, 182], [192, 92]];
const CTD = C.dense(CT, 3, true);                        // le contour lissé ; les coutures y aboutissent
const iCT = j => CTD.findIndex(p => Math.abs(p[0] - CT[j][0]) < 1e-6 && Math.abs(p[1] - CT[j][1]) < 1e-6);
const arcC = (i, j) => { const out = []; const n = CTD.length; let k = iCT(i); const fin = iCT(j); for (;;) { out.push(CTD[k]); if (k === fin) break; k = (k + 1) % n; } return out; };
const arcCinv = (i, j) => rev(arcC(j, i));
const FEM = { c: [385, 560], rx: 78, ry: 98 };
const E = t => [FEM.c[0] + FEM.rx * Math.cos(t * Math.PI / 180), FEM.c[1] + FEM.ry * Math.sin(t * Math.PI / 180)];
const arcF = (t0, t1) => { const n = Math.max(2, Math.ceil(Math.abs(t1 - t0) / 5)); return Array.from({ length: n + 1 }, (_, i) => E(t0 + (t1 - t0) * i / n)); };
const P0 = E(30), FB = E(85), FLL = E(135), FL = E(165);
const V = [95, 560], G2 = [56, 760], N = [365, 775];
const cA = sd([P0, [500, 590], [545, 555], [588, 510], CT[7]]);                    // pointe / extérieur
const cPV = sd([V, [170, 570], [240, 578], FL]);                                    // pointe / pectiné
const cSI = sd([CT[32], [88, 410], [106, 450], [108, 500], V]);                     // pointe / couturier
const cSG = sd([CT[30], [58, 552], V]);                                             // couturier / gracilis
const cPB = sd([V, [120, 590], [170, 610], [250, 625], FLL]);                      // pectiné / adducteur
const cGa = sd([V, [66, 600], [56, 680], G2]);                                      // gracilis / adducteur
const cGb = sd([G2, [75, 830], [100, 880], [122, 928], [152, 1000], CT[22]]);      // gracilis / semi-membraneux
const cFN = sd([FB, [386, 700], [374, 740], N]);                                    // adducteur / extérieur
const cD = sd([G2, [95, 740], [150, 720], [220, 722], [300, 742], N]);             // adducteur / semi-membraneux
const cC = sd([N, [330, 840], [295, 920], [268, 1010], CT[20]]);                   // semi-membraneux / noix
const cB = sd([N, [400, 830], [450, 880], [520, 925], [575, 955], CT[14]]);        // extérieur / noix
const MORCEAUX_COUPE = {
  pointe: [...arcC(32, 7), ...rev(cA), ...arcF(30, -195), ...rev(cPV), ...rev(cSI)],
  sartorius: [...arcCinv(32, 30), ...cSG.slice(1), ...rev(cSI)],
  gracilis: [...arcCinv(30, 22), ...rev(cGb), ...rev(cGa), ...rev(cSG).slice(1)],
  pectine: [...cPV, ...arcF(165, 135), ...rev(cPB)],
  adducteur: [...cPB, ...arcF(135, 85), ...cFN, ...rev(cD), ...rev(cGa)],
  semimembraneux: [...cD, ...cC, ...arcC(20, 22).slice(1), ...rev(cGb)],
  noix: [...cC, ...arcCinv(20, 14).slice(1), ...rev(cB)],
  exterieur: [...cA, ...arcC(7, 14).slice(1), ...rev(cB), ...rev(cFN), ...arcF(85, 30)],
};
// coutures à l'intérieur d'un morceau (petits points)
const COUPE_FINES = [
  sd([CT[35], [240, 80], [300, 82], CT[2]]),                                         // tenseur du fascia lata
  sd([[206, 88], [178, 150], [168, 240], [200, 325], [262, 366], [335, 370], [392, 338], [418, 268], [410, 188], [368, 118], [326, 91]]),   // droit fémoral
  sd([[205, 332], [232, 400], [262, 462], E(215)]),                                  // vaste médial / intermédiaire
  sd([[398, 334], [438, 395], [460, 462], E(345)]),                                  // vaste latéral / intermédiaire
  cSG, cD,                                                                           // couturier / gracilis ; adducteur / semi-membraneux
  sd([[400, 830], [480, 836], [570, 847], CT[12]]),                                  // les deux parties du biceps
];
const COUPE_COUTURES = [cA, cPV, cSI, cPB, cGa, cGb, cFN, cC, cB];

// ─── Rendu ─────────────────────────────────────────────────────────────────────────────────
module.exports = (h) => {
  const place = z => C.placer(z, { cadre: CADRE });
  const TR = p => pts => pts.map(p.T);

  // les os repères, en fond blanc, trait fin
  // les os repères : 'blanc' (fond blanc, trait fin), 'fin' (trait fin), 'cache' (sous la viande : tireté)
  function os(p, noms, maniere = 'blanc') {
    const tr = TR(p);
    const at = { blanc: `fill="${BLANC}" stroke="${NOIR}" stroke-width="0.7" stroke-linejoin="round"`, fin: trait(0.7), cache: h.a.cache }[maniere];
    return noms.map(n => `<path d="${dD(tr(lisseFerme(C.OS[n], 2)), true)}" ${at}/>`).join('\n');
  }
  const couture = (tr, pts, fine = false) =>
    `<path d="${dD(tr(pts))}" ${lisere(fine ? 3 : 4.5)}/>\n<path d="${dD(tr(pts))}" ${fine ? COUTURE_FINE : COUTURE}/>`;
  const bord = (tr, pts) => `<path d="${dD(tr(pts))}" ${trait(0.7)}/>`;
  const fleche = (tr, pts) => `<path d="${dD(tr(pts))}" ${lisere(4)}/>\n` + h.fleche(dD(tr(pts)), h.a.arete);
  const remplir = (id, tr, morceaux, clip) => `<g clip-path="url(#${clip})">\n` + Object.entries(morceaux)
    .filter(([, m]) => m.trame).map(([, m]) => `<path d="${dD(tr(m.pts), true)}" fill="url(#${id}-${m.trame})" stroke="none"/>`).join('\n') + '\n</g>';

  return {
    ref: '62-04',
    titre: 'Le quartier arrière à la couture',
    desc: "Le quartier arrière gauche d'une carcasse d'orignal, du devant du bassin au tarse, en cinq vues. "
      + "Chaque morceau porte sa trame, la même dans toutes les vues : haut de surlonge en traits debout, pointe de surlonge "
      + "en points, extérieur de ronde en traits obliques, noix de ronde en quadrillé, intérieur de ronde en traits "
      + "obliques de l'autre sens, chapeau de l'intérieur de ronde et son côté mou en traits couchés ; le jarret reste "
      + "blanc. Les coutures entre deux morceaux sont en gros points, celles entre deux muscles d'un même morceau en "
      + "petits points. Face externe : le haut de surlonge sur le bassin, la pointe devant le fémur, l'extérieur "
      + "derrière, la noix au bord arrière, le jarret sous le grasset ; les coutures du haut de surlonge et de la pointe "
      + "se rejoignent au grand trochanter, et deux flèches suivent "
      + "le couteau de la rotule au grand trochanter, puis vers le devant du bassin. Face interne : le gracilis en "
      + "chapeau, le couturier devant lui, le semi-membraneux derrière. Gracilis et couturier ôtés : le pectiné, l'adducteur, le "
      + "semi-membraneux, et la flèche du couteau de l'intérieur, du bas du fémur vers la pointe de la fesse. En bas, "
      + "la carcasse entière avec le quartier en valeur, et la coupe au milieu de la cuisse, vue d'en haut, l'avant à "
      + "gauche et le dehors en bas : le fémur au centre, chaque morceau autour, séparé des autres par ses coutures.",
    format: 'pleine',
    disposition: [['ext', 'int', 'dessous'], ['ou', 'coupe']],
    hauteurs: [2.05, 1],
    largeurs: [[1, 1, 1], [1, 2.2]],
    vues: {
      ext: {
        titre: 'Face externe',
        dessin: z => {
          const id = 'qa', p = place(z), tr = TR(p);
          const m = {
            croupe: { pts: MORCEAUX_EXT.croupe, trame: 'croupe' },
            pointe: { pts: MORCEAUX_EXT.pointe, trame: 'pointe' },
            exterieur: { pts: MORCEAUX_EXT.exterieur, trame: 'exterieur' },
            noix: { pts: MORCEAUX_EXT.noix, trame: 'noix' },
          };
          const coutureK = [S1, S2, S3a, S3b, S4, sd(GR)];
          const couteauPointe = rogne(decale(S2, 9, [1200, 560]), 26, 14);
          const couteauCroupe = rogne(decale(rev(S1), 9, [1300, 380]), 14, 24);
          const ligne = [[X_COUPE[0] - 16, Y_COUPE], [X_COUPE[1] + 16, Y_COUPE]];
          return [
            `<defs>${trames(id)}<clipPath id="${id}-q"><path d="${dD(tr(Q), true)}" fill="${BLANC}"/></clipPath></defs>`,
            remplir(id, tr, m, `${id}-q`),
            `<g clip-path="url(#${id}-q)">`,
            os(p, ['bassin', 'femur', 'rotule', 'tibia', 'calcaneum', 'tarse', 'metatarse'], 'cache'),
            ...coutureK.map(c => couture(tr, c)),
            '</g>',
            fleche(tr, couteauPointe),
            fleche(tr, couteauCroupe),
            `<path d="${dD(tr(ligne))}" ${lisere(3)}/>`,
            `<path d="${dD(tr(ligne))}" ${MIXTE}/>`,
            ((a, b) => [h.ligne(a[0], a[1], a[0] + 8, a[1], h.a.arete), h.ligne(b[0] - 8, b[1], b[0], b[1], h.a.arete)].join('\n'))(p.T(ligne[0]), p.T(ligne[1])),
            `<path d="${dD(tr(Q), true)}" ${trait(2.4)}/>`,
          ].join('\n');
        },
        renvois: z => {
          const p = place(z);
          return [
            { n: 1, texte: 'haut de surlonge — gluteus medius', rond: [z.l - 12, 16], cible: p.pt([1300, 360]) },
            { n: 2, texte: 'pointe de surlonge — quadriceps femoris', rond: [12, p.pt([0, 760])[1]], cible: p.pt([1236, 600]) },
            { n: 3, texte: 'extérieur de ronde — biceps femoris', rond: [z.l - 12, p.pt([0, 760])[1]], cible: p.pt([1372, 690]) },
            { n: 4, texte: 'noix de ronde — semitendinosus', rond: [z.l - 12, p.pt([0, 640])[1]], cible: p.pt([1444, 560]) },
            { n: 5, texte: 'jarret — gastrocnemius, fléchisseurs', rond: [22, p.pt([0, 880])[1]], cible: p.pt([1350, 840]) },
            { n: 6, texte: 'grand trochanter, où les coutures se rejoignent', rond: [z.l - 12, 46], cible: p.pt(GT) },
          ];
        },
      },
      int: {
        titre: 'Face interne',
        dessin: z => {
          const id = 'qb', p = place(z), tr = TR(p);
          const m = {
            pointe: { pts: MORCEAUX_INT.pointe, trame: 'pointe' },
            sartorius: { pts: MORCEAUX_INT.sartorius, trame: 'chapeau' },
            gracilis: { pts: MORCEAUX_INT.gracilis, trame: 'chapeau' },
            semimembraneux: { pts: MORCEAUX_INT.semimembraneux, trame: 'interieur' },
          };
          return [
            `<defs>${trames(id)}<clipPath id="${id}-q"><path d="${dD(tr(Q), true)}" fill="${BLANC}"/></clipPath></defs>`,
            remplir(id, tr, m, `${id}-q`),
            `<g clip-path="url(#${id}-q)">`,
            `<path d="${dD(tr(lisseFerme(C.OS.bassin, 2)), true)}" ${trait(0.7)}/>`,
            os(p, ['femur', 'rotule', 'tibia', 'calcaneum', 'tarse', 'metatarse'], 'cache'),
            bord(tr, sd(HAUT_POINTE)), bord(tr, sd(SART_HAUT)),
            couture(tr, sd(SART_AV)), couture(tr, sd(SART_AR), true), couture(tr, sd(GRAC_AR)),
            couture(tr, sd(GR)),
            '</g>',
            `<path d="${dD(tr(Q), true)}" ${trait(2.4)}/>`,
          ].join('\n');
        },
        renvois: z => {
          const p = place(z);
          return [
            { n: 7, texte: 'chapeau de l’intérieur de ronde — gracilis', rond: [z.l - 12, 30], cible: p.pt([1350, 560]) },
            { n: 8, texte: 'côté mou — sartorius', rond: [12, p.pt([0, 800])[1]], cible: p.pt([1276, 620]) },
          ];
        },
      },
      dessous: {
        titre: 'Gracilis et couturier ôtés',
        dessin: z => {
          const id = 'qc', p = place(z), tr = TR(p);
          const m = {
            pointe: { pts: MORCEAUX_DESSOUS.pointe, trame: 'pointe' },
            pectine: { pts: MORCEAUX_DESSOUS.pectine, trame: 'chapeau' },
            adducteur: { pts: MORCEAUX_DESSOUS.adducteur, trame: 'interieur' },
            semimembraneux: { pts: MORCEAUX_DESSOUS.semimembraneux, trame: 'interieur' },
          };
          return [
            `<defs>${trames(id)}<clipPath id="${id}-q"><path d="${dD(tr(Q), true)}" fill="${BLANC}"/></clipPath></defs>`,
            remplir(id, tr, m, `${id}-q`),
            `<g clip-path="url(#${id}-q)">`,
            `<path d="${dD(tr(lisseFerme(C.OS.bassin, 2)), true)}" ${trait(0.7)}/>`,
            os(p, ['femur', 'rotule', 'tibia', 'calcaneum', 'tarse', 'metatarse'], 'cache'),
            bord(tr, sd(HAUT_POINTE.concat([[1290, 446], [1316, 471]]))),
            couture(tr, sd(PECT_AV)), couture(tr, sd(PECT_AR)),
            couture(tr, sd(ADD_AV)), couture(tr, sd(SM_AV)), couture(tr, sd(ADD_AR), true),
            couture(tr, sd(GR)),
            '</g>',
            fleche(tr, COUTEAU_INT),
            `<path d="${dD(tr(Q), true)}" ${trait(2.4)}/>`,
          ].join('\n');
        },
        renvois: z => {
          const p = place(z);
          return [
            { n: 9, texte: 'côté mou — pectineus', rond: [12, p.pt([0, 470])[1]], cible: p.pt([1316, 520]) },
            { n: 10, texte: 'intérieur de ronde — adductor', rond: [z.l - 12, p.pt([0, 560])[1]], cible: p.pt([1370, 560]) },
            { n: 11, texte: 'intérieur de ronde — semimembranosus', rond: [z.l - 12, p.pt([0, 660])[1]], cible: p.pt([1410, 660]) },
            { n: 12, texte: 'pointe de la fesse, où finit la couture', rond: [z.l - 12, 30], cible: p.pt('pointeFesse') },
          ];
        },
      },
      ou: {
        titre: 'Sur la carcasse',
        dessin: z => {
          const id = 'qd', p = C.placer(z, { echelle: 0.125 }), tr = TR(p);
          return [
            `<defs>${trames(id)}</defs>`,
            C.dessiner(h, p, { id, loin: 'fin' }),
            `<g clip-path="url(#${id}-corps)"><path d="${dD(tr(Q), true)}" ${h.a.plein}/></g>`,
            `<path d="${dD(tr(lisseFerme(S)), true)}" ${trait(2.4)}/>`,
          ].join('\n');
        },
      },
      coupe: {
        titre: 'Coupe au trait mixte de la face externe, vue d’en haut',
        dessin: z => {
          const id = 'qe', m = 8;
          const s = Math.min((z.l - 2 * m) / 1118, (z.h - 2 * m) / 662);
          const ox = (z.l - 1118 * s) / 2 - 12 * s, oy = (z.h - 662 * s) / 2 - 14 * s;
          const T = q => [ox + q[1] * s, oy + q[0] * s];       // l'avant à gauche, le dehors en bas
          const tr = pts => pts.map(T);
          const trame = { pointe: 'pointe', sartorius: 'chapeau', gracilis: 'chapeau', pectine: 'chapeau', adducteur: 'interieur',
            semimembraneux: 'interieur', noix: 'noix', exterieur: 'exterieur' };
          const femur = arcF(0, 360), moelle = Array.from({ length: 73 }, (_, i) => [380 + 56 * Math.cos(i * 5 * Math.PI / 180), 560 + 76 * Math.sin(i * 5 * Math.PI / 180)]);
          return [
            `<defs>${trames(id)}<clipPath id="${id}-c"><path d="${dD(tr(CTD), true)}" fill="${BLANC}"/></clipPath></defs>`,
            `<g clip-path="url(#${id}-c)">`,
            ...Object.entries(MORCEAUX_COUPE).map(([k, pts]) => `<path d="${dD(tr(pts), true)}" fill="url(#${id}-${trame[k]})" stroke="none"/>`),
            ...COUPE_FINES.map(c => couture(tr, c, true)),
            ...COUPE_COUTURES.map(c => couture(tr, c)),
            '</g>',
            `<path d="${dD(tr(femur), true)}" fill="${BLANC}" stroke="${NOIR}" stroke-width="1.4" stroke-linejoin="round"/>`,
            `<path d="${dD(tr(moelle), true)}" ${trait(0.7)}/>`,
            `<path d="${dD(tr(CTD), true)}" ${trait(2.4)}/>`,
          ].join('\n');
        },
      },
    },
  };
};
