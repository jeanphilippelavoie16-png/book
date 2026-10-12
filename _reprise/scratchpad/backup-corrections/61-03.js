// Planche 61-03 — le gréement de la carcasse (chapitre 36, §17 et « Les outils qu’on n’a pas »).
// Vue du ventre : arbre d'amarrage, corde doublée par-dessus la branche, guindeau au pied du
// tronc, palonnier dans les jarrets, écarteur dans la cavité, croix de sonde sur le cuissot.
// Détail : le jarret de côté, le palonnier qui sort du passage derrière l'os, sa gorge.
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

  const levre = [[0, 112], [4, 126], [6, 144], [6.5, 160], [5, 174], [0, 186]];
  const cavite = trait([...levre.map(p => X(p)), ...levre.slice(1, -1).reverse().map(p => X(p, -1))], true);

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
    h.path('M62,192.5 Q47,197.5 33,193', h.a.arete),
    h.path('M62,199.5 Q47,204.5 33,200', h.a.arete),
  ];
  const sonde = X([13, 124]);

  const vueGreement = {
    dessin: z => [
      h.rect(0, 222, z.l, 8, h.a.hachure('terre', 'aucun')),
      h.ligne(0, 222, z.l, 222, h.a.arete),
      ...tronc,
      brin(1), brin(-1),
      baton,
      ...ancrage,
      ...branche,
      palonnier,
      h.path(silhouette, h.a.plein),
      h.path(cavite, h.a.blanc),
      h.rect(C - 7, 157.8, 14, 4.4, blancArete),
      h.ligne(sonde[0] - 3.5, sonde[1] - 3.5, sonde[0] + 3.5, sonde[1] + 3.5, blancTrait),
      h.ligne(sonde[0] - 3.5, sonde[1] + 3.5, sonde[0] + 3.5, sonde[1] - 3.5, blancTrait),
      descente(1.6), descente(-1.6),
    ].join('\n'),
    renvois: z => [
      { n: 1, rond: [14, 176], cible: [40, 196], texte: 'ancrage : deux tours au pied du tronc' },
      { n: 2, rond: [132, 200], cible: [f(G[0] - 14 * n[0]), f(G[1] - 14 * n[1])], texte: 'guindeau : bâton tordu, calé contre le tronc' },
      { n: 3, rond: [292, 160], cible: [C + 4, 160], texte: 'écarteur de bois vert en travers des côtes' },
      { n: 4, rond: [292, 124], cible: sonde, texte: 'sonde : centre du cuissot, sans toucher l’os' },
    ],
  };

  // ── Le jarret, de côté ────────────────────────────────────────────────────────────────
  // Jambe arrière pendue : moignon du canon en haut, jarret, puis la cuisse vers le bas.
  const avant = [[128, 32], [129, 48], [125, 66], [122, 96], [117, 136], [110, 178], [105, 208]];
  const arriere = [[194, 208], [188, 180], [175, 146], [162, 114], [159, 94], [161, 76], [159, 60], [151, 48], [150, 32]];
  const jambe = trait(avant) + ' L194,208' + courbe(arriere) + ' Z';
  const passage = trait([[144, 78], [154, 100], [144, 122], [134, 100], [144, 78]], true);
  // Le palonnier sort du passage vers le lecteur (vue cavalière), gorge près du bout.
  const O = [144, 100], E = [46, 63];
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

  const vueJarret = {
    titre: 'Le jarret, de côté',
    dessin: z => [
      h.path(jambe, h.a.plein),
      h.path(passage, h.a.blanc),
      h.path(entree, h.a.blanc),
      h.path(entree, h.a.hachure('bois')),
      h.cercle(E[0], E[1], r, h.a.blanc),
      h.cercle(E[0], E[1], r, h.a.arete),
      h.cercle(E[0], E[1], 5, h.a.fin), h.cercle(E[0], E[1], 1.6, h.a.fin),
      tour(sg - 2.2), tour(sg), tour(sg + 2.2),
      h.path(`M${sortie[0]},${sortie[1]} Q${f(sortie[0] + 8)},${f(sortie[1] - 40)} 118,0`, h.a.contour),
    ].join('\n'),
    renvois: z => [
      { n: 5, rond: [22, 112], cible: [Gg[0], f(Gg[1] + 6)], texte: 'palonnier : bois vert gros comme un poignet, gorge aux bouts' },
      { n: 6, rond: [212, 118], cible: [145, 114], texte: 'passage entre le tendon d’Achille et l’os' },
    ],
  };

  return {
    ref: '61-03',
    titre: 'Le gréement de la carcasse',
    desc: 'À gauche, la carcasse vue du ventre, pendue tête en bas sous une branche : une corde doublée part de deux tours au pied du tronc, monte par-dessus la branche et ses deux brins s’écartent jusqu’aux gorges d’un palonnier passé dans les jarrets ; au pied du tronc, un bâton tordu entre les deux brins, calé contre l’écorce, fait guindeau. Un bâton écarteur tient la cavité ouverte en travers des côtes ; une croix marque le point de sonde au centre du cuissot. À droite, le jarret de côté : le palonnier sort du passage entre le tendon et l’os, et la corde fait trois tours dans sa gorge.',
    format: 'demi',
    disposition: [['greement', 'jarret']],
    largeurs: [[3, 2]],
    vues: { greement: vueGreement, jarret: vueJarret },
  };
};
