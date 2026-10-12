// Planche 82-10a — Le poêle qu'on répare : le tuyau roulé dans une tôle de baril, et la clé
// du tuyau (chapitre 82, « Réparer le tuyau au lieu de le remplacer » et « La clé du tuyau »).
// Suite en 82-10b : le joint de la porte et le test de la feuille.
// Aucune cote : le chapitre ne donne aucune dimension (la bille est « du bon diamètre », le
// disque est « le diamètre intérieur moins l'épaisseur d'un doigt »).
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

  // ── bille : de côté (x 10 à 392) et du bout (centre 515), axe à y = 120, rayon 62
  const MB = [600, 200];
  const bille = z => {
    const g = cadre(z, ...MB);
    const cy = 120, r = 62, o = [];
    // le sol
    o.push(g.R(0, 185, 600, 11, h.a.hachure('terre', 'aucun')), g.L(0, 185, 600, 185, h.a.arete));
    // la bille de côté, coupée à la scie aux deux bouts
    o.push(g.P(g.D(['M', 12, cy - r], ['L', 390, cy - r], ['L', 393, cy - 20], ['L', 390, cy + r],
      ['L', 12, cy + r], ['L', 9, cy + 15], ['Z']), W('arete')));
    [[16, 70, 44], [22, 96, 50], [14, 150, 40], [26, 168, 52], [336, 72, 384], [344, 100, 380],
      [334, 142, 378], [348, 166, 386]].forEach(([x1, y, x2]) => o.push(g.L(x1, y, x2, y, h.a.fin)));
    // la tôle roulée dessus, et le joint agrafé sur toute la longueur, en haut
    o.push(g.R(60, cy - r - 3, 270, 2 * r + 6, W('contour')));
    o.push(g.R(60, cy - r - 10, 270, 7, W('arete')), g.L(60, cy - r - 6.5, 330, cy - r - 6.5, h.a.fin));
    // le marteau qui rabat le joint
    o.push(g.P(g.D(['M', 214, 11], ['L', 322, 3], ['L', 324, 11], ['L', 214, 20], ['Z']), W('arete')));
    o.push(g.R(186, 2, 28, 28, W('arete')));
    o.push(g.F(g.D(['M', 176, 6], ['L', 176, 40])));
    // du bout : les cernes, la tôle autour, le joint en haut
    const bx = 515;
    o.push(g.C(bx, cy, r, W('arete')));
    [46, 31, 16].forEach(rr => o.push(g.C(bx, cy, rr, h.a.fin)));
    o.push(g.C(bx, cy, 1.8, h.a.plein));
    o.push(g.C(bx, cy, r + 1.5, h.a.contour));
    o.push(g.R(bx - 9, cy - r - 10, 18, 7, W('arete')), g.L(bx - 9, cy - r - 6.5, bx + 9, cy - r - 6.5, h.a.fin));
    return o.join('\n');
  };

  // ── le joint agrafé, quatre temps côte à côte, 150 de large chacun
  // la tôle en coupe : une ligne pleine au trait de contour ; le pli, un demi-cercle
  const MA = [600, 118];
  const agrafe = z => {
    const g = cadre(z, ...MA), T = h.a.contour, o = [];
    // crochet : de (x0, y) jusqu'au pli en xp, repli vers le haut (sens -1) ou le bas (+1)
    // d'un pas e, retour jusqu'à xr
    const crochet = (x0, y, xp, e, xr, sens) => g.D(['M', x0, y], ['L', xp, y],
      ['A', e / 2, e / 2, 0, 0, (xp > x0) === (sens < 0) ? 0 : 1, xp, y + sens * e], ['L', xr, y + sens * e]);

    // 1. plier, à plat, avant de rouler : un crochet dessus, l'autre dessous
    let ox = 0;
    o.push(g.P(crochet(ox + 6, 62, ox + 64, 8, ox + 38, -1), T));
    o.push(g.P(crochet(ox + 144, 62, ox + 86, 8, ox + 112, 1), T));

    // 2. accrocher : de haut en bas, B, rabat de A, rabat de B, A
    ox = 150;
    const e2 = 7, y2 = 44;
    o.push(g.P(crochet(ox + 6, y2 + 3 * e2, ox + 94, 2 * e2, ox + 52, -1), T));
    o.push(g.P(crochet(ox + 144, y2, ox + 48, 2 * e2, ox + 90, 1), T));

    // 3. rabattre à plat au marteau, la bille dessous
    const e3 = 4.6, y3 = 60, bas = y3 + 3 * e3;
    const rabattu = ox => {
      const r = [];
      r.push(g.P(crochet(ox + 4, bas, ox + 96, 2 * e3, ox + 62, -1), T));
      r.push(g.P(g.D(['M', ox + 146, bas], ['L', ox + 122, bas], ['C', ox + 112, bas, ox + 112, y3, ox + 102, y3],
        ['L', ox + 58, y3], ['A', e3, e3, 0, 0, 0, ox + 58, y3 + 2 * e3], ['L', ox + 92, y3 + 2 * e3]), T));
      return r;
    };
    ox = 300;
    o.push(g.R(ox + 4, bas + 2, 142, 34, h.a.hachure('bois', 'arete')));
    o.push(...rabattu(ox));
    o.push(g.P(g.D(['M', ox + 92, 22], ['L', ox + 136, 18], ['L', ox + 137, 25], ['L', ox + 92, 29], ['Z']), W('arete')));
    o.push(g.R(ox + 64, 12, 28, 30, W('arete')));
    o.push(g.F(g.D(['M', ox + 54, 10], ['L', ox + 54, 44])));

    // 4. river, la bille sortie : le rivet traverse les quatre épaisseurs
    ox = 450;
    o.push(...rabattu(ox));
    const xr = ox + 78;
    o.push(g.R(xr - 3, y3 - 3, 6, 3 * e3 + 6, W('detail')));
    o.push(g.P(g.D(['M', xr - 8, y3 - 2.5], ['A', 8, 6, 0, 0, 1, xr + 8, y3 - 2.5], ['Z']), W('arete')));
    o.push(g.P(g.D(['M', xr - 6.5, bas + 2.5], ['L', xr + 6.5, bas + 2.5], ['L', xr + 5, bas + 7], ['L', xr - 5, bas + 7], ['Z']), W('arete')));
    return o.join('\n');
  };

  // ── la clé en coupe : tuyau debout, coupé dans l'axe, la tige vue par le bout
  const MC = [240, 300];
  const cx = 120, R = 80, jeu = 12, yd = 150;
  const cle = z => {
    const g = cadre(z, ...MC), o = [];
    // la fumée monte, se partage au disque et passe par le tour
    [1, -1].forEach(k => {
      const a = cx - k * 20, b = cx - k * (R - jeu / 2);
      o.push(g.F(g.D(['M', a, 296], ['C', a, 232, b, 220, b, 180], ['L', b, 124], ['C', b, 92, a, 96, a, 14]), h.a.cache));
    });
    // les deux parois
    o.push(g.L(cx - R, 6, cx - R, 294, h.a.contour), g.L(cx + R, 6, cx + R, 294, h.a.contour));
    // le disque fermé, fendu au centre ; le pont relevé par-dessus la tige
    o.push(g.R(cx - R + jeu, yd, R - jeu - 6, 3, h.a.plein), g.R(cx + 6, yd, R - jeu - 6, 3, h.a.plein));
    o.push(g.C(cx, yd - 4, 4, W('arete')));
    o.push(g.P(g.D(['M', cx - 6, yd + 1.5], ['C', cx - 7, yd - 14, cx + 7, yd - 14, cx + 6, yd + 1.5]), h.a.contour));
    // ouvert : le même disque tourné sur la tige, de chant
    o.push(g.R(cx + 1, yd - 4 - (R - jeu), 3, 2 * (R - jeu), h.a.cache));
    return o.join('\n');
  };

  // ── la clé vue de dessus : fermée, la tige de part en part, la poignée pliée dehors
  const MD = [300, 262];
  const dx = 140, dy = 122;
  const dessus = z => {
    const g = cadre(z, ...MD), o = [];
    o.push(g.C(dx, dy, R - jeu, h.a.hachure('metal', 'arete')));
    o.push(g.C(dx, dy, R, h.a.contour));
    // la tige : sort de 10 à gauche, traverse, sort à droite et se plie en poignée
    const t = 4, xg = dx - R - 12, xc = dx + R + 28, yp = dy + 66;
    o.push(g.P(g.D(['M', xg, dy - t], ['L', xc - t, dy - t], ['Q', xc + t, dy - t, xc + t, dy + t],
      ['L', xc + t, yp], ['Q', xc, yp + 4, xc - t, yp], ['L', xc - t, dy + t + 1], ['L', xg, dy + t],
      ['Q', xg - 3, dy, xg, dy - t], ['Z']), W('arete')));
    // le pont : la bande entre les deux fentes, relevée par-dessus la tige
    o.push(g.R(dx - 13, dy - t - 2.5, 26, 2 * t + 5, W('arete')));
    o.push(g.L(dx - 13, dy - t, dx + 13, dy - t, h.a.cache), g.L(dx - 13, dy + t, dx + 13, dy + t, h.a.cache));
    return o.join('\n');
  };

  const gB = z => cadre(z, ...MB), gA = z => cadre(z, ...MA), gC = z => cadre(z, ...MC), gD = z => cadre(z, ...MD);

  return {
    ref: '82-10a',
    titre: 'Le poêle qu’on répare : le tuyau roulé et sa clé',
    desc: 'Une section de tuyau refaite dans une tôle de baril déroulée. De côté : la tôle roulée serrée '
      + 'autour d’une bille de bois posée au sol, plus longue qu’elle, le joint sur toute la longueur en haut, '
      + 'un marteau qui le rabat ; du bout, les cernes de la bille et la tôle autour. Le joint agrafé en '
      + 'coupe, en quatre temps : les deux bords pliés en crochet à plat, l’un vers le haut, l’autre vers le '
      + 'bas ; la tôle roulée, les crochets accrochés l’un dans l’autre ; rabattus à plat au marteau sur la '
      + 'bille ; rivés à travers les quatre épaisseurs, la bille sortie. La clé du tuyau, en coupe dans le '
      + 'tuyau debout : un disque de tôle épaisse fermé en travers, plus petit que le tuyau, la fumée qui '
      + 'monte et passe par le tour ; au tireté, le même disque ouvert, de chant. Vue de dessus : la tige '
      + 'd’acier traverse le tuyau de part en part, passe sous un pont découpé au centre du disque et se plie '
      + 'en poignée dehors, dans le plan du disque ; le jour entre le disque et la paroi fait tout le tour. '
      + 'Encadré danger : un disque plein refoule la fumée.',
    format: 'pleine',
    disposition: [['bille'], ['agrafe'], ['cle', 'dessus']],
    hauteurs: [0.9, 0.9, 1.2],
    largeurs: [[1], [1], [0.9, 1.1]],
    vues: {
      bille: {
        titre: 'Roulée sur une bille, de côté et du bout',
        dessin: bille,
        renvois: z => {
          const g = gB(z);
          return [
            { n: 1, rond: g.p(100, 22), cible: g.p(118, 104), texte: 'tôle de baril déroulée, roulée serrée' },
            { n: 2, rond: g.p(34, 26), cible: g.p(34, 100), texte: 'bille de bois du bon diamètre' },
          ];
        },
      },
      agrafe: {
        titre: 'Le joint agrafé, en coupe : plier, accrocher, rabattre, river',
        dessin: agrafe,
        renvois: z => {
          const g = gA(z);
          return [
            { n: 3, rond: g.p(20, 22), cible: g.p(48, 53), texte: 'un crochet plié dessus, l’autre dessous' },
            { n: 4, rond: g.p(172, 22), cible: g.p(222, 58), texte: 'la tôle roulée, les crochets accrochés' },
            { n: 5, rond: g.p(290, 100), cible: g.p(330, 94), texte: 'rabattus à plat au marteau, sur la bille' },
            { n: 6, rond: g.p(582, 30), cible: g.p(532, 55), texte: 'rivet ou vis, la bille sortie' },
          ];
        },
      },
      cle: {
        titre: 'La clé, en coupe',
        dessin: cle,
        renvois: z => {
          const g = gC(z);
          return [
            { n: 7, rond: g.p(18, 196), cible: g.p(cx - 50, yd + 1.5), texte: 'fermée : la fumée passe par le tour' },
            { n: 8, rond: g.p(222, 70), cible: g.p(cx + 2.5, 100), texte: 'ouverte, le disque de chant' },
          ];
        },
      },
      dessus: {
        titre: 'La clé, vue de dessus',
        dessin: dessus,
        renvois: z => {
          const g = gD(z);
          return [
            { n: 9, rond: g.p(26, 70), cible: g.p(dx - R - 6, dy), texte: 'tige d’acier de part en part' },
            { n: 10, rond: g.p(284, 200), cible: g.p(dx + R + 28, dy + 50), texte: 'poignée pliée dans le plan du disque' },
            { n: 11, rond: g.p(40, 236), cible: g.p(dx - 34, dy + 44), texte: 'disque de tôle épaisse, un doigt de moins' },
            { n: 12, rond: g.p(214, 24), cible: g.p(dx + 6, dy - 7), texte: 'pont découpé au centre, enfilé sur la tige' },
          ];
        },
      },
    },
    danger: 'Un disque plein arrête le tirage au point de refouler : la fumée revient dans la pièce. '
      + 'La clé se coupe plus petite que le tuyau, et le tour reste libre, fermée comme ouverte.',
  };
};
