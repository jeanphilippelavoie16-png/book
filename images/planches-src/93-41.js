// Planche 93-41 — sécher en suspendant (ch. 93 §9 ; ch. 92 §9 « Les claies » ; ch. 33 §5-C point 1).
// Les tranches enfilées en guirlande sur un fil de pêche ou une babiche fine, sans se toucher ;
// les petites bottes liées, suspendues tête en bas à un fil, à côté du poêle dans l'air qui monte
// et non au-dessus ; l'hiver, les tranches suspendues dehors, à l'abri de la neige et des oiseaux.
// Aucune cote : les passages n'en donnent aucune pour ces montages.
// Ajouts que les passages ne nomment pas, pour que la chose se voie et tienne : les deux poteaux et
// leurs clous (où la guirlande s'accroche), les clous au plafond, la boucle de cordelette qui pend
// la botte au fil, et dehors l'avant-toit (contre la neige) et la moustiquaire nouée (contre les
// oiseaux) : le chapitre dit « à l'abri », pas avec quoi.
// La charte : sur le fil, les tranches au contour fort et les poteaux ramenés à l'arête ; le
// poêle, qui n'est là que pour situer les bottes, recule en gris loin. Le rouge : le vide entre
// deux tranches (le point à vérifier : elles ne se touchent pas) et, au-dessus du poêle, la zone
// où la feuille cuit. Les flèches d'air restent noires.

module.exports = (h) => {
  const f = v => Math.round(v * 10) / 10;
  const blanc = a => a.replace('fill="none"', 'fill="#FFFFFF"');
  const nb = ' ';

  // ── La tranche : coupe en long d'un champignon à chapeau et pied, générique ─────────
  // Repère : demi-largeur du chapeau = 1 ; le point de perçage (0, 0) est au cœur de la chair
  // du chapeau. T(x, y) rend les coordonnées de vue.
  const PERCE = -0.12;
  const trancheD = T => {
    const p = (x, y) => { const q = T(x, y - PERCE); return `${f(q[0])} ${f(q[1])}`; };
    return `M ${p(-1, 0.15)} C ${p(-1.05, -0.75)} ${p(1.05, -0.75)} ${p(1, 0.15)} ` +
      `Q ${p(0.7, 0.36)} ${p(0.28, 0.32)} C ${p(0.33, 0.6)} ${p(0.3, 0.85)} ${p(0.25, 1.05)} ` +
      `Q ${p(0, 1.12)} ${p(-0.25, 1.05)} C ${p(-0.3, 0.85)} ${p(-0.33, 0.6)} ${p(-0.28, 0.32)} ` +
      `Q ${p(-0.7, 0.36)} ${p(-1, 0.15)} Z`;
  };
  const lamellesD = T => {
    const p = (x, y) => { const q = T(x, y - PERCE); return `${f(q[0])} ${f(q[1])}`; };
    return `M ${p(-0.93, 0.1)} Q ${p(-0.55, 0.17)} ${p(-0.28, 0.24)} L ${p(0.28, 0.24)} Q ${p(0.55, 0.17)} ${p(0.93, 0.1)}`;
  };
  // Tranche vue de trois quarts, percée au point (cx, cy) : la face avant regarde vers la gauche,
  // l'épaisseur t se voit à droite. Le fil vient de la gauche, entre dans la face, ressort derrière.
  const tranche = (cx, cy, s, k, t, trait = h.a.arete) => {
    const Tf = (x, y) => [cx + k * s * x, cy + s * y];
    const Tb = (x, y) => [cx + t + k * s * x, cy + s * y];
    return {
      svg: [
        h.path(trancheD(Tb), blanc(h.a.detail)),
        h.path(trancheD(Tf), blanc(trait)),
        h.path(lamellesD(Tf), h.a.fin),
      ].join('\n'),
      gauche: cx - k * s * 0.99,
      droite: cx + t + k * s * 0.99,
    };
  };

  // Un fil qui pend entre deux points : parabole de flèche « sag ».
  const pend = (x0, y0, x1, y1, sag) => x => {
    const u = (x - x0) / (x1 - x0);
    return y0 + (y1 - y0) * u + 4 * sag * u * (1 - u);
  };
  const trace = (x0, x1, Y, n = 40) => {
    const pts = [];
    for (let i = 0; i <= n; i++) { const x = x0 + (x1 - x0) * i / n; pts.push([f(x), f(Y(x))]); }
    return pts;
  };

  // La guirlande complète : fil, tranches, entrée du fil dans chaque face.
  const guirlande = (x0, y0, x1, y1, sag, n, s, k, t, marge, trait = h.a.arete) => {
    const Y = pend(x0, y0, x1, y1, sag), o = [], xs = [];
    o.push(h.chemin(trace(x0, x1, Y), h.a.arete));
    const a = x0 + marge, b = x1 - marge;
    for (let i = 0; i < n; i++) xs.push(a + (b - a) * i / (n - 1));
    const tr = xs.map(x => tranche(x, Y(x), s, k, t, trait));
    tr.forEach((q, i) => {
      o.push(q.svg);
      const xg = q.gauche;
      o.push(h.path(`M ${f(xg)} ${f(Y(xg))} L ${f(xs[i])} ${f(Y(xs[i]))}`, h.a.arete));
      o.push(h.cercle(f(xs[i]), f(Y(xs[i])), Math.max(1, s * 0.05), h.a.plein));
    });
    return { svg: o.join('\n'), Y, xs, tr };
  };

  // ── La feuille et la botte ──────────────────────────────────────────────────────────
  const feuille = (x, y, ang, L, w) => {
    const c = Math.cos(ang), sn = Math.sin(ang);
    const P = (u, v) => [x + c * u - sn * v, y + sn * u + c * v];
    const q = (u, v) => { const r = P(u, v); return `${f(r[0])} ${f(r[1])}`; };
    return [
      h.path(`M ${q(0, 0)} C ${q(L * 0.3, w)} ${q(L * 0.75, w * 0.9)} ${q(L, 0)} C ${q(L * 0.75, -w * 0.9)} ${q(L * 0.3, -w)} ${q(0, 0)} Z`, blanc(h.a.detail)),
      h.path(`M ${q(0, 0)} L ${q(L * 0.85, 0)}`, h.a.fin),
    ].join('\n');
  };
  // Botte liée au point (x, y), les tiges vers le haut, les feuilles pendantes vers le bas ;
  // e = échelle (1 : 60 de long). Rend aussi le haut des liens, où monte la boucle.
  const botte = (x, y, e, graine = 0) => {
    const o = [], tiges = [], lg = 58 * e;
    const angs = [-0.34, -0.2, -0.07, 0.07, 0.2, 0.33].map((a, i) => a + 0.03 * Math.sin(i * 2.1 + graine));
    // tiges : bouts coupés au-dessus des liens, éventail en bas
    angs.forEach((a, i) => {
      const L = lg * (0.84 + 0.12 * Math.sin(i * 1.7 + graine));
      const bx = x + Math.sin(a) * L, by = y + Math.cos(a) * L;
      tiges.push({ a, L, bx, by });
      const top = y - 7 * e + 1.2 * e * Math.sin(i * 2.3 + graine);
      o.push(h.path(`M ${f(x + (i - 2.5) * 1.1 * e)} ${f(top)} Q ${f(x + (i - 2.5) * 1.3 * e)} ${f(y + 6 * e)} ${f(bx)} ${f(by)}`, h.a.detail));
    });
    // feuilles le long des tiges, pendantes, en alternance
    tiges.forEach((tg, i) => {
      [0.35, 0.55, 0.75, 0.97].forEach((u, j) => {
        const px = x + Math.sin(tg.a) * tg.L * u, py = y + Math.cos(tg.a) * tg.L * u;
        const cote = (i + j) % 2 ? 1 : -1;
        const ang = Math.PI / 2 - tg.a + cote * (u > 0.9 ? 0.05 : 0.55);
        const L = (u > 0.9 ? 15 : 13) * e, w = 3.6 * e;
        o.push(feuille(px, py, ang, L, w));
      });
    });
    // liens : trois tours serrés sur les tiges
    const lw = 7.5 * e;
    for (let k = 0; k < 3; k++) {
      const yy = y - 2.4 * e + k * 2.2 * e;
      o.push(h.rect(f(x - lw / 2), f(yy - 0.9 * e), f(lw), f(1.8 * e), blanc(h.a.detail)));
    }
    return { svg: o.join('\n'), haut: y - 2.4 * e - 0.9 * e, bas: y + lg * 1.05 };
  };
  // Boucle de cordelette qui monte des liens, passe par-dessus le fil et redescend :
  // le brin avant passe devant le fil, le brin arrière derrière.
  const boucle = (x, yLien, yFil, e, ep) => h.formes.cordes([
    { pts: [[x - 2.5 * e, yLien + 1], [x - 3.2 * e, yFil + 5 * e], [x - 1.2 * e, yFil - 3.2 * e], [x + 2.5 * e, yFil - 2.6 * e], [x + 3.2 * e, yFil + 4 * e], [x + 2.5 * e, yLien + 1]], ep, debut: 'fixe', fin: 'fixe' },
  ], { trait: 'detail' });

  // ── Vue 1 : sur un fil — la guirlande en haut, les bottes en bas ────────────────────
  const G = z => {
    const wp = 10, k = 0.56;
    const s = Math.min(26, (z.l - 2 * wp - 20) / (4 * (2 * k + 0.12 + 0.5)));
    const t = Math.max(2.5, s * 0.12);
    const yG = Math.round(0.5 * s) + 12, sagG = 5;          // fil de la guirlande
    const yB = Math.round(z.h * 0.46), sagB = 6;            // fil des bottes
    const e = Math.min(1.1, (z.h - yB - 12) / 84);
    const x0 = wp + 10, x1 = z.l - wp - 10;
    return { wp, k, s, t, yG, sagG, yB, sagB, e, x0, x1, n: 4, marge: Math.round(s * 0.72) };
  };
  const clou = (xp, y, sg) => [
    h.rect(Math.min(xp, xp + sg * 10), y - 1, 10, 2, h.a.plein),
    h.rect(xp + sg * 10 - (sg > 0 ? 0 : 2), y - 3.5, 2, 7, h.a.plein),
    h.ellipse(xp + sg * 5, y, 1.6, 3, h.a.detail),
    h.ellipse(xp + sg * 7.2, y, 1.6, 3, h.a.detail),
  ].join('\n');
  const dessinG = z => {
    const g = G(z), o = [];
    // deux poteaux coupés par la vue, deux clous dans chacun
    o.push(h.rect(0, 0, g.wp, z.h, h.a.hachure('bois', 'arete')));
    o.push(h.rect(z.l - g.wp, 0, g.wp, z.h, h.a.hachure('bois', 'arete')));
    [g.yG, g.yB].forEach(y => { o.push(clou(g.wp, y, 1)); o.push(clou(z.l - g.wp, y, -1)); });
    // la guirlande
    o.push(guirlande(g.x0 - 2, g.yG, g.x1 + 2, g.yG, g.sagG, g.n, g.s, g.k, g.t, g.marge, h.a.contour).svg);
    // le point à vérifier : le vide entre deux tranches, qui ne se touchent pas
    {
      const YG = pend(g.x0 - 2, g.yG, g.x1 + 2, g.yG, g.sagG);
      const a = g.x0 + g.marge, b = g.x1 - g.marge, pas = (b - a) / (g.n - 1), xv = a + pas * 1.5 + g.t / 2;
      o.push(h.controle(xv, YG(xv) + 0.22 * g.s, 9));
    }
    // les bottes : chacune pendue au fil par sa boucle
    const Y = pend(g.x0 - 2, g.yB, g.x1 + 2, g.yB, g.sagB);
    o.push(h.chemin(trace(g.x0 - 2, g.x1 + 2, Y), h.a.arete));
    Gb(z).forEach(({ x, yL }, i) => {
      const bt = botte(x, yL, g.e, 0.4 + i * 1.9);
      o.push(bt.svg);
      o.push(boucle(x, bt.haut, Y(x), g.e, 2));
    });
    return o.join('\n');
  };
  const Gb = z => {
    const g = G(z), Y = pend(g.x0 - 2, g.yB, g.x1 + 2, g.yB, g.sagB);
    return [0.28, 0.72].map(u => { const x = g.x0 + (g.x1 - g.x0) * u; return { x, yF: Y(x), yL: Y(x) + Math.round(20 * g.e) }; });
  };

  // ── Vue 2 : les bottes à côté du poêle ──────────────────────────────────────────────
  const Pv = z => {
    const yC = 10, yF = z.h - 9, m = (yF - yC) / 2.4;       // px par mètre ; pièce de 2,4 m
    const xs0 = 12, ws = Math.round(0.55 * m), hs = Math.round(0.62 * m), pattes = Math.round(0.13 * m);
    const ybB = yF - pattes, ybT = ybB - hs;
    const xPipe = xs0 + ws * 0.55, wPipe = Math.round(0.15 * m);
    const xA = xs0 + ws + Math.round(0.1 * m), xB2 = Math.min(z.l - 10, xA + Math.round(0.9 * m));
    const sag = Math.round(0.22 * m);
    const Y = pend(xA, yC, xB2, yC, sag);
    const e = 0.62;
    const bx = [0.25, 0.75].map(u => xA + (xB2 - xA) * u);
    return { yC, yF, m, xs0, ws, hs, pattes, ybB, ybT, xPipe, wPipe, xA, xB2, sag, Y, e, bx };
  };
  const dessinP = z => {
    const p = Pv(z), o = [];
    // plafond et plancher
    o.push(h.rect(0, 0, z.l, p.yC, h.a.hachure('bois')));
    o.push(h.ligne(0, p.yC, z.l, p.yC, h.a.contour));
    o.push(h.rect(0, p.yF, z.l, z.h - p.yF, h.a.hachure('bois')));
    o.push(h.ligne(0, p.yF, z.l, p.yF, h.a.contour));
    // poêle en élévation : pattes, caisse, dessus, porte, tuyau jusqu'au plafond
    const { xs0, ws, hs, ybB, ybT } = p;
    const gris = a => a.replace('fill="none"', `fill="#E6E6E6"`);
    o.push(h.rect(xs0 + 4, ybB, 5, p.pattes, gris(h.a.arete)));
    o.push(h.rect(xs0 + ws - 9, ybB, 5, p.pattes, gris(h.a.arete)));
    o.push(h.rect(f(p.xPipe - p.wPipe / 2), p.yC, p.wPipe, ybT - 4 - p.yC, gris(h.a.arete)));
    o.push(h.ligne(f(p.xPipe - p.wPipe / 2), f(p.yC + (ybT - p.yC) * 0.55), f(p.xPipe + p.wPipe / 2), f(p.yC + (ybT - p.yC) * 0.55), h.a.detail));
    o.push(h.rect(xs0, ybT, ws, hs, gris(h.a.arete)));
    o.push(h.rect(xs0 - 3, ybT - 4, ws + 6, 4, gris(h.a.arete)));
    // la zone où la feuille cuit : toute la colonne au-dessus du poêle
    o.push(h.rect(xs0 - 6, p.yC + 5, ws + 12, ybT - 10 - p.yC - 5, h.a.zone));
    const px = xs0 + ws * 0.14, pw = ws * 0.62, py = ybT + hs * 0.24, ph = hs * 0.5;
    o.push(h.rect(f(px), f(py), f(pw), f(ph), h.a.detail));
    o.push(h.ligne(f(px + pw - 5), f(py + ph * 0.4), f(px + pw - 5), f(py + ph * 0.6), h.a.arete));
    // l'air réchauffé monte le long du flanc du poêle, puis à travers les bottes
    const xr = xs0 + ws;
    [xr + 7, xr + 19].forEach((x, i) => {
      o.push(h.fleche(`M ${f(x)} ${f(p.yF - 8)} L ${f(x)} ${f(ybT - 2)}`, h.a.cache));
      o.push(h.fleche(`M ${f(x + 2)} ${f(ybT - 12)} C ${f(x + 4)} ${f(ybT - 40)} ${f(x + 10 + i * 6)} ${f(p.yC + 60)} ${f(x + 18 + i * 10)} ${f(p.yC + 26)}`, h.a.cache));
    });
    // clous au plafond, fil qui pend, trois petites bottes
    [p.xA, p.xB2].forEach(x => o.push(h.rect(x - 1, p.yC, 2, 5, h.a.plein)));
    o.push(h.chemin(trace(p.xA, p.xB2, p.Y), h.a.arete));
    p.bx.forEach((x, i) => {
      const yF = p.Y(x), yL = yF + Math.round(20 * p.e);
      const bt = botte(x, yL, p.e, i * 1.3);
      o.push(bt.svg);
      o.push(boucle(x, bt.haut, yF, p.e, 1.5));
    });
    return o.join('\n');
  };

  // ── Vue 3 : l'hiver, dehors — coupe du mur et de l'avant-toit ──────────────────────
  // Le fil va du mur au dessous du chevron, sous le débord du toit ; la neige tombe au-delà.
  const D = z => {
    const wm = 14, xE = Math.round(z.l * 0.8), yR0 = 34, yR1 = 112, ep = 11, hN = 13;
    const pente = (yR1 - yR0) / (xE - wm);
    const dessus = x => yR0 + pente * (x - wm);            // dessus du chevron
    const dessous = x => dessus(x) + ep;                    // dessous du chevron
    const xB = xE - 18, yF = dessous(xB) + 5;               // clou sous le chevron ; hauteur du fil
    const s = 12, k = 0.56, t = 2.4, n = 4, marge = 15;
    const x0 = wm + 9, x1 = xB;
    const Y = pend(x0, yF, x1, yF, 3);
    const yG = z.h - 26;                                    // le sol
    return { wm, xE, ep, hN, pente, dessus, dessous, xB, yF, s, k, t, n, marge, x0, x1, Y, yG };
  };
  const flocon = (x, y, r = 2.6) => h.path([0, 1, 2].map(i => {
    const a = i * Math.PI / 3 + 0.3, c = Math.cos(a) * r, sn = Math.sin(a) * r;
    return `M ${f(x - c)} ${f(y - sn)} L ${f(x + c)} ${f(y + sn)}`;
  }).join(' '), h.a.detail);
  const dessinD = z => {
    const d = D(z), o = [];
    // mur coupé, du sol jusque sous le chevron
    o.push(h.chemin([[0, f(d.dessous(0))], [d.wm, f(d.dessous(d.wm))], [d.wm, d.yG], [0, d.yG]], h.a.hachure('bois', 'contour'), true));
    // chevron jusqu'au bout du débord, et sa planche de bout
    o.push(h.chemin([[0, f(d.dessus(0))], [d.xE, f(d.dessus(d.xE))], [d.xE, f(d.dessous(d.xE))], [0, f(d.dessous(0))]], h.a.hachure('bois', 'contour'), true));
    const yb = d.dessus(d.xE);
    o.push(h.rect(d.xE, f(yb - 2), 5, d.ep + 6, blanc(h.a.arete)));
    // neige sur le toit, lèvre arrondie qui déborde la planche de bout
    let dn = `M 0 ${f(d.dessus(0) - d.hN)}`;
    for (let i = 1; i <= 20; i++) {
      const x = (d.xE + 2) * i / 20;
      dn += ` L ${f(x)} ${f(d.dessus(x) - d.hN + 1.4 * Math.sin(i * 1.4) + 1 * Math.sin(i * 0.6))}`;
    }
    dn += ` Q ${d.xE + 12} ${f(yb - d.hN + 4)} ${d.xE + 10} ${f(yb - 3)} Q ${d.xE + 8} ${f(yb + 1)} ${d.xE + 5} ${f(yb - 2)} L ${d.xE} ${f(yb)} L 0 ${f(d.dessus(0))} Z`;
    o.push(h.path(dn, h.a.hachure('neige', 'arete')));
    // la neige au sol : mince sous le débord, épaisse au-delà
    let ds = `M ${d.wm} ${d.yG - 4}`;
    for (let x = d.wm; x <= z.l + 0.1; x += 4) {
      const u = Math.min(1, Math.max(0, (x - d.xE + 4) / 22));
      const ep = 4 + 14 * (u * u * (3 - 2 * u)) + 1.2 * Math.sin(x * 0.21);
      ds += ` L ${f(x)} ${f(d.yG - ep)}`;
    }
    ds += ` L ${z.l} ${z.h} L ${d.wm} ${z.h} Z`;
    o.push(h.path(ds, h.a.hachure('neige', 'arete')));
    o.push(h.rect(0, d.yG, d.wm, z.h - d.yG, h.a.hachure('terre', 'contour')));
    // la neige qui tombe, partout sauf sous le débord
    [[0.93, 0.06], [0.74, 0.1], [0.52, 0.05], [0.36, 0.03], [0.97, 0.28], [0.95, 0.45], [0.84, 0.74], [0.96, 0.8]].forEach(([u, v]) => {
      o.push(flocon(f(z.l * u), f(z.h * v)));
    });
    // clou dans le mur, clou sous le chevron
    o.push(h.rect(d.wm, f(d.yF - 1), 8, 2, h.a.plein));
    o.push(h.rect(d.wm + 7, f(d.yF - 3.5), 2, 7, h.a.plein));
    o.push(h.rect(d.xB - 1, f(d.dessous(d.xB)), 2, 6, h.a.plein));
    // la guirlande
    o.push(h.path(`M ${d.wm + 4} ${f(d.yF)} L ${d.x0} ${f(d.yF)}`, h.a.arete));
    o.push(h.ellipse(d.xB, f(d.yF), 3, 1.6, h.a.detail));
    o.push(guirlande(d.x0, d.yF, d.x1, d.yF, 3, d.n, d.s, d.k, d.t, d.marge).svg);
    // la moustiquaire : un tube enfilé sur la guirlande, noué au fil aux deux bouts
    const a = d.x0 + 4, b = d.x1 - 4, haut = [], bas = [];
    for (let i = 0; i <= 40; i++) {
      const u = i / 40, x = a + (b - a) * u, env = Math.pow(Math.sin(Math.PI * u), 0.3);
      haut.push([f(x), f(d.Y(x) - 0.85 * d.s * env)]);
      bas.push([f(x), f(d.Y(x) + 1.6 * d.s * env)]);
    }
    o.push(h.chemin([...haut, ...bas.reverse()], h.a.hachure('grillage', 'arete'), true));
    [a, b].forEach(x => o.push(h.cercle(f(x), f(d.Y(x)), 2.2, h.a.plein)));
    return o.join('\n');
  };

  return {
    ref: '93-41',
    titre: `Sécher en suspendant${nb}: la guirlande et les bottes`,
    desc: 'Les tranches de champignon enfilées en guirlande sur un fil de pêche ou une babiche fine, un vide entre chacune ; une petite botte de feuilles liée par les tiges et pendue tête en bas au fil par une boucle ; les bottes à côté du poêle, dans l’air qui monte le long de son flanc, et non au-dessus ; l’hiver, la guirlande dehors sous l’avant-toit, dans une moustiquaire nouée aux deux bouts, à l’abri de la neige et des oiseaux.',
    format: 'demi',
    disposition: [['fil', 'poele', 'dehors']],
    largeurs: [[1.12, 1, 1]],
    vues: {
      fil: {
        titre: 'Sur un fil',
        dessin: dessinG,
        renvois: z => {
          const g = G(z), Y = pend(g.x0 - 2, g.yG, g.x1 + 2, g.yG, g.sagG);
          const a = g.x0 + g.marge, b = g.x1 - g.marge, pas = (b - a) / (g.n - 1);
          const vide = i => a + pas * (i + 0.5) + g.t / 2;          // entre la tranche i et i + 1
          const yR = Math.round(g.yG + 1.25 * g.s + 16);
          const bb = Gb(z)[1];
          return [
            { n: 1, rond: [f(vide(0)), yR], cible: [f(vide(0)), f(Y(vide(0)) + 1)], texte: `fil de pêche ou babiche fine` },
            { n: 2, rond: [f(vide(2)), yR], cible: [f(vide(2)), f(Y(vide(2)) + g.s * 0.6)], texte: `un vide entre deux tranches` },
            { n: 3, rond: [z.l - g.wp - 14, f(bb.yL - 14)], cible: [f(bb.x + 4 * g.e), f(bb.yL - 1)], texte: `botte liée, tête en bas` },
          ];
        },
      },
      poele: {
        titre: 'À côté du poêle, pas au-dessus',
        dessin: dessinP,
        renvois: z => {
          const p = Pv(z), xr = p.xs0 + p.ws;
          const xf = p.xA + (p.xB2 - p.xA) * 0.35;
          return [
            { n: 4, rond: [z.l - 13, f(p.Y(p.bx[1]) + 96 * p.e)], cible: [f(p.bx[1] + 4), f(p.Y(p.bx[1]) + 66 * p.e)], texte: `les bottes, à côté du poêle` },
            { n: 5, rond: [xr + 44, p.ybT + 30], cible: [xr + 19, p.ybT + 30], texte: `l’air chaud qui monte` },
            { n: 6, rond: [p.xs0 + p.ws * 0.2, p.ybT - 22], cible: [p.xs0 + p.ws * 0.2, p.ybT - 3], texte: `au-dessus, la feuille cuit` },
          ];
        },
      },
      dehors: {
        titre: 'L’hiver, dehors',
        dessin: dessinD,
        renvois: z => {
          const d = D(z);
          return [
            { n: 7, rond: [z.l - 14, f(d.dessus(d.xE) + 40)], cible: [d.xE + 3, f(d.dessus(d.xE) + 6)], texte: `avant-toit, contre la neige` },
            { n: 8, rond: [f((d.x0 + d.x1) / 2), f(d.yF + 1.6 * d.s + 34)], cible: [f((d.x0 + d.x1) / 2), f(d.Y((d.x0 + d.x1) / 2) + 1.5 * d.s)], texte: `moustiquaire, contre les oiseaux` },
          ];
        },
      },
    },
  };
};
