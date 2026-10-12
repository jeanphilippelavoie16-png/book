// Planche 82-10b — Le poêle qu'on répare : le joint de la porte à la pâte d'argile et de cendre,
// et le test de la feuille (chapitre 82, « Le joint de la porte du poêle »). Suite de 82-10a.
// Aucune cote : le chapitre ne donne aucune dimension.
//
// Chaque vue a son repère de modèle (unités arbitraires, jamais imprimées), mis à l'échelle
// par cadre() pour remplir la vue en gardant les proportions.

module.exports = (h) => {
  const f = v => +v.toFixed(1);
  const W = t => h.a[t].replace('fill="none"', 'fill="#ffffff"');   // trait sur aplat blanc

  // repère de modèle W × H centré dans la vue z
  const cadre = (z, LW, LH, m = 4) => {
    const s = Math.min((z.l - 2 * m) / LW, (z.h - 2 * m) / LH);
    const ox = (z.l - LW * s) / 2, oy = (z.h - LH * s) / 2;
    const X = x => ox + x * s, Y = y => oy + y * s;
    const D = (...cs) => cs.map(([k, ...v]) => {
      if (k === 'Z') return 'Z';
      if (k === 'A') return `A${f(v[0] * s)} ${f(v[1] * s)} ${v[2]} ${v[3]} ${v[4]} ${f(X(v[5]))} ${f(Y(v[6]))}`;
      const o = [];
      for (let i = 0; i < v.length; i += 2) o.push(`${f(X(v[i]))} ${f(Y(v[i + 1]))}`);
      return k + o.join(' ');
    }).join(' ');
    return {
      s, X, Y, D,
      p: (x, y) => [X(x), Y(y)],
      R: (x, y, l, ht, at) => h.rect(X(x), Y(y), l * s, ht * s, at),
      C: (cx, cy, r, at) => h.cercle(X(cx), Y(cy), r * s, at),
      L: (x1, y1, x2, y2, at) => h.ligne(X(x1), Y(y1), X(x2), Y(y2), at),
      P: (d, at) => h.path(d, at),
      F: (d, at) => h.fleche(d, at),
    };
  };

  // ── la pâte posée, en coupe verticale au bord haut de la porte : le poêle à gauche (dessus et
  // devanture, l'ouverture sous y = 150), la porte à droite, sa rainure face au poêle
  const MP = [420, 240];
  const pose = z => {
    const g = cadre(z, ...MP), o = [];
    const etape = (ox, ouvert) => {
      const d = ox + (ouvert ? 118 : 80);   // face intérieure de la porte
      o.push(g.P(g.D(['M', ox, 10], ['L', ox + 68, 10], ['L', ox + 68, 150], ['L', ox + 60, 150], ['L', ox + 60, 18],
        ['L', ox, 18], ['Z']), h.a.hachure('metal', 'arete')));
      o.push(g.P(g.D(['M', d, 100], ['L', d + 14, 100], ['L', d + 14, 236], ['L', d, 236], ['L', d, 130],
        ['L', d + 7, 130], ['L', d + 7, 115], ['L', d, 115], ['Z']), h.a.hachure('metal', 'arete')));
      // le papier ciré contre la devanture
      o.push(g.L(ox + 69.5, 84, ox + 69.5, 170, h.a.detail));
      if (ouvert) {
        o.push(g.P(g.D(['M', d + 7, 115], ['L', d, 115], ['L', d, 113], ['C', d - 10, 112, d - 15, 117, d - 15, 122.5],
          ['C', d - 15, 128, d - 10, 133, d, 132], ['L', d, 130], ['L', d + 7, 130], ['Z']), h.a.hachure('terre', 'arete')));
        o.push(g.F(g.D(['M', ox + 176, 70], ['L', ox + 104, 70])));
      } else {
        o.push(g.P(g.D(['M', d + 7, 115], ['L', d, 115], ['L', d, 112.5], ['Q', d - 6, 110.5, ox + 70.5, 111.5],
          ['L', ox + 70.5, 133.5], ['Q', d - 6, 134.5, d, 132.5], ['L', d, 130], ['L', d + 7, 130], ['Z']),
          h.a.hachure('terre', 'arete')));
      }
    };
    etape(0, true);
    etape(230, false);
    return o.join('\n');
  };

  // ── le poêle de face, la porte fermée sur une feuille
  const MT = [260, 300];
  const test = z => {
    const g = cadre(z, ...MT), o = [];
    o.push(g.R(0, 288, 260, 9, h.a.hachure('terre', 'aucun')), g.L(0, 288, 260, 288, h.a.arete));
    o.push(g.R(163, 0, 30, 30, W('arete')), g.R(158, 30, 40, 32, W('arete')));
    [[38, 250], [208, 250]].forEach(([x, y]) => o.push(g.R(x, y, 14, 38, W('arete'))));
    o.push(g.R(30, 70, 200, 180, W('contour')), g.R(22, 62, 216, 8, W('arete')));
    // les autres places où la feuille s'essaie, au tireté
    [[92, 90, 20, 15], [138, 90, 20, 15], [52, 150, 18, 20], [92, 225, 20, 15], [138, 225, 20, 15], [190, 190, 18, 18]]
      .forEach(([x, y, l, ht]) => o.push(g.R(x, y, l, ht, h.a.cache)));
    // la porte, ses pentures, sa poignée
    o.push(g.R(70, 105, 120, 120, W('contour')), g.R(82, 117, 96, 96, h.a.fin));
    o.push(g.R(63, 118, 8, 16, W('arete')), g.R(63, 196, 8, 16, W('arete')));
    o.push(g.R(177, 162, 6, 28, W('arete')), g.C(180, 165, 4, W('arete')));
    // la feuille pincée côté poignée, tirée ; sa partie cachée sous la porte au tireté
    o.push(g.R(190, 128, 24, 24, W('arete')), g.L(180, 128, 190, 128, h.a.cache), g.L(180, 152, 190, 152, h.a.cache),
      g.L(180, 128, 180, 152, h.a.cache));
    o.push(g.F(g.D(['M', 220, 140], ['L', 252, 140])));
    return o.join('\n');
  };

  // ── la feuille au joint, grossie : à gauche le joint tient, à droite il fuit
  const MF = [300, 200];
  const feuille = z => {
    const g = cadre(z, ...MF), o = [];
    const joint = (ox, fuit) => {
      o.push(g.R(ox + 20, 0, 20, 200, h.a.hachure('metal', 'arete')));
      o.push(g.P(g.D(['M', ox + 84, 40], ['L', ox + 114, 40], ['L', ox + 114, 200], ['L', ox + 84, 200], ['L', ox + 84, 130],
        ['L', ox + 98, 130], ['L', ox + 98, 80], ['L', ox + 84, 80], ['Z']), h.a.hachure('metal', 'arete')));
      const a = fuit ? ox + 57 : ox + 44;
      o.push(g.P(g.D(['M', ox + 98, 80], ['L', ox + 84, 80], ['L', ox + 84, 77], ['Q', ox + 64, 74, a, 77 + (fuit ? 4 : 0)],
        ['L', a, 133 - (fuit ? 4 : 0)], ['Q', ox + 64, 136, ox + 84, 133], ['L', ox + 84, 130], ['L', ox + 98, 130], ['Z']),
        h.a.hachure('terre', 'arete')));
      if (fuit) o.push(g.P(g.D(['M', ox + 60, 96], ['L', ox + 70, 101], ['L', ox + 65, 108], ['L', ox + 78, 114]), W('detail')),
        g.P(g.D(['M', ox + 72, 84], ['L', ox + 76, 92]), h.a.detail));
      // la feuille le long de la devanture, qui sort par le haut
      o.push(g.L(ox + 42, fuit ? 150 : 190, ox + 42, 6, h.a.arete));
      o.push(g.F(g.D(['M', ox + 52, 34], ['L', ox + 52, 6])));
    };
    joint(0, false);
    joint(160, true);
    return o.join('\n');
  };

  const gP = z => cadre(z, ...MP), gT = z => cadre(z, ...MT), gF = z => cadre(z, ...MF);

  return {
    ref: '82-10b',
    titre: 'Le poêle qu’on répare : le joint de la porte',
    desc: 'Le joint de fortune de la porte du poêle. En coupe au bord haut de la porte, en deux temps : '
      + 'porte ouverte, la pâte d’argile et de cendre tamisée montée en bourrelet dans la rainure de la porte, '
      + 'un papier ciré contre la devanture du poêle ; porte refermée sur le papier, la pâte écrasée prend la '
      + 'forme de la devanture sans y coller. De face, le poêle, la porte fermée sur une feuille de papier '
      + 'pincée côté poignée et tirée vers l’extérieur ; au tireté, les autres places où la feuille s’essaie, '
      + 'tout le tour de la porte. Grossi au joint : à gauche, la pâte serre la feuille contre la devanture ; '
      + 'à droite, la pâte sèche et craquée s’est retirée, la feuille glisse et sort sans résistance. Encadré '
      + 'danger : une porte qui fuit empêche d’affamer le feu.',
    format: 'pleine',
    disposition: [['pose'], ['test', 'feuille']],
    hauteurs: [1, 1.3],
    largeurs: [[1], [1, 1.1]],
    vues: {
      pose: {
        titre: 'La pâte posée, en coupe : porte ouverte, porte refermée',
        dessin: pose,
        renvois: z => {
          const g = gP(z);
          return [
            { n: 1, rond: g.p(150, 176), cible: g.p(107, 124), texte: 'argile et cendre tamisée, en mastic' },
            { n: 2, rond: g.p(40, 190), cible: g.p(69.5, 160), texte: 'papier ciré contre le poêle' },
            { n: 3, rond: g.p(380, 176), cible: g.p(305, 124), texte: 'refermée : la pâte prend la forme' },
          ];
        },
      },
      test: {
        titre: 'Le test de la feuille',
        dessin: test,
        renvois: z => {
          const g = gT(z);
          return [
            { n: 4, rond: g.p(246, 110), cible: g.p(206, 134), texte: 'feuille pincée dans la porte, tirée' },
            { n: 5, rond: g.p(124, 44), cible: g.p(102, 90), texte: 'essayée sur tout le tour' },
          ];
        },
      },
      feuille: {
        titre: 'Au joint, grossi : ça tient, ça fuit',
        dessin: feuille,
        renvois: z => {
          const g = gF(z);
          return [
            { n: 6, rond: g.p(136, 176), cible: g.p(64, 120), texte: 'la pâte serre la feuille : ça tient' },
            { n: 7, rond: g.p(290, 176), cible: g.p(209, 112), texte: 'craquée : la feuille sort sans résistance' },
          ];
        },
      },
    },
    danger: 'Une porte qui fuit, c’est un poêle qu’on ne peut plus affamer, donc un feu de cheminée qu’on ne '
      + 'peut plus arrêter. La pâte sèche et craque : elle se refait deux ou trois fois par hiver.',
  };
};
