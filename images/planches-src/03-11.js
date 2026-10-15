// Planche 03-11. Le tuyau gelé, puis fendu (chapitre 3, §9, « Dégeler un tuyau sans chalumeau, et dans le bon
// sens » et « Réparer un tuyau fendu »). Dessinée le 15 octobre 2026 (inventaire des planches, priorité moyenne).
// Tout vient du texte : ouvrir le robinet grand d'abord ; guenilles autour du tuyau, eau chaude versée dessus à
// répétition, en avançant d'une largeur de main à la fois du robinet vers le bouchon de glace ; chauffé au milieu
// du bouchon, l'eau fondue et la vapeur coincées entre deux glaces fendent le cuivre. Le tuyau fendu : arêtes
// limées, chambre à air ou boyau fendu enroulé, deux ou trois colliers l'un contre l'autre, de part et d'autre
// de la fente. La branche condamnée : coupée, le bout écrasé au marteau, replié sur lui-même, un collier sur le pli.
// Aucune cote : le chapitre n'en donne pas. Le tuyau est grossi pour se lire.
// Les guenilles en tireté, à droite : les places d'avant, du robinet vers la glace.
// La charte : la flèche rouge, le sens où l'on avance ; le cercle rouge, la fente du raté.
module.exports = (h) => {
  const A = h.a;
  const f1 = v => Math.round(v * 10) / 10;
  const W = at => at.replace('fill="none"', 'fill="#FFFFFF"');

  // Le tuyau en coupe, horizontal, d'axe y, de x0 à x1 : les deux parois en plein.
  const tuyau = (x0, x1, y, r, ep = 2.6) => [
    h.rect(x0, y - r, x1 - x0, ep, A.plein),
    h.rect(x0, y + r - ep, x1 - x0, ep, A.plein),
  ].join('\n');
  // Des guenilles enroulées autour du tuyau, de xa à xb ; trace = true : en tireté (une place d'avant).
  const guenilles = (xa, xb, y, R, trace = false) => {
    const at = trace ? A.cache : W(A.arete);
    const o = [h.path(`M${xa + 6} ${y - R} Q${(xa + xb) / 2} ${y - R - 4} ${xb - 6} ${y - R + 1} Q${xb + 2} ${y} ${xb - 5} ${y + R - 1} Q${(xa + xb) / 2} ${y + R + 4} ${xa + 5} ${y + R} Q${xa - 3} ${y} ${xa + 6} ${y - R} Z`, at)];
    if (!trace) for (let x = xa + 10; x < xb - 6; x += 12) o.push(h.path(`M${x} ${y - R + 1} Q${x + 7} ${y} ${x + 3} ${y + R - 1}`, A.fin));
    return o.join('\n');
  };
  // Une casserole qui verse, son bec en (x, y), penchée vers la gauche.
  const casserole = (x, y, k = 1) => {
    const P = (u, v) => { const a = -35 * Math.PI / 180; return [x + 32 * k + (u * Math.cos(a) - v * Math.sin(a)) * k + 0, y - 2 * k + (u * Math.sin(a) + v * Math.cos(a)) * k + 18 * k]; };
    const pp = (...pts) => pts.map(p => { const q = P(...p); return `${f1(q[0])} ${f1(q[1])}`; });
    const [c0, c1, c2, c3, c4, c5] = pp([-32, -20], [-32, 14], [-26, 20], [26, 20], [32, 14], [32, -20]);
    return [
      h.path(`M${c0} L${c1} Q${pp([-32, 20])} ${c2} L${c3} Q${pp([32, 20])} ${c4} L${c5}`, W(A.contour)),
      h.chemin([P(-35, -20), P(35, -20)], A.arete),
      h.chemin([P(32, -15), P(80, -18), P(81, -11), P(32, -8)], W(A.arete), true),
    ].join('\n');
  };
  const vapeur = (x, y) => [-7, 3].map((dx, i) => h.path(`M${x + dx} ${y} q-4 -6 0 -12 q4 -6 0 -12`, A.fin)).join('\n');

  // ─── Dégeler : du robinet vers la glace ─────────────────────────────────────────────────────────
  const D = z => ({ yT: 150, r: 10, xM: 36, xG: 214, xR: 500, xs: [[214, 270], [330, 386], [420, 476]] });
  const degel = z => {
    const g = D(z), o = [];
    const { yT, r, xM, xG, xR } = g;
    // le mur extérieur, en coupe, d'où vient le tuyau
    o.push(h.rect(0, 40, xM, z.h - 70, A.hachure('bois', 'arete')));
    // dans le tuyau : la glace, puis l'eau de fonte qui coule vers le robinet
    o.push(h.rect(xM, yT - r + 2, xG - xM, 2 * r - 4, A.hachure('neige', 'aucun')));
    o.push(h.path(`M${xG} ${yT - r + 2} Q${xG + 6} ${yT - 2} ${xG - 2} ${yT + r - 2}`, A.detail));
    o.push(h.rect(xG + 1, yT + 1, xR - xG - 1, r - 3, A.hachure('eau', 'aucun')));
    o.push(tuyau(xM, xR, yT, r));
    // le robinet ouvert grand : le corps, le bec vers le bas, la poignée tournée
    o.push(h.rect(xR, yT - 14, 32, 28, W(A.contour)));
    o.push(h.chemin([[xR + 10, yT + 14], [xR + 10, yT + 34], [xR + 22, yT + 34], [xR + 22, yT + 14]], W(A.contour)));
    o.push(h.ligne(xR + 16, yT - 14, xR + 16, yT - 26, A.arete), h.ligne(xR + 4, yT - 30, xR + 30, yT - 22, A.contour));
    // l'eau qui sort, en gouttes et en filet, dans une chaudière
    o.push(h.ligne(xR + 16, yT + 36, xR + 16, yT + 70, A.arete));
    for (const dy of [82, 96]) o.push(h.path(`M${xR + 16} ${yT + dy - 4} Q${xR + 19} ${yT + dy + 2} ${xR + 16} ${yT + dy + 3} Q${xR + 13} ${yT + dy + 2} ${xR + 16} ${yT + dy - 4} Z`, A.plein));
    const yS = yT + 110;
    o.push(h.chemin([[xR - 14, yS], [xR - 8, z.h - 8], [xR + 40, z.h - 8], [xR + 46, yS]], W(A.contour)));
    o.push(h.ligne(xR - 18, yS, xR + 50, yS, A.arete));
    // les guenilles : en place contre la glace ; en tireté, les places d'avant
    const [[a0, b0], [a1, b1], [a2, b2]] = g.xs;
    o.push(guenilles(a2, b2, yT, r + 9, true), guenilles(a1, b1, yT, r + 9, true));
    o.push(guenilles(a0, b0, yT, r + 9));
    // la casserole d'eau chaude, au-dessus, qui verse sur les guenilles
    const xb = (a0 + b0) / 2 + 6;
    o.push(casserole(xb + 18, 34, 0.9));
    o.push(h.path(`M${xb + 19} ${38} C${xb + 6} ${52} ${xb} ${90} ${xb} ${yT - r - 10}`, A.arete));
    o.push(vapeur(xb + 64, 26));
    // le sens où l'on avance : du robinet vers la glace, d'une main à la fois
    const yF = yT + 44;
    o.push(h.geste(`M${b2} ${yF} L${a0 + 4} ${yF}`));
    for (const x of [a2, a1]) o.push(h.ligne(x + 28, yF - 5, x + 28, yF + 5, A.detail));
    return { svg: o.join('\n'), g: { ...g, yF, xb } };
  };

  // ─── Le raté : chauffé au milieu du bouchon ─────────────────────────────────────────────────────
  const rate = z => {
    const o = [], y = 92, r = 13, x0 = 4, x1 = z.l - 4, xm = z.l / 2;
    o.push(h.rect(x0, y - r + 2, xm - 30 - x0, 2 * r - 4, A.hachure('neige', 'aucun')));
    o.push(h.rect(xm + 30, y - r + 2, x1 - xm - 30, 2 * r - 4, A.hachure('neige', 'aucun')));
    o.push(h.rect(xm - 30, y - r + 2, 60, 2 * r - 4, A.hachure('eau', 'aucun')));
    for (const [dx, dy, rr] of [[-14, -4, 3], [2, -6, 2.4], [16, -3, 3.2], [-4, 3, 2]]) o.push(h.cercle(xm + dx, y + dy, rr, W(A.fin)));
    // le cuivre fendu en haut, au milieu
    o.push(h.rect(x0, y + r - 2.6, x1 - x0, 2.6, A.plein));
    o.push(h.rect(x0, y - r, xm - 6 - x0, 2.6, A.plein), h.rect(xm + 6, y - r, x1 - xm - 6, 2.6, A.plein));
    o.push(h.chemin([[xm - 6, y - r], [xm - 3, y - r - 6], [xm, y - r - 2], [xm + 3, y - r - 7], [xm + 6, y - r]], A.arete));
    // la chaleur, dessous, au milieu
    for (const dx of [-14, 0, 14]) o.push(h.path(`M${xm + dx} ${y + r + 40} q-4 -6 0 -12 q4 -6 0 -12`, A.detail));
    o.push(h.controle(xm, y - r - 2, 12));
    // la pression qui pousse sur les deux glaces
    o.push(h.fleche(`M${xm - 8} ${y + 1} L${xm - 26} ${y + 1}`, A.detail), h.fleche(`M${xm + 8} ${y + 1} L${xm + 26} ${y + 1}`, A.detail));
    return o.join('\n');
  };

  // ─── La fente fermée : chambre à air et colliers ────────────────────────────────────────────────
  const F = z => ({ y: 108, r: 14, xa: 52, xb: z.l - 52 });
  const fente = z => {
    const g = F(z), o = [];
    const { y, r, xa, xb } = g;
    // le tuyau, vu de côté
    o.push(h.rect(0, y - r, z.l, 2 * r, W(A.contour)));
    o.push(h.ligne(0, y - r + 5, z.l, y - r + 5, A.fin));
    // la chambre à air enroulée (gris : la face à l'ombre du caoutchouc noir), les spires
    const R = r + 5;
    o.push(h.rect(xa, y - R, xb - xa, 2 * R, A.ombre + ' rx="4"'));
    o.push(h.rect(xa, y - R, xb - xa, 2 * R, A.arete.replace('fill="none"', 'fill="none" rx="4"')));
    for (let x = xa + 12; x < xb - 6; x += 14) o.push(h.path(`M${x} ${y - R} Q${x + 8} ${y} ${x + 4} ${y + R}`, A.detail));
    // la fente, sous le caoutchouc (tireté)
    o.push(h.ligne(z.l / 2 - 16, y - 3, z.l / 2 + 16, y - 3, A.cache));
    // trois colliers, l'un contre l'autre, qui mordent de chaque côté de la fente
    const C = R + 3;
    const cols = [z.l / 2 - 26, z.l / 2, z.l / 2 + 26];
    for (const x of cols) {
      o.push(h.rect(x - 9, y - C, 18, 2 * C, W(A.arete)));
      o.push(h.ligne(x - 9, y - C + 4, x + 9, y - C + 4, A.fin));
      // la vis du collier, sur le dessus
      o.push(h.rect(x - 6, y - C - 9, 12, 9, W(A.arete)), h.ligne(x - 3, y - C - 9, x - 3, y - C, A.fin), h.ligne(x + 3, y - C - 9, x + 3, y - C, A.fin));
    }
    return { svg: o.join('\n'), g: { ...g, R, C, cols } };
  };

  // ─── La branche condamnée : écrasée, repliée, un collier sur le pli ─────────────────────────────
  const branche = z => {
    const o = [], y = 108, r = 14;
    const x1 = 70, x2 = 92, xp = z.l - 30, e = 4;
    // le tuyau rond qui s'aplatit : vu de côté, il s'amincit jusqu'à l'écrasé
    o.push(h.path(`M0 ${y - r} L${x1} ${y - r} C${x1 + 12} ${y - r} ${x2 - 8} ${y - e} ${x2} ${y - e} L${xp} ${y - e} A${e + 5} ${e + 5} 0 0 1 ${xp} ${y + e + 10}`
      + ` L${x2 + 6} ${y + e + 10}`, A.contour));
    o.push(h.path(`M0 ${y + r} L${x1} ${y + r} C${x1 + 12} ${y + r} ${x2 - 8} ${y + e} ${x2} ${y + e} L${xp} ${y + e} A${1} ${1} 0 0 1 ${xp} ${y + e + 2}`
      + ` L${x2 + 6} ${y + e + 2}`, A.arete));
    o.push(h.ligne(x2 + 6, y + e + 2, x2 + 6, y + e + 10, A.arete));
    o.push(h.ligne(0, y - r + 5, x1, y - r + 5, A.fin));
    // le collier serré sur le pli : sur les deux épaisseurs
    const xc = xp - 26, C = 12;
    o.push(h.rect(xc - 9, y - C, 18, 2 * C + 10, W(A.arete)));
    o.push(h.rect(xc - 6, y - C - 9, 12, 9, W(A.arete)), h.ligne(xc - 3, y - C - 9, xc - 3, y - C, A.fin), h.ligne(xc + 3, y - C - 9, xc + 3, y - C, A.fin));
    return { svg: o.join('\n'), P: { ecrase: [x2 + 30, y - e], pli: [xp + 9, y + 8], collier: [xc + 9, y + 4] } };
  };

  return {
    ref: '03-11',
    titre: 'Le tuyau gelé, puis fendu',
    desc: 'En haut, un tuyau de cuivre en coupe sort d’un mur extérieur ; dedans, le bouchon de glace côté mur, puis l’eau de fonte qui coule vers le robinet, ouvert grand, qui goutte dans une chaudière. Des guenilles enroulées autour du tuyau contre la glace ; une casserole verse l’eau chaude dessus. Deux places d’avant des guenilles, en tireté, plus près du robinet ; la flèche rouge va du robinet vers la glace. En bas à gauche, le raté : chauffé au milieu, l’eau et la vapeur prises entre deux glaces fendent le cuivre (cercle rouge). Au milieu, la fente fermée : une chambre à air enroulée, trois colliers l’un contre l’autre par-dessus. À droite, la branche condamnée : le bout écrasé, replié sur lui-même, un collier serré sur le pli.',
    format: 'pleine',
    disposition: [['degel'], ['rate', 'fente', 'branche']],
    hauteurs: [1.25, 1],
    largeurs: [[1], [1, 1.15, 1]],
    vues: {
      degel: {
        titre: 'Dégeler : du robinet vers la glace',
        dessin: z => degel(z).svg,
        renvois: z => {
          const { g } = degel(z);
          const { yT, r, xM, xG, xR, xs, yF, xb } = g;
          return [
            { n: 1, rond: [z.l - 22, yT - 52], cible: [xR + 32, yT - 8], texte: 'ouvrir le robinet grand, d’abord' },
            { n: 2, rond: [xs[0][0] - 12, yT + 60], cible: [xs[0][0] + 10, yT + r + 8], texte: 'guenilles autour du tuyau' },
            { n: 3, rond: [xb - 70, 40], cible: [xb + 1, 70], texte: 'eau chaude versée, à répétition' },
            { n: 4, rond: [xs[1][1] + 6, yF + 30], cible: [xs[1][1], yF + 1], texte: 'avancer d’une main vers la glace' },
            { n: 5, rond: [96, yT + 60], cible: [110, yT + 6], texte: 'bouchon de glace' },
          ];
        },
      },
      rate: {
        titre: 'Chauffé au milieu : il fend',
        dessin: z => rate(z),
      },
      fente: {
        titre: 'La fente fermée',
        dessin: z => fente(z).svg,
        renvois: z => {
          const { g } = fente(z);
          return [
            { n: 6, rond: [22, g.y + 70], cible: [g.xa + 6, g.y + g.R - 2], texte: 'chambre à air enroulée' },
            { n: 7, rond: [z.l - 22, g.y - 58], cible: [g.cols[2] + 6, g.y - g.C - 6], texte: 'colliers serrés, l’un contre l’autre' },
          ];
        },
      },
      branche: {
        titre: 'La branche condamnée',
        dessin: z => branche(z).svg,
        renvois: z => {
          const { P } = branche(z);
          return [
            { n: 8, rond: [P.ecrase[0] - 10, 50], cible: P.ecrase, texte: 'bout écrasé au marteau, replié' },
            { n: 9, rond: [z.l - 30, 178], cible: P.collier, texte: 'collier serré sur le pli' },
          ];
        },
      },
    },
  };
};
