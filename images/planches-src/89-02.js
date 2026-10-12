// Planche 89-02 — Les contours à recopier (ch. 89, §5-B, §5-E et §9)
// Trois raquettes vues de dessus, pointe en haut, à la même échelle : la patte d'ours de
// dépannage, la queue de castor (seule cotée : 300 × 1070 mm, traverses à 380 à 410 mm), et la
// raquette de planche, taillée au même contour que la queue de castor.
// Toutes les mesures du dessin sont en cm, converties en px par K, le même pour les trois vues.

const r1 = v => Math.round(v * 10) / 10;
const Y0 = 36;                                   // haut du nez, en px dans la vue
const LONG = 107, LARGE = 30;                    // la queue de castor, d'après le chapitre
const Kde = () => 4.6;                         // px par cm, le même pour les trois vues

// Catmull-Rom : une courbe douce qui passe par chaque point de contrôle
function spline(P, n = 14, finMiroir = false) {
  const out = [];
  for (let i = 0; i < P.length - 1; i++) {
    const p0 = P[i - 1] || [-P[i + 1][0], P[i + 1][1]], p1 = P[i], p2 = P[i + 1], p3 = P[i + 2] || (finMiroir ? [-P[i][0], P[i][1]] : P[i + 1]);
    for (let k = 0; k < n; k++) {
      const t = k / n, t2 = t * t, t3 = t2 * t;
      out.push([0, 1].map(j => 0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2
        + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t3)));
    }
  }
  out.push(P[P.length - 1]);
  return out;
}
// Les deux rives d'un bâton d'épaisseur ep(y) qui suit la ligne médiane c (branche droite).
function rives(c, ep) {
  const ext = [], int = [];
  c.forEach((p, i) => {
    const a = c[Math.max(0, i - 1)], b = c[Math.min(c.length - 1, i + 1)];
    let tx = b[0] - a[0], ty = b[1] - a[1];
    const n = Math.hypot(tx, ty) || 1; tx /= n; ty /= n;
    const nx = ty, ny = -tx, e = ep(p[1]) / 2;       // normale vers l'extérieur
    ext.push([p[0] + nx * e, p[1] + ny * e]);
    int.push([p[0] - nx * e, p[1] - ny * e]);
  });
  return { ext, int };
}
const miroir = pts => pts.map(([x, y]) => [-x, y]);

// ─── La queue de castor ────────────────────────────────────────────────────────────────
// Ligne médiane du fût, branche droite : du milieu du bâton au nez jusqu'au bout, à la queue,
// où les deux branches se couchent l'une sur l'autre dans l'axe.
const CASTOR_C = spline([
  [0, 0.55], [6.2, 2.3], [10.6, 6.2], [13.0, 11.5], [14.1, 18], [14.4, 27], [14.4, 38], [14.1, 48],
  [13.4, 57], [12.3, 66], [10.6, 74], [8.2, 81], [5.5, 86.5], [3.2, 90.5], [1.6, 94.5], [0.6, 98],
  [0.1, 101], [0, 103.5], [0, 107],
]);
const epFut = y => 1.1 + 0.3 * y / LONG;          // 11 mm à la pointe, 14 mm au talon
const CASTOR = rives(CASTOR_C, epFut);
const T1 = 32, T2 = 71, LT = 2.2;                 // traverses (axe) et leur largeur, en cm
// abscisse de la rive intérieure droite à la hauteur y
function xInt(pts, y) {
  for (let i = 0; i < pts.length - 1; i++) {
    const [xa, ya] = pts[i], [xb, yb] = pts[i + 1];
    if ((ya - y) * (yb - y) <= 0 && ya !== yb) return xa + (xb - xa) * (y - ya) / (yb - ya);
  }
  return 0;
}
// Le contour extérieur d'ensemble (silhouette), de la queue au nez à gauche, puis du nez à la queue.
const silhouetteCastor = () => [...miroir(CASTOR.ext).reverse(), ...CASTOR.ext.slice(1)];

// ─── La raquette de planche : le même contour, la queue arrondie ───────────────────────
// Le contour extérieur de la queue de castor jusqu'à 86 cm, puis une queue ronde.
const Y_COUPE = 94;
function contourPlanche() {
  const P = [[0, 0]];
  for (const y of [0.6, 2, 5, 9, 14, 20, 28, 38, 48, 58, 68, 76, 82]) P.push([xInt(CASTOR.ext, y), y]);
  P.push([5.9, 87], [3.3, 91], [0, 93]);
  const droite = spline(P, 10, true);
  return [...miroir(droite).reverse(), ...droite.slice(1)];
}
// Dedans d'un polygone (règle pair-impair)
function dedans(poly, x, y) {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c;
  }
  return c;
}
// Découpe une ligne échantillonnée : garde les morceaux où garde(x, y) est vrai
function morceaux(pts, garde) {
  const out = []; let cur = [];
  for (const p of pts) {
    if (garde(p[0], p[1])) cur.push(p);
    else { if (cur.length > 1) out.push(cur); cur = []; }
  }
  if (cur.length > 1) out.push(cur);
  return out;
}
const TROU = { y1: 33.5, y2: 45, dx: 5 };         // trou des orteils de la planche, en cm (dessin seulement)
function dansTrou(x, y, marge = 0) {
  const r = TROU.dx + marge, ya = TROU.y1 + TROU.dx, yb = TROU.y2 - TROU.dx;
  if (y < ya) return Math.hypot(x, y - ya) < r;
  if (y > yb) return Math.hypot(x, y - yb) < r;
  return Math.abs(x) < r;
}
const cheminTrou = () => {
  const pts = [], r = TROU.dx, ya = TROU.y1 + r, yb = TROU.y2 - r;
  for (let k = 0; k <= 12; k++) { const a = Math.PI + k * Math.PI / 12; pts.push([r * Math.cos(a), ya + r * Math.sin(a)]); }
  for (let k = 0; k <= 12; k++) { const a = k * Math.PI / 12; pts.push([r * Math.cos(a), yb + r * Math.sin(a)]); }
  return pts;
};
const FENTE = { x: 8.6, y1: 39.5, y2: 44.5, l: 0.9 };  // les deux fentes de l'attache

// ─── La patte d'ours de dépannage ──────────────────────────────────────────────────────
// Une perche pliée en ovale ; les deux bouts se chevauchent à l'arrière.
const PO = { a: 14.4, b: 27.5, ep: 1.3 };          // demi-axes de la ligne médiane, en cm (dessin seulement)
const PO_T = 22;                                     // la traverse unique, devant les orteils
function pointOvale(t, d = 0) {                      // t : angle depuis le nez, sens horaire ; d : décalage normal
  const x = PO.a * Math.sin(t), y = PO.b * (1 - Math.cos(t));
  const tx = PO.a * Math.cos(t), ty = PO.b * Math.sin(t), n = Math.hypot(tx, ty);
  return [x + (ty / n) * d, y - (tx / n) * d];
}
const arcOvale = (t1, t2, d, n = 90) => Array.from({ length: n + 1 }, (_, k) => pointOvale(t1 + (t2 - t1) * k / n, d));
const CHEV = 0.42;                                   // demi-angle du chevauchement, autour de l'arrière (t = π)
// Les deux bouts se couchent l'un sur l'autre sur l'arrière, de t = π - CHEV à t = π + CHEV :
// le bout du dessus finit à gauche (coupe visible), celui du dessous à droite (caché).
function xIntOvale(y) {                              // demi-largeur intérieure à la hauteur y
  const yy = y - PO.b, a = PO.a - PO.ep / 2, b = PO.b - PO.ep / 2;
  const q = 1 - (yy * yy) / (b * b);
  return q > 0 ? a * Math.sqrt(q) : 0;
}

module.exports = (h) => {
  const vue = (z, cx) => {
    const K = Kde(z);
    const pt = ([x, y]) => [r1(cx + K * x), r1(Y0 + K * y)];
    const pts = a => a.map(pt);
    return { K, pt, pts };
  };
  const cxCastor = z => r1(z.l - 26 - (LARGE / 2) * Kde(z));
  const cxPatte = z => r1(z.l / 2);
  const cxPlanche = z => r1(z.l - 30 - (LARGE / 2) * Kde(z));

  return {
    ref: '89-02',
    titre: 'Les contours à recopier',
    desc: 'Trois raquettes vues de dessus, la pointe en haut, à la même échelle. À gauche, la patte d’ours de dépannage : une seule perche pliée en ovale, les deux bouts qui se chevauchent à l’arrière et sont ligaturés, une seule traverse devant les orteils ; le devant de la traverse reste ouvert, l’arrière est lacé de passes croisées en diagonale, avec le trou des orteils ouvert juste derrière la traverse. Au centre, le cadre de la queue de castor, ovale à queue courte, cotée 300 mm de large et 1070 mm de long : le milieu du bâton au nez, les deux bouts superposés et ligaturés à la queue, deux traverses espacées de 380 à 410 mm. À droite, la raquette de planche : une planche mince taillée au même contour, la queue arrondie (la silhouette de la queue de castor en tireté, nez sur nez), sans traverse ni laçage, un trou découpé pour les orteils et une fente de chaque côté pour l’attache.',
    format: 'pleine',
    disposition: [['patte', 'castor', 'planche']],
    largeurs: [[146, 236, 170]],
    vues: {
      // ── Patte d'ours de dépannage ──────────────────────────────────────────────────
      patte: {
        titre: ' ',             // titre réel centré sur le dessin, plus bas
        dessin: z => {
          const { K, pt, pts } = vue(z, cxPatte(z));
          const e = PO.ep / 2;
          const out = [h.texte(cxPatte(z), -8, 'Patte d’ours de dépannage', { corps: 13, italique: true })];
          // laçage : passes croisées en diagonale, seulement derrière la traverse, trou des orteils ouvert
          const yT = PO_T + LT / 2;
          const trou = (x, y) => y < yT + 5 && Math.hypot(x, y - yT) < 5;
          const garde = (x, y) => y > yT && Math.abs(x) < xIntOvale(y) - 0.1 && !trou(x, y);
          for (const s of [1, -1]) {
            for (let c = -70; c <= 90; c += 4.2) {
              const ligne = [];
              for (let u = -40; u <= 40; u += 0.25) ligne.push([u, c + s * u * 1.15]);
              for (const m of morceaux(ligne, garde)) out.push(h.chemin(pts(m), h.a.fin));
            }
          }
          // bord du trou des orteils, tordu autour des passes
          const bordTrou = [];
          for (let k = 0; k <= 24; k++) { const a = k * Math.PI / 24; bordTrou.push([5 * Math.cos(a), yT + 5 * Math.sin(a)]); }
          out.push(h.chemin(pts(bordTrou), h.a.detail));
          // la traverse
          const xi = xIntOvale(PO_T);
          out.push(h.rect(...pt([-xi - 0.2, PO_T - LT / 2]), r1(K * (2 * xi + 0.4)), r1(K * LT), h.a.blanc));
          out.push(h.rect(...pt([-xi - 0.2, PO_T - LT / 2]), r1(K * (2 * xi + 0.4)), r1(K * LT), h.a.arete));
          // la perche, d'un seul morceau
          const bande = [...arcOvale(0, 2 * Math.PI, e, 240), ...arcOvale(2 * Math.PI, 0, -e, 240)];
          out.push(h.chemin(pts(bande), h.a.blanc, true));
          out.push(h.chemin(pts(arcOvale(0, 2 * Math.PI, -e, 240)), h.a.arete, true));
          out.push(h.chemin(pts(arcOvale(0, 2 * Math.PI, e, 240)), h.a.contour, true));
          // les deux bouts : celui du dessus, coupé net ; celui du dessous, caché
          out.push(h.chemin(pts([pointOvale(Math.PI + CHEV, e), pointOvale(Math.PI + CHEV, -e)]), h.a.arete));
          out.push(h.chemin(pts([pointOvale(Math.PI - CHEV, e), pointOvale(Math.PI - CHEV, -e)]), h.a.cache));
          // ligatures : trois paquets de tours sur le chevauchement
          for (const t0 of [Math.PI - 0.26, Math.PI, Math.PI + 0.26])
            for (let k = -2; k <= 2; k++) {
              const t = t0 + k * 0.024;
              out.push(h.chemin(pts([pointOvale(t, e + 0.35), pointOvale(t, -e - 0.35)]), h.a.fin));
            }
          return out.join('\n');
        },
        renvois: z => {
          const { pt } = vue(z, cxPatte(z));
          const yb = r1(Y0 + Kde(z) * 2 * PO.b);
          return [
            { n: 1, rond: [22, 16], cible: pt([-5, 9]), texte: 'devant laissé ouvert' },
            { n: 2, rond: [r1(z.l - 14), 16], cible: pt([9, PO_T]), texte: 'une seule traverse, devant les orteils' },
            { n: 3, rond: [20, r1(yb + 40)], cible: pt([-2.5, PO_T + 5.4]), texte: 'trou des orteils, laissé ouvert' },
            { n: 4, rond: [r1(z.l / 2), r1(yb + 40)], cible: pt([0, 2 * PO.b + 0.7]), texte: 'bouts de la perche chevauchés, ligaturés' },
            { n: 5, rond: [r1(z.l - 16), r1(yb + 40)], cible: pt([8, 42]), texte: 'passes croisées, n’importe quelle corde' },
          ];
        },
      },
      // ── Queue de castor ────────────────────────────────────────────────────────────
      castor: {
        titre: ' ',
        dessin: z => {
          const { K, pt, pts } = vue(z, cxCastor(z));
          const out = [h.texte(cxCastor(z), -8, 'Queue de castor', { corps: 13, italique: true })];
          const G = { ext: miroir(CASTOR.ext), int: miroir(CASTOR.int) };
          // traverses
          for (const yt of [T1, T2]) {
            const xi = xInt(CASTOR.int, yt) + 0.2;
            out.push(h.rect(...pt([-xi, yt - LT / 2]), r1(K * 2 * xi), r1(K * LT), h.a.blanc));
            out.push(h.rect(...pt([-xi, yt - LT / 2]), r1(K * 2 * xi), r1(K * LT), h.a.arete));
          }
          // branche gauche (dessous à la queue), puis branche droite (dessus) qui la cache
          out.push(h.chemin(pts([...G.ext, ...G.int.slice().reverse()]), h.a.blanc, true));
          out.push(h.chemin(pts(G.int), h.a.arete));
          const iQ = CASTOR_C.findIndex(([, y]) => y > 84);
          out.push(h.chemin(pts([...CASTOR.ext.slice(iQ), ...CASTOR.int.slice(iQ).reverse()]), h.a.blanc, true));
          out.push(h.chemin(pts(CASTOR.int), h.a.arete));
          // bout de la queue, coupé droit
          out.push(h.chemin(pts([CASTOR.ext[CASTOR.ext.length - 1], CASTOR.int[CASTOR.int.length - 1]]), h.a.arete));
          // ligature des deux bouts superposés
          for (let y = 98.6; y <= 106.2; y += 0.62) out.push(h.chemin(pts([[-1.05, y + 0.25], [1.05, y - 0.25]]), h.a.fin));
          // silhouette
          out.push(h.chemin(pts(silhouetteCastor()), h.a.contour));
          // cotes : 30 cm au-dessus du nez, 107 cm à gauche, 38 à 41 cm entre les traverses
          const yC = r1(Y0 - 14), yLarge = pt([0, 36])[1];
          const [xg] = pt([-LARGE / 2, 0]), [xd] = pt([LARGE / 2, 0]);
          out.push(h.ligne(xg, yLarge - 5, xg, yC - 4, h.a.fin), h.ligne(xd, yLarge - 5, xd, yC - 4, h.a.fin));
          out.push(h.cote(xg, yC, xd, yC, '300 mm'));
          const xL = r1(pt([-LARGE / 2, 0])[0] - 16), [, yN] = pt([0, 0]), [, yQ] = pt([0, LONG]);
          out.push(h.ligne(pt([0, 0])[0] - 3, yN, xL - 5, yN, h.a.fin), h.ligne(pt([-0.7, 0])[0] - 3, yQ, xL - 5, yQ, h.a.fin));
          out.push(h.cote(xL, yN, xL, yQ, '1070 mm', { cote: 'gauche' }));
          const xT = pt([-5.5, 0])[0];
          out.push(h.cote(xT, pt([0, T1])[1], xT, pt([0, T2])[1], '380 à 410 mm', { cote: 'droite' }));
          return out.join('\n');
        },
        renvois: z => {
          const { pt } = vue(z, cxCastor(z));
          return [
            { n: 6, rond: [r1(z.l - 10), 31], cible: pt([0, 0]), texte: 'milieu du bâton au nez' },
            { n: 7, rond: [r1(z.l - 11), r1(pt([0, T1 + 13])[1])], cible: pt([10, T1]), texte: 'deux traverses, placées à l’équilibre' },
            { n: 8, rond: [r1(z.l - 11), r1(pt([0, 60])[1])], cible: pt([xInt(CASTOR.int, 60) + 0.6, 60]), texte: 'bâton : tour du gabarit plus 5 cm' },
            { n: 9, rond: [r1(z.l - 11), r1(pt([0, 100])[1])], cible: pt([0.5, 103]), texte: 'les deux bouts superposés, ligaturés' },
          ];
        },
      },
      // ── Raquette de planche ────────────────────────────────────────────────────────
      planche: {
        titre: ' ',
        dessin: z => {
          const { K, pt, pts } = vue(z, cxPlanche(z));
          const C = contourPlanche();
          const out = [h.texte(cxPlanche(z), -8, 'Raquette de planche', { corps: 13, italique: true }), h.chemin(pts(C), h.a.blanc, true)];
          // fil du bois, en long
          const fente = (x, y, m = 0) => Math.abs(Math.abs(x) - FENTE.x) < FENTE.l / 2 + m && y > FENTE.y1 - m && y < FENTE.y2 + m;
          for (const x0 of [-11.5, -7.2, -2.6, 2.1, 6.4, 10.8]) {
            const ligne = [];
            for (let y = -2; y <= 100; y += 0.5) ligne.push([x0 + 0.35 * Math.sin(y / 9 + x0), y]);
            const garde = (x, y) => dedans(C, x * 1.06, y) && y > 3 && y < Y_COUPE && !dansTrou(x, y, 1.2) && !fente(x, y, 0.8);
            for (const m of morceaux(ligne, garde)) out.push(h.chemin(pts(m), h.a.fin));
          }
          // trou des orteils et fentes de l'attache
          out.push(h.chemin(pts(cheminTrou()), h.a.arete, true));
          for (const s of [-1, 1]) out.push(h.rect(...pt([s * FENTE.x - FENTE.l / 2, FENTE.y1]), r1(K * FENTE.l), r1(K * (FENTE.y2 - FENTE.y1)), h.a.plein));
          out.push(h.chemin(pts(C), h.a.contour, true));
          // la silhouette de la queue de castor, nez sur nez, qu'on suit puis qu'on arrondit
          out.push(h.chemin(pts(silhouetteCastor()), h.a.cache));
          return out.join('\n');
        },
        renvois: z => {
          const { pt } = vue(z, cxPlanche(z));
          return [
            { n: 10, rond: [r1(z.l - 12), r1(pt([0, 22])[1])], cible: pt([3, TROU.y1 + 1.5]), texte: 'trou découpé pour les orteils' },
            { n: 11, rond: [r1(z.l - 12), r1(pt([0, 50])[1])], cible: pt([FENTE.x, 42]), texte: 'fente de chaque côté, pour l’attache' },
            { n: 12, rond: [r1(z.l - 12), r1(pt([0, 72])[1])], cible: pt([8, 72]), texte: 'planche mince, même contour, queue ronde' },
          ];
        },
      },
    },
  };
};
