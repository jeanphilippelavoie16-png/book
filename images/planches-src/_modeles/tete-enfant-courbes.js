// Modèle : tête d'enfant de 4 à 6 ans de profil (regard à droite), avec le cou et la naissance des épaules.
// Pas une planche du livre. dessiner(x, y, echelle) est à porter dans formes.js.
//
// Repère en mm (enfant de cinq ans, à l'échelle où une tête d'adulte fait 230 du sommet au menton),
// y vers le bas. Origine : x = 0 à l'arrière du crâne, y = 0 au sommet des cheveux.
// La tête fait 166 du sommet au menton et 175 de l'arrière du crâne au bout du nez : une boule.
// Repères (hauteurs) :
//   sommet 0 · mi-hauteur 83 · frange 78 · sourcil 89 · œil 103 (bien sous la mi-hauteur)
//   base du nez 121 · bouche 134 · menton 166
//   le visage (sourcil → menton, 77) fait moins de la moitié de la tête ; le crâne fait le reste
// Repères (profondeurs) :
//   arrière du crâne -1 (à y = 98) · front 170,5 · pointe du nez 170,5 : le nez ne dépasse pas le front
//   oreille : de 73 à 96, du sourcil (94) à la base du nez (131), juste derrière le milieu (87)
//   cou : devant, de la gorge (111, 180) à (105, 204) ; derrière, de la nuque (55, 180) à (55, 204) :
//   50 de profondeur, mince et court ; il part sous l'oreille, derrière la mâchoire.
//
// Chaque nœud : [x, y, poignée d'entrée, poignée de sortie] ; poignées relatives au nœud.
// Une poignée nulle fait un coin. Le chemin passe ses courbes C de nœud en nœud.

function dessiner(x, y, s) {
  const N = '#000';
  const X = v => +(x + v * s).toFixed(1), Y = v => +(y + v * s).toFixed(1);
  const pt = (a, b) => `${X(a)} ${Y(b)}`;
  const trait = ep => `fill="none" stroke="${N}" stroke-width="${ep}" stroke-linecap="round" stroke-linejoin="round"`;
  // n = [x, y, [ix, iy], [ox, oy]]
  const courbe = (nds, ferme = false) => {
    let d = `M${pt(nds[0][0], nds[0][1])}`;
    const L = ferme ? nds.length : nds.length - 1;
    for (let i = 0; i < L; i++) {
      const a = nds[i], b = nds[(i + 1) % nds.length];
      const o = a[3] || [0, 0], n = b[2] || [0, 0];
      d += ` C${pt(a[0] + o[0], a[1] + o[1])} ${pt(b[0] + n[0], b[1] + n[1])} ${pt(b[0], b[1])}`;
    }
    return d + (ferme ? ' Z' : '');
  };
  // nœud lisse : tangente (tx, ty), longueur d'entrée li, de sortie lo
  const L = (px, py, tx, ty, li, lo = li) => {
    const m = Math.hypot(tx, ty); tx /= m; ty /= m;
    return [px, py, [-tx * li, -ty * li], [tx * lo, ty * lo]];
  };
  // coin : poignées libres
  const K = (px, py, i, o) => [px, py, i, o];
  const ep = { sil: 1.5, int: 0.75, det: 0.6, fin: 0.5 };
  const out = [];

  // ── la silhouette, un seul chemin fermé : épaule arrière → nuque → cheveux → front → nez → bouche
  //    → menton → gorge → poitrine ; le bas se ferme sans trait
  const sil = [
    K(6, 248, [0, 0], [6, -8]),                 // épaule arrière
    L(40, 226, 1, -0.6, 9, 7),                  // trapèze
    L(55, 204, 0.08, -1, 7, 9),                 // derrière du cou
    K(55, 180, [0, 8], [-1, -2]),               // nuque : la peau entre sous les cheveux
    K(51, 177, [1.5, 1], [-8, -4]),             // pointe des cheveux sur la nuque
    L(12, 146.0, -0.75, -1, 10, 12),              // sous l'occiput
    L(-1, 98.0, -0.02, -1, 18, 30),               // derrière du crâne
    L(24, 26.0, 0.72, -0.7, 26, 26),
    L(88, 0.0, 1, 0, 30, 30),                     // sommet, au-dessus de l'oreille
    L(152, 24.0, 0.72, 0.7, 24, 18),
    L(173, 58.0, 0.15, 1, 10, 6),                 // le devant des cheveux
    K(174, 78.0, [0.3, -5], [-1.2, 1]),           // pointe de la frange, sur le front
    L(170.5, 82.0, 0.05, 1, 1, 3),                // la peau du front sous la frange
    L(170.5, 88.0, -0.1, 1, 2, 3),                // le bas du front, bombé
    L(166, 97.5, -0.35, 1, 4, 1.5),             // racine du nez, à peine creusée
    L(168, 107.5, 0.4, 1, 4, 3),                // l'arête, courte
    L(170.5, 114.5, 0.1, 1, 2.5, 2.5),          // le bout du nez, rond, retroussé
    L(167, 120.0, -1, 0.35, 2.2, 2),            // dessous du nez, qui remonte
    K(163, 121.5, [1.8, -0.3], [0.3, 2.5]),     // sous-nasal
    L(164.5, 129.5, 0.3, 1, 3.5, 1.6),          // lèvre du haut, courte et pleine
    K(161.5, 134, [2.4, -0.6], [1.3, 0.4]),     // la commissure
    L(163, 139.5, 0.0, 1, 2.4, 2.4),            // lèvre du bas
    L(158.5, 146.5, -0.6, 1, 2.4, 2.4),         // creux sous la lèvre
    L(160.5, 155.5, 0.15, 1, 3.5, 3.5),         // le petit menton, en retrait
    L(151.5, 166, -1, 0.8, 4, 6),               // dessous du menton
    L(133, 175, -1, 0.2, 8, 8),                 // dessous de la mâchoire, rond et plein
    K(111, 180, [7, -1.5], [-2, 4]),          // la gorge
    L(105, 204, 0.0, 1, 8, 7),                  // devant du cou, mince et court
    L(116, 227, 0.75, 1, 8, 7),                 // creux de la clavicule
    K(136, 248, [-8, -7], [0, 0]),              // départ de la poitrine
  ];
  out.push(`<path d="${courbe(sil, true)}" fill="#fff" stroke="none"/>`);
  out.push(`<path d="${courbe(sil, false)}" ${trait(ep.sil)}/>`);

  // ── les cheveux : bord de la frange en mèches, tempe, par-dessus et derrière l'oreille, nuque ──
  out.push(`<path d="${courbe([
    K(174, 78, [0, 0], [-1.5, -3]),
    L(168.5, 73.5, -1, 0.1, 2, 2),     // le creux entre deux mèches
    K(162, 79, [1.5, -3], [-1.5, -3]), // la pointe d'une mèche
    L(156, 73.5, -1, 0.1, 2, 2),
    K(149, 78.5, [1.5, -3], [-3, -3]),
    L(137, 77, -0.6, 1, 2, 4),         // la tempe
    K(131, 90, [1, -5], [-3, -3]),     // la patte, courte
    L(102, 85, -1, 0.05, 8, 8),        // par-dessus l'oreille
    L(70, 101, -0.35, 1, 6, 10),       // derrière l'oreille, collé à elle
    L(70, 136, 0.1, 1, 8, 6),          // sous le lobe
    K(55, 180, [6, -16], [0, 0]),      // la nuque      // la nuque
  ])}" ${trait(ep.int)}/>`);
  // quelques mèches, qui partent de l'épi du sommet (60, 16)
  out.push(`<path d="${courbe([L(66, 14, 1, 0.1, 0, 26), L(140, 50, 0.5, 1, 16, 0)])}" ${trait(ep.fin)}/>`);
  out.push(`<path d="${courbe([L(98, 26, 1, 0.5, 0, 12), L(126, 58, 0.3, 1, 10, 0)])}" ${trait(ep.fin)}/>`);
  out.push(`<path d="${courbe([L(52, 22, -0.7, 1, 0, 14), L(30, 70, -0.2, 1, 14, 0)])}" ${trait(ep.fin)}/>`);
  // ── l'oreille : hélix, lobe ; conque et tragus en trait fin ──
  out.push(`<path d="${courbe([
    L(96, 98, -0.7, -1, 0, 4),
    L(84, 93.5, -1, 0.05, 5, 5),
    L(73, 106, -0.1, 1, 6, 8),
    L(79.5, 131, 1, 0.6, 5, 3.5),
    L(89.5, 130, 0.7, -1, 3.5, 0),
  ])}" ${trait(ep.int)}/>`);
  out.push(`<path d="${courbe([L(90, 101, -1, -0.4, 0, 3.5), L(80, 103, -0.3, 1, 3.5, 5), L(83, 120, 1, 0.4, 4.5, 0)])}" ${trait(ep.fin)}/>`);
  out.push(`<path d="${courbe([L(94, 110, -0.6, 1, 0, 2.5), L(94, 117, 0.6, 1, 2.5, 0)])}" ${trait(ep.det)}/>`);

  // ── le visage ──
  out.push(`<path d="${courbe([L(140, 91, 1, -0.45, 0, 5), L(155, 88.5, 1, 0.2, 5, 0)])}" ${trait(ep.int)}/>`);         // sourcil
  out.push(`<path d="${courbe([L(144, 101.5, 1, -0.8, 0, 4), L(155.5, 98.5, 1, 0.3, 4, 0)])}" ${trait(ep.int)}/>`);    // paupière du haut
  out.push(`<ellipse cx="${X(152.8)}" cy="${Y(103)}" rx="${(2.6 * s).toFixed(1)}" ry="${(3.7 * s).toFixed(1)}" fill="${N}"/>`); // l'œil
  out.push(`<path d="${courbe([L(155.5, 98.5, 1, -0.2, 0, 1.5), L(158, 97, 1, -0.7, 1.5, 0)])}" ${trait(ep.det)}/>`);  // un cil
  out.push(`<path d="${courbe([L(148, 107.5, 1, 0.3, 0, 3), L(155.5, 107, 1, -0.6, 3, 0)])}" ${trait(ep.fin)}/>`);     // paupière du bas
  out.push(`<path d="${courbe([L(165, 112.5, -0.6, 1, 0, 2.5), L(162.5, 117.5, 1, 0.5, 2.5, 0)])}" ${trait(ep.det)}/>`); // aile du nez
  out.push(`<path d="${courbe([L(161.5, 134, -1, 0.1, 0, 2), L(157, 135, -1, -0.5, 2, 0)])}" ${trait(ep.det)}/>`); // coin de la bouche
  return out.join('\n');
}

const BOITE = { x0: -4, y0: 0, l: 180, h: 248 };   // le dessin entier, en mm

module.exports = (h) => {
  const place = (z, marge) => {
    const s = Math.min((z.l - 2 * marge) / BOITE.l, (z.h - 2 * marge) / BOITE.h);
    const l = BOITE.l * s, ht = BOITE.h * s;
    return dessiner((z.l - l) / 2 - BOITE.x0 * s, (z.h - ht) / 2 - BOITE.y0 * s, s);
  };
  return {
    ref: 'modele',
    titre: 'La tête d’enfant, de profil',
    desc: 'Modèle : tête d’enfant de cinq ans de profil, regard à droite, avec le cou.',
    fichier: '_modeles-tete-enfant-courbes.svg',
    format: 'pleine',
    disposition: [['grand', 'petit']],
    largeurs: [[3, 1]],
    vues: {
      grand: { titre: 'En grand', dessin: z => place(z, 16) },
      petit: { titre: 'À la taille d’usage', dessin: z => `<g transform="translate(0 ${z.h * 0.35})">` + place({ l: z.l, h: z.h * 0.3 }, 6) + '</g>' },
    },
  };
};
module.exports.dessiner = dessiner;
