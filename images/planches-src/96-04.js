// Planche 96-04 — la traîne à roches. Chapitre 96, « Les outils qu'on fait » : deux patins de bois
// franc, des planches clouées en travers, le devant relevé pour qu'elle ne pique pas ; tirée à la
// corde, au VTT ou à la motoneige. Étape 11 : chaque bêchage remonte des roches, elles partent sur
// la traîne.
// Le chapitre ne donne aucune mesure : aucune cote. Les proportions (patin posé sur chant, nez scié
// en courbe par-dessous, planches qui débordent les patins) sont dessinées, pas cotées. Le chapitre
// ne dit pas comment la corde s'attache : elle est dessinée passée dans un trou percé de part en part
// au nez de chaque patin, arrêtée par un nœud dehors, et les deux brins noués en boucle devant, où
// l'on tire.
// Repère 3D (unités de dessin, pas des mm imprimés) : x le long de la traîne, le nez vers +x ; y en
// travers, 0 du côté de l'œil ; z en hauteur, 0 au sol.
// La charte : dans les pièces écartées, le flanc du patin de devant au contour fort, le patin du
// fond, derrière, qui recule en gris loin. Pas d'ombre :
// les faces des planches et le bout des patins sont trop minces à cette échelle. Le rouge : le sens où
// l'on tire la boucle (le geste). Pas de gris sur la vue de dessus, à plat.
module.exports = (h) => {
  const A = h.a;
  const F = h.formes;
  const r1 = v => Math.round(v * 10) / 10;
  const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const bA = blanc(A.arete), bD = blanc(A.detail);
  const d = pts => pts.map((p, i) => `${i ? 'L' : 'M'}${r1(p[0])} ${r1(p[1])}`).join(' ');
  const poly = (pts, at = bA) => `<path d="${d(pts)} Z" ${at}/>`;
  const ligne = (pts, at = A.fin) => `<path d="${d(pts)}" ${at}/>`;
  const alea = g => { let s = g; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; };
  // courbe lisse fermée qui passe par chaque point (Catmull-Rom)
  const lisse = pts => {
    const n = pts.length;
    let s = `M${r1(pts[0][0])} ${r1(pts[0][1])}`;
    for (let i = 0; i < n; i++) {
      const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      s += ` C${r1(c1[0])} ${r1(c1[1])} ${r1(c2[0])} ${r1(c2[1])} ${r1(p2[0])} ${r1(p2[1])}`;
    }
    return s + ' Z';
  };

  // ─── la traîne ────────────────────────────────────────────────────────────────────────
  const L = 1800, H = 180, E = 100;          // patin : longueur, hauteur (posé sur chant), épaisseur
  const XC = 1250, ZT = 125;                 // le dessous remonte à partir de XC ; au bout, à ZT du sol
  const dessous = x => (x <= XC ? 0 : ZT * ((x - XC) / (L - XC)) ** 2);
  const PAT = [100, 700];                    // y du côté extérieur-œil de chaque patin
  const W = 900;                             // largeur des planches
  const T = 25, B = 150, G = 12, NP = 10;    // planche : épaisseur, largeur, jour, nombre
  const PL = Array.from({ length: NP }, (_, i) => i * (B + G));   // x arrière de chaque planche
  const XAV = PL[NP - 1] + B;                // devant du plancher
  const TROU = [1700, 140], RT = 14;         // le trou de la corde, dans le nez
  const APEX = [2300, 450, 300];             // le nœud qui réunit les deux brins
  const CLOUS = [45, 105];                   // deux clous par planche et par patin
  const YCL = PAT.map(y => y + E / 2);

  // le profil du patin (x, z) : dessous plat, puis la courbe du nez, le bout, le dessus
  const profil = (() => {
    const p = [[0, 0], [XC, 0]];
    for (let i = 1; i <= 16; i++) { const x = XC + (L - XC) * i / 16; p.push([x, dessous(x)]); }
    p.push([L, H], [0, H]);
    return p;
  })();
  // fil du bois sur le flanc : droit, il sort par la courbe du nez
  const fils = [[48, 0.05, 0.62], [48, 0.7, 1], [96, 0.02, 0.28], [96, 0.36, 1], [150, 0.1, 0.8], [150, 0.86, 1]].map(([z, a, b]) => {
    let xf = L;
    if (z < ZT) xf = XC + (L - XC) * Math.sqrt(z / ZT);
    return [[a * xf, z], [b * xf, z]];
  });
  // le fil d'une planche : trois traits interrompus, en fractions de largeur et de longueur
  const FILP = [[0.3, 0.03, 0.55], [0.68, 0.35, 0.97], [0.5, 0.62, 0.88]];

  // un nœud d'arrêt : une boule serrée, deux tours dessus, le bout qui sort
  const noeud = (c, ax, r, queue) => {
    const [ux, uy] = ax, nx = -uy, ny = ux;
    const P = (a, b) => [c[0] + ux * a + nx * b, c[1] + uy * a + ny * b];
    const out = [];
    if (queue) out.push(F.corde([P(r * 0.6, 0), queue[0], queue[1]], { ep: r * 0.75, debut: 'ouvert', fin: 'libre' }));
    const bord = Array.from({ length: 14 }, (_, i) => { const t = 2 * Math.PI * i / 14; return P(r * 1.15 * Math.cos(t), r * 0.95 * Math.sin(t)); });
    out.push(`<path d="${lisse(bord)}" ${bA}/>`);
    out.push(ligne([P(-r * 0.45, -r * 0.85), P(-r * 0.05, 0), P(-r * 0.45, r * 0.85)], A.detail));
    out.push(ligne([P(r * 0.25, -r * 0.8), P(r * 0.6, 0), P(r * 0.25, r * 0.8)], A.detail));
    return out.join('\n');
  };

  // une roche posée : contour irrégulier arrondi, le dessous aplati sur le plancher, une facette
  const roche = (cx, yb, rx, ry, g) => {
    const R = alea(g), n = 7, cy = yb - ry * 0.9, pts = [];
    for (let i = 0; i < n; i++) {
      const a = 2 * Math.PI * (i + 0.5) / n + (R() - 0.5) * 0.5, k = 1 + (R() - 0.5) * 0.28;
      pts.push([cx + rx * k * Math.cos(a), Math.min(yb, cy + ry * k * Math.sin(a))]);
    }
    // coins arrondis : chaque sommet devient une courbe entre deux points de ses côtés
    const mil = (p, q, t) => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t];
    let dd = '';
    for (let i = 0; i < n; i++) {
      const a = pts[(i - 1 + n) % n], b = pts[i], c = pts[(i + 1) % n];
      const u = mil(b, a, 0.3), v = mil(b, c, 0.3);
      dd += `${i ? ' L' : 'M'}${r1(u[0])} ${r1(u[1])} Q${r1(b[0])} ${r1(b[1])} ${r1(v[0])} ${r1(v[1])}`;
    }
    const o = [`<path d="${dd} Z" ${bA}/>`];
    // une facette : l'arête du dessus reprise en dedans
    const hauts = pts.filter(p => p[1] < cy).sort((a, b) => a[0] - b[0]);
    if (hauts.length >= 2) {
      const [p, q] = hauts;
      const f = t => [cx + (t[0] - cx) * 0.7, cy + (t[1] - cy) * 0.7];
      o.push(ligne([f(mil(p, q, 0.1)), f(q), f(mil(q, [cx + rx * 0.3, cy - ry * 0.2], 0.4))], A.fin));
    }
    for (let i = 0; i < 4; i++) o.push(h.cercle(cx + (R() - 0.5) * rx * 0.9, cy + (R() - 0.3) * ry * 0.7, 0.55, A.plein));
    return o.join('\n');
  };

  // ─── 1. les pièces écartées (axonométrie) ──────────────────────────────────────────────
  const th = -30 * Math.PI / 180, ph = 22 * Math.PI / 180;
  const DZ = 290;                            // le plancher soulevé au-dessus des patins
  const pr0 = (x, y, z) => [x * Math.cos(th) - y * Math.sin(th), -(z * Math.cos(ph) + (x * Math.sin(th) + y * Math.cos(th)) * Math.sin(ph))];
  const gE = z => {
    const cles = [];
    for (const y0 of PAT) for (const [x, zz] of profil) { cles.push(pr0(x, y0, zz), pr0(x, y0 + E, zz)); }
    for (const x of [0, XAV]) for (const y of [0, W]) cles.push(pr0(x, y, H + DZ + T));
    cles.push(pr0(APEX[0] + 160, APEX[1], APEX[2]));
    const us = cles.map(p => p[0]), vs = cles.map(p => p[1]);
    const u0 = Math.min(...us), u1 = Math.max(...us), v0 = Math.min(...vs), v1 = Math.max(...vs);
    const m = 24, s = Math.min((z.l - 2 * m) / (u1 - u0), (z.h - 2 * m) / (v1 - v0));
    const ox = (z.l - (u1 - u0) * s) / 2 - u0 * s, oy = (z.h - (v1 - v0) * s) / 2 - v0 * s;
    const P = (x, y, zz) => { const q = pr0(x, y, zz); return [ox + q[0] * s, oy + q[1] * s]; };
    return { P, s };
  };
  const eclatee = z => {
    const { P, s } = gE(z);
    const out = [];
    const patin = (y0, at = bA, atFlanc = at) => {
      const o = [];
      o.push(poly([[0, H], [L, H]].map(([x, zz]) => P(x, y0, zz)).concat([P(L, y0 + E, H), P(0, y0 + E, H)]), at));   // dessus
      o.push(ligne([P(0, y0 + E / 2, H), P(L, y0 + E / 2, H)]));
      o.push(poly([P(L, y0, ZT), P(L, y0 + E, ZT), P(L, y0 + E, H), P(L, y0, H)], at));                               // bout
      o.push(poly(profil.map(([x, zz]) => P(x, y0, zz)), atFlanc));                                                // flanc
      for (const f of fils) o.push(ligne(f.map(([x, zz]) => P(x, y0, zz))));
      return o.join('\n');
    };
    const ep = Math.max(2.6, 16 * s);
    // patin du fond, les deux brins et la boucle, puis le patin de devant par-dessus
    // le patin du fond, derrière : gris loin
    out.push(patin(PAT[1], A.arete.replace('fill="none"', 'fill="#E6E6E6"')));
    // le trou, sur le flanc intérieur du patin du fond, d'où sort la corde
    out.push(poly(Array.from({ length: 16 }, (_, i) => { const a = 2 * Math.PI * i / 16; return P(TROU[0] + RT * Math.cos(a), PAT[1], TROU[1] + RT * Math.sin(a)); }), A.plein));
    const ap = P(...APEX);
    out.push(F.cordes([
      { pts: [P(TROU[0], PAT[1], TROU[1]), P(TROU[0] + 10, PAT[1] - 60, TROU[1] + 6), P(2000, 560, 210), ap], ep, debut: 'coupe', fin: 'ouvert' },
      { pts: [P(TROU[0], PAT[0] + E, TROU[1]), P(2000, 290, 210), ap], ep, debut: 'coupe', fin: 'ouvert' },
      { pts: [ap, P(APEX[0] + 80, APEX[1] - 42, APEX[2]), P(APEX[0] + 160, APEX[1], APEX[2]), P(APEX[0] + 80, APEX[1] + 42, APEX[2]), ap], ep, debut: 'ouvert', fin: 'ouvert' },
    ]));
    const ax = (() => { const a = P(APEX[0], APEX[1], APEX[2]), b = P(APEX[0] + 100, APEX[1], APEX[2]); const n = Math.hypot(b[0] - a[0], b[1] - a[1]); return [(b[0] - a[0]) / n, (b[1] - a[1]) / n]; })();
    out.push(noeud(ap, ax, ep * 1.25));
    out.push(patin(PAT[0], bA, blanc(A.contour)));      // le patin de devant : son flanc au contour fort
    // le nœud d'arrêt, dehors, sur le flanc du patin de devant
    const kn = P(TROU[0], PAT[0] - 10, TROU[1]);
    out.push(noeud(kn, [0.5, -0.87], ep * 1.2, [P(TROU[0] + 50, PAT[0] - 16, TROU[1] - 4), P(TROU[0] + 95, PAT[0] - 18, TROU[1] - 14)]));
    // les clous : un trait d'axe, du dessous du plancher au dessus du patin
    for (const i of [0, NP - 1]) for (const yc of YCL) for (const c of CLOUS) {
      out.push(ligne([P(PL[i] + c, yc, H + 6), P(PL[i] + c, yc, H + DZ)], A.cache));
    }
    // le plancher, de l'arrière vers le devant
    for (let i = 0; i < NP; i++) {
      const x0 = PL[i], x1 = x0 + B, zb = H + DZ, zt = zb + T;
      out.push(poly([P(x0, 0, zb), P(x1, 0, zb), P(x1, 0, zt), P(x0, 0, zt)]));
      out.push(poly([P(x1, 0, zb), P(x1, W, zb), P(x1, W, zt), P(x1, 0, zt)], bD));
      out.push(poly([P(x0, 0, zt), P(x1, 0, zt), P(x1, W, zt), P(x0, W, zt)]));
      for (const [f, a, b] of FILP) out.push(ligne([P(x0 + B * f, W * a, zt), P(x0 + B * f, W * b, zt)]));
      for (const yc of YCL) for (const c of CLOUS) { const q = P(x0 + c, yc, zt); out.push(h.cercle(q[0], q[1], 1.3, A.plein)); }
    }
    return out.join('\n');
  };

  // ─── 2 et 3. de côté et de dessus, alignées (même échelle, même x) ───────────────────────
  const XMAX = 2700;
  const gO = z => {
    const s = (z.l - 30) / (XMAX + 60);
    const X = x => 30 + x * s;
    return { s, X };
  };
  const cote = z => {
    const { s, X } = gO(z);
    const yg = z.h - 22, Z = zz => yg - zz * s;
    const out = [];
    // le sol
    out.push(`<path d="M0 ${r1(yg)} H${r1(z.l)} V${r1(yg + 12)} H0 Z" ${h.a.hachure('terre', 'fin')}/>`);
    out.push(h.ligne(0, yg, z.l, yg, A.arete));
    // la corde : du trou jusqu'au nœud, puis la boucle vue par la tranche ; le patin passe devant
    const ep = Math.max(2.6, 16 * s);
    const ap = [X(APEX[0]), Z(APEX[2])];
    out.push(F.cordes([
      { pts: [[X(TROU[0]), Z(TROU[1])], [X(2000), Z(196)], ap], ep, debut: 'coupe', fin: 'ouvert' },
      { pts: [ap, [X(APEX[0] + 80), Z(APEX[2] + 10)], [X(APEX[0] + 160), Z(APEX[2] + 4)], [X(APEX[0] + 80), Z(APEX[2] - 8)], ap], ep, debut: 'ouvert', fin: 'ouvert' },
    ]));
    const dir = (() => { const n = Math.hypot(600, 160); return [600 / n, -160 / n]; })();
    out.push(noeud(ap, [1, 0], ep * 1.25));
    // le sens où l'on tire
    const f0 = [X(APEX[0] + 200), Z(APEX[2] + 14)];
    out.push(h.geste(`M${r1(f0[0])} ${r1(f0[1])} L${r1(f0[0] + dir[0] * 40)} ${r1(f0[1] + dir[1] * 40)}`));
    // le patin de devant, avec son fil
    out.push(poly(profil.map(([x, zz]) => [X(x), Z(zz)]), blanc(A.contour)));
    for (const f of fils) out.push(ligne(f.map(([x, zz]) => [X(x), Z(zz)])));
    // les roches, puis les bouts de planches par-dessus leur pied
    const R = [[260, 150, 100, 11], [600, 170, 125, 23], [930, 200, 95, 37], [1250, 140, 110, 41], [1480, 110, 80, 53],
      [430, 95, 62, 67], [1090, 90, 58, 71], [770, 85, 50, 83]];
    for (const [x, rx, ry, g] of R) out.push(roche(X(x), Z(H + T), rx * s, ry * s, g));
    for (const x0 of PL) out.push(h.rect(X(x0), Z(H + T), B * s, T * s, bA));
    // le nœud d'arrêt sur le flanc, par-dessus le trou
    out.push(noeud([X(TROU[0]), Z(TROU[1])], [0, 1], ep * 1.2));
    return out.join('\n');
  };
  const dessus = z => {
    const { s, X } = gO(z);
    const y0 = 14, Y = y => y0 + (W - y) * s;   // le côté de l'œil (y = 0) en bas
    const out = [];
    const ep = Math.max(2.6, 16 * s);
    const ap = [X(APEX[0]), Y(APEX[1])];
    // les nez des patins, qui dépassent du plancher ; le trou de part en part, caché
    for (const p of PAT) {
      out.push(h.rect(X(XAV), Y(p + E), (L - XAV) * s, E * s, bA));
      out.push(ligne([[X(XAV), Y(p + E / 2)], [X(L), Y(p + E / 2)]]));
      for (const dx of [-RT, RT]) out.push(ligne([[X(TROU[0] + dx), Y(p)], [X(TROU[0] + dx), Y(p + E)]], A.cache));
    }
    // la corde à travers chaque patin, cachée : du trou sur la face intérieure au nœud dehors
    for (const p of PAT) for (const dx of [-ep / 2 / s, ep / 2 / s]) out.push(ligne([[X(TROU[0]) + dx * s, Y(p)], [X(TROU[0]) + dx * s, Y(p + E)]], A.cache));
    // les deux brins, la boucle et son nœud
    out.push(F.cordes([
      { pts: [[X(TROU[0]), Y(PAT[1])], [X(TROU[0] + 15), Y(PAT[1] - 45)], [X(2000), Y(560)], ap], ep, debut: 'coupe', fin: 'ouvert' },
      { pts: [[X(TROU[0]), Y(PAT[0] + E)], [X(TROU[0] + 15), Y(PAT[0] + E + 45)], [X(2000), Y(340)], ap], ep, debut: 'coupe', fin: 'ouvert' },
      { pts: [ap, [X(APEX[0] + 80), Y(APEX[1] - 42)], [X(APEX[0] + 160), Y(APEX[1])], [X(APEX[0] + 80), Y(APEX[1] + 42)], ap], ep, debut: 'ouvert', fin: 'ouvert' },
    ]));
    out.push(noeud(ap, [1, 0], ep * 1.25));
    // les nœuds d'arrêt, dehors
    out.push(noeud([X(TROU[0]), Y(PAT[0] - 12)], [0, 1], ep * 1.2, [[X(TROU[0] + 25), Y(PAT[0] - 70)], [X(TROU[0] + 60), Y(PAT[0] - 95)]]));
    out.push(noeud([X(TROU[0]), Y(PAT[1] + E + 12)], [0, -1], ep * 1.2, [[X(TROU[0] + 25), Y(PAT[1] + E + 70)], [X(TROU[0] + 60), Y(PAT[1] + E + 95)]]));
    // le plancher, les patins cachés dessous, les clous
    for (const x0 of PL) {
      out.push(h.rect(X(x0), Y(W), B * s, W * s, bA));
      for (const [f, a, b] of FILP) out.push(ligne([[X(x0 + B * f), Y(W * a)], [X(x0 + B * f), Y(W * b)]]));
      for (const yc of YCL) for (const c of CLOUS) out.push(h.cercle(X(x0 + c), Y(yc), 1.4, A.plein));
    }
    for (const p of PAT) for (const y of [p, p + E]) out.push(ligne([[X(0), Y(y)], [X(XAV), Y(y)]], A.cache));
    return out.join('\n');
  };

  return {
    ref: '96-04',
    titre: 'La traîne à roches',
    desc: 'La traîne à roches en trois vues. Les pièces écartées : deux patins de bois franc posés sur '
      + 'chant, le dessous du nez scié en courbe qui remonte jusqu’au bout ; au-dessus, les planches '
      + 'posées en travers, qui débordent les patins, et les traits des clous qui descendent de chaque '
      + 'planche dans chaque patin. Une corde passe dans un trou au nez de chaque patin, arrêtée dehors '
      + 'par un nœud ; les deux brins se rejoignent devant en une boucle nouée. De côté, chargée : les '
      + 'roches sur le plancher, le nez relevé qui glisse sur le sol, la corde tirée vers l’avant et un '
      + 'peu vers le haut. De dessus, à vide, alignée sous la vue de côté : les planches, deux clous par '
      + 'patin, les patins cachés dessous, les nez qui dépassent, la corde en patte d’oie.',
    format: 'pleine',
    disposition: [['eclatee'], ['cote'], ['dessus']],
    hauteurs: [4, 2.5, 3.8],
    vues: {
      eclatee: {
        titre: 'Les pièces, écartées',
        dessin: eclatee,
        renvois: z => {
          const { P } = gE(z);
          const pat = P(700, PAT[0], 0), pl = P(PL[2], 0, H + DZ + T / 2), cl = P(PL[0] + CLOUS[0], YCL[0], H + DZ / 2);
          const nez = P(1600, PAT[0], dessous(1600));
          return [
            { n: 1, rond: [pat[0] - 20, pat[1] + 26], cible: [pat[0], pat[1] - 3], texte: 'patin de bois franc' },
            { n: 2, rond: P(PL[1], W + 260, H + DZ + T), cible: P(PL[1] + B / 2, W - 70, H + DZ + T), texte: 'planches clouées en travers' },
            { n: 3, rond: [cl[0] - 34, cl[1]], cible: [cl[0] - 1, cl[1]], texte: 'clous : chaque planche dans chaque patin' },
            { n: 4, rond: [nez[0] + 34, nez[1] + 10], cible: [nez[0] + 2, nez[1] + 1], texte: 'devant relevé : elle ne pique pas' },
          ];
        },
      },
      cote: {
        titre: 'De côté, chargée',
        dessin: cote,
        renvois: z => {
          const { s, X } = gO(z);
          const yg = z.h - 22, Z = zz => yg - zz * s;
          return [
            { n: 5, rond: [X(1700), Z(H + T + 150)], cible: [X(1530), Z(H + T + 70)], texte: 'roches remontées au bêchage' },
            { n: 6, rond: [X(APEX[0] + 250), Z(APEX[2] - 60)], cible: [X(APEX[0] + 162), Z(APEX[2] + 2)], texte: 'boucle : à la corde, au VTT ou à la motoneige' },
          ];
        },
      },
      dessus: {
        titre: 'De dessus, à vide',
        dessin: dessus,
        renvois: z => {
          const { s, X } = gO(z);
          const Y = y => 14 + (W - y) * s;
          return [
            { n: 7, rond: [11, Y(PAT[1] + E / 2) - 18], cible: [X(0) + 6, Y(PAT[1] + E / 2)], texte: 'patins, cachés sous les planches' },
            { n: 8, rond: [X(TROU[0] - 120), Y(PAT[0] - 70)], cible: [X(TROU[0]) - 4, Y(PAT[0] - 16)], texte: 'trou dans le nez ; nœud d’arrêt dehors' },
            { n: 9, rond: [X(APEX[0] + 40), Y(APEX[1] - 170)], cible: [X(APEX[0]), Y(APEX[1] - 18)], texte: 'les deux brins noués en boucle' },
          ];
        },
      },
    },
  };
};
