// Planche 98-09 — trier l'ergot à la saumure. Chapitre 98 : §9 « Trier l'ergot sans tamis ni
// lumière », étape 43, §8 bloc 1 (le sclérote : dur, noir ou violet foncé dehors, blanc ou gris
// dedans, souvent de la taille du grain, parfois bien plus gros et qui dépasse des balles).
// Le chapitre ne donne aucune dimension de chaudière, d'écumoire ni de bâton : aucune cote. Le
// seul nombre est dans la légende (250 g de sel par litre d'eau).
module.exports = (h) => {
  const A = h.a, F = h.formes;
  const r1 = v => Math.round(v * 10) / 10;
  const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const bA = blanc(A.arete), bD = blanc(A.detail), bF = blanc(A.fin);
  const sans = nom => A.hachure(nom, 'aucun');
  const RAD = Math.PI / 180;
  const alea = g => { let s = g; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; };
  const pt = p => `${r1(p[0])} ${r1(p[1])}`;
  const rep = (x, y, ang = 0) => {
    const c = Math.cos(ang * RAD), s = Math.sin(ang * RAD);
    return ([u, v]) => [x + u * c - v * s, y + u * s + v * c];
  };
  let nClip = 0;
  const decoupe = (d, contenu) => {
    const id = `k9809-${++nClip}`;
    return `<clipPath id="${id}"><path d="${d}" fill="none"/></clipPath>\n<g clip-path="url(#${id})">\n${contenu.join('\n')}\n</g>`;
  };
  // une ellipse tournée, en chemin (pas de transform)
  const ell = (x, y, rx, ry, ang, at) => {
    const c = Math.cos(ang * RAD), s = Math.sin(ang * RAD);
    const p1 = [x + rx * c, y + rx * s], p2 = [x - rx * c, y - rx * s];
    return h.path(`M${pt(p1)} A${rx} ${ry} ${r1(ang)} 1 0 ${pt(p2)} A${rx} ${ry} ${r1(ang)} 1 0 ${pt(p1)} Z`, at);
  };

  // ─── Les petites pièces ────────────────────────────────────────────────────────────────
  const grain = (x, y, ang, rx = 3.4, ry = 1.8) => ell(x, y, rx, ry, ang, bF);
  // Un sclérote : un fuseau noir, un peu arqué. L sa longueur, w sa largeur, k sa courbure.
  const sclerote = (x, y, ang, L, w = 4.2, k = 0.12) => {
    const T = rep(x, y, ang);
    const a = [-L / 2, 0], b = [L / 2, 0];
    return h.path(`M${pt(T(a))} Q${pt(T([0, -w - L * k]))} ${pt(T(b))} Q${pt(T([0, w - L * k]))} ${pt(T(a))} Z`, A.plein);
  };

  // ─── La chaudière en coupe ─────────────────────────────────────────────────────────────
  // cx le milieu, yt le bord, yb le fond (dessous), Wt la largeur au bord, Wb au fond.
  const chaudiere = (cx, yt, yb, Wt, Wb) => {
    const t = 3.2;
    const xo = y => (Wt / 2) + (Wb / 2 - Wt / 2) * (y - yt) / (yb - yt);        // demi-largeur dehors
    const xi = y => xo(y) - t;                                                  // demi-largeur dedans
    const paroi = [
      [cx - Wt / 2, yt], [cx - Wb / 2, yb], [cx + Wb / 2, yb], [cx + Wt / 2, yt],
      [cx + Wt / 2 - t, yt], [cx + xi(yb - t), yb - t], [cx - xi(yb - t), yb - t], [cx - Wt / 2 + t, yt],
    ];
    const creux = `M${pt([cx - Wt / 2 + t, yt - 40])} L${pt([cx - Wt / 2 + t, yt])} L${pt([cx - xi(yb - t), yb - t])} L${pt([cx + xi(yb - t), yb - t])} L${pt([cx + Wt / 2 - t, yt])} L${pt([cx + Wt / 2 - t, yt - 40])} Z`;
    const trait = [
      h.chemin(paroi, A.plein, true),
      // le bord roulé, de chaque côté
      h.cercle(cx - Wt / 2 - 0.6, yt + 1.6, 3.3, A.plein), h.cercle(cx + Wt / 2 + 0.6, yt + 1.6, 3.3, A.plein),
      // la jupe sous le fond
      h.chemin([[cx - Wb / 2 + 1, yb], [cx - Wb / 2 + 3, yb + 4], [cx + Wb / 2 - 3, yb + 4], [cx + Wb / 2 - 1, yb]], A.plein, true),
      // les oreilles de l'anse
      h.rect(cx - xo(yt + 14) - 4, yt + 9, 4.5, 9, A.plein), h.rect(cx + xo(yt + 14) - 0.5, yt + 9, 4.5, 9, A.plein),
      // le sol
      h.ligne(cx - Wt / 2 - 24, yb + 4.7, cx + Wt / 2 + 24, yb + 4.7, A.detail),
    ];
    // un point au hasard dans le creux, entre y0 et y1, à m du bord
    const dedans = (r, y0, y1, m = 4) => {
      const y = y0 + r() * (y1 - y0), lx = xi(y) - m;
      return [cx - lx + r() * 2 * lx, y];
    };
    // la saumure : la trame d'eau sous la surface (la découpe la borne)
    const saumure = yS => h.rect(cx - Wt / 2, yS, Wt, yb - yS, sans('eau'));
    const surface = yS => h.ligne(cx - Wt / 2 + 1, yS, cx + Wt / 2 - 1, yS, A.arete);
    return { creux, trait, xi, t, dedans, saumure, surface };
  };

  // Une chaudière d'une vingtaine de litres, à peu près 340 mm de haut : l'échelle de la main.
  const geo = z => {
    const H = Math.round(z.h * 0.58), Wt = H * 1.12, Wb = Wt * 0.78;
    const cx = z.l * 0.5, yb = z.h - 10, yt = yb - H, yS = yt + H * 0.16;
    return { H, Wt, Wb, cx, yb, yt, yS, s: H / 340 };
  };

  // ─── Vue 1 : le grain dans la saumure, brasser ─────────────────────────────────────────
  const brasser = z => {
    const o = [];
    const { Wt, Wb, cx, yb, yt, yS, s } = geo(z);
    const C = chaudiere(cx, yt, yb, Wt, Wb);
    const r = alea(9809);
    // le grain et quelques sclérotes, en suspension dans la saumure qui tourne
    const pieces = [];
    for (let i = 0; i < 150; i++) {
      const [x, y] = C.dedans(r, yS + 8, yb - C.t - 4, 5);
      pieces.push(grain(x, y, r() * 180));
    }
    for (let i = 0; i < 9; i++) {
      const [x, y] = C.dedans(r, yS + 10, yb - C.t - 12, 8);
      pieces.push(sclerote(x, y, r() * 180, 8 + r() * 5));
    }
    // le bâton : du fond, un peu à droite du milieu, jusqu'au poing au-dessus du bord gauche
    const B = [cx + Wt * 0.16, yb - C.t - 10], G = [cx - Wt * 0.06, yt - 44];
    const u = [G[0] - B[0], G[1] - B[1]], lu = Math.hypot(u[0], u[1]), e = [u[0] / lu, u[1] / lu];
    const ang = Math.atan2(e[0], -e[1]) / RAD;
    const d = 28 * s;                          // un bâton d'un pouce
    const n = [-e[1], e[0]];
    const haut = [G[0] + e[0] * 30, G[1] + e[1] * 30];
    const bord = (p, k) => [p[0] + n[0] * d / 2 * k, p[1] + n[1] * d / 2 * k];
    o.push(decoupe(C.creux, [
      C.saumure(yS),
      h.chemin([bord(B, 1), bord(haut, 1), bord(haut, -1), bord(B, -1)], bA, true),
      h.ligne(bord(B, 0.3)[0], bord(B, 0.3)[1], bord(haut, 0.3)[0], bord(haut, 0.3)[1], A.fin),
      ...pieces,
      C.surface(yS),
    ]));
    // le bâton au-dessus de la surface (le bout arrondi en haut)
    const S = [B[0] + e[0] * ((yS - B[1]) / e[1]), yS];
    const cap = [haut[0] + e[0] * d * 0.5, haut[1] + e[1] * d * 0.5];
    o.push(h.path(`M${pt(bord(S, 1))} L${pt(bord(haut, 1))} Q${pt(bord(cap, 1))} ${pt(cap)} Q${pt(bord(cap, -1))} ${pt(bord(haut, -1))} L${pt(bord(S, -1))}`, bA));
    o.push(h.ligne(bord(S, 0.3)[0], bord(S, 0.3)[1], bord(haut, 0.3)[0], bord(haut, 0.3)[1], A.fin));
    o.push(...C.trait);
    // la saumure qui tourne autour du bâton
    const ym = yS + (yb - yS) * 0.42, rx = Wt * 0.3, ry = 10, xm = cx + 4;
    const P = a => [xm + rx * Math.cos(a * RAD), ym + ry * Math.sin(a * RAD)];
    o.push(h.fleche(`M${pt(P(200))} A${rx} ${ry} 0 0 0 ${pt(P(90))} A${rx} ${ry} 0 0 0 ${pt(P(-10))}`, A.arete));
    // la main
    // modèle s11 (poing fermé, vu de la paume) : l'avant-bras à gauche, le pouce vers le bas du bâton ;
    // le bâton (25 px dans le poing du modèle) passe dans le poing
    const m = F.modele('s11', { x: G[0], y: G[1], ancre: [68, 42], angle: ang + 90, echelle: d / 25, masquer: [[0, 150, 140, 175]],
      bras: { a: [21.8, 150], a0: [20.8, 135], b: [76.3, 150], b0: [76.2, 135], bord: z } });
    o.push(m.toString());
    const yB = yt - 12, xB = S[0] + (yB - yS) * e[0] / e[1];
    const y2 = yS + (yb - yS) * 0.72;
    return {
      svg: o.join('\n'),
      renvois: [
        { n: 1, rond: [z.l - 14, yS + 24], cible: [cx + C.xi(yS + 24) - 10, yS + 24], texte: '250 g de sel par litre d’eau' },
        { n: 2, rond: [14, y2], cible: [cx - C.xi(y2) + 14, y2], texte: 'le grain, versé dedans' },
        { n: 3, rond: [z.l - 14, yB], cible: [xB + d / 2, yB], texte: 'brasser au bâton' },
      ],
    };
  };

  // ─── Vue 2 : les sclérotes flottent ; écumer ───────────────────────────────────────────
  const ecumer = z => {
    const o = [];
    const { H, Wt, Wb, cx, yb, yt, yS, s } = geo(z);
    const C = chaudiere(cx, yt, yb, Wt, Wb);
    const r = alea(4711);
    const yg = yb - C.t - H * 0.26;            // le dessus du grain tombé au fond
    const lit = [];
    for (let y = yb - C.t - 2; y > yg; y -= 3.1) {
      const lx = C.xi(y) - 2;
      for (let x = cx - lx + r() * 3; x < cx + lx; x += 6.2 + r() * 1.2) lit.push(grain(x, y + (r() - 0.5) * 1.6, r() * 180));
    }
    // les sclérotes à la surface, la plupart de la taille du grain, deux plus gros
    const flot = [
      [-0.82, 9, -8], [-0.64, 15, 12], [-0.45, 8, 30], [-0.3, 9, -20], [0.5, 17, 6], [0.66, 8, -35], [0.8, 10, 15],
    ];
    const surface = flot.map(([k, L, a]) => sclerote(cx + k * C.xi(yS), yS + 0.8, a, L));
    // deux qui remontent encore
    const montent = [[cx - C.xi(yS) * 0.55, yS + (yg - yS) * 0.5, 9], [cx + C.xi(yS) * 0.2, yS + (yg - yS) * 0.64, 8]];
    o.push(decoupe(C.creux, [
      C.saumure(yS),
      h.rect(cx - Wt / 2, yg - 2, Wt, yb - yg + 2, A.blanc),
      ...lit,
      ...montent.map(([x, y, L]) => sclerote(x, y, 75, L)),
      ...surface,
      C.surface(yS),
    ]));
    for (const [x, y] of montent) o.push(h.fleche(`M${r1(x + 10)} ${r1(y + 4)} L${r1(x + 10)} ${r1(y - 22)}`, A.detail));
    o.push(...C.trait);
    // l'écumoire, levée au-dessus de la surface
    const D = [cx - 6, yS - 26], ex = 36, ey = 9.5;
    const T = rep(D[0], D[1], -5);
    const E = (u, v) => T([u, v]);
    // les coulures : la saumure qui retombe par les trous
    for (const u of [-17, -3, 12]) { const p = E(u, 10); o.push(h.ligne(p[0], p[1] + 2, p[0], yS - 3, A.cache)); }
    // le dessous bombé, puis le dessus
    o.push(h.path(`M${pt(E(-ex, 0))} Q${pt(E(0, ey * 2.3))} ${pt(E(ex, 0))} Z`, bA));
    o.push(ell(D[0], D[1], ex, ey, -5, bA));
    for (let v = -6; v <= 6; v += 3.4) {
      const w = ex * Math.sqrt(Math.max(0, 1 - (v / ey) ** 2)) - 5;
      for (let u = -w; u <= w; u += 5.4) { const p = E(u, v); o.push(ell(p[0], p[1], 1.3, 0.65, -5, A.plein)); }
    }
    // la charge : sclérotes sur l'écumoire
    for (const [u, v, L, a] of [[-19, -1, 9, 10], [-6, 2, 15, -8], [8, -2, 8, 30], [20, 2, 9, -20], [2, -5, 8, 70]]) {
      const p = E(u, v); o.push(sclerote(p[0], p[1] - 2, a, L));
    }
    // le manche, du bord de l'écumoire au poing, en haut à droite
    const M0 = E(ex - 3, -1), G = [z.l - 86, yt - 70];
    const u = [G[0] - M0[0], G[1] - M0[1]], lu = Math.hypot(u[0], u[1]), e = [u[0] / lu, u[1] / lu], nn = [-e[1], e[0]];
    const dm = 22 * s, M1 = [G[0] + e[0] * 30, G[1] + e[1] * 30];
    const bm = (p, k) => [p[0] + nn[0] * dm / 2 * k, p[1] + nn[1] * dm / 2 * k];
    o.push(h.path(`M${pt(bm(M0, 1))} L${pt(bm(M1, 1))} Q${pt([M1[0] + e[0] * 6, M1[1] + e[1] * 6])} ${pt(bm(M1, -1))} L${pt(bm(M0, -1))} Z`, bA));
    // la main : pouce vers l'écumoire, l'avant-bras qui part vers la droite
    const ang = Math.atan2(-e[0], e[1]) / RAD;
    // modèle s11 en miroir : l'avant-bras à droite, le pouce vers l'écumoire ; le manche passe dans le poing
    const m = F.modele('s11', { x: G[0], y: G[1], ancre: [68, 42], angle: ang + 90, miroir: true, echelle: dm / 25, masquer: [[0, 150, 140, 175]],
      bras: { a: [21.8, 150], a0: [20.8, 135], b: [76.3, 150], b0: [76.2, 135], bord: z } });
    o.push(m.toString());
    // le geste : lever hors de la chaudière
    o.push(h.fleche(`M${pt(E(-ex - 8, 4))} C${pt(E(-ex - 14, -34))} ${pt(E(-12, -58))} ${pt(E(14, -54))}`, A.arete));
    const yL = yg + (yb - yg) * 0.5;
    return {
      svg: o.join('\n'),
      renvois: [
        { n: 4, rond: [14, yS - 24], cible: [cx - 0.64 * C.xi(yS), yS - 1], texte: 'les sclérotes remontent, flottent' },
        { n: 5, rond: [z.l - 14, D[1] - 12], cible: E(18, 4), texte: 'écumoire percée' },
        { n: 6, rond: [z.l - 14, yL], cible: [cx + C.xi(yL) - 12, yL], texte: 'grain : rincer, sécher le jour même' },
      ],
    };
  };

  // ─── Vue 3 : l'épi de seigle ergoté ────────────────────────────────────────────────────
  const epi = z => {
    const o = [];
    const L = 25, w = 10.5, alpha = 24, step = 8.6, nb = 16, awn = 30;
    const x0 = 44, y0 = z.h - 18, tilt = 38;
    const T = rep(x0, y0, tilt);
    const P = p => pt(T(p));
    const ergot = 7;                           // le nœud où pousse la corne
    const b0 = 34;                             // la tige sous l'épi
    // la tige, coupée net
    o.push(h.path(`M${P([-2.8, 0])} L${P([-2.2, -b0])} M${P([2.8, 0])} L${P([2.2, -b0])}`, A.arete));
    o.push(h.path(`M${P([-2.8, 0])} L${P([2.8, 0])}`, A.detail));
    o.push(h.path(`M${P([0, -b0])} L${P([0, -b0 - step * (nb - 1)])}`, A.detail));
    const balle = (b, a, Lb, wb, at = bD) => {
      const e = [Math.sin(a * RAD), -Math.cos(a * RAD)], n = [-e[1], e[0]];
      const tip = [b[0] + e[0] * Lb, b[1] + e[1] * Lb], mid = [b[0] + e[0] * Lb * 0.45, b[1] + e[1] * Lb * 0.45];
      return {
        tip, e,
        svg: [
          h.path(`M${P(b)} Q${P([mid[0] + n[0] * wb, mid[1] + n[1] * wb])} ${P(tip)} Q${P([mid[0] - n[0] * wb, mid[1] - n[1] * wb])} ${P(b)} Z`, at),
          h.path(`M${P([b[0] + e[0] * 3, b[1] + e[1] * 3])} Q${P([mid[0] + n[0] * wb * 0.2, mid[1] + n[1] * wb * 0.2])} ${P([tip[0] - e[0] * 2, tip[1] - e[1] * 2])}`, A.fin),
        ].join('\n'),
      };
    };
    // du haut vers le bas : chaque épillet passe devant celui du dessus
    let cible = null, cibleBalle = null;
    for (let i = nb - 1; i >= 0; i--) {
      const sx = i % 2 ? 1 : -1, b = [sx * 1.4, -b0 - i * step];
      const k = i > nb - 4 ? 0.8 : 1;           // les derniers, plus petits
      const a = sx * alpha;
      if (i === ergot) {
        // la corne noire sort d'entre deux balles écartées
        const ae = sx * (alpha + 10), e = [Math.sin(ae * RAD), -Math.cos(ae * RAD)], n = [-e[1], e[0]];
        const Le = L * 2.4, we = 6.6;
        const tip = [b[0] + e[0] * Le, b[1] + e[1] * Le];
        const q1 = [b[0] + e[0] * Le * 0.5 + n[0] * (we + 3), b[1] + e[1] * Le * 0.5 + n[1] * (we + 3)];
        const q2 = [b[0] + e[0] * Le * 0.5 - n[0] * (we - 3), b[1] + e[1] * Le * 0.5 - n[1] * (we - 3)];
        const g1 = balle(b, a - sx * 8, L * 0.8, w * 0.55), g2 = balle(b, a + sx * 30, L * 0.75, w * 0.55);
        o.push(g1.svg);
        o.push(h.path(`M${P([b[0] - n[0] * 2.8, b[1] - n[1] * 2.8])} Q${P(q1)} ${P(tip)} Q${P(q2)} ${P([b[0] + n[0] * 2.8, b[1] + n[1] * 2.8])} Z`, A.plein));
        o.push(g2.svg);
        cible = T([b[0] + e[0] * Le * 0.78, b[1] + e[1] * Le * 0.78]);
        continue;
      }
      const bb = balle(b, a, L * k, w * k);
      const aw = [bb.tip[0] + Math.sin(a * 0.4 * RAD) * awn * k, bb.tip[1] - Math.cos(a * 0.4 * RAD) * awn * k];
      o.push(bb.svg, h.path(`M${P(bb.tip)} L${P(aw)}`, A.fin));
      if (i === 3) cibleBalle = T([b[0] + bb.e[0] * L * 0.5, b[1] + bb.e[1] * L * 0.5]);
    }
    const pc = T([62, -b0 - step * ergot - 8]);
    return {
      svg: o.join('\n'),
      renvois: [
        { n: 7, rond: [Math.min(z.l - 14, pc[0]), Math.max(14, pc[1])], cible, texte: 'sclérote qui dépasse des balles' },
        { n: 8, rond: [z.l - 40, z.h - 30], cible: cibleBalle, texte: 'épi de seigle, grossi' },
      ],
    };
  };

  // ─── Vue 4 : grain et sclérotes, grossis ───────────────────────────────────────────────
  const tri = z => {
    const o = [];
    const yc = z.h * 0.5, Lg = 72, wg = 12.5;
    // le grain de seigle : long, le germe au bout pointu, la brosse au bout rond
    const xg = z.l * 0.17;
    const Tg = rep(xg, yc, -12), Pg = p => pt(Tg(p));
    o.push(h.path(`M${Pg([-Lg / 2, 1])} C${Pg([-Lg / 2 + 6, -wg - 3])} ${Pg([Lg / 2 - 10, -wg - 2])} ${Pg([Lg / 2, -1])} C${Pg([Lg / 2 - 8, wg + 3])} ${Pg([-Lg / 2 + 12, wg + 1])} ${Pg([-Lg / 2, 1])} Z`, bA));
    o.push(h.path(`M${Pg([-Lg / 2 + 3, 1])} Q${Pg([-Lg / 2 + 10, -7])} ${Pg([-Lg / 2 + 17, -1])} Q${Pg([-Lg / 2 + 11, 7])} ${Pg([-Lg / 2 + 3, 1])}`, A.detail));
    o.push(h.path(`M${Pg([-Lg / 2 + 18, 3.5])} Q${Pg([0, 6.5])} ${Pg([Lg / 2 - 6, 1])}`, A.fin));
    for (const a of [-40, -20, 0, 20, 40]) {
      const b = Tg([Lg / 2 - 1, a / 20]), c = Tg([Lg / 2 + 6 * Math.cos(a * RAD), a / 20 + 6 * Math.sin(a * RAD)]);
      o.push(h.ligne(b[0], b[1], c[0], c[1], A.fin));
    }
    // un sclérote de la même taille, noir
    const xs = z.l * 0.49;
    const Ts = rep(xs, yc, -8), Ps = p => pt(Ts(p));
    o.push(h.path(`M${Ps([-Lg / 2, 2])} C${Ps([-Lg / 2 + 5, -wg - 6])} ${Ps([Lg / 2 - 8, -wg - 7])} ${Ps([Lg / 2 + 2, -3])} C${Ps([Lg / 2 - 6, wg - 1])} ${Ps([-Lg / 2 + 8, wg + 1])} ${Ps([-Lg / 2, 2])} Z`, A.plein));
    o.push(h.path(`M${Ps([-Lg / 2 + 9, -1])} Q${Ps([0, -5.5])} ${Ps([Lg / 2 - 9, -4.5])}`, 'fill="none" stroke="#FFFFFF" stroke-width="0.7" stroke-linecap="round"'));
    // un sclérote cassé en deux : les deux moitiés, la cassure blanche tournée vers l'œil
    const xk = z.l * 0.82;
    const moitie = (x, y, ang, Lm) => {
      const T = rep(x, y, ang), Q = p => pt(T(p));
      return [
        h.path(`M${Q([0, -wg])} C${Q([Lm * 0.35, -wg - 4])} ${Q([Lm * 0.8, -wg + 1])} ${Q([Lm, -2])} C${Q([Lm * 0.8, wg - 2])} ${Q([Lm * 0.35, wg + 2])} ${Q([0, wg])} Z`, A.plein),
        ell(x, y, 6, wg, ang, 'fill="#FFFFFF" stroke="#1A1A1A" stroke-width="1.4" stroke-linejoin="round"'),
      ].join('\n');
    };
    const fA = [xk - 12, yc + 4], fB = [xk + 8, yc - 6];
    o.push(moitie(fA[0], fA[1], 160, 34), moitie(fB[0], fB[1], -40, 34));
    const f = fB;
    return {
      svg: o.join('\n'),
      renvois: [
        { n: 9, rond: [xg, yc - 48], cible: Tg([-4, -wg + 3]), texte: 'grain de seigle' },
        { n: 10, rond: [xs, yc - 48], cible: Ts([0, -wg + 1]), texte: 'sclérote : même taille, noir' },
        { n: 11, rond: [xk + 26, yc + 46], cible: [f[0] + 1, f[1] + 3], texte: 'cassé : blanc ou gris dedans' },
      ],
    };
  };

  const vue = (titre, f) => ({ titre, dessin: z => f(z).svg, renvois: z => f(z).renvois });

  return {
    ref: '98-09',
    titre: 'Trier l’ergot à la saumure',
    desc: 'En haut à gauche, une chaudière en coupe pleine de saumure, le grain versé dedans et un bâton tenu à la main qui la fait tourner. '
      + 'En haut à droite, la même chaudière après : le grain couché au fond, les sclérotes d’ergot, noirs, qui remontent et flottent à la surface, '
      + 'et une écumoire percée, levée hors de la saumure avec sa charge de sclérotes, la saumure qui retombe par les trous. '
      + 'En bas à gauche, un épi de seigle grossi, une corne noire qui sort d’entre deux balles à la place d’un grain. '
      + 'En bas à droite, grossis : un grain de seigle, un sclérote de la même taille mais noir, et un sclérote cassé en deux, blanc dedans.',
    format: 'pleine',
    disposition: [['brasser', 'ecumer'], ['epi', 'tri']],
    hauteurs: [1.7, 1],
    largeurs: [[1, 1], [0.8, 1.2]],
    vues: {
      brasser: vue('Le grain dans la saumure : brasser', brasser),
      ecumer: vue('Laisser remonter, écumer', ecumer),
      epi: vue('L’épi ergoté', epi),
      tri: vue('Grain et sclérotes, grossis', tri),
    },
    danger: 'Danger — même morts, les sclérotes écumés gardent leurs alcaloïdes : ils se brûlent ou s’enterrent loin. La saumure se jette loin des planches.',
  };
};
