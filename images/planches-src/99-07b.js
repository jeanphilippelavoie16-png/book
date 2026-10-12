// Planche 99-07b — La marcotte du groseillier : sevrer, déterrer, partager (ch. 99, §E, étape 42).
// Suite de la 99-07a, au même repère et à la même échelle : après une saison, la branche a
// raciné là où elle touchait la terre. On la sèvre (on coupe le lien avec le plant mère), on la
// déterre ; « une seule branche donne souvent plusieurs plants » : on la coupe entre les paquets
// de racines, chaque morceau garde des racines et une pousse.
// Aucune cote : le chapitre ne donne aucune mesure pour la marcotte.

const path = require('path');
const pageA = require(path.join(__dirname, '99-07a.js'));
const { outils, repere, SOL } = pageA;
const r1 = v => Math.round(v * 10) / 10;

// Les paquets de racines, sous la branche couchée : [x, taille, graine].
const TOUFFES = [[53, 0.8, 11], [63, 1, 23], [71, 0.6, 37], [85, 1, 41], [93, 0.65, 53], [106, 1, 67]];
// Les coupes : le sevrage, puis entre les paquets.
const X_SEVRE = 24, COUPES = [77, 99];
// Les trois morceaux, dans la géométrie de la branche couchée, et la largeur du tube à chaque bout.
const MORCEAUX = (RB) => [
  { pts: [[X_SEVRE, -9.6], [28, -8], [35, -4], [41, -1.3], [48, -RB], [60, -RB], [77, -RB]], w: [1.72, 1.52], x: [X_SEVRE, 77] },
  { pts: [[77, -RB], [88, -RB], [99, -RB]], w: [1.52, 1.4], x: [77, 99] },
  { pts: [[99, -RB], [104, -RB], [110, -1.6], [114, -5], [116.5, -11], [117.5, -18], [117, -26]], w: [1.4, 0.8], x: [99, 118] },
];
const BOUT = [[117, -26], [117.4, -34], [117.2, -43], [116.2, -52]];

const planche = (h) => {
  const O = outils(h), A = h.a;
  const { pt, lisse, tige } = O;

  // ── Vue 1 : après une saison, en place ────────────────────────────────────────────────────
  const saison = z => {
    const P = repere(z);
    const out = [];
    out.push(O.sol(P, SOL.x0, SOL.x1, SOL.fond));
    out.push(O.plantMere(P));
    // les racines, dans la terre, sous la branche
    for (const [x, t, g] of TOUFFES) out.push(O.racines(P, x, 0, g, t));
    out.push(O.tube(P, [[0, 0], [5, -6], [12, -10], [20, -10.5], [28, -8], [35, -4], [41, -1.3], [48, -O.RB], [70, -O.RB],
      [90, -O.RB], [104, -O.RB], [110, -1.6], [114, -5], [116.5, -11], [117.5, -18], [117, -26]], 2 * O.RB, 0.8));
    // les pousses, une saison plus tard, et le bout qui a monté
    for (const p of O.POUSSES.longues) out.push(tige(P, p, { ep: 1.4, debut: 12, pas: 7, L: 5, halo: true, feuillesDes: 12 }));
    out.push(tige(P, BOUT, { ep: 1.4, debut: 4, pas: 7, L: 5, halo: true, impair: true }));
    // le crochet, toujours en place
    const J0 = O.posJ(), J = [O.XCROCHET, J0[1]];
    const RAD = Math.PI / 180;
    const bras = [O.CR.bras * (Math.sin(O.CR.angle * RAD) * 0.5 * Math.SQRT1_2),
      O.CR.bras * (Math.cos(O.CR.angle * RAD) - Math.sin(O.CR.angle * RAD) * 0.5 * Math.SQRT1_2)];
    out.push(O.crochet(P, J, bras, { halo: true }));
    out.push(O.dessusSol(P, SOL.x0, SOL.x1));
    // sevrer : le trait de coupe entre le plant et la marcotte
    const c = O.aX([[20, -10.5], [28, -8], [35, -4], [41, -1.3]], X_SEVRE);
    out.push(O.traitCoupe(P, c.p, c.u, 8));
    return out.join('\n');
  };

  // ── Vue 2 : déterrée et partagée ──────────────────────────────────────────────────────────
  const ECART = 13;                                    // cm entre deux morceaux, sur le dessin
  const repP = z => {
    const s = Math.min((z.h - 14) / 74, (z.l - 90) / (118 - X_SEVRE + 2 * ECART));
    const ox = z.l / 2 - ((X_SEVRE + 118) / 2 + ECART) * s, oy = 6 + 58 * s;
    return { s, P: i => (x, y) => [r1(ox + (x + i * ECART) * s), r1(oy + y * s)] };
  };
  const partage = z => {
    const { P } = repP(z);
    const out = [];
    MORCEAUX(O.RB).forEach((m, i) => {
      const Pi = P(i);
      for (const [x, t, g] of TOUFFES) if (x > m.x[0] && x < m.x[1]) out.push(O.racines(Pi, x, 0, g, t, false));
      out.push(O.tube(Pi, m.pts, m.w[0], m.w[1]));
      if (i < 2) out.push(tige(Pi, O.POUSSES.longues[i], { ep: 1.4, debut: 12, pas: 7, L: 5, feuillesDes: 12 }));
      else out.push(tige(Pi, BOUT, { ep: 1.4, debut: 4, pas: 7, L: 5, impair: true }));
    });
    return out.join('\n');
  };

  return {
    ref: '99-07b',
    titre: 'La marcotte du groseillier : sevrer, déterrer, partager',
    desc: 'Après une saison, la branche couchée a fait des racines là où elle touchait la terre, sous la butte. On la sèvre en la coupant entre le plant mère et la partie enracinée, puis on la déterre. Coupée entre les paquets de racines, une seule branche donne plusieurs plants : chaque morceau garde des racines et une pousse.',
    format: 'pleine',
    disposition: [['saison'], ['partage']],
    hauteurs: [3.3, 2.5],
    vues: {
      saison: {
        titre: 'Une saison plus tard : sevrer, puis déterrer',
        dessin: saison,
        renvois: z => {
          const P = repere(z);
          return [
            { n: 1, rond: [z.l - 16, P(0, 16)[1]], cible: P(86, 9), texte: 'des racines, là où elle touchait la terre' },
            { n: 2, rond: [P(20, 0)[0], P(0, -44)[1]], cible: P(X_SEVRE, -9.8), texte: 'sevrer : couper entre le plant et la marcotte' },
            { n: 3, rond: [z.l - 16, P(0, -24)[1]], cible: P(104, -7), texte: 'puis déterrer toute la branche' },
          ];
        },
      },
      partage: {
        titre: 'Une seule branche, plusieurs plants',
        dessin: partage,
        renvois: z => {
          const { P } = repP(z);
          const a = P(0)(77, -O.RB);
          return [
            { n: 4, rond: [a[0] + 20, z.h - 14], cible: [a[0] - 1, a[1] + 1], texte: 'couper entre deux paquets de racines' },
            { n: 5, rond: [z.l - 16, P(1)(0, -30)[1]], cible: P(1)(87.5, -24), texte: 'chaque morceau : des racines et une pousse' },
          ];
        },
      },
    },
  };
};

module.exports = planche;
