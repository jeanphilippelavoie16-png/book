// Planche 15-04. Faire des pics à glace (chapitre 15, section 8, « Faire des pics à glace »). Planche neuve,
// 18 octobre 2026. Objets seuls, sans main.
//
// À gauche, un pic en coupe dans l'axe : le bout de manche à balai de 10 cm, le gros clou dans le trou percé dans
// l'axe, la tête coupée et le côté coupé au fond du trou ; à côté, le second trou, moins profond, qui recevra la
// pointe de l'autre pic ; à l'autre bout, le trou en travers et le cordon noué. Au milieu, les deux pics emboîtés,
// chaque pointe dans le second trou de l'autre, le cordon qui fait le tour du cou. À droite, après un filet, l'autre
// façon (règle 10) : le clou planté pointe première, la tête limée en pointe.
//
// Ce que dit le texte (copie de travail, chapitre 15, section 8) : « Couper deux bouts de manche à balai de 10 cm
// (4 po) » ; « Percer un bout de chaque manche dans l'axe, le plus profond possible, et y enfoncer un gros clou : la
// tête coupée à la scie à métaux, côté coupé au fond du trou, et la pointe du clou dehors ; ou le clou planté pointe
// première et sa tête limée en pointe » ; « Percer à côté du clou un second trou, moins profond, qui reçoit la pointe
// de l'autre pic : emboîtés, les deux pics se couvrent la pointe » ; « Percer l'autre bout de chaque manche en travers
// et y nouer un cordon solide, un pic à chaque bout » ; « Passer le cordon autour du cou, assez court pour que la
// paire pende au milieu de la poitrine, par-dessus le manteau ».
// Sources : sources/20-wisconsin-dnr-pics-a-glace.md (4 po, bois qui flotte, clou pointe première et tête limée,
// second trou, cordon à l'autre bout) ; sources/20-lakeice-pics-a-glace.md (tête coupée, clou « aussi long qu'on peut
// percer », cordon au cou). La seule cote est les 10 cm (4 po) du texte ; le diamètre du manche, la longueur du clou
// et de sa pointe ne sont pas donnés : ils sont dessinés à vue, sans cote.
module.exports = (h) => {
  const F = h.formes, NOIR = '#1A1A1A';
  const P = (x, y) => `${x.toFixed(1)} ${y.toFixed(1)}`;
  const blanc = a => a.replace('fill="none"', 'fill="#FFFFFF"');
  const bois = h.a.hachure('bois', 'aucun');

  // les mesures à vue, en mm (seule la longueur du manche est une cote du texte)
  const LM = 100, DM = 26, DC = 5, PC = 26, IC = 62, DT = 6, PT = 32, OFF = 8, YT = 12, DT2 = 5;
  // LM manche, DM son diamètre, DC le clou, PC sa pointe dehors, IC sa partie dans le bois (le trou), DT et PT le
  // second trou, OFF son écart à l'axe, YT le trou du cordon depuis le haut, DT2 son diamètre

  // un cordon : la bande de la bibliothèque de formes
  const cordon = (pts, o = {}) => F.cordes([Object.assign({ ep: 3.4, pts, debut: 'coupe', fin: 'coupe' }, o)], { trait: 'arete' });

  // ── vue 1 : un pic en coupe dans l'axe, la pointe en bas ──
  const k1 = 1.45;
  const vCoupe = z => {
    const cx = 64, y0 = 34;                               // l'axe, le haut du manche
    const r = DM / 2 * k1, y1 = y0 + LM * k1;             // le rayon, le bas du manche
    const rc = DC / 2 * k1, yFond = y1 - IC * k1, yPointe = y1 + PC * k1;
    const xt = cx + OFF * k1, rt = DT / 2 * k1, yt = y1 - PT * k1;
    const ytr = y0 + YT * k1, rtr = DT2 / 2 * k1;
    const o = [];
    // le bois coupé, hachuré, avec ses trois trous en blanc
    o.push(h.rect(cx - r, y0, 2 * r, y1 - y0, bois));
    o.push(h.rect(cx - rc, yFond, 2 * rc, y1 - yFond + 1, h.a.blanc));
    o.push(h.rect(xt - rt, yt, 2 * rt, y1 - yt + 1, h.a.blanc));
    o.push(h.rect(cx - r - 1, ytr - rtr, 2 * r + 2, 2 * rtr, h.a.blanc));
    o.push(h.rect(cx - r, y0, 2 * r, y1 - y0, h.a.contour));
    // les bords des trous
    o.push(h.chemin([[cx - rc, y1], [cx - rc, yFond], [cx + rc, yFond], [cx + rc, y1]], h.a.arete));
    o.push(h.chemin([[xt - rt, y1], [xt - rt, yt + rt * 0.6], [xt, yt], [xt + rt, yt + rt * 0.6], [xt + rt, y1]], h.a.arete));
    o.push(h.ligne(cx - r, ytr - rtr, cx + r, ytr - rtr, h.a.arete), h.ligne(cx - r, ytr + rtr, cx + r, ytr + rtr, h.a.arete));
    // le clou : coupé, en noir ; le bout coupé, carré, au fond du trou ; la pointe dehors
    o.push(h.path(`M ${P(cx - rc, yFond)} L ${P(cx + rc, yFond)} L ${P(cx + rc, y1 + PC * k1 * 0.55)} L ${P(cx, yPointe)} L ${P(cx - rc, y1 + PC * k1 * 0.55)} Z`, h.a.plein));
    // le cordon : il entre dans le trou en travers par la gauche, ressort à droite, noué au bout ; il monte vers le cou
    o.push(cordon([[cx - r - 10, y0 - 34], [cx - r - 8, ytr - 6], [cx - r + 2, ytr], [cx, ytr], [cx + r + 2, ytr], [cx + r + 5, ytr + 1]], { fin: 'ouvert' }));
    // le nœud d'arrêt, plus gros que le trou
    o.push(h.ellipse(cx + r + 7, ytr + 1, 4.6, 5.2, blanc(h.a.arete)));
    o.push(h.path(`M ${P(cx + r + 4, ytr - 2)} Q ${P(cx + r + 8, ytr + 1)} ${P(cx + r + 5, ytr + 5)}`, h.a.detail));
    o.push(cordon([[cx + r + 10, ytr + 3], [cx + r + 13, ytr + 9], [cx + r + 12, ytr + 15]], { debut: 'ouvert', fin: 'libre' }));
    // la cote de longueur
    const xc = cx - r - 26;
    o.push(h.ligne(cx - r - 4, y0, xc - 6, y0, h.a.fin), h.ligne(cx - r - 4, y1, xc - 6, y1, h.a.fin));
    o.push(h.cote(xc, y0, xc, y1, '10 cm (4 po)', { cote: 'gauche' }));
    // le clou seul, à côté : la tête coupée à la scie à métaux
    const xn = cx + r + 52, yn0 = y0 + 18, Ln = (IC + PC) * k1, rh = 5.5 * k1;
    o.push(h.path(`M ${P(xn - rc, yn0)} L ${P(xn + rc, yn0)} L ${P(xn + rc, yn0 + Ln - PC * k1 * 0.45)} L ${P(xn, yn0 + Ln)} L ${P(xn - rc, yn0 + Ln - PC * k1 * 0.45)} Z`, blanc(h.a.arete)));
    // la tête, détachée, un peu au-dessus, et la tranche du clou
    o.push(h.path(`M ${P(xn - rh, yn0 - 11)} L ${P(xn + rh, yn0 - 11)} L ${P(xn + rc, yn0 - 8)} L ${P(xn + rc, yn0 - 5)} L ${P(xn - rc, yn0 - 5)} L ${P(xn - rc, yn0 - 8)} Z`, blanc(h.a.arete)));
    o.push(h.ligne(xn - 10, yn0 - 2.5, xn + 10, yn0 - 2.5, h.a.cache));
    return { svg: o.join('\n'), cx, r, y0, y1, yFond, xt, rt, yt, ytr, rc, yPointe, xn, yn0 };
  };

  // ── vue 2 : les deux pics emboîtés, au cou ──
  const k2 = 0.92;
  const vPaire = z => {
    const cx = z.l / 2 - 6, r = DM / 2 * k2, d = OFF * k2, L = LM * k2;
    const yJ = z.h - 14 - L;                              // le joint entre les deux manches
    const xa = cx - d / 2, xb = cx + d / 2;                // l'axe du pic du haut, celui du bas
    const ya0 = yJ - L, yb1 = yJ + L, e = r * 0.32;
    const o = [];
    const manche = (xm, ya, yb, hautVisible) => [
      h.rect(xm + r * 0.45, ya, r * 0.55, yb - ya, h.a.ombre),
      h.rect(xm - r, ya, 2 * r, yb - ya, h.a.contour),
      h.ligne(xm + r * 0.45, ya, xm + r * 0.45, yb, h.a.detail),
    ].join('\n');
    // les clous cachés : chacun dans le second trou de l'autre
    const ytr = ya0 + YT * k2, ytrB = yb1 - YT * k2;
    // le cordon : du trou du haut et du trou du bas, il fait le tour du cou (la boucle sort du haut de la vue)
    const xg = xa - r - 2, xd = xb + r + 2;
    o.push(cordon([[xa - r + 4, ytr], [xg - 6, ytr - 4], [xg - 26, ya0 - 30], [xg - 22, -6]]));
    o.push(cordon([[xb + r - 4, ytrB], [xd + 6, ytrB - 4], [xd + 14, yJ], [xd + 22, ya0 - 10], [xd + 18, -6]]));
    o.push(manche(xa, ya0, yJ), manche(xb, yJ, yb1));
    o.push(h.ligne(xa - r, yJ, xb + r, yJ, h.a.arete));
    o.push(h.ligne(xa, yJ - IC * k2 * 0.6, xa, yJ + PC * k2, h.a.cache));
    o.push(h.ligne(xb, yJ + IC * k2 * 0.6, xb, yJ - PC * k2, h.a.cache));
    // les bouts du cordon qui traversent : le trou en travers, vu de côté
    o.push(h.ellipse(xa, ytr, 2.2, 2.2, h.a.plein), h.ellipse(xb, ytrB, 2.2, 2.2, h.a.plein));
    return { svg: o.join('\n'), cx, xa, xb, r, yJ, ya0, yb1, xg, xd };
  };

  // ── vue 3 : autre façon, le clou planté pointe première, la tête limée en pointe ──
  const vAutre = z => {
    const cx = z.l / 2 + 4, y0 = 34, r = DM / 2 * k1, y1 = y0 + LM * k1;
    const rc = DC / 2 * k1, yFond = y1 - IC * k1, rh = 5.5 * k1;
    const yCol = y1 + 8, yPointe = y1 + PC * k1;
    const o = [];
    o.push(h.ligne(-11, 0, -11, z.h, h.a.fin));            // le filet qui sépare l'autre façon
    o.push(h.rect(cx - r, y0, 2 * r, y1 - y0, bois));
    o.push(h.path(`M ${P(cx - rc, y1 + 1)} L ${P(cx - rc, yFond + 7)} L ${P(cx, yFond)} L ${P(cx + rc, yFond + 7)} L ${P(cx + rc, y1 + 1)} Z`, h.a.blanc));
    o.push(h.rect(cx - r, y0, 2 * r, y1 - y0, h.a.contour));
    // le clou, la pointe d'usine au fond, dans le bois ; dehors, la tige puis la tête limée en cône
    o.push(h.path(`M ${P(cx - rc, y1)} L ${P(cx - rc, yFond + 7)} L ${P(cx, yFond)} L ${P(cx + rc, yFond + 7)} L ${P(cx + rc, y1)} L ${P(cx + rc, yCol)} L ${P(cx + rh, yCol + 2)} L ${P(cx, yPointe)} L ${P(cx - rh, yCol + 2)} L ${P(cx - rc, yCol)} Z`, h.a.plein));
    return { svg: o.join('\n'), cx, r, y0, y1, yCol, yPointe, rh };
  };

  return {
    ref: '15-04',
    titre: 'Faire des pics à glace',
    desc: 'Un pic en coupe : un bout de manche à balai de 10 cm (4 po), un gros clou dans un trou percé dans l’axe, la tête coupée à la scie à métaux et le côté coupé au fond du trou, la pointe dehors ; à côté du clou, un second trou moins profond ; à l’autre bout, un trou en travers où le cordon est noué. Les deux pics emboîtés, chaque pointe dans le second trou de l’autre, le cordon autour du cou. Autre façon : le clou planté pointe première et sa tête limée en pointe.',
    format: 'demi',
    disposition: [['coupe', 'paire', 'autre']],
    largeurs: [[1.35, 1, 0.75]],
    vues: {
      coupe: {
        titre: 'Un pic, en coupe',
        dessin: z => vCoupe(z).svg,
        renvois: z => { const v = vCoupe(z); return [
          { n: 1, rond: [v.cx - v.r - 26, v.y0 - 22], cible: [v.cx - v.r + 2, v.y0 + 2], texte: 'couper deux bouts de manche à balai de 10 cm' },
          { n: 2, rond: [v.cx - v.r - 26, v.yFond + 30], cible: [v.cx - v.rc, v.yFond + 1], texte: 'enfoncer le clou étêté, le côté coupé au fond' },
          { n: 3, rond: [v.xt + v.r + 30, v.yt + 6], cible: [v.xt + v.rt, v.yt + 6], texte: 'percer à côté un second trou, moins profond' },
          { n: 4, rond: [v.cx + v.r + 36, v.ytr - 22], cible: [v.cx + v.r + 9, v.ytr - 2], texte: 'percer l’autre bout en travers, y nouer le cordon' },
        ]; },
      },
      paire: {
        titre: 'Les deux pics emboîtés',
        dessin: z => vPaire(z).svg,
        renvois: z => { const v = vPaire(z); return [
          { n: 5, rond: [v.xd + 44, 26], cible: [v.xd + 21, 22], texte: 'porter le cordon au cou, par-dessus le manteau' },
        ]; },
      },
      autre: {
        titre: 'Autre façon',
        dessin: z => vAutre(z).svg,
        renvois: z => { const v = vAutre(z); return [
          { n: 6, rond: [v.cx + v.r + 22, v.y1 - 14], cible: [v.cx + v.rh, v.yCol + 6], texte: 'au lieu de 2 : clou pointe première, tête limée en pointe' },
        ]; },
      },
    },
  };
};
