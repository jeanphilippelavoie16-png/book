// Planche 11-03. Le chalet paré aux braises (chapitre 11, « Faire de l'eau sous pression sans
// pompe » et « Fermer le bâtiment aux braises avec ce qui traîne »).
// Reprise le 15 octobre 2026 : le jute se dessine drapé (il avait l'air de sacs de sable), les gouttes
// semées sur le mur sont enlevées (on les prenait pour des clous), le dessous de galerie est fermé à la
// tôle (le chapitre le demande), le jute de la coupe est une bande de tissu (c'était un trait noir qu'on
// prenait pour un fil), la maille sous l'évent se voit en coupe (une rangée de fils).
//
// La charte : la porte, derrière la galerie, en gris loin (les barreaux passent devant) ; dans
// le bord du toit en coupe, le creux sous le chevron, là où l'évent laisse entrer l'air et la
// braise, en gris loin. Pas de rouge : aucune flèche n'est un geste (l'eau, l'air, le
// rayonnement restent noirs) et le chapitre ne donne pas de point à contrôler. L'eau liquide en
// bleu, h.a.hachure('eau') : le baril, le bas de mur tenu mouillé, les gouttes du boyau et du jute.
//
// Reprise le 19 octobre 2026 (second regard) : l'eau au pied du mur est une bande basse et plate, du sol
// jusque sous le trait du bas du mur, qui part de la bouche du boyau et s'amincit vers la gauche ; elle est
// peinte sous le contour du solage, donc le trait du bas du mur et la dernière planche restent entiers. Les
// gouttes du boyau sont dans la bande. Le renvoi 6 touche la bande à gauche des gouttes, juste sous sa surface ;
// le renvoi 5 touche le haut de la paroi du baril : sa ligne de rappel ne traverse plus l'eau (son liseré blanc
// y faisait une diagonale blanche).
module.exports = (h) => {
  const wf = at => at.replace('fill="none"', 'fill="#ffffff"');
  const n1 = v => Math.round(v * 10) / 10;
  // Le motif de l'eau calé de (tx, ty) : la forme est tracée décalée de (−tx, −ty) dans un groupe déplacé de
  // (tx, ty) ; elle reste en place, seules les vaguelettes du motif bougent. On cale pour qu'aucune vaguelette
  // ne soit coupée par le bord de la forme : un bout de vaguelette se lit comme un trait égaré.
  const eauCalee = (tx, ty, dessin) => `<g transform="translate(${tx} ${ty})">\n${dessin(-tx, -ty)}\n</g>`;
  // Une goutte en larme, la pointe en haut, en bleu cernée d'un trait fin (toute l'eau en bleu, JP, 19 octobre 2026).
  const goutte = (x, y, r = 1.3) => h.path(`M${n1(x)},${n1(y - 1.8 * r)} C${n1(x + 0.3 * r)},${n1(y - 0.9 * r)} ${n1(x + r)},${n1(y - 0.2 * r)} ${n1(x + r)},${n1(y + 0.5 * r)} A${r},${r} 0 0 1 ${n1(x - r)},${n1(y + 0.5 * r)} C${n1(x - r)},${n1(y - 0.2 * r)} ${n1(x - 0.3 * r)},${n1(y - 0.9 * r)} ${n1(x)},${n1(y - 1.8 * r)} Z`, h.a.hachure('eau', 'fin'));

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
  // Un jute trempé, drapé sur un rebord : le haut suit le rebord, l'ourlet pend en vagues sous lui, les
  // plis tombent droit. Pas de gouttes semées : on les prenait pour des clous.
  const drap = (x0, x1, yH, yB, graine) => {
    const r = alea(graine), pts = [[x0, yH], [x1, yH]];
    const m = Math.max(4, Math.round((x1 - x0) / 9));
    for (let i = 0; i <= m; i++) {
      const x = x1 - ((x1 - x0) * i) / m;
      pts.push([x, yB + (i % 2 ? 2.2 : -0.6) + r() * 1.2]);
    }
    let d = `M${n1(x0)},${n1(yH)} L${n1(x1)},${n1(yH)} L${n1(x1 + 1.2)},${n1(pts[2][1])}`;
    for (let i = 3; i < pts.length; i++) {
      const [px, py] = pts[i - 1], [qx, qy] = pts[i];
      d += ` Q${n1((px + qx) / 2)},${n1(Math.max(py, qy) + 2.2)} ${n1(qx)},${n1(qy)}`;
    }
    d += ` L${n1(x0 - 1.2)},${n1(pts[pts.length - 1][1])} Z`;
    const plis = [];
    const k = Math.floor((x1 - x0) / 16);
    for (let i = 1; i <= k; i++) {
      const x = x0 + ((x1 - x0) * i) / (k + 1) + (r() - 0.5) * 5;
      plis.push(h.path(`M${n1(x)},${yH + 2} Q${n1(x + 1.5)},${n1((yH + yB) / 2)} ${n1(x - 0.5)},${yB - 1}`, h.a.fin));
    }
    return [h.path(d, h.a.blanc), h.path(d, h.a.hachure('paille', 'aucun')), ...plis, h.path(d, h.a.arete)];
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
    // le solage ; le bas de mur tenu mouillé : une bande d'eau basse et plate au pied du mur, de la bouche du
    // boyau (410) vers la gauche, du sol (292) jusqu'à 283,5, sous le trait du bas du mur (280) ; peinte avant
    // le contour du solage, qui repasse sur elle. Calée de (0, 4) : une vaguelette entière, entre le bout aminci
    // et le renvoi 6.
    o.push(h.rect(60, 280, 360, 12, h.a.blanc));
    o.push(eauCalee(0, 4, (dx, dy) => {
      const p = (x, y) => `${n1(x + dx)},${n1(y + dy)}`;
      return h.path(`M${p(410, 283.5)} L${p(344, 283.5)} Q${p(334, 283.5)} ${p(330, 292)} L${p(410, 292)} Z`, h.a.hachure('eau', 'aucun'));
    }));
    o.push(h.rect(60, 280, 360, 12, h.a.arete));
    // porte, derrière la galerie
    o.push(h.rect(168, 148, 44, 110, h.a.loin), h.rect(168, 148, 44, 110, h.a.arete));
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
    o.push(...drap(66, 162, 119, 145, 11), ...drap(172, 296, 119, 146, 12), ...drap(306, 432, 119, 145, 13));
    // galerie : pieux, solive de rive, barreaux, lisses, poteaux, main courante
    [84, 150, 216].forEach(x => o.push(h.rect(x, 268, 8, 24, wf(h.a.arete))));
    o.push(h.rect(78, 258, 152, 10, wf(h.a.arete)), h.ligne(78, 261, 230, 261, h.a.fin));
    for (let x = 88; x < 222; x += 8) if (x + 2.5 < 151 || x > 157) o.push(h.rect(x, 209, 2.5, 40, wf(h.a.detail)));
    o.push(h.rect(78, 248, 152, 3, wf(h.a.arete)));
    [78, 151, 224].forEach(x => o.push(h.rect(x, 206, 6, 52, wf(h.a.arete))));
    o.push(h.rect(76, 204, 156, 5, wf(h.a.arete)));
    // le dessous de galerie, fermé une fois pour toutes à la tôle ondulée, vissée à la solive de rive
    o.push(h.rect(80, 268, 148, 23, wf(h.a.arete)));
    for (let x = 84; x < 226; x += 4) o.push(h.ligne(x, 268.6, x, 290.4, h.a.fin));
    // jute trempé sur le rebord de la galerie
    o.push(...drap(96, 148, 256, 278, 21));
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
    // le boyau, en deux traits : piqué au fond du baril, il descend et court au pied du mur
    o.push(h.path('M515,193.2 L496,193.2 Q487.2,193.2 487.2,202 L487.2,280 Q487.2,288.8 482,288.8 L410,288.8 L410,285.2 L482,285.2 Q490.8,285.2 490.8,280 L490.8,202 Q490.8,196.8 496,196.8 L515,196.8 Z', wf(h.a.arete)));
    [[404, 287.4], [399, 289.4], [394, 287.8]].forEach(([x, y]) => o.push(goutte(x, y)));
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
    // le creux sous le chevron, entre le soffite et le toit : vu par la coupe
    o.push(h.chemin([[44, 105.8], [150, 153.5], [44, 153.5]], h.a.loin, true));
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
    for (let x = 75; x <= 117; x += 2.6) o.push(h.cercle(x, 159.3, 0.85, h.a.plein));
    o.push(h.ligne(74, 159.3, 118, 159.3, h.a.fin));
    [77, 115].forEach(x => o.push(h.path(`M${x - 2},157.5 L${x - 2},161 L${x + 2},161 L${x + 2},157.5`, h.a.arete)));
    // l'air passe encore
    o.push(h.fleche('M96,190 L96,144', h.a.cache));
    // gouttière
    o.push(h.path('M157,141 L157,160 Q157,165 162,165 L184,165 Q190,165 191,159 L193,145', h.a.arete));
    o.push(h.cercle(193.6, 143.2, 1.8, h.a.arete));
    // jute trempé : une bande de tissu qui tapisse l'auge, passe la lèvre et pend dehors
    const axe = [[160.5, 145], [161, 153], [163.5, 159.6], [170, 161.2], [178, 160.6], [184.5, 157.6], [188.6, 152], [191, 144.5], [193.6, 140.6], [196.6, 141.6], [198, 146], [198.4, 160], [198.6, 172], [199.6, 181]];
    const ep = 1.9, gauche = [], droite = [];
    axe.forEach((p, i) => {
      const a = axe[Math.max(0, i - 1)], b = axe[Math.min(axe.length - 1, i + 1)];
      const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L;
      gauche.push([p[0] + nx * ep, p[1] + ny * ep]); droite.push([p[0] - nx * ep, p[1] - ny * ep]);
    });
    const bandeJute = [...gauche, ...droite.reverse()];
    o.push(h.chemin(bandeJute, h.a.blanc, true), h.chemin(bandeJute, h.a.hachure('paille', 'aucun'), true), h.chemin(bandeJute, h.a.arete, true));
    o.push(goutte(199.8, 188), goutte(199.2, 194));
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
    fichier: 'planche-11-03-chalet-pare-aux-braises.svg',
    desc: 'Le long pan d’un chalet, de face, paré pour le passage des braises. Du jute trempé est drapé sur la gouttière et pend sous son bord ; un autre est drapé sur le rebord de la galerie, dont le dessous est fermé par une tôle ondulée. La vitre est fermée par une tôle vissée dans le chambranle, de l’extérieur. À droite, un baril ouvert plein d’eau sur un échafaud, un boyau d’arrosage piqué au fond : il descend, court au sol et laisse couler un filet continu au pied du mur. Le baril est plus bas que la gouttière, c’est pour ça que la gouttière est tenue mouillée par le jute. En bas, trois détails : le bord du toit en coupe, avec le jute qui tapisse l’auge de la gouttière vidée et pend dehors, et la maille métallique fine agrafée sous l’évent de soffite, que l’air traverse encore ; l’évent vu d’en dessous, la maille plus grande que lui et agrafée tout le tour ; la vitre en coupe, la tôle posée sur les chambranles du haut et du bas, vissée à travers eux, loin du verre, sous le rayonnement qui vient de dehors. Encadré danger : jamais de moustiquaire de nylon ni de bâche de plastique.',
    format: 'pleine',
    disposition: [['chalet'], ['bord', 'event', 'vitre']],
    hauteurs: [3, 2],
    largeurs: [[1], [5, 4, 4]],
    vues: {
      chalet: {
        titre: 'Le chalet, de face',
        dessin: chalet,
        renvois: z => [
          { n: 1, rond: T([458, 104]), cible: T([426, 131]), texte: 'jute trempé sur la gouttière' },
          { n: 2, rond: [20, 196], cible: T([108, 262]), texte: 'jute trempé sur la galerie' },
          { n: 3, rond: [20, 268], cible: T([84, 282]), texte: 'dessous de galerie fermé à la tôle' },
          { n: 4, rond: T([458, 172]), cible: T([399, 180]), texte: 'tôle vissée sur la vitre' },
          { n: 5, rond: [578, 112], cible: T([543, 151]), texte: 'baril en hauteur, boyau au fond' },
          { n: 6, rond: T([458, 240]), cible: T([384, 286]), texte: 'filet continu au pied du mur' },
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
