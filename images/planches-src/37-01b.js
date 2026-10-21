// Planche 37-01b — La cage à pierres de la truie de sauna (ch. 37, section 5-A, étape 6, et 5-B,
// étapes 13 et 15).
// Ce que le chapitre donne : le caisson de sable déborde de chaque côté du baril pour porter deux
// piles de pierres sèches éprouvées au feu, un peu plus hautes que lui ; deux ou trois barres de fer
// posées d'une pile à l'autre passent au-dessus du baril ; le fond de treillis ou de fers croisés
// repose sur elles ; quatre fers debout, liés aux barres, tiennent le tas sur les côtés ; à froid, la
// main passe à plat entre le fond de la cage et la tôle ; les pierres restent sur le baril, pas
// autour du tuyau ; ni treillis ni fil galvanisés ; pierres de 10 à 15 cm, grosses en bas, petites en
// haut, de l'air entre toutes ; écran de tôle avec jeu d'air ; rampe de fer entre la truie et le
// passage.
// Cotes : « une main » (le jeu sous la cage) et 100 à 150 (les pierres). Aucune autre : le chapitre
// ne donne ni la section des barres, ni la hauteur des piles, ni celle de la rampe.
// La charte : l'intérieur du baril et du tuyau, vu par les coupes, en gris loin. Pas de gris sur la
// vue de dessus ni sur le coin en grand. Le rouge : le dessus du baril sous la cage, le point à
// regarder chaque saison (la rouille perce là, sous les pierres).
// Même repère que la planche a : x le long du baril (0 = bout gauche du caisson), y du mur du fond
// vers le passage, h au-dessus du plancher, en millimètres.
module.exports = (h) => {
  const A = h.a;
  const W = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const f = v => Math.round(v * 10) / 10;
  const S = 0.165;

  const alea = g => { let t = g * 7919 % 233280; return () => { t = (t * 9301 + 49297) % 233280; return t / 233280; }; };
  const caillou = (cx, cy, rx, ry, g, at = W(A.arete)) => {
    const r = alea(g), n = 8, p = [];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * 2 * Math.PI + (r() - 0.5) * 0.35, k = 0.87 + r() * 0.18;
      p.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]);
    }
    let d = `M${f(p[0][0])} ${f(p[0][1])}`;
    for (let i = 0; i < n; i++) {
      const p0 = p[(i - 1 + n) % n], p1 = p[i], p2 = p[(i + 1) % n], p3 = p[(i + 2) % n];
      d += ` C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
    }
    return h.path(d + ' Z', at);
  };

  // repères communs : la coupe longue et la vue de dessus partagent X ; les deux coupes, Y
  const XL = z => x => (z.l - 1710 * S) / 2 + (x + 170) * S;
  const YH = z => t => z.h - 8 - (t + 170) * S;
  // la vue de détail : son échelle, le point de la coupe au travers qu'elle centre, son rayon
  // (le même cercle est tracé sur la coupe au travers, pour dire d'où elle sort)
  const SG = 0.8, CY = 560, CT = 925, RG = 140;

  // une pile de pierres sèches, en assises décalées, vue en coupe au travers (y horizontal)
  const pileCoupe = (X, Y, y1, y2, g) => {
    const o = [];
    const assises = [[150, 270], [270, 390], [390, 510], [510, 630], [630, 750], [750, 870]];
    assises.forEach(([t1, t2], i) => {
      const parts = i % 2 ? [[y1, (y1 + y2) / 2 - 10], [(y1 + y2) / 2 - 10, y2]] : [[y1, y1 + 90], [y1 + 90, y2]];
      for (const [a, b] of parts) o.push(caillou(X((a + b) / 2), Y((t1 + t2) / 2), (b - a) / 2 * S, (t2 - t1) / 2 * S, g++));
    });
    return o.join('\n');
  };

  // ── En coupe sur la longueur (regard vers le mur du fond) ────────────────────────────────
  const long = z => {
    const X = XL(z), Y = YH(z);
    const R = (x1, t1, x2, t2, at) => h.rect(X(x1), Y(t2), (x2 - x1) * S, (t2 - t1) * S, at);
    const L = (x1, t1, x2, t2, at) => h.ligne(X(x1), Y(t1), X(x2), Y(t2), at);
    const o = [];
    // plancher, caisson de sable
    o.push(R(-150, -80, 1230, 0, A.hachure('bois', 'arete')));
    o.push(R(0, 0, 1080, 150, A.hachure('gravier', 'aucun')), L(20, 150, 1060, 150, A.detail));
    o.push(R(0, 0, 20, 165, W(A.arete)), R(1060, 0, 1080, 165, W(A.arete)));
    // l'intérieur du baril et du tuyau, vu par la coupe : gris loin, au-dessus du lit de sable
    o.push(R(100, 340, 980, 820, A.loin));
    o.push(h.chemin([[125, 820], [125, 1431.7], [165, 1445], [235, 1415], [275, 1428.3], [275, 820]].map(([x, t]) => [X(x), Y(t)]), A.loin, true));
    // la pile du fond, loin derrière la coupe : un simple contour tireté, sans motif, pour que
    // le jeu entre le dessus du baril et le fond de la cage reste de l'air
    o.push(h.chemin([[X(430), Y(150)], [X(430), Y(870)], [X(970), Y(870)], [X(970), Y(150)]], A.cache));
    // pattes
    for (const x of [180, 900]) o.push(R(x - 25, 150, x + 25, 250, W(A.arete)));
    // lit de sable dans le fond du baril
    o.push(R(108, 250, 972, 340, A.hachure('gravier', 'aucun')), L(108, 340, 972, 340, A.fin));
    // la coque coupée
    o.push(L(100, 250, 980, 250, A.contour), L(100, 820, 125, 820, A.contour), L(275, 820, 980, 820, A.contour));
    o.push(L(100, 250, 100, 820, A.contour), L(980, 250, 980, 380, A.contour), L(980, 660, 980, 820, A.contour));
    o.push(R(980, 380, 1004, 660, W(A.arete)), R(1004, 500, 1060, 540, A.plein));        // porte et sa barre
    for (const x of [393, 687]) {
      o.push(h.path(`M${f(X(x - 40))} ${f(Y(820))} Q${f(X(x))} ${f(Y(848))} ${f(X(x + 40))} ${f(Y(820))}`, A.arete));
      o.push(h.path(`M${f(X(x - 40))} ${f(Y(250))} Q${f(X(x))} ${f(Y(222))} ${f(X(x + 40))} ${f(Y(250))}`, A.arete));
    }
    // le tuyau, au bout opposé à la porte, coupé par un trait de rupture
    o.push(L(125, 820, 125, 1420, A.contour), L(275, 820, 275, 1440, A.contour));
    o.push(h.path(`M${f(X(105))} ${f(Y(1425))} L${f(X(165))} ${f(Y(1445))} L${f(X(235))} ${f(Y(1415))} L${f(X(295))} ${f(Y(1435))}`, A.detail));
    // les deux fers debout du fond, les trois barres coupées, le fond de treillis
    for (const x of [510, 890]) o.push(R(x - 10, 870, x + 10, 1285, W(A.arete)));
    for (const x of [510, 700, 890]) o.push(R(x - 13, 870, x + 13, 895, A.plein));
    o.push(L(465, 897, 935, 897, A.arete));
    for (let x = 490; x < 935; x += 50) o.push(h.cercle(X(x), Y(900), 0.9, A.plein));
    // le point à contrôler : le dessus du baril, sous la cage, là où l'eau des pierres le perce
    o.push(h.controle(X(700), Y(838), 15));
    // les pierres : grosses en bas, petites en haut, de l'air entre toutes
    const pierres = [
      [540, 962, 70, 60], [685, 958, 68, 58], [830, 962, 70, 60],
      [612, 1070, 60, 50], [755, 1072, 60, 50], [880, 1060, 42, 44], [490, 1062, 40, 44],
      [680, 1165, 52, 46], [820, 1160, 44, 40], [555, 1162, 44, 40],
      [690, 1245, 44, 36],
    ];
    pierres.forEach(([x, t, rx, ry], i) => o.push(caillou(X(x), Y(t), rx * S, ry * S, i + 11)));
    // le jeu sous la cage : la main à plat
    o.push(L(985, 820, 1045, 820, A.fin), L(906, 870, 1045, 870, A.fin));
    o.push(h.cote(X(1030), Y(870), X(1030), Y(820), 'une main', { cote: 'droite' }));
    // trait de la coupe au travers, flèches vers la porte
    for (const [t1, t2] of [[1345, 1440], [-95, -165]]) {
      o.push(L(700, t1, 700, t2, A.contour));
      o.push(h.fleche(`M${f(X(700))} ${f(Y((t1 + t2) / 2))} L${f(X(800))} ${f(Y((t1 + t2) / 2))}`, A.arete));
    }
    return o.join('\n');
  };

  // ── En coupe au travers, par la barre du milieu, regard vers la porte ─────────────────────
  const bout = z => {
    const X = y => (z.l - 1650 * S) / 2 + (y + 170) * S, Y = YH(z);
    const R = (y1, t1, y2, t2, at) => h.rect(X(y1), Y(t2), (y2 - y1) * S, (t2 - t1) * S, at);
    const L = (y1, t1, y2, t2, at) => h.ligne(X(y1), Y(t1), X(y2), Y(t2), at);
    const o = [];
    // mur du fond coupé, plancher
    o.push(R(-150, -80, 0, 1480, A.hachure('bois', 'arete')), R(0, -80, 1480, 0, A.hachure('bois', 'arete')));
    // écran de tôle décollé du mur ; l'air monte dans le jeu
    o.push(L(45, 60, 45, 1480, A.arete));
    for (const t of [250, 1000]) o.push(R(0, t, 45, t + 40, A.plein));
    o.push(h.fleche(`M${f(X(22))} ${f(Y(420))} L${f(X(22))} ${f(Y(900))}`, A.cache));
    // caisson de sable
    o.push(R(100, 0, 1290, 150, A.hachure('gravier', 'aucun')), L(120, 150, 1270, 150, A.detail));
    o.push(R(100, 0, 120, 165, W(A.arete)), R(1270, 0, 1290, 165, W(A.arete)));
    // les deux piles
    o.push(pileCoupe(X, Y, 130, 380, 100), pileCoupe(X, Y, 1010, 1260, 140));
    // pattes du bout, baril coupé : lit de sable, la porte vue de l'intérieur
    // chaque patte monte jusqu'à la tôle, soudée : le cercle blanc du baril couvre ce qui dépasse
    for (const y of [475, 915]) o.push(R(y - 20, 150, y + 20, 395, W(A.arete)));
    // l'intérieur du baril, vu par la coupe : gris loin ; le lit de sable reste blanc
    o.push(h.cercle(X(695), Y(535), 285 * S, A.loin));
    const c = Math.sqrt(285 * 285 - 195 * 195);
    const sable = `M${f(X(695 - c))} ${f(Y(340))} A${f(285 * S)} ${f(285 * S)} 0 0 0 ${f(X(695 + c))} ${f(Y(340))} Z`;
    o.push(h.path(sable, A.blanc), h.path(sable, A.hachure('gravier', 'fin')));
    o.push(h.cercle(X(695), Y(535), 285 * S, A.contour));
    // fers debout du bout (derrière la barre coupée), barre du milieu coupée en long, treillis
    for (const y of [440, 950]) o.push(R(y - 10, 870, y + 10, 1285, W(A.arete)));
    o.push(R(150, 870, 1240, 895, A.plein));
    o.push(L(425, 897, 965, 897, A.arete));
    for (let y = 450; y < 965; y += 50) o.push(h.cercle(X(y), Y(900), 0.9, A.plein));
    const pierres = [
      [495, 962, 68, 60], [632, 958, 68, 58], [768, 962, 68, 60], [900, 958, 64, 58],
      [562, 1070, 60, 50], [698, 1072, 60, 50], [835, 1068, 60, 50],
      [628, 1165, 52, 46], [768, 1162, 52, 44],
      [698, 1245, 44, 36],
    ];
    pierres.forEach(([y, t, ry, rt], i) => o.push(caillou(X(y), Y(t), ry * S, rt * S, i + 31)));
    // rampe de fer : poteau, main courante coupée
    o.push(R(1360, 0, 1400, 830, W(A.arete)), h.cercle(X(1380), Y(852), 24 * S, W(A.contour)));
    // le coin agrandi dans « Un coin de la cage, en grand »
    o.push(h.cercle(X(CY), Y(CT), RG / SG * S, A.detail));
    return o.join('\n');
  };

  // ── Vue de dessus ────────────────────────────────────────────────────────────────────────
  const dessus = z => {
    const X = XL(z), Y = y => (z.h - 1600 * S) / 2 + (y + 40) * S;
    const R = (x1, y1, x2, y2, at) => h.rect(X(x1), Y(y1), (x2 - x1) * S, (y2 - y1) * S, at);
    const L = (x1, y1, x2, y2, at) => h.ligne(X(x1), Y(y1), X(x2), Y(y2), at);
    const o = [];
    o.push(R(0, 100, 1080, 1290, A.hachure('gravier', 'arete')), R(20, 120, 1060, 1270, A.detail));
    // piles, vues de dessus
    let g = 200;
    for (const [y1, y2] of [[130, 380], [1010, 1260]]) {
      o.push(R(430, y1, 970, y2, W(A.detail)));
      for (const yy of [y1 + 64, y2 - 64]) for (let x = 500; x < 960; x += 135) o.push(caillou(X(x + (g % 2 ? 14 : -6)), Y(yy), 64 * S, 58 * S, g++));
    }
    // baril, cerceaux, porte ; tuyau libre au bout opposé
    o.push(R(100, 410, 980, 980, W(A.contour)));
    for (const x of [393, 687]) o.push(L(x, 410, x, 980, A.detail));
    o.push(R(980, 555, 1004, 835, A.plein), R(1004, 675, 1060, 715, A.plein));
    o.push(h.cercle(X(200), Y(695), 75 * S, W(A.contour)), h.cercle(X(200), Y(695), 62 * S, A.fin));
    // barres d'une pile à l'autre, fond de treillis, fers debout aux quatre coins, pierres
    for (const x of [510, 700, 890]) o.push(R(x - 13, 150, x + 13, 1240, A.plein));
    o.push(R(465, 425, 935, 965, A.hachure('grillage', 'arete')));
    const dessusP = [
      [535, 505, 62], [680, 495, 66], [835, 510, 64],
      [560, 650, 60], [705, 640, 58], [860, 660, 56],
      [530, 800, 58], [680, 800, 64], [830, 790, 60],
      [590, 915, 44], [740, 920, 46], [880, 910, 40],
    ];
    dessusP.forEach(([x, y, r], i) => o.push(caillou(X(x), Y(y), r * S, r * 0.88 * S, i + 240)));
    for (const [x, y] of [[510, 440], [510, 950], [890, 440], [890, 950]]) o.push(R(x - 12, y - 12, x + 12, y + 12, A.plein));
    // rampe
    o.push(R(-150, 1362, 1080, 1398, W(A.arete)));
    for (const x of [-120, 480, 1050]) o.push(h.cercle(X(x), Y(1380), 28 * S, A.plein));
    // traits de coupe : la longue (flèches vers le fond), la coupe au travers (flèches vers la porte)
    for (const [x1, x2] of [[-165, -60], [1140, 1245]]) {
      o.push(L(x1, 695, x2, 695, A.contour));
      o.push(h.fleche(`M${f(X((x1 + x2) / 2))} ${f(Y(695))} L${f(X((x1 + x2) / 2))} ${f(Y(560))}`, A.arete));
    }
    for (const [y1, y2] of [[5, 85], [1420, 1500]]) {
      o.push(L(700, y1, 700, y2, A.contour));
      o.push(h.fleche(`M${f(X(700))} ${f(Y((y1 + y2) / 2))} L${f(X(800))} ${f(Y((y1 + y2) / 2))}`, A.arete));
    }
    return o.join('\n');
  };

  // ── Un coin de la cage, en grand (même regard que la coupe au travers) ───────────────────
  const lig = z => {
    const cx = z.l / 2, cy = z.h / 2;
    const X = y => cx + (y - CY) * SG, Y = t => cy - (t - CT) * SG;
    const R = (y1, t1, y2, t2, at) => h.rect(X(y1), Y(t2), (y2 - y1) * SG, (t2 - t1) * SG, at);
    const P = ([y, t]) => `${f(X(y))} ${f(Y(t))}`;
    const trace = (pts, at) => h.path(pts.map((p, i) => `${i ? 'L' : 'M'}${P(p)}`).join(' '), at);
    const o = [];
    // le dessus du baril, sa tôle
    o.push(h.cercle(X(695), Y(535), 285 * SG, W(A.contour)), h.cercle(X(695), Y(535), 279 * SG, A.fin));
    // la barre, posée sur les piles, qui passe au-dessus du baril sans le toucher
    o.push(R(381, 870, 800, 895, W(A.arete)), R(381, 870, 800, 895, A.hachure('metal', 'arete')));
    // le treillis posé sur la barre
    o.push(h.ligne(X(440), Y(898), X(800), Y(898), A.arete));
    for (let y = 450; y < 800; y += 50) o.push(h.cercle(X(y), Y(900), 1.6, A.plein));
    // le fer debout, devant la barre
    o.push(R(430, 845, 450, 1095, W(A.arete)));
    // la ligature : trois tours en huit. Chaque tour passe en « / » devant le fer, plie par-dessus
    // la barre et descend derrière elle à droite du fer, repasse en « \ » devant le fer, plie
    // sous la barre... et remonte derrière elle à gauche. Les tours se posent l'un au-dessus de
    // l'autre le long du fer ; derrière la barre, le fil est caché (tireté court). Chaque pli est
    // arrondi et reste hors de la barre.
    const tours = [-1, 0, 1].map(k => ({
      UL: [423 - 3 * k, 905 + 7 * k], LR: [457 + 3 * k, 860 + 7 * k],
      UR: [457 + 3 * k, 905 + 7 * k], LL: [423 - 3 * k, 860 + 7 * k],
    }));
    const court = A.detail.replace('fill="none"', 'fill="none" stroke-dasharray="1.3 1.9"');
    const RP = 3;                                                     // le rayon d'un pli, en mm
    const vers = (a, b, d) => { const l = Math.hypot(b[0] - a[0], b[1] - a[1]); return [a[0] + (b[0] - a[0]) * d / l, a[1] + (b[1] - a[1]) * d / l]; };
    const pli = (a, c, b) => h.path(`M${P(a)} Q${P(c)} ${P(b)}`, A.detail);
    const milieuPli = (a, c, b) => [0.25 * a[0] + 0.5 * c[0] + 0.25 * b[0], 0.25 * a[1] + 0.5 * c[1] + 0.25 * b[1]];
    const derriere = (bas, haut) => {            // un passage derrière la barre, de bas en haut
      const y = bas[0];
      o.push(trace([bas, [y, 870]], A.detail), trace([[y, 870], [y, 895]], court), trace([[y, 895], haut], A.detail));
    };
    for (const t of tours) {
      const lr = [t.LR[0], t.LR[1] + RP], ur = [t.UR[0], t.UR[1] - RP], ll = [t.LL[0], t.LL[1] + RP], ul = [t.UL[0], t.UL[1] - RP];
      derriere(lr, ur); derriere(ll, ul);
      o.push(pli(vers(t.LR, t.UL, RP), t.LR, lr), pli(ur, t.UR, vers(t.UR, t.LL, RP)));
      o.push(pli(vers(t.LL, t.UR, RP), t.LL, ll), pli(ul, t.UL, vers(t.UL, t.LR, RP)));
      t.bout = milieuPli(ul, t.UL, vers(t.UL, t.LR, RP));
    }
    for (const t of tours) o.push(trace([vers(t.UL, t.LR, RP), vers(t.LR, t.UL, RP)], A.detail));
    // les « / » passent sur les « \ » : un blanc sous chacun, sur la largeur du paquet de « \ »
    const inter = (a, b, c, d) => {
      const r = [b[0] - a[0], b[1] - a[1]], s = [d[0] - c[0], d[1] - c[1]], den = r[0] * s[1] - r[1] * s[0];
      const u = ((c[0] - a[0]) * s[1] - (c[1] - a[1]) * s[0]) / den;
      return [a[0] + r[0] * u, a[1] + r[1] * u];
    };
    const blanc = `fill="none" stroke="#FFFFFF" stroke-width="4.2" stroke-linecap="butt"`;
    for (const tj of tours) {
      const xs = tours.map(ti => inter(ti.UL, ti.LR, tj.UR, tj.LL)).sort((p, q) => q[1] - p[1]);
      const a = xs[0], b = xs[xs.length - 1];
      o.push(trace([vers(a, b, -2.2), vers(b, a, -2.2)], blanc));
    }
    for (const t of tours) o.push(trace([vers(t.UR, t.LL, RP), vers(t.LL, t.UR, RP)], A.detail));
    // les deux bouts du fil sortent au coin du haut, tordus ensemble sur trois vrilles
    const T0 = [413, 915], T1 = [395, 938];
    o.push(trace([tours[0].bout, T0], A.detail), trace([tours[2].bout, T0], A.detail));
    const dv = [T1[0] - T0[0], T1[1] - T0[1]], Lv = Math.hypot(...dv), du = [dv[0] / Lv, dv[1] / Lv], nv = [-du[1], du[0]];
    for (const sg of [1, -1]) {
      const pts = [];
      for (let i = 0; i <= 48; i++) {
        const u = i / 48, a = sg * 2.3 * Math.sin(u * 6 * Math.PI);
        pts.push([T0[0] + dv[0] * u + nv[0] * a, T0[1] + dv[1] * u + nv[1] * a]);
      }
      pts.push([T1[0] + du[0] * 3.5 + nv[0] * sg * 2.4, T1[1] + du[1] * 3.5 + nv[1] * sg * 2.4]);
      o.push(trace(pts, A.detail));
    }
    // pierres : deux de la première assise, une de la deuxième
    o.push(caillou(X(535), Y(958), 75 * SG, 55 * SG, 411), caillou(X(702), Y(952), 70 * SG, 50 * SG, 412));
    o.push(caillou(X(700), Y(1056), 58 * SG, 46 * SG, 413));
    // cotes : la pierre ; le jeu d'une main, du dessous de la barre à la couronne du baril (un
    // trait de rappel tiré de la couronne, le dessous de la barre sert de rappel du haut)
    o.push(h.ligne(X(460), Y(962), X(460), Y(1052), A.fin), h.ligne(X(610), Y(962), X(610), Y(1052), A.fin));
    o.push(h.cote(X(460), Y(1040), X(610), Y(1040), '100 à 150'));
    o.push(h.ligne(X(695), Y(820), X(603), Y(820), A.fin));
    o.push(h.cote(X(615), Y(870), X(615), Y(820), 'une main', { cote: 'gauche' }));
    const clip = `<defs><clipPath id="zlig3701b"><circle cx="${f(cx)}" cy="${f(cy)}" r="${RG}"/></clipPath></defs>`;
    return `${clip}<g clip-path="url(#zlig3701b)">${o.join('\n')}</g>\n${h.cercle(cx, cy, RG, A.detail)}`;
  };

  return {
    ref: '37-01b',
    titre: 'La cage à pierres de la truie de sauna',
    desc: 'La truie couchée sur son caisson de sable ; de chaque côté, une pile de pierres sèches un peu plus haute que le baril ; trois barres de fer posées d’une pile à l’autre passent au-dessus du baril sans le toucher, avec le jeu d’une main ; le fond de treillis repose sur les barres, quatre fers debout liés aux barres tiennent le tas, grosses pierres en bas, petites en haut ; le tuyau, à l’autre bout, reste libre de pierres.',
    format: 'pleine',
    disposition: [['long', 'bout'], ['dessus', 'lig']],
    vues: {
      long: {
        titre: 'En coupe sur la longueur',
        dessin: long,
        renvois: z => {
          const X = XL(z), Y = YH(z);
          return [
            { n: 1, rond: [X(-50), Y(1180)], cible: [X(125), Y(1120)], texte: 'tuyau au bout opposé, libre de pierres' },
            { n: 2, rond: [X(370), Y(1070)], cible: [X(400), Y(822)], texte: 'dessus du baril, à regarder chaque saison' },
            { n: 3, rond: [X(1190), Y(1010)], cible: [X(930), Y(898)], texte: 'fond de treillis ou de fers croisés' },
            { n: 4, rond: [X(1100), Y(1220)], cible: [X(850), Y(1100)], texte: 'grosses pierres en bas, petites en haut' },
            { n: 5, rond: [X(-90), Y(330)], cible: [X(0), Y(100)], texte: 'caisson de sable, plus large que le baril' },
          ];
        },
      },
      bout: {
        titre: 'En coupe au travers, vers la porte',
        dessin: bout,
        renvois: z => {
          const X = y => (z.l - 1650 * S) / 2 + (y + 170) * S, Y = YH(z);
          return [
            { n: 6, rond: [X(250), Y(1150)], cible: [X(255), Y(820)], texte: 'pile de pierres sèches éprouvées au feu' },
            { n: 7, rond: [X(470), Y(1420)], cible: [X(448), Y(1270)], texte: 'fer debout, lié aux barres' },
            { n: 8, rond: [X(170), Y(1420)], cible: [X(47), Y(1300)], texte: 'écran de tôle, jeu d’air derrière' },
            { n: 9, rond: [X(1400), Y(1150)], cible: [X(1385), Y(880)], texte: 'rampe de fer, soudée ou boulonnée' },
          ];
        },
      },
      dessus: {
        titre: 'Vue de dessus',
        dessin: dessus,
        renvois: z => {
          const X = XL(z), Y = y => (z.h - 1600 * S) / 2 + (y + 40) * S;
          return [
            { n: 10, rond: [X(1210), Y(1180)], cible: [X(903), Y(1140)], texte: 'deux ou trois barres, d’une pile à l’autre' },
          ];
        },
      },
      lig: {
        titre: 'Un coin de la cage, en grand',
        dessin: lig,
        renvois: z => {
          const cx = z.l / 2, cy = z.h / 2;
          const X = y => cx + (y - CY) * SG, Y = t => cy - (t - CT) * SG;
          return [
            { n: 11, rond: [18, 22], cible: [X(404), Y(926.5)], texte: 'fil non galvanisé, ou décapé' },
          ];
        },
      },
    },
  };
};
