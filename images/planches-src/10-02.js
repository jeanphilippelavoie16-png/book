// Planche 10-02 — la buse pour puiser un puits tubé quand la pompe est morte.
// Chapitre 13, variante d'urgence « Puiser un puits quand la pompe est morte » :
// tuyau rigide de 1,5 à 2 m, clapet au bas, corde en haut ; clapet = carré de chambre à air
// vissé d'un seul côté au-dessus d'un trou percé dans un bouchon ; tubage de 150 mm ;
// tuyau de 40 mm ; corde enroulée sur un bâton ; tout ce qui descend attaché deux fois.
module.exports = (h) => {
  const BLANC_ARETE = h.a.arete.replace('fill="none"', 'fill="#FFFFFF"');
  const BLANC_CONTOUR = h.a.contour.replace('fill="none"', 'fill="#FFFFFF"');

  // ligne de coupure ondulée, de x1 à x2 à la hauteur y
  const onde = (x1, x2, y, a = 3, pas = 3) => {
    const pts = [];
    for (let x = x1; x <= x2 + 0.01; x += pas) pts.push([x, y + a * Math.sin((x - x1) / 9)]);
    return pts;
  };

  // détail du bas de la buse, en coupe ; ouvert = clapet soulevé (descente)
  const basDeBuse = (z, ouvert) => {
    const L = z.l, H = z.h, cx = L * 0.55, ri = 40, ep = 5;
    const xiL = cx - ri, xiR = cx + ri, xoL = xiL - ep;
    const yP = H * 0.70, yb = yP - 24; // bas du tuyau, dessus du bouchon
    const out = [];
    if (!ouvert) out.push(h.rect(xiL, 12, 2 * ri, yb - 4 - 12, h.a.hachure('eau', 'aucun')));
    // parois du tuyau, coupées
    out.push(h.rect(xoL, 12, ep, yP - 12, h.a.plein));
    out.push(h.rect(xiR, 12, ep, yP - 12, h.a.plein));
    // bouchon percé au centre
    out.push(h.rect(xiL, yb, ri - 10, 24, h.a.hachure('bois')));
    out.push(h.rect(cx + 10, yb, ri - 10, 24, h.a.hachure('bois')));
    // vis, tête et tige
    out.push(h.rect(cx - 25.5, yb - 4, 3, 17, h.a.plein));
    out.push(h.rect(cx - 29, yb - 7, 10, 3, h.a.plein));
    // carré de chambre à air
    if (ouvert) {
      const a = 40 * Math.PI / 180, lg = 30, dx = Math.cos(a), dy = -Math.sin(a);
      const Bx = cx - 12, By = yb;
      const Cx = Bx + dx * lg, Cy = By + dy * lg;
      const nx = -Math.sin(a) * 4, ny = -Math.cos(a) * 4;
      out.push(h.chemin([[cx - 30, yb], [Bx, By], [Cx, Cy], [Cx + nx, Cy + ny], [Bx - 1.5, By - 4], [cx - 30, yb - 4]], h.a.plein, true));
      // l'eau entre par le trou et passe sous le carré
      out.push(h.fleche(`M${cx},${yP + 30} L${cx},${yb + 8} Q${cx},${yb - 4} ${cx + 14},${yb - 6} Q${cx + 28},${yb - 8} ${cx + 28},${yb - 44}`));
      // la buse descend
      out.push(h.fleche(`M${xoL - 20},${24} L${xoL - 20},${84}`));
    } else {
      out.push(h.rect(cx - 30, yb - 4, 48, 4, h.a.plein));
      // la buse remonte
      out.push(h.fleche(`M${xoL - 20},${84} L${xoL - 20},${24}`));
    }
    return { out, cx, xiL, xiR, yP, yb };
  };

  return {
    ref: '10-02',
    titre: 'La buse pour puiser un puits sans pompe',
    desc: 'Un bout de tuyau rigide fermé au bas par un bouchon percé et un clapet de chambre à air, descendu au bout d’une corde dans le tubage d’un puits : le clapet s’ouvre à la descente et se plaque à la remontée.',
    format: 'pleine',
    disposition: [['puits', 'buse'], ['descente', 'remontee', 'dessus']],
    hauteurs: [2, 1],
    largeurs: [[3, 2], [1, 1, 1]],
    vues: {
      puits: {
        titre: 'Dans le puits, en coupe',
        dessin: z => {
          const L = z.l, H = z.h, cx = L * 0.5, ri = 30, ep = 5;
          const xiL = cx - ri, xiR = cx + ri, xoL = xiL - ep, xoR = xiR + ep;
          const yT = Math.max(H * 0.16, 64), yG = yT + 30, pente = 26;
          const yB1 = H * 0.40, yB2 = yB1 + 16;
          const yW = H * 0.63, yF = H - 12;
          const bw = 16, bxL = cx - bw / 2, bT = yW - 50, bB = yF - 36;
          const sol = x => x < cx ? yG + pente * (xoL - x) / xoL : yG + pente * (x - xoR) / (L - xoR);
          const o = [];
          // terre, en haut et en bas de la coupure
          o.push(h.chemin([[0, sol(0)], [xoL, yG], [xoL, yB1], ...onde(0, xoL, yB1).reverse()], h.a.hachure('terre', 'aucun'), true));
          o.push(h.chemin([[xoR, yG], [L, sol(L)], ...onde(xoR, L, yB1).reverse(), [xoR, yB1]], h.a.hachure('terre', 'aucun'), true));
          o.push(h.chemin([...onde(0, xoL, yB2), [xoL, yF], [xoR, yF], ...onde(xoR, L, yB2), [L, H], [0, H]], h.a.hachure('terre', 'aucun'), true));
          // ligne du sol, en pente de part et d'autre du tubage
          o.push(h.chemin([[0, sol(0)], [xoL, yG]], h.a.arete));
          o.push(h.chemin([[xoR, yG], [L, sol(L)]], h.a.arete));
          // lignes de coupure
          o.push(h.chemin(onde(0, L, yB1), h.a.detail));
          o.push(h.chemin(onde(0, L, yB2), h.a.detail));
          // eau dans le tubage
          o.push(h.rect(xiL, yW, 2 * ri, yF - yW, h.a.hachure('eau', 'aucun')));
          o.push(h.ligne(xiL, yW, bxL, yW, h.a.arete));
          o.push(h.ligne(bxL + bw, yW, xiR, yW, h.a.arete));
          o.push(h.ligne(xiL, yF, xiR, yF, h.a.arete));
          // tubage, parois coupées
          o.push(h.rect(xoL, yT, ep, yB1 - yT, h.a.plein));
          o.push(h.rect(xiR, yT, ep, yB1 - yT, h.a.plein));
          o.push(h.rect(xoL, yB2, ep, yF - yB2, h.a.plein));
          o.push(h.rect(xiR, yB2, ep, yF - yB2, h.a.plein));
          // la buse, pleine sous le niveau
          o.push(h.rect(bxL, bT, bw, bB - bT, h.a.blanc));
          o.push(h.rect(bxL + 2, yW, bw - 4, bB - yW - 2, h.a.hachure('eau', 'aucun')));
          o.push(h.ligne(bxL + 2, yW, bxL + bw - 2, yW, h.a.detail));
          o.push(h.rect(bxL, bT, bw, bB - bT, h.a.contour));
          // la corde : bâton, tubage, deux attaches
          o.push(h.ligne(cx, yT, cx, yB1 - 4, h.a.arete));
          o.push(h.ligne(cx, yB2 + 4, cx, bT - 10, h.a.arete));
          o.push(h.chemin([[cx - 4, bT + 5], [cx, bT - 10], [cx + 4, bT + 11]], h.a.arete));
          o.push(h.cercle(cx - 4, bT + 5, 1.6, h.a.plein));
          o.push(h.cercle(cx + 4, bT + 11, 1.6, h.a.plein));
          // bâton posé en travers du tubage, corde enroulée dessus
          const x1 = cx - 80, x2 = cx + 80, y1 = yT - 10;
          o.push(h.path(`M${x1 + 5},${y1} H${x2 - 5} A5,5 0 0 1 ${x2 - 5},${y1 + 10} H${x1 + 5} A5,5 0 0 1 ${x1 + 5},${y1} Z`, BLANC_ARETE));
          for (let i = -2; i <= 2; i++) o.push(h.ligne(cx + i * 5 - 2, y1, cx + i * 5 + 2, y1 + 10, h.a.arete));
          // cote du tubage
          o.push(h.ligne(xiL, yT - 14, xiL, yT - 36, h.a.fin));
          o.push(h.ligne(xiR, yT - 14, xiR, yT - 36, h.a.fin));
          o.push(h.cote(xiL, yT - 30, xiR, yT - 30, '150 mm', { cote: 'dessus' }));
          return o.join('\n');
        },
        renvois: z => {
          const L = z.l, H = z.h, cx = L * 0.5, xoR = cx + 35;
          const yT = Math.max(H * 0.16, 64), yW = H * 0.63;
          return [
            { n: 1, rond: [cx + 112, yT + 16], cible: [xoR, yT + 16], texte: 'tubage qui dépasse du sol' },
            { n: 2, rond: [cx - 112, yT - 34], cible: [cx - 60, yT - 10], texte: 'corde enroulée sur un bâton' },
            { n: 3, rond: [cx + 100, yW + 40], cible: [cx + 8, yW + 40], texte: 'buse plongée sous l’eau' },
          ];
        },
      },
      buse: {
        titre: 'La buse',
        dessin: z => {
          const L = z.l, H = z.h, bx = L * 0.42, xL = bx - 15, xR = bx + 15;
          const yTop = 66, yB1 = H * 0.44, yB2 = yB1 + 16, yBot = H - 48;
          const o = [];
          o.push(h.rect(xL, yTop, 30, yB1 - yTop, h.a.blanc));
          o.push(h.rect(xL, yB2, 30, yBot - yB2, h.a.blanc));
          // parois vues, parois intérieures cachées
          o.push(h.ligne(xL + 3, yTop, xL + 3, yB1, h.a.cache));
          o.push(h.ligne(xR - 3, yTop, xR - 3, yB1, h.a.cache));
          o.push(h.ligne(xL + 3, yB2, xL + 3, yBot - 22, h.a.cache));
          o.push(h.ligne(xR - 3, yB2, xR - 3, yBot - 22, h.a.cache));
          // bouchon, caché dans le bas du tuyau
          o.push(h.ligne(xL, yBot - 22, xR, yBot - 22, h.a.cache));
          o.push(h.chemin([[xL, yB1], [xL, yTop], [xR, yTop], [xR, yB1]], h.a.contour));
          o.push(h.chemin([[xL, yB2], [xL, yBot], [xR, yBot], [xR, yB2]], h.a.contour));
          // coupure
          o.push(h.path(`M${xL},${yB1} C${bx - 6},${yB1 - 9} ${bx + 6},${yB1 + 9} ${xR},${yB1}`, h.a.arete));
          o.push(h.path(`M${xL},${yB2} C${bx - 6},${yB2 - 9} ${bx + 6},${yB2 + 9} ${xR},${yB2}`, h.a.arete));
          // deux trous et la corde
          o.push(h.cercle(bx - 6, yTop + 12, 3, BLANC_ARETE));
          o.push(h.cercle(bx + 6, yTop + 28, 3, BLANC_ARETE));
          o.push(h.ligne(bx, 8, bx, yTop - 26, h.a.arete));
          o.push(h.chemin([[bx - 6, yTop + 12], [bx, yTop - 26], [bx + 6, yTop + 28]], h.a.arete));
          o.push(h.cercle(bx, yTop - 26, 3.2, h.a.plein));
          // cotes
          o.push(h.ligne(xL, yBot + 4, xL, yBot + 26, h.a.fin));
          o.push(h.ligne(xR, yBot + 4, xR, yBot + 26, h.a.fin));
          o.push(h.cote(xL, yBot + 20, xR, yBot + 20, '40 mm', { cote: 'dessous' }));
          o.push(h.ligne(xR + 4, yTop, xR + 32, yTop, h.a.fin));
          o.push(h.ligne(xR + 4, yBot, xR + 32, yBot, h.a.fin));
          o.push(h.cote(xR + 26, yTop, xR + 26, yBot, '1,5 à 2 m', { cote: 'droite' }));
          return o.join('\n');
        },
        renvois: z => {
          const L = z.l, H = z.h, bx = L * 0.42, xL = bx - 15, yTop = 66, yBot = H - 48;
          return [
            { n: 4, rond: [22, yTop - 10], cible: [bx - 9, yTop + 12], texte: 'corde attachée deux fois' },
            { n: 5, rond: [22, H * 0.30], cible: [xL, H * 0.30], texte: 'tuyau rigide' },
            { n: 6, rond: [22, yBot - 11], cible: [xL, yBot - 11], texte: 'clapet au bas du tuyau' },
          ];
        },
      },
      descente: {
        titre: 'Clapet à la descente',
        dessin: z => basDeBuse(z, true).out.join('\n'),
        renvois: z => {
          const { cx, xiL, yP, yb } = basDeBuse(z, true);
          const a = 40 * Math.PI / 180;
          return [
            { n: 7, rond: [z.l - 16, yP + 22], cible: [cx + 24, yP], texte: 'bouchon percé au centre' },
            { n: 8, rond: [z.l - 16, yb - 62], cible: [cx - 12 + Math.cos(a) * 30 - 1, yb - Math.sin(a) * 30 - 4], texte: 'carré de chambre à air' },
            { n: 9, rond: [cx - 24, yb - 58], cible: [cx - 24, yb - 7], texte: 'vissé d’un seul côté' },
          ];
        },
      },
      remontee: {
        titre: 'Clapet à la remontée',
        dessin: z => basDeBuse(z, false).out.join('\n'),
        renvois: z => {
          const { cx, yb } = basDeBuse(z, false);
          return [
            { n: 10, rond: [z.l - 16, yb - 40], cible: [cx + 14, yb - 4], texte: 'carré plaqué par l’eau' },
          ];
        },
      },
      dessus: {
        titre: 'Clapet vu de dessus',
        dessin: z => {
          const cx = z.l / 2, cy = z.h * 0.46;
          const o = [];
          o.push(h.cercle(cx, cy, 46, h.a.plein));
          o.push(h.cercle(cx, cy, 41, h.a.blanc));
          o.push(h.cercle(cx, cy, 41, h.a.hachure('bois', 'aucun')));
          o.push(h.rect(cx - 30, cy - 24, 48, 48, BLANC_ARETE));
          o.push(h.cercle(cx, cy, 10, h.a.cache));
          for (const dy of [-12, 12]) {
            o.push(h.cercle(cx - 24, cy + dy, 3.5, BLANC_ARETE));
            o.push(h.ligne(cx - 26, cy + dy, cx - 22, cy + dy, h.a.detail));
            o.push(h.ligne(cx - 24, cy + dy - 2, cx - 24, cy + dy + 2, h.a.detail));
          }
          return o.join('\n');
        },
        renvois: z => {
          const cx = z.l / 2, cy = z.h * 0.46;
          return [
            { n: 11, rond: [18, cy - 52], cible: [cx - 27.5, cy - 13], texte: 'deux vis sur le même bord' },
            { n: 12, rond: [z.l - 18, cy + 52], cible: [cx + 7, cy + 7], texte: 'trou couvert avec marge' },
          ];
        },
      },
    },
  };
};
