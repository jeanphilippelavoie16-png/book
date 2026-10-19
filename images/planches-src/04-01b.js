// Planche 04-01b. La pompe à volets (chapitre 4, section 7, « Ventiler la pièce d'abri »).
// Refaite le 18 octobre 2026 (suivi/04-technique.md, E3) : l'ancienne planche montrait un battant de carton sans
// volets, qui brasse l'air sans le pomper. Celle-ci suit les puces de la pompe à volets du chapitre, dans leur ordre,
// et l'annexe B de l'ORNL (Kearny, fig. 1, 2, 11, 13 et 21 ; citations dans sources/04-verification-technique-2026-10-18.md,
// section 5) : la pompe de 60 cm, ses volets de 9 cm, ses fils tous les 7,5 cm (3½ po et 3 po pour une pompe de 24 po).
//
// Reprise le 19 octobre 2026 sur les puces réécrites (suivi/04-redaction.md, point 7 de l'éditeur), repères 1 à 18 :
// - le bas de la porte fermé sous la pompe par un cadre de bâtons couvert de plastique (repère 2 ; ORNL, annexe A,
//   p. 173 : « block the lower half of the doorway in which the KAP is installed with a quickly removable covering,
//   such as a plastic-covered frame made of sticks » ; annexe B, p. 201 et 205 : la pompe passe à 1/2 po du bas de son
//   ouverture, et il reste le moins d'ouverture possible autour d'elle). Il commence 1 cm sous le cadre, comme le texte ;
// - le montant du milieu (repère 3 ; ORNL, p. 196, point 1.a), où l'ORNL fixe les ficelles et noue la corde ;
// - le doublage (repère 4 ; ORNL, p. 196, point 1.b) : une deuxième latte clouée sur chaque montant, entre les
//   traverses, du côté de la pièce ; les traverses restent d'une seule latte, du côté de la pièce. Dans les deux coupes,
//   la traverse coupée est donc une latte, et le montant du milieu, au-delà, en a deux ;
// - les entailles de l'ourlet là où le fil est cloué aux montants (repère 11 ; ORNL, p. 198, fig. 6, et p. 200,
//   « do not nail any plastic directly to the wood »), en vue de face, au bout et au milieu.
// Le reste (vues, échelles, dessins) est celui que JP a validé le 18 octobre ; les vues du bas sont resserrées pour
// faire place aux entailles.
//
// Cotes : seulement celles du chapitre (75 mm entre les fils ; 90 mm de bande dans un renvoi). Le cadre fait 600 mm
// de haut et 775 mm de large dans une porte de 800 mm : 25 mm de moins que l'ouverture, comme le texte.
// Comme chez Kearny, l'écart entre les volets et les ficelles est grossi dans les deux coupes d'ensemble ; la coupe
// de près et la vue des entailles sont à l'échelle.
// Rouge : une seule marque, la flèche du geste sur la corde (repère 14).
module.exports = (h) => {
  const A = h.a;
  const W = at => at.replace('fill="none"', 'fill="#FFFFFF"');   // le trait, sur un aplat blanc
  const RAD = Math.PI / 180;

  // ── Le cadre, en millimètres (repère du cadre : x = 0 au dos, 38 à la face tournée vers la pièce ;
  //    y = 0 au haut du cadre, 600 au bas) ────────────────────────────────────────────────────────
  const HC = 600, LC = 775, EP = 38, RAIL = 38;
  const FILS = [44, 119, 194, 269, 344, 419, 494];                   // un fil tous les 75 mm
  const FICELLES = FILS.flatMap(y => [y + 19, y + 37, y + 56]);      // trois ficelles entre deux fils
  const NOEUD = 150;                                                 // la corde, un peu sous les pentures
  const JEU = 10;                                                    // le bas de la porte fermé, 1 cm sous le cadre

  // ════════════════════════════════════════════════════════════════════════════════════════════
  // Vue de la pièce : le cadre pendu, avec ses ficelles, avant les volets ; le bas de la porte fermé
  // ════════════════════════════════════════════════════════════════════════════════════════════
  const s1 = 0.225, X1 = 160, Y1 = 43.5;
  const p1 = (x, y) => [X1 + x * s1, Y1 + y * s1];
  const r1 = (x0, y0, x1, y1, at) => { const a = p1(x0, y0), b = p1(x1, y1); return h.rect(a[0], a[1], b[0] - a[0], b[1] - a[1], at); };
  const l1 = (x0, y0, x1, y1, at) => { const a = p1(x0, y0), b = p1(x1, y1); return h.ligne(a[0], a[1], b[0], b[1], at); };
  const HAUT = 8;                                                     // le jeu de la penture sous la planche
  const yFerme = HAUT + HC + JEU;                                     // le haut du cadre de bâtons

  const face = z => {
    const o = [];
    const yb = (z.h - Y1) / s1;                                      // le bas de la vue, en mm
    // l'ouverture : ce qu'on voit au-delà, en gris loin
    o.push(r1(-400, 0, 400, yb, A.loin));
    // le bas de la porte, fermé sous la pompe : un cadre de bâtons couvert de plastique (le plastique du côté du
    // dehors, les bâtons du côté de la pièce), calé entre les jambages ; la vue le coupe en bas
    const B = 30;                                                    // un bâton d'environ 3 cm
    o.push(r1(-400, yFerme, 400, yb, A.blanc));
    // les reflets du plastique tendu : deux paires de traits courts en biais
    for (const [x, y] of [[-150, yFerme + 120], [170, yFerme + 110]])
      for (const d of [0, 26]) o.push(l1(x + d, y + 40, x + d + 40, y, A.detail));
    // le bâton en écharpe, qui part du coin du haut ; puis les bâtons de côté, coupés par le bas de la vue
    const e0 = -400 + B, ec = (yb - yFerme - B) * 0.58, eb = 35;
    o.push(h.chemin([p1(e0, yFerme + B), p1(e0 + eb, yFerme + B), p1(e0 + eb + ec, yb), p1(e0 + ec, yb)], A.blanc, true));
    o.push(l1(e0, yFerme + B, e0 + ec, yb, A.arete), l1(e0 + eb, yFerme + B, e0 + eb + ec, yb, A.arete));
    for (const x of [-400, 400 - B]) {
      o.push(r1(x, yFerme + B, x + B, yb, A.blanc));
      o.push(l1(x, yFerme + B, x, yb, A.arete), l1(x + B, yFerme + B, x + B, yb, A.arete));
      o.push(l1(x + 11, yFerme + B + 30, x + 11, yFerme + B + 90, A.detail));
    }
    // le bâton du haut, d'un jambage à l'autre
    o.push(h.rect(...p1(-400, yFerme), 800 * s1, B * s1, `${W(A.arete)} rx="1.6"`));
    for (const [x0, x1] of [[-330, -180], [-60, 90], [170, 330]]) o.push(l1(x0, yFerme + 12, x1, yFerme + 12, A.detail));
    for (const [x0, x1] of [[-250, -90], [120, 260]]) o.push(l1(x0, yFerme + 20, x1, yFerme + 20, A.detail));
    // les bords de l'ouverture et le chambranle
    o.push(l1(-400, 0, -400, yb, A.arete), l1(400, 0, 400, yb, A.arete));
    o.push(l1(-455, 0, -455, yb, A.detail), l1(455, 0, 455, yb, A.detail));
    // la planche clouée en travers du haut de l'ouverture, débordant sur le mur
    o.push(r1(-550, -89, 550, 0, W(A.arete)));
    for (const x of [-520, -485, 485, 520]) for (const y of [-62, -28]) o.push(h.cercle(...p1(x, y), 1.1, A.plein));
    // le cadre de lattes : la face des lattes en blanc, l'intérieur laisse voir l'au-delà
    const c0 = -LC / 2, c1 = LC / 2, t = HAUT, b = HAUT + HC;
    o.push(r1(c0, t, c1, b, W(A.contour)));
    o.push(r1(c0 + RAIL, t + RAIL, c1 - RAIL, b - RAIL, A.loin));
    o.push(r1(c0 + RAIL, t + RAIL, c1 - RAIL, b - RAIL, A.arete));
    // le montant du milieu : sa deuxième latte, entre les traverses
    o.push(r1(-RAIL / 2, t + RAIL, RAIL / 2, b - RAIL, W(A.arete)));
    // les joints de la deuxième latte (sur chaque montant, entre les traverses), et les clous
    for (const y of [t + RAIL, b - RAIL]) {
      o.push(l1(c0, y, c0 + RAIL, y, A.detail), l1(c1 - RAIL, y, c1, y, A.detail));
    }
    for (const [x, y] of [[c0 + 12, t + 19], [c0 + 26, t + 19], [c1 - 12, t + 19], [c1 - 26, t + 19],
                          [c0 + 12, b - 19], [c0 + 26, b - 19], [c1 - 12, b - 19], [c1 - 26, b - 19],
                          [-8, t + 19], [8, t + 19], [-8, b - 19], [8, b - 19]])
      o.push(h.cercle(...p1(x, y), 0.8, A.plein));
    for (const y of [t + 160, t + 300, t + 440]) for (const x of [c0 + 9.5, c1 - 9.5]) o.push(h.cercle(...p1(x, y), 0.8, A.plein));
    // les ficelles tendues sur la face, d'un montant à l'autre ; plus d'écart là où ira chaque fil
    for (const y of FICELLES) o.push(l1(c0 + 19, t + y, c1 - 19, t + y, A.detail));
    // les deux pentures : une aile sur la planche, une sur la traverse du haut
    for (const xc of [-300, 300]) {
      o.push(r1(xc - 24, -27, xc + 24, 0, W(A.arete)));
      o.push(r1(xc - 24, t, xc + 24, t + 27, W(A.arete)));
      o.push(r1(xc - 24, 0, xc + 24, t, W(A.detail)));
      for (const dx of [-12, 12]) o.push(h.cercle(...p1(xc + dx, -13), 0.9, A.plein), h.cercle(...p1(xc + dx, t + 14), 0.9, A.plein));
    }
    return o.join('\n');
  };

  // ════════════════════════════════════════════════════════════════════════════════════════════
  // De près, en coupe : deux fils, deux volets, à l'échelle
  // ════════════════════════════════════════════════════════════════════════════════════════════
  const s3 = 2.2, X3 = 86, Y3 = 7 * 2.2;                            // y = 0 au fil du haut ; la vue va de −7 à 83 mm
  const p3 = (x, y) => [X3 + x * s3, Y3 + y * s3];
  const pt = (x, y) => p3(x, y).join(' ');
  const FIL = 44, RH = 3, VX = FIL - RH, BX = FIL + RH + 1.8;       // le fil ; l'ourlet ; le volet ; le volet qui passe sur l'ourlet suivant

  // l'ourlet : le sac monte contre les ficelles, fait le tour du fil, et son bout replié redescend
  // se coucher sur le volet, du côté de la pièce ; le ruban (le trait noir épais) ferme l'ourlet
  const ourlet = (fy, yMax) => {
    const o = [];
    const fin = Math.min(fy + 14, yMax);
    o.push(h.path(`M${pt(VX, fy + 3)} L${pt(VX, fy)} A${RH * s3} ${RH * s3} 0 0 1 ${pt(FIL + RH, fy)} ` +
      `C${pt(FIL + RH, fy + 4)} ${pt(VX + 1.4, fy + 4.5)} ${pt(VX + 1.4, fy + 8)} L${pt(VX + 1.4, fin)}`, A.arete));
    if (fy + 21 <= yMax)
      o.push(h.path(`M${pt(VX + 2.6, fy + 8.5)} L${pt(VX + 2.6, fy + 14.6)} L${pt(VX + 1.2, fy + 16.4)} L${pt(VX + 1.2, fy + 21)}`, A.contour));
    o.push(h.cercle(...p3(FIL, fy), 1.25 * s3, A.plein));
    return o.join('\n');
  };
  // le volet qui descend contre les ficelles, puis passe par-dessus l'ourlet du fil suivant
  const descente = (yHaut, yFil) => h.path(`M${pt(VX, yHaut)} L${pt(VX, yFil - 14)} C${pt(VX, yFil - 8.5)} ${pt(BX, yFil - 8.5)} ${pt(BX, yFil - 3.5)} L${pt(BX, yFil + 5)}`, A.arete);

  const pres = z => {
    const o = [];
    const y0 = -Y3 / s3, y1 = (z.h - Y3) / s3;
    // le montant, au-delà de la coupe : ses deux épaisseurs
    o.push(h.rect(...p3(0, y0), EP * s3, (y1 - y0) * s3, A.loin));
    o.push(h.ligne(...p3(0, y0), ...p3(0, y1), A.arete), h.ligne(...p3(EP, y0), ...p3(EP, y1), A.arete));
    o.push(h.ligne(...p3(EP / 2, y0), ...p3(EP / 2, y1), A.detail));
    // les ficelles, coupées, sur la face du cadre
    for (const y of [19, 37, 56]) o.push(h.cercle(...p3(EP + 1.1, y), 1.1 * s3, A.plein));
    // le bas du volet du dessus, l'ourlet et le volet du fil du haut, l'ourlet du fil suivant
    o.push(h.path(`M${pt(BX, y0)} L${pt(BX, 5)}`, A.arete));
    o.push(ourlet(0, y1), descente(3, 75), ourlet(75, y1));
    o.push(h.path(`M${pt(VX, 78)} L${pt(VX, y1)}`, A.arete));
    // l'écart des fils, rappelé à gauche du montant
    for (const y of [0, 75]) o.push(h.ligne(...p3(-11, y), ...p3(EP - 0.5, y), A.fin));
    o.push(h.cote(...p3(-7, 0), ...p3(-7, 75), '75 mm', { cote: 'gauche' }));
    return o.join('\n');
  };

  // ════════════════════════════════════════════════════════════════════════════════════════════
  // Les deux coupes d'ensemble : on tire, puis le retour (même cadrage)
  // ════════════════════════════════════════════════════════════════════════════════════════════
  // Repère de la coupe : x vers la pièce, y vers le bas, origine à l'axe des pentures, au haut de l'ouverture.
  // La coupe passe à côté du montant du milieu : on voit ce montant au-delà, avec la corde nouée autour.
  const s2 = 0.27, X2 = 66, Y2 = 44.5;
  const p2 = (x, y) => [X2 + x * s2, Y2 + y * s2];
  const tourne = (th, [x, y]) => [x * Math.cos(th * RAD) + y * Math.sin(th * RAD), -x * Math.sin(th * RAD) + y * Math.cos(th * RAD)];
  const P = (th, x, y) => p2(...tourne(th, [x, y]));
  const poly = (th, pts) => pts.map(([x, y]) => P(th, x, y));
  // Dans ces deux vues, on grossit l'écart des volets (comme chez Kearny) pour qu'ils se lisent à côté du cadre.
  const FS = EP + 3, FX = EP + 13, VS = EP + 9, BS = EP + 20;        // les ficelles ; le fil ; le volet contre les ficelles ; le volet sur l'ourlet suivant

  const mur = z => {
    const o = [];
    const yt = -Y2 / s2;
    // le mur au-dessus de la porte, coupé ; sous lui, l'ouverture
    o.push(h.rect(...p2(-139, yt), 120 * s2, -yt * s2, A.hachure('bois', 'aucun')));
    o.push(h.ligne(...p2(-139, yt), ...p2(-139, 0), A.arete), h.ligne(...p2(-19, yt), ...p2(-19, 0), A.arete));
    o.push(h.ligne(...p2(-139, 0), ...p2(-19, 0), A.arete));
    // la planche clouée, coupée
    o.push(h.rect(...p2(-19, -89), 19 * s2, 89 * s2, A.hachure('bois', 'arete')));
    // la penture : son aile sur la planche (son axe se pose après le cadre)
    o.push(h.ligne(...p2(0.8, -26), ...p2(0.8, 0), A.arete));
    return o.join('\n');
  };

  const cadre = (th, { ouverts = false, fantome = false } = {}) => {
    const o = [];
    if (fantome) {                                                   // le cadre au repos, d'où il part
      o.push(h.chemin([p2(0, 0), p2(EP, 0), p2(EP, HC), p2(0, HC)], A.cache, true));
      return o.join('\n');
    }
    const E2 = EP / 2;                                               // une latte d'épaisseur
    // le montant du milieu, au-delà de la coupe : la latte du dos sur toute la hauteur, la deuxième latte
    // (du côté de la pièce) entre les traverses
    o.push(h.chemin(poly(th, [[0, 0], [E2, 0], [E2, HC], [0, HC]]), A.loin, true));
    o.push(h.chemin(poly(th, [[E2, RAIL], [EP, RAIL], [EP, HC - RAIL], [E2, HC - RAIL]]), A.loin, true));
    o.push(h.chemin(poly(th, [[E2, 0], [0, 0], [0, HC], [E2, HC]]), A.arete));
    o.push(h.chemin(poly(th, [[EP, RAIL], [EP, HC - RAIL]]), A.arete));
    o.push(h.chemin(poly(th, [[E2, RAIL], [E2, HC - RAIL]]), A.detail));
    // les deux traverses, coupées : une latte, du côté de la pièce
    for (const y of [0, HC - RAIL]) {
      o.push(h.chemin(poly(th, [[E2, y], [EP, y], [EP, y + RAIL], [E2, y + RAIL]]), A.hachure('bois', 'aucun'), true));
      o.push(h.chemin(poly(th, [[E2, y], [EP, y], [EP, y + RAIL], [E2, y + RAIL]]), A.contour, true));
    }
    // la corde nouée autour du montant
    o.push(h.chemin(poly(th, [[0, NOEUD - 7], [EP, NOEUD - 7]]), A.detail), h.chemin(poly(th, [[0, NOEUD + 7], [EP, NOEUD + 7]]), A.detail));
    // les ficelles et les fils, coupés
    for (const y of FICELLES) o.push(h.cercle(...P(th, FS, y), 0.8, A.plein));
    for (const y of FILS) o.push(h.cercle(...P(th, FX, y), 1.1, A.plein));
    // les volets
    for (const y of FILS) {
      if (ouverts) {
        // soulevés par l'air : ils tournent sur leur fil, loin de la face
        const phi = 55 * RAD, L = 80;
        const e = [FX + L * Math.sin(phi), y + L * Math.cos(phi)];
        const m = [FX + L / 2 * Math.sin(phi), y + L / 2 * Math.cos(phi)];
        const a = P(th, FX, y), b = P(th, ...e), c = P(th, ...m);
        o.push(h.path(`M${a.join(' ')} Q${c[0]} ${c[1] + 1.8} ${b.join(' ')}`, A.arete));
      } else {
        // plaqués contre les ficelles : chacun passe sur l'ourlet du suivant, comme des bardeaux
        o.push(h.chemin(poly(th, [[VS, y - 3], [VS, y + 60], [BS, y + 70], [BS, y + 80]]), A.arete));
      }
    }
    return o.join('\n');
  };

  // la corde : du nœud vers celui qui tire, assis plus loin dans la pièce (hors de la vue)
  const TH_TIRE = 75, TH_RETOUR = 35;
  const K2 = tourne(TH_TIRE, [EP / 2, NOEUD]), K5 = tourne(TH_RETOUR, [EP / 2, NOEUD]);
  const AXE = [Math.cos(33.6 * RAD), Math.sin(33.6 * RAD)];         // vers les mains, assis à 1,8 m de la porte
  const NORM = [-AXE[1], AXE[0]];                                    // du côté du plancher
  const surCorde = (t, d = 0) => [K2[0] + AXE[0] * t + NORM[0] * d, K2[1] + AXE[1] * t + NORM[1] * d];
  const finCorde = (818 - K2[0]) / AXE[0];                          // jusqu'au bord droit de la vue

  const air = (y, x0, x1) => h.fleche(`M${p2(x0, y).join(' ')} L${p2(x1, y).join(' ')}`, A.detail);
  const arc = (r, a0, a1, sens) => {
    const a = p2(r * Math.sin(a0 * RAD), r * Math.cos(a0 * RAD)), b = p2(r * Math.sin(a1 * RAD), r * Math.cos(a1 * RAD));
    return h.fleche(`M${a.join(' ')} A${r * s2} ${r * s2} 0 0 ${sens} ${b.join(' ')}`, A.arete);
  };

  const tire = z => {
    const o = [mur(z)];
    o.push(cadre(0, { fantome: true }));
    o.push(air(250, -225, 470), air(430, -225, 380));
    o.push(arc(660, 12, 50, 0));
    o.push(cadre(TH_TIRE), h.cercle(...p2(0, 0), 1.7, W(A.arete)));
    // la corde tendue, et la flèche du geste : on la tire vers soi
    const a = p2(...K2), b = p2(...surCorde(finCorde));
    o.push(h.ligne(a[0], a[1], b[0], b[1], A.arete));
    o.push(h.cercle(a[0], a[1], 1.8, A.plein));
    o.push(h.geste(`M${p2(...surCorde(330, 48)).join(' ')} L${p2(...surCorde(560, 48)).join(' ')}`));
    return o.join('\n');
  };

  const retour = z => {
    const o = [mur(z)];
    o.push(arc(700, 55, 30, 1));
    o.push(cadre(TH_RETOUR, { ouverts: true }), h.cercle(...p2(0, 0), 1.7, W(A.arete)));
    // l'air continue vers la pièce, entre les volets ouverts
    o.push(air(102, -225, 520), air(225, -225, 560), air(347, -225, 600));
    // la corde lâche : elle pend sous le nœud
    const a = p2(...K5);
    o.push(h.path(`M${a.join(' ')} C${p2(40, 330).join(' ')} ${p2(130, 560).join(' ')} ${p2(230, (z.h - Y2) / s2).join(' ')}`, A.arete));
    o.push(h.cercle(a[0], a[1], 1.8, A.plein));
    return o.join('\n');
  };

  // ════════════════════════════════════════════════════════════════════════════════════════════
  // Les entailles de l'ourlet, vues de la pièce : le volet du haut, au bout du cadre et au montant du milieu
  // (à l'échelle ; la vue est coupée entre les deux)
  // ════════════════════════════════════════════════════════════════════════════════════════════
  const s8 = 0.62, Y8 = 24;
  const MIL = LC / 2;                                                // l'axe du montant du milieu, depuis le bord du cadre
  const DEB = 6, ENT = 6, PROF = 13;                                  // le volet dépasse le cadre ; l'entaille passe le montant ; sa profondeur
  const HAUT_V = FILS[0] - RH, BAS_V = FILS[0] + 90;                 // le haut de l'ourlet ; le bas du volet (9 cm sous le fil)
  const TROUS = [                                                    // les deux morceaux de la vue
    { x0: -12.5, x1: 100, X: 6, bout: true, m0: 0, m1: RAIL },
    { x0: 330, x1: 445, X: 94.4, bout: false, m0: MIL - RAIL / 2, m1: MIL + RAIL / 2 },
  ];
  const entaille = z => {
    const o = [];
    const yb = (z.h - Y8) / s8;                                      // le bas de la vue, en mm
    for (const T of TROUS) {
      const q = (x, y) => [T.X + (x - T.x0) * s8, Y8 + y * s8];
      const r8 = (x0, y0, x1, y1, at) => { const a = q(x0, y0), b = q(x1, y1); return h.rect(a[0], a[1], b[0] - a[0], b[1] - a[1], at); };
      const l8 = (x0, y0, x1, y1, at) => { const a = q(x0, y0), b = q(x1, y1); return h.ligne(a[0], a[1], b[0], b[1], at); };
      const e0 = T.bout ? -DEB : T.m0 - ENT, e1 = T.m1 + ENT;       // l'entaille, d'un bord à l'autre
      const xf = T.bout ? 0 : T.x0;                                  // le bord gauche du cadre dans ce morceau
      // au-delà : l'ouverture, en gris loin
      o.push(r8(T.x0, 0, T.x1, yb, A.loin));
      if (T.bout) o.push(l8(T.x0, 0, T.x0, yb, A.arete));            // le jambage
      // la deuxième latte du montant, puis la traverse du haut, en blanc
      o.push(r8(T.m0, RAIL, T.m1, yb, W(A.arete)));
      o.push(r8(xf, 0, T.x1, RAIL, A.blanc));
      o.push(l8(xf, 0, T.x1, 0, T.bout ? A.contour : A.arete), l8(xf, RAIL, T.x1, RAIL, A.arete));
      if (T.bout) o.push(l8(0, 0, 0, RAIL, A.contour), l8(0, RAIL, 0, yb, A.contour));
      o.push(l8(T.m0, RAIL, T.m1, RAIL, A.detail));
      for (const dx of [12, 26]) o.push(h.cercle(...q(T.m0 + dx, RAIL / 2), 1.1, A.plein));
      // le volet du dessous dépasse sous celui-ci
      o.push(r8(Math.max(T.x0, -DEB), BAS_V, T.x1, yb, A.blanc));
      if (T.bout) o.push(l8(-DEB, BAS_V, -DEB, yb, A.arete));
      // le volet du haut : son ourlet entaillé sur le montant, le ruban sous l'entaille
      const xg = T.bout ? -DEB : T.x0;
      const contourV = T.bout
        ? [[xg, BAS_V], [xg, HAUT_V + PROF], [e1, HAUT_V + PROF], [e1, HAUT_V], [T.x1, HAUT_V], [T.x1, BAS_V]]
        : [[xg, HAUT_V], [e0, HAUT_V], [e0, HAUT_V + PROF], [e1, HAUT_V + PROF], [e1, HAUT_V], [T.x1, HAUT_V], [T.x1, BAS_V], [xg, BAS_V]];
      o.push(h.chemin(contourV.map(([x, y]) => q(x, y)), A.blanc, true));
      const bordsV = T.bout
        ? [[[xg, BAS_V], [xg, HAUT_V + PROF], [e1, HAUT_V + PROF], [e1, HAUT_V], [T.x1, HAUT_V]]]
        : [[[xg, HAUT_V], [e0, HAUT_V], [e0, HAUT_V + PROF], [e1, HAUT_V + PROF], [e1, HAUT_V], [T.x1, HAUT_V]]];
      for (const c of bordsV) o.push(h.chemin(c.map(([x, y]) => q(x, y)), A.arete));
      o.push(l8(xg, BAS_V, T.x1, BAS_V, A.arete));
      for (const y of [HAUT_V + PROF + 2, HAUT_V + PROF + 12]) o.push(l8(xg, y, T.x1, y, A.detail));
      // le fil : caché dans l'ourlet, à nu dans l'entaille, cloué sur le montant (le clou rabattu sur le fil)
      const fa = T.bout ? 3 : T.x0;
      if (T.bout) o.push(l8(fa, FILS[0], e1, FILS[0], A.arete), l8(e1, FILS[0], T.x1, FILS[0], A.cache));
      else o.push(l8(T.x0, FILS[0], e0, FILS[0], A.cache), l8(e0, FILS[0], e1, FILS[0], A.arete), l8(e1, FILS[0], T.x1, FILS[0], A.cache));
      const xc = (T.m0 + T.m1) / 2;
      o.push(h.cercle(...q(xc - 3, FILS[0] + 5), 1.4, W(A.arete)));
      o.push(l8(xc - 3, FILS[0] + 5, xc + 3, FILS[0] - 4, A.arete));
      // les coupures de la vue : un trait en zigzag sur chaque bord coupé
      const coupes = T.bout ? [T.x1] : [T.x0, T.x1];
      for (const xk of coupes) {
        const pts = [];
        for (let y = 0, k = 0; y <= yb; y += 9, k++) pts.push(q(xk + (k % 2 ? 2.5 : -2.5), Math.min(y, yb)));
        o.push(h.chemin(pts, A.detail));
      }
    }
    return o.join('\n');
  };

  // ════════════════════════════════════════════════════════════════════════════════════════════
  // À l'entrée d'air : deux épaisseurs de serviette tendues sur un cadre de lattes
  // ════════════════════════════════════════════════════════════════════════════════════════════
  const filtre = z => {
    const o = [];
    const x0 = 22, y0 = 3, l = 150, ht = 104, e = 6;                  // le cadre, en unités de vue
    // la serviette, tendue dans le cadre ; un coin rabattu montre la seconde épaisseur dessous
    o.push(h.rect(x0 + e, y0 + e, l - 2 * e, ht - 2 * e, A.hachure('neige', 'aucun')));
    const cx = x0 + l - e, cy = y0 + e, k = 30;                        // le coin du haut, à droite
    o.push(h.chemin([[cx - k, cy], [cx, cy], [cx, cy + k]], W(A.detail), true));
    o.push(h.chemin([[cx - k + 4, cy], [cx, cy], [cx, cy + k - 4]], A.hachure('neige', 'aucun'), true));
    o.push(h.chemin([[cx - k + 4, cy], [cx, cy + k - 4]], A.detail));
    o.push(h.chemin([[cx - k, cy], [cx - k + 2, cy + k - 2], [cx, cy + k]], W(A.arete), true));
    // plis de tension vers les coins
    o.push(h.path(`M${x0 + e + 3} ${y0 + e + 3} Q${x0 + 30} ${y0 + 28} ${x0 + 44} ${y0 + 38}`, A.detail));
    o.push(h.path(`M${x0 + e + 3} ${y0 + ht - e - 3} Q${x0 + 30} ${y0 + ht - 28} ${x0 + 44} ${y0 + ht - 38}`, A.detail));
    o.push(h.path(`M${x0 + l - e - 3} ${y0 + ht - e - 3} Q${x0 + l - 30} ${y0 + ht - 28} ${x0 + l - 44} ${y0 + ht - 38}`, A.detail));
    // le bord des deux épaisseurs, rabattu sur les lattes du côté gauche
    o.push(h.path(`M${x0 - 3} ${y0 + 2} L${x0 - 3} ${y0 + ht - 2}`, A.detail), h.path(`M${x0 - 6} ${y0 + 5} L${x0 - 6} ${y0 + ht - 5}`, A.detail));
    // les quatre lattes et les clous
    o.push(h.rect(x0, y0, l, ht, A.contour));
    o.push(h.rect(x0 + e, y0 + e, l - 2 * e, ht - 2 * e, A.arete));
    for (let x = x0 + 14; x <= x0 + l - 14; x += 18) o.push(h.cercle(x, y0 + e / 2, 0.9, A.plein), h.cercle(x, y0 + ht - e / 2, 0.9, A.plein));
    for (let y = y0 + 16; y <= y0 + ht - 16; y += 18) o.push(h.cercle(x0 + e / 2, y, 0.9, A.plein), h.cercle(x0 + l - e / 2, y, 0.9, A.plein));
    // règle 10 : un filet sépare l'autre façon, à droite
    o.push(h.ligne(z.l + 11, 0, z.l + 11, z.h, A.fin));
    return o.join('\n');
  };

  // ════════════════════════════════════════════════════════════════════════════════════════════
  // Autre façon : des bâtons liés de tissu, pendus par une boucle de cuir
  // ════════════════════════════════════════════════════════════════════════════════════════════
  const s7 = 0.6;
  const XB = 122;                                                    // la boucle de cuir
  const autre = z => {
    const o = [];
    const yP = 32, R = 9;                                             // le bas de la planche ; le rayon d'un bâton
    const yT = yP + 8 * s7 + R, xV = 92;                              // l'axe du bâton du haut, du bâton de côté
    // au-delà : l'ouverture, en gris loin, et son bord
    o.push(h.rect(70, yP, z.l - 70, z.h - yP, A.loin));
    o.push(h.ligne(70, yP, 70, z.h, A.arete), h.ligne(58, yP, 58, z.h, A.detail));
    // la planche clouée en travers, coupée par le haut de la vue
    o.push(h.rect(8, 0, z.l - 8, yP, W(A.arete)));
    o.push(h.cercle(26, 10, 1.1, A.plein), h.cercle(26, 22, 1.1, A.plein));
    // le bâton de côté, derrière ; le bâton du haut, devant, qui dépasse à gauche
    o.push(h.rect(xV - R, yT, 2 * R, z.h - yT, A.blanc));
    o.push(h.path(`M${xV - R} ${yT} L${xV - R} ${z.h} M${xV + R} ${yT} L${xV + R} ${z.h}`, A.contour));
    o.push(h.path(`M${xV - R} ${yT - R} L${z.l} ${yT - R} M${xV - R} ${yT + R} L${z.l} ${yT + R}`, A.contour));
    o.push(h.rect(xV - R - 24, yT - R, z.l - (xV - R - 24), 2 * R, A.blanc));
    o.push(h.path(`M${z.l} ${yT - R} L${xV - R - 24} ${yT - R} M${xV - R - 24} ${yT + R} L${z.l} ${yT + R}`, A.contour));
    o.push(h.ellipse(xV - R - 24, yT, 3.2, R, W(A.contour)));
    o.push(h.cercle(xV - R - 24, yT, 1, A.plein));
    // la ligature : des bandes de tissu croisées sur le croisement
    const bande = (cx, cy, ang) => {
      const u = [Math.cos(ang * RAD), Math.sin(ang * RAD)], n = [-u[1], u[0]], Lb = 17, lb = 2.1;
      const q = (a, b) => [cx + u[0] * a + n[0] * b, cy + u[1] * a + n[1] * b];
      return h.chemin([q(-Lb, -lb), q(Lb, -lb), q(Lb, lb), q(-Lb, lb)], W(A.detail), true);
    };
    for (const d of [-5, 0, 5]) o.push(bande(xV + d * 0.71, yT - d * 0.71, 45));
    for (const d of [-5, 0, 5]) o.push(bande(xV + d * 0.71, yT + d * 0.71, -45));
    // le bout de la bande, noué, qui pend
    o.push(h.path(`M${xV + 13} ${yT + 12} q3 6 1 12 M${xV + 13} ${yT + 12} q6 4 8 10`, A.detail));
    o.push(h.cercle(xV + 13, yT + 12, 2, W(A.detail)));
    // la boucle de cuir : clouée sur la planche, elle passe autour du bâton du haut
    const xb = XB, lb = 16;
    o.push(h.path(`M${xb} 6 L${xb} ${yT + 2} Q${xb} ${yT + R + 4} ${xb + lb / 2} ${yT + R + 4} Q${xb + lb} ${yT + R + 4} ${xb + lb} ${yT + 2} L${xb + lb} 6 Z`, W(A.arete)));
    o.push(h.cercle(xb + lb / 2, 12, 1.1, A.plein), h.cercle(xb + lb / 2, 22, 1.1, A.plein));
    return o.join('\n');
  };

  // les points des renvois, calculés
  const knot2 = p2(...K2);
  const gesteMilieu = p2(...surCorde(470, 48));
  const voletOuvert = (() => {                                       // le bout du cinquième volet ouvert
    const phi = 55 * RAD, y = FILS[4];
    return P(TH_RETOUR, FX + 60 * Math.sin(phi), y + 60 * Math.cos(phi));
  })();
  const yFilGap = k => p1(0, HAUT + FILS[k])[1];                     // une hauteur sans ficelle, là où ira un fil
  const filMilieu = [TROUS[1].X + (MIL + 6 - TROUS[1].x0) * s8, Y8 + FILS[0] * s8];

  return {
    ref: '04-01b',
    fichier: 'planche-04-01b-pompe-carton.svg',
    titre: 'La pompe à volets',
    desc: 'Pompe à air à volets, faite à la main, pendue dans le haut de la porte de la pièce d’abri. Vue de la pièce : une planche clouée en travers du haut de l’ouverture, qui déborde sur le mur ; dessous, un cadre de lattes à trois montants, un peu plus étroit que l’ouverture, pendu à deux pentures ; sur chaque montant, une deuxième latte clouée entre les traverses ; des ficelles tendues en travers de sa face, par groupes de trois, avant la pose des volets ; sous le cadre, à 1 cm, le bas de la porte fermé par un cadre de bâtons couvert de plastique. De près, en coupe : le montant du cadre en deux épaisseurs, les ficelles sur sa face ; devant elles, un fil de cintre tous les 75 mm ; chaque volet de sac à ordures fait le tour de son fil par un ourlet fermé au ruban, descend contre les ficelles et couvre l’ourlet du volet du dessous. En coupe, on tire : le cadre est parti de sa position pendue et monte presque à l’horizontale vers la pièce ; ses volets sont plaqués contre les ficelles ; la corde nouée autour du montant du milieu, un peu sous les pentures, est tendue vers celui qui tire, assis plus loin ; l’air entre par la porte vers la pièce. Au retour : le cadre revient seul vers la porte, la corde pend lâche ; les volets se soulèvent sur leurs fils et l’air continue vers la pièce entre eux. Les entailles, vues de la pièce : au bout du cadre et au montant du milieu, l’ourlet du volet du haut est entaillé sur le montant ; le fil y passe à nu et un clou rabattu le tient sur la latte. À l’entrée d’air : deux épaisseurs de serviette tendues et clouées sur un cadre de lattes, un coin rabattu montre la seconde épaisseur. Autre façon : des bâtons liés au croisement par des bandes de tissu, pendus à la planche par une boucle de cuir clouée.',
    format: 'pleine',
    disposition: [['face', 'pres'], ['tire', 'retour'], ['entaille', 'filtre', 'autre']],
    hauteurs: [240, 244, 132],
    largeurs: [[5, 4], [1, 1], [173, 208, 175]],
    vues: {
      face: {
        titre: 'Vu de la pièce',
        dessin: face,
        renvois: z => [
          { n: 1, rond: [14, 176], cible: p1(-250, HAUT + FILS[6]), texte: 'l’ouverture où l’air entre déjà' },
          { n: 2, rond: [14, 205], cible: p1(-250, yFerme + 82), texte: 'bas de la porte fermé' },
          { n: 3, rond: [305, yFilGap(2)], cible: [p1(0, 0)[0] + 1.8, yFilGap(2)], texte: 'cadre à trois montants' },
          { n: 4, rond: [14, 118], cible: p1(-368.5, 330), texte: 'deuxième latte, côté pièce' },
          { n: 5, rond: [14, 14], cible: p1(-500, -45), texte: 'planche clouée en travers' },
          { n: 6, rond: [252, 11], cible: p1(300, -14), texte: 'deux pentures' },
        ],
      },
      pres: {
        titre: 'De près, en coupe',
        dessin: pres,
        renvois: z => [
          { n: 7, rond: [238, 140], cible: p3(EP + 1.1 + 1.1, 56), texte: 'ficelles d’arrêt des volets' },
          { n: 8, rond: [238, 110], cible: p3(VX, 44), texte: 'bande de sac de 90 mm' },
          { n: 9, rond: [238, 54], cible: p3(VX + 3.3, 12), texte: 'ourlet fermé au ruban' },
          { n: 10, rond: [238, 12], cible: p3(FIL + 0.9, -0.9), texte: 'fil de cintre redressé' },
          { n: 12, rond: [238, 176], cible: p3(BX, 78), texte: 'couvre le volet du dessous' },
        ],
      },
      tire: {
        titre: 'On tire : les volets se ferment',
        dessin: tire,
        renvois: z => [
          { n: 13, rond: [126, 14], cible: [knot2[0] + 1, knot2[1] - 3], texte: 'corde au montant du milieu' },
          { n: 14, rond: [gesteMilieu[0] - 26, gesteMilieu[1] + 24], cible: [gesteMilieu[0] - 2, gesteMilieu[1] + 2], texte: 'tirer jusqu’à presque à plat' },
        ],
      },
      retour: {
        titre: 'Au retour : les volets s’ouvrent',
        dessin: retour,
        renvois: z => [
          { n: 15, rond: [262, 60], cible: voletOuvert, texte: 'corde lâche : volets ouverts' },
        ],
      },
      entaille: {
        titre: 'Les entailles du volet',
        dessin: entaille,
        renvois: z => [
          { n: 11, rond: [filMilieu[0] + 12, 12], cible: filMilieu, texte: 'ourlet entaillé, fil cloué' },
        ],
      },
      filtre: {
        titre: 'À l’entrée d’air',
        dessin: filtre,
        renvois: z => [
          { n: 16, rond: [198, 23], cible: [166, 23], texte: 'deux épaisseurs de serviette' },
        ],
      },
      autre: {
        titre: 'Autre façon : bâtons et boucles',
        dessin: autre,
        renvois: z => [
          { n: 17, rond: [40, 96], cible: [84, 58], texte: 'au lieu de 3 : bâtons liés' },
          { n: 18, rond: [162, 88], cible: [XB + 15, 57], texte: 'au lieu de 6 : boucle de cuir' },
        ],
      },
    },
  };
};
