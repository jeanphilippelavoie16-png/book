// Planche 83-10 — La truie : le poêle de baril de 205 L (chapitre 15, « Le poêle de fortune : la truie »)
// Cotes : une main (lit de sable sur la sole). Aucun autre chiffre : le chapitre n'en donne pas.
module.exports = (h) => {
  const A = h.a;
  const W = at => at.replace('fill="none"', 'fill="#FFFFFF"');

  // une cornière vue à plat : bande blanche, pli au milieu, deux boulons en haut
  const corniere = (x1, y1, x2, y2, e = 3.5) => {
    const L = Math.hypot(x2 - x1, y2 - y1), nx = -(y2 - y1) / L * e, ny = (x2 - x1) / L * e;
    const ux = (x2 - x1) / L, uy = (y2 - y1) / L;
    return [
      h.chemin([[x1 + nx, y1 + ny], [x2 + nx, y2 + ny], [x2 - nx, y2 - ny], [x1 - nx, y1 - ny]], W(A.arete), true),
      h.path(`M${x1} ${y1} L${x2} ${y2}`, A.fin),
      h.cercle(x1 + ux * 5, y1 + uy * 5, 1.3, A.plein),
      h.cercle(x1 + ux * 12, y1 + uy * 12, 1.3, A.plein),
    ].join('\n');
  };

  // ── En coupe sur la longueur ──────────────────────────────────────────────────────
  const coupe = z => {
    const o = [];
    const D = 160, xa = 177, xb = 423;
    const yF = z.h - 7, yBt = yF - 16, yB = yBt - 38, yT = yB - D, yC = yT + D / 2;
    const yS = yB - 28;                  // dessus du lit de sable : une main
    const yD = yT + 30;                  // la tôle suspendue
    const xp1 = 364, xp2 = 406, xpc = (xp1 + xp2) / 2;

    // plancher et caisson de sable
    o.push(h.rect(10, yF, z.l - 20, 7, A.hachure('bois', 'aucun')), h.ligne(10, yF, z.l - 10, yF, A.arete));
    o.push(h.rect(148, yBt, 304, yF - yBt, A.hachure('gravier', 'aucun')), h.ligne(148, yBt, 452, yBt, A.detail));
    o.push(h.rect(142, yBt - 4, 6, yF - yBt + 4, W(A.arete)), h.rect(452, yBt - 4, 6, yF - yBt + 4, W(A.arete)));
    // pattes (celles du fond, vues sous le baril)
    for (const x of [xa + 18, xb - 18]) o.push(h.rect(x - 4, yB, 8, yBt - yB + 5, W(A.arete)), h.ligne(x, yB, x, yBt + 5, A.fin));

    // lit de sable sur toute la sole
    o.push(h.rect(xa + 1, yS, xb - xa - 2, yB - yS, A.hachure('gravier', 'aucun')), h.ligne(xa + 1, yS, xb - 1, yS, A.detail));
    // deux quartiers couchés sur le sable, côté porte
    const buche = (x, y, l, ht) => h.rect(x, y, l, ht, `${W(A.arete)} rx="5"`) +
      h.ligne(x + 8, y + ht * 0.4, x + l - 14, y + ht * 0.4, A.fin) + h.ligne(x + 16, y + ht * 0.7, x + l - 8, y + ht * 0.7, A.fin);
    o.push(buche(xa + 20, yS - 14, 132, 14), buche(xa + 34, yS - 28, 110, 14));

    // la coque : dessus et dessous, avec les deux cerceaux de roulement
    o.push(h.ligne(xa, yT, xp1 - 2, yT, A.contour), h.ligne(xp2 + 2, yT, xb, yT, A.contour));
    o.push(h.ligne(xa, yB, xb, yB, A.contour));
    for (const x of [xa + 82, xa + 164]) {
      o.push(h.path(`M${x - 6} ${yT} Q${x} ${yT - 10} ${x + 6} ${yT}`, A.contour));
      o.push(h.path(`M${x - 6} ${yB} Q${x} ${yB + 10} ${x + 6} ${yB}`, A.contour));
    }
    // les bouts, et les bourrelets du baril aux quatre coins
    o.push(h.ligne(xb, yT, xb, yB, A.contour));
    const yP1 = yC - 45, yP2 = yC + 28;       // la porte, dans le bout de gauche
    o.push(h.ligne(xa, yT, xa, yP1 - 3, A.contour), h.ligne(xa, yP2 + 3, xa, yB, A.contour));
    o.push(h.ligne(xa, yP1, xa, yP2, A.contour));
    o.push(h.rect(xa - 1.5, yP1 - 3, 3, 3, A.plein), h.rect(xa - 1.5, yP2, 3, 3, A.plein)); // jeu comblé à l'argile
    for (const [x, y] of [[xa, yT], [xa, yB], [xb, yT], [xb, yB]]) o.push(h.cercle(x + (x === xa ? -2 : 2), y + (y === yT ? -2 : 2), 3.2, A.plein));
    // la barre à came, coupée, et son boulon
    o.push(h.rect(xa - 8, yC - 12, 5, 8, A.plein), h.ligne(xa - 9, yC - 8, xa + 4, yC - 8, A.arete));

    // la tôle suspendue sous le dessus, passage côté porte
    o.push(h.ligne(xa + 62, yD, xb, yD, A.contour));
    for (const x of [xa + 92, xb - 72]) o.push(h.ligne(x, yT, x, yD, A.arete), h.cercle(x, yT - 1.5, 1.8, A.plein));

    // plaque de cuisson posée sur les cerceaux
    o.push(h.rect(xa + 48, yT - 11, 130, 6, W(A.arete)), h.rect(xa + 48, yT - 11, 130, 6, A.hachure('metal')));

    // le tuyau, emmanché dans le collet
    o.push(h.ligne(xp1, yT + 10, xp1, 12, A.contour), h.ligne(xp2, yT + 10, xp2, 12, A.contour));
    o.push(h.ligne(xp1 - 2, yT, xp1 - 2, yT + 11, A.arete), h.ligne(xp2 + 2, yT, xp2 + 2, yT + 11, A.arete));
    o.push(h.path(`M${xp1 - 4} 13 L${xp1 + 12} 8 L${xp2 - 12} 16 L${xp2 + 4} 11`, A.detail));

    // l'air : entre par le bouchon du bout de la porte, au-dessus du feu
    o.push(h.fleche(`M${xa - 44} ${yC + 19} L${xa + 30} ${yC + 19}`, A.cache));
    // le trajet des gaz : sous la tôle vers la porte, puis au-dessus jusqu'au bout opposé
    o.push(h.fleche(`M${xa + 150} ${yS - 34} C${xa + 150} ${yD + 22}, ${xa + 130} ${yD + 14}, ${xa + 100} ${yD + 14} L${xa + 44} ${yD + 14}`, A.cache));
    o.push(h.fleche(`M${xa + 44} ${yD + 14} C${xa + 22} ${yD + 14}, ${xa + 22} ${yT + 15}, ${xa + 46} ${yT + 15} L${xpc - 40} ${yT + 15} C${xpc - 12} ${yT + 15}, ${xpc} ${yT + 8}, ${xpc} ${yT - 34}`, A.cache));

    // cote : l'épaisseur du lit
    o.push(h.cote(xa - 22, yS, xa - 22, yB, 'une main', { cote: 'gauche' }));
    return o.join('\n');
  };

  const SP = 1.12;   // la vue du bout de la porte, grossie
  const sp = (z, x, y) => [Math.round(z.l / 2 + (x - z.l / 2) * SP), Math.round(z.h + (y - z.h) * SP)];
  // ── Le bout de la porte ───────────────────────────────────────────────────────────
  const porte = z => {
    const o = [];
    const R = 75, cx = Math.round(z.l / 2);
    const yF = z.h - 5, yBt = yF - 15, cy = yBt - 92;
    // plancher, caisson, pattes
    o.push(h.rect(4, yF, z.l - 8, 5, A.hachure('bois', 'aucun')), h.ligne(4, yF, z.l - 4, yF, A.arete));
    o.push(h.rect(cx - 101, yBt, 202, yF - yBt, A.hachure('gravier', 'aucun')), h.ligne(cx - 101, yBt, cx + 101, yBt, A.detail));
    o.push(h.rect(cx - 106, yBt - 4, 5, yF - yBt + 4, W(A.arete)), h.rect(cx + 101, yBt - 4, 5, yF - yBt + 4, W(A.arete)));
    // le tuyau, au bout opposé, qui dépasse derrière
    o.push(h.ligne(cx - 20, 22, cx - 20, cy - R - 6, A.arete), h.ligne(cx + 20, 22, cx + 20, cy - R - 6, A.arete));
    o.push(h.path(`M${cx - 23} 23 L${cx - 8} 18 L${cx + 8} 26 L${cx + 23} 21`, A.detail));
    // le bout du baril : bourrelet et fond
    o.push(h.cercle(cx, cy, R, W(A.contour)), h.cercle(cx, cy, R - 6, A.detail));
    // plaque de cuisson sur le dessus
    o.push(h.rect(cx - 36, cy - R - 6, 72, 6, W(A.arete)), h.rect(cx - 36, cy - R - 6, 72, 6, A.hachure('metal')));
    // pattes en cornière
    o.push(corniere(cx - 56, cy + 44, cx - 92, yBt + 3), corniere(cx + 56, cy + 44, cx + 92, yBt + 3));
    // le dessus du lit de sable, derrière
    const yS = cy + R - 26, dS = Math.sqrt((R - 6) ** 2 - (yS - cy) ** 2);
    o.push(h.ligne(cx - dS + 2, yS, cx + dS - 2, yS, A.cache));

    // la porte : le morceau découpé, et le trait de coupe autour
    const px1 = cx - 25, px2 = cx + 25, py1 = cy - 42, py2 = cy + 26;
    o.push(h.rect(px1 - 3, py1 - 3, 56, 74, `${A.arete} rx="7"`));
    o.push(h.rect(px1, py1, 50, 68, `${W(A.contour)} rx="5"`));
    // charnières boulonnées, à gauche
    for (const y of [py1 + 6, py2 - 18]) {
      o.push(h.rect(px1 - 16, y, 30, 11, W(A.arete)), h.rect(px1 - 4, y - 2, 5, 15, W(A.arete)));
      o.push(h.cercle(px1 - 10, y + 5.5, 1.5, A.plein), h.cercle(px1 + 8, y + 5.5, 1.5, A.plein));
    }
    // barre à came : pivote sur un boulon au milieu de la porte, s'engage sous la came
    const yb = cy - 8;
    // la barre d'abord, la came (bride boulonnée au baril) par-dessus : la barre passe dessous
    o.push(h.path(`M${cx - 20} ${yb - 3.5} L${cx + 49} ${yb - 1.5} L${cx + 49} ${yb + 1.5} L${cx - 20} ${yb + 3.5} Z`, W(A.arete)));
    o.push(h.path(`M${cx - 20} ${yb - 3.5} L${cx - 27} ${yb + 8} L${cx - 22} ${yb + 10} L${cx - 16} ${yb + 3.5}`, W(A.arete)));
    o.push(h.cercle(cx, yb, 3, W(A.arete)), h.cercle(cx, yb, 1, A.plein));
    // la came : une rampe boulonnée au baril, mince à l'entrée (en haut), épaisse au bout (en bas) ;
    // la barre descend en tournant et se coince à mi-rampe
    o.push(h.path(`M${cx + 31} ${yb - 17} L${cx + 35} ${yb - 17} L${cx + 46} ${yb + 14} L${cx + 31} ${yb + 14} Z`, W(A.arete)));
    o.push(h.ligne(cx + 33, yb - 17, cx + 33, yb + 14, A.fin));
    o.push(h.cercle(cx + 38, yb + 9, 1.4, A.plein), h.cercle(cx + 36, yb - 11, 1.2, A.plein));
    // le geste : on rabat la barre vers le bas, elle monte sur la rampe et serre la porte
    o.push(h.fleche(`M${cx + 14} ${yb - 15} A 20 20 0 0 1 ${cx + 20} ${yb + 5}`, A.arete));
    // l'arrivée d'air : le gros bouchon, plaque coulissante sur un boulon
    const bx = cx + 40, by = cy + 19;
    o.push(h.cercle(bx, by, 7.5, W(A.arete)), h.cercle(bx, by, 4.5, A.plein));
    o.push(h.rect(bx + 1, by - 6.5, 25, 13, `${W(A.arete)} rx="2"`), h.rect(bx + 9, by - 1.5, 13, 3, `${W(A.detail)} rx="1.5"`));
    o.push(h.cercle(bx + 18, by, 2.2, W(A.arete)));
    // l'autre bouchon, fermé
    o.push(h.cercle(cx + 40, cy - 40, 6, W(A.arete)), h.cercle(cx + 40, cy - 40, 3.5, A.detail), h.ligne(cx + 37, cy - 40, cx + 43, cy - 40, A.detail));
    return `<g transform="translate(${cx} ${z.h}) scale(${SP}) translate(${-cx} ${-z.h})">` + o.join('\n') + '</g>';
  };

  // ── Le collet en étoile ───────────────────────────────────────────────────────────
  const collet = z => {
    const o = [];
    const cx = 70, cy = 54, rT = 30, rt = 11;
    // à plat, vu de dessus
    o.push(h.rect(12, 10, 116, 88, A.detail));
    o.push(h.cercle(cx, cy, rT, A.fin));
    o.push(h.cercle(cx, cy, rt, W(A.arete)));
    for (let k = 0; k < 8; k++) {
      const a = k * Math.PI / 4 + Math.PI / 8;
      o.push(h.ligne(cx + rt * Math.cos(a), cy + rt * Math.sin(a), cx + rT * Math.cos(a), cy + rT * Math.sin(a), A.arete));
    }
    // en coupe : languettes rabattues vers l'intérieur, tuyau emmanché
    const yt = 152, x1 = cx - rT, x2 = cx + rT, lg = rT - rt;
    o.push(h.ligne(8, yt, x1 - 2, yt, A.contour), h.ligne(x2 + 2, yt, 132, yt, A.contour));
    o.push(h.ligne(x1 - 2, yt, x1 - 2, yt + lg, A.contour), h.ligne(x2 + 2, yt, x2 + 2, yt + lg, A.contour));
    o.push(h.ligne(x1, 116, x1, yt + lg + 3, A.arete), h.ligne(x2, 116, x2, yt + lg + 3, A.arete));
    o.push(h.path(`M${x1 - 3} 118 L${cx - 10} 112 L${cx + 10} 121 L${x2 + 3} 115`, A.detail));
    // la flamme monte de l'intérieur
    o.push(h.fleche(`M${cx} ${z.h - 6} L${cx} 128`, A.cache));
    return o.join('\n');
  };

  // ── Par une fenêtre condamnée ─────────────────────────────────────────────────────
  const fenetre = z => {
    const o = [];
    const xm1 = 78, xm2 = 96, xt = 87;          // le mur, et la tôle au milieu
    const yh = 30, ys = 178;                     // linteau et appui
    const t1 = 92, t2 = 118;                     // le tuyau
    o.push(h.rect(xm1, 0, xm2 - xm1, yh - 8, A.hachure('bois')));
    o.push(h.rect(xm1, yh - 8, xm2 - xm1, 8, W(A.arete)));
    o.push(h.rect(xm1 - 4, ys, xm2 - xm1 + 8, 7, W(A.arete)));
    o.push(h.rect(xm1, ys + 7, xm2 - xm1, z.h - ys - 7, A.hachure('bois')));
    // la tôle à la place de la vitre, percée large
    o.push(h.ligne(xt, yh, xt, t1 - 20, A.contour), h.ligne(xt, t2 + 20, xt, ys, A.contour));
    // le tuyau : monte du poêle, traverse, remonte dehors
    o.push(h.chemin([[14, z.h], [14, t1], [120, t1], [120, 4]], A.contour));
    o.push(h.chemin([[40, z.h], [40, t2], [146, t2], [146, 4]], A.contour));
    o.push(h.path(`M14 ${t1} L40 ${t2} M120 ${t1} L146 ${t2}`, A.detail));
    o.push(h.path(`M117 6 L128 2 L138 9 L149 5`, A.detail));
    return `<g transform="scale(0.9 1)">` + o.join('\n') + '</g>';
  };

  return {
    ref: '83-10',
    titre: 'La truie : le poêle de baril de 205 L',
    desc: 'Baril d’acier couché sur des pattes en cornière, posé dans un caisson de sable. En coupe sur la longueur : un lit de sable sur toute la sole, de l’épaisseur d’une main ; une tôle suspendue sous le dessus qui laisse un passage du côté de la porte ; la sortie au bout opposé, en haut ; les gaz passent sous la tôle vers la porte, remontent et reviennent au-dessus jusqu’au tuyau ; une plaque de cuisson posée sur les cerceaux. Le bout de la porte : le morceau découpé au ciseau à froid remonté en porte sur deux charnières boulonnées, une barre qui pivote au milieu et passe sous une came boulonnée au baril, le jeu comblé à l’argile, le gros bouchon gardé comme arrivée d’air sous une plaque coulissante sur un boulon (l’air entre par ce bout, au-dessus du feu), l’autre bouchon fermé. Le collet : un trou plus petit que le tuyau, entaillé en étoile, les languettes rabattues vers l’intérieur qui serrent le tuyau. La sortie par une fenêtre condamnée : une tôle à la place de la vitre, percée large, le tuyau au milieu avec du jeu d’air tout autour.',
    format: 'pleine',
    disposition: [['coupe'], ['porte', 'collet', 'fenetre']],
    hauteurs: [5, 4],
    largeurs: [[1], [4, 2, 2]],
    vues: {
      coupe: {
        titre: 'En coupe sur la longueur',
        dessin: coupe,
        renvois: z => [
          { n: 1, rond: [520, 200], cible: [380, z.h - 76], texte: 'sable ou petites pierres' },
          { n: 2, rond: [520, 120], cible: [330, z.h - 191], texte: 'tôle, passage à un seul bout' },
          { n: 3, rond: [500, 30], cible: [408, z.h - 214], texte: 'sortie en haut, bout opposé' },
          { n: 4, rond: [200, 22], cible: [252, z.h - 229], texte: 'plaque d’acier ou de fonte' },
          { n: 5, rond: [520, 245], cible: [409, z.h - 38], texte: 'pattes en cornière' },
          { n: 6, rond: [90, 250], cible: [145, z.h - 14], texte: 'caisson de sable' },
        ],
      },
      porte: {
        titre: 'Le bout de la porte',
        dessin: porte,
        renvois: z => {
          const cx = Math.round(z.l / 2), cy = z.h - 20 - 92;
          return [
            { n: 7, rond: [z.l - 12, 16], cible: sp(z, cx + 12, cy - 30), texte: 'découpée au ciseau à froid' },
            { n: 8, rond: [14, 70], cible: sp(z, cx - 38, cy - 30), texte: 'charnières boulonnées' },
            { n: 9, rond: [z.l - 12, 100], cible: sp(z, cx + 40, cy + 2), texte: 'barre de fermeture à came' },
            { n: 10, rond: [24, 22], cible: sp(z, cx - 8, cy - 43.5), texte: 'jeu comblé à l’argile' },
            { n: 11, rond: [z.l - 12, 150], cible: sp(z, cx + 62, cy + 22), texte: 'arrivée d’air à glissière' },
            { n: 12, rond: [z.l - 12, 52], cible: sp(z, cx + 44, cy - 44), texte: 'l’autre bouchon, bouché' },
          ];
        },
      },
      collet: {
        titre: 'Le collet en étoile',
        dessin: collet,
        renvois: z => [
          { n: 13, rond: [z.l - 12, 30], cible: [86, 38], texte: 'trou étroit, entaillé en étoile' },
          { n: 14, rond: [z.l - 12, 185], cible: [103, 165], texte: 'languettes vers l’intérieur' },
          { n: 15, rond: [z.l - 12, 125], cible: [100, 132], texte: 'tuyau emmanché serré' },
        ],
      },
      fenetre: {
        titre: 'Par une fenêtre condamnée',
        dessin: fenetre,
        renvois: z => [
          { n: 16, rond: [54, 170], cible: [78, 158], texte: 'tôle à la place de la vitre' },
          { n: 17, rond: [50, 40], cible: [78, 80], texte: 'large jeu d’air autour' },
        ],
      },
    },
    danger: 'Danger — le baril rougit sans prévenir, et le bois chauffé tout un hiver s’enflamme plus bas que le bois neuf : un mur, un meuble ou un plancher sur lequel la main ne tient pas posée est trop proche.',
  };
};
