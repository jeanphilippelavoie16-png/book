// Feuille d'essai : le bois au trait (planche 13-40, vue « Trier en quatre tas », et le tas 18 de « Glisser le nid sous
// le tipi »). JP, 19 octobre 2026 : « le bois pas beau, refais ça » ; le défaut : des tubes identiques, de même longueur,
// empilés en nid d'abeille et vus par le bout, comme des crayons.
//
// Le bois, en vrai : une branche a une écorce au trait irrégulier, des nœuds (la cicatrice d'une branche tombée), des
// rameaux coupés qui partent en biais vers le bout, des bouts coupés en biais au couteau ou cassés en pointe ; une
// bûche sciée montre au bout ses cernes autour d'un cœur décentré (le bois pousse plus d'un côté), une fente de séchage
// large à l'écorce et fine vers le cœur, l'écorce en anneau ; un quartier fendu a deux faces nettes, avec le fil du bois
// dans le sens de la bûche ; le bouleau a ses lenticelles en travers. Les pièces d'un tas varient de grosseur, de
// longueur et d'angle. La forme du bout et des quartiers suit la corde du tome 2 (images/tomes/essais-ia/tome-2/
// objets-bas/corde.py), au trait et sans couleur.
//
// La fonction est celle de la planche (boisDe, dans images/planches-src/13-40.js) : la feuille montre les pièces seules
// en grand, puis la vue de la planche à la taille d'impression, puis à la loupe.
// Ce qu'on a vu, à la taille d'impression et à la loupe, et ce qui a changé :
//   les tas de branches toutes au même angle faisaient un fagot d'allumettes : les branches se croisent (vers le fond à
//   droite, puis vers le fond à gauche) et chacune repose sur celles qu'elle croise (empile) ;
//   le bout d'une brindille avec l'anneau d'écorce faisait une paille : sous 2,6 de rayon, la moelle seule ;
//   la fente de séchage se pinçait à mi-longueur et faisait un trait : un vrai coin, large à l'écorce ;
//   le rouleau d'écorce avec un trou rond faisait une canne de conserve : la spirale lâche de la feuille, le creux qui
//   suit le dernier tour, le bord libre le long du rouleau ;
//   la pile sur une seule ligne de sol flottait (la bûche du fond au-dessus de la ligne) : un sol commun gris pâle,
//   comme le sol du tipi, où chaque tas repose à sa profondeur.
// Le rendu se fait dans le scratchpad, pas dans images/ : le composeur sert seulement à mettre les vues en page.
module.exports = (h) => {
  const B = require('./13-40.js').bois(h);
  const planche = require('./13-40.js')(h);
  const tasPlanche = { l: 367, h: 102 };
  const loupe = (z, k, x0, y0, contenu, id) => `<clipPath id="${id}"><rect x="0" y="0" width="${z.l}" height="${z.h}"/></clipPath><g clip-path="url(#${id})"><g transform="scale(${k}) translate(${-x0} ${-y0})">${contenu}</g></g>`;
  const vues = {
    pieces: {
      titre: 'Les pièces seules, en grand',
      dessin: z => [
        B.branche([60, z.h - 40], { c: [0, 0, 30], cap: 64, L: 120, r: 30, k: 0.92, courbe: 0.02, noeuds: 1, cernes: 4, fentes: 1, graine: 11 }),
        B.fendu([190, z.h - 40], { forme: 'quart', c: [0, 0, 6], cap: 60, L: 110, r: 38, th: -60, al: 92, graine: 12 }),
        B.fendu([300, z.h - 40], { forme: 'demi', c: [0, 0, 4], cap: 56, L: 110, r: 30, th: -95, graine: 13 }),
        B.branche([400, z.h - 60], { c: [0, 0, 8], cap: 30, L: 140, r: 8, k: 0.7, noeuds: 2, rameaux: 2, graine: 14 }),
        B.branche([420, z.h - 20], { c: [0, 0, 4], cap: 20, L: 120, r: 4, k: 0.5, pointe: true, biais: 40, biaisA: 200, rameaux: 1, ecorce: 'lisse', graine: 15 }),
        B.rouleau([560, z.h - 60], { c: [0, 0, 18], cap: 50, L: 50, r: 18, graine: 16 }),
        B.branche([560, z.h - 15], { c: [0, 0, 9], cap: 40, L: 90, r: 9, k: 0.85, ecorce: 'bouleau', biais: 30, biaisA: 190, graine: 17 }),
      ].join('\n'),
    },
    impression: {
      titre: 'La vue de la planche, à la taille d’impression',
      dessin: z => `<g transform="translate(${(z.l - tasPlanche.l) / 2} 0)">${planche.vues.tas.dessin(tasPlanche)}</g>`,
    },
    loupe1: {
      titre: 'À la loupe (× 4), l’amadou et le bois fin',
      dessin: z => loupe(z, 4, 0, 102 - z.h / 4, planche.vues.tas.dessin(tasPlanche), 'essai-bois-l1'),
    },
    loupeG: {
      titre: 'À la loupe (× 2,6), le bois fin et les branches',
      dessin: z => loupe(z, 2.6, 60, 102 - z.h / 2.6, planche.vues.tas.dessin(tasPlanche), 'essai-bois-lg'),
    },
    loupeD: {
      titre: 'À la loupe (× 2,6), les bûches',
      dessin: z => loupe(z, 2.6, 367 - z.l / 2.6, 102 - z.h / 2.6, planche.vues.tas.dessin(tasPlanche), 'essai-bois-ld'),
    },
  };
  return {
    ref: '13-40',
    fichier: '_essai-bois.svg',
    titre: 'Essai, le bois',
    desc: 'Le bois au trait de la planche 13-40 : une bûche ronde sciée, un quartier, une demie, une branche avec nœuds et rameaux, une brindille coupée en biais, un rouleau d’écorce de bouleau, une branche de bouleau ; puis la vue des quatre tas à la taille d’impression et à la loupe.',
    format: 'pleine',
    disposition: [['pieces'], ['impression'], ['loupe1'], ['loupeG'], ['loupeD']],
    hauteurs: [1.5, 1.0, 1.5, 1.3, 1.5],
    vues,
  };
};
