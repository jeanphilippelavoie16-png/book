// 16-08b — Ramoner sans brosse : les montages (ch. 16, « Ramoner sans brosse » et l'inspection
// au miroir ; ch. 15, « Le ramonage sans brosse »). Page a : les écouvillons et le manche.
// Le poêle, la buse et le tuyau sont les mêmes dans les deux vues du haut, à la même échelle.
// Aucune cote : le chapitre ne donne que « la buse et le premier mètre », dit dans la légende.

const f = v => Math.round(v * 10) / 10;
const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');

function rep(z, Wm, Hm, m = 6) {
  const s = Math.min((z.l - 2 * m) / Wm, (z.h - 2 * m) / Hm);
  const ox = (z.l - Wm * s) / 2, oy = (z.h - Hm * s) / 2;
  const P = (x, y) => [ox + x * s, oy + y * s];
  P.s = s;
  return P;
}
const pt = (P, x, y) => P(x, y).map(f).join(' ');
const trace = (P, cmds) => cmds.map(c => {
  const v = c.slice(1), o = [];
  for (let i = 0; i < v.length; i += 2) o.push(pt(P, v[i], v[i + 1]));
  return c[0] + (o.length ? ' ' + o.join(' ') : '');
}).join(' ');
const quad = (a, c, b, n = 12) => Array.from({ length: n + 1 }, (_, i) => {
  const t = i / n, u = 1 - t;
  return [u * u * a[0] + 2 * u * t * c[0] + t * t * b[0], u * u * a[1] + 2 * u * t * c[1] + t * t * b[1]];
});

// une bande d'épaisseur 2e le long d'une polyligne (perche, barre plate, miroir)
function bande(h, P, pts, e, at) {
  const g = [], d = [];
  for (let i = 0; i < pts.length; i++) {
    const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]), nx = -(b[1] - a[1]) / L, ny = (b[0] - a[0]) / L;
    g.push(P(pts[i][0] + nx * e, pts[i][1] + ny * e));
    d.push(P(pts[i][0] - nx * e, pts[i][1] - ny * e));
  }
  return h.chemin(g.concat(d.reverse()), at, true);
}
// une corde : deux traits fins et la torsion, segment par segment
function corde(h, P, pts, e = 2.1) {
  const o = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const [x1, y1] = pts[i], [x2, y2] = pts[i + 1];
    const L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L, nx = -uy * e, ny = ux * e;
    o.push(h.chemin([P(x1 + nx, y1 + ny), P(x2 + nx, y2 + ny), P(x2 - nx, y2 - ny), P(x1 - nx, y1 - ny)], h.a.blanc, true));
    o.push(h.ligne(...P(x1 + nx, y1 + ny), ...P(x2 + nx, y2 + ny), h.a.detail), h.ligne(...P(x1 - nx, y1 - ny), ...P(x2 - nx, y2 - ny), h.a.detail));
    const tw = [];
    for (let t = 1.5; t < L - 2.6; t += 4.2)
      tw.push(`M${pt(P, x1 + ux * t - nx, y1 + uy * t - ny)} L${pt(P, x1 + ux * (t + 2.6) + nx, y1 + uy * (t + 2.6) + ny)}`);
    if (tw.length) o.push(h.path(tw.join(' '), h.a.fin));
  }
  return o.join('\n');
}
// la croûte de créosote sur la paroi intérieure, de a à b, épaisseur ep vers l'intérieur (sens ±1)
function croute(h, P, a, b, ep, sens, graine = 0) {
  const n = Math.max(6, Math.round(Math.hypot(b[0] - a[0], b[1] - a[1]) / 4));
  const L = Math.hypot(b[0] - a[0], b[1] - a[1]), nx = -(b[1] - a[1]) / L * sens, ny = (b[0] - a[0]) / L * sens;
  const base = [], dessus = [];
  for (let i = 0; i <= n; i++) {
    const x = a[0] + (b[0] - a[0]) * i / n, y = a[1] + (b[1] - a[1]) * i / n;
    const k = ep * (0.55 + 0.45 * Math.abs(Math.sin(i * 1.9 + graine)));
    base.push(P(x, y)); dessus.push(P(x + nx * k, y + ny * k));
  }
  return h.chemin(base.concat(dessus.reverse()), h.a.plein, true);
}
const eclat = (h, P, x, y, r, a) => h.chemin([0, 1.9, 3.3, 4.6].map((t, i) => P(x + r * (i % 2 ? 0.6 : 1) * Math.cos(t + a), y + r * (i % 2 ? 0.6 : 1) * Math.sin(t + a))), h.a.plein, true);

module.exports = (h) => {
  // ─── le poêle en coupe, commun aux trois vues ───
  // x0 : devant du poêle (la porte), X : axe de la buse, sol : dessus du plancher
  const poele = (P, x0, X, haut, sol, porte, largeur = 110, corps = 72) => {
    const o = [];
    o.push(h.rect(...P(x0, haut), largeur * P.s, corps * P.s, blanc(h.a.contour)));
    o.push(h.rect(...P(x0 - 2, porte[0]), 4 * P.s, (porte[1] - porte[0]) * P.s, h.a.blanc));
    o.push(h.ligne(...P(x0 - 5, porte[0]), ...P(x0 + 2, porte[0]), h.a.arete), h.ligne(...P(x0 - 5, porte[1]), ...P(x0 + 2, porte[1]), h.a.arete));
    for (const lx of [x0 + 6, x0 + largeur - 12])
      o.push(h.rect(...P(lx, haut + corps), 6 * P.s, (sol - haut - corps) * P.s, blanc(h.a.arete)));
    o.push(h.rect(...P(X - 14, haut - 12), 28 * P.s, 12 * P.s, blanc(h.a.arete)));
    return o.join('\n');
  };
  const plancher = (P, x0, x1, sol) => h.rect(...P(x0, sol), (x1 - x0) * P.s, 9 * P.s, h.a.hachure('bois', 'arete'));
  const tuyau = (P, X, y0, y1) => [
    h.rect(...P(X - 12, y0), 24 * P.s, (y1 - y0) * P.s, h.a.blanc),
    h.ligne(...P(X - 12, y0), ...P(X - 12, y1), h.a.contour),
    h.ligne(...P(X + 12, y0), ...P(X + 12, y1), h.a.contour),
  ].join('\n');
  // le goupillon dans le tuyau, les brins couchés contre la paroi
  const goupillon = (P, X, y, oeilHaut = true) => {
    const o = [h.ligne(...P(X, y - 22), ...P(X, y + 34), h.a.contour)];
    if (oeilHaut) o.push(h.cercle(...P(X, y - 26), 4 * P.s, h.a.contour));
    o.push(h.cercle(...P(X, y + 38), 4 * P.s, h.a.contour));
    for (let i = 0; i < 4; i++) {
      const dx = 2 + i * 0.9;
      o.push(h.path(trace(P, [['M', X - dx, y + 2], ['L', X - dx, y - 7 + dx - i], ['Q', X - dx, y - 9 - i, X, y - 9 - i], ['Q', X + dx, y - 9 - i, X + dx, y - 7 + dx - i], ['L', X + dx, y + 2]]), h.a.detail));
    }
    o.push(h.rect(...P(X - 6.5, y - 5), 13 * P.s, 8 * P.s, h.a.blanc));
    for (let k = 0; k < 3; k++) o.push(h.path(trace(P, [['M', X - 6.5, y - 4.5 + k * 3], ['L', X + 6.5, y - 3 + k * 3]]), h.a.arete));
    for (let k = 0; k < 10; k++) {
      const s = k % 2 ? 1 : -1, j = Math.floor(k / 2);
      o.push(h.path(trace(P, [['M', X + s * 2.5, y + 3], ['Q', X + s * 6, y + 4 + j * 1.3, X + s * 11.3, y + 8 + j * 3.2]]), h.a.arete));
    }
    return o.join('\n');
  };

  return {
    ref: '82-08b',
    titre: 'Ramoner sans brosse : les montages',
    desc: 'Quatre montages. Par le haut, en coupe : le tuyau monte du poêle au travers du toit, ouvert en haut ; le goupillon est dans le tuyau, une corde part de son œil du haut jusqu’au toit, une autre de son œil du bas descend dans le tuyau, traverse une guenille mouillée bourrée dans la buse et ressort par la porte du poêle ; la créosote décollée tombe sur la guenille, des flèches montrent le va-et-vient. Par le bas : le même poêle, le goupillon au bout de perches droites, en bouts courts joints par des manchons : le bout du bas tient debout dans le foyer, sous la buse, et se tient par la porte ouverte ; le bout suivant attend sur la bâche, son manchon au bout ; le goupillon nettoie la buse et le premier mètre, le plus encrassé ; le dépôt tombe au fond du foyer ; au sol, une bâche et une chaudière sous la porte. Le tuyau démonté : une section couchée dehors sur une tôle, en coupe, où une barre plate au bout replié racle la paroi et pousse le dépôt hors du tuyau ; vu du bout, le bout replié suit la courbure du tuyau, et ce qui reste de créosote se voit à contre-jour. Le miroir : posé au fond du foyer sous la buse, penché vers la porte ; le jour qui descend du tuyau s’y réfléchit jusqu’à l’œil, à la porte.',
    format: 'pleine',
    disposition: [['haut', 'bas'], ['section', 'miroir']],
    hauteurs: [1.9, 1],
    largeurs: [[1, 1], [1.62, 1]],
    vues: {
      haut: {
        titre: 'Par le haut, entre deux cordes',
        dessin: z => {
          const P = rep(z, 240, 400, 4), X = 110, o = [];
          const toit = x => 150 - x * 0.3;
          o.push(plancher(P, 0, 240, 388));
          // le toit en coupe, percé pour le tuyau
          o.push(h.chemin([[0, toit(0)], [X - 18, toit(X - 18)], [X - 18, toit(X - 18) + 10], [0, toit(0) + 10]].map(q => P(...q)), h.a.hachure('bois', 'arete'), true));
          o.push(h.chemin([[X + 18, toit(X + 18)], [240, toit(240)], [240, toit(240) + 10], [X + 18, toit(X + 18) + 10]].map(q => P(...q)), h.a.hachure('bois', 'arete'), true));
          o.push(tuyau(P, X, 40, 300));
          o.push(poele(P, 40, X, 300, 388, [316, 354]));
          // la croûte sous l'écouvillon ; au-dessus, le tuyau est propre
          o.push(croute(h, P, [X - 12, 234], [X - 12, 276], 2.4, -1, 0.4), croute(h, P, [X + 12, 234], [X + 12, 276], 2.4, 1, 1.3));
          // la corde du bas, dans le tuyau, par la buse et la porte
          o.push(corde(h, P, [[X, 249.5], [X, 304], [58, 334], [36, 338], [22, 350], [18, 384]]));
          // la guenille mouillée bourrée dans la buse
          o.push(h.chemin([[X - 12, 279], [X - 6, 276], [X + 1, 280], [X + 7, 275.5], [X + 12, 279], [X + 13, 292], [X + 15, 298], [X + 11, 306], [X + 3, 303], [X - 4, 308], [X - 12, 304], [X - 15, 297], [X - 12, 290]].map(q => P(...q)), blanc(h.a.arete), true));
          o.push(h.path(trace(P, [['M', X - 9, 286], ['Q', X - 2, 283, X + 4, 290], ['M', X - 5, 297], ['Q', X + 2, 293, X + 9, 299], ['M', X + 2, 280], ['Q', X - 1, 287, X - 7, 292]]), h.a.detail));
          // la créosote qui tombe et s'arrête sur la guenille
          for (const [x, y, r, a] of [[X - 4, 252, 1.9, 0.3], [X + 5, 259, 1.6, 1.2], [X - 6, 266, 1.4, 2], [X + 3, 270, 2, 0.8], [X - 7, 276, 1.5, 0.5], [X - 1, 277, 1.8, 2.4], [X + 6, 276, 1.4, 1.7]])
            o.push(eclat(h, P, x, y, r, a));
          // l'écouvillon, et la corde du haut jusqu'au toit
          o.push(corde(h, P, [[X, 0], [X, 178.5]]));
          o.push(goupillon(P, X, 208));
          o.push(h.fleche(trace(P, [['M', X - 26, 218], ['L', X - 26, 180]])), h.fleche(trace(P, [['M', X - 34, 180], ['L', X - 34, 218]])));
          return o.join('\n');
        },
        renvois: z => {
          const P = rep(z, 240, 400, 4), X = 110;
          return [
            { n: 1, rond: P(150, 20), cible: P(X + 2, 26), texte: 'corde du haut, tenue du toit' },
            { n: 2, rond: P(172, 196), cible: P(X + 9, 216), texte: 'l’écouvillon' },
            { n: 3, rond: P(14, 298), cible: P(46, 336), texte: 'corde du bas, jusqu’au poêle' },
            { n: 4, rond: P(170, 312), cible: P(X + 12, 297), texte: 'buse bourrée d’une guenille' },
            { n: 5, rond: P(172, 254), cible: P(X + 5, 262), texte: 'la créosote tombe dessus' },
          ];
        },
      },
      bas: {
        titre: 'Par le bas, à la perche',
        dessin: z => {
          const P = rep(z, 240, 400, 4), X = 170, o = [];
          o.push(plancher(P, 0, 240, 388));
          // la bâche au sol, la chaudière sous la porte
          o.push(h.chemin([[0, 382.5], [118, 382.5], [124, 385], [121, 388], [0, 388]].map(q => P(...q)), blanc(h.a.detail), true));
          o.push(h.path(trace(P, [['M', 24, 382.5], ['Q', 29, 386, 34, 382.5], ['M', 102, 382.5], ['Q', 107, 386, 112, 382.5]]), h.a.fin));
          o.push(h.chemin([[56, 350.5], [96, 350.5], [92, 382.5], [60, 382.5]].map(q => P(...q)), blanc(h.a.arete), true));
          o.push(h.ellipse(...P(76, 350.5), 20 * P.s, 3.5 * P.s, blanc(h.a.arete)));
          o.push(h.ligne(...P(57.5, 362), ...P(94.5, 362), h.a.detail), h.ligne(...P(58.8, 374), ...P(93.2, 374), h.a.detail));
          o.push(tuyau(P, X, 0, 300));
          o.push(poele(P, 100, X, 300, 388, [316, 354]));
          // la croûte, plus épaisse au bas du tuyau
          o.push(croute(h, P, [X - 12, 4], [X - 12, 150], 1.2, -1, 0.2), croute(h, P, [X + 12, 4], [X + 12, 150], 1.2, 1, 1.1));
          o.push(croute(h, P, [X - 12, 244], [X - 12, 288], 3.4, -1, 2.2), croute(h, P, [X + 12, 244], [X + 12, 288], 3.4, 1, 0.7));
          // le dépôt au fond du foyer
          o.push(h.path(trace(P, [['M', X - 30, 370.5], ['Q', X - 24, 363, X - 14, 362], ['Q', X - 7, 363, X - 5, 370.5], ['Z']]), h.a.hachure('gravier', 'detail')));
          o.push(h.path(trace(P, [['M', X + 5, 370.5], ['Q', X + 8, 361, X + 16, 361], ['Q', X + 26, 364, X + 30, 370.5], ['Z']]), h.a.hachure('gravier', 'detail')));
          for (const [x, y, r, a] of [[X - 10, 318, 1.6, 0.4], [X + 10, 330, 1.8, 1.3], [X - 11, 344, 1.5, 2.1], [X + 9, 352, 1.4, 0.9]])
            o.push(eclat(h, P, x, y, r, a));
          // les perches ne plient pas : des bouts courts, montés droit sous la buse ; le bout du bas
          // tient debout dans le foyer et se tient par la porte ; le suivant attend sur la bâche
          o.push(bande(h, P, [[X, 236], [X, 371.5]], 4.2, blanc(h.a.arete)));
          o.push(goupillon(P, X, 190, false));
          o.push(h.rect(...P(X - 6.5, 226), 13 * P.s, 12 * P.s, h.a.blanc));
          for (let k = 0; k < 3; k++) o.push(h.path(trace(P, [['M', X - 6.5, 227 + k * 4], ['L', X + 6.5, 229 + k * 4]]), h.a.arete));
          // un manchon à chaque joint, ici dans la buse
          o.push(h.rect(...P(X - 7, 280), 14 * P.s, 26 * P.s, blanc(h.a.arete)));
          o.push(h.ligne(...P(X - 7, 286), ...P(X + 7, 286), h.a.detail), h.ligne(...P(X - 7, 300), ...P(X + 7, 300), h.a.detail));
          o.push(bande(h, P, [[4, 375.5], [46, 375.5]], 4.2, blanc(h.a.arete)));
          o.push(h.rect(...P(38, 368.5), 14 * P.s, 14 * P.s, blanc(h.a.arete)));
          // la buse et le premier mètre : une accolade du collet de la buse au haut de la croûte
          const ax = X + 18, y0 = 244, y1 = 300, ym = (y0 + y1) / 2;
          o.push(h.path(trace(P, [['M', ax, y0], ['Q', ax + 4, y0, ax + 4, y0 + 5], ['L', ax + 4, ym - 4], ['Q', ax + 4, ym, ax + 8, ym],
            ['Q', ax + 4, ym, ax + 4, ym + 4], ['L', ax + 4, y1 - 5], ['Q', ax + 4, y1, ax, y1]]), h.a.detail));
          // le second trait du renvoi 8, vers le bout qui attend sur la bâche
          { const [ax8, ay8] = P(76, 326), [bx8, by8] = P(30, 375.5), d = Math.hypot(bx8 - ax8, by8 - ay8), sx = ax8 + 10 * (bx8 - ax8) / d, sy = ay8 + 10 * (by8 - ay8) / d;
            o.push(`<line x1="${f(sx)}" y1="${f(sy)}" x2="${f(bx8)}" y2="${f(by8)}" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>`,
              `<line x1="${f(sx)}" y1="${f(sy)}" x2="${f(bx8)}" y2="${f(by8)}" fill="none" stroke="#1A1A1A" stroke-width="0.5" stroke-dasharray="3 2.5"/>`,
              `<circle cx="${f(bx8)}" cy="${f(by8)}" r="1.8" fill="#1A1A1A" stroke="#FFFFFF" stroke-width="0.7"/>`); }
          // on pousse, on tire
          o.push(h.fleche(trace(P, [['M', X - 26, 214], ['L', X - 26, 176]])), h.fleche(trace(P, [['M', X - 34, 176], ['L', X - 34, 214]])));
          return o.join('\n');
        },
        renvois: z => {
          const P = rep(z, 240, 400, 4), X = 170;
          return [
            { n: 6, rond: P(226, 272), cible: P(X + 26, 272), texte: 'la buse et le premier mètre' },
            { n: 7, rond: P(124, 262), cible: P(X - 7, 292), texte: 'un manchon à chaque joint' },
            { n: 8, rond: P(76, 326), cible: P(X - 4.2, 330), texte: 'bouts courts, debout au foyer' },
            { n: 9, rond: P(14, 338), cible: P(8, 385), texte: 'bâche et chaudière dessous' },
            { n: 10, rond: P(228, 342), cible: P(X + 14, 364), texte: 'le dépôt tombe dans le foyer' },
          ];
        },
      },
      section: {
        titre: 'Le tuyau démonté, couché dehors',
        dessin: z => {
          const P = rep(z, 400, 150, 4), o = [];
          const C = 105, R = 30, xg = 34, xd = 236;
          o.push(h.rect(...P(0, 140), 400 * P.s, 10 * P.s, h.a.hachure('terre', 'aucun')));
          o.push(h.ligne(...P(0, 140), ...P(400, 140), h.a.arete));
          o.push(h.rect(...P(14, 136), 262 * P.s, 4 * P.s, blanc(h.a.arete)));
          // la section, coupée en long ; le bout serti à gauche
          // moitié avant enlevée : on voit l'intérieur de la moitié arrière, les deux bords coupés en trait fort
          o.push(h.rect(...P(xg + 12, C - R), (xd - xg - 12) * P.s, 2 * R * P.s, h.a.blanc));
          for (const dy of [-0.8, -0.55, 0.55, 0.8]) o.push(h.ligne(...P(xg + 14, C + dy * R), ...P(xd - 2, C + dy * R), h.a.fin));
          o.push(h.path(trace(P, [['M', xd, C - R], ['Q', xd + 8, C, xd, C + R]]), h.a.arete));
          o.push(h.path(trace(P, [['M', xg, C - R + 3], ['Q', xg - 5, C, xg, C + R - 3]]), h.a.detail));
          o.push(h.chemin([[xd, C - R], [xg + 12, C - R], [xg, C - R + 3]].map(q => P(...q)), h.a.contour));
          o.push(h.chemin([[xd, C + R], [xg + 12, C + R], [xg, C + R - 3]].map(q => P(...q)), h.a.contour));
          for (const x of [37, 41, 45]) o.push(h.ligne(...P(x, C - R + 2), ...P(x, C - R + 6), h.a.detail), h.ligne(...P(x, C + R - 2), ...P(x, C + R - 6), h.a.detail));
          // la croûte : partout en haut ; en bas, seulement devant la barre
          o.push(croute(h, P, [xg + 12, C - R], [xd - 1, C - R], 2.6, -1, 0.3));
          o.push(croute(h, P, [xd - 1, C + R], [102, C + R], 2.6, -1, 1.5));
          o.push(h.path(trace(P, [['M', 101, C + R], ['Q', 104, C + R - 7, 111, C + R - 6], ['Q', 117, C + R - 5, 119, C + R], ['Z']]), h.a.plein));
          // la barre plate, le bout replié d'équerre : tirée vers soi, l'arête mord en avant
          o.push(bande(h, P, [[296, 96], [xd, 104], [97, 121], [99.5, C + R - 2]], 1.6, blanc(h.a.arete)));
          o.push(h.fleche(trace(P, [['M', 262, 86], ['L', 300, 81]])));
          // ce qui tombe se ramasse sur la tôle
          for (const [x, y, r, a] of [[242, 124, 1.6, 0.4], [247, 131, 1.4, 1.5]]) o.push(eclat(h, P, x, y, r, a));
          o.push(h.path(trace(P, [['M', 238, 136], ['Q', 246, 129, 256, 131], ['Q', 264, 132, 268, 136], ['Z']]), h.a.plein));
          // vu du bout : le bout replié suit la courbure ; à contre-jour, la croûte qui reste
          const V = [350, 100];
          o.push(h.cercle(...P(...V), R * P.s, blanc(h.a.contour)));
          const arc = (r, a0, a1, n = 16) => Array.from({ length: n + 1 }, (_, i) => { const t = a0 + (a1 - a0) * i / n; return [V[0] + r * Math.cos(t), V[1] + r * Math.sin(t)]; });
          const ext = arc(R - 0.8, Math.PI * 1.08, Math.PI * 1.92), int = [];
          for (let i = 0; i <= 16; i++) { const t = Math.PI * 1.08 + Math.PI * 0.84 * i / 16; int.push([V[0] + (R - 3.4 - 1.2 * Math.abs(Math.sin(i * 1.7))) * Math.cos(t), V[1] + (R - 3.4 - 1.2 * Math.abs(Math.sin(i * 1.7))) * Math.sin(t)]); }
          o.push(h.chemin(ext.concat(int.reverse()).map(q => P(...q)), h.a.plein, true));
          o.push(h.chemin(arc(R - 1.4, Math.PI * 0.3, Math.PI * 0.7).concat(arc(R - 4.4, Math.PI * 0.7, Math.PI * 0.3)).map(q => P(...q)), blanc(h.a.arete), true));
          return o.join('\n');
        },
        renvois: z => {
          const P = rep(z, 400, 150, 4);
          return [
            { n: 11, rond: P(10, 112), cible: P(26, 138), texte: 'section couchée sur une tôle' },
            { n: 12, rond: P(150, 58), cible: P(118, 117), texte: 'barre plate, le bout replié' },
            { n: 13, rond: P(392, 142), cible: P(362, 127), texte: 'à la courbure du tuyau' },
            { n: 14, rond: P(290, 124), cible: P(260, 133), texte: 'ce qui tombe, sur la tôle' },
            { n: 15, rond: P(392, 56), cible: P(368, 78), texte: 'à contre-jour, ce qui reste' },
          ];
        },
      },
      miroir: {
        titre: 'Le miroir au fond du foyer',
        dessin: z => {
          const P = rep(z, 220, 160, 4), X = 130, o = [];
          o.push(plancher(P, 0, 220, 150));
          o.push(tuyau(P, X, 0, 76));
          o.push(poele(P, 60, X, 76, 150, [88, 124], 110, 56));
          // le miroir penché vers la porte, calé sur un bout de bois
          o.push(h.rect(...P(135, 116), 12 * P.s, 15.5 * P.s, h.a.hachure('bois', 'arete')));
          o.push(bande(h, P, [[118, 131], [141, 113.5]], 1.4, blanc(h.a.arete)));
          // le jour qui descend du tuyau et revient à l'œil
          o.push(h.fleche(trace(P, [['M', X, 2], ['L', X, 121.7], ['L', 10, 90.6]]), h.a.cache));
          return o.join('\n');
        },
        renvois: z => {
          const P = rep(z, 220, 160, 4);
          return [
            { n: 16, rond: P(200, 104), cible: P(128, 125), texte: 'miroir au fond, sous la buse' },
            { n: 17, rond: P(24, 64), cible: P(40, 98.4), texte: 'on doit voir le ciel' },
          ];
        },
      },
    },
  };
};
