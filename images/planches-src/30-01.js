// Planche 30-01 — le poste de lavage à pédale (ch. 5, section 9).
// Échelle interne : 4,8 px/cm. Le bidon pend par une corde qui le traverse haut dans les
// flancs (pivot) ; la poignée est à l'avant, près du goulot : tirée vers le bas, elle fait
// basculer le goulot vers l'avant.
module.exports = (h) => {
  const s = 4.8;
  const blanc = a => a.replace('fill="none"', h.a.blanc.split(' ')[0]);
  const pt = p => p.map(v => Math.round(v * 10) / 10).join(',');

  // ── Vue de côté : le bidon basculé de 45° autour du pivot ──
  const cote = (z) => {
    const G = z.h - 15, P = G - 105 * s, PX = 150;
    const c = Math.SQRT1_2;
    const R = (x, y) => [PX + s * (x - y) * c, P + s * (x + y) * c];
    // chemin en coordonnées locales du bidon (cm), tourné puis mis à l'échelle
    const pd = (...cmds) => cmds.map(([k, ...v]) => {
      const out = [];
      for (let i = 0; i < v.length; i += 2) out.push(pt(R(v[i], v[i + 1])));
      return k + ' ' + out.join(' ');
    }).join(' ');
    const T = R(7.35, 4);                     // la corde nouée à la poignée
    const pole = [PX, P - 60];
    const br = [T[0], G - 9];                 // la branche, vue en bout, posée au sol
    const arc = a => pt([PX + 135 * Math.cos(a * Math.PI / 180), P + 135 * Math.sin(a * Math.PI / 180)]);
    const out = [];
    // sol
    out.push(h.rect(0, G, z.l, 12, h.a.hachure('terre', 'aucun')));
    out.push(h.ligne(0, G, z.l, G, h.a.arete));
    // perche, vue en bout
    out.push(h.cercle(pole[0], pole[1], 11, h.a.hachure('bois')));
    // hauteur du pivot
    out.push(h.cote(14, G, 14, P, 'hauteur de coude'));
    // le bidon
    out.push(h.path(pd(['M', -8, 21], ['Q', -8, 23, -6, 23], ['L', 6, 23], ['Q', 8, 23, 8, 21], ['L', 8, -1.5],
      ['Q', 8, -4.6, 5.8, -4.6], ['L', 2.4, -4.6], ['Q', 1.2, -4, 0, -4], ['L', -6.5, -4], ['Q', -8, -4, -8, -2.5]) + ' Z', blanc(h.a.contour)));
    // fente de la poignée
    out.push(h.path(pd(['M', 5, 1.15], ['Q', 5, 0.3, 5.85, 0.3], ['Q', 6.7, 0.3, 6.7, 1.15], ['L', 6.7, 6.75],
      ['Q', 6.7, 7.6, 5.85, 7.6], ['Q', 5, 7.6, 5, 6.75]) + ' Z', h.a.arete));
    // goulot : le filet visible sous le bouchon desserré
    out.push(h.path(pd(['M', 2.4, -4.6], ['L', 2.4, -5.8]) + ' ' + pd(['M', 5.8, -4.6], ['L', 5.8, -5.8]), h.a.arete));
    out.push(h.path(pd(['M', 2.4, -4.9], ['L', 5.8, -5.3]) + ' ' + pd(['M', 2.4, -5.3], ['L', 5.8, -5.7]), h.a.detail));
    // bouchon
    out.push(h.path(pd(['M', 1.9, -5.8], ['L', 1.9, -8.9], ['Q', 1.9, -9.3, 2.3, -9.3], ['L', 5.9, -9.3],
      ['Q', 6.3, -9.3, 6.3, -8.9], ['L', 6.3, -5.8]) + ' Z', blanc(h.a.arete)));
    out.push(h.path([2.8, 3.7, 4.6, 5.5].map(x => pd(['M', x, -8.9], ['L', x, -6.2])).join(' '), h.a.detail));
    // pivot : le trou, la corde qui monte à la perche
    out.push(h.ligne(PX, pole[1] + 11, PX, P - 2.2, h.a.arete));
    out.push(h.ligne(20, P, PX - 4, P, h.a.fin + ' stroke-dasharray="2 3"'));
    out.push(h.cercle(PX, P, 2.2, blanc(h.a.arete)));
    // corde de la pédale : nouée autour de la poignée, descend jusqu'à la botte
    out.push(h.path(pd(['M', 6.5, 3.5], ['L', 8.3, 3.5]) + ' ' + pd(['M', 6.5, 4.5], ['L', 8.3, 4.5]), h.a.arete));
    out.push(h.ligne(T[0], T[1] + 3, T[0], G - 30, h.a.arete));
    // le filet d'eau, du bord du bouchon aux mains
    out.push(h.path('M 191,105 Q 194.5,112 195.2,122 L 195.2,199', h.a.detail));
    out.push(h.path('M 193.2,104.2 Q 197,111.5 197.6,122 L 197.6,199.5', h.a.detail));
    // la main sous le filet : de profil, côté pouce, paume vers le haut en creux, l'avant-bras vers la personne
    // modèle s10 (la main tendue, paume en l'air, vue de côté) : le filet tombe dans le creux de la
    // paume, l'avant-bras vers la personne
    out.push(String(h.formes.modele('s10', { x: 196.4, y: 199, ancre: [100, 47], angle: -6, echelle: 0.42, masquer: [[228, 0, 245, 125]],
      bras: { a: [228, 57.6], a0: [210, 58.4], b: [228, 110.8], b0: [210, 108.8], bord: z, fin: 'ouvert' } })));
    // la branche en bout, sous l'avant de la botte
    out.push(h.cercle(br[0], br[1], 9, h.a.hachure('bois')));
    // la botte
    out.push(h.path('M 137,583 Q 135,575 142,572 Q 160,568 184,566 Q 214,562 234,548 L 242,512 L 292,524 L 292,592 ' +
      `Q 293,${G} 282,${G} L 262,${G} L 258,600 L 165,588 Q 146,586 137,583 Z`, blanc(h.a.arete)));
    out.push(h.path('M 141,578 Q 165,583 258,595 L 292,595', h.a.detail));
    // la jambe, qui sort du cadre vers la personne
    const fy = 512 - (z.l - 1 - 238) / 0.38 * 0.925, ry = 524 - (z.l - 1 - 294) / 0.38 * 0.925;
    out.push(h.path(`M 238,510 L ${z.l - 1},${fy} L ${z.l - 1},${ry} L 294,526 Z`, h.a.blanc));
    out.push(h.ligne(238, 510, z.l - 1, fy, h.a.arete));
    out.push(h.ligne(294, 526, z.l - 1, ry, h.a.arete));
    out.push(h.ligne(237, 510, 295, 526, h.a.arete));
    // mouvements : le pied appuie, le bidon bascule
    out.push(h.fleche('M 205,492 L 205,540'));
    out.push(h.fleche(`M ${arc(112)} A 135 135 0 0 1 ${arc(148)}`));
    return out.join('\n');
  };

  // ── Vue de face, au repos ──
  const face = (z) => {
    const G = z.h - 15, P = G - 105 * s, C = 140;
    const Y = y => P + s * y;               // hauteur locale du bidon (cm) → px
    const poleY = P - 60;
    const out = [];
    out.push(h.rect(0, G, z.l, 12, h.a.hachure('terre', 'aucun')));
    out.push(h.ligne(0, G, z.l, G, h.a.arete));
    // perche, de long
    out.push(h.rect(0, poleY - 11, z.l, 22, h.a.hachure('bois', 'aucun')));
    out.push(h.ligne(0, poleY - 11, z.l, poleY - 11, h.a.arete));
    out.push(h.ligne(0, poleY + 11, z.l, poleY + 11, h.a.arete));
    // cordes de suspension : d'un flanc à l'autre à travers le bidon, puis à la perche
    const tg = 104, td = 176, xg = C - 24, xd = C + 24;
    out.push(h.ligne(xg, P, tg, poleY + 11, h.a.arete));
    out.push(h.ligne(xd, P, td, poleY + 11, h.a.arete));
    for (const x of [tg, td]) {
      out.push(h.ligne(x - 3, poleY - 11, x - 4, poleY + 11, h.a.arete));
      out.push(h.ligne(x + 3, poleY - 11, x + 2, poleY + 11, h.a.arete));
    }
    // le bidon
    out.push(h.path(`M ${xg},${Y(-4) + 6} Q ${xg},${Y(-4)} ${xg + 6},${Y(-4)} L ${xd - 6},${Y(-4)} Q ${xd},${Y(-4)} ${xd},${Y(-4) + 6} ` +
      `L ${xd},${Y(23) - 7} Q ${xd},${Y(23)} ${xd - 7},${Y(23)} L ${xg + 7},${Y(23)} Q ${xg},${Y(23)} ${xg},${Y(23) - 7} Z`, blanc(h.a.contour)));
    out.push(h.ligne(xg + 2, P, C - 6.5, P, h.a.cache));
    out.push(h.ligne(C + 6.5, P, xd - 2, P, h.a.cache));
    // goulot, filet visible, bouchon
    out.push(h.path(`M ${C - 8.2},${Y(-4)} L ${C - 8.2},${Y(-5.8)} M ${C + 8.2},${Y(-4)} L ${C + 8.2},${Y(-5.8)}`, h.a.arete));
    out.push(h.path(`M ${C - 8.2},${Y(-4.5)} L ${C + 8.2},${Y(-5)} M ${C - 8.2},${Y(-5.1)} L ${C + 8.2},${Y(-5.6)}`, h.a.detail));
    out.push(h.path(`M ${C - 10.6},${Y(-5.8)} L ${C - 10.6},${Y(-8.9)} Q ${C - 10.6},${Y(-9.3)} ${C - 8.6},${Y(-9.3)} L ${C + 8.6},${Y(-9.3)} ` +
      `Q ${C + 10.6},${Y(-9.3)} ${C + 10.6},${Y(-8.9)} L ${C + 10.6},${Y(-5.8)} Z`, blanc(h.a.arete)));
    out.push(h.path([-6, -2, 2, 6].map(d => `M ${C + d},${Y(-8.9)} L ${C + d},${Y(-6.2)}`).join(' '), h.a.detail));
    // la poignée, à l'avant
    out.push(h.rect(C - 5.8, Y(-1), 11.6, s * 10, blanc(h.a.arete).replace('/>', '') + ' rx="5.8"'));
    // corde de la pédale : nouée à la poignée, jusqu'à la branche
    const bY = G - 19 - 9;                    // la branche pend un peu au-dessus du sol
    out.push(h.ligne(C, Y(4) + 3, C, bY - 8, h.a.arete));
    out.push(h.ligne(C - 8, Y(4) - 3, C + 8, Y(4) - 3, h.a.arete));
    out.push(h.ligne(C - 8, Y(4) + 3, C + 8, Y(4) + 3, h.a.arete));
    // la branche en travers
    out.push(h.path(`M 58,${bY - 9} Q 140,${bY - 10} 222,${bY - 7} L 222,${bY + 7} Q 140,${bY + 10} 58,${bY + 9} Z`, blanc(h.a.arete)));
    out.push(h.ellipse(58, bY, 3.5, 9, h.a.detail));
    out.push(h.path(`M 92,${bY - 9.3} L 87,${bY - 19} Q 90,${bY - 21} 93,${bY - 19} L 98,${bY - 9.5}`, blanc(h.a.arete)));
    out.push(h.path(`M 110,${bY - 2} L 124,${bY - 2.5} M 168,${bY + 3} L 186,${bY + 3.5} M 196,${bY - 3} L 206,${bY - 3.2}`, h.a.detail));
    out.push(h.ligne(C - 3, bY - 10, C - 3, bY + 10, h.a.arete));
    out.push(h.ligne(C + 3, bY - 10, C + 3, bY + 10, h.a.arete));
    // le savon, pendu dans un bas de nylon noué
    out.push(h.ligne(49, poleY - 11, 48, poleY + 11, h.a.arete));
    out.push(h.ligne(55, poleY - 11, 56, poleY + 11, h.a.arete));
    out.push(h.path(`M 48,${poleY + 11} Q 50.5,100 50.5,146 M 56,${poleY + 11} Q 53.5,100 53.5,146`, h.a.detail));
    out.push(h.path('M 49,154 Q 34,158 34,176 L 34,198 Q 34,213 52,213 Q 70,213 70,198 L 70,176 Q 70,158 55,154', h.a.detail));
    out.push(h.rect(38, 163, 28, 44, h.a.arete.replace('/>', '') + ' rx="6"'));
    out.push(h.ellipse(52, 150, 5.5, 4.5, blanc(h.a.arete)));
    return out.join('\n');
  };

  return {
    ref: '30-01',
    titre: 'Le poste de lavage à pédale, monté avec un bidon de lave-glace',
    desc: 'De face, au repos : le bidon de lave-glace pend par une corde qui le traverse haut dans les flancs ; une deuxième corde descend de la poignée à une branche en travers, un peu au-dessus du sol ; le savon pend à côté dans un bas de nylon noué. De côté : le pied appuie la branche au sol, le bidon bascule vers l’avant autour de sa corde et un filet coule du bouchon desserré dans les mains.',
    format: 'pleine',
    disposition: [['face', 'cote']],
    largeurs: [[2, 3]],
    vues: {
      face: {
        titre: 'De face, au repos',
        dessin: face,
        renvois: z => {
          const G = z.h - 15, P = G - 105 * s, bY = G - 28;
          return [
            { n: 1, rond: [88, P + 24], cible: [114.5, P + 1.5], texte: 'trous face à face, près de l’épaule' },
            { n: 2, rond: [206, P - 30], cible: [173, P - 25], texte: 'corde de suspension, goulot vers l’avant' },
            { n: 5, rond: [206, bY - 40], cible: [198, bY - 9.5], texte: 'branche en travers : la pédale' },
            { n: 6, rond: [20, 250], cible: [36, 205], texte: 'savon dans un bas noué' },
          ];
        },
      },
      cote: {
        titre: 'De côté, le pied appuie',
        dessin: cote,
        renvois: z => [
          { n: 3, rond: [254, 76], cible: [199.5, 99.5], texte: 'bouchon dévissé d’un demi-tour' },
          { n: 4, rond: [218, 292], cible: [163, 256], texte: 'deuxième corde nouée à la poignée' },
        ],
      },
    },
  };
};
