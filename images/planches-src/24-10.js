// Planche 24-10 — Les attelles de pouce et de poignet (ch. 24, section 9, « Les attelles de pouce
// et de poignet » ; étapes 32 et 33).
//
// Ce que le chapitre donne, et rien de plus :
//   · le pouce : une bande d'écorce de bouleau trempée chaude, moulée autour du pouce et du bord
//     du poignet, laissée sécher en place, le pouce légèrement écarté comme pour tenir un verre ;
//   · le poignet de la nuit : une latte de bois mince ou une écorce moulée sous l'avant-bras et la
//     paume, le poignet droit, tenue par une bande ;
//   · jamais de peau crue mouillée autour d'un membre qui enfle (encadré).
// Aucune cote : le chapitre ne donne aucune mesure.
//
// Une seule main pour toute la planche, la main gauche de la bibliothèque des mains simples
// (mainSimple, pose ouverte, le pouce écarté dans le plan de la paume) : vue du dos, doigts à droite,
// pouce en bas ; vue du côté du pouce, doigts à droite, la même pose. Les deux vues de l'attelle de
// poignet sont donc de vraies projections l'une de l'autre : le dos au-dessus, le côté du pouce en
// dessous, alignés à la même échelle. L'écorce, les bandes et la latte se posent sur le contour même
// de la main (relevé sur son tracé) : les largeurs de l'avant-bras, du pouce, la commissure.
// Les coupes sont vues du bout des doigts, à la même échelle que la vue qu'elles coupent.
module.exports = (h) => {
  const N = '#1A1A1A', B = '#FFFFFF';
  const f = v => Math.round(v * 10) / 10;
  const R = Math.PI / 180;
  const dirA = a => [Math.cos(a * R), Math.sin(a * R)];
  const add = (p, q) => [p[0] + q[0], p[1] + q[1]];
  const sub = (p, q) => [p[0] - q[0], p[1] - q[1]];
  const mul = (p, k) => [p[0] * k, p[1] * k];
  const lon = p => Math.hypot(p[0], p[1]);
  const uni = p => mul(p, 1 / lon(p));
  const gau = u => [u[1], -u[0]];
  const lerp = (p, q, t) => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t];
  const hasard = (graine) => {
    let a = graine >>> 0;
    return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  };

  // ─── chemins ─────────────────────────────────────────────────────────────────────────────
  // Catmull-Rom : une suite de points devient une courbe qui passe par chacun.
  const courbe = (pts, debut = true) => {
    let d = debut ? `M${f(pts[0][0])} ${f(pts[0][1])}` : `L${f(pts[0][0])} ${f(pts[0][1])}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
      const c1 = add(p1, mul(sub(p2, p0), 1 / 6)), c2 = sub(p2, mul(sub(p3, p1), 1 / 6));
      d += ` C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
    }
    return d;
  };
  // plusieurs tronçons lisses reliés en angle, fermés
  const forme = (troncons) => troncons.map((t, i) => courbe(t, i === 0)).join(' ') + ' Z';
  const fermeLisse = (pts) => courbe([...pts, pts[0], pts[1]]).replace(/ C[^C]*$/, '') + ' Z';
  const dedans = (p, poly) => {
    let c = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const [xi, yi] = poly[i], [xj, yj] = poly[j];
      if ((yi > p[1]) !== (yj > p[1]) && p[0] < (xj - xi) * (p[1] - yi) / (yj - yi) + xi) c = !c;
    }
    return c;
  };

  // ─── la main de la bibliothèque, et ce qu'on relève sur son contour ─────────────────────────
  const F = h.formes.mainSimple;
  const MAIN = { pose: 'ouverte', cote: 'gauche', doigts: { pouce: { opposition: -16, cmc: -12, mcp: 6, ip: 6 } } };
  const BRAS = 110;                          // l'avant-bras, du poignet à la coupe (mm)
  const ANG_P = 2.2;                         // la vue du côté du pouce, tournée : l'avant-bras et la paume à plat
  const pts = d => [...d.matchAll(/(-?\d+\.?\d*)[ ,](-?\d+\.?\d*)/g)].map(a => [+a[1], +a[2]]);
  const pieces = m => [...m.couches.main.matchAll(/<path d="([^"]+)"/g)].map(a => pts(a[1]));
  // la droite p + t·n coupe le contour : le plus proche des deux côtés, [t < 0, t > 0]
  const travers = (P, n, poly) => {
    let tp = Infinity, tm = -Infinity;
    for (let i = 0; i < poly.length; i++) {
      const a = poly[i], b = poly[(i + 1) % poly.length], d = sub(b, a);
      const den = -n[0] * d[1] + n[1] * d[0];
      if (Math.abs(den) < 1e-9) continue;
      const r = sub(a, P), t = (-r[0] * d[1] + r[1] * d[0]) / den, u = (n[0] * r[1] - n[1] * r[0]) / den;
      if (u < 0 || u > 1) continue;
      if (t > 0 && t < tp) tp = t;
      if (t < 0 && t > tm) tm = t;
    }
    return [tm, tp];
  };

  // Vue du dos, à l'échelle 1, le poignet en (0, 0). Repère de la vue du dos : x mm vers les doigts
  // (0 aux jointures, WX au poignet), y mm vers le petit doigt ; à l'écran le pouce est en bas (main
  // gauche vue du dos), d'où le -y.
  const M_DOS = F({ ...MAIN, vue: 'dos', angle: 0, x: 0, y: 0, echelle: 1, ancre: 'poignet', avantbras: { longueur: BRAS } });
  const WX = -M_DOS.articulations['majeur.mcp'][0];
  const versDos = p => [WX + p[0], -p[1]];
  const SIL = pieces(M_DOS)[0].map(versDos);                // le contour de la main et de l'avant-bras
  const yPouce = x => travers([x, 0], [0, 1], SIL)[0];      // le bord de l'avant-bras côté pouce (y < 0)
  const yPetit = x => travers([x, 0], [0, 1], SIL)[1];      // côté petit doigt
  // la commissure : le contour sous le point (x, y0), en descendant vers le pouce
  const yCreux = (x, y0 = -25) => y0 - travers([x, y0], [0, -1], SIL)[1];

  // le pouce : sa chaîne d'articulations, et ses deux bords relevés en travers
  const PT = ['pouce.cmc', 'pouce.mcp', 'pouce.ip', 'pouce.bout'].map(k => versDos(M_DOS.articulations[k]));
  const LP = [0, 1, 2].map(i => lon(sub(PT[i + 1], PT[i])));
  const S_TOT = LP[0] + LP[1] + LP[2];
  const P0 = PT[0];
  const surPouce = (s) => {
    let i = 0, acc = 0;
    while (i < 2 && acc + LP[i] < s) { acc += LP[i]; i++; }
    const t = Math.max(0, Math.min(1, (s - acc) / LP[i]));
    return { p: lerp(PT[i], PT[i + 1], t), u: uni(sub(PT[i + 1], PT[i])) };
  };
  // cote +1 : le bord extérieur du pouce (côté pouce de l'avant-bras) ; -1 : le bord côté index. Avant
  // la commissure, le côté de l'index se fond dans le dos de la main : on y reprend la demi-largeur de
  // l'extérieur.
  const demi = (s, cote) => {
    const q = surPouce(s), w = c => travers(q.p, mul(gau(q.u), c), SIL)[1];
    const d = w(cote);
    if (d < 16) return d;
    const e = w(-cote);
    return e < 16 ? e : 11;
  };
  const bordP = (s, cote, off = 0) => { const q = surPouce(s); return add(q.p, mul(gau(q.u), cote * (demi(s, cote) + off))); };

  // ─── repères ─────────────────────────────────────────────────────────────────────────────
  // une seule échelle pour toute la planche : celle des vues de gauche (les coupes la reprennent)
  let E0 = null;
  const ECH = z => (z.l > 300 || E0 == null) ? (E0 = z.l / 330) : E0;
  const geoDos = z => {
    const e = ECH(z), ox = z.l - 115 * e, oy = z.h / 2 - 22 * e;
    return { e, ox, oy, V: p => [ox + e * p[0], oy - e * p[1]] };
  };
  // Vue du côté du pouce : x mm (x profil = x dos + 42), y mm vers le bas, 0 = dessus de la latte. Le
  // poignet tombe à la même abscisse que dans la vue du dos.
  const DX = 42;
  const geoProfil = z => {
    const e = ECH(z), ox = z.l - 115 * e, X0 = ox - DX * e, y0 = z.h / 2 + 18 * e;
    return { e, X0, y0, V: p => [X0 + e * p[0], y0 + e * p[1]] };
  };
  const CUT = WX - BRAS;

  // Vue du côté du pouce, à l'échelle 1, le poignet en (0, 0), tournée de ANG_P ; on la pose sur la
  // latte par ce qui touche : le dessous de l'avant-bras et de la paume (le pouce, plus épais, déborde
  // un peu sur la tranche de la latte).
  const M_PRO = F({ ...MAIN, vue: 'pouce', angle: ANG_P, x: 0, y: 0, echelle: 1, ancre: 'poignet', avantbras: { longueur: BRAS } });
  const SIL_P0 = pieces(M_PRO)[0];
  const sousP = x => travers([x, 0], [0, 1], SIL_P0)[1];
  const Y_POI = -Math.max(sousP(-BRAS + 6), sousP(-40), sousP(40));     // le poignet, au-dessus de la latte
  const versPro = p => [WX + DX + p[0], Y_POI + p[1]];
  const SIL_P = SIL_P0.map(versPro);
  // les y où la verticale x coupe un contour, du plus haut au plus bas
  const ysV = (x, poly) => {
    const r = [];
    for (let i = 0; i < poly.length; i++) {
      const a = poly[i], b = poly[(i + 1) % poly.length];
      if ((a[0] - x) * (b[0] - x) <= 0 && a[0] !== b[0]) r.push(a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0]));
    }
    return r.sort((u, v) => u - v);
  };
  const dessusP = x => ysV(x, SIL_P)[0];                                   // le dessus du membre, en y
  // les pièces du pouce (ses deux phalanges), pour faire passer la bande derrière lui
  const PT_P = ['pouce.mcp', 'pouce.ip', 'pouce.bout'].map(k => versPro(M_PRO.articulations[k]));
  const POUCE_P = pieces(M_PRO).slice(1).map(q => q.map(versPro)).filter(q => {
    const xs = q.map(p => p[0]);
    return Math.max(...xs) - Math.min(...xs) < 60 && [lerp(PT_P[0], PT_P[1], 0.5), lerp(PT_P[1], PT_P[2], 0.5)].some(t => dedans(t, q));
  });
  const pouceP = x => { const ys = POUCE_P.flatMap(q => ysV(x, q)); return ys.length ? [Math.min(...ys), Math.max(...ys)] : null; };

  // ─── les pièces communes ─────────────────────────────────────────────────────────────────
  const chaine = (pts, g) => pts.map(g.V);
  const poly = (pts, at) => `<path d="${'M' + pts.map(p => `${f(p[0])} ${f(p[1])}`).join(' L')} Z" ${at}/>`;
  const blancTrait = (t = 'arete') => `fill="${B}" stroke="${N}" stroke-width="${{ arete: 1.4, detail: 0.7, contour: 2.4 }[t]}" stroke-linejoin="round"`;

  // Un tour de bande, vu à plat : bande de toile, deux lisières et le pli d'un tour sur l'autre.
  const tourBande = (g, xa, larg, yHaut, yBas, pente) => {
    const a = [xa + pente, yHaut], b = [xa + larg + pente, yHaut], c = [xa + larg - pente, yBas], d = [xa - pente, yBas];
    const pv = chaine([a, b, c, d], g);
    const m1 = chaine([lerp(a, b, 0.22), lerp(d, c, 0.22)], g);
    return poly(pv, blancTrait('arete')) + h.ligne(...m1[0], ...m1[1], h.a.fin);
  };

  // Les lenticelles de l'écorce de bouleau : des tirets courts, couchés dans le sens où l'écorce
  // fait le tour du membre.
  const lenticelles = (g, contour, sens, graine, n) => {
    const rng = hasard(graine), out = [], pris = [];
    const xs = contour.map(p => p[0]), ys = contour.map(p => p[1]);
    const bx = [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
    for (let k = 0; k < n * 12 && pris.length < n; k++) {
      const p = [bx[0] + (bx[2] - bx[0]) * rng(), bx[1] + (bx[3] - bx[1]) * rng()];
      const u = sens(p), L = 2 + 2.3 * rng();
      const a = sub(p, mul(u, L / 2)), b = add(p, mul(u, L / 2));
      const marge = (q) => [[1.6, 0], [-1.6, 0], [0, 1.6], [0, -1.6]].every(d => dedans(add(q, d), contour));
      if (!marge(a) || !marge(b)) continue;
      if (pris.some(q => lon(sub(q, p)) < 4.1)) continue;
      pris.push(p);
      const A = g.V(a), Bq = g.V(b);
      out.push(`<line x1="${f(A[0])}" y1="${f(A[1])}" x2="${f(Bq[0])}" y2="${f(Bq[1])}" stroke="${N}" stroke-width="1.4" stroke-linecap="round"/>`);
    }
    return out.join('\n');
  };

  // Trait de coupe : mixte fin, bouts épais, flèches du sens de vue, lettre au bout.
  const traitCoupe = (p, q, vue, lettre, cote = 'q') => {
    const u = uni(sub(q, p)), L = 7;
    const bout = (m, s) => h.ligne(...m, ...add(m, mul(u, s * L)), h.a.arete);
    const fl = (m) => {
      const t = add(m, mul(vue, 9)), bse = add(m, mul(vue, 3.5)), n = gau(vue);
      return poly([t, add(bse, mul(n, 3)), add(bse, mul(n, -3))], h.a.plein) + h.ligne(...m, ...bse, h.a.detail);
    };
    const pl = cote === 'q' ? add(q, mul(u, 9)) : add(p, mul(u, -9));
    return [
      h.ligne(...p, ...q, h.a.fin.replace('/>', '') + ' stroke-dasharray="10 3 2 3"'),
      bout(p, 1), bout(q, -1), fl(p), fl(q),
      h.texte(pl[0], pl[1] + 4, lettre),
    ].join('\n');
  };

  // ─── l'écorce de l'attelle de pouce, dans le repère de la vue du dos (mm) ───────────────────
  const X_ECORCE = -174;                    // où la gouttière s'arrête sur l'avant-bras
  const Y_ECORCE = -10;                     // jusqu'où elle monte sur le dos du poignet
  const S_FIN = LP[0] + LP[1] - 6;          // où elle s'arrête sur le pouce (avant la jointure)
  const OFF = 2.2;                          // l'épaisseur de l'écorce vue par la tranche
  const ecorcePouce = (() => {
    const haut = [[X_ECORCE, yPouce(X_ECORCE) - OFF], [-130, yPouce(-130) - OFF], [WX - 8, yPouce(WX - 8) - OFF], bordP(0, 1, OFF)];
    for (let s = 11; s <= S_FIN; s += 11.8) haut.push(bordP(s, 1, OFF));
    haut.push(bordP(S_FIN, 1, OFF));
    const q = surPouce(S_FIN + 1.8);
    const bout = [bordP(S_FIN, 1, OFF), add(q.p, mul(gau(q.u), 4)), q.p, add(q.p, mul(gau(q.u), -4)), bordP(S_FIN, -1, OFF)];
    const bas = [bordP(S_FIN, -1, OFF), bordP(S_FIN - 8, -1, OFF), bordP(S_FIN - 16, -1, 1.2), bordP(44, -1, -0.5), bordP(30, -1, -1.5),
      bordP(12, -1, -1.5), [WX - 4, Y_ECORCE - 0.5], [-130, Y_ECORCE], [X_ECORCE, Y_ECORCE]];
    return { troncons: [haut, bout, bas], contour: [...haut, ...bout, ...bas] };
  })();

  // ─── les coupes : un contour de membre, rond d'un côté, plat de l'autre ────────────────────
  // cx, cy au centre ; demi-largeur a, demi-épaisseurs dessus / dessous ; n : l'arrondi.
  const ovale = (cx, cy, a, hHaut, hBas, n = 2.4, pas = 6, rot = 0) => {
    const pts = [];
    for (let d = 0; d < 360; d += pas) {
      const c = Math.cos(d * R), s = Math.sin(d * R);
      const x = Math.sign(c) * a * Math.pow(Math.abs(c), 2 / n);
      const y = Math.sign(s) * (s > 0 ? hBas : hHaut) * Math.pow(Math.abs(s), 2 / (s > 0 ? n + 0.8 : n));
      const r = rot ? [x * Math.cos(rot * R) - y * Math.sin(rot * R), x * Math.sin(rot * R) + y * Math.cos(rot * R)] : [x, y];
      pts.push([cx + r[0], cy + r[1]]);
    }
    return pts;
  };
  // décale une suite de points fermée vers l'extérieur de d (px), point par point
  const decale = (pts, d, ferme = true) => pts.map((p, i) => {
    const a = pts[(i - 1 + pts.length) % pts.length], b = pts[(i + 1) % pts.length];
    const t = uni(sub(b, a)), n = [t[1], -t[0]];            // sens horaire à l'écran : normale sortante
    const dd = typeof d === 'function' ? d(p, i) : d;
    return add(p, mul(n, dd));
  });
  // enveloppe convexe (chaîne monotone)
  const enveloppe = (pts) => {
    const P = pts.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
    const lo = [], hi = [];
    for (const p of P) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], p) <= 0) lo.pop(); lo.push(p); }
    for (const p of P.slice().reverse()) { while (hi.length >= 2 && cr(hi[hi.length - 2], hi[hi.length - 1], p) <= 0) hi.pop(); hi.push(p); }
    return lo.slice(0, -1).concat(hi.slice(0, -1));
  };
  // densifie un polygone (pour que le décalage suive les coins)
  const densifie = (pts, pas) => {
    const out = [];
    pts.forEach((p, i) => {
      const q = pts[(i + 1) % pts.length], L = lon(sub(q, p)), k = Math.max(1, Math.ceil(L / pas));
      for (let j = 0; j < k; j++) out.push(lerp(p, q, j / k));
    });
    return out;
  };
  // une bande de toile qui fait le tour de pts (px) : deux lisières, blanc entre
  const bandeAutour = (pts, e, jeu = 0.4, ep = 1.9) => {
    const env = densifie(enveloppe(pts), 3 * e);
    const dedansB = decale(env, jeu * e), dehors = decale(env, (jeu + ep) * e);
    return `<path d="${fermeLisse(dehors)} ${fermeLisse(dedansB.slice().reverse())}" fill="${B}" fill-rule="evenodd" stroke="${N}" stroke-width="0.7" stroke-linejoin="round"/>`;
  };
  // une couche collée au contour (l'écorce) : les points du contour où garde(p) est vrai
  const coucheCollee = (pts, garde, ep, e) => {
    const idx = pts.map((p, i) => garde(p) ? i : -1).filter(i => i >= 0);
    // remettre dans l'ordre du contour en partant d'un trou
    let k0 = idx.findIndex((v, j) => j === 0 ? !garde(pts[(v - 1 + pts.length) % pts.length]) : idx[j - 1] !== v - 1);
    if (k0 < 0) k0 = 0;
    const suite = idx.slice(k0).concat(idx.slice(0, k0)).map(i => pts[i]);
    const dehors = decale(pts, ep * e).filter((p, i) => garde(pts[i]));
    const dehorsSuite = dehors.slice(k0).concat(dehors.slice(0, k0));
    return { d: courbe(suite) + ' ' + courbe(dehorsSuite.slice().reverse(), false) + ' Z', dehors: dehorsSuite };
  };
  // un os en coupe : une ellipse, tournée par ses points (pas de transform)
  const os = (cx, cy, rx, ry, rot = 0) => {
    const c = Math.cos(rot * R), sn = Math.sin(rot * R), pts = [];
    for (let d = 0; d < 360; d += 15) { const x = rx * Math.cos(d * R), y = ry * Math.sin(d * R); pts.push([cx + x * c - y * sn, cy + x * sn + y * c]); }
    return `<path d="${fermeLisse(pts)}" fill="${B}" stroke="${N}" stroke-width="0.7"/>`;
  };

  // ─── les tours de bande de l'attelle de poignet (repère de la vue du dos, mm) ─────────────────
  const TOURS = [-176, -144, -110];          // milieux des tours sur l'avant-bras
  const LARG = 15;
  const LATTE = { x0: CUT, x1: -8, demi: 47, ep: 8 };   // la latte : jusque sous les jointures, plus large que l'avant-bras
  const XC = -144;                           // la coupe C passe dans le tour du milieu
  const XB = -116;                           // la coupe B, dans le second tour de l'attelle de pouce
  const TOURS_POUCE = [-148, -116];


  return {
    ref: '24-10',
    titre: 'Les attelles de pouce et de poignet',
    desc: 'En haut, l’attelle de pouce : une bande d’écorce de bouleau trempée chaude, moulée autour du pouce et le long du bord du poignet côté pouce, laissée sécher en place, le pouce écarté comme pour tenir un verre ; coupe au pouce, où l’écorce fait le tour, et au poignet, où elle couvre le bord. En bas, l’attelle de poignet de la nuit : une latte de bois mince sous l’avant-bras et la paume, le poignet droit, tenue par une bande en tours sur l’avant-bras et autour de la paume, vue du dos de la main et du côté du pouce ; coupe de l’avant-bras sur la latte, puis sur une écorce moulée en gouttière.',
    format: 'pleine',
    disposition: [['pouce', 'coupesAB'], ['dessus', 'coupeD'], ['profil', 'coupeC']],
    largeurs: [[3, 1.1], [3, 1.1], [3, 1.1]],
    hauteurs: [1.18, 1.18, 0.78],
    vues: {
      // ═══ L'attelle de pouce, vue du dos ═══════════════════════════════════════════════════
      pouce: {
        titre: 'L’attelle de pouce, vue du dos de la main',
        dessin: z => {
          const g = geoDos(z), e = g.e, out = [];
          out.push(h.formes.main({ x: g.ox, y: g.oy, pose: 'appui', vue: 'dos', cote: 'gauche', angle: 180, echelle: e, bras: BRAS }));
          out.push(commissures(g));
          const tr = ecorcePouce.troncons.map(t => t.map(g.V));
          out.push(`<path d="${forme(tr)}" ${blancTrait('arete')}/>`);
          // le sens des lenticelles : en travers du membre qu'elle entoure
          out.push(lenticelles(g, ecorcePouce.contour, p => {
            if (p[0] < -96) return [0, 1];
            const s = Math.max(0, Math.min(S_FIN, lon(sub(p, P0))));
            return gau(surPouce(s).u);
          }, 2410, 70));
          TOURS_POUCE.forEach(xm => out.push(tourBande(g, xm - LARG / 2, LARG, -30.5 - OFF - 1.6, 33, 2.5)));
          // coupes A (au pouce) et B (au poignet)
          const qa = surPouce(63), na = gau(qa.u);
          const pa = g.V(add(qa.p, mul(na, 22))), pb = g.V(add(qa.p, mul(na, -22)));
          const va = uni(sub(g.V(sub(qa.p, qa.u)), g.V(qa.p)));
          out.push(traitCoupe(pb, pa, va, 'A', 'q'));
          out.push(traitCoupe(g.V([XB, 44]), g.V([XB, -44]), [-1, 0], 'B', 'q'));
          return out.join('\n');
        },
        renvois: z => {
          const g = geoDos(z);
          const q = surPouce(64);
          return [
            { n: 1, rond: g.V([-80, -72]), cible: g.V(surPouce(55).p), texte: 'écorce trempée chaude, moulée sur le pouce' },
            { n: 2, rond: g.V([-178, -52]), cible: g.V([-132, -24]), texte: 'et sur le bord du poignet, côté pouce' },
            { n: 3, rond: g.V([42, -60]), cible: g.V(surPouce(92).p), texte: 'pouce écarté comme pour tenir un verre' },
            { n: 4, rond: g.V([-196, 24]), cible: g.V([-148, 10]), texte: 'bande : l’écorce sèche en place' },
          ];
        },
      },

      // ═══ Coupes A et B ════════════════════════════════════════════════════════════════════
      coupesAB: {
        titre: 'Coupes A et B',
        dessin: z => {
          const g = geoDos(z), e = g.e, out = [];
          // B : l'avant-bras près du poignet, vu du bout des doigts ; en hauteur comme la vue du dos
          // (le côté du petit doigt en haut, le côté du pouce en bas), le dos de la main à gauche.
          const cxB = z.l * 0.3, cyB = g.oy - e * 0.5;
          // l'ovale est construit large ; on le veut haut : échange des axes
          const contB = ovale(0, 0, 31 * e, 20.5 * e, 20.5 * e, 2.3, 5).map(([x, y]) => [cxB + y, cyB - x]);
          const yEc = cyB + (-Y_ECORCE) * e;       // la gouttière couvre le bord côté pouce
          const garde = p => p[1] > yEc;
          const ec = coucheCollee(contB, garde, 2.8, e);
          out.push(bandeAutour(ec.dehors.concat(contB), e, 0.3, 1.9));
          out.push(`<path d="${fermeLisse(contB)}" ${blancTrait('arete')}/>`);
          out.push(os(cxB - 2 * e, cyB + 12 * e, 7.5 * e, 11 * e, 0));    // radius, côté pouce
          out.push(os(cxB - 1 * e, cyB - 15 * e, 6 * e, 6.5 * e, 0));     // cubitus
          out.push(`<path d="${ec.d}" ${h.a.plein}/>`);
          // A : le pouce, grossi deux fois, l'écorce qui en fait le tour et se chevauche
          const s2 = 1.8 * e, cxA = z.l * 0.7, cyA = Math.min(z.h - 16.5 * s2, g.oy + 58 * e);
          const contA = ovale(cxA, cyA, 10.8 * s2, 9.4 * s2, 9.4 * s2, 2.1, 6);
          const anneau = decale(contA, 2.2 * s2);
          out.push(`<path d="${fermeLisse(anneau)} ${fermeLisse(contA.slice().reverse())}" ${h.a.plein} fill-rule="evenodd"/>`);
          // le recouvrement : le bout de la bande passe par-dessus son début, côté paume
          const r1 = decale(contA, 2.9 * s2).slice(4, 20), r2 = decale(contA, 5.1 * s2).slice(4, 20);
          out.push(`<path d="${courbe(r1)} ${courbe(r2.slice().reverse(), false)} Z" ${h.a.plein}/>`);
          out.push(`<path d="${fermeLisse(contA)}" fill="${B}" stroke="${N}" stroke-width="1.4"/>`);
          out.push(os(cxA - 1 * s2, cyA - 1 * s2, 5 * s2, 4.2 * s2, 0));
          out.push(h.texte(cxA - 17 * s2, cyA + 4, 'A'));
          out.push(h.texte(cxB - 31 * e, cyB + 4, 'B'));
          return out.join('\n');
        },
      },

      // ═══ L'attelle de poignet, vue du dos ═════════════════════════════════════════════════
      dessus: {
        titre: 'L’attelle de poignet de la nuit, vue du dos de la main',
        dessin: z => {
          const g = geoDos(z), e = g.e, out = [];
          const L = LATTE;
          const coins = [[L.x0, -L.demi], [L.x1, -L.demi], [L.x1, L.demi], [L.x0, L.demi]];
          const ouvert = (at) => h.chemin(chaine(coins, g), at);
          out.push(poly(chaine(coins, g), h.a.blanc), ouvert(h.a.arete));
          out.push(h.formes.main({ x: g.ox, y: g.oy, pose: 'appui', vue: 'dos', cote: 'gauche', angle: 180, echelle: e, bras: BRAS }));
          out.push(commissures(g));
          out.push(ouvert(h.a.cache));
          TOURS.forEach(xm => out.push(tourBande(g, xm - LARG / 2, LARG, -L.demi - 1.6, L.demi + 1.6, 2.5)));
          // le tour de la paume : il passe entre le pouce et l'index
          out.push(poly(chaine([[-26, -45.2], [-11, -45.6], [-35, 38.5], [-50, 37.5]], g), blancTrait('arete')));
          out.push(h.ligne(...g.V(lerp([-26, -45.2], [-11, -45.6], 0.22)), ...g.V(lerp([-50, 37.5], [-35, 38.5], 0.22)), h.a.fin));
          return out.join('\n');
        },
        renvois: z => {
          const g = geoDos(z);
          return [
            { n: 5, rond: g.V([-196, -52]), cible: g.V([-196, -35]), texte: 'latte mince sous l’avant-bras et la paume' },
            { n: 6, rond: g.V([-134, -52]), cible: g.V([-133, -20]), texte: 'bande en tours sur l’avant-bras' },
            { n: 7, rond: g.V([40, -56]), cible: g.V([-22, -30]), texte: 'un tour de la paume, entre pouce et index' },
          ];
        },
      },

      // ═══ Coupe C, sur une écorce ═══════════════════════════════════════════════════════════
      coupeD: {
        titre: 'Coupe C, sur une écorce',
        dessin: z => {
          const e = ECH(z), out = [];
          const cx = z.l * 0.5, cy = z.h * 0.46;
          const cont = ovale(cx, cy, 31 * e, 22 * e, 20 * e, 2.4, 5);
          const garde = p => p[1] > cy - 4 * e;
          const ec = coucheCollee(cont, garde, 2.8, e);
          out.push(bandeAutour(ec.dehors.concat(cont), e, 0.3, 1.9));
          out.push(`<path d="${fermeLisse(cont)}" ${blancTrait('arete')}/>`);
          out.push(os(cx - 14 * e, cy + 2 * e, 7.5 * e, 5.5 * e, -15));
          out.push(os(cx + 15 * e, cy - 3 * e, 5.5 * e, 6 * e, 0));
          out.push(`<path d="${ec.d}" ${h.a.plein}/>`);
          return out.join('\n');
        },
        renvois: z => {
          const e = ECH(z), cx = z.l * 0.5, cy = z.h * 0.46;
          return [
            { n: 8, rond: [cx + 40 * e, cy + 36 * e], cible: [cx + 18 * e, cy + 20 * e], texte: 'ou une écorce moulée en gouttière' },
          ];
        },
      },

      // ═══ L'attelle de poignet, du côté du pouce ═══════════════════════════════════════════
      profil: {
        titre: 'La même, vue du côté du pouce',
        dessin: z => {
          const g = geoProfil(z), e = g.e, out = [];
          const L = LATTE, dx = 42;                // x profil = x dos + 42
          const x0 = L.x0 + dx, x1 = L.x1 + dx;
          // la latte, vue par la tranche : le fil du bois en long
          const latte = chaine([[x0, 0], [x1, 0], [x1, L.ep], [x0, L.ep]], g);
          out.push(poly(latte, h.a.blanc), h.chemin(latte, h.a.arete));
          [2.6, 5.4].forEach((y, i) => out.push(h.path(courbe(chaine([[x0 + 4, y], [x0 + 60, y + 0.4 * (i ? -1 : 1)], [x0 + 120, y], [x1 - 6 - 20 * i, y + 0.3]], g)), h.a.fin)));
          out.push(h.formes.main({ x: g.X0, y: g.y0, pose: 'appui', vue: 'profil', echelle: e, bras: BRAS, inclinaison: -2 }));
          // retouches de lecture : le bout de l'index arrondi, les deux plis de flexion du pouce
          // (sous la jointure du bout et à la base), le trait des jointures à la base des doigts
          out.push(`<path d="${courbe([[118, -12.5], [125, -12.3], [129.6, -8.4], [128.6, -3.4], [122, -0.9], [118, -1]].map(g.V))}" fill="${B}" stroke="${N}" stroke-width="1.4" stroke-linejoin="round"/>`);
          out.push(h.path(courbe([[36.5, -0.8], [35.6, -3], [35.2, -5]].map(g.V)), h.a.detail));
          out.push(h.path(courbe([[10, -0.6], [8.6, -3.2], [8.2, -5.6]].map(g.V)), h.a.detail));
          out.push(h.path(courbe([[39, -21.6], [41, -19.4], [41.6, -16.8]].map(g.V)), h.a.detail));
          // le dessus de l'avant-bras (même tube que formes.js) : pour faire passer la bande dessus
          const dessus = x => {
            if (x >= -50) { const t = Math.min(1, (x + 50) / 90); return -43 + 19.8 * t; }
            const t = Math.min(1, (-50 - x) / 110); return -26 + 3.84 * t - (17 + 5 * t);
          };
          TOURS.forEach(xm => { const xa = xm + dx - LARG / 2; out.push(tourBande(g, xa, LARG, dessus(xa + LARG / 2) - 1.6, L.ep + 1.6, 0)); });
          // le tour de la paume : visible sur le dos, puis caché derrière le pouce, puis sur la latte
          const yT = L.ep + 1.6, xg = y => 12 + 4 * (y - (dessus(12) - 1.6)) / (yT - dessus(12) + 1.6), xd = y => xg(y) + 15;
          const hautP = -21.6, basP = 0.9;            // le dessus et le dessous du pouce, là où la bande passe
          const morceau = (ya, yb, ferme) => {
            const [ya1, ya2] = ferme === 'haut' ? [dessus(xg(ya)) - 1.6, dessus(xd(ya)) - 1.6] : [ya, ya];
            const q = chaine([[xg(ya), ya1], [xd(ya), ya2], [xd(yb), yb], [xg(yb), yb]], g);
            out.push(poly(q, h.a.blanc), h.ligne(...q[0], ...q[3], h.a.arete), h.ligne(...q[1], ...q[2], h.a.arete));
            if (ferme === 'haut') out.push(h.ligne(...q[0], ...q[1], h.a.arete));
            if (ferme === 'bas') out.push(h.ligne(...q[2], ...q[3], h.a.arete));
          };
          morceau(Math.min(dessus(12), dessus(27)) - 1.6, hautP, 'haut');
          morceau(basP, yT, 'bas');
          out.push(traitCoupe(g.V([XC + dx, dessus(XC + dx) - 9]), g.V([XC + dx, L.ep + 7]), [-1, 0], 'C', 'p'));
          return out.join('\n');
        },
        renvois: z => {
          const g = geoProfil(z);
          return [
            { n: 9, rond: g.V([-8, -52]), cible: g.V([-50, -36]), texte: 'poignet droit, paume à plat sur la latte' },
          ];
        },
      },

      // ═══ Coupe C, sur la latte ═════════════════════════════════════════════════════════════
      coupeC: {
        titre: 'Coupe C',
        dessin: z => {
          const g = geoProfil(z), e = g.e, out = [];
          // alignée sur la vue du côté du pouce : le dessus de la latte à la même hauteur
          const cx = z.l * 0.5, yL = g.y0;
          const hH = 22, hB = 20, cy = yL - hB * e;
          const cont = ovale(cx, cy, 31 * e, hH * e, hB * e, 2.4, 5);
          const L = LATTE;
          const latte = [[cx - L.demi * e, yL], [cx + L.demi * e, yL], [cx + L.demi * e, yL + L.ep * e], [cx - L.demi * e, yL + L.ep * e]];
          out.push(bandeAutour(cont.concat(latte), e, 0.3, 1.9));
          out.push(poly(latte, h.a.hachure('bois', 'arete')));
          out.push(`<path d="${fermeLisse(cont)}" ${blancTrait('arete')}/>`);
          out.push(os(cx - 14 * e, cy + 2 * e, 7.5 * e, 5.5 * e, -15));
          out.push(os(cx + 15 * e, cy - 3 * e, 5.5 * e, 6 * e, 0));
          return out.join('\n');
        },
      },
    },
    danger: 'Danger — jamais de peau crue mouillée moulée autour d’un membre qui enfle : la babiche serre en séchant et fait garrot pendant la nuit. Doigts froids, pâles ou qui picotent sous l’attelle : la bande est trop serrée, on la desserre tout de suite.',
  };
};
