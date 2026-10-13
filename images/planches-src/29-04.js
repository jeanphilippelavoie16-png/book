// Planche 29-04 — Faire durcir l'utérus (chapitre 29, section H, points 62, 67 et 68).
// Refaite le 12 octobre (JP : « toute est mal faite ») : la mère et l'aide sont le pictogramme
// de la règle 8 (h.formes.personnage), les mains celles de la bibliothèque (h.formes.main).
// La mère est couchée sur le dos, les genoux pliés, la tête à gauche dans les trois vues ; on la
// voit du côté droit. L'aide est à genoux de l'autre côté du corps (à gauche de la mère), donc
// derrière elle : son corps est caché par celui de la mère, ses bras et ses mains passent devant.
// La vue du milieu est un gros plan en coupe par le milieu du corps (la jambe proche enlevée) :
// l'utérus, le vagin, le poing, sans aucune anatomie détaillée.
// Repère de chaque vue : M(x, h) en mm, x vers les pieds depuis la hanche, h au-dessus du sol.
module.exports = (h) => {
  const A = h.a, F = h.formes;
  const r1 = v => Math.round(v * 10) / 10;
  const NL = String.fromCharCode(10);

  // une courbe fermée lisse par des points (Catmull-Rom en cubiques)
  const cr = (P, ferme = false) => {
    const n = P.length;
    const g = i => ferme ? P[(i + n) % n] : P[Math.max(0, Math.min(n - 1, i))];
    let d = `M ${r1(P[0][0])} ${r1(P[0][1])}`;
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C ${r1(c1[0])} ${r1(c1[1])} ${r1(c2[0])} ${r1(c2[1])} ${r1(p2[0])} ${r1(p2[1])}`;
    }
    return ferme ? d + ' Z' : d;
  };

  // Le repère d'une vue : la fenêtre [x0, x1, h0, h1] en mm, centrée dans la zone ; le sol en h = 0.
  const cadre = (z, w) => {
    const s = Math.min(z.l / (w[1] - w[0]), z.h / (w[3] - w[2]));
    const ox = (z.l - (w[1] - w[0]) * s) / 2 - w[0] * s;
    const oy = (z.h - (w[3] - w[2]) * s) / 2 + w[3] * s;
    const T = (x, hh) => [r1(ox + x * s), r1(oy - hh * s)];
    return { s, T, P: pts => pts.map(([x, hh]) => T(x, hh)), sol: oy };
  };
  const coupe = (id, z, contenu) =>
    `<clipPath id="${id}"><rect x="0" y="0" width="${z.l}" height="${z.h}"/></clipPath>\n<g clip-path="url(#${id})">\n${contenu}\n</g>`;
  const sol = (z, c) => [h.ligne(0, c.sol, z.l, c.sol, A.contour), h.ligne(0, c.sol + 7, z.l, c.sol + 7, A.fin)].join(NL);

  const mere = (c, extra = {}) => {
    const [x, y] = c.T(0, 0);
    return F.personnage({ x, y, pose: 'couche-genoux', echelle: c.s, ...extra });
  };
  // l'utérus en poire, du col (C) au fond (Fd), en mm ; k : la largeur
  const uterus = (c, C, Fd, k = 1) => {
    const ax = [Fd[0] - C[0], Fd[1] - C[1]], L = Math.hypot(ax[0], ax[1]);
    const a = [ax[0] / L, ax[1] / L], n = [-a[1], a[0]];
    const prof = [[0.04, 14], [0.14, 16], [0.24, 20], [0.34, 34], [0.46, 48], [0.6, 56], [0.74, 57], [0.86, 50], [0.95, 32]];
    const pt = (t, w) => [C[0] + a[0] * t * L + n[0] * w * k, C[1] + a[1] * t * L + n[1] * w * k];
    return cr(c.P([pt(0, 0), ...prof.map(([t, w]) => pt(t, w)), pt(1, 0), ...prof.map(([t, w]) => pt(t, -w)).reverse()]), true);
  };
  // la rotation de la main : une ellipse à plat au-dessus d'elle
  const tour = (cx, cy, rx, ry) =>
    h.path(`M ${r1(cx - rx)} ${r1(cy)} A ${r1(rx)} ${r1(ry)} 0 1 0 ${r1(cx + rx * 0.5)} ${r1(cy - ry * 0.866)}`, 'fill="none" stroke="#FFFFFF" stroke-width="4.4" stroke-linecap="round"') + NL +
    h.fleche(`M ${r1(cx - rx)} ${r1(cy)} A ${r1(rx)} ${r1(ry)} 0 1 0 ${r1(cx + rx * 0.5)} ${r1(cy - ry * 0.866)}`, A.arete);

  // l'avant-bras de l'aide en aplat noir, comme son corps dans la vue d'ensemble : de la coupe de
  // la main (m.coupe) jusqu'hors de la vue
  const avBras = (m, L = 900) => {
    const [a, b] = m.coupe, d0 = [m.bras[0] - m.poignet[0], m.bras[1] - m.poignet[1]];
    const n = Math.hypot(d0[0], d0[1]), d = [d0[0] / n * L, d0[1] / n * L];
    const ra = Math.hypot(a[0] - b[0], a[1] - b[1]) / 2, k = 0.12;
    const a2 = [a[0] - d0[0] / n * ra * k, a[1] - d0[1] / n * ra * k], b2 = [b[0] - d0[0] / n * ra * k, b[1] - d0[1] / n * ra * k];
    return h.chemin([a2, b2, [b[0] + d[0], b[1] + d[1]], [a[0] + d[0], a[1] + d[1]]], 'fill="#1A1A1A" stroke="#FFFFFF" stroke-width="1.2" stroke-linejoin="round"', true);
  };

  // Les mains calquées (images/modeles), avec la manche noire d'avBras sur leur poignet.
  // plat : s10-plat (la main tendue de s10, le pouce le long de l'index) retourné, la paume à plat
  // sur le ventre, les doigts vers la droite ; (x, y) sous le gras du pouce, le bout des doigts au
  // même niveau ; incl : l'angle de l'avant-bras sur la surface, vers le haut à gauche.
  // poingS : s11 (poing fermé), l'avant-bras vers la droite, le pouce en haut ; (x, y) au creux du poing.
  const manche = (A, B, d) => { const M = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2]; return { coupe: [A, B], poignet: M, bras: [M[0] + d[0], M[1] + d[1]] }; };
  const plat = (x, y, s, incl) => {
    const m = F.modele('s10-plat', { x, y, ancre: [115, 28], angle: 180 + 10.7, echelle: 0.89 * s, masquer: [[228, 0, 245, 125]] });
    const r = incl * Math.PI / 180;
    return { svg: String(m), m: manche(m.P([228, 57.6]), m.P([228, 110.8]), [-Math.cos(r), -Math.sin(r)]) };
  };
  const poingS = (x, y, s) => {
    const m = F.modele('s11', { x, y, ancre: [68, 42], angle: -90, echelle: 0.82 * s, masquer: [[0, 125, 140, 175]] });
    return { svg: String(m), m: manche(m.P([20.1, 125]), m.P([76.7, 125]), [1, 0]) };
  };

  // l'aide, à genoux derrière la mère, tournée vers ses pieds
  // (aplat noir : elle se détache de la mère, dessinée au trait devant elle)
  const aide = (c, xGenou, penche, prises, cote) => {
    const [x, y] = c.T(xGenou, 0);
    return F.personnage({ x, y, pose: 'genoux', penche, regard: 30, echelle: c.s, prises, rendu: 'plein', cote });
  };
  // l'aide dont le bras proche descend tendu, à la verticale, jusqu'au poing : on cherche le penché
  // qui met l'épaule à bout de bras au-dessus du poignet, puis on la glisse au-dessus de lui
  const aideBrasTendu = (c, prises) => {
    const L = (300 + 255) * c.s;
    let best = null;
    for (let p = 0; p <= 70; p += 0.5) {
      const a = aide(c, -560, p, prises);
      const S = a.epaules.proche, W = a.mains.proche.poignet;
      const e = Math.abs(W[1] - S[1] - L);
      if (!best || e < best.e) best = { e, p, dx: (W[0] - S[0]) / c.s };
    }
    return aide(c, -560 + best.dx, best.p, prises);
  };

  // les fenêtres
  const W1 = [-330, 300, -10, 470];
  const W2 = [-330, 300, -10, 470];
  const W3 = [-1060, 790, -10, 1330];

  return {
    ref: '29-04',
    titre: 'Faire durcir l’utérus après la naissance',
    desc: 'Trois vues d’une mère couchée sur le dos, genoux pliés, tête à gauche, dessinée en pictogramme ; l’aide est à genoux de l’autre côté d’elle. En haut à gauche : la main de l’aide à plat sur le ventre, par-dessus le haut de l’utérus (dessiné en tireté), le serre en tournant. En haut à droite, gros plan en coupe par le milieu du corps : un poing fermé au fond du vagin, au-dessus du col, et l’autre main sur le ventre qui ramène l’utérus vers ce poing. En bas : l’aide pousse du poing, bras tendu, sur le ventre juste au-dessus du nombril, du côté gauche de la mère ; son autre main a les doigts au pli de l’aine, sur le pouls.',
    format: 'pleine',
    disposition: [['frotter', 'deuxMains'], ['aorte']],
    largeurs: [[1, 1], [1]],
    hauteurs: [1, 1.5],
    vues: {
      frotter: {
        titre: 'Utérus mou : le frotter',
        dessin: z => {
          const c = cadre(z, W1), s = c.s;
          const [hx, hy] = c.T(-180, 287);
          const m = plat(hx, hy, s, 38);
          return coupe('zone-29-04-a', z, [
            sol(z, c),
            mere(c),
            h.path(uterus(c, [10, 120], [-195, 268], 1.05), A.cache),
            avBras(m.m),
            m.svg,
            tour(hx + 18 * s, hy - 70 * s, 70 * s, 18 * s),
          ].join(NL));
        },
        renvois: z => {
          const c = cadre(z, W1), [cx, cy] = c.T(-140, 300);
          return [{ n: 1, rond: [z.l - 18, 18], cible: [cx, cy], texte: 'Serrer l’utérus en tournant jusqu’à ce qu’il durcisse' }];
        },
      },
      deuxMains: {
        titre: 'Ça saigne encore : à deux mains, en coupe',
        dessin: z => {
          const c = cadre(z, W2), s = c.s;
          // le ventre enfoncé là où la main du dessus appuie
          const m = mere(c, { coupe: true });
          // le vagin élargi autour du poing et de l'avant-bras, de la vulve au col
          const vagin = cr(c.P([[100, 200], [60, 222], [20, 232], [-30, 230], [-66, 210], [-76, 168], [-64, 120],
            [-24, 100], [20, 104], [60, 120], [100, 134]]));
          const [qx, qy] = c.T(-8, 166);
          const poing = poingS(qx, qy, s);
          const [dx, dy] = c.T(-205, 287);
          const dessus = plat(dx, dy, s, 40);
          const [f1x, f1y] = c.T(-150, 420), [f2x, f2y] = c.T(-95, 340);
          return coupe('zone-29-04-b', z, [
            sol(z, c),
            m,
            h.path(uterus(c, [-50, 160], [-200, 270], 0.95), A.arete.replace('fill="none"', 'fill="#FFFFFF"')),
            h.path(vagin, A.blanc),
            h.path(vagin.replace(/ Z$/, ''), A.detail),
            avBras(poing.m),
            poing.svg,
            avBras(dessus.m),
            dessus.svg,
            h.fleche(`M ${r1(f1x)} ${r1(f1y)} L ${r1(f2x)} ${r1(f2y)}`, A.arete),
          ].join(NL));
        },
        renvois: z => {
          const c = cadre(z, W2);
          const [px, py] = c.T(-20, 170), [ax, ay] = c.T(-230, 300);
          return [
            { n: 2, rond: [z.l - 18, z.h - 30], cible: [px, py], texte: 'Poing au fond du vagin, au-dessus du col' },
            { n: 3, rond: [18, 18], cible: [ax, ay], texte: 'L’autre main ramène l’utérus vers le poing' },
          ];
        },
      },

      aorte: {
        titre: 'Toujours rien : comprimer l’aorte',
        dessin: z => {
          const c = cadre(z, W3);
          const [px, py] = c.T(-235, 330), [gx, gy] = c.T(40, 262);
          const a = aideBrasTendu(c, {
            proche: { x: px, y: py, pose: 'prise', vue: 'dos', angle: 90, diametre: 22 * c.s, bras: 15 },
            loin: { x: gx, y: gy, pose: 'appui', vue: 'profil', angle: 48, bras: 15 },
          });
          const [a1x, a1y] = c.T(-330, 760), [a2x, a2y] = c.T(-330, 560);
          return coupe('zone-29-04-c', z, [
            sol(z, c),
            a,
            mere(c),
            a.mains.loin,
            a.mains.proche,
            h.fleche(`M ${r1(a1x)} ${r1(a1y)} L ${r1(a2x)} ${r1(a2y)}`, A.contour),
          ].join(NL));
        },
        renvois: z => {
          const c = cadre(z, W3);
          const [bx, by] = c.T(-250, 560), [px, py] = c.T(-235, 300), [dx, dy] = c.T(40, 280);
          return [
            { n: 4, rond: [bx - 120, 24], cible: [bx, by], texte: 'Bras tendu : pousser fort vers le dos' },
            { n: 5, rond: [px - 150, py - 10], cible: [px, py], texte: 'Poing au-dessus du nombril, côté gauche de la mère' },
            { n: 6, rond: [dx + 120, 24], cible: [dx, dy], texte: 'À l’aine : appuyer jusqu’à perdre le pouls' },
          ];
        },
      },
    },
    danger: 'Danger — la main entre dans le vagin, jamais dans l’utérus : elle porterait les germes jusqu’à la plaie ouverte du placenta.',
  };
};
