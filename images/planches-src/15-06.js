// Planche 15-06 (petite planche, une colonne). Le ski cassé, réparé sur le chemin.
// Le texte : ch. 15, section 9, « Réparer sur le chemin », ligne « Ski ou patin cassé » : « Une éclisse de plat
// d'acier (un montant de sommier fait très bien) boulonnée de part en part. À défaut, une perche verte ligaturée sous
// le ski le porte jusqu'à la rive. »
//
// Deux vignettes au même cadrage, le ski de motoneige vu de côté, la spatule à droite, la cassure en avant de la
// selle où s'attache la jambe de direction :
//   1. le plat d'acier centré sur la cassure, boulonné de part en part de chaque côté (les tiges dans le ski en tireté,
//      les écrous dessous) ;
//   2. « Sans plat d'acier », au lieu de 1 et 2 : une perche verte couchée sous le ski, ligaturée de chaque côté de la
//      cassure.
// Aucune cote, aucun chiffre : le texte n'en donne pas (geste sans source écrite, gardé : suivi/15-redaction.md,
// « Gestes sans source écrite et sans chiffre, gardés », « les réparations de chemin (câble, conduite, cuir, savon,
// éclisse) »). Le nombre de boulons et de ligatures est celui du dessin, pas une consigne.
// Aucune main : la réparation se montre par la pièce posée ; les gestes sont dans la légende.

module.exports = (h) => {
  const A = h.a, F = h.formes;
  const f = v => Math.round(v * 10) / 10;
  const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');

  // ── le ski, vu de côté : le dessous plat, la spatule relevée à droite, la boucle de la spatule, la selle et la jambe ──
  // y0 : le dessous du ski sous la partie plate ; E : l'épaisseur ; xC : la cassure.
  const geo = z => {
    const E = 13, y0 = Math.round(z.h * 0.66);
    const xa = -20, xs = z.l * 0.7, xt = z.l - 6, yt = y0 - 40;  // l'arrière (hors de la vue), le début de la spatule, la pointe
    const xSel = z.l * 0.13, lSel = 40;                         // la selle
    const xC = z.l * 0.45;                                      // la cassure
    return { E, y0, xa, xs, xt, yt, xSel, lSel, xC };
  };

  // le contour du ski, du talon à la pointe, en deux morceaux de part et d'autre de la cassure
  const ski = (z, g) => {
    const out = [];
    const { E, y0, xa, xs, xt, yt, xC } = g;
    // la cassure : un trait cassé à travers l'épaisseur, les deux bords légèrement écartés
    const fente = (dx) => [[xC + dx, y0 - E], [xC - 2 + dx, y0 - E * 0.62], [xC + 2.5 + dx, y0 - E * 0.3], [xC + dx, y0]];
    const arriere = [[xa, y0 - E], ...fente(-0.8), [xa, y0]];
    // l'avant : de la cassure à la pointe, le dessus et le dessous suivent la courbe de la spatule
    const T = [xt - 9, yt - 9], B = [xt - 3, yt + 2];
    const avant = `M ${f(xC + 0.8)} ${f(y0 - E)} L ${f(xs)} ${f(y0 - E)} C ${f(xs + 30)} ${f(y0 - E)} ${f(xt - 26)} ${f(T[1] + 8)} ${f(T[0])} ${f(T[1])} `
      + `A 6.6 6.6 0 0 1 ${f(B[0])} ${f(B[1])} C ${f(xt - 22)} ${f(B[1] + 12)} ${f(xs + 34)} ${f(y0)} ${f(xs)} ${f(y0)} L ${f(xC + 0.8)} ${f(y0)} `
      + fente(0.8).reverse().map(p => `L ${f(p[0])} ${f(p[1])}`).join(' ') + ' Z';
    // la boucle de la spatule : un tube (trait noir épais, cœur blanc) qui part du dessus du ski et revient près du nez
    const boucle = `M ${f(xs + 16)} ${f(y0 - E + 4)} C ${f(xs + 20)} ${f(y0 - E - 22)} ${f(xt - 34)} ${f(yt - 26)} ${f(xt - 15)} ${f(yt - 2)}`;
    out.push(h.path(boucle, 'fill="none" stroke="#1A1A1A" stroke-width="5.6" stroke-linecap="butt"'));
    out.push(h.path(boucle, 'fill="none" stroke="#FFFFFF" stroke-width="2.8" stroke-linecap="butt"'));
    out.push(h.chemin(arriere, blanc(A.contour), true));
    out.push(h.path(avant, blanc(A.contour)));
    // le talon arrondi
    out.push(h.path(`M ${f(xa)} ${f(y0 - E)} Q ${f(xa - 5)} ${f(y0 - E / 2)} ${f(xa)} ${f(y0)}`, A.contour));
    // la selle et la jambe de direction, coupée par le haut de la vue
    const { xSel, lSel } = g;
    out.push(h.rect(xSel - 9, 0, 18, y0 - E - 15, blanc(A.arete)));
    out.push(h.rect(xSel + 3, 0, 6, y0 - E - 15, A.ombre));
    out.push(h.rect(xSel - 9, 0, 18, y0 - E - 15, A.arete));
    out.push(h.rect(xSel - lSel / 2, y0 - E - 15, lSel, 15, blanc(A.arete)));
    out.push(h.cercle(xSel, y0 - E - 7.5, 3.4, A.arete));
    // le sol (la neige), un trait sous le ski
    out.push(h.ligne(0, y0 + 0.5, z.l, y0 + 0.5, A.fin));
    return out.join('\n');
  };

  const coupe = (id, z, svg) => `<clipPath id="vue-1506-${id}"><rect x="0" y="0" width="${z.l}" height="${z.h}"/></clipPath>\n<g clip-path="url(#vue-1506-${id})">\n${svg}\n</g>`;

  // ── 1 : le plat d'acier, boulonné ──
  const eclisse = z => {
    const g = geo(z), out = [ski(z, g)];
    const { E, y0, xC } = g;
    const L = 104, ep = 7, x0 = xC - L / 2, x1 = xC + L / 2, yH = y0 - E - ep;
    out.push(h.rect(x0, yH, L, ep, A.hachure('metal', 'contour')));
    // quatre boulons : la tête sur le plat, la tige dans le ski en tireté, l'écrou dessous
    const xs = [x0 + 12, x0 + 30, x1 - 30, x1 - 12];
    xs.forEach(x => {
      out.push(h.rect(x - 5.5, yH - 5, 11, 5, blanc(A.arete)));
      out.push(h.ligne(x, y0 - E, x, y0, A.cache));
      out.push(h.rect(x - 5.5, y0, 11, 5.5, blanc(A.arete)));
      out.push(h.ligne(x, y0 + 5.5, x, y0 + 8.5, A.arete));
    });
    out.push(h.controle(xC, y0 - E / 2, 13));
    return { svg: out.join('\n'), g, x0, x1, yH, xs };
  };

  // ── 2 : la perche verte, ligaturée ──
  const perche = z => {
    const g = geo(z), out = [];
    const { E, y0, xC } = g;
    const R = 7, px0 = g.xSel + 26, px1 = g.xs + 6, yP = y0 + R;   // la perche : sous le ski, d'avant la selle au début de la spatule
    // la perche d'abord (le ski la cache par le haut), ses bouts coupés en ellipse
    out.push(h.path(`M ${f(px0)} ${f(yP - R)} L ${f(px1)} ${f(yP - R)} A ${f(R * 0.45)} ${f(R)} 0 0 1 ${f(px1)} ${f(yP + R)} L ${f(px0)} ${f(yP + R)} A ${f(R * 0.45)} ${f(R)} 0 0 1 ${f(px0)} ${f(yP - R)} Z`, blanc(A.contour)));
    out.push(h.ellipse(px0, yP, R * 0.45, R, blanc(A.arete)));
    out.push(ski(z, g).replace(h.ligne(0, y0 + 0.5, z.l, y0 + 0.5, A.fin), ''));
    // le sol plus bas : la perche porte le ski
    out.push(h.ligne(0, yP + R + 0.5, z.l, yP + R + 0.5, A.fin));
    // deux ligatures, une de chaque côté de la cassure : quatre tours de corde en biais autour du ski et de la perche
    const lig = xm => {
      const s = [];
      for (let k = -1.5; k <= 1.5; k += 1) {
        const x = xm + k * 6;
        s.push(String(F.corde([[x - 2.6, y0 - E - 1.4], [x + 2.6, yP + R + 1.4]], { ep: 4.2, trait: 'detail' })));
      }
      return s.join('\n');
    };
    const xl1 = xC - 34, xl2 = xC + 34;
    out.push(lig(xl1), lig(xl2));
    return { svg: out.join('\n'), g, px0, px1, yP, R, xl1, xl2 };
  };

  return {
    ref: '15-06',
    titre: 'Le ski cassé, réparé sur le chemin',
    desc: 'Deux vignettes au même cadrage : un ski de motoneige vu de côté, la spatule relevée à droite avec sa boucle, la selle et la jambe de direction au tiers arrière, et une cassure à travers le ski en avant de la selle. En haut, un plat d’acier posé sur le dessus du ski, centré sur la cassure, tenu par quatre boulons qui traversent le plat et le ski, deux de chaque côté de la cassure, les écrous dessous. En bas, séparée par un filet et marquée comme une autre façon : une perche verte couchée sous le ski, attachée par deux ligatures de corde, une de chaque côté de la cassure.',
    format: 'quart',
    disposition: [['eclisse'], ['perche']],
    vues: {
      eclisse: {
        titre: 'Avec un plat d’acier',
        dessin: z => [coupe('e', z, eclisse(z).svg), h.ligne(0, z.h + 9, z.l, z.h + 9, A.fin)].join('\n'),
        renvois: z => {
          const v = eclisse(z), g = v.g;
          return [
            { n: 1, rond: [g.xC + 6, g.y0 - g.E - 34], cible: [g.xC + 2, v.yH - 1], texte: 'centrer un plat d’acier sur la cassure' },
            { n: 2, rond: [v.x1 + 26, g.y0 + 22], cible: [v.xs[3] + 4, g.y0 + 3], texte: 'boulonner de part en part, des deux côtés' },
          ];
        },
      },
      perche: {
        titre: 'Sans plat d’acier',
        dessin: z => {
          // le filet qui sépare l'autre façon est tiré sous la première vignette
          return coupe('p', z, perche(z).svg);
        },
        renvois: z => {
          const v = perche(z), g = v.g;
          return [
            { n: 3, rond: [v.px0 - 24, v.yP + 14], cible: [v.px0 + 6, v.yP + v.R - 0.5], texte: 'au lieu de 1 et 2 : une perche verte sous le ski' },
            { n: 4, rond: [v.xl2 + 30, g.y0 - g.E - 28], cible: [v.xl2 + 4, g.y0 - g.E - 2], texte: 'ligaturer de chaque côté de la cassure' },
          ];
        },
      },
    },
  };
};
