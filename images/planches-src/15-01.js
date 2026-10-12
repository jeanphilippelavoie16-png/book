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
  // ── les corps : le pictogramme de formes.js (règle 8), les mains de la bibliothèque ──
  const F = h.formes, RAD = Math.PI / 180;
  // un pic tenu en poignard : le manche dans le poing (passé à la main comme objet), le clou
  // qui sort sous le petit doigt et entre dans la glace
  const glaceHaut = -2;
  const picTenu = (R, f, ang, cote) => {
    const s = R.s, ax = [Math.sin(ang * RAD), -Math.cos(ang * RAD)];    // l'axe du manche, vers le haut
    const dn = [-ax[0], -ax[1]];
    const A = [f[0] + ax[0] * 7.5, f[1] + ax[1] * 7.5], Bm = [f[0] + dn[0] * 6, f[1] + dn[1] * 6];
    const t = (glaceHaut - Bm[1]) / dn[1];
    const G = [Bm[0] + dn[0] * t, glaceHaut], C = [G[0] + dn[0] * 7, G[1] + dn[1] * 7];
    const [Ap, Bp, Gp, Cp, Fp] = [R.T(A), R.T(Bm), R.T(G), R.T(C), R.T(f)];
    const manche = h.path(cap(Ap, Bp, 1.5 * s, 1.5 * s), AR);
    const clou = h.ligne(Bp[0], Bp[1], Gp[0], Gp[1], `stroke="${INK}" stroke-width="2" stroke-linecap="round" fill="none"`) + '\n' +
      h.ligne(Gp[0], Gp[1], Cp[0], Cp[1], h.a.cache);
    const prise = { pose: 'prise', vue: 'dos', x: Fp[0], y: Fp[1], diametre: 3 * s, angle: ang, objet: manche, cote };
    // le pictogramme tient le pic dans le bout de sa bande : le poignet à une main de longueur
    const poignet = R.T([f[0] + 16.6 * 0.9, f[1]]);
    return { prise, manche, clou, poignet, milieu: [(Bm[0] + G[0]) / 2, (Bm[1] + G[1]) / 2] };
  };
  // pose un pictogramme : on le dessine une fois pour lire l'épaule, puis on le décale
  const poser = (o, cible) => {
    const p0 = F.personnage(Object.assign({}, o, { x: 0, y: 0, prises: null }));
    const e = p0.epaules.proche;
    return { x: cible[0] - e[0], y: cible[1] - e[1] };
  };

  // ── pose 1 : dans l'eau, face au côté d'où l'on venait ──────────────────────
  // le corps droit dans l'eau, la poitrine au ras de la glace, les avant-bras à plat dessus
  const PIC1 = [[-47, -5], [-42, -5]];
  const pose1 = (z, c) => {
    const R = rep(c.xL, c.W, c.s), T = R.T, s = c.s;
    const pl = picTenu(R, PIC1[0], 0, 'gauche'), pp = picTenu(R, PIC1[1], 0, 'gauche');
    const base = { pose: 'debout', cote: 'gauche', echelle: s / 10, regard: -6 };
    const pos = poser(base, T([20, -18]));
    const corps = F.personnage(Object.assign({}, base, pos, { mains: { loin: pl.poignet, proche: pp.poignet } }));
    return { svg: [pl.manche, pp.manche, String(corps), pl.clou, pp.clou].join('\n'), corps };
  };

  // ── pose 2 : à l'horizontale, coudes sur la glace près du bord, on tire ─────
  // le corps couché à plat ventre, tourné à l'horizontale ; la poitrine sur les coudes, les
  // pics plantés à une longueur d'avant-bras devant eux, et non à bout de bras
  const PIC2 = [[-57, -5], [-52, -5]];
  const pose2 = (z, c) => {
    const R = rep(c.xL, c.W, c.s), T = R.T, s = c.s;
    const pl = picTenu(R, PIC2[0], 0, 'gauche'), pp = picTenu(R, PIC2[1], 0, 'gauche');
    const base = { pose: 'debout', cote: 'gauche', angle: -66, echelle: s / 10, regard: -30 };
    const pos = poser(base, T([6, -24]));
    const corps = F.personnage(Object.assign({}, base, pos, { mains: { loin: pl.poignet, proche: pp.poignet } }));
    const f = (a, b) => h.fleche(`M ${P(...T(a))} L ${P(...T(b))}`);
    return { svg: [pl.manche, pp.manche, String(corps), pl.clou, pp.clou,
      f([62, -46], [16, -46]),
      f([122, 84], [122, 66]), f([142, 66], [142, 84])].join('\n'), corps };
  };

  // ── le pictogramme vu de face ou de dessus ──────────────────────────────────
  // Mêmes mesures et même trait que personnage() de formes.js (adulte de 1750 mm), vu de face :
  // tête ronde sans visage, tronc en bloc arrondi, membres en bandes d'épaisseur égale.
  //   x, y : le milieu des hanches ; e : unités de vue par mm ; angle : rotation (degrés)
  //   bras : { g: [bras, avant-bras], d: […] } en degrés depuis la verticale, + vers l'extérieur
  const { capsule, ser, lisse } = F._interne;
  const faceP = o => {
    const e = o.e, th = (o.angle || 0) * RAD, co = Math.cos(th), si = Math.sin(th);
    const T = p => [o.x + (p[0] * co - p[1] * si) * e, o.y + (p[0] * si + p[1] * co) * e];
    const v = (a, sg) => [sg * Math.sin(a * RAD), Math.cos(a * RAD)];
    const add = (a, b) => [a[0] + b[0], a[1] + b[1]], mul = (a, k) => [a[0] * k, a[1] * k];
    const rB = 46, rJ = 61;
    const tronc = lisse([[-172, 40], [-178, -100], [-166, -250], [-186, -420], [-160, -500], [-70, -522], [70, -522], [160, -500], [186, -420], [166, -250], [178, -100], [172, 40], [90, 74], [-90, 74]], true);
    const Ct = [0, -522 - 26 - 122];
    const k = 0.5523, rT = 122, d = a => [Math.cos(a * RAD), Math.sin(a * RAD)];
    const rondC = [['M', add(Ct, mul(d(0), rT))], ...[0, 90, 180, 270].map(a => ['C', add(add(Ct, mul(d(a), rT)), mul(d(a + 90), k * rT)), add(add(Ct, mul(d(a + 90), rT)), mul(d(a), k * rT)), add(Ct, mul(d(a + 90), rT))]), ['Z']];
    const bras = sg => {
      const [a1, a2] = (o.bras || {})[sg < 0 ? 'g' : 'd'] || [6, 3];
      const S = [sg * 222, -452], E = add(S, mul(v(a1, sg), 300)), Fm = add(E, mul(v(a2, sg), 255 + 166));
      return { S, E, F: Fm, pieces: [capsule(S, E, rB), capsule(E, Fm, rB)] };
    };
    const jambe = sg => {
      const Hh = [sg * 88, 0], K = add(Hh, [sg * 6, 430]), A = add(K, [sg * 4, 420]), Pd = add(A, [sg * 4, 110]);
      return [capsule(K, A, rJ), capsule(Hh, K, rJ), capsule(A, Pd, rJ * 0.72)];
    };
    const bg = bras(-1), bd = bras(1);
    const ordre = [...(o.jambes === false ? [] : [...jambe(-1), ...jambe(1)]), tronc, rondC];
    const peint = liste => {
      const out = [];
      for (const c of liste) out.push(`<path d="${ser(c, T)}" ${h.a.contour}/>`);
      for (const c of liste) out.push(`<path d="${ser(c, T)}" fill="#FFFFFF" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/>`);
      return out.join('\n');
    };
    return {
      corps: peint(ordre), brasG: peint(bg.pieces), brasD: peint(bd.pieces), T,
      tete: T(Ct), epaules: { g: T(bg.S), d: T(bd.S) }, mains: { g: T(bg.F), d: T(bd.F) },
      aisselles: { g: T([-186, -400]), d: T([186, -400]) },
    };
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
    const pf = faceP({ x: T([0, 2])[0], y: T([0, 2])[1], e: s / 10, angle: 7, bras: { g: [10, 4], d: [10, 4] } });
    out.push(pf.corps, pf.brasG, pf.brasD);
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
    // le porteur, vu de face : le pictogramme coupé à la taille par le bas de la vue
    const e0 = 24 * q / 122, cxP = X(0), cyT = Y(46);
    const pf = faceP({ x: cxP, y: cyT + 670 * e0, e: e0, bras: { g: [7, 3], d: [7, 3] }, jambes: false });
    out.push(`<clipPath id="porteur-1501"><rect x="0" y="0" width="${z.l.toFixed(1)}" height="${(z.h).toFixed(1)}"/></clipPath>`);
    out.push(`<g clip-path="url(#porteur-1501)">`, pf.corps, pf.brasG);
    // la paire emboîtée, en bandoulière : le cordon court passe sur une épaule, par-dessus
    // la tête, et sous le bras opposé ; la paire est au milieu de la poitrine, un pic à
    // chaque bout du cordon, les deux faces à clou l'une contre l'autre, l'élastique au joint
    // le poids de la paire tire le devant de la boucle en V : elle pend au bas du V
    const S = pf.T([-96, -510]), A = pf.T([184, -380]);
    const M = pf.T([14, -292]), u = [0.99, -0.139], nn = [-u[1], u[0]];
    const at = (t, k = 0) => [M[0] + (u[0] * t + nn[0] * k) * q, M[1] + (u[1] * t + nn[1] * k) * q];
    const lp = 26, dp = 4.5;
    const P1 = at(-lp), P2 = at(lp);
    out.push(corde(`M ${P(...S)} L ${P(...P1)}`, 3.4), corde(`M ${P(...P2)} L ${P(...A)}`, 3.4));
    const bloc = (t0, t1, k) => poly([at(t0, -k), at(t1, -k), at(t1, k), at(t0, k)]);
    out.push(h.path(bloc(-lp, 0, dp), AR), h.path(bloc(0, lp, dp), AR));
    out.push(h.path(bloc(-2, 2, dp + 0.9), h.a.plein));
    out.push(pf.brasD, '</g>');
    const porte = { M, cordon: [(P2[0] + A[0]) / 2, (P2[1] + A[1]) / 2] };
    // un pic en grand
    const x0 = z.l * 0.5, x1 = z.l * 0.86, cy = z.h * 0.56, r = 20 * q;
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
    disposition: [['pics', 'prise'], ['s1', 's2'], ['s3']],
    largeurs: [[3, 1], [1, 1], [1]],
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
      prise: {
        titre: 'Tenu en poignard',
        dessin: z => {
          // la main droite vue du dos, l'avant-bras à plat vers la droite comme dans les coupes :
          // le manche serré dans le poing, le clou qui sort sous le petit doigt et entre dans la glace
          const e = Math.min(0.5, (z.h - 14) / 270), cx = z.l * 0.34, cy = 12 + 66 * e;
          const haut = cy - 64 * e, bas = cy + 46 * e, yG = bas + 34 * e;
          const manche = h.path(cap([cx, haut], [cx, bas], 13 * e, 13 * e), AR);
          const m = F.main({ pose: 'prise', vue: 'dos', cote: 'gauche', x: cx, y: cy, diametre: 26 * e, echelle: e, bras: 140, objet: manche });
          return [
            h.rect(0, yG, z.l, z.h - yG, h.a.blanc), h.ligne(0, yG, z.l, yG, h.a.contour),
            h.ligne(cx, bas + 13 * e, cx, yG, `stroke="${INK}" stroke-width="2.4" stroke-linecap="round" fill="none"`),
            h.ligne(cx, yG, cx, yG + 22 * e, h.a.cache),
            String(m),
          ].join('\n');
        },
      },
      s1: {
        titre: 'Se retourner',
        dessin: z => { const c = cadre(z); return [glace(z, c, true), pose1(z, c).svg,
          h.fleche(`M ${P(12, c.W - 14 * c.s)} L ${P(c.xL - 76 * c.s, c.W - 14 * c.s)}`, h.a.cache)].join('\n'); },
        renvois: z => { const c = cadre(z), T = rep(c.xL, c.W, c.s).T; return [
          { n: 6, rond: T([48, -34]), cible: T([24, -38]), texte: 'face au côté d’où l’on venait' },
          { n: 7, rond: T([-30, -36]), cible: T([-26, -7]), texte: 'avant-bras à plat sur la glace' },
        ]; },
      },
      s2: {
        titre: 'Se hisser',
        dessin: z => { const c = cadre(z); return [glace(z, c, false), pose2(z, c).svg].join('\n'); },
        renvois: z => { const c = cadre(z), T = rep(c.xL, c.W, c.s).T; return [
          { n: 8, rond: T([78, 58]), cible: T([74, 9]), texte: 'battre des jambes jusqu’à l’horizontale' },
          { n: 9, rond: T([-92, -18]), cible: T(picTenu(rep(0, 0, 1), PIC2[0], 0).milieu), texte: 'pics plantés près du bord, pas à bout de bras' },
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
