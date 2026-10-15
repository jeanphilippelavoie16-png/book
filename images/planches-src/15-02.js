// Planche 15-02. Siphonner sans la bouche : le clapet de fortune, les deux boyaux (chapitre 15, §9, « Tirer le
// carburant de là où il est », amorçages 2 et 3). Dessinée le 15 octobre 2026 (inventaire des planches, priorité
// haute).
// Le texte : « une bille ou un roulement laissé libre dans le bout du boyau, retenu par un clou traversé en
// croix : il se soulève quand le liquide monte et retombe quand il voudrait redescendre. On plonge et on secoue de
// haut en bas » ; « un long qui descend au fond et sort vers le bidon, un court qui reste dans le ciel du
// réservoir. On bourre le goulot d'un chiffon autour des deux, et on souffle dans le court avec une pompe à vélo ou
// une pompe de matelas, à la main et lentement » ; « le bidon doit être franchement plus bas que le réservoir ».
// Ce que le texte ne dit pas et que la planche tranche (géométrie, et le brevet US 4 414 997, sources/
// 15-brevet-us4414997-siphon-clapet.md : le siège au fond du corps de clapet, l'élément libre au-dessus, la butée
// au-dessus de l'élément) : le siège est en bas, sous la bille, et le clou au-dessus d'elle ; monté à l'envers, le
// clapet ne retient rien. Le siège : un bout de tube plus étroit que la bille, enfoncé dans le bout du boyau.
// Proportions dessinées (sans cote, le chapitre n'en donne pas) : boyau de 16 mm intérieur, bille de 12 mm, siège de
// 8 mm intérieur, la bille libre de quelques millimètres sous le clou.
// Pas de main : l'objet seul et la flèche rouge du geste (le brief : une main qui n'est pas nette ne s'imprime pas).
// La charte : les flèches rouges, le boyau qu'on plonge puis qu'on remonte, et la pompe qu'on pousse ; le cercle
// rouge, la bille sur son siège.
module.exports = (h) => {
  const A = h.a;
  const f1 = v => Math.round(v * 10) / 10;
  const W = at => at.replace('fill="none"', 'fill="#FFFFFF"');

  // ─── Le clapet, en coupe (4 unités par mm) ──────────────────────────────────────────────────────
  const k = 4;
  const C = z => {
    const cx = z.l / 2 - 4, ri = 8 * k, ro = 11 * k, yE = z.h - 30, yS = yE - 15 * k, rs = 4 * k, rb = 6 * k;
    const ySiege = yS - Math.sqrt(rb * rb - rs * rs);   // le centre de la bille posée sur le siège
    const yClou = yS - 18 * k;
    return { cx, ri, ro, yE, yS, rs, rb, ySiege, yLeve: yClou + 2.5 * k + rb + 1, yClou };
  };
  const clapet = (z, leve) => {
    const g = C(z), o = [];
    const { cx, ri, ro, yE, yS, rs, rb, ySiege, yLeve, yClou } = g;
    const yb = leve ? yLeve : ySiege;
    // l'essence dans le boyau : en montant, partout ; retenue, au-dessus de la bille seulement
    if (leve) o.push(h.rect(cx - ri, 20, 2 * ri, yS - 20, A.hachure('eau', 'aucun')), h.rect(cx - rs, yS, 2 * rs, yE - yS, A.hachure('eau', 'aucun')));
    else o.push(h.rect(cx - ri, 20, 2 * ri, yb - 20, A.hachure('eau', 'aucun')));
    // la paroi du boyau, coupée, des deux côtés ; cassée en haut
    for (const s of [-1, 1]) {
      const xa = cx + s * ri, xb = cx + s * ro;
      o.push(h.path(`M${f1(xa)} ${yE} L${f1(xa)} 22 L${f1(xb)} 16 L${f1(xb)} ${yE} Z`, A.hachure('isolant', 'arete')));
    }
    // le siège : un bout de tube plus étroit, enfoncé dans le bout du boyau
    for (const s of [-1, 1]) o.push(h.rect(s < 0 ? cx - ri : cx + rs, yS, ri - rs, yE - yS + 4, A.hachure('metal', 'arete')));
    // le clou, en croix, au-dessus de la bille : la tête dehors à gauche, la pointe dehors à droite
    const ec = 1.4 * k;
    o.push(h.path(`M${f1(cx - ro - 6)} ${f1(yClou - ec)} L${f1(cx + ro + 18)} ${f1(yClou - ec)} L${f1(cx + ro + 28)} ${f1(yClou)} L${f1(cx + ro + 18)} ${f1(yClou + ec)} L${f1(cx - ro - 6)} ${f1(yClou + ec)} Z`, W(A.arete)));
    o.push(h.rect(cx - ro - 12, yClou - 4 * k, 6, 8 * k, W(A.arete)));
    // la bille
    o.push(h.cercle(cx, yb, rb, W(A.contour)));
    o.push(h.path(`M${f1(cx - rb * 0.55)} ${f1(yb - rb * 0.2)} A${f1(rb * 0.6)} ${f1(rb * 0.6)} 0 0 1 ${f1(cx - rb * 0.1)} ${f1(yb - rb * 0.62)}`, A.detail));
    // ce qui coule
    if (leve) {
      o.push(h.fleche(`M${cx} ${yE + 26} L${cx} ${yE - 8}`, A.arete));
      for (const s of [-1, 1]) o.push(h.fleche(`M${f1(cx + s * (rb + 4))} ${f1(yb + rb - 4)} L${f1(cx + s * (rb + 4))} ${f1(yb - rb - 2)}`, A.detail));
      o.push(h.fleche(`M${cx} ${yClou - 14} L${cx} ${48}`, A.arete));
    } else {
      o.push(h.fleche(`M${cx} ${yClou - 40} L${cx} ${yClou - 12}`, A.arete));
      o.push(h.controle(cx, yS, rb + 8));
    }
    // le geste : on plonge, puis on remonte
    const xg = cx + ro + 26;
    o.push(leve ? h.geste(`M${xg} 40 L${xg} 96`) : h.geste(`M${xg} 96 L${xg} 40`));
    return { svg: o.join('\n'), g: { ...g, yb } };
  };

  // ─── Le baril sur ses blocs, l'essence dedans ────────────────────────────────────────────────────
  // (x0, yH) : le coin haut gauche ; l : largeur ; ht : hauteur ; le bonde à xB
  const baril = (x0, yH, l, ht, yN, ouv = null) => {
    const o = [];
    o.push(h.rect(x0, yN, l, yH + ht - yN, A.hachure('eau', 'aucun')));
    o.push(h.ligne(x0, yN, x0 + l, yN, A.detail));
    o.push(h.rect(x0 - 3, yH, 3, ht, A.plein), h.rect(x0 + l, yH, 3, ht, A.plein), h.rect(x0 - 3, yH + ht, l + 6, 3, A.plein));
    if (ouv) o.push(h.rect(x0 - 3, yH - 3, ouv[0] - ouv[1] - x0 + 3, 3, A.plein), h.rect(ouv[0] + ouv[1], yH - 3, x0 + l + 3 - ouv[0] - ouv[1], 3, A.plein));
    else o.push(h.rect(x0 - 3, yH - 3, l + 6, 3, A.plein));
    // les cerclages, vus en coupe : deux bosses de chaque côté
    for (const y of [yH + ht * 0.33, yH + ht * 0.66]) for (const s of [-1, 1]) {
      const x = s < 0 ? x0 - 3 : x0 + l + 3;
      o.push(h.path(`M${f1(x)} ${f1(y - 5)} Q${f1(x + s * 6)} ${f1(y)} ${f1(x)} ${f1(y + 5)}`, A.arete));
    }
    return o.join('\n');
  };
  const blocs = (x0, l, y, sol) => [x0 + 4, x0 + l - 40].map(x => h.rect(x, y + 3, 36, sol - y - 3, A.hachure('pierre', 'arete'))).join('\n');
  const bidon = (x, sol, l = 52, ht = 64) => {
    // le bidon de côté, le goulot en haut à droite
    const o = [];
    o.push(h.path(`M${x} ${sol} L${x} ${sol - ht + 8} Q${x} ${sol - ht} ${x + 8} ${sol - ht} L${x + l - 18} ${sol - ht} L${x + l} ${sol - ht + 12} L${x + l} ${sol} Z`, W(A.contour)));
    o.push(h.path(`M${x + 8} ${sol - ht + 12} L${x + 26} ${sol - ht + 12}`, A.detail));
    o.push(h.rect(x + l - 16, sol - ht - 6, 12, 10, W(A.arete)));
    for (const dy of [0.45, 0.75]) o.push(h.ligne(x + 6, sol - ht * dy, x + l - 6, sol - ht * dy, A.fin));
    return { svg: o.join('\n'), goulot: [x + l - 10, sol - ht - 6] };
  };
  const boyau = (pts, at = A.arete) => {
    // un boyau : deux traits parallèles (6 de large) le long d'une polyligne arrondie
    const d = pts.map((p, i) => `${i ? 'L' : 'M'}${f1(p[0])} ${f1(p[1])}`).join(' ');
    return `<path d="${d}" fill="none" stroke="#1A1A1A" stroke-width="7.4" stroke-linejoin="round" stroke-linecap="butt"/>\n<path d="${d}" fill="none" stroke="#FFFFFF" stroke-width="4.6" stroke-linejoin="round" stroke-linecap="butt"/>`;
  };

  // ─── Secouer : le boyau à clapet dans le baril, l'autre bout dans le bidon, plus bas ───────────
  const S = z => ({ x0: 16, yH: 96, l: 116, ht: 156, sol: z.h - 8 });
  const secouer = z => {
    const g = S(z), o = [];
    const { x0, yH, l, ht, sol } = g;
    const yN = yH + 40, yBas = yH + ht;
    const xb = x0 + l - 26;
    o.push(baril(x0, yH, l, ht, yN, [xb, 9]), blocs(x0, l, yBas, sol));
    // la bonde ouverte : son collet de part et d'autre du trou
    o.push(h.rect(xb - 13, yH - 9, 4, 6, A.plein), h.rect(xb + 9, yH - 9, 4, 6, A.plein));
    o.push(h.ligne(0, sol, z.l, sol, A.arete));
    const bd = bidon(z.l - 60, sol);
    o.push(bd.svg);
    o.push(boyau([[xb, yBas - 14], [xb, yH - 40], [xb + 10, yH - 58], [z.l - 54, yH - 58], [z.l - 50, yH - 50], [bd.goulot[0], bd.goulot[1] + 6]]));
    // le clapet au bout, dans le fond : le bout du boyau un peu plus gros
    o.push(h.rect(xb - 5, yBas - 30, 10, 18, W(A.arete)));
    o.push(h.cercle(xb, yBas - 24, 3, A.fin));
    // le geste : secouer de haut en bas
    o.push(h.geste(`M${xb - 16} ${yH - 70} L${xb - 16} ${yH - 18}`, { double: true }));
    return { svg: o.join('\n'), g: { ...g, xb, yN, yBas, bd } };
  };

  // ─── À deux boyaux : le goulot bourré, la pompe sur le court ────────────────────────────────────
  const D = z => ({ x0: 200, yH: 70, l: 150, ht: 136, sol: z.h - 8 });
  const deux = z => {
    const g = D(z), o = [];
    const { x0, yH, l, ht, sol } = g;
    const yN = yH + 34, yBas = yH + ht;
    const xg = x0 + l - 40;
    o.push(baril(x0, yH, l, ht, yN, [xg, 12]), blocs(x0, l, yBas, sol));
    o.push(h.ligne(0, sol, z.l, sol, A.arete));
    // le goulot, la bonde ouverte, bourrée d'un chiffon autour des deux boyaux
    o.push(h.rect(xg - 16, yH - 14, 4, 14, A.plein), h.rect(xg + 12, yH - 14, 4, 14, A.plein));
    o.push(`<defs><pattern id="vue-tissu" width="6" height="4.5" patternUnits="userSpaceOnUse"><path d="M0 1 L3 3.5 L6 1" fill="none" stroke="#1A1A1A" stroke-width="0.5"/></pattern></defs>`);
    o.push(h.path(`M${xg - 12} ${yH + 6} L${xg - 12} ${yH - 14} Q${xg - 22} ${yH - 24} ${xg - 14} ${yH - 30} L${xg + 14} ${yH - 30} Q${xg + 22} ${yH - 24} ${xg + 12} ${yH - 14} L${xg + 12} ${yH + 6} Z`, 'fill="url(#vue-tissu)" stroke="#1A1A1A" stroke-width="1.4" stroke-linejoin="round"'));
    // le long, jusqu'au fond, qui sort vers le bidon ; le court, dans le ciel, vers la pompe
    const bd = bidon(z.l - 70, sol);
    o.push(bd.svg);
    const xl = xg + 5, xc = xg - 5;
    o.push(boyau([[xl, yBas - 10], [xl, yH - 46], [xl + 12, yH - 58], [z.l - 64, yH - 58], [z.l - 60, yH - 50], [bd.goulot[0], bd.goulot[1] + 6]]));
    o.push(boyau([[xc, yN - 12], [xc, yH - 50], [xc - 12, yH - 62], [110, yH - 62], [96, yH - 50], [96, sol - 60]]));
    // ce qui passe : l'air poussé dans le court, l'essence qui monte dans le long
    o.push(h.fleche(`M${xc - 60} ${yH - 46} L${xc - 30} ${yH - 46}`, A.cache));
    o.push(h.fleche(`M${xl + 50} ${yH - 44} L${xl + 84} ${yH - 44}`, A.arete));
    o.push(h.fleche(`M${xl + 14} ${yBas - 30} L${xl + 14} ${yN + 14}`, A.detail));
    // la pompe à vélo, au sol : le pied, le corps, la tige et la poignée en T, le boyau qui part du bas
    const xp = 60, yP = sol - 120;
    o.push(h.rect(xp - 34, sol - 6, 68, 6, W(A.arete)));
    o.push(h.rect(xp - 9, yP, 18, sol - 6 - yP, W(A.contour)));
    o.push(h.rect(xp - 2.5, yP - 30, 5, 30, W(A.arete)));
    o.push(h.rect(xp - 30, yP - 38, 60, 9, W(A.arete) + ' rx="4"'));
    o.push(h.path(`M${xp + 9} ${sol - 20} Q${xp + 34} ${sol - 20} ${96} ${sol - 60}`, 'fill="none" stroke="#1A1A1A" stroke-width="2.4" stroke-linecap="round"'));
    o.push(h.geste(`M${xp} ${yP - 68} L${xp} ${yP - 44}`));
    return { svg: o.join('\n'), g: { ...g, xg, xl, xc, yN, yBas, bd, xp, yP } };
  };

  return {
    ref: '15-02',
    titre: 'Siphonner sans la bouche',
    desc: 'En haut à gauche, deux coupes du bout du boyau : un bout de tube plus étroit enfoncé dans le boyau fait le siège ; une bille, plus grosse que le siège, est libre au-dessus ; un clou traverse le boyau en croix au-dessus de la bille. Quand on plonge le boyau (flèche rouge vers le bas), l’essence entre par le bas, soulève la bille contre le clou et monte autour. Quand on le remonte (flèche rouge vers le haut), la bille retombe sur le siège (cercle rouge) et l’essence au-dessus ne redescend plus. En haut à droite : le boyau à clapet plongé jusqu’au fond d’un baril posé sur des blocs, l’autre bout dans un bidon posé au sol, plus bas ; une double flèche rouge, secouer de haut en bas. En bas : le même baril, le goulot bourré d’un chiffon autour de deux boyaux ; le long descend au fond et sort vers le bidon, le court s’arrête dans l’air du baril et va à une pompe à vélo au sol, dont on pousse la poignée (flèche rouge) ; l’air entre par le court, l’essence sort par le long.',
    format: 'pleine',
    disposition: [['monte', 'retombe', 'secouer'], ['deux']],
    hauteurs: [1.25, 1],
    largeurs: [[1, 1, 1.5], [1]],
    vues: {
      monte: {
        titre: 'On plonge : elle se soulève',
        dessin: z => clapet(z, true).svg,
        renvois: z => {
          const { g } = clapet(z, true);
          return [
            { n: 1, rond: [16, g.yS + 46], cible: [g.cx - g.ri + 4, g.yS + 46], texte: 'bout de tube étroit : le siège' },
            { n: 2, rond: [16, g.yb + 40], cible: [g.cx - g.rb * 0.75, g.yb + g.rb * 0.66], texte: 'bille plus grosse que le siège' },
            { n: 3, rond: [z.l - 16, g.yClou + 40], cible: [g.cx + g.ro + 14, g.yClou + 5.6], texte: 'clou en croix au-dessus de la bille' },
          ];
        },
      },
      retombe: {
        titre: 'On remonte : elle retombe',
        dessin: z => clapet(z, false).svg,
      },
      secouer: {
        titre: 'Plonger et secouer',
        dessin: z => secouer(z).svg,
        renvois: z => {
          const { g } = secouer(z);
          return [
            { n: 4, rond: [g.xb - 40, g.yH - 84], cible: [g.xb - 20, g.yH - 60], texte: 'secouer de haut en bas' },
            { n: 5, rond: [g.x0 + 30, g.yBas - 22], cible: [g.xb - 5, g.yBas - 22], texte: 'le clapet au fond' },
            { n: 6, rond: [z.l - 20, g.sol - 100], cible: [z.l - 34, g.sol - 52], texte: 'bidon plus bas que le réservoir' },
          ];
        },
      },
      deux: {
        titre: 'À deux boyaux, sans clapet',
        dessin: z => deux(z).svg,
        renvois: z => {
          const { g } = deux(z);
          return [
            { n: 7, rond: [g.x0 + g.l + 34, g.yBas - 20], cible: [g.xl + 3, g.yBas - 20], texte: 'boyau long jusqu’au fond' },
            { n: 8, rond: [g.x0 + 30, g.yN + 26], cible: [g.xc - 3, g.yN - 6], texte: 'boyau court dans l’air du baril' },
            { n: 9, rond: [g.xg + 70, g.yH - 20], cible: [g.xg + 16, g.yH - 22], texte: 'chiffon bourré dans le goulot' },
            { n: 10, rond: [g.xp - 40, g.yP + 20], cible: [g.xp - 9, g.yP + 30], texte: 'pompe à vélo, à la main, lentement' },
          ];
        },
      },
    },
  };
};
