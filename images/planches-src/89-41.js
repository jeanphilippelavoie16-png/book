// Planche 89-41 — La perche en goutte et la botte de branches (ch. 89, « La raquette de sortie »)
//
// Tout vient du passage du chapitre : une perche verte (bouleau, saule, érable) d'environ 2,5 cm
// de diamètre et 1,5 m de long, chauffée puis pliée en goutte, les deux bouts réunis à l'arrière
// et ligaturés, environ 30 cm au plus large ; deux traverses ligaturées en travers du milieu (la
// plante sur l'une, le talon sur l'autre) ; de la corde en croisillons d'un côté à l'autre du
// cadre ; deux cordes nouées à chaque traverse pour attacher la botte. En vignettes : la botte de
// branches (gros bouts en avant, ligaturés serré, attachée sous le pied) et la branche
// d'épinette noire pliée en boucle et ligaturée sous la botte.
// Les trois seules cotes sont celles du chapitre. Le reste (longueur des bouts réunis, grosseur
// des traverses, place des croisillons) est à l'échelle du dessin, jamais écrit.
//
// La charte : la perche au contour fort partout où elle est l'objet (droite, montée, de face, de
// côté, la branche d'épinette) ; pas de gris (vues de dessus, botte sans corps à ombrer, perche
// de 12 px). Le rouge : les deux bouts qu'on ramène pour plier (le geste, deux flèches pour un
// seul pli) et le sens des tours de la ligature (le geste).

const PI = Math.PI, DEG = PI / 180;
const RP = 12.5;               // rayon de la perche : ≈ 25 mm (coté)
const LONG = 1500;             // longueur de la perche (cotée)
const LARGE = 300;             // au plus large, hors tout (coté)
const DEMI = LARGE / 2 - RP;   // demi-largeur à l'axe de la perche
const QUEUE = 100;             // bouts réunis, côte à côte (dessin seulement)
const RT = 10;                 // rayon d'une traverse (dessin seulement)
const S = 0.47;                // échelle commune du dessus, du côté et de la face (px par mm)
const CORDE = 5;               // grosseur de la corde de ligature, dans le détail (mm de dessin)

// ─── petite géométrie ──────────────────────────────────────────────────────────────────
const add = (a, b) => [a[0] + b[0], a[1] + b[1]], sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const mul = (a, k) => [a[0] * k, a[1] * k], lon = a => Math.hypot(a[0], a[1]);
const uni = a => { const l = lon(a) || 1; return [a[0] / l, a[1] / l]; };
const gau = t => [-t[1], t[0]];
const bez = (c, t) => { const m = 1 - t; return [0, 1].map(k => m * m * m * c[0][k] + 3 * m * m * t * c[1][k] + 3 * m * t * t * c[2][k] + t * t * t * c[3][k]); };
const normales = P => P.map((p, i) => gau(uni(sub(P[Math.min(i + 1, P.length - 1)], P[Math.max(i - 1, 0)]))));
const cumul = P => { const c = [0]; for (let i = 1; i < P.length; i++) c.push(c[i - 1] + lon(sub(P[i], P[i - 1]))); return c; };
function aAbs(P, C, s) {           // point et indice à l'abscisse curviligne s
  let i = 0; while (i < P.length - 2 && C[i + 1] < s) i++;
  const t = (s - C[i]) / ((C[i + 1] - C[i]) || 1);
  return { p: add(P[i], mul(sub(P[i + 1], P[i]), t)), i };
}

// La goutte : l'axe de la perche. Bouts réunis côte à côte sur « queue » mm, flancs en S doux
// jusqu'au plus large, nez en demi-cercle. D se règle pour que l'axe fasse « long » mm.
function goutte(demi, queue, long, r) {
  const flanc = D => [[queue, -r], [queue + 0.22 * D, -r], [queue + 0.42 * D, -demi], [queue + D, -demi]];
  const lBez = c => { let L = 0, p = c[0]; for (let i = 1; i <= 300; i++) { const q = bez(c, i / 300); L += lon(sub(q, p)); p = q; } return L; };
  let lo = 50, hi = 1500;
  for (let k = 0; k < 60; k++) { const m = (lo + hi) / 2; if (2 * queue + 2 * lBez(flanc(m)) + PI * demi > long) hi = m; else lo = m; }
  const D = (lo + hi) / 2, c = flanc(D), UW = queue + D;
  const demiAxe = [];                                   // côté haut, de la jonction au bout du nez
  for (let i = 0; i <= 60; i++) demiAxe.push(bez(c, i / 60));
  for (let i = 1; i <= 30; i++) { const a = (90 - 3 * i) * DEG; demiAxe.push([UW + demi * Math.cos(a), -demi * Math.sin(a)]); }
  const bas = demiAxe.slice(0, -1).reverse().map(([u, v]) => [u, -v]);
  const axe = [[0, -r], ...demiAxe, ...bas, [0, r]];
  const larg = u => {                                   // demi-largeur à l'axe, à l'abscisse u
    for (let i = 0; i < demiAxe.length - 1; i++) {
      const [a, b] = [demiAxe[i], demiAxe[i + 1]];
      if ((a[0] - u) * (b[0] - u) <= 0) return -(a[1] + (b[1] - a[1]) * (u - a[0]) / ((b[0] - a[0]) || 1));
    }
    return r;
  };
  return { axe, demiAxe, larg, UW, NEZ: UW + demi, D };
}
const G = goutte(DEMI, QUEUE, LONG, RP);
const UF = 470, UR = UF - 175;        // traverse avant (sous la plante), arrière (sous le talon)

// ─── la botte (chaussure), en mm, origine sous la plante ─────────────────────────────────
const BOTTE_PLAN = (() => {
  const d = [[108, 0], [104, 22], [92, 40], [70, 52], [35, 57], [0, 56], [-40, 50], [-90, 44], [-140, 42], [-180, 41], [-205, 35], [-216, 20], [-219, 0]];
  return [...d, ...d.slice(1, -1).reverse().map(([x, y]) => [x, -y])];
})();
const demiBotte = x => {             // demi-largeur de la semelle à l'abscisse x
  const d = BOTTE_PLAN.slice(0, 13);
  for (let i = 0; i < d.length - 1; i++) if ((d[i][0] - x) * (d[i + 1][0] - x) <= 0) return d[i][1] + (d[i + 1][1] - d[i][1]) * (x - d[i][0]) / ((d[i + 1][0] - d[i][0]) || 1);
  return 0;
};
// de côté : x vers l'avant, y vers le haut ; la tige coupée à 150 par un trait de rupture
const BOTTE_COTE = [[-52, 135], [-30, 110], [15, 85], [65, 76], [95, 58], [108, 35], [103, 12], [85, 0], [-100, 0], [-198, 0], [-213, 12], [-218, 50], [-205, 110], [-202.5, 135]];
// de face : v de côté, y vers le haut
const BOTTE_FACE = (() => {
  const d = [[0, 0], [46, 0], [54, 6], [57, 24], [54, 48], [48, 72], [46, 96], [47, 135]];
  return [...d.slice(1).reverse().map(([x, y]) => [-x, y]), ...d.slice(1)];
})();

function rupture(h, a, b, amp = 3) {   // trait de rupture ondulé entre deux points (px)
  const n = 24, pts = [];
  for (let i = 0; i <= n; i++) { const t = i / n; pts.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t + amp * Math.sin(t * 2 * PI * 2)]); }
  return h.chemin(pts, h.a.detail);
}
function noeud(h, k, dir = [1, 0], taille = 1) {   // un nœud sur le dessus du pied : le nœud et ses deux bouts
  const n = gau(dir), q = (a, b) => add(k, add(mul(dir, a * taille), mul(n, b * taille)));
  return [
    h.formes.corde([q(1, -1), q(6, -4), q(11, -5)], { ep: 2.6 * taille, debut: 'ouvert', fin: 'libre', trait: 'detail' }),
    h.formes.corde([q(1, 1), q(6, 4), q(11, 5)], { ep: 2.6 * taille, debut: 'ouvert', fin: 'libre', trait: 'detail' }),
    h.ellipse(k[0], k[1], 3.4 * taille, 2.8 * taille, h.a.blanc),
    h.ellipse(k[0], k[1], 3.4 * taille, 2.8 * taille, h.a.detail),
  ].join('\n');
}

// ─── vue de dessus ──────────────────────────────────────────────────────────────────────
const repere = z => { const x0 = (z.l - (G.NEZ + RP) * S) / 2 + 4; return { x0, X: u => x0 + u * S }; };
function repPlan(z) {
  const { X } = repere(z), yc = z.h / 2 + 2;
  const Y = v => yc + v * S;
  return { X, Y, yc, P: p => [X(p[0]), Y(p[1])] };
}
function perche(h, T, axe, r, tr = h.a.contour) {   // la perche en bande, vue de dessus, r en mm (nombre ou fonction de i)
  const N = normales(axe), R = typeof r === 'function' ? r : () => r;
  const dedans = axe.map((p, i) => add(p, mul(N[i], R(i)))), dehors = axe.map((p, i) => sub(p, mul(N[i], R(i))));
  const poly = [...dedans, ...dehors.slice().reverse()].map(T);
  return { svg: h.chemin(poly, h.a.blanc, true) + '\n' + h.chemin(poly, tr, true), dedans, dehors };
}
// croisillons : des points également espacés le long de chaque flanc, reliés en zigzag
function croisillons() {
  const P = G.demiAxe, C = cumul(P), N = normales(P), tot = C[C.length - 1], n = 8, pts = [];
  for (let k = 1; k < n; k++) {
    const { p, i } = aAbs(P, C, k * tot / n);
    pts.push({ dedans: add(p, mul(N[i], RP)), dehors: sub(p, mul(N[i], RP + 1.5)), axe: p });
  }
  const miroir = q => [q[0], -q[1]];
  const lignes = [];
  for (let k = 0; k < pts.length - 1; k++) {
    lignes.push([pts[k].dedans, miroir(pts[k + 1].dedans)], [miroir(pts[k].dedans), pts[k + 1].dedans]);
  }
  const tours = [];
  for (const q of pts) { tours.push([q.dedans, q.dehors]); tours.push([miroir(q.dedans), miroir(q.dehors)]); }
  return { lignes, tours, pts };
}
function traverse(h, T, u, deborde = 24) {
  const w = G.larg(u) + RP + deborde, c = G.larg(u);
  const out = [h.chemin([[u - RT, -w], [u + RT, -w], [u + RT, w], [u - RT, w]].map(T), h.a.blanc, true),
    h.chemin([[u - RT, -w], [u + RT, -w], [u + RT, w], [u - RT, w]].map(T), h.a.arete, true)];
  for (const sg of [-1, 1]) {           // la ligature en croix sur le croisement
    for (const d of [-2.2, 2.2]) {
      out.push(h.chemin([[u - RT - 2, sg * c - RP - 2 + d], [u + RT + 2, sg * c + RP + 2 + d]].map(T), h.a.fin));
      out.push(h.chemin([[u + RT + 2, sg * c - RP - 2 + d], [u - RT - 2, sg * c + RP + 2 + d]].map(T), h.a.fin));
    }
  }
  return out.join('\n');
}
function vuePlan(h, z) {
  const T = repPlan(z), P = T.P, out = [];
  const cr = croisillons();
  out.push(perche(h, P, G.axe, RP).svg);
  for (const [a, b] of cr.lignes) out.push(h.chemin([a, b].map(P), h.a.detail));
  for (const [a, b] of cr.tours) out.push(h.chemin([a, b].map(P), h.a.detail));
  for (let u = 16; u <= 80; u += 5) out.push(h.chemin([[u, -RP * 2 - 1], [u + 2, RP * 2 + 1]].map(P), h.a.detail));
  out.push(h.cercle(T.X(48), T.Y(0), 58 * S + 6, h.a.fin + ' stroke-dasharray="5 3"'));
  out.push(traverse(h, P, UR), traverse(h, P, UF));
  out.push(h.chemin(BOTTE_PLAN.map(([x, y]) => P([UF + x, y])), h.a.cache, true));
  // les cordes de la botte : deux par traverse, nouées sur le pied
  const cordes = [
    [[UF, -66], [UF + 10, -34], [UF + 19, -4]], [[UF, 66], [UF + 10, 34], [UF + 19, 4]],
    [[UR, -52], [UR + 70, -30], [UF - 42, -4]], [[UR, 52], [UR + 70, 30], [UF - 42, 4]],
  ];
  for (const c of cordes) out.push(h.formes.corde(c.map(P), { ep: 3, debut: 'coupe', fin: 'ouvert', trait: 'detail' }));
  out.push(noeud(h, P([UF + 20, 0]), [1, 0], 0.8), noeud(h, P([UF - 40, 0]), [1, 0], 0.8));
  return { svg: out.join('\n'), T, cr };
}

// ─── de côté et de face : même échelle, même ligne de neige ─────────────────────────────
const BAS = 31;
function repCote(z) {
  const { X } = repere(z), yb = z.h - BAS;
  const ys = yb - (2 * RP + 2 * RT) * S;       // dessous de la semelle
  return { X, yb, ys, B: (x, y) => [X(UF + x), ys - y * S] };
}
function vueCote(h, z) {
  const R = repCote(z), out = [];
  const x1 = R.X(0), x2 = R.X(G.NEZ + RP), yh = R.yb - 2 * RP * S;
  out.push(h.rect(x1, yh, x2 - x1, R.yb - yh, h.a.blanc), h.rect(x1, yh, x2 - x1, R.yb - yh, h.a.contour));
  for (let u = 16; u <= 80; u += 5) out.push(h.ligne(R.X(u), yh - 1, R.X(u + 2), R.yb + 1, h.a.detail));
  // la botte
  const pts = BOTTE_COTE.map(([x, y]) => R.B(x, y));
  out.push(h.chemin(pts, h.a.blanc, true), h.chemin(pts, h.a.arete));
  out.push(rupture(h, R.B(-52, 135), R.B(-202.5, 135), 2.5));
  out.push(h.chemin([R.B(100, 14), R.B(-100, 14), R.B(-214, 14)], h.a.detail));
  // les cordes : l'avant par-dessus le pied, l'arrière du talon au cou-de-pied
  const cv = [R.B(0, -2 * RT + 2), R.B(7, 40), R.B(19, 83)];
  const cr = [R.B(-175, -2 * RT + 2), R.B(-110, 55), R.B(-44, 118)];
  out.push(h.formes.corde(cv, { ep: 3, debut: 'coupe', fin: 'ouvert', trait: 'detail' }));
  out.push(h.formes.corde(cr, { ep: 3, debut: 'coupe', fin: 'ouvert', trait: 'detail' }));
  out.push(noeud(h, R.B(20, 86), uni([1, -0.2]), 0.8), noeud(h, R.B(-42, 121), uni([1, 0.1]), 0.8));
  // les traverses, vues en bout, et leur ligature sur la perche
  for (const u of [UR, UF]) {
    const cx = R.X(u), cy = R.ys + RT * S;
    out.push(h.chemin([[cx - (RT + 3) * S, yh], [cx + (RT + 3) * S, R.yb]], h.a.fin), h.chemin([[cx + (RT + 3) * S, yh], [cx - (RT + 3) * S, R.yb]], h.a.fin));
    out.push(h.cercle(cx, cy, RT * S, h.a.blanc), h.cercle(cx, cy, RT * S, h.a.arete), h.cercle(cx, cy, 0.8, h.a.plein));
  }
  return { svg: out.join('\n'), R, cv };
}
function vueFace(h, z) {
  const { yb, ys } = repCote({ l: 0, h: z.h }), xc = z.l / 2 + 6, out = [];
  const V = v => xc + v * S, B = (v, y) => [V(v), ys - y * S];
  const yh = yb - 2 * RP * S;
  out.push(h.rect(V(-LARGE / 2), yh, LARGE * S, yb - yh, h.a.blanc), h.rect(V(-LARGE / 2), yh, LARGE * S, yb - yh, h.a.contour));
  const wf = G.larg(UF) + RP + 24, cf = G.larg(UF);
  out.push(h.rect(V(-wf), ys, 2 * wf * S, 2 * RT * S, h.a.blanc), h.rect(V(-wf), ys, 2 * wf * S, 2 * RT * S, h.a.arete));
  for (const sg of [-1, 1]) {
    const x = V(sg * cf);
    out.push(h.chemin([[x - (RP + 2) * S, ys - 1], [x + (RP + 2) * S, yb + 1]], h.a.fin), h.chemin([[x + (RP + 2) * S, ys - 1], [x - (RP + 2) * S, yb + 1]], h.a.fin));
  }
  const pts = BOTTE_FACE.map(([v, y]) => B(v, y));
  out.push(h.chemin(pts, h.a.blanc, true), h.chemin(pts, h.a.arete));
  out.push(rupture(h, B(-47, 135), B(47, 135), 2.5));
  out.push(h.chemin([B(-54, 14), B(54, 14)], h.a.detail));
  out.push(h.path(`M${B(-50, 16).join(' ')} Q${B(-44, 62).join(' ')} ${B(0, 62).join(' ')} Q${B(44, 62).join(' ')} ${B(50, 16).join(' ')}`, h.a.detail));
  const arche = sg => [B(sg * 66, -2 * RT + 2), B(sg * 63, 24), B(sg * 55, 62), B(sg * 30, 86), B(sg * 5, 91)];
  out.push(h.formes.corde(arche(-1), { ep: 3, debut: 'coupe', fin: 'ouvert', trait: 'detail' }));
  out.push(h.formes.corde(arche(1), { ep: 3, debut: 'coupe', fin: 'ouvert', trait: 'detail' }));
  out.push(noeud(h, B(0, 92), [0, -1], 0.8));
  // la cote : au plus large
  const yc = yb + 10;
  out.push(h.ligne(V(-LARGE / 2), yb + 3, V(-LARGE / 2), yc + 5, h.a.fin), h.ligne(V(LARGE / 2), yb + 3, V(LARGE / 2), yc + 5, h.a.fin));
  out.push(h.cote(V(-LARGE / 2), yc, V(LARGE / 2), yc, '≈ 300 mm', { cote: 'dessous' }));
  return out.join('\n');
}

// ─── la perche avant de plier ───────────────────────────────────────────────────────────
function repPerche(z) { const sp = (z.l - 30) / LONG, x0 = 15, yp = 31; return { sp, x0, yp, X: u => x0 + u * sp }; }
function vuePerche(h, z) {
  const R = repPerche(z), e = RP * R.sp, out = [];
  out.push(h.rect(R.X(0), R.yp - e, LONG * R.sp, 2 * e, h.a.blanc), h.rect(R.X(0), R.yp - e, LONG * R.sp, 2 * e, h.a.contour));
  // le geste : les deux bouts ramenés vers l'arrière
  const xg = R.X(0), xd = R.X(LONG), yt = R.yp - e - 4;
  out.push(h.geste(`M${xg + 6} ${yt} Q${xg + 6} ${yt - 18} ${xg + 52} ${yt - 20}`));
  out.push(h.geste(`M${xd - 6} ${yt} Q${xd - 6} ${yt - 18} ${xd - 52} ${yt - 20}`));
  const yc = R.yp + e + 8;
  out.push(h.cote(R.X(0), yc, R.X(LONG), yc, '≈ 1500 mm', { cote: 'dessous' }));
  return out.join('\n');
}

// ─── le détail : les deux bouts ligaturés ───────────────────────────────────────────────
// Les deux bouts sont encore parallèles sur tout ce que montre le détail (ils se réunissent sur
// QUEUE mm) : deux perches droites, coupées à gauche, cassées à droite.
const UMAX = 90;
function repLig(z) {
  const sd = 1.4, xe = 26, xt = xe + (RP + CORDE) * sd + 14, yc = z.h / 2 + 10;
  return { sd, xe, xt, yc, X: u => xt + u * sd, Y: v => yc + v * sd, P: p => [xt + p[0] * sd, yc + p[1] * sd] };
}
const LIG = { u0: 12, n: 10 };   // la ligature : 10 tours de corde à partir de u0
function vueLigature(h, z) {
  const R = repLig(z), out = [], sd = R.sd, c = CORDE, P = R.P;
  for (const v of [-RP, RP]) {
    const q = [[0, v - RP], [UMAX, v - RP], [UMAX, v + RP], [0, v + RP]].map(P);
    out.push(h.chemin(q, h.a.blanc, true));
    out.push(h.chemin([q[1], q[0], q[3], q[2]], h.a.arete));
    const pa = q[1], pb = q[2];
    out.push(h.path(`M${pa.join(' ')} C${pa[0] + 6} ${pa[1] + 8} ${pb[0] - 6} ${pb[1] - 8} ${pb.join(' ')}`, h.a.detail));
  }
  // le bout de départ, couché dans le creux sous les premiers tours (à droite)
  const uD = LIG.u0 + LIG.n * c;
  out.push(h.formes.corde([P([uD - 12, 0]), P([uD + 20, 0])], { ep: c * sd, debut: 'coupe', fin: 'libre', trait: 'detail' }));
  // les tours
  for (let i = 0; i < LIG.n; i++) {
    const u = LIG.u0 + i * c, e = 2 * RP + 1.4;
    const q = [[u, -e], [u + c, -e], [u + c * 1.5, e], [u + c * 0.5, e]].map(P);
    out.push(h.chemin(q, h.a.blanc, true), h.chemin(q, h.a.detail, true));
  }
  // en caché : le départ sous les tours, et la fin tirée sous les derniers tours
  out.push(h.chemin([P([uD - 12, 0]), P([uD, 0])], h.a.cache));
  const uF1 = LIG.u0, uF2 = LIG.u0 + 4 * c;
  // la fin : glissée sous les quatre derniers tours (à gauche), ressort au bord, coupée court
  out.push(h.chemin([P([uF1, 0]), P([uF2, 0])], h.a.cache));
  out.push(h.formes.corde([P([uF1 - 0.2 * c, 0]), P([uF1 - 1.9 * c, 0])], { ep: c * sd, debut: 'libre', fin: 'coupe', trait: 'detail' }));
  // le sens des tours : du départ (droite) vers la fin (gauche)
  const yf = R.Y(-2 * RP - 1.4) - 8;
  out.push(h.geste(`M${R.X(uD - 2)} ${yf} Q${R.X((uD + uF1) / 2)} ${yf - 14} ${R.X(uF1 + 2)} ${yf}`));
  // en bout : les deux perches coupées, les tours autour des deux
  const xe = R.xe, r = RP * sd, ro = (RP + c) * sd, y1 = R.Y(-RP), y2 = R.Y(RP);
  const stade = rr => `M${xe - rr} ${y1} A${rr} ${rr} 0 0 1 ${xe + rr} ${y1} L${xe + rr} ${y2} A${rr} ${rr} 0 0 1 ${xe - rr} ${y2} Z`;
  out.push(h.path(stade(ro), h.a.blanc), h.path(stade(ro), h.a.detail), h.path(stade(r), h.a.blanc), h.path(stade(r), h.a.detail));
  for (const y of [y1, y2]) {
    out.push(h.cercle(xe, y, r, h.a.blanc), h.cercle(xe, y, r, h.a.arete), h.cercle(xe, y, r * 0.55, h.a.fin), h.cercle(xe, y, 1, h.a.plein));
  }
  out.push(h.cote(xe - r, y1 - ro - 10, xe + r, y1 - ro - 10, '≈ 25 mm'));
  return { svg: out.join('\n'), R, uD, uF2 };
}

// ─── vignette : la botte de branches ────────────────────────────────────────────────────
function repBotte(z) { const s = Math.min((z.l - 16) / 860, (z.h - 14) / 470); const x0 = z.l / 2 + 400 * s, yc = z.h / 2; return { s, P: p => [x0 + p[0] * s, yc + p[1] * s] }; }
function rameau(h, P, s, a, dir, L, out, fonds) {   // un rameau plat de sapin : l'axe et ses aiguilles
  const pas = 8, lg = 16;
  const q = add(a, mul(dir, L)), n = gau(dir);
  const env = [a, add(add(a, mul(dir, L * 0.3)), mul(n, lg * 0.9)), add(q, mul(n, 3)), add(q, mul(n, -3)), add(add(a, mul(dir, L * 0.3)), mul(n, -lg * 0.9))];
  fonds.push(h.chemin(env.map(P), h.a.blanc, true));
  out.push(h.chemin([a, q].map(P), h.a.fin));
  for (let t = pas; t < L - 2; t += pas) {
    const p = add(a, mul(dir, t)), k = lg * (1 - 0.55 * t / L);
    for (const sg of [-1, 1]) out.push(h.chemin([p, add(p, add(mul(dir, k * 0.5), mul(n, sg * k)))].map(P), h.a.fin));
  }
}
function vueBotte(h, z) {
  const R = repBotte(z), P = R.P, out = [];
  const branches = [-2, 2, -1, 1, 0];
  for (const k of branches) {
    const th = k * 5 * DEG, L = 720 - Math.abs(k) * 70, b = k * 17;
    const dir = [-Math.cos(th), Math.sin(th)];
    const base = [-60, b];
    const tige = [[60, b], base, ...[0.25, 0.5, 0.75, 1].map(t => add(add(base, mul(dir, t * L)), [0, k * 6 * t * t]))];
    const fonds = [], traits = [];
    for (let j = 0, t = 0.06; t < 0.92; t += 0.105, j++) {
      const i = Math.min(Math.floor(t * 4), 3);
      const p0 = tige[1 + i], p1 = tige[2 + i], f = t * 4 - i;
      const a = add(p0, mul(sub(p1, p0), f)), d = uni(sub(p1, p0));
      const sg = j % 2 ? 1 : -1;
      const ang = 48 * DEG * sg, dd = [d[0] * Math.cos(ang) - d[1] * Math.sin(ang), d[0] * Math.sin(ang) + d[1] * Math.cos(ang)];
      rameau(h, P, R.s, a, dd, 200 * (1 - 0.55 * t), traits, fonds);
    }
    // les aiguilles le long de la tige, au-delà de la ligature
    rameau(h, P, R.s, tige[1], uni(sub(tige[5], tige[1])), L * 0.98, traits, fonds);
    out.push(...fonds, ...traits);
    // le gros bout, en bande qui s'amincit
    const N = normales(tige.slice(0, 3)), rr = [8.5, 8, 6];
    const g = tige.slice(0, 3).map((p, i) => add(p, mul(N[i], rr[i]))), d2 = tige.slice(0, 3).map((p, i) => sub(p, mul(N[i], rr[i])));
    out.push(h.chemin([...g, ...d2.reverse()].map(P), h.a.blanc, true), h.chemin([...g, ...d2.slice().reverse()].map(P), h.a.detail, true));
  }
  // la ligature des gros bouts
  for (let u = -46; u <= 14; u += 6) { const q = [[u, -45], [u + 6, -45], [u + 9, 45], [u + 3, 45]].map(P); out.push(h.chemin(q, h.a.blanc, true), h.chemin(q, h.a.detail, true)); }
  // la botte, pointe juste derrière la ligature, attachée par-dessus le pied
  const bx = -150;
  const bp = BOTTE_PLAN.map(([x, y]) => P([bx + x, y]));
  out.push(h.chemin(bp, h.a.blanc, true), h.chemin(bp, h.a.arete, true));
  const attaches = [[bx + 10, 0], [bx - 110, 0]];
  for (const [u] of attaches) {
    const w = demiBotte(u - bx) + 26;
    out.push(h.formes.corde([P([u, -w]), P([u + 3, -4])], { ep: 2.6, debut: 'fixe', fin: 'ouvert', trait: 'detail' }));
    out.push(h.formes.corde([P([u, w]), P([u + 3, 4])], { ep: 2.6, debut: 'fixe', fin: 'ouvert', trait: 'detail' }));
    out.push(noeud(h, P([u + 4, 0]), [1, 0], 0.7));
  }
  return { svg: out.join('\n'), R, bx };
}

// ─── vignette : la branche d'épinette noire pliée en boucle ─────────────────────────────
const GB = goutte(118, 70, 1300, 9);
function repBoucle(z) { const s = Math.min((z.l - 30) / (GB.NEZ + 30), (z.h - 22) / 270); const x0 = (z.l - (GB.NEZ + 10) * s) / 2 + 4, yc = z.h / 2; return { s, P: p => [x0 + p[0] * s, yc + p[1] * s] }; }
function vueBoucle(h, z) {
  const R = repBoucle(z), P = R.P, out = [];
  // la branche : gros bout en haut à gauche, pointe revenue en bas à gauche ; un peu tordue
  const axe = GB.axe.map(([u, v], i) => [u, v + 1.6 * Math.sin(i * 0.23) + 0.8 * Math.sin(i * 0.61)]);
  const n = axe.length, ray = i => 9 - 5 * i / (n - 1);
  const pb = perche(h, P, axe, ray);
  out.push(pb.svg);
  // les chicots des rameaux coupés
  const N = normales(axe);
  for (let i = 6; i < n - 6; i += 7) {
    const p = axe[i], t = uni(sub(axe[i + 1], axe[i - 1])), o = mul(N[i], -1);
    const a = sub(p, mul(o, -ray(i))), b = add(a, add(mul(o, 13), mul(t, 9)));
    out.push(h.chemin([a, b].map(P), h.a.detail));
  }
  // la ligature des deux bouts
  for (let u = 12; u <= 60; u += 4.5) out.push(h.chemin([[u, -19], [u + 2, 19]].map(P), h.a.detail));
  // la botte, attachée à la boucle par-dessus le pied
  const bx = GB.UW - 40;
  const bp = BOTTE_PLAN.map(([x, y]) => P([bx + x, y]));
  out.push(h.chemin(bp, h.a.blanc, true), h.chemin(bp, h.a.arete, true));
  const cordes = [];
  for (const [u, k] of [[bx + 2, bx + 8], [bx - 175, bx - 40]]) {
    for (const sg of [-1, 1]) {
      const w = GB.larg(u);
      cordes.push([[u, sg * w], [(u + k) / 2, sg * (demiBotte(u - bx) + 6)], [k, sg * 4]]);
    }
    out.push(...cordes.slice(-2).map(c => h.formes.corde(c.map(P), { ep: 2.6, debut: 'coupe', fin: 'ouvert', trait: 'detail' })));
    out.push(noeud(h, P([k + 1, 0]), [1, 0], 0.7));
  }
  return { svg: out.join('\n'), R, cordes, bx };
}

module.exports = (h) => ({
  ref: '89-41',
  titre: 'La perche en goutte et la botte de branches',
  desc: 'En haut, la perche verte droite, cotée à environ 1500 mm, avec deux flèches qui ramènent ses deux bouts vers l’arrière. Au milieu à droite, vue de dessus, la raquette montée : la perche pliée en goutte, nez à droite, les deux bouts réunis côte à côte à gauche sous une ligature ; deux traverses en travers du milieu, ligaturées en croix sur la perche ; de la corde tendue en croisillons d’un flanc à l’autre ; la botte en tireté, la plante sur la traverse avant, le talon sur l’arrière, et deux cordes par traverse nouées sur le dessus du pied. À gauche, le détail des deux bouts : les tours de corde serrés autour des deux perches, le bout de départ couché dans le creux sous les premiers tours, le bout final glissé sous les derniers tours et ressorti coupé court au bord, une flèche courbe au-dessus pour le sens des tours ; en bout, les deux perches coupées, cotées à environ 25 mm, et les tours qui les entourent ensemble. Dessous, de face et de côté à la même échelle : la perche à plat, les traverses posées dessus, la semelle sur les traverses, les cordes de la traverse avant par-dessus l’avant du pied, celles de l’arrière du talon au cou-de-pied ; la largeur de la goutte, environ 300 mm. En bas, deux vignettes : la botte de branches de résineux bien fournies, gros bouts en avant, ligaturés serré, la botte (chaussure) attachée dessus par deux cordes nouées sur le pied ; et une branche d’épinette noire pliée en boucle, ses deux bouts ligaturés à l’arrière, la botte ligaturée dessus par des cordes qui partent de la boucle.',
  format: 'pleine',
  disposition: [['perche'], ['ligature', 'plan'], ['face', 'cote'], ['botte', 'boucle']],
  hauteurs: [0.62, 1.76, 1.2, 1.29],
  largeurs: [[1], [1.05, 2], [1.05, 2], [1, 1]],
  vues: {
    perche: {
      titre: 'La perche verte, chauffée puis pliée en goutte',
      dessin: z => vuePerche(h, z),
      renvois: z => {
        const R = repPerche(z);
        return [{ n: 1, rond: [R.X(700), 11], cible: [R.X(745), R.yp - RP * R.sp], texte: 'bouleau, saule ou érable, vert' }];
      },
    },
    ligature: {
      titre: 'Les deux bouts ligaturés',
      dessin: z => vueLigature(h, z).svg,
      renvois: z => {
        const { R, uD, uF2 } = vueLigature(h, z);
        return [
          { n: 2, rond: [R.X(uD + 8), R.Y(-2 * RP) - 26], cible: [R.X(uD + 8), R.Y(0) - 2], texte: 'bout de départ couché sous les tours' },
          { n: 3, rond: [R.X(LIG.u0 - 6), R.Y(2 * RP) + 26], cible: [R.X(LIG.u0 - 6), R.Y(0) + 2], texte: 'bout final tiré sous les derniers tours' },
        ];
      },
    },
    plan: {
      titre: 'Montée, vue de dessus',
      dessin: z => vuePlan(h, z).svg,
      renvois: z => {
        const { T, cr } = vuePlan(h, z);
        const wf = G.larg(UF) + RP + 24, wr = G.larg(UR) + RP + 24;
        const q = cr.pts[5].dedans, q2 = [q[0] + 30, q[1] + 60];
        return [
          { n: 4, rond: [T.X(620), T.Y(150)], cible: [T.X(UF), T.Y(wf - 3)], texte: 'traverse sous la plante du pied' },
          { n: 5, rond: T.P([175, 125]), cible: [T.X(UR), T.Y(wr - 3)], texte: 'traverse sous le talon' },
          { n: 6, rond: [z.l - 11, T.Y(95)], cible: T.P([G.NEZ - 62, 48]), texte: 'corde en croisillons, d’un flanc à l’autre' },
          { n: 7, rond: T.P([170, -120]), cible: T.P([UR + 50, -37]), texte: 'deux cordes nouées à chaque traverse' },
        ];
      },
    },
    face: {
      titre: 'De face',
      dessin: z => vueFace(h, z),
      renvois: () => [],
    },
    cote: {
      titre: 'De côté',
      dessin: z => vueCote(h, z).svg,
      renvois: z => {
        const { cv } = vueCote(h, z);
        return [{ n: 8, rond: [cv[1][0] + 60, cv[1][1] - 20], cible: [cv[1][0] + 1, cv[1][1]], texte: 'cordes nouées par-dessus le pied' }];
      },
    },
    botte: {
      titre: 'La botte de branches',
      dessin: z => vueBotte(h, z).svg,
      renvois: z => {
        const { R, bx } = vueBotte(h, z);
        return [
          { n: 9, rond: R.P([-830, -150]), cible: R.P([-700, -60]), texte: 'pin, sapin ou épinette bien fournis' },
          { n: 10, rond: R.P([40, -130]), cible: R.P([-14, -44]), texte: 'gros bouts en avant, ligaturés serré' },
          { n: 11, rond: R.P([bx + 10, 180]), cible: R.P([bx + 10, demiBotte(10) + 16]), texte: 'attachée sous le pied' },
        ];
      },
    },
    boucle: {
      titre: 'L’épinette noire, en plus grossier',
      dessin: z => vueBoucle(h, z).svg,
      renvois: z => {
        const { R, cordes } = vueBoucle(h, z);
        const c = [130, GB.larg(130) + 1];
        return [
          { n: 12, rond: R.P([60, 110]), cible: R.P(c), texte: 'boucle ligaturée sous la botte' },
        ];
      },
    },
  },
});
