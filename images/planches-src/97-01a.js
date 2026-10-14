// Planche 97-01a — La couche chaude au fumier, en coupe et vue de dessus (chapitre 97, §5-B,
// étapes 7 à 12, et le tableau Matériel).
// Le chapitre dit : fosse d'au moins 46 cm, environ 90 cm plus large que le coffre ; 10 cm de gros
// gravier au fond ; fumier frais par lits tassés, 60 à 75 cm pour une couche faite tôt ; le coffre
// posé dessus, 10 à 15 cm de fumier tassé dedans ; rechaussage de fumier contre l'extérieur du
// coffre jusqu'en haut, 30 à 38 cm de large ; 13 à 15 cm de terreau, presque au bord bas du coffre ;
// coffre de madriers, l'arrière au moins 15 cm plus haut, intérieur 173 cm (5 pi 8 po) pour un
// châssis de 91 × 183 cm (3 × 6 pi), un châssis par 91 × 183 cm de couche, coins renforcés ;
// thermomètre à sonde planté à 8 cm dans le terreau.
// Le dessin est à l'échelle, en cm : lit de 68 cm, 12 cm de fumier dans le coffre, 14 cm de
// terreau, devant de 30 cm. Madriers de 5 cm, poteaux de coin de 7 cm : épaisseurs de dessin,
// sans cote. Aucune hauteur de devant n'est cotée : le chapitre n'en donne pas.
module.exports = (h) => {
  const A = h.a;
  const PW = 273, PD = 46, GR = 10, BT = 32;         // fosse, gravier, dessus du lit
  const CX0 = 45, CX1 = 228, EP = 5;                // coffre, extérieur nord-sud, madrier
  const FT = 62, BK = 77;                           // dessus du devant, de l'arrière
  const FI = 44, TE = 58;                           // dessus du fumier dans le coffre, du terreau
  const CH = 4.5;                                   // épaisseur du châssis
  const RF = 15, RB = 258;                          // bord extérieur du rechaussage, en haut
  const XL = -10, XR = 283, ZB = -54;               // terre montrée autour
  const PE = 181, CY0 = 45, CY1 = 136;              // plan : fosse est-ouest, coffre est-ouest
  const TX = 170;                                   // le thermomètre
  const ZT = 97, ZBAS = -66, YH = -15, YB = 218;      // étendue des deux vues
  const XG = -18, XD = 291;                         // colonnes de cotes

  const blanc = (a) => a.replace('fill="none"', 'fill="#FFFFFF"');
  const poly = (pts, a) => h.chemin(pts, a, true);

  // Une seule échelle pour les deux vues, et la même origine en x : elles s'alignent.
  // Une seule échelle pour les deux vues : la largeur la fixe, plafonnée pour que les deux
  // rangées tiennent en hauteur ; les deux vues ont la même largeur, donc la même origine en x.
  const SMAX = 1.55;
  const echelle = (z) => Math.min((z.l - 130) / (XD - XG), SMAX);

  const rep = (z) => {
    const S = echelle(z), ox = (z.l - ((XD - XG) * S + 130)) / 2 + 62 - XG * S;
    const oy = (z.h - (ZT - ZBAS) * S) / 2 + ZT * S;
    const p = (x, zz) => [ox + S * x, oy - S * zz];
    return { S, p };
  };
  const repP = (z) => {
    const S = echelle(z), ox = (z.l - ((XD - XG) * S + 130)) / 2 + 62 - XG * S;
    const oy = (z.h - (YB - YH) * S) / 2 - YH * S;
    const q = (x, y) => [ox + S * x, oy + S * y];
    return { S, q };
  };

  const glace = (x) => FT + (BK - FT) * (x - CX0) / (CX1 - CX0);   // dessous du châssis
  const talusAv = (zz) => RF * zz / FT;                             // pied avant du talus
  const talusAr = (zz) => PW - (PW - RB) * zz / BK;

  // un lit : une ligne qui ondule un peu, parce que le fumier ne se pose pas au cordeau
  const lit = (p, x0, x1, zz) => {
    const pts = [];
    for (let x = x0; x <= x1 + 0.01; x += 6) pts.push(p(x, zz + 0.9 * Math.sin(x / 7)));
    return h.chemin(pts, A.detail);
  };

  // une cote à traits d'arrêt longs et fond blanc sous le chiffre, pour la poser sur une trame
  const coteF = (x1, y1, x2, y2, t, o = {}) => {
    const vert = Math.abs(y2 - y1) > Math.abs(x2 - x1), w = h.largeur(t, 12) + 6;
    const out = [];
    if (vert) {
      const cx = (x1 + x2) / 2 + (o.cote === 'gauche' ? -(8 + w / 2 - 3) : 8 + w / 2 - 3), cy = (y1 + y2) / 2;
      out.push(h.rect(cx - w / 2, cy - 9, w, 16, 'fill="#FFFFFF" stroke="none"'));
      out.push(h.ligne(x1 - 9, y1, x1 + 9, y1, A.detail), h.ligne(x2 - 9, y2, x2 + 9, y2, A.detail));
    } else {
      const cx = (x1 + x2) / 2, cy = (y1 + y2) / 2 + (o.cote === 'dessous' ? 11 : -9);
      out.push(h.rect(cx - w / 2, cy - 9, w, 16, 'fill="#FFFFFF" stroke="none"'));
    }
    out.push(h.cote(x1, y1, x2, y2, t, o));
    return out.join('\n');
  };

  const fleche = (a, b) => [
    h.ligne(a[0], a[1], b[0], b[1], 'fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round"'),
    h.fleche(`M${a[0]} ${a[1]} L${b[0]} ${b[1]}`, A.arete),
  ].join('\n');

  const coupe = (z) => {
    const { S, p } = rep(z);
    const o = [];
    // la terre en place, la fosse creusée dedans
    o.push(poly([p(XL, 0), p(0, 0), p(0, -PD), p(PW, -PD), p(PW, 0), p(XR, 0), p(XR, ZB), p(XL, ZB)], A.hachure('terre', 'fin')));
    o.push(h.chemin([p(XL, 0), p(XL, ZB), p(XR, ZB), p(XR, 0)], A.fin));
    // le gravier
    o.push(poly([p(0, -PD), p(PW, -PD), p(PW, -PD + GR), p(0, -PD + GR)], A.hachure('gravier', 'detail')));
    // le fumier : les lits dans la fosse et au-dessus, et le rechaussage contre le coffre
    o.push(poly([p(0, -PD + GR), p(0, 0), p(RF, FT), p(CX0, FT), p(CX0, BT), p(CX1, BT), p(CX1, BK), p(RB, BK), p(PW, 0), p(PW, -PD + GR)], A.hachure('isolant', 'detail')));
    for (const zz of [-19, -2]) o.push(lit(p, 1, PW - 1, zz));
    o.push(lit(p, talusAv(15) + 1, talusAr(15) - 1, 15));
    o.push(h.chemin([p(talusAv(BT), BT), p(CX0, BT)], A.detail), h.chemin([p(CX1, BT), p(talusAr(BT), BT)], A.detail));
    // dans le coffre : le fumier remis, puis le terreau
    o.push(h.rect(...p(CX0 + EP, FI), (CX1 - CX0 - 2 * EP) * S, (FI - BT) * S, A.hachure('isolant', 'detail')));
    o.push(h.rect(...p(CX0 + EP, TE), (CX1 - CX0 - 2 * EP) * S, (TE - FI) * S, A.hachure('neige', 'detail')));
    o.push(h.chemin([p(CX0 + EP, FI), p(CX1 - EP, FI)], A.detail));
    // La charte : au-dessus du terreau, on voit par l'ouverture la paroi du fond du coffre (le
    // côté ouest, derrière le plan de coupe) : gris loin, sous le châssis.
    o.push(poly([p(CX0 + EP, TE), p(CX1 - EP, TE), p(CX1 - EP, glace(CX1 - EP)), p(CX0 + EP, glace(CX0 + EP))], A.loin));
    o.push(h.chemin([p(CX0 + EP, TE), p(CX1 - EP, TE)], A.arete));
    // contours : le sol à côté, puis la fosse, qui est le contour du lit (objet principal, 2,4)
    o.push(h.chemin([p(XL, 0), p(0, 0)], A.arete), h.chemin([p(PW, 0), p(XR, 0)], A.arete));
    o.push(h.chemin([p(0, 0), p(0, -PD), p(PW, -PD), p(PW, 0)], A.contour));
    o.push(h.chemin([p(0, -PD + GR), p(PW, -PD + GR)], A.detail));
    o.push(h.chemin([p(0, 0), p(RF, FT), p(CX0, FT)], A.contour));
    o.push(h.chemin([p(CX1, BK), p(RB, BK), p(PW, 0)], A.contour));
    // le coffre : devant et arrière coupés
    o.push(h.rect(...p(CX0, FT), EP * S, (FT - BT) * S, A.hachure('bois', 'contour')));
    o.push(h.rect(...p(CX1 - EP, BK), EP * S, (BK - BT) * S, A.hachure('bois', 'contour')));
    // le châssis : traverses coupées aux deux bouts, la vitre entre les deux, le montant derrière
    const L = Math.hypot(CX1 - CX0, BK - FT), u = [(CX1 - CX0) / L, (BK - FT) / L], n = [-u[1], u[0]];
    const c = (r, k) => p(CX0 + u[0] * r + n[0] * k, FT + u[1] * r + n[1] * k);
    const RL = 7;
    o.push(poly([c(0, 0), c(RL, 0), c(RL, CH), c(0, CH)], A.hachure('bois', 'arete')));
    o.push(poly([c(L - RL, 0), c(L, 0), c(L, CH), c(L - RL, CH)], A.hachure('bois', 'arete')));
    o.push(h.chemin([c(RL, 0), c(L - RL, 0)], A.detail), h.chemin([c(RL, CH), c(L - RL, CH)], A.detail));
    o.push(h.chemin([c(RL, CH * 0.55), c(L - RL, CH * 0.55)], A.arete));
    // la chaleur monte du fumier dans le terreau
    for (const x of [122, 206]) o.push(fleche(p(x, 22), p(x, 53)));
    // le thermomètre à sonde, planté à 8 cm ; le liseré blanc seulement dans le terreau, pour ne
    // pas faire de halo sur le gris du fond
    const tige = [p(TX, TE - 8), p(TX, TE + 4)];
    o.push(h.ligne(...tige[0], ...p(TX, TE), 'fill="none" stroke="#FFFFFF" stroke-width="4"'));
    o.push(h.ligne(...tige[0], ...tige[1], A.arete));
    const cad = p(TX, TE + 4 + 3.4);
    o.push(h.cercle(cad[0], cad[1], 3.4 * S, blanc(A.arete)));
    o.push(h.chemin([cad, [cad[0] + 2 * S, cad[1] - 1.8 * S]], A.detail));
    // La charte : le point à contrôler. « C'est le thermomètre qui décide, pas le nombre de jours »
    // (étape 12) : on sème quand il est redescendu vers 30 °C.
    o.push(h.controle(cad[0], cad[1], 3.4 * S + 3));
    // niveau du dessus du devant, reporté à l'arrière
    o.push(h.ligne(...p(CX0, FT), ...p(XD + 3, FT), 'fill="none" stroke="#1A1A1A" stroke-width="0.5" stroke-dasharray="4 3"'));
    // rappels
    const rap = (a, b) => h.ligne(...a, ...b, A.fin);
    o.push(rap(p(XL, 0), p(XG - 3, 0)), rap(p(0, -PD), p(XG - 3, -PD)));
    o.push(rap(p(PW, -PD), p(XD + 3, -PD)), rap(p(PW, -PD + GR), p(XD + 3, -PD + GR)));
    o.push(rap(p(talusAr(BT), BT), p(XD + 3, BT)), rap(p(RB, BK), p(XD + 3, BK)));
    o.push(rap(p(RF, FT), p(RF, FT + 7)));
    // cotes
    o.push(h.cote(...p(XG, 0), ...p(XG, -PD), '460 min.', { cote: 'gauche' }));
    o.push(h.cote(...p(XD, -PD), ...p(XD, -PD + GR), '100', { cote: 'droite' }));
    o.push(h.cote(...p(XD, -PD + GR), ...p(XD, BT), '600 à 750', { cote: 'droite' }));
    o.push(h.cote(...p(XD, FT), ...p(XD, BK), '150 min.', { cote: 'droite' }));
    o.push(h.cote(...p(RF, FT + 5), ...p(CX0, FT + 5), '300 à 380'));
    o.push(coteF(...p(CX0 + 14, BT), ...p(CX0 + 14, FI), '100 à 150', { cote: 'droite' }));
    o.push(coteF(...p(CX0 + 14, FI), ...p(CX0 + 14, TE), '130 à 150', { cote: 'droite' }));
    o.push(h.cote(...p(TX + 7, TE), ...p(TX + 7, TE - 8), '80', { cote: 'droite' }));
    return o.join('\n');
  };

  const plan = (z) => {
    const { S, q } = repP(z);
    const o = [];
    // le fumier : le talus et le dessus du rechaussage, jusqu'au bord de la fosse
    o.push(poly([q(0, 0), q(PW, 0), q(PW, PE), q(0, PE)], A.hachure('isolant', 'detail')));
    o.push(poly([q(RF, RF), q(RB, RF), q(RB, PE - RF), q(RF, PE - RF)], A.detail));
    for (const [a, b] of [[[0, 0], [RF, RF]], [[PW, 0], [RB, RF]], [[PW, PE], [RB, PE - RF]], [[0, PE], [RF, PE - RF]]]) o.push(h.chemin([q(...a), q(...b)], A.detail));
    o.push(poly([q(0, 0), q(PW, 0), q(PW, PE), q(0, PE)], A.contour));
    // le coffre, châssis enlevé : le dessus des madriers, le terreau, les poteaux de coin
    o.push(poly([q(CX0, CY0), q(CX1, CY0), q(CX1, CY1), q(CX0, CY1)], blanc(A.contour)));
    o.push(poly([q(CX0 + EP, CY0 + EP), q(CX1 - EP, CY0 + EP), q(CX1 - EP, CY1 - EP), q(CX0 + EP, CY1 - EP)], A.hachure('neige', 'arete')));
    const P = 7;
    for (const [x, y] of [[CX0 + EP, CY0 + EP], [CX1 - EP - P, CY0 + EP], [CX0 + EP, CY1 - EP - P], [CX1 - EP - P, CY1 - EP - P]])
      o.push(h.rect(...q(x, y), P * S, P * S, blanc(A.arete)));
    // le thermomètre, vu d'en haut
    const t = q(TX, PE / 2);
    o.push(h.cercle(t[0], t[1], 3.4 * S, blanc(A.arete)));
    o.push(h.chemin([t, [t[0] + 2 * S, t[1] - 1.8 * S]], A.detail));
    // la trace de la coupe, regard vers l'ouest
    o.push(h.ligne(...q(-14, PE / 2), ...q(XD - 4, PE / 2), 'fill="none" stroke="#1A1A1A" stroke-width="0.7" stroke-dasharray="12 3 2 3"'));
    for (const x of [-14, XD - 4]) o.push(h.fleche(`M${q(x, PE / 2).join(' ')} L${q(x, PE / 2 - 12).join(' ')}`, A.arete));
    // rappels et cotes
    const rap = (a, b) => h.ligne(...q(...a), ...q(...b), A.fin);
    o.push(rap([CX1, CY0], [XD + 3, CY0]), rap([CX1, CY1], [XD + 3, CY1]));
    o.push(rap([CX0, CY1], [CX0, YB - 19]), rap([CX1, CY1], [CX1, YB - 19]));
    o.push(rap([CX0 + EP, CY1 - EP], [CX0 + EP, YB - 7]), rap([CX1 - EP, CY1 - EP], [CX1 - EP, YB - 7]));
    o.push(h.cote(...q(XD, CY0), ...q(XD, CY1), '910 (3 pi)', { cote: 'droite' }));
    o.push(coteF(...q(CX0, YB - 22), ...q(CX1, YB - 22), '1830 (6 pi)', { cote: 'dessous' }));
    o.push(coteF(...q(CX0 + EP, YB - 10), ...q(CX1 - EP, YB - 10), '1730 (5 pi 8 po)', { cote: 'dessous' }));
    // l'écart entre le coffre et le bord de la fosse, sur un côté long et un côté court
    o.push(rap([0, 0], [0, -10]), rap([CX0, CY0], [CX0, -10]));
    o.push(h.cote(...q(0, -7), ...q(CX0, -7), 'env. 450'));
    o.push(rap([PW, 0], [XD + 3, 0]));
    o.push(h.cote(...q(XD, 0), ...q(XD, CY0), 'env. 450', { cote: 'droite' }));
    return o.join('\n');
  };

  return {
    ref: '97-01a',
    titre: 'La couche chaude au fumier, en coupe',
    desc: 'Coupe nord-sud d’une couche chaude à un châssis, le sud à gauche, à l’échelle, et la même couche vue de dessus, châssis enlevé, alignée dessous. Une fosse d’au moins 460 mm creusée dans la terre, 10 cm de gros gravier au fond ; le fumier frais y est chargé par lits tassés sur 600 à 750 mm, jusqu’au-dessus du sol ; le coffre de madriers est posé sur le lit, l’arrière au moins 150 mm plus haut que le devant ; 100 à 150 mm de fumier tassé dans le coffre, puis 130 à 150 mm de terreau qui arrive presque au bord du devant ; du fumier empilé contre l’extérieur du coffre jusqu’en haut, sur 300 à 380 mm, descend en talus jusqu’au bord de la fosse. La vieille fenêtre porte sur le devant et l’arrière ; le thermomètre à sonde est planté à 80 mm dans le terreau ; deux flèches montrent la chaleur qui monte du fumier ; au-dessus du terreau, la paroi du fond du coffre en gris ; le thermomètre est cerclé de rouge : c’est lui qui dit quand semer. De dessus : le rechaussage fait le tour du coffre ; le coffre mesure 910 sur 1830 mm à l’extérieur, 1730 mm à l’intérieur du devant à l’arrière, un poteau dans chaque coin ; la fosse déborde le coffre de tous côtés.',
    format: 'pleine',
    disposition: [['coupe'], ['plan']],
    hauteurs: [ZT - ZBAS, YB - YH],
    vues: {
      coupe: {
        titre: 'En coupe nord-sud, le sud à gauche',
        dessin: coupe,
        renvois: z => {
          const { p } = rep(z);
          return [
            { n: 1, rond: p(96, 90), cible: p(96, glace(96) + CH * 0.55) },
            { n: 2, rond: p(TX, 90), cible: p(TX, TE + 4 + 6.8) },
            { n: 3, rond: p(140, 90), cible: p(140, TE - 5) },
            { n: 4, rond: p(-8, 44), cible: p(24, 44) },
            { n: 5, rond: p(-8, 16), cible: p(34, 8) },
            { n: 6, rond: p(118, -56), cible: p(118, -40.5) },
          ].map((r, i) => ({ ...r, texte: [
            'vieille fenêtre, posée sur le coffre',
            'thermomètre à sonde, planté dans le terreau',
            'terreau : terre et fumier bien pourri',
            'rechaussage : fumier empilé jusqu’en haut',
            'fumier frais, pelleté par lits tassés',
            'gros gravier, au fond de la fosse',
          ][i] }));
        },
      },
      plan: {
        titre: 'Vue de dessus, châssis enlevé',
        dessin: plan,
        renvois: z => {
          const { q } = repP(z);
          return [
            { n: 7, rond: q(-8, CY0 + 2), cible: q(CX0 + 2.5, CY0 + 20), texte: 'coffre de madriers, poteau dans chaque coin' },
            { n: 8, rond: q(-8, PE - 12), cible: q(0, PE - 30), texte: 'fosse, environ 900 mm plus large que le coffre' },
          ];
        },
      },
    },
  };
};
