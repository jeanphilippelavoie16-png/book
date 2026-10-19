// Planche 61-03 — le gréement de la carcasse (chapitre 36, §17 et « Les outils qu’on n’a pas »).
// Vue du ventre : arbre d'amarrage, corde doublée par-dessus la branche, guindeau au pied du
// tronc, palonnier dans les jarrets, écarteur dans la cavité, croix de sonde sur le cuissot.
// Détail : le jarret de côté, le palonnier qui sort du passage derrière l'os, sa gorge ; et le tour
// de secours du ch. 63 (« Fabriquer le palonnier ») : sur une bête qui a pendu plusieurs jours, un tour
// mort autour du jarret entier, os compris, du côté de la cuisse (le jarret est au-dessus de
// l'articulation quand la bête est debout), amarré en haut. Refait le 15 octobre 2026.
module.exports = (h) => {
  const f = v => Math.round(v * 10) / 10;
  // Courbe lisse (Catmull-Rom) par une suite de points ; renvoie les segments « C … ».
  const courbe = pts => {
    let d = '';
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(i - 1, 0)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(i + 2, pts.length - 1)];
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C${f(c1[0])},${f(c1[1])} ${f(c2[0])},${f(c2[1])} ${f(p2[0])},${f(p2[1])}`;
    }
    return d;
  };
  const trait = (chaine, ferme) => `M${f(chaine[0][0])},${f(chaine[0][1])}` + courbe(chaine) + (ferme ? ' Z' : '');
  const blancTrait = h.a.arete.replace('#1A1A1A', '#FFFFFF');
  const blancArete = h.a.arete.replace('fill="none"', 'fill="#FFFFFF"');

  // ── La vue du ventre ──────────────────────────────────────────────────────────────────
  const C = 214;                       // axe de la carcasse
  const A = [62, 196];                 // la corde touche le tronc
  const D0 = [206, 19];                // la corde repart de derrière la branche
  const L0 = Math.hypot(D0[0] - A[0], D0[1] - A[1]);
  const u = [(A[0] - D0[0]) / L0, (A[1] - D0[1]) / L0];   // vers l'ancrage
  const n = [-u[1], u[0]];                                 // perpendiculaire
  const P = s => [A[0] - s * u[0], A[1] - s * u[1]];       // à s du tronc, le long de la corde

  // Les deux brins de la corde doublée, tordus ensemble de part et d'autre du bâton.
  const brin = signe => {
    const pts = [];
    for (let s = 0; s <= L0; s += 1) {
      let o = 1.6;
      if (s >= 18 && s <= 66) o = 1.6 * Math.cos((2 * Math.PI * (s - 18)) / 8);
      const p = P(s);
      pts.push([f(p[0] + signe * o * n[0]), f(p[1] + signe * o * n[1])]);
    }
    return h.chemin(pts, h.a.arete);
  };

  // Le bâton du guindeau, perpendiculaire à la corde, un bout calé contre le tronc.
  const G = P(42);
  const b1 = [G[0] + 34 * n[0], G[1] + 34 * n[1]], b2 = [G[0] - 26 * n[0], G[1] - 26 * n[1]];
  const e = 2.6;
  const baton = h.chemin([
    [b1[0] + e * u[0], b1[1] + e * u[1]], [b2[0] + e * u[0], b2[1] + e * u[1]],
    [b2[0] - e * u[0], b2[1] - e * u[1]], [b1[0] - e * u[0], b1[1] - e * u[1]],
  ].map(q => [f(q[0]), f(q[1])]), blancArete, true);

  // La carcasse, vue du ventre, tête en bas : moitié droite (dx, y), puis miroir.
  const dehors = [[26, 74], [27, 80], [26, 92], [23, 105], [21, 118], [20, 132], [18, 146], [17, 160],
    [18, 172], [20, 182], [23, 197], [24, 211], [20, 213], [15, 199], [11, 192], [8, 196], [7, 206], [5, 214], [0, 218]];
  const dedans = [[0, 106], [6, 102], [13, 93], [18, 82], [20, 74]];   // de l'enfourchure au jarret
  const X = ([dx, y], s = 1) => [C + s * dx, y];
  const tourDehors = [...dehors.map(p => X(p)), ...dehors.slice(0, -1).reverse().map(p => X(p, -1))];
  const tourDedans = [...dedans.slice().reverse().map(p => X(p, -1)), ...dedans.slice(1).map(p => X(p))];
  const silhouette = `M${f(tourDehors[0][0])},${tourDehors[0][1]}` + courbe(tourDehors)
    + ` L${tourDedans[0][0]},${tourDedans[0][1]}` + courbe(tourDedans) + ' Z';

  const levre = [[0, 114], [5, 128], [8, 144], [9, 160], [7, 174], [0, 188]];
  const cavite = trait([...levre.map(p => X(p)), ...levre.slice(1, -1).reverse().map(p => X(p, -1))], true);
  // Les côtes qui bordent l'ouverture, de chaque côté, et le bas des deux cuissots.
  const cotes = [];
  [[134, 6.5], [143, 8], [152, 8.8], [161, 9], [170, 7.8]].forEach(([y, x0]) => [1, -1].forEach(s => {
    cotes.push(h.path(`M${f(C + s * x0)},${y} Q${f(C + s * (x0 + 5))},${y - 3} ${f(C + s * (x0 + 9))},${y + 1}`, h.a.fin));
  }));
  const cuissots = [1, -1].map(s => h.path(`M${f(C + s * 2)},${110} Q${f(C + s * 10)},${122} ${f(C + s * 21)},${120}`, h.a.fin));

  // Le palonnier : traverse les deux jarrets, une gorge à chaque bout.
  const py = 83, pb = 89, g = 40;
  const palonnier = h.chemin([
    [C - 44, py], [C - g - 2.5, py], [C - g - 1, py + 1.6], [C - g + 1, py + 1.6], [C - g + 2.5, py],
    [C + g - 2.5, py], [C + g - 1, py + 1.6], [C + g + 1, py + 1.6], [C + g + 2.5, py], [C + 44, py],
    [C + 44, pb], [C + g + 2.5, pb], [C + g + 1, pb - 1.6], [C + g - 1, pb - 1.6], [C + g - 2.5, pb],
    [C - g + 2.5, pb], [C - g + 1, pb - 1.6], [C - g - 1, pb - 1.6], [C - g - 2.5, pb], [C - 44, pb],
  ], blancArete, true);

  // Les brins qui descendent de la branche et s'écartent vers les gorges.
  const descente = o => h.path(`M${C + g * Math.sign(o)},${py + 1} L${C + o},42 L${C + o},14 Q${C + o},${f(9 - o)} ${C - 8},${f(10 - o)}`, h.a.arete);

  const tronc = [
    h.path('M34,0 L34,150 Q35,200 26,222 L70,222 Q61,200 60,150 L60,0 Z', h.a.blanc),
    // la charte : la face à l'ombre du tronc, à droite, peinte avant le trait
    h.path('M51,0 L60,0 L60,150 Q61,200 70,222 L60,222 Q55,200 51,150 Z', h.a.ombre),
    h.path('M34,0 L34,150 Q35,200 26,222', h.a.contour),
    h.path('M60,0 L60,150 Q61,200 70,222', h.a.contour),
    h.path('M44,30 Q45,52 43,70', h.a.fin), h.path('M51,96 Q50,118 52,136', h.a.fin),
  ];
  const branche = [
    h.path('M57,21 Q150,12 300,12 Q303,16.5 300,21 L130,27 Q80,30 57,52 Z', h.a.blanc),
    h.path('M58,21 Q150,12 300,12 Q303,16.5 300,21 L130,27 Q80,30 58,51', h.a.contour),
  ];
  // Deux tours de la corde autour du pied du tronc.
  const ancrage = [
    h.path('M62,190 Q47,195 33,190.5 L33,194 Q47,198.5 62,193.5 Z', blancArete),
    h.path('M62,197.5 Q47,202.5 33,198 L33,201.5 Q47,206 62,201 Z', blancArete),
  ];
  const sonde = X([13, 103]);   // au milieu du cuissot, entre l'enfourchure et le bord

  const vueGreement = {
    titre: 'Vu du ventre',
    dessin: z => `<g transform="scale(${f(z.h / 230)})">` + [
      h.rect(0, 222, z.l * 230 / z.h, 8, h.a.hachure('terre', 'aucun')),
      h.ligne(0, 222, z.l * 230 / z.h, 222, h.a.arete),
      ...tronc,
      brin(1), brin(-1),
      baton,
      ...ancrage,
      ...branche,
      palonnier,
      h.path(silhouette, h.a.blanc),
      h.path(silhouette, h.a.contour),
      h.path(cavite, h.a.arete),
      ...cotes, ...cuissots,
      h.rect(C - 12.5, 157.8, 25, 4.4, blancArete),
      h.ligne(sonde[0] - 3, sonde[1] - 3, sonde[0] + 3, sonde[1] + 3, h.a.arete),
      h.ligne(sonde[0] - 3, sonde[1] + 3, sonde[0] + 3, sonde[1] - 3, h.a.arete),
      descente(1.6), descente(-1.6),
    ].join('\n') + '</g>',
    renvois: z => [
      { n: 1, rond: [14, 176], cible: [40, 196], texte: 'ancrage : deux tours au pied du tronc' },
      { n: 2, rond: [132, 200], cible: [f(G[0] - 14 * n[0]), f(G[1] - 14 * n[1])], texte: 'guindeau : tourner le bâton, le bloquer au tronc' },
      { n: 3, rond: [292, 160], cible: [C + 4, 160], texte: 'écarteur de bois vert en travers des côtes' },
      { n: 4, rond: [292, 104], cible: sonde, texte: 'sonde au centre du cuissot, sans toucher l’os' },
    ].map(r => ({ ...r, rond: r.rond.map(v => f(v * z.h / 230)), cible: r.cible.map(v => f(v * z.h / 230)) })),
  };
  // La charte, hors de l'échelle de la vue pour garder l'épaisseur du rouge : le geste (on tord le
  // bâton autour de la corde) et le point à contrôler (la sonde au centre du cuissot).
  const dessinGreement = vueGreement.dessin;
  vueGreement.dessin = z => {
    const k = z.h / 230;
    const c = [G[0] - 16 * u[0], G[1] - 16 * u[1]];
    const pts = [];
    for (let t = -50; t <= 205; t += 5) {
      const a = t * Math.PI / 180;
      pts.push([(c[0] + 20 * Math.cos(a) * n[0] + 6 * Math.sin(a) * u[0]) * k, (c[1] + 20 * Math.cos(a) * n[1] + 6 * Math.sin(a) * u[1]) * k]);
    }
    const d = 'M' + pts.map(q => `${f(q[0])} ${f(q[1])}`).join(' L');
    return [dessinGreement(z), h.geste(d), h.controle(sonde[0] * k, sonde[1] * k, 10)].join('\n');
  };

  // ── Le jarret, de côté ────────────────────────────────────────────────────────────────
  // Jambe arrière pendue : moignon du canon en haut, jarret, puis la cuisse vers le bas.
  const avant = [[128, 32], [129, 48], [125, 66], [122, 96], [117, 136], [110, 178], [105, 208]];
  const arriere = [[194, 208], [188, 180], [175, 146], [162, 114], [159, 94], [161, 76], [159, 60], [151, 48], [150, 32]];
  const jambe = trait(avant) + ' L194,208' + courbe(arriere) + ' Z';
  const passage = trait([[147, 86], [152, 102], [149, 120], [142.5, 102], [147, 86]], true);
  // Le palonnier sort du passage vers le lecteur (vue cavalière), gorge près du bout.
  const O = [147, 102], E = [46, 63];
  const Lp = Math.hypot(E[0] - O[0], E[1] - O[1]);
  const d = [(E[0] - O[0]) / Lp, (E[1] - O[1]) / Lp], m = [-d[1], d[0]];
  const r = 8.5;
  const pt = (s, o) => [f(O[0] + s * d[0] + o * m[0]), f(O[1] + s * d[1] + o * m[1])];
  const sg = Lp - 16;                   // centre de la gorge
  const bord = sgn => [pt(0, sgn * r), pt(sg - 6, sgn * r), pt(sg - 3.5, sgn * (r - 2.5)), pt(sg + 3.5, sgn * (r - 2.5)), pt(sg + 6, sgn * r), pt(Lp, sgn * r)];
  const corps = [...bord(1), ...bord(-1).reverse()];
  // Le bout qui entre dans le passage : la section ronde, côté jambe.
  const entree = `M${corps.map(q => q.join(',')).join(' L')} A${r},${r} 0 0 1 ${pt(0, r).join(',')} Z`;
  const Gg = pt(sg, 0);
  // Tours de corde dans la gorge : demi-cercles côté lecteur.
  const tour = s => {
    const a = pt(s, r - 2.5), b = pt(s, -(r - 2.5));
    return h.path(`M${a[0]},${a[1]} A${r - 2.5},${r - 2.5} 0 0 1 ${b[0]},${b[1]}`, h.a.arete);
  };
  const sortie = pt(sg + 2.2, -(r - 2.5));

  // Le bord de la jambe à la hauteur y, devant (avant) et derrière (arriere) : interpolation
  const bordA = y => { for (let i = 1; i < avant.length; i++) if (y <= avant[i][1]) { const [x0, y0] = avant[i - 1], [x1, y1] = avant[i]; return x0 + (x1 - x0) * (y - y0) / (y1 - y0); } return avant[avant.length - 1][0]; };
  const bordR = y => { const a = arriere.slice().reverse(); for (let i = 1; i < a.length; i++) if (y <= a[i][1]) { const [x0, y0] = a[i - 1], [x1, y1] = a[i]; return x0 + (x1 - x0) * (y - y0) / (y1 - y0); } return a[a.length - 1][0]; };
  const yT1 = 126, yT2 = 137, pente = 4;          // les deux tours, un peu en biais
  // le devant d'un tour : du bord de devant (à gauche) au bord de derrière (à droite), bombé vers le bas
  const tourDevant = (y) => [[bordA(y + pente) - 1.5, y + pente], [(bordA(y) + bordR(y)) / 2, y + pente + 5], [bordR(y) + 1.5, y]];
  // La corde descend de la traverse par le côté loin de la jambe (cachée sous le moignon), fait deux
  // tours par devant, et le brin remonte par derrière, à droite, jusqu'à la traverse.
  const secours = h.formes.cordes([
    { pts: [[150, 0], [150, 31]], ep: 4.2, debut: 'coupe', fin: 'ouvert' },
    { pts: tourDevant(yT1), ep: 4.2, debut: 'ouvert', fin: 'ouvert' },
    { pts: [...tourDevant(yT2), [bordR(yT2) + 7, yT2 - 12], [bordR(yT1 - 20) + 9, yT1 - 30], [186, 60], [186, 0]], ep: 4.2, debut: 'ouvert', fin: 'coupe' },
  ], { trait: 'arete' });

  const vueJarret = {
    titre: 'Le jarret, de côté',
    dessin: z => [
      h.path(jambe, h.a.blanc),
      h.path(jambe, h.a.contour),
      // l'os : canon, articulation du jarret avec sa pointe vers l'arrière, tibia
      h.path('M134,32 L135,60 Q127,66 129,76 Q131,82 136,84 L130,180', h.a.detail),
      h.path('M146,32 L146,58 Q156,60 159,66 Q160,74 152,78 L140,84 L141,180', h.a.detail),
      // le tendon d'Achille : bande le long de l'arrière, de la pointe du jarret vers la cuisse
      h.path('M153,80 Q151,100 155,120 L167,152', h.a.detail),
      h.path('M156,80 Q155,100 158.5,118 L171,150', h.a.fin),
      h.path(passage, h.a.plein),
      h.path(entree, h.a.blanc),
      // la charte : la face à l'ombre du palonnier (en dessous, à gauche), peinte avant le trait
      h.chemin([...bord(-1), pt(Lp, -2.5), pt(0, -2.5)], h.a.ombre, true),
      h.path(entree, h.a.arete),
      ...[-4, 0, 4].map(o => h.chemin([pt(6, o), pt(sg - 9, o * 0.9)], h.a.fin)),
      h.cercle(E[0], E[1], r, h.a.blanc),
      h.cercle(E[0], E[1], r, h.a.arete),
      h.cercle(E[0], E[1], 5, h.a.fin), h.cercle(E[0], E[1], 1.6, h.a.fin),
      tour(sg - 2.2), tour(sg), tour(sg + 2.2),
      h.path(`M${sortie[0]},${sortie[1]} Q${f(sortie[0] + 8)},${f(sortie[1] - 40)} 118,0`, h.a.contour),
      // le tour de secours (ch. 63, « Fabriquer le palonnier ») : sur une bête qui a pendu des jours,
      // deux tours de corde autour du jarret entier, os et tendon compris, du côté de la cuisse
      // sous le palonnier ; le brin remonte et s'amarre en haut. Si le tendon lâche, le tour bute
      // contre l'articulation et rien ne tombe.
      secours,
    ].join('\n'),
    renvois: z => [
      { n: 5, rond: [22, 112], cible: [Gg[0], f(Gg[1] + 6)], texte: 'palonnier de bois vert, gorge aux bouts' },
      { n: 6, rond: [212, 108], cible: [148, 110], texte: 'passage entre le tendon d’Achille et l’os' },
      { n: 7, rond: [214, 160], cible: [(bordA(yT2) + bordR(yT2)) / 2 + 12, yT2 + pente + 7], texte: 'bête pendue des jours : ajouter un tour mort' },
    ],
  };

  return {
    ref: '61-03',
    titre: 'Le gréement de la carcasse',
    desc: 'À gauche, la carcasse vue du ventre, pendue tête en bas sous une branche : une corde doublée part de deux tours au pied du tronc, monte par-dessus la branche et ses deux brins s’écartent jusqu’aux gorges d’un palonnier passé dans les jarrets ; au pied du tronc, un bâton passé entre les deux brins, tourné puis bloqué contre l’écorce, fait guindeau. Un bâton écarteur tient la cavité ouverte en travers des côtes ; une croix marque le point de sonde au centre du cuissot. À droite, le jarret de côté : le palonnier sort du passage entre le tendon et l’os, et la corde fait trois tours dans sa gorge. Sous le palonnier, deux tours d’une corde de secours serrent le jarret entier, os et tendon compris ; le brin remonte s’amarrer en haut : si le tendon lâche, rien ne tombe.',
    format: 'demi',
    disposition: [['greement', 'jarret']],
    largeurs: [[3, 2]],
    vues: { greement: vueGreement, jarret: vueJarret },
  };
};
