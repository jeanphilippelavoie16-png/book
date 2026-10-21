// Planche 10-02. La buse pour puiser un puits tubé quand la pompe est morte.
// Le texte : ch. 10, variante d'urgence, « Puiser un puits quand la pompe est morte » : tuyau rigide de 1,5 à 2 m,
// clapet au bas, corde en haut ; le clapet est un carré de chambre à air vissé d'un seul côté au-dessus d'un trou
// percé dans un bouchon ; il s'ouvre à la descente et se plaque à la remontée ; tuyau de 40 mm ; la corde s'enroule
// sur un bâton, hors du sol ; tout ce qui descend est attaché deux fois.
//
// Refaite le 18 octobre 2026 : les deux flèches rouges n'avaient pas de repère (règle 11), la légende suivait l'ordre
// des vues et nommait des pièces au lieu des gestes, et la cote de 150 mm cotait le tubage, qu'on ne construit pas
// (règle 4). Les repères suivent maintenant le texte : faire le clapet (1, 2), le poser au bas du tuyau (3), descendre
// (4) et remonter (5), enrouler la corde sur un bâton (6), tout attacher deux fois (7).
// Aucune main : la buse pend à sa corde ; le geste est porté par les flèches et la légende.
//
// La charte : le dedans du tubage, au-dessus de l'eau, vu par la coupe, en gris loin ; la face de droite de la buse
// à l'ombre. Le rouge : descendre et remonter la buse (une flèche par vue, chacune avec son repère) ; la corde
// attachée deux fois, cerclée. La flèche de l'eau qui entre reste noire.
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
      out.push(h.geste(`M${xoL - 20},${24} L${xoL - 20},${84}`));
    } else {
      out.push(h.rect(cx - 30, yb - 4, 48, 4, h.a.plein));
      // la buse remonte
      out.push(h.geste(`M${xoL - 20},${84} L${xoL - 20},${24}`));
    }
    return { out, cx, xiL, xiR, yP, yb };
  };

  return {
    ref: '10-02',
    titre: 'La buse pour puiser un puits sans pompe',
    desc: 'Un bout de tuyau rigide fermé au bas par un bouchon percé et un clapet de chambre à air, descendu au bout d’une corde dans le tubage d’un puits : le clapet s’ouvre à la descente et se plaque à la remontée.',
    format: 'pleine',
    disposition: [['dessus', 'descente', 'remontee'], ['puits', 'buse']],
    hauteurs: [1, 2],
    largeurs: [[1, 1, 1], [3, 2]],
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
          // le dedans du tubage, au-dessus de l'eau
          o.push(h.rect(xiL, yT, 2 * ri, yB1 - yT, h.a.loin));
          o.push(h.rect(xiL, yB2, 2 * ri, yW - yB2, h.a.loin));
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
          return o.join('\n');
        },
        renvois: z => {
          const L = z.l, H = z.h, cx = L * 0.5, xoR = cx + 35;
          const yT = Math.max(H * 0.16, 64), yW = H * 0.63;
          return [
            { n: 6, rond: [cx - 112, yT - 40], cible: [cx - 60, yT - 10], texte: 'enrouler la corde sur un bâton' },
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
          // la face de droite, à l'ombre, arrêtée sur la coupure
          const coupure = y0 => {
            const p = [];
            for (let i = 0; i <= 40; i++) {
              const t = i / 40, u = 1 - t;
              const x = u * u * u * xL + 3 * u * u * t * (bx - 6) + 3 * u * t * t * (bx + 6) + t * t * t * xR;
              const y = u * u * u * y0 + 3 * u * u * t * (y0 - 9) + 3 * u * t * t * (y0 + 9) + t * t * t * y0;
              if (x >= xR - 8) p.push([x, y]);
            }
            return p;
          };
          const c1 = coupure(yB1), c2 = coupure(yB2);
          o.push(h.chemin([[xR - 8, yTop], [xR, yTop], ...c1.slice().reverse()], h.a.ombre, true));
          o.push(h.chemin([...c2, [xR, yBot], [xR - 8, yBot]], h.a.ombre, true));
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
          // attachée deux fois : ce qui tombe au fond y reste
          o.push(h.controle(bx, yTop + 20, 16));
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
            { n: 7, rond: [22, yTop + 20], cible: [bx - 16.5, yTop + 20], texte: 'attacher la corde dans deux trous' },
          ];
        },
      },
      descente: {
        titre: 'À la descente',
        dessin: z => basDeBuse(z, true).out.join('\n'),
        renvois: z => {
          const { cx, xiL, yP, yb } = basDeBuse(z, true);
          const a = 40 * Math.PI / 180;
          return [
            { n: 3, rond: [z.l - 16, yP + 22], cible: [cx + 24, yP], texte: 'enfoncer le bouchon au bas du tuyau' },
            { n: 4, rond: [xiL - 25 - 22, 54], cible: [xiL - 25 - 2, 54], texte: 'descendre : le carré se soulève' },
          ];
        },
      },
      remontee: {
        titre: 'À la remontée',
        dessin: z => basDeBuse(z, false).out.join('\n'),
        renvois: z => {
          const { xiL } = basDeBuse(z, false);
          return [
            { n: 5, rond: [xiL - 25 - 22, 54], cible: [xiL - 25 - 2, 54], texte: 'remonter : l’eau plaque le carré' },
          ];
        },
      },
      dessus: {
        titre: 'Le clapet vu de dessus',
        dessin: z => {
          const cx = z.l / 2, cy = z.h * 0.48, k = 1.3;
          const o = [];
          o.push(h.cercle(cx, cy, 46 * k, h.a.plein));
          o.push(h.cercle(cx, cy, 41 * k, h.a.blanc));
          o.push(h.cercle(cx, cy, 41 * k, h.a.hachure('bois', 'aucun')));
          o.push(h.rect(cx - 30 * k, cy - 24 * k, 48 * k, 48 * k, BLANC_ARETE));
          o.push(h.cercle(cx, cy, 10 * k, h.a.cache));
          for (const dy of [-12 * k, 12 * k]) {
            o.push(h.cercle(cx - 24 * k, cy + dy, 3.5 * k, BLANC_ARETE));
            o.push(h.ligne(cx - 24 * k - 2.5, cy + dy, cx - 24 * k + 2.5, cy + dy, h.a.detail));
            o.push(h.ligne(cx - 24 * k, cy + dy - 2.5, cx - 24 * k, cy + dy + 2.5, h.a.detail));
          }
          return o.join('\n');
        },
        renvois: z => {
          const cx = z.l / 2, cy = z.h * 0.48, k = 1.3;
          return [
            { n: 1, rond: [z.l - 16, cy + 70], cible: [cx + 7 * k, cy + 7 * k], texte: 'percer un trou au centre du bouchon' },
            { n: 2, rond: [16, cy - 70], cible: [cx - 24 * k - 3, cy - 12 * k - 3.5 * k], texte: 'visser le carré d’un seul côté' },
          ];
        },
      },
    },
  };
};
