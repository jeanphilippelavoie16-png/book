// Planche 28-04 — La compresse chaude qui garde sa chaleur (ch. 28, « La compresse chaude qui
// garde sa chaleur »). Le linge de coton trempé dans l'eau de la bouilloire et essoré, testé sur
// l'intérieur du poignet ; la bouteille de métal d'eau chaude roulée dans un linge sec ; le malade
// couché, la compresse sur la cuisse ; la même, coupée par le milieu, couche par couche ; le linge
// qui a servi part à la casserole. Aucune cote : le chapitre ne donne aucune mesure de la compresse.
// Lot 3 (13 octobre) : le malade couché passe au corps simple de profil (couche-dos). Rouge : le geste
// de rouler la bouteille dans le linge.
// Mains simples (14 octobre) : tordre le linge à deux mains (prises.deuxMains : la droite en haut vue du dos, tournée
// de 35°, la gauche en bas vue des doigts, le linge qui passe dans les deux poings) ; le poignet, paume en l'air
// (porte, de profil côté pouce, penchée de 25°). Rouge : les deux sens de la torsion.
module.exports = (h) => {
  const A = h.a, A_ = h.a, F = h.formes;
  const PR = require(require('path').join(__dirname, '../../.claude/skills/planches/scripts/mains/prises.js'));
  const f = v => Math.round(v * 10) / 10;
  const pt = p => `${f(p[0])} ${f(p[1])}`;
  const trace = (Q, ferme = false) => 'M' + Q.map(pt).join(' L') + (ferme ? ' Z' : '');
  const blanc = a => a.replace('fill="none"', 'fill="#FFFFFF"');
  const sansTrait = a => a.replace(/stroke="[^"]*"/, 'stroke="none"');
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const mul = (a, k) => [a[0] * k, a[1] * k];
  const norm = a => { const L = Math.hypot(a[0], a[1]) || 1; return [a[0] / L, a[1] / L]; };
  const cloche = u => { u = Math.abs(u); return u >= 1 ? 0 : (1 + Math.cos(Math.PI * u)) / 2; };

  // Courbe lissée (Catmull-Rom) échantillonnée en polyligne.
  const courbe = (P, ferme = false, n = 10) => {
    const N = P.length, g = i => ferme ? P[((i % N) + N) % N] : P[Math.max(0, Math.min(N - 1, i))];
    const out = [], segs = ferme ? N : N - 1;
    for (let i = 0; i < segs; i++) {
      const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      for (let k = 0; k < n; k++) {
        const t = k / n, t2 = t * t, t3 = t2 * t;
        out.push([0, 1].map(j => 0.5 * (2 * p1[j] + (p2[j] - p0[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2 + (3 * p1[j] - p0[j] - 3 * p2[j] + p3[j]) * t3)));
      }
    }
    if (!ferme) out.push(P[N - 1].slice());
    return out;
  };
  // Décale une polyligne de d vers sa gauche (y vers le bas : vers le haut pour une ligne qui va à droite).
  const decale = (Q, d) => Q.map((p, i) => {
    const a = Q[Math.max(0, i - 1)], b = Q[Math.min(Q.length - 1, i + 1)];
    const u = norm([b[0] - a[0], b[1] - a[1]]);
    return [p[0] + u[1] * d, p[1] - u[0] * d];
  });
  // y d'une polyligne (x croissant) à l'abscisse x.
  const yA = (Q, x) => {
    for (let i = 0; i < Q.length - 1; i++) {
      const a = Q[i], b = Q[i + 1];
      if ((a[0] - x) * (b[0] - x) <= 0 && a[0] !== b[0]) return a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0]);
    }
    return x < Q[0][0] ? Q[0][1] : Q[Q.length - 1][1];
  };
  // Une goutte qui tombe, pointe en haut.
  const goutte = (x, y, s = 1) => h.path(`M${f(x)} ${f(y - 6 * s)} Q${f(x + 4.2 * s)} ${f(y + 0.5 * s)} ${f(x)} ${f(y + 3.5 * s)} Q${f(x - 4.2 * s)} ${f(y + 0.5 * s)} ${f(x)} ${f(y - 6 * s)} Z`, blanc(A.detail));
  // Une cubique échantillonnée, sans son premier point.
  const cub = (p0, c1, c2, p3, n = 8) => {
    const out = [];
    for (let k = 1; k <= n; k++) {
      const t = k / n, m = 1 - t;
      out.push([0, 1].map(j => m * m * m * p0[j] + 3 * m * m * t * c1[j] + 3 * m * t * t * c2[j] + t * t * t * p3[j]));
    }
    return out;
  };
  // La silhouette d'une bouteille de métal couchée, le fond en s = 0, le goulot vers +s, rentrée de k :
  // corps de rayon r jusqu'à L, épaule jusqu'à L + 10, goulot de rayon rn jusqu'à L + 17.
  const silhouette = (L, r, k = 0) => {
    const rn = r * 0.42, R = r - k, Rn = rn - k, c = 5;
    const haut = [[k + c, -R], [L, -R], ...cub([L, -R], [L + 7, -R], [L + 7, -Rn], [L + 11, -Rn]), [L + 17, -Rn]];
    const bas = haut.map(([s, v]) => [s, -v]).reverse();
    return [...haut, ...bas, [k + c, R], ...cub([k + c, R], [k, R], [k, R], [k, R - c], 4), ...cub([k, -R + c], [k, -R], [k, -R], [k + c, -R], 4).slice(0, -1)];
  };
  // Une bouteille vue de côté, le fond à gauche : silhouette hachurée métal et bouchon.
  const bouteille = (x0, y, L, r) => {
    const rc = r * 0.52, Q = silhouette(L, r).map(([s, v]) => [x0 + s, y + v]);
    return [h.path(trace(Q, true), A.hachure('metal', 'contour')), h.rect(x0 + L + 17, y - rc, 11, 2 * rc, blanc(A.arete)),
      h.ligne(x0 + L + 20.5, y - rc, x0 + L + 20.5, y + rc, A.fin), h.ligne(x0 + L + 24, y - rc, x0 + L + 24, y + rc, A.fin)].join('\n');
  };

  // ─── 1. Tremper, essorer : le linge tenu debout au-dessus du bol, tordu à deux mains ─────
  // Vu du côté droit de celui qui tord : la main droite en haut, vue du dos, le pouce par-dessus ;
  // la main gauche en bas, vue du côté des doigts qui passent devant le linge. Les deux avant-bras
  // viennent de la gauche, les deux pouces vers le haut, les poignets qui tournent en sens contraires.
  const tord = z => ({ xT: z.l * 0.64, y1: 40, y2: 106, e: 0.48, d: 15 });
  const SM_TORD = 0.46;                         // les poings du modèle s11 : 51 de large, l'un sur l'autre
  const essorer = z => {
    const { xT, y1, y2, e, d } = tord(z);
    const out = [];
    // le bol d'eau chaude, sous le bout du linge
    const yb = z.h - 30, rx = 34, xm = xT;
    out.push(h.path(`M${xm - rx} ${yb} C${xm - rx + 2} ${yb + 26}, ${xm - 24} ${yb + 36}, ${xm} ${yb + 36} C${xm + 24} ${yb + 36}, ${xm + rx - 2} ${yb + 26}, ${xm + rx} ${yb}`, blanc(A.contour)));
    out.push(h.ellipse(xm, yb, rx, 7, blanc(A.contour)));
    out.push(h.ellipse(xm, yb + 2.5, rx - 5, 4.2, A.hachure('eau', 'detail')));
    // le bout du haut, lâche, qui retombe par-dessus le poing
    const haut = courbe([[xT - 5, y1 - 8], [xT - 7, y1 - 22], [xT - 4, y1 - 34], [xT + 4, y1 - 38], [xT + 10, y1 - 30], [xT + 13, y1 - 18], [xT + 6, y1 - 8]], true, 6);
    out.push(h.path(trace(haut, true), blanc(A.arete)), h.path(trace(haut, true), sansTrait(A.hachure('eau', 'detail'))));
    // le bout du bas, qui pend sous le poing et dégoutte
    const bas = courbe([[xT - 6, y2 + 8], [xT - 8, y2 + 18], [xT - 10, y2 + 27], [xT - 5, y2 + 24], [xT - 1, y2 + 30], [xT + 3, y2 + 25], [xT + 8, y2 + 29], [xT + 9, y2 + 18], [xT + 6, y2 + 8]], true, 6);
    out.push(h.path(trace(bas, true), blanc(A.arete)), h.path(trace(bas, true), sansTrait(A.hachure('eau', 'detail'))));
    out.push(goutte(xT - 1, y2 + 39, 0.8), goutte(xT + 2, y2 + 50, 0.7));
    // le linge tordu entre les deux poings : plus mince au milieu, les plis en spirale (l'objet que les mains tiennent)
    const iL = out.length;
    const ym = (y1 + y2) / 2, hw = y => d / 2 - 1.2 + 2.5 * Math.pow(Math.abs((y - ym) / (y2 - ym)), 1.5);
    const ys = []; for (let y = y1 - 10; y <= y2 + 10.01; y += 2) ys.push(y);
    out.push(h.path(trace([...ys.map(y => [xT - hw(y), y]), ...ys.slice().reverse().map(y => [xT + hw(y), y])], true), blanc(A.arete)));
    for (let y = y1 + 10; y < y2 - 12; y += 6) out.push(h.path(`M${f(xT - hw(y))} ${f(y)} Q${f(xT)} ${f(y + 1)} ${f(xT + hw(y + 5))} ${f(y + 5)}`, A.detail));
    // les deux mains (mains simples, prises.deuxMains) : le linge tordu passe DANS les deux poings, derrière les
    // doigts. La droite en haut, vue du dos ; la gauche en bas, vue du côté des doigts ; les deux avant-bras viennent
    // de la gauche et sortent du cadre. Le linge roulé fait 31 mm (d / e).
    const linge = out.splice(iL).join('\n');
    const bord = { x0: 0, y0: 0, x1: z.l, y1: z.h };
    out.push(String(PR.deuxMains(F.mainSimple, { echelle: e, manche: { x0: xT, y0: y1 - 40, x1: xT, y1: y2 + 40, r: d / 2 }, objet: linge,
      mains: [{ t: (y1 - (y1 - 40)) / (y2 - y1 + 80), vue: 'dos', cote: 'droite', diametre: d / e, rotation: [0, 35, 0], sens: 1, avantbras: { vers: [-200, y1], bord, bras: { pli: 0 } } },
        { t: (y2 - (y1 - 40)) / (y2 - y1 + 80), vue: 'paume', cote: 'gauche', diametre: d / e, sens: 1, avantbras: { vers: [-200, y2], bord, bras: { pli: 0 } } }] })));
    // le sens de la torsion : le poing du haut tourne vers soi, celui du bas vers l'autre côté
    const tour = (y, s) => h.geste(`M${f(xT + 30)} ${f(y - 11 * s)} C${f(xT + 42)} ${f(y - 6 * s)}, ${f(xT + 42)} ${f(y + 7 * s)}, ${f(xT + 30)} ${f(y + 12 * s)}`);
    out.push(tour(y1, 1), tour(y2, -1));
    return out.join('\n');
  };

  // ─── 2. Tester : le linge plié posé sur l'intérieur du poignet, la paume vers le haut ────
  // L'avant-bras couché, vu du côté du pouce, la main relâchée, paume en l'air.
  const mainTest = z => {
    const e = 0.64, x = z.l - 120, y = z.h * 0.52;
    // la main gauche, paume en l'air, vue du côté du pouce, un peu d'en haut (main simple, porte, penchée de 25°) :
    // les doigts à droite, l'avant-bras couché qui sort du cadre à gauche ; (x, y) au poignet
    const m = F.mainSimple({ x, y, ancre: 'poignet', pose: 'porte', vue: 'pouce', cote: 'droite', angle: 0, rotation: [-25, 0, 0], echelle: e,
      avantbras: { bord: { x0: 0, y0: 0, x1: z.l, y1: z.h }, bras: { pli: 0 } } });
    // le dessus de l'avant-bras (l'intérieur du poignet, la paume en l'air), lu sur le contour de la main
    const d0 = (String(m.svg).match(/<path d="([^"]+)" fill="#FFFFFF"/) || [])[1] || '';
    const pts = d0.split(/[MLZ]/).map(t => t.trim()).filter(Boolean).map(t => t.split(/\s+/).map(Number));
    const dessus = X => { let best = Infinity; for (let i = 0; i < pts.length; i++) { const a = pts[i], b = pts[(i + 1) % pts.length]; if ((a[0] - X) * (b[0] - X) < 0) best = Math.min(best, a[1] + (X - a[0]) / (b[0] - a[0]) * (b[1] - a[1])); } return best; };
    const u = [1, 0], n = [0, -1], xc = x - 14;
    return { m, u, n, P: [x, y], c: [xc, dessus(xc) - 0.5] };
  };
  const tester = z => {
    const { m, u, n, c } = mainTest(z);
    const L = 16, H = 8;
    // le linge plié en quatre, posé à plat sur l'intérieur du poignet : une galette mouillée qui
    // épouse le dessus de l'avant-bras, les plis du bord bien visibles
    const coin = (a, b) => add(c, add(mul(u, a), mul(n, b)));
    const Q = [coin(-L, 0), coin(-L - 1, H * 0.6), coin(-L + 2, H), coin(0, H + 1), coin(L - 2, H), coin(L + 1, H * 0.6), coin(L, 0), coin(L - 1, -2.5), coin(0, -3), coin(-L + 1, -2.5)];
    const linge = courbe(Q, true, 6);
    return [m.toString(), h.path(trace(linge, true), blanc(A.arete)), h.path(trace(linge, true), sansTrait(A.hachure('eau', 'detail'))),
      h.path(trace(courbe([coin(-L + 3, H * 0.45), coin(0, H * 0.6), coin(L - 3, H * 0.45)])), A.fin)].join('\n');
  };

  // ─── 3. Rouler : la bouteille posée au bord du linge sec, puis roulée dedans ─────────────
  const rouleau = z => ({ yR: z.h - 36, rR: 19, xr1: 22, xr2: 136 });
  const rouler = z => {
    const out = [];
    // avant : le linge à plat, vu d'en haut et de devant, la bouteille couchée le long du bord proche
    const yN = 100, yF = 28, dx = 16, x1 = 10, x2 = z.l - 26;
    out.push(h.path(trace(courbe([[x1, yN], [(x1 + x2) / 2, yN + 1.5], [x2, yN]]).concat(courbe([[x2 + dx, yF], [(x1 + x2) / 2 + dx, yF - 1.5], [x1 + dx, yF]])), true), blanc(A.arete)));
    const yB = yN - 16, rB = 12;
    out.push(bouteille(x1 + 14, yB, 108, rB));
    // le sens du roulé : le bord proche du linge passe par-dessus la bouteille et file vers le bord loin
    const xa = x1 + 70;
    out.push(h.geste(`M${xa - 8} ${yN + 8} C${xa - 34} ${yN - 8}, ${xa - 20} ${yB - 30}, ${xa + 6} ${yF + 20}`));
    // après : le rouleau, le fond de la bouteille à gauche, le goulot et le bouchon qui dépassent à droite
    const { yR, rR, xr1, xr2 } = rouleau(z), rb = rR - 5, rn = rb * 0.42, rc = rb * 0.52;
    out.push(h.path(`M${xr1} ${yR - rR} L${xr2} ${yR - rR} Q${xr2 + 4} ${yR} ${xr2} ${yR + rR} L${xr1} ${yR + rR} Z`, blanc(A.contour)));
    out.push(h.path(`M${xr1 + 18} ${yR - rR} C${xr1 + 40} ${yR - 4}, ${xr1 + 70} ${yR + 6}, ${xr2 - 6} ${yR + rR}`, A.detail));
    out.push(h.path(`M${xr2 - 30} ${yR - rR + 2} Q${xr2 - 24} ${yR - 6} ${xr2 - 18} ${yR - rR + 3}`, A.fin));
    // le bout du rouleau : les tours de linge autour du fond de la bouteille
    out.push(h.ellipse(xr1, yR, 7, rR, blanc(A.contour)));
    out.push(h.ellipse(xr1, yR, 5, rb, A.hachure('metal', 'detail')));
    out.push(h.path(`M${xr1} ${yR - rR + 2.5} A6 ${rR - 2.5} 0 0 0 ${xr1} ${yR + rR - 2.5}`, A.fin));
    out.push(h.rect(xr2 + 2, yR - rn, 12, 2 * rn, A.hachure('metal', 'contour')));
    out.push(h.rect(xr2 + 14, yR - rc, 11, 2 * rc, blanc(A.arete)));
    out.push(h.ligne(xr2 + 17.5, yR - rc, xr2 + 17.5, yR + rc, A.fin), h.ligne(xr2 + 21, yR - rc, xr2 + 21, yR + rc, A.fin));
    return out.join('\n');
  };

  // ─── 4. Couché : le malade sur le dos, la compresse sur la cuisse ─────────────────────────
  // Le corps simple de profil (couche-dos), centré ; la compresse (sous sa serviette) bombée sur le
  // dessus de la cuisse, à mi-chemin de la hanche au genou, posée sur le contour du corps.
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
  const memoC = {};
  const couche = z => {
    const e = 0.28, lit = z.h - 6, cle = [z.l, z.h].join(',');
    const c = memoC[cle] || (memoC[cle] = F.corps({ x: 0, y: lit, pose: 'couche-dos', echelle: e }));
    const dx = (z.l - (c.boite.x1 - c.boite.x0)) / 2 - c.boite.x0;
    const A = c.articulations, dessus = x => Math.min(...coupesX(c, x - dx));
    const out = [];
    out.push(h.ligne(0, lit, z.l, lit, A_.arete));
    out.push(`<g transform="translate(${f(dx)} 0)">\n${c}\n</g>`);
    // la compresse sous sa serviette : 260 mm de long, 70 mm d'épaisseur, bombée
    const xc = A.hancheP[0] + 0.5 * (A.genouP[0] - A.hancheP[0]) + dx, L = 130 * e, H = 70 * e;
    const haut = [], bas = [];
    for (let k = 0; k <= 24; k++) {
      const t = -1 + 2 * k / 24, x = xc + t * L, yb = dessus(x);
      haut.push([x, yb - H * Math.pow(1 - Math.pow(Math.abs(t), 3), 0.6)]);
      bas.push([x, yb + 0.6]);
    }
    out.push(h.path(trace([...haut, ...bas.reverse()], true), A_.hachure('isolant', 'arete')));
    return out.join('\n');
  };

  // ─── 5. En coupe : la compresse sur l'abcès, coupée par le milieu ───────────────────────
  // La cuisse vue de côté comme au-dessus (hanche à gauche, genou à droite), coupée net en
  // dessous ; la compresse coupée en long, dans l'axe de la cuisse.
  const geo = z => {
    const xm = z.l / 2 - 6, yS = z.h - 46, xa = xm - 14;
    const peau = []; for (let x = 0; x <= z.l + 0.01; x += 3) peau.push([x, yS + 0.00032 * (x - xm) * (x - xm) - 6 * cloche((x - xa) / 22)]);
    // le linge mouillé : sur la peau, par-dessus la bosse
    const lg = xm - (176 + 17) / 2 - 4 - 9, ld = lg + 176 + 17;
    const lm = peau.filter(p => p[0] >= lg && p[0] <= ld);
    const lmDessus = decale(lm, 9);
    const profil = x => (x >= lg && x <= ld) ? yA(lmDessus, x) : yA(peau, x);
    // le rouleau : la bouteille couchée dans l'axe de la cuisse, deux tours de linge sec autour
    const L = 176, r = 24, ep = 9, s1 = -7, s2 = L + 6, u0 = xm - (L + 17) / 2 - 4;
    let appuiMin = Infinity;
    for (let s = s1; s <= s2; s += 2) appuiMin = Math.min(appuiMin, profil(u0 + s));
    const O = [u0, appuiMin - r - ep];
    const T = (s, v) => [O[0] + s, O[1] + v];
    // la serviette : de la peau à la peau, par-dessus le rouleau et le bouchon
    const xG = u0 + s1 - r - ep - 26, xD = u0 + L + 17 + 11 + 36, rc = r * 0.52;
    const servIn = courbe([[xG - 22, yA(peau, xG - 22)], [xG, yA(peau, xG) - 0.5], [xG + 12, yA(peau, xG + 12) - 12], T(s1 - r - ep - 3, 0), T(s1 - 4, -r - ep - 1),
      T(60, -r - ep - 0.5), T(120, -r - ep - 0.5), T(s2 + 3, -r - ep - 1), T(L + 17 + 14, -rc - 3), [xD - 16, yA(peau, xD - 16) - 4], [xD, yA(peau, xD)], [xD + 22, yA(peau, xD + 22)]], false, 10);
    const serv = decale(servIn, 12);
    return { xa, peau, lm, lmDessus, profil, T, L, r, ep, s1, s2, rc, servIn, serv };
  };
  const monte = z => {
    const g = geo(z), { T, L, r, ep, s1, s2, peau, profil } = g;
    const out = [];
    // la cuisse : la peau en haut, coupée net en dessous d'un trait de coupure
    const fondY = z.h - 16;
    const coupure = []; for (let x = z.l; x >= 0; x -= 6) coupure.push([x, fondY + 4 * Math.sin(x / 19)]);
    out.push(h.path(trace([...peau, ...coupure], true), blanc('fill="none" stroke="none"')));
    out.push(h.path(trace(peau), A.contour), h.path(trace(coupure), A.detail));
    // l'abcès : la poche de pus sous la bosse
    const yAb = yA(peau, g.xa) + 16;
    out.push(h.ellipse(g.xa, yAb, 20, 10, A.hachure('neige', 'cache')));
    // le linge mouillé
    out.push(h.path(trace([...g.lm, ...g.lmDessus.slice().reverse()], true), A.hachure('eau', 'arete')));
    // le linge sec : la bande du dessous épouse le linge mouillé et la peau, celle du dessus est droite
    const dessous = []; for (let s = s1; s <= s2 + 0.01; s += 2) dessous.push(T(s, r));
    const appui = dessous.map(p => [p[0], profil(p[0])]);
    out.push(h.path(trace([...dessous, ...appui.slice().reverse()], true), A.hachure('grillage', 'arete')));
    out.push(h.path(trace([T(s1, -r - ep), T(s2, -r - ep), T(s2, -r), T(s1, -r)], true), A.hachure('grillage', 'arete')));
    out.push(h.path(trace([T(s1, -r - ep / 2), T(s2, -r - ep / 2)]), A.detail));
    // le rouleau se referme autour du fond de la bouteille
    const arc = (R, a0, a1) => { const q = []; for (let k = 0; k <= 16; k++) { const t = a0 + (a1 - a0) * k / 16; q.push(T(s1 + R * Math.cos(t), R * Math.sin(t))); } return q; };
    out.push(h.path(trace([...arc(r + ep, -Math.PI / 2, -3 * Math.PI / 2), ...arc(r, -3 * Math.PI / 2, -Math.PI / 2)], true), A.hachure('grillage', 'arete')));
    // second trait du renvoi 5, vers la bande du dessous
    { const c = T(24, r + ep / 2); out.push(`<line x1="28" y1="74" x2="${f(c[0])}" y2="${f(c[1])}" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/><line x1="28" y1="74" x2="${f(c[0])}" y2="${f(c[1])}" fill="none" stroke="#000000" stroke-width="0.5" stroke-dasharray="3 2.5"/><circle cx="${f(c[0])}" cy="${f(c[1])}" r="1.8" fill="#000000" stroke="#FFFFFF" stroke-width="0.7"/>`);  }
    out.push(h.path(trace(arc(r + ep / 2, -Math.PI / 2, -3 * Math.PI / 2)), A.detail));
    out.push(h.path(trace(dessous.map(p => [p[0], (p[1] + profil(p[0])) / 2])), A.detail));
    // la bouteille, coupée en long : la paroi de métal en noir, l'eau chaude dedans, le bouchon
    const w = 2.6, rc = g.rc;
    const dehors = silhouette(L, r).map(([s, v]) => T(s, v)), dedans = silhouette(L, r, w).map(([s, v]) => T(s, v));
    out.push(h.path(trace(dehors, true), A.plein));
    out.push(h.path(trace(dedans, true), 'fill="#FFFFFF" stroke="none"'));
    out.push(h.path(trace(dedans, true), sansTrait(A.hachure('eau', 'fin'))));
    out.push(h.path(trace([T(L + 17, -rc), T(L + 29, -rc), T(L + 29, rc), T(L + 17, rc)], true), A.plein));
    // la serviette
    out.push(h.path(trace([...g.servIn, ...g.serv.slice().reverse()], true), A.hachure('isolant', 'arete')));
    return out.join('\n');
  };

  // ─── 6. Après : le linge qui a servi part à la casserole ─────────────────────────────────
  const bouillir = z => {
    const out = [], yP = z.h - 44, xc = z.l / 2 - 8;
    // le poêle : le dessus de fonte, le devant et sa porte
    out.push(h.rect(0, yP, z.l, 10, A.hachure('metal', 'contour')));
    out.push(h.ligne(6, yP + 10, 6, z.h, A.contour), h.ligne(z.l - 6, yP + 10, z.l - 6, z.h, A.contour));
    out.push(h.path(`M26 ${z.h} L26 ${yP + 20} L${z.l - 26} ${yP + 20} L${z.l - 26} ${z.h}`, A.arete));
    out.push(h.ligne(z.l - 40, yP + 28, z.l - 40, yP + 40, A.contour), h.cercle(z.l - 40, yP + 28, 2.5, blanc(A.detail)));
    // la casserole, coupée : parois, eau, bulles, queue
    const x1 = xc - 52, x2 = xc + 52, yH = yP - 56, w = 4, yE = yH + 12;
    out.push(h.path(trace([[x1, yH], [x1, yP], [x2, yP], [x2, yH], [x2 - w, yH], [x2 - w, yP - w], [x1 + w, yP - w], [x1 + w, yH]], true), A.plein));
    out.push(h.rect(x1 + w, yE, x2 - x1 - 2 * w, yP - w - yE, sansTrait(A.hachure('eau', 'fin'))));
    out.push(h.ligne(x1 + w, yE, x2 - w, yE, A.detail));
    for (const [bx, by, br] of [[xc - 30, yP - 12, 3], [xc - 22, yP - 26, 2.4], [xc + 26, yP - 15, 3], [xc + 36, yP - 32, 2.2], [xc - 38, yE + 10, 2], [xc + 18, yE + 8, 2]]) out.push(h.cercle(bx, by, br, blanc(A.fin)));
    out.push(h.path(`M${x2} ${yH + 10} L${z.l - 4} ${yH + 4} L${z.l - 4} ${yH + 12} L${x2} ${yH + 17} Z`, blanc(A.contour)));
    // la vapeur
    for (const vx of [x1 + 10, x2 - 10]) out.push(h.path(`M${vx} ${yH - 4} c-5 -7 5 -10 0 -16 c-5 -7 5 -10 0 -16`, A.detail));
    // le linge qui a servi, mou, qui tombe dedans
    const y0 = yH - 80;
    const lin = courbe([[xc - 20, y0], [xc + 2, y0 + 4], [xc + 22, y0 + 1], [xc + 26, y0 + 22], [xc + 30, y0 + 44], [xc + 18, y0 + 52], [xc + 6, y0 + 46], [xc - 6, y0 + 56], [xc - 20, y0 + 48], [xc - 28, y0 + 52], [xc - 26, y0 + 26]], true, 6);
    out.push(h.path(trace(lin, true), blanc(A.arete)));
    out.push(h.path(trace(lin, true), sansTrait(A.hachure('eau', 'detail'))));
    out.push(h.path(`M${xc - 10} ${y0 + 3} Q${xc - 12} ${y0 + 26} ${xc - 6} ${y0 + 54}`, A.fin), h.path(`M${xc + 12} ${y0 + 3} Q${xc + 12} ${y0 + 26} ${xc + 16} ${y0 + 50}`, A.fin));
    out.push(h.fleche(`M${xc} ${y0 + 62} L${xc} ${yE + 12}`, A.arete));
    return out.join('\n');
  };

  return {
    ref: '28-04',
    titre: 'La compresse chaude qui garde sa chaleur',
    desc: 'Le linge de coton trempé dans l’eau chaude et essoré en le tordant, testé sur l’intérieur du poignet ; une bouteille de métal d’eau chaude (ou le sac de sable chauffé) roulée dans un linge sec ; le malade couché, la compresse sur la cuisse sous une serviette ; la même en coupe : le linge mouillé sur l’abcès, le rouleau par-dessus, la serviette sur le tout ; le linge qui a servi part bouillir.',
    format: 'pleine',
    disposition: [['essorer', 'tester', 'rouler'], ['couche'], ['monte', 'bouillir']],
    hauteurs: [1.95, 1.3, 2.05],
    largeurs: [[1.1, 1, 1.1], [1], [2.1, 1]],
    vues: {
      essorer: {
        titre: 'Tremper, essorer',
        dessin: essorer,
        renvois: z => { const t = tord(z), ym = (t.y1 + t.y2) / 2; return [{ n: 1, rond: [z.l - 12, ym], cible: [t.xT + 3, ym], texte: 'Linge de coton trempé, essoré' }]; },
      },
      tester: {
        titre: 'Tester sur le poignet',
        dessin: tester,
        renvois: z => { const t = mainTest(z); return [{ n: 2, rond: [26, 30], cible: t.c, texte: 'Chaud, jamais brûlant' }]; },
      },
      rouler: {
        titre: 'Rouler la bouteille',
        dessin: rouler,
        renvois: z => { const r = rouleau(z); return [{ n: 3, rond: [z.l - 14, r.yR + 22], cible: [r.xr2 - 22, r.yR + 9], texte: 'Roulée dans un linge sec' }]; },
      },
      couche: {
        titre: 'Couché, la compresse sur la cuisse',
        dessin: couche,
      },
      monte: {
        titre: 'La même, coupée par le milieu',
        dessin: monte,
        renvois: z => {
          const g = geo(z), T = g.T, sv = g.serv[Math.round(g.serv.length * 0.42)];
          return [
            { n: 4, rond: [sv[0] - 60, 18], cible: add(sv, [0, 6]), texte: 'Serviette par-dessus le tout' },
            { n: 5, rond: [22, 70], cible: T(10, -g.r - g.ep / 2), texte: 'Linge sec roulé autour, dessus et dessous' },
            { n: 6, rond: [z.l - 22, 64], cible: T(g.L - 50, 8), texte: 'Bouteille d’eau chaude' },
            { n: 7, rond: [z.l - 70, z.h - 30], cible: [g.xa + 44, g.profil(g.xa + 44) + 4], texte: 'Linge mouillé sur l’abcès' },
            { n: 8, rond: [70, z.h - 30], cible: [g.xa - 10, yA(g.peau, g.xa) + 16], texte: 'Abcès' },
          ];
        },
      },
      bouillir: {
        titre: 'Après, à la casserole',
        dessin: bouillir,
        renvois: z => [{ n: 9, rond: [z.l - 16, 58], cible: [z.l / 2 + 12, z.h - 44 - 56 - 52], texte: 'Sert une fois, puis bouilli' }],
      },
    },
    danger: 'Danger — une peau déjà insensible, celle d’une cellulite ou d’un malade qui somnole, ne dit pas que ça brûle : le test se fait sur l’intérieur de son propre poignet, avant de poser le linge.',
  };
};
