// Planche 26-08 — L'attelle d'écorce moulée, et l'écharpe au pan de chemise.
// Chapitre 27, section 9 : écorce de bouleau à papier trempée à l'eau chaude, moulée autour du
// membre et laissée sécher en gouttière ; l'articulation au-dessus et celle en dessous ;
// rembourrage de linge ou de mousse sèche sur l'os saillant ; attachée en trois points ; doigts
// à vérifier, desserrer au premier blanchiment. L'écharpe : le pan de la chemise relevé
// par-dessus l'avant-bras et épinglé au devant de la chemise.
// Depuis le 13 octobre au soir (JP : plus de corps de face), la vue de l'écharpe, un buste de face
// en chemise, est sortie de la planche : le corps simple ne se montre que de profil, et de profil
// l'avant-bras en écharpe passe en travers du ventre, vers l'œil, ce que le moteur ne dessine pas.
// « Mouler et attacher » est un gros plan de bras et de main : laissé tel quel (bibliothèque de mains
// à venir).
// Aucun chiffre sur le dessin : le chapitre n'en donne aucun pour l'attelle improvisée.
module.exports = (h) => {
  const BL = h.a.blanc.split(' ')[0];
  const plein = t => t.replace('fill="none"', BL);   // trait + fond blanc qui cache ce qui est dessous

  // Chaque vue est dessinée dans une boîte fixe, centrée dans la zone que donne le compositeur.
  // y0, y1 : ce que la boîte contient vraiment en hauteur.
  const boite = (z, L, y0, y1) => ({ ox: Math.round((z.l - L) / 2), oy: Math.min(Math.max(Math.round(z.h / 2 - (y0 + y1) / 2), -y0), 0 - y0 + Math.round(z.h - (y1 - y0)) ) });
  const g = (o, parts) => `<g transform="translate(${o.ox},${o.oy})">\n${parts.join('\n')}\n</g>`;
  const P = (o, x, y) => [x + o.ox, y + o.oy];

  // Lenticelles de l'écorce de bouleau : des fentes noires minces, couchées ou debout.
  const lent = (pts, debout) => pts.map(([x, y, r]) =>
    debout ? h.ellipse(x, y, 0.9, r || 5, h.a.plein) : h.ellipse(x, y, r || 5, 0.9, h.a.plein)).join('\n');

  // Point sur une ellipse, angle en degrés (y vers le bas : 90 = dessous).
  const E = (cx, cy, rx, ry, t) => [cx + rx * Math.cos(t * Math.PI / 180), cy + ry * Math.sin(t * Math.PI / 180)];
  const arc = (cx, cy, rx, ry, t0, t1, pas = 5) => {
    const out = [], n = Math.max(2, Math.ceil(Math.abs(t1 - t0) / pas));
    for (let i = 0; i <= n; i++) out.push(E(cx, cy, rx, ry, t0 + (t1 - t0) * i / n));
    return out;
  };
  const bandeArc = (cx, cy, a, b, t0, t1) => arc(cx, cy, b[0], b[1], t0, t1).concat(arc(cx, cy, a[0], a[1], t1, t0));

  // Un lien de tissu : bande droite, et son nœud avec deux bouts.
  const lienV = (x, yt, yb, w) => h.path(`M${x},${yt} Q${x + w / 2},${yt - 2} ${x + w},${yt} L${x + w},${yb} Q${x + w / 2},${yb + 3} ${x},${yb} Z`, plein(h.a.arete));
  const lienH = (y, xl, xr, w) => h.path(`M${xl},${y} Q${xl - 2},${y + w / 2} ${xl},${y + w} L${xr},${y + w} Q${xr + 3},${y + w / 2} ${xr},${y} Z`, plein(h.a.arete));
  const noeud = (x, y, sens) => [
    h.path(`M${x - 1},${y - 2} q${-5 * sens},-6 ${-11 * sens},-7`, h.a.arete),
    h.path(`M${x + 1},${y - 2} q${3 * sens},-8 ${9 * sens},-11`, h.a.arete),
    h.ellipse(x, y, 6, 4.5, plein(h.a.arete)),
  ].join('\n');

  // La main détendue, vue du dos, construite avec les pièces de la bibliothèque de formes.
  // Repère en mm : doigts vers +x, pouce vers -y (main droite ; miroir : main gauche).
  // Les doigts plient vers la paume, donc loin de l'œil : vus du dos, ils raccourcissent,
  // d'autant plus que la phalange est loin, et s'enroulent un peu vers l'auriculaire. Ils
  // s'étagent (le majeur le plus long) ; le pouce part de la base de la paume et se couche
  // le long de l'index, pas plus gros qu'un doigt.
  const mainDetendue = (o) => {
    const I = h.formes._interne, RAD = Math.PI / 180;
    const dirA = d => [Math.cos(d * RAD), Math.sin(d * RAD)];
    const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
    const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
    const DG = {
      index: { ph: [43, 25, 21], ep: [19, 16.2, 14.2, 12.2] },
      majeur: { ph: [46, 28, 22], ep: [19.5, 16.8, 14.8, 12.6] },
      annulaire: { ph: [43, 27, 21], ep: [18, 15.6, 13.8, 11.8] },
      auriculaire: { ph: [34, 20, 19], ep: [16, 13.6, 12.2, 10.6] },
    };
    const faceW = ep => [[ep[0] / 2, ep[1] / 2], [ep[1] / 2, ep[2] / 2], [ep[2] / 2, ep[3] / 2]];
    const Wx = -92, cut = Wx - (o.bras == null ? 40 : o.bras), k = o.courbe == null ? 0.4 : o.courbe;
    // nom, base (tête du métacarpien), direction, flexion de chaque phalange (degrés)
    const doigts = [
      ['index', [0, -27.5], -5, [12, 32, 18]],
      ['majeur', [4.5, -8.8], -0.5, [14, 34, 18]],
      ['annulaire', [1, 9.6], 4.5, [17, 38, 20]],
      ['auriculaire', [-9, 26.8], 10, [22, 42, 22]],
    ].map(([nom, P0, a, fl]) => {
      let cum = 0;
      const L = DG[nom].ph.map((l, i) => { cum += fl[i]; return l * Math.cos(cum * RAD); });
      return { nom, d: { ...DG[nom], ep: DG[nom].ep.map(v => v * 1.05) }, pts: I.plie(P0, dirA(a), L, fl.map(f => f * k), 1) };
    });
    const wF = g => faceW(g.d.ep);
    const bI = s => I.pointBord(doigts[0].pts, wF(doigts[0]), 1, 1, s);
    const vA = s => I.pointBord(doigts[3].pts, wF(doigts[3]), 1, -1, s);
    const ptsP = [[-80, -17], [-38, -36], [-6, -41.5], [18, -40.5]];
    const wP = [[10, 9.6], [9.6, 9], [9, 7.6]];
    const bP = s => I.pointBord(ptsP, wP, 1, 1, s);
    const sW = 20;
    const haut = I.lisse([[cut, -30.5], [Wx - 8, -29.5], bP(0)]);
    const cubital = I.lisse([vA(8), [10, 37.5], [-20, 38.5], [-55, 35], [Wx, 30], [cut, 31.5]]);
    const webs = [];
    for (let i = 0; i < 3; i++) {
      const a = doigts[i], b = doigts[i + 1];
      const pa = I.pointBord(a.pts, wF(a), 1, -1, sW), pb = I.pointBord(b.pts, wF(b), 1, 1, sW);
      const fondW = lerp(I.pointBord(a.pts, wF(a), 1, -1, sW - 5), I.pointBord(b.pts, wF(b), 1, 1, sW - 5), 0.5);
      webs.push([['M', pa], ['Q', fondW, pb]]);
    }
    const remp = [...I.lisse([[cut, -30.5], [Wx - 8, -29.5], bP(0), [-45, -38], [-12, -38], bI(4), [30, -30], [40, 0], [30, 30],
      vA(8), [10, 37.5], [-20, 38.5], [-55, 35], [Wx, 30], [cut, 31.5]]), ['Z']];
    const jointures = doigts.slice(0, 3).map(g => { const p = g.pts[0], w = g.d.ep[0] * 0.28; return [['M', add(p, [-2, -w])], ['Q', add(p, [2.5, 0]), add(p, [-2, w])]]; });
    const pieces = [{ remp, trait: [haut, cubital, ...webs], det: [] }];
    doigts.slice().reverse().forEach((g, j) => {
      const i = 3 - j;
      pieces.push(I.tube({ pts: g.pts, dos: wF(g), ventre: wF(g), coussin: [-0.15, -0.1, 0.15], bosseDos: [-0.15, 0.3, 0.3],
        bout: 'rond', base: 16, rides: [{ j: 1, n: 1, l: 0.55 }], ouvre: { dos: i === 0 ? 0 : sW, ventre: i === 3 ? 8 : sW } }));
    });
    pieces.push(I.tube({ pts: ptsP, sens: 1, dos: wP, ventre: wP, coussin: [0, -0.3, 0.3], bosseDos: [0, 0.4, 0.3],
      bout: 'rond', ongle: 'cote', base: 14, ouvre: { dos: 0, ventre: 44 }, rides: [{ j: 2, n: 1, l: 0.5 }] }));
    pieces.push({ remp: null, trait: [], det: jointures, silhouette: false, epDet: 0.5 });
    const Tm = I.repere({ x: o.x, y: o.y, echelle: o.echelle, miroir: !!o.miroir });
    const r1 = p => Tm(p).map(v => Math.round(v * 10) / 10);
    return { svg: `<g data-forme="main-detendue">\n${I.peindre(pieces, Tm)}\n</g>`,
      bouts: doigts.map(g => r1(g.pts[3])), coupe: [r1([cut, -30.5]), r1([cut, 31.5])] };
  };

  // ─── Tremper ──────────────────────────────────────────────────────────────────────────
  const T = { L: 231, y0: 80, y1: 308 };
  const xl = y => 98 - 26 * (y - 100) / 113 - 6 * Math.sin(Math.PI * (y - 100) / 113);
  const xr = y => 175 - 25 * (y - 112) / 105 - 5 * Math.sin(Math.PI * (y - 112) / 105);
  const lentFeuille = [];
  [[124, 0.2], [140, 0.55], [156, 0.1], [172, 0.7], [188, 0.35], [203, 0.8]].forEach(([y, d], i) => {
    const a = xl(y) + 9, b = xr(y) - 9;
    for (let x = a + d * 14; x < b; x += 24 + (i % 3) * 3) lentFeuille.push([Math.round(x), y, 4 + (i + Math.round(x)) % 3]);
  });
  const tremper = z => {
    const o = boite(z, T.L, T.y0, T.y1);
    return g(o, [
      // la marmite ; sa face de droite à l'ombre (la lumière vient d'en haut à gauche)
      h.path('M27,205 Q29,272 43,292 A72 14 0 0 0 187,292 Q201,272 203,205', plein(h.a.contour)),
      h.path('M150,221.5 Q182,216 203,205 Q201,272 187,292 Q172,302 150,304 Z', h.a.ombre),
      h.path('M27,205 Q29,272 43,292 A72 14 0 0 0 187,292 Q201,272 203,205', h.a.contour),
      h.ellipse(115, 209, 79, 11, h.a.hachure('eau', 'detail')),
      h.ellipse(115, 205, 88, 18, h.a.contour),
      h.ellipse(115, 206, 83, 15.5, h.a.detail),
      // la plaque d'écorce, qui sort de l'eau
      h.path('M72,213 Q70,150 98,100 Q135,96 175,112 Q152,160 150,217 Q110,219 72,213 Z', h.a.blanc),
      h.path('M72,213 Q70,150 98,100 Q135,96 175,112 Q152,160 150,217', h.a.contour),
      h.path('M98,100 Q100,92 107,93 Q140,89 172,104 Q178,107 175,112', h.a.arete),
      lent(lentFeuille),
      h.path('M68,214 Q74,209 80,214 M142,218 Q148,213 155,218', h.a.detail),
      // la vapeur
      h.path('M34,190 C24,170 44,160 34,140 C24,120 44,110 34,90', h.a.cache),
      h.path('M56,176 C47,158 65,148 57,128 C50,112 63,102 57,88', h.a.cache),
    ]);
  };

  // ─── Mouler et attacher ───────────────────────────────────────────────────────────────
  const M = { L: 346, y0: 0, y1: 294 };
  // la main : le poignet en x 86, à la hauteur de l'avant-bras ; les doigts dépassent le bout de l'écorce
  // Échelle de la main : celle du bras (le poignet fait ~40 de haut, l'avant-bras ~210 de long),
  // pour que la main ait sa vraie taille d'adulte, aux trois quarts de l'avant-bras.
  const EM = 0.6, XW = 94;   // XW : le poignet, en x de la vue
  const MAIN_M = mainDetendue({ x: XW - 92 * EM, y: 229, echelle: EM, miroir: true, bras: 22, courbe: 0.65 });
  const POIGNET_M = [Math.round((XW + 8 * EM) * 10) / 10, Math.round((229 - 29.5 * EM) * 10) / 10];   // le haut du poignet
  // le trait de coupe A–A : en travers du lien de l'avant-bras près du poignet, regardé vers la main
  const XA = 114, YA = [186, 272];
  const traitCoupe = () => {
    const out = [h.ligne(XA, YA[0], XA, YA[1], h.a.fin + ' stroke-dasharray="10 3 2 3"')];
    YA.forEach((y, i) => {
      const s = i ? -1 : 1;
      out.push(h.ligne(XA, y, XA, y + 7 * s, h.a.arete));
      out.push(h.ligne(XA, y, XA - 4, y, h.a.detail));
      out.push(h.path(`M${XA - 3.5},${y - 3} L${XA - 10},${y} L${XA - 3.5},${y + 3} Z`, h.a.plein));
      out.push(h.texte(XA, i ? y + 15 : y - 6, 'A', { ancre: 'middle' }));
    });
    return out.join('\n');
  };
  const mouler = z => {
    const o = boite(z, M.L, M.y0, M.y1);
    // bord du dessus de l'avant-bras, pour poser les liens dessus
    const dessus = x => x >= 120 ? 206 - (x - 120) * 0.12 - 10 * Math.sin(Math.PI * Math.min(1, (x - 120) / 112)) * 0.9 : 206 + (120 - x) * 0.22;
    // un lien de tissu qui fait le tour : bords courbés comme un anneau sur un cylindre
    const lien = (x, yb, w) => {
      const y1 = dessus(x), y2 = dessus(x + w), ym = (y1 + yb) / 2;
      return [
        h.path(`M${x},${y1} L${x + w},${y2} Q${x + w - 4},${ym} ${x + w},${yb} Q${x + w / 2},${yb + 3} ${x},${yb} Q${x - 4},${ym} ${x},${y1} Z`, plein(h.a.arete)),
        h.path(`M${x + 15},${y2 + 6} Q${x + 12},${ym} ${x + 15},${yb - 5}`, h.a.detail),
      ].join('\n');
    };
    // le nœud posé sur la face du lien, deux bouts qui pendent
    const noeudLien = (x, y) => [
      h.path(`M${x - 3},${y + 2} Q${x - 8},${y + 9} ${x - 7},${y + 17} L${x - 3},${y + 17} Q${x - 4},${y + 9} ${x + 1},${y + 3} Z`, plein(h.a.arete)),
      h.path(`M${x + 2},${y + 2} Q${x + 8},${y + 8} ${x + 12},${y + 15} L${x + 15},${y + 13} Q${x + 11},${y + 6} ${x + 5},${y} Z`, plein(h.a.arete)),
      h.path(`M${x - 7},${y + 2} Q${x - 8},${y - 5} ${x - 1},${y - 6} Q${x + 7},${y - 6} ${x + 7},${y} Q${x + 6},${y + 4} ${x},${y + 4} Q${x - 5},${y + 4} ${x - 7},${y + 2} Z`, plein(h.a.arete)),
      h.path(`M${x - 3},${y - 5} Q${x},${y - 1} ${x + 3},${y + 3}`, h.a.detail),
    ].join('\n');
    return g(o, [
      // la manche roulée, puis le haut du bras nu
      h.path('M226,0 C227,10 228,20 229,28 M306,0 C305,10 304,20 303,28', h.a.contour),
      h.path('M240,0 Q244,12 241,26 M290,2 Q286,14 292,26', h.a.detail),
      h.path('M229,28 Q266,22 303,28 L302,46 Q266,40 231,46 Z', plein(h.a.contour)),
      h.path('M246,31 Q250,37 247,43 M270,29 Q273,35 271,42 M290,30 Q292,37 290,44', h.a.detail),
      h.path('M234,46 C228,80 226,130 235,168 C239,184 237,192 232,196', h.a.contour),
      h.path('M296,46 C301,100 300,160 297,200 C298,225 300,245 290,256', h.a.contour),
      h.path('M236,184 Q231,193 222,195', h.a.detail),
      // l'avant-bras, jusqu'au poignet
      h.path(`M232,196 C200,186 160,196 120,206 L${MAIN_M.coupe[0].join(',')}`, h.a.contour),
      h.path(`M290,256 C250,262 180,252 120,246 L${MAIN_M.coupe[1].join(',')}`, h.a.contour),
      // la main gauche, vue du dos : doigts à demi fermés et étagés, le pouce le long de l'index
      MAIN_M.svg,
      h.path(`M${MAIN_M.coupe[0].join(',')} L${POIGNET_M.join(',')}`, h.a.contour),   // le trait de l'avant-bras jusqu'au poignet
      // le foyer de la fracture, entre les deux articulations
      h.path('M160,197 L165,203 L158,209 L164,215 L159,221 L163,227', h.a.arete),
      // le rembourrage qui dépasse de la gouttière : coude et poignet
      h.path('M226,229 Q226,221 232,221 Q238,218 242,219 Q246,214 251,212 Q255,208 257,206 Q261,202 261,196 Q263,188 263,176 L272,176 L272,232 Z', plein(h.a.arete)),
      h.path('M64,236 Q66,228 72,228 Q78,225 84,226 Q90,224 96,227 Q102,225 106,236 Z', plein(h.a.arete)),
      // la gouttière d'écorce, moulée sous l'avant-bras et derrière le haut du bras
      h.path('M54,234 L54,257 L88,250 L120,253 C180,259 250,269 292,264 C304,260 307,242 306,220 L303,68 Q285,63 266,68 L268,178 C268,200 262,214 244,224 C210,229 140,231 88,231 Z', plein(h.a.arete)),
      h.path('M54,257 L88,250 L120,253 C180,259 250,269 292,264 C304,260 307,242 306,220 L303,68', h.a.contour),
      lent([[66, 243, 4], [100, 245], [140, 238], [150, 248], [176, 240], [232, 244], [258, 236], [248, 256], [272, 250], [286, 240], [262, 226, 4]]),
      lent([[276, 128], [290, 142], [280, 160], [294, 176], [276, 190, 4], [291, 206, 4], [282, 80], [294, 90]], true),
      // trois liens, hors du foyer
      h.path('M234,96 Q231,106 234,116 L305,116 Q308,106 305,96 Z', plein(h.a.arete)),
      h.path('M250,99 Q256,106 252,113', h.a.detail),
      noeudLien(252, 104),
      lien(104, 254, 20), noeudLien(114, 218),
      lien(196, 264, 20), noeudLien(206, 208),
      traitCoupe(),
    ]);
  };

  // ─── En coupe ─────────────────────────────────────────────────────────────────────────
  const C = { L: 231, y0: 56, y1: 262, cx: 115, cy: 150 };
  const bras = [60, 43], bourre = [71, 54], ecorce = [78, 61];
  // le lien : colle à l'écorce dessous, passe tendu d'un bord de la gouttière au dessus du bras
  const lien = (d) => {
    const bas = arc(C.cx, C.cy, ecorce[0] + d, ecorce[1] + d, -15, 195);
    const haut = arc(C.cx, C.cy, bras[0] + 3 + d, bras[1] + 3 + d, 225, 315);
    return bas.concat(haut);
  };
  const coupe = z => {
    const o = boite(z, C.L, C.y0, C.y1);
    const { cx, cy } = C;
    return g(o, [
      h.chemin(bandeArc(cx, cy, bras, bourre, -25, 205), h.a.hachure('isolant', 'arete'), true),
      h.ellipse(cx, cy, bras[0], bras[1], plein(h.a.contour)),
      h.ellipse(cx - 17, cy - 12, 16, 12, h.a.arete),
      h.ellipse(cx - 17, cy - 12, 8.5, 6, h.a.detail),
      h.ellipse(cx + 19, cy + 17, 11, 10, h.a.arete),
      h.ellipse(cx + 19, cy + 17, 5.5, 5, h.a.detail),
      h.chemin(bandeArc(cx, cy, bourre, ecorce, -15, 195), h.a.plein, true),
      // le lien fait le tour complet : deux boucles fermées, le ruban blanc entre les deux
      h.path([lien(3.5), lien(0.5)].map(b => 'M' + b.map(p => p.map(v => v.toFixed(1)).join(',')).join(' L') + ' Z').join(' '),
        plein(h.a.arete) + ' fill-rule="evenodd"'),
      noeud(cx, cy - bras[1] - 6, 1),
      // le point à contrôler : le lien, qu'on desserre au premier blanchiment des doigts
      h.controle(cx, cy - bras[1] - 6, 12),
    ]);
  };

  // ─── L'écharpe ────────────────────────────────────────────────────────────────────────
  const S = { L: 346, y0: 0, y1: 296 };
  const epingle = (x, y) => [
    h.ligne(x - 2, y - 9, x - 2, y + 8, h.a.arete),
    h.ligne(x + 2, y - 8, x + 2, y + 8, h.a.arete),
    h.cercle(x, y + 11, 3, h.a.arete),
    h.rect(x - 3.5, y - 15, 7, 6, plein(h.a.arete)),
  ].join('\n');
  // la paume reste sous le pan : le bord du pan passe juste derrière les jointures
  const MAIN_S = mainDetendue({ x: 249, y: 203, echelle: 0.62, bras: 0, courbe: 0.5 });
  const echarpe = z => {
    const o = boite(z, S.L, S.y0, S.y1);
    return g(o, [
      // cou, col, épaules
      h.path('M152,0 C153,10 152,16 150,20 M194,0 C193,10 194,16 196,20', h.a.contour),
      h.path('M150,20 Q173,30 196,20', h.a.arete),
      h.path('M150,18 L146,26 L160,46 L173,32 L186,46 L200,26 L196,18', h.a.arete),
      h.path('M146,26 C120,34 90,40 72,48 M200,26 C226,34 256,40 274,48', h.a.contour),
      h.path('M76,50 Q92,72 96,100 M270,50 Q254,72 250,100', h.a.detail),
      h.path('M170,34 L170,150 M176,34 L176,150', h.a.detail),
      h.cercle(173, 62, 2.6, h.a.arete), h.cercle(173, 94, 2.6, h.a.arete), h.cercle(173, 126, 2.6, h.a.arete),
      // le bras valide, qui pend
      h.path('M274,48 C292,56 300,110 301,170 C302,230 304,270 304,296', h.a.contour),
      h.path('M250,100 C256,150 260,230 262,296', h.a.contour),
      h.path('M266,150 Q282,160 297,156 M265,212 Q281,222 301,217', h.a.detail),
      // le bas du tronc, sous le pli
      h.path('M98,238 C100,262 101,280 102,296', h.a.contour),
      h.path('M101,274 L261,274 M101,284 L261,284', h.a.arete),
      h.rect(164, 272, 18, 14, plein(h.a.arete)),
      h.ligne(173, 286, 173, 296, h.a.detail),
      // le bras blessé : manche roulée, écorce le long du dehors, coude sorti de l'écharpe
      h.path('M72,48 C56,60 50,110 48,160 C47,190 46,205 47,214 C48,228 58,236 72,236 L88,236', h.a.contour),
      h.path('M96,100 C94,140 92,170 90,196', h.a.contour),
      h.path('M53,104 Q74,100 95,106 L94,120 Q73,114 51,118 Z', plein(h.a.arete)),
      h.path('M60,106 Q64,111 62,116 M80,105 Q83,110 82,117', h.a.detail),
      h.path('M51,124 C49,160 48,190 47,214 C48,229 58,236 72,236 L88,236 L88,242 L72,242 C54,242 42,232 42,214 C42,190 43,160 45,124 Z', plein(h.a.arete)),
      h.path('M45,124 C43,160 42,190 42,214 C42,232 54,242 72,242 L88,242', h.a.contour),
      h.path('M42,150 Q68,154 93,149 L92,160 Q68,165 42,161 Z', plein(h.a.arete)),
      // la main droite, vue du dos, détendue : elle sort du pan jusqu'aux jointures
      MAIN_S.svg,
      // le pan de chemise relevé par-dessus l'avant-bras
      h.path('M86,152 Q106,158 126,151 Q170,161 214,149 Q230,155 244,149 C246,180 246,210 245,238 Q166,256 86,240 C84,210 84,180 86,152 Z', plein(h.a.contour)),
      h.path('M88,158 Q106,164 126,157 Q170,167 214,155 Q230,161 243,155', h.a.fin),
      h.path('M126,158 Q118,192 104,234 M214,156 Q224,192 234,236 M150,164 Q152,204 142,246', h.a.detail),
      h.path('M170,161 L168,246 M176,161 L175,246', h.a.detail),
      epingle(126, 151),
      epingle(214, 149),
    ]);
  };

  return {
    ref: '26-08',
    titre: 'L’attelle d’écorce moulée',
    desc: 'Trois vues. Une plaque d’écorce de bouleau trempe dans une marmite d’eau chaude. Un bras plié, vu de côté : l’écorce moulée en gouttière sous l’avant-bras et derrière le haut du bras prend le coude et le poignet, le rembourrage dépasse au coude et au poignet, trois liens la tiennent hors de la cassure, marquée en zigzag sur le dessus de l’avant-bras ; la main, vue du dos, doigts à demi fermés et pouce le long de l’index, dépasse le bout de l’écorce. Un trait de coupe A–A traverse le lien près du poignet. La coupe A–A : le bras, le rembourrage, la gouttière d’écorce durcie et le lien, qu’on desserre au premier blanchiment des doigts.',
    format: 'pleine',
    disposition: [['tremper', 'mouler'], ['coupe']],
    largeurs: [[2, 3], [1]],
    hauteurs: [1, 0.85],
    fichier: 'planche-26-08-attelle-ecorce-moulee-echarpe.svg',   // le nom reste : l'écharpe est sortie de la planche
    vues: {
      tremper: {
        titre: 'Tremper',
        dessin: tremper,
        renvois: z => {
          const o = boite(z, T.L, T.y0, T.y1);
          return [
            { n: 1, rond: [z.l - 16, o.oy + 60], cible: P(o, 150, 140), texte: 'plaque d’écorce de bouleau' },
            { n: 2, rond: [z.l - 16, o.oy + 158], cible: P(o, 186, 211), texte: 'eau chaude, qui l’assouplit' },
          ];
        },
      },
      mouler: {
        titre: 'Mouler et attacher',
        dessin: mouler,
        renvois: z => {
          const o = boite(z, M.L, M.y0, M.y1);
          return [
            { n: 3, rond: P(o, 146, 158), cible: P(o, 161, 204), texte: 'cassure : aucun lien dessus' },
            { n: 4, rond: [z.l - 14, o.oy + 279], cible: P(o, 302, 248), texte: 'prend le coude, au-dessus' },
            { n: 5, rond: P(o, 78, 279), cible: P(o, 86, 248), texte: 'prend le poignet, en dessous' },
            { n: 6, rond: P(o, 214, 142), cible: P(o, 250, 214), texte: 'rembourré sur l’os saillant' },
            { n: 7, rond: P(o, 196, 80), cible: P(o, 244, 103), texte: 'attachée en trois points' },
            { n: 8, rond: P(o, 22, 160), cible: P(o, ...MAIN_M.bouts[0]), texte: 'doigts dehors, à vérifier' },
          ];
        },
      },
      coupe: {
        titre: 'Coupe A–A',
        dessin: coupe,
        renvois: z => {
          const o = boite(z, C.L, C.y0, C.y1);
          return [
            { n: 9, rond: P(o, 30, 252), cible: P(o, ...E(C.cx, C.cy, 74.5, 57.5, 120)), texte: 'durcie, elle épouse le bras' },
            { n: 10, rond: P(o, 18, 96), cible: P(o, ...E(C.cx, C.cy, 65.5, 48.5, 160)), texte: 'linge ou mousse sèche' },
            { n: 11, rond: P(o, C.L + 20, 66), cible: P(o, ...E(C.cx, C.cy, 65, 48, 300)), texte: 'desserré au blanchiment' },
          ];
        },
      },
    },
  };
};
