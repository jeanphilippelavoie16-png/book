// Planche 104-15a — le patron du mukluk et de sa doublure (ch. 100, §5-G étapes 37 à 41, §5-H
// étapes 42 à 47). La page b montre la botte montée et le système en coupe.
// Deux vues : les pièces de la botte à plat (la pièce de dessous et l'empeigne du mocassin, plus
// la tige qui monte au mollet et porte les trous des deux cordons) ; les pièces de la doublure à
// plat (la semelle taillée sur le gabarit du pied, deux côtés en miroir). Aucune cote : le
// chapitre n'en donne pas ; le tracé du pied donne l'échelle.

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
const seg = (a, b) => `M${a[0].toFixed(1)},${a[1].toFixed(1)} L${b[0].toFixed(1)},${b[1].toFixed(1)}`;

// ── Les pièces, en unités locales (1 unité ≈ 1 mm ; le pied tracé fait environ 235) ──────────
// Tracé du pied et pièce de dessous : les mêmes que le mocassin (planche 100-04).
// Le tracé du pied : le crayon passé autour d'un pied droit posé à plat, vu de dessus (talon à
// x = 0, gros orteil vers y négatif ; longueur 233, largeur aux orteils 95). Les cinq orteils se
// lisent : le gros, large et rond, puis quatre de plus en plus courts, séparés par le creux où le
// crayon descend entre deux orteils. Points denses, tracés tels quels.
function tracePied() {
  const corps = [[180, 47.5], [160, 49], [130, 45], [96, 38], [62, 34], [34, 31], [12, 25], [0, 6], [2, -12],
    [13, -25], [34, -31], [62, -30], [92, -27], [120, -31], [146, -41], [166, -46], [180, -47.2], [188, -47]];
  // les creux entre les orteils (où le crayon descend), du bord intérieur au bord extérieur
  const N = [[188, -47], [205, -14], [202, 2], [195, 17.5], [186, 32], [180, 47.5]];
  const bouts = [233, 227, 219, 209, 197];
  const L = (a, b, t) => a + (b - a) * t;
  let out = cr(corps, false, 10);
  for (let i = 0; i < 5; i++) {
    const [xa, ya0] = N[i], [xb, yb] = N[i + 1], t = bouts[i];
    const ya = i === 0 ? -42.5 : ya0, w = (yb - ya) / 2, cy = (ya + yb) / 2;   // le gros orteil rentre un peu
    // un côté presque droit depuis le creux, un bout arrondi, l'autre côté jusqu'au creux suivant
    const e0 = i === 0 ? 0 : 0.1, e1 = i === 4 ? 0 : 0.1, ry = w * (1 - (e0 + e1) / 2), yc = cy + w * (e0 - e1) / 2;
    const r = Math.min(w * 1.05, t - Math.max(xa, xb) - 2), xc = t - r;
    out.push(i === 0 ? [L(xa, xc, 0.55), -45.2] : [L(xa, xc, 0.5), ya + w * e0 * 0.6]);
    for (let k = 0; k <= 16; k++) {
      const a = -Math.PI / 2 + Math.PI * k / 16;
      out.push([xc + r * Math.cos(a), yc + ry * Math.sin(a)]);
    }
    out.push([L(xb, xc, 0.5), yb - w * e1 * 0.6], [xb, yb]);
  }
  return out;
}
const DESSOUS = [[-16, -84], [40, -88], [92, -92], [140, -97], [196, -98], [244, -80], [274, -46], [285, -2],
  [276, 42], [250, 78], [204, 100], [140, 104], [82, 98], [26, 92], [-16, 88]];
const EMPEIGNE = [[0, -42], [40, -44], [78, -38], [104, -22], [116, 0], [104, 22], [78, 38], [40, 44], [0, 42]];
// Tige : un morceau d'anneau. Le bord bas fait le tour de l'ouverture du pied (col de la pièce
// de dessous des deux côtés + bord arrière de l'empeigne, environ 157 + 84 + 157) ; le bord haut,
// à peine plus court, passe le mollet avec la jambe de pantalon et la doublure dedans. La tige
// est lâche à la cheville : c'est le cordon du cou-de-pied qui ferme ce jeu-là.
const LB = 398, LT = 380, HT = 200;
const RB = HT / (1 - LT / LB), RT = RB - HT, TH = LB / RB;   // rayons du bas et du haut, angle
const DEMI_EMP = 42;                               // demi-largeur du bord arrière de l'empeigne
// Doublure : semelle sur le gabarit du pied, et un côté (l'autre est son miroir).
const SEMELLE = [[-6, 2], [-2, -18], [14, -33], [45, -37], [90, -35], [130, -42], [165, -49], [196, -51],
  [222, -45], [238, -30], [244, -8], [240, 14], [226, 34], [202, 48], [168, 55], [130, 51], [80, 43], [40, 38], [10, 31]];
const COTE = [[0, -250], [4, -200], [6, -140], [4, -90], [-4, -50], [-10, -24], [-4, -6], [12, 2], [60, 6],
  [120, 8], [180, 8], [240, 6], [275, 0], [292, -12], [296, -28], [286, -44], [262, -56], [230, -66], [200, -80],
  [178, -100], [162, -130], [152, -180], [150, -250]];
const I_BAS0 = 7, I_BAS1 = 12;                      // le bord bas du côté, cousu autour de la semelle

// ── Vue 1 : la botte à plat ─────────────────────────────────────────────────────────────────
const f1 = v => v.toFixed(1);
function botte(z) {
  const s = Math.min((z.l - 34) / (301 + 396), (z.h - 44) / (216 + 88 + 22));
  const ox = 8 + 16 * s, oy = z.h / 2 + 6;                      // talon de la pièce de dessous
  const T = ([x, y]) => [ox + x * s, oy + y * s];
  const cx = z.l - 6 - 198 * s, ty = 22 + 16 * s;               // haut de la tige, au milieu
  const C = [cx, ty - RT * s];
  const A = (r, a) => [C[0] + r * s * Math.sin(a), C[1] + r * s * Math.cos(a)];
  const arc = (r, a0, a1, n = 40) => Array.from({ length: n + 1 }, (_, k) => A(r, a0 + (a1 - a0) * k / n));
  const tige = [...arc(RT, -TH / 2, TH / 2), ...arc(RB, TH / 2, -TH / 2)];
  const mh = 12 / RT, mb = 12 / RB;                             // marge aux bords de la couture arrière
  const trousHaut = Array.from({ length: 14 }, (_, k) => A(RT + 14, -TH / 2 + mh + (TH - 2 * mh) * k / 13));
  const trousCou = Array.from({ length: 15 }, (_, k) => A(RB - 24, -TH / 2 + mb + (TH - 2 * mb) * k / 14));
  const reperes = [-1, 1].map(sg => [A(RB - 7, sg * DEMI_EMP / RB), A(RB + 7, sg * DEMI_EMP / RB)]);
  const yBasTige = ty + (RB - RT) * s;
  const ex = cx - 58 * s, ey = yBasTige + 16 + 44 * s;
  const E = ([x, y]) => [ex + x * s, ey + y * s];
  return { s, T, E, A, tige, trousHaut, trousCou, reperes, cx, ty, yBasTige,
    dessous: cr(DESSOUS, false, 14).map(T), pied: tracePied().map(T), emp: cr(EMPEIGNE, false, 14).map(E) };
}

// ── Vue 2 : la doublure à plat ──────────────────────────────────────────────────────────────
function doublure(z) {
  const s = Math.min((z.l - 50) / (312 * 2 + 106 + 16), (z.h - 30) / 262);
  const oy = z.h / 2 + 125 * s + 2;                            // bas des côtés
  const xa = 10 + 296 * s + 10 + 12 * s;                        // talon du côté de droite (A)
  const xb = xa - 24 * s - 10;                                   // talon du côté de gauche (B, en miroir)
  const A = ([x, y]) => [xa + x * s, oy + y * s];
  const B = ([x, y]) => [xb - x * s, oy + y * s];
  const sx = z.l - 10 - 55 * s, sy = z.h / 2 + 122 * s;          // semelle debout, bout en haut
  const S = ([x, y]) => [sx + y * s, sy - x * s];
  const cote = cr(COTE, true, 10);
  const bas = cr(COTE.slice(I_BAS0, I_BAS1 + 1), false, 10);
  return { s, A, B, S, coteA: cote.map(A), coteB: cote.map(B), basA: bas.map(A),
    semelle: cr(SEMELLE, true, 10).map(S), pied: tracePied().map(([x, y]) => [3 + x * 0.965, 1 + y * 0.93]).map(S) };   // un peu en retrait : la semelle laisse sa marge de couture
}

module.exports = (h) => ({
  ref: '104-15a',
  titre: 'Le patron du mukluk et de sa doublure',
  desc: 'La botte à plat : la pièce de dessous tracée autour du pied et l’empeigne, les mêmes que '
    + 'le mocassin, et la tige, un morceau d’anneau dont le bord bas, plus long que le bord haut, se '
    + 'coud au col de la pièce de dessous et au bord arrière de l’empeigne ; une rangée de trous au '
    + 'poinçon sous le bord haut pour le cordon du haut, une autre au-dessus du bord bas pour le '
    + 'cordon du cou-de-pied, un repère à chaque coin de l’empeigne. La doublure à plat : une semelle '
    + 'taillée sur le gabarit du pied, marquée gauche ou droite, et deux côtés en miroir dont le bord '
    + 'bas se coud autour de la semelle.',
  format: 'pleine',
  disposition: [['botte'], ['doublure']],
  hauteurs: [1, 1],
  vues: {
    botte: {
      titre: 'La botte, à plat',
      dessin: z => {
        const g = botte(z), out = [];
        out.push(h.chemin(g.dessous, h.a.contour));
        out.push(h.chemin([g.dessous[g.dessous.length - 1], g.dessous[0]], h.a.contour));
        out.push(h.chemin(g.pied, h.a.detail, true));
        out.push(h.chemin(g.emp, h.a.contour, true));
        out.push(h.chemin(g.tige, h.a.contour, true));
        for (const t of [...g.trousHaut, ...g.trousCou]) out.push(h.cercle(t[0], t[1], 2.4, h.a.arete));
        out.push(h.path(g.reperes.map(([a, b]) => seg(a, b)).join(' '), h.a.arete));
        // les mêmes repères sur la pièce de dessous : là où tombent les coins de l'empeigne
        const rd = [3, 11].map(i => { const [x, y] = DESSOUS[i], sy = Math.sign(y); return seg(g.T([x, y - sy * 9]), g.T([x, y + sy * 9])); });
        out.push(h.path(rd.join(' '), h.a.arete));
        // second renvoi (6) sur le repère du bas de la pièce de dessous, dessiné comme les pastilles
        const [xb, yb] = DESSOUS[11], cb = g.T([xb, yb + Math.sign(yb) * 9]), pb = [cb[0] + 34, cb[1] + 26];
        const db = Math.hypot(cb[0] - pb[0], cb[1] - pb[1]), sb = [pb[0] + 9 * (cb[0] - pb[0]) / db, pb[1] + 9 * (cb[1] - pb[1]) / db];
        out.push(`<line x1="${f1(sb[0])}" y1="${f1(sb[1])}" x2="${f1(cb[0])}" y2="${f1(cb[1])}" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>`);
        out.push(`<line x1="${f1(sb[0])}" y1="${f1(sb[1])}" x2="${f1(cb[0])}" y2="${f1(cb[1])}" fill="none" stroke="#1A1A1A" stroke-width="0.5" stroke-dasharray="3 2.5"/>`);
        out.push(`<circle cx="${f1(cb[0])}" cy="${f1(cb[1])}" r="1.8" fill="#1A1A1A" stroke="#FFFFFF" stroke-width="0.7"/>`);
        out.push(`<circle cx="${f1(pb[0])}" cy="${f1(pb[1])}" r="9" fill="#FFFFFF" stroke="#1A1A1A" stroke-width="1.4"/>`);
        out.push(h.texte(pb[0], pb[1] + 4, '6', { ancre: 'middle', corps: 12 }));
        return out.join('\n');
      },
      renvois: z => {
        const g = botte(z);
        const d = g.T([90, 96]), e = g.E([112, 14]), t = g.A((RT + RB) / 2 + 10, -70 / RB);
        const th = g.trousHaut[4], tc = g.trousCou[11], rp = g.reperes[1][1];
        return [
          { n: 1, rond: [d[0] - 40, d[1] + 22], cible: [d[0] - 2, d[1] + 1], texte: 'pièce de dessous, sur le tracé du pied' },
          { n: 2, rond: [e[0] + 30, e[1] + 14], cible: [e[0] + 1, e[1] + 1], texte: 'empeigne, bout froncé comme au mocassin' },
          { n: 3, rond: [t[0] - 40, t[1] - 8], cible: [t[0], t[1]], texte: 'tige en toile enduite ou peau mince' },
          { n: 4, rond: [th[0] + 14, th[1] + 30], cible: [th[0] + 1, th[1] + 3], texte: 'trous du cordon du haut, au poinçon' },
          { n: 5, rond: [tc[0] + 30, tc[1] + 30], cible: [tc[0] + 2, tc[1] + 2], texte: 'trous du cordon du cou-de-pied' },
          { n: 6, rond: [rp[0] + 34, rp[1] + 14], cible: [rp[0] + 1, rp[1] + 1], texte: 'repère : un coin de l’empeigne' },
        ];
      },
    },
    doublure: {
      titre: 'La doublure, à plat',
      dessin: z => {
        const g = doublure(z), out = [];
        out.push(h.chemin(g.coteA, h.a.contour, true));
        out.push(h.chemin(g.coteB, h.a.contour, true));
        out.push(h.chemin(g.semelle, h.a.contour, true));
        out.push(h.chemin(g.pied, h.a.detail, true));
        // marque gauche ou droite : une croix de fil au talon de la semelle
        const m = g.S([22, 0]), r = 5;
        out.push(h.path(`${seg([m[0] - r, m[1] - r], [m[0] + r, m[1] + r])} ${seg([m[0] - r, m[1] + r], [m[0] + r, m[1] - r])}`, h.a.arete));
        return out.join('\n');
      },
      renvois: z => {
        const g = doublure(z);
        const se = g.S([150, -40]), a = g.A([80, -215]), b = g.B([80, -215]), bas = g.A([220, 7]), m = g.S([22, 0]);
        const ha = g.A([80, -250]), hb = g.B([80, -250]);
        return [
          { n: 7, rond: [se[0] - 26, se[1] - 14], cible: [se[0] - 2, se[1] - 2], texte: 'semelle sur le gabarit du pied' },
          { n: 8, rond: [ha[0], ha[1] - 24], cible: a, texte: 'duffel ou laine feutrée' },
          { n: 9, rond: [hb[0], hb[1] - 24], cible: b, texte: 'deux côtés en miroir' },
          { n: 10, rond: [bas[0] + 30, bas[1] + 24], cible: [bas[0] + 1, bas[1] + 2], texte: 'bord bas, cousu autour de la semelle' },
          { n: 11, rond: [m[0] - 34, m[1] + 6], cible: [m[0] - 6, m[1]], texte: 'marquer gauche et droite' },
        ];
      },
    },
  },
});
