// Planche 104-02 — Le point sellier et la couture rabattue.
// Chapitre 81, §5-B étapes 7 et 8, §5-C étapes 13 et 15.

const N = '#1A1A1A', B = '#FFFFFF';
const fil = (ep, coul = N, cap = 'round') =>
  `fill="none" stroke="${coul}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="${cap}"`;
const pts = (p) => p.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L ');

module.exports = (h) => {
  // Brin plein (une moitié du fil) et brin creux (l'autre moitié).
  const plein = (p) => h.path(`M ${pts(p)}`, fil(3));
  const creux = (p) => h.path(`M ${pts(p)}`, fil(4.8)) + '\n' + h.path(`M ${pts(p)}`, fil(2, B));
  const halo = (x1, y1, x2, y2) => h.ligne(x1, y1, x2, y2, fil(9, B, 'butt'));

  // Aiguille de sellier, bout rond : chas en (ex, ey), pointe en (tx, ty).
  const aiguille = (ex, ey, tx, ty) => {
    const L = Math.hypot(tx - ex, ty - ey), ux = (tx - ex) / L, uy = (ty - ey) / L;
    const nx = -uy, ny = ux, hw = 3;
    const P = (s, k) => [ex + ux * s + nx * k, ey + uy * s + ny * k];
    const f = ([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`;
    const d = `M ${f(P(0, hw))} L ${f(P(L - 20, hw))} L ${f(P(L - 2, 1.2))} Q ${f(P(L + 1, 0))} ${f(P(L - 2, -1.2))} ` +
      `L ${f(P(L - 20, -hw))} L ${f(P(0, -hw))} Q ${f(P(-4, 0))} ${f(P(0, hw))} Z`;
    const chas = `M ${f(P(5, 0.9))} L ${f(P(14, 0.9))} L ${f(P(14, -0.9))} L ${f(P(5, -0.9))} Z`;
    return [h.path(d, h.a.blanc), h.path(d, h.a.arete), h.path(chas, `fill="none" stroke="${N}" stroke-width="0.7"`)].join('\n');
  };

  // Une épaisseur de cuir en coupe, avec bords rompus en zigzag si demandé.
  const pli = (x1, x2, y1, y2, zigG, zigD) => {
    const t = y2 - y1, p = [];
    if (zigG) p.push([x1, y2], [x1 - 4, y2 - t * 0.35], [x1 + 4, y1 + t * 0.35], [x1, y1]);
    else p.push([x1, y2], [x1, y1]);
    if (zigD) p.push([x2, y1], [x2 + 4, y1 + t * 0.35], [x2 - 4, y2 - t * 0.35], [x2, y2]);
    else p.push([x2, y1], [x2, y2]);
    return h.chemin(p, h.a.hachure('metal', 'arete'), true);
  };

  // Deux épaisseurs de cuir percées aux trous xs, largeur de trou w.
  const cuir = (xL, xT, xR, xs, w, y0, t, zigG) => {
    const out = [];
    const bornes = (debut) => {
      const seg = [];
      let a = debut;
      xs.forEach((x, i) => { const wi = typeof w === 'function' ? w(i) : w; seg.push([a, x - wi / 2]); a = x + wi / 2; });
      seg.push([a, xR]);
      return seg;
    };
    bornes(xT).forEach(([a, b], i, s) => out.push(pli(a, b, y0, y0 + t, false, i === s.length - 1)));
    bornes(xL).forEach(([a, b], i, s) => out.push(pli(a, b, y0 + t, y0 + 2 * t, zigG && i === 0, i === s.length - 1)));
    return out.join('\n');
  };

  return {
    ref: '104-02',
    titre: 'Le point sellier et la couture rabattue',
    desc: 'Coupe le long d’une couture au point sellier : un seul fil, une aiguille à chaque bout, ' +
      'les deux aiguilles passent dans le même trou en sens inverse et leurs brins se croisent dans ' +
      'chaque trou. À côté, le serrage des deux brins ensemble. En bas, la couture rabattue en coupe : ' +
      'les deux bords repliés en crochet et emboîtés, puis aplatis et piqués, aucun bord coupé à l’air.',
    format: 'pleine',
    disposition: [['sellier', 'serrage'], ['pli', 'finie']],
    hauteurs: [5, 3],
    largeurs: [[3, 1], [1, 1]],
    vues: {
      sellier: {
        titre: 'Le point sellier, coupé le long de la couture',
        dessin: (z) => {
          const y0 = Math.round(z.h * 0.44), t = 26, yb = y0 + 2 * t, w = 16, p = 50, x0 = 54, d = 5;
          const xs = [0, 1, 2, 3, 4, 5, 6].map((i) => x0 + i * p);
          const [, x1, x2, x3, x4] = xs;
          const hy = y0 - 2, by = yb + 2, e = by - hy;
          const out = [cuir(10, x0 - 28, z.l - 14, xs, (i) => (i === 0 ? 6 : w), y0, t, true)];
          // Aiguille X (première, passée par le dessus) : pend sous le cuir.
          const eX = [x4 + 24, yb + 66], tX = [x4 + 152, yb + 90];
          // Aiguille Y (seconde) : traverse le trou 4 de bas en haut.
          const eY = [x4 - 8, yb + 80], tY = [x4 + 8, y0 - 110];
          // Centre du chas, et queue courte qui ressort de l'autre côté de l'aiguille.
          const chasC = (e, t) => { const L = Math.hypot(t[0] - e[0], t[1] - e[1]); return [e[0] + (t[0] - e[0]) / L * 9.5, e[1] + (t[1] - e[1]) / L * 9.5]; };
          const queue = (a, e, t) => {
            const c = chasC(e, t), L = Math.hypot(t[0] - e[0], t[1] - e[1]);
            const ux = (t[0] - e[0]) / L, uy = (t[1] - e[1]) / L;
            let nx = -uy, ny = ux;
            if ((a[0] - c[0]) * nx + (a[1] - c[1]) * ny > 0) { nx = -nx; ny = -ny; }
            return [[c[0] + nx * 2.5, c[1] + ny * 2.5], [c[0] + nx * 16 - ux * 5, c[1] + ny * 16 - uy * 5]];
          };
          // Brin creux Q : descend dans le trou 0, puis alterne ; arrive dessus au trou 4.
          const Q = [[x0, y0 + t], [x0, by], [x1 - d, by], [x1 + d, hy], [x2 - d, hy], [x2 + d, by],
            [x3 - d, by], [x3 + d, hy], [x4 - d, hy], [x4 + d, by], chasC(eX, tX)];
          const qQ = queue(Q[Q.length - 2], eX, tX);
          // Brin plein P : monte dans le trou 0, puis alterne ; arrive dessous au trou 4.
          const P = [[x0, y0 + t], [x0, hy], [x1 - d, hy], [x1 + d, by], [x2 - d, by], [x2 + d, hy],
            [x3 - d, hy], [x3 + d, by], chasC(eY, tY)];
          const qP = queue(P[P.length - 2], eY, tY);
          out.push(creux(Q));
          [x1, x2, x3].forEach((x) => out.push(halo(x - d + 2 * d * 0.28, hy + e * 0.28, x - d + 2 * d * 0.72, hy + e * 0.72)));
          out.push(plein(P));
          out.push(aiguille(...eX, ...tX));
          out.push(aiguille(...eY, ...tY));
          out.push(creux(qQ), plein(qP));
          // charte : le point à vérifier, les deux brins croisés dans le trou
          out.push(h.controle(x2, y0 + t, 15));
          return out.join('\n');
        },
        renvois: (z) => {
          const y0 = Math.round(z.h * 0.44), yb = y0 + 52, x0 = 54, p = 50;
          const x = (i) => x0 + i * p;
          return [
            { n: 1, rond: [28, y0 - 58], cible: [x0, y0 + 26], texte: 'milieu du fil, premier trou' },
            { n: 2, rond: [x(5) + 30, y0 - 64], cible: [x(5), y0 + 24], texte: 'percer deux ou trois trous d’avance' },
            { n: 3, rond: [x(4) + 140, yb + 36], cible: [x(4) + 112, yb + 77], texte: 'première aiguille, passée par-dessus' },
            { n: 4, rond: [x(4) + 42, y0 - 88], cible: [x(4) + 10, y0 - 66], texte: 'seconde aiguille, même trou, par-dessous' },
            { n: 5, rond: [x(2), yb + 56], cible: [x(2), y0 + 26], texte: 'brins croisés dans chaque trou' },
          ];
        },
      },
      serrage: {
        titre: 'Serrer',
        dessin: (z) => {
          const y0 = Math.round(z.h * 0.44), t = 26, yb = y0 + 2 * t, xh = 58, hy = y0 - 2, by = yb + 2, d = 5;
          const out = [
            pli(12, xh - 8, y0, y0 + t, true, false), pli(xh + 8, z.l - 12, y0, y0 + t, false, true),
            pli(12, xh - 8, y0 + t, yb, true, false), pli(xh + 8, z.l - 12, y0 + t, yb, false, true),
          ];
          const fin = 140;
          out.push(creux([[12, hy], [xh - d, hy], [xh + d, by], [z.l - 14, by + fin]]));
          out.push(halo(xh - d + 2 * d * 0.28, by - (by - hy) * 0.28, xh - d + 2 * d * 0.72, by - (by - hy) * 0.72));
          out.push(plein([[12, by], [xh - d, by], [xh + d, hy], [z.l - 14, hy - fin]]));
          // Flèches de traction, parallèles aux brins, côté extérieur.
          const fl = (ax, ay, bx, by2, s) => {
            const L = Math.hypot(bx - ax, by2 - ay), ux = (bx - ax) / L, uy = (by2 - ay) / L;
            const nx = s * -uy, ny = s * ux, o = 15;
            const a = [ax + ux * L * 0.45 + nx * o, ay + uy * L * 0.45 + ny * o];
            const b = [ax + ux * L * 0.82 + nx * o, ay + uy * L * 0.82 + ny * o];
            return h.geste(`M ${a[0].toFixed(1)} ${a[1].toFixed(1)} L ${b[0].toFixed(1)} ${b[1].toFixed(1)}`);   // charte : le geste, les deux brins ensemble
          };
          out.push(fl(xh + d, hy, z.l - 14, hy - fin, -1));
          out.push(fl(xh + d, by, z.l - 14, by + fin, 1));
          return out.join('\n');
        },
        renvois: (z) => {
          const y0 = Math.round(z.h * 0.44), xh = 58, hy = y0 - 2;
          const ax = xh + 5, bx = z.l - 14, tt = 0.3;
          return [
            { n: 6, rond: [30, y0 - 100], cible: [ax + (bx - ax) * tt - 2, hy - 140 * tt - 2], texte: 'tirer les deux brins, même tension' },
          ];
        },
      },
      pli: {
        titre: 'La couture rabattue, en coupe',
        dessin: (z) => {
          const cx = Math.round(z.l / 2), cy = Math.round(z.h / 2);
          const A = `M 14 ${cy - 27} L ${cx + 52} ${cy - 27} A 18 18 0 0 1 ${cx + 52} ${cy + 9} L ${cx - 48} ${cy + 9}`;
          const Bd = `M ${z.l - 14} ${cy + 27} L ${cx - 70} ${cy + 27} A 18 18 0 0 1 ${cx - 70} ${cy - 9} L ${cx + 30} ${cy - 9}`;
          return [
            h.path(Bd, fil(5.5, N, 'butt')), h.path(Bd, fil(2.3, B, 'butt')),
            h.path(A, fil(4.5, N, 'butt')),
            // charte : le geste, aplatir les deux crochets l'un contre l'autre
            h.geste(`M ${cx - 10} ${cy - 84} L ${cx - 10} ${cy - 44}`),
            h.geste(`M ${cx - 10} ${cy + 84} L ${cx - 10} ${cy + 44}`),
          ].join('\n');
        },
        renvois: (z) => {
          const cx = Math.round(z.l / 2), cy = Math.round(z.h / 2);
          return [{ n: 7, rond: [cx + 100, cy - 60], cible: [cx + 73, cy - 12], texte: 'replier chaque bord, emboîter les crochets' }];
        },
      },
      finie: {
        titre: 'Aplatie et piquée',
        dessin: (z) => {
          const cx = Math.round(z.l / 2), cy = Math.round(z.h / 2), s = 10;
          const [L1, L2, L3, L4] = [cy - 1.5 * s, cy - 0.5 * s, cy + 0.5 * s, cy + 1.5 * s];
          const A = `M 14 ${L1} L ${cx + 52} ${L1} A ${s} ${s} 0 0 1 ${cx + 52} ${L3} L ${cx - 40} ${L3}`;
          const Bd = `M ${z.l - 14} ${L4} L ${cx - 52} ${L4} A ${s} ${s} 0 0 1 ${cx - 52} ${L2} L ${cx + 40} ${L2}`;
          const piqure = (x) => h.ligne(x, L1 - 9, x, L4 + 9, fil(2.2));
          return [
            h.path(Bd, fil(5.5, N, 'butt')), h.path(Bd, fil(2.3, B, 'butt')),
            h.path(A, fil(4.5, N, 'butt')),
            piqure(cx - 26), piqure(cx + 26),
          ].join('\n');
        },
        renvois: (z) => {
          const cx = Math.round(z.l / 2), cy = Math.round(z.h / 2);
          return [
            { n: 8, rond: [cx + 66, cy - 58], cible: [cx + 27, cy - 26], texte: 'aplatir, piquer à travers tout' },
            { n: 9, rond: [cx - 30, cy + 56], cible: [cx - 41, cy + 5], texte: 'bord coupé enfermé dans le pli' },
          ];
        },
      },
    },
  };
};
