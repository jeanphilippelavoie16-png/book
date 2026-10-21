// Feuille d'essai : le chou tranché en tas au fond de la cuve (planche 80-41, vue « En place, sur la cuve »).
// Le second regard du 19 octobre : le tas de 200 lanières à double trait, tordues en S et emmêlées, se lisait comme une
// touffe de poil ou des nouilles. Photo de référence : images/photos/tri/80-choucroute-jour0-salage.jpg (le chou cru
// tranché dans le bac, au salage) : des lanières fines et plates, courtes, en arc doux, jamais en S, couchées les unes
// sur les autres ; tassé, le dessus est presque plat.
//
// Cinq façons, chacune dans la cuve à la taille de la planche, puis à la loupe (× 2) :
//   A  rubans en arc simple, 22 à 38 de long, en rangs tous les 5 ;
//   B  un seul trait fin par lanière, en arc simple, rangs tous les 3,6 (la texture de la 80-40, couchée à plat) ;
//   C  rubans plus longs (30 à 50), plus plats, rangs tous les 4,2 ;
//   D  la façon A, plus variée : rubans de 18 à 34, l'arc plus marqué, un peu plus de pente ;
//   E  la façon D, les lanières d'un même rang un peu moins serrées (un peu de jour entre elles) ;
//   R  la façon retenue : A, l'arc un peu plus marqué (les réglages par défaut du module).
// Ce qu'on a vu à la taille d'impression et de près : A se lit en lanières plates couchées les unes sur les autres, le
// dessus tassé ; B se lit en vagues (de l'eau, du fil du bois) ; C en lattes ; D, plus déchiqueté, devient chargé à la
// taille d'impression ; E fait des écailles à la loupe. Retenue : A, avec un peu plus d'arc pour garder la lanière de chou.
// Le module _chou-tranche.js est le même code que la planche 80-41 pose.
// Le rendu se fait dans le scratchpad, pas dans images/ : le composeur sert seulement à mettre les vues en page.
module.exports = (h) => {
  const A = h.a;
  const r1 = v => Math.round(v * 10) / 10;
  const poly = pts => 'M' + pts.map(p => `${r1(p[0])} ${r1(p[1])}`).join(' L') + ' Z';
  const tas = require('./_chou-tranche.js')(h);
  const FACONS = {
    A: { mode: 'ruban', bombe: [1.6, 4.2], inclin: 0.1 },
    B: { mode: 'ligne', l0: 20, l1: 36, pas: 3.6, bombe: [1.4, 3.6] },
    C: { mode: 'ruban', l0: 30, l1: 50, pas: 4.2, bombe: [1.2, 3.2], w0: 2, w1: 2.6 },
    D: { mode: 'ruban', l0: 18, l1: 34, pas: 4.6, bombe: [2, 5], inclin: 0.16, w0: 2, w1: 2.6 },
    E: { mode: 'ruban', l0: 18, l1: 34, pas: 4.8, bombe: [2, 5], inclin: 0.16, w0: 2, w1: 2.6, recouvre: [0.78, 1.04] },
    R: { mode: 'ruban' },
  };
  // la cuve de la planche, au même gabarit (R = 90, paroi de 8, tas de 56)
  const cuve = (cx, yb, lettre, suffixe) => {
    const R = 90, e = 8, Hc = 84, yr = yb - Hc, xi0 = cx - R + e, xi1 = cx + R - e;
    return [
      h.rect(xi0, yr, xi1 - xi0, Hc - e, A.loin),
      tas({ x0: xi0, x1: xi1, yHaut: yb - e - 56, yBas: yb - e, id: `essai-chou-${lettre}-${suffixe}`, ...FACONS[lettre] }),
      h.path(poly([[cx - R, yr], [cx - R, yb], [cx + R, yb], [cx + R, yr], [cx + R - e, yr], [cx + R - e, yb - e], [cx - R + e, yb - e], [cx - R + e, yr]]), A.hachure('bois', 'contour')),
    ].join('\n');
  };
  const vues = {}, disposition = [];
  for (const lettre of Object.keys(FACONS)) {
    vues[`cuve${lettre}`] = { titre: lettre === 'R' ? 'Retenue : A, l’arc un peu plus marqué' : `${lettre}, dans la cuve`, dessin: z => cuve(z.l / 2, z.h - 4, lettre, 'cuve') };
    vues[`loupe${lettre}`] = {
      titre: lettre === 'R' ? 'Retenue, à la loupe' : `${lettre}, à la loupe`,
      dessin: z => `<clipPath id="loupe-chou-${lettre}"><rect x="0" y="0" width="${z.l}" height="${z.h}"/></clipPath><g clip-path="url(#loupe-chou-${lettre})"><g transform="translate(${r1(z.l / 2)} ${r1(z.h - 4)}) scale(2) translate(-40 10)">${cuve(0, 4, lettre, 'loupe')}</g></g>`,
    };
    disposition.push([`cuve${lettre}`, `loupe${lettre}`]);
  }
  return {
    ref: '80-41',
    fichier: '_essai-chou-tranche.svg',
    titre: 'Essai, le chou tranché',
    desc: 'Cinq façons de dessiner le chou tranché en tas au fond de la cuve (rubans en arc simple, traits fins en arc simple, rubans plus longs et plus plats, rubans plus courts et plus courbes, serrés ou avec du jour), puis la façon retenue. Chacune à la taille de la planche 80-41, puis à la loupe.',
    format: 'pleine',
    disposition,
    largeurs: disposition.map(() => [0.75, 1.25]),
    vues,
  };
};
