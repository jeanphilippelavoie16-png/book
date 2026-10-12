// 86-02 — La roue à cuillers, montée pour l'hiver.
// Chapitre 86, section 9 C « Le courant du ruisseau » : « La prise » (petit bassin derrière le
// barrage, grille devant l'entrée), « La roue à cuillers » (buse au bout du tuyau, jet sur des
// cuillers boulonnées au bord d'un disque, eau renvoyée vers l'arrière), « La dynamo » (poulies),
// « La nuit » (bridée à la buse ou à la vanne), « L'hiver » (conduite enfouie sous la ligne de gel,
// prise sous la glace dans un trou d'eau qui ne gèle pas au fond, roue et dynamo dans un petit abri),
// étape 3 (on ne détourne jamais le ruisseau au complet).
// Aucune cote : le chapitre ne donne aucune dimension de la roue, de la buse ni de la tranchée.

module.exports = (h) => {
  const f = v => Math.round(v * 10) / 10;
  const rad = d => d * Math.PI / 180;
  const blanc = s => s.replace('fill="none"', 'fill="#FFFFFF"');
  const d2 = ps => ps.map((p, i) => `${i ? 'L' : 'M'}${f(p[0])} ${f(p[1])}`).join(' ');

  // Bande de demi-largeur w autour d'une polyligne (tuyau, courroie), angles en onglet.
  const bande = (ps, w) => {
    const n = ps.length, G = [], D = [];
    const nor = (a, b) => { const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy); return [-dy / l, dx / l]; };
    for (let i = 0; i < n; i++) {
      let m;
      if (i === 0) m = nor(ps[0], ps[1]);
      else if (i === n - 1) m = nor(ps[n - 2], ps[n - 1]);
      else {
        const a = nor(ps[i - 1], ps[i]), b = nor(ps[i], ps[i + 1]);
        const s = [a[0] + b[0], a[1] + b[1]], l = Math.hypot(s[0], s[1]);
        const u = [s[0] / l, s[1] / l], c = u[0] * a[0] + u[1] * a[1];
        m = [u[0] / c, u[1] / c];
      }
      G.push([ps[i][0] + m[0] * w, ps[i][1] + m[1] * w]);
      D.push([ps[i][0] - m[0] * w, ps[i][1] - m[1] * w]);
    }
    return G.concat(D.slice().reverse());
  };
  const tuyau = (ps, w, at = h.a.arete) => h.chemin(bande(ps, w), blanc(at), true);

  // La roue tourne dans le sens contraire des aiguilles : le bas va vers la droite, dans le
  // sens du jet qui arrive de la gauche. r : vers l'extérieur ; m : sens du mouvement.
  const repere = (c, Rp, phi) => {
    const r = [Math.cos(rad(phi)), Math.sin(rad(phi))], m = [r[1], -r[0]];
    const P = [c[0] + Rp * r[0], c[1] + Rp * r[1]];
    return (a, b) => [P[0] + a * m[0] + b * r[0], P[1] + a * m[1] + b * r[1]];
  };
  // Cuiller vue de chant : le creux tourné vers l'arrière du mouvement, face au jet.
  const cuiller = (c, Rp, rc, phi, at = h.a.arete) => {
    const q = repere(c, Rp, phi), ext = [], int = [];
    for (let t = -90; t <= 90; t += 10) ext.push(q(rc * Math.cos(rad(t)), rc * Math.sin(rad(t))));
    for (let t = 90; t >= -90; t -= 10) int.push(q(0.76 * rc * Math.cos(rad(t)), rc * Math.sin(rad(t))));
    return h.chemin(ext.concat(int), blanc(at), true);
  };
  // Le manche : à plat sur la face du disque, tordu au col pour que le creux regarde le jet.
  const manche = (c, Rp, rc, phi, Lh, wH, tw, boulon) => {
    const q = repere(c, Rp, phi), wn = Math.max(0.6, wH * 0.12);
    const pts = [q(-wn, -rc + 0.5), q(-wH / 2, -rc - tw), q(-wH / 2, -rc - Lh)];
    for (let t = 180; t >= 0; t -= 20) pts.push(q(wH / 2 * Math.cos(rad(t)), -rc - Lh - wH / 2 * Math.sin(rad(t))));
    pts.push(q(wH / 2, -rc - tw), q(wn, -rc + 0.5));
    const b1 = q(0, -rc - tw - (Lh - tw) * 0.28), b2 = q(0, -rc - tw - (Lh - tw) * 0.85);
    return { svg: [h.chemin(pts, blanc(h.a.detail), true), boulon(b1), boulon(b2)].join('\n'), b1, b2 };
  };
  const hexa = (p, r) => h.chemin([0, 60, 120, 180, 240, 300].map(a => [p[0] + r * Math.cos(rad(a + 30)), p[1] + r * Math.sin(rad(a + 30))]), blanc(h.a.arete), true);

  // Courroie ouverte entre deux poulies : les deux brins, tangents extérieurs.
  const brins = (C1, r1, C2, r2, e) => {
    const dx = C2[0] - C1[0], dy = C2[1] - C1[1], d = Math.hypot(dx, dy);
    const u = Math.atan2(dy, dx), al = Math.acos((r1 - r2) / d);
    return [u - al, u + al].map(a => {
      const n = [Math.cos(a), Math.sin(a)];
      const T = (C, r) => [C[0] + r * n[0], C[1] + r * n[1]];
      return [T(C1, r1), T(C2, r2), T(C2, r2 - e), T(C1, r1 - e)];
    });
  };

  // ─── La roue, de face ──────────────────────────────────────────────────────────────────
  const ROUE = z => {
    const Rp = 84, rc = 8.8, Ro = Rp + rc, Rd = Rp - rc - 1.5, N = 12, c = [146, Ro + 22];
    const yj = c[1] + Rp;                    // le jet : tangent au cercle des cuillers, en bas
    const yF = c[1] + Ro + 20;               // le plancher de l'abri
    const xp = 20, xnb = 60, xn = 82, xv = 38;
    const fosse = [104, 202], yFo = z.h - 8;
    const D = [c[0] + Ro + 44, c[1] - 40], rm = 20, r2 = 8, r1 = 32;
    const xPo = D[0] + rm + 8;
    const sol = [[0, yF], [fosse[0], yF], [fosse[0], yFo], [fosse[1], yFo], [fosse[1], yF], [z.l, yF]];
    const angles = Array.from({ length: N }, (_, k) => 90 + k * 360 / N);
    const courroie = brins(c, r1, D, r2, 3.5);
    const out = [
      // le sol de l'abri et la fosse sous la roue
      h.chemin(sol.concat([[z.l, z.h], [0, z.h]]), h.a.hachure('terre', 'aucun'), true),
      h.rect(fosse[0], yFo - 11, fosse[1] - fosse[0], 11, h.a.hachure('eau', 'aucun')),
      h.ligne(fosse[0], yFo - 11, fosse[1], yFo - 11, h.a.detail),
      tuyau([[fosse[1] - 1, yFo - 5], [z.l + 1, yFo - 3]], 3.5),
      h.chemin(sol, h.a.contour),
      // le poteau, la tablette et la jambe de force qui portent la dynamo
      h.rect(xPo, 14, 12, yF - 14, h.a.hachure('bois')),
      h.chemin(bande([[D[0] - 6, D[1] + rm + 11], [xPo, D[1] + rm + 52]], 3), h.a.hachure('bois'), true),
      h.rect(D[0] - 32, D[1] + rm + 4, xPo - (D[0] - 32), 7, h.a.hachure('bois')),
      // les deux pieds en A qui portent l'axe, posés de part et d'autre de la fosse
      h.chemin(bande([[c[0], c[1]], [fosse[0] - 12, yF]], 4), h.a.hachure('bois'), true),
      h.chemin(bande([[c[0], c[1]], [fosse[1] + 12, yF]], 4), h.a.hachure('bois'), true),
      // le disque, les manches boulonnés, les cuillers
      h.cercle(c[0], c[1], Rd, blanc(h.a.contour)),
      ...angles.map(a => manche(c, Rp, rc, a, 14, 4.2, 3.6, p => h.cercle(p[0], p[1], 1.1, h.a.plein)).svg),
      ...angles.map(a => cuiller(c, Rp, rc, a)),
      // le tuyau monte du plancher, passe la vanne, se rétrécit en buse ; le jet
      tuyau([[xp, z.h + 2], [xp, yj], [xnb, yj]], 6),
      h.rect(xv - 8, yj - 10, 16, 20, blanc(h.a.arete)),
      h.ligne(xv, yj - 10, xv, yj - 21, h.a.arete),
      h.ellipse(xv, yj - 22.5, 10, 2.6, blanc(h.a.arete)),
      h.chemin([[xnb, yj - 6], [xn, yj - 2.5], [xn, yj + 2.5], [xnb, yj + 6]], blanc(h.a.arete), true),
      h.ligne(xnb, yj - 8.5, xnb, yj + 8.5, h.a.arete),
      h.rect(xn, yj - 2.5, c[0] + 0.76 * rc - 0.5 - xn, 5, h.a.hachure('eau', 'detail')),
      cuiller(c, Rp, rc, 90),
      // l'eau renvoyée retombe dans la fosse
      h.fleche(`M${c[0] - 2} ${yj + rc + 1} Q${c[0] - 20} ${yj + rc + 5} ${c[0] - 25} ${yj + rc + 40}`),
      h.fleche(`M${c[0] + 6} ${yj + rc + 3} Q${c[0] + 4} ${yj + rc + 20} ${c[0]} ${yj + rc + 46}`),
      // la poulie sur l'arbre, la courroie, la dynamo
      h.cercle(D[0], D[1], rm, blanc(h.a.arete)),
      h.cercle(D[0], D[1], rm - 5, h.a.detail),
      h.chemin([[D[0] - 13, D[1] + 14], [D[0] - 17, D[1] + rm + 1], [D[0] + 17, D[1] + rm + 1], [D[0] + 13, D[1] + 14]], blanc(h.a.arete)),
      h.rect(D[0] - 24, D[1] + rm + 1, 48, 3, blanc(h.a.arete)),
      h.cercle(c[0], c[1], r1, blanc(h.a.arete)),
      h.cercle(c[0], c[1], r1 - 3.5, h.a.detail),
      h.rect(c[0] - 14, c[1] - 7, 28, 14, h.a.hachure('bois')),
      h.cercle(c[0], c[1], 8, blanc(h.a.arete)),
      h.cercle(c[0], c[1], 3.5, h.a.plein),
      h.cercle(D[0], D[1], r2, blanc(h.a.arete)),
      h.cercle(D[0], D[1], r2 - 3.5, h.a.detail),
      h.cercle(D[0], D[1], 1.8, h.a.plein),
      ...courroie.map(b => h.chemin(b, blanc(h.a.arete), true)),
      // le sens de rotation
      h.fleche('M' + Array.from({ length: 17 }, (_, i) => {
        const a = rad(-72 - i * 78 / 16), R = Ro + 12;
        return `${f(c[0] + R * Math.cos(a))} ${f(c[1] + R * Math.sin(a))}`;
      }).join(' L')),
    ];
    const brinHaut = courroie[0];
    const tHaut = x => brinHaut[0][1] + (x - brinHaut[0][0]) / (brinHaut[1][0] - brinHaut[0][0]) * (brinHaut[1][1] - brinHaut[0][1]);
    return {
      dessin: out.join('\n'),
      renvois: [
        { n: 1, rond: [16, 150], cible: [xv - 6, yj - 23], texte: 'Vanne : on y bride la roue' },
        { n: 2, rond: [72, yF + 22], cible: [xnb + 12, yj + 4], texte: 'Le tuyau se rétrécit en buse' },
        { n: 3, rond: [238, tHaut(238) - 30], cible: [238, tHaut(238) + 1], texte: 'Grande poulie sur l’arbre, courroie en V' },
        { n: 4, rond: [D[0] + 16, D[1] - rm - 24], cible: [D[0] + 2, D[1] - rm + 3], texte: 'Dynamo : moteur à aimants permanents' },
      ],
    };
  };

  // ─── Une cuiller, de près ──────────────────────────────────────────────────────────────
  const CUILLER = z => {
    const k = 3.3, rc = 10.5 * k, Rp = 96 * k, Rd = Rp - rc - 1.5 * k;
    const P = [118, 170], c = [P[0], P[1] - Rp];
    const yR = x => c[1] + Math.sqrt(Rd * Rd - (x - c[0]) ** 2);
    const arc = Array.from({ length: 25 }, (_, i) => { const x = z.l - i * z.l / 24; return [x, yR(x)]; });
    const m = manche(c, Rp, rc, 90, 56, 16, 14, p => hexa(p, 4.6));
    const q = repere(c, Rp, 90);
    const demiTour = s => {
      const pts = [];
      for (let t = 12; t <= 90; t += 6) pts.push(q(0.58 * rc * Math.cos(rad(t)), s * 0.84 * rc * Math.sin(rad(t))));
      pts.push(q(-0.35 * rc, s * 0.8 * rc), q(-0.95 * rc, s * 0.66 * rc));
      return h.fleche(d2(pts));
    };
    const out = [
      h.chemin([[0, 0], [z.l, 0]].concat(arc), h.a.blanc, true),
      h.chemin(arc, h.a.contour),
      m.svg,
      // la buse et le jet
      h.chemin([[0, P[1] - 13], [16, P[1] - 8.25], [16, P[1] + 8.25], [0, P[1] + 13]], blanc(h.a.arete)),
      h.rect(16, P[1] - 8.25, P[0] + 12 - 16, 16.5, h.a.hachure('eau', 'detail')),
      cuiller(c, Rp, rc, 90, h.a.contour),
      demiTour(-1), demiTour(1),
    ];
    const sortie = q(-0.62 * rc, 0.74 * rc);
    return {
      dessin: out.join('\n'),
      renvois: [
        { n: 5, rond: [34, 62], cible: [m.b2[0] - 5, m.b2[1]], texte: 'Cuiller boulonnée au bord du disque' },
        { n: 6, rond: [40, 240], cible: sortie, texte: 'Le creux renvoie l’eau vers l’arrière' },
      ],
    };
  };

  // ─── L'hiver, en coupe ─────────────────────────────────────────────────────────────────
  // Dessiné à plat puis tassé en hauteur par Y ; la petite roue garde sa forme ronde.
  const HIVER = z => {
    const Y = y => f(-2.2 + 0.917 * y), P = ps => ps.map(p => [p[0], Y(p[1])]);
    const R = (x, y0, l, y1, at) => h.rect(x, Y(y0), l, Y(y1) - Y(y0), at);
    const ys = 56;                                            // surface du trou d'eau
    const fondBassin = [[0, 110], [50, 126], [100, 124], [128, 104]];
    const terrain = [[178, 86], [260, 104], [360, 134], [420, 152], [430, 156], [520, 156], [534, 172], [540, 184]];
    const lit = [[546, 212], [z.l, 214]];
    const sous = (ps, dy) => ps.map(p => [p[0], p[1] + dy]);
    const gel = sous(terrain.slice(0, 6), 26);
    const cw = [478, Y(108)], Rpw = 20, rcw = 3.5, Dw = [508, Y(96)], yjw = cw[1] + Rpw;
    const conduite = P([[80, 107], [118, 108], [150, 111], [178, 124], [260, 142], [360, 172], [420, 190], [446, 194]]).concat([[446, yjw], [452, yjw]]);
    const fosse = [462, 496];
    const out = [
      // le sol, le trou d'eau, le barrage
      h.chemin(P(fondBassin.concat([[178, 104]], terrain, lit)).concat([[z.l, z.h], [0, z.h]]), h.a.hachure('terre', 'aucun'), true),
      h.chemin(P([[0, ys], [128, ys]].concat(fondBassin.slice().reverse())), h.a.hachure('eau', 'aucun'), true),
      h.chemin(P(fondBassin), h.a.arete),
      h.chemin(P([[128, 57], [148, 57], [178, 86], [178, 104], [128, 104]]), h.a.hachure('pierre'), true),
      // la glace et la neige sur le trou d'eau ; l'eau reste ouverte là où elle passe le barrage
      R(0, ys - 10, 112, ys - 1, h.a.hachure('neige', 'aucun')),
      R(0, ys - 1, 112, ys + 6, h.a.blanc),
      h.chemin(P([[0, ys - 10], [112, ys - 10], [112, ys + 6], [0, ys + 6]]), h.a.arete),
      h.ligne(0, Y(ys - 1), 112, Y(ys - 1), h.a.detail),
      h.ligne(112, Y(ys), 128, Y(ys), h.a.detail),
      // la lame d'eau qui passe par-dessus la crête et descend le parement aval
      h.chemin(P([[112, 53.5], [149, 53.5], [181, 85.5], [178, 86], [148, 57], [112, 57]]), h.a.hachure('eau', 'detail'), true),
      // la neige sur le terrain, le terrain, la ligne de gel
      h.chemin(P(terrain.concat(sous(terrain, -9).reverse())), h.a.hachure('neige', 'aucun'), true),
      h.chemin(P(sous(terrain, -9)), h.a.fin),
      h.chemin(P(terrain.concat(lit)), h.a.contour),
      h.chemin(P(gel.filter(p => p[0] <= fosse[0]).concat([[fosse[0], 182]])), h.a.cache),
      h.chemin(P([[fosse[1], 182], [520, 182], [530, 193]]), h.a.cache),
      // le ruisseau en bas, sous la glace
      h.chemin(P([[540, 184], [z.l, 184], [z.l, 214], [546, 212]]), h.a.hachure('eau', 'aucun'), true),
      R(538, 174, z.l - 538, 183, h.a.hachure('neige', 'aucun')),
      R(540, 183, z.l - 540, 190, h.a.blanc),
      h.ligne(538, Y(174), z.l, Y(174), h.a.fin),
      h.ligne(541, Y(183), z.l, Y(183), h.a.detail),
      h.ligne(542, Y(190), z.l, Y(190), h.a.arete),
      // la fosse sous la roue et son retour au ruisseau
      R(fosse[0], 156, fosse[1] - fosse[0], 196, h.a.blanc),
      R(fosse[0], 184, fosse[1] - fosse[0], 196, h.a.hachure('eau', 'aucun')),
      h.ligne(fosse[0], Y(184), fosse[1], Y(184), h.a.detail),
      tuyau(P([[fosse[1] - 1, 190], [528, 200], [552, 204]]), 3),
      h.chemin(P([[fosse[0], 156], [fosse[0], 196], [fosse[1], 196], [fosse[1], 156]]), h.a.contour),
      // la conduite, de la prise à la roue ; la grille devant l'entrée
      tuyau(conduite, 3.5),
      R(64, 96, 18, 118, h.a.hachure('grillage')),
      // l'abri
      h.chemin(P([[426, 56], [530, 66], [530, 74], [426, 64]]), h.a.hachure('neige', 'aucun'), true),
      h.ligne(426, Y(56), 530, Y(66), h.a.fin),
      h.chemin(P([[438, 70.6], [518, 78.3], [518, 156], [438, 156]]), h.a.blanc, true),
      h.chemin(P([[426, 64], [530, 74], [530, 80], [426, 70]]), h.a.hachure('bois'), true),
      R(432, 70, 6, 156, h.a.hachure('bois')),
      R(518, 78, 6, 156, h.a.hachure('bois')),
      h.ligne(438, Y(156), fosse[0], Y(156), h.a.contour),
      h.ligne(fosse[1], Y(156), 518, Y(156), h.a.contour),
      tuyau(conduite.slice(-3), 3.5),
      h.chemin([[452, yjw - 3.5], [460, yjw - 1.2], [460, yjw + 1.2], [452, yjw + 3.5]], blanc(h.a.arete), true),
      h.ligne(460, yjw, cw[0] + 2.5, yjw, h.a.arete),
      // la roue, la dynamo sur sa tablette, la courroie
      h.chemin(bande([cw, [fosse[0] - 6, Y(156)]], 1.8), h.a.hachure('bois'), true),
      h.chemin(bande([cw, [fosse[1] + 6, Y(156)]], 1.8), h.a.hachure('bois'), true),
      h.cercle(cw[0], cw[1], Rpw - rcw - 0.6, blanc(h.a.arete)),
      ...Array.from({ length: 12 }, (_, k) => cuiller(cw, Rpw, rcw, 90 + k * 30, h.a.detail)),
      h.rect(500, Dw[1] + 6.5, 18, 3, blanc(h.a.detail)),
      h.cercle(Dw[0], Dw[1], 6.5, blanc(h.a.arete)),
      h.cercle(cw[0], cw[1], 7, blanc(h.a.detail)),
      ...brins(cw, 7, Dw, 2.5, 0).map(b => h.ligne(b[0][0], b[0][1], b[1][0], b[1][1], h.a.detail)),
      // l'eau : elle entre, passe le barrage, tombe de la roue, retourne au ruisseau
      h.fleche(`M4 ${Y(84)} L30 ${Y(86)}`),
      h.fleche(`M98 ${Y(66)} Q110 ${Y(50)} 126 ${Y(47)} L151 ${Y(47)} L184 ${Y(80)}`),
      h.fleche(`M${cw[0] - 2} ${yjw + 4} Q${cw[0] - 8} ${yjw + 20} ${cw[0] - 6} ${Y(181)}`),
      h.fleche(`M558 ${Y(200)} L584 ${Y(201)}`),
    ];
    return {
      dessin: out.join('\n'),
      renvois: [
        { n: 7, rond: [22, 20], cible: [40, Y(96)], texte: 'Trou d’eau qui ne gèle pas jusqu’au fond' },
        { n: 8, rond: [76, 20], cible: [72, Y(96)], texte: 'Prise sous la glace, derrière une grille' },
        { n: 9, rond: [150, 20], cible: [164, Y(70)], texte: 'Le reste passe : jamais tout le ruisseau' },
        { n: 10, rond: [300, 56], cible: [300, Y(152)], texte: 'Conduite enfouie sous la ligne de gel (tireté)' },
        { n: 11, rond: [478, 22], cible: [cw[0], cw[1] - 12], texte: 'Roue et dynamo dans un petit abri' },
      ],
    };
  };

  return {
    ref: '86-02',
    titre: 'La roue à cuillers, montée pour l’hiver',
    desc: 'Trois vues. La roue de face : le tuyau monte du plancher de l’abri, passe une vanne et se rétrécit en buse ; ' +
      'le jet frappe de côté la cuiller du bas, sur le cercle des cuillers boulonnées au bord d’un disque, et la roue tourne dans le sens du jet ; ' +
      'l’eau retombe dans une fosse sous la roue ; une grande poulie sur l’arbre entraîne par courroie la petite poulie d’une dynamo posée sur une tablette. ' +
      'De près, une cuiller : le manche boulonné à plat sur le bord du disque, le creux tourné vers le jet, où l’eau fait demi-tour et repart vers l’arrière. ' +
      'En coupe, l’installation d’hiver : un trou d’eau derrière un petit barrage, sous la glace et la neige ; la prise dans l’eau, derrière une grille ; ' +
      'le reste du ruisseau passe par-dessus le barrage ; la conduite, enfouie sous la ligne de gel, descend jusqu’à un petit abri où tournent la roue et la dynamo ; ' +
      'l’eau de la fosse retourne au ruisseau sous la glace. Encadré danger : la glace au-dessus du trou d’eau.',
    format: 'pleine',
    disposition: [['roue', 'cuiller'], ['hiver']],
    hauteurs: [4, 3],
    largeurs: [[5, 3], [1]],
    vues: {
      roue: { titre: 'La roue, de face', dessin: z => ROUE(z).dessin, renvois: z => ROUE(z).renvois },
      cuiller: { titre: 'Une cuiller, de près', dessin: z => CUILLER(z).dessin, renvois: z => CUILLER(z).renvois },
      hiver: { titre: 'Pour passer l’hiver, en coupe', dessin: z => HIVER(z).dessin, renvois: z => HIVER(z).renvois },
    },
    danger: 'Au-dessus d’un trou d’eau qui ne gèle pas, la glace est mangée par en dessous : on entretient la prise du bord, jamais sur la glace. ' +
      'L’eau glacée coupe les mains en quelques minutes : on y travaille à deux.',
  };
};
