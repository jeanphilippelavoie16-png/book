// Planche 109-44. Le joint de vérin en cuir gras.
// Chapitre 109, §9, « Refaire le joint d'un vérin en cuir gras » : la rondelle de cuir épais
// trempée dans le suif chaud, formée à chaud sur un mandrin de bois tourné au diamètre du piston
// (le cuir prend la forme d'un godet), montée lèvre vers la pression : la pression elle-même
// plaque la lèvre contre la paroi ; montée à l'envers, elle ne retient rien.
// Ce que le chapitre ne dit pas et que la planche dessine, d'après Scientific American, 23 sept.
// 1911 (sources/109-sciam-1911-matrice-cuir-coupelle.md) : le mandrin s'enfonce dans un trou
// percé au diamètre du cylindre, le cuir pressé entre les deux. Le godet est tenu sous le piston
// par une rondelle et une vis, comme sur toute coupelle de piston. Aucune cote (le chapitre n'en
// donne pas). Vues en coupe ; le cuir en noir plein, l'huile en trame de liquide noire (pas en bleu : le bleu est l'eau).
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
      { n: 3, rond: [cx - Rt - 30, yT - 26], cible: [cx - Rt + 2, yT - 6], texte: 'presser le cuir gras chaud en godet' },
    ];
  };

  // ─── Vues 2 et 3 : monté dans le cylindre, bon et raté ──────────────────────────────────
  // Même cadrage : le cylindre en coupe (parois d'acier), le piston qui descend du haut, l'huile
  // sous pression en bas (on pompe sous le piston).
  const C = z => {
    const cx = z.l / 2, Rc = 50, t = 11, Rp = Rc - 3, yP = 70, e = 7, hl = 46, jeu = 7;
    return { cx, Rc, t, Rp, yP, e, hl, jeu };
  };
  const cylindre = (z, q, out) => {
    const { cx, Rc, t } = q, yb = z.h - 4;
    for (const s of [-1, 1]) out.push(h.path(poly([[cx + s * Rc, 4], [cx + s * (Rc + t), 4], [cx + s * (Rc + t), yb], [cx + s * Rc, yb]]), A.hachure('metal', 'contour')));
  };
  // L'huile garde sa trame de liquide en traits noirs : le bleu est réservé à l'eau (JP, 19 octobre 2026 : « toute l'eau
  // en bleu sur les planches » ; l'huile n'en est pas). Un motif par vue, posé en remplissage du rectangle d'huile.
  const huile = (q, out, y0, y1, x0, x1, id) => {
    out.push(`<defs><pattern id="${id}" width="16" height="7" patternUnits="userSpaceOnUse"><line x1="1" y1="2" x2="8" y2="2" stroke="#1A1A1A" stroke-width="0.5"/><line x1="9" y1="5.5" x2="15" y2="5.5" stroke="#1A1A1A" stroke-width="0.5"/></pattern></defs>`);
    out.push(h.rect(x0, y0, x1 - x0, y1 - y0, `fill="url(#${id})" stroke="none"`));
  };
  // un godet en coupe, noir plein : fond d'épaisseur e, lèvres de hauteur hl qui s'amincissent ;
  // sens = -1 : la lèvre descend (ouvert vers le bas) ; +1 : elle monte. ext : demi-largeur extérieure
  const godet = (cx, yFond, ext, e, hl, sens) => {
    const yL = yFond - sens * hl, yI = yFond - sens * e;
    return h.path(poly([[cx - ext, yFond], [cx + ext, yFond], [cx + ext, yL], [cx + ext - e * 0.45, yL], [cx + ext - e, yI],
      [cx - ext + e, yI], [cx - ext + e * 0.45, yL], [cx - ext, yL]]), A.plein);
  };
  const vueBon = z => {
    const q = C(z), { cx, Rc, Rp, yP, e, hl } = q, out = [], yb = z.h - 4;
    // l'huile sous pression : sous le piston, et dans le godet
    huile(q, out, yP + e, yb, cx - Rc, cx + Rc, 'h-huile-109-44-bon');
    cylindre(z, q, out);
    // le piston, en coupe
    out.push(h.path(poly([[cx - Rp, 4], [cx + Rp, 4], [cx + Rp, yP], [cx - Rp, yP]]), A.hachure('metal', 'contour')));
    // le godet sous le piston, ouvert vers le bas : la lèvre descend contre la paroi
    out.push(godet(cx, yP, Rc, e, hl, -1));
    // la rondelle et la vis qui le tiennent
    out.push(h.rect(cx - Rc * 0.5, yP + e, Rc, 6, blanc('arete')));
    out.push(h.rect(cx - 6, yP + e + 6, 12, 5, blanc('arete')));
    out.push(h.ligne(cx - 3.5, yP - 20, cx - 3.5, yP, A.cache), h.ligne(cx + 3.5, yP - 20, cx + 3.5, yP, A.cache));
    // la pression : elle plaque la lèvre contre la paroi
    for (const s of [-1, 1]) out.push(h.fleche(`M ${pt([cx + s * (Rc - 30), yP + e + hl * 0.6])} L ${pt([cx + s * (Rc - e - 3), yP + e + hl * 0.6])}`, A.arete));
    out.push(h.fleche(`M ${pt([cx, yP + hl + 46])} L ${pt([cx, yP + e + 16])}`, A.arete));
    return out.join('\n');
  };
  const vueRate = z => {
    const q = C(z), { cx, Rc, Rp, yP, e, hl, jeu } = q, out = [], yb = z.h - 4;
    // le godet monté à l'envers : le fond face à l'huile, la lèvre qui monte vers le piston ;
    // l'huile la décolle de la paroi et passe
    const yF = yP + hl, ext = Rc - jeu;
    huile(q, out, yP - 30, yb, cx - Rc, cx + Rc, 'h-huile-109-44-rate');
    cylindre(z, q, out);
    // le piston : son bout, plus mince, est pris dans le godet
    const rn = ext - e - 0.5;
    out.push(h.path(poly([[cx - Rp, 4], [cx + Rp, 4], [cx + Rp, yP - 30], [cx + rn, yP - 26], [cx + rn, yF - e], [cx - rn, yF - e], [cx - rn, yP - 26], [cx - Rp, yP - 30]]), A.blanc));
    out.push(h.path(poly([[cx - Rp, 4], [cx + Rp, 4], [cx + Rp, yP - 30], [cx + rn, yP - 26], [cx + rn, yF - e], [cx - rn, yF - e], [cx - rn, yP - 26], [cx - Rp, yP - 30]]), A.hachure('metal', 'contour')));
    out.push(godet(cx, yF, ext, e, hl - 4, 1));
    // l'huile qui passe entre la lèvre et la paroi
    for (const s of [-1, 1]) out.push(h.fleche(`M ${pt([cx + s * (Rc - jeu / 2), yF + 30])} L ${pt([cx + s * (Rc - jeu / 2), yP - 22])}`, A.arete));
    out.push(h.controle(cx + Rc - jeu / 2, yP + 8, 12));
    return out.join('\n');
  };
  const renvoisBon = z => {
    const q = C(z), { cx, Rc, yP, e, hl } = q;
    return [
      { n: 4, rond: [cx + Rc + 26, yP + hl + 30], cible: [cx + Rc - 2, yP + hl - 3], texte: 'la lèvre tournée vers la pression' },
      { n: 5, rond: [cx - Rc - 26, yP + hl + 50], cible: [cx - Rc + 20, yP + e + hl * 0.6 + 2], texte: 'la pression plaque la lèvre' },
    ];
  };
  const renvoisRate = z => {
    const q = C(z), { cx, Rc, yP, e, hl } = q;
    return [
      { n: 6, rond: [cx + Rc + 26, yP + hl + 40], cible: [cx + Rc - 4, yP + hl + 20], texte: 'à l’envers, l’huile passe' },
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
