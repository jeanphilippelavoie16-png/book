// Planche 99-08 — la taille du cassissier et du gadellier rouge. Chapitre 99, étape 39 « Tailler
// en fin d'hiver, selon l'âge du bois » : le cassissier fruite surtout sur le bois d'un an ; on
// garde 10 à 12 tiges, dont la moitié d'un an, et on coupe au ras du sol tout ce qui a plus de trois
// ans. Le gadellier rouge (et le groseillier) fruite sur les courts rameaux du bois de deux et trois
// ans ; on garde trois ou quatre tiges de chaque âge, un, deux et trois ans, soit 9 à 12 tiges, et
// on coupe tout ce qui dépasse trois ans.
//
// Le chapitre ne dit pas comment reconnaître l'âge d'une tige. La planche le montre par la
// ramification, qui est la façon dont une tige pousse : l'année où elle sort du sol, une tige seule
// garnie de bourgeons ; l'année suivante, ces bourgeons ont donné des rameaux ; la troisième, les
// rameaux se ramifient à leur tour et le vieux bois porte des courts rameaux. Plus vieux : grosse,
// tordue, l'écorce crevassée. Aucune cote : rien ne se construit, et le chapitre ne donne pas de
// hauteur de coupe autre que « au ras du sol ».
//
// Les buissons se montrent en fin d'hiver, sans feuilles, au nombre minimal que le chapitre permet :
// cassissier 10 tiges gardées (5 d'un an, 3 de deux, 2 de trois), gadellier 9 (3 de chaque âge).
// Les tiges de plus de trois ans sont en tireté : ce qui s'en va ; leur chicot noir au ras du sol.
module.exports = (h) => {
  const A = h.a, NL = String.fromCharCode(10);
  const r1 = v => Math.round(v * 10) / 10;
  const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const bA = blanc(A.arete), bD = blanc(A.detail);
  const FANT = 'fill="none" stroke="#1A1A1A" stroke-width="0.7" stroke-dasharray="3.5 2.4" stroke-linecap="round"';
  const FANT2 = 'fill="none" stroke="#1A1A1A" stroke-width="0.5" stroke-dasharray="2.4 2" stroke-linecap="round"';
  const add = (p, v, f = 1) => [p[0] + v[0] * f, p[1] + v[1] * f];
  const nrm = v => { const n = Math.hypot(v[0], v[1]) || 1; return [v[0] / n, v[1] / n]; };
  const rot = (v, deg) => { const a = deg * Math.PI / 180, c = Math.cos(a), s = Math.sin(a); return [v[0] * c - v[1] * s, v[0] * s + v[1] * c]; };
  const pt = p => `${r1(p[0])} ${r1(p[1])}`;
  const alea = g => { let s = g; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; };

  // ─── une tige : Bézier cubique, largeur qui diminue du pied au bout ─────────────────────
  const cub = (c, t) => { const u = 1 - t; return [0, 1].map(j => u * u * u * c[0][j] + 3 * u * u * t * c[1][j] + 3 * u * t * t * c[2][j] + t * t * t * c[3][j]); };
  const dcub = (c, t) => { const u = 1 - t; return [0, 1].map(j => 3 * u * u * (c[1][j] - c[0][j]) + 6 * u * t * (c[2][j] - c[1][j]) + 3 * t * t * (c[3][j] - c[2][j])); };
  const tige = (c, w0, w1) => {
    const P = t => cub(c, t);
    const T = t => nrm(dcub(c, Math.min(0.999, Math.max(0.001, t))));
    const N = t => { const v = T(t); return [-v[1], v[0]]; };   // à droite quand la tige monte
    const w = t => w0 + (w1 - w0) * t;
    return { c, P, T, N, w, enfants: [], avant: [], apres: [] };
  };
  const contour = s => {
    const n = 40, G = [], D = [];
    for (let i = 0; i <= n; i++) { const t = i / n, p = s.P(t), nm = s.N(t), r = s.w(t) / 2; G.push(add(p, nm, -r)); D.push(add(p, nm, r)); }
    const bout = add(s.P(1), s.T(1), s.w(1) * 1.1);
    return `M${pt(D[0])} ${D.slice(1).map(p => 'L' + pt(p)).join(' ')} Q${pt(bout)} ${pt(G[n])} ${G.slice(0, n).reverse().map(p => 'L' + pt(p)).join(' ')} Z`;
  };
  const axe = s => { const o = []; for (let i = 0; i <= 30; i++) o.push(s.P(i / 30)); return o.map((p, i) => (i ? 'L' : 'M') + pt(p)).join(' '); };
  // Les enfants d'abord, puis ce qui passe derrière la tige (bourgeons, courts rameaux), puis la tige.
  const rendre = (s, mode) => {
    const o = s.enfants.map(e => rendre(e, mode));
    if (mode === 'trait') { o.push(...s.avant, `<path d="${contour(s)}" ${s.trait || bA}/>`, ...s.apres); }
    else if (mode === 'plein') o.push(`<path d="${contour(s)}" ${A.plein}/>`);
    else o.push(`<path d="${axe(s)}" ${s.parent ? FANT2 : FANT}/>`);
    return o.join(NL);
  };
  // Un rameau part de la tige mère à t, du côté cote (+1 droite), écarté de angle degrés, et se
  // relève vers le haut en poussant.
  const rameau = (par, t, cote, angle, L, w0, w1, releve = 0.5) => {
    const p0 = par.P(t), d0 = rot(par.T(t), cote * angle);
    const d1 = nrm(add(d0, [0, -1], releve));
    const p3 = add(add(p0, d0, L * 0.55), d1, L * 0.45);
    const e = tige([p0, add(p0, d0, L * 0.35), add(p3, d1, -L * 0.3), p3], w0, w1);
    e.parent = par; par.enfants.push(e);
    return e;
  };
  // Un bourgeon : une amande pointue collée au flanc, penchée vers le bout de la tige.
  const bourgeon = (s, t, cote, lg = 5.2, la = 3.4, angle = 30) => {
    const dir = rot(s.T(t), cote * angle);
    const e = [-dir[1], dir[0]];
    const b = add(s.P(t), s.N(t), cote * s.w(t) * 0.4);
    const q = (u, v) => add(add(b, dir, u), e, v);
    s.avant.push(`<path d="M${pt(q(-0.2 * lg, 0))} C${pt(q(-0.1 * lg, 0.62 * la))} ${pt(q(0.5 * lg, 0.62 * la))} ${pt(q(lg, 0))} C${pt(q(0.5 * lg, -0.62 * la))} ${pt(q(-0.1 * lg, -0.62 * la))} ${pt(q(-0.2 * lg, 0))} Z" ${bD}/>`);
  };
  const bourgeonBout = (s, lg = 5.6, la = 3.4) => {
    const T = s.T(1), N = s.N(1), b = add(s.P(1), T, -1.2);
    const q = (u, v) => add(add(b, T, u), N, v);
    s.avant.push(`<path d="M${pt(q(0, -la * 0.5))} C${pt(q(0.3 * lg, -0.62 * la))} ${pt(q(0.75 * lg, -0.3 * la))} ${pt(q(lg, 0))} C${pt(q(0.75 * lg, 0.3 * la))} ${pt(q(0.3 * lg, 0.62 * la))} ${pt(q(0, la * 0.5))} Z" ${bD}/>`);
  };
  const bourgeons = (s, t0, t1, pas, lg, la, cote0 = 1) => {
    let cote = cote0;
    for (let t = t0; t <= t1 + 1e-6; t += pas) { bourgeon(s, t, cote, lg, la); cote = -cote; }
    bourgeonBout(s, lg * 1.05, la);
  };
  // Un court rameau : un bout trapu, ridé en travers, un bourgeon au bout.
  const court = (par, t, cote, L = 7, w = 3.4, angle = 54) => {
    const f = par.w(t) / 2, Lt = f + L;
    const e = rameau(par, t, cote, angle, Lt, w, w * 0.85, 0.15);
    bourgeonBout(e, 4.2, 3);
    [0.3, 0.5, 0.7].map(u => f / Lt + (1 - f / Lt) * u).forEach(u => {
      const p = e.P(u), n = e.N(u), r = e.w(u) / 2;
      e.apres.push(`<path d="M${pt(add(p, n, -r))} L${pt(add(p, n, r))}" ${A.fin}/>`);
    });
    return e;
  };
  // L'écorce crevassée du vieux bois : des traits fins le long de la tige.
  const ecorce = (s, n, graine, t0 = 0.03, t1 = 0.75) => {
    const R = alea(graine);
    for (let i = 0; i < n; i++) {
      const t = t0 + (t1 - t0) * R(), p = s.P(t), T = s.T(t), N = s.N(t), r = s.w(t) / 2;
      const o = (R() - 0.5) * 1.3 * r, l = 5 + 8 * R();
      const a = add(p, N, o), b = add(add(a, T, l * 0.5), N, (R() - 0.5) * 1.6), c = add(a, T, l);
      s.apres.push(`<path d="M${pt(a)} Q${pt(b)} ${pt(c)}" ${A.fin}/>`);
    }
  };

  // ─── Vue 1 : l'âge d'une tige ───────────────────────────────────────────────────────────
  const gAges = z => {
    const gy = z.h - 24, H = gy - 14;
    const X = [0.08, 0.3, 0.56, 0.83].map(f => z.l * f);
    const S = [];

    // 1. d'un an : une tige seule, des bourgeons, rien d'autre
    let x = X[0];
    const t1 = tige([[x, gy + 2], [x - 3, gy - 0.35 * H], [x + 5, gy - 0.7 * H], [x + 10, gy - 0.93 * H]], 5, 2);
    bourgeons(t1, 0.1, 0.93, 0.07, 5.4, 3.4);
    S.push(t1);

    // 2. de deux ans : les bourgeons de l'an passé ont donné des rameaux ; deux courts rameaux au bas
    x = X[1];
    const t2 = tige([[x, gy + 2], [x - 4, gy - 0.33 * H], [x + 4, gy - 0.68 * H], [x + 1, gy - 0.98 * H]], 8, 2.4);
    [[0.36, -1, 42, 42], [0.5, 1, 38, 50], [0.63, -1, 34, 46], [0.76, 1, 30, 38], [0.87, -1, 26, 24]].forEach(([t, c, a, L]) => {
      const r = rameau(t2, t, c, a, L, 3.4, 1.7, 0.45);
      bourgeons(r, 0.3, 0.85, 0.22, 4.4, 2.9, -c);
    });
    court(t2, 0.17, 1, 6, 3.6); court(t2, 0.26, -1, 6, 3.6);
    bourgeon(t2, 0.93, 1, 4.6, 3); bourgeonBout(t2, 5.4, 3.4);
    S.push(t2);

    // 3. de trois ans : les rameaux se ramifient, le bois de deux et trois ans porte des courts rameaux
    x = X[2];
    const t3 = tige([[x, gy + 2], [x + 4, gy - 0.33 * H], [x - 5, gy - 0.66 * H], [x + 2, gy - 0.97 * H]], 11.5, 2.8);
    const cour3 = [];
    [[0.29, 1, 44, 58], [0.42, -1, 42, 60], [0.55, 1, 38, 56], [0.68, -1, 34, 48], [0.8, 1, 30, 38]].forEach(([t, c, a, L], i) => {
      const r = rameau(t3, t, c, a, L, 5, 1.8, 0.45);
      const s = rameau(r, 0.52, -c, 40, L * 0.42, 2.4, 1.3, 0.5);
      bourgeons(s, 0.45, 0.8, 0.35, 3.8, 2.6, c);
      cour3.push(court(r, 0.22, c, 5.5, 3.4));
      bourgeons(r, 0.72, 0.9, 0.18, 4.2, 2.8, c);
    });
    cour3.push(court(t3, 0.1, -1, 7, 4), court(t3, 0.2, -1, 7, 4), court(t3, 0.15, 1, 8, 4.2));
    const r3 = rameau(t3, 0.9, 1, 28, 22, 2.2, 1.4, 0.5); bourgeons(r3, 0.5, 0.8, 0.3, 3.8, 2.6, -1);
    bourgeon(t3, 0.95, -1, 4.6, 3); bourgeonBout(t3, 5.6, 3.4);
    S.push(t3);

    // 4. plus de trois ans : grosse, tordue, écorce crevassée, rameaux vieux, courts rameaux partout
    x = X[3];
    const t4 = tige([[x, gy + 2], [x - 7, gy - 0.3 * H], [x + 9, gy - 0.6 * H], [x - 2, gy - 0.9 * H]], 17, 3.4);
    [[0.22, 1, 50, 60], [0.35, -1, 48, 62], [0.48, 1, 42, 58], [0.62, -1, 38, 52], [0.76, 1, 32, 40]].forEach(([t, c, a, L], i) => {
      const r = rameau(t4, t, c, a, L, 7, 2, 0.45);
      ecorce(r, 3, 101 + i, 0.05, 0.4);
      const s1 = rameau(r, 0.4, -c, 42, L * 0.45, 3, 1.3, 0.5);
      bourgeons(s1, 0.55, 0.85, 0.3, 3.6, 2.5, c);
      const s2 = rameau(r, 0.66, c, 40, L * 0.32, 2.0, 1.2, 0.5);
      bourgeonBout(s2, 3.8, 2.5);
      court(r, 0.18, -c, 6, 3.6); court(r, 0.3, c, 6, 3.6);
      bourgeonBout(r, 4, 2.7);
    });
    // un chicot mort : un bout sec cassé net
    const mort = rameau(t4, 0.13, -1, 58, 20, 5, 4.4, 0.2);
    { const p = mort.P(1), n = mort.N(1), r = mort.w(1) / 2; mort.apres.push(`<path d="M${pt(add(p, n, -r))} L${pt(add(add(p, mort.T(1), 1.5), n, 0))} L${pt(add(p, n, r))}" ${A.detail}/>`); }
    [0.07, 0.19, 0.28, 0.42, 0.56, 0.7].forEach((t, i) => court(t4, t, i % 2 ? -1 : 1, 7.5, 4.4));
    ecorce(t4, 22, 7, 0.02, 0.6);
    bourgeonBout(t4, 5, 3.2);
    S.push(t4);
    return { gy, H, X, S, cour3 };
  };
  const ages = z => {
    const g = gAges(z);
    const o = [h.rect(0, g.gy, z.l, z.h - g.gy - 2, A.hachure('terre', 'aucun'))];
    g.S.forEach(s => o.push(rendre(s, 'trait')));
    o.push(h.ligne(0, g.gy, z.l, g.gy, A.arete));
    return o.join(NL);
  };

  // ─── Vue 2 : au ras du sol, en coupe ────────────────────────────────────────────────────
  const gRas = z => {
    const gy = Math.round(z.h * 0.6), cx = z.l * 0.46, sx = cx + 22, rs = 12;
    return { gy, cx, sx, rs, piece: { x: sx + 5, y: gy - 40 } };
  };
  const ras = z => {
    const g = gRas(z), o = [];
    const vague = y => { const p = []; for (let x = 0; x <= z.l; x += 4) p.push([x, y + 1.1 * Math.sin(x / 6.5)]); return p; };
    o.push(h.rect(0, g.gy, z.l, z.h - g.gy - 2, A.hachure('terre', 'aucun')));
    o.push(h.chemin(vague(g.gy), A.arete));
    // les racines, sous la souche
    const R = alea(33);
    [[-40, 70, -60], [-18, 80, -30], [4, 84, 6], [26, 80, 30], [44, 66, 58]].forEach(([dx, dy, ex]) => {
      const a = [g.cx + dx * 0.45, g.gy + 34], b = [g.cx + dx * 0.9 + 6 * (R() - 0.5), g.gy + dy * 0.6], c = [g.cx + ex, g.gy + dy];
      o.push(`<path d="M${pt(a)} Q${pt(b)} ${pt(c)}" ${A.arete}/>`);
      const m = [(a[0] + c[0]) / 2 + 2, (a[1] + c[1]) / 2 + 4];
      o.push(`<path d="M${pt(m)} q${r1(8 * Math.sign(dx || 1))} 6 ${r1(12 * Math.sign(dx || 1))} 16" ${A.detail}/>`);
    });
    // la souche : le pied ligneux, bosselé, d'où partent les tiges
    const souche = [];
    for (let i = 0; i < 36; i++) {
      const a = 2 * Math.PI * i / 36, bosse = 1 + 0.08 * Math.sin(5 * a) + 0.05 * Math.sin(9 * a + 1);
      souche.push([g.cx + 52 * bosse * Math.cos(a), g.gy + 26 + 19 * bosse * Math.sin(a)]);
    }
    o.push(h.chemin(souche, bA, true));
    // deux tiges gardées : elles montent de la souche et sortent de la vue par le haut
    const monte = (c, w0, w1, nb) => {
      const s = tige(c, w0, w1), n = 30, G = [], D = [];
      for (let i = 0; i <= n; i++) { const t = i / n, p = s.P(t), nm = s.N(t), r = s.w(t) / 2; G.push(add(p, nm, -r)); D.push(add(p, nm, r)); }
      const out = [];
      nb.forEach(([t, c2]) => { bourgeon(s, t, c2, 7, 4.4); });
      out.push(...s.avant);
      out.push(h.chemin([...D, ...G.slice().reverse()], A.blanc, true));
      out.push(h.chemin(G.filter((p, i) => s.P(i / n)[1] <= g.gy + 6), A.arete), h.chemin(D.filter((p, i) => s.P(i / n)[1] <= g.gy + 6), A.arete));
      out.push(h.chemin(G.filter((p, i) => s.P(i / n)[1] >= g.gy + 2), A.detail), h.chemin(D.filter((p, i) => s.P(i / n)[1] >= g.gy + 2), A.detail));
      return out.join(NL);
    };
    o.push(monte([[g.cx - 30, g.gy + 16], [g.cx - 32, g.gy - 60], [g.cx - 44, g.gy - 120], [g.cx - 52, -2]], 12, 9, [[0.45, 1], [0.62, -1], [0.8, 1]]));
    o.push(monte([[g.cx - 8, g.gy + 14], [g.cx - 6, g.gy - 60], [g.cx - 2, g.gy - 110], [g.cx - 8, -2]], 10, 8, [[0.5, -1], [0.7, 1]]));
    // le chicot du vieux bois, coupé au ras du sol : sa face à plat, les cernes
    const { sx, rs } = g;
    o.push(h.path(`M${sx - rs} ${g.gy} L${sx - rs - 1} ${g.gy + 16} Q${sx} ${g.gy + 22} ${sx + rs + 1} ${g.gy + 16} L${sx + rs} ${g.gy} Z`, bD));
    o.push(h.ellipse(sx, g.gy, rs, 3.8, bA));
    [0.78, 0.58, 0.38].forEach(f => o.push(h.ellipse(sx, g.gy, rs * f, 3.8 * f, A.fin)));
    o.push(h.cercle(sx, g.gy, 1, A.plein));
    // le bout enlevé, levé au-dessus du chicot : même grosseur, écorce crevassée, bas coupé
    const P0 = [g.piece.x, g.piece.y], haut = [g.piece.x + 7, -2];
    const piece = tige([P0, add(P0, [2, -40]), add(haut, [-3, 30]), haut], 2 * rs, 2 * rs - 3);
    const n = 24, G = [], D = [];
    for (let i = 0; i <= n; i++) { const t = i / n, p = piece.P(t), nm = piece.N(t), r = piece.w(t) / 2; G.push(add(p, nm, -r)); D.push(add(p, nm, r)); }
    const fond = [];
    for (let i = 1; i < 12; i++) { const f = Math.PI * i / 12; fond.push(add(add(P0, piece.N(0), -rs * Math.cos(f)), piece.T(0), -0.32 * rs * Math.sin(f))); }
    o.push(h.chemin([...fond, ...D, ...G.slice().reverse()], A.blanc, true));
    o.push(h.chemin([G[n], ...G.slice(0, n).reverse(), G[0], ...fond, D[0], ...D.slice(1)], A.arete));
    ecorce(piece, 12, 51, 0.05, 0.95); o.push(...piece.apres);
    // le geste : on l'enlève
    o.push(h.fleche(`M${r1(sx + 34)} ${r1(g.gy - 14)} L${r1(sx + 34)} ${r1(g.gy - 78)}`, A.arete));
    return o.join(NL);
  };

  // ─── Vues 3 et 4 : les buissons ─────────────────────────────────────────────────────────
  // a : âge de la tige (4 = plus de trois ans, qui s'en va) ; bx : pied, tx : bout, ht : hauteur.
  const buisson = (z, liste, courts, graine) => {
    const gy = z.h - 16, H = gy - 10, cx = z.l / 2, k = z.l / 290, R = alea(graine);
    const S = liste.map(({ a, bx, tx, ht }) => {
      const b = [cx + bx * k, gy + 1], e = [cx + tx * k, gy - ht * H];
      const c = [b, [b[0] + (e[0] - b[0]) * 0.06, gy - ht * H * 0.42], [b[0] + (e[0] - b[0]) * 0.62, gy - ht * H * 0.8], e];
      const w = { 1: [2.4, 0.9], 2: [3.2, 1], 3: [4, 1.1], 4: [5, 1.3] }[a];
      const s = tige(c, w[0], w[1]); s.age = a;
      const cote0 = tx < 0 ? -1 : 1;
      if (a >= 2) {
        const ts = a === 2 ? [0.42, 0.56, 0.7, 0.83] : [0.3, 0.43, 0.56, 0.69, 0.81];
        ts.forEach((t, i) => {
          const cote = i % 2 ? -cote0 : cote0, L = (a === 2 ? 17 : 22) * k * (0.85 + 0.3 * R());
          const r = rameau(s, t, cote, 34 + 10 * R(), L, a === 2 ? 1.2 : 1.6, 0.55, 0.45);
          if (a >= 3) rameau(r, 0.5, -cote, 40, L * 0.45, 0.85, 0.45, 0.5);
          if (a === 4) rameau(r, 0.25, cote, 44, L * 0.35, 0.8, 0.45, 0.5);
          if (courts && a < 4) rameau(r, 0.2, -cote, 70, 3.2, 1.3, 1.1, 0.1);
        });
        if (courts && a < 4) [0.14, 0.22, 0.3].forEach((t, i) => rameau(s, t, i % 2 ? 1 : -1, 70, 3.4, 1.5, 1.3, 0.1));
      }
      return s;
    });
    return { gy, S };
  };
  const dessinBuisson = (z, g) => {
    const o = [h.rect(0, g.gy, z.l, z.h - g.gy - 2, A.hachure('terre', 'aucun'))];
    const vieux = g.S.filter(s => s.age === 4);
    vieux.forEach(s => o.push(rendre(s, 'fantome')));
    g.S.filter(s => s.age < 4).forEach(s => o.push(rendre(s, 'plein')));
    o.push(h.ligne(0, g.gy, z.l, g.gy, A.arete));
    // le chicot de chaque vieille tige, coupé au ras du sol : sa face à plat
    vieux.forEach(s => {
      const p = s.P(0), r = s.w(0) / 2 + 0.6;
      o.push(h.path(`M${r1(p[0] - r)} ${r1(g.gy - 2.6)} L${r1(p[0] - r)} ${r1(g.gy + 1.5)} L${r1(p[0] + r)} ${r1(g.gy + 1.5)} L${r1(p[0] + r)} ${r1(g.gy - 2.6)}`, bD));
      o.push(h.ellipse(p[0], g.gy - 2.6, r, 1.3, bD));
    });
    return o.join(NL);
  };
  const CASSIS = [
    { a: 1, bx: -26, tx: -110, ht: 0.86 },
    { a: 4, bx: -21, tx: -130, ht: 0.58 },
    { a: 3, bx: -16, tx: -84, ht: 0.74 },
    { a: 1, bx: -11, tx: -62, ht: 0.95 },
    { a: 2, bx: -7, tx: -38, ht: 0.86 },
    { a: 1, bx: -2, tx: -12, ht: 1 },
    { a: 2, bx: 3, tx: 13, ht: 0.9 },
    { a: 1, bx: 8, tx: 37, ht: 0.97 },
    { a: 3, bx: 13, tx: 61, ht: 0.8 },
    { a: 2, bx: 18, tx: 85, ht: 0.78 },
    { a: 4, bx: 22, tx: 130, ht: 0.6 },
    { a: 1, bx: 27, tx: 110, ht: 0.84 },
  ];
  const GADELLIER = [
    { a: 2, bx: -26, tx: -106, ht: 0.74 },
    { a: 4, bx: -21, tx: -130, ht: 0.58 },
    { a: 1, bx: -16, tx: -86, ht: 0.9 },
    { a: 3, bx: -10, tx: -60, ht: 0.86 },
    { a: 1, bx: -5, tx: -34, ht: 0.97 },
    { a: 2, bx: 0, tx: -8, ht: 0.92 },
    { a: 3, bx: 6, tx: 18, ht: 0.97 },
    { a: 1, bx: 11, tx: 44, ht: 0.92 },
    { a: 3, bx: 16, tx: 70, ht: 0.84 },
    { a: 4, bx: 21, tx: 130, ht: 0.6 },
    { a: 2, bx: 26, tx: 104, ht: 0.74 },
  ];
  const gCas = z => buisson(z, CASSIS, false, 17);
  const gGad = z => buisson(z, GADELLIER, true, 29);
  // un point sur le flanc d'une tige, côté cote
  const flanc = (s, t, cote, ecart = 1.5) => add(s.P(t), s.N(t), cote * (s.w(t) / 2 + ecart));

  return {
    ref: '99-08',
    titre: 'La taille du cassissier et du gadellier rouge',
    desc: 'La taille de fin d’hiver, selon l’âge du bois. En haut, l’âge d’une tige : d’un an, une '
      + 'tige seule garnie de bourgeons, sans rameau ; de deux ans, elle porte des rameaux d’un an ; de '
      + 'trois ans, les rameaux se ramifient et le vieux bois porte des courts rameaux, où fruite le '
      + 'gadellier rouge ; plus de trois ans, grosse, tordue, l’écorce crevassée : à couper. À côté, en '
      + 'coupe, la coupe au ras du sol : le chicot à plat avec la terre, le bout enlevé au-dessus. En bas, '
      + 'les deux buissons sans feuilles, les tiges de plus de trois ans en tireté, coupées au ras du sol. '
      + 'Le cassissier : 10 à 12 tiges gardées, dont la moitié d’un an, là où il fruite. Le gadellier '
      + 'rouge et le groseillier : trois ou quatre tiges de chaque âge, 9 à 12 tiges.',
    format: 'pleine',
    disposition: [['ages', 'ras'], ['cassis', 'gadellier']],
    hauteurs: [1, 1],
    largeurs: [[3, 1.15], [1, 1]],
    vues: {
      ages: {
        titre: 'L’âge d’une tige, en fin d’hiver',
        dessin: ages,
        renvois: z => {
          const g = gAges(z), [s1, s2, s3, s4] = g.S;
          const sp = g.cour3[g.cour3.length - 1];
          return [
            { n: 1, rond: [g.X[0] + 26, g.gy - 0.3 * g.H], cible: flanc(s1, 0.3, 1, 0.5), texte: 'un an : une tige seule, sans rameau' },
            { n: 2, rond: [g.X[1] - 36, g.gy - 0.12 * g.H], cible: flanc(s2, 0.12, -1), texte: 'deux ans : porte des rameaux d’un an' },
            { n: 3, rond: [g.X[2] - 38, g.gy - 0.08 * g.H], cible: flanc(s3, 0.08, -1), texte: 'trois ans : des rameaux ramifiés' },
            { n: 4, rond: [g.X[2] + 38, g.gy - 0.06 * g.H], cible: sp.P(1), texte: 'court rameau, où fruite le gadellier' },
            { n: 5, rond: [g.X[3] + 36, g.gy - 0.06 * g.H], cible: flanc(s4, 0.05, 1), texte: 'plus de trois ans : à couper' },
          ];
        },
      },
      ras: {
        titre: 'Au ras du sol',
        dessin: ras,
        renvois: z => {
          const g = gRas(z);
          return [{ n: 6, rond: [z.l - 14, g.gy + 34], cible: [g.sx + g.rs * 0.5, g.gy + 1], texte: 'coupe au ras du sol' }];
        },
      },
      cassis: {
        titre: 'Le cassissier : 10 à 12 tiges',
        dessin: z => dessinBuisson(z, gCas(z)),
        renvois: z => {
          const g = gCas(z);
          return [
            { n: 7, rond: [14, 82], cible: flanc(g.S[0], 0.9, -1), texte: 'un an, où fruite le cassis : la moitié' },
            { n: 8, rond: [z.l - 14, g.gy - 34], cible: [g.S[10].P(0)[0] + 3, g.gy - 3], texte: 'plus de trois ans : au ras du sol' },
          ];
        },
      },
      gadellier: {
        titre: 'Le gadellier rouge : 9 à 12 tiges',
        dessin: z => dessinBuisson(z, gGad(z)),
        renvois: z => {
          const g = gGad(z);
          return [
            { n: 9, rond: [16, 30], cible: flanc(g.S[2], 0.86, -1), texte: 'un an : trois ou quatre' },
            { n: 10, rond: [z.l - 14, 56], cible: flanc(g.S[10], 0.78, 1), texte: 'deux ans : trois ou quatre' },
            { n: 11, rond: [z.l - 40, 16], cible: flanc(g.S[8], 0.9, 1), texte: 'trois ans : trois ou quatre' },
            { n: 12, rond: [z.l - 14, g.gy - 34], cible: [g.S[9].P(0)[0] + 3, g.gy - 3], texte: 'plus de trois ans : au ras du sol' },
          ];
        },
      },
    },
  };
};
