// Planche 13-40. Le ferrocérium, du tri du bois à la flamme. Refaite depuis zéro le 19 octobre 2026 (règle 12 :
// planche signalée, « Tabarnak, ouff », puis « les mains, l'amadou, le tipi, c'est laid en câlisse » ; pause du
// 15 octobre, point 23 ; la flèche 9 signalée au plan de match). Rien n'est repris de l'ancienne version.
//
// Six vues, dans l'ordre des gestes du chapitre 13 (étapes 10, 13, 14, 15, 16, 17) ; les repères 1 à 18 sont ceux du
// texte, dans le même ordre :
//   trier les quatre tas (1 à 4, étape 10) ; monter le tipi (5 et 6, étape 13) ; faire le nid (7 et 8, étape 14) ;
//   faire l'étincelle (9 à 12, étape 15) ; flamber (13 à 16, étape 16) ; glisser (17 et 18, étape 17).
//
// Les mains : h.formes.mainStock seulement (brief-agent.md), aucune main dessinée.
//   la tige       2-07 « manche-vers-bas » (le poing vu de dos, l'avant-bras qui monte), main gauche telle quelle,
//                 objet: false : la planche pose la tige sur l'axe .objet (le manche dans le poing, le métal qui
//                 descend vers le nid) ;
//   le couteau    1-01 « poing-barre » (le poing serré sur un manche, le pouce par-dessus), tourné pour que
//                 l'avant-bras monte et que la lame sorte du côté du pouce ; objet: false, le couteau sur l'axe ;
//   la boule      8-01 « paume-en-lair » (la main de côté, la paume en l'air, les doigts relevés) : elle tient la
//                 boule par le dessous ; l'avant-bras descend vers le corps, coupé par le bord de la vue.
// La tête : h.formes.teteSimple, de profil, la bouche entrouverte (elle souffle : le visage fait le geste), sans
// cheveux ; le cou coupé par le bas de la vue.
//
// Ce que le texte donne et que la planche montre, sans cote (aucune mesure de fabrication) : les quatre grosseurs
// (moins de 2 cm, 2 à 5 cm, moins de 15 cm), dans la légende ; « à un doigt de l'amadou » (la pointe au-dessus du
// creux, le jour entre les deux) ; « presque d'équerre » (le couteau en travers de la tige) ; « à une longueur
// d'avant-bras » (le trait de rappel entre la bouche et la boule).
//
// Le rouge : 10 (le cercle du dos du couteau sur la tige), 11 (la flèche : tirer la tige), 17 (la flèche : glisser
// le nid). Chaque rouge a son repère.

module.exports = (h) => {
  const A = h.a, F = h.formes;
  const f = v => Math.round(v * 10) / 10;
  const deg = a => a * Math.PI / 180;
  const add = (p, q) => [p[0] + q[0], p[1] + q[1]];
  const sub = (p, q) => [p[0] - q[0], p[1] - q[1]];
  const mul = (p, k) => [p[0] * k, p[1] * k];
  const lon = p => Math.hypot(p[0], p[1]);
  const unit = p => mul(p, 1 / lon(p));
  const perp = p => [-p[1], p[0]];
  const dir = a => [Math.cos(deg(a)), Math.sin(deg(a))];
  const gen = s => { let g = s; return () => (g = (g * 16807) % 2147483647) / 2147483647; };
  const BLANC = '#FFFFFF', GRIS = '#E6E6E6', OMBRE = '#CFCFCF';
  const remplir = (at, c) => at.replace('fill="none"', `fill="${c}"`);
  const M = p => `M ${f(p[0])} ${f(p[1])}`;
  const Lp = p => ` L ${f(p[0])} ${f(p[1])}`;
  const poly = (pts, ferme = true) => pts.map((p, i) => (i ? Lp(p) : M(p))).join('') + (ferme ? ' Z' : '');

  // Courbe lisse (Catmull-Rom) par tous les points.
  const lisse = (pts, ferme = false) => {
    const n = pts.length, p = i => ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
    let d = M(pts[0]);
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = p(i - 1), p1 = p(i), p2 = p(i + 1), p3 = p(i + 2);
      d += ` C ${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
    }
    return ferme ? d + ' Z' : d;
  };
  // Ce qui sort d'une vue (un avant-bras, un cou) est coupé net par son bord.
  const coupe = (id, z, svg) => `<clipPath id="vue-${id}-1340"><rect x="0" y="0" width="${z.l}" height="${z.h}"/></clipPath>\n<g clip-path="url(#vue-${id}-1340)">\n${svg}\n</g>`;

  // ═══ Le bois ═══════════════════════════════════════════════════════════════════════════════════════

  // Un bâton : un fuseau de a (rayon ra) à b (rayon rb), les deux bouts coupés arrondis.
  const fuseau = (a, b, ra, rb) => {
    const u = unit(sub(b, a)), v = perp(u), pts = [], n = 8;
    pts.push(add(a, mul(v, ra)), add(b, mul(v, rb)));
    for (let i = 1; i < n; i++) { const t = Math.PI / 2 - Math.PI * i / n; pts.push(add(b, add(mul(v, rb * Math.sin(t)), mul(u, rb * Math.cos(t) * 0.55)))); }
    pts.push(add(b, mul(v, -rb)), add(a, mul(v, -ra)));
    for (let i = 1; i < n; i++) { const t = -Math.PI / 2 + Math.PI * i / n; pts.push(add(a, add(mul(v, ra * Math.sin(t)), mul(u, -ra * Math.cos(t) * 0.55)))); }
    return poly(pts);
  };

  // Les tas, en perspective cavalière : chaque morceau montre son bout coupé, le corps fuit vers le haut à droite.
  const FUITE = mul(dir(-28), 1);
  // un rondin vu par le bout : le bout (un cercle et ses cernes), le corps qui fuit sur une longueur L
  const rondin = (c, r, L, cernes = 0, graine = 1) => {
    const g = gen(graine), d = mul(FUITE, L), v = perp(FUITE);
    const corps = [add(c, mul(v, r)), add(add(c, d), mul(v, r)), add(add(c, d), mul(v, -r)), add(c, mul(v, -r))];
    const out = [h.path(poly(corps), remplir(A.arete, BLANC))];
    // le dessus du corps à l'ombre ? non : la face de dessous (à droite et dessous) est à l'ombre
    out.push(h.path(poly([add(c, mul(v, -r)), add(add(c, d), mul(v, -r)), add(add(c, d), mul(v, -r * 0.35)), add(c, mul(v, -r * 0.35))]), A.ombre));
    out.push(h.path(M(add(add(c, d), mul(v, r))) + Lp(add(add(c, d), mul(v, -r))), A.detail));
    out.push(h.path(M(add(c, mul(v, r))) + Lp(add(add(c, d), mul(v, r))) + M(add(c, mul(v, -r))) + Lp(add(add(c, d), mul(v, -r))), A.arete));
    out.push(h.cercle(c[0], c[1], r, remplir(A.arete, BLANC)));
    for (let k = 1; k <= cernes; k++) {
      const rr = r * (1 - k / (cernes + 1)), a0 = g() * 360, a1 = a0 + 200 + g() * 100;
      const pts = []; for (let i = 0; i <= 16; i++) { const a = deg(a0 + (a1 - a0) * i / 16); pts.push([c[0] + rr * Math.cos(a), c[1] + rr * Math.sin(a)]); }
      out.push(h.path(lisse(pts), A.fin));
    }
    if (cernes) out.push(h.cercle(c[0] + r * 0.06, c[1] - r * 0.04, Math.max(0.9, r * 0.07), A.plein));
    return out.join('\n');
  };
  // un quartier fendu vu par le bout : un secteur du rondin (l'écorce sur l'arc), le corps qui fuit
  const quartier = (c, r, a0, a1, L) => {
    const d = mul(FUITE, L);
    const arcPts = []; for (let i = 0; i <= 10; i++) { const a = deg(a0 + (a1 - a0) * i / 10); arcPts.push([c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)]); }
    const bout = [c, ...arcPts];
    // la silhouette du corps : le bout et le même bout déplacé de d, reliés par l'enveloppe (on prend les points extrêmes
    // dans la direction perpendiculaire à la fuite)
    const v = perp(FUITE), proj = p => p[0] * v[0] + p[1] * v[1];
    const hi = bout.reduce((m, p) => proj(p) > proj(m) ? p : m), lo = bout.reduce((m, p) => proj(p) < proj(m) ? p : m);
    const out = [h.path(poly([hi, add(hi, d), add(lo, d), lo]), remplir(A.arete, BLANC))];
    out.push(h.path(poly(bout.map(p => add(p, d))), remplir(A.detail, BLANC)));
    out.push(h.path(poly(bout), remplir(A.arete, BLANC)));
    // l'écorce : un second arc juste dedans ; le fil du bois : deux traits du cœur vers l'arc
    const ec = []; for (let i = 0; i <= 10; i++) { const a = deg(a0 + (a1 - a0) * i / 10); ec.push([c[0] + r * 0.84 * Math.cos(a), c[1] + r * 0.84 * Math.sin(a)]); }
    out.push(h.path(lisse(ec), A.detail));
    const am = deg((a0 + a1) / 2);
    out.push(h.path(M(add(c, mul([Math.cos(am), Math.sin(am)], r * 0.2))) + Lp(add(c, mul([Math.cos(am), Math.sin(am)], r * 0.6))), A.fin));
    return out.join('\n');
  };

  // Le tipi : des bâtons dressés en cône lâche autour d'un point, une ouverture d'un quart du tour du côté du vent.
  // Repère au sol : x à droite, y vers nous, z en haut ; vu d'un peu au-dessus (TH).
  const TH = 24, sTH = Math.sin(deg(TH)), cTH = Math.cos(deg(TH));
  const P3 = (c, x, y, z) => [c[0] + x, c[1] + y * sTH - z * cTH];
  const OUV = [112, 178];                          // l'ouverture : devant à gauche (angles au sol, y vers nous)
  const tipi = (c, R, H, graine, { dedans = '', n = 13, ep = 3, sol = 1.55 } = {}) => {
    const g = gen(graine), out = [];
    out.push(h.ellipse(c[0], c[1], R * sol, R * sol * sTH, A.loin));
    const libre = 360 - (OUV[1] - OUV[0]);
    const batons = [];
    for (let i = 0; i < n; i++) {
      const a = OUV[1] + libre * (i + 0.5 + (g() - 0.5) * 0.5) / n;
      const rr = R * (0.9 + g() * 0.2);
      const pied = [rr * Math.cos(deg(a)), rr * Math.sin(deg(a)), 0];
      const som = [(g() - 0.5) * R * 0.12, (g() - 0.5) * R * 0.12, H];
      const k = 1.1 + g() * 0.12;
      const haut = [pied[0] + (som[0] - pied[0]) * k, pied[1] + (som[1] - pied[1]) * k, pied[2] + (som[2] - pied[2]) * k];
      batons.push({ a, y: pied[1], pied, haut, r: ep * (0.85 + g() * 0.35) });
    }
    batons.sort((p, q) => p.y - q.y);
    const dessine = b => {
      const p = P3(c, ...b.pied), q = P3(c, ...b.haut);
      const loin = b.y < -R * 0.15;
      return h.path(fuseau(p, q, b.r, b.r * 0.55), remplir(loin ? A.detail : A.arete, loin ? GRIS : BLANC));
    };
    batons.filter(b => b.y < 0).forEach(b => out.push(dessine(b)));
    out.push(dedans);
    batons.filter(b => b.y >= 0).forEach(b => out.push(dessine(b)));
    const om = deg((OUV[0] + OUV[1]) / 2);
    return {
      svg: out.join('\n'),
      // le milieu de l'ouverture, à la hauteur z
      ouv: (z, k = 1) => P3(c, Math.cos(om) * R * k * (1 - z / H), Math.sin(om) * R * k * (1 - z / H), z),
      om, batons, sommet: P3(c, 0, 0, H),
    };
  };

  // ═══ L'amadou ══════════════════════════════════════════════════════════════════════════════════════

  // Le nid : une poignée de fibres effilochées, creusée au milieu. Vu d'un peu au-dessus (theta). Un bol aux bords
  // irréguliers ; les fibres sont de longs traits souples qui suivent le tour du bol et se croisent ; quelques bouts
  // dépassent du contour ; dans la paroi de devant, des jours où l'on voit au travers. Au fond du creux, la poudre.
  // (cx, yS) : le point du sol sous le centre ; R : le rayon au bord.
  let nNid = 0;
  const nid = (cx, yS, R, graine, { theta = 32, jours = 3, poudre = true, fibres = 1 } = {}) => {
    const g = gen(graine), id = `nid-${++nNid}-1340`, out = [];
    const st = Math.sin(deg(theta)), ct = Math.cos(deg(theta));
    const Hb = R * 0.62, Ri = R * 0.66, zf = Hb * 0.4, Rf = R * 0.36;
    const pr = (x, y, z) => [cx + x, yS + y * st - z * ct];
    const bosse = (a, amp = 0.05) => 1 + amp * Math.sin(3 * a + 1.3 * graine) + amp * 0.6 * Math.sin(7 * a + graine);
    // le rayon de la paroi à la hauteur z (le bol s'arrondit vers le bas)
    const rz = z => { const t = 1 - z / Hb; return R * Math.sqrt(Math.max(0, 1 - 0.7 * t * t)); };
    const cercle = (rad, z, a0 = 0, a1 = 2 * Math.PI, nb = 48, amp = 0.05) => {
      const o = []; for (let i = 0; i <= nb; i++) { const a = a0 + (a1 - a0) * i / nb; o.push(pr(rad * bosse(a, amp) * Math.cos(a), rad * bosse(a, amp) * Math.sin(a), z)); }
      return o;
    };
    // la silhouette : le haut du bord (derrière), puis la paroi de devant jusqu'au fond
    const bordHaut = cercle(R, Hb, Math.PI, 2 * Math.PI, 40);
    const dessous = [];
    for (let i = 0; i <= 40; i++) {
      const a = i / 40 * Math.PI;   // de droite (0) à gauche (π), par devant
      // le point le plus bas de la paroi dans cette direction : on balaie z
      let best = null;
      for (let k = 0; k <= 12; k++) { const z = Hb * k / 12, rad = rz(z) * bosse(a), p = pr(rad * Math.cos(a), rad * Math.sin(a), z); if (!best || p[1] > best[1]) best = p; }
      dessous.push(best);
    }
    const sil = [...bordHaut, ...dessous];
    const silD = lisse(sil, true);
    const ouvD = lisse(cercle(Ri, Hb, 0, 2 * Math.PI, 40, 0.04).slice(0, -1), true);
    const fondD = lisse(cercle(Rf, zf, 0, 2 * Math.PI, 32, 0.03).slice(0, -1), true);
    out.push(`<defs><clipPath id="${id}-sil"><path d="${silD}"/></clipPath><clipPath id="${id}-ouv"><path d="${ouvD}"/></clipPath></defs>`);
    out.push(h.path(silD, A.blanc));
    // une fibre : un arc du tour du bol, à une hauteur qui glisse (elle monte ou descend en tournant), un peu ondulé
    const fibre = (rad0, rad1, z0, z1, a0, a1, nb = 18) => {
      const o = [];
      for (let i = 0; i <= nb; i++) {
        const t = i / nb, a = a0 + (a1 - a0) * t, z = z0 + (z1 - z0) * t, rad = (rad0 + (rad1 - rad0) * t) * bosse(a, 0.04);
        o.push(pr(rad * Math.cos(a), rad * Math.sin(a), z + Math.sin(t * 6 + a0 * 3) * Hb * 0.02));
      }
      return lisse(o);
    };
    // le creux : la paroi de derrière vue de l'intérieur, l'ombre sous le bord de devant, le fond
    let creux = '';
    for (let i = 0; i < Math.round(16 * fibres); i++) {
      const z0 = zf + (Hb - zf) * (0.15 + g() * 0.8), z1 = zf + (Hb - zf) * (0.1 + g() * 0.85);
      const a0 = Math.PI * (1.0 + g() * 0.7), a1 = a0 + Math.PI * (0.25 + g() * 0.4);
      const r0 = Rf + (Ri - Rf) * ((z0 - zf) / (Hb - zf)), r1 = Rf + (Ri - Rf) * ((z1 - zf) / (Hb - zf));
      creux += fibre(r0, r1, z0, z1, a0, a1) + ' ';
    }
    out.push(`<g clip-path="url(#${id}-ouv)">`);
    out.push(h.path(lisse(cercle(Ri * 1.02, Hb - Hb * 0.04, 0.15 * Math.PI, 0.85 * Math.PI, 20).concat(cercle(Rf * 1.25, zf, 0.85 * Math.PI, 0.15 * Math.PI, 16)), true), A.ombre));
    out.push(h.path(creux, A.fin));
    out.push(h.path(fondD, A.fin));
    if (poudre) {
      const c0 = pr(0, 0, zf), rx = Rf * 0.5, ht = Rf * 0.32;
      out.push(h.path(`M ${f(c0[0] - rx)} ${f(c0[1])} C ${f(c0[0] - rx * 0.5)} ${f(c0[1] - ht * 0.3)} ${f(c0[0] - rx * 0.35)} ${f(c0[1] - ht)} ${f(c0[0])} ${f(c0[1] - ht)} C ${f(c0[0] + rx * 0.35)} ${f(c0[1] - ht)} ${f(c0[0] + rx * 0.5)} ${f(c0[1] - ht * 0.3)} ${f(c0[0] + rx)} ${f(c0[1])} C ${f(c0[0] + rx * 0.5)} ${f(c0[1] + rx * st * 0.5)} ${f(c0[0] - rx * 0.5)} ${f(c0[1] + rx * st * 0.5)} ${f(c0[0] - rx)} ${f(c0[1])} Z`, remplir(A.detail, BLANC)));
      let gr = '';
      for (let i = 0; i < 26; i++) { const xx = g() * 2 - 1, yy = g(); gr += h.cercle(c0[0] + xx * rx * 0.8, c0[1] - yy * (1 - Math.abs(xx)) * ht * 0.85, 0.45, A.plein); }
      out.push(gr);
    }
    out.push('</g>');
    out.push(h.path(ouvD, A.detail));
    // la paroi de devant et le bord : les fibres qui font le tour
    let paroi = '', bord = '';
    for (let i = 0; i < Math.round(26 * fibres); i++) {
      const z0 = Hb * (0.08 + g() * 0.9), z1 = Math.max(0, Math.min(Hb, z0 + (g() - 0.5) * Hb * 0.7));
      const a0 = -0.15 + g() * Math.PI * 0.9, a1 = a0 + Math.PI * (0.3 + g() * 0.45) * (g() < 0.5 ? 1 : -1);
      paroi += fibre(rz(z0) * 1.01, rz(z1) * 1.01, z0, z1, a0, a1) + ' ';
    }
    for (let i = 0; i < Math.round(14 * fibres); i++) {
      const rad = Ri + (R - Ri) * (0.2 + g() * 0.7), a0 = g() * 2 * Math.PI, a1 = a0 + Math.PI * (0.3 + g() * 0.5);
      bord += fibre(rad, rad + (g() - 0.5) * (R - Ri) * 0.6, Hb, Hb, a0, a1) + ' ';
    }
    out.push(`<g clip-path="url(#${id}-sil)">`);
    out.push(h.path(paroi, A.fin));
    out.push(`</g>`);
    out.push(h.path(bord, A.fin));
    // les jours : un trou entre les fibres de la paroi, où l'on voit au travers (gris), deux brins qui le traversent
    const lesJours = [];
    for (let i = 0; i < jours; i++) {
      const a = Math.PI * (0.25 + 0.5 * i / Math.max(1, jours - 1) + (g() - 0.5) * 0.08), z = Hb * (0.38 + g() * 0.25);
      const q = pr(rz(z) * Math.cos(a), rz(z) * Math.sin(a), z), w = R * (0.13 + g() * 0.04), hh = R * (0.07 + g() * 0.03);
      const tr = []; for (let k = 0; k < 10; k++) { const t = k / 10 * 2 * Math.PI; tr.push([q[0] + w * Math.cos(t) * (1 + 0.15 * Math.sin(3 * t + i)), q[1] + hh * Math.sin(t) * (1 + 0.2 * Math.cos(2 * t + i))]); }
      out.push(h.path(lisse(tr, true), remplir(A.fin, GRIS)));
      out.push(h.path(`${M([q[0] - w * 1.25, q[1] - hh * 0.2])} Q ${f(q[0])} ${f(q[1] + hh * 0.5)} ${f(q[0] + w * 1.2)} ${f(q[1] - hh * 0.4)}`, A.fin));
      lesJours.push(q);
    }
    // les bouts de fibres qui dépassent du contour
    let bouts = '';
    for (let i = 0; i < 9; i++) {
      const k = Math.floor(g() * sil.length), p = sil[k], c = pr(0, 0, Hb * 0.5), o = unit(sub(p, c)), t = perp(o);
      const l = R * (0.1 + g() * 0.12), s = (g() - 0.5) * 1.6;
      bouts += `${M(add(p, mul(o, -l * 0.3)))} Q ${f(p[0] + o[0] * l * 0.5 + t[0] * l * s * 0.5)} ${f(p[1] + o[1] * l * 0.5 + t[1] * l * s * 0.5)} ${f(p[0] + o[0] * l + t[0] * l * s)} ${f(p[1] + o[1] * l + t[1] * l * s)} `;
    }
    out.push(h.path(bouts, A.fin));
    out.push(h.path(silD, A.arete));
    return { svg: out.join('\n'), poudre: pr(0, 0, zf), creux: pr(0, 0, zf + Hb * 0.1), bord: pr(0, R * 0.9, Hb), jours: lesJours, Hb, R, Rf, haut: pr(0, -R, Hb), pr };
  };

  // La boule : le nid refermé, une pelote de fibres. Un contour bosselé, des fibres en grands arcs qui l'enroulent.
  const boule = (c, r, graine) => {
    const g = gen(graine), out = [];
    const cont = []; for (let i = 0; i < 28; i++) { const a = i / 28 * 2 * Math.PI; cont.push([c[0] + r * (1 + 0.05 * Math.sin(3 * a + graine) + 0.03 * Math.sin(8 * a)) * Math.cos(a), c[1] + r * (1 + 0.05 * Math.sin(3 * a + graine) + 0.03 * Math.sin(8 * a)) * Math.sin(a)]); }
    const cD = lisse(cont, true), id = `boule-${graine}-1340`;
    out.push(`<defs><clipPath id="${id}"><path d="${cD}"/></clipPath></defs>`);
    out.push(h.path(cD, A.blanc));
    let fib = '';
    for (let i = 0; i < 16; i++) {
      // un grand cercle de la sphère, incliné au hasard, dont on garde la moitié de devant
      const inc = g() * Math.PI, rot = g() * Math.PI, pts = [];
      const a0 = g() * Math.PI, a1 = a0 + Math.PI * (0.35 + g() * 0.4);
      for (let k = 0; k <= 14; k++) {
        const a = a0 + (a1 - a0) * k / 14, x = Math.cos(a), y = Math.sin(a) * Math.cos(inc), z = Math.sin(a) * Math.sin(inc);
        if (z < -0.1) continue;
        pts.push([c[0] + r * 0.96 * (x * Math.cos(rot) - y * Math.sin(rot)), c[1] + r * 0.96 * (x * Math.sin(rot) + y * Math.cos(rot))]);
      }
      if (pts.length > 3) fib += lisse(pts) + ' ';
    }
    out.push(`<g clip-path="url(#${id})">${h.path(fib, A.fin)}</g>`);
    let bouts = '';
    for (let i = 0; i < 7; i++) {
      const a = g() * 2 * Math.PI, p = [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)], o = [Math.cos(a), Math.sin(a)], t = perp(o), l = r * (0.15 + g() * 0.15), s = (g() - 0.5) * 1.5;
      bouts += `${M(add(p, mul(o, -l * 0.3)))} Q ${f(p[0] + o[0] * l * 0.5 + t[0] * l * s * 0.5)} ${f(p[1] + o[1] * l * 0.5 + t[1] * l * s * 0.5)} ${f(p[0] + o[0] * l + t[0] * l * s)} ${f(p[1] + o[1] * l + t[1] * l * s)} `;
    }
    out.push(h.path(bouts, A.fin));
    out.push(h.path(cD, A.arete));
    return out.join('\n');
  };

  // L'amadou du tas : une touffe de fibres et deux rouleaux d'écorce de bouleau.
  const touffe = (c, w, hh, graine) => {
    const g = gen(graine), out = [];
    const cont = [];
    for (let i = 0; i <= 24; i++) { const a = Math.PI + Math.PI * i / 24; cont.push([c[0] + w / 2 * Math.cos(a) * (1 + 0.08 * Math.sin(5 * a)), c[1] + hh * Math.sin(a) * (1 + 0.12 * Math.sin(4 * a + 1))]); }
    const d = lisse(cont) + ` L ${f(c[0] - w / 2)} ${f(c[1])} Z`;
    const id = `touffe-${graine}-1340`;
    out.push(`<defs><clipPath id="${id}"><path d="${d}"/></clipPath></defs>`);
    out.push(h.path(d, A.blanc));
    let fib = '';
    for (let i = 0; i < 14; i++) {
      const y0 = c[1] - hh * (0.1 + g() * 0.8), x0 = c[0] - w / 2 + g() * w * 0.4, x1 = x0 + w * (0.35 + g() * 0.4);
      fib += `${M([x0, y0])} C ${f(x0 + (x1 - x0) * 0.3)} ${f(y0 - hh * 0.25 * (g() - 0.3))} ${f(x0 + (x1 - x0) * 0.7)} ${f(y0 + hh * 0.3 * (g() - 0.5))} ${f(x1)} ${f(y0 + hh * 0.1 * (g() - 0.5))} `;
    }
    out.push(`<g clip-path="url(#${id})">${h.path(fib, A.fin)}</g>`);
    let bouts = '';
    for (let i = 0; i < 8; i++) {
      const a = Math.PI * (1.08 + g() * 0.84), p = [c[0] + w / 2 * Math.cos(a), c[1] + hh * Math.sin(a)], o = [Math.cos(a), Math.sin(a) * 1.4], l = hh * (0.18 + g() * 0.2);
      bouts += `${M(p)} q ${f(o[0] * l * 0.6 + (g() - 0.5) * l)} ${f(o[1] * l * 0.6)} ${f(o[0] * l + (g() - 0.5) * l)} ${f(o[1] * l)} `;
    }
    out.push(h.path(bouts, A.fin));
    out.push(h.path(lisse(cont), A.arete));
    return out.join('\n');
  };
  // un rouleau d'écorce de bouleau : un cylindre court, le bout en spirale
  const rouleau = (c, r, L) => {
    const d = mul(FUITE, L), v = perp(FUITE), out = [];
    out.push(h.path(poly([add(c, mul(v, r)), add(add(c, d), mul(v, r)), add(add(c, d), mul(v, -r)), add(c, mul(v, -r))]), remplir(A.arete, BLANC)));
    out.push(h.ellipse(c[0] + d[0], c[1] + d[1], r * 0.5, r, remplir(A.detail, BLANC)));
    out.push(h.ellipse(c[0], c[1], r * 0.5, r, remplir(A.arete, BLANC)));
    const sp = []; for (let i = 0; i <= 30; i++) { const t = i / 30, a = t * 4 * Math.PI, rr = r * (0.9 - 0.75 * t); sp.push([c[0] + rr * 0.5 * Math.cos(a), c[1] + rr * Math.sin(a)]); }
    out.push(h.path(lisse(sp), A.fin));
    // les lenticelles : deux petits traits sur le corps
    [0.35, 0.65].forEach(t => { const p = add(c, mul(d, t)); out.push(h.path(M(add(p, mul(v, r * 0.3))) + Lp(add(p, mul(v, r * 0.6))), A.fin)); });
    return out.join('\n');
  };

  // Les flammes : des langues lisses, la plus haute au milieu.
  const langue = (x, yB, w, hh, pen) => `M ${f(x - w / 2)} ${f(yB)} C ${f(x - w / 2)} ${f(yB - hh * 0.45)} ${f(x + pen * 0.3 - w * 0.15)} ${f(yB - hh * 0.62)} ${f(x + pen)} ${f(yB - hh)} C ${f(x + pen * 0.45 + w * 0.22)} ${f(yB - hh * 0.6)} ${f(x + w / 2)} ${f(yB - hh * 0.42)} ${f(x + w / 2)} ${f(yB)} Z`;
  const flammes = (x, yB, W, Hf) => [
    h.path(langue(x - W * 0.28, yB, W * 0.42, Hf * 0.58, -W * 0.18), remplir(A.arete, BLANC)),
    h.path(langue(x + W * 0.27, yB, W * 0.42, Hf * 0.66, W * 0.16), remplir(A.arete, BLANC)),
    h.path(langue(x, yB, W * 0.5, Hf, W * 0.05), remplir(A.arete, BLANC)),
    h.path(langue(x + W * 0.02, yB, W * 0.22, Hf * 0.48, -W * 0.02), A.detail),
  ].join('\n');

  // ═══ La tige et le couteau ═════════════════════════════════════════════════════════════════════════

  // La tige de ferrocérium : le métal (diamètre dm) de la pointe T sur une longueur Lm le long de u, puis le manche
  // (diamètre dp, longueur Lp). e : unités de vue par mm.
  const tigeDessin = (T, u, e, { dm = 10, Lm = 100, dp = 22, Lpo = 80 } = {}) => {
    const v = perp(u), P = (s, t) => add(add(T, mul(u, s * e)), mul(v, t * e));
    const rm = dm / 2, rp = dp / 2, out = [];
    // le métal, le bout arrondi
    const metal = [P(Lm + 4, -rm), P(0, -rm)];
    for (let i = 1; i < 8; i++) { const a = -Math.PI / 2 - Math.PI * i / 8; metal.push(P(rm * 0.7 * Math.cos(a), rm * Math.sin(a))); }
    metal.push(P(0, rm), P(Lm + 4, rm));
    out.push(h.path(poly(metal), remplir(A.arete, BLANC)));
    out.push(h.path(M(P(4, -rm * 0.35)) + Lp(P(Lm, -rm * 0.35)), A.fin));
    // le manche
    const man = [P(Lm, -rp), P(Lm + Lpo - 6, -rp)];
    for (let i = 1; i < 8; i++) { const a = -Math.PI / 2 + Math.PI * i / 8; man.push(P(Lm + Lpo - 6 + 6 * Math.cos(a), rp * Math.sin(a))); }
    man.push(P(Lm + Lpo - 6, rp), P(Lm, rp));
    out.push(h.path(poly(man), remplir(A.arete, OMBRE)));
    // le trou du cordon, au bout du manche
    const tc = P(Lm + Lpo - 10, 0);
    out.push(h.cercle(tc[0], tc[1], 2.2 * e, remplir(A.detail, BLANC)));
    return { svg: out.join('\n'), P };
  };

  // Le couteau, dans son repère : s le long de la lame (de la garde vers la pointe), t vers le tranchant ; le dos de la
  // lame est la ligne t = 0. K(s, t) donne le point de la vue.
  const couteauDessin = K => {
    const lame = [K(-2, 0), K(50, 0), K(62, 1.5), K(74, 7), K(66, 14), K(52, 20), K(36, 22), K(-2, 22)];
    const lameD = `${M(K(-2, 0))}${Lp(K(52, 0))} Q ${f(K(66, 0.5)[0])} ${f(K(66, 0.5)[1])} ${f(K(76, 7)[0])} ${f(K(76, 7)[1])} Q ${f(K(68, 18)[0])} ${f(K(68, 18)[1])} ${f(K(46, 22)[0])} ${f(K(46, 22)[1])}${Lp(K(-2, 22))} Z`;
    const out = [h.path(lameD, remplir(A.arete, BLANC))];
    out.push(h.path(`${M(K(0, 14.5))}${Lp(K(46, 14.5))} Q ${f(K(64, 14)[0])} ${f(K(64, 14)[1])} ${f(K(74, 8.5)[0])} ${f(K(74, 8.5)[1])}`, A.fin));
    out.push(h.path(M(K(-2, 0)) + Lp(K(54, 0)), A.contour));          // le dos : le trait fort
    out.push(h.path(poly([K(-2, -3), K(-7, -3), K(-7, 25), K(-2, 25)]), remplir(A.arete, BLANC)));   // la garde
    const man = [K(-7, -1), K(-118, -1)];
    for (let i = 1; i < 8; i++) { const a = -Math.PI / 2 + Math.PI * i / 8; man.push(K(-118 - 9 * Math.cos(a), 11.5 + 12.5 * Math.sin(a))); }
    man.push(K(-118, 24), K(-7, 24));
    out.push(h.path(poly(man), remplir(A.arete, OMBRE)));
    return { svg: out.join('\n'), lame: lameD };
  };

  // ═══ La géométrie des vues ═════════════════════════════════════════════════════════════════════════

  // Vue 1 : les quatre tas sur une ligne de sol, du plus fin au plus gros.
  const tas = z => {
    const yS = z.h - 6;
    return { yS, x1: z.l * 0.06, x2: z.l * 0.27, x3: z.l * 0.47, x4: z.l * 0.72 };
  };
  // Vue 2 : le tipi seul, l'ouverture devant à gauche.
  const vueTipi = z => ({ c: [z.l * 0.6, z.h - 22], R: Math.min(56, z.l * 0.2), H: Math.min(z.h - 30, 120) });
  // Vue 4 : l'étincelle. La personne est derrière le nid, face à nous ; ses deux avant-bras sortent par le haut.
  //   La tige, dans la main gauche (en haut à droite), descend vers le creux du nid ; sa pointe s'arrête à un doigt
  //   (environ 20 mm) au-dessus de la poudre. Le couteau, dans la main droite, est en travers de la tige, presque
  //   d'équerre ; le dos de la lame appuie sur le métal, près du manche de la tige.
  const RHO = -62;                                   // l'axe de la tige, de la pointe vers le manche
  const etincelle = z => {
    const e = 0.82;
    const n = nid(z.l * 0.43, z.h - 12, 50, 4, { jours: 2, theta: 34, fibres: 0.8 });
    const u = dir(RHO);
    const T = add(n.poudre, [3, -(n.Rf * 0.32) - 20 * e]);       // la pointe : un doigt au-dessus du tas de poudre
    const C = add(T, mul(u, 70 * e));                            // le dos du couteau sur la tige
    const kd = dir(RHO + 90 + 6);                                 // le couteau : presque d'équerre avec la tige
    const kt = mul(u, 1);                                         // vers le tranchant : le long de la tige, vers son manche
    const sc = 30;                                                // le point de la lame qui touche, à 30 mm de la garde
    const K = (s, t) => add(C, add(mul(kd, (s - sc) * e), mul(kt, t * e)));
    return { e, n, u, T, C, kd, kt, K };
  };
  // Vue 5 : la tête de profil (le visage à droite) ; la boule à une longueur d'avant-bras devant la bouche, posée dans
  // la main, la paume en l'air.
  const souffler = z => {
    const e = 0.42;
    const tete = F.teteSimple({ x: 54, y: z.h - 70, echelle: e, bouche: 'ouverte', ouverture: 0.3, cou: 300, sourcil: false });
    const L0 = tete.bouche, r = 46 * e;
    const B = [L0[0] + 280 * e, L0[1] - 4];
    return { e, tete, L0, r, B };
  };
  // Vue 6 : le tipi, plus grand, le nid qui flambe glissé dedans.
  const vueGlisser = z => ({ c: [z.l * 0.42, z.h - 26], R: Math.min(64, z.l * 0.21), H: Math.min(z.h - 34, 132) });

  return {
    ref: '13-40',
    titre: 'Le ferrocérium, du tri du bois à la flamme',
    desc: 'Six vues dans l’ordre des gestes. Les quatre tas triés sur le sol : une touffe de fibres et deux rouleaux d’écorce de bouleau, une pile de petit bois de moins de 2 cm, une pile de quartiers fendus de 2 à 5 cm, une pile de bûches de moins de 15 cm. Le tipi de petit bois sur le sol, en cône lâche, avec une ouverture du côté d’où vient le vent. Le nid : une poignée de fibres creusée au milieu, avec des jours où l’on voit au travers et un petit tas de poudre au fond du creux. L’étincelle : la tige tenue dans le poing, la pointe à un doigt au-dessus du creux ; le couteau en travers de la tige, presque d’équerre, le dos de la lame appuyé sur le métal et tenu immobile ; la tige qu’on tire vers soi ; la gerbe qui tombe dans le creux. Puis le nid refermé en boule, posé dans la main, la paume en l’air, à une longueur d’avant-bras devant la bouche ; on souffle, la fumée part de l’autre côté. Enfin le nid en flammes glissé sous le tipi par l’ouverture, une pile de quartiers fendus qui attend à côté.',
    format: 'pleine',
    disposition: [['tas', 'tipi'], ['nid', 'etincelle'], ['souffler', 'glisser']],
    hauteurs: [0.8, 1.45, 1.1],
    largeurs: [[1.5, 1], [0.78, 1.42], [1.12, 1]],
    vues: {
      // ── 1. Trier (étape 10) ────────────────────────────────────────────────────────────────────────────
      tas: {
        titre: 'Trier en quatre tas',
        dessin: z => {
          const t = tas(z), out = [h.ligne(0, t.yS, z.l, t.yS, A.detail)];
          // 1. l'amadou : la touffe de fibres, deux rouleaux d'écorce devant
          out.push(touffe([t.x1 + 22, t.yS], 50, 22, 3));
          out.push(rouleau([t.x1 + 10, t.yS - 5], 5, 16), rouleau([t.x1 + 30, t.yS - 4.5], 4.5, 18));
          // 2. le bois de moins de 2 cm : une pile de baguettes, les bouts vers nous
          const r2 = 3.6, base2 = [t.x2, t.yS - r2];
          [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [0.5, 1], [1.5, 1], [2.5, 1], [3.5, 1], [1, 2], [2, 2], [3, 2]].forEach(([i, j], k) => {
            out.push(rondin([base2[0] + i * r2 * 2.05, base2[1] - j * r2 * 1.75], r2, 46 + (k % 3) * 4, 0, k + 1));
          });
          // 3. le bois de 2 à 5 cm : des quartiers fendus, empilés
          const r3 = 11, b3 = [t.x3 + r3, t.yS - 1];
          out.push(quartier([b3[0], b3[1]], r3, 180, 270, 46));
          out.push(quartier([b3[0] + r3 * 1.35, b3[1]], r3, 270, 360, 46));
          out.push(quartier([b3[0] + r3 * 2.55, b3[1]], r3, 180, 270, 46));
          out.push(quartier([b3[0] + r3 * 0.7, b3[1] - r3 * 0.98], r3, 200, 300, 46));
          out.push(quartier([b3[0] + r3 * 2.0, b3[1] - r3 * 0.98], r3, 240, 340, 46));
          // 4. les bûches de moins de 15 cm : trois en bas, deux dessus
          const r4 = 15, b4 = [t.x4 + r4, t.yS - r4];
          [[0, 0], [2, 0], [4, 0], [1, 1], [3, 1]].forEach(([i, j], k) => out.push(rondin([b4[0] + i * r4 * 1.02, b4[1] - j * r4 * 1.72], r4, 40, 2, 10 + k)));
          return out.join('\n');
        },
        renvois: z => {
          const t = tas(z), y = 14;
          return [
            { n: 1, rond: [t.x1 + 22, y], cible: [t.x1 + 24, t.yS - 21], texte: 'l’amadou fin' },
            { n: 2, rond: [t.x2 + 14, y], cible: [t.x2 + 3.6 * 4.1 + 1, t.yS - 3.6 - 2 * 3.6 * 1.75 - 3.4] , texte: 'le bois fin, de moins de 2 cm' },
            { n: 3, rond: [t.x3 + 26, y], cible: [t.x3 + 11 + 11 * 0.7 - 2, t.yS - 1 - 11 * 0.98 - 10.5], texte: 'le bois de 2 à 5 cm' },
            { n: 4, rond: [t.x4 + 34, y], cible: [t.x4 + 15 + 15 * 1.02, t.yS - 15 - 15 * 1.72 - 14.5], texte: 'les bûches de moins de 15 cm' },
          ];
        },
      },
      // ── 2. Le tipi (étape 13) ──────────────────────────────────────────────────────────────────────────
      tipi: {
        titre: 'Monter le tipi',
        dessin: z => {
          const g = vueTipi(z), t = tipi(g.c, g.R, g.H, 21);
          // le vent : deux flèches qui viennent de devant à gauche et entrent par l'ouverture, à mi-hauteur
          const fl = zz => { const b = t.ouv(zz, 1.05), a = t.ouv(zz, 2.5); return h.fleche(`${M(a)} L ${f(b[0])} ${f(b[1])}`, A.detail); };
          return [t.svg, fl(g.H * 0.12), fl(g.H * 0.26)].join('\n');
        },
        renvois: z => {
          const g = vueTipi(z), t = tipi(g.c, g.R, g.H, 21);
          const front = t.batons.filter(b => b.y > 0).sort((p, q) => q.pied[0] - p.pied[0])[0];
          const cb = P3(g.c, front.pied[0] * 0.55, front.pied[1] * 0.55, g.H * 0.45);
          return [
            { n: 5, rond: [z.l - 14, g.c[1] - g.H * 0.75], cible: cb, texte: 'dresser le bois fin en cône lâche' },
            { n: 6, rond: [14, g.c[1] - g.H * 0.55], cible: t.ouv(g.H * 0.4, 0.9), texte: 'laisser une ouverture du côté du vent' },
          ];
        },
      },
      // ── 3. Le nid (étape 14) ───────────────────────────────────────────────────────────────────────────
      nid: {
        titre: 'Faire le nid',
        dessin: z => nid(z.l / 2, z.h * 0.72, z.l * 0.33, 3, { jours: 3 }).svg,
        renvois: z => {
          const n = nid(z.l / 2, z.h * 0.72, z.l * 0.33, 3, { jours: 3 });
          const j = n.jours[0];
          return [
            { n: 7, rond: [16, z.h - 14], cible: j, texte: 'effilocher jusqu’à voir le jour au travers' },
            { n: 8, rond: [z.l - 16, 16], cible: [n.poudre[0] + 2, n.poudre[1] - 4], texte: 'mettre la poudre au fond du creux' },
          ];
        },
      },
      // ── 4. L'étincelle (étape 15) ──────────────────────────────────────────────────────────────────────
      etincelle: {
        titre: 'Tirer la tige, le couteau immobile',
        dessin: z => {
          const g = etincelle(z), { e, n, u, T, C, K } = g, out = [n.svg];
          // la gerbe : des traits qui partent du point de contact et tombent dans le creux
          const cible = n.poudre;
          let gerbe = '', grains = '';
          for (let i = 0; i < 9; i++) {
            const k = (i - 4) / 4, a = Math.atan2(cible[1] - C[1], cible[0] - C[0]) + deg(k * 16);
            const L = lon(sub(cible, C)) * (0.92 + 0.1 * Math.cos(i * 2.1));
            const p0 = add(C, mul([Math.cos(a), Math.sin(a)], 7)), p1 = add(C, mul([Math.cos(a), Math.sin(a)], L * 0.55));
            const p2 = add(C, mul([Math.cos(a), Math.sin(a)], L * 0.62)), p3 = add(C, mul([Math.cos(a), Math.sin(a)], L * 0.8));
            gerbe += M(p0) + Lp(p1) + M(p2) + Lp(p3) + ' ';
            const q = add(C, mul([Math.cos(a), Math.sin(a)], L));
            grains += h.cercle(q[0], q[1], 1.1, A.plein);
          }
          // la tige, puis la main gauche par-dessus son manche
          const tg = tigeDessin(T, u, e);
          out.push(tg.svg);
          const centreManche = tg.P(100 + 36, 0);
          const mT = F.mainStock({ id: 'manche-vers-bas', x: centreManche[0], y: centreManche[1], objet: false, taille: 200 * 22 * e / 17.66, angle: RHO - (-52.5) });
          // le couteau (la lame devant la tige), puis la main droite
          const kn = couteauDessin(K);
          const centreK = K(-62, 11.5);
          const ak = Math.atan2(g.kd[1], g.kd[0]) * 180 / Math.PI;
          const mK = F.mainStock({ id: 'poing-barre', x: centreK[0], y: centreK[1], objet: false, taille: 200 * 25 * e / 26.15, angle: ak + 180 - (-73.6) });
          out.push(h.path(gerbe, A.detail), grains);
          out.push(String(mT));
          out.push(kn.svg);
          out.push(String(mK));
          // le geste : la tige tirée vers soi, dans son axe, à côté du métal
          const g0 = add(tg.P(40, 0), mul(perp(u), -26)), g1 = add(tg.P(100, 0), mul(perp(u), -26));
          out.push(h.geste(`${M(g0)} L ${f(g1[0])} ${f(g1[1])}`));
          // le point à contrôler : le dos du couteau sur la tige, qui ne bouge pas
          out.push(h.controle(C[0], C[1], 9));
          return coupe('etincelle', z, out.join('\n'));
        },
        renvois: z => {
          const g = etincelle(z), { T, C, u, n } = g;
          const tg = (s, t) => add(add(T, mul(u, s * g.e)), mul(perp(u), t * g.e));
          const g1 = add(tg(70, 0), mul(perp(u), -26));
          return [
            { n: 9, rond: [16, T[1] - 4], cible: add(T, [-4, 1]), texte: 'tenir la pointe à un doigt de l’amadou' },
            { n: 10, rond: [C[0] + 60, C[1] + 34], cible: add(C, [6.4, 6.4]), texte: 'appuyer le dos du couteau, sans le bouger' },
            { n: 11, rond: [g1[0] + 28, g1[1] + 14], cible: g1, texte: 'tirer la tige vers soi, d’un coup' },
            { n: 12, rond: [z.l - 16, n.poudre[1] + 4], cible: [n.poudre[0] + 6, n.poudre[1] - 3], texte: 'la gerbe tombe dans le creux' },
          ];
        },
      },
      // ── 5. Flamber (étape 16) ──────────────────────────────────────────────────────────────────────────
      souffler: {
        titre: 'Refermer et souffler',
        dessin: z => {
          const s = souffler(z), { B, r, tete, L0, e } = s, out = [String(tete)];
          // la boule, posée dans la main, la paume en l'air ; l'avant-bras descend vers le corps
          out.push(boule(B, r, 5));
          const mB = F.mainStock({ id: 'paume-en-lair', x: B[0] - r * 0.1, y: B[1] + r * 0.95, ancre: [0.62, 0.55], taille: 190 * e * 1.15, angle: -24 });
          out.push(String(mB));
          // le souffle, de la bouche à la boule
          out.push(h.fleche(`M ${f(L0[0] + 8)} ${f(L0[1] - 2)} L ${f(B[0] - r - 6)} ${f(B[1] - 4)}`, A.cache));
          out.push(h.fleche(`M ${f(L0[0] + 8)} ${f(L0[1] + 5)} L ${f(B[0] - r - 6)} ${f(B[1] + 4)}`, A.cache));
          // la fumée : un filet mince au ras de la boule, qui s'épaissit en montant, de l'autre côté du visage
          const fil = (k, t0, ph) => { const pts = []; for (let i = 0; i <= 14; i++) { const t = t0 + (1 - t0) * i / 14; pts.push([B[0] + r * 0.6 + 16 * t + 18 * t * t + k * 9 * t * t + (1 + 3 * t) * Math.sin(t * 9 + ph), B[1] - r * 0.85 - (B[1] - r - 16) * t]); } return lisse(pts); };
          out.push(h.path(fil(0, 0, 0), A.detail), h.path(fil(-1.2, 0.3, 1.4) + ' ' + fil(1.1, 0.35, 2.6), A.detail));
          return coupe('souffler', z, out.join('\n'));
        },
        renvois: z => {
          const s = souffler(z), { B, r, L0 } = s;
          const mx = (L0[0] + B[0] - r) / 2;
          return [
            { n: 13, rond: [B[0] - 8, 16], cible: [B[0] - r * 0.3, B[1] - r * 0.96], texte: 'refermer le nid en boule, sans serrer' },
            { n: 14, rond: [B[0] + r + 22, B[1] + r + 16], cible: [B[0] + r * 0.5, B[1] + r * 1.05], texte: 'le tenir par le dessous, à un avant-bras' },
            { n: 15, rond: [mx, L0[1] - 36], cible: [mx, L0[1] - 3], texte: 'souffler en continu, sans à-coups' },
            { n: 16, rond: [z.l - 14, 40], cible: [B[0] + r * 0.6 + 16 * 0.6 + 18 * 0.36 + 0.5, B[1] - r * 0.85 - (B[1] - r - 16) * 0.6], texte: 'la fumée passe de mince à épaisse' },
          ];
        },
      },
      // ── 6. Glisser (étape 17) ──────────────────────────────────────────────────────────────────────────
      glisser: {
        titre: 'Glisser le nid sous le tipi',
        dessin: z => {
          const g = vueGlisser(z), out = [];
          const t0 = tipi(g.c, g.R, g.H, 29);
          const nc = P3(g.c, Math.cos(t0.om) * g.R * 0.25, Math.sin(t0.om) * g.R * 0.25, 0);
          const nN = nid(nc[0], nc[1], 22, 17, { jours: 0, poudre: false, theta: 22, fibres: 0.5 });
          const dedans = [flammes(nc[0], nN.haut[1] + 6, 40, g.H * 0.5), nN.svg].join('\n');
          const t = tipi(g.c, g.R, g.H, 29, { dedans });
          out.push(t.svg);
          const a = P3(g.c, Math.cos(t.om) * g.R * 2.4, Math.sin(t.om) * g.R * 2.4, 4), b = P3(g.c, Math.cos(t.om) * g.R * 1.05, Math.sin(t.om) * g.R * 1.05, 4);
          out.push(h.geste(`${M(a)} L ${f(b[0])} ${f(b[1])}`));
          // le bois de 2 à 5 cm, prêt à côté
          const r3 = 9, b3 = [g.c[0] + g.R * 1.45, g.c[1] + 8];
          out.push(quartier(b3, r3, 180, 270, 34), quartier([b3[0] + r3 * 1.35, b3[1]], r3, 270, 360, 34), quartier([b3[0] + r3 * 0.68, b3[1] - r3 * 0.98], r3, 210, 310, 34));
          return out.join('\n');
        },
        renvois: z => {
          const g = vueGlisser(z), t = tipi(g.c, g.R, g.H, 29);
          const a = P3(g.c, Math.cos(t.om) * g.R * 1.8, Math.sin(t.om) * g.R * 1.8, 4);
          const b3 = [g.c[0] + g.R * 1.45, g.c[1] + 8];
          return [
            { n: 17, rond: [16, a[1] - 30], cible: [a[0], a[1] - 1.5], texte: 'glisser le nid par l’ouverture' },
            { n: 18, rond: [z.l - 16, g.c[1] - g.H * 0.5], cible: [b3[0] + 9 * 0.68 + 4, b3[1] - 9 * 0.98 - 8], texte: 'ajouter le bois de 2 à 5 cm quand le fin crépite' },
          ];
        },
      },
    },
  };
};
