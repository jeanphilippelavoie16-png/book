// Planche 96-09 — Le poquet (chapitre 96, § 9 « Variante d'urgence », « Les poquets »).
// Le chapitre dit : au lieu de bêcher, un trou à l'espacement de plantation, un coup de bêche de
// profond, la mousse gardée de côté ; dans le trou, la meilleure terre (la couche noire prise sous
// les aulnes, les bouleaux, les trembles), une poignée de varech rincé et haché, un peu de cendre
// d'os et de cendre de poêle froide à la cuillère, mêlées à la terre du trou et jamais posées
// contre la racine ; on plante dedans ; entre les trous la mousse reste, c'est déjà un paillis ;
// l'urine va au pied des plants. Aucune mesure du trou : aucune cote, la bêche sert d'échelle.
// Le sol en place est le podzol du § 3 : sous la mousse, une mince couche noire, la couche grise
// délavée, puis la couche couleur de rouille.
module.exports = (h) => {
  const N = '#1A1A1A', B = '#FFFFFF';
  const f = (v) => Math.round(v * 10) / 10;
  const P = (pts) => pts.map(([x, y]) => `${f(x)} ${f(y)}`).join(' L ');
  const blanc = (a) => a.replace('fill="none"', `fill="${B}"`);
  const poly = (pts, at) => `<path d="M ${P(pts)} Z" ${at}/>`;
  const ouvert = (pts, at) => `<path d="M ${P(pts)}" ${at}/>`;
  const FN = 'fill="url(#p9609-noire)" stroke="none"';
  const FS = 'fill="url(#p9609-sable)" stroke="none"';
  const FT = 'fill="url(#p9609-tapis)" stroke="none"';
  const DEFS = `<defs>
<pattern id="p9609-noire" width="3.6" height="3.6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M1.8 0 L1.8 3.6 M0 1.8 L3.6 1.8" fill="none" stroke="${N}" stroke-width="0.5"/></pattern>
<pattern id="p9609-sable" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="2" cy="2.5" r="0.7" fill="${N}" stroke="none"/><circle cx="6.6" cy="6.8" r="0.7" fill="${N}" stroke="none"/><circle cx="7.4" cy="1.4" r="0.5" fill="${N}" stroke="none"/></pattern>
<pattern id="p9609-tapis" width="11" height="10" patternUnits="userSpaceOnUse"><path d="M3 4 l-2 -1.4 M3 4 l2 -1.4 M3 4 l0 -2.6 M3 4 l-1.5 1.8 M3 4 l1.5 1.8 M8.5 8.6 l-1.6 -1.1 M8.5 8.6 l1.6 -1.1 M8.5 8.6 l0 -2 M8.5 8.6 l0 1.2" fill="none" stroke="${N}" stroke-width="0.5"/></pattern>
</defs>`;

  const alea = (s) => () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
  const bez = (p0, p1, p2, n = 8) => Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n, u = 1 - t;
    return [u * u * p0[0] + 2 * u * t * p1[0] + t * t * p2[0], u * u * p0[1] + 2 * u * t * p1[1] + t * t * p2[1]];
  });
  // Un ruban effilé le long d'une polyligne : racine, tige, lanière de varech.
  const ruban = (pts, w0, w1) => {
    const n = pts.length, g = [], d = [];
    pts.forEach((p, i) => {
      const a = pts[Math.max(0, i - 1)], b = pts[Math.min(n - 1, i + 1)];
      let tx = b[0] - a[0], ty = b[1] - a[1]; const L = Math.hypot(tx, ty) || 1; tx /= L; ty /= L;
      const w = (w0 + (w1 - w0) * i / (n - 1)) / 2;
      g.push([p[0] - ty * w, p[1] + tx * w]); d.push([p[0] + ty * w, p[1] - tx * w]);
    });
    return g.concat(d.reverse());
  };
  // Un bout de varech haché : un morceau plat de fucus, coupé net d'un bout, fourchu de l'autre,
  // avec sa nervure. Dessiné pour 16 de long, mis à l'échelle L.
  const VARECH = [[-8, -2.5], [0.5, -2.5], [6.9, -5.6], [8.6, -4.5], [8.7, -2.8], [3.2, 0], [8.7, 2.8], [8.6, 4.5],
    [6.9, 5.6], [0.5, 2.5], [-8, 2.5], [-7.5, 1], [-8.3, -0.4], [-7.6, -1.5]];
  const varech = (x, y, a, L) => {
    const k = L / 16, c = Math.cos(a), s = Math.sin(a);
    const T = ([u, v]) => [x + k * (c * u - s * v * 1.25), y + k * (s * u + c * v * 1.25)];
    return [poly(VARECH.map(T), blanc(h.a.detail)),
      ouvert([[-7.4, 0], [1.8, 0], [7.4, -3.8]].map(T), h.a.fin), ouvert([[1.8, 0], [7.4, 3.8]].map(T), h.a.fin)].join(' ');
  };
  // Un grain de cendre : un éclat blanc, anguleux.
  const grain = (x, y, r, rnd) => {
    const pts = [];
    for (let i = 0; i < 5; i++) {
      const a = i / 5 * 2 * Math.PI + rnd() * 0.7, rr = r * (0.65 + 0.45 * rnd());
      pts.push([x + Math.cos(a) * rr, y + Math.sin(a) * rr]);
    }
    return poly(pts, blanc(h.a.fin));
  };
  // Une feuille de plant de chou : pétiole, limbe arrondi plus large vers le bout, nervure.
  const feuille = (x, y, adeg, pl, bl, bw, trait = h.a.arete) => {
    const a = adeg * Math.PI / 180, ux = Math.cos(a), uy = -Math.sin(a), vx = -uy, vy = ux;
    const bx = x + ux * pl, by = y + uy * pl, pts = [];
    for (let i = 0; i <= 28; i++) {
      const t = i / 28 * 2 * Math.PI, u = (1 - Math.cos(t)) / 2 * bl;
      const w = Math.sin(t) * bw / 2 * (0.7 + 0.3 * u / bl);
      pts.push([bx + ux * u + vx * w, by + uy * u + vy * w]);
    }
    return [pl > 0 ? ouvert([[x, y], [bx, by]], trait) : '', poly(pts, blanc(trait)),
      ouvert([[bx, by], [bx + ux * bl * 0.82, by + uy * bl * 0.82]], h.a.fin)].join('\n');
  };
  // Le tapis de mousse en coupe : des coussins sur le dessus, des brins debout dedans.
  const mousse = (xa, xb, y0, th, rnd, bords = []) => {
    const n = Math.max(1, Math.round((xb - xa) / 5)), dx = (xb - xa) / n;
    let dessus = `M ${f(xa)} ${f(y0 - th)}`;
    for (let i = 0; i < n; i++) {
      const x = xa + i * dx;
      dessus += ` Q ${f(x + dx / 2)} ${f(y0 - th - 2.4 - rnd() * 1.4)} ${f(x + dx)} ${f(y0 - th)}`;
    }
    const out = [`<path d="${dessus} L ${f(xb)} ${f(y0)} L ${f(xa)} ${f(y0)} Z" fill="${B}" stroke="none"/>`];
    let b = '';
    for (let x = xa + 1.6; x < xb - 1; x += 3) {
      const top = y0 - th + 0.6 + rnd() * 1.4;
      b += ` M ${f(x)} ${f(y0)} L ${f(x)} ${f(top)}`;
      let s = rnd() < 0.5 ? 1 : -1;
      for (let y = y0 - 2.2; y > top + 1.2; y -= 2.4) { b += ` M ${f(x)} ${f(y)} l ${f(1.1 * s)} -1.1`; s = -s; }
    }
    out.push(`<path d="${b.trim()}" ${h.a.fin}/>`);
    out.push(`<path d="${dessus}" ${h.a.detail}/>`);
    bords.forEach((x) => out.push(ouvert([[x, y0], [x, y0 - th]], h.a.detail)));
    return out.join('\n');
  };

  // Le sol en place, en coupe, avec ou sans trou.
  //   g = { ys, cn, yr, mo, cx, wt, wb, D, trou: 'aucun' | 'vide' | 'plein', ouverte, graine }
  const terrain = (z, g) => {
    const x0 = 2, x1 = z.l - 2, yb = z.h - 2, out = [], rnd = alea(g.graine);
    const xs = []; for (let x = x0; x < x1; x += 4) xs.push(x); xs.push(x1);
    const yN = (x) => g.ys + g.cn + 0.8 * Math.sin(x / 11);
    const yR = (x) => g.yr + 2.5 * Math.sin(x / 23 + 1);
    const rev = (fn) => xs.slice().reverse().map((x) => [x, fn(x)]);
    out.push(poly([...xs.map((x) => [x, yR(x)]), [x1, yb], [x0, yb]], h.a.hachure('terre', 'aucun')));
    out.push(poly([...xs.map((x) => [x, yN(x)]), ...rev(yR)], FS));
    out.push(poly([...xs.map((x) => [x, g.ys]), ...rev(yN)], FN));
    out.push(ouvert(xs.map((x) => [x, yN(x)]), h.a.fin));
    out.push(ouvert(xs.map((x) => [x, yR(x)]), h.a.detail));
    const hl = g.cx - g.wt / 2, hr = g.cx + g.wt / 2;
    if (g.trou !== 'aucun') {
      const bl = g.cx - g.wb / 2, br = g.cx + g.wb / 2, yf = g.ys + g.D, r = 7;
      const murs = [[hl, g.ys], [bl, yf - r], ...bez([bl, yf - r], [bl, yf], [bl + r, yf], 4).slice(1),
        [br - r, yf], ...bez([br - r, yf], [br, yf], [br, yf - r], 4).slice(1), [hr, g.ys]];
      out.push(poly(murs, g.trou === 'vide' ? h.a.blanc : FN));
      out.push(ouvert(murs, h.a.arete));
    }
    if (g.trou === 'vide') {
      out.push(ouvert([[x0, g.ys], [hl, g.ys]], h.a.arete), ouvert([[hr, g.ys], [x1, g.ys]], h.a.arete));
    } else out.push(ouvert([[x0, g.ys], [x1, g.ys]], h.a.arete));
    if (g.ouverte) {
      out.push(mousse(x0, hl, g.ys, g.mo, rnd, [hl]), mousse(hr, x1, g.ys, g.mo, rnd, [hr]));
    } else out.push(mousse(x0, x1, g.ys, g.mo, rnd));
    return out.join('\n');
  };
  // Demi-largeur du trou à la profondeur y.
  const demi = (g, y) => g.wt / 2 + (g.wb - g.wt) / 2 * (y - g.ys) / g.D;
  // Le mélange du trou : varech et cendre semés dans la terre noire, hors des zones interdites.
  const melange = (g, nv, nc, lv, wv, rc, graine, interdit = () => false) => {
    const rnd = alea(graine), out = [];
    let k = 0, essais = 0;
    const pris = [];
    const libre = (x, y, d) => pris.every(([a, b, e]) => Math.hypot(a - x, b - y) > d + e);
    while (k < nv + nc && essais++ < 4000) {
      const y = g.ys + 5 + rnd() * (g.D - 10), x = g.cx + (rnd() * 2 - 1) * (demi(g, y) - 7);
      const v = k < nv, d = v ? lv * 0.55 : rc * 1.6;
      if (interdit(x, y) || !libre(x, y, d)) continue;
      pris.push([x, y, d]);
      out.push(v ? varech(x, y, rnd() * 2 * Math.PI, lv * (0.8 + 0.4 * rnd())) : grain(x, y, rc, rnd));
      k++;
    }
    return out.join('\n');
  };

  // ─── Les trois gestes : même sol, même trou, même échelle ───
  const geste = (z) => {
    const D = 0.36 * z.h, ys = 0.4 * z.h;
    return { ys, cn: 3.5, yr: ys + D + 7, mo: 7, cx: 0.3 * z.l, wt: 1.45 * D, wb: 1.15 * D, D };
  };

  // ─── La coupe du poquet planté ───
  const grand = (z) => {
    const D = Math.min(0.5 * z.h, 125), ys = z.h - 4 - D - 24;
    return { ys, cn: 6, yr: ys + D + 9, mo: 13, cx: z.l / 2, wt: 1.5 * D, wb: 1.18 * D, D };
  };
  const racineZone = (g) => ({ cx: g.cx, cy: g.ys + 0.3 * g.D, rx: 0.24 * g.wt, ry: 0.4 * g.D });
  const cibles = (g) => ({
    noire: [g.cx - 0.27 * g.wt, g.ys + 0.66 * g.D],
    varech: [g.cx + 0.3 * g.wt, g.ys + 0.2 * g.D],
    cendre: [g.cx - 0.3 * g.wt, g.ys + 0.24 * g.D],
    racine: [g.cx + 2, g.ys + 0.325 * g.D],
  });
  const goutte = (x, y, r) => {                       // une goutte qui tombe, pointe vers le haut
    const pts = [[x, y - 2.4 * r], ...bez([x, y - 2.4 * r], [x + 1.6 * r, y - 0.2 * r], [x, y + r], 5).slice(1),
      ...bez([x, y + r], [x - 1.6 * r, y - 0.2 * r], [x, y - 2.4 * r], 5).slice(1)];
    return poly(pts, blanc(h.a.detail));
  };
  const urine = (g) => {
    const m = [g.cx + 0.6 * g.wt, g.ys - 0.26 * g.D];                    // centre de la bouche de la boîte
    const lev = [m[0] + 10 * Math.sin(0.75), m[1] + 10 * Math.cos(0.75)]; // la lèvre basse, d'où ça coule
    return { m, a: [lev[0] - 2, lev[1] + 0.5], b: [g.cx + 0.055 * g.wt, g.ys - 2.5] };
  };

  // ─── Le plan ───
  const plan = (z) => {
    const cx = z.l / 2, sx = 104, r = 20, y1 = 0.31 * z.h, y2 = 0.75 * z.h;
    return { cx, sx, r, y1, y2, xa: 44, xb: z.l - 44, demiCoupe: 70 };
  };

  return {
    ref: '96-09',
    titre: 'Le poquet',
    desc: 'Au lieu de bêcher un champ, un trou par plant dans la mousse. Un : la mousse est levée en plaque au-dessus du trou et posée de côté. Deux : le trou, d’un coup de bêche de profond, traverse la mince couche noire et la couche grise du sol en place ; la lame de la bêche y tient juste. Trois : on le remplit de terre noire, on y jette une poignée de varech haché et un peu de cendre à la cuillère, et on mêle. Quatre, en coupe : le plant de chou repiqué au milieu, ses racines dans la terre noire sans rien de posé contre elles, les bouts de varech et les grains de cendre semés dans le reste du trou, la mousse laissée en place tout autour, l’urine versée d’une boîte penchée au pied du plant, sous les feuilles. Vu de dessus : deux rangs de trous dans le tapis de mousse, un plant par trou, la ligne de la coupe sur l’un d’eux.',
    format: 'pleine',
    disposition: [['lever', 'creuser', 'remplir'], ['coupe'], ['plan']],
    hauteurs: [1, 1.65, 1.05],
    vues: {
      lever: {
        titre: '1. Lever la mousse',
        dessin: (z) => {
          const g = geste(z), rnd = alea(11), out = [DEFS];
          out.push(terrain(z, { ...g, trou: 'aucun', ouverte: true, graine: 3 }));
          // La plaque levée, posée à plat sur la mousse, à droite du trou.
          const xa = g.cx + g.wt / 2 + 10, xb = xa + g.wt, yP = g.ys - g.mo - 1.5, m = 3;
          out.push(poly([[xa, yP], [xb, yP], [xb, yP - m], [xa, yP - m]], FN));
          out.push(mousse(xa, xb, yP - m, g.mo, rnd, [xa, xb]));
          out.push(ouvert([[xa, yP - m - g.mo], [xa, yP], [xb, yP], [xb, yP - m - g.mo]], h.a.arete));
          // Le geste : du trou vers la plaque.
          out.push(h.fleche(`M ${f(g.cx)} ${f(g.ys - 4)} Q ${f(g.cx + 12)} ${f(g.ys - 54)} ${f((xa + xb) / 2 - 8)} ${f(yP - m - g.mo - 6)}`));
          return out.join('\n');
        },
        renvois: (z) => {
          const g = geste(z), xa = g.cx + g.wt / 2 + 10;
          return [{ n: 1, rond: [z.l - 12, 12], cible: [xa + g.wt * 0.75, g.ys - g.mo - 7], texte: 'mousse levée en plaque, gardée de côté' }];
        },
      },
      creuser: {
        titre: '2. Creuser',
        dessin: (z) => {
          const g = geste(z), out = [];
          out.push(terrain(z, { ...g, trou: 'vide', ouverte: true, graine: 5 }));
          // La bêche, lame de face, enfoncée jusqu'au marchepied : le trou a sa profondeur.
          const bw = 0.56 * g.D, top = g.ys - 2, bot = g.ys + g.D - 1, cx = g.cx, yd = top - 22;
          out.push(poly([[cx - bw / 2, top], [cx + bw / 2, top], [cx + bw / 2, bot - 2.5],
            ...bez([cx + bw / 2, bot - 2.5], [cx, bot + 2.5], [cx - bw / 2, bot - 2.5], 8).slice(1)], blanc(h.a.arete)));
          out.push(ouvert([[cx - 5, top], [cx, top + 0.42 * g.D], [cx + 5, top]], h.a.detail));
          out.push(h.rect(cx - bw / 2 - 1.5, top - 2.5, bw + 3, 2.5, blanc(h.a.detail)));
          out.push(poly([[cx - 5.5, top - 2.5], [cx + 5.5, top - 2.5], [cx + 2.8, yd], [cx - 2.8, yd]], blanc(h.a.arete)));
          out.push(h.cercle(cx, top - 8, 0.9, h.a.plein), h.cercle(cx, top - 15, 0.9, h.a.plein));
          out.push(h.rect(cx - 2, 2, 4, yd - 2, h.a.blanc));
          out.push(ouvert([[cx - 2.6, 2], [cx - 2.6, yd]], h.a.arete), ouvert([[cx + 2.6, 2], [cx + 2.6, yd]], h.a.arete));
          return out.join('\n');
        },
        renvois: (z) => {
          const g = geste(z);
          return [
            { n: 2, rond: [z.l - 12, 12], cible: [g.cx + 0.12 * g.D, g.ys + 0.3 * g.D], texte: 'un coup de bêche de profond' },
            { n: 3, rond: [z.l - 12, g.ys + 0.7 * g.D], cible: [g.cx + g.wt / 2 + 22, g.ys + 0.55 * g.D], texte: 'sable gris : le sol en place' },
          ];
        },
      },
      remplir: {
        titre: '3. Remplir et mêler',
        dessin: (z) => {
          const g = geste(z), rnd = alea(29), out = [];
          out.push(terrain(z, { ...g, trou: 'plein', ouverte: true, graine: 7 }));
          out.push(melange(g, 6, 14, 10, 0, 1.5, 41));
          // La cuillère de cendre, penchée au-dessus du trou.
          const sx = g.cx - 0.2 * g.wt, sy = 14, a = -0.5;
          const bol = []; for (let i = 0; i <= 24; i++) { const t = i / 24 * 2 * Math.PI, u = 7 * Math.cos(t), v = 3.6 * Math.sin(t); bol.push([sx + u * Math.cos(a) - v * Math.sin(a), sy + u * Math.sin(a) + v * Math.cos(a)]); }
          out.push(poly(ruban([[sx - 6 * Math.cos(a), sy - 6 * Math.sin(a)], [sx - 30 * Math.cos(a) , sy - 30 * Math.sin(a) - 6]], 3, 2), blanc(h.a.detail)));
          out.push(poly(bol, blanc(h.a.arete)));
          [[5, 6], [3, 11], [7, 16], [4, 22]].forEach(([dx, dy]) => out.push(grain(sx + dx, sy + dy, 1.5, rnd)));
          out.push(h.fleche(`M ${f(sx + 10)} ${f(sy + 8)} L ${f(sx + 10)} ${f(g.ys - 4)}`));
          // Les bouts de varech qui tombent.
          const vx = g.cx + 0.22 * g.wt;
          [[0, 8, 0.3], [4, 17, 2.2], [-2, 26, 1.1]].forEach(([dx, dy, an]) => out.push(varech(vx + dx, dy, an, 10)));
          out.push(h.fleche(`M ${f(vx + 10)} 8 L ${f(vx + 10)} ${f(g.ys - 4)}`));
          return out.join('\n');
        },
        renvois: (z) => {
          const g = geste(z);
          return [{ n: 4, rond: [z.l - 12, g.ys + 0.5 * g.D], cible: [g.cx + 0.18 * g.wt, g.ys + 0.62 * g.D], texte: 'tout mêlé à la terre du trou' }];
        },
      },
      coupe: {
        titre: '4. Planté, en coupe A-A',
        dessin: (z) => {
          const g = grand(z), out = [], c = cibles(g), rz = racineZone(g), rnd = alea(53);
          out.push(terrain(z, { ...g, trou: 'plein', ouverte: true, graine: 9 }));
          const interdit = (x, y) => ((x - rz.cx) / (rz.rx * 1.08)) ** 2 + ((y - rz.cy) / (rz.ry * 1.08)) ** 2 < 1
            || Object.values(c).some(([a, b]) => Math.hypot(a - x, b - y) < 12);
          out.push(melange(g, 11, 26, 17, 0, 2.3, 67, interdit));
          // Les éléments nommés, posés exprès sous leur renvoi.
          out.push(varech(c.varech[0], c.varech[1], 0.35, 18));
          [[0, 0], [5, 3], [-3, 5], [2, -5]].forEach(([dx, dy]) => out.push(grain(c.cendre[0] + dx, c.cendre[1] + dy, 2.3, rnd)));
          // Les racines, dans la terre noire seule.
          const ys = g.ys, D = g.D, cx = g.cx;
          const rac = (pts, w0, w1) => poly(ruban(pts, w0, w1), blanc(h.a.detail));
          out.push(rac(bez([cx, ys], [cx + 5, ys + 0.32 * D], [cx - 2, ys + 0.66 * D], 10), 5.5, 1.3));
          const rr = alea(71);
          for (let i = 0; i < 9; i++) {
            const p = 0.07 + i * 0.058, sg = i % 2 ? 1 : -1;
            const t = p / 0.66, x0 = cx + 10 * t * (1 - t) - 2 * t * t, y0 = ys + p * D;
            const len = (0.2 - p * 0.16) * g.wt * (0.8 + 0.3 * rr()), an = (22 + p * 70 + rr() * 14) * Math.PI / 180;
            const e = [x0 + sg * len * Math.cos(an), y0 + len * Math.sin(an)];
            const m = [x0 + sg * len * 0.55 * Math.cos(an) + sg * 3, y0 + len * 0.55 * Math.sin(an) - 5];
            const pts = bez([x0, y0], m, e, 8);
            out.push(rac(pts, 3, 0.9));
            if (len > 18) {
              const q = pts[4], a2 = an + 0.7;
              out.push(rac(bez(q, [q[0] + sg * len * 0.18 * Math.cos(a2), q[1] + len * 0.12 * Math.sin(a2)], [q[0] + sg * len * 0.36 * Math.cos(a2), q[1] + len * 0.36 * Math.sin(a2)], 5), 1.5, 0.7));
            }
          }
          // Le plant de chou repiqué : tige, quatre feuilles, le cœur.
          const tige = ruban([[cx, ys + 1], [cx, ys - 44]], 6, 5);
          out.push(poly(tige, blanc(h.a.arete)));
          out.push(feuille(cx - 2, ys - 15, 158, 13, 44, 32));
          out.push(feuille(cx + 2, ys - 15, 22, 13, 44, 32));
          out.push(feuille(cx - 2, ys - 38, 118, 9, 36, 26));
          out.push(feuille(cx + 2, ys - 38, 62, 9, 36, 26));
          out.push(feuille(cx, ys - 44, 90, 0, 10, 7));
          // L'urine, versée au pied depuis une boîte de conserve penchée, sous les feuilles.
          const u = urine(g), ax = [-Math.cos(0.75), Math.sin(0.75)], pv = [-ax[1], ax[0]].map((v) => -v);
          const M = u.m, R = 10, Lb = 26, Bc = [M[0] - ax[0] * Lb, M[1] - ax[1] * Lb];
          const bout = (C, sgn) => Array.from({ length: 13 }, (_, i) => {
            const t = Math.PI * i / 12, cu = Math.cos(t), sv = Math.sin(t);
            return [C[0] + pv[0] * R * cu - sgn * ax[0] * 3.6 * sv, C[1] + pv[1] * R * cu - sgn * ax[1] * 3.6 * sv];
          });
          out.push(poly([...bout(M, -1), ...bout(Bc, 1).reverse()], blanc(h.a.arete)));
          [0.33, 0.66].forEach((t) => {
            const C = [M[0] - ax[0] * Lb * t, M[1] - ax[1] * Lb * t];
            out.push(ouvert(bout(C, 1), h.a.fin));
          });
          const ell = Array.from({ length: 25 }, (_, i) => {
            const t = 2 * Math.PI * i / 24;
            return [M[0] + pv[0] * R * Math.cos(t) + ax[0] * 3.6 * Math.sin(t), M[1] + pv[1] * R * Math.cos(t) + ax[1] * 3.6 * Math.sin(t)];
          });
          out.push(poly(ell, blanc(h.a.arete)));
          out.push(h.fleche(`M ${f(u.a[0])} ${f(u.a[1])} L ${f(u.b[0])} ${f(u.b[1])}`));
          return out.join('\n');
        },
        renvois: (z) => {
          const g = grand(z), c = cibles(g), u = urine(g);
          const hl = g.cx - g.wt / 2, hr = g.cx + g.wt / 2;
          return [
            { n: 5, rond: [hl - 70, g.ys - 50], cible: [hl - 38, g.ys - g.mo * 0.5], texte: 'mousse laissée autour du trou' },
            { n: 6, rond: [hl - 44, g.ys + 0.66 * g.D], cible: c.noire, texte: 'terre noire d’aulnes, bouleaux, trembles' },
            { n: 7, rond: [hr + 44, g.ys + 0.16 * g.D], cible: c.varech, texte: 'varech rincé et haché : une poignée' },
            { n: 8, rond: [hl - 44, g.ys + 0.24 * g.D], cible: c.cendre, texte: 'cendre d’os et de poêle, à la cuillère' },
            { n: 9, rond: [hr + 44, g.ys + 0.52 * g.D], cible: c.racine, texte: 'rien de posé contre la racine' },
            { n: 10, rond: [u.m[0] - 25, u.m[1] - 50], cible: [(u.a[0] * 2 + u.b[0]) / 3, (u.a[1] * 2 + u.b[1]) / 3], texte: 'urine au pied du plant' },
          ];
        },
      },
      plan: {
        titre: 'Vu de dessus',
        dessin: (z) => {
          const p = plan(z), out = [];
          out.push(h.rect(p.xa, 3, p.xb - p.xa, z.h - 6, FT));
          out.push(ouvert([[p.xa, 3], [p.xb, 3]], h.a.detail), ouvert([[p.xa, z.h - 3], [p.xb, z.h - 3]], h.a.detail));
          out.push(ouvert([[p.xa, 3], [p.xa, z.h - 3]], h.a.detail), ouvert([[p.xb, 3], [p.xb, z.h - 3]], h.a.detail));
          [p.y1, p.y2].forEach((y) => [-2, -1, 0, 1, 2].forEach((k) => {
            const x = p.cx + k * p.sx;
            out.push(h.cercle(x, y, p.r + 3, h.a.blanc));
            out.push(h.cercle(x, y, p.r, FN));
            out.push(h.cercle(x, y, p.r, h.a.arete));
            const tourne = (k * 37 + (y === p.y1 ? 0 : 19));
            [0, 90, 180, 270].forEach((a, i) => out.push(feuille(x, y, a + tourne, 1.5, i % 2 ? 7 : 10.5, i % 2 ? 6.5 : 9.5, h.a.detail)));
            out.push(h.cercle(x, y, 2, blanc(h.a.detail)));
          }));
          // La ligne de coupe A-A et le sens du regard.
          const xg = p.cx - p.demiCoupe, xd = p.cx + p.demiCoupe;
          out.push(`<path d="M ${f(xg)} ${f(p.y1)} L ${f(xd)} ${f(p.y1)}" fill="none" stroke="${N}" stroke-width="0.7" stroke-dasharray="9 3 2 3"/>`);
          out.push(ouvert([[xg, p.y1], [xg + 8, p.y1]], h.a.contour), ouvert([[xd - 8, p.y1], [xd, p.y1]], h.a.contour));
          [xg, xd].forEach((x) => {
            out.push(h.fleche(`M ${f(x)} ${f(p.y1)} L ${f(x)} ${f(p.y1 - 20)}`));
          });
          out.push(h.rect(xg - 18, p.y1 - 30, 10, 14, h.a.blanc), h.rect(xd + 8, p.y1 - 30, 10, 14, h.a.blanc));
          out.push(h.texte(xg - 13, p.y1 - 19, 'A'), h.texte(xd + 13, p.y1 - 19, 'A'));
          return out.join('\n');
        },
        renvois: (z) => {
          const p = plan(z);
          return [
            { n: 11, rond: [z.l - 18, p.y2], cible: [p.cx + 1.5 * p.sx, p.y2 + 6], texte: 'la mousse entre les trous : un paillis' },
            { n: 12, rond: [18, p.y2], cible: [p.cx - 2 * p.sx - 8, p.y2 + 10], texte: 'un trou par plant, à son espacement' },
          ];
        },
      },
    },
  };
};
