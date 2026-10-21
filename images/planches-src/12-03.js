// Planche 12-03 — le shaputuan (ch. 12, section 5G ; 5C point 7 ; 5D points 1, 2, 4, 6, 7).
// En travers : les perches plantées penchées, cassées à la hauteur des yeux vers la poutre de
// deux épinettes posée dans une fourche en Y ; la toile des côtés sur les perches, la neige
// pelletée jusqu'aux cassures, la toile du dessus par-dessus la poutre, tenue par des épinettes
// couchées. La cassure : l'entaille, la perche cassée vers la poutre en gardant des fibres, liée
// au point de contact, l'excédent coupé. En long : les trois fourches, les épinettes des bouts,
// une porte à chaque bout, les pieux en dedans, un poêle sur pieux près de chaque porte, le tuyau
// dans sa collerette et plus haut que le faîte. Vue de dessus : l'ellipse, l'allée, les peaux,
// le sapinage du milieu vers chaque porte, le rond de neige nue, l'entrée d'air basse au vent.
// Cotes : seulement celles du chapitre, en mm (≥ 1000 de neige, Ø ≥ 80, 75 à 80°, 300–400
// entre les perches, portée sur la vue de dessus). Le reste des proportions est dessiné, pas coté.
// Passe qualité (28 sept.) : cotes en mm avec rappels et flèches, personnage de profil (13 oct.), pieux
// distincts des perches, la ligature en tours de corde, la porte montée sur la vue de dessus.

module.exports = (h) => {
  const f = v => Math.round(v * 10) / 10;
  const N = '#1A1A1A';
  const blanc = a => a.replace('fill="none"', 'fill="#ffffff"');
  const rappel = `fill="none" stroke="${N}" stroke-width="0.5" stroke-dasharray="2 2.5" stroke-linecap="round"`;
  const rad = d => d * Math.PI / 180;
  const add = (p, v, k = 1) => [p[0] + k * v[0], p[1] + k * v[1]];
  const mir = p => [-p[0], p[1]];
  const rot = (p, c, a) => {
    const s = Math.sin(a), co = Math.cos(a), dx = p[0] - c[0], dy = p[1] - c[1];
    return [c[0] + dx * co - dy * s, c[1] + dx * s + dy * co];
  };
  // une pièce de bois droite, de P à Q, demi-épaisseurs w0 et w1
  const bande = (P, Q, w0, w1 = w0) => {
    const L = Math.hypot(Q[0] - P[0], Q[1] - P[1]), u = [(Q[0] - P[0]) / L, (Q[1] - P[1]) / L], n = [-u[1], u[0]];
    return [add(P, n, w0), add(Q, n, w1), add(Q, n, -w1), add(P, n, -w0)];
  };
  const poly = (T, pts, at, ferme = true) => h.chemin(pts.map(T), at, ferme);
  // Les cotes : ligne fine, pointes pleines ; rappels fins (liseré blanc quand ils traversent une hachure).
  const pointe = (P, u) => {
    const b = [P[0] - u[0] * 5, P[1] - u[1] * 5];
    return h.chemin([P, [b[0] - u[1] * 1.5, b[1] + u[0] * 1.5], [b[0] + u[1] * 1.5, b[1] - u[0] * 1.5]], h.a.plein, true);
  };
  const ligneCote = (A, B, dehors = false) => {
    const d = Math.hypot(B[0] - A[0], B[1] - A[1]), u = [(B[0] - A[0]) / d, (B[1] - A[1]) / d];
    if (!dehors) return [h.ligne(...A, ...B, h.a.detail), pointe(A, [-u[0], -u[1]]), pointe(B, u)].join('\n');
    return [h.ligne(A[0] - 9 * u[0], A[1] - 9 * u[1], B[0] + 9 * u[0], B[1] + 9 * u[1], h.a.detail),
      pointe(A, u), pointe(B, [-u[0], -u[1]])].join('\n');
  };
  const traitRappel = (A, B) => h.ligne(...A, ...B, h.a.fin);
  const lisere = (A, B) => h.ligne(...A, ...B, `fill="none" stroke="#ffffff" stroke-width="2.8" stroke-linecap="butt"`);
  // une courbe lisse par des points (Catmull-Rom), à la suite du point courant
  const lisse = pts => {
    let d = '';
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
      d += ` C ${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
    }
    return d;
  };
  // le dessus du sapinage, en petites bosses
  const sapinage = (T, s, x0, x1, y = 0, e = 0.12) => {
    const n = Math.max(2, Math.round((x1 - x0) / 0.14)), w = (x1 - x0) / n;
    let d = `M ${f(T([x0, y])[0])} ${f(T([x0, y])[1])} L ${f(T([x0, y + e * 0.7])[0])} ${f(T([x0, y + e * 0.7])[1])}`;
    for (let i = 0; i < n; i++) {
      const c = T([x0 + (i + 0.5) * w, y + e * 1.3]), q = T([x0 + (i + 1) * w, y + e * 0.7]);
      d += ` Q ${f(c[0])} ${f(c[1])} ${f(q[0])} ${f(q[1])}`;
    }
    d += ` L ${f(T([x1, y])[0])} ${f(T([x1, y])[1])}`;
    return h.path(d, h.a.detail);
  };

  // ─── La charpente, en mètres ; y vers le haut, 0 au plancher foulé.
  const b = 1.5, OEIL = 1.7, RP = 0.05, RB = 0.075, YB = 2.6, A78 = rad(78);
  const u1 = [Math.cos(A78), Math.sin(A78)], n1 = [-u1[1], u1[0]];      // n1 : vers le dehors (gauche)
  const C = [-b + OEIL / Math.tan(A78), OEIL];                           // cassure de la perche de gauche
  const PB = [-RB, YB];                                                  // épinette gauche de la poutre
  const phi = (() => {
    const dx = PB[0] - C[0], dy = PB[1] - C[1];
    return Math.atan2(dy, dx) + Math.asin((RB + RP) / Math.hypot(dx, dy));
  })();                                                                  // la perche cassée s'appuie sur la poutre
  const u2 = [Math.cos(phi), Math.sin(phi)], n2 = [-u2[1], u2[0]];
  const BETA = A78 - phi;
  const toit = (x, k = 1) => C[1] + (-Math.abs(x) - C[0]) * Math.tan(phi) + k * RP / Math.cos(phi);
  const surPerche = x => add(C, u2, (x - C[0]) / u2[0]);
  const PK = toit(0) + 0.05;                                             // le faîte de la toile
  const pied = add([-b, 0], n1, RP), hautExt = add(C, n1, RP);            // face extérieure : la toile des côtés
  const TALUS = [[-2.45, 0.15], [-1.47, OEIL]];                          // la neige pelletée, jusqu'aux cassures

  // ─── Le plan : l'ellipse foulée, les portes, les perches tous les 0,35 m le long du bord.
  const EA = 3.8, EB = 1.5, OA = 4.75, OB = 2.45, PORTE = 0.42;
  const XP = 2.1, YP = -0.45, XT = 2.3, XF = 2.8;                       // poêle, tuyau, fourches des bouts
  const demiTour = sg => {
    const t0 = Math.asin(PORTE / EB), t1 = Math.PI - t0, K = 1500, ech = [];
    let acc = 0, prev = null;
    for (let i = 0; i <= K; i++) {
      const t = t0 + (t1 - t0) * i / K, p = [EA * Math.cos(t), sg * EB * Math.sin(t)];
      if (prev) acc += Math.hypot(p[0] - prev[0], p[1] - prev[1]);
      ech.push([acc, p]); prev = p;
    }
    const n = Math.round(acc / 0.35), out = [];
    let j = 0;
    for (let k = 0; k <= n; k++) {
      const c = acc * k / n;
      while (j < ech.length - 1 && ech[j][0] < c) j++;
      out.push(ech[j][1]);
    }
    return out;
  };
  const vent = demiTour(-1).sort((p, q) => p[0] - q[0]);                 // côté du vent : le fond de la coupe en long
  const abri = demiTour(1).sort((p, q) => p[0] - q[0]);
  const COTE_BOUT = 2.92;                                                // au-delà : les épinettes des bouts

  // ─── Échelles
  const S_LONG = 30;                                                     // commune à la coupe en long et au plan
  const tr = z => {
    const s = Math.min((z.h - 8) / (PK + 0.06 + 1.32), (z.l - 92) / 5.14);
    const x0 = z.l - 2.55 * s - 4, y0 = 4 + (PK + 0.06) * s;
    return { s, T: p => [x0 + p[0] * s, y0 - p[1] * s] };
  };
  const COUPE = 0.95;                                                   // longueur de perche escamotée dans le détail
  const de = z => {
    const s = 190, cx = 72, cy = Math.round(z.h / 2) + 31;
    const Dc = p => [cx + (p[0] - C[0]) * s, cy - (p[1] - C[1]) * s];
    return { s, Dc, Dt: p => Dc(add(p, u2, -COUPE)) };
  };
  const lo = z => {
    const s = S_LONG, x0 = z.l / 2, y0 = (z.h - 3.9 * s) / 2 + 3.58 * s;
    return { s, L: p => [x0 + p[0] * s, y0 - p[1] * s] };
  };
  const pl = z => {
    const s = S_LONG, x0 = z.l / 2, y0 = (z.h - 5.4 * s) / 2 + 2.9 * s;
    return { s, P: p => [x0 + p[0] * s, y0 + p[1] * s] };                // en plan, y vers le bas
  };

  // La cassure, géométrie partagée par le détail : la racine de l'entaille est au cœur de la perche.
  const Ci = add(C, n1, -RP), Co = add(C, n1, RP);
  const dN = rot([-n1[0], -n1[1]], [0, 0], BETA);                        // face haute de l'entaille, avant la casse
  const Ci2 = (() => {
    const rx = -n1[0] * RP, ry = -n1[1] * RP, det = -dN[0] * u1[1] + u1[0] * dN[1];
    const s = (rx * -u1[1] + u1[0] * ry) / det;
    return add(C, dN, s);
  })();
  const Lt = (0.035 - C[0]) / u2[0];                                     // de la cassure au bout coupé
  const Tp = add(PB, n2, RB);                                            // contact perche–poutre
  const tT = (Tp[0] - C[0]) * u2[0] + (Tp[1] - C[1]) * u2[1];            // le contact, compté le long de la perche
  // La ligature : des tours de corde qui passent par-dessus la perche et sous les deux billes.
  // Chaque tour, en coupe : sur le dessus de la perche (U), devant elle jusqu'à la bille de gauche,
  // sous les deux billes, autour de celle de droite, puis derrière la perche jusqu'au tour suivant.
  const RCO = 0.013, NT = 3;
  const tours = Array.from({ length: NT }, (_, k) => {
    const R = RB + RCO + k * 2.2 * RCO;
    const U = add(add(C, u2, tT + 0.08 - k * 4.5 * RCO), n2, RP + RCO);
    const tg = O => { const dx = U[0] - O[0], dy = U[1] - O[1]; return [Math.atan2(dy, dx), Math.acos(R / Math.hypot(dx, dy))]; };
    const OL = [-RB, YB], OR = [RB, YB], [aL, dL] = tg(OL), [aR, dR] = tg(OR);
    const arc = (O, t0, t1, n = 24) => Array.from({ length: n + 1 }, (_, i) => {
      const t = t0 + (t1 - t0) * i / n; return [O[0] + R * Math.cos(t), O[1] + R * Math.sin(t)];
    });
    const bas = [...arc(OL, aL + dL, 1.5 * Math.PI), ...arc(OR, 1.5 * Math.PI, aR - dR + 2 * Math.PI).slice(1)];
    // le pli sur le dessus de la perche, arrondi ; puis le brin de devant, jusqu'à la bille de gauche
    const TL = bas[0], TR = bas[bas.length - 1], rf = 0.014;
    const uIn = (() => { const v = [U[0] - TR[0], U[1] - TR[1]], l = Math.hypot(...v); return [v[0] / l, v[1] / l]; })();
    const uOut = (() => { const v = [TL[0] - U[0], TL[1] - U[1]], l = Math.hypot(...v); return [v[0] / l, v[1] / l]; })();
    const A0 = add(U, uIn, -rf), A1 = add(U, uOut, rf);
    const pli = Array.from({ length: 7 }, (_, i) => {
      const t = i / 6, m = 1 - t;
      return [m * m * A0[0] + 2 * m * t * U[0] + t * t * A1[0], m * m * A0[1] + 2 * m * t * U[1] + t * t * A1[1]];
    });
    const jambe = Array.from({ length: 9 }, (_, i) => add(A1, [TL[0] - A1[0], TL[1] - A1[1]], (i + 1) / 10));
    const retour = Array.from({ length: 9 }, (_, i) => add(TR, [A0[0] - TR[0], A0[1] - TR[1]], (i + 1) / 10));
    return { U, TL, tour: [...pli, ...jambe, ...bas, ...retour], devant: [...pli, ...jambe, TL] };
  });

  return {
    ref: '12-03',
    titre: 'Le shaputuan',
    desc: 'En travers : des épinettes plantées tout autour de l’aire foulée, penchées vers l’intérieur à 75 ou 80°, cassées à la hauteur des yeux et appuyées sur une poutre faite de deux épinettes liées, posée dans une épinette fourchue en Y ; la toile des côtés fixée aux perches, la neige pelletée contre elle jusqu’aux cassures, la toile du dessus passée par-dessus la poutre et tenue par une épinette couchée de chaque côté ; au moins 1000 mm de neige sous l’aire ; une adulte debout de profil sur les peaux, les yeux à la hauteur des cassures. La cassure : on entaille la perche, on la casse vers la poutre en gardant des fibres entre les deux parties, on la lie au point de contact par trois tours de corde qui passent par-dessus la perche et sous les deux billes de la poutre, et on coupe l’excédent ; perches de Ø 80 mm au moins. En long : trois fourches dans l’axe, les épinettes des bouts liées en haut, des pieux courts plantés en dedans contre la toile entre les perches, un poêle sur quatre pieux près de chaque porte, son tuyau qui traverse la toile du dessus dans sa collerette et sort plus haut que le faîte. Vue de dessus : l’ellipse, les perches espacées de 300 à 400 mm, une porte à chaque bout, une allée au milieu, les peaux de chaque côté, le sapinage posé du milieu vers chaque porte, un rond de neige nue autour de chaque poêle, une entrée d’air basse près de chaque poêle, du côté du vent, jamais renchaussée.',
    format: 'pleine',
    disposition: [['travers', 'cassure'], ['long'], ['dessus']],
    hauteurs: [1.35, 0.78, 1.0],
    largeurs: [[2, 1.2], [1], [1]],
    vues: {
      travers: {
        titre: 'En travers',
        dessin: z => {
          const { s, T } = tr(z), out = [];
          const XG = -2.55, SOL = -1.2, DH = 0.15;
          // la terre, puis la neige : le fond, l'aire foulée, les deux renchaussements
          out.push(poly(T, [[XG, SOL], [-XG, SOL], [-XG, SOL - 0.12], [XG, SOL - 0.12]], h.a.hachure('terre', 'aucun')));
          out.push(poly(T, [[XG, SOL], [-XG, SOL]], h.a.detail, false));
          const neigeG = [[XG, SOL], [XG, DH], ...TALUS, hautExt, [pied[0], 0]];
          out.push(poly(T, [...neigeG, ...neigeG.slice().reverse().map(mir)], h.a.hachure('neige', 'aucun')));
          for (const m of [p => p, mir]) out.push(poly(T, [[XG, DH], ...TALUS].map(m), h.a.detail, false));
          out.push(poly(T, [[pied[0], 0], [-pied[0], 0]], h.a.detail, false));
          // le sapinage, et les peaux de chaque côté de l'allée
          out.push(sapinage(T, s, -1.44, 1.44));
          for (const m of [p => p, mir]) out.push(poly(T, [[-1.4, 0.13], [-0.42, 0.13], [-0.42, 0.165], [-1.4, 0.165]].map(m), h.a.plein));
          // la fourche en Y, plantée dans l'axe
          out.push(poly(T, [[-0.055, -0.55], [-0.05, 2.3], [-0.27, 2.62], [-0.225, 2.665], [0, 2.43],
            [0.225, 2.665], [0.27, 2.62], [0.05, 2.3], [0.055, -0.55]], blanc(h.a.arete)));
          // les perches : plantées, penchées, cassées à la hauteur des yeux
          const F = add([-b, 0], u1, -0.45 / u1[1]), E = surPerche(0.035);
          for (const m of [p => p, mir]) out.push(poly(T, bande(F, C, RP).map(m), blanc(h.a.arete)));
          // la poutre : deux épinettes liées ensemble
          for (const sg of [-1, 1]) out.push(h.cercle(...T([sg * RB, YB]), RB * s, h.a.hachure('bois', 'arete')));
          const r = (RB + 0.014) * s, [ax, ay] = T([-RB, YB + RB + 0.014]), [bx] = T([RB, YB]), [, cy] = T([0, YB - RB - 0.014]);
          out.push(h.path(`M ${f(ax)} ${f(ay)} L ${f(bx)} ${f(ay)} A ${f(r)} ${f(r)} 0 0 1 ${f(bx)} ${f(cy)} L ${f(ax)} ${f(cy)} A ${f(r)} ${f(r)} 0 0 1 ${f(ax)} ${f(ay)} Z`, h.a.fin));
          for (const m of [mir, p => p]) out.push(poly(T, bande(C, E, RP, 0.042).map(m), blanc(h.a.arete)));
          // la toile des côtés, et celle du dessus par-dessus la poutre
          for (const m of [p => p, mir]) out.push(poly(T, [pied, hautExt].map(m), h.a.contour, false));
          const td = [[-1.47, OEIL + 0.005], add(C, n2, RP), [-0.1, toit(-0.1)], [0, PK]];
          out.push(poly(T, [...td, ...td.slice(0, -1).reverse().map(mir)], h.a.contour, false));
          // les épinettes couchées qui tiennent la toile du dessus
          for (const sg of [-1, 1]) out.push(h.cercle(...T([sg * 1.33, OEIL + 0.085]), 0.07 * s, h.a.hachure('bois', 'arete')));
          // une adulte debout sur les peaux, de profil (le corps simple, 1630 mm, à l'échelle de la vue),
          // tournée vers la perche de droite : ses yeux à la hauteur des cassures. La cassure se fait à la
          // hauteur des yeux de qui bâtit : OEIL = 0,165 (les peaux) + 1,54 (ses yeux) ≈ 1,7 m.
          const Y0 = 0.165, [xP, yP] = T([0.72, Y0]);
          const pers = h.formes.corps({ pose: 'debout', age: 'femme', x: xP, y: yP, echelle: s / 1000 });
          out.push(pers.toString());
          // la hauteur des yeux, reportée jusqu'à la cassure
          out.push(h.chemin([[pers.tete.x + 0.09 * s, T([0, OEIL])[1]], T([1.1, OEIL])], rappel));
          // la cote d'angle, au pied de la perche de gauche
          const V = T([-b, 0]), ra = 0.55 * s, a1 = T(add([-b, 0], u1, 0.55));
          out.push(h.path(`M ${f(V[0] + ra)} ${f(V[1])} A ${f(ra)} ${f(ra)} 0 0 0 ${f(a1[0])} ${f(a1[1])}`, h.a.detail));
          out.push(h.texte(...T([-1.25, 0.66]), '75 à 80°', { ancre: 'start' }));
          // la neige sous l'aire : au moins un mètre
          const [xg, ys] = T([XG, SOL]), [, yd] = T([XG, DH]), xc = xg - 9;
          out.push(traitRappel([xg - 2, ys], [xc - 4, ys]), traitRappel([xg - 2, yd], [xc - 4, yd]));
          out.push(ligneCote([xc, yd], [xc, ys]));
          out.push(h.texte(xc - 5, (ys + yd) / 2 + 4, '≥ 1000', { ancre: 'end' }));
          return out.join('\n');
        },
        renvois: z => {
          const { T } = tr(z);
          const R = (n, r, c, texte) => ({ n, rond: T(r), cible: T(c), texte });
          return [
            R(1, [-0.83, 1.32], [-1.2, 1.1], 'perche plantée, penchée'),
            R(2, [-0.62, 1.78], [-0.06, 1.55], 'fourche en Y'),
            R(3, [-0.34, 2.2], [-0.14, 2.61], 'poutre de deux épinettes'),
            R(4, [2.05, 1.18], [1.17, OEIL], 'cassée à hauteur des yeux'),
            R(5, [-2.15, 1.58], [-1.87, 1.07], 'neige pelletée aux cassures'),
            R(6, [1.95, 2.18], [1.38, 1.73], 'épinette couchée sur la toile'),
          ];
        },
      },

      cassure: {
        titre: 'La cassure',
        dessin: z => {
          const { s, Dc, Dt } = de(z), out = [];
          // ── En bas : la cassure, à la hauteur des yeux.
          // avant la casse : la perche droite, l'entaille ouverte du côté de la poutre
          const Lav = 0.3, Lb = 0.17, Lh = 0.2;
          out.push(poly(Dc, [add(Co, u1, Lav), Co], h.a.cache, false));
          out.push(poly(Dc, [add(Ci, u1, Lav), Ci2, C], h.a.cache, false));
          // le bas de la perche
          const Mb = add(C, u1, -Lb), Lo = add(Co, u1, -Lb), Li = add(Ci, u1, -Lb);
          out.push(poly(Dc, [Lo, Co, C, Ci, Li, add(add(Mb, n1, -0.35 * RP), u1, -0.025), add(add(Mb, n1, 0.35 * RP), u1, 0.025)], blanc(h.a.arete)));
          // le haut, cassé vers la poutre : l'entaille se referme, les fibres tiennent dehors
          const Mh = add(C, u2, Lh);
          out.push(poly(Dc, [C, rot(Ci2, C, -BETA), add(Mh, n2, -RP), add(add(Mh, n2, -0.35 * RP), u2, -0.025),
            add(add(Mh, n2, 0.35 * RP), u2, 0.025), add(Mh, n2, RP), add(C, n2, RP)], blanc(h.a.arete)));
          for (let k = 0; k < 4; k++) {
            const e = RP * (0.3 + 0.2 * k), l = 0.025 + 0.012 * k;
            const p0 = add(add(C, n1, e), u1, -l);
            const p1 = add(add(C, n1, e + 0.008), u1, 0.004);
            const p2 = rot(add(add(C, n1, e), u1, l), C, -BETA);
            out.push(poly(Dc, [p0, p1, p2], h.a.fin, false));
          }
          // le geste : on casse vers la poutre
          const rg = 0.26, g0 = Dc(add(C, [Math.cos(rad(98)), Math.sin(rad(98))], rg)), g1 = Dc(add(C, [Math.cos(rad(63)), Math.sin(rad(63))], rg));
          out.push(h.geste(`M ${f(g0[0])} ${f(g0[1])} A ${f(rg * s)} ${f(rg * s)} 0 0 1 ${f(g1[0])} ${f(g1[1])}`));
          // le diamètre, sur le tronçon du bas : les rappels prolongent les deux bords sous la cassure
          const r0 = Lb + 0.012, r1 = Lb + 0.13, rk = Lb + 0.105;
          out.push(traitRappel(Dc(add(Co, u1, -r0)), Dc(add(Co, u1, -r1))), traitRappel(Dc(add(Ci, u1, -r0)), Dc(add(Ci, u1, -r1))));
          const K0 = Dc(add(Co, u1, -rk)), K1 = Dc(add(Ci, u1, -rk)), serre = 2 * RP * s < 20;
          out.push(ligneCote(K0, K1, serre));
          out.push(h.texte(K0[0] - (serre ? 12 : 4), K0[1] + 4, 'Ø ≥ 80', { ancre: 'end' }));
          // ── En haut : la perche posée sur la poutre, liée, l'excédent coupé.
          for (const sg of [-1, 1]) out.push(h.cercle(...Dt([sg * RB, YB]), RB * s, h.a.hachure('bois', 'arete')));
          // la corde en bande : fond blanc, deux bords au trait fin
          const lc = 2 * RCO * s;
          const bande = (pts, ferme) => {
            const q = pts.map(Dt), n = q.length, G = [], D = [];
            for (let i = 0; i < n; i++) {
              const a = ferme ? q[(i - 1 + n) % n] : q[Math.max(0, i - 1)], c = ferme ? q[(i + 1) % n] : q[Math.min(n - 1, i + 1)];
              const t = [c[0] - a[0], c[1] - a[1]], l = Math.hypot(t[0], t[1]) || 1, nn = [-t[1] / l, t[0] / l];
              G.push([q[i][0] + nn[0] * lc / 2, q[i][1] + nn[1] * lc / 2]); D.push([q[i][0] - nn[0] * lc / 2, q[i][1] - nn[1] * lc / 2]);
            }
            const pl = L => L.map((p, i) => `${i ? 'L' : 'M'} ${f(p[0])} ${f(p[1])}`).join(' ');
            // les torons : un petit trait en biais d'un bord à l'autre, tous les ~0,9 largeur
            const tr = [], qq = ferme ? [...q, q[0]] : q;
            let acc = lc * 0.5;
            for (let i = 0; i < qq.length - 1; i++) {
              const a = qq[i], c = qq[i + 1], L = Math.hypot(c[0] - a[0], c[1] - a[1]);
              if (!L) continue;
              const t = [(c[0] - a[0]) / L, (c[1] - a[1]) / L], nn = [-t[1], t[0]], w2 = lc / 2 - 0.5;
              while (acc <= L) {
                const p = [a[0] + t[0] * acc, a[1] + t[1] * acc];
                const p0 = [p[0] + nn[0] * w2 - t[0] * lc * 0.3, p[1] + nn[1] * w2 - t[1] * lc * 0.3];
                const p1 = [p[0] - nn[0] * w2 + t[0] * lc * 0.3, p[1] - nn[1] * w2 + t[1] * lc * 0.3];
                tr.push(`M ${f(p0[0])} ${f(p0[1])} Q ${f(p[0] + t[0] * lc * 0.12)} ${f(p[1] + t[1] * lc * 0.12)} ${f(p1[0])} ${f(p1[1])}`);
                acc += lc * 0.9;
              }
              acc -= L;
            }
            const torons = tr.length ? h.path(tr.join(' '), h.a.fin) : '';
            if (ferme) return [h.path(`${pl(G)} Z ${pl(D)} Z`, 'fill="#ffffff" stroke="none" fill-rule="evenodd"'),
              h.path(`${pl(G)} Z`, h.a.detail), h.path(`${pl(D)} Z`, h.a.detail), torons].join('\n');
            return [h.path(`${pl([...G, ...D.slice().reverse()])} Z`, 'fill="#ffffff" stroke="none"'), h.path(pl(G), h.a.detail), h.path(pl(D), h.a.detail), torons].join('\n');
          };
          // les tours entiers d'abord : la perche cachera leur retour, qui passe derrière elle
          for (let k = NT - 1; k >= 0; k--) out.push(bande(tours[k].tour, true));
          const S0 = add(C, u2, tT - 0.24), E = add(C, u2, Lt);
          out.push(poly(Dt, [add(S0, n2, RP), add(E, n2, RP), add(E, n2, -RP), add(S0, n2, -RP),
            add(add(S0, n2, -0.35 * RP), u2, -0.025), add(add(S0, n2, 0.35 * RP), u2, 0.025)], blanc(h.a.arete)));
          out.push(poly(Dt, [add(E, n2, -RP), add(add(E, n2, -RP), u2, 0.08), add(add(E, n2, RP), u2, 0.08), add(E, n2, RP)], h.a.cache, false));
          // puis le brin de devant de chaque tour, par-dessus la perche
          for (let k = NT - 1; k >= 0; k--) out.push(bande(tours[k].devant, false));
          return out.join('\n');
        },
        renvois: z => {
          const { Dc, Dt } = de(z);
          const t = tours[1], mil = add(t.U, [t.TL[0] - t.U[0], t.TL[1] - t.U[1]], 0.4);
          return [
            { n: 7, rond: Dc(add(C, [0.2, -0.17])), cible: Dc(add(add(C, n1, -0.75 * RP), u1, -0.01)), texte: 'entailler, puis casser' },
            { n: 8, rond: Dc(add(C, [-0.24, 0.13])), cible: Dc(add(Co, n1, 0.012)), texte: 'fibres gardées' },
            { n: 9, rond: Dt([-0.36, 2.86]), cible: Dt(mil), texte: 'liée, excédent coupé' },
          ];
        },
      },

      long: {
        titre: 'En long',
        dessin: z => {
          const { s, L } = lo(z), out = [];
          // la neige sous l'aire, et devant les portes
          const sn = [[-4.9, -0.32], [-4.9, 0.15], [-EA, 0.15], [-EA, 0], [EA, 0], [EA, 0.15], [4.9, 0.15], [4.9, -0.32]];
          out.push(poly(L, sn, h.a.hachure('neige', 'aucun')));
          out.push(poly(L, sn.slice(1, -1), h.a.detail, false));
          // le sapinage, sauf le rond nu de chaque poêle
          for (const [x0, x1] of [[-3.7, -XP - 0.55], [-XP + 0.55, XP - 0.55], [XP + 0.55, 3.7]]) out.push(sapinage(L, s, x0, x1));
          // le mur du fond : les perches en trait fin, derrière ; la ligne des cassures ; devant la toile,
          // entre deux perches, un pieu planté, court et épais, le haut taillé en biseau
          const cotes = vent.filter(p => Math.abs(p[0]) <= COTE_BOUT);
          for (const p of cotes) out.push(poly(L, [[p[0], 0.12], [p[0], 2.86]], h.a.fin, false));
          out.push(poly(L, [[-COTE_BOUT, OEIL], [COTE_BOUT, OEIL]], h.a.detail, false));
          for (let i = 0; i < cotes.length - 1; i++) {
            const xm = (cotes[i][0] + cotes[i + 1][0]) / 2;
            out.push(poly(L, [[xm - 0.055, 0.02], [xm + 0.055, 0.02], [xm + 0.055, 0.74], [xm - 0.055, 0.84]], blanc(h.a.detail)));
          }
          for (const p of vent.filter(p => Math.abs(p[0]) > COTE_BOUT)) {
            out.push(poly(L, [[p[0], 0.12], [Math.sign(p[0]) * 2.97, 2.6]], h.a.detail, false));
          }
          // la neige pelletée contre les bouts, vue au-delà de la porte
          for (const m of [p => p, mir]) out.push(poly(L, [[3.36, OEIL], [3.6, OEIL], [4.6, 0.15]].map(m), h.a.detail, false));
          // les poêles sur pieux, près de chaque porte, et leur tuyau
          for (const sg of [-1, 1]) {
            const m = p => [sg * p[0], p[1]];
            for (const xp of [XP - 0.27, XP + 0.27]) {
              out.push(poly(L, [[xp, 0], [xp, 0.35]].map(m), h.a.arete, false));
              out.push(poly(L, [[xp, 0], [xp, -0.3]].map(m), h.a.cache, false));
            }
            out.push(poly(L, [[XP - 0.3, 0.35], [XP + 0.3, 0.35], [XP + 0.3, 0.7], [XP - 0.3, 0.7]].map(m), blanc(h.a.arete)));
            out.push(poly(L, [[XP - 0.25, 0.43], [XP - 0.06, 0.43], [XP - 0.06, 0.62], [XP - 0.25, 0.62]].map(m), h.a.detail));
            out.push(poly(L, [[XP - 0.1, 0.525], [XP - 0.08, 0.525]].map(m), h.a.arete, false));
            out.push(poly(L, [[XT - 0.2, 2.17], [XT + 0.2, 2.17], [XT + 0.2, 2.45], [XT - 0.2, 2.45]].map(m), blanc(h.a.arete)));
            out.push(poly(L, [[XT - 0.065, 0.7], [XT + 0.065, 0.7], [XT + 0.065, 2.31], [XT - 0.065, 2.31]].map(m), blanc(h.a.arete)));
            for (const yj of [1.25, 1.8]) out.push(poly(L, [[XT - 0.065, yj], [XT + 0.065, yj]].map(m), h.a.detail, false));
            for (const xx of [XT - 0.065, XT + 0.065]) out.push(poly(L, [[xx, 2.31], [xx, PK]].map(m), h.a.cache, false));
          }
          // les trois fourches, dans l'axe, et la poutre qu'elles portent
          for (const x of [-XF, 0, XF]) out.push(poly(L, [[x - 0.055, -0.3], [x + 0.055, -0.3], [x + 0.07, YB - RB], [x - 0.07, YB - RB]], blanc(h.a.arete)));
          out.push(poly(L, [[-2.97, YB - RB], [2.97, YB - RB], [2.97, YB + RB], [-2.97, YB + RB]], blanc(h.a.arete)));
          for (const x of [-XF, -1.4, 0, 1.4, XF]) {
            for (const dx of [-0.035, 0, 0.035]) out.push(poly(L, [[x + dx, YB - RB - 0.02], [x + dx, YB + RB + 0.02]], h.a.fin, false));
          }
          // la toile coupée dans l'axe : le faîte, les bouts, la porte
          out.push(poly(L, [[3.44, 1.3], [2.97, PK], [-2.97, PK], [-3.44, 1.3]], h.a.contour, false));
          // le tuyau dehors, plus haut que le faîte, coiffé du pare-étincelles
          for (const sg of [-1, 1]) {
            const m = p => [sg * p[0], p[1]];
            out.push(poly(L, [[XT - 0.065, PK], [XT + 0.065, PK], [XT + 0.065, 3.32], [XT - 0.065, 3.32]].map(m), blanc(h.a.arete)));
            out.push(poly(L, [[XT - 0.1, 3.32], [XT + 0.1, 3.32], [XT + 0.1, 3.47], [XT - 0.1, 3.47]].map(m), h.a.hachure('grillage', 'arete')));
          }
          return out.join('\n');
        },
        renvois: z => {
          const { L } = lo(z);
          const R = (n, r, c, texte) => ({ n, rond: L(r), cible: L(c), texte });
          const bouts = vent.filter(p => p[0] < -COTE_BOUT);
          const eb = bouts.reduce((a, p) => (Math.abs(p[0] + 3.4) < Math.abs(a[0] + 3.4) ? p : a), bouts[0]);
          const surEb = y => eb[0] + (y - 0.12) / (2.6 - 0.12) * (-2.97 - eb[0]);
          const cotes = vent.filter(p => Math.abs(p[0]) <= COTE_BOUT);
          let pm = null;
          for (let i = 0; i < cotes.length - 1; i++) {
            const xm = (cotes[i][0] + cotes[i + 1][0]) / 2;
            if (pm === null || Math.abs(xm - 0.9) < Math.abs(pm - 0.9)) pm = xm;
          }
          return [
            R(10, [-4.15, 2.45], [surEb(1.9), 1.9], 'épinettes des bouts'),
            R(11, [1.45, 1.17], [pm, 0.42], 'pieux contre la toile'),
            R(12, [-1.15, 1.17], [-XP + 0.31, 0.62], 'poêle sur quatre pieux'),
            R(13, [-3.35, 3.3], [-XT - 0.11, 3.4], 'tuyau plus haut que le faîte'),
          ];
        },
      },

      dessus: {
        titre: 'Vue de dessus',
        dessin: z => {
          const { s, P } = pl(z), out = [];
          const arc = (a, bb, ta, tb, n = 48) => Array.from({ length: n + 1 }, (_, i) => {
            const t = ta + (tb - ta) * i / n; return [a * Math.cos(t), bb * Math.sin(t)];
          });
          const ellD = (cx, cy, rx, ry) => {
            const [X, Y] = P([cx, cy]), a = rx * s, c = ry * s;
            return `M ${f(X - a)} ${f(Y)} a ${f(a)} ${f(c)} 0 1 0 ${f(2 * a)} 0 a ${f(a)} ${f(c)} 0 1 0 ${f(-2 * a)} 0 Z`;
          };
          const dP = pts => pts.map((p, i) => `${i ? 'L' : 'M'} ${f(P(p)[0])} ${f(P(p)[1])}`).join(' ') + ' Z';
          // le sapinage : les pointes vers la porte de chaque moitié
          const motif = (id, d) => `<pattern id="${id}" width="10" height="10" patternUnits="userSpaceOnUse"><path d="${d}" fill="none" stroke="${N}" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/></pattern>`;
          out.push(motif('p1203d', 'M1.5 1.2 L4 3 L1.5 4.8 M6.5 6.2 L9 8 L6.5 9.8'));
          out.push(motif('p1203g', 'M4 1.2 L1.5 3 L4 4.8 M9 6.2 L6.5 8 L9 9.8'));
          for (const sg of [1, -1]) {
            const moitie = arc(EA - 0.06, EB - 0.06, -Math.PI / 2, Math.PI / 2).map(p => [sg * p[0], p[1]]);
            out.push(h.path(`${dP(moitie)} ${ellD(sg * XP, -0.42, 0.55, 0.4)}`, `fill="url(#${sg > 0 ? 'p1203d' : 'p1203g'})" stroke="none" fill-rule="evenodd"`));
          }
          // le rond de neige nue autour de chaque poêle
          for (const sg of [1, -1]) out.push(h.ellipse(...P([sg * XP, -0.42]), 0.55 * s, 0.4 * s, h.a.hachure('neige', 'detail')));
          // la neige pelletée tout autour : ouverte aux portes et à chaque entrée d'air
          const tP = bb => Math.asin(PORTE / bb), tX = (a, x) => 2 * Math.PI - Math.acos(x / a);
          const morceaux = [
            [tP(OB), Math.PI - tP(OB), tP(EB), Math.PI - tP(EB)],
            [Math.PI + tP(OB), tX(OA, -XP - 0.14), Math.PI + tP(EB), tX(EA, -XP - 0.14)],
            [tX(OA, -XP + 0.14), tX(OA, XP - 0.14), tX(EA, -XP + 0.14), tX(EA, XP - 0.14)],
            [tX(OA, XP + 0.14), 2 * Math.PI - tP(OB), tX(EA, XP + 0.14), 2 * Math.PI - tP(EB)],
          ];
          for (const [a0, a1, i0, i1] of morceaux) {
            out.push(poly(P, [...arc(OA, OB, a0, a1), ...arc(EA, EB, i0, i1).reverse()], h.a.hachure('neige', 'detail')));
          }
          // la toile, ouverte aux deux portes
          out.push(poly(P, arc(EA, EB, tP(EB), Math.PI - tP(EB)), h.a.contour, false));
          out.push(poly(P, arc(EA, EB, Math.PI + tP(EB), 2 * Math.PI - tP(EB)), h.a.contour, false));
          // l'entrée d'air de chaque poêle : une boîte ouverte aux deux bouts, sous la toile
          for (const sg of [1, -1]) {
            const yw = -EB * Math.sqrt(1 - (XP / EA) ** 2);
            out.push(poly(P, [[sg * XP - 0.06, yw - 0.17], [sg * XP + 0.06, yw - 0.17], [sg * XP + 0.06, yw + 0.15], [sg * XP - 0.06, yw + 0.15]], blanc(h.a.arete)));
          }
          // les peaux, de chaque côté de l'allée
          const peau = (cx, cy, w, hh) => {
            const pts = [];
            for (let i = 0; i < 64; i++) {
              const t = 2 * Math.PI * i / 64, r = 0.84 + 0.2 * Math.pow(Math.max(0, -Math.cos(4 * t)), 3);
              pts.push([cx + w / 2 * r * Math.cos(t), cy + hh / 2 * r * Math.sin(t)]);
            }
            return poly(P, pts, blanc(h.a.arete));
          };
          for (const x of [-1.2, -0.5, 0.5, 1.2]) for (const y of [-0.87, 0.87]) out.push(peau(x, y, 0.62, 0.7));
          // les perches et les épinettes des bouts, les trois fourches, la poutre au-dessus
          for (const p of [...vent, ...abri]) out.push(h.cercle(...P([p[0] * (EA - 0.08) / EA, p[1] * (EB - 0.08) / EB]), 1.7, h.a.plein));
          for (const x of [-XF, 0, XF]) out.push(h.cercle(...P([x, 0]), 2.6, h.a.plein));
          for (const y of [-RB, RB]) out.push(poly(P, [[-2.97, y], [2.97, y]], h.a.cache, false));
          // les poêles : quatre pieux, le tuyau à l'arrière, la porte vers l'allée
          for (const sg of [1, -1]) {
            const m = p => [sg * p[0], p[1]];
            out.push(poly(P, [[XP - 0.3, YP - 0.2], [XP + 0.3, YP - 0.2], [XP + 0.3, YP + 0.2], [XP - 0.3, YP + 0.2]].map(m), blanc(h.a.arete)));
            out.push(poly(P, [[XP - 0.22, YP + 0.25], [XP - 0.04, YP + 0.25]].map(m), h.a.arete, false));
            out.push(h.cercle(...P([sg * XT, YP]), 0.08 * s, blanc(h.a.arete)));
            for (const dx of [-0.34, 0.34]) for (const dy of [-0.24, 0.24]) out.push(h.cercle(...P([sg * (XP + dx), YP + dy]), 1.5, h.a.plein));
            // l'air, du dehors au poêle ; le sapinage, du milieu vers la porte
            out.push(h.fleche(`M ${f(P([sg * XP, -2.62])[0])} ${f(P([sg * XP, -2.62])[1])} L ${f(P([sg * XP, -0.8])[0])} ${f(P([sg * XP, -0.8])[1])}`, h.a.cache));
            out.push(h.fleche(`M ${f(P([sg * 0.2, 0.25])[0])} ${f(P([sg * 0.2, 0.25])[1])} L ${f(P([sg * 2.2, 0.25])[0])} ${f(P([sg * 2.2, 0.25])[1])}`));
          }
          // l'écart entre deux perches voisines, sur le grand côté, porté au-dessus de la neige
          const i0 = vent.findIndex(p => p[0] > -0.75), pts = [vent[i0], vent[i0 + 1]].map(p => [p[0] * (EA - 0.08) / EA, p[1] * (EB - 0.08) / EB]);
          const yCote = P([0, -2.6])[1], yHaut = P([0, -2.72])[1];
          for (const p of pts) {
            const [xp, yp] = P(p), yT = P([0, -EB * Math.sqrt(1 - (p[0] / EA) ** 2) - 0.06])[1];
            out.push(lisere([xp, yT], [xp, yHaut]), traitRappel([xp, yp - 3], [xp, yHaut]));
          }
          const [xa] = P(pts[0]), [xb] = P(pts[1]);
          out.push(ligneCote([xa, yCote], [xb, yCote], true));
          out.push(h.texte(xb + 13, yCote + 4, '300–400', { ancre: 'start' }));
          return out.join('\n');
        },
        renvois: z => {
          const { P } = pl(z);
          const R = (n, r, c, texte) => ({ n, rond: P(r), cible: P(c), texte });
          const pp = abri.reduce((a, p) => (Math.abs(p[0] + 2.6) < Math.abs(a[0] + 2.6) ? p : a), abri[0]);
          const pc = [pp[0] * (EA - 0.08) / EA - 0.03, pp[1] * (EB - 0.08) / EB + 0.05];
          const yw = -EB * Math.sqrt(1 - (XP / EA) ** 2);
          return [
            R(14, [-3.7, 2.0], pc, 'perches autour de l’ellipse'),
            R(15, [5.45, -0.05], [EA + 0.45, 0], 'porte à chaque bout'),
            R(16, [3.7, 2.0], [1.47, 1.1], 'peaux, allée au milieu'),
            R(17, [4.95, 0.75], [3.3, 0.3], 'sapinage vers chaque porte'),
            R(18, [4.2, -1.75], [XP + 0.54, -0.5], 'rond de neige nue'),
            R(19, [-3.6, -2.2], [-XP + 0.07, yw - 0.1], 'entrée d’air basse, au vent'),
          ];
        },
      },
    },
  };
};
