// Planche 10-08 (petite planche, une colonne). Amorcer un siphon sans la bouche.
// Le texte : ch. 10, variante d'urgence, « Amorcer un siphon sans la bouche » : « On remplit le boyau complètement
// dans le contenant plein, on bouche les deux bouts avec les pouces, on en descend un dans le seau receveur et on
// lâche. » Le siphon sert à l'étape 8 (siphonner par-dessus le dépôt) et à la planche 10-01.
//
// Deux vignettes au même cadrage de la chaudière :
//   1. le boyau enroulé et noyé dans l'eau du haut de la chaudière pleine, au-dessus du dépôt sans le toucher, jusqu'à ce
//      qu'il ne sorte plus de bulles ;
//   2. un bout du boyau reste dans la chaudière, posée sur un billot, au-dessus du dépôt ; l'autre bout, bouché par
//      le pouce dans le poing, est descendu sur le coton tendu sur la chaudière du bas (étape 9 : une taie d'oreiller
//      pliée en deux, attachée sous le bord, comme à la planche 10-01), puis lâché.
// Le seau plus bas que l'eau de la chaudière : c'est la condition d'un siphon (géométrie des niveaux), le texte dit
// « on en descend un ». Aucune cote, aucun chiffre.
//
// La main (revue le 19 octobre 2026 : la version d'avant faisait moufle, sans un doigt lisible, et son avant-bras finissait
// en bout arrondi dans le vide) : h.formes.mainStock 'poing-barre' (1-01), tournée de 164° (la main vient d'en haut à
// droite, le pouce refermé en bas), rien de redessiné, rien de déformé.
//   - Le boyau descend dans le poing sur l'axe de l'objet du fichier et finit sous le pouce (repère 2).
//   - Entre les doigts, le boyau est la pièce de l'objet du fichier qui passe devant la paume (le bout des doigts posé
//     dessus), en blanc, découpée par la silhouette de la main : le reste de l'objet (au-dessus et sous le poing) n'est
//     pas dessiné. Le boyau a la largeur de cet objet, dans les deux vignettes, pour que les deux se raccordent.
//   - L'avant-bras continue les deux bords de la main (relevés sur le dessin de 1-01), se courbe doucement et sort par
//     le bord de la vue ; un fond blanc couvre le bout arrondi du fichier.
// (La 1-09 vue de dos faisait moufle ; la 2-07 laissait le bout du boyau entre l'index et le pouce, débouché : écartées.)
// Le bout resté dans l'eau n'a pas besoin du pouce pour rester plein : il n'est pas dessiné avec une main.
// Le rouge : la flèche du geste, descendre le bout sur le coton (repère 3).

module.exports = (h) => {
  const A = h.a, F = h.formes;
  const f = v => Math.round(v * 10) / 10;
  const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  // la main : 1-01 « poing-barre », sa taille dans la vue, et la largeur de son objet à cette taille
  const M101 = require('../../.claude/skills/planches/scripts/mains/stock.js').catalogue['1-01'];
  const TAILLE = 80, ANGLE = 164;
  const KM = TAILLE / Math.max(M101.boite[2] - M101.boite[0], M101.boite[3] - M101.boite[1]);
  const LB = Math.round(M101.objet.largeur * KM * 10) / 10;      // la largeur du boyau : celle de l'objet tenu
  const boyau = d => [
    h.path(d, `fill="none" stroke="#1A1A1A" stroke-width="${LB}" stroke-linecap="butt" stroke-linejoin="round"`),
    h.path(d, `fill="none" stroke="#FFFFFF" stroke-width="${f(LB - 3.2)}" stroke-linecap="butt" stroke-linejoin="round"`),
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
  // le dépôt au fond : un pointillé serré (comme à la planche 10-01)
  const alea = graine => {
    let t0 = graine >>> 0;
    return () => {
      t0 = (t0 + 0x6D2B79F5) >>> 0;
      let t = t0;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };
  const pointille = (x0, x1, y0, y1, graine, pas) => {
    const r = alea(graine), out = [];
    const n = Math.round(((x1 - x0) * (y1 - y0)) / pas);
    for (let i = 0; i < n; i++) out.push(h.cercle(x0 + r() * (x1 - x0), y0 + r() * (y1 - y0), 0.75, A.plein));
    return out;
  };
  // le coton : une taie d'oreiller pliée en deux, tendue sur le seau et attachée sous le bord (comme à la planche 10-01)
  const taie = (c, yC, xC) => {
    const xg = c.xt0, xd = c.xt1, yt = c.yt, out = [];
    const d = `M${f(xg - 6)},${f(yt + 20)} L${f(xg - 6)},${f(yt - 2)} Q${f(xg - 6)},${f(yt - 5)} ${f(xg + 2)},${f(yt - 4)} `
      + `C${f(xg + 20)},${f(yt + 3)} ${f(xC - 22)},${f(yC)} ${f(xC)},${f(yC)} `
      + `C${f(xC + 22)},${f(yC)} ${f(xd - 20)},${f(yt + 3)} ${f(xd - 2)},${f(yt - 4)} `
      + `Q${f(xd + 6)},${f(yt - 5)} ${f(xd + 6)},${f(yt - 2)} L${f(xd + 6)},${f(yt + 20)} L${f(xd + 2)},${f(yt + 20)} L${f(xd + 2)},${f(yt + 2)} `
      + `C${f(xd - 18)},${f(yt + 7)} ${f(xC + 22)},${f(yC + 5)} ${f(xC)},${f(yC + 5)} `
      + `C${f(xC - 22)},${f(yC + 5)} ${f(xg + 18)},${f(yt + 7)} ${f(xg - 2)},${f(yt + 2)} L${f(xg - 2)},${f(yt + 20)} Z`;
    out.push(h.path(d, blanc(A.arete)));
    out.push(h.rect(xg - 9, yt + 9, 5, 3.5, A.plein), h.rect(xd + 4, yt + 9, 5, 3.5, A.plein));
    out.push(h.path(`M${f(xd + 9)},${f(yt + 10.5)} q5,2 6,8 M${f(xd + 9)},${f(yt + 10.5)} q7,-1 9,5`, A.arete));
    return out;
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
    // le dépôt au fond, qu'on ne touche pas
    const yD = g.yS - 10, xg = g.c.xb0 + 1.5 + 2, xd = g.c.xb1 - 1.5 - 2;
    out.push(...pointille(xg, xd, yD + 1.5, g.yS - 2, 23, 7));
    out.push(h.path(`M${f(xg - 1)},${f(yD)} Q${f(g.cx - 30)},${f(yD - 2)} ${f(g.cx)},${f(yD)} T${f(xd + 1)},${f(yD)}`, A.detail));
    // le boyau enroulé, tout entier dans l'eau du haut, au-dessus du dépôt sans le toucher
    const y0 = yD - 9, cx = g.cx;
    const d = `M${f(cx - 66)},${f(y0)} C${f(cx - 66)},${f(y0 - 24)} ${f(cx + 10)},${f(y0 - 24)} ${f(cx + 10)},${f(y0 - 7)} `
      + `C${f(cx + 10)},${f(y0 + 4)} ${f(cx - 40)},${f(y0 + 4)} ${f(cx - 40)},${f(y0 - 10)} `
      + `C${f(cx - 40)},${f(y0 - 28)} ${f(cx + 62)},${f(y0 - 28)} ${f(cx + 62)},${f(y0 - 5)}`;
    out.push(...boyau(d));
    // les dernières bulles qui sortent du bout
    [[cx + 64, y0 - 14, 2.2], [cx + 62, y0 - 24, 2.8]].forEach(([x, y, r]) => out.push(h.cercle(x, y, r, blanc(A.detail))));
    out.push(...ch.bord);
    return out.join('\n');
  };

  // ── 2 : boucher, descendre, lâcher ──
  const geo2 = z => {
    const yS = z.h - 8;
    const bil = { x0: 8, x1: 94, y0: yS - 46 };
    const c = { xt0: 5, xt1: 99, yt: yS - 46 - 64, xb0: 14, xb1: 90, yb: bil.y0 };
    const s = { xt0: z.l - 110, xt1: z.l - 36, yt: yS - 54, xb0: z.l - 104, xb1: z.l - 42, yb: yS };   // le seau receveur
    const xIn = 43, yIn = c.yb - 17;                     // le bout resté dans la chaudière, au-dessus du dépôt
    const xP = (s.xt0 + s.xt1) / 2, yP = yS - 90;        // le centre du poing, au-dessus du coton, plus bas que l'eau
    const yC = s.yt + 22;                                 // le creux du coton
    return { yS, bil, c, s, xIn, yIn, xP, yP, yC };
  };
  // le poing tenu d'en haut : l'axe de l'objet est vertical ; le pouce ferme le bas du poing
  const optsMain = g => ({ id: 'poing-barre', objet: false, angle: ANGLE, taille: TAILLE, x: g.xP, y: g.yP });
  const poing = g => F.mainStock(optsMain(g));
  const bout = o => o.y + o.longueur * 0.27;              // le bout du boyau, caché sous le pouce
  // du fichier de la main à la vue : le même passage que mainStock (ancre : le centre de l'objet du fichier)
  const versVue = g => {
    const c = Math.cos(ANGLE * Math.PI / 180), s = Math.sin(ANGLE * Math.PI / 180), A0 = [M101.objet.x, M101.objet.y];
    return ([px, py]) => { const u = KM * (px - A0[0]), v = KM * (py - A0[1]); return [g.xP + c * u - s * v, g.yP + s * u + c * v]; };
  };
  // l'avant-bras : chaque bord part dans la direction du bord de la main (le dessus de (167,2 ; 434,3), le dessous de
  // (191,4 ; 596,1), relevés sur le dessin de 1-01), se courbe sur Lc jusqu'à l'axe de l'avant-bras en s'élargissant un
  // peu, puis file droit hors de la vue ; un fond blanc couvre le bout arrondi du fichier
  const avantBras = (g, Lc = 20, L = 200) => {
    const T = versVue(g);
    const dir = (p, d) => { const a = T(p), b = T([p[0] + d[0], p[1] + d[1]]), n = Math.hypot(b[0] - a[0], b[1] - a[1]); return [a, [(b[0] - a[0]) / n, (b[1] - a[1]) / n]]; };
    const [t0, dt] = dir([167.234, 434.336], [-53.5, -1.9]), [b0, db] = dir([191.436, 596.078], [-52.1, 14.2]);
    let ax = [dt[0] + db[0], dt[1] + db[1]]; const na = Math.hypot(ax[0], ax[1]); ax = [ax[0] / na, ax[1] / na];
    const w = [t0[0] - b0[0], t0[1] - b0[1]], s = w[0] * ax[0] + w[1] * ax[1], np = [w[0] - ax[0] * s, w[1] - ax[1] * s];
    const lw = Math.hypot(np[0], np[1]), n = [np[0] / lw, np[1] / lw], ev = lw * 0.05;
    const bord = (p0, d, sg) => {
      const e = [p0[0] + ax[0] * Lc + sg * n[0] * ev, p0[1] + ax[1] * Lc + sg * n[1] * ev];
      return { c1: [p0[0] + d[0] * Lc / 2, p0[1] + d[1] * Lc / 2], c2: [e[0] - ax[0] * Lc / 2, e[1] - ax[1] * Lc / 2], e, fin: [e[0] + ax[0] * L, e[1] + ax[1] * L] };
    };
    const H = bord(t0, dt, 1), B = bord(b0, db, -1), P = p => `${f(p[0])},${f(p[1])}`;
    const trait = 'fill="none" stroke="#1A1A1A" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"';
    return [
      h.path(`M${P(t0)} C${P(H.c1)} ${P(H.c2)} ${P(H.e)} L${P(H.fin)} L${P(B.fin)} L${P(B.e)} C${P(B.c2)} ${P(B.c1)} ${P(b0)} Z`, A.blanc),
      h.path(`M${P(t0)} C${P(H.c1)} ${P(H.c2)} ${P(H.e)} L${P(H.fin)} M${P(b0)} C${P(B.c1)} ${P(B.c2)} ${P(B.e)} L${P(B.fin)}`, trait),
    ].join('\n');
  };
  // le boyau entre les doigts : la même main avec son objet en blanc, découpée par la silhouette de la main ; il n'en
  // reste que la pièce de l'objet qui passe devant la paume, sous le bout des doigts
  const entreDoigts = g => {
    const m = F.mainStock(Object.assign(optsMain(g), { objet: true, objetCouleur: '#FFFFFF' }));
    const tr = String(m.svg).match(/transform="([^"]+)"/)[1];
    const dMain = M101.chemins.find(c => c.role === 'main').d;
    return `<clipPath id="poing-1008"><path d="${dMain}" transform="${tr}" fill="#FFFFFF" stroke="none"/></clipPath>\n<g clip-path="url(#poing-1008)">${m.svg}</g>`;
  };
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
    // le dépôt au fond de la chaudière du haut
    const yD = g.c.yb - 8;
    out.push(...pointille(g.c.xb0 + 3, g.c.xb1 - 3, yD + 1.5, g.c.yb - 2, 29, 7));
    out.push(h.path(`M${f(g.c.xb0 + 1.5)},${f(yD)} Q${f(g.c.xb0 + 30)},${f(yD - 2)} ${f((g.c.xb0 + g.c.xb1) / 2)},${f(yD)} T${f(g.c.xb1 - 1.5)},${f(yD)}`, A.detail));
    // le boyau : de la chaudière, par-dessus le bord, puis tout droit vers le bas jusque dans le poing
    const m = poing(g), o = m.objet;
    const yHaut = g.c.yt - 24;
    const d = `M${f(g.xIn)},${f(g.yIn)} L${f(g.xIn)},${f(g.c.yt - 4)} Q${f(g.xIn)},${f(yHaut)} ${f(g.xIn + 22)},${f(yHaut)} `
      + `L${f(o.x - 22)},${f(yHaut)} Q${f(o.x)},${f(yHaut)} ${f(o.x)},${f(yHaut + 22)} L${f(o.x)},${f(bout(o))}`;
    out.push(...boyau(d));
    out.push(...ch.bord, ...se.bord, ...taie(g.s, g.yC, o.x));
    // la main, le boyau entre ses doigts, l'avant-bras qui sort par le bord de la vue
    out.push(`<clipPath id="vue-amorcer-1008"><rect x="0" y="0" width="${z.l}" height="${z.h}" fill="#FFFFFF" stroke="none"/></clipPath>`);
    out.push(`<g clip-path="url(#vue-amorcer-1008)">`, String(m.svg), entreDoigts(g), avantBras(g), '</g>');
    // le geste : descendre le bout sur le coton
    out.push(h.geste(`M${f(o.x)},${f(bout(o) + 6)} L${f(o.x)},${f(g.yC - 3)}`));
    return out.join('\n');
  };

  return {
    ref: '10-08',
    titre: 'Amorcer un siphon sans la bouche',
    desc: 'Deux vignettes. En haut, une chaudière pleine d’eau, un dépôt au fond et, au-dessus sans le toucher, un boyau enroulé tout entier sous l’eau ; les dernières bulles sortent de son bout. En bas, la chaudière posée sur un billot : un bout du boyau reste dans l’eau, au-dessus du dépôt ; le boyau plein passe par-dessus le bord et descend tout droit dans un poing fermé, tenu d’en haut, l’avant-bras qui vient de la droite : le bout des doigts serre le boyau et le pouce, refermé sous le poing, bouche le bout ; le poing est au-dessus du seau du bas, coiffé d’une taie d’oreiller pliée en deux et attachée sous le bord, plus bas que l’eau de la chaudière. Une flèche rouge descend du bout jusqu’au creux du coton : on le descend, puis on le lâche.',
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
          const g = geo2(z), o = poing(g).objet, yb = bout(o);
          return [
            { n: 2, rond: [o.x - 58, yb - 4], cible: [o.x - 6, yb - 1], texte: 'boucher le bout avec le pouce' },
            { n: 3, rond: [o.x - 36, g.yS - 18], cible: [o.x, g.yC + 5], texte: 'le descendre sur le coton, et lâcher' },
          ];
        },
      },
    },
  };
};
