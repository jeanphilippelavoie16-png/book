// Planche 16-07 — le téléphone à deux haut-parleurs (chapitre 16, « Le fil entre deux bâtiments,
// sans pile »).
//
// La charte : le dessous du cône de chaque haut-parleur à l'ombre ; les murs coupés et tramés,
// sans gris. Le rouge : appuyer sur le bouton, tirer le couteau le long du fil (le geste, un par
// vue). Pas de cercle : le relais, qu'on écoute au premier essai, est trop gros pour un point
// à contrôler, et son renvoi le nomme déjà.
module.exports = (h) => {
  const W = at => at.replace('fill="none"', 'fill="#ffffff"');
  const halo = 'fill="none" stroke="#ffffff" stroke-width="7" stroke-linecap="butt"';

  // Haut-parleur vu de trois quarts, la face à x = 0, le corps vers +x (s = -1 : miroir).
  // Bornes : a (44, 41), b (30, 49) dans son repère.
  const hp = (x, y, s) => {
    const P = (px, py) => `${x + s * px},${y + py}`;
    const R = (rx, ry, w, ht, at) => h.rect(s > 0 ? x + rx : x - rx - w, y + ry, w, ht, at);
    return [
      h.path(`M${P(0, 23.7)} L${P(58, 10.1)} L${P(58, 24)} L${P(0, 56)} Z`, h.a.ombre),   // sous une génératrice, à 25° sous l'axe
      h.path(`M${P(0, -56)} L${P(58, -24)} L${P(58, 24)} L${P(0, 56)}`, h.a.contour),
      h.path(`M${P(58, -26)} L${P(84, -26)} A6,26 0 0 ${s > 0 ? 1 : 0} ${P(84, 26)} L${P(58, 26)} Z`, W(h.a.contour)),
      h.ligne(x + s * 66, y - 26, x + s * 66, y + 26, h.a.detail),
      h.ligne(x + s * 76, y - 26, x + s * 76, y + 26, h.a.detail),
      h.ellipse(x, y, 17, 56, W(h.a.contour)),
      h.ellipse(x + s * 2, y, 13, 46, h.a.detail),
      h.ellipse(x + s * 3.5, y, 10, 38, h.a.detail),
      h.ellipse(x + s * 7, y, 4.5, 13, h.a.arete),
      R(41.5, 31, 5, 10, W(h.a.arete)),
      R(27.5, 39, 5, 10, W(h.a.arete)),
    ].join('\n');
  };

  // Couteau, lame vers +x, tranchant en bas ; posé par sa pointe sur (px, py), incliné de rot degrés.
  const couteau = (px, py, rot) => {
    const c = Math.cos(rot * Math.PI / 180), s = Math.sin(rot * Math.PI / 180);
    const pts = [[118, -10]];
    for (let t = 0; t <= 1; t += 0.05) {
      const u = 1 - t;
      pts.push([u * u * 118 + 2 * u * t * 104 + t * t * 72, u * u * -10 + 2 * u * t * 3 + t * t * 2]);
    }
    let bas = null;
    for (const [x, y] of pts) {
      const X = x * c - y * s, Y = x * s + y * c;
      if (!bas || Y > bas[1]) bas = [X, Y];
    }
    const tx = px - bas[0], ty = py - bas[1];
    const T = (x, y) => [x * c - y * s + tx, x * s + y * c + ty];
    const P = (x, y) => T(x, y).map(v => v.toFixed(1)).join(',');
    return [
      h.path(`M${P(-4, -23)} L${P(-78, -25)} Q${P(-90, -12)} ${P(-78, 0)} L${P(-4, -3)} Z`, W(h.a.contour)),
      h.cercle(...T(-28, -12), 2.2, h.a.detail),
      h.cercle(...T(-56, -12), 2.2, h.a.detail),
      h.path(`M${P(0, -24)} L${P(96, -24)} Q${P(110, -22)} ${P(118, -10)} Q${P(104, 3)} ${P(72, 2)} L${P(0, 0)} Z`, W(h.a.contour)),
      h.path(`M${P(4, -7)} L${P(70, -6)} Q${P(96, -5)} ${P(112, -12)}`, h.a.detail),
      h.path(`M${P(-4, -30)} L${P(2, -30)} L${P(2, 6)} L${P(-4, 6)} Z`, W(h.a.arete)),
    ].join('\n');
  };

  // Deux fils torsadés l'un sur l'autre, de x0 à x1, centrés sur cy.
  const torsade = (cy, x0, x1) => {
    const pas = 20, amp = 5;
    const sin = (x, sg) => [x, cy + sg * amp * Math.sin(2 * Math.PI * (x - x0) / pas)];
    const brin = (a, b, sg) => { const p = []; for (let x = a; x <= b + 0.01; x += 1) p.push(sin(x, sg)); return p; };
    const out = [
      h.chemin([[10, cy], [x0, cy]].concat(brin(x0, x1, 1)).concat([[x1 + 8, cy - 9]]), h.a.contour),
      h.chemin([[279, cy], [x1, cy]].concat(brin(x0, x1, -1).reverse()).concat([[x0 - 8, cy + 9]]), h.a.contour),
    ];
    for (let i = 1; i < (x1 - x0) / (pas / 2); i++) {
      const xc = x0 + i * pas / 2, sg = i % 2 ? 1 : -1;
      const seg = brin(xc - 4, xc + 4, sg);
      out.push(h.chemin(seg, halo), h.chemin(seg, h.a.contour));
    }
    return out.join('\n');
  };

  return {
    ref: '16-07',
    titre: 'Le téléphone à deux haut-parleurs',
    desc: 'Deux haut-parleurs de récupération reliés borne à borne par deux fils tirés haut entre deux bâtiments. Deux autres fils vont d’un bouton à lamelle à la bobine d’un relais d’auto posé contre la batterie ; le contact du relais alimente le klaxon par des fils courts. Les deux paires ne se touchent nulle part. En détail, le bout du fil de bobinage gratté au couteau, puis l’épissure torsadée et rubanée.',
    format: 'pleine',
    disposition: [['cablage'], ['bout', 'epissure']],
    hauteurs: [3, 2],
    largeurs: [[1], [1, 1]],
    vues: {
      cablage: {
        titre: 'Le câblage, d’un bâtiment à l’autre',
        dessin: z => {
          const o = [];
          // la voix en haut, la sonnerie en bas, un écart entre les deux paires
          const FILS = [32, 43, 64, 75];
          // murs, percés de quatre passages
          for (const x of [180, 380]) {
            o.push(h.rect(x, 18, 16, 346, h.a.hachure('bois')));
            for (const y of FILS) o.push(h.rect(x - 1, y - 3, 18, 6, h.a.blanc));
          }
          // l'avant-toit de chaque bâtiment
          for (const r of [[[120, 0], [220, 22], [220, 28], [120, 6]], [[456, 0], [356, 22], [356, 28], [456, 6]]]) o.push(h.chemin(r, h.a.blanc, true), h.chemin(r, h.a.hachure('bois', 'contour'), true));
          // la neige soufflée contre les murs, dehors
          o.push(h.rect(196, 334, 184, 30, h.a.hachure('neige', 'aucun')));
          o.push(h.ligne(196, 334, 380, 334, h.a.arete));
          // le plancher de chaque bâtiment
          o.push(h.rect(0, 358, 180, 6, h.a.hachure('bois')), h.rect(396, 358, 204, 6, h.a.hachure('bois')));
          // les quatre fils dehors, pendus haut, avec la coupure de longueur
          for (const y of FILS) {
            const yb = y + 16;
            const xa = 278 + (yb - 42) / 4, xb = 298 + (yb - 42) / 4;
            o.push(h.path(`M196,${y} Q250,${yb} ${xa},${yb}`, h.a.arete));
            o.push(h.path(`M${xb},${yb} Q${xb + 44},${yb} 380,${y}`, h.a.arete));
          }
          o.push(h.ligne(273.5, 24, 292.5, 100, h.a.arete), h.ligne(293.5, 24, 312.5, 100, h.a.arete));

          // poste qui appelle : le haut-parleur sur la paire de voix seulement
          o.push(hp(50, 110, 1));
          o.push(h.chemin([[196, 32], [148, 32], [148, 170], [94, 170], [94, 151]], h.a.arete));
          o.push(h.chemin([[196, 43], [156, 43], [156, 184], [80, 184], [80, 159]], h.a.arete));
          // le bouton sur la paire de sonnerie seulement, une lame par fil
          o.push(h.chemin([[196, 64], [164, 64], [164, 245], [143, 245]], h.a.arete));
          o.push(h.chemin([[196, 75], [172, 75], [172, 290], [28, 290], [28, 244], [51, 244]], h.a.arete));
          o.push(h.rect(38, 250, 118, 22, h.a.hachure('bois', 'contour')));
          o.push(h.path('M52,248.5 L76,248.5 L90,230 L150,230', h.a.contour));
          o.push(h.rect(51, 241, 14, 7, W(h.a.arete)));
          o.push(h.rect(129, 241, 14, 9, W(h.a.arete)));
          o.push(h.geste('M112,202 L112,222'));

          // poste qui répond : le haut-parleur sur la paire de voix seulement
          o.push(hp(526, 110, -1));
          o.push(h.chemin([[396, 32], [428, 32], [428, 170], [482, 170], [482, 151]], h.a.arete));
          o.push(h.chemin([[396, 43], [420, 43], [420, 184], [496, 184], [496, 159]], h.a.arete));
          // la paire de sonnerie : un fil à la borne 85 du relais, l'autre à la borne − de la batterie
          o.push(h.chemin([[396, 64], [412, 64], [412, 204], [517, 204], [517, 259.5]], h.a.arete));
          o.push(h.chemin([[396, 75], [404, 75], [404, 286], [440, 286], [440, 296]], h.a.arete));
          // batterie, − à gauche, + à droite
          o.push(h.rect(426, 306, 168, 52, W(h.a.contour)));
          o.push(h.ligne(426, 316, 594, 316, h.a.arete));
          o.push(h.rect(436, 296, 16, 10, W(h.a.arete)), h.rect(570, 296, 16, 10, W(h.a.arete)));
          o.push(h.texte(444, 334, '−'), h.texte(578, 334, '+'));
          // relais d'auto posé sur la batterie, broches en l'air : 87, 85, 30, 86
          o.push(h.path('M487,306 L487,272 L492,267 L564,267 L564,301 L559,306 Z', W(h.a.contour)));
          o.push(h.path('M487,272 L559,272 L559,306 M559,272 L564,267', h.a.arete));
          [['87', 500], ['85', 517], ['30', 534], ['86', 551]].forEach(([n, x]) => {
            o.push(h.rect(x - 2.25, 259.5, 4.5, 10, W(h.a.arete)));
            o.push(h.texte(x - 2.5, 292, n));
          });
          // bobine : 86 à la borne + ; contact : + à 30, 87 au klaxon, klaxon à −, en fils courts et gros
          o.push(h.chemin([[551, 259.5], [551, 254], [574, 254], [574, 296]], h.a.arete));
          o.push(h.chemin([[534, 259.5], [534, 246], [582, 246], [582, 296]], h.a.contour));
          o.push(h.chemin([[486, 240], [500, 240], [500, 259.5]], h.a.contour));
          o.push(h.chemin([[448, 258], [448, 296]], h.a.contour));
          // klaxon en colimaçon, le pavillon vers le mur
          const kx = 458, ky = 234, kr = 19, k = kr / 26;
          o.push(h.cercle(kx, ky, kr, W(h.a.contour)));
          const sp = [];
          for (let t = 0; t <= 3 * Math.PI; t += 0.2) { const r = (4 + 2.1 * t) * k; sp.push([kx - r * Math.cos(t), ky + r * Math.sin(t)]); }
          o.push(h.chemin(sp, h.a.detail));
          o.push(h.chemin([[kx - 24 * k, ky - 9 * k], [kx - 44 * k, ky - 17 * k]], h.a.contour));
          o.push(h.chemin([[kx - 24 * k, ky + 10 * k], [kx - 44 * k, ky + 20 * k]], h.a.contour));
          o.push(h.ellipse(kx - 44 * k, ky + 1.5 * k, 5 * k, 18.5 * k, W(h.a.contour)));
          o.push(h.rect(kx + kr - 3, 237, 12, 6, W(h.a.arete)));
          o.push(h.rect(445, 246, 6, 12, W(h.a.arete)));
          return o.join('\n');
        },
        renvois: z => [
          { n: 1, rond: [22, 36], cible: [38.8, 68], texte: 'haut-parleur récupéré, des deux côtés' },
          { n: 2, rond: [232, 12], cible: [243.9, 44], texte: 'deux fils pour la voix, borne à borne' },
          { n: 3, rond: [22, 214], cible: [83, 239.3], texte: 'bouton sur les deux fils de sonnerie' },
          { n: 4, rond: [467, 284], cible: [492, 299], texte: 'relais : 85-86 sur la ligne, 30-87 vers le klaxon' },
          { n: 5, rond: [426, 264], cible: [444.6, 247.4], texte: 'klaxon 12 V, fils courts et gros' },
        ],
      },
      bout: {
        titre: 'Le bout du fil de bobinage',
        dessin: z => [
          h.path('M8,158 L186,158 L186,160 M186,166 L186,168 L8,168', h.a.contour),
          h.path('M8,158 q-4,2.5 0,5 q4,2.5 0,5', h.a.detail),
          h.path('M186,160 L236,160 L236,166 L186,166', h.a.contour),
          h.path('M214,177 q4,-4 8,-1 M226,187 q3,3 7,1 M208,192 q4,-3 7,1 M238,180 q3,3 6,0', h.a.detail),
          couteau(210, 158.8, 40),
          h.geste('M226,130 L266,130'),
        ].join('\n'),
        renvois: z => [
          { n: 6, rond: [140, 205], cible: [205, 167.2], texte: 'vernis gratté au couteau, deux bouts' },
        ],
      },
      epissure: {
        titre: 'L’épissure',
        dessin: z => {
          const cy2 = 150;
          const o = [torsade(70, 100, 200)];
          o.push(h.ligne(10, cy2, 92, cy2, h.a.contour), h.ligne(208, cy2, 279, cy2, h.a.contour));
          o.push(h.path(`M92,${cy2 - 10} L208,${cy2 - 10} A4,10 0 0 1 208,${cy2 + 10} L92,${cy2 + 10} A4,10 0 0 1 92,${cy2 - 10} Z`, W(h.a.contour)));
          for (let x = 100; x <= 196; x += 11) o.push(h.ligne(x, cy2 - 10, x + 7, cy2 + 10, h.a.detail));
          return o.join('\n');
        },
        renvois: z => [
          { n: 7, rond: [150, 200], cible: [150, 161.2], texte: 'épissure torsadée, rubanée, pendue haut' },
        ],
      },
    },
  };
};
