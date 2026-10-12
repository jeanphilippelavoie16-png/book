// Planche 79-01a — la cave de talus : plan, trou en travers, cave finie en long.
module.exports = (h) => {
  const A = h.a;
  // une couche : fond blanc qui masque ce qui est dessous, puis sa hachure
  const zone = (pts, nom, t = 'arete') => h.chemin(pts, A.blanc, true) + '\n' + h.chemin(pts, A.hachure(nom, t), true);
  // limite du gel relevée : trait d'arête, tireté long
  const LIMITE = 'fill="none" stroke="#1A1A1A" stroke-width="1.4" stroke-linecap="round" stroke-dasharray="10 4"';

  // ── coupe en long : plafond en légère pente, point haut côté porte
  const yC = x => 168 - (x - 138) * 12 / 292;   // plafond
  const yT = x => yC(x) - 8;                     // dessus de la structure
  const yI = x => yC(x) - 22;                    // dessus de l'isolant
  const S1 = [[0, 40], [90, 50], [140, 70.5], [200, 84], [300, 97], [410, 106], [452, yI(452)]];
  const sol = [[452, 232], [468, 232], [510, 238], [566, 256], [576, 262], [576, 274], [600, 277]];

  // rappel d'un renvoi de la vue en long (même numéro, pas de nouvelle ligne de légende)
  const rappel = (n, rx, ry, cx, cy) => {
    const dx = cx - rx, dy = cy - ry, d = Math.hypot(dx, dy), sx = rx + 9 * dx / d, sy = ry + 9 * dy / d;
    return [
      `<line x1="${sx}" y1="${sy}" x2="${cx}" y2="${cy}" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>`,
      `<line x1="${sx}" y1="${sy}" x2="${cx}" y2="${cy}" fill="none" stroke="#1A1A1A" stroke-width="0.5" stroke-dasharray="3 2.5"/>`,
      `<circle cx="${cx}" cy="${cy}" r="1.8" fill="#1A1A1A" stroke="#FFFFFF" stroke-width="0.7"/>`,
      `<circle cx="${rx}" cy="${ry}" r="9" fill="#FFFFFF" stroke="#1A1A1A" stroke-width="1.4"/>`,
      h.texte(rx, ry + 4, String(n)),
    ].join('\n');
  };

  return {
    ref: '79-01a',
    titre: 'La cave de talus, creusée, drainée, ventilée',
    desc: 'Cave à légumes entaillée dans un talus. Vu de dessus : la rigole de tête en fer à cheval autour de la butte, la porte au bas de la pente. En travers pendant le creusage : paroi droite de 1,2 m au fond, pente de moins de 45 degrés au-dessus, déblai à plus de 1,2 m du bord, fond sous la limite du gel. En long : lit de pierre nette, drain de pied en pente continue, isolant à l’extérieur, prise d’air basse au ras du plancher, sortie haute au point le plus élevé, déblai remonté sur le toit.',
    format: 'pleine',
    disposition: [['plan', 'travers'], ['long']],
    hauteurs: [2, 3],
    largeurs: [[1, 1], [1]],
    vues: {
      plan: {
        titre: 'Vu de dessus',
        dessin: z => [
          // rigole de tête : un fossé en fer à cheval, ouvert vers le bas de la pente
          h.path('M250 28 L80 28 A70 70 0 0 0 80 168 L250 168', A.arete),
          h.path('M250 34 L80 34 A64 64 0 0 0 80 162 L250 162', A.arete),
          h.fleche('M254 31 L280 31', A.cache),
          h.fleche('M254 165 L280 165', A.cache),
          // déblai en butte sur la chambre
          h.path('M196 72 C170 50, 88 48, 58 72 C40 88, 40 108, 58 124 C88 148, 170 146, 196 124', A.arete),
          // chambre, sous la terre
          h.rect(70, 76, 122, 44, A.cache),
          // face avant et porte
          h.ligne(196, 72, 196, 124, A.contour),
          h.rect(192, 88, 8, 20, A.blanc),
          h.rect(192, 88, 8, 20, A.hachure('isolant', 'arete')),
          // têtes des deux conduits
          h.cercle(80, 98, 5, A.arete),
          h.cercle(180, 98, 5, A.arete),
          rappel(7, 30, 98, 74.5, 98),
          rappel(8, 180, 52, 180, 92.5),
        ].join('\n'),
        renvois: z => [
          { n: 1, rond: [264, 12], cible: [246, 27.3], texte: 'rigole de tête en fer à cheval' },
          { n: 2, rond: [238, 98], cible: [200.6, 98], texte: 'porte au bas de la pente' },
        ],
      },
      travers: {
        titre: 'En travers, pendant le creusage',
        dessin: z => [
          // bande de terre le long du profil
          h.chemin([[0, 90], [104, 90], [156, 134], [156, 170], [220, 170], [220, 134], [272, 90], [289, 90],
            [289, 102], [276.4, 102], [232, 139.6], [232, 182], [144, 182], [144, 139.6], [99.6, 102], [0, 102]],
            A.hachure('terre', 'aucun'), true),
          // déblai en tas, loin du bord
          zone([[6, 90], [16, 78], [30, 68], [46, 67], [58, 76], [68, 90]], 'terre'),
          // limite du gel relevée : le fond descend plus bas
          h.path('M0 150 L155 150', LIMITE),
          h.path('M221 150 L289 150', LIMITE),
          // profil du trou
          h.chemin([[0, 90], [104, 90], [156, 134], [156, 170], [220, 170], [220, 134], [272, 90], [289, 90]], A.contour),
          // cotes
          h.cote(68, 80, 104, 80, '1200'),
          // cote de la paroi droite, décollée de la paroi, rappels haut et bas, traits d'arrêt obliques
          h.ligne(190, 134, 218, 134, A.fin),
          h.ligne(190, 170, 218, 170, A.fin),
          h.ligne(198, 134, 198, 170, A.detail),
          h.ligne(193, 139, 203, 129, A.detail),
          h.ligne(193, 175, 203, 165, A.detail),
          h.texte(178, 156, '1200', { lisere: true }),
          h.ligne(155, 134, 126, 134, A.fin),
          h.path('M132 134 A24 24 0 0 1 137.7 118.5', A.fin),
          h.texte(108, 129, '< 45°', { lisere: true }),
        ].join('\n'),
        renvois: z => [
          { n: 3, rond: [264, 172], cible: [254, 151], texte: 'limite du gel relevée, fond dessous' },
        ],
      },
      long: {
        titre: 'En long, la cave finie',
        dessin: z => [
          // terre en place et déblai
          h.chemin([...S1, ...sol, [600, 303], [0, 303]], A.hachure('terre', 'aucun'), true),
          // drain de pied : poche au pied du mur du fond, puis pente continue jusqu'à la sortie
          zone([[96, 236], [116, 236], [116, 248], [576, 262], [576, 274], [96, 262]], 'gravier', 'detail'),
          // lit de pierre nette sous le plancher, jusque devant le seuil
          zone([[130, 232], [468, 232], [468, 248], [130, 248]], 'pierre', 'detail'),
          // isolant à l'extérieur de la structure
          zone([[116, 248], [116, yI(116)], [452, yI(452)], [452, 175], [438, 175], [438, yT(438)], [130, yT(130)], [130, 248]], 'isolant'),
          // structure de bois
          zone([[130, 232], [130, yT(130)], [438, yT(438)], [438, 175], [430, 175], [430, yC(430)], [138, yC(138)], [138, 232]], 'bois'),
          // la chambre
          h.chemin([[138, 232], [138, yC(138)], [430, yC(430)], [430, 232]], A.blanc, true),
          h.chemin([[138, 232], [138, yC(138)], [430, yC(430)], [430, 176]], A.contour),
          h.ligne(138, 232, 452, 232, A.contour),
          // porte isolée
          h.rect(431, 176, 20, 56, A.blanc),
          h.rect(431, 176, 20, 56, A.hachure('bois', 'arete')),
          h.ligne(441, 178, 441, 230, A.detail),
          h.path('M451 197 L457 197 L457 209 L451 209', A.arete),
          // prise d'air basse : bouche courte au-dessus de la butte, descend au ras du plancher
          h.rect(144, 62, 12, 158, A.blanc),
          h.ligne(144, 62, 144, 220, A.arete),
          h.ligne(156, 62, 156, 220, A.arete),
          // sortie haute : au point le plus haut du plafond, et sa bouche plus haute que celle
          // de la prise, sinon c'est la prise qui tire et l'air se renverse
          h.rect(400, 38, 12, yC(412) - 38, A.blanc),
          h.ligne(400, 38, 400, yC(400), A.arete),
          h.ligne(412, 38, 412, yC(412), A.arete),
          // surface finie, sol devant la porte
          h.chemin(S1, A.arete),
          h.chemin(sol, A.arete),
          // l'air balaie le fond
          h.fleche('M150 34 L150 55', A.cache),
          h.fleche('M164 225 C 236 229, 300 226, 350 206 S 398 178, 405 164', A.cache),
          h.fleche('M406 34 L406 12', A.cache),
          // l'eau sort du drain
          h.fleche('M580 268 L597 272', A.cache),
        ].join('\n'),
        renvois: z => [
          { n: 4, rond: [492, 205], cible: [462, 233], texte: 'lit de pierre nette sous le plancher' },
          { n: 5, rond: [515, 293], cible: [515, 273], texte: 'drain de pied, pente continue' },
          { n: 6, rond: [60, 190], cible: [115.5, 200], texte: 'isolant à l’extérieur de la structure' },
          { n: 7, rond: [200, 192], cible: [156.6, 214], texte: 'prise d’air basse, au ras du plancher' },
          { n: 8, rond: [455, 56], cible: [412.6, 72], texte: 'sortie haute, au point le plus élevé' },
          { n: 9, rond: [300, 50], cible: [300, 106], texte: 'déblai remonté sur le toit' },
        ],
      },
    },
    danger: 'Danger au creusage : une paroi droite part d’un coup, et la terre sur la poitrine empêche d’inspirer. On ouvre en pente, et quelqu’un reste en surface tant qu’une personne est dans le trou.',
  };
};
