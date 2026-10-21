// Planche 87-08b — Le trépied et les trois pierres. Chapitre 14, « Dehors : le foyer et ce qui
// remplace le bouton » : un trépied de perches vertes liées en tête, ou un feu au sol entre trois
// pierres plates, sèches et ramassées en hauteur (tableau de la section 9), le chaudron de fonte
// dessus ; cuire sur les braises, régler le feu en montant ou en descendant le chaudron.
// La charte : les deux perches de devant au contour fort, celle du fond en gris loin (sur le
// trépied et sur la tête grossie) ; la pierre du fond en gris loin, le bout droit des deux pierres
// de devant et le flanc droit des chaudrons à l'ombre. Le rouge : la bûche poussée au centre (le
// geste, vu de dessus) et le cran du crochet assis dans la boucle de corde (ce qui porte tout).
module.exports = (h) => {
  const W = t => t.replace('fill="none"', 'fill="#ffffff"');
  const GL = t => t.replace('fill="none"', 'fill="#E6E6E6"');
  const baton = (x1, y1, x2, y2, w1, w2 = w1, tr = h.a.arete, fond = W) => {
    const L = Math.hypot(x2 - x1, y2 - y1), nx = -(y2 - y1) / L, ny = (x2 - x1) / L;
    return h.chemin([[x1 + nx * w1 / 2, y1 + ny * w1 / 2], [x2 + nx * w2 / 2, y2 + ny * w2 / 2],
      [x2 - nx * w2 / 2, y2 - ny * w2 / 2], [x1 - nx * w1 / 2, y1 - ny * w1 / 2]], fond(tr), true);
  };
  // une perche qui passe par le croisement (cx, cy) : pied en (fx, fy), tête prolongée de t
  const perche = (fx, fy, cx, cy, t, w1, w2, tr = h.a.arete, fond = W) => {
    const L = Math.hypot(cx - fx, cy - fy), ux = (cx - fx) / L, uy = (cy - fy) / L;
    return baton(fx, fy, cx + ux * t, cy + uy * t, w1, w2, tr, fond);
  };
  // le corps du chaudron : fond blanc, flanc droit à l'ombre (lumière en haut à gauche), contour
  const corpsChaudron = (cx, yb, w, ht) => {
    const yr = yb - ht, a = w / 2;
    const d = `M ${cx - a} ${yr} C ${cx - a - w * 0.06} ${yr + ht * 0.55} ${cx - w * 0.36} ${yb} ${cx} ${yb} C ${cx + w * 0.36} ${yb} ${cx + a + w * 0.06} ${yr + ht * 0.55} ${cx + a} ${yr} Z`;
    const ombre = `M ${cx + a} ${yr} C ${cx + a + w * 0.06} ${yr + ht * 0.55} ${cx + w * 0.36} ${yb} ${cx} ${yb} C ${cx + w * 0.24} ${yb - ht * 0.14} ${cx + a - w * 0.1} ${yr + ht * 0.5} ${cx + a - w * 0.1} ${yr} Z`;
    return [h.path(d, h.a.blanc), h.path(ombre, h.a.ombre), h.path(d, h.a.contour)].join('\n');
  };
  const braises = (x0, x1, y, rangs = 2, s = 1) => {
    const out = [];
    for (let r = rangs - 1; r >= 0; r--) {
      let k = r * 3;
      for (let x = x0 + (r % 2) * 5 * s; x <= x1; x += 10 * s) {
        k++;
        const rx = (4 + (k * 7) % 3) * s, ry = (2.4 + ((k * 5) % 3) * 0.5) * s;
        out.push(h.ellipse(x, y - ry - r * 4.5 * s, rx, ry, W(h.a.detail)));
      }
    }
    return out.join('\n');
  };
  const flamme = (x, y, ht) => h.path(`M ${x} ${y} C ${x - ht * 0.35} ${y - ht * 0.3} ${x - ht * 0.1} ${y - ht * 0.7} ${x + ht * 0.05} ${y - ht} C ${x + ht * 0.12} ${y - ht * 0.6} ${x + ht * 0.38} ${y - ht * 0.35} ${x} ${y} Z`, W(h.a.detail));
  // champ = true : l'anse vue par la tranche, droite jusqu'au creux du crochet vu à plat
  const chaudron = (cx, yb, w, ht, hx, hy, champ = false) => {
    const yr = yb - ht, a = w / 2, out = [];
    if (champ) {
      out.push(corpsChaudron(cx, yb, w, ht));
      out.push(h.rect(cx - a - 3, yr - 4, w + 6, 4, W(h.a.arete)));
      out.push(h.ligne(cx, yr + 4, hx, hy, h.a.arete), h.cercle(cx, yr + 4, 2.2, W(h.a.detail)));
      return out.join('\n');
    }
    if (hx !== undefined) out.push(h.path(`M ${cx - a - 1} ${yr + 4} Q ${(cx - a + hx) / 2 - 4} ${(yr + hy) / 2} ${hx} ${hy} Q ${(cx + a + hx) / 2 + 4} ${(yr + hy) / 2} ${cx + a + 1} ${yr + 4}`, h.a.arete));
    out.push(corpsChaudron(cx, yb, w, ht));
    out.push(h.rect(cx - a - 3, yr - 4, w + 6, 4, W(h.a.arete)));
    out.push(h.cercle(cx - a - 1, yr + 4, 2.2, W(h.a.detail)), h.cercle(cx + a + 1, yr + 4, 2.2, W(h.a.detail)));
    return out.join('\n');
  };
  const sol = (z, g) => [
    h.rect(0, g, z.l, z.h - g - 2, h.a.hachure('terre', 'aucun')),
    h.ligne(0, g, z.l, g, h.a.contour),
  ].join('\n');
  // un crochet de branche : en bas, la branche courte gardée, qui ouvre vers le haut et prend
  // l'anse ; en haut, un cran du même côté, dessus à plat, qui s'assoit sur la boucle de corde.
  // Pas d'ergot en haut : il ouvrirait vers le haut comme celui du bas, et ne pendrait à rien.
  const crochet = (x, yh, yb, w = 7) => {
    const fx = x + w / 2, d = w * 0.45, hb = w * 0.6, fd = w * 0.4, yc = yh + w;
    return [
      baton(x + 1, yb - 4, x + 10, yb - 18, w - 1),
      h.chemin([[x - w / 2, yh], [fx, yh], [fx, yc], [fx - d, yc], [fx - d, yc + hb], [fx, yc + hb + fd],
        [fx, yb], [x - w / 2, yb]], W(h.a.arete), true),
    ].join('\n');
  };
  // la corde, en coupe, assise dans le cran ; et le creux où l'anse se loge
  const corde = (x, yh, w = 7) => [x + w / 2 - w * 0.45 + w * 0.3, yh + w * 1.3, w * 0.3];
  const creux = (x, yb) => [x + 5, yb - 14];
  // une pierre plate, de côté
  // fond = 'loin' : la pierre de derrière, en gris loin ; sinon le bout droit à l'ombre
  const pierre = (x0, x1, g, ht, fond) => {
    const d = `M ${x0} ${g} L ${x0 + 3} ${g - ht * 0.7} Q ${x0 + 7} ${g - ht} ${x0 + 20} ${g - ht} L ${x1 - 12} ${g - ht - 1} Q ${x1 - 2} ${g - ht + 2} ${x1} ${g - ht * 0.6} L ${x1 + 2} ${g} Z`;
    if (fond === 'loin') return h.path(d, GL(h.a.arete));
    return [h.path(d, h.a.blanc),
      h.path(`M ${x1 - 12} ${g - ht - 1} Q ${x1 - 2} ${g - ht + 2} ${x1} ${g - ht * 0.6} L ${x1 + 2} ${g} L ${x1 - 12} ${g} Z`, h.a.ombre),
      h.path(d, h.a.arete)].join('\n');
  };

  const HAUT_CROCHET = 116, FOND = 26;

  return {
    ref: '87-08b',
    titre: 'Le trépied et les trois pierres',
    desc: 'Deux foyers sans perche. Le trépied : trois perches vertes liées en tête, pieds écartés autour du feu, le chaudron pendu au-dessus des braises par un crochet de branche dont le cran du haut s’assoit sur une boucle de corde pendue à la tête. La tête grossie : tours serrés autour des trois perches, serrage entre elles ; à côté, des crochets de branche de trois longueurs, un par hauteur de feu, chacun avec son cran en haut et sa branche courte en bas, du même côté. Les trois pierres de côté : trois pierres plates et sèches, le chaudron posé sur elles, le feu dessous. Vu de dessus : les trois pierres en triangle, le chaudron en tireté, une bûche par ouverture, poussée vers le centre à mesure qu’elle brûle.',
    format: 'pleine',
    disposition: [['trepied', 'tete'], ['pierres', 'pplan']],
    hauteurs: [4, 3],
    largeurs: [[3, 2], [3, 2]],
    vues: {
      // ── Le trépied ────────────────────────────────────────────────────────────────────
      trepied: {
        titre: 'Le trépied de perches vertes',
        dessin: z => {
          const g = z.h - 24, cx = Math.round(z.l / 2), yt = 44, hy = g - HAUT_CROCHET;
          const out = [sol(z, g)];
          out.push(perche(cx + 22, g, cx, yt, 26, 9, 7, h.a.arete, GL));   // la perche du fond, gris loin
          out.push(braises(cx - 44, cx + 44, g, 2));
          // la boucle de corde pend de la tête (vue par la tranche), le cran du crochet assis dessus
          const xk = cx - 3, yk = yt + 26, [kx, ky, kr] = corde(xk, yk, 8), [ax, ay] = creux(xk, hy + 10);
          out.push(crochet(xk, yk, hy + 10, 8));
          // un anneau de corde allongé pend de la ligature ; son bas passe dans le cran
          out.push(h.formes.corde([[cx - 2, yt + 6], [kx - 5, (yt + ky) / 2], [kx - 2.5, ky + kr], [kx + 2.5, ky + kr], [kx + 5, (yt + ky) / 2], [cx + 2, yt + 6]], { ep: 3.2, debut: 'fixe', fin: 'fixe' }));
          out.push(chaudron(ax, g - FOND, 76, 46, ax, ay, true));
          out.push(perche(cx - 128, g, cx, yt, 26, 10, 7, h.a.contour));
          out.push(perche(cx + 128, g, cx, yt, 26, 10, 7, h.a.contour));
          out.push(h.rect(cx - 8, yt - 3, 16, 12, W(h.a.arete)));
          for (let y = yt; y <= yt + 6; y += 3) out.push(h.ligne(cx - 8, y, cx + 8, y, h.a.detail));
          // le point qui porte tout : le cran du crochet assis dans la boucle
          out.push(h.controle(kx, ky, 10));
          return out.join('\n');
        },
        renvois: z => {
          const g = z.h - 24, cx = Math.round(z.l / 2), yt = 44;
          return [
            { n: 1, rond: [cx - 64, yt + 20], cible: [cx - 30, yt + 44], texte: 'trois perches vertes' },
            { n: 2, rond: [cx - 116, g - 50], cible: [cx - 110, g - 26], texte: 'pieds écartés autour du feu' },
            { n: 3, rond: [cx + 52, yt + 12], cible: [cx, yt + 18], texte: 'boucle de corde sous la tête' },
            { n: 4, rond: [cx + 70, yt + 64], cible: [cx - 2, yt + 70], texte: 'le crochet règle la hauteur' },
          ];
        },
      },
      // ── La tête, grossie ──────────────────────────────────────────────────────────────
      tete: {
        titre: 'La tête, grossie',
        dessin: z => {
          const out = [], cx = 92, cy = 96, L = Math.min((z.h - 26 - cy) / 0.91, 160);
          const bas = (dx, dy, l) => { const n = Math.hypot(dx, dy); return [cx + dx / n * l, cy + dy / n * l]; };
          const [f3x, f3y] = bas(0.1, 1, L * 0.96), [f1x, f1y] = bas(-0.42, 0.91, L), [f2x, f2y] = bas(0.42, 0.91, L);
          out.push(perche(f3x, f3y, cx, cy, 56, 20, 18, h.a.arete, GL));   // la perche du fond
          out.push(perche(f1x, f1y, cx, cy, 58, 21, 18));
          out.push(perche(f2x, f2y, cx, cy, 58, 21, 18));
          // la ligature : tours serrés (devant les perches, retour derrière aux deux bords),
          // partis d'un cabestan sur la perche de gauche ; serrage entre les perches, fini d'un
          // cabestan sur la perche de droite
          const C = (pts, o = {}) => h.formes.corde(pts, { ep: 5.5, debut: 'fixe', fin: 'fixe', ...o });
          const ys = [cy - 10, cy - 3.5, cy + 3, cy + 9.5];
          const along = (dx, dy, s) => { const n = Math.hypot(dx, dy); return [cx + dx / n * s, cy + dy / n * s]; };
          // retours derrière, aux bords (dessinés d'abord : le devant passe dessus)
          for (const y of ys) {
            out.push(C([[cx + 30, y + 1.5], [cx + 35, y + 4.5], [cx + 30, y + 7.5]], { ep: 5 }));
            out.push(C([[cx - 30, y - 5], [cx - 35, y - 2], [cx - 30, y + 1]], { ep: 5 }));
          }
          // cabestan de départ, perche de gauche
          const cab = (dx, dy, s, sens) => {
            const n = Math.hypot(dx, dy), ux = dx / n, uy = dy / n, px = -uy, py = ux;
            const [ax, ay] = along(dx, dy, s), [bx, by] = along(dx, dy, s + 8);
            const r = 12.5;
            return { a: [ax, ay], b: [bx, by], u: [ux, uy], p: [px, py], r };
          };
          const k1 = cab(-0.42, 0.91, 62), k2 = cab(0.42, 0.91, 62);
          const tourCab = (k, side) => {
            const [ax, ay] = k.a, [bx, by] = k.b, [px, py] = k.p, r = k.r * side;
            return [
              // les deux tours devant la perche, et la croix entre eux
              C([[ax - px * r, ay - py * r], [ax + px * r, ay + py * r]], { ep: 5 }),
              C([[ax + px * r, ay + py * r], [bx - px * r, by - py * r]], { ep: 5 }),
              C([[bx - px * r, by - py * r], [bx + px * r, by + py * r]], { ep: 5 }),
            ].join('\n');
          };
          // dormant : du cabestan gauche monte au premier tour
          out.push(C([[k1.a[0] - k1.p[0] * k1.r, k1.a[1] - k1.p[1] * k1.r], [cx - 40, cy + 10], [cx - 34, ys[0] - 2], [cx - 30, ys[0] - 5]], { ep: 5 }));
          out.push(tourCab(k1, 1));
          // bout libre du départ, qui dépasse sous le nœud
          out.push(C([[k1.b[0] + k1.p[0] * k1.r, k1.b[1] + k1.p[1] * k1.r], [k1.b[0] + k1.p[0] * 20 - 2, k1.b[1] + k1.p[1] * 20 + 22]], { ep: 5, fin: 'libre' }));
          // tours horizontaux, devant
          for (const y of ys) out.push(C([[cx - 30, y + 1], [cx, y + 3], [cx + 30, y + 1.5]]));
          // serrage : deux tours qui descendent dans l'écart, ceinturent les tours et remontent
          for (const x of [cx - 9, cx - 2]) {
            out.push(C([[x, cy - 16], [x - 0.5, cy], [x, cy + 17]], { ep: 5 }));
          }
          out.push(C([[cx - 9, cy - 16], [cx - 5.5, cy - 20], [cx - 2, cy - 16]], { ep: 5 }));
          out.push(C([[cx - 9, cy + 17], [cx - 5.5, cy + 21], [cx - 2, cy + 17]], { ep: 5 }));
          // du serrage au cabestan de fin, perche de droite
          out.push(C([[cx - 2, cy + 17], [cx + 14, cy + 34], [k2.a[0] + k2.p[0] * k2.r, k2.a[1] + k2.p[1] * k2.r]], { ep: 5 }));
          out.push(tourCab(k2, -1));
          out.push(C([[k2.b[0] - k2.p[0] * k2.r, k2.b[1] - k2.p[1] * k2.r], [k2.b[0] - k2.p[0] * 20 + 2, k2.b[1] - k2.p[1] * 20 + 22]], { ep: 5, fin: 'libre' }));
          // des crochets de rechange, un par hauteur de feu
          const y0 = 40;
          [[z.l - 80, 70], [z.l - 50, 115], [z.l - 20, 160]].forEach(([x, l]) => out.push(crochet(x, y0, y0 + l, 10)));
          return out.join('\n');
        },
        renvois: z => {
          const cx = 92, cy = 96;
          return [
            { n: 5, rond: [cx - 64, cy - 30], cible: [cx - 24, cy - 4], texte: 'tours serrés sur les trois' },
            { n: 6, rond: [cx + 58, cy - 34], cible: [cx - 5, cy - 18], texte: 'serrage entre les perches' },
            { n: 7, rond: [z.l - 34, 18], cible: [z.l - 18, 54], texte: 'cran côté crochet, sur la boucle' },
            { n: 8, rond: [z.l - 50, 40 + 115 + 40], cible: [z.l - 50, 40 + 115], texte: 'un crochet par hauteur' },
          ];
        },
      },
      // ── Les trois pierres, de côté ────────────────────────────────────────────────────
      pierres: {
        titre: 'Les trois pierres, de côté',
        dessin: z => {
          const g = z.h - 40, cx = Math.round(z.l / 2);
          const out = [sol(z, g)];
          out.push(pierre(cx - 30, cx + 30, g - 6, 30, 'loin'));             // la pierre du fond
          out.push(chaudron(cx, g - 18, 140, 80));
          out.push(braises(cx - 36, cx + 36, g, 2, 1.2));
          [[cx - 26, 14], [cx - 14, 18], [cx + 14, 17], [cx + 26, 13]].forEach(([x, t]) => out.push(flamme(x, g - 8, t)));
          out.push(h.cercle(cx, g - 12, 12, W(h.a.arete)), h.cercle(cx, g - 12, 7, h.a.fin), h.cercle(cx, g - 12, 2.5, h.a.fin));
          out.push(pierre(cx - 118, cx - 44, g, 36), pierre(cx + 44, cx + 118, g, 36));
          out.push(h.path(`M ${cx - 108} ${g - 14} L ${cx - 96} ${g - 20} L ${cx - 88} ${g - 18}`, h.a.fin));
          out.push(h.path(`M ${cx + 72} ${g - 26} L ${cx + 84} ${g - 22} L ${cx + 100} ${g - 25}`, h.a.fin));
          return out.join('\n');
        },
        renvois: z => {
          const g = z.h - 40, cx = Math.round(z.l / 2);
          return [
            { n: 9, rond: [cx - 140, g - 64], cible: [cx - 100, g - 30], texte: 'pierres plates et sèches' },
            { n: 10, rond: [cx + 124, g - 110], cible: [cx + 50, g - 62], texte: 'chaudron posé sur les trois' },
          ];
        },
      },
      // ── Vu de dessus ──────────────────────────────────────────────────────────────────
      pplan: {
        titre: 'Vu de dessus',
        dessin: z => {
          const out = [], cx = Math.round(z.l / 2), cy = Math.round(z.h / 2) - 6;
          const pol = (a, r) => [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
          const deg = Math.PI / 180;
          // les bûches, une par ouverture
          for (const a of [90, 210, 330]) {
            const [x1, y1] = pol(a * deg, 16), [x2, y2] = pol(a * deg, 104);
            out.push(baton(x1, y1, x2, y2, 13, 14));
          }
          out.push(braises(cx - 18, cx + 18, cy + 8, 4, 0.9));
          // les trois pierres
          for (const a of [-90, 30, 150]) {
            const [x, y] = pol(a * deg, 50);
            out.push(h.ellipse(x, y, 25, 19, W(h.a.arete)));
            out.push(h.path(`M ${x - 12} ${y + 2} L ${x - 2} ${y - 5} L ${x + 9} ${y - 2}`, h.a.fin));
          }
          out.push(h.cercle(cx, cy, 64, h.a.cache));
          const [ax, ay] = pol(90 * deg, 100);
          out.push(h.geste(`M ${ax + 20} ${ay} L ${ax + 20} ${ay - 34}`));
          return out.join('\n');
        },
        renvois: z => {
          const cx = Math.round(z.l / 2), cy = Math.round(z.h / 2) - 6;
          return [
            { n: 11, rond: [cx - 70, cy + 100], cible: [cx - 7, cy + 90], texte: 'une bûche par ouverture' },
            { n: 12, rond: [cx + 64, cy + 112], cible: [cx + 20, cy + 84], texte: 'poussée au centre en brûlant' },
          ];
        },
      },
    },
  };
};
