// Planche 04-01b — La pompe à carton (chapitre 6, variante « Sans sous-sol et sans caveau », « Ventiler quand même »)
// Le chapitre ne donne aucune dimension pour la pompe : aucune cote. L'ouverture de porte sert d'échelle.
module.exports = (h) => {
  const A = h.a;
  const W = at => at.replace('fill="none"', 'fill="#FFFFFF"');

  const tube = (x1, y1, x2, y2, r) => {
    const L = Math.hypot(x2 - x1, y2 - y1), nx = -(y2 - y1) / L * r, ny = (x2 - x1) / L * r;
    return h.path(`M${x1 + nx} ${y1 + ny} L${x2 + nx} ${y2 + ny} A${r} ${r} 0 0 0 ${x2 - nx} ${y2 - ny} L${x1 - nx} ${y1 - ny} A${r} ${r} 0 0 0 ${x1 + nx} ${y1 + ny} Z`, W(A.arete));
  };

  // ── De face, du côté de celui qui tire ─────────────────────────────────────────────
  // La corde vient vers celui qui regarde : de face, on n'en voit que le nœud.
  const face = z => {
    const o = [];
    o.push(h.ligne(65, 345, 281, 345, A.arete));
    o.push(h.chemin([[109, 345], [109, 57], [237, 57], [237, 345]], A.arete));
    o.push(h.chemin([[117, 345], [117, 65], [229, 65], [229, 345]], A.contour));
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
  const coupe = z => {
    const o = [];
    o.push(h.rect(10, 345, 302, 8, A.hachure('bois', 'aucun')), h.ligne(10, 345, 312, 345, A.arete));
    o.push(h.rect(60, 14, 21, 51, A.hachure('bois', 'contour')));        // linteau, coupé
    o.push(h.rect(60, 65, 21, 280, A.detail));                          // jambage, au-delà
    o.push(h.rect(71, 65, 6, 280, A.detail));                           // latte sur le jambage
    o.push(h.rect(77.5, 69, 3, 266, A.plein));                          // battant au repos
    o.push(h.rect(80.5, 48, 2.5, 40, A.plein));                         // ruban
    o.push(h.chemin([[81, 67], [193.4, 308.1]], A.cache));              // battant tiré
    o.push(h.fleche('M101.9 306.1 A240 240 0 0 0 167 291.1', A.arete));
    o.push(h.fleche('M125 130 L175 130', A.cache));
    // celui qui tire, assis sur une caisse, face au battant
    o.push(h.rect(272, 305, 38, 40, W(A.arete)));
    o.push(h.path('M80 333 Q175 328 243 266', A.arete));
    o.push(h.cercle(79, 333, 3, A.plein));
    o.push(tube(290, 296, 284, 234, 13), h.cercle(280, 207, 12, W(A.arete)));
    o.push(tube(288, 297, 248, 294, 9), tube(246, 296, 242, 336, 7), tube(242, 340, 229, 340, 5));
    o.push(tube(282, 238, 268, 266, 6), tube(268, 266, 250, 265, 5.5), h.cercle(247, 265, 5, W(A.arete)));
    return `<g transform="translate(0,-12)">\n${o.join('\n')}\n</g>`;
  };

  // ── Vu de dessus, au jambage ───────────────────────────────────────────────────────
  const jambage = z => {
    const o = [];
    o.push(h.rect(10, 60, 130, 90, A.hachure('bois', 'contour')));
    o.push(h.rect(140, 120, 20, 24, A.blanc), h.rect(140, 120, 20, 24, A.hachure('bois')));
    o.push(h.ligne(122, 132, 159, 132, A.arete), h.rect(159, 128, 2.5, 8, A.plein));
    // carton ondulé : deux faces et la cannelure
    const pts = [];
    for (let x = 148, k = 0; x <= 280; x += 3, k++) pts.push([x, k % 2 ? 150 : 144]);
    o.push(h.chemin(pts, A.detail));
    o.push(h.ligne(148, 144, 280, 144, A.arete), h.ligne(148, 150, 280, 150, A.arete), h.ligne(148, 144, 148, 150, A.arete));
    // battant tiré vers la pièce
    o.push(h.rect(148, 180, 132, 6, A.cache));
    o.push(h.fleche('M215 155 L215 175', A.arete));
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
    return o.join('\n');
  };

  return {
    ref: '04-01b',
    titre: 'La pompe à carton',
    desc: 'Pompe à air de carton suspendue dans une ouverture de porte : de face, le battant plus petit que l’ouverture, la charnière de ruban en haut, les lattes en butée derrière le battant, le nœud de la corde au bas ; en coupe, quelqu’un assis sur une caisse face au battant, la corde en main, le battant tiré vers lui puis relâché contre la latte ; vu de dessus, le jeu entre le carton et le cadre et la latte clouée au jambage ; le cadre de lattes tendu d’un linge humide pour l’entrée d’air.',
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
          { n: 5, rond: [205, 318], cible: [207.3, 281.4], texte: 'assis, on tire puis on relâche' },
          { n: 6, rond: [30, 228], cible: [77.5, 228], texte: 'relâché, il retombe contre la latte' },
        ],
      },
      jambage: {
        titre: 'Vu de dessus, au jambage',
        dessin: jambage,
        renvois: z => [
          { n: 7, rond: [190, 95], cible: [160, 122], texte: 'latte clouée sur le jambage' },
          { n: 8, rond: [110, 200], cible: [147, 152], texte: 'l’ouverture moins un jeu, tout autour' },
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
