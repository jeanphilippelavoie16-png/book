// Planche 100-40 — les graines : fermenter la tomate, le test de germination au coton roulé,
// le pot de garde en coupe. Chapitre 100 : §5-F (étapes 23 à 27), §5-I et J (37 à 43), §5-K
// (44 à 46), variante d'urgence « Contenir, et refaire le joint ».
// Le chapitre ne donne aucune dimension du pot, du tamis, du cadre, de la guenille ni de la
// caisse : aucune cote. Les seuls nombres sont dans la légende (20 graines, ou 100 ; × 5).
module.exports = (h) => {
  const A = h.a, F = h.formes;
  const r1 = v => Math.round(v * 10) / 10;
  const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const bA = blanc(A.arete), bD = blanc(A.detail), bC = blanc(A.contour), bF = blanc(A.fin);
  const sans = nom => A.hachure(nom, 'aucun');
  const RAD = Math.PI / 180;
  const alea = g => { let s = g; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; };
  const pt = p => `${r1(p[0])} ${r1(p[1])}`;
  // repère : rotation (degrés, sens horaire à l'écran) autour de l'origine locale, puis translation
  const rep = (x, y, ang = 0) => {
    const c = Math.cos(ang * RAD), s = Math.sin(ang * RAD);
    return ([u, v]) => [x + u * c - v * s, y + u * s + v * c];
  };
  const ser = (cmds, T) => cmds.map(c => c[0] + c.slice(1).map(p => pt(T(p))).join(' ')).join(' ');
  let nClip = 0;
  const decoupe = (d, contenu) => {
    const id = `k10040-${++nClip}`;
    return `<clipPath id="${id}"><path d="${d}" fill="none"/></clipPath>\n<g clip-path="url(#${id})">\n${contenu.join('\n')}\n</g>`;
  };

  // Une graine de tomate : un ovale plat, tourné.
  const graine = (x, y, ang, rx = 2.4, ry = 1.6, at = bD) => {
    const c = Math.cos(ang * RAD), s = Math.sin(ang * RAD);
    const p1 = [x + rx * c, y + rx * s], p2 = [x - rx * c, y - rx * s];
    return h.path(`M${pt(p1)} A${rx} ${ry} ${r1(ang)} 1 0 ${pt(p2)} A${rx} ${ry} ${r1(ang)} 1 0 ${pt(p1)} Z`, at);
  };
  // Une graine germée : la racine sort par le bout pointu, fine et courbe.
  const germee = (x, y, ang, lg, sens, rx = 3.2, ry = 2.2) => {
    const c = Math.cos(ang * RAD), s = Math.sin(ang * RAD);
    const b = [x + rx * 0.8 * c, y + rx * 0.8 * s];
    const u = [c, s], n = [-s * sens, c * sens];
    const P = (t, d, w) => [b[0] + u[0] * lg * t + n[0] * lg * d + n[1] * w, b[1] + u[1] * lg * t + n[1] * lg * d - n[0] * w];
    // deux bords qui se rejoignent à la pointe : large de 2,4 au collet, nulle au bout
    const g1 = [P(0, 0, 1.7), P(0.55, 0.05, 1.3), P(1, 0.4, 0)], g2 = [P(1, 0.4, 0), P(0.55, 0.05, -1.3), P(0, 0, -1.7)];
    const d = `M${pt(g1[0])} Q${pt(g1[1])} ${pt(g1[2])} Q${pt(g2[1])} ${pt(g2[2])} Z`;
    return [h.path(d, bD), graine(x, y, ang, rx, ry)].join('\n');
  };

  // ─── Le pot Mason, profil de verre ─────────────────────────────────────────────────────
  // Repère local : fond au centre (0, 0), le haut vers -y. W largeur, H hauteur jusqu'au buvant.
  const profil = (W, H, dy = 0) => {
    const rb = W * 0.14, ys = -H * 0.72, yc = -H * 0.84, yn = -H * 0.87, Wn = W * 0.8;
    return [['M', [-Wn / 2, -H + dy]], ['L', [-Wn / 2, yn + dy]], ['Q', [-W / 2, yc + dy], [-W / 2, ys + dy]],
      ['L', [-W / 2, -rb + dy]], ['Q', [-W / 2, dy], [-W / 2 + rb, dy]], ['L', [W / 2 - rb, dy]],
      ['Q', [W / 2, dy], [W / 2, -rb + dy]], ['L', [W / 2, ys + dy]], ['Q', [W / 2, yc + dy], [Wn / 2, yn + dy]],
      ['L', [Wn / 2, -H + dy]]];
  };
  const G_VERRE = 2.4;
  // Pot vu de face à travers le verre : rend le contour, la découpe intérieure et les repères.
  const pot = (T, W, H, { ferme = false } = {}) => {
    const Wn = W * 0.8, yn = -H * 0.87;
    const inter = ser(profil(W - 2 * G_VERRE, H - G_VERRE, -G_VERRE), T) + ' Z';
    const trait = [];
    trait.push(h.path(ser(profil(W, H), T), A.arete));
    // filets du goulot
    for (const k of [0.35, 0.7]) {
      const yy = -H + (H + yn) * k;
      trait.push(h.path(ser([['M', [-Wn / 2, yy + 1.6]], ['L', [Wn / 2, yy - 1.6]]], T), A.detail));
    }
    // reflet
    trait.push(h.path(ser([['M', [-W / 2 + 6, -H * 0.7]], ['L', [-W / 2 + 6, -H * 0.54]]], T), A.fin));
    if (ferme) {
      // la bague vissée et le disque, vus de face
      const bague = [['M', [-Wn / 2 - 2, -H - 3]], ['L', [Wn / 2 + 2, -H - 3]], ['L', [Wn / 2 + 2, yn + 1]], ['L', [-Wn / 2 - 2, yn + 1]], ['Z']];
      trait.push(h.path(ser(bague, T), bA));
      for (let i = 1; i < 8; i++) {
        const x = -Wn / 2 - 2 + (Wn + 4) * i / 8;
        trait.push(h.path(ser([['M', [x, -H - 1]], ['L', [x, yn - 1]]], T), A.fin));
      }
    } else {
      // le buvant ouvert
      const c = T([0, -H]), c2 = T([10, -H]);
      const a = Math.atan2(c2[1] - c[1], c2[0] - c[0]) / RAD;
      trait.push(h.ellipse(c[0], c[1], Wn / 2, 2.6, A.detail).replace('/>', ` transform="rotate(${r1(a)} ${r1(c[0])} ${r1(c[1])})"/>`));
    }
    return { inter, trait, Wn, yn };
  };

  // La pulpe : des lambeaux et des graines, dans une bande.
  const pulpe = (x0, x1, y0, y1, n, g, { graines = true, pleines = false } = {}) => {
    const r = alea(g), o = [];
    for (let i = 0; i < n; i++) {
      const x = x0 + r() * (x1 - x0), y = y0 + r() * (y1 - y0);
      const k = 2.5 + r() * 3.5, a = r() * 6.28;
      const q = [0, 1, 2, 3].map(j => { const t = a + j * 1.57, kk = k * (0.6 + r() * 0.6); return [x + Math.cos(t) * kk, y + Math.sin(t) * kk * 0.7]; });
      o.push(h.path(`M${pt(q[0])} Q${pt([x + (q[0][0] - x) * 1.6, y + (q[1][1] - y) * 1.4])} ${pt(q[1])} Q${pt(q[2])} ${pt(q[3])} Z`, bF));
    }
    if (graines) {
      for (let i = 0; i < n * 1.4; i++) {
        const x = x0 + r() * (x1 - x0), y = y0 + r() * (y1 - y0);
        o.push(graine(x, y, r() * 180, 2.3, 1.5, pleines ? A.plein : bD));
      }
    }
    return o;
  };

  // ─── Vue 1 : racler la tomate dans le pot, un peu d'eau ────────────────────────────────
  const racler = z => {
    const o = [];
    // la tomate coupée en long, vue sur la tranche : le pédoncule et les sépales en haut, la
    // colonne de chair au milieu, deux loges pleines de gel et de graines de part et d'autre
    const R = Math.min(28, z.l * 0.19), cx = R + 8, cy = R + 20;
    o.push(h.ellipse(cx, cy, R, R * 0.92, bC));
    for (const sx of [-1, 1]) {
      const X = u => cx + sx * u * R, Y = v => cy + v * R;
      const d = `M${r1(X(0.17))} ${r1(Y(-0.6))} C${r1(X(0.92))} ${r1(Y(-0.78))} ${r1(X(0.96))} ${r1(Y(0.72))} ${r1(X(0.17))} ${r1(Y(0.62))} Q${r1(X(0.3))} ${r1(Y(0))} ${r1(X(0.17))} ${r1(Y(-0.6))} Z`;
      o.push(h.path(d, bD));
      [[0.33, -0.36], [0.35, -0.1], [0.34, 0.16], [0.31, 0.4], [0.55, -0.44], [0.6, -0.16], [0.6, 0.12], [0.55, 0.4], [0.75, -0.2], [0.76, 0.12]].forEach(([u, v], j) => {
        if (sx === 1 && u > 0.5 && v > -0.25 && v < 0.2) return;           // sous la cuillère
        o.push(graine(X(u), Y(v), sx * (70 - 40 * v) + (j % 3) * 12, 2.5, 1.6));
      });
    }
    o.push(h.path(`M${r1(cx)} ${r1(cy - R * 0.7)} L${r1(cx)} ${r1(cy + R * 0.66)}`, A.fin));
    // le pédoncule et les sépales
    const yt = cy - R * 0.92;
    [-165, -128, -52, -15].forEach(a => {
      const c = Math.cos(a * RAD), sn = Math.sin(a * RAD), L = R * 0.46, n = [-sn, c];
      const b1 = [cx + n[0] * 2.2, yt + 1 + n[1] * 2.2], b2 = [cx - n[0] * 2.2, yt + 1 - n[1] * 2.2];
      const m1 = [cx + c * L * 0.5 + n[0] * 3, yt + 1 + sn * L * 0.5 + n[1] * 3], m2 = [cx + c * L * 0.5 - n[0] * 3, yt + 1 + sn * L * 0.5 - n[1] * 3];
      const tip = [cx + c * L, yt + 1 + sn * L];
      o.push(h.path(`M${pt(b1)} Q${pt(m1)} ${pt(tip)} Q${pt(m2)} ${pt(b2)} Z`, bD));
    });
    o.push(h.path(`M${r1(cx - 2)} ${r1(yt + 1)} L${r1(cx - 1.5)} ${r1(yt - R * 0.34)} L${r1(cx + 1.8)} ${r1(yt - R * 0.36)} L${r1(cx + 2)} ${r1(yt + 1)} Z`, bA));
    // la cuillère qui racle la loge de droite
    const bc = [cx + R * 0.6, cy - R * 0.02];
    const T = rep(bc[0], bc[1], -52);
    o.push(h.path(ser([['M', [6, -1.2]], ['L', [R * 1.3, -2.2]], ['Q', [R * 1.3 + 4, 0], [R * 1.3, 2.2]], ['L', [6, 1.2]], ['Z']], T), bA));
    o.push(h.path(ser([['M', [8, 0]], ['Q', [8, -6], [0, -6]], ['Q', [-9, -6], [-9, 0]], ['Q', [-9, 6], [0, 6]], ['Q', [8, 6], [8, 0]], ['Z']], T), bA));
    o.push(graine(bc[0] - 1.5, bc[1] + 1, 20, 2.3, 1.5));
    o.push(graine(bc[0] + 2.5, bc[1] - 1.5, 70, 2.3, 1.5));

    // le pot
    const W = Math.min(62, z.l * 0.4), H = Math.min(112, z.h - 40);
    const px = z.l - W / 2 - 6, py = z.h - 4;
    const Tp = rep(px, py, 0);
    const P = pot(Tp, W, H);
    const yPulpe = py - H * 0.27, yEau = py - H * 0.40;
    o.push(decoupe(P.inter, [
      h.rect(px - W, yEau, 2 * W, py - yEau + 2, sans('eau')),
      h.rect(px - W, yPulpe, 2 * W, py - yPulpe + 2, A.blanc),
      ...pulpe(px - W / 2, px + W / 2, yPulpe + 3, py - 4, 14, 7),
      h.path(`M${px - W} ${r1(yPulpe)} Q${r1(px - W / 4)} ${r1(yPulpe - 3)} ${r1(px)} ${r1(yPulpe + 1)} T${r1(px + W)} ${r1(yPulpe)}`, A.detail),
      h.ligne(px - W, yEau, px + W, yEau, A.arete),
    ]));
    o.push(...P.trait);
    // le geste : de la tomate au pot
    o.push(h.fleche(`M${r1(cx + R * 0.72)} ${r1(cy + R * 0.8)} Q${r1(px - W * 0.3)} ${r1(cy + R * 0.95)} ${r1(px - 2)} ${r1(py - H - 8)}`, A.arete));
    return {
      svg: o.join('\n'),
      renvois: [
        { n: 1, rond: [px - W / 2 - 16, yPulpe + 16], cible: [px - W / 4, yPulpe + 12], texte: 'pulpe et graines raclées' },
        { n: 2, rond: [px - W / 2 - 16, yEau - 8], cible: [px - W / 4, yEau + 5], texte: 'un peu d’eau' },
      ],
    };
  };

  // ─── Vue 2 : le voile blanc ────────────────────────────────────────────────────────────
  const voile = z => {
    const o = [];
    const W = Math.min(64, z.l * 0.42), H = Math.min(112, z.h - 28);
    const px = z.l * 0.46, py = z.h - 4;
    const P = pot(rep(px, py, 0), W, H);
    const yPulpe = py - H * 0.22, yEau = py - H * 0.46;
    // le voile : une peau mate, bosselée, pleine de petites colonies rondes
    const r = alea(31), bosses = [];
    const x0 = px - W / 2, x1 = px + W / 2;
    for (let x = x0; x <= x1 + 0.1; x += W / 14) bosses.push([x, yEau - 7 - r() * 3]);
    const dVoile = `M${pt([x0, yEau + 2])} L${bosses.map(pt).join(' L')} L${pt([x1, yEau + 2])} Z`;
    const colonies = [];
    for (let i = 0; i < 34; i++) colonies.push(h.cercle(x0 + 2 + r() * (W - 4), yEau - 5.5 + r() * 6, 0.9 + r() * 1.3, A.fin));
    o.push(decoupe(P.inter, [
      h.rect(px - W, yEau, 2 * W, py - yEau + 2, sans('eau')),
      h.rect(px - W, yPulpe, 2 * W, py - yPulpe + 2, A.blanc),
      ...pulpe(x0, x1, yPulpe + 3, py - 4, 10, 11),
      ...pulpe(x0, x1, yEau + 4, yEau + 12, 4, 5, { graines: false }),
      h.path(`M${px - W} ${r1(yPulpe)} Q${r1(px - W / 4)} ${r1(yPulpe - 3)} ${r1(px)} ${r1(yPulpe + 1)} T${r1(px + W)} ${r1(yPulpe)}`, A.detail),
      h.path(dVoile, bD),
      ...colonies,
    ]));
    o.push(...P.trait);
    return {
      svg: o.join('\n'),
      renvois: [
        { n: 3, rond: [px + W / 2 + 18, yEau - 30], cible: [px + W / 4, yEau - 3], texte: 'voile blanc : c’est prêt' },
      ],
    };
  };

  // ─── Vue 3 : remplir, brasser, vider le dessus ─────────────────────────────────────────
  const vider = z => {
    const o = [];
    const W = Math.min(64, z.l * 0.36), H = Math.min(112, z.h * 0.66);
    const ang = 66;
    const px = z.l * 0.22, py = z.h * 0.52;
    const T = rep(px, py, ang);
    const P = pot(T, W, H);
    const lip = T([P.Wn / 2, -H]);
    const yS = lip[1] - 0.8;                   // la surface, à ras du buvant bas
    // les flottantes : pulpe et graines vides, à la surface
    const r = alea(57), flott = [];
    for (let i = 0; i < 9; i++) {
      const x = lip[0] - 8 - r() * 60, y = yS + 1.5 + r() * 2.5;
      flott.push(...pulpe(x - 3, x + 3, y - 1, y + 1, 1, 90 + i, { graines: false }));
    }
    for (let i = 0; i < 7; i++) flott.push(graine(lip[0] - 6 - r() * 58, yS + 2.2, r() * 30 - 15, 2.4, 0.9, bF));
    // les pleines, couchées dans le coin bas
    const pleines = [];
    const rs = alea(77);
    for (let i = 0; i < 16; i++) {
      const q = T([W / 2 - G_VERRE - 3 - rs() * 11, -G_VERRE - 2 - rs() * (i < 10 ? 10 : 22)]);
      pleines.push(graine(q[0], q[1], ang + rs() * 60 - 30, 2.3, 1.5));
    }
    o.push(decoupe(P.inter, [
      h.rect(0, yS, z.l, z.h, sans('eau')),
      h.ligne(0, yS, z.l, yS, A.arete),
      ...flott,
      ...pleines,
    ]));
    o.push(...P.trait);
    // le filet d'eau qui passe par-dessus le buvant, avec la pulpe, puis tombe en gouttes
    const x0 = lip[0], y0 = lip[1], yF = Math.min(z.h - 30, y0 + 58);
    const bande = `M${pt([x0 - 1, y0 - 0.5])} Q${pt([x0 + 6, y0 + 2])} ${pt([x0 + 7.5, y0 + 18])} L${pt([x0 + 8.4, yF])} Q${pt([x0 + 9.8, yF + 5])} ${pt([x0 + 11.2, yF])} L${pt([x0 + 12, y0 + 18])} Q${pt([x0 + 11, y0 - 1])} ${pt([x0 + 3, y0 - 3])} Z`;
    o.push(h.path(bande, A.blanc), h.path(bande, sans('eau')), h.path(bande, A.detail));
    o.push(...pulpe(x0 + 8.5, x0 + 11, y0 + 14, yF - 10, 2, 44, { graines: false }));
    o.push(graine(x0 + 9.8, y0 + 30, 80, 2.4, 0.9, bF));
    for (const [dx, dy] of [[0, 12], [2, 22], [-1.5, 30]]) {
      const x = x0 + 9.8 + dx, y = yF + dy;
      o.push(h.path(`M${r1(x)} ${r1(y - 3)} Q${r1(x + 1.6)} ${r1(y)} ${r1(x)} ${r1(y + 1.2)} Q${r1(x - 1.6)} ${r1(y)} ${r1(x)} ${r1(y - 3)} Z`, A.plein));
    }
    o.push(h.fleche(`M${r1(x0 + 22)} ${r1(y0 + 12)} L${r1(x0 + 22)} ${r1(yF + 20)}`, A.arete));
    const cP = T([W / 2 - 9, -10]);
    return {
      svg: o.join('\n'),
      renvois: [
        { n: 4, rond: [lip[0] - 30, yS - 30], cible: [lip[0] - 26, yS + 2], texte: 'flottantes : on les vide' },
        { n: 5, rond: [cP[0] - 6, z.h - 12], cible: [cP[0], cP[1]], texte: 'graines pleines, au fond' },
      ],
    };
  };

  // ─── Vue 4 : rincer au tamis, étaler en une couche ─────────────────────────────────────
  const etaler = z => {
    const o = [];
    // le tamis fin, de face : la coupelle de grillage, le rebord, le manche
    const tx = z.l * 0.45, ty = 30, rx = Math.min(30, z.l * 0.2), ry = 17;
    const coupelle = `M${r1(tx - rx)} ${ty} A${rx} ${ry} 0 0 0 ${r1(tx + rx)} ${ty} Z`;
    o.push(h.path(coupelle, A.blanc), h.path(coupelle, A.hachure('grillage', 'arete')));
    const rt = alea(5);
    for (let i = 0; i < 9; i++) o.push(graine(tx - rx * 0.7 + rt() * rx * 1.4, ty + 3 + rt() * 7, rt() * 180));
    o.push(h.rect(tx - rx - 2, ty - 2.5, 2 * rx + 4, 4, bA));
    o.push(h.path(`M${r1(tx + rx + 2)} ${ty - 1.8} L${r1(tx + rx + 34)} ${ty - 7} L${r1(tx + rx + 34)} ${ty - 3} L${r1(tx + rx + 2)} ${ty + 1} Z`, bA));
    o.push(h.path(`M${r1(tx - rx - 2)} ${ty - 1} Q${r1(tx - rx - 9)} ${ty} ${r1(tx - rx - 8)} ${ty + 5}`, A.arete));
    // l'eau qui rince : un filet dessus, des gouttes dessous
    o.push(h.path(`M${r1(tx - 6)} 0 L${r1(tx - 5)} ${ty - 5}`, A.detail), h.path(`M${r1(tx - 1)} 0 L${r1(tx - 1.5)} ${ty - 5}`, A.detail));
    for (const [dx, dy] of [[-12, 20], [0, 24], [11, 19], [-4, 32], [7, 30]]) {
      const x = tx + dx, y = ty + dy;
      o.push(h.path(`M${r1(x)} ${r1(y - 3)} Q${r1(x + 1.6)} ${r1(y)} ${r1(x)} ${r1(y + 1.2)} Q${r1(x - 1.6)} ${r1(y)} ${r1(x)} ${r1(y - 3)} Z`, A.plein));
    }
    // la moustiquaire clouée sur quatre lattes, vue en plongée
    const yb = z.h - 6, xa = 8, Lf = z.l - 34, ox = 22, oy = Math.min(46, z.h * 0.3), e = 6;
    const c = [[xa, yb], [xa + Lf, yb], [xa + Lf + ox, yb - oy], [xa + ox, yb - oy]];
    const k = e / oy;
    const ci = [[xa + e + ox * k, yb - e], [xa + Lf - e + ox * k, yb - e], [xa + Lf + ox - e - ox * k, yb - oy + e], [xa + ox + e - ox * k, yb - oy + e]];
    o.push(h.chemin(c, A.hachure('bois', 'arete'), true));
    o.push(h.chemin(ci, A.blanc, true), h.chemin(ci, A.hachure('grillage', 'detail'), true));
    const rg = alea(19);
    for (let i = 0; i < 5; i++) for (let j = 0; j < 3; j++) {
      const v = (j + 0.5 + (rg() - 0.5) * 0.4) / 3, u = (i + 0.5 + (rg() - 0.5) * 0.4) / 5;
      const x = ci[0][0] + (ci[1][0] - ci[0][0]) * u + (ci[3][0] - ci[0][0]) * v;
      const y = ci[0][1] + (ci[3][1] - ci[0][1]) * v;
      o.push(graine(x, y, rg() * 40 - 20, 2.4, 1.1, bD));
    }
    o.push(h.fleche(`M${r1(tx + 4)} ${r1(ty + 40)} L${r1(tx + 10)} ${r1(yb - oy - 4)}`, A.arete));
    return {
      svg: o.join('\n'),
      renvois: [
        { n: 6, rond: [tx - rx - 12, ty + 24], cible: [tx - rx * 0.6, ty + 6], texte: 'tamis fin : rincer' },
        { n: 7, rond: [z.l - 14, yb - oy - 20], cible: [ci[2][0] - 16, ci[2][1] + 10], texte: 'une couche, tout de suite' },
      ],
    };
  };

  // ─── Rangée 2 : le test de germination au coton roulé ──────────────────────────────────
  // La guenille vue de dessus, bords effilochés, et les 20 graines en deux rangs.
  const guenille = (z, g) => {
    const x0 = 10, x1 = z.l - 10, y0 = 10, y1 = z.h - 10;
    const r = alea(g), bords = [];
    const n = 14;
    for (let i = 0; i <= n; i++) bords.push([x0 + (x1 - x0) * i / n, y0 + (r() - 0.5) * 1.6]);
    for (let i = 1; i <= 6; i++) bords.push([x1 + (r() - 0.5) * 1.6, y0 + (y1 - y0) * i / 6]);
    for (let i = n - 1; i >= 0; i--) bords.push([x0 + (x1 - x0) * i / n, y1 + (r() - 0.5) * 1.6]);
    for (let i = 5; i >= 1; i--) bords.push([x0 + (r() - 0.5) * 1.6, y0 + (y1 - y0) * i / 6]);
    const o = [h.chemin(bords, bA, true)];
    // effilochures sur les bords courts, plis
    for (let i = 1; i < 9; i++) {
      const y = y0 + (y1 - y0) * i / 9;
      o.push(h.path(`M${x0} ${r1(y)} l-3.5 ${r1((r() - 0.5) * 2)}`, A.fin), h.path(`M${x1} ${r1(y)} l3.5 ${r1((r() - 0.5) * 2)}`, A.fin));
    }
    o.push(h.path(`M${r1(x0 + 14)} ${r1(y1 - 8)} Q${r1((x0 + x1) / 2)} ${r1(y1 - 14)} ${r1(x1 - 30)} ${r1(y1 - 6)}`, A.fin));
    o.push(h.path(`M${r1(x1 - 20)} ${r1(y0 + 6)} Q${r1(x1 - 34)} ${r1((y0 + y1) / 2)} ${r1(x1 - 26)} ${r1(y1 - 16)}`, A.fin));
    const pos = [];
    for (let j = 0; j < 2; j++) for (let i = 0; i < 10; i++) {
      pos.push([x0 + 16 + (x1 - x0 - 32) * (i + 0.5) / 10 + (r() - 0.5) * 3, y0 + (y1 - y0) * (j ? 0.62 : 0.36) + (r() - 0.5) * 3, r() * 70 - 35]);
    }
    return { o, pos, x0, x1, y0, y1 };
  };

  const etendre = z => {
    const g = guenille(z, 3);
    const o = [...g.o, ...g.pos.map(([x, y, a]) => graine(x, y, a, 3.2, 2.2))];
    return {
      svg: o.join('\n'),
      renvois: [
        { n: 8, rond: [g.x0 + 14, g.y1 - 12], cible: [g.x0 + 40, g.y1 - 26], texte: 'coton ou papier humide' },
        { n: 9, rond: [g.x1 - 22, g.y0 + 14], cible: [g.pos[9][0] - 2, g.pos[9][1] - 1], texte: '20 graines (× 5), ou 100' },
      ],
    };
  };

  const rouler = z => {
    const o = [];
    // le rouleau couché : le bout montre la spirale, les graines prises entre les tours
    const R = Math.min(17, z.h * 0.16), cy = z.h * 0.5, xa = 10 + R, xb = z.l * 0.52;
    const tours = 3.2, pas = (R - 3) / tours;
    const sp = [];
    for (let t = 0; t <= tours * 360; t += 12) {
      const rr = 3 + pas * t / 360, a = t * RAD;
      sp.push([xa + rr * Math.cos(a) * 0.55, cy + rr * Math.sin(a)]);
    }
    o.push(h.path(`M${r1(xa)} ${r1(cy - R)} L${r1(xb)} ${r1(cy - R)} A${r1(R * 0.55)} ${r1(R)} 0 0 1 ${r1(xb)} ${r1(cy + R)} L${r1(xa)} ${r1(cy + R)} Z`, bA));
    o.push(h.ellipse(xa, cy, R * 0.55, R, bA));
    o.push(h.chemin(sp, A.detail));
    // le bord libre de la guenille, qui court le long du rouleau
    o.push(h.path(`M${r1(xa + R * 0.3)} ${r1(cy + R * 0.84)} L${r1(xb + R * 0.3)} ${r1(cy + R * 0.84)}`, A.fin));
    for (let t = 200; t <= tours * 360 - 60; t += 95) {
      const rr = 3 + pas * (t + 180) / 360, a = t * RAD;
      o.push(h.cercle(xa + rr * Math.cos(a) * 0.55, cy + rr * Math.sin(a), 1.1, A.plein));
    }
    // le geste : on roule
    o.push(h.fleche(`M${r1(xa - R * 0.9)} ${r1(cy + R * 0.9)} A${r1(R * 0.9)} ${r1(R * 1.35)} 0 0 1 ${r1(xa + R * 0.2)} ${r1(cy - R * 1.4)}`, A.arete));
    // le pot fermé, le rouleau debout dedans
    const W = Math.min(50, z.l * 0.24), H = Math.min(z.h - 16, 96);
    const px = z.l - W / 2 - 12, py = z.h - 4;
    const P = pot(rep(px, py, 0), W, H, { ferme: true });
    const lr = W * 0.5, hr = H * 0.72;
    o.push(decoupe(P.inter, [
      h.path(`M${r1(px - lr / 2)} ${r1(py - G_VERRE)} L${r1(px - lr / 2)} ${r1(py - hr)} A${r1(lr / 2)} 3 0 0 1 ${r1(px + lr / 2)} ${r1(py - hr)} L${r1(px + lr / 2)} ${r1(py - G_VERRE)} Z`, bD),
      h.path(`M${r1(px + lr * 0.18)} ${r1(py - G_VERRE)} L${r1(px + lr * 0.18)} ${r1(py - hr + 2.5)}`, A.fin),
    ]));
    o.push(...P.trait);
    o.push(h.fleche(`M${r1(xb + R * 0.8)} ${r1(cy)} L${r1(px - W / 2 - 8)} ${r1(cy)}`, A.arete));
    return {
      svg: o.join('\n'),
      renvois: [
        { n: 10, rond: [xa - 2, cy + R + 22], cible: [xa, cy + 5], texte: 'rouler, les graines dedans' },
        { n: 11, rond: [px - W / 2 - 16, py - H - 2], cible: [px - W / 2 + 4, py - H * 0.55], texte: 'pot fermé, clarté indirecte' },
      ],
    };
  };

  const compter = z => {
    const g = guenille(z, 3);
    const o = [...g.o];
    const r = alea(23);
    const rates = new Set([4, 13, 17]);
    g.pos.forEach(([x, y, a], i) => {
      if (rates.has(i)) o.push(graine(x, y, a, 3.2, 2.2));
      else o.push(germee(x, y, 80 + a * 0.3, 10 + r() * 6, 1));
    });
    return {
      svg: o.join('\n'),
      renvois: [
        { n: 12, rond: [g.pos[1][0] + 4, g.y0 + 10], cible: [g.pos[1][0], g.pos[1][1] - 1], texte: 'germée : on la compte' },
        { n: 13, rond: [g.pos[13][0] + 14, g.y1 - 6], cible: [g.pos[13][0] + 1, g.pos[13][1] + 2], texte: 'rien de sorti : pas germée' },
      ],
    };
  };

  // ─── Rangée 3 : le pot de garde, en coupe, dans sa caisse de métal ─────────────────────
  const garde = z => {
    const o = [];
    const t = 5;                                   // tôle de la caisse, noircie en coupe
    const Hc = z.h - 10;                           // hauteur hors tout, couvercle compris
    const Hp = (Hc - 2 * t - 22) / 1.04;           // hauteur de verre des pots
    const Wp = Hp * 0.56, jeu = 12;
    const Wc = Wp + 2 * jeu + 2 * t;
    const X0 = Math.max(50, z.l * 0.15), Yb = z.h - 4, Yt = Yb - Hc + 10;
    // la caisse : fond et parois, couvercle à rebord, poignée
    o.push(h.path(`M${r1(X0)} ${r1(Yt + 4)} L${r1(X0)} ${r1(Yb)} L${r1(X0 + Wc)} ${r1(Yb)} L${r1(X0 + Wc)} ${r1(Yt + 4)} L${r1(X0 + Wc - t)} ${r1(Yt + 4)} L${r1(X0 + Wc - t)} ${r1(Yb - t)} L${r1(X0 + t)} ${r1(Yb - t)} L${r1(X0 + t)} ${r1(Yt + 4)} Z`, A.plein));
    o.push(h.path(`M${r1(X0 - 4)} ${r1(Yt + 12)} L${r1(X0 - 4)} ${r1(Yt - 2)} L${r1(X0 + Wc + 4)} ${r1(Yt - 2)} L${r1(X0 + Wc + 4)} ${r1(Yt + 12)} L${r1(X0 + Wc + 4 - t)} ${r1(Yt + 12)} L${r1(X0 + Wc + 4 - t)} ${r1(Yt - 2 + t)} L${r1(X0 - 4 + t)} ${r1(Yt - 2 + t)} L${r1(X0 - 4 + t)} ${r1(Yt + 12)} Z`, A.plein));
    const pc = X0 + Wc / 2;
    o.push(h.path(`M${r1(pc - 22)} ${r1(Yt - 2)} L${r1(pc - 18)} ${r1(Yt - 10)} L${r1(pc + 18)} ${r1(Yt - 10)} L${r1(pc + 22)} ${r1(Yt - 2)}`, A.contour));

    // le pot de gauche, coupé par le milieu
    const cx = X0 + t + jeu + Wp / 2, yb = Yb - t;
    const T = rep(cx, yb, 0);
    const g = 4.2;                                  // verre, épaissi pour se lire
    const ext = profil(Wp, Hp), int = profil(Wp - 2 * g, Hp - g, -g);
    // la paroi de verre en coupe : l'extérieur, puis l'intérieur en blanc par-dessus
    const dExt = ser(ext, T) + ' Z', dInt = ser(int, T) + ' Z';
    o.push(h.path(dExt, bA));
    o.push(h.path(dInt, bD));
    // les petits traits du verre coupé
    const Wn = Wp * 0.8, yn = -Hp * 0.87;
    for (const yy of [-Hp * 0.15, -Hp * 0.45]) {
      for (const sx of [-1, 1]) {
        const xm = sx * (Wp / 2 - g / 2);
        o.push(h.path(ser([['M', [xm - 1.4, yy + 3]], ['L', [xm + 1.4, yy - 3]]], T), A.fin));
        o.push(h.path(ser([['M', [xm - 1.4, yy + 8]], ['L', [xm + 1.4, yy + 2]]], T), A.fin));
      }
    }
    const yf = [-Hp + 5, -Hp + 11];
    // le couvercle : rondelle de chambre à air (noire) sur le buvant, disque de tôle, bague vissée
    const bj = 1.8, xo = Wn / 2 + 4.2, yfb = [-Hp + 8, -Hp + 14];
    const couvercle = (Tf, cotes) => {
      const q = [];
      const P = (pts, at) => h.path(ser(pts, Tf) + ' Z', at);
      q.push(P([['M', [-Wn / 2 - 1, -Hp - 4.8]], ['L', [Wn / 2 + 1, -Hp - 4.8]], ['L', [Wn / 2 + 1, -Hp - 3]], ['L', [-Wn / 2 - 1, -Hp - 3]]], bA));
      for (const sx of cotes) {
        const X = ([u, v]) => [sx * u, v];
        const M = pts => pts.map(c => [c[0], ...c.slice(1).map(X)]);
        q.push(P(M([['M', [Wn / 2 - g - 1, -Hp - 3]], ['L', [Wn / 2 + 0.6, -Hp - 3]], ['L', [Wn / 2 + 0.6, -Hp]], ['L', [Wn / 2 - g - 1, -Hp]]]), A.plein));
        for (const y of yf) q.push(P(M([['M', [Wn / 2 - 0.3, y - 2.2]], ['Q', [Wn / 2 + 2.6, y], [Wn / 2 - 0.3, y + 2.2]]]), bA));
        const jupe = [['M', [Wn / 2 - 7, -Hp - 6.8]], ['L', [xo, -Hp - 6.8]], ['L', [xo, -Hp + 16]], ['L', [xo - bj, -Hp + 16]]];
        for (const y of [...yfb].reverse()) jupe.push(['L', [xo - bj, y + 1.8]], ['Q', [xo - bj - 2.4, y], [xo - bj, y - 1.8]]);
        jupe.push(['L', [xo - bj, -Hp - 4.8]], ['L', [Wn / 2 - 7, -Hp - 4.8]]);
        q.push(P(M(jupe), bA));
      }
      return q;
    };
    o.push(...couvercle(T, [-1, 1]));

    // dedans : deux sachets de dessiccant au fond, puis les sachets de semences debout
    const li = Wp - 2 * g, xi0 = cx - li / 2, yi = yb - g;
    const ds = (li - 6) / 2, dh = 11;
    for (let k = 0; k < 2; k++) {
      const x = xi0 + 2 + k * (ds + 2);
      const d = `M${r1(x + 3)} ${r1(yi - 0.5)} L${r1(x + ds - 3)} ${r1(yi - 0.5)} Q${r1(x + ds)} ${r1(yi - dh / 2)} ${r1(x + ds - 3)} ${r1(yi - dh)} L${r1(x + 3)} ${r1(yi - dh)} Q${r1(x)} ${r1(yi - dh / 2)} ${r1(x + 3)} ${r1(yi - 0.5)} Z`;
      o.push(h.path(d, A.blanc), h.path(d, A.hachure('gravier', 'detail')));
    }
    const ys = yi - dh - 0.5;
    const sw = (li - 8) / 3;
    const hauteurs = [Hp * 0.58, Hp * 0.62, Hp * 0.55];
    const sachets = [];
    hauteurs.forEach((hs, k) => {
      const x = xi0 + 2 + k * (sw + 2), y = ys - hs;
      if (k === 2) {
        // celui de droite, coupé : ses deux faces de papier, les graines, l'étiquette dedans
        o.push(h.path(`M${r1(x)} ${r1(ys)} L${r1(x)} ${r1(y)} L${r1(x + sw)} ${r1(y)} L${r1(x + sw)} ${r1(ys)}`, A.detail));
        o.push(h.path(`M${r1(x + 1.2)} ${r1(ys - 0.6)} L${r1(x + sw - 1.2)} ${r1(ys - 0.6)}`, A.detail));
        o.push(h.path(`M${r1(x)} ${r1(y + 7)} L${r1(x + sw)} ${r1(y + 7)}`, A.fin));
        const rg = alea(61);
        const yg = ys - hs * 0.52;
        // l'étiquette glissée dedans, debout, enfoncée dans la graine
        const ex = x + sw * 0.2, ew = sw * 0.6, ey = yg - 20;
        o.push(h.rect(ex, ey, ew, ys - 4 - ey, bD));
        for (let i = 0; i < 3; i++) o.push(h.path(`M${r1(ex + 2.5)} ${r1(ey + 5 + i * 4.5)} L${r1(ex + ew - 2.5 - (i % 2) * 4)} ${r1(ey + 5 + i * 4.5)}`, A.fin));
        for (let i = 0; i < 30; i++) o.push(graine(x + 3.5 + rg() * (sw - 7), yg + 3 + rg() * (ys - yg - 6), rg() * 180, 2.3, 1.5));
        o.push(h.path(`M${r1(x)} ${r1(yg)} ${[1, 2, 3, 4, 5].map(i => `L${r1(x + sw * i / 6)} ${r1(yg + (i % 2 ? -1.5 : 0.5))}`).join(' ')} L${r1(x + sw)} ${r1(yg)}`, A.fin));
        sachets.push({ x, y, ex, ey, ew, yg });
      } else {
        // une enveloppe entière : rabat replié deux fois, étiquette collée dessus
        o.push(h.rect(x, y, sw, hs, bD));
        o.push(h.path(`M${r1(x)} ${r1(y + 6)} L${r1(x + sw)} ${r1(y + 6)}`, A.fin), h.path(`M${r1(x)} ${r1(y + 11)} L${r1(x + sw)} ${r1(y + 11)}`, A.fin));
        const ex = x + 3, ew = sw - 6, ey = y + hs * 0.36, eh = hs * 0.3;
        o.push(h.rect(ex, ey, ew, eh, bF));
        for (let i = 0; i < 4; i++) o.push(h.path(`M${r1(ex + 2.5)} ${r1(ey + 5 + i * 5)} L${r1(ex + ew - 2.5 - (i % 2) * 5)} ${r1(ey + 5 + i * 5)}`, A.fin));
        sachets.push({ x, y, ex, ey, ew, eh });
      }
    });

    // la loupe sur le joint, côté droit du buvant, grossie quatre fois
    const k = 3.8, c0 = [Wn / 2 - 1.5, -Hp + 3];
    const Lr = Math.min(54, (z.l - X0 - Wc) / 2 - 8), Lx = X0 + Wc + (z.l - X0 - Wc) / 2 + 4, Ly = Yt + Lr + 4;
    const Z = ([u, v]) => [Lx + k * (u - c0[0]), Ly + k * (v - c0[1])];
    const zp = (pts, at) => h.path(ser(pts, Z) + ' Z', at);
    const dedans = [];
    // le goulot de verre, coupé
    dedans.push(zp([['M', [Wn / 2 - g, -Hp]], ['L', [Wn / 2, -Hp]], ['L', [Wn / 2, -Hp + 30]], ['L', [Wn / 2 - g, -Hp + 30]]], bA));
    for (const y of [-Hp + 3, -Hp + 9, -Hp + 15]) dedans.push(h.path(ser([['M', [Wn / 2 - g + 0.8, y + 1.6]], ['L', [Wn / 2 - 0.8, y - 1.6]]], Z), A.fin));
    dedans.push(...couvercle(Z, [1]));
    o.push(h.cercle(Lx, Ly, Lr, A.blanc));
    o.push(decoupe(`M${r1(Lx - Lr)} ${r1(Ly)} A${r1(Lr)} ${r1(Lr)} 0 1 0 ${r1(Lx + Lr)} ${r1(Ly)} A${r1(Lr)} ${r1(Lr)} 0 1 0 ${r1(Lx - Lr)} ${r1(Ly)} Z`, dedans));
    o.push(h.cercle(Lx, Ly, Lr, A.arete));
    // le cercle sur le pot, et le trait qui le relie à la loupe
    const cj = T(c0), rj = Lr / k;
    o.push(h.cercle(cj[0], cj[1], rj, A.detail));
    const du = [Lx - cj[0], Ly - cj[1]], dl = Math.hypot(du[0], du[1]);
    o.push(h.ligne(cj[0] + du[0] / dl * rj, cj[1] + du[1] / dl * rj, Lx - du[0] / dl * Lr, Ly - du[1] / dl * Lr, A.detail));
    const rond = Z([Wn / 2 - g / 2, -Hp - 1.5]);

    const s0 = sachets[0], s1 = sachets[2];
    const bord = X0 + Wc;
    return {
      svg: o.join('\n'),
      renvois: [
        { n: 14, rond: [X0 - 26, Yt + 4], cible: [X0 + 2.5, Yt + 20], texte: 'caisse de métal à couvercle' },
        { n: 15, rond: [Lx - Lr * 0.2, Ly + Lr + 18], cible: [rond[0] - 4, rond[1]], texte: 'rondelle de chambre à air' },
        { n: 16, rond: [X0 - 26, s0.ey + 10], cible: [s0.ex + 4, s0.ey + 10], texte: 'étiquette sur le sachet' },
        { n: 17, rond: [bord + 26, s1.ey + 7], cible: [s1.ex + s1.ew - 3, s1.ey + 7], texte: 'étiquette dans le sachet' },
        { n: 18, rond: [X0 - 26, yi - 6], cible: [xi0 + 8, yi - 6], texte: 'dessiccant au fond' },
      ],
    };
  };

  // ─── Rangée 3 : le joint vérifié sous l'eau ────────────────────────────────────────────
  const test = z => {
    const o = [];
    const yb = z.h - 4, t = 4;
    const Wb = Math.min(z.l - 40, 150), Hb = Math.min(z.h - 20, 170);
    const xb = (z.l - Wb) / 2, yt = yb - Hb;
    const ys = yt + 22;                            // la surface de l'eau
    // la chaudière en coupe : l'eau, puis la tôle
    o.push(h.rect(xb + t, ys, Wb - 2 * t, yb - t - ys, sans('eau')));
    o.push(h.ligne(xb + t, ys, xb + Wb - t, ys, A.arete));
    // le pot fermé, renversé, tenu sous l'eau : le couvercle en bas
    const Wp = Math.min(54, Wb * 0.38), Hp = Wp / 0.56;
    const cx = z.l / 2, cyFond = ys + 34;          // le fond du pot, en haut
    const T = rep(cx, cyFond, 180);
    const P = pot(T, Wp, Hp, { ferme: true });
    o.push(decoupe(P.inter, [h.rect(0, 0, z.l, z.h, A.blanc)]));
    o.push(...P.trait);
    // les bulles : elles sortent au joint, remontent le long du verre, crèvent à la surface
    const j = T([-P.Wn / 2 - 2, -Hp - 1]);        // le joint, côté droit une fois le pot renversé
    const xw = cx + Wp / 2 + 5;                   // le long de la paroi, dehors
    const chaine = [[j[0] + 2, j[1] - 3, 1.6], [j[0] + 6, j[1] - 11, 2], [xw - 1, j[1] - 22, 2.4]];
    for (let y = j[1] - 36, i = 0; y > cyFond + 10; y -= 15, i++) chaine.push([xw + (i % 2 ? 1 : -0.5), y, 2.8 + Math.min(i, 3) * 0.2]);
    for (const [x, y, rr] of chaine) o.push(h.cercle(x, y, rr, bD));
    o.push(h.path(`M${r1(xw - 7)} ${r1(ys - 1.5)} Q${r1(xw)} ${r1(ys - 6)} ${r1(xw + 7)} ${r1(ys - 1.5)}`, A.detail));
    // la chaudière par-dessus
    o.push(h.path(`M${r1(xb)} ${r1(yt)} L${r1(xb)} ${r1(yb)} L${r1(xb + Wb)} ${r1(yb)} L${r1(xb + Wb)} ${r1(yt)} L${r1(xb + Wb - t)} ${r1(yt)} L${r1(xb + Wb - t)} ${r1(yb - t)} L${r1(xb + t)} ${r1(yb - t)} L${r1(xb + t)} ${r1(yt)} Z`, A.plein));
    // la main qui appuie sur le fond du pot et le tient sous l'eau
    const m = F.main({ x: cx, y: cyFond, pose: 'appui', vue: 'profil', echelle: 0.44, bras: 110, cote: 'gauche' });
    o.push(m.toString());
    return {
      svg: o.join('\n'),
      renvois: [
        { n: 19, rond: [xb - 14, cyFond + Hp * 0.5], cible: [cx - Wp / 2 + 2, cyFond + Hp * 0.5], texte: 'pot fermé, couvercle en bas' },
        { n: 20, rond: [xb + Wb + 16, j[1] - 22], cible: [xw + 1, j[1] - 22], texte: 'une bulle : joint à refaire' },
      ],
    };
  };

  const vue = (titre, f) => ({ titre, dessin: z => f(z).svg, renvois: z => f(z).renvois });

  return {
    ref: '100-40',
    titre: 'Les graines : fermenter la tomate, tester la germination, garder au sec',
    desc: 'En haut, la tomate coupée en long, ses deux loges pleines de graines raclées à la cuillère dans un pot avec un peu d’eau ; '
      + 'le voile blanc qui couvre la surface ; le pot rempli d’eau et penché, la pulpe et les graines vides qui passent par-dessus le buvant, '
      + 'les graines pleines couchées au fond ; le rinçage au tamis fin et les graines étalées en une couche sur une moustiquaire clouée sur quatre lattes. '
      + 'Au milieu, le test de germination : vingt graines en deux rangs sur une guenille humide, la guenille roulée dans un pot fermé, '
      + 'puis déroulée, les graines germées avec leur racine et trois qui n’ont rien donné. '
      + 'En bas, en coupe, le pot de garde dans sa caisse de métal : sachets de dessiccant au fond, sachets de papier étiquetés debout, '
      + 'l’un coupé pour montrer l’étiquette glissée dedans, le couvercle vissé sur une rondelle de chambre à air ; à côté, le pot fermé tenu à l’envers sous l’eau, '
      + 'une bulle qui monte du joint.',
    format: 'pleine',
    disposition: [['racler', 'voile', 'vider', 'etaler'], ['etendre', 'rouler', 'compter'], ['garde', 'test']],
    hauteurs: [1.25, 0.72, 1.25],
    largeurs: [[1.2, 0.85, 1.15, 1.05], [1, 1.1, 1], [1.4, 1]],
    vues: {
      racler: vue('Racler, un peu d’eau', racler),
      voile: vue('Attendre le voile', voile),
      vider: vue('Remplir, brasser, vider', vider),
      etaler: vue('Rincer, étaler', etaler),
      etendre: vue('Étendre sur le coton humide', etendre),
      rouler: vue('Rouler, fermer', rouler),
      compter: vue('Dérouler, compter', compter),
      garde: vue('Le pot de garde, en coupe, dans sa caisse', garde),
      test: vue('Le joint, vérifié sous l’eau', test),
    },
  };
};
