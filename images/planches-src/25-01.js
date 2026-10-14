// Planche 25-01 — l'enveloppe croisée, avec deux couvertures et une bâche (ch. 3, §9 et étapes 7-9).
// Depuis le 13 octobre au soir, un corps ne se montre que de profil : vu de dessus, le blessé couché
// et sa tête sont retirés ; sa place est le contour du paquet, en tireté, et le paquet fermé garde son
// seul contour de couverture. Les coupes gardent le corps en forme simple (ellipse et bras ronds).
// Rouge : les deux bords qu'on rabat (le geste), et l'encadré danger.
module.exports = (h) => {
  const c = Math.SQRT1_2;
  const BACHE = 'bâche dessous, bordée ensuite';
  const f = (n) => Math.round(n * 10) / 10;

  // ─── outils ────────────────────────────────────────────────────────────────
  // Catmull-Rom centripète : une courbe douce par des points, sans boucle aux coudes serrés.
  const echant = (P) => {
    const E = [[2 * P[0][0] - P[1][0], 2 * P[0][1] - P[1][1]], ...P,
      [2 * P[P.length - 1][0] - P[P.length - 2][0], 2 * P[P.length - 1][1] - P[P.length - 2][1]]];
    const tj = (ti, a, b) => ti + Math.max(1e-3, Math.sqrt(Math.hypot(b[0] - a[0], b[1] - a[1])));
    const out = [];
    for (let i = 1; i < E.length - 2; i++) {
      const p0 = E[i - 1], p1 = E[i], p2 = E[i + 1], p3 = E[i + 2];
      const t0 = 0, t1 = tj(t0, p0, p1), t2 = tj(t1, p1, p2), t3 = tj(t2, p2, p3);
      const n = Math.max(3, Math.ceil(Math.hypot(p2[0] - p1[0], p2[1] - p1[1]) / 2.5));
      for (let k = 0; k < n; k++) {
        const t = t1 + (t2 - t1) * k / n;
        const L = (a, b, ta, tb) => [((tb - t) * a[0] + (t - ta) * b[0]) / (tb - ta), ((tb - t) * a[1] + (t - ta) * b[1]) / (tb - ta)];
        const A1 = L(p0, p1, t0, t1), A2 = L(p1, p2, t1, t2), A3 = L(p2, p3, t2, t3);
        out.push(L(L(A1, A2, t0, t2), L(A2, A3, t1, t3), t1, t2));
      }
    }
    out.push(P[P.length - 1]);
    return out;
  };
  const dpoly = (Q, ferme) => 'M' + Q.map((p) => `${f(p[0])} ${f(p[1])}`).join(' L') + (ferme ? ' Z' : '');
  const decale = (Q, e) => Q.map((p, i) => {
    const a = Q[Math.max(0, i - 1)], b = Q[Math.min(Q.length - 1, i + 1)];
    const dx = b[0] - a[0], dy = b[1] - a[1], n = Math.hypot(dx, dy) || 1;
    return [p[0] - dy / n * e, p[1] + dx / n * e];
  });
  const blancArete = h.a.arete.replace('fill="none"', 'fill="#FFFFFF"');
  const laine = h.a.hachure('isolant');          // la couverture du dessus, partout sur la planche
  const terre = h.a.hachure('terre').replace(/stroke="[^"]*"/, 'stroke="none"');
  const eau = h.a.hachure('eau');

  // Une couverture en coupe : une bande de 7 d'épaisseur qui suit la ligne donnée.
  const bande = (M, s, P, remp) => {
    const Q = echant(P).map(M);
    const A = decale(Q, 3.5 * s), B = decale(Q, -3.5 * s).reverse();
    return h.path(dpoly(A.concat(B), true), remp);
  };
  // La laine en coupe : bande blanche, et une onde continue au milieu, du même noir que ses bords.
  const bandeLaine = (M, s, P) => {
    const Q = echant(P).map(M);
    const A = decale(Q, 3.5 * s), B = decale(Q, -3.5 * s).reverse();
    const W = [];
    let L = 0;
    Q.forEach((q, i) => {
      if (i) L += Math.hypot(q[0] - Q[i - 1][0], q[1] - Q[i - 1][1]);
      const a = Q[Math.max(0, i - 1)], b = Q[Math.min(Q.length - 1, i + 1)];
      const dx = b[0] - a[0], dy = b[1] - a[1], n = Math.hypot(dx, dy) || 1;
      const e = 1.8 * s * Math.sin(2 * Math.PI * L / (9 * s));
      W.push([q[0] - dy / n * e, q[1] + dx / n * e]);
    });
    return [h.path(dpoly(A.concat(B), true), blancArete),
      h.path(dpoly(W), 'fill="none" stroke="#000000" stroke-width="0.9" stroke-linejoin="round" stroke-linecap="round"')].join('\n');
  };
  const trait = (M, P, a) => h.path(dpoly(echant(P).map(M)), a);
  const proche = (M, P, q) => {                 // le point du trait le plus près de q : la cible d'un renvoi
    const Q = echant(P).map(M), [X, Y] = M(q);
    return Q.reduce((b, p) => (Math.hypot(p[0] - X, p[1] - Y) < Math.hypot(b[0] - X, b[1] - Y) ? p : b));
  };

  // ─── en coupe : le corps, à la hauteur des aisselles ───────────────────────
  // Repère : x depuis l'axe du corps, y depuis le dessus du lit de sapin (négatif vers le haut).
  const bouteille = (M, s, x, y) => {
    const [X, Y] = M([x, y]);
    const sp = [];
    for (let i = 0; i <= 60; i++) {
      const th = -2.2 + i / 60 * 3 * Math.PI, r = (9.8 + 3.8 * i / 60) * s;
      sp.push([X + r * Math.cos(th), Y + r * Math.sin(th)]);
    }
    return [
      h.cercle(X, Y, 13.8 * s, h.a.blanc),
      h.cercle(X, Y, 8.5 * s, eau),
      h.path(dpoly(sp), h.a.arete),
    ].join('\n');
  };
  // Le torse repose sur la bouteille du haut du dos, les bras écartés pour loger celles des aisselles.
  const corps = (M, s, dy) => [
    h.ellipse(...M([0, -66 + dy]), 42 * s, 25 * s, blancArete),
    h.cercle(...M([-82, -41.5 + dy]), 12 * s, blancArete),
    h.cercle(...M([82, -41.5 + dy]), 12 * s, blancArete),
    bouteille(M, s, 0, -34 + dy),
    bouteille(M, s, 0, -104.5 + dy),
    bouteille(M, s, -56, -54 + dy),
    bouteille(M, s, 56, -54 + dy),
  ].join('\n');
  // Le pourtour du corps, écarté de d : bras, bouteille d'aisselle, épaule, bouteille de poitrine.
  const tour = (d, dy) => ({
    Lb: [-(94 + d), -33.5 + dy], Ls: [-(94 + d), -41.5 + dy],
    La: [-82 - c * (12 + d), -41.5 + dy - c * (12 + d)],
    Lp: [-56 - 0.342 * (13.5 + d), -54 + dy - 0.94 * (13.5 + d)],
    Lt: [-27 - 0.447 * d, -85.2 + dy - 0.894 * d],
    Lc: [-c * (13.5 + d), -104.5 + dy - c * (13.5 + d)],
    T: [0, -118 + dy - d],
    Rc: [c * (13.5 + d), -104.5 + dy - c * (13.5 + d)],
    Rt: [27 + 0.447 * d, -85.2 + dy - 0.894 * d],
    Rp: [56 + 0.342 * (13.5 + d), -54 + dy - 0.94 * (13.5 + d)],
    Ra: [82 + c * (12 + d), -41.5 + dy - c * (12 + d)],
    Rs: [94 + d, -41.5 + dy], Rb: [94 + d, -33.5 + dy],
  });
  const gd = (t) => [t.Lb, t.Ls, t.La, t.Lp, t.Lt, t.Lc, t.T, t.Rc, t.Rt, t.Rp, t.Ra, t.Rs, t.Rb];   // de gauche à droite
  const dg = (t) => gd(t).reverse();

  const lit = (M, x0, x1) => {
    const out = [];
    for (const r of [{ y: 9, dec: 0 }, { y: 15.5, dec: 15 }, { y: 22, dec: 7 }]) {
      for (let a = x0 - 30 + r.dec; a < x1; a += 30) {
        const aa = Math.max(a, x0), bb = Math.min(a + 34, x1);
        if (bb - aa < 16) continue;
        const m = (aa + bb) / 2, k = 11;
        const p = (t) => [(1 - t) * (1 - t) * aa + 2 * (1 - t) * t * m + t * t * bb, r.y - 2 * (1 - t) * t * k];
        const tige = [];
        for (let i = 0; i <= 12; i++) tige.push(M(p(i / 12)));
        out.push(h.path(dpoly(tige), h.a.detail));
        for (let i = 2; i <= 10; i += 2) {
          const [X, Y] = M(p(i / 12));
          out.push(h.ligne(X, Y, X - 1.6, Y + 3.4, h.a.detail), h.ligne(X, Y, X + 1.6, Y + 3.4, h.a.detail));
        }
      }
    }
    return out.join('\n');
  };
  const sol = (M, x0, x1) => {
    const [X0, Y] = M([x0, 22]), [X1] = M([x1, 22]);
    return [h.rect(X0, Y, X1 - X0, 11, terre), h.ligne(X0, Y, X1, Y, h.a.arete)].join('\n');
  };

  // ─── vu de dessus : repère en cm, x depuis l'axe du corps, y depuis le haut ──
  const plan = (z) => {
    const p = Math.min((z.l - 6) / 235, (z.h - 16) / 292);
    const ox = z.l / 2, oy = Math.max(4, (z.h - 292 * p - 16) / 2) + 25 * p;
    const P = (x, y) => [ox + x * p, oy + y * p];
    return { p, P };
  };
  const rectP = (P, p, x, y, w, ht, a) => h.rect(...P(x, y), w * p, ht * p, a);
  const bandes = (P, x0, x1, ys) => ys.map((y) => h.ligne(...P(x0, y), ...P(x1, y), h.a.detail)).join('\n');
  // Le pictogramme (règle 8) : bandes arrondies d'épaisseur égale, tête ronde sans visage, en cm.
  const F = h.formes._interne;
  const NOIR = '#1A1A1A';
  const silh = 'fill="none" stroke="' + NOIR + '" stroke-width="2.4" stroke-linejoin="round"';
  const fond = 'fill="#FFFFFF" stroke="none"';
  const tr14 = 'fill="none" stroke="' + NOIR + '" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round"';
  const peindre = (P, cmdsList) => {
    const T = (q) => P(q[0], q[1]);
    const d = cmdsList.map((c) => F.ser(c, T));
    return [...d.map((x) => h.path(x, silh)), ...d.flatMap((x) => [h.path(x, fond), h.path(x, tr14)])].join('\n');
  };
  const rond = (C, r) => F.capsule(C, [C[0], C[1] + 0.01], r);
  // La tête, vue d'en haut : un rond, la tuque sur le crâne (vers le haut de la page), son revers.
  const tete = (P, p) => {
    const C = [0, 4.5], r = 12;
    const T = (q) => P(q[0], q[1]);
    const yb = C[1] - 2.5;                                    // le bas du revers
    const arc = [];
    for (let i = 0; i <= 24; i++) {
      const th = Math.PI + i / 24 * Math.PI, y = C[1] + (r + 0.6) * Math.sin(th);
      arc.push([C[0] + (r + 0.6) * Math.cos(th), Math.min(y, yb)]);
    }
    const xb = Math.sqrt((r + 0.6) ** 2 - (yb - C[1]) ** 2);
    const cap = [[-xb, yb], ...arc.filter((q) => q[1] < yb - 0.01), [xb, yb]];
    const yr = yb - 3.4, xr = Math.sqrt((r + 0.6) ** 2 - (yr - C[1]) ** 2);
    return [
      peindre(P, [rond(C, r)]),
      h.path(dpoly(cap.map(T), true), blancArete),
      h.path(dpoly([[-xr - 0.4, yr], [xr + 0.4, yr]].map(T)), h.a.detail),
      ...[-0.55, -0.2, 0.2, 0.55].map((k) => h.ligne(...P(k * r, yr - 1.2), ...P(k * r * 0.85, C[1] - r * 0.72), h.a.detail)),
      h.cercle(...P(0, C[1] - r - 2.2), 2.4 * p * 1.1, h.a.plein),
    ].join('\n');
  };
  const paquet = (P) => {
    const q = (x, y) => P(x, y).map(f).join(' ');
    return `M${q(-16, 17)} Q${q(-28, 17)} ${q(-28, 30)} L${q(-28, 120)} Q${q(-28, 152)} ${q(-23, 168)}`
      + ` Q${q(-18, 181)} ${q(0, 181)} Q${q(18, 181)} ${q(23, 168)} Q${q(28, 152)} ${q(28, 120)}`
      + ` L${q(28, 30)} Q${q(28, 17)} ${q(16, 17)} Z`;
  };
  // La personne couchée sur le dos, vue de dessus, bras le long du corps : le pictogramme.
  // Mesures d'un adulte de 175 cm : bras 30 + avant-bras 25,5 + main ; cuisse 43, jambe 42.
  const personne = (P) => {
    const cote = (k) => [
      F.capsule([k * 10.5, 163], [k * 13.5, 172.5], 4),            // le pied, pointes en l'air
      F.capsule([k * 10, 119], [k * 10.5, 161], 6.1),               // la jambe
    ];
    const cuisse = (k) => F.capsule([k * 9, 76], [k * 10, 119], 6.1);
    const R = [[0, 20], [11, 20.3], [17.2, 22.2], [19.2, 27], [18.6, 40], [16.4, 55], [16.6, 66], [17.6, 76], [15.4, 83], [8, 85.6], [0, 85]];
    const torse = F.lisse([...R, ...R.slice(1, -1).reverse().map(([x, y]) => [-x, y])], true);
    const bras = (k) => [
      F.capsule([k * 21.6, 27.5], [k * 23.2, 56], 4.6),             // le bras
      F.capsule([k * 23.2, 56], [k * 23.6, 97], 4.6),               // l'avant-bras et la main
    ];
    return peindre(P, [...cote(-1), ...cote(1), cuisse(-1), cuisse(1), torse, ...bras(-1), ...bras(1)]);
  };

  // ─── les deux coupes : couches, du sol vers l'extérieur ─────────────────────
  const seche = (z) => {
    const s = 0.95, cx = z.l / 2 + 24, yb = z.h - 45;
    const M = (q) => [cx + s * q[0], yb + s * q[1]];
    const t = (d) => tour(d, 0);
    return {
      s, M,
      // couverture du dessus : son fond, puis son bord gauche rabattu et bordé sous le flanc droit
      b2: [[84, -16.5], [-30, -16.5], [-45, -25.5], [-92, -25.5], ...gd(t(12)), [98, -25.5], [60, -25.5], [40, -25.5]],
      // couverture du dessous : son fond, puis son bord droit rabattu par-dessus et bordé sous le flanc gauche
      b1: [[-90, -7.5], [105, -7.5], [114, -16], ...dg(t(21)), [-110, -19], [-98, -16.5], [-62, -16.5]],
      // bâche : pan gauche rabattu, bordé à droite, puis le fond…
      baIn: [[118, -9], [123, -21], ...dg(t(29)), [-122, -12], [-115, -1.5], [0, -1.5], [116, -1.5]],
      // …et le pan droit par-dessus tout, bordé sous le paquet
      baOut: [[116, -1.5], [126, -5], [130, -16], ...dg(t(36)), [-130, -14], [-124, 1], [-108, 4]],
    };
  };
  const mouillee = (z) => {
    const s = 0.8, cx = z.l / 2, yb = z.h - 45, dy = -0.5;
    const M = (q) => [cx + s * q[0], yb + s * q[1]];
    const t = (d) => tour(d, dy);
    return {
      s, M, dy,
      b1: [[-90, -4.5], [105, -4.5], [114, -13], ...dg(t(24)), [-113, -16], [-100, -13.5], [-62, -13.5]],
      b2: [[84, -13.5], [-30, -13.5], [-45, -22.5], [-92, -22.5], ...gd(t(15)), [100, -22.5], [60, -22.5], [40, -22.5]],
      // bâche contre elle : fermée autour du corps, le pan droit croisé par-dessus le gauche
      ba: [t(4).Rt, t(4).Rc, t(4).T, t(4).Lc, t(4).Lt, t(4).Lp, t(4).La, t(4).Ls, t(4).Lb, [-92, -28.3], [-45, -28.3], [-30, -19.3],
        [30, -19.3], [45, -28.3], [92, -28.3], t(4).Rb, t(4).Rs, t(9).Ra, t(9).Rp, t(9).Rt, t(9).Rc, t(9).T, t(9).Lc, t(9).Lt],
    };
  };

  return {
    ref: '25-01',
    titre: 'L’enveloppe croisée, avec deux couvertures et une bâche',
    desc: 'Montage de l’enveloppe croisée vu de dessus en trois temps, sans le corps : les deux couvertures décalées d’une demi-largeur, la place du blessé en tireté au milieu, '
      + 'le bout des pieds remonté puis le bord gauche rabattu et bordé sous le flanc droit, le bord droit rabattu par-dessus '
      + 'et bordé sous le flanc gauche. En coupe à la poitrine : lit de sapin, bâche, couvertures croisées, bouteilles '
      + 'chaudes aux aisselles, sur la poitrine et sous le haut du dos ; la bâche dehors si la personne est sèche, contre elle si elle est mouillée. '
      + 'L’encadré danger rappelle que la chaleur ne va jamais sur les bras ni les jambes.',
    format: 'pleine',
    disposition: [['v1', 'v2', 'v3'], ['seche', 'mouillee']],
    hauteurs: [1, 0.8],
    largeurs: [[1, 1, 1], [3, 2]],
    vues: {
      v1: {
        titre: 'Étendre, coucher au milieu',
        dessin: (z) => {
          const { p, P } = plan(z);
          return [
            rectP(P, p, -117.5, -25, 235, 265, h.a.arete),
            rectP(P, p, -37.5, 18, 150, 200, blancArete),
            bandes(P, -37.5, 112.5, [40, 44, 192, 196]),
            rectP(P, p, -112.5, 18, 150, 200, blancArete),
            rectP(P, p, -112.5, 18, 150, 200, laine),
            h.ligne(...P(-37.5, 18), ...P(-37.5, 218), h.a.cache),
            bandes(P, -112.5, 37.5, [40, 44, 192, 196]),
            // la place du blessé : le contour du paquet qu'on va fermer, en tireté (un corps ne se
            // montre plus vu de dessus)
            h.path(paquet(P), 'fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linejoin="round"'),
            h.path(paquet(P), h.a.cache.replace('stroke-width="0.7"', 'stroke-width="1.4"')),
            h.ligne(...P(-112.5, 222), ...P(-112.5, 258), h.a.fin),
            h.ligne(...P(-37.5, 222), ...P(-37.5, 258), h.a.fin),
            h.cote(...P(-112.5, 252), ...P(-37.5, 252), '½ largeur', { cote: 'dessous' }),
          ].join('\n');
        },
        renvois: (z) => {
          const { P } = plan(z);
          return [
            { n: 1, rond: P(-75, 232), cible: P(-117.5, 232), texte: BACHE },
            { n: 2, rond: P(-80, -3), cible: P(-72, 18), texte: 'laine, décalée' },
          ];
        },
      },
      v2: {
        titre: 'Les pieds, puis le bord gauche',
        dessin: (z) => {
          const { p, P } = plan(z);
          return [
            rectP(P, p, -117.5, -25, 235, 265, h.a.arete),
            rectP(P, p, -37.5, 18, 150, 162, blancArete),
            bandes(P, -37.5, 112.5, [40, 44]),
            rectP(P, p, -28, 18, 65.5, 162, laine),
            rectP(P, p, -37.5, 142, 150, 38, blancArete),
            bandes(P, -37.5, 112.5, [164, 168]),
            h.path(paquet(P), h.a.contour.replace('fill="none"', 'fill="url(#h-isolant)"')),
            bandes(P, -27, 27, [40, 44]),
            h.ligne(...P(8, 30), ...P(8, 166), h.a.cache),
            h.geste(`M${P(-88, 108).map(f).join(' ')} Q${P(-52, 58).map(f).join(' ')} ${P(-16, 92).map(f).join(' ')}`),
          ].join('\n');
        },
        renvois: (z) => {
          const { P } = plan(z);
          return [
            { n: 3, rond: P(80, 214), cible: P(80, 180), texte: 'pieds remontés en premier' },
            { n: 4, rond: P(80, 80), cible: P(28, 80), texte: 'bord gauche sous flanc droit' },
          ];
        },
      },
      v3: {
        titre: 'Le bord droit par-dessus',
        dessin: (z) => {
          const { p, P } = plan(z);
          return [
            rectP(P, p, -117.5, -25, 235, 265, h.a.arete),
            rectP(P, p, -37.5, 18, 20, 162, blancArete),
            bandes(P, -37.5, -17.5, [40, 44]),
            rectP(P, p, -37.5, 142, 20, 38, blancArete),
            bandes(P, -37.5, -17.5, [164, 168]),
            rectP(P, p, 17.5, 18, 20, 162, laine),
            rectP(P, p, 17.5, 142, 20, 38, laine),
            h.path(paquet(P), h.a.contour.replace('fill="none"', 'fill="#FFFFFF"')),
            bandes(P, -27, 27, [40, 44]),
            h.ligne(...P(-8, 30), ...P(-8, 166), h.a.cache),
            h.geste(`M${P(88, 108).map(f).join(' ')} Q${P(52, 58).map(f).join(' ')} ${P(16, 92).map(f).join(' ')}`),
          ].join('\n');
        },
        renvois: (z) => {
          const { P } = plan(z);
          return [{ n: 5, rond: P(-80, 90), cible: P(-28, 90), texte: 'bord droit sous flanc gauche' }];
        },
      },
      seche: {
        titre: 'En coupe, personne sèche',
        dessin: (z) => {
          const g = seche(z), M = g.M;
          return [
            sol(M, -142, 142),
            lit(M, -136, 136),
            trait(M, g.baIn, h.a.arete),
            trait(M, g.baOut, h.a.contour),
            bande(M, g.s, g.b1, blancArete),
            bandeLaine(M, g.s, g.b2),
            corps(M, g.s, 0),
            h.cote(...M([-138, 0]), ...M([-138, 22]), 'une main', { cote: 'gauche' }),
          ].join('\n');
        },
        renvois: (z) => {
          const g = seche(z), M = g.M;
          return [
            { n: 6, rond: M([146, -16]), cible: M([133, 8.5]), texte: 'sapin tassé, pointes en bas' },
            { n: 7, rond: M([-80, -158]), cible: proche(M, g.baOut, [-20, -152]), texte: 'bâche, dehors' },
            { n: 8, rond: M([45, -165]), cible: proche(M, g.b1, [12, -139]), texte: 'première couverture, unie' },
            { n: 9, rond: M([125, -148]), cible: proche(M, g.b2, [45, -112]), texte: 'laine, par-dessus' },
            { n: 10, rond: M([-150, -95]), cible: M([-56 - 0.917 * 13.5, -54 - 0.4 * 13.5]), texte: 'bouteilles dans un linge' },
          ];
        },
      },
      mouillee: {
        titre: 'En coupe, personne mouillée',
        dessin: (z) => {
          const g = mouillee(z), M = g.M;
          return [
            sol(M, -130, 130),
            lit(M, -124, 124),
            bande(M, g.s, g.b1, blancArete),
            bandeLaine(M, g.s, g.b2),
            trait(M, g.ba, h.a.contour),
            corps(M, g.s, g.dy),
          ].join('\n');
        },
        renvois: (z) => {
          const g = mouillee(z), M = g.M;
          return [{ n: 11, rond: M([-100, -150]), cible: proche(M, g.ba, [-48, -80]), texte: 'mouillée : bâche contre elle' }];
        },
      },
    },
    danger: 'Jamais de chaleur sur les bras ni les jambes : elle renvoie le sang froid au cœur. Aisselles, poitrine, haut du dos seulement.',
  };
};
