// 86-01b — La roue à augets : multiplicateur et délestage (chapitre 86, section C, « Bâtir »)
// Élévation vue de la berge (le ruisseau derrière), origine à l'axe de la roue, mètres, y en haut.
// Le plan dessous partage l'axe des x. Y du plan = Y du plan de 86-01a (1,22 = milieu de la roue).
//
// Vérifié : la roue tourne dans le sens horaire vue de la berge (86-01a). Chaîne et courroies
// ouvertes : tout tourne dans le même sens. Le pignon est du côté de la berge, comme le plateau :
// vu de ce côté, il est mené dans le sens horaire, qui est le sens où la roue libre d'un vélo tire
// (vélo vu du côté de la chaîne, en marche avant). Chaque paire dans un même plan : plateau et
// pignon (1,66), jante et petite poulie (1,61), grande poulie et poulie de dynamo (1,50).
// Rapports dessinés : 0,10/0,04 × 0,315/0,06 × 0,13/0,04 ≈ 43, l'ordre des 40 fois du chapitre.
// Le délestage est pris avant la diode et le fusible : la batterie ne peut pas le nourrir, et
// la roue ne se retrouve jamais à vide quand le fusible saute.
//
// La charte : pas de gris, la planche n'a pas de volume qui en demande (élévation de pièces minces,
// plan, schéma). Le rouge : un seul point à contrôler, la prise du délestage sur les deux fils,
// côté roue, avant la diode et le fusible. Les flèches de rotation restent noires.

const XA = -2.08, XW = 2.76;                 // étendue en x, élévation et plan
const HM = [-0.36, 0.58], HD = [1.0, 1.86];  // étendues verticales
const ZM = 149, ZD = 125;                    // hauteurs des deux vues (sortie de --zones)
const echelle = z => Math.min(z.l / XW, ZM / (HM[1] - HM[0]), ZD / (HD[1] - HD[0]));
const SOL = -0.29;
const W = [-0.62, 0.12], A = [-1.30, 0.12], D = [-1.80, -0.19];   // roue arrière, arbre, dynamo
const RPL = 0.10, RPI = 0.04, RJ = 0.33, RJI = 0.30, RC = 0.315, RPP = 0.06, RGP = 0.13, RDY = 0.04;

const repM = z => {
  const s = echelle(z), ox = (z.l - XW * s) / 2, oy = (z.h - (HM[1] - HM[0]) * s) / 2;
  const P = (x, y) => [ox + (x - XA) * s, oy + (HM[1] - y) * s];
  P.s = s; return P;
};
const repD = z => {
  const s = echelle(z), ox = (z.l - XW * s) / 2, oy = (z.h - (HD[1] - HD[0]) * s) / 2;
  const P = (x, y) => [ox + (x - XA) * s, oy + (y - HD[0]) * s];
  P.s = s; return P;
};
const cadre = (z, xa, xb, ya, yb) => {
  const s = Math.min(z.l / (xb - xa), z.h / (yb - ya));
  const ox = (z.l - (xb - xa) * s) / 2 - xa * s, oy = (z.h - (yb - ya) * s) / 2 + yb * s;
  const P = (x, y) => [ox + x * s, oy - y * s];
  P.s = s; return P;
};
// tangentes extérieures de deux cercles (repère y en haut)
const tangentes = (c1, r1, c2, r2) => {
  const dx = c2[0] - c1[0], dy = c2[1] - c1[1], L = Math.hypot(dx, dy);
  const a = Math.atan2(dy, dx), b = Math.acos((r1 - r2) / L);
  return [a + b, a - b].map(t => [[c1[0] + r1 * Math.cos(t), c1[1] + r1 * Math.sin(t)], [c2[0] + r2 * Math.cos(t), c2[1] + r2 * Math.sin(t)]]);
};
const BAR = [-2, 300, -4, 110];              // délestage : unités libres, y en haut

module.exports = (h) => {
  const BL = h.a.contour.replace('fill="none"', 'fill="#FFFFFF"');
  const BLa = h.a.arete.replace('fill="none"', 'fill="#FFFFFF"');
  const EAU = h.a.hachure('eau', 'aucun'), TERRE = h.a.hachure('terre', 'aucun');
  const CHAINE = h.a.contour.replace('stroke-linecap="round"', 'stroke-linecap="butt"') + ' stroke-dasharray="3 1.6"';
  const poly = (P, pts, a) => h.chemin(pts.map(q => P(...q)), a, true);
  const trait = (P, pts, a) => h.chemin(pts.map(q => P(...q)), a);
  const boite = (P, x0, y0, x1, y1, a) => poly(P, [[x0, y0], [x1, y0], [x1, y1], [x0, y1]], a);
  const flecheArc = (P, c, r, t0, t1, a = h.a.arete) => {
    const pts = Array.from({ length: 17 }, (_, i) => {
      const t = (t0 + (t1 - t0) * i / 16) * Math.PI / 180;
      return P(c[0] + r * Math.sin(t), c[1] + r * Math.cos(t));
    });
    return h.fleche('M' + pts.map(p => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' L'), a);
  };

  return {
    ref: '86-01b',
    titre: 'La roue à augets : multiplicateur et délestage',
    desc: 'Le multiplicateur de la roue à augets, vu de la berge puis de dessus, et la charge de délestage. Premier étage : un plateau de pédalier au bout de l’axe de la roue mène, par la chaîne, le pignon d’une roue arrière de vélo dont le moyeu est serré entre deux montants. Deuxième étage : la jante de cette roue, pneu enlevé, sert de grande poulie ; une courroie en V mène la petite poulie d’un arbre de renvoi. Troisième étage : la grande poulie de l’arbre mène la poulie de la dynamo, un moteur à aimants permanents. Vu de dessus, chaque paire est dans un même plan et le pignon est du même côté que le plateau. La charge de délestage : des ampoules de phare en parallèle, douilles au sec dans une planche posée sur un baril d’eau, verre dans l’eau, branchées côté roue avant la diode du fil positif et avant le fusible. Encadré danger : une roue à eau ne se débranche pas.',
    format: 'pleine',
    disposition: [['multi'], ['dessus'], ['baril']],
    hauteurs: [1.75, 1.5, 1.9],
    vues: {
      // ── le multiplicateur, vu de la berge ──
      multi: {
        titre: 'Le multiplicateur, vu de la berge',
        dessin: z => {
          const P = repM(z), s = P.s, o = [];
          const cercle = (c, r, a) => h.cercle(...P(...c), r * s, a);
          // sol de la berge
          o.push(boite(P, XA, HM[0], XA + XW, SOL, TERRE), trait(P, [[XA, SOL], [XA + XW, SOL]], h.a.arete));
          // la roue à augets, derrière, et son sens
          o.push(cercle([0, 0], 0.5, h.a.cache));
          o.push(flecheArc(P, [0, 0], 0.57, 58, 112));
          // dynamo : pied, corps, poulie (le corps est derrière sa poulie)
          o.push(boite(P, D[0] - 0.07, SOL, D[0] + 0.07, SOL + 0.035, h.a.hachure('bois', 'arete')));
          o.push(boite(P, D[0] - 0.035, SOL + 0.035, D[0] + 0.035, D[1] - 0.03, BLa));
          o.push(cercle(D, 0.058, BL));
          // courroie du troisième étage, grande poulie, poulie de la dynamo
          for (const [p, q] of tangentes(A, RGP, D, RDY)) o.push(h.ligne(...P(...p), ...P(...q), h.a.arete));
          o.push(cercle(A, RGP, BL), cercle(D, RDY, BLa), cercle(D, 0.008, h.a.plein));
          // palier de la roue, côté berge
          o.push(boite(P, -0.04, SOL, 0.04, -0.06, h.a.hachure('bois', 'arete')), boite(P, -0.055, -0.06, 0.055, 0.06, h.a.hachure('metal', 'arete')));
          // roue arrière : rayons, jante sans pneu, moyeu
          for (let k = 0; k < 16; k++) {
            const f = k * Math.PI / 8, g = f + (k % 2 ? 0.35 : -0.35);
            o.push(h.chemin([P(W[0] + 0.035 * Math.cos(f), W[1] + 0.035 * Math.sin(f)), P(W[0] + RJI * Math.cos(g), W[1] + RJI * Math.sin(g))], h.a.fin));
          }
          o.push(cercle(W, RJ, h.a.contour), cercle(W, RJI, h.a.arete), cercle(W, 0.035, h.a.arete));
          // courroie du deuxième étage, dans la jante, et petite poulie de l'arbre
          // ce brin est plus près de la berge que la grande poulie : il passe devant sa face,
          // en trait plein jusqu'à la petite poulie (liseré blanc pour couper le bord de la grande)
          const HALO = h.a.arete.replace(/stroke="[^"]*"/, 'stroke="#FFFFFF"').replace('stroke-width="1.4"', 'stroke-width="5"');
          for (const [p, q] of tangentes(W, RC, A, RPP)) o.push(h.ligne(...P(...p), ...P(...q), HALO), h.ligne(...P(...p), ...P(...q), h.a.arete));
          o.push(cercle(A, RPP, BL), cercle(A, 0.012, h.a.plein));
          // chaîne du premier étage, pignon, plateau
          for (const [p, q] of tangentes([0, 0], RPL, W, RPI)) o.push(h.ligne(...P(...p), ...P(...q), CHAINE));
          o.push(cercle(W, RPI, BL));
          o.push(cercle([0, 0], RPL, BL), cercle([0, 0], 0.082, h.a.detail), cercle([0, 0], 0.015, h.a.plein));
          for (let k = 0; k < 5; k++) o.push(cercle([0.055 * Math.cos(k * 1.2566 + 0.3), 0.055 * Math.sin(k * 1.2566 + 0.3)], 0.007, h.a.plein));
          // montants devant : moyeu de la roue arrière, palier de l'arbre
          o.push(boite(P, W[0] - 0.022, SOL, W[0] + 0.022, W[1], BLa), cercle(W, 0.016, h.a.plein));
          o.push(boite(P, A[0] - 0.03, SOL, A[0] + 0.03, A[1] - 0.075, h.a.hachure('bois', 'arete')));
          // sens
          o.push(flecheArc(P, [0, 0], 0.145, 40, 125));
          return o.join('\n');
        },
        renvois: z => {
          const P = repM(z);
          const [c2] = tangentes([0, 0], RPL, W, RPI), [b3] = tangentes(A, RGP, D, RDY);
          return [
            { n: 1, rond: P(0.3, -0.2), cible: P(0.075, -0.06), texte: 'plateau sur l’axe de la roue' },
            { n: 2, rond: P(-0.28, 0.47), cible: P((c2[0][0] + c2[1][0]) / 2, (c2[0][1] + c2[1][1]) / 2), texte: 'chaîne sur le pignon de la roue arrière' },
            { n: 3, rond: P(-0.27, -0.235), cible: P(W[0] + RJ * Math.cos(-1.2), W[1] + RJ * Math.sin(-1.2)), texte: 'jante sans pneu : grande poulie' },
            { n: 4, rond: P(-1.75, 0.3), cible: P((b3[0][0] + b3[1][0]) / 2, (b3[0][1] + b3[1][1]) / 2), texte: 'courroies en V' },
            { n: 5, rond: P(-1.12, 0.47), cible: P(A[0] + 0.03, A[1] + 0.04), texte: 'arbre de renvoi : deux poulies' },
            { n: 6, rond: P(-1.98, -0.05), cible: P(D[0] - 0.05, D[1] - 0.02), texte: 'dynamo : moteur de tapis roulant' },
          ];
        },
      },

      // ── vu de dessus : ce qui va sur quel arbre, dans quel plan ──
      dessus: {
        titre: 'Vu de dessus',
        dessin: z => {
          const P = repD(z), o = [], XR = XA + XW;
          // fosse de la roue, pleine d'eau de fuite
          o.push(boite(P, -0.65, 1.03, XR, 1.41, EAU));
          o.push(trait(P, [[XR, 1.03], [-0.65, 1.03], [-0.65, 1.41], [XR, 1.41]], h.a.arete));
          // roue : deux disques, augets, axe, palier, plateau
          for (const x of [-0.42, -0.2, 0.05, 0.3]) o.push(h.ligne(...P(x, 1.14), ...P(x, 1.30), h.a.detail));
          for (const d of [1.13, 1.31]) o.push(boite(P, -0.5, d - 0.012, 0.5, d + 0.012, BL));
          o.push(boite(P, -0.015, 1.0, 0.015, 1.72, BLa));
          o.push(boite(P, -0.07, 1.43, 0.07, 1.51, h.a.hachure('metal', 'arete')));
          o.push(boite(P, -0.1, 1.65, 0.1, 1.67, h.a.plein));
          // conduite, au-dessus de la roue
          const axe = [[-0.9, 1.02], [-0.8, 1.12], [-0.6, 1.22], [-0.05, 1.22]];
          const dec = (d) => axe.map((p, i) => {
            const a = axe[Math.max(0, i - 1)], b = axe[Math.min(axe.length - 1, i + 1)];
            const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy);
            return [p[0] - d * dy / l, p[1] + d * dx / l];
          });
          const c1 = dec(0.055), c2 = dec(-0.055);
          o.push(poly(P, [...c1, ...c2.slice().reverse()], h.a.blanc), trait(P, c1, h.a.contour), trait(P, c2, h.a.contour));
          o.push(trait(P, [c1[c1.length - 1], c2[c2.length - 1]], h.a.detail));
          // roue arrière : moyeu entre deux montants, rayons, jante, pignon côté berge
          for (const xe of [W[0] - RJI, W[0] + RJI, W[0] - 0.18, W[0] + 0.18])
            for (const yf of [1.575, 1.645]) o.push(h.chemin([P(xe, 1.61), P(W[0] + (xe < W[0] ? -0.03 : 0.03), yf)], h.a.fin));
          o.push(boite(P, W[0] - 0.006, 1.52, W[0] + 0.006, 1.73, BLa));
          for (const yf of [1.575, 1.645]) o.push(h.ligne(...P(W[0] - 0.03, yf), ...P(W[0] + 0.03, yf), h.a.arete));
          o.push(boite(P, W[0] - RJ, 1.598, W[0] + RJ, 1.622, BLa));
          for (const ym of [1.515, 1.735]) o.push(boite(P, W[0] - 0.024, ym - 0.022, W[0] + 0.024, ym + 0.022, h.a.hachure('bois', 'arete')));
          // arbre de renvoi, deux paliers, deux poulies
          o.push(boite(P, A[0] - 0.012, 1.42, A[0] + 0.012, 1.71, BLa));
          for (const yb of [1.44, 1.69]) o.push(boite(P, A[0] - 0.045, yb - 0.022, A[0] + 0.045, yb + 0.022, h.a.hachure('metal', 'arete')));
          // courroies et chaîne, dans leurs plans
          o.push(h.ligne(...P(A[0], 1.61), ...P(W[0] - RJ, 1.61), h.a.arete));
          o.push(h.ligne(...P(D[0], 1.50), ...P(A[0], 1.50), h.a.arete));
          o.push(h.ligne(...P(W[0], 1.66), ...P(0, 1.66), CHAINE));
          o.push(boite(P, A[0] - RPP, 1.598, A[0] + RPP, 1.622, BL), boite(P, A[0] - RGP, 1.485, A[0] + RGP, 1.515, BL));
          o.push(boite(P, W[0] - RPI, 1.652, W[0] + RPI, 1.668, h.a.plein));
          // dynamo : planche, corps vers le ruisseau, poulie dans le plan de la grande poulie
          o.push(boite(P, D[0] - 0.1, 1.26, D[0] + 0.1, 1.49, h.a.hachure('bois', 'arete')));
          o.push(boite(P, D[0] - 0.055, 1.29, D[0] + 0.055, 1.47, BL));
          o.push(boite(P, D[0] - RDY, 1.488, D[0] + RDY, 1.512, BL));
          return o.join('\n');
        },
        renvois: z => {
          const P = repD(z);
          return [
            { n: 7, rond: P(-0.22, 1.775), cible: P(W[0] + 0.02, 1.74), texte: 'moyeu serré entre deux montants' },
            { n: 8, rond: P(-1.0, 1.775), cible: P(W[0] - 0.03, 1.66), texte: 'roue libre qui patine : la retourner' },
          ];
        },
      },

      // ── la charge de délestage, côté roue ──
      baril: {
        titre: 'La charge de délestage, côté roue',
        dessin: z => {
          const P = cadre(z, ...BAR), o = [];
          const pt = (x, y, r = 2.2) => h.cercle(...P(x, y), r, h.a.plein);
          // baril : eau, parois, planche
          o.push(boite(P, 62, 4, 118, 47, EAU));
          o.push(trait(P, [[60, 60], [60, 2], [120, 2], [120, 60]], h.a.contour));
          o.push(h.ligne(...P(62, 47), ...P(118, 47), h.a.detail));
          o.push(boite(P, 54, 60, 126, 64, h.a.hachure('bois', 'arete')));
          // ampoules : douille dans la planche, au sec ; verre dans l'eau
          const XB = [76, 90, 104];
          for (const x of XB) {
            o.push(h.path(`M${P(x - 4, 50)} L${P(x - 4, 38)} Q${P(x - 4, 32)} ${P(x, 32)} Q${P(x + 4, 32)} ${P(x + 4, 38)} L${P(x + 4, 50)}`, h.a.arete));
            o.push(boite(P, x - 3.5, 50, x + 3.5, 66, BLa));
            o.push(h.ligne(...P(x - 1.5, 38), ...P(x + 1.5, 38), h.a.detail));
          }
          // barres : + en bas (y 69), - en haut (y 74) ; chaque douille aux deux
          o.push(h.ligne(...P(46, 69), ...P(106, 69), h.a.arete), h.ligne(...P(52, 74), ...P(108, 74), h.a.arete));
          for (const x of XB) {
            o.push(h.ligne(...P(x - 1.8, 66), ...P(x - 1.8, 69), h.a.detail), pt(x - 1.8, 69, 1.6));
            o.push(h.ligne(...P(x + 1.8, 66), ...P(x + 1.8, 74), h.a.detail), pt(x + 1.8, 74, 1.6));
          }
          // dynamo : corps, poulie, deux fils
          o.push(boite(P, 2, 78, 30, 100, BL), boite(P, -2, 83, 2, 95, BLa));
          o.push(h.ligne(...P(30, 94), ...P(148, 94), h.a.arete));          // fil +
          o.push(h.ligne(...P(30, 84), ...P(234, 84), h.a.arete));          // fil -
          // prises du délestage, avant la diode et le fusible
          o.push(h.ligne(...P(46, 94), ...P(46, 69), h.a.arete), pt(46, 94));
          o.push(h.ligne(...P(52, 84), ...P(52, 74), h.a.arete), pt(52, 84));
          // le point à contrôler : le délestage pris côté roue, avant la diode et le fusible
          o.push(h.controle(...P(49, 89), 10 * P.s));
          // diode (bague côté batterie), fusible, batterie
          o.push(boite(P, 148, 90, 166, 98, BLa), boite(P, 161, 90, 164, 98, h.a.plein));
          o.push(h.ligne(...P(166, 94), ...P(190, 94), h.a.arete));
          o.push(boite(P, 190, 91, 206, 97, BLa), h.ligne(...P(192, 94), ...P(204, 94), h.a.detail));
          o.push(trait(P, [[206, 94], [270, 94], [270, 70]], h.a.arete));
          o.push(trait(P, [[234, 84], [240, 84], [240, 70]], h.a.arete));
          o.push(boite(P, 226, 26, 284, 66, BL));
          for (const x of [240, 270]) o.push(boite(P, x - 4, 66, x + 4, 70, BLa));
          for (const x of [248, 255, 262]) o.push(h.cercle(...P(x, 60), 2.2, h.a.detail));
          // bornes : − à gauche (fil négatif), + à droite (fil positif)
          o.push(h.ligne(...P(236, 58), ...P(244, 58), h.a.arete));
          o.push(h.ligne(...P(266, 58), ...P(274, 58), h.a.arete), h.ligne(...P(270, 54), ...P(270, 62), h.a.arete));
          return o.join('\n');
        },
        renvois: z => {
          const P = cadre(z, ...BAR);
          return [
            { n: 9, rond: P(140, 30), cible: P(104, 36), texte: 'ampoules de phare, verre dans l’eau' },
            { n: 10, rond: P(70, 101), cible: P(46, 94), texte: 'branchée côté roue, avant la diode' },
            { n: 11, rond: P(157, 74), cible: P(155, 90), texte: 'diode dans le fil positif' },
            { n: 12, rond: P(214, 76), cible: P(198, 91), texte: 'fusible' },
          ];
        },
      },
    },
    danger: 'Une roue à eau ne se débranche pas : sans charge, la dynamo s’emballe, sa tension grimpe, et la roue et les roulements prennent une vitesse qu’aucune pièce ne tient. Une ampoule éteinte, c’est une charge en moins : on la change le jour même.',
  };
};
