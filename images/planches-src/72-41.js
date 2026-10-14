// 72-41 — Le pemmican, de la lanière sèche au bloc (ch. 72, §5-C étapes 18, 19 et 21 ;
// §6 contrôles « Liaison » et « Moulage » ; §9 « Broyer » et « Lier, mouler, emballer »).
// Cotes : aucune. Le chapitre ne donne ni la taille du moule (« peu profond »), ni celle du
// billot, du pilon ou du sac ; tout est dessiné en proportion, sans cote.
// Suivi comme un montage :
//  - le sac est fermé (col noué) : la poudre ne sort pas sous le marteau ;
//  - le creux du billot est taillé dans le bout du bois, le pilon y entre avec du jeu, son nœud
//    (le bout dur) en bas, dans la poudre ;
//  - le chaudron penche du côté du bec : le bec est le point le plus bas de l'ouverture, le gras
//    coule de là dans le bol ; aucun feu sous le bol ;
//  - la planche entre dans le moule avec du jeu contre la chemise : elle descend sur la masse
//    sous la pierre, et l'air chassé sort par ce jeu ; la chemise déborde des rives pour
//    sortir le bloc froid.
// La charte : l'objet de chaque vue au contour fort ; le flanc du billot, la face droite des blocs et
// le dessous de la pierre à l'ombre ; l'air au-dessus de la poudre et de la masse en gris loin.
// Le rouge : le marteau qui frappe, le pilon qui monte et descend, le bâton qui brasse ; et deux
// ratés, la masse qui fend et la poche d'air. Le gras qui coule reste en noir.

module.exports = (h) => {
  const r1 = v => Math.round(v * 10) / 10;

  // Hasard répétable, pour que la planche ne change pas d'un tirage à l'autre.
  function rng(seed) {
    let a = seed >>> 0;
    return () => {
      a = (a + 0x6D2B79F5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function dedans(p, poly) {
    let c = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const [xi, yi] = poly[i], [xj, yj] = poly[j];
      if ((yi > p[1]) !== (yj > p[1]) && p[0] < (xj - xi) * (p[1] - yi) / (yj - yi) + xi) c = !c;
    }
    return c;
  }
  // Cadre de dessin : unités propres à la vue, mises à l'échelle et centrées.
  function fit(z, x0, y0, x1, y1) {
    const s = Math.min(z.l / (x1 - x0), z.h / (y1 - y0));
    const ox = (z.l - (x1 - x0) * s) / 2 - x0 * s, oy = (z.h - (y1 - y0) * s) / 2 - y0 * s;
    return { s, P: (x, y) => [ox + x * s, oy + y * s] };
  }
  const M = (pts, P) => pts.map(p => P(p[0], p[1]));
  const xy = p => `${r1(p[0])} ${r1(p[1])}`;
  // Courbe lisse (Catmull-Rom) échantillonnée en polyligne.
  function lisse(pts, ferme = false, pas = 8) {
    const n = pts.length, o = [];
    const Q = i => (ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))]);
    const fin = ferme ? n : n - 1;
    for (let i = 0; i < fin; i++) {
      const p0 = Q(i - 1), p1 = Q(i), p2 = Q(i + 1), p3 = Q(i + 2);
      for (let k = 0; k < pas; k++) {
        const t = k / pas, t2 = t * t, t3 = t2 * t;
        const c = (a, b, c_, d) => 0.5 * (2 * b + (-a + c_) * t + (2 * a - 5 * b + 4 * c_ - d) * t2 + (-a + 3 * b - 3 * c_ + d) * t3);
        o.push([c(p0[0], p1[0], p2[0], p3[0]), c(p0[1], p1[1], p2[1], p3[1])]);
      }
    }
    if (!ferme) o.push(pts[n - 1]);
    return o;
  }
  // Forme pleine blanche avec son trait.
  const forme = (pts, P, trait = h.a.arete) =>
    h.chemin(M(pts, P), h.a.blanc, true) + '\n' + h.chemin(M(pts, P), trait, true);
  // Barre droite de a à b, largeur w.
  function barre(a, b, w) {
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]), nx = -(b[1] - a[1]) / L * w / 2, ny = (b[0] - a[0]) / L * w / 2;
    return [[a[0] + nx, a[1] + ny], [b[0] + nx, b[1] + ny], [b[0] - nx, b[1] - ny], [a[0] - nx, a[1] - ny]];
  }
  // Fibres de viande pilée : petits traits courbes semés dans une forme, hors des trous.
  function fibres(P, poly, n, seed, { lmin = 3, lmax = 6, hors = [], trait = h.a.fin } = {}) {
    const r = rng(seed), o = [];
    const xs = poly.map(p => p[0]), ys = poly.map(p => p[1]);
    const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
    const ok = p => dedans(p, poly) && !hors.some(q => dedans(p, q));
    let essais = 0;
    while (o.length < n && essais < n * 40) {
      essais++;
      const c = [x0 + r() * (x1 - x0), y0 + r() * (y1 - y0)];
      const a = r() * Math.PI, L = lmin + r() * (lmax - lmin);
      const d = [Math.cos(a) * L / 2, Math.sin(a) * L / 2];
      const p1 = [c[0] - d[0], c[1] - d[1]], p2 = [c[0] + d[0], c[1] + d[1]];
      if (!ok(p1) || !ok(p2) || !ok(c)) continue;
      const b = (r() - 0.5) * 0.8;
      const k = [c[0] - d[1] * b, c[1] + d[0] * b];
      o.push(h.path(`M${xy(P(...p1))} Q${xy(P(...k))} ${xy(P(...p2))}`, trait));
    }
    return o.join('\n');
  }
  // Contour irrégulier autour d'un centre (trou, grumeau, miette).
  function tache(cx, cy, rx, ry, seed, n = 9) {
    const r = rng(seed);
    return Array.from({ length: n }, (_, i) => {
      const a = i / n * 2 * Math.PI, k = 0.75 + r() * 0.4;
      return [cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k];
    });
  }

  // ───────────────────────── Vue 1 : piler dans un sac de toile ─────────────────────────
  const BOITE_SAC = [-6, 0, 242, 204];
  const Cm = [126, 50], Vm = [0.921, -0.39], Um = [0.39, 0.921];     // marteau : centre, manche, tête
  const tete = [[+1, +1], [+1, -1], [-1, -1], [-1, +1]].map(([a, b]) =>
    [Cm[0] + Um[0] * 17 * a + Vm[0] * 8 * b, Cm[1] + Um[1] * 17 * a + Vm[1] * 8 * b]);
  const SAC = [[84, 124], [82, 110], [88, 97], [104, 89], [124, 85], [146, 84], [168, 86], [186, 91], [196, 98],
    [203, 102], [210, 99], [219, 101], [223, 108], [218, 115], [210, 114], [203, 110], [196, 116], [184, 122],
    [164, 124], [140, 125], [114, 125], [96, 126]];
  const TAS = [[8, 193], [12, 184], [20, 177], [32, 171], [46, 168], [60, 171], [72, 178], [80, 186], [84, 193]];

  function vueSac(z) {
    const { P } = fit(z, ...BOITE_SAC);
    const o = [];
    o.push(h.ligne(...P(-4, 199), ...P(238, 199), h.a.detail));
    // la planche et la bourre déjà pilée
    o.push(forme([[2, 193], [90, 193], [90, 199], [2, 199]], P, h.a.detail));
    const tas = lisse(TAS.concat([[46, 193]]), true, 6);
    o.push(h.chemin(M(tas, P), h.a.blanc, true));
    o.push(fibres(P, tas, 70, 11, { lmin: 3, lmax: 7 }));
    o.push(h.chemin(M(lisse(TAS, false, 6), P), h.a.detail));
    // le billot debout
    const corps = [[92, 112]];
    for (let i = 0; i <= 16; i++) { const t = Math.PI - i / 16 * Math.PI; corps.push([140 + 48 * Math.cos(t), 193 + 6 * Math.sin(t)]); }
    corps.push([188, 112]);
    for (let i = 0; i <= 16; i++) { const t = i / 16 * Math.PI; corps.push([140 + 48 * Math.cos(t), 112 + 8 * Math.sin(t)]); }
    o.push(h.chemin(M(corps, P), h.a.blanc, true));
    // le flanc de droite du billot, à l'ombre
    { const tc = Math.acos(0.45), bande = [];
      for (let i = 0; i <= 8; i++) { const t = tc * i / 8; bande.push([140 + 48 * Math.cos(t), 112 + 8 * Math.sin(t)]); }
      for (let i = 8; i >= 0; i--) { const t = tc * i / 8; bande.push([140 + 48 * Math.cos(t), 193 + 6 * Math.sin(t)]); }
      o.push(h.chemin(M(bande, P), h.a.ombre, true)); }
    o.push(h.chemin(M(corps, P), h.a.arete, true));
    o.push(h.ellipse(...P(140, 112), 48 * fit(z, ...BOITE_SAC).s, 8 * fit(z, ...BOITE_SAC).s, h.a.arete));
    const rb = rng(5);
    [-70, -44, -16, 14, 42, 68].forEach(d => {
      const x = 140 + 48 * Math.sin(d * Math.PI / 180), cc = Math.cos(d * Math.PI / 180);
      const yh = 112 + 8 * cc + 5, yb = 193 + 6 * cc - 4;
      const m = yh + (yb - yh) * (0.35 + rb() * 0.3);
      o.push(h.chemin(M([[x, yh], [x + (rb() - 0.5) * 2, (yh + m) / 2], [x, m - 3]], P), h.a.fin));
      o.push(h.chemin(M([[x, m + 4], [x + (rb() - 0.5) * 2, (m + yb) / 2], [x, yb]], P), h.a.fin));
    });
    // le sac, posé à plat sur le bout du billot, col noué
    const sac = lisse(SAC, true, 6);
    o.push(h.chemin(M(sac, P), h.a.blanc, true));
    o.push(h.chemin(M(sac, P), h.a.contour, true));
    [[[100, 96], [109, 105], [106, 117]], [[148, 88], [155, 97]], [[174, 93], [183, 106], [179, 118]],
      [[126, 94], [131, 104], [128, 112]]].forEach(f => o.push(h.chemin(M(lisse(f, false, 5), P), h.a.fin)));
    o.push(h.ligne(...P(201, 100), ...P(203, 112), h.a.arete));
    o.push(h.ligne(...P(204.5, 100), ...P(206, 112), h.a.arete));
    o.push(h.chemin(M(lisse([[205, 111], [207, 117], [205, 124]], false, 5), P), h.a.detail));
    // le marteau, en descente
    o.push(forme(barre([Cm[0] + Vm[0] * 7, Cm[1] + Vm[1] * 7], [Cm[0] + Vm[0] * 100, Cm[1] + Vm[1] * 100], 8), P));
    o.push(forme(tete, P));
    const b1 = [Cm[0] + Um[0] * 13 + Vm[0] * 8, Cm[1] + Um[1] * 13 + Vm[1] * 8], b2 = [Cm[0] + Um[0] * 13 - Vm[0] * 8, Cm[1] + Um[1] * 13 - Vm[1] * 8];
    o.push(h.ligne(...P(...b1), ...P(...b2), h.a.detail));
    o.push(h.geste(`M${xy(P(104, 32))} Q${xy(P(98, 60))} ${xy(P(116, 80))}`));
    return o.join('\n');
  }

  // ───────────────────────── Vue 2 : sans sac, billot creusé et pilon ─────────────────────────
  const BOITE_BIL = [0, 0, 204, 204];
  const creux = t => [100 - 32 * Math.cos(t), 96 + 54 * Math.sin(t)];
  const NOEUD = [[83, 122], [85, 111], [92, 105], [100, 104], [109, 106], [116, 112], [118, 123], [115, 134],
    [107, 141], [97, 142], [88, 137]];

  function vueBillot(z) {
    const { P } = fit(z, ...BOITE_BIL);
    const o = [];
    o.push(h.ligne(...P(8, 196), ...P(196, 196), h.a.detail));
    // le billot en coupe, le creux dans le bout du bois
    const coupe = [[40, 96], [68, 96]];
    for (let i = 1; i < 32; i++) coupe.push(creux(i / 32 * Math.PI));
    coupe.push([132, 96], [160, 96], [160, 196], [40, 196]);
    o.push(h.chemin(M(coupe, P), h.a.hachure('bois', 'contour'), true));
    o.push(h.ligne(...P(44, 99), ...P(44, 193), h.a.fin));
    o.push(h.ligne(...P(156, 99), ...P(156, 193), h.a.fin));
    // la poudre au fond du creux
    const poudre = [[75, 131], [82, 128], [90, 131], [98, 128], [106, 131], [114, 128], [122, 131]];
    const tA = Math.asin(34 / 54), tB = Math.PI - tA;
    // l'air du creux, au-dessus de la poudre : on voit la paroi d'en face, en gris loin
    const vide = [[68, 96]];
    for (let i = 1; i <= 10; i++) vide.push(creux(tA * i / 10));
    vide.push(...poudre.slice(0, 7));
    for (let i = 0; i < 10; i++) vide.push(creux(tB + (Math.PI - tB) * i / 10));
    vide.push([132, 96]);
    o.push(h.chemin(M(vide, P), h.a.loin, true));
    for (let i = 0; i <= 20; i++) poudre.push(creux(tB - (tB - tA) * i / 20));
    o.push(h.chemin(M(poudre, P), h.a.blanc, true));
    o.push(fibres(P, poudre, 45, 21, { lmin: 3, lmax: 6 }));
    o.push(h.chemin(M(poudre.slice(0, 7), P), h.a.detail));
    // le pilon : un nœud de bouleau, le manche dans la branche
    o.push(forme([[95, 110], [94.5, 16], [96, 10], [104, 10], [105.5, 16], [105, 110]], P));
    const noeud = lisse(NOEUD, true, 6);
    o.push(forme(noeud, P));
    [0.66, 0.36].forEach(k => o.push(h.chemin(M(noeud.map(p => [101 + (p[0] - 101) * k, 123 + (p[1] - 123) * k]), P), h.a.fin, true)));
    o.push(h.ellipse(...P(101, 123), 2.2 * fit(z, ...BOITE_BIL).s, 1.6 * fit(z, ...BOITE_BIL).s, h.a.plein));
    o.push(h.geste(`M${xy(P(124, 30))} L${xy(P(124, 84))}`, { double: true }));
    return o.join('\n');
  }

  // ───────────────────────── Vue 3 : lier au gras chaud ─────────────────────────
  const BOITE_LIER = [0, 6, 244, 204];
  const EXT = [[60, 116], [64, 150], [76, 176], [96, 190], [118, 194], [162, 194], [184, 190], [204, 176], [216, 150], [220, 116]];
  const INT = [[66, 116], [70, 149], [81, 172], [99, 185], [119, 188], [161, 188], [181, 185], [199, 172], [210, 149], [214, 116]];
  const ANG = 50 * Math.PI / 180, PC = [70, 70];
  const rot = ([x, y]) => [PC[0] + x * Math.cos(ANG) - y * Math.sin(ANG), PC[1] + x * Math.sin(ANG) + y * Math.cos(ANG)];
  const BEC = rot([33, -26]), FIL_C = [BEC[0] + 8, BEC[1] + 6], FIL_F = [122, 146];
  const surf = x => 146 + 2.2 * Math.sin(x / 7);
  const quad = t => [0, 1].map(k => (1 - t) * (1 - t) * BEC[k] + 2 * (1 - t) * t * FIL_C[k] + t * t * FIL_F[k]);
  const BA = [232, 36], BB = [176, 160];

  function vueLier(z) {
    const { P, s } = fit(z, ...BOITE_LIER);
    const o = [];
    o.push(h.ligne(...P(40, 195), ...P(240, 195), h.a.detail));
    // le bol en coupe
    const ext = lisse(EXT, false, 8), int = lisse(INT, false, 8);
    o.push(h.chemin(M(ext.concat(int.slice().reverse()), P), h.a.hachure('bois', 'contour'), true));
    // la masse : ce qui est sous la surface, dans le bol
    const iA = int.findIndex(p => p[1] >= surf(p[0]));
    const iB = int.length - 1 - int.slice().reverse().findIndex(p => p[1] >= surf(p[0]));
    const dessus = [];
    for (let x = int[iA][0]; x <= int[iB][0]; x += 4) dessus.push([x, surf(x)]);
    dessus.push([int[iB][0], surf(int[iB][0])]);
    const masse = dessus.concat(int.slice(iA, iB + 1).reverse());
    // au-dessus de la masse, la paroi d'en face du bol : en gris loin
    o.push(h.chemin(M(int.slice(0, iA + 1).concat(dessus, int.slice(iB)), P), h.a.loin, true));
    o.push(h.chemin(M(masse, P), h.a.blanc, true));
    o.push(fibres(P, masse, 230, 31, { lmin: 3, lmax: 5.5 }));
    o.push(h.chemin(M(dessus, P), h.a.detail));
    // le gras qui coule du bec
    [-1.3, 1.3].forEach(d => o.push(h.path(`M${xy(P(BEC[0] + d * 0.6, BEC[1]))} Q${xy(P(FIL_C[0] + d, FIL_C[1]))} ${xy(P(FIL_F[0] + d, FIL_F[1]))}`, h.a.detail)));
    // le chaudron, penché du côté du bec
    o.push(forme(barre(rot([-28, -7]), rot([-60, -13]), 6).map(p => p), P));
    const pot = [[33, -26], [28, -22], [28, 19], [25, 22], [-25, 22], [-28, 19], [-28, -22], [-32, -25]].map(rot);
    o.push(h.chemin(M(pot.slice(1, 7), P), h.a.blanc, true));
    o.push(h.chemin(M(pot, P), h.a.arete));
    o.push(h.ligne(...P(...rot([-28, -22])), ...P(...rot([28, -22])), h.a.detail));
    // le bâton : visible jusqu'à la surface, caché dans la masse
    const tS = (surf(183) - BA[1]) / (BB[1] - BA[1]);
    const BS = [BA[0] + (BB[0] - BA[0]) * tS, BA[1] + (BB[1] - BA[1]) * tS];
    o.push(forme(barre(BA, BS, 6), P));
    const bc = barre(BS, BB, 6);
    o.push(h.chemin(M([bc[0], bc[1], bc[2], bc[3]], P), h.a.cache));
    // le brassage
    o.push(h.geste(`M${xy(P(204, 135))} A${r1(26 * s)} ${r1(8 * s)} 0 0 0 ${xy(P(152, 135))}`));
    return o.join('\n');
  }

  // ───────────────────────── Vue 4 : la masse tient au poing ─────────────────────────
  const BOITE_POING = [0, 84, 244, 178];
  const BOULE = [[26, 170], [21, 154], [27, 138], [42, 128], [62, 125], [82, 127], [99, 133], [110, 146], [110, 162], [102, 170]];
  const EFFRITE = [[146, 170], [140, 156], [145, 140], [158, 131], [176, 127], [194, 129], [206, 134], [212, 140],
    [204, 146], [214, 152], [220, 162], [216, 170]];

  function vuePoing(z) {
    const { P } = fit(z, ...BOITE_POING);
    const o = [];
    o.push(h.ligne(...P(6, 171), ...P(238, 171), h.a.detail));
    // pressée au poing : elle garde la forme et les plis des doigts
    const b = lisse(BOULE, true, 6);
    o.push(h.chemin(M(b, P), h.a.blanc, true));
    o.push(fibres(P, b, 190, 41, { lmin: 3, lmax: 5 }));
    o.push(h.chemin(M(b, P), h.a.contour, true));
    [[[46, 130], [49, 146], [47, 163]], [[64, 127], [67, 145], [65, 165]], [[83, 129], [86, 146], [84, 164]]]
      .forEach(f => o.push(h.chemin(M(lisse(f, false, 5), P), h.a.detail)));
    // pas assez de gras : elle fend et s'égrène
    const fentes = [[[176, 128], [181, 139], [175, 149], [183, 161], [180, 170]], [[154, 146], [164, 151], [168, 163]]];
    o.push(h.chemin(M(EFFRITE, P), h.a.blanc, true));
    o.push(fibres(P, EFFRITE, 110, 43, { lmin: 3, lmax: 6 }));
    o.push(h.chemin(M(EFFRITE, P), h.a.contour, true));
    fentes.forEach(f => o.push(h.chemin(M(f, P), h.a.arete)));
    // le raté : la masse fend, il manque du gras
    { const { s: k } = fit(z, ...BOITE_POING); o.push(h.controle(...P(179, 146), 15 * k)); }
    [[228, 166, 5, 4, 1], [131, 167, 4, 3.5, 2], [221, 168.5, 3, 2.2, 3], [224, 159, 3.5, 3, 4]].forEach(([x, y, rx, ry, sd]) =>
      o.push(forme(tache(x, y, rx, ry, sd, 7), P, h.a.detail)));
    const r = rng(47);
    for (let i = 0; i < 22; i++) {
      const x = 124 + r() * 112, y = 166 + r() * 4, a = r() * Math.PI, L = 2 + r() * 2.5;
      if (x > 142 && x < 218) continue;
      o.push(h.ligne(...P(x, y), ...P(x + Math.cos(a) * L, Math.min(170.5, y + Math.sin(a) * L)), h.a.fin));
    }
    return o.join('\n');
  }

  // ───────────────────────── Vue 5 : mouler sous planche et pierre ─────────────────────────
  const BOITE_MOULE = [-25, 62, 322, 190];
  const PIERRE = [[122, 124], [115, 113], [117, 97], [127, 84], [141, 76], [160, 73], [178, 76], [192, 86], [203, 97], [207, 111], [201, 124]];

  function vueMoule(z) {
    const { P } = fit(z, ...BOITE_MOULE);
    const o = [];
    o.push(h.ligne(...P(8, 184), ...P(312, 184), h.a.detail));
    // la masse pressée
    const masse = [[40, 136], [280, 136], [280, 168], [40, 168]];
    o.push(fibres(P, masse, 420, 51, { lmin: 3, lmax: 5 }));
    // le moule de bois en coupe
    o.push(h.chemin(M([[24, 116], [38, 116], [38, 170], [282, 170], [282, 116], [296, 116], [296, 184], [24, 184]], P), h.a.hachure('bois', 'contour'), true));
    // la chemise de toile graissée, qui déborde des rives
    o.push(h.chemin(M([[19, 136], [20, 118], [23, 114], [38, 114], [40, 117], [40, 168], [280, 168], [280, 117], [282, 114],
      [297, 114], [300, 118], [301, 136]], P), h.a.arete));
    // la planche, qui entre dans le moule avec du jeu
    o.push(h.rect(...P(45, 124), 230 * fit(z, ...BOITE_MOULE).s, 12 * fit(z, ...BOITE_MOULE).s, h.a.hachure('bois')));
    // la pierre
    const pr = lisse(PIERRE, true, 2);
    // la pierre : sa face de droite et de dessous à l'ombre (la pierre moins elle-même décalée)
    o.push(h.chemin(M(pr, P), h.a.blanc, true));
    o.push(`<clipPath id="om-72-41-pierre">${h.chemin(M(pr, P), h.a.blanc, true)}</clipPath>`);
    o.push(`<g clip-path="url(#om-72-41-pierre)">${h.chemin(M(pr, P), h.a.ombre, true)}${h.chemin(M(pr.map(([x, y]) => [x - 13, y - 9]), P), h.a.blanc, true)}</g>`);
    o.push(h.chemin(M(pr, P), h.a.arete, true));
    [[[136, 88], [150, 82], [166, 83]], [[184, 96], [192, 106], [190, 116]], [[130, 108], [138, 114]]]
      .forEach(f => o.push(h.chemin(M(lisse(f, false, 5), P), h.a.fin)));
    return o.join('\n');
  }

  // ───────────────────────── Vues 6 et 7 : le bloc froid, coupé ─────────────────────────
  const BOITE_BLOC = [-6, 22, 196, 136];
  const FACE = [[14, 62], [134, 62], [134, 116], [14, 116]];
  const TROUS = [tache(62, 84, 9, 6, 61), tache(94, 100, 12, 7, 62), tache(118, 75, 6, 5, 63), tache(40, 104, 5, 4, 64)];
  const GRUMEAUX = [tache(32, 80, 11, 8, 71, 8), tache(72, 104, 9, 6, 72, 8)];

  function bloc(z, rate) {
    const { P } = fit(z, ...BOITE_BLOC);
    const o = [];
    o.push(forme([[14, 62], [54, 36], [174, 36], [134, 62]], P));
    // la face de droite, à l'ombre
    o.push(h.chemin(M([[134, 62], [174, 36], [174, 90], [134, 116]], P), h.a.ombre, true));
    o.push(h.chemin(M([[134, 62], [174, 36], [174, 90], [134, 116]], P), h.a.arete, true));
    o.push(h.chemin(M(FACE, P), h.a.blanc, true));
    const hors = rate ? TROUS.concat(GRUMEAUX) : [];
    o.push(fibres(P, FACE, rate ? 300 : 330, rate ? 81 : 82, { lmin: 3, lmax: 5, hors }));
    if (rate) {
      TROUS.forEach(t => {
        const l = lisse(t, true, 5);
        o.push(forme(l, P));
        const cx = t.reduce((a, p) => a + p[0], 0) / t.length, cy = t.reduce((a, p) => a + p[1], 0) / t.length;
        const haut = l.filter(p => p[1] < cy).map(p => [cx + (p[0] - cx) * 0.7, cy + (p[1] - cy) * 0.55]);
        o.push(h.chemin(M(haut.sort((a, b) => a[0] - b[0]), P), h.a.fin));
      });
      const rg = rng(73);
      GRUMEAUX.forEach(g => {
        const l = lisse(g, true, 5);
        o.push(h.chemin(M(l, P), h.a.detail, true));
        const xs = l.map(p => p[0]), ys = l.map(p => p[1]);
        let k = 0;
        while (k < 40) {
          const q = [Math.min(...xs) + rg() * (Math.max(...xs) - Math.min(...xs)), Math.min(...ys) + rg() * (Math.max(...ys) - Math.min(...ys))];
          if (!dedans(q, l)) continue;
          o.push(h.cercle(...P(...q), 0.55, h.a.plein));
          k++;
        }
      });
    }
    o.push(h.chemin(M(FACE, P), h.a.arete, true));
    // la silhouette du bloc, au trait fort
    o.push(h.chemin(M([[14, 62], [54, 36], [174, 36], [174, 90], [134, 116], [14, 116]], P), h.a.contour, true));
    // le raté : la poche d'air
    if (rate) { const { s: k } = fit(z, ...BOITE_BLOC); o.push(h.controle(...P(94, 100), 16 * k)); }
    return o.join('\n');
  }

  return {
    ref: '72-41',
    titre: 'Le pemmican, de la lanière sèche au bloc',
    desc: 'Les lanières cassantes pilées dans un sac de toile sur un billot, ou dans un billot creusé au pilon de nœud de bouleau, '
      + 'jusqu’à une bourre fibreuse ; le gras chaud versé sur la poudre en brassant au bâton, jusqu’à ce que la masse tienne au poing ; '
      + 'la masse pressée dans un moule de bois chemisé de toile graissée, sous une planche et une pierre, jusqu’à froid ; '
      + 'puis la coupe d’un bon bloc, sans poche, à côté d’un bloc à refondre, troué de poches d’air et de grumeaux.',
    format: 'pleine',
    disposition: [['sac', 'billot'], ['lier', 'poing'], ['moule', 'bon', 'rate']],
    hauteurs: [1.1, 1, 0.95],
    largeurs: [[1.2, 1], [1, 1], [2.1, 1, 1]],
    vues: {
      sac: {
        titre: 'Piler dans un sac de toile',
        dessin: vueSac,
        renvois: z => {
          const { P } = fit(z, ...BOITE_SAC);
          return [
            { n: 1, rond: P(50, 120), cible: P(95, 110), texte: 'lanières sèches, sac noué' },
            { n: 2, rond: P(62, 30), cible: P(121, 44), texte: 'marteau ou masse' },
            { n: 3, rond: P(18, 148), cible: P(40, 180), texte: 'bourre, pas de morceaux' },
          ];
        },
      },
      billot: {
        titre: 'Sans sac : billot creusé et pilon',
        dessin: vueBillot,
        renvois: z => {
          const { P } = fit(z, ...BOITE_BIL);
          return [
            { n: 4, rond: P(184, 72), cible: P(131.5, 112), texte: 'creux brûlé au feu, raclé' },
            { n: 5, rond: P(42, 62), cible: P(87, 118), texte: 'pilon : nœud de bouleau' },
          ];
        },
      },
      lier: {
        titre: 'Lier : verser le gras en brassant',
        dessin: vueLier,
        renvois: z => {
          const { P } = fit(z, ...BOITE_LIER);
          return [
            { n: 6, rond: P(152, 84), cible: P(...quad(0.55)), texte: 'gras chaud, sans fumer' },
            { n: 7, rond: P(228, 108), cible: P(208, 90), texte: 'brasser au bâton' },
            { n: 8, rond: P(24, 172), cible: P(100, 178), texte: 'aucune poudre sèche au fond' },
          ];
        },
      },
      poing: {
        titre: 'Assez de gras : la masse tient',
        dessin: vuePoing,
        renvois: z => {
          const { P } = fit(z, ...BOITE_POING);
          return [
            { n: 9, rond: P(18, 104), cible: P(38, 136), texte: 'pressée au poing, elle tient' },
            { n: 10, rond: P(228, 104), cible: P(180, 140), texte: 'effritée : ajouter du gras' },
          ];
        },
      },
      moule: {
        titre: 'Mouler : planche et pierre, jusqu’à froid',
        dessin: vueMoule,
        renvois: z => {
          const { P } = fit(z, ...BOITE_MOULE);
          return [
            { n: 11, rond: P(-12, 174), cible: P(30, 178), texte: 'moule de bois peu profond' },
            { n: 12, rond: P(-12, 108), cible: P(20, 126), texte: 'chemise de toile graissée' },
            { n: 13, rond: P(66, 84), cible: P(74, 128), texte: 'planche, libre dans le moule' },
            { n: 14, rond: P(256, 80), cible: P(204, 100), texte: 'pierre : chasser l’air' },
          ];
        },
      },
      bon: {
        titre: 'En coupe : bon bloc',
        dessin: z => bloc(z, false),
        renvois: z => {
          const { P } = fit(z, ...BOITE_BLOC);
          return [
            { n: 15, rond: P(15, 38), cible: P(40, 86), texte: 'aucune poche visible' },
          ];
        },
      },
      rate: {
        titre: 'En coupe : à refondre',
        dessin: z => bloc(z, true),
        renvois: z => {
          const { P } = fit(z, ...BOITE_BLOC);
          return [
            { n: 16, rond: P(100, 130), cible: P(96, 104), texte: 'poche d’air : refondre' },
            { n: 17, rond: P(15, 38), cible: P(30, 74), texte: 'grumeau : gras trop froid' },
          ];
        },
      },
    },
    danger: 'Danger — seulement de la viande passée à 71 °C pendant 15 secondes à cœur, puis séchée jusqu’à casser net. '
      + 'Le gras ferme le couvercle sur ce qu’il y a dedans : un bloc mou se jette.',
  };
};
