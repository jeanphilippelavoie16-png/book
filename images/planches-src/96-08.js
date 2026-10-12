// Planche 96-08 — Inoculer les pois aux nodules de vesce (chapitre 96, étape 27 et notes 5 et 6 ;
// variante « Les pois du garde-manger et les nodules du bord du chemin »).
// Ce que dit le chapitre, et rien d'autre : au semis, déterrer quelques plants de vesce bien
// verts, rincer les racines, prendre les nodules roses, les écraser dans un peu d'eau et y rouler
// la semence juste avant de semer. Les nodules : de petits renflements allongés en doigt, souvent
// ramifiés, collés aux racines ; ils ne partent pas au rinçage ; on les coupe au couteau, en
// travers, par le milieu. Rose ou rouge dedans : la bactérie travaille ; beige : elle est là mais
// ne fixe pas ; vert dans tout le nodule : il meurt. Les pois : entiers, ni fendus ni décortiqués.
// Vues : 1 la vesce déterrée avec sa motte ; 2 le rinçage au seau ; 3 le couteau posé en travers
// d'un nodule, au milieu (vue en perspective cavalière, le nodule pointe vers l'œil) ; 4 trois
// nodules coupés, la face de coupe vers l'œil — les couleurs ne se dessinent pas, la légende les
// dit ; 5 écraser au pilon dans le fond du bol ; 6 les pois roulés dans ce jus.
// Aucune cote : le chapitre ne donne aucune mesure pour ces gestes.
module.exports = (h) => {
  const F = h.formes, A = h.a;
  const NOIR = '#1A1A1A', RAD = Math.PI / 180;
  const r1 = v => Math.round(v * 10) / 10;
  const tr = (ep, fill = 'none') => `fill="${fill}" stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="round"`;
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const mul = (a, k) => [a[0] * k, a[1] * k];
  const uni = a => { const l = Math.hypot(a[0], a[1]) || 1; return [a[0] / l, a[1] / l]; };
  const perp = u => [-u[1], u[0]];
  const tourne = (a, deg) => { const c = Math.cos(deg * RAD), s = Math.sin(deg * RAD); return [a[0] * c - a[1] * s, a[0] * s + a[1] * c]; };
  const pt = p => `${r1(p[0])} ${r1(p[1])}`;

  // Catmull-Rom : une suite de points devient une courbe qui passe par chacun.
  const lisse = (pts, ferme = false) => {
    const n = pts.length, get = i => (ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))]);
    let d = `M ${pt(pts[0])}`;
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = get(i - 1), p1 = get(i), p2 = get(i + 1), p3 = get(i + 2);
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C ${pt(c1)} ${pt(c2)} ${pt(p2)}`;
    }
    return d + (ferme ? ' Z' : '');
  };
  // Un trait noir sur un halo blanc : une racine qui reste lisible sur une hachure.
  const halo = (d, ep = 1.4) => h.path(d, `fill="none" stroke="#fff" stroke-width="${ep + 3}" stroke-linecap="round" stroke-linejoin="round"`) + '\n' + h.path(d, tr(ep));
  // Plusieurs formes fermées d'un seul tenant : trait double, puis aplat blanc → la silhouette.
  const union = (ds, ep = 2.4) => ds.map(d => h.path(d, tr(ep))).join('\n') + '\n' + ds.map(d => h.path(d, 'fill="#fff" stroke="none"')).join('\n');
  // Un doigt arrondi (px) de c0 (base, rayon r0) à c1 (bout, rayon r1). base : fermer la base.
  const capsule = (c0, c1, r0, r1_, base = true) => {
    const u = uni(sub(c1, c0)), n = perp(u);
    const a0 = add(c0, mul(n, r0)), a1 = add(c1, mul(n, r1_)), b1 = sub(c1, mul(n, r1_)), b0 = sub(c0, mul(n, r0));
    return `M ${pt(a0)} L ${pt(a1)} A ${r1(r1_)} ${r1(r1_)} 0 0 0 ${pt(b1)} L ${pt(b0)}` + (base ? ` A ${r1(r0)} ${r1(r0)} 0 0 0 ${pt(a0)} Z` : '');
  };
  const doubleFleche = (d) => `<path d="${d}" ${A.arete} marker-start="url(#fl)" marker-end="url(#fl)"/>`;

  // ── La vesce (mm) : tiges grimpantes, feuilles à folioles par paires, vrille au bout ────────
  // Une vrille : une courte hampe au bout de la feuille, puis deux ou trois brins en spirale lâche.
  // acc reçoit le milieu de chaque brin (pour qu'un renvoi tombe sur une vrille).
  const brin = (P, S, ang, L, sens, acc) => {
    const pts = [S]; let p = S, a = ang;
    const n = 12, pas = L / n;
    for (let i = 0; i < n; i++) { a += sens * (4 + i * 2.4); p = add(p, [Math.cos(a * RAD) * pas, Math.sin(a * RAD) * pas]); pts.push(p); }
    if (acc) acc.push(P(...pts[5]));
    return h.path(lisse(pts.map(q => P(...q))), tr(1));
  };
  const vrille = (P, S, ang, L, nb, acc) => {
    const h0 = L * 0.22, F0 = add(S, [Math.cos(ang * RAD) * h0, Math.sin(ang * RAD) * h0]);
    const out = [h.path(`M ${pt(P(...S))} L ${pt(P(...F0))}`, tr(0.9))];
    const ecarts = nb === 3 ? [-40, 0, 40] : [-32, 32];
    ecarts.forEach((e, j) => out.push(brin(P, F0, ang + e, L * (0.78 - 0.06 * j), e < 0 ? -1 : 1, acc)));
    return out.join('\n');
  };
  // Une feuille : le pétiole, des folioles étroites par paires, la vrille ramifiée au bout (≈ L/3).
  const feuille = (P, b, ang, L, n, cote, acc, nb = 3) => {
    const u = [Math.cos(ang * RAD), Math.sin(ang * RAD)], nn = perp(u);
    const f = t => add(add(b, mul(u, L * t)), mul(nn, cote * L * 0.05 * Math.sin(Math.PI * t)));
    const out = [h.path(lisse([0, 0.25, 0.5, 0.75, 1].map(t => P(...f(t)))), tr(0.9))];
    // huit à douze paires de petites folioles étroites, presque à angle droit, serrées en échelle
    const lf = L * 0.17, wf = lf * 0.2;
    for (let i = 0; i < n; i++) {
      const t = 0.1 + 0.84 * i / (n - 1), B = f(t), tg = uni(sub(f(t + 0.01), f(t - 0.01)));
      const l = lf * (1 - 0.3 * Math.abs(i - (n - 1) * 0.35) / n);
      for (const sg of [1, -1]) {
        const dir = tourne(tg, sg * 58), T = add(B, mul(dir, l)), M = mul(add(B, T), 0.5), q = perp(dir);
        out.push(h.path(`M ${pt(P(...B))} Q ${pt(P(...add(M, mul(q, wf))))} ${pt(P(...T))} Q ${pt(P(...sub(M, mul(q, wf))))} ${pt(P(...B))} Z`, tr(0.6, '#fff')));
      }
    }
    const fin = f(1), a = Math.atan2(u[1], u[0]) / RAD;
    out.push(vrille(P, fin, a, L * 0.42, nb, acc));
    return out.join('\n');
  };
  // Les tiges, relatives au collet ; quatre feuilles en tout, une ou deux par tige.
  const TIGES = [
    [[0, 0], [-6, -40], [-18, -85], [-36, -130], [-60, -170], [-82, -196]],
    [[0, 0], [4, -50], [8, -100], [6, -150], [-2, -196], [-10, -236]],
    [[0, 0], [10, -38], [28, -80], [52, -118], [82, -150], [112, -168]],
  ];
  const NOEUDS = [[2, 5], [4], [3]];
  const plante = (P, C, L = 150, acc) => {
    const out = [];
    TIGES.forEach((tige, k) => {
      const pts = tige.map(p => add(C, p));
      out.push(h.path(lisse(pts.map(p => P(...p))), A.arete));
      for (const i of NOEUDS[k]) {
        const tg = uni(sub(pts[Math.min(i + 1, pts.length - 1)], pts[i - 1]));
        const cote = (i + k) % 2 ? 1 : -1;
        const a = Math.atan2(tg[1], tg[0]) / RAD + cote * 50;
        out.push(feuille(P, pts[i], a, L, 8, -cote, acc, (i + k) % 2 ? 3 : 2));
      }
    });
    return out.join('\n');
  };
  // Les racines, relatives au collet, et les nodules (point d'attache, sens, longueur).
  const RACINES = [
    [[0, 0], [2, 40], [-3, 90], [2, 140], [0, 200]],
    [[1, 22], [-30, 42], [-68, 66], [-98, 92]],
    [[1, 38], [34, 58], [70, 84], [96, 108]],
    [[-2, 84], [-30, 108], [-58, 136]],
    [[0, 108], [28, 132], [52, 156]],
  ];
  const NODULES = [
    [[-24, 38], 100], [[-48, 54], 60], [[-66, 64], 130], [[-12, 30], 150],
    [[20, 50], 80], [[44, 64], 110], [[62, 78], 50], [[-4, 70], 170], [[22, 126], 70],
  ];
  const racines = (P, C, s, lon = 15, r = 4.5) => {
    const out = RACINES.map(rc => halo(lisse(rc.map(p => P(...add(C, p)))), 1.4));
    const ds = NODULES.map(([p, a]) => {
      const c0 = P(...add(C, p)), u = [Math.cos(a * RAD), Math.sin(a * RAD)];
      return capsule(c0, add(c0, mul(u, lon * s)), r * s * 0.8, r * s);
    });
    out.push(union(ds, 1.4));
    return out.join('\n');
  };

  // ── Le bol (mm, origine au centre du dessous, y vers le bas) ─────────────────────────────
  const xExt = y => 40 + 48 * Math.pow(Math.max(0, -y) / 72, 0.6);            // y de 0 à −72
  const xInt = y => 36 + 47 * Math.pow(Math.max(0, -6 - y) / 66, 0.6);        // y de −6 à −72
  const profil = (fx, y0, y1, n = 16) => { const out = []; for (let i = 0; i <= n; i++) { const y = y0 + (y1 - y0) * i / n; out.push([fx(y), y]); } return out; };
  const bol = (P) => {
    const ext = profil(xExt, -72, 0), int = profil(xInt, -6, -72);
    const extG = ext.map(([x, y]) => [-x, y]), intG = int.map(([x, y]) => [-x, y]);
    const tour = [...extG, ...ext.slice().reverse(), ...int.slice().reverse(), ...intG];
    return h.chemin(tour.map(p => P(...p)), A.hachure('metal', 'contour'), true);
  };
  const liquide = (P, niveau) => {
    const cote = profil(xInt, niveau, -6, 10);
    const pts = [...cote.map(([x, y]) => [-x, y]), ...cote.slice().reverse()];
    return [h.path(lisse(pts.map(p => P(...p)), true), A.hachure('eau', 'aucun')),
      h.ligne(...P(-xInt(niveau), niveau), ...P(xInt(niveau), niveau), A.detail)].join('\n');
  };

  // ── Perspective cavalière des vues 3 et 4 (mm) : z vers le fond, qui monte vers la droite ──
  const AX = 0.55, BY = 0.4;
  const cav = (x, y, zz) => [x + AX * zz, y - BY * zz];
  const repereC = z => {
    const k = Math.min(z.l / 72, (z.h - 30) / 24);
    const ox = 34.5 * k, oy = 21.5 * k;
    const Q = (x, y, zz = 0) => { const c = cav(x, y, zz); return [r1(ox + c[0] * k), r1(oy + c[1] * k)]; };
    const D2 = (x, y) => [r1(ox + x * k), r1(oy + y * k)];
    return { k, Q, D2 };
  };

  return {
    ref: '96-08',
    titre: 'Inoculer les pois aux nodules de vesce',
    desc: 'Au semis, on déterre quelques plants de vesce jargeau avec leur motte, on rince les racines au seau, on coupe un nodule en travers pour voir sa couleur dedans, on écrase les nodules roses au pilon dans un peu d’eau et on y roule les pois entiers juste avant de semer. À la floraison, la même coupe sur les nodules du pois dit si la bactérie travaille.',
    format: 'pleine',
    disposition: [['deterrer', 'rincer'], ['couper', 'faces'], ['ecraser', 'rouler']],
    hauteurs: [3, 2.5, 2.5],
    largeurs: [[1, 1], [3, 2], [1, 1]],
    vues: {
      // ── 1. La vesce sortie de terre avec sa motte ──
      deterrer: {
        titre: 'Au semis, déterrer quelques vesces',
        dessin: z => {
          const s = Math.min((z.h - 6) / 790, (z.l - 10) / 640);
          const ox = z.l * 0.46, oy = 4 + 580 * s;
          const P = (x, y) => [r1(ox + x * s), r1(oy + y * s)];
          const out = [];
          const trou = [[-150, 0], [-142, 70], [-114, 140], [-58, 182], [0, 190], [58, 182], [114, 140], [142, 70], [150, 0]];
          // le sol en coupe, troué
          out.push(h.chemin([[-300, 0], [-150, 0]].map(p => P(...p)), A.contour));
          out.push(h.path(`M ${pt(P(-300, 0))} L ${pt(P(-150, 0))} ${lisse(trou.map(p => P(...p))).replace(/^M [^C]*/, '')} L ${pt(P(300, 0))} L ${pt(P(300, 228))} L ${pt(P(-300, 228))} Z`, A.hachure('terre', 'aucun')));
          out.push(h.path(lisse(trou.map(p => P(...p))), A.arete));
          out.push(h.ligne(...P(-300, 0), ...P(-150, 0), A.contour), h.ligne(...P(150, 0), ...P(300, 0), A.contour));
          // la motte levée, les racines dedans, la plante dessus
          const lev = 212, C = [0, -lev];
          const motte = trou.map(([x, y]) => [x, y - lev]);
          out.push(h.path(lisse(motte.map(p => P(...p)), true), A.hachure('terre', 'contour')));
          out.push(racines(P, C, s));
          out.push(plante(P, C));
          // le geste : la motte monte
          out.push(h.fleche(`M ${pt(P(212, -30))} L ${pt(P(212, -190))}`, A.arete));
          out.push(h.fleche(`M ${pt(P(-212, -30))} L ${pt(P(-212, -190))}`, A.arete));
          return out.join('\n');
        },
        renvois: z => {
          const s = Math.min((z.h - 6) / 790, (z.l - 10) / 640);
          const ox = z.l * 0.46, oy = 4 + 580 * s;
          const P = (x, y) => [r1(ox + x * s), r1(oy + y * s)];
          const acc = []; plante(P, [0, -212], 150, acc);
          const v = acc.reduce((m, q) => (q[0] - q[1] > m[0] - m[1] ? q : m));
          return [
            { n: 1, rond: [z.l - 14, 14], cible: v },
            { n: 2, rond: [14, z.h * 0.62], cible: P(-66, -150), texte: 'les nodules, collés aux racines' },
          ].map((r, i) => ({ texte: 'vesce jargeau : feuilles à vrilles', ...r }));
        },
      },

      // ── 2. Le rinçage au seau ──
      rincer: {
        titre: 'Rincer les racines',
        dessin: z => {
          const s = Math.min((z.h - 6) / 600, (z.l - 10) / 470);
          const ox = z.l * 0.52, oy = 4 + 262 * s;
          const P = (x, y) => [r1(ox + x * s), r1(oy + y * s)];
          const out = [];
          // le seau en coupe, l'eau
          const seau = [[-150, 60], [-122, 330], [122, 330], [150, 60]];
          const niveau = 110;
          const xs = y => 150 - 28 * (y - 60) / 270;
          out.push(h.path(`M ${pt(P(-xs(niveau), niveau))} L ${pt(P(-122, 330))} L ${pt(P(122, 330))} L ${pt(P(xs(niveau), niveau))} Z`, A.hachure('eau', 'aucun')));
          out.push(h.ligne(...P(-xs(niveau), niveau), ...P(xs(niveau), niveau), A.detail));
          // la terre qui tombe au fond
          const tas = [[-100, 330], [-80, 318], [-40, 312], [0, 309], [40, 312], [80, 318], [100, 330]];
          out.push(h.path(lisse(tas.map(p => P(...p))) + ' Z', A.hachure('terre', 'fin')));
          for (const [x, y] of [[-40, 262], [-12, 280], [22, 268], [48, 290], [-60, 292], [8, 300], [-28, 238], [36, 244]])
            out.push(h.cercle(...P(x, y), 1.4, A.plein));
          out.push(h.chemin(seau.map(p => P(...p)), A.contour));
          out.push(h.ligne(...P(-156, 60), ...P(-144, 60), A.contour), h.ligne(...P(144, 60), ...P(156, 60), A.contour));
          // la plante tenue par les tiges, les racines dans l'eau
          out.push(racines(P, [0, 62], s));
          const tiges = [[[0, 62], [-2, 0], [-14, -90], [-40, -170], [-70, -222]], [[0, 62], [2, 0], [6, -100], [2, -180], [-8, -236]], [[0, 62], [4, 0], [22, -80], [52, -150], [86, -196]]];
          const hautTiges = tiges.map(t => h.path(lisse(t.map(p => P(...p))), A.arete)).join('\n');
          const feuilles = [];
          tiges.forEach((t, k) => {
            for (const i of [[3], [2, 4], [3]][k]) {
              const tg = uni(sub(t[Math.min(i + 1, t.length - 1)], t[i - 1]));
              const cote = (i + k) % 2 ? 1 : -1;
              feuilles.push(feuille(P, t[i], Math.atan2(tg[1], tg[0]) / RAD + cote * 52, 120, 8, -cote, null, (i + k) % 2 ? 3 : 2));
            }
          });
          const m = F.main({ x: P(0, 0)[0], y: P(0, 0)[1], pose: 'prise', vue: 'dos', diametre: 14 * s, echelle: s, bras: 40 });
          out.push(hautTiges, feuilles.join('\n'), m);
          out.push(doubleFleche(`M ${pt(P(196, -60))} L ${pt(P(196, 70))}`));
          return out.join('\n');
        },
        renvois: z => {
          const s = Math.min((z.h - 6) / 600, (z.l - 10) / 470);
          const ox = z.l * 0.52, oy = 4 + 262 * s;
          const P = (x, y) => [r1(ox + x * s), r1(oy + y * s)];
          return [{ n: 3, rond: [z.l - 14, z.h * 0.72], cible: P(56, 138), texte: 'la terre part, les nodules restent' }];
        },
      },

      // ── 3. Le couteau posé en travers du nodule, au milieu ──
      couper: {
        titre: 'Couper un nodule en travers, au couteau',
        dessin: z => {
          const { k, Q, D2 } = repereC(z);
          const out = [];
          // à gauche, de face : un bout de racine et ses nodules, collés
          const yR = x => -4.2 - 0.7 * Math.sin((x + 33) / 30 * Math.PI), rR = x => 1.0 - 0.42 * (x + 33) / 30;
          const xs = []; for (let x = -33; x <= -3.01; x += 2.5) xs.push(x); xs.push(-3);
          const haut = xs.map(x => [x, yR(x) - rR(x)]), bas = xs.map(x => [x, yR(x) + rR(x)]).reverse();
          const att = (x, sg) => [x, yR(x) + sg * rR(x) * 0.4];
          const nods = [
            [att(-29.5, 1), 116, 5.6, 1.05], [att(-24.5, -1), -104, 5, 1.0], [att(-12.5, -1), -76, 5.4, 1.0],
            [att(-8, 1), 82, 6.2, 1.05],
          ];
          const ds = nods.map(([p, a, L, r]) => capsule(D2(...p), D2(p[0] + Math.cos(a * RAD) * L, p[1] + Math.sin(a * RAD) * L), r * 0.78 * k, r * k));
          // le ramifié : une courte tige, puis trois doigts
          const b = att(-19, 1), f = [b[0] - 0.4, b[1] + 2];
          ds.push(capsule(D2(...b), D2(...f), 0.95 * k, 0.95 * k));
          for (const [a, L] of [[128, 4.2], [96, 4.8], [62, 4.0]]) ds.push(capsule(D2(...f), D2(f[0] + Math.cos(a * RAD) * L, f[1] + Math.sin(a * RAD) * L), 0.8 * k, 0.85 * k));
          // deux radicelles
          out.push(h.path(lisse([[-22, yR(-22)], [-20, yR(-22) - 3], [-16.5, yR(-22) - 5.5]].map(p => D2(...p))), A.detail));
          out.push(h.path(lisse([[-5, yR(-5)], [-3.5, yR(-5) + 3], [-1.5, yR(-5) + 5.8]].map(p => D2(...p))), A.detail));
          out.push(union(ds, 2.4));
          out.push(h.path(lisse([...haut, ...bas].map(p => D2(...p))) + ' Z', 'fill="#fff" stroke="none"'));
          out.push(h.path(lisse(haut.map(p => D2(...p))), A.arete), h.path(lisse(bas.map(p => D2(...p))), A.arete));
          out.push(h.path(`M ${pt(D2(...haut[0]))} Q ${pt(D2(-33.5, yR(-33)))} ${pt(D2(...bas[bas.length - 1]))}`, A.detail));
          out.push(h.path(`M ${pt(D2(...haut[haut.length - 1]))} Q ${pt(D2(-2.5, yR(-3)))} ${pt(D2(...bas[0]))}`, A.detail));
          // à droite, en perspective : un nodule détaché, couché sur la planche, pointé vers l'œil ;
          // le couteau posé en travers, au milieu (plan z = 0)
          const xn = 13, rn = 1.6, zB = 4.5, zF = -4.5, xl = (z.l - Q(0, 0, 0)[0]) / k - 0.5;
          // la planche : son arête avant et son arête gauche qui fuit
          // la planche à découper a son épaisseur : chant avant et chant gauche, en bois
          const ep = 2.6;
          const xf = xl + AX * 8;   // le chant avant file jusqu'au bord de la vue, comme le dessus
          out.push(h.chemin([Q(4, rn, -8), Q(xf, rn, -8), Q(xf, rn + ep, -8), Q(4, rn + ep, -8)], A.hachure('bois', 'aucun'), true));
          out.push(h.chemin([Q(xf, rn, -8), Q(4, rn, -8), Q(4, rn + ep, -8), Q(xf, rn + ep, -8)], A.arete));
          out.push(h.ligne(...Q(4, rn, -8), ...Q(4, rn, 5), A.arete), h.ligne(...Q(4, rn, 5), ...Q(xl, rn, 5), A.detail));
          for (const [zz, x0, x1] of [[-6, 21, 32], [2.5, 22, 30]]) out.push(h.ligne(...Q(x0, rn, zz), ...Q(x1, rn, zz), A.fin));
          // le nodule entier, couché ; un anneau tireté marque la coupe, au milieu
          out.push(union([capsule(Q(xn, 0, zB), Q(xn, 0, zF), rn * 0.85 * k, rn * k * 0.94)], 2.4));
          out.push(h.cercle(...Q(xn, 0, 0), rn * k, A.cache));
          // la lame, levée juste au-dessus, le tranchant en travers
          const yT = -rn - 2.2;
          const dos = [[6, yT], [5, yT - 2.8], [9, yT - 6.2], [15, yT - 8.8], [25, yT - 10.4], [xl, yT - 10.8]];
          out.push(h.path(lisse(dos.map(p => Q(p[0], p[1], 0))) + ` L ${pt(Q(xl, yT, 0))} Z`, 'fill="#fff" stroke="none"'));
          out.push(h.path(lisse(dos.map(p => Q(p[0], p[1], 0))), A.contour));
          out.push(h.ligne(...Q(6, yT, 0), ...Q(xl, yT, 0), A.contour));
          out.push(h.path(lisse([[10.5, yT - 1.7], [19, yT - 2.6], [xl, yT - 2.9]].map(p => Q(p[0], p[1], 0))), A.fin));
          // le geste : appuyer
          out.push(h.fleche(`M ${pt(Q(16, yT - 15, 0))} L ${pt(Q(16, yT - 9.8, 0))}`, A.arete));
          return out.join('\n');
        },
        renvois: z => {
          const { Q, D2 } = repereC(z);
          return [
            { n: 4, rond: [14, z.h - 12], cible: D2(-19.2, 3.6), texte: 'nodule : un doigt, souvent ramifié' },
            { n: 5, rond: [z.l * 0.62, z.h - 12], cible: Q(13, 1.6, 0), texte: 'en travers, par le milieu' },
          ];
        },
      },

      // ── 4. Trois nodules coupés, la face vers l'œil ──
      faces: {
        titre: 'Dedans : vesce, ou pois en fleur',
        dessin: z => {
          const k = Math.min(z.l / 3 / 8.4, (z.h - 30) / 9);
          const out = [];
          for (let i = 0; i < 3; i++) {
            const cx = z.l * (i + 0.5) / 3 + 1.5 * k, cy = z.h * 0.42;
            const Q = (x, y, zz = 0) => { const c = cav(x, y, zz); return [r1(cx + c[0] * k), r1(cy + c[1] * k)]; };
            const rr = 0.9, rn = 1.3, zc = -3.5;
            out.push(h.path(`M ${pt(Q(-3.6, -rr))} L ${pt(Q(3.6, -rr))} Q ${pt(Q(3.9, 0))} ${pt(Q(3.6, rr))} L ${pt(Q(-3.6, rr))} Q ${pt(Q(-3.9, 0))} ${pt(Q(-3.6, -rr))} Z`, tr(1.4, '#fff')));
            out.push(union([capsule(Q(0, 0, -0.5), Q(0, 0, zc), rn * 0.8 * k, rn * k)], 2.4));
            const f = Q(0, 0, zc), R = rn * k;
            const corps = capsule(Q(0, 0, -0.5), Q(0, 0, zc), rn * 0.8 * k, rn * k);
            out.push(h.cercle(f[0], f[1], R, tr(1.4, '#fff')));
            if (i === 0) {
              // rose ou rouge : un pointillé serré qui remplit la face
              const e = R / 6.5;
              for (let gx = -R; gx <= R; gx += e) for (let gy = -R; gy <= R; gy += e * 0.87) {
                const x = gx + ((Math.round((gy + R) / (e * 0.87)) % 2) ? e / 2 : 0);
                if (Math.hypot(x, gy) < R - 2.2) out.push(h.cercle(r1(f[0] + x), r1(f[1] + gy), 0.85, A.plein));
              }
            } else if (i === 1) {
              // beige : presque blanc, quelques points
              for (const [x, y] of [[-0.35, -0.3], [0.3, -0.42], [0.05, 0.1], [-0.4, 0.38], [0.42, 0.3]])
                out.push(h.cercle(r1(f[0] + x * R), r1(f[1] + y * R), 0.85, A.plein));
            } else {
              // vert dans tout le nodule : une hachure fine sur la face et sur toute la longueur
              const id = 'hv96-08';
              out.push(`<clipPath id="${id}"><path d="${corps}"/><circle cx="${f[0]}" cy="${f[1]}" r="${r1(R)}"/></clipPath>`);
              const traits = [];
              for (let d = -4 * R; d <= 4 * R; d += 2.6) traits.push(`M ${r1(f[0] + d - 3 * R)} ${r1(f[1] + 3 * R)} L ${r1(f[0] + d + 3 * R)} ${r1(f[1] - 3 * R)}`);
              out.push(`<g clip-path="url(#${id})">` + h.path(traits.join(' '), tr(0.5)) + '</g>');
              out.push(h.path(corps, tr(2.4)));
            }
            out.push(h.cercle(f[0], f[1], R, A.arete));
          }
          return out.join('\n');
        },
        renvois: z => {
          const k = Math.min(z.l / 3 / 8.4, (z.h - 30) / 9);
          const textes = ['rose ou rouge : la bactérie travaille', 'beige : elle est là, ne fixe pas', 'vert dans tout le nodule : il meurt'];
          return textes.map((texte, i) => {
            const cx = z.l * (i + 0.5) / 3 + 1.5 * k, cy = z.h * 0.42;
            const f = [cx + AX * -3.5 * k, cy - BY * -3.5 * k];
            return { n: 6 + i, rond: [r1(f[0]), z.h - 12], cible: [r1(f[0]), r1(f[1] + 1.3 * k * 0.4)], texte };
          });
        },
      },

      // ── 5. Écraser au pilon dans le fond du bol ──
      ecraser: {
        titre: 'Écraser les nodules roses dans un peu d’eau',
        dessin: z => {
          const s = Math.min((z.h - 8) / 245, (z.l - 10) / 330);
          const ox = z.l * 0.58, oy = z.h - 4;
          const P = (x, y) => [r1(ox + x * s), r1(oy + y * s)];
          const out = [];
          out.push(liquide(P, -16));
          // les nodules et leurs débris au fond
          const nod = [[[-50, -10], [-40, -12]], [[-34, -9], [-26, -13]], [[24, -10], [34, -9]], [[40, -11], [50, -14]]];
          out.push(union(nod.map(([a, b]) => capsule(P(...a), P(...b), 2 * s, 2.4 * s)), 1.4));
          for (const [x, y] of [[-20, -9], [-14, -11], [16, -9], [12, -12], [-8, -8], [8, -8]]) out.push(h.cercle(...P(x, y), 1.2, A.plein));
          out.push(bol(P));
          // le pilon, tenu au poing
          const pil = `M ${pt(P(-15, -224))} L ${pt(P(-15, -27))} A ${r1(15 * s)} ${r1(15 * s)} 0 0 0 ${pt(P(15, -27))} L ${pt(P(15, -224))} A ${r1(15 * s)} ${r1(15 * s)} 0 0 0 ${pt(P(-15, -224))} Z`;
          out.push(h.path(pil, A.hachure('bois', 'contour')));
          out.push(F.main({ x: P(0, -165)[0], y: P(0, -165)[1], pose: 'prise', vue: 'dos', diametre: 30 * s, echelle: s, bras: 40 }));
          out.push(h.fleche(`M ${pt(P(100, -225))} L ${pt(P(100, -135))}`, A.arete));
          return out.join('\n');
        },
        renvois: z => {
          const s = Math.min((z.h - 8) / 245, (z.l - 10) / 330);
          const ox = z.l * 0.58, oy = z.h - 4;
          const P = (x, y) => [r1(ox + x * s), r1(oy + y * s)];
          return [{ n: 9, rond: [14, z.h * 0.45], cible: P(-45, -11), texte: 'les nodules roses, dans un peu d’eau' }];
        },
      },

      // ── 6. Les pois roulés dans ce jus ──
      rouler: {
        titre: 'Y rouler la semence, juste avant de semer',
        dessin: z => {
          const s = Math.min((z.h - 8) / 116, (z.l - 60) / 180);
          const ox = z.l * 0.5, oy = z.h - 4;
          const P = (x, y) => [r1(ox + x * s), r1(oy + y * s)];
          const out = [];
          out.push(liquide(P, -24));
          const rp = 3.8;
          const pois = [];
          for (let i = 0; i < 9; i++) pois.push([-31 + i * 7.75, -6 - rp]);
          pois.push([-40, -12.5], [40, -12.5], [-46.5, -18], [46.5, -18]);
          for (const x of [-27, -11.5, 4, 19.5, 35]) pois.push([x, -16.4]);
          for (const x of [-19, 12]) pois.push([x, -23.6]);
          for (const [x, y] of pois) {
            out.push(h.cercle(...P(x, y), rp * s, tr(1.4, '#fff')));
            out.push(h.path(`M ${pt(P(x - 1.6, y - 2.2))} Q ${pt(P(x - 2.6, y - 0.6))} ${pt(P(x - 2.2, y + 1))}`, A.fin));
          }
          out.push(bol(P));
          // le geste : faire tourner le bol pour rouler les pois dans le jus
          const el = [];
          for (let i = 0; i <= 40; i++) { const t = (120 + 300 * i / 40) * RAD; el.push(P(Math.cos(t) * 66, -94 + Math.sin(t) * 11)); }
          out.push(h.fleche(lisse(el), A.arete));
          return out.join('\n');
        },
        renvois: z => {
          const s = Math.min((z.h - 8) / 116, (z.l - 60) / 180);
          const ox = z.l * 0.5, oy = z.h - 4;
          const P = (x, y) => [r1(ox + x * s), r1(oy + y * s)];
          return [
            { n: 10, rond: [z.l - 14, z.h * 0.64], cible: P(35, -16.4), texte: 'pois entiers, ni fendus ni décortiqués' },
            { n: 11, rond: [14, z.h * 0.64], cible: P(-50, -26), texte: 'le jus des nodules écrasés' },
          ];
        },
      },
    },
  };
};
