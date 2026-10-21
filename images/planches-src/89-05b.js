// Planche 89-05b — Tirer les planches et cintrer la tête du toboggan (ch. 89, étapes 43, 49, 53)
// Page a (89-05a) : le toboggan monté.
// Refaite le 13 octobre 2026 : les deux personnes sont les corps simples de profil (assis-penche,
// genou-tire), les bras posés par le calcul (la main à plat sur la planche et le poing sur la pince ;
// les deux poings sur la traverse de tête). Le rouge : le geste dans chaque vue où on plie (tirer
// la pince autour du genou, tirer la tête vers soi) et la zone de pli sur le genou, à surveiller.
module.exports = (h) => {
  const G = geom();
  return {
    ref: '89-05b',
    titre: 'Tirer les planches, cintrer la tête',
    desc: 'En haut à gauche, le bout d’un tronc d’épinette fendu en deux par le cœur, les deux moitiés écartées ; contre la face fendue de chaque moitié, une planche de 17 cm de large et de 2,5 à 3,2 cm d’épais, le reste de la moitié à enlever à la hache. En haut à droite, le bout d’une planche vu de biais : une pince de deux bâtons, un dessus et un dessous, liés serré aux deux bouts, en travers du bout de la planche ; plus loin, deux traits en travers qui bornent la zone de pli ; une brosse, bâton fendu avec un chiffon coincé dedans, passe l’eau bouillante sur la zone, dans un sens et dans l’autre. En bas à gauche, de côté : une personne assise sur une bûche, penchée sur son genou ; la planche couchée sur la cuisse, une main à plat qui la tient sur la cuisse, la zone de pli, entre ses deux traits, sur le genou, et l’autre main qui serre la pince et la tire lentement vers le bas. En bas à droite, de côté : le toboggan à plat, une personne à un genou dessus, un pied appuyé contre la zone de pli, les deux mains serrées sur la traverse de tête, qui la tirent vers elle ; la traverse de tête au bout des planches, et les liens qui la tiennent à la traverse où commence la courbe.',
    format: 'pleine',
    disposition: [['bille', 'pince'], ['genou', 'tete']],
    hauteurs: [1, 1.4],
    largeurs: [[1, 1.45], [1.12, 1.33]],
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
      // de côté, assis sur la bûche : la planche couchée sur la cuisse, pliée sur le genou ;
      // la main proche la tient à plat sur la cuisse, la main loin tire la pince vers le bas ;
// gros plan rogné au cadre de la vue : le dos sort à gauche
      genou: {
        titre: 'Sur le genou, lentement',
        dessin: z => {
          const F = cote(z, h);
          const o = ['<clipPath id="rogne-genou-8905b"><rect x="0" y="0" width="' + z.l + '" height="' + z.h + '"/></clipPath>', '<g clip-path="url(#rogne-genou-8905b)">', h.ligne(0, F.sol, z.l, F.sol, h.a.fin)];
          // la planche couchée sur la cuisse et pliée sur le genou, ses deux traits, la pince au bout :
          // devant le tronc, sous le bras proche (objetP) ; la main loin, derrière, serre la pince
          const [c1, c2] = F.pince(), rb = F.rb;
          const objetP = [h.path(F.planche(), h.a.plein), ...F.traits().map(t => h.ligne(...t[0], ...t[1], h.a.arete)),
            h.path(capsule(c1, c2, rb + 2.8), h.a.blanc), h.chemin(F.bout(), h.a.plein, true),
            h.path(capsule(c1, c2, rb + 1.3), h.a.detail), h.path(capsule(c1, c2, rb + 2.6), h.a.fin),
            h.cercle(...c2, rb, h.a.blanc), h.cercle(...c2, rb, h.a.arete), h.cercle(...c1, rb, h.a.blanc), h.cercle(...c1, rb, h.a.arete)].join('\n');
          const p0 = F.perso(objetP);
          // la bûche, debout, sous la fesse
          const sy = p0.siege[1], bx0 = F.X(-230), bx1 = F.X(200);
          const buche = [[bx0, sy], [bx1, sy], [bx1, F.sol], [bx0, F.sol]];
          o.push(h.chemin(buche, h.a.blanc, true), h.chemin(buche, h.a.arete, true));
          o.push(p0.toString());
          // le geste : tirer lentement vers le bas, autour du genou ; le point à contrôler : la zone de
          // pli sur le genou, entre les deux traits (si la planche fend, on arrête tout)
          o.push(h.geste(F.arc(215, -15, -55)));
          const t = F.traits();
          o.push(h.controle(...lerp(lerp(t[0][0], t[0][1], 0.5), lerp(t[1][0], t[1][1], 0.5), 0.5), 13));
          o.push('</g>');
          return o.join('\n');
        },
        renvois: z => {
          const F = cote(z, h);
          const t = F.traits();
          return [
            { n: 7, rond: [z.l - 14, 16], cible: lerp(t[1][0], t[1][1], 0.5), texte: 'le genou entre les deux traits' },
            { n: 8, rond: [z.l - 14, z.h - 16], cible: F.pince()[0], texte: 'tirer par la pince' },
          ];
        },
      },

      // ─── La tête ──────────────────────────────────────────────────────────────────────
      tete: {
        titre: 'La tête, à genoux dessus',
        dessin: z => {
          const E = prof(z, G);
          // gros plan rogné au cadre de la vue : le pied du genou au sol sort à droite
          const o = ['<clipPath id="rogne-tete-8905b"><rect x="0" y="0" width="' + z.l + '" height="' + z.h + '"/></clipPath>', '<g clip-path="url(#rogne-tete-8905b)">'];
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
          // la personne, un genou sur le toboggan, le pied proche contre la zone de pli, les deux
          // mains serrées sur la traverse de tête ; la traverse, vue en bout, passe devant les doigts
          const tq = G.tete.poly.map(E.pt);
          o.push(agenouille(h, E, G, [h.chemin(tq, h.a.blanc, true), h.chemin(tq, h.a.arete, true)].join('\n')).toString());
          // le geste : on tire la tête vers soi
          const f0 = E.pt([2500, 400]), f1 = E.pt([2360, 600]);
          o.push(h.geste(`M${f0[0]},${f0[1]} L${f1[0]},${f1[1]}`));
          o.push('</g>');
          return o.join('\n');
        },
        renvois: z => {
          const E = prof(z, G);
          const P = agenouille(h, E, G);
          return [
            { n: 9, rond: [P.pied[0] + 4, z.h - 11], cible: P.pied, texte: 'un pied contre la zone de pli' },
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
// de côté, assis sur la bûche, tourné vers la droite : x vers l'avant, y vers le haut, en mm,
// la hanche en x = 0. La planche (dessus de la cuisse) se plie autour du genou proche.
function cote(z, hh) {
  const k = 0.26, x0 = z.l - 106 - 470 * k, sol = z.h * 0.635 + 470 * k;   // gros plan : la cuisse, le genou, les mains
  const X = x => r1(x0 + k * x), Y = y => r1(sol - k * y);
  const pt = (x, y) => [X(x), Y(y)];
  // le corps simple assis, penché sur le genou (assis-penche), posé la hanche en x0 : on le rend une
  // fois pour savoir où sont la hanche et le genou ; puis repris avec ses deux mains posées
  const base = H => { const c0 = H.formes.corps({ x: x0, y: sol, pose: 'assis-penche', vue: 'profil', age: 'adulte', echelle: k });
    return { x: x0 + (x0 - c0.articulations.hancheP[0]), y: sol, pose: 'assis-penche', vue: 'profil', age: 'adulte', echelle: k }; };
  let geo = null;
  const G0 = H => {
    if (geo) return geo;
    const p = H.formes.corps(base(H)), K = p.articulations.genouP, Hh = p.articulations.hancheP;
    const kv = [(K[0] - x0) / k, (sol - K[1]) / k], hv = [(Hh[0] - x0) / k, (sol - Hh[1]) / k];
    geo = { K: kv, H: hv };
    return geo;
  };
  const RJ = 56, RK = RJ + 5, ANG = 38 * Math.PI / 180, LB = 175, LP = 140, RB = 17;
  const n = [Math.cos(ANG), Math.sin(ANG)], d = [Math.sin(ANG), -Math.cos(ANG)];
  const Hcache = hh;
  const api = {
    k, sol, X, Y, pt, rb: RB * k,
  };
  const g = () => G0(Hcache);
  const courbe = e => {
    const { K, H } = g(), R = RK + e, pts = [];
    pts.push([H[0] + 175, K[1] + R]);
    for (let i = 0; i <= 12; i++) { const a = Math.PI / 2 - (Math.PI / 2 - ANG) * i / 12; pts.push([K[0] + R * Math.cos(a), K[1] + R * Math.sin(a)]); }
    const a = [K[0] + R * Math.cos(ANG), K[1] + R * Math.sin(ANG)];
    pts.push([a[0] + LB * Math.sin(ANG), a[1] - LB * Math.cos(ANG)]);
    return pts;
  };
  const P = () => { const { K } = g(); const mil = [K[0] + (RK + T / 2) * Math.cos(ANG), K[1] + (RK + T / 2) * Math.sin(ANG)]; return add(mil, mul(d, LP)); };
  const S = () => [add(P(), mul(n, T / 2 + RB)), add(P(), mul(n, -T / 2 - RB))];
  Object.assign(api, {
    // la main proche à plat sur la planche, sur la cuisse ; la main loin fermée sur le bâton du dehors
    // de la pince (34 mm) ; la planche et la pince passent devant le tronc et sous le bras proche
    perso: (objetP) => {
      const { K } = g();
      const s = S().map(p => pt(...p));
      const o = { ...base(Hcache), mains: { P: 'plat', L: 'prise' }, prise: { L: 2 * RB }, objetP };
      return poseBras(Hcache, o, { P: pt(K[0] - 130, K[1] + RK + T + 9), L: s[0] }, { P: 92 });
    },
    planche: () => {
      const b = courbe(0), t = courbe(T);
      // le bout coupé devant le ventre : un trait droit d'équerre
      return 'M' + b.concat(t.reverse()).map(p => pt(...p).join(',')).join(' L') + ' Z';
    },
    traits: () => {
      const { K, H } = g(), out = [];
      out.push([pt(K[0] - 60, K[1] + RK - 8), pt(K[0] - 60, K[1] + RK + T + 8)]);
      const a = [K[0] + RK * Math.cos(ANG), K[1] + RK * Math.sin(ANG)];
      const q = add(a, mul(d, 45));
      out.push([pt(...add(q, mul(n, -8))), pt(...add(q, mul(n, T + 8)))]);
      return out;
    },
    bout: () => [add(P(), add(mul(d, -RB - 4), mul(n, -T / 2))), add(P(), add(mul(d, LB - LP), mul(n, -T / 2))),
      add(P(), add(mul(d, LB - LP), mul(n, T / 2))), add(P(), add(mul(d, -RB - 4), mul(n, T / 2)))].map(p => pt(...p)),
    pince: () => S().map(p => pt(...p)),
    arc: (R, a0, a1) => {
      const { K } = g();
      const p = a => pt(K[0] + R * Math.cos(a * Math.PI / 180), K[1] + R * Math.sin(a * Math.PI / 180));
      const [xa, ya] = p(a0), [xb, yb] = p(a1);
      return `M${xa},${ya} A${r1(R * k)},${r1(R * k)} 0 0 ${a1 < a0 ? 1 : 0} ${xb},${yb}`;
    },
  });
  return api;
}
// de côté, la tête à gauche, comme la page a
function prof(z, G) {
  const k = Math.min(0.205, (z.l - 46) / 1345), X0 = 40, gy = z.h - 30;
  const pt = p => [r1(X0 + k * (G.maxX - p[0])), r1(gy - k * p[1])];
  return {
    pt, k,
    caps: (a, b, r) => capsule(pt(a), pt(b), r * k),
    rond: (x, y, rx, ry) => ovale(pt([x, y]), rx * k, ry * k),
  };
}

// le pictogramme à un genou sur le toboggan, tourné vers la tête (à gauche) : le genou loin sur les
// planches, le pied proche contre la courbe, les deux mains sur la traverse de tête
function agenouille(h, E, G, objet) {
  // où la face du dessus de la courbe monte à 45 mm au-dessus des planches : le bout du pied
  const q = G.haut.find(p => p[0] > 1900 && p[1] > T + 45) || [2100, T + 45];
  const tc = G.tete.poly.reduce((a, p) => add(a, mul(p, 0.25)), [0, 0]);
  const m = E.pt(tc), m2 = E.pt(add(tc, mul(G.u, -4)));
  // le corps simple à un genou (genou-tire), tourné vers la tête du toboggan : le pied loin, devant,
  // posé contre la courbe ; les deux mains fermées sur la traverse de tête (26 mm)
  const yG = E.pt([0, T])[1];
  const o0 = { x: 0, y: yG, pose: 'genou-tire', vue: 'profil', cote: 'gauche', age: 'adulte', echelle: E.k, angles: { piedP: -20 } };
  const c0 = h.formes.corps(o0);
  const pied = E.pt([q[0] - 10, T + 30]);
  const o = { ...o0, x: pied[0] - c0.pieds.L.pointe[0] + 2, objet };
  const p = poseBras(h, o, { P: m, L: [m2[0] + 2, m2[1] - 2] });
  p.pied = [p.pieds.L.pointe[0] + 3, p.pieds.L.pointe[1] - 4];
  return p;
}

// Les deux bras d'un corps simple de profil, posés pour que les prises tombent sur les cibles (vue) :
// le calcul se fait dans le repère du corps (x vers l'avant), le coude plie vers le bas. main : l'angle
// de la main imposé (sinon dans le prolongement de l'avant-bras).
function poseBras(h, o, cibles, main = {}) {
  const RD = Math.PI / 180, m = o.cote === 'gauche' ? -1 : 1, M = q => [m * (q[0] - o.x), q[1]];
  const dir = a => [Math.sin(a * RD), Math.cos(a * RD)], angle = v => Math.atan2(v[0], v[1]) / RD;
  let c = h.formes.corps(o);
  const A = c.articulations, S0 = M(A.epauleP);
  const L1 = Math.hypot(A.coudeP[0] - A.epauleP[0], A.coudeP[1] - A.epauleP[1]), L2 = Math.hypot(A.poignetP[0] - A.coudeP[0], A.poignetP[1] - A.coudeP[1]);
  const ang = {};
  for (let it = 0; it < 4; it++) {
    for (const k of Object.keys(cibles)) {
      const Wr = M(c.articulations['poignet' + k]), Mn = M([c['main' + k].x, c['main' + k].y]), T_ = M(cibles[k]);
      const W = [T_[0] - (Mn[0] - Wr[0]), T_[1] - (Mn[1] - Wr[1])];
      const d = [W[0] - S0[0], W[1] - S0[1]], D = Math.min(L1 + L2 - 0.2, Math.hypot(d[0], d[1]));
      const al = Math.acos(Math.max(-1, Math.min(1, (L1 * L1 + D * D - L2 * L2) / (2 * L1 * D)))) / RD;
      const bras = angle(d) - al, Eb = [S0[0] + dir(bras)[0] * L1, S0[1] + dir(bras)[1] * L1];
      const avb = angle([W[0] - Eb[0], W[1] - Eb[1]]);
      ang['bras' + k] = bras; ang['avantbras' + k] = avb; ang['main' + k] = main[k] != null ? main[k] : avb + 8;
    }
    c = h.formes.corps({ ...o, angles: { ...(o.angles || {}), ...ang } });
  }
  return c;
}
