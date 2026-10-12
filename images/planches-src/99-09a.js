// Planche 99-09a — diviser la rhubarbe. Chapitre 99, étape 44 « Diviser la rhubarbe » : soulever
// la couronne tôt au printemps, avant la reprise, la couper en morceaux portant chacun au moins un
// gros bourgeon vigoureux, replanter chaque morceau debout, à 10 à 15 cm sous la surface.
// La planche 99-09b (forcer l'hiver) reprend la même couronne : ses morceaux B et C sont ceux
// qu'une division met en surplus. La géométrie est exportée plus bas pour elle.
//
// La seule cote est celle du chapitre : 100 à 150 mm, prise de la surface au bout du bourgeon (le
// haut du morceau debout). La taille de la couronne, des bourgeons et des racines n'est pas donnée :
// dessinée, pas cotée. L'écart entre les morceaux replantés n'est pas donné : pas coté.
const r1 = v => Math.round(v * 10) / 10;

// ─── la couronne, en mm ─────────────────────────────────────────────────────────────────
// Repère : x vers la droite, y vers le bas, 0 au haut du corps. Trois morceaux : A (x < 72),
// B (72 à 152), C (x > 152). Rien ne traverse un trait de coupe : ni bourgeon, ni racine.
const CORPS = [[-6, 38], [-2, 22], [6, 12], [16, 8], [26, 2], [38, -1], [50, 1], [58, 7], [66, 14],
  [72, 16], [80, 10], [90, 1], [104, -4], [118, -1], [126, -1], [136, -3], [146, 5], [152, 12],
  [158, 7], [166, 2], [176, -3], [188, -5], [202, -1], [212, 7], [220, 18], [226, 32], [226, 48],
  [220, 62], [206, 72], [190, 76], [172, 73], [152, 77], [136, 81], [116, 83], [96, 78], [80, 76],
  [66, 79], [46, 80], [26, 74], [12, 66], [-2, 54]];
// Les gros bourgeons : x, y de la base, hauteur, largeur, penche.
const GROS = [
  { x: 38, y: 4, H: 36, W: 32, l: -2 },
  { x: 104, y: 0, H: 38, W: 32, l: -3 },
  { x: 134, y: 2, H: 31, W: 27, l: 3 },
  { x: 188, y: 0, H: 36, W: 32, l: 3 },
];
const PETITS = [
  { x: 13, y: 10, H: 12, W: 12, l: -3 },
  { x: 162, y: 5, H: 12, W: 12, l: 2 },
  { x: 208, y: 7, H: 11, W: 11, l: 3 },
];
// Les racines : axe en Bézier (4 points), grosseur en haut et au bout, bout coupé net par la bêche
// ou en pointe, radicelles [t, côté, long, angle]. Les fourches d'abord : la racine mère les couvre.
const RACINES = [
  { p: [[26, 118], [18, 132], [10, 148], [5, 166]], w0: 9, w1: 3, rad: [] },
  { p: [[199, 116], [209, 128], [215, 144], [219, 162]], w0: 9, w1: 3, rad: [] },
  { p: [[8, 55], [0, 85], [-10, 112], [-17, 140]], w0: 22, w1: 10, net: true, rad: [[0.4, -1, 16, 40]] },
  { p: [[30, 64], [29, 100], [24, 135], [21, 168]], w0: 25, w1: 5, rad: [[0.72, 1, 14, 50]] },
  { p: [[52, 62], [56, 95], [58, 122], [55, 146]], w0: 20, w1: 9, net: true, rad: [] },
  { p: [[90, 62], [87, 98], [85, 130], [83, 158]], w0: 22, w1: 9, net: true, rad: [[0.5, -1, 15, 45]] },
  { p: [[112, 68], [114, 105], [112, 140], [106, 176]], w0: 25, w1: 5, rad: [[0.62, 1, 15, 50]] },
  { p: [[133, 64], [137, 95], [139, 120], [139, 143]], w0: 19, w1: 9, net: true, rad: [] },
  { p: [[169, 64], [167, 100], [165, 130], [162, 158]], w0: 22, w1: 9, net: true, rad: [[0.45, -1, 13, 40]] },
  { p: [[192, 62], [196, 95], [200, 128], [204, 164]], w0: 23, w1: 5, rad: [] },
  { p: [[212, 50], [224, 75], [233, 100], [240, 122]], w0: 18, w1: 9, net: true, rad: [[0.4, 1, 13, 45]] },
];
const COUPES = [72, 152];
const SEGS = [[-24, 72], [72, 152], [152, 250]];
const CENTRES = [29, 112, 195];          // milieu de chaque morceau, racines comprises

function rhubarbe(h) {
  const A = h.a;
  const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const bA = blanc(A.arete), bD = blanc(A.detail);
  const MIXTE = 'fill="none" stroke="#1A1A1A" stroke-width="0.7" stroke-dasharray="8 3 1.5 3" stroke-linecap="round"';
  const f = p => `${r1(p[0])} ${r1(p[1])}`;
  const dd = (pts, ferme) => pts.map((p, i) => `${i ? 'L' : 'M'}${f(p)}`).join(' ') + (ferme ? ' Z' : '');
  const catmull = (pts, ferme, n) => {
    const out = [], N = pts.length;
    const g = i => ferme ? pts[(i + N) % N] : pts[Math.max(0, Math.min(N - 1, i))];
    for (let i = 0; i < (ferme ? N : N - 1); i++) {
      const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      for (let j = 0; j < n; j++) {
        const t = j / n, t2 = t * t, t3 = t2 * t;
        out.push([0, 1].map(k => 0.5 * (2 * p1[k] + (-p0[k] + p2[k]) * t + (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * t2 + (-p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k]) * t3)));
      }
    }
    if (!ferme) out.push(pts[N - 1]);
    return out;
  };
  const bez = (p, t) => { const u = 1 - t; return [0, 1].map(j => u * u * u * p[0][j] + 3 * u * u * t * p[1][j] + 3 * u * t * t * p[2][j] + t * t * t * p[3][j]); };
  const bezD = (p, t) => { const u = 1 - t; return [0, 1].map(j => 3 * u * u * (p[1][j] - p[0][j]) + 6 * u * t * (p[2][j] - p[1][j]) + 3 * t * t * (p[3][j] - p[2][j])); };
  const corps = catmull(CORPS, true, 10);
  const bornesY = x => {
    const ys = [];
    for (let i = 0; i < corps.length; i++) {
      const a = corps[i], b = corps[(i + 1) % corps.length];
      if ((a[0] - x) * (b[0] - x) <= 0 && a[0] !== b[0]) ys.push(a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0]));
    }
    return [Math.min(...ys), Math.max(...ys)];
  };
  // Le grain du corps : un pointillé, serré vers le bas et vers les flancs, qui donne le volume
  // sans dessiner de trait qui ressemble à un visage.
  const dedans = (x, y) => {
    let c = false;
    for (let i = 0, j = corps.length - 1; i < corps.length; j = i++) {
      const a = corps[i], b = corps[j];
      if ((a[1] > y) !== (b[1] > y) && x < (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1]) + a[0]) c = !c;
    }
    return c;
  };
  const GRAIN = [];
  { let s = 9909; const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
    for (let i = 0; i < 6000; i++) {
      const x = -6 + rnd() * 232, y = -6 + rnd() * 90, tire = rnd();
      if (!dedans(x, y) || COUPES.some(c => Math.abs(c - x) < 1.6)) continue;
      const [yt, yb] = bornesY(x), v = (y - yt) / (yb - yt);
      const bord = Math.max(0, 1 - Math.min(x + 6, 226 - x) / 26);
      const w = Math.max(Math.pow(v, 2.4), bord * 0.7);
      if (tire < w * 0.2) GRAIN.push([x, y]);
    } }

  const racine = (R, P) => {
    const n = 28, G = [], D = [];
    const w = t => R.w0 + (R.w1 - R.w0) * Math.pow(t, 0.85);
    const fr = t => { const c = bez(R.p, t), v = bezD(R.p, t), L = Math.hypot(v[0], v[1]); const tn = [v[0] / L, v[1] / L]; return { c, tn, nm: [-tn[1], tn[0]] }; };
    for (let i = 0; i <= n; i++) {
      const t = i / n, { c, nm } = fr(t), r = w(t) / 2;
      G.push([c[0] - nm[0] * r, c[1] - nm[1] * r]); D.push([c[0] + nm[0] * r, c[1] + nm[1] * r]);
    }
    const { c, tn, nm } = fr(1), r = w(1) / 2, arc = [];
    if (!R.net) for (let i = 1; i < 8; i++) { const a = Math.PI * i / 8; arc.push([c[0] - nm[0] * r * Math.cos(a) + tn[0] * r * Math.sin(a), c[1] - nm[1] * r * Math.cos(a) + tn[1] * r * Math.sin(a)]); }
    const out = [`<path d="${dd([...G, ...arc, ...D.reverse()].map(P), true)}" ${bA}/>`];
    // le bout coupé net à l'arrachage : la face coupée, une ellipse vue d'un peu en dessous
    if (R.net) {
      const E = Array.from({ length: 24 }, (_, i) => { const a = 2 * Math.PI * i / 24; return [c[0] + nm[0] * r * Math.cos(a) + tn[0] * r * 0.38 * Math.sin(a), c[1] + nm[1] * r * Math.cos(a) + tn[1] * r * 0.38 * Math.sin(a)]; });
      out.push(`<path d="${dd(E.map(P), true)}" ${bD}/>`);
    }
    // les plis en travers de la racine charnue
    if (R.w0 > 13) for (const t of [0.26, 0.46, 0.66, 0.84]) {
      const { c: q, tn: u, nm: m } = fr(t), ww = w(t) * 0.36;
      out.push(`<path d="M${f(P([q[0] - m[0] * ww, q[1] - m[1] * ww]))} Q${f(P([q[0] + u[0] * 2.2, q[1] + u[1] * 2.2]))} ${f(P([q[0] + m[0] * ww, q[1] + m[1] * ww]))}" ${A.fin}/>`);
    }
    // les radicelles : un trait fin qui part du flanc et retombe
    for (const [t, cote, lg, ang] of R.rad) {
      const { c: q, tn: u, nm: m } = fr(t), rr = w(t) / 2;
      const s0 = [q[0] + m[0] * rr * cote, q[1] + m[1] * rr * cote];
      const a = ang * Math.PI / 180, dir = [m[0] * cote * Math.cos(a) + u[0] * Math.sin(a), m[1] * cote * Math.cos(a) + u[1] * Math.sin(a)];
      const e = [s0[0] + dir[0] * lg, s0[1] + dir[1] * lg + lg * 0.25], mi = [s0[0] + dir[0] * lg * 0.5, s0[1] + dir[1] * lg * 0.5 - 1];
      out.push(`<path d="M${f(P(s0))} Q${f(P(mi))} ${f(P(e))}" ${A.fin}/>`);
    }
    return out.join('\n');
  };

  // Un gros bourgeon fermé : un dôme gras, les bords de deux écailles qui l'enveloppent, et de part
  // et d'autre de sa base les restes secs des vieilles feuilles. Il se dessine AVANT le corps, qui
  // couvre sa base : il sort de la couronne.
  const collerette = (b, q) => {
    const { W, H } = b;
    return [-1, 1].map(s => `<path d="M${f(q(s * 0.3 * W, 9))} C${f(q(s * 0.52 * W, 2))} ${f(q(s * 0.66 * W, -0.12 * H))} ${f(q(s * 0.64 * W, -0.3 * H))} C${f(q(s * 0.56 * W, -0.14 * H))} ${f(q(s * 0.5 * W, -0.02 * H))} ${f(q(s * 0.5 * W, 9))} Z" ${bD}/>`).join('\n');
  };
  const bourgeon = (b, P) => {
    const { x, y, H, W, l } = b, q = (u, v) => P([x + u, y + v]);
    const out = [`<path d="M${f(q(-W / 2, 9))} C${f(q(-0.64 * W, -0.45 * H))} ${f(q(-0.34 * W + l * 0.6, -1.0 * H))} ${f(q(l, -H))} C${f(q(0.34 * W + l * 0.6, -1.0 * H))} ${f(q(0.64 * W, -0.45 * H))} ${f(q(W / 2, 9))} Z" ${bA}/>`];
    if (H > 20) {
      out.push(`<path d="M${f(q(-0.44 * W, 4))} C${f(q(-0.34 * W, -0.5 * H))} ${f(q(-0.02 * W, -0.86 * H))} ${f(q(0.3 * W + l * 0.5, -0.8 * H))}" ${A.fin}/>`);
      out.push(`<path d="M${f(q(0.5 * W, -0.04 * H))} C${f(q(0.36 * W, -0.42 * H))} ${f(q(0.14 * W, -0.6 * H))} ${f(q(-0.12 * W + l * 0.5, -0.66 * H))}" ${A.fin}/>`);
      out.push(collerette(b, q));
    }
    return out.join('\n');
  };
  // Un gros bourgeon ouvert par le forçage : les deux écailles écartées, les tiges au milieu.
  const bourgeonOuvert = (b, P) => {
    const { x, y, H, W } = b, q = (u, v) => P([x + u, y + v]);
    return [
      `<path d="M${f(q(-0.5 * W, 9))} C${f(q(-0.64 * W, -0.3 * H))} ${f(q(-0.54 * W, -0.64 * H))} ${f(q(-0.4 * W, -0.82 * H))} C${f(q(-0.3 * W, -0.5 * H))} ${f(q(-0.16 * W, -0.2 * H))} ${f(q(-0.08 * W, 9))} Z" ${bA}/>`,
      `<path d="M${f(q(0.5 * W, 9))} C${f(q(0.64 * W, -0.3 * H))} ${f(q(0.54 * W, -0.64 * H))} ${f(q(0.4 * W, -0.82 * H))} C${f(q(0.3 * W, -0.5 * H))} ${f(q(0.16 * W, -0.2 * H))} ${f(q(0.08 * W, 9))} Z" ${bA}/>`,
      collerette(b, q),
    ].join('\n');
  };

  // Une couronne entière (seg null) ou un morceau (seg 0, 1, 2). T = { ox, oy, k } : px = o + mm × k.
  // tiges : du SVG glissé entre les racines et les bourgeons (les tiges forcées sortent des bourgeons ouverts).
  const couronne = (T, { seg = null, id = 'x', ouvert = false, tiges = '' } = {}) => {
    const P = p => [T.ox + p[0] * T.k, T.oy + p[1] * T.k];
    const [x0, x1] = seg === null ? [-1e3, 1e3] : SEGS[seg];
    const dans = x => x > x0 && x < x1;
    const out = [];
    RACINES.filter(R => dans(R.p[0][0])).forEach(R => out.push(racine(R, P)));
    if (tiges) out.push(tiges);
    PETITS.filter(b => dans(b.x)).forEach(b => out.push(bourgeon(b, P)));
    GROS.filter(b => dans(b.x)).forEach(b => out.push(ouvert ? bourgeonOuvert(b, P) : bourgeon(b, P)));
    const peau = [`<path d="${dd(corps.map(P), true)}" ${bA}/>`];
    GRAIN.filter(([x]) => dans(x)).forEach(([x, y]) => { const q = P([x, y]); peau.push(`<circle cx="${r1(q[0])}" cy="${r1(q[1])}" r="0.55" ${A.plein}/>`); });
    if (seg === null) out.push(...peau);
    else {
      const a = P([x0, -60]), b = P([x1, 200]);
      out.push(`<clipPath id="k9909-${id}"><rect x="${r1(a[0])}" y="${r1(a[1])}" width="${r1(b[0] - a[0])}" height="${r1(b[1] - a[1])}"/></clipPath>`,
        `<g clip-path="url(#k9909-${id})">`, ...peau, '</g>');
      // la face coupée : un trait droit, net, là où le couteau est passé
      for (const x of COUPES) if (x === x0 || x === x1) { const [yt, yb] = bornesY(x); out.push(h.ligne(...P([x, yt]), ...P([x, yb]), A.arete)); }
    }
    return out.join('\n');
  };
  const haut = seg => Math.min(...GROS.filter(b => b.x > SEGS[seg][0] && b.x < SEGS[seg][1]).map(b => b.y - b.H));
  return { couronne, haut, bornesY, bez, MIXTE, f, dd, bA, bD };
}

const fabrique = (h) => {
  const A = h.a, R = rhubarbe(h);
  const K1 = 0.92, OY = 70;                    // la couronne et les morceaux : même échelle, même hauteur
  const T1 = { ox: 26, oy: OY, k: K1 };
  const EC = 25;                               // écart des morceaux étalés, mm (dessin seulement)
  const T2 = i => ({ ox: 33 + i * EC * K1, oy: OY, k: K1 });
  const P1 = p => [T1.ox + p[0] * K1, T1.oy + p[1] * K1];
  const P2 = (i, p) => [T2(i).ox + p[0] * K1, T2(i).oy + p[1] * K1];

  // ─── replanter : les trois morceaux debout, le bout du bourgeon à 125 mm sous la surface ─
  const K3 = 0.75, PROF = 125;
  const gR = z => {
    const ys = 34, cx = [175, 335, 492];
    const T = [0, 1, 2].map(i => ({ ox: cx[i] - CENTRES[i] * K3, oy: ys + PROF * K3 - R.haut(i) * K3, k: K3 }));
    return { ys, T };
  };
  const PR = (T, p) => [T.ox + p[0] * T.k, T.oy + p[1] * T.k];

  return {
    ref: '99-09a',
    titre: 'Diviser la rhubarbe',
    desc: 'La couronne de rhubarbe soulevée tôt au printemps, bourgeons encore fermés : quatre gros '
      + 'bourgeons en ogive sur un corps noueux, des racines charnues dessous, deux traits de coupe qui '
      + 'passent entre les bourgeons. Les trois morceaux étalés, chacun avec au moins un gros bourgeon. '
      + 'En coupe dans la terre, les trois morceaux replantés debout, bourgeon en haut, le bout du '
      + 'bourgeon à 100 à 150 mm sous la surface.',
    format: 'pleine',
    disposition: [['couper', 'morceaux'], ['replanter']],
    hauteurs: [1, 1.1],
    largeurs: [[4, 5], [1]],
    vues: {
      couper: {
        titre: 'Tôt au printemps, soulever et couper',
        dessin: z => [
          R.couronne(T1),
          ...[72, 152].map(x => h.path(`M${R.f(P1([x, -56]))} L${R.f(P1([x, 184]))}`, R.MIXTE)),
        ].join('\n'),
        renvois: z => [
          { n: 1, rond: [P1([104, 0])[0] - 4, 14], cible: P1([100, -26]), texte: 'gros bourgeon vigoureux' },
          { n: 2, rond: [P1([161, 0])[0] + 30, 30], cible: P1([161, -2]), texte: 'petit bourgeon : ne compte pas' },
          { n: 3, rond: [P1([152, 0])[0] + 14, P1([0, 190])[1] + 4], cible: P1([152, 176]), texte: 'couper entre les bourgeons' },
          { n: 4, rond: [14, P1([0, 94])[1]], cible: P1([12, 34]), texte: 'couronne soulevée avant la reprise' },
        ],
      },
      morceaux: {
        titre: 'Les trois morceaux',
        dessin: z => [0, 1, 2].map(i => R.couronne(T2(i), { seg: i, id: `m${i}` })).join('\n'),
        renvois: z => [
          { n: 5, rond: [P2(2, [188, 0])[0] + 38, 16], cible: P2(2, [190, -24]), texte: 'au moins un gros bourgeon chacun' },
        ],
      },
      replanter: {
        titre: 'Replanter chaque morceau debout',
        dessin: z => {
          const { ys, T } = gR(z);
          const o = [h.rect(0, ys, z.l, z.h - ys, A.hachure('terre', 'aucun'))];
          T.forEach((t, i) => o.push(R.couronne(t, { seg: i, id: `r${i}` })));
          o.push(h.ligne(0, ys, z.l, ys, A.contour));
          // la cote : de la surface au bout du bourgeon du morceau A
          const pb = PR(T[0], [38 - 3, 6 - 40]), xc = pb[0] - 42;
          o.push(h.ligne(xc - 4, pb[1], pb[0] - 3, pb[1], A.fin));
          o.push(h.cote(xc, ys, xc, pb[1], '100 à 150 mm', { cote: 'gauche' }));
          return o.join('\n');
        },
        renvois: z => {
          const { ys, T } = gR(z);
          const pb = PR(T[1], [104, -20]);
          return [
            { n: 6, rond: [pb[0] + 62, ys + 30], cible: [pb[0] + 8, pb[1] - 6], texte: 'bourgeon en haut, racines en bas' },
          ];
        },
      },
    },
  };
};

module.exports = fabrique;
module.exports.rhubarbe = rhubarbe;
module.exports.GEOM = { GROS, PETITS, RACINES, SEGS, CENTRES, COUPES };
