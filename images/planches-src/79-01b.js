// Planche 79-01b — la cave de talus : les assemblages (toit, pied de paroi, conduit, porte).
module.exports = (h) => {
  const A = h.a;
  const zone = (pts, nom, t = 'arete') => h.chemin(pts, A.blanc, true) + '\n' + h.chemin(pts, A.hachure(nom, t), true);
  const blanc = (pts, t = A.arete) => h.chemin(pts, A.blanc, true) + '\n' + h.chemin(pts, t, true);
  const out = [];

  // Isolant en couches croisées : branches couchées dans le plan (traits), puis branches coupées (ronds).
  const couchesMur = (y0, y1) => {
    const o = [h.ligne(199, y0, 199, y1, A.fin), h.ligne(212, y0, 212, y1, A.fin)];
    for (let y = y0 + 3; y < y1 - 4; y += 26) {
      o.push(h.ligne(190, y, 190, Math.min(y + 20, y1 - 2), A.detail), h.ligne(195, y + 11, 195, Math.min(y + 31, y1 - 2), A.detail));
      o.push(h.ligne(216, y + 6, 216, Math.min(y + 26, y1 - 2), A.detail), h.ligne(221, y + 16, 221, Math.min(y + 36, y1 - 2), A.detail));
    }
    for (let y = y0 + 4; y < y1 - 2; y += 7.5) o.push(h.cercle(205.5, y, 2.2, A.detail));
    return o.join('\n');
  };

  // ── le toit
  const yb = x => 154 + 0.048 * x;          // dessus de l'isolant, assise de l'écorce
  const argT = x => 74 + 0.09 * x;          // dessus de l'argile
  const argB = x => argT(x) + 9;
  const neige = [[0, 52], [40, 49], [90, 55], [140, 58], [190, 61], [240, 66], [290, 72], [346, 82]];
  const toit = () => {
    const o = [];
    o.push(h.rect(0, argB(0) - 1, 346, 288 - argB(0) + 1, A.hachure('terre', 'aucun')));
    o.push(h.chemin([[0, argB(0)], [346, argB(346)], [346, 0], [0, 0]], A.blanc, true));
    // isolant : trois couches croisées sur le toit, trois sur le mur
    o.push(blanc([[0, yb(0)], [226, yb(226)], [226, 288], [186, 288], [186, 196], [0, 196]]));
    o.push(h.ligne(0, 185, 226, 185, A.fin), h.ligne(0, 174, 226, 174, A.fin));
    for (let x = 3; x < 222; x += 26) {
      o.push(h.ligne(x, 189, Math.min(x + 20, 223), 189, A.detail), h.ligne(x + 11, 193, Math.min(x + 31, 223), 193, A.detail));
      o.push(h.ligne(x + 5, 170, Math.min(x + 25, 223), 170, A.detail), h.ligne(x + 16, 165.5, Math.min(x + 36, 223), 165.5, A.detail));
    }
    for (let x = 6; x < 224; x += 7.5) o.push(h.cercle(x, 179.5, 2.2, A.detail));
    o.push(couchesMur(196, 288));
    // structure : planches du toit et du mur
    o.push(zone([[0, 196], [186, 196], [186, 288], [170, 288], [170, 210], [0, 210]], 'bois'));
    o.push(h.rect(0, 210, 170, 78, A.blanc));
    o.push(h.chemin([[0, 210], [170, 210], [170, 288]], A.contour));
    // écorce en bardeaux : chaque pièce haute recouvre la suivante, l'eau file vers l'extérieur
    for (let i = 6; i >= 0; i--) {
      const x = 35 * i, x2 = x + 44;
      o.push(blanc([[x, yb(x)], [x2, yb(x2) - 3.5], [x2, yb(x2) - 7], [x, yb(x) - 3.5]]));
    }
    o.push(h.fleche('M254 166 L254 184', A.cache));
    // argile compactée en pente, sous la neige
    o.push(h.chemin([[0, argT(0)], [346, argT(346)], [346, argB(346)], [0, argB(0)]], A.blanc, true));
    o.push(h.ligne(0, argT(0) + 4.5, 346, argT(346) + 4.5, A.fin));
    o.push(h.ligne(0, argB(0), 346, argB(346), A.arete));
    // neige
    o.push(h.chemin([...neige, [346, argT(346)], [0, argT(0)]], A.hachure('neige', 'aucun'), true));
    o.push(h.ligne(0, argT(0), 346, argT(346), A.arete));
    o.push(h.chemin(neige, A.arete));
    return o.join('\n');
  };

  // ── le pied de la paroi
  const pied = () => {
    const o = [];
    o.push(h.rect(0, 0, 346, 288, A.hachure('terre', 'aucun')));
    o.push(h.rect(0, 0, 170, 214, A.blanc));
    o.push(zone([[0, 214], [186, 214], [186, 240], [0, 240]], 'pierre', 'detail'));
    o.push(zone([[170, 0], [186, 0], [186, 214], [170, 214]], 'bois'));
    o.push(h.rect(186, 0, 40, 240, A.blanc));
    o.push(h.chemin([[226, 0], [226, 240], [186, 240]], A.arete));
    o.push(couchesMur(0, 240));
    // drain : rigole de pierre nette au pied, coiffée de branches de conifère
    o.push(zone([[226, 214], [300, 214], [292, 256], [226, 256]], 'gravier'));
    o.push(blanc([[226, 202], [304, 202], [300, 214], [226, 214]]));
    for (const x0 of [230, 254, 278]) {
      // une branche : la tige et ses aiguilles, d'un seul trait
      let d = `M${x0} 209 L${x0 + 22} 207`;
      for (let t = 3; t < 22; t += 4) {
        const ys = 209 - t * 2 / 22;
        d += ` M${x0 + t} ${ys} l3 -4 M${x0 + t} ${ys} l3 3.5`;
      }
      o.push(h.path(d, A.detail));
    }
    // plancher : une bille couchée, des perches refendues posées en travers, face plate en haut
    o.push(h.path('M14 190 L156 190 A8 11.5 0 0 1 156 213 L14 213 A8 11.5 0 0 1 14 190 Z', A.blanc));
    o.push(h.path('M14 190 L156 190 A8 11.5 0 0 1 156 213 L14 213 A8 11.5 0 0 1 14 190 Z', A.arete));
    o.push(h.ligne(34, 197, 74, 197, A.detail), h.ligne(96, 206, 138, 206, A.detail));
    for (const x of [18, 40, 62, 84, 106, 128, 150]) {
      const d = `M${x - 9} 181 A9 9 0 0 0 ${x + 9} 181 Z`;
      o.push(h.path(d, A.blanc), h.path(d, A.hachure('bois', 'arete')));
    }
    o.push(h.chemin([[170, 0], [170, 214], [0, 214]], A.contour));
    return o.join('\n');
  };

  // ── le conduit, fait d'un billot
  const conduit = () => {
    const o = [];
    o.push(h.rect(50, 24, 46, 202, A.blanc));
    o.push(h.ligne(61, 31, 61, 226, A.cache), h.ligne(85, 31, 85, 226, A.cache));
    o.push(h.ligne(73, 31, 73, 233, A.detail));
    for (const y of [70, 128, 186]) for (const d of [-3, 0, 3]) o.push(h.path(`M50 ${y + d} Q73 ${y + d + 5} 96 ${y + d}`, A.detail));
    // écorce : quelques gerçures, un noeud
    for (const [x, y, l] of [[55, 46, 14], [90, 58, 12], [56, 104, 10], [91, 150, 14], [55, 166, 12], [90, 204, 10]]) o.push(h.path('M' + x + ' ' + y + ' q1.5 ' + l / 2 + ' 0 ' + l, A.detail));
    o.push(h.ellipse(66, 100, 3, 5, A.detail));
    o.push(h.ligne(50, 24, 50, 226, A.contour), h.ligne(96, 24, 96, 226, A.contour));
    o.push(h.path('M50 226 A23 7 0 0 0 96 226', A.contour));
    o.push(h.ellipse(73, 24, 23, 7, A.blanc), h.ellipse(73, 24, 23, 7, A.contour));
    // fer-blanc percé, rabattu sur le bout et lié
    o.push(h.ellipse(73, 21, 27, 8.5, A.blanc), h.ellipse(73, 21, 27, 8.5, A.arete));
    o.push(h.ligne(46, 21, 48, 33, A.arete), h.ligne(100, 21, 98, 33, A.arete));
    o.push(h.path('M47 31 Q73 37 99 31', A.detail), h.path('M47 34 Q73 40 99 34', A.detail));
    for (const x of [57, 65, 73, 81, 89]) for (const y of [17, 21, 25])
      if ((x - 73) ** 2 / 27 ** 2 + (y - 21) ** 2 / 8.5 ** 2 < 0.62) o.push(h.cercle(x, y, 1, A.plein));
    // bouchon : sac de toile bourré de paille, poussé dans la bouche d'en dessous
    o.push(h.path('M62 229 L62 212 Q73 206 84 212 L84 229', A.cache));
    const sac = 'M62 229 C50 238, 48 258, 60 266 C68 271, 80 271, 88 265 C98 256, 96 238, 84 229 Z';
    o.push(h.path(sac, A.blanc), h.path(sac, A.arete));
    o.push(h.path('M60 248 Q70 252 76 262', A.detail), h.path('M86 243 Q81 253 85 262', A.detail));
    // le billot en coupe : deux moitiés creusées, refermées
    o.push(h.cercle(172, 92, 36, A.blanc), h.cercle(172, 92, 36, A.hachure('bois', 'contour')));
    o.push(h.cercle(172, 92, 12, A.blanc), h.cercle(172, 92, 12, A.arete));
    o.push(h.ligne(172, 56, 172, 80, A.arete), h.ligne(172, 104, 172, 128, A.arete));
    o.push(h.cercle(172, 92, 38.5, A.detail));
    return o.join('\n');
  };

  // ── le bord de la porte, vu de dessus
  const porte = () => {
    const o = [];
    o.push(zone([[0, 40], [196, 40], [196, 52], [0, 52]], 'bois'));
    o.push(zone([[0, 52], [184, 52], [184, 128], [0, 128]], 'isolant'));
    o.push(zone([[184, 52], [196, 52], [196, 128], [184, 128]], 'bois'));
    o.push(zone([[0, 128], [196, 128], [196, 140], [0, 140]], 'bois'));
    o.push(h.chemin([[0, 40], [196, 40], [196, 140], [0, 140]], A.contour));
    // montant du cadre
    o.push(h.rect(120, 172, 111, 116, A.hachure('bois', 'aucun')));
    o.push(h.chemin([[231, 172], [120, 172], [120, 288]], A.contour));
    // boyau fendu : la queue aplatie clouée au cadre, le bulbe écrasé par la porte
    o.push(h.ellipse(172, 156, 22, 16, A.blanc), h.ellipse(172, 156, 22, 16, A.arete));
    o.push(h.ellipse(172, 156, 17, 11, A.arete));
    o.push(blanc([[124, 167], [156, 167], [156, 172], [124, 172]]));
    o.push(h.rect(130, 163.5, 10, 3.5, A.plein), h.rect(133.8, 167, 2.4, 30, A.plein));
    return o.join('\n');
  };

  return {
    ref: '79-01b',
    titre: 'La cave de talus, les assemblages',
    desc: 'Quatre détails de la cave de talus. Le toit en travers : planches, isolant sec en couches croisées, écorce en bardeaux qui égoutte au-delà du mur, déblai, argile compactée en pente, neige. Le pied de la paroi : drain de pierre nette coiffé de branches de conifère, lit de pierre sous le plancher, perches refendues posées sur une bille. Le conduit fait d’un billot fendu, creusé et reficelé, fer-blanc percé sur le bout, sac bourré de paille comme bouchon. Le bord de la porte double, isolant entre deux épaisseurs, joint de boyau d’arrosage fendu cloué au cadre.',
    format: 'pleine',
    disposition: [['toit', 'conduit'], ['pied', 'porte']],
    hauteurs: [1, 1],
    largeurs: [[3, 2], [3, 2]],
    vues: {
      toit: {
        titre: 'Le toit, en travers',
        dessin: z => toit(),
        renvois: z => [
          { n: 3, rond: [292, 244], cible: [226.6, 244], texte: 'isolant sec en couches croisées' },
          { n: 4, rond: [298, 176], cible: [255, 158], texte: 'écorce en bardeaux, qui égoutte' },
          { n: 5, rond: [326, 138], cible: [322, 112.4], texte: 'argile compactée en pente' },
          { n: 6, rond: [150, 22], cible: [150, 70], texte: 'neige pelletée sur le toit' },
        ],
      },
      pied: {
        titre: 'Le pied de la paroi, en travers',
        dessin: z => pied(),
        renvois: z => [
          { n: 1, rond: [324, 172], cible: [291, 201.6], texte: 'drain coiffé de branches de conifère' },
          { n: 2, rond: [84, 120], cible: [84, 180.6], texte: 'perche refendue sur deux billes' },
        ],
      },
      conduit: {
        titre: 'Le conduit, fait d’un billot',
        dessin: z => conduit(),
        renvois: z => [
          { n: 7, rond: [172, 164], cible: [172, 116], texte: 'billot fendu, creusé à la gouge' },
          { n: 8, rond: [130, 152], cible: [96.6, 128], texte: 'moitiés reficelées au fil de fer' },
          { n: 9, rond: [130, 22], cible: [100.6, 21], texte: 'fer-blanc percé au clou' },
          { n: 10, rond: [130, 250], cible: [96.4, 249], texte: 'bouchon : sac bourré de paille' },
        ],
      },
      porte: {
        titre: 'Le bord de la porte, vu de dessus',
        dessin: z => porte(),
        renvois: z => [
          { n: 11, rond: [60, 214], cible: [60, 100], texte: 'deux épaisseurs, isolant entre' },
          { n: 12, rond: [220, 104], cible: [194.6, 156], texte: 'boyau d’arrosage fendu, cloué au cadre' },
        ],
      },
    },
  };
};
