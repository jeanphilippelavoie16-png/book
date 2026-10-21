// Planche 62-17 — le collier.
// Chapitre 62, tableau 5.4 (« Collier | Trapezius, splenius, complexus | Le plus collagéneux de la
// bête | Bouillon, braisé très long, ragoût. Excellent haché ») ; ch. 64, étape 7 (le cou « se
// désosse en tournant autour des vertèbres cervicales, lame contre l'os » ; retirer le ligament
// nuchal, « le gros cordon jaune élastique » du dessus du cou). Documentation :
// suivi/62-documentation-planches.md, section 20 (ce qui est établi, vue par vue), section 2
// (conventions) et « Base commune » (la carcasse du module images/planches-src/_carcasse-orignal.js).
// Figures regardées : sisson-1914-fig256 (ligament nuchal du bœuf : a cordon, b sa portion large,
// c et d la lame), sisson-1914-fig304 et ellenberger-rind-t14 fig. 67 (w splénius, x rhomboïde),
// ellenberger-rind-t2 (a trapèze, de derrière la tête au garrot), usda-imps-coupe-5e-6e-cote
// (K complexus, 1 ligament nuchal), acia-boeuf-09 (le cou du bœuf, coupé droit devant la 1re côte).
//
// Vue 1 — où il est : l'avant de la carcasse commune, de profil gauche. Le collier en trame, de
//   l'atlas (le cou coupé net, la tête retirée) au trait droit qui passe à la jonction de la
//   dernière cervicale et de la première dorsale, parallèle à la première côte (CEE-ONU 9130), et,
//   dessous, jusqu'à la limite de l'épaule (région 5 de la 62-02). La 7e cervicale et la 1re côte en
//   trait appuyé ; les autres os en trait fin, vus au travers.
// Vue 2 — le cou en couches, de profil, écartées (règle 5 de JP) et posées l'une au-dessus de
//   l'autre, de la plus externe à la plus profonde : trapèze (du ligament, depuis l'atlas : SISSON),
//   splénius (sous le trapèze, mince : SISSON), complexus (sous le splénius, couché sur le ligament ;
//   quatre intersections tendineuses obliques sur sa partie dorsale : SISSON, cheval), ligament
//   nuchal (le cordon rond devant, de plus en plus large et plat vers l'arrière ; la lame, dont les
//   fibres vont du cordon aux épines des 2e, 3e et 4e cervicales, et de la 1re dorsale aux 5e, 6e
//   et 7e : SISSON p. 244, fig. 256), vertèbres cervicales. Chaque couche garde sa place en long :
//   elles sont seulement écartées. La lame du couteau fait le tour des vertèbres (ch. 64).
// Vue 3 — le collier désossé (os, cartilage et tendons à nu retirés : CEE-ONU 9230) et, à part, le
//   ligament nuchal retiré (« removed unless otherwise specified », CEE-ONU 9230 ; il part au
//   ch. 103).
//
// NON ÉTABLI, donc pas dessiné : le grain (aucune flèche de grain) ; les autres muscles du cou
// (rhomboïde, brachiocéphalique, dentelé cervical, sterno-céphalique) ; l'épaisseur de chaque couche
// (l'épaisseur dessinée n'est qu'une convention de vue éclatée : le splénius seulement plus mince,
// SISSON « thin ») ; l'angle exact des intersections du complexus ; la forme du collier une fois
// désossé (la planche garde le contour du cou) ; le sens dans lequel on fait le tour des vertèbres
// (la flèche dit « tout autour, contre l'os », pas un ordre). La couleur jaune du ligament ne se
// dessine pas en noir et blanc.
//
// Format : pleine page, pas la demi-page de la fiche. Les cinq couches écartées de la vue 2 demandent
// environ 400 de haut à une échelle où les vertèbres et les fibres de la lame se lisent ; en demi-page,
// chaque vue n'a qu'environ 210 de haut.
//
// Une correction locale au module : le trapèze du module commence derrière l'atlas ; SISSON le fait
// naître « from the atlas ». La couche de la vue 2 le prolonge jusqu'au trait de l'atlas.
'use strict';
const C = require('./_carcasse-orignal');

const NOIR = '#1A1A1A', BLANC = '#FFFFFF';
const f1 = v => Math.round(v * 10) / 10;
const dP = (pts, ferme) => 'M' + pts.map(p => `${f1(p[0])} ${f1(p[1])}`).join(' L') + (ferme ? ' Z' : '');
const trait = (ep, extra = '') => `fill="none" stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="round"${extra}`;
const COUTEAU = trait(1.4, ' stroke-dasharray="6 3.5"');
const unit = (a, b) => { const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1; return [dx / L, dy / L]; };
const add = (a, b, k = 1) => [a[0] + b[0] * k, a[1] + b[1] * k];
const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

// ─── Les deux traits qui bornent le collier (repère U du module) ────────────────────────────
// Derrière : la limite « cou » de la 62-02, droite, parallèle à la 1re côte, prolongée jusqu'à la
// jonction C7-T1. Devant : le trait de l'atlas, où la tête a été retirée.
const COUPE = [C.LIMITES.cou[0], C.POINTS.c7t1];
const ATLAS = [[405, 222], [372, 440]];
const cote = (L, P) => (L[1][0] - L[0][0]) * (P[1] - L[0][1]) - (L[1][1] - L[0][1]) * (P[0] - L[0][0]);
const DEDANS = [500, 300];            // un point du cou : le bon côté des deux traits
function garder(poly, L) {             // Sutherland-Hodgman sur un demi-plan
  const s = Math.sign(cote(L, DEDANS)), out = [];
  const ok = P => cote(L, P) * s >= 0;
  poly.forEach((P, i) => {
    const Q = poly[(i + 1) % poly.length];
    if (ok(P)) out.push(P);
    if (ok(P) !== ok(Q)) { const a = cote(L, P), b = cote(L, Q); out.push(lerp(P, Q, a / (a - b))); }
  });
  return out;
}
const collierSeul = pts => garder(garder(C.dense(pts, 2, true), ATLAS), COUPE);
const xCoupe = y => COUPE[0][0] + (COUPE[1][0] - COUPE[0][0]) * (y - COUPE[0][1]) / (COUPE[1][1] - COUPE[0][1]);

// ─── Le collier sur la carcasse : contour de la région 5 devant l'épaule ────────────────────
const S = C.SILHOUETTE, LIM = C.LIMITES;
const iS = (x, y) => S.findIndex(p => p[0] === x && p[1] === y);
const epauleAvant = LIM.epaule.slice(0, LIM.epaule.findIndex(p => p[0] === 664 && p[1] === 362) + 1).reverse();
const COLLIER = [
  [S[0][0], S[0][1], 'c'], ...S.slice(1, iS(726, 142) + 1).map(p => [p[0], p[1]]),
  [728, 143, 'c'], ...LIM.cou.slice(1, -1), [LIM.cou[LIM.cou.length - 1][0], LIM.cou[LIM.cou.length - 1][1], 'c'],
  ...epauleAvant.slice(0, -1), [503, 611, 'c'],
  ...S.slice(iS(505, 600), S.length - 1).map(p => [p[0], p[1]]), [372, 440, 'c'],
];

// ─── Les couches de la vue 2 (repère U) ─────────────────────────────────────────────────────
// Trapèze : le contour du module, prolongé jusqu'à l'atlas (SISSON : « from the atlas »).
const TRAPEZE = [[396, 227], [440, 235], [480, 243], [530, 244], [578, 235], [618, 217], [650, 193], [676, 168],
  [700, 152], [726, 146], [770, 152], [790, 300], [716, 426], [690, 410], [640, 378], [582, 330], [522, 282],
  [476, 257], [440, 250], [396, 246]];
const SPLENIUS = [[396, 238], [470, 250], [560, 250], [640, 214], [690, 192], [712, 196], [700, 232], [660, 262],
  [600, 302], [540, 322], [480, 316], [432, 300], [392, 276]];
const COMPLEXUS = [[396, 246], [470, 250], [540, 254], [620, 244], [682, 232], [700, 240], [690, 262], [640, 302],
  [560, 340], [490, 330], [436, 302], [394, 284]];
// les intersections tendineuses : quatre traits obliques sur la partie dorsale (aucun angle établi)
const INTERSECTIONS = [[[492, 246], [470, 296]], [[538, 250], [516, 306]], [[584, 246], [562, 310]], [[630, 238], [608, 300]]];

// Les vertèbres cervicales, dessinées comme le module les dessine en grand (bloc « Squelette »).
const VERT = C.VERT, EPINE = C.EPINE, ORDRE = Object.keys(VERT);
function vertebre(nom) {
  const i = ORDRE.indexOf(nom), c = VERT[nom];
  const av = VERT[ORDRE[i - 1]] || add(c, unit(VERT[ORDRE[i + 1]], c), 36);
  const ap = VERT[ORDRE[i + 1]];
  const t = unit(av, ap), n = [t[1], -t[0]];
  const pas = Math.hypot(ap[0] - av[0], ap[1] - av[1]) / 2;
  const P = (a, b) => [c[0] + t[0] * a + n[0] * b, c[1] + t[1] * a + n[1] * b];
  const H = nom === 'C1' ? 20 : 22, a = (pas - 3) / 2;
  let corps = [P(-a, -H / 2), P(a - 4, -H / 2), P(a + 2, -H / 2 + 5), P(a, H / 2), P(a - 3, H / 2 + 9),
    P(-a + 5, H / 2 + 9), P(-a - 1, H / 2 + 3), P(-a - 2, -H / 2 + 5)];
  if (nom === 'C1') corps = [P(-a, -10), P(a, -12), P(a + 4, 4), P(a - 2, 20), P(-a + 4, 22), P(-a - 5, 8)];
  if (nom === 'C2') corps = [P(-a - 4, -H / 2 + 2), P(a - 4, -H / 2), P(a + 2, -H / 2 + 5), P(a, H / 2), P(a + 2, H / 2 + 16),
    P(-a + 2, H / 2 + 18), P(-a - 8, H / 2 + 6), P(-a - 6, -2)];
  if (nom === 'C6') corps.splice(1, 0, P(-a + 6, -H / 2 - 9), P(a - 8, -H / 2 - 9));
  let epine = null;
  if (EPINE[nom] && nom !== 'C2') {
    const Lg = pas - 3, base = P(1, 11), tip = EPINE[nom];
    const u = unit(base, tip), m = [u[1], -u[0]], Lsp = Math.hypot(tip[0] - base[0], tip[1] - base[1]);
    const lb = Lg * 0.45, lt = Lg * 0.3;
    const Q = (x, y) => [base[0] + u[0] * x + m[0] * y, base[1] + u[1] * x + m[1] * y];
    epine = [Q(0, lb / 2), Q(Lsp * 0.8, lt / 2), Q(Lsp - lt * 0.3, lt / 2), Q(Lsp + 1, 0), Q(Lsp - lt * 0.3, -lt / 2), Q(Lsp * 0.8, -lt / 2), Q(0, -lb / 2)];
  }
  return { nom, corps, epine, n };
}
const CERVICALES = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7'].map(vertebre);
// la crête de l'axis : le point le plus dorsal de son corps
const C2 = CERVICALES[1];
const CRETE_AXIS = C2.corps.reduce((b, p) => (p[0] * C2.n[0] + p[1] * C2.n[1] > b[0] * C2.n[0] + b[1] * C2.n[1] ? p : b));
const POINTES = [CRETE_AXIS, EPINE.C3, EPINE.C4, EPINE.C5, EPINE.C6, EPINE.C7];

// Le ligament nuchal (SISSON p. 244, fig. 256). Le cordon court sous le bord du dessus du cou, rond
// et mince à l'atlas, de plus en plus large et plat de l'axis vers l'arrière. La lame part du
// cordon ; son bord avant est libre, en creux, du cordon à la crête de l'axis ; elle s'attache aux
// pointes des épines ; derrière, elle file vers l'épine de la 1re dorsale, au-delà du trait.
const CORDON_HAUT = C.dense([[394, 234], [440, 241], [470, 246], [540, 248], [600, 232], [652, 200], [706, 174], [744, 166]], 2, false);
const largeurCordon = x => (x < 466 ? 5 + (x - 394) / 72 : 6 + 17 * Math.min(1, (x - 466) / 240));
const CORDON_BAS = CORDON_HAUT.map((p, i) => {
  const t = unit(CORDON_HAUT[Math.max(0, i - 1)], CORDON_HAUT[Math.min(CORDON_HAUT.length - 1, i + 1)]);
  return add(p, [-t[1], t[0]], largeurCordon(p[0]));
});
const surCordon = x => CORDON_BAS.reduce((b, p) => (Math.abs(p[0] - x) < Math.abs(b[0] - x) ? p : b));
const X_LAME = 544;                                      // où le bord libre de la lame quitte le cordon
function festons() {                                     // le bord bas de la lame, d'une pointe à l'autre
  const out = [];
  const pts = [[xCoupe(386), 386], ...POINTES.slice().reverse()];
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i], b = pts[i + 1], m = lerp(a, b, 0.5), u = unit(a, b);
    const c = add(m, [u[1], -u[0]], i === 0 ? 0 : 6);   // un creux vers le cordon entre deux pointes
    for (let s = 0; s < 1; s += 0.2) out.push([0, 1].map(k => (1 - s) * (1 - s) * a[k] + 2 * s * (1 - s) * c[k] + s * s * b[k]));
  }
  out.push(pts[pts.length - 1]);
  return out;
}
const BORD_LIBRE = C.dense([CRETE_AXIS, [494, 266], [514, 258], surCordon(X_LAME)], 2, false);
const LIGAMENT = (() => {
  const haut = CORDON_HAUT, bas = CORDON_BAS;
  const iL = bas.findIndex(p => p[0] >= X_LAME);
  const brut = [...haut, ...festons(), ...BORD_LIBRE.slice(1, -1), ...bas.slice(0, iL + 1).reverse()];
  return garder(garder(brut, ATLAS), COUPE);
})();
const LIMITE_CORDON = CORDON_BAS.filter(p => p[0] >= X_LAME && cote(COUPE, p) * Math.sign(cote(COUPE, DEDANS)) >= 0);
// Les fibres de la lame : du cordon aux 2e, 3e, 4e cervicales ; de l'épine de la 1re dorsale (derrière
// le trait) aux 5e, 6e, 7e. Toutes descendent vers l'avant (fig. 256).
function fibres() {
  const f = [];
  const vers = (pointe, sources) => sources.forEach((s, j) => f.push([s, add(pointe, [(j - 1.5) * 2.2, -2])]));
  const cordon = (x0, x1) => [0, 1, 2, 3].map(j => surCordon(x0 + (x1 - x0) * j / 3));
  const coupe = (y0, y1) => [0, 1, 2, 3].map(j => { const y = y0 + (y1 - y0) * j / 3; return [xCoupe(y) + 2, y]; });
  vers(CRETE_AXIS, cordon(548, 572));
  vers(EPINE.C3, cordon(580, 612));
  vers(EPINE.C4, cordon(620, 660));
  vers(EPINE.C5, coupe(216, 250));
  vers(EPINE.C6, coupe(262, 300));
  vers(EPINE.C7, coupe(312, 346));
  return f;
}

module.exports = (h) => {
  // ─── Mise en place ───
  const CADRE1 = [352, 112, 822, 700];             // le cou, le garrot, l'épaule, la poitrine
  const place1 = z => C.placer(z, { cadre: CADRE1 });

  // Trames : une par couche, bien différentes (règle 5).
  const motifs = id => {
    const L = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${NOIR}" stroke-width="0.5"/>`;
    return `<defs>`
      + `<pattern id="${id}-trap" width="3.2" height="3.2" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">${L(0, 0, 0, 3.2)}</pattern>`
      + `<pattern id="${id}-splen" width="4" height="4" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="0.7" fill="${NOIR}" stroke="none"/><circle cx="3" cy="3" r="0.7" fill="${NOIR}" stroke="none"/></pattern>`
      + `<pattern id="${id}-compl" width="5" height="5" patternUnits="userSpaceOnUse">${L(0, 0, 5, 0)}${L(0, 0, 0, 5)}</pattern>`
      + `<pattern id="${id}-chair" width="3.2" height="3.2" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">${L(0, 0, 0, 3.2)}</pattern>`
      + `</defs>`;
  };

  // Une couche vue éclatée : sa face (le contour de profil) et, dessous, son épaisseur.
  function chaineBasse(pts) {
    let iL = 0, iR = 0;
    pts.forEach((p, i) => { if (p[0] < pts[iL][0]) iL = i; if (p[0] > pts[iR][0]) iR = i; });
    const n = pts.length, a = [], b = [];
    for (let i = iL; ; i = (i + 1) % n) { a.push(pts[i]); if (i === iR) break; }
    for (let i = iL; ; i = (i - 1 + n) % n) { b.push(pts[i]); if (i === iR) break; }
    const moy = c => c.reduce((s, p) => s + p[1], 0) / c.length;
    return moy(a) > moy(b) ? a : b;
  }
  function plaque(face, epais, remplissage) {
    const ch = chaineBasse(face);
    const bande = [...ch, ...ch.map(p => [p[0], p[1] + epais]).reverse()];
    return [
      epais ? `<path d="${dP(bande, true)}" fill="${BLANC}" ${trait(1.4).replace('fill="none" ', '')}/>` : '',
      `<path d="${dP(face, true)}" fill="${BLANC}" stroke="none"/>`,
      remplissage ? `<path d="${dP(face, true)}" fill="${remplissage}" stroke="none"/>` : '',
      `<path d="${dP(face, true)}" ${trait(1.4)}/>`,
    ].join('\n');
  }

  // Le ligament, face et détail, dans un repère T donné.
  function ligament(T, idc, epais) {
    const face = LIGAMENT.map(T);
    const out = [plaque(face, epais, null)];
    out.push(`<defs><clipPath id="${idc}"><path d="${dP(face, true)}" fill="${BLANC}"/></clipPath></defs>`);
    out.push(`<g clip-path="url(#${idc})">`);
    fibres().forEach(([a, b]) => out.push(`<path d="${dP([T(a), T(b)], false)}" ${trait(0.5)}/>`));
    out.push(`<path d="${dP(LIMITE_CORDON.map(T), false)}" ${trait(0.7)}/>`);
    // le fil du cordon, en long, là où il est assez large pour le porter
    const milieu = CORDON_HAUT.map((p, i) => lerp(p, CORDON_BAS[i], 0.5)).filter(p => p[0] > 470);
    out.push(`<path d="${dP(milieu.map(T), false)}" ${trait(0.5)}/>`);
    out.push('</g>');
    return out.join('\n');
  }

  // ─── Vue 2 : la pile ───
  const COUCHES = [
    { cle: 'trap', face: collierSeul(TRAPEZE), epais: 6 },
    { cle: 'splen', face: collierSeul(SPLENIUS), epais: 3 },
    { cle: 'compl', face: collierSeul(COMPLEXUS), epais: 5 },
    { cle: 'lig', face: LIGAMENT, epais: 0 },
    { cle: 'os', face: null, epais: 0 },
  ];
  // Le chemin de la lame, contre l'os : le long du dessus des corps vertébraux, de l'axis à la 7e,
  // le tour du bout de la 7e, puis le long du dessous vers l'avant. Il passe derrière les épines.
  const proj = (p, u) => p[0] * u[0] + p[1] * u[1];
  const extreme = (pts, u) => pts.reduce((b, p) => (proj(p, u) > proj(b, u) ? p : b));
  const LAME = (() => {
    const m = 9;
    const dessus = CERVICALES.slice(1).map(v => add(extreme(v.corps, v.n), v.n, m));
    const dessous = CERVICALES.slice(2).map(v => add(extreme(v.corps, [-v.n[0], -v.n[1]]), v.n, -m)).reverse();
    const c7 = CERVICALES[6], t7 = [-c7.n[1], c7.n[0]];
    const bout = add(extreme(c7.corps, t7), t7, m + 2);
    return C.dense([...dessus, bout, ...dessous], 2, false);
  })();
  const tousOs = CERVICALES.flatMap(v => [...v.corps, ...(v.epine || [])]);
  function enveloppe(pts) {                         // enveloppe convexe (chaîne monotone)
    const P = pts.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
    const lo = [], hi = [];
    P.forEach(p => { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], p) <= 0) lo.pop(); lo.push(p); });
    P.slice().reverse().forEach(p => { while (hi.length >= 2 && cr(hi[hi.length - 2], hi[hi.length - 1], p) <= 0) hi.pop(); hi.push(p); });
    return lo.slice(0, -1).concat(hi.slice(0, -1));
  }
  COUCHES[4].face = C.dense(enveloppe(tousOs.concat(LAME)), 2, true);

  // profil haut/bas d'une face, par tranches de 3 en x
  const profil = pts => {
    const m = new Map();
    const d = pts.length > 400 ? pts : C.dense(pts, 1.5, true);
    d.forEach(p => { const b = Math.round(p[0] / 3); const v = m.get(b) || [Infinity, -Infinity]; m.set(b, [Math.min(v[0], p[1]), Math.max(v[1], p[1])]); });
    return m;
  };
  const X0 = 388, X1 = 740;
  function pile(z) {
    const G = 16, D = 16;                          // la place des pastilles, à gauche et à droite
    const k = (z.l - G - D - 40) / (X1 - X0);
    const ecart = 12;
    const off = [0];
    for (let i = 1; i < COUCHES.length; i++) {
      const a = profil(COUCHES[i - 1].face), b = profil(COUCHES[i].face);
      let dmax = -Infinity;
      a.forEach((va, x) => { const vb = b.get(x); if (vb) dmax = Math.max(dmax, va[1] + (COUCHES[i - 1].epais + ecart) / k - vb[0]); });
      off.push(off[i - 1] + dmax);
    }
    const yMin = Math.min(...COUCHES[0].face.map(p => p[1]));
    const yMax = Math.max(...COUCHES[4].face.map(p => p[1])) + off[4];
    const kk = Math.min(k, (z.h - 8) / (yMax - yMin));
    const ox = G + 20 + ((z.l - G - D - 40) - (X1 - X0) * kk) / 2;
    const oy = (z.h - (yMax - yMin) * kk) / 2;
    return COUCHES.map((c, i) => q => [(q[0] - X0) * kk + ox, (q[1] + off[i] - yMin) * kk + oy]);
  }

  // ─── Vue 3 : le collier désossé, le ligament à part ───
  const COLLIER_D = C.dense(COLLIER, 2, true);
  function sorti(z) {
    const bx = [Math.min(...COLLIER_D.map(p => p[0])), Math.max(...COLLIER_D.map(p => p[0]))];
    const by = [Math.min(...COLLIER_D.map(p => p[1])), Math.max(...COLLIER_D.map(p => p[1]))];
    const lx = [Math.min(...LIGAMENT.map(p => p[0])), Math.max(...LIGAMENT.map(p => p[0]))];
    const ly = [Math.min(...LIGAMENT.map(p => p[1])), Math.max(...LIGAMENT.map(p => p[1]))];
    const k = Math.min((z.h - 20) / (by[1] - by[0]), (z.l - 140) / (bx[1] - bx[0] + lx[1] - lx[0] + 90));
    const larg = (bx[1] - bx[0] + lx[1] - lx[0] + 90) * k;
    const x0 = (z.l - larg) / 2;
    const Tc = q => [(q[0] - bx[0]) * k + x0, (q[1] - by[0]) * k + (z.h - (by[1] - by[0]) * k) / 2 - 3];
    const xl = x0 + (bx[1] - bx[0] + 90) * k;
    const Tl = q => [(q[0] - lx[0]) * k + xl, (q[1] - ly[0]) * k + z.h * 0.28];
    return { Tc, Tl, k };
  }

  return {
    ref: '62-17',
    titre: 'Le collier',
    desc: "Trois vues du cou d'une carcasse d'orignal écorchée, sans la tête, de profil gauche. "
      + "Première vue : l'avant de la carcasse, le collier en trame, de l'atlas, où la tête a été retirée, au trait droit "
      + "qui passe entre la dernière vertèbre cervicale et la première dorsale, parallèle à la première côte ; dessous, "
      + "la limite de l'épaule. Deuxième vue : le cou en couches écartées, posées l'une au-dessus de l'autre, de la plus "
      + "externe à la plus profonde : le trapèze, le splénius, le complexus avec ses intersections tendineuses, le "
      + "ligament nuchal, cordon le long du dessus puis lame dont les fibres descendent vers l'avant jusqu'aux épines, et "
      + "les sept vertèbres cervicales, avec la flèche de la lame du couteau qui en fait le tour, contre l'os. Troisième "
      + "vue : le collier désossé et, à part, le ligament nuchal retiré. Aucune flèche de grain : le sens des fibres des "
      + "muscles du cou n'est établi par aucune source.",
    format: 'pleine',
    disposition: [['ou', 'couches'], ['sorti']],
    hauteurs: [2.2, 1.1],
    largeurs: [[1, 1.3], [1]],
    vues: {
      ou: {
        titre: 'Où il est',
        dessin: z => {
          const p = place1(z);
          C.MUSCLES.__collier6217 = { nom: 'collier', latin: '', pts: COLLIER };
          let s;
          try {
            s = C.dessiner(h, p, {
              id: 'v1', fondOs: false, loin: 'gris',
              os: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'cote1', 'cote2', 'cote3', 'cote4',
                'sternum', 'omoplate', 'cartilageOmoplate', 'humerus'],
              osForts: ['C7', 'cote1'],
              valeur: { muscles: ['__collier6217'], trame: 'gris' },
            });
          } finally { delete C.MUSCLES.__collier6217; }
          const coupe = [add(COUPE[0], unit(COUPE[1], COUPE[0]), 12), COUPE[1]].map(p.T);
          return [s, `<g clip-path="url(#v1-corps)"><path d="${dP(coupe, false)}" ${COUTEAU}/></g>`,
            `<path d="${dP(C.dense(COLLIER, 2, true).map(p.T), true)}" ${trait(0.7)}/>`].join('\n');
        },
        renvois: z => {
          const p = place1(z);
          return [
            { n: 1, texte: 'collier', rond: [12, p.pt([0, 470])[1]], cible: p.pt([520, 360]) },
            { n: 2, texte: 'trait entre 7e cervicale et 1re dorsale', rond: [p.pt([790, 0])[0], 14], cible: p.pt([xCoupe(250), 250]) },
            { n: 3, texte: 'première côte, parallèle au trait', rond: [z.l - 12, p.pt([0, 560])[1]], cible: p.pt([648, 530]) },
          ];
        },
      },
      couches: {
        titre: 'Les couches, du dehors vers l’os',
        dessin: z => {
          const T = pile(z);
          const out = [motifs('v2')];
          out.push(plaque(COUCHES[0].face.map(T[0]), COUCHES[0].epais, 'url(#v2-trap)'));
          out.push(plaque(COUCHES[1].face.map(T[1]), COUCHES[1].epais, 'url(#v2-splen)'));
          out.push(plaque(COUCHES[2].face.map(T[2]), COUCHES[2].epais, 'url(#v2-compl)'));
          out.push(`<defs><clipPath id="v2-cx"><path d="${dP(COUCHES[2].face.map(T[2]), true)}" fill="${BLANC}"/></clipPath></defs>`);
          out.push(`<g clip-path="url(#v2-cx)">${INTERSECTIONS.map(l => `<path d="${dP(l.map(T[2]), false)}" ${trait(1.4)}/>`).join('')}</g>`);
          out.push(ligament(T[3], 'v2-lig', COUCHES[3].epais));
          out.push(h.geste(dP(LAME.map(T[4]), false)));   // la charte : la lame qui fait le tour de l'os, en rouge
          CERVICALES.forEach(v => {
            if (v.epine) out.push(`<path d="${dP(v.epine.map(T[4]), true)}" fill="${BLANC}" ${trait(1.4).replace('fill="none" ', '')}/>`);
            out.push(`<path d="${dP(v.corps.map(T[4]), true)}" fill="${BLANC}" ${trait(1.4).replace('fill="none" ', '')}/>`);
          });
          return out.join('\n');
        },
        renvois: z => {
          const T = pile(z);
          const g = 12;
          const milieu = (i, q) => T[i](q);
          return [
            { n: 4, texte: 'trapèze, M. trapezius', rond: [g, milieu(0, [0, 270])[1]], cible: milieu(0, [560, 270]) },
            { n: 5, texte: 'splénius, M. splenius', rond: [g, milieu(1, [0, 280])[1]], cible: milieu(1, [450, 280]) },
            { n: 6, texte: 'complexus, M. semispinalis capitis', rond: [g, milieu(2, [0, 290])[1]], cible: milieu(2, [460, 296]) },
            { n: 7, texte: 'ligament nuchal : cordon, puis lame', rond: [z.l - 12, milieu(3, [0, 196])[1]], cible: milieu(3, [676, 196]) },
            { n: 8, texte: 'vertèbres cervicales, atlas à 7e', rond: [g, milieu(4, [0, 300])[1]], cible: milieu(4, [466, 300]) },
            { n: 9, texte: 'la lame fait le tour, contre l’os', rond: [z.l - 12, Math.min(z.h - 14, milieu(4, [0, 400])[1])], cible: milieu(4, [668, 430]) },
          ];
        },
      },
      sorti: {
        titre: 'Le collier désossé, le ligament à part',
        dessin: z => {
          const { Tc, Tl } = sorti(z);
          return [motifs('v3'), plaque(COLLIER_D.map(Tc), 6, 'url(#v3-chair)'), ligament(Tl, 'v3-lig', 0)].join('\n');
        },
        renvois: z => {
          const { Tc, Tl } = sorti(z);
          return [
            { n: 10, texte: 'collier désossé : braisé, bouillon, haché', rond: [Math.max(12, Tc([372, 0])[0] - 44), Tc([0, 330])[1]], cible: Tc([470, 380]) },
            { n: 11, texte: 'ligament nuchal retiré : bloque le hachoir', rond: [Math.min(z.l - 12, Tl([705, 0])[0] + 44), Tl([0, 330])[1]], cible: Tl([620, 330]) },
          ];
        },
      },
    },
  };
};
