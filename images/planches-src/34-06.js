// Planche 34-06 — Le linge d'une maison qui a la gale (ch. 34, étapes 50 et 51 ; §9, « Traiter le
// linge d'une maison qui a la gale, sans laveuse »).
//
// Ce que le chapitre dit, et rien d'autre :
//   Ce qui se porte contre la peau — sous-vêtements, pyjamas, draps, taies, serviettes — va à l'eau
//   bouillante, par charges, le jour du traitement : le chaudron du poêle ne contient pas la literie
//   de quatre personnes. Sans thermomètre, l'eau qui bout dépasse largement les 50 °C ; on la laisse
//   bouillir 10 minutes par charge. Ce qui ne bouillit pas — manteaux, couvertures de laine, peaux,
//   bottes, toutous — va dans des sacs fermés, un coffre ou une pièce qu'on ferme, une semaine, dans
//   la partie chauffée et sèche du chalet. Pas dans la remise, et pas dehors : le froid humide garde
//   l'acarien en vie. La maisonnée vit la semaine dans du linge neuf ou bouilli.
//
// Aucune cote : rien ne se construit ici. Le bâton qui enfonce la charge, le panier et la cuve sont
// des choix de dessin pour « par charges » (on ne met pas la main dans l'eau qui bout) : ce qu'on
// trouve partout. Le col du sac tordu et noué d'une ficelle est le choix de dessin pour « fermé ».
// La main vient de la bibliothèque de formes (prise, vue du dos, main gauche : le bras arrive de droite,
// à l'horizontale, le poing serré sur le bâton presque droit, le pouce couché dessus) — refaite le
// 12 octobre sur la remarque de JP (« main »).
module.exports = (h) => {
  const N = '#1A1A1A', B = '#FFFFFF';
  const f = v => Math.round(v * 10) / 10;
  const P = p => `${f(p[0])} ${f(p[1])}`;
  const RAD = Math.PI / 180;
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const mul = (a, k) => [a[0] * k, a[1] * k];
  const uni = a => { const l = Math.hypot(a[0], a[1]) || 1; return [a[0] / l, a[1] / l]; };
  const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  const blanc = (ep = 1.4) => `fill="${B}" stroke="${N}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="round"`;
  const noir = (ep = 0.7) => `fill="${N}" stroke="${N}" stroke-width="${ep}" stroke-linejoin="round"`;
  const trait = ep => `fill="none" stroke="${N}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="round"`;
  const decale = (dx, dy, s) => `<g transform="translate(${f(dx)} ${f(dy)})">\n${s}\n</g>`;

  // Une courbe douce par des points (Catmull-Rom), ouverte ou fermée.
  const lisse = (pts, ferme = false, debut = true) => {
    const n = pts.length, g = i => ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
    let d = debut ? `M${P(pts[0])}` : '';
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C${P(c1)} ${P(c2)} ${P(p2)}`;
    }
    return d + (ferme ? ' Z' : '');
  };
  const forme = (pts, at) => h.path(lisse(pts, true), at);
  const courbe = (pts, at = h.a.detail) => h.path(lisse(pts), at);

  // Une volute de vapeur ou de fumée qui monte de (x, y0) à y1, en ondulant.
  const vapeur = (x, y0, y1, a = 2.6, pas = 14, phase = 0, at = h.a.detail) => {
    const pts = [];
    for (let y = y0; y >= y1 - 0.01; y -= pas / 3) pts.push([x + a * Math.sin(phase + (y0 - y) / pas * 2 * Math.PI), y]);
    return courbe(pts, at);
  };

  // Un sac fermé : le ventre bosselé, le col tordu serré d'une ficelle, la fronce au-dessus.
  // cx : milieu, yb : le sol, l : largeur, ht : hauteur du ventre, k : échelle des détails.
  const sacFerme = (cx, yb, l, ht, k = 1, graine = 0) => {
    const w = l / 2, yc = yb - ht;                          // yc : le haut des épaules
    const b = graine ? 0.06 : 0;
    const ventre = [
      [cx - 3 * k, yc - 2 * k], [cx - w * 0.55, yc + ht * 0.08], [cx - w * 0.92, yc + ht * 0.3],
      [cx - w, yc + ht * (0.6 - b)], [cx - w * 0.9, yc + ht * 0.9], [cx - w * 0.55, yb],
      [cx + w * 0.5, yb], [cx + w * 0.92, yc + ht * 0.88], [cx + w, yc + ht * (0.55 + b)],
      [cx + w * 0.86, yc + ht * 0.26], [cx + w * 0.5, yc + ht * 0.07], [cx + 3 * k, yc - 2 * k],
    ];
    const out = [forme(ventre, blanc(k < 0.9 ? 1.4 : 2.4))];
    // les plis froncés qui partent du col
    out.push(courbe([[cx - 2 * k, yc], [cx - w * 0.35, yc + ht * 0.22], [cx - w * 0.55, yc + ht * 0.42]], h.a.fin));
    out.push(courbe([[cx + 1 * k, yc + 1 * k], [cx + w * 0.05, yc + ht * 0.3], [cx - w * 0.08, yc + ht * 0.5]], h.a.fin));
    out.push(courbe([[cx + 3 * k, yc], [cx + w * 0.4, yc + ht * 0.2], [cx + w * 0.6, yc + ht * 0.38]], h.a.fin));
    out.push(courbe([[cx + w * 0.45, yb - 1], [cx + w * 0.62, yc + ht * 0.72]], h.a.fin));
    // le col tordu
    const c0 = yc - 1 * k, c1 = yc - 20 * k;
    out.push(h.chemin([[cx - 4 * k, c0], [cx - 5 * k, c1], [cx + 5 * k, c1], [cx + 4 * k, c0]], blanc(1.4), true));
    for (let i = 0; i < 3; i++) {
      const y = c0 - 4 * k - i * 5.5 * k;
      out.push(h.ligne(cx - 4.2 * k, y, cx + 4.2 * k, y - 3.5 * k, h.a.fin));
    }
    // la fronce au-dessus du col
    const t = c1;
    out.push(forme([[cx - 5 * k, t + 1 * k], [cx - 12 * k, t - 8 * k], [cx - 8 * k, t - 13 * k], [cx - 3 * k, t - 8 * k],
      [cx + 1 * k, t - 16 * k], [cx + 4 * k, t - 9 * k], [cx + 10 * k, t - 14 * k], [cx + 12 * k, t - 7 * k], [cx + 5 * k, t + 1 * k]], blanc(1.4)));
    out.push(courbe([[cx - 2 * k, t - 1 * k], [cx - 6 * k, t - 8 * k]], h.a.fin));
    out.push(courbe([[cx + 2 * k, t - 1 * k], [cx + 6 * k, t - 9 * k]], h.a.fin));
    // la ficelle : trois tours serrés et le nœud, les deux bouts libres
    const yf = c0 - 9 * k;
    for (let i = 0; i < 3; i++) {
      const y = yf - 3 * k + i * 3 * k;
      out.push(h.ligne(cx - 5.2 * k, y + 1 * k, cx + 5.2 * k, y - 1 * k, trait(k < 0.9 ? 1.4 : 2.4)));
    }
    out.push(h.ellipse(cx + 6.5 * k, yf, 3 * k, 2.4 * k, noir(0.7)));
    out.push(courbe([[cx + 8 * k, yf + 1 * k], [cx + 13 * k, yf + 7 * k], [cx + 14 * k, yf + 14 * k]], trait(k < 0.9 ? 0.7 : 1.4)));
    out.push(courbe([[cx + 8.5 * k, yf - 1 * k], [cx + 16 * k, yf + 2 * k], [cx + 19 * k, yf + 9 * k]], trait(k < 0.9 ? 0.7 : 1.4)));
    return { svg: out.join('\n'), noeud: [cx + 6.5 * k, yf] };
  };

  // Un poêle à bois vu de face : plaque, caisse, porte, pattes. (x, y) : le coin haut gauche de la plaque.
  const poele = (x, y, l, ht, patte, k = 1) => {
    const out = [];
    const cx0 = x + l * 0.03, cx1 = x + l * 0.97;
    const yb = y + ht;                                       // le dessous de la caisse
    // les pattes
    [[cx0 + l * 0.05], [cx1 - l * 0.05 - 12 * k]].forEach(([px]) => {
      out.push(h.chemin([[px, yb - 1], [px + 12 * k, yb - 1], [px + 10 * k, yb + patte - 5 * k], [px + 13 * k, yb + patte],
        [px - 1 * k, yb + patte], [px + 2 * k, yb + patte - 5 * k]], blanc(1.4), true));
    });
    // la caisse, la plaque, le socle
    out.push(h.rect(cx0, y + 7 * k, cx1 - cx0, ht - 7 * k, blanc(2.4)));
    out.push(h.rect(x, y, l, 7 * k, blanc(1.4)));
    out.push(h.rect(x + l * 0.015, yb - 6 * k, l * 0.97, 7 * k, blanc(1.4)));
    // la porte
    const dx0 = x + l * 0.14, dx1 = x + l * 0.7, dy0 = y + 18 * k, dy1 = yb - 13 * k;
    out.push(h.rect(dx0, dy0, dx1 - dx0, dy1 - dy0, blanc(1.4)));
    out.push(h.rect(dx0 + 6 * k, dy0 + 6 * k, dx1 - dx0 - 12 * k, dy1 - dy0 - 12 * k, h.a.fin));
    [0.18, 0.72].forEach(t => out.push(h.rect(dx0 - 4 * k, dy0 + (dy1 - dy0) * t - 5 * k, 4 * k, 10 * k, blanc(0.7))));
    const pc = [dx1 - 11 * k, (dy0 + dy1) / 2];
    out.push(h.rect(pc[0] - 2.5 * k, pc[1] - 3 * k, 5 * k, 20 * k, blanc(1.4)));
    out.push(h.cercle(pc[0], pc[1], 4 * k, blanc(1.4)));
    // la clé d'air, à droite de la porte
    const ac = [x + l * 0.84, dy0 + (dy1 - dy0) * 0.62];
    out.push(h.cercle(ac[0], ac[1], 9 * k, blanc(1.4)));
    for (let i = 0; i < 4; i++) {
      const a = i * 90 * RAD + 0.4;
      out.push(h.ligne(ac[0] + Math.cos(a) * 3 * k, ac[1] + Math.sin(a) * 3 * k, ac[0] + Math.cos(a) * 7 * k, ac[1] + Math.sin(a) * 7 * k, trait(k < 0.9 ? 0.7 : 1.4)));
    }
    return out.join('\n');
  };

  // ─── 1. Le chaudron, une charge à la fois ────────────────────────────────────────────
  const W1 = 600, H1 = 351, SOL = 338;
  const cx = 282, RIM = 88, FOND = 196, EAU = 108, Y2 = 178;
  const hw = y => 72 + 8 * Math.sin(Math.PI * (y - RIM) / 120);
  const flanc = (s, y0) => { const pts = []; for (let y = y0; y < Y2 - 3; y += 7) pts.push([cx + s * hw(y), y]); pts.push([cx + s * hw(Y2), Y2]); return pts; };
  const pot = y0 => {
    const g = flanc(-1, y0), d = flanc(1, y0).reverse();
    return lisse(g) + ` Q${P([cx - hw(Y2) + 1, FOND])} ${P([cx - 58, FOND])} L${P([cx + 58, FOND])} Q${P([cx + hw(Y2) - 1, FOND])} ${P(d[0])}` + lisse(d, false, false);
  };
  // Le même profil en points serrés, décalé de dw vers l'extérieur : pour la paroi pleine et l'eau.
  const potPts = (y0, dw = 0) => {
    const flancP = s => { const a = []; for (let y = y0; y < Y2; y += 3) a.push([cx + s * (hw(y) + dw), y]); a.push([cx + s * (hw(Y2) + dw), Y2]); return a; };
    const coin = s => {
      const p0 = [cx + s * (hw(Y2) + dw), Y2], c = [cx + s * (hw(Y2) - 1 + dw), FOND + dw], p1 = [cx + s * (58 + dw * 0.4), FOND + dw], a = [];
      for (let i = 1; i <= 8; i++) { const t = i / 8; a.push([(1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * c[0] + t * t * p1[0], (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * c[1] + t * t * p1[1]]); }
      return a;
    };
    return flancP(-1).concat(coin(-1), coin(1).reverse(), flancP(1).reverse());
  };
  // le bâton et la main
  const HM = [300, 50], ANG = -10;
  const HAUT = [Math.sin(ANG * RAD), -Math.cos(ANG * RAD)], DR = [Math.cos(ANG * RAD), Math.sin(ANG * RAD)];
  const surBaton = (t, o = 0) => add(add(HM, mul(HAUT, t)), mul(DR, o));
  const BOUT = surBaton(-98.5), TETE = surBaton(40);

  const baton = () => {
    const u = uni(sub(BOUT, TETE)), n = [-u[1] * 6, u[0] * 6];
    return [
      h.path(`M${P(add(TETE, n))} L${P(add(BOUT, n))} A6 6 0 0 0 ${P(sub(BOUT, n))} L${P(sub(TETE, n))} A6 6 0 0 0 ${P(add(TETE, n))} Z`, blanc(1.4)),
      h.path(`M${P(surBaton(12, 1.8))} L${P(surBaton(-30, 1.8))} M${P(surBaton(-44, -2))} L${P(surBaton(-80, -2))}`, h.a.fin),
    ].join('\n');
  };

  const chaudron = () => {
    const out = [];
    // le sol
    out.push(h.ligne(0, SOL, W1, SOL, h.a.contour));
    // le tuyau du poêle, qui monte derrière le chaudron ; coupé en haut par un trait de brisure
    out.push(h.path('M214 196 L214 18 Q219 12 224 16 Q229 20 234 14 L234 196 Z', blanc(1.4)));
    [40, 72].forEach(y => out.push(h.ligne(214, y, 234, y, h.a.detail)));
    // le poêle
    out.push(poele(192, 196, 192, 104, 42));
    // le chaudron en coupe : le fond blanc (la paroi du fond cache le tuyau), l'eau, la charge, les bulles
    out.push(h.chemin(potPts(RIM, 0), h.a.blanc, true));
    out.push(h.chemin(potPts(EAU, 0), h.a.hachure('eau', 'aucun'), true));
    const linge = [[cx - 50, 191], [cx - 67, 178], [cx - 66, 158], [cx - 58, 146], [cx - 50, 139], [cx - 36, 136], [cx - 22, 141],
      [cx - 8, 136], [cx + 6, 139], [cx + 17, 140], [cx + 25, 147], [cx + 33, 140], [cx + 46, 140], [cx + 58, 146], [cx + 66, 160],
      [cx + 66, 176], [cx + 50, 191]];
    out.push(forme(linge, blanc(1.4)));
    [
      [[cx - 58, 170], [cx - 40, 160], [cx - 20, 166], [cx - 12, 160]],
      [[cx - 44, 186], [cx - 24, 176], [cx + 2, 182], [cx + 22, 172]],
      [[cx + 8, 156], [cx + 28, 162], [cx + 52, 154]],
      [[cx - 52, 146], [cx - 40, 151], [cx - 24, 150]],
      [[cx - 6, 142], [cx - 2, 152]],
      [[cx + 36, 182], [cx + 50, 172], [cx + 58, 176]],
    ].forEach(p => out.push(courbe(p, h.a.detail)));
    [[cx - 72, 172, 2.4], [cx - 73, 150, 3], [cx - 70, 127, 2.4], [cx + 72, 168, 2.4], [cx + 73, 142, 3], [cx + 70, 120, 2],
      [cx - 22, 125, 3], [cx - 10, 116, 2.4], [cx + 10, 127, 2], [cx + 44, 126, 2.4], [cx + 54, 116, 2.4], [cx - 36, 116, 2],
      [cx - 48, 124, 2], [cx + 70, 156, 2]]
      .forEach(([x, y, r]) => out.push(h.cercle(x, y, r, blanc(0.7))));
    // la surface qui bouillonne
    const sx0 = cx - hw(EAU) + 2, sx1 = cx + hw(EAU) - 2, surf = [];
    for (let x = sx0; x <= sx1 + 0.01; x += (sx1 - sx0) / 20) surf.push([x, EAU - 1.6 * Math.abs(Math.sin((x - sx0) / 9))]);
    out.push(courbe(surf, h.a.detail));
    // la paroi coupée (en plein), la lèvre, les oreilles
    out.push(h.chemin(potPts(RIM, 2.5).concat(potPts(RIM, -2.5).reverse()), h.a.plein, true));
    [-1, 1].forEach(s => {
      out.push(h.cercle(cx + s * (hw(RIM) + 1), RIM, 3.4, noir(0.5)));
      const a = [cx + s * hw(93), 93], b = [cx + s * hw(110), 110];
      out.push(h.path(`M${P(a)} C${P([cx + s * 98, 90])} ${P([cx + s * 98, 113])} ${P(b)}`, h.a.contour));
    });
    // la vapeur
    [[cx - 40, 0], [cx - 22, 2], [cx - 4, 4], [cx + 14, 1]].forEach(([x, ph]) => out.push(vapeur(x, EAU - 8, 52 + ph * 2, 2.8, 16, ph)));

    // le panier : les charges qui attendent
    const pb = [[48, SOL], [152, SOL]], ph = [[38, 284], [162, 284]];
    out.push(forme([[40, 282], [44, 262], [60, 250], [80, 254], [96, 240], [116, 244], [136, 236], [152, 248], [162, 264], [160, 282]], blanc(1.4)));
    [[[52, 270], [70, 262], [86, 268]], [[100, 254], [118, 252], [132, 258]], [[62, 280], [80, 272], [104, 276], [118, 268]], [[138, 250], [150, 262]]]
      .forEach(p => out.push(courbe(p, h.a.detail)));
    out.push(h.chemin([ph[0], ph[1], pb[1], pb[0]], blanc(2.4), true));
    for (let i = 1; i <= 7; i++) {
      const t = i / 8, a = lerp(ph[0], pb[0], t), b = lerp(ph[1], pb[1], t), pts = [];
      for (let j = 0; j <= 24; j++) { const q = lerp(a, b, j / 24); pts.push([q[0], q[1] + 1.4 * Math.sin(j * Math.PI / 2 + i * Math.PI)]); }
      out.push(courbe(pts, h.a.fin));
    }
    for (let i = 1; i < 9; i++) out.push(h.ligne(lerp(ph[0], ph[1], i / 9)[0], 288, lerp(pb[0], pb[1], i / 9)[0], SOL - 2, h.a.fin));
    out.push(h.rect(34, 278, 132, 9, blanc(1.4) + ' rx="4"'));
    // une manche de pyjama rayée qui pend par-dessus le bord
    out.push(forme([[116, 281], [134, 279], [139, 298], [143, 320], [141, 326], [127, 328], [124, 318], [121, 298]], blanc(1.4)));
    out.push(courbe([[124, 318], [142, 315]], h.a.detail));
    [[[121, 290], [137, 288]], [[122, 300], [139, 298]], [[123, 309], [141, 306]]].forEach(p => out.push(courbe(p, h.a.fin)));
    // la cuve : le linge bouilli
    const cb = [[454, SOL], [570, SOL]], chh = [[444, 292], [580, 292]];
    out.push(forme([[446, 290], [452, 272], [472, 264], [492, 270], [512, 258], [534, 264], [556, 260], [572, 272], [578, 290]], blanc(1.4)));
    [[[462, 280], [480, 272], [498, 280]], [[516, 270], [536, 268], [552, 276]], [[486, 288], [508, 280], [530, 286]]]
      .forEach(p => out.push(courbe(p, h.a.detail)));
    out.push(h.chemin([chh[0], chh[1], cb[1], cb[0]], blanc(2.4), true));
    [308, 324].forEach(y => {
      const t = (y - 292) / (SOL - 292);
      const xa = lerp(chh[0], cb[0], t)[0], xb = lerp(chh[1], cb[1], t)[0];
      out.push(h.ligne(xa, y, xb, y, h.a.detail));
      out.push(h.ligne(xa + 0.6, y + 3, xb - 0.6, y + 3, h.a.detail));
    });
    out.push(h.rect(440, 287, 144, 7, blanc(1.4) + ' rx="3.5"'));
    [-1, 1].forEach(s => {
      const x = s < 0 ? 441 : 583;
      out.push(h.path(`M${P([x, 296])} C${P([x + s * 12, 296])} ${P([x + s * 12, 310])} ${P([x - s * 2, 310])}`, trait(2)));
    });
    [[494, 0], [538, 2]].forEach(([x, p]) => out.push(vapeur(x, 254, 222, 2.2, 12, p)));

    // le mouvement des charges
    out.push(h.fleche('M100 232 Q108 96 198 74'));
    out.push(h.fleche('M382 110 Q500 104 508 250'));
    // le geste : enfoncer la charge
    out.push(h.fleche(`M${P(surBaton(-22, 14))} L${P(surBaton(-52, 14))}`));
    // la main sur le bâton
    // modèle s11 (poing fermé), main gauche, tourné pour que le bâton (12 de diamètre, 25 px dans le
    // modèle) suive HAUT : le pouce en haut, l'avant-bras à droite, qui finit ouvert
    out.push(baton());
    out.push(String(h.formes.modele('s11', { x: HM[0], y: HM[1], ancre: [68, 42], angle: ANG - 90, echelle: 12 / 25,
      masquer: [[0, 150, 140, 175]], bras: { a: [21.8, 150], a0: [20.8, 135], b: [76.3, 150], b0: [76.2, 135], long: 90, fin: 'ouvert' } })));
    return out.join('\n');
  };

  // ─── 2. Le sac ───────────────────────────────────────────────────────────────────────
  const W2 = 231, H2 = 262;
  const SOL2 = 258;
  const botte = (x, y) => {                                   // (x, y) : le haut arrière de la tige
    const out = [];
    out.push(h.chemin([[x, y + 8], [x + 26, y + 8], [x + 27, y + 42], [x + 44, y + 48], [x + 52, y + 57], [x + 52, y + 66],
      [x - 2, y + 66], [x - 2, y + 50]], blanc(2.4), true));
    out.push(h.rect(x - 3, y, 32, 10, blanc(1.4) + ' rx="3"'));           // le rebord de la doublure
    out.push(h.rect(x - 3, y + 66, 57, 6, blanc(1.4) + ' rx="2"'));        // la semelle
    for (let i = 0; i < 5; i++) out.push(h.ligne(x + 4 + i * 10, y + 72, x + 4 + i * 10, y + 69, h.a.detail));
    out.push(courbe([[x - 2, y + 52], [x + 22, y + 50], [x + 34, y + 47]], h.a.detail));   // le haut du caoutchouc
    out.push(courbe([[x + 40, y + 55], [x + 44, y + 60], [x + 44, y + 66]], h.a.fin));
    for (let i = 0; i < 4; i++) {
      const yy = y + 16 + i * 8;
      out.push(h.ligne(x + 18, yy, x + 27, yy + 4, h.a.detail));
      out.push(h.ligne(x + 18, yy + 4, x + 27, yy, h.a.detail));
    }
    return out.join('\n');
  };
  const sac = () => {
    const out = [];
    out.push(h.ligne(0, SOL2, W2, SOL2, h.a.contour));
    // le sac ouvert : la bouche molle, ce qui dépasse, puis le devant
    const L = [14, 120], R = [100, 118];
    const arriere = [L, [22, 112], [36, 108], [52, 111], [66, 107], [82, 110], [94, 113], R];
    const avant = [R, [92, 125], [78, 129], [62, 126], [46, 130], [30, 127], [20, 124], L];
    out.push(h.path(lisse(arriere) + lisse(avant, false, false) + ' Z', blanc(1.4)));
    out.push(courbe([[22, 118], [38, 114], [56, 116], [74, 113], [92, 117]], h.a.fin));
    // le toutou, enfoncé jusqu'au cou
    const tc = [38, 110];
    [[-12, -12], [12, -12]].forEach(([dx, dy]) => {
      out.push(h.cercle(tc[0] + dx, tc[1] + dy, 6.5, blanc(1.4)));
      out.push(h.cercle(tc[0] + dx, tc[1] + dy, 3.2, h.a.fin));
    });
    out.push(h.cercle(tc[0], tc[1], 15, blanc(1.4)));
    out.push(h.ellipse(tc[0], tc[1] + 6, 7, 5, blanc(0.7)));
    out.push(h.ellipse(tc[0], tc[1] + 3.5, 2.6, 1.8, noir(0.5)));
    out.push(h.path(`M${P([tc[0], tc[1] + 5])} L${P([tc[0], tc[1] + 8])}`, h.a.fin));
    out.push(h.cercle(tc[0] - 6, tc[1] - 3, 1.5, noir(0.5)));
    out.push(h.cercle(tc[0] + 6, tc[1] - 3, 1.5, noir(0.5)));
    // la couverture de laine : le pli dans le sac…
    out.push(forme([[56, 128], [58, 117], [68, 110], [88, 109], [100, 114], [102, 125]], blanc(1.4)));
    // le devant du sac
    const corps = [L, [10, 145], [7, 185], [9, 225], [18, 250], [36, SOL2], [80, SOL2], [98, 250], [107, 225], [108, 185], [105, 145], R];
    out.push(h.path(lisse(corps) + lisse(avant, false, false) + ' Z', blanc(2.4)));
    [[[22, 134], [18, 168], [22, 200]], [[92, 176], [98, 210]], [[52, 200], [62, 230], [58, 252]], [[36, 140], [40, 156]],
      [[98, 228], [88, 250]], [[70, 190], [76, 214]]]
      .forEach(p => out.push(courbe(p, h.a.fin)));
    // … et le pan qui pend par-dessus le bord : les bandes, la frange
    out.push(forme([[56, 126], [80, 129], [103, 122], [106, 142], [107, 160], [82, 163], [58, 162], [54, 142]], blanc(1.4)));
    out.push(h.chemin([[54.6, 136], [105.6, 133.5], [106, 138], [54.4, 140.5]], h.a.plein, true));
    out.push(h.chemin([[54.4, 146], [106.3, 143.5], [106.6, 148], [54.6, 150.5]], h.a.plein, true));
    out.push(courbe([[76, 131], [78, 146], [76, 161]], h.a.fin));
    for (let x = 61; x <= 104; x += 4) out.push(h.ligne(x, 162.5, x - 0.8, 169, h.a.detail));
    // la botte qu'on descend dedans
    out.push(botte(52, 4));
    out.push(h.fleche('M32 20 L32 76'));
    // puis on ferme
    out.push(h.fleche('M115 196 L141 196'));
    const s = sacFerme(184, SOL2, 76, 124, 1.25, 1);
    out.push(s.svg);
    return { svg: out.join('\n'), noeud: s.noeud, botte: [62, 40] };
  };

  // ─── 3. Le chalet, en coupe ──────────────────────────────────────────────────────────
  const W3 = 346, H3 = 262;
  const SOL3 = 238, TERRE = 246;
  const toitExt = x => x <= 119 ? 138 - (x - 4) * 76 / 115 : 62 + (x - 119) * 76 / 115;
  const toitInt = x => toitExt(x) + 9;
  const appentis = x => 156 + (x - 222) * 26 / 118;            // le dessus du toit de la remise
  const chalet = () => {
    const out = [];
    // la terre, la neige dehors
    out.push(h.rect(0, TERRE, W3, H3 - TERRE, h.a.hachure('terre', 'aucun')));
    out.push(h.ligne(0, TERRE, W3, TERRE, h.a.arete));
    out.push(forme([[-2, TERRE], [-2, TERRE - 6], [8, TERRE - 9], [16, TERRE - 4], [18, TERRE]], h.a.hachure('neige', 'detail')));
    out.push(forme([[334, TERRE], [336, TERRE - 12], [342, TERRE - 10], [348, TERRE - 8], [348, TERRE]], h.a.hachure('neige', 'detail')));
    // le plancher de la pièce chauffée
    out.push(h.rect(16, SOL3, 206, TERRE - SOL3, h.a.hachure('bois', 'arete')));
    // les murs de rondins, en coupe
    out.push(h.chemin([[16, toitInt(16)], [26, toitInt(26)], [26, SOL3], [16, SOL3]], h.a.hachure('bois', 'arete'), true));
    out.push(h.chemin([[212, toitInt(212)], [222, toitInt(222)], [222, TERRE], [212, TERRE]], h.a.hachure('bois', 'arete'), true));
    // le toit
    out.push(h.chemin([[4, toitExt(4)], [119, toitExt(119)], [234, toitExt(234)], [234, toitInt(234)], [119, toitInt(119)], [4, toitInt(4)]], h.a.hachure('bois', 'arete'), true));
    // la remise : un toit mince, un mur de planches, la neige dessus, les glaçons
    out.push(h.chemin([[222, appentis(222)], [340, appentis(340)], [340, appentis(340) + 5], [222, appentis(222) + 5]], blanc(1.4), true));
    out.push(h.rect(328, appentis(328) + 5, 4, TERRE - appentis(328) - 5, blanc(1.4)));
    out.push(h.path(`M${P([222, appentis(222)])} L${P([222, appentis(222) - 13])} L${P([340, appentis(340) - 14])} Q${P([349, appentis(340) - 12])} ${P([346, appentis(340) + 1])} L${P([340, appentis(340)])} Z`, h.a.hachure('neige', 'detail')));
    [[333, 12], [337, 8], [341, 14]].forEach(([x, l]) => {
      const y = appentis(x) + 5;
      out.push(h.chemin([[x - 1.8, y], [x + 1.8, y], [x, y + l]], blanc(0.7), true));
    });
    // le bois cordé dans la remise
    [[244, 7], [259, 7], [274, 7], [289, 7], [304, 7], [319, 6]].forEach(([x, r]) => out.push(h.cercle(x, TERRE - r, r, blanc(1.4)), h.cercle(x, TERRE - r, r * 0.45, h.a.fin)));
    [[251, 7], [266, 7], [281, 7], [296, 7], [311, 7]].forEach(([x, r]) => out.push(h.cercle(x, TERRE - 20, r, blanc(1.4)), h.cercle(x, TERRE - 20, r * 0.45, h.a.fin)));
    [[259, 7], [274, 7], [289, 7], [304, 6]].forEach(([x, r]) => out.push(h.cercle(x, TERRE - 33, r, blanc(1.4)), h.cercle(x, TERRE - 33, r * 0.45, h.a.fin)));
    // le poêle, son tuyau qui traverse le toit, la fumée
    out.push(h.rect(163, 22, 7, 188, blanc(1.4)));
    out.push(h.rect(160, 18, 13, 5, blanc(1.4)));
    out.push(vapeur(168, 14, -10, 3, 16, 0.5, h.a.detail));
    out.push(poele(146, 206, 42, 22, 10, 0.22));
    // la chaleur qui monte du poêle
    [[140, 0], [194, 1.5]].forEach(([x, p]) => out.push(vapeur(x, 222, 176, 2, 12, p, h.a.fin)));
    // le coffre
    out.push(h.rect(30, 214, 48, 24, blanc(2.4)));
    out.push(h.path(`M30 214 L30 208 Q54 197 78 208 L78 214 Z`, blanc(1.4)));
    [40, 68].forEach(x => out.push(h.ligne(x, 205, x, SOL3, h.a.detail)));
    out.push(h.rect(51, 212, 6, 7, blanc(0.7)));
    // les sacs fermés
    const s1 = sacFerme(100, SOL3, 30, 30, 0.55, 1), s2 = sacFerme(128, SOL3, 26, 24, 0.5, 0);
    out.push(s1.svg, s2.svg);
    return out.join('\n');
  };

  return {
    ref: '34-06',
    titre: 'Le linge d’une maison qui a la gale',
    desc: 'Le jour du traitement, le linge qui touche la peau bout au chaudron du poêle, une charge à la fois, enfoncé au bâton ; ce qui ne bouillit pas va en sac fermé, et les sacs passent la semaine dans la pièce chauffée, pas dans la remise froide.',
    format: 'pleine',
    disposition: [['chaudron'], ['sac', 'chalet']],
    hauteurs: [5, 4],
    largeurs: [[1], [2, 3]],
    vues: {
      chaudron: {
        titre: 'Ce qui touche la peau : au chaudron, une charge à la fois',
        dessin: z => decale((z.l - W1) / 2, (z.h - H1) / 2, chaudron()),
        renvois: z => {
          const o = [(z.l - W1) / 2, (z.h - H1) / 2], p = q => add(q, o);
          return [
            { n: 1, rond: p([30, 214]), cible: p([72, 252]), texte: 'draps, pyjamas, sous-vêtements' },
            { n: 2, rond: p([430, 176]), cible: p([cx + 70, 152]), texte: 'bouillir 10 minutes par charge' },
            { n: 3, rond: p([254, 30]), cible: surBaton(34).map((v, i) => v + o[i]), texte: 'le bâton enfonce la charge' },
            { n: 4, rond: p([590, 232]), cible: p([552, 266]), texte: 'le linge bouilli, pour la semaine' },
          ];
        },
      },
      sac: {
        titre: 'Ce qui ne bouillit pas : en sac fermé',
        dessin: z => decale((z.l - W2) / 2, (z.h - H2) / 2, sac().svg),
        renvois: z => {
          const o = [(z.l - W2) / 2, (z.h - H2) / 2], p = q => add(q, o), s = sac();
          return [
            { n: 5, rond: p([124, 16]), cible: p([72, 26]), texte: 'manteaux, bottes, laine, toutous' },
            { n: 6, rond: p([216, 88]), cible: p(s.noeud), texte: 'le col tordu, noué serré' },
          ];
        },
      },
      chalet: {
        titre: 'Une semaine, au chaud et au sec',
        dessin: z => decale((z.l - W3) / 2, (z.h - H3) / 2, chalet()),
        renvois: z => {
          const o = [(z.l - W3) / 2, (z.h - H3) / 2], p = q => add(q, o);
          return [
            { n: 7, rond: p([64, 170]), cible: p([98, 222]), texte: 'dans la pièce chauffée et sèche' },
            { n: 8, rond: p([284, 120]), cible: p([282, 196]), texte: 'ni la remise froide, ni dehors' },
          ];
        },
      },
    },
  };
};
