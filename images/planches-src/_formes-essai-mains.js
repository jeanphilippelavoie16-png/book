// Feuille d'essai 1/3 — les mains de la bibliothèque h.formes (formes.js).
// Pas une planche du livre : elle sert à juger les formes en grand avant de s'en servir.
module.exports = (h) => {
  const A = h.a, F = h.formes;
  const manche = (m, haut, bas, l) => {
    // un manche droit dans l'axe du trou, dessiné avant la main
    const [ax, ay] = m.trou.axe, r = m.trou.r;
    const p = (s, t) => [m.trou.x + ax * s - ay * t, m.trou.y + ay * s + ax * t];
    return h.chemin([p(haut, -r), p(-bas, -r), p(-bas, r), p(haut, r)], A.hachure('bois', 'contour'), true);
  };
  const vue = (titre, f) => ({ titre, dessin: z => f(z) });
  return {
    ref: 'essai-1',
    titre: 'Les mains de la bibliothèque de formes',
    desc: 'Feuille d’essai : chaque pose de main, en grand, avec l’objet qu’elle tient.',
    fichier: '_formes-essai-mains.svg',
    format: 'pleine',
    disposition: [['a', 'b'], ['c', 'd'], ['e', 'f'], ['g', 'i']],
    vues: {
      a: vue('La prise, de profil : le manche vu par le bout', z => {
        const x = z.l * 0.62, y = z.h * 0.52;
        const m = F.main({ x, y, pose: 'prise', vue: 'profil', diametre: 34, bras: 40 });
        return [m, h.cercle(x, y, m.trou.r, A.hachure('bois', 'contour'))].join('\n');   // le bout du manche vient vers l'œil : après la main
      }),
      b: vue('La prise, du dos de la main', z => {
        const x = z.l * 0.62, y = z.h * 0.5;
        const m = F.main({ x, y, pose: 'prise', vue: 'dos', diametre: 32, bras: 40 });
        return [manche(m, y - 4, z.h - y - 4), m].join('\n');
      }),
      c: vue('La prise, côté paume', z => {
        const x = z.l * 0.62, y = z.h * 0.5;
        const m = F.main({ x, y, pose: 'prise', vue: 'paume', diametre: 32, bras: 40 });
        return [manche(m, y - 4, z.h - y - 4), m].join('\n');
      }),
      d: vue('La pince, de profil', z => {
        const x = z.l * 0.72, y = z.h * 0.55;
        const aiguille = h.chemin([[x - 70, y + 34], [x + 34, y - 17]], A.contour);
        return F.main({ x, y, pose: 'pince', vue: 'profil', bras: 40, objet: aiguille }).toString();
      }),
      e: vue('La boule, de profil', z => {
        const x = z.l * 0.6, y = z.h * 0.55;
        const m = F.main({ x, y, pose: 'boule', vue: 'profil', diametre: 64, bras: 40 });
        return [h.cercle(x, y, m.trou.r, A.hachure('pierre', 'contour')), m].join('\n');
      }),
      f: vue('La paume qui appuie, de profil', z => {
        const x = z.l * 0.5, y = z.h * 0.8;
        const m = F.main({ x, y, pose: 'appui', vue: 'profil', bras: 50 });
        return [h.rect(10, y, z.l - 20, 14, A.hachure('bois', 'contour')), m].join('\n');
      }),
      g: vue('La paume à plat, vue du dos', z => {
        const x = z.l * 0.55, y = z.h * 0.52;
        return F.main({ x, y, pose: 'appui', vue: 'dos', bras: 40 }).toString();
      }),
      i: vue('Main gauche : la prise en miroir, tournée', z => {
        const x = z.l * 0.44, y = z.h * 0.64;
        const m = F.main({ x, y, pose: 'prise', vue: 'dos', cote: 'gauche', angle: -60, diametre: 30, bras: 20, echelle: 0.85 });
        return [manche(m, 80, 80), m].join('\n');
      }),
    },
  };
};
