// 51-08 — L'assommoir et sa gâchette à trois bâtons (le « 4 »).
// Toute la géométrie vit dans un seul repère (y vers le bas, sol à y = 100) : le montant
// debout, la traverse à 35° posée par son entaille sur le biseau du montant, la languette
// à l'horizontale, croisée devant le montant, qui retient le pied de la traverse dans son
// encoche. La pierre repose sur le bout haut de la traverse. Chaque vue recadre ce repère ;
// la vue des pièces les couche à plat par rotation dans le plan (la face vue reste la même).

module.exports = (h) => {
  const RAD = Math.PI / 180;
  const K = Math.tan(35 * RAD), CS = Math.cos(35 * RAD), SN = Math.sin(35 * RAD);
  const NV = [-SN, -CS];                 // normale de la traverse, côté haut
  const W = 5, RM = 2.6, SOL = 100;      // épaisseur des bâtons, demi-largeur du montant
  const APEX = [0, 40], BIS = 44, PB = (BIS - APEX[1]) / RM;
  const Y0 = 41.4;                       // bord bas de la traverse au droit du montant
  const yBas = x => Y0 - K * x;
  const xBas = y => (Y0 - y) / K;
  const LT = 67.5, LB = 72.5, LM = 70, ND = 2;   // languette : dessus, dessous, axe, encoche
  const xl = xBas(LT + ND), xr = xBas(LT);
  const XE = 13.1;                       // bout haut de la traverse
  const add = (p, v, k = 1) => [p[0] + v[0] * k, p[1] + v[1] * k];

  // ─── les trois bâtons, assemblés ──────────────────────────────────────────────────
  const montant = (bas = SOL) => [[-RM, bas], [-RM, BIS], APEX, [RM, BIS], [RM, bas]];
  const eg = (Y0 - APEX[1]) / (K - PB), ed = (Y0 - APEX[1]) / (PB + K);
  const pE = [XE, yBas(XE)], pE2 = add(pE, NV, W);
  const yHaut = x => yBas(x - NV[0] * W) + NV[1] * W;
  const traverse = [[xl, LT + ND], [eg, yBas(eg)], APEX, [ed, yBas(ed)], pE, pE2, [xl, yHaut(xl)]];
  const XG = -45, XQ = 58, XP = 64;
  const languette = [[XG, LT], [xl, LT], [xl, LT + ND], [xr, LT + ND], [xr, LT],
    [XQ, LT], [XP, LM], [XQ, LB], [XG, LB]];
  const appat = [];
  for (let i = 0; i < 30; i++) {
    const a = i / 30 * 2 * Math.PI, r = 1 + 0.09 * Math.sin(3 * a + 1) + 0.05 * Math.cos(5 * a);
    appat.push([57.3 + 4.8 * r * Math.cos(a), LM + 4.3 * r * Math.sin(a)]);
  }

  // ─── la pierre, appuyée sur le bout de la traverse, l'autre bord au sol ─────────────
  const PP = 0.6, dn = Math.hypot(1, PP), DP = [1 / dn, PP / dn], MP = [PP / dn, -1 / dn];
  const ySous = x => pE2[1] + (x - pE2[0]) * PP;
  const xLoin = pE2[0] + (SOL - pE2[1]) / PP;
  const U0 = [3, ySous(3)], LP = Math.hypot(xLoin - U0[0], SOL - U0[1]), EP = 15;
  const loc = (s, t) => [U0[0] + DP[0] * s + MP[0] * t, U0[1] + DP[1] * s + MP[1] * t];
  const pierre = [loc(1.2, 0), loc(LP - 1.5, 0), loc(LP - 0.2, 2), loc(LP + 0.3, 6), loc(LP - 0.6, 11), loc(LP - 3.5, 14.2)];
  for (let i = 0; i <= 30; i++) {
    const s = LP - 7 - i * (LP - 13) / 30;
    pierre.push(loc(s, EP + 2.2 * Math.sin(Math.PI * s / LP) + 0.6 * Math.sin(s * 0.33) + 0.35 * Math.sin(s * 1.1)));
  }
  pierre.push(loc(3.8, 15.4), loc(1.2, 13.4), loc(-0.3, 9), loc(0.2, 3.5));

  // ─── outils ───────────────────────────────────────────────────────────────────────
  const cadre = (z, bb) => {
    const s = Math.min(z.l / (bb[2] - bb[0]), z.h / (bb[3] - bb[1]));
    const ox = z.l / 2 - s * (bb[0] + bb[2]) / 2, oy = z.h / 2 - s * (bb[1] + bb[3]) / 2;
    const T = ([x, y]) => [ox + s * x, oy + s * y];
    return { s, T, P: pts => pts.map(T) };
  };
  const seg = (P, a, b, attrs) => h.chemin(P([a, b]), attrs);
  const fleche = (P, a, b) => { const [p, q] = P([a, b]); return h.fleche(`M${p[0].toFixed(1)},${p[1].toFixed(1)} L${q[0].toFixed(1)},${q[1].toFixed(1)}`); };
  // la flèche rouge du geste : la traction vers le bas qui fait tout lâcher
  const geste = (P, a, b) => { const [p, q] = P([a, b]); return h.geste(`M${p[0].toFixed(1)},${p[1].toFixed(1)} L${q[0].toFixed(1)},${q[1].toFixed(1)}`); };
  const plein = (P, pts, trait, fond = h.a.blanc) => [h.chemin(P(pts), fond, true), h.chemin(P(pts), trait, true)];
  // découpe d'un polygone par un demi-plan f(p) <= 0
  const coupe = (poly, f) => {
    const out = [];
    for (let i = 0; i < poly.length; i++) {
      const a = poly[i], b = poly[(i + 1) % poly.length], fa = f(a), fb = f(b);
      if (fa <= 0) out.push(a);
      if ((fa < 0 && fb > 0) || (fa > 0 && fb < 0)) {
        const t = fa / (fa - fb);
        out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
      }
    }
    return out;
  };
  const brisure = (a, b, amp) => {
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]), t = [(b[0] - a[0]) / L, (b[1] - a[1]) / L];
    const nn = [-t[1], t[0]], m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    return [add(a, t, -amp * 0.5), add(m, t, -amp * 0.7), add(add(m, nn, amp), t, -amp * 0.2),
      add(add(m, nn, -amp), t, amp * 0.2), add(m, t, amp * 0.7), add(b, t, amp * 0.5)];
  };
  // polygone découpé : fond, bords sauf la coupe, trait de brisure sur la coupe
  const coupeDessin = (P, poly, f, trait, fond = h.a.blanc, amp = 1.2) => {
    const c = coupe(poly, f), n = c.length, sur = p => Math.abs(f(p)) < 1e-6;
    const coupee = i => sur(c[i]) && sur(c[(i + 1) % n]);
    const lignes = [], br = [];
    let k = 0; while (k < n && !coupee(k)) k++;
    let cur = null;
    for (let j = 1; j <= n; j++) {
      const i = (k + j) % n;
      if (coupee(i)) { if (cur) { lignes.push(cur); cur = null; } br.push(brisure(c[i], c[(i + 1) % n], amp)); }
      else { if (!cur) cur = [c[i]]; cur.push(c[(i + 1) % n]); }
    }
    if (cur) lignes.push(cur);
    return [h.chemin(P(c), fond, true), ...lignes.map(l => h.chemin(P(l), trait)),
      ...br.map(l => h.chemin(P(l), h.a.detail))];
  };
  const sol = (P, x1, x2) => [
    h.chemin(P([[x1, SOL], [x2, SOL], [x2, SOL + 5], [x1, SOL + 5]]), h.a.hachure('terre', 'aucun'), true),
    seg(P, [x1, SOL], [x2, SOL], h.a.arete),
  ];
  const piquet = (c, haut) => [[c - 2.2, SOL], [c - 2.2, haut + 1], [c - 0.9, haut], [c + 0.7, haut + 0.7], [c + 2.2, haut + 0.3], [c + 2.2, SOL]];

  // ─── les pièces couchées à plat ─────────────────────────────────────────────────────
  const Y1 = 0, Y2 = 15, Y3 = 30;
  const pMontant = montant(104).map(([x, y]) => [104 - y, Y1 + x]);
  const rot = ([x, y]) => [x * CS - y * SN, x * SN + y * CS];
  const tr0 = traverse.map(rot);
  const tdx = -Math.min(...tr0.map(p => p[0])), tdy = Y2 - (tr0[0][1] - W / 2);
  const pTraverse = tr0.map(([x, y]) => [x + tdx, y + tdy]);
  const pV = pTraverse[2];                // l'entaille, au fond
  const pPied = pTraverse[0];
  const pLanguette = languette.map(([x, y]) => [x - XG, y - LM + Y3]);

  const BB_A = [-52, 2, 140, 108];
  const BB_B = [-48, 20, 20, 90];
  const BB_C = [-4, -13, 112, 41];
  const BB_D = [-64, 6, 64, 106];

  return {
    ref: '55-08',
    titre: 'L’assommoir et sa gâchette à trois bâtons',
    desc: 'Quatre vues. L’assommoir armé, de côté : une pierre plate appuyée d’un bord sur le bout de la traverse, l’autre bord au sol, un tuteur planté contre elle du côté du bout qui tombe, l’appât piqué au bout de la languette sous la pierre. La gâchette tendue en gros plan : le biseau du montant dans l’entaille de la traverse, le bout haut de la traverse sous la pierre, son pied équarri dans l’encoche de la languette, la languette croisée devant le montant, méplat sur méplat, et la traction vers le bas qui fait tout lâcher. Les trois bâtons couchés à plat, avec chaque coupe. De face, la pierre tombée à plat entre deux tuteurs, sa position armée en tireté. Encadré danger : la masse trop légère.',
    format: 'pleine',
    disposition: [['arme', 'gachette'], ['pieces', 'face']],
    hauteurs: [1.4, 1],
    largeurs: [[1.6, 1], [1.6, 1]],
    vues: {
      arme: {
        titre: 'Armé, de côté',
        dessin: z => {
          const { P } = cadre(z, BB_A);
          return [
            ...sol(P, -52, 140),
            // le tuteur du fond, derrière la masse : il recule en gris
            ...plein(P, piquet(40, 8), h.a.arete, h.a.loin),
            h.chemin(P(pierre), h.a.blanc, true),
            h.chemin(P(pierre), h.a.hachure('pierre', 'contour'), true),
            ...plein(P, montant(), h.a.contour),
            ...plein(P, traverse, h.a.contour),
            ...plein(P, languette, h.a.contour),
            ...plein(P, appat, h.a.arete),
            // le tuteur guide le bout qui tombe, pas celui qui pivote au sol
            ...plein(P, piquet(30, 4), h.a.arete),
          ].join('\n');
        },
        renvois: z => {
          const { T } = cadre(z, BB_A);
          return [
            { n: 1, rond: T([66, 14]), cible: T([72, 55]), texte: 'masse : tue du premier coup' },
            { n: 2, rond: T([82, 90]), cible: T([59, 73]), texte: 'appât sous la masse' },
            { n: 3, rond: T([12, -7]), cible: T([27.8, 9]), texte: 'tuteur, un de chaque côté' },
          ];
        },
      },
      gachette: {
        titre: 'La gâchette tendue',
        dessin: z => {
          const { P } = cadre(z, BB_B);
          const fx = p => p[0] - 17, fy = p => p[1] - 84;
          return [
            // la pierre n'est pas le sujet de cette vue : elle recule, trait fin sur gris clair
            h.chemin(P(coupe(pierre, fx)), h.a.loin, true),
            ...coupeDessin(P, pierre, fx, h.a.arete, h.a.hachure('pierre', 'aucun'), 2),
            ...coupeDessin(P, montant(), fy, h.a.contour),
            ...plein(P, traverse, h.a.contour),
            ...coupeDessin(P, languette, fx, h.a.contour),
            geste(P, [11.5, 74.5], [11.5, 84]),
            // le point qui décide : les méplats croisés, ajustés pour tenir tout juste
            (() => { const [c] = P([[0, LM]]); return h.controle(c[0], c[1], 15); })(),
          ].join('\n');
        },
        renvois: z => {
          const { T } = cadre(z, BB_B);
          return [
            { n: 4, rond: T([-17, 30]), cible: T([0, 41.2]), texte: 'biseau dans l’entaille' },
            { n: 5, rond: T([13, 46]), cible: T([9.6, 29.8]), texte: 'la traverse porte la masse' },
            { n: 6, rond: T([-43, 81]), cible: T([-39.3, 69]), texte: 'le pied bute dans l’encoche' },
            { n: 7, rond: T([-14, 81]), cible: T([1, 71]), texte: 'méplats ajustés tout juste' },
            { n: 8, rond: T([15, 89]), cible: T([12, 80]), texte: 'tiré vers le bas, tout lâche' },
          ];
        },
      },
      pieces: {
        titre: 'Les trois bâtons, à plat',
        dessin: z => {
          const { P } = cadre(z, BB_C);
          return [
            ...plein(P, pMontant, h.a.contour),
            h.chemin(P([[104 - LB, Y1 - RM], [104 - LT, Y1 - RM], [104 - LT, Y1 + RM], [104 - LB, Y1 + RM]]), h.a.hachure('bois', 'aucun'), true),
            seg(P, [104 - LB, Y1 - RM], [104 - LB, Y1 + RM], h.a.arete),
            seg(P, [104 - LT, Y1 - RM], [104 - LT, Y1 + RM], h.a.arete),
            ...plein(P, pTraverse, h.a.contour),
            ...plein(P, pLanguette, h.a.contour),
            seg(P, [-RM - XG, Y3 - W / 2], [-RM - XG, Y3 + W / 2], h.a.cache),
            seg(P, [RM - XG, Y3 - W / 2], [RM - XG, Y3 + W / 2], h.a.cache),
          ].join('\n');
        },
        renvois: z => {
          const { T } = cadre(z, BB_C);
          return [
            { n: 9, rond: T([73, Y1]), cible: T([63.4, Y1]), texte: 'montant : biseau et méplat' },
            { n: 10, rond: T([pV[0] + 6, Y2 + 8.5]), cible: T([pV[0], pV[1] + 0.6]), texte: 'traverse : entaille en haut' },
            { n: 11, rond: T([xl - XG + 1, Y3 + 9.5]), cible: T([xl - XG + 1.2, Y3 - 1.8]), texte: 'languette : encoche, méplat' },
            { n: 12, rond: T([80, Y3 + 9.5]), cible: T([80, Y3 + 1.8]), texte: 'bois vert' },
          ];
        },
      },
      face: {
        titre: 'Déclenché, de face',
        dessin: z => {
          const { P } = cadre(z, BB_D);
          const dalle = [[-47, SOL - 0.4], [47, SOL - 0.4], [48.4, 97.5], [48, 92.5], [46.5, 89.6]];
          for (let i = 0; i <= 16; i++) {
            const x = 44 - i * 88 / 16;
            dalle.push([x, 89 - 0.8 * Math.sin(Math.PI * (x + 44) / 88) - 0.25 * Math.sin(x * 0.5)]);
          }
          dalle.push([-46.8, 89.8], [-48.3, 93], [-48.4, 97]);
          return [
            ...sol(P, -64, 64),
            h.chemin(P([[-48, 25.6], [-48, 15.4], [48, 15.4], [48, 25.6], [-48, 25.6]]), h.a.cache),
            seg(P, [-48, 25.6], [-48, 88], h.a.cache),
            seg(P, [48, 25.6], [48, 88], h.a.cache),
            fleche(P, [-24, 31], [-24, 83]),
            fleche(P, [24, 31], [24, 83]),
            h.chemin(P(dalle), h.a.hachure('pierre', 'contour'), true),
            ...plein(P, piquet(-51, 10), h.a.arete),
            ...plein(P, piquet(51, 10), h.a.arete),
            // l'appât écrasé qui déborde sous le bord de la dalle
            ...plein(P, [[-9, SOL], [-8, 97.6], [-4, 96.6], [1, 96.9], [6, 96.4], [9.5, 97.8], [10, SOL]], h.a.arete),
          ].join('\n');
        },
        renvois: z => {
          const { T } = cadre(z, BB_D);
          return [
            { n: 13, rond: T([-36, 58]), cible: T([-50.5, 68]), texte: 'un tuteur de chaque côté' },
            { n: 14, rond: T([0, 56]), cible: T([0, 91]), texte: 'la masse tombe d’aplomb' },
          ];
        },
      },
    },
    danger: 'Une masse trop légère estropie : la bête part avec la patte cassée, ou reste sur place et mord la main qui arrive.',
  };
};
