// Planche 70-13 — le générateur de fumée en labyrinthe (ch. 70, §9 « Le générateur de fumée sans
// feu »).
// Le chapitre ne donne aucune dimension (ni du plateau, ni de la bande, ni de la maille) : aucune
// cote. Ce qui se dessine : le plateau de tôle, la bande de grillage pliée en U sur sa longueur et
// montée en labyrinthe, le bran de scie tassé à ras dans les couloirs, l'allumage d'un seul bout, le
// front qui couve, la vitesse écrite au crayon gras sur le plateau, et le plateau posé au fond de la
// chambre, à l'écart des pièces.
// La charte : le fond du plateau vu de dessus reste blanc ; le bran de scie en points, la cendre en
// petits ronds ; en coupe, le grillage en trait fin perlé. Le rouge : le bran de scie à ras du grillage (ce qu'on vérifie en
// remplissant). La fumée et le sens du front restent en noir.
module.exports = (h) => {
  const A = h.a;
  const r1 = v => Math.round(v * 10) / 10;
  const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const P = pts => pts.map(p => `${r1(p[0])} ${r1(p[1])}`);
  const poly = pts => 'M' + P(pts).join(' L') + ' Z';
  const ligne = pts => 'M' + P(pts).join(' L');

  // ─── Le labyrinthe : la ligne médiane du couloir, des runs droits et des demi-tours ──────────
  // n runs horizontaux, espacés de p, de xa à xb ; demi-tours de rayon p/2 alternés à droite et à
  // gauche. Rend la suite de points de la médiane, et sa longueur cumulée.
  const mediane = (xa, xb, y0, p, n, pas = 2) => {
    const pts = [];
    const ajoute = q => pts.push(q);
    for (let i = 0; i < n; i++) {
      const y = y0 + i * p, versDroite = i % 2 === 0;
      const xs = i === 0 ? xa - p / 2 : (versDroite ? xa : xb);
      const xe = i === n - 1 ? (versDroite ? xb + p / 2 : xa - p / 2) : (versDroite ? xb : xa);
      const L = Math.abs(xe - xs), k = Math.max(2, Math.round(L / pas));
      for (let j = 0; j <= k; j++) ajoute([xs + (xe - xs) * j / k, y]);
      if (i < n - 1) {
        const cx = versDroite ? xb : xa, cy = y + p / 2, R = p / 2;
        for (let j = 1; j < 24; j++) {
          const t = Math.PI * j / 24;
          ajoute([cx + (versDroite ? 1 : -1) * R * Math.sin(t), cy - R * Math.cos(t)]);
        }
      }
    }
    const S = [0];
    for (let i = 1; i < pts.length; i++) S.push(S[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
    return { pts, S };
  };
  // la bande de demi-largeur w autour d'une portion de la médiane (de s0 à s1, en longueur)
  const bande = (m, w, s0, s1) => {
    const g = [], d = [];
    for (let i = 0; i < m.pts.length; i++) {
      if (m.S[i] < s0 - 0.01 || m.S[i] > s1 + 0.01) continue;
      const a = m.pts[Math.max(0, i - 1)], b = m.pts[Math.min(m.pts.length - 1, i + 1)];
      const tx = b[0] - a[0], ty = b[1] - a[1], L = Math.hypot(tx, ty) || 1;
      const nx = -ty / L, ny = tx / L, p = m.pts[i];
      g.push([p[0] + nx * w, p[1] + ny * w]); d.push([p[0] - nx * w, p[1] - ny * w]);
    }
    return { g, d, poly: poly([...g, ...d.reverse()]) };
  };
  const auPoint = (m, s) => {
    let i = 1;
    while (i < m.S.length - 1 && m.S[i] < s) i++;
    const t = (s - m.S[i - 1]) / ((m.S[i] - m.S[i - 1]) || 1), a = m.pts[i - 1], b = m.pts[i];
    return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  };

  // une volute de fumée qui monte, vue de dessus ou de côté
  const volute = (x, y, k = 1, sens = 1) => h.path(
    `M${r1(x)} ${r1(y)} C${r1(x + 6 * k * sens)} ${r1(y - 5 * k)} ${r1(x - 5 * k * sens)} ${r1(y - 10 * k)} ${r1(x + 1 * k * sens)} ${r1(y - 16 * k)}`
    + ` S${r1(x + 7 * k * sens)} ${r1(y - 24 * k)} ${r1(x + 2 * k * sens)} ${r1(y - 30 * k)}`, A.detail);

  // ─── Vue 1 : le plateau, vu de dessus ────────────────────────────────────────────────────────
  const G = z => {
    const S = Math.min(z.l - 66, z.h - 50);      // côté du plateau
    const x0 = 30, y0 = 10, bord = 7;
    const n = 4, w = 12, p = 30;                   // runs, demi-largeur du couloir, pas
    const mi = 9;                                  // marge intérieure
    const xa = x0 + bord + mi + p / 2 + w, xb = x0 + S - bord - mi - p / 2 - w;
    const ya = y0 + bord + mi + w;
    const yNote = ya + (n - 1) * p + w + 13;
    return { S, x0, y0, bord, n, w, p, xa, xb, ya, yNote };
  };
  const plan = z => {
    const g = G(z), out = [];
    const m = mediane(g.xa, g.xb, g.ya, g.p, g.n);
    const Ltot = m.S[m.S.length - 1], sF = Ltot * 0.3;    // le front a fait près du tiers du trajet
    // le plateau : le bord relevé, vu de dessus (deux carrés), le fond blanc
    out.push(h.rect(g.x0, g.y0, g.S, g.S, blanc(A.contour)));
    out.push(h.rect(g.x0 + g.bord, g.y0 + g.bord, g.S - 2 * g.bord, g.S - 2 * g.bord, A.detail));
    [[0, 0, 1, 1], [1, 0, -1, 1], [0, 1, 1, -1], [1, 1, -1, -1]].forEach(([a, b, sx, sy]) => {
      const X = g.x0 + a * g.S, Y = g.y0 + b * g.S;
      out.push(h.path(`M${r1(X)} ${r1(Y)} L${r1(X + sx * g.bord)} ${r1(Y + sy * g.bord)}`, A.fin));   // le pli du coin
    });
    // le couloir : le bran de scie (points) devant le front, la cendre derrière
    const brut = bande(m, g.w, sF, Ltot), cendre = bande(m, g.w, 0, sF);
    out.push(h.path(brut.poly, A.blanc), h.path(brut.poly, A.hachure('neige', 'aucun')));
    out.push(h.path(cendre.poly, A.blanc), h.path(cendre.poly, A.hachure('gravier', 'aucun')));
    // les deux parois de grillage, de bout en bout
    const tout = bande(m, g.w, 0, Ltot);
    out.push(h.path(ligne(tout.g), A.arete), h.path(ligne(tout.d.slice().reverse()), A.arete));
    // les bouts de la bande, refermés par le grillage replié
    const b0 = [tout.g[0], tout.d[tout.d.length - 1]], b1 = [tout.g[tout.g.length - 1], tout.d[0]];
    out.push(h.path(ligne(b0), A.arete), h.path(ligne(b1), A.arete));
    // le front qui couve : une ligne dentelée en travers du couloir, et la fumée qui en sort
    const f = bande(m, g.w, sF - 1.5, sF + 1.5);
    const fa = f.g[0], fb = f.d[f.d.length - 1];
    const dents = [];
    for (let i = 0; i <= 6; i++) {
      const t = i / 6;
      dents.push([fa[0] + (fb[0] - fa[0]) * t + (i % 2 ? 3 : -1), fa[1] + (fb[1] - fa[1]) * t]);
    }
    out.push(h.path(ligne(dents), A.arete));
    const pf = auPoint(m, sF);
    out.push(volute(pf[0] - 4, pf[1] - 2, 0.7, 1), volute(pf[0] + 5, pf[1] + 4, 0.6, -1));
    // le sens du front, le long du couloir
    const a1 = auPoint(m, sF + 18), a2 = auPoint(m, sF + 56);
    out.push(h.fleche(`M${r1(a1[0])} ${r1(a1[1])} L${r1(a2[0])} ${r1(a2[1])}`, A.arete));
    // la vitesse, écrite au crayon gras sur le fond du plateau : deux lignes d'écriture
    const ecriture = (x, y, L) => {
      const pts = [];
      for (let i = 0; i <= L; i += 2) pts.push([x + i, y + Math.sin(i * 0.9) * 2.2 - (i % 9 < 2 ? 2.5 : 0)]);
      return h.path(ligne(pts), A.detail);
    };
    const xn = g.x0 + g.bord + 14;
    out.push(ecriture(xn, g.yNote, 46), ecriture(xn + 52, g.yNote, 22), ecriture(xn, g.yNote + 9, 34));
    return {
      svg: out.join('\n'), g, m, sF, Ltot, tout,
    };
  };
  const planRenvois = z => {
    const r = plan(z), g = r.g;
    const xr = z.l - 11;
    const p0 = auPoint(r.m, 2), pRun = auPoint(r.m, r.Ltot * 0.42), pf = auPoint(r.m, r.sF);
    return [
      { n: 1, rond: [g.x0 + g.S * 0.5, g.y0 + g.S + 26], cible: [g.x0 + g.S * 0.5, g.y0 + g.S + 1], texte: 'plateau de tôle' },
      { n: 2, rond: [xr, pRun[1] - g.w - 4], cible: [g.xb + g.p / 2 + g.w + 1, pRun[1] - g.p / 2], texte: 'grillage plié en U, monté en labyrinthe' },
      { n: 4, rond: [12, p0[1] + 30], cible: [p0[0] - 6, p0[1] + 4], texte: 'allumer à un seul bout' },
      { n: 5, rond: [xr, g.y0 + 16], cible: [pf[0] + 6, pf[1] - g.w + 4], texte: 'le front couve d’un bout à l’autre' },
      { n: 6, rond: [xr, g.yNote - 14], cible: [g.x0 + g.bord + 14 + 76, g.yNote + 1], texte: 'noter la vitesse au crayon gras' },
    ];
  };

  // ─── Vue 2 : la bande pliée en U, puis en coupe dans le plateau ──────────────────────────────
  const coupe = z => {
    const out = [];
    const cx = z.l / 2;
    // en haut : un bout de bande pliée en U, en perspective cavalière
    const u = 26, hu = 26, dx = 56, dy = -30;         // demi-largeur, hauteur, fuite
    const y0 = 96;                                     // le bas du U, devant
    const xL = cx - u - dx / 2 + 6, xR = xL + 2 * u;
    const Uf = [[xL, y0 - hu], [xL, y0], [xR, y0], [xR, y0 - hu]];
    const Ub = Uf.map(([x, y]) => [x + dx, y + dy]);
    // la paroi du fond (gauche, vue de l'intérieur), le fond, la paroi de droite vue de dehors
    out.push(h.path(poly([Uf[0], Ub[0], Ub[1], Uf[1]]), A.hachure('grillage', 'detail')));
    out.push(h.path(poly([Uf[1], Ub[1], Ub[2], Uf[2]]), A.hachure('grillage', 'detail')));
    out.push(h.path(poly([Uf[2], Ub[2], Ub[3], Uf[3]]), A.blanc), h.path(poly([Uf[2], Ub[2], Ub[3], Uf[3]]), A.hachure('grillage', 'detail')));
    out.push(h.path(ligne(Uf), A.arete), h.path(ligne(Ub), A.detail));
    out.push(h.path(ligne([Uf[0], Ub[0]]), A.arete), h.path(ligne([Uf[3], Ub[3]]), A.arete), h.path(ligne([Uf[2], Ub[2]]), A.arete));
    // la bande à plat, avant le pli, et le pli : deux flèches qui relèvent les bords
    const yP = y0 + 30;
    // (rien d'autre : le U se lit par sa section)

    // en bas : la coupe en travers de trois couloirs, dans le plateau
    const yb = z.h - 12, wC = 38, hC = 34, e = 2;         // largeur et hauteur d'un U
    const n = 3, gap = 2, Lt = n * wC + (n - 1) * gap;
    const xa = cx - Lt / 2;
    const yTop = yb - e - hC;
    // le plateau : fond et bords relevés, tôle mince
    const xt0 = xa - 6, xt1 = xa + Lt + 6, yt = yTop - 8;
    out.push(h.path(poly([[xt0, yt], [xt0, yb], [xt1, yb], [xt1, yt], [xt1 - e, yt], [xt1 - e, yb - e], [xt0 + e, yb - e], [xt0 + e, yt]]), A.plein));
    for (let i = 0; i < n; i++) {
      const x = xa + i * (wC + gap);
      const dU = `M${r1(x)} ${r1(yTop)} L${r1(x)} ${r1(yb - e - 3)} Q${r1(x)} ${r1(yb - e)} ${r1(x + 3)} ${r1(yb - e)} L${r1(x + wC - 3)} ${r1(yb - e)} Q${r1(x + wC)} ${r1(yb - e)} ${r1(x + wC)} ${r1(yb - e - 3)} L${r1(x + wC)} ${r1(yTop)} Z`;
      out.push(h.path(dU, A.blanc), h.path(dU, A.hachure('neige', 'aucun')));
      // le grillage coupé : la paroi en trait fin, les fils en travers en points
      out.push(h.path(`M${r1(x)} ${r1(yTop)} L${r1(x)} ${r1(yb - e - 3)} Q${r1(x)} ${r1(yb - e)} ${r1(x + 3)} ${r1(yb - e)} L${r1(x + wC - 3)} ${r1(yb - e)} Q${r1(x + wC)} ${r1(yb - e)} ${r1(x + wC)} ${r1(yb - e - 3)} L${r1(x + wC)} ${r1(yTop)}`, A.arete));
      for (let t = 0; t <= 4; t++) {
        out.push(h.cercle(x, yTop + 2 + t * (hC - 6) / 4, 0.9, A.plein), h.cercle(x + wC, yTop + 2 + t * (hC - 6) / 4, 0.9, A.plein));
      }
      for (let t = 1; t < 4; t++) out.push(h.cercle(x + t * wC / 4, yb - e, 0.9, A.plein));
      // le dessus du bran de scie, à ras
      out.push(h.ligne(x, yTop, x + wC, yTop, A.detail));
    }
    out.push(h.controle(xa + wC + gap / 2, yTop, 9));
    return { svg: out.join('\n'), xL, xR, y0, hu, Uf, Ub, xa, yTop, wC, yb };
  };
  const coupeRenvois = z => {
    const c = coupe(z);
    return [
      { n: 3, rond: [c.xa + c.wC + 1 + 30, c.yTop - 44], cible: [c.xa + c.wC + 1 + 7, c.yTop - 6], texte: 'bran de scie de feuillu, tassé à ras du grillage' },
    ];
  };

  // ─── Vue 3 : au fond de la chambre ───────────────────────────────────────────────────────────
  const chambre = z => {
    const out = [];
    const e = 8, x0 = 14, x1 = z.l - 14, yS = z.h - 8, yT = 26;   // murs, sol, plafond
    // le sol
    out.push(h.rect(4, yS, z.l - 8, 6, A.hachure('terre', 'aucun')), h.ligne(4, yS, z.l - 4, yS, A.arete));
    // la paroi d'en face, en gris loin
    out.push(h.rect(x0 + e, yT + e, x1 - x0 - 2 * e, yS - yT - e, A.loin));
    // murs et toit en coupe, planches
    out.push(h.rect(x0, yT, e, yS - yT, A.hachure('bois', 'arete')));
    out.push(h.rect(x1 - e, yT, e, yS - yT, A.hachure('bois', 'arete')));
    const xo = (x0 + x1) / 2 + 10, wo = 22;                      // la sortie du haut
    out.push(h.rect(x0, yT, xo - wo / 2 - x0, e, A.hachure('bois', 'arete')));
    out.push(h.rect(xo + wo / 2, yT, x1 - xo - wo / 2, e, A.hachure('bois', 'arete')));
    // le registre : une tôle glissée en partie sur la sortie
    out.push(h.rect(xo - wo / 2 - 14, yT - 4, wo + 8, 3.5, A.plein));
    // un bâton en travers de la chambre, d'un mur à l'autre, et trois poissons pendus par la queue,
    // la ficelle nouée au pédoncule
    const yB = yT + 26;
    out.push(h.path(`M${r1(x0 + e)} ${r1(yB - 2.5)} L${r1(x1 - e)} ${r1(yB - 2.5)} L${r1(x1 - e)} ${r1(yB + 2.5)} L${r1(x0 + e)} ${r1(yB + 2.5)} Z`, blanc(A.arete)));
    const poisson = (cx, t, L, W) => {
      const P2 = (fx, fy) => `${r1(cx + fx * W)} ${r1(t + fy * L)}`;
      const d = `M${P2(-0.5, 0)} L${P2(0, 0.09)} L${P2(0.5, 0)} L${P2(0.12, 0.17)}`
        + ` C${P2(0.42, 0.32)} ${P2(0.52, 0.55)} ${P2(0.46, 0.74)}`
        + ` C${P2(0.4, 0.92)} ${P2(0.18, 1)} ${P2(0, 1)}`
        + ` C${P2(-0.18, 1)} ${P2(-0.4, 0.92)} ${P2(-0.46, 0.74)}`
        + ` C${P2(-0.52, 0.55)} ${P2(-0.42, 0.32)} ${P2(-0.12, 0.17)} Z`;
      return [
        h.path(d, blanc(A.arete)),
        h.path(`M${P2(-0.4, 0.8)} Q${P2(0, 0.74)} ${P2(0.4, 0.8)}`, A.detail),     // l'ouïe
        h.cercle(cx + 0.16 * W, t + 0.89 * L, 1.1, A.plein),                       // l'œil
        h.path(`M${P2(-0.06, 0.24)} L${P2(-0.05, 0.7)}`, A.fin),                   // la ligne du flanc
      ].join('\n');
    };
    [[x0 + e + 30, 52], [x0 + e + 62, 60], [x1 - e - 28, 56]].forEach(([x, L], i) => {
      const t = yB + 14;
      // la ficelle : par-dessus le bâton, nouée au pédoncule
      out.push(h.path(`M${r1(x - 2)} ${r1(t + 0.15 * L)} L${r1(x - 2)} ${r1(yB - 3)} Q${r1(x)} ${r1(yB - 6)} ${r1(x + 2)} ${r1(yB - 3)} L${r1(x + 2)} ${r1(t + 0.15 * L)}`, A.detail));
      out.push(poisson(x, t, L, 16));
      out.push(h.ligne(x - 3, t + 0.15 * L, x + 3, t + 0.15 * L, A.arete));   // le nœud
    });
    // le plateau posé au sol, dans le coin, loin sous les pièces : vu de côté, le bord relevé
    const tx0 = x0 + e + 6, tx1 = tx0 + 58, ty = yS - 7;
    out.push(h.path(`M${r1(tx0)} ${r1(ty)} L${r1(tx0)} ${r1(yS)} L${r1(tx1)} ${r1(yS)} L${r1(tx1)} ${r1(ty)}`, A.contour));
    out.push(h.rect(tx0 + 1.2, ty + 0.5, tx1 - tx0 - 2.4, yS - ty - 1.2, A.hachure('neige', 'aucun')));
    // la fumée qui monte du plateau vers les pièces et la sortie
    out.push(volute(tx0 + 16, ty - 4, 1, 1), volute(tx0 + 34, ty - 6, 1.1, -1));
    out.push(h.fleche(`M${r1(xo + 6)} ${r1(yT + 21)} L${r1(xo + 6)} ${r1(yT - 14)}`, A.detail));
    return { svg: out.join('\n'), tx0, tx1, ty, yS, x0, e, xo, yT };
  };
  const chambreRenvois = z => {
    const c = chambre(z);
    return [
      { n: 7, rond: [c.tx1 + 26, c.ty - 34], cible: [c.tx1 - 6, c.ty + 1], texte: 'poser le plateau au fond, loin des pièces' },
    ];
  };

  return {
    ref: '70-13',
    titre: 'Le générateur de fumée en labyrinthe',
    desc: 'Vu de dessus, un plateau de tôle carré. Une bande de grillage à mailles fines, pliée en U sur sa longueur, y fait un labyrinthe : '
      + 'quatre couloirs parallèles reliés par des demi-tours. Les couloirs sont remplis de bran de scie. On l’a allumé à un seul bout ; '
      + 'derrière le front qui couve, il ne reste que de la cendre, et la fumée monte du front. La vitesse est écrite au crayon gras sur le fond du plateau. '
      + 'À côté, un bout de bande pliée en U, puis la coupe de trois couloirs dans le plateau : le bran de scie tassé à ras du grillage. '
      + 'Enfin, la chambre en coupe : le plateau posé au sol dans un coin, les pièces pendues haut, à des bâtons, la sortie du haut et son registre.',
    format: 'demi',
    disposition: [['plan', 'coupe', 'chambre']],
    largeurs: [[1.45, 0.95, 1]],
    vues: {
      plan: { titre: 'Le plateau, vu de dessus', dessin: z => plan(z).svg, renvois: planRenvois },
      coupe: { titre: 'La bande en U, en coupe', dessin: z => coupe(z).svg, renvois: coupeRenvois },
      chambre: { titre: 'Dans la chambre', dessin: z => chambre(z).svg, renvois: chambreRenvois },
    },
  };
};
