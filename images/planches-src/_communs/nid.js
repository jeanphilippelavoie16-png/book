// _communs/nid.js. Le nid d'amadou réussi de la planche 13-40 (vue « Faire le nid »), pour toute planche qui le
// montre. JP, 19 octobre 2026, sur la 13-10 : « le nid est pas beau, prends le nid [de la 13-40] qui est réussi ». Un
// objet qui revient d'une planche à l'autre reprend le dessin réussi : on importe cette fonction, on ne redessine pas
// le nid autrement.
//
// La fonction nid et les petites aides dont elle dépend sont recopiées telles quelles de images/planches-src/13-40.js
// (fonction nid, vers la ligne 173). Appelée avec les mêmes arguments et la marque '1340', elle rend le même SVG,
// caractère pour caractère (vérifié le 19 octobre 2026). Deux seules différences, qui ne changent pas le dessin :
//   l'identifiant des découpes (clipPath) porte la marque de la planche qui appelle : nid-<n>-<marque>, n compté
//     dans chaque planche ; deux nids d'une même planche, ou de deux planches montées dans la même page, ne se
//     marchent donc pas dessus ;
//   le résultat rend aussi l'ouverture du creux (ouv : ses points, ouvD : sa courbe, la même que celle qui est
//     dessinée) et la silhouette (sil), pour qu'une planche pose un objet dans le creux (13-10 : la boule de laine,
//     dont le bas passe derrière le bord avant du creux).
//
//   const { nid } = require('./_communs/nid.js')(h, '1310');
//   nid(cx, yS, R, graine, { theta, jours, poudre, fibres })
//     (cx, yS) : le point du sol sous le centre ; R : le rayon au bord ; theta : l'angle de vue au-dessus de
//     l'horizon (38° par défaut) ; jours : le nombre de jours dans la paroi ; poudre : le petit tas au fond du creux ;
//     fibres : la densité des fibres (1 par défaut).
//   Rend { svg, poudre, Rf, Hb, R, jours, haut, devant, pr, ouv, ouvD, sil }.
'use strict';

module.exports = (h, marque) => {
  if (!marque) throw new Error('_communs/nid.js : donner la marque de la planche, par exemple require(…)(h, \'1310\')');
  const A = h.a;
  const f = v => Math.round(v * 10) / 10;
  const deg = a => a * Math.PI / 180;
  const add = (p, q) => [p[0] + q[0], p[1] + q[1]];
  const sub = (p, q) => [p[0] - q[0], p[1] - q[1]];
  const mul = (p, k) => [p[0] * k, p[1] * k];
  const lon = p => Math.hypot(p[0], p[1]);
  const unit = p => mul(p, 1 / lon(p));
  const perp = p => [-p[1], p[0]];
  const gen = s => { let g = s; return () => (g = (g * 16807) % 2147483647) / 2147483647; };
  const BLANC = '#FFFFFF';
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
  // un brin qui dépasse d'un contour : part un peu en dedans, sort et se courbe
  const brin = (p, o, l, s) => { const t = perp(o); return `${M(add(p, mul(o, -l * 0.3)))} Q ${f(p[0] + o[0] * l * 0.5 + t[0] * l * s * 0.5)} ${f(p[1] + o[1] * l * 0.5 + t[1] * l * s * 0.5)} ${f(p[0] + o[0] * l + t[0] * l * s)} ${f(p[1] + o[1] * l + t[1] * l * s)} `; };

  // Le nid : une poignée de fibres effilochées, creusée au milieu, vue d'un peu au-dessus (theta). Un bol au fond
  // arrondi, un peu bosselé ; le creux est dans l'ombre (gris pâle) ; les fibres sont de longs traits souples qui se
  // croisent en biais sur la paroi et passent par-dessus le bord ; quelques bouts dépassent ; dans la paroi, des jours
  // où l'on voit au travers. Au fond du creux, la poudre. (cx, yS) : le point du sol sous le centre ; R : le rayon au bord.
  let nNid = 0;
  const nid = (cx, yS, R, graine, { theta = 38, jours = 3, poudre = true, fibres = 1 } = {}) => {
    const g = gen(graine), id = `nid-${++nNid}-${marque}`, out = [];
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
    return { svg: out.join('\n'), poudre: pr(0, 0, zf), Rf, Hb, R, jours: lesJours, haut: pr(0, -R, Hb), devant: pr(0, R * 0.98, Hb * 0.5), pr, ouv, ouvD, sil };
  };

  return { nid };
};
