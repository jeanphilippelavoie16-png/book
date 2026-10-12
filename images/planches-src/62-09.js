// Planche 62-09 — le jarret arrière et le tendon d'Achille.
// Chapitre 62, tableau 5.1 (région 1, « sous le genou ») et tableau 5.2 (jarret arrière :
// gastrocnémien, fléchisseurs, tendon d'Achille ; collagène maximal, gaines partout).
// Documentation : suivi/62-documentation-planches.md, section 12 (et 2, 3, 5, « Base commune »).
//
// Vue 1 — où il est : l'arrière de la carcasse commune, le jarret (du grasset au tarse, CEE-ONU
//   9116) en trame de points, la même que la région 1 de la 62-02 ; repères : grasset, tibia,
//   pointe du jarret.
// Vue 2 — ce qu'il y a dedans : la patte arrière de profil gauche sous le grasset, relevée sur
//   Sisson fig. 311 et Ellenberger t7 fig. XIX (jambe du bœuf, face externe) et posée dans la patte
//   du module : extenseurs devant (leurs tendons passent devant le tarse), fléchisseurs derrière,
//   gastrocnémien en haut derrière, qui finit en tendon d'Achille sur la pointe du jarret. Os cachés
//   en tireté. Le couteau entre dans le joint du grasset (pointillé = ce qu'on ouvre ; pas de scie).
//   Le trait mixte marque où passe la tranche de la vue 3.
// Vue 3 — le jarret en tranche : Ellenberger t13 fig. 59 (coupe de la jambe du bœuf ; devant à
//   gauche, face interne en haut), os au centre, faisceaux chacun dans sa gaine, tendons derrière.
//   La légende de la fig. 59 n'a pas été trouvée : les faisceaux ne sont pas nommés un par un.
//
// Pas de grain (non établi pour les jarrets), pas de point de prélèvement du tendon (ch. 103),
// aucune cote. Trame de points = la viande du jarret, dans les trois vues.
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

// ─── La patte arrière du module, en coordonnées (t, s) ───────────────────────────────────
// t va du joint du grasset (0) au jarret (1) ; s va du bord avant de la patte (0) à son bord
// arrière (1). Les deux bords sont ceux de la silhouette commune : un muscle posé en (t, s)
// suit la patte de l'orignal, pas celle du bœuf.
const SIL = C.dense(C.SILHOUETTE, 2, true);
const proche = q => SIL.reduce((m, p, i) => (Math.hypot(p[0] - q[0], p[1] - q[1]) < Math.hypot(SIL[m][0] - q[0], SIL[m][1] - q[1]) ? i : m), 0);
function troncon(a, b) { const i = proche(a), j = proche(b); return i <= j ? SIL.slice(i, j + 1) : SIL.slice(j, i + 1).reverse(); }
function abscisse(poly) { const c = [0]; for (let i = 1; i < poly.length; i++) c.push(c[i - 1] + Math.hypot(poly[i][0] - poly[i - 1][0], poly[i][1] - poly[i - 1][1])); return c; }
function a(poly, cum, t) {
  const L = cum[cum.length - 1] * Math.max(0, Math.min(1, t));
  let i = 1; while (i < cum.length - 1 && cum[i] < L) i++;
  const u = (L - cum[i - 1]) / ((cum[i] - cum[i - 1]) || 1);
  const p = lerp(poly[i - 1], poly[i], u);
  if (t > 1) { const d = [poly[poly.length - 1][0] - poly[poly.length - 2][0], poly[poly.length - 1][1] - poly[poly.length - 2][1]], n = Math.hypot(d[0], d[1]) || 1; return [p[0] + d[0] / n * (t - 1) * cum[cum.length - 1], p[1] + d[1] / n * (t - 1) * cum[cum.length - 1]]; }
  return p;
}
const AVANT = troncon([1236, 697], [1410, 953]), CA = abscisse(AVANT);    // devant : du grasset au tarse
const ARRIERE = troncon([1414, 722], [1480, 905]), CR = abscisse(ARRIERE); // derrière : jusqu'à la pointe du jarret
const P = ([t, s]) => lerp(a(AVANT, CA, t), a(ARRIERE, CR, t), s);

// Les masses, relevées sur Sisson fig. 311 (a, a', b, c, d extenseurs ; e fléchisseur profond ;
// f gastrocnémien ; f' tendon du fléchisseur superficiel, qui descend avec lui sur le calcanéum).
const X = [[0, 0.40], [0.2, 0.44], [0.4, 0.47], [0.6, 0.52]];                       // extenseurs | fléchisseurs
const Y = [[0, 0.64], [0.12, 0.66], [0.25, 0.70], [0.40, 0.76], [0.52, 0.83], [0.58, 0.87]];   // fléchisseurs | gastrocnémien
const TAV = [[0.58, 0.87], [0.45, 0.90], [0.32, 0.94], [0.18, 1.0]];                 // devant du tendon, sous le ventre
// bords de la patte : des points serrés juste dehors, que la silhouette découpe
const bord = (t0, t1, s) => { const o = []; for (let t = t0; t <= t1 + 1e-9; t += 0.05) o.push([Math.round(t * 100) / 100, s]); return o; };
const MUS = {
  // gastrocnémien : le ventre, qui descend en pointe sur son tendon
  gastro: [[-0.06, 0.64], ...Y, ...TAV, [0.18, 1.06], ...bord(-0.06, 0.15, 1.06).reverse()],
  // tendon d'Achille : le long du bord arrière, jusqu'au sommet du calcanéum
  tendon: [[0.18, 1.0], [0.32, 0.94], [0.45, 0.90], [0.58, 0.87], [0.72, 0.86], [0.86, 0.86], [0.97, 0.84], [1.0, 0.86],
    ...bord(0.2, 1.0, 1.06).reverse()],
  // fléchisseurs : derrière les extenseurs, le ventre qui s'effile vers l'arrière du tarse
  flech: [[-0.06, 0.40], ...X, [0.75, 0.58], [0.88, 0.66], [0.95, 0.72], [0.87, 0.76], [0.75, 0.80], [0.64, 0.84], [0.58, 0.87],
    ...Y.slice().reverse().slice(1), [-0.06, 0.64]],
  // extenseurs : tout le devant, les ventres finissent en deux pointes au bas de la jambe
  ext: [...bord(-0.06, 0.65, -0.04), [0.66, 0.0], [0.73, 0.07], [0.68, 0.20], [0.75, 0.30], [0.66, 0.47], [0.6, 0.52], ...X.slice().reverse(), [-0.06, 0.40]],
};
const SEP_EXT = [[0.0, 0.21], [0.35, 0.22], [0.68, 0.20]];   // deux groupes d'extenseurs
// les tendons des extenseurs, devant le tarse, jusque sur le canon
const TEND_EXT = [
  { t: [[0.72, 0.07], [0.86, 0.06], [1.0, 0.07]], suite: [[1422, 982], [1428, 1015], [1432, 1060]] },
  { t: [[0.74, 0.29], [0.87, 0.21], [1.0, 0.17]], suite: [[1430, 985], [1435, 1015], [1439, 1060]] },
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

// ─── La tranche : Ellenberger, das Rind, Tafel 13, fig. 59, relevée sur une grille ─────────
// Repère de relevé : x de 55 (devant) à 1205 (derrière), y de 30 (face interne) à 776 (externe).
const T3 = {
  dehors: [[55, 420], [62, 350], [90, 290], [140, 232], [200, 188], [262, 152], [300, 110], [340, 68], [400, 40], [480, 30],
    [560, 38], [640, 58], [710, 95], [765, 145], [805, 200], [850, 245], [905, 280], [980, 295], [1060, 298], [1130, 315],
    [1185, 355], [1205, 415], [1190, 465], [1140, 497], [1060, 515], [980, 525], [925, 540], [885, 572], [845, 615],
    [795, 662], [725, 712], [640, 750], [540, 772], [440, 776], [340, 762], [250, 730], [165, 680], [105, 615], [68, 530]],
  os: [[312, 250], [318, 160], [345, 100], [405, 72], [480, 68], [545, 80], [582, 130], [588, 210], [578, 300], [552, 370],
    [510, 418], [455, 432], [405, 418], [358, 375], [325, 315]],
  moelle: [[362, 215], [372, 160], [410, 128], [470, 120], [515, 135], [532, 175], [528, 245], [510, 300], [478, 340],
    [440, 352], [400, 335], [372, 290]],
  // les gaines entre les faisceaux (traits de séparation de la figure)
  gaines: [
    [[315, 300], [240, 335], [190, 370], [168, 430], [172, 500], [195, 575], [228, 640], [268, 715]],
    [[418, 428], [425, 500], [418, 600], [410, 700], [412, 800]],
    [[422, 665], [455, 690], [478, 800]],
    [[445, 438], [520, 515], [600, 590], [655, 645], [700, 695], [730, 745]],
    [[585, 180], [610, 230], [660, 255], [715, 252], [760, 225], [810, 180]],
    [[780, 195], [830, 262], [862, 295], [880, 360], [882, 430], [868, 490], [855, 545], [840, 630]],
  ],
  petit: [[802, 340], [828, 292], [862, 295], [880, 360], [882, 430], [868, 490], [840, 510], [812, 488], [798, 420]],
  // ce qui n'est pas de la viande entre le fléchisseur et les tendons
  lache: [[780, 190], [830, 262], [862, 295], [880, 360], [882, 430], [868, 490], [855, 545], [840, 650], [960, 640], [955, 540],
    [950, 470], [945, 440], [953, 380], [975, 300], [900, 240], [820, 160]],
  // les deux tendons de l'arrière (52 et 53 de la figure)
  tendons: [[952, 478], [945, 440], [953, 380], [985, 338], [1040, 316], [1100, 316], [1160, 335], [1200, 375], [1210, 420],
    [1195, 460], [1150, 488], [1070, 500], [1000, 496]],
  tendon53: [[948, 442], [955, 380], [990, 340], [1050, 322], [1100, 332], [1122, 368], [1110, 405], [1060, 422], [990, 438]],
};
const BORNES3 = [55, 30, 1205, 776];

module.exports = (h) => {
  const CAD1 = [1120, 270, 1505, 1380];
  const CAD2 = [1172, 600, 1500, 1045];
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
    const out = [C.dessiner(h, p, { id: 'v1', loin: 'fin', os: ['bassin', 'femur', 'metatarse', 'phalangesArriere', 'onglonArriere'] })];
    // le jarret, du joint du grasset au bas du tarse, en trame de points découpée par la silhouette
    const jarret = [[1236, 697], [1268, 699], [1300, 701], [1340, 710], [1380, 716], [1416, 722], [1520, 730], [1520, 1012],
      [1446, 1014], [1400, 1016], [1380, 975], [1225, 720]];
    out.push(`<defs>${points('v1-p')}</defs>`);
    out.push(`<g clip-path="url(#v1-vue)"><g clip-path="url(#v1-corps)"><path d="${D(jarret.map(T), true)}" fill="url(#v1-p)" stroke="none"/></g>`);
    // la limite au grasset, en trait appuyé
    out.push(`<g clip-path="url(#v1-corps)"><path d="${D(C.dense(C.LIMITES.grasset.concat([[1470, 728]]), 3).map(T))}" ${trait(1.4)}/></g>`);
    // les os repères par-dessus la trame, en contour seul : tibia, calcanéum, rotule ; le tarse en trait fin
    ['tibia', 'tarse', 'calcaneum', 'rotule'].forEach(n => out.push(`<path d="${D(L(C.OS[n]), true)}" ${trait(n === 'tarse' ? 0.5 : 0.7)}/>`));
    out.push(`<path d="${D(L(C.SILHOUETTE))}" ${trait(2.4)}/>`);
    out.push('</g>');
    return out.join('\n');
  }

  // ── vue 2 : ce qu'il y a dedans, et le couteau ──
  function vue2(z) {
    const p = p2(z), T = p.T;
    const U = pts => C.dense(pts.map(P), 3, true).map(T);
    const Uo = pts => C.dense(pts.map(P), 3, false).map(T);
    const L = (pts, ferme = true) => C.dense(pts, 3, ferme).map(T);
    const corps = L(C.SILHOUETTE);
    const out = [];
    // sous la coupe du grasset : les masses du jarret s'arrêtent net au joint
    const sous = [[1150, 1100], [1150, 697], ...C.LIMITES.grasset, [1470, 728], [1520, 734], [1520, 1100]].map(T);
    out.push(`<defs>${clipRect('v2-vue', z)}<clipPath id="v2-corps"><path d="${D(corps, true)}" fill="${BLANC}"/></clipPath><clipPath id="v2-sous"><path d="${D(sous, true)}" fill="${BLANC}"/></clipPath>${points('v2-p')}</defs>`);
    out.push(`<g clip-path="url(#v2-vue)">`);
    out.push(`<path d="${D(corps, true)}" fill="${BLANC}" stroke="none"/>`);
    out.push(`<g clip-path="url(#v2-corps)"><g clip-path="url(#v2-sous)">`);
    // les masses : viande en points, tendon en blanc
    out.push(`<path d="${D(U(MUS.ext), true)}" ${rempli('url(#v2-p)', 0.7)}/>`);
    out.push(`<path d="${D(U(MUS.flech), true)}" ${rempli('url(#v2-p)', 0.7)}/>`);
    out.push(`<path d="${D(Uo(SEP_EXT))}" ${trait(0.5)}/>`);
    out.push(`<path d="${D(U(MUS.gastro), true)}" ${rempli('url(#v2-p)', 1.4)}/>`);
    out.push(`<path d="${D(U(MUS.tendon), true)}" ${rempli(BLANC, 1.4)}/>`);
    out.push('</g>');
    // les os, cachés sous la viande : en tireté
    ['femur', 'rotule', 'tibia'].forEach(n => out.push(`<path d="${D(L(C.OS[n]), true)}" ${trait(0.7, TIRET)}/>`));
    // le tarse, le calcanéum (la pointe du jarret) et le haut du canon : visibles
    ['tarse', 'metatarse'].forEach(n => out.push(`<path d="${D(L(C.OS[n]), true)}" ${rempli(BLANC, 0.5)}/>`));
    out.push(`<path d="${D(L(C.OS.calcaneum), true)}" ${rempli(BLANC, 0.7)}/>`);
    // les tendons des extenseurs, devant le tarse
    TEND_EXT.forEach(e => {
      const med = C.dense(e.t.map(P).concat(e.suite), 3, false);
      out.push(`<path d="${D(bandeU(med, 6).map(T), true)}" ${rempli(BLANC, 0.7)}/>`);
    });
    out.push('</g>');
    // le couteau : la coupe dans le joint du grasset (pointillé) et la flèche du geste
    out.push(`<g clip-path="url(#v2-corps)"><path d="${D(C.dense(C.LIMITES.grasset.concat([[1470, 728]]), 3).map(T))}" ${trait(1.4, ' stroke-dasharray="5 3"')}/></g>`);
    // où passe la tranche de la vue 3 : trait mixte, qui déborde un peu de la patte
    const tA = P([0.62, -0.30]), tB = P([0.62, 1.28]), tA2 = P([0.62, -0.18]), tB2 = P([0.62, 1.16]);
    out.push(`<path d="${D([T(tA2), T(tB2)])}" ${trait(0.5, MIXTE)}/>`);
    out.push(`<path d="${D([T(tA), T(tA2)])}" ${trait(1.4)}/>`, `<path d="${D([T(tB2), T(tB)])}" ${trait(1.4)}/>`);
    out.push(`<path d="${D(corps, true)}" ${trait(2.4)}/>`);
    out.push('</g>');
    const a0 = T([1186, 752]), a1 = T([1233, 703]);
    out.push(h.fleche(`M${f1(a0[0])} ${f1(a0[1])} L${f1(a1[0])} ${f1(a1[1])}`, h.a.arete));
    return out.join('\n');
  }

  // ── vue 3 : la tranche ──
  function vue3(z) {
    const { T } = p3(z);
    const L = (pts, ferme = true) => C.dense(pts, 4, ferme).map(T);
    const dehors = L(T3.dehors);
    // la gaine qui enveloppe la jambe : un second trait, en retrait du premier
    const n = dehors.length, dedans = dehors.map((q, i) => {
      const a0 = dehors[(i - 1 + n) % n], a1 = dehors[(i + 1) % n];
      const dx = a1[0] - a0[0], dy = a1[1] - a0[1], Lg = Math.hypot(dx, dy) || 1;
      return [q[0] - dy / Lg * 2.6, q[1] + dx / Lg * 2.6];
    });
    const out = [];
    out.push(`<defs><clipPath id="v3-dedans"><path d="${D(dedans, true)}" fill="${BLANC}"/></clipPath>${points('v3-p')}${osCoupe('v3-os')}</defs>`);
    out.push(`<path d="${D(dedans, true)}" fill="url(#v3-p)" stroke="none"/>`);
    out.push(`<g clip-path="url(#v3-dedans)">`);
    out.push(`<path d="${D(L(T3.lache), true)}" fill="${BLANC}" stroke="none"/>`);
    out.push(`<path d="${D(L(T3.tendons), true)}" ${rempli(BLANC, 1.4)}/>`);
    out.push(`<path d="${D(L(T3.tendon53), true)}" ${rempli(BLANC, 1.4)}/>`);
    const liseré = pts => `<path d="${D(pts)}" fill="none" stroke="${BLANC}" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"/>`;
    T3.gaines.forEach(g => out.push(liseré(L(g, false)), `<path d="${D(L(g, false))}" ${trait(0.7)}/>`));
    out.push(liseré(L(T3.petit).concat([L(T3.petit)[0]])), `<path d="${D(L(T3.petit), true)}" ${trait(0.7)}/>`);
    out.push('</g>');
    out.push(`<path d="${D(L(T3.os), true)}" ${rempli('url(#v3-os)', 1.4)}/>`);
    out.push(`<path d="${D(L(T3.moelle), true)}" ${rempli(BLANC, 0.7)}/>`);
    out.push(`<path d="${D(dedans, true)}" ${trait(0.5)}/>`);
    out.push(`<path d="${D(dehors, true)}" ${trait(2.4)}/>`);
    return out.join('\n');
  }

  return {
    ref: '62-09',
    titre: 'Le jarret arrière et le tendon d’Achille',
    desc: "Carcasse d'orignal écorchée, sans la tête, profil gauche. À gauche, l'arrière de la carcasse : le jarret arrière, "
      + "du joint du grasset au bas du tarse, en trame de points ; repères : le grasset, où la coupe passe dans le joint, le tibia, "
      + "la pointe du jarret (calcanéum). Au centre, la patte sous le grasset de plus près : devant, les extenseurs, dont les "
      + "tendons passent devant le tarse ; derrière eux, les fléchisseurs ; en haut derrière, le gastrocnémien, qui finit en "
      + "tendon d'Achille sur la pointe du jarret. Os cachés en tireté. Une flèche entre dans le joint du grasset, la coupe en "
      + "pointillé le traverse ; un trait mixte marque la tranche de droite. À droite, le jarret en tranche, le devant à gauche : "
      + "l'os et sa moelle, la viande en faisceaux, chacun dans sa gaine, et les tendons à l'arrière.",
    format: 'demi',
    disposition: [['ou', 'dedans', 'tranche']],
    largeurs: [[112, 190, 254]],
    vues: {
      ou: {
        dessin: vue1,
        renvois: z => { const p = p1(z); return [
          { n: 1, texte: 'grasset : la coupe passe dans le joint', rond: [12, p.pt([0, 790])[1]], cible: p.pt([1262, 699]) },
          { n: 2, texte: 'tibia', rond: [12, p.pt([0, 930])[1]], cible: p.pt([1345, 815]) },
          { n: 3, texte: 'pointe du jarret (calcanéum)', rond: [z.l - 12, p.pt([0, 780])[1]], cible: p.pt([1472, 912]) },
        ]; },
      },
      dedans: {
        dessin: vue2,
        renvois: z => { const T = p2(z).T; const Q = ts => T(P(ts)); return [
          { n: 4, texte: 'gastrocnémien', rond: [z.l - 12, 40], cible: Q([0.2, 0.84]) },
          { n: 5, texte: 'tendon d’Achille', rond: [z.l - 12, 150], cible: Q([0.72, 0.93]) },
          { n: 6, texte: 'fléchisseurs', rond: [z.l - 12, 95], cible: Q([0.45, 0.62]) },
          { n: 7, texte: 'extenseurs', rond: [12, 120], cible: Q([0.4, 0.25]) },
          { n: 8, texte: 'où passe la tranche', rond: [12, 175], cible: T(P([0.62, -0.1])) },
        ]; },
      },
      tranche: {
        dessin: vue3,
        renvois: z => { const { T } = p3(z); return [
          { n: 9, texte: 'une gaine autour de chaque faisceau', rond: [z.l / 2, z.h - 12], cible: T([600, 590]) },
          { n: 10, texte: 'tendons, à l’arrière de la jambe', rond: [z.l - 14, 14], cible: T([1080, 460]) },
        ]; },
      },
    },
  };
};
