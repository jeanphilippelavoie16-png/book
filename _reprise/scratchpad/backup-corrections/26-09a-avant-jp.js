// Planche 26-09a — Déplacer un blessé : la bâche roulée sur deux perches, vue de dessus et en
// coupe, et la prise sous les aisselles pour trois mètres sans rien.
module.exports = (h) => {
  const BL = h.a.blanc.split(' ')[0];
  const plein = t => t.replace('fill="none"', BL);
  const f = v => Math.round(v * 10) / 10;
  const pt = p => `${f(p[0])},${f(p[1])}`;

  // Courbe lissée (Catmull-Rom) passant par les points.
  const lisse = (P, ferme) => {
    const n = P.length, g = i => ferme ? P[(i + n) % n] : P[Math.max(0, Math.min(n - 1, i))];
    let d = `M${pt(P[0])}`;
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      d += ` C${pt([p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6])} ${pt([p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6])} ${pt(p2)}`;
    }
    return ferme ? d + ' Z' : d;
  };
  const forme = (P, a) => h.path(lisse(P, true), a);

  // Un membre : articulations et largeurs, contour lissé, bouts arrondis.
  const membre = (P, W, a) => {
    const n = P.length, G = [], D = [];
    for (let i = 0; i < n; i++) {
      const p = P[Math.max(0, i - 1)], q = P[Math.min(n - 1, i + 1)];
      const dx = q[0] - p[0], dy = q[1] - p[1], L = Math.hypot(dx, dy), k = W[i] / 2;
      G.push([P[i][0] - dy / L * k, P[i][1] + dx / L * k]);
      D.push([P[i][0] + dy / L * k, P[i][1] - dx / L * k]);
    }
    const bout = (i, j) => {
      const dx = P[i][0] - P[j][0], dy = P[i][1] - P[j][1], L = Math.hypot(dx, dy);
      return [P[i][0] + dx / L * W[i] * 0.42, P[i][1] + dy / L * W[i] * 0.42];
    };
    return forme([...G, bout(n - 1, n - 2), ...D.reverse(), bout(0, 1)], a);
  };

  // Spirale : la bâche enroulée. Le dernier point est à l'angle `fin`, rayon r1 ;
  // sens = -1 : l'enroulement arrive à `fin` en tournant à rebours.
  const spirale = (cx, cy, r0, r1, tours, fin, sens, a) => {
    const N = Math.round(tours * 40), P = [];
    for (let i = 0; i <= N; i++) {
      const t = i / N, ang = fin - sens * (1 - t) * tours * 2 * Math.PI, r = r0 + (r1 - r0) * t;
      P.push([f(cx + r * Math.cos(ang)), f(cy + r * Math.sin(ang))]);
    }
    return h.chemin(P, a);
  };

  // Un corps couché sur le dos, vu de dessus, tête à gauche. x0 : sommet du crâne ; H : taille.
  const corpsDessus = (x0, cy, H, a) => {
    const D = [
      [0, 0], [0.012, 0.03], [0.055, 0.045], [0.105, 0.037], [0.13, 0.025], [0.155, 0.027],
      [0.172, 0.07], [0.19, 0.112], [0.22, 0.128], [0.30, 0.127], [0.37, 0.124], [0.46, 0.12],
      [0.53, 0.115], [0.575, 0.11], [0.60, 0.095], [0.585, 0.082], [0.62, 0.085], [0.75, 0.068],
      [0.85, 0.06], [0.93, 0.048], [0.955, 0.068], [0.99, 0.064], [1.0, 0.042], [0.985, 0.02],
      [0.94, 0.02], [0.75, 0.013], [0.60, 0.008], [0.545, 0],
    ];
    const P = [...D, ...D.slice(1, -1).reverse().map(([x, y]) => [x, -y])]
      .map(([x, y]) => [x0 + x * H, cy + y * H]);
    const ligne = (pts) => h.path(lisse(pts.map(([x, y]) => [x0 + x * H, cy + y * H]), false), h.a.detail);
    return [
      forme(P, a),
      ligne([[0.225, 0.093], [0.34, 0.09], [0.47, 0.088], [0.56, 0.09]]),
      ligne([[0.225, -0.093], [0.34, -0.09], [0.47, -0.088], [0.56, -0.09]]),
      ligne([[0.135, -0.018], [0.142, 0], [0.135, 0.018]]),
    ].join('\n');
  };

  // ─── la prise sous les aisselles : repère en mètres × 110, origine au sol ───
  const geoPrise = z => {
    const k = Math.min((z.l - 24) / 268, (z.h - 46) / 130);
    const G = Math.min(z.h - 18, Math.round(z.h / 2 + 78 * k)), X0 = z.l - 262 * k - 14;
    const p = (x, y) => [X0 + x * k, G + y * k];
    const P = pts => pts.map(([x, y]) => p(x, y));
    const W = ws => ws.map(w => w * k);
    return { k, G, X0, p, P, W };
  };

  const tete = (g, cx, cy, r, dir, a) => {
    // dir : angle du nez, en degrés (0 = vers la droite)
    const t = dir * Math.PI / 180, c = g.p(cx, cy), R = r * g.k;
    const u = [Math.cos(t), Math.sin(t)], v = [-u[1], u[0]];
    const q = (s, w) => [c[0] + u[0] * s * R + v[0] * w * R, c[1] + u[1] * s * R + v[1] * w * R];
    return [
      forme([q(-1, 0), q(-0.72, -0.72), q(0, -1.02), q(0.62, -0.8), q(0.9, -0.35), q(1.22, -0.12),
        q(0.98, 0.12), q(0.92, 0.5), q(0.55, 0.9), q(0, 1), q(-0.72, 0.72)], a),
      h.path(`M${pt(q(-0.1, -0.28))} Q${pt(q(-0.42, -0.02))} ${pt(q(-0.1, 0.26))}`, h.a.detail),
    ].join('\n');
  };

  return {
    ref: '26-09a',
    titre: 'Déplacer un blessé : la bâche sur deux perches, la prise sous les aisselles',
    desc: 'Une bâche dont les deux bords sont roulés autour de deux perches, vue de dessus avec le blessé couché dessus, puis en coupe : la bâche fait plusieurs tours sur chaque perche et creuse sous le corps. En bas, pour trois mètres sans rien : le porteur, penché, passe les bras sous les aisselles du blessé, la tête du blessé appuyée contre son ventre, et recule en le tirant sur le bassin.',
    format: 'pleine',
    disposition: [['dessus'], ['coupe', 'prise']],
    hauteurs: [0.85, 1],
    largeurs: [[1], [2, 3]],
    vues: {
      dessus: {
        titre: 'Vu de dessus',
        dessin: z => {
          const sc = z.l / 600, cy = Math.round(z.h / 2), e = 58 * sc, xa = 96 * sc, xb = z.l - 96 * sc, rr = Math.max(7, 10 * sc);
          const out = [];
          // la bâche entre les deux roulés, œillets le long des bouts
          out.push(h.rect(xa, cy - e + rr - 1, xb - xa, 2 * (e - rr) + 2, plein(h.a.arete)));
          for (const x of [xa + 5, xb - 5]) out.push(h.ligne(x, cy - e + rr, x, cy + e - rr, h.a.fin));
          for (const x of [xa + 10, xb - 10]) for (const y of [-33, -11, 11, 33]) out.push(h.cercle(x, cy + y * sc, 2, h.a.detail));
          const S = v => f(v * sc);
          // le blessé couché au creux
          out.push(corpsDessus(xa + S(26), cy, xb - xa - S(60), plein(h.a.arete)));
          // les deux perches et leur roulé
          const pw = Math.max(3.6, 5 * sc);
          for (const s of [-1, 1]) {
            const y = cy + s * e;
            out.push(h.path(`M16,${f(y - pw)} L${z.l - 16},${f(y - pw * 0.8)} Q${z.l - 11},${f(y)} ${z.l - 16},${f(y + pw * 0.8)} L16,${f(y + pw)} Q10,${f(y)} 16,${f(y - pw)} Z`, plein(h.a.contour)));
            out.push(h.ligne(24, f(y - 1), 50, f(y - 1.3), h.a.detail));
            out.push(h.ligne(z.l - 48, f(y + 1), z.l - 24, f(y + 1.3), h.a.detail));
            out.push(h.ellipse(f(xa - 26), f(y + 1), 2.6, 1.4, h.a.detail));
            out.push(h.ellipse(f(xb + 22), f(y - 1), 2.6, 1.4, h.a.detail));
            out.push(h.path(`M${f(xa - 2)},${f(y - rr)} L${f(xb + 2)},${f(y - rr)} Q${f(xb + 6)},${f(y)} ${f(xb + 2)},${f(y + rr)} L${f(xa - 2)},${f(y + rr)} Q${f(xa - 6)},${f(y)} ${f(xa - 2)},${f(y - rr)} Z`, plein(h.a.contour)));
            out.push(h.ligne(f(xa + 2), f(y - s * rr * 0.45), f(xb - 2), f(y - s * rr * 0.45), h.a.detail));
          }
          return out.join('\n');
        },
        renvois: z => {
          const sc = z.l / 600, cy = Math.round(z.h / 2), e = 58 * sc;
          return [
            { n: 1, rond: [30, f(cy - e - 34)], cible: [36, f(cy - e + 2)], texte: 'perche, qui dépasse aux deux bouts' },
            { n: 2, rond: [z.l - 70, f(cy + e + 36)], cible: [z.l - 110, f(cy + e + 5)], texte: 'bord de la bâche roulé sur la perche' },
          ];
        },
      },
      coupe: {
        titre: 'En coupe',
        dessin: z => {
          const cx = Math.round(z.l / 2), cy = Math.round(z.h / 2 - 25), e = 76, rp = 8, r0 = 9.6, r1 = 18.4;
          const out = [];
          // la bâche qui creuse, d'un roulé à l'autre : elle quitte chaque roulé par son côté
          // intérieur, dans le fil de l'enroulement, tombe droit le long du bras et passe sous le corps
          const xs = -e + r1;
          const S = [[xs, 0], [xs, 26], [xs - 0.2, 52], [-54.2, 71.3], [-45, 74.6], [-26, 77.8], [0, 80.2]];
          const T = [...S, ...S.slice(0, -1).reverse().map(([x, y]) => [-x, y])].map(([x, y]) => [cx + x, cy + y]);
          out.push(h.path(lisse(T, false), h.a.arete));
          // le blessé en coupe : le tronc et les deux bras le long
          const cb = cy + 55;
          out.push(forme([[-44, 0], [-40, -14], [-26, -22], [0, -24], [26, -22], [40, -14], [44, 0], [38, 15], [20, 22], [0, 23], [-20, 22], [-38, 15]]
            .map(([x, y]) => [cx + x, cb + y]), plein(h.a.arete)));
          for (const s of [-1, 1]) out.push(h.ellipse(cx + s * 46.5, cb + 8, 9, 10, plein(h.a.arete)));
          // perches en bout et bâche enroulée dessus
          for (const s of [-1, 1]) {
            out.push(h.cercle(cx + s * e, cy, rp, h.a.hachure('bois', 'contour')));
            out.push(spirale(cx + s * e, cy, r0, r1, 2.5, s < 0 ? 0 : Math.PI, -s, h.a.arete));
          }
          return out.join('\n');
        },
        renvois: z => {
          const cx = Math.round(z.l / 2), cy = Math.round(z.h / 2 - 25), e = 76;
          return [
            { n: 3, rond: [cx, cy - 26], cible: [cx - e + 12, cy - 13], texte: 'plusieurs tours serrés sur la perche' },
          ];
        },
      },
      prise: {
        titre: 'Pour trois mètres, sans rien',
        dessin: z => {
          const g = geoPrise(z), { p, P, W, k, G } = g;
          const blanc = plein(h.a.contour), out = [];
          // le sol
          out.push(h.rect(0, G, z.l, 7, h.a.hachure('neige', 'aucun')));
          out.push(h.ligne(0, G, z.l, G, h.a.arete));
          const pied = (a, b, w) => membre(P([a, b]), W([w, w * 0.7]), blanc);
          // porteur : jambe du fond
          out.push(membre(P([[66, -78], [80, -44], [42, -6]]), W([20, 15, 10]), blanc));
          out.push(pied([37, -4], [62, -3], 10));
          // porteur : tronc, jambe proche, tête
          out.push(membre(P([[66, -78], [93, -94], [120, -109]]), W([32, 30, 28]), blanc));
          out.push(membre(P([[66, -78], [92, -48], [74, -6]]), W([22, 16, 11]), blanc));
          out.push(pied([69, -4], [96, -3], 10));
          out.push(membre(P([[118, -108], [134, -113]]), W([13, 12]), blanc));
          out.push(tete(g, 140, -113, 12, 62, blanc));
          // blessé : jambe du fond
          out.push(membre(P([[144, -16], [194, -18], [242, -14]]), W([22, 16, 11]), blanc));
          out.push(pied([240, -11], [248, -31], 10));
          // blessé : tronc, cou, tête contre le ventre du porteur
          out.push(membre(P([[113, -66], [104, -76]]), W([13, 12]), blanc));
          out.push(tete(g, 100, -80, 12, -40, blanc));
          out.push(membre(P([[144, -14], [130, -38], [116, -62]]), W([34, 29, 30]), blanc));
          // porteur : bras proche, qui descend devant l'épaule et passe sous l'aisselle
          out.push(membre(P([[122, -109], [120, -82], [123, -54]]), W([13, 11, 10]), blanc));
          // blessé : jambe proche
          out.push(membre(P([[144, -14], [196, -11], [245, -8]]), W([24, 17, 11]), blanc));
          out.push(pied([242, -4], [252, -26], 11));
          // blessé : bras proche, le long du flanc, par-dessus la main du porteur ; la main sur la cuisse
          out.push(membre(P([[117, -61], [126, -45], [135, -29]]), W([14, 12, 11]), blanc));
          out.push(membre(P([[135, -29], [152, -25], [168, -23]]), W([11, 10, 9]), blanc));
          // il recule
          out.push(h.fleche(`M${f(p(54, -100)[0])},${f(p(54, -100)[1])} L${f(p(10, -100)[0])},${f(p(10, -100)[1])}`));
          return out.join('\n');
        },
        renvois: z => {
          const g = geoPrise(z), { p } = g;
          return [
            { n: 4, rond: [z.l - 60, p(0, -100)[1]], cible: p(124, -64), texte: 'les bras passés sous les aisselles' },
            { n: 5, rond: [p(80, -130)[0] - 40, p(0, -130)[1]], cible: p(89, -84), texte: 'sa tête contre le ventre du porteur' },
            { n: 6, rond: [p(30, -80)[0], p(0, -80)[1]], cible: p(32, -100), texte: 'le porteur recule' },
          ];
        },
      },
    },
  };
};
