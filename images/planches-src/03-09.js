// Planche 03-09 — l'abri dans la pièce (ch. 4, section 9, « Le chauffage » ; ch. 9, la tente
// dans la pièce : couverture sur la table, draps jusqu'aux chaises, matelas debout au mur).
// Coupe et plan en cm : x = distance au mur ; dans le plan, y = le long du mur.
module.exports = (h) => {
  const blanc = a => a.replace('fill="none"', h.a.blanc.split(' ')[0]);
  const r1 = v => Math.round(v * 10) / 10;
  const poly = pts => 'M ' + pts.map(p => `${r1(p[0])},${r1(p[1])}`).join(' L ');

  // un tissu d'épaisseur t le long d'une polyligne
  const bande = (pts, t) => {
    const n = pts.length, g = [], d = [];
    for (let i = 0; i < n; i++) {
      const a = pts[Math.max(0, i - 1)], b = pts[Math.min(n - 1, i + 1)];
      const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1;
      const nx = -dy / L * t / 2, ny = dx / L * t / 2;
      g.push([pts[i][0] + nx, pts[i][1] + ny]);
      d.push([pts[i][0] - nx, pts[i][1] - ny]);
    }
    return poly(g.concat(d.reverse())) + ' Z';
  };

  // carton aplati en coupe : deux peaux, la cannelure entre elles
  const carton = (x1, x2, y, ep) => {
    let d = `M ${r1(x1)},${r1(y + ep / 2)}`;
    const p = ep * 1.3;
    for (let x = x1, k = 0; x < x2 - 0.1; x += p, k++) {
      const xe = Math.min(x + p, x2), xm = (x + xe) / 2;
      d += ` Q ${r1(xm)},${r1(k % 2 ? y + ep * 1.5 : y - ep / 2)} ${r1(xe)},${r1(y + ep / 2)}`;
    }
    return [h.rect(x1, y, x2 - x1, ep, blanc(h.a.detail)), h.path(d, h.a.fin)].join('\n');
  };

  // ── La coupe en travers de l'abri, vue depuis le pied des dormeurs ──
  const geoCoupe = z => {
    const G = z.h - 16;
    const s = Math.min((z.l - 8) / 262, (G - 36) / 100);
    const ox = (z.l - 262 * s) / 2;
    const X = c => ox + c * s, Y = c => G - c * s;
    const ep = 5, C = G - 2 * ep, K = C - 12 * s, B = K - 3;
    const corps = [[56, 22, 10], [94, 14, 7], [124, 14, 7], [162, 22, 10]];   // centre, demi-largeur, demi-hauteur
    const dessus = x => {
      let y = B;
      for (const [c, rx, ry] of corps) {
        const a = rx * s, b = ry * s, cy = B - b, u = Math.abs(x - X(c));
        y = Math.min(y, u <= a ? cy - b * Math.sqrt(1 - (u / a) ** 2) : cy + (u - a) * 0.9);
      }
      return y;
    };
    // le drap : du coin de la table au haut du dossier, avec son ventre
    const drapY = c => { const t = (c - 124) / 119.5; return 78.6 + 14.2 * t - 20 * t * (1 - t); };
    return { G, s, X, Y, ep, C, K, B, corps, dessus, drapY };
  };

  const coupe = z => {
    const { G, s, X, Y, ep, C, K, B, corps, dessus, drapY } = geoCoupe(z);
    const out = [];
    // plancher et mur
    out.push(h.rect(0, G, z.l, 14, h.a.hachure('bois', 'aucun')));
    out.push(h.ligne(0, G, z.l, G, h.a.arete));
    out.push(h.rect(X(0), 0, 14 * s, G, h.a.hachure('bois')));
    // matelas debout contre le mur
    out.push(h.rect(X(14) + 0.5, Y(100), 18 * s - 1, 100 * s, h.a.hachure('isolant') + ' rx="4"'));
    // cartons, coussins, couverture du dessous
    out.push(carton(X(32), X(250), C, ep));
    out.push(carton(X(32), X(250), C + ep, ep));
    for (const [a, b] of [[33, 85], [85, 137], [137, 186]])
      out.push(h.rect(X(a) + 0.6, K, (b - a) * s - 1.2, C - K, blanc(h.a.arete) + ' rx="6"'));
    out.push(h.rect(X(33), B, 153 * s, 3, blanc(h.a.detail)));
    // pattes de la table, au fond, au-dessus de la couverture
    for (const a of [36, 118]) {
      const yb = Math.max(dessus(X(a)), dessus(X(a + 4))) - 1;
      out.push(h.rect(X(a), Y(75), 4 * s, yb - Y(75), blanc(h.a.arete)));
    }
    // les quatre dormeurs, en coupe
    for (const [c, rx, ry] of corps) out.push(h.ellipse(X(c), B - ry * s, rx * s, ry * s, blanc(h.a.arete)));
    // une même couverture sur les quatre
    const pc = [];
    for (let x = X(33); x <= X(186); x += 1.5) pc.push([x, dessus(x) - 2.4]);
    out.push(h.path(bande(pc, 4), blanc(h.a.arete)));
    // la chaise, dossier au bout, qui tient le drap
    out.push(h.rect(X(203.5), Y(42.5), 3 * s, Y(0) - Y(42.5) - 2 * ep, blanc(h.a.arete)));
    out.push(h.rect(X(240.5), Y(92), 3 * s, Y(0) - Y(92) - 2 * ep, blanc(h.a.arete)));
    out.push(h.rect(X(202), Y(45), 42 * s, 2.5 * s, blanc(h.a.arete)));
    out.push(h.rect(X(206.5), Y(15), 34 * s, 1.6 * s, blanc(h.a.detail)));
    // le drap : de la table au dossier, puis au plancher
    // le bord du drap reste sur la table, pris sous la couverture
    const pd = [[X(98), Y(79.6)], [X(123), Y(79.6)], [X(124.4), Y(79.2)]];
    for (let c = 126; c <= 243.5; c += 2) pd.push([X(c), Y(drapY(c))]);
    for (const [c, v] of [[245.5, 92.2], [246.6, 88], [247.5, 60], [249, 30], [250.5, 8], [251.4, 2.6], [252.6, 0.7], [262, 0.7]])
      pd.push([X(c), Y(v)]);
    out.push(h.path(poly(pd), h.a.arete));
    // le dessus de la table, en coupe
    out.push(h.rect(X(34), Y(78.5), 90 * s, 3.5 * s, h.a.hachure('bois')));
    // la couverture par-dessus la table, depuis le haut du matelas
    const pt = [[15, 101], [30.5, 101], [32.6, 99.4], [35.4, 80.4], [37.2, 79.5], [94, 79.5], [98, 81.6], [124, 81.6], [126, 80.4], [126.6, 68]]
      .map(([c, v]) => [X(c), Y(v)]);
    out.push(h.path(bande(pt, 4), blanc(h.a.arete)));
    return out.join('\n');
  };

  // ── Vu de dessus : la rangée des dormeurs ──
  const geoPlan = z => {
    const s = Math.min((z.l - 6) / 254, (z.h - 4) / 228);
    const ox = (z.l - 254 * s) / 2 + 14 * s, oy = (z.h - 228 * s) / 2;
    return { s, X: c => ox + c * s, Y: c => oy + c * s };
  };

  const plan = z => {
    const { s, X, Y } = geoPlan(z);
    const out = [];
    const R = (x1, y1, x2, y2, a) => h.rect(X(x1), Y(y1), (x2 - x1) * s, (y2 - y1) * s, a);
    out.push(R(-14, 0, 0, 228, h.a.hachure('bois')));
    out.push(R(0, 10, 18, 200, h.a.hachure('isolant') + ' rx="3"'));
    // le bord des tissus au plancher : l'abri fermé
    out.push(R(18, 4, 240, 208, h.a.contour + ' rx="4"'));
    // la literie, sous les corps
    out.push(R(19, 10, 172, 204, h.a.detail));
    // corps : tête, épaules, hanches, pieds
    const corps = (c, r, yT, w1, yS, w2, yH, w3, yF) => {
      const P = (x, y) => `${r1(X(x))},${r1(Y(y))}`;
      const d = `M ${P(c - w1 / 2 + 4, yS)} L ${P(c + w1 / 2 - 4, yS)} Q ${P(c + w1 / 2, yS)} ${P(c + w1 / 2, yS + 5)} ` +
        `L ${P(c + w2 / 2, yH)} L ${P(c + w3 / 2, yF - 5)} Q ${P(c + w3 / 2, yF)} ${P(c, yF)} ` +
        `Q ${P(c - w3 / 2, yF)} ${P(c - w3 / 2, yF - 5)} L ${P(c - w2 / 2, yH)} L ${P(c - w1 / 2, yS + 5)} ` +
        `Q ${P(c - w1 / 2, yS)} ${P(c - w1 / 2 + 4, yS)} Z`;
      return [h.path(d, blanc(h.a.arete)), h.cercle(X(c), Y(yT), r * s, blanc(h.a.arete))].join('\n');
    };
    out.push(corps(42, 10, 22, 44, 34, 38, 110, 24, 196));
    out.push(corps(80, 7.5, 29, 26, 38, 22, 90, 15, 138));
    out.push(corps(110, 7.5, 29, 26, 38, 22, 90, 15, 138));
    out.push(corps(148, 10, 22, 44, 34, 38, 110, 24, 196));
    // la table, au-dessus : pattes et contour du dessus
    for (const [a, b] of [[22, 14], [104, 14], [22, 192], [104, 192]]) out.push(R(a, b, a + 4, b + 4, h.a.plein));
    out.push(R(20, 12, 110, 200, h.a.cache));
    // les deux chaises, dossier vers le dehors
    for (const b of [40, 130]) {
      out.push(R(188, b, 230, b + 42, blanc(h.a.arete) + ' rx="2"'));
      out.push(R(226, b - 1, 232, b + 43, blanc(h.a.arete)));
    }
    return out.join('\n');
  };

  // ── Le lit en couches, de près ──
  const geoCouches = z => {
    const G = z.h - 18, e = 13;
    const S = G - 2 * e - 52, L = S - 7;
    const fin = z.l - 60;
    const rx = 52, ry = 30, cx = 92, cy = L - ry;
    const nappe = (d, x) => {
      const a = rx + d, b = ry + d, u = Math.abs(x - cx);
      const t = u <= a ? cy - b * Math.sqrt(1 - (u / a) ** 2) : cy + (u - a) * 1.6;
      return Math.min(t, L - d * 0.8);
    };
    return { G, e, S, L, fin, rx, ry, cx, cy, nappe };
  };

  const couches = z => {
    const { G, e, S, L, fin, rx, ry, cx, cy, nappe } = geoCouches(z);
    const out = [];
    out.push(h.rect(0, G, z.l, 18, h.a.hachure('bois', 'aucun')));
    out.push(h.ligne(0, G, z.l, G, h.a.arete));
    out.push(carton(0, z.l - 10, G - e, e));
    out.push(carton(0, z.l - 26, G - 2 * e, e));
    // branches de sapin
    const sf = z.l - 44;
    const branches = [[0, S + 40, sf * 0.62, S + 35], [sf * 0.34, S + 44, sf, S + 39], [0, S + 25, sf * 0.47, S + 18],
      [sf * 0.3, S + 29, sf * 0.86, S + 22], [sf * 0.56, S + 13, sf + 2, S + 9], [0, S + 10, sf * 0.32, S + 6.5],
      [sf * 0.08, S + 47, sf * 0.5, S + 46]];
    for (const [xa, ya, xb, yb] of branches) {
      const L0 = Math.hypot(xb - xa, yb - ya), ux = (xb - xa) / L0, uy = (yb - ya) / L0;
      const at = q => [xa + ux * q, ya + uy * q + Math.sin(q / L0 * Math.PI) * 1.5];
      const pts = []; for (let q = 0; q <= L0; q += 6) pts.push(at(q));
      out.push(h.path(poly(pts), h.a.detail));
      let dn = '';
      for (let q = 3; q < L0 - 2; q += 3.2) {
        const [px, py] = at(q);
        for (const sg of [1, -1]) {
          const ang = Math.atan2(uy, ux) + sg * 0.85;
          dn += `M ${r1(px)},${r1(py)} L ${r1(px + Math.cos(ang) * 5.5)},${r1(py + Math.sin(ang) * 5.5)} `;
        }
      }
      out.push(h.path(dn, h.a.fin));
    }
    // couverture du dessous
    out.push(h.rect(0, L, fin, 7, blanc(h.a.arete)));
    // le corps, en coupe
    out.push(h.ellipse(cx, cy, rx, ry, blanc(h.a.arete)));
    // par-dessus : couverture, journal froissé, couverture
    const xe = fin - 6;
    const nap = (d1, d2) => {
      const hauts = [], bas = [];
      for (let x = 0; x <= xe; x += 1.5) { hauts.push([x, nappe(d2, x)]); bas.push([x, nappe(d1, x)]); }
      return poly(hauts.concat(bas.reverse())) + ' Z';
    };
    out.push(h.path(nap(0, 5), blanc(h.a.arete)));
    let graine = 7;
    const hasard = () => { graine = (graine * 16807) % 2147483647; return (graine % 1000) / 1000; };
    for (let x = 5; x < xe - 3; x += 9.5) {
      const y1 = nappe(5, x), y2 = nappe(18, x), th = y1 - y2;
      if (th < 8) continue;
      const r = Math.min(6.4, th / 2 - 0.4), yc = (y1 + y2) / 2;
      const pts = [];
      for (let i = 0; i < 8; i++) {
        const a = i / 8 * 2 * Math.PI + hasard() * 0.4, rr = r * (0.78 + hasard() * 0.24);
        pts.push([x + Math.cos(a) * rr, yc + Math.sin(a) * rr]);
      }
      out.push(h.path(poly(pts) + ' Z', blanc(h.a.detail)));
      out.push(h.path(poly([[x - r * 0.45, yc + r * 0.15], [x + r * 0.4, yc - r * 0.2]]), h.a.fin));
    }
    out.push(h.path(nap(18, 23), blanc(h.a.arete)));
    return out.join('\n');
  };

  // ── La comparaison : ce qui est sous le corps ──
  const dormeur = (x0, base, Lb) => {
    const k = Lb / 205, T = (u, v) => `${r1(x0 + u * k)},${r1(base + v * k)}`;
    const d = `M ${T(19, 0)} L ${T(19, -8)} Q ${T(21, -16)} ${T(31, -18)} L ${T(62, -21)} Q ${T(80, -23)} ${T(97, -19)} ` +
      `L ${T(118, -17)} Q ${T(140, -15)} ${T(158, -13)} L ${T(186, -9)} Q ${T(192, -9)} ${T(195, -12)} ` +
      `L ${T(197, -21)} Q ${T(201, -23)} ${T(203, -19)} L ${T(203, -4)} Q ${T(203, 0)} ${T(199, 0)} Z`;
    return [h.path(d, blanc(h.a.arete)), h.cercle(x0 + 10 * k, base - 9.5 * k, 9.5 * k, blanc(h.a.arete))].join('\n');
  };
  const epaisseur = (a, b) => x => {
    const e = 5, c = 1.6, r = 8;
    if (x < a - r || x > b + r) return e;
    if (x >= a && x <= b) return c;
    return c + (e - c) * (x < a ? (a - x) / r : (x - b) / r);
  };
  const comparaison = (z, cartons, nb) => {
    const G = z.h - 14, Lb = Math.min(210, z.l - 70), x0 = (z.l - Lb) / 2;
    const x1 = 12, x2 = z.l - 12, t = epaisseur(x0 + 4, x0 + Lb * 0.99);
    const out = [h.rect(0, G, z.l, 14, h.a.hachure('bois', 'aucun')), h.ligne(0, G, z.l, G, h.a.arete)];
    const sol = G - cartons * 5;
    for (let i = 0; i < cartons; i++) out.push(carton(x1, x2, G - (i + 1) * 5, 5));
    for (let i = 1; i <= nb; i++) {
      const pts = []; for (let x = x1; x <= x2; x += 2) pts.push([x, sol - i * t(x)]);
      out.push(h.path(poly(pts), h.a.detail));
    }
    out.push(h.ligne(x1, sol, x1, sol - nb * 5, h.a.detail), h.ligne(x2, sol, x2, sol - nb * 5, h.a.detail));
    const base = sol - nb * 1.6;
    out.push(dormeur(x0, base, Lb));
    if (!cartons) for (const u of [0.3, 0.5, 0.7]) out.push(h.fleche(`M ${r1(x0 + Lb * u)},${r1(base - 4)} L ${r1(x0 + Lb * u)},${r1(G + 10)}`));
    return out.join('\n');
  };

  return {
    ref: '03-09',
    titre: 'L’abri dans la pièce : la tente de table et le lit en couches',
    desc: 'En coupe : contre le mur, un matelas debout ; une couverture part du haut du matelas et couvre la table ; un drap, pris sous la couverture sur la table, continue jusqu’au dossier d’une chaise, puis descend au plancher. Dessous, sur des cartons et des coussins de divan, les quatre dormeurs sous une même couverture. Vu de dessus : un adulte contre le matelas, les deux enfants au milieu, l’autre adulte côté drap ; aux deux bouts, couverture et drap descendent jusqu’au plancher. De près : cartons, branches de sapin, couverture, le corps, puis couverture, journal froissé et couverture. En bas : un dormeur sur quatre couvertures écrasées à même le plancher, la chaleur qui part dans le bois ; un autre sur deux cartons et une couverture.',
    format: 'pleine',
    disposition: [['coupe'], ['plan', 'couches'], ['rate', 'bon']],
    hauteurs: [5.2, 5.2, 1.6],
    largeurs: [[1], [4, 3], [1, 1]],
    vues: {
      coupe: {
        titre: 'En coupe, en travers de l’abri',
        dessin: coupe,
        renvois: z => {
          const { X, Y, K, C, dessus, drapY } = geoCoupe(z);
          return [
            { n: 1, rond: [X(23), Y(100) - 22], cible: [X(23), Y(92)], texte: 'matelas debout contre le mur' },
            { n: 2, rond: [X(80), Y(95)], cible: [X(84), Y(80.2)], texte: 'couverture par-dessus la table' },
            { n: 3, rond: [X(186), Y(101)], cible: [X(180), Y(drapY(180))], texte: 'drap tendu jusqu’au dossier et au plancher' },
            { n: 4, rond: [X(143), Y(58)], cible: [X(158), dessus(X(158)) - 3], texte: 'une même couverture pour les quatre' },
            { n: 5, rond: [X(195), Y(26)], cible: [X(184), (K + C) / 2], texte: 'coussins de divan' },
          ];
        },
      },
      plan: {
        titre: 'Vu de dessus, la table en pointillé',
        dessin: plan,
        renvois: z => {
          const { X, Y } = geoPlan(z);
          return [
            { n: 6, rond: [X(210), Y(106)], cible: [X(158), Y(106)], texte: 'un adulte à chaque bout de la rangée' },
            { n: 7, rond: [X(95), Y(168)], cible: [X(80), Y(118)], texte: 'les enfants au milieu' },
            { n: 8, rond: [X(150), Y(220)], cible: [X(186), Y(208)], texte: 'les deux bouts fermés jusqu’au plancher' },
          ];
        },
      },
      couches: {
        titre: 'Le lit en couches, de près',
        dessin: couches,
        renvois: z => {
          const { G, e, S, L, fin, rx, cx, nappe } = geoCouches(z);
          const xt = cx + rx * 0.7;
          return [
            { n: 9, rond: [z.l - 13, G - 2 * e - 11], cible: [z.l - 34, G - 1.5 * e], texte: 'cartons aplatis ou tapis roulé' },
            { n: 10, rond: [z.l - 28, S - 5], cible: [z.l - 58, S + 16], texte: 'branches de sapin, ou matelas, ou coussins' },
            { n: 11, rond: [z.l - 40, L - 26], cible: [fin - 3, L + 3.5], texte: 'couverture sous le corps' },
            { n: 12, rond: [z.l - 30, nappe(23, xt) - 24], cible: [xt, (nappe(5, xt) + nappe(18, xt)) / 2], texte: 'journal froissé entre deux couvertures' },
          ];
        },
      },
      rate: {
        titre: 'Moins chaud : quatre couvertures au plancher',
        dessin: z => comparaison(z, 0, 4),
        renvois: () => [],
      },
      bon: {
        titre: 'Plus chaud : deux cartons, une couverture',
        dessin: z => comparaison(z, 2, 1),
        renvois: () => [],
      },
    },
  };
};
