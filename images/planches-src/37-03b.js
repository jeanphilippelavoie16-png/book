// Planche 37-03b — Le bain de vapeur sous bâche : les pierres (chapitre 37, section 9, étapes 9 à 12).
// Chauffer au cœur du feu, sortir à la pince de bâtons verts, brosser dehors à la branche de
// sapin sur la pelle, porter et charger. Aucune cote : le chapitre n'en donne pas.
module.exports = (h) => {
  const A = h.a, RAD = Math.PI / 180;
  const blanc = at => at.replace('fill="none"', 'fill="#ffffff"');
  const f = p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`;
  const lisse = (pts, ferme = false) => {
    const n = pts.length; let d = `M${f(pts[0])}`;
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = ferme ? pts[(i - 1 + n) % n] : pts[Math.max(0, i - 1)];
      const p1 = pts[i], p2 = pts[(i + 1) % n];
      const p3 = ferme ? pts[(i + 2) % n] : pts[Math.min(n - 1, i + 2)];
      d += ` C${f([p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6])} ${f([p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6])} ${f(p2)}`;
    }
    return d + (ferme ? ' Z' : '');
  };
  const caillou = (x, y, rx, ry, g = 1, rot = 0) => {
    const pts = [];
    for (let i = 0; i < 8; i++) {
      const t = (i / 8) * 2 * Math.PI + rot, k = 0.88 + 0.16 * Math.abs(Math.sin(g * 12.9898 + i * 78.233));
      pts.push([x + rx * k * Math.cos(t), y + ry * k * Math.sin(t)]);
    }
    return lisse(pts, true);
  };
  const pierre = (x, y, rx, ry, g, rot = 0) => [h.path(caillou(x, y, rx, ry, g, rot), A.blanc),
    h.path(caillou(x, y, rx, ry, g, rot), A.hachure('pierre', 'arete'))].join('\n');
  // une bûche vue par le bout (coupée)
  const bout = (x, y, r) => [h.cercle(x, y, r, A.blanc), h.cercle(x, y, r, A.hachure('bois', 'arete')), h.cercle(x, y, r * 0.25, A.fin)].join('\n');
  // une bûche vue de long, de p à q, rayon r
  const long = (p, q, r) => {
    const d = [q[0] - p[0], q[1] - p[1]], L = Math.hypot(...d), u = [d[0] / L, d[1] / L], n = [-u[1] * r, u[0] * r];
    const poly = [[p[0] + n[0], p[1] + n[1]], [q[0] + n[0], q[1] + n[1]], [q[0] - n[0], q[1] - n[1]], [p[0] - n[0], p[1] - n[1]]];
    const fil = k => `M${f([p[0] + n[0] * k + u[0] * 6, p[1] + n[1] * k + u[1] * 6])} L${f([q[0] + n[0] * k - u[0] * 6, q[1] + n[1] * k - u[1] * 6])}`;
    return [h.chemin(poly, blanc(A.arete), true), h.path(`${fil(0.45)} ${fil(-0.3)}`, A.fin)].join('\n');
  };
  // une flamme, base au sol en (x, yb), sommet à ht au-dessus
  const flamme = (x, yb, ht, w) => h.path(`M${f([x - w, yb])} C${f([x - w - 2, yb - ht * 0.5])} ${f([x - 2, yb - ht * 0.7])} ${f([x, yb - ht])} C${f([x + 3, yb - ht * 0.66])} ${f([x + w + 2, yb - ht * 0.45])} ${f([x + w, yb])}`, A.arete);
  // des braises : des morceaux irréguliers, pleins ou au trait
  const braises = (x1, x2, y, graine = 1) => {
    const out = [];
    for (let i = 0, x = x1; x < x2; i++) {
      const w = 5 + 4 * Math.abs(Math.sin(graine * 3.1 + i * 1.7)), ht = 3 + 2.5 * Math.abs(Math.cos(graine + i * 2.3));
      const d = `M${f([x, y])} L${f([x + 1, y - ht])} L${f([x + w * 0.6, y - ht - 1])} L${f([x + w, y - ht * 0.4])} L${f([x + w, y])} Z`;
      out.push(h.path(d, i % 3 === 0 ? A.plein : blanc(A.detail)));
      x += w + 1.5;
    }
    return out.join('\n');
  };
  const neige = (z, G, ep = 12) => [h.rect(0, G, z.l, ep, A.hachure('neige', 'aucun')), h.ligne(0, G, z.l, G, A.arete)].join('\n');
  const sol = (z, G) => [h.rect(0, G, z.l, 12, A.hachure('terre', 'aucun')), h.ligne(0, G, z.l, G, A.arete)].join('\n');

  // ── 1. chauffer : le feu en coupe ──────────────────────────────────────────────────
  const geoFeu = z => {
    const G = z.h - 24, cx = z.l / 2, rb = 11;
    const lit = [-2, -1, 0, 1, 2].map(k => [cx + k * 2 * rb + k * 1, G - rb]);
    const y0 = G - 2 * rb;
    const pierres = [[-31, 12, 16, 12, 1], [0, 12, 16, 12.5, 2], [31, 12, 16, 12, 3], [-16, 34, 15.5, 11.5, 4], [16, 34, 15.5, 11.5, 5], [0, 55, 14, 11, 6]]
      .map(([dx, dy, rx, ry, g]) => [cx + dx, y0 - dy, rx, ry, g]);
    return { G, cx, rb, lit, pierres, y0 };
  };
  const feu = z => {
    const { G, cx, rb, lit, pierres, y0 } = geoFeu(z);
    const out = [sol(z, G)];
    const som = [cx, y0 - 88];
    // le bois par-dessus, appuyé sur le tas : au fond d'abord, puis dans le plan de coupe
    out.push(long([cx - 70, G - 3], [cx + 4, som[1] + 6], 6), long([cx + 70, G - 3], [cx - 4, som[1] + 6], 6));
    for (const [x, ht, w] of [[cx - 26, 46, 7], [cx + 2, 60, 8], [cx + 28, 44, 7]]) out.push(flamme(x, y0 - 62, ht, w));
    for (const [x, y, rx, ry, g] of pierres) out.push(pierre(x, y, rx, ry, g, g * 0.6));
    out.push(long([cx - 88, G - 5], [cx - 12, som[1] + 20], 7), long([cx + 88, G - 5], [cx + 12, som[1] + 20], 7));
    for (const [x, y] of lit) out.push(bout(x, y, rb));
    return out.join('\n');
  };
  const feuRenvois = z => {
    const { G, cx, rb, lit, pierres, y0 } = geoFeu(z);
    return [
      { n: 1, rond: [cx - 118, G - 14], cible: [lit[0][0] - 3, lit[0][1] + 3], texte: 'lit de bûches' },
      { n: 2, rond: [cx + 104, y0 - 26], cible: [pierres[2][0] + 8, pierres[2][1] - 2], texte: 'pierres éprouvées, empilées' },
      { n: 3, rond: [cx - 108, y0 - 70], cible: [cx - 52, G - 45], texte: 'recouvertes de bois' },
    ];
  };

  // ── 2. sortir : la pince de deux bâtons verts ──────────────────────────────────────
  const geoPince = z => {
    const G = z.h - 22, cx = z.l / 2 + 4, S = [cx, G - 74], rs = [20, 15];
    const ang = 52, L = 138, lon = [-1, 1].map(s => {
      const u = [s * Math.sin(ang * RAD), -Math.cos(ang * RAD)];
      const bout = [S[0] + s * (rs[0] - 1), S[1] + 1];
      return { s, u, bout, haut: [bout[0] + u[0] * L, bout[1] + u[1] * L] };
    });
    return { G, cx, S, rs, ang, L, lon };
  };
  const pince = z => {
    const { G, cx, S, rs, ang, L, lon } = geoPince(z);
    const out = [sol(z, G)];
    out.push(braises(cx - 120, cx + 120, G, 2));
    out.push(pierre(cx - 70, G - 11, 17, 11, 7, 0.3), pierre(cx + 74, G - 10, 15, 10, 8, 1.2));
    // la pierre prise entre les deux bouts
    out.push(pierre(S[0], S[1], rs[0], rs[1], 3, 0.4));
    // les bâtons : écorce au trait, le bout taillé à plat du côté de la pierre
    for (const { s, u, bout, haut } of lon) {
      const r = 4.2, n = [-u[1], u[0]];               // n : la normale ; côté pierre = -s
      const ext = k => [bout[0] + n[0] * k, bout[1] + n[1] * k];
      const cote = s > 0 ? 1 : -1;
      const poly = [
        [haut[0] + n[0] * r, haut[1] + n[1] * r], [haut[0] - n[0] * r, haut[1] - n[1] * r],
      ];
      // le côté extérieur file jusqu'au bout ; le côté pierre est taillé à plat sur 22
      const pExt = [bout[0] + n[0] * r * cote, bout[1] + n[1] * r * cote];
      const pInt = [bout[0] - n[0] * r * cote + u[0] * 22, bout[1] - n[1] * r * cote + u[1] * 22];
      const pPlat = [bout[0] - n[0] * 0.6 * cote, bout[1] - n[1] * 0.6 * cote];
      const hExt = [haut[0] + n[0] * r * cote, haut[1] + n[1] * r * cote], hInt = [haut[0] - n[0] * r * cote, haut[1] - n[1] * r * cote];
      out.push(h.chemin([hExt, pExt, pPlat, pInt, hInt], blanc(A.arete), true));
      out.push(h.path(`M${f([haut[0] + n[0] * r * 0.3 * cote - u[0] * 4, haut[1] + n[1] * r * 0.3 * cote - u[1] * 4])} L${f([bout[0] + n[0] * r * 0.3 * cote + u[0] * 30, bout[1] + n[1] * r * 0.3 * cote + u[1] * 30])}`, A.fin));
      out.push(h.ligne(...pInt, ...[pInt[0] + n[0] * 0.8 * cote, pInt[1] + n[1] * 0.8 * cote], A.fin));
    }
    // les mains, une sur chaque bâton, aux deux tiers : le poing fermé en travers du bâton, les
    // doigts qui s'enroulent vers l'extérieur, l'avant-bras qui remonte vers le corps, hors de la vue
    for (const { s, u, bout } of lon) {
      const g = [bout[0] + u[0] * L * 0.7, bout[1] + u[1] * L * 0.7];
      // modèle s11 (poing fermé) : le bâton (8,4) dans le poing (25 px), l'avant-bras qui sort du cadre
      out.push(String(h.formes.modele('s11', { x: g[0], y: g[1], ancre: [68, 42], miroir: s > 0, angle: s * ang + (s < 0 ? -90 : 90), echelle: 0.36,
        masquer: [[0, 150, 140, 175]], bras: { a: [21.8, 150], a0: [20.8, 135], b: [76.3, 150], b0: [76.2, 135], bord: z } })));
    }
    // on serre, on lève
    out.push(h.fleche(`M${f([S[0], S[1] - rs[1] - 8])} L${f([S[0], S[1] - rs[1] - 44])}`, A.arete));
    return out.join('\n');
  };
  const pinceRenvois = z => {
    const { S, lon } = geoPince(z);
    const d = lon[1], p = [d.bout[0] + d.u[0] * 50, d.bout[1] + d.u[1] * 50];
    return [{ n: 4, rond: [p[0] + 40, p[1] + 4], cible: p, texte: 'deux bâtons verts en pince' }];
  };

  // ── 3. brosser : sur la pelle, à la branche de sapin, dehors ───────────────────────
  const geoBrosse = z => {
    const G = z.h - 24, cx = z.l / 2 - 10;
    const pointe = [cx - 92, G - 5], talon = [cx + 44, G - 5];
    const P = [cx - 26, G - 23], rp = [22, 14];
    const spray = [P[0] + 2, P[1] - rp[1] - 4];
    const main = [cx - 44, G - 196];
    return { G, cx, pointe, talon, P, rp, spray, main };
  };
  const brosser = z => {
    const { G, cx, pointe, talon, P, rp, spray, main } = geoBrosse(z);
    const out = [neige(z, G)];
    // la pelle : la lame de profil, la douille et le manche qui montent à droite
    const lame = `M${f(pointe)} Q${f([pointe[0] + 4, pointe[1] + 4])} ${f([pointe[0] + 14, pointe[1] + 4])} L${f([talon[0] - 6, talon[1] + 4])} Q${f([talon[0] + 2, talon[1] + 3])} ${f([talon[0] + 2, talon[1] - 10])}`;
    out.push(h.path(lame, A.contour));
    out.push(h.path(`M${f([pointe[0] + 14, pointe[1] - 1])} L${f([talon[0] - 8, talon[1] - 4])}`, A.fin));
    // le bout du manche appuyé sur une bûche couchée
    const bu = [z.l - 34, G - 13];
    const m1 = [talon[0] + 2, talon[1] - 8], m2 = [z.l - 14, G - 34];
    out.push(h.cercle(bu[0], bu[1], 13, A.blanc), h.cercle(bu[0], bu[1], 13, A.hachure('bois', 'arete')), h.cercle(bu[0], bu[1], 4, A.fin));
    out.push(long(m1, m2, 5));
    // la pierre, et ce qui colle dessus : braises, charbon, cendre
    out.push(pierre(P[0], P[1] + 1, rp[0], rp[1], 5, 0.2));
    for (const [dx, dy, s] of [[-10, -12, 1], [3, -14, 0.8], [12, -10, 1.1], [-17, -4, 0.8]])
      out.push(h.path(`M${f([P[0] + dx, P[1] + dy])} l${2.5 * s},-${2.4 * s} l${3 * s},${0.8 * s} l-${0.6 * s},${2.6 * s} Z`, A.plein));
    // ce qui tombe : par-dessus la pointe, sur la neige
    for (const [x, y, s] of [[pointe[0] - 8, G - 30, 1], [pointe[0] - 16, G - 20, 0.8], [pointe[0] - 6, G - 13, 1.1], [pointe[0] - 22, G - 8, 0.9]]) {
      out.push(h.path(`M${f([x, y])} l${2.5 * s},-${2.4 * s} l${3 * s},${0.8 * s} l-${0.6 * s},${2.6 * s} Z`, A.plein));
      out.push(h.path(`M${f([x + 1, y - 5])} l0,-7`, A.fin));
    }
    out.push(braises(pointe[0] - 34, pointe[0] + 4, G, 5));
    // la branche de sapin : la tige dans la main, les rameaux qui balaient la pierre
    const tige = [[main[0] - 3, main[1] - 26], main, [spray[0] - 8, spray[1] - 30], [spray[0] - 14, spray[1] - 4]];
    out.push(h.path(lisse(tige), A.arete));
    const rameaux = [];
    const tg = (t) => { // un point sur la tige, de la main (0) au bout (1)
      const a = [main[0], main[1]], b = [spray[0] - 14, spray[1] - 4];
      return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
    };
    for (const [t, dir, lg] of [[0.45, -1, 26], [0.55, 1, 30], [0.66, -1, 34], [0.76, 1, 36], [0.86, -1, 36], [0.95, 1, 34], [1.0, -0.2, 34]]) {
      const b0 = tg(t), a = (dir * 55 + 180 - 16) * RAD;
      const e = [b0[0] + Math.sin(a) * lg * -1, b0[1] + Math.abs(Math.cos(a)) * lg * 0.55 + lg * 0.45];
      const bout = [b0[0] + dir * lg * 0.62 + (dir === -0.2 ? 18 : 0), b0[1] + lg * 0.78];
      let d = `M${f(b0)} Q${f([b0[0] + dir * lg * 0.2, b0[1] + lg * 0.5])} ${f(bout)}`;
      rameaux.push(h.path(d, A.detail));
      let ai = '';
      for (let k = 1; k <= 6; k++) {
        const u = k / 7, p = [b0[0] + (bout[0] - b0[0]) * u, b0[1] + (bout[1] - b0[1]) * u];
        const v = [bout[0] - b0[0], bout[1] - b0[1]], L = Math.hypot(...v), w = [v[0] / L, v[1] / L], nn = [-w[1], w[0]];
        ai += `M${f(p)} L${f([p[0] + nn[0] * 4 + w[0] * 2, p[1] + nn[1] * 4 + w[1] * 2])} M${f(p)} L${f([p[0] - nn[0] * 4 + w[0] * 2, p[1] - nn[1] * 4 + w[1] * 2])} `;
      }
      rameaux.push(h.path(ai, A.fin));
    }
    out.push(...rameaux);
    // modèle s11 (poing fermé) en miroir : la branche (6) debout dans le poing, l'avant-bras vers la gauche
    out.push(String(h.formes.modele('s11', { x: main[0], y: main[1], ancre: [68, 42], miroir: true, angle: 82, echelle: 0.3,
      masquer: [[0, 150, 140, 175]], bras: { a: [21.8, 150], a0: [20.8, 135], b: [76.3, 150], b0: [76.2, 135], bord: z } })));
    // deux ou trois coups, vers la pointe
    for (const dy of [-34, -20]) out.push(h.fleche(`M${f([spray[0] + 62, spray[1] + dy])} L${f([spray[0] + 34, spray[1] + dy + 4])}`, A.arete));
    return out.join('\n');
  };
  const brosserRenvois = z => {
    const { G, cx, pointe, talon, P, spray, main } = geoBrosse(z);
    return [
      { n: 5, rond: [main[0] + 64, main[1] + 26], cible: [main[0] + 3, main[1] + 50], texte: 'branche verte de sapin' },
      { n: 6, rond: [pointe[0] - 4, G - 96], cible: [pointe[0] - 10, G - 30], texte: 'braises et charbon, dehors' },
      { n: 7, rond: [talon[0] + 20, talon[1] - 60], cible: [talon[0] - 20, talon[1] + 3], texte: 'pierre sur la pelle' },
    ];
  };

  // ── 4. porter et charger : du feu au bac, en plan ──────────────────────────────────
  const geoSite = z => {
    const cy = z.h / 2 + 2, R = 52, L = [z.l - R - 30, cy], F = [48, cy];
    return { cy, R, L, F };
  };
  const site = z => {
    const { cy, R, L, F } = geoSite(z);
    const Q = (r, a) => [L[0] + r * Math.cos(a * RAD), L[1] - r * Math.sin(a * RAD)];
    const out = [];
    // l'abri : neige contre le bas, paroi, porte à l'ouest face au feu
    const d1 = 160, d2 = 200, EP = 6;
    const anneau = (r1, r2, a1, a2, n = 70) => [...Array.from({ length: n + 1 }, (_, i) => Q(r1, a1 + (a2 - a1) * i / n)), ...Array.from({ length: n + 1 }, (_, i) => Q(r2, a2 + (a1 - a2) * i / n))];
    out.push(h.chemin(anneau(R + EP, R + EP + 20, d2 + 8, d1 + 352), A.hachure('neige', 'aucun'), true));
    const par = anneau(R, R + EP, d2, d1 + 360);
    out.push(h.chemin(par, A.blanc, true), h.chemin(par, A.hachure('isolant', 'arete'), true));
    out.push(h.path(`M${f(Q(R + EP, d1))} Q${f(Q(R + EP + 10, 180))} ${f(Q(R + EP, d2))}`, A.arete));
    // dedans : les billes, le bac
    for (const s of [-1, 1]) out.push(h.rect(L[0] + s * 0.47 * R - 5, cy - 0.6 * R, 10, 1.2 * R, blanc(A.arete)));
    out.push(h.cercle(L[0], cy, 0.18 * R, blanc(A.contour)));
    // le feu tombé en braises, les pierres dedans
    const bord = Array.from({ length: 12 }, (_, i) => { const a = i / 12 * 2 * Math.PI; const k = 0.85 + 0.15 * Math.abs(Math.sin(i * 2.1)); return [F[0] + 33 * k * Math.cos(a), F[1] + 30 * k * Math.sin(a)]; });
    out.push(h.path(lisse(bord, true), A.detail));
    const pts = [];
    for (let i = 0; i < 46; i++) { const a = i * 2.4, r = 5 + (i * 37 % 25); pts.push([F[0] + r * Math.cos(a), F[1] + r * 0.9 * Math.sin(a)]); }
    for (const [i, p] of pts.entries()) out.push(h.path(`M${f(p)} l2.4,-2 l2.6,1 l-0.8,2.4 Z`, i % 3 ? blanc(A.fin) : A.plein));
    for (const [dx, dy, g] of [[-14, -10, 1], [10, -12, 2], [-4, 10, 3], [18, 8, 4]]) out.push(pierre(F[0] + dx, F[1] + dy, 9, 7, g, g));
    // le chemin de la pierre : du feu à la porte, puis au bac
    out.push(h.fleche(`M${f([F[0] + 40, cy])} L${f([L[0] - 0.18 * R - 6, cy])}`, A.arete));
    return out.join('\n');
  };
  const siteRenvois = z => {
    const { cy, R, L, F } = geoSite(z);
    return [
      { n: 8, rond: [F[0] - 20, cy + 62], cible: [F[0] - 10, cy + 28], texte: 'feu des pierres, dehors' },
      { n: 9, rond: [(F[0] + L[0] - R) / 2 + 10, cy - 48], cible: [(F[0] + 40 + L[0] - R - 6) / 2, cy], texte: 'brosser, puis porter' },
      { n: 10, rond: [L[0] + 12, cy + R + 22 > z.h - 10 ? z.h - 10 : cy + R + 22], cible: [L[0] + 4, cy + 0.18 * R - 1], texte: 'charger le bac, fermer' },
    ];
  };

  return {
    ref: '37-03b',
    titre: 'Le bain de vapeur sous bâche : les pierres',
    desc: 'Quatre vues et un encadré danger (pas une braise sous la bâche). En haut à gauche, le feu en coupe : un lit de bûches couchées, les pierres empilées dessus, du bois appuyé par-dessus et le feu. En haut à droite, une pierre sortie de la braise entre deux bâtons verts taillés à plat au bout, un dans chaque main, et la flèche qui la lève. En bas à gauche, la pierre posée sur la pelle ; une main tient une branche verte de sapin dont les rameaux balaient la pierre vers la pointe de la pelle, et les braises et le charbon tombent sur la neige. En bas à droite, en plan : le feu tombé en braises, dehors, et le chemin de la pierre jusqu’à la porte de l’abri et au bac.',
    format: 'pleine',
    disposition: [['feu', 'pince'], ['brosser', 'site']],
    vues: {
      feu: { titre: 'Chauffer, au cœur du feu', dessin: feu, renvois: feuRenvois },
      pince: { titre: 'Sortir, à la pince de bâtons', dessin: pince, renvois: pinceRenvois },
      brosser: { titre: 'Brosser chaque pierre, dehors', dessin: brosser, renvois: brosserRenvois },
      site: { titre: 'Porter et charger, en plan', dessin: site, renvois: siteRenvois },
    },
    danger: 'Pas une braise sous la bâche. Les pierres seules ne font presque pas de monoxyde : ce sont les braises et le charbon collés dessus qui en font, et l’eau jetée dessus ne le chasse pas tant qu’ils sont là.',
  };
};
