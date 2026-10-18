// Planche 10-08 (petite planche, une colonne). Amorcer un siphon sans la bouche.
// Le texte : ch. 10, variante d'urgence, « Amorcer un siphon sans la bouche » : « On remplit le boyau complètement
// dans le contenant plein, on bouche les deux bouts avec les pouces, on en descend un dans le seau receveur et on
// lâche. » Le siphon sert à l'étape 8 (siphonner par-dessus le dépôt) et à la planche 10-01.
//
// Deux vignettes au même cadrage de la chaudière :
//   1. le boyau couché au fond de la chaudière pleine, noyé jusqu'à ce qu'il ne sorte plus de bulles ;
//   2. un bout du boyau reste au fond de la chaudière, posée sur un billot ; l'autre bout, bouché par le pouce dans
//      le poing, est descendu dans le seau posé au sol, plus bas, puis lâché.
// Le seau plus bas que l'eau de la chaudière : c'est la condition d'un siphon (géométrie des niveaux), le texte dit
// « on en descend un ». Aucune cote, aucun chiffre.
// Main : h.formes.mainStock 'poing-barre' (1-01), tournée de -16°, sans son objet : le poing tient le bout du boyau,
// debout, le pouce dessus ; le bout est caché dans le poing. (La 1-09 vue de dos faisait moufle : écartée.) Le bout resté dans l'eau n'a pas besoin du pouce pour
// rester plein : il n'est pas dessiné avec une main.
// Le rouge : la flèche du geste, descendre le bout dans le seau (repère 3).

module.exports = (h) => {
  const A = h.a, F = h.formes;
  const f = v => Math.round(v * 10) / 10;
  const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const boyau = d => [
    h.path(d, 'fill="none" stroke="#1A1A1A" stroke-width="7" stroke-linecap="butt" stroke-linejoin="round"'),
    h.path(d, 'fill="none" stroke="#FFFFFF" stroke-width="3.8" stroke-linecap="butt" stroke-linejoin="round"'),
  ];
  // une chaudière évasée, son eau
  const chaudiere = (c, yEau) => {
    const px = (y, cote) => {
      const t = (c.yb - y) / (c.yb - c.yt);
      return cote === 'g' ? c.xb0 + (c.xt0 - c.xb0) * t : c.xb1 + (c.xt1 - c.xb1) * t;
    };
    const out = [];
    if (yEau != null) {
      const pts = [[px(yEau, 'g') + 1.2, yEau], [px(yEau, 'd') - 1.2, yEau], [c.xb1 - 1.2, c.yb - 1.2], [c.xb0 + 1.2, c.yb - 1.2]];
      out.push(h.chemin(pts, A.hachure('eau', 'aucun'), true), h.ligne(pts[0][0], yEau, pts[1][0], yEau, A.arete));
    }
    return { eau: out, bord: [
      h.chemin([[c.xt0, c.yt], [c.xb0, c.yb], [c.xb1, c.yb], [c.xt1, c.yt]], A.contour),
      h.ligne(c.xt0 - 3, c.yt, c.xt0 + 3, c.yt, A.contour), h.ligne(c.xt1 - 3, c.yt, c.xt1 + 3, c.yt, A.contour),
    ] };
  };
  const sol = (z, y) => [h.rect(0, y, z.l, 8, A.hachure('terre', 'aucun')), h.ligne(0, y, z.l, y, A.arete)];

  // ── 1 : noyer le boyau ──
  const geo1 = z => {
    const yS = z.h - 8, cx = z.l * 0.5;
    const c = { xt0: cx - 92, xt1: cx + 92, yt: 10, xb0: cx - 82, xb1: cx + 82, yb: yS };
    return { yS, cx, c, yEau: c.yt + 12 };
  };
  const remplir = z => {
    const g = geo1(z), out = [], ch = chaudiere(g.c, g.yEau);
    out.push(...sol(z, g.yS), ...ch.eau);
    // le boyau couché en boucles au fond, tout entier sous l'eau
    const y0 = g.yS - 11, cx = g.cx;
    const d = `M${f(cx - 66)},${f(y0)} C${f(cx - 66)},${f(y0 - 27)} ${f(cx + 10)},${f(y0 - 27)} ${f(cx + 10)},${f(y0 - 8)} `
      + `C${f(cx + 10)},${f(y0 + 6)} ${f(cx - 40)},${f(y0 + 6)} ${f(cx - 40)},${f(y0 - 12)} `
      + `C${f(cx - 40)},${f(y0 - 31)} ${f(cx + 62)},${f(y0 - 31)} ${f(cx + 62)},${f(y0 - 6)}`;
    out.push(...boyau(d));
    // les dernières bulles qui sortent du bout
    [[cx + 63, y0 - 16, 2.2], [cx + 61, y0 - 28, 2.8], [cx + 64, y0 - 41, 3.2]].forEach(([x, y, r]) => out.push(h.cercle(x, y, r, blanc(A.detail))));
    out.push(...ch.bord);
    return out.join('\n');
  };

  // ── 2 : boucher, descendre, lâcher ──
  const geo2 = z => {
    const yS = z.h - 8;
    const bil = { x0: 8, x1: 94, y0: yS - 46 };
    const c = { xt0: 5, xt1: 99, yt: yS - 46 - 64, xb0: 14, xb1: 90, yb: bil.y0 };
    const s = { xt0: z.l - 98, xt1: z.l - 24, yt: yS - 54, xb0: z.l - 92, xb1: z.l - 30, yb: yS };   // le seau receveur
    const xIn = 43, yIn = c.yb - 9;                      // le bout resté au fond de la chaudière
    const xP = (s.xt0 + s.xt1) / 2 - 2, yP = s.yt - 44;  // le centre du poing, au-dessus du seau
    return { yS, bil, c, s, xIn, yIn, xP, yP };
  };
  const BOUT = 12;   // le bout du boyau, au-dessus du centre du poing : sous le pouce
  const poing = g => F.mainStock({ id: 'poing-barre', objet: false, angle: -16, taille: 70, x: g.xP, y: g.yP });
  const amorcer = z => {
    const g = geo2(z), out = [];
    out.push(...sol(z, g.yS));
    // le billot
    out.push(h.rect(g.bil.x0, g.bil.y0, g.bil.x1 - g.bil.x0, g.yS - g.bil.y0, blanc(A.arete)));
    out.push(h.rect(g.bil.x1 - 14, g.bil.y0, 14, g.yS - g.bil.y0, A.ombre));
    out.push(h.ligne(g.bil.x0 + 26, g.bil.y0 + 10, g.bil.x0 + 26, g.yS - 10, A.detail));
    out.push(h.rect(g.bil.x0, g.bil.y0, g.bil.x1 - g.bil.x0, g.yS - g.bil.y0, A.contour));
    const ch = chaudiere(g.c, g.c.yt + 11), se = chaudiere(g.s, null);
    out.push(...ch.eau);
    // le boyau : du fond de la chaudière, par-dessus le bord, puis il redescend tout droit dans le poing
    const m = poing(g), o = m.objet;
    const yHaut = g.c.yt - 24;
    // le bout tenu pointe vers le haut, sous le pouce : le boyau passe à droite du poing, descend, fait un U sous le
    // poing et remonte dedans
    const xD = o.x + 26, yU = o.y + 20, r = (xD - o.x) / 2;
    const d = `M${f(g.xIn)},${f(g.yIn)} L${f(g.xIn)},${f(g.c.yt - 4)} Q${f(g.xIn)},${f(yHaut)} ${f(g.xIn + 22)},${f(yHaut)} `
      + `L${f(xD - 20)},${f(yHaut)} Q${f(xD)},${f(yHaut)} ${f(xD)},${f(yHaut + 20)} L${f(xD)},${f(yU)} `
      + `A${f(r)},${f(r)} 0 0 1 ${f(o.x)},${f(yU)} L${f(o.x)},${f(o.y - BOUT)}`;
    out.push(...boyau(d));
    out.push(...ch.bord, ...se.bord);
    out.push(String(m.svg));
    // le geste : descendre le bout dans le seau
    const xg = g.s.xt1 + 14;
    out.push(h.geste(`M${f(xg)},${f(g.yP - 20)} L${f(xg)},${f(g.s.yt + 18)}`));
    return out.join('\n');
  };

  return {
    ref: '10-08',
    titre: 'Amorcer un siphon sans la bouche',
    desc: 'Deux vignettes. En haut, une chaudière pleine d’eau, un boyau couché en boucles au fond, tout entier sous l’eau ; les dernières bulles sortent de son bout. En bas, la chaudière posée sur un billot : un bout du boyau reste au fond de l’eau, le boyau plein passe par-dessus le bord et redescend jusqu’à un poing qui tient l’autre bout, bouché sous le pouce, au-dessus d’un seau posé au sol, plus bas que la chaudière. Une flèche rouge montre qu’on descend ce bout dans le seau, puis qu’on le lâche.',
    format: 'quart',
    disposition: [['remplir'], ['amorcer']],
    hauteurs: [1.3, 2.1],
    vues: {
      remplir: {
        titre: 'Remplir le boyau',
        dessin: remplir,
        renvois: z => {
          const g = geo1(z);
          return [
            { n: 1, rond: [g.cx + 106, g.yEau - 3], cible: [g.cx + 66, g.yS - 30], texte: 'noyer le boyau jusqu’à la dernière bulle' },
          ];
        },
      },
      amorcer: {
        titre: 'Boucher, descendre, lâcher',
        dessin: amorcer,
        renvois: z => {
          const g = geo2(z), o = poing(g).objet;
          return [
            { n: 2, rond: [o.x - 56, g.yP - 6], cible: [o.x - 6, g.yP - 21], texte: 'boucher le bout avec le pouce' },
            { n: 3, rond: [g.s.xt1 + 14, g.s.yt + 38], cible: [g.s.xt1 + 14, g.s.yt + 20], texte: 'le descendre dans le seau, et lâcher' },
          ];
        },
      },
    },
  };
};
