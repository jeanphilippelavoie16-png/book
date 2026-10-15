// Planche 109-44. Le joint de vérin en cuir gras.
// Chapitre 109, §9, « Refaire le joint d'un vérin en cuir gras » : la rondelle de cuir épais
// trempée dans le suif chaud, formée à chaud sur un mandrin de bois tourné au diamètre du piston
// (le cuir prend la forme d'un godet), montée lèvre vers la pression : la pression elle-même
// plaque la lèvre contre la paroi ; montée à l'envers, elle ne retient rien.
// Ce que le chapitre ne dit pas et que la planche dessine, d'après Scientific American, 23 sept.
// 1911 (sources/109-sciam-1911-matrice-cuir-coupelle.md) : le mandrin s'enfonce dans un trou
// percé au diamètre du cylindre, le cuir pressé entre les deux. Le godet est tenu sous le piston
// par une rondelle et une vis, comme sur toute coupelle de piston. Aucune cote (le chapitre n'en
// donne pas). Vues en coupe ; le cuir en noir plein, l'huile en trame de liquide.
module.exports = (h) => {
  const A = h.a;
  const BL = '#FFFFFF';
  const blanc = t => A[t].replace('fill="none"', `fill="${BL}"`);
  const f = v => Math.round(v * 100) / 100;
  const pt = p => `${f(p[0])} ${f(p[1])}`;
  const poly = (P, ferme = true) => 'M ' + P.map(pt).join(' L ') + (ferme ? ' Z' : '');

  // ─── Vue 1 : former le godet ────────────────────────────────────────────────────────────
  const F1 = z => {
    const cx = z.l / 2, yT = 104, yF = yT + 62, Rt = 40, e = 4.5, Rm = Rt - e;
    return { cx, yT, yF, Rt, e, Rm, yM: yF - e };
  };
  const vueFormer = z => {
    const q = F1(z), { cx, yT, yF, Rt, e, Rm, yM } = q, out = [];
    // la matrice : un bloc de bois percé, en coupe
    const xg = 10, xd = z.l - 10, yb = z.h - 14;
    out.push(h.path(poly([[xg, yT], [cx - Rt, yT], [cx - Rt, yF], [cx + Rt, yF], [cx + Rt, yT], [xd, yT], [xd, yb], [xg, yb]]), A.hachure('bois', 'contour')));
    // le cuir, formé en godet entre le mandrin et le trou ; les bords dépassent un peu
    out.push(h.path(poly([[cx - Rt, yT - 8], [cx - Rt + e, yT - 8], [cx - Rt + e, yM], [cx + Rt - e, yM], [cx + Rt - e, yT - 8], [cx + Rt, yT - 8], [cx + Rt, yF], [cx - Rt, yF]]), A.plein));
    // le mandrin : une pièce tournée, en vue (pas coupée), qu'on enfonce
    const yH = 40;
    out.push(h.path(poly([[cx - Rm, yH], [cx + Rm, yH], [cx + Rm, yM], [cx - Rm, yM]]), A.blanc));
    out.push(h.rect(cx + Rm * 0.4, yH, Rm * 0.6, yM - yH, A.ombre));
    out.push(h.path(poly([[cx - Rm, yH], [cx + Rm, yH], [cx + Rm, yM], [cx - Rm, yM]]), A.contour));
    out.push(h.ligne(cx - Rm, yH + 12, cx + Rm, yH + 12, A.detail));
    // on enfonce
    out.push(h.geste(`M ${pt([cx, yH - 30])} L ${pt([cx, yH - 4])}`));
    return out.join('\n');
  };
  const renvoisFormer = z => {
    const q = F1(z), { cx, yT, yF, Rt, e, Rm, yM } = q;
    return [
      { n: 1, rond: [cx + Rm + 26, 40], cible: [cx + Rm + 1, 52], texte: 'mandrin au diamètre du piston' },
      { n: 2, rond: [cx + Rt + 26, yF + 18], cible: [cx + Rt + 1, yF - 10], texte: 'trou au diamètre du cylindre' },
      { n: 3, rond: [cx - Rt - 30, yT - 26], cible: [cx - Rt + 2, yT - 6], texte: 'cuir gras chaud, pressé en godet' },
    ];
  };

  // ─── Vues 2 et 3 : monté dans le cylindre, bon et raté ──────────────────────────────────
  // Même cadrage : le cylindre en coupe (parois d'acier), le piston qui descend du haut, l'huile
  // sous pression en bas (on pompe sous le piston).
  const C = z => {
    const cx = z.l / 2, Rc = 44, t = 13, Rp = Rc - 2, yP = 92, e = 4.5, hl = 30;
    return { cx, Rc, t, Rp, yP, e, hl };
  };
  const cylindre = (z, q, out) => {
    const { cx, Rc, t } = q, yb = z.h - 4;
    // l'huile, dans tout le cylindre ; le piston et le godet se peignent par-dessus
    out.push(h.rect(cx - Rc, 4, 2 * Rc, yb - 4, A.hachure('eau', 'aucun')));
    for (const s of [-1, 1]) out.push(h.path(poly([[cx + s * Rc, 4], [cx + s * (Rc + t), 4], [cx + s * (Rc + t), yb], [cx + s * Rc, yb]]), A.hachure('metal', 'contour')));
  };
  const piston = (q, out, yBas) => {
    const { cx, Rp } = q;
    out.push(h.path(poly([[cx - Rp, 4], [cx + Rp, 4], [cx + Rp, yBas], [cx - Rp, yBas]]), A.blanc));
    out.push(h.path(poly([[cx - Rp, 4], [cx + Rp, 4], [cx + Rp, yBas], [cx - Rp, yBas]]), A.hachure('metal', 'contour')));
  };
  const vueBon = z => {
    const q = C(z), { cx, Rc, Rp, yP, e, hl } = q, out = [];
    cylindre(z, q, out);
    // l'espace au-dessus du godet, entre piston et paroi : sec (blanc)
    out.push(h.rect(cx - Rc, 4, 2 * Rc, yP - 4, A.blanc));
    for (const s of [-1, 1]) out.push(h.ligne(cx + s * Rc, 4, cx + s * Rc, yP, A.arete));
    piston(q, out, yP);
    // le godet : le fond sous le piston, la lèvre qui descend contre la paroi, amincie au bout
    const lev = s => [[cx + s * (Rc - e), yP + e], [cx + s * (Rc - e * 0.4), yP + e + hl], [cx + s * Rc, yP + e + hl], [cx + s * Rc, yP]];
    out.push(h.path(poly([[cx - Rc, yP], [cx + Rc, yP], [cx + Rc, yP + e + hl], [cx + Rc - e * 0.6, yP + e + hl], [cx + Rc - e, yP + e], [cx - Rc + e, yP + e], [cx - Rc + e * 0.6, yP + e + hl], [cx - Rc, yP + e + hl]]), A.plein));
    // la rondelle et la vis qui tiennent le godet sous le piston
    out.push(h.rect(cx - Rc * 0.55, yP + e, Rc * 1.1, 6, blanc('arete')));
    out.push(h.rect(cx - 6, yP + e + 6, 12, 5, blanc('arete')));
    out.push(h.ligne(cx - 3.5, yP - 18, cx - 3.5, yP + e, A.cache), h.ligne(cx + 3.5, yP - 18, cx + 3.5, yP + e, A.cache));
    // la pression : elle pousse le fond vers le haut et plaque la lèvre contre la paroi
    for (const s of [-1, 1]) out.push(h.fleche(`M ${pt([cx + s * (Rc - 26), yP + e + hl * 0.62])} L ${pt([cx + s * (Rc - e - 3), yP + e + hl * 0.62])}`, A.arete));
    out.push(h.fleche(`M ${pt([cx, yP + e + hl + 40])} L ${pt([cx, yP + e + 18])}`, A.arete));
    return out.join('\n');
  };
  const vueRate = z => {
    const q = C(z), { cx, Rc, Rp, yP, e, hl } = q, out = [];
    cylindre(z, q, out);
    // l'huile passe : elle monte entre le godet et la paroi ; au-dessus, il y en a aussi
    // le piston, dont le bout est pris dans le godet
    const yB = yP + e + hl;          // le fond du godet, plus bas : le piston est dedans
    const rp2 = Rc - e - 1.2;
    out.push(h.path(poly([[cx - Rp, 4], [cx + Rp, 4], [cx + Rp, yP], [cx + rp2, yP + 4], [cx + rp2, yB - e], [cx - rp2, yB - e], [cx - rp2, yP + 4], [cx - Rp, yP]]), A.blanc));
    out.push(h.path(poly([[cx - Rp, 4], [cx + Rp, 4], [cx + Rp, yP], [cx + rp2, yP + 4], [cx + rp2, yB - e], [cx - rp2, yB - e], [cx - rp2, yP + 4], [cx - Rp, yP]]), A.hachure('metal', 'contour')));
    // le godet monté à l'envers : le fond en bas, face à l'huile, la lèvre qui remonte vers le piston,
    // écartée de la paroi par l'huile qui passe
    out.push(h.path(poly([[cx - Rc + 3, yB], [cx + Rc - 3, yB], [cx + Rc - 3, yB - e - hl + 4], [cx + Rc - 3 - e * 0.6, yB - e - hl + 4], [cx + Rc - 3 - e, yB - e], [cx - Rc + 3 + e, yB - e], [cx - Rc + 3 + e * 0.6, yB - e - hl + 4], [cx - Rc + 3, yB - e - hl + 4]]), A.plein));
    // l'huile qui fuit le long de la paroi, au-delà de la lèvre
    for (const s of [-1, 1]) out.push(h.fleche(`M ${pt([cx + s * (Rc - 1.6), yB + 26])} L ${pt([cx + s * (Rc - 1.6), yP - 30])}`, A.detail));
    out.push(h.controle(cx + Rc - 2, yP + 6, 11));
    return out.join('\n');
  };
  const renvoisBon = z => {
    const q = C(z), { cx, Rc, yP, e, hl } = q;
    return [
      { n: 4, rond: [cx + Rc + 30, yP + 66], cible: [cx + Rc - 2, yP + e + hl - 4], texte: 'la lèvre tournée vers la pression' },
      { n: 5, rond: [cx - Rc - 30, yP + 76], cible: [cx - Rc + 20, yP + e + hl * 0.62], texte: 'la pression plaque la lèvre' },
    ];
  };
  const renvoisRate = z => {
    const q = C(z), { cx, Rc, yP, e, hl } = q;
    return [
      { n: 6, rond: [cx + Rc + 30, yP - 34], cible: [cx + Rc - 2, yP - 18], texte: 'à l’envers, l’huile passe' },
    ];
  };

  return {
    ref: '109-44',
    titre: 'Le joint de vérin en cuir gras',
    desc: 'Refaire la coupelle d’un vérin. En coupe, à gauche : un mandrin de bois tourné au diamètre du piston s’enfonce dans un trou percé au diamètre du cylindre, et la rondelle de cuir gras chaud prend entre les deux la forme d’un godet. Au milieu, bon : le godet monté sous le piston, lèvre tournée vers l’huile sous pression ; la pression plaque la lèvre contre la paroi. À droite, raté : le même godet monté à l’envers, la lèvre vers le piston ; l’huile passe entre le godet et la paroi.',
    format: 'demi',
    disposition: [['former', 'bon', 'rate']],
    vues: {
      former: { titre: 'Former le godet', dessin: vueFormer, renvois: renvoisFormer },
      bon: { titre: 'Bon : lèvre vers la pression', dessin: vueBon, renvois: renvoisBon },
      rate: { titre: 'Raté : à l’envers', dessin: vueRate, renvois: renvoisRate },
    },
  };
};
