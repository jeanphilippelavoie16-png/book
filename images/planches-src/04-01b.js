// Planche 04-01b. La pompe à volets (chapitre 4, section 7, « Ventiler la pièce d'abri »).
// Refaite le 18 octobre 2026 (suivi/04-technique.md, E3) : l'ancienne planche montrait un battant de carton sans
// volets, qui brasse l'air sans le pomper. Celle-ci suit les puces de la pompe à volets du chapitre, dans leur ordre,
// et l'annexe B de l'ORNL (Kearny, fig. 1, 2, 11, 13 et 21 ; citations dans sources/04-verification-technique-2026-10-18.md,
// section 5) : la pompe de 60 cm, ses volets de 9 cm, ses fils tous les 7,5 cm (3½ po et 3 po pour une pompe de 24 po).
//
// Cotes : seulement celles du chapitre (75 mm entre les fils ; 90 mm de bande dans un renvoi). Le cadre fait 600 mm
// de haut et 775 mm de large dans une porte de 800 mm : 25 mm de moins que l'ouverture, comme le texte.
// Comme chez Kearny, l'écart entre les volets et les ficelles est grossi dans les deux coupes d'ensemble ; la coupe
// de près est à l'échelle.
// La vue de la pièce et les deux coupes s'arrêtent sous la pompe : le chapitre ne dit pas quoi faire du bas de la
// porte (l'ORNL, p. 173, le ferme ; signalé au rapport, pas dessiné).
// Rouge : une seule marque, la flèche du geste sur la corde (repère 11).
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

  // ════════════════════════════════════════════════════════════════════════════════════════════
  // Vue de la pièce : le cadre pendu, avec ses ficelles, avant les volets
  // ════════════════════════════════════════════════════════════════════════════════════════════
  const s1 = 0.225, X1 = 160, Y1 = 43.5;
  const p1 = (x, y) => [X1 + x * s1, Y1 + y * s1];
  const r1 = (x0, y0, x1, y1, at) => { const a = p1(x0, y0), b = p1(x1, y1); return h.rect(a[0], a[1], b[0] - a[0], b[1] - a[1], at); };
  const l1 = (x0, y0, x1, y1, at) => { const a = p1(x0, y0), b = p1(x1, y1); return h.ligne(a[0], a[1], b[0], b[1], at); };
  const HAUT = 8;                                                     // le jeu de la penture sous la planche

  const face = z => {
    const o = [];
    const yb = (z.h - Y1) / s1;                                      // le bas de la vue, en mm
    // l'ouverture : ce qu'on voit au-delà, en gris loin ; les bords et le chambranle
    o.push(r1(-400, 0, 400, yb, A.loin));
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
    // les joints de la seconde épaisseur (les montants entre les traverses), cloués
    for (const y of [t + RAIL, b - RAIL]) {
      o.push(l1(c0, y, c0 + RAIL, y, A.detail), l1(c1 - RAIL, y, c1, y, A.detail));
    }
    for (const [x, y] of [[c0 + 12, t + 19], [c0 + 26, t + 19], [c1 - 12, t + 19], [c1 - 26, t + 19],
                          [c0 + 12, b - 19], [c0 + 26, b - 19], [c1 - 12, b - 19], [c1 - 26, b - 19]])
      o.push(h.cercle(...p1(x, y), 0.8, A.plein));
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
    // le montant, au-delà de la coupe
    o.push(h.chemin(poly(th, [[0, RAIL], [EP, RAIL], [EP, HC - RAIL], [0, HC - RAIL]]), A.loin, true));
    o.push(h.chemin(poly(th, [[0, RAIL], [0, HC - RAIL]]), A.arete), h.chemin(poly(th, [[EP, RAIL], [EP, HC - RAIL]]), A.arete));
    o.push(h.chemin(poly(th, [[EP / 2, RAIL], [EP / 2, HC - RAIL]]), A.detail));
    // les deux traverses, coupées : deux épaisseurs de latte
    for (const y of [0, HC - RAIL]) {
      o.push(h.chemin(poly(th, [[0, y], [EP, y], [EP, y + RAIL], [0, y + RAIL]]), A.hachure('bois', 'aucun'), true));
      o.push(h.chemin(poly(th, [[EP / 2, y], [EP / 2, y + RAIL]]), A.detail));
      o.push(h.chemin(poly(th, [[0, y], [EP, y], [EP, y + RAIL], [0, y + RAIL]]), A.contour, true));
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
  // À l'entrée d'air : deux épaisseurs de serviette tendues sur un cadre de lattes
  // ════════════════════════════════════════════════════════════════════════════════════════════
  const filtre = z => {
    const o = [];
    const x0 = 78, y0 = 10, l = 150, ht = 104, e = 6;                 // le cadre, en unités de vue
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
    const xb = 190, lb = 16;
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

  return {
    ref: '04-01b',
    fichier: 'planche-04-01b-pompe-carton.svg',
    titre: 'La pompe à volets',
    desc: 'Pompe à air à volets, faite à la main, pendue dans le haut de la porte de la pièce d’abri. Vue de la pièce : une planche clouée en travers du haut de l’ouverture, qui déborde sur le mur ; dessous, un cadre de lattes doublé, un peu plus étroit que l’ouverture, pendu à deux pentures ; des ficelles tendues en travers de sa face, par groupes de trois, avant la pose des volets. De près, en coupe : le montant du cadre, les ficelles sur sa face ; devant elles, un fil de cintre tous les 75 mm ; chaque volet de sac à ordures fait le tour de son fil par un ourlet fermé au ruban, descend contre les ficelles et couvre l’ourlet du volet du dessous. En coupe, on tire : le cadre est parti de sa position pendue et monte presque à l’horizontale vers la pièce ; ses volets sont plaqués contre les ficelles ; la corde nouée autour du montant, un peu sous les pentures, est tendue vers celui qui tire, assis plus loin ; l’air entre par la porte vers la pièce. Au retour : le cadre revient seul vers la porte, la corde pend lâche ; les volets se soulèvent sur leurs fils et l’air continue vers la pièce entre eux. À l’entrée d’air : deux épaisseurs de serviette tendues et clouées sur un cadre de lattes, un coin rabattu montre la seconde épaisseur. Autre façon : des bâtons liés au croisement par des bandes de tissu, pendus à la planche par une boucle de cuir clouée.',
    format: 'pleine',
    disposition: [['face', 'pres'], ['tire', 'retour'], ['filtre', 'autre']],
    hauteurs: [220, 250, 146],
    largeurs: [[5, 4], [1, 1], [1, 1]],
    vues: {
      face: {
        titre: 'Vu de la pièce',
        dessin: face,
        renvois: z => [
          { n: 1, rond: [14, 176], cible: p1(-250, 650), texte: 'l’ouverture où l’air entre déjà' },
          { n: 2, rond: [14, 118], cible: p1(-368.5, 330), texte: 'cadre de lattes doublé' },
          { n: 3, rond: [14, 14], cible: p1(-500, -45), texte: 'planche clouée en travers' },
          { n: 4, rond: [252, 11], cible: p1(300, -14), texte: 'deux pentures' },
          { n: 5, rond: [305, 92], cible: p1(250, HAUT + FICELLES[3]), texte: 'ficelles, du côté de la pièce' },
        ],
      },
      pres: {
        titre: 'De près, en coupe',
        dessin: pres,
        renvois: z => [
          { n: 6, rond: [238, 110], cible: p3(VX, 44), texte: 'bande de sac de 90 mm' },
          { n: 7, rond: [238, 54], cible: p3(VX + 3.3, 12), texte: 'ourlet fermé au ruban' },
          { n: 8, rond: [238, 12], cible: p3(FIL + 0.9, -0.9), texte: 'fil de cintre redressé' },
          { n: 9, rond: [238, 176], cible: p3(BX, 78), texte: 'couvre le volet du dessous' },
        ],
      },
      tire: {
        titre: 'On tire : les volets se ferment',
        dessin: tire,
        renvois: z => [
          { n: 10, rond: [126, 14], cible: [knot2[0] + 1, knot2[1] - 3], texte: 'corde nouée au cadre' },
          { n: 11, rond: [gesteMilieu[0] - 26, gesteMilieu[1] + 24], cible: [gesteMilieu[0] - 2, gesteMilieu[1] + 2], texte: 'tirer jusqu’à presque à plat' },
        ],
      },
      retour: {
        titre: 'Au retour : les volets s’ouvrent',
        dessin: retour,
        renvois: z => [
          { n: 12, rond: [262, 60], cible: voletOuvert, texte: 'corde lâche : volets ouverts' },
        ],
      },
      filtre: {
        titre: 'À l’entrée d’air',
        dessin: filtre,
        renvois: z => [
          { n: 13, rond: [254, 30], cible: [222, 30], texte: 'deux épaisseurs de serviette' },
          { n: 14, rond: [40, 80], cible: [78, 80], texte: 'le plus grand cadre possible' },
        ],
      },
      autre: {
        titre: 'Autre façon : bâtons et boucles',
        dessin: autre,
        renvois: z => [
          { n: 15, rond: [40, 100], cible: [84, 58], texte: 'au lieu de 2 : bâtons liés' },
          { n: 16, rond: [250, 84], cible: [205, 57], texte: 'au lieu de 4 : boucle de cuir' },
        ],
      },
    },
  };
};
