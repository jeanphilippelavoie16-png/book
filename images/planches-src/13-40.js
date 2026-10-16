// Planche 13-40. Le ferrocérium, du tri du bois à la flamme. Refaite depuis zéro le 16 octobre 2026
// (règle 12 : JP, sur la version retouchée, « les mains, l'amadou, le tipi, c'est laid en câlisse »), puis corrigée
// après le second regard du 16 octobre (tipi posé sur un sol en plan, ouverture franche, nid en écuelle, prises).
//
// Six vues, dans l'ordre des gestes du chapitre (étapes 10 à 17) : trier les quatre tas ; monter le tipi,
// l'ouverture face au vent ; faire le nid ; faire l'étincelle (le couteau immobile, la tige tirée) ; refermer et
// souffler ; glisser le nid sous le tipi. Les repères 1 à 18 sont ceux du texte.
//
// Mains, têtes : les moteurs validés seulement (brief-agent.md).
//   la tige      mainSimple 'prise-manche', vue 'paume', rotation [-25, 0, 0], main gauche, en haut à gauche, le pouce
//                vers le haut ; l'avant-bras dans sa direction naturelle, jusqu'au bord de la vue ;
//   le couteau   mainSimple 'prise-manche', vue 'paume', rotation [-25, 0, 0], main droite, l'avant-bras qui sort par le
//                haut ; la lame du côté du pouce, presque à l'horizontale, la pointe à l'opposé du nid ;
//   la boule     mainSimple 'coupe-c', vue 'pouce', diamètre 80 mm (le C fermé sur une boule de 97), angle −15 : la paume en l'air sous la boule, les
//                doigts qui montent de l'autre côté, le pouce du côté du visage ; l'avant-bras jusqu'au bord ;
//   la tête      teteSimple, de profil, la bouche entrouverte (souffler), le cou prolongé jusqu'au bord.
// L'amadou est fait de brins posés en 3D sur une écuelle (paroi, bord, creux, fond), croisés en tous sens, avec des
// jours où l'on voit le sol ; la boule, de grands cercles enroulés. Le tipi est vu de trois quarts, d'un peu au-dessus :
// le sol est un plan gris, chaque pied s'y pose ; l'ouverture est un quart du tour, bordée de deux bâtons au trait de
// contour. Aucune cote : les calibres (moins de 2 cm, 2 à 5 cm, moins de 15 cm) sont des bornes de tri, dans la légende.

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
  // le même, et des deux sens possibles, celui où le pouce tombe du côté voulu (cote(m) > 0)
  const orienter = (o, dir, cote) => {
    const a = placer({ ...o, angle: 0 }, dir);
    const m = F.mainSimple({ ...o, angle: a, avantbras: false });
    return cote(m) > 0 ? a : a + 180;
  };

  // ── L'amadou : des brins ────────────────────────────────────────────────────────────────────────────
  // ── Le nid : une écuelle de fibres ───────────────────────────────────────────────────────────────────
  // Une poignée de fibres effilochées, creusée au milieu : une paroi épaisse et arrondie, un bord, un creux au fond
  // plat de fibres plus fines, un petit tas de poudre au centre. Vue d'en haut à theta. Les brins sont posés sur les
  // surfaces en 3D, chacun dans une direction au hasard (ils se croisent en tous sens), et on ne garde que ce qui
  // regarde vers nous. Entre les brins de la paroi, des jours : on y voit le sol au travers (le même gris).
  // (cx, yG) : le point du sol sous le centre ; Rr : le rayon au bord. Repère : X à droite, D vers nous, Z en haut.
  let nEcu = 0;
  const ecuelle = (cx, yG, Rr, graine, { theta = 34, poudre = true, jours = 7, densite = 1, sol = 0, fond = true, grandJour = false } = {}) => {
    const r = gen(graine), th = deg(theta), st = Math.sin(th), ct = Math.cos(th), id = `ecu-${++nEcu}-1340`;
    const Hb = Rr * 0.7, w = Rr * 0.34, Ri = Rr - w, Rb = Rr * 0.62, zf = Hb * 0.52, Rf = Ri * 0.66, dome = w * 0.12;
    // le contour n'est pas un cercle parfait : une poignée de fibres a des bosses
    const ph1 = r() * 6, ph2 = r() * 6, bosse = a => 1 + 0.045 * Math.sin(3 * a + ph1) + 0.03 * Math.sin(7 * a + ph2);
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
        let u = dom.u0 + r() * (dom.u1 - dom.u0), v = dom.v0 + r() * (dom.v1 - dom.v0);
        // une direction au hasard, mais jamais couchée le long du tour (ce qui ferait des anneaux)
        let a = deg(22 + r() * 136) * (r() < 0.5 ? 1 : -1); if (nom === 'fond' || nom === 'int') a = r() * Math.PI * 2;
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
    const ell = (rad, z, n = 64) => { const o = []; for (let k = 0; k < n; k++) { const a = k / n * 2 * Math.PI; o.push(pr(...pol(rad * bosse(a), a, z))); } return o; };
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
    // des bosses sur le contour (le haut suit celles du bord, le bas les siennes)
    haut.forEach(p => { const a = Math.acos(Math.max(-1, Math.min(1, (p[0] - cx) / Rr))); p[1] -= Rr * st * (bosse(2 * Math.PI - a) - 1) * 1.2; });
    bas.forEach(p => { const a = Math.acos(Math.max(-1, Math.min(1, (p[0] - cx) / Rr))); p[1] += Rr * 0.6 * (bosse(a + 1.3) - 1); });
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
      // un petit tas net : un monticule au sommet doux, piqué de grains
      const rx = Rf * 0.34, ht = Rf * 0.36, X0 = poudreP[0], Y0 = poudreP[1];
      const d = `M ${f(X0 - rx)} ${f(Y0)} C ${f(X0 - rx * 0.55)} ${f(Y0 - ht * 0.2)} ${f(X0 - rx * 0.3)} ${f(Y0 - ht)} ${f(X0)} ${f(Y0 - ht)} `
        + `C ${f(X0 + rx * 0.3)} ${f(Y0 - ht)} ${f(X0 + rx * 0.55)} ${f(Y0 - ht * 0.2)} ${f(X0 + rx)} ${f(Y0)} `
        + `C ${f(X0 + rx * 0.5)} ${f(Y0 + rx * st * 0.55)} ${f(X0 - rx * 0.5)} ${f(Y0 + rx * st * 0.55)} ${f(X0 - rx)} ${f(Y0)} Z`;
      out.push(h.path(d, blanc(A.detail)));
      let g = '';
      for (let i = 0; i < 40; i++) {
        const xx = (r() * 2 - 1), yy = r();
        const lim = 1 - Math.abs(xx) ** 1.6;
        g += `<circle cx="${f(X0 + xx * rx * 0.85)}" cy="${f(Y0 + 0.6 - yy * lim * ht * 0.85)}" r="${f(0.35 + r() * 0.2)}" ${A.plein}/>`;
      }
      out.push(g);
    }
    out.push('</g>');
    // le bord : un anneau bombé, des brins qui le croisent
    out.push(h.path(`${bordD} ${ouvD}`, A.blanc.replace('stroke="none"', 'stroke="none" fill-rule="evenodd"')));
    out.push(`<g clip-path="url(#${id}-sil)">` + brins('bord', Math.round(170 * dn), w * 0.7, w * 1.7, { u0: 0, u1: 2 * Math.PI, v0: 0, v1: 1 }) + '</g>');
    // la paroi de devant
    out.push(`<g clip-path="url(#${id}-paroi)">` + brins('ext', Math.round(130 * dn), Rr * 0.25, Rr * 0.6, { u0: 0, u1: Math.PI, v0: 0, v1: 1 }) + '</g>');
    // les jours : des trous entre les brins, où l'on voit le sol (le gris)
    const trous = [];
    // un jour : le vide entre quatre brins qui se croisent (deux paires presque parallèles), où l'on voit le sol. Posé
    // sur la surface : ses coins sont calculés en (u, v), puis projetés, pour qu'il suive la courbure de la paroi.
    const trou = (nom, u, v, l, kL = 2.6) => {
      const q = S[nom](u, v); if (!vis(q)) return;
      const sg = r() < 0.5 ? 1 : -1, a1 = sg * deg(20 + r() * 25), a2 = a1 - sg * deg(80 + r() * 20);
      const d1 = l * (0.7 + r() * 0.2), d2 = l * (0.6 + r() * 0.2);
      const u1 = [Math.cos(a1), Math.sin(a1)], u2 = [Math.cos(a2), Math.sin(a2)], n1 = [-u1[1], u1[0]], n2 = [-u2[1], u2[0]];
      const X = (s1, s2, e1 = 0, e2 = 0) => { const p1 = mul(n1, s1 * d1), p2 = mul(n2, s2 * d2);
        const det = u1[0] * (-u2[1]) - u1[1] * (-u2[0]), t = ((p2[0] - p1[0]) * (-u2[1]) - (p2[1] - p1[1]) * (-u2[0])) / det;
        return add(add(p1, mul(u1, t)), add(mul(u1, e1), mul(u2, e2))); };
      // (du, dv) en longueur d'arc → point de l'écran
      const E2 = w2 => P(S[nom](u + w2[0] / rayon[nom], Math.min(1, Math.max(0, v + w2[1] / larg[nom]))));
      const k = [X(-1, -1), X(-1, 1), X(1, 1), X(1, -1)].map(E2);
      out.push(h.chemin(k, A.loin, true));
      const ligne = (w0, w1) => { const p0 = E2(w0), p1 = E2(w1); return `M ${f(p0[0])} ${f(p0[1])} L ${f(p1[0])} ${f(p1[1])} `; };
      const L1 = d2 * kL, L2 = d1 * kL;
      let d = '';
      [-1, 1].forEach(s1 => { const c0 = X(s1, 0); d += ligne(add(c0, mul(u1, -L1)), add(c0, mul(u1, L1 * 0.9))); });
      [-1, 1].forEach(s2 => { const c0 = X(0, s2); d += ligne(add(c0, mul(u2, -L2 * 0.9)), add(c0, mul(u2, L2))); });
      out.push(h.path(d, A.detail));
      trous.push(P(q));
    };
    out.push(`<g clip-path="url(#${id}-sil)">`);
    let jour = null;
    for (let i = 0; i < jours; i++) {
      if (i % 4 === 3) trou('int', Math.PI * (1.25 + 0.5 * ((i * 0.37) % 1)), 0.3 + r() * 0.3, Rr * (0.08 + r() * 0.02));
      else trou('ext', Math.PI * (0.2 + 0.6 * ((i * 0.618) % 1)), 0.24 + r() * 0.16, Rr * (0.15 + r() * 0.03));
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
    bordure += arcs(haut, 4, 0.4);
    out.push(h.path(bordure, A.detail), h.path(arcs(ouvP, 6, 0.6), A.fin));
    // des fibres qui dépassent du contour : de longs brins courbes, pas des tirets
    let dep = '';
    for (let i = 0; i < 14; i++) {
      const q = sil[Math.floor(((i * 0.618) % 1) * sil.length)], vx = q[0] - cx, vy = (q[1] - (yG - Hb * ct * 0.5)) * 1.6, L0 = Math.hypot(vx, vy) || 1;
      const nx = vx / L0, ny = vy / L0, tx = -ny * (i % 2 ? 1 : -1), ty = nx * (i % 2 ? 1 : -1), L = 8 + r() * 7;
      // le brin part de dedans, longe le contour un moment, puis s'en écarte un peu
      const p0 = [q[0] - nx * 3 - tx * L * 0.4, q[1] - ny * 3 - ty * L * 0.4], c1 = [q[0] + tx * L * 0.3, q[1] + ty * L * 0.3], p1 = [q[0] + tx * L * 0.8 + nx * 4, q[1] + ty * L * 0.8 + ny * 4];
      dep += `M ${f(p0[0])} ${f(p0[1])} Q ${f(c1[0])} ${f(c1[1])} ${f(p1[0])} ${f(p1[1])} `;
    }
    out.push(h.path(dep, A.fin));
    // le grand jour, posé en dernier pour que rien ne le recouvre : on y voit le sol au travers de la paroi
    if (grandJour) { out.push(`<g clip-path="url(#${id}-sil)">`); const n0 = trous.length; trou('ext', Math.PI * 0.58, 0.32, Rr * 0.2, 1.35); jour = trous[n0] || null; out.push('</g>'); }
    const creux = pr(0, 0, zf), bas0 = Math.max(...bas.map(p => p[1]));
    return { svg: out.join('\n'), creux, poudre: poudreP, trous, jour, bas: bas0, haut: Math.min(...haut.map(p => p[1])), bordAvant: pr(0, Ri, Hb), Hb, zf, Rf, Ri, ouv: { cy: yG - Hb * ct, rx: Ri, ry: Ri * st } };
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
    out.push(h.path(fin, A.fin), h.path(moyen, A.detail));
    return out.join('\n');
  };

  // ── Le bois ─────────────────────────────────────────────────────────────────────────────────────────
  // Un bâton droit de a à b, de rayon ra au pied et rb en haut ; le bout coupé en b se voit (une ellipse).
  const baton = (a, b, ra, rb, gris = false, fort = false) => {
    // Un bâton de bois, pas un tube : un peu plus mince en haut, les bords légèrement irréguliers, un nœud (une bosse et
    // un chicot de branche) sur un côté, le bout coupé plein (la face coupée en gris d'ombre). fort : un bâton qui borde
    // l'ouverture, au trait de contour.
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]), u = [(b[0] - a[0]) / L, (b[1] - a[1]) / L], n = [-u[1], u[0]];
    const r = gen(Math.round(a[0] * 31 + a[1] * 17 + b[0] * 7) % 2147483646 + 1);
    const R = t => ra + (rb - ra) * t;
    const bord = sg => { const pts = []; for (let k = 0; k <= 6; k++) { const t = k / 6, w = R(t) * (1 + (k > 0 && k < 6 ? (r() - 0.5) * 0.22 : 0)); pts.push(add(add(a, mul(u, L * t)), mul(n, sg * w))); } return pts; };
    const g = bord(1), d = bord(-1);
    // le nœud : sur un côté, entre le tiers et les deux tiers
    const sg = r() < 0.5 ? 1 : -1, tk = 0.3 + r() * 0.4, nk = Math.round(tk * 6);
    const cote = sg > 0 ? g : d;
    cote[nk] = add(cote[nk], mul(n, sg * R(tk) * 0.45));
    const dr = d.slice().reverse(), contour = lisse(g) + ` L ${f(dr[0][0])} ${f(dr[0][1])} ` + lisse(dr).replace(/^M [^C]*/, '') + ' Z';
    const trait = fort ? A.contour : gris ? A.detail : A.detail;
    const out = [h.path(contour, (gris ? A.loin : A.blanc)), h.path(lisse(g) + ' ' + lisse(d), trait)];
    // le chicot de branche au nœud, un bâton sur deux
    if (r() < 0.55) { const p0 = cote[nk], q = add(p0, add(mul(n, sg * 2.6), mul(u, 1.6))); out.push(h.path(`M ${f(p0[0])} ${f(p0[1])} L ${f(q[0])} ${f(q[1])}`, A.detail)); }
    // le bout coupé : une petite face pleine, grise
    const ang = Math.atan2(n[1], n[0]) * 180 / Math.PI;
    out.push(`<ellipse cx="${f(b[0])}" cy="${f(b[1])}" rx="${f(rb)}" ry="${f(rb * 0.55)}" transform="rotate(${f(ang)} ${f(b[0])} ${f(b[1])})" fill="#CFCFCF" ${A.detail.replace('fill="none" ', '')}/>`);
    return out.join('\n');
  };
  // ── Les tas de la vue 1 ───────────────────────────────────────────────────────────────────────────────
  // L'enveloppe convexe d'un nuage de points (pour le flanc d'un bois fendu, extrudé le long de FUITE).
  const enveloppe = pts => {
    const p = pts.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]), cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
    const lo = [], hi = [];
    p.forEach(q => { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop(); lo.push(q); });
    p.slice().reverse().forEach(q => { while (hi.length >= 2 && cr(hi[hi.length - 2], hi[hi.length - 1], q) <= 0) hi.pop(); hi.push(q); });
    return lo.slice(0, -1).concat(hi.slice(0, -1));
  };
  // Une courbe fermée qui ondule un peu (un cerne, l'écorce) : centre, rayon, amplitude, graine.
  const ondule = (cx, cy, R, amp, r, n = 28) => {
    const ph1 = r() * 6, ph2 = r() * 6, pts = [];
    for (let k = 0; k < n; k++) { const a = k / n * 2 * Math.PI, rr = R * (1 + amp * Math.sin(3 * a + ph1) * 0.6 + amp * Math.sin(5 * a + ph2) * 0.4); pts.push([cx + rr * Math.cos(a), cy + rr * Math.sin(a)]); }
    return pts;
  };
  // Le bout d'une bûche : l'écorce (une bande), des cernes ondulés autour d'un cœur décentré, ouverts par endroits, et une
  // gerce (la fente qui part du cœur vers l'écorce).
  const boutBuche = (cx, cy, R, r) => {
    const out = [], e = Math.max(2, R * 0.16);
    out.push(h.cercle(cx, cy, R, blanc(A.arete)));
    out.push(h.path(lisse(ondule(cx, cy, R - e, 0.03, r), true), A.detail));
    // l'écorce : de petites stries entre les deux traits
    let st = '';
    for (let k = 0; k < 16; k++) { const a = (k + r() * 0.6) / 16 * 2 * Math.PI, c = Math.cos(a), s = Math.sin(a); st += `M ${f(cx + c * (R - e * 0.85))} ${f(cy + s * (R - e * 0.85))} L ${f(cx + c * (R - e * 0.2))} ${f(cy + s * (R - e * 0.2))} `; }
    out.push(h.path(st, A.fin));
    const ap = r() * 2 * Math.PI, p = [cx + Math.cos(ap) * R * 0.2, cy + Math.sin(ap) * R * 0.2], Ri = R - e;
    // les cernes : la courbe de l'écorce ramenée vers le cœur, en deux ou trois arcs avec des trous
    let ce = '';
    [0.36, 0.7].forEach((k, j) => {
      const base = ondule(cx, cy, Ri, 0.06, r, 36).map(([x, y]) => [p[0] + (x - p[0]) * k, p[1] + (y - p[1]) * k]);
      const n = base.length, a0 = Math.floor(r() * n), parts = j ? 3 : 2;
      for (let g = 0; g < parts; g++) { const i0 = (a0 + Math.floor(g * n / parts)) % n, len = Math.floor(n / parts) - 4 - Math.floor(r() * 3); const seg = []; for (let i = 0; i <= len; i++) seg.push(base[(i0 + i) % n]); ce += lisse(seg) + ' '; }
    });
    out.push(h.path(ce, A.fin));
    out.push(h.cercle(p[0], p[1], 0.9, A.plein));
    // la gerce : un coin étroit, du cœur jusqu'à l'écorce
    const ag = r() * 2 * Math.PI, u = [Math.cos(ag), Math.sin(ag)], n = [-u[1], u[0]];
    const g0 = add(p, mul(u, R * 0.12)), g1 = add(p, mul(u, Ri * 0.98));
    const gm = add(p, mul(u, Ri * 0.55));
    out.push(h.path(`M ${f(g0[0])} ${f(g0[1])} Q ${f(gm[0] + n[0] * 0.9)} ${f(gm[1] + n[1] * 0.9)} ${f(g1[0] + n[0] * 0.7)} ${f(g1[1] + n[1] * 0.7)} L ${f(g1[0] - n[0] * 0.7)} ${f(g1[1] - n[1] * 0.7)} Q ${f(gm[0] - n[0] * 0.2)} ${f(gm[1] - n[1] * 0.2)} ${f(g0[0])} ${f(g0[1])} Z`, `fill="#1A1A1A" stroke="#1A1A1A" stroke-width="0.5" stroke-linejoin="round"`));
    return out.join('\n');
  };
  // Une pile de bûches rondes vue de trois quarts : les bouts vers nous, le fût qui fuit vers le haut à droite.
  const FUITE = [0.86, -0.5];
  const placePile = (x0, yS, r, rangs, long, rnd) => {
    const items = [];
    rangs.forEach((nb, j) => {
      const xg = x0 + (rangs[0] - nb) * r + r;
      for (let i = 0; i < nb; i++) items.push({ cx: xg + i * 2 * r + (rnd() - 0.5) * r * 0.15, cy: yS - r - j * r * 1.72, r: r * (0.9 + rnd() * 0.18), l: long * (0.88 + rnd() * 0.2) });
    });
    return items;
  };
  const fut = (it, tr) => {
    const b = [it.cx + FUITE[0] * it.l, it.cy + FUITE[1] * it.l], n = [-FUITE[1], FUITE[0]];
    const p = [add([it.cx, it.cy], mul(n, it.r)), add(b, mul(n, it.r)), add(b, mul(n, -it.r)), add([it.cx, it.cy], mul(n, -it.r))];
    return h.path(`M ${f(p[0][0])} ${f(p[0][1])} L ${f(p[1][0])} ${f(p[1][1])} A ${f(it.r)} ${f(it.r)} 0 0 0 ${f(p[2][0])} ${f(p[2][1])} L ${f(p[3][0])} ${f(p[3][1])} Z`, blanc(tr));
  };
  // les bûches : des cernes, l'écorce, une gerce ; sur le fût, quelques plaques d'écorce
  const buches = (x0, yS, r, rangs, long, graine) => {
    const rnd = gen(graine), items = placePile(x0, yS, r, rangs, long, rnd), out = [];
    items.slice().reverse().forEach(it => {
      out.push(fut(it, A.arete));
      // l'écorce du fût : quelques traits courts dans le sens de la longueur
      let d = '';
      for (let k = 0; k < 5; k++) { const s0 = 0.15 + rnd() * 0.65, w = (rnd() - 0.5) * 1.5 * it.r * 0.7, L = it.l * (0.08 + rnd() * 0.1);
        const a = [it.cx + FUITE[0] * it.l * s0 - FUITE[1] * w, it.cy + FUITE[1] * it.l * s0 + FUITE[0] * w]; d += `M ${f(a[0])} ${f(a[1])} l ${f(FUITE[0] * L)} ${f(FUITE[1] * L)} `; }
      out.push(h.path(d, A.fin));
    });
    items.forEach(it => out.push(boutBuche(it.cx, it.cy, it.r, rnd)));
    return { svg: out.join('\n'), items };
  };
  // le petit bois : des brindilles un peu inégales et croches (chacune penchée et courbée à sa façon), le bout coupé
  // plein (gris d'ombre), droit ou en biais
  const fagot = (x0, yS, r, rangs, long, graine) => {
    const rnd = gen(graine), items = placePile(x0, yS, r, rangs, long, rnd), out = [];
    items.forEach(it => { it.a = deg((rnd() - 0.5) * 12); it.k = (rnd() - 0.5) * 2.2; it.biais = rnd() < 0.4; it.rot = rnd() * 180; });
    items.slice().reverse().forEach(it => {
      const c = Math.cos(it.a), sn = Math.sin(it.a), d = [FUITE[0] * c - FUITE[1] * sn, FUITE[0] * sn + FUITE[1] * c], n = [-d[1], d[0]];
      const A0 = [it.cx, it.cy], B = add(A0, mul(d, it.l)), M = add(add(A0, mul(d, it.l / 2)), mul(n, it.k));
      const e = (p, s0) => add(p, mul(n, s0 * it.r));
      const rb = it.r * 0.85;
      const dd = `M ${f(e(A0, 1)[0])} ${f(e(A0, 1)[1])} Q ${f(e(M, 1)[0])} ${f(e(M, 1)[1])} ${f(add(B, mul(n, rb))[0])} ${f(add(B, mul(n, rb))[1])} `
        + `A ${f(rb)} ${f(rb)} 0 0 0 ${f(add(B, mul(n, -rb))[0])} ${f(add(B, mul(n, -rb))[1])} Q ${f(e(M, -1)[0])} ${f(e(M, -1)[1])} ${f(e(A0, -1)[0])} ${f(e(A0, -1)[1])} Z`;
      out.push(h.path(dd, blanc(A.detail)));
    });
    items.forEach(it => out.push(`<ellipse cx="${f(it.cx)}" cy="${f(it.cy)}" rx="${f(it.r * (it.biais ? 1.25 : 1))}" ry="${f(it.r * (it.biais ? 0.8 : 0.95))}" transform="rotate(${f(it.biais ? it.rot : 0)} ${f(it.cx)} ${f(it.cy)})" fill="#CFCFCF" ${A.detail.replace('fill="none" ', '')}/>`));
    return { svg: out.join('\n'), items };
  };
  // le bois de 2 à 5 cm : des quartiers fendus (un quart de bûche). Le bout est un coin : deux faces fendues à angle
  // droit, l'écorce sur l'arc, deux cernes parallèles à l'écorce. La pile : des coins pointe en haut et pointe en bas
  // en alternance, qui s'emboîtent par leurs faces fendues, sur deux rangs.
  const quartiers = (x0, yS, R, n, long, graine) => {
    const rnd = gen(graine), out = [], items = [];
    const coin = (apex, bis, Rq) => {
      const arcP = []; for (let k = 0; k <= 10; k++) { const a = deg(bis - 45 + 90 * k / 10); arcP.push([apex[0] + Math.cos(a) * Rq, apex[1] + Math.sin(a) * Rq]); }
      items.push({ apex, arcP, Rq, l: long * (0.85 + rnd() * 0.25) });
    };
    const rang = (xg, y0, nb) => { for (let i = 0; i < nb; i++) { const x = xg + i * R * 1.04, haut = i % 2 === 0;
      if (haut) coin([x, y0 - R], 90, R * (0.96 + rnd() * 0.06)); else coin([x, y0], -90, R * (0.96 + rnd() * 0.06)); } };
    rang(x0 + R * 0.72, yS, 2 * n + 1);
    rang(x0 + R * 0.72 + R * 1.04, yS - R * 1.02, 2 * n - 1);
    // les flancs, du fond vers l'avant : le rang du haut d'abord, puis le bas, de droite à gauche
    items.slice().reverse().forEach(it => {
      const face = [it.apex, ...it.arcP], V = mul(FUITE, it.l), dos = face.map(p => add(p, V));
      out.push(h.chemin(enveloppe(face.concat(dos)), blanc(A.detail), true));
      [it.apex, it.arcP[0], it.arcP[it.arcP.length - 1]].forEach(p => out.push(h.ligne(p[0], p[1], p[0] + V[0], p[1] + V[1], A.fin)));
      // le bout du fond, coupé carré : sa face se voit par la tranche
      out.push(h.chemin(dos, A.fin, true));
      // un nœud sur le flanc d'écorce, un sur deux
      if (rnd() < 0.5) { const m = it.arcP[5], c = add(m, mul(V, 0.45 + rnd() * 0.2)); out.push(h.ellipse(c[0], c[1], 1.6, 1.1, A.detail)); }
    });
    items.forEach(it => {
      out.push(h.chemin([it.apex, ...it.arcP], blanc(A.arete), true));
      const k0 = (p, k) => add(it.apex, mul([p[0] - it.apex[0], p[1] - it.apex[1]], k));
      out.push(h.path(lisse(it.arcP.map(p => k0(p, 0.82))), A.detail));                // le dedans de l'écorce
      out.push(h.path(lisse(it.arcP.slice(3, -3).map(p => k0(p, 0.5))), A.fin));
    });
    return { svg: out.join('\n'), items };
  };
  // l'amadou : une touffe de fibres en petit tas, et deux copeaux d'écorce de bouleau roulés posés devant
  // un copeau d'écorce de bouleau, ouvert : une lanière mince couchée au sol, qui se relève et se recourbe à un bout
  // (l'écorce se roule d'elle-même) ; on voit ses deux faces et son épaisseur ; deux lenticelles sur la partie à plat
  const copeau = (x, y, L, rc, sens = 1) => {
    const c = [], n = 26;
    for (let k = 0; k <= n; k++) {
      const t = k / n, plat = 0.55;
      if (t <= plat) c.push([x + sens * L * t / plat * 0.7, y]);
      else { const a = (t - plat) / (1 - plat) * Math.PI * 1.15; const cx = x + sens * L * 0.7, cy = y - rc; c.push([cx + sens * Math.sin(a) * rc, cy + Math.cos(a) * rc]); }
    }
    const w = 3.6, off = c.map((p, i) => { const q = c[Math.min(n, i + 1)], o = c[Math.max(0, i - 1)], tx = q[0] - o[0], ty = q[1] - o[1], Ln = Math.hypot(tx, ty) || 1; return [p[0] + ty / Ln * w * sens, p[1] - tx / Ln * w * sens]; });
    const d = lisse(c) + ` L ${f(off[n][0])} ${f(off[n][1])} ` + lisse(off.slice().reverse()).replace(/^M [^C]*/, '') + ' Z';
    const out = [h.path(d, blanc(A.detail))];
    let le = '';
    [0.18, 0.4].forEach(t => { const p = [x + sens * L * t, y - w * 0.5]; le += `M ${f(p[0] - 1.6)} ${f(p[1])} L ${f(p[0] + 1.6)} ${f(p[1])} `; });
    out.push(h.path(le, A.fin));
    return out.join('\n');
  };
  // l'amadou : une touffe lâche de fibres fines, sans contour, et un copeau d'écorce de bouleau ouvert posé contre elle
  const amadouTas = (cx, yS, larg, graine) => {
    const r = gen(graine), out = [], rx = larg / 2, ht = larg * 0.42;
    // un fond blanc sans trait, pour que la ligne du sol ne passe pas au travers de la touffe
    const dome = []; for (let k = 0; k <= 24; k++) { const a = Math.PI + k / 24 * Math.PI; dome.push([cx + Math.cos(a) * rx * 0.92, yS + Math.sin(a) * ht * 0.9]); }
    out.push(h.path(lisse(dome) + ' Z', A.blanc));
    // des brins fins jetés par-dessus le tas, d'un pied à l'autre ; aucun ne ferme le contour
    let fin = '', moy = '';
    for (let i = 0; i < 26; i++) {
      const xa = cx - rx * (1 - r() * 0.95), xb = xa + rx * (0.5 + r() * 1.0) * (r() < 0.5 ? 1 : -1);
      const top = 0.3 + r() * 0.75, xm = (xa + xb) / 2 + (r() - 0.5) * rx * 0.4, ya = yS - r() * ht * 0.3, yb = yS - r() * ht * 0.3;
      const pts = [[xa, ya], [xa + (xm - xa) * 0.4 + (r() - 0.5) * 3, yS - ht * top * 0.78], [xm, yS - ht * top], [xm + (xb - xm) * 0.6 + (r() - 0.5) * 3, yS - ht * top * 0.7], [xb, yb]];
      if (i % 5 === 0) moy += lisse(pts) + ' '; else fin += lisse(pts) + ' ';
    }
    out.push(h.path(fin, A.fin), h.path(moy, A.detail));
    out.push(copeau(cx + rx * 0.05, yS - 0.5, larg * 0.62, 7, 1));
    return { svg: out.join('\n'), haut: [cx - 4, yS - ht * 0.8] };
  };
  // ── Le tipi ─────────────────────────────────────────────────────────────────────────────────────────
  // Vu de trois quarts, d'un peu au-dessus (PHI) : le sol est un plan (un aplat gris en ellipse) et chaque pied de
  // bâton se pose sur le cercle de base, projeté en ellipse sur ce plan. Les bâtons sont droits, dressés vers un
  // même sommet et prolongés au-delà : ils se croisent en haut. Derrière (le pied dans la moitié loin du cercle) :
  // en gris, peints d'abord. L'ouverture est un quart du tour, devant à gauche ; les deux bâtons qui la bordent
  // sont au trait de contour. Repère : X vers la droite, D vers nous, Z vers le haut ; (cx, yB) le centre du sol.
  const PHI = deg(18), SP = Math.sin(PHI), CP = Math.cos(PHI);
  const P3 = (cx, yB, X, D, Z) => [cx + X, yB + D * SP - Z * CP];
  const tipi = (cx, yB, R, H, graine, { ouv = [62, 152], N = 13, ra = 3.3, rb = 2.3, dedans = '', sol = 1.75 } = {}) => {
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
    // derrière l'ouverture, on n'en dessine aucun : l'ouverture reste un vide franc
    const enFace = p => { const q = ((p - (ouv[0] + ouv[1]) / 2 - 180) % 360 + 540) % 360 - 180; return Math.abs(q) < (ouv[1] - ouv[0]) / 2 + 8; };
    const derriere = batons.filter(b => b.D < 0 && !b.bord && !enFace(b.p)).sort((a, b) => a.D - b.D).map(b => baton(b.b, b.t, ra, rb, true));
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
  // Des langues séparées qui partent des fibres du nid (leur pied est caché derrière le bord du nid, peint après elles) :
  // chacune est large en bas, ondule et finit en pointe, penchée d'un côté ou de l'autre ; la plus haute au centre.
  // Elles passent derrière les bâtons de devant et les lèchent.
  const langue = (x, yB, w, H, pen, ond, dedans = false) => {
    // les deux bords ondulent du même côté (la langue se tord), la pointe part en crochet vers pen
    const B1 = [x - w / 2, yB], B2 = [x + w / 2, yB], T = [x + pen, yB - H];
    const M1 = [x - w * 0.4 + ond, yB - H * 0.46], M2 = [x + w * 0.26 + ond * 0.7, yB - H * 0.52];
    const c = (p, q, k1, k2) => `C ${f(p[0] + k1[0])} ${f(p[1] + k1[1])} ${f(q[0] + k2[0])} ${f(q[1] + k2[1])} ${f(q[0])} ${f(q[1])} `;
    const d = `M ${f(B1[0])} ${f(B1[1])} ` + c(B1, M1, [-w * 0.14, -H * 0.18], [-ond * 0.6, H * 0.14]) + c(M1, T, [ond * 0.6, -H * 0.18], [-pen * 0.5 - w * 0.06, H * 0.16])
      + c(T, M2, [-pen * 0.2 + w * 0.04, H * 0.2], [ond * 0.5 + w * 0.06, -H * 0.16]) + c(M2, B2, [-ond * 0.5 - w * 0.02, H * 0.14], [w * 0.16, -H * 0.16])
      + `Q ${f(x)} ${f(yB + w * 0.3)} ${f(B1[0])} ${f(B1[1])} Z`;
    const out = [h.path(d, blanc(A.arete))];
    if (dedans) {
      const t2 = [x + pen * 0.45 + ond * 0.3, yB - H * 0.55];
      out.push(h.path(`M ${f(x - w * 0.14)} ${f(yB - 2)} C ${f(x - w * 0.22 + ond * 0.3)} ${f(yB - H * 0.22)} ${f(t2[0] - w * 0.14 - ond * 0.2)} ${f(yB - H * 0.36)} ${f(t2[0])} ${f(t2[1])} `
        + `C ${f(t2[0] + w * 0.02)} ${f(yB - H * 0.34)} ${f(x + w * 0.22 + ond * 0.2)} ${f(yB - H * 0.18)} ${f(x + w * 0.12)} ${f(yB - 2)}`, A.detail));
    }
    return out.join('\n');
  };
  const flammes = (x, yB, W, H) => [
    langue(x - W * 0.3, yB, W * 0.46, H * 0.5, -W * 0.3, W * 0.1),
    langue(x + W * 0.3, yB, W * 0.44, H * 0.56, W * 0.28, -W * 0.1),
    langue(x - W * 0.12, yB, W * 0.56, H * 0.78, -W * 0.16, -W * 0.12),
    langue(x + W * 0.14, yB, W * 0.52, H * 0.7, W * 0.18, W * 0.12),
    langue(x + W * 0.02, yB, W * 0.62, H, W * 0.06, W * 0.14, true),
  ].join('\n');

  // ═══ La géométrie des vues ═══════════════════════════════════════════════════════════════════════════

  // Vue 1 : les quatre tas, du plus fin au plus gros, sur une même ligne de sol.
  const tas = z => {
    const yS = z.h - 10, x1 = 2, x2 = 74, x3 = 140, x4 = 232;
    return { yS, x1, x2, x3, x4,
      amadou: amadouTas(x1 + 32, yS, 54, 11),
      fin: fagot(x2, yS, 2.3, [6, 5, 4, 3, 2], 44, 5),
      moy: quartiers(x3 + 4, yS, 12, 2, 40, 7),
      gros: buches(x4, yS, 13, [3, 2], 58, 9) };
  };
  // Vue 2 et 6 : le tipi. L'ouverture regarde devant à gauche (OUV), le vent vient de là.
  const OUV = [70, 166];
  const tipi2 = z => { const yB = z.h - 24; return { cx: z.l * 0.6, yB, R: 62, H: Math.min(92, (yB - 4) / (1.2 * CP)) }; };
  const tipi6 = z => { const yB = z.h - 34; return { cx: z.l * 0.42, yB, R: 64, H: Math.min(122, (yB - 4) / (1.2 * CP)) }; };
  // Vue 4 : l'étincelle. Un seul corps : la personne est en face, au-dessus du nid, et ses deux avant-bras sortent par
  // le haut de la vue. La tige descend de la main gauche (en haut à gauche) jusqu'à un doigt au-dessus de la poudre. Le
  // couteau, dans la main droite (en haut à droite), presque à l'horizontale, le tranchant en haut, la pointe vers la
  // gauche, sous le poing de la tige : son dos (le trait fort, en bas de la lame) repose sur la tige, près du talon ; la
  // tige passe devant le plat de la lame. Tout en mm × e.
  const RHO = -138, KAP = 168, METAL = 110;
  const u = [Math.cos(deg(RHO)), Math.sin(deg(RHO))], nu = [-u[1], u[0]];
  const kd = [Math.cos(deg(KAP)), Math.sin(deg(KAP))], kn = [-kd[1], kd[0]];
  const etincelle = z => {
    const e = 0.74, G = z.h - 4;
    const n = ecuelle(z.l * 0.5, G - 30, 56, 4, { jours: 4, sol: 1.4 });
    const T = [n.poudre[0] + 9, n.poudre[1] - n.Rf * 0.36 - 13];   // la pointe de la tige : un doigt au-dessus du tas de poudre
    const C = add(T, mul(u, 58 * e));                 // le dos du couteau sur la tige
    const P = (s, t) => add(add(T, mul(u, s * e)), mul(nu, t * e));
    const sb = kn[1] < 0 ? 1 : -1;                    // t > 0 : vers le haut (le tranchant)
    const Q = (s, t) => add(add(C, mul(kd, s * e)), mul(kn, t * e * sb));
    return { e, G, T, C, P, Q, n };
  };
  // Vue 5 : la tête de profil (le visage à droite), le cou prolongé jusqu'au bas de la vue ; la boule à une longueur
  // d'avant-bras devant la bouche, tenue par le dessous dans la main en C (coupe-c, vue pouce : la paume en l'air, les
  // doigts qui montent de l'autre côté de la boule, le pouce du côté du visage) ; l'avant-bras descend au bord.
  const souffler = z => {
    const e = 0.47;
    const tete = F.teteSimple({ x: 50, y: z.h - 88, echelle: e, bouche: 'ouverte', ouverture: 0.25, cou: 260 });
    const L0 = tete.bouche, R = 97 / 2 * e;
    const B = [L0[0] + 255 * e + 8, L0[1] - 6];
    const oM = { x: B[0], y: B[1], pose: 'coupe-c', vue: 'pouce', diametre: 80, echelle: e, angle: -15 };
    const ab = { longueur: 320, vers: [B[0] - 70, z.h + 80], bord: { l: z.l, h: z.h } };
    const main = F.mainSimple({ ...oM, avantbras: ab });
    return { e, tete, B, R, L0, oM, ab, main };
  };

  return {
    ref: '13-40',
    titre: 'Le ferrocérium, du tri du bois à la flamme',
    desc: 'Six vues dans l’ordre des gestes. Les quatre tas triés côte à côte : une touffe de fibres et deux copeaux d’écorce de bouleau roulés, une botte de petit bois de moins de 2 cm, une pile de quartiers fendus de 2 à 5 cm, une pile de bûches de moins de 15 cm. Le tipi vu de trois quarts sur le sol : des bâtons droits dressés en cône lâche, qui se croisent au sommet, avec une ouverture d’un quart du tour du côté d’où vient le vent. Le nid : une écuelle de fibres croisées, des jours où l’on voit le sol, un petit tas de poudre de tige au fond du creux. L’étincelle : la pointe de la tige à un doigt au-dessus de la poudre, le dos du couteau appuyé en travers de la tige, la lame presque à l’horizontale et tenue immobile dans la main droite, la tige tirée vers soi par la main gauche, la gerbe qui tombe dans le creux. Puis la boule refermée, tenue par le dessous dans la main à une longueur d’avant-bras du visage, soufflée en continu, la fumée qui part de l’autre côté. Enfin le nid en flammes glissé sous le tipi par l’ouverture, une pile de quartiers fendus qui attend à côté.',
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
          return [h.ligne(0, t.yS, z.l, t.yS, A.arete), t.amadou.svg, t.fin.svg, t.moy.svg, t.gros.svg].join('\n');
        },
        renvois: z => {
          const t = tas(z), y = 14;
          const haut = p => p.items[p.items.length - 1];
          const hf = haut(t.fin), hm = haut(t.moy), hg = haut(t.gros);
          const qm = hm.apex;
          return [
            { n: 1, rond: [t.x1 + 20, y], cible: [t.amadou.haut[0] - 4, t.amadou.haut[1] + 2], texte: 'amadou fin' },
            { n: 2, rond: [t.x2 + 14, y], cible: [hf.cx, hf.cy - hf.r - 0.5], texte: 'bois de moins de 2 cm' },
            { n: 3, rond: [t.x3 + 16, y], cible: [qm[0], qm[1] - 0.5], texte: 'bois de 2 à 5 cm' },
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
          // le vent : deux flèches parallèles qui arrivent de devant à gauche et entrent par le vide de l'ouverture, à
          // mi-hauteur, sans passer sur aucun bâton : on prend la direction la plus à gauche qui reste libre
          const z1 = g.H * 0.3, z2 = g.H * 0.16, b1 = t.ouvA(z1), b2 = t.ouvA(z2);
          const dep = (b, zh, w) => { const o = t.ouvA(zh), q = P3(g.cx, g.yB, Math.cos(deg(w)) * g.R * 2.4, Math.sin(deg(w)) * g.R * 2.4, zh); return [b[0] + q[0] - o[0], b[1] + q[1] - o[1]]; };
          let w = 178;
          while (w > 92 && !(libre(dep(b1, z1, w), b1, t.segs, 7) && libre(dep(b2, z2, w), b2, t.segs, 7))) w -= 2;
          const fl = (a, b) => h.fleche(`M ${f(a[0])} ${f(a[1])} L ${f(b[0])} ${f(b[1])}`, A.detail);
          return [t.svg, fl(dep(b1, z1, w), b1), fl(dep(b2, z2, w), b2)].join('\n');
        },
        renvois: z => {
          const g = tipi2(z), t = tipi(g.cx, g.yB, g.R, g.H, 21, { ouv: OUV, sol: 1.55 });
          const o = t.ouvA(g.H * 0.36);
          return [
            { n: 5, rond: [z.l - 14, g.yB - g.H * 0.62], cible: P3(g.cx, g.yB, g.R * 0.42, -g.R * 0.1, g.H * 0.45), texte: 'bâtons en cône lâche, avec du vide entre' },
            { n: 6, rond: [o[0] + 14, z.h - 10], cible: o, texte: 'ouverture du côté du vent' },
          ];
        },
      },
      // ── 3. Le nid ──────────────────────────────────────────────────────────────────────────────────
      nid: {
        titre: 'Faire le nid',
        dessin: z => {
          const n = ecuelle(z.l / 2, z.h * 0.58, z.l * 0.31, 3, { sol: 1.45, grandJour: true });
          return n.svg;
        },
        renvois: z => {
          const n = ecuelle(z.l / 2, z.h * 0.58, z.l * 0.31, 3, { sol: 1.45, grandJour: true });
          const j = n.jour;
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
          const g = etincelle(z), { e, T, C, P, Q, n } = g, out = [];
          out.push(n.svg);
          // la gerbe : un éventail franc, du point de contact jusque sur la poudre ; tous les points arrivent sur le tas
          const S0 = add(C, [-2, 4]), X0 = n.poudre[0] - 5, Y0 = n.poudre[1], rp = n.Rf * 0.62;
          let gerbe = '', points = '';
          for (let i = 0; i < 7; i++) {
            const k = (i - 3) / 3, a0 = Math.atan2(Y0 - S0[1], X0 - S0[0]) + deg(k * 22);
            // un trait droit qui part du contact et descend jusque sur le fond du creux, autour de la poudre
            const L = (Y0 - S0[1]) / Math.sin(a0);
            const p0 = [S0[0] + Math.cos(a0) * 6, S0[1] + Math.sin(a0) * 6], p1 = [S0[0] + Math.cos(a0) * (L - 4), S0[1] + Math.sin(a0) * (L - 4)];
            const cible = [S0[0] + Math.cos(a0) * L, S0[1] + Math.sin(a0) * L];
            gerbe += `M ${f(p0[0])} ${f(p0[1])} L ${f(p1[0])} ${f(p1[1])} `;
            points += h.cercle(cible[0], cible[1], 1.2, A.plein);
          }
          // la tige : METAL mm de métal, le bout arrondi ; 70 mm de manche, dans la main gauche
          const M0 = METAL;
          const metal = `M ${f(P(M0, -5)[0])} ${f(P(M0, -5)[1])} L ${f(P(0, -5)[0])} ${f(P(0, -5)[1])} Q ${f(P(-5, 0)[0])} ${f(P(-5, 0)[1])} ${f(P(0, 5)[0])} ${f(P(0, 5)[1])} L ${f(P(M0, 5)[0])} ${f(P(M0, 5)[1])} Z`;
          const tige = [h.path(metal, A.hachure('metal', 'arete')),
            h.path(lisse([P(M0 - 2, -9), P(M0 + 70, -9.5), P(M0 + 78, -7), P(M0 + 80, 0), P(M0 + 78, 7), P(M0 + 70, 9.5), P(M0 - 2, 9)]) + ' Z', A.hachure('bois', 'arete'))].join('\n');
          const oT = { x: P(M0 + 54, 0)[0], y: P(M0 + 54, 0)[1], pose: 'prise-manche', vue: 'paume', rotation: [-25, 0, 0], diametre: 19, echelle: e, cote: 'gauche' };
          oT.angle = orienter(oT, RHO, m => m.prise.y - m.poignet[1]);   // le poignet au-dessus de la tige : l'avant-bras monte
          out.push(h.path(gerbe, A.arete), points);
          out.push(F.mainSimple({ ...oT, objet: tige, avantbras: { longueur: 320, vers: [oT.x + 10, -200], bord: { l: z.l, h: z.h } } }).svg);
          // le couteau : le tranchant en haut, le dos (t = 0) en bas, posé sur la tige ; la pointe vers la gauche ; la
          // garde et le manche à droite, dans la main droite
          const lameD = `M ${f(Q(-12, 0)[0])} ${f(Q(-12, 0)[1])} L ${f(Q(70, 0)[0])} ${f(Q(70, 0)[1])} Q ${f(Q(84, 1)[0])} ${f(Q(84, 1)[1])} ${f(Q(92, 6)[0])} ${f(Q(92, 6)[1])} `
            + `C ${f(Q(80, 15)[0])} ${f(Q(80, 15)[1])} ${f(Q(62, 20)[0])} ${f(Q(62, 20)[1])} ${f(Q(44, 20)[0])} ${f(Q(44, 20)[1])} L ${f(Q(-12, 20)[0])} ${f(Q(-12, 20)[1])} Z`;
          const lame = h.path(lameD, blanc(A.arete));
          const biseau = h.path(`M ${f(Q(-10, 13)[0])} ${f(Q(-10, 13)[1])} L ${f(Q(46, 13)[0])} ${f(Q(46, 13)[1])} Q ${f(Q(74, 12)[0])} ${f(Q(74, 12)[1])} ${f(Q(90, 7)[0])} ${f(Q(90, 7)[1])}`, A.fin);
          const dos = h.chemin([Q(-12, 0), Q(70, 0)], A.contour);
          const garde = h.chemin([Q(-12, -3), Q(-17, -3), Q(-17, 24), Q(-12, 24)], blanc(A.arete), true);
          const mancheK = h.path(lisse([Q(-17, -1), Q(-60, -1.5), Q(-108, -1), Q(-118, 3), Q(-118, 18), Q(-108, 22.5), Q(-60, 23), Q(-17, 22)], true), blanc(A.detail));
          const couteau = [lame, biseau, dos, garde, mancheK].join('\n');
          const oK = { x: Q(-66, 10.5)[0], y: Q(-66, 10.5)[1], pose: 'prise-manche', vue: 'paume', rotation: [-25, 0, 0], diametre: 25, echelle: e, cote: 'droite' };
          oK.angle = orienter(oK, KAP, m => (m.pouce[0] - m.prise.x) * kd[0] + (m.pouce[1] - m.prise.y) * kd[1]);
          out.push(F.mainSimple({ ...oK, objet: couteau, avantbras: { longueur: 320, vers: [oK.x + 20, -200], bord: { l: z.l, h: z.h } } }).svg);
          // la tige passe devant le plat de la lame : on la repeint dans la lame, puis le dos par-dessus (elle est dessous)
          out.push(`<clipPath id="lame-1340"><path d="${lameD}" fill="#FFFFFF" stroke="none"/></clipPath><g clip-path="url(#lame-1340)">${h.path(metal, A.hachure('metal', 'arete'))}</g>`);
          out.push(dos);
          // le geste : la tige tirée vers soi, dans son axe, juste après les jointures de la main gauche
          const g0 = P(METAL + 4, -42), g1 = P(METAL + 60, -42);
          out.push(h.geste(`M ${f(g0[0])} ${f(g0[1])} L ${f(g1[0])} ${f(g1[1])}`));
          // le point à contrôler : le dos du couteau sur la tige, qui ne bouge pas
          out.push(h.controle(C[0], C[1], 9));
          return coupe('etincelle', z, out.join('\n'));
        },
        renvois: z => {
          const g = etincelle(z), { T, C, P, n } = g;
          const g1 = P(METAL + 40, -42);
          return [
            { n: 9, rond: [T[0] + 80, T[1] + 8], cible: add(T, [5, 1]), texte: 'pointe à un doigt du nid' },
            { n: 10, rond: [C[0] - 52, C[1] + 26], cible: add(C, [-6.5, 6.5]), texte: 'cercle : couteau immobile' },
            { n: 11, rond: [g1[0] - 24, g1[1] + 22], cible: [g1[0] - 2, g1[1] + 2], texte: 'flèche : tige tirée vers soi' },
            { n: 12, rond: [z.l - 16, n.poudre[1] + 6], cible: [n.poudre[0] + 9, n.poudre[1] - 2], texte: 'la gerbe tombe dans le creux' },
          ];
        },
      },
      // ── 5. Souffler ────────────────────────────────────────────────────────────────────────────────
      souffler: {
        titre: 'Refermer et souffler',
        dessin: z => {
          const s = souffler(z), { B, R, tete, L0 } = s, out = [];
          out.push(String(tete));
          // la main en C sous la boule, l'avant-bras qui descend vers le corps
          out.push(F.mainSimple({ ...s.oM, objet: boule(B[0], B[1] + 3, R, 8), avantbras: s.ab }).svg);
          // la fumée : poussée par le souffle, elle part de l'autre côté de la boule, loin du visage ; mince, puis épaisse
          // trois filets ondulés, ouverts : un seul, mince, au ras de la boule, qui s'ouvre en trois en montant
          const fum = () => {
            const x0 = B[0] + R * 0.5, y0 = B[1] - R * 0.9, Ht = y0 - 14;
            const filet = (k, t0, ph) => {
              const pts = [];
              for (let i = 0; i <= 16; i++) { const t = t0 + (1 - t0) * i / 16;
                pts.push([x0 + 14 * t + 20 * t * t + k * 11 * Math.pow(t, 1.4) + (1 + 3.2 * t) * Math.sin(t * 10 + ph), y0 - Ht * t]); }
              return lisse(pts);
            };
            return [h.path(filet(0, 0, 0), A.detail), h.path(filet(-1, 0.18, 1.2) + ' ' + filet(1, 0.22, 2.4), A.detail)].join('\n');
          };
          out.push(fum());
          // le souffle, en continu, de la bouche à la boule
          out.push(h.fleche(`M ${f(L0[0] + 10)} ${f(L0[1] - 3)} L ${f(B[0] - R - 8)} ${f(B[1] - 6)}`, A.cache));
          out.push(h.fleche(`M ${f(L0[0] + 10)} ${f(L0[1] + 4)} L ${f(B[0] - R - 8)} ${f(B[1] + 3)}`, A.cache));
          return coupe('souffler', z, out.join('\n'));
        },
        renvois: z => {
          const s = souffler(z), { B, R, L0 } = s, mx = (L0[0] + B[0] - R) / 2;
          const m = s.main, w = m.poignet, c = m.coupe ? [(m.coupe[0][0] + m.coupe[1][0]) / 2, (m.coupe[0][1] + m.coupe[1][1]) / 2] : [w[0] - 20, z.h];
          const fa = [w[0] + (c[0] - w[0]) * 0.35, w[1] + (c[1] - w[1]) * 0.35];
          return [
            { n: 13, rond: [B[0] - R - 6, B[1] - R - 30], cible: [B[0] - R * 0.45, B[1] - R * 0.7], texte: 'en boule, sans serrer' },
            { n: 14, rond: [fa[0] - 40, fa[1] + 4], cible: [fa[0] - 9, fa[1]], texte: 'à un avant-bras du visage' },
            { n: 15, rond: [mx - 6, L0[1] - 40], cible: [mx - 6, L0[1] - 6], texte: 'souffler sans à-coups' },
            { n: 16, rond: [z.l - 14, 74], cible: [B[0] + R * 0.5 + 14 * 0.62 + 20 * 0.38 + 11 * 0.51 + 2, B[1] - R * 0.9 - (B[1] - R * 0.9 - 14) * 0.62], texte: 'fumée mince, puis épaisse' },
          ];
        },
      },
      // ── 6. Glisser ─────────────────────────────────────────────────────────────────────────────────
      glisser: {
        titre: 'Glisser le nid sous le tipi',
        dessin: z => {
          const g = tipi6(z), out = [], t0 = tipi(g.cx, g.yB, g.R, g.H, 29, { ouv: OUV, sol: 1.5 });
          // le nid au centre du cercle de base, posé sur le sol
          const nc = P3(g.cx, g.yB, Math.cos(t0.om) * g.R * 0.4, Math.sin(t0.om) * g.R * 0.4, 0);
          const nN = ecuelle(nc[0], nc[1], 24, 17, { theta: 18, poudre: false, jours: 0, densite: 0.45 });
          const dedans = [flammes(nc[0], nN.ouv.cy + 4, 40, g.H * 0.55), nN.svg].join('\n');
          const t = tipi(g.cx, g.yB, g.R, g.H, 29, { ouv: OUV, dedans, sol: [2.05, 1.5, 0.45] });
          out.push(t.svg);
          const a = P3(g.cx, g.yB, Math.cos(t.om) * g.R * 2.3, Math.sin(t.om) * g.R * 2.3, 3), b = P3(g.cx, g.yB, Math.cos(t.om) * g.R * 0.62, Math.sin(t.om) * g.R * 0.62, 3);
          out.push(h.geste(`M ${f(a[0])} ${f(a[1])} L ${f(b[0])} ${f(b[1])}`));
          // le bois de 2 à 5 cm, prêt à côté
          out.push(quartiers(g.cx + g.R * 1.28, g.yB + 12, 10, 2, 34, 31).svg);
          return out.join('\n');
        },
        renvois: z => {
          const g = tipi6(z), t = tipi(g.cx, g.yB, g.R, g.H, 29, { ouv: OUV, sol: 1.5 });
          const a = P3(g.cx, g.yB, Math.cos(t.om) * g.R * 1.9, Math.sin(t.om) * g.R * 1.9, 3);
          return [
            { n: 17, rond: [16, a[1] - 34], cible: [a[0], a[1] - 2], texte: 'flèche : le nid entre par l’ouverture' },
            { n: 18, rond: [z.l - 16, g.yB - 60], cible: [g.cx + g.R * 1.28 + 10 * 0.72 + 10 * 1.04 * 2, g.yB + 12 - 10 * 1.02 - 10 + 1], texte: 'bois de 2 à 5 cm, quand le petit bois crépite' },
          ];
        },
      },
    },
  };
};
