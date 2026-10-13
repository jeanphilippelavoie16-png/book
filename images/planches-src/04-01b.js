// Planche 04-01b — La pompe à carton (chapitre 4, variante « Sans sous-sol et sans caveau », « Ventiler quand même »)
// Le chapitre ne donne aucune dimension pour la pompe : aucune cote. L'ouverture de porte sert d'échelle
// (280 de haut pour une porte d'environ 2 m : 0,138 par mm, la même échelle pour le corps de la coupe).
// Charte du 13 octobre : le battant et la corde pèsent ; gris loin sur ce qu'on voit au-delà (le jambage
// de la coupe, le dessous du battant de face) et sur la caisse ; rouge : la flèche du tirage dans la
// coupe, le cercle de la butée dans la vue de dessus (« pour qu'il ne batte que d'un bord »).
module.exports = (h) => {
  const A = h.a;
  const W = at => at.replace('fill="none"', 'fill="#FFFFFF"');

  // ── De face, du côté de celui qui tire ─────────────────────────────────────────────
  // La corde vient vers celui qui regarde : de face, on n'en voit que le nœud.
  const face = z => {
    const o = [];
    // sous le battant, on voit au-delà de la porte : le plan d'arrière, en gris
    o.push(h.rect(127, 335, 92, 10, A.loin));
    o.push(h.ligne(65, 345, 281, 345, A.arete));
    o.push(h.chemin([[109, 345], [109, 57], [237, 57], [237, 345]], A.detail));     // chambranle
    o.push(h.chemin([[117, 345], [117, 65], [229, 65], [229, 345]], A.arete));      // l'ouverture
    // le battant et sa charnière de ruban
    o.push(h.rect(121, 70, 104, 265, W(A.contour)));
    o.push(h.rect(119, 59, 108, 20, A.blanc), h.rect(119, 59, 108, 20, A.hachure('grillage', 'arete')));
    // lattes derrière le battant : cachées, sauf sous le battant
    o.push(h.ligne(127, 80, 127, 335, A.cache), h.ligne(219, 80, 219, 335, A.cache));
    o.push(h.ligne(127, 335, 127, 345, A.detail), h.ligne(219, 335, 219, 345, A.detail));
    // le nœud au bas du battant et son bout libre
    o.push(h.path('M173 327 Q178 334 175 341', A.arete));
    o.push(h.cercle(173, 327, 3.2, A.plein));
    return `<g transform="translate(-45,0)">\n${o.join('\n')}\n</g>`;
  };

  // ── En coupe : le battant tiré, puis relâché ──────────────────────────────────────
  // Celui qui tire est assis sur une caisse basse, face au battant, une main devant l'autre sur la
  // corde. La corde part du nœud au bas du battant et file droit, tendue, jusque dans les poings,
  // dans l'axe de leur prise (mainP et mainL à 142° : l'axe de la corde, à 2° près). Le bras loin
  // est posé par le calcul pour que son poing tombe sur la corde, 24 unités devant le poing proche.
  const NOEUD = [82, 333];
  const GAP = [5.5, 5.5];                 // la corde cachée dans le poing loin, de part et d'autre de sa prise
  const tireur = h.formes.corps({
    x: 232, y: 345, pose: 'assis-tire-corde', cote: 'gauche', echelle: 0.138,
    mains: { P: 'prise', L: 'prise' }, prise: { P: 4, L: 4 },
    angles: { brasL: 45, avantbrasL: 94, mainL: 142, mainP: 142 },
    objetP: g => corde(g),
  });
  // La corde est peinte devant le corps loin : elle s'interrompt là où elle entre dans le poing
  // loin, pour que ce poing la serre au lieu d'être barré par elle ; elle finit dans le poing proche.
  function corde(g) {
    const H = [g.mainP.x, g.mainP.y], Lm = [g.mainL.x, g.mainL.y];
    const u = [H[0] - NOEUD[0], H[1] - NOEUD[1]], L = Math.hypot(u[0], u[1]);
    const e = [u[0] / L, u[1] / L];
    const t = ((Lm[0] - NOEUD[0]) * e[0] + (Lm[1] - NOEUD[1]) * e[1]);   // le poing loin, projeté sur la corde
    const q = k => [NOEUD[0] + e[0] * k, NOEUD[1] + e[1] * k];
    return [h.chemin([NOEUD, q(t - GAP[0])], A.arete), h.chemin([q(t + GAP[1]), H], A.arete)].join('\n');
  }
  // la corde, en unités de vue : du nœud au poing
  const H = [tireur.mainP.x, tireur.mainP.y];
  const ru = [H[0] - NOEUD[0], H[1] - NOEUD[1]], rL = Math.hypot(ru[0], ru[1]);
  const re = [ru[0] / rL, ru[1] / rL], rn = [re[1], -re[0]];                  // rn : du côté du haut de la corde
  const surCorde = (t, d = 0) => [NOEUD[0] + ru[0] * t + rn[0] * d, NOEUD[1] + ru[1] * t + rn[1] * d];

  const coupe = z => {
    const o = [];
    o.push(h.rect(10, 345, 302, 8, A.hachure('bois', 'aucun')), h.ligne(10, 345, 312, 345, A.arete));
    // le jambage, au-delà du plan de coupe : gris loin ; la latte clouée dessus, en blanc
    o.push(h.rect(60, 65, 21, 280, A.loin), h.rect(60, 65, 21, 280, A.detail));
    o.push(h.rect(71, 65, 6, 280, W(A.detail)));
    o.push(h.rect(60, 14, 21, 51, A.hachure('bois', 'contour')));        // linteau, coupé
    o.push(h.rect(77.5, 69, 3, 266, A.plein));                          // battant au repos
    o.push(h.rect(80.5, 48, 2.5, 40, A.plein));                         // ruban
    o.push(h.chemin([[81, 67], [193.4, 308.1]], A.cache));              // battant tiré
    // le bas du battant vient vers celui qui tire : l'arc suit son trajet (centre à la charnière),
    // juste dessous, pour ne pas croiser la corde
    o.push(h.fleche('M118.9 336.4 A272 272 0 0 0 187.3 317.4', A.arete));
    o.push(h.fleche('M125 130 L175 130', A.cache));
    // la caisse : l'objet secondaire, en gris loin
    const sx = tireur.siege[0];
    o.push(h.rect(sx - 24, tireur.siege[1], 46, 345 - tireur.siege[1], A.loin));
    o.push(h.rect(sx - 24, tireur.siege[1], 46, 345 - tireur.siege[1], A.arete));
    o.push(tireur.toString());
    o.push(h.cercle(NOEUD[0] - 1, NOEUD[1], 3, A.plein));
    // le geste : on tire la corde vers la poitrine
    const g0 = surCorde(0.60, 14), g1 = surCorde(0.82, 14);
    o.push(h.geste(`M${g0[0].toFixed(1)} ${g0[1].toFixed(1)} L${g1[0].toFixed(1)} ${g1[1].toFixed(1)}`));
    return `<g transform="translate(0,-12)">\n${o.join('\n')}\n</g>`;
  };

  // ── Vu de dessus, au jambage ───────────────────────────────────────────────────────
  const jambage = z => {
    const o = [];
    o.push(h.rect(10, 60, 130, 90, A.hachure('bois', 'contour')));
    o.push(h.rect(140, 120, 20, 24, A.blanc), h.rect(140, 120, 20, 24, A.hachure('bois')));
    o.push(h.ligne(122, 132, 159, 132, A.arete), h.rect(159, 128, 2.5, 8, A.plein));
    // carton ondulé : deux faces et la cannelure ; c'est l'objet, son contour pèse
    const pts = [];
    for (let x = 148, k = 0; x <= 280; x += 3, k++) pts.push([x, k % 2 ? 149 : 145]);
    o.push(h.chemin(pts, A.detail));
    o.push(h.chemin([[280, 144], [148, 144], [148, 150], [280, 150]], A.contour));
    // battant tiré vers la pièce
    o.push(h.rect(148, 180, 132, 6, A.cache));
    o.push(h.fleche('M215 155 L215 175', A.arete));
    // à contrôler : le carton porte sur la latte, il ne peut battre que vers la pièce
    o.push(h.controle(154, 144));
    return o.join('\n');
  };

  // ── Le filtre de l'entrée d'air, vu de dos ─────────────────────────────────────────
  const linge = z => {
    const o = [];
    const vague = (x1, y1, x2, y2) => {
      const n = Math.round(Math.hypot(x2 - x1, y2 - y1) / 10);
      const dx = (x2 - x1) / n, dy = (y2 - y1) / n;
      let d = `M${x1} ${y1}`;
      for (let i = 0; i < n; i++) {
        const s = i % 2 ? 1.6 : -1.6;
        d += ` Q${x1 + dx * (i + 0.5) + (dy ? s : 0)} ${y1 + dy * (i + 0.5) + (dx ? s : 0)} ${x1 + dx * (i + 1)} ${y1 + dy * (i + 1)}`;
      }
      return h.path(d, A.detail);
    };
    // le linge tendu dans le cadre, plis de tension aux coins
    o.push(h.path('M76 56 Q100 80 118 92', A.detail), h.path('M214 56 Q190 80 172 92', A.detail));
    o.push(h.path('M76 184 Q100 162 118 150', A.detail), h.path('M214 184 Q190 162 172 150', A.detail));
    // les quatre lattes
    o.push(h.rect(60, 40, 170, 12, W(A.arete)), h.rect(60, 188, 170, 12, W(A.arete)));
    o.push(h.rect(60, 40, 12, 160, W(A.arete)), h.rect(218, 40, 12, 160, W(A.arete)));
    for (const [x, y] of [[60, 40], [218, 40], [60, 188], [218, 188]]) o.push(h.cercle(x + 3.5, y + 3.5, 1.3, A.plein), h.cercle(x + 8.5, y + 8.5, 1.3, A.plein));
    // le linge rabattu sur les lattes et cloué
    o.push(vague(74, 46, 216, 46), vague(74, 194, 216, 194), vague(66, 54, 66, 186), vague(224, 54, 224, 186));
    for (let x = 84; x <= 206; x += 20) o.push(h.cercle(x, 43.5, 1.1, A.plein), h.cercle(x, 196.5, 1.1, A.plein));
    for (let y = 70; y <= 170; y += 20) o.push(h.cercle(62.5, y, 1.1, A.plein), h.cercle(227.5, y, 1.1, A.plein));
    // le cadre, l'objet de la vue : son contour pèse
    o.push(h.rect(60, 40, 170, 160, A.contour));
    return o.join('\n');
  };

  return {
    ref: '04-01b',
    titre: 'La pompe à carton',
    desc: 'Pompe à air de carton suspendue dans une ouverture de porte : de face, le battant plus petit que l’ouverture, la charnière de ruban en haut, les lattes en butée derrière le battant, le nœud de la corde au bas ; en coupe, quelqu’un assis sur une caisse face au battant, les deux mains sur la corde tendue, qui la tire vers sa poitrine, le battant tiré vers lui puis relâché contre la latte ; vu de dessus, le jeu entre le carton et le cadre et la latte clouée au jambage, sur laquelle le carton porte ; le cadre de lattes tendu d’un linge humide pour l’entrée d’air.',
    format: 'pleine',
    disposition: [['face', 'coupe'], ['jambage', 'linge']],
    hauteurs: [3, 2],
    largeurs: [[4, 5], [1, 1]],
    vues: {
      face: {
        titre: 'De face, côté de celui qui tire',
        dessin: face,
        renvois: z => [
          { n: 1, rond: [17, 200], cible: [76, 200], texte: 'carton fort ou contreplaqué mince' },
          { n: 2, rond: [217, 38], cible: [182, 70], texte: 'charnière de ruban ou de toile' },
          { n: 3, rond: [235, 150], cible: [174, 150], texte: 'lattes en butée derrière le battant' },
          { n: 4, rond: [101, 298], cible: [125.8, 324.6], texte: 'corde nouée au bas du battant' },
        ],
      },
      coupe: {
        titre: 'En coupe',
        dessin: coupe,
        renvois: z => [
          { n: 5, rond: [222, 148], cible: [H[0] - 1.5, H[1] - 12 - 5.5], texte: 'assis, on tire puis on relâche' },
          { n: 6, rond: [30, 228], cible: [77.5, 228], texte: 'relâché, il retombe contre la latte' },
        ],
      },
      jambage: {
        titre: 'Vu de dessus, au jambage',
        dessin: jambage,
        renvois: z => [
          { n: 7, rond: [190, 95], cible: [160, 122], texte: 'latte clouée sur le jambage' },
          { n: 8, rond: [100, 200], cible: [143, 151], texte: 'l’ouverture moins un jeu, tout autour' },
          { n: 9, rond: [262, 206], cible: [250, 186], texte: 'il ne bat que d’un côté' },
        ],
      },
      linge: {
        titre: 'À l’entrée d’air, vu de dos',
        dessin: linge,
        renvois: z => [
          { n: 10, rond: [24, 120], cible: [60, 120], texte: 'quatre lattes clouées en cadre' },
          { n: 11, rond: [264, 70], cible: [208, 62], texte: 'linge humide tendu sur le cadre' },
        ],
      },
    },
  };
};
