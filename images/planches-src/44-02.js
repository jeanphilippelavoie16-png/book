// Planche 44-02 — la ligne de dressage du chien de sang (chapitre 44, « Faire un chien de sang
// avec le chien du chalet », étapes 1 à 4). En plan : la traîne de foie, les gouttes, le prix au
// bout, le virage à angle droit, les rubans aux arbres. Aucun chiffre qui ne soit pas au chapitre.
module.exports = (h) => {
  const f = v => +v.toFixed(1);
  const blanc = a => a.replace('fill="none"', 'fill="#ffffff"');
  const halo = 'fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round"';
  let graine = 11;
  const alea = () => { graine = (graine * 16807) % 2147483647; return (graine - 1) / 2147483646; };

  // ─── une ligne lisse qui passe par ses points, et qui se mesure ───
  const lisse = (pts, n = 12) => {
    const out = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || pts[i + 1];
      for (let k = 0; k < n; k++) {
        const t = k / n, t2 = t * t, t3 = t2 * t;
        out.push([0, 1].map(j => 0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2
          + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t3)));
      }
    }
    out.push(pts[pts.length - 1]);
    return out;
  };
  const mesure = pts => {
    const seg = []; let L = 0;
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1], b = pts[i], l = Math.hypot(b[0] - a[0], b[1] - a[1]);
      if (l > 0) { seg.push({ a, b, l, s0: L }); L += l; }
    }
    const at = s => {
      s = Math.max(0, Math.min(L, s));
      const g = seg.find(g => s <= g.s0 + g.l) || seg[seg.length - 1];
      const ux = (g.b[0] - g.a[0]) / g.l, uy = (g.b[1] - g.a[1]) / g.l, d = s - g.s0;
      return { x: g.a[0] + ux * d, y: g.a[1] + uy * d, ux, uy, nx: -uy, ny: ux };
    };
    const loin = (x, y) => Math.min(...pts.map(p => Math.hypot(p[0] - x, p[1] - y)));
    return { L, at, pts, loin };
  };
  const polyd = pts => 'M' + pts.map(p => `${f(p[0])},${f(p[1])}`).join(' L');

  // un repère tourné : (px, py) local → vue, l'avant vers ang (degrés)
  const rep = (x, y, ang, s) => {
    const r = ang * Math.PI / 180, c = Math.cos(r), n = Math.sin(r);
    return (px, py) => [f(x + s * (px * c - py * n)), f(y + s * (px * n + py * c))];
  };
  const ovale = (T, cx, cy, rx, ry, k = 12) => Array.from({ length: k }, (_, i) => {
    const t = i / k * 2 * Math.PI; return T(cx + rx * Math.cos(t), cy + ry * Math.sin(t));
  });

  // ─── les arbres vus de dessus : l'épinette en étoile de pointes, le tronc au centre ───
  const epinette = (cx, cy, r) => {
    const n = 11, rot = alea() * Math.PI, pts = [];
    for (let i = 0; i < 2 * n; i++) {
      const a = rot + i * Math.PI / n, rr = i % 2 ? r * (0.55 + alea() * 0.1) : r * (0.92 + alea() * 0.12);
      pts.push([f(cx + rr * Math.cos(a)), f(cy + rr * Math.sin(a))]);
    }
    return h.chemin(pts, h.a.detail, true);
  };
  // le bouleau : un houppier festonné
  const bouleau = (cx, cy, r) => {
    const n = 8, rot = alea() * Math.PI, pts = [];
    for (let i = 0; i < n; i++) { const a = rot + i * 2 * Math.PI / n, rr = r * (0.86 + alea() * 0.14); pts.push([cx + rr * Math.cos(a), cy + rr * Math.sin(a)]); }
    let d = `M${f(pts[0][0])},${f(pts[0][1])}`;
    for (let i = 1; i <= n; i++) { const p = pts[i % n], q = pts[i - 1], c = Math.hypot(p[0] - q[0], p[1] - q[1]) * 0.62; d += ` A${f(c)},${f(c)} 0 0 1 ${f(p[0])},${f(p[1])}`; }
    return h.path(d + ' Z', h.a.detail);
  };
  const tronc = (cx, cy) => h.cercle(f(cx), f(cy), 1.7, h.a.plein);
  const arbre = (cx, cy, r) => (alea() < 0.72 ? epinette(cx, cy, r) : bouleau(cx, cy, r)) + tronc(cx, cy);

  // le tronc ceint d'un ruban, ses deux bouts qui flottent au vent, tous du même côté
  // (ang : le côté où flottent les bouts, à l'opposé de la ligne)
  const ruban = (cx, cy, ang) => {
    const out = [h.cercle(f(cx), f(cy), 3.4, blanc(h.a.arete)), h.cercle(f(cx), f(cy), 3.4, 'fill="none" stroke="#1a1a1a" stroke-width="2.4"')];
    [-1, 1].forEach((sg, i) => {
      const T = rep(cx, cy, ang + sg * 11, 1), L = i ? 15 : 18, w = 1.15;
      const bord = k => Array.from({ length: 8 }, (_, j) => { const t = j / 7; return T(4 + t * L, k * w + Math.sin(t * 5 + i * 2) * 1.7); });
      out.push(h.chemin([...bord(-1), T(4 + L - 2.6, Math.sin(5 + i * 2) * 1.7), ...bord(1).reverse()], h.a.plein, true));
    });
    return out.join('\n');
  };

  // une goutte de sang au sol
  const goutte = (x, y, r = 1.9) => h.cercle(f(x), f(y), r, h.a.plein);

  // l'empreinte d'une patte de chien : le coussinet et quatre doigts, l'avant vers ang
  const patte = (x, y, ang, s = 1.8) => {
    const T = rep(x, y, ang, s);
    const coussinet = [[-3.8, 0], [-3.3, -2.2], [-1.6, -3.0], [0.4, -2.2], [1.3, -0.9], [1.0, 0], [1.3, 0.9], [0.4, 2.2], [-1.6, 3.0], [-3.3, 2.2]].map(p => T(...p));
    return [h.chemin(coussinet, h.a.plein, true),
      ...[[3.1, -3.0, 1.15, 0.95], [4.4, -1.05, 1.3, 1.0], [4.4, 1.05, 1.3, 1.0], [3.1, 3.0, 1.15, 0.95]]
        .map(([a, b, rx, ry]) => h.chemin(ovale(T, a, b, rx, ry), h.a.plein, true))].join('\n');
  };

  // le prix : une queue de chevreuil vue de dessus, poil en bordure, la base coupée à l'arrière
  const queue = (x, y, ang, s = 1.2) => {
    const T = rep(x, y, ang, s), pts = [], n = 34;
    for (let i = 0; i < n; i++) {
      const t = i / n * 2 * Math.PI, cx = 11 * Math.cos(t);
      const w = 5.2 * Math.sin(t) * (0.8 + 0.45 * (Math.cos(t) + 1) / 2), poil = i % 2 ? 1 : 1.3;
      pts.push(T(cx * (i % 2 ? 1 : 1.06), w * poil));
    }
    const L = (a, b, c, d) => { const p = T(a, b), q = T(c, d); return h.ligne(p[0], p[1], q[0], q[1], h.a.fin); };
    return [h.chemin(pts, blanc(h.a.arete), true), L(-10, 0, 9, 0), L(-6, -2.4, 2, -3.4), L(-6, 2.4, 2, 3.4), L(0, -1.2, 7, -2), L(0, 1.2, 7, 2),
      h.chemin([T(-10.6, -2.4), T(-14.5, -2.2), T(-14.5, 2.2), T(-10.6, 2.4)], blanc(h.a.detail), true)].join('\n');
  };

  // semer des arbres autour des lignes, sans les toucher
  const semer = (z, lignes, deja, nb, rmin, rmax, marge = 10) => {
    const out = [];
    for (let essai = 0; essai < 4000 && out.length < nb; essai++) {
      const r = rmin + alea() * (rmax - rmin);
      const x = marge + r + alea() * (z.l - 2 * marge - 2 * r), y = marge + r + alea() * (z.h - 2 * marge - 2 * r);
      if (lignes.some(l => l.loin(x, y) < r + 12)) continue;
      if ([...deja, ...out].some(a => Math.hypot(a[0] - x, a[1] - y) < a[2] + r + 3)) continue;
      out.push([x, y, r]);
    }
    return out;
  };

  // la géométrie de la ligne longue, partagée par le dessin et les renvois
  const longue = z => {
    const C = [z.l * 0.6, z.h * 0.84];
    const b1 = lisse([[z.l * 0.05, z.h * 0.8], [z.l * 0.2, z.h * 0.86], [z.l * 0.36, z.h * 0.81], [z.l * 0.48, z.h * 0.85], [C[0] - 30, C[1]], C]);
    const b2 = lisse([C, [C[0], C[1] - 40], [C[0] - 4, z.h * 0.56], [C[0] + 8, z.h * 0.36], [C[0] - 2, z.h * 0.2], [C[0] + 4, z.h * 0.08]]);
    const route = mesure([...b1, ...b2.slice(1)]), r1 = mesure(b1), r2 = mesure(b2);
    // une goutte à chaque pas au départ, puis de loin en loin
    const dense = r1.L * 0.2, gouttesLoin = [];
    for (let s = dense + 24; s < route.L - 10; s += 36) gouttesLoin.push(route.at(s));
    // les rubans : aux arbres qui bordent la ligne, d'un côté puis de l'autre, les bouts au large
    const rubans = [];
    const pasR = route.L / 7;
    for (let k = 0; k < 7; k++) {
      const s = k * pasR + 60, p = route.at(s), cote = k % 2 ? 1 : -1;
      if (Math.hypot(p.x - C[0], p.y - C[1]) < 60 || s > route.L - 40) continue;
      rubans.push([p.x + p.nx * 22 * cote, p.y + p.ny * 22 * cote, 10, Math.atan2(p.ny * cote, p.nx * cote) * 180 / Math.PI]);
    }
    rubans.push([C[0] - 21, C[1] - 23, 10, -135]);   // au virage, du côté intérieur
    const e = route.at(route.L);
    // la goutte que montre le renvoi 7 : sur la première branche, la plus loin des rubans
    const libre = p => Math.min(...rubans.map(r => Math.hypot(r[0] - p.x, r[1] - p.y)));
    const g7 = gouttesLoin.filter(p => p.x > z.l * 0.2 && p.x < C[0] - 80).reduce((a, b) => libre(b) > libre(a) ? b : a);
    const renvois = [
      { n: 6, rond: [z.l * 0.05, z.h * 0.965], cible: [route.at(22).x, route.at(22).y + 2], texte: 'une goutte à chaque pas' },
      { n: 7, rond: [g7.x, z.h * 0.965], cible: [g7.x, g7.y + 3], texte: 'puis une tous les 9 à 14 m' },
      { n: 8, rond: [C[0] - 44, z.h * 0.965], cible: [C[0] - 2, C[1] + 2], texte: 'virage à angle droit' },
      { n: 9, rond: [C[0] - 70, C[1] - 52], cible: [C[0] - 25, C[1] - 27], texte: 'ruban aux arbres de la ligne' },
      { n: 10, rond: [C[0] + 124, C[1] - 12], cible: [C[0] + 86, C[1] - 17], texte: 'le chien dépasse, revient' },
      { n: 11, rond: [e.x + 50, e.y - 12], cible: [e.x + 7, e.y - 13], texte: 'le prix, au bout' },
    ];
    return { C, route, r1, r2, dense, gouttesLoin, rubans, renvois };
  };
  // la place des pastilles et de leurs lignes de rappel, que les arbres laissent libre
  const places = R => R.flatMap(r => {
    const out = [[r.rond[0], r.rond[1], 13]];
    const dx = r.cible[0] - r.rond[0], dy = r.cible[1] - r.rond[1], L = Math.hypot(dx, dy);
    for (let t = 12; t < L - 4; t += 6) out.push([r.rond[0] + dx * t / L, r.rond[1] + dy * t / L, 2]);
    return out;
  });
  const renvoisChiot = z => {
    const y0 = z.h * 0.52;
    return [
      { n: 2, rond: [z.l * 0.06, z.h * 0.14], cible: [z.l * 0.13 - 17, y0 - 9], texte: 'départ, un quart d’heure après' },
      { n: 3, rond: [z.l * 0.22, z.h * 0.88], cible: [z.l * 0.18, y0 + 1], texte: 'traîne du foie, environ 6 m' },
      { n: 4, rond: [z.l * 0.52, z.h * 0.14], cible: [z.l * 0.5, y0 + 1], texte: 'gouttes de sang, environ 30 m' },
      { n: 5, rond: [z.l * 0.92, z.h * 0.88], cible: [z.l * 0.87 + 12, y0 + 5], texte: 'le prix : queue ou peau' },
    ];
  };

  return {
    ref: '44-02',
    titre: 'La ligne de dressage du chien de sang',
    desc: 'Trois vues. De côté, un morceau de foie noué au bout d’une ficelle, traîné au sol : l’herbe couchée derrière lui, debout devant. En plan, la première ligne du chiot : les empreintes du chiot au départ, la traîne du foie, puis une ligne de gouttes de sang et, au bout, le prix, une queue. En plan, la ligne longue dans le bois : une goutte à chaque pas au départ, puis des gouttes espacées, un virage à angle droit, un ruban noué aux arbres le long de la ligne ; le chien, en tireté, dépasse le virage, tourne, revient et retrouve la ligne jusqu’au prix. L’encadré danger rappelle que le foie se reprend et ne reste jamais sur la ligne.',
    format: 'pleine',
    disposition: [['traine', 'chiot'], ['longue']],
    largeurs: [[1, 2.7], [1]],
    hauteurs: [1, 2.2],
    vues: {
      // ─── De côté : le foie au bout de sa ficelle ───
      traine: {
        titre: 'La traîne du foie',
        dessin: z => {
          graine = 3;
          const g = f(z.h * 0.72), x = f(z.l * 0.42);
          const out = [];
          out.push(h.ligne(4, g, z.l - 4, g, h.a.arete));
          // l'herbe couchée derrière, dans le sens de la traîne
          for (let bx = 6; bx < x - 50; bx += 8 + alea() * 3) {
            out.push(h.path(`M${f(bx)},${g} Q${f(bx + 9)},${f(g - 4)} ${f(bx + 19)},${f(g - 5 - alea() * 2)}`, h.a.detail));
            out.push(h.path(`M${f(bx + 3)},${g} Q${f(bx + 10)},${f(g - 2)} ${f(bx + 17)},${f(g - 2.5)}`, h.a.fin));
          }
          // l'herbe debout devant
          for (let bx = x + 52; bx < z.l - 10; bx += 12 + alea() * 4) {
            out.push(h.path(`M${f(bx)},${g} Q${f(bx - 2)},${f(g - 7)} ${f(bx - 4)},${f(g - 13)} M${f(bx + 1)},${g} Q${f(bx + 1)},${f(g - 9)} ${f(bx + 2)},${f(g - 15)} M${f(bx + 2)},${g} Q${f(bx + 5)},${f(g - 6)} ${f(bx + 8)},${f(g - 10)}`, h.a.fin));
          }
          // le morceau de foie : épais et arrondi derrière, mince et tranchant devant
          // le morceau de foie : une tranche épaisse, lisse, posée à plat ; on voit le dessus et le chant
          const X = dx => f(x + dx), Y = dy => f(g - dy);
          const foie = `M${X(-37)},${Y(2)} C${X(-42)},${Y(14)} ${X(-28)},${Y(24)} ${X(-10)},${Y(23)} C${X(8)},${Y(22)} ${X(28)},${Y(20)} ${X(37)},${Y(12)} C${X(40)},${Y(8)} ${X(36)},${Y(3)} ${X(30)},${Y(1)} L${X(-30)},${g} Q${X(-36)},${g} ${X(-37)},${Y(2)} Z`;
          out.push(h.path(foie, blanc(h.a.contour)));
          out.push(h.path(`M${X(-37)},${Y(7)} C${X(-30)},${Y(4)} ${X(-10)},${Y(7)} ${X(6)},${Y(7)} C${X(20)},${Y(7)} ${X(30)},${Y(6)} ${X(37.5)},${Y(11)}`, h.a.arete));
          out.push(h.path(`M${X(-26)},${Y(16)} C${X(-14)},${Y(19)} ${X(4)},${Y(18.5)} ${X(18)},${Y(15)}`, h.a.fin));
          // la ficelle : un tour autour de la tranche (sur le chant, puis sur le dessus), le nœud, le brin vers la main
          out.push(h.path(`M${X(-6)},${g} L${X(-6)},${Y(7)} Q${X(-5)},${Y(15)} ${X(-2)},${Y(22)}`, h.a.arete));
          out.push(h.cercle(X(-2), Y(22.5), 2.6, h.a.plein));
          out.push(h.path(`M${X(-2)},${Y(22.5)} L${f(z.l - 6)},${f(z.h * 0.06)}`, h.a.arete));
          // le sens de la traîne
          out.push(h.path(`M${f(x - 44)},${f(g - 40)} L${f(x - 6)},${f(g - 40)}`, halo));
          out.push(h.fleche(`M${f(x - 46)},${f(g - 40)} L${f(x - 4)},${f(g - 40)}`, h.a.arete));
          return out.join('\n');
        },
        renvois: z => [
          { n: 1, rond: [z.l * 0.2, z.h * 0.93], cible: [z.l * 0.42 - 16, z.h * 0.72 - 8], texte: 'foie au bout d’une ficelle' },
        ],
      },

      // ─── En plan : la première ligne du chiot ───
      chiot: {
        titre: 'La première ligne du chiot',
        dessin: z => {
          graine = 23;
          const y0 = z.h * 0.52;
          const route = mesure(lisse([[z.l * 0.13, y0], [z.l * 0.3, y0 - 6], [z.l * 0.5, y0 + 5], [z.l * 0.7, y0 - 4], [z.l * 0.87, y0 + 2]]));
          const sT = route.L * 6 / 36;               // environ 6 m de traîne, puis une trentaine de mètres de gouttes
          const out = [];
          const arbres = semer(z, [route], [[z.l * 0.94, y0, 18], [z.l * 0.06, y0, 20], ...places(renvoisChiot(z))], 9, 9, 15);
          arbres.forEach(a => out.push(arbre(...a)));
          // la traîne : l'herbe couchée dans le sens de la marche
          for (let s = 1; s < sT; s += 3) {
            const p = route.at(s), o = (alea() - 0.5) * 6, l = 5 + alea() * 4;
            out.push(h.ligne(f(p.x + p.nx * o), f(p.y + p.ny * o), f(p.x + p.nx * o + p.ux * l), f(p.y + p.ny * o + p.uy * l), h.a.fin));
          }
          // les gouttes
          for (let s = sT + 6; s < route.L - 8; s += 9 + alea() * 5) {
            const p = route.at(s), o = (alea() - 0.5) * 3;
            out.push(goutte(p.x + p.nx * o, p.y + p.ny * o, 1.7 + alea() * 0.5));
          }
          // le départ : le chiot debout au bout de la traîne, le nez sur la ligne
          const d = route.at(0);
          out.push(patte(d.x - 12, d.y - 8, 0, 1.6), patte(d.x - 7, d.y + 8, 0, 1.6), patte(d.x - 37, d.y - 8, 0, 1.6), patte(d.x - 32, d.y + 8, 0, 1.6));
          // le prix
          const e = route.at(route.L);
          out.push(queue(e.x + 12, e.y, 0, 1.2));
          return out.join('\n');
        },
        renvois: renvoisChiot,
      },

      // ─── En plan : la ligne longue, avec son virage ───
      longue: {
        titre: 'La ligne de 270 à 370 m, vieillie de 2 à 4 heures',
        dessin: z => {
          graine = 5;
          const { C, route, r1, r2, dense, gouttesLoin, rubans, renvois } = longue(z);
          const out = [];
          // le chien : il suit, dépasse le virage, tourne, revient et retrouve la ligne
          const avant = [];
          for (let s = r1.L - 150; s <= r1.L - 20; s += 26) { const p = r1.at(s); avant.push([p.x + p.nx * 6, p.y + p.ny * 6]); }
          const apres = [];
          for (let s = 80; s <= 150; s += 14) { const p = r2.at(s); apres.push([p.x + p.nx * 7, p.y + p.ny * 7]); }
          const boucle = [[C[0] + 26, C[1] + 7], [C[0] + 60, C[1] + 4], [C[0] + 84, C[1] - 12], [C[0] + 80, C[1] - 40], [C[0] + 54, C[1] - 58], [C[0] + 24, C[1] - 70]];
          const chien = lisse([...avant, ...boucle, ...apres]);
          const rChien = mesure(chien);
          // le sens de la ligne, au départ
          const p0 = route.at(4), p1 = route.at(34);
          const fl = [[p0.x - p0.nx * 13, p0.y - p0.ny * 13], [p1.x - p1.nx * 13, p1.y - p1.ny * 13]];
          const arbres = semer(z, [route, rChien, mesure(fl)], [...rubans, [C[0] + 4, z.h * 0.03, 18], ...places(renvois)], 40, 9, 16, 6);
          arbres.forEach(a => out.push(arbre(...a)));
          rubans.forEach(([x, y, r, a]) => out.push(alea() < 0.8 ? epinette(x, y, r) : bouleau(x, y, r), ruban(x, y, a)));
          // la ligne, là où elle passe
          out.push(h.path(polyd(route.pts), h.a.fin));
          for (let s = 3; s < dense; s += 4.2) {
            const p = route.at(s), o = (alea() - 0.5) * 3;
            out.push(goutte(p.x + p.nx * o, p.y + p.ny * o, 1.6));
          }
          gouttesLoin.forEach(p => out.push(goutte(p.x, p.y, 2)));
          out.push(h.fleche(polyd(fl), h.a.arete));
          out.push(h.path(polyd(chien.slice(0, -6)), h.a.cache));
          out.push(h.fleche(polyd(chien.slice(-8)), h.a.cache));
          // ses empreintes au-delà du virage, là où il a perdu la ligne
          [[C[0] + 36, C[1] + 7, 0], [C[0] + 62, C[1] + 3, -20], [C[0] + 82, C[1] - 18, -80]].forEach(([x, y, a]) => out.push(patte(x, y, a, 1.7)));
          // le prix
          const e = route.at(route.L);
          out.push(queue(e.x, e.y - 13, -90, 1.2));
          return out.join('\n');
        },
        renvois: z => longue(z).renvois,
      },
    },
    danger: 'Le foie se reprend au bout de la traîne et ne reste jamais sur la ligne. Un chien qui mange des abats crus de gibier ramène au chalet le parasite des kystes du poumon et du foie, et contamine la maisonnée par ses excréments, par les mains et par les légumes du jardin.',
  };
};
