// Planche 104-40 — Réparer : l'alêne losange dans l'axe de la couture, la pièce intérieure à
// coins ronds. Chapitre 104, §5-C étapes 10 à 13 (percer le cuir) et §5-D étape 18 (déchirure
// en L), §9 (l'alêne). Aucune cote : le chapitre ne donne ni l'espacement des trous (il se règle
// sur l'épaisseur du cuir) ni la taille de la pièce (« débordant largement »).
//
// Rangée 1 : le geste (la main tient l'alêne, la lame traverse les deux épaisseurs) et la même
// couture vue de dessus : points faits, deux fentes d'avance, la lame en coupe dans l'axe, la
// ligne tracée qui attend. Rangée 2 : trois vignettes cadrées pareil, lame dans l'axe contre les
// deux ratés. Rangée 3 : la pièce posée (vue de l'envers, donc la déchirure en miroir), la pièce
// cousue (vue de l'endroit), et le raté du coin carré.

module.exports = (h) => {
  const F = h.formes;
  const f1 = v => Math.round(v * 10) / 10;
  const P = pts => pts.map(([x, y]) => `${f1(x)} ${f1(y)}`).join(' L ');

  // Un fil de couture : une bande de la bibliothèque.
  const fils = (brins, trait = 'detail') => F.cordes(brins, { trait, jeu: 1.2 });

  // Une fente d'alêne : une lentille pleine, longue L, large w, orientée selon ang (degrés).
  const fente = (cx, cy, L, w, ang = 0) => {
    const a = ang * Math.PI / 180, c = Math.cos(a), s = Math.sin(a);
    const q = (u, v) => [cx + u * c - v * s, cy + u * s + v * c];
    const [p0, p1, p2, p3] = [q(-L / 2, 0), q(0, -w), q(L / 2, 0), q(0, w)];
    return h.path(`M ${f1(p0[0])} ${f1(p0[1])} Q ${f1(p1[0])} ${f1(p1[1])} ${f1(p2[0])} ${f1(p2[1])} Q ${f1(p3[0])} ${f1(p3[1])} ${f1(p0[0])} ${f1(p0[1])} Z`, h.a.plein);
  };

  // Bord rompu (la matière continue) : une ligne doucement ondulée de a à b.
  const rompu = (a, b, amp = 2.2, pas = 14) => {
    const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), n = Math.max(2, Math.round(L / pas));
    const nx = -dy / L, ny = dx / L, out = [];
    for (let i = 0; i <= n * 4; i++) {
      const t = i / (n * 4), o = Math.sin(t * n * Math.PI) * amp;
      out.push([a[0] + dx * t + nx * o, a[1] + dy * t + ny * o]);
    }
    return out;
  };
  const tissu = (x, y, l, ht) => {
    const c = [[x, y], [x + l, y], [x + l, y + ht], [x, y + ht]];
    const pts = [].concat(rompu(c[0], c[1]), rompu(c[1], c[2]).slice(1), rompu(c[2], c[3]).slice(1), rompu(c[3], c[0]).slice(1));
    return h.chemin(pts, h.a.detail, true);
  };

  // Rectangle à coins arrondis, en polyligne fermée (r = 0 : coins carrés).
  const rr = (x, y, l, ht, r, pas = 3) => {
    const out = [];
    const arc = (cx, cy, a0) => { for (let k = 0; k <= 8; k++) { const a = (a0 + k * 90 / 8) * Math.PI / 180; out.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); } };
    if (r > 0) {
      arc(x + l - r, y + r, -90); arc(x + l - r, y + ht - r, 0); arc(x + r, y + ht - r, 90); arc(x + r, y + r, 180);
    } else out.push([x + l, y], [x + l, y + ht], [x, y + ht], [x, y]);
    out.push(out[0]);
    return out;
  };

  // Point arrière vu de l'endroit : des points bout à bout le long d'un tracé (une ligne pleine).
  const pointArriere = (trace, lg = 6, jour = 1.6, ep = 2.4, ferme = false) => {
    const S = [0];
    for (let i = 1; i < trace.length; i++) S.push(S[i - 1] + Math.hypot(trace[i][0] - trace[i - 1][0], trace[i][1] - trace[i - 1][1]));
    const tot = S[S.length - 1];
    const at = s => {
      let i = 1; while (i < S.length - 1 && S[i] < s) i++;
      const t = (s - S[i - 1]) / ((S[i] - S[i - 1]) || 1);
      return [trace[i - 1][0] + (trace[i][0] - trace[i - 1][0]) * t, trace[i - 1][1] + (trace[i][1] - trace[i - 1][1]) * t];
    };
    const n = Math.max(1, Math.round(tot / (lg + jour)));
    const pas = tot / n, brins = [];
    for (let k = 0; k < n; k++) {
      const s0 = k * pas + jour / 2, s1 = s0 + pas - jour;
      brins.push({ pts: [at(s0), at((s0 + s1) / 2), at(s1)], ep, debut: 'coupe', fin: 'coupe' });
    }
    return fils(brins);
  };

  // La déchirure en L : deux lèvres effilochées autour du tracé, l'ouverture remplie de ce qui est
  // derrière (la pièce, en toile ; ou rien, en noir).
  const dechirure = (trace, g, fond) => {
    const S = [0];
    for (let i = 1; i < trace.length; i++) S.push(S[i - 1] + Math.hypot(trace[i][0] - trace[i - 1][0], trace[i][1] - trace[i - 1][1]));
    const tot = S[S.length - 1], n = Math.round(tot / 3);
    const cote = [[], []];
    for (let k = 0; k <= n; k++) {
      const s = tot * k / n;
      let i = 1; while (i < S.length - 1 && S[i] < s) i++;
      const t = (s - S[i - 1]) / ((S[i] - S[i - 1]) || 1);
      const a = trace[i - 1], b = trace[i];
      const L = Math.hypot(b[0] - a[0], b[1] - a[1]), nx = -(b[1] - a[1]) / L, ny = (b[0] - a[0]) / L;
      const x = a[0] + (b[0] - a[0]) * t, y = a[1] + (b[1] - a[1]) * t;
      const bout = Math.min(1, s / 9, (tot - s) / 9);
      [1, -1].forEach((sg, j) => {
        const o = g * bout * (0.75 + 0.45 * Math.abs(Math.sin(k * 2.3 + j * 1.7)));
        cote[j].push([x + nx * o * sg, y + ny * o * sg]);
      });
    }
    const poly = cote[0].concat(cote[1].slice().reverse());
    return [
      h.chemin(poly, fond, true),
      h.chemin(cote[0], h.a.arete), h.chemin(cote[1], h.a.arete),
    ].join('\n');
  };

  // ── Rangée 1, à gauche : la main tient l'alêne et perce les deux épaisseurs ─────────────
  // La main simple (mains/moteur.js) : le poing sur le manche vu côté paume, la main droite, l'avant-bras
  // qui part à gauche et sort de la vue ; le pouce en bas vers la lame, l'auriculaire en haut, le pommeau qui
  // dépasse du poing. La main garde sa taille (0,92 unité par mm, le poing de l'ancien calque) : c'est la
  // prise qui se ferme sur le manche.
  const poser = (o, axe, vers) => {          // l'angle qui met l'axe de la prise sur axe, l'avant-bras vers vers
    const base = Object.assign({}, o, { angle: 0, avantbras: { longueur: 100 } }); delete base.objet;
    const e0 = F.mainSimple(base); let best = null;
    for (const k of [0, 180]) {
      const a = axe - e0.prise.angle + k, m = F.mainSimple(Object.assign({}, base, { angle: a }));
      const d = [m.coude[0] - m.poignet[0], m.coude[1] - m.poignet[1]], v = [vers[0] - m.poignet[0], vers[1] - m.poignet[1]];
      const c = (d[0] * v[0] + d[1] * v[1]) / ((Math.hypot(d[0], d[1]) * Math.hypot(v[0], v[1])) || 1);
      if (!best || c > best.c) best = { a, c };
    }
    return best.a;
  };
  const tenir = z => {
    const eM = 0.92, D = 24;                         // la main (unités par mm) ; le manche de bois franc, ~26 mm
    const hx = z.l * 0.66, hy = z.h - 127;           // l'axe du manche au creux du poing
    const mT = hy - 50, mB = hy + 70;                // bouts du manche : le pommeau dépasse du poing en haut
    const manche = h.path(`M ${f1(hx - D / 2)} ${f1(mB)} L ${f1(hx - D / 2)} ${f1(mT + D / 2)} Q ${f1(hx - D / 2)} ${f1(mT)} ${f1(hx)} ${f1(mT)} Q ${f1(hx + D / 2)} ${f1(mT)} ${f1(hx + D / 2)} ${f1(mT + D / 2)} L ${f1(hx + D / 2)} ${f1(mB)} Z`, h.a.hachure('bois', 'contour'));
    const out = [];
    // la lame : face large (la largeur est dans l'axe de la couture), arête du losange au milieu
    const yL = mB + 30, ep = 6;                      // dessus du cuir, épaisseur d'une couche
    const w = 4, tip = yL + 2 * ep + 13;
    out.push(h.path(`M ${f1(hx - w)} ${f1(mB)} L ${f1(hx - w)} ${f1(tip - 12)} L ${f1(hx)} ${f1(tip)} L ${f1(hx + w)} ${f1(tip - 12)} L ${f1(hx + w)} ${f1(mB)} Z`, `fill="#FFFFFF" ${h.a.contour.replace('fill="none" ', '')}`));
    out.push(h.ligne(hx, (mB + tip) / 2, hx, tip - 1, h.a.detail));
    // les deux épaisseurs de cuir, vues par la tranche ; la lame passe dedans
    const x0 = 8, x1 = z.l - 8;
    [0, 1].forEach(k => {
      const y = yL + k * ep;
      out.push(h.rect(x0, y, x1 - x0, ep, h.a.blanc));
      out.push(h.ligne(x0, y, x1, y, h.a.arete), h.ligne(x0, y + ep, x1, y + ep, h.a.arete));
    });
    [x0, x1].forEach(x => out.push(h.chemin(rompu([x, yL - 3], [x, yL + 2 * ep + 3], 1.6, 6), h.a.detail)));
    // la ligature de babiche au bas du manche
    const lig = [];
    for (let k = 0; k < 4; k++) { const y = mB - 3 - k * 3.2; lig.push(h.path(`M ${f1(hx - D / 2)} ${f1(y + 1)} Q ${f1(hx)} ${f1(y - 1.6)} ${f1(hx + D / 2)} ${f1(y + 1)}`, h.a.detail)); }
    // le poing sur le manche : le manche entre par le haut du poing et ressort par le bas, derrière les doigts
    const BORD = { x0: 0, y0: 0, x1: z.l, y1: z.h }, vM = [-60, hy + 6];
    const oM = { x: hx, y: hy, pose: 'prise-manche', vue: 'paume', cote: 'droite', echelle: eM, diametre: D / eM, rotation: [-25, 0, 0] };   // penchée de 25° : les doigts à plat en travers du manche
    const aM = poser(oM, 90, vM);
    const M = F.mainSimple({ ...oM, angle: aM, objet: [manche, lig.join('\n')].join('\n'), avantbras: { vers: vM, bord: BORD, longueur: 'bord' } });
    out.push(M.svg);
    // la coupe de la lame : un losange, relié à la lame par le trait de coupe
    const yc = mB + 7, xq = hx - 30;
    out.push(h.ligne(hx - w - 2, yc, xq + 9, yc, h.a.cache));
    out.push(h.chemin([[xq - 8, yc], [xq, yc - 4], [xq + 8, yc], [xq, yc + 4]], h.a.hachure('metal', 'arete'), true));
    // le geste : on pousse droit dans le cuir, dans l'axe de l'alêne
    out.push(h.geste(`M ${f1(hx)} ${f1(mT - 40)} L ${f1(hx)} ${f1(mT - 6)}`));
    tenir.pts = { lame: [hx - w - 1, mB + 19] };
    return out.join('\n');
  };

  // ── Rangée 1, à droite : la même couture vue de dessus ──────────────────────────────────
  const dessus = z => {
    const out = [];
    const x0 = 10, x1 = z.l - 10, yT = 40, yE = z.h * 0.66, yB = z.h - 30;
    const yS = yE - 26, sp = 25, xa = 28;
    // pièce du dessous (sous le bord, en gris : elle est derrière) puis pièce du dessus
    const dessous = [].concat(rompu([x0, yE], [x0, yB], 1.6, 8), rompu([x0, yB], [x1, yB]).slice(1), rompu([x1, yB], [x1, yE], 1.6, 8).slice(1));
    out.push(h.chemin(dessous, h.a.loin, true));
    out.push(h.chemin(dessous, h.a.detail));
    out.push(h.chemin([].concat(rompu([x0, yE], [x0, yT], 1.6, 8), rompu([x0, yT], [x1, yT]).slice(1), rompu([x1, yT], [x1, yE], 1.6, 8).slice(1)), h.a.detail));
    out.push(h.ligne(x0, yE, x1, yE, h.a.contour));
    const X = i => xa + i * sp;
    const nFait = 7, nAvance = 2, iAlene = nFait + nAvance;
    // la ligne tracée à la pointe sèche, qui continue après la lame
    out.push(h.ligne(X(nFait - 1), yS, x1 - 2, yS, h.a.fin));
    // les fentes : faites (sous le fil) et d'avance (vides), toutes dans l'axe
    for (let i = 0; i < iAlene; i++) out.push(fente(X(i), yS, 15, 2.2));
    // les points faits (point sellier : un point d'un trou à l'autre, bien couché)
    const brins = [{ pts: [[x0 + 2, yS + 1.2], [X(0) - 1, yS - 0.4]], ep: 4.4, debut: 'fixe', fin: 'coupe' }];
    for (let i = 0; i < nFait - 1; i++) brins.push({ pts: [[X(i) + 1, yS + 2], [X(i) + sp / 2, yS + 0.3], [X(i + 1) - 1, yS - 2]], ep: 4.4, debut: 'coupe', fin: 'coupe' });
    // le fil de travail sort du dernier trou vers l'aiguille
    brins.push({ pts: [[X(nFait - 1) + 1, yS - 1], [X(nFait - 1) + 6, yS - 22], [X(nFait - 1) + 26, yT + 16]], ep: 4.4, debut: 'coupe', fin: 'fixe' });
    out.push(fils(brins));
    // la lame en coupe à la surface : un losange plus mince que large, couché dans la ligne
    const xl = X(iAlene);
    out.push(h.chemin([[xl - 8, yS], [xl, yS - 3.2], [xl + 8, yS], [xl, yS + 3.2]], h.a.hachure('metal', 'arete'), true));
    // le point à contrôler : le jeu entre deux fentes, qui ne se touchent jamais par leurs bords
    out.push(h.controle(X(nFait) + sp / 2, yS, 9));
    dessus.pts = { ligne: [X(iAlene + 2.5), yS], avance: X(nFait), avance2: X(nFait + 1), lame: [xl, yS], yS, sp, X, nFait };
    return out.join('\n');
  };

  // ── Rangée 2 : trois vignettes cadrées pareil ───────────────────────────────────────────
  const vignette = (type) => z => {
    const out = [], yS = z.h * 0.5, xA = z.l * 0.30, xB = z.l * 0.66, epF = 18;
    out.push(h.ligne(xB, yS, z.l - 8, yS, h.a.fin));
    [xA, xB].forEach(x => {
      if (type === 'axe') out.push(fente(x, yS, 60, 4.8));
      if (type === 'travers') out.push(fente(x, yS, 60, 11, 90));
      if (type === 'ronde') out.push(h.cercle(x, yS, 17, h.a.plein));
    });
    out.push(fils([
      { pts: [[8, yS + 2], [(8 + xA) / 2, yS + 0.8], [xA, yS - 1.6]], ep: epF, debut: 'fixe', fin: 'coupe' },
      { pts: [[xA, yS + 2], [(xA + xB) / 2, yS + 0.6], [xB, yS - 1.6]], ep: epF, debut: 'coupe', fin: 'coupe' },
    ], 'arete'));
    vignette.pts = vignette.pts || {};
    vignette.pts[type] = { xB, yS };
    return out.join('\n');
  };

  // ── Rangée 3 : la pièce ─────────────────────────────────────────────────────────────────
  // La déchirure en L vue de l'endroit ; vue de l'envers, tout est en miroir.
  const geoPiece = (z, miroir) => {
    const cx = z.l / 2, cy = z.h / 2 + 2, V = 74, H = 70, m = 26, r = 18;
    const tx = cx - H / 2 + 6, ty = cy - V / 2;
    const mx = x => (miroir ? z.l - x : x);
    const L = [[tx, ty], [tx, ty + V], [tx + H, ty + V]].map(([x, y]) => [mx(x), y]);
    const px = miroir ? z.l - (tx + H + m) : tx - m;
    return { L, piece: [px, ty - m, H + 2 * m, V + 2 * m], r, cx, cy };
  };
  const envers = z => {
    const g = geoPiece(z, true), [x, y, l, ht] = g.piece, out = [];
    out.push(tissu(8, 8, z.l - 16, z.h - 16));
    out.push(h.chemin(rr(x, y, l, ht, g.r), h.a.hachure('grillage', 'contour'), true));
    // la déchirure, cachée sous la pièce
    out.push(h.chemin(g.L, h.a.cache.replace('stroke-width="0.7"', 'stroke-width="1.4"')));
    envers.pts = { piece: [x + 12, y + ht - 14], coin: [x + 5, y + 5] };
    return out.join('\n');
  };
  const endroit = z => {
    const g = geoPiece(z, false), [x, y, l, ht] = g.piece, out = [];
    out.push(tissu(8, 8, z.l - 16, z.h - 16));
    // la pièce derrière : son bord caché ; le point arrière tout autour, juste en dedans
    out.push(h.chemin(rr(x, y, l, ht, g.r), h.a.cache, true));
    out.push(pointArriere(rr(x + 6, y + 6, l - 12, ht - 12, g.r - 6), 6, 1.6, 2.4));
    // la déchirure : bords laissés où ils sont, la pièce se voit dans l'ouverture
    out.push(dechirure(g.L, 5, h.a.hachure('grillage', 'aucun')));
    // la surpiqûre de la déchirure, une rangée de chaque côté
    const off = (d) => {
      const [[ax, ay], [bx, by], [cx2, cy2]] = g.L;
      return [[ax + d, ay + 4], [bx + d, by - d], [cx2 - 4, cy2 - d]];
    };
    out.push(pointArriere(off(7.5), 6, 1.6, 2.4));
    out.push(pointArriere([[g.L[0][0] - 7.5, g.L[0][1] + 4], [g.L[1][0] - 7.5, g.L[1][1] + 7.5], [g.L[2][0] - 4, g.L[2][1] + 7.5]], 6, 1.6, 2.4));
    endroit.pts = { tear: [g.L[0][0] - 5.5, g.L[0][1] + 24], bord: [x + 6, y + ht * 0.45], surp: [g.L[1][0] + 30, g.L[1][1] - 7.5] };
    return out.join('\n');
  };
  const coin = z => {
    const out = [];
    out.push(tissu(8, 8, z.l - 16, z.h - 16));
    const px = z.l * 0.56, py = z.h * 0.46;          // le coin carré de la pièce
    // la pièce part vers le bas et la gauche, hors du cadre
    out.push(h.chemin([[10, py], [px, py], [px, z.h - 10]], h.a.cache));
    out.push(pointArriere([[12, py + 6], [px - 6, py + 6], [px - 6, z.h - 12]], 6, 1.6, 2.4));
    // la déchirure repart de la pointe, dans le vêtement, là où rien ne la soutient
    const t = [[px - 6, py + 6], [px + 2, py - 4], [px + 10, py - 8], [px + 14, py - 18], [px + 22, py - 22], [px + 27, py - 33], [px + 35, py - 38], [px + 38, py - 50]];
    out.push(dechirure(t, 2.2, h.a.plein));
    // raté : le cercle rouge sur la pointe du coin, d'où la déchirure repart
    out.push(h.controle(px - 2, py + 2, 11));
    coin.pts = { dechir: [px + 22, py - 22] };
    return out.join('\n');
  };

  return {
    ref: '104-40',
    titre: 'Réparer : l’alêne dans l’axe, la pièce à coins ronds',
    desc: 'En haut, on pousse l’alêne par le manche à travers deux épaisseurs de cuir ; vue de dessus, la couture faite, deux fentes percées d’avance dans l’axe de la ligne, la lame en losange couchée dans la ligne, puis la ligne tracée qui attend. Au milieu, la fente dans l’axe se referme sous le fil ; en travers ou au poinçon rond, le trou reste ouvert. En bas, la déchirure en L : une pièce à coins arrondis posée à l’intérieur, cousue au point arrière tout autour, la déchirure surpiquée sans en rapprocher les bords ; à côté, le coin carré qui redéchire par la pointe.',
    format: 'pleine',
    disposition: [['tenir', 'dessus'], ['axe', 'travers', 'ronde'], ['envers', 'endroit', 'coin']],
    hauteurs: [2.05, 1.1, 1.8],
    largeurs: [[1, 1.7], [1, 1, 1], [1.2, 1.2, 1]],
    vues: {
      tenir: {
        titre: 'Percer',
        dessin: tenir,
        renvois: z => (tenir(z), [
          { n: 1, rond: [tenir.pts.lame[0] - 48, tenir.pts.lame[1] + 6], cible: tenir.pts.lame, texte: 'lame limée en losange' },
        ]),
      },
      dessus: {
        titre: 'Vu de dessus',
        dessin: dessus,
        renvois: z => {
          dessus(z); const p = dessus.pts;
          return [
            { n: 2, rond: [p.avance + p.sp / 2 - 6, z.h - 12], cible: [p.avance + p.sp / 2, p.yS + 1], texte: 'trous jamais bord à bord' },
            { n: 3, rond: [p.avance, 24], cible: [p.avance, p.yS - 2], texte: 'deux ou trois fentes d’avance' },
            { n: 4, rond: [p.lame[0] + 14, z.h - 12], cible: [p.lame[0] + 2, p.yS + 3], texte: 'la lame dans l’axe de la ligne' },
            { n: 5, rond: [z.l - 22, 24], cible: [p.ligne[0] + 12, p.yS - 1], texte: 'ligne tracée avant de percer' },
          ];
        },
      },
      axe: {
        titre: 'Lame dans l’axe',
        dessin: vignette('axe'),
        renvois: z => (vignette('axe')(z), [
          { n: 6, rond: [z.l - 14, 14], cible: [vignette.pts.axe.xB + 16, vignette.pts.axe.yS - 1], texte: 'la fente se referme sur le fil' },
        ]),
      },
      travers: { titre: 'Raté : lame en travers', dessin: vignette('travers') },
      ronde: {
        titre: 'Raté : alêne ronde',
        dessin: vignette('ronde'),
        renvois: z => (vignette('ronde')(z), [
          { n: 7, rond: [z.l - 14, 14], cible: [vignette.pts.ronde.xB + 10, vignette.pts.ronde.yS - 12], texte: 'le trou rond reste ouvert' },
        ]),
      },
      envers: {
        titre: 'La pièce posée, vue de l’envers',
        dessin: envers,
        renvois: z => (envers(z), [
          { n: 8, rond: [22, z.h - 20], cible: envers.pts.piece, texte: 'pièce en dedans, coins ronds' },
        ]),
      },
      endroit: {
        titre: 'Cousue, vue de l’endroit',
        dessin: endroit,
        renvois: z => (endroit(z), [
          { n: 9, rond: [22, 22], cible: endroit.pts.tear, texte: 'bords laissés où ils sont' },
          { n: 10, rond: [22, z.h - 20], cible: endroit.pts.bord, texte: 'point arrière tout autour' },
          { n: 11, rond: [z.l - 20, 22], cible: endroit.pts.surp, texte: 'puis la déchirure surpiquée' },
        ]),
      },
      coin: {
        titre: 'Raté : coin carré',
        dessin: coin,
        renvois: z => (coin(z), [
          { n: 12, rond: [z.l - 18, z.h - 20], cible: coin.pts.dechir, texte: 'redéchire par la pointe' },
        ]),
      },
    },
  };
};
