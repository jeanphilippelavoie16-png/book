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
      { n: 3, rond: [cx - Rt - 30, yT - 26], cible: [cx - Rt + 2, yT - 6], texte: 'cuir trempé dans le suif chaud' },
      { n: 4, rond: [cx - 34, 16], cible: [cx - 2.5, 21], texte: 'enfoncer le mandrin dans le trou' },
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
  // Le raté : le même godet que dans « Bon », au même diamètre, monté à l'envers sous le même piston : le fond vers
  // l'huile, contre la paroi par son coin ; les lèvres montent vers le piston. L'huile pousse les lèvres vers
  // l'intérieur, les décolle de la paroi et passe entre la lèvre et la paroi.
  // g : le jour entre le haut de la lèvre et la paroi, assez large pour qu'une flèche y tienne sans rien toucher.
  // Le cercle rouge est sur le bas du jour, là où la lèvre a quitté la paroi.
  const R_ = z => {
    const q = C(z), yF = q.yP + q.hl, g = 26, rc = 3;
    return Object.assign(q, { yF, g, rc, kC: [q.cx + q.Rc - 6, yF - 20], rC: 11 });
  };
  const vueRate = z => {
    const q = R_(z), { cx, Rc, Rp, yP, e, yF, g, rc } = q, out = [], yb = z.h - 4;
    huile(q, out, yP - 30, yb, cx - Rc, cx + Rc, 'h-huile-109-44-rate');
    cylindre(z, q, out);
    // le piston, le même que dans « Bon »
    out.push(h.path(poly([[cx - Rp, 4], [cx + Rp, 4], [cx + Rp, yP], [cx - Rp, yP]]), A.blanc));
    out.push(h.path(poly([[cx - Rp, 4], [cx + Rp, 4], [cx + Rp, yP], [cx - Rp, yP]]), A.hachure('metal', 'contour')));
    // le godet : x au bord extérieur (s = 1 à droite), lèvre droite de son coin jusqu'au piston, rabattue vers l'intérieur
    const yR = yP + 0.6, et = e * 0.45;
    const cote = s => ({
      coin0: [cx + s * (Rc - rc), yF], coinC: [cx + s * Rc, yF], coin1: [cx + s * Rc, yF - rc],
      haut: [cx + s * (Rc - g), yR], hautI: [cx + s * (Rc - g - et), yR], basI: [cx + s * (Rc - e), yF - e],
      ctrl: [cx + s * (Rc - 6), (yF + yP) / 2], ctrlI: [cx + s * (Rc - 6 - e * 0.75), (yF + yP) / 2 + 2],
    });
    const D = cote(1), G = cote(-1);
    // l'intérieur du godet, sous le piston : vide
    out.push(h.path(`M ${pt(G.hautI)} Q ${pt(G.ctrlI)} ${pt(G.basI)} L ${pt(D.basI)} Q ${pt(D.ctrlI)} ${pt(D.hautI)} Z`, A.blanc));
    const godetR = `M ${pt(G.coin0)} L ${pt(D.coin0)} Q ${pt(D.coinC)} ${pt(D.coin1)} Q ${pt(D.ctrl)} ${pt(D.haut)} L ${pt(D.hautI)}`
      + ` Q ${pt(D.ctrlI)} ${pt(D.basI)} L ${pt(G.basI)} Q ${pt(G.ctrlI)} ${pt(G.hautI)} L ${pt(G.haut)} Q ${pt(G.ctrl)} ${pt(G.coin1)} Q ${pt(G.coinC)} ${pt(G.coin0)} Z`;
    out.push(h.path(godetR, A.plein));
    // la vis, au milieu du godet, et la rondelle qui le tient, sous le fond
    out.push(h.rect(cx - 3.5, yP, 7, yF - e - yP, blanc('detail')));
    out.push(h.ligne(cx - 3.5, yP - 20, cx - 3.5, yP, A.cache), h.ligne(cx + 3.5, yP - 20, cx + 3.5, yP, A.cache));
    out.push(h.rect(cx - Rc * 0.5, yF, Rc, 6, blanc('arete')));
    out.push(h.rect(cx - 6, yF + 6, 12, 5, blanc('arete')));
    // l'huile file au milieu du jour entre la lèvre décollée et la paroi, jusque sous le piston : la flèche part là où
    // le jour est assez large pour elle et s'arrête sous le piston, sans toucher ni la lèvre ni la paroi
    for (const s_ of [-1, 1]) {
      const S_ = cote(s_), P_ = [];
      for (let i = 0; i <= 12; i++) {
        const t = 0.45 + 0.45 * i / 12, m = (1 - t) * (1 - t), b = 2 * t * (1 - t), n = t * t;
        const xl = m * S_.coin1[0] + b * S_.ctrl[0] + n * S_.haut[0], yl = m * S_.coin1[1] + b * S_.ctrl[1] + n * S_.haut[1];
        P_.push([(xl + cx + s_ * (Rc - 1.2)) / 2, yl]);
      }
      out.push(h.fleche('M ' + P_.map(pt).join(' L '), A.arete));
    }
    out.push(h.controle(q.kC[0], q.kC[1], q.rC));
    return out.join('\n');
  };
  const renvoisBon = z => {
    const q = C(z), { cx, Rc, yP, e, hl } = q;
    return [
      { n: 5, rond: [cx + Rc + 26, yP + hl + 30], cible: [cx + Rc - 2, yP + hl - 3], texte: 'la lèvre tournée vers la pression' },
      { n: 6, rond: [cx - Rc - 26, yP + hl + 50], cible: [cx - Rc + 20, yP + e + hl * 0.6 + 2], texte: 'la pression plaque la lèvre' },
    ];
  };
  const renvoisRate = z => {
    const q = R_(z), { cx, Rc, kC: c0, rC } = q, p0 = [cx + Rc + 26, c0[1] + 36];
    const u = [p0[0] - c0[0], p0[1] - c0[1]], l = Math.hypot(...u);
    return [
      { n: 7, rond: p0, cible: [c0[0] + u[0] / l * (rC + 0.5), c0[1] + u[1] / l * (rC + 0.5)], texte: 'à l’envers, l’huile décolle la lèvre' },
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
