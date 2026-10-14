// Planche 38-01 — Les trois gestes de l'enfant si l'adulte ne se relève pas. Chapitre 38,
// section 9, « Ce que les enfants savent faire si l'adulte ne se relève pas », et « L'abri ».
// Une bande dessinée à hauteur d'enfant, dans l'ordre du chapitre :
//   1. l'avertisseur crie (porte grande ouverte) ou le feu (porte fermée) : on sort tout de suite,
//      les sacs dans les bras, jusqu'à l'abri ; dans l'abri : la caisse, le banc, le sifflet ;
//   2. réveiller : secouer l'adulte et crier son nom ;
//   3. rester au chaud, dedans : les habits de neige, puis les deux dans les sacs, la gourde dans
//      le sac, la boîte à manger, et le poêle auquel on ne touche pas.
// Les enfants : le personnage de la bibliothèque à la taille d'un enfant, la tête agrandie autour
// de la gorge (un enfant de 6 ans a la tête d'un sixième de sa hauteur, un adulte d'un septième
// et demi). Aucune cote : rien ne se construit.
// Lot 3 (13 octobre) : les enfants qui sortent, l'enfant qui réveille et l'adulte couché passent au
// corps simple de profil (marche-brassee enfant4 et enfant6, debout-penche-lit, couche-dos). Les
// enfants dans leurs sacs (l'abri, dedans) restent : le contour visible est celui du sac, la tête
// celle de formes.js. Rouge : ouvrir la porte, la fermer derrière soi, sortir vers l'abri, secouer.
module.exports = (h) => {
  const A = h.a, F = h.formes;
  const W = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const f1 = v => Math.round(v * 10) / 10;
  const pt = p => `${f1(p[0])},${f1(p[1])}`;
  const RAD = Math.PI / 180;
  const tourne = (p, a) => { const c = Math.cos(a * RAD), s = Math.sin(a * RAD); return [p[0] * c - p[1] * s, p[0] * s + p[1] * c]; };
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];

  // Catmull-Rom → Bézier : les segments seuls (cr), ou le chemin entier (lisse)
  const cr = (P, ferme) => {
    const N = P.length, g = i => ferme ? P[(i + N) % N] : P[Math.max(0, Math.min(N - 1, i))];
    let d = '';
    for (let i = 0; i < (ferme ? N : N - 1); i++) {
      const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      d += ` C${pt([p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6])} ${pt([p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6])} ${pt(p2)}`;
    }
    return d;
  };
  const lisse = (P, ferme) => `M${pt(P[0])}${cr(P, ferme)}${ferme ? ' Z' : ''}`;
  // des arcs de son autour de c, dans la direction dir (degrés, 0 = droite, 90 = bas)
  const ondes = (c, dir, rs, ouv, at = A.detail) => rs.map(r => {
    const a0 = (dir - ouv) * RAD, a1 = (dir + ouv) * RAD;
    return h.path(`M${pt([c[0] + r * Math.cos(a0), c[1] + r * Math.sin(a0)])} A${f1(r)},${f1(r)} 0 0 1 ${pt([c[0] + r * Math.cos(a1), c[1] + r * Math.sin(a1)])}`, at);
  }).join('\n');
  // repère d'une vue : millimètres réels, y vers le haut depuis le sol
  const repere = (x0, y0, E) => p => [x0 + p[0] * E, y0 - p[1] * E];

  // ─── les enfants debout ──────────────────────────────────────────────────────────────
  // Le personnage (adulte de 1750) réduit à la taille de l'enfant ; par-dessus, la tête de la
  // bibliothèque agrandie de k autour de la gorge, découpée sous la base du cou pour que son cou
  // se raccorde à celui du corps. Rend le personnage, la tête, et le repère de la tête (Hv).
  let nId = 0;
  const enfant = o => {
    const e = o.E * o.taille / 1750, mir = o.cote === 'gauche';
    const lean = o.penche == null ? 3 : o.penche, regard = o.regard || 0;
    const pers = F.personnage({ x: o.x, y: o.y, pose: 'debout', echelle: e, cote: o.cote, penche: lean, regard, mains: o.mains });
    const T = p => [o.x + (mir ? -p[0] : p[0]) * e, o.y + p[1] * e];
    const H = [0, -950], TT = p => add(H, tourne(p, lean));
    const dCou = tourne([0, -1], lean * 0.5 + 10);
    const atlas = add(TT([-6, -540]), [dCou[0] * 84, dCou[1] * 84]);
    const rot = lean * 0.35 + regard;
    const Et = sub(atlas, tourne([4, 32], rot));
    const gorge = T(add(Et, tourne([58, 103], rot)));
    const a = mir ? -rot : rot, s2 = e * o.k;
    const Hv = p => { const q = tourne([(mir ? -p[0] : p[0]) * s2, p[1] * s2], a); return add(X, q); };
    const X = sub(gorge, tourne([(mir ? -58 : 58) * s2, 103 * s2], a));
    const id = `tete38-${++nId}`;
    const coupe = [[-800, -541], [800, -541], [800, -2100], [-800, -2100]].map(p => T(TT(p)));
    const tete = `<clipPath id="${id}"><path d="M${coupe.map(pt).join(' L')} Z" fill="none"/></clipPath>\n` +
      `<g clip-path="url(#${id})">\n${F.tete({ x: X[0], y: X[1], echelle: s2, angle: a, cote: o.cote })}\n</g>`;
    return { pers, tete, Hv };
  };
  // le bras proche d'un personnage, repeint seul par-dessus ce qu'on a mis devant le corps
  const brasProche = pers => {
    const L = String(pers).split('\n');
    const i0 = L.findIndex(l => l.includes('stroke="none"'));
    let iF = -1; L.forEach((l, i) => { if (l.includes('stroke="none"')) iF = i; });
    return [L[i0 - 1], ...L.slice(iF, L.length - 1)].join('\n');
  };

  // Un enfant qui marche vers la droite, le sac de couchage en boule dans les bras : le corps simple
  // de profil (marche-brassee, enfant de 4 ou de 6 ans), le sac posé sur les avant-bras, contre la
  // poitrine, peint devant le tronc et derrière le bras proche (objetP).
  const BOULE = [[65, 520], [55, 650], [75, 770], [165, 806], [285, 792], [332, 712], [326, 586], [296, 506], [186, 486]];
  const PLIS_SAC = [[[140, 492], [128, 650], [140, 802]], [[236, 490], [226, 650], [238, 800]]];
  const enfantSac = (x, G, E, age) => {
    const o = { x, y: G, pose: 'marche-brassee', age, echelle: E };
    const c0 = F.corps(o), C = c0.articulations.coudeP, M = [c0.mainP.x, c0.mainP.y];
    // le sac : le bas sur l'avant-bras, à mi-chemin du coude à la main ; la vieille boule (mm d'un
    // enfant de 6 ans, centre 190, 646) remise à la taille de l'avant-bras
    const L = Math.hypot(M[0] - C[0], M[1] - C[1]), k = L / 210;
    const bas = [(C[0] + M[0]) / 2 + 0.1 * L, (C[1] + M[1]) / 2 - 0.06 * L];
    const R = p => [bas[0] + (p[0] - 190) * k, bas[1] - (p[1] - 486) * k];
    const sac = [h.path(lisse(BOULE.map(R), true), W(A.arete)), ...PLIS_SAC.map(l => h.path(lisse(l.map(R)), A.fin))].join('\n');
    return String(F.corps(Object.assign({ objetP: sac }, o)));
  };

  // ─── les enfants assis dans leur sac ─────────────────────────────────────────────────
  // Repère : mm d'un enfant de 6 ans, y vers le haut, origine sur le siège sous la hanche,
  // regard vers la droite. La tête (agrandie 1,3 fois de celle d'un adulte réduit) a son oreille
  // en OREILLE ; le capuchon et le sac forment un seul contour blanc qui ne laisse voir que le
  // visage. jambes : 'lit' (allongées devant) ou 'banc' (pendantes).
  const OREILLE = [-10, 511], HS = 0.854;
  const AVANT = {
    lit: [[115, 340], [135, 240], [152, 186], [300, 178], [450, 170], [560, 176], [612, 250], [664, 262], [704, 212], [708, 110], [690, 32], [640, 2], [400, 0], [100, 0], [-60, 0]],
    banc: [[115, 340], [135, 240], [152, 186], [262, 180], [345, 160], [368, 85], [362, -60], [372, -160], [430, -205], [438, -275], [400, -305], [300, -308], [235, -285], [215, -170], [218, -40], [195, 0], [100, 0], [-60, 0]],
  };
  const DOS = [[-122, 25], [-140, 130], [-135, 250], [-118, 340]];
  const PLIS = {
    lit: [[[-128, 120], [5, 112], [140, 118]], [[300, 8], [292, 90], [300, 172]], [[450, 8], [442, 88], [450, 166]], [[580, 8], [575, 100], [590, 200]]],
    banc: [[[-128, 120], [5, 112], [140, 118]], [[-130, 250], [0, 244], [130, 250]], [[260, 8], [252, 95], [262, 174]], [[222, -120], [290, -112], [360, -120]]],
  };
  const sacAssis = (R, E, o) => {
    const f = o.f || 1;
    const B = p => R([o.x + p[0] * f, o.y + p[1] * f]);
    const Hd = p => B([OREILLE[0] + p[0] * HS, OREILLE[1] - p[1] * HS]);
    const oreille = B(OREILLE);
    const out = [F.tete({ x: oreille[0], y: oreille[1], echelle: E * f * HS })];
    const capDehors = [[-105, 150], [-120, 80], [-135, 0], [-125, -100], [-50, -170], [40, -165], [100, -100]].map(Hd);
    const capDedans = [[100, -100], [60, -82], [38, -40], [34, 20], [48, 85], [72, 128]].map(Hd);
    const tour = [Hd([72, 128]), ...AVANT[o.jambes].map(B), ...DOS.map(B), ...capDehors];
    out.push(h.path(`M${pt(tour[0])}${cr(tour)}${cr(capDedans)} Z`, W(A.arete)));
    // le bord du capuchon
    out.push(h.path(lisse([[96, -112], [48, -96], [22, -45], [18, 22], [34, 96], [60, 142]].map(Hd)), A.fin));
    for (const l of PLIS[o.jambes]) if (!(o.gourde && l[0][1] > 200 && l[0][0] < 0)) out.push(h.path(lisse(l.map(B)), A.fin));
    return out.join('\n');
  };
  // la gourde, debout, en mm (base au milieu), dans le repère R
  const gourde = (R, x, y, at) => {
    const P = [[-38, 0], [-40, 120], [-32, 160], [-18, 176], [18, 176], [32, 160], [40, 120], [38, 0]].map(p => R([x + p[0], y + p[1]]));
    return [h.path(lisse(P) + ' Z', at),
      h.rect(...(() => { const a = R([x - 26, y + 214]), b = R([x + 26, y + 176]); return [a[0], a[1], b[0] - a[0], b[1] - a[1]]; })(), at)].join('\n');
  };
  // le sifflet, dans la bouche : l'embouchure part des lèvres, le barillet au bout (mm × g)
  const sifflet = (R, bouche, g) => {
    const Q = p => R([bouche[0] + p[0] * g, bouche[1] + p[1] * g]);
    const pts = [[0, -3], [0, 11], [44, 11]];
    for (let t = 90; t >= -170; t -= 10) pts.push([44 + 17 * Math.cos(t * RAD), -6 + 17 * Math.sin(t * RAD)]);
    pts.push([27.3, -3]);
    const c = Q([44, -6]), r = Math.hypot(...sub(Q([61, -6]), c));
    return { svg: [h.chemin(pts.map(Q), W(A.arete), true), h.chemin([Q([29, 11]), Q([33, 6]), Q([38, 11])], A.detail)].join('\n'), c, r };
  };

  // ─── les objets ──────────────────────────────────────────────────────────────────────
  // l'avertisseur, vu de face, qui crie
  const avertisseur = (cx, cy, r) => [
    h.cercle(cx, cy, r, W(A.contour)), h.cercle(cx, cy, r * 0.62, A.detail),
    ...[-0.25, 0, 0.25].map(k => h.ligne(cx - r * 0.35, cy + r * k, cx + r * 0.35, cy + r * k, A.fin)),
    h.cercle(cx + r * 0.62, cy - r * 0.62, 1.4, A.plein),
    ondes([cx, cy], 0, [r + 5, r + 9.5, r + 14], 34), ondes([cx, cy], 180, [r + 5, r + 9.5, r + 14], 34),
  ].join('\n');
  // les flammes et la fumée ; yb : la base
  const flamme = (cx, yb, ht) => {
    const P = s => ([x, y]) => [cx + x * ht * s, yb - y * ht * s];
    const dehors = [[-0.30, 0.02], [-0.42, 0.25], [-0.36, 0.5], [-0.26, 0.74], [-0.2, 0.52], [-0.09, 0.64], [0, 1], [0.1, 0.7], [0.23, 0.8], [0.3, 0.55], [0.41, 0.3], [0.33, 0.04], [0, -0.02]];
    const dedans = [[-0.15, 0.03], [-0.2, 0.24], [-0.08, 0.44], [0, 0.6], [0.06, 0.42], [0.17, 0.25], [0.13, 0.03], [0, 0.0]];
    const fumee = (dx) => h.path(lisse([[dx, 1.1], [dx + 0.12, 1.25], [dx - 0.02, 1.42], [dx + 0.1, 1.58]].map(P(1))), A.detail);
    return [h.path(lisse(dehors.map(P(1)), true), W(A.contour)), h.path(lisse(dedans.map(P(1)), true), A.detail),
      h.ligne(cx - ht * 0.48, yb + 1.5, cx + ht * 0.48, yb + 1.5, A.arete), fumee(-0.16), fumee(0.14)].join('\n');
  };
  // la porte vue de l'intérieur, pentures à droite ; ouverte : le battant ramené grand ouvert
  const porteIcone = (x, yb, w, ht, ouverte) => {
    const out = [h.rect(x - 4, yb - ht - 4, w + 8, ht + 4, W(A.arete))];
    if (ouverte) {
      out.push(h.rect(x, yb - ht, w, ht, A.hachure('metal', 'arete')));
      out.push(h.chemin([[x + w, yb - ht], [x + w * 1.6, yb - ht * 1.1], [x + w * 1.6, yb + ht * 0.07], [x + w, yb]], W(A.arete), true));
      out.push(h.cercle(x + w * 1.5, yb - ht * 0.48, 1.6, A.plein));
      out.push(h.geste(`M${pt([x + w * 0.1, yb - ht - 9])} Q${pt([x + w * 0.9, yb - ht - 26])} ${pt([x + w * 1.55, yb - ht * 1.1 - 8])}`));
    } else {
      out.push(h.rect(x, yb - ht, w, ht, W(A.arete)));
      out.push(h.rect(x + w * 0.18, yb - ht * 0.9, w * 0.64, ht * 0.34, A.fin), h.rect(x + w * 0.18, yb - ht * 0.46, w * 0.64, ht * 0.36, A.fin));
      out.push(h.cercle(x + w * 0.1, yb - ht * 0.5, 1.6, A.plein));
      out.push(h.geste(`M${pt([x + w * 1.6, yb - ht * 1.1 - 8])} Q${pt([x + w * 0.95, yb - ht - 26])} ${pt([x + w * 0.2, yb - ht - 9])}`));
    }
    out.push(h.ligne(x - 12, yb, x + w + 12, yb, A.arete));
    return out.join('\n');
  };
  // la caisse ou la boîte, de côté, couvercle ouvert (penture au bout droit) ; contenu : SVG
  const boite = (R, x0, l, ht, contenu) => {
    const a = R([x0, ht]), b = R([x0 + l, 0]);
    const out = [contenu, h.rect(a[0], a[1], b[0] - a[0], b[1] - a[1], W(A.arete))];
    for (const k of [1 / 3, 2 / 3]) out.push(h.ligne(...R([x0 + 8, ht * k]), ...R([x0 + l - 8, ht * k]), A.fin));
    for (const xx of [x0 + 40, x0 + l - 40]) out.push(h.ligne(...R([xx, 0]), ...R([xx, ht]), A.detail));
    const u = [Math.cos(70 * RAD), Math.sin(70 * RAD)], n = [u[1], -u[0]];
    const P0 = [x0 + l, ht], P1 = [P0[0] + u[0] * l, P0[1] + u[1] * l];
    out.push(h.chemin([P0, P1, [P1[0] - n[0] * 30, P1[1] - n[1] * 30], [P0[0] - n[0] * 30, P0[1] - n[1] * 30]].map(R), W(A.arete), true));
    return out.join('\n');
  };
  // pemmican (le pain enveloppé et ficelé) et biscuits, pour la boîte ; (x, y) : le fond
  const manger = (R, x, y, E) => {
    const pain = [[-30, 0], [170, 0], [195, 260], [-5, 260]].map(p => R([x + p[0], y + p[1]]));
    const out = [h.chemin(pain, W(A.arete), true), h.ligne(...R([x + 70, 0]), ...R([x + 83, 260]), A.detail),
      h.ligne(...R([x - 18, 130]), ...R([x + 182, 130]), A.detail)];
    for (const [cx, cy] of [[x + 270, y + 175], [x + 330, y + 120]]) {
      const c = R([cx, cy]), r = 82 * E;
      out.push(h.cercle(c[0], c[1], r, W(A.arete)));
      for (const d of [[0, 0], [-0.45, -0.3], [0.45, -0.3], [-0.45, 0.35], [0.45, 0.35]]) out.push(h.cercle(c[0] + d[0] * r, c[1] + d[1] * r, 0.9, A.plein));
    }
    return out.join('\n');
  };

  // ─── la vue « on sort » : le chalet, les enfants, l'abri ────────────────────────────
  const sortie = z => {
    const G = z.h - 13;
    const E = Math.min((z.h - 16) / 2380, z.l / 5760);
    const R = repere(700 * E + (z.l - 5760 * E) / 2, G, E);
    const S = p => R([3500 + (p[0] - 3530) * 0.8, p[1] * 0.8]);   // l'abri, plus loin
    const out = [h.rect(0, G, z.l, z.h - G, A.hachure('neige', 'aucun'))];
    // le chalet : le mur de billes, la fenêtre, la porte grande ouverte, le toit
    const logs = [];
    for (let y = 240; y < 2380; y += 240) {
      const cuts = [[-700, 1300]];
      const trous = [];
      if (y < 2110) trous.push([90, 1110]);
      if (y > 940 && y < 1860) trous.push([-560, 10]);
      let segs = cuts;
      for (const [t0, t1] of trous) segs = segs.flatMap(([s0, s1]) => [[s0, Math.min(s1, t0)], [Math.max(s0, t1), s1]]).filter(([s0, s1]) => s1 - s0 > 20);
      for (const [s0, s1] of segs) logs.push(h.ligne(...R([s0, y]), ...R([s1, y]), A.fin));
    }
    out.push(...logs);
    out.push(h.chemin([R([1300, 2380]), R([1300, 0])], A.contour));
    const fen = [R([-560, 1860]), R([10, 940])], vit = [R([-500, 1800]), R([-50, 1000])];
    out.push(h.rect(fen[0][0], fen[0][1], fen[1][0] - fen[0][0], fen[1][1] - fen[0][1], W(A.arete)));
    out.push(h.rect(vit[0][0], vit[0][1], vit[1][0] - vit[0][0], vit[1][1] - vit[0][1], A.detail));
    out.push(h.ligne(...R([-275, 1000]), ...R([-275, 1800]), A.detail), h.ligne(...R([-500, 1400]), ...R([-50, 1400]), A.detail));
    const cad = [R([90, 2110]), R([1110, 0])], ouv = [R([150, 2050]), R([1050, 0])];
    out.push(h.rect(cad[0][0], cad[0][1], cad[1][0] - cad[0][0], cad[1][1] - cad[0][1], W(A.arete)));
    out.push(h.rect(ouv[0][0], ouv[0][1], ouv[1][0] - ouv[0][0], ouv[1][1] - ouv[0][1], A.hachure('metal', 'arete')));
    out.push(h.chemin([[150, 30], [150, 2030], [400, 1930], [400, 130]].map(R), W(A.arete), true));
    out.push(h.cercle(...R([350, 1020]), 1.3, A.plein));
    // l'abri : la remise en planches verticales, sa porte ouverte
    const sous = x => 1866 + (2480 - 1866) * (1 - Math.abs(x - 4500) / 850);
    out.push(h.chemin([[3650, 0], [3650, 1866], [4500, 2480], [5350, 1866], [5350, 0]].map(S), W(A.contour)));
    for (let x = 3820; x < 5350; x += 170) {
      const haut = sous(x) - 25;
      if (x > 4130 && x < 4870) out.push(h.ligne(...S([x, 1700]), ...S([x, haut]), A.fin));
      else out.push(h.ligne(...S([x, 0]), ...S([x, haut]), A.fin));
    }
    out.push(h.chemin([[3530, 1780], [3530, 1890], [4500, 2590], [5470, 1890], [5470, 1780], [4500, 2480]].map(S), W(A.contour), true));
    const po = [S([4150, 1650]), S([4850, 0])];
    out.push(h.rect(po[0][0], po[0][1], po[1][0] - po[0][0], po[1][1] - po[0][1], A.hachure('metal', 'arete')));
    out.push(h.chemin([[4150, 20], [4150, 1630], [4340, 1560], [4340, 90]].map(S), W(A.arete), true));
    // les deux enfants, les sacs dans les bras, et le chemin
    out.push(enfantSac(R([1650, 0])[0], G, E, 'enfant4'));
    out.push(enfantSac(R([2250, 0])[0], G, E, 'enfant6'));
    out.push(h.geste(`M${pt(R([2720, 330]))} L${pt(R([3440, 330]))}`));
    out.push(h.ligne(0, G, z.l, G, A.arete));
    return { svg: out.join('\n'), R, E };
  };

  // ─── la vue « dans l'abri » ─────────────────────────────────────────────────────────
  const abri = z => {
    const E = (z.h - 4) / 1520;
    const R = repere((z.l - 1640 * E) / 2 + 140 * E, z.h - 4 - 100 * E, E);
    const out = [];
    for (let x = 90; x < 1500; x += 230) out.push(h.ligne(...R([x, 0]), ...R([x, 1420]), A.fin));
    const mur = [R([-120, 1420]), R([0, -100])];
    out.push(h.rect(mur[0][0], mur[0][1], mur[1][0] - mur[0][0], mur[1][1] - mur[0][1], A.hachure('bois', 'arete')));
    const pl = [R([0, 0]), R([1500, -100])];
    out.push(h.rect(pl[0][0], pl[0][1], pl[1][0] - pl[0][0], pl[1][1] - pl[0][1], A.hachure('bois', 'arete')));
    // le banc, vu du bout
    const banc = [[0, 380, 330, 45], [20, 0, 45, 380], [265, 0, 45, 380]];
    for (const [x, y, l, ht] of banc) { const a = R([x, y + ht]), b = R([x + l, y]); out.push(h.rect(a[0], a[1], b[0] - a[0], b[1] - a[1], W(A.arete))); }
    out.push(h.ligne(...R([65, 140]), ...R([265, 140]), A.arete));
    // les deux enfants dans les sacs : le grand derrière, un peu en avant ; le petit devant
    out.push(sacAssis(R, E, { x: 250, y: 425, f: 1, jambes: 'banc' }));
    const B6 = p => [250 + p[0], 425 + p[1]];
    const bouche = B6([OREILLE[0] + 104 * HS, OREILLE[1] - 46 * HS]);
    const s = sifflet(R, bouche, 2.3);
    out.push(h.path(lisse([R(B6([60, 380])), R(B6([95, 395])), R([bouche[0] + 40, bouche[1] - 50])]), A.fin));
    out.push(s.svg, ondes(s.c, -40, [s.r + 4, s.r + 8, s.r + 12], 30));
    out.push(sacAssis(R, E, { x: 140, y: 425, f: 0.9, jambes: 'banc' }));
    // la caisse d'évacuation, ouverte : une botte, une tuque
    const pouce = [[772, 405], [738, 442], [733, 478], [752, 490], [774, 462]].map(R);
    const mitaine = [[770, 330], [768, 470], [786, 522], [826, 537], [866, 522], [882, 470], [882, 330]].map(R);
    const tuque = [[930, 380], [935, 470], [985, 530], [1045, 530], [1095, 470], [1100, 380]].map(R);
    const pompon = R([1015, 575]);
    const dedans = [h.path(lisse(pouce), W(A.arete)), h.path(lisse(mitaine) + ' Z', W(A.arete)),
      h.path(lisse([[775, 425], [826, 430], [877, 425]].map(R)), A.fin),
      h.path(lisse(tuque), W(A.arete)), h.rect(...R([920, 450]), 190 * E, 70 * E, W(A.arete)),
      ...[955, 990, 1025, 1060].map(x => h.ligne(...R([x, 452]), ...R([x, 388]), A.fin)),
      h.cercle(pompon[0], pompon[1], 45 * E, W(A.arete))].join('\n');
    out.push(boite(R, 700, 460, 400, dedans));
    return { svg: out.join('\n'), R, E, bouche, sifflet: s };
  };

  // ─── la vue « réveiller » ────────────────────────────────────────────────────────────
  const BRAS_KID = { tronc: 15, cou: 11, tete: 21, brasP: 62.1, avantbrasP: 74.1, mainP: 112.1, brasL: 58.1, avantbrasL: 70.1, mainL: 108.1 };
  const adulte = (E, R) => {
    const o = { y: R([0, 560])[1], pose: 'couche-dos', echelle: E, angles: { cou: -78, tete: -72 } };
    const c0 = F.corps(Object.assign({ x: 0 }, o));
    return { svg: String(F.corps(Object.assign({ x: R([230, 0])[0] - c0.boite.x0 }, o))) };
  };
  const reveil = z => {
    const E = Math.min((z.h - 4) / 1300, z.l / 2250);
    const R = repere((z.l - 2250 * E) / 2 + 150 * E, z.h - 4, E);
    const out = [];
    // le lit : la tête de lit, le cadre, les pattes, le matelas, l'oreiller
    const r = (x0, y0, x1, y1, at) => { const a = R([x0, y1]), b = R([x1, y0]); return h.rect(a[0], a[1], b[0] - a[0], b[1] - a[1], at); };
    out.push(r(-100, 0, -30, 980, W(A.contour)), r(1960, 0, 2030, 360, W(A.arete)), r(-30, 280, 2040, 380, W(A.arete)));
    out.push(r(-30, 380, 2040, 560, W(A.arete)));
    out.push(h.path(lisse([[20, 568], [60, 630], [260, 642], [470, 630], [505, 585], [470, 563], [60, 563]].map(R), true), W(A.arete)));
    // l'adulte couché sur le dos, la tête à gauche sur l'oreiller (corps simple couche-dos, la tête
    // un peu relevée), le sommet du crâne à 230 mm du bout du lit
    const ad0 = adulte(E, R);
    out.push(ad0.svg);
    // la couverture, repliée sur la poitrine
    const couv = [[640, 560], [650, 810], [760, 838], [1000, 822], [1300, 796], [1600, 786], [1760, 800], [1860, 900], [1960, 896], [2030, 810], [2065, 620], [2060, 560], [1500, 556], [1000, 560]];
    out.push(h.path(lisse(couv.map(R), true), W(A.arete)));
    // l'enfant, debout contre le lit, les deux mains à plat sur l'épaule (corps simple
    // debout-penche-lit, enfant de 6 ans, tourné vers la tête du lit ; les bras recalés une fois par
    // Nelder-Mead sur corps(), lot 3, pour que la paume tombe sur le dessus de l'épaule)
    const kid = F.corps({ x: R([1080, 0])[0], y: R([0, 0])[1], pose: 'debout-penche-lit', age: 'enfant6', echelle: E, cote: 'gauche', angles: BRAS_KID });
    out.push(String(kid));
    // il crie son nom
    const t = kid.tete, bouche = [t.x - 72 * E, t.y + 48 * E];
    out.push(ondes([bouche[0] - 3, bouche[1] - 2], 166, [7, 12, 17], 24));
    // secouer : la flèche aller-retour au-dessus des mains
    const m = [kid.mainP.x - 2, kid.mainP.y - 14];
    out.push(h.geste(`M${pt(add(m, [-10, 0]))} L${pt(add(m, [10, 0]))}`, { double: true }));
    return { svg: out.join('\n'), R, E };
  };

  // ─── la vue « les habits de neige » ──────────────────────────────────────────────────
  // l'habit une pièce, de face, pendu par le capuchon ; repère en mm, y vers le bas depuis le haut du capuchon
  const CAPUCHON = [[-128, 252], [-150, 180], [-140, 95], [-95, 22], [0, 0], [95, 22], [140, 95], [150, 180], [128, 252]];
  const COTE = [[222, 292], [262, 420], [330, 606], [226, 632], [206, 500], [180, 395], [182, 500], [190, 612], [186, 790], [182, 950], [30, 950], [22, 800], [0, 652]];
  const habit = (T) => {
    const bas = [...COTE, ...COTE.slice(0, -1).reverse().map(([x, y]) => [-x, y])];
    const lignes = [h.path(`${lisse(CAPUCHON.map(T))} L${bas.map(T).map(pt).join(' L')} Z`, W(A.contour))];
    const vis = [[0, 150]].map(T)[0];
    lignes.push(h.ellipse(vis[0], vis[1], Math.abs(T([80, 0])[0] - T([0, 0])[0]), Math.abs(T([0, 85])[1] - T([0, 0])[1]), A.arete));
    lignes.push(h.ellipse(vis[0], vis[1], Math.abs(T([96, 0])[0] - T([0, 0])[0]), Math.abs(T([0, 101])[1] - T([0, 0])[1]), A.fin));
    lignes.push(h.ligne(...T([0, 250]), ...T([0, 640]), A.detail), h.rect(...T([-10, 250]), Math.abs(T([20, 0])[0] - T([0, 0])[0]), Math.abs(T([0, 40])[1] - T([0, 0])[1]), W(A.detail)));
    for (const s of [1, -1]) {
      lignes.push(h.ligne(...T([s * 316, 572]), ...T([s * 218, 596]), A.detail));
      lignes.push(h.ligne(...T([s * 183, 910]), ...T([s * 27, 910]), A.detail));
    }
    return lignes.join('\n');
  };

  const LEG = {
    1: 'l’avertisseur crie : porte grande ouverte',
    2: 'fumée ou feu : porte fermée derrière soi',
    3: 'les sacs de couchage dans les bras',
    4: 'la caisse : on s’habille là',
    5: 'à deux dans les sacs, hors du plancher',
    6: 'sifflet : trois coups, pause, trois coups',
    7: 'secouer l’adulte, crier son nom',
    8: 'les deux habits de neige d’abord',
    9: 'puis les deux sacs, l’un contre l’autre',
    10: 'la gourde dort dans le sac',
    11: 'la boîte : rien à cuire',
    12: 'on ne touche pas au poêle',
  };
  const T_ = l => l.map(r => Object.assign(r, { texte: LEG[r.n] }));

  const spec = {
    ref: '38-01',
    titre: 'Les trois gestes de l’enfant si l’adulte ne se relève pas',
    desc: 'En images, à hauteur d’enfant : si l’avertisseur crie ou s’il y a le feu, on sort tout de suite à l’abri, les sacs dans les bras ; sinon on secoue l’adulte en criant son nom ; puis on reste au chaud dedans, habillé, à deux dans les sacs, avec la gourde et la boîte à manger.',
    format: 'pleine',
    disposition: [['porte', 'sortir'], ['abri', 'reveiller'], ['habits', 'chaud']],
    hauteurs: [1.15, 1, 1],
    largeurs: [[1.05, 3], [2, 3.1], [1.25, 3]],
    vues: {
      porte: {
        titre: '1 · L’avertisseur, le feu',
        dessin: z => {
          const out = [], hh = z.h / 2;
          const dw = Math.min(z.l * 0.24, 36), dht = Math.min(hh * 0.66, dw * 2.1), xd = z.l * 0.5;
          for (const [k, ouverte] of [[0, true], [1, false]]) {
            const yb = hh * (k + 1) - 6;
            if (ouverte) out.push(avertisseur(z.l * 0.2, yb - dht * 0.5, Math.min(11, z.l * 0.07)));
            else out.push(flamme(z.l * 0.2, yb - 2, dht * 0.62));
            out.push(porteIcone(xd, yb, dw, dht, ouverte));
          }
          return out.join('\n');
        },
        renvois: z => {
          const hh = z.h / 2, dw = Math.min(z.l * 0.24, 36), dht = Math.min(hh * 0.66, dw * 2.1);
          return [
            { n: 1, rond: [11, 11], cible: [z.l * 0.2 - 5, hh - 6 - dht * 0.5 - 6] },
            { n: 2, rond: [11, hh + 11], cible: [z.l * 0.2 - 4, 2 * hh - 6 - dht * 0.22] },
          ];
        },
      },
      sortir: {
        titre: 'on sort sans s’habiller ni réveiller l’adulte',
        dessin: z => sortie(z).svg,
        renvois: z => {
          const { R, E } = sortie(z);
          const sc = 1, R6 = p => [R([2250, 0])[0] + p[0] * E * sc, R([0, 0])[1] - p[1] * E * sc];
          return [
            { n: 3, rond: R([2850, 1500]), cible: R6([250, 700]) },
          ];
        },
      },
      abri: {
        titre: 'dans l’abri, on attend',
        dessin: z => abri(z).svg,
        renvois: z => {
          const { R, sifflet: s } = abri(z);
          return [
            { n: 4, rond: R([1370, 190]), cible: R([1100, 190]) },
            { n: 5, rond: R([640, 760]), cible: R([140 + 0.9 * 300, 425 + 0.9 * 110]) },
            { n: 6, rond: R([780, 1240]), cible: [s.c[0] + s.r * 0.7, s.c[1] - s.r * 0.7] },
          ];
        },
      },
      reveiller: {
        titre: '2 · Réveiller ; sans réponse, geste 3',
        dessin: z => reveil(z).svg,
        renvois: z => {
          const { R } = reveil(z);
          return [
            { n: 7, rond: R([150, 1150]), cible: R([530, 790]) },
          ];
        },
      },
      habits: {
        titre: '3 · Rester au chaud',
        dessin: z => {
          const E = Math.min((z.h - 6) / 1080, (z.l - 4) / 1420);
          const x0 = (z.l - 1400 * E) / 2 + 40 * E, y0 = 4 + 60 * E;
          const T = (cx, s) => p => [x0 + (cx + p[0] * s) * E, y0 + (70 + p[1] * s) * E];
          const out = [h.rect(x0 - 40 * E, y0 - 60 * E, 1400 * E, 60 * E, A.hachure('bois', 'arete'))];
          for (const cx of [330, 1030]) {
            const a = [x0 + cx * E, y0];
            out.push(h.path(`M${pt(a)} L${pt([a[0], a[1] + 55 * E])} Q${pt([a[0], a[1] + 90 * E])} ${pt([a[0] + 25 * E, a[1] + 80 * E])}`, A.arete));
          }
          out.push(habit(T(330, 1)), habit(T(1030, 0.88)));
          return out.join('\n');
        },
        renvois: z => {
          const E = Math.min((z.h - 6) / 1080, (z.l - 4) / 1420);
          const x0 = (z.l - 1400 * E) / 2 + 40 * E, y0 = 4 + 60 * E;
          return [{ n: 8, rond: [x0 + 690 * E, y0 + 980 * E], cible: [x0 + 440 * E, y0 + 820 * E] }];
        },
      },
      chaud: {
        titre: 'dedans, ensemble',
        dessin: z => {
          const E = Math.min((z.h - 4) / 1330, z.l / 3550);
          const R = repere((z.l - 3550 * E) / 2 + 300 * E, z.h - 4, E);
          const r = (x0, y0, x1, y1, at) => { const a = R([x0, y1]), b = R([x1, y0]); return h.rect(a[0], a[1], b[0] - a[0], b[1] - a[1], at); };
          const out = [r(-100, 0, -30, 980, W(A.contour)), r(1630, 0, 1700, 360, W(A.arete)), r(-30, 280, 1710, 380, W(A.arete)), r(-30, 380, 1710, 560, W(A.arete))];
          out.push(sacAssis(R, E, { x: 330, y: 560, f: 1, jambes: 'lit' }));
          out.push(sacAssis(R, E, { x: 200, y: 560, f: 0.9, jambes: 'lit', gourde: true }));
          out.push(gourde(p => R([200 + p[0] * 0.9, 560 + p[1] * 0.9]), 70, 140, A.cache));
          out.push(boite(R, 1780, 440, 380, manger(R, 1840, 250, E)));
          // le poêle : les pattes, le corps, la porte, la clé d'air, le tuyau
          out.push(r(2650, 0, 2700, 260, W(A.arete)), r(3120, 0, 3170, 260, W(A.arete)));
          out.push(r(2610, 250, 3210, 650, W(A.contour)), r(2590, 650, 3230, 685, W(A.arete)));
          out.push(r(2690, 330, 2950, 575, W(A.arete)), r(2900, 440, 2935, 470, A.plein));
          const cl = R([3080, 455]); out.push(h.cercle(cl[0], cl[1], 45 * E, A.detail), h.ligne(cl[0] - 30 * E, cl[1], cl[0] + 30 * E, cl[1], A.detail));
          out.push(r(2990, 685, 3110, 1330, W(A.arete)), h.ligne(...R([2990, 1000]), ...R([3110, 1000]), A.detail));
          out.push(h.ligne(0, z.h - 4, z.l, z.h - 4, A.arete));
          return out.join('\n');
        },
        renvois: z => {
          const E = Math.min((z.h - 4) / 1330, z.l / 3550);
          const R = repere((z.l - 3550 * E) / 2 + 300 * E, z.h - 4, E);
          return [
            { n: 9, rond: R([900, 1180]), cible: R([760, 720]) },
            { n: 10, rond: R([-160, 1120]), cible: R([200 + 0.9 * 70, 560 + 0.9 * 250]) },
            { n: 11, rond: R([1800, 1150]), cible: R([1930, 420]) },
            { n: 12, rond: R([2450, 1150]), cible: R([2750, 610]) },
          ];
        },
      },
    },
  };
  for (const v of Object.values(spec.vues)) { const r = v.renvois; v.renvois = z => T_(r(z)); }
  return spec;
};
