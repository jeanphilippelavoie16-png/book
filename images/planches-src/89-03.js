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
        const R = repS(z), L = LIS;
        const p2 = L.paires[1], p1 = L.paires[0], xm = (p1.E[0] + p2.F[0]) / 2;
        return [
          { n: 7, rond: [z.l - 13, R.T([0, 36.5])[1]], cible: R.T(p2.P), texte: 'trous en biais, par paires' },
          { n: 8, rond: [13, R.T([0, 36.5])[1]], cible: R.T(mil(p1.Q, p1.E)), texte: 'court dans le bois, à l’abri' },
          { n: 9, rond: [R.T([xm, 0])[0], 12], cible: R.T([xm, L.Yi - L.H]), texte: 'lisière : petites boucles' },
        ];
      },
    },
    s2: {
      titre: '2. Le départ, au coin',
      dessin: z => vueDepart(h, z),
      renvois: z => {
        const R = repS(z), D = depart();
        return [
          { n: 10, rond: R.T([21.8, 24.2]), cible: R.T(D.virage), texte: 'le bout passe dans la boucle' },
          { n: 11, rond: R.T([4.6, 17.6]), cible: R.T(D.dansOeil), texte: 'le brin passe dans son œil' },
        ];
      },
    },
    s3: {
      titre: '3. La boucle suivante',
      dessin: z => vueBoucle(h, z),
      renvois: z => {
        const R = repS(z), B = boucle();
        return [
          { n: 12, rond: [z.l - 13, R.T([0, B.tors2[1] + 2])[1]], cible: R.T(B.tors2), texte: 'boucle prise d’un tour tordu' },
        ];
      },
    },
    s4: {
      titre: '4. Autour d’une passe',
      dessin: z => vuePasse(h, z),
      renvois: z => {
        const R = repS(z), P = passe();
        return [
          { n: 13, rond: [13, R.T([0, 34])[1]], cible: R.T(P.dessous), texte: 'tordu autour de la passe' },
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
          { n: 17, rond: R.T([-26, 8.5]), cible: R.T(C.croisement), texte: 'nœud de cabestan sur le fût' },
          { n: 18, rond: R.T([35.5, 6]), cible: R.T([27.4, -5.5]), texte: 'fût sans trou au centre' },
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
// Les quatre vues ont la même échelle, une fenêtre de LARG × HAUT mm. Repère : x vers la droite,
// y vers le bas ; le fût court en bas de la vue, son chant intérieur en y = Yi, sa face extérieure
// en Yi + 12 (on le voit de dessus, sur son épaisseur).
const WF = 2.2;            // babiche fine
const LARG = 32, HAUT = 41;
function repS(z) {
  const K = Math.min((z.l - 4) / LARG, (z.h - 4) / HAUT);
  const ox = (z.l - K * LARG) / 2, oy = (z.h - K * HAUT) / 2;
  return { K, T: ([x, y]) => [r1(ox + K * x), r1(oy + K * y)], P: p => [ox + K * p[0], oy + K * p[1], p[2]] };
}
// Une paire de trous percés en biais : le brin entre par le chant intérieur en F, court dans le
// bois jusqu'au trou P sur le dessus, passe sur le dessus jusqu'au trou Q, replonge et ressort
// par le chant en E.
function paire(s, Yi) {
  return { s, F: [s - 4.4, Yi], P: [s - 1.8, Yi + 7.2], Q: [s + 1.8, Yi + 3.4], E: [s + 4.4, Yi] };
}
// La boucle de lisière entre la sortie E d'une paire et l'entrée F de la suivante
const arche = (E, F, H) => [E, [E[0] - 0.3, E[1] - H * 0.45], [E[0] + 0.9, E[1] - H * 0.88], mil(E, F).map((v, i) => i ? v - H : v), [F[0] - 0.9, F[1] - H * 0.88], [F[0] + 0.3, F[1] - H * 0.45], F];
function futGros(h, R, x0, x1, Yi, bouts = false) {
  const [a, b] = [R.T([x0, Yi]), R.T([x1, Yi + 12])];
  const out = [h.rect(a[0], a[1], b[0] - a[0], b[1] - a[1], h.a.blanc), h.ligne(a[0], a[1], b[0], a[1], h.a.arete), h.ligne(a[0], b[1], b[0], b[1], h.a.contour)];
  if (bouts) out.push(h.ligne(a[0], a[1], a[0], b[1], h.a.detail), h.ligne(b[0], a[1], b[0], b[1], h.a.detail));
  return out.join('\n');
}
// Ce qui passe dans le bois : les deux bords du ruban en tireté
function cache(h, R, a, b, w) {
  const u = unit([b[0] - a[0], b[1] - a[1]]), n = [-u[1] * w / 2, u[0] * w / 2];
  return [h.chemin([R.T(plus(a, n)), R.T(plus(b, n))], h.a.cache), h.chemin([R.T(plus(a, n, -1)), R.T(plus(b, n, -1))], h.a.cache)].join('\n');
}
// Le dessus du fût d'une paire : les deux trous, le brin entre les deux, le tireté dans le bois
function dessusPaire(h, R, pr) {
  const F = h.formes, out = [], rt = 1.45 * R.K;
  out.push(cache(h, R, pr.F, pr.P, WF), cache(h, R, pr.Q, pr.E, WF));
  out.push(h.cercle(...R.T(pr.P), rt, h.a.plein), h.cercle(...R.T(pr.Q), rt, h.a.plein));
  out.push(F.corde([R.P(pr.P), R.P(pr.Q)], { ep: WF * R.K, debut: 'ouvert', fin: 'ouvert' }));
  return out.join('\n');
}
const ruban = (R, pts, o = {}) => ({ pts: pts.map(R.P), ep: WF * R.K, debut: 'ouvert', fin: 'ouvert', ...o });

// 1. La lisière
const LIS = (() => {
  const Yi = 19, H = 8;
  return { Yi, H, paires: [paire(7, Yi), paire(24.6, Yi)] };
})();
function vueLisiere(h, z) {
  const R = repS(z), F = h.formes, L = LIS, out = [];
  const [p1, p2] = L.paires;
  out.push(F.cordes([
    ruban(R, arche(p1.E, p2.F, L.H)),
    ruban(R, [[0.3, L.Yi - L.H + 0.3], [p1.F[0] - 1.6, L.Yi - L.H * 0.95], [p1.F[0] - 0.4, L.Yi - L.H * 0.6], p1.F]),
    ruban(R, [p2.E, [p2.E[0] + 0.4, L.Yi - L.H * 0.6], [p2.E[0] + 1.6, L.Yi - L.H * 0.95], [LARG - 0.3, L.Yi - L.H + 0.3]]),
  ]));
  out.push(futGros(h, R, 0, LARG, L.Yi));
  for (const pr of L.paires) out.push(dessusPaire(h, R, pr));
  return out.join('\n');
}

// 2. Le départ, au coin : la traverse à droite, le fût en bas.
// Repère local du nœud : v vers le coin, u en travers ; on tire le dormant vers -v, vers la pointe.
// L'œil est une fente au bout du brin : ouverte, ses deux bords s'écartent en anneau. Le bout du
// brin fait le tour de la boucle du coin, puis le dormant passe par-dessus le premier bord de
// l'œil et ressort sous le second : on tire, l'œil coulisse et serre la boucle.
let DEP = null;
function depart() {
  if (DEP) return DEP;
  const Yi = 28.5, XT = 25.5;                          // chant du fût ; face de la traverse
  const pr = paire(10.2, Yi);                           // dernière paire du fût avant le coin
  const Ecoin = pr.E, Tcoin = [XT, 6.5];                // la boucle du coin : du fût à la traverse
  const B0 = [12.6, 14.2];                              // le fond de la boucle, tiré vers la pointe
  const C = [2 * B0[0] - (Ecoin[0] + Tcoin[0]) / 2, 2 * B0[1] - (Ecoin[1] + Tcoin[1]) / 2];
  const coin = quad(Ecoin, C, Tcoin, 14);
  const v = unit([0.6, 0.8]), u = [v[1], -v[0]];
  const L = (a, b, zz) => [B0[0] + a * u[0] + b * v[0], B0[1] + a * u[1] + b * v[1], zz];
  // l'œil, en repère local : centre Ce sur le dormant, grand axe e en travers du dormant, bords à ±Wy
  const uD = -3, Ce = [uD, -8], e = [-1, 0], n = [0, -1];
  const Le = 4.4, Wy = 1.75, wr = 1.0;                 // longueur de l'œil ; demi-ouverture ; largeur d'un bord
  const col = [Ce[0] - e[0] * Le / 2, Ce[1] - e[1] * Le / 2], pointe = [Ce[0] + e[0] * Le / 2, Ce[1] + e[1] * Le / 2];
  const bord = sg => {
    const q = [];
    for (let i = 0; i <= 10; i++) {
      const t = i / 10, b = sg * (0.45 + (Wy - 0.45) * Math.sin(PI * t) ** 0.7);
      q.push(L(col[0] + (pointe[0] - col[0]) * t + n[0] * b, col[1] + (pointe[1] - col[1]) * t + n[1] * b, 0));
    }
    return q;
  };
  // le brin : du dormant, loin vers la pointe, par-dessus le premier bord de l'œil, sous le second,
  // par-dessus la boucle du coin, le tour, dessous, et jusqu'au col de l'œil
  const dormant = [L(uD, -16, 0), L(uD, -12, 0.3), L(uD, -9.75, 1), L(uD, -8, 0), L(uD, -6.25, -1), L(uD, -4.2, 0), L(uD, -2, 0.8), L(uD, 0.6, 1),
    L(-2.8, 3.2, 0.3), L(-0.55, 5.6, 0), L(1.7, 3.2, -0.3), L(1.9, 0.4, -1), L(1.9, -2.5, 0), L(1.9, -5.3, 0), L(1.54, -6.65, 0), L(0.55, -7.64, 0), L(col[0], col[1], 0), L(col[0] - 0.7, col[1], 0)];
  const bout = [L(pointe[0] + 0.4, pointe[1], 0), L(pointe[0] - 0.4, pointe[1], 0), L(pointe[0] - 2.4, pointe[1], 0)];
  DEP = { Yi, XT, pr, coin, Tcoin, B0, u, v, L, uD, dormant, bout, bords: [bord(1), bord(-1)], wr,
    virage: L(-0.55, 5.6 + WF / 2), dansOeil: L(uD, Ce[1]) };
  return DEP;
}
function vueDepart(h, z) {
  const R = repS(z), F = h.formes, D = depart(), out = [];
  const Yi = D.Yi, XT = D.XT;
  out.push(F.cordes([
    ruban(R, D.coin.filter((p, i) => i % 2 === 0 || i === D.coin.length - 1)),
    ruban(R, [[0.3, Yi - 6.8], [D.pr.F[0] - 1.6, Yi - 7.6], [D.pr.F[0] - 0.4, Yi - 4.8], D.pr.F]),
    ruban(R, D.bords[0], { ep: D.wr * R.K }),
    ruban(R, D.bords[1], { ep: D.wr * R.K }),
    ruban(R, D.dormant, { debut: 'fixe' }),
    ruban(R, D.bout, { fin: 'coupe' }),
  ]));
  // le fût et la traverse, par-dessus les bouts de lisière qui y entrent
  out.push(futGros(h, R, 0, LARG, Yi));
  const [a, b] = [R.T([XT, 0]), R.T([LARG, Yi])];
  out.push(h.rect(a[0], a[1], b[0] - a[0], b[1] - a[1] + 0.5, h.a.blanc));
  out.push(h.ligne(a[0], a[1], a[0], b[1], h.a.arete));
  out.push(dessusPaire(h, R, D.pr));
  // la lisière entre dans la traverse et monte dans le bois jusqu'au trou du dessus
  out.push(cache(h, R, D.Tcoin, [XT + 3.2, 3.4], WF));
  out.push(h.cercle(...R.T([XT + 3.5, 2.9]), 1.45 * R.K, h.a.plein));
  // on tire sur le dormant, vers la pointe
  out.push(h.fleche(`M${R.T(D.L(D.uD + 2.9, -11.8)).join(' ')} L${R.T(D.L(D.uD + 2.9, -16)).join(' ')}`));
  return out.join('\n');
}

// 3. La boucle suivante, prise d'un tour tordu : le brin fait le tour de la boucle de lisière,
// puis ses deux brins se tordent l'un sur l'autre d'un tour complet (deux croisements).
let BCL = null;
function boucle() {
  if (BCL) return BCL;
  const Yi = 28.5;
  const paires = [paire(5.6, Yi), paire(26.4, Yi)];
  const E = paires[0].E, Fn = paires[1].F, xm = (E[0] + Fn[0]) / 2;
  const B = [xm, Yi - 9];                               // la boucle, tirée en pointe par le brin
  const lis = [E, [E[0] + 0.3, Yi - 2.5], [xm - 2.6, Yi - 7.4], B, [xm + 2.6, Yi - 7.4], [Fn[0] - 0.3, Yi - 2.5], Fn];
  const a = 1.75, y1 = B[1] - 2.9, y2 = y1 - 6.4;      // la torsade, de y1 à y2
  const jambe = sg => {                                 // sg = +1 : jambe qui descend à gauche
    const q = [];
    for (let i = 0; i <= 8; i++) {
      const y = y2 + (y1 - y2) * i / 8, ph = 2 * PI * (y - y2) / (y1 - y2);
      q.push([xm - sg * a * Math.cos(ph), y, sg * Math.sin(ph)]);
    }
    return q;
  };
  // descente, à gauche : de la pointe (en haut à gauche) à la boucle, par-dessus
  const descente = [[0.4, 0.6, 0], [5, 3.8, 0], [xm - a - 0.5, y2 - 2.6, 0], ...jambe(1), [xm - a, B[1] - 1.3, 0.6], [xm - a - 0.25, B[1] + 0.6, 1], [xm - a, B[1] + 2.7, 0.3], [xm - 0.8, B[1] + 3.9, 0], [xm, B[1] + 3.9, 0]];
  // remontée, à droite : sous la boucle, puis la torsade, puis vers le haut à droite
  const remontee = [[xm, B[1] + 3.9, 0], [xm + 0.8, B[1] + 3.9, 0], [xm + a, B[1] + 2.7, -0.3], [xm + a + 0.25, B[1] + 0.6, -1], [xm + a, B[1] - 1.3, -0.6], ...jambe(-1).reverse(), [xm + a + 0.5, y2 - 2.6, 0], [27, 3.8, 0], [31.6, 0.6, 0]];
  BCL = { Yi, paires, lis, descente, remontee, B, tors: [xm, y2 + (y1 - y2) * 0.25], tors2: [xm, y2 + (y1 - y2) * 0.75] };
  return BCL;
}
function vueBoucle(h, z) {
  const R = repS(z), F = h.formes, B = boucle(), out = [];
  out.push(F.cordes([
    ruban(R, B.lis),
    ruban(R, B.descente, { debut: 'fixe' }),
    ruban(R, B.remontee, { fin: 'fixe', fleche: { de: 0.9, a: 0.99, cote: 'droite' } }),
  ]));
  out.push(futGros(h, R, 0, LARG, B.Yi));
  for (const pr of B.paires) out.push(dessusPaire(h, R, pr));
  return out.join('\n');
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
  const X = [16, 21.5];
  const ang = -26 * PI / 180, u = [Math.cos(ang), Math.sin(ang)], v = [u[1], -u[0]];   // u : la passe ; v : vers le haut à gauche
  const Rr = 3.8, p = 14;                               // rayon apparent du tour ; pas du tour
  const G = (s, t, zz) => [X[0] + s * u[0] + t * v[0], X[1] + s * u[1] + t * v[1], zz];
  const h0 = helice(p, Rr), s0 = h0[0], s1 = h0[h0.length - 1];
  const tour = [G(s0[0] - 1.2, -24, 0), G(s0[0] - 2.2, -Rr - 5.5, 0), ...h0.map(q => G(...q)), G(s1[0] + 2.2, Rr + 5.5, 0), G(s1[0] + 1.2, 24, 0)];
  PAS = { X, u, v, tour, dessous: G(0, 0) };
  return PAS;
}
function vuePasse(h, z) {
  const R = repS(z), F = h.formes, P = passe(), out = [];
  const dans = pts => pts.map(p => [Math.max(0.3, Math.min(LARG - 0.3, p[0])), Math.max(0.3, Math.min(HAUT - 0.3, p[1])), p[2]]);
  const vieille = [sortie(P.X, [-P.u[0], -P.u[1]], 0.3, LARG - 0.3, 0.3, HAUT - 0.3), sortie(P.X, P.u, 0.3, LARG - 0.3, 0.3, HAUT - 0.3)];
  out.push(F.cordes([
    ruban(R, vieille.map(p => [...p, 0]), { debut: 'fixe', fin: 'fixe' }),
    ruban(R, dans(P.tour), { debut: 'fixe', fin: 'fixe', fleche: { de: 0.87, a: 0.98, cote: 'gauche' } }),
  ]));
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

// ─── Vue : le centre, autour du fût (millimètres, vue de dessus) ────────────────────────
// x le long du fût, y vers l'intérieur de la raquette. Le dessus du fût va de y = -12 (face
// extérieure) à y = 0 (chant intérieur). On voit un nœud de cabestan en train de se faire (lâche)
// et, à 20 mm, le nœud voisin déjà serré : ses deux tours sur le dessus, ses deux brins dessous.
const WC = 3.2;                                          // babiche forte, étirée
function repereC(z) {
  const X0 = -30, X1 = 40, Ya = -14.5, Yb = 41.5;
  const K = Math.min((z.l - 8) / (X1 - X0), (z.h - 4) / (Yb - Ya));
  const ox = (z.l - K * (X1 - X0)) / 2 - K * X0, oy = (z.h - K * (Yb - Ya)) / 2 - K * Ya;
  return { K, X0, X1, Ya, Yb, T: ([x, y]) => [r1(ox + K * x), r1(oy + K * y)], P: p => [ox + K * p[0], oy + K * p[1], p[2]] };
}
let CAB = null;
function cabestan() {
  if (CAB) return CAB;
  const dg = unit([-0.62, 0.785]);                      // les brins en biais, vers le bas à gauche
  const xS = 2, xV = 22, yb = 33;                       // le brin qui monte ; le brin droit du voisin
  // la passe en biais du nœud voisin : le brin l'a croisée en montant et en a fait le tour
  const D2a = [xV - 4.2, 0];
  const X2 = plus(D2a, dg, (xS - D2a[0]) / dg[0]);
  const uP = [-dg[0], -dg[1]], vS = [-dg[1], dg[0]][1] < 0 ? [-dg[1], dg[0]] : [dg[1], -dg[0]];
  // le tour serré : dessus (A1-B1), dessous (en tireté, B1-A2), dessus (A2-B2)
  const nD = [-vS[0], -vS[1]];                          // vers le côté d'où monte le brin
  const Q = (s, t) => [X2[0] + s * uP[0] + t * nD[0], X2[1] + s * uP[1] + t * nD[1]];
  const A1 = Q(-2.3, 2.0), B1 = Q(-0.9, -WC / 2), A2 = Q(2.1, WC / 2), B2 = Q(3.5, -2.0);
  // le cabestan lâche : le brin monte (x = 2), passe par-dessus le fût, en fait le tour, ressort
  // dessous en x = 6,8, croise par-dessus lui-même, second tour en x = -7,6, ressort dessous en
  // x = -2,8 et passe sous le croisement, vers le laçage
  const monte1 = [[xS, yb, 0], [xS, A1[1] + 4, 0], [A1[0], A1[1] + 1.2, 0], [...A1, 1], [...B1, 1]];
  const monte2 = [[...A2, 1], [...B2, 1], [B2[0] - 0.3, B2[1] - 2.5, 0], [xS + 0.2, 6, 0], [xS, 2.5, 0], [xS, 0.6, 0]];
  const dessus1 = [[xS, 2.2], [xS, 0], [xS + 2.4, -12]];
  const sort1 = [[6.8, 0, 0], [7, 2, 0.3], [5.6, 5, 1], [xS, 6.3, 1], [-3, 5.9, 1], [-6.4, 3.4, 0.4], [-7.6, 0.6, 0]];
  const dessus2 = [[-7.6, 2.2], [-7.6, 0], [-5.2, -12]];
  const sort2 = [[-2.8, 0, 0], [-2.8, 2.6, 0], [-3.2, 5.9, -1], [-4.6, 9, 0], plus([-4.6, 9], dg, (yb - 9) / dg[1]).concat(0)];
  CAB = { dg, xS, xV, yb, D2a, X2, uP, nD, A1, B1, A2, B2, monte1, monte2, dessus1, sort1, dessus2, sort2, croisement: [-3.2, 5.9] };
  return CAB;
}
function vueCentre(h, z) {
  const R = repereC(z), F = h.formes, C = cabestan(), out = [];
  const w = WC * R.K;
  const brins = [
    { pts: C.monte1.map(R.P), ep: w, debut: 'fixe', fin: 'ouvert' },
    { pts: C.monte2.map(R.P), ep: w, debut: 'ouvert', fin: 'ouvert' },
    { pts: C.sort1.map(R.P), ep: w, debut: 'ouvert', fin: 'ouvert' },
    { pts: C.sort2.map(R.P), ep: w, debut: 'ouvert', fin: 'fixe', fleche: { de: 0.7, a: 0.92, cote: 'droite' } },
    // le nœud voisin, serré : un brin droit, un brin en biais
    { pts: [[C.xV, 0, 0], [C.xV, C.yb, 0]].map(R.P), ep: w, debut: 'ouvert', fin: 'fixe' },
    { pts: [[...C.D2a, 0], plus(C.D2a, C.dg, (C.yb - C.D2a[1]) / C.dg[1]).concat(0)].map(R.P), ep: w, debut: 'ouvert', fin: 'fixe' },
  ];
  out.push(F.cordes(brins));
  // le tour serré sur la passe voisine : le premier passage replonge sous le bord du haut, le
  // second ressort de sous le bord du bas ; entre les deux, le brin passe dessous
  out.push(h.ligne(...R.T(plus(plus(C.X2, C.nD, -WC / 2), C.uP, -3.2)), ...R.T(plus(plus(C.X2, C.nD, -WC / 2), C.uP, 0.6)), h.a.arete));
  out.push(h.ligne(...R.T(plus(plus(C.X2, C.nD, WC / 2), C.uP, 0.4)), ...R.T(plus(plus(C.X2, C.nD, WC / 2), C.uP, 4.5)), h.a.arete));
  out.push(cache(h, R, C.B1, C.A2, WC));
  // le tronçon de fût ; la babiche qui en sort passe dessous
  const xa = -17.5, xb = 30.5;
  const [a, b] = [R.T([xa, -12]), R.T([xb, 0])];
  out.push(h.rect(a[0], a[1], b[0] - a[0], b[1] - a[1], h.a.blanc));
  out.push(h.ligne(a[0], b[1], b[0], b[1], h.a.arete), h.ligne(a[0], a[1], a[0], b[1], h.a.detail), h.ligne(b[0], a[1], b[0], b[1], h.a.detail));
  // les tours par-dessus le fût, et leur dessous en tireté
  const dessus = pts => F.corde(pts.map(p => R.P([p[0], p[1], 0])), { ep: w, debut: 'ouvert', fin: 'ouvert' });
  out.push(dessus(C.dessus1), dessus(C.dessus2));
  out.push(cache(h, R, [C.xS + 2.4, -12], [6.8, 0], WC), cache(h, R, [-5.2, -12], [-2.8, 0], WC));
  // le nœud voisin : ses deux brins passent chacun par-dessus le fût, côte à côte
  out.push(dessus([[C.D2a[0], 0.5], [C.D2a[0], 0], [C.D2a[0] + 2.1, -12]]), dessus([[C.xV, 0.5], [C.xV, 0], [C.xV + 2.1, -12]]));
  // la face extérieure du fût, par-dessus les bouts des tours
  out.push(h.ligne(a[0], a[1], b[0], a[1], h.a.contour));
  // cote : 20 mm entre les axes de deux brins parallèles
  out.push(h.ligne(...R.T([C.xS, C.yb + 1.6]), ...R.T([C.xS, C.yb + 8.2]), h.a.fin), h.ligne(...R.T([C.xV, C.yb + 1.6]), ...R.T([C.xV, C.yb + 8.2]), h.a.fin));
  out.push(h.cote(...R.T([C.xS, C.yb + 6.8]), ...R.T([C.xV, C.yb + 6.8]), '20 mm'));
  return out.join('\n');
}
