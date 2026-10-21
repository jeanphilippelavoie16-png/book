// Modèle : tête d'homme adulte de profil (regard à droite), avec le cou et la naissance des épaules.
// Pas une planche du livre. dessiner(x, y, echelle) est à porter dans formes.js.
//
// Repère en mm d'adulte, y vers le bas. Origine : x = 0 à l'arrière du crâne (cheveux compris),
// y = 0 au sommet du crâne (sous les cheveux, qui font 6 mm).
// Repères (hauteurs) :
//   sommet 0 (cheveux -6) · lisière des cheveux au front 46 · sourcils 100 · œil 115 (mi-hauteur)
//   base du nez 160 · bouche 181 · menton 230 : la tête fait 230 du sommet au menton
// Repères (profondeurs) :
//   arrière du crâne 0 (occiput à y = 105) · glabelle 198 : longueur de tête 198
//   milieu du crâne 99 ; tragus (devant de l'oreille) 103, juste derrière le milieu
//   oreille : de 69 à 104, du sourcil (99) à la base du nez (163), penchée vers l'arrière de 12°
//   pointe du nez 219, à 21 devant la glabelle ; œil (cornée) 191, 7 derrière la glabelle
//   cou : devant, de la gorge (138, 243) à (120, 330) ; derrière, de la nuque (47, 200) à (30, 300) :
//   il part sous l'oreille, derrière l'angle de la mâchoire (110, 207), et penche vers l'avant.

function dessiner(x, y, s) {
  const N = '#000';
  const X = v => +(x + v * s).toFixed(1), Y = v => +(y + v * s).toFixed(1);
  const pt = p => `${X(p[0])} ${Y(p[1])}`;
  const trait = ep => `fill="none" stroke="${N}" stroke-width="${ep}" stroke-linecap="round" stroke-linejoin="round"`;
  const suite = (P, k = 1 / 6) => {
    let o = '';
    for (let i = 0; i < P.length - 1; i++) {
      const a = P[i - 1] || P[i], b = P[i], c = P[i + 1], e = P[i + 2] || P[i + 1];
      const c1 = [b[0] + (c[0] - a[0]) * k, b[1] + (c[1] - a[1]) * k];
      const c2 = [c[0] - (e[0] - b[0]) * k, c[1] - (e[1] - b[1]) * k];
      o += ` C${pt(c1)} ${pt(c2)} ${pt(c)}`;
    }
    return o;
  };
  // plusieurs suites bout à bout : coin entre elles
  const trace = (...S) => `M${pt(S[0][0])}` + S.map(P => suite(P)).join('');
  const ep = { sil: 1.5, int: 0.8, det: 0.6, fin: 0.5 };
  const out = [];

  // ── la silhouette : épaule arrière → nuque → crâne → visage → gorge → poitrine ──
  const dos = [[-42, 318], [-12, 305], [12, 292], [29, 275], [38, 252], [44, 226], [47, 210], [49, 199]];
  const crane = [[49, 199], [38, 190], [22, 176], [8, 155], [1, 130], [0, 105], [4, 72], [18, 42],
    [42, 17], [72, 1], [104, -6], [136, -3], [160, 8], [176, 24], [184, 40], [184, 46]];
  const front = [[184, 46], [188, 58], [192, 75], [196, 90], [198, 100], [196, 107], [193, 111]];
  const nez = [[193, 111], [197, 121], [204, 133], [212, 144], [218, 151], [219.5, 155], [217, 158.5], [210, 160.5], [201, 161]];
  const levreH = [[201, 161], [202, 167], [205, 174], [204.5, 178], [199, 181]];
  const levreB = [[199, 181], [203, 185], [203, 190], [199, 195.5], [192, 200]];
  const menton = [[192, 200], [195, 208], [198.5, 218], [196, 226], [188, 231.5], [176, 234], [158, 236], [144, 239], [138, 243]];
  const gorge = [[138, 243], [140, 255], [144, 267], [142, 279], [137, 295], [134, 307], [136.5, 317], [147, 325.5], [165, 332]];
  out.push(`<path d="${trace(dos, crane, front, nez, levreH, levreB, menton, gorge)}" ${trait(ep.sil)}/>`);

  // ── les cheveux : la lisière, du front, autour de l'oreille, jusqu'à la nuque ──
  out.push(`<path d="${trace(
    [[184, 46], [176, 52], [164, 61], [154, 73], [145, 87], [135, 98], [124, 104]],
    [[124, 104], [121, 116], [118, 127], [114, 132]],
    [[114, 132], [110, 124], [108, 112], [106, 101], [96, 94], [80, 92], [67, 98], [60, 112], [57, 135], [55, 162], [52, 185], [49, 199]],
  )}" ${trait(ep.int)}/>`);

  // ── l'oreille : bord de l'hélix, lobe, tragus ; antihélix et conque en trait fin ──
  out.push(`<path d="${trace(
    [[104, 108], [99, 101], [89, 98], [78, 100], [71, 108], [69, 122], [71, 138], [75, 151], [81, 160], [88, 164], [95, 163], [99, 157], [101, 150]],
  )}" ${trait(ep.int)}/>`);
  out.push(`<path d="${trace([[95, 106], [85, 104], [77, 110], [76, 124], [78, 140]])}" ${trait(ep.fin)}/>`);
  out.push(`<path d="${trace([[92, 114], [85, 121], [84, 134], [88, 146], [94, 150]])}" ${trait(ep.fin)}/>`);
  out.push(`<path d="${trace([[103, 130], [99.5, 135], [100, 142], [103, 145]])}" ${trait(ep.det)}/>`);

  // ── le visage : sourcil, œil en V couché, aile du nez, bouche, mâchoire ──
  out.push(`<path d="${trace([[172, 99], [182, 96], [190, 96.5], [195, 99]])}" ${trait(ep.int)}/>`);
  out.push(`<path d="${trace([[177, 115.5], [183, 111.5], [189, 110.5], [191.5, 113]])}" ${trait(ep.int)}/>`);   // paupière du haut
  out.push(`<path d="${trace([[178, 117], [184, 119.5], [190, 118]])}" ${trait(ep.det)}/>`);                     // paupière du bas
  out.push(`<path d="${trace([[188.5, 111], [187.3, 114.5], [188.5, 118.5]])}" ${trait(ep.det)}/>`);             // la cornée
  out.push(`<path d="${trace([[207, 151], [201, 148], [197.5, 152.5], [200, 158], [206, 159.5]])}" ${trait(ep.det)}/>`);
  out.push(`<path d="${trace([[199, 181], [193, 182], [188, 182.5]])}" ${trait(ep.det)}/>`);
  out.push(`<path d="${trace([[160, 235.5], [140, 228], [122, 218], [112, 208], [109, 198]])}" ${trait(ep.fin)}/>`);
  // le sterno-cléido-mastoïdien : de derrière l'oreille au creux du cou
  out.push(`<path d="${trace([[82, 174], [92, 206], [106, 250], [122, 288], [134, 307.5]])}" ${trait(ep.fin)}/>`);
  return out.join('\n');
}

module.exports = (h) => ({
  ref: 'modele',
  titre: 'La tête d’homme, de profil',
  desc: 'Modèle : tête d’homme adulte de profil, regard à droite, avec le cou.',
  fichier: '_modeles-tete-adulte-courbes.svg',
  format: 'pleine',
  disposition: [['profil']],
  vues: {
    profil: {
      dessin: z => {
        const s = Math.min((z.l - 40) / 262, (z.h - 30) / 342);
        const l = 262 * s, ht = 342 * s;
        return dessiner((z.l - l) / 2 + 42 * s, (z.h - ht) / 2 + 7 * s, s);
      },
    },
  },
});
module.exports.dessiner = dessiner;
