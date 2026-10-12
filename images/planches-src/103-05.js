// Planche 103-05 — La coupe en spirale (chapitre 80, étape 17).
// Vue de dessus : la peau en cours de coupe. La lanière déjà coupée se décolle du bord comme
// une pelure de pomme, le couteau est au creux du V, la suite de la coupe (tireté) tourne vers
// le centre à pas constant.
module.exports = (h) => {
  const PI = Math.PI;
  const f = (n) => Math.round(n * 10) / 10;
  const d = (pts) => 'M ' + pts.map((p) => f(p[0]) + ' ' + f(p[1])).join(' L ');

  // Géométrie commune, calculée sur la taille de la vue.
  const geo = (z) => {
    const w = 15;                                   // largeur de la lanière, en unités de dessin
    const Rr = Math.min(z.l * 0.34, z.h * 0.34);     // rayon du bord restant, à la marche
    const cx = z.l * 0.52, cy = Rr + 26;
    const c = (t) => Rr - (w * (t - PI)) / (2 * PI);
    const P = (t) => [cx + c(t) * Math.cos(t), cy + c(t) * Math.sin(t)];
    const tEnd = PI + (2 * PI * (Rr - w * 0.55)) / w;
    return { w, Rr, cx, cy, c, P, tEnd };
  };

  const spirale = (P, t0, t1, pas = 0.04) => {
    const pts = [];
    for (let t = t0; t < t1; t += pas) pts.push(P(t));
    pts.push(P(t1));
    return pts;
  };

  // Ligne médiane de la lanière libre : cubiques de Bézier échantillonnées.
  const bez = (p0, p1, p2, p3, n = 24) => {
    const out = [];
    for (let i = 0; i <= n; i++) {
      const s = i / n, m = 1 - s;
      out.push([
        m * m * m * p0[0] + 3 * m * m * s * p1[0] + 3 * m * s * s * p2[0] + s * s * s * p3[0],
        m * m * m * p0[1] + 3 * m * m * s * p1[1] + 3 * m * s * s * p2[1] + s * s * s * p3[1],
      ]);
    }
    return out;
  };

  const laniere = (z, g) => {
    const S0 = [g.cx - g.Rr + g.w / 2, g.cy];
    const bas = z.h - 26;
    const A = [g.cx - g.Rr - 24, g.cy + g.Rr * 0.62];
    const B = [g.cx - g.Rr * 0.1, bas];
    const C = [z.l - 30, bas - 44];
    const D = [z.l - 66, bas - 60];
    let m = bez(S0, [S0[0] - 5, S0[1] + 12], [A[0] + 2, A[1] - 26], A);
    m = m.concat(bez(A, [A[0] - 2, A[1] + 34], [B[0] - 60, B[1]], B).slice(1));
    m = m.concat(bez(B, [B[0] + 60, B[1]], [C[0] + 4, C[1] + 26], C).slice(1));
    m = m.concat(bez(C, [C[0] - 3, C[1] - 16], [D[0] + 14, D[1] + 4], D, 14).slice(1));
    // longueur cumulée, pour effiler la pointe
    const s = [0];
    for (let i = 1; i < m.length; i++) s.push(s[i - 1] + Math.hypot(m[i][0] - m[i - 1][0], m[i][1] - m[i - 1][1]));
    const L = s[s.length - 1];
    const ext = [], int = [];
    for (let i = 0; i < m.length; i++) {
      const a = m[Math.max(0, i - 1)], b = m[Math.min(m.length - 1, i + 1)];
      const dx = b[0] - a[0], dy = b[1] - a[1], n = Math.hypot(dx, dy) || 1;
      const nx = dy / n, ny = -dx / n;             // normale côté intérieur (vers le centre au départ)
      const reste = L - s[i];
      const demi = (g.w / 2) * Math.min(1, reste / 60);
      int.push([m[i][0] + nx * demi, m[i][1] + ny * demi]);
      ext.push([m[i][0] - nx * demi, m[i][1] - ny * demi]);
    }
    return { m, int, ext, pointe: m[m.length - 1], milieu: m[Math.floor(m.length * 0.45)] };
  };

  // Couteau posé au creux du V, pointe au point de coupe.
  const couteau = (K, a) => {
    const ca = Math.cos(a), sa = Math.sin(a);
    const T = (u, v) => [K[0] + 0.87 * u * ca - v * sa, K[1] + 0.87 * u * sa + v * ca];
    const lame = [T(-4, 0), T(10, 3.2), T(44, 4.5), T(44, -4.5), T(16, -4.5), T(6, -3)];
    const manche = [T(46, 5.5), T(86, 5.5), T(89, 3), T(89, -3), T(86, -5.5), T(46, -5.5)];
    return [
      h.chemin(lame, h.a.blanc, true),
      h.chemin(lame, h.a.arete, true),
      h.chemin(manche, h.a.blanc, true),
      h.chemin(manche, h.a.arete, true),
      h.ligne(...T(45, -7), ...T(45, 7), h.a.arete),
      h.cercle(...T(58, 0), 1.3, h.a.plein),
      h.cercle(...T(76, 0), 1.3, h.a.plein),
    ].join('\n');
  };

  return {
    ref: '103-05',
    titre: 'La coupe en spirale',
    desc: 'Vue de dessus d’une peau ronde en cours de coupe : la lanière déjà coupée se détache du bord et traîne en boucle, le couteau travaille au bord extérieur, et le tracé qui reste à couper tourne vers le centre en gardant partout la même largeur.',
    format: 'quart',
    disposition: [['peau']],
    vues: {
      peau: {
        dessin: (z) => {
          const g = geo(z);
          const K = g.P(3 * PI);
          const lan = laniere(z, g);
          const tA = 1.36 * PI, tB = 1.86 * PI;       // arc du sens de coupe, en haut à droite
          const arc = spirale((t) => {
            const r = g.c(t + 2 * PI * 0) + 14;
            return [g.cx + r * Math.cos(t), g.cy + r * Math.sin(t)];
          }, tA, tB);
          return [
            // la suite de la coupe, en tireté, jusqu'au centre
            h.path(d(spirale(g.P, 3 * PI, g.tEnd)), h.a.cache),
            // le bord de ce qui reste de la peau
            h.path(d(spirale(g.P, PI, 3 * PI)), h.a.contour),
            // la lanière libre
            h.path(d(lan.int), h.a.contour),
            h.path(d(lan.ext), h.a.contour),
            // sens de coupe
            h.fleche(d(arc), h.a.arete),
            couteau(K, 0.52 * PI),
          ].join('\n');
        },
        renvois: (z) => {
          const g = geo(z);
          const lan = laniere(z, g);
          const tMid = 1.62 * PI;
          const rA = g.c(tMid) + 14;
          const bande = g.c(1.25 * PI) - g.w / 2;        // entre le bord et le premier tour, en haut à gauche
          const fin = g.P(g.tEnd);
          return [
            { n: 1, rond: [lan.pointe[0] + 26, lan.pointe[1] - 30], cible: lan.pointe, texte: 'départ au bord de la peau' },
            { n: 2, rond: [g.cx + rA * Math.cos(tMid) + 28, g.cy + rA * Math.sin(tMid) - 12], cible: [g.cx + rA * Math.cos(tMid), g.cy + rA * Math.sin(tMid)], texte: 'toujours tourner dans le même sens' },
            { n: 3, rond: [30, 34], cible: [g.cx - bande * Math.SQRT1_2, g.cy - bande * Math.SQRT1_2], texte: 'même largeur à chaque tour' },
            { n: 4, rond: [z.l - 14, g.cy - 20], cible: fin, texte: 'finir au centre' },
          ];
        },
      },
    },
  };
};
