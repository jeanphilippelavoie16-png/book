// Planche 74-10 — recaler et regraduer le thermomètre à cadran (ch. 69, section 9 ;
// le recalage à l'écrou vient des ch. 26, 40, 43, 61, 63, 64, 65, 72).
// La charte : l'air de la chaudière au-dessus du bouillon en gris loin. Le rouge : la pince qui
// tourne l'écrou (une double flèche à la place des deux tiretés noirs), et la pointe de la tige,
// qui ne touche ni le fond ni la paroi, dans la glace comme dans l'eau qui bout.
module.exports = (h) => {
  const r1 = v => Math.round(v * 10) / 10;
  const blanc = t => t.replace('fill="none"', 'fill="#ffffff"');
  const rad = a => a * Math.PI / 180;
  const alea = graine => { let s = graine; return () => { s = (s * 16807) % 2147483647; return s / 2147483647; }; };
  const K = 0.36;                               // un cercle couché, vu d'un peu au-dessus
  const A0 = 135, ARC = 270;                    // le 0 de l'échelle, et l'étendue jusqu'au 100
  const aDe = t => A0 + ARC * t;                // t = 0 : le 0 ; t = 1 : le 100

  const dedans = (p, poly) => {
    let c = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const [xi, yi] = poly[i], [xj, yj] = poly[j];
      if ((yi > p[1]) !== (yj > p[1]) && p[0] < (xj - xi) * (p[1] - yi) / (yj - yi) + xi) c = !c;
    }
    return c;
  };

  // glace pilée : morceaux anguleux, gardés seulement s'ils tiennent dans le contenant
  const glace = (poly, graine, cw = 12, ch = 10) => {
    const xs = poly.map(p => p[0]), ys = poly.map(p => p[1]);
    const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
    const r = alea(graine), nc = Math.max(1, Math.round((x1 - x0) / cw)), nr = Math.max(1, Math.round((y1 - y0) / ch));
    const dx = (x1 - x0) / nc, dy = (y1 - y0) / nr, V = [], out = [];
    for (let j = 0; j <= nr; j++) {
      V[j] = [];
      for (let i = 0; i <= nc; i++) V[j][i] = [x0 + i * dx + (r() - 0.5) * dx * 0.6, y0 + j * dy + (r() - 0.5) * dy * 0.6];
    }
    for (let j = 0; j < nr; j++) for (let i = 0; i < nc; i++) {
      const q = [V[j][i], V[j][i + 1], V[j + 1][i + 1], V[j + 1][i]];
      const cx = q.reduce((s, p) => s + p[0], 0) / 4, cy = q.reduce((s, p) => s + p[1], 0) / 4;
      const k = 0.7 + r() * 0.16;
      const pts = q.map(([x, y]) => [r1(cx + (x - cx) * k), r1(cy + (y - cy) * k)]);
      if (pts.every(p => dedans(p, poly))) out.push(h.chemin(pts, blanc(h.a.detail), true));
    }
    return out.join('\n');
  };

  // des traits de graduation : un seul chemin, ce ne sont pas des hachures
  const traits = segs => h.path(segs.map(([p, q]) => `M${p.join(',')} L${q.join(',')}`).join(' '), h.a.fin);

  // ─── Le thermomètre à cadran, debout, vu d'un peu au-dessus ; (x, y) = centre de la face.
  // T fait pencher tout le thermomètre autour d'un point, sans transform SVG.
  const ID = { p: q => q.map(r1), a: 0 };
  const pencher = (C, deg) => {
    const c = Math.cos(rad(deg)), s = Math.sin(rad(deg));
    return { p: ([x, y]) => [r1(C[0] + (x - C[0]) * c - (y - C[1]) * s), r1(C[1] + (x - C[0]) * s + (y - C[1]) * c)], a: deg };
  };
  const pt = (T, x, y) => T.p([x, y]).join(',');
  const ell = (T, cx, cy, rx, ry, attrs) => h.path(`M${pt(T, cx - rx, cy)} A${r1(rx)},${r1(ry)} ${T.a} 1 0 ${pt(T, cx + rx, cy)} `
    + `A${r1(rx)},${r1(ry)} ${T.a} 1 0 ${pt(T, cx - rx, cy)} Z`, attrs);
  const geoT = (x, y, R, L) => {
    const d = R * 0.3, n = R * 0.4, s = R * 0.34, hN = R * 0.4, rn = R * 0.15, rs = Math.max(1.6, R * 0.07);
    const yN = y + d + n, yNb = yN + hN, yP = yNb + L;
    return { x, y, R, d, n, s, hN, rn, rs, yN, yNb, yP };
  };
  const tige = (g, T, coupe) => {
    const { x, rs, yNb, yP } = g;
    const pts = coupe ? [[x - rs, yNb - 2], [x - rs, yP], [x + rs, yP], [x + rs, yNb - 2]]
      : [[x - rs, yNb - 2], [x - rs, yP - rs * 4], [x, yP], [x + rs, yP - rs * 4], [x + rs, yNb - 2]];
    return h.chemin(pts.map(T.p), blanc(h.a.arete), true);
  };
  const ecrou = (g, T) => {
    const { x, s, yN, yNb } = g;
    const P = (a, yy) => T.p([x + s * Math.cos(rad(a)), yy + K * s * Math.sin(rad(a))]);
    const out = [h.chemin([0, 60, 120, 180, 240, 300].map(a => P(a, yN)), blanc(h.a.arete), true)];
    for (const [a, b] of [[0, 60], [60, 120], [120, 180]]) out.push(h.chemin([P(a, yN), P(b, yN), P(b, yNb), P(a, yNb)], blanc(h.a.arete), true));
    return out.join('\n');
  };
  const cylindre = (T, x, yHaut, yBas, r) => h.path(`M${pt(T, x - r, yHaut)} L${pt(T, x - r, yBas)} `
    + `A${r1(r)},${r1(r * K)} ${T.a} 0 0 ${pt(T, x + r, yBas)} L${pt(T, x + r, yHaut)} Z`, blanc(h.a.arete));
  const pointFace = (g, a, rr, T = ID) => T.p([g.x + rr * Math.cos(rad(a)), g.y + rr * Math.sin(rad(a)) * K]);
  const face = (g, T, o = {}) => {
    const { x, y, R } = g, Ri = R * 0.84, out = [];
    out.push(ell(T, x, y, R, R * K, blanc(h.a.arete)));
    out.push(ell(T, x, y, Ri, Ri * K, h.a.detail));
    if (o.graduation) {
      const segs = [];
      for (let i = 0; i <= 20; i++) { const a = aDe(i / 20); segs.push([pointFace(g, a, Ri * (i % 5 ? 0.84 : 0.74), T), pointFace(g, a, Ri * 0.95, T)]); }
      out.push(traits(segs));
    }
    out.push(h.ligne(...T.p([x, y]), ...pointFace(g, o.aiguille ?? A0, Ri * 0.7, T), h.a.arete));
    out.push(h.cercle(...T.p([x, y]), 1.4, h.a.plein));
    return out.join('\n');
  };
  const thermometre = (g, o = {}) => {
    const T = o.T || ID;
    return [
      tige(g, T, o.coupe), o.derriere || '', ecrou(g, T), cylindre(T, g.x, g.y + g.d, g.yN, g.rn),
      cylindre(T, g.x, g.y, g.y + g.d, g.R), face(g, T, o), o.devant || '',
    ].join('\n');
  };

  // ─── Géométries des vues, partagées entre le dessin et les renvois
  const geoGlace = z => {
    const cx = r1(z.l / 2), yb = z.h - 8, Hg = Math.min(190, z.h - 92), yt = yb - Hg;
    const Wt = 72, Wb = 56, tw = 5, tb = 10;
    const ext = [[cx - Wt, yt], [cx + Wt, yt], [cx + Wb, yb], [cx - Wb, yb]];
    const xin = (y, cote) => cx + cote * ((Wt + (Wb - Wt) * (y - yt) / Hg) - tw);
    const int = [[xin(yt, -1), yt], [xin(yt, 1), yt], [xin(yb - tb, 1), yb - tb], [xin(yb - tb, -1), yb - tb]].map(p => p.map(r1));
    const g = geoT(cx, yt - 46, 20, 0);
    g.yP = yb - tb - 28;
    return { cx, yb, yt, Hg, ext, int, g, tb };
  };

  const geoEcrou = z => {
    const R = Math.min(54, z.l * 0.16), x = r1(R + 44), y = 42;
    const g = geoT(x, y, R, 0);
    const yg = r1(g.yNb + 96), yc = z.h - 8, W = 70;
    g.yP = yc;
    const oy = 0.866 * g.s * K, px = r1(x + g.s + 20), Lh = r1(z.l - px - 34);
    const yj = r1(g.yN + g.hN / 2);
    return { g, x, y, R, yg, yc, W, oy, px, Lh, yj, xe: r1(px + Lh), yeF: r1(yj + oy + 15), yeB: r1(yj - oy - 11) };
  };

  const geoBouillon = z => {
    const plaque = z.h - 22, Wp = Math.min(196, z.l * 0.68), Hp = Math.min(175, z.h - 105), t = 4;
    const x1 = r1(z.l - 30), x0 = r1(x1 - Wp), yR = plaque - Hp, yE = r1(yR + Hp * 0.26);
    const phi = 32, coin = [x0 + t, yR];
    const Ty = r1(yE + (plaque - t - yE) * 0.5), Tx = r1(coin[0] + (Ty - coin[1]) * Math.tan(rad(phi)));
    const L = (Ty - coin[1]) / Math.cos(rad(phi)) + 26, R = 20;
    const tot = geoT(0, 0, R, L).yP;
    const g = geoT(Tx, Ty - tot, R, L);
    return { plaque, Wp, Hp, t, x0, x1, yR, yE, phi, Tx, Ty, g, T: pencher([Tx, Ty], -phi) };
  };

  const geoCadran = z => {
    const R = r1(Math.min(z.l * 0.3, z.h * 0.4)), cx = r1(z.l * 0.42), cy = r1(z.h * 0.5), Ri = r1(R * 0.84);
    const P = (a, rr) => [r1(cx + rr * Math.cos(rad(a))), r1(cy + rr * Math.sin(rad(a)))];
    const rm = (R + Ri) / 2, pointe = P(aDe(1), rm), dir = rad(-16);
    return { R, cx, cy, Ri, P, pointe, dir };
  };

  return {
    ref: '74-10',
    titre: 'Recaler et regraduer le thermomètre à cadran',
    desc: 'Un thermomètre à cadran à tige remis juste avec de la glace et de l’eau qui bout. '
      + 'Dans un verre de glace pilée noyée d’eau, la tige au milieu sans toucher le fond ni la paroi. '
      + 'Sous le cadran, l’écrou à six pans tourné à la pince, cadran tenu, jusqu’à ce que l’aiguille tombe sur le 0. '
      + 'Dans une eau à gros bouillon, la tige tenue au milieu, pas au fond, appuyée sur le bord. '
      + 'Sur la lunette, les traits du 0 et du 100 marqués au poinçon au bout de l’aiguille, '
      + 'et le trait du 4 °C au vingt-cinquième de l’arc au-dessus du 0.',
    format: 'pleine',
    disposition: [['glace', 'ecrou'], ['bouillon', 'cadran']],
    vues: {
      glace: {
        titre: 'Dans la glace pilée',
        dessin: z => {
          const q = geoGlace(z), out = [];
          out.push(h.chemin(q.ext, blanc(h.a.contour), true));
          out.push(h.chemin(q.int, h.a.hachure('eau', 'fin'), true));
          out.push(glace(q.int, 7));
          out.push(h.chemin(q.int, h.a.arete, true));
          out.push(thermometre(q.g));
          // le point à vérifier : le bout de la tige ne touche ni le fond ni la paroi
          out.push(h.controle(q.cx, q.g.yP, 11));
          return out.join('\n');
        },
        renvois: z => {
          const q = geoGlace(z), [il, ir] = [q.int[0][0], q.int[1][0]];
          return [
            { n: 1, rond: [14, r1(q.yt + q.Hg * 0.5)], cible: [r1(il + 22), r1(q.yt + q.Hg * 0.5)], texte: 'glace pilée, jusqu’au bord' },
            { n: 2, rond: [z.l - 14, r1(q.yt - 14)], cible: [r1(ir - 6), r1(q.yt + 5)], texte: 'eau pour noyer les vides' },
            { n: 3, rond: [z.l - 14, r1(q.g.yP + 4)], cible: [r1(q.cx + 2), r1(q.g.yP - 2)], texte: 'tige au milieu, sans toucher' },
          ];
        },
      },
      ecrou: {
        titre: 'Recaler à l’écrou',
        dessin: z => {
          const q = geoEcrou(z), { g, x, px, Lh, oy, yj, W } = q, out = [];
          // le haut du verre de glace, coupé
          const tw = 5;
          const int = [[x - W + tw, q.yg], [x + W - tw, q.yg], [x + W - tw, q.yc], [x - W + tw, q.yc]];
          out.push(h.rect(x - W, q.yg, tw, q.yc - q.yg, blanc(h.a.contour)));
          out.push(h.rect(x + W - tw, q.yg, tw, q.yc - q.yg, blanc(h.a.contour)));
          out.push(h.chemin(int, h.a.hachure('eau', 'fin'), true));
          out.push(glace(int, 3, 13, 10));
          // la pince : les deux branches se croisent au pivot, sinon serrer les manches ouvrirait
          // les mâchoires. y0 : la mâchoire ; y1 : où la branche ressort du pivot ; yFin : le manche.
          const branche = (y0, y1, yFin, epais) => {
            const c = [[x - g.s * 0.55, y0], [px - 10, y0], [px + 10, y1], [px + Lh, yFin]];
            const d = [2.6, 3.8, 3.8, 4.2];
            const haut = c.map(([a, b], i) => [r1(a), r1(b - d[i])]);
            const bas = c.map(([a, b], i) => [r1(a), r1(b + d[i])]).reverse();
            const t0 = 0.42, gx = px + Lh * t0, gy = y1 + (yFin - y1) * (gx - px - 10) / (Lh - 10);
            const poignee = [[gx, gy - epais], [px + Lh - 4, yFin - epais], [px + Lh + 3, yFin], [px + Lh - 4, yFin + epais], [gx, gy + epais]].map(p => p.map(r1));
            return [h.chemin([...haut, ...bas], blanc(h.a.arete), true), h.chemin(poignee, blanc(h.a.arete), true)].join('\n');
          };
          const arriere = branche(r1(yj - oy), r1(yj + oy), q.yeF, 7);
          const avant = [
            branche(r1(yj + oy), r1(yj - oy), q.yeB, 7),
            h.cercle(px, yj, 3.4, blanc(h.a.arete)),
            h.cercle(px, yj, 0.9, h.a.plein),
          ].join('\n');
          out.push(thermometre(g, { coupe: true, graduation: true, derriere: arriere, devant: avant }));
          // la pince tourne autour de la tige : arc couché (même aplatissement que le cadran),
          // devant la tige en trait plein, derrière en tireté, une pointe à chaque bout
          const rxA = r1(g.s + 62), ryA = r1(rxA * K);
          const A = a => [r1(x + rxA * Math.cos(rad(a))), r1(yj + ryA * Math.sin(rad(a)))];
          const arc = (a0, a1) => { let d = `M${A(a0).join(',')}`; const n = 12; for (let i = 1; i <= n; i++) d += ` L${A(a0 + (a1 - a0) * i / n).join(',')}`; return d; };
          // le geste : la pince tourne l'écrou, dans un sens ou dans l'autre
          { let dg = `M${A(222).join(',')}`; for (let i = 1; i <= 44; i++) dg += ` L${A(222 - 264 * i / 44).join(',')}`; out.push(h.geste(dg, { double: true })); }
          // la coupure du verre
          let d = `M${x - W - 4},${q.yc}`;
          for (let i = 1; i <= 8; i++) d += ` Q${r1(x - W - 4 + (i - 0.5) * (2 * W + 8) / 8)},${q.yc + (i % 2 ? -4 : 4)} ${r1(x - W - 4 + i * (2 * W + 8) / 8)},${q.yc}`;
          out.push(h.path(d, h.a.fin));
          return out.join('\n');
        },
        renvois: z => {
          const q = geoEcrou(z), { g, x, y, R } = q;
          const [ax, ay] = pointFace(g, A0, R * 0.84 * 0.7);
          return [
            { n: 4, rond: [r1(x + R + 26), 18], cible: [r1(x + R - 3), r1(y + g.d * 0.6)], texte: 'cadran tenu d’une main' },
            { n: 5, rond: [14, r1(g.yNb + 16)], cible: [r1(x - g.s * 0.78), r1(g.yNb - 3)], texte: 'écrou à six pans' },
            { n: 6, rond: [r1(q.xe - 30), r1(q.yeF + 34)], cible: [r1(q.xe - 40), r1(q.yeF + 2)], texte: 'écrou tourné à la pince' },
            { n: 7, rond: [14, r1(y + 2)], cible: [r1(ax - 1), r1(ay)], texte: 'l’aiguille amenée sur le 0' },
            { n: 8, rond: [r1(x + q.W + 30), r1(q.yg + 24)], cible: [r1(x + g.rs + 1), r1(q.yg + 24)], texte: 'tige laissée dans la glace' },
          ];
        },
      },
      bouillon: {
        titre: 'Au gros bouillon',
        dessin: z => {
          const q = geoBouillon(z), { x0, x1, yR, yE, t, plaque } = q, out = [];
          const r = alea(21);
          // le dessus du poêle
          out.push(h.rect(8, plaque, z.l - 16, 10, h.a.hachure('metal', 'fin')));
          out.push(h.rect(8, plaque, z.l - 16, 10, h.a.arete));
          // l'eau, sa surface bosselée
          const xa = x0 + t, xb = x1 - t, n = 9, w = (xb - xa) / n;
          let surf = `M${xa},${yE}`;
          for (let i = 0; i < n; i++) {
            const bosse = i % 3 !== 1 ? 6 + r() * 4 : 1.5;
            surf += ` Q${r1(xa + (i + 0.5) * w)},${r1(yE - bosse * 1.6)} ${r1(xa + (i + 1) * w)},${yE}`;
          }
          // l'air au-dessus de l'eau, dans la chaudière : en gris loin ; l'eau repeinte en blanc dessous
          out.push(h.rect(xa, yR, xb - xa, yE - yR, h.a.loin));
          out.push(h.path(`${surf} L${xb},${plaque - t} L${xa},${plaque - t} Z`, h.a.blanc));
          out.push(h.path(`${surf} L${xb},${plaque - t} L${xa},${plaque - t} Z`, h.a.hachure('eau', 'fin')));
          // les bouillons : des colonnes de bulles qui grossissent en montant
          for (const fx of [0.1, 0.27, 0.45, 0.6, 0.76, 0.91]) {
            let yy = plaque - t - 6, rr = 1.6;
            const bx = xa + fx * (xb - xa);
            while (yy - rr > yE + 4) {
              out.push(h.cercle(r1(bx + (r() - 0.5) * 6), r1(yy), r1(rr), blanc(h.a.detail)));
              yy -= rr * 2 + 5 + r() * 5; rr = Math.min(7, rr * 1.35);
            }
          }
          out.push(h.path(surf, h.a.arete));
          // gouttes projetées et vapeur
          for (const [fx, dy] of [[0.2, 12], [0.55, 15], [0.78, 10]]) out.push(h.cercle(r1(xa + fx * (xb - xa)), r1(yE - dy), 1.4, blanc(h.a.detail)));
          for (const fx of [0.45, 0.65, 0.85]) {
            const sx = r1(xa + fx * (xb - xa)), sy = yE - 22;
            out.push(h.path(`M${sx},${sy} C${sx - 8},${sy - 10} ${sx + 8},${sy - 18} ${sx},${sy - 28} C${sx - 7},${sy - 36} ${sx + 5},${sy - 42} ${sx},${sy - 50}`, h.a.fin));
          }
          // la chaudière, en coupe
          out.push(h.chemin([[x0, yR], [x0, plaque], [x1, plaque], [x1, yR], [x1 - t, yR], [x1 - t, plaque - t], [x0 + t, plaque - t], [x0 + t, yR]], h.a.plein, true));
          out.push(h.chemin([[x0, yR], [x0, plaque], [x1, plaque], [x1, yR]], h.a.contour));
          // le thermomètre, appuyé sur le bord
          out.push(thermometre(q.g, { T: q.T }));
          // le point à vérifier : la pointe au milieu de l'eau, pas sur le fond
          { const [tx, ty] = q.T.p([q.g.x, q.g.yP]); out.push(h.controle(tx, ty, 11)); }
          return out.join('\n');
        },
        renvois: z => {
          const q = geoBouillon(z);
          return [
            { n: 9, rond: [z.l - 14, r1(q.yE - 30)], cible: [r1(q.x1 - 20), r1(q.yE - 6)], texte: 'gros bouillon franc' },
            { n: 10, rond: [z.l - 14, r1(q.Ty + 34)], cible: [r1(q.Tx + 2), r1(q.Ty - 1)], texte: 'tenue au milieu, pas au fond' },
          ];
        },
      },
      cadran: {
        titre: 'Regraduer au poinçon',
        dessin: z => {
          const q = geoCadran(z), { R, cx, cy, Ri, P } = q, out = [];
          out.push(h.cercle(cx, cy, R, blanc(h.a.contour)));
          out.push(h.cercle(cx, cy, Ri, h.a.arete));
          // l'échelle imprimée, décalée : le cadran est déréglé
          const segs = [];
          for (let i = 0; i <= 20; i++) { const a = aDe(i / 20) - 8; segs.push([P(a, Ri * (i % 5 ? 0.85 : 0.76)), P(a, Ri * 0.95)]); }
          out.push(traits(segs));
          // les trois traits au poinçon, sur la lunette
          for (const t of [0, 1 / 25, 1]) out.push(h.ligne(...P(aDe(t), Ri + 1.5), ...P(aDe(t), R - 1.5), h.a.contour));
          // l'aiguille, sur le trait qu'on marque
          out.push(h.ligne(cx, cy, ...P(aDe(1), Ri * 0.78), h.a.arete));
          out.push(h.cercle(cx, cy, 3, h.a.plein));
          // le poinçon : un clou suffit
          const [px, py] = q.pointe, u = [Math.cos(q.dir), Math.sin(q.dir)], v = [-u[1], u[0]];
          const Q = (a, b) => [r1(px + u[0] * a + v[0] * b), r1(py + u[1] * a + v[1] * b)];
          const Lc = 92;
          out.push(h.chemin([Q(0, 0), Q(11, 2.8), Q(Lc, 2.8), Q(Lc, -2.8), Q(11, -2.8)], blanc(h.a.arete), true));
          out.push(h.chemin([Q(Lc, 7.5), Q(Lc + 4.5, 7.5), Q(Lc + 4.5, -7.5), Q(Lc, -7.5)], blanc(h.a.arete), true));
          return out.join('\n');
        },
        renvois: z => {
          const q = geoCadran(z), { R, P } = q;
          const [x0, y0] = P(aDe(0), R - 3), [x4, y4] = P(aDe(1 / 25), R - 3), [xc, yc] = P(aDe(1), R - 5);
          const [nx, ny] = [r1(q.pointe[0] + Math.cos(q.dir) * 55), r1(q.pointe[1] + Math.sin(q.dir) * 55)];
          return [
            { n: 11, rond: [r1(x0 - 22), r1(y0 + 26)], cible: [x0, y0], texte: 'trait du 0, dans la glace' },
            { n: 12, rond: [14, r1(y4 - 10)], cible: [x4, y4], texte: 'trait du 4 °C : 1/25 de l’arc' },
            { n: 13, rond: [r1(xc + 10), r1(yc + 34)], cible: [xc, yc], texte: 'trait du 100, eau qui bout' },
            { n: 14, rond: [nx, r1(ny - 28)], cible: [nx, r1(ny - 3.5)], texte: 'poinçon, ou clou pointu' },
          ];
        },
      },
    },
  };
};
