// Planche 89-05a — Le toboggan de deux planches (ch. 89, étapes 43 à 56)
// Page a : l'objet monté. Page b (89-05b) : cintrer la tête.
module.exports = (h) => {
  const G = geom();
  return {
    ref: '89-05a',
    titre: 'Le toboggan de deux planches',
    desc: 'En haut, le toboggan vu de dessus, la tête à gauche : deux planches jointes au milieu, qui s’élargissent du talon vers le milieu et se resserrent à la tête ; quatre traverses sur le plat, chacune liée en quatre points ; la traverse de tête posée au bout des planches relevées, la tête marquée de traits qui se serrent là où elle se redresse ; la corde de côté, une seule boucle qui longe les deux bords sous le bout des traverses et passe derrière la dernière. Dessous, le même toboggan de côté : le fond plat, la tête qui monte et revient un peu, la traverse de tête au bout, les liens tendus jusqu’à la traverse où commence la courbe. Au milieu, une coupe en travers à une traverse : les deux planches, le joint, la traverse sur le dessus, la ficelle qui passe sur la traverse aux quatre points et qui se couche dans une rainure sous les planches, et la corde de côté dans l’encoche sous chaque bout. En bas à gauche, le bout du tronc fendu en deux par le cœur, une planche tirée contre la face fendue de chaque moitié. En bas à droite, une coupe en long à un point de ligature : un trou de chaque côté de la traverse, la ficelle qui monte par l’un, passe sur la traverse, redescend par l’autre et revient dans la rainure, à fleur du dessous, sans toucher la neige.',
    format: 'pleine',
    disposition: [['dessus'], ['cote'], ['travers', 'long']],
    hauteurs: [0.85, 1.15, 1.4],
    largeurs: [[1], [1], [1.55, 1]],
    vues: {
      // ─── Vu de dessus ──────────────────────────────────────────────────────────────────
      dessus: {
        titre: 'Vu de dessus, la tête à gauche',
        dessin: z => {
          const P = plan(z, G);
          const o = [];
          // les deux planches, un seul contour
          const bord = [], xs = pas(0, G.maxX, 60);
          xs.forEach(x => bord.push(P.pt(x, -w(x) / 2)));
          [...xs].reverse().forEach(x => bord.push(P.pt(x, w(x) / 2)));
          o.push(h.chemin(bord, h.a.blanc, true));
          // la corde de côté : une boucle, sous le bout des traverses, derrière la dernière
          o.push(h.chemin(P.corde(), h.a.arete, true));
          // le joint du milieu
          o.push(h.ligne(...P.pt(0, 0), ...P.pt(G.maxX, 0), h.a.arete));
          // le bout des planches, en haut de la courbe
          o.push(h.ligne(...P.pt(G.bout.x, -95), ...P.pt(G.bout.x, 95), h.a.arete));
          // la tête qui monte : traits de forme, plus serrés là où elle se redresse
          G.courbe.filter((p, i) => i > 0 && i % 6 === 0 && p[0] < G.bout.x - 12).forEach(p => o.push(h.ligne(...P.pt(p[0], -w(p[0]) / 2 + 3), ...P.pt(p[0], w(p[0]) / 2 - 3), h.a.fin)));
          // les traverses et leurs quatre points
          XS.forEach(x => o.push(traverse(h, P, x)));
          o.push(h.rect(P.pt(G.tete.x1, 0)[0], P.pt(0, -95)[1], P.s * (G.tete.x1 - G.tete.x0), P.s * 190, h.a.blanc));
          o.push(h.rect(P.pt(G.tete.x1, 0)[0], P.pt(0, -95)[1], P.s * (G.tete.x1 - G.tete.x0), P.s * 190, h.a.arete));
          o.push(h.chemin(bord, h.a.contour, true));
          // cotes : largeur à la tête et au talon
          const [xa] = P.pt(G.maxX, 0), [xt] = P.pt(0, 0);
          o.push(h.ligne(xa - 3, P.pt(0, -95)[1], xa - 20, P.pt(0, -95)[1], h.a.fin), h.ligne(xa - 3, P.pt(0, 95)[1], xa - 20, P.pt(0, 95)[1], h.a.fin));
          o.push(h.cote(xa - 16, P.pt(0, -95)[1], xa - 16, P.pt(0, 95)[1], '19 cm', { cote: 'gauche' }));
          o.push(h.ligne(xt + 3, P.pt(0, -100)[1], xt + 20, P.pt(0, -100)[1], h.a.fin), h.ligne(xt + 3, P.pt(0, 100)[1], xt + 20, P.pt(0, 100)[1], h.a.fin));
          o.push(h.cote(xt + 16, P.pt(0, -100)[1], xt + 16, P.pt(0, 100)[1], '20 cm', { cote: 'droite' }));
          return o.join('\n');
        },
        renvois: z => {
          const P = plan(z, G);
          return [
            { n: 1, rond: [P.pt(G.tete.x0, 0)[0] + 30, P.pt(0, -150)[1] - 16], cible: P.pt((G.tete.x0 + G.tete.x1) / 2, -60), texte: 'traverse de tête' },
            { n: 2, rond: [P.pt(990, 0)[0], P.pt(0, -150)[1] - 16], cible: P.pt(990, -w(990) / 2 + 25), texte: 'corde de côté, en boucle' },
            { n: 3, rond: [P.pt(420, 0)[0], P.pt(0, 150)[1] + 16], cible: P.pt(420, 0), texte: 'joint : deux chants dressés' },
          ];
        },
      },

      // ─── De côté ──────────────────────────────────────────────────────────────────────
      cote: {
        titre: 'De côté',
        dessin: z => {
          const E = elev(z, G);
          const o = [];
          const planche = G.bas.map(E.pt).concat([...G.haut].reverse().map(E.pt));
          o.push(h.chemin(planche, h.a.plein, true));
          // les liens de la tête, tendus jusqu'à la traverse où part la courbe
          const l1 = add(G.E, mul(G.u, -6)), l2 = add(G.E, mul(G.u, -30));
          o.push(h.ligne(...E.pt(add(l1, mul(G.n, 22))), ...E.pt([XS[3] + 16, T + 22]), h.a.detail));
          o.push(h.ligne(...E.pt(add(l2, mul(G.n, 22))), ...E.pt([XS[3] + 16, T + 4]), h.a.detail));
          // traverses en bout
          XS.forEach(x => {
            const q = [[x - 16, T], [x + 16, T], [x + 16, T + 22], [x - 16, T + 22]].map(E.pt);
            o.push(h.chemin(q, h.a.blanc, true), h.chemin(q, h.a.arete, true));
          });
          const tq = G.tete.poly.map(E.pt);
          o.push(h.chemin(tq, h.a.blanc, true), h.chemin(tq, h.a.arete, true));
          // cotes
          const yb = E.pt([0, 0])[1];
          const [xh] = E.pt([G.bout.x, 0]), yh = E.pt([0, G.bout.y])[1];
          o.push(h.ligne(xh - 4, yh, 40, yh, h.a.fin), h.ligne(E.pt([G.maxX, 0])[0] - 3, yb, 40, yb, h.a.fin));
          o.push(h.cote(44, yh, 44, yb, '32 cm', { cote: 'gauche' }));
          const [x0] = E.pt([0, 0]), [x19] = E.pt([1900, 0]), [xm] = E.pt([G.maxX, 0]);
          o.push(h.ligne(x0, yb + 4, x0, yb + 44, h.a.fin), h.ligne(x19, yb + 4, x19, yb + 20, h.a.fin), h.ligne(xm, yb + 4, xm, yb + 44, h.a.fin));
          o.push(h.cote(x19, yb + 14, x0, yb + 14, '1,9 m', { cote: 'dessous' }));
          o.push(h.cote(xm, yb + 38, x0, yb + 38, '2,35 m', { cote: 'dessous' }));
          return o.join('\n');
        },
        renvois: z => {
          const E = elev(z, G);
          const c = G.courbe[Math.round(G.courbe.length * 0.3)];
          return [
            { n: 4, rond: [E.pt(c)[0] - 6, E.pt([0, 0])[1] + 22], cible: E.pt(c), texte: 'zone de pli, amincie' },
            { n: 5, rond: [E.pt([2060, 0])[0] + 70, E.pt([0, 250])[1] - 16], cible: E.pt(lerp(add(add(G.E, mul(G.u, -6)), mul(G.n, 22)), [XS[3] + 16, T + 22], 0.45)), texte: 'liens de tête, permanents' },
            { n: 6, rond: [E.pt([XS[3], 0])[0] + 60, E.pt([0, 150])[1]], cible: E.pt([XS[3], T + 18]), texte: 'traverse où part la courbe' },
          ];
        },
      },

      // ─── En coupe, en travers ─────────────────────────────────────────────────────────
      travers: {
        titre: 'En coupe, à une traverse du milieu',
        dessin: z => {
          const C = trav(z);
          const o = [];
          // les deux planches, rainure sous chaque point
          [-1, 1].forEach(s => {
            const pts = s < 0 ? plancheTravers(-150, -0.4) : plancheTravers(0.4, 150);
            const q = pts.map(C.pt);
            o.push(h.chemin(q, h.a.blanc, true), h.chemin(q, h.a.hachure('bois', 'aucun'), true), h.chemin(q, h.a.contour, true));
          });
          // la traverse, encochée sous chaque bout
          const tr = [[-150, 0], [-150, 22], [150, 22], [150, 0], [133, 0], [133, 10], [117, 10], [117, 0],
            [-117, 0], [-117, 10], [-133, 10], [-133, 0]].map(C.pt);
          o.push(h.chemin(tr, h.a.blanc, true), h.chemin(tr, h.a.hachure('bois', 'aucun'), true), h.chemin(tr, h.a.contour, true));
          // la corde de côté dans chaque encoche
          [-1, 1].forEach(s => o.push(h.cercle(...C.pt([s * 125, 4.8]), 4.6 * C.k, h.a.plein)));
          // la ficelle aux quatre points : sur la traverse, et couchée dans sa rainure
          POINTS.forEach(x => {
            o.push(h.cercle(...C.pt([x, 24]), 2.2, h.a.plein));
            o.push(h.cercle(...C.pt([x, -11]), 2.2, h.a.plein));
          });
          o.push(h.cote(...C.pt([-150, -21]), ...C.pt([150, -21]), '30 cm', { cote: 'dessous' }));
          return o.join('\n');
        },
        renvois: z => {
          const C = trav(z);
          return [
            { n: 7, rond: [C.pt([-20, 0])[0] - 40, C.pt([0, 22])[1] - 30], cible: C.pt([-20, 24.5]), texte: 'quatre points par traverse' },
            { n: 8, rond: [C.pt([150, 0])[0] + 8, C.pt([0, 22])[1] - 30], cible: C.pt([128, 7]), texte: 'encoche sous chaque bout' },
          ];
        },
      },

      // ─── En coupe, en long, à un point ────────────────────────────────────────────────
      long: {
        titre: 'En coupe, à un point de ligature',
        dessin: z => {
          const L = long(z);
          const o = [];
          // la neige
          const neige = [[-46, -13], [46, -13], [46, -27], [-46, -27]].map(L.pt);
          o.push(h.chemin(neige, h.a.hachure('neige', 'aucun'), true));
          o.push(h.ligne(...L.pt([-46, -13]), ...L.pt([46, -13]), h.a.detail));
          // la planche : trois morceaux dans le plan de coupe, séparés par les deux trous
          const morceaux = [
            [...zig(-46, -13, 0), [-24.5, 0], [-24.5, -13]],
            [[-19.5, 0], [19.5, 0], [19.5, -10.5], [-19.5, -10.5]],
            [[24.5, -13], [24.5, 0], ...zig(46, 0, -13)],
          ];
          morceaux.forEach(m => {
            const q = m.map(L.pt);
            o.push(h.chemin(q, h.a.blanc, true), h.chemin(q, h.a.hachure('bois', 'aucun'), true), h.chemin(q, h.a.contour, true));
          });
          // la traverse, en bout
          const tr = [[-16, 0], [16, 0], [16, 22], [-16, 22]].map(L.pt);
          o.push(h.chemin(tr, h.a.blanc, true), h.chemin(tr, h.a.hachure('bois', 'aucun'), true), h.chemin(tr, h.a.contour, true));
          // la ficelle : monte par un trou, passe sur la traverse, redescend, revient dans la rainure
          const f = [[-22, -11.75], [-22, 0.3], [-17.1, 23.25], [17.1, 23.25], [22, 0.3], [22, -11.75]];
          o.push(bande(h, f.map(L.pt), 2.5 * L.k, true));
          return o.join('\n');
        },
        renvois: z => {
          const L = long(z);
          return [
            { n: 9, rond: [L.pt([-36, 0])[0], L.pt([0, 22])[1] - 24], cible: L.pt([-22, -6]), texte: 'un trou de chaque côté' },
            { n: 10, rond: [L.pt([36, 0])[0], L.pt([0, -27])[1] + 22], cible: L.pt([9, -12]), texte: 'rainure : à fleur de bois' },
          ];
        },
      },
    },
  };
};

// ─── Géométrie commune (mm ; x du talon vers la tête, y vers le haut) ───────────────────
const T = 13;                          // planche finie, un peu plus de 13 mm
const XS = [120, 700, 1280, 1860];     // traverses sur le plat, du talon à celle où part la courbe
const POINTS = [-100, -20, 20, 100];   // quatre points par traverse : bouts, et de chaque côté du joint
const r1 = v => Math.round(v * 10) / 10;
const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
const mul = (a, k) => [a[0] * k, a[1] * k];
const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
const pas = (a, b, n) => Array.from({ length: n + 1 }, (_, i) => a + (b - a) * i / n);
const lisse = t => { t = Math.max(0, Math.min(1, t)); return t * t * (3 - 2 * t); };
// largeur hors tout : 20 cm au talon, 30 au milieu, 19 à la traverse de tête
function w(x) {
  if (x <= 1000) return 200 + 100 * Math.sin(Math.PI * x / 2000);
  if (x <= 1500) return 300;
  return 300 - 110 * lisse((x - 1500) / 800);
}
function geom() {
  const P = [[1900, 0], [2220, 0], [2400, 110], [2330, 320]];
  const bz = t => { const u = 1 - t; return [0, 1].map(k => u * u * u * P[0][k] + 3 * u * u * t * P[1][k] + 3 * u * t * t * P[2][k] + t * t * t * P[3][k]); };
  const dz = t => { const u = 1 - t; return [0, 1].map(k => 3 * u * u * (P[1][k] - P[0][k]) + 6 * u * t * (P[2][k] - P[1][k]) + 3 * t * t * (P[3][k] - P[2][k])); };
  const courbe = [], haut = [[0, T]];
  for (let i = 0; i <= 48; i++) {
    const t = i / 48, p = bz(t), d = dz(t), L = Math.hypot(d[0], d[1]);
    const n = [-d[1] / L, d[0] / L];
    courbe.push(p);
    haut.push(add(p, mul(n, T)));
  }
  const d = dz(1), L = Math.hypot(d[0], d[1]);
  const u = [d[0] / L, d[1] / L], n = [-u[1], u[0]];
  const E = haut[haut.length - 1];
  const poly = [add(E, mul(u, -2)), add(E, mul(u, -34)), add(add(E, mul(u, -34)), mul(n, 22)), add(add(E, mul(u, -2)), mul(n, 22))];
  const xs = poly.map(p => p[0]);
  return {
    bas: [[0, 0], ...courbe], haut, courbe, E, u, n,
    bout: { x: P[3][0], y: P[3][1] },
    maxX: Math.max(...courbe.map(p => p[0])),
    tete: { poly, x0: Math.min(...xs), x1: E[0] },
  };
}
const S = 0.2;   // px par mm, pour le dessus et le côté : les deux vues s'alignent
function plan(z, G) {
  const X0 = 66, yc = z.h / 2 + 1;
  const pt = (x, y) => [r1(X0 + S * (G.maxX - x)), r1(yc + S * y)];
  // la corde de côté : 14 mm en dedans du bord, de la traverse où part la courbe jusque derrière la dernière
  const corde = () => {
    const xa = XS[3] + 18, xb = XS[0] - 18, xs = pas(xb, xa, 30);
    return [...xs.map(x => pt(x, -w(x) / 2 + 25)), ...[...xs].reverse().map(x => pt(x, w(x) / 2 - 25))];
  };
  return { pt, s: S, corde };
}
function traverse(h, P, x) {
  const o = [];
  const a = P.pt(x + 16, -w(x) / 2), b = P.pt(x - 16, w(x) / 2);
  o.push(h.rect(a[0], a[1], b[0] - a[0], b[1] - a[1], h.a.blanc), h.rect(a[0], a[1], b[0] - a[0], b[1] - a[1], h.a.arete));
  POINTS.forEach(yy => {
    const y = Math.sign(yy) * (Math.abs(yy) === 20 ? 20 : w(x) / 2 - 50);
    o.push(h.ligne(...P.pt(x + 24, y), ...P.pt(x - 24, y), h.a.arete));
    o.push(h.cercle(...P.pt(x + 24, y), 1.1, h.a.plein), h.cercle(...P.pt(x - 24, y), 1.1, h.a.plein));
  });
  return o.join('\n');
}
function elev(z, G) {
  const X0 = 66, yb = z.h - 58;
  return { pt: p => [r1(X0 + S * (G.maxX - p[0])), r1(yb - S * p[1])] };
}
// coupe en travers : planche de xa à xb (mm), dessus à 0, dessous à -13, rainure à chaque point
function plancheTravers(xa, xb) {
  const pts = [[xa, 0], [xb, 0], [xb, -13]];
  POINTS.filter(x => x > xa && x < xb).sort((p, q) => q - p).forEach(x => {
    pts.push([x + 1.6, -13], [x + 1.6, -10.4], [x - 1.6, -10.4], [x - 1.6, -13]);
  });
  pts.push([xa, -13]);
  return pts;
}
function trav(z) {
  const k = 1.05, cx = z.l / 2, y0 = z.h / 2 + 2;
  return { k, pt: p => [r1(cx + k * p[0]), r1(y0 - k * p[1])] };
}
function long(z) {
  const k = 2.35, cx = z.l / 2, y0 = z.h / 2 - 12;
  return { k, pt: p => [r1(cx + k * p[0]), r1(y0 - k * p[1])] };
}
// ligne brisée d'un bout coupé, de (x, ya) à (x, yb)
function zig(x, ya, yb) {
  const m = (ya + yb) / 2;
  return [[x, ya], [x - 2, m + (ya - m) * 0.35], [x + 2, m - (ya - m) * 0.35], [x, yb]];
}
// une ficelle : bande pleine d'épaisseur e autour d'une ligne brisée
function bande(h, pts, e, ferme = false) {
  const o = [];
  const segs = pts.map((p, i) => [p, pts[(i + 1) % pts.length]]).slice(0, ferme ? pts.length : pts.length - 1);
  segs.forEach(([a, b]) => {
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
    const nx = -(b[1] - a[1]) / L * e / 2, ny = (b[0] - a[0]) / L * e / 2;
    o.push(h.chemin([[a[0] + nx, a[1] + ny], [b[0] + nx, b[1] + ny], [b[0] - nx, b[1] - ny], [a[0] - nx, a[1] - ny]], h.a.plein, true));
  });
  pts.forEach(p => o.push(h.cercle(p[0], p[1], e / 2, h.a.plein)));
  return o.join('\n');
}
