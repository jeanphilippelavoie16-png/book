// Planche 13-40. Le ferrocérium, du tri du bois à la flamme. Refaite depuis zéro le 19 octobre 2026 (règle 12 :
// planche signalée, « Tabarnak, ouff », puis « les mains, l'amadou, le tipi, c'est laid en câlisse » ; pause du
// 15 octobre, point 23 ; la flèche 9 signalée au plan de match). Rien n'est repris de l'ancienne version.
//
// Six vues, dans l'ordre des gestes du chapitre 13 (étapes 10, 13, 14, 15, 16, 17) ; les repères 1 à 18 sont ceux du
// texte, dans le même ordre :
//   trier les quatre tas (1 à 4, étape 10) ; monter le tipi (5 et 6, étape 13) ; faire le nid (7 et 8, étape 14) ;
//   faire l'étincelle (9 à 12, étape 15) ; flamber (13 à 16, étape 16) ; glisser (17 et 18, étape 17).
//
// Les mains : h.formes.mainStock seulement (brief-agent.md), aucune main dessinée, aucune main déformée ; l'avant-bras
// est prolongé jusqu'au bord de la vue par deux traits qui continuent ses bords (comme 04-41).
//   la tige       2-07 « manche-vers-bas » (le poing vu de dos, l'avant-bras qui monte), objet: false : la tige de la
//                 planche est posée dessous, sur l'axe de la prise (le manche dans le poing, le métal qui sort sous le
//                 pouce et descend vers le nid) ;
//   le couteau    2-13 « poing-cylindre » (le poing serré sur un manche court qui sort du côté du pouce), tourné pour
//                 que l'avant-bras monte et que le manche pointe vers la tige ; son cylindre est le manche du couteau,
//                 la planche ajoute la garde et la lame ;
//   la boule      8-01 « paume-en-lair », en miroir (la main de côté, la paume en l'air, le pouce du côté du visage) :
//                 la boule posée dans le creux de la main ; l'avant-bras descend, coupé par le bas de la vue.
// La tête : h.formes.teteSimple, de profil, la bouche entrouverte (elle souffle : le visage fait le geste), sans
// cheveux ; le cou coupé par le bas de la vue.
//
// Ce que le texte donne et que la planche montre, sans cote (aucune mesure de fabrication) : les quatre grosseurs
// (moins de 2 cm, 2 à 5 cm, moins de 15 cm), dans la légende ; « à un doigt de l'amadou » (la pointe au-dessus du
// creux, du vide entre les deux) ; « presque d'équerre » (le couteau en travers de la tige) ; « à une longueur
// d'avant-bras » (la boule devant la bouche).
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
  const clip = (id, d) => `<clipPath id="${id}"><path d="${d}" fill="#FFFFFF" stroke="none"/></clipPath>`;

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
  const coupe = (id, z, svg) => `<clipPath id="vue-${id}-1340"><rect x="0" y="0" width="${z.l}" height="${z.h}" fill="#FFFFFF" stroke="none"/></clipPath>\n<g clip-path="url(#vue-${id}-1340)">\n${svg}\n</g>`;
  // un brin qui dépasse d'un contour : part un peu en dedans, sort et se courbe
  const brin = (p, o, l, s) => { const t = perp(o); return `${M(add(p, mul(o, -l * 0.3)))} Q ${f(p[0] + o[0] * l * 0.5 + t[0] * l * s * 0.5)} ${f(p[1] + o[1] * l * 0.5 + t[1] * l * s * 0.5)} ${f(p[0] + o[0] * l + t[0] * l * s)} ${f(p[1] + o[1] * l + t[1] * l * s)} `; };

  // Prolonger l'avant-bras d'une main de la bibliothèque jusqu'au bord de la vue (comme 04-41) : deux traits qui
  // continuent ses bords depuis la coupe, et un fond blanc qui couvre la coupe. La main n'est ni déformée ni
  // redessinée. coupeFichier : les deux bouts de la coupe, relevés sur le dessin de la main (le catalogue ne la
  // donne pas juste pour toutes) ; o : les mêmes options que pour mainStock.
  const CAT = require('../../.claude/skills/planches/scripts/mains/stock.js').catalogue;
  const IDS = { 'manche-vers-bas': '2-07', 'paume-en-lair': '8-01', 'poing-cylindre': '2-13' };
  // les deux bouts de la coupe de l'avant-bras et, pour chacun, la direction du bord qui y arrive (dans le fichier)
  const COUPES = {
    '2-07': [[[3102, 842], [6, -21]], [[2945, 819], [1, -12]]],
    '8-01': [[[299, 5772], [3, 31]], [[150, 5777], [0, 1]]],
    '2-13': [[[5869, 1392], [5, 43]], [[5688, 1401], [-14, 261]]],
  };
  const versVue = o => {
    const Mc = CAT[IDS[o.id] || o.id], [bx0, by0, bx1, by1] = Mc.boite, W = bx1 - bx0, H = by1 - by0;
    const k = o.echelle || (o.taille || 120) / Math.max(W, H), sx = o.miroir ? -1 : 1;
    const an = o.ancre || (Mc.objet ? 'objet' : 'centre');
    const A0 = Array.isArray(an) ? [bx0 + an[0] * W, by0 + an[1] * H] : an === 'objet' ? [Mc.objet.x, Mc.objet.y] : [(bx0 + bx1) / 2, (by0 + by1) / 2];
    const c = Math.cos(deg(o.angle || 0)), s = Math.sin(deg(o.angle || 0));
    return ([px, py]) => { const u = sx * k * (px - A0[0]), v = k * (py - A0[1]); return [o.x + c * u - s * v, o.y + s * u + c * v]; };
  };
  const main = (o, L = 400) => {
    const m = F.mainStock(o), T = versVue(o);
    const [[q1, d1], [q2, d2]] = COUPES[IDS[o.id] || o.id];
    const p1 = T(q1), p2 = T(q2), u1 = unit(sub(T(add(q1, mul(d1, 10))), p1)), u2 = unit(sub(T(add(q2, mul(d2, 10))), p2));
    // le fond blanc part un peu en dedans de la coupe (il la couvre), les bords continuent ceux de la main
    const a1 = add(p1, mul(u1, -3)), a2 = add(p2, mul(u2, -3)), b1 = add(p1, mul(u1, L)), b2 = add(p2, mul(u2, L));
    const trait = 'fill="none" stroke="#1A1A1A" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"';
    return { m, svg: [String(m), h.path(poly([a1, b1, b2, a2]), A.blanc), h.path(M(a1) + Lp(b1) + ' ' + M(a2) + Lp(b2), trait)].join('\n') };
  };

  // ═══ Le bois ═══════════════════════════════════════════════════════════════════════════════════════

  // Un bâton de bois : un peu courbe, qui s'amincit, les bouts coupés en biais.
  const baton = (a, b, ra, rb, graine) => {
    const g = gen(graine), L = lon(sub(b, a)), u = unit(sub(b, a)), v = perp(u);
    const pli = (g() - 0.5) * 0.05 * L, ctl = add(mul(add(a, b), 0.5), mul(v, pli));
    const axe = t => add(add(mul(a, (1 - t) ** 2), mul(ctl, 2 * t * (1 - t))), mul(b, t * t));
    const g1 = [], g2 = [], n = 12;
    for (let i = 0; i <= n; i++) { const t = i / n, w = ra + (rb - ra) * t, p = axe(t); g1.push(add(p, mul(v, w))); g2.push(add(p, mul(v, -w))); }
    // les coupes en biais : un côté dépasse un peu l'autre
    const cb = (g() - 0.5) * 1.2, ca = (g() - 0.5) * 1.2;
    g1[n] = add(g1[n], mul(u, cb * rb)); g2[n] = add(g2[n], mul(u, -cb * rb));
    g1[0] = add(g1[0], mul(u, ca * ra)); g2[0] = add(g2[0], mul(u, -ca * ra));
    return poly([...g1, ...g2.reverse()]);
  };

  // Les tas, en perspective cavalière : chaque morceau montre son bout coupé, le corps fuit vers le haut à droite.
  const FUITE = dir(-30);
  // un rondin vu par le bout : le bout (un cercle et ses cernes), le corps qui fuit sur une longueur L ; la face de
  // dessous du corps à l'ombre (la lumière vient d'en haut à gauche)
  const rondin = (c, r, L, cernes = 0, graine = 1) => {
    const g = gen(graine), d = mul(FUITE, L), v = perp(FUITE);
    const out = [h.path(poly([add(c, mul(v, r)), add(add(c, d), mul(v, r)), add(add(c, d), mul(v, -r)), add(c, mul(v, -r))]), remplir(A.arete, BLANC))];
    out.push(h.path(poly([add(c, mul(v, r)), add(add(c, d), mul(v, r)), add(add(c, d), mul(v, r * 0.45)), add(c, mul(v, r * 0.45))]), A.ombre));
    out.push(h.path(M(add(c, mul(v, r))) + Lp(add(add(c, d), mul(v, r))) + M(add(c, mul(v, -r))) + Lp(add(add(c, d), mul(v, -r))), A.arete));
    out.push(h.cercle(c[0], c[1], r, remplir(A.arete, BLANC)));
    for (let k = 1; k <= cernes; k++) {
      const rr = r * (1 - k / (cernes + 1)), a0 = g() * 360, a1 = a0 + 230 + g() * 80;
      const pts = []; for (let i = 0; i <= 16; i++) { const a = deg(a0 + (a1 - a0) * i / 16); pts.push([c[0] + rr * Math.cos(a), c[1] + rr * Math.sin(a)]); }
      out.push(h.path(lisse(pts), A.fin));
    }
    if (cernes) out.push(h.cercle(c[0], c[1], Math.max(0.9, r * 0.07), A.plein));
    return out.join('\n');
  };
  // Le tipi : des bâtons dressés en cône lâche autour d'un point, une ouverture du côté du vent.
  // Repère au sol : x à droite, y vers nous, z en haut ; vu d'un peu au-dessus (TH).
  const TH = 22, sTH = Math.sin(deg(TH)), cTH = Math.cos(deg(TH));
  const P3 = (c, x, y, z) => [c[0] + x, c[1] + y * sTH - z * cTH];
  const OUV = [96, 176];                           // l'ouverture : devant à gauche (angles au sol, y vers nous)
  const tipi = (c, R, H, graine, { dedans = '', n = 14, ep = 2.2, sol = 1.6 } = {}) => {
    const g = gen(graine), out = [];
    out.push(h.ellipse(c[0], c[1], R * sol, R * sol * sTH, A.loin));
    const libre = 360 - (OUV[1] - OUV[0]);
    const batons = [];
    for (let i = 0; i < n; i++) {
      const a = OUV[1] + libre * (i + 0.5 + (g() - 0.5) * 0.45) / n;
      const rr = R * (0.88 + g() * 0.22);
      const pied = [rr * Math.cos(deg(a)), rr * Math.sin(deg(a)), 0];
      const som = [(g() - 0.5) * R * 0.1, (g() - 0.5) * R * 0.1, H];
      const k = 1.07 + g() * 0.08;
      const haut = [pied[0] + (som[0] - pied[0]) * k, pied[1] + (som[1] - pied[1]) * k, pied[2] + (som[2] - pied[2]) * k];
      batons.push({ a, y: pied[1], pied, haut, r: ep * (0.85 + g() * 0.35), graine: graine * 31 + i * 7 });
    }
    batons.sort((p, q) => p.y - q.y);
    const dessine = b => {
      const p = P3(c, ...b.pied), q = P3(c, ...b.haut);
      const loin = b.y < -R * 0.2;
      return h.path(baton(p, q, b.r, b.r * 0.55, b.graine), remplir(loin ? A.detail : A.arete, loin ? GRIS : BLANC));
    };
    batons.filter(b => b.y < 0).forEach(b => out.push(dessine(b)));
    out.push(dedans);
    batons.filter(b => b.y >= 0).forEach(b => out.push(dessine(b)));
    const om = deg((OUV[0] + OUV[1]) / 2);
    return {
      svg: out.join('\n'),
      // le milieu de l'ouverture, à la hauteur z (k : la distance au centre, en rayons du pied)
      ouv: (z, k = 1) => P3(c, Math.cos(om) * R * k * (1 - z / H), Math.sin(om) * R * k * (1 - z / H), z),
      om, batons,
    };
  };

  // ═══ L'amadou ══════════════════════════════════════════════════════════════════════════════════════

  // Le nid : une poignée de fibres effilochées, creusée au milieu, vue d'un peu au-dessus (theta). Un bol au fond
  // arrondi, un peu bosselé ; le creux est dans l'ombre (gris pâle) ; les fibres sont de longs traits souples qui se
  // croisent en biais sur la paroi et passent par-dessus le bord ; quelques bouts dépassent ; dans la paroi, des jours
  // où l'on voit au travers. Au fond du creux, la poudre. (cx, yS) : le point du sol sous le centre ; R : le rayon au bord.
  let nNid = 0;
  const nid = (cx, yS, R, graine, { theta = 38, jours = 3, poudre = true, fibres = 1 } = {}) => {
    const g = gen(graine), id = `nid-${++nNid}-1340`, out = [];
    const st = Math.sin(deg(theta)), ct = Math.cos(deg(theta));
    const Hb = R * 0.64, Ri = R * 0.6, zf = Hb * 0.5, Rf = R * 0.3;
    const pr = (x, y, z) => [cx + x, yS + y * st - z * ct];
    const ph = graine * 1.7;
    const bosse = (a, amp = 1) => 1 + amp * (0.04 * Math.sin(3 * a + ph) + 0.025 * Math.sin(7 * a + 2 * ph) + 0.012 * Math.sin(13 * a + ph));
    // le rayon de la paroi à la hauteur t = z / Hb : le fond arrondi, le plus large un peu sous le bord
    const prof = t => t <= 0.85 ? R * (0.5 + 0.52 * Math.sqrt(Math.max(0, 1 - (1 - t / 0.85) ** 2))) : R * (1.02 - 0.02 * ((t - 0.85) / 0.15) ** 2);
    const anneau = (rad, z, a0, a1, nb = 48, amp = 1) => {
      const o = []; for (let i = 0; i <= nb; i++) { const a = a0 + (a1 - a0) * i / nb, rr = rad * bosse(a, amp); o.push(pr(rr * Math.cos(a), rr * Math.sin(a), z)); }
      return o;
    };
    // la silhouette : l'enveloppe des tours de la paroi, colonne par colonne, puis bosselée
    const niveaux = []; for (let k = 0; k <= 30; k++) { const t = k / 30; niveaux.push([prof(t), Hb * t]); }
    const haut = [], bas = [];
    for (let k = 0; k <= 90; k++) {
      const x = -1.02 * R + 2.04 * R * k / 90; let y0 = 1e9, y1 = -1e9;
      niveaux.forEach(([rad, z]) => { if (Math.abs(x) > rad) return; const e = rad * st * Math.sqrt(1 - (x / rad) ** 2), c = yS - z * ct; y0 = Math.min(y0, c - e); y1 = Math.max(y1, c + e); });
      if (y0 < 1e8) { haut.push([cx + x, y0]); bas.push([cx + x, y1]); }
    }
    const c0 = pr(0, 0, Hb * 0.55);
    const sil = [...haut, ...bas.reverse()].map(p => { const o = sub(p, c0), a = Math.atan2(o[1] / st, o[0]); return add(c0, mul(o, bosse(a))); });
    const silD = lisse(sil.filter((p, i) => i % 2 === 0), true);
    const ouv = anneau(Ri, Hb, 0, 2 * Math.PI, 40, 0.8).slice(0, -1), ouvD = lisse(ouv, true);
    out.push(`<defs>${clip(id + '-sil', silD)}${clip(id + '-ouv', ouvD)}</defs>`);
    out.push(h.path(silD, A.blanc));
    // une fibre : un arc qui fait le tour en montant ou en descendant (elle croise les autres en biais)
    const fibre = (rf, z0, z1, a0, a1, nb = 22) => {
      const o = [];
      for (let i = 0; i <= nb; i++) {
        const t = i / nb, a = a0 + (a1 - a0) * t, z = z0 + (z1 - z0) * t;
        const rad = rf(z) * bosse(a);
        o.push(pr(rad * Math.cos(a), rad * Math.sin(a), z + Math.sin(t * Math.PI) * Hb * 0.03));
      }
      return lisse(o);
    };
    // le creux : dans l'ombre (gris pâle), quelques fibres sur la paroi de derrière, la poudre au fond
    out.push(h.path(ouvD, A.loin));
    out.push(`<g clip-path="url(#${id}-ouv)">`);
    const rI = z => Rf + (Ri - Rf) * Math.max(0, (z - zf) / (Hb - zf)) ** 0.6;
    let creux = '';
    for (let i = 0; i < Math.round(8 * fibres); i++) {
      const z0 = zf + (Hb - zf) * (0.25 + g() * 0.7), z1 = zf + (Hb - zf) * (0.2 + g() * 0.7);
      const a0 = Math.PI * (1.05 + g() * 0.5), a1 = a0 + Math.PI * (0.3 + g() * 0.3);
      creux += fibre(rI, z0, z1, a0, a1) + ' ';
    }
    out.push(h.path(creux, A.fin));
    // le fond : un disque plus clair, où la gerbe doit tomber
    out.push(h.path(lisse(anneau(Rf * 1.05, zf, 0, 2 * Math.PI, 24, 0.5).slice(0, -1), true), A.blanc));
    if (poudre) {
      const p0 = pr(0, 0, zf), rx = Rf * 0.62, ht = Rf * 0.38;
      out.push(h.path(`${M([p0[0] - rx, p0[1]])} C ${f(p0[0] - rx * 0.5)} ${f(p0[1] - ht * 0.3)} ${f(p0[0] - rx * 0.35)} ${f(p0[1] - ht)} ${f(p0[0])} ${f(p0[1] - ht)} C ${f(p0[0] + rx * 0.35)} ${f(p0[1] - ht)} ${f(p0[0] + rx * 0.5)} ${f(p0[1] - ht * 0.3)} ${f(p0[0] + rx)} ${f(p0[1])} C ${f(p0[0] + rx * 0.5)} ${f(p0[1] + rx * st * 0.6)} ${f(p0[0] - rx * 0.5)} ${f(p0[1] + rx * st * 0.6)} ${f(p0[0] - rx)} ${f(p0[1])} Z`, remplir(A.detail, BLANC)));
      let gr = '';
      for (let i = 0; i < 22; i++) { const xx = g() * 2 - 1, yy = g(); gr += h.cercle(p0[0] + xx * rx * 0.75, p0[1] - yy * (1 - Math.abs(xx)) * ht * 0.8, 0.45, A.plein); }
      out.push(gr);
    }
    out.push('</g>');
    // la paroi de devant : des fibres en biais, dans un sens puis dans l'autre ; le bord : des fibres qui passent par-dessus
    let paroi = '', paroi2 = '', bord = '';
    for (let i = 0; i < Math.round(30 * fibres); i++) {
      const sens = i % 2 ? 1 : -1, t0 = 0.05 + g() * 0.9, t1 = Math.max(0.02, Math.min(0.99, t0 + sens * (0.25 + g() * 0.35)));
      const a0 = -0.15 + g() * Math.PI * 0.8, a1 = a0 + Math.PI * (0.22 + g() * 0.3);
      const d = fibre(z => prof(z / Hb) * 1.004, Hb * t0, Hb * t1, a0, a1) + ' ';
      if (g() < 0.22) paroi2 += d; else paroi += d;
    }
    for (let i = 0; i < Math.round(16 * fibres); i++) {
      const a0 = g() * 2 * Math.PI, a1 = a0 + Math.PI * (0.18 + g() * 0.3) * (g() < 0.5 ? 1 : -1);
      const r0 = Ri + (R - Ri) * (0.1 + g() * 0.8), r1 = Ri + (R - Ri) * (0.1 + g() * 0.8);
      bord += fibre(z => r0 + (r1 - r0) * 0.5, Hb, Hb, a0, a1).replace(/^M/, 'M') + ' ';
    }
    out.push(`<g clip-path="url(#${id}-sil)">`);
    out.push(h.path(paroi, A.fin), h.path(paroi2, A.detail));
    // les jours : un vide entre quatre brins qui se croisent (deux dans chaque sens), où l'on voit au travers (gris)
    const lesJours = [];
    for (let i = 0; i < jours; i++) {
      const a = Math.PI * (0.3 + 0.4 * (jours > 1 ? i / (jours - 1) : 0.5) + (g() - 0.5) * 0.05), t = 0.78 + g() * 0.06;
      const q = pr(prof(t) * Math.cos(a), prof(t) * Math.sin(a), Hb * t), kx = 0.55 + 0.45 * Math.sin(a);
      const w = R * 0.1 * kx, hh = R * 0.055;
      // les deux familles de brins : en biais montant et en biais descendant
      const d1 = unit([1, -0.42]), d2 = unit([1, 0.5]);
      const coin = (s1, s2) => { // l'intersection des brins décalés de s1 (famille 1) et s2 (famille 2)
        const n1 = perp(d1), n2 = perp(d2), p1 = add(q, mul(n1, s1)), p2 = add(q, mul(n2, s2));
        const det = d1[0] * (-d2[1]) - d1[1] * (-d2[0]), tt = ((p2[0] - p1[0]) * (-d2[1]) - (p2[1] - p1[1]) * (-d2[0])) / det;
        return add(p1, mul(d1, tt)); };
      const e1 = hh * 0.9, e2 = hh * 0.9;
      const k = [coin(-e1, -e2), coin(-e1, e2), coin(e1, e2), coin(e1, -e2)];
      out.push(h.path(poly(k), A.loin));
      let br = '';
      [-e1, e1].forEach(o1 => { const c = add(q, mul(perp(d1), o1)); br += M(add(c, mul(d1, -w * 1.7))) + Lp(add(c, mul(d1, w * 1.7))) + ' '; });
      [-e2, e2].forEach(o2 => { const c = add(q, mul(perp(d2), o2)); br += M(add(c, mul(d2, -w * 1.7))) + Lp(add(c, mul(d2, w * 1.7))) + ' '; });
      out.push(h.path(br, A.fin));
      lesJours.push(q);
    }
    out.push('</g>');
    out.push(h.path(bord, A.fin));
    out.push(h.path(ouvD, A.detail));
    // les bouts de fibres qui dépassent du contour
    let bouts = '';
    const hauts = sil.filter(p => p[1] < c0[1] + R * 0.12);
    for (let i = 0; i < 11; i++) {
      const p = hauts[Math.floor(g() * hauts.length)], o = unit(sub(p, c0));
      bouts += brin(p, o, R * (0.08 + g() * 0.1), (g() - 0.5) * 1.8);
    }
    out.push(h.path(bouts, A.fin));
    out.push(h.path(silD, A.arete));
    return { svg: out.join('\n'), poudre: pr(0, 0, zf), Rf, Hb, R, jours: lesJours, haut: pr(0, -R, Hb), devant: pr(0, R * 0.98, Hb * 0.5), pr };
  };

  // La boule : le nid refermé, une pelote de fibres : un contour bosselé, des fibres en grands arcs qui l'enroulent.
  const boule = (c, r, graine, ky = 1, nf = 15, nb = 7) => {
    const g = gen(graine), out = [], id = `boule-${graine}-1340`;
    const cont = []; for (let i = 0; i < 28; i++) { const a = i / 28 * 2 * Math.PI, k = 1 + 0.05 * Math.sin(3 * a + graine) + 0.03 * Math.sin(8 * a); cont.push([c[0] + r * k * Math.cos(a), c[1] + r * ky * k * Math.sin(a)]); }
    const cD = lisse(cont, true);
    out.push(`<defs>${clip(id, cD)}</defs>`);
    out.push(h.path(cD, A.blanc));
    let fib = '';
    for (let i = 0; i < nf; i++) {
      // un grand cercle de la boule, incliné au hasard ; on garde ce qui regarde vers nous
      const inc = g() * Math.PI, rot = g() * Math.PI, pts = [];
      const a0 = g() * Math.PI, a1 = a0 + Math.PI * (0.4 + g() * 0.4);
      for (let k = 0; k <= 16; k++) {
        const a = a0 + (a1 - a0) * k / 16, x = Math.cos(a), y = Math.sin(a) * Math.cos(inc), zz = Math.sin(a) * Math.sin(inc);
        if (zz < -0.05) continue;
        pts.push([c[0] + r * 0.95 * (x * Math.cos(rot) - y * Math.sin(rot)), c[1] + r * ky * 0.95 * (x * Math.sin(rot) + y * Math.cos(rot))]);
      }
      if (pts.length > 3) fib += lisse(pts) + ' ';
    }
    out.push(`<g clip-path="url(#${id})">${h.path(fib, A.fin)}</g>`);
    let bouts = '';
    for (let i = 0; i < nb; i++) { const a = ky < 1 ? Math.PI * (1.1 + g() * 0.8) : g() * 2 * Math.PI, o = [Math.cos(a), Math.sin(a)]; bouts += brin(add(c, [r * o[0], r * ky * o[1]]), o, r * (0.18 + g() * 0.15), (g() - 0.5) * 1.5); }
    out.push(h.path(bouts, A.fin));
    out.push(h.path(cD, A.arete));
    return out.join('\n');
  };

  // un rouleau d'écorce de bouleau : un cylindre court, le bout en spirale
  const rouleau = (c, r, L) => {
    const d = mul(FUITE, L), v = perp(FUITE), out = [];
    out.push(h.path(poly([add(c, mul(v, r)), add(add(c, d), mul(v, r)), add(add(c, d), mul(v, -r)), add(c, mul(v, -r))]), remplir(A.arete, BLANC)));
    out.push(h.path(lisse((() => { const o = []; for (let i = 0; i <= 12; i++) { const a = -Math.PI / 2 + Math.PI * i / 12; o.push(add(add(c, d), add(mul(v, -r * Math.sin(a) * -1), mul(FUITE, r * 0.45 * Math.cos(a))))); } return o; })()), A.detail));
    out.push(h.cercle(c[0], c[1], r, remplir(A.arete, BLANC)));
    const sp = []; for (let i = 0; i <= 30; i++) { const t = i / 30, a = t * 4 * Math.PI, rr = r * (0.9 - 0.72 * t); sp.push([c[0] + rr * Math.cos(a), c[1] + rr * Math.sin(a)]); }
    out.push(h.path(lisse(sp), A.fin));
    [0.4, 0.7].forEach(t => { const p = add(c, mul(d, t)); out.push(h.path(M(add(p, mul(v, r * 0.3))) + Lp(add(p, mul(v, r * 0.65))), A.fin)); });   // les lenticelles
    return out.join('\n');
  };

  // Les flammes : des langues lisses, la plus haute au milieu.
  const langue = (x, yB, w, hh, pen) => {
    const P = (u, v) => `${f(x + u)} ${f(yB - v)}`;
    return `M ${P(-w / 2, 0)} C ${P(-w * 0.78, hh * 0.34)} ${P(-w * 0.06 + pen * 0.2, hh * 0.52)} ${P(-w * 0.14 + pen * 0.5, hh * 0.72)} `
      + `C ${P(-w * 0.2 + pen * 0.8, hh * 0.85)} ${P(pen * 0.9, hh * 0.94)} ${P(pen, hh)} `
      + `C ${P(pen * 0.6 + w * 0.22, hh * 0.8)} ${P(w * 0.08, hh * 0.62)} ${P(w * 0.32, hh * 0.44)} `
      + `C ${P(w * 0.58, hh * 0.28)} ${P(w * 0.64, hh * 0.1)} ${P(w / 2, 0)} Z`;
  };
  const flammes = (x, yB, W, Hf) => [
    h.path(langue(x - W * 0.26, yB, W * 0.44, Hf * 0.62, -W * 0.2), remplir(A.arete, BLANC)),
    h.path(langue(x + W * 0.27, yB, W * 0.42, Hf * 0.7, W * 0.16), remplir(A.arete, BLANC)),
    h.path(langue(x, yB, W * 0.56, Hf, W * 0.1), remplir(A.arete, BLANC)),
    h.path(langue(x + W * 0.02, yB, W * 0.24, Hf * 0.5, W * 0.04), A.detail),
  ].join('\n');

  // ═══ La tige et le couteau ═════════════════════════════════════════════════════════════════════════

  // La tige de ferrocérium, de sa pointe T le long de u : le métal (diamètre dm, longueur Lm), puis le manche
  // (diamètre dp, longueur Lmo), le trou du cordon au bout. e : unités de vue par mm. P(s, t) : le point à s mm de la
  // pointe, t mm de côté.
  const TIGE = { dm: 11, Lm: 118, dp: 22, Lmo: 108 };
  const tigeDessin = (T, u, e) => {
    const { dm, Lm, dp, Lmo } = TIGE, v = perp(u), P = (s, t) => add(add(T, mul(u, s * e)), mul(v, t * e));
    const rm = dm / 2, rp = dp / 2, out = [];
    const man = [P(Lm - 4, -rp), P(Lm + Lmo - 8, -rp)];
    for (let i = 1; i < 8; i++) { const a = -Math.PI / 2 + Math.PI * i / 8; man.push(P(Lm + Lmo - 8 + 8 * Math.cos(a), rp * Math.sin(a))); }
    man.push(P(Lm + Lmo - 8, rp), P(Lm - 4, rp));
    out.push(h.path(poly(man), remplir(A.arete, GRIS)));
    const tc = P(Lm + Lmo - 12, 0);
    out.push(h.cercle(tc[0], tc[1], 2.6 * e, remplir(A.detail, BLANC)));
    const metal = [P(Lm, -rm), P(0, -rm)];
    for (let i = 1; i < 8; i++) { const a = -Math.PI / 2 - Math.PI * i / 8; metal.push(P(rm * 0.6 * Math.cos(a), -rm * Math.sin(a) * -1)); }
    metal.push(P(0, rm), P(Lm, rm));
    out.push(h.path(poly(metal), remplir(A.arete, OMBRE)));
    out.push(h.path(M(P(4, -rm * 0.45)) + Lp(P(Lm - 2, -rm * 0.45)), 'fill="none" stroke="#FFFFFF" stroke-width="1.4" stroke-linecap="round"'));
    return { svg: out.join('\n'), P };
  };

  // Le couteau, dans son repère : s le long de la lame (de la garde vers la pointe), t vers le tranchant ; le dos est
  // la ligne t = 0, au trait fort. K(s, t) donne le point de la vue. Le manche est le cylindre de la main 2-13.
  const lameDessin = K => {
    const Q = (a, b) => `${f(K(a, b)[0])} ${f(K(a, b)[1])}`;
    const lameD = `${M(K(0, 0))}${Lp(K(56, 0))} Q ${Q(70, 0.5)} ${Q(81, 7)} Q ${Q(73, 18)} ${Q(50, 22)}${Lp(K(0, 22))} Z`;
    return [h.path(lameD, remplir(A.arete, BLANC)),
      h.path(`${M(K(2, 14.5))}${Lp(K(50, 14.5))} Q ${Q(68, 14)} ${Q(79, 8.5)}`, A.fin),          // le biseau
      h.path(M(K(0, 0)) + Lp(K(58, 0)), A.contour)].join('\n');                                   // le dos
  };
  const gardeDessin = K => h.path(poly([K(1, -5), K(-4, -5), K(-4, 27), K(1, 27)]), remplir(A.arete, BLANC));

  // ═══ La géométrie des vues ═════════════════════════════════════════════════════════════════════════

  // Vue 1 : les quatre tas sur une ligne de sol, du plus fin au plus gros.
  const tas = z => ({ yS: z.h - 8, x1: 2, x2: z.l * 0.22, x3: z.l * 0.47, x4: z.l * 0.71 });
  const R2 = 3.4, R3 = 7, R4 = 13.5;
  // Vue 2 : le tipi seul, l'ouverture devant à gauche.
  const vueTipi = z => ({ c: [z.l * 0.58, z.h - 22], R: 50, H: Math.min(z.h - 32, 100) });
  // Vue 4 : l'étincelle. La personne est derrière le nid, face à nous ; ses deux avant-bras sortent par le haut.
  //   La tige, dans sa main gauche (à droite pour nous), descend vers le creux du nid ; la pointe s'arrête à un doigt
  //   (20 mm) au-dessus de la poudre. Le couteau, dans sa main droite, est en travers de la tige, presque d'équerre ;
  //   le dos de la lame appuie sur le métal ; la lame passe devant la tige.
  const RHO = -58;                                  // l'axe de la tige, de la pointe vers le manche
  const etincelle = z => {
    const e = 0.74;
    const n = nid(z.l * 0.42, z.h - 6, 50, 4, { jours: 2, theta: 40, fibres: 0.8 });
    const u = dir(RHO);
    const T = add(n.poudre, [2, -(n.Rf * 0.36) - 20 * e]);      // la pointe : un doigt au-dessus du tas de poudre
    const C = add(T, mul(u, 52 * e));               // le dos du couteau sur la tige, près du poing
    // la main de la tige : le centre de la prise à 165 mm de la pointe (le poing couvre de 45 mm dessous à 57 mm dessus)
    const oT = add(T, mul(u, 165 * e));
    const tT = 200 * TIGE.dp * e / 17.66;
    // le couteau : en travers de la tige, presque d'équerre ; le dos touche la tige à 34 mm de la garde
    const ak = RHO + 92, kd = dir(ak);
    let nk = perp(kd); if (nk[0] * u[0] + nk[1] * u[1] < 0) nk = mul(nk, -1);
    const sc = 34, ta = 9;                                      // ta : l'axe du manche, au-dessus du dos
    const K = (s, t) => add(C, add(mul(kd, (s - sc) * e), mul(nk, t * e)));
    const tK = 30 * e * 563 / 88.7, LK = 184.8 * tK / 563;     // la main 2-13 : le cylindre fait 30 mm
    const F = K(-2, ta);                                        // le bout libre du cylindre, sous la garde
    const oK = add(F, mul(kd, -LK / 2));
    const P = (s, t) => add(add(T, mul(u, s * e)), mul(perp(u), t * e));
    return { e, n, u, T, C, kd, ak, K, P, oT, tT, oK, tK };
  };
  // Vue 5 : la tête de profil (le visage à droite) ; la boule à une longueur d'avant-bras devant la bouche, posée dans
  // le creux de la main, la paume en l'air.
  const souffler = z => {
    const e = 0.42;
    const tete = F.teteSimple({ x: 50, y: z.h - 62, echelle: e, bouche: 'ouverte', ouverture: 0.3, cou: 300, sourcil: false });
    const L0 = tete.bouche, r = 44 * e;
    const B = [L0[0] + 290 * e, L0[1] - 8];
    return { e, tete, L0, r, B, am: 14 };
  };
  // la fumée : k = 0 le filet du milieu, -1 et 1 ceux qui s'en écartent ; elle part du haut de la boule, du côté loin du
  // visage, et monte en s'ouvrant
  const fumee = (s, k) => {
    const { B, r } = s, x0 = B[0] + r * 0.45, y0 = B[1] - r * 0.95, Ht = y0 - 6, t0 = k ? 0.3 : 0, pts = [];
    for (let i = 0; i <= 16; i++) { const t = t0 + (1 - t0) * i / 16; pts.push([x0 + 12 * t + 14 * t * t + k * 12 * Math.pow(t, 1.3) + (0.8 + 3.2 * t) * Math.sin(t * 10 + k), y0 - Ht * t]); }
    return lisse(pts);
  };
  // Vue 6 : le tipi, plus grand, le nid qui flambe glissé dedans par l'ouverture.
  const vueGlisser = z => ({ c: [z.l * 0.44, z.h - 30], R: 56, H: Math.min(z.h - 50, 128) });

  return {
    ref: '13-40',
    titre: 'Le ferrocérium, du tri du bois à la flamme',
    desc: 'Six vues dans l’ordre des gestes. Les quatre tas triés sur le sol, du plus fin au plus gros : une touffe de fibres et un rouleau d’écorce de bouleau, une pile de petit bois de moins de 2 cm, une pile de branches de 2 à 5 cm, une pile de bûches de moins de 15 cm. Le tipi de petit bois sur le sol, en cône lâche, avec une ouverture du côté d’où vient le vent. Le nid : une poignée de fibres creusée au milieu, avec des jours où l’on voit au travers et un petit tas de poudre au fond du creux. L’étincelle, vue de face : la tige tenue dans le poing gauche, la pointe à un doigt au-dessus du creux ; le couteau dans le poing droit, en travers de la tige, presque d’équerre, le dos de la lame appuyé sur le métal et tenu immobile ; la tige qu’on tire vers soi ; la gerbe qui tombe dans le creux. Puis le nid refermé en boule, posé dans le creux de la main, la paume en l’air, à une longueur d’avant-bras devant la bouche ; on souffle, la fumée monte de l’autre côté. Enfin le nid en flammes glissé sous le tipi par l’ouverture, une pile de branches de 2 à 5 cm qui attend à côté.',
    format: 'pleine',
    disposition: [['tas', 'tipi'], ['nid', 'etincelle'], ['souffler', 'glisser']],
    hauteurs: [0.74, 1.58, 1.04],
    largeurs: [[1.75, 1], [0.72, 1.5], [1.12, 1]],
    vues: {
      // ── 1. Trier (étape 10) ────────────────────────────────────────────────────────────────────────────
      tas: {
        titre: 'Trier en quatre tas',
        dessin: z => {
          const t = tas(z), out = [h.ligne(0, t.yS, z.l, t.yS, A.detail)];
          // 1. l'amadou : une touffe de fibres, un rouleau d'écorce de bouleau devant
          out.push(boule([t.x1 + 30, t.yS - 15], 28, 3, 0.56, 30, 16));
          out.push(rouleau([t.x1 + 44, t.yS - 6.5], 6.5, 20));
          // 2. le bois de moins de 2 cm : une pile de baguettes, les bouts vers nous
          const b2 = [t.x2 + R2, t.yS - R2];
          [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [0.5, 1], [1.5, 1], [2.5, 1], [3.5, 1], [4.5, 1], [1, 2], [2, 2], [3, 2], [4, 2]]
            .forEach(([i, j], k) => out.push(rondin([b2[0] + i * R2 * 2.04, b2[1] - j * R2 * 1.76], R2, 40 + (k % 3) * 4, 0, k + 1)));
          // 3. le bois de 2 à 5 cm : une pile de branches plus grosses
          const b3 = [t.x3 + R3, t.yS - R3];
          [[0, 0], [1, 0], [2, 0], [3, 0], [0.5, 1], [1.5, 1], [2.5, 1], [1, 2], [2, 2]]
            .forEach(([i, j], k) => out.push(rondin([b3[0] + i * R3 * 2.04, b3[1] - j * R3 * 1.76], R3, 40 + (k % 3) * 4, 1, 30 + k)));
          // 4. les bûches de moins de 15 cm : trois en bas, deux dessus
          const b4 = [t.x4 + R4, t.yS - R4];
          [[0, 0], [2, 0], [4, 0], [1, 1], [3, 1]].forEach(([i, j], k) => out.push(rondin([b4[0] + i * R4 * 1.02, b4[1] - j * R4 * 1.72], R4, 34, 2, 10 + k)));
          return out.join('\n');
        },
        renvois: z => {
          const t = tas(z), y = 12;
          return [
            { n: 1, rond: [t.x1 + 30, y], cible: [t.x1 + 28, t.yS - 15 - 28 * 0.56 + 0.5], texte: 'l’amadou fin' },
            { n: 2, rond: [t.x2 + 28, y], cible: [t.x2 + R2 + 2 * R2 * 2.04, t.yS - R2 - 2 * R2 * 1.76 - R2 + 0.3], texte: 'le bois fin, de moins de 2 cm' },
            { n: 3, rond: [t.x3 + 26, y], cible: [t.x3 + R3 + 1.5 * R3 * 2.04, t.yS - R3 - 2 * R3 * 1.76 - R3 + 0.3], texte: 'le bois de 2 à 5 cm' },
            { n: 4, rond: [t.x4 + 34, y], cible: [t.x4 + R4 + R4 * 1.02, t.yS - R4 - R4 * 1.72 - R4 + 0.3], texte: 'les bûches de moins de 15 cm' },
          ];
        },
      },
      // ── 2. Le tipi (étape 13) ──────────────────────────────────────────────────────────────────────────
      tipi: {
        titre: 'Monter le tipi',
        dessin: z => {
          const g = vueTipi(z), t = tipi(g.c, g.R, g.H, 21, { n: 11, ep: 2.3 });
          // le vent : deux flèches qui viennent de devant à gauche et entrent par l'ouverture, au ras du sol
          const fl = zz => { const b = t.ouv(zz, 1.08), a = t.ouv(zz, 2.6); return h.fleche(`${M(a)} L ${f(b[0])} ${f(b[1])}`, A.detail); };
          return [t.svg, fl(g.H * 0.1), fl(g.H * 0.24)].join('\n');
        },
        renvois: z => {
          const g = vueTipi(z), t = tipi(g.c, g.R, g.H, 21, { n: 11, ep: 2.3 });
          const droite = t.batons.filter(b => b.y > -g.R * 0.1).sort((p, q) => q.pied[0] - p.pied[0])[0];
          const cb = P3(g.c, droite.pied[0] * 0.62, droite.pied[1] * 0.62, g.H * 0.38);
          return [
            { n: 5, rond: [z.l - 14, g.c[1] - g.H * 0.78], cible: cb, texte: 'dresser le bois fin en cône lâche' },
            { n: 6, rond: [14, g.c[1] - g.H * 0.62], cible: t.ouv(g.H * 0.42, 0.9), texte: 'laisser une ouverture du côté du vent' },
          ];
        },
      },
      // ── 3. Le nid (étape 14) ───────────────────────────────────────────────────────────────────────────
      nid: {
        titre: 'Faire le nid',
        dessin: z => nid(z.l / 2, z.h * 0.66, z.l * 0.43, 3, { jours: 3 }).svg,
        renvois: z => {
          const n = nid(z.l / 2, z.h * 0.66, z.l * 0.43, 3, { jours: 3 });
          return [
            { n: 7, rond: [16, z.h - 14], cible: n.jours[n.jours.length - 1], texte: 'effilocher jusqu’à voir le jour au travers' },
            { n: 8, rond: [z.l - 16, 16], cible: [n.poudre[0] + 2, n.poudre[1] - 5], texte: 'mettre la poudre au fond du creux' },
          ];
        },
      },
      // ── 4. L'étincelle (étape 15) ──────────────────────────────────────────────────────────────────────
      etincelle: {
        titre: 'Tirer la tige, le couteau immobile',
        dessin: z => {
          const g = etincelle(z), { e, n, u, T, C, K } = g, out = [n.svg];
          // la gerbe : des traits qui partent du dos du couteau et tombent dans le creux, autour de la poudre
          let gerbe = '', grains = '';
          const vise = add(n.poudre, [0, -2]);
          for (let i = 0; i < 9; i++) {
            const k = (i - 4) / 4, a = Math.atan2(vise[1] - C[1], vise[0] - C[0]) + deg(k * 15);
            const L = lon(sub(vise, C)) * (0.95 + 0.08 * Math.cos(i * 2.1)), o = [Math.cos(a), Math.sin(a)];
            gerbe += M(add(C, mul(o, 9))) + Lp(add(C, mul(o, L * 0.5))) + M(add(C, mul(o, L * 0.58))) + Lp(add(C, mul(o, L * 0.78))) + ' ';
            const q = add(C, mul(o, L));
            grains += h.cercle(q[0], q[1], 1, A.plein);
          }
          // la tige, puis la main gauche par-dessus son manche
          out.push(tigeDessin(T, u, e).svg);
          out.push(main({ id: 'manche-vers-bas', x: g.oT[0], y: g.oT[1], objet: false, taille: g.tT, angle: RHO + 52.5 }).svg);
          out.push(h.path(gerbe, A.detail), grains);
          // le couteau : la main droite et son manche, la lame devant la tige, la garde
          out.push(main({ id: 'poing-cylindre', x: g.oK[0], y: g.oK[1], taille: g.tK, angle: g.ak + 180 - 24.9, objetCouleur: GRIS }).svg);
          out.push(lameDessin(K), gardeDessin(K));
          // le geste : la tige tirée vers soi, dans son axe, à côté du métal
          const g0 = add(g.P(140, 0), mul(perp(u), 56)), g1 = add(g.P(196, 0), mul(perp(u), 56));
          out.push(h.geste(`${M(g0)} L ${f(g1[0])} ${f(g1[1])}`));
          // le point à contrôler : le dos du couteau sur la tige, qui ne bouge pas
          out.push(h.controle(C[0], C[1], 8));
          return coupe('etincelle', z, out.join('\n'));
        },
        renvois: z => {
          const g = etincelle(z), { T, C, u, n, P } = g;
          const g1 = add(P(160, 0), mul(perp(u), 56));
          return [
            { n: 9, rond: [16, T[1] + 2], cible: add(T, [-4, 0.5]), texte: 'tenir la pointe à un doigt de l’amadou' },
            { n: 10, rond: [C[0] + 70, C[1] + 26], cible: add(C, mul(unit([1, 0.5]), 8)), texte: 'appuyer le dos du couteau, sans le bouger' },
            { n: 11, rond: [g1[0] + 34, g1[1] + 8], cible: g1, texte: 'tirer la tige vers soi, d’un coup' },
            { n: 12, rond: [z.l - 16, Math.min(z.h - 14, n.poudre[1] - 6)], cible: [n.poudre[0] + 9, n.poudre[1] - 2], texte: 'la gerbe doit tomber dans le creux' },
          ];
        },
      },
      // ── 5. Flamber (étape 16) ──────────────────────────────────────────────────────────────────────────
      souffler: {
        titre: 'Refermer et souffler',
        dessin: z => {
          const s = souffler(z), { B, r, tete, L0, e } = s, out = [String(tete)];
          // la main, la paume en l'air, l'avant-bras qui descend vers le corps ; la boule posée dans le creux, devant
          // les doigts
          out.push(main({ id: 'paume-en-lair', x: B[0], y: B[1], ancre: [0.752, 0.31], taille: 468 * 0.59 * e, angle: s.am, miroir: true }).svg);
          out.push(boule(B, r, 5, 1, 24, 10));
          // le souffle, de la bouche à la boule
          out.push(h.fleche(`M ${f(L0[0] + 8)} ${f(L0[1] - 2)} L ${f(B[0] - r - 6)} ${f(B[1] - 4)}`, A.cache));
          out.push(h.fleche(`M ${f(L0[0] + 8)} ${f(L0[1] + 5)} L ${f(B[0] - r - 6)} ${f(B[1] + 4)}`, A.cache));
          // la fumée : un filet mince au ras de la boule, qui s'ouvre en trois et s'épaissit en montant, loin du visage
          out.push(h.path(fumee(s, 0), A.detail), h.path(fumee(s, -1) + ' ' + fumee(s, 1), A.detail));
          return coupe('souffler', z, out.join('\n'));
        },
        renvois: z => {
          const s = souffler(z), { B, r, L0 } = s;
          const mx = (L0[0] + B[0] - r) / 2;
          const Ht = B[1] - r * 0.95 - 6, t = 0.62, x0 = B[0] + r * 0.45;
          const pf = [x0 + 12 * t + 14 * t * t + 12 * Math.pow(t, 1.3) + (0.8 + 3.2 * t) * Math.sin(t * 10 + 1), B[1] - r * 0.95 - Ht * t];
          return [
            { n: 13, rond: [B[0] - r - 18, B[1] - r - 22], cible: [B[0] - r * 0.62, B[1] - r * 0.78], texte: 'refermer le nid en boule, sans serrer' },
            { n: 14, rond: [B[0] - r - 36, z.h - 14], cible: [B[0] - r * 0.7, B[1] + r * 1.25], texte: 'tenir par-dessous, à un avant-bras du visage' },
            { n: 15, rond: [mx, L0[1] - 34], cible: [mx, L0[1] - 1.5], texte: 'souffler en continu, sans à-coups' },
            { n: 16, rond: [z.l - 14, 28], cible: add(pf, [1.5, 0]), texte: 'la fumée passe de mince à épaisse' },
          ];
        },
      },
      // ── 6. Glisser (étape 17) ──────────────────────────────────────────────────────────────────────────
      glisser: {
        titre: 'Glisser le nid sous le tipi',
        dessin: z => {
          const g = vueGlisser(z), out = [];
          const om = deg((OUV[0] + OUV[1]) / 2);
          // le nid en flammes, poussé jusque sous le tipi, à l'entrée de l'ouverture
          const nc = P3(g.c, Math.cos(om) * g.R * 0.35, Math.sin(om) * g.R * 0.35, 0);
          const nN = nid(nc[0], nc[1], 19, 17, { jours: 0, poudre: false, theta: 30, fibres: 0.5 });
          const dedans = [flammes(nc[0] + 2, nN.haut[1] + 9, 40, g.H * 0.48), nN.svg].join('\n');
          const t = tipi(g.c, g.R, g.H, 29, { dedans, n: 13, ep: 2.6 });
          out.push(t.svg);
          // le geste : le nid entre par l'ouverture, au ras du sol
          const a = P3(g.c, Math.cos(om) * g.R * 2.45, Math.sin(om) * g.R * 2.45, 2), b = P3(g.c, Math.cos(om) * g.R * 1.0, Math.sin(om) * g.R * 1.0, 2);
          out.push(h.geste(`${M(a)} L ${f(b[0])} ${f(b[1])}`));
          // le bois de 2 à 5 cm, prêt à côté
          const r3 = 4.6, b3 = [g.c[0] + g.R * 1.42, g.c[1] + 8];
          [[0, 0], [1, 0], [2, 0], [3, 0], [0.5, 1], [1.5, 1], [2.5, 1], [1, 2], [2, 2]]
            .forEach(([i, j], k) => out.push(rondin([b3[0] + i * r3 * 2.04, b3[1] - j * r3 * 1.76], r3, 30 + (k % 3) * 3, 0, 50 + k)));
          return out.join('\n');
        },
        renvois: z => {
          const g = vueGlisser(z), om = deg((OUV[0] + OUV[1]) / 2);
          const a = P3(g.c, Math.cos(om) * g.R * 1.8, Math.sin(om) * g.R * 1.8, 2);
          const r3 = 4.6, b3 = [g.c[0] + g.R * 1.42, g.c[1] + 8];
          return [
            { n: 17, rond: [16, a[1] - 36], cible: [a[0], a[1] - 1.5], texte: 'glisser le nid par l’ouverture' },
            { n: 18, rond: [z.l - 16, g.c[1] - g.H * 0.5], cible: [b3[0] + 1.5 * r3 * 2.04, b3[1] - 2 * r3 * 1.76 - r3 + 0.3], texte: 'ajouter ce bois quand le bois fin crépite' },
          ];
        },
      },
    },
  };
};
