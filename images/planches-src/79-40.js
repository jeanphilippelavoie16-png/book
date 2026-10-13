// Planche 79-40 — Les racines enfouies en couches (chapitre 79, §5 étape 13, et § Enfouir, quand il
// n'y a ni sable ni sciure).
// Le chapitre ne donne aucune dimension de caisse, de trou ni d'épaisseur de couche : aucune cote.
// Ce qu'il dit, et rien d'autre : une couche de matériau, une couche de racines qui ne se touchent
// pas, du matériau par-dessus, et ainsi de suite, sans jamais remplir jusqu'au bord ; dans une caisse
// ou dans un trou creusé à même le plancher de terre ; le matériau humide et non mouillé, une poignée
// serrée garde sa forme sans qu'il en coule d'eau ; trop sec il boit la racine, détrempé il la pourrit.
module.exports = (h) => {
  const f = n => (+n).toFixed(1);
  const f2 = n => (+n).toFixed(2);
  const pl = (pts, ferme) => pts.map((p, i) => (i ? 'L' : 'M') + f(p[0]) + ',' + f(p[1])).join(' ') + (ferme ? ' Z' : '');
  const BL = h.a.blanc.split(' ')[0];
  const rempli = t => h.a[t].replace('fill="none"', BL);
  const alea = g => () => { g = (g * 16807) % 2147483647; return (g - 1) / 2147483646; };
  const dans = (x, y, P) => {
    let c = false;
    for (let i = 0, j = P.length - 1; i < P.length; j = i++) {
      const [xi, yi] = P[i], [xj, yj] = P[j];
      if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c;
    }
    return c;
  };
  // le sable : un grain par case, placé au hasard dans sa case, de grosseur variable.
  // Des points semés, pas une grille : rien à voir avec les hachures de la terre ni du bois.
  const grains = (P, pas, graine, r0 = 0.45, r1 = 0.55) => {
    const r = alea(graine), xs = P.map(p => p[0]), ys = P.map(p => p[1]);
    let d = '';
    for (let y = Math.min(...ys); y < Math.max(...ys); y += pas) for (let x = Math.min(...xs); x < Math.max(...xs); x += pas) {
      const px = x + r() * pas, py = y + r() * pas, rr = r0 + r() * r1;
      if (dans(px, py, P)) d += `M${f2(px - rr)},${f2(py)}a${f2(rr)},${f2(rr)} 0 1,0 ${f2(2 * rr)},0a${f2(rr)},${f2(rr)} 0 1,0 ${f2(-2 * rr)},0`;
    }
    return d ? h.path(d, h.a.plein) : '';
  };
  const traits = segs => h.path(segs.map(([a, b, c, d]) => `M${f(a)},${f(b)} L${f(c)},${f(d)}`).join(' '), h.a.fin);

  // ─── les racines ─────────────────────────────────────────────────────────────────────
  // carotte couchée : collet en (x, y), la pointe vers sens (+1 : droite, -1 : gauche) ;
  // L : longueur, e : demi-épaisseur au collet. Les fanes coupées laissent un moignon.
  const carotte = (x, y, L, e, sens) => {
    const P = (u, v) => [x + sens * u, y + v];
    const w = t => e * Math.pow(1 - t, 0.62);
    const haut = [], bas = [], cap = [];
    for (let i = 0; i <= 30; i++) { const t = i / 30 * 0.99; haut.push(P(t * L, -w(t))); bas.unshift(P(t * L, w(t))); }
    for (let k = 1; k < 12; k++) { const a = Math.PI / 2 + Math.PI * k / 12; cap.push(P(0.34 * e * Math.cos(a), -e * Math.sin(a))); }
    cap.reverse();
    const corps = [...haut, P(L, 0), ...bas, ...cap];
    const tiges = [-0.42, 0, 0.42].map((v, i) => {
      const lw = 0.13 * e, lg = (i === 1 ? 0.62 : 0.5) * e, pe = v * 0.5;
      return h.path(pl([P(-0.1 * e, v * e - lw), P(-0.1 * e - lg, v * e + pe * e - lw), P(-0.1 * e - lg, v * e + pe * e + lw), P(-0.1 * e, v * e + lw)], true), rempli('detail'));
    });
    const rides = [0.2, 0.34, 0.48, 0.62, 0.75].map((t, i) => {
      const cote = i % 2 ? 1 : -1, a = P(t * L, cote * w(t) * 0.98), b = P(t * L + 0.035 * L, cote * w(t) * 0.45);
      return [a[0], a[1], b[0], b[1]];
    });
    const poil = [P(L, 0), P(L * 1.06, 0.05 * e)];
    return [...tiges, h.path(pl(corps, true), rempli('arete')), traits(rides), h.path(pl(poil), h.a.fin)].join('\n');
  };
  // betterave debout : centre (cx, cy), rayon R ; le collet coupé en haut, la radicelle en bas
  const betterave = (cx, cy, R) => {
    const pt = deg => { const p = deg * Math.PI / 180, r = R * (1 + 0.1 * Math.cos(p)); return [cx + r * Math.sin(p), cy - r * Math.cos(p)]; };
    const arc = (a, b, n) => Array.from({ length: n + 1 }, (_, i) => pt(a + (b - a) * i / n));
    const queue = [[cx + 0.16 * R, cy + 1.08 * R], [cx + 0.1 * R, cy + 1.38 * R], [cx + 0.07 * R, cy + 1.74 * R],
      [cx + 0.01 * R, cy + 1.4 * R], [cx - 0.08 * R, cy + 1.1 * R]];
    const corps = [...arc(24, 160, 30), ...queue, ...arc(200, 336, 30)];
    const yH = cy - 1.03 * R;
    const tiges = [-0.22, 0, 0.22].map((u, i) => {
      const x = cx + u * R, pe = u * 0.35, lw = 0.075 * R, ht = (i === 1 ? 0.34 : 0.27) * R;
      return h.path(pl([[x - lw, yH + 2], [x - lw + pe * R * 0.4, yH - ht], [x + lw + pe * R * 0.4, yH - ht], [x + lw, yH + 2]], true), rempli('detail'));
    });
    const cernes = [[cx - 0.5 * R, cy + 0.42 * R, cx - 0.2 * R, cy + 0.5 * R], [cx + 0.25 * R, cy + 0.62 * R, cx + 0.45 * R, cy + 0.5 * R]];
    return [...tiges, h.path(pl(corps, true), rempli('arete')), traits(cernes)].join('\n');
  };

  // ─── la caisse : les mesures du dessin (en mm de principe, sans cote) ───────────────
  const LI = 380, HI = 430, EP = 20, VR = 378;        // intérieur, planche, dessus du sable
  const LC = 130, EC = 17.5, RB = 32.5;               // carotte, betterave
  const rangA = [[33, 1], [347, -1]];                 // [collet, sens] : pointes face à face
  const rangB = [[163, -1], [217, 1]];                // collets face à face : la couche d'au-dessus décale
  const betts = [70, 190, 310];
  const vA = 42.5, vBt = 137.5, vB = 217.5, vBt2 = 312.5;
  const larg = z => (z.l - 18 - 46) / (LI + 2 * EP);  // même calcul pour la coupe et le plan : vues alignées
  const x0 = 18;

  // ─── En coupe ────────────────────────────────────────────────────────────────────────
  const coupe = z => {
    const s = larg(z), yF = z.h - 8, yB = yF - EP * s;
    const X = u => x0 + (EP + u) * s, Y = v => yB - v * s;
    return { s, yF, yB, X, Y };
  };
  const surface = (X, Y, a, b, v, graine) => {
    const r = alea(graine), pts = [];
    for (let i = 0; i <= 24; i++) { const u = a + (b - a) * i / 24; pts.push([X(u), Y(v + 1.6 * Math.sin(u / 23) + (r() - 0.5) * 1.4)]); }
    return pts;
  };
  const empile = (X, Y, s, rA, rB, bs) => [
    ...rA.map(([u, sens]) => carotte(X(u), Y(vA), LC * s, EC * s, sens)),
    ...bs.map(u => betterave(X(u), Y(vBt), RB * s)),
    ...rB.map(([u, sens]) => carotte(X(u), Y(vB), LC * s, EC * s, sens)),
    ...bs.map(u => betterave(X(u + 8), Y(vBt2), RB * s)),
  ];
  const dessinCoupe = z => {
    const { s, yF, yB, X, Y } = coupe(z);
    const sup = surface(X, Y, 0, LI, VR, 11);
    const remplissage = [[X(0), Y(0)], ...sup, [X(LI), Y(0)]];
    const bois = h.a.hachure('bois', 'contour');
    const xg = x0, xd = X(LI + EP), yt = Y(HI);
    // le plan de coupe du plan : un trait fort de chaque côté, la flèche qui regarde en bas
    const marque = (xa, xb, xf) => [h.ligne(xa, Y(vB), xb, Y(vB), h.a.contour),
      h.path(`M${f(xf - 3.5)},${f(Y(vB) + 3)} L${f(xf + 3.5)},${f(Y(vB) + 3)} L${f(xf)},${f(Y(vB) + 11)} Z`, h.a.plein),
      h.ligne(xf, Y(vB), xf, Y(vB) + 4, h.a.arete)].join('\n');
    return [
      grains(remplissage, 3.1, 7),
      ...empile(X, Y, s, rangA, rangB, betts),
      h.path(pl(sup), h.a.detail),
      h.rect(xg, yt, EP * s, yB - yt, bois),
      h.rect(X(LI), yt, EP * s, yB - yt, bois),
      h.rect(xg, yB, xd - xg, yF - yB, bois),
      h.ligne(4, yF, z.l - 4, yF, h.a.arete),
      marque(xg - 16, xg - 3, xg - 11),
      marque(xd + 3, xd + 16, xd + 11),
    ].join('\n');
  };

  // ─── Vu de dessus, dans la couche de carottes du haut ────────────────────────────────
  const LP = 250;                                      // largeur intérieure de la caisse
  const plan = z => {
    const s = larg(z), y0 = 8;
    const X = u => x0 + (EP + u) * s, Yp = w => y0 + (EP + w) * s;
    return { s, y0, X, Yp };
  };
  const dessinPlan = z => {
    const { s, y0, X, Yp } = plan(z);
    const gap = (LP - 3 * 2 * EC) / 4, rangs = [0, 1, 2].map(i => gap + EC + i * (2 * EC + gap));
    const interieur = [[X(0), Yp(0)], [X(LI), Yp(0)], [X(LI), Yp(LP)], [X(0), Yp(LP)]];
    const xo = x0, yo = y0, xe = X(LI + EP), ye = Yp(LP + EP);
    const cadre = `M${f(xo)},${f(yo)} H${f(xe)} V${f(ye)} H${f(xo)} Z M${f(X(0))},${f(Yp(0))} V${f(Yp(LP))} H${f(X(LI))} V${f(Yp(0))} Z`;
    const disp = [rangA, rangB, [[40, 1], [340, -1]]];
    return [
      grains(interieur, 3.1, 23),
      ...rangs.flatMap((w, i) => disp[i].map(([u, sens]) => carotte(X(u), Yp(w), LC * s, EC * s, sens))),
      h.path(cadre, h.a.hachure('bois', 'contour') + ' fill-rule="evenodd"'),
    ].join('\n');
  };

  // ─── Sans caisse : un trou dans le plancher de terre ─────────────────────────────────
  const MT = 62;                                       // terre dessinée de chaque côté du trou
  const trou = z => {
    const s = Math.min((z.l - 12) / (LI + 2 * MT), (z.h - 34) / (HI + 50));
    const cx = z.l / 2, yS = 28, yFd = yS + HI * s;
    const X = u => cx + (u - LI / 2) * s, Y = v => yFd - v * s;
    return { s, cx, yS, yFd, X, Y };
  };
  const dessinTrou = z => {
    const { s, yS, yFd, X, Y } = trou(z);
    // la terre ne s'arrête pas : bords déchiquetés, quelques cailloux
    const r = alea(9), bordTerre = [];
    const xa = X(-MT), xb = X(LI + MT), yBas = yFd + 44 * s;
    for (let i = 0; i <= 8; i++) bordTerre.push([xb - (r() * 10) * s, yS + (yBas - yS) * i / 8]);
    for (let i = 1; i < 14; i++) bordTerre.push([xb - (xb - xa) * i / 14, yBas - r() * 14 * s]);
    for (let i = 8; i >= 0; i--) bordTerre.push([xa + (r() * 10) * s, yS + (yBas - yS) * i / 8]);
    const terre = [[xa, yS], [xb, yS], ...bordTerre];
    const bord = [[X(0), yS], [X(4), Y(330)], [X(-2), Y(210)], [X(3), Y(90)], [X(7), yFd], [X(130), yFd + 1.5 * s], [X(260), yFd - 1.5 * s],
      [X(LI - 6), yFd], [X(LI + 2), Y(110)], [X(LI - 3), Y(250)], [X(LI + 2), Y(350)], [X(LI), yS]];
    const sup = surface(X, Y, 4, LI - 2, VR, 5);
    const remplissage = [[X(7), yFd], [X(3), Y(90)], [X(-2), Y(210)], [X(2), Y(VR)], ...sup, [X(LI - 2), Y(VR)], [X(LI - 3), Y(250)], [X(LI + 2), Y(110)], [X(LI - 6), yFd]];
    // cailloux anguleux : six faces au hasard, pour que la terre se lise comme de la terre
    const caillou = (u, v, a, g) => { const q = alea(g), n = 6, t0 = q() * 6; return Array.from({ length: n }, (_, k) => { const t = t0 + k / n * 2 * Math.PI, rr = a * s * (0.65 + q() * 0.45); return [X(u) + rr * Math.cos(t), Y(v) + rr * 0.75 * Math.sin(t)]; }); };
    const cailloux = [[-36, 330, 13], [-22, 190, 10], [-42, 70, 12], [LI + 32, 360, 11], [LI + 40, 200, 13], [LI + 24, 40, 10], [80, -24, 12], [230, -30, 10], [330, -22, 11]]
      .map(([u, v, a], i) => h.path(pl(caillou(u, v, a, 90 + i), true), rempli('detail')));
    return [
      h.path(pl(terre, true), h.a.hachure('terre', 'aucun')),
      ...cailloux,
      h.path(pl(bord, true), h.a.blanc),
      grains(remplissage, 3.1, 31),
      ...empile(X, Y, s, rangA, rangB, betts),
      h.path(pl(sup), h.a.detail),
      h.path(pl(bord), h.a.contour),
      h.ligne(4, yS, X(0), yS, h.a.contour),
      h.ligne(X(LI), yS, z.l - 4, yS, h.a.contour),
    ].join('\n');
  };

  // ─── Le test de la poignée ───────────────────────────────────────────────────────────
  // Une même main ouverte à plat, vue de dessus, répétée trois fois ; la motte posée sur la paume.
  const E = 0.6;                                          // échelle des mains
  const mains = z => ({ x: z.l * 0.5 + 6, ys: [z.h * 0.17, z.h * 0.5, z.h * 0.83] });
  const motte = (cx, cy, rx, ry, graine) => {
    const r = alea(graine), P = [];
    for (let k = 0; k < 28; k++) { const a = k / 28 * 2 * Math.PI; const q = 1 + (r() - 0.5) * 0.1; P.push([cx + rx * q * Math.cos(a), cy + ry * q * Math.sin(a)]); }
    return P;
  };
  const goutte = (gx, gy, k) => `M${f(gx)},${f(gy - 5 * k)} C${f(gx + 1.2 * k)},${f(gy - 2 * k)} ${f(gx + 2.6 * k)},${f(gy)} ${f(gx + 2.6 * k)},${f(gy + 1.3 * k)} A${f(2.6 * k)},${f(2.6 * k)} 0 0 1 ${f(gx - 2.6 * k)},${f(gy + 1.3 * k)} C${f(gx - 2.6 * k)},${f(gy)} ${f(gx - 1.2 * k)},${f(gy - 2 * k)} ${f(gx)},${f(gy - 5 * k)} Z`;
  const centre = (x, y) => [x - 28 * E, y + 2 * E];      // le creux de la paume
  const dessinMains = z => {
    const { x, ys } = mains(z), out = [];
    // modèle s08-l5 (la main ouverte de s08, le poignet refermé) en miroir, couchée : la paume en
    // l'air vue de dessus, les doigts à droite, le pouce en haut, l'avant-bras qui part à gauche ;
    // le creux de la paume (68, 100) tombe au creux où se pose la motte
    const main = y => { const [cx, cy] = centre(x, y);
      return h.formes.modele('s08-l5', { x: cx, y: cy, ancre: [66, 100], miroir: true, angle: 60, echelle: 1.2 * E,
        bras: { a: [104, 186], a0: [92, 170], b: [166, 152.5], b0: [152, 139], bord: z } }); };
    const R = 24 * E;
    // 10. trop sec : la motte s'est fendue en morceaux, les grains coulent entre les doigts
    {
      const y = ys[0], [cx, cy] = centre(x, y);
      out.push(main(y));
      const morceaux = [[cx - R * 0.45, cy - R * 0.25, R * 0.55, 81], [cx + R * 0.35, cy - R * 0.35, R * 0.48, 82], [cx - R * 0.1, cy + R * 0.5, R * 0.5, 83]];
      morceaux.forEach(([mx, my, rr, g]) => { const M = motte(mx, my, rr, rr * 0.85, g); out.push(h.path(pl(M, true), rempli('arete')), grains(M, 2.2, g + 5)); });
      // des grains qui tombent dans les fentes entre les doigts et en bas de la main
      [[x + 32 * E, y - 19 * E], [x + 34 * E, y + 1 * E], [x + 30 * E, y + 19 * E]].forEach(([gx, gy], i) =>
        out.push(grains([[gx - 3, gy - 2.5], [gx + 9, gy - 2.5], [gx + 9, gy + 2.5], [gx - 3, gy + 2.5]], 2.2, 91 + i, 0.4, 0.4)));
      out.push(grains([[cx - R, y + 24 * E], [cx + R * 1.2, y + 24 * E], [cx + R * 1.2, y + 40 * E], [cx - R, y + 40 * E]], 2.8, 97, 0.4, 0.4));
    }
    // 11. juste : la motte entière garde l'empreinte des doigts
    {
      const y = ys[1], [cx, cy] = centre(x, y);
      out.push(main(y));
      const P = motte(cx, cy, R * 1.15, R * 0.9, 61);
      out.push(h.path(pl(P, true), rempli('arete')), grains(P, 2.3, 67));
      const emp = [-0.55, -0.18, 0.18, 0.55].map(v => [cx + R * 0.15, cy + v * R * 1.3, cx + R * 1.0, cy + v * R * 1.25]);
      out.push(h.path(emp.map(([a, b, c, d]) => `M${f(a)},${f(b)} Q${f((a + c) / 2)},${f(b + 2)} ${f(c)},${f(d)}`).join(' '), h.a.detail));
    }
    // 12. détrempé : la motte luit, l'eau fait une flaque sur la paume et goutte du bord
    {
      const y = ys[2], [cx, cy] = centre(x, y);
      out.push(main(y));
      const F = motte(cx + 2, cy + 3, R * 1.5, R * 1.1, 75);
      out.push(h.path(pl(F, true), h.a.blanc), h.path(pl(F, true), h.a.cache));
      const P = motte(cx, cy, R * 0.95, R * 0.75, 71);
      out.push(h.path(pl(P, true), rempli('arete')), grains(P, 2.6, 73));
      out.push(h.path(`M${f(cx - R * 0.5)},${f(cy - R * 0.35)} Q${f(cx - R * 0.1)},${f(cy - R * 0.6)} ${f(cx + R * 0.35)},${f(cy - R * 0.4)}`, 'fill="none" stroke="#FFFFFF" stroke-width="1.6" stroke-linecap="round"'));
      const yb = y + 34 * E;
      out.push(h.path([goutte(cx - 4, yb + 6, 1.1), goutte(cx + 4, yb + 16, 1.2), goutte(cx - 2, yb + 27, 1.3)].join(' '), rempli('detail')));
    }
    return out.join('\n');
  };

  return {
    ref: '79-40',
    titre: 'Les racines enfouies en couches',
    desc: 'Carottes et betteraves enfouies dans du sable humide, en couches, sans que les racines se touchent : dans une caisse en coupe et vue de dessus, dans un trou creusé au plancher de terre, et le test de la poignée serrée pour l’humidité du matériau.',
    format: 'pleine',
    disposition: [['coupe', 'trou'], ['plan', 'poignee']],
    largeurs: [[3, 2], [3, 2]],
    hauteurs: [1.2, 1],
    vues: {
      coupe: {
        titre: 'La caisse, en coupe',
        dessin: dessinCoupe,
        renvois: z => {
          const { X, Y } = coupe(z), xr = z.l - 11;
          return [
            { n: 1, rond: [xr, Y(HI - 14)], cible: [X(LI) - 1, Y(HI - 5)], texte: 'jamais remplie jusqu’au bord' },
            { n: 2, rond: [xr, Y(368)], cible: [X(LI - 16), Y(368)], texte: 'sable humide, sphaigne, bran non résineux' },
            { n: 3, rond: [xr, Y(318)], cible: [X(318 + 22), Y(vBt2)], texte: 'betteraves debout, espacées' },
            { n: 4, rond: [xr, Y(vB + 30)], cible: [X(LI - 60), Y(vB)], texte: 'carottes couchées, sans se toucher' },
            { n: 5, rond: [xr, Y(120)], cible: [X(LI + 10), Y(120)], texte: 'caisse de bois non traité' },
            { n: 6, rond: [xr, Y(10)], cible: [X(LI - 16), Y(12)], texte: 'au fond, du sable avant les racines' },
          ];
        },
      },
      trou: {
        titre: 'Sans caisse, dans le plancher',
        dessin: dessinTrou,
        renvois: z => {
          const { X, yS } = trou(z);
          return [
            { n: 7, rond: [12, 11], cible: [X(-30), yS + 30], texte: 'plancher de terre du caveau' },
            { n: 8, rond: [z.l - 12, 11], cible: [X(LI - 1), yS + 18], texte: 'trou creusé à même le plancher' },
          ];
        },
      },
      plan: {
        titre: 'Vu de dessus, dans une couche de carottes',
        dessin: dessinPlan,
        renvois: z => {
          const { X, Yp } = plan(z), gap = (LP - 6 * EC) / 4;
          return [
            { n: 9, rond: [z.l - 11, Yp(gap / 2 + 2 * EC + gap)], cible: [X(LI - 8), Yp(gap / 2 + 2 * EC + gap)], texte: 'du sable tout autour de chaque racine' },
          ];
        },
      },
      poignee: {
        titre: 'Une poignée serrée, puis ouverte',
        dessin: dessinMains,
        renvois: z => {
          const { x, ys } = mains(z), c = y => centre(x, y);
          return [
            { n: 10, rond: [12, ys[0] - 30], cible: [c(ys[0])[0] - 8, c(ys[0])[1] - 6], texte: 'trop sec : s’effrite, sèche la racine' },
            { n: 11, rond: [12, ys[1] - 30], cible: [c(ys[1])[0] - 6, c(ys[1])[1] - 4], texte: 'juste : garde sa forme, sans goutte' },
            { n: 12, rond: [12, ys[2] - 30], cible: [c(ys[2])[0] - 2, ys[2] + 34 * E + 16], texte: 'détrempé : l’eau coule, la racine pourrit' },
          ];
        },
      },
    },
  };
};
