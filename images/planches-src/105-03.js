// Planche 105-03 — La gouge et le limiteur de profondeur (sert aussi le ch. 83)
module.exports = (h) => ({
  ref: '105-03',
  titre: 'La gouge et le limiteur de profondeur',
  desc: 'Trois vues de profil d’une gouge de chaîne posée sur son guide-chaîne, la chaîne filant vers la gauche. Neuve : le limiteur qui précède la gouge glisse sur le bois, la gouge dépasse de lui d’une marche et lève un copeau de cette épaisseur. Après des affûtages sans jamais reprendre le limiteur : la gouge a reculé et baissé en suivant la pente de son dessus jusqu’à la hauteur du limiteur, le bois reste plat, plus de copeau ; le contour de la gouge neuve est en tireté. Au gabarit : le gabarit porte sur la gouge, le limiteur passe dans sa fente, et ce qui dépasse, en tireté, part à la lime plate. Un cercle agrandit le coin avant du limiteur : arrondi en roulant la lime vers l’avant ; limé à plat, en tireté, il garde une arête vive qui accroche.',
  format: 'demi',
  disposition: [['neuve', 'usee', 'gabarit']],
  vues: {
    neuve: {
      titre: 'Neuve',
      dessin: z => {
        const { P, D } = repere(z);
        const rampe = bez3([19, G0], [23, G0], [27, 31], [X0, T0]);
        const surface = [[XG, G0]].concat(rampe, [[XD, T0]]);
        return [
          h.path(D([[XB, HAUT_BOIS]].concat(surface.filter(p => p[0] >= XB), [[XD, HAUT_BOIS]]), true), h.a.hachure('bois', 'aucun')),
          h.path(D([[XB, G0]].concat(surface.filter(p => p[0] > XB))), h.a.arete),
          h.path(D([[XG + 0.5, G0], [9, G0]]), h.a.fin),
          h.path(D([[XG + 0.5, T0], [X0, T0]]), h.a.fin),
          h.fleche(D([[XG + 3, 30], [XG + 3, T0 - 0.2]]), h.a.fin),
          h.fleche(D([[XG + 3, 30], [XG + 3, G0 + 0.2]]), h.a.fin),
          chaine(h, P, D, G0, XU0),
          h.path(D(COPEAU, true), h.a.blanc),
          h.path(D(COPEAU, true), h.a.hachure('bois', 'arete')),
          h.fleche(D([[50, -20], [16, -20]])),
        ].join('\n');
      },
      renvois: z => {
        const { P } = repere(z);
        return [
          { n: 1, rond: P([67, -21]), cible: P([46, 22]), texte: 'gouge neuve : elle dépasse le limiteur' },
          { n: 2, rond: P([4, 54]), cible: P([XG + 3, 30]), texte: 'marche du limiteur : l’épaisseur du copeau' },
        ];
      },
    },
    usee: {
      titre: 'Limiteur jamais repris',
      dessin: z => {
        const { P, D } = repere(z);
        const hu = haut(XU);
        const fantome = GORGE_NEUVE.concat([[X0, T0], [XU, hu]]);
        return [
          h.path(D([[XG, HAUT_BOIS], [XG, hu], [XD, hu], [XD, HAUT_BOIS]], true), h.a.hachure('bois', 'aucun')),
          h.path(D([[XG, hu], [XD, hu]]), h.a.arete),
          chaine(h, P, D, G0, XU),
          h.path(D(fantome), h.a.cache),
          // charte : là où ça rate, le limiteur resté à sa hauteur d'origine
          h.controle(...P([7, G0 - 3]), 9 * S(z)),
        ].join('\n');
      },
      renvois: z => {
        const { P } = repere(z);
        return [
          { n: 3, rond: P([67, -21]), cible: P([57, 22]), texte: 'gouge reculée, limiteur intact : plus de copeau' },
        ];
      },
    },
    gabarit: {
      titre: 'Au gabarit',
      dessin: z => {
        const { P, D } = repere(z);
        const F = coinAvant(G1);
        const enTrop = limiteurOrigine().filter(p => p[1] >= G1 - 0.01);
        const x2 = xDos(EP_BAS) + 2.4, hu = haut(XU);
        const gabArriere = [[x2, EP_BAS], [35.5, EP_BAS], [39.5, hu], [XD, hu],
          [XD, hu + 1.6], [38.6, hu + 1.6], [34.6, G1], [x2, G1]];
        const gabAvant = [[XG, EP_BAS], [-1, EP_BAS], [-1, G1], [XG, G1]];
        const L = loupe(z);
        return [
          chaine(h, P, D, G1, XU, false),
          h.path(D([[F[0], G1]].concat(enTrop, [[xDos(G1), G1]])), h.a.cache),
          h.path(D(gabArriere, true), h.a.plein),
          h.path(D(gabAvant, true), h.a.plein),
          h.cercle(...P(CD), RD * S(z), h.a.detail),
          h.path(L.attache, h.a.fin),
          h.path(L.D([L.corps], true), h.a.blanc),
          h.path(L.D(L.bord), h.a.contour),
          h.path(L.D(L.vive), h.a.cache),
          h.path(L.D([L.lime], true), h.a.blanc),
          h.path(L.D([L.lime], true), h.a.hachure('metal', 'aucun')),
          h.path(L.D(L.limeBord), h.a.arete),
          h.cercle(...L.c, L.r, h.a.detail),
          h.geste(L.roule),                         // charte : le geste, rouler la lime vers l'avant
        ].join('\n');
      },
      renvois: z => {
        const { P } = repere(z);
        const L = loupe(z);
        return [
          { n: 4, rond: P([66, 42]), cible: P([66, haut(XU) + 1.6]), texte: 'gabarit posé : on lime ce qui dépasse' },
          { n: 6, rond: P([48, 60]), cible: L.Q([7.5, G1 + 1.7]), texte: 'lime plate, en bout : la rouler vers l’avant' },
          { n: 5, rond: P([40, 40]), cible: L.Q(POINT_ARRONDI), texte: 'coin avant arrondi ; vif, il accroche' },
        ];
      },
    },
  },
});

// ─── Géométrie, en unités locales : x vers l'arrière de la chaîne, y vers le haut ─────────
// Le maillon-gouge va de x = 0 (avant, le limiteur) à x = 72 (talon). La chaîne file vers la
// gauche : le limiteur passe avant la gouge. La marche est exagérée pour se voir.
const G0 = 27;                 // dessus du limiteur d'origine
const G1 = 21;                 // dessus du limiteur abaissé au gabarit
const X0 = 30, T0 = 33;        // pointe de la gouge neuve
const XU0 = X0;
const PENTE = 10 / 38;         // le dessus de la gouge descend vers l'arrière
const XU = 52;                 // front de la gouge après les affûtages
const HAUT_BOIS = 45;
const EP_BAS = 19.4;           // dessous de la languette du gabarit
const XG = -6, XD = 76;        // bords des vues de profil
const XB = 3;                  // le bois de la vue « Neuve » s'arrête ici, pour laisser voir la marche
const haut = x => +(T0 - (x - X0) * PENTE).toFixed(2);

function bez3(p0, p1, p2, p3, n = 16) {
  const out = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n, u = 1 - t;
    out.push([0, 1].map(k => u * u * u * p0[k] + 3 * u * u * t * p1[k] + 3 * u * t * t * p2[k] + t * t * t * p3[k]));
  }
  return out;
}
function bez2(p0, p1, p2, n = 12) {
  const out = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n, u = 1 - t;
    out.push([0, 1].map(k => u * u * p0[k] + 2 * u * t * p1[k] + t * t * p2[k]));
  }
  return out;
}

// Limiteur tel que sorti d'usine : avant arrondi, dessus plat, dos qui plonge dans la gorge.
const DOS = bez3([13, G0], [16, G0], [17, 19], [20, 15]);
function limiteurOrigine() {
  const pts = [[0, 0], [0, 10]];
  for (let i = 1; i <= 20; i++) {
    const th = (Math.PI / 2) * i / 20;
    pts.push([9 - 9 * Math.cos(th), 10 + (G0 - 10) * Math.sin(th)]);
  }
  return pts.concat(DOS);
}
function xDos(y) {
  for (let i = 0; i < DOS.length - 1; i++) {
    const [a, b] = [DOS[i], DOS[i + 1]];
    if ((a[1] - y) * (b[1] - y) <= 0) return a[0] + (y - a[1]) / (b[1] - a[1]) * (b[0] - a[0]);
  }
  return DOS[DOS.length - 1][0];
}
function coinAvant(g) {
  const o = limiteurOrigine();
  const i = o.findIndex(p => p[1] > g);
  const [a, b] = [o[i - 1], o[i]];
  return [a[0] + (g - a[1]) / (b[1] - a[1]) * (b[0] - a[0]), g];
}
// Le coin arrondi part de A, sur l'avant, et rejoint le dessus en B.
function arrondi(g) {
  const F = coinAvant(g);
  const avant = limiteurOrigine().filter(p => p[1] < g - 4 && p[0] < 10);
  return { F, A: avant[avant.length - 1], B: [F[0] + 4.5, g], avant };
}
// Limiteur abaissé à g, coin avant arrondi ou laissé vif.
function limiteur(g, rond = true) {
  const o = limiteurOrigine();
  if (g >= G0) return o;
  const apres = [[xDos(g), g]].concat(DOS.filter(p => p[1] < g));
  if (!rond) return o.filter(p => p[1] < g && p[0] < 10).concat([coinAvant(g)], apres);
  const { F, A, B, avant } = arrondi(g);
  return avant.concat(bez2(A, F, B).slice(1), apres);
}
// Le coin vif, tel que le laisse une lime passée à plat : de A au coin, puis jusqu'à B.
function coinVif(g) {
  const { F, A, B } = arrondi(g);
  const entre = limiteurOrigine().filter(p => p[1] > A[1] && p[1] < g && p[0] < 10);
  return [A].concat(entre, [F, B]);
}

// Gorge et gouge, du fond de la gorge jusqu'au talon du maillon.
const GORGE_NEUVE = bez3([20, 15], [22, 11.5], [28.5, 11.5], [29.6, 19]);
function gouge(x) {
  const gorge = x === X0 ? GORGE_NEUVE : bez3([20, 15], [23, 10.5], [x - 2, 10.5], [x - 0.4, 19]);
  return gorge.slice(1).concat(
    [[x, haut(x)], [68, haut(68)]],
    bez2([68, haut(68)], [72, 22.6], [72, 18]).slice(1),
    [[72, 3]],
    bez2([72, 3], [72, 0], [69, 0]).slice(1),
  );
}
const maillon = (g, x, rond = true) => limiteur(g, rond).concat(gouge(x));

// Guide-chaîne, bouts des maillons voisins, maillon-gouge et ses deux rivets.
function chaine(h, P, D, g, x, rond = true) {
  const voisinAvant = [[XG, 0], [XG, 12], [11, 12], [14, 9], [14, 0]];
  const voisinArriere = [[XD, 0], [XD, 12], [59, 12], [56, 9], [56, 0]];
  const m = maillon(g, x, rond);
  return [
    h.path(D([[XG, 0], [XD, 0], [XD, -13], [XG, -13]], true), h.a.loin),   // charte : le guide-chaîne, derrière la chaîne
    h.path(D([[XG, 0], [XD, 0]]), h.a.contour),
    h.path(D([[XG, -13], [XD, -13]]), h.a.arete),
    h.path(D(voisinAvant, true), h.a.blanc),
    h.path(D(voisinAvant), h.a.arete),
    h.path(D(voisinArriere, true), h.a.blanc),
    h.path(D(voisinArriere), h.a.arete),
    h.path(D(m, true), h.a.blanc),
    h.path(D(m, true), h.a.contour),
    h.cercle(...P([11, 6]), 3 * S0, h.a.arete),
    h.cercle(...P([61, 6]), 3 * S0, h.a.arete),
  ].join('\n');
}

// Copeau qui s'enroule dans la gorge, levé par la pointe.
const COPEAU = [[19, G0]].concat(
  bez3([19, G0], [14, 21], [17, 14.5], [23, 14.5]).slice(1),
  bez3([23, 14.5], [27.5, 14.5], [29.4, 17.5], [29.6, 21]).slice(1),
  [[29.9, 31.5]],
  bez3([29.9, 31.5], [27, 30], [23, 27.6], [19, G0]).slice(1),
);

// Repère des trois vues de profil : x de -6 à 76, y de -26 à 70.
let S0 = 1;
const S = z => Math.min(z.l / 82, z.h / 96);
function repere(z) {
  const s = S(z);
  S0 = s;
  const ox = (z.l - 82 * s) / 2 + 6 * s, oy = (z.h - 96 * s) / 2 + 70 * s;
  const P = ([x, y]) => [+(ox + s * x).toFixed(1), +(oy - s * y).toFixed(1)];
  const D = (pts, ferme = false) => 'M' + pts.map(p => P(p).join(',')).join(' L') + (ferme ? ' Z' : '');
  return { P, D };
}

// ─── La loupe : le coin avant du limiteur agrandi dans un cercle, au-dessus de la vue ──────
const CD = [3.5, 19.5], RD = 6.5;          // ce qu'on agrandit, en unités du maillon
const CM = [14, 49], RM = 17;              // où va le cercle, en unités de la vue
function loupe(z) {
  const { P } = repere(z);
  const s = S(z), c = P(CM), r = RM * s, sd = r / RD;
  const Q = ([x, y]) => [+(c[0] + sd * (x - CD[0])).toFixed(1), +(c[1] - sd * (y - CD[1])).toFixed(1)];
  const D = (runs, ferme = false) => runs.map(run => 'M' + run.map(p => Q(p).join(',')).join(' L') + (ferme ? ' Z' : '')).join(' ');
  // trait fin qui relie le cercle d'appel à la loupe
  const a = P(CD), ra = RD * s;   // le cercle d'appel entoure exactement ce que la loupe agrandit
  const dx = c[0] - a[0], dy = c[1] - a[1], dl = Math.hypot(dx, dy);
  const attache = `M${+(a[0] + dx / dl * ra).toFixed(1)},${+(a[1] + dy / dl * ra).toFixed(1)} L${+(c[0] - dx / dl * r).toFixed(1)},${+(c[1] - dy / dl * r).toFixed(1)}`;
  // la lime roule vers l'avant : arc hors du cercle, du dessus vers l'avant
  const roule = bez2([6.6, G1 + 3.9], [3, 25.4], [0.6, 22.6]).map(Q);
  return {
    c, r, Q, D, attache,
    roule: 'M' + roule.map(p => p.join(',')).join(' L'),
    corps: couperCercle(maillon(G1, XU), CD, RD),
    bord: runsDans(limiteur(G1), false, CD, RD),
    vive: runsDans(coinVif(G1), false, CD, RD),
    lime: couperCercle(LIME_COIN, CD, RD),
    limeBord: runsDans(LIME_COIN, true, CD, RD),
  };
}

function densifier(pts, ferme, pas = 0.05) {
  const out = [];
  const n = ferme ? pts.length : pts.length - 1;
  for (let i = 0; i < n; i++) {
    const a = pts[i], b = pts[(i + 1) % pts.length];
    const k = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / pas));
    for (let j = 0; j < k; j++) out.push([a[0] + (b[0] - a[0]) * j / k, a[1] + (b[1] - a[1]) * j / k]);
  }
  if (!ferme) out.push(pts[pts.length - 1]);
  return out;
}
function dansPoly([x, y], poly) {
  let dedans = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) dedans = !dedans;
  }
  return dedans;
}
// Les bouts d'une ligne qui tombent dans le cercle.
function runsDans(pts, ferme, c, r) {
  const runs = [];
  let cur = [];
  for (const p of densifier(pts, ferme)) {
    if (Math.hypot(p[0] - c[0], p[1] - c[1]) <= r) cur.push(p);
    else if (cur.length) { runs.push(cur); cur = []; }
  }
  if (cur.length) runs.push(cur);
  return runs.filter(run => run.length > 1);
}
// Une forme fermée découpée par le cercle.
function couperCercle(poly, c, r) {
  const pts = densifier(poly, true);
  const ded = p => Math.hypot(p[0] - c[0], p[1] - c[1]) <= r;
  const ang = p => Math.atan2(p[1] - c[1], p[0] - c[0]);
  const i0 = pts.findIndex(p => !ded(p));
  if (i0 < 0) return pts;
  const arc = (a0, a1) => {
    let d = a1 - a0;
    while (d <= -Math.PI) d += 2 * Math.PI;
    while (d > Math.PI) d -= 2 * Math.PI;
    for (const dd of [d, d > 0 ? d - 2 * Math.PI : d + 2 * Math.PI]) {
      const m = a0 + dd / 2;
      if (dansPoly([c[0] + r * Math.cos(m), c[1] + r * Math.sin(m)], poly)) {
        const n = Math.max(2, Math.ceil(Math.abs(dd) * 24));
        return Array.from({ length: n + 1 }, (_, i) => [c[0] + r * Math.cos(a0 + dd * i / n), c[1] + r * Math.sin(a0 + dd * i / n)]);
      }
    }
    return [];
  };
  const out = [];
  let sortie = null, entree0 = null;
  for (let k = 1; k <= pts.length; k++) {
    const q = pts[(i0 + k - 1) % pts.length], p = pts[(i0 + k) % pts.length];
    if (ded(p)) {
      if (!ded(q)) {
        if (sortie === null) entree0 = ang(p);
        else out.push(...arc(sortie, ang(p)));
      }
      out.push(p);
    } else if (ded(q)) sortie = ang(q);
  }
  if (sortie !== null && entree0 !== null) out.push(...arc(sortie, entree0));
  return out;
}

// La lime plate, vue en bout, encore à plat sur le dessus : on la roule vers l'avant.
const LIME_COIN = [[5, G1], [16, G1], [16, G1 + 3.4], [5, G1 + 3.4]];
const POINT_ARRONDI = (() => {
  const { F, A, B } = arrondi(G1);
  return [0, 1].map(k => 0.36 * A[k] + 0.48 * F[k] + 0.16 * B[k]);
})();
