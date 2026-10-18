// Planche 10-07. Le filtre à sable en baril.
// Le texte : ch. 10, variante d'urgence, « Le filtre à sable » : un baril debout, un trou au bas avec un bout de boyau ;
// du fond vers le haut, une main de grosse pierre, une couche de gravier, puis du sable lavé jusqu'à ce que l'eau de
// rinçage sorte claire ; l'eau entre par le haut, doucement, sur une assiette percée ; le sable reste mouillé ; quand
// le débit tombe, on gratte les deux ou trois centimètres du dessus et on laisse le lit en place ; le charbon du
// poêle, concassé et rincé, va dans un deuxième seau, après le sable ; on bout l'eau ensuite.
//
// Refaite le 18 octobre 2026 : le film vivant était dessiné en bande noire, alors que le texte et la source disent
// qu'il ne se voit pas (sources/13-cawst-couche-biologique-filtre-a-sable.md : « The biolayer is NOT visible ») ; la
// vue du grattage montre à la place le dessus du sable qui fonce, ce qu'on gratte. La légende nommait des pièces et
// finissait au pronominal (« le lit dessous ne se brasse pas ») ; l'encadré danger redisait la dernière phrase du
// texte : il devient le repère 10, « faire bouillir cette eau ensuite ». La cote de 20 à 30 mm sur un geste sort
// (règle 4) : le chiffre passe dans la légende. Les repères suivent le texte : le boyau (1, 2), les couches du fond
// vers le haut (3 à 5), le lavage du sable (6, 7), l'assiette (8), le charbon (9), bouillir (10), le grattage (11, 12).
//
// La sortie du boyau plus haute que le sable : le texte dit que le film vit tant que le sable reste mouillé ; un
// boyau qui sort plus bas que le dessus du sable vide le baril sous le sable (géométrie du niveau d'eau). Cerclée en
// rouge, repère 2.
// Aucune main : le seau qu'on penche et la gratte se lisent seuls ; le geste est dans la légende et la flèche rouge.
//
// La charte : le haut vide du baril et de la chaudière, au-dessus de l'eau, vus par la coupe, en gris loin ; les
// couches restent en trame, sans gris. Le rouge : la sortie du boyau (2) ; le sens de la gratte (11).
module.exports = (h) => {
  const blancArete = h.a.arete.replace('fill="none"', 'fill="#ffffff"');
  const halo = 'fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round"';
  const tube = 'fill="none" stroke="#000000" stroke-width="7.5" stroke-linecap="butt" stroke-linejoin="round"';
  const tubeBlanc = 'fill="none" stroke="#ffffff" stroke-width="4.3" stroke-linecap="butt" stroke-linejoin="round"';
  const boyau = d => [h.path(d, tube), h.path(d, tubeBlanc)];
  const n1 = v => Math.round(v * 10) / 10;

  // Hasard reproductible, point dans un polygone, découpe d'un polygone par une horizontale.
  const alea = graine => {
    let s = graine >>> 0;
    return () => {
      s = (s + 0x6D2B79F5) >>> 0;
      let t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };
  const dedans = ([x, y], poly) => {
    let c = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const [xi, yi] = poly[i], [xj, yj] = poly[j];
      if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
    }
    return c;
  };
  const boite = poly => [
    Math.min(...poly.map(p => p[0])), Math.min(...poly.map(p => p[1])),
    Math.max(...poly.map(p => p[0])), Math.max(...poly.map(p => p[1])),
  ];
  const sousLigne = (poly, y, dessous = true) => {
    const out = [];
    poly.forEach((a, i) => {
      const b = poly[(i + 1) % poly.length];
      const ia = dessous ? a[1] >= y : a[1] <= y, ib = dessous ? b[1] >= y : b[1] <= y;
      if (ia) out.push(a);
      if (ia !== ib) { const t = (y - a[1]) / (b[1] - a[1]); out.push([a[0] + t * (b[0] - a[0]), y]); }
    });
    return out;
  };
  const rot = (c, deg) => ([x, y]) => {
    const a = (deg * Math.PI) / 180, co = Math.cos(a), si = Math.sin(a);
    return [c[0] + x * co - y * si, c[1] + x * si + y * co];
  };

  // Sable : un pointillé serré. Eau trouble : le même, clairsemé.
  const pointille = (poly, graine, pas) => {
    const r = alea(graine), [x0, y0, x1, y1] = boite(poly), out = [];
    const n = Math.round(((x1 - x0) * (y1 - y0)) / pas);
    for (let i = 0; i < n; i++) {
      const p = [x0 + r() * (x1 - x0), y0 + r() * (y1 - y0)];
      if (dedans(p, poly)) out.push(h.cercle(p[0], p[1], 0.7, h.a.plein));
    }
    return out;
  };
  // Charbon concassé : des éclats noirs, anguleux, qui laissent passer l'eau entre eux.
  const charbon = (poly, graine, pas, taille) => {
    const r = alea(graine), [x0, y0, x1, y1] = boite(poly), out = [];
    let rang = 0;
    for (let y = y0 + pas / 2; y < y1; y += pas * 0.87, rang++) {
      for (let x = x0 + pas / 2 + (rang % 2) * (pas / 2); x < x1; x += pas) {
        const cx = x + (r() - 0.5) * 2, cy = y + (r() - 0.5) * 2, n = 4 + Math.floor(r() * 3), pts = [];
        for (let k = 0; k < n; k++) {
          const a = (2 * Math.PI * k) / n + r() * 0.7, rr = taille * (0.65 + 0.5 * r());
          pts.push([cx + rr * Math.cos(a), cy + rr * Math.sin(a)]);
        }
        if (pts.every(p => dedans(p, poly))) out.push(h.chemin(pts, h.a.plein, true));
      }
    }
    return out;
  };
  // Une pierre roulée, contour irrégulier.
  const caillou = (cx, cy, rx, ry, graine) => {
    const r = alea(graine), n = 9, pts = [];
    for (let i = 0; i < n; i++) {
      const a = (2 * Math.PI * i) / n, k = 0.84 + 0.22 * r();
      pts.push([cx + rx * k * Math.cos(a), cy + ry * k * Math.sin(a)]);
    }
    const m = (p, q) => `${n1((p[0] + q[0]) / 2)},${n1((p[1] + q[1]) / 2)}`;
    let d = `M${m(pts[n - 1], pts[0])}`;
    pts.forEach((p, i) => { d += ` Q${n1(p[0])},${n1(p[1])} ${m(p, pts[(i + 1) % n])}`; });
    return h.path(d + ' Z', blancArete);
  };
  // Le film vivant : une bande noire mince, un peu ondulée, posée sur le sable.
  const film = (x0, x1, y) => {
    const haut = [], bas = [];
    for (let x = x0; x <= x1; x += 4) {
      const o = 0.6 * Math.sin(x / 5);
      haut.push([x, y - 1.4 + o]); bas.unshift([x, y + 1.2 + o]);
    }
    return h.chemin([...haut, ...bas], h.a.plein, true);
  };
  // Un fond de seau percé : le trait s'interrompt à chaque trou.
  const fondPerce = (x0, x1, y, trous, at) => {
    const bouts = [], bords = [x0, ...trous.flatMap(t => [t - 1.6, t + 1.6]), x1];
    for (let i = 0; i < bords.length; i += 2) bouts.push(h.ligne(bords[i], y, bords[i + 1], y, at));
    return bouts;
  };
  const sol = (x0, x1, y) => [h.rect(x0, y, x1 - x0, 8, h.a.hachure('terre', 'aucun')), h.ligne(x0, y, x1, y, h.a.arete)];
  const buche = (x, y, r) => [h.cercle(x, y, r, h.a.blanc), h.cercle(x, y, r, h.a.arete), h.cercle(x, y, r * 0.62, h.a.fin), h.cercle(x, y, r * 0.28, h.a.fin)];
  // Un bâton vu en long, posé en travers d'un rebord à l'autre.
  const baton = (x0, x1, y, e) => [h.rect(x0, y, x1 - x0, e, h.a.blanc), h.rect(x0, y, x1 - x0, e, h.a.hachure('bois')), h.rect(x0, y, x1 - x0, e, h.a.arete)];
  const goutte = (x, y) => h.ellipse(x, y, 1.4, 2.2, h.a.plein);
  // les vues sont dessinées pour une hauteur fixe ; on centre le dessin dans la vue rendue, et ses renvois avec lui
  const dec = (z, H0) => Math.max(0, Math.round((z.h - H0) / 2));
  const centre = (dessin, H0) => z => `<g transform="translate(0 ${dec(z, H0)})">\n${dessin(z)}\n</g>`;
  const renv = (liste, H0) => z => liste.map(r => ({ ...r, rond: [r.rond[0], r.rond[1] + dec(z, H0)], cible: [r.cible[0], r.cible[1] + dec(z, H0)] }));

  // ── La coupe ───────────────────────────────────────────────────────────────
  // Baril de x 92 à 232, du bord (y 74) au fond (y 276), posé sur deux blocs de bois ; sol à y 294.
  // Du fond vers le haut : pierre (250-276), gravier (232-250), sable (142-232), film à 142,
  // eau jusqu'à 98. Le boyau sort au bas, remonte et finit à y 128, bouche ouverte plus haut que le
  // sable (142) : il ne redescend pas, sinon il siphonne le baril et le lit s'assèche.
  const X0 = 93.2, X1 = 230.8;
  const verseur = rot([158, 58], 75);
  const seauVerse = [[0, 0], [-4, 44], [-42, 44], [-46, 0]].map(verseur);

  const coupe = z => [
    ...sol(8, 338, 294),
    ...baton(102, 134, 276.5, 17.5), ...baton(190, 222, 276.5, 17.5),
    // le haut vide du baril, vu par la coupe
    h.rect(X0, 72, X1 - X0, 26, h.a.loin),
    // l'eau au-dessus du sable
    h.rect(X0, 98, X1 - X0, 42, h.a.hachure('eau', 'aucun')),
    h.ligne(92, 98, 232, 98, h.a.arete),
    // le sable lavé
    ...pointille([[X0, 143], [X1, 143], [X1, 232], [X0, 232]], 7, 26),
    h.ligne(X0, 232, X1, 232, h.a.fin),
    // le gravier
    h.rect(X0, 232, X1 - X0, 18, h.a.hachure('gravier', 'aucun')),
    // le bout de boyau dans la pierre, et la pierre
    ...boyau('M208,266 L232,266'),
    ...[[104, 263, 11, 12.5], [126, 263.5, 10.5, 12], [148, 263, 11, 12.5], [170, 263.5, 10.5, 12], [191, 263, 10, 12]]
      .map(([x, y, rx, ry], i) => caillou(x, y, rx, ry, 30 + i)),
    caillou(218, 253, 11, 5.5, 41),
    // le dessus du sable
    h.ligne(X0, 142.5, X1, 142.5, h.a.detail),
    // l'assiette percée posée sous l'arrivée
    h.path('M124,124 Q130,134 138,134', h.a.arete),
    ...fondPerce(138, 182, 134, [149, 160, 171], h.a.arete),
    goutte(149, 138.5), goutte(160, 138.5), goutte(171, 138.5),
    h.path('M182,134 Q190,134 196,124', h.a.arete),
    // le baril et ses deux cercles de roulement
    h.chemin([[92, 72], [92, 276], [232, 276], [232, 72]], h.a.contour),
    ...[141, 209].flatMap(y => [
      h.path(`M92,${y - 4} Q86,${y} 92,${y + 4}`, h.a.arete),
      h.path(`M232,${y - 4} Q238,${y} 232,${y + 4}`, h.a.arete),
    ]),
    // le boyau : il sort au bas, remonte plus haut que le sable, puis redescend au seau
    ...boyau('M230,266 L240,266 Q246,266 246,259 L246,124 Q246,116 254,116 L292,116 Q300,116 300,124 L300,128'),
    goutte(300, 137), goutte(300, 149),
    // la bouche du boyau, plus haute que le sable
    h.controle(300, 126, 11),
    h.fleche('M300,158 L300,202', h.a.cache),
    // le seau de charbon, sur deux bâtons en travers de la chaudière
    h.rect(273.5, 268, 61, 24, h.a.hachure('eau', 'aucun')),
    h.ligne(273.2, 268, 334.8, 268, h.a.detail),
    h.chemin([[272, 244], [276, 293.5], [332, 293.5], [336, 244]], h.a.arete),
    ...baton(268, 340, 239.5, 4.5),
    ...charbon([[276, 204], [332, 204], [328.6, 236.5], [279.4, 236.5]], 5, 6.2, 2.4),
    h.ligne(274, 190, 279, 238, h.a.arete), h.ligne(334, 190, 329, 238, h.a.arete),
    ...fondPerce(279, 329, 238, [292, 304, 316], h.a.arete),
    goutte(304, 252), goutte(292, 259),
    // l'arrivée : un seau qu'on penche doucement sur l'assiette
    h.path('M156.5,59 C158,72 158.5,86 158.5,98', h.a.detail),
    h.path('M160,58.5 C161.5,72 162,86 162,98', h.a.detail),
    h.path('M160,102 L160,123', halo),
    h.fleche('M160,101 L160,124', h.a.cache),
    h.chemin(sousLigne(seauVerse, 58), h.a.hachure('eau', 'aucun'), true),
    h.ligne(sousLigne(seauVerse, 58).reduce((m, p) => Math.min(m, p[0]), 999), 58, 158, 58, h.a.detail),
    h.chemin(seauVerse, h.a.contour),
  ].join('\n');

  // ── Le second seau, en grand ───────────────────────────────────────────────
  const seauC = [[55, 90], [175, 90], [163, 197], [67, 197]];
  const charbonVue = z => [
    ...sol(8, 223, 294),
    // la chaudière, et l'eau clarifiée qui s'y ramasse ; le dedans, au-dessus de l'eau
    h.chemin([[48, 206], [182, 206], [177.8, 252], [52.2, 252]], h.a.loin, true),
    h.rect(52.8, 252, 124.4, 40, h.a.hachure('eau', 'aucun')),
    h.ligne(52.6, 252, 177.4, 252, h.a.detail),
    h.chemin([[48, 206], [56, 293.5], [174, 293.5], [182, 206]], h.a.contour),
    // deux bâtons en travers du bord
    ...baton(40, 190, 197.5, 8),
    // le seau et son charbon
    ...charbon([[57.5, 112], [172.5, 112], [162, 195.5], [68, 195.5]], 11, 11, 4.3),
    h.ligne(55, 90, 67, 197, h.a.contour), h.ligne(175, 90, 163, 197, h.a.contour),
    ...fondPerce(67, 163, 197, [85, 100, 115, 130, 145], h.a.contour),
    goutte(100, 214), goutte(130, 221), goutte(115, 235), goutte(85, 229), goutte(145, 238),
    // le boyau qui arrive du baril
    ...boyau('M0,44 L78,44 Q104,44 104,62 L104,70'),
    goutte(104, 80),
    h.fleche('M104,86 L104,108', h.a.cache),
  ].join('\n');

  // ── Laver le sable ─────────────────────────────────────────────────────────
  const seauL = [[-30, -35], [30, -35], [24, 35], [-24, 35]];
  const penche = seauL.map(rot([92, 118], 55)); // coin haut droit = le bec, à y 122,5
  const bec = penche[1];
  const debout = seauL.map(rot([266, 151], 0));
  const lavage = z => {
    const contenu = sousLigne(penche, bec[1] + 0.5);
    const sableP = sousLigne(penche, 142);
    const eauP = sousLigne(contenu, 142, false);
    return [
      ...sol(8, 338, 186),
      // le seau penché : le sable reste au fond, l'eau trouble passe par-dessus le bord
      h.chemin(eauP, h.a.hachure('eau', 'aucun'), true),
      ...pointille(eauP, 21, 70),
      ...pointille(sableP, 22, 20),
      h.ligne(sableP[0][0], 142, sableP[sableP.length - 1][0], 142, h.a.fin),
      h.path(`M${n1(bec[0] - 2)},${n1(bec[1] + 1)} C${n1(bec[0] + 8)},${n1(bec[1] + 5)} 150,150 152,186`, h.a.detail),
      h.path(`M${n1(bec[0] + 1)},${n1(bec[1] - 1)} C${n1(bec[0] + 13)},${n1(bec[1] + 2)} 160,150 163,186`, h.a.detail),
      ...pointille([[bec[0], bec[1] + 2], [bec[0] + 6, bec[1]], [158, 150], [162, 185], [153, 185], [149, 150]], 23, 45),
      h.chemin([penche[0], penche[3], penche[2], penche[1]], h.a.contour),
      // on recommence
      h.fleche('M150,70 C176,40 214,40 238,78', h.a.arete),
      // le seau debout : le sable au fond, l'eau claire dessus
      h.rect(237.5, 126, 57, 34, h.a.hachure('eau', 'aucun')),
      h.ligne(237.4, 126, 294.6, 126, h.a.detail),
      ...pointille(sousLigne(debout, 160), 24, 20),
      h.ligne(239.5, 160, 292.5, 160, h.a.fin),
      h.chemin([debout[0], debout[3], debout[2], debout[1]], h.a.contour),
    ].join('\n');
  };

  // ── Gratter le dessus ──────────────────────────────────────────────────────
  // Paroi du baril à x 24 ; le dessus du sable à y 80, gratté jusqu'à y 102.
  const grattage = z => [
    h.ligne(16, 40, 16, 180, h.a.contour),
    ...pointille([[17, 81.5], [70, 81.5], [70, 102], [204, 102], [204, 180], [17, 180]], 51, 26),
    // le dessus encrassé, plus foncé : c'est lui qu'on gratte
    ...pointille([[17, 80.5], [70, 80.5], [70, 101], [17, 101]], 53, 5),
    h.ligne(17, 80, 70, 80, h.a.arete),
    h.ligne(70, 81, 70, 102, h.a.arete),
    h.ligne(70, 102, 204, 102, h.a.arete),
    // l'ancien dessus, parti dans la gratte
    h.ligne(124, 80, 204, 80, h.a.cache),
    // la gratte, pleine de ce qu'elle a levé
    ...pointille([[76, 97], [114, 97], [114, 86], [100, 84], [84, 88]], 52, 5),
    h.path('M75,93 Q82,88 92,86 L96,88 Q86,90 77,96 Z', h.a.plein),
    h.path('M70,102 L112,102 Q120,102 120,94 L120,78 L154,44', h.a.contour),
    h.path('M70,102 L75.5,98.5 L112,98.5 Q116.5,98.5 116.5,94 L116.5,80', h.a.contour),
    h.geste('M62,62 L24,62'),
    // coupures du dessin
    h.path('M16,180 L60,180 L64,175 L70,185 L74,180 L204,180', h.a.fin),
    h.path('M204,102 L204,136 L199,140 L209,146 L204,150 L204,180', h.a.fin),
  ].join('\n');

  return {
    ref: '10-07',
    titre: 'Le filtre à sable en baril',
    desc: 'Coupe d’un baril debout posé sur deux blocs de bois : du fond vers le haut, une main de grosse pierre, du gravier, une couche épaisse de sable lavé, le film vivant à sa surface, et de l’eau par-dessus ; une assiette percée sur le sable, sous le seau qu’on penche doucement. Un bout de boyau part du bas, remonte le long du baril et finit, bouche en bas, plus haut que le sable, pour que le lit reste noyé ; l’eau en tombe dans un second seau percé plein de charbon de poêle concassé, posé sur deux bâtons en travers d’une chaudière. À droite, ce second seau en grand. En bas, le lavage du sable : on brasse, on laisse tomber, on vide l’eau trouble, jusqu’à ce qu’elle sorte claire ; et le dessus du lit qu’on gratte à plat sur 20 à 30 mm quand le débit tombe, sans brasser le dessous. Encadré danger : le sable et le charbon clarifient l’eau, ils ne la désinfectent pas.',
    format: 'pleine',
    disposition: [['coupe', 'charbon'], ['lavage', 'grattage']],
    hauteurs: [3, 2],
    largeurs: [[3, 2], [3, 2]],
    vues: {
      coupe: {
        titre: 'En coupe',
        dessin: centre(coupe, 315),
        renvois: renv([
          { n: 1, rond: [264, 320], cible: [238, 269.5], texte: 'passer un boyau au bas du baril' },
          { n: 2, rond: [330, 150], cible: [303, 128], texte: 'monter la sortie plus haut que le sable' },
          { n: 3, rond: [48, 290], cible: [104, 274], texte: 'poser une main de grosse pierre' },
          { n: 4, rond: [48, 230], cible: [104, 241], texte: 'étendre une couche de gravier' },
          { n: 5, rond: [48, 186], cible: [112, 192], texte: 'remplir de sable lavé, en couche épaisse' },
          { n: 8, rond: [48, 112], cible: [131, 133], texte: 'verser doucement sur une assiette percée' },
        ], 315),
      },
      charbon: {
        titre: 'Après le sable',
        dessin: centre(charbonVue, 315),
        renvois: renv([
          { n: 9, rond: [208, 142], cible: [150, 150], texte: 'remplir un second seau de charbon concassé' },
          { n: 10, rond: [208, 262], cible: [160, 272], texte: 'faire bouillir cette eau ensuite' },
        ], 315),
      },
      lavage: {
        titre: 'Laver le sable',
        dessin: centre(lavage, 203),
        renvois: renv([
          { n: 6, rond: [196, 132], cible: [155, 158], texte: 'brasser, puis vider l’eau trouble' },
          { n: 7, rond: [326, 104], cible: [284, 140], texte: 'recommencer jusqu’à l’eau claire' },
        ], 203),
      },
      grattage: {
        titre: 'Quand le débit tombe',
        dessin: centre(grattage, 203),
        renvois: renv([
          { n: 11, rond: [44, 36], cible: [43, 62], texte: 'gratter à plat 2 ou 3 cm du dessus' },
          { n: 12, rond: [220, 156], cible: [170, 150], texte: 'laisser le lit dessous en place' },
        ], 203),
      },
    },
  };
};
