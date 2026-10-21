// Planche 89-08. Le couteau croche, d'une vieille lime (ch. 89, §9, « Les outils qu'on se fait »).
// Le chapitre : une vieille lime ou une lame de couteau ; une face meulée plate, l'autre biseautée comme
// une plane ; la lame chauffée et courbée, en entier ou par le bout ; emmanchée dans un manche recourbé et
// ligaturée serré ; tenue en travers du corps, le pouce appuyé sur le bout du manche, tirée vers soi ; la
// lame vient vers le ventre, la pièce se serre au chevalet à planer.
// La fabrication du manche vient d'Adney et Chapelle (Smithsonian, 1964), déjà au dossier
// (sources/89-adney-chapelle-couteau-croche-fabrication.md) : manche d'une branche fourchue, la soie
// attachée à un bras, l'autre bras qui s'écarte du dos de la lame ; la soie pliée en petit crochet au bout,
// entrée dans le bois et ligaturée au tendon, puis à la broche ; tenu la paume vers le haut, le
// pouce couché le long du bras qui s'écarte ; la courbe « sur le plat ».
// Sans main (brief du 15 octobre : une main qui n'est pas nette ne s'imprime pas) : le couteau seul,
// dans la position où on le tient, le cercle rouge sur le bras où se couche le pouce.
// Aucune cote : le chapitre n'en donne pas. Les proportions suivent la source (lame d'environ 16 mm sur
// 13 à 15 cm, dos d'un peu moins de 3 mm), sans être cotées.
// La charte : le couteau au contour fort ; le dessous des bras du manche à l'ombre ; le rouge pour le
// geste (on tire vers soi) et le point à contrôler (le pouce).

module.exports = (h) => {
  const f = v => Math.round(v * 10) / 10;
  const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const pts = (P, l) => l.map(([x, y]) => P(x, y).join(' '));
  const M = (P, x, y) => P(x, y).join(' ');

  // ─── le couteau vu à plat, mm : x vers le manche, y vers le tranchant (vers soi) ───
  const C = [250, 8], U = [Math.cos(50 * Math.PI / 180), -Math.sin(50 * Math.PI / 180)];
  const N1 = [-0.766, -0.643], N2 = [0.766, 0.643];
  const at = (t, r, n) => [C[0] + U[0] * t + n[0] * r, C[1] + U[1] * t + n[1] * r];
  const L1 = at(80, 9, N1), R1 = at(80, 9, N2), R0 = at(0, 12, N2), E = at(80, 0, [0, 0]);
  const vueManche = z => {
    const s = 1.8, ox = (z.l - 318 * s) / 2 + 2 * s, oy = (z.h - 126 * s) / 2 + 66 * s;
    const P = (x, y) => [f(ox + x * s), f(oy + y * s)];
    const o = [];
    // le manche : le bras de la soie, la fourche, le bras du pouce, le bout de tige coupé
    const contour = `M${M(P, 141, -7)} L${M(P, 240, -7)} Q${M(P, 248, -7.5)} ${M(P, ...at(15, 12, N1))} L${M(P, ...L1)}`
      + ` A${f(9 * s)} ${f(9 * s)} 0 0 1 ${M(P, ...R1)} L${M(P, ...R0)} Q${M(P, 266, 22)} ${M(P, 252, 23)} L${M(P, 141, 23)} Q${M(P, 132, 8)} ${M(P, 141, -7)} Z`;
    o.push(h.path(contour, h.a.blanc));
    // le dessous à l'ombre : bas du bras de la soie, flanc du bras du pouce
    o.push(h.path(`M${M(P, 141, 15)} L${M(P, 247, 15)} L${M(P, ...at(4, 5, N2))} L${M(P, ...at(80, 3.5, N2))} L${M(P, ...R1)} L${M(P, ...R0)} Q${M(P, 266, 22)} ${M(P, 252, 23)} L${M(P, 141, 23)} Q${M(P, 137.5, 19)} ${M(P, 141, 15)} Z`, h.a.ombre));
    // le fil du bois
    o.push(h.path(`M${M(P, 210, 3)} L${M(P, 246, 3)} M${M(P, 214, 11)} L${M(P, 244, 11)} M${M(P, ...at(18, 2, N1))} L${M(P, ...at(66, 2, N1))}`, h.a.fin));
    o.push(h.path(contour, h.a.contour));
    // la soie entre la lame et la ligature, son bout crochu planté dans le bois
    o.push(h.chemin([P(140, 4), P(152, 4), P(152, 12), P(140, 12)], blanc(h.a.arete), true));
    o.push(h.chemin([P(204, 5), P(211, 5), P(211, 11), P(204, 11)], blanc(h.a.arete), true));
    o.push(h.cercle(...P(211, 8), 2.2 * s / 2 + 1, h.a.plein));
    // la ligature : une bande de tours serrés
    o.push(h.chemin([P(151, -8), P(205, -8), P(205, 24), P(151, 24)], h.a.blanc, true));
    const tours = [];
    for (let x = 153; x < 204; x += 3.4) tours.push(`M${M(P, x, -8)} L${M(P, x + 1.6, 24)}`);
    o.push(h.path(tours.join(' '), h.a.detail));
    o.push(h.chemin([P(151, -8), P(205, -8), P(205, 24), P(151, 24)], h.a.arete, true));
    // la lame : le dos en haut, le tranchant en bas, la ligne du biseau
    const lame = `M${M(P, 142, 0)} L${M(P, 15, 0)} Q${M(P, 3, 1.5)} ${M(P, 0, 15.5)} L${M(P, 142, 16)} Z`;
    o.push(h.path(lame, blanc(h.a.contour)));
    o.push(h.path(`M${M(P, 4, 10.5)} Q${M(P, 9, 10)} ${M(P, 16, 10)} L${M(P, 141, 10)}`, h.a.detail));
    // le pouce se couche ici ; on tire vers soi
    o.push(h.controle(...P(...at(44, 0, [0, 0])), 21));
    o.push(h.geste(`M${M(P, 62, 25)} L${M(P, 62, 56)}`));
    return o.join('\n');
  };
  const renvoisManche = z => {
    const s = 1.8, ox = (z.l - 318 * s) / 2 + 2 * s, oy = (z.h - 126 * s) / 2 + 66 * s;
    const P = (x, y) => [f(ox + x * s), f(oy + y * s)];
    const [kx, ky] = P(262, 19), [px, py] = P(...at(44, 12.5, N1)), [tx, ty] = P(105, 16);
    return [
      { n: 5, rond: [kx + 50, ky + 26], cible: [kx + 1, ky + 1], texte: 'manche d’une branche fourchue' },
      { n: 8, rond: [px - 60, py - 18], cible: [px - 1, py - 1], texte: 'le pouce couché sur ce bras' },
      { n: 9, rond: [tx + 6, ty + 62], cible: [tx, ty + 1.5], texte: 'tranchant vers soi, on tire' },
    ];
  };

  // ─── la lame en coupe : le dos à gauche, le tranchant à droite ───
  const vueCoupe = z => {
    const s = 6.4, ox = (z.l - 16 * s) / 2, oy = z.h * 0.46;
    const P = (x, y) => [f(ox + x * s), f(oy + y * s)];
    return h.chemin([P(0, 0), P(10.5, 0), P(16, 3), P(0, 3)], h.a.hachure('metal', 'contour'), true);
  };
  const renvoisCoupe = z => {
    const s = 6.4, ox = (z.l - 16 * s) / 2, oy = z.h * 0.46;
    const P = (x, y) => [f(ox + x * s), f(oy + y * s)];
    const [ax, ay] = P(5, 3), [bx, by] = P(13.2, 1.5);
    return [
      { n: 1, rond: [ax - 8, ay + 52], cible: [ax, ay + 1.5], texte: 'face meulée plate' },
      { n: 2, rond: [bx + 2, by - 54], cible: [bx - 0.8, by - 2], texte: 'l’autre en biseau, comme une plane' },
    ];
  };

  // ─── la lame courbée, vue de chant, le manche coupé ───
  // deux lames : courbée sur toute la longueur, ou par le bout seulement
  const profil = (P, s, y0, courbe) => {
    const n = 48, ep = 3, haut = [], bas = [];
    for (let i = 0; i <= n; i++) {
      const x = 169 * i / n, yc = courbe(Math.min(x, 140));
      haut.push(P(x, y0 - yc - ep)); bas.push(P(x, y0 - yc));
    }
    const lame = `M${haut.map(p => p.join(' ')).join(' L')} L${bas.slice().reverse().map(p => p.join(' ')).join(' L')} Z`;
    const o = [];
    // le bras du manche, sous la lame, coupé net d'un trait de cassure
    const xa = 140, yt = y0 - ep, yb = y0 + 27;
    const coupe = `L${M(P, xa + 30, yt)} L${M(P, xa + 27, yt + 9)} L${M(P, xa + 33, yt + 17)} L${M(P, xa + 29, yb)}`;
    o.push(h.path(`M${M(P, xa - 4, yt)} ${coupe} L${M(P, xa - 4, yb)} Q${M(P, xa - 11, (yt + yb) / 2)} ${M(P, xa - 4, yt)} Z`, h.a.blanc));
    o.push(h.path(`M${M(P, xa - 4, yb - 9)} L${M(P, xa + 31.5, yb - 9)} L${M(P, xa + 29, yb)} L${M(P, xa - 4, yb)} Q${M(P, xa - 8, yb - 4)} ${M(P, xa - 4, yb - 9)} Z`, h.a.ombre));
    o.push(h.path(`M${M(P, xa + 29, yb)} L${M(P, xa - 4, yb)} Q${M(P, xa - 11, (yt + yb) / 2)} ${M(P, xa - 4, yt)} L${M(P, xa + 30, yt)}`, h.a.arete));
    o.push(h.path(`M${M(P, xa + 30, yt)} L${M(P, xa + 27, yt + 9)} L${M(P, xa + 33, yt + 17)} L${M(P, xa + 29, yb)}`, h.a.detail));
    o.push(h.path(lame, blanc(h.a.contour)));
    return o.join('\n');
  };
  const gCourbe = z => {
    const s = (z.l - 16) / 172, ox = 6;
    const P = (x, y) => [f(ox + x * s), f(y)];
    const P2 = (x, y) => [f(ox + x * s), f(y * s)];
    return { s, ox, P2 };
  };
  const enEntier = x => 14 * Math.pow(1 - x / 140, 1.6);
  const parLeBout = x => (x < 45 ? 15 * Math.pow(1 - x / 45, 2.2) : 0);
  const vueCourbe = z => {
    const { s, ox } = gCourbe(z);
    const y1 = z.h * 0.3 / s, y2 = z.h * 0.76 / s;
    const P = (x, y) => [f(ox + x * s), f(y * s)];
    return [profil(P, s, y1, enEntier), profil(P, s, y2, parLeBout)].join('\n');
  };
  const renvoisCourbe = z => {
    const { s, ox } = gCourbe(z);
    const y1 = z.h * 0.3 / s, y2 = z.h * 0.76 / s;
    const P = (x, y) => [f(ox + x * s), f(y * s)];
    const [ax, ay] = P(30, y1 - enEntier(30) - 3), [bx, by] = P(10, y2 - parLeBout(10) - 3);
    return [
      { n: 3, rond: [ax + 46, ay - 38], cible: [ax + 1, ay - 1], texte: 'courbée en entier' },
      { n: 4, rond: [bx + 50, by - 36], cible: [bx + 1, by - 1], texte: 'ou par le bout seulement' },
    ];
  };

  // ─── la soie, en coupe le long du bras : rainure, crochet, ligature ───
  const gSoie = z => {
    const s = (z.l - 24) / 86, ox = 12 - 128 * s, oy = z.h * 0.52;
    const P = (x, y) => [f(ox + x * s), f(oy + y * s)];
    return { s, P };
  };
  const vueSoie = z => {
    const { s, P } = gSoie(z), o = [];
    // le bras en coupe, coupé à droite par un trait de cassure ; la rainure de la soie sur le dessus
    o.push(h.path(`M${M(P, 141, -12)} L${M(P, 196, -12)} L${M(P, 196, -15)} L${M(P, 214, -15)} L${M(P, 211, -5)} L${M(P, 216, 4)} L${M(P, 212, 15)} L${M(P, 141, 15)} Q${M(P, 132, 1.5)} ${M(P, 141, -12)} Z`, h.a.hachure('bois', 'contour')));
    // la soie : couchée dans sa rainure, pliée en crochet au bout, enfoncée dans le bois
    o.push(h.path(`M${M(P, 124, -15)} L${M(P, 196, -15)} L${M(P, 196, -1)} L${M(P, 193, -1)} L${M(P, 193, -12)} L${M(P, 124, -12)} Z`, h.a.plein));
    // la ligature : chaque tour coupé deux fois, sur la soie et sous le bras
    for (let x = 150; x <= 190; x += 4.2) {
      o.push(h.cercle(...P(x, -16.9), 1.75 * s, blanc(h.a.detail)));
      o.push(h.cercle(...P(x, 16.9), 1.75 * s, blanc(h.a.detail)));
    }
    // la lame qui sort à gauche, coupée par le bord de la vue
    return o.join('\n');
  };
  const renvoisSoie = z => {
    const { s, P } = gSoie(z);
    const [hx, hy] = P(194.5, -5), [lx, ly] = P(171, 17);
    return [
      { n: 6, rond: [Math.min(z.l - 12, hx + 26), hy - 62], cible: [hx + 1.6, hy - 1], texte: 'soie pliée en crochet, dans le bois' },
      { n: 7, rond: [lx - 4, Math.min(z.h - 12, ly + 50)], cible: [lx, ly + 2.4], texte: 'ligature serrée : tendon ou broche' },
    ];
  };

  return {
    ref: '89-08',
    titre: 'Le couteau croche, d’une vieille lime',
    desc: 'Le couteau croche vu à plat, tel qu’on le tient : la lame de lime, le dos en haut, le tranchant vers soi, la soie ligaturée sur un bras d’une branche fourchue, l’autre bras qui s’écarte du dos de la lame et porte le pouce ; on tire vers soi. En détail : la lame en coupe, une face plate, l’autre en biseau ; la lame courbée en entier ou par le bout, vue de chant ; la soie en coupe, couchée dans sa rainure, pliée en crochet dans le bois, sous une ligature serrée.',
    format: 'pleine',
    disposition: [['manche'], ['coupe', 'courbe', 'soie']],
    hauteurs: [1.2, 1],
    largeurs: [[1], [0.75, 1.25, 1.1]],
    vues: {
      manche: { titre: 'Emmanché, tel qu’on le tient', dessin: vueManche, renvois: renvoisManche },
      coupe: { titre: 'La lame, en coupe', dessin: vueCoupe, renvois: renvoisCoupe },
      courbe: { titre: 'Courbée, vue de chant', dessin: vueCourbe, renvois: renvoisCourbe },
      soie: { titre: 'La soie, en coupe', dessin: vueSoie, renvois: renvoisSoie },
    },
    danger: 'La lame vient vers le ventre, et c’est là qu’elle blesse : la pièce ne se tient ni dans la main ni contre soi, elle se serre au chevalet à planer.',
  };
};
