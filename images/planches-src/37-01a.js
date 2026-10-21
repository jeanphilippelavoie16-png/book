// Planche 37-01a — Le sauna de truie, en coupe et en plan (ch. 37, section 5-A, étapes 1 à 9 ;
// étape 25 pour l'avertisseur).
// Ce que le chapitre donne : deux pièces, la chaude et le vestiaire (banc, avertisseur de CO) ;
// deux bancs ; porte qui s'ouvre vers l'extérieur, sans loquet ; truie du ch. 83 couchée sur un
// caisson de sable ; cage à pierres sur ses propres piles, sur le baril et pas autour du tuyau ;
// pare-étincelles au bout du tuyau (mailles d'au plus 1 cm) ; écran de tôle avec jeu d'air sur les
// murs que la truie voit ; rampe de fer entre la truie et le passage ; carré d'environ 1 m libre
// devant la porte du foyer ; entrée d'air basse près du poêle, sortie haute à l'opposé ; petite
// fenêtre, la lampe de l'autre côté de la vitre ; avertisseur à 2 m ou plus du poêle, loin de la
// porte de la pièce chaude.
// Cotes : ≈ 1000 (carré libre) et ≥ 2000 (avertisseur). Aucune autre : le chapitre ne donne pas les
// dimensions du bâtiment. Les proportions sont celles d'un petit sauna et d'un baril de 205 L.
// La charte : l'intérieur du baril, vu par la coupe, et la vitre de la petite fenêtre (la lampe
// est dehors, derrière) en gris loin. Pas d'autre gris : le reste est coupé et hachuré, et la vue
// en plan est à plat. Le rouge : le carré libre devant la porte du foyer, là où tombe la braise
// quand on charge (la zone).
// Unités du dessin : le millimètre, ramené à l'échelle S (px par mm), la même pour les deux vues.
module.exports = (h) => {
  const A = h.a;
  const W = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const f = v => Math.round(v * 10) / 10;
  const S = 0.089;
  const XMIN = -850, XMAX = 5600;
  const ox = z => (z.l - (XMAX - XMIN) * S) / 2;
  const pointille = A.fin + ' stroke-dasharray="2.5 2.5"';

  // un caillou arrondi, irrégulier mais toujours le même (graine fixe)
  const alea = g => { let t = g * 7919 % 233280; return () => { t = (t * 9301 + 49297) % 233280; return t / 233280; }; };
  const caillou = (cx, cy, rx, ry, g, at = W(A.arete)) => {
    const r = alea(g), n = 8, p = [];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * 2 * Math.PI + (r() - 0.5) * 0.35, k = 0.86 + r() * 0.2;
      p.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]);
    }
    let d = `M${f(p[0][0])} ${f(p[0][1])}`;
    for (let i = 0; i < n; i++) {
      const p0 = p[(i - 1 + n) % n], p1 = p[i], p2 = p[(i + 1) % n], p3 = p[(i + 2) % n];
      d += ` C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
    }
    return h.path(d + ' Z', at);
  };

  // ── En coupe, dans l'axe de la truie (regard vers le mur du fond) ─────────────────────────
  const coupe = z => {
    const X = x => ox(z) + (x - XMIN) * S;
    const Y = t => z.h - 6 - (t + 100) * S;
    const R = (x1, t1, x2, t2, at) => h.rect(X(x1), Y(t2), (x2 - x1) * S, (t2 - t1) * S, at);
    const L = (x1, t1, x2, t2, at) => h.ligne(X(x1), Y(t1), X(x2), Y(t2), at);
    const o = [];

    // ── le fond : ce qui est sur le mur du fond, derrière le plan de coupe
    // écran de tôle derrière la truie : panneaux, et les entretoises qui le tiennent décollé
    o.push(R(2150, 500, 3450, 2450, A.detail), L(2800, 500, 2800, 2450, A.fin));
    for (const x of [2210, 2740, 2860, 3390]) for (const t of [620, 1450, 2330]) o.push(h.cercle(X(x), Y(t), 1.1, A.plein));
    // entrée d'air basse, trappe de bois poussée à moitié
    o.push(R(3480, 480, 3780, 640, A.arete), R(3640, 470, 3800, 650, W(A.detail)), R(3640, 470, 3800, 650, A.hachure('bois', 'detail')));
    // petite fenêtre, et la lampe dehors, vue à travers la vitre
    o.push(R(3800, 1150, 4200, 1650, W(A.arete)), R(3835, 1185, 4165, 1615, A.loin), R(3835, 1185, 4165, 1615, A.detail));
    const lx = 4000;
    o.push(R(lx - 55, 1225, lx + 55, 1280, W(A.detail)));                                      // réservoir
    o.push(h.ellipse(X(lx), Y(1375), 40 * S, 95 * S, W(A.detail)));                             // verre
    o.push(h.path(`M${f(X(lx))} ${f(Y(1330))} Q${f(X(lx + 18))} ${f(Y(1370))} ${f(X(lx))} ${f(Y(1410))} Q${f(X(lx - 18))} ${f(Y(1370))} ${f(X(lx))} ${f(Y(1330))} Z`, A.plein)); // flamme
    o.push(R(lx - 50, 1470, lx + 50, 1500, W(A.detail)));                                       // chapeau
    o.push(h.path(`M${f(X(lx - 45))} ${f(Y(1500))} Q${f(X(lx))} ${f(Y(1600))} ${f(X(lx + 45))} ${f(Y(1500))}`, A.detail)); // anse
    // banc du vestiaire, le long du mur du fond
    o.push(R(600, 900, 1850, 945, W(A.arete)));
    for (const x of [650, 1205, 1760]) o.push(R(x, 450, x + 40, 900, W(A.arete)));
    // avertisseur de CO sur le mur de bout du vestiaire
    o.push(R(150, 1950, 195, 2090, W(A.arete)), R(160, 2010, 185, 2060, A.detail));

    // ── la truie et sa cage (ch. 83 ; cage : planche b)
    const xa = 2350, xb = 3230, tB = 700, tT = 1270;          // le baril couché
    const tP = 1400, tG = 1425;                                // dessus des piles, fond de la cage
    // caisson de sable
    o.push(R(2250, 450, 3330, 600, A.hachure('gravier', 'aucun')), L(2270, 600, 3310, 600, A.detail));
    o.push(R(2250, 450, 2270, 615, W(A.arete)), R(3310, 450, 3330, 615, W(A.arete)));
    // la pile du fond, derrière le baril : vue dessous et dessus, cachée entre les deux
    // bord droit en retrait du bout du baril, pour que les deux arêtes cachées se lisent
    const bande = (t1, t2, g) => {
      const r = [R(2660, t1, 3130, t2, W(A.arete))], ry = (t2 - t1) / 2 - 6, rx = 52;
      let k = g;
      for (let x = 2660 + rx + 4; x < 3130 - rx + 4; x += 2 * rx + 10) r.push(caillou(X(x), Y((t1 + t2) / 2), rx * S, ry * S, k++));
      return r.join('\n');
    };
    o.push(bande(600, tB, 80), bande(tT, tP, 90));
    // l'intérieur du baril, vu par la coupe : gris loin, sous les arêtes cachées de la pile du fond
    o.push(R(xa, tB + 90, xb, tT, A.loin));
    o.push(L(2660, tB, 2660, tT, A.cache), L(3130, tB, 3130, tT, A.cache));
    // pattes
    for (const x of [2430, 3150]) o.push(R(x - 25, 600, x + 25, tB, W(A.arete)));
    // coque coupée : dessus, dessous, bouts, cerceaux ; lit de sable dedans
    o.push(R(xa + 8, tB, xb - 8, tB + 90, A.hachure('gravier', 'aucun')), L(xa + 8, tB + 90, xb - 8, tB + 90, A.fin));
    o.push(L(xa, tB, xb, tB, A.contour), L(xa, tT, 2375, tT, A.contour), L(2525, tT, xb, tT, A.contour));
    o.push(L(xa, tB, xa, tT, A.contour));
    o.push(L(xb, tB, xb, 830, A.contour), L(xb, 1110, xb, tT, A.contour));   // bout de la porte
    o.push(R(xb, 830, xb + 22, 1110, W(A.arete)), R(xb + 22, 950, xb + 70, 990, A.plein)); // porte et sa barre
    for (const x of [2643, 2937]) {
      o.push(h.path(`M${f(X(x - 45))} ${f(Y(tT))} Q${f(X(x))} ${f(Y(tT + 30))} ${f(X(x + 45))} ${f(Y(tT))}`, A.arete));
      o.push(h.path(`M${f(X(x - 45))} ${f(Y(tB))} Q${f(X(x))} ${f(Y(tB - 30))} ${f(X(x + 45))} ${f(Y(tB))}`, A.arete));
    }
    // barres de fer coupées, posées sur la pile ; fers debout ; fond de treillis
    for (const x of [2720, 3070]) o.push(R(x - 10, tP, x + 10, 1810, W(A.arete)));
    for (const x of [2720, 2895, 3070]) o.push(R(x - 13, tP, x + 13, tG, A.plein));
    o.push(L(2715, tG, 3185, tG, A.arete));
    // les pierres : grosses en bas, petites en haut
    const pierres = [
      [2805, 1485, 72, 58], [2950, 1482, 70, 56], [3095, 1485, 70, 58],
      [2865, 1590, 60, 50], [3020, 1592, 62, 52],
      [2800, 1600, 42, 44], [3120, 1595, 45, 46],
      [2940, 1685, 55, 45], [2830, 1685, 42, 38], [3060, 1685, 44, 40],
      [2945, 1760, 44, 36],
    ];
    pierres.forEach(([x, t, rx, ry], i) => o.push(caillou(X(x), Y(t), rx * S, ry * S, i + 3)));

    // le tuyau : collet, traversée du toit, pare-étincelles
    // le tuyau passe devant l'écran : ses traits ne se voient pas au travers
    o.push(R(2375, tT, 2525, 2550, A.blanc));
    o.push(L(2375, tT, 2375, 3300, A.contour), L(2525, tT, 2525, 3300, A.contour));

    // ── ce que la coupe tranche
    // sol, piliers, plancher
    o.push(R(XMIN + 150, -100, XMAX - 150, 0, A.hachure('terre', 'aucun')), L(XMIN + 150, 0, XMAX - 150, 0, A.arete));
    for (const x of [0, 2500, 5000]) o.push(R(x, 0, x + 300, 300, A.hachure('pierre', 'arete')));
    o.push(R(150, 300, 5150, 450, A.hachure('bois', 'arete')));
    // murs coupés : bout du vestiaire, cloison, bout de la pièce chaude (sortie d'air en haut)
    o.push(R(0, 300, 150, 2550, A.hachure('bois', 'arete')));
    o.push(R(1950, 450, 2050, 2550, A.hachure('bois', 'arete')));
    o.push(R(5150, 300, 5300, 2250, A.hachure('bois', 'arete')), R(5150, 2400, 5300, 2550, A.hachure('bois', 'arete')));
    o.push(R(5122, 2330, 5146, 2500, W(A.arete)));                         // trappe de la sortie, à moitié
    // écran de tôle sur la cloison, décollé par ses entretoises
    o.push(L(2098, 520, 2098, 2450, A.arete));
    for (const t of [600, 1450, 2350]) o.push(R(2050, t, 2098, t + 40, A.plein));
    // plafond bas et toit
    o.push(R(-300, 2550, 2330, 2800, A.hachure('bois', 'arete')), R(2570, 2550, 5600, 2800, A.hachure('bois', 'arete')));
    o.push(L(-300, 2800, 2330, 2800, A.contour), L(2570, 2800, 5600, 2800, A.contour));
    o.push(L(2345, 2550, 2345, 2800, A.detail), L(2555, 2550, 2555, 2800, A.detail));   // manchon
    o.push(R(2300, 2800, 2600, 2825, W(A.arete)));                                        // solin
    // pare-étincelles et chapeau
    o.push(R(2330, 3300, 2570, 3440, A.hachure('grillage', 'arete')), R(2300, 3440, 2600, 3465, W(A.arete)));

    // bancs coupés : lattes, traverse, pattes
    const banc = (x1, x2, t, n) => {
      const e = (x2 - x1 - (n - 1) * 20) / n;
      const r = [R(x1, t - 110, x2, t - 45, W(A.arete)), R(x1 + 5, 450, x1 + 45, t - 110, W(A.arete))];
      for (let i = 0; i < n; i++) r.push(R(x1 + i * (e + 20), t - 30, x1 + i * (e + 20) + e, t, A.plein));
      return r.join('\n');
    };
    o.push(banc(4250, 4650, 1000, 4), banc(4650, 5150, 1450, 5));

    // l'air : entre bas près du poêle, monte sur les pierres, sort en haut à l'opposé
    o.push(h.fleche(`M${f(X(3700))} ${f(Y(560))} C${f(X(3450))} ${f(Y(560))} ${f(X(3420))} ${f(Y(900))} ${f(X(3270))} ${f(Y(930))}`, A.cache));
    o.push(h.fleche(`M${f(X(2950))} ${f(Y(1870))} L${f(X(2950))} ${f(Y(2250))} Q${f(X(2950))} ${f(Y(2400))} ${f(X(3150))} ${f(Y(2400))} L${f(X(4950))} ${f(Y(2400))} Q${f(X(5100))} ${f(Y(2400))} ${f(X(5150))} ${f(Y(2325))} L${f(X(5480))} ${f(Y(2325))}`, A.cache));
    return o.join('\n');
  };

  // ── En plan ──────────────────────────────────────────────────────────────────────────────
  const YMIN = -330;
  // cote à flèches pleines aux deux bouts, chiffre dessus (ou dessous)
  const coteF = (x1, x2, y, s, dessous) => {
    const t = 5, w = 2.2;
    return [h.ligne(x1, y, x2, y, A.detail),
      h.path(`M${f(x1)} ${f(y)} L${f(x1 + t)} ${f(y - w)} L${f(x1 + t)} ${f(y + w)} Z`, A.plein),
      h.path(`M${f(x2)} ${f(y)} L${f(x2 - t)} ${f(y - w)} L${f(x2 - t)} ${f(y + w)} Z`, A.plein),
      h.texte((x1 + x2) / 2, y + (dessous ? 15 : -5), s, { lisere: true })].join('\n');
  };
  const plan = z => {
    const X = x => ox(z) + (x - XMIN) * S;
    const Y = y => (z.h - 2680 * S) / 2 + (y - YMIN) * S;
    const R = (x1, y1, x2, y2, at) => h.rect(X(x1), Y(y1), (x2 - x1) * S, (y2 - y1) * S, at);
    const L = (x1, y1, x2, y2, at) => h.ligne(X(x1), Y(y1), X(x2), Y(y2), at);
    const mur = A.hachure('bois', 'arete');
    const o = [];

    // bancs
    o.push(R(600, 0, 1850, 400, W(A.arete)));
    for (const y of [100, 200, 300]) o.push(L(600, y, 1850, y, A.fin));
    o.push(R(4250, 0, 4650, 2200, W(A.arete)), R(4650, 0, 5150, 2200, W(A.arete)));
    for (const x of [4350, 4450, 4550, 4750, 4850, 4950, 5050]) o.push(L(x, 0, x, 2200, A.fin));

    // caisson de sable, piles, baril, barres, cage, pierres
    o.push(R(2250, 100, 3330, 1290, A.hachure('gravier', 'arete')), R(2270, 120, 3310, 1270, A.detail));
    const pile = (y1, y2, g) => {
      const r = [R(2660, y1, 3130, y2, W(A.arete))];
      let k = g;
      for (const yy of [y1 + 62, y2 - 62]) for (let x = 2725; x < 3110; x += 120) r.push(caillou(X(x + ((k % 2) ? 20 : 0)), Y(yy), 56 * S, 52 * S, k++));
      return r.join('\n');
    };
    o.push(pile(130, 380, 20), pile(1010, 1260, 40));
    o.push(R(2350, 410, 3230, 980, W(A.contour)));
    for (const x of [2643, 2937]) o.push(L(x, 410, x, 980, A.detail));
    o.push(R(3230, 575, 3255, 815, A.plein));                                // porte du foyer
    for (const x of [2720, 2895, 3070]) o.push(R(x - 13, 150, x + 13, 1240, A.plein));
    o.push(R(2715, 425, 3185, 965, W(A.arete)));
    const dessus = [
      [2790, 490, 62], [2935, 480, 66], [3085, 495, 62],
      [2800, 640, 60], [2950, 630, 58], [3100, 650, 60],
      [2790, 790, 62], [2940, 800, 64], [3090, 790, 60],
      [2860, 900, 50], [3010, 905, 52],
    ];
    dessus.forEach(([x, y, r], i) => o.push(caillou(X(x), Y(y), r * S, r * 0.9 * S, i + 60)));
    for (const [x, y] of [[2730, 440], [2730, 950], [3170, 440], [3170, 950]]) o.push(h.cercle(X(x), Y(y), 1.8, A.plein));
    // le tuyau, coupé au-dessus du baril, au bout opposé à la porte
    o.push(h.cercle(X(2450), Y(695), 75 * S, W(A.contour)));
    // carré libre devant la porte du foyer, et sa cote
    o.push(R(3260, 195, 4240, 1195, A.zone));
    o.push(L(3260, 1195, 3260, 1270, A.fin), L(4240, 1195, 4240, 1270, A.fin));
    o.push(coteF(X(3260), X(4240), Y(1195), '≈ 1000', true));
    // rampe de fer entre la truie et le passage
    o.push(R(2100, 1362, 3330, 1398, W(A.arete)));
    for (const x of [2130, 2730, 3300]) o.push(h.cercle(X(x), Y(1380), 2.2, A.plein));
    // écran de tôle, décollé du mur par ses entretoises
    o.push(L(2150, 45, 3450, 45, A.arete), L(2098, 50, 2098, 1300, A.arete));
    for (const x of [2200, 2800, 3400]) o.push(L(x, 0, x, 45, A.detail));
    for (const y of [100, 700, 1250]) o.push(L(2050, y, 2098, y, A.detail));

    // murs coupés
    o.push(R(0, -150, 3800, 0, mur), R(4200, -150, 5300, 0, mur));        // mur du fond, fenêtre
    o.push(L(3800, -150, 3800, 0, A.arete), L(4200, -150, 4200, 0, A.arete));
    o.push(L(3800, -95, 4200, -95, A.detail), L(3800, -55, 4200, -55, A.detail));
    o.push(R(0, 2200, 5300, 2350, mur));                                     // mur de devant
    o.push(R(0, 0, 150, 1350, mur), R(0, 2050, 150, 2200, mur));           // bout du vestiaire, porte
    o.push(R(1950, 0, 2050, 1400, mur), R(1950, 2100, 2050, 2200, mur));   // cloison, porte
    o.push(R(5150, 0, 5300, 2200, mur));                                     // bout de la pièce chaude
    // entrée d'air basse et sortie haute, hors du plan de coupe : en tireté
    o.push(R(3480, -150, 3780, 0, W(A.cache)));
    o.push(R(5150, 500, 5300, 900, W(A.cache)));
    o.push(h.fleche(`M${f(X(3630))} ${f(Y(-320))} L${f(X(3630))} ${f(Y(160))}`, A.cache));
    // avertisseur de CO et sa distance au poêle
    o.push(R(150, 470, 195, 610, W(A.arete)));
    o.push(L(172, 610, 172, 770, A.fin), L(2350, 980, 2350, 770, A.fin));
    o.push(coteF(X(172), X(2350), Y(720), '≥ 2000', false));
    // portes ouvertes vers l'extérieur : vantail et arc
    o.push(R(-700, 2050, 0, 2090, W(A.arete)));
    o.push(h.path(`M${f(X(-700))} ${f(Y(2050))} A${f(700 * S)} ${f(700 * S)} 0 0 1 ${f(X(0))} ${f(Y(1350))}`, A.fin));
    o.push(R(1250, 2060, 1950, 2100, W(A.arete)));
    o.push(h.path(`M${f(X(1250))} ${f(Y(2100))} A${f(700 * S)} ${f(700 * S)} 0 0 1 ${f(X(1950))} ${f(Y(1400))}`, A.fin));
    // trait de coupe : les deux bouts, flèches vers le mur du fond
    for (const [x1, x2] of [[-380, -160], [5360, 5580]]) {
      o.push(L(x1, 695, x2, 695, A.contour));
      o.push(h.fleche(`M${f(X((x1 + x2) / 2))} ${f(Y(695))} L${f(X((x1 + x2) / 2))} ${f(Y(420))}`, A.arete));
    }
    return o.join('\n');
  };

  return {
    ref: '37-01a',
    titre: 'Le sauna de truie, en coupe et en plan',
    desc: 'Un petit sauna de deux pièces : au vestiaire, un banc et l’avertisseur de CO ; dans la pièce chaude, deux bancs étagés, la truie couchée sur un caisson de sable avec sa cage à pierres portée par deux piles, une rampe de fer entre elle et le passage, un écran de tôle décollé des murs, un carré libre devant la porte du foyer, l’entrée d’air basse près du poêle et la sortie haute à l’autre bout, une petite fenêtre avec la lampe dehors, et des portes qui s’ouvrent vers l’extérieur.',
    format: 'pleine',
    disposition: [['coupe'], ['plan']],
    hauteurs: [13, 10],
    vues: {
      coupe: {
        titre: 'En coupe, dans l’axe de la truie',
        dessin: coupe,
        renvois: z => {
          const X = x => ox(z) + (x - XMIN) * S, Y = t => z.h - 6 - (t + 100) * S;
          return [
            { n: 1, rond: [X(2950), Y(3370)], cible: [X(2575), Y(3370)], texte: 'pare-étincelles, mailles de 1 cm au plus' },
            { n: 2, rond: [X(3450), Y(1950)], cible: [X(3000), Y(1335)], texte: 'cage à pierres portée par deux piles' },
            { n: 3, rond: [X(3750), Y(1150)], cible: [X(3252), Y(1060)], texte: 'truie couchée sur un caisson de sable' },
            { n: 4, rond: [X(5450), Y(1980)], cible: [X(5225), Y(2300)], texte: 'sortie d’air haute, loin du poêle' },
            { n: 5, rond: [X(4400), Y(1700)], cible: [X(4660), Y(1400)], texte: 'deux bancs ; celui du bas, aux enfants' },
            { n: 6, rond: [X(3780), Y(1880)], cible: [X(3880), Y(1600)], texte: 'petite fenêtre, la lampe dehors' },
          ];
        },
      },
      plan: {
        titre: 'En plan ; les deux traits forts marquent la coupe',
        dessin: plan,
        renvois: z => {
          const X = x => ox(z) + (x - XMIN) * S, Y = y => (z.h - 2680 * S) / 2 + (y - YMIN) * S;
          return [
            { n: 7, rond: [X(3250), Y(-230)], cible: [X(3500), Y(-80)], texte: 'entrée d’air basse, près du poêle' },
            { n: 8, rond: [X(1500), Y(1720)], cible: [X(1600), Y(2075)], texte: 'porte vers l’extérieur, sans loquet' },
            { n: 9, rond: [X(2700), Y(1780)], cible: [X(2700), Y(1395)], texte: 'rampe de fer entre truie et passage' },
            { n: 10, rond: [X(1650), Y(1000)], cible: [X(2098), Y(900)], texte: 'écran de tôle, jeu d’air derrière' },
            { n: 11, rond: [X(4080), Y(1750)], cible: [X(4240), Y(900)], texte: 'libre devant la porte du foyer' },
            { n: 12, rond: [X(520), Y(920)], cible: [X(190), Y(600)], texte: 'avertisseur de CO, au vestiaire' },
          ];
        },
      },
    },
  };
};
