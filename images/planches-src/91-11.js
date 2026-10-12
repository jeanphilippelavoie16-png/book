// Planche 91-11 — le séchoir de caisse (ch. 91, section 9 et route 1) : la caisse debout sur deux
// bûches à côté du poêle, ouverte en bas, percée en haut sous une tôle qui glisse, trois ou
// quatre claies de toile sur tasseaux ; la claie en couche simple ; le test du fruit refroidi.
// Aucune cote : le chapitre ne donne aucune dimension pour la caisse, les claies ni le jeu au poêle.
// Ajouts de construction que le chapitre ne nomme pas, pour que la chose se bâtisse et marche :
// les bûches (le bas ouvert doit respirer), les tasseaux (la claie doit reposer sur quelque
// chose), la porte à l'avant (les claies doivent sortir pour être tournées).

module.exports = (h) => {
  const f = v => Math.round(v * 10) / 10;
  const blanc = a => a.replace('fill="none"', 'fill="#FFFFFF"');
  const deuxBouts = a => `${a} marker-start="url(#fl)" marker-end="url(#fl)"`;
  const fleAir = d => h.fleche(d, h.a.cache);

  // Proportions communes à la coupe et au plan, en fractions de la largeur de la coupe.
  const P = { x0: 0.03, poele: 0.28, jeu: 0.10, caisse: 0.36 };

  // ── La coupe : le poêle en élévation, la caisse coupée ─────────────────────────────
  const coupe = z => {
    const yS = z.h - 12;
    const xs0 = Math.round(z.l * P.x0), ws = Math.round(z.l * P.poele);
    const pattes = 14, hs = Math.round(z.h * 0.40);
    const ybB = yS - pattes, ybT = ybB - hs;
    const xB = xs0 + ws + Math.round(z.l * P.jeu), wB = Math.round(z.l * P.caisse);
    const rL = 13, yBb = yS - 2 * rL, yBt = Math.round(z.h * 0.22), t = 7;
    const xO1 = xB + Math.round(wB * 0.32), xO2 = xB + Math.round(wB * 0.70);
    const xT1 = xO1 + Math.round((xO2 - xO1) * 0.45);     // bout de la tôle, au-dessus du trou
    const xOc = Math.round((xT1 + xO2) / 2);               // milieu de la part ouverte
    const yI0 = yBt + t, Hi = yBb - yI0;
    const niveaux = [0.22, 0.42, 0.62, 0.82].map(k => Math.round(yI0 + Hi * k));
    const xa = xB + t, xb = xB + wB - t;
    const colonnes = [xB + Math.round(wB * 0.36), xB + Math.round(wB * 0.64)];
    return { yS, xs0, ws, pattes, hs, ybB, ybT, xB, wB, rL, yBb, yBt, t, xO1, xO2, xT1, xOc, yI0, Hi, niveaux, xa, xb, colonnes };
  };

  const dessinCoupe = z => {
    const c = coupe(z), o = [];
    // plancher
    o.push(h.rect(0, c.yS, z.l, 9, h.a.hachure('bois')));
    o.push(h.ligne(0, c.yS, z.l, c.yS, h.a.arete));

    // poêle, en élévation
    const { xs0, ws, ybB, ybT, hs } = c;
    o.push(h.rect(xs0 + 6, ybB, 7, c.pattes, blanc(h.a.arete)));
    o.push(h.rect(xs0 + ws - 13, ybB, 7, c.pattes, blanc(h.a.arete)));
    const xp = xs0 + ws * 0.62, wp = 16;
    o.push(h.rect(xp, 0, wp, ybT - 6, blanc(h.a.arete)));
    o.push(h.ligne(xp, f((ybT - 6) * 0.45), xp + wp, f((ybT - 6) * 0.45), h.a.detail));
    o.push(h.rect(xs0, ybT, ws, hs, blanc(h.a.arete)));
    o.push(h.rect(xs0 - 4, ybT - 6, ws + 8, 6, blanc(h.a.arete)));
    const px = xs0 + ws * 0.14, pw = ws * 0.6, py = ybT + hs * 0.24, ph = hs * 0.48;
    o.push(h.rect(f(px), f(py), f(pw), f(ph), h.a.detail));
    o.push(h.ligne(f(px + pw - 9), f(py + ph * 0.4), f(px + pw - 9), f(py + ph * 0.6), h.a.arete));

    // bûches couchées, vues en bout : écorce, cernes décentrés, une fente
    [[c.xB + 20, 0.3], [c.xB + c.wB - 20, 2.1]].forEach(([x, ph]) => {
      const cy = c.yS - c.rL, pts = [];
      for (let i = 0; i < 40; i++) {
        const a = i * 2 * Math.PI / 40;
        const rr = c.rL * (1 + 0.05 * Math.sin(5 * a + ph) + 0.03 * Math.sin(9 * a + 2 * ph));
        pts.push([x + Math.cos(a) * rr, cy + Math.sin(a) * rr]);
      }
      o.push(h.chemin(pts, blanc(h.a.contour), true));
      o.push(h.cercle(x + 1, cy - 1, c.rL * 0.78, h.a.fin));
      o.push(h.cercle(x + 1.5, cy - 1.5, c.rL * 0.5, h.a.fin));
      o.push(h.cercle(x + 2, cy - 2, c.rL * 0.22, h.a.fin));
      o.push(h.path(`M ${f(x + 2)} ${f(cy - 2)} L ${f(x + 2 + Math.cos(ph + 1) * c.rL * 0.8)} ${f(cy - 2 + Math.sin(ph + 1) * c.rL * 0.8)}`, h.a.detail));
    });

    // caisse coupée : deux parois, le dessus percé, le bas ouvert
    const bois = h.a.hachure('bois', 'contour');
    o.push(h.rect(c.xB, c.yBt + c.t, c.t, c.yBb - c.yBt - c.t, bois));
    o.push(h.rect(c.xB + c.wB - c.t, c.yBt + c.t, c.t, c.yBb - c.yBt - c.t, bois));
    o.push(h.rect(c.xB, c.yBt, c.xO1 - c.xB, c.t, bois));
    o.push(h.rect(c.xO2, c.yBt, c.xB + c.wB - c.xO2, c.t, bois));
    // tôle posée sur le trou, à moitié avancée
    o.push(h.rect(c.xO1 - 18, c.yBt - 3.5, c.xT1 - c.xO1 + 18, 3.5, h.a.plein));

    // tasseaux, claies de toile sur cadre, fruits en couche simple
    c.niveaux.forEach(y => {
      const { xa, xb } = c, e = 2;
      o.push(h.rect(xa, y, 7, 7, h.a.hachure('bois')));
      o.push(h.rect(xb - 7, y, 7, 7, h.a.hachure('bois')));
      o.push(h.rect(xa + e, y - 7, 9, 7, h.a.hachure('bois')));
      o.push(h.rect(xb - e - 9, y - 7, 9, 7, h.a.hachure('bois')));
      o.push(h.ligne(xa + e, y - 7, xb - e, y - 7, h.a.arete));
      const x0 = xa + e + 9 + 6, x1 = xb - e - 9 - 6;
      const n = Math.max(1, Math.round((x1 - x0) / 11));
      for (let i = 0; i <= n; i++) o.push(h.cercle(f(x0 + i * (x1 - x0) / n), y - 7 - 4.4, 4.2, blanc(h.a.detail)));
    });

    // l'air : entre par le bas, traverse les claies, sort par la part ouverte du haut
    const hautFruit = y => y - 18, basClaie = y => y + 10;
    c.colonnes.forEach(x => {
      o.push(fleAir(`M ${x} ${c.yS - 2} L ${x} ${c.yBb - 8}`));
      const nv = c.niveaux;
      o.push(fleAir(`M ${x} ${c.yBb - 3} L ${x} ${basClaie(nv[3])}`));
      for (let k = nv.length - 1; k > 0; k--) o.push(fleAir(`M ${x} ${hautFruit(nv[k])} L ${x} ${basClaie(nv[k - 1])}`));
      o.push(fleAir(`M ${x} ${hautFruit(nv[0])} L ${f((x + c.xOc) / 2 + (c.xOc - x) * 0.2)} ${c.yBt + c.t + 5}`));
    });
    o.push(fleAir(`M ${c.xOc} ${c.yBt + 4} C ${c.xOc} ${c.yBt - 16} ${c.xOc + 10} ${c.yBt - 28} ${c.xOc + 26} ${c.yBt - 40}`));
    return o.join('\n');
  };

  // ── Le plan : le dessus de la caisse, la tôle, la porte ────────────────────────────
  const plan = z => {
    const tot = P.poele + P.jeu + P.caisse;
    const s = (z.l - 22) / tot;
    const ws = Math.round(P.poele * s), g = Math.round(P.jeu * s), wB = Math.round(P.caisse * s);
    const xs0 = 10, xB = xs0 + ws + g, dB = wB, dS = Math.round(ws * 0.85);
    const yBk = Math.max(46, Math.round((z.h - 2 * dB) / 2) + 20), yF = yBk + dB;
    const ySt = yBk + Math.round((dB - dS) / 2);
    const xO1 = xB + Math.round(wB * 0.32), xO2 = xB + Math.round(wB * 0.70);
    const xT1 = xO1 + Math.round((xO2 - xO1) * 0.45);
    const yO1 = yBk + Math.round(dB * 0.24), yO2 = yBk + Math.round(dB * 0.76);
    return { s, ws, g, wB, xs0, xB, dB, dS, yBk, yF, ySt, xO1, xO2, xT1, yO1, yO2 };
  };

  const dessinPlan = z => {
    const p = plan(z), o = [];
    // poêle, vu de dessus
    o.push(h.rect(p.xs0, p.ySt, p.ws, p.dS, blanc(h.a.arete)));
    o.push(h.rect(p.xs0 + 5, p.ySt + 5, p.ws - 10, p.dS - 10, h.a.detail));
    o.push(h.cercle(f(p.xs0 + p.ws * 0.66), f(p.ySt + p.dS * 0.36), 8, blanc(h.a.arete)));

    // dessus de la caisse, percé
    o.push(h.rect(p.xB, p.yBk, p.wB, p.dB, blanc(h.a.contour)));
    // l'ouverture : en tireté sous la tôle, en trait plein là où elle est découverte
    o.push(h.rect(p.xO1, p.yO1, p.xO2 - p.xO1, p.yO2 - p.yO1, h.a.cache));
    // la claie du haut, vue par la part ouverte
    for (let y = p.yO1 + 8; y < p.yO2 - 4; y += 10) {
      for (let x = p.xT1 + 7; x < p.xO2 - 4; x += 10) o.push(h.cercle(x, y, 3.8, h.a.detail));
    }
    // tôle posée par-dessus, à moitié sur le trou ; elle glisse
    const tx = p.xO1 - 12, ty = p.yO1 - 8, tw = p.xT1 - p.xO1 + 12, th = p.yO2 - p.yO1 + 16;
    o.push(h.rect(tx, ty, tw, th, blanc(h.a.arete)));
    o.push(h.rect(tx, ty, tw, th, h.a.hachure('metal', 'arete')));
    o.push(h.path(`M ${p.xT1} ${p.yO1} L ${p.xO1} ${p.yO1} L ${p.xO1} ${p.yO2} L ${p.xT1} ${p.yO2}`, h.a.cache));
    o.push(h.path(`M ${p.xT1} ${p.yO1} L ${p.xO2} ${p.yO1} L ${p.xO2} ${p.yO2} L ${p.xT1} ${p.yO2}`, h.a.arete));
    const yf = p.yBk - 16;
    o.push(h.path(`M ${p.xO1 - 10} ${yf} L ${p.xT1 + 14} ${yf}`, deuxBouts(h.a.arete)));

    // porte à l'avant, charnière du côté opposé au poêle
    const ep = 5, xH = p.xB + p.wB, yH = p.yF + ep;
    o.push(h.rect(p.xB, p.yF, p.wB, ep, blanc(h.a.contour)));
    o.push(h.rect(xH - ep, yH, ep, p.wB - ep, h.a.cache));
    o.push(h.path(`M ${p.xB} ${yH} A ${p.wB - ep} ${p.wB - ep} 0 0 0 ${xH - ep} ${yH + p.wB - ep}`, h.a.cache));
    o.push(h.cercle(xH - 1, p.yF + ep / 2, 2.4, h.a.plein));
    return o.join('\n');
  };

  // ── La claie, vue de dessus ────────────────────────────────────────────────────────
  const claie = z => {
    const x0 = 40, x1 = z.l - 44, y0 = 12, y1 = z.h - 10, e = 13;
    return { x0, x1, y0, y1, e };
  };
  const dessinClaie = z => {
    const c = claie(z), o = [];
    const { x0, x1, y0, y1, e } = c;
    // cadre de lattes, sous la toile : l'arête intérieure est cachée
    o.push(h.rect(x0, y0, x1 - x0, y1 - y0, blanc(h.a.contour)));
    o.push(h.rect(x0 + e, y0 + e, x1 - x0 - 2 * e, y1 - y0 - 2 * e, h.a.cache));
    // semences qui tiennent la toile, au milieu des lattes
    const m = e / 2;
    for (let x = x0 + m; x <= x1 - m + 0.1; x += (x1 - x0 - e) / Math.round((x1 - x0 - e) / 18)) {
      o.push(h.cercle(f(x), y0 + m, 1.4, h.a.plein));
      o.push(h.cercle(f(x), y1 - m, 1.4, h.a.plein));
    }
    for (let y = y0 + m; y <= y1 - m + 0.1; y += (y1 - y0 - e) / Math.round((y1 - y0 - e) / 18)) {
      o.push(h.cercle(x0 + m, f(y), 1.4, h.a.plein));
      o.push(h.cercle(x1 - m, f(y), 1.4, h.a.plein));
    }
    // fruits en couche simple, peau fendue ; le coin gauche laissé nu pour voir la toile
    const r = 6.2, pas = 17;
    let rang = 0;
    for (let y = y0 + e + 10; y < y1 - e - 6; y += pas * 0.9, rang++) {
      for (let x = x0 + e + 10 + (rang % 2) * pas / 2; x < x1 - e - 6; x += pas) {
        if (x < x0 + (x1 - x0) * 0.32 && y < y0 + (y1 - y0) * 0.62) continue;
        o.push(h.cercle(f(x), f(y), r, blanc(h.a.detail)));
        const a = ((x * 7 + y * 3) % 60 - 30) * Math.PI / 180;
        const dx = Math.cos(a) * r * 0.6, dy = Math.sin(a) * r * 0.6;
        o.push(h.path(`M ${f(x - dx)} ${f(y - dy)} L ${f(x + dx)} ${f(y + dy)}`, h.a.detail));
      }
    }
    return o.join('\n');
  };

  // ── Le test, sur un fruit refroidi ─────────────────────────────────────────────────
  const test = z => {
    const R = Math.min(38, Math.round(z.l * 0.13));
    const yc = Math.round(z.h * 0.6);
    const xs = [0.18, 0.5, 0.82].map(k => Math.round(z.l * k));
    return { R, yc, xs };
  };
  const couronne = (x, y) => {
    const o = [h.cercle(x, y, 3.2, blanc(h.a.detail))];
    for (let k = 0; k < 5; k++) {
      const a = -Math.PI / 2 + k * 2 * Math.PI / 5;
      o.push(h.path(`M ${f(x + Math.cos(a) * 3.2)} ${f(y + Math.sin(a) * 3.2)} L ${f(x + Math.cos(a) * 6)} ${f(y + Math.sin(a) * 6)}`, h.a.detail));
    }
    return o.join('\n');
  };
  const dessinTest = z => {
    const t = test(z), o = [];
    const { R, yc, xs } = t;
    // 1. sec : ratatiné, ridé, la fente fermée et sèche
    {
      const x = xs[0], Rs = R * 0.72, pts = [];
      for (let i = 0; i < 90; i++) {
        const a = i * 2 * Math.PI / 90;
        const rr = Rs * (1 + 0.045 * Math.sin(6 * a + 0.4) + 0.03 * Math.sin(13 * a + 1.2));
        pts.push([x + Math.cos(a) * rr, yc + Math.sin(a) * rr * 0.92]);
      }
      o.push(h.chemin(pts, blanc(h.a.arete), true));
      const yk = yc - Rs * 0.92 + 8;
      // plis courts et croisés, comme un raisin sec
      [[-0.75, -0.3, 0.4, 0.2], [0.1, -0.45, 0.45, 0.25], [-0.45, 0.4, 0.5, -0.2], [0.3, 0.5, 0.35, 0.3], [-0.85, 0.2, 0.3, 0.9], [0.6, -0.2, 0.3, 1.2]].forEach(([u, v, L, r]) => {
        const x1 = x + u * Rs, y1 = yc + v * Rs, dx = Math.cos(r) * L * Rs, dy = Math.sin(r) * L * Rs;
        o.push(h.path(`M ${f(x1)} ${f(y1)} Q ${f(x1 + dx / 2 - dy * 0.25)} ${f(y1 + dy / 2 + dx * 0.25)} ${f(x1 + dx)} ${f(y1 + dy)}`, h.a.detail));
      });
      // la même fente qu'au fruit pas prêt, au centre, fermée et sèche
      o.push(h.path(`M ${f(x - Rs * 0.4)} ${yc} Q ${x} ${yc - 3} ${f(x + Rs * 0.4)} ${yc} Q ${x} ${yc + 3} ${f(x - Rs * 0.4)} ${yc} Z`, blanc(h.a.arete)));
      o.push(couronne(x, f(yk)));
    }
    // 2. pas prêt : rond, la fente pressée laisse une perle de jus
    {
      const x = xs[1];
      o.push(h.cercle(x, yc, R, blanc(h.a.arete)));
      o.push(h.path(`M ${f(x - R * 0.45)} ${yc} Q ${x} ${yc - 3} ${f(x + R * 0.45)} ${yc} Q ${x} ${yc + 3} ${f(x - R * 0.45)} ${yc} Z`, h.a.detail));
      const gx = x + 2, gy = yc + 1;
      o.push(h.path(`M ${gx} ${gy} C ${gx + 8} ${gy + 6} ${gx + 10} ${gy + 14} ${gx} ${gy + 18} C ${gx - 10} ${gy + 14} ${gx - 8} ${gy + 6} ${gx} ${gy} Z`, blanc(h.a.arete)));
      o.push(h.path(`M ${gx - 4} ${gy + 10} Q ${gx - 4} ${gy + 14} ${gx - 0.5} ${gy + 15}`, h.a.fin));
      o.push(couronne(x, yc - R + 7));
    }
    // 3. séché trop chaud, coupé en deux : croûte dehors, humide au centre
    {
      const xm = xs[2], ri = R - 4.5, d = 6;
      [[-1, 0], [1, 1]].forEach(([sg, sw]) => {
        const x = xm + sg * d;
        o.push(h.path(`M ${x} ${yc - R} A ${R} ${R} 0 0 ${sw} ${x} ${yc + R} Z`, h.a.plein));
        o.push(h.path(`M ${x} ${yc - ri} A ${ri} ${ri} 0 0 ${sw} ${x} ${yc + ri} Z`, blanc(h.a.fin)));
        o.push(h.path(`M ${x} ${yc - ri} A ${ri} ${ri} 0 0 ${sw} ${x} ${yc + ri} Z`, h.a.hachure('eau', 'fin')));
        o.push(h.path(`M ${x} ${yc - R} A ${R} ${R} 0 0 ${sw} ${x} ${yc + R} Z`, h.a.arete));
      });
    }
    return o.join('\n');
  };

  const nb = ' ';
  return {
    ref: '91-11',
    titre: 'Le séchoir de caisse, à côté du poêle',
    desc: 'Une caisse de bois debout sur deux bûches, à côté du poêle et non dessus : ouverte en bas, percée en haut sous une tôle qu’on avance ou recule, trois ou quatre claies de toile posées sur des tasseaux, une porte à l’avant. L’air de la pièce entre par le bas, monte à travers les claies et sort par le haut. En bas, la claie en couche simple, et le test du fruit refroidi : sec, pas prêt, croûté.',
    format: 'pleine',
    disposition: [['coupe', 'dessus'], ['claie', 'test']],
    hauteurs: [3, 2],
    largeurs: [[3, 2], [1, 1]],
    vues: {
      coupe: {
        titre: 'En coupe',
        dessin: dessinCoupe,
        renvois: z => {
          const c = coupe(z);
          return [
            { n: 1, rond: [z.l - 16, c.yBt + 30], cible: [c.xB + c.wB - 3, c.yBt + 30], texte: `caisse debout, ouverte en bas, sur bûches` },
            { n: 2, rond: [c.xB - 18, c.yBb - 26], cible: [c.colonnes[0], c.yBb + 4], texte: `l’air de la pièce entre par le bas` },
            { n: 3, rond: [z.l - 16, c.niveaux[2] + 3], cible: [c.xb - 4, c.niveaux[2] + 3], texte: `claies sur tasseaux${nb}: les faire tourner` },
            { n: 4, rond: [Math.min(z.l - 16, c.xOc + 56), c.yBt - 40], cible: [c.xOc + 3, c.yBt - 18], texte: `l’air chargé d’humidité sort par le haut` },
            { n: 5, rond: [c.xs0 + c.ws * 0.3, c.ybT - 42], cible: [c.xs0 + c.ws * 0.3, c.ybT - 5], texte: `poêle${nb}: à côté, jamais dessus` },
          ];
        },
      },
      dessus: {
        titre: 'Vu de dessus',
        dessin: dessinPlan,
        renvois: z => {
          const p = plan(z);
          return [
            { n: 6, rond: [p.xB + p.wB - 10, p.yBk - 20], cible: [p.xT1 - 6, p.yO1 + 4], texte: `tôle avancée ou reculée${nb}: règle le tirage` },
            { n: 7, rond: [p.xB - 14, p.yF + 26], cible: [p.xB + 14, p.yF + 3], texte: `porte à l’avant, pour tourner les claies` },
          ];
        },
      },
      claie: {
        titre: 'La claie',
        dessin: dessinClaie,
        renvois: z => {
          const c = claie(z);
          return [
            { n: 8, rond: [18, c.y0 + 34], cible: [c.x0 + c.e / 2, c.y0 + 34], texte: `toile clouée sur un cadre de lattes` },
            { n: 9, rond: [z.l - 18, Math.round((c.y0 + c.y1) / 2)], cible: [c.x1 - c.e - 8, Math.round((c.y0 + c.y1) / 2)], texte: `couche simple, peau fendue` },
          ];
        },
      },
      test: {
        titre: 'Le test, sur un fruit refroidi',
        dessin: dessinTest,
        renvois: z => {
          const t = test(z), yr = Math.max(14, t.yc - t.R - 26);
          return [
            { n: 10, rond: [t.xs[0] + t.R * 0.9, yr], cible: [t.xs[0] + t.R * 0.15, t.yc - 1], texte: `sec${nb}: dur, la fente reste sèche` },
            { n: 11, rond: [t.xs[1] + t.R + 14, t.yc + t.R - 2], cible: [t.xs[1] + 7, t.yc + 14], texte: `perle de jus${nb}: retour au séchoir` },
            { n: 12, rond: [t.xs[2] + t.R * 0.9, yr], cible: [t.xs[2] + 14, t.yc - 6], texte: `croûté dehors, humide dedans${nb}: trop chaud` },
          ];
        },
      },
    },
  };
};
