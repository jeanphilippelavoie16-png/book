// _lievre-audubon.js — le lièvre d'Amérique en pelage d'hiver, de profil, pour les planches du ch. 48.
//
// Calqué sur la planche XII (« Northern Hare, winter ») de J. W. Audubon pour J. J. Audubon et J. Bachman,
// The Viviparous Quadrupeds of North America, 1845 : domaine public. Image prise sur Wikimedia Commons
// (« Northern Hare in winter (Lepus Americanus) from the viviparous quadrupeds of North America (1845) »,
// numérisation rawpixel), crédit dans images/credits.md. Le contour a été relevé en points clés sur une
// grille posée sur la planche (1280 px de large) ; rien n'est inventé sauf l'ordre des pièces.
// La bête de la planche est tapie, la tête basse et tendue, les oreilles couchées : la pose d'un lièvre
// qui avance sur son sentier. Le dessin la tourne de 11,6° pour poser les deux pieds sur un même sol.
//
//   const L = require('./_lievre-audubon');
//   const l = L.lievre(h, { x, y, echelle, cote, angle, trait });
//   out.push(l.svg);
//   x, y      le point au sol sous le bout des doigts du pied de devant (vue), y = le dessus de la neige
//   echelle   unités de vue par mm (la bête fait ~ 450 mm du nez au bout de la croupe)
//   cote      'gauche' (défaut : il regarde vers −x, comme sur la planche) · 'droite'
//   angle     rotation de plus, en degrés, autour de (x, y) (+ : sens horaire à l'écran)
//   trait     1,5 (défaut) · 2,4 quand la bête est le sujet de la vue
//   derriere  du SVG peint derrière la bête (la moitié d'une boucle qui passe derrière le cou)
// Le résultat porte, en unités de vue : nuque, gorge, cou (le milieu), menton, museau, oeil, boite,
// et .P(x, y) qui envoie un point de la planche (px) dans la vue.

'use strict';

const NOIR = '#1A1A1A', BLANC = '#FFFFFF', GRIS = '#E6E6E6';
const MM_PX = 450 / 770;          // 770 px de la planche, du nez à la croupe = ~ 450 mm
const C0 = [420, 806];            // le bout des doigts du pied de devant, sur la planche
const ROT = 11.6;                 // pour poser le pied de derrière (820, 724) au même sol

// Le contour, dans le sens horaire, depuis le bout du nez (px de la planche). 'c' : un angle franc.
// Le dos passe sous l'oreille loin, couchée dessus : elle se dessine à part, en gris, derrière.
const CONTOUR = [
  [297, 524], [300, 505], [311, 492], [330, 485], [352, 478], [382, 470], [412, 465], [442, 462], [468, 460],
  [500, 453], [540, 440], [580, 421], [620, 399], [660, 381], [700, 356], [760, 323], [805, 306], [852, 298],
  [900, 300], [950, 313], [1000, 343], [1030, 373], [1050, 405], [1062, 435], [1066, 456],
  // la croupe, le talon, le dessous du grand pied de derrière
  [1055, 475], [1034, 489], [1019, 500], [1014, 522], [1002, 546], [984, 566], [958, 586], [928, 607], [900, 632],
  [880, 662], [866, 692], [858, 712], [842, 722], [818, 724], [790, 719], [762, 709], [744, 697], [738, 686, 'c'],
  // le ventre, puis le dessous de la patte de devant, jusqu'aux doigts
  [728, 708], [700, 714], [662, 716], [628, 720], [598, 731], [560, 750], [520, 770], [482, 791], [462, 801],
  [436, 806], [412, 805], [399, 796], [396, 781], [404, 765, 'c'],
  // le dessus de la patte, le poitrail, la gorge, le menton
  [424, 746], [462, 730], [478, 722, 'c'], [452, 700], [430, 674], [408, 652], [380, 634], [354, 621], [333, 605],
  [316, 586], [306, 565], [300, 546],
];
// l'oreille loin, couchée sur le dos : seul le bord qui dépasse du dos se voit
const OREILLE_LOIN = [[478, 462], [505, 441], [545, 423], [582, 409], [604, 403], [614, 408], [606, 418], [580, 432], [545, 448], [510, 462]];
// l'oreille proche, couchée le long du cou (trait intérieur), étroite à la base, et son bout noir
const OREILLE = [[484, 522], [494, 508], [522, 494], [560, 486], [596, 490], [618, 501], [624, 512], [612, 520], [586, 527], [550, 537], [516, 543], [494, 536]];
const BOUT_OREILLE = [[606, 494], [618, 501], [624, 512], [612, 520], [602, 520], [608, 507]];
const PLI_OREILLE = [[500, 526], [540, 515], [580, 508], [604, 507]];
// la joue (le cou caché sous la tête), la cuisse et le dessus du grand pied : traits intérieurs
const JOUE = [[476, 534], [482, 564], [474, 598], [456, 628]];
const CUISSE = [[792, 408], [766, 470], [767, 540], [798, 584], [858, 602]];
const PIED_HAUT = [[744, 690], [772, 652], [812, 640], [866, 616], [920, 590], [958, 562]];
const BOUCHE = [[299, 547], [310, 551], [318, 559]];
const OEIL = [391, 513];

module.exports.lievre = function lievre(h, o = {}) {
  const s = (o.echelle || 0.3) * MM_PX;               // unités de vue par px de la planche
  const m = o.cote === 'droite' ? -1 : 1;
  const a = (ROT + (o.angle || 0) * m) * Math.PI / 180;
  const X = o.x || 0, Y = o.y || 0, ep = o.trait || 1.5;
  const P = (px, py) => {
    const dx = px - C0[0], dy = py - C0[1];
    const rx = dx * Math.cos(a) - dy * Math.sin(a), ry = dx * Math.sin(a) + dy * Math.cos(a);
    return [X + m * rx * s, Y + ry * s];
  };
  const f = (v) => (Math.round(v * 10) / 10).toFixed(1);
  // Catmull-Rom, qui garde les angles marqués 'c'
  const courbe = (pts, ferme) => {
    const Q = pts.map((p) => P(p[0], p[1]));
    const n = Q.length, g = (i) => (ferme ? Q[(i + n) % n] : Q[Math.max(0, Math.min(n - 1, i))]);
    const angle = (i) => pts[(i + n) % n][2] === 'c';
    let d = `M${f(Q[0][0])} ${f(Q[0][1])}`;
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p1 = g(i), p2 = g(i + 1);
      const p0 = angle(i) ? p1 : g(i - 1), p3 = angle(i + 1) ? p2 : g(i + 2);
      d += ` C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
    }
    return d + (ferme ? ' Z' : '');
  };
  const at = (ep2, fill) => `fill="${fill}" stroke="${NOIR}" stroke-width="${ep2}" stroke-linejoin="round" stroke-linecap="round"`;
  const out = ['<g data-animal="lievre">'];
  out.push(`<path d="${courbe(OREILLE_LOIN, true)}" ${at(ep, GRIS)}/>`);
  if (o.derriere) out.push(String(o.derriere));
  out.push(`<path d="${courbe(CONTOUR, true)}" ${at(ep, BLANC)}/>`);
  out.push(`<path d="${courbe(OREILLE, true)}" ${at(0.7, BLANC)}/>`);
  out.push(`<path d="${courbe(BOUT_OREILLE, true)}" fill="${NOIR}" stroke="none"/>`);
  out.push(`<path d="${courbe(PLI_OREILLE, false)}" ${at(0.5, 'none')}/>`);
  out.push(`<path d="${courbe(JOUE, false)}" ${at(0.7, 'none')}/>`);
  out.push(`<path d="${courbe(BOUCHE, false)}" ${at(0.7, 'none')}/>`);
  out.push(`<path d="${courbe(CUISSE, false)}" ${at(0.7, 'none')}/>`);
  out.push(`<path d="${courbe(PIED_HAUT, false)}" ${at(0.7, 'none')}/>`);
  const oe = P(...OEIL);
  // l'œil : une amande noire, un point de lumière
  const amande = [[-14, 1], [-6, -8], [6, -8.5], [14, -1], [6, 8], [-6, 7.5]].map(([u, v]) => [OEIL[0] + u, OEIL[1] + v]);
  out.push(`<path d="${courbe(amande, true)}" fill="${NOIR}" stroke="none"/>`);
  const lu = P(OEIL[0] + 3, OEIL[1] - 3);
  out.push(`<circle cx="${f(lu[0])}" cy="${f(lu[1])}" r="${f(2.6 * s)}" fill="${BLANC}" stroke="none"/>`);
  out.push('</g>');
  const svg = out.join('\n');
  const pts = CONTOUR.map((p) => P(p[0], p[1]));
  const nuque = P(470, 458), gorge = P(368, 632);
  return {
    svg, toString() { return svg; }, P,
    nuque, gorge, cou: [(nuque[0] + gorge[0]) / 2, (nuque[1] + gorge[1]) / 2],
    menton: P(318, 590), museau: P(297, 524), oeil: oe,
    pieds: { devant: P(420, 806), derriere: P(818, 724) },
    boite: { x0: Math.min(...pts.map((p) => p[0])), x1: Math.max(...pts.map((p) => p[0])), y0: Math.min(...pts.map((p) => p[1])), y1: Math.max(...pts.map((p) => p[1])) },
  };
};
