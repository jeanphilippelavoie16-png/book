// Planche 89-06 — La raquette de trois perches (ch. 89, « La raquette de sortie »)
//
// Tout vient du passage du chapitre : trois perches de la taille de la personne, gros bouts en
// arrière, pointes nouées ; un bâton en travers des gros bouts ; trois bâtons jointifs un peu en
// avant du milieu (plancher de pivot) ; deux bâtons où le talon retombe ; la botte attachée au
// plancher seulement. Six bâtons d'environ 25 cm : seule cote de la planche.
// Le dessin est fait à l'échelle d'une perche de 170 cm, mais la longueur n'est pas cotée : le
// chapitre dit « aussi longue que la personne est grande », pas un chiffre.
//
// La charte : de côté, la raquette au contour fort ; vue de dessus, les perches restent au trait
// moyen (trois bandes de 3 à 7 px qui se rejoignent : un contour fort boucherait la pointe) ; pas de gris (vue de dessus, neige hachurée, la botte est un corps).
// Redessin du 14 octobre : de côté, la jambe est le corps simple, coupée par le haut de la vue, et la
// botte le mukluk souple de _pieds.js ; la botte dessinée à la main et sa jambe de pantalon sont parties.
// Le rouge, sur le raté : l'attache derrière le milieu (l'endroit où ça casse) et la flèche qui
// l'avance (le geste). L'arc de la pointe qui se lève et la flèche du nez qui plonge restent
// noirs : c'est la raquette qui bouge, pas un geste.

const LONG = 170;                           // longueur de dessin (cm), jamais écrite
const r = u => 1.25 - 0.62 * u / LONG;      // rayon de la perche : pouce au gros bout, petit doigt à la pointe
const RB = 1.15;                            // rayon d'un bâton
const ARR = 4;                              // bâton arrière, sur les gros bouts
const PIV = [95, 97.3, 99.6];               // plancher de pivot : trois bâtons jointifs
const TAL = [74, 76.3];                     // deux bâtons sous le talon
const MIL = LONG / 2;
const DEG = Math.PI / 180;

const echelle = z => { const x0 = 80; return { x0, s: (z.l - x0 - 24) / LONG }; };

// ─── vue de dessus ──────────────────────────────────────────────────────────────────────
function plan(z) {
  const { x0, s } = echelle(z);
  const yc = z.h / 2 + 4;
  const X = u => x0 + u * s, Y = v => yc + v * s;
  const c = (i, u) => i * (11 - 10.1 * u / LONG);   // axe de la perche i (-1, 0, 1)
  return { X, Y, c, s, yc, P: (u, v) => [X(u), Y(v)] };
}

function perchePlan(h, G, i) {
  const us = []; for (let u = 0; u <= LONG; u += 5) us.push(u);
  const pts = [...us.map(u => G.P(u, G.c(i, u) - r(u))), ...us.slice().reverse().map(u => G.P(u, G.c(i, u) + r(u)))];
  return h.chemin(pts, h.a.blanc, true) + '\n' + h.chemin(pts, h.a.arete, true);
}

function batonPlan(h, G, uc) {
  const x = G.X(uc - RB), y = G.Y(-12.5), l = 2 * RB * G.s, ht = 25 * G.s;
  const ligs = [-1, 0, 1].map(i => {
    const v = G.c(i, uc), du = RB + 0.5, dv = r(uc) + 0.5;
    // la ligature en croix sur le croisement : de la corde, pas une hachure
    return h.chemin([G.P(uc - du, v - dv), G.P(uc + du, v + dv)], h.a.fin) + '\n'
      + h.chemin([G.P(uc + du, v - dv), G.P(uc - du, v + dv)], h.a.fin);
  });
  return [h.rect(x, y, l, ht, h.a.blanc), h.rect(x, y, l, ht, h.a.arete), ...ligs].join('\n');
}

// semelle de la botte, vue de dessus (u, v en cm)
const BOTTE_PLAN = [[71, 0], [72, -3.6], [78, -4.3], [88, -5.2], [95, -5.6], [101, -5], [104, -2.6], [104.8, 0],
  [104, 2.6], [101, 5], [95, 5.6], [88, 5.2], [78, 4.3], [72, 3.6]];

// ─── de côté ────────────────────────────────────────────────────────────────────────────
// t : pente de la raquette en degrés (positive : pointe en haut). ub : endroit de la plante du pied.
// phi : talon levé, en degrés. Le repère local de la botte a l'origine sous la plante, y vers le haut.
function profil(z, { t, ub, phi, pose }) {
  const { x0, s } = echelle(z);
  const ys = z.h - 26;
  const a = [Math.cos(t * DEG), -Math.sin(t * DEG)], n = [-Math.sin(t * DEG), -Math.cos(t * DEG)];
  let O;
  if (pose === 'queue') {            // le gros bout posé sur la neige
    O = [x0 + s * r(0) * n[0], ys + s * r(0) * n[1]];
  } else {                           // la pointe enfoncée dans la neige
    O = [x0, 0];
    const yPointe = O[1] + s * (LONG * a[1] - r(LONG) * n[1]);
    O[1] += ys + 14 - yPointe;
  }
  const Pt = (u, w) => [O[0] + s * (u * a[0] + w * n[0]), O[1] + s * (u * a[1] + w * n[1])];
  const B = Pt(ub, r(ub) + 2 * RB);
  const loc = (x, y) => [B[0] + s * (x * a[0] + y * n[0]), B[1] + s * (x * a[1] + y * n[1])];
  const f = phi * DEG;
  const rot = (x, y) => loc(x * Math.cos(f) + y * Math.sin(f), -x * Math.sin(f) + y * Math.cos(f));
  return { s, ys, Pt, loc, rot, t, ub, x0 };
}

function raquetteProfil(h, G) {
  const us = []; for (let u = 0; u <= LONG; u += 5) us.push(u);
  const pts = [...us.map(u => G.Pt(u, r(u))), ...us.slice().reverse().map(u => G.Pt(u, -r(u)))];
  // de côté, la raquette est l'objet : contour fort
  const out = [h.chemin(pts, h.a.blanc, true), h.chemin(pts, h.a.contour, true)];
  // pointes nouées
  for (const u of [157, 159.5, 162, 164.5]) {
    const p1 = G.Pt(u, -r(u) - 0.4), p2 = G.Pt(u + 1.2, r(u) + 0.4);
    out.push(h.chemin([p1, p2], h.a.detail));        // tour de corde, pas une hachure
  }
  // bâtons en travers, vus en bout
  for (const uc of [ARR, ...G.talons, ...G.pivots]) {
    const [cx, cy] = G.Pt(uc, r(uc) + RB);
    out.push(h.cercle(cx, cy, RB * G.s, h.a.blanc), h.cercle(cx, cy, RB * G.s, h.a.arete));
  }
  return out.join('\n');
}

// La jambe est le corps simple (h.formes.corps, debout), coupée par le haut de la vue ; la botte, le
// mukluk souple de _pieds.js (le chapitre veut un chaussage mou), repris sur la jambe à la tige. Sa
// plante pose sur le plancher de pivot : le point PLANTE du pied tombe sur G.loc(0, 0). La semelle fait
// à l'écran l'angle de la raquette moins celui du talon levé, et le tibia reste d'équerre au pied.
const { jambeEtPied } = require('./_pieds');
const PLANTE = [150, 74.5];                 // sous la plante, dans le repère du pied (mm)
const DESSUS = [184, 30];                   // le dessus du pied, devant la plante : la corde y passe
function botteC(h, G, cfg, id) {
  const beta = cfg.t - cfg.phi;             // l'angle de la semelle à l'écran, pointe en haut positive
  const opt = { pose: 'debout', appui: 'aucun', echelle: G.s / 10, angles: { jambeP: beta, cuisseP: beta + 8 }, masquer: ['brasP', 'brasL', 'jambeL'] };
  const pied = { pied: 'mukluk', H: 150 };
  const r0 = jambeEtPied(h, Object.assign({ x: 0, y: 0 }, opt), Object.assign({ id: id + '-0' }, pied));
  const v0 = r0.versVue(PLANTE), cible = G.loc(0, 0);
  return jambeEtPied(h, Object.assign({ x: cible[0] - v0[0], y: cible[1] - v0[1] }, opt), Object.assign({ id }, pied));
}
function botteProfil(h, G, z, cfg, id) {
  const J = botteC(h, G, cfg, id);
  const out = [`<clipPath id="${id}-vue"><rect x="0" y="0" width="${z.l}" height="${z.h}"/></clipPath>`, `<g clip-path="url(#${id}-vue)">`, J.svg, '</g>'];
  // l'attache : par-dessus l'avant du pied, autour du plancher de pivot, rien au talon
  const [p0, , p2] = G.pivots.map(u => G.Pt(u, r(u) + RB));
  out.push(h.chemin([p0, J.versVue(DESSUS), p2], h.a.detail));
  return out.join('\n');
}

function neige(h, z, G, cacher) {
  const out = [];
  if (cacher) out.push(h.rect(4, G.ys, z.l - 8, z.h - G.ys - 2, h.a.blanc));
  out.push(h.rect(4, G.ys, z.l - 8, z.h - G.ys - 2, h.a.hachure('neige', 'aucun')));
  out.push(h.ligne(4, G.ys, z.l - 4, G.ys, h.a.arete));
  return out.join('\n');
}

// arc de rotation autour du pivot, de l'angle b1 à b2 (degrés, sens trigo), au rayon R
function arc(h, K, R, b1, b2) {
  const p = b => [K[0] + R * Math.cos(b * DEG), K[1] - R * Math.sin(b * DEG)];
  const [x1, y1] = p(b1), [x2, y2] = p(b2);
  return h.fleche(`M${x1.toFixed(1)} ${y1.toFixed(1)} A${R.toFixed(1)} ${R.toFixed(1)} 0 0 ${b2 > b1 ? 0 : 1} ${x2.toFixed(1)} ${y2.toFixed(1)}`, h.a.detail);
}

// abscisse où l'axe de la raquette traverse la surface de la neige
function entree(G) { let u = 100; while (u < LONG && G.Pt(u, -r(u))[1] < G.ys) u += 0.5; return G.Pt(u, -r(u))[0]; }

const BON = { t: 9, ub: 95.5, phi: 22, pose: 'queue', pivots: PIV, talons: TAL };
const RATE = { t: -9, ub: 51.5, phi: 6, pose: 'pointe', pivots: [51, 53.3, 55.6], talons: [30, 32.3] };

function vueProfil(h, z, cfg) {
  const G = Object.assign(profil(z, cfg), { pivots: cfg.pivots, talons: cfg.talons });
  const out = [];
  if (cfg.pose === 'queue') out.push(neige(h, z, G, false));
  out.push(raquetteProfil(h, G), botteProfil(h, G, z, cfg, cfg.pose === 'queue' ? 'botte-pas' : 'botte-rate'));
  // milieu de la raquette : trait mixte court, perpendiculaire
  const m1 = G.Pt(MIL, -6), m2 = G.Pt(MIL, 6);
  out.push(h.ligne(m1[0], m1[1], m2[0], m2[1], h.a.fin + ' stroke-dasharray="12 3 2 3"'));
  const K = G.Pt(cfg.ub, 0), T = G.Pt(LONG, 0);
  const Rt = Math.hypot(T[0] - K[0], T[1] - K[1]);
  if (cfg.pose === 'queue') {
    out.push(arc(h, K, Rt - 12, cfg.t - 13, cfg.t - 4));
  } else {
    out.push(neige(h, z, G, true));
    // bourrelet là où la pointe entre dans la neige
    const xe = entree(G);
    // la partie enfouie, en caché
    const us = []; for (let u = 120; u <= LONG; u += 5) us.push(u);
    out.push(h.chemin([...us.map(u => G.Pt(u, r(u))), ...us.slice().reverse().map(u => G.Pt(u, -r(u)))], h.a.cache, true));
    out.push(h.chemin([[xe - 22, G.ys], [xe - 12, G.ys - 4], [xe - 2, G.ys - 6], [xe + 8, G.ys - 4], [xe + 18, G.ys]], h.a.blanc, true));
    out.push(h.chemin([[xe - 22, G.ys], [xe - 12, G.ys - 4], [xe - 2, G.ys - 6], [xe + 8, G.ys - 4], [xe + 18, G.ys]], h.a.arete));
    out.push(h.fleche(`M${xe.toFixed(1)} ${(G.ys - 70).toFixed(1)} L${xe.toFixed(1)} ${(G.ys - 14).toFixed(1)}`, h.a.detail));
    const f1 = G.Pt(68, 6), f2 = G.Pt(96, 6);
    // le geste : avancer l'attache ; l'endroit où ça casse : l'attache, derrière le milieu
    out.push(h.geste(`M${f1[0].toFixed(1)} ${f1[1].toFixed(1)} L${f2[0].toFixed(1)} ${f2[1].toFixed(1)}`));
    out.push(h.controle(...G.Pt(cfg.pivots[1], r(cfg.pivots[1]) + RB), 14));
  }
  return { svg: out.join('\n'), G, K, T, Rt };
}

module.exports = (h) => ({
  ref: '89-06',
  titre: 'La raquette de trois perches',
  desc: 'En haut, vue de dessus : trois perches couchées côte à côte, gros bouts à gauche, écartés et ligaturés sur un bâton en travers ; à droite, les trois pointes réunies et nouées. Un peu en avant du milieu, marqué d’un trait mixte, trois bâtons jointifs en travers forment le plancher de pivot ; derrière, deux bâtons là où le talon retombe. La botte, en tireté, a l’avant du pied sur le plancher et le talon sur les deux bâtons. Au milieu, de côté, en marchant : une corde passe autour du plancher et par-dessus l’avant du pied, rien au talon ; la botte lève le talon, le pied pivote sur le plancher, le gros bout de la raquette reste sur la neige et la pointe se lève d’elle-même. En bas, le raté : la botte attachée derrière le milieu, la raquette bascule du nez et la pointe plonge dans la neige ; une flèche montre l’attache à avancer.',
  format: 'pleine',
  disposition: [['plan'], ['pas'], ['rate']],
  hauteurs: [1, 1.12, 1.05],
  vues: {
    plan: {
      titre: 'Vue de dessus',
      dessin: z => {
        const G = plan(z);
        const botte = BOTTE_PLAN.map(([u, v]) => G.P(u, v));
        return [
          h.ligne(G.X(MIL), G.Y(-17), G.X(MIL), G.Y(17), h.a.fin + ' stroke-dasharray="12 3 2 3"'),
          perchePlan(h, G, -1), perchePlan(h, G, 1), perchePlan(h, G, 0),
          ...[157, 159.5, 162, 164.5].map(u => h.ligne(G.X(u), G.Y(-2.5), G.X(u + 1.2), G.Y(2.5), h.a.detail)),
          ...[ARR, ...TAL, ...PIV].map(uc => batonPlan(h, G, uc)),
          h.chemin(botte, h.a.cache, true),
          h.cote(G.X(0) - 18, G.Y(-12.5), G.X(0) - 18, G.Y(12.5), '250 mm', { cote: 'gauche' }),
        ].join('\n');
      },
      renvois: z => {
        const G = plan(z);
        return [
          { n: 1, rond: [G.X(166), G.yc - 46], cible: G.P(162.5, -1.6), texte: 'pointes nouées ensemble' },
          { n: 2, rond: [G.X(130), G.yc - 46], cible: G.P(130, G.c(-1, 130)), texte: 'perches de la taille du marcheur' },
          { n: 3, rond: [G.X(ARR) + 22, G.yc - 50], cible: G.P(ARR, -11.5), texte: 'bâton sur les gros bouts' },
          { n: 4, rond: [G.X(MIL) - 20, G.yc - 50], cible: G.P(MIL, -15.5), texte: 'milieu de la raquette' },
          { n: 5, rond: [G.X(99.6) + 16, G.yc + 50], cible: G.P(99.6, 11.8), texte: 'plancher de pivot, jointifs' },
          { n: 6, rond: [G.X(75) - 14, G.yc + 50], cible: G.P(TAL[0], 11.8), texte: 'deux bâtons sous le talon' },
        ];
      },
    },
    pas: {
      titre: 'De côté, en marchant',
      dessin: z => vueProfil(h, z, BON).svg,
      renvois: z => {
        const { G, T } = vueProfil(h, z, BON);
        const J = botteC(h, G, BON, 'botte-pas');
        const talon = J.versVue([-48, 74.5]), bt = G.Pt(TAL[1], r(TAL[1]) + 2 * RB);
        const gap = [(talon[0] + bt[0]) / 2, (talon[1] + bt[1]) / 2];
        const queue = G.Pt(3, -r(3));
        const corde = J.versVue(DESSUS);
        return [
          { n: 7, rond: [corde[0] + 26, corde[1] - 40], cible: corde, texte: 'attache au plancher seulement' },
          { n: 8, rond: [gap[0] - 60, gap[1] - 24], cible: gap, texte: 'talon libre' },
          { n: 9, rond: [queue[0] + 30, queue[1] - 44], cible: [queue[0] + 4, queue[1] - 2], texte: 'l’arrière reste sur la neige' },
          { n: 10, rond: [T[0] - 10, T[1] - 36], cible: G.Pt(166, r(166)), texte: 'la pointe se lève seule' },
        ];
      },
    },
    rate: {
      titre: 'Le raté : pivot trop en arrière',
      dessin: z => vueProfil(h, z, RATE).svg,
      renvois: z => {
        const { G, T } = vueProfil(h, z, RATE);
        const f = G.Pt(82, 6);
        return [
          { n: 11, rond: [T[0] + 20, G.ys - 50], cible: G.Pt(LONG - 4, 0), texte: 'le nez plonge dans la neige' },
          { n: 12, rond: [f[0], f[1] - 30], cible: [f[0], f[1] - 2], texte: 'avancer l’attache' },
        ];
      },
    },
  },
});
