// Planche 99-12 — Le maïs tressé par ses feuilles et pendu (ch. 99, étape 18 et §9)
//
// Tout vient du chapitre : récolter quand les spathes sont sèches ; laisser quelques feuilles
// d'enveloppe à chaque épi ; les tresser en longues guirlandes ; les pendre sous le toit ou près
// du poêle (étape 18) ; « le maïs tressé par ses feuilles et pendu sous le toit » (§9). L'épi est
// celui du maïs de Gaspé de l'étape 10 : grain dur à huit rangs, court.
// Le chapitre ne dit pas comment la guirlande s'allonge : on dessine la tresse à trois brins
// ordinaire (le brin du bord passe par-dessus celui du milieu) et l'épi ajouté dont les feuilles
// rejoignent le brin qui va passer. Aucune cote : c'est un geste, pas une construction.
// Pas de main : elles cacheraient les croisements ; les flèches portent le geste.

const PI = Math.PI, DEG = PI / 180;
const f1 = v => Math.round(v * 10) / 10;
const add = (a, b) => [a[0] + b[0], a[1] + b[1]], sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const mul = (a, k) => [a[0] * k, a[1] * k], lon = a => Math.hypot(a[0], a[1]);
const uni = a => { const l = lon(a) || 1; return [a[0] / l, a[1] / l]; };
const gau = t => [-t[1], t[0]];
const rot = (a, deg) => { const c = Math.cos(deg * DEG), s = Math.sin(deg * DEG); return [a[0] * c - a[1] * s, a[0] * s + a[1] * c]; };
const bez = (c, t) => { const m = 1 - t; return [0, 1].map(k => m * m * m * c[0][k] + 3 * m * m * t * c[1][k] + 3 * m * t * t * c[2][k] + t * t * t * c[3][k]); };
const D = (pts, ferme) => pts.map((p, i) => `${i ? 'L' : 'M'}${f1(p[0])} ${f1(p[1])}`).join(' ') + (ferme ? ' Z' : '');

// courbe lisse (Catmull-Rom) échantillonnée
function spline(pts, pas = 1.5) {
  const out = [pts[0]];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(i - 1, 0)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(i + 2, pts.length - 1)];
    const c1 = add(p1, mul(sub(p2, p0), 1 / 6)), c2 = sub(p2, mul(sub(p3, p1), 1 / 6));
    const n = Math.max(2, Math.ceil(lon(sub(p2, p1)) / pas));
    for (let k = 1; k <= n; k++) out.push(bez([p1, c1, c2, p2], k / n));
  }
  return out;
}
const cumul = P => { const c = [0]; for (let i = 1; i < P.length; i++) c.push(c[i - 1] + lon(sub(P[i], P[i - 1]))); return c; };
const normales = P => P.map((p, i) => gau(uni(sub(P[Math.min(i + 1, P.length - 1)], P[Math.max(i - 1, 0)]))));

const blanc = h => h.a.blanc.match(/fill="([^"]+)"/)[1];
const plein = (h, t = 'arete') => h.a[t].replace('fill="none"', `fill="${blanc(h)}"`);

// ─── l'épi ─────────────────────────────────────────────────────────────────────────────
// Base (le bout de la queue) en (x, y), pointe dans la direction ang (degrés, 90 = vers le bas).
// Grain dur à huit rangs : on en voit trois de face, celui du milieu le plus large.
function epi(h, { x, y, ang, L, R, trait = 'arete' }) {
  const a = ang * DEG, c = Math.cos(a), s = Math.sin(a);
  const P = ([u, v]) => [x + u * c - v * s, y + u * s + v * c];
  const r = t => {
    let k = 0.82 + 0.18 * Math.sin(PI / 2 * Math.min(t / 0.2, 1));
    k *= 1 - 0.42 * Math.pow(Math.max(0, (t - 0.3) / 0.7), 1.5);
    if (t > 0.9) k *= Math.sqrt(Math.max(0, 1 - Math.pow((t - 0.9) / 0.1, 2)));
    if (t < 0.05) k *= 0.7 + 0.3 * Math.sqrt(Math.max(0, 1 - Math.pow((0.05 - t) / 0.05, 2)));
    return R * k;
  };
  const N = 200, G = [], Dr = [];
  for (let i = 0; i <= N; i++) { const t = i / N; G.push(P([t * L, -r(t)])); Dr.push(P([t * L, r(t)])); }
  const r0 = r(0);
  const cul = spline([Dr[0], P([-0.05 * R, 0.5 * r0]), P([-0.09 * R, 0]), P([-0.05 * R, -0.5 * r0]), G[0]], 1);
  const contour = [...G, ...Dr.slice().reverse().slice(1), ...cul.slice(1)];
  const out = [`<path d="${D(contour, true)}" ${plein(h, trait)}/>`];
  // les grains
  const p = 0.62 * R, g = 0.07 * R, grains = [];
  const cols = [[-0.92, -0.38, 0], [-0.38, 0.38, 0.5], [0.38, 0.92, 0]];
  for (const [va, vb, dec] of cols) {
    for (let u = 0.045 * L + dec * p; u + p < 0.93 * L; u += p) {
      const rr = r((u + p / 2) / L);
      if (rr < 0.52 * R) break;
      const u0 = u + g, u1 = u + p - g, v0 = rr * va + g, v1 = rr * vb - g;
      const rx = Math.min(u1 - u0, v1 - v0) * 0.38;
      const A = (uu, vv) => { const q = P([uu, vv]); return `${f1(q[0])} ${f1(q[1])}`; };
      grains.push(`M${A(u0 + rx, v0)} L${A(u1 - rx, v0)} A${f1(rx)} ${f1(rx)} 0 0 1 ${A(u1, v0 + rx)} L${A(u1, v1 - rx)} A${f1(rx)} ${f1(rx)} 0 0 1 ${A(u1 - rx, v1)} L${A(u0 + rx, v1)} A${f1(rx)} ${f1(rx)} 0 0 1 ${A(u0, v1 - rx)} L${A(u0, v0 + rx)} A${f1(rx)} ${f1(rx)} 0 0 1 ${A(u0 + rx, v0)} Z`);
    }
  }
  out.push(`<path d="${grains.join(' ')}" ${h.a.fin}/>`);
  return { svg: out.join('\n'), P, r, L, R, axe: [c, s] };
}

// ─── une feuille d'enveloppe (spathe) le long d'une ligne médiane ───────────────────────
function feuille(h, pts, W, { dechiree = false } = {}) {
  const C = spline(pts, 1.2), S = cumul(C), Lt = S[S.length - 1], Nn = normales(C);
  const w = t => W * (0.75 + 0.25 * Math.sin(PI / 2 * Math.min(t / 0.3, 1))) * Math.pow(Math.max(0, 1 - Math.pow(t, 2.2)), 0.6);
  const G = C.map((q, i) => add(q, mul(Nn[i], w(S[i] / Lt) / 2)));
  const Dd = C.map((q, i) => sub(q, mul(Nn[i], w(S[i] / Lt) / 2)));
  const out = [`<path d="${D([...G, ...Dd.slice().reverse()], true)}" ${h.a.blanc}/>`];
  out.push(`<path d="${D([...G, ...Dd.slice().reverse()])}" ${h.a.arete}/>`);
  if (dechiree) {
    const b0 = G[0], b1 = Dd[0], z = [];
    for (let i = 0; i <= 6; i++) z.push(add(add(b0, mul(sub(b1, b0), i / 6)), mul(uni(sub(C[3], C[0])), i % 2 ? 2.2 : -0.6)));
    out.push(`<path d="${D(z)}" ${h.a.detail}/>`);
  }
  // les nervures
  const nerv = [];
  for (const k of [-0.28, 0.02, 0.3]) {
    const q = [];
    for (let i = 0; i < C.length; i++) { const t = S[i] / Lt; if (t < 0.06 || t > 0.8 + 0.05 * k) continue; q.push(add(C[i], mul(Nn[i], k * w(t)))); }
    if (q.length > 1) nerv.push(D(q));
  }
  out.push(`<path d="${nerv.join(' ')}" ${h.a.fin}/>`);
  return out.join('\n');
}

// ─── les feuilles d'un épi réunies en brin : du cul de l'épi jusqu'au départ du brin ─────
function faisceau(h, e, cible, dirC, ep) {
  const t0 = 0.02, rb = 1.12 * e.r(t0);
  let b1 = e.P([t0 * e.L, -rb]), b2 = e.P([t0 * e.L, rb]);
  const nC = gau(dirC);
  let c1 = add(cible, mul(nC, ep / 2)), c2 = sub(cible, mul(nC, ep / 2));
  if (lon(sub(b1, c1)) + lon(sub(b2, c2)) > lon(sub(b1, c2)) + lon(sub(b2, c1))) [c1, c2] = [c2, c1];
  const ua = e.axe, Dist = lon(sub(cible, e.P([0, 0])));
  const cote = (b, c) => { const q = []; const cc = [b, sub(b, mul(ua, 0.45 * Dist)), sub(c, mul(dirC, 0.35 * Dist)), c]; for (let i = 0; i <= 24; i++) q.push(bez(cc, i / 24)); return q; };
  const s1 = cote(b1, c1), s2 = cote(b2, c2);
  const creux = e.P([(t0 + 0.035) * e.L, 0]);
  const base = []; for (let i = 0; i <= 12; i++) { const t = i / 12, m = 1 - t; base.push(add(add(mul(b2, m * m), mul(creux, 2 * m * t)), mul(b1, t * t))); }
  const out = [`<path d="${D([...s1, c2, ...s2.slice().reverse(), ...base.slice(1)], true)}" ${h.a.blanc}/>`];
  out.push(`<path d="${D(s1)}" ${h.a.arete}/>`, `<path d="${D(s2)}" ${h.a.arete}/>`, `<path d="${D(base)}" ${h.a.detail}/>`);
  // un pli entre deux feuilles
  const mid = []; const cm = [lerp(b1, b2, 0.45), sub(lerp(b1, b2, 0.45), mul(ua, 0.45 * Dist)), sub(add(cible, mul(nC, 0.05 * ep)), mul(dirC, 0.35 * Dist)), add(cible, mul(nC, 0.05 * ep))];
  for (let i = 2; i <= 20; i++) mid.push(bez(cm, i / 24));
  out.push(`<path d="${D(mid)}" ${h.a.fin}/>`);
  return out.join('\n');
}
const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

// ─── la tresse à trois brins ────────────────────────────────────────────────────────────
// Brin k : x = A sin(φ − 2πk/3), hauteur z = −sin 2(φ − 2πk/3) : le brin qui entre au milieu
// passe dessus. φ croît vers le haut (le sens où l'on tresse). Croisement m à φ = π/6 + mπ/3,
// à droite pour m pair, à gauche pour m impair.
function tresse(o) {
  const Y = phi => o.yRef - phi / (PI / 3) * o.pas;
  const brins = [0, 1, 2].map(k => {
    const ph = phi => phi - 2 * PI * k / 3;
    const X = phi => o.x + o.A * Math.sin(ph(phi)), Z = phi => -Math.sin(2 * ph(phi));
    const pts = [];
    (o.bas ? o.bas[k] : []).forEach(q => pts.push([q[0], q[1], Z(o.phi0)]));
    for (let i = 0; ; i++) { const phi = o.phi0 + i * PI / 24; if (phi > o.phiE + 1e-9) break; pts.push([X(phi), Y(phi), Z(phi)]); }
    (o.haut ? o.haut[k] : []).forEach(q => pts.push([q[0], q[1], Z(o.phiE)]));
    return { pts, ep: o.ep, debut: o.debut || 'ouvert', fin: o.fin || 'ouvert' };
  });
  const X = (k, phi) => o.x + o.A * Math.sin(phi - 2 * PI * k / 3);
  const croix = m => { const phi = PI / 6 + m * PI / 3; return [o.x + (Math.abs(m) % 2 ? -0.5 : 0.5) * o.A, Y(phi)]; };
  return { brins, Y, X, croix };
}

// Tresse « en couloirs » : trois couloirs (gauche, milieu, droite). À chaque passe, le brin d'un
// bord passe par-dessus celui du milieu et prend sa place ; celui du milieu passe dessous et va au
// bord. Les passes alternent, droite puis gauche. Chaque brin monte de couloir en couloir.
function tresseCouloirs({ x, D, yBas, hauteurs, premier = 'droite', ep, bas, haut, debut = 'ouvert', fin = 'ouvert' }) {
  let ordre = [0, 1, 2], y = yBas, cote = premier;
  const P = [[], [], []], lx = i => x + (i - 1) * D, croix = [];
  ordre.forEach((id, i) => { (bas ? bas[i] : []).forEach(q => P[id].push([q[0], q[1], 0])); P[id].push([lx(i), y, 0]); });
  hauteurs.forEach(hh => {
    const yN = y - hh, ym = y - hh / 2, bord = cote === 'droite' ? 2 : 0;
    const nouv = ordre.slice(); nouv[1] = ordre[bord]; nouv[bord] = ordre[1];
    [0, 1, 2].forEach(i => {
      const id = ordre[i], j = nouv.indexOf(id);
      const zz = i === bord && j === 1 ? 1 : i === 1 && j === bord ? -1 : 0;
      if (i !== j) P[id].push([(lx(i) + lx(j)) / 2, ym, zz]);
      P[id].push([lx(j), yN, 0]);
    });
    croix.push([(lx(1) + lx(bord)) / 2, ym]);
    ordre = nouv; y = yN; cote = cote === 'droite' ? 'gauche' : 'droite';
  });
  ordre.forEach((id, i) => (haut ? haut[i] : []).forEach(q => P[id].push([q[0], q[1], 0])));
  return { brins: P.map(pts => ({ pts, ep, debut, fin })), croix, yHaut: y, lx };
}

// les bouts libres d'un brin : trois pointes de feuille
function pointes(h, E, t, ep, long) {
  const n = gau(t), out = [];
  const ordre = [0, 2, 1];
  for (const i of ordre) {
    const off = -ep / 2 + ep * (i + 0.5) / 3, half = ep / 6 + 0.4;
    const b = add(E, mul(n, off)), dir = rot(t, (i - 1) * 8), len = long * [0.8, 1, 0.9][i];
    const tip = add(b, mul(dir, len)), b1 = add(b, mul(n, half)), b2 = sub(b, mul(n, half));
    const q1 = add(add(b1, mul(dir, len * 0.45)), mul(n, 0.3)), q2 = add(add(b2, mul(dir, len * 0.45)), mul(n, -0.3));
    const d = `M${f1(b1[0])} ${f1(b1[1])} Q${f1(q1[0])} ${f1(q1[1])} ${f1(tip[0])} ${f1(tip[1])} Q${f1(q2[0])} ${f1(q2[1])} ${f1(b2[0])} ${f1(b2[1])}`;
    out.push(`<path d="${d} Z" ${h.a.blanc}/>`, `<path d="${d}" ${h.a.arete}/>`);
  }
  return out.join('\n');
}

// flèche de geste, avec un liseré blanc quand elle passe sur un brin ; rouge (charte) pour le
// geste de la vue, noire pour une pièce qui s'en va
function geste(h, pts, { rouge = true } = {}) {
  const d = D(spline(pts, 2));
  return `<path d="${d}" fill="none" stroke="${blanc(h)}" stroke-width="5" stroke-linecap="round"/>\n` + (rouge ? h.geste(d) : h.fleche(d, h.a.arete));
}

// ─── vue 1 : rabattre les spathes, en garder quelques-unes ─────────────────────────────
function vueRabattre(h, z) {
  const out = [], R = 12.5, L = 118;
  // épi A : les spathes rabattues, la dernière en train de l'être
  const xa = 96, ya = 136;
  const pendA = [
    [[-0.75 * R, -1], [-0.75 * R - 9, 40], [-0.75 * R - 24, 100]],
    [[0.75 * R, -1], [0.75 * R + 10, 40], [0.75 * R + 25, 96]],
    [[-0.28 * R, -4], [-0.3 * R - 4, 45], [-0.3 * R - 8, 106]],
    [[0.3 * R, -4], [0.35 * R + 5, 45], [0.35 * R + 11, 102]],
  ].map(c => c.map(q => [xa + q[0], ya + q[1]]));
  out.push(feuille(h, pendA[0], 0.95 * R), feuille(h, pendA[1], 0.95 * R));
  const eA = epi(h, { x: xa, y: ya, ang: -90, L, R, trait: 'contour' });
  out.push(eA.svg);
  out.push(feuille(h, pendA[2], 1.0 * R), feuille(h, pendA[3], 1.0 * R));
  // la dernière spathe, décollée de l'épi, qu'on rabat
  const hA = [xa - 0.62 * R, ya - 2];
  out.push(feuille(h, [hA, [hA[0] - 7, ya - 40], [hA[0] - 18, ya - 80], [hA[0] - 32, ya - 116]], 1.0 * R));
  const arc = []; for (let th = 34; th <= 128; th += 8) arc.push([hA[0] - 64 * Math.sin(th * DEG), hA[1] - 64 * Math.cos(th * DEG)]);
  out.push(geste(h, arc));
  // épi B : trois feuilles gardées, le reste arraché
  const xb = 200, yb = 136;
  const garde = [
    [[-0.6 * R, -1], [-0.6 * R - 8, 45], [-0.6 * R - 20, 102]],
    [[0.62 * R, -1], [0.62 * R + 9, 45], [0.62 * R + 22, 100]],
    [[0, -4], [2, 50], [5, 108]],
  ].map(c => c.map(q => [xb + q[0], yb + q[1]]));
  out.push(feuille(h, garde[0], 0.95 * R), feuille(h, garde[1], 0.95 * R));
  const eB = epi(h, { x: xb, y: yb, ang: -90, L, R, trait: 'contour' });
  out.push(eB.svg, feuille(h, garde[2], 1.0 * R));
  const arr = [
    [[xb + 30, yb - 8], [xb + 42, yb + 36], [xb + 64, yb + 88]],
    [[xb + 44, yb + 2], [xb + 55, yb + 44], [xb + 75, yb + 92]],
  ];
  out.push(feuille(h, arr[0], 0.95 * R, { dechiree: true }), feuille(h, arr[1], 0.95 * R, { dechiree: true }));
  out.push(geste(h, [[xb + 12, yb - 22], [xb + 26, yb - 26], [xb + 42, yb - 20]], { rouge: false }));
  return { svg: out.join('\n'), xa, ya, xb, yb, R, pendA, garde, arr };
}

// ─── vue 2 : tresser les feuilles de trois épis ─────────────────────────────────────────
const ECH = { L: 66, R: 8.5, ep: 12, A: 20, pas: 26 };
const sorties = (x0, y, e = 32) => [[[x0 + e, y + 2]], [[x0, y]], [[x0 - e, y + 2]]];
function boutsLibres(h, x0, y, ep, e = 32) {
  const b = [[x0 + e, y + 2], [x0, y], [x0 - e, y + 2]], d = [uni([0.2, -1]), [0, -1], uni([-0.2, -1])];
  return b.map((q, i) => pointes(h, q, d[i], ep, 22)).join('\n');
}
function vueTresser(h, z) {
  const out = [], x0 = z.l / 2, { L, R, ep } = ECH, D = 26, yBas = 162, yS = 50, e = 38;
  const Tz = tresseCouloirs({ x: x0, D, yBas, hauteurs: [30, 30], ep, haut: sorties(x0, yS, e).reverse() });
  // croisement 7 : le brin qui passe dessous ressort bien à gauche du brin de gauche, pas dans son prolongement
  Tz.brins.forEach(b => { const i = b.pts.findIndex(q => q[2] === -1 && q[1] < yBas - 40); if (i >= 0) { b.pts[i][0] -= 3; b.pts[i + 1][0] -= 12; b.pts[i + 1][1] -= 10; } });
  const eps = [
    epi(h, { x: x0 - 30, y: 175, ang: 116, L, R }),
    epi(h, { x: x0 + 30, y: 175, ang: 64, L, R }),
    epi(h, { x: x0, y: 178, ang: 90, L, R }),
  ];
  const cibles = [[x0 - D, yBas], [x0 + D, yBas], [x0, yBas]];
  eps.forEach((q, i) => out.push(q.svg, faisceau(h, q, cibles[i], [0, -1], ep)));
  out.push(h.formes.cordes(Tz.brins).toString(), boutsLibres(h, x0, yS, ep, e));
  // la passe suivante : le brin de droite par-dessus celui du milieu
  out.push(geste(h, [[x0 + 31, 84], [x0 + 16, 64], [x0, 61], [x0 - 14, 70]]));
  return { svg: out.join('\n'), x0, Tz, eps };
}

// ─── vue 3 : un épi de plus, ses feuilles jointes au brin qui va passer ────────────────
function vueAjouter(h, z) {
  const out = [], x0 = 118, { L, R, ep } = ECH, yS = 66, e = 34;
  const Tz = tresseCouloirs({ x: x0, D: 17, yBas: 318, hauteurs: Array(9).fill(22), premier: 'gauche', ep, debut: 'fixe', haut: sorties(x0, yS, e).reverse() });
  // les épis déjà pris dans la tresse, un de chaque côté
  const ctx = [
    epi(h, { x: x0 + 29, y: 250, ang: 64, L, R }),
    epi(h, { x: x0 - 29, y: 196, ang: 116, L, R }),
  ];
  const cib = [[x0 + 6, 238], [x0 - 6, 184]];
  ctx.forEach((q, i) => out.push(q.svg, faisceau(h, q, cib[i], uni(sub(cib[i], q.P([0, 0]))), ep * 0.8)));
  out.push(h.formes.cordes(Tz.brins).toString(), boutsLibres(h, x0, yS, ep, e));
  // le nouvel épi : la queue contre la tresse, ses feuilles en un brin couché contre celui de droite
  const eN = epi(h, { x: x0 + 35, y: 146, ang: 62, L, R });
  const bande = [[x0 + 30, 127], [x0 + 36, 100], [x0 + 45, 71]], dB = uni(sub(bande[1], bande[0]));
  out.push(eN.svg, faisceau(h, eN, bande[0], dB, 9));
  out.push(h.formes.corde(bande, { ep: 9, debut: 'ouvert', fin: 'ouvert' }).toString());
  out.push(pointes(h, bande[2], uni(sub(bande[2], bande[1])), 9, 20));
  out.push(geste(h, [[x0 + 31, 96], [x0 + 16, 75], [x0, 72], [x0 - 14, 81]]));
  return { svg: out.join('\n'), x0, Tz, eN, ctx, bande };
}

// ─── vue 4 : la guirlande pendue ────────────────────────────────────────────────────────
function vuePendre(h, z) {
  const out = [], x0 = z.l / 2;
  const L = 58, R = 7.2, ep = 8, A = 9.5, pas = 11.5;
  const n = 12, phiE = n * PI / 3, yE = 94, yRef = yE + n * pas, yBas = yRef + 10;
  const Tz = tresse({
    x: x0, yRef, pas, A, ep, phi0: 0, phiE,
    bas: [[[x0, yBas]], [[x0 - 16, yBas]], [[x0 + 16, yBas]]],
    haut: [0, 1, 2].map(k => [[x0 + A * Math.sin(phiE - 2 * PI * k / 3), 84]]),
  });
  // les trois premiers épis, en bas
  const dep = [
    epi(h, { x: x0 - 18, y: yBas + 16, ang: 116, L, R }),
    epi(h, { x: x0 + 18, y: yBas + 16, ang: 64, L, R }),
    epi(h, { x: x0, y: yBas + 20, ang: 90, L, R }),
  ];
  const cd = [[x0 - 16, yBas], [x0 + 16, yBas], [x0, yBas]];
  dep.forEach((e, i) => out.push(e.svg, faisceau(h, e, cd[i], [0, -1], ep)));
  // un épi de chaque côté à tour de rôle, en montant
  const cotes = [];
  for (let k = 0; k < 5; k++) {
    const y = Tz.Y((2 * k + 2) * PI / 3), sg = k % 2 ? 1 : -1;
    const e = epi(h, { x: x0 + sg * 17, y: y + 6, ang: 90 - sg * 30, L, R });
    cotes.push(e);
    out.push(e.svg, faisceau(h, e, [x0 + sg * 3, y - 4], uni([-sg * 0.8, -1]), ep * 0.8));
  }
  out.push(h.formes.cordes(Tz.brins).toString());
  // la touffe de bouts de feuilles, la ligature, la corde et la poutre
  const yp = 6, hp = 26, lp = 32, yL = 80;
  const touffe = [];
  for (const [dx, ang, len] of [[-4, -22, 16], [4, 20, 15], [-2, -8, 19], [2, 7, 18]]) touffe.push(pointes(h, [x0 + dx, yL], rot([0, -1], ang), 4.5, len));
  out.push(touffe.join('\n'));
  for (let i = 0; i < 3; i++) { const y = yL + i * 4; out.push(h.formes.corde([[x0 - 13, y], [x0 + 13, y + 1]], { ep: 3.4, debut: 'coupe', fin: 'coupe' }).toString()); }
  const ec = lp / 2 + 1.8;
  out.push(h.formes.corde([[x0 - 6, yL + 1], [x0 - 12, yL - 22], [x0 - ec, yL - 44], [x0 - ec, yp + 8], [x0 - ec + 5, yp - 1.6], [x0, yp - 1.8], [x0 + ec - 5, yp - 1.6], [x0 + ec, yp + 8], [x0 + ec, yL - 44], [x0 + 12, yL - 22], [x0 + 6, yL + 1]], { ep: 3.2, debut: 'coupe', fin: 'coupe' }).toString());
  out.push(h.rect(x0 - lp / 2, yp, lp, hp, h.a.hachure('bois')));
  return { svg: out.join('\n'), x0, yp, hp, lp, yL, Tz, dep, cotes };
}

module.exports = (h) => ({
  ref: '99-12',
  titre: 'Le maïs tressé par ses feuilles et pendu',
  desc: 'En haut à gauche, deux épis de maïs à grain dur debout, la pointe en haut, les grains en rangs. Le premier a ses spathes rabattues vers le bas, pendues sous le cul de l’épi, et une dernière spathe décollée de l’épi qu’une flèche courbe rabat vers le bas. Le second ne garde que trois feuilles pendantes ; deux autres, arrachées à la base, sont écartées à droite avec une flèche. En haut à droite, trois épis tête en bas, les queues rapprochées ; les feuilles de chacun, réunies, font un brin ; les trois brins montent et se tressent : celui de droite par-dessus celui du milieu, puis celui de gauche par-dessus le milieu ; au-dessus, les bouts libres des feuilles, et une flèche qui porte le brin de droite par-dessus celui du milieu. En bas à gauche, la tresse déjà longue avec deux épis pris dedans, un de chaque côté ; un épi de plus a la queue contre la tresse à droite, ses feuilles réunies en un brin couché contre le brin de droite, et la flèche porte les deux ensemble par-dessus celui du milieu. En bas à droite, la guirlande finie pendue à une poutre : en bas les trois premiers épis, puis un épi de chaque côté à tour de rôle en montant, la tresse liée en haut par trois tours de corde, une touffe de bouts de feuilles au-dessus, et la corde passée par-dessus la poutre.',
  format: 'pleine',
  disposition: [['rabattre', 'tresser'], ['ajouter', 'pendre']],
  hauteurs: [1, 1.3],
  vues: {
    rabattre: {
      titre: 'Rabattre les spathes',
      dessin: z => vueRabattre(h, z).svg,
      renvois: z => {
        const v = vueRabattre(h, z);
        return [
          { n: 1, rond: [150, 214], cible: [v.xa + 14, v.ya + 62], texte: 'rabattues, pas arrachées' },
          { n: 2, rond: [150, 168], cible: [v.xb - 11, v.yb + 42], texte: 'quelques feuilles gardées' },
          { n: 3, rond: [z.l - 14, 112], cible: [v.xb + 50, v.yb + 20], texte: 'le reste, arraché à la base' },
        ];
      },
    },
    tresser: {
      titre: 'Tresser les feuilles de trois épis',
      dessin: z => vueTresser(h, z).svg,
      renvois: z => {
        const v = vueTresser(h, z), c0 = v.Tz.croix[0], c1 = v.Tz.croix[1];
        return [
          { n: 4, rond: [v.x0 - 104, 196], cible: [v.x0 - 40, 184], texte: 'trois épis, queues ensemble' },
          { n: 5, rond: [v.x0 + 106, 170], cible: [v.x0 + 29, 168], texte: 'les feuilles d’un épi : un brin' },
          { n: 6, rond: [v.x0 + 96, 126], cible: [c0[0] + 2, c0[1]], texte: 'droite par-dessus le milieu' },
          { n: 7, rond: [v.x0 - 96, 104], cible: [c1[0] - 2, c1[1]], texte: 'puis gauche par-dessus le milieu' },
        ];
      },
    },
    ajouter: {
      titre: 'Un épi de plus, joint à un brin',
      dessin: z => vueAjouter(h, z).svg,
      renvois: z => {
        const v = vueAjouter(h, z), c = v.eN.P([0.55 * ECH.L, 0]);
        return [
          { n: 8, rond: [z.l - 22, 200], cible: c, texte: 'un épi de plus' },
          { n: 9, rond: [z.l - 30, 86], cible: [v.x0 + 42, 84], texte: 'ses feuilles contre le brin de droite' },
          { n: 10, rond: [v.x0 - 86, 52], cible: [v.x0 + 6, 72], texte: 'ensemble par-dessus le milieu' },
        ];
      },
    },
    pendre: {
      titre: 'Pendre la guirlande',
      dessin: z => vuePendre(h, z).svg,
      renvois: z => {
        const v = vuePendre(h, z);
        return [
          { n: 11, rond: [v.x0 + 70, v.yL + 6], cible: [v.x0 + 13, v.yL + 5], texte: 'le haut de la tresse, lié' },
          { n: 12, rond: [v.x0 + 70, v.yp + 12], cible: [v.x0 + v.lp / 2, v.yp + 12], texte: 'sous le toit ou près du poêle' },
        ];
      },
    },
  },
});
