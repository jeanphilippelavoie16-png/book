// _animaux.js — les animaux des planches, de profil, au trait du livre.
//
// Une fonction par animal. Chacune construit la bête par masses simples (ellipses, disques,
// capsules), en fait l'union, arrondit les raccords, et rend un seul contour blanc au poids du corps
// simple (1,5), les traits intérieurs à 0,7 (la cuisse, l'oreille, la patte), le côté loin en gris
// loin. Pas de poil ni de plume : la silhouette, l'œil, et ce qui identifie l'espèce.
//
//   const A = require('./_animaux');
//   const l = A.lievre(h, { x, y, echelle, cote, trait });
//   out.push(l.svg);                       // ou `${l}`
//   l.cou -> [x, y]  le milieu du cou, là où se ferme la boucle ; l.boite, l.oeil, l.museau, l.sol
//
//   x, y      le point au sol sous le cou (vue) ; y est le dessus de la neige
//   echelle   unités de vue par mm (le lièvre fait ~ 360 mm du derrière au museau, accroupi)
//   cote      'droite' (défaut : il regarde vers +x) · 'gauche'
//   trait     1,5 par défaut (le corps simple) · 2,4 quand l'animal est le sujet de la vue
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
// Accroupi, la tête tendue vers l'avant comme sur sa piste : le dos rond, la cuisse haute, le grand
// pied de derrière à plat sous la cuisse, la patte de devant mince et droite, la tête ronde au
// museau court et carré, l'œil grand, haut, sur le côté ; l'oreille plus courte que la tête, le bout
// noir (pelage d'hiver). La queue, une touffe.
function lievre(h, o = {}) {
  const s = o.echelle || 0.3, m = o.cote === 'gauche' ? -1 : 1;
  const X = o.x || 0, Y = o.y || 0;
  const ep = o.trait || 1.5, epI = 0.7;
  const Tm = p => [X + m * s * p[0], Y - s * p[1]];

  // Les masses (mm, y vers le haut, origine au sol sous le cou ; la bête regarde vers +x).
  const tete = { c: [62, 118], rx: 50, ry: 33, a: -20 };
  const masses = {
    cuisse: ellipse([-190, 92], 78, 84, 12),
    dos: ellipse([-120, 118], 92, 62, -8),
    poitrine: ellipse([-35, 92], 58, 58, 0),
    cou: capsule([-20, 112], [30, 122], 36, 30),
    tete: ellipse(tete.c, tete.rx, tete.ry, tete.a),
    museau: disque([98, 100], 20),
    queue: disque([-262, 112], 16),
    talon: capsule([-205, 42], [-238, 14], 20, 14),
    pied: capsule([-238, 11], [-95, 9], 11, 9),
    patteP: capsule([-28, 56], [-12, 12], 13, 10),
    mainP: capsule([-14, 9], [12, 8], 9, 8),
    oreille: null,
  };
  // L'oreille : une ellipse longue, posée sur l'arrière du crâne, couchée vers l'arrière.
  const oreille = (base, ang, L, l) => ellipse([base[0] + Math.cos(ang * RAD) * L / 2, base[1] + Math.sin(ang * RAD) * L / 2], L / 2, l / 2, ang);
  const baseO = [40, 140];
  masses.oreille = oreille(baseO, 118, 92, 30);
  const oreilleL = oreille([50, 142], 104, 88, 28);
  const patteL = U(capsule([-5, 56], [16, 12], 12, 9), capsule([14, 9], [38, 8], 8, 7));

  // La silhouette proche : l'union, les creux arrondis (sous le menton, entre la cuisse et le dos).
  const corps = M.ferme(M.unionCL(['cuisse', 'dos', 'poitrine', 'cou', 'tete', 'museau', 'queue', 'talon', 'pied', 'patteP', 'mainP'].map(k => Array.isArray(masses[k][0]) ? cl(masses[k]) : masses[k])), 14);
  const proche = M.ferme(U(corps, cl(masses.oreille)), 6);
  const loin = M.moins(U(cl(oreilleL), patteL), proche);

  // Les traits intérieurs : là où une masse passe devant une autre.
  const dedans = M.decale(proche, -3);
  const cuisseL = M.bordsDans(cl(ellipse([-190, 92], 78, 84, 12)), M.moins(dedans, M.decale(cl(masses.pied), 6)));
  const patteBord = M.bordsDans(U(masses.patteP), M.moins(dedans, M.decale(U(masses.mainP), 1)));
  // le creux de l'oreille, un trait le long de son axe
  const axeO = bez([[baseO[0] + 6, baseO[1] + 10], [baseO[0] - 4, baseO[1] + 34], [baseO[0] - 14, baseO[1] + 58], [baseO[0] - 26, baseO[1] + 74]]);
  // le bout noir de l'oreille : ce qui dépasse d'une ligne tirée en travers, près de la pointe
  const bout = (base, ang, L) => {
    const d = [Math.cos(ang * RAD), Math.sin(ang * RAD)], n = [-d[1], d[0]], c = [base[0] + d[0] * L * 0.8, base[1] + d[1] * L * 0.8];
    return [[c[0] + n[0] * 40, c[1] + n[1] * 40], [c[0] + n[0] * 40 + d[0] * 60, c[1] + n[1] * 40 + d[1] * 60], [c[0] - n[0] * 40 + d[0] * 60, c[1] - n[1] * 40 + d[1] * 60], [c[0] - n[0] * 40, c[1] - n[1] * 40]];
  };
  const boutP = M.inter(cl(masses.oreille), cl(bout(baseO, 118, 92)));
  const boutL = M.inter(M.moins(cl(oreilleL), proche), cl(bout([50, 142], 104, 88)));

  // L'œil : grand, en amande, haut sur le côté de la tête ; la narine et la fente de la lèvre.
  const oeilC = [70, 128];
  const oeil = ellipse(oeilC, 9, 6.5, -12, 36);
  const narine = bez([[104, 112], [107, 110], [110, 108], [113, 106]], 6);
  const levre = bez([[112, 100], [108, 96], [104, 93], [99, 92]], 8);

  const R = rendu({ echelle: s }, Tm);
  const out = [`<g data-animal="lievre">`];
  out.push(R.plein(loin, GRIS), R.bord(loin, ep));
  out.push(R.plein(boutL, NOIR));
  if (o.derriere) out.push(o.derriere);
  out.push(R.plein(proche, BLANC));
  out.push(R.plein(boutP, NOIR));
  out.push(R.bord(proche, ep));
  out.push(R.ligne(cuisseL, epI), R.ligne(patteBord, epI), R.ligne([axeO], epI), R.ligne([narine, levre], epI));
  out.push(R.plein(cl(oeil), NOIR));
  out.push('</g>');
  const svg = out.filter(Boolean).join('\n');

  const geo = {
    cou: Tm([5, 118]), menton: Tm([60, 84]), museau: Tm([118, 102]), oeil: Tm(oeilC), sol: Y,
    nuque: Tm([10, 150]), gorge: Tm([5, 86]), echelle: s, miroir: m < 0,
  };
  const pts = M.deCL(proche[0] || []).map(Tm);
  if (pts.length) geo.boite = { x0: Math.min(...pts.map(p => p[0])), x1: Math.max(...pts.map(p => p[0])), y0: Math.min(...pts.map(p => p[1])), y1: Math.max(...pts.map(p => p[1])) };
  return Object.assign({ svg, toString() { return svg; } }, geo);
}

module.exports = { lievre, _outils: { ellipse, disque, capsule, bez, rendu } };
