// Planche 37-04 — trier et éprouver les pierres du sauna (ch. 37, étapes 10 à 14).
// Six vignettes au même cadrage, la pierre posée au sol : la bonne (foncée, dense, grain si fin
// qu'on ne voit pas les cristaux, sans couches) contre les cinq à jeter que le chapitre nomme —
// feuilletée, pâle et grenue (quartz), à paillettes ou petits cubes dorés (pyrite), poreuse et
// friable, ramassée dans l'eau. Puis l'épreuve au feu, dehors : les pierres dans le feu, tout le
// monde en arrière, la première eau jetée de loin avec une louche liée au bout d'une perche.
// Aucune cote : le chapitre ne donne que la taille des pierres (10 à 15 cm), et une pierre qu'on
// trie se reconnaît, elle ne se construit pas.
module.exports = (h) => {
  const NOIR = '#1A1A1A';
  const f = v => Math.round(v * 10) / 10;
  const P = p => `${f(p[0])},${f(p[1])}`;
  const W = a => a.replace('fill="none"', 'fill="#FFFFFF"');
  const motif = (id, t = 'arete') => {
    const ep = { contour: 2.4, arete: 1.4, detail: 0.7, fin: 0.5 }[t];
    return `fill="url(#${id})" stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round"`;
  };
  const dur = (d, id, t) => h.path(d, h.a.blanc) + '\n' + h.path(d, motif(id, t));
  const rng = s => () => { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  const rot = (p, c, deg) => { const a = deg * Math.PI / 180, dx = p[0] - c[0], dy = p[1] - c[1]; return [c[0] + dx * Math.cos(a) - dy * Math.sin(a), c[1] + dx * Math.sin(a) + dy * Math.cos(a)]; };

  // courbe fermée lissée (Catmull-Rom) ; k < 1 garde des angles
  const ferme = (pts, k = 1) => {
    const n = pts.length; let d = `M ${P(pts[0])}`;
    for (let i = 0; i < n; i++) {
      const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
      d += ` C ${P([p1[0] + (p2[0] - p0[0]) * k / 6, p1[1] + (p2[1] - p0[1]) * k / 6])} ${P([p2[0] - (p3[0] - p1[0]) * k / 6, p2[1] - (p3[1] - p1[1]) * k / 6])} ${P(p2)}`;
    }
    return d + ' Z';
  };
  const ouvert = (pts, k = 1) => {
    const n = pts.length; let d = `M ${P(pts[0])}`;
    for (let i = 0; i < n - 1; i++) {
      const p0 = pts[Math.max(i - 1, 0)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(i + 2, n - 1)];
      d += ` C ${P([p1[0] + (p2[0] - p0[0]) * k / 6, p1[1] + (p2[1] - p0[1]) * k / 6])} ${P([p2[0] - (p3[0] - p1[0]) * k / 6, p2[1] - (p3[1] - p1[1]) * k / 6])} ${P(p2)}`;
    }
    return d;
  };
  // une pierre posée : contour irrégulier autour d'une ellipse, aplati sur le sol
  const pierre = (cx, sol, rx, ry, seed, { bruit = 0.07, n = 11 } = {}) => {
    const R = rng(seed), pts = [];
    for (let i = 0; i < n; i++) {
      const a = (i + (R() - 0.5) * 0.35) / n * 2 * Math.PI, r = 1 + (R() - 0.5) * 2 * bruit;
      pts.push([cx + rx * r * Math.cos(a), Math.min(sol - ry * 0.92 + ry * r * Math.sin(a), sol)]);
    }
    return pts;
  };
  const dedans = (p, poly) => { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const a = poly[i], b = poly[j];
    if ((a[1] > p[1]) !== (b[1] > p[1]) && p[0] < (b[0] - a[0]) * (p[1] - a[1]) / (b[1] - a[1]) + a[0]) c = !c; } return c; };
  const bienDedans = (p, poly, m) => [[0, 0], [m, 0], [-m, 0], [0, m], [0, -m]].every(d => dedans([p[0] + d[0], p[1] + d[1]], poly));

  // un petit cube de pyrite, vu en perspective : le dessus et la face droite en blanc, la gauche en noir
  const cube = (x, y, s, ang = 0) => {
    const q = [[0, -s], [0.87 * s, -0.5 * s], [0.87 * s, 0.5 * s], [0, s], [-0.87 * s, 0.5 * s], [-0.87 * s, -0.5 * s]].map(p => rot([x + p[0], y + p[1]], [x, y], ang));
    const c = [x, y];
    return [
      h.path(`M ${P(q[0])} L ${P(q[1])} L ${P(q[2])} L ${P(q[3])} L ${P(q[4])} L ${P(q[5])} Z`, W(h.a.detail)),
      h.path(`M ${P(q[5])} L ${P(c)} L ${P(q[3])} L ${P(q[4])} Z`, h.a.plein),
      h.path(`M ${P(q[5])} L ${P(c)} L ${P(q[1])} M ${P(c)} L ${P(q[3])}`, h.a.detail),
    ].join('\n');
  };
  const paillette = (x, y, s, ang) => {
    const q = [[-s, 0], [0, -s * 0.45], [s, 0], [0, s * 0.45]].map(p => rot([x + p[0], y + p[1]], [x, y], ang));
    return h.path(`M ${P(q[0])} L ${P(q[1])} L ${P(q[2])} L ${P(q[3])} Z`, W(h.a.fin));
  };

  const DEFS = `<defs>
<pattern id="p3704-fonce" width="2.6" height="2.6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="2.6" stroke="${NOIR}" stroke-width="0.7"/><line x1="0" y1="0" x2="2.6" y2="0" stroke="${NOIR}" stroke-width="0.7"/></pattern>
<pattern id="p3704-gris" width="3.4" height="3.4" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)"><line x1="0" y1="0" x2="0" y2="3.4" stroke="${NOIR}" stroke-width="0.5"/></pattern>
</defs>`;

  // le sol d'une vignette : même cadrage pour les six
  const SOLV = z => z.h - 16;
  const sol = (z, y) => [
    h.rect(8, y, z.l - 16, 6, h.a.hachure('terre', 'aucun')),
    h.ligne(8, y, z.l - 8, y, h.a.arete),
  ].join('\n');

  // ── 1. La bonne : foncée, dense, grain si fin qu'on ne voit rien, sans couches ──
  const garder = z => {
    const s = SOLV(z), cx = z.l / 2;
    const pts = pierre(cx, s, 58, 34, 11, { bruit: 0.1, n: 8 });
    return [DEFS, sol(z, s), dur(ferme(pts, 0.55), 'p3704-fonce', 'contour')].join('\n');
  };

  // ── 2. Feuilletée : des plaques empilées, celles du dessus qui s'ouvrent ──
  const feuillet = z => {
    const s = SOLV(z), cx = z.l / 2 - 8, o = [sol(z, s)], J = rng(17);
    const ep = [10.5, 8, 11, 7.5, 9], base = [0]; ep.forEach((e, i) => base.push(base[i] + e));
    const pl = [[-58, 58], [-54, 64], [-61, 50], [-50, 57], [-44, 45]];
    const piv = [cx + pl[3][0] + 4, s - base[3]];
    const tourne = (q, i) => i === 3 ? q.map(p => rot(p, piv, -6)) : i === 4 ? q.map(p => rot(p, piv, -12)) : q;
    pl.forEach(([a, b], i) => {
      const yb = s - base[i], yt = yb - ep[i] + 1, j = () => (J() - 0.5) * 2.4;
      let q = [[cx + a + 3, yb], [cx + (a + b) / 2 + j() * 4, yb + (i ? j() * 0.4 : 0)], [cx + b - 2, yb], [cx + b + 2, yb - 3], [cx + b - 4, (yb + yt) / 2 + j()], [cx + b + 1, yt + 2], [cx + b - 6, yt],
        [cx + (a + b) / 2 + j() * 5, yt + j() * 0.5], [cx + a + 7, yt], [cx + a + 1, yt + 2 + j()], [cx + a - 2, (yb + yt) / 2 + 1]];
      q = tourne(q, i);
      o.push(h.path(ferme(q, 0.5), W(i === 0 ? h.a.contour : h.a.arete)));
      // le délit de la plaque, en long
      const ym = (yb + yt) / 2 + 0.5;
      o.push(h.path(ouvert(tourne([[cx + a + 10, ym], [cx + (a + b) / 2, ym - 1], [cx + b - 14, ym + 0.5]], i)), h.a.fin));
    });
    // une plaque déjà tombée, à plat au pied
    o.push(h.path(ferme([[cx + 66, s], [cx + 90, s], [cx + 92, s - 3], [cx + 88, s - 5.5], [cx + 70, s - 6], [cx + 65, s - 3]], 0.5), W(h.a.arete)));
    return o.join('\n');
  };

  // ── 3. Pâle et grenue : pierre claire, pleine de grains vitreux (quartz) ──
  const quartz = z => {
    const s = SOLV(z), cx = z.l / 2, o = [sol(z, s)];
    const pts = pierre(cx, s, 58, 35, 7, { bruit: 0.06, n: 11 });
    o.push(h.path(ferme(pts), W(h.a.contour)));
    const R = rng(71);
    for (let y = s - 72; y < s; y += 7.2) for (let x = cx - 66; x < cx + 66; x += 7.6) {
      const c = [x + (R() - 0.5) * 3 + ((y / 7.2) % 2) * 3.8, y + (R() - 0.5) * 3];
      const r = 1.9 + R() * 1.6;
      if (!bienDedans(c, pts, r + 2.5)) continue;
      const a0 = R() * Math.PI, g = [];
      for (let k = 0; k < 5; k++) { const a = a0 + k / 5 * 2 * Math.PI + (R() - 0.5) * 0.5, rr = r * (0.75 + R() * 0.5); g.push([c[0] + rr * Math.cos(a), c[1] + rr * Math.sin(a)]); }
      o.push(h.path(`M ${g.map(P).join(' L ')} Z`, h.a.fin));
    }
    return o.join('\n');
  };

  // ── 4. Pyrite : paillettes et petits cubes dorés, grossis à la loupe ──
  const LP = z => ({ c: [z.l - 40, 44], r: 34 });
  const pyrite = z => {
    const s = SOLV(z), cx = 66, o = [sol(z, s)];
    const pts = pierre(cx, s, 54, 33, 19, { bruit: 0.07, n: 10 });
    o.push(dur(ferme(pts, 0.8), 'p3704-gris', 'contour'));
    [[cx - 28, s - 26, 3.4, 8], [cx - 6, s - 44, 3, -12], [cx + 14, s - 22, 3.4, 20], [cx + 30, s - 40, 3, 4], [cx - 18, s - 12, 2.8, -6], [cx + 36, s - 16, 2.6, 14]]
      .forEach(([x, y, r, a]) => o.push(cube(x, y, r, a)));
    [[cx - 36, s - 40, 3, 30], [cx + 2, s - 30, 3, -20], [cx + 22, s - 54, 2.6, 60], [cx - 10, s - 22, 2.6, 10]]
      .forEach(([x, y, r, a]) => o.push(paillette(x, y, r, a)));
    // la loupe : le cercle sur la pierre, ses deux tangentes, le cercle grossi
    const L = LP(z), m = [cx + 30, s - 40], rm = 9;
    const dx = L.c[0] - m[0], dy = L.c[1] - m[1], D = Math.hypot(dx, dy), phi = Math.atan2(dy, dx), be = Math.acos((rm - L.r) / D);
    for (const sg of [1, -1]) {
      const a = phi + sg * be;
      o.push(h.ligne(m[0] + rm * Math.cos(a), m[1] + rm * Math.sin(a), L.c[0] + L.r * Math.cos(a), L.c[1] + L.r * Math.sin(a), h.a.fin));
    }
    o.push(h.cercle(m[0], m[1], rm, h.a.detail));
    o.push(h.cercle(L.c[0], L.c[1], L.r, motif('p3704-gris', 'arete')));
    const [lx, ly] = L.c;
    o.push(cube(lx - 12, ly - 8, 9, 6), cube(lx + 11, ly + 10, 7.5, -10), cube(lx + 14, ly - 14, 5.5, 18));
    o.push(paillette(lx - 14, ly + 14, 7, 25), paillette(lx - 2, ly + 22, 5, -30));
    return o.join('\n');
  };

  // ── 5. Poreuse, friable : des trous partout, des miettes au pied ──
  const poreuse = z => {
    const s = SOLV(z), cx = z.l / 2 - 6, o = [sol(z, s)];
    const pts = pierre(cx, s, 56, 33, 23, { bruit: 0.1, n: 17 });
    o.push(h.path(ferme(pts, 0.45), W(h.a.contour)));
    const R = rng(29);
    let k = 0;
    for (let i = 0; i < 400 && k < 22; i++) {
      const c = [cx - 56 + R() * 112, s - 66 + R() * 64], rx = 1.6 + R() * 3.2, ry = rx * (0.55 + R() * 0.3);
      if (!bienDedans(c, pts, rx + 3)) continue;
      k++;
      o.push(h.ellipse(c[0], c[1], rx, ry, h.a.detail));
      o.push(h.ellipse(c[0], c[1] - ry * 0.25, rx * 0.7, ry * 0.55, h.a.plein));
    }
    // les miettes tombées
    const M = rng(31);
    [[cx + 62, 2.6], [cx + 70, 1.8], [cx + 76, 2.2], [cx + 83, 1.5], [cx + 67, 1.4], [cx - 62, 2], [cx - 68, 1.5]].forEach(([x, r]) => {
      const g = []; for (let j = 0; j < 5; j++) { const a = j / 5 * 2 * Math.PI + M(), rr = r * (0.7 + M() * 0.6); g.push([x + rr * Math.cos(a), Math.min(s - r + rr * Math.sin(a), s)]); }
      o.push(h.path(`M ${g.map(P).join(' L ')} Z`, W(h.a.detail)));
    });
    return o.join('\n');
  };

  // ── 6. Ramassée dans l'eau : galet lisse dans le lit du ruisseau ──
  const eau = z => {
    const s = SOLV(z), cx = z.l / 2, ys = s - 40, o = [];
    const vague = []; for (let x = 8; x <= z.l - 8; x += 8) vague.push([x, ys + Math.sin(x / 9) * 1.4]);
    o.push(h.path(`M ${P(vague[0])} ${vague.slice(1).map(p => `L ${P(p)}`).join(' ')} L ${z.l - 8},${s} L 8,${s} Z`, h.a.hachure('eau', 'aucun')));
    o.push(h.path(ouvert(vague), h.a.arete));
    o.push(sol(z, s));
    [[cx - 64, 9, 5, 41], [cx + 60, 11, 6, 43], [cx + 76, 6, 4, 47]].forEach(([x, rx, ry, sd]) => o.push(h.path(ferme(pierre(x, s, rx, ry, sd, { bruit: 0.05, n: 9 })), W(h.a.detail))));
    const pts = pierre(cx, s, 50, 36, 33, { bruit: 0.03, n: 12 });
    o.push(h.path(ferme(pts), W(h.a.contour)));
    // le poli du galet
    o.push(h.path(ouvert([[cx + 22, s - 58], [cx + 36, s - 46], [cx + 40, s - 30]]), h.a.fin));
    o.push(h.path(ouvert([[cx - 30, s - 12], [cx - 10, s - 7], [cx + 12, s - 9]]), h.a.fin));
    // les rides autour du galet
    o.push(h.path(ouvert([[cx - 70, ys + 4], [cx - 60, ys + 2], [cx - 52, ys + 4]]), h.a.fin));
    o.push(h.path(ouvert([[cx + 52, ys + 4], [cx + 61, ys + 2], [cx + 70, ys + 4]]), h.a.fin));
    return o.join('\n');
  };

  // ── 7. L'épreuve au feu, dehors ──────────────────────────────────────────────────────────
  // Échelle 0,12 unité par mm. La perche, tenue à la hanche, descend de 3° vers le feu ; la louche est liée dessous,
  // son manche le long de la perche, le bol au bout, l'ouverture vers celui qui tient la perche :
  // basculée, l'eau sort par la lèvre du bas et tombe droit sur la pierre.
  const S = 0.12, AL = 3 * Math.PI / 180, U = [Math.cos(AL), Math.sin(AL)], V = [-Math.sin(AL), Math.cos(AL)];
  const geo = z => {
    const G = z.h - 16, px = 40;
    const G1 = [px + 15, G - 113], xf0 = z.l - 112;
    const LP0 = (xf0 + 2 - S * (40 * U[0] + 135 * V[0]) - G1[0]) / U[0];
    const E = [G1[0] + LP0 * U[0], G1[1] + LP0 * U[1]];
    const Lc = (u, v) => [E[0] + S * (u * U[0] + v * V[0]), E[1] + S * (u * U[1] + v * V[1])];
    const Rb = Lc(40, 135);
    const xf = Rb[0] - 2;
    const M = Lc(-10, 50);
    const loupe = { c: [z.l - 64, 76], r: 60 }, xc = xf + 2;
    return { G, px, G1, E, Lc, Rb, xf, xc, M, loupe, k: 3.9, LP0 };
  };

  // la perche, le manche, les ligatures et le bol, dessinés par une fonction de passage T
  // (de la vue à la sortie) et un facteur d'agrandissement k
  const louche = (g, T, k, fin) => {
    const o = [], Lc = g.Lc;
    const band = (u0, u1, v0, v1) => [Lc(u0, v0), Lc(u1, v0), Lc(u1, v1), Lc(u0, v1)].map(T);
    // la perche, Ø 40 mm
    const pr = band(-g.LP0 / S - 110, 0, -20, 20);
    o.push(h.path(`M ${P(pr[0])} L ${P(pr[1])} L ${P(pr[2])} L ${P(pr[3])} Z`, W(h.a.arete)));
    if (fin) {
      o.push(h.path(`M ${P(T(Lc(0, -20)))} Q ${P(T(Lc(6, 0)))} ${P(T(Lc(0, 20)))}`, h.a.detail));
      for (const [u0, v] of [[-300, -8], [-180, 6], [-70, -3]]) o.push(h.path(`M ${P(T(Lc(u0, v)))} L ${P(T(Lc(u0 + 55, v + 1)))}`, h.a.fin));
    }
    // le manche de la louche, plat, sous la perche, qui dépasse le bout et plonge vers le bol
    const mh = [Lc(-160, 20), Lc(22, 20), Lc(38, 24), Lc(46, 40), Lc(46, 48), Lc(40, 48), Lc(36, 34), Lc(20, 27), Lc(-160, 27)].map(T);
    o.push(h.path(`M ${mh.map(P).join(' L ')} Z`, W(h.a.arete)));
    // le bol : la lèvre de face (vue par la tranche), le fond bombé vers l'avant
    const Ra = Lc(40, 45), Rb = Lc(40, 135), Cb = Lc(40, 90);
    const bol = [];
    for (let i = 0; i <= 16; i++) { const a = -Math.PI / 2 + i / 16 * Math.PI; bol.push(T(Lc(40 + 50 * Math.cos(a), 90 + 45 * Math.sin(a)))); }
    o.push(h.path(`M ${bol.map(P).join(' L ')} Z`, W(h.a.arete)));
    if (fin) {
      const lev = []; for (let i = 0; i <= 20; i++) { const a = i / 20 * 2 * Math.PI; lev.push(T(Lc(40 + 9 * Math.cos(a), 90 + 45 * Math.sin(a)))); }
      o.push(h.path(`M ${lev.map(P).join(' L ')} Z`, W(h.a.arete)));
      o.push(h.path(`M ${P(T(Lc(70, 58)))} Q ${P(T(Lc(86, 90)))} ${P(T(Lc(72, 120)))}`, h.a.fin));
    }
    // les ligatures : deux fois quatre tours de cordelette autour de la perche et du manche
    for (const u0 of [-40, -120]) for (let j = 0; j < 4; j++) {
      const u = u0 - j * 9;
      const q = [Lc(u - 3, -22), Lc(u + 3, -22), Lc(u + 7, 29), Lc(u + 1, 29)].map(T);
      o.push(h.path(`M ${q.map(P).join(' L ')} Z`, fin ? W(h.a.detail) : h.a.plein));
    }
    if (fin) o.push(h.path(`M ${P(T(Lc(-40, 29)))} Q ${P(T(Lc(-30, 44)))} ${P(T(Lc(-14, 42)))}`, h.a.detail));
    // l'eau qui tombe de la lèvre du bas
    const goutte = (x, y, r) => h.path(`M ${f(x)},${f(y - 2.2 * r)} C ${f(x + 1.1 * r)},${f(y - 0.4 * r)} ${f(x + r)},${f(y + r)} ${f(x)},${f(y + r)} C ${f(x - r)},${f(y + r)} ${f(x - 1.1 * r)},${f(y - 0.4 * r)} ${f(x)},${f(y - 2.2 * r)} Z`, W(h.a.detail));
    const b = T(Rb);
    const pas = fin ? [[0, 12, 3.2], [1, 30, 3.6], [-1, 50, 3.4]] : [[0, 6, 1.5], [0.5, 17, 1.7], [0, 29, 1.7], [0.5, 42, 1.7], [0, 55, 1.7]];
    pas.forEach(([dx, dy, r]) => o.push(goutte(b[0] + dx, b[1] + dy, r)));
    return o.join('\n');
  };

  // le feu d'épreuve, dessiné par T (de la vue à la sortie), k : l'agrandissement
  const foyer = (g, T, k) => {
    const G = g.G, xf = g.xf, o = [], TT = pts => pts.map(T);
    const buche = (a, b, r) => {
      const d = [b[0] - a[0], b[1] - a[1]], L0 = Math.hypot(...d), n = [-d[1] / L0 * r, d[0] / L0 * r];
      const q = TT([[a[0] + n[0], a[1] + n[1]], [b[0] + n[0], b[1] + n[1]], [b[0] - n[0], b[1] - n[1]], [a[0] - n[0], a[1] - n[1]]]), c = T(a);
      return [h.path(`M ${q.map(P).join(' L ')} Z`, W(h.a.arete)), h.ellipse(c[0], c[1], r * 0.55 * k, r * k, W(h.a.arete)), h.ellipse(c[0], c[1], r * 0.25 * k, r * 0.5 * k, h.a.fin)].join(' ');
    };
    // les flammes, entre les bûches, laissant libre l'air au-dessus de la pierre arrosée
    [[xf - 46, 30, -4], [xf - 24, 38, 5], [xf + 26, 40, -4], [xf + 48, 28, 3]].forEach(([x, ht, dv]) => {
      const b = G - 18, w = 10;
      const q = TT([[x - w, b], [x - w - 2, b - ht * 0.45], [x + dv - 5, b - ht * 0.7], [x + dv, b - ht], [x + dv + 3, b - ht * 0.6], [x + w + 3, b - ht * 0.4], [x + w, b]]);
      o.push(h.path(`M ${P(q[0])} C ${P(q[1])} ${P(q[2])} ${P(q[3])} C ${P(q[4])} ${P(q[5])} ${P(q[6])} Z`, W(h.a.arete)));
      const r = TT([[x - 3, b - 2], [x - 4, b - ht * 0.3], [x + dv * 0.5, b - ht * 0.45], [x + dv * 0.4, b - ht * 0.6]]);
      o.push(h.path(`M ${P(r[0])} C ${P(r[1])} ${P(r[2])} ${P(r[3])}`, h.a.detail));
    });
    o.push(buche([xf - 74, G - 12], [xf + 30, G - 32], 7), buche([xf + 76, G - 12], [xf - 28, G - 33], 7));
    // la braise
    const br = TT([[xf - 84, G], [xf - 60, G - 9], [xf + 60, G - 9], [xf + 84, G]]);
    o.push(h.path(`M ${P(br[0])} C ${P(br[1])} ${P(br[2])} ${P(br[3])} Z`, W(h.a.detail)));
    const R = rng(53);
    for (let i = 0; i < 16; i++) { const c = T([xf - 76 + i * 10 + R() * 4, G - 2.5 - R() * 2]); o.push(h.ellipse(c[0], c[1], (1.8 + R()) * k, 1.1 * k, h.a.plein)); }
    // les pierres dans le feu, déjà triées : foncées
    [[xf - 58, 15, 11, 61], [xf - 30, 13, 10, 62], [xf + 32, 14, 12, 64], [xf + 60, 13, 10, 65]]
      .forEach(([x, rx, ry, sd]) => o.push(dur(ferme(TT(pierre(x, G - 4, rx, ry, sd, { bruit: 0.08, n: 8 })), 0.6), 'p3704-fonce', 'arete')));
    // la pierre qui éclate sous l'eau : fendue de haut en bas, ouverte en coin
    const xc = g.xc, top = G - 4 - 24;
    o.push(dur(ferme(TT(pierre(xc, G - 4, 15, 12, 66, { bruit: 0.06, n: 9 })), 0.6), 'p3704-fonce', 'arete'));
    const fente = TT([[xc - 4.5, top + 0.5], [xc + 0.5, top + 8], [xc - 2, top + 13], [xc, G - 4], [xc + 1.5, top + 13], [xc + 4, top + 8], [xc + 3.5, top]]);
    o.push(h.path(`M ${fente.map(P).join(' L ')} Z`, W(h.a.arete)));
    return o.join('\n');
  };

  // une loupe : le petit cercle sur la vue, ses deux tangentes, le grand cercle et son contenu
  const loupe = (o, m, L, k, id, contenu) => {
    const rm = L.r / k, dx = L.c[0] - m[0], dy = L.c[1] - m[1], D = Math.hypot(dx, dy), phi = Math.atan2(dy, dx), be = Math.acos((rm - L.r) / D);
    for (const sg of [1, -1]) { const a = phi + sg * be; o.push(h.ligne(m[0] + rm * Math.cos(a), m[1] + rm * Math.sin(a), L.c[0] + L.r * Math.cos(a), L.c[1] + L.r * Math.sin(a), h.a.fin)); }
    o.push(h.cercle(m[0], m[1], rm, h.a.detail));
    o.push(h.cercle(L.c[0], L.c[1], L.r, W(h.a.arete)));
    const T = p => [L.c[0] + k * (p[0] - m[0]), L.c[1] + k * (p[1] - m[1])];
    o.push(`<clipPath id="${id}"><circle cx="${L.c[0]}" cy="${L.c[1]}" r="${L.r - 1}"/></clipPath>\n<g clip-path="url(#${id})">\n${contenu(T)}\n</g>`);
    o.push(h.cercle(L.c[0], L.c[1], L.r, h.a.arete));
  };

  const epreuve = z => {
    const g = geo(z), G = g.G, o = [], id = p => p;
    o.push(h.rect(0, G, z.l, 7, h.a.hachure('terre', 'aucun')), h.ligne(0, G, z.l, G, h.a.arete));
    o.push(foyer(g, id, 1));
    // l'homme, loin en arrière, vu de profil : les deux poings fermés sur la perche,
    // le proche à la hanche au bout de la perche, le lointain une largeur d'épaules plus loin
    const G1 = g.G1, x0 = g.px, Fp = G1.slice(), Fl = [G1[0] + 30 * U[0], G1[1] + 30 * U[1]];
    const corps = ferme([[x0 + 7, G - 182], [x0 + 13, G - 170], [x0 + 15, G - 150], [x0 + 14, G - 128], [x0 + 12, G - 104],
      [x0 + 14, G - 80], [x0 + 13, G - 55], [x0 + 12, G - 20], [x0 + 11, G - 5], [x0 + 25, G - 2.5], [x0 + 25, G], [x0 - 6, G],
      [x0 - 6.5, G - 6], [x0 - 4, G - 30], [x0 - 2.5, G - 55], [x0 - 6, G - 85], [x0 - 11, G - 103], [x0 - 9, G - 126],
      [x0 - 10, G - 150], [x0 - 9, G - 167], [x0 - 2, G - 181]], 0.6);
    const tete = ferme([[x0 + 4, G - 208], [x0 + 13, G - 202], [x0 + 15, G - 195], [x0 + 18, G - 191], [x0 + 14, G - 188],
      [x0 + 12, G - 182], [x0 + 3, G - 181], [x0 - 6, G - 187], [x0 - 8, G - 197], [x0 - 4, G - 206]], 0.7);
    const bras = (pts) => { const d = ouvert(pts, 0.8);
      return `<path d="${d}" fill="none" stroke="${NOIR}" stroke-width="11.4" stroke-linecap="round" stroke-linejoin="round"/>\n` +
        `<path d="${d}" fill="none" stroke="#FFFFFF" stroke-width="8.6" stroke-linecap="round" stroke-linejoin="round"/>`; };
    // poing fermé autour de la perche, vu du dos de la main : quatre doigts repliés dessus, le pouce dessous
    const poing = (c, a) => { const q = (u, v) => P([c[0] + u * U[0] + v * V[0], c[1] + u * U[1] + v * V[1]]);
      const o2 = [h.path(`M ${q(-6, -7)} Q ${q(0, -9.5)} ${q(6, -7)} Q ${q(8, 0)} ${q(5.5, 5.5)} Q ${q(0, 7.5)} ${q(-5.5, 5.5)} Q ${q(-8, 0)} ${q(-6, -7)} Z`, W(h.a.arete))];
      for (const u of [-3, 0, 3]) o2.push(h.path(`M ${q(u, -7.5)} L ${q(u, -2)}`, h.a.fin));
      o2.push(h.path(`M ${q(-5, 1)} Q ${q(0, 4.5)} ${q(5, 3)}`, h.a.detail));
      return o2.join('\n'); };
    const Ep = [x0 + 2, G - 170], El = [x0 - 1, G - 168];
    o.push(bras([El, [x0 + 20, G - 140], [Fl[0] - 6 * U[0], Fl[1] + 2]]));
    o.push(h.path(corps, W(h.a.arete)), h.path(tete, W(h.a.arete)));
    o.push(h.path(`M ${P([x0 - 4, G - 55])} Q ${P([x0 + 2, G - 30])} ${P([x0 + 1, G - 6])}`, h.a.detail));
    // la perche et la louche
    o.push(louche(g, id, 1, false));
    o.push(poing(Fl));
    o.push(bras([Ep, [x0 + 1, G - 140], [Fp[0] - 5, Fp[1] + 1]]));
    o.push(poing(Fp));
    // loupe sur la louche : le manche lié sous la perche, le bol qui verse
    loupe(o, g.M, g.loupe, g.k, 'k3704-louche', T => louche(g, T, g.k, true));
    return o.join('\n');
  };

  // ── 8. La pierre douteuse sous la première eau, en grand : fendue, les éclats qui partent ──
  const ECL = z => ({ G: z.h - 16, cx: z.l / 2, top: z.h - 16 - 4 - 78 });
  const eclate = z => {
    const { G, cx } = ECL(z), o = [], R = rng(91);
    // la braise
    o.push(h.rect(0, G, z.l, 7, h.a.hachure('terre', 'aucun')), h.ligne(0, G, z.l, G, h.a.arete));
    o.push(h.path(`M 2,${G} C 30,${G - 14} ${z.l - 30},${G - 14} ${z.l - 2},${G} Z`, W(h.a.detail)));
    for (let i = 0; i < 12; i++) { const x = 8 + i * (z.l - 16) / 11 + (R() - 0.5) * 4; o.push(h.ellipse(x, G - 4 - R() * 4, 2.6 + R() * 1.4, 1.6, h.a.plein)); }
    // la pierre en deux moitiés, chacune basculée vers l'extérieur autour de son pied
    const rx = 50, ry = 40, yc = G - 4 - ry, n = 36, arc = [];
    for (let i = 0; i <= n; i++) { const a = -Math.PI / 2 + i / n * 2 * Math.PI, r = 1 + 0.05 * Math.sin(3 * a + 0.7) + 0.04 * Math.sin(5 * a + 2.1); arc.push([cx + rx * r * Math.cos(a), Math.min(yc + ry * r * Math.sin(a), G - 4)]); }
    const fente = [[cx + 1, yc - ry], [cx - 5, yc - 22], [cx + 4, yc - 6], [cx - 3, yc + 10], [cx + 2, yc + 26], [cx, G - 4]];
    const droite = [...arc.slice(0, n / 2 + 1), ...fente.slice(1, -1).reverse()];
    const gauche = [...arc.slice(n / 2, n + 1), ...fente.slice(1, -1)];
    o.push(dur(`M ${gauche.map(p => P(rot(p, [cx - 4, G - 4], -5))).join(' L ')} Z`, 'p3704-fonce', 'contour'));
    o.push(dur(`M ${droite.map(p => P(rot(p, [cx + 4, G - 4], 5))).join(' L ')} Z`, 'p3704-fonce', 'contour'));
    // les éclats qui partent, à hauteur de visage
    const top = yc - ry;
    const eclat = (x, y, r, a) => { const p = [[-r, r * 0.4], [r * 0.2, -r * 0.8], [r, r * 0.5]].map(v => rot([x + v[0], y + v[1]], [x, y], a)); return dur(`M ${p.map(P).join(' L ')} Z`, 'p3704-fonce', 'arete'); };
    o.push(eclat(cx - 44, top - 40, 6, 20), eclat(cx - 58, top - 8, 5, -30), eclat(cx + 46, top - 34, 5.5, 50));
    o.push(h.fleche(`M ${f(cx - 12)},${f(top + 2)} Q ${f(cx - 24)},${f(top - 20)} ${f(cx - 36)},${f(top - 32)}`, h.a.arete));
    o.push(h.fleche(`M ${f(cx - 20)},${f(top + 12)} Q ${f(cx - 36)},${f(top + 4)} ${f(cx - 50)},${f(top - 2)}`, h.a.arete));
    o.push(h.fleche(`M ${f(cx + 12)},${f(top + 2)} Q ${f(cx + 24)},${f(top - 16)} ${f(cx + 38)},${f(top - 27)}`, h.a.arete));
    // l'eau qui tombe de la louche, hors du cadre
    const goutte = (x, y, r) => h.path(`M ${f(x)},${f(y - 2.2 * r)} C ${f(x + 1.1 * r)},${f(y - 0.4 * r)} ${f(x + r)},${f(y + r)} ${f(x)},${f(y + r)} C ${f(x - r)},${f(y + r)} ${f(x - 1.1 * r)},${f(y - 0.4 * r)} ${f(x)},${f(y - 2.2 * r)} Z`, W(h.a.detail));
    for (let y = top - 14; y > 8; y -= 30) o.push(goutte(cx + 1, y, 3.6));
    return o.join('\n');
  };

  return {
    ref: '37-04',
    titre: 'Trier et éprouver les pierres du sauna',
    desc: 'Six pierres posées au sol, au même cadrage : la bonne, foncée, dense et sans couches, puis les cinq à jeter — feuilletée, pâle et grenue de quartz, piquée de cubes dorés de pyrite, poreuse et friable, et le galet pris dans le ruisseau. En bas, l’épreuve au feu dehors : les pierres dans le feu, l’homme loin en arrière qui jette la première eau avec une louche liée au bout d’une perche, et la pierre douteuse qui éclate.',
    format: 'pleine',
    disposition: [['garder', 'feuillet', 'quartz'], ['pyrite', 'poreuse', 'eau'], ['epreuve', 'eclate']],
    hauteurs: [1, 1, 1.75],
    largeurs: [[1, 1, 1], [1, 1, 1], [2.7, 1]],
    vues: {
      garder: {
        titre: 'À garder',
        dessin: garder,
        renvois: z => [{ n: 1, rond: [z.l - 14, 12], cible: [z.l / 2 + 34, SOLV(z) - 48], texte: 'foncée, lourde, grain fin, sans couches' }],
      },
      feuillet: {
        titre: 'À jeter : feuilletée',
        dessin: feuillet,
        renvois: z => [{ n: 2, rond: [z.l - 14, 12], cible: [z.l / 2 + 38, SOLV(z) - 36], texte: 'se délite en plaques, s’ouvre au feu' }],
      },
      quartz: {
        titre: 'À jeter : pâle et grenue',
        dessin: quartz,
        renvois: z => [{ n: 3, rond: [z.l - 14, 12], cible: [z.l / 2 + 32, SOLV(z) - 44], texte: 'grains vitreux : quartz, se fend' }],
      },
      pyrite: {
        titre: 'À jeter : cubes dorés',
        dessin: pyrite,
        renvois: z => { const L = LP(z); return [{ n: 4, rond: [14, 12], cible: [66 - 28, SOLV(z) - 30], texte: 'paillettes ou petits cubes dorés : pyrite' }]; },
      },
      poreuse: {
        titre: 'À jeter : poreuse',
        dessin: poreuse,
        renvois: z => [{ n: 5, rond: [z.l - 14, 12], cible: [z.l / 2 + 16, SOLV(z) - 44], texte: 'poreuse, friable : boit l’eau, s’effrite' }],
      },
      eau: {
        titre: 'À jeter : prise dans l’eau',
        dessin: eau,
        renvois: z => [{ n: 6, rond: [z.l - 14, 12], cible: [z.l / 2 + 26, SOLV(z) - 58], texte: 'ruisseau ou grève : pores pleins d’eau' }],
      },
      epreuve: {
        titre: 'L’épreuve au feu, dehors',
        dessin: epreuve,
        renvois: z => {
          const g = geo(z), L = g.loupe;
          return [
            { n: 7, rond: [g.xf - 100, g.G - 70], cible: [g.xf - 60, g.G - 14], texte: 'chaque pierre au feu, avant de la monter' },
            { n: 8, rond: [g.px + 44, 16], cible: [g.px + 12, 44], texte: 'tous en arrière, personne penché dessus' },
            { n: 9, rond: [L.c[0] - L.r - 18, 18], cible: [L.c[0] - 28, L.c[1] - 14], texte: 'louche liée au bout d’une perche' },
          ];
        },
      },
      eclate: {
        titre: 'Sous la première eau',
        dessin: eclate,
        renvois: z => { const e = ECL(z); return [{ n: 10, rond: [z.l - 11, e.top - 6], cible: [e.cx + 3, e.top + 14], texte: 'craque, se fend, s’écaille : on la jette' }]; },
      },
    },
  };
};
