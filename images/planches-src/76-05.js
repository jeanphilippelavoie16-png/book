// Planche 76-05 — Le bac de salage en coupe (ch. 71, procédure E, point 3, et variante « Le bac,
// la claie, le poids, sans rien d'acheté »). Aucune cote : le chapitre ne donne aucune dimension
// du bac ; l'échelle est portée par la truite elle-même.
// La charte : le bac du haut et sa pile portent le trait fort ; le bac du bas, secondaire, passe au
// trait moyen. L'intérieur des deux bacs, vu par la coupe, en gris loin : les pièces et le linge
// restent blancs devant. Pas de gris sur les parois hachurées. Le rouge : un trou du fond percé,
// le point qui décide (la saumure sort au lieu de baigner les pièces). Pas de geste.
module.exports = (h) => {
  // ── Bac du haut : boîte de bois, fond percé ──
  const B = { x0: 135, x1: 465, haut: 34, fond: 136, ep: 10 };  // extérieur ; fond = dessous de la planche
  const trous = [172, 240, 300, 360, 428];                         // trous du fond
  const lt = 5;                                                    // largeur d'un trou
  // ── Bac du bas : seconde boîte, saumure au fond ──
  const S = { x0: 95, x1: 505, rebord: 150, fond: 222, ep: 10, saumure: 200 };
  // ── Deux bâtons en travers, vus en bout ──
  const r = 7, batons = [205, 395];
  // ── Pile : deux paires de truites fendues, tête coupée d'un côté, queue de l'autre ──
  const X0 = 150, X1 = 450, Tmax = 16, sol = B.fond - B.ep;       // sol = dessus du fond
  const ep = u => Tmax * (1 - 0.9 * Math.pow(u, 1.3));             // épaisseur, de la tête (0) à la queue (1)
  const uA = x => (x - X0) / (X1 - X0);                            // paire du bas : tête à gauche
  const uB = x => (X1 - x) / (X1 - X0);                            // paire du haut : tête à droite
  const c = [
    x => sol,
    x => sol - ep(uA(x)),
    x => sol - 2 * ep(uA(x)),
    x => sol - 2 * ep(uA(x)) - ep(uB(x)),
    x => sol - 2 * ep(uA(x)) - 2 * ep(uB(x)),
  ];
  const N = 60, xs = Array.from({ length: N + 1 }, (_, i) => X0 + (X1 - X0) * i / N);
  const courbe = (f, dx = 0) => xs.map(x => [x, f(x) + dx]);
  // peau : dessous de la pièce 0, dessus de la 1, dessous de la 2, dessus de la 3
  const peau = [0, 2, 2, 4];

  const piece = i => {
    const bas = xs.map(x => [x, c[i](x)]);
    const haut = xs.map(x => [x, c[i + 1](x)]).reverse();
    return h.chemin(bas.concat(haut), h.a.blanc, true) + '\n' + h.chemin(bas.concat(haut), h.a.arete, true);
  };
  // la peau : une rangée d'écailles le long du bord extérieur de chaque pièce
  const doublurePeau = (i, T = (x, y) => [x, y]) => {
    const k = peau[i], s = k === i ? -1 : 1;                       // vers l'intérieur de la pièce
    const teteGauche = i < 2, pas = 5;
    let d = '';
    for (let x = X0 + 3; x + pas <= X1; x += pas) {
      if (c[i](x + pas) - c[i + 1](x + pas) < 10 || c[i](x) - c[i + 1](x) < 10) continue;
      const y1 = c[k](x) + s * 1.2, y2 = c[k](x + pas) + s * 1.2;
      const [xa0, ya0, xb0, yb0] = teteGauche ? [x, y1, x + pas, y2] : [x + pas, y2, x, y1];
      const [xa, ya] = T(xa0, ya0), [xb, yb] = T(xb0, yb0), [xm, ym] = T((xa0 + xb0) / 2, (ya0 + yb0) / 2 + s * 3.2);
      d += `M ${xa} ${ya} Q ${xm} ${ym} ${xb} ${yb} `;
    }
    return d ? h.path(d, h.a.detail) : '';
  };
  // la chair : les feuillets en chevron, pointés vers la tête
  const chevrons = (i, T = (x, y) => [x, y], pasC = 15) => {
    const teteGauche = i < 2, out = [];
    for (let k = 0; ; k++) {
      const x = teteGauche ? X0 + 14 + pasC * k : X1 - 14 - pasC * k;
      if (x < X0 || x > X1) break;
      const b = c[i](x), t = c[i + 1](x);
      if (b - t < 10) break;
      const bb = b - (peau[i] === i ? 5 : 1.2), tt = t + (peau[i] === i + 1 ? 5 : 1.2);
      const ax = teteGauche ? x - 2 * pasC / 3 : x + 2 * pasC / 3;
      out.push(h.chemin([T(x, bb), T(ax, (bb + tt) / 2), T(x, tt)], h.a.detail));
    }
    return out.join('\n');
  };

  // faces : la peau en trait épais, la chair en trait moyen
  const faces = T => [
    ...[1, 3].map(k => h.chemin(xs.map(x => T(x, c[k](x), k)), h.a.arete)),
    ...[0, 2, 4].map(k => h.chemin(xs.map(x => T(x, c[k](x), k)), h.a.contour)),
  ];

  // ── Vue éclatée de la pile, coin bas droit ──
  const E = { x: 418, y: 364, k: 0.52, g: 15 };     // origine (tête, sol), échelle en long, écart
  const ecl = i => (x, y) => [E.x + (x - X0) * E.k, E.y + (y - sol) - E.g * i];
  const pieceE = i => {
    const T = ecl(i);
    const bas = xs.map(x => T(x, c[i](x))), haut = xs.map(x => T(x, c[i + 1](x))).reverse();
    const kp = peau[i], kc = kp === i ? i + 1 : i;
    return [
      h.chemin(bas.concat(haut), h.a.blanc, true),
      h.chemin(xs.map(x => T(x, c[kc](x))), h.a.arete),
      h.chemin(xs.map(x => T(x, c[kp](x))), h.a.contour),
      h.chemin([T(i < 2 ? X0 : X1, c[i](i < 2 ? X0 : X1)), T(i < 2 ? X0 : X1, c[i + 1](i < 2 ? X0 : X1))], h.a.arete),
      doublurePeau(i, T),
      chevrons(i, T, 24),
    ].join('\n');
  };
  // flèches de serrage : à la tête de chaque paire, l'une descend, l'autre monte
  const serre = p => {
    const xa = p === 0 ? X0 + 40 : X1 - 40;
    const yi = ecl(2 * p)(xa, c[2 * p + 1](xa))[1] - E.g / 2;   // milieu de l'écart
    const [x] = ecl(0)(xa, 0), dx = 0;
    return [
      h.fleche(`M ${x - 5} ${yi - 6} L ${x - 5} ${yi + 1}`),
      h.fleche(`M ${x + 5} ${yi + 6} L ${x + 5} ${yi - 1}`),
    ];
  };

  const xr3 = X0 + 90, xr5 = X1 - 50;
  const P3 = [392, 336, ...ecl(0)(xr3, c[1](xr3) - E.g / 2)];
  const P5 = [600, 262, ...ecl(3)(xr5, c[4](xr5))];
  const goutte = (x, y) => h.path(
    `M ${x} ${y - 4.2} C ${x + 2.7} ${y - 0.6} ${x + 2.7} ${y + 2.7} ${x} ${y + 2.7} ` +
    `C ${x - 2.7} ${y + 2.7} ${x - 2.7} ${y - 0.6} ${x} ${y - 4.2} Z`, h.a.plein);

  // segments du fond percé
  const segs = [];
  let a = B.x0 + B.ep;
  for (const t of trous) { segs.push([a, t - lt / 2]); a = t + lt / 2; }
  segs.push([a, B.x1 - B.ep]);

  // pierre plate et linge, posés sur la pile
  // le linge épouse la pile ; la pierre, dedans, la presse
  const dessus = 58;
  const suit = (g, d, dy) => xs.filter(x => x < d && x > g).reverse().map(x => `L ${x} ${c[4](x) + dy}`).join(' ');
  const linge = `M 238 ${c[4](238)} C 232 ${c[4](238) - 14} 238 ${dessus + 1.5} 262 ${dessus} L 338 ${dessus} ` +
    `C 362 ${dessus + 1.5} 368 ${c[4](362) - 14} 362 ${c[4](362)} ${suit(238, 362, 0)} Z`;
  const pierre = `M 244 ${c[4](244) - 3.5} C 239 ${c[4](244) - 13} 245 ${dessus + 5} 266 ${dessus + 4} ` +
    `L 290 ${dessus + 5.5} L 334 ${dessus + 4} C 354 ${dessus + 5} 361 ${c[4](356) - 13} 356 ${c[4](356) - 3.5} ` +
    `${suit(244, 356, -3.5)} Z`;
  const noeud = [
    h.path(`M 294 ${dessus} C 286 ${dessus - 3} 283 ${dessus - 6} 285 ${dessus - 8.5} C 290 ${dessus - 6.5} 294 ${dessus - 4} 296.5 ${dessus - 1.5}`, h.a.arete),
    h.path(`M 306 ${dessus} C 314 ${dessus - 3} 317 ${dessus - 6} 315 ${dessus - 8.5} C 310 ${dessus - 6.5} 306 ${dessus - 4} 303.5 ${dessus - 1.5}`, h.a.arete),
    h.ellipse(300, dessus - 1, 5, 3, h.a.blanc),
    h.ellipse(300, dessus - 1, 5, 3, h.a.arete),
  ];

  return {
    ref: '76-05',
    titre: 'Le bac de salage à sec',
    desc: 'Coupe en long d\'une boîte de bois au fond percé, posée sur deux bâtons en travers d\'une seconde boîte. Dedans, deux paires de truites fendues, empilées chair contre chair, peau en dehors, pressées par une pierre plate enveloppée d\'un linge. Sous le fond percé, un vide où la saumure tombe goutte à goutte dans la boîte du dessous, sans jamais remonter aux pièces.',
    format: 'demi',
    vues: {
      coupe: {
        dessin: z => [
          // l'intérieur des bacs, vu par la coupe : le fond de la boîte, derrière
          h.rect(S.x0 + S.ep, S.rebord, S.x1 - S.x0 - 2 * S.ep, S.saumure - S.rebord, h.a.loin),
          h.rect(B.x0 + B.ep, B.haut, B.x1 - B.x0 - 2 * B.ep, B.fond - B.ep - B.haut, h.a.loin),
          // bac du bas
          h.rect(S.x0, S.rebord, S.ep, S.fond - S.rebord, h.a.hachure('bois')),
          h.rect(S.x1 - S.ep, S.rebord, S.ep, S.fond - S.rebord, h.a.hachure('bois')),
          h.rect(S.x0 + S.ep, S.fond - S.ep, S.x1 - S.x0 - 2 * S.ep, S.ep, h.a.hachure('bois')),
          h.rect(S.x0 + S.ep, S.saumure, S.x1 - S.x0 - 2 * S.ep, S.fond - S.ep - S.saumure, h.a.hachure('eau')),
          h.ligne(S.x0 + S.ep, S.rebord, S.x1 - S.ep, S.rebord, h.a.arete),        // rebord du fond, derrière
          h.chemin([[S.x0, S.rebord], [S.x0, S.fond], [S.x1, S.fond], [S.x1, S.rebord]], h.a.arete),
          // les deux bâtons, en bout
          ...batons.flatMap(x => [
            h.cercle(x, S.rebord - r, r, h.a.blanc),
            h.cercle(x, S.rebord - r, r, h.a.arete),
            h.cercle(x, S.rebord - r, 3.2, h.a.detail),
            h.cercle(x, S.rebord - r, 0.9, h.a.plein),
          ]),
          // bac du haut
          h.rect(B.x0, B.haut, B.ep, B.fond - B.haut, h.a.hachure('bois')),
          h.rect(B.x1 - B.ep, B.haut, B.ep, B.fond - B.haut, h.a.hachure('bois')),
          ...segs.map(([x1, x2]) => h.rect(x1, B.fond - B.ep, x2 - x1, B.ep, h.a.hachure('bois'))),
          h.ligne(B.x0 + B.ep, B.haut, B.x1 - B.ep, B.haut, h.a.arete),            // rebord du fond, derrière
          h.chemin([[B.x0, B.haut], [B.x0, B.fond], [segs[0][1], B.fond]], h.a.contour),
          ...segs.slice(1, -1).map(([x1, x2]) => h.ligne(x1, B.fond, x2, B.fond, h.a.contour)),
          h.chemin([[segs[segs.length - 1][0], B.fond], [B.x1, B.fond], [B.x1, B.haut]], h.a.contour),
          // la pile
          ...[0, 1, 2, 3].map(piece),
          ...[0, 1, 2, 3].map(i => doublurePeau(i)),
          ...[0, 1, 2, 3].map(i => chevrons(i)),
          ...faces((x, y) => [x, y]),
          // le poids
          h.path(linge, h.a.blanc),
          h.path(linge, h.a.arete),
          h.path(pierre, h.a.hachure('pierre')),
          ...noeud,
          // la saumure qui tombe
          goutte(172, 141), goutte(172, 176),
          goutte(240, 162), goutte(240, 190),
          goutte(300, 141), goutte(300, 172),
          goutte(360, 156), goutte(360, 186),
          goutte(428, 141), goutte(428, 178),
          // le point qui décide : la saumure sort par le fond, elle ne baigne pas les pièces
          h.controle(trous[2], B.fond - B.ep / 2, 13),
          // la pile éclatée
          ...[0, 1, 2, 3].map(pieceE),
          ...serre(0), ...serre(1),
          ...[[3, P3], [5, P5]].flatMap(([n, [px, py, tx, ty]]) => [
            h.ligne(px, py, tx, ty, 'fill="none" stroke="#000" stroke-width="0.5" stroke-dasharray="3 2.5"'),
            h.cercle(tx, ty, 1.8, h.a.plein),
            h.cercle(px, py, 9, h.a.blanc), h.cercle(px, py, 9, 'fill="none" stroke="#000" stroke-width="1.4"'),
            h.texte(px, py + 4, String(n), { ancre: 'middle', corps: 12 }),
          ]),
        ].join('\n'),
        renvois: z => [
          { n: 1, rond: [44, 96], cible: [B.x0, 96], texte: 'bac non métallique, fond percé' },
          { n: 2, rond: [560, 148], cible: [batons[1] + 4.9, S.rebord - r + 5], texte: 'deux bâtons sur un second bac' },
          { n: 3, rond: [560, 108], cible: [X1 + 0.5, c[3](X1)], texte: 'pièces empilées chair contre chair' },
          { n: 4, rond: [326, 13], cible: [326, dessus - 0.8], texte: 'pierre plate enveloppée d’un linge' },
          { n: 5, rond: [410, 13], cible: [410, c[4](410) - 0.5], texte: 'peau vers l’extérieur' },
          { n: 6, rond: [560, 180], cible: [430.8, 178], texte: 'le vide où tombe la saumure' },
        ],
      },
    },
  };
};
