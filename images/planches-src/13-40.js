// Planche 13-40. Le ferrocérium, du tri du bois à la flamme. Refaite depuis zéro le 19 octobre 2026 (règle 12 :
// planche signalée, « Tabarnak, ouff », puis « les mains, l'amadou, le tipi, c'est laid en câlisse » ; pause du
// 15 octobre, point 23 ; la flèche 9 signalée au plan de match). Rien n'est repris de l'ancienne version.
//
// Six vues, dans l'ordre des gestes du chapitre 13 (étapes 10, 13, 14, 15, 16, 17) ; les repères 1 à 18 sont ceux du
// texte, dans le même ordre :
//   trier les quatre tas (1 à 4, étape 10) ; monter le tipi (5 et 6, étape 13) ; faire le nid (7 et 8, étape 14) ;
//   faire l'étincelle (9 à 12, étape 15) ; flamber (13 à 16, étape 16) ; glisser (17 et 18, étape 17).
//
// Les mains : h.formes.mainStock seulement (brief-agent.md), aucune main dessinée, aucune main déformée.
//   la tige       2-07 « manche-vers-bas » (le poing vu de dos, l'avant-bras qui monte), objet: false : la planche
//                 pose la tige sur l'axe de la prise (le manche dans le poing, le métal qui descend vers le nid) ;
//   le couteau    1-01 « poing-barre » (le poing serré, le pouce refermé par-dessus), tourné pour que l'avant-bras
//                 monte et que la lame sorte du côté du pouce ; objet: false, le couteau sur l'axe de la prise ;
//   la boule      8-01 « paume-en-lair » (la main de côté, la paume en l'air, les doigts relevés) : la boule posée
//                 dans le creux de la main ; l'avant-bras descend vers le corps, coupé par le bord de la vue.
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
  const IDS = { 'manche-vers-bas': '2-07', 'poing-barre': '1-01', 'paume-en-lair': '8-01' };
  // les deux bouts de la coupe de l'avant-bras et, pour chacun, la direction du bord qui y arrive (dans le fichier)
  const COUPES = {
    '2-07': [[[3102, 842], [6, -21]], [[2945, 819], [1, -12]]],
    '1-01': [[[167, 434], [-54, -2]], [[191, 596], [-53, 14]]],
    '8-01': [[[299, 5772], [3, 31]], [[150, 5777], [0, 1]]],
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
    return { m, svg: [String(m), h.path(poly([a1, b1, b2, a2]), A.blanc), h.path(M(p1) + Lp(b1) + ' ' + M(p2) + Lp(b2), trait)].join('\n') };
  };

  // ═══ Le bois ═══════════════════════════════════════════════════════════════════════════════════════

  // Un bâton : un fuseau de a (demi-largeur ra) à b (demi-largeur rb), les deux bouts coupés arrondis.
  const fuseau = (a, b, ra, rb) => {
    const u = unit(sub(b, a)), v = perp(u), pts = [], n = 8;
    pts.push(add(a, mul(v, ra)), add(b, mul(v, rb)));
    for (let i = 1; i < n; i++) { const t = Math.PI / 2 - Math.PI * i / n; pts.push(add(b, add(mul(v, rb * Math.sin(t)), mul(u, rb * Math.cos(t) * 0.55)))); }
    pts.push(add(b, mul(v, -rb)), add(a, mul(v, -ra)));
    for (let i = 1; i < n; i++) { const t = -Math.PI / 2 + Math.PI * i / n; pts.push(add(a, add(mul(v, ra * Math.sin(t)), mul(u, -ra * Math.cos(t) * 0.55)))); }
    return poly(pts);
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
  // un quartier fendu vu par le bout : un secteur du rondin (l'écorce sur l'arc), le corps qui fuit
  const quartier = (c, r, a0, a1, L) => {
    const d = mul(FUITE, L), v = perp(FUITE), proj = p => p[0] * v[0] + p[1] * v[1];
    const arc = k => { const o = []; for (let i = 0; i <= 10; i++) { const a = deg(a0 + (a1 - a0) * i / 10); o.push([c[0] + r * k * Math.cos(a), c[1] + r * k * Math.sin(a)]); } return o; };
    const bout = [c, ...arc(1)];
    const hi = bout.reduce((m, p) => proj(p) > proj(m) ? p : m), lo = bout.reduce((m, p) => proj(p) < proj(m) ? p : m);
    const out = [h.path(poly([hi, add(hi, d), add(lo, d), lo]), remplir(A.arete, BLANC))];
    out.push(h.path(poly(bout), remplir(A.arete, BLANC)));
    out.push(h.path(lisse(arc(0.82)), A.detail));                     // l'écorce
    const am = deg((a0 + a1) / 2), m = [Math.cos(am), Math.sin(am)];
    out.push(h.path(M(add(c, mul(m, r * 0.18))) + Lp(add(c, mul(m, r * 0.62))), A.fin));   // le fil du bois
    return out.join('\n');
  };

  // Le tipi : des bâtons dressés en cône lâche autour d'un point, une ouverture du côté du vent.
  // Repère au sol : x à droite, y vers nous, z en haut ; vu d'un peu au-dessus (TH).
  const TH = 22, sTH = Math.sin(deg(TH)), cTH = Math.cos(deg(TH));
  const P3 = (c, x, y, z) => [c[0] + x, c[1] + y * sTH - z * cTH];
  const OUV = [96, 176];                           // l'ouverture : devant à gauche (angles au sol, y vers nous)
  const tipi = (c, R, H, graine, { dedans = '', n = 12, ep = 2.6, sol = 1.6 } = {}) => {
    const g = gen(graine), out = [];
    out.push(h.ellipse(c[0], c[1], R * sol, R * sol * sTH, A.loin));
    const libre = 360 - (OUV[1] - OUV[0]);
    const batons = [];
    for (let i = 0; i < n; i++) {
      const a = OUV[1] + libre * (i + 0.5 + (g() - 0.5) * 0.45) / n;
      const rr = R * (0.88 + g() * 0.22);
      const pied = [rr * Math.cos(deg(a)), rr * Math.sin(deg(a)), 0];
      const som = [(g() - 0.5) * R * 0.1, (g() - 0.5) * R * 0.1, H];
      const k = 1.08 + g() * 0.14;
      const haut = [pied[0] + (som[0] - pied[0]) * k, pied[1] + (som[1] - pied[1]) * k, pied[2] + (som[2] - pied[2]) * k];
      batons.push({ a, y: pied[1], pied, haut, r: ep * (0.85 + g() * 0.35) });
    }
    batons.sort((p, q) => p.y - q.y);
    const dessine = b => {
      const p = P3(c, ...b.pied), q = P3(c, ...b.haut);
      const loin = b.y < -R * 0.2;
      return h.path(fuseau(p, q, b.r, b.r * 0.6), remplir(loin ? A.detail : A.arete, loin ? GRIS : BLANC));
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
  // arrondi et au bord épais, un peu bosselé ; les fibres sont de longs traits souples qui font le tour et se
  // croisent ; quelques bouts dépassent ; dans la paroi de devant, des jours où l'on voit au travers. Au fond du
  // creux, la poudre. (cx, yS) : le point du sol sous le centre ; R : le rayon au bord.
  let nNid = 0;
  const nid = (cx, yS, R, graine, { theta = 30, jours = 3, poudre = true, fibres = 1 } = {}) => {
    const g = gen(graine), id = `nid-${++nNid}-1340`, out = [];
    const st = Math.sin(deg(theta)), ct = Math.cos(deg(theta));
    const Hb = R * 0.6, Ri = R * 0.6, zf = Hb * 0.38, Rf = R * 0.32;
    const pr = (x, y, z) => [cx + x, yS + y * st - z * ct];
    const ph = graine * 1.7;
    const bosse = (a, amp = 1) => 1 + amp * (0.035 * Math.sin(3 * a + ph) + 0.02 * Math.sin(7 * a + 2 * ph));
    // le rayon de la paroi à la hauteur t = z / Hb : le fond arrondi, le plus large un peu sous le bord
    const prof = t => t <= 0.8 ? R * (0.3 + 0.74 * Math.sqrt(Math.max(0, 1 - (1 - t / 0.8) ** 2))) : R * (1.04 - 0.04 * ((t - 0.8) / 0.2) ** 2);
    const anneau = (rad, z, a0, a1, nb = 48, amp = 1) => {
      const o = []; for (let i = 0; i <= nb; i++) { const a = a0 + (a1 - a0) * i / nb, rr = rad * bosse(a, amp); o.push(pr(rr * Math.cos(a), rr * Math.sin(a), z)); }
      return o;
    };
    // la silhouette : l'enveloppe des tours de la paroi, colonne par colonne
    const niveaux = []; for (let k = 0; k <= 30; k++) { const t = k / 30; niveaux.push([prof(t), Hb * t]); }
    const haut = [], bas = [];
    for (let k = 0; k <= 90; k++) {
      const x = -1.04 * R + 2.08 * R * k / 90; let y0 = 1e9, y1 = -1e9;
      niveaux.forEach(([rad, z]) => { if (Math.abs(x) > rad) return; const e = rad * st * Math.sqrt(1 - (x / rad) ** 2), c = yS - z * ct; y0 = Math.min(y0, c - e); y1 = Math.max(y1, c + e); });
      if (y0 < 1e8) { haut.push([cx + x, y0]); bas.push([cx + x, y1]); }
    }
    const c0 = pr(0, 0, Hb * 0.55);
    const sil = [...haut, ...bas.reverse()].map(p => { const o = sub(p, c0), a = Math.atan2(o[1] / st, o[0]); return add(c0, mul(o, bosse(a))); });
    const silD = lisse(sil.filter((p, i) => i % 2 === 0), true);
    const ouvD = lisse(anneau(Ri, Hb, 0, 2 * Math.PI, 40, 0.8).slice(0, -1), true);
    out.push(`<defs>${clip(id + '-sil', silD)}${clip(id + '-ouv', ouvD)}</defs>`);
    out.push(h.path(silD, A.blanc));
    // une fibre : un arc qui fait le tour, à une hauteur qui glisse (elle monte ou descend en tournant)
    const fibre = (rad0, rad1, z0, z1, a0, a1, nb = 20) => {
      const o = [];
      for (let i = 0; i <= nb; i++) {
        const t = i / nb, a = a0 + (a1 - a0) * t, z = z0 + (z1 - z0) * t, rad = (rad0 + (rad1 - rad0) * t) * bosse(a);
        o.push(pr(rad * Math.cos(a), rad * Math.sin(a), z));
      }
      return lisse(o);
    };
    // le creux : l'ombre sous le bord de devant, les fibres de la paroi de derrière, la poudre au fond
    out.push(`<g clip-path="url(#${id}-ouv)">`);
    out.push(h.path(lisse([...anneau(Ri * 1.05, Hb, 0.05 * Math.PI, 0.95 * Math.PI, 20), ...anneau(Ri * 0.8, Hb - (Hb - zf) * 0.75, 0.9 * Math.PI, 0.1 * Math.PI, 16)], true), A.ombre));
    let creux = '';
    for (let i = 0; i < Math.round(9 * fibres); i++) {
      const z0 = zf + (Hb - zf) * (0.2 + g() * 0.75), z1 = zf + (Hb - zf) * (0.15 + g() * 0.8);
      const a0 = Math.PI * (1.02 + g() * 0.55), a1 = a0 + Math.PI * (0.3 + g() * 0.35);
      const rI = z => Rf + (Ri - Rf) * ((z - zf) / (Hb - zf)) ** 0.7;
      creux += fibre(rI(z0), rI(z1), z0, z1, a0, a1) + ' ';
    }
    out.push(h.path(creux, A.fin));
    if (poudre) {
      const p0 = pr(0, 0, zf), rx = Rf * 0.62, ht = Rf * 0.36;
      out.push(h.path(`${M([p0[0] - rx, p0[1]])} C ${f(p0[0] - rx * 0.5)} ${f(p0[1] - ht * 0.3)} ${f(p0[0] - rx * 0.35)} ${f(p0[1] - ht)} ${f(p0[0])} ${f(p0[1] - ht)} C ${f(p0[0] + rx * 0.35)} ${f(p0[1] - ht)} ${f(p0[0] + rx * 0.5)} ${f(p0[1] - ht * 0.3)} ${f(p0[0] + rx)} ${f(p0[1])} C ${f(p0[0] + rx * 0.5)} ${f(p0[1] + rx * st * 0.6)} ${f(p0[0] - rx * 0.5)} ${f(p0[1] + rx * st * 0.6)} ${f(p0[0] - rx)} ${f(p0[1])} Z`, remplir(A.detail, BLANC)));
      let gr = '';
      for (let i = 0; i < 22; i++) { const xx = g() * 2 - 1, yy = g(); gr += h.cercle(p0[0] + xx * rx * 0.75, p0[1] - yy * (1 - Math.abs(xx)) * ht * 0.8, 0.45, A.plein); }
      out.push(gr);
    }
    out.push('</g>');
    // la paroi de devant : des fibres qui font le tour
    let paroi = '', paroi2 = '';
    for (let i = 0; i < Math.round(22 * fibres); i++) {
      const t0 = 0.06 + g() * 0.9, t1 = Math.max(0.02, Math.min(0.98, t0 + (g() - 0.5) * 0.5));
      const a0 = -0.1 + g() * Math.PI * 0.75, a1 = a0 + Math.PI * (0.25 + g() * 0.35);
      const d = fibre(prof(t0) * 1.005, prof(t1) * 1.005, Hb * t0, Hb * t1, a0, a1) + ' ';
      if (g() < 0.25) paroi2 += d; else paroi += d;
    }
    // le bord : des fibres qui le suivent, de l'ouverture au tour
    let bord = '';
    for (let i = 0; i < Math.round(12 * fibres); i++) {
      const rad = Ri + (R - Ri) * (0.25 + g() * 0.6), a0 = g() * 2 * Math.PI, a1 = a0 + Math.PI * (0.25 + g() * 0.4);
      bord += fibre(rad, rad + (g() - 0.5) * (R - Ri) * 0.5, Hb, Hb, a0, a1) + ' ';
    }
    out.push(`<g clip-path="url(#${id}-sil)">`);
    out.push(h.path(paroi, A.fin), h.path(paroi2, A.detail), h.path(bord, A.fin));
    // les jours : un trou entre les fibres de la paroi, où l'on voit au travers (gris), un brin qui le traverse
    const lesJours = [];
    for (let i = 0; i < jours; i++) {
      const a = Math.PI * (0.3 + 0.4 * (jours > 1 ? i / (jours - 1) : 0.5) + (g() - 0.5) * 0.06), t = 0.45 + g() * 0.15;
      const q = pr(prof(t) * Math.cos(a), prof(t) * Math.sin(a), Hb * t), w = R * (0.12 + g() * 0.03) * (0.5 + 0.5 * Math.sin(a)), hh = R * (0.055 + g() * 0.02);
      const tr = []; for (let k = 0; k < 12; k++) { const s = k / 12 * 2 * Math.PI; tr.push([q[0] + w * Math.cos(s), q[1] + hh * Math.sin(s) * (1 - 0.35 * Math.cos(s) ** 2)]); }
      out.push(h.path(lisse(tr, true), remplir(A.fin, GRIS)));
      out.push(h.path(`${M([q[0] - w * 1.3, q[1] - hh * 0.1])} Q ${f(q[0])} ${f(q[1] + hh * 0.7)} ${f(q[0] + w * 1.25)} ${f(q[1] - hh * 0.3)}`, A.fin));
      lesJours.push(q);
    }
    out.push('</g>');
    out.push(h.path(ouvD, A.arete));
    // les bouts de fibres qui dépassent du contour
    let bouts = '';
    for (let i = 0; i < 8; i++) {
      const p = sil[Math.floor(g() * sil.length)], o = unit(sub(p, c0));
      bouts += brin(p, o, R * (0.1 + g() * 0.1), (g() - 0.5) * 1.6);
    }
    out.push(h.path(bouts, A.fin));
    out.push(h.path(silD, A.arete));
    return { svg: out.join('\n'), poudre: pr(0, 0, zf), Rf, Hb, R, jours: lesJours, haut: pr(0, -R, Hb), devant: pr(0, R * 0.98, Hb * 0.5), pr };
  };

  // La boule : le nid refermé, une pelote de fibres : un contour bosselé, des fibres en grands arcs qui l'enroulent.
  const boule = (c, r, graine) => {
    const g = gen(graine), out = [], id = `boule-${graine}-1340`;
    const cont = []; for (let i = 0; i < 28; i++) { const a = i / 28 * 2 * Math.PI, k = 1 + 0.05 * Math.sin(3 * a + graine) + 0.03 * Math.sin(8 * a); cont.push([c[0] + r * k * Math.cos(a), c[1] + r * k * Math.sin(a)]); }
    const cD = lisse(cont, true);
    out.push(`<defs>${clip(id, cD)}</defs>`);
    out.push(h.path(cD, A.blanc));
    let fib = '';
    for (let i = 0; i < 15; i++) {
      // un grand cercle de la boule, incliné au hasard ; on garde ce qui regarde vers nous
      const inc = g() * Math.PI, rot = g() * Math.PI, pts = [];
      const a0 = g() * Math.PI, a1 = a0 + Math.PI * (0.4 + g() * 0.4);
      for (let k = 0; k <= 16; k++) {
        const a = a0 + (a1 - a0) * k / 16, x = Math.cos(a), y = Math.sin(a) * Math.cos(inc), zz = Math.sin(a) * Math.sin(inc);
        if (zz < -0.05) continue;
        pts.push([c[0] + r * 0.95 * (x * Math.cos(rot) - y * Math.sin(rot)), c[1] + r * 0.95 * (x * Math.sin(rot) + y * Math.cos(rot))]);
      }
      if (pts.length > 3) fib += lisse(pts) + ' ';
    }
    out.push(`<g clip-path="url(#${id})">${h.path(fib, A.fin)}</g>`);
    let bouts = '';
    for (let i = 0; i < 7; i++) { const a = g() * 2 * Math.PI, o = [Math.cos(a), Math.sin(a)]; bouts += brin(add(c, mul(o, r)), o, r * (0.18 + g() * 0.15), (g() - 0.5) * 1.5); }
    out.push(h.path(bouts, A.fin));
    out.push(h.path(cD, A.arete));
    return out.join('\n');
  };

  // L'amadou du tas : une touffe de fibres posée au sol, et deux rouleaux d'écorce de bouleau devant.
  const touffe = (c, w, hh, graine) => {
    const g = gen(graine), out = [], id = `touffe-${graine}-1340`;
    const cont = [];
    for (let i = 0; i <= 26; i++) { const a = Math.PI + Math.PI * i / 26; cont.push([c[0] + w / 2 * Math.cos(a) * (1 + 0.06 * Math.sin(5 * a)), c[1] + hh * Math.sin(a) * (1 + 0.1 * Math.sin(4 * a + 1))]); }
    const d = lisse(cont) + ` L ${f(c[0] - w / 2)} ${f(c[1])} Z`;
    out.push(`<defs>${clip(id, d)}</defs>`);
    out.push(h.path(d, A.blanc));
    let fib = '';
    for (let i = 0; i < 13; i++) {
      const y0 = c[1] - hh * (0.12 + g() * 0.75), x0 = c[0] - w / 2 + g() * w * 0.45, x1 = x0 + w * (0.3 + g() * 0.4);
      fib += `${M([x0, y0])} C ${f(x0 + (x1 - x0) * 0.3)} ${f(y0 - hh * 0.25 * (g() - 0.3))} ${f(x0 + (x1 - x0) * 0.7)} ${f(y0 + hh * 0.3 * (g() - 0.5))} ${f(x1)} ${f(y0 + hh * 0.1 * (g() - 0.5))} `;
    }
    out.push(`<g clip-path="url(#${id})">${h.path(fib, A.fin)}</g>`);
    let bouts = '';
    for (let i = 0; i < 9; i++) { const a = Math.PI * (1.08 + g() * 0.84), p = [c[0] + w / 2 * Math.cos(a), c[1] + hh * Math.sin(a)]; bouts += brin(p, unit([Math.cos(a), Math.sin(a) * 1.4]), hh * (0.2 + g() * 0.2), (g() - 0.5) * 1.6); }
    out.push(h.path(bouts, A.fin));
    out.push(h.path(lisse(cont), A.arete));
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
  const langue = (x, yB, w, hh, pen) => `M ${f(x - w / 2)} ${f(yB)} C ${f(x - w / 2)} ${f(yB - hh * 0.45)} ${f(x + pen * 0.3 - w * 0.15)} ${f(yB - hh * 0.62)} ${f(x + pen)} ${f(yB - hh)} C ${f(x + pen * 0.45 + w * 0.22)} ${f(yB - hh * 0.6)} ${f(x + w / 2)} ${f(yB - hh * 0.42)} ${f(x + w / 2)} ${f(yB)} Z`;
  const flammes = (x, yB, W, Hf) => [
    h.path(langue(x - W * 0.27, yB, W * 0.42, Hf * 0.6, -W * 0.16), remplir(A.arete, BLANC)),
    h.path(langue(x + W * 0.26, yB, W * 0.42, Hf * 0.68, W * 0.15), remplir(A.arete, BLANC)),
    h.path(langue(x, yB, W * 0.5, Hf, W * 0.04), remplir(A.arete, BLANC)),
    h.path(langue(x + W * 0.02, yB, W * 0.22, Hf * 0.5, -W * 0.02), A.detail),
  ].join('\n');

  // ═══ La tige et le couteau ═════════════════════════════════════════════════════════════════════════

  // La tige de ferrocérium, de sa pointe T le long de u : le métal (diamètre dm, longueur Lm), puis le manche
  // (diamètre dp, longueur Lmo), le trou du cordon au bout. e : unités de vue par mm. P(s, t) : le point à s mm de la
  // pointe, t mm de côté.
  const TIGE = { dm: 11, Lm: 120, dp: 22, Lmo: 80 };
  const tigeDessin = (T, u, e) => {
    const { dm, Lm, dp, Lmo } = TIGE, v = perp(u), P = (s, t) => add(add(T, mul(u, s * e)), mul(v, t * e));
    const rm = dm / 2, rp = dp / 2, out = [];
    const metal = [P(Lm + 4, -rm), P(0, -rm)];
    for (let i = 1; i < 8; i++) { const a = -Math.PI / 2 - Math.PI * i / 8; metal.push(P(rm * 0.6 * Math.cos(a), -rm * Math.sin(a) * -1)); }
    metal.push(P(0, rm), P(Lm + 4, rm));
    out.push(h.path(poly(metal), remplir(A.arete, OMBRE)));
    out.push(h.path(M(P(4, -rm * 0.45)) + Lp(P(Lm, -rm * 0.45)), 'fill="none" stroke="#FFFFFF" stroke-width="1.4" stroke-linecap="round"'));
    const man = [P(Lm, -rp), P(Lm + Lmo - 7, -rp)];
    for (let i = 1; i < 8; i++) { const a = -Math.PI / 2 + Math.PI * i / 8; man.push(P(Lm + Lmo - 7 + 7 * Math.cos(a), rp * Math.sin(a))); }
    man.push(P(Lm + Lmo - 7, rp), P(Lm, rp));
    out.push(h.path(poly(man), remplir(A.arete, GRIS)));
    const tc = P(Lm + Lmo - 11, 0);
    out.push(h.cercle(tc[0], tc[1], 2.4 * e, remplir(A.detail, BLANC)));
    return { svg: out.join('\n'), P };
  };

  // Le couteau, dans son repère : s le long de la lame (de la garde vers la pointe), t vers le tranchant ; le dos est
  // la ligne t = 0, au trait fort. K(s, t) donne le point de la vue. Le manche va de s = -7 à s = -125.
  const couteauDessin = K => {
    const Q = (a, b) => `${f(K(a, b)[0])} ${f(K(a, b)[1])}`;
    const lameD = `${M(K(-2, 0))}${Lp(K(52, 0))} Q ${Q(66, 0.5)} ${Q(77, 7)} Q ${Q(69, 18)} ${Q(46, 22)}${Lp(K(-2, 22))} Z`;
    const out = [h.path(lameD, remplir(A.arete, BLANC))];
    out.push(h.path(`${M(K(0, 14.5))}${Lp(K(46, 14.5))} Q ${Q(64, 14)} ${Q(75, 8.5)}`, A.fin));        // le biseau
    out.push(h.path(M(K(-2, 0)) + Lp(K(54, 0)), A.contour));                                       // le dos
    out.push(h.path(poly([K(-2, -3.5), K(-7, -3.5), K(-7, 25.5), K(-2, 25.5)]), remplir(A.arete, BLANC)));   // la garde
    const man = [K(-7, -1), K(-117, -1)];
    for (let i = 1; i < 8; i++) { const a = -Math.PI / 2 + Math.PI * i / 8; man.push(K(-117 - 8 * Math.cos(a), 11.5 + 12.5 * Math.sin(a))); }
    man.push(K(-117, 24), K(-7, 24));
    out.push(h.path(poly(man), remplir(A.arete, GRIS)));
    return out.join('\n');
  };

  // ═══ La géométrie des vues ═════════════════════════════════════════════════════════════════════════

  // Vue 1 : les quatre tas sur une ligne de sol, du plus fin au plus gros.
  const tas = z => ({ yS: z.h - 8, x1: 4, x2: z.l * 0.27, x3: z.l * 0.47, x4: z.l * 0.7 });
  const R2 = 3.4, R3 = 11, R4 = 14.5;
  // Vue 2 : le tipi seul, l'ouverture devant à gauche.
  const vueTipi = z => ({ c: [z.l * 0.6, z.h - 20], R: 44, H: Math.min(z.h - 26, 104) });
  // Vue 4 : l'étincelle. La personne est derrière le nid, face à nous ; ses deux avant-bras sortent par le haut.
  //   La tige, dans sa main gauche (à droite pour nous), descend vers le creux du nid ; la pointe s'arrête à un doigt
  //   (20 mm) au-dessus de la poudre. Le couteau, dans sa main droite, est en travers de la tige, presque d'équerre ;
  //   le dos de la lame appuie sur le métal ; la lame passe devant la tige.
  const RHO = -58;                                  // l'axe de la tige, de la pointe vers le manche
  const etincelle = z => {
    const e = 0.74;
    const n = nid(z.l * 0.4, z.h - 6, 50, 4, { jours: 2, theta: 34, fibres: 0.8 });
    const u = dir(RHO);
    const T = add(n.poudre, [2, -(n.Rf * 0.36) - 20 * e]);      // la pointe : un doigt au-dessus du tas de poudre
    const C = add(T, mul(u, 40 * e));                          // le dos du couteau sur la tige
    const kd = dir(RHO + 92);                                   // le couteau : presque d'équerre avec la tige
    const sc = 46;                                              // le point du dos qui touche la tige, à 46 mm de la garde
    const K = (s, t) => add(C, add(mul(kd, (s - sc) * e), mul(u, t * e)));
    const P = (s, t) => add(add(T, mul(u, s * e)), mul(perp(u), t * e));
    return { e, n, u, T, C, kd, K, P };
  };
  // Vue 5 : la tête de profil (le visage à droite) ; la boule à une longueur d'avant-bras devant la bouche, posée dans
  // le creux de la main, la paume en l'air.
  const souffler = z => {
    const e = 0.42;
    const tete = F.teteSimple({ x: 50, y: z.h - 62, echelle: e, bouche: 'ouverte', ouverture: 0.3, cou: 300, sourcil: false });
    const L0 = tete.bouche, r = 46 * e;
    const B = [L0[0] + 290 * e, L0[1] - 6];
    return { e, tete, L0, r, B };
  };
  // Vue 6 : le tipi, plus grand, le nid qui flambe glissé dedans par l'ouverture.
  const vueGlisser = z => ({ c: [z.l * 0.44, z.h - 30], R: 54, H: Math.min(z.h - 40, 128) });

  return {
    ref: '13-40',
    titre: 'Le ferrocérium, du tri du bois à la flamme',
    desc: 'Six vues dans l’ordre des gestes. Les quatre tas triés sur le sol : une touffe de fibres et deux rouleaux d’écorce de bouleau, une pile de petit bois de moins de 2 cm, une pile de quartiers fendus de 2 à 5 cm, une pile de bûches de moins de 15 cm. Le tipi de petit bois sur le sol, en cône lâche, avec une ouverture du côté d’où vient le vent. Le nid : une poignée de fibres creusée au milieu, avec des jours où l’on voit au travers et un petit tas de poudre au fond du creux. L’étincelle : la tige tenue dans le poing, la pointe à un doigt au-dessus du creux ; le couteau en travers de la tige, presque d’équerre, le dos de la lame appuyé sur le métal et tenu immobile ; la tige qu’on tire vers soi ; la gerbe qui tombe dans le creux. Puis le nid refermé en boule, posé dans le creux de la main, la paume en l’air, à une longueur d’avant-bras devant la bouche ; on souffle, la fumée part de l’autre côté. Enfin le nid en flammes glissé sous le tipi par l’ouverture, une pile de quartiers fendus qui attend à côté.',
    format: 'pleine',
    disposition: [['tas', 'tipi'], ['nid', 'etincelle'], ['souffler', 'glisser']],
    hauteurs: [0.74, 1.58, 1.04],
    largeurs: [[1.5, 1], [0.72, 1.5], [1.12, 1]],
    vues: {
      // ── 1. Trier (étape 10) ────────────────────────────────────────────────────────────────────────────
      tas: {
        titre: 'Trier en quatre tas',
        dessin: z => {
          const t = tas(z), out = [h.ligne(0, t.yS, z.l, t.yS, A.detail)];
          // 1. l'amadou : la touffe de fibres, deux rouleaux d'écorce devant
          out.push(touffe([t.x1 + 34, t.yS], 64, 30, 3));
          out.push(rouleau([t.x1 + 16, t.yS - 5.5], 5.5, 18), rouleau([t.x1 + 40, t.yS - 5], 5, 20));
          // 2. le bois de moins de 2 cm : une pile de baguettes, les bouts vers nous
          const b2 = [t.x2 + R2, t.yS - R2];
          [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [0.5, 1], [1.5, 1], [2.5, 1], [3.5, 1], [4.5, 1], [1, 2], [2, 2], [3, 2], [4, 2]]
            .forEach(([i, j], k) => out.push(rondin([b2[0] + i * R2 * 2.04, b2[1] - j * R2 * 1.76], R2, 52 + (k % 3) * 5, 0, k + 1)));
          // 3. le bois de 2 à 5 cm : des quartiers fendus, empilés
          const b3 = [t.x3 + R3, t.yS - 1];
          out.push(quartier(b3, R3, 180, 270, 50), quartier([b3[0] + R3 * 1.3, b3[1]], R3, 270, 360, 50), quartier([b3[0] + R3 * 2.5, b3[1]], R3, 180, 270, 50));
          out.push(quartier([b3[0] + R3 * 0.66, b3[1] - R3 * 0.98], R3, 200, 300, 50), quartier([b3[0] + R3 * 1.95, b3[1] - R3 * 0.98], R3, 240, 340, 50));
          // 4. les bûches de moins de 15 cm : trois en bas, deux dessus
          const b4 = [t.x4 + R4, t.yS - R4];
          [[0, 0], [2, 0], [4, 0], [1, 1], [3, 1]].forEach(([i, j], k) => out.push(rondin([b4[0] + i * R4 * 1.02, b4[1] - j * R4 * 1.72], R4, 44, 2, 10 + k)));
          return out.join('\n');
        },
        renvois: z => {
          const t = tas(z), y = 12;
          return [
            { n: 1, rond: [t.x1 + 34, y], cible: [t.x1 + 36, t.yS - 29.5], texte: 'l’amadou fin' },
            { n: 2, rond: [t.x2 + 28, y], cible: [t.x2 + R2 + 2 * R2 * 2.04, t.yS - R2 - 2 * R2 * 1.76 - R2 + 0.3], texte: 'le bois fin, de moins de 2 cm' },
            { n: 3, rond: [t.x3 + 26, y], cible: [t.x3 + R3 + R3 * 0.66 - 3, t.yS - 1 - R3 * 0.98 - R3 * 0.93], texte: 'le bois de 2 à 5 cm' },
            { n: 4, rond: [t.x4 + 34, y], cible: [t.x4 + R4 + R4 * 1.02, t.yS - R4 - R4 * 1.72 - R4 + 0.3], texte: 'les bûches de moins de 15 cm' },
          ];
        },
      },
      // ── 2. Le tipi (étape 13) ──────────────────────────────────────────────────────────────────────────
      tipi: {
        titre: 'Monter le tipi',
        dessin: z => {
          const g = vueTipi(z), t = tipi(g.c, g.R, g.H, 21);
          // le vent : deux flèches qui viennent de devant à gauche et entrent par l'ouverture, au ras du sol
          const fl = zz => { const b = t.ouv(zz, 1.08), a = t.ouv(zz, 2.6); return h.fleche(`${M(a)} L ${f(b[0])} ${f(b[1])}`, A.detail); };
          return [t.svg, fl(g.H * 0.1), fl(g.H * 0.24)].join('\n');
        },
        renvois: z => {
          const g = vueTipi(z), t = tipi(g.c, g.R, g.H, 21);
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
        dessin: z => nid(z.l / 2, z.h * 0.7, z.l * 0.36, 3, { jours: 3 }).svg,
        renvois: z => {
          const n = nid(z.l / 2, z.h * 0.7, z.l * 0.36, 3, { jours: 3 });
          return [
            { n: 7, rond: [16, z.h - 14], cible: n.jours[0], texte: 'effilocher jusqu’à voir le jour au travers' },
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
          const tg = tigeDessin(T, u, e);
          out.push(tg.svg);
          const cm = tg.P(TIGE.Lm + 36, 0);
          out.push(main({ id: 'manche-vers-bas', x: cm[0], y: cm[1], objet: false, taille: 200 * TIGE.dp * e / 17.66, angle: RHO + 52.5 }).svg);
          out.push(h.path(gerbe, A.detail), grains);
          // le couteau (la lame devant la tige), puis la main droite sur le manche, le pouce du côté de la lame
          out.push(couteauDessin(K));
          const ck = K(-60, 11.5), ak = Math.atan2(g.kd[1], g.kd[0]) * 180 / Math.PI;
          out.push(main({ id: 'poing-barre', x: ck[0], y: ck[1], objet: false, taille: 200 * 25 * e / 26.15, angle: ak + 73.6 }).svg);
          // le geste : la tige tirée vers soi, dans son axe, à côté du métal
          const g0 = add(tg.P(58, 0), mul(perp(u), 22)), g1 = add(tg.P(118, 0), mul(perp(u), 22));
          out.push(h.geste(`${M(g0)} L ${f(g1[0])} ${f(g1[1])}`));
          // le point à contrôler : le dos du couteau sur la tige, qui ne bouge pas
          out.push(h.controle(C[0], C[1], 8));
          return coupe('etincelle', z, out.join('\n'));
        },
        renvois: z => {
          const g = etincelle(z), { T, C, u, n, P } = g;
          const g1 = add(P(92, 0), mul(perp(u), 22));
          return [
            { n: 9, rond: [16, T[1] + 2], cible: add(T, [-4, 0.5]), texte: 'tenir la pointe à un doigt de l’amadou' },
            { n: 10, rond: [C[0] + 70, C[1] + 26], cible: add(C, mul(unit([1, 0.5]), 8)), texte: 'appuyer le dos du couteau, sans le bouger' },
            { n: 11, rond: [g1[0] + 34, g1[1] + 8], cible: g1, texte: 'tirer la tige vers soi, d’un coup' },
            { n: 12, rond: [z.l - 16, n.poudre[1] - 6], cible: [n.poudre[0] + 9, n.poudre[1] - 2], texte: 'la gerbe tombe dans le creux' },
          ];
        },
      },
      // ── 5. Flamber (étape 16) ──────────────────────────────────────────────────────────────────────────
      souffler: {
        titre: 'Refermer et souffler',
        dessin: z => {
          const s = souffler(z), { B, r, tete, L0, e } = s, out = [String(tete)];
          // la boule, posée dans le creux de la main ; l'avant-bras descend vers le corps
          out.push(boule(B, r, 5));
          const tm = 210 * e;
          out.push(String(F.mainStock({ id: 'paume-en-lair', x: B[0], y: B[1] + r * 0.55, ancre: [0.6, 0.42], taille: tm, angle: -22 })));
          // le souffle, de la bouche à la boule
          out.push(h.fleche(`M ${f(L0[0] + 8)} ${f(L0[1] - 2)} L ${f(B[0] - r - 6)} ${f(B[1] - 4)}`, A.cache));
          out.push(h.fleche(`M ${f(L0[0] + 8)} ${f(L0[1] + 5)} L ${f(B[0] - r - 6)} ${f(B[1] + 4)}`, A.cache));
          // la fumée : un ruban mince au ras de la boule, qui s'épaissit en montant, de l'autre côté du visage
          const axe = t => [B[0] + r * 0.55 + 22 * t + 26 * t * t + 2.5 * Math.sin(t * 8), B[1] - r * 0.8 - (B[1] - r * 0.8 - 10) * t];
          const bordF = sg => { const o = []; for (let i = 0; i <= 18; i++) { const t = i / 18, p = axe(t), w = 1 + 14 * t * t; o.push([p[0] + sg * w * (1 + 0.25 * Math.sin(t * 13 + sg)), p[1] + sg * w * 0.2]); } return o; };
          const gauche = bordF(-1), droite = bordF(1).reverse();
          out.push(h.path(lisse([...gauche, ...droite]), remplir(A.detail, BLANC)));
          out.push(h.path(lisse([0.45, 0.6, 0.75, 0.9].map(t => add(axe(t), [Math.sin(t * 9) * 4, 0]))), A.fin));
          return coupe('souffler', z, out.join('\n'));
        },
        renvois: z => {
          const s = souffler(z), { B, r, L0 } = s;
          const mx = (L0[0] + B[0] - r) / 2;
          const ax = t => [B[0] + r * 0.55 + 22 * t + 26 * t * t + 2.5 * Math.sin(t * 8), B[1] - r * 0.8 - (B[1] - r * 0.8 - 10) * t];
          return [
            { n: 13, rond: [B[0] - r - 14, B[1] - r - 26], cible: [B[0] - r * 0.6, B[1] - r * 0.8], texte: 'refermer le nid en boule, sans serrer' },
            { n: 14, rond: [B[0] + r + 30, B[1] + r + 8], cible: [B[0] + r * 0.9, B[1] + r * 1.1], texte: 'le tenir par le dessous, à un avant-bras' },
            { n: 15, rond: [mx, L0[1] - 34], cible: [mx, L0[1] - 1.5], texte: 'souffler en continu, sans à-coups' },
            { n: 16, rond: [z.l - 14, 30], cible: add(ax(0.72), [12, 0]), texte: 'la fumée passe de mince à épaisse' },
          ];
        },
      },
      // ── 6. Glisser (étape 17) ──────────────────────────────────────────────────────────────────────────
      glisser: {
        titre: 'Glisser le nid sous le tipi',
        dessin: z => {
          const g = vueGlisser(z), out = [];
          const om = deg((OUV[0] + OUV[1]) / 2);
          const nc = P3(g.c, Math.cos(om) * g.R * 0.45, Math.sin(om) * g.R * 0.45, 0);
          const nN = nid(nc[0], nc[1], 20, 17, { jours: 0, poudre: false, theta: 24, fibres: 0.5 });
          const dedans = [flammes(nc[0] + 3, nN.haut[1] + 8, 38, g.H * 0.55), nN.svg].join('\n');
          const t = tipi(g.c, g.R, g.H, 29, { dedans, n: 12, ep: 3 });
          out.push(t.svg);
          const a = P3(g.c, Math.cos(om) * g.R * 2.5, Math.sin(om) * g.R * 2.5, 2), b = P3(g.c, Math.cos(om) * g.R * 1.05, Math.sin(om) * g.R * 1.05, 2);
          out.push(h.geste(`${M(a)} L ${f(b[0])} ${f(b[1])}`));
          // le bois de 2 à 5 cm, prêt à côté
          const b3 = [g.c[0] + g.R * 1.55, g.c[1] + 10], r3 = 10;
          out.push(quartier(b3, r3, 180, 270, 40), quartier([b3[0] + r3 * 1.3, b3[1]], r3, 270, 360, 40), quartier([b3[0] + r3 * 0.66, b3[1] - r3 * 0.98], r3, 210, 310, 40));
          return out.join('\n');
        },
        renvois: z => {
          const g = vueGlisser(z), om = deg((OUV[0] + OUV[1]) / 2);
          const a = P3(g.c, Math.cos(om) * g.R * 1.9, Math.sin(om) * g.R * 1.9, 2);
          const b3 = [g.c[0] + g.R * 1.55, g.c[1] + 10];
          return [
            { n: 17, rond: [16, a[1] - 34], cible: [a[0], a[1] - 1.5], texte: 'glisser le nid par l’ouverture' },
            { n: 18, rond: [z.l - 16, g.c[1] - g.H * 0.45], cible: [b3[0] + 10 * 0.66 + 2, b3[1] - 10 * 0.98 - 9.4], texte: 'ajouter le bois de 2 à 5 cm quand le fin crépite' },
          ];
        },
      },
    },
  };
};
