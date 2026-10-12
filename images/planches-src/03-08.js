// Planche 03-08 — la marmite norvégienne (ch. 4, variante d'urgence de la cuisson).
// Une boîte, une glacière ou un tiroir bourré de laine, de foin, de journal froissé ou de
// linge d'hiver ; la marmite y descend pleine, à plein bouillon, couvercle mis, entourée de
// tous les côtés, y compris dessous. Aucun chiffre : le chapitre n'en donne aucun sur l'objet.
module.exports = (h) => {
  const blanc = a => a.replace('fill="none"', h.a.blanc.split(' ')[0]);
  const r1 = v => Math.round(v * 10) / 10;
  const pts = p => p.map(q => q.map(r1).join(',')).join(' ');

  // La boîte en coupe, à l'échelle 1 de la vue principale
  const B = { W: 260, t: 9, H: 196, tl: 9, pw: 130, ph: 100, hb: 40 };

  // ── La marmite coupée : paroi, contenu, couvercle bombé, poignée ──
  const marmiteCoupe = (cx, yB, s, niveau) => {
    const w = B.pw * s, ht = B.ph * s;
    const xl = cx - w / 2, xr = cx + w / 2, yT = yB - ht, r = 8 * s, dome = 9 * s;
    const fond = `L ${r1(xl)},${r1(yB - r)} Q ${r1(xl)},${r1(yB)} ${r1(xl + r)},${r1(yB)} L ${r1(xr - r)},${r1(yB)} Q ${r1(xr)},${r1(yB)} ${r1(xr)},${r1(yB - r)}`;
    const out = [];
    for (const [x, d] of [[xl, -1], [xr, 1]]) {
      out.push(h.path(`M ${r1(x)},${r1(yT + 5 * s)} C ${r1(x + d * 12 * s)},${r1(yT + 5 * s)} ${r1(x + d * 12 * s)},${r1(yT + 17 * s)} ${r1(x)},${r1(yT + 17 * s)}`, h.a.arete));
    }
    out.push(h.path(`M ${r1(xl)},${r1(yT)} ${fond} L ${r1(xr)},${r1(yT)} L ${r1(xr + 3 * s)},${r1(yT)} Q ${r1(cx)},${r1(yT - 2 * dome)} ${r1(xl - 3 * s)},${r1(yT)} Z`, h.a.blanc));
    out.push(h.path(`M ${r1(xl)},${r1(niveau)} ${fond} L ${r1(xr)},${r1(niveau)} Z`, h.a.hachure('eau', 'aucun')));
    out.push(h.ligne(xl, niveau, xr, niveau, h.a.detail));
    out.push(h.path(`M ${r1(xl)},${r1(yT)} ${fond} L ${r1(xr)},${r1(yT)}`, h.a.contour));
    out.push(h.path(`M ${r1(xl - 3 * s)},${r1(yT + 3 * s)} L ${r1(xl - 3 * s)},${r1(yT)} Q ${r1(cx)},${r1(yT - 2 * dome)} ${r1(xr + 3 * s)},${r1(yT)} L ${r1(xr + 3 * s)},${r1(yT + 3 * s)}`, h.a.arete));
    const kt = yT - dome - 7 * s;
    out.push(h.rect(cx - 7 * s, kt, 14 * s, 7 * s + 1, blanc(h.a.arete)));
    return { svg: out.join('\n'), kt, yT, xl, xr };
  };

  // ── La marmite vue de face, fermée ──
  const marmiteVue = (cx, yB, s) => {
    const w = B.pw * s, ht = B.ph * s;
    const xl = cx - w / 2, xr = cx + w / 2, yT = yB - ht, r = 8 * s, dome = 9 * s, l = yT - 3 * s;
    const out = [];
    for (const [x, d] of [[xl, -1], [xr, 1]]) {
      out.push(h.path(`M ${r1(x)},${r1(yT + 5 * s)} C ${r1(x + d * 12 * s)},${r1(yT + 5 * s)} ${r1(x + d * 12 * s)},${r1(yT + 17 * s)} ${r1(x)},${r1(yT + 17 * s)}`, h.a.arete));
    }
    out.push(h.path(`M ${r1(xl)},${r1(yT)} L ${r1(xl)},${r1(yB - r)} Q ${r1(xl)},${r1(yB)} ${r1(xl + r)},${r1(yB)} L ${r1(xr - r)},${r1(yB)} Q ${r1(xr)},${r1(yB)} ${r1(xr)},${r1(yB - r)} L ${r1(xr)},${r1(yT)} Z`, blanc(h.a.contour)));
    out.push(h.ligne(xl, yT + 6 * s, xr, yT + 6 * s, h.a.detail));
    out.push(h.path(`M ${r1(xl - 3 * s)},${r1(yT + 1)} L ${r1(xl - 3 * s)},${r1(l)} Q ${r1(cx)},${r1(l - 2 * dome)} ${r1(xr + 3 * s)},${r1(l)} L ${r1(xr + 3 * s)},${r1(yT + 1)} Z`, blanc(h.a.arete)));
    const kt = l - dome - 7 * s;
    out.push(h.rect(cx - 7 * s, kt, 14 * s, 7 * s + 1, blanc(h.a.arete)));
    return { svg: out.join('\n'), kt, yT: l, xl, xr };
  };

  // ── La boîte coupée, bourrée, la marmite dedans ──
  const boiteCoupe = (x0, G, s, niveauRel, avecCouvercle = true) => {
    const W = B.W * s, t = B.t * s, H = B.H * s, tl = B.tl * s;
    const xiL = x0 + t, xiR = x0 + W - t, yiB = G - t, yT = G - H, cx = x0 + W / 2;
    const potB = yiB - B.hb * s, potT = potB - B.ph * s;
    const niveau = potT + niveauRel * B.ph * s;
    const out = [];
    out.push(h.rect(xiL, yT, xiR - xiL, yiB - yT, h.a.hachure('isolant', 'aucun')));
    const m = marmiteCoupe(cx, potB, s, niveau);
    out.push(m.svg);
    // la couverture pliée en trois, posée par-dessus le couvercle
    const A = potT - 4 * s, e = 27 * s, Cb = 2 * (m.kt - 1 * s) - A;
    const courbe = (off, u0 = 0, u1 = 1, n = 24) => {
      const p = [];
      for (let i = 0; i <= n; i++) {
        const u = u0 + (u1 - u0) * i / n;
        p.push([xiL + u * (xiR - xiL), (1 - u) * (1 - u) * (A + off) + 2 * u * (1 - u) * (Cb + off) + u * u * (A + off)]);
      }
      return p;
    };
    const bas = courbe(0), haut = courbe(-e).reverse();
    out.push(h.path(`M ${pts(bas)} L ${pts(haut)} Z`, blanc(h.a.arete)));
    out.push(h.chemin(courbe(-e / 3, 0, 0.95), h.a.detail));
    out.push(h.chemin(courbe(-2 * e / 3, 0.05, 1), h.a.detail));
    const couv = u => [xiL + u * (xiR - xiL), (1 - u) * (1 - u) * A + 2 * u * (1 - u) * Cb + u * u * A - e / 2];
    // les parois et le fond, en planches
    out.push(h.path(`M ${r1(x0)},${r1(yT)} L ${r1(x0)},${r1(G)} L ${r1(x0 + W)},${r1(G)} L ${r1(x0 + W)},${r1(yT)} L ${r1(xiR)},${r1(yT)} L ${r1(xiR)},${r1(yiB)} L ${r1(xiL)},${r1(yiB)} L ${r1(xiL)},${r1(yT)} Z`, h.a.hachure('bois', 'contour')));
    if (avecCouvercle) out.push(h.rect(x0 - 4 * s, yT - tl, W + 8 * s, tl, h.a.hachure('bois', 'contour')));
    return { svg: out.join('\n'), cx, xiL, xiR, yiB, yT, potB, potT, niveau, couv, m, W };
  };

  const plancher = (x1, x2, G) => [
    h.rect(x1, G, x2 - x1, 7, h.a.hachure('bois', 'aucun')),
    h.ligne(x1, G, x2, G, h.a.arete),
  ].join('\n');

  // ── Le poêle vu de face, avec son tuyau ──
  const poele = (x, G, w, hb) => {
    const top = G - 8 - hb, out = [];
    out.push(h.rect(x + w - 30, 0, 15, top - 4, blanc(h.a.arete)));
    out.push(h.rect(x + 6, G - 8, 7, 8, h.a.arete));
    out.push(h.rect(x + w - 13, G - 8, 7, 8, h.a.arete));
    out.push(h.rect(x, top, w, hb, blanc(h.a.contour)));
    out.push(h.rect(x - 3, top - 4, w + 6, 4, blanc(h.a.arete)));
    out.push(h.rect(x + w * 0.2, top + hb * 0.22, w * 0.5, hb * 0.58, h.a.arete));
    out.push(h.ligne(x + w * 0.66, top + hb * 0.42, x + w * 0.66, top + hb * 0.62, h.a.arete));
    return { svg: out.join('\n'), dessus: top - 4 };
  };

  // Projection oblique : x vers la droite, p en profondeur (vers le haut à droite)
  const O = (x, y, p) => [x + p * 0.5, y - p * 0.35];

  // Un contenant ouvert, vu de trois quarts, bourré, la marmite enfoncée dedans
  const contenant = (x0, G, W, H, D, ep, depasse, coin) => {
    const yH = G - H, out = [];
    const face = coin
      ? h.rect(x0, yH, W, H, blanc(h.a.contour).replace('/>', '') + ` rx="${coin}"`)
      : h.rect(x0, yH, W, H, blanc(h.a.contour));
    out.push(h.path(`M ${pts([[x0 + W, yH], O(x0 + W, yH, D), O(x0 + W, G, D), [x0 + W, G]])} Z`, blanc(h.a.contour)));
    out.push(h.path(`M ${pts([[x0, yH], O(x0, yH, D), O(x0 + W, yH, D), [x0 + W, yH]])} Z`, blanc(h.a.contour)));
    out.push(face);
    const ouv = [O(x0 + ep, yH, ep), O(x0 + ep, yH, D - ep), O(x0 + W - ep, yH, D - ep), O(x0 + W - ep, yH, ep)];
    out.push(h.path(`M ${pts(ouv)} Z`, h.a.hachure('isolant', 'arete')));
    // la couverture roulée contre le fond : elle se tire par-dessus la marmite avant de fermer
    const rr = 8, pr = D - ep - rr;
    const [lx, ly] = O(x0 + ep + rr, yH - rr, pr), [qx, qy] = O(x0 + W - ep - rr, yH - rr, pr);
    out.push(h.path(`M ${r1(lx)},${r1(ly - rr)} L ${r1(qx)},${r1(qy - rr)} L ${r1(qx)},${r1(qy + rr)} L ${r1(lx)},${r1(ly + rr)} A ${rr} ${rr} 0 0 1 ${r1(lx)},${r1(ly - rr)} Z`, blanc(h.a.arete)));
    out.push(h.path(`M ${r1(lx - 4)},${r1(ly + 4)} Q ${r1((lx + qx) / 2)},${r1(ly + 1)} ${r1(qx)},${r1(qy + 4)}`, h.a.detail));
    out.push(h.cercle(qx, qy, rr, blanc(h.a.arete)));
    out.push(h.path(`M ${r1(qx)},${r1(qy + 5)} A 5 5 0 1 1 ${r1(qx + 5)},${r1(qy)} A 3 3 0 0 0 ${r1(qx + 2)},${r1(qy - 2)}`, h.a.detail));
    const xa = x0 + ep + 12, [ax1, ay1] = O(xa, yH - 2, pr - rr - 3), [ax2, ay2] = O(xa, yH - 2, ep + 10);
    out.push(h.fleche(`M ${r1(ax1)},${r1(ay1)} L ${r1(ax2)},${r1(ay2)}`));
    const rouleau = O(x0 + W - ep - rr - 24, yH - rr, pr);
    // la marmite : son couvercle affleure, ou dépasse d'un tiroir trop bas
    const [cx, cy] = O(x0 + W / 2, yH, D / 2), rx = W * 0.19, ry = rx * 0.36;
    if (depasse) {
      out.push(h.path(`M ${r1(cx - rx)},${r1(cy - depasse)} L ${r1(cx - rx)},${r1(cy)} A ${r1(rx)} ${r1(ry)} 0 0 0 ${r1(cx + rx)},${r1(cy)} L ${r1(cx + rx)},${r1(cy - depasse)} Z`, blanc(h.a.contour)));
      // le bourrage remonté contre le flanc de la marmite, devant
      const g = cx - rx - 14, d = cx + rx + 14, yb = cy + 2;
      const dessus = `M ${r1(d)},${r1(yb)} Q ${r1(cx)},${r1(cy + ry - depasse - 2)} ${r1(g)},${r1(yb)}`;
      out.push(h.path(`M ${r1(g)},${r1(yb)} Q ${r1(cx)},${r1(cy + ry + 12)} ${r1(d)},${r1(yb)} ` + dessus.slice(dessus.indexOf('Q')) + ' Z', h.a.hachure('isolant', 'aucun')));
      out.push(h.path(dessus, h.a.detail));
    }
    const yc = cy - depasse;
    for (const d of [-1, 1]) out.push(h.path(`M ${r1(cx + d * rx)},${r1(yc + 1)} C ${r1(cx + d * (rx + 9))},${r1(yc + 1)} ${r1(cx + d * (rx + 9))},${r1(yc + 8)} ${r1(cx + d * rx)},${r1(yc + 8)}`, h.a.arete));
    out.push(h.ellipse(cx, yc, rx + 2, ry + 1, blanc(h.a.arete)));
    out.push(h.ellipse(cx, yc - 2, rx - 5, ry - 2, h.a.detail));
    out.push(h.rect(cx - 5, yc - 8, 10, 5, blanc(h.a.arete)));
    out.push(h.ellipse(cx, yc - 8, 5, 1.8, blanc(h.a.arete)));
    return { svg: out.join('\n'), yH, cx, cy: yc, rouleau };
  };

  return {
    ref: '03-08',
    titre: 'La marmite norvégienne',
    desc: 'En coupe : une boîte de planches bourrée de laine, de foin, de journal froissé ou de linge ; un lit épais sous la marmite, du bourrage tout autour, une couverture pliée en trois par-dessus le couvercle, puis le couvercle de la boîte. À côté, la même boîte avec une marmite à moitié pleine : le raté. En séquence : la marmite fume à plein bouillon sur le poêle, couvercle mis ; elle descend tout de suite dans le nid creusé dans le bourrage ; la boîte refermée reste à l’écart du poêle, qui chauffe une bouilloire. En bas, la même chose dans une glacière et dans un tiroir sorti de la commode, une couverture roulée au fond qu’on tire par-dessus la marmite avant de fermer.',
    format: 'pleine',
    disposition: [['coupe', 'rate'], ['feu', 'nid', 'ferme'], ['glaciere', 'tiroir']],
    hauteurs: [5, 3, 2.6],
    largeurs: [[3, 2], [1, 1, 1], [1, 1]],
    vues: {
      coupe: {
        titre: 'En coupe, dans une boîte',
        dessin: z => {
          const G = z.h - 10, b = boiteCoupe(30, G, 1, 0.09);
          return [plancher(0, z.l, G), b.svg].join('\n');
        },
        renvois: z => {
          const G = z.h - 10, b = boiteCoupe(30, G, 1, 0.09);
          const c4 = b.couv(0.72);
          return [
            { n: 1, rond: [14, (b.potB + b.yiB) / 2], cible: [b.cx - 30, (b.potB + b.yiB) / 2], texte: 'lit épais dessous : jamais le fond nu' },
            { n: 2, rond: [z.l - 16, G - 100], cible: [b.xiR - 22, G - 100], texte: 'laine, foin, journal froissé ou linge, tassés autour' },
            { n: 3, rond: [14, G - 115], cible: [b.cx - 40, G - 115], texte: 'marmite pleine, à plein bouillon, couvercle mis' },
            { n: 4, rond: [z.l - 16, c4[1]], cible: c4, texte: 'couverture pliée par-dessus le couvercle' },
          ];
        },
      },
      rate: {
        titre: 'Raté : à moitié pleine',
        dessin: z => {
          const s = Math.min(1, (z.l - 44) / B.W), G = z.h - 10, b = boiteCoupe(10, G, s, 0.5);
          return [plancher(0, z.l, G), b.svg].join('\n');
        },
        renvois: z => {
          const s = Math.min(1, (z.l - 44) / B.W), G = z.h - 10, b = boiteCoupe(10, G, s, 0.5);
          const y = (b.potT + b.niveau) / 2 + 4;
          return [
            { n: 5, rond: [z.l - 14, y], cible: [b.cx + 20, y], texte: 'moitié vide : refroidit bien plus vite' },
          ];
        },
      },
      feu: {
        titre: 'Plein bouillon, couvercle mis',
        dessin: z => {
          const G = z.h - 6, p = poele(28, G, 130, 38), cx = 76, m = marmiteVue(cx, p.dessus, 0.46);
          const xl = m.xl - 2, xr = m.xr + 2, y = m.yT - 1;
          const vapeur = [
            `M ${r1(xl)},${r1(y)} q -6,-7 0,-13 q 6,-6 -1,-14`,
            `M ${r1(xr)},${r1(y)} q 6,-7 0,-13 q -6,-6 1,-14`,
            `M ${r1(xl + 12)},${r1(y - 7)} q -5,-6 0,-11 q 5,-5 -1,-11`,
          ];
          return [plancher(0, z.l, G), p.svg, m.svg, ...vapeur.map(d => h.path(d, h.a.detail))].join('\n');
        },
      },
      nid: {
        titre: 'Dans le nid, tout de suite',
        dessin: z => {
          const G = z.h - 6, s = 0.4, x0 = (z.l - B.W * s) / 2 - 12;
          const b = boiteCoupe(x0, G, s, 0.09, false);
          // on retire la marmite coupée : le nid est vide, la marmite descend au-dessus
          const W = B.W * s, t = B.t * s, cx = x0 + W / 2, pw = B.pw * s;
          const out = [plancher(0, z.l, G)];
          out.push(h.rect(x0 + t, b.yT, W - 2 * t, b.yiB - b.yT, h.a.hachure('isolant', 'aucun')));
          out.push(h.rect(cx - pw / 2 - 2, b.yT, pw + 4, b.potB - b.yT, h.a.blanc));
          out.push(h.path(`M ${r1(cx - pw / 2 - 2)},${r1(b.yT)} L ${r1(cx - pw / 2 - 2)},${r1(b.potB)} L ${r1(cx + pw / 2 + 2)},${r1(b.potB)} L ${r1(cx + pw / 2 + 2)},${r1(b.yT)}`, h.a.detail));
          out.push(h.path(`M ${r1(x0)},${r1(b.yT)} L ${r1(x0)},${r1(G)} L ${r1(x0 + W)},${r1(G)} L ${r1(x0 + W)},${r1(b.yT)} L ${r1(x0 + W - t)},${r1(b.yT)} L ${r1(x0 + W - t)},${r1(b.yiB)} L ${r1(x0 + t)},${r1(b.yiB)} L ${r1(x0 + t)},${r1(b.yT)} Z`, h.a.hachure('bois', 'contour')));
          const m = marmiteVue(cx, b.yT + 14, s);
          out.push(m.svg);
          const xf = x0 + W + 14;
          out.push(h.fleche(`M ${r1(xf)},${r1(m.kt + 4)} L ${r1(xf)},${r1(b.potB)}`));
          return out.join('\n');
        },
      },
      ferme: {
        titre: 'Refermée, on n’y touche plus',
        dessin: z => {
          const G = z.h - 6, x0 = 4, W = 70, H = 56, D = 36, out = [plancher(0, z.l, G)];
          const yH = G - H;
          out.push(h.path(`M ${pts([[x0 + W, yH], O(x0 + W, yH, D), O(x0 + W, G, D), [x0 + W, G]])} Z`, blanc(h.a.contour)));
          out.push(h.rect(x0, yH, W, H, blanc(h.a.contour)));
          for (const f of [1 / 3, 2 / 3]) {
            out.push(h.ligne(x0, yH + H * f, x0 + W, yH + H * f, h.a.detail));
            out.push(h.chemin([[x0 + W, yH + H * f], O(x0 + W, yH + H * f, D)], h.a.detail));
          }
          // un pan de couverture qui dépasse sous le couvercle
          out.push(h.path(`M ${x0 + 18},${yH} q 2,6 7,5 q 5,4 9,-1 q 4,5 9,0 q 3,4 7,-4 Z`, blanc(h.a.detail)));
          // le couvercle, une planche épaisse
          const c = 7, a = x0 - 3, bb = x0 + W + 3, pc = D + 3;
          out.push(h.path(`M ${pts([[bb, yH - c], O(bb, yH - c, pc), O(bb, yH, pc), [bb, yH]])} Z`, blanc(h.a.contour)));
          out.push(h.path(`M ${pts([[a, yH - c], O(a, yH - c, pc), O(bb, yH - c, pc), [bb, yH - c]])} Z`, blanc(h.a.contour)));
          out.push(h.rect(a, yH - c, bb - a, c, blanc(h.a.contour)));
          // le poêle sert à autre chose : la bouilloire
          const p = poele(137, G, 44, 46);
          out.push(p.svg);
          const kx = 153, kb = p.dessus;
          out.push(h.path(`M ${kx - 7},${kb - 20} Q ${kx},${kb - 40} ${kx + 7},${kb - 20}`, h.a.arete));
          out.push(h.path(`M ${kx + 11},${kb - 8} L ${kx + 22},${kb - 20} M ${kx + 13},${kb - 4} L ${kx + 24},${kb - 17} M ${kx + 22},${kb - 20} L ${kx + 24},${kb - 17}`, h.a.arete));
          out.push(h.path(`M ${kx - 15},${kb} L ${kx - 10},${kb - 20} Q ${kx},${kb - 24} ${kx + 10},${kb - 20} L ${kx + 15},${kb} Z`, blanc(h.a.contour)));
          out.push(h.ellipse(kx, kb - 23, 3, 1.6, blanc(h.a.arete)));
          return out.join('\n');
        },
      },
      glaciere: {
        titre: 'Dans une glacière',
        dessin: z => {
          const G = z.h - 6, W = 170, H = 62, D = 92, x0 = (z.l - W - D * 0.5) / 2;
          const c = contenant(x0, G, W, H, D, 8, 0, 6);
          const out = [c.svg];
          // poignée moulée sur le flanc, bouchon de vidange en bas de la face
          out.push(h.path(`M ${pts([O(x0 + W, G - H + 14, 32), O(x0 + W, G - H + 14, 60), O(x0 + W, G - H + 25, 60), O(x0 + W, G - H + 25, 32)])} Z`, h.a.arete));
          out.push(h.cercle(x0 + 14, G - 9, 3.5, blanc(h.a.arete)));
          out.push(h.ligne(x0 + 4, G - H + 7, x0 + W - 4, G - H + 7, h.a.detail));
          return out.join('\n');
        },
      },
      tiroir: {
        titre: 'Dans un tiroir',
        dessin: z => {
          const G = z.h - 6, W = 180, H = 50, D = 100, x0 = (z.l - W - D * 0.5) / 2;
          const c = contenant(x0, G, W, H, D, 5, 12, 0);
          const out = [c.svg];
          for (const f of [0.25, 0.75]) {
            out.push(h.cercle(x0 + W * f, G - H / 2, 4, blanc(h.a.arete)));
          }
          out.push(h.rect(x0 + 5, G - H + 5, W - 10, H - 10, h.a.detail));
          return out.join('\n');
        },
        renvois: z => {
          const G = z.h - 6, W = 180, H = 50, D = 100, x0 = (z.l - W - D * 0.5) / 2;
          const c = contenant(x0, G, W, H, D, 5, 12, 0);
          return [
            { n: 6, rond: [z.l - 12, c.rouleau[1]], cible: c.rouleau, texte: 'pas de couvercle : la couverture roulée se tire dessus' },
          ];
        },
      },
    },
  };
};
