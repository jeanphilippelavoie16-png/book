// Planche 71-40 — les lanières : trancher, étendre, éprouver (ch. 71, étapes 3, 14 à 20,
// section 9 « Sécher quand il n'y a ni vent ni soleil », note de la lanière témoin, tableau des défauts).
// Seule cote portée : « 6 mm ou moins » (étape 16). Aucun sens du grain : le chapitre n'en dit rien.
module.exports = (h) => {
  const A = h.a;
  const BL = (A.blanc.match(/fill="([^"]+)"/) || [])[1] || '#FFFFFF';
  const blanc = at => at.replace('fill="none"', `fill="${BL}"`);
  const bA = blanc(A.arete), bC = blanc(A.contour), bD = blanc(A.detail);
  const r1 = n => Math.round(n * 10) / 10;
  const j = (k, i) => Math.sin(k * 7.3 + i * 2.9);                // petit désordre reproductible

  // ── la pièce sur la planche, la lame dans la coupe, les tranches debout ──────────────
  // C : décalage de la face de coupe par bandes (0 partout = coupe droite)
  // tr : tranches [x, L[], R[]] — bords gauche et droit par bandes
  const trancher = (z, { haut, gonfle, C, tr, gelee }) => {
    const B = z.h - 24, x0 = 18 - gonfle, xc = 160, T = B - haut, n = C.length;
    const hb = (B - (T + 6)) / n, yb = i => T + 6 + i * hb;
    const o = [];
    // planche à découper
    o.push(h.rect(8, B, z.l - 16, 9, A.hachure('bois', 'fin')), h.rect(8, B, z.l - 16, 9, A.arete));
    // la pièce
    let d = `M${r1(xc + C[n - 1])} ${B} L${x0 + 16} ${B} Q${x0} ${B} ${x0 - 1} ${B - 18} L${x0 - 2} ${r1(T + 24)}`
      + ` Q${x0} ${r1(T + 2)} ${x0 + 34} ${T} Q${r1((x0 + xc) / 2)} ${r1(T - 4 + gonfle)} ${xc - 7} ${r1(T + 1)} Q${xc + C[0]} ${r1(T + 2)} ${xc + C[0]} ${r1(T + 6)}`;
    for (let i = 0; i < n; i++) d += ` L${r1(xc + C[i])} ${r1(yb(i))} L${r1(xc + C[i])} ${r1(yb(i + 1))}`;
    d += ' Z';
    if (gelee) o.push(h.path(d, A.hachure('neige', 'aucun')));
    o.push(h.path(d, gelee ? A.contour : bC));
    // les tranches
    tr.forEach(([xs, L, R], k) => {
      const pts = [];
      for (let i = 0; i < n; i++) pts.push([xs + L[i], yb(i)], [xs + L[i], yb(i + 1)]);
      for (let i = n - 1; i >= 0; i--) pts.push([xs + R[i], yb(i + 1)], [xs + R[i], yb(i)]);
      pts[0][1] += 1.5; pts[pts.length - 1][1] += 1.5;             // arêtes du haut adoucies
      if (gelee) o.push(h.chemin(pts, A.hachure('neige', 'aucun'), true));
      o.push(h.chemin(pts, gelee ? A.arete : bA, true));
    });
    // la lame dans la coupe, le manche au-dessus
    const xk = xc + 5;
    o.push(h.chemin([[xk - 2.2, T - 16], [xk + 2.2, T - 16], [xk + 0.4, B - 1], [xk - 0.4, B - 1]], bA, true));
    o.push(h.path(`M${xk - 5} ${T - 16} L${xk - 5.5} ${T - 50} Q${xk} ${T - 56} ${xk + 5.5} ${T - 50} L${xk + 5} ${T - 16} Z`, bA));
    o.push(h.cercle(xk, T - 26, 1.3, A.plein), h.cercle(xk, T - 42, 1.3, A.plein));
    return { svg: o.join('\n'), B, T, xc, yb };
  };
  const plat = [0, 0, 0, 0], ep = 9;
  const trGelee = [170, 186, 202, 218].map(x => [x, plat, [ep, ep, ep, ep]]);
  const trMolle = [
    [170, [0, 0, -1, -1], [4, 7, 11, 15]],
    [192, [0, 0, 1, 1], [14, 11, 7, 4]],
    [214, [0, 0, -1, -1], [5, 5, 10, 14]],
    [236, [0, 0, 0, 0], [12, 8, 8, 4]],
  ];
  const optGelee = { haut: 74, gonfle: 0, C: [0, 0, 0, 0], tr: trGelee, gelee: true };
  const optMolle = { haut: 60, gonfle: 5, C: [0, -2, -4, -6], tr: trMolle, gelee: false };

  // ── la broche ────────────────────────────────────────────────────────────────────────
  const W = 24, NB = 10;
  const pasB = z => (z.l - 140) / (NB - 1);
  const xB = (z, i) => 70 + i * pasB(z);
  const L1 = [78, 86, 72, 90, 82, 76, 88, 80, 74, 84], L2 = [12, 9, 15, 10, 13, 8, 14, 11, 16, 9];
  const gaps = [1, 5, 8];                                            // où l'air passe, fléché
  const echB = z => Math.min(1, (z.h - W - 10) / 106);
  const lanierePendue = (x, l1, l2, k, e) => {
    const w = 18, a = x - w / 2, b = x + w / 2, y1 = W + l1 * e, y2 = W + (l1 + l2) * e, s = j(k, 1) * 3;
    const derriere = h.chemin([[a + 1, y1 - 4], [b - 1, y1 - 4], [b - 1 + j(k, 2), y2 + s * 0.5], [a + 1 + j(k, 3), y2 - s * 0.5]], bA, true);
    const devant = h.path(`M${r1(a)} ${W + 4} Q${r1(a)} ${W - 5} ${r1(x)} ${W - 5} Q${r1(b)} ${W - 5} ${r1(b)} ${W + 4}`
      + ` L${r1(b + j(k, 4) * 0.8)} ${r1(y1 + s)} L${r1(a + j(k, 5) * 0.8)} ${r1(y1 - s)} Z`, bA);
    const fibre = h.ligne(x - 3 + j(k, 6), W + 8, x - 2 + j(k, 7), y1 - 10, A.fin);
    return [derriere, devant, fibre].join('\n');
  };

  // ── la lanière pliée en deux ────────────────────────────────────────────────────────
  const R = 22, t = 8;
  const pli = z => ({ cx: z.l - 48, cy: z.h / 2 + 4 });
  const fentes = [-58, -30, -2, 27, 55];
  const pointArc = (cx, cy, r, deg) => [cx + r * Math.cos(deg * Math.PI / 180), cy + r * Math.sin(deg * Math.PI / 180)];

  // ── la lanière fendue, vue en bout ─────────────────────────────────────────────────
  const SW = 72, ST = 16, DX = 72, DY = -84;
  const fendue = (z, scellee) => {
    const x1 = 16, x2 = x1 + SW, Y0 = z.h - 34, o = [];
    // bord long ondulé, du bout coupé (v = 0) au bout du fond (v = 1)
    const bord = (x, k) => [0.2, 0.4, 0.6, 0.8].map((v, i) => [x + DX * v + j(k, i) * 1.8, Y0 + DY * v + j(k, i + 4) * 0.8]);
    const fond = [[x1 + DX, Y0 + DY], [x1 + DX + SW * 0.35, Y0 + DY - 1.5], [x1 + DX + SW * 0.7, Y0 + DY + 1], [x2 + DX, Y0 + DY]];
    const g = bord(x1, 1), d = bord(x2, 2);
    o.push(h.chemin([[x1, Y0], ...g, ...fond, ...d.slice().reverse(), [x2, Y0]], bA, true));      // dessus
    const dBas = d.map(([x, y]) => [x, y + ST]);
    o.push(h.chemin([[x2, Y0], ...d, [x2 + DX, Y0 + DY], [x2 + DX + 0.6, Y0 + DY + ST * 0.6], ...dBas.slice().reverse().map(([x, y], i) => [x, y + (i % 2) * 0.8]), [x2, Y0 + ST]], bA, true)); // flanc
    o.push(h.rect(x1, Y0, SW, ST, bC));                                                         // la tranche fendue
    if (scellee) {
      o.push(h.path(`M${x1 + 3} ${Y0 + 3} L${x2 - 3} ${Y0 + 3} L${x2 - 3} ${Y0 + ST - 3} L${x1 + 3} ${Y0 + ST - 3} Z`, A.detail));
      const cy = Y0 + ST / 2;
      const tache = `M${x1 + 8} ${cy} Q${x1 + 9} ${cy - 3.6} ${x1 + 26} ${cy - 3.8} Q${x1 + 46} ${cy - 4.2} ${x2 - 11} ${cy - 3.2}`
        + ` Q${x2 - 6} ${cy} ${x2 - 11} ${cy + 3.4} Q${x1 + 42} ${cy + 4.2} ${x1 + 23} ${cy + 3.8} Q${x1 + 9} ${cy + 3.3} ${x1 + 8} ${cy} Z`;
      o.push(h.path(tache, A.hachure('eau', 'detail')), h.path(tache, A.detail));
    }
    return { svg: o.join('\n'), x1, x2, Y0 };
  };

  return {
    ref: '71-40',
    titre: 'Les lanières : trancher, étendre, éprouver',
    desc: 'En haut, deux vignettes cadrées pareil : une pièce parée posée sur une planche, la lame dans la coupe et quatre tranches debout à côté. À gauche, la pièce raffermie à demi gelée donne des tranches toutes égales, de 6 mm ou moins ; à droite, la pièce molle se tranche en escalier, chaque tranche épaisse d’un bout et mince de l’autre. Au milieu, une rangée de lanières pliées sur une broche tendue entre deux montants, espacées, et l’air qui monte entre elles. En bas, la lanière témoin refroidie et pliée en deux, qui craque sur le dos du pli sans se casser ; puis deux lanières fendues vues en bout : la sèche, pareille d’un bord à l’autre, et celle séchée trop chaud, croûte dure autour d’un centre encore humide.',
    format: 'pleine',
    disposition: [['gelee', 'molle'], ['broche'], ['pli', 'seche', 'scellee']],
    hauteurs: [1.25, 0.95, 0.95],
    largeurs: [[1, 1], [1], [1.1, 1, 1]],
    vues: {
      gelee: {
        titre: 'Pièce à demi gelée',
        dessin: z => {
          const r = trancher(z, optGelee);
          const x = trGelee[3][0];
          return [r.svg, h.cote(x, r.T - 6, x + ep, r.T - 6, '6 mm ou moins')].join('\n');
        },
        renvois: z => {
          const B = z.h - 24, T = B - optGelee.haut;
          return [
            { n: 1, rond: [30, T - 26], cible: [62, T + 22], texte: 'pièce parée, à demi gelée' },
            { n: 2, rond: [z.l - 22, B - 52], cible: [trGelee[3][0] + ep - 1, B - 40], texte: 'tranches toutes égales' },
          ];
        },
      },
      molle: {
        titre: 'Pièce molle',
        dessin: z => trancher(z, optMolle).svg,
        renvois: z => {
          const B = z.h - 24, T = B - optGelee.haut;
          const hb = (B - (B - optMolle.haut + 6)) / 4, y = B - optMolle.haut + 6 + hb * 1.5;
          return [
            { n: 3, rond: [z.l - 22, T - 4], cible: [trMolle[3][0] + 9, B - optMolle.haut + 6 + hb * 0.6], texte: 'tranches en escalier' },
          ];
        },
      },
      broche: {
        titre: 'Étendre',
        dessin: z => {
          const o = [], e = echB(z);
          o.push(h.rect(4, 4, 14, z.h - 8, A.hachure('bois', 'fin')), h.rect(4, 4, 14, z.h - 8, A.arete));
          o.push(h.rect(z.l - 18, 4, 14, z.h - 8, A.hachure('bois', 'fin')), h.rect(z.l - 18, 4, 14, z.h - 8, A.arete));
          o.push(h.ligne(18, W, 26, W, A.detail), h.ligne(z.l - 26, W, z.l - 18, W, A.detail));
          o.push(h.ligne(26, W, z.l - 26, W, A.arete));
          o.push(h.cercle(26, W, 2.2, A.plein), h.cercle(z.l - 26, W, 2.2, A.plein));
          for (let i = 0; i < NB; i++) o.push(lanierePendue(xB(z, i), L1[i], L2[i], i, e));
          gaps.forEach((g, k) => {
            const x = (xB(z, g) + xB(z, g + 1)) / 2;
            o.push(h.fleche(`M${r1(x)} ${z.h - 8} L${r1(x)} 6`, A.cache));
          });
          return o.join('\n');
        },
        renvois: z => {
          const e = echB(z), i5 = 3, xa = (xB(z, gaps[1]) + xB(z, gaps[1] + 1)) / 2;
          return [
            { n: 4, rond: [40, z.h - 40], cible: [50, W], texte: 'broche tendue' },
            { n: 5, rond: [(xB(z, i5) + xB(z, i5 + 1)) / 2, z.h - 14], cible: [xB(z, i5) + 7, W + L1[i5] * e * 0.7], texte: 'lanières pliées, espacées' },
            { n: 6, rond: [(xB(z, gaps[1] + 1) + xB(z, gaps[1] + 2)) / 2, z.h - 14], cible: [xa, z.h * 0.62], texte: 'l’air passe entre elles' },
          ];
        },
      },
      pli: {
        titre: 'Sèche, pliée en deux',
        dessin: z => {
          const { cx, cy } = pli(z), g = 16, o = [];
          const d = `M${g} ${cy - R + j(1, 1)} L${cx} ${cy - R} A${R} ${R} 0 0 1 ${cx} ${cy + R} L${g + 3} ${cy + R + j(2, 1)}`
            + ` L${g + 3} ${cy + R - t} L${cx} ${cy + R - t} A${R - t} ${R - t} 0 0 0 ${cx} ${cy - R + t} L${g} ${cy - R + t} Z`;
          o.push(h.path(d, bC));
          fentes.forEach((a, k) => {
            const p = pointArc(cx, cy, R, a), q = pointArc(cx, cy, R - 4.2 - (k % 2) * 0.8, a);
            const tg = [-Math.sin(a * Math.PI / 180) * 1.7, Math.cos(a * Math.PI / 180) * 1.7];
            const m1 = [p[0] + tg[0], p[1] + tg[1]], m2 = [p[0] - tg[0], p[1] - tg[1]];
            o.push(h.chemin([[m1[0] + (p[0] - cx) * 0.06, m1[1] + (p[1] - cy) * 0.06], m1, q, m2, [m2[0] + (p[0] - cx) * 0.06, m2[1] + (p[1] - cy) * 0.06]], A.blanc, true));
            o.push(h.chemin([m1, q, m2], A.detail));
          });
          o.push(h.ligne(g + 10, cy - R + t / 2, cx - 20, cy - R + t / 2 + 0.6, A.fin), h.ligne(g + 14, cy + R - t / 2, cx - 26, cy + R - t / 2 - 0.5, A.fin));
          return o.join('\n');
        },
        renvois: z => {
          const { cx, cy } = pli(z), p = pointArc(cx, cy, R - 2, fentes[1]);
          return [
            { n: 7, rond: [30, cy - R - 26], cible: [52, cy - R + 1], texte: 'refroidie 5 min, pliée en deux' },
            { n: 8, rond: [z.l - 14, 16], cible: [p[0], p[1]], texte: 'craque sans casser en deux' },
          ];
        },
      },
      seche: {
        titre: 'Fendue : sèche',
        dessin: z => fendue(z, false).svg,
        renvois: z => {
          const { x1, Y0 } = fendue(z, false);
          return [{ n: 9, rond: [x1 + SW + 40, z.h - 12], cible: [x1 + SW * 0.6, Y0 + ST / 2], texte: 'aucune tache humide au centre' }];
        },
      },
      scellee: {
        titre: 'Fendue : séchée trop chaud',
        dessin: z => fendue(z, true).svg,
        renvois: z => {
          const { x1, Y0 } = fendue(z, true);
          return [
            { n: 10, rond: [14, Y0 - 34], cible: [x1 + 1.5, Y0 + 5], texte: 'croûte dure : surface scellée' },
            { n: 11, rond: [x1 + SW + 40, z.h - 12], cible: [x1 + SW * 0.6, Y0 + ST / 2], texte: 'centre humide : au séchoir' },
          ];
        },
      },
    },
    danger: 'Danger — sécher ne tue rien. Avant de sécher, les lanières bouillent cinq minutes dans leur marinade. Sinon, une fois sèches, dix minutes au four préchauffé à 135 °C. Le gibier va à 74 °C à cœur.',
  };
};
