// Modèle : tête de bébé de quelques mois de profil (regard à droite), avec la naissance des épaules.
// Reprise de TETES.bebe de formes.js, corrigée point par point. Pas une planche du livre ;
// dessiner(x, y, echelle) est à porter dans formes.js.
//
// Repère en mm (à l'échelle où une tête d'adulte fait 230), y vers le bas : x = 0 à l'arrière du
// crâne, y = 0 au sommet du crâne. La tête fait 140 de long pour 146 du sommet au menton.
// Ce qui a changé par rapport à formes.js (TETES.bebe) :
//   - le crâne : une boule pleine dont le visage n'occupe que le quart avant-bas (sourcil → menton
//     = 60 sur 146) ; l'arrière descend bas et rond jusqu'à la nuque ;
//   - le front qui bombe en avant du nez ; le creux du nez à peine marqué, très bas ;
//   - le nez bouton : court, rond, la pointe qui retrousse, une narine en virgule ;
//   - la lèvre du haut qui avance, celle du bas en retrait, le menton petit et fuyant ;
//   - la grosse joue : une courbe pleine qui déborde jusque devant la commissure, et le double menton ;
//   - presque pas de cou : la gorge est un pli sous le menton, la nuque un pli sous l'occiput,
//     l'épaule monte jusque sous l'oreille (formes.js avait un tube de cou de 20 mm) ;
//   - l'oreille basse et en arrière : le haut au niveau de l'œil, le bas au niveau de la bouche ;
//   - l'œil grand, ouvert vers l'avant, l'iris noir, le cil ; quelques mèches fines, pas un crâne lisse.
// Repères : sommet 0 · œil 97 · pointe du nez 112 · bouche 125 · menton 146 · oreille 91–125

function dessiner(x, y, s) {
  const X = v => +(x + v * s).toFixed(1), Y = v => +(y + v * s).toFixed(1);
  const pt = p => `${X(p[0])} ${Y(p[1])}`;
  const EP = { sil: 1.5, int: 0.7, fin: 0.5 };
  const att = ep => `fill="none" stroke="#000" stroke-width="${ep}" stroke-linecap="round" stroke-linejoin="round"`;
  // Catmull-Rom → Bézier ; chaque jonction entre deux suites est un coin
  const courbe = (P, k = 1 / 6) => {
    let o = '';
    for (let i = 0; i < P.length - 1; i++) {
      const a = P[i - 1] || P[i], b = P[i], c = P[i + 1], e = P[i + 2] || P[i + 1];
      o += ` C${pt([b[0] + (c[0] - a[0]) * k, b[1] + (c[1] - a[1]) * k])} ${pt([c[0] - (e[0] - b[0]) * k, c[1] - (e[1] - b[1]) * k])} ${pt(c)}`;
    }
    return o;
  };
  const trace = (...suites) => `M${pt(suites[0][0])}` + suites.map(S => courbe(S)).join('');
  const chemin = (d, ep) => `<path d="${d}" ${att(ep)}/>`;
  const blanc = d => `<path d="${d}" fill="#fff" stroke="none"/>`;
  const noir = d => `<path d="${d}" fill="#000" stroke="none"/>`;

  // ── le contour, de la nuque par-dessus le crâne jusqu'à la gorge ──
  const crane = [[33, 137], [24, 130], [12, 117], [4, 100], [0, 80], [1, 58], [9, 35], [24, 16], [44, 4], [66, 0], [88, 1], [108, 8], [124, 22], [134, 40], [138.5, 56], [139.5, 69], [138, 80], [134.8, 88.5], [132, 93.5]];
  const nez = [[132, 93.5], [132, 99], [134.5, 104], [138.8, 107.6], [140.6, 111.2], [139.4, 114.6], [136, 116.2], [133.4, 116.6]];
  const levreH = [[133.4, 116.6], [134, 119], [136.5, 122], [136.2, 124.3], [133, 125.3]];
  const levreB = [[133, 125.3], [134.6, 127.4], [134.2, 130.2], [131.6, 132.4], [130.6, 133.4]];
  const menton = [[130.6, 133.4], [131.3, 136.2], [130.7, 139.8], [128.2, 143], [123.5, 145.6], [116, 148.6], [110, 149.8], [106, 150]];
  // ── sous le menton, presque tout de suite la poitrine ; derrière, la nuque qui file dans le dos ──
  const poitrine = [[106, 150], [108.5, 156], [114, 166], [119, 182]];
  const dos = [[33, 137], [28.5, 143], [20, 153], [12, 167], [8, 182]];

  const o = [];
  const tour = trace(crane.slice(0, -1).concat(nez), levreH, levreB, menton, poitrine) + ` L${pt([8, 182])}` + courbe(dos.slice().reverse()) + ' Z';
  o.push(blanc(tour));
  o.push(chemin(trace(crane.slice(0, -1).concat(nez), levreH, levreB, menton, poitrine), EP.sil));
  o.push(chemin(trace(dos), EP.sil));

  // l'épaule qui monte jusque sous l'oreille, le bras qui part vers le bas
  o.push(chemin(trace([[22, 182], [28, 162], [42, 147], [60, 141], [80, 144], [94, 156], [100, 182]]), EP.int));
  // les plis : la gorge sous le double menton, la nuque sous l'occiput
  o.push(chemin(trace([[106, 150], [98, 148.6], [90, 149.6]]), EP.fin));
  o.push(chemin(trace([[33, 137], [39, 140.5], [46, 141]]), EP.fin));

  // la grosse joue : pleine, elle déborde jusque devant la commissure et retombe en double menton
  o.push(chemin(trace([[115, 107.5], [122, 113], [126.6, 121.5], [127.4, 131], [124, 139], [117.5, 143.5]]), EP.fin));

  // l'oreille : basse, ronde, charnue ; peinte par-dessus
  const helix = [[67, 95], [61, 91.5], [53.5, 92.5], [48, 98.5], [46, 107], [47, 116], [51, 122.5], [57, 125], [62, 123], [64, 118]];
  o.push(blanc(trace(helix) + ` L${pt([68, 108])} Z`));
  o.push(chemin(trace(helix), EP.int));
  o.push(chemin(trace([[61, 96.5], [54, 97.5], [51, 105], [52.5, 114], [57, 118]]), EP.fin));   // l'anthélix
  o.push(chemin(trace([[66.5, 106], [63.5, 109], [65.5, 113]]), EP.fin));                       // le tragus

  // l'œil, de profil : grand, ouvert vers l'avant, l'iris noir sous la paupière
  o.push(chemin(trace([[113.5, 97.5], [117, 94.2], [121.5, 93.2], [125, 94.6]]), EP.int + 0.2));   // la paupière du haut, le cil
  o.push(chemin(trace([[125, 94.6], [126.8, 93.6]]), EP.fin));                                      // le bout du cil
  o.push(chemin(trace([[114.5, 98.6], [119, 100.6], [123.5, 99.8]]), EP.fin));                     // la paupière du bas
  o.push(noir(`M${pt([123.4, 94.3])} C${pt([125, 95.5])} ${pt([125, 98.5])} ${pt([123.4, 99.8])} C${pt([121.3, 99])} ${pt([120.8, 95.4])} ${pt([123.4, 94.3])} Z`));   // l'iris
  o.push(chemin(trace([[115, 84.5], [120, 82.8], [126, 83.4]]), EP.fin));                          // le sourcil, à peine
  // la narine en virgule, la commissure
  o.push(chemin(trace([[136.5, 109.5], [133.8, 110.6], [134.2, 113.4]]), EP.fin));
  o.push(chemin(trace([[133, 125.3], [130.2, 126], [128.4, 125.3]]), EP.fin));

  // les cheveux : fins et rares, quelques mèches qui suivent le crâne, une petite touffe au sommet
  const meches = [
    [[68, 8], [86, 10], [102, 18], [110, 26]], [[72, 14], [88, 19], [100, 29]], [[60, 9], [46, 13], [33, 23]],
    [[58, 15], [44, 22], [32, 36]],
  ];
  for (const m of meches) o.push(chemin(trace(m), EP.fin));
  o.push(chemin(trace([[70, 0.3], [67, -5], [70, -9.5], [76, -9]]), EP.fin));
  return o.join('\n');
}

module.exports = (h) => ({
  ref: 'modele',
  titre: 'La tête de bébé, de profil',
  desc: 'Modèle : tête de bébé de quelques mois de profil, regard à droite, avec la naissance des épaules.',
  fichier: '_modeles-tete-bebe-reprise.svg',
  format: 'pleine',
  disposition: [['profil']],
  vues: {
    profil: {
      dessin: z => {
        // boîte du dessin : x de 0 à 141, y de -10 à 182
        const L = 141, H = 192;
        const s = Math.min((z.l - 40) / L, (z.h - 30) / H);
        return dessiner((z.l - L * s) / 2, (z.h - H * s) / 2 + 10 * s, s);
      },
    },
  },
});
module.exports.dessiner = dessiner;
