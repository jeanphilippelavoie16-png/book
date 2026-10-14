// Planche 104-15b — le mukluk monté et sa doublure (ch. 100, §5-G étapes 37 à 41, §5-H étapes 42
// à 47, §5-I étape 48, encadré 8.1). La page a donne le patron.
// Trois vues : la botte montée vue de côté, avec ses deux cordons cousus derrière et noués court
// devant, le pantalon rentré sous le cordon du haut ; la doublure montée, à la même échelle, un
// objet à part, coutures au bord ; en travers du pied, le système de la peau vers l'extérieur,
// les coutures de la doublure bord à bord, le fil en dehors. Aucune cote : le chapitre n'en
// donne pas.

// ── Outils de géométrie ────────────────────────────────────────────────────────────────────
function cr(pts, ferme = false, n = 14) {
  const N = pts.length, out = [];
  const g = i => ferme ? pts[(i + N) % N] : pts[Math.max(0, Math.min(N - 1, i))];
  const segs = ferme ? N : N - 1;
  for (let i = 0; i < segs; i++) {
    const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
    for (let k = 0; k < n; k++) {
      const t = k / n, t2 = t * t, t3 = t2 * t;
      const f = j => 0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2
        + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t3);
      out.push([f(0), f(1)]);
    }
  }
  if (!ferme) out.push(pts[N - 1]);
  return out;
}
function equi(poly, nSeg) {
  const L = [0];
  for (let i = 1; i < poly.length; i++) L.push(L[i - 1] + Math.hypot(poly[i][0] - poly[i - 1][0], poly[i][1] - poly[i - 1][1]));
  const tot = L[L.length - 1], out = [];
  for (let k = 0; k <= nSeg; k++) {
    const d = tot * k / nSeg;
    let i = 1; while (i < L.length - 1 && L[i] < d) i++;
    const a = poly[i - 1], b = poly[i], u = (d - L[i - 1]) / ((L[i] - L[i - 1]) || 1);
    const dx = b[0] - a[0], dy = b[1] - a[1], m = Math.hypot(dx, dy) || 1;
    out.push({ p: [a[0] + dx * u, a[1] + dy * u], t: [dx / m, dy / m] });
  }
  return out;
}
const pl = (p, t, a, b) => [p[0] + t[0] * a + t[1] * b, p[1] + t[1] * a - t[0] * b];
const f1 = v => v.toFixed(1);
const seg = (a, b) => `M${f1(a[0])},${f1(a[1])} L${f1(b[0])},${f1(b[1])}`;
const pts = p => p.map(([x, y]) => `${f1(x)},${f1(y)}`).join(' L');
// points de surjet : un petit trait en travers de la ligne, à intervalles réguliers
const points = (poly, n, demi) => equi(poly, n).slice(1, -1).map(P => seg(pl(P.p, P.t, 0, -demi), pl(P.p, P.t, 0, demi))).join(' ');

// ── Vue 1 : la botte montée, vue de côté ───────────────────────────────────────────────────
// Repère local : dessous du talon à l'origine, bout vers la droite, y négatif vers le haut.
const TALON = [[14, -90], [7, -72], [2, -44], [4, -16], [12, -3], [26, 0]];
const BOUT = [[212, 0], [238, -3], [256, -15], [262, -32], [255, -48], [236, -58]];
const DESSUS = [[236, -58], [208, -72], [180, -84], [156, -94]];
const AVANT = [[156, -94], [148, -110], [140, -140], [134, -190], [132, -235], [132, -275]];
const ARRIERE = [[12, -275], [9, -220], [8, -160], [10, -115], [14, -90]];
const COL = [[14, -90], [50, -86], [90, -83], [130, -82], [150, -82], [156, -94]];
const FRONCE = [[150, -82], [176, -68], [204, -56], [230, -46], [250, -37], [261, -32]];
const Y_HAUT = -263, TROUS_HAUT = [32, 58, 84, 110];
const Y_COU = -112, TROUS_COU = [30, 58, 86, 114];

function monte(z) {
  const s = Math.min((z.l - 70) / 262, (z.h - 18) / 350);
  const ox = 44, oy = z.h - 8;
  const T = ([x, y]) => [ox + x * s, oy + y * s];
  const silhouette = [...cr(ARRIERE, false, 10), ...cr(TALON, false, 10).slice(1), ...cr(BOUT, false, 10),
    ...cr(DESSUS, false, 10).slice(1), ...cr(AVANT, false, 10).slice(1)].map(T);
  return { s, T, silhouette, arriere: cr([...ARRIERE, ...TALON.slice(1)], false, 10).map(T),
    col: cr(COL, false, 10).map(T), fronce: cr(FRONCE, false, 12).map(T) };
}

// ── Vue 2 : la doublure montée, à la même échelle ──────────────────────────────────────────
const LIN = [[16, -250], [13, -190], [12, -140], [14, -96], [10, -68], [6, -40], [8, -16], [16, -5], [30, -2],
  [120, -2], [208, -2], [232, -5], [249, -16], [254, -30], [248, -44], [232, -52], [206, -63], [180, -74],
  [160, -84], [148, -98], [136, -124], [124, -165], [114, -210], [110, -250]];
const L_ARR = LIN.slice(0, 8);                     // couture arrière, du haut au talon
const L_AV = LIN.slice(12).reverse();              // couture avant, du haut jusqu'au bout
const L_BAS = [[12, -12], [30, -9], [120, -9], [208, -9], [236, -13], [251, -22]];

function lin(z, s) {
  const ox = 44, oy = z.h - 30;
  const T = ([x, y]) => [ox + x * s, oy + y * s];
  const contour = [...cr(LIN, false, 8), LIN[0]].map(T);
  return { T, contour, arr: cr(L_ARR, false, 8).map(T), av: cr(L_AV, false, 8).map(T), bas: cr(L_BAS, false, 8).map(T) };
}

// ── Vue 3 : en travers du pied, au milieu ──────────────────────────────────────────────────
// Repère local : centre du pied, y négatif vers le haut. Épaisseurs depuis la peau.
const PIED = [[-47, 6], [-44, -8], [-32, -19], [-12, -24], [10, -22], [30, -15], [44, -5], [48, 8], [42, 17],
  [20, 21], [-10, 22], [-36, 19]];
const E_MINCE = 4.5, E_EPAISSE = 10, E_DOUBL = 17.5, E_BOTTE0 = 21, E_BOTTE1 = 23.5;
function coupe(z) {
  const s = Math.min((z.h - 14) / 108, 1.9);
  const cx = z.l / 2, cy = 6 + 48 * s;
  const T = ([x, y]) => [cx + x * s, cy + y * s];
  const base = cr(PIED, true, 12);
  const N = base.length;
  const c = base.reduce((a, p) => [a[0] + p[0] / N, a[1] + p[1] / N], [0, 0]);
  const nrm = base.map((p, i) => {
    const a = base[(i - 1 + N) % N], b = base[(i + 1) % N];
    let n = [b[1] - a[1], -(b[0] - a[0])]; const m = Math.hypot(n[0], n[1]); n = [n[0] / m, n[1] / m];
    if (n[0] * (p[0] - c[0]) + n[1] * (p[1] - c[1]) < 0) n = [-n[0], -n[1]];
    return n;
  });
  const off = d => base.map((p, i) => T([p[0] + nrm[i][0] * d, p[1] + nrm[i][1] * d]));
  const P = d => (k => off(d)[(k + N) % N]);
  const pres = q => { let bi = 0, bd = 1e9; base.forEach((p, i) => { const d = Math.hypot(p[0] - q[0], p[1] - q[1]); if (d < bd) { bd = d; bi = i; } }); return bi; };
  const anneau = (d1, d2) => `M${pts(off(d2))} Z M${pts(off(d1))} Z`;
  return { s, T, off, P, anneau, N,
    coutDoubl: [pres([-40, 20]), pres([42, 18]), pres([0, -24])],
    coutBotte: [pres([-45, -8]), pres([45, -6])] };
}

module.exports = (h) => ({
  ref: '104-15b',
  titre: 'Le mukluk monté et sa doublure',
  desc: 'Vue de côté, la botte montée : la tige monte au mollet, cousue derrière, sur le pied du '
    + 'mocassin et son bout froncé ; deux cordons passés dans des trous au poinçon, un en haut sur la '
    + 'jambe de pantalon rentrée dans la tige, un au cou-de-pied, chacun cousu à l’arrière de la tige '
    + 'et noué court devant. À côté, la doublure montée, une pièce à part : couture devant, derrière '
    + 'et tout autour de la semelle. En travers du pied, de la peau vers l’extérieur : chaussette '
    + 'mince, chaussette épaisse, doublure de duffel, botte ; les coutures de la doublure sont bord '
    + 'à bord, le fil par-dessus du côté de la botte, rien contre le pied.',
  format: 'pleine',
  disposition: [['monte', 'doublure'], ['coupe']],
  hauteurs: [5, 3],
  largeurs: [[1, 1], [1]],
  vues: {
    monte: {
      titre: 'Monté, vu de côté',
      dessin: z => {
        const g = monte(z), T = g.T, out = [];
        // la jambe de pantalon, rentrée dans la tige, coupée en haut par un trait de rupture
        const pa = cr([[12, -275], [7, -300], [5, -345]], false, 8).map(T);
        const pv = cr([[132, -275], [137, -300], [139, -345]], false, 8).map(T);
        const r0 = T([5, -345]), r1 = T([139, -345]), pas = (r1[0] - r0[0]) / 6;
        const rupt = Array.from({ length: 6 }, (_, k) => `q${f1(pas / 2)},${k % 2 ? 4 : -4} ${f1(pas)},0`).join(' ');
        // charte : la jambe de pantalon, objet secondaire, en gris loin
        out.push(h.path(`M${f1(pa[0][0])},${f1(pa[0][1])} ` + pa.slice(1).map(p => `L${f1(p[0])},${f1(p[1])}`).join(' ')
          + ` ${rupt} ` + pv.slice().reverse().map(p => `L${f1(p[0])},${f1(p[1])}`).join(' ') + ' Z', h.a.loin));
        out.push(h.chemin(pa, h.a.arete));
        out.push(h.chemin(pv, h.a.arete));
        out.push(h.path(['M' + pts([[22, -280], [48, -286], [70, -281]].map(T)), 'M' + pts([[64, -292], [96, -299], [122, -290]].map(T)),
          'M' + pts([[18, -306], [40, -312], [58, -306]].map(T))].join(' '), h.a.detail));
        out.push(h.path(`M${f1(r0[0])},${f1(r0[1])} ` + rupt, h.a.detail));
        // la botte
        out.push(h.chemin(g.silhouette, h.a.contour, true));
        out.push(h.chemin([T([12, -275]), T([132, -275])], h.a.contour));
        out.push(h.chemin(g.col, h.a.arete));
        out.push(h.chemin(g.fronce, h.a.arete));
        // points : derrière (tige et talon), au col, et la couture froncée avec ses plis
        out.push(h.path(points(g.arriere, 30, 3.5), h.a.arete));
        out.push(h.path(points(g.col, 16, 3), h.a.arete));
        const fr = equi(g.fronce, 16);
        let plis = '';
        for (let i = 1; i < fr.length - 1; i++) {
          const P = fr[i];
          plis += seg(pl(P.p, P.t, 0, -2.5), pl(P.p, P.t, 0, i % 2 ? -7 : -10)) + ' ';
        }
        out.push(h.path(plis, h.a.detail));
        out.push(h.path(points(g.fronce, 16, 3), h.a.arete));
        // les deux cordons : cousus à l'arrière de la tige, dans les trous, noués court devant
        const cordon = (y, trous, xNoeud, xArr) => {
          const o = [];
          for (const x of trous) o.push(h.cercle(...T([x, y]), 2.6, h.a.arete));
          const segs = [[xArr, trous[0]], [trous[1], trous[2]], [trous[3], xNoeud]];
          o.push(h.path(segs.map(([a, b]) => seg(T([a + (a === xArr ? 0 : 3.6), y]), T([b - (b === xNoeud ? 0 : 3.6), y]))).join(' '), h.a.contour));
          // cousu à la tige : trois points en travers du cordon, juste devant la couture arrière
          o.push(h.path([5, 8.5, 12].map(d => { const t = T([xArr + d, y]); return seg([t[0], t[1] - 4.5], [t[0], t[1] + 4.5]); }).join(' '), h.a.arete));
          const k = T([xNoeud + 1.5, y]);
          o.push(h.path(`M${f1(k[0])},${f1(k[1])} q5,4 3,11 M${f1(k[0])},${f1(k[1])} q8,1 9,10`, h.a.arete));
          o.push(h.cercle(k[0], k[1], 3.4, h.a.plein));
          return o.join('\n');
        };
        out.push(cordon(Y_HAUT, TROUS_HAUT, 133, 11));
        out.push(cordon(Y_COU, TROUS_COU, 146, 10));
        return out.join('\n');
      },
      renvois: z => {
        const g = monte(z), T = g.T;
        const dos = T([8, -190]), tack = T([16, Y_HAUT]), cou = T([20, Y_COU]), haut = T([71, Y_HAUT]), nd = T([146, Y_COU]);
        return [
          { n: 1, rond: [dos[0] - 30, dos[1]], cible: [dos[0] - 2, dos[1]], texte: 'tige cousue derrière' },
          { n: 2, rond: [haut[0] + 90, haut[1] + 34], cible: [haut[0] + 2, haut[1] + 1], texte: 'cordon du haut, sur le pantalon rentré' },
          { n: 3, rond: [cou[0] - 42, cou[1] - 20], cible: [cou[0], cou[1] - 0.5], texte: 'cordon du cou-de-pied : la neige dehors' },
          { n: 4, rond: [tack[0] - 42, tack[1]], cible: [tack[0] - 1, tack[1]], texte: 'cordon cousu à l’arrière de la tige' },
          { n: 5, rond: [nd[0] + 34, nd[1] - 16], cible: [nd[0] + 3, nd[1] - 2], texte: 'noué court, rien qui pend' },
        ];
      },
    },
    doublure: {
      titre: 'La doublure montée, à part',
      dessin: z => {
        const s = monte(z).s, g = lin(z, s), out = [];
        out.push(h.chemin(g.contour, h.a.contour, true));
        out.push(h.chemin(g.bas, h.a.arete));
        out.push(h.path(points(g.arr, 24, 3.5), h.a.arete));
        out.push(h.path(points(g.av, 40, 3.5), h.a.arete));
        out.push(h.path(points(g.bas, 22, 3), h.a.arete));
        return out.join('\n');
      },
      renvois: z => {
        const s = monte(z).s, g = lin(z, s);
        const av = g.T([181, -74]), bas = g.T([150, -9]);
        return [
          { n: 6, rond: [av[0] + 30, av[1] - 34], cible: [av[0] + 2, av[1] - 3], texte: 'couture avant, sur le dessus du pied' },
          { n: 7, rond: [bas[0] - 22, bas[1] + 22], cible: [bas[0] + 1, bas[1] + 1], texte: 'couture tout autour de la semelle' },
        ];
      },
    },
    coupe: {
      titre: 'En travers du pied',
      dessin: z => {
        const g = coupe(z), out = [];
        // la neige sous la semelle
        const yb = g.T([0, 43])[1], xg = g.T([-90, 0])[0], xd = g.T([90, 0])[0];
        out.push(h.rect(xg, yb, xd - xg, 10 * g.s, h.a.hachure('neige', 'aucun')));
        out.push(h.ligne(xg, yb, xd, yb, h.a.arete));
        // botte : peau en coupe, pleine
        out.push(h.path(g.anneau(E_BOTTE0, E_BOTTE1), h.a.plein + ' fill-rule="evenodd"'));
        // doublure de duffel
        out.push(h.path(g.anneau(E_EPAISSE, E_DOUBL), h.a.hachure('isolant') + ' fill-rule="evenodd"'));
        // chaussette épaisse, chaussette mince, pied
        out.push(h.path(g.anneau(E_MINCE, E_EPAISSE), `${h.a.blanc} fill-rule="evenodd"`));
        // le pied : hachure fine à 45°, espacée
        out.push(h.chemin(g.off(0), h.a.hachure('metal', 'aucun'), true));
        // chaussette mince : gris plein uni (charte : le gris #CFCFCF, plus de troisième gris)
        out.push(h.path(g.anneau(0, E_MINCE), `${h.a.ombre} fill-rule="evenodd"`));
        // chaussette épaisse : petites boucles serrées de tricot
        { const mil = equi([...g.off((E_MINCE + E_EPAISSE) / 2), g.off((E_MINCE + E_EPAISSE) / 2)[0]], 150);
          const r = (E_EPAISSE - E_MINCE) * g.s * 0.28;
          out.push(mil.slice(0, -1).map(P => h.cercle(P.p[0], P.p[1], r, h.a.fin)).join('\n')); }
        out.push(h.chemin(g.off(E_EPAISSE), h.a.detail, true));
        out.push(h.chemin(g.off(E_MINCE), h.a.detail, true));
        out.push(h.chemin(g.off(0), h.a.detail, true));
        // coutures de la doublure : bord à bord, le fil par-dessus du côté de la botte
        for (const k of g.coutDoubl) {
          out.push(h.path(seg(g.P(E_EPAISSE)(k), g.P(E_DOUBL)(k)), h.a.arete));
          const q = [g.P(E_DOUBL - 4.5)(k - 5), g.P(E_DOUBL + 0.9)(k - 5), g.P(E_DOUBL + 0.9)(k + 5), g.P(E_DOUBL - 4.5)(k + 5)];
          out.push(h.path('M' + pts(q), h.a.arete));
        }
        return out.join('\n');
      },
      renvois: z => {
        const g = coupe(z);
        const pa = g.N * 0 + Math.round(g.N * 0.0), pb = Math.round(g.N * 0.2);
        const bt = g.T([69, 4]), db = g.T([58, 10]), cd = g.P(E_DOUBL)(g.coutDoubl[0]);
        const ep = g.off((E_MINCE + E_EPAISSE) / 2)[pa], mi = g.off(E_MINCE * 0.35)[pb], pd = g.T([4, -2]);
        return [
          { n: 8, rond: [bt[0] + 70, bt[1] - 30], cible: [bt[0] + 1, bt[1] - 1], texte: 'botte : coupe le vent et l’abrasion' },
          { n: 9, rond: [db[0] + 90, db[1] + 16], cible: [db[0], db[1]], texte: 'doublure : la pièce qui isole' },
          { n: 10, rond: [cd[0] - 70, cd[1] + 6], cible: [cd[0] - 1, cd[1] + 1], texte: 'bord à bord, le fil en dehors' },
          { n: 11, rond: [ep[0] - 90, ep[1] - 10], cible: [ep[0], ep[1]], texte: 'chaussette épaisse' },
          { n: 12, rond: [mi[0] - 110, mi[1] - 26], cible: [mi[0], mi[1]], texte: 'chaussette mince' },
        ];
      },
    },
  },
  // « Danger — » en tête : sans lui, l'encadré coupait sa première ligne trop court et le
  // vérificateur refusait la boîte, vide à droite
  danger: 'Danger — un cordon de cou-de-pied serré pour tenir une botte trop grande écrase la chaussette et le '
    + 'pied : moins d’air immobile, moins de sang chaud. Le pied arrête de faire mal avant de geler.',
});
