// Planche 03-11. Le tuyau gelé, puis fendu (chapitre 3, section 9, « Dégeler un tuyau sans chalumeau, et dans le
// bon sens » et « Réparer un tuyau fendu »). Dessinée le 15 octobre 2026, refaite le 16 octobre.
//
// Tout vient du texte : ouvrir le robinet grand d'abord ; guenilles autour du tuyau, eau chaude versée dessus à
// répétition, en avançant d'une largeur de main à la fois du robinet vers le bouchon de glace ; chauffé au milieu
// du bouchon, l'eau de fonte prise entre deux bouts de glace pousse, et la pression fend le cuivre (texte du 16 octobre ; la vapeur n'y est plus). Le tuyau fendu :
// chambre à air ou boyau fendu enroulé, deux ou trois colliers l'un contre l'autre, qui mordent de chaque côté de
// la fente. La branche condamnée : coupée, le bout écrasé au marteau, replié sur lui-même, un collier sur le pli.
// Aucune cote : le chapitre n'en donne pas. Le tuyau est grossi pour se lire.
//
// Refaite le 16 octobre : le raté est maintenant le même tuyau, cadré comme le bon (même mur, même robinet, même
// bouchon de glace), chauffé au milieu ; la casserole a son bord roulé et son manche (elle avait l'air d'une boîte) ;
// les deux réparations sont deux fois plus grandes, et le collier a son boîtier et sa vis, qui le font reconnaître.
//
// La charte : la flèche rouge, le sens où l'on avance ; le cercle rouge, la fente du raté. Les guenilles des places
// d'avant, en tireté. Toute l'eau liquide en bleu, h.a.hachure('eau') (JP, 19 octobre 2026) : l'eau de fonte dans le
// tuyau, le filet d'eau chaude, le filet et les gouttes du robinet, les jets et les gouttes de la fente. La glace
// garde son pointillé.
//
// Reprise le 19 octobre 2026 (second regard) : dans le raté, la poche d'eau de fonte suit exactement les deux arcs
// de glace (le même tracé que glace()) et les parois, sans liseré blanc ; elle est peinte avant la glace, dont les
// arcs restent entiers. Dans chaque vue, le motif de l'eau est calé pour qu'aucune vaguelette ne soit coupée par le
// bord d'une forme : plus de demi-arcs sur la paroi du bas, plus de barre en travers du filet du robinet.
module.exports = (h) => {
  const A = h.a;
  const f1 = v => Math.round(v * 10) / 10;
  const W = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  // Le motif de l'eau calé de C = [tx, ty] : la forme est tracée décalée de (−tx, −ty) dans un groupe déplacé de
  // (tx, ty) ; elle reste en place, seules les vaguelettes du motif bougent. Un bout de vaguelette coupé par le bord
  // d'une forme mince se lit comme un trait égaré. CD : le dégel (deux vaguelettes entières dans l'eau du tuyau,
  // aucune dans les filets et les gouttes) ; CR : le raté (deux vaguelettes entières dans la poche, à l'écart des
  // flèches et du point du renvoi 6 ; aucune dans les jets et les gouttes) ; CF : le filet de la casserole du raté.
  const CD = [-17, 4], CR = [-23.5, 2.5], CF = [-14, 0];
  const cale = ([tx, ty], dessin) => `<g transform="translate(${tx} ${ty})">\n${dessin(-tx, -ty)}\n</g>`;

  // ─── Les pièces communes ─────────────────────────────────────────────────────────────────────────
  // Le même tuyau dans les deux rangées du haut : mur de 0 à XM, tuyau d'axe YT et de rayon R jusqu'au robinet en XR.
  const XM = 34, XR = 500, YT = 106, R = 14, EP = 3;

  // Le tuyau en coupe : les deux parois en plein. Une paroi peut être coupée par une fente (trous = [[xa, xb]]).
  const parois = (x0, x1, { trouHaut = null, trouBas = null } = {}) => {
    const o = [];
    const bande = (y, trou) => {
      if (!trou) return [h.rect(x0, y, x1 - x0, EP, A.plein)];
      return [h.rect(x0, y, trou[0] - x0, EP, A.plein), h.rect(trou[1], y, x1 - trou[1], EP, A.plein)];
    };
    o.push(...bande(YT - R, trouHaut), ...bande(YT + R - EP, trouBas));
    return o.join('\n');
  };
  // Le mur extérieur en coupe, d'où vient le tuyau.
  const mur = z => h.rect(0, 14, XM, z.h - 20, A.hachure('bois', 'arete'));
  // Le robinet ouvert grand : l'écrou sur le tuyau, le corps, le bec qui descend, la manette levée.
  const robinet = () => [
    h.rect(XR - 2, YT - R - 3, 10, 2 * R + 6, W(A.arete)),
    h.path(`M${XR + 8} ${YT - 15} L${XR + 34} ${YT - 15} Q${XR + 42} ${YT - 15} ${XR + 42} ${YT - 6} L${XR + 42} ${YT + 4} Q${XR + 42} ${YT + 14} ${XR + 34} ${YT + 16}`
      + ` L${XR + 28} ${YT + 18} L${XR + 28} ${YT + 34} L${XR + 14} ${YT + 34} L${XR + 14} ${YT + 16} L${XR + 8} ${YT + 15} Z`, W(A.contour)),
    h.ligne(XR + 14, YT + 30, XR + 28, YT + 30, A.detail),
    h.rect(XR + 19, YT - 27, 8, 12, W(A.arete)),
    h.path(`M${XR + 4} ${YT - 33} L${XR + 42} ${YT - 25} L${XR + 41} ${YT - 21} L${XR + 3} ${YT - 29} Z`, W(A.arete)),
  ].join('\n');
  // La glace : un pointillé serré dans le tuyau, de xa à xb ; ses deux fronts en courbe.
  const glace = (xa, xb, { frontG = false, frontD = true } = {}) => {
    const y1 = YT - R + EP, y2 = YT + R - EP, o = [];
    o.push(h.rect(xa, y1, xb - xa, y2 - y1, A.hachure('neige', 'aucun')));
    if (frontD) o.push(h.path(`M${xb} ${y1} Q${xb + 6} ${YT} ${xb} ${y2}`, A.detail));
    if (frontG) o.push(h.path(`M${xa} ${y1} Q${xa - 6} ${YT} ${xa} ${y2}`, A.detail));
    return o.join('\n');
  };
  // Des guenilles enroulées autour du tuyau, de xa à xb ; trace = true : en tireté (une place d'avant).
  const guenilles = (xa, xb, trace = false) => {
    const Rg = R + 9, y = YT, at = trace ? A.cache : W(A.arete);
    const o = [h.path(`M${xa + 6} ${y - Rg} Q${(xa + xb) / 2} ${y - Rg - 4} ${xb - 6} ${y - Rg + 1} Q${xb + 2} ${y} ${xb - 5} ${y + Rg - 1} Q${(xa + xb) / 2} ${y + Rg + 4} ${xa + 5} ${y + Rg} Q${xa - 3} ${y} ${xa + 6} ${y - Rg} Z`, at)];
    if (!trace) for (let x = xa + 10; x < xb - 6; x += 11) o.push(h.path(`M${x} ${y - Rg + 1} Q${x + 7} ${y} ${x + 3} ${y + Rg - 1}`, A.fin));
    return o.join('\n');
  };
  // Une casserole qui verse vers la gauche, son bec en (xb, yb), penchée de 24° : le corps aux coins arrondis, le
  // bord roulé, le bec, le manche percé au bout. Rend aussi le point exact du bec.
  const casserole = (xb, yb) => {
    const a = -24 * Math.PI / 180, c = Math.cos(a), s = Math.sin(a);
    const P = (u, v) => [f1(xb + u * c - v * s), f1(yb + u * s + v * c)];
    const p = (u, v) => P(u, v).join(' ');
    const L0 = 60, H0 = 30, rc = 7;
    const corps = `M${p(0, 0)} L${p(0, H0 - rc)} Q${p(0, H0)} ${p(rc, H0)} L${p(L0 - rc, H0)} Q${p(L0, H0)} ${p(L0, H0 - rc)} L${p(L0, 0)}`;
    const manche = `M${p(L0, 5)} L${p(L0 + 38, 1)} Q${p(L0 + 44, 1)} ${p(L0 + 44, 5)} Q${p(L0 + 44, 9)} ${p(L0 + 38, 9)} L${p(L0, 11)} Z`;
    return [
      h.path(corps, W(A.contour)),
      h.ligne(...P(-2, 0), ...P(L0 + 2, 0), A.contour),
      h.path(`M${p(-2, 0)} Q${p(-6, -1)} ${p(-7, -4)}`, A.arete),
      h.path(manche, W(A.arete)),
      h.cercle(...P(L0 + 37, 5), 1.8, A.arete),
    ].join('\n');
  };
  // Le filet d'eau chaude, en ruban bleu, du bec (x0, y0) jusqu'à (x1, y1).
  const filet = (x0, y0, x1, y1) => {
    const mx = x0 - 4, e0 = 2.4, e1 = 1.4;
    return h.path(`M${x0 - e0} ${y0} C${mx - e0} ${y0 + 14} ${x1 - e1} ${y1 - 26} ${x1 - e1} ${y1} L${x1 + e1} ${y1} C${x1 + e1} ${y1 - 26} ${mx + e0} ${y0 + 14} ${x0 + e0} ${y0} Z`, A.hachure('eau', 'detail'));
  };
  // Une goutte d'eau, en bleu, cernée d'un trait fin (la pointe en haut).
  const goutte = (x, y, r = 2.6) => h.path(`M${f1(x)} ${f1(y - 1.4 * r)} Q${f1(x + r)} ${f1(y + 0.6 * r)} ${f1(x)} ${f1(y + r)} Q${f1(x - r)} ${f1(y + 0.6 * r)} ${f1(x)} ${f1(y - 1.4 * r)} Z`, A.hachure('eau', 'fin'));
  const vapeur = (x, y) => [-6, 4].map(dx => h.path(`M${x + dx} ${y} q-4 -5 0 -10 q4 -5 0 -10`, A.fin)).join('\n');

  // ─── Dégeler : du robinet vers la glace ─────────────────────────────────────────────────────────
  const XG = 330;                                   // le front de glace
  const RAGS = [[308, 358], [377, 427], [446, 494]]; // la place des guenilles : maintenant, puis les places d'avant
  const YF = YT + 42;                               // la flèche du sens où l'on avance
  const degel = z => {
    const o = [mur(z)];
    o.push(glace(XM, XG));
    o.push(cale(CD, (dx, dy) => h.rect(XG + 1 + dx, YT + 1 + dy, XR - XG - 1, R - EP - 1, A.hachure('eau', 'aucun'))));
    o.push(parois(XM, XR), robinet());
    // l'eau qui sort : un filet, puis des gouttes
    o.push(cale(CD, (dx, dy) => h.rect(XR + 19.6 + dx, YT + 34.5 + dy, 2.8, 21.5, A.hachure('eau', 'fin'))));
    for (const g of [66, 77]) o.push(cale(CD, (dx, dy) => goutte(XR + 21 + dx, YT + g + dy)));
    // les guenilles : les places d'avant en tireté, puis la place de maintenant, contre la glace
    o.push(guenilles(...RAGS[2], true), guenilles(...RAGS[1], true), guenilles(...RAGS[0]));
    // la casserole qui verse sur les guenilles
    const xb = 346, yb = 46;
    o.push(casserole(xb, yb), cale(CD, (dx, dy) => filet(xb - 2 + dx, yb + dy, 334 + dx, YT - R - 9 + dy)), vapeur(xb + 27, 34));
    // le sens où l'on avance : du robinet vers la glace, d'une main à la fois
    o.push(h.geste(`M${RAGS[2][1] - 6} ${YF} L${RAGS[0][0] + 6} ${YF}`));
    for (const [a, b] of [RAGS[1], RAGS[2]]) o.push(h.ligne((a + b) / 2, YF - 5, (a + b) / 2, YF + 5, A.detail));
    return o.join('\n');
  };

  // ─── Le raté : le même tuyau, chauffé au milieu du bouchon ─────────────────────────────────────
  // Le bouchon court du mur jusqu'au robinet. Au milieu, la poche d'eau de fonte, prise entre deux glaces ; la
  // pression pousse sur les deux fronts ; le cuivre s'ouvre dessous.
  const P1 = 228, P2 = 300, XC = (P1 + P2) / 2;
  const rate = z => {
    const o = [mur(z)];
    // la poche : d'un arc de glace à l'autre (le même tracé que glace()), entre les parois ; peinte avant la glace
    const y1 = YT - R + EP, y2 = YT + R - EP;
    o.push(cale(CR, (dx, dy) => {
      const p = (x, y) => `${f1(x + dx)} ${f1(y + dy)}`;
      return h.path(`M${p(P1, y1)} L${p(P2, y1)} Q${p(P2 - 6, YT)} ${p(P2, y2)} L${p(P1, y2)} Q${p(P1 + 6, YT)} ${p(P1, y1)} Z`, A.hachure('eau', 'aucun'));
    }));
    o.push(glace(XM, P1), glace(P2, XR - 4, { frontG: true, frontD: false }));
    o.push(h.fleche(`M${XC - 8} ${YT + 6} L${P1 + 4} ${YT + 6}`, A.arete), h.fleche(`M${XC + 8} ${YT + 6} L${P2 - 4} ${YT + 6}`, A.arete));
    o.push(parois(XM, XR, { trouBas: [XC - 6, XC + 6] }), robinet());
    // les lèvres de la fente, ouvertes vers le dehors, et l'eau qui en gicle
    const yb = YT + R;
    o.push(h.path(`M${XC - 6} ${yb} L${XC - 4} ${yb + 5} L${XC - 2} ${yb + 4}`, A.arete), h.path(`M${XC + 6} ${yb} L${XC + 4} ${yb + 6} L${XC + 2} ${yb + 5}`, A.arete));
    // les jets : de minces fuseaux bleus qui s'évasent en s'éloignant de la fente
    for (const a of [-18, 0, 18]) {
      const t = a * Math.PI / 180, u = [Math.sin(t), Math.cos(t)], n = [Math.cos(t), -Math.sin(t)];
      const p0 = [XC + 5 * u[0], yb + 10], p1 = [XC + 18 * u[0], yb + 10 + 14 * u[1]];
      const e0 = 0.25, e1 = 1.3;
      const pts = [[p0[0] + n[0] * e0, p0[1] + n[1] * e0], [p1[0] + n[0] * e1, p1[1] + n[1] * e1], [p1[0] - n[0] * e1, p1[1] - n[1] * e1], [p0[0] - n[0] * e0, p0[1] - n[1] * e0]];
      o.push(cale(CR, (dx, dy) => h.chemin(pts.map(([x, y]) => [f1(x + dx), f1(y + dy)]), A.hachure('eau', 'fin'), true)));
    }
    for (const [gx, gy] of [[-8, 34], [7, 38], [0, 46]]) o.push(cale(CR, (dx, dy) => goutte(XC + gx + dx, yb + gy + dy)));
    o.push(h.controle(XC, yb + 10, 17));
    // la chaleur au milieu : la même casserole, qui verse sur le milieu du bouchon
    const xb = XC + 12, ybec = 46;
    o.push(casserole(xb, ybec), cale(CF, (dx, dy) => filet(xb - 2 + dx, ybec + dy, XC + dx, YT - R - 0.5 + dy)), vapeur(xb + 27, 34));
    return o.join('\n');
  };

  // ─── La fente fermée : chambre à air et colliers ────────────────────────────────────────────────
  // Le tuyau vu de côté, cassé aux deux bouts (il continue). La fente, sous le caoutchouc, en tireté. Trois colliers
  // l'un contre l'autre couvrent la fente et mordent au-delà de ses deux bouts.
  const collier = (x, yH, yB, bl = 20) => {
    const o = [h.rect(x - bl / 2, yH, bl, yB - yH, W(A.arete))];
    for (let y = yH + 6; y < yB - 4; y += 6) o.push(h.ligne(x - 4, y, x + 4, y, A.fin));
    // le boîtier sur le dessus, et la tête de la vis qu'on voit de face
    o.push(h.rect(x - 9, yH - 11, 18, 11, W(A.arete)));
    const hex = Array.from({ length: 6 }, (_, i) => { const t = (Math.PI / 3) * i; return [x + 4.6 * Math.cos(t), yH - 5.5 + 4.6 * Math.sin(t)]; });
    o.push(h.chemin(hex, W(A.detail), true), h.ligne(x - 2.6, yH - 5.5, x + 2.6, yH - 5.5, A.detail));
    return o.join('\n');
  };
  const tuyauCote = (x0, x1, y, r) => h.path(`M${x0} ${y - r} L${x1} ${y - r} Q${x1 + 5} ${y - r / 2} ${x1} ${y} Q${x1 - 5} ${y + r / 2} ${x1} ${y + r} L${x0} ${y + r} Q${x0 - 5} ${y + r / 2} ${x0} ${y} Q${x0 + 5} ${y - r / 2} ${x0} ${y - r} Z`, W(A.contour));
  const FENTE = z => ({ y: z.h / 2 + 8, r: 17, xa: 62, xb: z.l - 62, xm: z.l / 2 });
  const fente = z => {
    const { y, r, xa, xb, xm } = FENTE(z), o = [];
    o.push(tuyauCote(8, z.l - 8, y, r));
    o.push(h.ligne(10, y - r + 6, z.l - 10, y - r + 6, A.fin));
    // la chambre à air enroulée : le caoutchouc noir, sa face à l'ombre en gris ; les spires
    const Rc = r + 5;
    o.push(h.rect(xa, y - Rc, xb - xa, 2 * Rc, A.ombre + ' rx="5"'));
    o.push(h.rect(xa, y - Rc, xb - xa, 2 * Rc, A.arete.replace('fill="none"', 'fill="none" rx="5"')));
    for (let x = xa + 14; x < xb - 8; x += 15) o.push(h.path(`M${x} ${y - Rc} Q${x + 9} ${y} ${x + 4} ${y + Rc}`, A.detail));
    // trois colliers, l'un contre l'autre, sur la fente et au-delà de ses deux bouts
    const C = Rc + 3;
    for (const dx of [-21, 0, 21]) o.push(collier(xm + dx, y - C, y + C));
    // la fente, cachée sous le caoutchouc et les colliers : en tireté, par-dessus
    o.push(h.ligne(xm - 22, y + 2, xm + 22, y + 2, A.cache.replace('stroke-width="0.7"', 'stroke-width="1.4"')));
    return o.join('\n');
  };

  // ─── La branche condamnée : écrasée, repliée, un collier sur le pli ─────────────────────────────
  // Vue de côté : le tuyau rond (cassé à gauche) s'aplatit en une bande, qui se replie par-dessus elle-même ;
  // un collier serre les deux épaisseurs près du pli.
  const BR = z => {
    const y = z.h / 2 + 14, r = 17, e = 4.5, x1 = 74, x2 = 106, xp = z.l - 34, Rp = 8;
    return { y, r, e, x1, x2, xp, Rp, yb: y + 3, yh: y + 3 - 2 * Rp };
  };
  const branche = z => {
    const { y, r, e, x1, x2, xp, Rp, yb, yh } = BR(z), o = [];
    o.push(h.path(`M${x2 + 20} ${yh - e} L${xp} ${yh - e} A${Rp + e} ${Rp + e} 0 0 1 ${xp} ${yb + e} L${x2} ${yb + e}`
      + ` C${x2 - 14} ${yb + e} ${x1 + 14} ${y + r} ${x1} ${y + r} L8 ${y + r} Q3 ${y + r / 2} 8 ${y} Q13 ${y - r / 2} 8 ${y - r} L${x1} ${y - r}`
      + ` C${x1 + 14} ${y - r} ${x2 - 14} ${yb - e} ${x2} ${yb - e} L${xp} ${yb - e} A${Rp - e} ${Rp - e} 0 0 0 ${xp} ${yh + e} L${x2 + 20} ${yh + e} Z`, W(A.contour)));
    o.push(h.ligne(12, y - r + 6, x1, y - r + 6, A.fin));
    // le bout coupé, au-dessus : une petite arête
    o.push(h.ligne(x2 + 20, yh - e, x2 + 20, yh + e, A.arete));
    // le collier, autour des deux épaisseurs, près du pli
    const xc = xp - 26;
    o.push(collier(xc, yh - e - 5, yb + e + 5, 18));
    return o.join('\n');
  };

  return {
    ref: '03-11',
    titre: 'Le tuyau gelé, puis fendu',
    desc: 'En haut, un tuyau de cuivre en coupe sort d’un mur extérieur ; dedans, le bouchon de glace côté mur, puis l’eau de fonte qui coule vers le robinet, ouvert grand, qui laisse couler un filet. Des guenilles enroulées autour du tuyau contre la glace ; une casserole verse l’eau chaude dessus. Deux places d’avant des guenilles, en tireté, plus près du robinet ; la flèche rouge va du robinet vers la glace. Au milieu, le même tuyau, cadré pareil, le bouchon de glace du mur jusqu’au robinet : la casserole verse sur le milieu du bouchon ; l’eau de fonte, prise entre deux glaces, pousse sur les deux fronts, et le cuivre s’ouvre dessous (cercle rouge). En bas à gauche, la fente fermée : une chambre à air enroulée, trois colliers l’un contre l’autre par-dessus, qui couvrent la fente et la dépassent des deux bouts. À droite, la branche condamnée : le bout écrasé, replié sur lui-même, un collier serré sur le pli.',
    format: 'pleine',
    disposition: [['degel'], ['rate'], ['fente', 'branche']],
    hauteurs: [1.15, 1.15, 1],
    vues: {
      degel: {
        titre: 'Dégeler : du robinet vers la glace',
        dessin: degel,
        renvois: z => [
          { n: 1, rond: [z.l - 14, YT - 66], cible: [XR + 38, YT - 25], texte: 'ouvrir le robinet grand, d’abord' },
          { n: 2, rond: [RAGS[0][0] - 16, YT + 66], cible: [RAGS[0][0] + 8, YT + R + 9], texte: 'guenilles autour du tuyau' },
          { n: 3, rond: [262, 44], cible: [331, 68], texte: 'eau chaude versée, à répétition' },
          { n: 4, rond: [(RAGS[1][0] + RAGS[1][1]) / 2 + 30, YF + 28], cible: [(RAGS[1][0] + RAGS[1][1]) / 2 + 30, YF + 1.5], texte: 'avancer d’une main vers la glace' },
          { n: 5, rond: [130, YT + 50], cible: [150, YT + 5], texte: 'bouchon de glace' },
        ],
      },
      rate: {
        titre: 'Raté : chauffé au milieu du bouchon',
        dessin: rate,
        renvois: z => [
          { n: 6, rond: [XC + 92, YT + 44], cible: [P2 - 10, YT + 3], texte: 'eau de fonte prise entre deux glaces' },
          { n: 7, rond: [XC - 84, YT + 50], cible: [XC - 17, YT + R + 12], texte: 'la pression fend le cuivre' },
        ],
      },
      fente: {
        titre: 'La fente fermée',
        dessin: fente,
        renvois: z => {
          const { y, r, xa } = FENTE(z);
          return [
            { n: 8, rond: [28, y + 54], cible: [xa + 8, y + r + 4], texte: 'chambre à air enroulée' },
            { n: 9, rond: [z.l - 26, y - 56], cible: [z.l / 2 + 30, y - r - 8], texte: 'colliers serrés, l’un contre l’autre' },
          ];
        },
      },
      branche: {
        titre: 'La branche condamnée',
        dessin: branche,
        renvois: z => {
          const { yb, yh, e, x2, xp } = BR(z);
          return [
            { n: 10, rond: [x2 + 40, z.h - 16], cible: [x2 + 40, yb + e], texte: 'bout écrasé au marteau, replié' },
            { n: 11, rond: [xp - 70, 22], cible: [xp - 30, yh - e - 14], texte: 'collier serré sur le pli' },
          ];
        },
      },
    },
  };
};
