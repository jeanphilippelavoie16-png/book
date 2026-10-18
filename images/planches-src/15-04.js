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

  // un cordon : la bande de la bibliothèque de formes ; corde : un trait noir et son âme blanche (comme 15-01)
  const corde = (d, ep = 3.4) => `<path d="${d}" fill="none" stroke="${NOIR}" stroke-width="${ep}" stroke-linecap="round" stroke-linejoin="round"/>\n`
    + `<path d="${d}" fill="none" stroke="#FFFFFF" stroke-width="${(ep - 1.4).toFixed(1)}" stroke-linecap="round" stroke-linejoin="round"/>`;
  const lisse = pts => {
    let d = `M ${P(...pts[0])}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
      d += ` C ${P(p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6)} ${P(p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)} ${P(...p2)}`;
    }
    return d;
  };
  const cordon = (pts, o = {}) => F.cordes([Object.assign({ ep: 3.4, pts, debut: 'coupe', fin: 'coupe' }, o)], { trait: 'arete' });

  // ── vue 1 : un pic en coupe dans l'axe, couché, la pointe à droite ──
  const k1 = 2.1;
  const vCoupe = z => {
    const xL = 196, yc = 40;                    // le bout du cordon, l'axe
    const r = DM / 2 * k1, xR = xL + LM * k1;             // le rayon, le bout du clou
    const rc = DC / 2 * k1, xFond = xR - IC * k1, xPointe = xR + PC * k1, xCone = xR + PC * k1 * 0.5;
    const yt = yc - OFF * k1, rt = DT / 2 * k1, xt = xR - PT * k1;
    const xtr = xL + YT * k1, rtr = DT2 / 2 * k1;
    const o = [];
    // le bois coupé, hachuré, avec ses trois trous en blanc
    o.push(h.rect(xL, yc - r, xR - xL, 2 * r, bois));
    o.push(h.rect(xFond, yc - rc, xR - xFond + 1, 2 * rc, h.a.blanc));
    o.push(h.path(`M ${P(xR + 1, yt - rt)} L ${P(xt + rt * 0.6, yt - rt)} L ${P(xt, yt)} L ${P(xt + rt * 0.6, yt + rt)} L ${P(xR + 1, yt + rt)} Z`, h.a.blanc));
    o.push(h.rect(xtr - rtr, yc - r - 1, 2 * rtr, 2 * r + 2, h.a.blanc));
    o.push(h.rect(xL, yc - r, xR - xL, 2 * r, h.a.contour));
    // les bords des trous
    o.push(h.chemin([[xR, yt - rt], [xt + rt * 0.6, yt - rt], [xt, yt], [xt + rt * 0.6, yt + rt], [xR, yt + rt]], h.a.arete));
    o.push(h.chemin([[xR, yc - rc], [xFond, yc - rc], [xFond, yc + rc], [xR, yc + rc]], h.a.arete));
    o.push(h.ligne(xtr - rtr, yc - r, xtr - rtr, yc + r, h.a.arete), h.ligne(xtr + rtr, yc - r, xtr + rtr, yc + r, h.a.arete));
    // le clou, en noir (coupé) : le bout coupé, carré, au fond du trou ; la pointe d'usine dehors
    o.push(h.path(`M ${P(xFond, yc - rc)} L ${P(xCone, yc - rc)} L ${P(xPointe, yc)} L ${P(xCone, yc + rc)} L ${P(xFond, yc + rc)} Z`, h.a.plein));
    // le cordon : il descend dans le trou en travers, le traverse, et un nœud d'arrêt le retient dessous ; il remonte
    // vers le cou
    o.push(cordon([[xtr - 96, 6], [xtr - 40, 4], [xtr - 6, yc - r - 6], [xtr, yc - r + 4], [xtr, yc + r + 4]], { fin: 'ouvert' }));
    o.push(h.ellipse(xtr, yc + r + 8, 7.4, 6.4, blanc(h.a.arete)));
    o.push(h.path(`M ${P(xtr - 5, yc + r + 4)} Q ${P(xtr + 1, yc + r + 8)} ${P(xtr + 5, yc + r + 13)} M ${P(xtr - 6, yc + r + 9)} Q ${P(xtr - 1, yc + r + 7)} ${P(xtr + 3, yc + r + 3)}`, h.a.detail));
    o.push(cordon([[xtr + 5, yc + r + 13], [xtr + 9, yc + r + 19], [xtr + 17, yc + r + 22]], { debut: 'ouvert', fin: 'libre' }));
    // la cote de longueur, sous le manche
    const yq = yc + r + 26;
    o.push(h.ligne(xL, yc + r + 3, xL, yq + 6, h.a.fin), h.ligne(xR, yc + r + 3, xR, yq + 6, h.a.fin));
    o.push(h.cote(xL, yq, xR, yq, '10 cm (4 po)'));
    return { svg: o.join('\n'), xL, xR, yc, r, rc, xFond, xt, yt, rt, xtr, rtr, xPointe };
  };

  // ── vue 2 : les deux pics emboîtés, chaque pointe dans le second trou de l'autre ; le cordon fait le tour du cou ──
  const k2 = 1.2;
  const vPaire = z => {
    const r = DM / 2 * k2, L = LM * k2, d = OFF * k2;
    const xJ = z.l / 2, ya = z.h - 14 - r - d, yb = ya + d;   // le joint ; l'axe du pic de gauche, celui de droite
    const x0 = xJ - L, x1 = xJ + L;
    const o = [];
    const manche = (xa, xb, y) => [
      h.rect(xa, y + r * 0.35, xb - xa, r * 0.65, h.a.ombre),
      h.rect(xa, y - r, xb - xa, 2 * r, h.a.contour),
      h.ligne(xa, y + r * 0.35, xb, y + r * 0.35, h.a.detail),
    ].join('\n');
    const xtrA = x0 + YT * k2, xtrB = x1 - YT * k2;
    // le cordon, derrière les manches : de chaque trou en travers, il monte et fait le tour du cou
    const top = 8;
    o.push(corde(lisse([[xtrA, ya], [xtrA - 4, ya - r - 8], [x0 + 6, top + 16], [x0 + 60, top + 1], [xJ, top], [x1 - 60, top + 1], [x1 - 6, top + 16], [xtrB + 4, yb - r - 8], [xtrB, yb]])));
    o.push(manche(x0, xJ, ya), manche(xJ, x1, yb));
    o.push(h.ligne(xJ, ya - r, xJ, yb + r, h.a.arete));
    // les clous, cachés : le clou de gauche dans le second trou de droite, et l'inverse
    o.push(h.ligne(xJ - IC * k2, yb, xJ + PC * k2, yb, h.a.cache));
    o.push(h.ligne(xJ + IC * k2, ya, xJ - PC * k2, ya, h.a.cache));
    return { svg: o.join('\n'), xJ, x0, x1, ya, yb, r, top };
  };

  // ── vue 3 : autre façon, le clou planté pointe première, la tête limée en pointe (le bout du manche seul) ──
  const vAutre = z => {
    const yc = z.h / 2 + 2, r = DM / 2 * k1, xR = z.l - 80, xL = xR - 62 * k1;
    const rc = DC / 2 * k1, xFond = xR - IC * k1 * 0.75, rh = 5.5 * k1;
    const xCol = xR + 5, xPointe = xR + PC * k1;
    const o = [];
    o.push(h.ligne(1, 0, 1, z.h, h.a.fin));            // le filet qui sépare l'autre façon
    // le manche, coupé à gauche par une ligne de rupture
    const rupt = [[xL, yc - r], [xL + 5, yc - r * 0.35], [xL - 5, yc + r * 0.35], [xL, yc + r]];
    const contour = [[xR, yc - r], ...rupt, [xR, yc + r]];
    o.push(h.chemin(contour, bois, true));
    o.push(h.path(`M ${P(xR + 1, yc - rc)} L ${P(xFond + 9, yc - rc)} L ${P(xFond, yc)} L ${P(xFond + 9, yc + rc)} L ${P(xR + 1, yc + rc)} Z`, h.a.blanc));
    o.push(h.chemin([[xL, yc - r], [xR, yc - r], [xR, yc + r], [xL, yc + r]], h.a.contour));
    o.push(h.chemin(rupt, h.a.arete));
    // le clou : la pointe d'usine au fond, dans le bois ; dehors, la tige puis la tête limée en cône
    o.push(h.path(`M ${P(xR, yc - rc)} L ${P(xFond + 9, yc - rc)} L ${P(xFond, yc)} L ${P(xFond + 9, yc + rc)} L ${P(xR, yc + rc)} Z`, h.a.plein));
    o.push(h.path(`M ${P(xR - 1, yc - rc)} L ${P(xCol, yc - rc)} L ${P(xCol + 2, yc - rh)} L ${P(xPointe, yc)} L ${P(xCol + 2, yc + rh)} L ${P(xCol, yc + rc)} L ${P(xR - 1, yc + rc)} Z`, h.a.plein));
    return { svg: o.join('\n'), xR, yc, r, rh, xCol, xPointe };
  };

  return {
    ref: '15-04',
    titre: 'Faire des pics à glace',
    desc: 'Un pic en coupe : un bout de manche à balai de 10 cm (4 po), un gros clou dans un trou percé dans l’axe, la tête coupée et le côté coupé au fond du trou, la pointe dehors ; à côté du clou, un second trou moins profond ; à l’autre bout, un trou en travers où le cordon est noué. Les deux pics emboîtés, chaque pointe dans le second trou de l’autre, le cordon qui fait le tour du cou. Autre façon : le clou planté pointe première et sa tête limée en pointe.',
    format: 'demi',
    disposition: [['coupe'], ['paire', 'autre']],
    largeurs: [[1], [1.25, 1]],
    hauteurs: [1.25, 1.1],
    vues: {
      coupe: {
        titre: 'Un pic, en coupe',
        dessin: z => vCoupe(z).svg,
        renvois: z => { const v = vCoupe(z); return [
          { n: 1, rond: [v.xL - 30, v.yc + 20], cible: [v.xL - 1, v.yc + 16], texte: 'couper deux bouts de manche à balai de 10 cm' },
          { n: 2, rond: [v.xFond - 26, 10], cible: [v.xFond + 2, v.yc - 3], texte: 'enfoncer le clou sans sa tête, côté coupé au fond' },
          { n: 3, rond: [v.xR + 26, 10], cible: [v.xR - 12, v.yt], texte: 'percer à côté un second trou, moins profond' },
          { n: 4, rond: [v.xtr - 46, v.yc + v.r + 14], cible: [v.xtr - 7, v.yc + v.r + 8], texte: 'percer l’autre bout en travers, y nouer le cordon' },
        ]; },
      },
      paire: {
        titre: 'Les deux pics emboîtés',
        dessin: z => vPaire(z).svg,
        renvois: z => { const v = vPaire(z); return [
          { n: 5, rond: [v.xJ + 64, v.top + 4], cible: [v.xJ + 30, v.top + 2], texte: 'porter le cordon au cou, par-dessus le manteau' },
        ]; },
      },
      autre: {
        titre: 'Autre façon',
        dessin: z => vAutre(z).svg,
        renvois: z => { const v = vAutre(z); return [
          { n: 6, rond: [v.xPointe - 10, z.h - 11], cible: [v.xCol + 10, v.yc + v.rh * 0.55], texte: 'au lieu de 2 : clou pointe première, tête limée en pointe' },
        ]; },
      },
    },
  };
};
