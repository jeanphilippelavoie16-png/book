// Planche 26-40. Appuyer sur la plaie, puis la laver.
// Chapitre 26, étape 6 (repères 1 et 2 : la paume sur la plaie, de tout son poids, bras tendus), étape 7 (3 à 5 : le
// sang traverse, la première compresse reste, une seule autre par-dessus, appuyer plus fort), étape 8 (6 à 8 : la plaie
// profonde bourrée de gaze tassée au fond au doigt ganté, puis l'appui), étape 24 (9 à 12 : rincer au jet d'eau
// bouillie refroidie, bouteille souple percée d'un trou d'épingle, sans frotter, jusqu'à ne plus voir de saleté).
// Les mesures du dessin sont celles d'un corps d'adulte, en cm, mises à l'échelle s (px/cm).
//
// Reprise du 26 octobre 2026, aux règles du tome 1 :
// - toutes les mains passent par h.formes.mainStock (mainSimple est retiré : JP, « c'est pas beau en criss ») ; une main
//   de la bibliothèque ne se déforme jamais ; l'avant-bras continue la coupe du poignet et sort de la vue ;
// - Appuyer et Le sang traverse : sans personnage (la tête n'apprend rien), de côté, la cuisse de la hanche au genou
//   posée au sol ; deux mains 1-08 sans leur tige, à plat, paume vers la compresse (on voit le dos de la main), l'une
//   sur l'autre, celle du dessous en gris loin ; la main 1-08 a les doigts relevés : penchée de son angle de contact,
//   elle touche la compresse du talon de la main et du bout des doigts, et les avant-bras montent vers l'épaule ;
// - Plaie profonde : la coupe gardée (chair tramée, fémur en hachure croisée, vignette du blessé et trait de coupe) ;
//   le doigt ganté est la main 4-02 (l'index tendu) retournée, la manchette du gant posée sur le poignet ;
// - Laver : gros plan, la bouteille souple bouchon en bas dans le poing 1-09 (sans son manche), pincée par le poing ;
//   toute l'eau en bleu (h.a.hachure('eau')) : l'eau dans la bouteille, le jet, les gouttes, l'eau qui coule ;
// - l'encadré danger sort (le chapitre le dit à l'étape 6) ; plus de vue « Sans bouteille » ni de repères 13 à 16 :
//   le chapitre n'en parle plus et n'appelle que les repères 1 à 12.
module.exports = (h) => {
  const F = h.formes;
  const path = require('path');
  const CAT = require(path.join(__dirname, '../../.claude/skills/planches/scripts/mains/stock/catalogue.json'));
  const f = v => (+v).toFixed(1);
  const pt = p => `${f(p[0])},${f(p[1])}`;
  const RAD = Math.PI / 180;
  const BL = h.a.blanc.split(' ')[0];
  const plein = t => t.replace('fill="none"', BL);
  const lisse = (P, t) => {
    if (t <= P[0][0]) return P[0][1];
    for (let i = 0; i < P.length - 1; i++) {
      const [t0, w0] = P[i], [t1, w1] = P[i + 1];
      if (t <= t1) { const q = (1 - Math.cos(Math.PI * (t - t0) / (t1 - t0))) / 2; return w0 + (w1 - w0) * q; }
    }
    return P[P.length - 1][1];
  };
  // le poids des corps simples (1,5) pour la cuisse, celui des mains de la bibliothèque (1,5) pour les avant-bras
  const CORPS = h.a.arete.replace('stroke-width="1.4"', 'stroke-width="1.5"');
  const GRIS = '#E6E6E6';
  const sol = (z, yg) => [h.rect(0, yg, z.l, 8, h.a.hachure('terre', 'aucun')), h.ligne(0, yg, z.l, yg, h.a.arete)].join('\n');
  // ce qui dépasse de la vue (un avant-bras qui sort du cadre) est coupé net au bord
  const decoupe = (id, z, contenu) => `<clipPath id="rogne-26-40-${id}"><rect x="0" y="0" width="${f(z.l)}" height="${f(z.h)}" fill="none"/></clipPath>\n<g clip-path="url(#rogne-26-40-${id})">\n${contenu}\n</g>`;

  // ─── Les mains de la bibliothèque : leur contour, lu dans le catalogue, en fractions de leur boîte ────────────────
  const echantillonner = (d, n = 8) => {
    const tok = d.match(/[MLCQZHVmlcqzhv]|-?\d*\.?\d+(?:e-?\d+)?/g), out = [];
    let i = 0, cmd = '', cur = [0, 0], st = [0, 0], sp = null;
    const num = () => +tok[i++];
    while (i < tok.length) {
      if (/[A-Za-z]/.test(tok[i])) cmd = tok[i++];
      const rel = cmd === cmd.toLowerCase(), C = cmd.toUpperCase(), o = rel ? cur : [0, 0];
      if (C === 'M') { cur = [o[0] + num(), o[1] + num()]; st = cur; sp = [cur]; out.push(sp); cmd = rel ? 'l' : 'L'; }
      else if (C === 'L') { cur = [o[0] + num(), o[1] + num()]; sp.push(cur); }
      else if (C === 'H') { cur = [(rel ? cur[0] : 0) + num(), cur[1]]; sp.push(cur); }
      else if (C === 'V') { cur = [cur[0], (rel ? cur[1] : 0) + num()]; sp.push(cur); }
      else if (C === 'C') {
        const p1 = [o[0] + num(), o[1] + num()], p2 = [o[0] + num(), o[1] + num()], p3 = [o[0] + num(), o[1] + num()], p0 = cur;
        for (let k = 1; k <= n; k++) { const t = k / n, m = 1 - t; sp.push([0, 1].map(j => m * m * m * p0[j] + 3 * m * m * t * p1[j] + 3 * m * t * t * p2[j] + t * t * t * p3[j])); }
        cur = p3;
      } else if (C === 'Q') {
        const p1 = [o[0] + num(), o[1] + num()], p2 = [o[0] + num(), o[1] + num()], p0 = cur;
        for (let k = 1; k <= n; k++) { const t = k / n, m = 1 - t; sp.push([0, 1].map(j => m * m * p0[j] + 2 * m * t * p1[j] + t * t * p2[j])); }
        cur = p2;
      } else if (C === 'Z') { cur = st; sp.push(st); }
      else throw new Error(`26-40 : commande de chemin inconnue ${cmd}`);
    }
    return out;
  };
  const CONTOURS = {};
  const contour = id => {
    if (CONTOURS[id]) return CONTOURS[id];
    const M = CAT[id], [x0, y0, x1, y1] = M.boite, W = x1 - x0, H = y1 - y0;
    const ch = M.chemins.find(c => c.role === 'main');
    return (CONTOURS[id] = echantillonner(ch.d)[0].map(p => [(p[0] - x0) / W, (p[1] - y0) / H]));
  };
  // les y (axe 'x') ou les x (axe 'y') où une droite x = v ou y = v coupe le contour de la main, triés
  const coupe = (id, axe, v) => {
    const P = contour(id), r = [], [a, b] = axe === 'x' ? [0, 1] : [1, 0];
    for (let i = 0; i < P.length - 1; i++) {
      const p = P[i], q = P[i + 1];
      if (p[a] !== q[a] && (p[a] - v) * (q[a] - v) <= 0) r.push(p[b] + (q[b] - p[b]) * (v - p[a]) / (q[a] - p[a]));
    }
    return r.sort((m, n) => m - n);
  };
  // La pose d'une main : P passe d'un point de sa boîte (fractions) à la vue, comme mainStock (miroir, angle, ancre).
  const pose = o => {
    const [bx0, by0, bx1, by1] = CAT[o.id].boite, W = bx1 - bx0, H = by1 - by0;
    const k = o.taille / Math.max(W, H), sx = o.miroir ? -1 : 1, c = Math.cos(o.angle * RAD), s = Math.sin(o.angle * RAD);
    const P = ([fx, fy]) => { const u = sx * k * (fx - o.ancre[0]) * W, v = k * (fy - o.ancre[1]) * H; return [o.x + c * u - s * v, o.y + s * u + c * v]; };
    const svg = (extra = {}) => String(F.mainStock({ id: o.id, objet: false, taille: o.taille, angle: o.angle, miroir: !!o.miroir, ancre: o.ancre, x: o.x, y: o.y, ...extra }));
    return { o, P, k, W, H, svg };
  };
  // L'avant-bras continue la coupe du poignet : chaque bord part dans la direction du bord de la main et file droit sur
  // L, hors de la vue ; un fond (blanc, ou gris loin) couvre le bout du fichier. bords : [[près, bout], [près, bout]],
  // en fractions de la boîte ; « bout » est sur le bord, juste avant le bout du fichier.
  const TRAIT_MAIN = 'fill="none" stroke="#1A1A1A" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"';
  const avantBras = (P, bords, L, fond = '#FFFFFF') => {
    const E = bords.map(([a, b]) => {
      const A = P(a), B = P(b), d = Math.hypot(B[0] - A[0], B[1] - A[1]), u = [(B[0] - A[0]) / d, (B[1] - A[1]) / d];
      return [B, [B[0] + u[0] * L, B[1] + u[1] * L]];
    });
    const [[b1, e1], [b2, e2]] = E;
    return {
      svg: [h.path(`M${pt(b1)} L${pt(e1)} L${pt(e2)} L${pt(b2)} Z`, `fill="${fond}" stroke="none"`),
        h.path(`M${pt(b1)} L${pt(e1)} M${pt(b2)} L${pt(e2)}`, TRAIT_MAIN)].join('\n'),
      axe: [[(b1[0] + b2[0]) / 2, (b1[1] + b2[1]) / 2], [(e1[0] + e2[0]) / 2, (e1[1] + e2[1]) / 2]],
      bords: E,
    };
  };

  // ─── La cuisse de côté, la personne couchée sur le dos : u cm depuis la hanche vers le pied ──────────────────────
  const HAUT = [[-10, 17.5], [0, 17.2], [12, 16.4], [26, 14.8], [36, 13], [42, 11.8], [46, 12.8], [50, 11.6], [56, 10.6], [68, 9.8], [78, 8.2], [83, 7.4]];
  // le dessous : à plat sur le sol, puis le creux du genou qui se soulève
  const BASC = [[-10, 0], [36, 0], [41, 0.8], [46, 2], [51, 2.2], [57, 1.3], [64, 0.3], [70, 0]];
  const cuisse = (z, u0, s, yg) => {
    const X = u => (u - u0) * s, Y = v => yg - v * s, U = x => u0 + x / s;
    const top = x => Y(lisse(HAUT, U(x))), bas = x => Y(lisse(BASC, U(x)));
    const hp = [], bp = [];
    for (let x = -2; x < z.l + 3; x += 1.5) { hp.push([x, top(x)]); bp.push([x, bas(x)]); }
    const dessin = [sol(z, yg), h.chemin([...hp, ...bp.slice().reverse()], h.a.blanc, true), h.chemin(hp, CORPS), h.chemin(bp, CORPS)].join('\n');
    return { X, Y, U, top, bas, dessin };
  };

  // ─── A et B. Appuyer, puis le sang traverse : la même vue, les mêmes mains ───────────────────────────────────────
  // La main 1-08 (« tige à plat ») sans sa tige : la main à plat de côté, paume en bas, les doigts un peu relevés.
  // Le talon de la main et le dessous des doigts se posent sur la compresse ; la main du dessous (en gris : elle est
  // derrière) a sa paume sur la plaie ; celle du dessus pose sa paume sur le dos de la première, un peu plus vers le
  // poignet. Les deux avant-bras, parallèles, montent vers les épaules de celui qui appuie et sortent de la vue.
  const ID_PLAT = '1-08', ANC_PLAT = [0.62, 0.99];
  const UP = 27;                                        // la plaie, à mi-cuisse
  const COMP1 = [UP - 6.5, UP + 6.5], COMP2 = [UP - 8, UP + 4.5], EP = 1.1;   // les compresses (u, cm) et leur épaisseur
  const plat = (s, x, y, angle, loin) => pose({ id: ID_PLAT, taille: 28.4 * s * 617 / 617, angle, ancre: ANC_PLAT, x, y, loin });
  const BORDS_PLAT = () => {
    const h0 = coupe(ID_PLAT, 'x', 0.016), h1 = coupe(ID_PLAT, 'x', 0.12), b0 = coupe(ID_PLAT, 'x', 0.03);
    return [[[0.12, h1[0]], [0.016, h0[0]]], [[0.12, h1[h1.length - 1]], [0.03, b0[b0.length - 1]]]];
  };
  const ANGLE_PLAT = 27;                                // la pente de contact de la main, plus la pente de la cuisse
  const geoAB = (z, double) => {
    const s = z.l / 40, u0 = 7, yg = z.h - 10;
    const C = cuisse(z, u0, s, yg);
    const epT = EP * s * (double ? 2 : 1);
    const surf = x => C.top(x) - epT;
    const xP = C.X(UP);
    // la main du dessous : on la descend jusqu'à ce que le dessous de la main touche la compresse
    const dessous = contour(ID_PLAT).filter(p => p[0] > 0.38 && p[1] > 0.6);
    let y = 0;
    for (let it = 0; it < 3; it++) {
      const m = plat(s, xP, y, ANGLE_PLAT, true);
      const enfonce = Math.max(...dessous.map(p => { const q = m.P(p); return q[1] - surf(q[0]); }));
      y -= enfonce;
    }
    const bas = plat(s, xP, y, ANGLE_PLAT, true);
    // la main du dessus : la même, reculée vers le poignet et levée de la moitié de la main
    const ph = bas.P([ANC_PLAT[0] - 0.07, ANC_PLAT[1] - 0.6]);
    const haut = plat(s, ph[0], ph[1], ANGLE_PLAT, false);
    const L = z.l;
    const abBas = avantBras(bas.P, BORDS_PLAT(), L, GRIS), abHaut = avantBras(haut.P, BORDS_PLAT(), L);
    // la flèche du poids : le long de l'avant-bras du dessus, côté dos, vers les mains
    const [a0, a1] = abHaut.axe, d = Math.hypot(a1[0] - a0[0], a1[1] - a0[1]), u = [(a0[0] - a1[0]) / d, (a0[1] - a1[1]) / d];
    const nv = [u[1], -u[0]];                            // la normale vers le haut de la vue
    const off = 0.55 * (Math.hypot(abHaut.bords[0][0][0] - abHaut.bords[1][0][0], abHaut.bords[0][0][1] - abHaut.bords[1][0][1])) + 9;
    const pa = t => [a0[0] - u[0] * t + nv[0] * off, a0[1] - u[1] * t + nv[1] * off];
    const fleche = [pa(13.5 * s), pa(4.5 * s)];
    return { s, C, surf, xP, bas, haut, abBas, abHaut, fleche, a0, u, epT };
  };
  // Une compresse de côté : une gaze pliée, posée sur la peau, qui en suit la courbe ; bouts arrondis.
  const compresse = (C, ua, ub, y0, ep, at) => {
    const xa = C.X(ua), xb = C.X(ub), dessus = [], dessous = [];
    for (let x = xa; x <= xb + 0.01; x += 1) { dessous.push([x, y0(x)]); dessus.push([x, y0(x) - ep]); }
    const r = ep / 2;
    const A = dessus[0], B = dessus[dessus.length - 1], Bd = dessous[dessous.length - 1], Ad = dessous[0];
    const d = `M${pt(Ad)} Q${f(Ad[0] - r * 1.2)},${f((Ad[1] + A[1]) / 2)} ${pt(A)} L${dessus.slice(1).map(pt).join(' L')} Q${f(B[0] + r * 1.2)},${f((B[1] + Bd[1]) / 2)} ${pt(Bd)} L${dessous.slice().reverse().slice(1).map(pt).join(' L')} Z`;
    return h.path(d, at);
  };
  const mains = g => [g.bas.svg({ loin: true }), g.abBas.svg, g.haut.svg(), g.abHaut.svg].join('\n');

  const dessinA = z => {
    const g = geoAB(z, false), C = g.C, out = [C.dessin];
    out.push(compresse(C, COMP1[0], COMP1[1], C.top, g.epT, plein(h.a.contour)));
    out.push(mains(g));
    out.push(h.geste(`M${pt(g.fleche[0])} L${pt(g.fleche[1])}`));
    // le point à contrôler : le talon de la main du dessous, sur la compresse, sur la plaie même
    const c = g.bas.P([0.6, 0.97]);
    out.push(h.controle(c[0], c[1] - 2, 2.6 * g.s));
    return decoupe('a', z, out.join('\n'));
  };

  // Un filet de sang qui descend la cuisse : mince, qui serpente, qui s'amincit, une goutte au bout, la flaque au sol.
  const filet = (x0, y0, y1, amp, ph, w0, w1, flaque) => {
    const N = 28, G = [], D = [];
    for (let i = 0; i <= N; i++) {
      const t = i / N, y = y0 + (y1 - y0) * t, xc = x0 + amp * (Math.sin(t * 9 + ph) - Math.sin(ph)) * (0.3 + t);
      const w = w0 + (w1 - w0) * t + (i === 0 ? w0 * 0.6 : 0);
      G.push([xc - w, y]); D.push([xc + w, y]);
    }
    const xe = (G[N][0] + D[N][0]) / 2, r = w1 * 2.1;
    const out = [h.chemin([...G, ...D.reverse()], h.a.plein, true),
      h.path(`M${f(xe - w1)},${f(y1 - 1)} Q${f(xe - r)},${f(y1 + r * 0.6)} ${f(xe)},${f(y1 + r * 1.1)} Q${f(xe + r)},${f(y1 + r * 0.6)} ${f(xe + w1)},${f(y1 - 1)} Z`, h.a.plein)];
    if (flaque) out.push(h.ellipse(xe, y1 + r * 1.1 + flaque * 0.4, flaque * 1.6, flaque * 0.55, h.a.plein));
    return out.join('\n');
  };
  const dessinB = z => {
    const g = geoAB(z, true), C = g.C, s = g.s, out = [C.dessin];
    const y1 = x => C.top(x) - g.epT / 2;
    // le sang passé sous la première compresse coule sur le côté de la cuisse jusqu'au sol
    for (const [du, amp, ph, k] of [[-5.2, 0.5, 0.4, 2.2], [3.6, 0.45, 2.1, 1.6], [5.8, 0.5, 1.3, 2.6]]) {
      const x0 = C.X(UP + du), ya = C.top(x0) + 0.8, yb = C.Y(0) - 1.2 * s;
      out.push(filet(x0, ya, yb, amp * s * 0.4, ph, 1.5, 0.6, k));
    }
    // la première, trempée : noire ; la seconde par-dessus, blanche, décalée vers la hanche
    out.push(compresse(C, COMP1[0], COMP1[1], C.top, g.epT / 2, h.a.plein));
    out.push(compresse(C, COMP2[0], COMP2[1], y1, g.epT / 2, plein(h.a.contour)));
    out.push(mains(g));
    out.push(h.geste(`M${pt(g.fleche[0])} L${pt(g.fleche[1])}`));
    return decoupe('b', z, out.join('\n'));
  };

  // ─── C. Plaie profonde, coupe en travers de la cuisse : la gaze tassée au fond au doigt ganté ────────────────────
  const WC = [[0, 1.9], [0.35, 1.6], [0.7, 1.2], [0.9, 0.7], [1, 0.1]];
  const ID_DOIGT = '4-02';
  const geoC = z => {
    const s = Math.min(z.l / 27, z.h / 35.5), yg = z.h - 10, cx = z.l * 0.57;
    const rx = 8.5 * s, ry = 7.5 * s, cy = yg - ry + 0.5 * s;
    const ytop = x => cy - ry * Math.sqrt(Math.max(0, 1 - Math.pow((x - cx) / rx, 2)));
    const xm = cx - 1.5 * s, yM = ytop(xm), xB = cx - 1.1 * s, yB = cy - 1 * s;
    const ax = t => xm + (xB - xm) * t, ay = t => yM + (yB - yM) * t;
    const w = (t, c) => s * (lisse(WC, t) + (t > 0.05 && t < 0.9 ? 0.12 * Math.sin(t * 21 + c) : 0));
    // la vignette : le blessé entier en petit, avec le trait de coupe sur la cuisse
    const vg = { x: 2, y: 2, l: z.l * 0.44 };
    vg.e = (vg.l - 9) / 1820; vg.h = 300 * vg.e + 15; vg.yg = vg.y + vg.h - 5;
    // Le doigt ganté : la main 4-02 (l'index tendu) retournée, le bout de l'index sur la gaze, dans l'axe de la plaie ;
    // l'index fait 1,7 cm de large (38 unités du fichier). L'avant-bras monte hors de la vue.
    const k = 1.7 * s / 38, taille = k * 603;
    const pointe = [0.374, 0.004], base = [0.40, 0.29];
    const aF = Math.atan2(base[1] - pointe[1], base[0] - pointe[0]) / RAD;        // l'index, de la pointe vers la main
    const aP = Math.atan2(yM - yB, xm - xB) / RAD;                                    // la plaie, du fond vers le haut
    const tip = [ax(0.42), ay(0.42)];
    const m = pose({ id: ID_DOIGT, taille, angle: aP - aF, ancre: pointe, x: tip[0], y: tip[1] });
    const geste = [[tip[0] + 3.6 * s, yM - 8.6 * s], [tip[0] + 3.6 * s, yM - 2.6 * s]];
    return { s, yg, cx, cy, rx, ry, ytop, xm, yM, ax, ay, w, m, tip, femur: [cx + 1 * s, cy + 2 * s], vg, geste };
  };
  const memo = {};
  const deplace = (g, dx) => `<g transform="translate(${f(dx)} 0)">\n${g}\n</g>`;
  const coupesX = (svg, x) => {
    const ys = [];
    for (const m of String(svg).matchAll(/ d="([^"]+)"/g)) {
      const n = m[1].match(/-?\d+(\.\d+)?/g).map(Number);
      for (let i = 0; i + 3 < n.length; i += 2) {
        const [x0, y0, x1, y1] = [n[i], n[i + 1], n[i + 2], n[i + 3]];
        if (x0 !== x1 && (x0 - x) * (x1 - x) <= 0) ys.push(y0 + (y1 - y0) * (x - x0) / (x1 - x0));
      }
    }
    return ys;
  };
  const petitBlesse = vg => {
    const cle = ['pb', vg.x, vg.y, vg.l].join(',');
    if (memo[cle]) return memo[cle];
    const c = F.corps({ x: 0, y: vg.yg, pose: 'couche-dos', echelle: vg.e, trait: 1.25 }), dx = vg.x + (vg.l - (c.boite.x1 - c.boite.x0)) / 2 - c.boite.x0;
    const A = c.articulations, xc0 = A.hancheP[0] + 0.45 * (A.genouP[0] - A.hancheP[0]);
    return (memo[cle] = { svg: deplace(c, dx), xc: xc0 + dx, yh: Math.min(...coupesX(c, xc0)) });
  };
  // La manchette du gant : du poignet, elle s'évase un peu sur 5 cm et finit sur un bourrelet roulé ; l'avant-bras nu
  // en sort, plus mince. Elle se peint par-dessus le bout du poignet de la main, sans trait au poignet.
  const manchette = (g, P, s) => {
    const yW = 0.80, yE = 0.95;
    const [lw, rw] = [coupe(ID_DOIGT, 'y', yW)[0], coupe(ID_DOIGT, 'y', yW).slice(-1)[0]];
    const [le, re] = [coupe(ID_DOIGT, 'y', yE)[0], coupe(ID_DOIGT, 'y', yE).slice(-1)[0]];
    const A = P([lw, yW]), B = P([rw, yW]), A1 = P([le, yE]), B1 = P([re, yE]);
    const ax0 = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2], ax1 = [(A1[0] + B1[0]) / 2, (A1[1] + B1[1]) / 2];
    const dl = Math.hypot(ax1[0] - ax0[0], ax1[1] - ax0[1]), u = [(ax1[0] - ax0[0]) / dl, (ax1[1] - ax0[1]) / dl], n = [-u[1], u[0]];
    const L = 5 * s, ev = 0.5 * s, wl = Math.hypot(B[0] - A[0], B[1] - A[1]) / 2;
    const c0 = ax0, c1 = [c0[0] + u[0] * L, c0[1] + u[1] * L];
    const sg = Math.sign((B[0] - A[0]) * n[0] + (B[1] - A[1]) * n[1]) || 1;
    const bord = (k, t, e) => [c0[0] + u[0] * L * t + n[0] * sg * k * (wl + e), c0[1] + u[1] * L * t + n[1] * sg * k * (wl + e)];
    const g1 = bord(-1, 0, 0), g2 = bord(-1, 1, ev), d1 = bord(1, 0, 0), d2 = bord(1, 1, ev);
    const lip = 0.45 * s, gl = bord(-1, 1 + lip / L, ev + 0.15 * s), dl2 = bord(1, 1 + lip / L, ev + 0.15 * s);
    return [
      h.path(`M${pt(g1)} L${pt(g2)} L${pt(gl)} L${pt(dl2)} L${pt(d2)} L${pt(d1)} Z`, `fill="#FFFFFF" stroke="none"`),
      h.path(`M${pt(g1)} L${pt(g2)} M${pt(d1)} L${pt(d2)}`, TRAIT_MAIN),
      // le bourrelet roulé, au bout de la manchette
      h.path(`M${pt(g2)} L${pt(gl)} L${pt(dl2)} L${pt(d2)} Z`, `fill="#FFFFFF" stroke="#1A1A1A" stroke-width="1.5" stroke-linejoin="round"`),
    ].join('\n');
  };
  const dessinC = z => {
    const g = geoC(z), s = g.s, out = [sol(z, g.yg)];
    // la vignette
    const vg = g.vg;
    out.push(h.rect(vg.x, vg.y, vg.l, vg.h, h.a.fin));
    const pb = petitBlesse(vg);
    out.push(pb.svg, h.ligne(vg.x + 3, vg.yg, vg.x + vg.l - 3, vg.yg, h.a.detail));
    const xc = pb.xc, yh = pb.yh;
    out.push(h.path(`M${f(xc - 1.3)},${f(yh + 0.6)} Q${f(xc)},${f(yh - 0.9)} ${f(xc + 1.3)},${f(yh + 0.6)} Z`, h.a.plein));   // la plaie
    out.push(h.path(`M${f(xc)},${f(yh - 6)} L${f(xc)},${f(vg.yg + 2.5)}`, `fill="none" stroke="#1A1A1A" stroke-width="1.4" stroke-dasharray="4 2.2"`));
    out.push(h.fleche(`M${f(xc)},${f(yh - 6)} L${f(xc + 6)},${f(yh - 6)}`, h.a.detail));
    out.push(h.fleche(`M${f(xc)},${f(vg.yg + 2.5)} L${f(xc + 6)},${f(vg.yg + 2.5)}`, h.a.detail));
    // la coupe : la chair tramée, le fémur en hachure croisée
    const ovale = (a, b) => { const p = []; for (let i = 0; i <= 120; i++) { const t = i / 120 * 2 * Math.PI; p.push([g.cx + a * Math.cos(t), Math.min(g.cy + b * Math.sin(t), g.yg)]); } return p; };
    out.push(h.chemin(ovale(g.rx, g.ry), h.a.blanc, true));
    out.push(h.chemin(ovale(g.rx, g.ry), h.a.hachure('bois', 'contour'), true));
    out.push(h.ellipse(g.femur[0], g.femur[1], 1.6 * s, 1.4 * s, plein(h.a.arete)));
    out.push(h.ellipse(g.femur[0], g.femur[1], 1.6 * s, 1.4 * s, h.a.hachure('grillage', 'arete')));
    // la plaie : un trou blanc dans la chair
    const T = []; for (let t = 0; t <= 1.0001; t += 0.025) T.push(t);
    const G = t => [g.ax(t) - g.w(t, 0), g.ay(t)], D = t => [g.ax(t) + g.w(t, 2), g.ay(t)];
    const gauche = T.map(G), droite = T.map(D).reverse();
    out.push(h.chemin([[gauche[0][0] - 1, gauche[0][1] - 3], ...gauche, ...droite, [droite[droite.length - 1][0] + 1, droite[droite.length - 1][1] - 3]], h.a.blanc, true));
    out.push(h.chemin([...gauche, ...droite], h.a.arete));
    // la gaze repliée en accordéon, du fond jusqu'au bout du doigt : un ruban plié d'une paroi à l'autre
    const plis = [], n = 5;
    for (let i = 0; i <= n; i++) {
      const t = 0.97 - i * (0.5 / n);
      const xa = g.ax(t) - g.w(t, 0) + 0.25 * s, xb = g.ax(t) + g.w(t, 2) - 0.25 * s;
      plis.push(i % 2 ? [xb, g.ay(t)] : [xa, g.ay(t)]);
      plis.push(i % 2 ? [xa, g.ay(t) - 0.12 * s] : [xb, g.ay(t) - 0.12 * s]);
    }
    let d = `M${pt(plis[0])}`;
    for (let i = 1; i < plis.length; i++) {
      const a = plis[i - 1], b = plis[i];
      if (i % 2) d += ` L${pt(b)}`;
      else { const sx = Math.sign(a[0] - g.cx) || 1; d += ` Q${f(a[0] + sx * 0.45 * s)},${f((a[1] + b[1]) / 2)} ${pt(b)}`; }
    }
    out.push(h.path(d, h.a.detail));
    // le ruban remonte le long de la paroi et sort : le bout libre couché sur la peau
    const bd = []; for (let t = 0.5; t >= 0.03; t -= 0.04) bd.push([g.ax(t) - g.w(t, 0) + 0.45 * s, g.ay(t)]);
    const b0 = bd[bd.length - 1], x1 = b0[0] - 1.6 * s, xq = b0[0] - 3.4 * s;
    out.push(h.path(`M${bd.map(pt).join(' L')} Q${f(b0[0])},${f(g.ytop(b0[0]) - 0.9 * s)} ${f(x1)},${f(g.ytop(x1) - 0.3 * s)} Q${f((x1 + xq) / 2)},${f(g.ytop((x1 + xq) / 2) - 0.35 * s)} ${f(xq)},${f(g.ytop(xq) - 0.3 * s)}`, h.a.arete));
    out.push(h.path(`M${f(xq - 0.2 * s)},${f(g.ytop(xq) - 0.9 * s)} L${f(xq + 0.2 * s)},${f(g.ytop(xq) + 0.3 * s)}`, h.a.fin));
    // le doigt ganté qui tasse : la main, son avant-bras, la manchette du gant
    const m = g.m;
    const bords = [[[0.39, 0.80], [coupe(ID_DOIGT, 'y', 0.93)[0], 0.93]], [[0.90, 0.80], [coupe(ID_DOIGT, 'y', 0.93).slice(-1)[0], 0.93]]];
    bords[0][0][0] = coupe(ID_DOIGT, 'y', 0.80)[0]; bords[1][0][0] = coupe(ID_DOIGT, 'y', 0.80).slice(-1)[0];
    out.push(m.svg(), avantBras(m.P, bords, z.h).svg, manchette(g, m.P, s));
    // le geste : le doigt pousse la gaze jusqu'au fond
    out.push(h.geste(`M${pt(g.geste[0])} L${pt(g.geste[1])}`));
    return decoupe('c', z, out.join('\n'));
  };

  // ─── D. Laver : gros plan, la bouteille souple bouchon en bas dans le poing, le jet sur la plaie ─────────────────
  // Le poing 1-09 (« poing autour d'un manche debout ») sans son manche, tourné : l'avant-bras part en haut à droite, le
  // corps de la bouteille passe dans le poing, le bouchon en bas. Le poing serre un manche de 3,4 cm (100 unités du
  // fichier) : la bouteille souple, de 6 cm, y est pincée ; elle se renfle au-dessus et au-dessous du poing.
  const ID_POING = '1-09', AXE_POING = 0.807;
  // le profil de la bouteille, u cm depuis le bout du bouchon, demi-largeur
  const geoD = z => {
    const s = z.l / 34, u0 = 9, yg = z.h + 2.5 * s;
    const C = cuisse(z, u0, s, yg);
    const xw = C.X(24), yw = C.top(xw);                 // la plaie
    const aM = 162;                                     // le poing tourné : l'avant-bras monte à droite
    const k = 3.4 * s / 100, taille = k * 540;
    // l'axe de la bouteille dans la vue : du bouchon (en bas) vers le fond (en haut)
    const ang = aM * RAD, axe = [Math.sin(ang), -Math.cos(ang)].map(v => -v);   // le haut du fichier, tourné, inversé
    const uG = 10.5;                                    // le milieu du poing sur la bouteille, depuis le bout du bouchon
    const C0 = [xw - 2.2 * s - axe[0] * 4.5 * s, yw - 6.5 * s];   // le bout du bouchon, au-dessus de la plaie
    const nrm = [-axe[1], axe[0]];
    const W = (u, v) => [C0[0] + (u * axe[0] + v * nrm[0]) * s, C0[1] + (u * axe[1] + v * nrm[1]) * s];
    const G = W(uG, 0);
    // la main : l'ancre sur l'axe du manche, au milieu du poing (le poing va de y = 0,37 à 1 dans le fichier)
    const m = pose({ id: ID_POING, taille, angle: aM, ancre: [AXE_POING, 0.69], x: G[0], y: G[1] });
    return { s, C, xw, yw, W, axe, nrm, m, uG, k };
  };
  const BOUT = [[0, 0.75], [0.3, 1.25], [2.4, 1.3], [2.7, 1.0], [3.3, 1.05], [4.2, 1.8], [5.6, 2.8], [6.6, 3.0], [7.4, 2.6], [8.6, 1.75],
    [12.4, 1.75], [13.6, 2.6], [14.6, 3.0], [19.4, 3.0], [20.4, 2.6]];
  const LBOUT = 20.6;
  const dessinD = z => {
    const g = geoD(z), s = g.s, W = g.W, C = g.C, out = [C.dessin];
    const x = g.xw, y = g.yw;
    // la plaie et la saleté autour
    out.push(h.path(`M${f(x - 2.2 * s)},${f(y + 0.9 * s)} Q${f(x)},${f(y - 0.7 * s)} ${f(x + 2.2 * s)},${f(y - 0.3 * s)} Q${f(x)},${f(y + 0.9 * s)} ${f(x - 2.2 * s)},${f(y + 0.9 * s)} Z`, h.a.plein));
    for (const [dx, dy] of [[-3.4, 1.4], [3.3, 1.0], [-1.6, 2.4], [1.9, 2.2], [4.6, 2.6], [-4.4, 2.9]]) out.push(h.cercle(x + dx * s, y + dy * s, 0.26 * s, h.a.plein));
    // l'eau qui descend le flanc de la cuisse, en emportant la saleté
    for (const [d0, d1, lg] of [[-1.4, -3.6, 1], [0.4, 0.9, 0.85], [1.6, 4.4, 1]]) {
      const xa = x + d0 * s, ya = C.top(xa) + 0.4 * s, yb = Math.min(z.h + 4, ya + (z.h - ya) * lg + 6), xb = x + d1 * s, e = 0.32 * s;
      const c1 = [xa + (xb - xa) * 0.1 + 0.6 * s, ya + (yb - ya) * 0.35], c2 = [xb - 0.6 * s, ya + (yb - ya) * 0.65];
      out.push(h.path(`M${f(xa - e)},${f(ya)} C${f(c1[0] - e)},${f(c1[1])} ${f(c2[0] - e * 0.7)},${f(c2[1])} ${f(xb - e * 0.6)},${f(yb)} L${f(xb + e * 0.6)},${f(yb)} C${f(c2[0] + e * 0.7)},${f(c2[1])} ${f(c1[0] + e)},${f(c1[1])} ${f(xa + e)},${f(ya)} Z`, h.a.hachure('eau', 'fin')));
    }
    // la bouteille : le corps pincé dans le poing, l'épaule, le goulot, le bouchon
    const cote = sg => { const p = []; for (let u = 0.3; u <= LBOUT - 1.4 + 1e-6; u += 0.2) p.push(W(u, sg * lisse(BOUT, u))); return p; };
    const fond = sg => { const p = []; for (let i = 0; i <= 8; i++) { const a = Math.PI / 2 * i / 8; p.push(W(LBOUT - 1.4 + 1.4 * Math.sin(a), sg * (1.6 + 1.4 * Math.cos(a)))); } return p; };
    const corps = [W(0, -0.75), ...cote(-1), ...fond(-1), ...fond(1).reverse(), ...cote(1).reverse(), W(0, 0.75)];
    out.push(h.chemin(corps, h.a.blanc, true));
    // l'eau bouillie refroidie : la bouteille pleine aux trois quarts, le bouchon en bas ; la surface est à plat
    const yn = W(16.2, 0)[1];
    const sousNiveau = (poly, y0) => {
      const r = [];
      for (let i = 0; i < poly.length; i++) {
        const a = poly[i], b = poly[(i + 1) % poly.length], ia = a[1] >= y0, ib = b[1] >= y0;
        if (ia) r.push(a);
        if (ia !== ib) { const t = (y0 - a[1]) / (b[1] - a[1]); r.push([a[0] + (b[0] - a[0]) * t, y0]); }
      }
      return r;
    };
    const eau = sousNiveau(corps, yn);
    out.push(h.chemin(eau, h.a.hachure('eau', 'aucun'), true));
    const surf = eau.filter(p => Math.abs(p[1] - yn) < 0.01).map(p => p[0]).sort((a, b) => a - b);
    if (surf.length >= 2) out.push(h.ligne(surf[0], yn, surf[surf.length - 1], yn, h.a.detail));
    out.push(h.chemin(corps, h.a.contour, true));
    // le bouchon : la bague qui le sépare du goulot, son bord, et le trou d'épingle au bout
    out.push(h.path(`M${pt(W(2.55, -1.3))} L${pt(W(2.55, 1.3))}`, h.a.detail));
    out.push(h.path(`M${pt(W(0.3, -1.2))} Q${pt(W(-0.15, 0))} ${pt(W(0.3, 1.2))}`, h.a.fin));
    out.push(h.cercle(...W(0.05, 0), 0.22 * s, h.a.plein));
    // le poing qui serre, et son avant-bras qui monte hors de la vue
    const m = g.m;
    const h0 = coupe(ID_POING, 'x', 0.02), h1 = coupe(ID_POING, 'x', 0.2);
    const bords = [[[0.2, h1[0]], [0.02, h0[0]]], [[0.2, h1[h1.length - 1]], [0.02, h0[h0.length - 1]]]];
    out.push(m.svg(), avantBras(m.P, bords, z.l).svg);
    // le geste : serrer le poing sur la bouteille souple
    const pg = m.P([0.97, 0.69]), cg = m.P([AXE_POING, 0.69]), dg = Math.hypot(pg[0] - cg[0], pg[1] - cg[1]), ug = [(pg[0] - cg[0]) / dg, (pg[1] - cg[1]) / dg];
    out.push(h.geste(`M${f(pg[0] + ug[0] * 5.2 * s)},${f(pg[1] + ug[1] * 5.2 * s)} L${f(pg[0] + ug[0] * 1.4 * s)},${f(pg[1] + ug[1] * 1.4 * s)}`));
    // le jet : un filet d'eau du trou d'épingle à la plaie
    const ja = W(-0.1, 0), jb = [x + 0.3 * s, y - 0.5 * s], jc = [(ja[0] + jb[0]) / 2 + 0.6 * s, (ja[1] + jb[1]) / 2];
    const qj = t => { const q = 1 - t; return [0, 1].map(i => q * q * ja[i] + 2 * q * t * jc[i] + t * t * jb[i]); };
    const J = [], K = [];
    for (let i = 0; i <= 20; i++) {
      const t = i / 20, p = qj(t), p2 = qj(Math.min(1, t + 0.01)), p1 = qj(Math.max(0, t - 0.01));
      const dd = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]), nn = [-(p2[1] - p1[1]) / dd, (p2[0] - p1[0]) / dd], e = (0.22 + 0.06 * t) * s;
      J.push([p[0] + nn[0] * e, p[1] + nn[1] * e]); K.push([p[0] - nn[0] * e, p[1] - nn[1] * e]);
    }
    out.push(h.chemin([...J, ...K.reverse()], h.a.hachure('eau', 'fin'), true));
    // les gouttes qui rebondissent sur la plaie
    for (const [dx, dy, r] of [[-1.9, -1.3, 0.34], [1.8, -1.6, 0.3], [-3.0, -0.5, 0.26], [2.9, -0.6, 0.3]]) out.push(h.cercle(jb[0] + dx * s, jb[1] + dy * s, r * s, h.a.hachure('eau', 'fin')));
    return decoupe('d', z, out.join('\n'));
  };

  return {
    ref: '26-40',
    titre: 'Appuyer sur la plaie, puis la laver',
    desc: 'Quatre gestes. Appuyer : la cuisse d’un blessé couché, vue de côté de la hanche au genou, posée au sol ; une compresse sur la plaie et deux mains à plat l’une sur l’autre, paume vers la compresse, la main du dessous en gris, les deux avant-bras tendus qui montent vers les épaules ; une flèche rouge le long de l’avant-bras du dessus vers les mains, un cercle rouge sur le talon de la main posé sur la plaie. Le sang traverse : la même vue ; la première compresse, trempée, noire, reste en place, une seule autre par-dessus, blanche, et les mêmes mains qui appuient plus fort ; le sang passé coule sur le côté de la cuisse jusqu’au sol. Plaie profonde : la cuisse en coupe, repérée sur un petit blessé couché ; la chair tramée, le fémur en hachure croisée, la gaze repliée en accordéon tassée jusqu’au fond par l’index d’une main gantée, une flèche rouge vers le fond, le bout libre de la gaze couché sur la peau. Laver : en gros plan, une bouteille souple tenue bouchon en bas dans le poing, pincée par les doigts, pleine aux trois quarts d’eau bouillie refroidie ; une flèche rouge contre le poing ; le jet sort d’un trou d’épingle au bout du bouchon et tombe sur la plaie salie ; l’eau coule sur le côté de la cuisse.',
    format: 'pleine',
    disposition: [['appuyer', 'traverse'], ['bourrer', 'laver']],
    largeurs: [[1, 1], [5, 6]],
    hauteurs: [5, 6],
    vues: {
      appuyer: {
        titre: 'Appuyer',
        dessin: dessinA,
        renvois: z => {
          const g = geoAB(z, false), c = g.bas.P([0.6, 0.97]), b = g.abHaut.axe;
          return [
            { n: 1, rond: [z.l - 14, c[1] + 26], cible: [c[0] + 2.6 * g.s, c[1] + 2], texte: 'la paume sur la plaie même' },
            { n: 2, rond: [16, 16], cible: [b[0][0] - g.u[0] * 9 * g.s, b[0][1] - g.u[1] * 9 * g.s], texte: 'bras tendus : tout son poids' },
          ];
        },
      },
      traverse: {
        titre: 'Le sang traverse',
        dessin: dessinB,
        renvois: z => {
          const g = geoAB(z, true), C = g.C, s = g.s;
          const e1 = [C.X(COMP1[1]) - 0.3 * s, C.top(C.X(COMP1[1])) - g.epT * 0.25];
          const e2 = [C.X(COMP2[0]) + 0.6 * s, C.top(C.X(COMP2[0])) - g.epT * 0.75];
          const mf = [(g.fleche[0][0] + g.fleche[1][0]) / 2, (g.fleche[0][1] + g.fleche[1][1]) / 2];
          return [
            { n: 3, rond: [z.l - 14, e1[1] + 34], cible: e1, texte: 'la première reste en place' },
            { n: 4, rond: [16, e2[1] + 30], cible: e2, texte: 'une seule autre par-dessus' },
            { n: 5, rond: [mf[0] + 30, 16], cible: mf, texte: 'appuyer plus fort' },
          ];
        },
      },
      bourrer: {
        titre: 'Plaie profonde',
        dessin: dessinC,
        renvois: z => {
          const g = geoC(z), s = g.s, ti = g.m.P([0.36, 0.12]);
          return [
            { n: 6, rond: [14, g.yM - 2.2 * s], cible: ti, texte: 'au doigt ganté' },
            { n: 7, rond: [z.l - 11, g.yM - 3.2 * s], cible: [g.xm + 2.6 * s, g.ytop(g.xm + 2.6 * s) + 0.3], texte: 'trou plein, puis appuyer' },
            { n: 8, rond: [z.l - 11, g.cy + 3.6 * s], cible: [g.ax(0.82), g.ay(0.82)], texte: 'gaze tassée jusqu’au fond' },
          ];
        },
      },
      laver: {
        titre: 'Laver',
        dessin: dessinD,
        renvois: z => {
          const g = geoD(z), s = g.s, W = g.W;
          const pc = W(0, 0), pe = W(5.6, -1.4), pj = [(pc[0] + g.xw) / 2 + 0.5 * s, (pc[1] + g.yw) / 2];
          const pg = g.m.P([0.99, 0.62]);
          return [
            { n: 9, rond: [pc[0] - 9 * s, pc[1] - 1 * s], cible: [pc[0] - 0.4 * s, pc[1]], texte: 'bouchon percé d’un trou d’épingle' },
            { n: 10, rond: [pj[0] + 8 * s, pj[1] + 1.5 * s], cible: [pj[0] + 0.4 * s, pj[1]], texte: 'le jet décolle la saleté, sans frotter' },
            { n: 11, rond: [16, pe[1] - 5 * s], cible: pe, texte: 'eau bouillie, puis refroidie' },
            { n: 12, rond: [pg[0] + 4 * s, 16], cible: pg, texte: 'presser la bouteille souple' },
          ];
        },
      },
    },
  };
};
