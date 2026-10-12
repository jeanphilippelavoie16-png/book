// 80-11 — La ligature qui serre en séchant. Séquence : prendre le bout de départ, arrêter
// le bout sous les deux dernières spires, puis la ligature posée sur un manche de hache fendu.
// Élévation : le manche est couché, on le voit de face ; les spires passent devant de haut en bas.

// ─── géométrie ───────────────────────────────────────────────────────────────────────
const lisse = (pts, n = 8) => {
  if (pts.length < 3) return pts;
  const out = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(i - 1, 0)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(i + 2, pts.length - 1)];
    for (let k = 0; k < n; k++) {
      const t = k / n, t2 = t * t, t3 = t2 * t;
      out.push([0, 1].map(j => 0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * t
        + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t3)));
    }
  }
  out.push(pts[pts.length - 1]);
  return out;
};
const droite = (a, b, n = 40) => [...Array(n + 1)].map((_, i) => [a[0] + (b[0] - a[0]) * i / n, a[1] + (b[1] - a[1]) * i / n]);
const tangentes = c => c.map((p, i) => {
  const a = c[Math.max(i - 1, 0)], b = c[Math.min(i + 1, c.length - 1)];
  const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1;
  return [dx / L, dy / L];
});
const D = pts => 'M' + pts.map(p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' L');

// Une lanière de babiche : bande plate à bord franc. `cache(x, y)` dit quelles parties passent
// sous autre chose : leurs bords sortent en tireté, à poser après ce qui les couvre.
// fin : 'coupe' (bout coupé en biais), 'suite' (la lanière continue hors du dessin), rien.
const laniere = (h, pts, w, o = {}) => {
  const c = o.brut ? pts : lisse(pts, 10), t = tangentes(c);
  const n = i => [-t[i][1], t[i][0]];
  const G = c.map((p, i) => [p[0] + n(i)[0] * w / 2, p[1] + n(i)[1] * w / 2]);
  const Dr = c.map((p, i) => [p[0] - n(i)[0] * w / 2, p[1] - n(i)[1] * w / 2]);
  const cache = o.cache || (() => false);
  const troncons = (B, cachee) => {
    const out = [];
    let cur = [];
    B.forEach((p, i) => {
      const ok = cache(c[i][0], c[i][1]) === cachee;
      if (ok) cur.push(p);
      else if (cur.length) { cur.push(p); out.push(cur); cur = []; }
    });
    if (cur.length > 1) out.push(cur);
    return out.filter(s => s.length > 1).map(D).join(' ');
  };
  const vus = [troncons(G, false), troncons(Dr, false)].join(' ').trim();
  const caches = [troncons(G, true), troncons(Dr, true)].join(' ').trim();
  const bouts = [];
  const cap = (i, sgn) => {
    const a = G[i], b = Dr[i], tt = t[i];
    if (o.fin === 'coupe') return D([a, [b[0] + tt[0] * sgn * w * 0.7, b[1] + tt[1] * sgn * w * 0.7]]);
    if (o.fin === 'suite') {
      const m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
      return `M${a[0].toFixed(1)},${a[1].toFixed(1)} Q${(m[0] + tt[0] * sgn * 4 + n(i)[0] * 2).toFixed(1)},${(m[1] + tt[1] * sgn * 4 + n(i)[1] * 2).toFixed(1)} ${m[0].toFixed(1)},${m[1].toFixed(1)} T${b[0].toFixed(1)},${b[1].toFixed(1)}`;
    }
    return '';
  };
  const last = c.length - 1;
  if (o.fin) bouts.push(cap(last, 1));
  let fond = D(G.concat(Dr.slice().reverse())) + ' Z';
  if (o.fin === 'coupe') {
    const b = Dr[last], tt = t[last];
    fond = D(G.concat([[b[0] + tt[0] * w * 0.7, b[1] + tt[1] * w * 0.7]], Dr.slice().reverse())) + ' Z';
    // le bord droit s'allonge jusqu'à la pointe du biais
    bouts.push(D([b, [b[0] + tt[0] * w * 0.7, b[1] + tt[1] * w * 0.7]]));
  }
  return {
    plein: [h.path(fond, h.a.blanc), vus && h.path(vus, h.a.contour), bouts.length && h.path(bouts.join(' '), h.a.contour)]
      .filter(Boolean).join('\n'),
    cache: caches ? h.path(caches, h.a.cache) : '',
    G, Dr,
  };
};

// Bord d'une spire sur la face avant : du dessus (x) au dessous (x + p/2).
const C = (x, yc, r, p) => [...Array(13)].map((_, i) => {
  const th = Math.PI * i / 12;
  return [x + (p / 2) * (th / Math.PI), yc - r * Math.cos(th)];
});
// Point d'un bord de spire à la hauteur y.
const Cy = (x, yc, r, p, y) => x + (p / 2) * Math.acos(Math.max(-1, Math.min(1, (yc - y) / r))) / Math.PI;

// n spires jointives à partir de x0 : bandes blanches, séparations en arête, dessus et dessous en contour.
const spires = (h, x0, n, p, yc, r) => {
  const out = [];
  for (let k = 0; k < n; k++) {
    const a = C(x0 + k * p, yc, r, p), b = C(x0 + (k + 1) * p, yc, r, p);
    out.push(h.path(D(a.concat(b.slice().reverse())) + ' Z', h.a.blanc));
  }
  const seps = [...Array(n + 1)].map((_, k) => D(C(x0 + k * p, yc, r, p))).join(' ');
  out.push(h.path(seps, h.a.arete));
  out.push(h.path(D([[x0, yc - r], [x0 + n * p, yc - r]]) + ' ' + D([[x0 + p / 2, yc + r], [x0 + n * p + p / 2, yc + r]]), h.a.contour));
  return out.join('\n');
};

// Tronçon de manche vu de face : fond blanc, contour, cassures aux deux bouts, fil du bois.
const tige = (h, xl, xr, yc, R) => {
  const cass = x => `M${x},${yc - R} C${x - 11},${yc - R / 3} ${x + 11},${yc + R / 3} ${x},${yc + R}`;
  const fil = [[-0.55, 0.3], [-0.12, 1.4], [0.3, 2.2], [0.68, 0.9]].map(([f, ph]) => {
    const pts = [];
    for (let x = xl + 10; x <= xr - 10; x += 6) pts.push([x, yc + f * R + 1.2 * Math.sin(x / 37 + ph)]);
    return D(pts);
  }).join(' ');
  return [
    h.rect(xl, yc - R, xr - xl, 2 * R, h.a.blanc),
    h.path(fil, h.a.fin),
    h.path(D([[xl, yc - R], [xr, yc - R]]) + ' ' + D([[xl, yc + R], [xr, yc + R]]), h.a.contour),
    h.path(cass(xl) + ' ' + cass(xr), h.a.arete),
  ].join('\n');
};

// Flèche d'enroulement : la moitié avant descend, la moitié arrière en caché.
const anneau = (h, cx, cy, rx, ry) => ({
  derriere: h.path(`M${cx},${cy - ry} A${rx} ${ry} 0 0 0 ${cx},${cy + ry}`, h.a.cache),
  devant: h.fleche(`M${cx},${cy - ry} A${rx} ${ry} 0 0 1 ${cx},${cy + ry}`),
});

// ─── la planche ──────────────────────────────────────────────────────────────────────
module.exports = (h) => {
  const R = 30, p = 15, Rw = R + 3;

  return {
    ref: '103-11',
    titre: 'La ligature qui serre en séchant',
    desc: 'Poser une ligature de babiche trempée sur un manche. Le bout de départ, couché le long du manche, '
      + 'est pris sous les premières spires ; on enroule serré, spires jointives ; on passe le bout sous les '
      + 'deux dernières spires et on tire. Posée ainsi sur un manche de hache fendu, elle se rétracte en séchant '
      + 'et serre la fente.',
    format: 'pleine',
    disposition: [['depart'], ['fin'], ['manche']],
    hauteurs: [1, 1, 1.35],
    vues: {
      depart: {
        titre: 'Prendre le bout de départ',
        dessin: z => {
          const yc = z.h / 2 + 10, s0 = z.l / 2 - 150, sN = s0 + 4 * p;
          const bout = laniere(h, droite([s0 + 0.4 * p, yc + 4], [sN + 72, yc + 4]), p, {
            brut: true, fin: 'coupe', cache: x => x < Cy(sN, yc, Rw, p, yc + 4),
          });
          const tir = laniere(h, [[sN + 0.5 * p, yc], [sN + 0.5 * p + 1, yc - R - 8], [sN + 20, yc - R - 34], [sN + 58, 12]], p, { fin: 'suite' });
          const r = anneau(h, sN + 190, yc, 12, Rw + 11);
          // largeur de la lanière, prise sur le bout de départ
          const yb = yc + 4, xq = sN + 96;
          return [
            tir.plein,
            r.derriere,
            tige(h, 70, z.l - 70, yc, R),
            bout.plein,
            spires(h, s0, 4, p, yc, Rw),
            bout.cache,
            r.devant,
            h.ligne(sN + 76, yb - p / 2, xq + 4, yb - p / 2, h.a.fin),
            h.ligne(sN + 87, yb + p / 2, xq + 4, yb + p / 2, h.a.fin),
            h.cote(xq, yb - p / 2, xq, yb + p / 2, '5 à 10 mm', { cote: 'droite' }),
          ].join('\n');
        },
        renvois: z => {
          const yc = z.h / 2 + 10, s0 = z.l / 2 - 150, sN = s0 + 4 * p;
          const a = Math.PI / 5;
          return [
            { n: 1, rond: [sN + 40, yc + R + 30], cible: [sN + 44, yc + 4 + p / 2 + 0.8], texte: 'bout de départ pris dessous' },
            { n: 2, rond: [sN + 245, yc - R - 14], cible: [sN + 190 + 12 * Math.sin(a), yc - (Rw + 11) * Math.cos(a)], texte: 'enrouler serré' },
            { n: 3, rond: [sN + 100, 26], cible: [sN + 20, yc - R - 34], texte: 'babiche trempée, souple' },
          ];
        },
      },
      fin: {
        titre: 'Arrêter le bout',
        dessin: z => {
          const yc = z.h / 2 + 4, s0 = z.l / 2 - 200, n = 12, sT = s0 + n * p, Rl = Rw + 6;
          const x0 = Cy(sT, yc, Rl, p, yc), x1 = Cy(sT + 2 * p, yc, Rl, p, yc);
          const bout = laniere(h, [
            [sT + 2 * p + 16, yc - Rw - 1], [sT + 2 * p + 12, yc - 15], [sT + 2 * p, yc - 3], [sT + p, yc + 1],
            [sT - 8, yc], [sT - 36, yc - 3], [sT - 60, yc - 16], [sT - 78, yc - R - 8], [sT - 92, yc - R - 26],
          ], p, { fin: 'coupe', cache: x => x > x0 && x < x1 });
          const tip = [sT - 96, yc - R - 32];
          return [
            tige(h, 60, z.l - 60, yc, R),
            spires(h, s0, n, p, yc, Rw),
            bout.plein,
            spires(h, sT, 2, p, yc, Rl),
            bout.cache,
            h.fleche(`M${tip[0] - 4},${tip[1] - 6} Q${tip[0] - 14},${tip[1] - 22} ${tip[0] - 34},${tip[1] - 34}`),
          ].join('\n');
        },
        renvois: z => {
          const yc = z.h / 2 + 4, s0 = z.l / 2 - 200, sT = s0 + 12 * p, Rl = Rw + 6;
          return [
            { n: 4, rond: [s0 + 3 * p, yc + R + 34], cible: [s0 + 4.5 * p, yc + Rw + 1], texte: 'spires jointives, serrées' },
            { n: 5, rond: [sT + 2 * p + 50, yc - R - 30], cible: [sT + 1.2 * p, yc - Rl - 1], texte: 'sous les deux dernières spires' },
            { n: 6, rond: [sT - 150, yc - R - 14], cible: [sT - 72, yc - R + 4], texte: 'tirer le bout' },
          ];
        },
      },
      manche: {
        titre: 'Sur un manche de hache fendu',
        dessin: z => {
          // la ligature part contre la tête : la bouche de la fente, là où elle ouvre le plus, est serrée
          const r = 17, yc = r + 44, hx0 = 125, hx1 = 177, q = 9, L0 = hx1 + 16, n = 20, Lw = r + 2;
          const xe = z.l - 85;
          // manche : bout qui dépasse de l'œil à gauche, renflement du talon à droite
          const manche = `M${hx0 - 7},${yc - r} L${xe - 30},${yc - r} Q${xe - 6},${yc - r} ${xe},${yc - r + 6} `
            + `Q${xe + 4},${yc + r + 2} ${xe - 6},${yc + r + 9} Q${xe - 24},${yc + r + 14} ${xe - 46},${yc + r + 6} `
            + `Q${xe - 64},${yc + r} ${xe - 96},${yc + r} L${hx0 - 7},${yc + r} Z`;
          const fil = [[-0.55, 0.3], [-0.2, 1.4], [0.35, 2.2], [0.7, 0.9]].map(([f, ph]) => {
            const pts = [];
            for (let x = hx1 + 4; x <= xe - 20; x += 6) pts.push([x, yc + f * r + 1 * Math.sin(x / 37 + ph)]);
            return D(pts);
          }).join(' ');
          // tête : le talon en haut, le taillant en bas
          const tete = `M${hx0},${yc - r} L${hx0},${yc - r - 24} Q${hx0},${yc - r - 30} ${hx0 + 6},${yc - r - 30} `
            + `L${hx1 - 6},${yc - r - 30} Q${hx1},${yc - r - 30} ${hx1},${yc - r - 24} L${hx1},${yc + r + 14} `
            + `C${hx1 + 3},${yc + r + 50} ${hx1 + 20},${yc + r + 80} ${hx1 + 30},${yc + r + 100} `
            + `Q${(hx0 + hx1) / 2 + 4},${yc + r + 126} ${hx0 - 26},${yc + r + 96} `
            + `C${hx0 - 16},${yc + r + 74} ${hx0 - 2},${yc + r + 46} ${hx0},${yc + r + 14} Z`;
          const biseau = `M${hx1 + 21},${yc + r + 88} Q${(hx0 + hx1) / 2 + 3},${yc + r + 110} ${hx0 - 18},${yc + r + 85}`;
          // la fente : ouverte entre la tête et la ligature, en caché dessous
          const fente = `M${hx1},${yc - 4.2} L${hx1 + 7},${yc - 2.4} L${hx1 + 12},${yc - 2.0} L${L0 + 2},${yc - 0.9} `
            + `L${L0 + 2},${yc + 0.4} L${hx1 + 11},${yc + 1.0} L${hx1 + 6},${yc + 0.9} L${hx1},${yc + 2.6} Z`;
          const suite = D([[L0 + 2, yc], [L0 + 40, yc + 1], [L0 + 80, yc - 0.5], [L0 + 125, yc + 0.8], [L0 + 138, yc + 0.2]]);
          return [
            h.path(manche, h.a.blanc),
            h.path(fil, h.a.fin),
            h.path(manche, h.a.contour),
            h.path(`M${hx0 - 7},${yc - r} L${hx0 - 7},${yc + r}`, h.a.contour),
            h.path(tete, h.a.blanc),
            h.path(tete, h.a.contour),
            h.path(biseau, h.a.detail),
            h.path(fente, h.a.plein),
            spires(h, L0, n, q, yc, Lw),
            h.path(suite, h.a.cache),
          ].join('\n');
        },
        renvois: z => {
          const r = 17, yc = r + 44, hx1 = 177, L0 = hx1 + 16, q = 9;
          return [
            { n: 7, rond: [hx1 + 24, 11], cible: [hx1 + 7, yc - 1], texte: 'manche fendu' },
            { n: 8, rond: [L0 + 16 * q + 40, yc + r + 38], cible: [L0 + 13 * q, yc + r + 3], texte: 'ligature posée mouillée' },
            { n: 9, rond: [L0 + 20 * q + 60, yc - r - 22], cible: [L0 + 19 * q, yc - r - 3], texte: 'sécher sans y toucher' },
          ];
        },
      },
    },
  };
};
