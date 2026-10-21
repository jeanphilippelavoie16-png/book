// Planche 88-07 — La bannique au bâton (chapitre 88, 9-C « Plus de four »).
// Ce que le chapitre en dit : une pâte ferme, roulée en boudin et enroulée en spirale serrée
// autour d'une baguette verte écorcée, de bouleau ou de peuplier ; jamais de cèdre, de cerisier
// ni d'if ; tenue au-dessus de la braise, pas dans la flamme, et tournée ; cuite quand elle
// glisse du bâton et sonne creux.
// Trois vues : l'enroulement (la baguette tournée, le boudin qui s'y enroule, tours jointifs),
// la cuisson au-dessus de la braise, le pain cuit qui glisse du bout.
// Aucune cote : le chapitre ne donne ni diamètre de baguette, ni grosseur de boudin, ni hauteur
// au-dessus de la braise. Les proportions dessinées (baguette d'environ 25 mm, boudin d'environ
// 24 mm) ne sont que du dessin.
//
// La spirale se construit dans le repère de la baguette (u le long, vers le bout ; v en travers,
// en mm) : chaque tour est une bande vue de face, entre deux rainures en demi-cosinus (l'hélice
// projetée), fermée en haut et en bas par la section ronde du boudin. Les tours se touchent : le
// pas vaut la grosseur du boudin.
// 14 oct. : les deux mains sont des mains simples (mains/moteur.js, prise-manche vue côté paume) au lieu
// des calques s11 ; la charte : le pain et la baguette au contour 2,4, la flèche de rotation (on
// tourne la baguette) en rouge.

module.exports = (h) => {
  const A = h.a, F = h.formes;
  const f = v => Math.round(v * 10) / 10;
  const RAD = Math.PI / 180;
  const blancArete = A.arete.replace('fill="none"', 'fill="#ffffff"');
  const blancContour = A.contour.replace('fill="none"', 'fill="#ffffff"');   // la charte : l'objet du geste pèse
  const blancTrait = 'fill="none" stroke="#ffffff" stroke-width="1.1" stroke-linecap="round"';
  const halo = 'fill="none" stroke="#ffffff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"';
  const hasard = g => { let s = g; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; };
  const dPts = pts => 'M' + pts.map(p => `${f(p[0])} ${f(p[1])}`).join(' L');

  // courbe lisse échantillonnée (Catmull-Rom)
  const echant = (pts, n = 10) => {
    const out = [], P = i => pts[Math.max(0, Math.min(pts.length - 1, i))];
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
      for (let k = 0; k < n; k++) {
        const t = k / n, t2 = t * t, t3 = t2 * t;
        out.push([0, 1].map(j => 0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2
          + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t3)));
      }
    }
    out.push(pts[pts.length - 1]);
    return out;
  };

  // Le repère de la baguette : O à l'écran, ang = la direction de u à l'écran (degrés), e px/mm.
  const repere = (O, ang, e) => {
    const c = Math.cos(ang * RAD), s = Math.sin(ang * RAD);
    const T = ([u, v]) => [O[0] + e * (u * c - v * s), O[1] + e * (u * s + v * c)];
    T.e = e; T.ang = ang;
    return T;
  };

  // ─── La baguette ──────────────────────────────────────────────────────────────────────
  // De u0 (le gros bout) à u1 (la pointe) ; écorce de u0 à uB, bois nu de uB à u1.
  const RS = 12.5;                                   // rayon sur l'écorce (mm, dessin seulement)
  const rBois = u => RS * 0.9 * (1 - 0.1 * u / 600);
  const baguette = (T, u0, uB, u1, { bout = 'coupe', graine = 3 } = {}) => {
    const R = hasard(graine), out = [];
    const N = 24, haut = [], bas = [];
    const r = u => (u <= uB ? RS : rBois(u));
    const us = [];
    for (let i = 0; i <= N; i++) us.push(u0 + (uB - u0) * i / N);
    const usB = [];
    for (let i = 0; i <= N; i++) usB.push(uB + (u1 - uB) * i / N);
    // l'écorce : un cran à uB, où elle s'arrête
    us.forEach(u => { haut.push([u, -RS]); bas.push([u, RS]); });
    usB.forEach(u => { haut.push([u, -r(u) - (u === uB ? 0 : 0)]); bas.push([u, r(u)]); });
    // la pointe arrondie
    const r1 = rBois(u1), pointe = [];
    for (let i = 1; i < 12; i++) { const t = -90 + 180 * i / 12; pointe.push([u1 + r1 * 0.75 * Math.cos(t * RAD), r1 * Math.sin(t * RAD)]); }
    const contour = [...haut, ...pointe, ...bas.slice().reverse()];
    out.push(h.chemin(contour.map(T), A.blanc, true));
    if (bout === 'coupe') {
      out.push(h.chemin(contour.map(T), A.contour, true));
      // le gros bout coupé : la section vue un peu de biais, avec son cœur
      const sec = [], coeur = [];
      for (let i = 0; i < 24; i++) {
        const t = i / 24 * 2 * Math.PI;
        sec.push([u0 + RS * 0.35 * Math.cos(t), RS * Math.sin(t)]);
        coeur.push([u0 + RS * 0.12 * Math.cos(t), RS * 0.35 * Math.sin(t)]);
      }
      out.push(h.chemin(sec.map(T), blancArete, true), h.chemin(coeur.map(T), A.fin, true));
    } else {
      out.push(h.chemin(haut.concat(pointe).concat(bas.slice().reverse()).map(T), A.contour, false));
    }
    // le rebord de l'écorce, déchiré à uB
    if (uB > u0) {
      const rebord = [];
      for (let i = 0; i <= 8; i++) {
        const v = -RS + 2 * RS * i / 8;
        rebord.push([uB + (i % 2 ? 1.6 : -0.6) + (R() - 0.5) * 1.2, v]);
      }
      out.push(h.chemin(rebord.map(T), A.detail));
      // les lenticelles : de courts traits en travers de l'écorce
      for (let u = u0 + 10; u < uB - 6; u += 9 + R() * 8) {
        const v = (R() - 0.5) * RS * 1.3, l = 1.8 + R() * 2.2;
        out.push(h.chemin([[u, v - l], [u + 0.3, v + l]].map(T), A.fin));
      }
      // un nœud de rameau sur l'écorce
      const un = u0 + (uB - u0) * 0.62, nd = [];
      for (let i = 0; i < 16; i++) { const t = i / 16 * 2 * Math.PI; nd.push([un + 2.6 * Math.cos(t), -RS * 0.45 + 1.6 * Math.sin(t)]); }
      out.push(h.chemin(nd.map(T), A.fin, true));
    }
    // le fil du bois nu
    [[-0.4, 0.15, 0.55], [0.3, 0.35, 0.8], [0.05, 0.62, 0.92]].forEach(([k, a, b]) => {
      const ua = uB + (u1 - uB) * a, ub = uB + (u1 - uB) * b;
      out.push(h.chemin([[ua, k * rBois(ua)], [ub, k * rBois(ub) * 0.95]].map(T), A.fin));
    });
    return out.join('\n');
  };

  // ─── La spirale ───────────────────────────────────────────────────────────────────────
  const AB = 12;                       // demi-grosseur du boudin (mm) ; le pas vaut 2 AB : tours jointifs
  const P_ = 2 * AB, RHO = AB * 1.12, S_ = Math.sqrt(RHO * RHO - AB * AB);
  const geoSp = (Rs) => { const Rc = Rs + AB; return { Rc, Rg: Rc + S_ }; };
  // Le tour k : sommet de sa bosse du dessus à u = cx.
  const rainure = (cx, Rg, phi, dec) => [cx + dec - AB * phi / Math.PI, -Rg * Math.cos(phi)];
  const bande = (cx, Rs, libre = false) => {
    const { Rc, Rg } = geoSp(Rs), pts = [];
    const aR = Math.atan2(-S_, AB), aL = Math.atan2(-S_, -AB);
    if (libre) for (let i = 6; i >= 1; i--) pts.push(rainure(cx, Rg, Math.PI / 2 * i / 6, AB));   // remonte la rainure de droite
    for (let i = 0; i <= 14; i++) { const t = aR + (aL - aR) * i / 14; pts.push([cx + RHO * Math.cos(t), -Rc + RHO * Math.sin(t)]); }
    const phiMax = libre ? Math.PI / 2 : Math.PI;
    for (let i = 1; i <= 12; i++) pts.push(rainure(cx, Rg, phiMax * i / 12, -AB));
    if (libre) return { pts, ferme: false };
    const bL = Math.atan2(S_, -AB), bR = Math.atan2(S_, AB);
    for (let i = 1; i <= 14; i++) { const t = bL + (bR - bL) * i / 14; pts.push([cx - AB + RHO * Math.cos(t), Rc + RHO * Math.sin(t)]); }
    for (let i = 11; i >= 1; i--) pts.push(rainure(cx, Rg, Math.PI * i / 12, AB));
    return { pts, ferme: true };
  };
  // n tours, le premier (le plus vieux) vers la pointe, à cx = uD ; les suivants vers le manche.
  const spirale = (T, uD, n, Rs, { libre = false, cuite = false, graine = 5 } = {}) => {
    const R = hasard(graine), out = [];
    const { Rc } = geoSp(Rs);
    for (let k = 0; k < n; k++) {
      const cx = uD - k * P_, lib = libre && k === n - 1;
      const b = bande(cx, Rs, lib);
      out.push(h.path(dPts(b.pts.map(T)) + (b.ferme ? ' Z' : ''), blancContour));
      // les bulles de la pâte, et sur le pain cuit, les cloques de la croûte
      const nb = lib ? 1 : 2;
      for (let j = 0; j < nb; j++) {
        const phi = (lib ? 0.18 : 0.25 + 0.5 * R()) * Math.PI;
        const q = T([cx - AB * phi / Math.PI + (R() - 0.5) * AB * 0.7, -Rc * 0.85 * Math.cos(phi)]);
        out.push(h.ellipse(q[0], q[1], 1.3 + R(), 0.9 + R() * 0.5, A.fin));
      }
      if (cuite && !lib) {
        const phi = (0.3 + 0.4 * R()) * Math.PI;
        const q0 = T([cx - AB * phi / Math.PI - AB * 0.35, -Rc * 0.8 * Math.cos(phi) - 2]);
        const q1 = T([cx - AB * phi / Math.PI + AB * 0.35, -Rc * 0.8 * Math.cos(phi) + 1]);
        out.push(h.path(`M${f(q0[0])} ${f(q0[1])} Q${f((q0[0] + q1[0]) / 2)} ${f((q0[1] + q1[1]) / 2 - 3)} ${f(q1[0])} ${f(q1[1])}`, A.fin));
      }
    }
    return out.join('\n');
  };
  // Le boudin libre qui part du devant du dernier tour (à cx) : un tube, bout arrondi.
  const boudin = (T, cx, suite) => {
    const ctr = echant([[cx - AB / 2, 0], ...suite], 12);
    const g = [], d = [];
    for (let i = 0; i < ctr.length; i++) {
      const a = ctr[Math.max(0, i - 1)], b = ctr[Math.min(ctr.length - 1, i + 1)];
      let t = [b[0] - a[0], b[1] - a[1]];
      if (i === 0) t = [0, 1];
      const l = Math.hypot(t[0], t[1]) || 1, n = [-t[1] / l, t[0] / l];
      g.push([ctr[i][0] + n[0] * AB, ctr[i][1] + n[1] * AB]);
      d.push([ctr[i][0] - n[0] * AB, ctr[i][1] - n[1] * AB]);
    }
    const fin = ctr[ctr.length - 1], avant = ctr[ctr.length - 2];
    const a0 = Math.atan2(g[g.length - 1][1] - fin[1], g[g.length - 1][0] - fin[0]);
    const tt = [fin[0] - avant[0], fin[1] - avant[1]], sens = Math.sign(Math.cos(a0 - Math.PI / 2 - Math.atan2(tt[1], tt[0]))) || 1;
    const cap = [];
    for (let i = 1; i < 12; i++) { const t = a0 - sens * Math.PI * i / 12; cap.push([fin[0] + AB * Math.cos(t), fin[1] + AB * Math.sin(t)]); }
    const tour = [...g, ...cap, ...d.slice().reverse()].map(T);
    const R = hasard(17), bulles = [];
    for (let i = 8; i < ctr.length - 6; i += 9) {
      const q = T([ctr[i][0] + (R() - 0.5) * AB, ctr[i][1] + (R() - 0.5) * AB]);
      bulles.push(h.ellipse(q[0], q[1], 1.3 + R(), 0.9 + R() * 0.4, A.fin));
    }
    return [h.chemin(tour, A.blanc, true), h.chemin(tour, A.contour, false), ...bulles].join('\n');
  };
  // La flèche de rotation autour de la baguette, à u = ur : la face avant monte. C'est le geste
  // (on tourne la baguette) : la flèche rouge de la charte.
  const rotation = (T, ur, Rs) => {
    const ru = 8, rv = Rs + 13, pts = [];
    for (let t = 138; t >= -62; t -= 5) pts.push([ur + ru * Math.cos(t * RAD), rv * Math.sin(t * RAD)]);
    const d = dPts(pts.map(T));
    return [h.path(d, halo), h.geste(d)].join('\n');
  };

  // ─── Le feu ───────────────────────────────────────────────────────────────────────────
  const braise = (cx, cy, rx, ry) => {
    const pts = [[-1, 0.1], [-0.8, -0.6], [-0.3, -0.95], [0.25, -0.85], [0.75, -0.7], [1, -0.05], [0.8, 0.6], [0.2, 0.95], [-0.5, 0.85]]
      .map(([u, v]) => [cx + u * rx, cy + v * ry]);
    return [h.chemin(pts, A.plein, true),
      h.path(`M ${f(cx - rx * 0.55)} ${f(cy)} L ${f(cx - rx * 0.1)} ${f(cy + ry * 0.2)} L ${f(cx + rx * 0.45)} ${f(cy - ry * 0.25)}`, blancTrait)].join('\n');
  };
  const litBraise = (xa, xb, y0, rangs, taille, graine) => {
    const R = hasard(graine), out = [];
    for (let r = 0; r < rangs; r++) {
      let x = xa + (r ? 5 * taille : 0);
      while (x < xb - r * 8) {
        const rx = (5 + R() * 3) * taille, ry = (3.4 + R() * 1.6) * taille;
        out.push(braise(x, y0 - ry * 0.85 - r * 6.2 * taille, rx, ry));
        x += rx * 1.75 + R() * 2;
      }
    }
    return out.join('\n');
  };
  const buche = (x1, y1, x2, y2, r) => {
    const L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L, px = -uy * r, py = ux * r;
    const corps = [[x1 + px, y1 + py], [x2 + px, y2 + py], [x2 - px, y2 - py], [x1 - px, y1 - py]];
    const bout = [];
    for (let i = 0; i < 24; i++) { const t = i / 24 * 2 * Math.PI; bout.push([x2 + ux * r * 0.45 * Math.cos(t) + (px / r) * r * Math.sin(t), y2 + uy * r * 0.45 * Math.cos(t) + (py / r) * r * Math.sin(t)]); }
    return [h.chemin(corps, A.blanc, true), h.chemin(corps, A.hachure('bois', 'arete'), true),
      h.chemin(bout, blancArete, true), h.chemin(bout.map(([x, y]) => [x2 + (x - x2) * 0.4, y2 + (y - y2) * 0.4]), A.fin, true)].join('\n');
  };
  const flamme = (x, yb, ht, w) => h.path(`M ${f(x - w)} ${f(yb)} C ${f(x - w - 3)} ${f(yb - ht * 0.45)} ${f(x - 3)} ${f(yb - ht * 0.7)} ${f(x + 2)} ${f(yb - ht)} C ${f(x + 5)} ${f(yb - ht * 0.62)} ${f(x + w + 3)} ${f(yb - ht * 0.42)} ${f(x + w)} ${f(yb)} Z`, blancArete);
  const chaleur = d => [h.path(d, halo), h.fleche(d, A.cache)].join('\n');

  // ─── La main (main simple, mains/moteur.js) ─────────────────────────────────────────────
  // l'angle qui met l'axe de la prise sur `axe` (degrés à l'écran) et l'avant-bras du côté de `vers`
  const poser = (o, axe, vers) => {
    const base = Object.assign({}, o, { angle: 0, avantbras: { longueur: 100 } }); delete base.objet;
    const e0 = F.mainSimple(base); let best = null;
    for (const k of [0, 180]) {
      const a = axe - e0.prise.angle + k, m = F.mainSimple(Object.assign({}, base, { angle: a }));
      const d = [m.coude[0] - m.poignet[0], m.coude[1] - m.poignet[1]], v = [vers[0] - m.poignet[0], vers[1] - m.poignet[1]];
      const c = (d[0] * v[0] + d[1] * v[1]) / ((Math.hypot(d[0], d[1]) * Math.hypot(v[0], v[1])) || 1);
      if (!best || c > best.c) best = { a, c };
    }
    return best.a;
  };
  // le poing fermé sur la baguette (25 mm sur l'écorce), vu côté paume et penché de 25° (les doigts à
  // plat en travers, comme 104-40) : la baguette entre d'un côté du poing et ressort de l'autre, derrière
  // les doigts ; elle est peinte par le moteur entre les couches. L'avant-bras court, coupé (gros plan).
  const poing = (T, u, cote, vers, baguetteSvg, e) => {
    const p = T([u, 0]), o = { x: p[0], y: p[1], pose: 'prise-manche', vue: 'paume', cote, echelle: e, diametre: 2 * RS, rotation: [-25, 0, 0] };
    return F.mainSimple({ ...o, angle: poser(o, T.ang, vers), objet: baguetteSvg, avantbras: { vers } }).svg;
  };

  // ─── Vue 1 : l'enroulement ────────────────────────────────────────────────────────────
  const gEnr = z => {
    const e = Math.min((z.l - 30) / 640, (z.h - 20) / 250);
    const T = repere([18, 16 + 62 * e], 0, e);
    return { e, T, u0: 0, uM: 118, uB: 235, u1: 625, uD: 540, n: 6, ur: 312 };
  };
  const enroule = z => {
    const g = gEnr(z), T = g.T, out = [];
    const pM = T([g.uM, 0]);
    out.push(poing(T, g.uM, 'droite', [pM[0], pM[1] + 600], baguette(T, g.u0, g.uB, g.u1, { graine: 3 }), g.e));
    out.push(rotation(T, g.ur, rBois(g.ur)));
    out.push(spirale(T, g.uD, g.n, rBois(g.uD), { libre: true, graine: 5 }));
    const cxL = g.uD - (g.n - 1) * P_;
    out.push(boudin(T, cxL, [[cxL - 7, 44], [cxL + 22, 80], [cxL + 90, 96], [cxL + 170, 98], [cxL + 205, 94]]));
    return out.join('\n');
  };

  // ─── Vue 2 : au-dessus de la braise ───────────────────────────────────────────────────
  const gBr = z => {
    const e = Math.min(0.64, z.l / 555), yG = z.h - 24, ang = 164;
    const T = repere([z.l - 46, 70], ang, e);
    return { e, T, yG, u0: 0, uM: 58, uB: 105, u1: 330, uD: 306, n: 5, ur: 150, xf: 44 };
  };
  const auFeu = z => {
    const g = gBr(z), T = g.T, out = [];
    const tip = T([g.u1, 0]);
    // le sol
    out.push(h.rect(4, g.yG, z.l - 8, z.h - g.yG - 4, A.hachure('terre', 'fin')));
    out.push(h.ligne(4, g.yG, z.l - 4, g.yG, A.arete));
    // le feu, à gauche : les bûches croisées et la flamme
    const xf = g.xf, r = 6.5;
    out.push(flamme(xf - 17, g.yG - 17, 84, 11), flamme(xf + 15, g.yG - 15, 70, 10), flamme(xf, g.yG - 19, 124, 14));
    out.push(buche(xf + 36, g.yG - r, xf - 32, g.yG - r * 4.4, r));
    out.push(buche(xf - 38, g.yG - r, xf + 30, g.yG - r * 3.9, r * 1.1));
    // la braise tirée devant le feu, sous le pain
    out.push(litBraise(xf - 38, xf + 34, g.yG, 1, 0.9, 21));
    const b0 = xf + 34, b1 = T([g.uB - 20, 0])[0];
    out.push(litBraise(b0, b1, g.yG, 2, 0.9, 23));
    // la chaleur qui monte de la braise
    const { Rg } = geoSp(rBois(g.uD));
    [g.uD - 20, g.uD - 62, g.uD - 104].forEach(u => {
      const R_ = Rg - S_ + RHO, p = [T([u, R_]), T([u, -R_])].sort((a, b) => b[1] - a[1])[0];
      out.push(chaleur(`M ${f(p[0])} ${f(g.yG - 20)} L ${f(p[0])} ${f(p[1] + 10)}`));
    });
    // la baguette, le pain, la main
    const pm = T([g.uM, 0]);
    out.push(poing(T, g.uM, 'gauche', [pm[0] + 250, pm[1] + 600], baguette(T, g.u0, g.uB, g.u1, { graine: 9 }), g.e));
    out.push(spirale(T, g.uD, g.n, rBois(g.uD), { graine: 7 }));
    out.push(rotation(T, g.ur, rBois(g.ur)));
    return out.join('\n');
  };

  // ─── Vue 3 : cuite, elle glisse ───────────────────────────────────────────────────────
  const gCu = z => {
    const e = Math.min(0.72, (z.l - 30) / 275);
    const T = repere([20, z.h * 0.42], 0, e);
    return { e, T, u1: 170, uD: 218, n: 5 };
  };
  const cuite = z => {
    const g = gCu(z), T = g.T, out = [];
    out.push(baguette(T, 0, 30, g.u1, { graine: 11 }));
    out.push(spirale(T, g.uD, g.n, rBois(g.uD), { cuite: true, graine: 13 }));
    // la baguette cachée dans le pain, en tireté
    const { Rg } = geoSp(rBois(g.uD)), cxL = g.uD - (g.n - 1) * P_;
    const r = rBois(g.u1 - 10);
    const phT = Math.acos(r / Rg), phB = Math.PI - Math.acos(r / Rg);
    const uT = cxL - AB - AB * phT / Math.PI, uBs = cxL - AB - AB * phB / Math.PI;
    const pointe = [];
    for (let i = 0; i <= 12; i++) { const t = -90 + 180 * i / 12; pointe.push([g.u1 + r * 0.75 * Math.cos(t * RAD), r * Math.sin(t * RAD)]); }
    out.push(h.chemin([[uT + 1, -r], [g.u1, -r], ...pointe, [g.u1, r], [uBs + 1, r]].map(T), A.cache));
    // le sens où il glisse
    const ya = T([0, -(Rg + RHO - S_) - 14])[1];
    const xa0 = T([cxL - AB * 1.5, 0])[0], xa1 = T([g.uD + AB + 34, 0])[0];
    out.push(h.fleche(`M ${f(xa0)} ${f(ya)} L ${f(xa1)} ${f(ya)}`, A.arete));
    return out.join('\n');
  };

  return {
    ref: '88-07',
    titre: 'La bannique au bâton',
    desc: 'Trois vues de côté. Une baguette verte de bouleau ou de peuplier, écorcée sur la partie qui portera la pâte, tenue d’une main par le bout encore dans son écorce ; on la tourne, et le boudin de pâte ferme s’y enroule en spirale serrée, chaque tour collé au précédent. Puis la baguette tenue au-dessus de la braise tirée devant le feu, pas dans la flamme, et tournée ; la chaleur monte de la braise. Enfin le pain cuit, qui glisse du bout de la baguette, creux à l’endroit où elle était. L’encadré danger nomme les bois à ne jamais prendre.',
    format: 'pleine',
    disposition: [['enroule'], ['feu', 'cuite']],
    hauteurs: [1, 1.15],
    largeurs: [[1], [1.6, 1]],
    vues: {
      enroule: {
        titre: 'Le boudin enroulé sur la baguette qu’on tourne',
        dessin: enroule,
        renvois: z => {
          const g = gEnr(z), T = g.T;
          const { Rg } = geoSp(rBois(g.uD));
          const cxL = g.uD - (g.n - 1) * P_;
          const p = (u, v) => T([u, v]);
          return [
            { n: 1, rond: [p(g.uB - 50, 0)[0], p(0, -RS)[1] - 40], cible: p(g.uB - 50, -RS * 0.3), texte: 'baguette verte, de bouleau ou de peuplier' },
            { n: 2, rond: [p(g.uB + 55, 0)[0], p(0, -RS)[1] - 40], cible: p(g.uB + 45, -rBois(g.uB) * 0.2), texte: 'écorcée là où va la pâte' },
            { n: 3, rond: [p(g.uD - 20, 0)[0], p(0, -Rg)[1] - 34], cible: p(g.uD - 2 * P_, -Rg + 6), texte: 'spirale serrée : chaque tour touche l’autre' },
            { n: 4, rond: [p(cxL + 128, 0)[0], p(0, 138)[1]], cible: p(cxL + 118, 107), texte: 'pâte ferme, roulée en boudin' },
          ];
        },
      },
      feu: {
        titre: 'Au-dessus de la braise, et tournée',
        dessin: auFeu,
        renvois: z => {
          const g = gBr(z), T = g.T;
          const { Rg } = geoSp(rBois(g.uD)), R_ = Rg - S_ + RHO;
          const uMil = g.uD - 2 * P_;
          const haut = [T([uMil, R_]), T([uMil, -R_])].sort((a, b) => a[1] - b[1])[0];
          const arc = [T([g.ur, rBois(g.ur) + 13]), T([g.ur, -rBois(g.ur) - 13])].sort((a, b) => a[1] - b[1])[0];
          const xf = g.xf;
          return [
            { n: 5, rond: [haut[0] - 6, haut[1] - 36], cible: [haut[0], haut[1] + 3], texte: 'tenue au-dessus de la braise' },
            { n: 6, rond: [xf - 26, g.yG - 168], cible: [xf - 2, g.yG - 118], texte: 'pas dans la flamme' },
            { n: 7, rond: [arc[0] + 4, arc[1] - 30], cible: [arc[0], arc[1] + 1], texte: 'la baguette, tournée' },
          ];
        },
      },
      cuite: {
        titre: 'Cuite, elle glisse du bâton',
        dessin: cuite,
        renvois: z => {
          const g = gCu(z), T = g.T;
          const { Rg } = geoSp(rBois(g.uD));
          const q = T([g.uD - 30, Rg]);
          return [
            { n: 8, rond: [q[0] + 26, q[1] + 44], cible: [q[0], q[1] + 4], texte: 'cuite : glisse du bâton, sonne creux' },
          ];
        },
      },
    },
    danger: 'Jamais de cèdre (thuya) : sa thuyone est convulsivante. Jamais de cerisier : son rameau cassé sent l’amande amère, un composé cyanogène. Jamais d’if.',
  };
};
