// Planche 03-09. L’abri dans la pièce (ch. 3, étape 10, « Avant la nuit, monter un abri dans la pièce » : couverture sur la table,
// drap jusqu'aux chaises, matelas debout au mur ; les enfants au milieu, les adultes aux bouts).
// Coupes en cm : en travers, x = distance au mur ; en long, x = le long du mur.
// 13 oct. : plus de corps vus de dessus (JP) ; la vue de dessus devient une coupe en long, où le
// dormeur est de profil (corps simple sous sa couverture) et où les deux bouts descendent au plancher.
// 16 oct. : dans la comparaison du bas, le dormeur est sous sa couverture, comme dans la vue en long (son bras
// et sa main, dessinés à cette taille, n'étaient pas nets).
// 19 oct. : repères renumérotés dans l'ordre des gestes de l'étape 10 du ch. 3 (monter l'abri 1 à 3, faire le lit
// 4 à 6, coucher tout le monde 7 à 9, le papier journal 10, fermer les bouts 11).
module.exports = (h) => {
  const blanc = a => a.replace('fill="none"', h.a.blanc.split(' ')[0]);
  const r1 = v => Math.round(v * 10) / 10;
  const poly = pts => 'M ' + pts.map(p => `${r1(p[0])},${r1(p[1])}`).join(' L ');

  // un tissu d'épaisseur t le long d'une polyligne
  const bande = (pts, t) => {
    const n = pts.length, g = [], d = [];
    for (let i = 0; i < n; i++) {
      const a = pts[Math.max(0, i - 1)], b = pts[Math.min(n - 1, i + 1)];
      const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1;
      const nx = -dy / L * t / 2, ny = dx / L * t / 2;
      g.push([pts[i][0] + nx, pts[i][1] + ny]);
      d.push([pts[i][0] - nx, pts[i][1] - ny]);
    }
    return poly(g.concat(d.reverse())) + ' Z';
  };

  // carton aplati en coupe : deux peaux, la cannelure entre elles
  const carton = (x1, x2, y, ep) => {
    let d = `M ${r1(x1)},${r1(y + ep / 2)}`;
    const p = ep * 1.3;
    for (let x = x1, k = 0; x < x2 - 0.1; x += p, k++) {
      const xe = Math.min(x + p, x2), xm = (x + xe) / 2;
      d += ` Q ${r1(xm)},${r1(k % 2 ? y + ep * 1.5 : y - ep / 2)} ${r1(xe)},${r1(y + ep / 2)}`;
    }
    return [h.rect(x1, y, x2 - x1, ep, blanc(h.a.detail)), h.path(d, h.a.fin)].join('\n');
  };

  // ── Les corps : le pictogramme de la règle 8, en cm (bandes arrondies, tête ronde sans visage) ──
  // Une capsule de P à Q, rayon r : la bande d'un bras, d'une jambe.
  const capsule = (P, Q, r) => {
    const dx = Q[0] - P[0], dy = Q[1] - P[1], L = Math.hypot(dx, dy) || 1;
    const nx = -dy / L * r, ny = dx / L * r;
    return `M ${r1(P[0] + nx)},${r1(P[1] + ny)} L ${r1(Q[0] + nx)},${r1(Q[1] + ny)} ` +
      `A ${r1(r)},${r1(r)} 0 0 0 ${r1(Q[0] - nx)},${r1(Q[1] - ny)} L ${r1(P[0] - nx)},${r1(P[1] - ny)} ` +
      `A ${r1(r)},${r1(r)} 0 0 0 ${r1(P[0] + nx)},${r1(P[1] + ny)} Z`;
  };
  const rond = (cx, cy, r) => `M ${r1(cx - r)},${r1(cy)} A ${r1(r)},${r1(r)} 0 1 0 ${r1(cx + r)},${r1(cy)} A ${r1(r)},${r1(r)} 0 1 0 ${r1(cx - r)},${r1(cy)} Z`;
  // Peint comme les corps simples : toutes les silhouettes en 2,3 dessous, puis chaque pièce son blanc
  // et son trait 0,7 : le contour extérieur sort à 1,5, les recouvrements restent fins (0,7).
  const NOIR = '#1A1A1A';
  const peindre = ds => [
    ...ds.map(d => `<path d="${d}" fill="none" stroke="${NOIR}" stroke-width="2.3" stroke-linejoin="round"/>`),
    ...ds.map(d => `<path d="${d}" fill="#FFFFFF" stroke="${NOIR}" stroke-width="0.7" stroke-linejoin="round"/>`),
  ].join('\n');
  // Mesures du pictogramme, en cm : adulte (175 cm) et enfant de 5 ans (110 cm).
  const MES = {
    adulte: { tete: 10.5, cou: 2, epaule: 34, hanche: 30, tronc: 50, bras: 8.5, lBras: 72, jambe: 11, ecart: 7.5, lJambe: 85, pied: 6, prof: 22 },
    enfant: { tete: 8.5, cou: 1.5, epaule: 23, hanche: 20, tronc: 31, bras: 6, lBras: 44, jambe: 7.5, ecart: 5, lJambe: 50, pied: 4, prof: 15 },
  };
  // Couché sur le dos, coupé en travers à la poitrine : le tronc et les deux bras posés à côté.
  // Rend les pièces { cx, a, b } (demi-largeur, demi-hauteur), le dessous sur le lit.
  const sectionCorps = (c, age) => {
    const m = MES[age], a = m.epaule / 2, rb = m.bras / 2;
    return [{ c, a, b: m.prof / 2 }, { c: c - a - rb + 0.8, a: rb, b: rb }, { c: c + a + rb - 0.8, a: rb, b: rb }];
  };

  // ── La coupe en travers de l'abri, vue depuis le pied des dormeurs ──
  const geoCoupe = z => {
    const G = z.h - 16;
    const s = Math.min((z.l - 8) / 278, (G - 36) / 100);
    const ox = (z.l - 278 * s) / 2;
    const X = c => ox + c * s, Y = c => G - c * s;
    const ep = 5, C = G - 2 * ep, K = C - 12 * s, B = K - 3;
    const dormeurs = [[59, 'adulte'], [101, 'enfant'], [139, 'enfant'], [181, 'adulte']];
    const corps = dormeurs.flatMap(([c, age]) => sectionCorps(c, age).map(p => [p.c, p.a, p.b]));
    const dessus = x => {
      let y = B;
      for (const [c, rx, ry] of corps) {
        const a = rx * s, b = ry * s, cy = B - b, u = Math.abs(x - X(c));
        y = Math.min(y, u <= a ? cy - b * Math.sqrt(1 - (u / a) ** 2) : cy + (u - a) * 0.9);
      }
      return y;
    };
    // le drap : du coin de la table au haut du dossier, avec son ventre
    const drapY = c => { const t = (c - 124) / 135.5; return 78.6 + 14.2 * t - 20 * t * (1 - t); };
    return { G, s, X, Y, ep, C, K, B, corps, dormeurs, dessus, drapY };
  };

  const coupe = z => {
    const { G, s, X, Y, ep, C, K, B, corps, dormeurs, dessus, drapY } = geoCoupe(z);
    const out = [];
    // plancher et mur
    out.push(h.rect(0, G, z.l, 14, h.a.hachure('bois', 'aucun')));
    out.push(h.ligne(0, G, z.l, G, h.a.arete));
    out.push(h.rect(X(0), 0, 14 * s, G, h.a.hachure('bois')));
    // matelas debout contre le mur
    out.push(h.rect(X(14) + 0.5, Y(100), 18 * s - 1, 100 * s, h.a.hachure('isolant') + ' rx="4"'));
    // cartons, coussins, couverture du dessous
    out.push(carton(X(32), X(266), C, ep));
    out.push(carton(X(32), X(266), C + ep, ep));
    for (const [a, b] of [[33, 92], [92, 151], [151, 210]])
      out.push(h.rect(X(a) + 0.6, K, (b - a) * s - 1.2, C - K, blanc(h.a.arete) + ' rx="6"'));
    out.push(h.rect(X(33), B, 177 * s, 3, blanc(h.a.detail)));
    // pattes de la table, au fond, au-dessus de la couverture
    for (const a of [36, 118]) {
      const yb = Math.max(dessus(X(a)), dessus(X(a + 4))) - 1;
      out.push(h.rect(X(a), Y(75), 4 * s, yb - Y(75), blanc(h.a.arete)));
    }
    // au fond, les têtes sur l'oreiller (un manteau roulé) dépassent de la couverture
    for (const [c, age] of dormeurs) {
      const m = MES[age], yo = B - (age === 'adulte' ? 9 : 7) * s;
      out.push(h.rect(X(c - m.epaule / 2 - 2), yo, (m.epaule + 4) * s, B - yo, blanc(h.a.detail) + ' rx="4"'));
      out.push(peindre([rond(X(c), yo - m.tete * s * 0.95, m.tete * s)]));
    }
    // les quatre dormeurs, coupés à la poitrine : le tronc, un bras de chaque côté
    for (const [c, age] of dormeurs) {
      const ds = sectionCorps(c, age).map(p => {
        const cx = X(p.c), a = p.a * s, b = p.b * s, cy = B - b;
        return `M ${r1(cx - a)},${r1(cy)} A ${r1(a)},${r1(b)} 0 1 0 ${r1(cx + a)},${r1(cy)} A ${r1(a)},${r1(b)} 0 1 0 ${r1(cx - a)},${r1(cy)} Z`;
      });
      out.push(peindre([ds[1], ds[2], ds[0]]));
    }
    // une même couverture sur les quatre
    // le tissu ne descend pas dans les creux étroits entre deux corps : il passe d'un sommet à
    // l'autre (fermeture du profil sur une largeur de main)
    const xs = [], ys = [];
    for (let x = X(20); x <= X(222); x += 1.5) { xs.push(x); ys.push(x < X(33) || x > X(209) ? B : dessus(x)); }
    const w = Math.round(5 * s / 1.5), n = xs.length;
    const haut = ys.map((_, i) => Math.min(...ys.slice(Math.max(0, i - w), Math.min(n, i + w + 1))));
    const ferme = haut.map((_, i) => Math.max(...haut.slice(Math.max(0, i - w), Math.min(n, i + w + 1))));
    const pc = xs.map((x, i) => [x, Math.min(ys[i], ferme[i]) - 2.4]).filter(([x]) => x >= X(33) - 0.1 && x <= X(209) + 0.1);
    out.push(h.path(bande(pc, 4), blanc(h.a.arete)));
    // la chaise, dossier au bout, qui tient le drap
    out.push(h.rect(X(219.5), Y(42.5), 3 * s, Y(0) - Y(42.5) - 2 * ep, blanc(h.a.arete)));
    out.push(h.rect(X(256.5), Y(92), 3 * s, Y(0) - Y(92) - 2 * ep, blanc(h.a.arete)));
    out.push(h.rect(X(218), Y(45), 42 * s, 2.5 * s, blanc(h.a.arete)));
    out.push(h.rect(X(222.5), Y(15), 34 * s, 1.6 * s, blanc(h.a.detail)));
    // le drap : de la table au dossier, puis au plancher
    // le bord du drap reste sur la table, pris sous la couverture
    const pd = [[X(98), Y(79.6)], [X(123), Y(79.6)], [X(124.4), Y(79.2)]];
    for (let c = 126; c <= 259.5; c += 2) pd.push([X(c), Y(drapY(c))]);
    for (const [c, v] of [[261.5, 92.2], [262.6, 88], [263.5, 60], [265, 30], [266.5, 8], [267.4, 2.6], [268.6, 0.7], [278, 0.7]])
      pd.push([X(c), Y(v)]);
    out.push(h.path(poly(pd), h.a.arete));
    // le dessus de la table, en coupe
    out.push(h.rect(X(34), Y(78.5), 90 * s, 3.5 * s, h.a.hachure('bois')));
    // la couverture par-dessus la table, depuis le haut du matelas
    const pt = [[15, 101], [30.5, 101], [32.6, 99.4], [35.4, 80.4], [37.2, 79.5], [94, 79.5], [98, 81.6], [124, 81.6], [126, 80.4], [126.6, 68]]
      .map(([c, v]) => [X(c), Y(v)]);
    out.push(h.path(bande(pt, 4), blanc(h.a.arete)));
    return out.join('\n');
  };

  // ─── L'enveloppe d'un corps simple (sac de couchage, couverture roulée) : la pose sert de gabarit,
  // le contour visible est celui de l'enveloppe. C'est le contour du corps rendu, uni, dilaté de
  // « marge » mm et lissé par Clipper (celui des corps simples) ; le visage reste à découvert dans
  // l'ouverture du capuchon ; « cloisons » : des coutures du duvet en travers, en part de la longueur ;
  // « garder » [x0, y0, x1, y1] : ne garder que ce rectangle (une couverture : du cou aux pieds, sur le lit) ;
  // « avec » : des rectangles unis au corps avant la dilatation (le lit, pour que la couverture y retombe).
  const CL = require(require('path').join(__dirname, '../../.claude/skills/planches/scripts/corps/clipper.js'));
  const sac = (c, { marge = 55, lisse = 150, trait = 1.4, visage = true, cloisons = [], garder = null, avec = [] } = {}) => {
    const SC = 100, k = c.echelle, polys = [], r1 = v => Math.round(v * 10) / 10;
    for (const m of String(c.svg).matchAll(/<path d="([^"]+)" fill="#(?:FFFFFF|E6E6E6)"/g))
      for (const sub of m[1].split('Z')) {
        const n = sub.match(/-?[\d.]+/g); if (!n || n.length < 6) continue;
        const P = []; for (let i = 0; i + 1 < n.length; i += 2) P.push({ X: Math.round(+n[i] * SC), Y: Math.round(+n[i + 1] * SC) });
        polys.push(P);
      }
    const op = (t, a, b, ouvert = false) => {
      const x = new CL.Clipper(); x.AddPaths(a, CL.PolyType.ptSubject, !ouvert); if (b) x.AddPaths(b, CL.PolyType.ptClip, true);
      if (ouvert) { const tr = new CL.PolyTree(); x.Execute(t, tr, CL.PolyFillType.pftNonZero, CL.PolyFillType.pftNonZero); return CL.Clipper.OpenPathsFromPolyTree(tr); }
      const r = new CL.Paths(); x.Execute(t, r, CL.PolyFillType.pftNonZero, CL.PolyFillType.pftNonZero); return r;
    };
    const off = (p, d) => { const o = new CL.ClipperOffset(2, 0.05 * SC); o.AddPaths(p, CL.JoinType.jtRound, CL.EndType.etClosedPolygon); const r = new CL.Paths(); o.Execute(r, d * SC); return r; };
    // « avec » : des rectangles [x0, y0, x1, y1] unis au corps (le lit sous une couverture, qu'elle y retombe)
    for (const [a, b, cc, d] of avec) polys.push([[a, b], [cc, b], [cc, d], [a, d]].map(([x, y]) => ({ X: Math.round(x * SC), Y: Math.round(y * SC) })));
    let env = off(off(op(CL.ClipType.ctUnion, polys), (marge + lisse) * k), -lisse * k);
    if (garder) {
      const [a, b, cc, d] = garder.map(v => Math.round(v * SC)), R = 30 * k;
      env = off(off(op(CL.ClipType.ctIntersection, env, [[{ X: a, Y: b }, { X: cc, Y: b }, { X: cc, Y: d }, { X: a, Y: d }]]), -R), R);
    }
    if (visage) {
      const t = c.tete, hx = t.haut[0] - t.x, hy = t.haut[1] - t.y, L = Math.hypot(hx, hy) || 1, mi = c.miroir ? -1 : 1;
      const fx = -hy / L * mi, fy = hx / L * mi, r = 100 * k, D = [];
      for (let i = 0; i < 48; i++) { const a = i / 48 * 2 * Math.PI; D.push({ X: Math.round((t.x + fx * 0.6 * r + 0.78 * r * Math.cos(a)) * SC), Y: Math.round((t.y + fy * 0.6 * r + 0.78 * r * Math.sin(a)) * SC) }); }
      env = op(CL.ClipType.ctDifference, env, [D]);
    }
    const dP = P => 'M' + P.map(q => `${r1(q.X / SC)} ${r1(q.Y / SC)}`).join(' L');
    const out = [`<path d="${env.map(P => dP(P) + ' Z').join(' ')}" fill="#FFFFFF" stroke="#1A1A1A" stroke-width="${trait}" stroke-linejoin="round"/>`];
    if (cloisons.length) {
      const b = c.boite, x0 = b.x0 - marge * k, x1 = b.x1 + marge * k, dedans = off(env, -2.2);
      const lignes = cloisons.map(t => { const x = Math.round((x0 + (x1 - x0) * t) * SC); return [{ X: x, Y: Math.round((b.y0 - 400 * k) * SC) }, { X: x, Y: Math.round((b.y1 + 400 * k) * SC) }]; });
      const cl = op(CL.ClipType.ctIntersection, lignes, dedans, true);
      if (cl.length) out.push(`<path d="${cl.map(dP).join(' ')}" fill="none" stroke="#1A1A1A" stroke-width="0.5" stroke-linecap="round"/>`);
    }
    return out.join('\n');
  };

  // ── En long : l'abri coupé dans sa longueur, devant le dormeur le plus proche du drap ──
  // On regarde vers le mur. La table est au-delà de la coupe (gris loin) ; le drap, coupé à sa hauteur
  // (≈ 82 cm), descend au plancher aux deux bouts. Le dormeur est le corps simple couché sur le dos,
  // sous sa couverture (la pose sert de gabarit, le contour visible est celui de la couverture).
  const geoLong = z => {
    const G = z.h - 16, s = Math.min((z.l - 14) / 212, (G - 40) / 100);
    const ox = (z.l - 212 * s) / 2;
    const X = c => ox + c * s, Y = c => G - c * s;
    const ep = 5, C = G - 2 * ep, K = C - 12 * s, B = K - 3;
    const k = s / 10;                                        // unités de vue par mm
    return { G, s, X, Y, ep, C, K, B, k, DRAP: 81.6 };
  };
  const enLong = z => {
    const { G, s, X, Y, ep, C, K, B, k, DRAP } = geoLong(z);
    const out = [];
    out.push(h.rect(0, G, z.l, 14, h.a.hachure('bois', 'aucun')), h.ligne(0, G, z.l, G, h.a.arete));
    // la table, au fond : ses deux pattes et son dessus, en gris loin
    for (const a of [14, 192]) out.push(h.rect(X(a), Y(75), 4 * s, B - Y(75), h.a.loin), h.rect(X(a), Y(75), 4 * s, B - Y(75), h.a.detail));
    out.push(h.rect(X(12), Y(82), 188 * s, 3.5 * s, h.a.loin), h.rect(X(12), Y(82), 188 * s, 3.5 * s, h.a.detail));
    // cartons, coussins, couverture du dessous
    out.push(carton(X(6), X(206), C, ep), carton(X(6), X(206), C + ep, ep));
    for (const [a, b] of [[8, 73], [73, 139], [139, 204]]) out.push(h.rect(X(a) + 0.6, K, (b - a) * s - 1.2, C - K, blanc(h.a.arete) + ' rx="6"'));
    out.push(h.rect(X(8), B, 196 * s, 3, blanc(h.a.detail)));
    // le dormeur, la tête vers le bout de gauche, et sa couverture du cou aux pieds
    const d = h.formes.corps({ pose: 'couche-dos', x: X(16) + 822 * k, y: B, echelle: k,
      angles: { cuisseP: 84, jambeP: 96, cuisseL: 84, jambeL: 96 } });
    out.push(d.toString());
    const cou = d.articulations.cou[0] + 20 * k;
    out.push(sac(d, { marge: 35, lisse: 120, visage: false, garder: [cou, B - 400 * k, X(206), B], avec: [[cou, B - 40 * k, d.boite.x1, B]] }));
    // le drap, coupé : sa hauteur sur toute la longueur, et aux deux bouts il descend au plancher
    const r = 6 * s, yD = Y(DRAP);
    out.push(h.path(`M ${r1(X(4))} ${r1(G)} L ${r1(X(4))} ${r1(yD + r)} Q ${r1(X(4))} ${r1(yD)} ${r1(X(4) + r)} ${r1(yD)} `
      + `L ${r1(X(208) - r)} ${r1(yD)} Q ${r1(X(208))} ${r1(yD)} ${r1(X(208))} ${r1(yD + r)} L ${r1(X(208))} ${r1(G)}`, h.a.arete));
    return out.join('\n');
  };

  // ── Le lit en couches, de près ──
  const geoCouches = z => {
    const G = z.h - 18, e = 13;
    const S = G - 2 * e - 52, L = S - 7;
    const fin = z.l - 60;
    const rx = 40, ry = 26, cx = 92, cy = L - ry, rb = 10.5;
    // le tronc coupé à la poitrine, un bras de chaque côté
    const pieces = [[cx, rx, ry], [cx - rx - rb + 2, rb, rb], [cx + rx + rb - 2, rb, rb]];
    const nappe = (d, x) => {
      let t = L - d * 0.8;
      for (const [pc, pa, pb] of pieces) {
        const a = pa + d, b = pb + d, u = Math.abs(x - pc), py = L - pb;
        t = Math.min(t, u <= a ? py - b * Math.sqrt(1 - (u / a) ** 2) : py + (u - a) * 1.6);
      }
      return t;
    };
    return { G, e, S, L, fin, rx, ry, cx, cy, pieces, nappe };
  };

  const couches = z => {
    const { G, e, S, L, fin, rx, ry, cx, cy, pieces, nappe } = geoCouches(z);
    const out = [];
    out.push(h.rect(0, G, z.l, 18, h.a.hachure('bois', 'aucun')));
    out.push(h.ligne(0, G, z.l, G, h.a.arete));
    out.push(carton(0, z.l - 10, G - e, e));
    out.push(carton(0, z.l - 26, G - 2 * e, e));
    // branches de sapin
    const sf = z.l - 44;
    const branches = [[0, S + 40, sf * 0.62, S + 35], [sf * 0.34, S + 44, sf, S + 39], [0, S + 25, sf * 0.47, S + 18],
      [sf * 0.3, S + 29, sf * 0.86, S + 22], [sf * 0.56, S + 13, sf + 2, S + 9], [0, S + 10, sf * 0.32, S + 6.5],
      [sf * 0.08, S + 47, sf * 0.5, S + 46]];
    for (const [xa, ya, xb, yb] of branches) {
      const L0 = Math.hypot(xb - xa, yb - ya), ux = (xb - xa) / L0, uy = (yb - ya) / L0;
      const at = q => [xa + ux * q, ya + uy * q + Math.sin(q / L0 * Math.PI) * 1.5];
      const pts = []; for (let q = 0; q <= L0; q += 6) pts.push(at(q));
      out.push(h.path(poly(pts), h.a.detail));
      let dn = '';
      for (let q = 3; q < L0 - 2; q += 3.2) {
        const [px, py] = at(q);
        for (const sg of [1, -1]) {
          const ang = Math.atan2(uy, ux) + sg * 0.85;
          dn += `M ${r1(px)},${r1(py)} L ${r1(px + Math.cos(ang) * 5.5)},${r1(py + Math.sin(ang) * 5.5)} `;
        }
      }
      out.push(h.path(dn, h.a.fin));
    }
    // couverture du dessous
    out.push(h.rect(0, L, fin, 7, blanc(h.a.arete)));
    // le corps, en coupe : le tronc et les deux bras
    const ds = pieces.map(([pc, pa, pb]) => { const py = L - pb;
      return `M ${r1(pc - pa)},${r1(py)} A ${pa},${pb} 0 1 0 ${r1(pc + pa)},${r1(py)} A ${pa},${pb} 0 1 0 ${r1(pc - pa)},${r1(py)} Z`; });
    out.push(peindre([ds[1], ds[2], ds[0]]));
    // par-dessus : couverture, papier journal (dessiné en boules), couverture
    const xe = fin - 6;
    const nap = (d1, d2) => {
      const hauts = [], bas = [];
      for (let x = 0; x <= xe; x += 1.5) { hauts.push([x, nappe(d2, x)]); bas.push([x, nappe(d1, x)]); }
      return poly(hauts.concat(bas.reverse())) + ' Z';
    };
    out.push(h.path(nap(0, 5), blanc(h.a.arete)));
    let graine = 7;
    const hasard = () => { graine = (graine * 16807) % 2147483647; return (graine % 1000) / 1000; };
    for (let x = 5; x < xe - 3; x += 9.5) {
      const y1 = nappe(5, x), y2 = nappe(18, x), th = y1 - y2;
      if (th < 8) continue;
      const r = Math.min(6.4, th / 2 - 0.4), yc = (y1 + y2) / 2;
      const pts = [];
      for (let i = 0; i < 8; i++) {
        const a = i / 8 * 2 * Math.PI + hasard() * 0.4, rr = r * (0.78 + hasard() * 0.24);
        pts.push([x + Math.cos(a) * rr, yc + Math.sin(a) * rr]);
      }
      out.push(h.path(poly(pts) + ' Z', blanc(h.a.detail)));
      out.push(h.path(poly([[x - r * 0.45, yc + r * 0.15], [x + r * 0.4, yc - r * 0.2]]), h.a.fin));
    }
    out.push(h.path(nap(18, 23), blanc(h.a.arete)));
    return out.join('\n');
  };

  // ── La comparaison : ce qui est sous le corps ──
  const epaisseur = (a, b) => x => {
    const e = 5, c = 1.6, r = 8;
    if (x < a - r || x > b + r) return e;
    if (x >= a && x <= b) return c;
    return c + (e - c) * (x < a ? (a - x) / r : (x - b) / r);
  };
  const comparaison = (z, cartons, nb) => {
    const G = z.h - 14, Lb = Math.min(210, z.l - 70), x0 = (z.l - Lb) / 2;
    const x1 = 12, x2 = z.l - 12, t = epaisseur(x0 + 4, x0 + Lb * 0.97);
    const out = [h.rect(0, G, z.l, 14, h.a.hachure('bois', 'aucun')), h.ligne(0, G, z.l, G, h.a.arete)];
    const sol = G - cartons * 5;
    for (let i = 0; i < cartons; i++) out.push(carton(x1, x2, G - (i + 1) * 5, 5));
    for (let i = 1; i <= nb; i++) {
      const pts = []; for (let x = x1; x <= x2; x += 2) pts.push([x, sol - i * t(x)]);
      out.push(h.path(poly(pts), h.a.detail));
    }
    out.push(h.ligne(x1, sol, x1, sol - nb * 5, h.a.detail), h.ligne(x2, sol, x2, sol - nb * 5, h.a.detail));
    const base = sol - nb * 1.6;
    // le dormeur sous sa couverture, comme dans la vue en long : la main ne se dessine pas nette à cette taille
    const e = Lb / 1750;
    const d = h.formes.corps({ pose: 'couche-dos', x: x0 + 822 * e, y: base, echelle: e,
      angles: { cuisseP: 82, jambeP: 98, cuisseL: 82, jambeL: 98 } });
    out.push(d.toString());
    const cou = d.articulations.cou[0] + 20 * e;
    out.push(sac(d, { marge: 35, lisse: 120, visage: false, garder: [cou, base - 400 * e, x0 + Lb + 12, base], avec: [[cou, base - 40 * e, d.boite.x1, base]] }));
    if (!cartons) for (const u of [0.3, 0.5, 0.7]) out.push(h.fleche(`M ${r1(x0 + Lb * u)},${r1(base - 4)} L ${r1(x0 + Lb * u)},${r1(G + 10)}`));
    return out.join('\n');
  };

  return {
    ref: '03-09',
    titre: 'L’abri dans la pièce : la tente de table et le lit en couches',
    desc: 'En coupe : contre le mur, un matelas debout ; une couverture part du haut du matelas et couvre la table ; un drap, pris sous la couverture sur la table, continue jusqu’au dossier d’une chaise, puis descend au plancher. Dessous, sur des cartons et des coussins de divan, les quatre dormeurs, coupés à la poitrine (le tronc et un bras de chaque côté, la tête qui dépasse au fond), sous une même couverture. En long : un dormeur couché sur le dos sous sa couverture, la table au fond ; aux deux bouts, le drap descend jusqu’au plancher. De près : cartons, branches de sapin, couverture, le corps, puis couverture, papier journal et couverture. En bas : un dormeur sur quatre couvertures écrasées à même le plancher, la chaleur qui part dans le bois ; un autre sur deux cartons et une couverture.',
    format: 'pleine',
    disposition: [['coupe'], ['long', 'couches'], ['rate', 'bon']],
    hauteurs: [5, 5, 2],
    largeurs: [[1], [4, 3], [1, 1]],
    vues: {
      coupe: {
        titre: 'En coupe, en travers de l’abri',
        dessin: coupe,
        renvois: z => {
          const { X, Y, K, C, B, s, dessus, drapY } = geoCoupe(z);
          return [
            { n: 1, rond: [X(23), Y(100) - 22], cible: [X(23), Y(92)], texte: 'matelas debout contre le mur' },
            { n: 2, rond: [X(80), Y(95)], cible: [X(84), Y(80.2)], texte: 'couverture par-dessus la table' },
            { n: 3, rond: [X(186), Y(101)], cible: [X(180), Y(drapY(180))], texte: 'drap tendu jusqu’au dossier et au plancher' },
            { n: 7, rond: [X(150), Y(58)], cible: [X(166), dessus(X(166)) - 3], texte: 'une même couverture pour les quatre' },
            { n: 8, rond: [X(214), Y(30)], cible: [X(200), (K + C) / 2], texte: 'le lit de coussins' },
            { n: 9, rond: [X(101), Y(64)], cible: [X(101), B - 23.6 * s - 0.8], texte: 'les enfants au milieu, un adulte aux bouts' },
          ];
        },
      },
      long: {
        titre: 'En long, les deux bouts fermés',
        dessin: enLong,
        renvois: z => {
          const { X, Y, G, DRAP } = geoLong(z);
          return [
            { n: 11, rond: [X(186), Y(DRAP) - 26], cible: [X(208) + 1, Y(DRAP / 2)], texte: 'les deux bouts fermés jusqu’au plancher' },
          ];
        },
      },
      couches: {
        titre: 'Le lit en couches, de près',
        dessin: couches,
        renvois: z => {
          const { G, e, S, L, fin, rx, cx, nappe } = geoCouches(z);
          const xt = cx + rx * 0.7;
          return [
            { n: 4, rond: [z.l - 13, G - 2 * e - 11], cible: [z.l - 34, G - 1.5 * e], texte: 'cartons aplatis ou tapis roulé' },
            { n: 5, rond: [z.l - 28, S - 5], cible: [z.l - 58, S + 16], texte: 'branches de sapin, ou matelas, ou coussins' },
            { n: 6, rond: [z.l - 40, L - 26], cible: [fin - 3, L + 3.5], texte: 'couverture sous le corps' },
            { n: 10, rond: [z.l - 30, nappe(23, xt) - 24], cible: [xt, (nappe(5, xt) + nappe(18, xt)) / 2], texte: 'papier journal entre deux couvertures' },
          ];
        },
      },
      rate: {
        titre: 'Moins chaud : quatre couvertures au plancher',
        dessin: z => comparaison(z, 0, 4),
        renvois: () => [],
      },
      bon: {
        titre: 'Plus chaud : deux cartons, une couverture',
        dessin: z => comparaison(z, 2, 1),
        renvois: () => [],
      },
    },
  };
};
