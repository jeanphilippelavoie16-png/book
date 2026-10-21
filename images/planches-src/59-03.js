// 55-03 — L'éperlan vidé d'un seul geste (ch. 55, point 25).
// « Couper derrière la tête sans traverser, puis tirer — les viscères viennent avec. »
// Le poisson est décrit en unités propres : museau à x = 0, bout de la queue vers x = 99,
// ligne médiane à y = 0, ventre vers le bas. Chaque vue le ramène à sa taille.

// Courbe lisse (Catmull-Rom → Bézier) par une suite de points ; M seulement si debut.
const lisse = (pts, debut = true) => {
  let d = debut ? `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}` : '';
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1.map(v => v.toFixed(1)).join(' ')} ${c2.map(v => v.toFixed(1)).join(' ')} ${p2.map(v => v.toFixed(1)).join(' ')}`;
  }
  return d;
};
// Plusieurs tronçons lisses mis bout à bout (les jonctions restent des angles vifs).
const troncons = (tr, ferme) => tr.map((t, i) => lisse(t, i === 0)).join(' ') + (ferme ? ' Z' : '');

// ─── Le poisson, en unités ───────────────────────────────────────────────────────────
const DOS = [[0, 0.8], [2, -1.6], [5, -3.7], [10, -5.5], [16, -6.7], [24, -7.4], [34, -7.8],
  [44, -7.6], [54, -6.8], [64, -5.4], [74, -3.8], [82, -2.6], [86, -2.2]];
const VENTRE = [[86, 2.2], [82, 2.6], [74, 3.8], [64, 5.4], [54, 7], [44, 8], [34, 8.3],
  [24, 7.8], [16, 6.8], [10, 5.4], [5, 3.7], [1.5, 2.8], [-1.2, 2.3]];
const QUEUE = [
  [[86, -2.2], [91, -4.2], [96, -7.2], [99.5, -9]],
  [[99.5, -9], [96.5, -4.2], [94, 0]],
  [[94, 0], [96.5, 4.2], [99.5, 9]],
  [[99.5, 9], [96, 7.2], [91, 4.2], [86, 2.2]],
];
const BOUCHE = [[-1.2, 2.3], [0, 0.8]];

// La coupe : entre au dos derrière l'ouïe, descend vers l'avant, s'arrête avant le ventre.
const POINTE = [21, 4.2];
const ANG = 22 * Math.PI / 180;
const AX = [Math.sin(ANG), -Math.cos(ANG)];   // de la pointe vers le manche
const NO = [Math.cos(ANG), Math.sin(ANG)];    // côté du dos de lame (vers la queue)
const couteau = (u, v) => [POINTE[0] + u * AX[0] + v * NO[0], POINTE[1] + u * AX[1] + v * NO[1]];
// Point où la coupe sort par le dos (u ≈ 12,4 sur l'axe de la lame).
const ENTREE = couteau(12.4, 0);

// Pièces du poisson coupé en deux (vue « tirer »).
const TETE_DOS = DOS.filter(p => p[0] < ENTREE[0] - 0.5).concat([ENTREE]);
const TETE_VENTRE = [[22, 7.6], [16, 6.8], [10, 5.4], [5, 3.7], [1.5, 2.8], [-1.2, 2.3]];
const CORPS_DOS = [ENTREE].concat(DOS.filter(p => p[0] > ENTREE[0] + 1));
const CORPS_VENTRE = VENTRE.filter(p => p[0] > 25);

module.exports = (h) => {
  const fishFill = h.a.contour.replace('fill="none"', 'fill="#fff"');
  const areteFill = h.a.arete.replace('fill="none"', 'fill="#fff"');

  // Transforme des points poisson → vue : échelle s, origine (ox, oy), rotation r autour de c.
  const T = (s, ox, oy, r = 0, c = [0, 0], dx = 0, dy = 0) => p => {
    const x = p[0] - c[0], y = p[1] - c[1];
    const xr = c[0] + x * Math.cos(r) - y * Math.sin(r) + dx;
    const yr = c[1] + x * Math.sin(r) + y * Math.cos(r) + dy;
    return [ox + xr * s, oy + yr * s];
  };
  const M = (t, pts) => pts.map(t);

  // Les détails communs de la tête : œil, bouche, ouïe, nageoire pectorale.
  const detailsTete = t => [
    `<circle cx="${t([6.4, -1.3])[0].toFixed(1)}" cy="${t([6.4, -1.3])[1].toFixed(1)}" r="${(2.3 * t.s).toFixed(1)}" ${h.a.arete}/>`,
    `<circle cx="${t([6.8, -1.2])[0].toFixed(1)}" cy="${t([6.8, -1.2])[1].toFixed(1)}" r="${(1.05 * t.s).toFixed(1)}" ${h.a.plein}/>`,
    h.path(lisse(M(t, [[-0.4, 1.6], [4, 2.3], [9, 2.9]])), h.a.detail),
    h.path(lisse(M(t, [[15.2, -6.2], [17.4, -2.5], [18, 1.2], [16.8, 4.8], [14.6, 6.9]])), h.a.arete),
    h.path(lisse(M(t, [[11, -3.6], [12.4, 0.4], [11.6, 4.6]])), h.a.detail),
  ];
  // Vue « tirer » : le corps reste en place, la tête part vers l'avant.
  const geoTirer = z => {
    const s = Math.min((z.l - 30) / 119, (z.h - 14) / 27);
    const ox = (z.l - 119 * s) / 2 + 19 * s, oy = 7 + 15 * s;
    const t = T(s, ox, oy); t.s = s;
    const tt = T(s, ox, oy, -0.1, [18, 2], -17, 1.2); tt.s = s;
    return { s, t, tt };
  };

  // Les nageoires et la ligne du corps (tout ce qui est derrière la coupe).
  const detailsCorps = t => [
    h.path(troncons([M(t, [[41, -7.7], [42.4, -12.6], [44.4, -14]]), M(t, [[44.4, -14], [47.6, -11], [51, -8.4], [50.6, -7.3]])]), h.a.arete),
    h.path(lisse(M(t, [[42.8, -8], [44.2, -13.2]])) + lisse(M(t, [[45.4, -7.9], [47.2, -11]])) + lisse(M(t, [[48, -7.6], [49.8, -9.2]])), h.a.fin),
    h.path(lisse(M(t, [[75, -3.7], [76.4, -6.2], [78.6, -6.3], [79.6, -3.3]])), h.a.arete),
    h.path(troncons([M(t, [[43, 8], [45.6, 11.6], [48.6, 11.4]]), M(t, [[48.6, 11.4], [48, 8.1]])]), h.a.arete),
    h.path(troncons([M(t, [[58, 6.3], [59.4, 10.8], [62, 11.2]]), M(t, [[62, 11.2], [66.4, 8.4], [70, 5]])]), h.a.arete),
    h.path(lisse(M(t, [[88, -0.6], [96, -6.2]])) + lisse(M(t, [[88, 0.6], [96, 6.2]])) + lisse(M(t, [[88, 0], [93, 0]])), h.a.fin),
    h.path(lisse(M(t, [[27, -0.9], [50, -0.9], [70, -0.5], [86, -0.1]])), h.a.fin),
  ];

  return {
    ref: '59-03',
    titre: 'L’éperlan vidé d’un seul geste',
    desc: 'Un éperlan vu de profil. En haut, la lame entre par le dos juste derrière l’ouïe et descend en biais vers l’avant ; sa pointe s’arrête avant la peau du ventre, qui reste entière. En bas, la tête est tirée vers l’avant : les viscères sortent du corps, attachés à elle, en un seul morceau.',
    format: 'quart',
    disposition: [['couper'], ['tirer']],
    vues: {
      couper: {
        titre: 'Couper',
        dessin: z => {
          // Étendue en unités : x de -1,5 à 99,5 ; y du haut du manche à 11,6.
          const haut = couteau(38, -1.8)[1];
          const s = Math.min((z.l - 30) / 101, (z.h - 10) / (11.8 - haut));
          const ox = (z.l - 101 * s) / 2 + 1.5 * s, oy = 5 + (-haut) * s;
          const t = T(s, ox, oy); t.s = s;
          // tracé du poisson : les nageoires sous le corps d'abord, puis le corps plein blanc.
          const corps = h.path(troncons([M(t, DOS), ...QUEUE.map(q => M(t, q)), M(t, VENTRE), M(t, BOUCHE)], true), fishFill);
          const fins = detailsCorps(t);
          const lame = [[0, 0], [5, -0.6], [14, -0.9], [24, -0.9], [24, 4.6], [14, 4.6], [6, 3.4]].map(p => t(couteau(...p)));
          const mitre = [[24, -1.3], [26, -1.3], [26, 5], [24, 5]].map(p => t(couteau(...p)));
          const manche = lisse([[26, -1.5], [33, -1.8], [38, -1.4], [38.6, 1.7], [38, 4.9], [33, 5.4], [26, 5.1]].map(p => t(couteau(...p))));
          const fishD = troncons([M(t, DOS), ...QUEUE.map(q => M(t, q)), M(t, VENTRE), M(t, BOUCHE)], true);
          return [
            `<clipPath id="clip-eperlan-dedans"><path fill="none" d="${fishD}"/></clipPath>`,
            `<clipPath id="clip-eperlan-dehors"><path fill="none" clip-rule="evenodd" d="M-50 -50 H${z.l + 50} V${z.h + 50} H-50 Z ${fishD}"/></clipPath>`,
            fins.slice(0, 5).join('\n'),
            corps,
            fins.slice(5).join('\n'),
            detailsTete(t).join('\n'),
            // la lame dans la chair : tiretée ; la coupe elle-même en trait franc
            `<g clip-path="url(#clip-eperlan-dedans)">${h.chemin(lame, h.a.cache, true)}</g>`,
            h.chemin([t(ENTREE), t(POINTE)], h.a.arete),
            `<g clip-path="url(#clip-eperlan-dehors)">${h.chemin(lame, areteFill, true)}</g>`,
            h.chemin(mitre, areteFill, true),
            h.path(manche + ' Z', fishFill),
            h.cercle(...t(couteau(29.5, 1.8)), 0.9 * s, h.a.detail),
            h.cercle(...t(couteau(35, 1.8)), 0.9 * s, h.a.detail),
            // le point qui casse sur un raté : la pointe s'arrête avant la peau du ventre
            h.controle(...t([POINTE[0] + 0.4, 6.4]), 3.4 * s),
          ].join('\n');
        },
        renvois: z => {
          const haut = couteau(38, -1.8)[1];
          const s = Math.min((z.l - 30) / 101, (z.h - 10) / (11.8 - haut));
          const ox = (z.l - 101 * s) / 2 + 1.5 * s, oy = 5 + (-haut) * s;
          const t = T(s, ox, oy);
          const e = t(ENTREE), v = t([POINTE[0] + 0.3, 7.2]);
          return [
            { n: 1, rond: [e[0] - 40, e[1] - 22], cible: [e[0] - 2, e[1] - 2], texte: 'derrière l’ouïe, par le dos' },
            { n: 2, rond: [v[0] - 44, z.h - 10], cible: [v[0] - 2, v[1] + 3], texte: 'sans traverser : le ventre tient' },
          ];
        },
      },
      tirer: {
        titre: 'Tirer',
        dessin: z => {
          const { s, t, tt } = geoTirer(z);
          // la tête, déplacée vers l'avant et un peu basculée ; bord de coupe franc, ventre déchiré
          const dechire = [POINTE, [22.2, 5.2], [21.2, 6.3], [22, 7.6]];
          const teteD = troncons([M(tt, TETE_DOS), M(tt, [ENTREE, POINTE]),
            ...dechire.slice(1).map((p, i) => M(tt, [dechire[i], p])), M(tt, TETE_VENTRE), M(tt, BOUCHE)], true);
          const corpsD = troncons([M(t, CORPS_DOS), ...QUEUE.map(q => M(t, q)), M(t, CORPS_VENTRE),
            M(t, [[34, 8.3], [22.6, 7.8]]), M(t, [[22.6, 7.8], [22, 6.6]]), M(t, [[22, 6.6], [22.9, 5.4]]),
            M(t, [[22.9, 5.4], POINTE]), M(t, [POINTE, ENTREE])], true);
          // les viscères : pendus au fond de la tête, encore engagés dans le corps
          const a1 = tt([21.2, 1.6]), a2 = tt([21.4, 4.6]);
          const b1 = t([22.6, 2.2]), b2 = t([22.6, 4.8]);
          const mil = (p, q, dy) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2 + dy * s];
          const visc = lisse([a1, mil(a1, b1, 1.2), b1, t([24.4, 3.2]), b2, mil(a2, b2, 3.4), a2]) + ' Z';
          const cm = mil(a1, b1, 0);
          const P = (dx, dy) => [cm[0] + dx * s, cm[1] + dy * s];
          const replis = lisse([P(-4.5, 2.6), P(-2, 4.6), P(0.5, 3)]) + lisse([P(0, 4.4), P(2.6, 5.6), P(4.8, 3.4)]);
          const fins = detailsCorps(t);
          const fl1 = tt([15, -10.5]), fl2 = tt([2, -10.5]);
          return [
            fins.slice(0, 5).join('\n'),
            h.path(corpsD, fishFill),
            fins.slice(5).join('\n'),
            // le reste du paquet, encore dans le ventre jusqu'à l'anus : caché, tireté
            h.path(lisse(M(t, [[22.6, 2.2], [32, 2.1], [44, 2.7], [52, 3.5], [55, 4.8], [52, 6], [44, 6.4], [32, 5.7], [22.6, 4.8]])), h.a.cache),
            h.path(visc, areteFill),
            h.path(replis, h.a.detail),
            h.path(teteD, fishFill),
            detailsTete(tt).join('\n'),
            // le geste : tirer la tête vers l'avant
            h.geste(`M${fl1[0].toFixed(1)} ${fl1[1].toFixed(1)} L${fl2[0].toFixed(1)} ${fl2[1].toFixed(1)}`),
          ].join('\n');
        },
        renvois: z => {
          const { s, t, tt } = geoTirer(z);
          const a2 = tt([21.4, 4.6]), b2 = t([22.6, 4.8]);
          const c = [(a2[0] + b2[0]) / 2, (a2[1] + b2[1]) / 2 + 3.4 * s];
          return [
            { n: 3, rond: [c[0] + 40, z.h - 10], cible: [c[0] + 1, c[1] + 1.5], texte: 'tirer la tête : les viscères suivent' },
          ];
        },
      },
    },
  };
};
