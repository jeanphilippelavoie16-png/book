// 86-04 — Le chargeur à essence (ch. 86, §9-B « Le petit moteur et l'alternateur d'auto :
// un chargeur à essence » ; danger repris du §8, point 1).
// Cotes : aucune. Le chapitre ne donne ni diamètre de poulie, ni entraxe, ni dimension de
// bâti ; il donne un rapport (poulie du moteur 1,7 fois celle de l'alternateur pour tout le
// courant, presque égale pour un petit banc) : la planche dessine le cas du petit banc et
// le dit dans le renvoi, sans cote.
// Ce que la planche ajoute au texte, parce que sans ça le montage ne marche pas : la
// courroie se tend (l'alternateur pivote sur son oreille du bas, l'oreille du haut glisse
// dans une lisse fendue qu'on serre), et le boîtier de l'alternateur revient au négatif de
// la batterie par un câble (un bâti de bois ne fait pas la masse).
// Le montage, suivi comme une charge : moteur → poulie du moteur → courroie → poulie de
// l'alternateur ; excitation : + batterie → interrupteur → ampoule témoin → borne du témoin ;
// sortie : gros câble au + ; borne S au + ; boîtier au − ; voltmètre sur les deux bornes.
// Les deux poulies tournent dans le même sens (courroie ouverte).

module.exports = (h) => {
  const r1 = v => Math.round(v * 10) / 10;
  const pt = p => `${r1(p[0])} ${r1(p[1])}`;
  const W = h.a.blanc;
  const rot = (v, a) => [v[0] * Math.cos(a) - v[1] * Math.sin(a), v[0] * Math.sin(a) + v[1] * Math.cos(a)];
  const add = (a, b, k = 1) => [a[0] + b[0] * k, a[1] + b[1] * k];

  // Cadre : un dessin nominal BW × BH centré et mis à l'échelle dans la zone.
  const cadre = (z, BW, BH) => {
    const s = Math.min(z.l / BW, z.h / BH);
    const ox = (z.l - BW * s) / 2, oy = (z.h - BH * s) / 2;
    const P = (x, y) => [ox + x * s, oy + y * s];
    const Q = pts => pts.map(p => P(p[0], p[1]));
    return { s, P, Q };
  };

  const poly = (pts, trait = h.a.arete) => h.chemin(pts, W, true) + '\n' + h.chemin(pts, trait, true);
  const disque = (c, r, trait = h.a.arete) => h.cercle(c[0], c[1], r, W) + '\n' + h.cercle(c[0], c[1], r, trait);
  const hex = (c, r, trait = h.a.detail) => {
    const p = [];
    for (let i = 0; i < 6; i++) p.push([c[0] + r * Math.cos(i * Math.PI / 3), c[1] + r * Math.sin(i * Math.PI / 3)]);
    return poly(p, trait);
  };
  // Une bande (câble, lisse) de largeur l le long d'un segment, bouts arrondis.
  const bande = (a, b, l, trait = h.a.arete, remplir = W) => {
    const d = [b[0] - a[0], b[1] - a[1]], L = Math.hypot(d[0], d[1]);
    const u = [d[0] / L, d[1] / L], n = [-u[1], u[0]], r = l / 2;
    const p1 = add(a, n, r), p2 = add(b, n, r), p3 = add(b, n, -r), p4 = add(a, n, -r);
    const dd = `M ${pt(p1)} L ${pt(p2)} A ${r1(r)} ${r1(r)} 0 0 1 ${pt(p3)} L ${pt(p4)} A ${r1(r)} ${r1(r)} 0 0 1 ${pt(p1)} Z`;
    return h.path(dd, remplir) + '\n' + h.path(dd, trait);
  };
  // Gros câble : trait fort ; fil fin : trait d'arête.
  const cable = (pts, ep) => {
    const d = pts.map((p, i) => `${i ? 'L' : 'M'}${pt(p)}`).join(' ');
    return h.path(d, h.a.contour);
  };
  const fil = pts => h.chemin(pts, h.a.arete);

  // Tangentes extérieures de deux cercles, et la boucle de courroie qui les enveloppe.
  function tangentes(c1, ra, c2, rb) {
    const dx = c2[0] - c1[0], dy = c2[1] - c1[1], D = Math.hypot(dx, dy);
    const u = [dx / D, dy / D], phi = Math.acos((ra - rb) / D);
    const nh = rot(u, -phi), nb = rot(u, phi);
    return { h1: add(c1, nh, ra), h2: add(c2, nh, rb), b1: add(c1, nb, ra), b2: add(c2, nb, rb) };
  }
  function boucle(c1, ra, c2, rb) {
    const t = tangentes(c1, ra, c2, rb);
    return `M ${pt(t.h1)} L ${pt(t.h2)} A ${r1(rb)} ${r1(rb)} 0 0 1 ${pt(t.b2)} L ${pt(t.b1)} A ${r1(ra)} ${r1(ra)} 0 1 1 ${pt(t.h1)} Z`;
  }

  // ───────────────────── Vue 1 : vu du bout des arbres ─────────────────────
  // Nominal 380 × 262. Dessus du bâti à y = 236.
  const BW1 = 380, BH1 = 262;
  const Cm = [100, 176], R1 = 36;          // arbre du moteur, poulie du moteur
  const Ca = [272, 146], R2 = 30, Rb = 52; // arbre de l'alternateur, poulie, boîtier
  const Piv = [272, 213];                  // boulon pivot, oreille du bas
  const LA = [358, 226], LB = [320, 96];   // lisse fendue : ancrage au bâti, bout libre
  const lisseL = Math.hypot(LA[0] - LB[0], LA[1] - LB[1]);
  const lu = [(LA[0] - LB[0]) / lisseL, (LA[1] - LB[1]) / lisseL];
  const lisseAt = t => add(LB, lu, t * lisseL);
  const E = lisseAt(0.13);                 // boulon de l'oreille du haut, dans la fente

  const cylDir = rot([0, -1], -15 * Math.PI / 180);   // cylindre penché vers la gauche
  const cylN = [-cylDir[1], cylDir[0]];
  const cylAt = (t, w) => add(add(Cm, cylDir, t), cylN, w);

  function dessinBati(z) {
    const { s, P, Q } = cadre(z, BW1, BH1);
    const o = [];
    // Le bâti : un madrier sous tout.
    o.push(h.rect(...P(4, 236), 372 * s, 20 * s, h.a.hachure('bois')));

    // ── Moteur ──
    // Silencieux, à la tête, échappement vers le bas et vers l'extérieur.
    // Cylindre à ailettes.
    const ail = [];
    for (let t = 52; t <= 112; t += 7) ail.push(Q([cylAt(t - 1.3, -35), cylAt(t - 1.3, 35), cylAt(t + 1.3, 35), cylAt(t + 1.3, -35)]));
    o.push(poly(Q([cylAt(40, -29), cylAt(40, 29), cylAt(118, 29), cylAt(118, -29)])));
    ail.forEach(a => o.push(poly(a, h.a.detail)));
    // Culasse et bougie.
    o.push(poly(Q([cylAt(118, -32), cylAt(118, 32), cylAt(132, 28), cylAt(132, -28)])));
    o.push(poly(Q([cylAt(132, -4), cylAt(132, 4), cylAt(145, 4), cylAt(145, -4)]), h.a.detail));
    // Silencieux contre la culasse, sortie vers le bas, du côté opposé à l'alternateur.
    o.push(poly(Q([[8, 60], [37, 56], [39, 104], [12, 108]])));
    o.push(poly(Q([[14, 107], [22, 106], [23, 120], [15, 121]]), h.a.detail));
    // Carter, avec ses pattes boulonnées au bâti.
    o.push(poly(Q([[36, 226], [166, 226], [166, 236], [36, 236]])));
    o.push(poly(Q([[46, 226], [46, 142], [60, 126], [144, 126], [158, 142], [158, 226]]), h.a.contour));
    [48, 154].forEach(x => o.push(h.rect(...P(x - 5, 219), 10 * s, 7 * s, h.a.plein)));
    // Réservoir sur le carter, bouchon.
    o.push(poly(Q([[120, 92], [168, 92], [171, 120], [117, 120]])));
    o.push(h.rect(...P(148, 84), 14 * s, 8 * s, h.a.arete));
    // Poulie du moteur.
    o.push(disque(P(...Cm), R1 * s));

    // ── Alternateur ──
    // Équerre du pivot et équerre de la lisse, boulonnées au bâti.
    o.push(h.rect(...P(260, 204), 24 * s, 32 * s, h.a.hachure('metal')));
    o.push(h.rect(...P(250, 230), 44 * s, 6 * s, h.a.hachure('metal')));
    o.push(h.rect(...P(348, 212), 20 * s, 24 * s, h.a.hachure('metal')));
    o.push(h.rect(...P(342, 230), 32 * s, 6 * s, h.a.hachure('metal')));
    // Oreille du bas.
    o.push(poly(Q([[261, 180], [283, 180], [283, 213], [261, 213]])));
    o.push(disque(P(...Piv), 11 * s));
    // Oreille du haut, vers la lisse.
    const ue = [(E[0] - Ca[0]), (E[1] - Ca[1])], Le = Math.hypot(ue[0], ue[1]);
    const u1 = [ue[0] / Le, ue[1] / Le], n1 = [-u1[1], u1[0]];
    o.push(poly(Q([add(add(Ca, u1, 40), n1, 11), add(E, n1, 9), add(E, n1, -9), add(add(Ca, u1, 40), n1, -11)])));
    o.push(disque(P(...E), 10 * s));
    // Boîtier, ses fentes, le ventilateur.
    o.push(disque(P(...Ca), Rb * s, h.a.contour));
    for (let i = 0; i < 16; i++) {
      const a = i * Math.PI / 8 + 0.2;
      const p1 = P(Ca[0] + 45 * Math.cos(a), Ca[1] + 45 * Math.sin(a));
      const p2 = P(Ca[0] + 49.5 * Math.cos(a), Ca[1] + 49.5 * Math.sin(a));
      o.push(h.chemin([p1, p2], h.a.detail));
    }
    o.push(disque(P(...Ca), 42 * s));
    for (let i = 0; i < 12; i++) {
      const a = i * Math.PI / 6;
      const p1 = P(Ca[0] + 31 * Math.cos(a), Ca[1] + 31 * Math.sin(a));
      const p2 = P(Ca[0] + 41 * Math.cos(a + 0.28), Ca[1] + 41 * Math.sin(a + 0.28));
      o.push(h.chemin([p1, p2], h.a.detail));
    }
    // Poulie de l'alternateur.
    o.push(disque(P(...Ca), R2 * s));
    // Lisse fendue, par-dessus l'oreille ; boulons.
    o.push(bande(P(...LB), P(...LA), 13 * s));
    o.push(bande(P(...lisseAt(0.06)), P(...lisseAt(0.36)), 6 * s, h.a.detail));
    o.push(hex(P(...E), 5.5 * s));
    o.push(hex(P(...LA), 5.5 * s));
    o.push(hex(P(...Piv), 5.5 * s));

    // ── Courroie ──
    const cm = P(...Cm), ca = P(...Ca);
    const d = boucle(cm, (R1 + 4) * s, ca, (R2 + 4) * s) + ' ' + boucle(cm, (R1 - 3) * s, ca, (R2 - 3) * s);
    o.push(h.path(d, `${W} fill-rule="evenodd"`));
    o.push(h.path(d, h.a.arete));
    // Moyeux, écrous, clavette.
    o.push(h.cercle(...cm, (R1 - 9) * s, h.a.detail));
    o.push(h.cercle(...ca, (R2 - 9) * s, h.a.detail));
    o.push(disque(cm, 10 * s));
    o.push(hex(cm, 5.5 * s));
    o.push(disque(ca, 9 * s));
    o.push(hex(ca, 5 * s));
    return o.join('\n');
  }

  // ───────────────────── Vue 2 : vu de dessus, le fil tendu ─────────────────────
  // Nominal 380 × 290 ; mêmes abscisses que la vue 1. Les arbres pointent vers le bas.
  const BW2 = 380, BH2 = 292;
  const yF = 244;   // plan des faces avant des deux poulies
  function dessinDessus(z) {
    const { s, P, Q } = cadre(z, BW2, BH2);
    const o = [];
    o.push(h.rect(...P(4, 72), 372 * s, 190 * s, h.a.hachure('bois', 'arete')));
    // Moteur vu de dessus : lanceur à l'arrière, cylindre et silencieux à gauche, réservoir.
    o.push(poly(Q([[58, 40], [142, 40], [142, 62], [58, 62]])));
    o.push(poly(Q([[8, 96], [36, 96], [36, 168], [8, 168]])));
    o.push(poly(Q([[30, 90], [58, 90], [58, 176], [30, 176]])));
    for (let x = 34; x <= 54; x += 5) o.push(h.ligne(...P(x, 90), ...P(x, 176), h.a.detail));
    o.push(poly(Q([[46, 62], [158, 62], [158, 212], [46, 212]]), h.a.contour));
    o.push(poly(Q([[118, 84], [170, 84], [170, 180], [118, 180]])));
    o.push(h.cercle(...P(158, 96), 6 * s, h.a.arete));
    // Arbre et poulie du moteur, vue sur la tranche.
    o.push(poly(Q([[95, 212], [105, 212], [105, 228], [95, 228]])));
    o.push(poly(Q([[Cm[0] - R1, 228], [Cm[0] + R1, 228], [Cm[0] + R1, yF], [Cm[0] - R1, yF]])));
    // Alternateur vu de dessus : boîtier couché, ventilateur, arbre, poulie.
    o.push(poly(Q([[Ca[0] - Rb, 118], [Ca[0] + Rb, 118], [Ca[0] + Rb, 208], [Ca[0] - Rb, 208]]), h.a.contour));
    for (let y = 132; y <= 196; y += 16) o.push(h.ligne(...P(Ca[0] - Rb + 6, y), ...P(Ca[0] + Rb - 6, y), h.a.detail));
    o.push(poly(Q([[Ca[0] - 42, 208], [Ca[0] + 42, 208], [Ca[0] + 42, 218], [Ca[0] - 42, 218]])));
    o.push(poly(Q([[Ca[0] - 4, 218], [Ca[0] + 4, 218], [Ca[0] + 4, 228], [Ca[0] - 4, 228]])));
    o.push(poly(Q([[Ca[0] - R2, 228], [Ca[0] + R2, 228], [Ca[0] + R2, yF], [Ca[0] - R2, yF]])));
    // Courroie vue de dessus, dans les deux gorges.
    o.push(poly(Q([[Cm[0] + R1 - 6, 233], [Ca[0] - R2 + 6, 233], [Ca[0] - R2 + 6, 239], [Cm[0] + R1 - 6, 239]])));
    o.push(h.ligne(...P(Cm[0] - R1 + 6, 233), ...P(Cm[0] - R1 + 6, 239), h.a.detail));
    o.push(h.ligne(...P(Ca[0] + R2 - 6, 233), ...P(Ca[0] + R2 - 6, 239), h.a.detail));
    // Le fil tendu contre les faces des deux poulies, noué à deux clous.
    const fy = yF + 1.2;
    o.push(h.ligne(...P(22, fy), ...P(358, fy), h.a.detail));
    o.push(h.cercle(...P(20, fy), 3.2 * s, h.a.plein));
    o.push(h.cercle(...P(360, fy), 3.2 * s, h.a.plein));
    return o.join('\n');
  }

  // ───────────────────── Vue 3 : le câblage ─────────────────────
  // Nominal 610 × 212. L'alternateur vu de l'arrière, la batterie à droite.
  const BW3 = 610, BH3 = 214;
  const A3 = [92, 102], Rb3 = 62;
  const Bat = { x: 462, y: 122, l: 120, h: 76 };
  const Pp = [488, 110], Pm = [556, 110];   // dessus des bornes + et −
  const yT = 96;                            // rangée du témoin
  function dessinCablage(z) {
    const { s, P, Q } = cadre(z, BW3, BH3);
    const o = [];
    // Oreilles de l'alternateur (vu de l'arrière : l'oreille du haut passe à gauche).
    o.push(poly(Q([[81, 150], [103, 150], [103, 180], [81, 180]])));
    o.push(disque(P(92, 180), 11 * s));
    o.push(h.cercle(...P(92, 180), 4.5 * s, h.a.detail));
    o.push(poly(Q([[52, 62], [36, 58], [30, 74], [46, 82]])));
    o.push(disque(P(33, 66), 10 * s));
    o.push(h.cercle(...P(33, 66), 4.5 * s, h.a.detail));
    // Boîtier arrière : fentes, palier, boulons traversants.
    o.push(disque(P(...A3), Rb3 * s, h.a.contour));
    o.push(h.cercle(...P(...A3), 52 * s, h.a.detail));
    for (let i = 0; i < 8; i++) {
      const a = i * Math.PI / 4 + Math.PI / 8;
      o.push(bande(P(A3[0] + 22 * Math.cos(a), A3[1] + 22 * Math.sin(a)), P(A3[0] + 42 * Math.cos(a), A3[1] + 42 * Math.sin(a)), 6 * s, h.a.detail));
    }
    o.push(disque(P(...A3), 14 * s));
    const tb = [Math.PI / 4, 3 * Math.PI / 4, 5 * Math.PI / 4, 7 * Math.PI / 4].map(a => [A3[0] + 57 * Math.cos(a), A3[1] + 57 * Math.sin(a)]);
    tb.forEach(p => o.push(hex(P(...p), 4 * s)));
    // Borne de sortie : goujon isolé, écrou.
    const Bs = [124, 64];
    o.push(disque(P(...Bs), 9 * s));
    o.push(hex(P(...Bs), 5.5 * s));
    // Fiche à deux broches : témoin en haut, S en bas.
    o.push(poly(Q([[112, 112], [140, 112], [140, 142], [112, 142]])));
    const bT = [134, 120], bS = [134, 134];
    o.push(h.cercle(...P(...bT), 2.6 * s, h.a.plein));
    o.push(h.cercle(...P(...bS), 2.6 * s, h.a.plein));

    // Batterie, bornes, et les signes moulés dans le couvercle.
    o.push(poly(Q([[Bat.x, Bat.y], [Bat.x + Bat.l, Bat.y], [Bat.x + Bat.l, Bat.y + Bat.h], [Bat.x, Bat.y + Bat.h]]), h.a.contour));
    o.push(h.ligne(...P(Bat.x, Bat.y + 12), ...P(Bat.x + Bat.l, Bat.y + 12), h.a.detail));
    [Pp, Pm].forEach(p => o.push(poly(Q([[p[0] - 7, p[1]], [p[0] + 7, p[1]], [p[0] + 7, Bat.y], [p[0] - 7, Bat.y]]))));
    const signe = (c, plus) => {
      const r = [];
      r.push(h.ligne(...P(c[0] - 4, c[1]), ...P(c[0] + 4, c[1]), h.a.arete));
      if (plus) r.push(h.ligne(...P(c[0], c[1] - 4), ...P(c[0], c[1] + 4), h.a.arete));
      return r.join('\n');
    };
    o.push(signe([Pp[0], Bat.y + 26], true));
    o.push(signe([Pm[0], Bat.y + 26], false));

    // Sortie : gros câble au +.
    o.push(cable(Q([Bs, [150, 44], [452, 44], [484, Pp[1] + 1]]), 3.2 * s));
    // Borne S : fil direct au +.
    o.push(fil(Q([bS, [158, 134], [158, 158], [446, 158], [446, 134], [487, Pp[1] + 1]])));
    // Témoin : fiche → ampoule → interrupteur → +.

    o.push(fil(Q([bT, [166, 120], [166, yT], [242, yT]])));
    // Ampoule dans sa douille.
    o.push(poly(Q([[242, yT - 8], [258, yT - 8], [258, yT + 8], [242, yT + 8]])));
    o.push(disque(P(250, yT - 20), 12 * s));
    o.push(h.chemin(Q([[246, yT - 9], [246, yT - 20], [250, yT - 25], [254, yT - 20], [254, yT - 9]]), h.a.fin));
    o.push(fil(Q([[258, yT], [334, yT]])));
    // Interrupteur à bascule.
    o.push(poly(Q([[334, yT - 9], [362, yT - 9], [362, yT + 9], [334, yT + 9]])));
    o.push(h.ligne(...P(348, yT - 9), ...P(356, yT - 26), h.a.contour));
    o.push(disque(P(356, yT - 27), 3.5 * s));
    o.push(fil(Q([[362, yT], [440, yT], [491, Pp[1] + 1]])));
    // Voltmètre sur les deux bornes.
    const V = { x: 498, y: 8, l: 70, h: 44 };
    o.push(poly(Q([[V.x, V.y], [V.x + V.l, V.y], [V.x + V.l, V.y + V.h], [V.x, V.y + V.h]])));
    const vc = [V.x + V.l / 2, V.y + V.h - 8];
    o.push(h.path(`M ${pt(P(vc[0] - 24, vc[1] - 8))} A ${r1(25 * s)} ${r1(25 * s)} 0 0 1 ${pt(P(vc[0] + 24, vc[1] - 8))}`, h.a.detail));
    o.push(h.ligne(...P(...vc), ...P(vc[0] + 10, vc[1] - 24), h.a.arete));
    o.push(fil(Q([[V.x + 12, V.y + V.h], [V.x + 12, 76], [490, Pp[1] + 1]])));
    o.push(fil(Q([[V.x + V.l - 12, V.y + V.h], [V.x + V.l - 12, 80], [Pm[0], Pm[1] + 1]])));
    // Masse : du boîtier au −, par un boulon traversant.
    o.push(cable(Q([tb[1], [40, 146], [40, 202], [600, 202], [600, 104], [572, 104], [Pm[0] + 3, Pm[1] + 2]]), 3.2 * s));
    // Cosses sur les bornes.
    [Pp, Pm].forEach(p => o.push(disque(P(p[0], p[1] + 1), 4 * s)));
    return o.join('\n');
  }

  // ───────────────────── Vues 4 et 5 : la courroie dans sa gorge, en coupe ─────────────────────
  const BW4 = 270, BH4 = 80;
  function dessinV(z) {
    const { s, Q } = cadre(z, BW4, BH4);
    const o = [];
    const k = 24 / 58;
    const gx = y => 100 + k * (y - 20), dx = y => 170 - k * (y - 20);
    // Jante en coupe : gorge en V.
    o.push(h.chemin(Q([[60, 20], [100, 20], [124, 78], [146, 78], [170, 20], [210, 20], [210, 76], [60, 76]]), h.a.hachure('metal'), true));
    // Courroie en V : appuyée sur les flancs, loin du fond.
    o.push(poly(Q([[gx(12), 12], [dx(12), 12], [dx(56), 56], [gx(56), 56]])));
    for (let x = 108; x <= 162; x += 7) o.push(h.cercle(...Q([[x, 22]])[0], 2.2 * s, h.a.plein));
    return o.join('\n');
  }
  function dessinNerv(z) {
    const { s, Q } = cadre(z, BW4, BH4);
    const o = [];
    const P0 = 75, Pas = 24, n = 5, yR = 34, yV = 50, dec = 3;
    // Poulie à nervures en coupe.
    const prof = [[50, yR]];
    for (let i = 0; i < n; i++) prof.push([P0 + i * Pas, yR], [P0 + i * Pas + Pas / 2, yV]);
    prof.push([P0 + n * Pas, yR], [220, yR], [220, 76], [50, 76]);
    o.push(h.chemin(Q(prof), h.a.hachure('metal'), true));
    // Courroie à nervures : même dent, posée dans les creux.
    const c = [[P0 - 2, 12], [P0 + n * Pas + 2, 12], [P0 + n * Pas + 2, yR - dec - 4]];
    for (let i = n - 1; i >= 0; i--) c.push([P0 + (i + 1) * Pas, yR - dec], [P0 + i * Pas + Pas / 2, yV - dec - 2]);
    c.push([P0, yR - dec], [P0 - 2, yR - dec - 4]);
    o.push(poly(Q(c)));
    for (let x = P0 + 6; x <= P0 + n * Pas - 6; x += 8) o.push(h.cercle(...Q([[x, 19]])[0], 2 * s, h.a.plein));
    return o.join('\n');
  }

  return {
    ref: '86-04',
    titre: 'Le chargeur à essence',
    desc: 'Un petit moteur à arbre couché et un alternateur d’auto à régulateur intégré boulonnés sur le même madrier. Vu du bout des arbres : la poulie du moteur, à peine plus grande que celle de l’alternateur, l’entraîne par une courroie ; l’alternateur pivote sur son oreille du bas et son oreille du haut glisse dans une lisse fendue pour tendre la courroie. Vu de dessus : un fil tendu touche la face avant des deux poulies, ce qui aligne les arbres. Le câblage, vu de l’arrière de l’alternateur : gros câble de la sortie au positif de la batterie, borne S au positif, borne du témoin au positif par une ampoule témoin et un interrupteur, boîtier au négatif par un gros câble, voltmètre sur les deux bornes. En coupe : une courroie en V appuyée sur les flancs d’une gorge en V, une courroie à nervures dans une poulie à nervures.',
    format: 'pleine',
    disposition: [['bati', 'dessus'], ['cablage'], ['enV', 'nerv']],
    hauteurs: [4.4, 3.8, 1.5],
    largeurs: [[3, 2], [1], [1, 1]],
    vues: {
      bati: {
        titre: 'Vu du bout des arbres',
        dessin: dessinBati,
        renvois: z => {
          const { P } = cadre(z, BW1, BH1);
          const t = tangentes(Cm, R1 + 4, Ca, R2 + 4);
          const mid = [(t.h1[0] + t.h2[0]) / 2, (t.h1[1] + t.h2[1]) / 2];
          return [
            { n: 1, rond: P(96, 26), cible: P(...cylAt(80, 0)), texte: 'moteur de souffleuse ou de génératrice' },
            { n: 2, rond: P(22, 208), cible: P(Cm[0] - 20, Cm[1] + 12), texte: 'poulies presque égales pour un petit banc' },
            { n: 3, rond: P(190, 44), cible: P(mid[0], mid[1] - 1), texte: 'courroie du profil de la poulie d’alternateur' },
            { n: 4, rond: P(236, 30), cible: P(Ca[0] - 30, Ca[1] - 40), texte: 'alternateur à régulateur intégré' },
            { n: 5, rond: P(366, 40), cible: P(...lisseAt(0.3)), texte: 'pivot en bas, lisse fendue pour tendre' },
          ];
        },
      },
      dessus: {
        titre: 'Vu de dessus',
        dessin: dessinDessus,
        renvois: z => {
          const { P } = cadre(z, BW2, BH2);
          return [
            { n: 6, rond: P(190, 280), cible: P(190, yF + 1.2), texte: 'fil tendu contre les faces des deux poulies' },
          ];
        },
      },
      cablage: {
        titre: 'Le câblage, vu de l’arrière de l’alternateur',
        dessin: dessinCablage,
        renvois: z => {
          const { P } = cadre(z, BW3, BH3);
          return [
            { n: 7, rond: P(268, 18), cible: P(300, 44), texte: 'sortie, gros câble au positif' },
            { n: 8, rond: P(262, 180), cible: P(300, 158), texte: 'borne S au positif, sinon il charge mal' },
            { n: 9, rond: P(200, 76), cible: P(166, 108), texte: 'fil du témoin, borne L ou D+' },
            { n: 10, rond: P(212, 118), cible: P(242, yT - 20), texte: 'ampoule témoin' },
            { n: 11, rond: P(400, 70), cible: P(355, yT - 22), texte: 'interrupteur, ouvert à l’arrêt' },
            { n: 12, rond: P(436, 16), cible: P(498, 24), texte: 'voltmètre : couper à l’absorption' },
          ];
        },
      },
      enV: {
        titre: 'Courroie en V, poulie en V',
        dessin: dessinV,
      },
      nerv: {
        titre: 'Courroie à nervures, poulie à nervures',
        dessin: dessinNerv,
      },
    },
    danger: 'Danger — le moteur ne tourne jamais dans un bâtiment, un garage ou sous un auvent : au moins 6 m de tout bâtiment, l’échappement à l’opposé des portes et des fenêtres. Le monoxyde de carbone n’a ni odeur ni couleur ; on s’endort au lieu de sortir.',
  };
};
