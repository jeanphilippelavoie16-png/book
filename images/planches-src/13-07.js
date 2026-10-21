// Planche 13-07 — l'amadou : l'amadouvier en coupe et la bande à garder, la tranche battue au
// maillet, le coton carbonisé en boîte puis bouché, et sans boîte le cornet d'écorce ficelé
// d'une hart, sous les braises puis dans le sable.
// Aucune cote : le chapitre ne donne aucune dimension pour ces gestes.
//
// La charte : à l'ombre, la face de droite du tronc et de la bûche, le dessous du cornet ; le
// sabot coupé et tramé reste sans gris. Le rouge : le coup de maillet et le cornet qu'on sort
// des braises pour l'enfouir (le geste, un par vue) ; le trou du couvercle, d'où sort le jet de
// fumée qu'on surveille, et la déchirure du carré noir (souple, pas en poussière), cerclés. Les
// flèches de fumée et celles des deux moitiés du carré restent noires.

module.exports = (h) => {
  const f = v => Math.round(v * 10) / 10;
  const blanc = a => a.replace('fill="none"', 'fill="#FFFFFF"');
  const NOIR = '#1A1A1A';
  const halo = w => `fill="none" stroke="#FFFFFF" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;

  // Hasard à graine fixe : le dessin est le même à chaque composition.
  const gen = s => { let g = s; return () => (g = (g * 16807) % 2147483647) / 2147483647; };

  // Courbe lisse (Catmull-Rom) passant par chaque point.
  const lisse = (pts, ferme) => {
    const n = pts.length;
    const p = i => ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
    let d = `M ${f(pts[0][0])} ${f(pts[0][1])}`;
    const segs = ferme ? n : n - 1;
    for (let i = 0; i < segs; i++) {
      const p0 = p(i - 1), p1 = p(i), p2 = p(i + 1), p3 = p(i + 2);
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C ${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
    }
    return ferme ? d + ' Z' : d;
  };
  // La même courbe, échantillonnée en polyligne dense.
  const dense = (pts, n = 10) => {
    const N = pts.length, p = i => pts[Math.max(0, Math.min(N - 1, i))], out = [];
    for (let i = 0; i < N - 1; i++) {
      const p0 = p(i - 1), p1 = p(i), p2 = p(i + 1), p3 = p(i + 2);
      for (let k = 0; k < n; k++) {
        const t = k / n, t2 = t * t, t3 = t2 * t;
        const c = (a, b, c_, d) => 0.5 * (2 * b + (-a + c_) * t + (2 * a - 5 * b + 4 * c_ - d) * t2 + (-a + 3 * b - 3 * c_ + d) * t3);
        out.push([c(p0[0], p1[0], p2[0], p3[0]), c(p0[1], p1[1], p2[1], p3[1])]);
      }
    }
    out.push(pts[N - 1]);
    return out;
  };
  // Décale une polyligne vers sa gauche (l'intérieur quand on tourne dans le sens horaire).
  const decale = (pl, ep) => pl.map((q, i) => {
    const a = pl[Math.max(0, i - 1)], b = pl[Math.min(pl.length - 1, i + 1)];
    const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1;
    const d = ep(i / (pl.length - 1));
    return [q[0] - dy / L * d, q[1] + dx / L * d];
  });
  const poly = (pts, ferme) => 'M ' + pts.map(([x, y]) => `${f(x)} ${f(y)}`).join(' L ') + (ferme ? ' Z' : '');

  // Un lit de braises : morceaux anguleux, charbon noir et braise claire mêlés.
  const lit = (x0, x1, yH, yB, graine, sauf = () => false) => {
    const r = gen(graine), out = [];
    let rang = 0;
    for (let y = yH; y < yB - 2; y += 8.5, rang++) {
      for (let x = x0 + (rang % 2) * 6; x < x1; x += 12) {
        const cx = x + (r() - 0.5) * 4, cy = y + (r() - 0.5) * 3, R = 4.6 + r() * 2.4;
        if (sauf(cx, cy)) continue;
        const pts = [];
        const n = 5 + Math.floor(r() * 2), a0 = r() * 6.28;
        for (let k = 0; k < n; k++) {
          const a = a0 + k * 6.28 / n, rr = R * (0.72 + r() * 0.3);
          pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * 0.8]);
        }
        out.push(h.chemin(pts, r() < 0.45 ? h.a.plein : blanc(h.a.detail), true));
      }
    }
    return out.join('\n');
  };

  // ── L'amadouvier, en coupe ──────────────────────────────────────────────────────────
  const sabot = z => {
    const tx0 = 22, xR = 76;
    const W = Math.min(150, z.l - xR - 58);
    const s = Math.min(1.05, (z.h - 76) / 114);
    const yA = Math.round((z.h - 114 * s) / 2 + 2 * s);
    const P = (u, v) => [xR + u * W, yA + v * s];
    const dessus = [[0, 6], [0.2, -6], [0.45, -10], [0.7, -4], [0.88, 12], [0.98, 34], [1, 58], [0.96, 80], [0.86, 93]].map(([u, v]) => P(u, v));
    const dessous = [[0.86, 93], [0.62, 97.5], [0.3, 100.5], [0, 104]].map(([u, v]) => P(u, v));
    const D = dense(dessus, 12);
    const croute = decale(D, t => 4.6 - 2 * t);
    const bande = decale(D, t => 4.6 - 2 * t + 20 * (1 - t) * s + 3.5 * t);
    const auTronc = pl => { const r = pl.filter(q => q[0] > xR + 10), [p0, p1] = r, k = (p1[1] - p0[1]) / (p1[0] - p0[0]); return [[xR, p0[1] - k * (p0[0] - xR)], ...r]; };
    return { tx0, xR, W, s, yA, P, dessus, dessous, D, croute: auTronc(croute), bande: auTronc(bande), Dd: dense(dessous, 8) };
  };

  // ── Battre la tranche ───────────────────────────────────────────────────────────────
  const battre = z => {
    const cx = Math.round(z.l * 0.46), yG = z.h - 6, ry = 15, rx = 70;
    const yT = Math.round(Math.max(z.h * 0.52, 96));
    const a = 16 * Math.PI / 180, e = [Math.cos(a), -Math.sin(a)], nn = [Math.sin(a), Math.cos(a)];
    const tete = [cx - 58, yT - 42];                    // centre du bout de la tête du maillet
    const M = (w, v) => [tete[0] + w * e[0] + v * nn[0], tete[1] + w * e[1] + v * nn[1]];
    const fx = cx - 4, fy = yT + 1;                     // centre du feutre
    return { cx, yG, ry, rx, yT, M, fx, fy };
  };

  // ── La boîte (en coupe), partagée par deux vues ─────────────────────────────────────
  const boite = (cx, yBase, bw, bh, carbonise) => {
    const xl = cx - bw / 2, xr = cx + bw / 2, yTop = yBase - bh, out = [];
    out.push(h.rect(xl, yTop, bw, bh, h.a.blanc));
    const r = gen(carbonise ? 41 : 29);
    const ep = 5.4;
    for (let i = 0; i < 7; i++) {
      const y1 = yBase - 1.6 - i * ep, y0 = y1 - ep + (carbonise ? 1.5 : 0);
      const a = xl + 2 + r() * 5, b = xr - 2 - r() * 5, m = (a + b) / 2, o = (r() - 0.5) * 2.2;
      const d = `M ${f(a + 2.5)} ${f(y0)} Q ${f(m)} ${f(y0 + o)} ${f(b - 2.5)} ${f(y0)} Q ${f(b + 0.5)} ${f((y0 + y1) / 2)} ${f(b - 2.5)} ${f(y1)} L ${f(a + 2.5)} ${f(y1)} Q ${f(a - 0.5)} ${f((y0 + y1) / 2)} ${f(a + 2.5)} ${f(y0)} Z`;
      out.push(h.path(d, carbonise ? h.a.plein : blanc(h.a.detail)));
    }
    // parois et fond de tôle, coupés
    out.push(h.chemin([[xl, yTop + 1], [xl, yBase], [xr, yBase], [xr, yTop + 1]], h.a.contour));
    // couvercle à jupe, percé d'un seul trou
    const j = 4.5, yc = yTop - 2.5;
    out.push(h.chemin([[xl - j, yTop + 13], [xl - j, yc], [cx - 3.2, yc]], h.a.contour));
    out.push(h.chemin([[cx + 3.2, yc], [xr + j, yc], [xr + j, yTop + 13]], h.a.contour));
    return { svg: out.join('\n'), xl, xr, yTop, yc };
  };
  const vBoite = z => {
    const bw = Math.min(124, z.l * 0.44), bh = 56;
    const cx = Math.round(z.l * 0.5), yBase = z.h - 30;
    return { bw, bh, cx, yBase, yTop: yBase - bh, yc: yBase - bh - 2.5 };
  };
  const vBouche = z => {
    const bw = Math.min(108, z.l * 0.38), bh = 56;
    const cx = Math.round(18 + bw / 2 + 6), yBase = z.h - 20;
    const xs = Math.round(z.l - 70), ys = Math.round(yBase - 44), c = 24;
    return { bw, bh, cx, yBase, yTop: yBase - bh, yc: yBase - bh - 2.5, xs, ys, c };
  };

  // ── Le cornet d'écorce, en élévation ────────────────────────────────────────────────
  const cornet = (x0, x1, yc, R) => {
    const r = x => R * (x - x0) / (x1 - x0);
    return { x0, x1, yc, R, r };
  };
  const dessinCornet = (c, graine) => {
    const { x0, x1, yc, R, r } = c, k = 0.3, out = [];
    // le cône, puis la bouche ouverte
    const cone = `M ${x0} ${yc} L ${x1} ${yc - R} A ${f(k * R)} ${R} 0 0 1 ${x1} ${yc + R} Z`;
    out.push(h.path(cone, h.a.blanc));
    // le dessous du cornet, à l'ombre
    out.push(h.chemin([[x0, yc], [x1, yc + R], [x1, yc + 0.45 * R]], h.a.ombre, true));
    out.push(h.path(cone, h.a.contour));
    // lenticelles de l'écorce de bouleau, en travers du cône
    const g = gen(graine);
    for (let i = 0; i < 26; i++) {
      const x = x0 + 14 + g() * (x1 - x0 - 22), rr = r(x) - 4;
      if (rr < 4) continue;
      const y = yc + (g() * 2 - 1) * rr, L = 2 + g() * 3;
      if (Math.abs(y - yc) + L > rr) continue;
      out.push(h.ligne(f(x), f(y - L / 2), f(x), f(y + L / 2), h.a.detail));
    }
    // la lisière de l'écorce enroulée
    const xs = x0 + 0.36 * (x1 - x0);
    out.push(h.path(`M ${f(x1 - 3)} ${f(yc + R * 0.94)} Q ${f((x1 + xs) / 2 + 6)} ${f(yc + 2)} ${f(xs)} ${f(yc - r(xs) + 0.5)}`, h.a.arete));
    out.push(h.path(`M ${f(x1 - 7)} ${f(yc + R * 0.9)} Q ${f((x1 + xs) / 2 + 2)} ${f(yc + 4)} ${f(xs - 3)} ${f(yc - r(xs - 3) + 3)}`, h.a.fin));
    // la bouche : épaisseur d'écorce et coton roulé serré
    out.push(h.ellipse(x1, yc, f(k * R), R, blanc(h.a.contour)));
    out.push(h.ellipse(x1, yc, f(k * (R - 3)), R - 3, h.a.detail));
    const sp = [], tours = 4.2, rmax = R - 4.5;
    for (let t = 0; t <= tours * 6.283; t += 0.18) {
      const rr = 1.2 + (rmax - 1.2) * t / (tours * 6.283);
      sp.push([x1 + k * rr * Math.cos(t), yc + rr * Math.sin(t)]);
    }
    out.push(h.path(poly(sp), h.a.detail));
    return out.join('\n');
  };

  const hart = (c, xh) => {
    const { yc, r } = c, out = [];
    const tour = x => {
      const rr = r(x), k = 0.3;
      out.push(h.path(`M ${f(x)} ${f(yc - rr)} A ${f(k * rr)} ${f(rr)} 0 0 1 ${f(x)} ${f(yc + rr)} L ${f(x + 4)} ${f(yc + rr)} A ${f(k * rr)} ${f(rr)} 0 0 0 ${f(x + 4)} ${f(yc - rr)} Z`, blanc(h.a.arete)));
      for (let a = -1.25; a <= 1.25; a += 0.28) {
        const px = x + 2 + k * rr * Math.cos(a), py = yc + rr * Math.sin(a);
        out.push(h.chemin([[f(px - 1.6), f(py - 1.8)], [f(px + 1.6), f(py + 1.8)]], h.a.detail));
      }
    };
    tour(xh); tour(xh + 8);
    // les deux bouts tordus ensemble, qui se dressent
    // un cordage tors : une suite de brins en biais le long du bout
    const bx = xh + 6, by = yc - r(xh + 6) - 1, out2 = [];
    const dir = [-0.42, -0.91], per = [0.91, -0.42];
    for (let i = 0; i < 6; i++) {
      const cx = bx + dir[0] * (2 + i * 3.6), cy = by + dir[1] * (2 + i * 3.6), q = [];
      for (let t = 0; t < 6.283; t += 0.5) {
        const u = 2.9 * Math.cos(t), v = 1.5 * Math.sin(t), c = Math.cos(0.75), sn = Math.sin(0.75);
        const a = u * c - v * sn, b = u * sn + v * c;
        q.push([cx + a * dir[0] + b * per[0], cy + a * dir[1] + b * per[1]]);
      }
      out2.push(h.path(poly(q, true), blanc(h.a.detail)));
    }
    out2.push(h.chemin([[bx - 2.2 + dir[0] * 23, by + dir[1] * 23], [bx - 0.8 + dir[0] * 26, by + dir[1] * 26.5]], h.a.detail));
    out2.push(h.chemin([[bx + 1.4 + dir[0] * 23, by + dir[1] * 23], [bx + 3.2 + dir[0] * 25.5, by + dir[1] * 25]], h.a.detail));
    return out.join('\n') + '\n' + out2.join('\n');
  };

  const vCornet = z => cornet(26, Math.round(z.l - 90), Math.round(z.h * 0.52), Math.min(30, Math.round(z.h * 0.19)));

  // ── Sous les braises, puis dans le sable ────────────────────────────────────────────
  const vBraises = z => {
    const yG = z.h - 6, xb = Math.round(z.l * 0.52), yE = yG - 52;
    const c1 = cornet(22, xb - 26, yG - 22, 13);
    const m0 = xb + 16, m1 = z.l - 8, mh = 46;
    const c2 = cornet(m0 + 20, m1 - 36, yG - 16, 10);
    const fum = [xb - 30, yE - 4];
    return { yG, xb, yE, c1, m0, m1, mh, c2, fum };
  };
  const cacheCornet = c => {
    const { x0, x1, yc, R } = c, k = 0.3;
    const d = `M ${x0} ${yc} L ${x1} ${yc - R} A ${f(k * R)} ${R} 0 0 1 ${x1} ${yc + R} Z M ${x1} ${yc - R} A ${f(k * R)} ${R} 0 0 0 ${x1} ${yc + R}`;
    return h.path(d, halo(3.6)) + '\n' + h.path(d, h.a.cache);
  };

  return {
    ref: '13-07',
    titre: 'L’amadou',
    desc: 'L’amadouvier en sabot sur un bouleau mort, coupé en deux : la croûte dure dessus, la couche de tubes dessous, et entre les deux la bande brune au toucher de daim, la seule qu’on garde. La tranche de cette bande battue au maillet de bois sur une bûche jusqu’à devenir un feutre souple deux fois plus grand, puis séchée. Le coton en carrés dans une boîte de métal percée d’un seul trou de clou, posée sur les braises, un jet de fumée qui sort du trou ; la fumée finie, le trou bouché d’un bout de bois, la boîte refroidie fermée, et le carré noir qui se déchire sans s’effriter. Sans boîte, le coton roulé serré dans un cornet d’écorce de bouleau ficelé d’une hart, enfoui sous les braises jusqu’à la fin du jet de fumée, puis enfoui dans le sable pour l’étouffer.',
    format: 'pleine',
    disposition: [['boite', 'bouche'], ['cornet', 'braises'], ['sabot', 'battre']],
    hauteurs: [1, 1, 1.15],
    largeurs: [[1, 1], [1, 1], [1, 1]],
    vues: {
      sabot: {
        titre: 'L’amadouvier, en coupe',
        dessin: z => {
          const g = sabot(z), out = [];
          const { tx0, xR, W, s, yA, D, croute, bande, Dd } = g;
          // le tronc de bouleau mort, en élévation, cassé en haut et en bas
          const cass = y => `M ${tx0} ${y} Q ${f(tx0 + 14)} ${y - 5} ${f((tx0 + xR) / 2)} ${y} T ${xR} ${y}`;
          const tronc = `${cass(8)} L ${xR} ${z.h - 8} Q ${f(xR - 14)} ${z.h - 3} ${f((tx0 + xR) / 2)} ${z.h - 8} T ${tx0} ${z.h - 8} Z`;
          out.push(h.path(tronc, h.a.blanc));
          // la face de droite du tronc, à l'ombre, arrêtée aux cassures
          out.push(`<clipPath id="tronc-amadou"><path fill="none" d="${tronc}"/></clipPath>`);
          out.push(`<g clip-path="url(#tronc-amadou)">${h.rect(xR - 13, 0, 13, z.h, h.a.ombre)}</g>`);
          out.push(h.ligne(tx0, 8, tx0, z.h - 8, h.a.arete));
          out.push(h.ligne(xR, 8, xR, z.h - 8, h.a.arete));
          out.push(h.path(cass(8), h.a.detail));
          out.push(h.path(`M ${tx0} ${z.h - 8} Q ${f(tx0 + 14)} ${z.h - 13} ${f((tx0 + xR) / 2)} ${z.h - 8} T ${xR} ${z.h - 8}`, h.a.detail));
          const r = gen(5);
          for (let i = 0; i < 22; i++) {
            const y = 16 + r() * (z.h - 32), x = tx0 + 5 + r() * (xR - tx0 - 20), L = 5 + r() * 9;
            if (x + L > xR - 3) continue;
            out.push(h.ligne(f(x), f(y), f(x + L), f(y), h.a.detail));
          }
          // le sabot, en coupe : tubes, bande, croûte
          out.push(`<defs><pattern id="h1707-tubes" width="3.2" height="10" patternUnits="userSpaceOnUse"><line x1="1" y1="0" x2="1" y2="10" stroke="${NOIR}" stroke-width="0.5"/></pattern></defs>`);
          const tubes = [...bande, ...Dd, [xR, bande[0][1]]];
          out.push(h.path(poly(tubes, true), 'fill="url(#h1707-tubes)" stroke="none"'));
          out.push(h.path(poly([...croute, ...bande.slice().reverse()], true), h.a.blanc));
          out.push(h.path(poly([...croute, ...bande.slice().reverse()], true), h.a.hachure('neige', 'aucun')));
          out.push(h.path(poly([...D, ...croute.slice().reverse()], true), h.a.plein));
          out.push(h.path(poly(bande), h.a.arete));
          out.push(h.path(poly([...D, ...Dd.slice(1)]) + ` L ${xR} ${f(yA + 6 * s)}`, h.a.contour));
          return out.join('\n');
        },
        renvois: z => {
          const g = sabot(z);
          const { D, croute, bande, xR, W, s, yA, P } = g;
          const i1 = Math.round(D.length * 0.3), c1 = D[i1], k1 = croute[Math.min(croute.length - 1, i1)];
          const i2 = Math.round(bande.length * 0.62);
          const b2 = [(croute[i2][0] + bande[i2][0]) / 2, (croute[i2][1] + bande[i2][1]) / 2];
          const t3 = P(0.55, 80);
          return [
            { n: 14, rond: [f(c1[0] + 30), 14], cible: [f((c1[0] + k1[0]) / 2), f((c1[1] + k1[1]) / 2)], texte: 'croûte dure : la jeter' },
            { n: 16, rond: [f(xR + W + 30), f(b2[1] - 4)], cible: [f(b2[0]), f(b2[1])], texte: 'bande brune : la garder' },
            { n: 15, rond: [f(t3[0] + 34), f(yA + 104 * s + 20)], cible: [f(t3[0]), f(t3[1])], texte: 'couche de tubes : la jeter' },
            { n: 13, rond: [f(xR - 22), f(yA + 104 * s + 22)], cible: [xR + 1, f(yA + 98 * s)], texte: 'détacher à la hache' },
          ];
        },
      },

      battre: {
        titre: 'La tranche, battue au maillet',
        dessin: z => {
          const { cx, yG, ry, rx, yT, M, fx, fy } = battre(z), out = [];
          // le sol
          out.push(h.rect(10, yG, z.l - 20, 6, h.a.hachure('terre', 'aucun')));
          out.push(h.ligne(10, yG, z.l - 10, yG, h.a.arete));
          // la bûche debout : écorce sur le flanc, cernes sur le dessus
          const yB = yG - ry;
          const flanc = `M ${cx - rx} ${yT} L ${cx - rx} ${yB} A ${rx} ${ry} 0 0 0 ${cx + rx} ${yB} L ${cx + rx} ${yT} Z`;
          out.push(h.path(flanc, h.a.blanc));
          // la face de droite, à l'ombre : du bord avant du dessus jusqu'au pied
          { const xs = [], av = x => ry * Math.sqrt(Math.max(0, 1 - ((x - cx) / rx) ** 2));
            for (let x = cx + 0.5 * rx; x <= cx + rx + 0.01; x += rx / 40) xs.push(x);
            out.push(h.chemin([...xs.map(x => [x, yT + av(x)]), ...xs.slice().reverse().map(x => [x, yB + av(x)])], h.a.ombre, true)); }
          out.push(h.path(flanc, h.a.contour));
          const r = gen(13);
          for (let i = 0; i < 16; i++) {
            const x = cx - rx + 6 + r() * (2 * rx - 12), t = (x - cx) / rx;
            const yb = yB + ry * Math.sqrt(Math.max(0, 1 - t * t));
            const y0 = yT + ry * Math.sqrt(Math.max(0, 1 - t * t)) + 3 + r() * 6;
            const y1 = Math.min(yb - 3, y0 + 10 + r() * 22);
            if (y1 - y0 > 4) out.push(h.path(`M ${f(x)} ${f(y0)} Q ${f(x + 1.5)} ${f((y0 + y1) / 2)} ${f(x)} ${f(y1)}`, h.a.detail));
          }
          out.push(h.ellipse(cx, yT, rx, ry, blanc(h.a.contour)));
          for (const k of [0.28, 0.52, 0.76]) out.push(h.ellipse(cx + 3, yT, f(rx * k), f(ry * k), h.a.fin));
          // le feutre battu, avec l'épaisseur au bord avant, et la tranche d'avant en tireté
          const g = gen(3), bord = [];
          for (let k = 0; k < 22; k++) {
            const a = k * 6.283 / 22, rr = 1 + (g() - 0.5) * (k % 2 ? 0.26 : 0.1);
            bord.push([fx + Math.cos(a) * 50 * rr, fy + Math.sin(a) * 10 * rr]);
          }
          out.push(h.path(lisse(bord.map(([x, y]) => [x, y + 2.2]), true), blanc(h.a.arete)));
          out.push(h.path(lisse(bord, true), blanc(h.a.arete)));
          for (const [a, b, c] of [[-30, -3, 14], [-8, 2, 18], [12, -4, 16], [22, 4, 12]])
            out.push(h.path(`M ${f(fx + a)} ${f(fy + b)} q ${f(c / 2)} -1.5 ${c} 0.5`, h.a.fin));
          out.push(h.path(`M ${fx - 34} ${fy} Q ${fx - 34} ${fy - 5.5} ${fx - 20} ${fy - 6} L ${fx + 20} ${fy - 6} Q ${fx + 34} ${fy - 5.5} ${fx + 34} ${fy} Q ${fx + 34} ${fy + 5.5} ${fx + 20} ${fy + 6} L ${fx - 20} ${fy + 6} Q ${fx - 34} ${fy + 5.5} ${fx - 34} ${fy} Z`, h.a.cache));
          // le maillet de bois : une tête ronde, un manche taillé
          const rad = w => w < 46 ? 12 : w < 58 ? 12 - 7 * (w - 46) / 12 : 5;
          const L = 118, haut = [], bas = [];
          for (let w = 0; w <= L; w += 2) { haut.push(M(w, -rad(w))); bas.push(M(w, rad(w))); }
          out.push(h.path(poly([...haut, ...bas.reverse()], true), blanc(h.a.contour)));
          const bout = [];
          for (let t = 0; t <= 6.283; t += 0.26) bout.push(M(3.6 * Math.cos(t), 12 * Math.sin(t)));
          out.push(h.path(poly(bout, true), blanc(h.a.arete)));
          const cerne = [];
          for (let t = 0; t <= 6.283; t += 0.3) cerne.push(M(1.6 * Math.cos(t), 5.5 * Math.sin(t)));
          out.push(h.path(poly(cerne, true), h.a.fin));
          for (const v of [-6, 3]) out.push(h.path(poly([M(8, v), M(40, v + 1)]), h.a.detail));
          for (const v of [-1.5, 2]) out.push(h.path(poly([M(64, v), M(112, v)]), h.a.fin));
          const fin = [];
          for (let t = -1.57; t <= 1.57; t += 0.3) fin.push(M(L + 1.6 * Math.cos(t), 5 * Math.sin(t)));
          out.push(h.path(poly(fin), h.a.arete));
          // le coup
          const a0 = M(20, 16), a1 = [fx - 28, fy - 12];
          out.push(h.geste(`M ${f(a0[0] - 14)} ${f(a0[1] - 6)} Q ${f(a1[0] - 22)} ${f((a0[1] + a1[1]) / 2)} ${f(a1[0] - 6)} ${f(a1[1] - 2)}`));
          return out.join('\n');
        },
        renvois: z => {
          const { cx, rx, yT, M, fx, fy } = battre(z);
          const a0 = M(20, 16), a1 = [fx - 28, fy - 12];
          const Q0 = [a0[0] - 14, a0[1] - 6], Q1 = [a1[0] - 22, (a0[1] + a1[1]) / 2], Q2 = [a1[0] - 6, a1[1] - 2];
          const gm = [0.25 * Q0[0] + 0.5 * Q1[0] + 0.25 * Q2[0], 0.25 * Q0[1] + 0.5 * Q1[1] + 0.25 * Q2[1]];
          return [
            { n: 17, rond: [f(cx + rx + 20), f(yT - 24)], cible: [fx + 30, fy - 3], texte: 'trancher mince, en long' },
            { n: 18, rond: [f(gm[0] - 30), f(gm[1] + 16)], cible: [f(gm[0] - 3), f(gm[1] + 2)], texte: 'battre au maillet de bois' },
            { n: 19, rond: [f(cx - rx - 2), f(yT + 34)], cible: [fx - 44, fy + 6], texte: 'jusqu’à doubler de surface' },
          ];
        },
      },

      boite: {
        titre: 'Le coton en boîte, sur les braises',
        dessin: z => {
          const v = vBoite(z), out = [];
          // règle 10 : un filet sur toute la largeur sépare la boîte de l'autre façon (le cornet), dessous
          out.push(h.ligne(0, z.h + 11, 600, z.h + 11, h.a.fin));
          out.push(h.ligne(10, z.h - 3, z.l - 10, z.h - 3, h.a.arete));
          out.push(lit(16, z.l - 16, v.yBase - 8, z.h - 3, 17));
          const b = boite(v.cx, v.yBase, v.bw, v.bh, false);
          out.push(b.svg);
          // le jet de fumée qui sort du trou
          const y = b.yc - 5;
          out.push(h.fleche(`M ${v.cx} ${y} C ${v.cx - 9} ${y - 12} ${v.cx + 9} ${y - 22} ${v.cx} ${y - 34} S ${v.cx - 4} ${y - 50} ${v.cx + 5} ${f(Math.max(10, y - 62))}`, h.a.cache));
          // le trou : on surveille le jet de fumée qui en sort
          out.push(h.controle(v.cx, b.yc - 3, 9));
          return out.join('\n');
        },
        renvois: z => {
          const v = vBoite(z), xr = v.cx + v.bw / 2, xl = v.cx - v.bw / 2;
          const y = v.yc - 5;
          return [
            { n: 1, rond: [f(xr + 34), f(v.yTop + 26)], cible: [f(xr + 1), f(v.yTop + 26)], texte: 'boîte à couvercle serré' },
            { n: 2, rond: [f(xl - 30), f(v.yBase - 22)], cible: [f(xl + 12), f(v.yBase - 20)], texte: 'coton pur : jeans, guenille' },
            { n: 3, rond: [f(v.cx - 44), f(v.yc - 22)], cible: [v.cx - 9, f(v.yc - 6)], texte: 'un seul trou : le jet en sort' },
            { n: 4, rond: [f(v.cx + 42), f(y - 38)], cible: [v.cx + 3, f(y - 34)], texte: 'quand le jet cesse, retirer' },
          ];
        },
      },

      bouche: {
        titre: 'Boucher, laisser refroidir fermé',
        dessin: z => {
          const v = vBouche(z), out = [];
          out.push(h.rect(10, v.yBase, v.cx + v.bw / 2 + 20 - 10, 6, h.a.hachure('terre', 'aucun')));
          out.push(h.ligne(10, v.yBase, v.cx + v.bw / 2 + 20, v.yBase, h.a.arete));
          const b = boite(v.cx, v.yBase, v.bw, v.bh, true);
          out.push(b.svg);
          // le bout de bois enfoncé dans le trou
          out.push(h.chemin([[v.cx - 2.4, v.yc + 2], [v.cx + 2.4, v.yc + 2], [v.cx + 4.2, v.yc - 14], [v.cx + 1.5, v.yc - 18], [v.cx - 4, v.yc - 15]], blanc(h.a.arete), true));
          out.push(h.path(`M ${v.cx} ${v.yc - 1} L ${v.cx + 0.6} ${v.yc - 13}`, h.a.fin));
          // le carré noir, déchiré en deux sans s'effriter
          const { xs, ys, c } = v, g = gen(9), dent = [];
          for (let y = ys - c; y <= ys + c + 0.1; y += 3.2) dent.push([xs + (g() - 0.5) * 5, y]);
          const dx = 9, dy = -5;
          out.push(h.path(poly([[xs - c, ys - c], ...dent, [xs - c, ys + c]], true), h.a.plein));
          out.push(h.path(poly([...dent.map(([x, y]) => [x + dx, y + dy]), [xs + c + dx, ys + c + dy], [xs + c + dx, ys - c + dy]], true), h.a.plein));
          for (let i = 1; i < dent.length - 1; i += 2) {
            const [x, y] = dent[i];
            out.push(h.chemin([[f(x), f(y)], [f(x + 3), f(y - 0.5)]], h.a.fin));
            out.push(h.chemin([[f(x + dx), f(y + dy + 1)], [f(x + dx - 3), f(y + dy + 1.2)]], h.a.fin));
          }
          out.push(h.fleche(`M ${xs - c - 4} ${ys} L ${xs - c - 16} ${ys}`));
          out.push(h.fleche(`M ${xs + c + dx + 4} ${ys + dy} L ${xs + c + dx + 16} ${ys + dy}`));
          // la déchirure : souple et nette, pas de poussière
          out.push(h.controle(xs + dx / 2, ys + dy / 2 - 6, 15));
          return out.join('\n');
        },
        renvois: z => {
          const v = vBouche(z), xr = v.cx + v.bw / 2;
          return [
            { n: 5, rond: [f(v.cx + 34), f(v.yc - 26)], cible: [v.cx + 3, f(v.yc - 11)], texte: 'boucher d’un bout de bois' },
            { n: 6, rond: [f(xr + 26), f(v.yBase - 16)], cible: [f(xr + 1), f(v.yBase - 16)], texte: 'refroidir fermée' },
            { n: 7, rond: [f(v.xs + 4), f(v.ys + v.c + 22)], cible: [f(v.xs - 8), f(v.ys + v.c - 6)], texte: 'noir, souple, ne s’effrite pas' },
          ];
        },
      },

      cornet: {
        titre: 'Sans boîte : le cornet d’écorce',
        dessin: z => {
          const c = vCornet(z);
          // un filet sépare le cornet de l'amadouvier, autre sujet, dessous
          return h.ligne(0, z.h + 11, 600, z.h + 11, h.a.fin) + '\n' + dessinCornet(c, 21) + '\n' + hart(c, Math.round(c.x0 + 0.56 * (c.x1 - c.x0)));
        },
        renvois: z => {
          const c = vCornet(z), xh = Math.round(c.x0 + 0.56 * (c.x1 - c.x0)), xb = c.x0 + 0.26 * (c.x1 - c.x0);
          return [
            { n: 8, rond: [c.x1 + 44, c.yc + c.R + 8], cible: [f(c.x1 + 3), c.yc + 4], texte: 'au lieu de 1 à 6 : coton roulé' },
            { n: 9, rond: [f(xb - 8), f(c.yc + c.R + 18)], cible: [f(xb), f(c.yc + c.r(xb) * 0.5)], texte: 'écorce de bouleau' },
            { n: 10, rond: [f(xh + 44), f(c.yc - c.R - 12)], cible: [f(xh + 12 + 0.3 * c.r(xh + 8)), f(c.yc - c.r(xh) * 0.4)], texte: 'ficelé d’une hart' },
          ];
        },
      },

      braises: {
        titre: 'Sous les braises, puis dans le sable',
        dessin: z => {
          const v = vBraises(z), out = [];
          out.push(h.ligne(10, v.yG, z.l - 8, v.yG, h.a.arete));
          // les braises s'écartent de la silhouette du cornet enfoui, pour qu'on le lise
          const c1 = v.c1, dedans = (cx, cy) => cx > c1.x0 - 3 && cx < c1.x1 + 0.3 * c1.R + 3 &&
            Math.abs(cy - c1.yc) < c1.r(Math.min(Math.max(cx, c1.x0), c1.x1)) + 3;
          out.push(lit(14, v.xb, v.yE, v.yG, 33, dedans));
          out.push(cacheCornet(v.c1));
          // la fumée qui monte à travers les braises
          const [x, y] = v.fum;
          out.push(h.fleche(`M ${x} ${y} C ${x - 8} ${y - 12} ${x + 8} ${y - 22} ${x} ${y - 34} S ${x - 4} ${y - 50} ${x + 5} ${f(Math.max(10, y - 62))}`, h.a.cache));
          // le monticule de sable, le cornet dedans
          const { m0, m1, mh, yG } = v;
          const mont = [[m0, yG], [m0 + 16, yG - mh * 0.55], [(m0 + m1) / 2 - 6, yG - mh], [m1 - 18, yG - mh * 0.62], [m1, yG]];
          out.push(h.path(lisse(mont) + ' Z', h.a.hachure('gravier', 'arete')));
          out.push(cacheCornet(v.c2));
          // on le sort des braises et on l'enfouit
          out.push(h.geste(`M ${v.xb - 16} ${v.yE - 16} Q ${f((v.xb + m0) / 2 + 10)} ${f(yG - mh - 42)} ${f((m0 + m1) / 2 - 20)} ${f(yG - mh - 8)}`));
          return out.join('\n');
        },
        renvois: z => {
          const v = vBraises(z), [x, y] = v.fum;
          const { m0, m1, mh, yG } = v;
          const P0 = [v.xb - 16, v.yE - 16], P1 = [(v.xb + m0) / 2 + 10, yG - mh - 42], P2 = [(m0 + m1) / 2 - 20, yG - mh - 8];
          const gq = [0.25 * P0[0] + 0.5 * P1[0] + 0.25 * P2[0], 0.25 * P0[1] + 0.5 * P1[1] + 0.25 * P2[1]];
          return [
            { n: 11, rond: [x - 44, f(y - 44)], cible: [x - 2, f(y - 43)], texte: 'quand la fumée cesse, sortir' },
            { n: 12, rond: [f(gq[0] + 6), f(gq[1] - 26)], cible: [f(gq[0]), f(gq[1] - 3)], texte: 'dans le sable, pour l’étouffer' },
          ];
        },
      },
    },
  };
};
