// 90-01 — La pièce en deux couches de gomme (ch. 90, §3 « La pièce tient par ses bords » ;
// §5-C, étapes 13 à 18 ; §9 « Réparer sans chaudron », la gomme mâchée lissée au tison).
// Aucune cote : le chapitre ne donne ni la taille de la pièce ni l'épaisseur des couches.
// La gomme, au charbon, est noire : elle est en aplat noir partout.
// La charte : pas de gris sur les coupes hachurées ni sur la vue de dessus ; le flanc du tison,
// côté bas, à l'ombre. Le rouge : la palette qui presse (le geste) et la ligne où l'eau entre
// sous la pièce, celle que la seconde couche doit couvrir (le point à vérifier). En passant : le
// bout du tison entrait dans le titre de sa vue.

module.exports = (h) => {
  const BL = h.a.blanc.match(/fill="([^"]+)"/)[1];
  const trBlanc = h.a.detail.replace(/stroke="[^"]+"/, `stroke="${BL}"`);
  const ecorce = h.a.hachure('bois', 'aucun');

  // Palette : une cuillère de bois à la lame aplatie. La lame pose sur la surface de A (col)
  // à B (bout) ; le manche part du col vers H.
  function palette(ax, ay, bx, by, hx, hy) {
    const dx = bx - ax, dy = by - ay, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
    let nx = uy, ny = -ux;
    if (ny > 0) { nx = -nx; ny = -ny; }
    const e = 5;
    const o = [];
    const c0 = [ax + nx * e / 2, ay + ny * e / 2];
    const mx = hx - c0[0], my = hy - c0[1], M = Math.hypot(mx, my), vx = mx / M, vy = my / M;
    const w = 4, qx = -vy, qy = vx;
    const manche = [[c0[0] + qx * w - vx * 4, c0[1] + qy * w - vy * 4], [hx + qx * w, hy + qy * w],
      [hx - qx * w, hy - qy * w], [c0[0] - qx * w - vx * 4, c0[1] - qy * w - vy * 4]];
    o.push(h.chemin(manche, h.a.blanc, true));
    o.push(h.chemin(manche, h.a.contour, true));
    o.push(h.path(`M ${c0[0] + vx * 14} ${c0[1] + vy * 14} L ${hx - vx * 10} ${hy - vy * 10}`, h.a.detail));
    const lame = `M ${ax - ux * 3} ${ay - uy * 3} L ${bx - ux * 4} ${by - uy * 4} ` +
      `Q ${bx + ux * 2} ${by + uy * 2} ${bx - ux * 2 + nx * e} ${by - uy * 2 + ny * e} ` +
      `L ${ax - ux * 3 + nx * e} ${ay - uy * 3 + ny * e} Z`;
    o.push(h.path(lame, h.a.blanc));
    o.push(h.path(lame, h.a.contour));
    return o.join('\n');
  }

  // Coupe de la réparation entière, en travers de la déchirure. etape 1 : pièce bordée et
  // pressée ; etape 2 : première couche refroidie, seconde couche chaude sur le pourtour.
  function geomEntiere(z) {
    const cx = z.l / 2, Y = Math.round(z.h * 0.64), tc = 12, g = 5, tp = 9;
    const W = Math.round(z.l * 0.6), p1 = cx - W / 2, p2 = cx + W / 2;
    return { cx, Y, tc, g, tp, W, p1, p2, yp: Y - g - tp, L: 14, R: z.l - 14, bord: Math.round(W * 0.34) };
  }
  function coupeEntiere(z, etape) {
    const G = geomEntiere(z);
    const { cx, Y, tc, g, tp, W, p1, p2, yp, L, R, bord } = G;
    const o = [];
    // Coque d'écorce, ouverte au centre ; bouts cassés.
    const gauche = `M ${L} ${Y} H ${cx - 7} L ${cx - 3} ${Y + 3} L ${cx - 9} ${Y + 7} L ${cx - 5} ${Y + tc} H ${L} L ${L + 4} ${Y + 7} L ${L - 4} ${Y + 4} Z`;
    const droite = `M ${R} ${Y} H ${cx + 6} L ${cx + 10} ${Y + 4} L ${cx + 4} ${Y + 8} L ${cx + 8} ${Y + tc} H ${R} L ${R - 4} ${Y + 7} L ${R + 4} ${Y + 4} Z`;
    [gauche, droite].forEach(d => { o.push(h.path(d, ecorce)); o.push(h.path(d, h.a.arete)); });
    o.push(h.ligne(L, Y, cx - 7, Y, h.a.contour));
    o.push(h.ligne(cx + 6, Y, R, Y, h.a.contour));
    // Éraillures au bord de la déchirure.
    o.push(h.path(`M ${cx - 7} ${Y} L ${cx - 2} ${Y - 3}`, h.a.detail));
    o.push(h.path(`M ${cx + 6} ${Y} L ${cx + 2} ${Y - 2}`, h.a.detail));
    // Première couche : la gomme borde la pièce.
    o.push(h.rect(p1, Y - g, bord, g, h.a.plein));
    o.push(h.rect(p2 - bord, Y - g, bord, g, h.a.plein));
    // La pièce.
    o.push(h.rect(p1, yp, W, tp, ecorce));
    o.push(h.rect(p1, yp, W, tp, h.a.arete));
    o.push(h.ligne(p1, yp, p2, yp, h.a.contour));
    if (etape === 2) {
      [[p2, 1], [p1, -1]].forEach(([p, s]) => {
        const d = `M ${p - s * 16} ${yp} C ${p - s * 11} ${yp - 7} ${p + s * 2} ${yp - 9} ${p + s * 8} ${yp - 4} ` +
          `C ${p + s * 16} ${Y - 9} ${p + s * 22} ${Y - 3} ${p + s * 28} ${Y} L ${p} ${Y} L ${p} ${yp} Z`;
        o.push(h.path(d, h.a.plein));
        o.push(h.ligne(p, Y - g + 0.5, p, Y - 0.5, trBlanc));
      });
      // le point à vérifier : la ligne où la pièce rencontre la coque, couverte
      o.push(h.controle(p2, Y - 2, 11));
    } else {
      // La gomme chassée par la pression perle au bord.
      [[p2, 1], [p1, -1]].forEach(([p, s]) => {
        o.push(h.path(`M ${p} ${Y - g} Q ${p + s * 5} ${Y - g + 1} ${p + s * 6} ${Y} L ${p} ${Y} Z`, h.a.plein));
      });
      // La palette presse la pièce sur la première couche.
      const xa = p2 - bord + 4, xb = p2 - 6;
      o.push(palette(xa, yp - 1.2, xb, yp - 1.2, xa - 80, yp - 72));
      const xf = (xa + xb) / 2 + 8;
      o.push(h.geste(`M ${xf} ${yp - 64} V ${yp - 14}`));
    }
    return o.join('\n');
  }

  // Détail d'un bord, à plus grande échelle. mode 'palette' : seconde couche lissée à la
  // palette chauffée ; mode 'tison' : gomme mâchée étendue sur le bord, lissée au tison.
  function geomBord(z) {
    const Y = Math.round(z.h * 0.7), tc = 22, g = 8, tp = 16, L = 14, R = z.l - 14;
    const pe = Math.round(z.l * 0.44);
    return { Y, tc, g, tp, L, R, pe, yp: Y - g - tp };
  }
  function coupeBord(z, mode) {
    const { Y, tc, g, tp, L, R, pe, yp } = geomBord(z);
    const o = [];
    const coque = `M ${L} ${Y} H ${R} L ${R + 5} ${Y + 8} L ${R - 5} ${Y + 14} L ${R} ${Y + tc} H ${L} L ${L - 5} ${Y + 14} L ${L + 5} ${Y + 8} Z`;
    o.push(h.path(coque, ecorce));
    o.push(h.path(coque, h.a.arete));
    o.push(h.ligne(L, Y, R, Y, h.a.contour));
    o.push(h.rect(L, Y - g, pe - L, g, h.a.plein));
    const piece = `M ${L} ${yp} H ${pe} V ${Y - g} H ${L} L ${L - 4} ${Y - g - 5} L ${L + 4} ${Y - g - 11} Z`;
    o.push(h.path(piece, ecorce));
    o.push(h.path(piece, h.a.arete));
    o.push(h.ligne(L, yp, pe, yp, h.a.contour));
    if (mode === 'palette') {
      const A = [pe + 6, yp - 6], B = [pe + 86, Y - 4];
      const d = `M ${pe - 62} ${yp} Q ${pe - 22} ${yp - 7} ${A[0]} ${A[1]} L ${B[0]} ${B[1]} ` +
        `Q ${pe + 104} ${Y - 1} ${pe + 126} ${Y} L ${pe} ${Y} L ${pe} ${yp} Z`;
      o.push(h.path(d, h.a.plein));
      o.push(h.ligne(pe, Y - g + 0.5, pe, Y - 0.5, trBlanc));
      const t = (k) => [A[0] + (B[0] - A[0]) * k, A[1] + (B[1] - A[1]) * k];
      const a = t(0.12), b = t(0.92);
      o.push(palette(a[0], a[1] - 1.2, b[0], b[1] - 1.2, pe - 120, yp - 84));
    } else {
      // Gomme mâchée : des grumeaux étendus sur le bord de la pièce, jusque sur la coque.
      const base = [];
      const P0 = [pe - 52, yp], P1 = [pe + 4, yp - 8], P2 = [pe + 84, Y];
      for (let i = 0; i <= 5; i++) base.push([P0[0] + (P1[0] - P0[0]) * i / 5, P0[1] + (P1[1] - P0[1]) * i / 5]);
      for (let i = 1; i <= 7; i++) base.push([P1[0] + (P2[0] - P1[0]) * i / 7, P1[1] + (P2[1] - P1[1]) * i / 7]);
      let d = `M ${base[0][0]} ${base[0][1]}`;
      for (let i = 1; i < base.length; i++) {
        const [x0, y0] = base[i - 1], [x1, y1] = base[i];
        const bosse = (i === 1 || i === base.length - 1) ? 3 : 7 + (i % 3) * 2;
        d += ` Q ${(x0 + x1) / 2} ${(y0 + y1) / 2 - bosse} ${x1} ${y1}`;
      }
      d += ` L ${pe} ${Y} L ${pe} ${yp} Z`;
      o.push(h.path(d, h.a.plein));
      o.push(h.ligne(pe, Y - g + 0.5, pe, Y - 0.5, trBlanc));
      // Le tison : un bout de bois au bout rougi, posé sur la gomme au bord de la pièce.
      // (le bout du haut restait dans le titre de la vue : le tison est un peu plus court)
      const T = [pe + 16, yp - 5], E = [R - 26, yp - 98];
      const mx = E[0] - T[0], my = E[1] - T[1], M = Math.hypot(mx, my), vx = mx / M, vy = my / M;
      const w = 8, qx = -vy, qy = vx;
      const baton = [[T[0] + qx * w, T[1] + qy * w], [E[0] + qx * w, E[1] + qy * w],
        [E[0] - qx * w, E[1] - qy * w], [T[0] - qx * w, T[1] - qy * w]];
      o.push(h.chemin(baton, h.a.blanc, true));
      // le flanc du bas du tison, à l'ombre (lumière en haut à gauche)
      o.push(h.chemin([[T[0] + qx * w * 0.1, T[1] + qy * w * 0.1], [E[0] + qx * w * 0.1, E[1] + qy * w * 0.1], [E[0] + qx * w, E[1] + qy * w], [T[0] + qx * w, T[1] + qy * w]], h.a.ombre, true));
      o.push(h.chemin(baton, h.a.contour, true));
      const rot = Math.atan2(vy, vx) * 180 / Math.PI;
      o.push(h.path(`M ${E[0] + qx * w} ${E[1] + qy * w} A 3 ${w} ${rot} 1 0 ${E[0] - qx * w} ${E[1] - qy * w} A 3 ${w} ${rot} 1 0 ${E[0] + qx * w} ${E[1] + qy * w} Z`, h.a.arete));
      [[0.25, 0.8, -3], [0.45, 0.95, 3]].forEach(([k1, k2, off]) => o.push(h.path(
        `M ${T[0] + mx * k1 + qx * off} ${T[1] + my * k1 + qy * off} L ${T[0] + mx * k2 + qx * off} ${T[1] + my * k2 + qy * off}`, h.a.detail)));
      // Bout rougi, charbonné.
      const k = 30;
      const braise = `M ${T[0] + qx * w} ${T[1] + qy * w} L ${T[0] + vx * k + qx * w} ${T[1] + vy * k + qy * w} ` +
        `L ${T[0] + vx * (k - 5) + qx * 2} ${T[1] + vy * (k - 5) + qy * 2} L ${T[0] + vx * (k + 3) - qx * 3} ${T[1] + vy * (k + 3) - qy * 3} ` +
        `L ${T[0] + vx * k - qx * w} ${T[1] + vy * k - qy * w} L ${T[0] - qx * w} ${T[1] - qy * w} ` +
        `Q ${T[0] - vx * 6} ${T[1] - vy * 6} ${T[0] + qx * w} ${T[1] + qy * w} Z`;
      o.push(h.path(braise, h.a.plein));
      [[8, -4, 3], [15, 2, 6], [22, -5, -1]].forEach(([a, q1, q2]) => o.push(h.path(
        `M ${T[0] + vx * a + qx * q1} ${T[1] + vy * a + qy * q1} L ${T[0] + vx * (a + 3) + qx * q2} ${T[1] + vy * (a + 3) + qy * q2}`, trBlanc)));
    }
    return o.join('\n');
  }

  // Vu de dessus : le canot retourné, la pièce finie.
  function rr(x, y, l, ht, r, inverse) {
    if (!inverse) return `M ${x + r} ${y} H ${x + l - r} A ${r} ${r} 0 0 1 ${x + l} ${y + r} V ${y + ht - r} A ${r} ${r} 0 0 1 ${x + l - r} ${y + ht} H ${x + r} A ${r} ${r} 0 0 1 ${x} ${y + ht - r} V ${y + r} A ${r} ${r} 0 0 1 ${x + r} ${y} Z`;
    return `M ${x + r} ${y} A ${r} ${r} 0 0 0 ${x} ${y + r} V ${y + ht - r} A ${r} ${r} 0 0 0 ${x + r} ${y + ht} H ${x + l - r} A ${r} ${r} 0 0 0 ${x + l} ${y + ht - r} V ${y + r} A ${r} ${r} 0 0 0 ${x + l - r} ${y} Z`;
  }
  function geomDessus(z) {
    const cx = z.l / 2, cy = z.h / 2 + 4;
    const PW = 300, PH = 116;
    return { cx, cy, PW, PH, px: cx - PW / 2, py: cy - PH / 2 };
  }
  function dessus(z) {
    const { cx, cy, PW, PH, px, py } = geomDessus(z);
    const o = [];
    const x1 = 40, x2 = z.l - 40, y1 = 16, y2 = z.h - 14;
    // Fragment de coque, bords cassés.
    const vag = (xa, ya, xb, yb, n, amp) => {
      let s = '';
      for (let i = 1; i <= n; i++) {
        const xm = xa + (xb - xa) * (i - 0.5) / n, ym = ya + (yb - ya) * (i - 0.5) / n;
        const xe = xa + (xb - xa) * i / n, ye = ya + (yb - ya) * i / n;
        const sg = i % 2 ? 1 : -1;
        const ox = ya === yb ? 0 : amp * sg, oy = ya === yb ? amp * sg : 0;
        s += ` Q ${xm + ox} ${ym + oy} ${xe} ${ye}`;
      }
      return s;
    };
    const frag = `M ${x1} ${y1}` + vag(x1, y1, x2, y1, 6, 5) + vag(x2, y1, x2, y2, 3, 6) + vag(x2, y2, x1, y2, 6, 5) + vag(x1, y2, x1, y1, 3, 6) + ' Z';
    o.push(h.path(frag, h.a.arete));
    // Lenticelles de l'écorce, dans le sens de la longueur.
    let s = 7;
    const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280;
    const dans = (x, y, m) => x > px - m && x < px + PW + m && y > py - m && y < py + PH + m;
    const poses = [];
    const libre = (x, y, l) => poses.every(([u, v, m]) => Math.abs(v - y) > 9 || x > u + m + 8 || x + l < u - 8);
    for (let i = 0; i < 70; i++) {
      const x = x1 + 16 + rnd() * (x2 - x1 - 50), y = y1 + 12 + rnd() * (y2 - y1 - 24), l = 6 + rnd() * 12;
      if (dans(x, y, 18) || dans(x + l, y, 18) || !libre(x, y, l)) continue;
      poses.push([x, y, l]);
      o.push(h.ligne(x, y, x + l, y, h.a.detail));
    }
    // La pièce.
    o.push(h.path(rr(px, py, PW, PH, 12), h.a.blanc));
    for (let i = 0; i < 26; i++) {
      const x = px + 22 + rnd() * (PW - 60), y = py + 18 + rnd() * (PH - 36), l = 6 + rnd() * 10;
      if (!libre(x, y, l)) continue;
      poses.push([x, y, l]);
      o.push(h.ligne(x, y, x + l, y, h.a.detail));
    }
    // La déchirure, sous la pièce.
    const dech = [[cx - 112, cy + 14], [cx - 84, cy + 6], [cx - 70, cy + 12], [cx - 40, cy - 2], [cx - 22, cy + 4],
      [cx + 6, cy - 8], [cx + 30, cy - 2], [cx + 56, cy - 14], [cx + 80, cy - 8], [cx + 110, cy - 18]];
    o.push(h.chemin(dech, h.a.cache));
    // La seconde couche, sur tout le pourtour : à cheval sur le bord de la pièce.
    const ext = 5, int = 4;
    o.push(h.path(rr(px - ext, py - ext, PW + 2 * ext, PH + 2 * ext, 12 + ext) + ' ' + rr(px + int, py + int, PW - 2 * int, PH - 2 * int, 6, true), h.a.plein));
    o.push(h.path(rr(px + int, py + int, PW - 2 * int, PH - 2 * int, 6), h.a.fin));
    return o.join('\n');
  }

  return {
    ref: '90-01',
    titre: 'La pièce en deux couches de gomme',
    desc: 'Une déchirure de canot d’écorce refermée. Vu de dessus, sur le canot retourné : la pièce d’écorce dépasse la déchirure de tous les côtés, et la seconde couche de gomme fait tout le tour de son bord. En coupe : la gomme chaude borde la pièce, pressée à la palette ; une fois refroidie, la seconde couche est posée chaude sur le pourtour, par-dessus la ligne où la pièce rencontre la coque, puis lissée à la palette chauffée. Sans chaudron, la gomme mâchée s’étend sur le bord et se lisse au tison.',
    format: 'pleine',
    disposition: [['dessus'], ['c1', 'c2'], ['c3', 'c4']],
    hauteurs: [1.05, 0.9, 1.1],
    vues: {
      dessus: {
        titre: 'Le canot retourné, vu de dessus : la pièce finie',
        dessin: z => dessus(z),
        renvois: z => {
          const { cx, cy, PW, PH, px, py } = geomDessus(z);
          return [
            { n: 1, rond: [px - 40, cy + 40], cible: [cx - 84, cy + 6], texte: 'déchirure, sous la pièce' },
            { n: 2, rond: [px + PW + 44, cy - 34], cible: [px + PW - 30, cy - 30], texte: 'pièce, plus grande que la déchirure' },
            { n: 3, rond: [px + PW + 44, py + PH + 10], cible: [px + PW - 20, py + PH + 1], texte: 'seconde couche, tout le tour' },
          ];
        },
      },
      c1: {
        titre: 'Border de gomme chaude, presser à la palette',
        dessin: z => coupeEntiere(z, 1),
        renvois: z => {
          const G = geomEntiere(z);
          return [
            { n: 4, rond: [G.p1 + 20, G.Y + 36], cible: [G.p1 + 30, G.Y - 2.5], texte: 'première couche, au bord de la pièce' },
            { n: 5, rond: [G.p2 - G.bord - 100, G.yp - 44], cible: [G.p2 - G.bord - 50, G.yp - 44], texte: 'palette : cuillère de bois aplatie' },
          ];
        },
      },
      c2: {
        titre: 'Refroidie : seconde couche chaude sur le pourtour',
        dessin: z => coupeEntiere(z, 2),
        renvois: z => {
          const G = geomEntiere(z);
          return [
            { n: 6, rond: [G.p2 + 30, G.yp - 36], cible: [G.p2 + 6, G.yp - 5], texte: 'seconde couche, débordant sur la coque' },
            { n: 7, rond: [G.p2 - 10, G.Y + 38], cible: [G.p2, G.Y - 1], texte: 'ligne où l’eau entre sous la pièce' },
          ];
        },
      },
      c3: {
        titre: 'Le bord, lissé à la palette chauffée',
        dessin: z => coupeBord(z, 'palette'),
        renvois: z => {
          const G = geomBord(z);
          return [
            { n: 8, rond: [G.pe - 90, G.yp - 20], cible: [G.pe - 40, G.yp - 3], texte: 'gomme lissée à chaud' },
            { n: 9, rond: [G.pe + 60, G.yp - 60], cible: [G.pe - 60, G.yp - 43], texte: 'palette chauffée' },
          ];
        },
      },
      c4: {
        titre: 'Sans chaudron : gomme mâchée, lissée au tison',
        dessin: z => coupeBord(z, 'tison'),
        renvois: z => {
          const G = geomBord(z);
          return [
            { n: 10, rond: [G.pe + 96, G.Y + 42], cible: [G.pe + 60, G.Y - 7], texte: 'gomme mâchée, sur le bord de la pièce' },
            { n: 11, rond: [G.pe - 40, G.yp - 70], cible: [G.pe + 16 + 0.55 * (G.R - 42 - G.pe), G.yp - 5 - 0.55 * 93], texte: 'tison : bout de bois rougi' },
          ];
        },
      },
    },
  };
};
