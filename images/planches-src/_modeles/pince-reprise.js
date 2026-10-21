// Modèle : la main droite qui pince une aiguille entre le pouce et l'index, de profil
// (vue du côté du pouce, doigts vers la droite, dos de la main en haut).
// Pas une planche du livre : une feuille de modèle, pour juger la forme en grand avant de la
// porter dans formes.js.
//
// dessiner(x, y, echelle, angle) rend le SVG. (x, y) : le point pincé (le contact des deux
// pulpes) ; echelle : unités de vue par mm (1 : 190 du poignet au bout du majeur) ; angle :
// rotation en degrés, sens horaire. Unités internes : mm, origine au milieu du poignet, x vers
// les doigts, y vers le bas (la paume). Trait : silhouette 1,5, intérieur 0,7, plis 0,5.

function dessiner(x, y, echelle = 1, angle = 0) {
  const NOIR = '#1A1A1A';
  const R = Math.PI / 180;
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]], sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const mul = (a, k) => [a[0] * k, a[1] * k], u = d => [Math.cos(d * R), Math.sin(d * R)];
  const uni = a => { const l = Math.hypot(a[0], a[1]) || 1; return [a[0] / l, a[1] / l]; };
  const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  const f1 = v => Math.round(v * 10) / 10;

  // ── squelette (mm) ──
  const chaine = (p, dirs, L) => { const o = [p]; dirs.forEach((d, i) => o.push(add(o[i], mul(u(d), L[i])))); return o; };
  const IDX = { J0: [86, -4], dirs: [29, 72, 92], L: [41, 24, 16] };
  const POU = { C: [31, 19], ip: 22, L: [46, 31, 21] };
  const THENAR = [[-2, 26.5], [20, 36], [44, 48.5]];

  // Un doigt : centre [P0…Pn], s = +1 s'il s'enroule en sens horaire (les doigts), -1 (le pouce).
  // w[i] = [dos, ventre] au point i ; m[i] = [dos, ventre] au milieu du segment i.
  function doigt(P, w, m, s, o = {}) {
    const n = P.length - 1, dir = i => uni(sub(P[Math.min(i + 1, n)], P[Math.max(i - 1, 0)]));
    const dsg = i => uni(sub(P[i + 1], P[i]));
    const ven = d => s > 0 ? [-d[1], d[0]] : [d[1], -d[0]];
    const dos = [], vent = [];
    for (let i = 0; i <= n; i++) {
      const d = i === 0 ? dsg(0) : i === n ? dsg(n - 1) : uni(add(dsg(i - 1), dsg(i)));
      const nv = ven(d);
      dos.push(add(P[i], mul(nv, -w[i][0])));
      vent.push(add(P[i], mul(nv, w[i][1])));
      if (i < n) {
        const dm = dsg(i), nm = ven(dm), M = lerp(P[i], P[i + 1], 0.5);
        dos.push(add(M, mul(nm, -m[i][0])));
        vent.push(add(M, mul(nm, m[i][1])));
      }
    }
    const E = P[n], d = dsg(n - 1), nv = ven(d), [wd, wv] = w[n], r = (wd + wv) / 2;
    const bout = [add(add(E, mul(d, r * 0.5)), mul(nv, -wd * 0.8)), add(add(E, mul(d, r * 0.95)), mul(nv, -wd * 0.05)),
      add(add(E, mul(d, r * 0.62)), mul(nv, wv * 0.8))];
    return { dos, vent, bout, P, d, nv };
  }

  // Catmull-Rom → cubiques
  function segs(pts, ferme) {
    const n = pts.length, g = i => ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
    const out = [];
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      out.push([p1, add(p1, mul(sub(p2, p0), 1 / 6)), sub(p2, mul(sub(p3, p1), 1 / 6)), p2]);
    }
    return out;
  }
  // repère : mm → vue, le point pincé en (x, y)
  let ORIG = [0, 0];
  const T = p => { const q = sub(p, ORIG), c = Math.cos(angle * R), s = Math.sin(angle * R);
    return [x + echelle * (q[0] * c - q[1] * s), y + echelle * (q[0] * s + q[1] * c)]; };
  const P2 = p => { const q = T(p); return `${f1(q[0])} ${f1(q[1])}`; };
  const dSegs = (ss, M = true) => (M ? `M${P2(ss[0][0])}` : '') + ss.map(s => ` C${P2(s[1])} ${P2(s[2])} ${P2(s[3])}`).join('');
  const courbe = (pts) => dSegs(segs(pts, false));
  const SIL = `fill="none" stroke="${NOIR}" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"`;
  const INT = `fill="none" stroke="${NOIR}" stroke-width="0.7" stroke-linecap="round"`;
  const FIN = `fill="none" stroke="${NOIR}" stroke-width="0.5" stroke-linecap="round"`;
  const BL = `fill="#FFFFFF" stroke="none"`;

  // Une pièce : contour fermé (rempli de blanc), dont seuls les segments [a, b) sont tracés.
  function piece(pts, a, b, attrs = SIL) {
    const ss = segs(pts, true);
    const vis = ss.slice(a, b < 0 ? ss.length + b : b);
    return `<path d="${dSegs(ss)} Z" ${BL}/>\n<path d="${dSegs(vis)}" ${attrs}/>`;
  }

  // ── l'index : un arc doux, la flexion répartie sur les trois jointures ──
  const I = chaine(IDX.J0, IDX.dirs, IDX.L);
  const di = doigt(I, [[12, 8.8], [8.8, 7.4], [7.2, 6.6], [5.8, 6.8]], [[8.4, 8.8], [7.2, 7.6], [6.2, 7.4]], 1);
  // le point pincé : la pulpe de l'index, au bout
  const nI = 143, Ci = add(I[3], mul(u(nI), 6.6));
  ORIG = Ci;
  // ── le pouce : on cherche les angles qui posent sa pulpe exactement contre celle de l'index ──
  const rT = 8.6, Et = sub(Ci, mul(u(nI + 180), rT));
  let best = null;
  for (let a = 10; a <= 60; a += 0.25) for (let mp = 0; mp <= 30; mp += 0.25) {
    const c = chaine(POU.C, [a, a - mp, a - mp - POU.ip], POU.L), e = Math.hypot(c[3][0] - Et[0], c[3][1] - Et[1]);
    if (!best || e < best.e) best = { e, c };
  }
  const Pc = best.c;
  const dp = doigt(Pc, [[15, 12], [10.6, 9.8], [9.8, 9.2], [7.8, 8.8]], [[12.5, 12], [10.2, 10.2], [9, 9.8]], -1);

  // ── les trois doigts repliés, derrière l'index : on ne voit que leur première phalange et la
  // bosse de leur deuxième jointure, dans l'ouverture entre l'index et le pouce, chacun un peu
  // plus bas et plus en retrait que le précédent ; leurs bouts passent derrière le pouce.
  // Contours en mm, du haut (caché sous l'index) au bas (caché sous le pouce).
  const MAJEUR = { dos: [[100, 0], [104, 8], [110.5, 17], [114.8, 27.5], [117, 37.5], [117.4, 44], [114.6, 49.6], [109.5, 52.6], [104, 53.5]],
                   ven: [[88, 2], [93, 10], [99.5, 20], [103.6, 30.5], [105.6, 40], [106, 46], [102, 54]] };
  const ANNUL = { dos: [[91, 4], [96, 13], [101.5, 23], [104.6, 33], [105.8, 42], [105.2, 47.6], [101.8, 51.2], [96, 51.8]],
                  ven: [[80, 8], [87, 20], [91.2, 28.5], [93.8, 37], [95, 45], [94, 51]] };
  const AURIC = { dos: [[83, 10], [90, 22], [93.4, 30], [95.2, 37.5], [95.4, 43], [93.6, 47], [89.6, 48.6], [84, 47.5]],
                  ven: [[72, 16], [81, 28], [84.2, 35], [85.8, 41.5], [86, 47]] };
  const out = [];
  const replie = (D, pli) => {
    const pts = [...D.dos, ...D.ven.slice().reverse()];
    out.push(`<path d="${dSegs(segs(pts, true))} Z" ${BL}/>`);
    out.push(`<path d="${courbe(D.dos)}" ${SIL}/>`);
    out.push(`<path d="${courbe(D.ven)}" ${SIL}/>`);
    if (pli) out.push(`<path d="${courbe(pli)}" ${FIN}/>`);
  };
  replie(AURIC);
  replie(ANNUL);
  replie(MAJEUR);

  const pieceDoigt = (dd, racine = 0, racineV = racine, avant = []) => {
    const pts = [...avant, ...dd.dos.slice(racine), ...dd.bout, ...dd.vent.slice(racineV).reverse()];
    const fond = [...dd.dos.slice(racine), ...dd.bout, ...dd.vent.slice(racineV).reverse(), ...dd.vent.slice(0, racineV).reverse(), add(dd.P[0], mul(dd.d, -20))];
    return `<path d="${dSegs(segs(fond, true))} Z" ${BL}/>\n<path d="${courbe(pts)}" ${SIL}/>`;
  };

  // ── le dos de la main, la commissure et l'avant-bras ──
  const dosM = [[-22, -21.2], [-10, -20.4], [4, -18.6], [30, -19], [58, -18.2], [76, -17.2], [86.5, -16.2]];
  const comm = [di.vent[1], [91, 14], [84.5, 19], [80, 26], [78, 33], lerp(dp.vent[2], dp.vent[3], 0.45)];
  const dessous = [[44, 46], [12, 31], [-2, 26.5], [-12, 25.4], [-22, 25.4]];
  {
    const tout = [...dosM, di.dos[0], ...comm, ...dessous];
    out.push(`<path d="${dSegs(segs(tout, true))} Z" ${BL}/>`);
  }
  // la commissure : le petit pli de peau où elle rejoint le pouce

  // ── l'aiguille : derrière les deux pulpes, la pointe sort de la fourche vers l'avant ──
  {
    const t = u(50), A0 = add(Ci, mul(t, -17)), A1 = add(Ci, mul(t, 31));
    const nA = [-t[1], t[0]], e = 0.55;
    const c = (s, k) => P2(add(add(Ci, mul(t, s)), mul(nA, k)));
    out.push(`<path d="M${c(-17, e)} L${c(26, e)} L${c(31, 0)} L${c(26, -e)} L${c(-17, -e)} Q${c(-18.2, 0)} ${c(-17, e)} Z" fill="#FFFFFF" stroke="${NOIR}" stroke-width="1" stroke-linejoin="round"/>`);
    out.push(`<path d="M${c(-15.8, 0)} L${c(-12.5, 0)}" ${FIN}/>`);     // le chas
  }

  // ── l'index par-dessus ; son dos prolonge le dos de la main sans cassure ──
  out.push(pieceDoigt(di, 1, 1, dosM));
  {
    const nvAt = (dd, i, s) => { const d = uni(sub(dd.P[i + 1], dd.P[i - 1])); return s > 0 ? [-d[1], d[0]] : [d[1], -d[0]]; };
    const dirAt = (dd, i) => uni(sub(dd.P[i + 1], dd.P[i - 1]));
    const trait = (c, d, n, a, b, att) => `<path d="M${P2(add(c, mul(n, a)))} Q${P2(add(add(c, mul(n, (a + b) / 2)), mul(d, -1.4)))} ${P2(add(c, mul(n, b)))}" ${att}/>`;
    const n1 = nvAt(di, 1, 1), d1 = dirAt(di, 1);
    out.push(trait(add(di.P[1], mul(d1, -1.5)), d1, n1, -8.4, -5.8, FIN));
    out.push(trait(add(di.P[1], mul(d1, 1.8)), d1, n1, -8.0, -6.0, FIN));
    out.push(trait(di.P[1], d1, n1, 7.2, 4.6, INT));
    const n2 = nvAt(di, 2, 1), d2 = dirAt(di, 2);
    out.push(trait(di.P[2], d2, n2, 6.4, 4.2, INT));
    // la bosse de la jointure de l'index, sur le dos de la main
    out.push(`<path d="${courbe([[80, -13.5], [86, -10.5], [90, -11.5]])}" ${FIN}/>`);
  }
  const ongleI = [lerp(di.dos[5], di.dos[6], 0.1), lerp(di.dos[5], di.dos[6], 0.6), lerp(di.dos[6], di.bout[0], 0.6)].map(p => add(p, mul(di.nv, 1.7)));
  out.push(`<path d="${courbe(ongleI)}" ${INT}/>`);

  // ── le pouce, devant tout : du dessous de l'avant-bras, le gras du pouce, l'ongle, le bout, la pulpe ──
  {
    const tout = [...dessous.slice().reverse().slice(0, 3), ...THENAR.slice(1), ...dp.dos.slice(2), ...dp.bout, ...dp.vent.slice(3).reverse(), ...comm.slice().reverse()];
    const fond = [...dessous.slice().reverse().slice(0, 3), ...THENAR.slice(1), ...dp.dos.slice(2), ...dp.bout, ...dp.vent.slice(2).reverse(), [50, 22], [10, 12], [-22, 10]];
    out.push(`<path d="${dSegs(segs(fond, true))} Z" ${BL}/>`);
    out.push(`<path d="${courbe(tout)}" ${SIL}/>`);
    const d = uni(sub(dp.P[3], dp.P[2])), nv = [d[1], -d[0]];
    const o = (s, t) => add(add(dp.P[2], mul(d, s)), mul(nv, t));
    const ongle = [o(9, -6.4), o(15, -7.4), o(21, -7.0), o(25.5, -5.2), o(26.2, -2.2), o(24, 0.6), o(16, 0.6), o(10, -1.6), o(8.6, -4.4)];
    out.push(`<path d="${dSegs(segs(ongle, true))} Z" ${INT}/>`);
    out.push(`<path d="${courbe([add(dp.P[2], mul(nv, 7.4)), add(add(dp.P[2], mul(nv, 5.6)), mul(d, -1.2)), add(dp.P[2], mul(nv, 3.6))])}" ${INT}/>`);
  }
  out.push(`<path d="${courbe([[-1, 25.8], [1.2, 21.5], [0.6, 17.5]])}" ${FIN}/>`);

  return out.join('\n');
}

module.exports = (h) => ({
  ref: 'modèle',
  titre: 'La pince à l’aiguille, de profil',
  desc: 'Feuille de modèle : la main droite qui pince une aiguille entre le pouce et l’index, vue du côté du pouce.',
  fichier: '_modeles-pince-reprise.svg',
  format: 'pleine',
  disposition: [['a']],
  vues: {
    a: { dessin: z => dessiner(z.l * 0.72, z.h * 0.6, 3.25, 14) },
  },
});
module.exports.dessiner = dessiner;
