// Planche 26-08 — L'attelle d'écorce moulée, et l'écharpe au pan de chemise.
// Chapitre 26 (ancien 27), section 9, « Ce qui se fabrique » : écorce de bouleau à papier trempée à l'eau chaude, moulée autour du
// membre et laissée sécher en gouttière ; l'articulation au-dessus et celle en dessous ;
// rembourrage de linge ou de mousse sèche sur l'os saillant ; attachée en trois points ; doigts
// à vérifier, desserrer au premier blanchiment. L'écharpe : le pan de la chemise relevé
// par-dessus l'avant-bras et épinglé au devant de la chemise.
// L'écharpe était un buste de face en chemise, sorti le 13 octobre (JP : plus de corps de face). Elle revient le
// 14 octobre en gros plan (JP) : le bras attelé seul, vu du devant, l'avant-bras à l'horizontale dans le pan relevé,
// sans corps. Les mains sont des mains simples (mainSimple, pose relachee), le bras de l'écharpe enchaîné au coude
// (avantbras.bras).
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
  const M = { L: 322, y0: 0, y1: 294 };   // 322 : le dessin décalé de 12 à droite, la main entière dans la vue
  // la main gauche, vue du dos, détendue (mainSimple, pose relachee) : le poignet en x 94, à la hauteur de
  // l'avant-bras, les doigts qui dépassent le bout de l'écorce. Son avant-bras s'arrête sous le lien du poignet
  // (x 104 à 124), où il rejoint l'avant-bras dessiné de la planche.
  const EM = 0.6, XW = 94, YW = 228;
  const MAIN_M = h.formes.mainSimple({ x: XW, y: YW, ancre: 'poignet', pose: 'relachee', vue: 'dos', cote: 'gauche', angle: 174,
    rotation: [-20, 0, 0], echelle: EM, avantbras: { fin: [[114, 150], [114, 300]] } });
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
  // le nœud posé sur la face du lien, deux bouts qui pendent
  const noeudLien = (x, y) => [
    h.path(`M${x - 3},${y + 2} Q${x - 8},${y + 9} ${x - 7},${y + 17} L${x - 3},${y + 17} Q${x - 4},${y + 9} ${x + 1},${y + 3} Z`, plein(h.a.arete)),
    h.path(`M${x + 2},${y + 2} Q${x + 8},${y + 8} ${x + 12},${y + 15} L${x + 15},${y + 13} Q${x + 11},${y + 6} ${x + 5},${y} Z`, plein(h.a.arete)),
    h.path(`M${x - 7},${y + 2} Q${x - 8},${y - 5} ${x - 1},${y - 6} Q${x + 7},${y - 6} ${x + 7},${y} Q${x + 6},${y + 4} ${x},${y + 4} Q${x - 5},${y + 4} ${x - 7},${y + 2} Z`, plein(h.a.arete)),
    h.path(`M${x - 3},${y - 5} Q${x},${y - 1} ${x + 3},${y + 3}`, h.a.detail),
  ].join('\n');
  const mouler = z => {
    const o = boite(z, M.L, M.y0, M.y1);
    // les deux coins de la coupe de l'avant-bras de la main, le haut d'abord
    const [haut, bas] = MAIN_M.coupe.slice().sort((a, b) => a[1] - b[1]);
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
      h.path(`M232,196 C200,186 160,196 120,206 L${haut.join(',')}`, h.a.contour),
      h.path(`M290,256 C250,262 180,252 120,246 L${bas.join(',')}`, h.a.contour),
      // la main gauche, vue du dos, détendue, le pouce le long de l'index
      MAIN_M.svg,
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
  // Gros plan sur le bras attelé, porté dans le pan de la chemise : le même bras gauche que « Mouler et attacher »,
  // vu du devant du blessé. L'avant-bras à l'horizontale, la main détendue qui sort à gauche, le coude à droite et le
  // haut du bras qui monte vers l'épaule (mainSimple, avantbras.bras), coupé au bord. Derrière, au trait seulement
  // (un aplat gris faisait un bloc ; la ceinture et le flanc, du décor) : la patte de la chemise et ses boutons. Le pan relevé passe devant
  // l'avant-bras, son ourlet épinglé au devant.
  const S = { L: 346, y0: 0, y1: 297 };
  const ES = 0.6, XS = 150, YS = 196;                // la main : la même échelle que dans « Mouler et attacher »
  const PAN = { g: 154, d: 258, h: 156, b: 242 };    // le pan : bords gauche et droit, ourlet, pli du dessous
  const PATTE = 204;                                 // la patte de boutonnage, au milieu du devant
  const EPINGLES = [[174, 160], [238, 158]], [E1, E2] = EPINGLES, MI = (E1[0] + E2[0]) / 2;
  const epingle = (x, y) => [
    h.ligne(x - 2, y - 9, x - 2, y + 8, h.a.arete),
    h.ligne(x + 2, y - 8, x + 2, y + 8, h.a.arete),
    h.cercle(x, y + 11, 3, h.a.arete),
    h.rect(x - 3.5, y - 15, 7, 6, plein(h.a.arete)),
  ].join('\n');
  // le contour plein d'une main simple (son aplat blanc), en points ; ses bords à une abscisse ou une ordonnée
  const contourDe = m => ((String(m.svg).match(/<path d="([^"]+)" fill="#FFFFFF"/) || [])[1] || '')
    .split(/[MLZ]/).map(t => t.trim()).filter(Boolean).map(t => t.split(/\s+/).map(Number));
  const coupes = (pts, k, v) => {
    const out = [];
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i], b = pts[(i + 1) % pts.length];
      if ((a[k] - v) * (b[k] - v) < 0) out.push(a[1 - k] + (v - a[k]) / (b[k] - a[k]) * (b[1 - k] - a[1 - k]));
    }
    return out;
  };
  const echarpe = z => {
    const o = boite(z, S.L, S.y0, S.y1);
    const bord = { x0: -o.ox, y0: -o.oy, x1: z.l - o.ox, y1: z.h - o.oy };
    const base = { x: XS, y: YS, ancre: 'poignet', pose: 'relachee', vue: 'dos', cote: 'gauche', angle: 180, rotation: [-20, 0, 0], echelle: ES };
    const c0 = h.formes.mainSimple({ ...base, avantbras: { longueur: 'entier' } }).coude;
    const bras = h.formes.mainSimple({ ...base, avantbras: { bord, bras: { vers: [c0[0] + 3, -400] } } });
    const C = bras.coude, pts = contourDe(bras);
    const bas = x => Math.max(...coupes(pts, 0, x)), droite = y => Math.max(...coupes(pts, 1, y));
    // l'écorce : derrière le bras, elle dépasse de 7 sous l'avant-bras, autour du coude et le long du dehors du haut
    // du bras ; elle finit sous le talon de la main (prend le poignet) et à 60 sous l'épaule
    const EP = 7, X0 = XS - 40, Y1 = 60;
    const ext = [];
    for (let x = X0; x < C[0]; x += 6) ext.push([x, bas(x) + EP]);
    for (let t = 90; t >= 0; t -= 10) {
      const u = [Math.cos(t * Math.PI / 180), Math.sin(t * Math.PI / 180)];
      let r = 0;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i], q = pts[(i + 1) % pts.length], d = [q[0] - p[0], q[1] - p[1]];
        const det = u[0] * -d[1] + d[0] * u[1];
        if (Math.abs(det) < 1e-9) continue;
        const w = [p[0] - C[0], p[1] - C[1]], tt = (w[0] * -d[1] + d[0] * w[1]) / det, ss = (u[0] * w[1] - u[1] * w[0]) / det;
        if (tt > 0 && ss >= 0 && ss <= 1) r = Math.max(r, tt);
      }
      ext.push([C[0] + u[0] * (r + EP), C[1] + u[1] * (r + EP)]);
    }
    for (let y = C[1] - 6; y > Y1; y -= 8) ext.push([droite(y) + EP, y]);
    ext.push([droite(Y1) + EP, Y1]);
    const ecorce = ext.concat([[C[0] - 12, Y1], [C[0] - 12, C[1] - 10], [X0, YS]]);
    const lentE = [];
    for (let x = X0 + 10; x < PAN.g - 4; x += 22) lentE.push([x, bas(x) + EP / 2, 4]);
    for (let x = PAN.d + 14; x < C[0] - 4; x += 22) lentE.push([x, bas(x) + EP / 2, 4]);
    const lentD = [];
    for (let y = C[1] - 30; y > Y1 + 12; y -= 26) lentD.push([droite(y) + EP / 2, y, 4]);
    // le lien du haut du bras, par-dessus le bras et l'écorce
    const yL = 98, wL = 18;
    const xg = Math.min(...coupes(pts, 1, yL)), xd = droite(yL) + EP + 1;
    const xg2 = Math.min(...coupes(pts, 1, yL + wL)), xd2 = droite(yL + wL) + EP + 1;
    return g(o, [
      // derrière : le devant de la chemise, sa patte et trois boutons
      h.path(`M${PATTE - 3},${-o.oy} L${PATTE - 3},${PAN.h} M${PATTE + 3},${-o.oy} L${PATTE + 3},${PAN.h}`, h.a.detail),
      h.cercle(PATTE, 34, 2.6, plein(h.a.arete)), h.cercle(PATTE, 84, 2.6, plein(h.a.arete)), h.cercle(PATTE, 134, 2.6, plein(h.a.arete)),
      // l'écorce, derrière le bras
      h.chemin(ecorce, plein(h.a.arete), true),
      lent(lentE), lent(lentD, true),
      // le bras gauche, la main détendue
      bras.svg,
      // le lien du haut du bras
      h.path(`M${xg},${yL} L${xd},${yL} Q${xd + 3},${yL + wL / 2} ${xd2},${yL + wL} L${xg2},${yL + wL} Q${xg2 - 3},${yL + wL / 2} ${xg},${yL} Z`, plein(h.a.arete)),
      noeudLien((xg + xd) / 2 - 4, yL + 6),
      // la manche roulée, au haut du bras
      h.path(`M${Math.min(...coupes(pts, 1, 24)) - 2},24 Q${C[0]},19 ${droite(24) + 2},24 L${droite(42) + 2},42 Q${C[0]},37 ${Math.min(...coupes(pts, 1, 42)) - 2},42 Z`, plein(h.a.contour)),
      h.path(`M${C[0] - 18},27 Q${C[0] - 15},33 ${C[0] - 17},39 M${C[0] + 6},26 Q${C[0] + 9},32 ${C[0] + 7},39`, h.a.detail),
      // le pan relevé par-dessus l'avant-bras, en hamac : l'ourlet en haut, épinglé ; le pli dessous, au plus bas au
      // milieu ; les plis du tissu partent des épingles vers ce creux
      h.path(`M${PAN.g},${PAN.h + 2} Q${E1[0] - 10},${PAN.h - 2} ${E1[0]},${E1[1]} Q${MI},${PAN.h + 10} ${E2[0]},${E2[1]} Q${PAN.d - 8},${PAN.h - 2} ${PAN.d},${PAN.h + 1} C${PAN.d + 3},${PAN.h + 34} ${PAN.d},${PAN.b - 34} ${PAN.d - 12},${PAN.b - 10} Q${MI},${PAN.b + 16} ${PAN.g + 12},${PAN.b - 8} C${PAN.g},${PAN.b - 34} ${PAN.g - 3},${PAN.h + 34} ${PAN.g},${PAN.h + 2} Z`, plein(h.a.contour)),
      h.path(`M${PAN.g + 1},${PAN.h + 8} Q${E1[0] - 10},${PAN.h + 4} ${E1[0]},${E1[1] + 6} Q${MI},${PAN.h + 16} ${E2[0]},${E2[1] + 6} Q${PAN.d - 8},${PAN.h + 4} ${PAN.d - 1},${PAN.h + 7}`, h.a.fin),
      h.path(`M${PAN.g + 20},${PAN.b - 12} Q${MI},${PAN.b + 6} ${PAN.d - 20},${PAN.b - 14}`, h.a.detail),
      h.path(`M${E1[0] + 3},${E1[1] + 16} Q${E1[0] + 4},${PAN.h + 56} ${MI - 22},${PAN.b - 6} M${E2[0] - 3},${E2[1] + 16} Q${E2[0] - 4},${PAN.h + 56} ${MI + 22},${PAN.b - 6} M${E1[0] - 10},${PAN.h + 10} Q${PAN.g + 6},${PAN.h + 50} ${PAN.g + 16},${PAN.b - 14} M${E2[0] + 10},${PAN.h + 10} Q${PAN.d - 5},${PAN.h + 50} ${PAN.d - 18},${PAN.b - 16}`, h.a.detail),
      h.path(`M${PATTE - 3},${PAN.h + 15} Q${PATTE - 4},${PAN.h + 60} ${PATTE - 3},${PAN.b + 2} M${PATTE + 3},${PAN.h + 15} Q${PATTE + 2},${PAN.h + 60} ${PATTE + 3},${PAN.b + 2}`, h.a.detail),
      ...EPINGLES.map(([x, y]) => epingle(x, y)),
    ]);
  };

  return {
    ref: '26-08',
    titre: 'L’attelle d’écorce moulée, et l’écharpe au pan de chemise',
    desc: 'Quatre vues. Une plaque d’écorce de bouleau trempe dans une marmite d’eau chaude. Un bras plié, vu de côté : l’écorce moulée en gouttière sous l’avant-bras et derrière le haut du bras prend le coude et le poignet, le rembourrage dépasse au coude et au poignet, trois liens la tiennent hors de la cassure, marquée en zigzag sur le dessus de l’avant-bras ; la main, vue du dos, détendue, dépasse le bout de l’écorce. Un trait de coupe A–A traverse le lien près du poignet. La coupe A–A : le bras, le rembourrage, la gouttière d’écorce durcie et le lien, qu’on desserre au premier blanchiment des doigts. L’écharpe, en gros plan, vue du devant : le même bras attelé, l’avant-bras à l’horizontale dans le pan de la chemise relevé par-dessus et épinglé au devant de la chemise en deux points ; la main détendue sort à gauche, le coude et l’écorce à droite, le haut du bras monte vers l’épaule.',
    format: 'pleine',
    disposition: [['tremper', 'mouler'], ['coupe', 'echarpe']],
    largeurs: [[2, 3], [2, 3]],
    fichier: 'planche-26-08-attelle-ecorce-moulee-echarpe.svg',
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
            { n: 8, rond: P(o, 22, 160), cible: P(o, ...MAIN_M.doigts.index), texte: 'doigts dehors, à vérifier' },
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
            { n: 11, rond: [z.l - 20, o.oy + 66], cible: P(o, ...E(C.cx, C.cy, 65, 48, 300)), texte: 'desserré au blanchiment' },
          ];
        },
      },
      echarpe: {
        titre: 'L’écharpe',
        dessin: echarpe,
        renvois: z => {
          const o = boite(z, S.L, S.y0, S.y1);
          return [
            { n: 12, rond: P(o, 120, 274), cible: P(o, 176, 232), texte: 'pan relevé sur le bras' },
            { n: 13, rond: P(o, 118, 96), cible: P(o, EPINGLES[0][0], EPINGLES[0][1] - 13), texte: 'épinglé au devant' },
          ];
        },
      },
    },
  };
};
