// Modèle : tête d'homme adulte de profil (regard à droite), avec le cou. Reprise de TETES.adulte
// de formes.js, corrigée point par point. Pas une planche du livre ; dessiner(x, y, echelle) est à
// porter dans formes.js.
//
// Repère en mm d'adulte, y vers le bas : x = 0 à l'arrière du crâne, y = 0 au sommet (sous les
// cheveux). Ce qui a changé par rapport à formes.js :
//   - le crâne arrière : 200 de long au lieu de 187, l'occiput plein et bas (y 100) ;
//   - l'œil à mi-hauteur (115 sur 230), en « < » couché, 12 derrière l'arcade ;
//   - la base du nez à 158 (tiers inférieur), le nez qui sort de 22 devant l'arcade ;
//   - l'oreille du sourcil (100) à la base du nez (160), juste derrière le milieu du crâne (100) ;
//   - le cou penché vers l'avant (le haut devant le bas), qui part sous l'oreille, derrière
//     l'angle de la mâchoire, au lieu de deux droites verticales ;
//   - la ligne de la mâchoire et la patte devant l'oreille, qui manquaient.
// Repères : sommet 0 · lisière 44 · sourcil 100 · œil 115 · base du nez 158 · bouche 180 · menton 230
//   arrière 0 · tragus 97 · arcade 198 · pointe du nez 220 · angle de la mâchoire (118, 204)

function dessiner(x, y, s) {
  const X = v => +(x + v * s).toFixed(1), Y = v => +(y + v * s).toFixed(1);
  const pt = p => `${X(p[0])} ${Y(p[1])}`;
  const EP = { sil: 1.5, int: 0.7, fin: 0.5 };
  const att = (ep, rempli) => `fill="${rempli ? '#fff' : 'none'}" stroke="#000" stroke-width="${ep}" stroke-linecap="round" stroke-linejoin="round"`;
  // Catmull-Rom → Bézier ; une liste de suites, chaque jonction entre deux suites est un coin
  const courbe = (P, k = 1 / 6) => {
    let o = '';
    for (let i = 0; i < P.length - 1; i++) {
      const a = P[i - 1] || P[i], b = P[i], c = P[i + 1], e = P[i + 2] || P[i + 1];
      o += ` C${pt([b[0] + (c[0] - a[0]) * k, b[1] + (c[1] - a[1]) * k])} ${pt([c[0] - (e[0] - b[0]) * k, c[1] - (e[1] - b[1]) * k])} ${pt(c)}`;
    }
    return o;
  };
  const trace = (...suites) => `M${pt(suites[0][0])}` + suites.map(S => courbe(S)).join('');
  const chemin = (d, ep) => `<path d="${d}" ${att(ep, false)}/>`;
  const blanc = d => `<path d="${d}" fill="#fff" stroke="none"/>`;   // un fond blanc qui cache ce qui est derrière

  // ── le visage, de la lisière du front au dessous du menton ──
  const front = [[180, 44], [190, 62], [196, 82], [198, 98]];                 // le front, jusqu'à l'arcade
  const racine = [[198, 98], [196, 106], [192, 112]];                         // l'arcade rentre au creux du nez
  const nez = [[192, 112], [199, 124], [208, 137], [216, 147], [220, 152.5], [218.5, 157], [213, 158.5]];
  const sous = [[213, 158.5], [206, 158], [200, 160]];                        // le dessous du nez, la cloison
  const levres = [[200, 160], [201, 168], [202, 175], [199, 180]];            // la lèvre du haut
  const bas = [[199, 180], [202, 186], [200, 192], [194, 197]];              // la lèvre du bas
  const menton = [[194, 197], [198, 206], [202.5, 217], [199, 227], [187, 231.5], [168, 233], [150, 236]];
  // ── le cou : il penche vers l'avant (le haut plus en avant que le bas) ──
  const gorge = [[150, 236], [142, 244], [139, 258], [137, 268], [132, 292], [128, 312]];
  const nuque = [[44, 198], [41, 230], [36, 262], [30, 290], [22, 312]];

  // ── le crâne et les cheveux, une masse ──
  // dessus : le contour extérieur des cheveux (6 de plus que le crâne), du front à la nuque
  const dessus = [[180, 44], [178, 30], [164, 12], [138, -3], [104, -7], [68, -1], [36, 16], [12, 44], [-3, 78], [-6, 106], [-1, 134], [12, 162], [28, 184], [44, 198]];
  // la lisière : du front, la tempe, la patte, le tour de l'oreille, la nuque
  const lisiere = [[180, 44], [168, 51], [158, 62], [152, 76], [148, 92], [144, 108], [141, 120]];
  const patte = [[141, 120], [126, 121], [120, 110], [114, 100], [108, 96]];
  const derriere = [[108, 96], [92, 91], [74, 93], [62, 106], [56, 130], [52, 160], [48, 182], [44, 198]];

  const o = [];
  // le cou d'abord, ouvert en bas
  // la peau : le visage, le dessous du menton, la gorge, la nuque, le derrière de l'oreille
  o.push(blanc(trace(front, racine, nez, sous, levres, bas, menton) + ` L${pt([140, 250])} L${pt([46, 210])} Z`));
  o.push(chemin(trace(front, racine, nez, sous, levres, bas, menton), EP.sil));
  o.push(chemin(trace(gorge), EP.sil) + chemin(trace(nuque), EP.sil));
  // la masse des cheveux : blanche, contour fort dehors, lisière au trait intérieur
  o.push(blanc(trace(dessus) + courbe(derriere.slice().reverse()) + courbe(patte.slice().reverse()) + courbe(lisiere.slice().reverse()) + ' Z'));
  o.push(chemin(trace(dessus), EP.sil));
  o.push(chemin(trace(lisiere, patte, derriere), EP.int));
  // trois mèches courtes, qui suivent le crâne vers l'arrière
  o.push(chemin(trace([[160, 22], [128, 14], [96, 18]]), EP.fin));
  o.push(chemin(trace([[150, 44], [118, 34], [84, 40], [60, 54]]), EP.fin));

  // la mâchoire : de l'oreille à l'angle, puis vers le menton, qui se fond dans le dessous
  o.push(chemin(trace([[100, 164], [108, 186], [118, 204], [134, 216], [152, 224]]), EP.fin));
  // le muscle du cou : de derrière l'oreille au creux, en bas devant
  o.push(chemin(trace([[70, 168], [84, 212], [102, 262], [114, 304]]), EP.fin));

  // l'oreille : du sourcil à la base du nez, un peu penchée vers l'arrière, peinte par-dessus
  const helix = [[98, 106], [90, 99], [78, 98], [69, 106], [66, 122], [68, 138], [74, 150], [80, 159], [88, 162], [94, 157], [96, 148]];
  o.push(blanc(trace(helix) + ` L${pt([99, 124])} Z`));
  o.push(chemin(trace(helix), EP.int));
  o.push(chemin(trace([[90, 108], [80, 108], [76, 118], [79, 132], [86, 140]]), EP.fin));     // l'anthélix
  o.push(chemin(trace([[97, 128], [93, 134], [96, 140]]), EP.fin));                           // le tragus
  o.push(chemin(trace([[98, 106], [99, 116], [98, 126]]), EP.fin));                           // l'attache

  // l'œil, de profil : un « < » couché, la pointe vers l'arrière, la cornée au bout
  o.push(chemin(trace([[176, 113.5], [182, 110.5], [188, 110], [191, 112]]), EP.int));       // paupière du haut
  o.push(chemin(trace([[177, 115], [183, 118], [189, 117]]), EP.fin));                       // paupière du bas
  o.push(chemin(trace([[189.5, 111], [188, 114], [189, 117]]), EP.fin));                     // la cornée
  o.push(chemin(trace([[172, 100], [182, 97], [192, 98]]), EP.int));                         // le sourcil
  // l'aile du nez, la commissure
  o.push(chemin(trace([[207, 150], [201, 147], [198, 152], [201, 157]]), EP.fin));
  o.push(chemin(trace([[199, 180], [193, 181], [188, 181.5]]), EP.fin));
  return o.join('\n');
}

module.exports = (h) => ({
  ref: 'modele',
  titre: 'La tête d’homme, de profil',
  desc: 'Modèle : tête d’homme adulte de profil, regard à droite, avec le cou.',
  fichier: '_modeles-tete-adulte-reprise.svg',
  format: 'pleine',
  disposition: [['profil']],
  vues: {
    profil: {
      dessin: z => {
        // boîte du dessin : x de -6 à 220, y de -7 à 312
        const L = 226, H = 319;
        const s = Math.min((z.l - 40) / L, (z.h - 30) / H);
        return dessiner((z.l - L * s) / 2 + 6 * s, (z.h - H * s) / 2 + 7 * s, s);
      },
    },
  },
});
module.exports.dessiner = dessiner;
