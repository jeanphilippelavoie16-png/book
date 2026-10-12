// Planche 101-01 — le poulailler d'hiver : coupe, trappe à glissière, porte.
// Rien n'est coté : le chapitre ne donne aucune dimension du bâtiment. La poule sur le
// perchoir donne l'échelle.
module.exports = (h) => {
  const blanc = t => t.replace('fill="none"', 'fill="#ffffff"');
  const O = -40;                                   // décalage vertical de la coupe
  const Y = y => y + O;
  const yR = x => Y(150 - (x - 130) * 80 / 340);   // dessous du toit en appentis
  const poly = (pts, attrs) => h.chemin(pts, attrs, true);
  const couche = (x1, x2, bas, attrs, haut) =>      // tranche de mur jusqu'au toit
    poly([[x1, bas], [x1, haut !== undefined ? haut : yR(x1)], [x2, haut !== undefined ? haut : yR(x2)], [x2, bas]], attrs);

  // Poule de profil, tournée à gauche ; origine au milieu du dessus du perchoir.
  const poule = (ox, oy, s) => {
    const P = (x, y) => `${(ox + x * s).toFixed(1)},${(oy + y * s).toFixed(1)}`;
    const corps = `M ${P(-24, -24)} C ${P(-30, -12)} ${P(-22, 1)} ${P(-12, 4)} L ${P(12, 4)}`
      + ` C ${P(24, 2)} ${P(30, -8)} ${P(34, -18)} L ${P(44, -42)}`
      + ` C ${P(36, -42)} ${P(26, -36)} ${P(20, -31)} C ${P(8, -35)} ${P(-6, -35)} ${P(-14, -31)}`
      + ` C ${P(-16, -38)} ${P(-18, -44)} ${P(-20, -48)} C ${P(-22, -55)} ${P(-32, -55)} ${P(-34, -48)}`
      + ` L ${P(-41, -45)} L ${P(-34, -43)} C ${P(-32, -38)} ${P(-28, -32)} ${P(-24, -24)} Z`;
    const crete = `M ${P(-31, -53)} L ${P(-30, -59)} L ${P(-27, -55)} L ${P(-24, -61)} L ${P(-22, -55)} L ${P(-19, -58)} L ${P(-20, -50)}`;
    const aile = `M ${P(-12, -27)} C ${P(-2, -18)} ${P(10, -14)} ${P(22, -21)}`;
    const queue = `M ${P(30, -24)} C ${P(34, -30)} ${P(38, -36)} ${P(42, -40)}`;
    return [
      h.path(corps, blanc(h.a.contour)),
      h.path(crete, blanc(h.a.arete)),
      h.path(aile, h.a.detail),
      h.path(queue, h.a.detail),
      h.ellipse(ox - 33 * s, oy - 40 * s, 2 * s, 3.2 * s, blanc(h.a.detail)),
      h.cercle(ox - 28 * s, oy - 49 * s, 1.4, h.a.plein),
    ].join('\n');
  };

  return {
    ref: '101-01',
    titre: 'Le poulailler d’hiver',
    desc: 'Coupe d’un petit poulailler de planches en appentis : plancher sur blocs, murs doubles isolés, trappe de ventilation haute au-dessus du perchoir, pondoir couvert dans le coin, litière épaisse. En bas, la trappe à glissière vue de l’intérieur avec la coupe de sa coulisse, et la porte à charnières de cuir fermée par deux taquets tournants. Encadré danger : pas de lampe chauffante.',
    format: 'pleine',
    disposition: [['coupe'], ['trappe', 'porte']],
    hauteurs: [3, 2],
    largeurs: [[1], [1, 1]],
    vues: {
      coupe: {
        titre: 'En coupe',
        dessin: z => {
          const s = [];
          // sol
          s.push(h.rect(40, Y(330), 520, 14, h.a.hachure('terre', 'aucun')));
          s.push(h.ligne(40, Y(330), 560, Y(330), h.a.arete));
          // blocs sous le plancher
          for (const x of [134, 287, 440]) s.push(h.rect(x, Y(300), 26, 30, h.a.hachure('pierre')));
          // plancher
          s.push(h.rect(126, Y(288), 348, 12, h.a.hachure('bois')));
          // litière
          s.push(h.rect(148, Y(262), 304, 26, h.a.hachure('paille', 'detail')));
          // mur gauche : planche, isolant, planche
          s.push(couche(130, 134, Y(288), h.a.hachure('bois')));
          s.push(couche(134, 144, Y(288), h.a.hachure('isolant')));
          s.push(couche(144, 148, Y(288), h.a.hachure('bois')));
          // mur droit, percé de la trappe entre 90 et 110
          for (const [x1, x2, m] of [[452, 456, 'bois'], [456, 466, 'isolant'], [466, 470, 'bois']]) {
            s.push(h.rect(x1, Y(110), x2 - x1, 178, h.a.hachure(m)));
            s.push(couche(x1, x2, Y(90), h.a.hachure(m)));
          }
          // coulisses de la trappe, côté intérieur ; grillage côté dehors
          s.push(h.rect(445, Y(84), 7, 7, blanc(h.a.arete)));
          s.push(h.rect(445, Y(109), 7, 7, blanc(h.a.arete)));
          for (let y = 92; y <= 108; y += 4) s.push(h.cercle(470.5, Y(y), 1.1, h.a.plein));
          // toit en appentis, débordant des deux côtés
          const t1 = [108, yR(108)], t2 = [492, yR(492)];
          s.push(poly([t1, t2, [492, t2[1] - 12], [108, t1[1] - 12]], h.a.hachure('bois')));
          // silhouette
          s.push(h.chemin([[126, Y(300)], [126, Y(288)], [130, Y(288)], [130, yR(130)], t1, [108, t1[1] - 12], [492, t2[1] - 12], t2, [470, yR(470)], [470, Y(90)]], h.a.contour));
          s.push(h.chemin([[470, Y(110)], [470, Y(288)], [474, Y(288)], [474, Y(300)], [126, Y(300)]], h.a.contour));
          // pondoir : joue du fond (au-delà de la coupe), pied jusqu'au plancher, litière, œuf,
          // fond, rebord, toit en pente. Assez haut pour qu'une poule y entre et s'y couche.
          s.push(poly([[148, Y(157)], [212, Y(168.5)], [212, Y(222)], [148, Y(222)]], h.a.detail));
          s.push(h.rect(198, Y(229), 7, 59, h.a.blanc));
          s.push(h.rect(198, Y(229), 7, 59, h.a.hachure('bois')));
          s.push(h.rect(148, Y(212), 57, 10, h.a.hachure('paille', 'detail')));
          s.push(h.ellipse(172, Y(208.5), 5, 3.8, blanc(h.a.arete)));
          s.push(h.rect(148, Y(222), 64, 7, h.a.hachure('bois')));
          s.push(h.rect(205, Y(203), 7, 19, h.a.hachure('bois')));
          s.push(poly([[148, Y(150)], [224, Y(163.6)], [224, Y(170.6)], [148, Y(157)]], h.a.hachure('bois')));
          // perchoir vu en bout, sur son pied planté au plancher, et la poule
          s.push(h.rect(389, Y(204), 6, 84, h.a.blanc));
          s.push(h.rect(389, Y(204), 6, 84, h.a.detail));
          s.push(h.rect(385, Y(198), 14, 6, h.a.hachure('bois')));
          s.push(poule(392, Y(198), 0.65));
          // l'air humide monte et sort par la trappe
          s.push(h.fleche(`M 296,${Y(256)} C 300,${Y(170)} 390,${Y(118)} 440,${Y(101)} L 516,${Y(100)}`, h.a.cache));
          return s.join('\n');
        },
        renvois: z => [
          { n: 1, rond: [92, Y(315)], cible: [133, Y(315)], texte: 'plancher relevé du sol, sur blocs' },
          { n: 2, rond: [92, Y(225)], cible: [139, Y(225)], texte: 'isolant enfermé entre deux parois' },
          { n: 3, rond: [545, Y(140)], cible: [473, Y(106)], texte: 'trappe réglable, au-dessus des têtes' },
          { n: 4, rond: [352, Y(236)], cible: [385, Y(201)], texte: 'perchoir plat, pattes sous le ventre' },
          { n: 5, rond: [262, Y(160)], cible: [219, Y(166)], texte: 'pondoir surélevé, dans le coin sombre' },
          { n: 6, rond: [180, Y(245)], cible: [180, Y(262)], texte: 'litière sèche et épaisse' },
        ],
      },
      trappe: {
        titre: 'La trappe, vue de l’intérieur',
        dessin: z => {
          const s = [];
          // pan de mur intérieur, planches horizontales
          s.push(h.rect(20, 28, 156, 150, blanc(h.a.arete)));
          for (let y = 43; y < 178; y += 15) s.push(h.ligne(20, y, 176, y, h.a.detail));
          // ouverture grillagée
          s.push(h.rect(40, 84, 62, 38, h.a.blanc));
          s.push(h.rect(40, 84, 62, 38, h.a.hachure('grillage')));
          // planchette, puis les deux lattes qui la tiennent
          s.push(h.rect(82, 74, 88, 58, h.a.blanc));
          s.push(h.rect(82, 74, 88, 58, h.a.hachure('bois')));
          s.push(h.rect(87, 93, 7, 20, blanc(h.a.arete)));
          for (const y of [66, 126]) {
            s.push(h.rect(26, y, 146, 14, blanc(h.a.arete)));
            for (const x of [34, 64, 120, 150, 164]) s.push(h.cercle(x, y + 7, 1.4, h.a.plein));
          }
          // coupe de la coulisse, à la même hauteur, dedans à gauche comme dans la coupe :
          // planche, isolant, planche, et une planche qui borde l'ouverture et enferme l'isolant
          for (const [y1, y2] of [[28, 80], [126, 178]]) {
            s.push(h.rect(226, y1, 4, y2 - y1, h.a.hachure('bois')));
            s.push(h.rect(230, y1, 8, y2 - y1, h.a.hachure('isolant')));
            s.push(h.rect(238, y1, 4, y2 - y1, h.a.hachure('bois')));
          }
          s.push(h.rect(226, 80, 16, 4, h.a.hachure('bois')));
          s.push(h.rect(226, 122, 16, 4, h.a.hachure('bois')));
          for (let y = 87; y <= 120; y += 5) s.push(h.cercle(243.5, y, 1.1, h.a.plein));
          s.push(h.rect(219.5, 74, 6, 58, h.a.hachure('bois', 'arete')));
          s.push(h.rect(219, 66, 7, 7, blanc(h.a.arete)));
          s.push(h.rect(211, 66, 8, 14, blanc(h.a.arete)));
          s.push(h.rect(219, 133, 7, 7, blanc(h.a.arete)));
          s.push(h.rect(211, 126, 8, 14, blanc(h.a.arete)));
          s.push(h.ligne(212, 69.5, 234, 69.5, h.a.arete));
          s.push(h.ligne(212, 136.5, 234, 136.5, h.a.arete));
          return s.join('\n');
        },
        renvois: z => [
          { n: 7, rond: [12, 103], cible: [40, 103], texte: 'grillage cloué sur l’ouverture' },
          { n: 8, rond: [195, 40], cible: [211, 68], texte: 'coulisse en coupe : cale et latte' },
          { n: 9, rond: [197, 150], cible: [171, 120], texte: 'planchette qui glisse, règle l’ouverture' },
        ],
      },
      porte: {
        titre: 'La porte, vue de dehors',
        dessin: z => {
          const s = [];
          // pan de mur en planches
          s.push(h.rect(40, 20, 210, 158, blanc(h.a.arete)));
          for (let y = 34; y < 178; y += 14) s.push(h.ligne(40, y, 250, y, h.a.detail));
          // cadre
          s.push(h.rect(96, 34, 9, 144, blanc(h.a.arete)));
          s.push(h.rect(185, 34, 9, 144, blanc(h.a.arete)));
          s.push(h.rect(96, 34, 98, 9, blanc(h.a.arete)));
          // porte en Z : planches verticales, deux traverses, écharpe
          s.push(h.rect(106, 44, 78, 134, h.a.blanc));
          for (const x of [125.5, 145, 164.5]) s.push(h.ligne(x, 44, x, 178, h.a.detail));
          s.push(h.rect(106, 56, 78, 11, blanc(h.a.arete)));
          s.push(h.rect(106, 152, 78, 11, blanc(h.a.arete)));
          s.push(poly([[108, 152], [121, 152], [182, 67], [169, 67]], blanc(h.a.arete)));
          s.push(h.rect(106, 44, 78, 134, h.a.contour));
          // charnières de cuir, clouées au cadre et à la porte
          for (const y of [58, 154]) {
            s.push(h.rect(84, y, 44, 7, blanc(h.a.arete)));
            for (const x of [89, 99, 114, 123]) s.push(h.cercle(x, y + 3.5, 1.4, h.a.plein));
          }
          // deux taquets tournants sur le cadre, la cheville dans celui du bas
          for (const y of [66, 140]) {
            s.push(h.rect(174, y, 36, 9, blanc(h.a.arete)));
            s.push(h.cercle(189.5, y + 4.5, 1.6, h.a.plein));
          }
          s.push(h.cercle(202, 144.5, 3.8, blanc(h.a.arete)));
          s.push(h.cercle(202, 144.5, 1.3, h.a.detail));
          return s.join('\n');
        },
        renvois: z => [
          { n: 10, rond: [18, 61], cible: [84, 61], texte: 'lanière de cuir clouée : la charnière' },
          { n: 11, rond: [272, 70], cible: [211, 70], texte: 'taquet tournant, en haut et en bas' },
          { n: 12, rond: [272, 158], cible: [205, 147.5], texte: 'cheville : le taquet ne tourne plus' },
        ],
      },
    },
    danger: 'Pas de lampe chauffante : la litière sèche s’enflamme en quelques secondes, et à -35 °C personne n’arrive à temps.',
  };
};
