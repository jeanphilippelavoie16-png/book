// Planche 34-03 — Le sirop pesé au fléau à bras égaux (ch. 34, « Peser sans balance : le fléau à
// bras égaux », points 1 à 4 et « Le sirop et l'onguent » ; étape 1, le sucre dissous à feu doux).
// Aucune cote : le chapitre ne donne aucune mesure du fléau. Aucun chiffre sur le dessin.
module.exports = (h) => {
  const f = (v) => (+v).toFixed(1);
  const pointille = h.a.fin + ' stroke-dasharray="2 2.5"';

  // ── les pièces ─────────────────────────────────────────────────────────────────────────

  // Baguette vue de côté : dessus à y, épaisseur e, encoches en V sur le dessus aux abscisses xs.
  const baguette = (x0, x1, y, e, xs) => {
    const p = e * 0.55, w = e * 0.5;
    const pts = [[x0, y + 0.8]];
    xs.slice().sort((a, b) => a - b).forEach(x => pts.push([x - w, y], [x, y + p], [x + w, y]));
    pts.push([x1, y + 0.8], [x1 + 1.2, y + e / 2], [x1, y + e - 0.4], [x0, y + e - 0.4], [x0 - 1.2, y + e / 2]);
    const m = (x0 + x1) / 2;
    return [
      h.chemin(pts, h.a.blanc, true),
      h.path(`M ${f(x0 + 12)} ${f(y + e * 0.7)} L ${f(m - 34)} ${f(y + e * 0.64)}`, h.a.fin),
      h.path(`M ${f(m + 26)} ${f(y + e * 0.72)} L ${f(x1 - 14)} ${f(y + e * 0.66)}`, h.a.fin),
      h.chemin(pts, h.a.contour, true),
      // la ficelle qui passe dans chaque encoche fait le tour de la baguette
      ...xs.map(x => h.ligne(x, y + p, x - 0.8, y + e, h.a.detail)),
    ].join('\n');
  };

  // Branche d'où pend le fléau, avec la boucle de ficelle.
  const branche = (cx, y, demi) => [
    h.path(`M ${f(cx - demi)} ${f(y)} Q ${f(cx)} ${f(y - 2)} ${f(cx + demi)} ${f(y + 1)} L ${f(cx + demi + 1)} ${f(y + 7)} Q ${f(cx)} ${f(y + 6)} ${f(cx - demi)} ${f(y + 7)} Z`, h.a.blanc),
    h.path(`M ${f(cx + demi * 0.45)} ${f(y + 0.5)} L ${f(cx + demi * 0.62)} ${f(y - 8)} L ${f(cx + demi * 0.7)} ${f(y - 7)} L ${f(cx + demi * 0.56)} ${f(y + 0.4)}`, h.a.blanc),
    h.path(`M ${f(cx + demi * 0.45)} ${f(y + 0.5)} L ${f(cx + demi * 0.62)} ${f(y - 8)} L ${f(cx + demi * 0.7)} ${f(y - 7)} L ${f(cx + demi * 0.56)} ${f(y + 0.4)}`, h.a.arete),
    h.path(`M ${f(cx - demi)} ${f(y)} Q ${f(cx)} ${f(y - 2)} ${f(cx + demi)} ${f(y + 1)} M ${f(cx + demi + 1)} ${f(y + 7)} Q ${f(cx)} ${f(y + 6)} ${f(cx - demi)} ${f(y + 7)}`, h.a.arete),
    h.path(`M ${f(cx - demi)} ${f(y)} Q ${f(cx - demi - 2)} ${f(y + 3.5)} ${f(cx - demi)} ${f(y + 7)} M ${f(cx + demi)} ${f(y + 1)} Q ${f(cx + demi - 1.5)} ${f(y + 4)} ${f(cx + demi + 1)} ${f(y + 7)}`, h.a.detail),
    h.path(`M ${f(cx - demi * 0.7)} ${f(y + 3.4)} L ${f(cx - demi * 0.15)} ${f(y + 3)}`, h.a.fin),
    // la boucle autour de la branche
    h.path(`M ${f(cx - 1.5)} ${f(y - 1)} L ${f(cx + 1.5)} ${f(y + 7)}`, h.a.detail),
  ].join('\n');

  // Plateau d'écorce de bouleau, vu un peu de haut : le fond (derrière le contenu) et le devant.
  const plateauFond = (cx, yr, rx) => {
    const ry = rx * 0.3;
    return [h.ellipse(cx, yr, rx, ry, h.a.blanc), h.ellipse(cx, yr, rx, ry, h.a.arete)].join('\n');
  };
  const plateauDevant = (cx, yr, rx, dep) => {
    const ry = rx * 0.3, rb = rx * 0.8, ryb = ry * 0.8;
    const d = `M ${f(cx - rx)} ${f(yr)} A ${f(rx)} ${f(ry)} 0 0 0 ${f(cx + rx)} ${f(yr)} L ${f(cx + rb)} ${f(yr + dep)} A ${f(rb)} ${f(ryb)} 0 0 1 ${f(cx - rb)} ${f(yr + dep)} Z`;
    const lent = [];
    [[-0.62, 0.5, 0.16], [-0.3, 0.28, 0.2], [-0.05, 0.62, 0.14], [0.28, 0.4, 0.2], [0.56, 0.62, 0.14], [-0.4, 0.8, 0.12], [0.12, 0.18, 0.12]].forEach(([u, v, l]) => {
      const x = cx + u * rx;
      const yh = yr + ry * Math.sqrt(Math.max(0, 1 - u * u));
      const yb = yr + dep + ryb * Math.sqrt(Math.max(0, 1 - (u * rx / rb) ** 2));
      const y = yh + (yb - yh) * v;
      lent.push(h.rect(x - l * rx / 2, y - 0.6, l * rx, 1.2, h.a.plein));
    });
    // la couture du bord, en racine d'épinette
    for (let u = -0.84; u <= 0.85; u += 0.21) {
      const x = cx + u * rx, y = yr + ry * Math.sqrt(1 - u * u);
      lent.push(h.ligne(x - 1.3, y - 2, x + 1.3, y + 2.4, h.a.detail));
    }
    return [h.path(d, h.a.blanc), ...lent, h.path(d, h.a.arete)].join('\n');
  };
  // Les deux ficelles d'un plateau, de l'encoche au bord.
  const suspentes = (xn, yn, cx, yr, rx) => [
    h.ligne(xn, yn, cx - rx + 1.5, yr, h.a.detail),
    h.ligne(xn, yn, cx + rx - 1.5, yr, h.a.detail),
    h.cercle(cx - rx + 1.5, yr, 1.4, h.a.plein),
    h.cercle(cx + rx - 1.5, yr, 1.4, h.a.plein),
  ].join('\n');

  // Caillou posé : son pied à yb (caché par le devant du plateau).
  const caillou = (cx, yb, l, ht) => {
    const pts = [[cx - l / 2, yb], [cx - l / 2 + 1, yb - ht * 0.6], [cx - l * 0.2, yb - ht], [cx + l * 0.25, yb - ht * 0.92], [cx + l / 2, yb - ht * 0.45], [cx + l / 2 - 0.5, yb]];
    return [h.chemin(pts, h.a.blanc, true), h.chemin(pts, h.a.arete, true)].join('\n');
  };
  // Roche : plus grosse, une arête et une fissure.
  const roche = (cx, yb, l, ht) => {
    const pts = [[cx - l / 2, yb], [cx - l / 2 - 1, yb - ht * 0.45], [cx - l * 0.28, yb - ht * 0.92], [cx + l * 0.05, yb - ht], [cx + l * 0.36, yb - ht * 0.8], [cx + l / 2 + 1, yb - ht * 0.35], [cx + l / 2, yb]];
    return [
      h.chemin(pts, h.a.blanc, true),
      h.path(`M ${f(cx + l * 0.05)} ${f(yb - ht)} L ${f(cx - l * 0.05)} ${f(yb - ht * 0.45)} L ${f(cx - l * 0.22)} ${f(yb - ht * 0.1)}`, h.a.detail),
      h.path(`M ${f(cx + l * 0.2)} ${f(yb - ht * 0.55)} L ${f(cx + l * 0.34)} ${f(yb - ht * 0.3)}`, h.a.fin),
      h.chemin(pts, h.a.arete, true),
    ].join('\n');
  };
  // Bûchette couchée, le bout scié vers la droite (cernes).
  const buchette = (cx, yb, l, d) => {
    const x0 = cx - l / 2, x1 = cx + l / 2, yt = yb - d, ym = yb - d / 2, rb = d * 0.3;
    return [
      h.path(`M ${f(x1)} ${f(yt)} L ${f(x0)} ${f(yt)} A ${f(rb)} ${f(d / 2)} 0 0 0 ${f(x0)} ${f(yb)} L ${f(x1)} ${f(yb)} Z`, h.a.blanc),
      h.path(`M ${f(x1)} ${f(yt)} L ${f(x0)} ${f(yt)} A ${f(rb)} ${f(d / 2)} 0 0 0 ${f(x0)} ${f(yb)} L ${f(x1)} ${f(yb)}`, h.a.arete),
      h.path(`M ${f(x0 + 5)} ${f(yt + d * 0.32)} L ${f(x1 - 9)} ${f(yt + d * 0.3)} M ${f(x0 + 9)} ${f(yt + d * 0.66)} L ${f(x1 - 6)} ${f(yt + d * 0.7)}`, h.a.fin),
      h.ellipse(x1, ym, rb, d / 2, h.a.blanc),
      h.ellipse(x1, ym, rb, d / 2, h.a.arete),
      h.ellipse(x1, ym, rb * 0.5, d * 0.25, h.a.fin),
      h.cercle(x1, ym, 0.8, h.a.plein),
    ].join('\n');
  };

  // Contenant de verre, fond à yb ; contenu { type: 'eau' | 'sucre', niveau (fraction du corps) }.
  const pot = (cx, yb, w, ht, contenu) => {
    const rx = w / 2, ry = rx * 0.28, nr = rx * 0.72, col = ht * 0.13, ep = ht * 0.12;
    const yt = yb - ht, ye = yt + col + ep;
    const corps = `M ${f(cx - nr)} ${f(yt)} L ${f(cx - nr)} ${f(yt + col)} Q ${f(cx - rx)} ${f(yt + col)} ${f(cx - rx)} ${f(ye)} L ${f(cx - rx)} ${f(yb - ry)} A ${f(rx)} ${f(ry)} 0 0 0 ${f(cx + rx)} ${f(yb - ry)} L ${f(cx + rx)} ${f(ye)} Q ${f(cx + rx)} ${f(yt + col)} ${f(cx + nr)} ${f(yt + col)} L ${f(cx + nr)} ${f(yt)}`;
    const o = [h.path(corps + ' Z', h.a.blanc)];
    if (contenu) {
      const yl = yb - ry - (yb - ry - ye) * contenu.niveau, ri = rx - 1.6;
      if (contenu.type === 'eau') {
        o.push(h.path(`M ${f(cx - ri)} ${f(yl)} A ${f(ri)} ${f(ry)} 0 0 1 ${f(cx + ri)} ${f(yl)} L ${f(cx + ri)} ${f(yb - ry)} A ${f(ri)} ${f(ry)} 0 0 1 ${f(cx - ri)} ${f(yb - ry)} Z`, h.a.hachure('eau', 'aucun')));
        o.push(h.ellipse(cx, yl, ri, ry, h.a.detail));
      } else {
        o.push(h.path(`M ${f(cx - ri)} ${f(yl + 1.5)} Q ${f(cx)} ${f(yl - 5)} ${f(cx + ri)} ${f(yl + 1.5)} L ${f(cx + ri)} ${f(yb - ry)} A ${f(ri)} ${f(ry)} 0 0 1 ${f(cx - ri)} ${f(yb - ry)} Z`, h.a.hachure('neige', 'aucun')));
        o.push(h.path(`M ${f(cx - ri)} ${f(yl + 1.5)} Q ${f(cx)} ${f(yl - 5)} ${f(cx + ri)} ${f(yl + 1.5)}`, h.a.detail));
      }
    }
    // reflets du verre
    o.push(h.ligne(cx - rx + 3.5, ye + 3, cx - rx + 3.5, yb - ry - 6, h.a.fin));
    o.push(h.ligne(cx + rx - 4, ye + 5, cx + rx - 4, ye + 12, h.a.fin));
    o.push(h.path(corps, h.a.arete));
    // filets du goulot, et le bord
    o.push(h.path(`M ${f(cx - nr)} ${f(yt + col * 0.45)} Q ${f(cx)} ${f(yt + col * 0.45 + 2.4)} ${f(cx + nr)} ${f(yt + col * 0.3)}`, h.a.fin));
    o.push(h.path(`M ${f(cx - nr)} ${f(yt + col * 0.85)} Q ${f(cx)} ${f(yt + col * 0.85 + 2.4)} ${f(cx + nr)} ${f(yt + col * 0.7)}`, h.a.fin));
    o.push(h.ellipse(cx, yt, nr, nr * 0.28, h.a.blanc), h.ellipse(cx, yt, nr, nr * 0.28, h.a.arete));
    return o.join('\n');
  };

  // Un repère tourné : origine (ox, oy), angle a en degrés. Les formes s'y écrivent en listes de
  // commandes ; les points sortent déjà tournés (pas de transform dans le SVG).
  const rep = (ox, oy, a) => {
    const c = Math.cos(a * Math.PI / 180), s = Math.sin(a * Math.PI / 180);
    const P = (x, y) => `${f(ox + x * c - y * s)} ${f(oy + x * s + y * c)}`;
    const d = (cmds) => cmds.map(k => {
      if (k[0] === 'M' || k[0] === 'L') return `${k[0]} ${P(k[1], k[2])}`;
      if (k[0] === 'Q') return `Q ${P(k[1], k[2])} ${P(k[3], k[4])}`;
      if (k[0] === 'C') return `C ${P(k[1], k[2])} ${P(k[3], k[4])} ${P(k[5], k[6])}`;
      if (k[0] === 'A') return `A ${f(k[1])} ${f(k[2])} ${f(a)} ${k[3]} ${k[4]} ${P(k[5], k[6])}`;
      return 'Z';
    }).join(' ');
    const ell = (x, y, rx, ry) => d([['M', x - rx, y], ['A', rx, ry, 1, 0, x + rx, y], ['A', rx, ry, 1, 0, x - rx, y], ['Z']]);
    return { d, ell };
  };

  // Tasse : ouverture en (0, 0) du repère, vers le haut ; anse à droite.
  const tasse = (o) => {
    const r = 10, ry = 3.2, ht = 21, rb = 8;
    const corps = o.d([['M', -r, 0], ['A', r, ry, 0, 0, r, 0], ['L', rb, ht], ['A', rb, ry * 0.8, 0, 1, -rb, ht], ['Z']]);
    const anse = o.d([['M', r - 0.6, 3], ['C', r + 11, 1, r + 11, 18, rb + 0.4, 16.5], ['L', rb + 0.1, 13], ['C', r + 6.5, 13.5, r + 6.5, 6, r - 0.4, 7], ['Z']]);
    return [
      h.path(anse, h.a.blanc), h.path(anse, h.a.arete),
      h.path(corps, h.a.blanc), h.path(corps, h.a.arete),
      h.path(o.ell(0, 0, r, ry), h.a.blanc), h.path(o.ell(0, 0, r, ry), h.a.arete),
      h.path(o.ell(-3, 0.6, r * 0.55, ry * 0.55), h.a.hachure('neige', 'aucun')),
    ].join('\n');
  };

  // Bol : ouverture en (0, 0) du repère, vers le haut. tas : un tas de sucre qui dépasse ;
  // fondSucre : le sucre qui glisse vers la lèvre basse d'un bol penché.
  const bol = (o, R, { tas = false, fondSucre = false } = {}) => {
    const ry = R * 0.3;
    const devant = o.d([['M', -R, 0], ['A', R, ry, 0, 0, R, 0], ['Q', R * 0.95, R * 0.62, R * 0.36, R * 0.66], ['L', -R * 0.36, R * 0.66], ['Q', -R * 0.95, R * 0.62, -R, 0], ['Z']]);
    const pied = o.d([['M', -R * 0.34, R * 0.66], ['L', R * 0.34, R * 0.66], ['L', R * 0.32, R * 0.66 + 3.5], ['L', -R * 0.32, R * 0.66 + 3.5], ['Z']]);
    const out = [h.path(o.ell(0, 0, R, ry), h.a.blanc), h.path(o.ell(0, 0, R, ry), h.a.arete)];
    if (fondSucre) out.push(h.path(o.ell(-R * 0.5, 0, R * 0.42, ry * 0.72), h.a.hachure('neige', 'aucun')));
    if (tas) {
      const t = [['M', -R * 0.84, ry * 0.3], ['Q', -R * 0.3, -R * 0.5, 0, -R * 0.52], ['Q', R * 0.3, -R * 0.5, R * 0.84, ry * 0.3]];
      out.push(h.path(o.d([...t, ['Z']]), h.a.hachure('neige', 'aucun')), h.path(o.d(t), h.a.detail));
    }
    out.push(h.path(devant, h.a.blanc), h.path(devant, h.a.arete), h.path(pied, h.a.blanc), h.path(pied, h.a.arete));
    return out.join('\n');
  };

  // Filet de sucre qui tombe, de (x, y0) à y1.
  const filet = (x, y0, y1) => {
    const o = [];
    for (let y = y0, i = 0; y <= y1; y += 3.2, i++) o.push(h.cercle(x + (i % 3 === 0 ? -0.9 : i % 3 === 1 ? 0.7 : 0), y, i % 2 ? 0.75 : 0.95, h.a.plein));
    return o.join('\n');
  };

  // Le fléau entier : branche, ficelle, baguette, deux plateaux. dansG / dansD : ce qui est posé
  // dans chaque plateau, dessiné entre le fond et le devant (reçoit cx, yr, rx du plateau).
  const fleau = ({ cx, yb, ys, e, demi, bout, yr, pg, pd, dansG = () => '', dansD = () => '', brancheDemi }) => {
    const p = e * 0.55, xg = cx - demi, xd = cx + demi;
    return [
      h.ligne(cx, yb + 3, cx, ys + p, h.a.detail),
      branche(cx, yb, brancheDemi),
      suspentes(xg, ys + p, xg, yr, pg.rx),
      suspentes(xd, ys + p, xd, yr, pd.rx),
      baguette(cx - demi - bout, cx + demi + bout, ys, e, [xg, cx, xd]),
      plateauFond(xg, yr, pg.rx), dansG(xg, yr, pg.rx), plateauDevant(xg, yr, pg.rx, pg.dep),
      plateauFond(xd, yr, pd.rx), dansD(xd, yr, pd.rx), plateauDevant(xd, yr, pd.rx, pd.dep),
    ].join('\n');
  };

  // ── Vue 1 : le milieu, puis les deux encoches ────────────────────────────────────────
  const M = { ys: 26, e: 9, x0: 24, demi: 250 };
  const milieu = z => {
    const cx = z.l / 2, x0 = cx - 276, x1 = cx + 276, xg = cx - M.demi, xd = cx + M.demi, p = M.e * 0.55;
    const yf = 50, yr = 78;
    return [
      baguette(x0, x1, M.ys, M.e, [xg, cx, xd]),
      // la ficelle de la longueur de la baguette, pliée en deux : les deux bouts au bout de la
      // baguette, le pli sous le milieu
      h.path(`M ${f(x0)} ${f(yf)} L ${f(cx)} ${f(yf)} A 3.5 3.5 0 0 1 ${f(cx)} ${f(yf + 7)} L ${f(x0)} ${f(yf + 7)}`, h.a.detail),
      h.path(`M ${f(x0)} ${f(yf)} l -3 -2 M ${f(x0)} ${f(yf)} l -3.2 1 M ${f(x0)} ${f(yf + 7)} l -3 -1 M ${f(x0)} ${f(yf + 7)} l -3 2`, h.a.fin),
      h.ligne(x0, M.ys + M.e + 3, x0, yf - 3, pointille),
      h.ligne(cx + 3.5, M.ys + M.e + 3, cx + 3.5, yf - 3, pointille),
      // la même ficelle, portée du milieu à chaque encoche de bout
      h.ligne(xg, yr, cx - 1.5, yr, h.a.detail),
      h.ligne(cx + 1.5, yr, xd, yr, h.a.detail),
      ...[xg, cx - 1.5, cx + 1.5, xd].map(x => h.cercle(x, yr, 1.5, h.a.plein)),
      h.ligne(xg, M.ys + p + 3, xg, yr - 4, pointille),
      h.ligne(xd, M.ys + p + 3, xd, yr - 4, pointille),
      h.fleche(`M ${f(cx - 120)} ${f(yr - 7)} Q ${f(cx)} ${f(yr - 19)} ${f(cx + 120)} ${f(yr - 7)}`, h.a.detail),
    ].join('\n');
  };

  // ── Vue 2 : le fléau taré à vide ─────────────────────────────────────────────────────
  const V = z => ({ cx: z.l / 2, yb: 12, ys: 40, e: 9, demi: 128, bout: 14, yr: 138, brancheDemi: 52,
    pg: { rx: 38, dep: 15 }, pd: { rx: 31, dep: 12 } });
  const vide = z => {
    const c = V(z);
    return fleau({ ...c,
      dansD: (x, yr, rx) => caillou(x + rx * 0.35, yr + rx * 0.3 * 0.9, 13, 10),
    });
  };

  // ── Vue 3 : l'épreuve ────────────────────────────────────────────────────────────────
  const E = z => ({ cx: z.l / 2, yb: 12, ys: 40, e: 8, demi: 80, bout: 11, yr: 116, brancheDemi: 36,
    pg: { rx: 29, dep: 12 }, pd: { rx: 24, dep: 10 } });
  const epreuve = z => {
    const c = E(z), xg = c.cx - c.demi, xd = c.cx + c.demi, ya = c.yr + 30;
    return [
      fleau({ ...c,
        dansG: (x, yr, rx) => roche(x, yr + rx * 0.3 * 0.9, 22, 17),
        dansD: (x, yr, rx) => [buchette(x - 4, yr + rx * 0.3 * 0.9, 26, 12), caillou(x + rx * 0.64, yr + rx * 0.3 * 0.9, 10, 8)].join('\n'),
      }),
      // les deux charges changent de plateau
      h.fleche(`M ${f(xg + 2)} ${f(ya + 6)} Q ${f(c.cx)} ${f(ya - 10)} ${f(xd - 2)} ${f(ya + 6)}`, h.a.arete),
      h.fleche(`M ${f(xd - 2)} ${f(ya + 18)} Q ${f(c.cx)} ${f(ya + 34)} ${f(xg + 2)} ${f(ya + 18)}`, h.a.arete),
    ].join('\n');
  };

  // ── Vue 4 : la deuxième part de sucre ────────────────────────────────────────────────
  const P = z => ({ cx: 148, yb: 12, ys: 36, e: 9, demi: 104, bout: 13, yr: 180, brancheDemi: 44,
    pg: { rx: 36, dep: 11 }, pd: { rx: 31, dep: 10 } });
  const POT = { w: 30, ht: 50 };
  const part = z => {
    const c = P(z), xd = c.cx + c.demi;
    const potD = (x, yr, rx) => yr + rx * 0.3 * 0.6;
    const topD = potD(xd, c.yr, c.pd.rx) - POT.ht;
    const table = { x: z.l - 62, y: z.h - 16 };
    return [
      fleau({ ...c,
        dansG: (x, yr, rx) => pot(x, potD(x, yr, rx), POT.w, POT.ht, { type: 'eau', niveau: 0.6 }),
        dansD: (x, yr, rx) => [
          pot(x - 3, potD(x, yr, rx), POT.w, POT.ht, { type: 'sucre', niveau: 0.7 }),
          caillou(x + rx * 0.68, yr + rx * 0.3 * 0.9, 11, 9),
        ].join('\n'),
      }),
      // le sucre versé de la tasse dans le contenant vide
      filet(xd - 3, topD - 20, topD + 18),
      tasse(rep(xd - 3 - 3.4, topD - 32, -110)),
      // la première part, mise de côté dans un bol sur la table
      h.rect(table.x, table.y, 62, 6, h.a.hachure('bois')),
      bol(rep(table.x + 32, table.y - 3.5 - 22 * 0.66, 0), 22, { tas: true }),
      h.fleche(`M ${f(xd + c.pd.rx + 6)} ${f(c.yr - 16)} Q ${f(table.x + 38)} ${f(c.yr - 22)} ${f(table.x + 36)} ${f(table.y - 32)}`, h.a.arete),
    ].join('\n');
  };

  // ── Vue 5 : les deux parts dans l'infusion, à feu doux ───────────────────────────────
  const suite = z => {
    const ys = z.h - 50, cx = 98, rx = 50, ry = 13, yr = ys - 40, yl = yr + 8;
    const potCorps = `M ${f(cx - rx)} ${f(yr)} A ${f(rx)} ${f(ry)} 0 0 0 ${f(cx + rx)} ${f(yr)} L ${f(cx + rx)} ${f(ys - ry)} A ${f(rx)} ${f(ry)} 0 0 1 ${f(cx - rx)} ${f(ys - ry)} Z`;
    const manche = `M ${f(cx - rx + 1)} ${f(yr + 3)} L ${f(12)} ${f(yr - 7)} Q ${f(5)} ${f(yr - 7)} ${f(5)} ${f(yr - 2)} Q ${f(5)} ${f(yr + 3)} ${f(12)} ${f(yr + 3)} L ${f(cx - rx + 1)} ${f(yr + 11)} Z`;
    const bx = cx + 34, by = yr - 58;
    return [
      // le poêle : le dessus en fonte, la façade et sa porte
      h.rect(14, ys + 10, z.l - 28, z.h - ys - 10, h.a.blanc),
      h.path(`M ${f(14)} ${f(z.h)} L ${f(14)} ${f(ys + 10)} L ${f(z.l - 14)} ${f(ys + 10)} L ${f(z.l - 14)} ${f(z.h)}`, h.a.arete),
      h.rect(58, ys + 20, 104, z.h - ys - 20, h.a.detail),
      h.rect(64, ys + 26, 92, z.h - ys - 26, h.a.fin),
      h.rect(141, ys + 30, 9, 4, h.a.plein),
      h.rect(6, ys, z.l - 12, 10, h.a.hachure('metal')),
      // la casserole d'infusion
      h.path(manche, h.a.blanc), h.path(manche, h.a.arete),
      h.ellipse(16, yr - 2, 4, 2, h.a.detail),
      h.ellipse(cx, yr, rx, ry, h.a.blanc), h.ellipse(cx, yr, rx, ry, h.a.arete),
      h.ellipse(cx, yl, rx - 2, ry - 1, h.a.hachure('eau', 'detail')),
      h.path(potCorps, h.a.blanc), h.path(potCorps, h.a.contour),
      h.path(`M ${f(cx - rx)} ${f(yr)} A ${f(rx)} ${f(ry)} 0 0 0 ${f(cx + rx)} ${f(yr)}`, h.a.arete),
      // le bol des deux parts, penché, qui se vide dans l'infusion
      filet(bx + 3.4, by + 28.5, yl - 2),
      bol(rep(bx, by, -98), 27, { fondSucre: true }),
    ].join('\n');
  };

  return {
    ref: '34-03',
    titre: 'Le sirop pesé au fléau à bras égaux',
    desc: 'Une baguette droite : une ficelle de sa longueur, pliée en deux, marque le milieu, où va l’encoche de suspension ; la même ficelle, portée du milieu vers chaque bout, place les deux encoches des plateaux à égale distance. Le fléau pendu à une branche, deux plateaux d’écorce de bouleau pendus aux bouts ; le plateau le plus léger reçoit un caillou jusqu’à ce que la baguette soit à l’horizontale. L’épreuve : une roche et une bûchette en équilibre changent de plateau, et l’équilibre doit tenir. La pesée : l’infusion dans un contenant de verre sur un plateau, un contenant pareil sur l’autre, où l’on verse le sucre à la tasse jusqu’à l’équilibre ; la première part attend dans un bol sur la table pendant qu’on pèse la deuxième. Les deux parts versées dans la casserole d’infusion, sur le poêle, à feu doux.',
    format: 'pleine',
    disposition: [['milieu'], ['vide', 'epreuve'], ['part', 'suite']],
    hauteurs: [2.1, 4, 5.2],
    largeurs: [[1], [3, 2], [3, 2]],
    vues: {
      milieu: {
        titre: 'Le milieu, puis les deux encoches',
        dessin: milieu,
        renvois: z => {
          const cx = z.l / 2;
          return [
            { n: 1, rond: [cx + 44, 52], cible: [cx + 4, 54], texte: 'ficelle pliée en deux, pli au milieu' },
            { n: 2, rond: [cx - 44, 11], cible: [cx - 1, M.ys + 4], texte: 'encoche de suspension, au milieu exact' },
            { n: 3, rond: [cx + 188, 58], cible: [cx + 170, 78], texte: 'même ficelle, du milieu à chaque bout' },
          ];
        },
      },
      vide: {
        titre: 'Le fléau taré à vide',
        dessin: vide,
        renvois: z => {
          const c = V(z);
          return [
            { n: 4, rond: [c.cx + 34, 30], cible: [c.cx + 1, 28], texte: 'ficelle de suspension dans l’encoche' },
            { n: 5, rond: [c.cx - c.demi + 62, c.yr + 30], cible: [c.cx - c.demi + 16, c.yr + 19], texte: 'plateau d’écorce pendu au bout' },
            { n: 6, rond: [c.cx + c.demi - 36, c.yr + 38], cible: [c.cx + c.demi + 10, c.yr + 6], texte: 'caillou de tare sur le plateau léger' },
          ];
        },
      },
      epreuve: {
        titre: 'L’épreuve',
        dessin: epreuve,
        renvois: z => {
          const c = E(z);
          return [
            { n: 7, rond: [c.cx + 78, c.yr + 60], cible: [c.cx + 32, c.yr + 54], texte: 'charges inversées : l’équilibre doit tenir' },
          ];
        },
      },
      part: {
        titre: 'La deuxième part de sucre',
        dessin: part,
        renvois: z => {
          const c = P(z), xg = c.cx - c.demi, xd = c.cx + c.demi;
          return [
            { n: 8, rond: [xg + 60, c.yr + 36], cible: [xg + 4, c.yr - 6], texte: 'infusion filtrée, dans un contenant' },
            { n: 9, rond: [xd - 58, c.yr - 46], cible: [xd - 16, c.yr - 30], texte: 'contenant pareil, vide au départ' },
            { n: 10, rond: [xd - 60, c.yr - 92], cible: [xd - 4, c.yr - 64], texte: 'sucre versé jusqu’à l’équilibre : une part' },
            { n: 11, rond: [z.l - 18, z.h - 70], cible: [z.l - 26, z.h - 36], texte: 'part mise de côté ; on recommence' },
          ];
        },
      },
      suite: {
        titre: 'Les deux parts dans l’infusion',
        dessin: suite,
        renvois: z => {
          const yr = z.h - 90;
          return [
            { n: 12, rond: [z.l - 22, yr - 6], cible: [128, yr + 2], texte: 'les deux parts dans l’infusion, à feu doux' },
          ];
        },
      },
    },
  };
};
