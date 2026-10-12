// Planche 112-07 — La lampe à graisse (ch. 89, §5-J et variante H)
module.exports = (h) => {
  const blancTrait = (t) => h.a[t].replace('fill="none"', 'fill="#ffffff"');

  // Une mèche de coton torsadée, le long d'une polyligne : deux bords et des traits de torsion.
  const meche = (pts, ep = 7, pas = 7) => {
    // échantillonnage régulier le long de la polyligne
    const seg = [];
    let tot = 0;
    for (let i = 1; i < pts.length; i++) {
      const [x1, y1] = pts[i - 1], [x2, y2] = pts[i];
      const d = Math.hypot(x2 - x1, y2 - y1);
      seg.push({ x1, y1, x2, y2, d, t0: tot });
      tot += d;
    }
    const at = (s) => {
      const g = seg.find(q => s <= q.t0 + q.d) || seg[seg.length - 1];
      const u = g.d ? Math.min(1, (s - g.t0) / g.d) : 0;
      const nx = -(g.y2 - g.y1) / g.d, ny = (g.x2 - g.x1) / g.d;
      return { x: g.x1 + (g.x2 - g.x1) * u, y: g.y1 + (g.y2 - g.y1) * u, nx, ny, tx: -ny, ty: nx };
    };
    const n = Math.max(2, Math.round(tot / 2));
    const g = [], d = [];
    for (let i = 0; i <= n; i++) {
      const p = at((tot * i) / n);
      g.push([p.x + p.nx * ep / 2, p.y + p.ny * ep / 2]);
      d.push([p.x - p.nx * ep / 2, p.y - p.ny * ep / 2]);
    }
    const corps = [...g, ...d.reverse()];
    // les brins : une courbe par tour, d'un bord à l'autre, en un seul tracé
    let brins = '';
    for (let s = pas / 2; s < tot - 2; s += pas) {
      const p = at(s), q = at(Math.min(tot, s + ep * 0.8));
      const ax = p.x + p.nx * ep / 2, ay = p.y + p.ny * ep / 2;
      const bx = q.x - q.nx * ep / 2, by = q.y - q.ny * ep / 2;
      const cx = (ax + bx) / 2 - p.tx * ep * 0.3, cy = (ay + by) / 2 - p.ty * ep * 0.3;
      brins += `M ${ax.toFixed(1)} ${ay.toFixed(1)} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${bx.toFixed(1)} ${by.toFixed(1)} `;
    }
    return [h.chemin(corps, blancTrait('arete'), true), h.path(brins, h.a.detail)].join('\n');
  };

  // Une flamme debout, pointe en haut, base en (x, y).
  const flamme = (x, y, ht) => {
    const l = ht * 0.32;
    const ext = `M ${x} ${y} C ${x - l * 1.3} ${y - ht * 0.15} ${x - l * 0.7} ${y - ht * 0.6} ${x} ${y - ht} C ${x + l * 0.7} ${y - ht * 0.6} ${x + l * 1.3} ${y - ht * 0.15} ${x} ${y} Z`;
    const hi = ht * 0.45, li = l * 0.45;
    const int = `M ${x} ${y - 2} C ${x - li * 1.3} ${y - hi * 0.2} ${x - li * 0.6} ${y - hi * 0.7} ${x} ${y - hi} C ${x + li * 0.6} ${y - hi * 0.7} ${x + li * 1.3} ${y - hi * 0.2} ${x} ${y - 2} Z`;
    return [h.path(ext, blancTrait('arete')), h.path(int, h.a.detail)].join('\n');
  };

  return {
    ref: '112-07',
    titre: 'La lampe à graisse',
    desc: 'Une boîte de conserve à bords bas remplie de gras mou, une mèche de coton torsadée couchée au fond, une seule pointe qui sort au bord et porte la flamme ; l’encadré danger rappelle le monoxyde.',
    format: 'demi',
    disposition: [['meche', 'coupe', 'vue']],
    hauteurs: [1],
    largeurs: [[2, 5, 4]],
    vues: {
      meche: {
        titre: 'La mèche',
        dessin: z => {
          const cx = z.l / 2 - 10, y0 = 8;
          const bande = `M ${cx - 12} ${y0 + 2} L ${cx - 8} ${y0} L ${cx - 4} ${y0 + 2} L ${cx} ${y0} L ${cx + 4} ${y0 + 2} L ${cx + 8} ${y0} L ${cx + 12} ${y0 + 2} L ${cx + 12} 62 C ${cx + 12} 70 ${cx + 4} 73 ${cx + 4} 80 L ${cx - 4} 80 C ${cx - 4} 73 ${cx - 12} 70 ${cx - 12} 62 Z`;
          return [
            h.path(bande, blancTrait('arete')),
            h.path(`M ${cx - 11} 63 Q ${cx - 2} 66 ${cx + 5} 76`, h.a.detail),
            h.path(`M ${cx - 6} 61 Q ${cx + 4} 63 ${cx + 10} 70`, h.a.detail),
            meche([[cx, 79], [cx, z.h - 6]], 8, 7),
            h.fleche(`M ${cx - 13} ${z.h - 30} A 13 5 0 0 0 ${cx + 13} ${z.h - 30}`),
          ].join('\n');
        },
        renvois: z => {
          const cx = z.l / 2 - 10;
          return [
            { n: 1, rond: [z.l - 12, 34], cible: [cx + 12.7, 34], texte: 'bande de vieux t-shirt, coton seulement' },
            { n: 2, rond: [z.l - 12, 118], cible: [cx + 4.7, 118], texte: 'torsadée serrée sur toute la longueur' },
          ];
        },
      },
      coupe: {
        titre: 'En coupe',
        dessin: z => {
          const cx0 = 36, cx1 = z.l - 42, yb = z.h - 23, yr = yb - 40, yf = yr + 8, ym = (yr + yb) / 2;
          const bord = [[cx0, yr + 3], [cx0, ym - 4], [cx0 - 3, ym], [cx0, ym + 4], [cx0, yb], [cx1, yb], [cx1, ym + 4], [cx1 + 3, ym], [cx1, ym - 4], [cx1, yr + 3]];
          const tx = cx1 + 10, ty = yr - 6;
          return [
            h.rect(0, yb + 7, z.l, 12, h.a.hachure('bois', 'detail')),
            h.rect(cx0 - 14, yb + 1.2, cx1 - cx0 + 28, 5.8, h.a.hachure('metal', 'arete')),
            h.rect(cx0 + 1.2, yf, cx1 - cx0 - 2.4, yb - yf - 1.2, h.a.hachure('eau', 'aucun')),
            h.ligne(cx0, yf, cx1, yf, h.a.arete),
            h.chemin(bord, h.a.contour),
            h.cercle(cx0 - 2.2, yr + 2, 3.2, blancTrait('arete')),
            h.cercle(cx1 + 2.2, yr + 2, 3.2, blancTrait('arete')),
            meche([[cx0 + 30, yb - 5], [cx1 - 60, yb - 5], [cx1 - 8, yr + 2], [tx, ty]], 7, 7),
            flamme(tx - 3, yr + 1, 48),
            h.cercle(tx - 2.5, ty, 3, h.a.plein),
            h.fleche(`M ${cx1 - 60} ${yb - 22} L ${cx1 - 26} ${yb - 43}`),
          ].join('\n');
        },
        renvois: z => {
          const cx0 = 36, cx1 = z.l - 42, yb = z.h - 23, yr = yb - 40, yf = yr + 8;
          return [
            { n: 3, rond: [14, yr - 14], cible: [cx0 - 5, yr + 1], texte: 'boîte de conserve à bords bas' },
            { n: 4, rond: [66, 40], cible: [80, yf + 12], texte: 'gras mou, lard de phoque, huile de poisson' },
            { n: 5, rond: [110, 40], cible: [108, yb - 9], texte: 'mèche couchée au fond du gras' },
            { n: 6, rond: [150, 22], cible: [cx1 - 43, yb - 32.5], texte: 'sortir la mèche règle la lumière' },
          ];
        },
      },
      vue: {
        titre: 'Allumée',
        dessin: z => {
          const cx = z.l / 2 - 6, cy = 66, rx = 80, ry = 24, hc = 30, R = 92, Ry = 28;
          const pb = cy + hc;
          const plaque = `M ${cx - R} ${pb} L ${cx - R} ${pb + 4} A ${R} ${Ry} 0 0 0 ${cx + R} ${pb + 4} L ${cx + R} ${pb} Z`;
          const corps = `M ${cx - rx} ${cy} L ${cx - rx} ${cy + hc} A ${rx} ${ry} 0 0 0 ${cx + rx} ${cy + hc} L ${cx + rx} ${cy} A ${rx} ${ry} 0 0 0 ${cx - rx} ${cy} Z`;
          const nervure = (y) => h.path(`M ${cx - rx} ${y} A ${rx} ${ry} 0 0 0 ${cx + rx} ${y}`, h.a.detail);
          const a = -25 * Math.PI / 180;
          const bx = cx + rx * Math.cos(a), by = cy + ry * Math.sin(a);
          const tx = cx + 78, ty = cy - 15;
          return [
            h.path(plaque, blancTrait('arete')),
            h.ellipse(cx, pb, R, Ry, h.a.hachure('metal', 'arete')),
            h.path(corps, blancTrait('contour')),
            nervure(cy + 12), nervure(cy + 16),
            h.ellipse(cx, cy, rx, ry, h.a.contour),
            h.ellipse(cx, cy, rx - 4, ry - 2, h.a.detail),
            h.path(`M ${cx - rx + 5} ${cy + 5} A ${rx - 5} ${ry - 4} 0 0 1 ${cx + rx - 5} ${cy + 5}`, h.a.detail),
            meche([[cx - 40, cy + 12], [cx - 10, cy + 6], [cx + 20, cy + 8], [cx + 50, cy - 2], [bx - 4, by + 1], [tx, ty]], 5, 6),
            flamme(tx - 2, ty + 4, 44),
            h.cercle(tx - 1.5, ty, 2.4, h.a.plein),
          ].join('\n');
        },
        renvois: z => {
          const cx = z.l / 2 - 6, cy = 66, rx = 80, ry = 24, hc = 30, Ry = 28;
          const a = -25 * Math.PI / 180;
          const bx = cx + rx * Math.cos(a), by = cy + ry * Math.sin(a);
          const px = cx - 56, py = cy + hc + 4 + Ry * Math.sqrt(1 - (56 / 92) ** 2);
          return [
            { n: 7, rond: [z.l - 10, cy], cible: [bx + 2.5, by + 2], texte: 'une seule pointe dépasse du bord' },
            { n: 8, rond: [18, z.h - 14], cible: [px, py + 1], texte: 'support de métal, surface stable' },
          ];
        },
      },
    },
    danger: 'Une lampe à graisse qui fume fait du monoxyde, qui endort avant de tuer : jamais dans une chambre fermée où quelqu’un dort.',
  };
};
