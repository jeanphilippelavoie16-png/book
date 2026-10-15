// Planche 04-42. Le filtre de terre en chaudière (chapitre 4, §9, « Sans eau fermée : le filtre de terre » et
// « Le piège local »). Dessinée le 15 octobre 2026 (inventaire des planches, priorité moyenne).
// Tout vient du texte du chapitre. Cotes : la colonne de terre de 15 à 18 cm, la terre prise à 10 cm au moins
// sous la surface. Aucune autre mesure : ni l'épaisseur du gravier, ni la taille des trous, ni la chaudière (une
// chaudière de 20 L dessinée à ses proportions ordinaires, sans cote).
// Ce que le texte ne dit pas et que la planche dessine en principe : la chaudière posée sur deux bâtons en
// travers d'un récipient plus large, qui recueille l'eau ; la casserole qui verse ; le talus de chemin coupé,
// l'entaille creusée dans la couche grise (la pelle dessinée d'abord se lisait mal, coupée).
// La charte : la flèche rouge, verser lentement sur le linge du dessus.
// Le test du boudin (refait le 15 octobre, JP sur les mains qui tenaient la terre : « c'est butcher ») : sans main,
// le boudin roulé posé seul sur une planche, vu de dessus ; entier pour l'argile, en bouts et en miettes pour le
// sable. Le titre de chaque vignette dit le verdict.
module.exports = (h) => {
  const A = h.a;
  const F = h.formes;
  const f1 = v => Math.round(v * 10) / 10;
  const W = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const hasard = graine => () => { graine = (graine * 16807) % 2147483647; return (graine - 1) / 2147483646; };

  // L'argile : des tirets horizontaux (la convention des coupes de sol), différents de la terre noire.
  const ARGILE = `<defs><pattern id="vue-argile" width="14" height="6" patternUnits="userSpaceOnUse">`
    + `<line x1="1" y1="1.5" x2="7" y2="1.5" stroke="#1A1A1A" stroke-width="0.7"/>`
    + `<line x1="8" y1="4.5" x2="13" y2="4.5" stroke="#1A1A1A" stroke-width="0.7"/></pattern></defs>`;
  const argile = (t = 'arete') => t === 'aucun' ? 'fill="url(#vue-argile)" stroke="none"'
    : `fill="url(#vue-argile)" stroke="#1A1A1A" stroke-width="${{ contour: 2.4, arete: 1.4, detail: 0.7 }[t]}" stroke-linejoin="round"`;
  // L'eau : sa surface et quelques rides, sans trame (la trame des tirets est celle de l'argile).
  const rides = (xa, xb, y) => {
    const o = [h.ligne(xa, y, xb, y, A.detail)];
    const L = xb - xa;
    for (const [u, dy, l] of [[0.18, 5, 16], [0.52, 4, 22], [0.78, 7, 12], [0.34, 10, 10]]) o.push(h.ligne(xa + u * L, y + dy, xa + u * L + l, y + dy, A.fin));
    return o.join('\n');
  };

  // ─── La coupe : la chaudière percée, ses couches, l'eau qui tombe dessous ────────────────────────
  const k = 5.4;                                     // unités par cm (la chaudière fait 36 cm de haut)
  const G = z => {
    const cx = 172, y0 = 84, y1 = y0 + 36 * k;
    const rT = 14.5 * k, rB = 13 * k;
    const rIn = y => rB + (rT - rB) * (y1 - y) / (y1 - y0);    // demi-largeur intérieure à la hauteur y
    const yGr = y1 - 3 - 4 * k, yLb = yGr - 4.5, yTe = yLb - 16.5 * k, yLh = yTe - 4.5, yEau = yLh - 3 * k;
    const yR = y1 + 13, rR = 19 * k;                 // le récipient du dessous
    return { cx, y0, y1, rT, rB, rIn, yGr, yLb, yTe, yLh, yEau, yR, rR, yRb: Math.min(z.h - 8, yR + 21 * k) };
  };
  const coupe = z => {
    const g = G(z), o = [ARGILE];
    const { cx, y0, y1, rIn, yGr, yLb, yTe, yLh, yEau, yR, rR, yRb } = g;
    const bande = (ya, yb, at) => h.chemin([[cx - rIn(ya), ya], [cx + rIn(ya), ya], [cx + rIn(yb), yb], [cx - rIn(yb), yb]], at, true);

    // le récipient du dessous, plus large, et l'eau recueillie
    const rRb = rR - 2 * k;
    const yEauR = yRb - 8 * k;
    const rRe = rRb + (rR - rRb) * (yRb - yEauR) / (yRb - yR);
    o.push(rides(cx - rRe + 1, cx + rRe - 1, yEauR));
    o.push(h.chemin([[cx - rR - 4, yR], [cx - rR, yR], [cx - rRb, yRb], [cx + rRb, yRb], [cx + rR, yR], [cx + rR + 4, yR]], A.contour));

    // les deux bâtons en travers du récipient (vus par le bout), la chaudière posée dessus
    for (const s of [-1, 1]) o.push(h.cercle(cx + s * 48, yR - 6.5, 6.5, A.hachure('bois', 'arete')));

    // les gouttes qui tombent des trous
    const trous = [];
    for (let x = -60; x <= 60; x += 15) trous.push(cx + x);
    for (const [i, x] of trous.entries()) {
      if (Math.abs(x - cx - 48) < 9 || Math.abs(x - cx + 48) < 9) continue;
      for (const dy of [10 + (i % 3) * 7, 34 + (i % 2) * 9]) {
        const yy = y1 + dy;
        if (yy > yEauR - 6) continue;
        o.push(h.path(`M${f1(x)} ${f1(yy - 3.5)} Q${f1(x + 2.2)} ${f1(yy + 1)} ${f1(x)} ${f1(yy + 2.2)} Q${f1(x - 2.2)} ${f1(yy + 1)} ${f1(x)} ${f1(yy - 3.5)} Z`, A.plein));
      }
    }

    // les couches, du fond vers le haut
    o.push(bande(yGr, y1 - 3, A.hachure('gravier', 'aucun')));
    o.push(bande(yLb, yGr, W(A.detail)));
    o.push(bande(yTe, yLb, argile('aucun')));
    for (let i = 1; i < 4; i++) {                     // tassée par couches
      const y = yTe + i * (yLb - yTe) / 4;
      o.push(h.ligne(cx - rIn(y) + 2, y, cx + rIn(y) - 2, y, A.fin));
    }
    o.push(bande(yLh, yTe, W(A.detail)));
    o.push(rides(cx - rIn(yEau), cx + rIn(yEau), yEau));

    // la chaudière en coupe : les parois et le fond percé, en noir plein
    const ep = 2.6;
    for (const s of [-1, 1]) {
      o.push(h.chemin([[cx + s * rIn(y0), y0], [cx + s * (rIn(y0) + ep), y0], [cx + s * (rIn(y1) + ep), y1], [cx + s * rIn(y1), y1]], A.plein, true));
      // le rebord roulé
      o.push(h.chemin([[cx + s * (rIn(y0) + ep), y0], [cx + s * (rIn(y0) + ep + 5), y0 + 2], [cx + s * (rIn(y0) + ep + 5), y0 + 9], [cx + s * (rIn(y0) + ep), y0 + 9]], A.plein, true));
    }
    let xa = cx - rIn(y1);
    for (const x of [...trous, cx + rIn(y1) + 1]) {
      const xb = Math.min(x - 1.4, cx + rIn(y1));
      if (xb > xa) o.push(h.rect(xa, y1 - 3, xb - xa, 3, A.plein));
      xa = x + 1.4;
    }

    // la casserole qui verse, en haut à droite ; le filet tombe au milieu du linge
    const P = (u, v) => { const a = -35 * Math.PI / 180; return [262 + u * Math.cos(a) - v * Math.sin(a), 52 + u * Math.sin(a) + v * Math.cos(a)]; };
    const pp = (...pts) => pts.map(p => { const q = P(...p); return `${f1(q[0])} ${f1(q[1])}`; });
    const [c0, c1, c2, c3, c4, c5] = pp([-32, -20], [-32, 14], [-26, 20], [26, 20], [32, 14], [32, -20]);
    o.push(h.path(`M${c0} L${c1} Q${pp([-32, 20])} ${c2} L${c3} Q${pp([32, 20])} ${c4} L${c5}`, W(A.contour)));
    o.push(h.chemin([P(-35, -20), P(35, -20)], A.arete));
    o.push(h.chemin([P(32, -15), P(80, -18), P(81, -11), P(32, -8)], W(A.arete), true));
    const bec = P(-34, -20);
    o.push(h.path(`M${f1(bec[0] + 1)} ${f1(bec[1] + 3)} C${f1(bec[0] - 14)} ${f1(bec[1] + 12)} ${f1(cx + 6)} ${f1(yEau - 40)} ${f1(cx + 4)} ${f1(yEau)}`, A.arete));
    o.push(h.geste(`M${f1(bec[0] - 24)} ${f1(bec[1] + 8)} Q${f1(bec[0] - 40)} ${f1(bec[1] + 24)} ${f1(bec[0] - 44)} ${f1(bec[1] + 46)}`));

    // la cote de la terre, à gauche
    const xc = cx - rIn(yTe) - 30;
    o.push(h.ligne(cx - rIn(yTe) - 4, yTe, xc - 6, yTe, A.fin), h.ligne(cx - rIn(yLb) - 4, yLb, xc - 6, yLb, A.fin));
    o.push(h.cote(xc, yTe, xc, yLb, '15 à 18 cm', { cote: 'gauche' }));
    return { svg: o.join('\n'), g };
  };

  // ─── Où la prendre : la coupe d'un talus, la terre noire, la couche grise dessous ─────────────────
  const sol = z => {
    const o = [ARGILE];
    const ys = 92, xf = 112, yb = z.h - 60, yN = ys + 44;
    // le talus coupé : terre noire dessus, couche grise dessous
    o.push(h.chemin([[0, ys], [xf, ys], [xf, yN], [0, yN]], A.hachure('terre', 'aucun'), true));
    o.push(h.chemin([[0, yN], [xf, yN], [xf, yb], [0, yb]], argile('aucun'), true));
    o.push(h.ligne(0, yN, xf, yN, A.detail));
    const yP = yN + 70;
    o.push(h.chemin([[0, ys], [xf, ys], [xf, yP - 22]], A.contour), h.chemin([[xf, yP + 22], [xf, yb], [z.l, yb]], A.contour));
    // des touffes d'herbe sur le dessus
    for (const x of [14, 46, 74, 100]) o.push(h.path(`M${x - 5} ${ys} Q${x - 4} ${ys - 9} ${x - 7} ${ys - 13} M${x} ${ys} Q${x + 1} ${ys - 11} ${x} ${ys - 16} M${x + 4} ${ys} Q${x + 6} ${ys - 8} ${x + 9} ${ys - 11}`, A.detail));
    // le fond du fossé, à droite
    o.push(h.rect(xf, yb, z.l - xf, 10, A.hachure('terre', 'aucun')));
    // l'entaille où l'on a pris la terre : un creux dans la face, sous la terre noire, à 10 cm au moins
    o.push(h.path(`M${xf} ${yP - 22} C${xf - 30} ${yP - 24} ${xf - 40} ${yP - 6} ${xf - 38} ${yP + 6} C${xf - 36} ${yP + 18} ${xf - 22} ${yP + 24} ${xf} ${yP + 22} Z`, A.blanc));
    o.push(h.path(`M${xf} ${yP - 22} C${xf - 30} ${yP - 24} ${xf - 40} ${yP - 6} ${xf - 38} ${yP + 6} C${xf - 36} ${yP + 18} ${xf - 22} ${yP + 24} ${xf} ${yP + 22}`, A.contour));
    // la cote : 10 cm au moins sous la surface
    o.push(h.ligne(xf + 4, ys, xf + 28, ys, A.fin));
    o.push(h.ligne(xf + 4, yP - 22, xf + 28, yP - 22, A.fin));
    o.push(h.cote(xf + 22, ys, xf + 22, yP - 22, '10 cm au moins', { cote: 'droite' }));
    return { svg: o.join('\n'), P: { noire: [70, ys + 22], grise: [xf - 37, yP + 4], ys, yN, xf } };
  };

  // ─── Le test du boudin, posé sur une planche ───────────────────────────────────────────────────
  // Le chapitre : « une poignée mouillée qui se roule en boudin sans casser est de l'argile, une poignée qui
  // s'effrite est du sable ». Le boudin roulé, posé seul sur une planche, vu de dessus ; pas de main.
  const planche = z => {
    const o = [], y0 = 20, y1 = z.h - 14;
    o.push(h.rect(6, y0, z.l - 12, y1 - y0, W(A.arete)));
    for (const [y, xa, xb] of [[y0 + 14, 22, 120], [y0 + 14, 150, z.l - 30], [y1 - 16, 40, 170], [y1 - 16, 196, z.l - 22]]) o.push(h.ligne(xa, y, xb, y, A.fin));
    return { svg: o.join('\n'), y0, y1 };
  };
  // le boudin : un axe légèrement courbe, une demi-épaisseur r ; rend le contour fermé, bouts arrondis
  const axe = (z, ym) => { const xa = 34, xb = z.l - 34; return t => [xa + (xb - xa) * t, ym + 10 * Math.sin(Math.PI * t) - 5]; };
  const boudin = (A_, t0, t1, r, bout0 = 'rond', bout1 = 'rond', graine = 1) => {
    const R = hasard(graine), n = 24, haut = [], bas = [];
    for (let i = 0; i <= n; i++) {
      const t = t0 + (t1 - t0) * i / n, p = A_(t), q = A_(Math.min(1, t + 0.001)), pm = A_(Math.max(0, t - 0.001));
      const dx = q[0] - pm[0], dy = q[1] - pm[1], L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L;
      haut.push([p[0] + nx * r, p[1] + ny * r]); bas.push([p[0] - nx * r, p[1] - ny * r]);
    }
    const bout = (pa, pb, type, sens) => {
      if (type === 'rond') return [];
      // une cassure : quatre ou cinq dents irrégulières entre les deux bords
      const pts = [];
      for (let k = 1; k < 5; k++) { const t = k / 5; pts.push([pa[0] + (pb[0] - pa[0]) * t + sens * (R() * 5 - 1), pa[1] + (pb[1] - pa[1]) * t]); }
      return pts;
    };
    const cont = haut.slice();
    const fin = bout(haut[n], bas[n], bout1, 1);
    cont.push(...fin, ...bas.slice().reverse(), ...bout(bas[0], haut[0], bout0, -1));
    let d = lisseOuvert(haut);
    if (bout1 === 'rond') d += ` A${f1(r)} ${f1(r)} 0 0 0 ${f1(bas[n][0])} ${f1(bas[n][1])}`;
    else d += fin.map(p => ` L${f1(p[0])} ${f1(p[1])}`).join('') + ` L${f1(bas[n][0])} ${f1(bas[n][1])}`;
    d += lisseOuvert(bas.slice().reverse(), true);
    if (bout0 === 'rond') d += ` A${f1(r)} ${f1(r)} 0 0 0 ${f1(haut[0][0])} ${f1(haut[0][1])}`;
    else d += bout(bas[0], haut[0], bout0, -1).map(p => ` L${f1(p[0])} ${f1(p[1])}`).join('') + ` L${f1(haut[0][0])} ${f1(haut[0][1])}`;
    return d + ' Z';
  };
  // courbe lisse ouverte par des points (suite = sans le M de départ, enchaînée par un L)
  const lisseOuvert = (pts, suite = false) => {
    const n = pts.length, P = i => pts[Math.max(0, Math.min(n - 1, i))];
    let d = suite ? ` L${f1(pts[0][0])} ${f1(pts[0][1])}` : `M${f1(pts[0][0])} ${f1(pts[0][1])}`;
    for (let i = 0; i < n - 1; i++) {
      const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
      d += ` C${f1(p1[0] + (p2[0] - p0[0]) / 6)} ${f1(p1[1] + (p2[1] - p0[1]) / 6)} ${f1(p2[0] - (p3[0] - p1[0]) / 6)} ${f1(p2[1] - (p3[1] - p1[1]) / 6)} ${f1(p2[0])} ${f1(p2[1])}`;
    }
    return d;
  };
  const test = (z, bon) => {
    const pl = planche(z), o = [pl.svg];
    const ym = (pl.y0 + pl.y1) / 2, A_ = axe(z, ym), r = 11;
    if (bon) {
      o.push(h.path(boudin(A_, 0, 1, r), argile('contour')));
      return { svg: o.join('\n'), P: A_(0.62) };
    }
    // le sable : le boudin n'a pas tenu, il est en bouts cassés, écartés, et en miettes
    const morceaux = [[0, 0.2, 'rond', 'casse', 0], [0.26, 0.47, 'casse', 'casse', 3], [0.55, 0.7, 'casse', 'casse', 2], [0.8, 1, 'casse', 'rond', -2]];
    for (const [t0, t1, b0, b1, dy] of morceaux) {
      const Ad = t => { const p = A_(t); return [p[0], p[1] + dy]; };
      o.push(h.path(boudin(Ad, t0, t1, r - 0.5, b0, b1, Math.round(t0 * 10) + 3), A.hachure('gravier', 'contour')));
    }
    const R = hasard(11);
    for (let i = 0; i < 34; i++) {
      const t = R(), p = A_(t), gap = [[0.2, 0.26], [0.47, 0.55], [0.7, 0.8]].some(([a, b]) => t > a - 0.02 && t < b + 0.02);
      const dx = (R() - 0.5) * 22, dy = (R() < 0.5 ? -1 : 1) * (r + 3 + R() * (gap ? 6 : 12)) * (gap ? R() : 1);
      const cx = p[0] + dx, cy = p[1] + dy, s = 1.6 + R() * 2.2, pts = [];
      for (let k = 0; k < 5; k++) { const a = k / 5 * 2 * Math.PI + R() * 0.6; pts.push([cx + s * Math.cos(a), cy + s * 0.85 * Math.sin(a)]); }
      o.push(h.chemin(pts, W(A.detail), true));
    }
    return { svg: o.join('\n'), P: A_(0.6) };
  };

  return {
    ref: '04-42',
    titre: 'Le filtre de terre en chaudière',
    desc: 'À gauche, en coupe : une chaudière au fond percé de trous fins, posée sur deux bâtons en travers d’un récipient plus large. Du fond vers le haut : un lit de gravier, un linge, une colonne de terre argileuse tassée en quatre couches, cotée 15 à 18 cm, un autre linge, un peu d’eau. Une casserole verse un filet au milieu du linge du dessus (flèche rouge) ; l’eau goutte des trous dans le récipient du dessous. À droite, un talus coupé : la terre noire dessus, la couche grise et collante dessous ; une pelle enfoncée dans la couche grise, à 10 cm au moins sous la surface. En bas, le test dans la main : à gauche, la poignée mouillée roulée en boudin entier posée sur la paume, cerclée de rouge (de l’argile) ; à droite, la poignée qui s’effrite en bouts et en miettes (du sable).',
    format: 'pleine',
    disposition: [['coupe', 'sol'], ['boudin', 'miette']],
    hauteurs: [3, 0.95],
    largeurs: [[3, 2], [1, 1]],
    vues: {
      coupe: {
        titre: 'Monté, en coupe',
        dessin: z => coupe(z).svg,
        renvois: z => {
          const { g } = coupe(z);
          const { cx, rIn, y1, yGr, yLb, yTe, yLh, yRb } = g;
          const xr = y => cx + rIn(y) - 10;
          return [
            { n: 1, rond: [z.l - 18, 300], cible: [cx + 22, y1 - 1.5], texte: 'fond percé de trous fins' },
            { n: 2, rond: [z.l - 18, 262], cible: [xr(yGr + 11), yGr + 11], texte: 'lit de gravier' },
            { n: 3, rond: [z.l - 18, 230], cible: [xr(yLb + 2.2), yLb + 2.2], texte: 'linge' },
            { n: 4, rond: [z.l - 18, 188], cible: [xr((yTe + yLb) / 2), (yTe + yLb) / 2], texte: 'terre argileuse tassée par couches' },
            { n: 5, rond: [z.l - 18, 132], cible: [xr(yLh + 2.2), yLh + 2.2], texte: 'linge dessus : le jet ne creuse pas' },
            { n: 6, rond: [z.l - 18, yRb - 22], cible: [cx + 60, yRb - 18], texte: 'eau recueillie dessous' },
          ];
        },
      },
      sol: {
        titre: 'Où prendre la terre',
        dessin: z => sol(z).svg,
        renvois: z => {
          const { P } = sol(z);
          return [
            { n: 7, rond: [24, 24], cible: P.noire, texte: 'terre noire de surface' },
            { n: 8, rond: [24, P.yN + 130], cible: P.grise, texte: 'couche grise et collante : celle-là' },
          ];
        },
      },
      boudin: {
        titre: 'Argile : le boudin tient',
        dessin: z => test(z, true).svg,
        renvois: z => [{ n: 9, rond: [z.l - 40, z.h - 22], cible: (p => [p[0] + 6, p[1] + 12])(test(z, true).P), texte: 'poignée mouillée roulée en boudin' }],
      },
      miette: {
        titre: 'Sable : il s’effrite',
        dessin: z => test(z, false).svg,
      },
    },
  };
};
