// Modèle : tête d'enfant de 4 à 6 ans de profil (regard à droite), avec le cou. Reprise de
// TETES.enfant de formes.js, corrigée point par point. Pas une planche du livre ; dessiner(x, y,
// echelle) est à porter dans formes.js.
//
// Repère en mm d'enfant (à l'échelle où une tête d'adulte fait 230), y vers le bas : x = 0 à
// l'arrière du crâne, y = 0 au sommet du crâne (sous les cheveux).
// Ce qui a changé par rapport à formes.js (TETES.enfant) :
//   - le crâne : 172 de long pour 184 de haut, une boule, l'arrière plein et bas ; le visage
//     (sourcil → menton) tassé dans le quart avant-bas au lieu d'une demi-tête d'adulte ;
//   - l'œil bien sous la mi-hauteur (106 sur 184), plus grand, l'iris noir, le cil du haut ;
//   - le nez court, l'arête creuse, la pointe qui retrousse (le dessous monte vers la pointe) ;
//   - la joue ronde qui déborde devant la bouche, le petit menton en retrait sous la lèvre ;
//   - le cou mince (64 de profondeur, 172 de tête) qui part sous l'oreille, au lieu d'un tube aussi
//     large que la mâchoire ;
//   - les cheveux : une masse avec une frange sur le front, et non une calotte de mannequin.
// Repères : sommet 0 · mi-hauteur 92 · frange 64 · sourcil 94 · œil 106 · pointe du nez 128
//   base du nez 136 · bouche 150 · menton 184 · arrière 0 · oreille 74–102 · front 170 · nez 178

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
  const inv = S => S.slice().reverse();
  const chemin = (d, ep) => `<path d="${d}" ${att(ep)}/>`;
  const blanc = d => `<path d="${d}" fill="#fff" stroke="none"/>`;
  const ovale = (cx, cy, rx, ry) => `M${pt([cx, cy - ry])} A${(rx * s).toFixed(1)} ${(ry * s).toFixed(1)} 0 1 1 ${pt([cx, cy + ry])} A${(rx * s).toFixed(1)} ${(ry * s).toFixed(1)} 0 1 1 ${pt([cx, cy - ry])} Z`;
  const noir = d => `<path d="${d}" fill="#000" stroke="none"/>`;

  // ── le visage, du front sous la frange au dessous du menton ──
  const front = [[166, 60], [170, 72], [171, 84], [169, 94], [166, 101]];         // le front qui bombe
  const nez = [[166, 101], [167, 110], [170, 118], [174, 123.5], [176, 127.5], [174, 131], [169, 133], [165.5, 134.5]];      // l'arête creuse, courte
  const pointe = [[165.5, 134.5], [164, 136]];  // le dessous qui retrousse
  const levres = [[164, 136], [165, 141], [166.5, 145], [163.5, 148.5]];              // la lèvre du haut
  const bas = [[163.5, 148.5], [164.8, 151.5], [162.8, 155], [158.5, 157.5]];                 // la lèvre du bas
  const menton = [[158.5, 157.5], [158.8, 162], [157.8, 168], [153, 172.5], [145, 175.5], [135, 177]];
  // ── le cou, mince ──
  const gorge = [[135, 177], [129, 182], [126.5, 194], [126, 210]];
  const nuque = [[56, 172], [58, 192], [58, 210]];

  // ── les cheveux : la masse, du bout de la frange à la nuque ──
  const dessus = [[168.5, 72], [171.5, 64], [171.5, 52], [165, 34], [148, 14], [118, -2], [80, -8], [42, 0], [12, 28], [-4, 60], [-9, 96], [-4, 128], [10, 152], [30, 168], [58, 176]];
  // le bord : la nuque, derrière l'oreille, le tour du haut de l'oreille, la tempe, la frange
  const nuqueH = [[58, 176], [62, 164], [66, 146], [70, 122], [74, 106], [80, 98]];
  const tempe = [[80, 98], [94, 88], [110, 87], [120, 90]];
  const patte = [[120, 90], [126, 87], [129, 80], [133, 72], [140, 69]];
  const frange = [[140, 69], [148, 73], [156, 71], [162, 74], [168.5, 72]];

  const o = [];
  // la peau : le visage, le dessous du menton, la gorge, la nuque
  o.push(blanc(trace(front, nez, pointe, levres, bas, menton) + ` L${pt([126, 210])} L${pt([58, 210])} L${pt([56, 172])} Z`));
  o.push(chemin(trace(front, nez, pointe, levres, bas, menton), EP.sil));
  o.push(chemin(trace(gorge), EP.sil) + chemin(trace(nuque), EP.sil));
  // la masse des cheveux
  o.push(blanc(trace(dessus) + courbe(nuqueH) + courbe(tempe) + courbe(patte) + courbe(frange) + ' Z'));
  o.push(chemin(trace(dessus), EP.sil));
  o.push(chemin(trace(nuqueH, tempe, patte, frange), EP.int));
  // trois mèches qui partent du tourbillon vers l'avant et l'arrière
  o.push(chemin(trace([[100, 4], [126, 12], [146, 30], [156, 52]]), EP.fin));
  o.push(chemin(trace([[92, 8], [60, 18], [30, 46]]), EP.fin));
  // l'épi du tourbillon, une mèche qui se relève
  o.push(chemin(trace([[86, -7.5], [84, -13], [90, -16.5]]), EP.int));

  // la joue ronde : une courbe qui descend de sous l'œil et revient vers la bouche
  o.push(chemin(trace([[141, 121], [148, 130], [149.5, 140], [145, 149]]), EP.fin));

  // l'oreille : du sourcil à la base du nez, ronde, peinte par-dessus
  const helix = [[103, 100], [96, 93], [86, 92], [78, 98], [74, 110], [75, 123], [80, 133], [88, 138], [95, 136], [99, 129]];
  o.push(blanc(trace(helix) + ` L${pt([104, 116])} Z`));
  o.push(chemin(trace(helix), EP.int));
  o.push(chemin(trace([[95, 100], [85, 100], [81, 110], [83, 122], [90, 127]]), EP.fin));   // l'anthélix
  o.push(chemin(trace([[103, 113], [99, 118], [102, 123]]), EP.fin));                        // le tragus

  // l'œil, de profil : grand, la paupière du haut ronde, l'iris noir sous elle
  o.push(chemin(trace([[145, 106], [150, 101.5], [156, 101], [160, 104]]), EP.int + 0.2));   // paupière du haut, le cil
  o.push(chemin(trace([[147, 108.5], [153, 111], [158.5, 109]]), EP.fin));                   // paupière du bas
  o.push(noir(ovale(155.8, 105.6, 2.7, 3.5)));                                              // l'iris
  o.push(chemin(trace([[146, 92], [153, 89.5], [161, 90]]), EP.int));                        // le sourcil, léger
  // la narine, la commissure
  o.push(chemin(trace([[171.5, 127], [168, 128], [168.5, 131.5]]), EP.fin));
  o.push(chemin(trace([[165, 150], [161, 150.5], [158, 149.5]]), EP.fin));
  return o.join('\n');
}

module.exports = (h) => ({
  ref: 'modele',
  titre: 'La tête d’enfant, de profil',
  desc: 'Modèle : tête d’enfant de quatre à six ans de profil, regard à droite, avec le cou.',
  fichier: '_modeles-tete-enfant-reprise.svg',
  format: 'pleine',
  disposition: [['profil']],
  vues: {
    profil: {
      dessin: z => {
        // boîte du dessin : x de -9 à 179, y de -17 à 210
        const L = 188, H = 227;
        const s = Math.min((z.l - 40) / L, (z.h - 30) / H);
        return dessiner((z.l - L * s) / 2 + 9 * s, (z.h - H * s) / 2 + 17 * s, s);
      },
    },
  },
});
module.exports.dessiner = dessiner;
