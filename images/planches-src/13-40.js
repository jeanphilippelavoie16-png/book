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
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]), u = [(b[0] - a[0]) / L, (b[1] - a[1]) / L], n = [-u[1], u[0]];
    const pts = [add(a, mul(n, ra)), add(b, mul(n, rb)), add(b, mul(n, -rb)), add(a, mul(n, -ra))];
    const ang = Math.atan2(n[1], n[0]) * 180 / Math.PI;
    return [h.chemin(pts, gris ? A.loin : A.blanc, true),
      h.path(`M ${f(pts[0][0])} ${f(pts[0][1])} L ${f(pts[1][0])} ${f(pts[1][1])} M ${f(pts[3][0])} ${f(pts[3][1])} L ${f(pts[2][0])} ${f(pts[2][1])}`, fort ? A.arete : gris ? A.fin : A.detail),
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
  // Des bâtons droits dressés autour d'un cercle de base, tous vers un même sommet et prolongés au-delà : ils se
  // croisent en haut. Derrière : en gris, peints d'abord. L'ouverture est un vide dans le cercle, devant à gauche.
  const tipi = (cx, yB, rx, ry, haut, graine, { ouverture = [66, 114], N = 14, ra = 2.6, rb = 1.9, dedans = '' } = {}) => {
    const r = gen(graine), S = [cx + 1, yB - haut];
    const batons = [];
    for (let i = 0; i < N; i++) {
      const p = (((i + 0.5) * 360 / N + (r() - 0.5) * 7) % 360 + 360) % 360;
      const s = [S[0] + (r() - 0.5) * 5, S[1] + (r() - 0.5) * 3];
      const pro = 0.08 + r() * 0.08;
      if (p > ouverture[0] && p < ouverture[1]) continue;
      const b = [cx + Math.cos(deg(p)) * rx, yB + Math.sin(deg(p)) * ry];
      batons.push({ p, avant: Math.sin(deg(p)) > 0, b, t: [b[0] + (s[0] - b[0]) * (1 + pro), b[1] + (s[1] - b[1]) * (1 + pro)] });
    }
    const derriere = batons.filter(b => !b.avant).map(b => baton(b.b, b.t, ra, rb, true));
    const devant = batons.filter(b => b.avant).sort((a, b) => a.b[1] - b.b[1]).map(b => baton(b.b, b.t, ra, rb));
    const om = (ouverture[0] + ouverture[1]) / 2;
    return { svg: [...derriere, dedans, ...devant].join('\n'), sommet: S, ouv: [cx + Math.cos(deg(om)) * rx, yB + Math.sin(deg(om)) * ry] };
  };

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
  // Vue 2 et 6 : le tipi.
  const tipi2 = z => ({ cx: z.l * 0.6, yB: z.h - 28, rx: 64, ry: 20, ht: Math.min(84, z.h - 36) });
  const tipi6 = z => ({ cx: z.l * 0.5, yB: z.h - 26, rx: 72, ry: 19, ht: Math.min(112, z.h - 36) });
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
          const g = tipi2(z), t = tipi(g.cx, g.yB, g.rx, g.ry, g.ht, 21);
          return [h.ligne(0, g.yB + g.ry + 2, z.l, g.yB + g.ry + 2, A.arete), t.svg,
            // le vent, qui entrera par l'ouverture
            h.fleche(`M 4 ${f(t.ouv[1] - 12)} L ${f(t.ouv[0] - 10)} ${f(t.ouv[1] - 9)}`, A.detail),
            h.fleche(`M 4 ${f(t.ouv[1] - 1)} L ${f(t.ouv[0] - 12)} ${f(t.ouv[1] - 1)}`, A.detail)].join('\n');
        },
        renvois: z => {
          const g = tipi2(z), t = tipi(g.cx, g.yB, g.rx, g.ry, g.ht, 21);
          return [
            { n: 5, rond: [z.l - 14, g.yB - g.ht * 0.62], cible: [g.cx + g.rx * 0.36, g.yB - g.ht * 0.48], texte: 'cône lâche, du vide entre' },
            { n: 6, rond: [16, t.ouv[1] - 56], cible: [t.ouv[0] + 2, t.ouv[1] - 22], texte: 'ouverture du côté du vent' },
          ];
        },
      },
      // ── 3. Le nid ──────────────────────────────────────────────────────────────────────────────────
      nid: {
        titre: 'Faire le nid',
        dessin: z => {
          const cx = z.l / 2, cy = z.h * 0.5, R = Math.min(z.l * 0.46, 92), g = nidGeo(cx, cy, R);
          return [h.ligne(0, g.bas, z.l, g.bas, A.arete), nid(cx, cy, R, 3)].join('\n');
        },
        renvois: z => {
          const cx = z.l / 2, cy = z.h * 0.5, R = Math.min(z.l * 0.46, 92), g = nidGeo(cx, cy, R);
          return [
            { n: 7, rond: [16, cy - R * 0.62 - 40], cible: [cx - R * 0.68, cy - R * 0.22], texte: 'fibres lâches : le jour passe' },
            { n: 8, rond: [z.l - 16, cy - R * 0.62 - 40], cible: [g.creux[0] + 3, g.creux[1]], texte: 'poudre de tige dans le creux' },
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
          const g = tipi6(z), nx = g.cx - 4, out = [];
          out.push(h.ligne(0, g.yB + g.ry + 2, z.l, g.yB + g.ry + 2, A.arete));
          const dedans = [nid(nx, g.yB - 4, 26, 17, { creux: 0.3, poudre: false }), flammes(nx + 2, g.yB + 2, 30, g.ht * 0.58)].join('\n');
          const t = tipi(g.cx, g.yB, g.rx, g.ry, g.ht, 29, { dedans });
          out.push(t.svg);
          out.push(h.geste(`M ${f(t.ouv[0] - 104)} ${f(t.ouv[1] + 1)} L ${f(nx - 30)} ${f(g.yB + 4)}`));
          // le bois de 2 à 5 cm, prêt à côté
          out.push(pile(g.cx + g.rx + 12, g.yB + g.ry + 2, 4.5, [3, 2], 30, 31).svg);
          return out.join('\n');
        },
        renvois: z => {
          const g = tipi6(z), t = tipi(g.cx, g.yB, g.rx, g.ry, g.ht, 29);
          return [
            { n: 17, rond: [Math.max(16, t.ouv[0] - 96), t.ouv[1] - 30], cible: [t.ouv[0] - 82, t.ouv[1] + 1], texte: 'flèche : par l’ouverture' },
            { n: 18, rond: [z.l - 16, g.yB - 56], cible: [g.cx + g.rx + 26, g.yB - 4], texte: 'le 2 à 5 cm, quand ça crépite' },
          ];
        },
      },
    },
  };
};
