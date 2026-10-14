// Planche 99-04 — La sonde du fenil (ch. 99, étape 61, §6, §8).
// Ce que le chapitre donne : une tige de fer de 2,4 à 3 m, enfoncée au cœur du tas, laissée environ
// 20 minutes, retirée, touchée d'abord du dos de la main, brièvement, avant d'être empoignée ; on
// marche sur le tas sur des planches, parce qu'un foin brûlé en dedans laisse une cavité sous une
// croûte qui cède ; le tas monté sur un lit de pierres qui laisse passer l'air (étape 60).
// Aucune autre mesure : le tas, la planche et le diamètre de la tige ne sont pas cotés.
// 13 oct. : l'homme est le corps simple (pose « sonde »). Rouge : le geste d'enfoncer, la zone de la
// croûte qui cède. 14 oct. : les deux vues du bas passent aux mains simples (mains/moteur.js), la même
// main droite : détendue (relachee, de profil), le dos contre la tige, puis le poing (prise-manche vue
// côté paume) ; toucher-retirer devient la flèche rouge du geste.
module.exports = (h) => {
  const A = h.a, F = h.formes;

  // Catmull-Rom → cubiques : une courbe qui passe par chaque point
  const lisse = (pts, ferme = false) => {
    const P = ferme ? [pts[pts.length - 1], ...pts, pts[0], pts[1]] : [pts[0], ...pts, pts[pts.length - 1]];
    let d = `M${P[1][0].toFixed(1)} ${P[1][1].toFixed(1)}`;
    for (let i = 1; i < P.length - 2; i++) {
      const [p0, p1, p2, p3] = [P[i - 1], P[i], P[i + 1], P[i + 2]];
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C${c1.map(v => v.toFixed(1)).join(' ')} ${c2.map(v => v.toFixed(1)).join(' ')} ${p2.map(v => v.toFixed(1)).join(' ')}`;
    }
    return d + (ferme ? ' Z' : '');
  };

  // La géométrie de la coupe, partagée avec la vue de la tige (même rangée, même échelle).
  // Hauteurs en mètres : lit de pierres 0,25 ; tas 2,5 ; personnage 1,75 ; tige 2,7 (entre 2,4 et 3).
  const geo = z => {
    const s = (z.h - 26) / 4.62;              // px par mètre
    const yg = z.h - 12;                      // le sol
    const yb = yg - 0.25 * s;                 // le dessous du tas, sur les pierres
    const yt = yb - 2.5 * s;                  // le dessus du tas
    const ypl = yt - 5;                       // le dessus de la planche
    const ycoeur = yb - 1.25 * s;             // le cœur
    const ysom = ycoeur - 2.7 * s;            // le haut de la tige
    return { s, yg, yb, yt, ypl, ycoeur, ysom };
  };

  // Les mains simples (mains/moteur.js) des deux vues du bas, à une même échelle (0,716 par mm : la main de
  // l'essai validé, 136 de long). poser : l'angle qui met l'axe de la prise sur `axe` (degrés à l'écran)
  // et l'avant-bras du côté de `vers`.
  const EM = 136 / 190;
  const poser = (o, axe, vers) => {
    const base = Object.assign({}, o, { angle: 0, avantbras: { longueur: 100 } }); delete base.objet;
    const e0 = F.mainSimple(base); let best = null;
    for (const k of [0, 180]) {
      const a = axe - e0.prise.angle + k, m = F.mainSimple(Object.assign({}, base, { angle: a }));
      const d = [m.coude[0] - m.poignet[0], m.coude[1] - m.poignet[1]], v = [vers[0] - m.poignet[0], vers[1] - m.poignet[1]];
      const c = (d[0] * v[0] + d[1] * v[1]) / ((Math.hypot(d[0], d[1]) * Math.hypot(v[0], v[1])) || 1);
      if (!best || c > best.c) best = { a, c };
    }
    return best.a;
  };
  // le dos de la main contre la tige : la main détendue (relachee), de profil côté pouce, les doigts en
  // haut, repliés en cascade vers soi ; le dos de la main, droit, posé contre la tige
  const mainDos = (z, xL, yh) => {
    const o = { x: xL - 40, y: yh + 60, ancre: 'poignet', pose: 'relachee', vue: 'pouce', cote: 'droite', echelle: EM, angle: -90,
      avantbras: { vers: [xL - 40, z.h + 400], bord: { x0: 0, y0: 0, x1: z.l, y1: z.h }, longueur: 'bord' } };
    const m0 = F.mainSimple(o);
    const a = m0.articulations['majeur.mcp'];
    return F.mainSimple({ ...o, x: o.x + (xL - 0.6 - m0.boite.x1), y: o.y + (yh - a[1]) });
  };

  const TIGE = 4;                             // largeur dessinée de la tige dans la coupe
  // les bras du corps simple, calculés pour des poings à 1,15 et 1,30 m au-dessus de la planche, à
  // 0,70 m devant les chevilles, l'axe de la prise vertical (la tige)
  const BRAS = { brasP: 26.8, avantbrasP: 97.6, mainP: 90, brasL: 36.9, avantbrasL: 126.9, mainL: 90 };

  return {
    ref: '99-04',
    titre: 'La sonde du fenil',
    desc: 'Encadré danger : que faire quand la tige est trop chaude pour la main. Coupe d’un tas de foin sur son lit de pierres : debout sur une planche posée en travers du dessus, par-dessus une cavité brûlée (la croûte qui cède, en tireté rouge), un homme enfonce une tige de fer jusqu’au cœur du tas (flèche rouge). À côté, la tige seule, cotée. En bas, la tige retirée, touchée d’abord du dos de la main, puis empoignée.',
    format: 'pleine',
    disposition: [['coupe', 'tige'], ['dos', 'prise']],
    hauteurs: [2, 1],
    largeurs: [[4.2, 1], [1, 1]],
    vues: {
      coupe: {
        titre: 'Enfoncer au cœur du tas, attendre environ 20 minutes',
        dessin: z => {
          const g = geo(z), s = g.s, xc = z.l * 0.56;
          const X = m => xc + m * s, Yh = m => g.yb - m * s;     // m au-dessus du dessous du tas
          const out = [];
          // le sol
          out.push(h.rect(4, g.yg, z.l - 8, 8, A.hachure('terre', 'aucun')));
          out.push(h.ligne(4, g.yg, z.l - 4, g.yg, A.contour));
          // le lit de pierres, des vides entre elles
          const pierres = [];
          for (let i = 0, x = -2.2; x < 2.2; i++) {
            const rx = [0.17, 0.13, 0.19, 0.15, 0.12, 0.18][i % 6], ry = [0.11, 0.1, 0.12, 0.1, 0.09, 0.115][i % 6];
            pierres.push(h.ellipse(X(x + rx), g.yg - ry * s + 0.5, rx * s, ry * s, A.hachure('pierre')));
            x += 2 * rx + 0.05;
          }
          out.push(...pierres);
          // le tas, en coupe : paille
          const tas = [[-2.1, 0.02], [-2.26, 0.7], [-2.2, 1.55], [-1.95, 2.18], [-1.62, 2.46], [-1.1, 2.5], [0, 2.5], [1.1, 2.5],
            [1.62, 2.46], [1.95, 2.18], [2.2, 1.55], [2.26, 0.7], [2.1, 0.02]].map(([x, y]) => [X(x), Yh(y)]);
          const dTas = lisse(tas) + ` L${X(-2.1).toFixed(1)} ${Yh(0.02).toFixed(1)} Z`;
          out.push(h.path(dTas, A.hachure('paille', 'contour')));
          // la cavité brûlée, sous une croûte intacte, sous la planche
          const cav = [[-1.16, 2.33], [-0.95, 2.4], [-0.72, 2.37], [-0.55, 2.24], [-0.5, 2.0], [-0.62, 1.84], [-0.85, 1.8], [-1.08, 1.86], [-1.2, 2.05]]
            .map(([x, y]) => [X(x), Yh(y)]);
          out.push(h.path(lisse(cav, true), A.blanc));
          out.push(h.path(lisse(cav, true), A.contour));
          // le bord charbonné : un liseré noir dans le fond de la cavité
          const fond = [[-1.2, 2.05], [-1.08, 1.86], [-0.85, 1.8], [-0.62, 1.84], [-0.5, 2.0]].map(([x, y]) => [X(x), Yh(y)]);
          const fondIn = [[-1.13, 2.06], [-1.03, 1.9], [-0.85, 1.85], [-0.65, 1.88], [-0.56, 2.0]].map(([x, y]) => [X(x), Yh(y)]).reverse();
          out.push(h.path(lisse(fond) + ' L' + fondIn[0].map(v => v.toFixed(1)).join(' ') + ' ' + lisse(fondIn).replace(/^M[^C]*/, ''), A.plein));
          // la planche, posée en travers du dessus, par-dessus la cavité
          const x1 = X(-1.5), x2 = X(-0.07);
          out.push(h.rect(x1, g.ypl, x2 - x1, g.yt - g.ypl, A.hachure('bois', 'contour')));
          // la zone qui cède : la croûte au-dessus de la cavité, où l'on ne marche que sur la planche
          out.push(h.path(lisse([[-1.36, 2.5], [-1.34, 2.1], [-1.2, 1.72], [-0.85, 1.66], [-0.5, 1.72], [-0.36, 2.0], [-0.33, 2.5]].map(([x, y]) => [X(x), Yh(y)])), A.zone));
          // la tige, du haut au cœur du tas
          const tige = [h.rect(xc - TIGE / 2, g.ysom, TIGE, g.ycoeur - g.ysom, A.blanc),
            h.rect(xc - TIGE / 2, g.ysom, TIGE, g.ycoeur - g.ysom, A.arete)].join('\n');
          // l'homme debout sur la planche, penché sur la tige : le corps simple (pose « sonde »), les
          // bras recalculés pour que les deux poings se ferment l'un au-dessus de l'autre sur la tige ;
          // la tige passe devant le poing loin et dans le poing proche
          out.push(String(F.corps({ x: xc - 0.7 * s, y: g.ypl, pose: 'sonde', echelle: s / 1000, angles: BRAS, objetP: tige })));
          // le geste : enfoncer
          out.push(h.geste(`M${xc + 14} ${g.ypl - 1.3 * s} L${xc + 14} ${g.ypl - 0.62 * s}`));
          return out.join('\n');
        },
        renvois: z => {
          const g = geo(z), s = g.s, xc = z.l * 0.56;
          const X = m => xc + m * s, Yh = m => g.yb - m * s;
          return [
            { n: 1, rond: [X(0.75), g.ypl - 1.55 * s], cible: [xc + 2, g.ypl - 1.38 * s] },
            { n: 2, rond: [X(1.2), Yh(1.25)], cible: [xc + 2, g.ycoeur - 2] },
            { n: 3, rond: [X(-1.95), g.ypl - 0.5 * s], cible: [X(-1.3), g.ypl + 1] },
            { n: 4, rond: [X(-2.25), Yh(1.9)], cible: [X(-1.05), Yh(1.95)] },
            { n: 5, rond: [X(-2.55), Yh(0.35)], cible: [X(-2.0), g.yg - 0.1 * s] },
          ].map((r, i) => ({ ...r, texte: [
            'tige de fer',
            'le bout, au cœur du tas',
            'planche pour marcher dessus',
            'cavité brûlée, croûte qui cède',
            'lit de pierres, l’air passe',
          ][i] }));
        },
      },
      tige: {
        titre: 'La tige',
        dessin: z => {
          const g = geo(z), x = 18;
          return [
            h.rect(x - TIGE / 2, g.ysom, TIGE, g.ycoeur - g.ysom, A.arete),
            h.cote(x + 16, g.ysom, x + 16, g.ycoeur, '2 400 à 3 000 mm'),
          ].join('\n');
        },
      },
      dos: {
        titre: 'Retirée : d’abord le dos de la main',
        // La main à plat, de profil, tournée doigts en haut : le dos de la main (les jointures) vient
        // contre la tige.
        dessin: z => {
          const xr = z.l * 0.58, yh = z.h * 0.58, D = 20, xL = xr - D / 2;
          const bas = z.h - 18;
          return [
            h.path(`M${xr - D / 2} 2 L${xr - D / 2} ${bas - 3} Q${xr - D / 2} ${bas} ${xr - D / 2 + 3} ${bas} L${xr + D / 2 - 3} ${bas} Q${xr + D / 2} ${bas} ${xr + D / 2} ${bas - 3} L${xr + D / 2} 2`, A.hachure('metal', 'contour')),
            mainDos(z, xL, yh - 12).svg,
            // toucher, retirer : perpendiculaire à la tige (le geste, charte : le rouge)
            h.geste(`M${xL - 100} ${yh + 14} L${xL - 62} ${yh + 14}`, { double: true }),
          ].join('\n');
        },
        renvois: z => {
          const xr = z.l * 0.58, yh = z.h * 0.58;
          return [
            { n: 6, rond: [xr + 70, z.h * 0.7], cible: [xr - 11, yh - 12], texte: 'dos de la main, brièvement' },
          ];
        },
      },
      prise: {
        titre: 'Puis l’empoigner',
        dessin: z => {
          const xr = z.l * 0.58, yh = z.h * 0.46, D = 20;
          const bas = z.h - 18;
          const tige = h.path(`M${xr - D / 2} 2 L${xr - D / 2} ${bas - 3} Q${xr - D / 2} ${bas} ${xr - D / 2 + 3} ${bas} L${xr + D / 2 - 3} ${bas} Q${xr + D / 2} ${bas} ${xr + D / 2} ${bas - 3} L${xr + D / 2} 2`, A.hachure('metal', 'contour'));
          // le poing (prise-manche vue côté paume) fermé sur la tige : elle entre par le haut du poing et
          // ressort par le bas, derrière les doigts ; l'avant-bras sort à gauche
          const o = { x: xr, y: yh, pose: 'prise-manche', vue: 'paume', cote: 'droite', echelle: EM, diametre: D / EM };
          const vers = [-60, yh + 6];
          return F.mainSimple({ ...o, angle: poser(o, 90, vers), objet: tige, avantbras: { vers, bord: { x0: 0, y0: 0, x1: z.l, y1: z.h }, longueur: 'bord' } }).svg;
        },
        renvois: z => {
          const xr = z.l * 0.58, yh = z.h * 0.46;
          return [
            { n: 7, rond: [z.l - 22, z.h * 0.16], cible: [xr + 14, yh - 30], texte: 'supportable : rien à faire' },
          ];
        },
      },
    },
    danger: 'Trop chaude pour la main, la tige dit qu’il faut agir, pas de combien le tas est chaud : on le traite comme le pire cas. L’eau prête, une deuxième personne, des planches sur le tas avant la première fourchée, et chaque fourchée sort dehors et se noie.',
  };
};
