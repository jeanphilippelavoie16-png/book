// Planche 62-19 — le jarret avant.
// Chapitre 62, tableau 5.1 (région 1, « sous le coude ») et tableau 5.4 (jarret avant : fléchisseurs de
// l'avant-bras, collagène maximal) ; ch. 64, étape 6 (se détache au couteau à l'articulation du coude,
// en ouvrant la face arrière).
// Documentation : suivi/62-documentation-planches.md, section 22 (et 2, 3, 5, « Base commune »).
//
// Vue 1 — où il est : l'avant de la carcasse commune, le jarret avant (du coude au carpe : radius et
//   cubitus, CEE-ONU 9126) en trame de points, la même que la région 1 de la 62-02 ; repères : l'olécrane,
//   que la coupe contourne (ACIA 4.6), le radius, le carpe.
// Vue 2 — ce qu'il y a dedans : la patte avant de profil gauche sous le coude, relevée sur Ellenberger,
//   das Rind, Tafel VI, fig. X (= Sisson fig. 305, face externe, légendée) et posée dans la patte du module.
//   Devant, les extenseurs (a, b, c, d de la figure, et le petit extenseur oblique f qui les croise en bas) ;
//   derrière, les fléchisseurs (e, ulnaris lateralis, « lateral flexor of the carpus », rangé par Sisson
//   dans la « Flexor Division » ; f', chef ulnaire du fléchisseur ulnaire du carpe). Les ventres finissent
//   en tendons avant le carpe. Os cachés en tireté ; le carpe et le haut du canon, visibles. La coupe
//   (pointillé) suit la limite du coude de la base commune : au-dessus de l'olécrane, par-dessus le joint ;
//   la flèche entre par la face arrière. Le trait mixte marque la tranche de la vue 3.
// Vue 3 — le jarret en tranche : Ellenberger, das Rind, Tafel 13, fig. 58 (coupe de l'avant-bras du bœuf ;
//   devant à gauche, face interne en haut), relevée sur une grille : l'os (radius, avec le cubitus en coin
//   vers l'arrière) et sa moelle, les faisceaux chacun dans sa gaine, la gaine qui enveloppe le tout.
//   La légende de la fig. 58 n'a pas été trouvée : les faisceaux ne sont pas nommés un par un.
//
// Pas de grain (non établi pour les jarrets), pas de point de prélèvement des tendons (ch. 103), rien
// sous le carpe au-delà du haut du canon, aucune cote. Trame de points = la viande du jarret.
const C = require('./_carcasse-orignal');

const NOIR = '#1A1A1A', BLANC = '#FFFFFF';
const f1 = v => Math.round(v * 10) / 10;
const D = (pts, ferme = false) => 'M' + pts.map(p => `${f1(p[0])} ${f1(p[1])}`).join(' L') + (ferme ? ' Z' : '');
const trait = (ep, extra = '') => `fill="none" stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="round"${extra}`;
const rempli = (fond, ep, extra = '') => `fill="${fond}" stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round"${extra}`;
const TIRET = ' stroke-dasharray="4 3"';
const MIXTE = ' stroke-dasharray="9 2.5 1.5 2.5"';
const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

// la trame de la viande : des points (la trame de la région 1 sur la 62-02)
const points = id => `<pattern id="${id}" width="4" height="4" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="0.7" fill="${NOIR}" stroke="none"/><circle cx="3" cy="3" r="0.7" fill="${NOIR}" stroke="none"/></pattern>`;
// l'os en coupe : un trait serré, tourné par le motif
const osCoupe = id => `<pattern id="${id}" width="2.2" height="2.2" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="2.2" stroke="${NOIR}" stroke-width="0.5"/></pattern>`;
const clipRect = (id, z) => `<clipPath id="${id}"><rect x="0" y="0" width="${z.l}" height="${z.h}"/></clipPath>`;

// ─── La patte avant du module, en coordonnées (t, s) ─────────────────────────────────────
// t va du coude (0) au haut du carpe (1) ; s va du bord avant de la patte (0) à son bord arrière (1).
// Les deux bords sont ceux de la silhouette commune : un muscle posé en (t, s) suit la patte de
// l'orignal, pas celle du bœuf. Hors de [0, 1], les bords se prolongent en droite (la silhouette et
// la coupe du coude découpent ce qui dépasse).
const SIL = C.dense(C.SILHOUETTE, 2, true);
const proche = q => SIL.reduce((m, p, i) => (Math.hypot(p[0] - q[0], p[1] - q[1]) < Math.hypot(SIL[m][0] - q[0], SIL[m][1] - q[1]) ? i : m), 0);
// le plus court chemin de a à b le long de la silhouette (elle est fermée : on peut passer par le début)
function troncon(a, b) {
  const n = SIL.length, i = proche(a), j = proche(b), av = (j - i + n) % n, ar = (i - j + n) % n, out = [];
  if (av <= ar) for (let k = 0; k <= av; k++) out.push(SIL[(i + k) % n]);
  else for (let k = 0; k <= ar; k++) out.push(SIL[(i - k + n) % n]);
  return out;
}
function abscisse(poly) { const c = [0]; for (let i = 1; i < poly.length; i++) c.push(c[i - 1] + Math.hypot(poly[i][0] - poly[i - 1][0], poly[i][1] - poly[i - 1][1])); return c; }
function a(poly, cum, t) {
  const Lt = cum[cum.length - 1], n = poly.length;
  const prolonge = (p, q, u) => { const dx = p[0] - q[0], dy = p[1] - q[1], m = Math.hypot(dx, dy) || 1; return [p[0] + dx / m * u * Lt, p[1] + dy / m * u * Lt]; };
  if (t < 0) return prolonge(poly[0], poly[Math.min(6, n - 1)], -t);
  if (t > 1) return prolonge(poly[n - 1], poly[Math.max(0, n - 7)], t - 1);
  const L = Lt * t;
  let i = 1; while (i < n - 1 && cum[i] < L) i++;
  return lerp(poly[i - 1], poly[i], (L - cum[i - 1]) / ((cum[i] - cum[i - 1]) || 1));
}
const AVANT = troncon([666, 716], [681, 965]), CA = abscisse(AVANT);     // devant : du coude au carpe
const ARRIERE = troncon([800, 678], [738, 966]), CR = abscisse(ARRIERE);  // derrière : de la pointe du coude au carpe
const P = ([t, s]) => lerp(a(AVANT, CA, t), a(ARRIERE, CR, t), s);

// ─── Ellenberger, das Rind, Tafel VI, fig. X (face externe de l'avant-bras gauche) ──────
// Relevé sur une grille, dans le repère de l'agrandissement 2× du recadrage (160, 290)–(420, 960) de
// la planche. Le joint du coude est à y = 240, le haut du carpe à y = 875 ; F et B sont les bords avant
// et arrière de l'avant-bras, lus sur la figure, qui ramènent chaque point en (t, s).
const FX = { y: [240, 300, 400, 500, 600, 700, 800, 875], F: [103, 100, 115, 135, 155, 168, 172, 170], B: [485, 455, 420, 410, 405, 400, 388, 385] };
function interp(ys, vs, y) {
  if (y <= ys[0]) return vs[0];
  if (y >= ys[ys.length - 1]) return vs[vs.length - 1];
  let i = 1; while (ys[i] < y) i++;
  return vs[i - 1] + (vs[i] - vs[i - 1]) * (y - ys[i - 1]) / (ys[i] - ys[i - 1]);
}
const fx = p => { const F = interp(FX.y, FX.F, p[1]), B = interp(FX.y, FX.B, p[1]); const q = [(p[1] - 240) / 635, (p[0] - F) / (B - F)]; return p[2] ? [...q, p[2]] : q; };
const PU = p => { const q = P(fx(p)); return p[2] ? [...q, p[2]] : q; };   // point de la figure → repère U

// Les ventres (lettres de Sisson fig. 305 : a, b, c, d extenseurs ; e, f' fléchisseurs). Chaque couture
// est une ligne de la figure, lissée une fois dans le repère de la figure puis ramenée dans la patte :
// deux ventres voisins partagent exactement le même trait. Les points en x = 40 ou 540 sont hors de la
// patte, la silhouette les découpe ; y = 130 est au-dessus du coude, la coupe les découpe.
// Le petit extenseur oblique (f), qui croise les tendons au bas de l'avant-bras, n'est pas dessiné :
// à cette échelle il brouille le passage des ventres aux tendons.
const lisseFig = pts => C.dense(pts, 3, false);
const rev = l => l.slice().reverse();
const LIG = {
  AB1: lisseFig([[180, 130], [180, 240], [185, 300], [190, 400], [198, 500], [203, 600], [206, 660]]),   // a | b
  AB2: lisseFig([[206, 660], [207, 700], [204, 760], [178, 806]]),                                  // bout de a
  BC1: lisseFig([[228, 130], [228, 240], [230, 300], [232, 400], [238, 500]]),                       // b | c
  BC2: lisseFig([[238, 500], [240, 560], [240, 600]]),
  bBout: lisseFig([[240, 600], [236, 630], [222, 652], [206, 660]]),                               // bout de b
  CD: lisseFig([[250, 130], [250, 240], [262, 300], [268, 400], [275, 500]]),                       // c | d
  cBout: lisseFig([[275, 500], [268, 524], [254, 544], [243, 530], [238, 500]]),                    // bout de c
  dAvant: lisseFig([[275, 500], [280, 600], [285, 700], [298, 742]]),
  dBout: lisseFig([[298, 742], [313, 735], [324, 712]]),                                            // bout de d
  DE1: lisseFig([[318, 130], [320, 260], [322, 300], [322, 400], [328, 500], [330, 600], [325, 700], [324, 712]]),  // d | e
  DE2: lisseFig([[324, 712], [318, 800], [312, 860]]),
  eBout: lisseFig([[312, 860], [330, 874], [352, 879], [378, 868], [398, 856]]),                    // bout de e
  EF: lisseFig([[390, 130], [390, 200], [395, 240], [400, 300], [405, 400], [412, 445]]),           // e | f'
};
const VENTRES = {
  a: [[40, 130], ...LIG.AB1, ...LIG.AB2.slice(1), [40, 806]],
  b: [...LIG.BC1, ...LIG.BC2.slice(1), ...LIG.bBout.slice(1), ...rev(LIG.AB1).slice(1)],
  c: [...LIG.CD, ...LIG.cBout.slice(1), ...rev(LIG.BC1).slice(1)],
  d: [...LIG.CD, ...LIG.dAvant.slice(1), ...LIG.dBout.slice(1), ...rev(LIG.DE1).slice(1)],
  e: [...LIG.DE1, ...LIG.DE2.slice(1), ...LIG.eBout.slice(1), [540, 856], [540, 445], ...rev(LIG.EF)],
  fp: [...LIG.EF, [540, 445], [540, 130]],
};
// les coutures entre groupes et les bouts des ventres en 0,7 ; les coutures dans un groupe en 0,5
const COUTURES = [
  ['AB1', 0.5], ['BC1', 0.5], ['BC2', 0.5], ['CD', 0.5], ['dAvant', 0.5], ['EF', 0.5],
  ['DE1', 0.7], ['DE2', 0.7], ['AB2', 0.7], ['bBout', 0.7], ['cBout', 0.7], ['dBout', 0.7], ['eBout', 0.7],
];
// Les tendons : ligne médiane sur la figure, partie de l'intérieur du ventre (le ventre la recouvre),
// jusqu'au haut du carpe, puis dans le repère U sur le carpe et le haut du canon. Le tendon de a finit
// sur le haut du canon (12', « metacarpal tuberosity ») ; celui de e sur l'os accessoire du carpe (11) ;
// b, c, d continuent sous le cadre de la vue (le bas de patte n'est pas documenté).
const TENDONS = [
  { fig: [[190, 760], [182, 830], [176, 875]], u: [[686, 990], [692, 1010], [697, 1024]] },
  { fig: [[222, 630], [217, 700], [211, 800], [205, 875]], u: [[693, 995], [697, 1030], [699, 1080]] },
  { fig: [[256, 515], [257, 600], [258, 700], [252, 800], [242, 875]], u: [[703, 995], [705, 1030], [706, 1080]] },
  { fig: [[308, 715], [298, 800], [290, 875]], u: [[713, 995], [713, 1030], [713, 1080]] },
  { fig: [[348, 855], [352, 878]], u: [[728, 971], [733, 977]] },
];
function bandeU(med, w) {
  const g = [], d = [];
  med.forEach((p, i) => {
    const q0 = med[Math.max(0, i - 1)], q1 = med[Math.min(med.length - 1, i + 1)];
    const dx = q1[0] - q0[0], dy = q1[1] - q0[1], L = Math.hypot(dx, dy) || 1;
    g.push([p[0] + dy / L * w / 2, p[1] - dx / L * w / 2]); d.push([p[0] - dy / L * w / 2, p[1] + dx / L * w / 2]);
  });
  return g.concat(d.reverse());
}
const T_TRANCHE = 0.3;   // où passe la tranche (fig. 60 de la même planche 13 : le tiers haut de l'avant-bras)

// ─── La tranche : Ellenberger, das Rind, Tafel 13, fig. 58, relevée sur une grille ─────────
// Repère de relevé : l'agrandissement 4× du recadrage (580, 495)–(870, 700) de la planche ; x de 92
// (devant) à 1108 (derrière), y de 103 (face interne) à 774 (face externe).
const T3 = {
  dehors: [[92, 520], [96, 455], [110, 400], [132, 345], [165, 300], [210, 268], [255, 250], [300, 230], [350, 203], [400, 178],
    [450, 157], [500, 138], [550, 123], [600, 112], [650, 106], [700, 103], [750, 103], [800, 106], [850, 112], [900, 124],
    [950, 142], [1000, 168], [1040, 205], [1070, 250], [1090, 300], [1102, 360], [1108, 420], [1106, 480], [1098, 540],
    [1084, 595], [1060, 645], [1025, 685], [975, 715], [910, 738], [840, 753], [760, 763], [680, 770], [600, 774], [520, 772],
    [450, 763], [390, 748], [330, 728], [290, 712], [240, 700], [190, 683], [148, 655], [118, 615], [100, 570]],
  // l'os : le radius, et le cubitus en coin vers l'arrière et le dehors
  os: [[396, 194], [436, 188], [478, 192], [503, 204], [524, 234], [544, 300], [560, 380], [590, 450], [630, 490], [670, 520],
    [705, 538], [730, 550, 'c'], [706, 560], [650, 557], [592, 553], [552, 551], [512, 560], [472, 567], [432, 566], [398, 552],
    [370, 524], [352, 470], [340, 400], [338, 330], [346, 268], [366, 220]],
  moelle: [[380, 380], [386, 330], [410, 305], [450, 299], [490, 316], [512, 360], [520, 430], [515, 488], [492, 518], [452, 523],
    [415, 503], [392, 456]],
  // les gaines entre les faisceaux (traits de séparation de la figure)
  gaines: [
    [[368, 560], [345, 620], [318, 688], [300, 730]],
    [[482, 567], [482, 640], [462, 700], [420, 765]],
    [[560, 552], [572, 590], [630, 606], [690, 598], [716, 586], [728, 552]],
    [[572, 590], [552, 660], [547, 785]],
    [[716, 586], [722, 660], [735, 785]],
    [[728, 550], [780, 546], [880, 542], [980, 539], [1060, 538], [1120, 538]],
    [[538, 215], [562, 272], [580, 330], [595, 400], [603, 450], [608, 470]],
    [[718, 210], [738, 262], [745, 320], [722, 380], [692, 440], [652, 507]],
    [[500, 190], [540, 220], [600, 226], [690, 220], [745, 203]],
    [[722, 210], [760, 168], [800, 120]],
    [[745, 205], [800, 222], [870, 255], [940, 305], [1000, 362], [1048, 415]],
    [[745, 320], [850, 320], [930, 345], [1000, 385], [1048, 415], [1120, 425]],
  ],
};
const BORNES3 = [92, 103, 1108, 774];

module.exports = (h) => {
  const CAD1 = [362, 132, 880, 1380];
  const CAD2 = [628, 612, 872, 1040];
  const p1 = z => C.placer(z, { cadre: CAD1, ancre: 'gauche' });
  const p2 = z => C.placer(z, { cadre: CAD2 });
  const p3 = z => {
    const k = Math.min((z.l - 12) / (BORNES3[2] - BORNES3[0]), (z.h - 70) / (BORNES3[3] - BORNES3[1]));
    const ox = (z.l - (BORNES3[2] - BORNES3[0]) * k) / 2, oy = (z.h - (BORNES3[3] - BORNES3[1]) * k) / 2;
    return { k, T: q => [ox + (q[0] - BORNES3[0]) * k, oy + (q[1] - BORNES3[1]) * k] };
  };

  // ── vue 1 : où il est ──
  function vue1(z) {
    const p = p1(z), T = p.T;
    const L = (pts, ferme = true) => C.dense(pts, 3, ferme).map(T);
    const out = [C.dessiner(h, p, { id: 'v1', loin: 'gris', os: ['omoplate', 'humerus', 'metacarpe', 'phalangesAvant', 'onglonAvant'] })];
    // le jarret avant, du coude au bas du carpe, en trame de points découpée par la silhouette
    const jarret = [...C.LIMITES.coude, [900, 700], [900, 1006], [740, 1008], [600, 1013], [600, 713]];
    out.push(`<defs>${points('v1-p')}</defs>`);
    out.push(`<g clip-path="url(#v1-vue)"><g clip-path="url(#v1-corps)"><path d="${D(jarret.map(T), true)}" fill="url(#v1-p)" stroke="none"/></g>`);
    // la limite au coude, en trait appuyé
    out.push(`<g clip-path="url(#v1-corps)"><path d="${D(C.dense(C.LIMITES.coude, 3).map(T))}" ${trait(1.4)}/></g>`);
    // les os repères par-dessus la trame, en contour seul : radius, cubitus (l'olécrane en haut), carpe
    ['radius', 'cubitus', 'carpe'].forEach(n => out.push(`<path d="${D(L(C.OS[n]), true)}" ${trait(n === 'carpe' ? 0.5 : 0.7)}/>`));
    out.push(`<path d="${D(L(C.SILHOUETTE))}" ${trait(2.4)}/>`);
    out.push('</g>');
    return out.join('\n');
  }

  // ── vue 2 : ce qu'il y a dedans, et le couteau ──
  function vue2(z) {
    const p = p2(z), T = p.T;
    const V = pts => pts.map(PU).map(T);   // déjà lissés dans le repère de la figure
    const L = (pts, ferme = true) => C.dense(pts, 3, ferme).map(T);
    const corps = L(C.SILHOUETTE);
    const out = [];
    // sous la coupe du coude : les masses du jarret s'arrêtent net à la coupe
    const sous = [[560, 1200], [560, 699], ...C.LIMITES.coude, [900, 684], [900, 1200]].map(T);
    const dessus = [[560, 500], [560, 699], ...C.LIMITES.coude, [900, 684], [900, 500]].map(T);
    out.push(`<defs>${clipRect('v2-vue', z)}<clipPath id="v2-corps"><path d="${D(corps, true)}" fill="${BLANC}"/></clipPath><clipPath id="v2-sous"><path d="${D(sous, true)}" fill="${BLANC}"/></clipPath><clipPath id="v2-dessus"><path d="${D(dessus, true)}" fill="${BLANC}"/></clipPath>${points('v2-p')}</defs>`);
    out.push(`<g clip-path="url(#v2-vue)">`);
    out.push(`<path d="${D(corps, true)}" fill="${BLANC}" stroke="none"/>`);
    out.push(`<g clip-path="url(#v2-corps)">`);
    // le carpe et le haut du canon : visibles, sous les tendons
    out.push(`<path d="${D(L(C.OS.metacarpe), true)}" ${rempli(BLANC, 0.5)}/>`);
    out.push(`<path d="${D(L(C.OS.carpe), true)}" ${rempli(BLANC, 0.5)}/>`);
    out.push(`<g clip-path="url(#v2-sous)">`);
    // les tendons, en blanc : ils partent de l'intérieur des ventres, qui les recouvrent
    TENDONS.forEach(e => {
      const med = C.dense(e.fig.map(PU).concat(e.u), 3, false);
      out.push(`<path d="${D(bandeU(med, 8).map(T), true)}" ${rempli(BLANC, 0.7)}/>`);
    });
    // les ventres : viande en points, sur un fond blanc qui cache le départ des tendons
    ['a', 'b', 'c', 'd', 'e', 'fp'].forEach(m => {
      const q = D(V(VENTRES[m]), true);
      out.push(`<path d="${q}" fill="${BLANC}" stroke="none"/>`, `<path d="${q}" fill="url(#v2-p)" stroke="none"/>`);
    });
    // les coutures, chacune tracée une fois
    COUTURES.forEach(([n, ep]) => out.push(`<path d="${D(LIG[n].map(PU).map(T))}" ${trait(ep)}/>`));
    // les os de l'avant-bras, cachés sous la viande : en tireté
    ['radius', 'cubitus'].forEach(n => out.push(`<path d="${D(L(C.OS[n]), true)}" ${trait(0.7, TIRET)}/>`));
    out.push('</g>');
    // au-dessus de la coupe : l'humérus, caché, en tireté ; la coupe passe à son extrémité (ACIA 4.6)
    out.push(`<g clip-path="url(#v2-dessus)"><path d="${D(L(C.OS.humerus), true)}" ${trait(0.7, TIRET)}/></g>`);
    out.push('</g>');
    // le couteau : la coupe au coude (pointillé), qui contourne l'olécrane
    out.push(`<g clip-path="url(#v2-corps)"><path d="${D(C.dense(C.LIMITES.coude, 3).map(T))}" ${trait(1.4, ' stroke-dasharray="5 3"')}/></g>`);
    // où passe la tranche de la vue 3 : trait mixte, qui déborde un peu de la patte
    const tA = P([T_TRANCHE, -0.34]), tB = P([T_TRANCHE, 1.30]), tA2 = P([T_TRANCHE, -0.2]), tB2 = P([T_TRANCHE, 1.16]);
    out.push(`<path d="${D([T(tA2), T(tB2)])}" ${trait(0.5, MIXTE)}/>`);
    out.push(`<path d="${D([T(tA), T(tA2)])}" ${trait(1.4)}/>`, `<path d="${D([T(tB2), T(tB)])}" ${trait(1.4)}/>`);
    out.push(`<path d="${D(corps, true)}" ${trait(2.4)}/>`);
    out.push('</g>');
    // la flèche du geste : le couteau entre par la face arrière du coude
    const a0 = T([858, 718]), a1 = T([813, 689]);
    out.push(h.geste(`M${f1(a0[0])} ${f1(a0[1])} L${f1(a1[0])} ${f1(a1[1])}`));   // la charte : en rouge
    return out.join('\n');
  }

  // ── vue 3 : la tranche ──
  function vue3(z) {
    const { T } = p3(z);
    const L = (pts, ferme = true) => C.dense(pts, 4, ferme).map(T);
    const dehors = L(T3.dehors);
    // la gaine qui enveloppe l'avant-bras : un second trait, en retrait du premier
    const n = dehors.length, dedans = dehors.map((q, i) => {
      const a0 = dehors[(i - 1 + n) % n], a1 = dehors[(i + 1) % n];
      const dx = a1[0] - a0[0], dy = a1[1] - a0[1], Lg = Math.hypot(dx, dy) || 1;
      return [q[0] - dy / Lg * 2.6, q[1] + dx / Lg * 2.6];
    });
    const out = [];
    out.push(`<defs><clipPath id="v3-dedans"><path d="${D(dedans, true)}" fill="${BLANC}"/></clipPath>${points('v3-p')}${osCoupe('v3-os')}</defs>`);
    out.push(`<path d="${D(dedans, true)}" fill="url(#v3-p)" stroke="none"/>`);
    out.push(`<g clip-path="url(#v3-dedans)">`);
    const liseré = pts => `<path d="${D(pts)}" fill="none" stroke="${BLANC}" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"/>`;
    T3.gaines.forEach(g => out.push(liseré(L(g, false)), `<path d="${D(L(g, false))}" ${trait(0.7)}/>`));
    out.push('</g>');
    out.push(`<path d="${D(L(T3.os), true)}" ${rempli('url(#v3-os)', 1.4)}/>`);
    out.push(`<path d="${D(L(T3.moelle), true)}" ${rempli(BLANC, 0.7)}/>`);
    out.push(`<path d="${D(dedans, true)}" ${trait(0.5)}/>`);
    out.push(`<path d="${D(dehors, true)}" ${trait(2.4)}/>`);
    return out.join('\n');
  }

  return {
    ref: '62-19',
    titre: 'Le jarret avant',
    desc: "Carcasse d'orignal écorchée, sans la tête, profil gauche. À gauche, l'avant de la carcasse : le jarret avant, "
      + "du coude au bas du carpe, en trame de points ; repères : l'olécrane, la pointe du coude, que la coupe contourne par "
      + "le dessus, le radius, le carpe. Au centre, la patte sous le coude de plus près : devant, les extenseurs, dont les "
      + "ventres finissent en tendons qui passent devant le carpe ; derrière, les fléchisseurs, dont l'un finit sur l'os en "
      + "saillie à l'arrière du carpe. Os de l'avant-bras cachés en tireté. Une flèche entre par la face arrière du coude, la "
      + "coupe en pointillé passe au-dessus de l'olécrane et du joint ; un trait mixte marque la tranche de droite. À droite, "
      + "le jarret en tranche, le devant à gauche et la face interne en haut : l'os et sa moelle, la viande en faisceaux, "
      + "chacun dans sa gaine, et la gaine qui enveloppe le tout.",
    format: 'demi',
    disposition: [['ou', 'dedans', 'tranche']],
    largeurs: [[120, 180, 256]],
    vues: {
      ou: {
        dessin: vue1,
        renvois: z => { const p = p1(z); return [
          { n: 1, texte: 'coude : la coupe contourne l’olécrane', rond: [z.l - 12, p.pt([0, 760])[1]], cible: p.pt([776, 648]) },
          { n: 2, texte: 'radius', rond: [12, p.pt([0, 850])[1]], cible: p.pt([704, 850]) },
          { n: 3, texte: 'carpe', rond: [12, p.pt([0, 1060])[1]], cible: p.pt([706, 990]) },
        ]; },
      },
      dedans: {
        dessin: vue2,
        renvois: z => { const T = p2(z).T; const Q = q => T(PU(q)); return [
          { n: 4, texte: 'extenseurs, devant', rond: [12, 70], cible: Q([150, 420]) },
          { n: 5, texte: 'fléchisseurs, derrière', rond: [z.l - 12, 150], cible: Q([368, 540]) },
          { n: 6, texte: 'tendons : les ventres finissent avant le carpe', rond: [12, z.h - 60], cible: Q([257, 740]) },
          { n: 7, texte: 'où passe la tranche', rond: [z.l - 12, 95], cible: T(P([T_TRANCHE, 1.08])) },
        ]; },
      },
      tranche: {
        dessin: vue3,
        renvois: z => { const { T } = p3(z); return [
          { n: 8, texte: 'radius et cubitus, et la moelle', rond: [14, 14], cible: T([400, 250]) },
          { n: 9, texte: 'une gaine autour de chaque faisceau', rond: [z.l / 2, z.h - 12], cible: T([640, 604]) },
        ]; },
      },
    },
  };
};
