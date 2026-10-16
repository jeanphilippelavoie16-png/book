// Planche 13-40. Le ferrocérium, du tri du bois à la flamme. Refaite depuis zéro le 16 octobre 2026
// (règle 12 : JP, sur la version retouchée, « les mains, l'amadou, le tipi, c'est laid en câlisse »).
//
// Six vues, dans l'ordre des gestes du chapitre (étapes 10 à 17) : trier les quatre tas ; monter le tipi,
// l'ouverture face au vent ; faire le nid ; faire l'étincelle (le couteau immobile, la tige tirée) ; refermer et
// souffler ; glisser le nid sous le tipi. Les repères 1 à 18 sont ceux du texte.
//
// Mains, têtes : les moteurs validés seulement (brief-agent.md).
//   la tige      mainSimple 'prise-manche', vue 'paume', rotation [-25, 0, 0], main gauche, l'avant-bras vers la droite ;
//   le couteau   mainSimple 'prise-manche', vue 'paume', rotation [-25, 0, 0], main droite, l'avant-bras vers le haut
//                à droite ; les deux avant-bras coupés court (gros plan) ;
//   la boule     mainSimple 'coupe', vue 'pouce' : le creux de la main sous la boule ;
//   la tête      teteSimple, de profil, la bouche entrouverte (souffler).
// L'amadou est fait de brins : des arcs fins qui tournent autour du creux (le nid) ou de grands cercles enroulés (la
// boule), jamais un contour gribouillé. Le tipi est construit : des bâtons droits, dressés vers un même sommet et
// prolongés au-delà, qui se croisent en haut ; ceux de derrière en gris, d'abord ; l'ouverture face au vent est un
// vide franc dans le cercle de base.
// Aucune cote : les calibres (moins de 2 cm, 2 à 5 cm, moins de 15 cm) sont des bornes de tri, dans la légende.

module.exports = (h) => {
  const A = h.a, F = h.formes;
  const NOIR = '#1A1A1A';
  const f = v => Math.round(v * 10) / 10;
  const deg = a => a * Math.PI / 180;
  const add = (p, q) => [p[0] + q[0], p[1] + q[1]];
  const mul = (p, k) => [p[0] * k, p[1] * k];
  const gen = s => { let g = s; return () => (g = (g * 16807) % 2147483647) / 2147483647; };
  const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');

  // Courbe lisse (Catmull-Rom) par tous les points.
  const lisse = (pts, ferme = false) => {
    const n = pts.length, p = i => ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
    let d = `M ${f(pts[0][0])} ${f(pts[0][1])}`;
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = p(i - 1), p1 = p(i), p2 = p(i + 1), p3 = p(i + 2);
      d += ` C ${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
    }
    return ferme ? d + ' Z' : d;
  };
  const arc = (cx, cy, rx, ry, a0, a1, n = 8) => {
    const o = [];
    for (let i = 0; i <= n; i++) { const a = deg(a0 + (a1 - a0) * i / n); o.push([cx + rx * Math.cos(a), cy + ry * Math.sin(a)]); }
    return o;
  };
  // Ce qui sort d'une vue (un avant-bras, un cou) est coupé net par son bord.
  const coupe = (id, z, svg) => `<clipPath id="vue-${id}-1340"><rect x="0" y="0" width="${z.l}" height="${z.h}"/></clipPath>\n<g clip-path="url(#vue-${id}-1340)">\n${svg}\n</g>`;

  // ── Les mains : mainSimple, posée pour que l'axe de l'objet tenu suive une direction voulue ─────────────
  const norm = a => ((a + 90) % 180 + 180) % 180 - 90;
  const placer = (o, dir) => o.angle + norm(dir - F.mainSimple({ ...o, avantbras: false }).prise.angle);

  // ── L'amadou : des brins ────────────────────────────────────────────────────────────────────────────
  // Le nid : un tore de fibres (une couronne épaisse autour d'un creux), vu d'en haut à 35°. Chaque brin fait le
  // tour de la couronne en dérivant un peu ; on ne dessine que ce qui regarde vers nous, donc le dessus, le devant de
  // la paroi et le fond du creux, comme sur un vrai nid. cx, cy : le centre ; Ro : le rayon extérieur.
  const nid = (cx, cy, Ro, graine, { creux = 0.36, poudre = true, densite = 1, theta = 35 } = {}) => {
    const r = gen(graine), th = deg(theta), st = Math.sin(th), ct = Math.cos(th);
    const rr = Ro * (1 - creux) / 2, Rm = Ro - rr, rz = rr * 0.78;
    const proj = (X, Y, Z) => [cx + X, cy - (Y * st + Z * ct)];
    const pt = (a, b, k = 1) => {
      const rad = Rm + rr * k * Math.cos(b);
      return { p: proj(rad * Math.cos(a), rad * Math.sin(a), rz * k * Math.sin(b)),
        vis: -ct * Math.cos(b) * Math.sin(a) / rr + st * Math.sin(b) / rz > -0.004 / rr };
    };
    // le blanc : la silhouette de la couronne (le contour extérieur projeté)
    const sil = [];
    for (let k = 0; k < 48; k++) {
      const a = k / 48 * 2 * Math.PI;
      let best = null;
      for (let b = -Math.PI; b < Math.PI; b += 0.2) { const q = pt(a, b).p; const d = Math.hypot(q[0] - cx, (q[1] - cy) / st); if (!best || d > best.d) best = { d, q }; }
      sil.push(best.q);
    }
    const out = [h.path(lisse(sil, true), A.blanc)];
    let fin = '', moyen = '';
    const brin = (a0, span, b0, db, k) => {
      const n = Math.max(6, Math.round(span / 0.12)), runs = [];
      let cur = [];
      for (let i = 0; i <= n; i++) {
        const s = i / n, q = pt(a0 + span * s, b0 + db * s, k);
        if (q.vis) cur.push(q.p); else { if (cur.length > 2) runs.push(cur); cur = []; }
      }
      if (cur.length > 2) runs.push(cur);
      return runs.map(c => lisse(c)).join(' ') + ' ';
    };
    const nb = Math.round(Ro * 1.7 * densite);
    for (let i = 0; i < nb; i++) {
      const s = brin(r() * 2 * Math.PI, 1.2 + r() * 2.2, -Math.PI + r() * 2 * Math.PI, (r() - 0.5) * 1.6, 0.97 + r() * 0.06);
      if (i % 7 === 0) moyen += s; else fin += s;
    }
    // le fond du creux : un disque de fibres plus serrées, la poudre dessus
    const fz = -rz * 0.55, fr = (Rm - rr) * 0.95;
    // les brins libres qui débordent du bord
    for (let i = 0; i < Math.round(Ro * 0.14) + 3; i++) {
      const q = sil[Math.floor(r() * sil.length)], vx = q[0] - cx, vy = q[1] - cy, L0 = Math.hypot(vx, vy) || 1;
      const L = 4 + r() * 6, b = Math.atan2(vy, vx) + (r() - 0.5) * 1.2;
      fin += `M ${f(q[0] - vx / L0 * 2)} ${f(q[1] - vy / L0 * 2)} q ${f(Math.cos(b) * L * 0.5 + (r() - 0.5) * 2)} ${f(Math.sin(b) * L * 0.5)} ${f(Math.cos(b) * L)} ${f(Math.sin(b) * L)} `;
    }
    out.push(h.path(fin, A.fin), h.path(moyen, A.detail));
    if (poudre) {
      let pts = '';
      for (let i = 0; i < 24; i++) {
        const a = r() * 2 * Math.PI, d = Math.sqrt(r()) * fr * 0.55, q = proj(Math.cos(a) * d, Math.sin(a) * d, fz);
        pts += `<circle cx="${f(q[0])}" cy="${f(q[1])}" r="${f(0.5 + r() * 0.4)}" ${A.plein}/>`;
      }
      out.push(pts);
    }
    return out.join('\n');
  };
  // le point du fond du creux et le bas du nid, pour poser le sol et les renvois
  const nidGeo = (cx, cy, Ro, { creux = 0.36, theta = 35 } = {}) => {
    const th = deg(theta), st = Math.sin(th), ct = Math.cos(th), rr = Ro * (1 - creux) / 2, Rm = Ro - rr, rz = rr * 0.78;
    let bas = -1e9;
    for (let b = -Math.PI; b < Math.PI; b += 0.02) bas = Math.max(bas, cy + (Rm + rr * Math.cos(b)) * st - rz * Math.sin(b) * ct);
    return { creux: [cx, cy + rz * 0.55 * ct], bas };
  };
  // ── Le nid : une écuelle de fibres ───────────────────────────────────────────────────────────────────
  // Une poignée de fibres effilochées, creusée au milieu : une paroi épaisse et arrondie, un bord, un creux au fond
  // plat de fibres plus fines, un petit tas de poudre au centre. Vue d'en haut à theta. Les brins sont posés sur les
  // surfaces en 3D, chacun dans une direction au hasard (ils se croisent en tous sens), et on ne garde que ce qui
  // regarde vers nous. Entre les brins de la paroi, des jours : on y voit le sol au travers (le même gris).
  // (cx, yG) : le point du sol sous le centre ; Rr : le rayon au bord. Repère : X à droite, D vers nous, Z en haut.
  let nEcu = 0;
  const ecuelle = (cx, yG, Rr, graine, { theta = 38, poudre = true, jours = 13, densite = 1, sol = 0, fond = true } = {}) => {
    const r = gen(graine), th = deg(theta), st = Math.sin(th), ct = Math.cos(th), id = `ecu-${++nEcu}-1340`;
    const Hb = Rr * 0.6, w = Rr * 0.36, Ri = Rr - w, Rb = Rr * 0.6, zf = Hb * 0.4, Rf = Ri * 0.62, dome = w * 0.28;
    const pr = (X, D, Z) => [cx + X, yG + D * st - Z * ct];
    const E = [0, ct, st];
    const pol = (rad, a, z) => [rad * Math.cos(a), rad * Math.sin(a), z];
    // les surfaces : (u, v) → point 3D et normale vers l'air
    const S = {
      ext: (u, v) => { const t = v * Math.PI / 2, rad = Rb + (Rr - Rb) * Math.cos(t), z = Hb * (1 - Math.sin(t));
        const dr = -(Rr - Rb) * Math.sin(t), dz = -Hb * Math.cos(t); const nn = Math.hypot(dr, dz);
        return { p: pol(rad, u, z), n: [Math.cos(u) * (-dz / nn), Math.sin(u) * (-dz / nn), dr / nn] }; },
      bord: (u, v) => { const b = v * Math.PI, Rm = (Rr + Ri) / 2, rad = Rm + (w / 2) * Math.cos(b), z = Hb + dome * Math.sin(b);
        const nr = Math.cos(b) / (w / 2), nz = Math.sin(b) / dome, nn = Math.hypot(nr, nz);
        return { p: pol(rad, u, z), n: [Math.cos(u) * nr / nn, Math.sin(u) * nr / nn, nz / nn] }; },
      int: (u, v) => { const t = v * Math.PI / 2, rad = Rf + (Ri - Rf) * Math.cos(t), z = zf + (Hb - zf) * (1 - Math.sin(t));
        const dr = -(Ri - Rf) * Math.sin(t), dz = -(Hb - zf) * Math.cos(t); const nn = Math.hypot(dr, dz);
        return { p: pol(rad, u, z), n: [Math.cos(u) * (dz / nn), Math.sin(u) * (dz / nn), -dr / nn] }; },
      fond: (u, v) => ({ p: pol(Rf * Math.sqrt(v), u, zf), n: [0, 0, 1] }),
    };
    const vis = q => q.n[0] * E[0] + q.n[1] * E[1] + q.n[2] * E[2] > 0.04;
    const P = q => pr(...q.p);
    // un brin : part de (u0, v0), avance dans une direction au hasard (dans le plan de la surface), en courbe douce
    const larg = { ext: Rr * 1.15, bord: w * 1.6, int: (Ri + Rf) * 0.9, fond: Rf };   // longueur d'arc de v = 0 à 1 (environ)
    const rayon = { ext: (Rr + Rb) / 2, bord: (Rr + Ri) / 2, int: (Ri + Rf) / 2, fond: Rf * 0.6 };
    const brins = (nom, nb, Lmin, Lmax, dom) => {
      let fin = '', moyen = '';
      for (let i = 0; i < nb; i++) {
        let u = dom.u0 + r() * (dom.u1 - dom.u0), v = dom.v0 + r() * (dom.v1 - dom.v0), a = r() * Math.PI * 2;
        const L = Lmin + r() * (Lmax - Lmin), k = (r() - 0.5) * 0.035, n = Math.max(8, Math.round(L / 1.6));
        const runs = []; let cur = [];
        for (let j = 0; j <= n; j++) {
          const q = S[nom](u, Math.min(1, Math.max(0, v)));
          if (v >= 0 && v <= 1 && vis(q)) cur.push(P(q)); else { if (cur.length > 2) runs.push(cur); cur = []; }
          const ds = L / n; a += k * ds;
          u += Math.cos(a) * ds / rayon[nom]; v += Math.sin(a) * ds / larg[nom];
        }
        if (cur.length > 2) runs.push(cur);
        const d = runs.map(c => lisse(c)).join(' ') + ' ';
        if (r() < 0.22) moyen += d; else fin += d;
      }
      return [h.path(fin, A.fin), h.path(moyen, A.detail)].join('\n');
    };
    // les contours en plan : une ellipse à la hauteur z, de rayon rad
    const ell = (rad, z, n = 64) => { const o = []; for (let k = 0; k < n; k++) o.push(pr(...pol(rad, k / n * 2 * Math.PI, z))); return o; };
    // la silhouette : l'enveloppe des cercles de la paroi extérieure et du bord, colonne par colonne
    const cercles = [];
    for (let k = 0; k <= 24; k++) { const t = k / 24 * Math.PI / 2; cercles.push([Rb + (Rr - Rb) * Math.cos(t), Hb * (1 - Math.sin(t))]); }
    for (let k = 1; k < 12; k++) { const b = k / 12 * Math.PI; cercles.push([(Rr + Ri) / 2 + (w / 2) * Math.cos(b), Hb + dome * Math.sin(b)]); }
    const haut = [], bas = [];
    for (let k = 0; k <= 80; k++) {
      const x = -Rr + 2 * Rr * k / 80; let y0 = 1e9, y1 = -1e9;
      cercles.forEach(([rad, z]) => { if (Math.abs(x) > rad) return; const e = rad * st * Math.sqrt(1 - (x / rad) ** 2), c = yG - z * ct; y0 = Math.min(y0, c - e); y1 = Math.max(y1, c + e); });
      if (y0 < 1e8) { haut.push([cx + x, y0]); bas.push([cx + x, y1]); }
    }
    const sil = [...haut, ...bas.reverse()];
    const silD = lisse(sil, true);
    const ouvD = lisse(ell(Ri, Hb), true), bordD = lisse(ell(Rr, Hb), true), fondD = lisse(ell(Rf, zf), true);
    const out = [];
    const cp = (nom, d, ev = '') => `<clipPath id="${id}-${nom}"><path d="${d}" fill="#FFFFFF" stroke="none"${ev}/></clipPath>`;
    out.push(`<defs>${cp('sil', silD)}${cp('ouv', ouvD)}${cp('paroi', silD + ' ' + bordD, ' clip-rule="evenodd"')}${cp('fond', fondD)}</defs>`);
    if (sol) out.push(h.ellipse(cx, yG, Rr * sol, Rr * sol * st * 0.9, A.loin));
    out.push(h.path(silD, A.blanc));
    const dn = densite;
    // le creux : la paroi de derrière, vue de l'intérieur, puis le fond de fibres fines, puis la poudre
    out.push(`<g clip-path="url(#${id}-ouv)">`);
    out.push(brins('int', Math.round(150 * dn), Rr * 0.2, Rr * 0.5, { u0: Math.PI, u1: 2 * Math.PI, v0: 0, v1: 1 }));
    if (fond) {
      out.push(h.path(fondD, A.blanc));
      out.push(`<g clip-path="url(#${id}-fond)">` + brins('fond', Math.round(70 * dn), Rf * 0.25, Rf * 0.6, { u0: 0, u1: 2 * Math.PI, v0: 0, v1: 1 }).replace(A.detail, A.fin) + '</g>');
    }
    const poudreP = pr(0, 0, zf);
    if (poudre) {
      // un petit tas net : un dôme bas, piqué de grains
      const rx = Rf * 0.36, ht = Rf * 0.34;
      const d = `M ${f(poudreP[0] - rx)} ${f(poudreP[1])} C ${f(poudreP[0] - rx * 0.6)} ${f(poudreP[1] - ht * 1.25)} ${f(poudreP[0] + rx * 0.6)} ${f(poudreP[1] - ht * 1.25)} ${f(poudreP[0] + rx)} ${f(poudreP[1])} `
        + `Q ${f(poudreP[0])} ${f(poudreP[1] + rx * st * 0.7)} ${f(poudreP[0] - rx)} ${f(poudreP[1])} Z`;
      out.push(h.path(d, blanc(A.detail)));
      let g = '';
      for (let i = 0; i < 26; i++) { const a = r() * Math.PI, d2 = Math.sqrt(r()); g += `<circle cx="${f(poudreP[0] + Math.cos(a) * rx * 0.8 * d2 * (r() < 0.5 ? -1 : 1))}" cy="${f(poudreP[1] - Math.sin(a) * ht * 0.9 * d2 + 0.3)}" r="0.45" ${A.plein}/>`; }
      out.push(g);
    }
    out.push('</g>');
    // le bord : un anneau bombé, des brins qui le croisent
    out.push(h.path(`${bordD} ${ouvD}`, A.blanc.replace('stroke="none"', 'stroke="none" fill-rule="evenodd"')));
    out.push(`<g clip-path="url(#${id}-sil)">` + brins('bord', Math.round(170 * dn), w * 0.7, w * 1.7, { u0: 0, u1: 2 * Math.PI, v0: 0, v1: 1 }) + '</g>');
    // la paroi de devant
    out.push(`<g clip-path="url(#${id}-paroi)">` + brins('ext', Math.round(170 * dn), Rr * 0.25, Rr * 0.6, { u0: 0, u1: Math.PI, v0: 0, v1: 1 }) + '</g>');
    // les jours : des trous entre les brins, où l'on voit le sol (le gris)
    const trous = [];
    // un jour : le vide entre quatre brins qui se croisent (deux paires presque parallèles), où l'on voit le sol
    const trou = (nom, u, v, l) => {
      const q = S[nom](u, v); if (!vis(q)) return;
      const c = P(q), a1 = (r() - 0.5) * 1.2, a2 = a1 + (r() < 0.5 ? 1 : -1) * (1.0 + r() * 0.5);
      const d1 = l * (0.55 + r() * 0.25), d2 = l * (0.45 + r() * 0.25);
      const u1 = [Math.cos(a1), Math.sin(a1)], u2 = [Math.cos(a2), Math.sin(a2)];
      const n1 = [-u1[1], u1[0]], n2 = [-u2[1], u2[0]];
      // les quatre coins : intersections des droites c + s1·d1·n1 (le long de u1) et c + s2·d2·n2 (le long de u2)
      const X = (s1, s2) => { const p1 = add(c, mul(n1, s1 * d1)), p2 = add(c, mul(n2, s2 * d2));
        const det = u1[0] * (-u2[1]) - u1[1] * (-u2[0]), t = ((p2[0] - p1[0]) * (-u2[1]) - (p2[1] - p1[1]) * (-u2[0])) / det; return add(p1, mul(u1, t)); };
      const k = [X(-1, -1), X(-1, 1), X(1, 1), X(1, -1)];
      out.push(h.chemin(k, A.loin, true));
      let d = '';
      [[-1, 0, 1], [1, 2, 3]].forEach(([s1, i0, i1]) => { const A0 = k[i0], B0 = k[i1], m = mul([B0[0] - A0[0], B0[1] - A0[1]], 0.9);
        d += `M ${f(A0[0] - m[0])} ${f(A0[1] - m[1])} L ${f(B0[0] + m[0] * 0.8)} ${f(B0[1] + m[1] * 0.8)} `; });
      [[1, 2], [3, 0]].forEach(([i0, i1]) => { const A0 = k[i0], B0 = k[i1], m = mul([B0[0] - A0[0], B0[1] - A0[1]], 0.9);
        d += `M ${f(A0[0] - m[0] * 0.8)} ${f(A0[1] - m[1] * 0.8)} L ${f(B0[0] + m[0])} ${f(B0[1] + m[1])} `; });
      out.push(h.path(d, A.fin));
      trous.push(c);
    };
    out.push(`<g clip-path="url(#${id}-sil)">`);
    for (let i = 0; i < jours; i++) {
      if (i % 3 === 2) trou('int', Math.PI * (1.2 + 0.6 * ((i * 0.37) % 1)), 0.25 + r() * 0.35, Rr * (0.06 + r() * 0.02));
      else trou('ext', Math.PI * (0.12 + 0.76 * ((i * 0.618) % 1)), 0.25 + r() * 0.4, Rr * (0.07 + r() * 0.025));
    }
    out.push('</g>');
    // le trait du dessous : quelques longs brins qui suivent la silhouette, pour poser la forme
    const sb = bas.slice().reverse();
    let bordure = '';
    for (let k = 0; k < 4; k++) {
      const i0 = Math.floor(k * sb.length / 4) + (k ? -2 : 0), i1 = Math.min(sb.length - 1, Math.floor((k + 1) * sb.length / 4) + 2);
      bordure += lisse(sb.slice(Math.max(0, i0), i1 + 1).map(([x, y], j) => [x, y - 0.4 - 0.5 * Math.sin(j * 0.7 + k)])) + ' ';
    }
    const arcs = (pts, nb, dy) => { let d = ''; for (let k = 0; k < nb; k++) { const i0 = Math.floor(k * pts.length / nb), i1 = Math.floor((k + 1) * pts.length / nb) + 2; d += lisse(pts.slice(i0, Math.min(pts.length, i1 + 1)).map(([x, y], j) => [x, y + dy * Math.sin(j * 0.9 + k * 2)])) + ' '; } return d; };
    const ouvP = ell(Ri * 0.99, Hb + dome * 0.2, 72); ouvP.push(ouvP[0], ouvP[1]);
    bordure += arcs(ouvP, 7, 0.5);
    bordure += arcs(haut, 4, 0.4);
    out.push(h.path(bordure, A.detail));
    const creux = pr(0, 0, zf), bas0 = Math.max(...bas.map(p => p[1]));
    return { svg: out.join('\n'), creux, poudre: poudreP, trous, bas: bas0, haut: Math.min(...haut.map(p => p[1])), bordAvant: pr(0, Ri, Hb), Hb, zf, Rf, Ri, ouv: { cy: yG - Hb * ct, rx: Ri, ry: Ri * st } };
  };
  // La boule refermée : des brins enroulés en grands cercles, comme une pelote lâche ; ky l'écrase (un tas).
  const boule = (cx, cy, R, graine, { ky = 1, densite = 1 } = {}) => {
    const r = gen(graine), out = [h.ellipse(cx, cy, R * 0.97, R * 0.97 * ky, A.blanc)];
    let fin = '', moyen = '';
    const gc = (th, tilt, a0, span) => {
      const pts = [], n = Math.max(5, Math.round(span / 15));
      for (let k = 0; k <= n; k++) {
        const a = deg(a0 + span * k / n), x = Math.cos(a) * R * 0.94, y = Math.sin(a) * R * 0.94 * Math.abs(Math.cos(tilt));
        pts.push([cx + x * Math.cos(th) - y * Math.sin(th), cy + (x * Math.sin(th) + y * Math.cos(th)) * ky]);
      }
      return lisse(pts) + ' ';
    };
    const nb = Math.round(R * 0.55 * densite);
    for (let i = 0; i < nb; i++) fin += gc(deg(i * 180 / nb + r() * 12), deg(30 + r() * 55), r() * 360, 80 + r() * 110);
    for (let k = 0; k < 8; k++) {
      const a0 = k * 45 + r() * 15, rr = R * (0.95 + r() * 0.06);
      moyen += lisse(arc(cx, cy, rr, rr * ky, a0, a0 + 36 + r() * 10, 5)) + ' ';
    }
    for (let i = 0; i < 9; i++) {
      const a = deg(r() * 360), L = 4 + r() * 6, b = a + deg((r() - 0.5) * 70);
      const x0 = cx + Math.cos(a) * R * 0.97, y0 = cy + Math.sin(a) * R * 0.97 * ky;
      fin += `M ${f(x0)} ${f(y0)} q ${f(Math.cos(b) * L * 0.5)} ${f(Math.sin(b) * L * 0.5 * ky + (r() - 0.5) * 2)} ${f(Math.cos(b) * L)} ${f(Math.sin(b) * L * ky)} `;
    }
    out.push(h.path(fin, A.fin), h.path(moyen, A.detail));
    return out.join('\n');
  };

  // ── Le bois ─────────────────────────────────────────────────────────────────────────────────────────
  // Un bâton droit de a à b, de rayon ra au pied et rb en haut ; le bout coupé en b se voit (une ellipse).
  const baton = (a, b, ra, rb, gris = false, fort = false) => {
    // fort : un bâton qui borde l'ouverture, au trait de contour
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]), u = [(b[0] - a[0]) / L, (b[1] - a[1]) / L], n = [-u[1], u[0]];
    const pts = [add(a, mul(n, ra)), add(b, mul(n, rb)), add(b, mul(n, -rb)), add(a, mul(n, -ra))];
    const ang = Math.atan2(n[1], n[0]) * 180 / Math.PI;
    return [h.chemin(pts, gris ? A.loin : A.blanc, true),
      h.path(`M ${f(pts[0][0])} ${f(pts[0][1])} L ${f(pts[1][0])} ${f(pts[1][1])} M ${f(pts[3][0])} ${f(pts[3][1])} L ${f(pts[2][0])} ${f(pts[2][1])}`, fort ? A.contour : gris ? A.fin : A.detail),
      `<ellipse cx="${f(b[0])}" cy="${f(b[1])}" rx="${f(rb)}" ry="${f(rb * 0.5)}" transform="rotate(${f(ang)} ${f(b[0])} ${f(b[1])})" fill="${gris ? '#E6E6E6' : '#FFFFFF'}" ${A.detail.replace('fill="none" ', '')}/>`].join('\n');
  };
  // Une pile de bois rond vue de trois quarts : les bouts vers nous, le fût qui fuit vers le haut à droite.
  const FUITE = [0.86, -0.5];
  const pile = (x0, yS, r, rangs, long, graine, { cernes = false } = {}) => {
    const rnd = gen(graine), items = [];
    rangs.forEach((nb, j) => {
      const xg = x0 + (rangs[0] - nb) * r + r;
      for (let i = 0; i < nb; i++) items.push({ cx: xg + i * 2 * r + (rnd() - 0.5) * r * 0.15, cy: yS - r - j * r * 1.72, r: r * (0.9 + rnd() * 0.18), l: long * (0.88 + rnd() * 0.2) });
    });
    const tr = it => it.r > 6 ? A.arete : A.detail;
    const futs = [], bouts = [];
    items.slice().reverse().forEach(it => {
      const b = [it.cx + FUITE[0] * it.l, it.cy + FUITE[1] * it.l], n = [-FUITE[1], FUITE[0]];
      const p = [add([it.cx, it.cy], mul(n, it.r)), add(b, mul(n, it.r)), add(b, mul(n, -it.r)), add([it.cx, it.cy], mul(n, -it.r))];
      futs.push(h.path(`M ${f(p[0][0])} ${f(p[0][1])} L ${f(p[1][0])} ${f(p[1][1])} A ${f(it.r)} ${f(it.r)} 0 0 0 ${f(p[2][0])} ${f(p[2][1])} L ${f(p[3][0])} ${f(p[3][1])} Z`, blanc(tr(it))));
    });
    items.forEach(it => {
      bouts.push(h.cercle(it.cx, it.cy, it.r, blanc(tr(it))));
      if (cernes) bouts.push(h.cercle(it.cx, it.cy, it.r - 2.4, A.fin), h.cercle(it.cx + 0.6, it.cy - 0.4, it.r * 0.45, A.fin), h.cercle(it.cx + 0.9, it.cy - 0.6, 1.1, A.plein));
      else if (it.r > 3) bouts.push(h.cercle(it.cx + 0.3, it.cy - 0.2, it.r * 0.32, A.fin));
    });
    return { svg: futs.concat(bouts).join('\n'), items };
  };

  // ── Le tipi ─────────────────────────────────────────────────────────────────────────────────────────
  // Vu de trois quarts, d'un peu au-dessus (PHI) : le sol est un plan (un aplat gris en ellipse) et chaque pied de
  // bâton se pose sur le cercle de base, projeté en ellipse sur ce plan. Les bâtons sont droits, dressés vers un
  // même sommet et prolongés au-delà : ils se croisent en haut. Derrière (le pied dans la moitié loin du cercle) :
  // en gris, peints d'abord. L'ouverture est un quart du tour, devant à gauche ; les deux bâtons qui la bordent
  // sont au trait de contour. Repère : X vers la droite, D vers nous, Z vers le haut ; (cx, yB) le centre du sol.
  const PHI = deg(18), SP = Math.sin(PHI), CP = Math.cos(PHI);
  const P3 = (cx, yB, X, D, Z) => [cx + X, yB + D * SP - Z * CP];
  const tipi = (cx, yB, R, H, graine, { ouv = [62, 152], N = 13, ra = 2.6, rb = 1.9, dedans = '', sol = 1.75 } = {}) => {
    const r = gen(graine), S = P3(cx, yB, 0, 0, H);
    const batons = [], arc = 360 - (ouv[1] - ouv[0]);
    for (let k = 0; k < N; k++) {
      const bord = k === 0 || k === N - 1;
      const p = ouv[1] + k * arc / (N - 1) + (bord ? 0 : (r() - 0.5) * 9);
      const s = [S[0] + (r() - 0.5) * 4, S[1] + (r() - 0.5) * 3];
      const pro = 0.1 + r() * 0.09;
      const X = Math.cos(deg(p)) * R, D = Math.sin(deg(p)) * R, b = P3(cx, yB, X, D, 0);
      batons.push({ p, D, bord, b, t: [b[0] + (s[0] - b[0]) * (1 + pro), b[1] + (s[1] - b[1]) * (1 + pro)] });
    }
    const derriere = batons.filter(b => b.D < 0 && !b.bord).sort((a, b) => a.D - b.D).map(b => baton(b.b, b.t, ra, rb, true));
    const devant = batons.filter(b => b.D >= 0 || b.bord).sort((a, b) => a.D - b.D).map(b => baton(b.b, b.t, ra, rb, false, b.bord));
    const [kx, ky, dx0] = Array.isArray(sol) ? sol : [sol, sol, 0];
    const sol0 = h.ellipse(cx + dx0 * R, yB, R * kx, R * ky * SP, A.loin);
    const om = deg((ouv[0] + ouv[1]) / 2);
    // un point de l'ouverture à la hauteur z (au milieu du vide entre les deux bâtons qui la bordent)
    const ouvA = z => P3(cx, yB, Math.cos(om) * R * (1 - z / H) * 0.8, Math.sin(om) * R * (1 - z / H) * 0.8, z);
    const bords = batons.filter(b => b.bord).map(b => ({ pied: b.b, sommet: b.t }));
    const segs = batons.filter(b => b.D >= 0 || b.bord).map(b => [b.b, b.t]);
    return { svg: [sol0, ...derriere, dedans, ...devant].join('\n'), sommet: S, ouvA, om, bords, segs };
  };

  // deux segments se coupent-ils (à l'écran) ? sert à garder les flèches hors des bâtons de devant
  const coupeSeg = (a, b, c, d) => {
    const o = (p, q, r) => Math.sign((q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0]));
    return o(a, b, c) !== o(a, b, d) && o(c, d, a) !== o(c, d, b);
  };
  const libre = (a, b, segs, marge = 4) => segs.every(([c, d]) => {
    const n = [-(d[1] - c[1]), d[0] - c[0]], L = Math.hypot(...n), k = [n[0] / L * marge, n[1] / L * marge];
    return !coupeSeg(a, b, add(c, k), add(d, k)) && !coupeSeg(a, b, add(c, mul(k, -1)), add(d, mul(k, -1)));
  });

  // ── La flamme ───────────────────────────────────────────────────────────────────────────────────────
  const langue = (x, yB, l, ht, pench = 0) => {
    const d = `M ${f(x - l / 2)} ${f(yB)} C ${f(x - l / 2 - l * 0.12)} ${f(yB - ht * 0.38)} ${f(x + pench * 0.2 - l * 0.38)} ${f(yB - ht * 0.6)} ${f(x + pench)} ${f(yB - ht)} `
      + `C ${f(x + pench * 0.5 + l * 0.12)} ${f(yB - ht * 0.66)} ${f(x + l / 2 + l * 0.16)} ${f(yB - ht * 0.42)} ${f(x + l / 2)} ${f(yB)} Z`;
    const di = `M ${f(x - l * 0.2)} ${f(yB - ht * 0.08)} C ${f(x - l * 0.28)} ${f(yB - ht * 0.3)} ${f(x + pench * 0.2 - l * 0.12)} ${f(yB - ht * 0.42)} ${f(x + pench * 0.45)} ${f(yB - ht * 0.58)} `
      + `C ${f(x + pench * 0.3 + l * 0.12)} ${f(yB - ht * 0.38)} ${f(x + l * 0.24)} ${f(yB - ht * 0.24)} ${f(x + l * 0.18)} ${f(yB - ht * 0.06)}`;
    return [h.path(d, blanc(A.arete)), h.path(di, A.detail)].join('\n');
  };
  const flammes = (x, yB, l, ht) => [
    langue(x - l * 0.5, yB, l * 0.5, ht * 0.52, -l * 0.18),
    langue(x + l * 0.48, yB, l * 0.5, ht * 0.6, l * 0.16),
    langue(x, yB, l * 0.72, ht, -l * 0.05),
  ].join('\n');

  // ═══ La géométrie des vues ═══════════════════════════════════════════════════════════════════════════

  // Vue 1 : les quatre tas, du plus fin au plus gros, sur une même ligne de sol.
  const tas = z => {
    const yS = z.h - 10, x1 = 4, x2 = x1 + 70, x3 = x2 + 70, x4 = x3 + 84;
    return { yS, x1, x2, x3, x4,
      fin: pile(x2, yS, 2.2, [6, 5, 4, 3, 2], 44, 5),
      moy: pile(x3, yS, 5, [4, 3, 2], 50, 7),
      gros: pile(x4, yS, 13, [3, 2], 58, 9, { cernes: true }) };
  };
  // Vue 2 et 6 : le tipi. L'ouverture regarde devant à gauche (OUV), le vent vient de là.
  const OUV = [70, 166];
  const tipi2 = z => ({ cx: z.l * 0.62, yB: z.h - 26, R: 50, H: 92 });
  const tipi6 = z => ({ cx: z.l * 0.42, yB: z.h - 36, R: 64, H: 122 });
  // Vue 4 : l'étincelle. La tige monte de sa pointe (au bord du nid) vers son manche, à 50° ; le couteau la
  // croise presque d'équerre, son manche vers le haut à gauche. Tout en mm × e.
  const RHO = -50, KAP = -138;
  const u = [Math.cos(deg(RHO)), Math.sin(deg(RHO))], nu = [-u[1], u[0]];
  const kd = [Math.cos(deg(KAP)), Math.sin(deg(KAP))], kn = [-kd[1], kd[0]];
  const etincelle = z => {
    const e = 0.8, G = z.h - 6, Ro = 56;
    const nx = Math.round(z.l * 0.3), g0 = nidGeo(nx, 0, Ro), ny = G - g0.bas;
    const nidC = [nx, ny + g0.creux[1]];               // le fond du creux
    const T = [nx + 8, ny - Ro * 0.62 * 0.78 * 0.82 - 16];   // la pointe de la tige, au-dessus du creux                  // le centre du creux, sous la pointe
    const C = add(T, mul(u, 40 * e));                 // le dos du couteau sur la tige
    const P = (s, t) => add(add(T, mul(u, s * e)), mul(nu, t * e));
    const Q = (s, t) => add(add(C, mul(kd, s * e)), mul(kn, t * e));
    return { e, G, T, nidC, C, P, Q, nx, ny, Ro };
  };
  // Vue 5 : la tête de profil (le visage à droite), la boule à une longueur d'avant-bras devant la bouche.
  const souffler = z => {
    const e = 0.5;
    const tete = F.teteSimple({ x: 60, y: z.h - 92, echelle: e, bouche: 'ouverte', ouverture: 0.25, cou: 80 });
    const L0 = tete.bouche, R = 22;
    const B = [L0[0] + 255 * e + R, L0[1] + 4];
    const oM = { x: B[0] - 2, y: B[1] + R * 1.1, pose: 'coupe', vue: 'pouce', echelle: e, angle: -34 };
    const main = F.mainSimple({ ...oM, avantbras: { longueur: 120 } });
    return { e, tete, B, R, L0, oM, poignet: main.poignet };
  };

  return {
    ref: '13-40',
    titre: 'Le ferrocérium, du tri du bois à la flamme',
    desc: 'Six vues dans l’ordre des gestes. Les quatre tas triés côte à côte : une touffe d’amadou, une botte de petit bois de moins de 2 cm, une pile de bois de 2 à 5 cm, une pile de bûches de moins de 15 cm. Le tipi : des bâtons droits dressés en cône lâche, qui se croisent au sommet, avec une ouverture du côté d’où vient le vent. Le nid vu d’en haut : des fibres écharpées qui tournent autour d’un creux, de la poudre de tige au fond. L’étincelle : la pointe de la tige posée au bord du nid, le dos du couteau appuyé en travers de la tige et tenu immobile dans la main droite, la tige tirée vers soi par la main gauche, la gerbe qui tombe dans le creux. Puis la boule refermée, tenue au creux de la main à une longueur d’avant-bras du visage, soufflée en continu, la fumée qui monte. Enfin le nid en flammes glissé sous le tipi par l’ouverture, le bois de 2 à 5 cm qui attend à côté.',
    format: 'pleine',
    disposition: [['tas', 'tipi'], ['nid', 'etincelle'], ['souffler', 'glisser']],
    hauteurs: [0.82, 1.42, 1.08],
    largeurs: [[1.45, 1], [0.78, 1.42], [1.12, 1]],
    vues: {
      // ── 1. Trier ───────────────────────────────────────────────────────────────────────────────────
      tas: {
        titre: 'Trier en quatre tas',
        dessin: z => {
          const t = tas(z);
          return [h.ligne(0, t.yS, z.l, t.yS, A.arete), boule(t.x1 + 28, t.yS - 12, 26, 11, { ky: 0.46 }), t.fin.svg, t.moy.svg, t.gros.svg].join('\n');
        },
        renvois: z => {
          const t = tas(z), y = 14;
          const haut = p => p.items[p.items.length - 1];
          const hf = haut(t.fin), hm = haut(t.moy), hg = haut(t.gros);
          return [
            { n: 1, rond: [t.x1 + 20, y], cible: [t.x1 + 26, t.yS - 23], texte: 'amadou fin' },
            { n: 2, rond: [t.x2 + 14, y], cible: [hf.cx, hf.cy - hf.r - 0.5], texte: 'bois de moins de 2 cm' },
            { n: 3, rond: [t.x3 + 16, y], cible: [hm.cx, hm.cy - hm.r - 0.5], texte: 'bois de 2 à 5 cm' },
            { n: 4, rond: [t.x4 + 20, y], cible: [hg.cx - 3, hg.cy - hg.r - 0.5], texte: 'bûches de moins de 15 cm' },
          ];
        },
      },
      // ── 2. Le tipi ─────────────────────────────────────────────────────────────────────────────────
      tipi: {
        titre: 'Monter le tipi',
        dessin: z => {
          const g = tipi2(z), t = tipi(g.cx, g.yB, g.R, g.H, 21, { ouv: OUV, sol: 1.55 });
          // le vent : deux flèches à mi-hauteur de l'ouverture, qui viennent de loin et entrent dedans
          // le vent vient de la gauche, devant : deux flèches parallèles à mi-hauteur de l'ouverture, qui y entrent ; elles
          // passent devant le bâton de gauche, avec un liseré blanc
          const z1 = g.H * 0.34, z2 = g.H * 0.2, b1 = t.ouvA(z1), b2 = t.ouvA(z2), w = 150;
          const dep = (b, zh) => { const o = t.ouvA(zh), q = P3(g.cx, g.yB, Math.cos(deg(w)) * g.R * 2.7, Math.sin(deg(w)) * g.R * 2.7, zh); return [b[0] + q[0] - o[0], b[1] + q[1] - o[1]]; };
          const fl = (a, b) => [h.path(`M ${f(a[0])} ${f(a[1])} L ${f(b[0] - 3)} ${f(b[1])}`, 'fill="none" stroke="#FFFFFF" stroke-width="3.4" stroke-linecap="round"'),
            h.fleche(`M ${f(a[0])} ${f(a[1])} L ${f(b[0])} ${f(b[1])}`, A.detail)].join('\n');
          return [t.svg, fl(dep(b1, z1), b1), fl(dep(b2, z2), b2)].join('\n');
        },
        renvois: z => {
          const g = tipi2(z), t = tipi(g.cx, g.yB, g.R, g.H, 21, { ouv: OUV, sol: 1.55 });
          const o = t.ouvA(g.H * 0.06);
          return [
            { n: 5, rond: [z.l - 14, g.yB - g.H * 0.62], cible: P3(g.cx, g.yB, g.R * 0.42, -g.R * 0.1, g.H * 0.45), texte: 'cône lâche, du vide entre' },
            { n: 6, rond: [o[0] - 16, z.h - 11], cible: o, texte: 'ouverture du côté du vent' },
          ];
        },
      },
      // ── 3. Le nid ──────────────────────────────────────────────────────────────────────────────────
      nid: {
        titre: 'Faire le nid',
        dessin: z => {
          const n = ecuelle(z.l / 2, z.h * 0.58, z.l * 0.31, 3, { sol: 1.45 });
          return n.svg;
        },
        renvois: z => {
          const n = ecuelle(z.l / 2, z.h * 0.58, z.l * 0.31, 3, { sol: 1.45 });
          const j = n.trous.slice().sort((a, b) => a[0] - b[0])[0];
          return [
            { n: 7, rond: [16, j[1] + 46], cible: j, texte: 'fibres lâches : le jour passe' },
            { n: 8, rond: [z.l - 16, z.h * 0.18], cible: [n.poudre[0] + 2, n.poudre[1] - 2], texte: 'poudre de tige dans le creux' },
          ];
        },
      },
      // ── 4. L'étincelle ─────────────────────────────────────────────────────────────────────────────
      etincelle: {
        titre: 'Tirer la tige, le couteau immobile',
        dessin: z => {
          const g = etincelle(z), { e, G, T, nidC, C, P, Q } = g, out = [];
          out.push(h.ligne(0, G, z.l, G, A.arete));
          out.push(nid(g.nx, g.ny, g.Ro, 4));
          // la gerbe : un éventail d'étincelles qui part du dos du couteau et retombe dans le creux
          const r = gen(21);
          let gerbe = '', etoiles = '';
          const S = add(C, mul(u, -3 * e)), D = [nidC[0] - S[0], nidC[1] - S[1]], L = Math.hypot(...D), a0 = Math.atan2(D[1], D[0]);
          for (let i = 0; i < 9; i++) {
            const a = a0 + deg((i - 4) * 7 + (r() - 0.5) * 4), l = L * (0.82 + r() * 0.22);
            const q = t => [S[0] + Math.cos(a) * l * t, S[1] + Math.sin(a) * l * t + 6 * t * t];
            [[0.14, 0.26], [0.36, 0.46], [0.56, 0.64], [0.74, 0.8]].forEach(([t0, t1]) => {
              const p0 = q(t0 + r() * 0.03), p1 = q(t1);
              gerbe += `M ${f(p0[0])} ${f(p0[1])} L ${f(p1[0])} ${f(p1[1])} `;
            });
            const p = q(0.9 + r() * 0.06);
            etoiles += h.cercle(p[0], p[1], 1.1, A.plein);
          }
          // la tige : 100 mm de métal, le bout arrondi ; 70 mm de manche, dans la main gauche
          const tige = [
            h.path(`M ${f(P(100, -5)[0])} ${f(P(100, -5)[1])} L ${f(P(0, -5)[0])} ${f(P(0, -5)[1])} Q ${f(P(-5, 0)[0])} ${f(P(-5, 0)[1])} ${f(P(0, 5)[0])} ${f(P(0, 5)[1])} L ${f(P(100, 5)[0])} ${f(P(100, 5)[1])} Z`, A.hachure('metal', 'arete')),
            h.path(lisse([P(98, -9), P(160, -9.5), P(168, -7), P(170, 0), P(168, 7), P(160, 9.5), P(98, 9)]) + ' Z', A.hachure('bois', 'arete')),
          ].join('\n');
          const oT = { x: P(134, 0)[0], y: P(134, 0)[1], pose: 'prise-manche', vue: 'paume', rotation: [-25, 0, 0], diametre: 19, echelle: e, cote: 'gauche', angle: 198 };
          oT.angle = placer(oT, RHO);
          // le couteau : la lame croise la tige, son dos (le trait fort) sur le métal ; le manche dans la main droite
          const lame = h.path(`M ${f(Q(62, 0)[0])} ${f(Q(62, 0)[1])} L ${f(Q(-24, 0)[0])} ${f(Q(-24, 0)[1])} Q ${f(Q(-36, 1)[0])} ${f(Q(-36, 1)[1])} ${f(Q(-42, 6)[0])} ${f(Q(-42, 6)[1])} `
            + `C ${f(Q(-30, 16)[0])} ${f(Q(-30, 16)[1])} ${f(Q(-12, 21)[0])} ${f(Q(-12, 21)[1])} ${f(Q(8, 21)[0])} ${f(Q(8, 21)[1])} L ${f(Q(62, 21)[0])} ${f(Q(62, 21)[1])} Z`, blanc(A.arete));
          const biseau = h.path(`M ${f(Q(60, 13)[0])} ${f(Q(60, 13)[1])} L ${f(Q(4, 13)[0])} ${f(Q(4, 13)[1])} Q ${f(Q(-26, 12)[0])} ${f(Q(-26, 12)[1])} ${f(Q(-40, 7)[0])} ${f(Q(-40, 7)[1])}`, A.fin);
          const dos = h.chemin([Q(-23, 0), Q(62, 0)], A.contour);
          const garde = h.chemin([Q(62, -3), Q(67, -3), Q(67, 24), Q(62, 24)], blanc(A.arete), true);
          const mancheK = h.path(lisse([Q(67, -1), Q(110, -2), Q(158, -1.5), Q(168, 3), Q(168, 18), Q(158, 22.5), Q(110, 23), Q(67, 22)], true), A.hachure('bois', 'arete'));
          const couteau = [lame, biseau, dos, garde, mancheK].join('\n');
          const oK = { x: Q(116, 10.5)[0], y: Q(116, 10.5)[1], pose: 'prise-manche', vue: 'paume', rotation: [-25, 0, 0], diametre: 25, echelle: e, cote: 'droite', angle: 152 };
          oK.angle = placer(oK, KAP);
          out.push(F.mainSimple({ ...oT, objet: tige, avantbras: { longueur: 75 } }).svg);
          out.push(h.path(gerbe, A.detail), etoiles);
          out.push(F.mainSimple({ ...oK, objet: couteau, avantbras: { longueur: 75 } }).svg);
          // le geste : la tige tirée vers soi, le long de son axe
          out.push(h.geste(`M ${f(P(186, 0)[0])} ${f(P(186, 0)[1])} L ${f(P(240, 0)[0])} ${f(P(240, 0)[1])}`));
          // le point à contrôler : le dos du couteau, qui ne bouge pas
          out.push(h.controle(C[0], C[1], 9));
          return coupe('etincelle', z, out.join('\n'));
        },
        renvois: z => {
          const g = etincelle(z), { T, nidC, C, P } = g;
          return [
            { n: 9, rond: [T[0] - 62, T[1] - 30], cible: add(T, [-3, 1]), texte: 'pointe à un doigt du nid' },
            { n: 10, rond: [C[0] + 40, C[1] + 16], cible: add(C, [8.5, 3]), texte: 'cercle : couteau immobile' },
            { n: 11, rond: [P(228, 34)[0], P(228, 34)[1]], cible: P(222, 3), texte: 'flèche : tige tirée vers soi' },
            { n: 12, rond: [Math.max(16, nidC[0] - 66), nidC[1] - 4], cible: [nidC[0] - 12, nidC[1] - 2], texte: 'la gerbe tombe dans le creux' },
          ];
        },
      },
      // ── 5. Souffler ────────────────────────────────────────────────────────────────────────────────
      souffler: {
        titre: 'Refermer et souffler',
        dessin: z => {
          const s = souffler(z), { e, B, R, tete, L0 } = s, out = [];
          // la main : le creux sous la boule, l'avant-bras qui descend vers le corps
          out.push(F.mainSimple({ ...s.oM, objet: boule(B[0], B[1], R, 8), avantbras: { longueur: 120 } }).svg);
          out.push(String(tete));
          // la fumée : un filet mince au-dessus de la boule, qui s'épaissit en montant
          const x0 = B[0] + 3, y0 = B[1] - R - 2, bord = sgn => {
            const pts = [];
            for (let y = y0; y >= 8; y -= 5) { const m = y0 - y; pts.push([x0 + sgn * (1.5 + m * 0.2) + 5 * Math.sin(m / 15), y]); }
            return pts;
          };
          out.push(h.path(lisse(bord(-1)), A.detail), h.path(lisse(bord(1)), A.detail));
          out.push(h.path(lisse(bord(0.2).slice(3).map(([x, y], i) => [x + 2.5 * Math.sin(i / 1.8), y])), A.fin));
          // le souffle, en continu, de la bouche à la boule
          out.push(h.fleche(`M ${f(L0[0] + 10)} ${f(L0[1] - 3)} L ${f(B[0] - R - 8)} ${f(B[1] - 5)}`, A.cache));
          out.push(h.fleche(`M ${f(L0[0] + 10)} ${f(L0[1] + 4)} L ${f(B[0] - R - 8)} ${f(B[1] + 4)}`, A.cache));
          return coupe('souffler', z, out.join('\n'));
        },
        renvois: z => {
          const { B, R, L0, poignet } = souffler(z), mx = (L0[0] + B[0] - R) / 2;
          return [
            { n: 13, rond: [B[0] - R - 20, B[1] - R - 26], cible: [B[0] - R * 0.55, B[1] - R * 0.6], texte: 'en boule, sans serrer' },
            { n: 14, rond: [B[0] - 2 - 0.83 * 60 - 0.56 * 40, B[1] + R * 1.1 + 0.56 * 60 - 0.83 * 40], cible: [B[0] - 2 - 0.83 * 60 - 0.56 * 11, B[1] + R * 1.1 + 0.56 * 60 - 0.83 * 11], texte: 'à un avant-bras du visage' },
            { n: 15, rond: [mx - 6, L0[1] - 40], cible: [mx - 6, L0[1] - 6], texte: 'souffler sans à-coups' },
            { n: 16, rond: [z.l - 14, 16], cible: [B[0] + 12, 34], texte: 'fumée mince, puis épaisse' },
          ];
        },
      },
      // ── 6. Glisser ─────────────────────────────────────────────────────────────────────────────────
      glisser: {
        titre: 'Glisser le nid sous le tipi',
        dessin: z => {
          const g = tipi6(z), out = [], t0 = tipi(g.cx, g.yB, g.R, g.H, 29, { ouv: OUV, sol: 1.5 });
          // le nid au centre du cercle de base, posé sur le sol
          const Ro = 20, gN = nidGeo(0, 0, Ro, { creux: 0.3, theta: 18 }), rr = Ro * 0.35;
          const nc = P3(g.cx, g.yB, Math.cos(t0.om) * g.R * 0.42, Math.sin(t0.om) * g.R * 0.42, 0), ny = nc[1] + (Ro - rr) * SP - gN.bas;
          const dedans = [nid(nc[0], ny, Ro, 17, { creux: 0.3, poudre: false, theta: 18 }), flammes(nc[0] + 2, ny + 2, 30, g.H * 0.5)].join('\n');
          const t = tipi(g.cx, g.yB, g.R, g.H, 29, { ouv: OUV, dedans, sol: [2.05, 1.5, 0.45] });
          out.push(t.svg);
          const a = P3(g.cx, g.yB, Math.cos(t.om) * g.R * 2.3, Math.sin(t.om) * g.R * 2.3, 3), b = P3(g.cx, g.yB, Math.cos(t.om) * g.R * 0.62, Math.sin(t.om) * g.R * 0.62, 3);
          out.push(h.geste(`M ${f(a[0])} ${f(a[1])} L ${f(b[0])} ${f(b[1])}`));
          // le bois de 2 à 5 cm, prêt à côté
          out.push(pile(g.cx + g.R * 1.3, g.yB + 10, 4.5, [3, 2], 30, 31).svg);
          return out.join('\n');
        },
        renvois: z => {
          const g = tipi6(z), t = tipi(g.cx, g.yB, g.R, g.H, 29, { ouv: OUV, sol: 1.5 });
          const a = P3(g.cx, g.yB, Math.cos(t.om) * g.R * 1.9, Math.sin(t.om) * g.R * 1.9, 3);
          return [
            { n: 17, rond: [16, a[1] - 34], cible: [a[0], a[1] - 2], texte: 'flèche : par l’ouverture' },
            { n: 18, rond: [z.l - 16, g.yB - 56], cible: [g.cx + g.R * 1.3 + 14, g.yB - 4], texte: 'le 2 à 5 cm, quand ça crépite' },
          ];
        },
      },
    },
  };
};
