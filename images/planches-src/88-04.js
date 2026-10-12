// Planche 88-04 — le pain à la vapeur (chapitre 88, « Le pain à la vapeur, sur le poêle qui
// chauffe déjà », étapes 1 à 4).
// Une coupe du montage sur la zone chaude du poêle : chaudron de fonte couvert, eau bouillante
// à mi-hauteur de la boîte, boîte de conserve graissée remplie aux deux tiers, couvercle
// (rond de tôle) ficelé, trépied de trois écrous. Un détail de trois quarts : comment
// la ficelle tient le couvercle. Deux plans vus de dessus : les trois écrous, ou le rond de
// broche, sous la place de la boîte.
// Aucune cote : le chapitre ne donne aucune dimension (boîte, chaudron, trépied).

module.exports = (h) => {
  const f = v => Math.round(v * 10) / 10;
  const blancArete = h.a.arete.replace('fill="none"', 'fill="#ffffff"');
  const blancDetail = h.a.detail.replace('fill="none"', 'fill="#ffffff"');
  const blancContour = h.a.contour.replace('fill="none"', 'fill="#ffffff"');
  const ficelle = 'fill="none" stroke="#1A1A1A" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"';
  const halo = 'fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"';

  // ─── La coupe ────────────────────────────────────────────────────────────────────
  // Tout se règle sur le diamètre de la boîte (dB). Proportions : boîte 1,35 fois plus haute
  // que large ; chaudron à peu près deux fois plus large que la boîte, assez haut pour que le
  // couvercle ferme par-dessus la boîte ficelée.
  const gC = z => {
    const yP = z.h - 74;                               // dessus de la plaque du poêle
    const t = 9;                                       // paroi de fonte
    const dB = Math.floor(Math.min((yP - 62) / 2.04, (z.l - 112) / 1.85));
    const hB = Math.round(dB * 1.35), n = Math.round(dB * 0.1);
    const Wi = Math.round(dB * 1.85);
    const cx = Math.round(14 + 14 + t + Wi / 2);
    const yBi = yP - t;                                // fond intérieur du chaudron
    const yCb = yBi - n, yCt = yCb - hB;               // bas et haut de la boîte
    const yD = yCb - Math.round(hB * 2 / 3);           // dessus de la pâte : deux tiers
    const yW = yCb - Math.round(hB / 2);               // eau : mi-hauteur de la boîte
    const Hi = Math.round(dB * 1.86);
    const yR = yBi - Hi;                               // rebord du chaudron
    const xl = cx - Wi / 2, xr = cx + Wi / 2;
    const bL = cx - dB / 2, bR = cx + dB / 2;
    const deb = Math.round(dB * 0.1);                  // débord du rond de tôle
    const dome = Math.max(7, Math.round(dB * 0.07));
    const yS = yCt - 2;                                // dessous du rond de tôle, posé sur le rebord
    const yBande = yCt + 9;                            // le tour de ficelle, sous le rebord
    return { yP, t, dB, hB, n, Wi, cx, yBi, yCb, yCt, yD, yW, yR, xl, xr, bL, bR, deb, dome, yS, yBande };
  };

  // Le rond de tôle, en coupe : une plaque mince posée à plat sur le rebord roulé.
  const soucoupeCoupe = g => h.ligne(g.bL - g.deb, g.yS - 1.6, g.bR + g.deb, g.yS - 1.6, 'fill="none" stroke="#1A1A1A" stroke-width="3.2" stroke-linecap="butt"');

  // La ficelle vue en coupe : un brin par-dessus le rond de tôle, qui redescend de chaque côté
  // jusqu'au tour serré sous le rebord (le tour coupé = deux points noirs).
  const ficelleCoupe = g => {
    const a = g.bL - g.deb, b = g.bR + g.deb, y = g.yS - 4.4;
    const xa = g.bL - 3.2, xb = g.bR + 3.2;
    const brin = `M ${f(xa)} ${f(g.yBande)} L ${f(a - 1.6)} ${f(g.yS)} L ${f(a - 0.6)} ${f(y)} L ${f(b + 0.6)} ${f(y)} L ${f(b + 1.6)} ${f(g.yS)} L ${f(xb)} ${f(g.yBande)}`;
    return [h.path(brin, ficelle), h.cercle(xa, g.yBande, 2.6, h.a.plein), h.cercle(xb, g.yBande, 2.6, h.a.plein)].join('\n');
  };

  // Un écrou vu de côté : trois faces du six-pans, chanfreiné en haut et en bas.
  const ecrouCote = (cx, yb, l, ht) => {
    const c = 2;
    const pts = [[cx - l / 2, yb - c], [cx - l / 2, yb - ht + c], [cx - l / 2 + c, yb - ht], [cx + l / 2 - c, yb - ht], [cx + l / 2, yb - ht + c], [cx + l / 2, yb - c], [cx + l / 2 - c, yb], [cx - l / 2 + c, yb]];
    return [h.chemin(pts, blancArete, true), h.ligne(cx - l / 6, yb - ht, cx - l / 6, yb, h.a.detail), h.ligne(cx + l / 6, yb - ht, cx + l / 6, yb, h.a.detail)].join('\n');
  };

  // La mie crue : quelques bulles de levée dans la pâte.
  const mie = (x0, x1, y0, y1) => {
    const out = [];
    const pts = [[0.18, 0.2, 5, 3], [0.46, 0.14, 4, 2.4], [0.76, 0.24, 5.5, 3], [0.3, 0.42, 3.5, 2.2], [0.62, 0.46, 4.5, 2.6], [0.14, 0.64, 4, 2.4], [0.44, 0.7, 5, 2.8], [0.8, 0.66, 3.5, 2], [0.28, 0.88, 3, 1.8], [0.62, 0.88, 4, 2.2], [0.88, 0.44, 2.6, 1.6], [0.06, 0.42, 2.4, 1.6]];
    pts.forEach(([u, v, rx, ry]) => out.push(h.ellipse(x0 + u * (x1 - x0), y0 + v * (y1 - y0), rx, ry, h.a.fin)));
    return out.join('\n');
  };

  // Le feu dans le foyer, repris de la 88-03 : trois bûches en pyramide, vues par le bout,
  // et des langues de flamme (trait intérieur) qui montent des bûches vers la plaque.
  const buche = (cx, cy, r) => [
    h.cercle(cx, cy, r, blancArete),
    h.cercle(cx, cy, r - 2, h.a.fin),
    h.cercle(cx + r * 0.08, cy - r * 0.05, r * 0.42, h.a.fin),
    h.path(`M ${f(cx + r * 0.12)} ${f(cy - r * 0.02)} Q ${f(cx + r * 0.5)} ${f(cy + r * 0.1)} ${f(cx + r * 0.7)} ${f(cy + r * 0.5)}`, h.a.fin),
  ].join('\n');
  const flamme = (cx, yb, l, ht, p = 0) => {
    const langue = (l2, h2, p2) => `M ${f(cx - l2 / 2)} ${f(yb)} C ${f(cx - l2 * 0.62)} ${f(yb - h2 * 0.5)} ${f(cx - l2 * 0.08 + p2)} ${f(yb - h2 * 0.62)} ${f(cx + p2)} ${f(yb - h2)} C ${f(cx + l2 * 0.2 + p2 * 0.6)} ${f(yb - h2 * 0.6)} ${f(cx + l2 * 0.62)} ${f(yb - h2 * 0.45)} ${f(cx + l2 / 2)} ${f(yb)} Z`;
    return [h.path(langue(l, ht, p), blancArete), h.path(langue(l * 0.45, ht * 0.5, p * 0.5), h.a.fin)].join('\n');
  };
  const feu = (cx, ySole, hf) => {
    const r = 9;
    return [
      flamme(cx - 20, ySole - 12, 18, hf * 0.66, -3),
      flamme(cx + 21, ySole - 12, 18, hf * 0.62, 3),
      flamme(cx - 4, ySole - 28, 22, hf * 0.5, 2),
      flamme(cx + 9, ySole - 22, 14, hf * 0.52, 4),
      buche(cx - 16, ySole - r, r), buche(cx + 16, ySole - r, r), buche(cx, ySole - r - 15, r),
    ].join('\n');
  };
  const chaleur = d => [h.path(d, halo), h.fleche(d, h.a.cache)].join('\n');

  // Un filet de vapeur : tireté, qui monte et se recourbe.
  const vapeur = d => [h.path(d, halo), h.fleche(d, h.a.cache)].join('\n');

  // ─── Le détail de trois quarts ─────────────────────────────────────────────────────
  const gF = z => {
    const rx = Math.floor(Math.min(z.l * 0.33, (z.h - 60) / 3.2));
    const ry = Math.round(rx * 0.3), hB = Math.round(rx * 2 * 1.35);
    const cx = Math.round(z.l * 0.43);
    const d = 4;                                     // épaisseur du rond de tôle
    const yT = Math.round((z.h - (hB + 2.2 * ry + d)) / 2 + 1.2 * ry + d);
    const rxs = Math.round(rx * 1.2), rys = Math.round(ry * 1.2), yS = yT - 2;
    const yb = yT + Math.round(ry * 0.9) + 6;          // le tour de ficelle : ellipse centrée ici
    return { rx, ry, hB, cx, d, yT, rxs, rys, yS, yb };
  };
  const pE = (cx, cy, rx, ry, deg) => [cx + rx * Math.cos(deg * Math.PI / 180), cy + ry * Math.sin(deg * Math.PI / 180)];

  // ─── Les plans vus de dessus ───────────────────────────────────────────────────────
  const gP = z => {
    const R = Math.floor(Math.min((z.h - 16) / 2 - 10, z.l / 2 - 20));   // intérieur du chaudron
    const rB = Math.round(R / 1.85);                                     // la boîte
    return { R, rB, cx: Math.round(z.l / 2), cy: Math.round(z.h / 2), t: Math.max(9, Math.round(R * 0.09)) };
  };
  // Le chaudron vu de dessus : la paroi de fonte en anneau, hachurée comme dans la coupe.
  const chaudronPlan = g => {
    const cercleD = r => `M ${f(g.cx - r)} ${f(g.cy)} A ${r} ${r} 0 1 0 ${f(g.cx + r)} ${f(g.cy)} A ${r} ${r} 0 1 0 ${f(g.cx - r)} ${f(g.cy)} Z`;
    const d = cercleD(g.R + g.t) + ' ' + cercleD(g.R);
    return [h.path(d, h.a.hachure('metal', 'contour').replace('stroke-linejoin', 'fill-rule="evenodd" stroke-linejoin'))].join('\n');
  };
  const hexa = (cx, cy, r, rot = 0) => {
    const pts = [];
    for (let i = 0; i < 6; i++) { const a = (rot + 30 + i * 60) * Math.PI / 180; pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); }
    return [h.chemin(pts, blancArete, true), h.cercle(cx, cy, r * 0.5, h.a.detail)].join('\n');
  };

  return {
    ref: '88-04',
    titre: 'Le pain à la vapeur',
    desc: 'En coupe, sur la zone chaude du poêle, le feu dans le foyer dessous : un chaudron de fonte, couvercle fermé, où l’eau bout à gros bouillons jusqu’à mi-hauteur d’une boîte de conserve. La boîte, graissée dedans, est remplie aux deux tiers de pâte ; le tiers du haut reste vide pour la levée. Elle est fermée d’un rond de tôle graissé (ou d’une soucoupe), tenu par une ficelle, et posée sur un trépied de trois écrous pour que l’eau passe dessous ; la vapeur monte autour de la boîte jusque sous le couvercle du chaudron. En détail de trois quarts : un tour de ficelle serré et noué sous le rebord de la boîte, et deux brins passés en croix par-dessus le rond de tôle, noués au tour de chaque côté. Vus de dessus, dans le fond du chaudron : les trois écrous en triangle, ou un rond de broche aux bouts tordus ensemble, sous la place de la boîte.',
    format: 'pleine',
    disposition: [['coupe', 'ficelle'], ['ecrous', 'broche']],
    hauteurs: [3, 1.25],
    largeurs: [[2, 1], [1, 1]],
    vues: {
      coupe: {
        titre: 'En coupe, sur la zone chaude du poêle',
        dessin: z => {
          const g = gC(z), out = [];
          // le poêle : la plaque du dessus et le foyer
          const px0 = 6, px1 = z.l - 6, ep = 9, yFond = z.h - 4;
          out.push(feu(g.cx, yFond, (yFond - g.yP - ep) * 0.88));
          // la chaleur monte du feu dans la plaque, sous le chaudron
          [-0.3, 0.3].forEach(u => out.push(chaleur(`M ${f(g.cx + u * g.Wi)} ${f(yFond - 30)} L ${f(g.cx + u * g.Wi)} ${f(g.yP + ep + 3)}`)));
          out.push(h.rect(px0, g.yP, px1 - px0, ep, h.a.blanc), h.rect(px0, g.yP, px1 - px0, ep, h.a.hachure('metal', 'arete')));
          out.push(h.rect(px0 + 4, g.yP + ep, 8, yFond - g.yP - ep, h.a.hachure('metal', 'arete')));
          out.push(h.rect(px1 - 12, g.yP + ep, 8, yFond - g.yP - ep, h.a.hachure('metal', 'arete')));
          out.push(h.ligne(px0 + 12, yFond, px1 - 12, yFond, h.a.arete));

          // l'eau, du fond du chaudron à mi-hauteur de la boîte (la boîte et les écrous la masquent)
          out.push(h.rect(g.xl, g.yW, g.Wi, g.yBi - g.yW, h.a.hachure('eau', 'aucun')));
          // les bouillons : des bulles qui montent du fond
          [[0.06, 0.82, 3], [0.1, 0.5, 2.4], [0.05, 0.25, 3.2], [0.14, 0.14, 2], [0.94, 0.78, 3], [0.9, 0.44, 2.6], [0.95, 0.18, 3.2], [0.86, 0.1, 2],
            [0.3, 0.96, 1.8], [0.5, 0.96, 2], [0.7, 0.96, 1.8]].forEach(([u, v, r]) =>
            out.push(h.cercle(g.xl + u * g.Wi, g.yW + v * (g.yBi - g.yW), r, blancDetail)));
          // la surface qui bouillonne
          out.push(h.ligne(g.xl, g.yW, g.bL - 2, g.yW, h.a.arete), h.ligne(g.bR + 2, g.yW, g.xr, g.yW, h.a.arete));

          // le chaudron de fonte, en coupe : une paroi épaisse en U, les oreilles
          const r = 14, xo0 = g.xl - g.t, xo1 = g.xr + g.t;
          const u = `M ${f(xo0)} ${f(g.yR)} L ${f(xo0)} ${f(g.yP - r)} Q ${f(xo0)} ${f(g.yP)} ${f(xo0 + r)} ${f(g.yP)} L ${f(xo1 - r)} ${f(g.yP)} Q ${f(xo1)} ${f(g.yP)} ${f(xo1)} ${f(g.yP - r)} L ${f(xo1)} ${f(g.yR)} L ${f(g.xr)} ${f(g.yR)} L ${f(g.xr)} ${f(g.yBi - r * 0.6)} Q ${f(g.xr)} ${f(g.yBi)} ${f(g.xr - r * 0.6)} ${f(g.yBi)} L ${f(g.xl + r * 0.6)} ${f(g.yBi)} Q ${f(g.xl)} ${f(g.yBi)} ${f(g.xl)} ${f(g.yBi - r * 0.6)} L ${f(g.xl)} ${f(g.yR)} Z`;
          out.push(h.path(u, h.a.blanc), h.path(u, h.a.hachure('metal', 'contour')));
          [[xo0, -1], [xo1, 1]].forEach(([x, s]) => {
            const o = [[x, g.yR + 10], [x + s * 12, g.yR + 12], [x + s * 12, g.yR + 24], [x, g.yR + 26]];
            out.push(h.chemin(o, h.a.blanc, true), h.chemin(o, h.a.hachure('metal', 'arete'), true));
          });
          // le couvercle de fonte, posé sur le rebord, bombé, avec sa poignée
          const lx0 = xo0 - 3, lx1 = xo1 + 3, bomb = Math.round(g.dB * 0.09), el = 7;
          const couv = `M ${f(lx0)} ${f(g.yR)} Q ${f(g.cx)} ${f(g.yR - bomb * 2)} ${f(lx1)} ${f(g.yR)} L ${f(lx1)} ${f(g.yR - el)} Q ${f(g.cx)} ${f(g.yR - el - bomb * 2)} ${f(lx0)} ${f(g.yR - el)} Z`;
          out.push(h.path(couv, h.a.blanc), h.path(couv, h.a.hachure('metal', 'contour')));
          const yPg = g.yR - el - bomb + 1;
          const poig = `M ${f(g.cx - 20)} ${f(yPg)} L ${f(g.cx - 14)} ${f(yPg - 13)} L ${f(g.cx + 14)} ${f(yPg - 13)} L ${f(g.cx + 20)} ${f(yPg)} Z`;
          out.push(h.path(poig, h.a.blanc), h.path(poig, h.a.hachure('metal', 'arete')));

          // le trépied : deux des trois écrous, coupés par le plan de coupe
          const le = Math.round(g.dB * 0.2);
          [-0.3, 0.3].forEach(k => out.push(ecrouCote(g.cx + k * g.dB, g.yBi, le, g.n)));

          // la boîte : l'intérieur (air au-dessus, pâte aux deux tiers), la tôle, le rebord roulé
          out.push(h.rect(g.bL, g.yCt, g.dB, g.hB, h.a.blanc));
          const bosse = Math.max(4, Math.round(g.dB * 0.05));
          const pate = `M ${f(g.bL)} ${f(g.yCb)} L ${f(g.bL)} ${f(g.yD + bosse)} Q ${f(g.cx)} ${f(g.yD - bosse)} ${f(g.bR)} ${f(g.yD + bosse)} L ${f(g.bR)} ${f(g.yCb)} Z`;
          out.push(h.path(pate, h.a.detail));
          out.push(mie(g.bL + 4, g.bR - 4, g.yD + bosse + 6, g.yCb - 6));
          out.push(h.chemin([[g.bL, g.yCt + 2], [g.bL, g.yCb], [g.bR, g.yCb], [g.bR, g.yCt + 2]], h.a.contour));
          out.push(h.cercle(g.bL - 1.8, g.yCt, 2.6, h.a.arete), h.cercle(g.bR + 1.8, g.yCt, 2.6, h.a.arete));
          // le couvercle de la boîte et sa ficelle
          out.push(soucoupeCoupe(g), ficelleCoupe(g));

          // la vapeur : elle monte de l'eau autour de la boîte et remplit le chaudron fermé
          const gap = (g.bL - g.xl);
          [[g.xl + gap * 0.42, -1], [g.xr - gap * 0.42, 1]].forEach(([x, s]) => {
            const y0 = g.yW - 8, y1 = g.yR + 18;
            out.push(vapeur(`M ${f(x)} ${f(y0)} C ${f(x + s * 8)} ${f(y0 - (y0 - y1) * 0.35)} ${f(x - s * 8)} ${f(y0 - (y0 - y1) * 0.7)} ${f(x)} ${f(y1)} Q ${f(x - s * 4)} ${f(y1 - 12)} ${f(x - s * gap * 0.75)} ${f(y1 - 10)}`));
          });
          return out.join('\n');
        },
        renvois: z => {
          const g = gC(z), xr = z.l - 16;
          const xo1 = g.xr + g.t;
          return [
            { n: 1, rond: [xr, g.yR - 44], cible: [xo1 - 16, g.yR - 8], texte: 'couvercle du chaudron, fermé' },
            { n: 2, rond: [xr, g.yS - 22], cible: [g.bR + g.deb * 0.6, g.yS - 2], texte: 'rond de tôle graissé, ficelé' },
            { n: 3, rond: [xr, g.yCt + (g.yD - g.yCt) * 0.55], cible: [g.bR, g.yCt + (g.yD - g.yCt) * 0.55], texte: 'boîte graissée, pas galvanisée' },
            { n: 4, rond: [xr, g.yD + 34], cible: [g.cx + g.dB * 0.28, g.yD + 20], texte: 'pâte aux deux tiers, pas plus' },
            { n: 5, rond: [xr, g.yW + (g.yBi - g.yW) * 0.5], cible: [g.xr - 8, g.yW + (g.yBi - g.yW) * 0.62], texte: 'eau bouillante, à mi-hauteur' },
            { n: 6, rond: [xr, g.yP - 14], cible: [g.cx + 0.3 * g.dB + 4, g.yBi - g.n / 2], texte: 'trépied : trois écrous' },
          ];
        },
      },

      ficelle: {
        titre: 'Le couvercle ficelé',
        dessin: z => {
          const g = gF(z), out = [];
          const yBas = g.yT + g.hB;
          // le corps de la boîte, avec ses nervures
          const corps = `M ${f(g.cx - g.rx)} ${f(g.yT)} L ${f(g.cx - g.rx)} ${f(yBas)} A ${g.rx} ${g.ry} 0 0 0 ${f(g.cx + g.rx)} ${f(yBas)} L ${f(g.cx + g.rx)} ${f(g.yT)}`;
          out.push(h.path(corps + ' Z', h.a.blanc), h.path(corps, h.a.contour));
          [0.42, 0.52, 0.62, 0.72].forEach(k => {
            const y = g.yT + g.hB * k;
            out.push(h.path(`M ${f(g.cx - g.rx)} ${f(y)} A ${g.rx} ${g.ry} 0 0 0 ${f(g.cx + g.rx)} ${f(y)}`, h.a.fin));
          });
          // le rebord roulé, juste sous la soucoupe
          out.push(h.path(`M ${f(g.cx - g.rx - 1.5)} ${f(g.yT + 3)} A ${g.rx + 1.5} ${g.ry} 0 0 0 ${f(g.cx + g.rx + 1.5)} ${f(g.yT + 3)}`, h.a.arete));
          // le tour de ficelle serré sous le rebord, et son nœud devant
          out.push(h.path(`M ${f(g.cx - g.rx)} ${f(g.yb)} A ${g.rx} ${g.ry} 0 0 0 ${f(g.cx + g.rx)} ${f(g.yb)}`, ficelle));
          const [kx, ky] = [g.cx, g.yb + g.ry];
          out.push(h.ellipse(kx, ky, 4.2, 3.2, h.a.plein));
          out.push(h.path(`M ${f(kx - 1)} ${f(ky + 2)} Q ${f(kx - 5)} ${f(ky + 12)} ${f(kx - 3)} ${f(ky + 22)}`, ficelle));
          out.push(h.path(`M ${f(kx + 1)} ${f(ky + 2)} Q ${f(kx + 6)} ${f(ky + 11)} ${f(kx + 5)} ${f(ky + 20)}`, ficelle));

          // le rond de tôle, posé à plat sur le rebord : le dessus et la tranche
          const lS = g.cx - g.rxs, rS = g.cx + g.rxs, yD = g.yS - g.d;
          out.push(h.path(`M ${f(lS)} ${f(yD)} L ${f(lS)} ${f(g.yS)} A ${g.rxs} ${g.rys} 0 0 0 ${f(rS)} ${f(g.yS)} L ${f(rS)} ${f(yD)}`, blancContour));
          out.push(h.ellipse(g.cx, yD, g.rxs, g.rys, blancContour));

          // les deux brins en croix par-dessus, chacun redescendu et noué au tour des deux côtés
          [135, 45].forEach((deg, i) => {
            const P = pE(g.cx, yD, g.rxs, g.rys, deg), Pb = pE(g.cx, yD, g.rxs, g.rys, deg + 180);
            const dessus = `M ${f(Pb[0])} ${f(Pb[1])} L ${f(P[0])} ${f(P[1])}`;
            if (i) out.push(h.path(dessus, halo));
            out.push(h.path(dessus, ficelle));
            const Q = pE(g.cx, g.yb, g.rx, g.ry, deg);
            out.push(h.path(`M ${f(P[0])} ${f(P[1])} L ${f(P[0])} ${f(P[1] + g.d)} L ${f(Q[0])} ${f(Q[1])}`, ficelle));
            out.push(h.cercle(Q[0], Q[1], 3, h.a.plein));
          });
          return out.join('\n');
        },
        renvois: z => {
          const g = gF(z), yD = g.yS - g.d, P = pE(g.cx, yD, g.rxs, g.rys, 45), Q = pE(g.cx, g.yb, g.rx, g.ry, 45);
          return [
            { n: 7, rond: [z.l - 14, yD - g.rys - 30], cible: [g.cx + g.rxs * 0.36, yD - g.rys * 0.36], texte: 'ficelle en croix par-dessus' },
            { n: 8, rond: [z.l - 14, g.yb + g.ry + 34], cible: [Q[0] + 10, Q[1] + 3], texte: 'un tour noué sous le rebord' },
          ];
        },
      },

      ecrous: {
        titre: 'Trois écrous, vus de dessus',
        dessin: z => {
          const g = gP(z), out = [chaudronPlan(g)];
          const re = Math.round(g.rB * 0.24);
          [-90, 30, 150].forEach(a => {
            const [x, y] = pE(g.cx, g.cy, g.rB * 0.6, g.rB * 0.6, a);
            out.push(hexa(x, y, re, a));
          });
          out.push(h.cercle(g.cx, g.cy, g.rB, h.a.cache));
          return out.join('\n');
        },
      },

      broche: {
        titre: 'Ou un rond de broche',
        dessin: z => {
          const g = gP(z), out = [chaudronPlan(g)];
          const rr = Math.round(g.rB * 0.66);
          // le rond, ouvert là où les deux bouts se croisent et se tordent ensemble
          const a0 = 10 * Math.PI / 180;
          const [x0, y0] = [g.cx + rr * Math.cos(a0), g.cy + rr * Math.sin(a0)];
          const [x1, y1] = [g.cx + rr * Math.cos(-a0), g.cy + rr * Math.sin(-a0)];
          out.push(h.path(`M ${f(x0)} ${f(y0)} A ${rr} ${rr} 0 1 1 ${f(x1)} ${f(y1)}`, 'fill="none" stroke="#1A1A1A" stroke-width="3.4" stroke-linecap="round"'));
          // la torsade : les deux bouts enroulés l'un sur l'autre, vers l'extérieur
          const xt0 = g.cx + rr, lt = Math.round(g.rB * 0.5), out2 = [];
          out2.push(`M ${f(x0)} ${f(y0)} Q ${f(xt0)} ${f(y0)} ${f(xt0 + 3)} ${f(g.cy)}`);
          out2.push(`M ${f(x1)} ${f(y1)} Q ${f(xt0)} ${f(y1)} ${f(xt0 + 3)} ${f(g.cy)}`);
          out.push(h.path(out2.join(' '), 'fill="none" stroke="#1A1A1A" stroke-width="3.4" stroke-linecap="round"'));
          let d = `M ${f(xt0 + 3)} ${f(g.cy)}`;
          const pas = lt / 4;
          for (let i = 0; i < 4; i++) {
            const xa = xt0 + 3 + i * pas;
            d += ` C ${f(xa + pas * 0.25)} ${f(g.cy - 5)} ${f(xa + pas * 0.75)} ${f(g.cy - 5)} ${f(xa + pas)} ${f(g.cy)}`;
          }
          let d2 = `M ${f(xt0 + 3)} ${f(g.cy)}`;
          for (let i = 0; i < 4; i++) {
            const xa = xt0 + 3 + i * pas;
            d2 += ` C ${f(xa + pas * 0.25)} ${f(g.cy + 5)} ${f(xa + pas * 0.75)} ${f(g.cy + 5)} ${f(xa + pas)} ${f(g.cy)}`;
          }
          out.push(h.path(d, 'fill="none" stroke="#1A1A1A" stroke-width="2.6" stroke-linecap="round"'));
          out.push(h.path(d2, 'fill="none" stroke="#1A1A1A" stroke-width="2.6" stroke-linecap="round"'));
          out.push(h.cercle(g.cx, g.cy, g.rB, h.a.cache));
          return out.join('\n');
        },
      },
    },
  };
};
