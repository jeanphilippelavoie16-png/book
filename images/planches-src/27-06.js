// Planche 27-06 — Ouvrir la bulle (ch. 27, §9 « La lame qui ouvre la bulle » ; §3 le pus qui
// sort de l'os ; 5-C, étape 16 ; tableau des signes, lignes « bulle » et « enflure sous la langue »).
// Cotes : aucune. Le chapitre ne donne aucune dimension de la bulle ni de la lame.
// Ce que la planche montre, et d'où ça vient dans le chapitre :
//   - la bulle : « un bouton mou, jaunâtre, qui bombe sur la gencive à côté de la dent malade »,
//     « vis-à-vis du bout de la racine » ; la dent malade est celle qui répond au tapotement ;
//   - le pus : né au bout de la racine, dans l'os ; « s'il sort par la gencive, il fait une bulle » ;
//   - le geste : « piquer au sommet, laisser couler, rincer à l'eau tiède bouillie » ;
//     la lame : pointe fine, 30 min à l'autoclave, sinon 30 min bouillie à couvert, refroidie
//     sans être touchée ni essuyée ;
//   - après : « le pus sort, la cause reste. La bulle se remplira » ;
//   - ce qu'on n'ouvre pas : l'enflure dure et large, sous la langue, sous le menton, dans le cou,
//     « dure comme une planche, sans poche de pus » ; langue soulevée, plancher de la bouche dur ;
//     ni la joue ni la peau du visage.
// Les vues : la mâchoire du bas, côté droit. En haut à gauche, les dents vues de la joue (joue
// écartée) ; les trois autres, la même coupe de face à travers la dent malade (joue à gauche,
// langue à droite), à la même échelle, les hauteurs alignées sur la première rangée.
// Trames : os en hachure à 45° ; pus en pointillé ; enflure dure en quadrillage ; chair (joue,
// gencive, langue, plancher, menton) en tireté horizontal ; dent et air en blanc.
//
// La charte : pas de gris, les trois coupes ont chacune leurs trames. Le rouge : le cercle sur le
// sommet de la bulle, là où la pointe se pose. La flèche du pus qui coule reste noire.

module.exports = (h) => {
  const BL = h.a.blanc.split(' ')[0];
  const plein = t => t.replace('fill="none"', BL);
  const r1 = v => Math.round(v * 10) / 10;
  const f = p => `${r1(p[0])},${r1(p[1])}`;

  // Courbe lisse qui passe par chaque point (Catmull-Rom).
  const cr = (pts, ferme = false) => {
    const n = pts.length;
    const P = i => ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
    let d = `M${f(pts[0])}`;
    const fin = ferme ? n : n - 1;
    for (let i = 0; i < fin; i++) {
      const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C${f(c1)} ${f(c2)} ${f(p2)}`;
    }
    return ferme ? d + ' Z' : d;
  };

  // Deux cadres : la coupe (même échelle pour les trois) et les dents vues de la joue.
  const fenetre = (X0, Y0, BW, BH) => z => {
    const s = Math.min((z.l - 4) / BW, (z.h - 4) / BH);
    const ox = (z.l - BW * s) / 2 - X0 * s, oy = (z.h - BH * s) / 2 - Y0 * s;
    const P = p => [ox + p[0] * s, oy + p[1] * s];
    return { s, P, M: pts => pts.map(P) };
  };
  const cadre = fenetre(12, 36, 237, 262);
  const cadreE = fenetre(46, 14, 218, 228);

  // Cassure : le trait continue au-delà du dessin.
  const brisure = (A, B) => {
    const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy), u = [dx / L, dy / L], n = [-u[1], u[0]];
    const m = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
    const q = (a, b) => [m[0] + u[0] * a + n[0] * b, m[1] + u[1] * a + n[1] * b];
    return h.chemin([A, q(-5, 0), q(-2, 5), q(2, -5), q(5, 0), B], h.a.fin);
  };

  const pus = d => h.path(d, h.a.blanc) + '\n' + h.path(d, h.a.hachure('neige', 'detail'));

  // ─── La coupe de face à travers la dent malade (repère de base) ─────────────────────
  const DENT = [[150, 166], [145, 161], [140, 140], [136, 110], [134, 86], [129, 74], [127, 61], [131, 49], [139, 40],
    [145, 44], [151, 53], [156, 48], [162, 45], [169, 51], [173, 61], [171, 74], [166, 86], [164, 110], [160, 140], [155, 161]];
  const EMAIL = [[136, 84], [133, 72], [133, 59], [139, 48.5], [145, 52], [151, 61], [157, 55], [162, 52], [167, 58], [168, 70], [165, 84]];
  const PULPE = [[143, 84], [141.5, 70], [143, 63], [147, 67], [150, 71], [153, 67], [157, 64], [158.5, 70], [157, 84],
    [155, 112], [153, 140], [151, 162], [149, 162], [147, 140], [145, 112]];
  const CARIE = [[145.5, 45.5], [151, 53], [155.5, 48.5], [158, 56], [156, 64], [153, 70], [150, 72], [147, 69], [145, 61], [144.5, 52]];
  const OS = [[129, 96], [124, 120], [118, 150], [114, 185], [115, 215], [124, 236], [145, 246], [168, 240], [182, 222],
    [187, 195], [185, 160], [179, 125], [171, 96]];
  const POCHE = [[163, 172], [160, 181], [150, 184], [140, 181], [137, 172], [140, 163], [150, 161], [160, 163]];
  // pus de la poche à la bulle, à travers l'os du côté de la joue
  const PUS_BULLE = [[163, 172], [160, 181], [150, 184], [140, 181], [128, 180], [118, 184], [113, 188], [106, 186], [99.5, 181],
    [95.5, 175], [94.5, 170], [96, 164], [100.5, 158], [106, 153], [114, 150], [119, 157], [130, 165], [140, 163], [150, 161], [160, 163]];
  const PUS_VIDE = [[163, 172], [160, 181], [150, 184], [140, 181], [128, 180], [118, 184], [113, 188], [108.5, 185], [104, 180],
    [100.5, 174], [99, 169], [100.5, 163], [105, 157], [111, 152], [115, 150], [119, 157], [130, 165], [140, 163], [150, 161], [160, 163]];
  // pus de la poche vers le bas, à travers l'os du côté de la langue
  const PUS_DUR = [[138, 170], [142, 163], [150, 161], [158, 163], [166, 170], [176, 177], [188, 184], [189, 197], [176, 191],
    [164, 183], [150, 185], [140, 181]];

  // la gencive côté joue, la bulle, le fond du repli, l'intérieur de la joue écartée
  const G_HAUT = [[134, 86], [126, 96], [119, 120], [114, 145]];
  const BULLE = [[108, 149], [101, 154], [95, 161], [91.5, 168], [91, 172], [93, 178], [98, 185], [104, 190]];
  const G_BAS = [[107.5, 195], [104, 206], [96, 216], [86, 213], [74, 202], [64, 182], [56, 152], [51, 115], [48, 80], [46, 38]];
  const LISSE = [[111, 170], [108.5, 192]];
  const VIDE_H = [[110, 150], [104, 156], [99.5, 162]];
  const VIDE_B = [[99.5, 176], [103, 183], [106.5, 189]];
  // côté langue : gencive, plancher de la bouche, langue
  const LANGUE = [[166, 86], [175, 98], [182, 125], [187, 155], [192, 176], [199, 186], [207, 183], [213, 165], [211, 140],
    [205, 115], [199, 95], [200, 75], [212, 58], [230, 49], [247, 46]];
  const LANGUE_DUR = [[166, 86], [174, 97], [180, 113], [186, 126], [195, 132], [205, 128], [210, 110], [205, 90], [203, 68],
    [210, 53], [226, 43], [247, 39]];
  const PEAU = [[24, 38], [22, 70], [23, 120], [27, 165], [35, 200], [48, 232], [70, 254], [100, 266], [140, 272], [180, 273], [215, 270], [247, 266]];
  const PEAU_DUR = [[24, 38], [22, 70], [23, 120], [27, 165], [35, 200], [48, 234], [70, 264], [100, 282], [140, 290], [180, 291], [215, 287], [247, 281]];
  const ZONE = [[184, 134], [191, 140], [201, 141], [213, 135], [226, 127], [247, 121], [247, 276], [215, 281], [180, 284],
    [145, 281], [118, 272], [112, 262], [128, 257], [150, 255], [170, 250], [182, 238], [190, 220], [192, 195], [190, 162]];

  const coupe = (z, etat) => {
    const { P, M } = cadre(z);
    const L = (pts, a = h.a.arete, ferme = false) => h.path(cr(M(pts), ferme), a);
    const out = [];
    const dur = etat === 'dure';
    out.push('<defs><pattern id="h-chair" width="12" height="6" patternUnits="userSpaceOnUse"><line x1="1" y1="2" x2="6" y2="2" stroke="#1A1A1A" stroke-width="0.35"/><line x1="7" y1="5" x2="11" y2="5" stroke="#1A1A1A" stroke-width="0.35"/></pattern></defs>');
    const suite = pts => cr(M(pts)).replace(/^M/, ' L');
    // la chair (joue, gencive, langue, plancher, menton) en tireté horizontal ; l'air en blanc
    out.push(h.path(cr(M(dur ? PEAU_DUR : PEAU)) + ` L${f(P([247, 38]))} L${f(P([24, 38]))} Z`, 'fill="url(#h-chair)" stroke="none"'));
    const gl = etat === 'bulle' ? cr(M([...G_HAUT, ...BULLE, ...G_BAS]))
      : etat === 'coule' ? cr(M([...G_HAUT, ...VIDE_H])) + suite([...VIDE_B, ...G_BAS])
      : cr(M([...G_HAUT, ...LISSE, ...G_BAS.slice(1)]));
    out.push(h.path(gl + ` L${f(P([46, 30]))} L${f(P([150, 30]))} Z`, h.a.blanc));
    out.push(h.path(cr(M(dur ? LANGUE_DUR : LANGUE)) + ` L${f(P([247, 30]))} L${f(P([150, 30]))} L${f(P([150, 86]))} Z`, h.a.blanc));
    if (dur) out.push(h.path(cr(M(ZONE), true), h.a.blanc));
    if (dur) out.push(h.path(cr(M(ZONE), true), h.a.hachure('grillage', 'fin')));
    out.push(h.path(cr(M(OS)) + ' Z', h.a.blanc));
    out.push(h.path(cr(M(OS)) + ' Z', h.a.hachure('metal', 'arete')));
    if (etat === 'bulle') out.push(pus(cr(M(PUS_BULLE), true)));
    else if (etat === 'coule') out.push(pus(cr(M(PUS_VIDE), true)));
    else out.push(pus(cr(M(PUS_DUR), true)));
    // la dent
    out.push(L(DENT, plein(h.a.contour), true));
    out.push(pus(cr(M(PULPE), true)));
    out.push(L(EMAIL, h.a.detail));
    out.push(h.path(cr(M(CARIE), true), h.a.plein));
    // côté joue
    if (etat === 'bulle') {
      out.push(L([...G_HAUT, ...BULLE, ...G_BAS]));
      out.push(L([[114, 145], ...BULLE, [107.5, 195]], h.a.contour));
    } else if (etat === 'coule') {
      // le pus qui coule le long de la gencive jusqu'au fond du repli
      const FILET = [[99.5, 163], [95, 167], [94, 174], [97, 183], [100.5, 192], [98.5, 203], [95, 211], [99, 214.5], [103.5, 206],
        [106, 197], [104.5, 189], [101, 182], [99.5, 175]];
      out.push(pus(cr(M(FILET), true)));
      out.push(L([...G_HAUT, ...VIDE_H]));
      out.push(L([...VIDE_B, ...G_BAS]));
      out.push(h.fleche(cr(M([[85, 166], [83, 182], [84, 198]])), h.a.arete));
    } else {
      out.push(L([...G_HAUT, ...LISSE, ...G_BAS.slice(1)]));
    }
    // côté langue, la peau, les cassures
    out.push(L(dur ? LANGUE_DUR : LANGUE));
    out.push(L(dur ? PEAU_DUR : PEAU));
    out.push(brisure(P([24, 38]), P([46, 38])));
    out.push(brisure(P([247, dur ? 39 : 46]), P([247, dur ? 281 : 266])));
    if (etat === 'bulle') {
      out.push(lame(P));
      const [cx, cy] = P(LAME.T);                  // le sommet, là où la pointe se pose
      out.push(h.controle(cx, cy, 13));
    }
    return out.join('\n');
  };

  // La lancette : une pointe fine, posée perpendiculaire au point le plus saillant de la bulle,
  // venue d'en haut par le repli, la joue écartée.
  const LAME = { T: [93.5, 164.5], a: 28, L: 50, W: 5 };
  const lame = P => {
    const { T, a, L, W } = LAME;
    const u = [-Math.cos(a * Math.PI / 180), -Math.sin(a * Math.PI / 180)], n = [-u[1], u[0]];
    const at = (s, e) => P([T[0] + u[0] * s + n[0] * e, T[1] + u[1] * s + n[1] * e]);
    const e = s => W / 2 * Math.min(1, s / 16);
    const haut = [], bas = [];
    for (let s = 0; s <= L; s += 4) { haut.push(at(s, e(s))); bas.push(at(s, -e(s))); }
    haut.push(at(L, W / 2)); bas.push(at(L, -W / 2));
    const forme = [...haut, ...bas.reverse()];
    return [
      h.chemin(forme, h.a.blanc, true),
      h.chemin(forme, h.a.contour, true),
      h.chemin([at(4, 0), at(L, 0)], h.a.fin),
      brisure(at(L, -W / 2 - 1), at(L, W / 2 + 1)),
    ].join('\n');
  };

  // ─── Les dents vues de la joue (joue écartée) ───────────────────────────────────────
  const COURONNES = [
    // première molaire : trois pointes
    [[76, 47], [82, 44], [88, 47], [93, 50], [100, 44], [106, 47], [112, 50], [118, 45], [124, 47], [130, 54], [129, 66], [126, 78],
      [124, 94], [77, 94], [74, 78], [71.5, 66], [71, 54]],
    // deuxième prémolaire : la dent malade
    [[150, 40], [158, 43], [165, 48], [168.5, 54], [168, 64], [165, 76], [163, 94], [137, 94], [135, 76], [132, 64], [131.5, 54], [135, 48], [142, 43]],
    // première prémolaire
    [[188.5, 38], [196.5, 41], [203.5, 47], [207.25, 54], [206.5, 64], [203.5, 76], [201.5, 94], [175.5, 94], [173.5, 76], [170.5, 64], [169.75, 54], [173.5, 47], [180.5, 41]],
    // canine
    [[227, 30], [231, 34], [236, 39], [241, 45], [246, 55], [245, 68], [242, 80], [239, 96], [215, 96], [212, 80], [209, 68], [208, 55], [213, 45], [218, 39], [223, 34]],
  ];
  const RACINES = [
    [[77, 90], [78, 120], [82, 150], [86, 161], [90, 158], [93, 130], [97, 104], [101, 98], [105, 104], [109, 130], [112, 156], [116, 164], [120, 160], [122, 130], [124, 90]],
    [[137, 90], [139, 120], [143, 150], [147, 164], [150, 167], [153, 164], [157, 150], [161, 120], [163, 90]],
    [[175.5, 90], [177.5, 120], [181.5, 150], [185.5, 166], [188.5, 169], [191.5, 166], [195.5, 150], [199.5, 120], [201.5, 90]],
    [[215, 92], [216, 130], [220, 165], [224, 183], [227, 187], [230, 183], [234, 165], [238, 130], [239, 92]],
  ];
  const BORD = [[52, 74], [62, 70], [71, 66], [86, 82], [100.75, 90], [116, 82], [130.75, 66], [140, 80], [150, 88], [160, 80],
    [169.25, 66], [179, 80], [188.5, 88], [198, 80], [207.75, 66], [217, 82], [227, 90], [237, 82], [246.25, 66], [252, 71], [258, 74]];
  const REPLI = 214;

  const gencive = z => {
    const { P, M, s } = cadreE(z);
    const out = [];
    for (const c of COURONNES) out.push(h.path(cr(M(c), true), plein(h.a.contour)));
    out.push(h.path(cr(M(BORD)) + ` L${f(P([258, REPLI]))} L${f(P([52, REPLI]))} Z`, h.a.blanc));
    out.push(h.path(cr(M(BORD)), h.a.arete));
    for (const r of RACINES) out.push(h.path(cr(M(r)), h.a.cache));
    out.push(h.chemin([P([52, REPLI]), P([258, REPLI])], h.a.arete));
    out.push(brisure(P([52, 74]), P([52, REPLI])));
    out.push(brisure(P([258, 74]), P([258, REPLI])));
    // la carie sur la couronne de la dent malade
    out.push(h.path(cr(M([[146, 47], [151, 45.5], [156, 49], [155.5, 55], [151, 58], [146.5, 54.5]]), true), h.a.plein));
    // la bulle, vis-à-vis du bout de la racine : un dôme, ombré en bas à droite
    const [bx, by] = P([150, 170]);
    out.push(h.ellipse(bx, by, 16 * s, 15 * s, plein(h.a.contour)));
    for (const [a0, a1] of [[-10, 60], [5, 75], [20, 90]]) {
      const k = 16 - (a0 + 10) / 15 * 2.2;
      const q = a => P([150 + k * Math.cos(a * Math.PI / 180), 170 + k * 0.94 * Math.sin(a * Math.PI / 180)]);
      out.push(h.path(`M${f(q(a0))} A${r1(k * s)} ${r1(k * 0.94 * s)} 0 0 1 ${f(q(a1))}`, h.a.fin));
    }
    // la pointe jaunâtre au sommet
    for (const [dx, dy] of [[0, 0], [-2.6, -1.8], [2.4, -2], [-2.2, 2.2], [2.6, 1.8], [0, -3.6], [0.3, 3.4], [-3.4, 0.4], [3.4, 0]]) {
      const [x, y] = P([148 + dx, 167.5 + dy]);
      out.push(h.cercle(x, y, 0.8, h.a.plein));
    }
    // le trait de coupe : à travers la dent malade et la bulle ; les flèches regardent vers le fond
    const mixte = 'fill="none" stroke="#1A1A1A" stroke-width="0.7" stroke-linecap="round" stroke-dasharray="14 3 2 3"';
    const [xc, ya] = P([150, 24]), [, yb] = P([150, 204]), Lb = 26 * s, k = 3.6;
    const bout = y => [
      h.ligne(f([xc, y]).split(',')[0], f([xc, y]).split(',')[1], r1(xc - Lb + 5), r1(y), h.a.arete),
      h.path(`M${r1(xc - Lb)},${r1(y)} L${r1(xc - Lb + 2.2 * k)},${r1(y - k)} L${r1(xc - Lb + 2.2 * k)},${r1(y + k)} Z`, h.a.plein),
    ].join('\n');
    out.push(h.ligne(r1(xc), r1(ya), r1(xc), r1(yb), mixte), bout(ya), bout(yb));
    return out.join('\n');
  };

  const R = (z, p) => cadre(z).P(p);
  const RE = (z, p) => cadreE(z).P(p);

  return {
    ref: '27-06',
    titre: 'Ouvrir la bulle',
    desc: 'La mâchoire du bas, côté droit. En haut à gauche, les dents vues de la joue écartée : sur la gencive, vis-à-vis du bout de la racine de la dent cariée, une bulle ronde avec sa pointe au sommet ; un trait de coupe passe à travers la dent et la bulle. Les trois autres vues sont la même coupe de face à travers la dent malade, joue à gauche, langue à droite : le pus né au bout de la racine traverse l’os vers la gencive et gonfle la bulle, une pointe fine de lancette se pose perpendiculaire à son point le plus saillant ; la bulle ouverte se vide le long de la gencive, la poche au bout de la racine reste ; enfin l’enflure dure, qui passe sous la langue et sous le menton, soulève la langue et le plancher de la bouche et n’a pas de poche à ouvrir.',
    format: 'pleine',
    disposition: [['gencive', 'piquer'], ['couler', 'dure']],
    vues: {
      gencive: {
        titre: 'La bulle, joue écartée',
        dessin: z => gencive(z),
        renvois: z => [
          { n: 1, rond: RE(z, [178, 22]), cible: RE(z, [153, 51]), texte: 'la dent malade : elle répond au tapotement' },
          { n: 2, rond: RE(z, [95, 232]), cible: RE(z, [141, 180]), texte: 'bulle molle, jaunâtre, face au bout de la racine' },
        ],
      },
      piquer: {
        titre: 'Piquer au sommet',
        dessin: z => coupe(z, 'bulle'),
        renvois: z => [
          { n: 3, rond: R(z, [96, 50]), cible: R(z, [68, 151]), texte: 'pointe fine, autoclavée ou bouillie 30 min' },
          { n: 4, rond: R(z, [76, 234]), cible: R(z, [93.5, 164.5]), texte: 'piquer au sommet, là où elle pointe' },
          { n: 5, rond: R(z, [32, 284]), cible: R(z, [41, 216]), texte: 'joue, peau du visage : jamais de lame' },
        ],
      },
      couler: {
        titre: 'Laisser couler',
        dessin: z => coupe(z, 'coule'),
        renvois: z => [
          { n: 6, rond: R(z, [76, 234]), cible: R(z, [98, 200]), texte: 'laisser couler, rincer à l’eau tiède bouillie' },
          { n: 7, rond: R(z, [228, 218]), cible: R(z, [160, 177]), texte: 'la poche reste : la bulle se remplira' },
        ],
      },
      dure: {
        titre: 'L’enflure dure : pas de lame',
        dessin: z => coupe(z, 'dure'),
        renvois: z => [
          { n: 8, rond: R(z, [226, 206]), cible: R(z, [204, 168]), texte: 'dure comme une planche, sans poche de pus' },
          { n: 9, rond: R(z, [188, 46]), cible: R(z, [228, 62]), texte: 'langue soulevée, plancher de la bouche dur' },
          { n: 10, rond: R(z, [56, 284]), cible: R(z, [104, 283]), texte: 'sous le menton, dans le cou : partir' },
        ],
      },
    },
    danger: 'Danger — un enfant de 4 ou 6 ans ne reste pas immobile une lame dans la bouche : chez lui, pas de lame. Rinçages tièdes et linge chaud jusqu’à ce que la bulle crève d’elle-même.',
  };
};
