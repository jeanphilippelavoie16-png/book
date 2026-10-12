// Planche 15-01 — sortir d'un trou dans la glace (ch. 20, procédure 35 ; matériel : pics à glace).
module.exports = (h) => {
  const INK = '#1A1A1A';
  const P = (x, y) => `${x.toFixed(1)} ${y.toFixed(1)}`;
  const blanc = a => a.replace('fill="none"', 'fill="#FFFFFF"');
  const AR = blanc(h.a.arete);
  // premier passage épais : ce qui dépasse autour de l'union des pièces fait la silhouette
  const EP = `fill="#FFFFFF" stroke="${INK}" stroke-width="3.4" stroke-linejoin="round" stroke-linecap="round"`;
  const eauSansTrait = h.a.hachure('eau').replace(/stroke="[^"]*"/, 'stroke="none"').replace(/stroke-width="[^"]*"/, '');

  // capsule effilée de a à b (un membre)
  const cap = (a, b, ra, rb) => {
    const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1;
    const nx = -dy / L, ny = dx / L;
    return `M ${P(a[0] + nx * ra, a[1] + ny * ra)} L ${P(b[0] + nx * rb, b[1] + ny * rb)} ` +
      `A ${rb.toFixed(1)} ${rb.toFixed(1)} 0 0 0 ${P(b[0] - nx * rb, b[1] - ny * rb)} ` +
      `L ${P(a[0] - nx * ra, a[1] - ny * ra)} A ${ra.toFixed(1)} ${ra.toFixed(1)} 0 0 0 ${P(a[0] + nx * ra, a[1] + ny * ra)} Z`;
  };
  const rond = (c, r) => `M ${P(c[0] - r, c[1])} A ${r.toFixed(1)} ${r.toFixed(1)} 0 1 0 ${P(c[0] + r, c[1])} A ${r.toFixed(1)} ${r.toFixed(1)} 0 1 0 ${P(c[0] - r, c[1])} Z`;
  const poly = pts => 'M ' + pts.map(p => P(p[0], p[1])).join(' L ') + ' Z';
  const silhouette = parts => parts.map(d => h.path(d, EP)).concat(parts.map(d => h.path(d, AR))).join('\n');

  // repère d'une pose : cm → px
  const rep = (ox, oy, s) => ({ T: p => [ox + p[0] * s, oy + p[1] * s], s });

  // tête de profil ou vue de dessus, avec tuque ; up et face sont des vecteurs unitaires
  const tete = (R, c, up, face, avecNez) => {
    const C = R.T(c), s = R.s, r = 11 * s;
    const loc = (a, b) => [C[0] + face[0] * a * s + up[0] * b * s, C[1] + face[1] * a * s + up[1] * b * s];
    const dome = [];
    for (let i = 0; i <= 16; i++) { const t = Math.PI * i / 16; dome.push(loc(12 * Math.cos(t), 1 + 12 * Math.sin(t))); }
    const parts = [];
    if (avecNez) parts.push(poly([loc(8, -1), loc(13.5, -3.5), loc(8, -7)]));
    parts.push(rond(C, r), poly(dome), rond(loc(0, 16), 4 * s));
    const band = h.path(`M ${P(...loc(-11.8, 5.5))} L ${P(...loc(11.8, 5.5))}`, h.a.detail);
    return { parts, band };
  };

  // ── la glace en coupe, même cadrage pour les deux vignettes ─────────────────
  const cadre = z => {
    const s = (z.h - 12) / 195;
    const W = 6 + 42 * s;
    const xL = Math.max(0.5 * z.l, 122 * s);
    // assez large pour le corps à l'horizontale de s2, épaules au bord
    const xR = xL + 140 * s;
    return { s, W, xL, xR };
  };
  const glace = (z, c, morceau) => {
    const { s, W, xL, xR } = c;
    const t = W - 2 * s, b = W + 12 * s;
    const g = [[0, t], [xL, t], [xL - 3 * s, t + 5 * s], [xL + 2 * s, t + 9 * s], [xL - 1 * s, b], [0, b]];
    const d = [[z.l, t], [xR, t], [xR + 3 * s, t + 4 * s], [xR - 2 * s, t + 8 * s], [xR + 1 * s, b], [z.l, b]];
    const out = [
      h.rect(0, W, z.l, z.h - W, eauSansTrait),
      h.path(poly(g), h.a.blanc), h.path(poly(d), h.a.blanc),
      h.chemin(g, h.a.contour), h.chemin(d, h.a.contour),
      h.ligne(xL, W, xR, W, h.a.arete),
    ];
    if (morceau) out.push(h.path(poly([[xR - 30 * s, W - 3 * s], [xR - 10 * s, W - 6 * s], [xR - 8 * s, W + 6 * s], [xR - 29 * s, W + 9 * s]]), AR));
    return out.join('\n');
  };
  // un pic dans le poing : la tige visible, puis cachée dans la glace
  // tenu en poignard : le manche dépasse au-dessus du poing, le clou sort dessous
  const glaceHaut = -2;
  const pic = (R, f, dir) => {
    const s = R.s, F = [f[0] + dir[0] * 5.5, f[1] + dir[1] * 5.5];
    const t = (glaceHaut - F[1]) / dir[1];
    const B = [F[0] + dir[0] * t, glaceHaut], C = [B[0] + dir[0] * 8, B[1] + dir[1] * 8];
    const [Fp, Bp, Cp] = [R.T(F), R.T(B), R.T(C)];
    return {
      manche: cap(R.T(f), R.T([f[0] - dir[0] * 11, f[1] - dir[1] * 11]), 2.6 * s, 2.6 * s),
      clou: h.ligne(Fp[0], Fp[1], Bp[0], Bp[1], `stroke="${INK}" stroke-width="2" stroke-linecap="round" fill="none"`) + '\n' +
        h.ligne(Bp[0], Bp[1], Cp[0], Cp[1], h.a.cache),
      milieu: [(F[0] + B[0]) / 2, (F[1] + B[1]) / 2],
    };
  };

  // ── pose 1 : dans l'eau, face au côté d'où l'on venait ──────────────────────
  const pose1 = (z, c) => {
    const R = rep(c.xL, c.W, c.s), T = R.T, s = c.s;
    const hd = tete(R, [8, -22], [-0.196, -0.981], [-0.981, 0.196], true);
    // la pointe penche vers le corps, le manche vers l'avant : comme un piquet de tente, la
    // traction l'enfonce au lieu de la lever
    const pl = pic(R, [-55, -15], [0.34, 0.94]), pp = pic(R, [-45, -12], [0.34, 0.94]);
    const parts = [
      cap(T([14, 0]), T([-12, -11]), 6 * s, 5.5 * s), cap(T([-12, -11]), T([-50, -13]), 5.5 * s, 4.5 * s), pl.manche, rond(T([-55, -15]), 5.5 * s),
      cap(T([16, 62]), T([34, 100]), 8.5 * s, 7 * s), cap(T([34, 100]), T([34, 138]), 7 * s, 5.5 * s), cap(T([34, 138]), T([20, 142]), 6 * s, 5 * s),
      cap(T([20, 62]), T([13, 8]), 13 * s, 15 * s),
      cap(T([20, 64]), T([26, 104]), 8.5 * s, 7 * s), cap(T([26, 104]), T([20, 142]), 7 * s, 5.5 * s), cap(T([20, 142]), T([6, 146]), 6 * s, 5 * s),
      ...hd.parts,
      cap(T([10, 0]), T([-15, -8]), 6 * s, 5.5 * s), cap(T([-15, -8]), T([-40, -10]), 5.5 * s, 4.5 * s), pp.manche, rond(T([-45, -12]), 5.5 * s),
    ];
    const ourlet = [T([7, 40]), T([33, 44])];
    return [
      silhouette(parts), hd.band,
      h.ligne(ourlet[0][0], ourlet[0][1], ourlet[1][0], ourlet[1][1], h.a.detail),
      pl.clou, pp.clou,
    ].join('\n');
  };

  // ── pose 2 : à l'horizontale, coudes sur la glace près du bord, on tire ─────
  // épaules au bord, coudes pliés, avant-bras à plat : les pics plantés à une longueur
  // d'avant-bras devant les coudes, comme en s1, et non à bout de bras. Le haut du corps
  // repose sur les coudes et les pics.
  const PIC2 = [[-57, -14], [-51, -11]];
  const pose2 = (z, c) => {
    const R = rep(c.xL, c.W, c.s), T = R.T, s = c.s;
    const hd = tete(R, [-12, -29], [-0.7, -0.714], [-0.714, 0.7], true);
    const pl = pic(R, PIC2[0], [0.34, 0.94]), pp = pic(R, PIC2[1], [0.34, 0.94]);
    const parts = [
      cap(T([6, -22]), T([-16, -10]), 6 * s, 5.5 * s), cap(T([-16, -10]), T([-52, -12]), 5.5 * s, 4.5 * s), pl.manche, rond(T(PIC2[0]), 5.5 * s),
      cap(T([52, 0]), T([88, 8]), 8.5 * s, 7 * s), cap(T([88, 8]), T([118, 14]), 7 * s, 5.5 * s), cap(T([118, 14]), T([121, 27]), 6 * s, 5 * s),
      cap(T([56, -2]), T([6, -20]), 13 * s, 14 * s),
      cap(T([56, -3]), T([92, -2]), 8.5 * s, 7 * s), cap(T([92, -2]), T([120, -8]), 7 * s, 5.5 * s), cap(T([120, -8]), T([125, 3]), 6 * s, 5 * s),
      ...hd.parts,
      cap(T([2, -19]), T([-20, -7]), 6 * s, 5.5 * s), cap(T([-20, -7]), T([-46, -9]), 5.5 * s, 4.5 * s), pp.manche, rond(T(PIC2[1]), 5.5 * s),
    ];
    const o = [T([40, -22]), T([32, 4])];
    const f = (a, b) => h.fleche(`M ${P(...T(a))} L ${P(...T(b))}`);
    return [
      silhouette(parts), hd.band,
      h.ligne(o[0][0], o[0][1], o[1][0], o[1][1], h.a.detail),
      pl.clou, pp.clou,
      f([62, -38], [16, -38]),
      f([108, -16], [108, -32]), f([102, 21], [102, 37]),
    ].join('\n');
  };

  // ── vue de dessus : le trou, les traces, la roulade ─────────────────────────
  const dessus = z => {
    const s = (z.h - 12) / 190;
    const cy = z.h * 0.46;
    const xF = z.l * 0.42, yH = 6 + 88 * s;
    const hx = z.l * 0.8;
    const trou = [[-62, -8], [-48, -34], [-20, -44], [8, -40], [30, -46], [56, -28], [64, 2], [52, 30], [22, 44], [-10, 40], [-40, 42], [-60, 20]]
      .map(p => [hx + p[0] * s * 1.1, cy + p[1] * s]);
    const out = [h.path(poly(trou), h.a.hachure('eau', 'contour'))];
    out.push(h.path(poly([[hx - 20 * s, cy - 14 * s], [hx + 2 * s, cy - 20 * s], [hx + 8 * s, cy - 2 * s], [hx - 16 * s, cy + 4 * s]]), AR));
    out.push(h.path(poly([[hx + 22 * s, cy + 10 * s], [hx + 40 * s, cy + 6 * s], [hx + 44 * s, cy + 22 * s], [hx + 24 * s, cy + 26 * s]]), AR));
    // fissures
    out.push(h.chemin([[hx + 72 * s, cy - 2 * s], [hx + 92 * s, cy - 8 * s], [hx + 104 * s, cy - 4 * s], [hx + 122 * s, cy - 12 * s]], h.a.detail));
    out.push(h.chemin([[hx + 30 * s, cy + 46 * s], [hx + 38 * s, cy + 62 * s], [hx + 34 * s, cy + 76 * s]], h.a.detail));
    // traces de bottes, du bord gauche jusqu'au trou : semelle et talon, vers le trou
    const xG = xF + 78 * s;
    const pas = [];
    for (let x = 16, i = 0; x < hx - 76 * s; x += 26 * s, i++) {
      const y = cy + (i % 2 ? 7 : -7) * s;
      pas.push([x, y]);
      if (Math.abs(x - xF) < 40 * s || Math.abs(x - xG) < 34 * s) continue;
      out.push(h.ellipse(x + 2.5 * s, y, 6 * s, 3.2 * s, h.a.arete), h.ellipse(x - 9 * s, y, 2.4 * s, 2.6 * s, h.a.arete));
    }
    // le corps couché en travers des traces, tête en haut, un peu de biais
    const th = 7 * Math.PI / 180, co = Math.cos(th), si = Math.sin(th);
    const rot = p => [p[0] * co - p[1] * si, p[0] * si + p[1] * co];
    const R = { s, T: p => { const q = rot(p); return [xF + q[0] * s, yH + q[1] * s]; } }, T = R.T;
    // la place d'où il a roulé, en tireté
    const Tg = p => { const q = rot(p); return [xG + q[0] * s, yH + q[1] * s]; };
    out.push(h.path(cap(Tg([0, 92]), Tg([0, -48]), 20 * s, 22 * s), h.a.cache), h.path(rond(Tg([0, -70]), 11 * s), h.a.cache));
    const hd = tete(R, [0, -70], rot([0, -1]), rot([1, 0]), false);
    const parts = [
      cap(T([-8, 4]), T([-10, 44]), 8.5 * s, 7 * s), cap(T([-10, 44]), T([-11, 82]), 7 * s, 5.5 * s), cap(T([-11, 82]), T([-11, 96]), 6 * s, 5.5 * s),
      cap(T([8, 4]), T([10, 44]), 8.5 * s, 7 * s), cap(T([10, 44]), T([11, 82]), 7 * s, 5.5 * s), cap(T([11, 82]), T([11, 96]), 6 * s, 5.5 * s),
      cap(T([0, 2]), T([0, -48]), 16 * s, 21 * s),
      ...hd.parts,
      cap(T([-20, -48]), T([-25, -22]), 6 * s, 5.5 * s), cap(T([-25, -22]), T([-25, 0]), 5.5 * s, 4.5 * s), rond(T([-25, 5]), 5.5 * s),
      cap(T([20, -48]), T([25, -22]), 6 * s, 5.5 * s), cap(T([25, -22]), T([25, 0]), 5.5 * s, 4.5 * s), rond(T([25, 5]), 5.5 * s),
    ];
    out.push(silhouette(parts), hd.band);
    const ou = [T([-16, -2]), T([16, -2])];
    out.push(h.ligne(ou[0][0], ou[0][1], ou[1][0], ou[1][1], h.a.detail));
    // la roulade : deux arcs vers la gauche
    for (const y of [-30, 40]) {
      const a = T([58, y]), b = T([-44, y]);
      out.push(h.fleche(`M ${P(...a)} A ${(64 * s).toFixed(1)} ${(15 * s).toFixed(1)} 7 0 1 ${P(...b)}`));
    }
    return { svg: out.join('\n'), cy, xF, yH, s, hx, T, pas };
  };

  // ── les pics faits maison ───────────────────────────────────────────────────
  const corde = (d, w = 4.2) =>
    `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>\n` +
    `<path d="${d}" fill="none" stroke="#FFFFFF" stroke-width="${(w - 2.4).toFixed(1)}" stroke-linecap="round" stroke-linejoin="round"/>`;
  const pics = z => {
    const q = z.h / 173, bx = 120 * q + 10;
    const Y = y => y * q, X = x => bx + x * q;
    const out = [];
    // manteau
    const gauche = [[-16, 70], [-22, 76], [-58, 90], [-72, 112], [-78, 173]], droite = gauche.map(p => [-p[0], p[1]]);
    const manteau = gauche.concat(droite.slice().reverse()).map(p => [X(p[0]), Y(p[1])]);
    out.push(h.path(poly(manteau), h.a.blanc));
    out.push(h.chemin(gauche.map(p => [X(p[0]), Y(p[1])]), h.a.contour), h.chemin(droite.map(p => [X(p[0]), Y(p[1])]), h.a.contour));
    out.push(h.rect(X(-9), Y(62), 18 * q, 20 * q, AR));
    out.push(h.chemin([[X(-17), Y(70)], [X(0), Y(96)], [X(17), Y(70)]], h.a.arete));
    out.push(h.ligne(X(0), Y(96), X(0), Y(173), h.a.detail));
    out.push(h.ligne(X(-60), Y(116), X(-58), Y(173), h.a.detail), h.ligne(X(60), Y(116), X(58), Y(173), h.a.detail));
    // tête et tuque
    const dome = [];
    for (let i = 0; i <= 20; i++) { const t = Math.PI + Math.PI * i / 20; dome.push([X(25.5 * Math.cos(t)), Y(42 + 25.5 * Math.sin(t))]); }
    out.push(silhouette([rond([X(0), Y(46)], 24 * q), poly(dome), rond([X(0), Y(13)], 6 * q)]));
    out.push(h.ligne(X(-24.5), Y(35), X(24.5), Y(35), h.a.detail));
    // la paire emboîtée, en bandoulière : le cordon court passe sur une épaule, par-dessus
    // la tête, et sous le bras opposé ; la paire est au milieu de la poitrine, un pic à
    // chaque bout du cordon, les deux faces à clou l'une contre l'autre, l'élastique au joint
    // le poids de la paire tire le devant de la boucle en V : elle pend au bas du V
    const S = [-30, 79.1], A = [58.6, 120.8];
    const M = [6, 118], u = [0.99, -0.139], nn = [-u[1], u[0]];
    const at = (t, k = 0) => [M[0] + u[0] * t + nn[0] * k, M[1] + u[1] * t + nn[1] * k];
    const XY = p => [X(p[0]), Y(p[1])];
    const lp = 26, dp = 4.5;
    const P1 = at(-lp), P2 = at(lp);
    out.push(corde(`M ${P(...XY(S))} L ${P(...XY(P1))}`, 3.4), corde(`M ${P(...XY(P2))} L ${P(...XY(A))}`, 3.4));
    const bloc = (t0, t1, k) => poly([at(t0, -k), at(t1, -k), at(t1, k), at(t0, k)].map(XY));
    out.push(h.path(bloc(-lp, 0, dp), AR), h.path(bloc(0, lp, dp), AR));
    out.push(h.path(bloc(-2, 2, dp + 0.9), h.a.plein));
    const porte = { M: XY(M), cordon: XY([(P2[0] + A[0]) / 2, (P2[1] + A[1]) / 2]) };
    // un pic en grand
    const x0 = z.l * 0.55, x1 = z.l * 0.87, cy = z.h * 0.56, r = 20 * q;
    const cote = x0 + 22 * q;
    out.push(corde(`M ${P(cote, cy - r)} L ${P(cote, cy - r - 14 * q)} Q ${P(cote, cy - r - 36 * q)} ${P(cote - 50 * q, cy - r - 44 * q)} L ${P(x0 - 60 * q, cy - r - 50 * q)}`));
    out.push(h.path(`M ${P(x0, cy - r)} L ${P(x1, cy - r)} A ${(8 * q).toFixed(1)} ${r.toFixed(1)} 0 0 1 ${P(x1, cy + r)} L ${P(x0, cy + r)} A ${(8 * q).toFixed(1)} ${r.toFixed(1)} 0 0 1 ${P(x0, cy - r)} Z`, blanc(h.a.contour)));
    out.push(h.ellipse(x1, cy, 8 * q, r, h.a.arete));
    for (const dy of [-9, 8]) out.push(h.chemin([[x0 + 40 * q, cy + dy * q], [x0 + 90 * q, cy + (dy + 1.5) * q], [x1 - (dy < 0 ? 58 : 30) * q, cy + dy * q]], h.a.detail));
    // le trou du cordon, traversant, caché
    out.push(h.ligne(cote - 3 * q, cy - r, cote - 3 * q, cy + r, h.a.cache), h.ligne(cote + 3 * q, cy - r, cote + 3 * q, cy + r, h.a.cache));
    // le nœud dessous
    out.push(corde(`M ${P(cote, cy + r)} L ${P(cote, cy + r + 6 * q)} Q ${P(cote + 4 * q, cy + r + 14 * q)} ${P(cote + 14 * q, cy + r + 16 * q)}`));
    out.push(h.ellipse(cote, cy + r + 7 * q, 6 * q, 4.5 * q, AR));
    // le clou : tige cachée dans le manche, pointe sortie
    const rc = 3.2 * q;
    out.push(h.ligne(x1 - 80 * q, cy - rc, x1, cy - rc, h.a.cache), h.ligne(x1 - 80 * q, cy + rc, x1, cy + rc, h.a.cache), h.ligne(x1 - 80 * q, cy - rc, x1 - 80 * q, cy + rc, h.a.cache));
    out.push(h.path(poly([[x1, cy - rc], [x1 + 26 * q, cy - rc], [x1 + 44 * q, cy], [x1 + 26 * q, cy + rc], [x1, cy + rc]]), AR));
    out.push(h.ligne(x1 + 26 * q, cy - rc, x1 + 26 * q, cy + rc, h.a.detail));
    // le second trou, à côté du clou, parallèle et moins profond : il loge la pointe de
    // l'autre pic, assez creux pour la couvrir en entier
    const yt = cy - 11 * q, pt = 48 * q;
    out.push(h.ligne(x1 - pt, yt - rc, x1, yt - rc, h.a.cache), h.ligne(x1 - pt, yt + rc, x1, yt + rc, h.a.cache),
      h.chemin([[x1 - pt, yt - rc], [x1 - pt - 2 * q, yt], [x1 - pt, yt + rc]], h.a.cache));
    out.push(h.ellipse(x1, yt, 0.4 * rc, rc, h.a.plein));
    return { svg: out.join('\n'), X, Y, x0, x1, cy, r, cote, q, yt, porte };
  };

  return {
    ref: '15-01',
    titre: 'Sortir d’un trou dans la glace',
    desc: 'En tête, les pics faits d’un gros clou étêté entré dans un bout de manche à balai, emboîtés l’un dans l’autre et portés en bandoulière au milieu de la poitrine. En coupe : dans l’eau, face au côté d’où l’on venait, avant-bras à plat sur la glace ; puis le corps ramené à l’horizontale en battant des jambes, coudes sur la glace et pics plantés près du bord, on tire à plat ventre. Vu de dessus : sorti, on roule sur la glace vers ses traces au lieu de se relever.',
    format: 'pleine',
    disposition: [['pics'], ['s1', 's2'], ['s3']],
    hauteurs: [4, 5, 4],
    vues: {
      pics: {
        titre: 'Les pics, faits maison',
        dessin: z => pics(z).svg,
        renvois: z => {
          const p = pics(z);
          return [
            { n: 1, rond: [(p.x0 + p.x1) / 2, z.h - 12], cible: [(p.x0 + p.x1) / 2, p.cy + p.r + 1.5] },
            { n: 2, rond: [p.x1 - 80 * p.q + 16, z.h - 12], cible: [p.x1 - 80 * p.q, p.cy] },
            { n: 3, rond: [p.x1 + 26 * p.q, 16], cible: [p.x1 - 22 * p.q, p.yt] },
            { n: 4, rond: [p.X(96), p.Y(140)], cible: p.porte.cordon },
            { n: 5, rond: [p.X(80), p.Y(52)], cible: p.porte.M },
          ].map((o, i) => ({ ...o, texte: ['bout de manche à balai', 'clou étêté, côté coupé au fond du trou', 'second trou : loge la pointe de l’autre pic', 'cordon court, par-dessus la tête, sous un bras', 'la paire emboîtée au milieu de la poitrine'][i] }));
        },
      },
      s1: {
        titre: 'Se retourner',
        dessin: z => { const c = cadre(z); return [glace(z, c, true), pose1(z, c),
          h.fleche(`M ${P(12, c.W - 14 * c.s)} L ${P(c.xL - 76 * c.s, c.W - 14 * c.s)}`, h.a.cache)].join('\n'); },
        renvois: z => { const c = cadre(z), T = rep(c.xL, c.W, c.s).T; return [
          { n: 6, rond: T([48, -34]), cible: T([19.5, -24]), texte: 'face au côté d’où l’on venait' },
          { n: 7, rond: T([-30, -36]), cible: T([-18, -16.3]), texte: 'avant-bras à plat sur la glace' },
        ]; },
      },
      s2: {
        titre: 'Se hisser',
        dessin: z => { const c = cadre(z); return [glace(z, c, false), pose2(z, c)].join('\n'); },
        renvois: z => { const c = cadre(z), T = rep(c.xL, c.W, c.s).T; return [
          { n: 8, rond: T([78, 58]), cible: T([74, 9]), texte: 'battre des jambes jusqu’à l’horizontale' },
          { n: 9, rond: T([-92, -18]), cible: T(pic(rep(0, 0, 1), PIC2[0], [0.34, 0.94]).milieu), texte: 'pics plantés près du bord, pas à bout de bras' },
        ]; },
      },
      s3: {
        titre: 'Rouler, vu de dessus',
        dessin: z => dessus(z).svg,
        renvois: z => { const d = dessus(z); return [
          { n: 10, rond: d.T([-78, -54]), cible: d.T([-44, -30]), texte: 'rouler au lieu de se relever' },
          { n: 11, rond: [d.pas[3][0] + 2.5 * d.s, d.cy + 44 * d.s], cible: [d.pas[3][0] + 2.5 * d.s, d.pas[3][1] + 3.5 * d.s], texte: 'ses traces : la glace qui a porté' },
        ]; },
      },
    },
    danger: 'Le danger, c’est l’horloge : une minute pour reprendre son souffle, la tête hors de l’eau, puis une dizaine de minutes de mains utiles pour sortir.',
  };
};
