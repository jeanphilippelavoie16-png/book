// _animaux.js — les animaux des planches, de profil, au trait du livre.
//
// Une fonction par animal. Les masses simples d'abord (tête, corps, cuisse, pied), puis le contour
// tracé par points clés par-dessus (trace : Catmull-Rom, les angles marqués 'c'), l'union des
// pièces par Clipper, un lissage léger, et un seul contour blanc au poids du corps simple (1,5) ;
// les traits intérieurs à 0,7 (la cuisse, l'oreille), le côté loin en gris loin. Pas de poil ni de
// plume : la silhouette, l'œil, et ce qui identifie l'espèce. Un animal calqué sur une planche (les
// oiseaux de Fuertes) dit d'où vient son contour, au-dessus de sa fonction.
//
//   const A = require('./_animaux');
//   const l = A.lievre(h, { x, y, echelle, cote, trait, oreilles, cou });
//   out.push(l.svg);                       // ou `${l}`
//   l.cou -> [x, y]  le milieu du cou, là où se ferme la boucle ; l.nuque, l.gorge, l.boite, l.oeil, l.museau, l.sol
//
//   x, y      le point au sol sous le cou (vue) ; y est le dessus de la neige
//   echelle   unités de vue par mm (le lièvre fait ~ 360 mm du derrière au museau, accroupi)
//   cote      'droite' (défaut : il regarde vers +x) · 'gauche'
//   trait     1,5 par défaut (le corps simple) · 2,4 quand l'animal est le sujet de la vue
//   oreilles  rotation des oreilles autour de leur base, en degrés (+ vers l'avant ; 0 : couchées en arrière)
//   cou       la tête tendue en avant de tant de mm (0 : au repos ; 25 : elle passe dans une ouverture)
//
// Unités internes : mm, x vers l'avant de la bête, y vers le HAUT, origine au sol sous le cou.
// L'union passe par Clipper, celui du moteur des corps simples (corps/moteur.js, _interne).

'use strict';

const path = require('path');
const M = require(path.join(__dirname, '../../.claude/skills/planches/scripts/corps/moteur'))._interne;

const NOIR = '#1A1A1A', BLANC = '#FFFFFF', GRIS = '#E6E6E6';
const RAD = Math.PI / 180;
const f2 = v => (Math.round(v * 100) / 100).toString();

// ─── masses ───────────────────────────────────────────────────────────────────────────────
function ellipse(c, rx, ry, ang = 0, n = 72) {
  const ca = Math.cos(ang * RAD), sa = Math.sin(ang * RAD), out = [];
  for (let k = 0; k < n; k++) {
    const t = 2 * Math.PI * k / n, x = rx * Math.cos(t), y = ry * Math.sin(t);
    out.push([c[0] + x * ca - y * sa, c[1] + x * sa + y * ca]);
  }
  return out;
}
const disque = (c, r, n = 48) => ellipse(c, r, r, 0, n);
// une capsule effilée de a (rayon ra) à b (rayon rb) : union de disques le long du segment
function capsule(a, b, ra, rb = ra) {
  const L = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(2, Math.ceil(L / Math.min(ra, rb) * 2));
  const out = [];
  for (let k = 0; k <= n; k++) { const t = k / n; out.push(disque([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t], ra + (rb - ra) * t, 36)); }
  return M.union(out);
}
// une courbe de Bézier cubique, échantillonnée (y vers le haut, mm)
function bez(P, n = 24) {
  const out = [];
  for (let k = 0; k <= n; k++) {
    const t = k / n, u = 1 - t;
    out.push([0, 1].map(j => u * u * u * P[0][j] + 3 * u * u * t * P[1][j] + 3 * u * t * t * P[2][j] + t * t * t * P[3][j]));
  }
  return out;
}
const cl = pts => [M.versCL(pts)];

// Une spline de Catmull-Rom par des points clés, comme un dessinateur trace son contour par-dessus
// les masses. Un point marqué d'un troisième élément 'c' est un angle : la courbe s'y casse.
function trace(pts, ferme = true, pas = 1.5) {
  const morceaux = []; let cur = [];
  pts.forEach((p, i) => { cur.push(p); if (p[2] === 'c' && i > 0 && i < pts.length - 1) { morceaux.push(cur); cur = [p]; } });
  morceaux.push(cur);
  const seg = (P, boucle) => {
    const n = P.length; if (n < 3) return P.map(p => [p[0], p[1]]);
    const g = i => boucle ? P[(i + n) % n] : P[Math.max(0, Math.min(n - 1, i))];
    const out = [];
    for (let i = 0; i < (boucle ? n : n - 1); i++) {
      const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      const k = Math.max(2, Math.ceil(Math.hypot(p2[0] - p1[0], p2[1] - p1[1]) / pas));
      for (let j = 0; j < k; j++) {
        const t = j / k, t2 = t * t, t3 = t2 * t;
        out.push([0, 1].map(c => 0.5 * (2 * p1[c] + (-p0[c] + p2[c]) * t + (2 * p0[c] - 5 * p1[c] + 4 * p2[c] - p3[c]) * t2 + (-p0[c] + 3 * p1[c] - 3 * p2[c] + p3[c]) * t3)));
      }
    }
    if (!boucle) out.push([P[n - 1][0], P[n - 1][1]]);
    return out;
  };
  if (morceaux.length === 1) return seg(pts, ferme);
  if (ferme) { const d = morceaux.pop(); morceaux[0] = d.concat(morceaux[0].slice(1)); }
  const out = [];
  morceaux.forEach((m, k) => { const q = seg(m, false); out.push(...(k ? q.slice(1) : q)); });
  return out;
}

// Lisse un contour fermé : rééchantillonné à pas constant, puis moyenné par une gaussienne (en mm).
// Les bosses de l'union (le cou sur le dos, la patte sur la poitrine) s'en vont, la forme reste.
function lisserBoucle(P, pas = 1.5, sigma = 3) {
  const n0 = P.length; if (n0 < 4) return P;
  const L = []; let tot = 0;
  for (let i = 0; i < n0; i++) { const a = P[i], b = P[(i + 1) % n0]; const d = Math.hypot(b[0] - a[0], b[1] - a[1]); L.push(d); tot += d; }
  const n = Math.max(12, Math.round(tot / pas)), q = [];
  let i = 0, acc = 0;
  for (let k = 0; k < n; k++) {
    const cible = k * tot / n;
    while (acc + L[i] < cible && i < n0 - 1) { acc += L[i]; i++; }
    const t = L[i] ? (cible - acc) / L[i] : 0, a = P[i], b = P[(i + 1) % n0];
    q.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
  }
  const r = Math.ceil(3 * sigma / (tot / n)), w = [];
  for (let k = -r; k <= r; k++) w.push(Math.exp(-0.5 * Math.pow(k * (tot / n) / sigma, 2)));
  const sw = w.reduce((a, b) => a + b, 0);
  return q.map((_, k) => { let x = 0, y = 0; for (let j = -r; j <= r; j++) { const p = q[(k + j + n) % n], c = w[j + r]; x += p[0] * c; y += p[1] * c; } return [x / sw, y / sw]; });
}
const lisser = (paths, sigma = 3) => paths.map(P => M.versCL(lisserBoucle(M.deCL(P), 1.5, sigma)));
const U = (...l) => M.unionCL(l);

// ─── rendu commun ─────────────────────────────────────────────────────────────────────────
// T : mm (y vers le haut) -> vue. Les chemins Clipper sont en y vers le haut aussi.
function rendu(o, Tm) {
  const s = o.echelle;
  const tol = 0.05 / s;
  const dF = paths => paths.map(P => { const q = M.allege(M.deCL(P), tol, true).map(Tm); return 'M' + q.map(p => `${f2(p[0])} ${f2(p[1])}`).join(' L') + ' Z'; }).join(' ');
  const dO = ls => ls.filter(l => l.length > 1).map(l => { const q = M.allege(l, tol).map(Tm); return 'M' + q.map(p => `${f2(p[0])} ${f2(p[1])}`).join(' L'); }).join(' ');
  const plein = (paths, coul) => paths.length ? `<path d="${dF(paths)}" fill="${coul}" stroke="none"/>` : '';
  const bord = (paths, ep) => paths.length ? `<path d="${dF(paths)}" fill="none" stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round"/>` : '';
  const ligne = (ls, ep) => { const d = dO(ls); return d ? `<path d="${d}" fill="none" stroke="${NOIR}" stroke-width="${ep}" stroke-linecap="round" stroke-linejoin="round"/>` : ''; };
  return { dF, dO, plein, bord, ligne };
}

// ─── le lièvre d'Amérique ─────────────────────────────────────────────────────────────────
// Construit sans modèle (aucune planche de lièvre dans le dépôt), d'après les traits de l'espèce.
// Accroupi, la tête tendue vers l'avant comme sur sa piste : le dos rond, la cuisse haute, le grand
// pied de derrière à plat sous la cuisse, la patte de devant mince et droite, la tête ronde au
// museau court et carré, l'œil grand, haut, sur le côté ; l'oreille plus courte que la tête, le bout
// noir (pelage d'hiver). La queue, une touffe.
function lievre(h, o = {}) {
  const s = o.echelle || 0.3, m = o.cote === 'gauche' ? -1 : 1;
  const X = o.x || 0, Y = o.y || 0;
  const ep = o.trait || 1.5, epI = 0.7;
  const Tm = p => [X + m * s * p[0], Y - s * p[1]];

  // Le contour, tracé par points clés sur les masses (mm, y vers le haut, origine au sol sous le
  // cou ; la bête regarde vers +x). Les masses qui l'ont réglé : la tête, une ellipse de 92 × 62
  // inclinée nez en bas ; le corps, un œuf de 300 de long, haut de 175 sur la cuisse ; la cuisse,
  // un disque de 125 ; le pied de derrière, 190 du talon aux doigts, à plat sous la cuisse.
  // o.cou : la tête tendue en avant de tant de mm (le cou s'allonge : la bête qui passe la tête
  // dans une ouverture) ; o.oreilles : leur rotation autour de la base, en degrés (+ vers l'avant).
  const dc = o.cou || 0;
  const T_ = ([x, y, c]) => (c ? [x + dc, y, c] : [x + dc, y]);
  const CORPS = [
    ...[[113, 110], [106, 130], [85, 149], [57, 159], [31, 158], [12, 149]].map(T_),    // museau, front, crâne
    [-4, 143],                                                                            // la nuque
    [-30, 148], [-70, 162], [-115, 172], [-160, 174], [-198, 164], [-225, 144],          // le dos, la croupe
    [-236, 126], [-243, 118], [-245, 108], [-242, 98],                                    // la queue, une petite touffe
    [-244, 76], [-240, 46], [-232, 20], [-222, 4, 'c'],                                  // l'arrière de la cuisse, le talon
    [-170, 0], [-100, 0], [-52, 0, 'c'], [-40, 5], [-44, 13], [-64, 17], [-92, 21], [-112, 26, 'c'],   // la semelle, les doigts, le dessus du pied
    [-102, 33], [-84, 38], [-62, 41], [-47, 38],                                          // le ventre, jusqu'au coude
    [-38, 27], [-33, 12], [-35, 1, 'c'], [-10, 0], [8, 3], [6, 10], [-10, 14],           // la patte de devant et sa main
    [-13, 32], [-10, 50], [-4, 62], [5, 74],                                              // le poitrail
    ...[[16, 82], [34, 88], [54, 91], [74, 93], [94, 96], [107, 102]].map(T_),           // la gorge, le menton
  ];
  const corpsCL = cl(trace(CORPS));
  // l'oreille : posée sur l'arrière du crâne, plus courte que la tête
  const baseO = T_([36, 155]), baseOL = T_([46, 155]);
  const rotO = (pts, c) => pts.map(p => { const a = (o.oreilles || 0) * RAD, dx = p[0] - c[0], dy = p[1] - c[1];
    return [c[0] + dx * Math.cos(-a) - dy * Math.sin(-a), c[1] + dx * Math.sin(-a) + dy * Math.cos(-a)].concat(p.slice(2)); });
  const OREILLE = rotO([[52, 155], [50, 175], [40, 201], [24, 225], [8, 239], [0, 236], [-1, 225], [6, 201], [14, 177], [20, 155]].map(T_), baseO);
  const OREILLE_L = rotO([[62, 155], [62, 177], [56, 205], [44, 231], [32, 243], [24, 240], [24, 229], [28, 203], [32, 177], [32, 155]].map(T_), baseOL);
  const PATTE_L = [[10, 50], [18, 30], [24, 12], [25, 5], [40, 2], [42, 0, 'c'], [16, 0, 'c'], [12, 10], [4, 30], [-2, 50]];
  const oreilleP = cl(trace(OREILLE));
  const proche = lisser(M.ferme(U(corpsCL, oreilleP), 4), 1.2);
  const loin = lisser(M.moins(U(cl(trace(OREILLE_L)), cl(trace(PATTE_L))), M.decale(proche, -0.5)), 0.8);

  // Les traits intérieurs (0,7) : le devant de la cuisse, le creux de l'oreille.
  const cuisseL = trace([[-166, 164], [-122, 140], [-104, 100], [-110, 62], [-124, 34]], false);
  const axeO = trace(rotO([[28, 171], [20, 195], [10, 217]].map(T_), baseO), false);
  // le bout noir de l'oreille : ce qui est au-delà d'une ligne en travers, du côté de la pointe
  const coupe = (a, b, pointe) => {
    const d = [b[0] - a[0], b[1] - a[1]]; let n = [-d[1], d[0]];
    if (n[0] * (pointe[0] - a[0]) + n[1] * (pointe[1] - a[1]) < 0) n = [-n[0], -n[1]];
    return cl([a, b, [b[0] + n[0] * 3, b[1] + n[1] * 3], [a[0] + n[0] * 3, a[1] + n[1] * 3]]);
  };
  const [ca, cb, cp] = rotO([[30, 229], [-10, 221], [4, 239]].map(T_), baseO);
  const boutP = M.inter(M.inter(proche, oreilleP), coupe(ca, cb, cp));
  const [la, lb, lp] = rotO([[48, 235], [14, 227], [28, 243]].map(T_), baseOL);
  const boutL = M.inter(loin, coupe(la, lb, lp));

  // L'œil : grand, en amande, haut sur le côté de la tête.
  const oeilC = T_([72, 134]);
  const oeil = ellipse(oeilC, 9.5, 7, -10, 36);

  const R = rendu({ echelle: s }, Tm);
  const out = [`<g data-animal="lievre">`];
  out.push(R.plein(loin, GRIS), R.bord(loin, ep));
  out.push(R.plein(boutL, NOIR));
  if (o.derriere) out.push(o.derriere);
  out.push(R.plein(proche, BLANC));
  out.push(R.plein(boutP, NOIR));
  out.push(R.bord(proche, ep));
  out.push(R.ligne([cuisseL, axeO], epI));
  out.push(R.plein(cl(oeil), NOIR));
  out.push('</g>');
  const svg = out.filter(Boolean).join('\n');

  const geo = {
    // le milieu du cou, la nuque et la gorge au même x : là où se pose une boucle, un collier
    cou: Tm([6 + dc / 2, 112]), nuque: Tm([6 + dc / 2, 146]), gorge: Tm([6 + dc / 2, 78 + dc / 8]),
    menton: Tm(T_([70, 92])), museau: Tm(T_([113, 108])), oeil: Tm(oeilC), sol: Y, echelle: s, miroir: m < 0,
  };
  const pts = M.deCL(proche[0] || []).map(Tm);
  if (pts.length) geo.boite = { x0: Math.min(...pts.map(p => p[0])), x1: Math.max(...pts.map(p => p[0])), y0: Math.min(...pts.map(p => p[1])), y1: Math.max(...pts.map(p => p[1])) };
  return Object.assign({ svg, toString() { return svg; } }, geo);
}


// ─── le canard barboteur (canard noir, colvert) ───────────────────────────────────────────
// Calqué sur la planche 12 de Fuertes, Birds of New York, 1910 (domaine public), dans le dépôt :
// images/photos/lot5/50-01c-canard-noir-colvert-fuertes-pl12.jpg. La planche ne montre le canard
// noir qu'au repos, la tête tournée dans le dos ; la cane colvert qui nage, en bas à droite, a la
// même silhouette (même genre, même taille) et la tête droite : c'est elle qui est calquée. Le
// contour a été pris sur un masque de couleur de la planche (le canard brun sur l'eau grise), puis
// relevé en points clés. Ce qui est sous l'eau (la coque) n'est pas dans la planche : il est
// dessiné, une courbe douce sous la ligne de flottaison.
// Les points sont en pixels de la planche (x vers la droite, y vers le bas, la bête regarde à
// droite) ; la ligne d'eau est à y = 990, le menton à x = 1601. 477 px du bout de la queue au bout
// du bec = 560 mm (l'ordre de grandeur d'un canard noir ; rien ne s'imprime).
const CANARD_PL = {
  dessus: [[1202, 981, 'c'], [1227, 976], [1250, 967], [1263, 953], [1278, 930], [1300, 906], [1323, 885], [1347, 868],
    [1387, 856], [1425, 848], [1455, 845], [1475, 845], [1493, 836], [1497, 820], [1492, 803], [1489, 783], [1490, 760],
    [1494, 742], [1502, 724], [1515, 705], [1538, 693], [1556, 691], [1575, 696], [1592, 705], [1600, 715], [1613, 726],
    [1640, 735], [1667, 738], [1679, 745, 'c'], [1668, 751], [1640, 754.5], [1610, 757], [1601, 757], [1583, 766],
    [1563, 777], [1551, 790], [1548, 805], [1553, 815], [1568, 833], [1584, 846], [1600, 862], [1612, 880], [1621, 900],
    [1622, 918], [1618, 940], [1610, 965]],
  coque: [[1599, 991], [1580, 1022], [1530, 1043], [1440, 1050], [1340, 1043], [1270, 1022], [1235, 997], [1215, 987]],
  flottaison: [[1600, 990], [1212, 986]],                     // sans coque : la ligne d'eau ferme le contour
  aile: [[1566, 896], [1530, 915], [1470, 930], [1390, 938], [1320, 948], [1265, 962], [1230, 975]],
  tertiaires: [[1345, 908], [1295, 935], [1240, 966]],
  bec: [[1601, 716], [1598, 735], [1601, 756]],                // la base du bec, au ras des plumes
  commissure: [[1604, 749], [1640, 749], [1676, 746]],
  oeil: [1566, 718],
  ancre: [1601, 990], mm: 560 / 477,
};

// o : x, y (vue) = le point de la ligne d'eau sous le menton ; echelle (vue par mm) ; cote 'droite'
// (défaut, la bête regarde vers +x) ou 'gauche' ; trait (2,4 par défaut : le canard est le sujet de
// sa vue ; 1,5 s'il ne l'est pas) ; coque (true par défaut : la partie sous l'eau, pour une coupe).
function canard(h, o = {}) {
  const s = o.echelle || 0.3, m = o.cote === 'gauche' ? -1 : 1;
  const X = o.x || 0, Y = o.y || 0;
  const ep = o.trait || 2.4, epA = 1.4, epI = 0.7;
  const C = CANARD_PL, k = C.mm;
  const mm = ([x, y, c]) => (c ? [(x - C.ancre[0]) * k, (C.ancre[1] - y) * k, c] : [(x - C.ancre[0]) * k, (C.ancre[1] - y) * k]);
  const Tm = p => [X + m * s * p[0], Y - s * p[1]];
  const avecCoque = o.coque !== false;
  const contour = trace(C.dessus.concat(avecCoque ? C.coque : C.flottaison).map(mm));
  const forme = lisser(cl(contour), 0.6);
  const R = rendu({ echelle: s }, Tm);
  const ouvert = l => trace(l.map(mm), false);
  const oeil = ellipse(mm(C.oeil), 5.2, 4.6, 0, 28);
  const out = [`<g data-animal="canard">`];
  out.push(R.plein(forme, BLANC));
  if (o.dedans) out.push(o.dedans);
  out.push(R.ligne([ouvert(C.aile)], epA), R.ligne([ouvert(C.tertiaires), ouvert(C.bec), ouvert(C.commissure)], epI));
  out.push(R.plein(cl(oeil), NOIR));
  out.push(R.bord(forme, ep));
  out.push('</g>');
  const svg = out.filter(Boolean).join('\n');
  const P = q => Tm(mm(q));
  const geo = {
    bec: P([1679, 745]), menton: P([1601, 757]), oeil: P(C.oeil), calotte: P([1556, 691]),
    // le cou juste sous la tête : devant (la gorge) et derrière (la nuque), à la même hauteur
    gorge: P([1572, 772]), nuque: P([1490, 772]), poitrail: P([1622, 918]), queue: P([1202, 981]),
    flottaison: Y, echelle: s, miroir: m < 0, mm: (x, y) => Tm([x, y]),
  };
  return Object.assign({ svg, toString() { return svg; } }, geo);
}

// ─── le lagopède des saules, en plumage d'hiver ───────────────────────────────────────────
// La silhouette est calquée sur le tétras du Canada mâle de Fuertes (pl. 41, Birds of New York,
// 1910, domaine public ; images/photos/lot5/45-04a-gelinotte-tetras-fuertes-pl41.jpg) : même
// famille, même gabarit. Masque de couleur (l'oiseau foncé sur le fond crème), contour relevé en
// points clés ; les pattes et la branche sont retirées, le dessous du ventre refermé à la main.
// Ce qui change pour le lagopède d'hiver, et rien d'autre : tout blanc (la silhouette blanche du
// livre), et les pieds emplumés jusqu'aux doigts, en raquettes (ch. 43). Le corps se penche vers
// l'avant (o.angle) : le tétras de la planche se tient droit, le lagopède qui passe la tête dans
// une ouverture la tend devant lui.
// Points en pixels de la planche (y vers le bas, la bête regarde à droite) ; 786 px de la queue
// au bec = 380 mm (l'ordre de grandeur ; rien ne s'imprime).
const TETRAS_PL = {
  corps: [[551, 960], [502, 943], [480, 926], [448, 915], [356, 891], [299, 864], [237, 862], [205, 850], [190, 825],
    [156, 816], [140, 802], [131, 770], [136, 748], [161, 734], [226, 738], [303, 737], [402, 720], [473, 694], [529, 660],
    [611, 572], [696, 493], [727, 458], [742, 418], [741, 332], [749, 293], [761, 272], [782, 247], [817, 229], [849, 234],
    [875, 247], [902, 252], [915, 263, 'c'], [894, 277], [878, 307], [861, 335], [855, 360], [871, 407], [905, 470], [921, 576],
    [923, 676], [910, 752], [864, 829], [816, 887], [773, 921], [730, 940], [690, 962], [640, 972], [590, 968]],
  aile: [[705, 640], [668, 745], [590, 835], [490, 895]],
  bec: [[898, 250], [896, 264], [893, 279]],
  oeil: [838, 272],
  // le cou, sous la tête : la nuque et la gorge à la même hauteur le long du cou
  nuque: [744, 330], gorge: [858, 345],
  pattes: [[600, 966], [688, 962]],
  ancre: [640, 965], mm: 380 / 786,
};

// o : x, y (vue) = le point sur la neige sous les pieds ; echelle (vue par mm) ; cote 'droite' (défaut,
// il regarde vers +x) ou 'gauche' ; angle : le corps penché vers l'avant, en degrés (0 : droit
// comme le tétras de la planche) ; pattes : hauteur des pattes sous le ventre, en mm ; trait (1,5).
function lagopede(h, o = {}) {
  const s = o.echelle || 0.4, m = o.cote === 'gauche' ? -1 : 1;
  const X = o.x || 0, Y = o.y || 0;
  const ep = o.trait || 1.5, epI = 0.7;
  const C = TETRAS_PL, k = C.mm, a = -(o.angle || 0) * RAD, L = o.pattes == null ? 30 : o.pattes;
  // pixels de la planche -> mm, y vers le haut, le ventre en 0, penché ; puis levé pour que le bas
  // du corps soit à la hauteur des pattes
  const tourne = ([x, y]) => { const u = (x - C.ancre[0]) * k, v = (C.ancre[1] - y) * k; return [u * Math.cos(a) - v * Math.sin(a), u * Math.sin(a) + v * Math.cos(a)]; };
  const leve = L - Math.min(...C.corps.map(q => tourne(q)[1]));
  const mm = ([x, y, c]) => { const q = tourne([x, y]); q[1] += leve; return c ? [q[0], q[1], c] : q; };
  const Tm = p => [X + m * s * p[0], Y - s * p[1]];
  const corps = lisser(cl(trace(C.corps.map(mm))), 0.8);
  // Les pieds emplumés : une jambe courte et touffue, puis la raquette à plat sur la neige, les
  // doigts emplumés jusqu'au bout ; l'un devant (blanc), l'autre derrière (gris loin).
  const pied = (ancre, dx) => {
    const b = mm(ancre), x0 = b[0] + dx;
    const pts = [[b[0] - 13, b[1] + 8], [b[0] + 13, b[1] + 8], [x0 + 13, 20], [x0 + 30, 11], [x0 + 41, 5], [x0 + 39, 0, 'c'],
      [x0 - 20, 0, 'c'], [x0 - 21, 7], [x0 - 14, 20]];
    return cl(trace(pts));
  };
  const piedP = pied(C.pattes[1], 0), piedL = pied(C.pattes[0], -6);
  const proche = lisser(M.ferme(U(corps, piedP), 3), 0.5);
  const loin = M.moins(piedL, M.decale(proche, -0.4));
  // le bec, noir : ce qui est devant la base du bec
  const b0 = mm(C.bec[0]), b2 = mm(C.bec[2]), tip = mm([915, 263]);
  const dB = [tip[0] - (b0[0] + b2[0]) / 2, tip[1] - (b0[1] + b2[1]) / 2];
  const bec = M.inter(corps, cl([b0, b2, [b2[0] + 3 * dB[0], b2[1] + 3 * dB[1]], [b0[0] + 3 * dB[0], b0[1] + 3 * dB[1]]]));
  const R = rendu({ echelle: s }, Tm);
  const plumes = (base, dx) => { const b = mm(base), x0 = b[0] + dx; return [[[x0 - 10, 13], [x0 - 9, 5]], [[x0 + 2, 14], [x0 + 3, 5]], [[x0 + 14, 12], [x0 + 16, 4]], [[x0 + 26, 8], [x0 + 28, 3]]]; };
  const out = [`<g data-animal="lagopede">`];
  out.push(R.plein(loin, GRIS), R.bord(loin, ep));
  if (o.derriere) out.push(o.derriere);
  out.push(R.plein(proche, BLANC));
  out.push(R.plein(bec, NOIR));
  out.push(R.ligne([trace(C.aile.map(mm), false)], epI), R.ligne(plumes(C.pattes[1], 0), epI));
  out.push(R.plein(cl(ellipse(mm(C.oeil), Math.max(2.6, 1.3 / s), Math.max(2.6, 1.3 / s), 0, 20)), NOIR));   // l'œil reste visible en petit
  out.push(R.bord(proche, ep));
  out.push('</g>');
  const svg = out.filter(Boolean).join('\n');
  const P = q => Tm(mm(q));
  const geo = { nuque: P(C.nuque), gorge: P(C.gorge), oeil: P(C.oeil), bec: P([915, 263]), queue: P([131, 770]), sol: Y, echelle: s, miroir: m < 0 };
  geo.cou = [(geo.nuque[0] + geo.gorge[0]) / 2, (geo.nuque[1] + geo.gorge[1]) / 2];
  return Object.assign({ svg, toString() { return svg; } }, geo);
}

// ─── le chien, dressé sur ses pattes de derrière ──────────────────────────────────────────
// Construit sans modèle (aucune planche de chien dans le dépôt), comme le lièvre : le squelette
// d'abord (pied, jarret, grasset, hanche, épaule, coude, poignet), puis le contour tracé par points
// clés, de profil. Un chien de taille moyenne, oreilles droites, la queue qui pend : dressé, les
// pattes de devant appuyées sur une perche, la tête levée vers ce qui est au-dessus.
// Repère en mm : x vers la perche, y vers le haut, l'origine au sol sous le pied de derrière.
// o : x, y (vue) = ce point-là ; echelle (vue par mm) ; cote ; trait (1,5) ; loin (true : tout le
// chien en gris loin, quand il ne sert que d'échelle) ; appui : [x, y] en mm, le haut de la perche
// où posent les pattes de devant (défaut [400, 1050]).
function chien(h, o = {}) {
  const s = o.echelle || 0.1, m = o.cote === 'gauche' ? -1 : 1;
  const X = o.x || 0, Y = o.y || 0;
  const ep = o.trait || 1.5, epI = 0.7;
  const Tm = p => [X + m * s * p[0], Y - s * p[1]];
  const ap = o.appui || [400, 1050], dA = [ap[0] - 400, ap[1] - 1050];
  const A = ([x, y, c]) => (c ? [x + dA[0], y + dA[1], c] : [x + dA[0], y + dA[1]]);   // ce qui suit l'appui
  // Les masses (mm) : pied, canon, jambe, cuisse, croupe, cage, poitrail, cou, tête, museau.
  const E = (c, rx, ry, a = 0) => cl(ellipse(c, rx, ry, a));
  const masses = [
    capsule([-6, 18], [70, 14], 21, 16),                      // le pied de derrière
    capsule([4, 26], [-40, 128], 22, 27),                     // le canon, jusqu'au jarret
    capsule([-40, 128], [66, 300], 30, 52),                   // la jambe, jusqu'au grasset
    E([10, 385], 150, 104, 70),                               // la cuisse
    E([-8, 478], 128, 116),                                   // la croupe
    E([128, 690], 285, 150, 66),                              // la cage
    E([228, 805], 112, 122),                                  // le poitrail
    capsule([168, 900], [244, 1080], 96, 74),                 // le cou
    E([258, 1150], 96, 74, 18),                               // le crâne
    capsule([300, 1158], [392, 1190], 46, 32),                // le museau
  ];
  // la patte de devant : bras, avant-bras, la main posée sur la perche
  const patte = (dx, dy) => U(capsule([222 + dx, 880 + dy], [252 + dx, 762 + dy], 56, 40),
    capsule([252 + dx, 762 + dy], A([368 + dx, 992 + dy]), 33, 26), capsule(A([364 + dx, 996 + dy]), A([404 + dx, 1036 + dy]), 25, 22));
  const queue = U(capsule([-62, 470], [-128, 330], 40, 33), capsule([-128, 330], [-150, 196], 33, 26));
  const OREILLE = [[212, 1200], [206, 1262], [210, 1316, 'c'], [242, 1270], [262, 1214]];
  const OREILLE_L = [[236, 1206], [236, 1268], [246, 1322, 'c'], [270, 1274], [284, 1220]];
  const corps = M.ferme(U(...masses), 30);
  const proche = lisser(M.ferme(U(corps, patte(0, 0), cl(trace(OREILLE)), queue), 8), 3);
  const loin = lisser(M.moins(U(patte(24, 30), cl(trace(OREILLE_L))), M.decale(proche, -0.4)), 1.5);
  // traits intérieurs : le devant de la cuisse, le bras sur la poitrine, le creux de l'oreille
  const cuisse = trace([[96, 470], [70, 380], [62, 300]], false);
  const bras = M.bordsDans(patte(0, 0), M.decale(corps, -4));
  const oreilleI = trace([[220, 1222], [216, 1258], [214, 1292]], false);
  const truffe = cl(trace([[414, 1186], [422, 1200], [416, 1214], [402, 1212], [398, 1196]]));
  const bouche = trace([[404, 1168], [378, 1160], [346, 1152]], false);
  const oeil = ellipse([312, 1192], 9, 6, 18, 24);
  const R = rendu({ echelle: s }, Tm);
  const out = [`<g data-animal="chien">`];
  if (o.loin) {
    out.push(R.plein(loin, GRIS), R.bord(loin, ep), R.plein(proche, GRIS));
  } else {
    out.push(R.plein(loin, GRIS), R.bord(loin, ep), R.plein(proche, BLANC));
  }
  out.push(R.ligne([cuisse, oreilleI, bouche], epI), R.ligne(bras, epI));
  out.push(R.plein(truffe, NOIR), R.plein(cl(oeil), NOIR));
  out.push(R.bord(proche, ep));
  out.push('</g>');
  const svg = out.filter(Boolean).join('\n');
  const geo = { appui: Tm(ap), tete: Tm([260, 1230]), sol: Y, echelle: s, miroir: m < 0 };
  return Object.assign({ svg, toString() { return svg; } }, geo);
}

// l'union de polygones (listes de points) : les contours qui en sortent, en listes de points
const unir = polys => M.union(polys).map(P => M.deCL(P));

module.exports = { lievre, canard, lagopede, chien, _outils: { ellipse, disque, capsule, bez, trace, lisser, rendu, unir } };
