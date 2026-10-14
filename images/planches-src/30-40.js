// Planche 30-40 — le sas de la galerie et la chambre du malade (ch. 30 : « Le sas qu'on bâtit »,
// étapes 7-8, 11, 18, 22 ; « Sans gants » ; « Sans masque »).
// Le sas est pris dans la partie abritée de la galerie, fermée de trois côtés : une seule corde
// tendue d'un mur de côté à l'autre, sous le linteau, porte les deux couvertures. La palette est
// posée à cheval sous le rideau : on s'y déchausse sans toucher la neige, les bottes du dehors
// restent devant, la deuxième paire attend derrière.
module.exports = (h) => {
  const A = h.a;
  const R = v => Math.round(v * 10) / 10;
  const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const bois = h.a.hachure('bois', 'contour');

  // ─── la main, dessinée une fois, placée partout ──────────────────────────────────────
  // repère local : poignet en (0, 0), doigts vers le haut, pouce vers +x
  const POUCE = [['L', 18, -34], ['L', 22, -32], ['L', 31, -45], ['Q', 35, -50, 38.5, -46.5],
    ['Q', 41.5, -43, 38, -39], ['L', 26, -18], ['Q', 20, -6, 13, 6], ['L', 13, 24]];
  const INDEX_MAJEUR = [['L', 1.5, -65], ['Q', 1.5, -73, 5.75, -73], ['Q', 10, -73, 10, -65], ['L', 10.5, -58],
    ['L', 11, -60], ['Q', 11, -67, 14.5, -67], ['Q', 18, -67, 18, -60]];
  const MAIN = [['M', -13, 24], ['L', -13, 4], ['Q', -18, -10, -18, -30], ['L', -18, -52],
    ['Q', -18, -59, -13.75, -59], ['Q', -9.5, -59, -9.5, -52], ['L', -9, -49],
    ['L', -8.5, -62], ['Q', -8.5, -69, -4, -69], ['Q', 0.5, -69, 0.5, -62], ['L', 1, -57],
    ...INDEX_MAJEUR, ...POUCE];
  // deux doigts tendus, vue du dos : annulaire et auriculaire repliés serré, le pouce rentré
  // dans la paume ; la main reste compacte sous les deux doigts, rien d'autre ne touche le gant
  const DEUX_TENDUS = [['L', 1.5, -70], ['Q', 1.5, -78, 5.75, -78], ['Q', 10, -78, 10, -70], ['L', 10.5, -62],
    ['L', 11, -65], ['Q', 11, -72, 14.5, -72], ['Q', 18, -72, 18, -65]];
  const DEUX_BOUT = [5.75, -78];
  const DEUX = [['M', -13, 24], ['L', -13, 4], ['Q', -18, -8, -18, -20],
    ['Q', -18, -27, -13.5, -27], ['Q', -9.5, -27, -9, -24], ['Q', -8.5, -31, -4, -31], ['Q', 0.5, -31, 1, -27],
    ...DEUX_TENDUS, ['L', 18.5, -40], ['Q', 20.5, -16, 15.5, -3], ['Q', 13.2, 3, 13, 8], ['L', 13, 24]];
  // le contour des deux doigts tendus, pour les suivre en tireté sous le gant
  const DEUX_DOIGTS = [['M', 1, -27], ...DEUX_TENDUS, ['L', 18.5, -40], ['M', 10.5, -62], ['L', 10, -34]];
  const BOUT = [5.75, -73];                 // bout du majeur
  const K = 0.7;

  const place = (segs, p, ferme = true) => {
    const { x, y, m = 1, rot = 0 } = p;
    const c = Math.cos(rot * Math.PI / 180), s = Math.sin(rot * Math.PI / 180);
    const T = (px, py) => { const X = m * px; return `${R(x + K * (X * c - py * s))} ${R(y + K * (X * s + py * c))}`; };
    let d = '';
    for (const g of segs) d += g[0] === 'Q' ? `Q${T(g[1], g[2])} ${T(g[3], g[4])} ` : `${g[0]}${T(g[1], g[2])} `;
    return d + (ferme ? 'Z' : '');
  };
  // le poignet placé pour que le bout du majeur tombe sur « cible »
  const viser = (cible, m, rot, bout = BOUT) => {
    const c = Math.cos(rot * Math.PI / 180), s = Math.sin(rot * Math.PI / 180);
    const X = m * bout[0], Y = bout[1];
    return { x: cible[0] - K * (X * c - Y * s), y: cible[1] - K * (X * s + Y * c), m, rot };
  };
  const AVANT_BRAS = [['M', -13, 24], ['L', -14, 40], ['L', 14, 40], ['L', 13, 24]];
  const avantBras = p => [
    h.path(place(AVANT_BRAS, p), A.blanc),
    h.path(place([['M', -13, 24], ['L', -14, 40]], p, false), A.arete),
    h.path(place([['M', 13, 24], ['L', 14, 40]], p, false), A.arete),
  ].join('\n');
  // main gantée : la face du gant qui a touché le malade est hachurée
  const gantee = p => [
    avantBras(p),
    h.path(place(MAIN, p), h.a.hachure('bois', 'arete')),
    h.path(place([['M', -13, 18], ['L', 13, 18]], p, false), A.detail),
  ].join('\n');
  // main nue
  const nue = (p, segs = MAIN) => [
    h.path(place(AVANT_BRAS, p), A.blanc),
    h.path(place([['M', -14, 40], ['L', -13, 24], ...segs.slice(1), ['L', 14, 40]], p, false), blanc(A.arete)),
  ].join('\n');
  // ─── le gant retourné ────────────────────────────────────────────────────────────────
  // On n'en voit que l'envers, propre (blanc) : une masse froissée d'où pendent des doigts
  // vides (trois bouts côte à côte) et, de l'autre côté, le rebord ouvert : un bout de manchette et
  // son trou. Le dehors, qui a touché le malade, est rentré dedans.
  const RAD = Math.PI / 180;
  const pt = p => `${R(p[0])} ${R(p[1])}`;
  // un doigt vide : un tube mou, bout arrondi, qui plie un peu
  const doigtVide = (b, a, lg, w, pli) => {
    const u = [Math.cos(a * RAD), Math.sin(a * RAD)];
    const a2 = (a + pli * 22) * RAD, u2 = [Math.cos(a2), Math.sin(a2)];
    const m = [b[0] + u[0] * lg * 0.55, b[1] + u[1] * lg * 0.55];
    const t = [m[0] + u2[0] * lg * 0.45, m[1] + u2[1] * lg * 0.45];
    const n = [-u[1] * w / 2, u[0] * w / 2], n2 = [-u2[1] * w / 2, u2[0] * w / 2];
    const nm = [(n[0] + n2[0]) / 2, (n[1] + n2[1]) / 2];
    const cote = k => [[b[0] + k * n[0], b[1] + k * n[1]], [m[0] + k * nm[0], m[1] + k * nm[1]], [t[0] + k * n2[0], t[1] + k * n2[1]]];
    const g = cote(1), d = cote(-1);
    return h.path(`M${pt(g[0])} Q${pt(g[1])} ${pt(g[2])} A${R(w / 2)} ${R(w / 2)} 0 0 0 ${pt(d[2])} Q${pt(d[1])} ${pt(d[0])} Z`, blanc(A.arete));
  };
  // une ellipse en chemin, tournée sans tourner la hachure qui la remplit
  const ovale = (c, rx, ry, a, at) => {
    const u = [Math.cos(a * RAD) * rx, Math.sin(a * RAD) * rx];
    return h.path(`M${pt([c[0] - u[0], c[1] - u[1]])} A${R(rx)} ${R(ry)} ${R(a)} 1 0 ${pt([c[0] + u[0], c[1] + u[1]])} A${R(rx)} ${R(ry)} ${R(a)} 1 0 ${pt([c[0] - u[0], c[1] - u[1]])} Z`, at);
  };
  const retourne = (cx, cy, s, { doigts = 20, ouverture = 200, dedans = false } = {}) => {
    const out = [];
    const rx = 11 * s, ry = 9 * s;
    const P = (a, k = 1) => [cx + rx * k * Math.cos(a * RAD), cy + ry * k * Math.sin(a * RAD)];
    const u = a => [Math.cos(a * RAD), Math.sin(a * RAD)];
    // le rebord : un bout de manchette qui sort de la masse, ouvert au bout
    const uo = u(ouverture), no = [-uo[1], uo[0]];
    const c0 = P(ouverture, 0.6), cb = P(ouverture, 1), c1 = [cb[0] + uo[0] * 4.5 * s, cb[1] + uo[1] * 4.5 * s];
    const q = (c, k, w) => [c[0] + no[0] * k * w, c[1] + no[1] * k * w];
    out.push(h.chemin([q(c0, 1, 5 * s), q(c1, 1, 6 * s), q(c1, -1, 6 * s), q(c0, -1, 5 * s)], blanc(A.arete), true));
    // trois bouts de doigts vides, côte à côte, de l'autre côté
    const uf = u(doigts), nf = [-uf[1], uf[0]], base = P(doigts, 0.55);
    [[-1, 7.5], [0, 9.5], [1, 7]].forEach(([k, lg]) => {
      const b = [base[0] + nf[0] * k * 4.6 * s, base[1] + nf[1] * k * 4.6 * s];
      out.push(doigtVide(b, doigts + k * 6, (lg + 5) * s, 4.4 * s, 1));
    });
    // la masse froissée : un contour bosselé, les creux marqués d'un pli
    const kk = [1.02, 0.8, 1.1, 0.95, 1.06, 0.78, 1.08, 0.97, 1.1, 0.82, 1.04, 0.93];
    const nk = kk.length, pts = kk.map((k, i) => P(i * 360 / nk + 8, k));
    const mil = (p, r) => [(p[0] + r[0]) / 2, (p[1] + r[1]) / 2];
    let d = `M${pt(mil(pts[nk - 1], pts[0]))}`;
    pts.forEach((p, i) => { d += kk[i] < 0.9 ? ` L${pt(p)} L${pt(mil(p, pts[(i + 1) % nk]))}` : ` Q${pt(p)} ${pt(mil(p, pts[(i + 1) % nk]))}`; });
    out.push(h.path(d + ' Z', blanc(A.arete)));
    kk.forEach((k, i) => {
      if (k >= 0.9) return;
      const a0 = i * 360 / nk + 8;
      out.push(h.path(`M${pt(P(a0, k))} Q${pt(P(a0 - 8, 0.62))} ${pt(P(a0 + 12, 0.38))}`, A.detail));
    });
    // l'ouverture : la lèvre roulée (blanche), le trou
    out.push(ovale(c1, 6 * s, 3.6 * s, ouverture + 90, blanc(A.arete)));
    out.push(ovale(c1, 4.2 * s, 2.1 * s, ouverture + 90, A.plein));
    // un bout de doigt du premier gant qui sort par l'ouverture du second
    if (dedans) out.push(doigtVide(c1, ouverture + 12, 9 * s, 4 * s, 1));
    return out.join('\n');
  };

  // ─── la main droite gantée qui pince (vue côté paume, le pouce en haut) ─────────────────
  // repère : le point pincé en (0, 0), les doigts vers la gauche ; le pouce et l'index se
  // referment sur le rebord, les trois autres doigts repliés dessous.
  const PINCE = [['M', 3, 0], ['L', 0.6, -0.8], ['Q', -1.6, -0.9, -1.6, -3.2], ['Q', -1.6, -5.9, 1.6, -6],
    ['Q', 8, -7.2, 15, -9], ['Q', 22, -10.8, 28, -6.5], ['L', 35, -6], ['L', 35, 10.5], ['L', 28, 10.3],
    ['Q', 22, 15.5, 15, 15.2], ['Q', 10, 15.6, 9.8, 12.6], ['Q', 6.8, 12.4, 7.2, 9.4], ['Q', 4.2, 9, 5.2, 6],
    ['Q', 2, 5.8, 0, 4.6], ['Q', -1.8, 3.4, -1.4, 1.6], ['Q', -1.1, 0.7, 0.6, 0.8], ['L', 3, 0]];
  const PINCE_P = [58.6, 103.4], PINCE_ROT = 8;
  const surPince = (x, y) => { const c = Math.cos(PINCE_ROT * RAD), s = Math.sin(PINCE_ROT * RAD); return [R(PINCE_P[0] + x * c - y * s), R(PINCE_P[1] + x * s + y * c)]; };
  const pinceur = (P, rot) => {
    const c = Math.cos(rot * RAD), s = Math.sin(rot * RAD);
    const T = (x, y) => pt([P[0] + x * c - y * s, P[1] + x * s + y * c]);
    const d = (segs, ferme = true) => segs.map(g => g[0] === 'Q' ? `Q${T(g[1], g[2])} ${T(g[3], g[4])}` : `${g[0]}${T(g[1], g[2])}`).join(' ') + (ferme ? ' Z' : '');
    return [
      // l'avant-bras nu, au-delà du poignet du gant
      h.path(d([['M', 35, -6], ['L', 48, -5.2], ['L', 48, 11.4], ['L', 35, 10.5]]), A.blanc),
      h.path(d([['M', 35, -6], ['L', 48, -5.2]], false), A.arete),
      h.path(d([['M', 35, 10.5], ['L', 48, 11.4]], false), A.arete),
      h.path(d(PINCE, false), h.a.hachure('bois', 'arete')),
      h.path(d([['M', 32, -6.2], ['L', 32, 10.4]], false), A.detail),
      // le pouce contre l'index, le pli du pouce, les trois doigts repliés
      h.path(d([['M', 3, 0], ['Q', 7, -0.8, 12, -3.2]], false), A.detail),
      h.path(d([['M', 12, -3.2], ['Q', 19, -1, 23, 7]], false), A.detail),
      h.path(d([['M', 9.8, 12.6], ['L', 13.5, 12]], false), A.detail),
      h.path(d([['M', 7.2, 9.4], ['L', 11, 8.8]], false), A.detail),
      h.path(d([['M', 5.2, 6], ['L', 9, 5.5]], false), A.detail),
    ].join('\n');
  };

  // ─── petites pièces du sas ───────────────────────────────────────────────────────────
  const botte = (x0, yb, sens) => {
    const P = (dx, dy) => [x0 + sens * dx, yb + dy];
    return [
      h.chemin([P(0, 0), P(19, 0), P(20.5, -3.5), P(18, -7.5), P(10.5, -9.5), P(9.5, -23), P(0.5, -23), P(-0.5, -4)], blanc(A.arete), true),
      h.ligne(...P(0, -2.5), ...P(19.8, -2.5), A.fin),
    ].join('\n');
  };
  const paire = (x0, yb, sens) => [botte(x0 - 4 * sens, yb, sens), botte(x0, yb, sens)].join('\n');
  const lanterne = (x, y) => [
    h.ligne(x, y, x, y + 10, A.detail),
    h.path(`M${x - 6} ${y + 17} Q${x} ${y + 7} ${x + 6} ${y + 17}`, A.detail),
    h.chemin([[x - 5, y + 17], [x + 5, y + 17], [x + 8, y + 21], [x - 8, y + 21]], blanc(A.arete), true),
    h.ellipse(x, y + 30, 7, 9, blanc(A.arete)),
    h.path(`M${x} ${y + 35} Q${x - 2.6} ${y + 31} ${x} ${y + 25} Q${x + 2.6} ${y + 31} ${x} ${y + 35} Z`, A.plein),
    h.rect(x - 9, y + 38, 18, 6, blanc(A.arete)),
  ].join('\n');
  // une couverture vue de dessus : une bande plissée
  // yc(x) : la ligne où pend la couverture ; elle s'écarte de la corde là où les deux se chevauchent
  const bande = (x1, x2, yc) => {
    const n = Math.round((x2 - x1) / 5), haut = [], bas = [];
    for (let i = 0; i <= n; i++) {
      const x = x1 + (x2 - x1) * i / n, o = i % 2 ? 1.1 : -1.1;
      haut.push([x, yc(x) - 1.7 + o]); bas.push([x, yc(x) + 1.7 + o]);
    }
    return h.chemin([...haut, ...bas.reverse()], blanc(A.arete), true);
  };

  // ─── vue 1 : en coupe, par le côté ───────────────────────────────────────────────────
  const C = { yF: 215, xM: 28, xMi: 42, xFr: 199, xE: 231, xr: 182, yr: 67, p0: 147, p1: 213 };
  const coupe = (z) => {
    const { yF, xM, xMi, xFr, xE, xr, yr, p0, p1 } = C;
    const out = [];
    // terre et neige
    out.push(h.rect(xMi, 271, z.l - xMi, z.h - 271, h.a.hachure('terre', 'aucun')));
    out.push(h.ligne(xMi, 271, z.l, 271, A.arete));
    const neige = [[263, 251], [280, 248.5], [298, 252], [315, 249.5], [z.l, 251], [z.l, 271], [263, 271]];
    out.push(h.chemin(neige, h.a.hachure('neige', 'aucun'), true));
    out.push(h.chemin(neige.slice(0, 5), A.arete));
    // fondation, mur du fond, plancher de la maison
    out.push(h.rect(26, yF + 6, 18, z.h - yF - 6, h.a.hachure('pierre', 'arete')));
    out.push(h.rect(xM, 0, xMi - xM, yF + 6, bois));
    out.push(h.rect(0, yF, xM, 6, bois));
    // plafond et linteau de la façade, coupés
    out.push(h.rect(xMi, 40, 186 - xMi, 10, bois));
    out.push(h.rect(186, 0, xFr - 186, 62, bois));
    // poteau, plancher de la galerie, marches
    out.push(h.rect(191, yF + 6, 8, 271 - yF - 6, h.a.hachure('bois', 'arete')));
    out.push(h.chemin([[xE, yF + 6], [xE, 227], [247, 227], [247, 239], [263, 239], [263, 271], [219, 271], [219, yF + 6]], bois, true));
    out.push(h.rect(xMi, yF, xE - xMi, 6, bois));
    // manteau sur son crochet, à hauteur d'homme
    out.push(h.path('M44 99 L50 100 Q57 107 57.5 124 L59 158 L44 158 Z', h.a.hachure('isolant', 'arete')));
    out.push(h.path('M42 101 L49 101 Q52 101 52 98 L52 95.5', A.arete));
    // banc le long du mur de côté, vu au-delà
    out.push(h.ligne(95, 190, 95, yF, A.arete), h.ligne(143, 190, 143, yF, A.arete));
    out.push(h.rect(89, 186, 60, 4, blanc(A.arete)));
    // lampe au plafond
    out.push(lanterne(120, 50));
    // palette à cheval sous le rideau
    [p0, 175, p1 - 10].forEach(x => out.push(h.rect(x, 209, 10, 6, h.a.hachure('bois', 'arete'))));
    out.push(h.rect(p0, 206, p1 - p0, 3, blanc(A.arete)));
    // bottes : la deuxième paire derrière le rideau, celles du dehors devant
    out.push(paire(152, 206, 1));
    out.push(paire(209, 206, -1));
    // la couverture pliée sur la corde
    // (deux épaisseurs d'étoffe qui ondulent : la couche qui descend au plancher, le rabat dehors)
    const onde = (x0, y0, y1, e, sens) => {             // bord d'une couche, de y0 à y1
      const pts = [];
      for (let y = y0; sens > 0 ? y <= y1 : y >= y1; y += 7 * sens) pts.push([x0 + e + 1.4 * Math.sin((y - yr) / 9), y]);
      pts.push([x0 + e + 1.4 * Math.sin((y1 - yr) / 9), y1]);
      return pts.map(p => `L${R(p[0])} ${R(p[1])}`).join(' ');
    };
    out.push(h.path(`M${xr - 5} 206 ${onde(xr - 5, 206, yr, 0, -1)} A5 5 0 0 1 ${xr + 5} ${yr} ${onde(xr + 5, yr, 124, 0, 1)} L${xr + 2.4} 124 ${onde(xr + 2.4, 124, yr, 0, -1)} A2.4 2.4 0 0 0 ${xr - 2.4} ${yr} ${onde(xr - 2.4, yr, 206, 0, 1)} Z`, blanc(A.arete)));
    out.push(h.cercle(xr, yr, 2.4, A.plein));
    return out.join('\n');
  };

  // ─── vue 2 : vu de dessus ────────────────────────────────────────────────────────────
  const plan = (z) => {
    const out = [];
    const yM = 62, yMi = 74, yFa = 220, yB = 250;
    const neige = [[0, yFa], [18, yFa], [18, yB], [84, yB], [84, 282], [156, 282], [156, yB], [222, yB], [222, yFa], [z.l, yFa], [z.l, z.h], [0, z.h]];
    out.push(h.chemin(neige, h.a.hachure('neige', 'aucun'), true));
    // plancher qui dépasse la façade, marches
    out.push(h.rect(18, yFa, 204, yB - yFa, A.arete));
    out.push(h.rect(84, yB, 72, 16, A.arete), h.rect(84, yB + 16, 72, 16, A.arete));
    // murs coupés : la galerie est fermée de trois côtés
    out.push(h.chemin([[0, 208], [18, 208], [18, yM], [140, yM], [140, yMi], [30, yMi], [30, yFa], [0, yFa]], bois, true));
    out.push(h.chemin([[188, yM], [222, yM], [222, 208], [z.l, 208], [z.l, yFa], [210, yFa], [210, yMi], [188, yMi]], bois, true));
    // la seule porte qui sert
    out.push(h.path('M140 62 A48 48 0 0 1 188 14', A.fin));
    out.push(h.rect(185, 14, 3, 48, blanc(A.arete)));
    // crochets sur le mur du fond
    [44, 62, 80, 98].forEach(x => out.push(h.ligne(x, yMi, x, yMi + 6, A.arete), h.cercle(x, yMi + 6, 1.6, A.plein)));
    // banc
    out.push(h.rect(30, 112, 24, 60, blanc(A.arete)), h.ligne(42, 112, 42, 172, A.detail));
    // palette
    out.push(h.rect(84, 176, 72, 60, blanc(A.arete)));
    [98, 113, 127, 142].forEach(x => out.push(h.ligne(x, 176, x, 236, A.fin)));
    // bottes
    [[125, 190], [134, 190], [106, 222], [115, 222]].forEach(([x, y]) => out.push(h.ellipse(x, y, 3.6, 8.5, blanc(A.arete))));
    // la corde, et les deux couvertures qui se chevauchent au milieu
    out.push(h.ligne(30, 206, 210, 206, A.detail));
    // l'une passe derrière l'autre sur la largeur du chevauchement (114 à 126)
    const rampe = (x, a, b, y0, y1) => x <= a ? y0 : x >= b ? y1 : y0 + (y1 - y0) * (x - a) / (b - a);
    out.push(bande(114, 210, x => rampe(x, 124, 136, 201, 206)));
    out.push(bande(30, 126, x => rampe(x, 104, 116, 206, 211)));
    out.push(h.cercle(31.5, 206, 2, A.plein), h.cercle(208.5, 206, 2, A.plein));
    return out.join('\n');
  };

  // ─── vue 3 : la chambre du malade ────────────────────────────────────────────────────
  const chambre = () => {
    const out = [];
    // murs, la fenêtre à droite, la porte en bas
    out.push(h.chemin([[12, 12], [234, 12], [234, 36], [224, 36], [224, 22], [22, 22], [22, 248], [150, 248], [150, 258], [12, 258]], bois, true));
    out.push(h.chemin([[198, 248], [224, 248], [224, 108], [234, 108], [234, 258], [198, 258]], bois, true));
    // fenêtre ouverte : deux battants poussés vers l'extérieur
    out.push(h.ligne(234, 36, 265, 54, A.contour), h.ligne(234, 108, 265, 90, A.contour));
    // la porte sur le reste de la maison : le vantail et son battement, comme au plan du sas
    out.push(h.path('M150 251.5 A48 48 0 0 1 198 203.5', A.fin));
    out.push(h.rect(195, 203.5, 3, 48, blanc(A.arete)));
    // le lit et le malade
    out.push(h.rect(22, 22, 66, 120, blanc(A.arete)));
    out.push(h.rect(22, 22, 66, 5, h.a.hachure('bois', 'arete')));
    out.push(h.path('M30 31 Q30 28 33 28 L77 28 Q80 28 80 31 L80 44 Q80 47 77 47 L33 47 Q30 47 30 44 Z', blanc(A.detail)));
    out.push(h.cercle(55, 39, 8, blanc(A.arete)));
    out.push(h.rect(22, 52, 66, 90, blanc(A.arete)), h.ligne(22, 60, 88, 60, A.detail));
    out.push(h.ellipse(55, 98, 16, 34, A.fin));
    // l'air va du malade vers la fenêtre
    out.push(h.fleche('M66 37 Q160 34 252 70', A.cache));
    // le soignant, de côté, hors de ce chemin
    const sx = 118, sy = 118;
    out.push(h.ligne(sx - 2, sy - 14, 95, sy - 8, A.arete), h.ligne(sx - 2, sy + 14, 95, sy + 8, A.arete));
    out.push(h.ellipse(sx, sy, 8, 18, blanc(A.arete)));
    out.push(h.cercle(sx - 1, sy, 7, blanc(A.arete)));
    out.push(h.chemin([[sx - 8, sy - 2.5], [sx - 11, sy], [sx - 8, sy + 2.5]], A.detail));
    // près de la porte : le sac noué et la chaudière à couvercle
    out.push(h.path('M88 236 Q84 225 93 221 Q98 216 104 220 Q112 223 109 233 Q105 241 95 240 Q89 240 88 236 Z', blanc(A.arete)));
    out.push(h.path('M98 228 Q94 222 91 224', A.detail), h.path('M98 228 Q103 222 106 225', A.detail));
    out.push(h.cercle(98, 228, 2.4, A.plein));
    out.push(h.cercle(124, 226, 10, blanc(A.contour)), h.cercle(124, 226, 7, A.detail));
    out.push(h.ligne(114.5, 226, 133.5, 226, A.fin));
    return out.join('\n');
  };

  // ─── vue 4 : retirer les gants, en quatre temps ──────────────────────────────────────
  // les doigts sous le gant : un tireté franc, détouré de blanc pour ne pas se perdre dans la hachure
  const HALO = 'fill="none" stroke="#FFFFFF" stroke-width="3.8" stroke-linejoin="round" stroke-linecap="round"';
  const SOUS = 'fill="none" stroke="#1A1A1A" stroke-width="1.4" stroke-linejoin="round" stroke-dasharray="3.5 2.5"';
  // Les mains : des mains simples (mains/moteur.js) à 0,3 px/mm. Une main gantée porte le gant du moteur (gant:
  // true), hachuré : le dessus du gant a touché le malade. La hachure se pose sous le contour de la main.
  const EG = +(process.env.EG || 0.3);
  const F = h.formes;
  const silhouetteDe = m => (String(m.svg).match(/<path d="([^"]+)" fill="#FFFFFF"/) || [])[1] || '';
  // le gant s'arrête au bout de sa manchette (45 mm au-delà du poignet) : au-delà, l'avant-bras est nu. demiPlan :
  // le côté de la main de cette droite, en polygone (pour un clipPath)
  let nClip = 0;
  const demiPlan = m => {
    const u0 = [m.coude[0] - m.poignet[0], m.coude[1] - m.poignet[1]], l = Math.hypot(u0[0], u0[1]) || 1, u = [u0[0] / l, u0[1] / l], v = [-u[1], u[0]];
    const P = [m.poignet[0] + u[0] * 45 * EG, m.poignet[1] + u[1] * 45 * EG], G = 1000;
    return [[P[0] + v[0] * G, P[1] + v[1] * G], [P[0] - v[0] * G, P[1] - v[1] * G], [P[0] - v[0] * G - u[0] * G, P[1] - v[1] * G - u[1] * G], [P[0] + v[0] * G - u[0] * G, P[1] + v[1] * G - u[1] * G]];
  };
  const gantSeul = (m, contenu) => {
    const id = `gant-30-40-${++nClip}`;
    return `<clipPath id="${id}"><path d="${demiPlan(m).map((p, i) => `${i ? 'L' : 'M'}${R(p[0])} ${R(p[1])}`).join(' ')} Z"/></clipPath>\n<g clip-path="url(#${id})">\n${contenu}\n</g>`;
  };
  const hacher = m => {
    const svg = String(m.svg), i = svg.indexOf('stroke-width="1.5"'), j = i < 0 ? -1 : svg.lastIndexOf('<path', i);
    const hach = gantSeul(m, `<path d="${silhouetteDe(m)}" ${h.a.hachure('bois', 'aucun')}/>`);
    return j < 0 ? svg + hach : svg.slice(0, j) + hach + '\n' + svg.slice(j);
  };
  const main30 = (o, boite, gant) => {
    const m = F.mainSimple({ echelle: EG, gant: !!gant, ...o, avantbras: Object.assign({ bord: boite, bras: { pli: 0 } }, o.avantbras || {}) });
    return { m, svg: gant ? hacher(m) : m.svg };
  };
  const gants = (z) => {
    const pw = z.l / 2, ph = z.h / 2;
    const C1 = { x0: 0, y0: 0, x1: pw, y1: ph }, C2 = { x0: pw, y0: 0, x1: z.l, y1: ph }, C3 = { x0: 0, y0: ph, x1: pw, y1: z.h };
    const out = [h.ligne(pw, 6, pw, z.h - 6, A.fin), h.ligne(6, ph, z.l - 6, ph, A.fin)];
    // 1. pincer le premier gant par l'extérieur, au rebord, et le rouler vers les doigts :
    //    le rebord décolle et se retourne sous la pince, l'envers (blanc) sort sous la hachure
    const p1 = { x: 40, y: 100, m: -1 };
    const L1 = main30({ x: p1.x, y: p1.y, ancre: 'poignet', pose: 'ouverte', vue: 'paume', cote: 'gauche', angle: -90 }, C1, true);
    out.push(L1.svg);
    out.push(h.path(place([['M', -13, 10], ['L', 13, 16], ['L', 14, 40], ['L', -14, 40]], p1), A.blanc));
    out.push(h.path(place([['M', -13, 15], ['L', -13, 24], ['L', -14, 40]], p1, false), A.arete));
    out.push(h.path(place([['M', 13, 18], ['L', 13, 24], ['L', 14, 40]], p1, false), A.arete));
    out.push(h.path(place([['M', 13, 13], ['Q', 0, 7, -13, 1], ['L', -26, 3.5], ['Q', -28.5, 4.8, -26, 6], ['L', -14.3, 16],
      ['Q', 0, 20.5, 14.3, 19], ['Q', 14.8, 15.5, 13, 13]], p1), blanc(A.arete)));
    out.push(h.path(place([['M', 13, 13], ['Q', 0, 7, -13, 1], ['L', -26, 3.5]], p1, false), A.contour));
    // la main droite gantée qui pince le rebord, de profil côté pouce, l'avant-bras à droite
    out.push(main30({ x: PINCE_P[0], y: PINCE_P[1], pose: 'pince-fine', vue: process.env.V1 || 'pouce', cote: process.env.C1 || 'droite', diametre: 2, angle: 180 + PINCE_ROT + +(process.env.A1 || 0) }, C1, true).svg);
    out.push(h.geste('M63 91 Q74 66 56 45'));
    // 2. le premier gant, retourné, reste dans la main encore gantée
    out.push(main30({ x: pw + 38, y: 100, ancre: 'poignet', pose: 'ouverte', vue: 'paume', cote: 'gauche', angle: -90 }, C2, false).svg);
    out.push(main30({ x: pw + 97, y: 79, pose: 'prise-manche', vue: 'paume', cote: 'droite', diametre: 30, angle: +(process.env.A2 || -100),
      objet: retourne(pw + 97, 79, 0.95, { doigts: 20, ouverture: 200 }) }, C2, true).svg);
    // 3. deux doigts nus sous le rebord du second, par l'intérieur : le rebord passe
    //    par-dessus, les bouts de doigts se suivent en tireté sous le gant
    const oy = ph;
    const R3 = main30({ x: 94, y: oy + 40, pose: 'prise-manche', vue: 'paume', cote: 'droite', diametre: 30, angle: +(process.env.A2 || -100),
      objet: retourne(94, oy + 40, 0.95, { doigts: 20, ouverture: 200 }) }, C3, true);
    const L3 = main30({ x: 93, y: oy + 59.8, ancre: 'bout', pose: 'deux-doigts', vue: 'dos', cote: 'gauche', angle: -90 + 14 }, C3, false);
    out.push(L3.svg, R3.svg);
    out.push(`<clipPath id="gant-trente-40"><path d="${silhouetteDe(R3.m)}"/></clipPath>`);
    out.push(gantSeul(R3.m, `<g clip-path="url(#gant-trente-40)">\n${h.path(silhouetteDe(L3.m), HALO)}\n${h.path(silhouetteDe(L3.m), SOUS)}\n</g>`));
    out.push(h.geste(`M114 ${oy + 84} Q131 ${oy + 50} 112 ${oy + 12}`));
    // 4. le second retourné par-dessus le premier, le tout dans le sac
    const ox = pw;
    // le sac ouvert : goulot froncé, fond affaissé, plis
    const X = v => R(ox + v), Y = v => R(oy + v);
    out.push(h.path(`M${X(42)} ${Y(86)} Q${X(46)} ${Y(98)} ${X(37)} ${Y(112)} Q${X(29)} ${Y(128)} ${X(48)} ${Y(131)} L${X(76)} ${Y(131)} Q${X(95)} ${Y(128)} ${X(87)} ${Y(112)} Q${X(78)} ${Y(98)} ${X(82)} ${Y(86)} Z`, blanc(A.arete)));
    out.push(h.path(`M${X(52)} ${Y(94)} Q${X(49)} ${Y(110)} ${X(54)} ${Y(127)}`, A.detail));
    out.push(h.path(`M${X(63)} ${Y(92)} L${X(62)} ${Y(104)}`, A.detail));
    out.push(h.path(`M${X(73)} ${Y(93)} Q${X(77)} ${Y(108)} ${X(71)} ${Y(126)}`, A.detail));
    out.push(h.path(`M${X(42)} ${Y(86)} Q${X(47)} ${Y(79)} ${X(54)} ${Y(83)} Q${X(61)} ${Y(77)} ${X(68)} ${Y(82)} Q${X(76)} ${Y(78)} ${X(82)} ${Y(86)} Q${X(73)} ${Y(92)} ${X(62)} ${Y(89)} Q${X(51)} ${Y(92)} ${X(42)} ${Y(86)} Z`, blanc(A.arete)));
    // le second gant retourné enveloppe le premier : son rebord ouvert, un doigt du premier qui sort
    out.push(retourne(ox + 60, oy + 36, 1.3, { doigts: -150, ouverture: 25, dedans: true }));
    out.push(h.fleche(`M${X(62)} ${Y(54)} L${X(62)} ${Y(76)}`));
    // l'ordre des cases
    [[8, 16, '1'], [pw + 8, 16, '2'], [8, oy + 16, '3'], [pw + 8, oy + 16, '4']]
      .forEach(([x, y, s]) => out.push(h.texte(x, y, s, { ancre: 'start', corps: 13 })));
    return out.join('\n');
  };

  return {
    ref: '30-40',
    titre: 'Le sas de la galerie et la chambre du malade',
    desc: 'En haut, le sas monté dans la partie abritée de la galerie, fermée de trois côtés, en coupe par le côté et vu de dessus : une corde tendue d’un mur de côté à l’autre sous le linteau, deux couvertures pliées dessus qui se chevauchent d’une largeur de main au milieu ; une palette posée à cheval sous le rideau, les bottes du dehors devant, la deuxième paire derrière ; des crochets à hauteur d’homme sur le mur du fond pour les habits du dehors, un banc le long du mur de côté, une lampe au plafond, et la seule porte qui sert. En bas à gauche, la chambre du malade vue de dessus : la fenêtre ouverte, l’air qui va du malade vers elle, le soignant placé de côté, hors de ce chemin, la porte sur le reste de la maison, tenue fermée, et près d’elle la chaudière à couvercle pour le linge souillé et le sac fermé d’un nœud pour les masques et les gants. En bas à droite, les gants retirés dans l’ordre, les cases numérotées de 1 à 4 : pincer le premier par l’extérieur, au rebord, qui décolle et se retourne sous la pince, et le rouler à l’envers vers les doigts ; le garder dans la main encore gantée ; glisser deux doigts nus sous le rebord du second, par l’intérieur, jusqu’au bas de la paume ; le retourner par-dessus le premier et jeter le tout dans le sac.',
    format: 'pleine',
    disposition: [['coupe', 'plan'], ['chambre', 'gants']],
    hauteurs: [1.12, 1],
    largeurs: [[4, 3], [1.15, 1]],
    vues: {
      coupe: {
        titre: 'En coupe, par le côté',
        dessin: coupe,
        renvois: () => [
          { n: 1, rond: [250, 96], cible: [188, 96], texte: 'couverture pliée sur la corde' },
          { n: 2, rond: [84, 84], cible: [51, 97], texte: 'crochets à hauteur d’homme : habits du dehors' },
          { n: 3, rond: [153, 72], cible: [127.5, 80], texte: 'lampe' },
          { n: 4, rond: [292, 198], cible: [213, 207], texte: 'plancher, pour se déchausser hors de la neige' },
          { n: 5, rond: [258, 160], cible: [204, 188], texte: 'bottes du dehors, qui restent devant le rideau' },
          { n: 6, rond: [118, 140], cible: [157, 190], texte: 'deuxième paire, derrière le rideau' },
        ],
      },
      plan: {
        titre: 'Vu de dessus',
        dessin: plan,
        renvois: () => [
          { n: 7, rond: [72, 146], cible: [119, 204], texte: 'couvertures chevauchées d’une main' },
        ],
      },
      chambre: {
        titre: 'La chambre du malade',
        dessin: chambre,
        renvois: () => [
          { n: 8, rond: [290, 28], cible: [256, 49], texte: 'fenêtre ouverte avant d’entrer' },
          { n: 9, rond: [168, 118], cible: [126, 118], texte: 'soignant, jamais entre malade et fenêtre' },
          { n: 10, rond: [170, 196], cible: [133, 222], texte: 'chaudière à couvercle : le linge souillé' },
          { n: 11, rond: [60, 196], cible: [93, 225], texte: 'sac fermé d’un nœud : masques et gants' },
        ],
      },
      gants: {
        titre: 'Retirer les gants, dans l’ordre',
        dessin: gants,
        renvois: () => [
          { n: 12, rond: [108, 66], cible: surPince(20, 4), texte: 'hachuré : ce qui a touché le malade' },
        ],
      },
    },
  };
};
