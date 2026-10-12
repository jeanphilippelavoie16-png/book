// 52-02 — Dépouiller le phoque en laissant le lard sur la peau, puis décoller le lard à plat.
// Chapitre 52, section 5-E, gestes 14 et 15 ; section 3 (le lard en couche continue) ;
// matériel : lame courte et rigide pour ouvrir, lame longue et souple pour décoller le lard.

module.exports = (h) => {
  const f = v => Math.round(v * 10) / 10;
  const pt = p => `${f(p[0])} ${f(p[1])}`;
  const rad = d => d * Math.PI / 180;
  const blanc = s => s.replace('fill="none"', 'fill="#fff"');
  const coupeTrait = h.a.arete + ' stroke-dasharray="6 3.5"';

  // Courbe lisse fermée (Catmull-Rom) passant par les points.
  const lisse = pts => {
    const n = pts.length;
    let d = `M${pt(pts[0])}`;
    for (let i = 0; i < n; i++) {
      const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C${pt(c1)} ${pt(c2)} ${pt(p2)}`;
    }
    return d + 'Z';
  };

  // Un couteau vu de face : pointe, direction vers le manche.
  const couteau = (tip, dir, lb, wb, lm, wm) => {
    const n = Math.hypot(dir[0], dir[1]);
    const u = [dir[0] / n, dir[1] / n], v = [-u[1], u[0]];
    const at = (a, b) => [tip[0] + u[0] * a + v[0] * b, tip[1] + u[1] * a + v[1] * b];
    const lame = `M${pt(at(0, 0))} L${pt(at(lb, wb * 0.5))} L${pt(at(lb, -wb * 0.5))} Q${pt(at(lb * 0.3, -wb * 0.8))} ${pt(at(0, 0))}Z`;
    const mitre = h.chemin([at(lb, wb * 0.75), at(lb + 4, wb * 0.75), at(lb + 4, -wb * 0.75), at(lb, -wb * 0.75)], blanc(h.a.arete), true);
    const manche = `M${pt(at(lb + 4, wm / 2))} L${pt(at(lb + 4 + lm - 4, wm / 2))} Q${pt(at(lb + 4 + lm + 1, wm / 2))} ${pt(at(lb + 4 + lm + 1, 0))} Q${pt(at(lb + 4 + lm + 1, -wm / 2))} ${pt(at(lb + 4 + lm - 4, -wm / 2))} L${pt(at(lb + 4, -wm / 2))}Z`;
    return [
      h.path(lame, blanc(h.a.arete)),
      h.ligne(...at(lb * 0.15, 0.6), ...at(lb, 0.6), h.a.detail),
      h.path(manche, blanc(h.a.arete)),
      mitre,
      h.cercle(...at(lb + 4 + lm * 0.35, 0), 1.3, h.a.plein),
      h.cercle(...at(lb + 4 + lm * 0.72, 0), 1.3, h.a.plein),
    ].join('\n');
  };

  return {
    ref: '56-02',
    titre: 'Dépouiller le phoque, puis décoller le lard',
    desc: 'Trois vues. Un phoque couché sur le dos, vu de dessus, avec la ligne d’ouverture de la gorge à la queue. ' +
      'Une coupe du corps : d’un côté, la peau et le lard se relèvent ensemble et le couteau tranche entre le lard et le muscle, qui reste nu ; ' +
      'de l’autre, le pointillé montre où passera la lame. La peau posée à plat sur une planche, poil dessous : une lame longue et souple ' +
      'glisse à plat entre le lard et la peau, et le lard se relève d’une pièce.',
    format: 'demi',
    disposition: [['bete', 'coupe', 'plat']],
    largeurs: [[1, 2, 2]],
    vues: {
      // ─── Le phoque sur le dos, vu de dessus ────────────────────────────────────────────
      bete: {
        titre: 'Sur le dos',
        dessin: z => {
          const S = (z.h - 20) / 236, x0 = z.l / 2, y0 = 10;
          const T = ([x, y]) => [x0 + x * S, y0 + y * S];
          const droite = [
            [0, 0], [6, 1.5], [11, 6], [14, 14], [15, 24], [14, 34], [16, 44], [21, 58], [25, 68],
            [30, 76], [37, 88], [41, 98], [38, 101], [31, 95],
            [29, 104], [29, 122], [26, 145], [20, 168], [13, 186], [8, 198],
            [12, 208], [18, 222], [21, 232], [15, 231], [11, 234], [6, 231], [2, 226], [0, 214],
          ];
          const gauche = droite.slice(1, -1).reverse().map(([x, y]) => [-x, y]);
          const contour = droite.concat(gauche).map(T);
          const moust = [[[7, 6], [20, 2]], [[8, 9], [21, 9]], [[7, 12], [19, 16]]];
          return [
            h.path(lisse(contour), blanc(h.a.contour)),
            ...moust.flatMap(([a, b]) => [
              h.ligne(...T(a), ...T(b), h.a.detail),
              h.ligne(...T([-a[0], a[1]]), ...T([-b[0], b[1]]), h.a.detail),
            ]),
            h.ligne(...T([0, 30]), ...T([0, 200]), coupeTrait),
          ].join('\n');
        },
        renvois: z => {
          const S = (z.h - 20) / 236, x0 = z.l / 2, y0 = 10;
          return [
            { n: 1, rond: [z.l - 12, y0 + 158 * S], cible: [x0 + 1, y0 + 146 * S], texte: 'Ouvrir de la gorge à la queue' },
          ];
        },
      },

      // ─── La coupe du corps, pendant qu'on dépouille ─────────────────────────────────────
      coupe: {
        titre: 'D’abord, sur la bête',
        dessin: z => G(z).dessin,
        renvois: z => G(z).renvois,
      },

      // ─── La peau à plat, pendant qu'on décolle le lard ─────────────────────────────────
      plat: {
        titre: 'Ensuite, à plat',
        dessin: z => C(z).dessin,
        renvois: z => C(z).renvois,
      },
    },
  };

  // Coupe transversale : la bête sur le dos, ventre en haut.
  function G(z) {
    const cx = 90, cy = z.h - 100;
    const E = o => ({ rx: 62 - o, ry: 56 - o });
    const E0 = E(0), E1 = E(6), E2 = E(22), E3 = E(35), Ef = E(-4);
    const P = (e, t) => [cx + e.rx * Math.cos(rad(t)), cy - e.ry * Math.sin(rad(t))];
    const arc = (e, t0, t1, pas = 3) => {
      const n = Math.max(2, Math.ceil(Math.abs(t1 - t0) / pas));
      return Array.from({ length: n + 1 }, (_, i) => P(e, t0 + (t1 - t0) * i / n));
    };
    const add = (...vs) => vs.reduce((a, b) => [a[0] + b[0], a[1] + b[1]]);
    const mul = (v, k) => [v[0] * k, v[1] * k];
    const unit = v => { const n = Math.hypot(v[0], v[1]); return [v[0] / n, v[1] / n]; };
    // Charnière : le point où la lame travaille, entre lard et muscle. Le lambeau
    // (peau + lard) se replie autour d'elle et part à plat vers l'extérieur.
    // Le lambeau se replie côté peau (la peau à l'intérieur du pli, le lard à l'extérieur) :
    // le pivot est juste hors de la peau, et le lard s'ouvre en V contre le muscle.
    const TH = 15, PSI = 75, LF = 50;
    const H = P(E2, TH), Q = P(E0, TH);
    const rin = unit([H[0] - Q[0], H[1] - Q[1]]);
    const Qp = add(Q, mul(rin, -5));
    const Rs = 5, Rb = 5 + Math.hypot(P(E1, TH)[0] - Q[0], P(E1, TH)[1] - Q[1]), Rl = 5 + Math.hypot(H[0] - Q[0], H[1] - Q[1]);
    const b0 = Math.atan2(rin[1], rin[0]), b1 = b0 + rad(PSI);
    const r1 = [Math.cos(b1), Math.sin(b1)], t1 = [-Math.sin(b1), Math.cos(b1)];
    const pli = (r, c0, c1) => Array.from({ length: 13 }, (_, i) => { const a = c0 + (c1 - c0) * i / 12; return add(Qp, [r * Math.cos(a), r * Math.sin(a)]); });
    const bout = r => add(Qp, mul(r1, r), mul(t1, LF));

    const poils = [];
    const poil = (p, n, t) => poils.push(`M${pt(p)} L${pt(add(p, mul(n, 4), mul(t, 1.8)))}`);
    for (let t = 92; t <= 373; t += 4.5) {
      const p = P(E0, t), q = P(Ef, t);
      poil(p, unit([q[0] - p[0], q[1] - p[1]]), unit([Math.sin(rad(t)), Math.cos(rad(t))]));
    }
    for (let s = 4; s < LF; s += 4.5) poil(add(Qp, mul(r1, Rs), mul(t1, s)), mul(r1, -1), t1);

    const vx = cx, vy = cy + E3.ry - 9;
    const vertebre = [
      h.ligne(vx - 12, vy + 1, vx + 12, vy + 1, h.a.arete),
      h.path(`M${vx - 3} ${vy + 11} L${vx - 1.3} ${vy + 20} L${vx + 1.3} ${vy + 20} L${vx + 3} ${vy + 11}Z`, blanc(h.a.arete)),
      h.cercle(vx, vy + 9, 4.2, blanc(h.a.arete)),
      h.cercle(vx, vy + 9, 1.6, h.a.detail),
      h.cercle(vx, vy, 6, blanc(h.a.arete)),
    ];

    const dessin = [
      // muscle : anneau entier
      h.chemin(arc(E2, 0, 360).concat(arc(E3, 360, 0)), h.a.hachure('bois', 'aucun'), true),
      // côté encore attaché : peau et lard
      h.chemin(arc(E0, 90, 360 + TH).concat(arc(E1, 360 + TH, 90)), h.a.blanc, true),
      h.chemin(arc(E1, 90, 360 + TH).concat(arc(E2, 360 + TH, 90)), h.a.hachure('neige', 'aucun'), true),
      // lambeau replié : peau et lard ensemble
      h.chemin(pli(Rs, b0, b1).concat([bout(Rs), bout(Rb)], pli(Rb, b1, b0)), h.a.blanc, true),
      h.chemin(pli(Rb, b0, b1).concat([bout(Rb), bout(Rl)], pli(Rl, b1, b0)), h.a.hachure('neige', 'aucun'), true),
      // traits
      h.chemin(arc(E3, 0, 360), h.a.arete, true),
      h.chemin(arc(E2, TH, 90), h.a.arete),
      h.chemin(arc(E2, 90, 360 + TH), coupeTrait),
      h.chemin(arc(E1, 90, 360 + TH), h.a.arete),
      h.chemin(pli(Rb, b0, b1).concat([bout(Rb)]), h.a.arete),
      h.chemin(pli(Rl, b0, b1).concat([bout(Rl), bout(Rs)]), h.a.arete),
      h.ligne(...P(E0, 90), ...P(E2, 90), h.a.arete),
      h.path(poils.join(' '), h.a.detail),
      h.chemin(arc(E0, 90, 360 + TH).concat(pli(Rs, b0, b1), [bout(Rs)]), h.a.contour),
      ...vertebre,
      // second point du renvoi 3 : la peau (bande blanche du rabat)
      (() => {
        const a = [z.l - 14, 60], b = add(Qp, mul(t1, LF * 0.62), mul(r1, (Rs + Rb) / 2));
        const d = Math.hypot(b[0] - a[0], b[1] - a[1]), s0 = [a[0] + 9 * (b[0] - a[0]) / d, a[1] + 9 * (b[1] - a[1]) / d];
        return [
          `<line x1="${f(s0[0])}" y1="${f(s0[1])}" x2="${f(b[0])}" y2="${f(b[1])}" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`,
          `<line x1="${f(s0[0])}" y1="${f(s0[1])}" x2="${f(b[0])}" y2="${f(b[1])}" fill="none" stroke="#000" stroke-width="0.5" stroke-dasharray="3 2.5"/>`,
          `<circle cx="${f(b[0])}" cy="${f(b[1])}" r="1.8" fill="#000" stroke="#fff" stroke-width="0.7"/>`,
        ].join('\n');
      })(),
      couteau(add(H, [-2, -2]), [-0.2, -1], 40, 7.5, 30, 9),
    ].join('\n');

    const renvois = [
      { n: 2, rond: [z.l - 14, z.h - 14], cible: P(E2, 338), texte: 'Trancher entre lard et muscle' },
      { n: 3, rond: [z.l - 14, 60], cible: add(Qp, mul(t1, LF), mul(r1, 16)), texte: 'Peau et lard partent ensemble' },
      { n: 4, rond: [84, 30], cible: P(E2, 62), texte: 'Le muscle reste propre' },
    ];
    return { dessin, renvois };
  }

  // La peau à plat sur une planche, poil dessous ; le lard se décolle.
  function C(z) {
    const yb = z.h - 44;              // dessus de la planche
    const ys = yb - 4;                // dessous de la peau (le poil entre les deux)
    const yi = ys - 6;                // dessus de la peau = plan de coupe
    const yl = yi - 16;               // dessus du lard
    const x1 = 32, x2 = 210, J = 118; // bouts de la peau ; J : là où la lame travaille
    const L = x2 - J, PHI = 58;
    const rotc = (d, dy) => {
      const phi = rad(PHI * Math.pow(d / L, 0.6)), c = Math.cos(phi), s = Math.sin(phi);
      return [J + d * c + dy * s, yi - d * s + dy * c];
    };
    const n = 40;
    const bas = Array.from({ length: n + 1 }, (_, i) => rotc(L * i / n, 0));
    const haut = Array.from({ length: n + 1 }, (_, i) => rotc(L * i / n, -16));

    const poils = [];
    for (let x = x1 + 1; x <= x2 - 5; x += 5.5) poils.push(`M${f(x)} ${ys + 1} L${f(x + 3.8)} ${ys + 2.4}`);

    const cx = (x1 + x2) / 2 + 6;
    const cernes = [0, 1, 2].map(i => {
      const w = 80 - i * 26, dy = 12 - i * 3.5;
      return h.path(`M${f(cx - w)} ${f(yb + 20)} Q${f(cx)} ${f(yb + 20 - dy * 2)} ${f(cx + w)} ${f(yb + 20)}`, h.a.detail);
    });

    // lame longue et souple vue de chant, à plat sur la peau
    const kx = J + 1, kh = J + 62;
    const lameC = [
      h.path(`M${kx} ${yi - 0.4} L${kh} ${yi - 3.2} L${kh} ${yi - 0.4}Z`, h.a.plein),
      h.rect(kh, yi - 7, 4, 7, blanc(h.a.arete)),
      h.path(`M${kh + 4} ${yi - 0.6} L${kh + 4} ${yi - 8.5} L${kh + 29} ${yi - 8} Q${kh + 32} ${yi - 4.3} ${kh + 29} ${yi - 0.6}Z`, blanc(h.a.arete)),
    ];

    const dessin = [
      // planche, vue en bout
      h.rect(x1 - 6, yb, x2 - x1 + 12, 20, h.a.arete),
      ...cernes,
      h.path(poils.join(' '), h.a.detail),
      // peau
      h.rect(x1, yi, x2 - x1, 6, h.a.blanc),
      h.ligne(x1, ys, x2, ys, h.a.arete),
      h.ligne(x2, yi, x2, ys, h.a.arete),
      h.ligne(J, yi, x2, yi, h.a.arete),
      // lard encore collé
      h.rect(x1, yl, J - x1, 16, h.a.hachure('neige', 'aucun')),
      h.ligne(x1, yi, J, yi, coupeTrait),
      // lard relevé
      h.chemin(bas.concat(haut.slice().reverse()), h.a.hachure('neige', 'aucun'), true),
      h.chemin(bas, h.a.arete),
      h.ligne(...bas[n], ...haut[n], h.a.arete),
      h.chemin([[x1, ys], [x1, yl], [J, yl]].concat(haut), h.a.contour),
      ...lameC,
      h.fleche(`M${kx + 48} ${yi + 3} L${kx + 10} ${yi + 3}`, h.a.detail),
    ].join('\n');

    const renvois = [
      { n: 5, rond: [13, yi - 2], cible: [x1, yi + 3], texte: 'Peau poil dessous, sur du dur' },
      { n: 6, rond: [204, yi - 42], cible: [J + 40, yi - 2.2], texte: 'Lame longue et souple, à plat' },
      { n: 7, rond: [58, yl - 62], cible: rotc(L * 0.55, -16), texte: 'Lard décollé de la peau' },
    ];
    return { dessin, renvois };
  }
};
