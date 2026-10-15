// Planche 48-10. Le collet posé sur le sentier (chapitre 48, §5 étapes 3 et 4, §9 « L'attache » ;
// chapitre 55, §9 « Le collet », pour la brindille fendue et le renard).
// Le chapitre 48 : poser là où le sentier est étroit et bordé, entre deux troncs ; la boucle laisse passer
// la tête et les épaules sans laisser passer le corps, environ 10 cm de diamètre, pas plus ; son bas
// dégage la neige d'à peu près la hauteur du menton ; trop large, elle glisse sur le corps ; l'attache à
// un tronc vivant de la grosseur du poignet. Le chapitre 55 : la boucle se tient ouverte sur la piste par
// une brindille fendue ; pour le renard, une boucle de 15 à 20 cm, le bas à 15 à 20 cm de la piste, centrée.
// Le lièvre de profil, la tête dans la boucle, a été essayé (calque d'Audubon, 1845) et retiré : un corps qui
// n'est pas net ne s'imprime pas (JP, 15 octobre 2026). Le bas « au menton » est dit par le renvoi.
// Vue de dessus : le sentier tassé, le passage entre deux troncs, la boucle en travers, le fil tenu par la
// brindille et tourné sur le tronc vivant. Dans l'axe du sentier : la neige coupée en travers, la gouttière,
// la boucle ronde et sa cote. Le renard : la même boucle, ses deux cotes. De côté : le lièvre la tête passée,
// Cotes : celles des chapitres seulement (10 cm ; 15 à 20 cm deux fois). La profondeur de la gouttière, la
// largeur du sentier et la hauteur du bas de la boucle ne sont pas chiffrées : proportions de dessin.

module.exports = (h) => {
  const r1 = (v) => Math.round(v * 10) / 10;
  const pf = (p) => `${r1(p[0])} ${r1(p[1])}`;
  const blanc = (a) => a.replace('fill="none"', 'fill="#FFFFFF"');
  const neige = h.a.hachure('neige', 'aucun');
  const lisse = (P, ferme = false) => {
    const n = P.length, g = (i) => (ferme ? P[(i + n) % n] : P[Math.max(0, Math.min(n - 1, i))]);
    let d = `M${pf(P[0])}`;
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      d += ` C${pf([p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6])} ${pf([p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6])} ${pf(p2)}`;
    }
    return d + (ferme ? ' Z' : '');
  };
  // une brindille plantée, fendue en haut : de (x, yBas) à (x, yHaut), le fil pincé dans la fente
  const brindille = (x, yBas, yHaut, e = 3.4) => {
    const o = [];
    const fente = yHaut + 12;
    o.push(h.chemin([[x - e / 2, yBas], [x - e / 2, fente], [x - e / 2 - 1.6, yHaut], [x - 0.3, yHaut + 1], [x - 0.4, fente], [x + 0.4, fente], [x + 0.3, yHaut + 1], [x + e / 2 + 1.6, yHaut], [x + e / 2, fente], [x + e / 2, yBas]], blanc(h.a.arete), true));
    return o.join('\n');
  };
  // des tours de fil sur un tronc vertical de demi-largeur w, à la hauteur y
  const tours = (x, y, w) => [0, 1, 2].map((i) => h.path(`M ${r1(x - w)} ${r1(y + i * 3.2 + 2)} Q ${r1(x)} ${r1(y + i * 3.2 + 4)} ${r1(x + w)} ${r1(y + i * 3.2 - 1)}`, h.a.arete)).join('\n');

  // ─── Vu de dessus ─────────────────────────────────────────────────────────────────────────
  const K1 = 4.4, YC = 70, XP = 300;                    // px par cm ; l'axe du sentier ; le passage
  const demi = (x) => (12.5 - 3 * Math.exp(-Math.pow((x - XP) / 70, 2))) * K1;
  const bords = (z, s) => { const q = []; for (let x = 0; x <= z.l; x += 10) q.push([x, YC + s * (demi(x) + 1.5 * Math.sin(x / 37 + s))]); return q; };
  const SAP = [262, 18], RSAP = 3 * K1, ARB = [308, 136], RARB = 20;
  const plan = (z) => {
    const o = [];
    const haut = bords(z, -1), bas = bords(z, 1);
    o.push(h.path(`${lisse(haut).replace(/^M/, 'M')} L ${z.l} 2 L 0 2 Z`, neige));
    o.push(h.path(`${lisse(bas)} L ${z.l} ${z.h - 2} L 0 ${z.h - 2} Z`, neige));
    o.push(h.path(lisse(haut), h.a.arete), h.path(lisse(bas), h.a.arete));
    // les pistes du lièvre dans le sentier : groupes de quatre, les grands pieds de derrière devant (il va vers la gauche)
    const groupe = (x) => [
      h.ellipse(x, YC - 10, 22, 8, h.a.detail), h.ellipse(x, YC + 10, 22, 8, h.a.detail),
      h.ellipse(x + 50, YC + 3, 10, 7, h.a.detail), h.ellipse(x + 76, YC - 2, 10, 7, h.a.detail),
    ].join('\n');
    o.push(groupe(40), groupe(420));
    // les deux troncs qui bordent le passage : le tronc vivant gros comme le poignet, en haut ; un arbre, en bas
    o.push(h.cercle(ARB[0], ARB[1], RARB, blanc(h.a.contour)), h.cercle(ARB[0], ARB[1], RARB - 5, h.a.fin));
    o.push(h.cercle(SAP[0], SAP[1], RSAP, blanc(h.a.contour)));
    // la boucle, vue de chant, en travers du sentier ; le fil qui monte à la brindille et va au tronc vivant
    const yB0 = YC - 5 * K1, yB1 = YC + 5 * K1;
    o.push(h.ellipse(XP, YC, 2.6, 5 * K1, h.a.contour));
    const br = [XP + 10, YC - demi(XP) - 2];
    o.push(h.chemin([[XP, yB0], [br[0], br[1]], [SAP[0] + RSAP * 0.7, SAP[1] + RSAP * 0.7]], h.a.arete));
    o.push(h.cercle(br[0], br[1], 2.6, blanc(h.a.arete)));
    o.push(h.path(`M ${r1(SAP[0] + RSAP * 0.55)} ${r1(SAP[1] + RSAP * 0.9)} A ${RSAP + 1.5} ${RSAP + 1.5} 0 0 0 ${r1(SAP[0] + RSAP * 0.95)} ${r1(SAP[1] - RSAP * 0.4)}`, h.a.arete));
    return o.join('\n');
  };

  // ─── Dans l'axe du sentier : la neige coupée en travers ───────────────────────────────────
  const K2 = 6.4;
  const geo2 = (z) => {
    const c = 150, yS = 78, yT = yS + 9 * K2, w = 12.5 * K2, R = 5 * K2;
    const yC = yT - 6.5 * K2 - R;                          // le centre de la boucle
    return { c, yS, yT, w, R, yC, xBr: c + w + 4, xSap: 286, rSap: 3 * K2 };
  };
  const face = (z) => {
    const o = [];
    const { c, yS, yT, w, R, yC, xBr, xSap, rSap } = geo2(z);
    const coupe = [[0, yS], [c - w - 18, yS], [c - w - 6, yS + 8], [c - w, yT - 10], [c - w + 10, yT], [c + w - 10, yT], [c + w, yT - 10], [c + w + 6, yS + 8], [c + w + 18, yS], [z.l, yS]];
    o.push(h.path(`${lisse(coupe)} L ${z.l} ${z.h - 2} L 0 ${z.h - 2} Z`, neige));
    o.push(h.path(lisse(coupe), h.a.contour));
    // le tronc vivant, sur le bord du sentier, qui sort par le haut
    o.push(h.rect(xSap - rSap, 2, 2 * rSap, yS - 2, blanc(h.a.contour)));
    o.push(h.rect(xSap + rSap * 0.3, 3.2, rSap * 0.7 - 1.2, yS - 4.4, h.a.ombre));
    o.push(h.ligne(xSap - rSap, 2, xSap - rSap, yS, h.a.contour), h.ligne(xSap + rSap, 2, xSap + rSap, yS, h.a.contour));
    // la brindille, plantée au bord du sentier, fendue en haut
    const yF = yC - R - 4;
    o.push(brindille(xBr, yS + 2, yF - 10));
    // le fil : du tronc (tours) à la fente de la brindille, puis à l'œillet en haut de la boucle
    o.push(h.chemin([[c, yC - R], [c + 10, yF], [xBr, yF], [xSap - rSap, yF + 2]], h.a.arete));
    o.push(tours(xSap, yF - 2, rSap));
    // la boucle, ronde, et son œillet
    o.push(h.cercle(c, yC, R, h.a.contour));
    o.push(h.cercle(c, yC - R, 3, blanc(h.a.arete)));
    // la cote : environ 10 cm
    o.push(h.ligne(c - R - 4, yC - R, c - R - 26, yC - R, h.a.fin), h.ligne(c - R - 4, yC + R, c - R - 26, yC + R, h.a.fin));
    o.push(h.cote(c - R - 22, yC - R, c - R - 22, yC + R, 'environ 10 cm', { cote: 'gauche' }));
    return o.join('\n');
  };

  // ─── Pour le renard : la même boucle, plus grande et plus haute ──────────────────────────
  const renard = (z) => {
    const o = [];
    const K = 2.4, c = 150, yS = z.h - 34, R = 8.75 * K, yC = yS - 17.5 * K - R;
    o.push(h.rect(0, yS, z.l, z.h - 2 - yS, neige), h.ligne(0, yS, z.l, yS, h.a.contour));
    const xBr = c + R + 18;
    o.push(brindille(xBr, yS, yC - R - 16));
    o.push(h.chemin([[c, yC - R], [c + 10, yC - R - 6], [xBr, yC - R - 6], [z.l - 4, yC - R - 8]], h.a.arete));
    o.push(h.cercle(c, yC, R, h.a.contour), h.cercle(c, yC - R, 2.6, blanc(h.a.arete)));
    const xc = c - R - 20;
    o.push(h.ligne(c - R - 4, yC - R, xc - 4, yC - R, h.a.fin), h.ligne(c - 4, yC + R, xc - 4, yC + R, h.a.fin));
    o.push(h.cote(xc, yC - R, xc, yC + R, '15 à 20 cm', { cote: 'gauche' }));
    o.push(h.cote(xc, yC + R, xc, yS, '15 à 20 cm', { cote: 'gauche' }));
    return o.join('\n');
  };

  return {
    ref: '48-10',
    titre: 'Le collet posé sur le sentier',
    desc: 'En haut, vu de dessus : un sentier de lièvre tassé dans la neige profonde, avec deux groupes d’empreintes ; au passage le plus étroit, entre un arbre et un tronc vivant gros comme le poignet, la boucle vue de chant en travers du sentier ; son fil passe dans une brindille plantée au bord et va se tourner sur le tronc vivant. Au milieu à gauche, dans l’axe du sentier : la neige coupée en travers, la gouttière du sentier, la boucle ronde d’environ 10 cm qui pend au fil, l’œillet en haut, la brindille fendue qui pince le fil, le tronc vivant où le fil est tourné ; le bas de la boucle est au-dessus du fond de la gouttière. À droite, pour le renard : une boucle de 15 à 20 cm, le bas à 15 à 20 cm de la piste.',
    format: 'pleine',
    disposition: [['plan'], ['face', 'renard']],
    hauteurs: [2.2, 3],
    largeurs: [[1], [1.3, 1]],
    vues: {
      plan: {
        titre: 'Vu de dessus',
        dessin: plan,
        renvois: (z) => [
          { n: 1, rond: [560, YC + 30], cible: [536, YC + 12], texte: 'sentier tassé, en gouttière' },
          { n: 2, rond: [360, z.h - 12], cible: [ARB[0] + RARB * 0.8, ARB[1] - RARB * 0.4], texte: 'passage étroit entre deux troncs' },
          { n: 3, rond: [200, 18], cible: [SAP[0] - RSAP, SAP[1] + 2], texte: 'fil tourné sur un tronc vivant' },
          { n: 4, rond: [356, YC + 4], cible: [XP + 3, YC + 6], texte: 'la boucle, en travers du sentier' },
        ],
      },
      face: {
        titre: 'Dans l’axe du sentier',
        dessin: face,
        renvois: (z) => {
          const { c, yC, R, xBr, yT } = geo2(z);
          return [
            { n: 5, rond: [xBr - 26, yC - R - 4], cible: [xBr - 2, yC - R - 12], texte: 'brindille fendue qui pince le fil' },
            { n: 6, rond: [c + R + 30, yC + R + 12], cible: [c + 3, yC + R + 1], texte: 'le bas à hauteur du menton' },
          ];
        },
      },
      renard: { titre: 'Pour le renard', dessin: renard },
    },
  };
};
