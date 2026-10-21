// Planche 24-09 — Le bracelet de contre-appui et le manche grossi (ch. 24, section 9 :
// « Le bracelet de contre-appui », « Grossir le manche » ; étape 29).
//
// Le chapitre ne donne aucune mesure (ni largeur de bande, ni épaisseur de cuir ou de corde, ni
// longueur de prise) : aucune cote. Les proportions sont celles d'un bras d'adulte (bibliothèque
// des mains simples) et d'une hache ordinaire ; la corde, le cuir et le bois gardent entre la vue en
// écorché et la coupe les mêmes épaisseurs et la même échelle.
module.exports = (h) => {
  const N = '#1A1A1A', B = '#FFFFFF';
  const f = v => Math.round(v * 10) / 10;
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const mul = (a, k) => [a[0] * k, a[1] * k];
  const norm = a => { const l = Math.hypot(a[0], a[1]); return [a[0] / l, a[1] / l]; };
  const RAD = Math.PI / 180;

  // Catmull-Rom → Bézier : une courbe lisse qui passe par les points (en coordonnées de vue)
  const lisse = (pts, ferme = false, depart = true) => {
    const P = ferme ? [pts[pts.length - 1], ...pts, pts[0], pts[1]] : [pts[0], ...pts, pts[pts.length - 1]];
    let d = depart ? `M${f(pts[0][0])} ${f(pts[0][1])}` : '';
    for (let i = 1; i < P.length - 2; i++) {
      const p0 = P[i - 1], p1 = P[i], p2 = P[i + 1], p3 = P[i + 2];
      const c1 = add(p1, mul(sub(p2, p0), 1 / 6)), c2 = sub(p2, mul(sub(p3, p1), 1 / 6));
      d += ` C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
    }
    return d + (ferme ? ' Z' : '');
  };
  // interpolation linéaire d'un profil [[x, v], …] trié ou non
  const interp = (prof, x) => {
    const p = prof.slice().sort((a, b) => a[0] - b[0]);
    if (x <= p[0][0]) return p[0][1];
    for (let i = 1; i < p.length; i++) if (x <= p[i][0]) {
      const t = (x - p[i - 1][0]) / (p[i][0] - p[i - 1][0]);
      return p[i - 1][1] + (p[i][1] - p[i - 1][1]) * t;
    }
    return p[p.length - 1][1];
  };
  const P2 = p => `${f(p[0])} ${f(p[1])}`;
  const BLANC = `fill="${B}" stroke="none"`;
  const CUIR = `fill="url(#p2409-cuir)" stroke="none"`;
  const DEFS = `<defs>
<pattern id="p2409-cuir" width="5" height="5" patternUnits="userSpaceOnUse"><circle cx="1.1" cy="1.3" r="0.55" fill="${N}"/><circle cx="3.6" cy="3.2" r="0.5" fill="${N}"/><circle cx="2.2" cy="4.4" r="0.35" fill="${N}"/></pattern>
</defs>`;

  // ═══ A. Le bracelet sur l'avant-bras ═══════════════════════════════════════════════════
  // Le bras entier vient de la bibliothèque des mains simples, d'un seul contour : la main droite
  // serrée sur le manche, vue de la paume (prise-manche, Ø 36), le pouce en haut ; l'avant-bras part
  // à droite, presque à plat (le poignet un peu dévié), le bras remonte du coude et sort par le haut.
  // Repère du bras (mm) : p le long de l'avant-bras, du coude (p = 0) vers le poignet (p = LAB) ;
  // q en travers, négatif du côté du pouce (le dessus), positif de l'autre.
  const D_MANCHE = 36, MANCHE = 108;
  const MAIN = { pose: 'prise-manche', vue: 'paume', cote: 'droite', diametre: D_MANCHE, poignet: { deviation: -15 } };
  const PLI = -72;                                          // le bras, du coude vers l'épaule, à l'écran

  // la géométrie, à l'échelle 1, l'axe du manche en (0, 0)
  const geo = (() => {
    const F = h.formes.mainSimple;
    const angle = 90 - F({ ...MAIN, x: 0, y: 0, echelle: 1, angle: 0, avantbras: false }).prise.angle;   // le manche debout
    const m = F({ ...MAIN, x: 0, y: 0, echelle: 1, angle, avantbras: { longueur: 'entier' } });
    const C = m.coude, LAB = Math.hypot(m.poignet[0] - C[0], m.poignet[1] - C[1]);
    const u = norm(sub(m.poignet, C));                      // du coude vers le poignet
    let n = [-u[1], u[0]];
    if ((m.pouce[0] - C[0]) * n[0] + (m.pouce[1] - C[1]) * n[1] > 0) n = mul(n, -1);   // q < 0 : le pouce
    const pq = c => { const d = sub(c, C); return [d[0] * u[0] + d[1] * u[1], d[0] * n[0] + d[1] * n[1]]; };
    // la silhouette de l'avant-bras, relevée sur le contour même de la main (le premier tracé de sa
    // couche, une ligne brisée) : ses deux bords coupés en travers, tous les 5 mm de p
    const dUA = [Math.cos((Math.atan2(-u[1], -u[0]) / RAD + PLI) * RAD), Math.sin((Math.atan2(-u[1], -u[0]) / RAD + PLI) * RAD)];
    const mb = F({ ...MAIN, x: 0, y: 0, echelle: 1, angle, avantbras: { longueur: 'entier', bras: { pli: PLI, longueur: 200 } } });
    const sil = [...mb.couches.main.match(/<path d="([^"]+)"/)[1].matchAll(/(-?\d+\.?\d*)[ ,](-?\d+\.?\d*)/g)].map(a => pq([+a[1], +a[2]]));
    const dessus = [], bas = [];
    for (let p = 30; p <= 200; p += 5) {
      const qs = [];
      for (let i = 0; i < sil.length; i++) {
        const A = sil[i], B = sil[(i + 1) % sil.length];
        if ((A[0] - p) * (B[0] - p) <= 0 && A[0] !== B[0]) {
          const q = A[1] + (B[1] - A[1]) * (p - A[0]) / (B[0] - A[0]);
          if (Math.abs(q) < 75) qs.push(q);
        }
      }
      if (qs.length >= 2) { dessus.push([p, Math.min(...qs)]); bas.push([p, Math.max(...qs)]); }
    }
    // le cadrage prend tout le contour, le bras compris sur 200 mm ; le bras est coupé net à la hauteur
    // de son coin le plus haut (le bord de sa coupe le plus haut), son bord extérieur prolongé jusque-là
    const brasHaut = [...mb.couches.main.match(/<path d="([^"]+)"/)[1].matchAll(/(-?\d+\.?\d*)[ ,](-?\d+\.?\d*)/g)].map(a => [+a[1], +a[2]]);
    const [cA, cB] = mb.coupe.slice().sort((A, B) => A[1] - B[1]);
    brasHaut.push(add(cB, mul(dUA, (cA[1] - cB[1]) / dUA[1])));
    return { angle, C, LAB, u, n, dessus, bas, boite: m.boite, dUA, brasHaut };
  })();
  const S = ([p, q]) => add(add(geo.C, mul(geo.u, p)), mul(geo.n, q));

  const bras = (z) => {
    // cadrage : la main, le manche, l'avant-bras, le coude et le départ du bras (le reste sort par le haut)
    const boite = [[0, -MANCHE], [0, MANCHE], [geo.boite.x0, 0], add(geo.C, [0, 52]), add(geo.C, [48, 0]),
      ...geo.dessus.map(S), ...geo.bas.map(S), ...geo.brasHaut];
    const xs = boite.map(p => p[0]), ys = boite.map(p => p[1]);
    const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
    const s = Math.min((z.l - 16) / (x1 - x0), (z.h - 10) / (y1 - y0));
    const O = [(z.l - (x1 - x0) * s) / 2 - x0 * s, (z.h - (y1 - y0) * s) / 2 - y0 * s];
    const Vs = p => [O[0] + p[0] * s, O[1] + p[1] * s];      // scène → vue
    const V = pq => Vs(S(pq));                                // bras → vue

    const out = [DEFS];
    // le manche, debout dans le poing : bois blanc, sa face de droite à l'ombre, quelques traits de fil
    const t = Vs([0, 0]);
    const manche = g => {
      const r = g.r, my = g.y - MANCHE * s, mh = 2 * MANCHE * s;
      const filM = [[-9, 0.05, 0.42], [-2, 0.58, 0.95], [6, 0.08, 0.35], [2, 0.2, 0.3]]
        .map(([dx, a, b]) => h.ligne(g.x + dx * s, my + a * mh, g.x + dx * s, my + b * mh, h.a.fin)).join('\n');
      return h.rect(g.x - r, my, 2 * r, mh, `fill="${B}" stroke="none"`) + '\n'
        + h.rect(g.x + 0.45 * r, my, 0.55 * r, mh, h.a.ombre) + '\n' + filM + '\n'
        + h.rect(g.x - r, my, 2 * r, mh, `fill="none" ${h.a.arete.replace(/fill="[^"]*"/, '')}`);
    };
    out.push(h.formes.mainSimple({ ...MAIN, angle: geo.angle, echelle: s, x: t[0], y: t[1], objet: manche,
      avantbras: { longueur: 'entier', bras: { pli: PLI, longueur: 'bord' }, bord: { x0: 0, y0: O[1] + y0 * s, x1: z.l, y1: z.h } } }));

    // la bande : sur le gras de l'avant-bras, juste sous le coude ; elle dépasse un peu la silhouette
    // (son épaisseur) et ses bouts s'arrondissent : elle fait le tour
    const b0 = 58, b1 = 103, e = 2.5, bm = (b0 + b1) / 2;
    const qH = p => interp(geo.dessus, p) - e, qB = p => interp(geo.bas, p) + e;
    const bord = (p) => `Q${P2(V([p + 5, (qH(p) + qB(p)) / 2]))} `;
    const bande = `M${P2(V([b0, qH(b0)]))} L${P2(V([bm, qH(bm) - 0.4]))} L${P2(V([b1, qH(b1)]))} `
      + `${bord(b1)}${P2(V([b1, qB(b1)]))} L${P2(V([bm, qB(bm) + 0.3]))} L${P2(V([b0, qB(b0)]))} ${bord(b0)}${P2(V([b0, qH(b0)]))} Z`;
    out.push(h.path(bande, BLANC), h.path(bande, CUIR), h.path(bande, h.a.contour));
    // le bout libre : il sort de la boucle et se couche sur la bande, avec ses trous
    const i0 = b0 + 1.6, i1 = b1 - 1.6;
    const bout = `M${P2(V([i0, 12]))} L${P2(V([i0, -24]))} C${P2(V([i0, -33]))} ${P2(V([bm - 8, -38]))} ${P2(V([bm, -38]))} `
      + `C${P2(V([bm + 8, -38]))} ${P2(V([i1, -33]))} ${P2(V([i1, -24]))} L${P2(V([i1, 12]))} Z`;
    out.push(h.path(bout, BLANC), h.path(bout, CUIR), h.path(bout, h.a.arete));
    for (const q of [-18, -28]) out.push(h.ellipse(...V([bm, q]), 1.9 * s, 1.9 * s, `fill="${N}" stroke="none"`));
    // la boucle : le cadre par-dessus, l'ardillon de son trou jusqu'à la barre du haut
    const cad = (m) => {
      const a = V([b0 - 3 + m, -8 + m]), b = V([b1 + 3 - m, -8 + m]), c = V([b1 + 3 - m, 17 - m]), d = V([b0 - 3 + m, 17 - m]);
      return `M${P2(a)} L${P2(b)} L${P2(c)} L${P2(d)} Z`;
    };
    out.push(h.path(`${cad(0)} ${cad(3)}`, `fill="${B}" fill-rule="evenodd" stroke="none"`));
    out.push(h.path(cad(0), h.a.arete), h.path(cad(3), h.a.detail));
    out.push(h.ellipse(...V([bm, 9]), 2.2 * s, 1.6 * s, `fill="${N}" stroke="none"`));
    out.push(h.path(`M${P2(V([bm, 9]))} L${P2(V([bm, -6.5]))}`, h.a.contour));

    return { svg: out.join('\n'), V };
  };

  // ═══ C. La hache : où grossir ════════════════════════════════════════════════════════════
  // Repère (mm) : y vers le bas, 0 au bout du manche ; yy = distance depuis le bout.
  const LM = 720;
  const hache = (z) => {
    const axe = yy => -9 * Math.pow(Math.max(0, 1 - yy / LM), 3);
    const hw = yy => interp([[0, 21], [7, 22.5], [22, 19.5], [40, 17.5], [80, 17], [400, 16], [640, 15], [745, 16]], yy);
    const x0 = -158, x1 = 104, y0 = -772, y1 = 8;
    const s = Math.min((z.l - 6) / (x1 - x0), (z.h - 6) / (y1 - y0));
    const O = [(z.l - (x1 - x0) * s) / 2 - x0 * s, (z.h - (y1 - y0) * s) / 2 - y0 * s];
    const V = p => [O[0] + p[0] * s, O[1] + p[1] * s];
    const out = [];
    // le manche
    const g = [], d = [];
    for (let yy = 0; yy <= 740; yy += 20) { g.push(V([axe(yy) - hw(yy), -yy])); d.push(V([axe(yy) + hw(yy), -yy])); }
    const manche = lisse(d) + ` L${P2(g[g.length - 1])}` + lisse(g.slice().reverse(), false, false)
      + ` Q${P2(V([axe(0), 3]))} ${P2(d[0])} Z`;
    out.push(h.path(manche, BLANC));
    for (const [k, a, b] of [[-8, 170, 330], [-3, 400, 640], [5, 200, 420], [9, 480, 690], [1, 660, 735]]) {
      const pts = []; for (let yy = a; yy <= b; yy += 20) pts.push(V([axe(yy) + k, -yy]));
      out.push(h.path(lisse(pts), h.a.fin));
    }
    out.push(h.path(manche, h.a.arete));
    // la prise grossie, au bout où la main serre
    const pg = [], pd = [];
    for (let yy = 35; yy <= 147; yy += 16) { pg.push(V([axe(yy) - 24, -yy])); pd.push(V([axe(yy) + 24, -yy])); }
    const prise = `M${P2(pd[0])} L${P2(pd[pd.length - 1])} L${P2(pg[pg.length - 1])} L${P2(pg[0])} Z`;
    out.push(h.path(prise, BLANC), h.path(prise, CUIR), h.path(prise, h.a.arete));
    // le fer
    const Hc = [axe(718), -718];
    const Hv = p => V(add(Hc, p));
    const dessous = [[45, 28], [18, 30], [-30, 33], [-80, 45], [-128, 63]];
    const tranchant = [[-128, 63], [-146, 40], [-152, 8], [-146, -25], [-130, -50]];
    const dessusFer = [[-130, -50], [-80, -36], [-30, -31], [18, -30], [45, -30]];
    const fer = `M${P2(Hv([45, -30]))} L${P2(Hv([45, 28]))}` + lisse(dessous.map(Hv), false, false)
      + lisse(tranchant.map(Hv), false, false) + lisse(dessusFer.map(Hv), false, false) + ' Z';
    out.push(h.path(fer, BLANC), h.path(fer, h.a.contour));
    out.push(h.path(lisse([[-117, 57], [-134, 36], [-140, 8], [-134, -21], [-119, -44]].map(Hv)), h.a.detail));
    out.push(h.path(`M${P2(Hv([18, -30]))} L${P2(Hv([18, 30]))}`, h.a.fin));
    // la main du haut glisse vers la prise
    out.push(h.geste(`M${P2(V([44, -520]))} L${P2(V([44, -180]))}`));
    return { svg: out.join('\n'), V };
  };

  // ═══ D et E. La prise grossie, en écorché, et sa coupe — même échelle ═══════════════════
  // Repère (mm) : x depuis le bout du manche, y = 0 sur l'axe. Bois 34 de large (demi 17),
  // corde de 4, cuir de 3 : prise de 48.
  const SD = 2.15;
  const HB = 17, RC = 2, EC = 3;              // demi-largeur du bois, rayon de la corde, cuir
  const X_ENR = 35, X_FIN = 147, X_COUPE = 62;
  const coupeAA = [[97, 24], [101, 13], [94, 3], [100, -8], [95, -17], [99, -24]];

  const prise = (z) => {
    const s = SD, ox = (z.l - 184 * s) / 2 + 3 * s, oy = z.h / 2;
    const V = p => [ox + p[0] * s, oy + p[1] * s];
    const out = [];
    // le manche nu, avec son renflement au bout
    const hwD = x => interp([[0, 21], [6, 22.5], [22, 19.5], [38, 17.3], [55, HB], [180, HB]], x);
    const haut = [], bas = [];
    for (let x = 0; x <= 178; x += 6) { haut.push(V([x, -hwD(x)])); bas.push(V([x, hwD(x)])); }
    const rupt = [V([178, -HB]), V([183, -7]), V([173, 7]), V([178, HB])];
    const bois = lisse(haut) + lisse(rupt, false, false) + lisse(bas.slice().reverse(), false, false)
      + ` Q${P2(V([-3, 0]))} ${P2(haut[0])} Z`;
    out.push(h.path(bois, BLANC));
    for (const [y, a, b] of [[-9, 4, 30], [-2, 8, 33], [7, 3, 26], [-10, 150, 176], [3, 152, 172], [11, 158, 177]])
      out.push(h.ligne(...V([a, y]), ...V([b, y]), h.a.fin));
    out.push(h.path(lisse(haut), h.a.contour), h.path(lisse(bas), h.a.contour));
    out.push(h.path(`M${P2(bas[0])} Q${P2(V([-3, 0]))} ${P2(haut[0])}`, h.a.contour));
    out.push(h.path(lisse(rupt), h.a.detail));

    // la corde, tour contre tour : festons sur la silhouette, un trait par tour, la torsion
    const nT = Math.round((X_FIN - X_ENR) / (2 * RC));
    const xb = i => X_ENR + i * 2 * RC;
    const r = RC * s;
    let dCorde = `M${P2(V([xb(0) + 1, -HB]))} L${P2(V([xb(0) + 1, -(HB + RC)]))}`;
    for (let i = 0; i < nT; i++) dCorde += ` A${f(r)} ${f(r)} 0 0 1 ${P2(V([xb(i + 1) + 1, -(HB + RC)]))}`;
    dCorde += ` L${P2(V([xb(nT) + 1, -HB]))} L${P2(V([xb(nT) - 1, HB]))} L${P2(V([xb(nT) - 1, HB + RC]))}`;
    for (let i = nT; i > 0; i--) dCorde += ` A${f(r)} ${f(r)} 0 0 1 ${P2(V([xb(i - 1) - 1, HB + RC]))}`;
    dCorde += ` L${P2(V([xb(0) - 1, HB]))} Z`;
    out.push(h.path(dCorde, BLANC), h.path(dCorde, h.a.arete));
    for (let i = 1; i < nT; i++) out.push(h.ligne(...V([xb(i) - 1, HB + RC]), ...V([xb(i) + 1, -(HB + RC)]), h.a.detail));

    // le cuir enroulé par-dessus, arraché à droite pour montrer la corde
    const HC = HB + 2 * RC + EC;
    const cuir = `M${P2(V([X_ENR, -HC]))} L${P2(V([coupeAA[5][0], -HC]))}` + lisse(coupeAA.slice().reverse().map(V), false, false)
      + ` L${P2(V([X_ENR, HC]))} Z`;
    out.push(h.path(cuir, BLANC), h.path(cuir, CUIR));
    out.push(`<clipPath id="p2409-cuirD"><path d="${cuir}" fill="none"/></clipPath>`);
    const bords = [];
    for (let x0 = X_ENR + 6; x0 < 110; x0 += 20) {
      const pts = [];
      for (let k = 0; k <= 10; k++) { const th = Math.PI * k / 10; pts.push(V([x0 + 10 * th / Math.PI, HC * Math.cos(th)])); }
      bords.push(h.path(lisse(pts), h.a.arete));
    }
    out.push(`<g clip-path="url(#p2409-cuirD)">${bords.join('\n')}</g>`);
    out.push(h.path(`M${P2(V([coupeAA[5][0], -HC]))} L${P2(V([X_ENR, -HC]))} L${P2(V([X_ENR, HC]))} L${P2(V([coupeAA[0][0], HC]))}`, h.a.contour));
    out.push(h.path(lisse(coupeAA.map(V)), h.a.arete));

    // le plan de coupe A-A
    const yc = HC + 9;
    out.push(h.ligne(...V([X_COUPE, -yc]), ...V([X_COUPE, yc]), `${h.a.fin} stroke-dasharray="10 3 2 3"`));
    for (const sg of [-1, 1]) {
      out.push(h.ligne(...V([X_COUPE, sg * yc]), ...V([X_COUPE, sg * (yc - 3)]), h.a.contour));
      out.push(h.fleche(`M${P2(V([X_COUPE, sg * yc]))} L${P2(V([X_COUPE - 7, sg * yc]))}`, h.a.arete));
      out.push(h.texte(...add(V([X_COUPE - 10, sg * yc]), [-2, 4]), 'A', { ancre: 'end' }));
    }
    return { svg: out.join('\n'), V };
  };

  const coupe = (z) => {
    const s = SD, c = [z.l / 2, z.h / 2];
    const V = p => [c[0] + p[0] * s, c[1] + p[1] * s];
    const out = [];
    const a0 = 12, b0 = HB;                     // le bois : 24 × 34
    const ai = a0 + 2 * RC, bi = b0 + 2 * RC, ae = ai + EC, be = bi + EC;
    const ell = (a, b) => `M${P2(V([a, 0]))} A${f(a * s)} ${f(b * s)} 0 1 1 ${P2(V([-a, 0]))} A${f(a * s)} ${f(b * s)} 0 1 1 ${P2(V([a, 0]))} Z`;
    // le cuir
    out.push(h.path(`${ell(ae, be)} ${ell(ai, bi)}`, `fill="${B}" fill-rule="evenodd" stroke="none"`));
    out.push(h.path(`${ell(ae, be)} ${ell(ai, bi)}`, `fill="url(#p2409-cuir)" fill-rule="evenodd" stroke="none"`));
    out.push(h.path(ell(ae, be), h.a.contour), h.path(ell(ai, bi), h.a.detail));
    // la corde : un rond noir par brin coupé, tour contre tour autour du bois
    const ac = a0 + RC, bc = b0 + RC, pts = [];
    let L = 0, prev = [ac, 0];
    const M = 720;
    const echant = [];
    for (let k = 0; k <= M; k++) { const t = 2 * Math.PI * k / M, p = [ac * Math.cos(t), bc * Math.sin(t)]; L += Math.hypot(p[0] - prev[0], p[1] - prev[1]); echant.push([L, p]); prev = p; }
    const n = Math.floor(L / (2 * RC));
    for (let i = 0; i < n; i++) { const cible = L * i / n; const e = echant.find(q => q[0] >= cible); pts.push(e[1]); }
    for (const p of pts) out.push(h.cercle(...V(p), RC * s * 0.96, h.a.plein));
    // le bois du manche
    out.push(h.path(ell(a0, b0), BLANC), h.path(ell(a0, b0), h.a.hachure('bois', 'arete')));
    return { svg: out.join('\n'), V, ae, be };
  };

  return {
    ref: '24-09',
    titre: 'Le bracelet de contre-appui et le manche grossi',
    desc: "Un bras plié au coude, la main droite serrée sur un manche debout, vue du côté de la paume : une bande de cuir bouclée serre le gras de l'avant-bras juste sous le coude. Une hache debout : le bout du manche est grossi là où la main serre, le reste du manche est nu là où l'autre main glisse. La prise grossie, en écorché : la corde enroulée serrée tour contre tour sur le bois, puis le cuir enroulé par-dessus ; et sa coupe à la même échelle : le bois au centre, l'anneau de corde, l'anneau de cuir.",
    format: 'pleine',
    disposition: [['bras', 'hache'], ['prise', 'coupe']],
    hauteurs: [1.75, 1],
    largeurs: [[3.3, 1], [3, 1.3]],
    vues: {
      bras: {
        titre: 'Le bracelet, juste sous le coude',
        dessin: z => bras(z).svg,
        renvois: z => {
          const { V } = bras(z);
          return [
            { n: 1, rond: V([30, 95]), cible: V([66, 30]), texte: 'bande de cuir ou de chambre à air' },
            { n: 2, rond: V([42, -128]), cible: V([46, interp(geo.dessus, 46) + 7]), texte: 'sur le gras, juste sous le coude' },
            { n: 3, rond: V([145, 92]), cible: V([104.8, 10]), texte: 'bouclée ou nouée, serrée' },
          ];
        },
      },
      hache: {
        titre: 'Où grossir',
        dessin: z => hache(z).svg,
        renvois: z => {
          const { V } = hache(z);
          return [
            { n: 4, rond: V([82, -92]), cible: V([23, -92]), texte: 'grossi là où la main serre' },
            { n: 5, rond: V([-90, -380]), cible: V([-15, -380]), texte: 'nu là où la main glisse' },
          ];
        },
      },
      prise: {
        titre: 'La prise grossie, en écorché',
        dessin: z => prise(z).svg,
        renvois: z => {
          const { V } = prise(z);
          return [
            { n: 6, rond: V([128, -35]), cible: V([128, -10]), texte: 'corde, lanière ou ruban, enroulé serré' },
            { n: 7, rond: V([84, 35]), cible: V([80, 12]), texte: 'puis du cuir par-dessus' },
          ];
        },
      },
      coupe: {
        titre: 'Coupe A-A',
        dessin: z => coupe(z).svg,
        renvois: z => {
          const { V } = coupe(z);
          return [
            { n: 8, rond: V([30, 30]), cible: V([3, 6]), texte: 'bois du manche' },
            { n: 9, rond: V([-30, -34]), cible: V([-13, -17.5]), texte: 'les doigts n’en font plus le tour' },
          ];
        },
      },
    },
    danger: 'Danger — si les doigts picotent, le bracelet est trop serré : on le desserre. Il se porte pour travailler, pas pour dormir.',
  };
};
