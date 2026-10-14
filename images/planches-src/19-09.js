// Planche 19-09 — La graisse d'os : casser, lire la moelle, bouillir, lever la galette.
// Chapitre 24, « Ouvrir les os, et dans le bon ordre », « Casser, ne pas couper » et
// « Faire de la graisse d'os, en entier ».
//
// La charte : à l'ombre, la face de droite de la bille et le flanc de la galette levée ; le
// creux du chaudron au-dessus du bouillon, vu par la coupe, en gris loin ; l'os coupé et tramé
// reste sans gris. Le rouge : le coup de hache, le bâton qui remue, la galette qu'on lève (un
// geste par vue) ; le point d'impact, au milieu du fût, sous le dos plat, cerclé. La flèche du
// fémur vers les morceaux courts n'est pas un geste : elle reste noire.
module.exports = (h) => {
  const f = n => n.toFixed(1);
  const blanc = at => at.replace('fill="none"', 'fill="#fff"');
  const poly = (pts, ferme = true) => pts.map((p, i) => (i ? 'L' : 'M') + f(p[0]) + ',' + f(p[1])).join(' ') + (ferme ? ' Z' : '');
  const bez = (c, t) => {
    const u = 1 - t;
    return [0, 1].map(k => u * u * u * c[0][k] + 3 * u * u * t * c[1][k] + 3 * u * t * t * c[2][k] + t * t * t * c[3][k]);
  };
  const echant = (c, n = 24) => Array.from({ length: n + 1 }, (_, i) => bez(c, i / n));
  const C = (...p) => 'C' + p.map(q => `${f(q[0])},${f(q[1])}`).join(' ');

  // Morceau irrégulier, contour lissé par des quadratiques entre les milieux.
  const bloc = (cx, cy, rx, ry, k = [1, 0.86, 0.97, 0.8, 1.04, 0.9, 0.84], rot = 0) => {
    const n = k.length;
    const p = k.map((m, i) => {
      const t = rot + (i / n) * Math.PI * 2;
      return [cx + Math.cos(t) * rx * m, cy + Math.sin(t) * ry * m];
    });
    const mi = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    const m0 = mi(p[n - 1], p[0]);
    let d = `M${f(m0[0])},${f(m0[1])}`;
    for (let i = 0; i < n; i++) {
      const q = mi(p[i], p[(i + 1) % n]);
      d += ` Q${f(p[i][0])},${f(p[i][1])} ${f(q[0])},${f(q[1])}`;
    }
    return d + ' Z';
  };
  // Bout d'os spongieux cassé : les alvéoles se voient sur la cassure.
  const spongieux = (cx, cy, rx, ry, k, rot) => {
    const d = bloc(cx, cy, rx, ry, k, rot);
    return h.path(d, h.a.blanc) + h.path(d, h.a.hachure('gravier'));
  };
  const pierre = (cx, cy, rx, ry, k, rot) => {
    const d = bloc(cx, cy, rx, ry, k, rot);
    // une roche : contour franc et trois fissures, pas de motif
    const fis = [[-0.5, -0.35, -0.15, 0.1], [0.25, -0.55, 0.45, -0.1], [-0.15, 0.35, 0.3, 0.5]]
      .map(([a1, b1, a2, b2]) => h.path(`M${f(cx + a1 * rx)},${f(cy + b1 * ry)} Q${f(cx + (a1 + a2) / 2 * rx + 3)},${f(cy + (b1 + b2) / 2 * ry)} ${f(cx + a2 * rx)},${f(cy + b2 * ry)}`, h.a.detail));
    return [h.path(d, blanc(h.a.arete)), ...fis].join('\n');
  };
  // Tronçon de fût, vu de biais : le bout droit montre la paroi et la moelle.
  const troncon = (cx, cy, L, r, ang) => {
    const co = Math.cos(ang), si = Math.sin(ang), er = r * 0.42;
    const m = p => [cx + p[0] * co - p[1] * si, cy + p[0] * si + p[1] * co];
    const arc = (x0, rx, ry, t0, t1, n = 12) => Array.from({ length: n + 1 }, (_, i) => {
      const t = t0 + (t1 - t0) * i / n;
      return [x0 + rx * Math.cos(t), ry * Math.sin(t)];
    });
    const corps = [...arc(L / 2, er, r, -Math.PI / 2, Math.PI / 2), ...arc(-L / 2, er, r, Math.PI / 2, Math.PI * 1.5)].map(m);
    const bout = arc(L / 2, er, r, 0, Math.PI * 2, 24).map(m);
    const moelle = arc(L / 2, er * 0.58, r * 0.58, 0, Math.PI * 2, 20).map(m);
    return [h.chemin(corps, blanc(h.a.arete), true), h.chemin(bout, blanc(h.a.arete), true), h.chemin(moelle, h.a.detail, true)].join('\n');
  };
  const flamme = (x, y, l, ht, pen = 0) =>
    h.path(`M${f(x - l / 2)},${f(y)} C${f(x - l / 2 - 2)},${f(y - ht * 0.45)} ${f(x + pen - l * 0.1)},${f(y - ht * 0.6)} ${f(x + pen)},${f(y - ht)} ` +
      `C${f(x + pen + l * 0.25)},${f(y - ht * 0.55)} ${f(x + l / 2 + 3)},${f(y - ht * 0.4)} ${f(x + l / 2)},${f(y)}`, h.a.arete);
  const buche = (x, y, r) => [h.cercle(x, y, r, blanc(h.a.arete)), h.cercle(x, y, r * 0.6, h.a.detail), h.cercle(x, y, r * 0.25, h.a.detail)].join('\n');

  // Chaudron en coupe : paroi pleine, fond épais. Rend la paroi et la courbe intérieure gauche.
  const chaudron = (cx, yr, yb, a) => {
    const d = yb - yr;
    const mir = p => [2 * cx - p[0], p[1]];
    const oL = [[cx - a - 3, yr], [cx - a * 1.14, yr + d * 0.35], [cx - a * 1.1, yb], [cx - a * 0.55, yb]];
    const iL = [[cx - a + 1, yr], [cx - a * 1.14 + 4, yr + d * 0.35], [cx - a * 1.1 + 5, yb - 8], [cx - a * 0.55, yb - 8]];
    const paroi = `M${f(oL[0][0])},${f(oL[0][1])} ${C(oL[1], oL[2], oL[3])} L${f(mir(oL[3])[0])},${f(yb)} ${C(mir(oL[2]), mir(oL[1]), mir(oL[0]))} ` +
      `L${f(mir(iL[0])[0])},${f(yr)} ${C(mir(iL[1]), mir(iL[2]), mir(iL[3]))} L${f(iL[3][0])},${f(iL[3][1])} ${C(iL[2], iL[1], iL[0])} Z`;
    const eau = yw => {
      const g = echant(iL, 40).filter(p => p[1] >= yw);
      const dr = g.map(mir).reverse();
      return [[g[0][0], yw], ...g, ...dr, [dr[dr.length - 1][0], yw]];
    };
    const bordX = y => { const g = echant(iL, 40).find(p => p[1] >= y); return g ? g[0] : cx - a; };
    return {
      paroi: [h.path(paroi, h.a.plein), h.rect(cx - a - 7, yr - 3, 9, 4, h.a.plein), h.rect(cx + a - 2, yr - 3, 9, 4, h.a.plein)].join('\n'),
      eau, bordX,
      // le creux au-dessus du liquide, vu par la coupe
      vide: yw => {
        const g = echant(iL, 40).filter(p => p[1] < yw);
        return [...g, [bordX(yw), yw], [2 * cx - bordX(yw), yw], ...g.map(mir).reverse()];
      },
    };
  };

  // ─── Vue 1 : casser au plat ───────────────────────────────────────────────────────────
  const geoA = z => {
    const W = z.l, H = z.h;
    const rx = Math.min(92, W * 0.23), ry = rx * 0.2;
    const G = H - 6 - ry;
    const cx = W * 0.36;
    const c = Math.min(1, (H - 40) / 190);
    const yt = 30 + 84 * c;
    const e = 15, s = 7;
    const cyb = yt - 13;
    const px = cx, py = cyb - s + 1;
    const T = (x, y) => [px + x * c, py + y * c];
    return { W, H, rx, ry, G, cx, c, yt, e, s, cyb, px, py, T };
  };
  const osLong = (xa, xb, cy, s, e, k) => {
    const m = (xa + xb) / 2;
    return `M${f(xa)},${f(cy)} C${f(xa)},${f(cy - e * 1.2)} ${f(xa + k * 0.8)},${f(cy - e * 1.1)} ${f(xa + k)},${f(cy - s)} ` +
      `Q${f(m)},${f(cy - s + 2)} ${f(xb - k)},${f(cy - s)} ` +
      `C${f(xb - k * 0.8)},${f(cy - e * 1.1)} ${f(xb)},${f(cy - e * 1.2)} ${f(xb)},${f(cy)} ` +
      `C${f(xb)},${f(cy + e * 1.2)} ${f(xb - k * 0.8)},${f(cy + e * 1.1)} ${f(xb - k)},${f(cy + s)} ` +
      `Q${f(m)},${f(cy + s - 2)} ${f(xa + k)},${f(cy + s)} ` +
      `C${f(xa + k * 0.8)},${f(cy + e * 1.1)} ${f(xa)},${f(cy + e * 1.2)} ${f(xa)},${f(cy)} Z`;
  };

  // ─── Vue 2 : l'os témoin ──────────────────────────────────────────────────────────────
  const geoB = z => {
    const W = z.l, H = z.h;
    return { W, H, y1: H * 0.3, y2: H * 0.68, xa: 12, xb: W * 0.46, s: 12, e: 17, k: 26, m: 8 };
  };
  const osCasse = (xa, xb, cy, s, e, k) =>
    `M${f(xa)},${f(cy)} C${f(xa)},${f(cy - e * 1.2)} ${f(xa + k * 0.8)},${f(cy - e * 1.1)} ${f(xa + k)},${f(cy - s)} ` +
    `L${f(xb)},${f(cy - s)} L${f(xb + 5)},${f(cy - s * 0.35)} L${f(xb - 3)},${f(cy + s * 0.1)} L${f(xb + 6)},${f(cy + s * 0.55)} L${f(xb + 1)},${f(cy + s)} ` +
    `L${f(xa + k)},${f(cy + s)} C${f(xa + k * 0.8)},${f(cy + e * 1.1)} ${f(xa)},${f(cy + e * 1.2)} ${f(xa)},${f(cy)} Z`;

  // ─── Vue 3 : le fût et les bouts ──────────────────────────────────────────────────────
  const geoC = z => {
    const W = z.l, H = z.h;
    const x0 = 16, Lf = W * 0.5, cy = H * 0.5;
    const xp0 = x0 + Lf + 70;
    return { W, H, x0, Lf, cy, xp0 };
  };

  // ─── Vues 4 et 5 : le chaudron ────────────────────────────────────────────────────────
  const geoD = z => {
    const W = z.l, H = z.h;
    const G = H - 12, yb = G - 46, yr = yb - H * 0.42, cx = W * 0.44, a = W * 0.25;
    const yw = yr + (yb - yr) * 0.14;
    const b0 = [cx + a + 44, yr - 50], b1 = [cx + a * 0.15, yb - 12];
    return { W, H, G, yb, yr, cx, a, yw, b0, b1 };
  };
  const geoE = z => {
    const W = z.l, H = z.h;
    const G = H - 40, yb = G, yr = yb - H * 0.42, cx = W * 0.56, a = W * 0.25;
    const yg = yr + 16;
    const rx = a * 0.92, ry = 10, th = 12, ang = -20 * Math.PI / 180;
    const piv = [cx - a * 0.95, yg + 4];
    const G2 = (x, y) => {
      const lx = x + rx, co = Math.cos(ang), si = Math.sin(ang);
      return [piv[0] + lx * co - y * si, piv[1] + lx * si + y * co];
    };
    return { W, H, G, yb, yr, cx, a, yg, rx, ry, th, G2 };
  };

  return {
    ref: '19-09',
    titre: 'Casser les os et faire la graisse d’os',
    desc: 'Cinq vues. Un os de patte posé sur une bille, frappé au milieu du fût avec le dos plat de la hache, tranchant en haut. ' +
      'Deux os ouverts : l’un laisse sortir une moelle blanche et ferme d’une pièce, l’autre une moelle rouge et gélatineuse qui coule. ' +
      'Un fémur en coupe : la moelle dans le fût, le gras caché dans les bouts spongieux, et les morceaux courts qu’on en tire avec des vertèbres. ' +
      'Un chaudron à fond épais sur trois pierres, plein d’eau à petits bouillons, qu’on remue jusqu’au fond. ' +
      'Au matin, dehors sur la neige, les os sortis : la galette de gras figé se lève d’une pièce au-dessus du bouillon.',
    format: 'pleine',
    disposition: [['casser', 'temoin'], ['os'], ['bouillir', 'lever']],
    hauteurs: [1.1, 0.72, 1.1],
    largeurs: [[3, 2], [1], [1, 1]],
    vues: {
      casser: {
        titre: 'Casser au plat',
        dessin: z => {
          const { W, rx, ry, G, cx, c, yt, e, s, cyb, px, py, T } = geoA(z);
          const tete = 'M-12,0 L12,0 L12,-30 Q13,-52 27,-76 Q0,-88 -27,-76 Q-13,-52 -12,-30 Z'
            .replace(/(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/g, (_, x, y) => T(+x, +y).map(f).join(','));
          const biseau = `M${T(22, -68).map(f)} Q${T(0, -79).map(f)} ${T(-22, -68).map(f)}`;
          const oeil = `M${T(-12, -30).map(f)} L${T(12, -30).map(f)}`;
          const ey = py - 17 * c, xe = W - 18, pente = -0.12, ye = ey + (xe - px) * pente;
          const nM = 30, Lm = xe - px;
          const demi = t => (5.6 - 1.2 * Math.sin(Math.PI * Math.min(1, t / 0.86)) + (t > 0.86 ? 2.6 * Math.sin(Math.PI * (t - 0.86) / 0.28) : 0)) * c;
          const axe = t => [px + t * Lm, ey + t * Lm * pente - 3 * c * Math.sin(Math.PI * t)];
          const haut = Array.from({ length: nM + 1 }, (_, i) => { const t = i / nM, q = axe(t); return [q[0], q[1] - demi(t)]; });
          const bas = Array.from({ length: nM + 1 }, (_, i) => { const t = 1 - i / nM, q = axe(t); return [q[0], q[1] + demi(t)]; });
          const rb = demi(1), qb = axe(1);
          const cap = Array.from({ length: 9 }, (_, i) => { const t = -Math.PI / 2 + Math.PI * (i + 1) / 10; return [qb[0] + rb * 0.7 * Math.cos(t), qb[1] + rb * Math.sin(t)]; });
          const manche = [...haut, ...cap, ...bas];
          const corps = `M${f(cx - rx)},${f(yt)} L${f(cx - rx)},${f(G)} A${f(rx)},${f(ry)} 0 0 0 ${f(cx + rx)},${f(G)} L${f(cx + rx)},${f(yt)} Z`;
          const ecorce = [-0.82, -0.45, -0.05, 0.38, 0.74].map(k => {
            const x = cx + k * rx, dy = ry * Math.sqrt(1 - k * k);
            return h.path(`M${f(x)},${f(yt + dy + 5)} Q${f(x + 3)},${f((yt + G) / 2 + dy)} ${f(x)},${f(G + dy - 5)}`, h.a.fin);
          });
          const xa = cx - rx * 0.86, xb = cx + rx * 0.86;
          const av = x => ry * Math.sqrt(Math.max(0, 1 - ((x - cx) / rx) ** 2)), xs = [];
          for (let x = cx + 0.45 * rx; x <= cx + rx + 0.01; x += rx / 40) xs.push(x);
          return [
            h.ligne(cx - rx - 40, G + ry, cx + rx + 40, G + ry, h.a.arete),
            h.path(corps, h.a.blanc),
            h.chemin([...xs.map(x => [x, yt + av(x)]), ...xs.slice().reverse().map(x => [x, G + av(x)])], h.a.ombre, true),
            h.path(corps, h.a.arete),
            ...ecorce,
            h.ellipse(cx, yt, rx, ry, blanc(h.a.arete)),
            h.ellipse(cx, yt, rx * 0.66, ry * 0.66, h.a.detail),
            h.ellipse(cx, yt, rx * 0.33, ry * 0.33, h.a.detail),
            h.ligne(cx + rx * 0.1, yt, cx + rx * 0.8, yt - ry * 0.45, h.a.fin),
            // l'os de patte, qui porte sur ses deux bouts
            h.path(osLong(xa, xb, cyb, s, e, 30), blanc(h.a.contour)),
            h.ligne(xa, cyb, xa + 5, cyb, h.a.detail), h.ligne(xb, cyb, xb - 5, cyb, h.a.detail),
            h.path(`M${f(px + 1)},${f(cyb + s - 1)} L${f(px - 2)},${f(cyb + 2)} L${f(px + 2)},${f(cyb - 2)}`, h.a.detail),
            // la hache, tranchant en haut, le dos plat sur le fût
            h.chemin(manche, blanc(h.a.arete), true),
            h.path(tete, blanc(h.a.contour)),
            h.path(biseau, h.a.detail),
            h.path(oeil, h.a.detail),
            h.geste(`M${f(px - 42 * c)},${f(py - 94 * c)} Q${f(px - 58 * c)},${f(py - 60 * c)} ${f(px - 36 * c)},${f(py - 30 * c)}`),
            // le point d'impact : au milieu du fût, sous le dos plat
            h.controle(px, py + 2, 12),
          ].join('\n');
        },
        renvois: z => {
          const { W, rx, cx, c, yt, px, py, T } = geoA(z);
          const pointe = T(-16, -80);
          return [
            { n: 1, rond: [px - 92, py - 34], cible: [px - 9 * c, py - 1], texte: 'dos plat, au milieu du fût' },
            { n: 2, rond: [px + 70, Math.max(18, pointe[1] + 6)], cible: [px + 14 * c, pointe[1] + 2], texte: 'le tranchant reste en haut' },
            { n: 3, rond: [Math.min(W - 16, cx + rx + 36), yt + 40], cible: [cx + rx * 0.6, yt + 34], texte: 'bille ou pierre plate' },
          ];
        },
      },
      temoin: {
        titre: 'L’os témoin',
        dessin: z => {
          const { W, y1, y2, xa, xb, s, e, k, m } = geoB(z);
          const xs = xb - 2, xe = W - 16;
          const os = cy => [
            h.path(osCasse(xa, xb, cy, s, e, k), blanc(h.a.contour)),
            h.ligne(xa, cy, xa + 5, cy, h.a.detail),
            h.ligne(xa + k + 4, cy - m, xb - 4, cy - m, h.a.cache), h.ligne(xa + k + 4, cy + m, xb - 4, cy + m, h.a.cache),
          ].join('\n');
          // moelle ferme, sortie d'une pièce et qui tient sa forme
          const xf = xb + 16;
          const ferme = `M${f(xf)},${f(y1 - m + 2)} Q${f(xf)},${f(y1 - m)} ${f(xf + 4)},${f(y1 - m)} L${f(xe - m)},${f(y1 - m)} ` +
            `A${m},${m} 0 0 1 ${f(xe - m)},${f(y1 + m)} L${f(xf + 4)},${f(y1 + m)} Q${f(xf)},${f(y1 + m)} ${f(xf)},${f(y1 + m - 2)} ` +
            `Q${f(xf + 4)},${f(y1)} ${f(xf)},${f(y1 - m + 2)} Z`;
          const grains = [h.ligne(xf + 10, y1 - m * 0.4, xe - m - 6, y1 - m * 0.4, h.a.fin)];
          // moelle rouge et gélatineuse, qui s'affaisse et coule
          const yy = y2;
          const mou = `M${f(xs)},${f(yy - m)} C${f(xs + 18)},${f(yy - m - 1)} ${f(xs + 30)},${f(yy - m + 3)} ${f(xs + 36)},${f(yy + 2)} ` +
            `C${f(xs + 42)},${f(yy + m + 2)} ${f(xs + 36)},${f(yy + m + 14)} ${f(xs + 30)},${f(yy + m + 22)} ` +
            `C${f(xs + 27)},${f(yy + m + 26)} ${f(xs + 23)},${f(yy + m + 22)} ${f(xs + 22)},${f(yy + m + 14)} ` +
            `C${f(xs + 20)},${f(yy + m + 6)} ${f(xs + 12)},${f(yy + m + 1)} ${f(xs)},${f(yy + m)}`;
          const gx = xs + 28, gy = yy + m + 36;
          const goutte = `M${f(gx)},${f(gy - 6)} C${f(gx + 4)},${f(gy - 1)} ${f(gx + 4)},${f(gy + 4)} ${f(gx)},${f(gy + 4)} C${f(gx - 4)},${f(gy + 4)} ${f(gx - 4)},${f(gy - 1)} ${f(gx)},${f(gy - 6)} Z`;
          return [
            os(y1),
            h.path(ferme, blanc(h.a.arete)), ...grains,
            os(y2),
            h.path(mou + ' Z', h.a.blanc), h.path(mou + ' Z', h.a.hachure('grillage', 'aucun')), h.path(mou, h.a.arete),
            h.path(goutte, h.a.blanc), h.path(goutte, h.a.hachure('grillage')),
          ].join('\n');
        },
        renvois: z => {
          const { W, y1, y2, xb, s, m } = geoB(z);
          const xf = xb + 16;
          return [
            { n: 4, rond: [xb - 22, y1 - 40], cible: [xb + 3, y1 - s + 3], texte: 'os dégelé près du feu' },
            { n: 5, rond: [W - 22, y1 - 36], cible: [xf + 36, y1 - m + 1], texte: 'blanche et ferme : du gras' },
            { n: 6, rond: [W - 22, y2 + 30], cible: [xb + 34, y2 + 8], texte: 'rouge, gélatineuse : vide' },
          ];
        },
      },
      os: {
        titre: 'Le fût et les bouts',
        dessin: z => {
          const { W, x0, Lf, cy, xp0 } = geoC(z);
          const P = (u, v) => `${f(x0 + u)},${f(cy + v)}`;
          const ext = `M${P(4, -8)} C${P(0, -30)} ${P(22, -40)} ${P(36, -30)} C${P(42, -26)} ${P(46, -22)} ${P(52, -24)} ` +
            `C${P(60, -30)} ${P(70, -28)} ${P(74, -16)} Q${P(Lf * 0.5, -11)} ${P(Lf - 70, -15)} ` +
            `C${P(Lf - 40, -18)} ${P(Lf - 20, -30)} ${P(Lf - 8, -24)} C${P(Lf + 2, -18)} ${P(Lf + 2, -4)} ${P(Lf - 4, 0)} ` +
            `C${P(Lf + 2, 6)} ${P(Lf + 2, 20)} ${P(Lf - 8, 26)} C${P(Lf - 20, 30)} ${P(Lf - 40, 18)} ${P(Lf - 70, 15)} ` +
            `Q${P(Lf * 0.5, 11)} ${P(74, 15)} C${P(60, 20)} ${P(44, 20)} ${P(36, 14)} C${P(28, 12)} ${P(22, 16)} ${P(12, 12)} ` +
            `C${P(2, 8)} ${P(0, 0)} ${P(4, -8)} Z`;
          const paroiH = `M${P(74, -16)} Q${P(Lf * 0.5, -11)} ${P(Lf - 70, -15)} L${P(Lf - 96, -7.5)} L${P(100, -7.5)} Z`;
          const paroiB = `M${P(74, 15)} Q${P(Lf * 0.5, 11)} ${P(Lf - 70, 15)} L${P(Lf - 96, 7.5)} L${P(100, 7.5)} Z`;
          const moelle = `M${P(100, -7.5)} L${P(Lf - 96, -7.5)} Q${P(Lf - 86, 0)} ${P(Lf - 96, 7.5)} L${P(100, 7.5)} Q${P(90, 0)} ${P(100, -7.5)} Z`;
          // où casser : petites fêlures en zigzag au contour, comme dans « Casser au plat »
          const bords = [[58, -24, 15], [118, -13.5, 13], [Lf * 0.5 + 4, -11, 11], [Lf - 116, -13, 13], [Lf - 50, -18, 17]];
          // où casser : un petit coin plein de chaque côté du fût, pointé sur le contour
          const coin = (u, e, sg) => h.chemin([[x0 + u - 3.5, cy + e - sg * 10], [x0 + u + 3.5, cy + e - sg * 10], [x0 + u, cy + e - sg * 4]], h.a.plein, true);
          const coupes = bords.flatMap(([u, t, b]) => [coin(u, t, 1), coin(u, b, -1)]);
          // la vertèbre, vue de bout : corps rond en bas, arc en anneau autour du canal,
          // apophyse épineuse droite au-dessus, apophyses transverses de chaque côté
          const vx = xp0 + 62, vy = cy + 12;
          const V = (x, y) => `${f(vx + x)},${f(vy + y)}`;
          const corpsV = `M${V(0, -8)} C${V(9, -9)} ${V(15, -4)} ${V(15, 3)} C${V(15, 11)} ${V(8, 15)} ${V(0, 15)} ` +
            `C${V(-8, 15)} ${V(-15, 11)} ${V(-15, 3)} C${V(-15, -4)} ${V(-9, -9)} ${V(0, -8)} Z`;
          const ca = vy - 18;
          const arcV = `M${V(-11, -5)} C${V(-14, -10)} ${V(-16, -14)} ${V(-20, -16)} L${V(-33, -21)} Q${V(-37, -24)} ${V(-33, -27)} ` +
            `L${V(-15, -24)} C${V(-11, -29)} ${V(-6, -30)} ${V(-4, -32)} L${V(-2.5, -52)} Q${V(0, -55)} ${V(2.5, -52)} L${V(4, -32)} ` +
            `C${V(6, -30)} ${V(11, -29)} ${V(15, -24)} L${V(33, -27)} Q${V(37, -24)} ${V(33, -21)} L${V(20, -16)} ` +
            `C${V(16, -14)} ${V(14, -10)} ${V(11, -5)} Z`;
          return [
            h.path(ext, h.a.blanc), h.path(ext, h.a.hachure('gravier', 'aucun')),
            h.path(paroiH, h.a.blanc), h.path(paroiH, h.a.hachure('bois', 'aucun')),
            h.path(paroiB, h.a.blanc), h.path(paroiB, h.a.hachure('bois', 'aucun')),
            h.path(moelle, blanc(h.a.arete)),
            h.path(ext, h.a.contour),
            ...coupes,
            h.fleche(`M${f(x0 + Lf + 14)},${f(cy)} L${f(xp0 - 8)},${f(cy)}`, h.a.arete),
            // les morceaux courts
            h.path(arcV, blanc(h.a.arete)),
            h.path(corpsV, h.a.blanc), h.path(corpsV, h.a.hachure('gravier')), h.path(corpsV, h.a.arete),
            h.ellipse(vx, ca, 6, 5.5, blanc(h.a.arete)),
            spongieux(xp0 + 124, cy + 2, 16, 12, [1, 0.9, 0.8, 1, 0.92, 0.86, 0.95], 0.4),
            spongieux(xp0 + 172, cy - 6, 17, 12, undefined, 1.2),
            troncon(xp0 + 24, cy + 26, 36, 10, -0.2),
            spongieux(xp0 + 102, cy + 28, 20, 13, [1, 0.84, 0.95, 0.9, 1.02, 0.86, 0.9], 0.2),
            troncon(xp0 + 152, cy + 28, 32, 9, 0.2),
            spongieux(xp0 + 194, cy + 22, 13, 10, undefined, 0.7),
          ].join('\n');
        },
        renvois: z => {
          const { H, x0, Lf, cy, xp0 } = geoC(z);
          return [
            { n: 7, rond: [x0 + Lf * 0.36, cy + 38], cible: [x0 + Lf * 0.36, cy + 3], texte: 'fût : la moelle, qui se voit' },
            { n: 8, rond: [x0 + Lf - 40, cy - 42], cible: [x0 + Lf - 14, cy - 12], texte: 'bout spongieux : gras caché' },
            { n: 9, rond: [xp0 + 140, 18], cible: [xp0 + 68, cy + 14], texte: 'vertèbres, bassin, sternum' },
          ];
        },
      },
      bouillir: {
        titre: 'À petits bouillons',
        dessin: z => {
          const { W, G, yb, yr, cx, a, yw, b0, b1 } = geoD(z);
          const ch = chaudron(cx, yr, yb, a);
          const nx = -(b1[1] - b0[1]), ny = b1[0] - b0[0], nl = Math.hypot(nx, ny);
          const o = [nx / nl * 2.6, ny / nl * 2.6];
          const baton = [[b0[0] + o[0], b0[1] + o[1]], [b1[0] + o[0], b1[1] + o[1]], [b1[0] - o[0], b1[1] - o[1]], [b0[0] - o[0], b0[1] - o[1]]];
          const ys = yr - 14, ts = (ys - b0[1]) / (b1[1] - b0[1]), sx = b0[0] + ts * (b1[0] - b0[0]);
          const bulles = [[-30, 20, 2.2], [-27, 36, 1.6], [-32, 50, 1.4], [22, 14, 2.2], [26, 30, 1.7], [-58, 24, 1.8], [-4, 26, 1.5]];
          return [
            h.ligne(8, G, W - 8, G, h.a.arete),
            buche(cx - 14, G - 8, 8), buche(cx + 13, G - 8, 8),
            flamme(cx - 20, G - 14, 16, 26, 3), flamme(cx + 3, G - 15, 18, 31, -2), flamme(cx + 24, G - 14, 14, 22, -3),
            pierre(cx - a * 0.8, G - 24, 26, 24, [1, 0.94, 0.9, 1, 0.96, 0.92, 0.97], 0.3),
            pierre(cx + a * 0.8, G - 24, 25, 24, [0.96, 1, 0.92, 0.95, 1, 0.9, 0.94], 1.1),
            h.chemin(ch.vide(yw), h.a.loin, true),
            h.chemin(ch.eau(yw), h.a.hachure('eau', 'aucun'), true),
            troncon(cx - a * 0.42, yb - 22, 34, 8, 0.2),
            spongieux(cx + a * 0.12, yb - 21, 15, 10, undefined, 0.5),
            spongieux(cx - a * 0.72, yb - 16, 11, 8, [1, 0.9, 0.8, 1, 0.92, 0.86, 0.95], 1),
            troncon(cx + a * 0.55, yb - 30, 26, 7, -0.5),
            spongieux(cx - a * 0.1, yb - 44, 12, 9, [1, 0.84, 0.95, 0.9, 1.02, 0.86, 0.9], 0.2),
            troncon(cx - a * 0.5, yb - 50, 24, 7, 0.6),
            ...bulles.map(([dx, dy, r]) => h.cercle(cx + dx, yw + dy, r, blanc(h.a.fin))),
            h.ligne(ch.bordX(yw), yw, 2 * cx - ch.bordX(yw), yw, h.a.arete),
            ...[-30, 22].map(dx => h.path(`M${f(cx + dx - 4)},${f(yw)} A4,3 0 0 1 ${f(cx + dx + 4)},${f(yw)}`, h.a.detail)),
            ch.paroi,
            ...[-26, 14].map((dx, i) => {
              const x = cx + dx;
              return h.path(`M${f(x)},${f(yr - 8)} C${f(x - 8)},${f(yr - 20)} ${f(x + 8)},${f(yr - 30)} ${f(x)},${f(yr - 42 - i * 6)}`, h.a.cache);
            }),
            h.chemin(baton, blanc(h.a.arete), true),
            h.geste(`M${f(sx - 16)},${f(ys - 2)} A16,5 0 0 0 ${f(sx + 16)},${f(ys - 2)}`),
          ].join('\n');
        },
        renvois: z => {
          const { W, yb, cx, a, yw, b1 } = geoD(z);
          return [
            { n: 10, rond: [16, yw - 6], cible: [cx - 58, yw + 22], texte: 'petits bouillons continus' },
            { n: 11, rond: [W - 16, yb - 6], cible: [b1[0] + 2, b1[1] + 2], texte: 'remuer jusqu’au fond' },
            { n: 12, rond: [16, yb + 22], cible: [cx - a * 0.3, yb - 3], texte: 'fond épais, 8 L et plus' },
          ];
        },
      },
      lever: {
        titre: 'Au matin',
        dessin: z => {
          const { W, H, G, yb, yr, cx, a, yg, rx, ry, th, G2 } = geoE(z);
          const ch = chaudron(cx, yr, yb, a);
          const neige = `M4,${f(G)} Q${f(W * 0.25)},${f(G - 3)} ${f(W * 0.5)},${f(G)} T${f(W - 4)},${f(G)} L${f(W - 4)},${f(H - 4)} L4,${f(H - 4)} Z`;
          const ell = (t0, t1, dy, n = 28) => Array.from({ length: n + 1 }, (_, i) => {
            const t = t0 + (t1 - t0) * i / n;
            return G2(rx * Math.cos(t), ry * Math.sin(t) + dy);
          });
          const flanc = [...ell(0, Math.PI, 0), ...ell(Math.PI, 0, th)];
          const dessus = ell(0, Math.PI * 2, 0, 48);
          const bout = G2(rx, 0);
          const surf = yg + 9;
          return [
            h.path(neige, h.a.hachure('neige', 'aucun')),
            h.path(`M4,${f(G)} Q${f(W * 0.25)},${f(G - 3)} ${f(W * 0.5)},${f(G)} T${f(W - 4)},${f(G)}`, h.a.arete),
            h.chemin(ch.vide(surf), h.a.loin, true),
            h.chemin(ch.eau(surf), h.a.hachure('eau', 'aucun'), true),
            h.ligne(ch.bordX(surf), surf, 2 * cx - ch.bordX(surf), surf, h.a.arete),
            ch.paroi,
            // les os sortis, sur la neige
            troncon(34, G - 8, 34, 7, 0.08),
            spongieux(62, G - 7, 11, 7, undefined, 0.6),
            troncon(30, G - 21, 28, 6, -0.22),
            // la galette, levée d'une pièce
            h.chemin(flanc, h.a.arete.replace('fill="none"', h.a.ombre.split(' ')[0]), true),
            h.chemin(ell(0.15, Math.PI - 0.15, th * 0.55, 24), h.a.fin, false),
            h.chemin(dessus, blanc(h.a.contour), true),
            (() => { const m = G2(rx * 0.72, -ry); return h.geste(`M${f(m[0])},${f(m[1] - 4)} L${f(m[0])},${f(m[1] - 30)}`); })(),
          ].join('\n');
        },
        renvois: z => {
          const { W, G, yb, yr, cx, a, rx, G2 } = geoE(z);
          const c = G2(rx * 0.5, 0);
          return [
            { n: 13, rond: [26, G - 58], cible: [36, G - 14], texte: 'os sortis avant la nuit' },
            { n: 14, rond: [W - 18, yr - 40], cible: [c[0] + 8, c[1] - 2], texte: 'galette levée d’une pièce' },
            { n: 15, rond: [W - 18, yb - 16], cible: [cx + a * 0.45, yb - 26], texte: 'bouillon gardé pour la suite' },
          ];
        },
      },
    },
  };
};
