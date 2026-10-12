// Planche 88-03 — Le four de fortune sur le poêle (chapitre 88, 5.D, étapes 24 à 26).
// Quatre vues : le chaudron de fonte couvert, surélevé sur trois écrous au-dessus de la zone
// chaude, la miche dans un moule plus petit posé sur un rond de broche (coupe) ; les trois
// écrous en triangle sous le fond et le quart de tour à chaque passage (vu de dessus) ; la
// variante sur un doigt de sable sec dans un chaudron plus large, la miche sur le fond fariné
// (coupe) ; la cloche de chaudière renversée sur une plaque de fonte posée sur trois écrous,
// sur la zone tiède (coupe).
// Aucune cote : le chapitre dit « quelques millimètres » et « un doigt », sans chiffre.

module.exports = (h) => {
  const f = v => Math.round(v * 10) / 10;
  const NOIR = '#1A1A1A';
  const blancArete = h.a.arete.replace('fill="none"', 'fill="#ffffff"');
  const blancDetail = h.a.detail.replace('fill="none"', 'fill="#ffffff"');
  const halo = 'fill="none" stroke="#ffffff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"';
  const epais = w => `fill="none" stroke="${NOIR}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"`;
  const farine = `fill="none" stroke="${NOIR}" stroke-width="1.2" stroke-linecap="round" stroke-dasharray="0.1 2.6"`;

  // Graine fixe : le sable est le même à chaque composition.
  let graine = 883;
  const hasard = () => (graine = (graine * 16807) % 2147483647) / 2147483647;
  const dedans = (poly, x, y) => {
    let c = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const [xi, yi] = poly[i], [xj, yj] = poly[j];
      if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c;
    }
    return c;
  };
  // Sable : un semis de grains sur une grille secouée, dans un polygone (comme à la 88-01).
  const sable = (poly, pas = 4.4) => {
    const xs = poly.map(p => p[0]), ys = poly.map(p => p[1]);
    const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
    let d = '';
    for (let y = y0 + pas / 2; y < y1; y += pas) {
      for (let x = x0 + pas / 2; x < x1; x += pas) {
        const px = x + (hasard() - 0.5) * pas * 0.9, py = y + (hasard() - 0.5) * pas * 0.9;
        if (!dedans(poly, px, py)) continue;
        d += `M${f(px)} ${f(py)}h0.01`;
      }
    }
    return `<path d="${d}" fill="none" stroke="${NOIR}" stroke-width="1.3" stroke-linecap="round"/>`;
  };

  // ─── Le poêle ────────────────────────────────────────────────────────────────────────
  // Une bûche vue par le bout : écorce, cerne, fente.
  const buche = (cx, cy, r) => [
    h.cercle(cx, cy, r, blancArete),
    h.cercle(cx, cy, r - 2, h.a.fin),
    h.cercle(cx + r * 0.08, cy - r * 0.05, r * 0.42, h.a.fin),
    h.path(`M ${f(cx + r * 0.12)} ${f(cy - r * 0.02)} Q ${f(cx + r * 0.5)} ${f(cy + r * 0.1)} ${f(cx + r * 0.7)} ${f(cy + r * 0.5)}`, h.a.fin),
  ].join('\n');
  // Une flamme : une langue, et une plus petite dedans.
  const flamme = (cx, yb, l, ht, p = 0) => {
    const langue = (l2, h2, p2) => `M ${f(cx - l2 / 2)} ${f(yb)} C ${f(cx - l2 * 0.62)} ${f(yb - h2 * 0.5)} ${f(cx - l2 * 0.08 + p2)} ${f(yb - h2 * 0.62)} ${f(cx + p2)} ${f(yb - h2)} C ${f(cx + l2 * 0.2 + p2 * 0.6)} ${f(yb - h2 * 0.6)} ${f(cx + l2 * 0.62)} ${f(yb - h2 * 0.45)} ${f(cx + l2 / 2)} ${f(yb)} Z`;
    return [h.path(langue(l, ht, p), blancArete), h.path(langue(l * 0.45, ht * 0.5, p * 0.5), h.a.fin)].join('\n');
  };
  // Le feu : trois bûches sur la sole, les flammes qui montent vers le dessus du poêle.
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
  // Le poêle coupé : le dessus de fonte (yT, épaisseur eT), la paroi de gauche, la sole, le feu
  // sous feuX. Le dessus continue hors de la vue à droite.
  const eT = 11, hf = 78;
  const poele = (z, feuX) => {
    const ySole = z.h - 4, yT = ySole - hf - eT, xp = 6;
    return {
      yT, ySole,
      svg: [
        feu(feuX, ySole, hf),
        h.ligne(xp + 8, ySole, z.l - 4, ySole, h.a.contour),
        h.rect(xp, yT, 8, ySole - yT, h.a.hachure('metal', 'arete')),
        h.rect(xp, yT, z.l - 4 - xp, eT, h.a.hachure('metal', 'arete')),
        h.ligne(xp, yT, z.l - 4, yT, h.a.contour),
      ].join('\n'),
    };
  };

  // Un écrou vu de côté, sur les pans : trois faces.
  const ecrou = (cx, yBas, l = 18, ht = 9, at = blancArete, trait = h.a.detail) => [
    h.rect(cx - l / 2, yBas - ht, l, ht, at),
    h.ligne(cx - l / 4, yBas - ht, cx - l / 4, yBas, trait),
    h.ligne(cx + l / 4, yBas - ht, cx + l / 4, yBas, trait),
  ].join('\n');
  // Trois écrous en triangle, vus de face : celui du fond au milieu, en trait plus fin.
  const troisEcrous = (cx, yBas, r0) => [
    ecrou(cx, yBas, 16, 9, blancDetail, h.a.fin),
    ecrou(cx - r0 * 0.87, yBas), ecrou(cx + r0 * 0.87, yBas),
  ].join('\n');

  // ─── Le chaudron de fonte, en coupe ──────────────────────────────────────────────────
  // Fond extérieur à yb, largeur W, hauteur H (jusqu'au rebord), paroi e.
  const chaudron = (cx, yb, W, H, e = 6) => {
    const xl = cx - W / 2, xr = cx + W / 2, yr = yb - H, rc = 16, ri = 10, yf = yb - e, d = 7;
    const corps = `M ${f(xl)} ${f(yr)} L ${f(xl)} ${f(yb - rc)} Q ${f(xl)} ${f(yb)} ${f(xl + rc)} ${f(yb)} L ${f(xr - rc)} ${f(yb)} Q ${f(xr)} ${f(yb)} ${f(xr)} ${f(yb - rc)} L ${f(xr)} ${f(yr)} L ${f(xr - e)} ${f(yr)} L ${f(xr - e)} ${f(yf - ri)} Q ${f(xr - e)} ${f(yf)} ${f(xr - e - ri)} ${f(yf)} L ${f(xl + e + ri)} ${f(yf)} Q ${f(xl + e)} ${f(yf)} ${f(xl + e)} ${f(yf - ri)} L ${f(xl + e)} ${f(yr)} Z`;
    // le couvercle, bombé, posé sur le rebord, avec sa lèvre qui entre dans le chaudron
    const couv = `M ${f(xl - 2)} ${f(yr)} L ${f(xl - 2)} ${f(yr - 5)} Q ${f(cx)} ${f(yr - 5 - 2 * d)} ${f(xr + 2)} ${f(yr - 5)} L ${f(xr + 2)} ${f(yr)} Q ${f(cx)} ${f(yr - 2 * d)} ${f(xl - 2)} ${f(yr)} Z`;
    const yPoignee = yr - 5 - d + 1;
    // les oreilles : deux anses fondues sous le rebord, vues de face
    const oreille = s => `M ${f(cx + s * W / 2)} ${f(yr + 9)} C ${f(cx + s * (W / 2 + 15))} ${f(yr + 9)} ${f(cx + s * (W / 2 + 15))} ${f(yr + 25)} ${f(cx + s * W / 2)} ${f(yr + 25)}`;
    return {
      xl, xr, yr, yf, yHaut: yPoignee - 13,
      svg: [
        h.path(oreille(-1), epais(3.6)), h.path(oreille(1), epais(3.6)),
        h.path(corps, h.a.plein),
        h.path(couv, h.a.plein),
        h.rect(xl + e + 1, yr - 3, 3.5, 9, h.a.plein), h.rect(xr - e - 4.5, yr - 3, 3.5, 9, h.a.plein),
        h.path(`M ${f(cx - 15)} ${f(yPoignee)} C ${f(cx - 15)} ${f(yPoignee - 17)} ${f(cx + 15)} ${f(yPoignee - 17)} ${f(cx + 15)} ${f(yPoignee)}`, epais(3.6)),
      ].join('\n'),
    };
  };

  // ─── La miche ────────────────────────────────────────────────────────────────────────
  const alveoles = (cx, yb, w, ht) =>
    [[-0.28, 0.35, 5, 2.4], [-0.05, 0.55, 4, 2], [0.22, 0.4, 5, 2.5], [0.3, 0.66, 3.4, 1.8], [-0.3, 0.64, 3, 1.6], [0.04, 0.24, 3.4, 1.7], [-0.14, 0.78, 3, 1.5]]
      .map(([u, v, rx, ry]) => h.ellipse(cx + u * w, yb - v * ht, rx, ry, h.a.fin)).join('\n');
  // Miche ronde posée à plat : dessous plat, dessus bombé.
  const michePath = (cx, yb, w, ht, m = 0) => {
    const a = w / 2 - m, r = 8, yB = yb - m, yH = yb - ht + m;
    return `M ${f(cx - a + r)} ${f(yB)} L ${f(cx + a - r)} ${f(yB)} Q ${f(cx + a)} ${f(yB)} ${f(cx + a)} ${f(yB - r)} C ${f(cx + a)} ${f(yH + ht * 0.28)} ${f(cx + a * 0.55)} ${f(yH)} ${f(cx)} ${f(yH)} C ${f(cx - a * 0.55)} ${f(yH)} ${f(cx - a)} ${f(yH + ht * 0.28)} ${f(cx - a)} ${f(yB - r)} Q ${f(cx - a)} ${f(yB)} ${f(cx - a + r)} ${f(yB)} Z`;
  };
  const miche = (cx, yb, w, ht) => [
    h.path(michePath(cx, yb, w, ht), blancArete),
    h.path(michePath(cx, yb, w, ht, 3), h.a.fin),
    alveoles(cx, yb, w, ht),
  ].join('\n');

  // Le moule en coupe, fond à ym (dessous), la miche dedans qui monte en dôme au-dessus du bord.
  const moule = (cx, ym, wm, hm, dome) => {
    const wt = wm + 12, yh = ym - hm;
    const pate = `M ${f(cx - wt / 2 + 1.5)} ${f(yh)} L ${f(cx - wm / 2 + 1.5)} ${f(ym - 1.5)} L ${f(cx + wm / 2 - 1.5)} ${f(ym - 1.5)} L ${f(cx + wt / 2 - 1.5)} ${f(yh)} C ${f(cx + wt / 2 + 3)} ${f(yh - dome * 0.75)} ${f(cx + wt * 0.28)} ${f(yh - dome)} ${f(cx)} ${f(yh - dome)} C ${f(cx - wt * 0.28)} ${f(yh - dome)} ${f(cx - wt / 2 - 3)} ${f(yh - dome * 0.75)} ${f(cx - wt / 2 + 1.5)} ${f(yh)} Z`;
    const croute = `M ${f(cx - wt / 2 + 2)} ${f(yh - 3)} C ${f(cx - wt / 2 + 1)} ${f(yh - dome * 0.7)} ${f(cx - wt * 0.27)} ${f(yh - dome + 3)} ${f(cx)} ${f(yh - dome + 3)} C ${f(cx + wt * 0.27)} ${f(yh - dome + 3)} ${f(cx + wt / 2 - 1)} ${f(yh - dome * 0.7)} ${f(cx + wt / 2 - 2)} ${f(yh - 3)}`;
    return {
      wt, yh, yDome: yh - dome,
      svg: [
        h.path(pate, blancArete),
        h.path(croute, h.a.fin),
        alveoles(cx, ym - 2, wm * 0.9, hm + dome * 0.7),
        h.chemin([[cx - wt / 2, yh], [cx - wm / 2, ym], [cx + wm / 2, ym], [cx + wt / 2, yh]], epais(2.4)),
        h.cercle(cx - wt / 2 - 1, yh, 2.3, h.a.plein), h.cercle(cx + wt / 2 + 1, yh, 2.3, h.a.plein),
      ].join('\n'),
    };
  };

  // Une flèche de chaleur ou d'air : tiretée, sur un liseré blanc.
  const chaleur = d => [h.path(d, halo), h.fleche(d, h.a.cache)].join('\n');

  // ─── Géométrie des vues ──────────────────────────────────────────────────────────────
  const gA = z => {
    const p = poele(z, z.l * 0.43), W = Math.min(z.l * 0.66, 240), cx = z.l * 0.43;
    const hn = 9, yb = p.yT - hn, H = Math.round(W * 0.56);
    const e = 6, yf = yb - e, rw = 3.5, ym = yf - 2 * rw, wm = W * 0.6, hm = H * 0.36, dome = H * 0.3;
    return { p, W, cx, hn, yb, H, e, yf, rw, ym, wm, hm, dome, r0: W * 0.38, rAnneau: wm * 0.36 };
  };
  const gB = z => {
    const cx = z.l * 0.445, p = poele(z, cx);
    const W2 = Math.min(z.l * 0.84, 262), H2 = 56, e2 = 5, yb2 = p.yT, yf2 = yb2 - e2, eS = 17, yS = yf2 - eS;
    const W1 = W2 - 62, H1 = Math.round(W1 * 0.56), yb1 = yS + 3;
    return { p, cx, W2, H2, e2, yb2, yf2, eS, yS, W1, H1, yb1 };
  };
  const gC = z => {
    const p = poele(z, 46), cx = z.l * 0.6, Wb = Math.min(z.l * 0.54, 184), Wt = Wb * 0.8, Hb = Math.round(Wb * 0.92);
    const hn = 9, eP = 8, yP = p.yT - hn - eP, Wp = Wb + 20;
    const wm = Wb * 0.58, hm = Hb * 0.26, dome = Hb * 0.2;
    return { p, cx, Wb, Wt, Hb, hn, eP, yP, Wp, wm, hm, dome, r0: Wp * 0.4 };
  };

  // La chaudière renversée, en coupe : ouverture en bas sur la plaque (yP), fond en haut.
  const cloche = (cx, yP, Wb, Wt, Hb) => {
    const yTop = yP - Hb;
    const paroi = s => {
      const pt = t => [cx + s * (Wb / 2 + (Wt - Wb) / 2 * t), yP - 3 - (Hb - 3) * t];
      let d = `M ${f(pt(0)[0])} ${f(pt(0)[1])}`;
      [0.36, 0.64].forEach(t => {
        const a = pt(t - 0.04), b = pt(t), c = pt(t + 0.04);
        d += ` L ${f(a[0])} ${f(a[1])} Q ${f(b[0] + s * 7)} ${f(b[1])} ${f(c[0])} ${f(c[1])}`;
      });
      return d + ` L ${f(pt(1)[0])} ${f(pt(1)[1])}`;
    };
    const xFond = s => cx + s * (Wt / 2 + (Wb - Wt) / 2 * (6 / Hb));
    const oreille = s => {
      const x = cx + s * (Wb / 2 - 0.4), y = yP - 24;
      const pts = [[x, y - 8], [x + s * 7, y - 6], [x + s * 7, y + 6], [x, y + 8]];
      return [h.chemin(pts, blancArete, true), h.cercle(x + s * 3.5, y, 1.4, h.a.plein)].join('\n');
    };
    return {
      yTop,
      xParoi: (s, y) => cx + s * (Wb / 2 + (Wt - Wb) / 2 * ((yP - 3 - y) / (Hb - 3))),
      svg: [
        oreille(-1), oreille(1),
        h.path(paroi(-1), epais(2.4)), h.path(paroi(1), epais(2.4)),
        h.ligne(xFond(-1), yTop + 6, xFond(1), yTop + 6, epais(2.4)),
        h.cercle(cx - Wb / 2, yP - 2.6, 2.6, h.a.plein), h.cercle(cx + Wb / 2, yP - 2.6, 2.6, h.a.plein),
        h.cercle(cx - Wt / 2, yTop, 2, h.a.plein), h.cercle(cx + Wt / 2, yTop, 2, h.a.plein),
      ].join('\n'),
    };
  };

  return {
    ref: '88-03',
    titre: 'Le four de fortune sur le poêle',
    desc: 'Trois façons de cuire une miche sur le dessus d’un poêle à bois. Le chaudron de fonte couvert, chauffé vide, surélevé de quelques millimètres sur trois écrous au-dessus de la zone chaude, la miche dans un moule plus petit posé sur un rond de broche ; vu de dessus, les trois écrous en triangle et le quart de tour à chaque passage. La variante : le chaudron posé sur un doigt de sable sec au fond d’un chaudron plus large, la miche sur le fond fariné. La cloche : une grande chaudière de métal renversée sur une plaque de fonte posée sur trois écrous, sur la zone tiède, la miche dans son moule sur la plaque.',
    format: 'pleine',
    disposition: [['chaudron', 'dessus'], ['sable', 'cloche']],
    largeurs: [[3, 2], [1, 1]],
    hauteurs: [1, 1],
    vues: {
      chaudron: {
        titre: 'Le chaudron sur trois écrous, en coupe',
        dessin: z => {
          const g = gA(z), c = chaudron(g.cx, g.yb, g.W, g.H, g.e), out = [g.p.svg];
          out.push(troisEcrous(g.cx, g.p.yT, g.r0));
          out.push(c.svg);
          // le rond de broche, à plat : les deux bouts coupés, la moitié du fond vue par la tranche
          out.push(h.rect(g.cx - g.rAnneau, g.yf - 2 * g.rw, 2 * g.rAnneau, 2 * g.rw, blancDetail));
          out.push(h.cercle(g.cx - g.rAnneau, g.yf - g.rw, g.rw, h.a.plein), h.cercle(g.cx + g.rAnneau, g.yf - g.rw, g.rw, h.a.plein));
          out.push(moule(g.cx, g.ym, g.wm, g.hm, g.dome).svg);
          // la chaleur monte du feu dans le dessus du poêle, sous le chaudron seulement
          [-0.24, 0.24].forEach(u => out.push(chaleur(`M ${f(g.cx + u * g.W)} ${f(g.p.ySole - 45)} L ${f(g.cx + u * g.W)} ${f(g.p.yT + eT + 3)}`)));
          return out.join('\n');
        },
        renvois: z => {
          const g = gA(z), c = chaudron(g.cx, g.yb, g.W, g.H, g.e), m = moule(g.cx, g.ym, g.wm, g.hm, g.dome), xr = z.l - 16;
          return [
            { n: 1, rond: [xr, c.yHaut - 2], cible: [c.xr - 26, c.yr - 7], texte: 'couvercle de fonte, mis' },
            { n: 2, rond: [xr, m.yDome - 2], cible: [g.cx + m.wt / 2 - 8, m.yh - 12], texte: 'miche, moule plus petit' },
            { n: 3, rond: [xr, g.yb - 56], cible: [c.xr - 3, g.yb - 56], texte: 'chaudron chauffé vide' },
            { n: 4, rond: [xr, g.yb - 32], cible: [g.cx + g.rAnneau, g.yf - g.rw], texte: 'rond de broche' },
            { n: 5, rond: [xr, g.yb - 7], cible: [g.cx + g.r0 * 0.87 + 9, g.yb + 2], texte: 'écrous ou anneau de broche' },
            { n: 6, rond: [xr, g.p.yT + 30], cible: [z.l - 40, g.p.yT + 6], texte: 'zone chaude du poêle' },
          ];
        },
      },

      dessus: {
        titre: 'Vu de dessus',
        dessin: z => {
          const cx = z.l / 2, cy = z.h * 0.48, R = Math.min(z.l, z.h) * 0.34, r0 = R * 0.72, out = [];
          // les oreilles, puis le couvercle qui cache tout
          [-1, 1].forEach(s => out.push(h.path(`M ${f(cx + s * R)} ${f(cy - 9)} C ${f(cx + s * (R + 15))} ${f(cy - 9)} ${f(cx + s * (R + 15))} ${f(cy + 9)} ${f(cx + s * R)} ${f(cy + 9)}`, epais(3.6))));
          out.push(h.cercle(cx, cy, R + 2, blancArete.replace('stroke-width="1.4"', 'stroke-width="2.4"')));
          out.push(h.cercle(cx, cy, R * 0.82, h.a.fin));
          // les trois écrous, cachés sous le fond
          [90, 210, 330].forEach(a => {
            const t = a * Math.PI / 180, ex = cx + r0 * Math.cos(t), ey = cy - r0 * Math.sin(t), pts = [];
            for (let k = 0; k < 6; k++) pts.push([ex + 10 * Math.cos(k * Math.PI / 3), ey + 10 * Math.sin(k * Math.PI / 3)]);
            out.push(h.chemin(pts, h.a.cache, true), h.cercle(ex, ey, 4.4, h.a.cache));
          });
          // la poignée du couvercle, vue de dessus
          out.push(h.rect(cx - 16, cy - 3.5, 32, 7, blancArete));
          // le quart de tour
          const Ra = R + 26, a1 = -100 * Math.PI / 180, a2 = -12 * Math.PI / 180;
          out.push(h.fleche(`M ${f(cx + Ra * Math.cos(a1))} ${f(cy + Ra * Math.sin(a1))} A ${f(Ra)} ${f(Ra)} 0 0 1 ${f(cx + Ra * Math.cos(a2))} ${f(cy + Ra * Math.sin(a2))}`, h.a.contour));
          return out.join('\n');
        },
        renvois: z => {
          const cx = z.l / 2, cy = z.h * 0.48, R = Math.min(z.l, z.h) * 0.34, r0 = R * 0.72, Ra = R + 26;
          const t = 210 * Math.PI / 180, am = -56 * Math.PI / 180;
          return [
            { n: 7, rond: [cx - R - 4, cy + R + 22], cible: [cx + r0 * Math.cos(t) - 4, cy - r0 * Math.sin(t) + 6], texte: 'trois écrous en triangle' },
            { n: 8, rond: [cx + (Ra + 22) * Math.cos(am), cy + (Ra + 22) * Math.sin(am)], cible: [cx + Ra * Math.cos(am), cy + Ra * Math.sin(am)], texte: 'un quart de tour par passage' },
          ];
        },
      },

      sable: {
        titre: 'Sur un doigt de sable, en coupe',
        dessin: z => {
          const g = gB(z), out = [g.p.svg];
          const xl2 = g.cx - g.W2 / 2, xr2 = g.cx + g.W2 / 2;
          // le sable au fond du grand chaudron
          out.push(sable([[xl2 + g.e2, g.yS], [xr2 - g.e2, g.yS], [xr2 - g.e2, g.yf2], [xl2 + g.e2, g.yf2]]));
          out.push(h.ligne(xl2 + g.e2, g.yS, xr2 - g.e2, g.yS, h.a.detail));
          // le grand chaudron, à même le poêle, sans couvercle
          const e2 = g.e2, rc = 12, yr2 = g.yb2 - g.H2;
          out.push(h.path(`M ${f(xl2)} ${f(yr2)} L ${f(xl2)} ${f(g.yb2 - rc)} Q ${f(xl2)} ${f(g.yb2)} ${f(xl2 + rc)} ${f(g.yb2)} L ${f(xr2 - rc)} ${f(g.yb2)} Q ${f(xr2)} ${f(g.yb2)} ${f(xr2)} ${f(g.yb2 - rc)} L ${f(xr2)} ${f(yr2)} L ${f(xr2 - e2)} ${f(yr2)} L ${f(xr2 - e2)} ${f(g.yf2)} L ${f(xl2 + e2)} ${f(g.yf2)} L ${f(xl2 + e2)} ${f(yr2)} Z`, h.a.plein));
          // le chaudron de cuisson, posé dans le sable
          const c = chaudron(g.cx, g.yb1, g.W1, g.H1, 6);
          out.push(c.svg);
          // la miche à même le fond fariné
          const wl = g.W1 * 0.64, hl = g.H1 * 0.56;
          out.push(h.ligne(g.cx - wl / 2 - 8, c.yf - 1.2, g.cx + wl / 2 + 8, c.yf - 1.2, farine));
          out.push(miche(g.cx, c.yf - 2.4, wl, hl));
          // la chaleur du feu, étalée par le sable
          [-0.24, 0.24].forEach(u => out.push(chaleur(`M ${f(g.cx + u * g.W2)} ${f(g.p.ySole - 45)} L ${f(g.cx + u * g.W2)} ${f(g.p.yT + eT + 3)}`)));
          return out.join('\n');
        },
        renvois: z => {
          const g = gB(z), c = chaudron(g.cx, g.yb1, g.W1, g.H1, 6), xr = z.l - 16, xr2 = g.cx + g.W2 / 2;
          const wl = g.W1 * 0.64, hl = g.H1 * 0.56;
          return [
            { n: 9, rond: [xr, c.yf - hl - 4], cible: [g.cx + wl * 0.36, c.yf - hl * 0.7], texte: 'miche sur le fond fariné' },
            { n: 10, rond: [xr, g.yb2 - g.H2 - 6], cible: [xr2 - 22, g.yS + 7], texte: 'un doigt de sable sec' },
            { n: 11, rond: [xr, g.yb2 - 30], cible: [xr2 - 3, g.yb2 - 3], texte: 'chaudron plus large' },
          ];
        },
      },

      cloche: {
        titre: 'La cloche de chaudière, en coupe',
        dessin: z => {
          const g = gC(z), out = [g.p.svg];
          out.push(troisEcrous(g.cx, g.p.yT, g.r0));
          out.push(h.rect(g.cx - g.Wp / 2, g.yP, g.Wp, g.eP, h.a.hachure('metal', 'arete')));
          const m = moule(g.cx, g.yP, g.wm, g.hm, g.dome);
          out.push(m.svg);
          const cl = cloche(g.cx, g.yP, g.Wb, g.Wt, g.Hb);
          out.push(cl.svg);
          // l'air chaud qui monte de la plaque autour du pain et reste sous la cloche
          [-1, 1].forEach(s => {
            const x0 = g.cx + s * (m.wt / 2 + 12), yA = g.yP - 6;
            out.push(chaleur(`M ${f(x0)} ${f(yA)} C ${f(x0 + s * 4)} ${f(m.yDome + 4)} ${f(g.cx + s * m.wt * 0.4)} ${f(m.yDome - 16)} ${f(g.cx + s * 12)} ${f(m.yDome - 17)}`));
          });
          return out.join('\n');
        },
        renvois: z => {
          const g = gC(z), m = moule(g.cx, g.yP, g.wm, g.hm, g.dome), cl = cloche(g.cx, g.yP, g.Wb, g.Wt, g.Hb), xL = 22, xr = z.l - 14;
          const yB = cl.yTop + g.Hb * 0.22;
          return [
            { n: 12, rond: [xL, yB - 10], cible: [cl.xParoi(-1, yB), yB], texte: 'grande chaudière renversée' },
            { n: 13, rond: [xL, m.yh - 8], cible: [g.cx - m.wt / 2 + 12, m.yh - 8], texte: 'miche dans son moule' },
            { n: 14, rond: [xL, g.yP - 14], cible: [g.cx - g.Wp / 2 + 5, g.yP + 3], texte: 'plaque ou poêlon de fonte' },
            { n: 15, rond: [xr, g.yP - 20], cible: [g.cx + g.r0 * 0.87 + 7, g.p.yT - 4.5], texte: 'écrous ou doigt de sable' },
            { n: 16, rond: [xr, g.p.yT + 30], cible: [z.l - 34, g.p.yT + 6], texte: 'zone tiède, loin du feu' },
          ];
        },
      },
    },
  };
};
