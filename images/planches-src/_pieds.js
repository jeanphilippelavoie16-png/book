// _pieds.js — le pied simple de profil, et son raccord à la jambe du corps simple.
//
// La bibliothèque des corps (h.formes.corps) a deux pieds : la botte de travail (semelle dure, talon)
// et le pied nu sans orteils, qui fait une palette dressée à grande échelle. Il manquait le pied nu
// avec ses orteils (24-08) et le mukluk souple des raquettes (89-04, 89-06 : le chapitre veut un
// chaussage mou, sans talon dur). Les voici, construits au même trait que le corps simple : un seul
// contour lisse, blanc, 1,5 ; au plus quelques traits intérieurs à 0,7 (les orteils qui passent devant
// le gros orteil, la couture du mukluk) ; aucun ongle, aucun pli.
//
//   jambeEtPied(h, corpsOpts, { pied, H, angle, id, trait, plante })
//     corpsOpts  les options de h.formes.corps (x, y, pose, echelle, cote, angles, masquer…) ; la jambe
//                proche (P) reçoit le pied ; masquer la jambe loin, elle garderait le pied de la bibliothèque
//     pied       'nu' (avec ses orteils) · 'mukluk'
//     H          où la jambe du corps est coupée et reprise par le pied : mm au-dessus de la cheville (70)
//     angle      le pied tourné autour de la cheville, en degrés : + la pointe s'éloigne du tibia (le pied
//                tendu), − elle s'en approche ; 0 : le pied d'équerre
//     id         un identifiant unique dans la planche (le clipPath)
//   → { svg, corps, A (la cheville), versVue(p) (un point du repère du pied vers la vue), pointe, talon,
//       plante (la charnière des orteils, dessous), bout (le bout du gros orteil), cou (le cou-de-pied),
//       contour (le contour du pied en points de vue, pour poser une lanière dessus) }
//
// Le repère du pied, en mm d'homme adulte : origine à la cheville, x vers la pointe, y vers le bas (vers
// la plante) ; debout pied à plat, le sol est à y = 68. Le raccord : la jambe du corps est coupée par
// une droite perpendiculaire au tibia, H au-dessus de la cheville (clipPath), et le contour du pied part
// exactement des deux bords de la jambe sur cette droite, dans la direction de ces bords : un seul trait,
// sans couture.
'use strict';

const NOIR = '#1A1A1A', BLANC = '#FFFFFF';
const RAD = Math.PI / 180;
const f = v => Math.round(v * 100) / 100;

// Catmull-Rom échantillonné, ouvert
function lisse(P, n = 8) {
  const N = P.length, out = [];
  const g = i => P[Math.max(0, Math.min(N - 1, i))];
  for (let i = 0; i < N - 1; i++) {
    const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
    for (let k = 0; k < n; k++) {
      const t = k / n, t2 = t * t, t3 = t2 * t;
      out.push([0, 1].map(j => 0.5 * ((2 * p1[j]) + (-p0[j] + p2[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t3)));
    }
  }
  out.push(P[N - 1]);
  return out;
}
const dPts = pts => pts.map((p, i) => `${i ? 'L' : 'M'}${f(p[0])} ${f(p[1])}`).join(' ');

// le contour blanc du corps proche, lu dans le SVG du moteur : des polygones en unités de vue
function contourCorps(svg) {
  const m = String(svg).match(/<path d="([^"]+)" fill="#FFFFFF"/);
  if (!m) return [];
  return m[1].split('Z').map(sp => {
    const n = (sp.match(/-?\d*\.?\d+/g) || []).map(Number), P = [];
    for (let i = 0; i + 1 < n.length; i += 2) P.push([n[i], n[i + 1]]);
    return P;
  }).filter(P => P.length > 2);
}
// les points où une droite (C + t·n) coupe les polygones : les t
function coupeDroite(polys, C, n, up) {
  const ts = [];
  for (const P of polys) for (let i = 0; i < P.length; i++) {
    const a = P[i], b = P[(i + 1) % P.length];
    const da = (a[0] - C[0]) * up[0] + (a[1] - C[1]) * up[1], db = (b[0] - C[0]) * up[0] + (b[1] - C[1]) * up[1];
    if (da * db <= 0 && da !== db) {
      const t = da / (da - db), q = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
      ts.push((q[0] - C[0]) * n[0] + (q[1] - C[1]) * n[1]);
    }
  }
  return ts;
}

// ─── les pieds, dans leur repère ─────────────────────────────────────────────────────────────────
// Chaque pied est une fonction des deux demi-largeurs de la jambe sur la coupe (wb derrière, wf devant, en
// mm) et de la hauteur de coupe H : elle rend le contour, de l'arrière de la jambe à l'avant (les points
// marqués « jambe » restent dans le repère du tibia, les autres tournent avec le pied autour de la
// cheville), les traits intérieurs, les repères, et le haut de la tige (une botte) s'il y en a un.
const PIEDS = {
  // le pied nu, vu du dehors : le petit orteil, le quatrième et le troisième passent devant le gros orteil
  nu: (wb, wf, H) => ({
    contour: [[-wb, -H, 'jambe'], [-wb * 0.97, -H * 0.5, 'jambe'], [-31, -10, 'jambe'], [-33, 8], [-40, 24], [-50, 36], [-57, 46], [-60, 55], [-58.5, 63],
      [-52, 68.6], [-40, 70.6], [-10, 70.4], [40, 69.8], [100, 69.6], [140, 69.2], [160, 68.6], [176, 68.4], [192, 67.8], [203, 64.6], [208.5, 57.5],
      [207.5, 47], [200, 41.5], [186, 38.6], [170, 36], [150, 30.5], [124, 20.5], [96, 9.5], [72, -0.5], [54, -8], [42, -17, 'jambe'],
      [wf * 1.03, -H * 0.5, 'jambe'], [wf, -H, 'jambe']],
    // les trois petits orteils vus du dehors, chacun un peu en retrait du suivant : un arc qui part du dessous
    interieur: [
      [[156, 68.8], [166, 67.4], [173, 62], [174.5, 53.5], [170.5, 46], [162, 42.5]],
      [[173.4, 63.5], [181.5, 63.2], [186, 56.5], [185, 48.5], [179.5, 43.4]],
      [[185.4, 61.6], [192.5, 61.2], [197, 54.5], [195.5, 46.5], [190.5, 42]],
    ],
    repere: { talon: [-50, 68], plante: [150, 69], pointe: [208.5, 56], bout: [208.5, 56], cou: [90, 12] },
  }),
  // le mukluk : une botte de peau souple, sans talon dur, la tige jusqu'à la coupe ; la couture de
  // l'empeigne froncée sur le dessus, et le haut de la tige vu par la tranche
  mukluk: (wb, wf, H) => {
    const e = 6;                                              // l'épaisseur de la peau, la tige un peu large
    return {
      contour: [[-wb, -H, 'jambe'], [-wb - e, -H, 'jambe'], [-wb - e - 1, -H * 0.55, 'jambe'], [-38, -14, 'jambe'], [-42, 10], [-52, 31], [-60, 48],
        [-62, 61], [-56, 71], [-40, 74.5], [-10, 75], [40, 74.6], [100, 74.2], [150, 73.6], [182, 72], [203, 67.5], [213, 59.5], [213, 50.5],
        [206, 42.5], [192, 36], [170, 28.5], [140, 19.5], [110, 8], [82, -4], [60, -15], [46, -26, 'jambe'], [wf + e + 1, -H * 0.55, 'jambe'],
        [wf + e, -H, 'jambe'], [wf, -H, 'jambe']],
      interieur: [
        [[62, -10], [94, 4], [132, 18], [168, 29], [194, 39], [205, 47], [204, 56], [194, 60], [176, 59.5]],
        [[-50, 66], [-20, 68], [40, 68], [110, 67.5], [170, 66], [198, 62.5]],
      ],
      haut: [[-wb - e, -H], [wf + e, -H]],
      repere: { talon: [-56, 72], plante: [160, 74], pointe: [213, 55], bout: [213, 55], cou: [96, 4] },
    };
  },
};

function jambeEtPied(h, corpsOpts, { pied = 'nu', H = 70, angle = 0, id = 'pied', trait = 1.5, avecCorps = true } = {}) {
  const F = PIEDS[pied];
  if (!F) throw new Error(`pied inconnu : ${pied}`);
  const corps = h.formes.corps(Object.assign({ pieds: 'nu' }, corpsOpts));
  const s = corps.echelle;
  const A = corps.articulations.chevilleP, K = corps.articulations.genouP;
  const lk = Math.hypot(K[0] - A[0], K[1] - A[1]);
  const up = [(K[0] - A[0]) / lk, (K[1] - A[1]) / lk];         // vers le genou
  const dn = [-up[0], -up[1]];
  // le côté de la pointe : celui où le moteur a mis la sienne
  let ex = [up[1], -up[0]];
  const pt = corps.pieds.P.pointe;
  if ((pt[0] - A[0]) * ex[0] + (pt[1] - A[1]) * ex[1] < 0) ex = [-ex[0], -ex[1]];
  // le repère du pied : x vers la pointe, y vers le bas (dn) ; le pied tourne de angle autour de la cheville
  // un point du pied tourne de tout l'angle ; près de la cheville, au-dessus d'elle (y < 10), de moins en
  // moins : le cou-de-pied plie en courbe, sans cassure contre le tibia
  const versVue = (p, fixe = false) => {
    const w = fixe ? 0 : Math.max(0, Math.min(1, (p[1] + 22) / 32));
    const cc = Math.cos(angle * w * RAD), ss = Math.sin(angle * w * RAD);
    const X = [cc * ex[0] + ss * dn[0], cc * ex[1] + ss * dn[1]], Y = [-ss * ex[0] + cc * dn[0], -ss * ex[1] + cc * dn[1]];
    return [A[0] + s * (p[0] * X[0] + p[1] * Y[0]), A[1] + s * (p[0] * X[1] + p[1] * Y[1])];
  };
  // les deux bords de la jambe du corps sur la droite de coupe
  const C = [A[0] + up[0] * H * s, A[1] + up[1] * H * s];
  const polys = contourCorps(corps.svg);
  const ts = coupeDroite(polys, C, ex, up);
  const tav = Math.min(...ts.filter(t => t > 0)), tar = Math.max(...ts.filter(t => t < 0));
  const avant = [C[0] + ex[0] * tav, C[1] + ex[1] * tav], arriere = [C[0] + ex[0] * tar, C[1] + ex[1] * tar];
  // et leur direction, un peu plus haut : le pied part dans le prolongement de la jambe
  const C2 = [C[0] + up[0] * 12 * s, C[1] + up[1] * 12 * s];
  const ts2 = coupeDroite(polys, C2, ex, up);
  const tav2 = Math.min(...ts2.filter(t => t > 0)), tar2 = Math.max(...ts2.filter(t => t < 0));
  const avant2 = [C2[0] + ex[0] * tav2, C2[1] + ex[1] * tav2], arriere2 = [C2[0] + ex[0] * tar2, C2[1] + ex[1] * tar2];
  // le contour, de l'arrière de la jambe à l'avant, sur les deux bords mesurés
  const wb = -tar / s, wf = tav / s;
  const D = F(wb, wf, H);
  const pose = q => versVue(q, q[2] === 'jambe');
  const pts = [arriere2, ...D.contour.map(pose), avant2];
  const tour = lisse(pts).slice(8, -8);                       // sans les deux bouts de raccord, au-dessus de la coupe
  // le blanc : le contour refermé par la droite de coupe
  const blanc = `<path d="${dPts(tour)} Z" fill="${BLANC}" stroke="none"/>`;
  const traitPied = `<path d="${dPts(tour)}" fill="none" stroke="${NOIR}" stroke-width="${trait}" stroke-linejoin="round" stroke-linecap="round"/>`;
  const interieurs = D.interieur.map(l => `<path d="${dPts(lisse(l.map(q => versVue(q))))}" fill="none" stroke="${NOIR}" stroke-width="${trait >= 1.9 ? 1 : 0.7}" stroke-linecap="round" stroke-linejoin="round"/>`);
  // la jambe du corps, coupée par la droite : on garde le côté du genou
  const G = 5000;
  const garde = [[C[0] + ex[0] * G, C[1] + ex[1] * G], [C[0] - ex[0] * G, C[1] - ex[1] * G],
    [C[0] - ex[0] * G + up[0] * G, C[1] - ex[1] * G + up[1] * G], [C[0] + ex[0] * G + up[0] * G, C[1] + ex[1] * G + up[1] * G]];
  const svg = [
    `<clipPath id="${id}-jambe"><path d="${dPts(garde)} Z" fill="none"/></clipPath>`,
    avecCorps ? `<g clip-path="url(#${id}-jambe)">\n${corps.svg}\n</g>` : '',
    blanc, traitPied, ...interieurs,
    D.haut ? `<path d="${dPts(D.haut.map(q => versVue(q, true)))}" fill="none" stroke="${NOIR}" stroke-width="${trait}" stroke-linecap="round"/>` : '',
  ].join('\n');
  const R = {};
  for (const [k, v] of Object.entries(D.repere)) R[k] = versVue(v);
  return Object.assign({ svg, toString() { return svg; }, corps, A, versVue, contour: tour, polys }, R);
}

module.exports = { jambeEtPied, contourCorps, PIEDS, lisse };
