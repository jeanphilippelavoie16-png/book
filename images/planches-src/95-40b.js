// Planche 95-40b — Butter les pommes de terre, monter le composteur (chapitre 95, §5-C étape 13,
// §5-E étapes 22 à 25, §6, §9 « Le compost »).
//
// Ce que le chapitre donne, et rien d'autre :
//   buttage    : butter au fur et à mesure ; un tubercule qui affleure reçoit la lumière et
//                verdit ; zéro tubercule à la lumière, rebutter tout de suite. Trois buttages
//                dessinés pour montrer « au fur et à mesure » ; le chapitre ne donne ni hauteur de
//                butte ni écart entre les rangs : aucune cote.
//   composteur : deux bacs, pas un (mûr après environ 12 mois) ; deux tas à même le sol, cernés
//                de perches ; deux parts de brun pour une part de vert ; chaque apport frais
//                enfoui sous le brun ; une tôle de toiture lestée de deux pierres.
// Les perches sont croisées aux coins comme le bac de la 95-40a. Aucune mesure de bac dans le
// chapitre : aucune cote. Les couches de la coupe sont dessinées à deux épaisseurs de brun pour
// une de vert, ce qui est la proportion du chapitre, pas une consigne de couches.
module.exports = (h) => {
  const NOIR = '#1A1A1A';
  const blanc = (a) => a.replace('fill="none"', 'fill="#FFFFFF"');
  const poly = (pts, a) => h.chemin(pts, a, true);
  const f1 = (v) => Math.round(v * 10) / 10;
  const pt = (p) => `${f1(p[0])} ${f1(p[1])}`;
  const motif = (id) => `fill="url(#${id})" stroke="none"`;
  const HALO = 'fill="none" stroke="#FFFFFF" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"';

  const DEFS = `<defs>
<pattern id="h9540b-vert" width="13" height="11" patternUnits="userSpaceOnUse"><path d="M0.8 4.2 Q3.8 -0.2 7 3.8 M6.6 10 Q9.6 5.6 12.6 9.6" fill="none" stroke="${NOIR}" stroke-width="0.9" stroke-linecap="round"/><ellipse cx="3" cy="8.6" rx="1.5" ry="0.9" fill="${NOIR}"/><ellipse cx="10.2" cy="2.4" rx="1.3" ry="0.8" fill="${NOIR}"/></pattern>
<pattern id="h9540b-brun" width="22" height="16" patternUnits="userSpaceOnUse"><path d="M1.5 4 Q4 1.2 6.8 3.6 M12 10.5 Q14.8 7.8 17.6 10.4 M14.5 2.6 L19.5 3.4 M3 12.8 L7.6 11.6 M9 6.6 L10.6 9.4 M18.8 14 L21 12.4" fill="none" stroke="${NOIR}" stroke-width="0.6" stroke-linecap="round"/></pattern>
</defs>`;

  // ─── Feuille : un limbe en amande, en coordonnées d'écran ───
  const feuille = (bx, by, ang, len, lar, at = blanc(h.a.detail)) => {
    const a = ang * Math.PI / 180, dx = Math.cos(a), dy = -Math.sin(a);
    const tx = bx + len * dx, ty = by + len * dy, mx = (bx + tx) / 2, my = (by + ty) / 2;
    const px = -dy * lar, py = dx * lar;
    return h.path(`M${pt([bx, by])} Q${pt([mx + px, my + py])} ${pt([tx, ty])} Q${pt([mx - px, my - py])} ${pt([bx, by])} Z`, at);
  };

  // ════ Le buttage ════
  const X = 26;                                           // demi-largeur montrée : d'une allée à l'autre
  const ETAPES = {
    b1: { H: 6, F: 2.5, w: 9, tige: 22, ecart: 3, avant: null },
    b2: { H: 13, F: 6, w: 11, tige: 38, ecart: 7, avant: 'b1' },
    b3: { H: 20, F: 10, w: 13, tige: 54, ecart: 10, avant: 'b2' },
    rate: { H: 7, F: 2.5, w: 9.5, tige: 54, ecart: 10, avant: null },
  };
  const surf = (e, x) => -e.F + (e.H + e.F) * Math.exp(-Math.pow(Math.abs(x) / e.w, 3));
  // Tubercules : [x, z, rx, ry] ; le vert est celui qui sort.
  const TUB = {
    b1: [],
    b2: [[-5.5, 3, 1.8, 1.3], [5, 5, 1.6, 1.2], [-2.5, 7.5, 1.4, 1.1]],
    b3: [[-7, 2.5, 3.6, 2.5], [6.5, 5.5, 3.3, 2.4], [-3, 10.5, 2.8, 2.1], [3.5, -0.5, 2.6, 1.9]],
    rate: [[-6, 0.5, 3.4, 2.4], [9.5, 3.6, 3.4, 2.5], [-1.5, -3, 2.6, 1.9]],
  };
  const repT = (z) => {
    const s = Math.min((z.l - 6) / (2 * X), (z.h - 8) / 82);
    const ox = z.l / 2, oy = z.h - 4 - s * 24;
    return { s, q: (x, zz) => [ox + s * x, oy - s * zz] };
  };
  const butte = (id) => (z) => {
    const e = ETAPES[id], { s, q } = repT(z);
    const out = [];
    if (id === 'b1') out.push(DEFS);
    const prof = [];
    for (let x = -X; x <= X + 1e-6; x += 1) prof.push([x, surf(e, x)]);
    // La terre, coupée.
    out.push(poly([[-X, -24]].concat(prof, [[X, -24]]).map(([x, zz]) => q(x, zz)), h.a.hachure('terre', 'aucun')));
    // Le plant de semence.
    const sem = q(0, -10);
    // Les tiges, du plant de semence jusqu'en haut.
    const tiges = [-1, 0, 1].map((k) => {
      const bout = [k * e.ecart, e.tige - Math.abs(k) * 4];
      return { k, d: `M${pt(q(k * 0.8, -7.5))} Q${pt(q(k * e.ecart * 0.15, e.tige * 0.45))} ${pt(q(bout[0], bout[1]))}`, bout };
    });
    // Les stolons et les tubercules, sous la terre.
    const stol = TUB[id].map(([x, zz]) => `M${pt(q(Math.sign(x) * 0.6, Math.min(zz + 2, e.H - 4)))} Q${pt(q(x * 0.6, zz + 2.2))} ${pt(q(x, zz))}`);
    stol.forEach((d) => out.push(h.path(d, HALO), h.path(d, h.a.fin)));
    tiges.forEach(({ d }) => out.push(h.path(d, HALO)));
    tiges.forEach(({ d }) => out.push(h.path(d, h.a.detail)));
    out.push(h.ellipse(sem[0], sem[1], 4 * s, 3 * s, blanc(h.a.arete)));
    out.push(h.path(`M${pt(q(-2, -10.5))} Q${pt(q(0, -9))} ${pt(q(2, -10.8))}`, h.a.fin));
    TUB[id].forEach(([x, zz, rx, ry], i) => {
      const c = q(x, zz);
      const vert = id === 'rate' && i === 1;
      out.push(h.ellipse(c[0], c[1], rx * s, ry * s, h.a.blanc));
      out.push(h.ellipse(c[0], c[1], rx * s, ry * s, vert ? h.a.hachure('metal', 'arete') : blanc(h.a.arete)));
    });
    // La surface, trait fort, et la surface d'avant en tireté.
    out.push(h.chemin(prof.map(([x, zz]) => q(x, zz)), h.a.contour));
    if (e.avant) {
      const a = ETAPES[e.avant], pa = [];
      for (let x = -X; x <= X + 1e-6; x += 1) pa.push(q(x, surf(a, x)));
      out.push(h.chemin(pa, h.a.cache));
    } else if (id === 'b1') {
      out.push(h.chemin([q(-X, 0), q(X, 0)], h.a.cache));
    }
    // Les feuilles, au-dessus de la terre seulement.
    tiges.forEach(({ k, bout }) => {
      const n = Math.max(2, Math.round((bout[1] - e.H) / 7));
      for (let i = 1; i <= n; i++) {
        const f = i / n, zz = e.H + 2 + (bout[1] - e.H - 2) * f, xx = bout[0] * (0.25 + 0.75 * f);
        const b = q(xx, zz);
        const cote = (i + (k === 0 ? 0 : 1)) % 2 ? 1 : -1;
        const dir = k === 0 ? (cote > 0 ? 30 : 150) : (k > 0 ? 25 : 155);
        const ang = (dir + (i % 2 ? 0 : (k === 0 ? 0 : (k > 0 ? 20 : -20))));
        const L = (i === n ? 3.4 : 4.6) * s;
        const a = ang * Math.PI / 180;
        const tip = [b[0] + L * Math.cos(a), b[1] - L * Math.sin(a)];
        out.push(h.chemin([b, tip], h.a.fin));
        out.push(feuille(tip[0], tip[1], ang, 3.2 * s, 1.0 * s));
        const mid = [b[0] + 0.55 * L * Math.cos(a), b[1] - 0.55 * L * Math.sin(a)];
        out.push(feuille(mid[0], mid[1], ang + 70, 2.2 * s, 0.7 * s), feuille(mid[0], mid[1], ang - 70, 2.2 * s, 0.7 * s));
      }
      const t = q(bout[0], bout[1]);
      out.push(feuille(t[0], t[1], k === 0 ? 90 : (k > 0 ? 60 : 120), 3 * s, 1 * s));
    });
    // La terre tirée des allées vers la tige.
    if (id !== 'rate') {
      [-1, 1].forEach((sg) => {
        const x0 = sg * (X - 2.5), x1 = sg * e.w * 0.95;
        const zc = Math.max(surf(e, x0), surf(e, x1)) + 4.5;
        const a = q(x0, surf(e, x0) + 2), b = q(x1, surf(e, x1) + 2.5), c = q((x0 + x1) / 2 + sg * 3, zc);
        out.push(h.fleche(`M${pt(a)} Q${pt(c)} ${pt(b)}`));
      });
    }
    return out.join('\n');
  };

  // ════ Le composteur : projection oblique et perches en volume (comme la 95-40a) ════
  const kc = 0.6 * Math.cos(20 * Math.PI / 180), ks = 0.6 * Math.sin(20 * Math.PI / 180);   // fuite basse, comme la 95-40a : le bout d'une perche de côté tombe entre deux perches avant
  const hull = (pts) => {
    const P = pts.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
    const lo = [], up = [];
    for (const q of P) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop(); lo.push(q); }
    for (const q of P.slice().reverse()) { while (up.length >= 2 && cr(up[up.length - 2], up[up.length - 1], q) <= 0) up.pop(); up.push(q); }
    return lo.slice(0, -1).concat(up.slice(0, -1));
  };
  const cerclePerche = (p, axe, u, c, zc, r, demi) => {
    const N = 28, pts = [];
    for (let i = 0; i <= N; i++) {
      const t = (demi ? Math.PI : 2 * Math.PI) * i / N;
      const dc = r * Math.cos(t), dz = r * Math.sin(t);
      pts.push(axe === 'x' ? p(u, c + dc, zc + dz) : p(c + dc, u, zc + dz));
    }
    return pts;
  };
  const perche = (p, pe, { morceau = false } = {}) => {
    const { axe, u0, u1, c, zc, r, demi } = pe;
    const vis = axe === 'x' ? u1 : u0, cache = axe === 'x' ? u0 : u1;
    const A = cerclePerche(p, axe, vis, c, zc, r, demi), B = cerclePerche(p, axe, cache, c, zc, r, demi);
    const out = [];
    if (!morceau) {
      out.push(poly(hull(A.concat(B)), blanc(h.a.arete)));
    } else {
      const tag = new Map(); A.forEach((q) => tag.set(q.join(), 'A')); B.forEach((q) => tag.set(q.join(), 'B'));
      const hl = hull(A.concat(B));
      out.push(poly(hl, 'fill="#FFFFFF" stroke="none"'));
      hl.forEach((q, i) => {
        const n = hl[(i + 1) % hl.length];
        if (tag.get(q.join()) !== tag.get(n.join())) out.push(h.ligne(q[0], q[1], n[0], n[1], h.a.arete));
      });
    }
    out.push(poly(A, blanc(h.a.detail)));
    const ctr = axe === 'x' ? p(vis, c, zc) : p(c, vis, zc);
    out.push(h.chemin(cerclePerche(p, axe, vis, c, zc, r * 0.52, demi), h.a.fin, !demi));
    out.push(h.cercle(ctr[0], ctr[1], 0.8, h.a.plein));
    return out.join('\n');
  };
  const caisson = (L, W, r, o, rangs) => {
    const liste = [];
    for (let k = 0; k < rangs; k++) {
      const zc = k * r, demi = k === 0;
      if (k % 2 === 0) {
        liste.push({ k, axe: 'x', u0: -o, u1: L + o, c: W, zc, r, demi });
        liste.push({ k, axe: 'x', u0: -o, u1: L + o, c: 0, zc, r, demi });
      } else {
        liste.push({ k, axe: 'y', u0: -o, u1: W + o, c: 0, zc, r, demi });
        liste.push({ k, axe: 'y', u0: -o, u1: W + o, c: L, zc, r, demi });
      }
    }
    return liste;
  };
  const bouts = (liste, L, r) => liste
    .map((pe) => (pe.axe === 'y' ? { ...pe, u1: -r } : { ...pe, u0: L + r }))
    .map((pe) => {
      const mc = pe.axe === 'y' ? [pe.c, (pe.u0 + pe.u1) / 2] : [(pe.u0 + pe.u1) / 2, pe.c];
      return { pe, prof: kc * mc[0] - mc[1] + ks * pe.zc };
    })
    .sort((a, b) => a.prof - b.prof)
    .map((x) => x.pe);

  const WC = 90, RP = 7, OP = 13, NRC = 7, GAP = 14, TOLE = 15, ONDE = 8, AMP = 2;
  const ZT = NRC * RP;                                    // dessus du dernier rang : la tôle y porte
  const DY = WC + 2 * OP + GAP;                           // le deuxième bac, derrière le premier
  const PIERRES = [[12, 0.62], [WC - 12, 0.62]];            // x, fraction de y : sur les deux appuis
  // Une pierre posée : contour irrégulier, en coordonnées d'écran.
  const pierre = (c, s, graine) => {
    const pts = [];
    for (let i = 0; i < 14; i++) {
      const t = Math.PI * 2 * i / 14;
      const rr = 1 + 0.12 * Math.sin(3 * t + graine) + 0.07 * Math.cos(5 * t + 2 * graine);
      const ry = Math.sin(t) > 0 ? 8.5 : 3;                // dessus bombé, dessous aplati
      pts.push([c[0] + 14 * s * rr * Math.cos(t), c[1] - ry * 1.15 * s * rr * Math.sin(t)]);
    }
    return [
      poly(pts, blanc(h.a.arete)),
      h.path(`M${pt([c[0] - 6 * s, c[1] - 6 * s])} Q${pt([c[0] + 1 * s, c[1] - 9.5 * s])} ${pt([c[0] + 7 * s, c[1] - 5.5 * s])}`, h.a.fin),
    ].join('\n');
  };
  const repO = (z) => {
    const xmin = -OP - 10, xmax = WC + OP + 10 + (DY + WC + TOLE + 6) * kc;
    const zmin = -4 + (-OP - 10) * ks, zmax = Math.max(ZT + AMP + (DY + WC + TOLE) * ks, ZT + AMP + 12 + (DY + WC * 0.62) * ks);
    const s = Math.min((z.l - 20) / (xmax - xmin), (z.h - 8) / (zmax - zmin));
    const ox = (z.l - s * (xmax - xmin)) / 2 - s * xmin, oy = z.h - (z.h - s * (zmax - zmin)) / 2 + s * zmin;
    return { s, p: (x, y, zz) => [ox + s * (x + y * kc), oy - s * (zz + y * ks)] };
  };
  const tole = (p, y0) => {
    // Une tôle ondulée, les ondes dans le sens de la profondeur, posée sur le dernier rang.
    const zO = (x) => ZT + AMP * (1 - Math.cos(2 * Math.PI * (x + TOLE) / ONDE)) / 2;
    const av = [], out = [];
    for (let x = -TOLE; x <= WC + TOLE + 1e-6; x += 1) av.push(p(x, y0 - TOLE, zO(x)));
    const ar = p(WC + TOLE, y0 + WC + TOLE, zO(WC + TOLE)), arg = p(-TOLE, y0 + WC + TOLE, zO(-TOLE));
    out.push(poly(av.concat([ar, arg]), blanc(h.a.arete)));
    for (let x = -TOLE + ONDE / 2 + ONDE; x < WC + TOLE - ONDE / 2; x += 2 * ONDE) out.push(h.chemin([p(x, y0 - TOLE, ZT + AMP), p(x, y0 + WC + TOLE, ZT + AMP)], h.a.fin));
    out.push(h.chemin(av, h.a.arete));
    return out.join('\n');
  };

  // ════ La coupe du bac qui se remplit ════
  const COUCHES = [['brun', 0, 12], ['vert', 12, 19], ['brun', 19, 31], ['vert', 31, 38], ['brun', 38, 45]];
  const repC = (z) => {
    const larg = WC + 2 * TOLE + 8, haut = ZT + AMP + 12 + 12;
    const s = Math.min((z.l - 10) / larg, (z.h - 30) / haut);
    const ox = (z.l - larg * s) / 2 + s * (TOLE + 4), oy = z.h - (z.h - s * haut) / 2 - s * 12;
    return { s, q: (x, zz) => [ox + s * x, oy - s * zz] };
  };
  const bordC = (x, i) => 1.1 * Math.sin(x * 0.11 + i * 1.7) + 0.6 * Math.sin(x * 0.29 + i);

  return {
    ref: '95-40b',
    titre: 'Butter les pommes de terre, monter le composteur',
    desc: 'Le buttage en coupe, d’une allée à l’autre, trois fois : la terre tirée des deux allées contre la tige au premier buttage, puis rebuttée plus haut à mesure que le plant monte, la butte d’avant en tireté ; au dernier, tous les tubercules sont sous la terre. Raté : une butte trop basse laisse sortir un tubercule, qui verdit à la lumière. Le composteur : deux bacs de perches croisées aux coins, à même le sol, l’un qui se remplit, l’autre qui mûrit ; chacun couvert d’une tôle de toiture lestée de deux pierres. En coupe, le bac qui se remplit : des couches de brun deux fois plus épaisses que les couches de vert, chaque apport vert enfoui sous le brun. Encadré danger : la pomme de terre verte, et rien de carné au compost.',
    format: 'pleine',
    disposition: [['b1', 'b2', 'b3', 'rate'], ['compo', 'coupe']],
    hauteurs: [1, 1.2],
    largeurs: [[1, 1, 1, 1], [1.4, 1]],
    vues: {
      b1: {
        titre: 'Premier buttage',
        dessin: butte('b1'),
        renvois: (z) => {
          const { q } = repT(z);
          const e = ETAPES.b1;
          return [{ n: 1, rond: [14, q(0, 44)[1]], cible: q(-X + 8, surf(e, -X + 8) + 7.5), texte: 'terre tirée des allées contre la tige' }];
        },
      },
      b2: {
        titre: 'Deuxième buttage',
        dessin: butte('b2'),
        renvois: (z) => {
          const { q } = repT(z);
          return [{ n: 2, rond: [14, q(0, 50)[1]], cible: q(-9, 9), texte: 'on rebutte à mesure que ça monte' }];
        },
      },
      b3: {
        titre: 'Dernier buttage',
        dessin: butte('b3'),
        renvois: (z) => {
          const { q } = repT(z);
          return [{ n: 3, rond: [14, q(0, -16)[1]], cible: q(-7, 1), texte: 'tous les tubercules sous la terre' }];
        },
      },
      rate: {
        titre: 'Raté : trop bas',
        dessin: butte('rate'),
        renvois: (z) => {
          const { q } = repT(z);
          const t = TUB.rate[1];
          return [{ n: 4, rond: [z.l - 14, q(0, 28)[1]], cible: q(t[0] + 1, t[1] + 1.2), texte: 'tubercule à la lumière : il verdit' }];
        },
      },
      // ────────────────────────────────────────────────────────────────────────────────
      compo: {
        titre: 'Le composteur à deux bacs',
        dessin: (z) => {
          const { s, p } = repO(z);
          const out = [];
          // Le sol, coupé devant et à droite.
          const X0 = -OP - 10, X1 = WC + OP + 10, Y0 = -OP - 10, Y1 = DY + WC + OP + 10;
          out.push(poly([p(X0, Y0, 0), p(X1, Y0, 0), p(X1, Y0, -4), p(X0, Y0, -4)], h.a.hachure('terre', 'aucun')));
          out.push(poly([p(X1, Y0, 0), p(X1, Y1, 0), p(X1, Y1, -4), p(X1, Y0, -4)], h.a.hachure('terre', 'aucun')));
          out.push(h.chemin([p(X0, Y0, 0), p(X1, Y0, 0), p(X1, Y1, 0)], h.a.arete));
          // Le bac du fond d'abord (celui qui mûrit), puis celui de devant.
          [DY, 0].forEach((y0, j) => {
            const pb = (x, y, zz) => p(x, y + y0, zz);
            const liste = caisson(WC, WC, RP, OP, NRC);
            liste.forEach((pe) => out.push(perche(pb, pe)));
            bouts(liste, WC, RP).forEach((pe) => out.push(perche(pb, pe, { morceau: true })));
            out.push(tole(p, y0));
            PIERRES.forEach(([x, fy], i) => out.push(pierre(p(x, y0 + WC * fy, ZT + AMP), s, i * 2.3 + j)));
          });
          return out.join('\n');
        },
        renvois: (z) => {
          const { s, p } = repO(z);
          const d1 = p(WC + OP, 0, 3 * RP), d2 = p(WC + OP, DY, 3 * RP);
          const t = p(WC * 0.45, -TOLE, ZT + AMP), pr = p(WC - 10, WC * 0.6, ZT + AMP + 6);
          return [
            { n: 5, rond: [z.l - 14, d1[1] + 4], cible: [d1[0] + 2, d1[1]], texte: 'le bac qui se remplit cette année' },
            { n: 6, rond: [z.l - 14, d2[1] - 6], cible: [d2[0] + 2, d2[1]], texte: 'le bac qui mûrit, environ un an' },
            { n: 7, rond: [14, t[1] - 4], cible: [t[0], t[1] + 1], texte: 'tôle de toiture sur chaque bac' },
            { n: 8, rond: [pr[0] + 30, pr[1] - 28], cible: pr, texte: 'deux pierres pour la lester' },
          ];
        },
      },
      // ────────────────────────────────────────────────────────────────────────────────
      coupe: {
        titre: 'En coupe, le bac qui se remplit',
        dessin: (z) => {
          const { s, q } = repC(z);
          const out = [];
          // Le sol, sous le bac et autour.
          out.push(h.rect(q(-TOLE - 4, 0)[0], q(0, 0)[1], s * (WC + 2 * TOLE + 8), s * 11, h.a.hachure('terre', 'aucun')));
          // Le mur du fond, derrière : ses perches en long, qui dépassent aux deux coins.
          // Seuls dépassent, de part et d'autre, leurs bouts : un tronçon arrondi derrière chaque
          // jonction de deux perches coupées.
          for (let k = 0; k < NRC; k += 2) {
            const zb = k === 0 ? 0 : k * RP - RP, zh = k * RP + RP;
            [[0, -OP], [WC, WC + OP]].forEach(([xi, xe]) => {
              const sg = Math.sign(xe - xi), a = q(xi, zb), b = q(xe - sg * RP * 0.5, zb), c = q(xe - sg * RP * 0.5, zh), d = q(xi, zh);
              const m = q(xe + sg * RP * 0.35, (zb + zh) / 2);
              out.push(h.path(`M${pt(d)} L${pt(c)} Q${pt([m[0], c[1]])} ${pt(m)} Q${pt([m[0], b[1]])} ${pt(b)} L${pt(a)}`, blanc(h.a.arete)));
            });
          }
          // Les couches : brun, vert enfoui, brun, vert enfoui, brun par-dessus.
          COUCHES.forEach(([mat, z0, z1], i) => {
            const bas = [], haut = [];
            for (let x = RP; x <= WC - RP + 1e-6; x += 2) {
              bas.push(q(x, i === 0 ? 0 : z0 + bordC(x, i)));
              haut.push(q(x, i === COUCHES.length - 1 ? z1 + 0.6 * Math.sin(x * 0.2) : z1 + bordC(x, i + 1)));
            }
            const forme = bas.concat(haut.reverse());
            out.push(poly(forme, h.a.blanc));
            out.push(poly(forme, mat === 'brun' ? motif('h9540b-brun') : motif('h9540b-vert')));
            out.push(h.chemin(haut.slice().reverse(), i === COUCHES.length - 1 ? h.a.arete : h.a.detail));
            if (i === 0) out.push(h.chemin(bas, h.a.detail));
          });
          // Les perches des côtés, coupées : quatre de chaque bord, jointives.
          [0, WC].forEach((x) => { for (let k = 1; k < NRC; k += 2) {
            const c = q(x, k * RP);
            out.push(h.cercle(c[0], c[1], RP * s, h.a.blanc), h.cercle(c[0], c[1], RP * s, h.a.hachure('bois', 'arete')));
          } });
          // La tôle coupée en travers des ondes, sur le dernier rang, et ses pierres derrière.
          const on = [];
          for (let x = -TOLE; x <= WC + TOLE + 1e-6; x += 0.5) on.push(q(x, ZT + AMP * (1 - Math.cos(2 * Math.PI * (x + TOLE) / ONDE)) / 2));
          out.push(h.chemin(on, h.a.contour));
          PIERRES.forEach(([x], i) => out.push(pierre(q(x, ZT + AMP), s, i * 2.3)));
          out.push(h.chemin([q(-TOLE - 4, 0), q(-OP, 0)], h.a.contour), h.chemin([q(WC + OP, 0), q(WC + TOLE + 4, 0)], h.a.contour));
          return out.join('\n');
        },
        renvois: (z) => {
          const { q } = repC(z);
          return [
            { n: 9, rond: [z.l - 12, q(0, 24)[1]], cible: q(WC * 0.72, 23), texte: 'brun, deux parts : feuilles, papier' },
            { n: 10, rond: [z.l - 12, q(0, 43)[1] - 20], cible: q(WC * 0.62, 33), texte: 'vert, une part, enfoui sous le brun' },
            { n: 11, rond: [12, q(0, 8)[1]], cible: q(-TOLE + 6, -5), texte: 'à même le sol' },
          ];
        },
      },
    },
    danger: 'Une pomme de terre verte ou amère ne se rattrape pas à la cuisson : la lumière fait le poison, le vert n’en est que le témoin. Rien qui sente la viande, le gras ou le poisson au compost : un tas ouvert en forêt boréale nourrit l’ours, et un ours nourri ne reprend pas sa crainte.',
  };
};
