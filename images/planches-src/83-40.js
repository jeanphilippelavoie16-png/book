// Planche 83-40 — Allumer le poêle par le haut (chapitre 83, phase C, points 15, 16 et 18 ;
// l'allume-feu : section de l'allumage).
// Cotes : aucune sur le dessin. Les deux calibres d'allumage du chapitre (menu jusqu'à 2 cm, moyen
// de 2 à 5 cm) sont dans la légende, en mm ; « 10 à 20 minutes » aussi. Aucun autre chiffre.
// Couche par couche : la charge éclatée, chaque couche soulevée au-dessus de celle qui la porte.
// Le montage : vue cavalière du poêle, porte grande ouverte, le briquet long dans la main droite.
// 14 oct. : la main est une main simple (mains/moteur.js, prise-manche vue côté paume) au lieu du
// calque s11 ; la charte : le foyer vu par la porte en gris loin, le flanc droit à l'ombre, et au
// troisième temps la flèche rouge du tiroir qu'on remonte pour réduire l'air.
// Les trois temps : le même poêle en coupe sur la profondeur (porte à gauche, tuyau au fond),
// l'air qui entre sous la porte, les gaz qui montent et sortent par le tuyau.
module.exports = (h) => {
  const A = h.a;
  const W = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const f = v => Math.round(v * 10) / 10;
  const pt = p => `${f(p[0])} ${f(p[1])}`;
  const add = (p, q, k = 1) => [p[0] + q[0] * k, p[1] + q[1] * k];
  const poly = (pts, at) => h.chemin(pts, at, true);
  const rappel = A.fin + ' stroke-dasharray="2 3"';
  const fente = 'fill="none" stroke="#FFFFFF" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"';

  // enveloppe convexe (chaîne monotone) : la silhouette d'un rondin vu de biais
  const enveloppe = pts => {
    const p = pts.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const x = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
    const bas = [], haut = [];
    for (const q of p) { while (bas.length >= 2 && x(bas[bas.length - 2], bas[bas.length - 1], q) <= 0) bas.pop(); bas.push(q); }
    for (const q of p.slice().reverse()) { while (haut.length >= 2 && x(haut[haut.length - 2], haut[haut.length - 1], q) <= 0) haut.pop(); haut.push(q); }
    return bas.slice(0, -1).concat(haut.slice(0, -1));
  };

  // une flamme : langue blanche au trait, cœur au trait fin
  const flamme = (x, yb, ht, l, pen = 0) => {
    const d = `M${f(x - l / 2)} ${f(yb)} C${f(x - l / 2 - l * 0.25)} ${f(yb - ht * 0.45)} ${f(x + pen - l * 0.3)} ${f(yb - ht * 0.72)} ${f(x + pen)} ${f(yb - ht)} `
      + `C${f(x + pen + l * 0.12)} ${f(yb - ht * 0.66)} ${f(x + l / 2 + l * 0.3)} ${f(yb - ht * 0.42)} ${f(x + l / 2)} ${f(yb)} Z`;
    const hi = ht * 0.45, li = l * 0.42;
    const c = `M${f(x - li / 2)} ${f(yb - 1)} C${f(x - li / 2)} ${f(yb - hi * 0.5)} ${f(x + pen * 0.4 - li * 0.2)} ${f(yb - hi * 0.8)} ${f(x + pen * 0.45)} ${f(yb - hi)}`;
    return h.path(d, W(A.arete)) + '\n' + h.path(c, A.fin);
  };

  // ── La vue cavalière ────────────────────────────────────────────────────────────────
  // Repère en mm : x vers la droite (0 au milieu du foyer), y vers le haut (0 à la sole),
  // zz vers le fond (0 à la façade). Le fond fuit à 40°, réduit de moitié.
  const KC = 0.383, KS = 0.321;
  const projection = (ox, oy, s) => (x, y, zz) => [ox + s * (x + zz * KC), oy - s * (y + zz * KS)];
  // cadrer : l'échelle et l'origine qui font tenir ces points dans la boîte
  const cadrer = (pts, l, ht, smax) => {
    const u = projection(0, 0, 1), q = pts.map(p => u(...p));
    const x0 = Math.min(...q.map(p => p[0])), x1 = Math.max(...q.map(p => p[0]));
    const y0 = Math.min(...q.map(p => p[1])), y1 = Math.max(...q.map(p => p[1]));
    const s = Math.min(smax, l.l / (x1 - x0), ht.l / (y1 - y0));
    return { s, ox: l.x + (l.l - s * (x1 - x0)) / 2 - s * x0, oy: ht.x + (ht.l - s * (y1 - y0)) / 2 - s * y0 };
  };

  // un rondin : l'enveloppe des deux bouts, l'écorce, puis le bout qu'on voit et son bois de bout
  const rondin = (P, axe, c0, long, r, ecorce = true) => {
    const n = 40, b0 = [], b1 = [];
    for (let i = 0; i < n; i++) {
      const t = (i / n) * 2 * Math.PI, u = r * Math.cos(t), v = r * Math.sin(t);
      if (axe === 'z') { b0.push(P(c0[0] + u, c0[1] + v, c0[2])); b1.push(P(c0[0] + u, c0[1] + v, c0[2] + long)); }
      else { b0.push(P(c0[0], c0[1] + v, c0[2] + u)); b1.push(P(c0[0] + long, c0[1] + v, c0[2] + u)); }
    }
    const out = [poly(enveloppe(b0.concat(b1)), W(A.arete))];
    if (ecorce) {
      const traits = axe === 'z' ? [[1.25, 0.08, 0.7], [1.75, 0.25, 0.92], [2.3, 0.05, 0.55]] : [[-0.9, 0.1, 0.6], [-0.3, 0.35, 0.95]];
      for (const [t, k0, k1] of traits) {
        const u = r * Math.cos(t), v = r * Math.sin(t);
        out.push(axe === 'z'
          ? h.chemin([P(c0[0] + u, c0[1] + v, c0[2] + long * k0), P(c0[0] + u, c0[1] + v, c0[2] + long * k1)], A.fin)
          : h.chemin([P(c0[0] + long * k0, c0[1] + v, c0[2] + u), P(c0[0] + long * k1, c0[1] + v, c0[2] + u)], A.fin));
      }
    }
    const bout = axe === 'z' ? b0 : b1;             // le bout de devant, ou celui de droite
    out.push(poly(bout, W(A.arete)));
    const q = axe === 'z' ? P(c0[0], c0[1], c0[2]) : P(c0[0] + long, c0[1], c0[2]);
    const anneau = kr => bout.map(p => [q[0] + (p[0] - q[0]) * kr, q[1] + (p[1] - q[1]) * kr]);
    if (r > 12) out.push(poly(anneau(0.84), A.fin));
    if (r > 30) out.push(poly(anneau(0.5), A.fin), h.chemin([q, anneau(0.8)[6]], A.fin));
    out.push(h.cercle(q[0], q[1], r > 12 ? 0.9 : 0.6, A.plein));
    return out.join('\n');
  };

  // la charge, du bas vers le haut ; z0 : le devant des grosses bûches ; e : de combien chaque
  // couche est soulevée (0 dans le poêle, un écart dans la vue éclatée)
  const COUCHES = { buche: 62, moyen: 144, menu: 172, feu: 180 };
  const charge = (P, s, z0, e = 0) => {
    const o = [];
    for (const x of [-124, 0, 124]) o.push(rondin(P, 'z', [x, 62, z0], 380, 62));
    for (const zz of [320, 220, 120, 20]) o.push(rondin(P, 'x', [-170, 144 + e, z0 + zz], 340, 20));
    for (const x of [-105, -70, -35, 0, 35, 70, 105]) o.push(rondin(P, 'z', [x, 172 + 2 * e, z0 - 10], 330, 8, false));
    o.push(allumeFeu(P, s, z0, 3 * e));
    return o.join('\n');
  };
  // l'allume-feu : une alvéole de carton d'œufs pleine, deux copeaux d'écorce de bouleau roulés
  const allumeFeu = (P, s, z0, e) => {
    const o = [], k = s / 0.4;
    const c = P(0, 180 + e, z0 + 58), r1 = 22 * s, r0 = 14 * s, hh = 26 * s;
    const rebord = [];
    for (let i = 0; i <= 8; i++) rebord.push([c[0] - r1 + (2 * r1 * i) / 8, c[1] - hh + (i % 2 ? 1.4 * k : -1.4 * k)]);
    o.push(h.path(`M${pt([c[0] - r0, c[1]])} L${pt([c[0] - r1, c[1] - hh])} L${rebord.map(pt).join(' L')} L${pt([c[0] + r0, c[1]])} Z`, W(A.arete)));
    o.push(h.ellipse(c[0], c[1] - hh + 0.5, r1 * 0.86, 3.2 * k, W(A.detail)));
    for (const [dx, dy] of [[-4, 0], [2, -1], [5, 1], [-1, 1.4]]) o.push(h.cercle(c[0] + dx * k, c[1] - hh + 0.5 + dy * k * 0.7, 0.6, A.plein));
    o.push(h.ligne(c[0] - r1 * 0.55, c[1] - hh * 0.75, c[0] - r0 * 0.6, c[1] - 1.5, A.fin));
    o.push(h.ligne(c[0] + r1 * 0.55, c[1] - hh * 0.75, c[0] + r0 * 0.6, c[1] - 1.5, A.fin));
    // un copeau d'écorce roulé sur lui-même, couché en travers : le rouleau et sa spirale au bout
    const copeau = (x, y, zz) => {
      const r = 10, lg = 64, n = 28, b0 = [], b1 = [];
      for (let i = 0; i < n; i++) {
        const t = (i / n) * 2 * Math.PI;
        b0.push(P(x, y + r * Math.cos(t), zz + r * Math.sin(t)));
        b1.push(P(x + lg, y + r * Math.cos(t), zz + r * Math.sin(t)));
      }
      const spirale = [];
      for (let i = 0; i <= 40; i++) {
        const t = -0.6 + (i / 40) * 3.2 * Math.PI, rr = r * (1 - 0.72 * i / 40);
        spirale.push(P(x + lg, y + rr * Math.cos(t), zz + rr * Math.sin(t)));
      }
      return [poly(enveloppe(b0.concat(b1)), W(A.detail)), h.chemin([P(x + 8, y + r * 0.2, zz - r), P(x + lg - 6, y + r * 0.2, zz - r)], A.fin),
        poly(b1, W(A.detail)), h.chemin(spirale, A.fin)].join('\n');
    };
    o.push(copeau(-120, 190 + e, z0 + 170), copeau(34, 190 + e, z0 + 120));
    return o.join('\n');
  };

  // ── Couche par couche : la charge éclatée ─────────────────────────────────────────────
  const ECART = 118;
  const geoCouches = z => {
    const e = ECART;
    const pts = [[-186, 0, 0], [186, 0, 0], [186, 124, 380], [-186, 124, 380], [-170, 164 + e, 340], [-113, 180 + 2 * e, 320], [0, 210 + 3 * e, 58]];
    const { s, ox, oy } = cadrer(pts.concat([[-130, 200 + 3 * e, 170]]), { x: 4, l: z.l - 34 }, { x: 16, l: z.h - 20 }, 0.5);
    return { s, P: projection(ox, oy, s), e };
  };
  const couches = z => {
    const { s, P, e } = geoCouches(z);
    const o = [];
    // les traits de rappel : où chaque couche se pose sur la précédente
    for (const [x, y, zz, k] of [[-170, 124, 20, 1], [170, 124, 320, 1], [-105, 164, -10, 2], [105, 164, 320, 2], [0, 180, 58, 3]]) {
      o.push(h.chemin([P(x, y + (k - 1) * e, zz), P(x, y + k * e, zz)], rappel));
    }
    o.push(charge(P, s, 0, e));
    return o.join('\n');
  };

  // l'angle de la main simple qui met l'axe de sa prise sur `axe` (degrés à l'écran) et son avant-bras du
  // côté de `vers` (le même outil que 104-40 et 50-40)
  const poser = (o, axe, vers) => {
    const base = Object.assign({}, o, { angle: 0, avantbras: { longueur: 100 } }); delete base.objet;
    const e0 = h.formes.mainSimple(base); let best = null;
    for (const k of [0, 180]) {
      const a = axe - e0.prise.angle + k, m = h.formes.mainSimple(Object.assign({}, base, { angle: a }));
      const d = [m.coude[0] - m.poignet[0], m.coude[1] - m.poignet[1]], v = [vers[0] - m.poignet[0], vers[1] - m.poignet[1]];
      const c = (d[0] * v[0] + d[1] * v[1]) / ((Math.hypot(d[0], d[1]) * Math.hypot(v[0], v[1])) || 1);
      if (!best || c > best.c) best = { a, c };
    }
    return best.a;
  };

  // ── Le montage : le poêle porte ouverte, le briquet long ─────────────────────────────
  const PHI = 105 * Math.PI / 180, LP = 460, XH = -232;                // la porte, ouverte à 105°
  const TH = 24 * Math.PI / 180;
  const AX = [Math.sin(TH), -Math.cos(TH)], WX = [Math.cos(TH), Math.sin(TH)];
  // le briquet dans le repère de la main, en « unités de briquet » (0,4 unité de vue par mm à s = 0,4)
  const geoMontage = z => {
    // points à cadrer : le poêle, la porte, la main (le bout du bras)
    const u = projection(0, 0, 1), b = u(-12, 214, 118);
    const c1 = add(add(b, WX, -84 * 2.5), AX, -18.5 * 2.5), bras = add(c1, WX, -250);
    const inv = p => p;                                  // déjà en coordonnées de vue à s = 1
    const pts = [[-280, -100, 0], [280, -100, 0], [280, -100, 460], [280, 380, 460], [-280, 380, 0],
      [XH + LP * Math.cos(PHI), 40, -LP * Math.sin(PHI)], [XH + LP * Math.cos(PHI), 340, -LP * Math.sin(PHI)]];
    const q = pts.map(p => u(...p)).concat([inv(bras), inv(add(bras, AX, -40))]);
    const x0 = Math.min(...q.map(p => p[0])), x1 = Math.max(...q.map(p => p[0]));
    const y0 = Math.min(...q.map(p => p[1])), y1 = Math.max(...q.map(p => p[1]));
    const s = Math.min(0.44, (z.l - 44) / (x1 - x0), (z.h - 30) / (y1 - y0));
    const ox = 6 + (z.l - 44 - s * (x1 - x0)) / 2 - s * x0, oy = z.h - 4 - s * y1;
    const P = projection(ox, oy, s);
    const k = s / 0.4;
    const bout = P(-12, 214, 118);
    const c = add(add(bout, WX, -84 * k), AX, -18.5 * k);
    const L = (uu, v) => add(add(c, WX, uu * k), AX, v * k);
    return { s, ox, oy, P, k, c, L, bout };
  };

  const montage = z => {
    const g = geoMontage(z), { s, P } = g;
    const o = [];
    const patte = (x, zz) => [
      poly([P(x, -100, zz), P(x + 30, -100, zz), P(x + 30, -30, zz), P(x, -30, zz)], W(A.arete)),
      poly([P(x + 30, -100, zz), P(x + 30, -100, zz + 30), P(x + 30, -30, zz + 30), P(x + 30, -30, zz)], W(A.arete)),
    ].join('\n');
    o.push(patte(250, 430));
    // l'intérieur, vu par la porte : le gris loin du foyer (charte), puis sole, paroi de gauche, fond
    o.push(poly([P(-215, 50, 0), P(215, 50, 0), P(215, 330, 0), P(-215, 330, 0)], A.loin));
    o.push(h.chemin([P(-280, 0, 0), P(-280, 0, 460), P(280, 0, 460)], A.detail));
    o.push(h.chemin([P(-280, 0, 460), P(-280, 380, 460)], A.detail));
    o.push(charge(P, s, 60, 0));
    // la caisse : dessus, flanc droit, façade percée de la porte
    o.push(poly([P(-280, 380, 0), P(280, 380, 0), P(280, 380, 460), P(-280, 380, 460)], W(A.contour)));
    const flanc = [P(280, -30, 0), P(280, -30, 460), P(280, 380, 460), P(280, 380, 0)];
    o.push(poly(flanc, A.ombre), poly(flanc, A.contour));        // le flanc droit, à l'ombre (charte)
    const fac = [P(-280, -30, 0), P(280, -30, 0), P(280, 380, 0), P(-280, 380, 0)];
    const trou = [P(-215, 50, 0), P(215, 50, 0), P(215, 330, 0), P(-215, 330, 0)];
    o.push(`<path d="M${fac.map(pt).join(' L')} Z M${trou.map(pt).join(' L')} Z" fill="#FFFFFF" fill-rule="evenodd" ${A.contour.replace('fill="none"', '')}/>`);
    o.push(poly([P(-205, 58, 0), P(205, 58, 0), P(205, 322, 0), P(-205, 322, 0)], A.fin));
    o.push(patte(-270, 0), patte(240, 0));
    // la prise d'air sous la porte, tiroir baissé : grande ouverte
    o.push(poly([P(-60, 8, 0), P(60, 8, 0), P(60, 32, 0), P(-60, 32, 0)], A.plein));
    o.push(poly([P(-70, -26, -4), P(70, -26, -4), P(70, 6, -4), P(-70, 6, -4)], W(A.arete)));
    { const q = P(0, -10, -4); o.push(h.cercle(q[0], q[1], 2.2, W(A.arete))); }
    // la porte ouverte, ses charnières
    const D = (y, t) => P(XH + LP * t * Math.cos(PHI), y, -LP * t * Math.sin(PHI));
    o.push(poly([D(40, 0), D(340, 0), D(340, 1), D(40, 1)], W(A.contour)));
    o.push(poly([D(60, 0.06), D(320, 0.06), D(320, 0.94), D(60, 0.94)], A.fin));
    for (const y of [80, 300]) { const q = P(XH - 6, y, 0); o.push(h.rect(q[0] - 1.5, q[1] - 4, 3, 8, A.plein)); }
    // le tuyau sur le dessus, au fond, coupé au haut de la vue
    {
      const cx = 40, cz = 330, r = 70, tmax = Math.atan(KC);
      const gB = P(cx - r * Math.cos(tmax), 380, cz - r * Math.sin(tmax));
      const dB = P(cx + r * Math.cos(tmax), 380, cz + r * Math.sin(tmax));
      const yh = 6, gH = [gB[0], yh], dH = [dB[0], yh];
      const moitie = [];
      for (let i = 0; i <= 24; i++) { const t = tmax + Math.PI + (i / 24) * Math.PI; moitie.push(P(cx + r * Math.cos(t), 380, cz + r * Math.sin(t))); }
      o.push(h.path(`M${pt(gH)} L${moitie.map(pt).join(' L')} L${pt(dH)} Z`, W(A.contour)));
      o.push(h.path(`M${pt(gH)} L${pt([gH[0] + 6, yh - 3])} L${pt([gH[0] + 12, yh + 3])} L${pt([dH[0] - 12, yh - 3])} L${pt([dH[0] - 6, yh + 3])} L${pt(dH)}`, A.detail));
    }
    // la main droite et le briquet long
    const L = g.L;
    const briquet = [
      h.path(`M${pt(L(-5, -20))} Q${pt(L(0, -24))} ${pt(L(5, -20))} L${pt(L(5, 12))} L${pt(L(14, 16))} L${pt(L(14, 21))} L${pt(L(-2, 23.5))} Q${pt(L(-5, 22))} ${pt(L(-5, 18))} Z`, W(A.arete)),
      h.path(`M${pt(L(14, 16.6))} L${pt(L(78, 16.9))} L${pt(L(78, 20.1))} L${pt(L(14, 20.4))} Z`, W(A.detail)),
      h.path(`M${pt(L(78, 17.3))} L${pt(L(84, 17.6))} L${pt(L(84, 19.4))} L${pt(L(78, 19.7))} Z`, A.plein),
    ].join('\n');
    // la main droite (main simple, prise-manche) fermée sur la poignée du briquet, vue côté paume et
    // tournée de 35° pour que les doigts s'enroulent à l'œil : la poignée entre par le bas du poing et
    // ressort en haut, où part le tube ; le bras part en haut à gauche et sort de la vue. La main garde
    // sa taille (s : la vue en mm), la prise se ferme sur la poignée de 25 mm (10 unités de briquet).
    const BORD = { x0: 0, y0: 0, x1: z.l, y1: z.h };
    const vM = add(g.c, WX, -600), ax = Math.atan2(AX[1], AX[0]) * 180 / Math.PI;
    const oM = { x: g.c[0], y: g.c[1], pose: 'prise-manche', vue: 'paume', cote: 'droite', echelle: s, diametre: 25, rotation: [0, 35, 0] };
    const aM = poser(oM, ax, vM);
    o.push(h.formes.mainSimple({ ...oM, angle: aM, objet: briquet, avantbras: { vers: vM, bord: BORD, bras: { pli: 0 } } }).svg);
    o.push(flamme(g.bout[0] + 1, g.bout[1] + 1, 16 * g.k, 7 * g.k, 1));
    return o.join('\n');
  };

  // ── Les trois temps : le même poêle en coupe sur la profondeur ─────────────────────────
  // zz : de la façade (0, à gauche) vers le fond (480) ; y vers le haut (0 à la sole).
  const geoCoupe = z => {
    const s = Math.min(0.31, (z.l - 22) / 530, (z.h - 10) / (100 + 30 + 388 + 150));
    const x0 = Math.round(8 + 40 * s), y0 = Math.round(z.h - 4 - 130 * s);
    const T = (zz, y) => [x0 + zz * s, y0 - y * s];
    return { s, x0, y0, T };
  };

  const coupe = temps => z => {
    const g = geoCoupe(z), { s, T } = g;
    const o = [];
    const R = (z1, y1, z2, y2, at) => { const a = T(z1, y2), b = T(z2, y1); return h.rect(a[0], a[1], b[0] - a[0], b[1] - a[1], at); };
    const P = (pts, at, ferme = true) => h.chemin(pts.map(p => T(p[0], p[1])), at, ferme);

    // pattes, vues de côté, et le plancher de la pièce
    o.push(R(10, -130, 40, -30, W(A.arete)), R(440, -130, 470, -30, W(A.arete)));
    o.push(h.ligne(2, T(0, -130)[1], z.l - 2, T(0, -130)[1], A.detail));

    // la charge : la bûche de devant (les deux autres sont derrière elle), le moyen vu par le bout
    const BUCHE = [[40, 2], [440, 2], [444, 60], [440, 122], [40, 122], [37, 60]];
    const buche = () => [P(BUCHE, W(A.arete)), ...[[30, 60, 300], [58, 150, 420], [92, 80, 260], [104, 300, 430]].map(([y, a, b]) => P([[a, y], [b, y + 2]], A.fin, false))].join('\n');
    const bucheCarbonisee = () => {
      const out = [P(BUCHE, A.plein)];
      // le charbon se fend en écailles : deux fentes en long, ondulées, et des fentes en travers,
      // courtes, décalées, qui partent d'un bord ou de l'autre
      let graine = 7;
      const hasard = () => { graine = (graine * 16807) % 2147483647; return graine / 2147483647; };
      for (const [y, ph] of [[46, 0], [86, 1.7]]) {
        const pts = [];
        for (let zz = 44; zz <= 438; zz += 12) pts.push(T(zz, y + 3.5 * Math.sin(zz / 21 + ph)));
        out.push(h.chemin(pts, fente));
      }
      for (const [ya, yb] of [[6, 46], [46, 86], [86, 118]]) {
        let zz = 50 + hasard() * 20;
        while (zz < 428) {
          const lg = (0.45 + 0.4 * hasard()) * (yb - ya), pen = (hasard() - 0.5) * 12;
          const [y1, y2] = hasard() < 0.5 ? [ya + 1, ya + 1 + lg] : [yb - 1, yb - 1 - lg];
          out.push(h.chemin([T(zz, y1), T(zz + pen, y2)], fente));
          zz += 16 + hasard() * 22;
        }
      }
      return out.join('\n');
    };
    const moyen = zz => [h.cercle(...T(zz, 144), 20 * s, W(A.arete)), h.cercle(...T(zz, 144), 11 * s, A.fin), h.cercle(...T(zz, 144), 0.8, A.plein)].join('\n');
    const braise = (zz, y, l, noir) => {
      const q = T(zz, y), k = l * s;
      return h.chemin([[q[0] - k, q[1]], [q[0] - k * 0.7, q[1] - k * 0.8], [q[0] + k * 0.3, q[1] - k], [q[0] + k, q[1] - k * 0.4], [q[0] + k * 0.8, q[1]]], noir ? A.plein : W(A.detail), true);
    };

    if (temps === 1) {
      o.push(buche());
      for (const zz of [80, 180, 280, 380]) o.push(moyen(zz));
      o.push(P([[50, 164], [390, 164], [392, 172], [390, 180], [50, 180], [48, 172]], W(A.arete)));
      o.push(P([[70, 172], [300, 172]], A.fin, false));
      // les flammes sortent de l'alvéole et du menu
      o.push(P([[143, 180], [177, 180], [184, 210], [136, 210]], W(A.arete)));
      o.push(flamme(...T(92, 182), 110 * s, 30 * s, -2), flamme(...T(222, 182), 90 * s, 30 * s, 4), flamme(...T(160, 208), 150 * s, 42 * s, 3));
    }
    if (temps === 2) {
      o.push(buche());
      for (const zz of [80, 180, 280, 380]) o.push(moyen(zz));
      for (const [zz, y, l, n] of [[62, 166, 11, 1], [104, 166, 9, 0], [140, 166, 12, 1], [214, 166, 10, 0], [246, 166, 12, 1], [322, 166, 9, 0], [352, 166, 11, 1]]) o.push(braise(zz, y, l, n));
      o.push(flamme(...T(80, 162), 150 * s, 40 * s, -3), flamme(...T(170, 164), 190 * s, 52 * s, 4), flamme(...T(262, 162), 170 * s, 46 * s, 5), flamme(...T(350, 160), 120 * s, 36 * s, 2));
      // les gaz des grosses bûches montent entre les rondins et entrent dans les flammes
      for (const zz of [130, 230, 330]) {
        const a = T(zz, 126), b = T(zz + 4, 170), c = T(zz - 4, 214), d = T(zz + 2, 256);
        o.push(h.fleche(`M${pt(a)} C${pt([a[0] + 7, a[1] - 10])} ${pt([b[0] + 7, b[1] + 4])} ${pt(b)} S${pt([c[0] - 7, c[1] + 6])} ${pt(c)} S${pt([d[0] + 5, d[1] + 6])} ${pt(d)}`, A.cache));
      }
    }
    if (temps === 3) {
      o.push(bucheCarbonisee());
      for (const [zz, y, l, n] of [[80, 128, 12, 1], [118, 126, 10, 0], [160, 128, 13, 1], [215, 126, 11, 0], [262, 128, 12, 1], [318, 126, 10, 1], [372, 128, 12, 0], [410, 126, 9, 1], [20, 4, 10, 1], [30, 6, 7, 0]]) o.push(braise(zz, y, l, n));
      o.push(flamme(...T(70, 126), 170 * s, 44 * s, -3), flamme(...T(150, 128), 220 * s, 56 * s, 5), flamme(...T(240, 126), 200 * s, 52 * s, 6), flamme(...T(325, 128), 185 * s, 50 * s, 4), flamme(...T(405, 126), 140 * s, 40 * s, 2));
    }

    // la caisse en coupe : tôles pleines
    const ep = 8;
    o.push(R(-ep, -30, 480 + ep, -30 + ep, A.plein));             // fond de caisse
    o.push(R(-ep, -ep, 480 + ep, 0, A.plein));                    // sole
    o.push(R(480, -30, 480 + ep, 388, A.plein));                  // paroi du fond
    o.push(R(-ep, 380, 300, 388, A.plein), R(440, 380, 480 + ep, 388, A.plein));  // dessus, percé du collet
    o.push(R(-ep, -30, 0, 4, A.plein), R(-ep, 44, 0, 52, A.plein), R(-ep, 330, 0, 388, A.plein));  // façade : prise d'air, porte
    // la porte fermée, sa poignée
    o.push(R(-2 * ep - 2, 48, -ep - 2, 336, A.plein));
    { const q = T(-2 * ep - 2, 190); o.push(h.rect(q[0] - 7, q[1] - 2, 7, 4, W(A.detail))); }
    // le tiroir de la prise d'air, une plaque qui glisse devant la fente : baissé, la fente libre ;
    // remonté aux deux tiers au troisième temps
    const tiroir = temps === 3 ? 28 : 0;
    o.push(R(-32, -48 + tiroir, -12, 0 + tiroir, W(A.arete)));
    { const q = T(-32, -24 + tiroir); o.push(h.cercle(q[0] - 2.6, q[1], 2.6, W(A.arete))); }
    // le geste du troisième temps : remonter le tiroir, réduire l'air (charte : le rouge)
    if (temps === 3) { const a = T(-50, -56), b = T(-50, 4); o.push(h.geste(`M${pt(a)} L${pt(b)}`)); }
    // le tuyau
    const yHaut = 4;
    o.push(h.ligne(T(300, 388)[0], T(0, 388)[1], T(300, 388)[0], yHaut, A.contour), h.ligne(T(440, 388)[0], T(0, 388)[1], T(440, 388)[0], yHaut, A.contour));

    // l'air qui entre sous la porte
    if (temps < 3) o.push(h.fleche(`M${pt(T(-120, 24))} L${pt(T(4, 24))} Q${pt(T(22, 25))} ${pt(T(22, 60))} L${pt(T(22, temps === 1 ? 190 : 150))}`, A.arete));
    else o.push(h.fleche(`M${pt(T(-100, 37))} L${pt(T(4, 37))} Q${pt(T(18, 38))} ${pt(T(18, 60))} L${pt(T(18, 84))}`, A.detail));
    // les gaz chauds qui montent et sortent par le tuyau
    const sommet = { 1: [160, 330], 2: [180, 350], 3: [200, 360] }[temps];
    o.push(h.fleche(`M${pt(T(sommet[0], sommet[1]))} Q${pt(T(360, 372))} ${pt(T(370, 430))} L${pt([T(370, 0)[0], yHaut + 14])}`, A.cache));
    return o.join('\n');
  };

  return {
    ref: '83-40',
    titre: 'Allumer le poêle par le haut',
    desc: 'La charge éclatée couche par couche : trois grosses bûches serrées au fond, le moyen couché en travers, le menu en long, '
      + 'l’allume-feu au sommet. Le poêle porte ouverte, la charge en place, le briquet long qui met le feu au sommet et la prise '
      + 'd’air grande ouverte. Puis trois coupes du même poêle : le feu qui prend au sommet pendant que le foyer et le tuyau '
      + 'chauffent, le feu qui descend et les gaz des grosses bûches qui traversent les flammes, la charge carbonisée qui flambe '
      + 'toute, l’air réduit seulement à ce moment.',
    format: 'pleine',
    disposition: [['couches', 'montage'], ['t1', 't2', 't3']],
    largeurs: [[5, 7], [1, 1, 1]],
    hauteurs: [11, 9],
    vues: {
      couches: {
        titre: 'Couche par couche',
        dessin: couches,
        renvois: z => {
          const { P, e } = geoCouches(z), xd = z.l - 12;
          return [
            { n: 1, rond: [xd, P(0, 20, 0)[1]], cible: P(150, 40, 0), texte: 'deux ou trois grosses bûches au fond, serrées' },
            { n: 2, rond: [xd, P(0, 144 + e, 20)[1] + 4], cible: P(174, 144 + e, 20), texte: 'le moyen, 20 à 50 mm, en travers' },
            { n: 3, rond: [xd, P(0, 172 + 2 * e, -10)[1] - 4], cible: P(109, 172 + 2 * e, -10), texte: 'le menu, jusqu’à 20 mm, en long' },
            { n: 4, rond: [P(-150, 0, 0)[0], P(0, 196 + 3 * e, 58)[1] + 6], cible: P(-6, 196 + 3 * e, 58), texte: 'l’allume-feu : alvéole de carton d’œufs au gras' },
            { n: 5, rond: [xd, P(0, 200 + 3 * e, 120)[1]], cible: P(98, 196 + 3 * e, 120), texte: 'ou des copeaux d’écorce de bouleau' },
          ];
        },
      },
      montage: {
        titre: 'Le montage, porte ouverte',
        dessin: montage,
        renvois: z => {
          const g = geoMontage(z), P = g.P;
          return [
            { n: 6, rond: [g.L(46, 40)[0], g.L(46, 40)[1] - 14], cible: g.L(46, 18.5), texte: 'le briquet long met le feu au sommet' },
            { n: 7, rond: [P(280, 0, 0)[0] + 24, P(0, -12, 0)[1]], cible: P(40, -18, -4), texte: 'la prise d’air grande ouverte' },
          ];
        },
      },
      t1: {
        titre: '1. Le feu prend au sommet',
        dessin: coupe(1),
        renvois: z => {
          const { T } = geoCoupe(z);
          return [
            { n: 8, rond: [T(180, 470)[0], T(0, 470)[1]], cible: T(300, 450), texte: 'le foyer et le tuyau chauffent d’abord' },
          ];
        },
      },
      t2: {
        titre: '2. Le feu descend',
        dessin: coupe(2),
        renvois: z => {
          const { T } = geoCoupe(z);
          return [
            { n: 9, rond: [T(250, -80)[0], T(0, -80)[1]], cible: T(230, 60), texte: 'les grosses bûches dégagent leurs gaz' },
            { n: 10, rond: [T(180, 470)[0], T(0, 470)[1]], cible: T(178, 300), texte: 'leurs gaz traversent les flammes et brûlent' },
          ];
        },
      },
      t3: {
        titre: '3. Toute la charge flambe',
        dessin: coupe(3),
        renvois: z => {
          const { T } = geoCoupe(z);
          return [
            { n: 11, rond: [T(250, -80)[0], T(0, -80)[1]], cible: T(262, 48), texte: 'la charge carbonisée, en 10 à 20 min' },
            { n: 12, rond: [T(110, -80)[0], T(0, -80)[1]], cible: T(-22, 14), texte: 'alors seulement, réduire l’air, sans l’étouffer' },
          ];
        },
      },
    },
    danger: 'Danger — jamais d’essence ni de naphte pour partir le feu : ils ne brûlent pas en liquide, ils s’évaporent, et c’est le nuage de vapeur au-dessus et autour du foyer qui s’allume, hors du poêle, dans la pièce.',
  };
};
