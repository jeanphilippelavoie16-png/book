// Planche 03-08. La marmite norvégienne (ch. 3, section 9, variante d’urgence de la cuisson).
// Une boîte, une glacière ou un tiroir bourré de laine, de foin, de journal froissé ou de
// linge d'hiver ; la marmite y descend pleine, à plein bouillon, couvercle mis, entourée de
// tous les côtés, y compris dessous. Aucun chiffre : le chapitre n'en donne aucun sur l'objet.
//
// La charte : le vide de la marmite au-dessus du bouillon, et le nid creusé dans le bourrage, en
// gris loin (on voit le fond par la coupe) ; la face de droite des boîtes en perspective à
// l'ombre. Le rouge : la marmite qu'on descend dans le nid, la couverture qu'on tire (une flèche
// par vue) ; le lit sous la marmite et le niveau du raté, cerclés.
//
// Reprise le 19 octobre 2026 (second regard) : dans la marmite du raté, le motif de l'eau est calé (CALE_RATE) ; une
// crête de vaguelette dépassait du fond, et la rangée du haut collait à la surface et à la paroi droite. La coupe
// pleine n'a pas changé.
module.exports = (h) => {
  const blanc = a => a.replace('fill="none"', h.a.blanc.split(' ')[0]);
  const ombre = a => a.replace('fill="none"', h.a.ombre.split(' ')[0]);
  const r1 = v => Math.round(v * 10) / 10;
  const pts = p => p.map(q => q.map(r1).join(',')).join(' ');

  // La boîte en coupe, à l'échelle 1 de la vue principale
  const B = { W: 260, t: 9, H: 196, tl: 9, pw: 130, ph: 100, hb: 40 };
  // Le calage du motif de l'eau dans la marmite du raté : quatre vaguelettes entières, à plus de 4 unités de la surface
  // et du fond, à plus de 3 des parois, aucune dans le cercle rouge du niveau (cherché par calcul, regardé de près).
  const CALE_RATE = [-2.5, -6.5];

  // ── La marmite coupée : paroi, contenu, couvercle bombé, poignée ──
  // cale = [tx, ty] : le motif de l'eau calé (la forme tracée décalée de (−tx, −ty) dans un groupe déplacé de
  // (tx, ty) ; elle reste en place, seules les vaguelettes bougent), pour qu'aucune ne soit coupée par un bord.
  const marmiteCoupe = (cx, yB, s, niveau, cale = null) => {
    const w = B.pw * s, ht = B.ph * s;
    const xl = cx - w / 2, xr = cx + w / 2, yT = yB - ht, r = 8 * s, dome = 9 * s;
    const fond = `L ${r1(xl)},${r1(yB - r)} Q ${r1(xl)},${r1(yB)} ${r1(xl + r)},${r1(yB)} L ${r1(xr - r)},${r1(yB)} Q ${r1(xr)},${r1(yB)} ${r1(xr)},${r1(yB - r)}`;
    const out = [];
    for (const [x, d] of [[xl, -1], [xr, 1]]) {
      out.push(h.path(`M ${r1(x)},${r1(yT + 5 * s)} C ${r1(x + d * 12 * s)},${r1(yT + 5 * s)} ${r1(x + d * 12 * s)},${r1(yT + 17 * s)} ${r1(x)},${r1(yT + 17 * s)}`, h.a.arete));
    }
    out.push(h.path(`M ${r1(xl)},${r1(yT)} ${fond} L ${r1(xr)},${r1(yT)} L ${r1(xr + 3 * s)},${r1(yT)} Q ${r1(cx)},${r1(yT - 2 * dome)} ${r1(xl - 3 * s)},${r1(yT)} Z`, h.a.blanc));
    out.push(h.rect(xl, yT, xr - xl, niveau - yT, h.a.loin));
    if (cale) {
      const [tx, ty] = cale, dx = -tx, dy = -ty;
      const fondC = `L ${r1(xl + dx)},${r1(yB - r + dy)} Q ${r1(xl + dx)},${r1(yB + dy)} ${r1(xl + r + dx)},${r1(yB + dy)} L ${r1(xr - r + dx)},${r1(yB + dy)} Q ${r1(xr + dx)},${r1(yB + dy)} ${r1(xr + dx)},${r1(yB - r + dy)}`;
      out.push(`<g transform="translate(${tx} ${ty})">\n${h.path(`M ${r1(xl + dx)},${r1(niveau + dy)} ${fondC} L ${r1(xr + dx)},${r1(niveau + dy)} Z`, h.a.hachure('eau', 'aucun'))}\n</g>`);
    } else out.push(h.path(`M ${r1(xl)},${r1(niveau)} ${fond} L ${r1(xr)},${r1(niveau)} Z`, h.a.hachure('eau', 'aucun')));
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
  const boiteCoupe = (x0, G, s, niveauRel, avecCouvercle = true, caleEau = null) => {
    const W = B.W * s, t = B.t * s, H = B.H * s, tl = B.tl * s;
    const xiL = x0 + t, xiR = x0 + W - t, yiB = G - t, yT = G - H, cx = x0 + W / 2;
    const potB = yiB - B.hb * s, potT = potB - B.ph * s;
    const niveau = potT + niveauRel * B.ph * s;
    const out = [];
    out.push(h.rect(xiL, yT, xiR - xiL, yiB - yT, h.a.hachure('isolant', 'aucun')));
    const m = marmiteCoupe(cx, potB, s, niveau, caleEau);
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
    out.push(h.path(`M ${pts([[x0 + W, yH], O(x0 + W, yH, D), O(x0 + W, G, D), [x0 + W, G]])} Z`, ombre(h.a.contour)));
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
    const rouleau = O(x0 + W - ep - rr - 24, yH - rr, pr);
    // la marmite : son couvercle affleure, ou dépasse d'un tiroir trop bas
    const [cx, cy] = O(x0 + W / 2, yH, D / 2), rx = W * 0.19, ry = rx * 0.36;
    if (depasse) {
      // le bourrage remonté contre le flanc de la marmite, devant
      const g = cx - rx - 14, d = cx + rx + 14, yb = cy + 2;
      const dessus = `M ${r1(d)},${r1(yb)} Q ${r1(cx)},${r1(cy + ry - depasse - 2)} ${r1(g)},${r1(yb)}`;
      out.push(h.path(`M ${r1(g)},${r1(yb)} Q ${r1(cx)},${r1(cy + ry + 12)} ${r1(d)},${r1(yb)} ` + dessus.slice(dessus.indexOf('Q')) + ' Z', h.a.hachure('isolant', 'aucun')));
      // le corps de la marmite s'arrête à la surface du bourrage : elle est enfoncée dans le nid
      const ycrb = cy + ry - depasse - 2, yq = u => (1 - u) * (1 - u) * yb + 2 * u * (1 - u) * ycrb + u * u * yb;
      const u0 = (cx - rx - g) / (d - g), sb = [];
      for (let i = 0; i <= 16; i++) { const u = 1 - u0 - (1 - 2 * u0) * i / 16; sb.push([g + (d - g) * u, yq(u)]); }
      out.push(h.path(`M ${r1(cx - rx)},${r1(cy - depasse)} L ${pts(sb.slice().reverse())} L ${r1(cx + rx)},${r1(cy - depasse)} Z`, blanc(h.a.contour)));
      const bord = (a, b) => { const q = []; for (let i = 0; i <= 6; i++) { const u = a + (b - a) * i / 6; q.push([g + (d - g) * u, yq(u)]); } return q; };
      out.push(h.chemin(bord(0, u0), h.a.detail), h.chemin(bord(1 - u0, 1), h.a.detail));
    }
    const yc = cy - depasse;
    for (const d of [-1, 1]) out.push(h.path(`M ${r1(cx + d * rx)},${r1(yc + 1)} C ${r1(cx + d * (rx + 9))},${r1(yc + 1)} ${r1(cx + d * (rx + 9))},${r1(yc + 8)} ${r1(cx + d * rx)},${r1(yc + 8)}`, h.a.arete));
    out.push(h.ellipse(cx, yc, rx + 2, ry + 1, blanc(h.a.arete)));
    out.push(h.ellipse(cx, yc - 2, rx - 5, ry - 2, h.a.detail));
    out.push(h.rect(cx - 5, yc - 8, 10, 5, blanc(h.a.arete)));
    out.push(h.ellipse(cx, yc - 8, 5, 1.8, blanc(h.a.arete)));
    // la couverture se tire de l'arrière vers l'avant, par-dessus le couvercle
    const xa = x0 + W / 2 - rx * 0.6, [ax1, ay1] = O(xa, yH - 2, pr - rr - 2), [ax2, ay2] = O(xa, yH, -24);
    const df = `M ${r1(ax1)},${r1(ay1)} L ${r1(ax2)},${r1(ay2)}`;
    out.push(`<path d="${df}" fill="none" stroke="#fff" stroke-width="5"/>`);
    out.push(h.geste(df));
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
          // le lit sous la marmite : le point qui manque le plus souvent
          return [plancher(0, z.l, G), b.svg, h.controle(b.cx + 40, (b.potB + b.yiB) / 2, 23)].join('\n');
        },
        renvois: z => {
          const G = z.h - 10, b = boiteCoupe(30, G, 1, 0.09);
          const c4 = b.couv(0.72);
          return [
            { n: 1, rond: [14, b.potB + (b.yiB - b.potB) * 0.62], cible: [b.cx - 30, b.potB + (b.yiB - b.potB) * 0.62], texte: 'un lit épais sous la marmite' },
            { n: 2, rond: [z.l - 16, G - 100], cible: [b.xiR - 22, G - 100], texte: 'laine, foin, journal ou linge, bien tassés' },
            { n: 3, rond: [14, G - 115], cible: [b.cx - 40, G - 115], texte: 'marmite pleine, à plein bouillon, couvercle mis' },
            { n: 4, rond: [z.l - 16, c4[1]], cible: c4, texte: 'couverture pliée par-dessus le couvercle' },
          ];
        },
      },
      rate: {
        titre: 'Raté : à moitié pleine',
        dessin: z => {
          const s = Math.min(1, (z.l - 44) / B.W), G = z.h - 10, b = boiteCoupe(10, G, s, 0.5, true, CALE_RATE);
          // le niveau : là où le raté se joue
          return [plancher(0, z.l, G), b.svg, h.controle(b.m.xl + 26, b.niveau, 13)].join('\n');
        },
        renvois: z => {
          const s = Math.min(1, (z.l - 44) / B.W), G = z.h - 10, b = boiteCoupe(10, G, s, 0.5, true, CALE_RATE);
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
          out.push(h.rect(cx - pw / 2 - 2, b.yT, pw + 4, b.potB - b.yT, h.a.loin));
          out.push(h.path(`M ${r1(cx - pw / 2 - 2)},${r1(b.yT)} L ${r1(cx - pw / 2 - 2)},${r1(b.potB)} L ${r1(cx + pw / 2 + 2)},${r1(b.potB)} L ${r1(cx + pw / 2 + 2)},${r1(b.yT)}`, h.a.detail));
          out.push(h.path(`M ${r1(x0)},${r1(b.yT)} L ${r1(x0)},${r1(G)} L ${r1(x0 + W)},${r1(G)} L ${r1(x0 + W)},${r1(b.yT)} L ${r1(x0 + W - t)},${r1(b.yT)} L ${r1(x0 + W - t)},${r1(b.yiB)} L ${r1(x0 + t)},${r1(b.yiB)} L ${r1(x0 + t)},${r1(b.yT)} Z`, h.a.hachure('bois', 'contour')));
          const m = marmiteVue(cx, b.yT + 14, s);
          out.push(m.svg);
          const xf = x0 + W + 14;
          out.push(h.geste(`M ${r1(xf)},${r1(m.kt + 4)} L ${r1(xf)},${r1(b.potB)}`));
          return out.join('\n');
        },
      },
      ferme: {
        titre: 'Refermée, on n’y touche plus',
        dessin: z => {
          const G = z.h - 6, x0 = 4, W = 70, H = 56, D = 36, out = [plancher(0, z.l, G)];
          const yH = G - H;
          out.push(h.path(`M ${pts([[x0 + W, yH], O(x0 + W, yH, D), O(x0 + W, G, D), [x0 + W, G]])} Z`, ombre(h.a.contour)));
          out.push(h.rect(x0, yH, W, H, blanc(h.a.contour)));
          for (const f of [1 / 3, 2 / 3]) {
            out.push(h.ligne(x0, yH + H * f, x0 + W, yH + H * f, h.a.detail));
            out.push(h.chemin([[x0 + W, yH + H * f], O(x0 + W, yH + H * f, D)], h.a.detail));
          }
          // un pan de couverture qui dépasse sous le couvercle
          out.push(h.path(`M ${x0 + 18},${yH} q 2,6 7,5 q 5,4 9,-1 q 4,5 9,0 q 3,4 7,-4 Z`, blanc(h.a.detail)));
          // le couvercle, une planche épaisse
          const c = 7, a = x0 - 3, bb = x0 + W + 3, pc = D + 3;
          out.push(h.path(`M ${pts([[bb, yH - c], O(bb, yH - c, pc), O(bb, yH, pc), [bb, yH]])} Z`, ombre(h.a.contour)));
          out.push(h.path(`M ${pts([[a, yH - c], O(a, yH - c, pc), O(bb, yH - c, pc), [bb, yH - c]])} Z`, blanc(h.a.contour)));
          out.push(h.rect(a, yH - c, bb - a, c, blanc(h.a.contour)));
          // le poêle sert à autre chose : la bouilloire. Le même poêle que dans la première vignette, plus petit.
          const p = poele(z.l - 88, G, 84, 25);
          out.push(p.svg);
          const kx = z.l - 60, kb = p.dessus;
          // le bec, puis le corps par-dessus sa racine, l'anse, le bouton du couvercle (le 16 octobre : elle
          // était un trapèze, et le poêle n'était pas celui de la première vignette)
          out.push(h.path(`M ${kx + 10},${kb - 5} L ${kx + 26},${kb - 23} L ${kx + 28.5},${kb - 20.5} L ${kx + 13},${kb - 1} Z`, blanc(h.a.arete)));
          out.push(h.path(`M ${kx - 16},${kb} L ${kx + 16},${kb} Q ${kx + 18},${kb - 12} ${kx + 10},${kb - 19} Q ${kx},${kb - 25} ${kx - 10},${kb - 19} Q ${kx - 18},${kb - 12} ${kx - 16},${kb} Z`, blanc(h.a.contour)));
          out.push(h.ligne(kx - 11, kb - 18, kx + 11, kb - 18, h.a.detail));
          out.push(h.path(`M ${kx - 9},${kb - 20} C ${kx - 9},${kb - 37} ${kx + 9},${kb - 37} ${kx + 9},${kb - 20}`, h.a.arete));
          out.push(h.rect(kx - 2.5, kb - 26, 5, 3.5, blanc(h.a.arete)));
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
        renvois: z => {
          const G = z.h - 6, W = 170, H = 62, D = 92, x0 = (z.l - W - D * 0.5) / 2;
          const c = contenant(x0, G, W, H, D, 8, 0, 6);
          return [
            { n: 6, rond: [z.l - 12, c.rouleau[1]], cible: c.rouleau, texte: 'couverture roulée, à tirer par-dessus' },
          ];
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
            { n: 7, rond: [z.l - 12, c.rouleau[1]], cible: c.rouleau, texte: 'sans couvercle : la couverture en tient lieu' },
          ];
        },
      },
    },
  };
};
