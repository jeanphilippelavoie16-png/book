// Planche 89-03 — Le laçage en trois zones (ch. 89, §5 blocs E à G, étapes 19 à 33 ; §9, l'aiguille)
//
// En haut, la raquette entière et l'aiguille. Au milieu, la pointe en quatre gros plans, une étape
// par vue : la lisière, le départ en œil coulant, la boucle suivante prise d'un tour tordu, le brin
// tordu autour d'une passe. En bas, le trou des orteils et le nœud de cabestan du centre.
//
// La raquette est calculée dans un seul repère en centimètres, vue de dessus : la pointe à gauche
// en x = 0, la queue à droite, l'axe sur y = 0, y vers le bas. Le trou des orteils agrandit ce même
// repère. Les gros plans de la pointe et le cabestan ont leur repère propre, en millimètres.
// La babiche se dessine en ruban à deux bords (h.formes.cordes) : à chaque croisement, le brin du
// dessous est coupé de part et d'autre de celui du dessus.
//
// La charte : rien à ajouter. Les vues sont de dessus ou coupées dans le fût, donc sans gris ; la
// babiche et le contour de la raquette portent déjà le trait fort. Pas de rouge : les flèches
// disent le trajet de la babiche (elles restent noires, comme le trajet du fil à la 27-01), et le
// chapitre ne donne pas de point à vérifier qui se montre sur le dessin.
module.exports = (h) => ({
  ref: '89-03',
  fichier: 'planche-89-03-lacage-trois-zones.svg',
  titre: 'Le laçage en trois zones',
  desc: 'En haut, une raquette à queue vue de dessus, pointe à gauche, l’axe en trait mixte : le fût de bouleau fait le tour, les deux bouts superposés et ligaturés à la queue ; deux traverses, à 380 à 410 mm l’une de l’autre, la coupent en trois zones. La pointe et le talon sont remplis de petits triangles serrés en babiche fine ; le centre, en babiche forte, a des mailles plus grandes. Juste derrière la traverse avant, le trou des orteils, nettement décalé d’un côté de l’axe. À droite, l’aiguille à lacer, plate, bouts arrondis, la babiche dans le chas au milieu : elle passe dans un sens comme dans l’autre, et vue de chant, mince. Au milieu, la pointe en quatre gros plans, la babiche en ruban. 1, la lisière : dans le fût, des paires de trous percés en biais ; la babiche entre par le chant intérieur, court dans le bois (en tireté), sort sur le dessus, replonge et ressort en petite boucle sur le bord intérieur. 2, le départ, au coin où la traverse rejoint le fût : le bout du brin, fendu en œil, fait le tour de la boucle de lisière du coin ; puis le dormant passe par-dessus un bord de l’œil et ressort sous l’autre, et on tire vers la pointe ; le bout libre dépasse de l’œil. 3, la boucle suivante : le brin fait le tour d’une boucle de lisière, puis ses deux brins se tordent d’un tour complet, deux croisements, avant de repartir. 4, le brin qui croise une passe déjà posée en fait le tour complet : dessus, dessous, dessus. En bas à gauche, le trou des orteils de près : le cordon de cinq brins, les haubans de trois brins enroulés sur le cordon et de deux ou trois tours sur la traverse, le bord tordu autour d’eux, 100 mm entre les haubans. En bas à droite, le centre contre le fût, sans trou : le brin monte du laçage, passe par-dessus le fût, en fait le tour, croise par-dessus lui-même, fait un second tour et ressort sous le croisement, vers le laçage : un nœud de cabestan, montré lâche, à côté du nœud voisin serré. Plus bas, le brin qui monte a fait un tour serré sur la passe en biais du nœud voisin : dessus, dessous en tireté, dessus. 20 mm entre deux brins parallèles.',
  format: 'pleine',
  disposition: [['raquette', 'aiguille'], ['s1', 's2', 's3', 's4'], ['orteils', 'centre']],
  hauteurs: [0.95, 0.965, 1.1],
  largeurs: [[3.25, 1], [1, 1, 1, 1], [1, 1.95]],
  vues: {
    raquette: {
      titre: 'La raquette lacée, vue de dessus',
      dessin: z => vueRaquette(h, z),
      renvois: z => {
        const { T } = repereR(z), G = geo();
        const haut = 11;
        return [
          { n: 1, rond: [T([6, 0])[0], haut], cible: T([11, -6.6]), texte: 'pointe d’abord, babiche fine' },
          { n: 2, rond: [T([52, 0])[0], haut], cible: T([54, -8.2]), texte: 'centre ensuite, babiche forte' },
          { n: 3, rond: [T([86, 0])[0], haut], cible: T([83, -3.2]), texte: 'talon en dernier, la plus fine' },
          { n: 4, rond: [T([31.3, 0])[0], haut], cible: T([31.2, G.Y0 - 2.5]), texte: 'trou d’orteils, pas au milieu' },
        ];
      },
    },
    aiguille: {
      titre: 'L’aiguille à lacer',
      dessin: z => vueAiguille(h, z),
      renvois: z => {
        const A = repereD(z);
        return [
          { n: 5, rond: [z.l - 12, A.cy2 + 22], cible: [A.cx + A.Lg / 2 - 3, A.cy2], texte: 'plate, bouts arrondis' },
          { n: 6, rond: [14, A.cy1 + 34], cible: [A.cx - A.oeil * 0.35, A.cy1 + 1], texte: 'chas au milieu : deux sens' },
        ];
      },
    },
    s1: {
      titre: '1. La lisière',
      dessin: z => vueLisiere(h, z),
      renvois: z => {
        const R = repS(z, FEN1), L = LIS;
        const [p1, p2] = L.paires;
        return [
          { n: 7, rond: [z.l - 13, R.T([0, -16.6])[1]], cible: R.T(p2.P), texte: 'trous en biais, par paires' },
          { n: 8, rond: [13, R.T([0, -16.6])[1]], cible: R.T(mil(p1.Q, p1.E)), texte: 'court dans le bois, à l’abri' },
          { n: 9, rond: [R.T([14, 0])[0], R.T([0, 12.8])[1]], cible: R.T([14, L.H + 1.1]), texte: 'lisière : petites boucles' },
        ];
      },
    },
    s2: {
      titre: '2. Le départ, au coin',
      dessin: z => vueDepart(h, z),
      renvois: z => {
        const R = repS(z, FEN2), D = depart();
        return [
          { n: 10, rond: R.T([2.2, 14.2]), cible: R.T(D.surBoucle), texte: 'le bout passe dans la boucle' },
          { n: 11, rond: R.T([17.6, 14.8]), cible: R.T(D.dansOeil), texte: 'le brin passe dans son œil' },
        ];
      },
    },
    s3: {
      titre: '3. La boucle suivante',
      dessin: z => vueBoucle(h, z),
      renvois: z => {
        const R = repS(z, FEN3), B = boucle();
        return [
          { n: 12, rond: [z.l - 13, R.T([0, B.tors[1] - 1])[1]], cible: R.T([B.tors[0] + 2.2, B.tors[1]]), texte: 'boucle prise d’un tour tordu' },
        ];
      },
    },
    s4: {
      titre: '4. Autour d’une passe',
      dessin: z => vuePasse(h, z),
      renvois: z => {
        const R = repS(z, FEN4), P = passe();
        return [
          { n: 13, rond: [z.l - 13, R.T([0, 31])[1]], cible: R.T(P.dessous), texte: 'tordu autour de la passe' },
        ];
      },
    },
    orteils: {
      titre: 'Le trou des orteils',
      dessin: z => vueOrteils(h, z),
      renvois: z => {
        const { T } = repereB(z), G = geo();
        const hb = G.hauban(-1);
        return [
          { n: 14, rond: [z.l - 13, T([0, G.Y0 + 6.2])[1]], cible: T([G.XC + 0.3, G.Y0 + 6.2]), texte: 'cordon : cinq ou six passes' },
          { n: 15, rond: [z.l - 13, T([0, G.Y0 - 6.0])[1]], cible: T(hb[Math.round(hb.length * 0.45)]), texte: 'hauban, plusieurs tours' },
          { n: 16, rond: [13, T([0, G.Y0 + 6.4])[1]], cible: T(G.bordB[5]), texte: 'bord tordu sur les haubans' },
        ];
      },
    },
    centre: {
      titre: 'Le centre, autour du fût',
      dessin: z => vueCentre(h, z),
      renvois: z => {
        const R = repereC(z), C = cabestan();
        return [
          { n: 17, rond: R.T([-12.0, 12.0]), cible: R.T(C.croisement), texte: 'nœud de cabestan sur le fût' },
          { n: 18, rond: R.T([38.0, 9.0]), cible: R.T([38.0, 1.0]), texte: 'fût sans trou au centre' },
        ];
      },
    },
  },
});

// ─── Outils ──────────────────────────────────────────────────────────────────────────────
const PI = Math.PI;
const r1 = v => Math.round(v * 10) / 10;
const mil = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
const plus = (a, b, k = 1) => [a[0] + k * b[0], a[1] + k * b[1]];
const unit = v => { const L = Math.hypot(v[0], v[1]) || 1; return [v[0] / L, v[1] / L]; };
const quad = (a, c, b, n = 16) => Array.from({ length: n + 1 }, (_, i) => {
  const t = i / n, u = 1 - t;
  return [u * u * a[0] + 2 * u * t * c[0] + t * t * b[0], u * u * a[1] + 2 * u * t * c[1] + t * t * b[1]];
});

// Décalage d'une polyligne : d > 0 vers la gauche du sens de parcours (l'intérieur de la raquette)
function decale(pts, d) {
  return pts.map((p, i) => {
    const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
    const tx = b[0] - a[0], ty = b[1] - a[1], L = Math.hypot(tx, ty) || 1;
    return [p[0] + d * ty / L, p[1] - d * tx / L];
  });
}
// Garder la partie d'une polyligne entre xa et xb
function tranche(pts, xa, xb) {
  const out = [];
  for (let i = 0; i < pts.length; i++) {
    const p = pts[i], q = pts[i + 1];
    if (p[0] >= xa && p[0] <= xb) out.push(p);
    if (q) {
      const X = [xa, xb].filter(X => (p[0] - X) * (q[0] - X) < 0).sort((a, b) => (a - p[0]) * (q[0] - p[0]) - (b - p[0]) * (q[0] - p[0]));
      for (const x of X) { const t = (x - p[0]) / (q[0] - p[0]); out.push([x, p[1] + t * (q[1] - p[1])]); }
    }
  }
  return out;
}
// Abscisse curviligne : point et normale intérieure à la distance s
function abscisse(pts) {
  const cum = [0];
  for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const at = s => {
    let i = 1; while (i < pts.length - 1 && cum[i] < s) i++;
    const a = pts[i - 1], b = pts[i], L = (cum[i] - cum[i - 1]) || 1, t = (s - cum[i - 1]) / L;
    const tx = (b[0] - a[0]) / L, ty = (b[1] - a[1]) / L;
    return { p: [a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])], n: [ty, -tx], t: [tx, ty] };
  };
  return { at, L: cum[cum.length - 1] };
}
// Découper une droite (p0 + t·d) par des anneaux polygonaux, règle pair-impair
function couper(p0, d, anneaux) {
  const ts = [];
  for (const R of anneaux) for (let i = 0; i < R.length; i++) {
    const a = R[i], b = R[(i + 1) % R.length], ex = b[0] - a[0], ey = b[1] - a[1];
    const den = d[0] * ey - d[1] * ex;
    if (Math.abs(den) < 1e-12) continue;
    const wx = a[0] - p0[0], wy = a[1] - p0[1];
    const t = (wx * ey - wy * ex) / den, u = (wx * d[1] - wy * d[0]) / den;
    if (u >= 0 && u < 1) ts.push(t);
  }
  ts.sort((a, b) => a - b);
  const segs = [];
  for (let i = 0; i + 1 < ts.length; i += 2) if (ts[i + 1] - ts[i] > 0.05) segs.push([plus(p0, d, ts[i]), plus(p0, d, ts[i + 1])]);
  return segs;
}
// Treillis de babiche : trois familles de brins (en travers, et à ±30° de l'axe).
// decal = [0, 0, 0] : les trois passent par les mêmes nœuds, triangles serrés ;
// [0, 0, ½] : mailles à six côtés, celles du centre.
function treillis(anneaux, pas, decal, O) {
  const tous = anneaux.flat();
  const segs = [];
  [90, 30, 150].forEach((deg, i) => {
    const a = deg * PI / 180, d = [Math.cos(a), Math.sin(a)], n = [-Math.sin(a), Math.cos(a)];
    const cs = tous.map(p => n[0] * (p[0] - O[0]) + n[1] * (p[1] - O[1]));
    const c0 = Math.min(...cs), c1 = Math.max(...cs), o = decal[i] * pas;
    for (let k = Math.floor((c0 - o) / pas); k <= Math.ceil((c1 - o) / pas); k++) {
      const c = o + k * pas;
      segs.push(...couper([O[0] + n[0] * c, O[1] + n[1] * c], d, anneaux));
    }
  });
  return segs;
}
// Une lanière de babiche à petite échelle : bande de largeur w (px) autour d'une ligne médiane (px)
function bande(h, pts, w, trait = 'detail') {
  const g = [], d = [];
  pts.forEach((p, i) => {
    const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
    const nx = -(b[1] - a[1]) / L * w / 2, ny = (b[0] - a[0]) / L * w / 2;
    g.push([r1(p[0] + nx), r1(p[1] + ny)]); d.push([r1(p[0] - nx), r1(p[1] - ny)]);
  });
  const poly = g.concat(d.reverse());
  return h.chemin(poly, h.a.blanc, true) + '\n' + h.chemin(poly, h.a[trait], true);
}
// Sortie d'une demi-droite par un rectangle
function sortie(p, u, X0, X1, Y0, Y1) {
  const ts = [];
  if (u[0] > 0) ts.push((X1 - p[0]) / u[0]); if (u[0] < 0) ts.push((X0 - p[0]) / u[0]);
  if (u[1] > 0) ts.push((Y1 - p[1]) / u[1]); if (u[1] < 0) ts.push((Y0 - p[1]) / u[1]);
  return plus(p, u, Math.min(...ts));
}

// ─── La raquette, en centimètres ─────────────────────────────────────────────────────────
// Ligne médiane du fût : pointe ronde jusqu'à x = 34, puis effilée jusqu'aux bouts
// superposés de la queue, x = 102 à 116. Fût de 1,5 cm vu de dessus.
let GEO = null;
function geo() {
  if (GEO) return GEO;
  const W = 16, XN = 34, XQ = 102, XT = 116, HF = 0.75;
  const TAV = 28, TAR = 68, TL = 0.75;          // traverses : 40 cm d'axe en axe
  const Y0 = 3.5, XC = 34.8, CL = 0.6;          // bouche nettement décalée ; cordon d'orteils
  const hwc = x => x <= 0 ? 0 : x <= XN ? W * Math.sqrt(Math.max(0, 1 - ((XN - x) / XN) ** 2))
    : x < XQ ? W * ((1 + Math.cos(PI * (x - XN) / (XQ - XN))) / 2) ** 0.55 : 0;
  const bas = [];
  for (let i = 0; i <= 48; i++) { const th = (PI / 2) * i / 48; bas.push([XN - XN * Math.cos(th), W * Math.sin(th)]); }
  for (let x = XN + 0.5; x <= XT + 1e-9; x += 0.5) bas.push([x, hwc(x)]);
  const M = bas.slice(1).map(([x, y]) => [x, -y]).reverse().concat(bas);
  const mid = bas.length - 2;
  const interieur = d => decale(M, d).filter((p, i) => p[0] < XN || (i <= mid ? p[1] < -0.02 : p[1] > 0.02));
  const exterieur = decale(M, -HF);
  const bordInt = interieur(HF);
  const yInt = x => { // demi-largeur intérieure, côté bas
    const B = bordInt.filter(p => p[1] > 0);
    for (let i = 0; i + 1 < B.length; i++) if ((B[i][0] - x) * (B[i + 1][0] - x) <= 0) {
      const t = (x - B[i][0]) / ((B[i + 1][0] - B[i][0]) || 1); return B[i][1] + t * (B[i + 1][1] - B[i][1]);
    }
    return 0;
  };
  // Haubans : du cordon d'orteils à la traverse avant ; s = -1 côté haut, +1 côté bas
  const hauban = s => [[XC + CL, Y0 + s * 5.75], ...quad([XC - CL, Y0 + s * 5.75], [31.0, Y0 + s * 5.75], [TAV + TL, Y0 + s * 3.2], 14), [TAV - TL, Y0 + s * 3.2]];
  const courbe = s => quad([XC, Y0 + s * 5.75], [31.0, Y0 + s * 5.75], [TAV + TL, Y0 + s * 3.2], 14);
  const trou = [...courbe(-1), [TAV + TL - 0.1, Y0 - 3.2], [TAV + TL - 0.1, Y0 + 3.2], ...courbe(1).reverse()];
  // Le bord du trou : un brin qui court à l'intérieur des haubans
  const bordHaut = decale(quad([XC - CL, Y0 - 5.75], [31.0, Y0 - 5.75], [TAV + TL, Y0 - 3.2], 14), 0.55);
  const bordBas = decale(quad([XC - CL, Y0 + 5.75], [31.0, Y0 + 5.75], [TAV + TL, Y0 + 3.2], 14), -0.55);
  const bordB = bordBas;
  const E = 0.45; // lisière : les boucles avancent de 0,45 cm dans la zone
  GEO = {
    W, XN, XQ, XT, HF, TAV, TAR, TL, Y0, XC, CL, hwc, M, mid, interieur, exterieur, bordInt, yInt,
    hauban, trou, bordHaut, bordBas, bordB,
    anneauPointe: tranche(interieur(HF + E), -10, TAV - TL - 0.3),
    anneauCentre: tranche(bordInt, TAV + TL, TAR - TL),
    anneauTalon: tranche(interieur(HF + E), TAR + TL + 0.3, 999),
  };
  return GEO;
}

// ─── Vue 1 : la raquette entière ────────────────────────────────────────────────────────
function repereR(z) {
  const K = Math.min((z.l - 12) / 120, (z.h - 44) / 34.6);
  const ox = (z.l - 116.75 * K) / 2 + 0.75 * K, oy = 25 + 16.75 * K;
  return { K, T: ([x, y]) => [r1(ox + K * x), r1(oy + K * y)] };
}
function vueRaquette(h, z) {
  const G = geo(), { T } = repereR(z);
  const seg = (s, a) => h.chemin([T(s[0]), T(s[1])], a);
  const out = [];
  // Les trois treillis
  const mPointe = treillis([G.anneauPointe], 1.35, [0, 0, 0], [G.HF + 0.45, 0]);
  const mTalon = treillis([G.anneauTalon], 1.35, [0, 0, 0], [G.TAR + G.TL + 0.75, 0]);
  const mCentre = treillis([G.anneauCentre, G.trou], 2, [0, 0, 0.5], [G.TAV + G.TL, G.Y0]);
  out.push(...mPointe.map(s => seg(s, h.a.fin)), ...mTalon.map(s => seg(s, h.a.fin)), ...mCentre.map(s => seg(s, h.a.detail)));
  // La lisière : petites boucles le long du bord intérieur, pointe et talon
  const boucles = (poly) => {
    const A = abscisse(poly), out = [];
    for (let s = 0.3; s + 0.7 < A.L; s += 1.4) {
      const a = A.at(s).p, b = A.at(s + 0.7).p, m = A.at(s + 0.35);
      out.push(h.path('M' + quad(a, plus(m.p, m.n, 0.9), b, 6).map(p => T(p).join(' ')).join(' L'), h.a.fin));
    }
    return out;
  };
  out.push(...boucles(tranche(G.bordInt, -10, G.TAV - G.TL - 0.05)), ...boucles(tranche(G.bordInt, G.TAR + G.TL + 0.05, 999)));
  const yl = G.yInt(G.TAV - G.TL - 0.25), yr = G.yInt(G.TAR + G.TL + 0.25);
  out.push(seg([[G.TAV - G.TL - 0.25, -yl], [G.TAV - G.TL - 0.25, yl]], h.a.fin), seg([[G.TAR + G.TL + 0.25, -yr], [G.TAR + G.TL + 0.25, yr]], h.a.fin));
  // L'axe de la raquette, en trait mixte : il montre le trou décalé
  const mixte = h.a.fin + ' stroke-dasharray="11 2.5 2 2.5"';
  const liseré = 'fill="none" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="butt"';
  out.push(seg([[1.2, 0], [G.XQ - 1, 0]], liseré));
  out.push(seg([[1.2, 0], [G.XQ - 1, 0]], mixte));
  // Les deux traverses
  for (const x of [G.TAV, G.TAR]) {
    const [a, b] = [T([x - G.TL, -G.hwc(x)]), T([x + G.TL, G.hwc(x)])];
    out.push(h.rect(a[0], a[1], b[0] - a[0], b[1] - a[1], h.a.blanc), h.rect(a[0], a[1], b[0] - a[0], b[1] - a[1], h.a.arete));
  }
  // Le fût
  const d = 'M' + G.exterieur.map(p => T(p).join(' ')).join(' L') + ' Z M' + G.bordInt.map(p => T(p).join(' ')).join(' L') + ' Z';
  out.push(h.path(d, h.a.blanc + ' fill-rule="evenodd"'));
  out.push(h.chemin(G.bordInt.map(T), h.a.arete, true), h.chemin(G.exterieur.map(T), h.a.contour, true));
  // Tours de babiche du centre, sur le fût et sur les traverses
  const tours = [];
  for (const s of mCentre) for (const p of s) {
    if (Math.abs(p[0] - (G.TAV + G.TL)) < 0.03) { tours.push([p, [G.TAV - G.TL, p[1]]]); continue; }
    if (Math.abs(p[0] - (G.TAR - G.TL)) < 0.03) { tours.push([p, [G.TAR + G.TL, p[1]]]); continue; }
    if (p[0] < G.XC + 0.1 && Math.abs(p[1] - G.Y0) < 6.5) continue;
    const m = (G.hwc(p[0] + 0.05) - G.hwc(p[0] - 0.05)) / 0.1, sg = Math.sign(p[1]);
    const n = unit([m, -sg]);               // normale intérieure
    tours.push([p, plus(p, n, -1.5)]);
  }
  out.push(...tours.map(t => seg(t, h.a.fin)));
  // Cordon d'orteils : passé autour du fût à chaque bout
  const yc = G.yInt(G.XC);
  const [c0, c1] = [T([G.XC - G.CL, -yc]), T([G.XC + G.CL, yc])];
  out.push(h.rect(c0[0], c0[1], c1[0] - c0[0], c1[1] - c0[1], h.a.blanc), h.rect(c0[0], c0[1], c1[0] - c0[0], c1[1] - c0[1], h.a.detail));
  out.push(seg([[G.XC, -yc], [G.XC, yc]], h.a.fin));
  for (const sg of [-1, 1]) for (const dx of [-0.45, 0, 0.45]) {
    const x = G.XC + dx, y = G.hwc(x);
    out.push(seg([[x, sg * (y - G.HF)], [x, sg * (y + G.HF)]], h.a.fin));
  }
  // Haubans
  for (const s of [-1, 1]) out.push(h.chemin(G.hauban(s).map(T), h.a.arete));
  // Ligature de la queue : les deux bouts superposés
  for (let x = 104.5; x <= 109.1; x += 0.55) out.push(seg([[x, -G.HF], [x, G.HF]], h.a.fin));
  // L'axe, hors de la raquette
  out.push(seg([[-3.6, 0], [-G.HF - 0.3, 0]], mixte), seg([[G.XT + G.HF + 0.3, 0], [G.XT + 3.4, 0]], mixte));
  // Cote : l'écart des traverses
  const yb = G.hwc(48) + G.HF + 2.4;
  out.push(seg([[G.TAV, G.hwc(G.TAV) + G.HF + 0.5], [G.TAV, yb + 0.6]], h.a.fin), seg([[G.TAR, G.hwc(G.TAR) + G.HF + 0.5], [G.TAR, yb + 0.6]], h.a.fin));
  out.push(h.cote(...T([G.TAV, yb]), ...T([G.TAR, yb]), '380 à 410 mm', { cote: 'dessous' }));
  return out.join('\n');
}

// ─── Vue 2 : l'aiguille ─────────────────────────────────────────────────────────────────
function repereD(z) {
  const Lg = Math.min(z.l * 0.8, 230), cx = z.l / 2, cy1 = z.h * 0.4, cy2 = z.h * 0.72;
  return { Lg, cx, cy1, cy2, W0: Math.max(5, Lg * 0.043), oeil: Lg * 0.22 };
}
function vueAiguille(h, z) {
  const A = repereD(z), out = [], k = A.Lg / 208;
  const profil = (cy, w0) => {
    const haut = [], bas = [];
    for (let i = 0; i <= 60; i++) {
      const t = -1 + 2 * i / 60, w = w0 * Math.sqrt(Math.max(0, 1 - Math.abs(t) ** 2.4));
      haut.push([r1(A.cx + t * A.Lg / 2), r1(cy - w)]); bas.push([r1(A.cx + t * A.Lg / 2), r1(cy + w)]);
    }
    return haut.concat(bas.reverse());
  };
  const face = profil(A.cy1, A.W0);
  const ws = 3.6;
  // la babiche : sous l'aiguille, remonte par le chas, repasse dessus et pend
  const e0 = A.cx - A.oeil / 2, e1 = A.cx + A.oeil / 2;
  out.push(bande(h, quad([A.cx + 3, A.cy1 + 1], [A.cx + 16 * k + 4, A.cy1 + 26], [A.cx + A.Lg * 0.36, A.cy1 + 40], 12), ws));
  // l'aiguille
  out.push(h.chemin(face, h.a.blanc, true), h.chemin(face, h.a.arete, true));
  const r = 2.6;
  const chas = `M${r1(e0)},${r1(A.cy1 - r)} L${r1(e1)},${r1(A.cy1 - r)} A${r},${r} 0 0 1 ${r1(e1)},${r1(A.cy1 + r)} L${r1(e0)},${r1(A.cy1 + r)} A${r},${r} 0 0 1 ${r1(e0)},${r1(A.cy1 - r)} Z`;
  out.push(h.path(chas, h.a.blanc), h.path(chas, h.a.detail));
  out.push(bande(h, [[A.cx + 3, A.cy1 - 0.5], [A.cx - 7, A.cy1 + 1], [A.cx - 15, A.cy1 + 10], [A.cx - 20, A.cy1 + 26]], ws));
  // dans un sens comme dans l'autre
  const yf = A.cy1 - 22;
  out.push(h.fleche(`M${r1(A.cx - 8)},${r1(yf)} L${r1(A.cx - A.Lg * 0.44)},${r1(yf)}`), h.fleche(`M${r1(A.cx + 8)},${r1(yf)} L${r1(A.cx + A.Lg * 0.44)},${r1(yf)}`));
  // vue de chant
  const chant = profil(A.cy2, 1.7);
  out.push(h.chemin(chant, h.a.blanc, true), h.chemin(chant, h.a.arete, true));
  return out.join('\n');
}

// ─── La pointe en gros plan (millimètres) ───────────────────────────────────────────────
// Redessin du 14 octobre 2026 (le laçage se lisait mal : un fût réduit à deux traits, des trous
// en « pilules », un œil fait de deux filets). Le fût se voit maintenant en biais, d'en haut et
// du côté du laçage : son dessus en blanc, son chant intérieur en gris d'ombre, ses deux bouts
// cassés. Le laçage s'étend vers le bas, vers l'œil. Une étape par vue, la babiche en ruban au
// trait fort, chaque croisement dessus ou dessous, le bout distinct du brin.
// Projection : X le long du fût, Y vers l'intérieur de la raquette (0 au chant), Z la hauteur ;
// le plan du laçage à mi-hauteur du fût. Le fût a 27 mm de haut sur 11 mm d'épais à la pointe
// (étape 5) : ce sont ses proportions, sans cote.
const WF = 2.2;                                          // babiche fine
const EPF = 11, HTF = 27, ZL = 13.5;                     // épaisseur et hauteur du fût ; plan du laçage
const SA = Math.sin(78 * PI / 180), CA = Math.cos(78 * PI / 180);
const pr = (X, Y, Z = ZL) => [X, Y * SA - (Z - ZL) * CA];
const YD = pr(0, -EPF, HTF)[1], YA = pr(0, 0, HTF)[1], YB = pr(0, 0, 0)[1];   // arrière du dessus ; arête du chant ; pied du chant
function repS(z, W) {
  const K = Math.min((z.l - 4) / (W[1] - W[0]), (z.h - 4) / (W[3] - W[2]));
  const ox = (z.l - K * (W[1] - W[0])) / 2 - K * W[0], oy = (z.h - K * (W[3] - W[2])) / 2 - K * W[2];
  return { K, T: ([x, y]) => [r1(ox + K * x), r1(oy + K * y)], P: p => [ox + K * p[0], oy + K * p[1], p[2]] };
}
const FEN1 = [0, 28, -19, 15], FEN2 = [0, 20, -3.8, 22], FEN3 = [0, 26, -3.8, 26], FEN4 = [2, 30, 3, 39];
// Le fût en biais, de x0 à x1, cassé aux deux bouts : le dessus blanc, le chant gris.
function futObl(h, R, x0, x1, ep = EPF) {
  const YD = pr(0, -ep, HTF)[1];
  const onde = (x, y) => x + 0.7 * Math.sin(2 * PI * (y - YD) / (YB - YD));
  const cote = (x, ya, yb) => Array.from({ length: 7 }, (_, i) => { const y = ya + (yb - ya) * i / 6; return [onde(x, y), y]; });
  const face = (ya, yb) => [...cote(x0, yb, ya), ...cote(x1, ya, yb)].map(R.T);
  const out = [];
  out.push(h.chemin(face(YD, YA), h.a.blanc, true), h.chemin(face(YA, YB), h.a.ombre, true));
  // le fil du bois, sur le dessus
  const L = (H, a, b) => h.path('M' + Array.from({ length: 9 }, (_, i) => { const x = a + (b - a) * i / 8; return R.T([x, YD + (YA - YD) * H + 0.25 * Math.sin(x * 0.5)]).join(' '); }).join(' L'), h.a.fin);
  out.push(L(0.34, x0 + 2.5, x1 - 7), L(0.67, x0 + 7, x1 - 2.5));
  out.push(h.chemin([R.T([onde(x0, YD), YD]), R.T([onde(x1, YD), YD])], h.a.arete));
  out.push(h.chemin([R.T([onde(x0, YA), YA]), R.T([onde(x1, YA), YA])], h.a.detail));
  out.push(h.chemin([R.T([onde(x0, YB), YB]), R.T([onde(x1, YB), YB])], h.a.arete));
  out.push(h.chemin(cote(x0, YD, YB).map(R.T), h.a.detail), h.chemin(cote(x1, YD, YB).map(R.T), h.a.detail));
  return out.join('\n');
}
// Ce qui passe dans le bois : les deux bords du ruban en tireté
function cache(h, R, a, b, w) {
  const u = unit([b[0] - a[0], b[1] - a[1]]), n = [-u[1] * w / 2, u[0] * w / 2];
  return [h.chemin([R.T(plus(a, n)), R.T(plus(b, n))], h.a.cache), h.chemin([R.T(plus(a, n, -1)), R.T(plus(b, n, -1))], h.a.cache)].join('\n');
}
// Un trou : sur le chant (vu presque de chant, écrasé) ou sur le dessus (presque rond)
const trou = (h, R, p, chant) => h.ellipse(...R.T(p), (chant ? 1.5 : 1.35) * R.K, (chant ? 0.62 : 1.3) * R.K, h.a.plein);
// Une paire de trous percés en biais : le brin entre par le chant en F, court dans le bois jusqu'au
// trou P du dessus, passe sur le dessus jusqu'au trou Q, replonge et ressort par le chant en E.
function paire(s) {
  return { s, F: pr(s - 3.5, 0), P: pr(s - 1.8, -7.2, HTF), Q: pr(s + 1.8, -3.4, HTF), E: pr(s + 3.5, 0) };
}
// La boucle de lisière entre la sortie E d'une paire et l'entrée F de la suivante, couchée dans le
// plan du laçage (H : sa profondeur, déjà projetée)
const arche = (E, F, H) => [E, [E[0] - 0.3, H * 0.45], [E[0] + 0.9, H * 0.88], [(E[0] + F[0]) / 2, H], [F[0] - 0.9, H * 0.88], [F[0] + 0.3, H * 0.45], F];
const ruban = (R, pts, o = {}) => ({ pts: pts.map(p => R.P([p[0], p[1], p[2] == null ? 0 : p[2]])), ep: WF * R.K, debut: 'ouvert', fin: 'ouvert', ...o });
// Le dessus d'une paire : le tireté dans le bois, le pont sur le dessus, les deux trous
function dessusPaire(h, R, pr_) {
  const out = [cache(h, R, pr_.F, pr_.P, WF), cache(h, R, pr_.Q, pr_.E, WF)];
  out.push(h.formes.corde([R.P(pr_.P), R.P(pr_.Q)], { ep: WF * R.K, debut: 'ouvert', fin: 'ouvert', trait: 'contour' }));
  out.push(trou(h, R, pr_.P), trou(h, R, pr_.Q));
  return out.join('\n');
}

// 1. La lisière
const LIS = { H: 7.6, paires: [paire(7), paire(21)] };
function vueLisiere(h, z) {
  const R = repS(z, FEN1), F = h.formes, L = LIS, out = [];
  const [p1, p2] = L.paires;
  out.push(futObl(h, R, 0.4, 27.6));
  for (const pq of L.paires) out.push(dessusPaire(h, R, pq));
  out.push(F.cordes([
    ruban(R, arche(p1.E, p2.F, L.H)),
    ruban(R, [[0.9, L.H - 0.2], [p1.F[0] - 1.8, L.H * 0.95], [p1.F[0] - 0.4, L.H * 0.5], p1.F], { debut: 'fixe' }),
    ruban(R, [p2.E, [p2.E[0] + 0.4, L.H * 0.5], [p2.E[0] + 1.8, L.H * 0.95], [27.1, L.H - 0.2]], { fin: 'fixe' }),
  ], { trait: 'contour' }));
  for (const pq of L.paires) out.push(trou(h, R, pq.F, true), trou(h, R, pq.E, true));
  return out.join('\n');
}

// 2. Le départ, au coin : gros plan sur le nœud ; la traverse à droite, entrée dans le chant du fût.
// La boucle du coin va du dernier trou du fût au flanc de la traverse. Le bout du brin est fendu
// en œil. Le bout fait le tour de la boucle (dessus, puis dessous), et le brin revient passer
// dans son œil : par-dessus la lèvre du haut, par la fente, sous la lèvre du bas. On tire le brin
// vers la pointe : l'œil coulisse et serre la boucle.
let DEP = null;
function depart() {
  if (DEP) return DEP;
  const XT = 16.6, ZT = 21;                                  // flanc de la traverse ; son dessus
  const E = pr(2.6, 0), Qd = pr(0.8, -3.4, HTF);             // le dernier trou du fût, sur le chant ; son trou du dessus
  const Tf = pr(XT, 6.1);                                  // la boucle entre dans le flanc de la traverse
  const coin = [E, [2.3, 4.2], [3.6, 8.0], [6.6, 9.6], [10.8, 9.8], [14.4, 8.6], [XT + 0.6, Tf[1] - 0.5]];
  const B = [9.6, 9.75];                                    // où le brin prend la boucle
  const v = [0, 1], u = [1, 0];                            // v : on tire, vers le laçage ; u : en travers, vers la traverse
  const L = (a, b, zz = 0) => [B[0] + a * u[0] + b * v[0], B[1] + a * u[1] + b * v[1], zz];
  const aS = 2.5, aB = -2.5, bE = 6.7;                     // le brin ; le bout ; l'axe de l'œil
  // le tour de la boucle : un demi-cercle dans l'ouverture de la boucle, entre les deux jambes
  const tour = Array.from({ length: 9 }, (_, i) => { const th = PI - PI * i / 8; return L(aS * Math.cos(th), -2.6 - aS * Math.sin(th), 0.4 * Math.cos(th)); });
  const brin = [...tour.slice(4), L(aS, -0.2, -1), L(aS, 2.4, 0), L(aS, bE - 3, 0), L(aS, bE, 0), L(aS, bE + 2.6, 0), L(aS - 0.1, 12.6, 0)];
  const bout = [...tour.slice(0, 5).reverse(), L(aB, -0.2, 1), L(aB, 2.2, 0.5), L(aB, 3.6, 0), L(aB + 0.35, 5.4, 0), L(-1.55, bE - 0.15, 0), L(-0.8, bE, 0)];
  const babiche = [...bout.slice().reverse(), ...brin.slice(1)];
  DEP = { XT, ZT, E, Qd, Tf, coin, B, u, v, L, aS, aB, bE, babiche, surBoucle: L(aB - 1.1, 0.3), dansOeil: L(aS, bE) };
  return DEP;
}
// L'œil : le bout de la babiche fendu, ouvert en lentille, la fente au milieu. Il continue le bout
// (qui finit à son col) le long de u. Rend le blanc de l'œil (la fente en trou) et ses traits.
function oeil(h, R, D) {
  const { L, bE } = D, a0 = -0.8, a1 = 6.0, wM = 2.6;
  const larg = a => { const t = (a - a0) / (a1 - a0); return WF / 2 + (wM - WF / 2) * Math.sin(Math.min(1, t * 1.25) * PI / 2); };
  const haut = [], bas = [];
  for (let i = 0; i <= 14; i++) { const a = a0 + (a1 - 1.2 - a0) * i / 14; haut.push(L(a, bE - larg(a))); bas.push(L(a, bE + larg(a))); }
  const bec = [];
  for (let i = 1; i < 12; i++) { const th = -PI / 2 + PI * i / 12; bec.push(L(a1 - 1.2 + 1.2 * Math.cos(th) * 1.05, bE + wM * Math.sin(th))); }
  const tour = [...haut, ...bec, ...bas.slice().reverse()].map(R.T);
  const fente = [];
  for (let i = 0; i <= 20; i++) { const th = 2 * PI * i / 20; fente.push(R.T(L(D.aS + 1.75 * Math.cos(th), bE + 0.95 * Math.sin(th)))); }
  const ser = q => q.map((p, i) => `${i ? 'L' : 'M'}${p[0]} ${p[1]}`).join(' ');
  return {
    blanc: h.path(`${ser(tour)} Z ${ser(fente)} Z`, h.a.blanc + ' fill-rule="evenodd"'),
    trait: h.path(ser(tour), h.a.contour),
    fente: h.path(`${ser(fente)} Z`, h.a.arete),
    basFente: h.path(ser(fente.slice(0, 11)), h.a.arete),
  };
}
function vueDepart(h, z) {
  const R = repS(z, FEN2), F = h.formes, D = depart(), out = [];
  // le fût, cassé à gauche, coupé par le bord de la vue ailleurs
  out.push(futObl(h, R, 0.4, 24));
  // le dernier trou du fût : la babiche y entre et remonte dans le bois
  out.push(cache(h, R, D.Qd, D.E, WF));
  // la boucle du coin, et la babiche : le bout qui en fait le tour, le brin qui revient
  out.push(F.cordes([
    ruban(R, D.coin),
    ruban(R, D.babiche, { fin: 'fixe', fleche: { de: 0.86, a: 0.98, cote: 'gauche' } }),
  ], { trait: 'contour' }));
  out.push(trou(h, R, D.E, true));
  // la traverse, devant le chant : son dessus, cassé en bas ; la boucle entre dans son flanc
  const yT0 = pr(0, 0, D.ZT)[1], yT1 = 11.4;
  const trav = [[D.XT, yT0], [24, yT0], [24, yT1], ...Array.from({ length: 9 }, (_, i) => { const x = 24 - (24 - D.XT) * i / 8; return [x, yT1 + 0.55 * Math.sin(2 * PI * i / 8)]; })];
  out.push(h.chemin(trav.map(R.T), h.a.blanc, true));
  out.push(h.chemin([[D.XT, yT1], [D.XT, yT0], [24, yT0]].map(R.T), h.a.arete));
  out.push(h.chemin(trav.slice(3).map(R.T), h.a.detail));
  for (const x of [18.2, 20.4]) out.push(h.path('M' + Array.from({ length: 7 }, (_, i) => { const y = yT0 + 1.6 + (yT1 - yT0 - 3.4) * i / 6; return R.T([x + 0.2 * Math.sin(y * 0.7), y]).join(' '); }).join(' L'), h.a.fin));
  // l'œil, par-dessus le brin ; puis le brin qui passe sur la lèvre du haut et plonge dans la fente
  const O = oeil(h, R, D);
  out.push(O.blanc, O.trait, O.fente);
  out.push(F.corde([R.P(D.L(D.aS, D.bE - 3.8)), R.P(D.L(D.aS, D.bE - 1.4)), R.P(D.L(D.aS, D.bE))], { ep: WF * R.K, debut: 'ouvert', fin: 'ouvert', trait: 'contour' }));
  out.push(O.basFente);
  // le gros plan est découpé par le bord de sa vue
  return `<clipPath id="vue-89-03-s2"><rect x="0" y="0" width="${z.l}" height="${z.h}"/></clipPath>\n<g clip-path="url(#vue-89-03-s2)">\n${out.join('\n')}\n</g>`;
}

// 3. La boucle suivante, prise d'un tour tordu : le brin fait le tour de la boucle de lisière,
// puis ses deux brins se tordent l'un sur l'autre d'un tour complet (deux croisements).
let BCL = null;
function boucle() {
  if (BCL) return BCL;
  const paires = [paire(3.0), paire(23.0)];
  const E = paires[0].E, Fn = paires[1].F, xm = (E[0] + Fn[0]) / 2;
  const B = [xm, 8.8];                                  // la boucle, tirée en pointe par le brin
  const lis = [E, [E[0] + 0.2, 3.0], [xm - 2.8, 7.5], B, [xm + 2.8, 7.5], [Fn[0] - 0.2, 3.0], Fn];
  const a = 1.85, y1 = B[1] + 3.0, y2 = y1 + 6.4;      // la torsade, de y1 (près) à y2 (loin)
  const jambe = sg => {                                 // sg = +1 : la jambe de gauche
    const q = [];
    for (let i = 0; i <= 8; i++) {
      const y = y2 + (y1 - y2) * i / 8, ph = 2 * PI * (y - y2) / (y1 - y2);
      q.push([xm - sg * a * Math.cos(ph), y, sg * Math.sin(ph)]);
    }
    return q;
  };
  // l'arrivée, à gauche : du bas à gauche à la boucle, par la torsade, par-dessus la boucle
  const arrivee = [[0.7, 24.6, 0], [4.0, 23.2, 0], [xm - a - 0.4, y2 + 1.6, 0], ...jambe(1), [xm - a, B[1] + 1.3, 0.6], [xm - a - 0.2, B[1] - 0.6, 1], [xm - a, B[1] - 2.6, 0.3], [xm - 0.8, B[1] - 3.8, 0], [xm, B[1] - 3.8, 0]];
  // le départ, à droite : sous la boucle, la torsade, puis vers le bas à droite
  const depart_ = [[xm, B[1] - 3.8, 0], [xm + 0.8, B[1] - 3.8, 0], [xm + a, B[1] - 2.6, -0.3], [xm + a + 0.2, B[1] - 0.6, -1], [xm + a, B[1] + 1.3, -0.6], ...jambe(-1).reverse(), [xm + a + 0.4, y2 + 1.6, 0], [22.0, 23.2, 0], [25.3, 24.6, 0]];
  BCL = { paires, lis, arrivee, depart: depart_, B, tors: [xm, (y1 + y2) / 2] };
  return BCL;
}
function vueBoucle(h, z) {
  const R = repS(z, FEN3), F = h.formes, B = boucle(), out = [];
  out.push(futObl(h, R, -4, 30));
  out.push(cache(h, R, B.paires[0].Q, B.paires[0].E, WF), cache(h, R, B.paires[1].F, B.paires[1].P, WF));
  out.push(F.cordes([
    ruban(R, B.lis),
    ruban(R, B.arrivee, { debut: 'fixe' }),
    ruban(R, B.depart, { fin: 'fixe', fleche: { de: 0.84, a: 0.99, cote: 'droite' } }),
  ], { trait: 'contour' }));
  out.push(trou(h, R, B.paires[0].E, true), trou(h, R, B.paires[1].F, true));
  return `<clipPath id="vue-89-03-s3"><rect x="0" y="0" width="${z.l}" height="${z.h}"/></clipPath>\n<g clip-path="url(#vue-89-03-s3)">\n${out.join('\n')}\n</g>`;
}

// Un tour complet autour d'une passe, en repère de la passe : s le long de la passe, t en travers,
// z la hauteur. Le brin passe dessus (φ = 0), dessous (π), dessus (2π) ; il entre et sort en biais,
// pas à angle droit, pour que le ruban ne se casse pas.
function helice(p, Rr) {
  const q = [];
  for (let i = 0; i <= 28; i++) {
    const ph = -0.35 * PI + 2.7 * PI * i / 28;
    q.push([p * ph / (2 * PI) - p / 2, Rr * Math.sin(ph), Math.cos(ph)]);
  }
  return q;
}

// 4. Le brin tordu autour d'une passe déjà posée : dessus, dessous, dessus
let PAS = null;
function passe() {
  if (PAS) return PAS;
  const X = [16, 21];
  const u = [1, 0], v = [0, -1];                        // u : la passe, couchée en travers ; v : vers le haut
  const Rr = 4.4, p = 12;                               // rayon apparent du tour ; pas du tour
  const G = (s, t, zz) => [X[0] + s * u[0] + t * v[0], X[1] + s * u[1] + t * v[1], zz];
  const h0 = helice(p, Rr), s0 = h0[0], s1 = h0[h0.length - 1];
  const tour = [G(s0[0] - 1.6, -16, 0), G(s0[0] - 1.6, -10, 0), G(s0[0] - 1.4, -Rr - 2.6, 0), ...h0.map(q => G(...q)), G(s1[0] + 1.4, Rr + 2.6, 0), G(s1[0] + 1.6, 10, 0), G(s1[0] + 1.6, 16, 0)];
  PAS = { X, u, v, tour, dessous: G(0, 0) };
  return PAS;
}
function vuePasse(h, z) {
  const R = repS(z, FEN4), F = h.formes, P = passe(), out = [];
  const [x0, x1, y0, y1] = [FEN4[0] + 0.3, FEN4[1] - 0.3, FEN4[2] + 0.3, FEN4[3] - 0.3];
  const vieille = [sortie(P.X, [-P.u[0], -P.u[1]], x0, x1, y0, y1), sortie(P.X, P.u, x0, x1, y0, y1)];
  out.push(F.cordes([
    ruban(R, vieille.map(p => [...p, 0]), { debut: 'fixe', fin: 'fixe' }),
    ruban(R, P.tour, { debut: 'fixe', fin: 'fixe', fleche: { de: 0.82, a: 0.96, cote: 'gauche' } }),
  ], { trait: 'contour' }));
  return out.join('\n');
}

// ─── Vue : le trou des orteils ──────────────────────────────────────────────────────────
function repereB(z) {
  const G = geo(), X0 = 27.0, X1 = 37.2, Ya = G.Y0 - 7.0, Yb = G.Y0 + 7.0;
  const K = Math.min((z.l - 58) / (X1 - X0), (z.h - 6) / (Yb - Ya));
  const ox = (z.l - K * (X1 - X0)) / 2 - K * X0, oy = (z.h - K * (Yb - Ya)) / 2 - K * Ya;
  return { K, X0, X1, Ya, Yb, T: ([x, y]) => [r1(ox + K * x), r1(oy + K * y)] };
}
function vueOrteils(h, z) {
  const G = geo(), R = repereB(z), { T, K } = R;
  const out = [], px = pts => pts.map(T);
  const cadre = [[G.TAV + G.TL, R.Ya], [R.X1, R.Ya], [R.X1, R.Yb], [G.TAV + G.TL, R.Yb]];
  const maille = treillis([cadre, G.trou], 2, [0, 0, 0.5], [G.TAV + G.TL, G.Y0]);
  out.push(...maille.map(s => h.chemin(px(s), h.a.detail)));
  // traverse avant, et les brins du centre qui l'entourent
  const [a, b] = [T([G.TAV - G.TL, R.Ya]), T([G.TAV + G.TL, R.Yb])];
  out.push(h.rect(a[0], a[1], b[0] - a[0], b[1] - a[1], h.a.blanc), h.rect(a[0], a[1], b[0] - a[0], b[1] - a[1], h.a.arete));
  for (const s of maille) for (const p of s) if (Math.abs(p[0] - (G.TAV + G.TL)) < 0.03 && Math.abs(p[1] - G.Y0) > 4.4)
    out.push(bande(h, px([[G.TAV + G.TL + 0.05, p[1]], [G.TAV - G.TL - 0.05, p[1] - 0.25]]), 0.2 * K));
  // cordon d'orteils : cinq brins côte à côte
  for (let i = 0; i < 5; i++) {
    const x = G.XC - G.CL + 0.12 + i * 0.24;
    out.push(bande(h, px([[x, R.Ya], [x, R.Yb]]), 0.24 * K));
  }
  // haubans : trois brins, enroulés sur le cordon (par-dessus), puis trois tours sur la traverse
  for (const s of [-1, 1]) {
    const hb = G.hauban(s).slice(0, -1);                 // s'arrête contre la traverse
    for (const d of [-0.2, 0, 0.2]) out.push(bande(h, px(decale(hb, d)), 0.19 * K));
    // les tours sur la traverse : chaque brin passe par-dessus, en biais, et replonge dessous
    for (const d of [-1, 0, 1]) {
      const y = G.Y0 + s * (3.2 + d * 0.34);
      out.push(bande(h, px([[G.TAV + G.TL + 0.12, y + s * 0.02], [G.TAV - G.TL - 0.04, y - 0.3 * s]]), 0.21 * K));
    }
  }
  // le bord du trou, tordu autour des haubans
  for (const bord of [G.bordHaut, G.bordBas]) {
    out.push(bande(h, px(bord), 0.18 * K));
    const A = abscisse(bord);
    for (let s = 0.35; s < A.L - 0.2; s += 0.75) {
      const p = A.at(s), sg = bord === G.bordHaut ? 1 : -1;
      out.push(bande(h, px([plus(p.p, p.n, 0.1 * sg), plus(plus(p.p, p.t, 0.3), p.n, -1.05 * sg)]), 0.16 * K));
    }
  }
  // cote : la largeur du trou au cordon, entre les bords intérieurs des deux haubans
  const xq = G.XC - G.CL - 1.6;
  const yBord = bord => { const A = bord.filter(p => Math.abs(p[0] - xq) < 0.6).sort((p, q) => Math.abs(p[0] - xq) - Math.abs(q[0] - xq))[0]; return A[1]; };
  const yh = yBord(G.bordHaut) + 0.09, yb = yBord(G.bordBas) - 0.09;
  const [c1, c2] = [T([xq, yh]), T([xq, yb])], ym = (c1[1] + c2[1]) / 2;
  out.push(h.ligne(c1[0], c1[1], c1[0], ym - 11, h.a.detail), h.ligne(c1[0], ym + 11, c1[0], c2[1], h.a.detail));
  out.push(h.ligne(c1[0] - 6, c1[1], c1[0] + 6, c1[1], h.a.detail), h.ligne(c1[0] - 6, c2[1], c1[0] + 6, c2[1], h.a.detail));
  out.push(h.texte(c1[0], ym + 4, '100 mm', { lisere: true }));
  return out.join('\n');
}

// ─── Vue : le centre, autour du fût (millimètres, le fût en biais comme à la pointe) ─────
// Redessin du 14 octobre 2026 : le fût en biais (dessus blanc, chant gris) au lieu d'un
// rectangle ; chaque tour passe par-dessus le fût et disparaît derrière, et ressort de sous le
// chant. Un nœud de cabestan lâche : le brin monte du laçage, passe par-dessus le fût, en fait le
// tour, ressort dessous, croise par-dessus lui-même, fait un second tour, ressort dessous et passe
// sous le croisement, vers le laçage. À 20 mm, le nœud voisin, serré : ses deux tours sur le
// dessus, ses deux brins dessous. Le fût du centre est un peu plus épais qu'à la pointe.
const WC = 3.2, EPC = 12.5;                              // babiche forte ; épaisseur du fût au centre
const FENC = [-24, 43, -16.5, 25.5];
function repereC(z) { return repS(z, FENC); }
let CAB = null;
function cabestan() {
  if (CAB) return CAB;
  const yD = pr(0, -EPC, HTF)[1], yM = (YA + yD) / 2;
  const xS = 2, xV = 22, yb = 21.5;                      // le brin qui monte ; le brin droit du voisin ; bas des brins
  const monte = [[xS, yb, 0], [xS, 12, 0], [xS, 3, 0], [xS + 0.1, 0, 0], [xS + 0.2, YA, 0], [xS + 1.3, yM, 0], [xS + 2.4, yD, 0]];
  const tour1 = [[6.8, YB, 0], [7.1, 4.2, 0.3], [5.6, 6.9, 1], [xS, 7.8, 1], [-2.6, 7.1, 1], [-6.2, 4.6, 0.4], [-7.6, 1.5, 0], [-7.6, YA, 0], [-6.4, yM, 0], [-5.2, yD, 0]];
  const sortie = [[-2.8, YB, 0], [-2.8, 4.4, -0.5], [-3.1, 7.2, -1], [-4.3, 10.4, 0], [-6.6, 15.6, 0], [-9.4, yb + 0.6, 0]];
  const voisin = [[xV, yb, 0], [xV, 3, 0], [xV + 0.1, 0, 0], [xV + 0.2, YA, 0], [xV + 1.3, yM, 0], [xV + 2.4, yD, 0]];
  const voisin2 = [[30.6, yb - 2, 0], [27.4, 8, 0], [25.9, 3, 0], [25.7, 0, 0], [25.8, YA, 0], [26.9, yM, 0], [28.0, yD, 0]];
  CAB = { yD, xS, xV, yb, monte, tour1, sortie, voisin, voisin2, croisement: [xS + 0.4, 7.8], sous: [[6.8, YB], [-2.8, YB]],
    caches: [[[xS + 2.4, yD], [6.8, YB]], [[-5.2, yD], [-2.8, YB]]] };
  return CAB;
}
function vueCentre(h, z) {
  const R = repereC(z), F = h.formes, C = cabestan(), out = [];
  const w = WC * R.K;
  out.push(futObl(h, R, -23.6, 42.6, EPC));
  // ce qui passe derrière et dessous le fût, en tireté : chaque tour, du bord arrière du dessus au pied du chant
  for (const [a, b_] of C.caches) out.push(cache(h, R, a, b_, WC));
  const b = (pts, o = {}) => ({ pts: pts.map(p => R.P(p)), ep: w, debut: 'ouvert', fin: 'ouvert', ...o });
  out.push(F.cordes([
    b(C.monte, { debut: 'fixe' }),
    b(C.tour1),
    b(C.sortie, { fin: 'fixe', fleche: { de: 0.55, a: 0.85, cote: 'gauche' } }),
    b(C.voisin, { debut: 'fixe' }),
    b(C.voisin2, { debut: 'fixe' }),
  ], { trait: 'contour' }));
  // là où la babiche ressort de sous le fût, l'arête du pied du chant passe devant elle
  for (const [x, y] of C.sous) out.push(h.ligne(...R.T([x - WC / 2 - 0.4, y]), ...R.T([x + WC / 2 + 0.4, y]), h.a.arete));
  // cote : 20 mm entre les axes de deux brins parallèles
  out.push(h.ligne(...R.T([C.xS, C.yb + 0.8]), ...R.T([C.xS, C.yb + 3.6]), h.a.fin), h.ligne(...R.T([C.xV, C.yb + 0.8]), ...R.T([C.xV, C.yb + 3.6]), h.a.fin));
  out.push(h.cote(...R.T([C.xS, C.yb + 3.0]), ...R.T([C.xV, C.yb + 3.0]), '20 mm'));
  return out.join('\n');
}
