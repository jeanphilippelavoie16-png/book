// Planche 11-03 — le chalet paré aux braises (chapitre 11, « Faire de l'eau sous pression sans
// pompe » et « Fermer le bâtiment aux braises avec ce qui traîne »).
module.exports = (h) => {
  const wf = at => at.replace('fill="none"', 'fill="#ffffff"');
  const n1 = v => Math.round(v * 10) / 10;
  const tube = (w, c = '#000000') => `fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="butt" stroke-linejoin="round"`;
  const boyau = (d, w = 5) => [h.path(d, tube(w)), h.path(d, tube(n1(w - 2.4), '#ffffff'))];
  const goutte = (x, y) => h.ellipse(x, y, 1.1, 1.8, h.a.plein);
  const pointille = h.a.arete.replace('stroke-linecap="round"', 'stroke-linecap="butt" stroke-dasharray="1.4 1.4"');

  // Hasard reproductible.
  const alea = graine => {
    let s = graine >>> 0;
    return () => {
      s = (s + 0x6D2B79F5) >>> 0;
      let t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };
  // Contour fermé lissé par des quadratiques entre les milieux.
  const lisse = pts => {
    const n = pts.length, m = (p, q) => `${n1((p[0] + q[0]) / 2)},${n1((p[1] + q[1]) / 2)}`;
    let d = `M${m(pts[n - 1], pts[0])}`;
    pts.forEach((p, i) => { d += ` Q${n1(p[0])},${n1(p[1])} ${m(p, pts[(i + 1) % n])}`; });
    return d + ' Z';
  };
  // Un sac de jute trempé, drapé : dessus bosselé (le tissu tassé), bas ondulé, gouttes dessous.
  const sac = (x0, x1, yH, yB, graine, bosse = 3) => {
    const r = alea(graine), pts = [];
    const n = Math.max(3, Math.round((x1 - x0) / 12));
    for (let i = 0; i <= n; i++) pts.push([x0 + ((x1 - x0) * i) / n, yH - bosse * r()]);
    const m = Math.max(4, Math.round((x1 - x0) / 8));
    for (let i = 0; i <= m; i++) {
      const x = x1 - 1.5 - ((x1 - x0 - 3) * i) / m;
      pts.push([x, yB - 2 + 4 * r()]);
    }
    const d = lisse(pts), plis = [];
    for (let k = 1; k <= Math.floor((x1 - x0) / 22); k++) {
      const x = x0 + ((x1 - x0) * k) / (Math.floor((x1 - x0) / 22) + 1) + (r() - 0.5) * 6;
      plis.push(h.path(`M${n1(x)},${yH + 1} Q${n1(x + 3)},${n1((yH + yB) / 2)} ${n1(x - 1)},${yB - 2}`, h.a.fin));
    }
    const gouttes = [];
    for (let x = x0 + 8; x < x1 - 4; x += 22 + 10 * r()) gouttes.push(goutte(n1(x), n1(yB + 5 + 3 * r())));
    return [h.path(d, h.a.blanc), h.path(d, h.a.hachure('paille', 'aucun')), ...plis, h.path(d, h.a.arete), ...gouttes];
  };
  const planche = (pts, at = wf(h.a.arete)) => h.chemin(pts, at, true);

  // ── Le chalet, de face ─────────────────────────────────────────────────────
  // Élévation du long pan, environ 55 px au mètre. Sol à 292. Mur de 60 à 420, du soffite (136) au
  // solage (280). Toit de 78 à 122, gouttière de 121 à 136. Galerie à gauche (plancher à 258), vitre à
  // droite. Le baril est sur un échafaud à droite, fond à 198 : plus bas que la gouttière, il ne la
  // mouille pas ; il coule vers le bas de mur, et la bouche du boyau (287, au sol) est bien plus basse
  // que le fond du baril. Baril ouvert : l'air entre à mesure que l'eau sort.
  const G = 292;
  // La vue est agrandie de K autour du point (300, 300) pour remplir la bande sous le titre.
  const K = 1.12, T = ([x, y]) => [n1(300 + (x - 300) * K), n1(300 + (y - 300) * K)];
  const chalet = z => {
    const o = [];
    const sol = h.rect(0, 300 - 8 * K, z.l, 8 * K, h.a.hachure('terre', 'aucun')) + '\n' + h.ligne(0, 300 - 8 * K, z.l, 300 - 8 * K, h.a.arete);
    // toit
    o.push(h.rect(40, 78, 400, 44, h.a.blanc), h.ligne(40, 84, 440, 84, h.a.detail));
    for (let y = 91; y < 121; y += 7) o.push(h.ligne(40, y, 440, y, h.a.fin));
    o.push(h.rect(40, 78, 400, 44, h.a.contour));
    // mur, déclin
    o.push(h.rect(60, 136, 360, 144, h.a.blanc));
    for (let y = 143; y < 280; y += 7) o.push(h.ligne(60, y, 420, y, h.a.fin));
    o.push(h.rect(60, 136, 6, 144, wf(h.a.arete)), h.rect(414, 136, 6, 144, wf(h.a.arete)));
    o.push(h.rect(60, 280, 360, 12, wf(h.a.arete)));
    // porte, derrière la galerie
    o.push(h.rect(168, 148, 44, 110, wf(h.a.arete)));
    o.push(h.rect(175, 156, 30, 40, h.a.detail), h.rect(175, 204, 30, 46, h.a.detail));
    o.push(h.cercle(205, 206, 1.8, h.a.plein));
    // vitre : chambranle, appui, tôle ondulée vissée dans le chambranle
    o.push(h.rect(328, 144, 76, 72, wf(h.a.arete)), h.rect(336, 152, 60, 56, h.a.detail));
    o.push(h.rect(324, 216, 84, 5, wf(h.a.arete)));
    o.push(h.rect(331, 147, 70, 66, wf(h.a.arete)));
    for (let x = 337; x < 400; x += 6) o.push(h.ligne(x, 148, x, 212, h.a.fin));
    const vis = [];
    [333.5, 350, 366, 382, 398.5].forEach(x => { vis.push([x, 149.5], [x, 210.5]); });
    [170, 190].forEach(y => { vis.push([333.5, y], [398.5, y]); });
    vis.forEach(([x, y]) => o.push(h.cercle(x, y, 1.5, h.a.plein)));
    o.push(h.rect(60, 136, 360, 144, h.a.contour));
    // gouttière et descente
    o.push(h.rect(42, 121, 396, 15, wf(h.a.arete)), h.ligne(42, 124.5, 438, 124.5, h.a.fin));
    o.push(h.rect(62, 136, 6, 146, wf(h.a.arete)), h.rect(55, 282, 13, 6, wf(h.a.arete)));
    // jute trempé sur la gouttière, en trois longueurs
    o.push(...sac(72, 160, 121, 140, 11), ...sac(176, 290, 121, 141, 12), ...sac(304, 424, 121, 140, 13));
    // galerie : pieux, solive de rive, barreaux, lisses, poteaux, main courante
    [84, 150, 216].forEach(x => o.push(h.rect(x, 268, 8, 24, wf(h.a.arete))));
    o.push(h.rect(78, 258, 152, 10, wf(h.a.arete)), h.ligne(78, 261, 230, 261, h.a.fin));
    for (let x = 88; x < 222; x += 8) if (x + 2.5 < 151 || x > 157) o.push(h.rect(x, 209, 2.5, 40, wf(h.a.detail)));
    o.push(h.rect(78, 248, 152, 3, wf(h.a.arete)));
    [78, 151, 224].forEach(x => o.push(h.rect(x, 206, 6, 52, wf(h.a.arete))));
    o.push(h.rect(76, 204, 156, 5, wf(h.a.arete)));
    // jute trempé sur le rebord de la galerie
    o.push(...sac(92, 144, 255, 275, 21, 2));
    // le bas de mur tenu mouillé
    o.push(h.rect(350, 271, 62, 20, h.a.hachure('eau', 'aucun')));
    // échafaud
    const brace = (x1, y1, x2, y2) => {
      const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy), nx = (-dy / L) * 1.6, ny = (dx / L) * 1.6;
      return planche([[x1 + nx, y1 + ny], [x2 + nx, y2 + ny], [x2 - nx, y2 - ny], [x1 - nx, y1 - ny]]);
    };
    o.push(h.rect(498, 204, 6, 88, wf(h.a.arete)), h.rect(550, 204, 6, 88, wf(h.a.arete)));
    o.push(brace(504, 208, 550, 242), brace(550, 208, 504, 242));
    o.push(brace(504, 250, 550, 286), brace(550, 250, 504, 286));
    o.push(h.rect(498, 244, 58, 5, wf(h.a.arete)));
    o.push(h.rect(494, 198, 66, 6, wf(h.a.arete)));
    // baril ouvert, en coupe, plein d'eau
    o.push(h.rect(511, 150, 32, 48, h.a.blanc));
    o.push(h.rect(512, 158, 30, 39, h.a.hachure('eau', 'aucun')), h.ligne(511, 158, 543, 158, h.a.arete));
    o.push(h.chemin([[511, 150], [511, 198], [543, 198], [543, 150]], h.a.contour));
    [166, 182].forEach(y => o.push(h.ligne(508.5, y, 511, y, h.a.arete), h.ligne(543, y, 545.5, y, h.a.arete)));
    // boyau piqué au fond du baril, jusqu'au pied du mur
    o.push(...boyau('M515,195 L496,195 Q489,195 489,202 L489,280 Q489,287 482,287 L410,287'));
    [[404, 284.5], [399, 288], [394, 285.5]].forEach(([x, y]) => o.push(goutte(x, y)));
    o.push(h.fleche('M478,277 L446,277', h.a.arete));
    return sol + `\n<g transform="translate(${n1(300 - 300 * K)},${n1(300 - 300 * K)}) scale(${K})">\n` + o.join('\n') + '\n</g>';
  };

  // ── Le bord du toit, en coupe ──────────────────────────────────────────────
  // Intérieur à gauche. Chevron : dessous yb = 104 + 0,45 (x − 40), dessus yt = 69 + 0,45 x.
  // Soffite horizontal à 153,5 du déclin (44) à la bordure (150), évent ouvert de 84 à 108, maille
  // agrafée dessous. Le jute tapisse l'auge de la gouttière, passe le bord et pend dehors.
  const yt = x => 69 + 0.45 * x;
  const bord = z => {
    const o = [];
    o.push(h.rect(14, 112, 4, 84, wf(h.a.arete)));
    o.push(h.rect(18, 112, 22, 84, h.a.hachure('isolant')));
    o.push(h.rect(18, 104, 22, 8, h.a.hachure('bois')));
    o.push(h.rect(40, 104, 4, 92, wf(h.a.arete)));
    // chevron avec son entaille sur la sablière
    o.push(h.chemin([[4, yt(4)], [150, yt(150)], [150, 153.5], [40, 104], [18, 104], [18, 94.1], [4, 87.8]], h.a.hachure('bois'), true));
    // pontage et bardeau, qui débordent sur la gouttière
    o.push(h.chemin([[4, yt(4) - 7], [164, yt(164) - 7], [164, yt(164)], [4, yt(4)]], wf(h.a.arete), true));
    o.push(h.ligne(4, yt(4) - 3.5, 164, yt(164) - 3.5, h.a.fin));
    // bordure
    o.push(h.chemin([[150, yt(150)], [156, yt(156)], [156, 160], [150, 160]], h.a.hachure('bois'), true));
    // soffite, avec l'évent ouvert
    o.push(h.rect(44, 153.5, 40, 4, wf(h.a.arete)), h.rect(108, 153.5, 42, 4, wf(h.a.arete)));
    // maille métallique fine sous l'évent, agrafée
    o.push(h.ligne(74, 159.3, 118, 159.3, pointille));
    [77, 115].forEach(x => o.push(h.path(`M${x - 2},157.5 L${x - 2},161 L${x + 2},161 L${x + 2},157.5`, h.a.arete)));
    // l'air passe encore
    o.push(h.fleche('M96,190 L96,144', h.a.cache));
    // gouttière
    o.push(h.path('M157,141 L157,160 Q157,165 162,165 L184,165 Q190,165 191,159 L193,145', h.a.arete));
    o.push(h.cercle(193.6, 143.2, 1.8, h.a.arete));
    // jute trempé
    o.push(h.path('M160,146 C159,157 162,161.5 170,161.5 C178,161.5 185,159 188,153 C190,148 191,142 193.6,140 C196.5,138.3 198.5,141 198.5,146 L198.5,171 Q197.5,176 199.5,181',
      'fill="none" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"'));
    o.push(goutte(199.5, 187), goutte(198.6, 193));
    return o.join('\n');
  };

  // ── L'évent, vu d'en dessous ──────────────────────────────────────────────
  // Le mur en haut, la bordure et la gouttière en bas. L'évent (ses fentes en noir) est couvert par
  // une maille plus grande que lui, agrafée tout le tour.
  const fente = (x0, x1, y, e) => h.path(`M${x0 + e / 2},${y} L${x1 - e / 2},${y} A${e / 2},${e / 2} 0 0 1 ${x1 - e / 2},${y + e} L${x0 + e / 2},${y + e} A${e / 2},${e / 2} 0 0 1 ${x0 + e / 2},${y} Z`, h.a.plein);
  const event = z => {
    const o = [];
    o.push(h.rect(0, 8, z.l, 12, h.a.hachure('bois', 'aucun')), h.ligne(0, 20, z.l, 20, h.a.contour));
    for (let y = 32; y < 160; y += 12) o.push(h.ligne(0, y, z.l, y, h.a.fin));
    o.push(h.rect(0, 160, z.l, 8, wf(h.a.arete)), h.rect(0, 168, z.l, 18, wf(h.a.arete)), h.ligne(0, 183, z.l, 183, h.a.fin));
    o.push(h.rect(34, 62, 66, 50, wf(h.a.arete)));
    [67, 76, 85, 94, 103].forEach(y => o.push(fente(40, 94, y, 4.5)));
    o.push(h.rect(16, 44, 102, 86, h.a.hachure('grillage', 'arete')));
    const agrafe = (x, y, v) => (v ? h.rect(x - 0.7, y - 2.5, 1.4, 5, h.a.plein) : h.rect(x - 2.5, y - 0.7, 5, 1.4, h.a.plein));
    for (let x = 24; x <= 112; x += 14.5) o.push(agrafe(x, 47.5, false), agrafe(x, 126.5, false));
    for (let y = 58; y <= 118; y += 15) o.push(agrafe(19.5, y, true), agrafe(114.5, y, true));
    return o.join('\n');
  };

  // ── La vitre, en coupe ────────────────────────────────────────────────────
  // Coupe verticale, intérieur à gauche. La tôle (aplat noir) s'appuie sur le chambranle du haut et
  // celui du bas, qui la tiennent loin de la vitre ; une vis traverse chacun jusque dans l'ossature.
  const onde = (x0, x1, y) => {
    let d = `M${x0},${y}`;
    for (let x = x0 - 2, k = 1; x >= x1; x -= 2, k++) d += ` L${x},${n1(y + 2.4 * Math.sin((k * Math.PI) / 4))}`;
    return h.fleche(d, h.a.arete);
  };
  const vitre = z => {
    const o = [];
    // mur au-dessus : isolant, linteau ; au-dessous : sablière d'appui, isolant
    o.push(h.rect(44, 6, 24, 16, h.a.hachure('isolant')), h.rect(44, 22, 27, 18, h.a.hachure('bois')));
    o.push(h.rect(44, 150, 27, 6, h.a.hachure('bois')), h.rect(44, 156, 24, 34, h.a.hachure('isolant')));
    o.push(h.rect(68, 6, 3, 16, wf(h.a.arete)), h.rect(68, 156, 3, 34, wf(h.a.arete)));
    o.push(h.rect(40, 6, 4, 34, wf(h.a.arete)), h.rect(40, 150, 4, 40, wf(h.a.arete)));
    o.push(h.rect(71, 6, 5, 20, wf(h.a.arete)), h.rect(71, 166, 5, 24, wf(h.a.arete)));
    // châssis, vitre double
    o.push(h.rect(46, 40, 26, 6, h.a.hachure('bois')));
    o.push(h.chemin([[44, 144], [72, 144], [80, 147], [80, 150], [44, 150]], h.a.hachure('bois'), true));
    o.push(h.rect(53, 46, 12, 6, wf(h.a.arete)), h.rect(53, 138, 12, 6, wf(h.a.arete)));
    o.push(h.ligne(57, 52, 57, 138, h.a.arete), h.ligne(61, 52, 61, 138, h.a.arete));
    // chambranles
    o.push(h.rect(76, 26, 8, 20, h.a.hachure('bois')), h.rect(76, 150, 8, 16, h.a.hachure('bois')));
    // tôle
    o.push(h.rect(84, 20, 2.5, 152, h.a.plein));
    // vis
    [36, 158].forEach(y => {
      o.push(h.rect(70, y - 0.8, 17, 1.6, h.a.plein));
      o.push(h.path(`M86.5,${y - 3} Q90.5,${y - 3} 90.5,${y} Q90.5,${y + 3} 86.5,${y + 3} Z`, h.a.plein));
    });
    // le rayonnement arrive de dehors
    o.push(onde(160, 100, 82), onde(160, 100, 116));
    return o.join('\n');
  };

  return {
    ref: '11-03',
    titre: 'Le chalet paré aux braises',
    desc: 'Le long pan d’un chalet, de face, paré pour le passage des braises. Des sacs de jute trempés couvrent la gouttière et pendent sur son bord ; un autre est posé sur le rebord de la galerie. La vitre est fermée par une tôle vissée dans le chambranle, de l’extérieur. À droite, un baril ouvert plein d’eau sur un échafaud, un boyau d’arrosage piqué au fond : il descend, court au sol et laisse couler un filet continu au pied du mur. Le baril est plus bas que la gouttière, c’est pour ça que la gouttière est tenue mouillée par le jute. En bas, trois détails : le bord du toit en coupe, avec le jute qui tapisse l’auge de la gouttière vidée et pend dehors, et la maille métallique fine agrafée sous l’évent de soffite, que l’air traverse encore ; l’évent vu d’en dessous, la maille plus grande que lui et agrafée tout le tour ; la vitre en coupe, la tôle posée sur les chambranles du haut et du bas, vissée à travers eux, loin du verre, sous le rayonnement qui vient de dehors. Encadré danger : jamais de moustiquaire de nylon ni de bâche de plastique.',
    format: 'pleine',
    disposition: [['chalet'], ['bord', 'event', 'vitre']],
    hauteurs: [3, 2],
    largeurs: [[1], [5, 4, 4]],
    vues: {
      chalet: {
        titre: 'Le chalet, de face',
        dessin: chalet,
        renvois: z => [
          { n: 1, rond: T([458, 104]), cible: T([418, 133]), texte: 'jute trempé sur la gouttière' },
          { n: 2, rond: [20, 222], cible: T([98, 267]), texte: 'jute trempé sur la galerie' },
          { n: 3, rond: T([458, 164]), cible: T([399, 180]), texte: 'tôle vissée sur la vitre' },
          { n: 4, rond: [578, 112], cible: T([530, 180]), texte: 'baril plein, en hauteur' },
          { n: 5, rond: T([458, 216]), cible: T([491, 199]), texte: 'boyau piqué au fond' },
          { n: 6, rond: T([458, 254]), cible: T([392, 284]), texte: 'filet continu au pied du mur' },
        ],
      },
      bord: {
        titre: 'Le bord du toit, en coupe',
        dessin: bord,
        renvois: z => [
          { n: 7, rond: [202, 124], cible: [172, 161.5], texte: 'jute dans la gouttière vidée' },
          { n: 8, rond: [142, 184], cible: [110, 159.3], texte: 'maille de métal sous l’évent' },
        ],
      },
      event: {
        titre: 'L’évent, vu d’en dessous',
        dessin: event,
        renvois: z => [
          { n: 9, rond: [148, 80], cible: [109, 88], texte: 'maille qui déborde l’évent' },
          { n: 10, rond: [148, 140], cible: [111.5, 126.5], texte: 'agrafée ou vissée autour' },
        ],
      },
      vitre: {
        titre: 'La vitre, en coupe',
        dessin: vitre,
        renvois: z => [
          { n: 11, rond: [150, 36], cible: [86, 60], texte: 'tôle, solin ou contreplaqué' },
          { n: 12, rond: [150, 166], cible: [89, 158], texte: 'vissé dans le chambranle' },
        ],
      },
    },
    danger: 'Jamais de moustiquaire de nylon ni de bâche de plastique : le nylon fond avant que la braise arrive et agrandit le trou, la bâche fond et coule en gouttes enflammées.',
  };
};
