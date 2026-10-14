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

  // ── les corps simples (13 oct.) : de profil, tournés vers la gauche (côté d'où l'on venait) ──
  // Un pic tenu en poignard dans le poing f (unités de vue) : le manche vertical passe dans le poing
  // (peint derrière le bras proche : le poing le couvre), le clou sort sous le petit doigt et entre
  // dans la glace (en tireté dans la glace). Le pic loin est derrière le proche : on n'en voit qu'un.
  const picDans = (f, s, yGlace) => {
    const haut = f[1] - 7.5 * s, bas = f[1] + 5 * s;
    const manche = h.path(cap([f[0], haut], [f[0], bas], 1.5 * s, 1.5 * s), AR);
    const yb = Math.max(bas, yGlace);
    const clou = (yGlace > bas ? h.ligne(f[0], bas, f[0], yGlace, `stroke="${INK}" stroke-width="2" stroke-linecap="round" fill="none"`) + '\n' : '')
      + h.ligne(f[0], yb, f[0], yb + 7 * s, h.a.cache);
    return { manche, clou };
  };

  // ── pose 1 : dans l'eau jusqu'aux aisselles, face au côté d'où l'on venait, les avant-bras à
  // plat sur la glace, les pics dans les poings ; (x, y) du corps : sous les avant-bras, entre les
  // coudes, posés sur la glace à 5 cm du bord
  const pose1 = (z, c) => {
    const R = rep(c.xL, c.W, c.s), T = R.T, s = c.s, yG = T([0, -2])[1];
    let pic = null;
    const corps = F.corps({ pose: 'eau-avantbras', cote: 'gauche', echelle: s / 10, x: T([-5, 0])[0], y: yG,
      objetP: g => { pic = picDans([g.mainP.x, g.mainP.y], s, yG); return pic.manche; } });
    return { svg: [String(corps), pic.clou].join('\n'), corps };
  };

  // ── pose 2 : sur les coudes, les hanches au bord, les jambes à l'horizontale juste sous la
  // surface ; les pics plantés au bout des avant-bras, près du bord, et non à bout de bras ;
  // (x, y) du corps : le bassin, au bord du trou, à fleur d'eau
  const ANG2 = { tronc: 42, cou: 24, tete: 8, brasP: 6, avantbrasP: 92, mainP: 90, brasL: 2, avantbrasL: 88, mainL: 90,
    cuisseP: -80, jambeP: -86, cuisseL: -84, jambeL: -92 };
  const pose2 = (z, c) => {
    const R = rep(c.xL, c.W, c.s), T = R.T, s = c.s, yG = T([0, -2])[1];
    let pic = null;
    const corps = F.corps({ pose: 'ventre-hisse', cote: 'gauche', appui: 'aucun', echelle: s / 10, x: T([6, 2])[0], y: T([6, 2])[1],
      angles: ANG2, objetP: g => { pic = picDans([g.mainP.x, g.mainP.y], s, yG); return pic.manche; } });
    const f = (a, b, at) => h.fleche(`M ${P(...T(a))} L ${P(...T(b))}`, at);
    const m = [corps.mainP.x, corps.mainP.y];
    return { svg: [String(corps), pic.clou,
      // le geste : on tire, en glissant vers l'avant
      h.geste(`M ${P(...T([40, -60]))} L ${P(...T([-6, -60]))}`),
      // les jambes battent (mouvement secondaire, en noir)
      f([121, 26], [121, 10]), f([133, 10], [133, 26]),
      // à contrôler : le pic planté près du bord, pas à bout de bras
      h.controle(m[0], yG, 8)].join('\n'), corps, pic: [m[0], yG] };
  };

  // ── vue de dessus : le trou, les traces, la roulade ─────────────────────────
  // 13 oct. : plus de corps vu de dessus. La roulade se dit par la flèche du geste, en boucles, qui
  // part du bord du trou et longe les traces : la glace qui a porté à l'aller.
  const dessus = z => {
    const s = (z.h - 12) / 190;
    const cy = z.h * 0.5;
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
    const pas = [];
    for (let x = 16, i = 0; x < hx - 76 * s; x += 26 * s, i++) {
      const y = cy + 18 * s + (i % 2 ? 7 : -7) * s;
      pas.push([x, y]);
      out.push(h.ellipse(x + 2.5 * s, y, 6 * s, 3.2 * s, h.a.arete), h.ellipse(x - 9 * s, y, 2.4 * s, 2.6 * s, h.a.arete));
    }
    // le geste : rouler, du bord du trou vers les traces (une cycloïde allongée : chaque boucle, un tour)
    const x0 = hx - 72 * s, yR = cy - 22 * s, Rr = 7 * s, Dd = 11 * s, tours = 5, pts = [];
    for (let t = 0; t <= tours * 2 * Math.PI + 0.01; t += 0.12) pts.push([x0 - (Rr * t - Dd * Math.sin(t)), yR - Dd * Math.cos(t) + Dd]);
    const fin = pts[pts.length - 1];
    pts.push([fin[0] - 10 * s, fin[1]]);
    out.push(h.geste('M ' + pts.map(p => P(p[0], p[1])).join(' L ')));
    return { svg: out.join('\n'), cy, s, hx, pas, boucle: pts[Math.round(pts.length * 0.42)] };
  };

  // ── les pics faits maison ───────────────────────────────────────────────────
  const corde = (d, w = 4.2) =>
    `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>\n` +
    `<path d="${d}" fill="none" stroke="#FFFFFF" stroke-width="${(w - 2.4).toFixed(1)}" stroke-linecap="round" stroke-linejoin="round"/>`;
  const pics = z => {
    const q = z.h / 173, bx = 120 * q + 10;
    const Y = y => y * q, X = x => bx + x * q;
    const out = [];
    // le porteur, de profil (13 oct. : plus de corps de face) : le corps simple debout, coupé à la
    // taille par le bas de la vue, tourné vers le pic. La paire emboîtée pend au milieu de la poitrine
    // (vue de biais, raccourcie) ; le cordon court passe sur l'épaule d'en face et sous le bras proche :
    // il descend du cou à la paire, puis repart vers l'aisselle, derrière le bras proche.
    const e0 = 24 * q / 122, cxP = X(-14), cyT = Y(46);
    const bord = (svg, y, max) => {           // le bord avant (max) ou arrière du corps à la hauteur y
      let r = max ? -Infinity : Infinity;
      for (const m of String(svg).matchAll(/<path d="([^"]+)" fill="#FFFFFF"/g)) for (const sub of m[1].split('Z')) {
        const n = (sub.match(/-?[\d.]+/g) || []).map(Number), pts = [];
        for (let i = 0; i + 1 < n.length; i += 2) pts.push([n[i], n[i + 1]]);
        for (let i = 0; i < pts.length; i++) { const [x1, y1] = pts[i], [x2, y2] = pts[(i + 1) % pts.length];
          if ((y1 - y) * (y2 - y) <= 0 && y1 !== y2) { const x = x1 + (x2 - x1) * (y - y1) / (y2 - y1); r = max ? Math.max(r, x) : Math.min(r, x); } }
      }
      return r;
    };
    const o0 = { pose: 'debout', echelle: e0, x: cxP, y: cyT + 1665 * e0 };
    const g0 = F.corps(o0), A0 = g0.articulations;
    const yS = A0.epauleP[1] + 150 * e0, xS = bord(g0, yS, true);              // le sternum
    const yC = A0.cou[1] + 10 * e0, xC = bord(g0, yC, true);                   // le bas du cou, devant
    const ais = [A0.epauleP[0] - 40 * e0, A0.epauleP[1] + 150 * e0];          // l'aisselle, derrière le bras
    const lp = 120 * e0, ep = 15 * e0, inc = 14 * Math.PI / 180;               // la paire : 2 × 120 mm, Ø 30
    const M = [xS + ep + 1, yS + 20 * e0], ua = [Math.sin(inc), Math.cos(inc)], na = [ua[1], -ua[0]];
    const at = (t, k = 0) => [M[0] + ua[0] * t + na[0] * k, M[1] + ua[1] * t + na[1] * k];
    const bloc = (t0, t1, k) => poly([at(t0, -k), at(t1, -k), at(t1, k), at(t0, k)]);
    const P1 = at(-lp * 0.5), P2 = at(lp * 0.5);
    const porteurC = F.corps(Object.assign({}, o0, { objetP: () => [
      corde(`M ${P(xC - 4 * e0, yC - 6 * e0)} Q ${P(xC + 10 * e0, yC + 40 * e0)} ${P(...P1)}`, 3.4),
      corde(`M ${P(...P2)} Q ${P(P2[0] - 30 * e0, P2[1] + 60 * e0)} ${P(...ais)}`, 3.4),
      h.path(bloc(-lp * 0.5, 0, ep), AR), h.path(bloc(0, lp * 0.5, ep), AR), h.path(bloc(-1.6, 1.6, ep + 0.9), h.a.plein),
    ].join('\n') }));
    out.push(`<clipPath id="porteur-1501"><rect x="0" y="0" width="${z.l.toFixed(1)}" height="${(z.h).toFixed(1)}"/></clipPath>`);
    out.push(`<g clip-path="url(#porteur-1501)">`, String(porteurC), '</g>');
    const porte = { M, cordon: [xC + 2 * e0, yC + 30 * e0] };
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
    desc: 'En tête, les pics faits d’un gros clou étêté entré dans un bout de manche à balai, emboîtés l’un dans l’autre et portés en bandoulière au milieu de la poitrine (le porteur de profil). En coupe : dans l’eau, face au côté d’où l’on venait, avant-bras à plat sur la glace ; puis le corps ramené à l’horizontale en battant des jambes, coudes sur la glace et pics plantés près du bord, on tire à plat ventre. Vu de dessus : sorti, on roule sur la glace vers ses traces au lieu de se relever (la flèche en boucles, sans corps).',
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
            { n: 4, rond: [p.X(80), p.Y(52)], cible: p.porte.cordon },
            { n: 5, rond: [p.X(96), p.Y(140)], cible: [p.porte.M[0] + 3, p.porte.M[1] + 6] },
          ].map((o, i) => ({ ...o, texte: ['bout de manche à balai', 'clou étêté, côté coupé au fond du trou', 'second trou : loge la pointe de l’autre pic', 'cordon court, par-dessus la tête, sous un bras', 'la paire emboîtée au milieu de la poitrine'][i] }));
        },
      },
      prise: {
        titre: 'Tenu en poignard',
        dessin: z => {
          // la main droite en poing sur le manche (mains simples, prise-manche, vue de la paume), l'avant-bras à
          // plat vers la droite comme dans les coupes, le pouce en haut ; le manche traverse le poing, le clou sort
          // sous le petit doigt et entre dans la glace
          const e = Math.min(0.5, (z.h - 14) / 270), cx = z.l * 0.34, cy = 12 + 66 * e;
          const haut = cy - 66 * e, bas = cy + 62 * e, yG = bas + 34 * e, RM = 12 * e;
          const manche = h.path(cap([cx, haut], [cx, bas], RM, RM), AR);
          const m = F.mainSimple({ pose: 'prise-manche', vue: 'paume', cote: 'droite', diametre: 24, echelle: e, angle: 200, x: cx, y: cy,
            objet: manche, avantbras: { vers: [z.l + 300, cy - 20], bord: { x0: 0, y0: 0, x1: z.l, y1: z.h }, longueur: 'bord' } }).svg;
          return [
            h.rect(0, yG, z.l, z.h - yG, h.a.blanc), h.ligne(0, yG, z.l, yG, h.a.contour),
            h.ligne(cx, bas + RM, cx, yG, `stroke="${INK}" stroke-width="2.4" stroke-linecap="round" fill="none"`),
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
          { n: 6, rond: [pose1(z, c).corps.tete.x + 44, pose1(z, c).corps.tete.y + 4], cible: [pose1(z, c).corps.tete.x + 10, pose1(z, c).corps.tete.y], texte: 'face au côté d’où l’on venait' },
          { n: 7, rond: T([-50, -26]), cible: T([-26, -4.6]), texte: 'avant-bras à plat sur la glace' },
        ]; },
      },
      s2: {
        titre: 'Se hisser',
        dessin: z => { const c = cadre(z); return [glace(z, c, false), pose2(z, c).svg].join('\n'); },
        renvois: z => { const c = cadre(z), T = rep(c.xL, c.W, c.s).T; return [
          { n: 8, rond: T([78, 58]), cible: T([74, 9]), texte: 'battre des jambes jusqu’à l’horizontale' },
          { n: 9, rond: T([-96, -26]), cible: [pose2(z, c).pic[0] - 9, pose2(z, c).pic[1] - 3], texte: 'pics plantés près du bord, pas à bout de bras' },
        ]; },
      },
      s3: {
        titre: 'Rouler vers ses traces, vu de dessus',
        dessin: z => dessus(z).svg,
        renvois: z => { const d = dessus(z); return [
          { n: 10, rond: [d.boucle[0] - 4, 14], cible: [d.boucle[0], d.boucle[1] - 2], texte: 'rouler au lieu de se relever' },
          { n: 11, rond: [d.pas[3][0] + 2.5 * d.s, d.cy + 58 * d.s], cible: [d.pas[3][0] + 2.5 * d.s, d.pas[3][1] + 3.5 * d.s], texte: 'ses traces : la glace qui a porté' },
        ]; },
      },
    },
    danger: 'Le danger, c’est l’horloge : une minute pour reprendre son souffle, la tête hors de l’eau, puis une dizaine de minutes de mains utiles pour sortir.',
  };
};
