// Planche 102-40 — Assouplir la peau : sur le cadre, sur l'arête d'une planche, sur un câble
// tendu, à deux. Chapitre 102, §5-H et « Assouplir seul ».
// 13 oct. : les personnages sont les corps simples (fente-pousse, cable-tire, tire-arriere), leurs
// bras calculés par poserBras pour que les poings tombent sur le bâton ou sur la peau. La charte :
// les arbres en gris loin ; le rouge sur le geste de chaque manière (pousser-relâcher, tirer,
// racler, tirer à deux).
module.exports = (h) => {
  const A = h.a, F = h.formes;
  const W = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const E = 0.08;                       // unités de vue par mm, la même dans toutes les vues de profil
  const mm = v => v * E;
  const f1 = v => Math.round(v * 10) / 10;
  const pt = p => `${f1(p[0])},${f1(p[1])}`;
  const d = pts => 'M' + pts.map(pt).join(' L');

  // courbe fermée ou ouverte par les points (Catmull-Rom), rendue en polyligne fine
  const echant = (P, ferme, n = 8) => {
    const out = [], N = P.length, g = i => ferme ? P[(i + N) % N] : P[Math.max(0, Math.min(N - 1, i))];
    const segs = ferme ? N : N - 1;
    for (let i = 0; i < segs; i++) {
      const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      for (let k = 0; k < n; k++) {
        const t = k / n, t2 = t * t, t3 = t2 * t;
        out.push([0, 1].map(j => 0.5 * ((2 * p1[j]) + (-p0[j] + p2[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t3)));
      }
    }
    if (!ferme) out.push(P[N - 1]);
    return out;
  };

  // la peau à plat, vue de dessus : cou en haut, pattes, queue en bas
  const DEMI0 = [[0.10, -1.00], [0.20, -0.95], [0.25, -0.79], [0.44, -0.75], [0.68, -0.83], [0.84, -0.75], [0.79, -0.64],
    [0.52, -0.53], [0.49, -0.30], [0.54, 0.00], [0.51, 0.30], [0.58, 0.47], [0.80, 0.55], [0.93, 0.70], [0.85, 0.81],
    [0.57, 0.74], [0.34, 0.86], [0.12, 0.98]];
  // la même, tendue sur le cadre : les flancs tirés, les pattes vers les coins
  const TENDUE = [[0.18, -1.00], [0.34, -0.95], [0.46, -0.89], [0.70, -0.94], [0.95, -1.00], [1.00, -0.88], [0.88, -0.72],
    [0.83, -0.40], [0.87, 0.00], [0.84, 0.40], [0.88, 0.70], [1.00, 0.89], [0.95, 1.00], [0.70, 0.94], [0.44, 0.95], [0.22, 1.00]];
  const peauPts = (cx, cy, rx, ry, DEMI = DEMI0) => {
    const gauche = DEMI.slice().reverse().map(([x, y], i) => [-x * (1 + 0.04 * Math.sin(i * 1.7)), y + 0.01 * Math.cos(i)]);
    return echant([...DEMI, ...gauche].map(([x, y]) => [cx + x * rx, cy + y * ry]), true);
  };

  // un tronc d'arbre debout, coupé en haut par le cadre de la vue
  const arbre = (x, haut, sol, l) => {
    const g = [[x - l / 2, haut], [x - l / 2 - 1, sol - 30], [x - l / 2 - 5, sol]];
    const dr = [[x + l / 2 + 5, sol], [x + l / 2 + 1, sol - 30], [x + l / 2, haut]];
    const out = [h.chemin([...g, ...dr], A.loin, true),
      h.path(`M${pt(g[0])} L${pt(g[1])} Q${pt([x - l / 2 - 1, sol - 6])} ${pt(g[2])}`, A.arete),
      h.path(`M${pt(dr[2])} L${pt(dr[1])} Q${pt([x + l / 2 + 1, sol - 6])} ${pt(dr[0])}`, A.arete)];
    for (let y = haut + 8, i = 0; y < sol - 12; y += 17, i++) {
      const xx = x - l / 2 + 4 + ((i * 7) % Math.max(4, l - 8));
      out.push(h.ligne(xx, y, xx + 0.6, y + 9, A.fin));
    }
    return out.join('\n');
  };
  const sol = (x0, x1, y) => [h.rect(x0, y, x1 - x0, 9, A.hachure('terre', 'aucun')), h.ligne(x0, y, x1, y, A.arete)].join('\n');
  // une perche vue de long (bande blanche), de a à b, diamètre dp
  const perche = (a, b, dp) => {
    const u = [(b[0] - a[0]), (b[1] - a[1])], L = Math.hypot(...u), n = [-u[1] / L * dp / 2, u[0] / L * dp / 2];
    return [h.chemin([[a[0] + n[0], a[1] + n[1]], [b[0] + n[0], b[1] + n[1]], [b[0] - n[0], b[1] - n[1]], [a[0] - n[0], a[1] - n[1]]], W(A.arete), true),
      h.ligne(a[0] + n[0] * 0.3 + u[0] / L * 6, a[1] + n[1] * 0.3 + u[1] / L * 6, b[0] + n[0] * 0.3 - u[0] / L * 6, b[1] + n[1] * 0.3 - u[1] / L * 6, A.fin)].join('\n');
  };
  const EM = E * 1.6;                  // les mains un peu plus grandes que nature, pour se lire
  // une main qui serre une poignée de peau : le dos de la main vers nous, les doigts autour
  const poing = (x, y, o = {}) => Object.assign({ x, y, pose: 'prise', vue: 'dos', diametre: 3.4, echelle: EM }, o);
  // la poignée de peau dans le poing, dans l'axe de la prise : sort au-dessus et au-dessous de la main.
  // vers : le bout qui part vers la cible ; queue : celui qui pend
  const poignee = (m, cible) => {
    const a = m.trou.axe, L = 8.5, c = [m.trou.x, m.trou.y];
    const A1 = [c[0] + a[0] * L, c[1] + a[1] * L], B1 = [c[0] - a[0] * L, c[1] - a[1] * L];
    const dA = Math.hypot(A1[0] - cible[0], A1[1] - cible[1]), dB = Math.hypot(B1[0] - cible[0], B1[1] - cible[1]);
    const [vers, queue] = dA < dB ? [A1, B1] : [B1, A1];
    const n = [-a[1] * 1.7, a[0] * 1.7];
    const svg = h.chemin([[A1[0] + n[0], A1[1] + n[1]], [B1[0] + n[0], B1[1] + n[1]], [B1[0] - n[0], B1[1] - n[1]], [A1[0] - n[0], A1[1] - n[1]]], W(A.detail), true);
    return { vers, queue, svg };
  };
  const peau = at => W(at);             // la peau : blanche, contour franc
  // ─── les corps simples ─────────────────────────────────────────────────────────────────
  // Les bras d'un corps simple, calculés pour que chaque poing tombe sur sa cible (unités de vue),
  // l'axe de la prise donné en degrés écran. Le corps regarde vers +x ; pour un corps tourné vers la
  // gauche, poserBras le calcule en miroir autour de o.x et rend les mêmes angles.
  const RAD = Math.PI / 180;
  const poserBras = (o, cibles, axes, coudes = {}) => {
    const g = o.cote === 'gauche', X0 = o.x;
    const oo = Object.assign({}, o, { cote: 'droite' });
    const c = F.corps(oo), ang = Object.assign({}, o.angles || {});
    const angDe = v => Math.atan2(v[0], v[1]) / RAD, dirDe = a => [Math.sin(a * RAD), Math.cos(a * RAD)];
    for (const k of ['P', 'L']) {
      let C = cibles[k]; if (!C) continue;
      let ax = axes[k];
      if (g) { C = [2 * X0 - C[0], C[1]]; ax = 180 - ax; }
      const S = c.articulations['epaule' + k], E_ = c.articulations['coude' + k], Wr = c.articulations['poignet' + k], Mn = c['main' + k];
      const lb = Math.hypot(E_[0] - S[0], E_[1] - S[1]), la = Math.hypot(Wr[0] - E_[0], Wr[1] - E_[1]);
      const hv = [Mn.x - Wr[0], Mn.y - Wr[1]], lm = Math.hypot(...hv);
      const off = angDe(hv) - angDe([Math.cos(Mn.axe * RAD), Math.sin(Mn.axe * RAD)]);
      let best = null;
      for (const main of [180 - ax, -ax, 360 - ax]) {
        const h2 = dirDe(main + off).map(v => v * lm), W_ = [C[0] - h2[0], C[1] - h2[1]];
        const d = [W_[0] - S[0], W_[1] - S[1]], D = Math.min(Math.hypot(...d), lb + la - 0.01);
        const a0 = angDe(d), B = Math.acos(Math.max(-1, Math.min(1, (lb * lb + D * D - la * la) / (2 * lb * D)))) / RAD;
        const bras = a0 + (coudes[k] === 'avant' ? 1 : -1) * B;
        const e = [S[0] + lb * Math.sin(bras * RAD), S[1] + lb * Math.cos(bras * RAD)];
        const ab = angDe([W_[0] - e[0], W_[1] - e[1]]);
        const pli = Math.abs(((main - ab) % 360 + 540) % 360 - 180);
        if (!best || pli < best.pli) best = { pli, bras, ab, main };
      }
      ang['bras' + k] = best.bras; ang['avantbras' + k] = best.ab; ang['main' + k] = best.main;
    }
    return ang;
  };
  // le poing d'un corps simple, sous la forme qu'attend poignee() : sa place et l'axe de la prise
  const poingDe = (c, k) => { const m = c['main' + k]; return { trou: { x: m.x, y: m.y, axe: [Math.cos(m.angle * RAD), Math.sin(m.angle * RAD)] } }; };
  const versDeg = (a, b) => Math.atan2(b[1] - a[1], b[0] - a[0]) / RAD;
  const bord = 2.4;                     // la peau vue par la tranche

  // ─── le cadre, de face ─────────────────────────────────────────────────────────────────
  const cadreFace = z => {
    const G = z.h - 12, cx = z.l / 2, dp = 8;
    const xg = cx - mm(950), xd = cx + mm(950), yh = G - mm(2250), yb = G - mm(250);
    const out = [sol(8, z.l - 8, G), arbre(cx, 0, G, mm(300))];
    // la peau et ses trous
    const P = peauPts(cx, (yh + yb) / 2 + 1, (xd - xg) / 2 - 11, (yb - yh) / 2 - 11, TENDUE);
    const trous = [];
    for (let i = 4; i < P.length; i += 11) {
      const p = P[i], v = [cx - p[0], (yh + yb) / 2 - p[1]], l = Math.hypot(...v);
      trous.push([p[0] + v[0] / l * 4.5, p[1] + v[1] / l * 4.5]);
    }
    // chaque trou va à la perche la plus proche ; laçage en spirale, côté par côté
    const cotes = { h: [], b: [], g: [], d: [] };
    for (const t of trous) {
      const dist = { h: t[1] - yh, b: yb - t[1], g: t[0] - xg, d: xd - t[0] };
      const c = Object.keys(dist).reduce((a, b) => dist[a] < dist[b] ? a : b);
      cotes[c].push(t);
    }
    const devant = [], derriere = [];
    const r = dp / 2 + 0.5;
    for (const [c, liste] of Object.entries(cotes)) {
      const horiz = c === 'h' || c === 'b';
      liste.sort((a, b) => horiz ? a[0] - b[0] : a[1] - b[1]);
      liste.forEach((t, i) => {
        const s = (horiz ? t[0] : t[1]) + 5;
        const pc = horiz ? [s, c === 'h' ? yh : yb] : [c === 'g' ? xg : xd, s];
        const sens = c === 'h' || c === 'g' ? -1 : 1;
        const ext = horiz ? [pc[0] + 1.5, pc[1] + sens * r] : [pc[0] + sens * r, pc[1] + 1.5];
        const int = horiz ? [pc[0] - 1.5, pc[1] - sens * r] : [pc[0] - sens * r, pc[1] - 1.5];
        devant.push({ pts: [t, int, ext], ep: 1.5, debut: 'ouvert', fin: 'ouvert' });
        if (i < liste.length - 1) derriere.push({ pts: [int, liste[i + 1]], ep: 1.5, debut: 'ouvert', fin: 'ouvert' });
      });
    }
    out.push(F.cordes(derriere, { trait: 'detail' }));
    // les perches : les traverses derrière, les montants devant
    out.push(perche([xg - 16, yh], [xd + 16, yh], dp), perche([xg - 16, yb], [xd + 16, yb], dp));
    out.push(perche([xg, yh - 14], [xg, G], dp), perche([xd, yh - 14], [xd, G], dp));
    // les ligatures de babiche aux quatre coins
    const lig = [];
    for (const [x, y] of [[xg, yh], [xd, yh], [xg, yb], [xd, yb]])
      for (const k of [-3, 0, 3]) lig.push({ pts: [[x - 6 + k, y - 6 - k], [x + 6 + k, y + 6 - k]], ep: 1.8, debut: 'ouvert', fin: 'ouvert' });
    out.push(F.cordes(lig, { trait: 'detail' }));
    out.push(h.chemin(P, peau(A.arete), true));
    out.push(...trous.map(t => h.cercle(t[0], t[1], 1.3, A.fin)));
    // les plis de tension qui partent de chaque trou vers le milieu
    for (const t of trous) {
      const v = [cx - t[0], (yh + yb) / 2 - t[1]], l = Math.hypot(...v), u = [v[0] / l, v[1] / l];
      for (const a of [-0.35, 0.35]) {
        const c = Math.cos(a), sn = Math.sin(a), w = [u[0] * c - u[1] * sn, u[0] * sn + u[1] * c];
        out.push(h.chemin([[t[0] + w[0] * 3, t[1] + w[1] * 3], [t[0] + w[0] * 11, t[1] + w[1] * 11]], A.fin));
      }
    }
    out.push(F.cordes(devant, { trait: 'detail' }));
    return { svg: out.join('\n'), xg, xd, yh, yb, cx, G, P };
  };

  // ─── le cadre, de côté : le bâton pousse la peau ───────────────────────────────────────
  const cadreCote = z => {
    const G = z.h - 12, xT = z.l - 30;
    const hTop = G - mm(2250), hBas = G - mm(250);
    const T = [xT - mm(150) - 4.5, hTop], B = [T[0] - mm(1100), hBas];   // traverse du haut contre l'arbre
    const u = [T[0] - B[0], T[1] - B[1]], L = Math.hypot(...u), ux = u[0] / L, uy = u[1] / L;
    const nx = -uy, ny = ux;                          // normale vers l'arbre (+x)
    const P = t => [B[0] + ux * t, B[1] + uy * t];
    const out = [sol(8, z.l - 4, G), arbre(xT, 0, G, mm(300))];
    // le montant du fond, du sol jusqu'au-dessus de la traverse du haut
    const pied = P(-(G - hBas) / -uy);
    out.push(perche([pied[0], G], P(L + 18), 8));
    // la peau par la tranche, lacée aux deux traverses, poussée en V par le bout du bâton
    const hHaut = P(L - 22), hBas2 = P(24), mid = P(L * 0.46), pousse = 18;
    // bâton presque à l'horizontale, qui descend un peu vers les mains
    const dl = Math.hypot(1, 0.55), dir = [-1 / dl, 0.55 / dl];   // perpendiculaire au cadre
    const apex = [mid[0] - dir[0] * pousse, mid[1] - dir[1] * pousse];
    const pe = [hHaut, [apex[0] - 3 * ux, apex[1] - 3 * uy], [apex[0] + 3 * ux, apex[1] + 3 * uy], hBas2];
    const tipR = 2.4;
    const bout = [apex[0] + dir[0] * (tipR + bord / 2), apex[1] + dir[1] * (tipR + bord / 2)];
    const queue = [bout[0] + dir[0] * mm(1150), bout[1] + dir[1] * mm(1150)];
    const bv = [queue[0] - bout[0], queue[1] - bout[1]], bl = Math.hypot(...bv), bu = [bv[0] / bl, bv[1] / bl], bn = [-bu[1] * tipR, bu[0] * tipR];
    const baton = h.path(`M${pt([bout[0] + bn[0], bout[1] + bn[1]])} L${pt([queue[0] + bn[0], queue[1] + bn[1]])} L${pt([queue[0] - bn[0], queue[1] - bn[1]])} L${pt([bout[0] - bn[0], bout[1] - bn[1]])} A${tipR},${tipR} 0 0 1 ${pt([bout[0] + bn[0], bout[1] + bn[1]])} Z`, W(A.arete));
    const lacH = [P(L - 22), [T[0] - nx * 2, T[1] - ny * 2]], lacB = [P(24), [B[0], B[1]]];
    out.push(F.cordes([{ pts: [lacH[0], [T[0] + 4 * ux - 3, T[1] + 4], T], ep: 1.8, debut: 'ouvert', fin: 'ouvert' },
      { pts: [lacB[0], [B[0] + 3, B[1] - 4], B], ep: 1.8, debut: 'ouvert', fin: 'ouvert' }], { trait: 'detail' }));
    out.push(h.cercle(T[0], T[1], 4.5, A.hachure('bois', 'arete')), h.cercle(B[0], B[1], 4.5, A.hachure('bois', 'arete')));
    out.push(h.path(`M${pt(pe[0])} L${pt(pe[1])} Q${pt(apex)} ${pt(pe[2])} L${pt(pe[3])}`, `fill="none" stroke="#1A1A1A" stroke-width="${bord}" stroke-linecap="round" stroke-linejoin="round"`));
    // le personnage : les deux mains sur le bâton
    const main1 = [bout[0] + bu[0] * mm(700), bout[1] + bu[1] * mm(700)];
    const main2 = [bout[0] + bu[0] * mm(980), bout[1] + bu[1] * mm(980)];
    // le corps simple (pose « fente-pousse »), les deux poings sur le bâton : la main proche derrière,
    // la main loin devant ; le bâton passe devant le poing loin et dans le poing proche
    const aB = versDeg(queue, bout);
    const oC = { x: main1[0] - mm(900), y: G, pose: 'fente-pousse', echelle: E };
    const pers = F.corps(Object.assign(oC, { angles: poserBras(oC, { P: main2, L: main1 }, { P: aB, L: aB }), objetP: baton }));
    out.push(String(pers));
    // le geste : pousser, relâcher
    const fl = [bout[0] + bu[0] * mm(330), bout[1] + bu[1] * mm(330) - 11];
    out.push(h.geste(`M${pt([fl[0] + bu[0] * 18, fl[1] + bu[1] * 18])} L${pt([fl[0] - bu[0] * 8, fl[1] - bu[1] * 8])}`, { double: true }));
    return { svg: out.join('\n'), apex, bout, T, B, mid, pers, queue, main1 };
  };

  // ─── le câble tendu entre deux arbres, de face ─────────────────────────────────────────
  const Y_CABLE = G => G - mm(1350);
  const cordeFace = z => {
    const G = z.h - 12, yC = Y_CABLE(G), xa = 20, xb = z.l - 20, lt = mm(300);
    const out = [sol(4, z.l - 4, G), arbre(xa, 0, G, lt), arbre(xb, 0, G, lt)];
    // le câble et ses tours autour des troncs
    const brins = [{ pts: [[xa + lt / 2 - 1, yC - 1], [(xa + xb) / 2, yC + 2], [xb - lt / 2 + 1, yC - 1]], ep: 2.6, debut: 'ouvert', fin: 'ouvert' }];
    for (const [x, s] of [[xa, 1], [xb, -1]]) for (const k of [-3.2, 0.8])
      brins.push({ pts: [[x - lt / 2 - 0.5, yC + k - 3 * s], [x + lt / 2 + 0.5, yC + k + 3 * s]], ep: 2.6, debut: 'ouvert', fin: 'ouvert' });
    out.push(F.cordes(brins, { trait: 'arete' }));
    // la peau à cheval : la moitié qui pend de notre côté, pliée sur le câble
    const cx = (xa + xb) / 2, lg = mm(780);
    const pend = [[cx - lg, yC + 1], [cx - lg - 3, yC + 22], [cx - lg + 2, yC + 44], [cx - lg - 8, yC + 58], [cx - lg - 4, yC + 66],
      [cx - lg + 14, yC + 64], [cx - 10, yC + 72], [cx + 6, yC + 80], [cx + 20, yC + 71], [cx + lg - 14, yC + 64],
      [cx + lg + 4, yC + 67], [cx + lg + 7, yC + 57], [cx + lg - 2, yC + 44], [cx + lg + 3, yC + 22], [cx + lg, yC + 1]];
    const bordPeau = echant(pend, false, 6);
    const pli = `M${pt([cx - lg, yC + 1])} C${pt([cx - lg, yC - 6])} ${pt([cx - lg + 6, yC - 6])} ${pt([cx - lg + 10, yC - 5])} L${pt([cx + lg - 10, yC - 5])} C${pt([cx + lg - 6, yC - 6])} ${pt([cx + lg, yC - 6])} ${pt([cx + lg, yC + 1])}`;
    out.push(h.path(pli + ' L' + bordPeau.slice().reverse().map(pt).join(' L') + ' Z', peau(A.arete)));
    out.push(h.ligne(cx - lg + 10, yC - 1.5, cx + lg - 10, yC - 1.5, A.fin));
    return { svg: out.join('\n'), yC, xa, xb, cx, lg, G };
  };

  // ─── le câble, vu du bout : la peau en boucle, tirée d'une main puis de l'autre ──────────
  const cordeBout = z => {
    const G = z.h - 12, yC = Y_CABLE(G), xc = z.l - 60, rc = 3;
    const out = [sol(4, z.l - 4, G)];
    const rb = rc + bord / 2 + 0.3;
    // les deux mains : la haute plus près, la basse plus bas
    const mH = [xc - mm(600), yC - mm(60)], mB = [xc - mm(480), yC + mm(400)];
    // le corps simple (pose « cable-tire ») : la main proche haute, la main loin basse ; chaque poing
    // serre la peau dans l'axe de la boucle
    const oB = { x: xc - mm(1260), y: G, pose: 'cable-tire', echelle: E };
    const pers = F.corps(Object.assign(oB, { angles: poserBras(oB, { P: mH, L: mB }, { P: versDeg(mH, [xc, yC - rb]), L: versDeg(mB, [xc, yC + rb]) }) }));
    const mp = poingDe(pers, 'P'), ml = poingDe(pers, 'L');
    const gH = poignee(mp, [xc, yC]), gB = poignee(ml, [xc, yC]);
    const hp = gH.vers, hl = gB.vers, qH = gH.queue, qB = gB.queue;
    const trait = `fill="none" stroke="#1A1A1A" stroke-width="${bord}" stroke-linecap="round" stroke-linejoin="round"`;
    // la boucle : de la main haute par-dessus le câble, autour, et revient sous le câble à la main basse
    const haut = [xc, yC - rb], bas = [xc, yC + rb];
    const boucle = `M${pt(hp)} L${pt(haut)} A${rb},${rb} 0 0 1 ${pt(bas)} L${pt(hl)}`;
    // les bouts qui pendent sous les poings
    const pendH = `M${pt(qH)} C${pt([qH[0] - 1, qH[1] + 10])} ${pt([qH[0] + 1, qH[1] + 20])} ${pt([qH[0] - 1, qH[1] + 30])}`;
    const pendB = `M${pt(qB)} C${pt([qB[0] + 1, qB[1] + 8])} ${pt([qB[0] + 3, qB[1] + 16])} ${pt([qB[0] + 1, qB[1] + 24])}`;
    out.push(h.path(boucle, trait), h.path(pendH, trait), h.path(pendB, trait), gH.svg, gB.svg);
    out.push(String(pers));
    out.push(h.cercle(xc, yC, rc, `fill="#1A1A1A" stroke="none"`));
    // le va-et-vient
    const f1a = [xc - 14, yC - rb - 8], f1b = [xc - 38, yC - rb - 7];
    const uB = [xc - hl[0], (yC + rb) - hl[1]], lB = Math.hypot(...uB), vB = [uB[0] / lB, uB[1] / lB];
    const f2a = [hl[0] + vB[0] * 10 + vB[1] * 8, hl[1] + vB[1] * 10 - vB[0] * 8 + 14], f2b = [f2a[0] + vB[0] * 22, f2a[1] + vB[1] * 22];
    out.push(h.geste(`M${pt(f1a)} L${pt(f1b)}`), h.fleche(`M${pt(f2a)} L${pt(f2b)}`));
    return { svg: out.join('\n'), xc, yC, hp, hl, pers };
  };

  // ─── l'arête d'une planche plantée ─────────────────────────────────────────────────────
  const planche = z => {
    const G = z.h - 12, xp = z.l - 40, ep = 7, hautP = G - mm(950);
    const out = [sol(4, z.l - 4, G)];
    // la planche vue par le bout ; le bout enterré en tireté
    out.push(h.path(`M${pt([xp - ep / 2, G])} L${pt([xp - ep / 2, hautP + ep / 2])} A${ep / 2},${ep / 2} 0 0 1 ${pt([xp + ep / 2, hautP + ep / 2])} L${pt([xp + ep / 2, G])} Z`, A.hachure('bois', 'arete')));
    out.push(h.path(`M${pt([xp - ep / 2, G])} L${pt([xp - ep / 2, z.h])} M${pt([xp + ep / 2, G])} L${pt([xp + ep / 2, z.h])}`, A.cache));
    const trait = `fill="none" stroke="#1A1A1A" stroke-width="${bord}" stroke-linecap="round" stroke-linejoin="round"`;
    // les mains tirent la peau vers soi, par-dessus l'arête
    const mP = [xp - mm(430), hautP + mm(260)];
    // le corps simple (pose « tire-arriere »), les deux poings l'un contre l'autre sur la peau
    const oP = { x: xp - mm(950), y: G, pose: 'tire-arriere', echelle: E };
    const axP = versDeg(mP, [xp, hautP]);
    const pers = F.corps(Object.assign(oP, { angles: poserBras(oP, { P: mP, L: [mP[0] + 3, mP[1] - 3] }, { P: axP, L: axP }) }));
    const mp = poingDe(pers, 'P'), rb = ep / 2 + bord / 2;
    const gP = poignee(mp, [xp, hautP]), gL = poignee(poingDe(pers, 'L'), [xp, hautP]), hp = gP.vers, q = gP.queue;
    const peauD = `M${pt(hp)} L${pt([xp - rb, hautP + ep / 2])} A${rb},${rb} 0 0 1 ${pt([xp + rb, hautP + ep / 2])} C${pt([xp + rb + 4, hautP + 18])} ${pt([xp + rb + 12, hautP + 38])} ${pt([xp + rb + 10, hautP + 58])}`;
    const pend = `M${pt(q)} C${pt([q[0] + 2, q[1] + 10])} ${pt([q[0] + 4, q[1] + 20])} ${pt([q[0] + 3, q[1] + 30])}`;
    out.push(gL.svg, h.path(pend, trait), h.path(peauD, trait), gP.svg, String(pers));
    const v = [hp[0] - (xp - rb), hp[1] - hautP], l = Math.hypot(...v), u = [v[0] / l, v[1] / l];
    const a = [xp - rb + u[0] * 6 - u[1] * 7, hautP + u[1] * 6 + u[0] * 7 - 2];
    out.push(h.geste(`M${pt(a)} L${pt([a[0] + u[0] * 20, a[1] + u[1] * 20])}`));
    return { svg: out.join('\n'), xp, hautP, hp };
  };

  // ─── à deux ────────────────────────────────────────────────────────────────────────────
  const deux = z => {
    const G = z.h - 12, cx = z.l / 2, y = G - mm(1000), demi = mm(800);
    const out = [sol(4, z.l - 4, G)];
    const trait = `fill="none" stroke="#1A1A1A" stroke-width="${bord}" stroke-linecap="round" stroke-linejoin="round"`;
    // deux corps simples (pose « tire-arriere »), face à face, l'un tourné vers la gauche
    const oG = { x: cx - demi - mm(620), y: G, pose: 'tire-arriere', echelle: E };
    const oD = { x: cx + demi + mm(620), y: G, pose: 'tire-arriere', echelle: E, cote: 'gauche' };
    const g = F.corps(Object.assign(oG, { angles: poserBras(oG, { P: [cx - demi - 4, y + 2], L: [cx - demi + 2, y] }, { P: 0, L: 0 }) }));
    const d2 = F.corps(Object.assign(oD, { angles: poserBras(oD, { P: [cx + demi + 4, y + 2], L: [cx + demi - 2, y] }, { P: 0, L: 0 }) }));
    const tg = poignee(poingDe(g, 'P'), [cx, y]), td = poignee(poingDe(d2, 'P'), [cx, y]);
    const lg = poignee(poingDe(g, 'L'), [cx, y]), ld = poignee(poingDe(d2, 'L'), [cx, y]);
    const pg = tg.vers, pd = td.vers, qg = tg.queue, qd = td.queue;
    out.push(lg.svg, ld.svg);
    out.push(h.path(`M${pt(qg)} C${pt([qg[0] - 2, qg[1] + 10])} ${pt([qg[0] + 1, qg[1] + 18])} ${pt([qg[0] - 1, qg[1] + 28])}`, trait));
    out.push(h.path(`M${pt(qd)} C${pt([qd[0] + 2, qd[1] + 10])} ${pt([qd[0] - 1, qd[1] + 18])} ${pt([qd[0] + 1, qd[1] + 28])}`, trait));
    out.push(h.path(`M${pt(pg)} Q${pt([cx, (pg[1] + pd[1]) / 2 + 1])} ${pt(pd)}`, trait), tg.svg, td.svg);
    out.push(String(g), String(d2));
    out.push(h.geste(`M${pt([cx - 40, y - 9])} L${pt([cx + 40, y - 9])}`, { double: true }));
    return { svg: out.join('\n'), cx, y, pg, pd };
  };

  // ─── le sens : du centre vers les bords ────────────────────────────────────────────────
  const sens = z => {
    const cx = z.l / 2, cy = z.h / 2 + 2, ry = z.h / 2 - 14, rx = ry * 0.62;
    const P = peauPts(cx, cy, rx, ry);
    const out = [h.chemin(P, peau(A.arete), true)];
    for (let k = 0; k < 8; k++) {
      const a = k * Math.PI / 4 + Math.PI / 8;
      const c = Math.cos(a), s = Math.sin(a);
      out.push(h.fleche(`M${pt([cx + c * 7, cy + s * 7])} L${pt([cx + c * (rx * 0.62), cy + s * (ry * 0.62)])}`, A.detail));
    }
    return { svg: out.join('\n'), cx, cy, rx, ry };
  };

  const cache = {};
  const FN = { cadreFace, cadreCote, cordeFace, cordeBout, planche, deux, sens };
  const vue = nom => z => { const k = `${nom}:${z.l}:${z.h}`; return cache[k] || (cache[k] = FN[nom](z)); };

  return {
    ref: '102-40',
    titre: 'Assouplir la peau : cadre, arête, câble, à deux',
    desc: 'Quatre manières de travailler la peau sans arrêt pendant qu’elle sèche : lacée sur un cadre et poussée au bâton, raclée sur l’arête d’une planche plantée, frottée en boucle sur un câble tendu entre deux arbres, tirée à deux du centre vers les bords. Chaque personnage est de profil, les deux poings sur le bâton ou sur la peau ; le geste de chacun en flèche rouge ; les arbres en gris.',
    format: 'pleine',
    disposition: [['cadreFace', 'cadreCote'], ['cordeFace', 'cordeBout'], ['planche', 'deux', 'sens']],
    hauteurs: [1.25, 1, 1],
    largeurs: [[1, 1], [1.1, 0.9], [0.8, 1.5, 0.6]],
    vues: {
      cadreFace: { titre: 'Le cadre, de face',
        dessin: z => vue('cadreFace')(z).svg,
        renvois: z => { const c = vue('cadreFace')(z); return [
          { n: 1, rond: [c.xg - 22, c.yh + 22], cible: [c.xg - 2, c.yh + 2], texte: 'perches liées à la babiche' },
          { n: 2, rond: [c.xd + 22, (c.yh + c.yb) / 2], cible: [c.xd - 14, (c.yh + c.yb) / 2 - 4], texte: 'peau lacée tout le tour' },
        ]; } },
      cadreCote: { titre: 'Le cadre, de côté',
        dessin: z => vue('cadreCote')(z).svg,
        renvois: z => { const c = vue('cadreCote')(z); return [
          { n: 3, rond: [c.main1[0] - 4, c.main1[1] - 40], cible: [c.bout[0] - 1, c.bout[1] - 3], texte: 'pousser au bâton à bout rond' },
        ]; } },
      cordeFace: { titre: 'Le câble tendu, de face',
        dessin: z => vue('cordeFace')(z).svg,
        renvois: z => { const c = vue('cordeFace')(z); return [
          { n: 4, rond: [c.xa + 36, c.yC - 22], cible: [c.xa + 28, c.yC], texte: 'câble d’acier tendu' },
          { n: 5, rond: [c.cx, c.yC - 24], cible: [c.cx, c.yC - 5], texte: 'peau à cheval sur le câble' },
        ]; } },
      cordeBout: { titre: 'Le câble, vu du bout',
        dessin: z => vue('cordeBout')(z).svg,
        renvois: z => { const c = vue('cordeBout')(z); return [
          { n: 6, rond: [c.xc + 18, c.yC - 24], cible: [c.xc - 16, c.yC - 12], texte: 'tirer une main, puis l’autre' },
        ]; } },
      planche: { titre: 'L’arête d’une planche',
        dessin: z => vue('planche')(z).svg,
        renvois: z => { const c = vue('planche')(z); return [
          { n: 7, rond: [c.xp + 20, c.hautP + 40], cible: [c.xp + 2, c.hautP + 50], texte: 'planche plantée de chant' },
          { n: 8, rond: [c.xp + 14, c.hautP - 26], cible: [c.xp + 1, c.hautP - 1.6], texte: 'racler sur l’arête' },
        ]; } },
      deux: { titre: 'À deux',
        dessin: z => vue('deux')(z).svg,
        renvois: z => { const c = vue('deux')(z); return [
          { n: 9, rond: [c.cx, c.y - 30], cible: [c.cx, c.y - 1], texte: 'chacun tire de son côté' },
        ]; } },
      sens: { titre: 'Le sens',
        dessin: z => vue('sens')(z).svg,
        renvois: z => { const c = vue('sens')(z); return [
          { n: 10, rond: [c.cx + c.rx + 2, c.cy - c.ry * 0.28], cible: [c.cx + c.rx * 0.45, c.cy + c.ry * 0.2], texte: 'du centre vers les bords' },
        ]; } },
    },
  };
};
