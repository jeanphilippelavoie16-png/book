// 90-06 — La pièce d'aluminium rivetée (ch. 90, §5-C, « Aluminium », et note [^1]).
// Cotes, toutes du chapitre : trou d'arrêt de 2,4 ou 3,2 mm au vrai bout de la fissure ;
// pièce d'au moins deux fois la longueur de la fissure ; au moins 2 diamètres de rivet du
// centre d'un trou au bord de la pièce, et autant d'un trou à la fissure ; au moins 3
// diamètres d'un trou au suivant ; au moins quatre rivets par côté, en un rang ; rivet de
// 3,2 mm sur tôle de 1 mm ou moins, 4 mm au-delà. Lampe à moins de 45° de la tôle.
// Le rivet dessiné est celui qu'on trouve partout : un bout de fil d'aluminium coupé à
// longueur et matté à froid des deux côtés, la tête de la hache en contre-masse.
// Le canot est retourné (étape 11) : la pièce est dessus, côté extérieur de la coque.
// Géométrie du plan, en diamètres de rivet d : fissure de 12 d (L), pièce de 24 d (2 L) sur
// 8,4 d, rangs à 2,1 d de la fissure et du bord, six rivets par côté au pas de 3 d.

module.exports = (h) => {
  const f = (v) => Math.round(v * 10) / 10;
  function lisse(p) {
    const n = p.length, g = (i) => p[(i + n) % n];
    let d = `M ${f(p[0][0])} ${f(p[0][1])}`;
    for (let i = 0; i < n; i++) {
      const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C ${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
    }
    return d + ' Z';
  }
  // Contour de tôle arrachée : rectangle aux bords légèrement ondulés.
  function brise(x0, y0, x1, y1, pas, amp, graine) {
    const pts = [], coins = [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
    let k = 0;
    for (let e = 0; e < 4; e++) {
      const a = coins[e], b = coins[(e + 1) % 4], L = Math.hypot(b[0] - a[0], b[1] - a[1]);
      const n = Math.max(2, Math.round(L / pas)), nx = (b[1] - a[1]) / L, ny = -(b[0] - a[0]) / L;
      for (let i = 0; i < n; i++) {
        const t = i / n, o = i === 0 ? 0 : amp * Math.sin(k * 2.3 + graine) * Math.sin(k * 0.9 + 1);
        pts.push([a[0] + (b[0] - a[0]) * t + nx * o, a[1] + (b[1] - a[1]) * t + ny * o]);
        k++;
      }
    }
    return lisse(pts);
  }
  // Plaque coupée : bande de tôle, bout en S (cassure) du côté demandé.
  function plaque(xa, xb, ya, yb, brisG, brisD) {
    const e = yb - ya;
    let d = `M ${f(xa)} ${f(ya)} L ${f(xb)} ${f(ya)}`;
    d += brisD ? ` C ${f(xb + e * 0.9)} ${f(ya + e * 0.3)} ${f(xb - e * 0.9)} ${f(yb - e * 0.3)} ${f(xb)} ${f(yb)}` : ` L ${f(xb)} ${f(yb)}`;
    d += ` L ${f(xa)} ${f(yb)}`;
    d += brisG ? ` C ${f(xa - e * 0.9)} ${f(yb - e * 0.3)} ${f(xa + e * 0.9)} ${f(ya + e * 0.3)} ${f(xa)} ${f(ya)}` : '';
    return d + ' Z';
  }
  const TOILE = 'fill="none" stroke="#ffffff" stroke-width="1"';
  const TROU_CACHE = 'fill="none" stroke="#1A1A1A" stroke-width="0.7" stroke-dasharray="2 1.4"';

  // Empilement en coupe, en d : pièce [-0,6 ; -0,3], gomme [-0,3 ; 0], coque [0 ; 0,3].
  // trous : abscisses des rivets ; x0, x1 : bouts de la coque ; p0, p1 : bords de la pièce.
  function empilement(P, s, { x0, x1, p0, p1, trous, fissure }) {
    const o = [], R = 0.5;
    const segs = (a, b, coupes) => {
      const bornes = [a];
      coupes.filter(c => c > a && c < b).sort((u, v) => u - v).forEach(c => bornes.push(c - R, c + R));
      bornes.push(b);
      const out = [];
      for (let i = 0; i < bornes.length; i += 2) out.push([bornes[i], bornes[i + 1]]);
      return out;
    };
    // coque, coupée par la fissure et par les trous
    let coque = segs(x0, x1, trous);
    if (fissure !== undefined) {
      coque = coque.flatMap(([a, b]) => (fissure > a && fissure < b) ? [[a, fissure - 0.05], [fissure + 0.05, b]] : [[a, b]]);
    }
    coque.forEach(([a, b]) => {
      const [xa, ya] = P(a, 0), [xb, yb] = P(b, 0.3);
      o.push(h.path(plaque(xa, xb, ya, yb, a === x0, b === x1), h.a.hachure('metal', 'arete')));
    });
    // gomme, toile noyée au milieu
    segs(p0, p1, trous).forEach(([a, b]) => {
      const [xa, ya] = P(a, -0.3), [xb, yb] = P(b, 0);
      o.push(h.rect(xa, ya, xb - xa, yb - ya, h.a.plein));
      o.push(h.ligne(xa + 1, (ya + yb) / 2, xb - 1, (ya + yb) / 2, TOILE));
    });
    // pièce
    segs(p0, p1, trous).forEach(([a, b]) => {
      const [xa, ya] = P(a, -0.6), [xb, yb] = P(b, -0.3);
      o.push(h.path(plaque(xa, xb, ya, yb, false, false), h.a.hachure('metal', 'arete')));
    });
    return o;
  }
  // Rivet de fil : fût de diamètre d ; haut et bas 'tete' (matté) ou longueur qui dépasse.
  function rivet(P, s, xr, haut, bas) {
    const L = (x, y) => P(xr + x, y).map(f).join(' ');
    let d = `M ${L(-0.5, -0.6)}`;
    if (haut === 'tete') d += ` L ${L(-0.85, -0.6)} C ${L(-0.95, -0.75)} ${L(-0.9, -1.05)} ${L(-0.55, -1.05)} L ${L(0.55, -1.05)} C ${L(0.9, -1.05)} ${L(0.95, -0.75)} ${L(0.85, -0.6)} L ${L(0.5, -0.6)}`;
    else d += ` L ${L(-0.5, -0.6 - haut)} L ${L(0.5, -0.6 - haut)} L ${L(0.5, -0.6)}`;
    d += ` L ${L(0.5, 0.3)}`;
    if (bas === 'tete') d += ` L ${L(0.85, 0.3)} C ${L(0.95, 0.45)} ${L(0.9, 0.75)} ${L(0.55, 0.75)} L ${L(-0.55, 0.75)} C ${L(-0.9, 0.75)} ${L(-0.95, 0.45)} ${L(-0.85, 0.3)} L ${L(-0.5, 0.3)}`;
    else d += ` L ${L(0.5, 0.3 + bas)} L ${L(-0.5, 0.3 + bas)} L ${L(-0.5, 0.3)}`;
    d += ' Z';
    return [h.path(d, h.a.blanc), h.path(d, h.a.arete)];
  }

  // ─── Vue 1 : vu de dessus ──────────────────────────────────────────────────────────
  const RY = 2.1, EY = 4.2, XS = [-7.5, -4.5, -1.5, 1.5, 4.5, 7.5];
  const yf = (x) => 0.1 * Math.sin(2.3 * x) + 0.06 * Math.sin(5.1 * x + 0.7);
  function geomPlan(z) {
    const s = Math.min((z.l - 150) / 31, (z.h - 34) / 13.3);
    const cx = z.l / 2, cy = 4 + 6.5 * s;
    return { s, P: (x, y) => [cx + x * s, cy + y * s] };
  }
  function dessus(z) {
    const { s, P } = geomPlan(z), o = [];
    // coque autour, bord arraché
    const [ax, ay] = P(-15.5, -6.5), [bx, by] = P(15.5, 6.8);
    o.push(h.path(brise(ax, ay, bx, by, 0.9 * s, 0.14 * s, 0.4), h.a.fin));
    // fissure et trous d'arrêt, cachés sous la pièce
    const fis = [];
    for (let x = -6; x <= 6.001; x += 0.4) fis.push(P(x, yf(x)));
    const [p0x, p0y] = P(-12, -EY), [p1x, p1y] = P(12, EY);
    o.push(h.rect(p0x, p0y, p1x - p0x, p1y - p0y, h.a.blanc));
    o.push(h.chemin(fis, h.a.cache));
    [-6, 6].forEach(x => o.push(h.cercle(...P(x, yf(x)), 0.375 * s, TROU_CACHE)));
    o.push(h.rect(p0x, p0y, p1x - p0x, p1y - p0y, h.a.contour));
    // rivets, têtes mattées
    XS.forEach(x => [-RY, RY].forEach(y => {
      o.push(h.cercle(...P(x, y), 0.8 * s, h.a.blanc), h.cercle(...P(x, y), 0.8 * s, h.a.arete));
    }));
    // cote du pas, au-dessus
    const yc1 = P(0, -5.2)[1];
    [1.5, 4.5].forEach(x => o.push(h.ligne(P(x, 0)[0], P(0, -RY - 0.9)[1], P(x, 0)[0], yc1 - 5, h.a.fin)));
    o.push(h.cote(P(1.5, 0)[0], yc1, P(4.5, 0)[0], yc1, '≥ 3 d'));
    // longueur de la fissure et de la pièce, dessous
    const yc2 = P(0, 5.0)[1], yc3 = P(0, 6.8)[1] + 10;
    [-6, 6].forEach(x => o.push(h.ligne(P(x, 0)[0], P(0, yf(x) + 0.5)[1], P(x, 0)[0], yc2 + 5, h.a.fin)));
    o.push(h.cote(P(-6, 0)[0], yc2, P(6, 0)[0], yc2, 'L', { cote: 'dessous' }));
    [-12, 12].forEach(x => o.push(h.ligne(P(x, 0)[0], p1y + 3, P(x, 0)[0], yc3 + 5, h.a.fin)));
    o.push(h.cote(P(-12, 0)[0], yc3, P(12, 0)[0], yc3, '≥ 2 L', { cote: 'dessous' }));
    return o.join('\n');
  }

  // ─── Vue 2 : en coupe, par une paire de rivets ─────────────────────────────────────
  function geomCoupe(z) {
    const s = Math.min((z.l - 24) / 13.6, (z.h - 70) / 1.8);
    const cx = z.l / 2, cy = 38 + 1.05 * s;
    return { s, P: (x, y) => [cx + x * s, cy + y * s] };
  }
  function bourrelet(P, sx) {
    const L = (x, y) => P(sx * x, y).map(f).join(' ');
    return `M ${L(3.45, -0.6)} Q ${L(3.85, -0.76)} ${L(4.2, -0.66)} Q ${L(4.65, -0.42)} ${L(5.05, 0)} L ${L(4, 0)} L ${L(4, -0.6)} Z`;
  }
  function coupe(z) {
    const { s, P } = geomCoupe(z), o = [];
    o.push(...empilement(P, s, { x0: -6.8, x1: 6.8, p0: -4, p1: 4, trous: [-2, 2], fissure: 0 }));
    [-1, 1].forEach(sx => o.push(h.path(bourrelet(P, sx), h.a.plein)));
    [-2, 2].forEach(x => o.push(...rivet(P, s, x, 'tete', 'tete')));
    // cotes : bord de la pièce → rivet → fissure
    const yc = P(0, -1.05)[1] - 16;
    o.push(h.ligne(P(-4, 0)[0], P(0, -0.82)[1], P(-4, 0)[0], yc - 5, h.a.fin));
    o.push(h.ligne(P(-2, 0)[0], P(0, -1.05)[1] - 2, P(-2, 0)[0], yc - 5, h.a.fin));
    o.push(h.ligne(P(0, 0)[0], P(0, -0.62)[1], P(0, 0)[0], yc - 5, h.a.fin));
    o.push(h.cote(P(-4, 0)[0], yc, P(-2, 0)[0], yc, '≥ 2 d'));
    o.push(h.cote(P(-2, 0)[0], yc, P(0, 0)[0], yc, '≥ 2 d'));
    return o.join('\n');
  }

  // ─── Vue 3 : le vrai bout de la fissure ───────────────────────────────────────────
  function geomBout(z) {
    const yc = z.h * 0.34, xv = z.l * 0.5, xt = z.l * 0.72;
    const yj = (x) => yc + 3 * Math.sin(x * 0.21) + 1.6 * Math.sin(x * 0.63 + 1);
    const xl = (xv + xt) / 2 + 2, yh = yc + z.h * 0.27;
    return { yc, xv, xt, yj, xl, yh };
  }
  function bout(z) {
    const { yc, xv, xt, yj, xl, yh } = geomBout(z), o = [];
    o.push(h.path(brise(8, 6, z.l - 8, z.h - 6, 16, 2.2, 1.3), h.a.fin));
    // partie visible : un filet qui s'amincit
    const hautF = [], basF = [];
    for (let x = 12; x <= xv + 0.01; x += 4) {
      const w = 3.2 - 2.6 * (x - 12) / (xv - 12);
      hautF.push([x, yj(x) - w / 2]); basF.push([x, yj(x) + w / 2]);
    }
    o.push(h.chemin(hautF.concat(basF.reverse()), h.a.plein, true));
    // au-delà, plus fin qu'un cheveu, jusqu'au vrai bout
    const fin = [];
    for (let x = xv; x <= xt + 0.01; x += 4) fin.push([x, yj(x)]);
    o.push(h.chemin(fin, h.a.fin));
    // faisceau de la lampe, en travers
    const yb = yh - 2;
    o.push(h.ligne(xl - 7, yb, xl - 30, yc - 30, h.a.cache), h.ligne(xl + 7, yb, xl + 30, yc - 30, h.a.cache));
    // trou d'arrêt percé au vrai bout
    o.push(h.cercle(xt, yj(xt), 5, h.a.plein));
    // lampe, couchée bas sur la tôle
    const Lm = z.h - 8 - yh;
    const lampe = `M ${f(xl - 10)} ${f(yh)} L ${f(xl + 10)} ${f(yh)} L ${f(xl + 10)} ${f(yh + 4)} L ${f(xl + 6)} ${f(yh + 11)} L ${f(xl + 6)} ${f(yh + Lm - 4)} Q ${f(xl + 6)} ${f(yh + Lm)} ${f(xl + 2)} ${f(yh + Lm)} L ${f(xl - 2)} ${f(yh + Lm)} Q ${f(xl - 6)} ${f(yh + Lm)} ${f(xl - 6)} ${f(yh + Lm - 4)} L ${f(xl - 6)} ${f(yh + 11)} L ${f(xl - 10)} ${f(yh + 4)} Z`;
    o.push(h.path(lampe, h.a.blanc), h.path(lampe, h.a.arete));
    o.push(h.ligne(xl - 6, yh + 11, xl + 6, yh + 11, h.a.detail));
    o.push(h.rect(xl - 3, yh + 17, 6, 7, h.a.detail));
    return o.join('\n');
  }

  // ─── Vue 4 : le rivet de fil, matté des deux côtés ────────────────────────────────
  function geomFil(z) {
    const s = Math.min((z.h - 14) / 8.9, z.l / 3 / 7.2);
    const cy = 6 + 4.15 * s;
    return { s, P: (i) => (x, y) => [z.l * (2 * i + 1) / 6 + x * s, cy + y * s] };
  }
  function hache(P, sens) {           // sens = 1 : talon en haut, tranchant en bas
    const L = (x, y) => P(x, y).map(f).join(' ');
    const y0 = sens > 0 ? 1.6 : -1.05, Y = (v) => y0 + sens * v;
    const tete = `M ${L(-0.8, Y(0))} L ${L(0.8, Y(0))} L ${L(0.8, Y(0.9))} C ${L(0.85, Y(1.6))} ${L(1.3, Y(2.3))} ${L(1.45, Y(2.75))} Q ${L(0, Y(3.15))} ${L(-1.45, Y(2.75))} C ${L(-1.3, Y(2.3))} ${L(-0.85, Y(1.6))} ${L(-0.8, Y(0.9))} Z`;
    const ya = Y(0.2), yb = Y(0.75);
    const manche = `M ${L(0.8, Math.min(ya, yb))} L ${L(4.6, Math.min(ya, yb) + 0.04)} Q ${L(4.85, (ya + yb) / 2)} ${L(4.6, Math.max(ya, yb) - 0.04)} L ${L(0.8, Math.max(ya, yb))}`;
    return [h.path(manche, h.a.blanc), h.path(manche, h.a.arete), h.path(tete, h.a.blanc), h.path(tete, h.a.arete),
      h.chemin([P(-0.6, Y(2.35)), P(0.6, Y(2.35))], h.a.fin)];
  }
  function marteau(P, sens) {         // sens = 1 : frappe vers le bas, de dessus
    const L = (x, y) => P(x, y).map(f).join(' ');
    const y0 = sens > 0 ? -1.35 : 1.05, Y = (v) => y0 - sens * v;
    const tete = `M ${L(-0.62, Y(0))} L ${L(0.62, Y(0))} L ${L(0.62, Y(0.2))} L ${L(0.5, Y(0.35))} L ${L(0.5, Y(1.65))} L ${L(0.62, Y(1.8))} L ${L(0.62, Y(2.0))} L ${L(-0.62, Y(2.0))} L ${L(-0.62, Y(1.8))} L ${L(-0.5, Y(1.65))} L ${L(-0.5, Y(0.35))} L ${L(-0.62, Y(0.2))} Z`;
    const ya = Y(0.78), yb = Y(1.22);
    const manche = `M ${L(0.5, Math.min(ya, yb))} L ${L(4.4, Math.min(ya, yb) + 0.03)} Q ${L(4.62, (ya + yb) / 2)} ${L(4.4, Math.max(ya, yb) - 0.03)} L ${L(0.5, Math.max(ya, yb))}`;
    const fl = [P(-1.25, Y(1.9)), P(-1.25, Y(0.15))];
    return [h.path(manche, h.a.blanc), h.path(manche, h.a.arete), h.path(tete, h.a.blanc), h.path(tete, h.a.arete),
      h.fleche(`M ${fl[0].map(f).join(' ')} L ${fl[1].map(f).join(' ')}`)];
  }
  function fil(z) {
    const { s, P } = geomFil(z), o = [];
    const pile = { x0: -2.6, x1: 2.6, p0: -2.6, p1: 2.6, trous: [0] };
    // 1 : le bout de fil coupé à longueur, dans le trou
    const P1 = P(0);
    o.push(...empilement(P1, s, { ...pile }).map(t => t));
    o.push(...rivet(P1, s, 0, 1.3, 1.3));
    const yd = P1(0, -1.9)[1] - 12;
    [-0.5, 0.5].forEach(x => o.push(h.ligne(P1(x, 0)[0], P1(0, -1.9)[1] - 3, P1(x, 0)[0], yd - 5, h.a.fin)));
    o.push(h.cote(P1(-0.5, 0)[0], yd, P1(0.5, 0)[0], yd, 'd'));
    // 2 : la hache dessous, le marteau dessus
    const P2 = P(1);
    o.push(...empilement(P2, s, { ...pile }));
    o.push(...rivet(P2, s, 0, 'tete', 1.3));
    o.push(...hache(P2, 1), ...marteau(P2, 1));
    // 3 : on inverse, la seconde tête
    const P3 = P(2);
    o.push(...empilement(P3, s, { ...pile }));
    o.push(...rivet(P3, s, 0, 'tete', 'tete'));
    o.push(...hache(P3, -1), ...marteau(P3, -1));
    return o.join('\n');
  }

  return {
    ref: '90-06',
    titre: 'La pièce d’aluminium rivetée',
    desc: 'Une fissure de coque d’aluminium refermée, le canot retourné. Vu de dessus : la fissure, cachée sous la pièce, finit à chaque bout sur un trou d’arrêt ; la pièce fait au moins deux fois la longueur de la fissure, avec un rang de rivets de chaque côté, à au moins 3 diamètres l’un de l’autre. En coupe, par deux rivets : la pièce, de l’épaisseur de la coque, est posée sur une couche de gomme où une toile mince est noyée, et la seconde couche de gomme fait le pourtour ; chaque rivet est à au moins 2 diamètres du bord et de la fissure. Le vrai bout de la fissure se trouve à la lampe tenue basse, le faisceau en travers, au-delà de la dernière trace visible, et c’est là qu’on perce. Sans rivet, un bout de fil d’aluminium coupé à longueur se matte à froid : la tête de la hache dessous, le marteau dessus, puis on inverse.',
    format: 'pleine',
    disposition: [['dessus'], ['coupe', 'bout'], ['fil']],
    hauteurs: [1.3, 0.9, 1.15],
    largeurs: [[1], [3, 2], [1]],
    vues: {
      dessus: {
        titre: 'Vu de dessus, le canot retourné',
        dessin: z => dessus(z),
        renvois: z => {
          const { s, P } = geomPlan(z);
          return [
            { n: 1, rond: P(-19, 1.6), cible: P(-3, yf(-3)), texte: 'fissure, cachée sous la pièce' },
            { n: 2, rond: P(19, 3.4), cible: P(7.5 + 0.57, RY + 0.57), texte: 'un rang par côté, quatre rivets ou plus' },
          ];
        },
      },
      coupe: {
        titre: 'En coupe, par deux rivets',
        dessin: z => coupe(z),
        renvois: z => {
          const { s, P } = geomCoupe(z);
          return [
            { n: 3, rond: P(1.2, -2.1), cible: P(0.9, -0.45), texte: 'pièce, épaisseur de la coque ou plus' },
            { n: 4, rond: P(-1, 1.7), cible: P(-0.9, -0.15), texte: 'gomme et toile mince : c’est le joint' },
            { n: 5, rond: P(5.7, -1.8), cible: P(4.45, -0.45), texte: 'seconde couche de gomme, tout le tour' },
          ];
        },
      },
      bout: {
        titre: 'Le vrai bout de la fissure',
        dessin: z => bout(z),
        renvois: z => {
          const { yc, xv, xt, yj, xl, yh } = geomBout(z);
          return [
            { n: 6, rond: [xv - 44, yc + 34], cible: [xv - 1, yj(xv) + 1], texte: 'dernière trace visible : pas là' },
            { n: 7, rond: [xt + 34, yc - 28], cible: [xt + 3.5, yj(xt) - 3.5], texte: 'trou d’arrêt, 2,4 ou 3,2 mm, au vrai bout' },
            { n: 8, rond: [xl + 40, yh + 22], cible: [xl + 6, yh + 26], texte: 'lampe à moins de 45° de la tôle, en travers' },
          ];
        },
      },
      fil: {
        titre: 'Sans rivet : un bout de fil d’aluminium, matté des deux côtés',
        dessin: z => fil(z),
        renvois: z => {
          const { s, P } = geomFil(z);
          return [
            { n: 9, rond: P(0)(-2.4, -2.6), cible: P(0)(-0.5, -1.4), texte: 'd : 3,2 mm ; 4 mm si la tôle passe 1 mm' },
            { n: 10, rond: P(1)(-2.5, 3.6), cible: P(1)(-1.05, 3.3), texte: 'contre-masse : la tête de la hache' },
            { n: 11, rond: P(2)(-3.0, 1.7), cible: P(2)(-0.9, 0.55), texte: 'seconde tête : hache et marteau inversés' },
          ];
        },
      },
    },
    danger: 'Danger — le fil est d’aluminium. Un clou ou un fil d’acier sous l’eau fait une pile avec la coque, et c’est l’aluminium qui se ronge autour.',
  };
};
