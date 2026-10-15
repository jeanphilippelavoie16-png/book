// Planche 11-04. La pièce d'air propre : le cube de quatre filtres, le filtre seul et son carton, la pièce fermée
// (chapitre 11, §9, « De l'air pour les enfants, sans purificateur »). Dessinée le 15 octobre 2026 (inventaire des
// planches, priorité haute).
// La forme du cube n'est ni dans le chapitre ni dans la source du chiffrage (sources/16b-epa-purificateur-maison-
// ventilateur-filtre.md). Elle vient de la fiche de l'OHCOW (sources/11-ohcow-boite-corsi-rosenthal.md) : quatre
// filtres en cube, flèches vers l'intérieur, plis à la verticale ; un fond de carton ; le ventilateur posé dessus,
// qui souffle vers le haut ; les joints au ruban ; un carton sur la face qui souffle, percé au diamètre des pales.
// Le filtre seul : la flèche du filtre vers le ventilateur (chapitre), le carton sur la face qui souffle (EPA :
// « cardboard shroud », OHCOW : le rond au diamètre des pales).
// Proportions dessinées sans cote : filtres de 51 cm (20 po), ventilateur de 51 cm ; le chapitre ne cote rien.
// La pièce : polythène agrafé sur le cadre de la fenêtre, couverture roulée au bas de la porte (chapitre). La clé
// d'air n'est pas dessinée : la pièce choisie est sans poêle si possible.
// Pas de pulseur de chaufferette : le chapitre ne dit pas comment on lui tient un filtre.
// La charte : les cercles rouges, la flèche imprimée sur le filtre (le sens qui se rate).
module.exports = (h) => {
  const A = h.a;
  const f1 = v => Math.round(v * 10) / 10;
  const W = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const pt = p => `${f1(p[0])} ${f1(p[1])}`;
  const poly = (pts, at, ferme = true) => h.path('M' + pts.map(pt).join(' L') + (ferme ? ' Z' : ''), at);

  // ─── Le cube, en perspective isométrique (cm) ────────────────────────────────────────────────────
  const s = 2.45, c30 = Math.cos(Math.PI / 6);
  const iso = (ox, oy) => ([x, y, z]) => [ox + (x - y) * c30 * s, oy + (x + y) * 0.5 * s - z * s];
  const cube = z => {
    const L = 51, b = 2.5, F0 = L, F1 = L + 10, dep = 1.5;   // filtres de 51 cm ; ventilateur de 10 cm, qui déborde un peu
    const P = iso(z.l / 2, 196);
    const o = [];
    // l'air qui entre par les deux faces vues
    // le fond de carton, qui dépasse à peine
    o.push(poly([P([L, 0, 0]), P([L, L, 0]), P([0, L, 0]), P([0, L, -1.4]), P([L, L, -1.4]), P([L, 0, -1.4])], W(A.arete)));
    // les deux filtres vus : cadre, plis verticaux ; la face de droite à l'ombre
    const face = (Q, ombre) => {
      // Q(u, v) : un point de la face, u le long de la face (0..L), v la hauteur (0..L)
      const out = [];
      const ext = [Q(0, 0), Q(L, 0), Q(L, L), Q(0, L)], int = [Q(b, b), Q(L - b, b), Q(L - b, L - b), Q(b, L - b)];
      out.push(poly(ext, W(A.arete)));
      if (ombre) out.push(poly(int, A.ombre));
      for (let u = b + 2; u < L - b - 0.5; u += 2) out.push(h.ligne(...Q(u, b), ...Q(u, L - b), A.fin));
      out.push(poly(int, A.detail));
      return out.join('\n');
    };
    o.push(face((u, v) => P([u, L, v]), false));             // la face de gauche (y = L)
    o.push(face((u, v) => P([L, L - u, v]), true));          // la face de droite (x = L)
    // l'air qui entre par les deux faces vues
    o.push(h.fleche(`M${pt(P([L + 30, 26, 22]))} L${pt(P([L + 3, 26, 22]))}`, A.contour.replace('stroke-width="2.4"', 'stroke-width="1.6"')));
    o.push(h.fleche(`M${pt(P([26, L + 30, 22]))} L${pt(P([26, L + 3, 22]))}`, A.contour.replace('stroke-width="2.4"', 'stroke-width="1.6"')));
    // le ruban sur l'arête de devant et les arêtes du haut
    const r = 2.2;
    o.push(poly([P([L, L - r, 0]), P([L, L - r, L]), P([L - r, L, L]), P([L - r, L, 0])], W(A.detail)));
    // le ventilateur posé dessus : le boîtier, le bouton, la grille sous le carton
    const V = (x, y, zz) => P([x, y, zz]);
    const a0 = -dep, a1 = L + dep;
    o.push(poly([V(a1, a1, F0), V(a1, a0, F0), V(a1, a0, F1), V(a1, a1, F1)], A.ombre));
    o.push(poly([V(a1, a1, F0), V(a1, a0, F0), V(a1, a0, F1), V(a1, a1, F1)], A.contour.replace('stroke-width="2.4"', 'stroke-width="1.4"')));
    o.push(poly([V(a1, a1, F0), V(a0, a1, F0), V(a0, a1, F1), V(a1, a1, F1)], W(A.arete)));
    o.push(h.ellipse(...V(a1, a0 + 7, F0 + 5), 2.6, 3.4, W(A.detail)));
    // le carton de dessus, percé au diamètre des pales ; dans le rond, la grille et le moyeu
    const yC = F1 + 0.6;
    o.push(poly([V(a1, a1, F1), V(a1, a0, F1), V(a1, a0, yC), V(a1, a1, yC)], W(A.detail)));
    o.push(poly([V(a1, a1, F1), V(a0, a1, F1), V(a0, a1, yC), V(a1, a1, yC)], W(A.detail)));
    o.push(poly([V(a0, a0, yC), V(a1, a0, yC), V(a1, a1, yC), V(a0, a1, yC)], W(A.arete)));
    const ctr = V(L / 2, L / 2, yC), R = 19;
    const rx = R * Math.SQRT2 * c30 * s, ry = R * Math.SQRT2 * 0.5 * s;
    o.push(h.ellipse(ctr[0], ctr[1], rx, ry, A.loin), h.ellipse(ctr[0], ctr[1], rx, ry, A.arete));
    for (const k of [0.68, 0.36]) o.push(h.ellipse(ctr[0], ctr[1] + 1, rx * k, ry * k, A.fin));
    for (let i = 0; i < 4; i++) { const a = i * Math.PI / 2 + 0.4; o.push(h.ligne(ctr[0], ctr[1] + 1, ctr[0] + rx * 0.92 * Math.cos(a), ctr[1] + 1 + ry * 0.92 * Math.sin(a), A.fin)); }
    o.push(h.ellipse(ctr[0], ctr[1] + 1, rx * 0.12, ry * 0.12, W(A.detail)));
    // l'air qui sort par le haut
    for (const dx of [-0.42, 0, 0.42]) o.push(h.fleche(`M${f1(ctr[0] + dx * rx)} ${f1(ctr[1] - 6)} L${f1(ctr[0] + dx * rx)} ${f1(ctr[1] - 48)}`, A.arete));
    return { svg: o.join('\n'), P, L, F0, F1, yC, a0, a1, ctr, rx };
  };

  // ─── Le filtre seul : de côté, le filtre, le ventilateur, le carton ; puis le carton de face ─────
  const seul = z => {
    const o = [];
    const yH = 62, yB = 210, H = yB - yH;
    const xF = 40, eF = 9, xV = xF + eF + 2, eV = 36, xC = xV + eV + 2, eC = 3;
    // le filtre, de côté : son cadre, ses plis ; la flèche imprimée sur le cadre, vers le ventilateur
    o.push(h.rect(xF, yH, eF, H, W(A.arete)));
    for (let y = yH + 6; y < yB - 4; y += 5) o.push(h.path(`M${xF + 1.5} ${y} L${xF + eF - 1.5} ${y + 2.5} L${xF + 1.5} ${y + 5}`, A.fin));
    o.push(h.rect(xF - 4, yH - 30, eF + 8, 18, W(A.detail)));
    o.push(h.fleche(`M${xF - 1} ${yH - 21} L${xF + eF + 2} ${yH - 21}`, A.arete));
    o.push(h.ligne(xF + eF / 2, yH - 12, xF + eF / 2, yH, A.fin));
    // le ventilateur, de côté : le boîtier, l'hélice vue par la tranche, le moteur
    o.push(h.rect(xV, yH - 2, eV, H + 4, W(A.contour)));
    o.push(h.rect(xV + eV + 2 - 6, yB + 2, 8, 14, W(A.arete)));
    o.push(h.rect(xV - 8, yB + 2, 8, 14, W(A.arete)));
    const yM = (yH + yB) / 2;
    o.push(h.rect(xV + eV / 2 - 7, yM - 12, 14, 24, W(A.arete)));
    o.push(h.path(`M${xV + eV / 2 - 2} ${yM - 12} L${xV + eV / 2 - 6} ${yH + 10} M${xV + eV / 2 + 2} ${yM + 12} L${xV + eV / 2 + 6} ${yB - 10}`, A.arete));
    for (const x of [xV + 4, xV + eV - 4]) o.push(h.ligne(x, yH + 2, x, yB - 2, A.cache));
    // le carton, sur la face qui souffle
    o.push(h.rect(xC, yH - 2, eC, H + 4, A.hachure('bois', 'arete')));
    // l'air : il entre par le filtre, sort par le rond du carton
    for (const y of [yM - 40, yM, yM + 40]) o.push(h.fleche(`M${xF - 30} ${y} L${xF - 6} ${y}`, A.arete));
    for (const y of [yM - 26, yM + 26]) o.push(h.fleche(`M${xC + eC + 6} ${y} L${xC + eC + 32} ${y}`, A.arete));
    // le carton de face : un carré, le rond découpé au diamètre des pales ; les coins fermés
    const xq = xC + 76, cq = 120, yq = yM - cq / 2, rq = cq * 0.37;
    o.push(h.rect(xq, yq, cq, cq, A.hachure('bois', 'arete')));
    o.push(h.cercle(xq + cq / 2, yq + cq / 2, rq, A.blanc), h.cercle(xq + cq / 2, yq + cq / 2, rq, A.loin), h.cercle(xq + cq / 2, yq + cq / 2, rq, A.arete));
    for (let i = 0; i < 4; i++) { const a = i * Math.PI / 2 + 0.4; o.push(h.path(`M${f1(xq + cq / 2)} ${f1(yq + cq / 2)} Q${f1(xq + cq / 2 + rq * 0.7 * Math.cos(a - 0.5))} ${f1(yq + cq / 2 + rq * 0.7 * Math.sin(a - 0.5))} ${f1(xq + cq / 2 + rq * 0.9 * Math.cos(a))} ${f1(yq + cq / 2 + rq * 0.9 * Math.sin(a))}`, A.detail)); }
    o.push(h.cercle(xq + cq / 2, yq + cq / 2, 6, W(A.detail)));
    return { svg: o.join('\n'), g: { xF, eF, xV, eV, xC, eC, yH, yB, yM, xq, yq, cq, rq } };
  };

  // ─── La pièce fermée, en coupe : la fenêtre au polythène, la porte et sa couverture ─────────────
  const piece = z => {
    const o = [];
    const yP = 12, yS = z.h - 18, xG = 30, xD = z.l - 30, ep = 14;
    // les murs, coupés ; le plancher
    o.push(h.rect(xG - ep, yP, ep, yS - yP, A.hachure('bois', 'arete')));
    o.push(h.rect(xD, yP, ep, yS - yP, A.hachure('bois', 'arete')));
    o.push(h.rect(xG - ep, yS, xD - xG + 2 * ep, 10, A.hachure('bois', 'arete')));
    o.push(h.rect(xG - ep, yP - 6, xD - xG + 2 * ep, 6, A.hachure('bois', 'arete')));
    // le mur du fond (loin), la fenêtre dedans et le polythène agrafé sur son cadre
    const fx = 80, fy = 46, fl = 150, fh = 104;
    o.push(h.rect(fx - 8, fy - 8, fl + 16, fh + 16, W(A.arete)));
    o.push(h.rect(fx, fy, fl, fh, W(A.detail)));
    o.push(h.ligne(fx + fl / 2, fy, fx + fl / 2, fy + fh, A.detail));
    o.push(h.path(`M${fx - 6} ${fy - 6} L${fx + fl + 6} ${fy - 6} L${fx + fl + 6} ${fy + fh + 6} L${fx - 6} ${fy + fh + 6} Z`, A.arete.replace('stroke-width="1.4"', 'stroke-width="0.7"')));
    for (let x = fx; x <= fx + fl; x += 25) o.push(h.ligne(x, fy - 9, x, fy - 3, A.arete), h.ligne(x, fy + fh + 3, x, fy + fh + 9, A.arete));
    for (let y = fy + 12; y <= fy + fh - 6; y += 26) o.push(h.ligne(fx - 9, y, fx - 3, y, A.arete), h.ligne(fx + fl + 3, y, fx + fl + 9, y, A.arete));
    for (const [a, b] of [[[fx + 20, fy + 30], [fx + 50, fy + 6]], [[fx + 90, fy + 90], [fx + 130, fy + 60]]]) o.push(h.path(`M${a[0]} ${a[1]} Q${(a[0] + b[0]) / 2 + 3} ${(a[1] + b[1]) / 2 + 3} ${b[0]} ${b[1]}`, A.fin));
    // la porte, dans le mur du fond à droite, et la couverture roulée au bas
    const px = 410, pl = 92, py = 34;
    o.push(h.rect(px - 6, py - 6, pl + 12, yS - py + 6, W(A.arete)));
    o.push(h.rect(px, py, pl, yS - py, W(A.detail)));
    o.push(h.cercle(px + pl - 12, (py + yS) / 2 + 10, 4, W(A.detail)));
    const yr = yS - 9;
    o.push(h.path(`M${px - 12} ${yr - 9} L${px + pl + 12} ${yr - 9} A9 9 0 0 1 ${px + pl + 12} ${yr + 9} L${px - 12} ${yr + 9} A9 9 0 0 1 ${px - 12} ${yr - 9} Z`, W(A.arete)));
    o.push(h.ellipse(px + pl + 12, yr, 4, 9, W(A.detail)), h.path(`M${px + pl + 12} ${yr - 4} A3 4 0 1 1 ${px + pl + 10} ${yr + 2}`, A.fin));
    // le cube, à l'échelle de la porte, posé au plancher au milieu de la pièce
    const L = 51, kk = 0.36, xc = 300;
    const sc = p => iso(xc, yS - L * kk * s)([p[0] * kk, p[1] * kk, p[2] * kk]);
    const cub = [[[L, 0, 0], [L, L, 0], [L, L, L], [L, 0, L]], [[L, L, 0], [0, L, 0], [0, L, L], [L, L, L]]];
    o.push(poly(cub[0].map(sc), A.ombre), poly(cub[0].map(sc), A.arete), poly(cub[1].map(sc), W(A.arete)));
    for (let u = 5; u < L - 2; u += 5) o.push(h.ligne(...sc([u, L, 3]), ...sc([u, L, L - 3]), A.fin));
    const fan = [[[L + 1, -1, L], [L + 1, L + 1, L], [L + 1, L + 1, L + 10], [L + 1, -1, L + 10]], [[L + 1, L + 1, L], [-1, L + 1, L], [-1, L + 1, L + 10], [L + 1, L + 1, L + 10]], [[-1, -1, L + 10], [L + 1, -1, L + 10], [L + 1, L + 1, L + 10], [-1, L + 1, L + 10]]];
    o.push(poly(fan[0].map(sc), A.ombre), poly(fan[0].map(sc), A.arete), poly(fan[1].map(sc), W(A.arete)), poly(fan[2].map(sc), W(A.arete)));
    const top = sc([L / 2, L / 2, L + 10]);
    o.push(h.fleche(`M${f1(top[0])} ${f1(top[1] - 22)} L${f1(top[0])} ${f1(top[1] - 50)}`, A.arete));
    return { svg: o.join('\n'), P: { poly: [fx + fl + 6, fy + 40], couv: [px + 20, yr - 9], cube: [0, 0] } };
  };

  return {
    ref: '11-04',
    titre: 'La pièce d’air propre',
    desc: 'En haut à gauche, en perspective : quatre filtres de fournaise montés en cube, les plis à la verticale, les arêtes fermées au ruban gommé, un fond de carton ; un ventilateur de boîte posé sur le cube ; sur lui, un carton percé d’un rond au diamètre des pales. L’air entre par les côtés du cube et sort par le haut. En haut à droite, le filtre seul, de côté : le filtre contre l’arrière du ventilateur, sa flèche imprimée pointe vers le ventilateur (cercle rouge) ; sur la face qui souffle, le carton ; à côté, ce carton vu de face, le rond découpé, les coins fermés. En bas, la pièce en coupe : la fenêtre couverte d’un polythène agrafé sur son cadre, la porte et une couverture roulée au bas, le cube au milieu.',
    format: 'pleine',
    disposition: [['cube', 'seul'], ['piece']],
    hauteurs: [1.5, 1],
    largeurs: [[1, 1.05], [1]],
    vues: {
      cube: {
        titre: 'Le cube de quatre filtres',
        dessin: z => cube(z).svg,
        renvois: z => {
          const c = cube(z);
          const { P, L, F0, F1, yC, a0, a1, ctr, rx } = c;
          return [
            { n: 1, rond: [18, 240], cible: P([18, L, 30]), texte: 'quatre filtres, flèches vers l’intérieur' },
            { n: 2, rond: [z.l / 2 + 4, z.h - 16], cible: P([L - 1.1, L - 1.1, 8]), texte: 'arêtes fermées au ruban' },
            { n: 3, rond: [z.l - 22, z.h - 30], cible: P([L + 0.8, 14, -0.6]), texte: 'fond de carton' },
            { n: 4, rond: [z.l - 18, 150], cible: P([a1, L * 0.3, (F0 + F1) / 2]), texte: 'ventilateur posé dessus, qui souffle en haut' },
            { n: 5, rond: [22, 72], cible: P([a0 + 4, L * 0.55, yC]), texte: 'carton percé au diamètre des pales' },
          ];
        },
      },
      seul: {
        titre: 'Un filtre seul, et son carton',
        dessin: z => { const r = seul(z); return r.svg + '\n' + h.controle(r.g.xF + r.g.eF / 2, r.g.yH - 21, 15); },
        renvois: z => {
          const { g } = seul(z);
          return [
            { n: 6, rond: [16, g.yB + 40], cible: [g.xF + 2, g.yB - 20], texte: 'filtre tenu au ruban, flèche vers le ventilateur' },
            { n: 7, rond: [g.xC + 34, g.yB + 40], cible: [g.xC + 2, g.yB - 10], texte: 'carton sur la face qui souffle' },
            { n: 8, rond: [g.xq + g.cq - 6, g.yq - 30], cible: [g.xq + g.cq - 12, g.yq + 12], texte: 'les coins fermés' },
          ];
        },
      },
      piece: {
        titre: 'La plus petite pièce, fermée',
        dessin: z => piece(z).svg,
        renvois: z => {
          const { P } = piece(z);
          return [
            { n: 9, rond: [270, 40], cible: P.poly, texte: 'polythène agrafé sur le cadre' },
            { n: 10, rond: [540, 90], cible: P.couv, texte: 'couverture roulée au bas de la porte' },
          ];
        },
      },
    },
  };
};
