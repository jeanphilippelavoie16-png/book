// Planche 96-05 — Le drainage du champ (chapitre 96, étape 12 « Drainer avant d'engraisser »,
// étape 11 « Épierrer », étape 13 pour les planches de 1,2 m de centre à centre).
// Le chapitre dit : un fossé de ceinture en haut du champ, en travers de la pente, coupe l'eau qui
// descend du bois avant qu'elle entre dans les planches. Une tranchée filtrante vide un creux :
// remplie de pierres (les moyennes de l'épierrage), recouverte de branches d'épinette puis de terre,
// le fond qui descend sans contre-pente jusqu'au point bas, où l'eau sort ; elle passe dans l'allée
// ou en bordure, jamais sous une planche. Au printemps, la charrue à rigoles (planche 96-06) trace
// les rigoles qui vident le champ à la fonte. Planches de 1,2 m de centre à centre, environ 76 cm
// de terre cultivée ; les allées ne se bêchent plus.
// Aucune mesure du fossé, de la tranchée ni des rigoles dans le chapitre : aucune cote sur eux.
// La seule cote est le 1200 de centre à centre des planches.
// Vues alignées : le plan et la coupe A-A partagent leurs x (le bois à gauche, en haut de la
// pente ; le point bas à droite). B-B coupe la tranchée en travers, à l'échelle vraie ; la rigole
// en travers est un détail, deux fois plus gros.
module.exports = (h) => {
  const N = '#1A1A1A', B = '#FFFFFF';
  const f = (v) => Math.round(v * 10) / 10;
  const P = (pts) => pts.map(([x, y]) => `${f(x)} ${f(y)}`).join(' L ');
  const blanc = (a) => a.replace('fill="none"', `fill="${B}"`);
  const poly = (pts, at) => `<path d="M ${P(pts)} Z" ${at}/>`;
  const ouvert = (pts, at) => `<path d="M ${P(pts)}" ${at}/>`;
  const alea = (s) => () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
  const SOL = 'fill="url(#p9605-sol)" stroke="none"';
  const BECH = 'fill="url(#p9605-bech)" stroke="none"';
  const MIXTE = 'stroke-dasharray="11 2.5 2 2.5"';
  const DEFS = `<defs>
<pattern id="p9605-sol" width="12" height="10" patternUnits="userSpaceOnUse"><circle cx="2.5" cy="2.5" r="0.6" fill="${N}"/><circle cx="8.5" cy="7.5" r="0.6" fill="${N}"/><path d="M7 2.2 l2.2 0 M1.5 7.6 l2 0" fill="none" stroke="${N}" stroke-width="0.5"/></pattern>
<pattern id="p9605-bech" width="8" height="7" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="0.9" fill="none" stroke="${N}" stroke-width="0.5"/><circle cx="6" cy="5.5" r="0.9" fill="none" stroke="${N}" stroke-width="0.5"/></pattern>
</defs>`;

  // Une pierre : un galet irrégulier, blanc, contour fin.
  const pierre = (x, y, rx, ry, rnd, at = h.a.detail) => {
    const pts = [], n = 9, a0 = rnd() * 6.3;
    for (let i = 0; i < n; i++) {
      const a = a0 + i / n * 2 * Math.PI, k = 0.84 + 0.2 * rnd();
      pts.push([x + Math.cos(a) * rx * k, y + Math.sin(a) * ry * k]);
    }
    // arrondi : courbes par les milieux
    const m = pts.map((p, i) => { const q = pts[(i + 1) % n]; return [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]; });
    let d = `M ${f(m[n - 1][0])} ${f(m[n - 1][1])}`;
    for (let i = 0; i < n; i++) d += ` Q ${f(pts[i][0])} ${f(pts[i][1])} ${f(m[i][0])} ${f(m[i][1])}`;
    return `<path d="${d} Z" ${blanc(at)}/>`;
  };
  // Un rameau d'épinette couché : la tige et ses aiguilles courtes, tout autour, pointées vers le bout.
  const rameau = (x, y, L, adeg, k = 1) => {
    const a = adeg * Math.PI / 180, ux = Math.cos(a), uy = Math.sin(a), vx = -uy, vy = ux;
    let d = '';
    for (let s = 1.4; s < L - 1; s += 1.7 * k) {
      const px = x + ux * s, py = y + uy * s, la = 3 * k * (1 - 0.35 * s / L);
      d += ` M ${f(px)} ${f(py)} l ${f((ux * 0.55 + vx * 0.83) * la)} ${f((uy * 0.55 + vy * 0.83) * la)}`;
      d += ` M ${f(px)} ${f(py)} l ${f((ux * 0.55 - vx * 0.83) * la)} ${f((uy * 0.55 - vy * 0.83) * la)}`;
    }
    return `<path d="${d.trim()}" ${h.a.fin}/>` + ouvert([[x, y], [x + ux * L, y + uy * L]], h.a.detail);
  };
  // Une épinette de profil : flèche étroite, étages en dents de scie, bout de tronc.
  const epinette = (x, yb, ht) => {
    const top = yb - ht, cb = yb - ht * 0.08, n = 7, w = ht * 0.2, g = [], d = [];
    for (let i = 1; i <= n; i++) {
      const yo = top + (cb - top) * i / n, wo = w * Math.pow(i / n, 0.9);
      const yi = yo - (cb - top) / n * 0.35, wi = wo * 0.5;
      g.push([x - wi, yi], [x - wo, yo]); d.push([x + wi, yi], [x + wo, yo]);
    }
    return [ouvert([[x, yb], [x, cb]], h.a.detail),
      poly([[x, top], ...d, [x, cb], ...g.reverse()], blanc(h.a.detail))].join('\n');
  };
  // Une épinette vue de dessus : une couronne en étoile, la tête au centre.
  const couronne = (x, y, r, rnd) => {
    const pts = [], n = 13;
    for (let i = 0; i < 2 * n; i++) {
      const a = i / (2 * n) * 2 * Math.PI, rr = (i % 2 ? 0.66 : 1) * r * (0.9 + 0.18 * rnd());
      pts.push([x + Math.cos(a) * rr, y + Math.sin(a) * rr]);
    }
    return poly(pts, blanc(h.a.detail)) + h.cercle(x, y, 1.1, h.a.plein);
  };
  // Un semis : une tige et deux feuilles.
  const semis = (x, yb, s = 1) => [
    ouvert([[x, yb], [x, yb - 7 * s]], h.a.detail),
    h.ellipse(x - 3.4 * s, yb - 8.4 * s, 3.4 * s, 1.5 * s, blanc(h.a.detail)),
    h.ellipse(x + 3.4 * s, yb - 8.4 * s, 3.4 * s, 1.5 * s, blanc(h.a.detail)),
  ].join('\n');
  const lettre = (x, y, s) => h.texte(x, y, s, { lisere: true });

  // ─── Géométrie partagée par le plan et la coupe A-A ───────────────────────────────────
  const G = (z) => {
    const W = z.l, xf = 88, xF0 = 108, xT = W - 56, xF1 = xT - 10;
    const xc = xF0 + 0.4 * (xF1 - xF0);
    return { W, xf, xF0, xF1, xT, xc, xs: xc - 14, xB: xF0 + 0.74 * (xF1 - xF0) };
  };

  // ─── Le champ vu de dessus ────────────────────────────────────────────────────────────
  const plan = (z) => {
    const g = G(z), { W, xf, xF0, xF1, xT, xc, xs, xB } = g, H = z.h, rnd = alea(9605);
    const y0 = 18, Pc = (H - y0 - 24) / 4, pw = Pc * 0.633, aw = Pc - pw;
    const yA = (i) => y0 + i * Pc;              // centre de l'allée i (0 et 4 : bordures)
    const yM = yA(2), yF = y0 + 4 * Pc;
    const out = [DEFS];
    // le bois
    const arbres = [[14, 12, 10], [42, 14, 11], [66, 12, 8], [22, 40, 11], [48, 48, 9], [16, 70, 10], [42, 76, 11],
      [68, 66, 8], [30, 100, 8], [44, 132, 11], [20, 140, 9], [66, 124, 8], [34, 160, 10], [60, 178, 9],
      [16, 186, 11], [42, 200, 10], [66, 208, 9], [20, 214, 8]];
    arbres.filter(([, y]) => y < H - 6).forEach(([x, y, r]) => out.push(couronne(x, y, r, rnd)));
    // les planches
    for (let i = 0; i < 4; i++) {
      const yt = yA(i) + aw / 2;
      out.push(h.rect(xF0 + 4, yt, xF1 - xF0 - 4, pw, blanc(h.a.fin)), h.rect(xF0 + 4, yt, xF1 - xF0 - 4, pw, BECH));
    }
    // le creux où l'eau restait, par-dessus les planches, puis les bords des planches redessinés
    const cr = [];
    for (let i = 0; i < 24; i++) {
      const a = i / 24 * 2 * Math.PI, k = 1 + 0.1 * Math.sin(3 * a + 1) + 0.06 * Math.cos(5 * a);
      cr.push([xc + 6 + Math.cos(a) * 40 * k, yM + Math.sin(a) * Pc * 0.62 * k]);
    }
    out.push(poly(cr, h.a.blanc), poly(cr, h.a.hachure('eau', 'aucun')), poly(cr, h.a.detail));
    for (let i = 0; i < 4; i++) out.push(h.rect(xF0 + 4, yA(i) + aw / 2, xF1 - xF0 - 4, pw, h.a.detail));
    // la tranchée filtrante, enterrée : arêtes cachées, de son bout dans le creux jusqu'au talus
    const tw = aw * 0.72;
    out.push(ouvert([[xT, yM - tw / 2], [xs, yM - tw / 2], [xs, yM + tw / 2], [xT, yM + tw / 2]], h.a.cache));
    out.push(h.fleche(`M ${f(xs + 16)} ${f(yM)} L ${f(xT + 18)} ${f(yM)}`));
    // les rigoles, dans les deux autres allées
    [1, 3].forEach((i) => {
      const y = yA(i);
      out.push(ouvert([[xF0 + 10, y - 2], [xT, y - 2]], h.a.detail), ouvert([[xF0 + 10, y + 2], [xT, y + 2]], h.a.detail),
        ouvert([[xF0 + 10, y - 2], [xF0 + 10, y + 2]], h.a.detail));
      out.push(h.fleche(`M ${f(xT - 26)} ${f(y)} L ${f(xT + 18)} ${f(y)}`, h.a.detail));
    });
    // le fossé de ceinture : en travers de la pente, puis le long du bas du champ jusqu'au talus
    const yc = yF + 16, r = 12, e = 4.5;
    const bord = (o) => `M ${f(xf + o)} 5 L ${f(xf + o)} ${f(yc - r)} A ${f(r - o)} ${f(r - o)} 0 0 0 ${f(xf + r)} ${f(yc - o)} L ${f(xT)} ${f(yc - o)}`;
    out.push(`<path d="${bord(-e)}" ${h.a.arete}/>`, `<path d="${bord(e)}" ${h.a.arete}/>`);
    out.push(ouvert([[xf - e, 5], [xf + e, 5]], h.a.arete));
    out.push(h.fleche(`M ${f(xf)} 16 L ${f(xf)} ${f(yM - 10)}`, h.a.detail));
    out.push(h.fleche(`M ${f(xf)} ${f(yM + 10)} L ${f(xf)} ${f(yc - r)} A ${r} ${r} 0 0 0 ${f(xf + r)} ${f(yc)} L ${f(xF0 + 60)} ${f(yc)}`, h.a.detail));
    out.push(h.fleche(`M ${f(xT - 40)} ${f(yc)} L ${f(xT + 18)} ${f(yc)}`, h.a.detail));
    // l'eau qui descend du bois, coupée par le fossé
    [yA(0) + 12, yA(1) + 30, yA(3) - 6].forEach((y) => out.push(h.fleche(`M 58 ${f(y)} L ${f(xf - 8)} ${f(y)}`)));
    // le talus du point bas : trait de crête et hachures vers le bas de la pente
    out.push(ouvert([[xT, 4], [xT, H - 4]], h.a.arete));
    for (let y = 8, i = 0; y < H - 6; y += 6, i++) out.push(poly([[xT, y - 1.3], [xT + (i % 2 ? 5 : 10), y], [xT, y + 1.3]], h.a.plein));
    // coupes A-A (le long de la tranchée) et B-B (en travers)
    out.push(ouvert([[14, yM], [W - 14, yM]], `${h.a.fin} ${MIXTE}`));
    out.push(ouvert([[2, yM], [12, yM]], h.a.contour), ouvert([[W - 12, yM], [W - 2, yM]], h.a.contour));
    out.push(lettre(7, yM - 7, 'A'), lettre(W - 7, yM - 7, 'A'));
    out.push(ouvert([[xB, y0 - 2], [xB, yF + 2]], `${h.a.fin} ${MIXTE}`));
    out.push(ouvert([[xB, y0 - 12], [xB, y0 - 3]], h.a.contour), ouvert([[xB, yF + 1], [xB, yF + 6.5]], h.a.contour));
    out.push(lettre(xB + 9, y0 - 4, 'B'), lettre(xB + 9, yF + 8, 'B'));
    return out.join('\n');
  };

  // ─── Coupe A-A, le long de la tranchée ────────────────────────────────────────────────
  const longue = (z) => {
    const g = G(z), { W, xf, xT, xc, xs } = g, Hl = z.h;
    const gA = 0.36 * Hl, yTal = Hl - 40, s = (yTal - gA) / xT, drop = 30;
    const yG = (x) => {
      if (x <= xT) return gA + s * x + 12 * Math.exp(-Math.pow((x - xc) / 24, 2));
      if (x <= xT + 10) return yTal + drop * (x - xT) / 10;
      return yTal + drop + s * (x - xT - 10);
    };
    const xo = xT + 8, yo = yG(xo);               // la sortie, dans la face du talus
    const yb0 = yG(xs) + 24, yB = (x) => yb0 + (yo - yb0) * (x - xs) / (xo - xs);
    const face = (o) => [xT + o * 10 / drop, yTal + o];
    const xsFossé = [xf - 9, xf - 3, xf + 3, xf + 9], yfb = yG(xf) + 15;
    const pts = []; for (let x = 0; x <= W; x += 3) pts.push(x);
    [xf - 9, xf + 9, xs, xT, xT + 10, xo, W].forEach((x) => pts.push(x));
    const xsTri = [...new Set(pts)].sort((a, b) => a - b);
    const out = [DEFS];
    // le sol en place, fossé ouvert
    const surf = [];
    xsTri.forEach((x) => {
      if (x > xf - 9 && x < xf + 9) return;
      if (x === xf + 9) surf.push([xf - 3, yfb], [xf + 3, yfb]);
      surf.push([x, yG(x)]);
    });
    out.push(poly([...surf, [W, Hl], [0, Hl]], SOL));
    // l'eau au fond du fossé
    const ye = yfb - 5, k = 6 / 15;
    out.push(poly([[xf - 3 - 5 * k, ye], [xf + 3 + 5 * k, ye], [xf + 3, yfb], [xf - 3, yfb]], h.a.hachure('eau', 'aucun')));
    // la tranchée : bande de terre, bande d'épinette, pierres jusqu'au fond
    const xr = xsTri.filter((x) => x >= xs && x <= xT);
    const bande = (o1, o2) => [...xr.map((x) => [x, yG(x) + o1]), face(o1), face(o2), ...xr.slice().reverse().map((x) => [x, yG(x) + o2])];
    const tr = [...xr.map((x) => [x, yG(x)]), [xo, yo], [xs, yb0]];
    out.push(poly(tr, h.a.blanc));
    out.push(poly([...xr.map((x) => [x, yG(x) + 11]), face(11), [xo, yo], [xs, yb0]], h.a.hachure('pierre', 'aucun')));
    out.push(poly(bande(0, 6), h.a.hachure('terre', 'aucun')));
    out.push(`<clipPath id="p9605-epA"><path d="M ${P(bande(6, 11.1))} Z" fill="none"/></clipPath>`);
    let ep = '';
    for (let x = xs; x < xT + 4; x += 7) ep += rameau(x, yG(x) + 8.5, 10, 8 + (x % 3) * 4, 0.7);
    out.push(`<g clip-path="url(#p9605-epA)">${ep}</g>`);
    out.push(ouvert(bande(6, 6).slice(0, xr.length + 1), h.a.fin), ouvert(bande(11, 11).slice(0, xr.length + 1), h.a.fin));
    out.push(ouvert([[xs, yG(xs)], [xs, yb0], [xo, yo]], h.a.arete));
    // la surface du terrain
    out.push(ouvert(surf, h.a.arete));
    // le bois
    [[8, 40], [22, 46], [36, 38], [50, 44]].forEach(([x, ht]) => out.push(epinette(x, yG(x) + 1, Math.min(ht, yG(x) - 4))));
    // l'eau : du bois dans le fossé ; du creux dans la tranchée ; le long du fond jusqu'à la sortie
    out.push(h.fleche(`M 58 ${f(yG(58) - 12)} L ${f(xf - 3)} ${f(yfb - 6)}`));
    [xc - 8, xc + 6].forEach((x) => out.push(h.fleche(`M ${f(x)} ${f(yG(x) - 17)} L ${f(x)} ${f(yG(x) - 2)}`)));
    const mi = (x) => (yG(x) + 11 + yB(x)) / 2;
    [[xc + 40, xc + 110], [xc + 170, xc + 240]].forEach(([a, b]) => out.push(
      ouvert([[a, mi(a)], [b, mi(b)]], 'fill="none" stroke="#FFFFFF" stroke-width="4.5" stroke-linecap="round"'),
      h.fleche(`M ${f(a)} ${f(mi(a))} L ${f(b)} ${f(mi(b))}`)));
    out.push(h.fleche(`M ${f(xo - 1)} ${f(yo - 2.5)} L ${f(xo + 22)} ${f(yG(xo + 22) - 4)}`));
    return out.join('\n');
  };

  // ─── B-B : la tranchée en travers, à l'échelle vraie ─────────────────────────────────
  const Bgeo = (z) => {
    const cx = z.l / 2, cc = Math.min(150, (z.l - 40) / 2), aw = cc * 0.367, pw = cc - aw, yS = 50;
    return { cx, cc, aw, pw, yS, tw: cc * 0.28, t1: cc * 0.11, t2: cc * 0.13, td: Math.min(cc * 0.64, z.h - yS - 22) };
  };
  // Le profil du sol en travers : planches un peu levées, allées, rigoles en V.
  const profil = (x0, x1, yS, cx, cc, aw, pw, rig, rw, rd, lev) => {
    const dansPlanche = (x) => { const u = ((x - (cx - aw / 2 - pw)) % cc + cc) % cc; return u > 7 && u < pw - 7; };
    const pts = [[x0, dansPlanche(x0) ? yS - lev : yS]];
    const add = (x, y) => { if (x > x0 && x < x1) pts.push([x, y]); };
    for (let c = cx - 3 * cc; c <= cx + 3 * cc; c += cc) {
      const g = c - aw / 2 - pw, d = c - aw / 2;          // planche à gauche de l'allée c
      add(g, yS); add(g + 3, yS - lev * 0.6); add(g + 7, yS - lev); add(d - 7, yS - lev); add(d - 3, yS - lev * 0.6); add(d, yS);
      if (rig(c)) {
        add(c - rw / 2 - rw * 0.36, yS); add(c - rw / 2 - rw * 0.14, yS - rd * 0.5); add(c - rw / 2, yS - rd * 0.2);
        add(c - rw * 0.08, yS + rd); add(c + rw * 0.08, yS + rd);
        add(c + rw / 2, yS - rd * 0.2); add(c + rw / 2 + rw * 0.14, yS - rd * 0.5); add(c + rw / 2 + rw * 0.36, yS);
      }
    }
    pts.push([x1, dansPlanche(x1) ? yS - lev : yS]);
    return pts;
  };
  // La couche bêchée de chaque planche : de la surface bombée jusqu'à environ un fer de bêche, trame lâche.
  const bechee = (surf, x0, x1, yS, cx, cc, aw, pw, prof) => {
    const out = [];
    for (let c = cx - 3 * cc; c <= cx + 3 * cc; c += cc) {
      const g = Math.max(x0, c - aw / 2 - pw), d = Math.min(x1, c - aw / 2);
      if (d - g < 4) continue;
      const top = surf.filter(([x]) => x >= g && x <= d);
      const fond = []; for (let i = 0; i <= 8; i++) { const x = d - (d - g) * i / 8; fond.push([x, yS + prof * (0.8 + 0.2 * Math.sin(Math.PI * (x - g) / (d - g)))]); }
      const pg = [...top, ...fond];
      out.push(poly(pg, h.a.blanc), poly(pg, BECH), ouvert(fond, `${h.a.fin} stroke-dasharray="3 2"`));
    }
    return out.join('\n');
  };
  const trans = (z) => {
    const { cx, cc, aw, pw, yS, tw, t1, t2, td } = Bgeo(z), rnd = alea(517), yb = yS + td;
    const out = [DEFS];
    const surf = profil(0, z.l, yS, cx, cc, aw, pw, (c) => Math.abs(c - cx) > 1, aw * 0.58, aw * 0.2, 4);
    out.push(poly([...surf, [z.l, z.h], [0, z.h]], SOL));
    out.push(bechee(surf, 0, z.l, yS, cx, cc, aw, pw, td * 0.42));
    const xl = cx - tw / 2, xr = cx + tw / 2;
    out.push(h.rect(xl, yS, tw, td, h.a.blanc));
    // l'eau qui court au fond, entre les pierres
    // les pierres
    out.push(`<clipPath id="p9605-pB"><rect x="${f(xl)}" y="${f(yS + t1 + t2)}" width="${f(tw)}" height="${f(td - t1 - t2)}"/></clipPath>`);
    let pr = '';
    const ys0 = yS + t1 + t2 + 6.5;
    for (let row = 0, y = ys0; y < yb + 4; row++, y += 12.2) {
      const dx = row % 2 ? 7 : 0;
      for (let x = xl + 6 - dx; x < xr + 6; x += 14) pr += pierre(x + (rnd() - 0.5) * 2, y + (rnd() - 0.5) * 2, 6.2 + rnd() * 1.4, 5.2 + rnd(), rnd);
    }
    out.push(`<g clip-path="url(#p9605-pB)">${pr}</g>`);
    // les branches d'épinette
    out.push(`<clipPath id="p9605-eB"><rect x="${f(xl)}" y="${f(yS + t1)}" width="${f(tw)}" height="${f(t2)}"/></clipPath>`);
    let ep = '';
    [[xl - 4, yS + t1 + 5, 24, 6, 1.2], [xl + 16, yS + t1 + 4, 28, -5, 1.2], [xl + 1, yS + t1 + 13, 26, -4, 1.2],
      [xl + 24, yS + t1 + 14.5, 22, 7, 1.2]].forEach(([x, y, L, a, k]) => { ep += rameau(x, y, L, a, k); });
    out.push(`<g clip-path="url(#p9605-eB)">${ep}</g>`);
    // la terre remise par-dessus
    out.push(h.rect(xl, yS, tw, t1, h.a.hachure('terre', 'aucun')));
    out.push(ouvert([[xl, yS + t1], [xr, yS + t1]], h.a.fin), ouvert([[xl, yS + t1 + t2], [xr, yS + t1 + t2]], h.a.fin));
    out.push(ouvert([[xl, yS], [xl, yb], [xr, yb], [xr, yS]], h.a.arete));
    out.push(ouvert(surf, h.a.arete));
    // les semis sur les planches
    [-1, 1].forEach((sg) => [0.3, 0.72].forEach((t) => {
      const x = sg < 0 ? cx - aw / 2 - pw + pw * t : cx + aw / 2 + pw * (1 - t);
      out.push(semis(x, yS - 4));
    }));
    // l'eau de surface qui entre
    [cx - 8, cx + 8].forEach((x) => out.push(h.fleche(`M ${f(x)} ${f(yS - 20)} L ${f(x)} ${f(yS - 3)}`)));
    // 1200 de centre à centre des planches
    // l'axe de chaque planche, en trait mixte, du fond de la vue jusqu'à la ligne de cote
    [cx - cc / 2, cx + cc / 2].forEach((x) => out.push(ouvert([[x, z.h - 2], [x, 10]], `${h.a.fin} ${MIXTE}`)));
    out.push(h.cote(cx - cc / 2, 16, cx + cc / 2, 16, '1200'));
    return out.join('\n');
  };

  // ─── Une rigole en travers, deux fois plus grosse ─────────────────────────────────────
  const rigole = (z) => {
    const cx = z.l / 2, aw = Math.min(110, z.l * 0.48), cc = aw / 0.367, pw = cc - aw, yS = 62;
    const rw = aw * 0.58, rd = aw * 0.2, out = [DEFS];
    const surf = profil(0, z.l, yS, cx, cc, aw, pw, (c) => Math.abs(c - cx) < 1, rw, rd, 8);
    out.push(poly([...surf, [z.l, z.h], [0, z.h]], SOL));
    out.push(bechee(surf, 0, z.l, yS, cx, cc, aw, pw, rd * 2.2));
    // la terre rejetée par la charrue, de chaque côté
    [-1, 1].forEach((sg) => {
      const a = cx + sg * (rw / 2), b = cx + sg * (rw / 2 + rw * 0.36), a0 = cx + sg * (rw / 2 - 0.12 / 1.2 * (rw / 2 - rw * 0.08));
      const bosse = [[a, yS - rd * 0.2], [cx + sg * (rw / 2 + rw * 0.14), yS - rd * 0.5], [b, yS], [a0, yS]];
      out.push(poly(bosse, h.a.blanc), poly(bosse, h.a.hachure('terre', 'aucun')));
      out.push(ouvert([[a0, yS], [b, yS]], h.a.cache));
    });
    // l'eau de fonte au fond du V
    const yb = yS + rd, ye = yb - 9, kk = (rw / 2 - rw * 0.08) / (rd + rd * 0.2);
    out.push(poly([[cx - rw * 0.08 - 7 * kk, ye], [cx + rw * 0.08 + 7 * kk, ye], [cx + rw * 0.08, yb], [cx - rw * 0.08, yb]], h.a.hachure('eau', 'aucun')));
    out.push(ouvert([[cx - rw * 0.08 - 7 * kk, ye], [cx + rw * 0.08 + 7 * kk, ye]], h.a.fin));
    out.push(ouvert(surf, h.a.arete));
    [cx - aw / 2 - pw * 0.25, cx + aw / 2 + pw * 0.25].forEach((x) => out.push(semis(x, yS - 8, 1.6)));
    return out.join('\n');
  };

  return {
    ref: '96-05',
    titre: 'Le drainage du champ : le fossé de ceinture, la tranchée filtrante, les rigoles',
    desc: 'Le champ vu de dessus, le bois en haut de la pente à gauche : le fossé de ceinture court en travers de la pente au pied du bois, puis le long du bas du champ ; la tranchée filtrante part du creux et suit l’allée du milieu jusqu’au point bas ; les rigoles suivent les deux autres allées. En dessous, la coupe le long de la tranchée, alignée sur le plan : l’eau du bois tombe dans le fossé, l’eau du creux descend dans la tranchée et court sur son fond, qui descend sans contre-pente jusqu’à la face du talus où elle sort. La tranchée en travers : terre, branches d’épinette, pierres, entre deux planches de 1200 mm de centre à centre. Une rigole en travers : le V ouvert par la charrue, la terre rejetée de chaque côté.',
    format: 'pleine',
    disposition: [['plan'], ['long'], ['trans', 'rigole']],
    hauteurs: [5, 3, 4],
    largeurs: [[1], [1], [3, 2]],
    vues: {
      plan: {
        titre: 'Le champ vu de dessus, le haut de la pente à gauche',
        dessin: plan,
        renvois: (z) => {
          const g = G(z), y0 = 18, Pc = (z.h - y0 - 24) / 4, yM = y0 + 2 * Pc;
          return [
            { n: 1, rond: [g.xf + 24, 11], cible: [g.xf + 5, 26], texte: 'fossé de ceinture, au pied du bois' },
            { n: 2, rond: [g.xc - 30, 11], cible: [g.xc - 22, yM - Pc * 0.45], texte: 'creux où l’eau restait' },
            { n: 3, rond: [g.W - 16, yM - 22], cible: [g.xT - 18, yM - 5], texte: 'tranchée filtrante, dans l’allée' },
            { n: 4, rond: [g.W - 16, y0 + 3 * Pc + 22], cible: [g.xT - 30, y0 + 3 * Pc + 2], texte: 'rigoles de la fonte' },
          ];
        },
      },
      long: {
        titre: 'Coupe A-A, le long de la tranchée',
        dessin: longue,
        renvois: (z) => {
          const g = G(z), Hl = z.h, gA = 0.36 * Hl, yTal = Hl - 40, s = (yTal - gA) / g.xT;
          const yG = (x) => gA + s * x + 12 * Math.exp(-Math.pow((x - g.xc) / 24, 2));
          const yo = yTal + 24, yb0 = yG(g.xs) + 24, xo = g.xT + 8, xm = g.xs + 60;
          return [
            { n: 5, rond: [g.xs - 34, Hl - 12], cible: [xm, yb0 + (yo - yb0) * (xm - g.xs) / (xo - g.xs)], texte: 'fond sans contre-pente' },
            { n: 6, rond: [g.W - 14, yTal - 16], cible: [xo, yo], texte: 'point bas, où l’eau sort' },
          ];
        },
      },
      trans: {
        titre: 'Coupe B-B, la tranchée en travers',
        dessin: trans,
        renvois: (z) => {
          const { cx, yS, tw, t1, t2 } = Bgeo(z);
          return [
            { n: 7, rond: [cx + 44, yS - 24], cible: [cx + 10, yS + t1 * 0.5], texte: 'terre' },
            { n: 8, rond: [cx + 50, yS + t1 + t2 * 0.5 + 2], cible: [cx + tw / 2 - 5, yS + t1 + t2 * 0.5], texte: 'branches d’épinette' },
            { n: 9, rond: [cx + 50, yS + t1 + t2 + 30], cible: [cx + tw / 2 - 6, yS + t1 + t2 + 28], texte: 'pierres de l’épierrage' },
          ];
        },
      },
      rigole: {
        titre: 'Une rigole en travers, plus gros',
        dessin: rigole,
        renvois: (z) => {
          const cx = z.l / 2, aw = Math.min(110, z.l * 0.48), rw = aw * 0.58, rd = aw * 0.2, yS = 62;
          return [
            { n: 10, rond: [cx - 44, 18], cible: [cx - rw * 0.25, yS + rd * 0.45], texte: 'rigole, le V de la charrue' },
            { n: 11, rond: [cx + 50, 22], cible: [cx + rw / 2 + rw * 0.16, yS - rd * 0.3], texte: 'terre rejetée de chaque côté' },
          ];
        },
      },
    },
  };
};
