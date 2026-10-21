// Planche 28-03 — Le pendule d'une seconde (ch. 28, « Compter sans montre : le pendule d'une
// seconde »).
//
// Le chapitre donne une seule mesure : 1 m de ficelle entre le point d'attache et le milieu du
// poids (1000 mm, seule cote). Le poids : un écrou ou une pierre compacte, pas une cuillère.
// Suspendue au cadre de porte, écartée d'une main, lâchée, petit élan ; un aller simple fait une
// seconde environ ; on compte les respirations pendant soixante allers.
//
// Ce que le chapitre ne dit pas, et qui n'est dessiné que pour que le montage tienne, sans
// chiffre ni renvoi qui l'affirme : le clou planté sous le haut du cadre, la façon de nouer
// l'écrou (la ficelle passée dans le trou et nouée sur elle-même), l'amplitude (7° de part et
// d'autre, pour « petit élan »), les proportions de la porte et de l'écrou (un écrou de 24 :
// 36 sur plats, 19 d'épaisseur ; porte de 810 × 2030 ; chambranle de 70).
//
// La charte : l'écrou est l'objet, contour fort au repos et en grand. La porte ouverte, derrière
// le cadre, recule en gris loin ; de côté, le pan du dessous de l'écrou est à l'ombre. Le rouge :
// le cercle sur le milieu de l'écrou, où finit le mètre. La flèche de l'aller reste noire : c'est
// le poids qui se déplace, pas un geste.
module.exports = (h) => {
  const RAD = Math.PI / 180;
  const f = v => Math.round(v * 10) / 10;
  const N = '#1A1A1A';

  // écrou (mm)
  const AF = 36, AC = AF / Math.cos(30 * RAD), EP = 19, TROU = 10.5, FIL = 12;
  // pendule (mm)
  const LONG = 1000, THETA = 7;

  const BLANC_ARETE = `fill="#FFFFFF" stroke="${N}" stroke-width="1.4" stroke-linejoin="round"`;
  // Catmull-Rom : une courbe lisse qui passe par les points
  const lisse = (pts, ferme = false) => {
    const Pp = ferme ? [pts[pts.length - 1], ...pts, pts[0], pts[1]] : [pts[0], ...pts, pts[pts.length - 1]];
    let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
    for (let i = 1; i < Pp.length - 2; i++) {
      const p0 = Pp[i - 1], p1 = Pp[i], p2 = Pp[i + 1], p3 = Pp[i + 2];
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6], c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
    }
    return d + (ferme ? ' Z' : '');
  };
  // hexagone, plat en haut ; rot : rotation en degrés (sens horaire à l'écran)
  const hexa = (cx, cy, r, rot = 0) => {
    const pts = [];
    for (let i = 0; i < 6; i++) { const a = (i * 60 + rot) * RAD; pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); }
    return pts;
  };

  // ═══ A. Le montage dans le cadre de porte ═══════════════════════════════════════════════
  const geoA = z => {
    const s = (z.h - 26) / 2100;                      // px par mm
    const yF = z.h - 12, cx = z.l / 2;
    const P = (x, y) => [cx + x * s, yF - y * s];     // mm, origine au plancher au centre de la porte, y vers le haut
    const att = [0, 2030];                            // le point d'attache : sous le haut du cadre
    const bout = th => [att[0] + LONG * Math.sin(th * RAD), att[1] - LONG * Math.cos(th * RAD)];
    return { s, yF, cx, P, att, bout };
  };

  const dessinA = z => {
    const { s, yF, P, att, bout } = geoA(z);
    const o = [];
    const ch = (pts, at, ferme) => h.chemin(pts.map(p => P(p[0], p[1])), at, ferme);

    // le plancher et les plinthes
    o.push(h.ligne(0, yF, z.l, yF, h.a.contour));
    o.push(h.ligne(0, P(0, 90)[1], P(-475, 0)[0], P(0, 90)[1], h.a.detail), h.ligne(P(475, 0)[0], P(0, 90)[1], z.l, P(0, 90)[1], h.a.detail));

    // la porte ouverte, poussée vers la pièce d'à côté, pentures à gauche : vue de biais
    const c80 = Math.cos(80 * RAD);
    const xLibre = -405 + 810 * c80;
    o.push(ch([[-405, 12], [xLibre, 12], [xLibre, 2026], [-405, 2026]], h.a.loin, true));   // derrière le cadre : recule
    o.push(ch([[-405, 12], [xLibre, 12], [xLibre, 2026], [-405, 2026]], h.a.detail, true));
    // deux panneaux, raccourcis par le biais
    const px = v => -405 + v * c80;
    o.push(ch([[px(120), 1150], [px(690), 1150], [px(690), 1880], [px(120), 1880]], h.a.fin, true));
    o.push(ch([[px(120), 170], [px(690), 170], [px(690), 1000], [px(120), 1000]], h.a.fin, true));
    // la poignée : la rosace vue presque de chant, la tige, le bouton
    const xR = -405 + 750 * c80;
    const [rx, ry] = P(xR, 930);
    o.push(h.ellipse(rx, ry, 1.6, 30 * s, h.a.detail));
    o.push(h.ligne(rx + 1.6, ry, rx + 40 * s, ry, h.a.detail));
    o.push(h.cercle(rx + 40 * s + 26 * s, ry, 26 * s, h.a.detail));

    // le chambranle : deux montants et la tête, coupes d'onglet aux coins
    o.push(ch([[-475, 0], [-475, 2100], [475, 2100], [475, 0]], h.a.arete));
    o.push(ch([[-405, 0], [-405, 2030], [405, 2030], [405, 0]], h.a.arete));
    o.push(ch([[-475, 2100], [-405, 2030]], h.a.detail), ch([[475, 2100], [405, 2030]], h.a.detail));

    // le clou planté sous la tête du cadre : la tige dans le bois (cachée), la tête dessous
    const [ax, ay] = P(att[0], att[1]);
    o.push(h.ligne(ax, ay, ax, ay - 14, h.a.cache));
    o.push(h.ligne(ax, ay, ax, ay + 5, h.a.detail));
    o.push(h.ligne(ax - 3.2, ay + 5, ax + 3.2, ay + 5, h.a.arete));
    // le nœud sur la tige
    o.push(h.ellipse(ax, ay + 2.4, 2.3, 1.8, `fill="${N}" stroke="none"`));

    // les deux bouts de l'élan : ficelle et écrou en tireté
    const ecrou = (th, at, atTrou) => {
      const b = bout(th);
      const [bx, by] = P(b[0], b[1]);
      const pts = hexa(bx, by, (AC / 2) * s, th);
      const dirHaut = [-Math.sin(th * RAD), -Math.cos(th * RAD)];   // de l'écrou vers le clou, à l'écran
      const haut = [bx + dirHaut[0] * (AF / 2) * s, by + dirHaut[1] * (AF / 2) * s];
      return { b, bx, by, pts, haut, svg: [h.chemin(pts, at, true), h.cercle(bx, by, TROU * s, atTrou)].join('\n') };
    };
    for (const th of [-THETA, THETA]) {
      const e = ecrou(th, h.a.cache, h.a.fin);
      o.push(h.ligne(ax, ay + 3, e.haut[0], e.haut[1], h.a.cache));
      o.push(e.svg);
    }
    // l'arc d'un aller : de la gauche où on lâche, à la droite où il arrive
    const R = LONG + 75;
    const g = P(att[0] - R * Math.sin(THETA * RAD), att[1] - R * Math.cos(THETA * RAD));
    const d = P(att[0] + R * Math.sin(THETA * RAD), att[1] - R * Math.cos(THETA * RAD));
    o.push(h.fleche(`M${f(g[0])} ${f(g[1])} A${f(R * s)} ${f(R * s)} 0 0 0 ${f(d[0])} ${f(d[1])}`, h.a.arete));

    // au repos : la ficelle et l'écrou pleins
    const e0 = ecrou(0, `fill="#FFFFFF" ${h.a.contour.replace('fill="none" ', '')}`, h.a.detail);
    o.push(h.ligne(ax, ay + 3, e0.haut[0], e0.haut[1], h.a.arete));
    o.push(e0.svg);

    // la cote : du point d'attache au milieu de l'écrou
    const xc = P(175, 0)[0] + 20;
    o.push(h.ligne(ax + 4, ay, xc + 6, ay, h.a.fin));                       // attache haute : du point (1)
    o.push(h.ligne(e0.bx + (AC / 2) * s + 3, e0.by, xc + 6, e0.by, h.a.fin)); // attache basse : centre de l'écrou
    const ym = (ay + e0.by) / 2;
    o.push(h.ligne(xc, ay, xc, e0.by, h.a.detail));
    const pointe = (y, d) => `<path d="M${f(xc)} ${f(y)} L${f(xc - 3.5)} ${f(y + d * 11)} L${f(xc + 3.5)} ${f(y + d * 11)} Z" fill="#000000" stroke="none"/>`;
    o.push(pointe(ay, 1), pointe(e0.by, -1));                                  // flèches fermées
    o.push(`<g transform="rotate(-90 ${f(xc + 17)} ${f(ym)})">` + h.texte(xc + 17, ym, '1000 mm', { lisere: true }) + '</g>');
    return o.join('\n');
  };

  // ═══ B. Le poids : l'écrou de face et de côté, et la cuillère qu'on ne prend pas ═════════
  const geoB = z => {
    const k = 1.8;                                   // px par mm
    const yC = 160;                                   // le milieu de l'écrou, dans les deux vues
    const xF = 50, xS = 145, xD = z.l - 18;
    return { k, yC, xF, xS, xD };
  };

  const dessinB = z => {
    const { k, yC, xF, xS, xD } = geoB(z);
    const o = [];
    const af = AF / 2 * k, ac = AC / 2 * k, ep = EP / 2 * k, tr = TROU * k, fil = 3 * k;
    const yK = yC - af - 14 * k;                      // le nœud, au-dessus de l'écrou
    const yHaut = 20;

    // — de face : l'écrou, plat en haut ; le filet en trois quarts de cercle
    const face = hexa(xF, yC, ac);
    // — de côté : la boucle passe dans le trou et par-dessus l'écrou
    const xg = xS - ep - fil / 2, xd = xS + ep + fil / 2;
    const boucle = [[xS, yHaut], [xS, yK - 6], [xS - 3, yK], [xg, yC - af - 2], [xg, yC - tr + fil / 2 + 1],
      [xS, yC - tr + fil / 2], [xd, yC - tr + fil / 2 + 1], [xd, yC - af - 2], [xS + 3, yK]];
    o.push(h.formes.cordes([{ pts: boucle, ep: fil, debut: 'fixe', fin: 'coupe' }]));
    // l'écrou de côté, peint par-dessus la boucle
    const ch = 1.5 * k;
    const cote = [[xS - ep, yC - af + ch], [xS - ep + ch, yC - af], [xS + ep - ch, yC - af], [xS + ep, yC - af + ch],
      [xS + ep, yC + af - ch], [xS + ep - ch, yC + af], [xS - ep + ch, yC + af], [xS - ep, yC + af - ch]];
    o.push(h.chemin(cote, h.a.blanc, true));
    o.push(h.chemin([[xS - ep, yC], [xS + ep, yC], ...cote.slice(4)], h.a.ombre, true));   // le pan du dessous, à l'ombre
    o.push(h.chemin(cote, h.a.contour, true));
    o.push(h.ligne(xS - ep, yC, xS + ep, yC, h.a.detail));
    // le chanfrein : un arc au bout de chaque pan
    for (const [y0, y1] of [[yC - af, yC], [yC, yC + af]]) for (const sx of [-1, 1]) {
      const xb = xS + sx * ep, ym = (y0 + y1) / 2;
      o.push(h.path(`M${f(xb)} ${f(y0 + ch)} Q${f(xb - sx * 2.2 * ch)} ${f(ym)} ${f(xb)} ${f(y1 - ch)}`, h.a.fin));
    }
    // le trou, caché, et la ficelle qui y passe
    o.push(h.ligne(xS - ep, yC - tr, xS + ep, yC - tr, h.a.cache), h.ligne(xS - ep, yC + tr, xS + ep, yC + tr, h.a.cache));
    o.push(h.ligne(xS - ep, yC - tr + fil, xS + ep, yC - tr + fil, h.a.cache));
    // le nœud, vu de côté
    o.push(h.ellipse(xS, yK, 5, 6, `fill="#FFFFFF" stroke="${N}" stroke-width="1.4"`));
    o.push(h.path(`M${f(xS - 4)} ${f(yK - 3)} Q${f(xS)} ${f(yK + 1)} ${f(xS + 4)} ${f(yK - 3)} M${f(xS - 4)} ${f(yK + 2)} Q${f(xS)} ${f(yK + 6)} ${f(xS + 4)} ${f(yK + 2)}`, h.a.fin));
    o.push(h.formes.cordes([{ pts: [[xS + 4, yK + 2], [xS + 10, yK + 8], [xS + 12, yK + 16]], ep: fil, debut: 'fixe', fin: 'libre' }]));

    // l'écrou de face
    o.push(h.formes.cordes([{ pts: [[xF, yHaut], [xF, yK]], ep: fil, debut: 'fixe', fin: 'coupe' }]));
    o.push(h.chemin(face, `fill="#FFFFFF" ${h.a.contour.replace('fill="none" ', '')}`, true));
    o.push(h.cercle(xF, yC, af - 1.2, h.a.fin));                       // le chanfrein
    o.push(h.cercle(xF, yC, tr, h.a.detail));                          // le trou
    const rF = FIL * k;                                                // le filet : trois quarts de cercle
    o.push(h.path(`M${f(xF + rF)} ${f(yC)} A${f(rF)} ${f(rF)} 0 1 0 ${f(xF)} ${f(yC + rF)}`, h.a.fin));
    // la ficelle qui descend devant l'écrou et entre dans le trou
    o.push(h.formes.cordes([{ pts: [[xF, yK], [xF, yC - tr - 1]], ep: fil, debut: 'fixe', fin: 'coupe' }]));
    o.push(h.cercle(xF, yC - tr + fil / 2, fil / 2, h.a.plein));
    // le nœud, vu de face
    o.push(h.ellipse(xF, yK, 5, 6, `fill="#FFFFFF" stroke="${N}" stroke-width="1.4"`));
    o.push(h.path(`M${f(xF - 4)} ${f(yK - 3)} Q${f(xF)} ${f(yK + 1)} ${f(xF + 4)} ${f(yK - 3)} M${f(xF - 4)} ${f(yK + 2)} Q${f(xF)} ${f(yK + 6)} ${f(xF + 4)} ${f(yK + 2)}`, h.a.fin));
    o.push(h.formes.cordes([{ pts: [[xF - 4, yK + 2], [xF - 10, yK + 8], [xF - 12, yK + 16]], ep: fil, debut: 'fixe', fin: 'libre' }]));

    o.push(h.controle(xF, yC, 9));                                     // le milieu du poids : là finit le mètre
    // les axes : le milieu de l'écrou, dans les deux vues
    const axe = `fill="none" stroke="${N}" stroke-width="0.5" stroke-dasharray="9 2.5 2 2.5"`;
    o.push(h.ligne(xF - ac - 6, yC, xD + 6, yC, axe));
    o.push(h.ligne(xF, yC - af - 5, xF, yC + af + 6, axe), h.ligne(xS, yC + af + 1, xS, yC + af + 6, axe));
    // la fin de la cote de 1000 mm : la ligne vient d'en haut (coupée) et bute sur l'axe
    const yCoupe = yHaut + 8;
    o.push(h.ligne(xD, yCoupe + 6, xD, yC, h.a.detail), h.ligne(xD - 6, yC, xD + 6, yC, h.a.detail));
    o.push(h.path(`M${f(xD)} ${f(yCoupe - 8)} L${f(xD)} ${f(yCoupe - 2)} L${f(xD - 4)} ${f(yCoupe + 1)} L${f(xD + 4)} ${f(yCoupe + 3)} L${f(xD)} ${f(yCoupe + 6)}`, h.a.detail));

    // — la cuillère, à la même échelle, pendue par le manche, barrée
    const yS0 = yC + 150, xSp = z.l / 2;
    const Y = v => yS0 + 20 + v * k;                  // v en mm depuis le bout du manche
    const Q = (u, v) => [xSp + u * k, Y(v)];
    // le manche : large au bout, étroit au col ; demi-largeurs (mm) le long de v
    const prof = [[0, 0], [2, 4], [6, 5.5], [12, 6.4], [20, 5.6], [28, 4.6], [55, 3.6], [85, 2.8], [100, 2.4], [104, 2.6]];
    const gauche = prof.map(([v, u]) => Q(-u, v)), droite = prof.slice().reverse().map(([v, u]) => Q(u, v));
    o.push(h.path(lisse([...gauche, ...droite.slice(0, -1)], true), BLANC_ARETE));
    // le cuilleron
    o.push(h.ellipse(xSp, Y(127), 16 * k, 24 * k, BLANC_ARETE));
    o.push(h.ellipse(xSp, Y(128.5), 16 * k - 4, 24 * k - 5, h.a.fin));
    // la ficelle : deux tours sous le bout large, qui ne peuvent pas glisser par-dessus
        o.push(h.formes.cordes([{ pts: [Q(-6.5, 22), Q(0, 23.5), Q(6.3, 22.5)], ep: fil, debut: 'coupe', fin: 'coupe' }]));
    o.push(h.formes.cordes([{ pts: [Q(-6, 26.5), Q(0, 28), Q(5.8, 27)], ep: fil, debut: 'coupe', fin: 'coupe' }]));
    // la ficelle descend à côté du bout large et se noue sur les deux tours
    o.push(h.formes.cordes([{ pts: [[xSp, yS0 - 12], Q(-3, -8), Q(-8.6, 8), Q(-8, 22)], ep: fil, debut: 'fixe', fin: 'coupe' }]));
    { const [nx, ny] = Q(-7.6, 24.5); o.push(h.ellipse(nx, ny, 4.6, 5.6, `fill="#FFFFFF" stroke="${N}" stroke-width="1.4"`), h.path(`M${f(nx - 3.5)} ${f(ny - 2)} Q${f(nx)} ${f(ny + 1.5)} ${f(nx + 3.5)} ${f(ny - 2)}`, h.a.fin)); }
    // barrée
    const yM = Y(80), dx = 24 * k, dy = 42 * k;
    o.push(h.ligne(xSp - dx, yM - dy, xSp + dx, yM + dy, h.a.contour), h.ligne(xSp + dx, yM - dy, xSp - dx, yM + dy, h.a.contour));
    return o.join('\n');
  };

  return {
    ref: '28-03',
    titre: 'Le pendule d’une seconde',
    desc: 'Une ficelle pend d’un clou planté sous le haut d’un cadre de porte ; un écrou y est noué et le mètre, coté 1000 mm, va du point d’attache au milieu de l’écrou. L’écrou est dessiné en tireté aux deux bouts d’un petit élan, et une flèche en arc va de la gauche, où on le lâche, à la droite : un aller, une seconde. À droite, l’écrou en grand, de face et de côté, la ficelle passée dans son trou, l’axe qui marque son milieu ; dessous, une cuillère pendue, barrée.',
    format: 'pleine',
    disposition: [['montage', 'poids']],
    largeurs: [[5, 3]],
    vues: {
      montage: {
        titre: 'Dans le cadre de porte',
        dessin: dessinA,
        renvois: z => {
          const { P, att, bout } = geoA(z);
          const bg = bout(-THETA);
          return [
            { n: 1, rond: P(-170, 1965), cible: P(-4, 2022), texte: 'point d’attache, sous le haut du cadre' },
            { n: 2, rond: P(-170, 1760), cible: P(0, 1720), texte: 'ficelle' },
            { n: 3, rond: P(-235, 1060), cible: P(bg[0] - 22, bg[1] + 4), texte: 'départ : écartée d’une main, lâchée' },
            { n: 4, rond: P(0, 870), cible: P(45, 957), texte: 'un aller, une seconde : en compter soixante' },
          ];
        },
      },
      poids: {
        titre: 'Le poids',
        dessin: dessinB,
        renvois: z => {
          const { k, yC, xF, xD } = geoB(z);
          const yS0 = yC + 150;
          return [
            { n: 5, rond: [xF - 22, yC + 62], cible: [xF - 12, yC + AF / 2 * k - 1], texte: 'écrou ou pierre compacte' },
            { n: 6, rond: [xD - 4, yC + 34], cible: [xD, yC + 1], texte: 'fin du mètre : le milieu du poids' },
            { n: 7, rond: [z.l / 2 + 62, yS0 + 20 + 150 * k], cible: [z.l / 2 + 12 * k, yS0 + 20 + 132 * k], texte: 'pas de cuillère : freine, milieu flou' },
          ];
        },
      },
    },
  };
};
