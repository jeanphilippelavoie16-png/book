// Planche 84-05 — Le feu du retour, monté à la fermeture (chapitre 84, étapes 17, 19 et 20 ;
// l'allumage par le haut : ch. 83, étape 15).
// Cotes : aucune. Le chapitre ne donne ni la taille du poêle, ni celle de la boîte, ni celle du pot.
// Dans le poêle : coupe de face, porte enlevée. Sur la cendre brassée, trois grosses bûches serrées
// vues par le bout, le moyen couché en travers, le menu (des éclisses fendues) en long, vu par le
// bout, puis le papier froissé et deux rouleaux d'écorce de bouleau au sommet. Dans le tuyau, la clé
// laissée ouverte : la plaque vue sur la tranche, dans l'axe du tuyau.
// À côté du poêle : la boîte de métal d'allumage, couvercle levé pour montrer ce qu'elle garde
// (papier journal plié, écorce de bouleau roulée, éclisses debout), la flèche qui la referme ; le pot
// de verre à couvercle, les allumettes et le briquet dedans.
module.exports = (h) => {
  const A = h.a;
  const W = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const f = v => Math.round(v * 10) / 10;
  const pt = p => `${f(p[0])} ${f(p[1])}`;
  const poly = (pts, at) => h.chemin(pts, at, true);

  // hasard reproductible
  const alea = graine => () => { graine = (graine * 16807) % 2147483647; return graine / 2147483647; };

  // une courbe fermée un peu irrégulière autour d'un centre (en unités de vue)
  const bosse = (c, r, amp, ph, n = 44) => {
    const o = [];
    for (let i = 0; i < n; i++) {
      const t = (i / n) * 2 * Math.PI;
      const k = 1 + amp * (Math.sin(3 * t + ph) * 0.6 + Math.sin(5 * t + 2 * ph) * 0.4);
      o.push([c[0] + r * k * Math.cos(t), c[1] + r * k * Math.sin(t)]);
    }
    return o;
  };

  // ── Dans le poêle, en coupe ───────────────────────────────────────────────────────────
  // Repère en mm : x vers la droite (0 au milieu du foyer), y vers le haut (0 à la sole).
  const XI = 222, EP = 8, YI = 380, YT = 620;
  const LOG = { r: 62, xs: [-128, 0, 128] };
  const CENDRE = 24;
  const Y_BUCHE = CENDRE + LOG.r;                  // centre des grosses bûches
  const Y_MOYEN = Y_BUCHE + LOG.r + 20;            // centre du moyen de devant
  const Y_MENU = Y_MOYEN + 32 + 12;            // centre du menu
  const Y_HAUT = Y_MENU + 12;                      // dessus du menu
  const Y_CLE = 505;

  const geoCoupe = z => {
    const s = Math.min((z.l - 52) / (2 * (XI + EP) + 20), (z.h - 8) / (YT + 130));
    const ox = 6 + (XI + EP + 10) * s, oy = z.h - 4 - 130 * s;
    const T = (x, y) => [ox + x * s, oy - y * s];
    return { s, T };
  };

  const coupe = z => {
    const { s, T } = geoCoupe(z);
    const o = [];
    const R = (x1, y1, x2, y2, at) => { const a = T(x1, y2), b = T(x2, y1); return h.rect(a[0], a[1], b[0] - a[0], b[1] - a[1], at); };

    // le plancher, les pattes
    o.push(h.ligne(2, T(0, -130)[1], z.l - 2, T(0, -130)[1], A.detail));
    o.push(R(-XI + 10, -130, -XI + 40, -EP, W(A.arete)), R(XI - 40, -130, XI - 10, -EP, W(A.arete)));

    // la cendre brassée : un lit mince, le dessus bosselé, un pointillé serré
    {
      const g = alea(11), dessus = [];
      for (let x = -XI; x <= XI; x += 20) dessus.push([x, CENDRE - 3 + 6 * g()]);
      const lit = [[-XI, 0]].concat(dessus, [[XI, 0]]).map(p => T(...p));
      o.push(poly(lit, W(A.detail)));
      const g2 = alea(29);
      for (let i = 0; i < 150; i++) {
        const x = -XI + 6 + (2 * XI - 12) * g2(), y = 3 + (CENDRE - 9) * g2();
        const q = T(x, y);
        o.push(h.cercle(q[0], q[1], 0.55, A.plein));
      }
    }

    // les grosses bûches, vues par le bout : écorce, cernes, fente de séchage, cœur
    LOG.xs.forEach((x, i) => {
      const c = T(x, Y_BUCHE), r = LOG.r * s;
      o.push(poly(bosse(c, r, 0.025, i * 1.3), W(A.arete)));
      o.push(poly(bosse(c, r * 0.87, 0.03, i * 1.3 + 0.4), A.fin));
      o.push(poly(bosse(c, r * 0.56, 0.04, i * 1.3 + 1.1), A.fin));
      o.push(poly(bosse(c, r * 0.28, 0.05, i * 1.3 + 2), A.fin));
      const t = [-2.3, -0.7, 2.6][i];
      o.push(h.chemin([c, [c[0] + r * 0.82 * Math.cos(t), c[1] + r * 0.82 * Math.sin(t)]], A.fin));
      o.push(h.cercle(c[0], c[1], 1, A.plein));
    });

    // le moyen, couché en travers : trois rondins l'un derrière l'autre, qui dépassent chacun un peu
    // un rondin de branche vu de côté : il s'amincit d'un bout à l'autre, les bouts sciés un peu de
    // biais, un nœud, l'écorce en traits courts, une ligne de forme sous le ventre
    const baton = (x1, x2, yc, r, sens, graine) => {
      const g = alea(graine);
      const r1 = r * (sens > 0 ? 1.1 : 0.88), r2 = r * (sens > 0 ? 0.88 : 1.1);
      const rx = x => r1 + (r2 - r1) * (x - x1) / (x2 - x1);
      const haut = [], bas = [];
      for (let x = x1; x <= x2 + 0.1; x += (x2 - x1) / 10) {
        const w = x === x1 || x > x2 - 1 ? 0 : (g() - 0.5) * 1.6;
        haut.push(T(x, yc + rx(x) + w)); bas.unshift(T(x, yc - rx(x) + w * 0.5));
      }
      haut[haut.length - 1] = T(x2 + 3, yc + r2); bas[0] = T(x2 - 3, yc - r2);
      haut[0] = T(x1 - 2, yc + r1); bas[bas.length - 1] = T(x1 + 2, yc - r1);
      const out = [poly(haut.concat(bas), W(A.arete))];
      out.push(h.chemin([T(x1 + 14, yc - rx(x1) * 0.62), T(x2 - 14, yc - rx(x2) * 0.62)], A.fin));
      for (let i = 0; i < 6; i++) {
        const x = x1 + 20 + (x2 - x1 - 60) * g(), y = yc + rx(x) * (0.1 + 0.6 * g()), lg = 18 + 26 * g();
        out.push(h.chemin([T(x, y), T(x + lg, y + (g() - 0.5) * 2)], A.fin));
      }
      const xn = x1 + (x2 - x1) * (0.3 + 0.4 * g()), qn = T(xn, yc + rx(xn) * 0.25);
      out.push(h.ellipse(qn[0], qn[1], 4.2 * s, 2.6 * s, W(A.detail)), h.cercle(qn[0], qn[1], 0.8, A.plein));
      return out.join('\n');
    };
    o.push(baton(-214, 184, Y_MOYEN + 13, 20, 1, 21));
    o.push(baton(-188, 214, Y_MOYEN + 6, 20, -1, 8));
    o.push(baton(-206, 198, Y_MOYEN, 19, 1, 14));

    // le menu, en long, vu par le bout : des éclisses fendues, pointes et quartiers, en désordre
    {
      const g = alea(5);
      const formes = [
        [[-1, -1], [1, -1], [0.1, 1]], [[-1, -1], [1, -0.8], [0.8, 0.9], [-0.7, 1]], [[-1, -0.9], [1, -1], [-0.3, 1]],
        [[-0.9, -1], [1, -0.9], [0.6, 1], [-1, 0.6]], [[-1, -1], [0.9, -1], [0.5, 1]], [[-1, -1], [1, -1], [1, 0.4], [-0.2, 1]],
      ];
      let x = -170, i = 0;
      const base = Y_MENU - 12;
      while (x < 158) {
        const lx = 10 + 4 * g(), ly = 9 + 4 * g(), rot = (g() - 0.5) * 0.6;
        const fm = formes[(i * 5) % formes.length];
        const loc = fm.map(([u, v]) => [u * lx * Math.cos(rot) - v * ly * Math.sin(rot), u * lx * Math.sin(rot) + v * ly * Math.cos(rot)]);
        const ymin = Math.min(...loc.map(p => p[1]));
        const pts = loc.map(([u, v]) => T(x + lx + u, base + (v - ymin)));
        o.push(poly(pts, W(A.detail)));
        const cc = T(x + lx, base + ly * 0.7);
        o.push(h.cercle(cc[0], cc[1], 0.6, A.plein));
        x += 2 * lx + 2 + 4 * g(); i++;
      }
    }

    // au sommet : le papier journal froissé en boules, les rouleaux d’écorce vus par le bout
    const boule = (x, r, ph) => {
      const c = T(x, Y_HAUT + r * 0.9), rr = r * s;
      const g = alea(Math.round(ph * 100) + 3), pts = [], n = 14;
      for (let i = 0; i < n; i++) {
        const t = (i / n) * 2 * Math.PI + ph, k = (i % 4 === 1 ? 0.8 : 0.92) + 0.13 * g();
        pts.push([c[0] + rr * k * Math.cos(t), c[1] + rr * k * 0.86 * Math.sin(t)]);
      }
      const out = [poly(pts, W(A.arete))];
      // les plis du papier froissé : trois arêtes cassées qui traversent la boule, deux plis courts au bord
      const dans = (p, k) => [c[0] + (p[0] - c[0]) * k, c[1] + (p[1] - c[1]) * k];
      const mil = (i, dx, dy) => [c[0] + rr * dx, c[1] + rr * dy];
      for (const [i, m, j] of [[0, mil(0, 0.15, -0.2), 6], [3, mil(0, -0.25, 0.05), 9], [11, mil(0, 0.3, 0.3), 5]]) {
        out.push(h.chemin([dans(pts[i], 0.9), m, dans(pts[j], 0.55)], A.fin));
      }
      for (const i of [2, 8, 12]) out.push(h.chemin([dans(pts[i], 0.95), dans(pts[(i + 1) % n], 0.62)], A.fin));
      // trois lignes d'imprimé sur une facette : c'est du journal
      for (let k = 0; k < 3; k++) {
        const p = [c[0] - rr * 0.62, c[1] - rr * 0.02 + k * rr * 0.16];
        out.push(h.chemin([p, [p[0] + rr * (0.42 - k * 0.07), p[1] - rr * 0.1]], A.detail));
      }
      return out.join('\n');
    };
    const rouleau = (x, r, ph) => {
      const c = T(x, Y_HAUT + r), rr = r * s, sp = [];
      for (let i = 0; i <= 60; i++) {
        const t = ph + (i / 60) * 3.4 * Math.PI, k = rr * (1 - 0.8 * i / 60);
        sp.push([c[0] + k * Math.cos(t), c[1] + k * Math.sin(t)]);
      }
      return [h.cercle(c[0], c[1], rr, W(A.arete)), h.chemin(sp, A.detail)].join('\n');
    };
    o.push(rouleau(-128, 15, 0.4), boule(-68, 36, 0.2), rouleau(4, 14, 2.1), boule(68, 32, 1.1), rouleau(130, 16, 3.5));

    // la caisse en coupe : tôles pleines ; le dessus percé du collet
    o.push(R(-XI - EP, -EP, XI + EP, 0, A.plein));
    o.push(R(-XI - EP, -EP, -XI, YI + EP, A.plein), R(XI, -EP, XI + EP, YI + EP, A.plein));
    o.push(R(-XI - EP, YI, -70, YI + EP, A.plein), R(70, YI, XI + EP, YI + EP, A.plein));

    // le tuyau, en coupe : deux tôles minces, coupé au haut de la vue
    const yh = 4;
    const tole = x => { const a = T(x - 2, 0), b = T(x + 2, 0); return h.rect(a[0], yh, b[0] - a[0], T(0, YI + EP)[1] - yh, A.plein); };
    o.push(tole(-72), tole(72));
    // la coupure du tuyau, en zigzag
    {
      const g = T(-74, 0)[0], d = T(74, 0)[0];
      o.push(h.path(`M${pt([g, yh])} L${pt([g + 6, yh - 3])} L${pt([g + 12, yh + 3])} L${pt([d - 12, yh - 3])} L${pt([d - 6, yh + 3])} L${pt([d, yh])}`, A.detail));
    }
    // la clé : la plaque sur la tranche, dans l'axe du tuyau (ouverte), sa tige vue par le bout
    {
      const a = T(-5, Y_CLE + 64), b = T(5, Y_CLE - 64), c = T(0, Y_CLE);
      o.push(`<rect x="${f(a[0])}" y="${f(a[1])}" width="${f(b[0] - a[0])}" height="${f(b[1] - a[1])}" rx="${f(4 * s)}" ${A.plein}/>`);
      o.push(h.cercle(c[0], c[1], 6, W(A.arete)), h.cercle(c[0], c[1], 1.6, A.plein));
    }
    return o.join('\n');
  };

  // ── À côté du poêle : la boîte d'allumage et le pot ────────────────────────────────────
  // La boîte en perspective cavalière : x vers la droite, y vers le haut, zz vers le fond
  // (le fond fuit vers le haut et la droite).
  const KC = 0.34, KS = 0.46;
  const BX = 300, BY = 150, BZ = 180, TH = 105 * Math.PI / 180;
  const geoBoite = z => {
    const s = Math.min((z.l - 44) / (BX + BZ * KC + 40), 0.62);
    const ox = 6, oy = 10 + (BY + 180 + BZ * KS) * s;       // le haut du couvercle levé
    const Q = (x, y, zz) => [ox + s * (x + zz * KC), oy - s * (y + zz * KS)];
    return { s, Q };
  };
  const geoPot = z => {
    const s = Math.min((z.l - 44) / 120, 1.15);
    const cx = 6 + 60 * s + ((z.l - 44) - 120 * s) / 2, yb = z.h - 8;
    const J = (x, y) => [cx + x * s, yb - y * s];
    return { s, J };
  };

  const cote = z => {
    const o = [];
    // ── la boîte
    {
      const { s, Q } = geoBoite(z);
      // le couvercle levé, vu par-dessous : le panneau et son rebord
      const u = [0, Math.sin(TH), -Math.cos(TH)], lvec = [0, -Math.cos(TH), -Math.sin(TH)];
      const C = (x, t, l = 0) => Q(x, BY + BZ * t * u[1] + l * lvec[1], BZ + BZ * t * u[2] + l * lvec[2]);
      o.push(poly([C(0, 0), C(BX, 0), C(BX, 1), C(0, 1)], W(A.contour)));
      o.push(poly([C(10, 0.05), C(BX - 10, 0.05), C(BX - 10, 0.94), C(10, 0.94)], A.fin));
      o.push(poly([C(0, 1), C(BX, 1), C(BX, 1, 16), C(0, 1, 16)], W(A.arete)));
      // l'agrafe du moraillon, au bord du couvercle
      { const a = C(BX / 2 - 14, 1, 16), b = C(BX / 2 + 14, 1, 16), c = C(BX / 2 + 14, 1, 34), d = C(BX / 2 - 14, 1, 34); o.push(poly([a, b, c, d], W(A.arete))); }

      // l'ouverture : le rebord, la paroi du fond et celle de gauche vues par-dedans
      o.push(poly([Q(0, BY, 0), Q(BX, BY, 0), Q(BX, BY, BZ), Q(0, BY, BZ)], W(A.arete)));
      o.push(poly([Q(4, BY, 4), Q(BX - 4, BY, 4), Q(BX - 4, BY, BZ - 4), Q(4, BY, BZ - 4)], A.fin));
      // les charnières, sur l'arête du fond
      for (const x of [50, BX - 80]) { const a = Q(x, BY, BZ), b = Q(x + 30, BY, BZ); o.push(h.rect(a[0], a[1] - 3, b[0] - a[0], 6, W(A.detail))); }

      // le papier journal plié, debout contre le fond : trois cahiers
      [[150, 214], [138, 206], [126, 198]].forEach(([zz, top], k) => {
        const x0 = 16 + k * 6, x1 = BX - 20 - k * 4;
        o.push(poly([Q(x0, 0, zz), Q(x1, 0, zz), Q(x1, top, zz), Q(x0, top, zz)], W(A.arete)));
        o.push(poly([Q(x0, top, zz), Q(x1, top, zz), Q(x1, top, zz + 10), Q(x0, top, zz + 10)], W(A.detail)));
        if (k === 2) {
          // la une : un titre, puis des colonnes de texte
          o.push(h.chemin([Q(x0 + 14, top - 14, zz), Q(x0 + 150, top - 14, zz)], 'fill="none" stroke="#1a1a1a" stroke-width="2.2"'));
          for (let col = 0; col < 4; col++) {
            const xa = x0 + 14 + col * 62, xb = xa + 50;
            for (let y = top - 28; y > top - 72; y -= 7) o.push(h.chemin([Q(xa, y, zz), Q(xb - (y % 3) * 4, y, zz)], A.fin));
          }
        }
      });

      // l'écorce de bouleau, en rouleaux couchés au milieu ; les lenticelles en petits traits
      const roule = (x, y, zz, r, lg, ph) => {
        const n = 30, b0 = [], b1 = [];
        for (let i = 0; i < n; i++) {
          const t = (i / n) * 2 * Math.PI;
          b0.push(Q(x, y + r * Math.cos(t), zz + r * Math.sin(t)));
          b1.push(Q(x + lg, y + r * Math.cos(t), zz + r * Math.sin(t)));
        }
        const env = (() => {
          const p = b0.concat(b1).slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
          const x_ = (o_, a, b) => (a[0] - o_[0]) * (b[1] - o_[1]) - (a[1] - o_[1]) * (b[0] - o_[0]);
          const bas = [], haut = [];
          for (const q of p) { while (bas.length >= 2 && x_(bas[bas.length - 2], bas[bas.length - 1], q) <= 0) bas.pop(); bas.push(q); }
          for (const q of p.slice().reverse()) { while (haut.length >= 2 && x_(haut[haut.length - 2], haut[haut.length - 1], q) <= 0) haut.pop(); haut.push(q); }
          return bas.slice(0, -1).concat(haut.slice(0, -1));
        })();
        const out = [poly(env, W(A.arete))];
        const g = alea(ph);
        for (let i = 0; i < 9; i++) {
          const xx = x + 10 + (lg - 22) * g(), t = 2.1 + 1.6 * g(), yy = y + r * Math.cos(t), z2 = zz + r * Math.sin(t);
          out.push(h.chemin([Q(xx, yy, z2), Q(xx + 9 + 6 * g(), yy, z2)], A.detail));
        }
        const sp = [];
        for (let i = 0; i <= 44; i++) {
          const t = -0.4 + (i / 44) * 3.3 * Math.PI, rr = r * (1 - 0.75 * i / 44);
          sp.push(Q(x + lg, y + rr * Math.cos(t), zz + rr * Math.sin(t)));
        }
        out.push(poly(b1, W(A.arete)), h.chemin(sp, A.fin));
        return out.join('\n');
      };
      o.push(roule(118, 150, 104, 22, 150, 17), roule(132, 142, 62, 20, 140, 41));

      // les éclisses, debout dans le coin de devant, à gauche
      const eclisse = (x, zz, lx, lz, top, pente) => {
        // une éclisse fendue : la face de devant, le flanc droit, le bout du haut cassé en biseau
        const tg = top, td = top - pente;
        const face = [Q(x, 0, zz), Q(x + lx, 0, zz), Q(x + lx, td, zz), Q(x + lx * 0.55, tg + 4, zz), Q(x, tg, zz)];
        const flanc = [Q(x + lx, 0, zz), Q(x + lx, 0, zz + lz), Q(x + lx, td - 4, zz + lz), Q(x + lx, td, zz)];
        const dessus = [Q(x + lx, td, zz), Q(x + lx, td - 4, zz + lz), Q(x + lx * 0.5, tg + 2, zz + lz * 0.6), Q(x + lx * 0.55, tg + 4, zz)];
        const out = [poly(flanc, W(A.detail)), poly(dessus, W(A.detail)), poly(face, W(A.arete))];
        // le fil du bois, en long, et une fente
        for (const [k, d] of [[0.28, 1], [0.62, -1.5]]) out.push(h.chemin([Q(x + lx * k, BY - 16, zz), Q(x + lx * k + d, tg - 22, zz)], A.fin));
        return out.join('\n');
      };
      [[20, 70, 26, 18, 236, 14], [58, 66, 24, 20, 252, 10], [14, 34, 30, 22, 218, 18], [50, 30, 26, 18, 230, 16], [82, 38, 22, 16, 212, 8]]
        .forEach(([x, zz, lx, lz, top, p]) => o.push(eclisse(x, zz, lx, lz, top, p)));

      // la caisse : le flanc droit, puis la façade, qui cachent le bas de ce qu'elle contient
      o.push(poly([Q(BX, 0, 0), Q(BX, 0, BZ), Q(BX, BY, BZ), Q(BX, BY, 0)], W(A.contour)));
      o.push(poly([Q(0, 0, 0), Q(BX, 0, 0), Q(BX, BY, 0), Q(0, BY, 0)], W(A.contour)));
      o.push(h.chemin([Q(0, BY - 12, 0), Q(BX, BY - 12, 0), Q(BX, BY - 12, BZ)], A.fin));   // le bourrelet du bord
      // le moraillon de la façade
      { const a = Q(BX / 2 - 10, BY - 4, 0), b = Q(BX / 2 + 10, BY - 40, 0); o.push(h.rect(a[0], a[1], b[0] - a[0], b[1] - a[1], W(A.arete))); const c = Q(BX / 2, BY - 30, 0); o.push(h.cercle(c[0], c[1], 1.6, A.plein)); }

    }

    // ── le pot de verre à couvercle, les allumettes et le briquet dedans
    {
      const { s, J } = geoPot(z);
      const ell = (y, rx, ry, at) => { const c = J(0, y); return h.ellipse(c[0], c[1], rx * s, ry * s, at); };
      // les allumettes, debout, en éventail
      const g = alea(7);
      for (let i = 0; i < 11; i++) {
        const xb = -30 + i * 4.2, xt = xb * 1.35 - 6 + 3 * g(), yt = 96 + 8 * g();
        const a = J(xb, 6), b = J(xt, yt);
        o.push(h.ligne(a[0], a[1], b[0], b[1], 'fill="none" stroke="#1a1a1a" stroke-width="1.6" stroke-linecap="butt"'));
        o.push(h.ligne(a[0], a[1], b[0], b[1], 'fill="none" stroke="#FFFFFF" stroke-width="0.5"'));
        const ang = Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI;
        o.push(`<ellipse cx="${f(b[0])}" cy="${f(b[1])}" rx="${f(4.2 * s)}" ry="${f(2.6 * s)}" transform="rotate(${f(ang)} ${f(b[0])} ${f(b[1])})" fill="#1a1a1a" stroke="none"/>`);
      }
      // le briquet, debout contre la paroi de droite : le corps, la molette, le capot percé, le poussoir
      {
        const x0 = 12, x1 = 36, y0 = 6, y1 = 62;
        const a = J(x0, y1), b = J(x1, y0);
        o.push(`<rect x="${f(a[0])}" y="${f(a[1])}" width="${f(b[0] - a[0])}" height="${f(b[1] - a[1])}" rx="${f(4 * s)}" ${W(A.arete)}/>`);
        o.push(poly([J(x1 - 10, y1), J(x1 + 1, y1), J(x1 + 1, y1 + 4), J(x1 - 10, y1 + 4)], W(A.detail)));
        o.push(poly([J(x0 + 12, y1 + 4), J(x1, y1 + 4), J(x1, y1 + 17), J(x0 + 12, y1 + 17)], W(A.arete)));
        for (const y of [y1 + 8, y1 + 13]) { const c = J(x0 + 19, y); o.push(h.cercle(c[0], c[1], 0.9, A.plein)); }
        const r = J(x0 + 6.5, y1 + 7);
        o.push(h.cercle(r[0], r[1], 6 * s, W(A.arete)));
        o.push(h.cercle(r[0], r[1], 3 * s, A.fin));
        o.push(h.chemin([J(x0 + 3, 16), J(x0 + 3, 52)], A.fin));
      }
      // le verre : le fond, le corps, l'épaule, le col fileté
      const corps = [J(-44, 4), J(-44, 104), J(-40, 114), J(-30, 122), J(-30, 132), J(30, 132), J(30, 122), J(40, 114), J(44, 104), J(44, 4)];
      o.push(h.path(`M${pt(corps[0])} L${corps.slice(1).map(pt).join(' L')}`, A.arete));
      o.push(h.path(`M${pt(J(-44, 4))} Q${pt(J(0, -4))} ${pt(J(44, 4))}`, A.arete));
      o.push(ell(4, 44, 4, A.fin));
      // les reflets du verre
      o.push(h.chemin([J(-37, 22), J(-37, 92)], A.detail), h.chemin([J(-31, 30), J(-31, 60)], A.fin));
      // le couvercle vissé : la bague striée, le disque
      {
        const a = J(-33, 146), b = J(33, 130);
        o.push(h.rect(a[0], a[1], b[0] - a[0], b[1] - a[1], W(A.arete)));
        for (let x = -28; x <= 28; x += 5) o.push(h.chemin([J(x, 133), J(x, 143)], A.fin));
        o.push(ell(146, 33, 4, W(A.arete)));
      }
      // le plancher
      { const a = J(-66, 0), b = J(66, 0); o.push(h.ligne(a[0], a[1], b[0], b[1], A.detail)); }
    }
    return o.join('\n');
  };

  return {
    ref: '84-05',
    titre: 'Le feu du retour, monté à la fermeture',
    desc: 'Le poêle en coupe de face : sur la cendre brassée, froide, trois grosses bûches serrées, le moyen couché en travers, '
      + 'le menu en long, puis le papier froissé et l’écorce de bouleau au sommet ; dans le tuyau, la clé laissée ouverte. '
      + 'À côté du poêle, la boîte de métal d’allumage, couvercle levé pour montrer le papier journal, l’écorce de bouleau et '
      + 'les éclisses de réserve, et qui se referme ; le pot de verre à couvercle avec les allumettes et le briquet.',
    format: 'pleine',
    disposition: [['coupe', 'cote']],
    largeurs: [[4, 3]],
    vues: {
      coupe: {
        titre: 'Dans le poêle, en coupe',
        dessin: coupe,
        renvois: z => {
          const { T } = geoCoupe(z), xd = z.l - 14;
          return [
            { n: 1, rond: [xd, T(0, 4)[1]], cible: T(200, 12), texte: 'cendre brassée, sans braise, froide à la main' },
            { n: 2, rond: [xd, T(0, 64)[1]], cible: T(170, Y_BUCHE - 10), texte: 'deux ou trois grosses bûches au fond, serrées' },
            { n: 3, rond: [xd, T(0, 150)[1]], cible: T(192, Y_MOYEN - 6), texte: 'le moyen' },
            { n: 4, rond: [xd, T(0, 206)[1]], cible: T(140, Y_MENU), texte: 'le menu' },
            { n: 5, rond: [xd, T(0, 268)[1]], cible: T(80, Y_HAUT + 30), texte: 'papier et allumage secs, au sommet' },
            { n: 6, rond: [xd, T(0, Y_CLE + 40)[1]], cible: T(0, Y_CLE + 36), texte: 'la clé du tuyau, laissée ouverte' },
          ];
        },
      },
      cote: {
        titre: 'À côté du poêle',
        dessin: cote,
        renvois: z => {
          const { Q } = geoBoite(z), { J } = geoPot(z), xd = z.l - 14;
          return [
            { n: 7, rond: [xd, Q(0, 60, 0)[1]], cible: Q(BX - 30, 60, 0), texte: 'boîte de métal fermée, contre la souris' },
            { n: 8, rond: [xd, Q(0, 214, 150)[1] - 20], cible: Q(BX - 60, 190, 126), texte: 'le papier journal' },
            { n: 9, rond: [xd, Q(0, 150, 104)[1] + 6], cible: Q(250, 164, 104), texte: 'l’écorce de bouleau à papier' },
            { n: 10, rond: [Q(0, 0, 0)[0] + 8, Q(0, 262, 40)[1] - 8], cible: Q(48, 236, 40), texte: 'les éclisses de réserve' },
            { n: 11, rond: [xd, J(0, 90)[1]], cible: J(40, 80), texte: 'pot de verre à couvercle : allumettes, briquet' },
          ];
        },
      },
    },
    danger: 'Danger — la clé du tuyau reste ouverte. Fermée, elle renvoie toute la fumée du premier feu dans la pièce, monoxyde compris.',
  };
};
