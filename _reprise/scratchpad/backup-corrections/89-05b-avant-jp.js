// Planche 89-05b — Tirer les planches et cintrer la tête du toboggan (ch. 89, étapes 43, 49, 53)
// Page a (89-05a) : le toboggan monté.
module.exports = (h) => {
  const G = geom();
  return {
    ref: '89-05b',
    titre: 'Tirer les planches, cintrer la tête',
    desc: 'En haut à gauche, le bout d’un tronc d’épinette fendu en deux par le cœur, les deux moitiés écartées ; contre la face fendue de chaque moitié, une planche de 17 cm de large et de 2,5 à 3,2 cm d’épais, le reste de la moitié à enlever à la hache. En haut à droite, le bout d’une planche vu de biais : une pince de deux bâtons, un dessus et un dessous, liés serré aux deux bouts, en travers du bout de la planche ; plus loin, deux traits en travers qui bornent la zone de pli ; une brosse, bâton fendu avec un chiffon coincé dedans, passe l’eau bouillante sur la zone, dans un sens et dans l’autre. En bas à gauche, une personne assise sur une bûche, vue de face : la planche couchée sur ses deux genoux, une main qui la tient sur un genou, la zone de pli, entre ses deux traits, sur l’autre genou, et l’autre main qui tient la pince et la tire lentement vers le bas. En bas à droite, de côté : le toboggan à plat, une personne à genoux dessus, un pied appuyé contre la zone de pli, les mains qui tirent la tête vers elle ; la traverse de tête au bout des planches, et les liens qui la tiennent à la traverse où commence la courbe.',
    format: 'pleine',
    disposition: [['bille', 'pince'], ['genou', 'tete']],
    hauteurs: [1, 1.3],
    largeurs: [[1, 1.45], [1, 1.45]],
    vues: {
      // ─── Le tronc, en bout ────────────────────────────────────────────────────────────
      bille: {
        titre: 'Le tronc, en bout',
        dessin: z => {
          const B = bille(z);
          const o = [];
          [-1, 1].forEach(s => {
            const demi = B.demi(s, 120);
            o.push(h.path(demi, h.a.blanc));
            [30, 55, 80, 100, 112].forEach(r => o.push(h.path(B.arc(s, r), h.a.fin)));
            const pl = B.planche(s);
            o.push(h.chemin(pl, h.a.blanc, true), h.chemin(pl, h.a.hachure('bois', 'aucun'), true));
            o.push(h.path(demi, h.a.arete));
            o.push(h.chemin(pl, h.a.contour, true));
            o.push(h.cercle(...B.pt(s * 11.5, 0), 1.6, h.a.plein));
          });
          // cotes : largeur et épaisseur de la planche brute
          const [xd] = B.pt(40, 0), [xc] = B.pt(138, 0);
          o.push(h.ligne(xd + 2, B.pt(0, -85)[1], xc + 4, B.pt(0, -85)[1], h.a.fin), h.ligne(xd + 2, B.pt(0, 85)[1], xc + 4, B.pt(0, 85)[1], h.a.fin));
          o.push(h.cote(xc, B.pt(0, -85)[1], xc, B.pt(0, 85)[1], '170 mm', { cote: 'droite' }));
          const yb = B.pt(0, 128)[1] + 10;
          o.push(h.ligne(...B.pt(-10, 87), B.pt(-10, 0)[0], yb + 4, h.a.fin), h.ligne(...B.pt(-40, 87), B.pt(-40, 0)[0], yb + 4, h.a.fin));
          o.push(h.cote(B.pt(-40, 0)[0], yb, B.pt(-10, 0)[0], yb, '25 à 32 mm', { cote: 'dessous' }));
          return o.join('\n');
        },
        renvois: z => {
          const B = bille(z);
          return [
            { n: 1, rond: B.pt(-12, -152), cible: B.pt(-10, -112), texte: 'fendu en deux par le cœur' },
            { n: 2, rond: B.pt(44, -152), cible: B.pt(25, -60), texte: 'une planche par moitié' },
          ];
        },
      },

      // ─── La pince et la brosse ────────────────────────────────────────────────────────
      pince: {
        titre: 'La pince et la brosse',
        dessin: z => {
          const O = obl(z);
          const o = [];
          const UP = 40;                       // la pince, près du bout
          // bâton du dessous
          o.push(baton(h, O, UP, -14, false));
          // ligature arrière, derrière la planche
          [199, 192, 185].forEach(v => o.push(h.ligne(...O.pt(UP - 15.5, v, 27), ...O.pt(UP - 15.5, v, -14), h.a.arete)));
          // la planche : dessus, chant, bout ; à gauche, trait de coupure en zigzag, parallèle aux traits de pli
          const UL = 640;
          const A = O.pt(UL, 170, 13), B = O.pt(UL, 0, 13), L = [B[0] - A[0], B[1] - A[1]], lL = Math.hypot(L[0], L[1]);
          const pp = [-L[1] / lL, L[0] / lL];   // le Z de la coupure, d'équerre au trait à l'écran
          const zz = [[0.42, 0], [0.47, 6], [0.53, -6], [0.58, 0]].map(([f, e]) => [r1(A[0] + L[0] * f + pp[0] * e), r1(A[1] + L[1] * f + pp[1] * e)]);
          const dessus = [O.pt(0, 0, 13), O.pt(0, 170, 13), A, ...zz, B];
          const chant = [O.pt(0, 0, 0), O.pt(0, 0, 13), O.pt(UL, 0, 13), O.pt(UL, 0, 0)];
          const bout = [O.pt(0, 0, 0), O.pt(0, 170, 0), O.pt(0, 170, 13), O.pt(0, 0, 13)];
          [dessus, chant, bout].forEach(q => o.push(h.chemin(q, h.a.blanc, true)));
          o.push(h.chemin(bout, h.a.hachure('bois', 'aucun'), true));
          [dessus, chant, bout].forEach(q => o.push(h.chemin(q, h.a.contour, true)));
          // les deux traits de la zone de pli
          [190, 470].forEach(u => o.push(h.chemin([O.pt(u, 170, 13), O.pt(u, 0, 13), O.pt(u, 0, 0)], h.a.arete)));
          // bâton du dessus
          o.push(baton(h, O, UP, 27, false));
          // ligature avant : les tours qui serrent les deux bâtons
          [-26, -33, -40].forEach(v => o.push(h.ligne(...O.pt(UP - 15.5, v, 27), ...O.pt(UP - 15.5, v, -14), h.a.arete)));
          o.push(baton(h, O, UP, -14, true), baton(h, O, UP, 27, true));
          // la brosse : bâton fendu, chiffon coincé dans la fente, sur la zone
          const R = O.pt(330, 95, 13);
          const manche = [[R[0] + 6, R[1] - 8], [R[0] + 92, R[1] - 92]];
          o.push(h.path(capsule(manche[0], manche[1], 3.6), h.a.blanc), h.path(capsule(manche[0], manche[1], 3.6), h.a.arete));
          o.push(h.ligne(R[0] + 6, R[1] - 8, R[0] + 24, R[1] - 26, h.a.detail));
          const chiffon = `M${R[0] - 24},${R[1] - 2} C${R[0] - 26},${R[1] - 12} ${R[0] - 10},${R[1] - 16} ${R[0] - 2},${R[1] - 13} C${R[0] + 6},${R[1] - 20} ${R[0] + 22},${R[1] - 14} ${R[0] + 20},${R[1] - 5} C${R[0] + 26},${R[1] + 1} ${R[0] + 16},${R[1] + 5} ${R[0] + 8},${R[1] + 3} C${R[0]},${R[1] + 7} ${R[0] - 20},${R[1] + 6} ${R[0] - 24},${R[1] - 2} Z`;
          o.push(h.path(chiffon, h.a.blanc), h.path(chiffon, h.a.arete));
          o.push(h.path(`M${R[0] - 14},${R[1] - 6} Q${R[0] - 6},${R[1] - 2} ${R[0] + 4},${R[1] - 7} M${R[0] - 4},${R[1] + 1} Q${R[0] + 6},${R[1] - 2} ${R[0] + 12},${R[1] + 1}`, h.a.fin));
          // dans un sens et dans l'autre
          const a = O.pt(420, 175, 13), b = O.pt(240, 175, 13);
          o.push(h.path(`M${a[0]},${a[1] - 16} L${b[0]},${b[1] - 16}`, h.a.arete + ' marker-start="url(#fl)" marker-end="url(#fl)"'));
          return o.join('\n');
        },
        renvois: z => {
          const O = obl(z);
          const R = O.pt(330, 95, 13);
          return [
            { n: 3, rond: [O.pt(40, -55, 27)[0] + 4, 16], cible: O.pt(40, 60, 41), texte: 'pince de deux bâtons, liés serré' },
            { n: 4, rond: [O.pt(470, 0, 0)[0] - 6, z.h - 16], cible: O.pt(470, 85, 13), texte: 'deux traits : la zone de pli' },
            { n: 5, rond: [R[0] + 20, 16], cible: [R[0] + 50, R[1] - 50], texte: 'brosse : bâton fendu, chiffon' },
            { n: 6, rond: [O.pt(330, 0, 0)[0] + 2, z.h - 16], cible: O.pt(330, 20, 13), texte: 'eau bouillante, les deux faces' },
          ];
        },
      },

      // ─── Sur le genou ─────────────────────────────────────────────────────────────────
      genou: {
        titre: 'Sur le genou, lentement',
        dessin: z => {
          const F = face(z);
          const o = [];
          // la bûche, derrière les jambes
          const b = [F.pt(-190, 0), F.pt(190, 0), F.pt(190, 430), F.pt(-190, 430)];
          o.push(h.chemin(b, h.a.blanc, true), h.chemin(b, h.a.arete, true));
          // le corps : tronc et tête ; le tronc s'arrête à la planche (le bas suit la planche qui plie)
          o.push(groupe(h, [
            F.poly([[-180, 1110], [180, 1110], [173, 500], [130, 540], [-173, 540]]),
            F.rond(0, 1235, 100, 112),
          ]));
          // les jambes : genou, jambe, pied
          o.push(groupe(h, [-1, 1].flatMap(s => [
            F.caps([s * 112, 455], [s * 122, 95], 55),
            F.rond(s * 128, 42, 62, 42),
            F.rond(s * 110, 470, 64, 64),
          ])));
          // le bras droit : l'avant-bras finit derrière la pince, qui passe devant lui
          const S = F.pinceMm(), EL = [330, 785];
          const u = [S[0][0] - EL[0], S[0][1] - EL[1]], lu = Math.hypot(u[0], u[1]);
          const W = [S[0][0] - u[0] / lu * 24, S[0][1] - u[1] / lu * 24];   // le bout de l'avant-bras arrive sur le bâton du dehors
          o.push(groupe(h, [F.caps([205, 1060], EL, 50), F.caps(EL, W, 42)]));
          // la planche : couchée sur les deux genoux, pliée sur le droit
          o.push(h.path(F.planche(), h.a.plein));
          F.traits().forEach(t => o.push(h.ligne(...t[0], ...t[1], h.a.arete)));
          // la main gauche tient la planche sur le genou gauche
          o.push(groupe(h, [F.caps([-205, 1060], [-285, 780], 50), F.caps([-285, 780], [-135, 600], 45), F.rond(-120, 590, 60, 48)]));
          // la pince vue en bout : un bâton de chaque côté de l'épaisseur, collés contre elle, et la ligature
          const [c1, c2] = F.pince(), rb = F.rb;
          o.push(h.path(capsule(c1, c2, rb + 2.8), h.a.blanc));
          o.push(h.chemin(F.bout(), h.a.plein, true));
          o.push(h.path(capsule(c1, c2, rb + 1.3), h.a.detail), h.path(capsule(c1, c2, rb + 2.6), h.a.fin));
          [c1, c2].forEach(c => o.push(h.cercle(...c, rb, h.a.blanc), h.cercle(...c, rb, h.a.arete)));
          // tirer lentement vers le bas, autour du genou
          o.push(h.fleche(F.arc(200, -30, -58)));
          return o.join('\n');
        },
        renvois: z => {
          const F = face(z);
          return [
            { n: 7, rond: [F.pt(0, 0)[0], F.pt(0, 760)[1]], cible: F.pt(150, 512), texte: 'le genou entre les deux traits' },
            { n: 8, rond: [z.l - 12, F.pt(0, 620)[1]], cible: F.pince()[0], texte: 'tirer par la pince' },
          ];
        },
      },

      // ─── La tête ──────────────────────────────────────────────────────────────────────
      tete: {
        titre: 'La tête, à genoux dessus',
        dessin: z => {
          const E = prof(z, G);
          const o = [];
          o.push(h.ligne(0, E.pt([0, 0])[1] + 1.5, z.l, E.pt([0, 0])[1] + 1.5, h.a.fin));
          // la planche, bout arrière cassé
          const XB = 1000;
          const bas = G.bas.filter(p => p[0] >= XB || p[1] > 0), haut = G.haut.filter(p => p[0] >= XB || p[1] > T);
          const pl = [E.pt([XB, 0]), ...bas.map(E.pt), ...[...haut].reverse().map(E.pt), E.pt([XB, T])];
          o.push(h.chemin(pl, h.a.plein, true));
          // liens de la tête, à la traverse où part la courbe
          const l1 = add(add(G.E, mul(G.u, -6)), mul(G.n, 22)), l2 = add(add(G.E, mul(G.u, -30)), mul(G.n, 22));
          o.push(h.ligne(...E.pt(l1), ...E.pt([XS[3] + 16, T + 22]), h.a.arete), h.ligne(...E.pt(l2), ...E.pt([XS[3] + 16, T + 4]), h.a.arete));
          [XS[2], XS[3]].forEach(x => {
            const q = [[x - 16, T], [x + 16, T], [x + 16, T + 22], [x - 16, T + 22]].map(E.pt);
            o.push(h.chemin(q, h.a.blanc, true), h.chemin(q, h.a.arete, true));
          });
          const tq = G.tete.poly.map(E.pt);
          o.push(h.chemin(tq, h.a.blanc, true), h.chemin(tq, h.a.arete, true));
          // la personne : la jambe à genou, le corps, la jambe au pied appuyé, le bras
          o.push(groupe(h, [E.caps([1600, 470], [1655, 75], 75), E.caps([1655, 75], [1255, 70], 55), E.caps([1255, 62], [1150, 50], 38)]));
          o.push(groupe(h, [E.caps([1610, 500], [1820, 930], 125), E.caps([1830, 960], [1905, 1060], 50), E.rond(1935, 1140, 92, 104)]));
          o.push(groupe(h, [E.caps([1600, 480], [1985, 560], 75), E.caps([1985, 560], [2060, 175], 55), E.caps([2045, 150], [2150, 70], 40)]));
          o.push(groupe(h, [E.caps([1840, 930], [2105, 700], 48), E.caps([2105, 700], [2290, 385], 42), E.rond(2300, 345, 50, 45)]));
          // on tire la tête vers soi
          const f0 = E.pt([2365, 475]), f1 = E.pt([2249, 673]);
          o.push(h.fleche(`M${f0[0]},${f0[1]} L${f1[0]},${f1[1]}`));
          return o.join('\n');
        },
        renvois: z => {
          const E = prof(z, G);
          return [
            { n: 9, rond: [E.pt([2250, 0])[0] + 4, z.h - 11], cible: E.pt([2140, 60]), texte: 'un pied contre la zone de pli' },
            { n: 10, rond: [E.pt([1500, 0])[0] + 30, E.pt([0, 330])[1]], cible: E.pt(lerp(add(add(G.E, mul(G.u, -6)), mul(G.n, 22)), [XS[3] + 16, T + 22], 0.8)), texte: 'deux liens doubles de chaque côté' },
          ];
        },
      },
    },
  };
};

// ─── Outils ─────────────────────────────────────────────────────────────────────────────
const T = 13;
const XS = [120, 700, 1280, 1860];
const r1 = v => Math.round(v * 10) / 10;
const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
const mul = (a, k) => [a[0] * k, a[1] * k];
const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
// le profil du toboggan, le même que la page a
function geom() {
  const P = [[1900, 0], [2220, 0], [2400, 110], [2330, 320]];
  const bz = t => { const u = 1 - t; return [0, 1].map(k => u * u * u * P[0][k] + 3 * u * u * t * P[1][k] + 3 * u * t * t * P[2][k] + t * t * t * P[3][k]); };
  const dz = t => { const u = 1 - t; return [0, 1].map(k => 3 * u * u * (P[1][k] - P[0][k]) + 6 * u * t * (P[2][k] - P[1][k]) + 3 * t * t * (P[3][k] - P[2][k])); };
  const courbe = [], haut = [[0, T]];
  for (let i = 0; i <= 48; i++) {
    const t = i / 48, p = bz(t), d = dz(t), L = Math.hypot(d[0], d[1]);
    courbe.push(p);
    haut.push(add(p, mul([-d[1] / L, d[0] / L], T)));
  }
  const d = dz(1), L = Math.hypot(d[0], d[1]);
  const u = [d[0] / L, d[1] / L], n = [-u[1], u[0]];
  const E = haut[haut.length - 1];
  const poly = [add(E, mul(u, -2)), add(E, mul(u, -34)), add(add(E, mul(u, -34)), mul(n, 22)), add(add(E, mul(u, -2)), mul(n, 22))];
  return { bas: [[0, 0], ...courbe], haut, courbe, E, u, n, maxX: Math.max(...courbe.map(p => p[0])), tete: { poly } };
}
// forme à bouts ronds autour du segment a–b (px)
function capsule(a, b, r) {
  const L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
  const nx = -(b[1] - a[1]) / L * r, ny = (b[0] - a[0]) / L * r;
  const p = (q, s) => `${r1(q[0] + s * nx)},${r1(q[1] + s * ny)}`;
  return `M${p(a, 1)} L${p(b, 1)} A${r1(r)},${r1(r)} 0 0 0 ${p(b, -1)} L${p(a, -1)} A${r1(r)},${r1(r)} 0 0 0 ${p(a, 1)} Z`;
}
const ovale = (c, rx, ry) => `M${r1(c[0] - rx)},${r1(c[1])} A${r1(rx)},${r1(ry)} 0 1 0 ${r1(c[0] + rx)},${r1(c[1])} A${r1(rx)},${r1(ry)} 0 1 0 ${r1(c[0] - rx)},${r1(c[1])} Z`;
// une silhouette : le contour de l'ensemble, puis le blanc par-dessus, qui efface les traits intérieurs
function groupe(h, parts) {
  return parts.map(d => h.path(d, h.a.contour)).concat(parts.map(d => h.path(d, h.a.blanc))).join('\n');
}
function bille(z) {
  const k = Math.min(0.70, (z.h - 62) / 250), cx = z.l / 2 - 26, cy = z.h / 2 - 4;
  const pt = (x, y) => [r1(cx + k * x), r1(cy + k * y)];
  const G = 10;   // écart entre les deux moitiés, vue éclatée
  const demi = (s, r) => arc(s, r) + ' Z';
  const arc = (s, r) => {
    const a = pt(s * G, -r), b = pt(s * G, r);
    return `M${a[0]},${a[1]} A${r1(k * r)},${r1(k * r)} 0 0 ${s < 0 ? 0 : 1} ${b[0]},${b[1]}`;
  };
  const planche = s => [[s * G, -85], [s * (G + 30), -85], [s * (G + 30), 85], [s * G, 85]].map(p => pt(...p));
  return { pt, demi, arc, planche };
}
// vue de biais : u le long de la planche (0 au bout, vers la gauche), v en travers (fuyant), t l'épaisseur
function obl(z) {
  const k = 0.4, X0 = z.l - 74, Y0 = z.h * 0.64;
  return { k, pt: (u, v, t) => [r1(X0 - k * u + 0.294 * v), r1(Y0 - 0.17 * v - k * t)] };
}
// un bâton de la pince, en travers : seulement le corps (devant = false) ou le bout proche (devant = true)
function baton(h, O, u, t, devant) {
  const r = 14 * O.k, c0 = O.pt(u, -55, t), c1 = O.pt(u, 225, t);
  if (devant) return h.cercle(...c0, r, h.a.blanc) + '\n' + h.cercle(...c0, r, h.a.arete);
  const p = [0.5 * r, 0.866 * r];
  const band = [add(c0, p), add(c1, p), add(c1, mul(p, -1)), add(c0, mul(p, -1))];
  return [h.cercle(...c1, r, h.a.blanc), h.cercle(...c1, r, h.a.arete), h.chemin(band, h.a.blanc, true),
    h.ligne(...band[0], ...band[1], h.a.arete), h.ligne(...band[3], ...band[2], h.a.arete)].join('\n');
}
// vue de face, assis : x vers la droite, y vers le haut, en mm
function face(z) {
  const k = Math.min(0.25, (z.h - 14) / 1345), cx = z.l * 0.56, gy = z.h - 6;
  const pt = (x, y) => [r1(cx + k * x), r1(gy - k * y)];
  // planche sur les genoux (dessus à 547), pliée autour du genou droit (centre 110, 470) ;
  // le bout descend de LB après le genou, la pince à LP, au niveau du bas du genou
  const RK = 64, ANG = 30 * Math.PI / 180, LB = 142, LP = 112, RB = 17;
  const n = [Math.cos(ANG), Math.sin(ANG)], d = [Math.sin(ANG), -Math.cos(ANG)];
  const courbe = e => {
    const R = RK + e, pts = [];
    pts.push([-1400, 470 + R]);
    for (let i = 0; i <= 12; i++) { const a = Math.PI / 2 - (Math.PI / 2 - ANG) * i / 12; pts.push([110 + R * Math.cos(a), 470 + R * Math.sin(a)]); }
    const a = [110 + R * Math.cos(ANG), 470 + R * Math.sin(ANG)];
    pts.push([a[0] + LB * Math.sin(ANG), a[1] - LB * Math.cos(ANG)]);
    return pts;
  };
  const bord = x => Math.max(x, (-cx + 3) / k);   // la planche sort de la vue à gauche
  const mil = [110 + (RK + T / 2) * Math.cos(ANG), 470 + (RK + T / 2) * Math.sin(ANG)];   // milieu de l'épaisseur, fin de la courbe
  const P = add(mil, mul(d, LP));
  const S = [add(P, mul(n, T / 2 + RB)), add(P, mul(n, -T / 2 - RB))];   // bâton du dehors, bâton du dedans
  return {
    pt,
    caps: (a, b, r) => capsule(pt(...a), pt(...b), r * k),
    rond: (x, y, rx, ry) => ovale(pt(x, y), rx * k, ry * k),
    poly: pts => 'M' + pts.map(p => pt(...p).join(',')).join(' L') + ' Z',
    planche: () => {
      const b = courbe(0).map(p => [bord(p[0]), p[1]]), t = courbe(T).map(p => [bord(p[0]), p[1]]);
      return 'M' + b.concat(t.reverse()).map(p => pt(...p).join(',')).join(' L') + ' Z';
    },
    traits: () => {
      const out = [];
      out.push([pt(60, 470 + RK - 8), pt(60, 470 + RK + T + 8)]);
      const a = [110 + RK * Math.cos(ANG), 470 + RK * Math.sin(ANG)];
      const q = add(a, mul(d, 45));
      out.push([pt(...add(q, mul(n, -8))), pt(...add(q, mul(n, T + 8)))]);
      return out;
    },
    k,
    rb: RB * k,
    // le bout de planche entre les deux bâtons, repeint par-dessus le blanc de la ligature
    bout: () => [add(P, add(mul(d, -RB - 4), mul(n, -T / 2))), add(P, add(mul(d, LB - LP), mul(n, -T / 2))),
      add(P, add(mul(d, LB - LP), mul(n, T / 2))), add(P, add(mul(d, -RB - 4), mul(n, T / 2)))].map(p => pt(...p)),
    // les deux bâtons de la pince, vus en bout, de part et d'autre de la planche
    pinceMm: () => S,
    pince: () => S.map(p => pt(...p)),
    // un arc de flèche autour du genou droit, de a0 à a1 degrés (sens horaire quand a1 < a0)
    arc: (R, a0, a1) => {
      const p = a => pt(110 + R * Math.cos(a * Math.PI / 180), 470 + R * Math.sin(a * Math.PI / 180));
      const [x0, y0] = p(a0), [x1, y1] = p(a1);
      return `M${x0},${y0} A${r1(R * k)},${r1(R * k)} 0 0 ${a1 < a0 ? 1 : 0} ${x1},${y1}`;
    },
  };
}
// de côté, la tête à gauche, comme la page a
function prof(z, G) {
  const k = Math.min(0.22, (z.l - 46) / 1345), X0 = 40, gy = z.h - 30;
  const pt = p => [r1(X0 + k * (G.maxX - p[0])), r1(gy - k * p[1])];
  return {
    pt,
    caps: (a, b, r) => capsule(pt(a), pt(b), r * k),
    rond: (x, y, rx, ry) => ovale(pt([x, y]), rx * k, ry * k),
  };
}
