// Planche 38-04 — Prendre le pouls au poignet.
// Chapitre 38, section H, point 45 : « Le pouls se prend au poignet, sous la base du pouce, avec
// l'index et le majeur posés à plat, compté 15 secondes et multiplié par 4. Il ne vaut qu'au repos,
// assis depuis une dizaine de minutes. » Le même geste sert aux ch. 26 et 35 : la planche ne porte
// pas le seuil de 100 du ch. 38, seulement le geste.
// Aucune cote : c'est un geste, rien ne se construit.
//
// Les deux mains viennent de la bibliothèque de mains simples (mains/moteur.js) :
//   · la main qu'on mesure est une main gauche ouverte, vue côté paume (paume en haut), doigts vers la
//     droite, pouce en haut, avec 100 mm d'avant-bras coupé net ;
//   · la main qui mesure est une main droite vue du dos (pose deux-doigts), arrivée d'en bas à droite :
//     l'index et le majeur tendus côte à côte en travers du poignet, leurs pulpes sur le pouls ;
//     l'annulaire et l'auriculaire repliés ; le pouce libre, écarté. Son avant-bras sort par le bas.
// Le pouls : 14 mm avant le pli du poignet, 15 mm côté pouce de l'axe de l'avant-bras (repère de la
// main mesurée, en mm d'adulte).
module.exports = (h) => {
  const A = h.a, F = h.formes;
  const S = 1.55;                           // px par mm, le même dans les deux vues
  const uni = a => { const l = Math.hypot(a[0], a[1]) || 1; return [a[0] / l, a[1] / l]; };
  const r1 = v => Math.round(v * 10) / 10;
  const X0 = z => z.l / 2 + 42 * S;         // les jointures de la main mesurée (les pastilles y sont repérées)
  const pt = (z, y0, p) => [r1(X0(z) + p[0] * S), r1(y0 + p[1] * S)];
  const Y1 = z => z.h / 2 + 19 * S, Y2 = z => z.h / 2 - 54 * S;
  const BORD = z => ({ x0: 0, y0: 0, x1: z.l, y1: z.h });

  // la main mesurée : main gauche ouverte, paume en haut, le pli du poignet à 92 mm des jointures
  const mesuree = (z, y0) => {
    const m = F.mainSimple({ x: X0(z) - 92 * S, y: y0, ancre: 'poignet', pose: 'ouverte', vue: 'paume', cote: 'gauche', echelle: S, angle: 0,
      avantbras: { longueur: 100 } });
    const W = m.poignet, u = uni([m.articulations['majeur.mcp'][0] - W[0], m.articulations['majeur.mcp'][1] - W[1]]);
    const c = m.articulations['pouce.cmc'], rad = (c[0] - W[0]) * -u[1] + (c[1] - W[1]) * u[0] > 0 ? [-u[1], u[0]] : [u[1], -u[0]];
    const sur = (le, tr) => [r1(W[0] + u[0] * le * S + rad[0] * tr * S), r1(W[1] + u[1] * le * S + rad[1] * tr * S)];
    return { m, u, rad, sur, pouls: sur(-14, 15) };
  };
  // la main qui mesure : main droite, deux doigts ; le bout des deux doigts 6 mm côté pouce du pouls, pour que
  // les pulpes (juste avant le bout) soient dessus
  const mesurant = (z, y0) => {
    const M = mesuree(z, y0), P = M.sur(-14, 21);
    const o = { x: P[0], y: P[1], ancre: 'bout', pose: 'deux-doigts', vue: 'dos', cote: 'droite', echelle: S, angle: -100, rotation: [0, 20, 0],
      avantbras: { vers: [P[0] + 150, z.h + 400], bord: BORD(z), longueur: 'bord' } };
    const m0 = F.mainSimple(o);
    const bI = m0.doigts.index, bM = m0.doigts.majeur, mil = [(bI[0] + bM[0]) / 2, (bI[1] + bM[1]) / 2];
    return F.mainSimple({ ...o, x: P[0] + (m0.bout[0] - mil[0]), y: P[1] + (m0.bout[1] - mil[1]) });
  };

  return {
    ref: '38-04',
    titre: 'Prendre le pouls au poignet',
    desc: 'Deux vues de dessus, à la même échelle, d’un avant-bras gauche posé paume en haut, la main à droite et le pouce en haut. '
      + 'En haut, le poignet seul : un cercle rouge marque l’endroit du pouls, sur le poignet, sous la base du pouce, juste avant le pli du poignet. '
      + 'En bas, la main droite de celui qui prend le pouls arrive d’en bas : l’index et le majeur, tendus côte à côte, '
      + 'passent en travers du poignet et se posent à plat sur cet endroit ; l’annulaire et l’auriculaire sont repliés, le pouce reste libre. '
      + 'On compte les battements 15 secondes, puis on multiplie par 4.',
    format: 'pleine',
    disposition: [['ou'], ['doigts']],
    hauteurs: [1, 2],
    vues: {
      ou: {
        titre: 'Au repos, assis depuis une dizaine de minutes',
        dessin: z => { const M = mesuree(z, Y1(z)); return [M.m.svg, h.controle(M.pouls[0], M.pouls[1], 9 * S)].join('\n'); },
        renvois: z => {
          const M = mesuree(z, Y1(z));
          return [
            { n: 1, rond: pt(z, Y1(z), [-178, -52]), cible: M.sur(-70, -2), texte: 'l’avant-bras posé, paume en haut' },
            { n: 2, rond: pt(z, Y1(z), [-128, -60]), cible: [M.pouls[0] - 4, M.pouls[1] - 6], texte: 'le pouls, sous la base du pouce' },
          ];
        },
      },
      doigts: {
        titre: 'Deux doigts à plat, compter 15 secondes, multiplier par 4',
        dessin: z => [mesuree(z, Y2(z)).m.svg, mesurant(z, Y2(z)).svg].join('\n'),
        renvois: z => {
          const m = mesurant(z, Y2(z)), a = m.articulations['index.ipp'], b = m.articulations['majeur.ipp'];
          return [
            { n: 3, rond: pt(z, Y2(z), [-165, -52]), cible: [r1((a[0] + b[0]) / 2), r1((a[1] + b[1]) / 2)], texte: 'l’index et le majeur, à plat' },
          ];
        },
      },
    },
  };
};
