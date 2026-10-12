// Planche 29-04 — Faire durcir l'utérus (chapitre 29, section H, points 62, 67 et 68).
// La mère est couchée sur le dos, les genoux pliés, la tête à gauche dans les quatre vues.
// Les vues de profil la montrent du côté droit ; l'aide de la compression de l'aorte est à sa
// gauche, donc de l'autre côté du corps : on ne voit que son bras. Dans la vue de dessus, le
// côté gauche de la mère est en haut, et les bras de l'aide arrivent par le haut.
// Unités du corps : le mm, le lit en y = 0, y négatif vers le haut ; chaque vue a son échelle.
module.exports = (h) => {
  const A = h.a, F = h.formes;
  const r1 = v => Math.round(v * 10) / 10;
  const NL = String.fromCharCode(10);

  // Une courbe qui passe par chaque point (Catmull-Rom en cubiques).
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
  // plusieurs courbes bout à bout en une seule forme (pour le blanc)
  const joindre = (...ds) => ds.map((d, i) => i ? d.replace(/^M/, 'L') : d).join(' ') + ' Z';
  const inv = P => P.slice().reverse();

  // Le repère d'une vue : une fenêtre en mm [x0, x1, y0, y1] centrée dans la zone.
  const cadre = (z, w) => {
    const s = Math.min(z.l / (w[1] - w[0]), z.h / (w[3] - w[2]));
    const ox = (z.l - (w[1] - w[0]) * s) / 2 - w[0] * s;
    const oy = (z.h - (w[3] - w[2]) * s) / 2 - w[2] * s;
    const T = p => [r1(ox + p[0] * s), r1(oy + p[1] * s)];
    return { s, T, P: pts => pts.map(T) };
  };
  const coupe = (id, z, contenu) =>
    `<clipPath id="${id}"><rect x="0" y="0" width="${z.l}" height="${z.h}"/></clipPath>\n<g clip-path="url(#${id})">\n${contenu}\n</g>`;

  // ─── le corps de profil, couché sur le dos, genoux pliés (mm) ───────────────────────
  const DOS = [[-950, 0], [-300, -2], [-190, -12], [-90, -6], [-20, 0], [40, 0]];
  // bosses : [{ x, p, l }] un enfoncement de p mm centré en x sur une demi-largeur l (p < 0 : une bosse)
  const ventre = (bosses = []) => {
    const base = [[-950, -160], [-760, -165], [-700, -178], [-630, -195], [-560, -208], [-505, -232], [-460, -248],
      [-420, -244], [-388, -226], [-350, -213], [-300, -220], [-240, -237], [-195, -246], [-178, -248], [-168, -241],
      [-158, -248], [-130, -248], [-90, -241], [-45, -227], [0, -207], [25, -192]];
    return base.map(([x, y]) => [x, bosses.reduce((yy, b) => {
      const d = Math.abs(x - b.x) / b.l;
      return d < 1 ? yy + b.p * (1 + Math.cos(Math.PI * d)) / 2 : yy;
    }, y)]);
  };
  const CUISSE_HAUT = [[25, -192], [90, -247], [170, -313], [250, -378], [318, -430], [352, -452], [375, -455], [393, -440], [400, -418],
    [408, -380], [440, -300], [480, -210], [518, -130], [545, -85], [580, -62], [650, -38], [715, -18], [735, -6], [732, 0]];
  const MOLLET = [[522, -2], [522, -50], [505, -110], [475, -180], [430, -250], [385, -295], [352, -318], [340, -322]];
  const CUISSE_BAS = [[340, -322], [318, -300], [270, -245], [205, -178], [140, -112], [95, -62], [70, -25], [55, -5], [40, 0]];
  // la coupe par le milieu : du pubis à la fesse, en passant par la vulve
  const MONT = [[0, -207], [30, -196], [55, -180], [68, -164], [75, -150]];
  const PERINEE = [[82, -85], [88, -68], [85, -48], [72, -26], [55, -8], [40, 0]];

  const lit = (c, w) => [
    h.chemin(c.P([[w[0] - 50, 0], [w[1] + 50, 0]]), A.contour),
    h.chemin(c.P([[w[0] - 50, 26], [w[1] + 50, 26]]), A.arete),
  ].join(NL);

  // La jambe seule (la cuisse, le genou, le mollet), en blanc puis au trait.
  const jambe = (c, at) => [
    h.path(joindre(cr(c.P(CUISSE_HAUT)), cr(c.P(MOLLET)), cr(c.P(CUISSE_BAS))), A.blanc),
    h.path(cr(c.P(CUISSE_HAUT)), at), h.path(cr(c.P(MOLLET)), at), h.path(cr(c.P(CUISSE_BAS)), at),
  ].join(NL);

  // Le corps vu de dehors.
  const corpsDehors = (c, bosses) => {
    const V = ventre(bosses);
    const blanc = joindre(cr(c.P(DOS)), cr(c.P(inv(CUISSE_BAS))), cr(c.P(inv(MOLLET))),
      `M ${c.T([732, 0]).join(' ')}`, cr(c.P(inv(CUISSE_HAUT))), cr(c.P(inv(V))));
    return [
      h.path(blanc, A.blanc),
      h.path(cr(c.P(DOS)), A.arete),
      h.path(cr(c.P(V)), A.contour),
      h.path(cr(c.P(CUISSE_HAUT)), A.contour),
      h.path(cr(c.P(MOLLET)), A.contour),
      h.path(cr(c.P(CUISSE_BAS)), A.contour),
    ].join(NL);
  };

  // L'utérus en poire, du bout du col (C) au fond (Fd) ; k grossit la poire.
  const uterus = (c, C, Fd, k = 1) => {
    const ax = [Fd[0] - C[0], Fd[1] - C[1]], L = Math.hypot(ax[0], ax[1]);
    const a = [ax[0] / L, ax[1] / L], n = [-a[1], a[0]];
    const prof = [[0.03, 13], [0.1, 15], [0.18, 15], [0.24, 18], [0.32, 33], [0.42, 48], [0.56, 58], [0.7, 61], [0.82, 55], [0.91, 40], [0.97, 20]];
    const pt = (t, w) => [C[0] + a[0] * t * L * k + n[0] * w * k, C[1] + a[1] * t * L * k + n[1] * w * k];
    const cote1 = prof.map(([t, w]) => pt(t, w)), cote2 = prof.map(([t, w]) => pt(t, -w)).reverse();
    return cr(c.P([pt(0, 0), ...cote1, pt(1, 0), ...cote2]), true);
  };


  // ─── les vues ────────────────────────────────────────────────────────────────────────
  const W1 = [-340, 70, -430, 30];
  const W2 = [-320, 200, -350, 30];
  const W3 = [-680, 760, -560, 40];
  const at = (c, p) => { const q = c.T(p); return { x: q[0], y: q[1] }; };
  // la rotation de l'avant-bras : une ellipse autour de lui, à d mm au-dessus du poignet
  const tourner = (m, d, s) => {
    const [wx, wy] = m.poignet, [bx, by] = m.bras, L = Math.hypot(bx - wx, by - wy);
    const ex = wx + (bx - wx) / L * d * s, ey = wy + (by - wy) / L * d * s, rx = 64 * s, ry = 16 * s;
    return h.fleche(`M ${r1(ex - rx)} ${r1(ey)} A ${r1(rx)} ${r1(ry)} 0 1 0 ${r1(ex + rx * 0.5)} ${r1(ey - ry * 0.866)}`, A.arete);
  };

  // v1 : la main à plat sur le ventre, par-dessus le haut de l'utérus
  const H1 = [-185, -253];
  // v2 : la poire de l'utérus, du bout du col au fond ; le poing ; la main du dessus
  const C2 = [-52, -62], F2 = [-185, -205], P2 = [-25, -120], H2 = [-200, -234];
  // v3 : le poing de l'aide, la main à l'aine
  const P3 = [-215, -264], D3 = [46, -298];

  return {
    ref: '29-04',
    titre: 'Faire durcir l’utérus après la naissance',
    desc: 'Trois vues d’une mère couchée sur le dos, genoux pliés, tête à gauche. En haut à gauche, de profil : la main à plat sur le ventre, par-dessus le haut de l’utérus (dessiné en tireté), le serre en tournant. En haut à droite, en coupe par le milieu du corps : un poing fermé au fond du vagin, au-dessus du col, et l’autre main sur le ventre qui ramène l’utérus vers ce poing. En bas, tout le corps de profil : l’aide, de l’autre côté, pousse du poing, bras tendu, sur le ventre juste au-dessus du nombril, du côté gauche de la mère ; son autre main a les doigts au pli de l’aine, sur le pouls.',
    format: 'pleine',
    disposition: [['frotter', 'deuxMains'], ['aorte']],
    largeurs: [[4, 5], [1]],
    hauteurs: [1, 1],
    vues: {
      frotter: {
        titre: 'Utérus mou : le frotter',
        dessin: z => {
          const c = cadre(z, W1), s = c.s;
          const main = F.main({ ...at(c, H1), pose: 'appui', vue: 'profil', angle: 4, inclinaison: 42, bras: 400, echelle: s });
          return coupe('zone-29-04-a', z, [
            lit(c, W1),
            corpsDehors(c, [{ x: -165, p: -6, l: 70 }]),
            h.path(uterus(c, [-50, -62], [-178, -240], 1.05), A.cache),
            main,
            tourner(main, 70, s),
          ].join(NL));
        },
        renvois: z => {
          const c = cadre(z, W1), [cx, cy] = c.T([-150, -268]);
          return [{ n: 1, rond: [z.l - 18, 18], cible: [cx, cy], texte: 'Serrer l’utérus en tournant jusqu’à ce qu’il durcisse' }];
        },
      },
      deuxMains: {
        titre: 'Ça saigne encore : à deux mains, en coupe',
        dessin: z => {
          const c = cadre(z, W2), s = c.s;
          const V = ventre([{ x: -160, p: 14, l: 110 }]).slice(0, -1);
          const blancCoupe = joindre(cr(c.P(DOS)), cr(c.P(inv(PERINEE))), cr(c.P(inv(MONT))), cr(c.P(inv(V))));
          // le vagin, élargi autour du poing et de l'avant-bras ; le col y entre par le haut, au fond
          const vagin = cr(c.P([[75, -151], [40, -159], [0, -167], [-30, -171], [-50, -161], [-60, -140],
            [-63, -110], [-70, -82], [-78, -56], [-68, -36], [-44, -38], [-22, -62], [0, -70], [40, -78], [82, -85]]));
          const poing = F.main({ ...at(c, P2), pose: 'prise', vue: 'dos', diametre: 16 * s, angle: 194, bras: 420, echelle: s });
          const dessus = F.main({ ...at(c, H2), pose: 'appui', vue: 'profil', angle: 0, inclinaison: 42, bras: 400, echelle: s });
          const [f1x, f1y] = c.T([-130, -335]), [f2x, f2y] = c.T([-75, -285]);
          return coupe('zone-29-04-b', z, [
            lit(c, W2),
            h.path(blancCoupe, A.blanc),
            h.path(cr(c.P(DOS)), A.arete),
            h.path(cr(c.P(V)), A.contour),
            h.path(cr(c.P(MONT)), A.contour),
            h.path(cr(c.P(PERINEE)), A.contour),
            h.path(vagin + ' Z', A.blanc),
            h.path(vagin, A.arete),
            h.path(uterus(c, C2, F2), A.arete.replace('fill="none"', 'fill="#FFFFFF"')),
            poing,
            dessus,
            h.fleche(`M ${r1(f1x)} ${r1(f1y)} L ${r1(f2x)} ${r1(f2y)}`, A.arete),
          ].join(NL));
        },
        renvois: z => {
          const c = cadre(z, W2);
          const [px, py] = c.T([5, -100]), [ax, ay] = c.T([-225, -262]);
          return [
            { n: 2, rond: [z.l - 18, z.h - 40], cible: [px, py], texte: 'Poing au fond du vagin, au-dessus du col' },
            { n: 3, rond: [18, 18], cible: [ax, ay], texte: 'L’autre main ramène l’utérus vers le poing' },
          ];
        },
      },

      aorte: {
        titre: 'Toujours rien : comprimer l’aorte',
        dessin: z => {
          const c = cadre(z, W3), s = c.s;
          const poing = F.main({ ...at(c, P3), pose: 'prise', vue: 'dos', diametre: 16 * s, angle: 100, bras: 800, echelle: s });
          const doigts = F.main({ ...at(c, D3), pose: 'appui', vue: 'dos', cote: 'gauche', angle: -80, bras: 600, echelle: s });
          const [a1x, a1y] = c.T([-120, -540]), [a2x, a2y] = c.T([-120, -360]);
          return coupe('zone-29-04-c', z, [
            lit(c, W3),
            corpsDehors(c, [{ x: P3[0], p: 20, l: 45 }]),
            poing,
            doigts,
            h.fleche(`M ${r1(a1x)} ${r1(a1y)} L ${r1(a2x)} ${r1(a2y)}`, A.contour),
          ].join(NL));
        },
        renvois: z => {
          const c = cadre(z, W3);
          const [bx, by] = c.T([-215, -470]), [px, py] = c.T([-240, -262]), [dx, dy] = c.T([46, -330]);
          return [
            { n: 4, rond: [bx - 50, 18], cible: [bx - 4, by], texte: 'Bras tendu : pousser fort vers le dos' },
            { n: 5, rond: [bx - 80, py - 30], cible: [px, py], texte: 'Poing au-dessus du nombril, côté gauche de la mère' },
            { n: 6, rond: [dx + 50, 18], cible: [dx + 6, dy], texte: 'À l’aine : appuyer jusqu’à perdre le pouls' },
          ];
        },
      },
    },
    danger: 'Danger — la main entre dans le vagin, jamais dans l’utérus : elle porterait les germes jusqu’à la plaie ouverte du placenta.',
  };
};
