// Planche 99-04 — La sonde du fenil (ch. 99, étape 61, §6, §8).
// Ce que le chapitre donne : une tige de fer de 2,4 à 3 m, enfoncée au cœur du tas, laissée environ
// 20 minutes, retirée, touchée d'abord du dos de la main, brièvement, avant d'être empoignée ; on
// marche sur le tas sur des planches, parce qu'un foin brûlé en dedans laisse une cavité sous une
// croûte qui cède ; le tas monté sur un lit de pierres qui laisse passer l'air (étape 60).
// Aucune autre mesure : le tas, la planche et le diamètre de la tige ne sont pas cotés.
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

  const TIGE = 4;                             // largeur dessinée de la tige dans la coupe

  return {
    ref: '99-04',
    titre: 'La sonde du fenil',
    desc: 'Encadré danger : que faire quand la tige est trop chaude pour la main. Coupe d’un tas de foin sur son lit de pierres : debout sur une planche posée en travers du dessus, par-dessus une cavité brûlée, un homme enfonce une tige de fer jusqu’au cœur du tas. À côté, la tige seule, cotée. En bas, la tige retirée, touchée d’abord du dos de la main, puis empoignée.',
    format: 'pleine',
    disposition: [['coupe', 'tige'], ['dos', 'prise']],
    hauteurs: [1.8, 1],
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
          // la tige, du haut au cœur du tas
          out.push(h.rect(xc - TIGE / 2, g.ysom, TIGE, g.ycoeur - g.ysom, A.blanc));
          out.push(h.rect(xc - TIGE / 2, g.ysom, TIGE, g.ycoeur - g.ysom, A.arete));
          // l'homme debout sur la planche, les deux mains refermées sur la tige (les poignets juste
          // avant elle : la main passe devant et la cache là où elle la tient)
          out.push(F.personnage({ x: X(-0.42), y: g.ypl, pose: 'debout', echelle: s / 1000, penche: 22, regard: 30,
            mains: { proche: [xc - TIGE / 2 - 9, g.ypl - 0.95 * s], loin: [xc - TIGE / 2 - 9, g.ypl - 1.16 * s] } }));
          // les poings : un ovale fermé autour de la tige, sans doigts
          for (const yp of [g.ypl - 0.95 * s, g.ypl - 1.16 * s]) {
            out.push(h.ellipse(xc - 0.5, yp, 4.5, 6, A.blanc));
            out.push(h.ellipse(xc - 0.5, yp, 4.5, 6, A.arete));
          }
          // le geste : enfoncer
          out.push(h.fleche(`M${xc + 14} ${g.ypl - 1.3 * s} L${xc + 14} ${g.ypl - 0.62 * s}`, A.contour));
          return out.join('\n');
        },
        renvois: z => {
          const g = geo(z), s = g.s, xc = z.l * 0.56;
          const X = m => xc + m * s, Yh = m => g.yb - m * s;
          return [
            { n: 1, rond: [X(0.75), g.ypl - 1.45 * s], cible: [xc + 2, g.ypl - 1.05 * s] },
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
        // La main vue par la tranche, côté petit doigt : le dos (à droite) touche la tige aux
        // jointures, les doigts allongés et joints, le pouce replié le long de l'index (derrière).
        dessin: z => {
          const xr = z.l * 0.58, yh = z.h * 0.46, D = 20, xL = xr - D / 2;
          const bas = z.h - 18;
          const k = 0.72, P = pts => pts.map(([x, y]) => [xL + k * x, yh + k * y]);
          const main = P([[-56, 124], [-46, 92], [-30, 62], [-12, 30], [-1, 2], [-3, -30], [-9, -62], [-14, -84],
            [-22, -90], [-30, -84], [-30, -50], [-34, -14], [-46, 22], [-62, 58], [-84, 104], [-92, 124]]);
          const dMain = lisse(main) + ' Z';
          const pouce = P([[-50, 40], [-40, 10], [-32, -16], [-30, -34]]);
          const ongle = P([[-24, -86], [-28, -76]]);
          const pli = P([[-33, -22], [-25, -16]]);
          return [
            h.path(`M${xr - D / 2} 2 L${xr - D / 2} ${bas - 3} Q${xr - D / 2} ${bas} ${xr - D / 2 + 3} ${bas} L${xr + D / 2 - 3} ${bas} Q${xr + D / 2} ${bas} ${xr + D / 2} ${bas - 3} L${xr + D / 2} 2`, A.hachure('metal', 'contour')),
            h.path(dMain, A.blanc), h.path(lisse(main), A.contour),
            h.path(lisse(pouce), A.detail), h.path(lisse(pli), A.detail),
            // toucher, retirer : perpendiculaire à la tige
            h.fleche(`M${xL - 64} ${yh - 36} L${xL - 38} ${yh - 36}`, A.arete),
            h.fleche(`M${xL - 42} ${yh - 22} L${xL - 68} ${yh - 22}`, A.arete),
          ].join('\n');
        },
        renvois: z => {
          const xr = z.l * 0.58, yh = z.h * 0.46;
          return [
            { n: 6, rond: [xr + 70, z.h * 0.7], cible: [xr - 10, yh + 2], texte: 'dos de la main, brièvement' },
          ];
        },
      },
      prise: {
        titre: 'Puis l’empoigner',
        dessin: z => {
          const xr = z.l * 0.58, yh = z.h * 0.46, D = 20;
          const bas = z.h - 18;
          const tige = h.path(`M${xr - D / 2} 2 L${xr - D / 2} ${bas - 3} Q${xr - D / 2} ${bas} ${xr - D / 2 + 3} ${bas} L${xr + D / 2 - 3} ${bas} Q${xr + D / 2} ${bas} ${xr + D / 2} ${bas - 3} L${xr + D / 2} 2`, A.hachure('metal', 'contour'));
          return [tige, F.main({ x: xr, y: yh, pose: 'prise', vue: 'paume', diametre: D, bras: 44 })].join('\n');
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
