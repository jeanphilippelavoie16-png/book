// Planche 97-04 — Le tunnel de perches (chapitre 97, §5-E étapes 31 à 33, et §9 « Le tunnel sans
// plastique acheté ») : « Un fil de fer n° 9 de 165 cm, planté par ses deux bouts, fait un arceau
// d'environ 90 cm de base et 35 cm de haut. Des perches d'aulne ou d'épinette pliées font la même
// chose. Un arceau aux 90 cm à 1,5 m, plus serrés là où le vent frappe. » — « Enterrer ou lester trois
// côtés ; le quatrième, celui qu'on ouvre, se leste de pierres ou de sacs de terre qu'on enlève. » —
// « Arceaux de perches d'aulne ou d'épinette écorcées, pliées fraîches ; une perche faîtière liée sur
// le dessus contre le vent. » — « Des trous de 5 cm tous les 60 à 90 cm dans les côtés […] Les soirs
// de gel, on ferme tout : trous bouchés d'une motte ou d'une pierre plate. »
// Vue 1 : le tunnel monté, en perspective, du côté qu'on ouvre. Vue 2 : l'arceau de fil, droit
// (1650 mm) puis planté, de bout, avec le plastique enterré d'un bord et lesté de l'autre. Vue 3 :
// de côté, l'espacement des arceaux (900 mm au vent, 1500 mm ailleurs) et des trous (600 à 900 mm).
// Vue 4 : la faîtière liée sur un arceau. Vues 5 et 6 : un trou de 50 mm, ouvert puis bouché.
// Ce qui ne sert qu'au dessin, sans cote : le diamètre des perches (36 mm), la longueur du tunnel,
// la hauteur du talus de terre, la taille des pierres, la façon de lier (en croix). La profondeur
// plantée du fil (≈ 195 mm par bout) sort du calcul : 1650 moins le demi-ellipse de 900 × 350.
module.exports = (h) => {
  const r1 = v => Math.round(v * 10) / 10;
  const PI = Math.PI;
  const plein = t => t.replace('fill="none"', 'fill="#fff"');
  const dp = (pts, ferme = false) => pts.map((p, i) => `${i ? 'L' : 'M'} ${r1(p[0])} ${r1(p[1])}`).join(' ') + (ferme ? ' Z' : '');
  const lisse = (pts, ferme = false) => {
    const n = pts.length, get = i => (ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))]);
    let d = `M ${r1(pts[0][0])} ${r1(pts[0][1])}`;
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = get(i - 1), p1 = get(i), p2 = get(i + 1), p3 = get(i + 2);
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C ${r1(c1[0])} ${r1(c1[1])} ${r1(c2[0])} ${r1(c2[1])} ${r1(p2[0])} ${r1(p2[1])}`;
    }
    return d + (ferme ? ' Z' : '');
  };
  const alea = k => { const x = Math.sin(k * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  const enveloppe = P => {
    const p = P.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
    const lo = [], up = [];
    for (const q of p) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop(); lo.push(q); }
    for (const q of p.slice().reverse()) { while (up.length >= 2 && cr(up[up.length - 2], up[up.length - 1], q) <= 0) up.pop(); up.push(q); }
    return lo.slice(0, -1).concat(up.slice(0, -1));
  };
  // les deux bords d'une bande de largeur w autour d'une polyligne d'écran
  const decale = (pts, w) => {
    const n = pts.length, G = [], D = [];
    for (let i = 0; i < n; i++) {
      const a = pts[Math.max(0, i - 1)], b = pts[Math.min(n - 1, i + 1)];
      let tx = b[0] - a[0], ty = b[1] - a[1];
      const L = Math.hypot(tx, ty) || 1; tx /= L; ty /= L;
      G.push([pts[i][0] - ty * w / 2, pts[i][1] + tx * w / 2]);
      D.push([pts[i][0] + ty * w / 2, pts[i][1] - tx * w / 2]);
    }
    return { G, D };
  };
  const bande = (pts, w, trait = h.a.arete) => {
    const { G, D } = decale(pts, w);
    return h.path(dp([...G, ...D.slice().reverse()], true), plein(trait));
  };
  const feuille = (a, b, lg = 0.3, trait = plein(h.a.detail)) => {
    const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, nx = -(b[1] - a[1]) * lg, ny = (b[0] - a[0]) * lg;
    return h.path(`M ${r1(a[0])} ${r1(a[1])} Q ${r1(mx + nx)} ${r1(my + ny)} ${r1(b[0])} ${r1(b[1])} Q ${r1(mx - nx)} ${r1(my - ny)} ${r1(a[0])} ${r1(a[1])} Z`, trait);
  };
  // un jeune plant : tige et quatre feuilles ; M(x, y, z) donne le point d'écran
  const plante = (M, X, Y, H, trait = plein(h.a.detail)) => {
    const out = [h.path(dp([M(X, Y, 0), M(X, Y, H)]), h.a.detail)];
    [0.4, 0.62, 0.8, 0.97].forEach((f, i) => {
      const a = i * 2.4 + 0.6, L = 85 * (1 - 0.12 * i);
      out.push(feuille(M(X, Y, H * f), M(X + L * Math.cos(a), Y + L * Math.sin(a), H * f + 0.35 * L), 0.3, trait));
    });
    return out.join('\n');
  };

  // ── vecteurs et projection orthogonale : X le long du tunnel, Y en travers (+ vers le fond), Z en haut
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  const mul = (a, k) => [a[0] * k, a[1] * k, a[2] * k];
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const norm = a => mul(a, 1 / Math.hypot(...a));
  const vue3d = (TH, PH) => {
    const t = TH * PI / 180, p = PH * PI / 180;
    const R = [Math.cos(t), -Math.sin(t), 0];
    const U = [Math.sin(p) * Math.sin(t), Math.sin(p) * Math.cos(t), Math.cos(p)];
    const C = [-Math.sin(t) * Math.cos(p), -Math.cos(t) * Math.cos(p), Math.sin(p)];   // vers l'œil
    return { pr: q => [dot(q, R), -dot(q, U)], prof: q => dot(q, C), C };
  };
  const cadrer = (z, pts3, pr, m) => {
    const P2 = pts3.map(pr);
    const xs = P2.map(p => p[0]), ys = P2.map(p => p[1]);
    const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
    const L = z.l - m.g - m.d, H = z.h - m.h - m.b;
    const s = Math.min(L / (x1 - x0), H / (y1 - y0));
    const ox = m.g + (L - (x1 - x0) * s) / 2 - x0 * s, oy = m.h + (H - (y1 - y0) * s) / 2 - y0 * s;
    return { s, Q: q => { const [a, b] = pr(q); return [r1(ox + a * s), r1(oy + b * s)]; } };
  };
  // repère d'une vue plane : y vers le haut, centré dans la zone
  const repere = (z, xmin, xmax, ymin, ymax, mx = 6, my = 6) => {
    const s = Math.min((z.l - 2 * mx) / (xmax - xmin), (z.h - 2 * my) / (ymax - ymin));
    const ox = z.l / 2 - (xmin + xmax) / 2 * s, oy = z.h / 2 + (ymin + ymax) / 2 * s;
    const P = (x, y) => [r1(ox + x * s), r1(oy - y * s)];
    return { s, P, Pl: pts => pts.map(p => P(...p)) };
  };

  // ── Le tunnel, en mm
  const A = 450, HT = 350;                   // demi-base et hauteur de l'arceau
  const RP = 18, OFF = 24;                   // rayon de perche (dessin) ; le plastique posé dessus
  const ARCS = [0, 900, 1800, 3300];         // 900 au vent (à gauche), 1500 ailleurs
  const LONG = 3300, CAP = 350;              // le plastique descend en pente jusqu'au sol aux deux bouts
  const TROUS = [450, 1200, 1950, 2700];
  const PIERRES = [[150, 125], [700, 100], [1250, 120], [2950, 125]];
  const SACS = [1600, 2300];
  const PLANTS = [420, 1330, 2150, 2800];
  const YB = -(A + OFF), YF = -650, HB = 130;
  const ZTROU = 170, TT = Math.asin(ZTROU / (HT + OFF));
  const ZFAITE = HT + RP, ZPLAST = HT + 2 * RP + 8;

  const arcPt = (X, t, off = 0) => [X, -(A + off) * Math.cos(t), (HT + off) * Math.sin(t)];
  const talus = (x0, x1, y0, y1, long, graine) => {
    const pts = [];
    for (let i = 0; i <= 12; i++) for (let j = 0; j <= 8; j++) {
      const u = i / 12, v = j / 8, bosse = HB * Math.sin(PI * v) * Math.pow(Math.sin(PI * (0.04 + 0.92 * u)), 0.35) * (0.82 + 0.3 * alea(i * 13 + graine));
      pts.push(long ? [x0 + (x1 - x0) * u, y0 + (y1 - y0) * v, bosse] : [x0 + (x1 - x0) * v, y0 + (y1 - y0) * u, bosse]);
    }
    return pts;
  };

  const vueEnsemble = z => {
    const V = vue3d(24, 17);
    const XF = LONG + CAP + 290;
    const tFond = talus(-640, XF, 480, 780, true, 1), tBoutFond = talus(LONG + CAP - 10, XF, -610, 780, false, 2);
    const tBout = talus(-640, -330, -610, 780, false, 3);
    const bornes = [...tFond, ...tBoutFond, ...tBout, [LONG / 2, 0, ZPLAST], [-640, -700, 0], [XF, -700, 0]];
    const { s, Q } = cadrer(z, bornes, V.pr, { g: 30, d: 6, h: 24, b: 28 });
    const out = [];
    const tas = pts => { const d = lisse(enveloppe(pts.map(Q)), true); return h.path(d, 'fill="#fff" stroke="none"') + '\n' + h.path(d, h.a.hachure('terre', 'arete')); };
    // 1. la terre pelletée du fond et du bout du fond, derrière le plastique
    out.push(tas(tFond), tas(tBoutFond));
    // 2. le plastique, clair : un voile blanc sur ce qui est derrière
    const env = [];
    for (const X of [0, LONG]) for (let i = 0; i <= 24; i++) env.push(arcPt(X, PI * i / 24, OFF));
    env.push([-15, 0, ZPLAST], [LONG + 15, 0, ZPLAST]);
    for (const X of [-CAP, LONG + CAP]) for (const Y of [YB, -YB]) env.push([X, Y, 0]);
    const sil = enveloppe(env.map(Q));
    out.push(h.path(dp(sil, true), 'fill="#fff" fill-opacity="0.8" stroke="none"'));
    // 3. les plants du rang
    const M = (x, y, zz) => Q([x, y, zz]);
    PLANTS.forEach(X => out.push(plante(M, X, 0, 190)));
    // 4. les arceaux, du plus loin au plus proche
    const arceau = X => { const pts = []; for (let i = 0; i <= 40; i++) pts.push(Q(arcPt(X, PI * i / 40))); return bande(pts, 2 * RP * s); };
    ARCS.slice().sort((a, b) => V.prof([b, 0, 0]) - V.prof([a, 0, 0])).forEach(X => out.push(arceau(X)));
    // 5. la faîtière sur le dessus, liée à chaque arceau
    out.push(bande([Q([-15, 0, ZFAITE]), Q([LONG + 15, 0, ZFAITE])], 2 * RP * s));
    for (const X of ARCS) {
      const zt = ZFAITE + RP;
      out.push(h.path(dp([Q([X - 30, -30, zt]), Q([X + 30, 30, zt])]), h.a.detail));
      out.push(h.path(dp([Q([X - 30, 30, zt]), Q([X + 30, -30, zt])]), h.a.detail));
    }
    // 6. les plis du plastique aux deux bouts, puis son contour
    for (const t of [0.45, 0.95, 1.5, 2.05, 2.6]) out.push(h.path(dp([Q(arcPt(0, t, OFF)), Q([-CAP, -(A + OFF) * Math.cos(t), 0])]), h.a.fin));
    for (const t of [0.95, 2.05]) out.push(h.path(dp([Q(arcPt(LONG, t, OFF)), Q([LONG + CAP, -(A + OFF) * Math.cos(t), 0])]), h.a.fin));
    out.push(h.path(dp(sil, true), h.a.arete));
    // 7. les trous d'aération, dans le côté
    const trou = X => {
      const c = arcPt(X, TT, OFF), tg = norm([0, (A + OFF) * Math.sin(TT), (HT + OFF) * Math.cos(TT)]);
      const pts = [];
      for (let k = 0; k < 24; k++) { const f = 2 * PI * k / 24; pts.push(Q(add(c, add([25 * Math.cos(f), 0, 0], mul(tg, 25 * Math.sin(f)))))); }
      return h.path(dp(pts, true), plein(h.a.arete));
    };
    TROUS.forEach(X => out.push(trou(X)));
    // 8. le rabat du plastique sur le sol, du côté qu'on ouvre
    const rabat = [];
    for (let X = -CAP + 80; X <= LONG + CAP - 80; X += 275) rabat.push(Q([X, YF + 14 * (alea(X) - 0.5), 0]));
    out.push(h.path(lisse(rabat), h.a.detail));
    // 9. pierres et sacs de terre sur le rabat, du plus loin au plus proche
    const pierre = (X, r, k) => {
      const Y = -560, pts = [];
      for (let a = 0; a < 14; a++) for (const el of [0, 0.6, 1.1, PI / 2]) {
        const rr = r * (0.82 + 0.36 * alea(k * 31 + a)), az = 2 * PI * a / 14;
        pts.push([X + rr * 1.15 * Math.cos(az) * Math.cos(el), Y + rr * 0.75 * Math.sin(az) * Math.cos(el), r * 0.8 * Math.sin(el)]);
      }
      const facette = [Q([X - 0.45 * r, Y - 0.55 * r, 0.35 * r]), Q([X - 0.05 * r, Y - 0.25 * r, 0.72 * r]), Q([X + 0.55 * r, Y - 0.1 * r, 0.6 * r])];
      return h.path(lisse(enveloppe(pts.map(Q)), true), plein(h.a.arete)) + '\n' + h.path(lisse(facette), h.a.fin);
    };
    const sac = X => {
      const Y = -555, pts = [], se = v => Math.sign(v) * Math.pow(Math.abs(v), 0.45);
      for (let a = 0; a < 24; a++) for (const el of [0, 0.5, 1.0, PI / 2]) {
        const az = 2 * PI * a / 24, ce = Math.pow(Math.cos(el), 0.5);
        pts.push([X + 200 * se(Math.cos(az)) * ce, Y + 115 * se(Math.sin(az)) * ce, 115 * Math.sin(el)]);
      }
      pts.push([X + 285, Y, 55], [X + 300, Y - 25, 70], [X + 300, Y + 25, 70]);
      const lien = [Q([X + 245, Y - 30, 45]), Q([X + 250, Y - 5, 75])];
      const pli = [Q([X + 235, Y - 60, 90]), Q([X + 120, Y - 70, 112]), Q([X - 60, Y - 75, 115])];
      return [h.path(lisse(enveloppe(pts.map(Q)), true), plein(h.a.arete)), h.ligne(...lien[0], ...lien[1], h.a.detail), h.path(lisse(pli), h.a.fin)].join('\n');
    };
    const objets = [...PIERRES.map(([X, r], k) => ({ X, f: () => pierre(X, r, k + 1) })), ...SACS.map(X => ({ X, f: () => sac(X) }))];
    objets.sort((a, b) => V.prof([a.X, -560, 0]) - V.prof([b.X, -560, 0])).forEach(o => out.push(o.f()));
    // 10. la terre pelletée du bout, devant
    out.push(tas(tBout));
    const geste = {
      arceau: Q(arcPt(900, 0.75)), faite: Q([2550, 0, ZFAITE + RP]), plastique: Q([-175, -162, 176]),
      terre: Q([-480, -100, HB * 0.95]), pierre: Q([1250, -600, 80]), trou: Q(arcPt(1950, TT, OFF)),
    };
    return { svg: out.join('\n'), geste };
  };

  // ── L'arceau de fil, de bout (Y en travers, Z en haut)
  const DEMI = (() => {
    let L = 0, p = [A, 0];
    for (let i = 1; i <= 600; i++) { const t = PI * i / 600, q = [A * Math.cos(t), HT * Math.sin(t)]; L += Math.hypot(q[0] - p[0], q[1] - p[1]); p = q; }
    return L;
  })();
  const PATTE = (1650 - DEMI) / 2;
  const vueBout = z => {
    const R = repere(z, -2450, 1400, -400, 480, 4, 4);
    const { P, Pl, s } = R;
    const out = [];
    const OFB = 32;
    // le sol
    out.push(h.chemin(Pl([[-830, 0], [790, 0], [790, -250], [-830, -250]]), h.a.hachure('terre', 'aucun'), true));
    out.push(h.ligne(...P(-830, 0), ...P(790, 0), h.a.arete));
    // le fil planté : deux pattes dans le sol, l'arceau dessus
    for (const sg of [-1, 1]) {
      out.push(h.ligne(...P(sg * A, 0), ...P(sg * A, -PATTE), 'fill="none" stroke="#fff" stroke-width="5"'));
      out.push(h.ligne(...P(sg * A, 0), ...P(sg * A, -PATTE), h.a.contour));
    }
    const arc = [];
    for (let i = 0; i <= 48; i++) { const t = PI * i / 48; arc.push(P(-A * Math.cos(t), HT * Math.sin(t))); }
    out.push(h.path(lisse(arc), h.a.contour));
    // le plastique : par-dessus, rabattu sur le sol des deux côtés
    const pl = [P(-700, 5), P(-A - OFB, 5)];
    for (let i = 1; i < 48; i++) { const t = PI * i / 48; pl.push(P(-(A + OFB) * Math.cos(t), (HT + OFB) * Math.sin(t))); }
    pl.push(P(A + OFB, 5), P(730, 5));
    out.push(h.path(dp(pl), h.a.detail));
    // un plant sous l'arceau
    out.push(plante((x, y, zz) => P(y + 0.35 * x, zz + 0.22 * x), 0, -120, 200));
    // à gauche : le bord enterré sous la terre pelletée ; à droite : le bord qu'on ouvre, sous une pierre
    const talusG = lisse([[-810, 0], [-760, 55], [-680, 112], [-590, 130], [-525, 100], [-485, 45], [-A - OFB - 2, 0]].map(p => P(...p))) + ' Z';
    out.push(h.path(talusG, 'fill="#fff" stroke="none"'), h.path(talusG, h.a.hachure('terre', 'arete')));
    out.push(h.path(lisse([[520, 6], [528, 62], [570, 104], [640, 100], [690, 60], [700, 6]].map(p => P(...p))) + ' Z', h.a.hachure('pierre', 'arete')));
    // à gauche : le fil droit, avant de le plier
    const XF0 = -2400, XF1 = XF0 + 1650, ZF = 230;
    out.push(h.ligne(...P(XF0, ZF), ...P(XF1, ZF), h.a.contour));
    out.push(h.ligne(...P(XF0, ZF + 25), ...P(XF0, ZF + 110), h.a.fin), h.ligne(...P(XF1, ZF + 25), ...P(XF1, ZF + 110), h.a.fin));
    out.push(h.cote(...P(XF0, ZF + 85), ...P(XF1, ZF + 85), '1 650 mm'));
    const f0 = P(XF1 + 60, ZF + 40), fc = P(-560, 470), f1 = P(-300, HT + 20);
    out.push(h.fleche(`M ${f0.join(' ')} Q ${fc.join(' ')} ${f1.join(' ')}`, h.a.arete));
    // les cotes de l'arceau
    for (const sg of [-1, 1]) out.push(h.ligne(...P(sg * A, -PATTE - 15), ...P(sg * A, -330), h.a.fin));
    out.push(h.cote(...P(-A, -305), ...P(A, -305), '≈ 900 mm', { cote: 'dessous' }));
    out.push(h.path(dp([P(30, HT), P(900, HT)]), h.a.fin));
    out.push(h.cote(...P(860, 0), ...P(860, HT), '≈ 350 mm', { cote: 'droite' }));
    return { svg: out.join('\n'), P, s, geste: { patte: P(A, -PATTE * 0.6) } };
  };

  // ── De côté : l'espacement (X le long du tunnel, Z en haut)
  const vueCote = z => {
    const R = repere(z, -1500, LONG + 680, -330, 640, 4, 2);
    const { P, Pl, s } = R;
    const out = [];
    out.push(h.chemin(Pl([[-700, 0], [LONG + 680, 0], [LONG + 680, -70], [-700, -70]]), h.a.hachure('terre', 'aucun'), true));
    out.push(h.ligne(...P(-700, 0), ...P(LONG + 680, 0), h.a.arete));
    // les arceaux, vus par la tranche, et la faîtière dessus
    for (const X of ARCS) out.push(bande([P(X, 0), P(X, HT)], 2 * RP * s));
    out.push(bande([P(-15, ZFAITE), P(LONG + 15, ZFAITE)], 2 * RP * s));
    // le plastique
    out.push(h.path(dp(Pl([[-CAP, 0], [0, ZPLAST + 12], [LONG, ZPLAST + 12], [LONG + CAP, 0]])), h.a.arete));
    // les trous
    for (const X of TROUS) out.push(h.ellipse(...P(X, ZTROU), Math.max(25 * s, 2.8), Math.max(21 * s, 2.4), plein(h.a.detail)));
    // la terre pelletée aux deux bouts
    const bosse = (x0, x1) => { const pts = []; for (let i = 0; i <= 12; i++) pts.push(P(x0 + (x1 - x0) * i / 12, HB * Math.sin(PI * i / 12) * (0.85 + 0.25 * alea(i + x0)))); const d = lisse(pts) + ' Z'; return h.path(d, 'fill="#fff" stroke="none"') + '\n' + h.path(d, h.a.hachure('terre', 'arete')); };
    out.push(bosse(-640, -330), bosse(LONG + CAP - 20, LONG + CAP + 290));
    // pierres et sacs, au pied du côté qu'on ouvre
    const blob = (x0, x1, ht, k) => {
      const pts = [[x0, 0]];
      for (let i = 1; i < 8; i++) { const u = i / 8; pts.push([x0 + (x1 - x0) * u, ht * Math.pow(Math.sin(PI * u), 0.7) * (0.85 + 0.3 * alea(k * 7 + i))]); }
      pts.push([x1, 0]);
      return h.path(lisse(pts.map(p => P(...p))) + ' Z', plein(h.a.arete));
    };
    PIERRES.forEach(([X, r], k) => out.push(blob(X - 1.1 * r, X + 1.1 * r, 0.8 * r, k)));
    SACS.forEach((X, k) => out.push(blob(X - 205, X + 300, 115, k + 20)));
    // le vent, du côté où les arceaux sont serrés
    for (const zv of [140, 300]) out.push(h.fleche(`M ${P(-1450, zv).join(' ')} C ${P(-1250, zv + 40).join(' ')} ${P(-1100, zv - 40).join(' ')} ${P(-780, zv).join(' ')}`, h.a.arete));
    // les cotes
    for (const X of [0, 900, 1800, 3300]) out.push(h.ligne(...P(X, ZPLAST + 40), ...P(X, 560), h.a.fin));
    out.push(h.cote(...P(0, 530), ...P(900, 530), '900 mm'));
    out.push(h.cote(...P(1800, 530), ...P(3300, 530), '1 500 mm'));
    for (const X of [1950, 2700]) out.push(h.ligne(...P(X, ZTROU - 40), ...P(X, -190), h.a.fin));
    out.push(h.cote(...P(1950, -165), ...P(2700, -165), '600 à 900 mm', { cote: 'dessous' }));
    return { svg: out.join('\n'), P, s };
  };

  // ── La faîtière sur un arceau, liée en croix (repère local : l'axe de l'arceau à Z = 0 au sommet)
  const vueLiure = z => {
    const V = vue3d(0, 64);
    const rp = 20, zr = 2 * rp, c = 4.5, e = 10, ext = 130, exa = 85;
    const archZ = Y => -(HT - HT * Math.sqrt(1 - (Y / A) ** 2));
    const bornes = [];
    for (const sx of [-1, 1]) for (const sy of [-1, 1]) for (const sz of [-1, 1]) {
      bornes.push([sx * ext, sy * rp, zr + sz * rp], [sx * rp, sy * exa, archZ(exa) + sz * rp]);
    }
    const { s, Q } = cadrer(z, bornes, V.pr, { g: 6, d: 26, h: 8, b: 6 });
    const tube = (axe, r) => {
      const S = axe.map(Q), { G, D } = decale(S, 2 * r * s);
      const bouts = [0, axe.length - 1].map(i => {
        const d = norm(sub(axe[i], axe[i === 0 ? 1 : axe.length - 2]));
        const a = norm(cross(d, Math.abs(d[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0])), b = cross(d, a);
        const pts = [];
        for (let k = 0; k < 36; k++) { const f = 2 * PI * k / 36; pts.push(Q(add(axe[i], add(mul(a, r * Math.cos(f)), mul(b, r * Math.sin(f)))))); }
        const cerne = [];
        for (let k = 0; k < 36; k++) { const f = 2 * PI * k / 36; cerne.push(Q(add(axe[i], add(mul(a, 0.55 * r * Math.cos(f)), mul(b, 0.55 * r * Math.sin(f)))))); }
        return { pts, cerne, centre: Q(axe[i]), vis: dot(d, V.C) > 0 };
      });
      const ell = b => h.path(dp(b.pts, true), plein(h.a.arete));
      const reflet = decale(S, 2 * r * s * 0.45).G;
      return [
        ...bouts.filter(b => !b.vis).map(ell),
        h.path(dp([...G, ...D.slice().reverse()], true), 'fill="#fff" stroke="none"'),
        h.path(dp(G), h.a.arete), h.path(dp(D), h.a.arete), h.path(dp(reflet.slice(1, -1)), h.a.fin),
        ...bouts.filter(b => b.vis).map(b => [ell(b), h.path(dp(b.cerne, true), h.a.fin), h.cercle(...b.centre, 1, h.a.plein)].join('\n')),
      ].join('\n');
    };
    const arceau = [], faite = [];
    for (let i = 0; i <= 16; i++) { const Y = -exa + 2 * exa * i / 16; arceau.push([0, Y, archZ(Y)]); }
    for (let i = 0; i <= 8; i++) faite.push([-ext + 2 * ext * i / 8, 0, zr]);
    // la ficelle : deux jeux de trois tours en diagonale, le second par-dessus le premier
    const vis = n => dot(n, V.C) > 0;
    const couches = [[], [], []];
    for (const sg of [1, -1]) for (const k of [-1, 0, 1]) {
      const kx = k * e * Math.SQRT2;
      const dessus = [];
      for (let j = 0; j <= 20; j++) {
        const f = -PI / 2 + PI * j / 20, Y = (rp + c) * Math.sin(f);
        dessus.push({ p: [sg * Y + kx, Y, zr + (rp + c) * Math.cos(f)], n: [0, Math.sin(f), Math.cos(f)], dessus: true });
      }
      const queue = q0 => [0.35, 0.7, 1].map(f => ({ p: [q0[0], q0[1], zr - f * 1.1 * rp], n: [Math.sign(q0[0]) || 1, 0, 0] }));
      const suite = [...queue(dessus[0].p).reverse(), ...dessus, ...queue(dessus[dessus.length - 1].p)];
      const couche = q => (q.dessus ? (vis(q.n) ? 2 : 1) : (vis(q.n) ? (q.p[1] > 0 ? 1 : 2) : 0));
      let cour = null, seg = [];
      suite.forEach((q, i) => {
        const cc = couche(q);
        if (cc !== cour) { if (seg.length) { seg.push(q.p); couches[cour].push(seg); } seg = i ? [suite[i - 1].p] : []; cour = cc; }
        seg.push(q.p);
      });
      couches[cour].push(seg);
    }
    const ficelle = seg => bande(seg.map(Q), 2 * c * s, h.a.detail);
    const out = [];
    couches[0].forEach(sg => out.push(ficelle(sg)));
    out.push(tube(arceau, rp));
    couches[1].forEach(sg => out.push(ficelle(sg)));
    out.push(tube(faite, rp));
    couches[2].forEach(sg => out.push(ficelle(sg)));
    return { svg: out.join('\n'), geste: { noeud: Q([0, 0, zr + rp + c]), arceau: Q([0, -exa * 0.7, archZ(exa * 0.7) + rp]) } };
  };

  // ── Un trou d'aération, en coupe dans le côté (Y en travers, dehors à gauche ; Z en haut)
  const vueTrou = (z, etat) => {
    const R = repere(z, -730, -130, -70, 345, 4, 4);
    const { P, Pl, s } = R;
    const out = [];
    const AP = A + 20, HP = HT + 20;                               // le plastique, posé sur l'arceau
    const pp = t => [-AP * Math.cos(t), HP * Math.sin(t)];
    const tAt = (t0, ds) => {
      let t = t0, L = 0; const dt = Math.sign(ds) * 0.0004;
      while (L < Math.abs(ds)) { const a = pp(t), b = pp(t + dt); L += Math.hypot(b[0] - a[0], b[1] - a[1]); t += dt; }
      return t;
    };
    const tc = Math.asin(ZTROU / HP), t1 = tAt(tc, -25), t2 = tAt(tc, 25), tfin = Math.acos(140 / AP);
    const gc = pp(tc);
    const tg = (() => { const v = [AP * Math.sin(tc), HP * Math.cos(tc)], L = Math.hypot(...v); return [v[0] / L, v[1] / L]; })();
    const nx = [-tg[1], tg[0]];                                    // vers dehors (à gauche, un peu en haut)
    const loc = (u, v) => [gc[0] + tg[0] * u + nx[0] * v, gc[1] + tg[1] * u + nx[1] * v];
    const arc = (a, b) => { const pts = []; for (let i = 0; i <= 24; i++) pts.push(P(...pp(a + (b - a) * i / 24))); return pts; };
    // le sol
    out.push(h.chemin(Pl([[-730, 0], [-130, 0], [-130, -60], [-730, -60]]), h.a.hachure('terre', 'aucun'), true));
    out.push(h.ligne(...P(-730, 0), ...P(-130, 0), h.a.arete));
    // le plant, dedans
    out.push(plante((x, y, zz) => P(y + 0.35 * x, zz + 0.22 * x), 0, -230, 215));
    // le plastique : rabattu sur le sol, monté jusqu'au trou ; puis du trou jusqu'au haut de la vue
    out.push(h.path(dp([P(-705, 12), P(-AP - 6, 12), ...arc(0.03, t1)]), h.a.arete));
    out.push(h.path(dp(arc(t2, tfin)), h.a.arete));
    // la pierre sur le rabat
    out.push(h.path(lisse([[-690, 14], [-684, 62], [-645, 100], [-585, 108], [-540, 76], [-527, 14]].map(p => P(...p))) + ' Z', plein(h.a.arete)));
    out.push(h.path(lisse([P(-660, 45), P(-620, 85), P(-565, 88)]), h.a.fin));
    if (etat === 'jour') {
      const e1 = pp(t1), e2 = pp(t2), o = 55;
      const q = (e, k) => P(e[0] + nx[0] * k, e[1] + nx[1] * k);
      for (const e of [e1, e2]) out.push(h.path(dp([q(e, 10), q(e, o + 16)]), h.a.fin));
      out.push(h.path(dp([q(e1, o), q(e2, o)]), h.a.detail));
      for (const e of [e1, e2]) { const [x, y] = q(e, o); out.push(h.path(dp([[x - 3.5, y + 3.5], [x + 3.5, y - 3.5]]), h.a.detail)); }
      const [tx, ty] = q(gc, o + 14);
      out.push(h.texte(tx - 4, ty + 4, 'Ø 50 mm', { ancre: 'end', lisere: true }));
    } else {
      // la motte enfoncée dans le trou : plus grosse dehors, l'herbe dehors
      const m = [];
      for (let k = 0; k < 14; k++) {
        const f = 2 * PI * k / 14, r = 0.86 + 0.28 * alea(k + 40);
        m.push(P(...loc(46 * Math.cos(f) * r, (Math.sin(f) > 0 ? 58 : 26) * Math.sin(f) * r)));
      }
      out.push(h.path(lisse(m, true), 'fill="#fff" stroke="none"'), h.path(lisse(m, true), h.a.hachure('terre', 'arete')));
      for (const [u, L, bi] of [[-26, 60, 0.9], [-10, 78, 0.6], [6, 70, 0.35], [22, 55, 0.1]]) {
        const b0 = loc(u, 50 - Math.abs(u) * 0.35), dir = [nx[0] * (1 - bi) + 0 * bi, nx[1] * (1 - bi) + bi];
        const L2 = Math.hypot(...dir), t = [b0[0] + dir[0] / L2 * L, b0[1] + dir[1] / L2 * L];
        const cm = [b0[0] + dir[0] / L2 * L * 0.5, b0[1] + dir[1] / L2 * L * 0.5 + 12];
        out.push(h.path(`M ${P(...b0).join(' ')} Q ${P(...cm).join(' ')} ${P(...t).join(' ')}`, h.a.detail));
      }
    }
    return { svg: out.join('\n'), P, s, geste: { motte: P(...loc(-8, 34)) } };
  };

  const memo = {};
  const vue = (id, f) => z => { const k = `${id}:${z.l}x${z.h}`; if (!memo[k]) memo[k] = f(z); return memo[k]; };
  const ensemble = vue('ensemble', vueEnsemble), bout = vue('bout', vueBout), cote = vue('cote', vueCote);
  const liure = vue('liure', vueLiure), jour = vue('jour', z => vueTrou(z, 'jour')), nuit = vue('nuit', z => vueTrou(z, 'nuit'));

  return {
    ref: '97-04',
    titre: 'Le tunnel de perches',
    desc: 'Un tunnel bas sur un rang de plants : des arceaux de perches d’aulne écorcées, pliées fraîches et plantées par les deux bouts, une perche faîtière liée en croix sur chaque arceau, un plastique clair par-dessus, enterré sous la terre pelletée sur trois côtés et lesté de pierres et de sacs de terre du côté qu’on ouvre. L’arceau de fil de fer n° 9 : 1650 mm droit, planté par ses deux bouts, il fait environ 900 mm de base et 350 mm de haut. Arceaux aux 900 mm du côté du vent, jusqu’à 1500 mm ailleurs ; trous de 50 mm tous les 600 à 900 mm dans les côtés, bouchés d’une motte les soirs de gel.',
    format: 'pleine',
    disposition: [['ensemble'], ['bout'], ['cote'], ['liure', 'jour', 'nuit']],
    hauteurs: [2.1, 1.45, 1.0, 1.35],
    vues: {
      ensemble: {
        titre: 'Monté, vu du côté qu’on ouvre',
        dessin: z => ensemble(z).svg,
        renvois: z => {
          const { geste: g } = ensemble(z);
          return [
            { n: 1, rond: [g.arceau[0] - 30, 11], cible: g.arceau, texte: 'arceau : perche d’aulne écorcée, pliée fraîche' },
            { n: 2, rond: [g.faite[0] + 30, 11], cible: g.faite, texte: 'perche faîtière liée sur chaque arceau' },
            { n: 3, rond: [11, g.plastique[1] - 30], cible: g.plastique, texte: 'plastique clair : rideau de douche, bâche' },
            { n: 4, rond: [11, g.terre[1] + 26], cible: g.terre, texte: 'bords enterrés sous la terre pelletée' },
            { n: 5, rond: [g.pierre[0] - 20, z.h - 11], cible: g.pierre, texte: 'côté qu’on ouvre : pierres, sacs de terre' },
            { n: 6, rond: [g.trou[0] + 30, z.h - 11], cible: g.trou, texte: 'trous d’aération dans les côtés' },
          ];
        },
      },
      bout: {
        titre: 'L’arceau de fil n° 9 : droit, puis plié et planté',
        dessin: z => bout(z).svg,
        renvois: z => {
          const { geste: g } = bout(z);
          return [{ n: 7, rond: [g.patte[0] + 40, g.patte[1] + 8], cible: g.patte, texte: 'le fil planté par ses deux bouts' }];
        },
      },
      cote: {
        titre: 'De côté : l’espacement',
        dessin: z => cote(z).svg,
        renvois: z => {
          const { P } = cote(z);
          return [{ n: 8, rond: [P(1350, 560)[0], 11], cible: P(900, 260), texte: 'arceaux plus serrés du côté du vent' }];
        },
      },
      liure: {
        titre: 'Sur chaque arceau',
        dessin: z => liure(z).svg,
        renvois: z => {
          const { geste: g } = liure(z);
          return [{ n: 9, rond: [z.l - 12, 12], cible: g.noeud, texte: 'la faîtière posée dessus, liée en croix' }];
        },
      },
      jour: {
        titre: 'Un trou d’aération, en coupe',
        dessin: z => jour(z).svg,
        renvois: [],
      },
      nuit: {
        titre: 'Les soirs de gel',
        dessin: z => nuit(z).svg,
        renvois: z => {
          const { geste: g } = nuit(z);
          return [{ n: 10, rond: [14, 14], cible: g.motte, texte: 'une motte enfoncée, ou une pierre plate' }];
        },
      },
    },
  };
};
