// Planche 38-02 — la marque de tombe (chapitre 38, section 4 et étape 22).
// Le chapitre dit : bois dur ou pierre, plus haute que la neige de mars, le nom et les dates
// gravés sur la marque même. Aucune cote : le chapitre n'en donne pas.
// La charte : la paroi à l'ombre de chaque trait taillé en V, en gris d'ombre (elle était en
// hachure, qui dit une coupe). Pas d'autre gris : le pieu et la pierre sont vus de face, et les
// coupes du trait sont hachurées. Le rouge : la lame tirée le long du trait, et la poussée de la
// lame à chacun des trois temps de la coupe (les gestes).
const BR = String.fromCharCode(10);
module.exports = (h) => {
  const blancArete = h.a.arete.replace('fill="none"', 'fill="#ffffff"');
  const blancContour = h.a.contour.replace('fill="none"', 'fill="#ffffff"');
  const blancDetail = h.a.detail.replace('fill="none"', 'fill="#ffffff"');
  const P = (x, y) => `${Math.round(x * 10) / 10},${Math.round(y * 10) / 10}`;

  // L'inscription vue de loin : des signes qui ont l'air de lettres sans en former aucune,
  // pour qu'aucun mot ne s'écrive sur le dessin.
  const G = {
    a: [[0, 1, 0.5, 0], [0.5, 0, 1, 1]],
    b: [[0, 0, 0, 1], [1, 0, 1, 1], [0, 0, 1, 0]],
    c: [[0, 0, 0, 1], [0, 0, 1, 0.5], [1, 0.5, 0, 1]],
    d: [[0.5, 0, 0.5, 1], [0, 0.35, 1, 0.35]],
    e: [[0, 0, 0, 1], [1, 0, 1, 1]],
    f: [[0, 0, 1, 1], [1, 0, 0, 1]],
    g: [[0, 0, 0, 1], [0, 1, 1, 1], [1, 1, 1, 0.4]],
    k: [[0, 0.5, 1, 0.5]],
  };
  const inscrire = (x, y, signes, l, ht, pas) => [...signes].map((c, i) => h.path(
    G[c].map(([a, b, c2, d]) => `M${P(x + i * pas + a * l, y + b * ht)} L${P(x + i * pas + c2 * l, y + d * ht)}`).join(' '),
    h.a.detail)).join(BR);

  // Un trait de lettre taillé en V, vu de face : deux parois qui descendent vers le fond,
  // bouts en pointe. La paroi tournée à l'opposé de la lumière (haut gauche) est ombrée.
  const traitV = (x1, y1, x2, y2, w) => {
    const L0 = Math.hypot(x2 - x1, y2 - y1), dx = (x2 - x1) / L0, dy = (y2 - y1) / L0;
    const nx = -dy, ny = dx, m = w / 2;
    const s = (nx + ny) < 0 ? 1 : -1;               // côté de la paroi à l'ombre
    const pt = (t, o) => [x1 + dx * t + nx * o, y1 + dy * t + ny * o];
    const hex = [pt(0, m), pt(L0, m), pt(L0 + m, 0), pt(L0, -m), pt(0, -m), pt(-m, 0)];
    const ombre = h.chemin([pt(-m, 0), pt(0, s * m), pt(L0, s * m), pt(L0 + m, 0)], h.a.ombre, true);
    const f0 = pt(-m, 0), f1 = pt(L0 + m, 0);
    return [
      h.chemin(hex, h.a.blanc, true),
      ombre,
      h.chemin(hex, h.a.arete, true),
      h.ligne(f0[0], f0[1], f1[0], f1[1], h.a.detail),
    ].join('\n');
  };

  // Couteau à lame fixe, de profil : pointe en (tx, ty), manche dans la direction (ax, ay),
  // dos de la lame du côté (px, py). Le tranchant est la droite qui part de la pointe.
  const couteau = (tx, ty, ax, ay, px, py) => {
    const Q = (x, y) => P(tx + ax * x + px * y, ty + ay * x + py * y);
    const Lb = 56, hb = 11, Lh = 60, g = Lb + 4;
    return [
      h.path(`M${Q(0, 0)} L${Q(Lb, 0)} L${Q(Lb, hb)} L${Q(24, hb)} Q${Q(9, hb)} ${Q(0, 0)} Z`, blancArete),
      h.path(`M${Q(8, hb * 0.38)} L${Q(Lb, hb * 0.38)}`, h.a.fin),
      h.path(`M${Q(Lb, -2.5)} L${Q(g, -2.5)} L${Q(g, hb + 2.5)} L${Q(Lb, hb + 2.5)} Z`, blancArete),
      h.path(`M${Q(g, -1)} L${Q(g + Lh - 6, -1)} Q${Q(g + Lh + 1, -1)} ${Q(g + Lh + 1, hb / 2)} Q${Q(g + Lh + 1, hb + 1)} ${Q(g + Lh - 6, hb + 1)} L${Q(g, hb + 1)} Z`, blancArete),
      h.cercle(...Q(g + 16, hb / 2).split(',').map(Number), 1.7, h.a.detail),
      h.cercle(...Q(g + Lh - 14, hb / 2).split(',').map(Number), 1.7, h.a.detail),
    ].join('\n');
  };

  // Le terrain en coupe, en mars : sol, puis la neige par-dessus. Mêmes niveaux dans les deux vues.
  const YS = 140, YG = 262;
  const terrain = (x1, x2, bosse) => {
    const sol = bosse
      ? `M${x1},${YG} L${bosse[0]},${YG} C${bosse[0] + 30},${YG - 12} ${bosse[1] - 30},${YG - 12} ${bosse[1]},${YG} L${x2},${YG}`
      : `M${x1},${YG} L${x2},${YG}`;
    const neigeHaut = [];
    for (let x = x1; x <= x2 + 0.1; x += (x2 - x1) / 6) neigeHaut.push([x, YS + 3 * Math.sin((x - x1) / 23) + (bosse && x > bosse[0] && x < bosse[1] ? -4 : 0)]);
    const haut = 'M' + neigeHaut.map(([x, y]) => P(x, y)).join(' L');
    const retour = bosse
      ? `L${x2},${YG} L${bosse[1]},${YG} C${bosse[1] - 30},${YG - 12} ${bosse[0] + 30},${YG - 12} ${bosse[0]},${YG} L${x1},${YG} Z`
      : `L${x2},${YG} L${x1},${YG} Z`;
    return [
      h.path(`${sol} L${x2},346 L${x1},346 Z`, h.a.hachure('terre', 'aucun')),
      h.path(`${haut} ${retour}`, h.a.hachure('neige', 'aucun')),
      h.path(sol, h.a.arete),
      h.path(haut, h.a.arete),
    ].join('\n');
  };

  // Une pierre de calage, contour irrégulier.
  const caillou = (cx, cy, rx, ry) => h.path(
    `M${P(cx - rx, cy)} Q${P(cx - rx, cy - ry)} ${P(cx - rx * 0.2, cy - ry)} Q${P(cx + rx * 0.8, cy - ry * 1.05)} ${P(cx + rx, cy - ry * 0.1)} Q${P(cx + rx * 1.05, cy + ry)} ${P(cx + rx * 0.1, cy + ry)} Q${P(cx - rx * 0.9, cy + ry * 1.05)} ${P(cx - rx, cy)} Z`,
    blancArete) + '\n' + h.path(
    `M${P(cx - rx, cy)} Q${P(cx - rx, cy - ry)} ${P(cx - rx * 0.2, cy - ry)} Q${P(cx + rx * 0.8, cy - ry * 1.05)} ${P(cx + rx, cy - ry * 0.1)} Q${P(cx + rx * 1.05, cy + ry)} ${P(cx + rx * 0.1, cy + ry)} Q${P(cx - rx * 0.9, cy + ry * 1.05)} ${P(cx - rx, cy)} Z`,
    h.a.hachure('pierre', 'arete'));

  // Le bloc de bois en coupe, pour la suite des trois gestes.
  const YB = 132, D = 26, M = 18;
  const bloc = (x0, forme) => h.chemin(forme, h.a.hachure('bois', 'arete'), true);
  const lame = (bx, by, ux, uy, Lg) => {
    // section d'une lame : fine au tranchant (bx, by), un peu plus épaisse au dos
    const nx = -uy, ny = ux, e = 1.9;
    const s = [bx + ux * Lg, by + uy * Lg];
    return h.path(`M${P(bx, by)} L${P(bx + ux * Lg * 0.5 + nx * e * 0.8, by + uy * Lg * 0.5 + ny * e * 0.8)} L${P(s[0] + nx * e, s[1] + ny * e)} L${P(s[0] - nx * e, s[1] - ny * e)} L${P(bx + ux * Lg * 0.5 - nx * e * 0.8, by + uy * Lg * 0.5 - ny * e * 0.8)} Z`, h.a.plein);
  };

  return {
    ref: '38-02',
    titre: 'La marque de tombe',
    desc: 'En haut, deux marques de tombe vues en mars, le terrain coupé. À gauche, un pieu de bois dur équarri, tête en pointe, planté dans le sol au bout de la butte de la tombe ; le nom et les dates sont gravés sur sa face, bien au-dessus de la couche de neige. À droite, une pierre plate debout, le pied enterré et calé de pierres tout autour, gravée elle aussi au-dessus de la neige. En bas à gauche, la tête du pieu de près : deux lettres déjà taillées en V, et un troisième trait taillé à moitié, la pointe du couteau dedans, le manche qui remonte à droite, le tranchant vers le bas qu’on tire vers le bas. En bas à droite, un trait de lettre en coupe, en trois gestes : la lame debout au milieu du trait ; puis en biais depuis un bord jusqu’au fond de la première coupe, et un copeau sort ; puis le même biais depuis l’autre bord, et il reste un V.',
    format: 'pleine',
    disposition: [['bois', 'pierre'], ['graver', 'coupes']],
    hauteurs: [3, 2],
    largeurs: [[3, 2], [1, 1]],
    vues: {
      bois: {
        titre: 'En bois dur',
        dessin: z => {
          const grain = ['M136,112 C135,164 137,224 136,336', 'M151,116 C152,184 150,244 151,336',
            'M157,124 C156,174 158,214 157,284', 'M141,174 C142,214 140,264 141,336'];
          return [
            terrain(52, z.l - 8, [172, 330]),
            h.path('M128,340 L128,34 L145,27 L162,34 L162,340 Z', blancContour),
            ...grain.map(d => h.path(d, h.a.fin)),
            inscrire(133, 44, 'acbe', 4, 7, 7),
            inscrire(133, 57, 'fdga', 4, 7, 7),
            inscrire(133, 76, 'ebkd', 4, 6, 7),
            inscrire(133, 88, 'gcka', 4, 6, 7),
          ].join(BR);
        },
        renvois: z => [
          { n: 1, rond: [226, 48], cible: [162, 56], texte: 'pieu de bois dur équarri' },
          { n: 2, rond: [70, 70], cible: [131, 68], texte: 'nom et dates gravés' },
          { n: 3, rond: [300, 122], cible: [292, 180], texte: 'neige de mars' },
          { n: 4, rond: [24, 316], cible: [130, 318], texte: 'pied planté dans le sol' },
        ],
      },
      pierre: {
        titre: 'En pierre',
        dessin: z => [
          terrain(8, z.l - 36, null),
          h.path('M69,66 C70,56 78,50 92,48 C106,46 118,50 126,58 L134,60 C139,64 141,72 141,84 C143,130 145,184 146,234 C147,274 148,304 146,334 C128,341 92,340 69,336 C66,294 66,254 67,214 C68,164 67,114 69,66 Z', blancContour),
          // grain de la pierre : un léger pointillé
          ...[[84,168],[112,182],[96,206],[128,232],[80,240],[108,262],[90,290],[124,300],[100,318],[132,196]].map(([x,y]) => h.cercle(x, y, 0.8, h.a.fin)),
          inscrire(80, 78, 'acbef', 5, 8, 10),
          inscrire(80, 94, 'dga', 5, 8, 10),
          inscrire(80, 116, 'ebkgd', 5, 7, 10),
          // le calage : pierres serrées autour du pied, dans le trou rebouché
          caillou(56, 272, 11, 8), caillou(55, 292, 10, 8), caillou(57, 311, 10, 8), caillou(58, 329, 9, 7),
          caillou(158, 271, 11, 8), caillou(159, 291, 10, 8), caillou(158, 310, 10, 8), caillou(157, 329, 9, 7),
          caillou(52, 256, 10, 6), caillou(162, 255, 11, 6),
        ].join(BR),
        renvois: z => [
          { n: 5, rond: [30, 40], cible: [74, 70], texte: 'pierre plate debout' },
          { n: 6, rond: [z.l - 16, 302], cible: [168, 300], texte: 'pied enterré, calé de pierres' },
        ],
      },
      graver: {
        titre: 'Graver au couteau',
        dessin: z => {
          const w = 9, y0 = 70, y1 = 114;
          return [
            // la tête du pieu, de près ; le bas coupé
            h.path('M34,218 L34,48 L144,12 L254,48 L254,218', blancContour),
            h.path('M34,218 L118,218 L124,211 L131,225 L137,218 L254,218', h.a.fin),
            h.path('M44,130 C43,160 45,190 44,212', h.a.fin), h.path('M244,66 C245,116 243,166 244,212', h.a.fin),
            h.path('M214,134 C212,156 216,186 214,212', h.a.fin), h.path('M228,86 C229,116 227,146 229,176', h.a.fin),
            h.ellipse(222, 192, 4, 8, h.a.fin),
            // deux lettres déjà taillées
            traitV(60, y0, 60, y1, w), traitV(90, y0, 90, y1, w), traitV(62, 74, 88, 110, w),
            traitV(125, y0, 112, y1, w), traitV(125, y0, 138, y1, w), traitV(119.5, 98, 130.5, 98, w),
            // le trait suivant : la pointe entre au haut du trait, le couteau descend vers le manche
            // le trait suivant, taillé à moitié : la pointe dans le trait, le manche qui remonte
            traitV(165, y0, 165, 92, w),
            
            couteau(165, 92, 0.8, -0.6, -0.6, -0.8),
            h.geste('M165,97 L165,122'),
          ].join(BR);
        },
        renvois: z => [
          { n: 7, rond: [16, 144], cible: [56, 106], texte: 'trait taillé en V' },
          { n: 8, rond: [272, 140], cible: [167, 108], texte: 'lame tirée le long du trait' },
        ],
      },
      coupes: {
        titre: 'Un trait, en coupe',
        dessin: z => {
          const xs = [4, 98, 192], W = 76, bas = 200, k = Math.hypot(M, D);
          const ul = [-M / k, -D / k], ur = [M / k, -D / k];
          const out = [];
          xs.forEach((x0, i) => {
            const cx = x0 + W / 2;
            if (i === 0) {
              out.push(bloc(x0, [[x0, YB], [x0 + W, YB], [x0 + W, bas], [x0, bas]]));
              out.push(h.ligne(x0, YB, x0 + W, YB, h.a.contour));
              out.push(h.ligne(cx, YB, cx, YB + D, h.a.arete));
              out.push(lame(cx, YB + D, 0, -1, 66));
              out.push(h.geste(`M${cx + 12},76 L${cx + 12},118`));
            } else if (i === 1) {
              out.push(bloc(x0, [[x0, YB], [cx - M, YB], [cx, YB + D], [cx, YB], [x0 + W, YB], [x0 + W, bas], [x0, bas]]));
              out.push(h.chemin([[x0, YB], [cx - M, YB], [cx, YB + D], [cx, YB], [x0 + W, YB]], h.a.contour));
              out.push(h.chemin([[cx - M + 5, YB - 30], [cx + 5, YB - 30 + D], [cx + 5, YB - 30]], h.a.hachure('bois', 'arete'), true));
              out.push(lame(cx, YB + D, ul[0], ul[1], 66));
              out.push(h.geste(`M${P(cx - 42.7, 112.3)} L${P(cx - 29.1, 131.9)}`));
            } else {
              out.push(bloc(x0, [[x0, YB], [cx - M, YB], [cx, YB + D], [cx + M, YB], [x0 + W, YB], [x0 + W, bas], [x0, bas]]));
              out.push(h.chemin([[x0, YB], [cx - M, YB], [cx, YB + D], [cx + M, YB], [x0 + W, YB]], h.a.contour));
              out.push(h.chemin([[cx - 5, YB - 30], [cx + M - 5, YB - 30], [cx - 5, YB - 30 + D]], h.a.hachure('bois', 'arete'), true));
              out.push(lame(cx, YB + D, ur[0], ur[1], 66));
              out.push(h.geste(`M${P(cx + 42.7, 112.3)} L${P(cx + 29.1, 131.9)}`));
            }
          });
          return out.join(BR);
        },
        renvois: z => [
          { n: 9, rond: [20, 60], cible: [42, 110], texte: 'lame debout au milieu du trait' },
          { n: 10, rond: [158, 60], cible: [138, 108], texte: 'en biais : un copeau sort' },
          { n: 11, rond: [276, 60], cible: [258, 118], texte: 'même biais de l’autre bord' },
        ],
      },
    },
  };

};
