// Planche 24-04 — Le porte-bûches (chapitre 24, section 9, « Le porte-bûches » ; renvoyé par
// l'étape 10, « Porter contre soi, ou ne pas porter »).
// Ce que le chapitre dit et que la planche montre : un rectangle de toile épaisse ou de peau, un
// bâton glissé dans un ourlet à chaque bout pour faire deux poignées ; la brassée couchée dessus ;
// les deux poignées prises d'une main (ou des deux) ; la charge qui pend contre la jambe au lieu
// d'être serrée à bout de bras.
// Cotes : aucune. Le chapitre ne donne ni la taille de la toile, ni la profondeur de l'ourlet, ni
// le diamètre ou la longueur des bâtons. Les proportions du dessin sont celles d'un objet qui
// marche (bâtons un peu plus longs que la toile est large, bûches un peu plus longues aussi), mais
// aucune n'est écrite sur la planche.
module.exports = (h) => {
  const A = h.a;
  const F = h.formes;
  const f1 = v => Math.round(v * 10) / 10;
  const W = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const rad = d => d * Math.PI / 180;
  const pol = (c, r, a) => [c[0] + r * Math.cos(rad(a)), c[1] + r * Math.sin(rad(a))];

  // Courbe lisse (Catmull-Rom) par des points ; ferme = true pour une forme.
  const lisse = (pts, ferme = false) => {
    const n = pts.length, P = i => ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
    let d = `M${f1(pts[0][0])} ${f1(pts[0][1])}`;
    const fin = ferme ? n : n - 1;
    for (let i = 0; i < fin; i++) {
      const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C${f1(c1[0])} ${f1(c1[1])} ${f1(c2[0])} ${f1(c2[1])} ${f1(p2[0])} ${f1(p2[1])}`;
    }
    return ferme ? d + ' Z' : d;
  };
  // Un arc de cercle en points (degrés, sens de l'écran).
  const arcPts = (c, r, a0, a1, n = 24) => Array.from({ length: n + 1 }, (_, i) => pol(c, r, a0 + (a1 - a0) * i / n));
  const d = pts => pts.map((p, i) => `${i ? 'L' : 'M'}${f1(p[0])} ${f1(p[1])}`).join(' ');

  // ─── La bûche fendue, vue par le bout (bois de bout : écorce et cernes) ─────────────────
  // p : { t: 'quart' | 'demi' | 'rond', c: [x, y] (le cœur, en mm), r, a0 (début de l'arc
  // d'écorce, degrés), phi (ouverture) }. P : mm → vue ; s : unités de vue par mm.
  const bucheBout = (p, P, s) => {
    const o = [];
    if (p.t === 'rond') {
      const c = P(p.c);
      o.push(h.cercle(c[0], c[1], p.r * s, W(A.arete)));
      o.push(h.cercle(c[0], c[1], p.r * 0.86 * s, A.detail));
      o.push(h.cercle(c[0], c[1], p.r * 0.58 * s, A.fin), h.cercle(c[0], c[1], p.r * 0.3 * s, A.fin));
      o.push(h.cercle(c[0], c[1], Math.max(0.8, 2.5 * s), A.plein));
      return o.join('\n');
    }
    const phi = p.t === 'demi' ? 180 : (p.phi || 100);
    const a1 = p.a0 + phi;
    o.push(h.path(d([p.c, ...arcPts(p.c, p.r, p.a0, a1)].map(P)) + ' Z', W(A.arete)));
    o.push(h.path(d(arcPts(p.c, p.r * 0.86, p.a0 + 2, a1 - 2).map(P)), A.detail));
    for (const k of [0.3, 0.58]) o.push(h.path(d(arcPts(p.c, p.r * k, p.a0 + 3, a1 - 3, 12).map(P)), A.fin));
    return o.join('\n');
  };
  // Le contour d'une bûche vue par le bout, en mm (un polygone), et son étendue.
  const contour = p => {
    if (p.t === 'rond') return arcPts(p.c, p.r, 0, 360, 40).slice(1);
    const a1 = p.a0 + (p.t === 'demi' ? 180 : (p.phi || 100));
    // les deux faces de fente, en points serrés : une arête qui traverse une autre bûche se voit
    const rayon = (a, sens) => Array.from({ length: 9 }, (_, i) => pol(p.c, p.r * (sens > 0 ? (i + 1) / 10 : (9 - i) / 10), a));
    return [p.c, ...rayon(p.a0, 1), ...arcPts(p.c, p.r, p.a0, a1, 30), ...rayon(a1, -1)];
  };
  const etendue = p => {
    const pts = contour(p), xs = pts.map(q => q[0]), ys = pts.map(q => q[1]);
    return { x0: Math.min(...xs), x1: Math.max(...xs), y0: Math.min(...ys), y1: Math.max(...ys) };
  };
  const dans = (q, poly) => { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const a = poly[i], b = poly[j];
    if ((a[1] > q[1]) !== (b[1] > q[1]) && q[0] < (b[0] - a[0]) * (q[1] - a[1]) / (b[1] - a[1]) + a[0]) c = !c; } return c; };
  // On lâche les bûches une à une : chacune descend jusqu'à toucher le fond ou une autre, et
  // glisse de côté (jusqu'à ±glisse mm) vers la place la plus basse, comme dans une vraie brassée.
  // hors(q) : vrai si le point q sort du fond (le sol, ou le berceau de toile).
  const boite = pts => { const xs = pts.map(q => q[0]), ys = pts.map(q => q[1]); return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)]; };
  const empile = (liste, hors, glisse = 0, valide = () => true) => {
    const posees = [];
    const bute = pq => {
      if (pq.some(hors)) return true;
      const bq = boite(pq);
      return posees.some(o => o.b[0] < bq[2] && bq[0] < o.b[2] && o.b[1] < bq[3] && bq[1] < o.b[3]
        && (pq.some(x => dans(x, o.pts)) || o.pts.some(x => dans(x, pq))));
    };
    const pose = p0 => {           // la place de repos en tombant droit
      let dy = 0;
      for (const pas of [8, 1]) { while (dy < 900 && !bute(contour({ ...p0, c: [p0.c[0], p0.c[1] + dy + pas] }))) dy += pas; }
      return { ...p0, c: [p0.c[0], p0.c[1] + dy] };
    };
    for (const p0 of liste) {
      let best = null;
      for (let dx = -glisse; dx <= glisse; dx += 4) {
        const q = pose({ ...p0, c: [p0.c[0] + dx, p0.c[1]] });
        if (!valide(contour(q))) continue;
        if (!best || q.c[1] > best.c[1] + 0.5 || (Math.abs(q.c[1] - best.c[1]) <= 0.5 && Math.abs(dx) < Math.abs(best.c[0] - p0.c[0]))) best = q;
      }
      if (!best) throw new Error('empile : aucune place pour la bûche ' + JSON.stringify(p0));
      const pts = contour(best);
      posees.push({ p: best, pts, b: boite(pts) });
    }
    return posees.map(o => o.p);
  };

  // ─── Géométrie commune (mm) ─────────────────────────────────────────────────────────────
  const LT = 1000, LA = 340;          // la toile : longueur (d'un bâton à l'autre) et largeur
  const RB = 15, LB = 440;            // le bâton : rayon, longueur (il dépasse la toile)
  const XB = LT / 2 - 18;             // l'axe du bâton, dans le pli de l'ourlet
  const XC = XB - 50;                 // la couture de l'ourlet
  const XR = XB - 64;                 // le bord du rabat

  // La brassée couchée à plat (coupe A–A) : y = 0 sur la toile, le haut vers −y. Chaque bûche
  // part d'en haut (c : son cœur au départ) et descend.
  const pile = empile([
    { t: 'rond', c: [-147, -400], r: 55 },
    { t: 'quart', c: [-82, -400], r: 86, a0: -100 },
    { t: 'rond', c: [58, -400], r: 46 },
    { t: 'quart', c: [192, -400], r: 80, a0: 180 },
    { t: 'demi', c: [-44, -600], r: 52, a0: 0 },
    { t: 'rond', c: [118, -600], r: 50 },
  ], q => q[1] > -2.5, 30);
  const long = [500, 480, 530, 470, 510, 490];      // longueur de chaque bûche
  const decal = [10, -14, 0, 12, -8, 6];            // décalage le long des bâtons

  // ═══ Vue 1 : à plat, chargé — vu de dessus, et en coupe A–A ════════════════════════════
  const geoPlan = z => {
    const s = Math.min((z.l - 64) / (LT + 60), (z.h - 34) / (LB + 90 + 330));
    const cx = z.l / 2;
    const yP = 28 + (LB / 2) * s;                   // centre du plan
    const yC = yP + (LB / 2 + 90 + 290) * s;        // la toile dans la coupe
    return { s, cx, yP, yC, P: ([x, y]) => [cx + x * s, yP + y * s], C: ([x, y]) => [cx + x * s, yC + y * s] };
  };
  const plan = z => {
    const g = geoPlan(z), { s, P, C } = g, o = [];
    // ── le plan ──
    // les bâtons : cachés dans l'ourlet, visibles là où ils dépassent
    for (const sg of [-1, 1]) {
      const xa = sg * XB - RB, xb = sg * XB + RB;
      o.push(h.path(d([P([xa, -LB / 2]), P([xa, LB / 2])]) + ' ' + d([P([xb, LB / 2]), P([xb, -LB / 2])]), W(A.arete)));
      o.push(h.path(d([[xa, -LB / 2], [xb, -LB / 2]].map(P)), A.arete), h.path(d([[xa, LB / 2], [xb, LB / 2]].map(P)), A.arete));
    }
    // la toile
    o.push(h.rect(...P([-LT / 2, -LA / 2]), LT * s, LA * s, W(A.contour)));
    for (const sg of [-1, 1]) {
      // le bâton dans l'ourlet, en caché ; le bord du rabat ; la couture
      for (const xx of [sg * XB - RB, sg * XB + RB]) o.push(h.ligne(...P([xx, -LA / 2 + 4]), ...P([xx, LA / 2 - 4]), A.cache));
      o.push(h.ligne(...P([sg * XR, -LA / 2]), ...P([sg * XR, LA / 2]), A.detail));
      o.push(h.ligne(...P([sg * XC, -LA / 2 + 6]), ...P([sg * XC, LA / 2 - 6]), `${A.fin} stroke-dasharray="3 2.4"`.replace('fill="none" ', 'fill="none" ')));
    }
    // la brassée vue de dessus : les bûches du dessous d'abord
    const ordre = pile.map((p, i) => ({ p, i, e: etendue(p) })).sort((a, b) => b.e.y0 - a.e.y0);
    for (const { i, e } of ordre) {
      const y0 = -long[i] / 2 + decal[i], y1 = long[i] / 2 + decal[i];
      const w = e.x1 - e.x0, L = y1 - y0;
      o.push(h.chemin([[e.x0, y0], [e.x1, y0 + 2], [e.x1 + 2, y0 + L * 0.3], [e.x1 - 1.5, y0 + L * 0.62], [e.x1, y1], [e.x0, y1 - 2],
        [e.x0 - 2, y0 + L * 0.66], [e.x0 + 1.5, y0 + L * 0.34]].map(P), W(A.arete), true));
      for (const k of [0.3, 0.62]) o.push(h.path(lisse([[e.x0 + w * k, y0 + 18], [e.x0 + w * k + 5, (y0 + y1) / 2], [e.x0 + w * k - 3, y1 - 22]].map(P)), A.fin));
    }
    // le trait de coupe A–A
    const xm = LT / 2 + 40;
    o.push(h.ligne(...P([-xm, 0]), ...P([xm, 0]), `${A.fin} stroke-dasharray="14 3 2 3"`));
    for (const sg of [-1, 1]) {
      o.push(h.ligne(...P([sg * (LT / 2 + 10), 0]), ...P([sg * xm, 0]), A.contour));
      const q = P([sg * xm, 0]);
      o.push(h.fleche(`M${f1(q[0])} ${f1(q[1])} L${f1(q[0])} ${f1(q[1] - 16)}`, A.detail));
      o.push(h.texte(q[0] + sg * 9, q[1] - 6, 'A'));
    }
    // ── la coupe A–A ──
    // traits de rappel du plan à la coupe, aux bâtons
    for (const sg of [-1, 1]) o.push(h.ligne(...P([sg * XB, LB / 2 + 8]), ...C([sg * XB, -RB - 22]), A.fin));
    // le sol
    o.push(h.ligne(...C([-LT / 2 - 50, 2]), ...C([LT / 2 + 50, 2]), A.detail));
    // les bûches, coupées : bois de bout
    for (const p of pile) o.push(bucheBout(p, C, s));
    // la toile en coupe : elle court sur le sol, fait le tour du bâton, revient sur elle-même
    for (const sg of [-1, 1]) {
      const c = [sg * XB, -RB - 1.5];
      o.push(h.cercle(...C(c), RB * s, h.a.hachure('bois', 'arete')));
    }
    const rr = RB + 2;
    const bout = sg => {
      const c = [sg * XB, -RB - 1.5];
      return [[sg * XR, -2.5], [sg * XC, -2.5], [sg * (XB - 22), -8], [sg * (XB - 4), -c[1] * 0 - RB * 2 - 3.5], ...arcPts(c, rr, -90, sg > 0 ? 90 : -270, 14).slice(1)];
    };
    const gauche = bout(-1), droite = bout(1);
    o.push(h.path(lisse(gauche.map(C)) + ' ' + d([gauche[gauche.length - 1], droite[droite.length - 1]].map(C)).replace('M', 'M') + ' ' + lisse(droite.map(C)), A.contour));
    // le détail B
    const cb = C([-XB + 14, -RB]);
    o.push(h.cercle(cb[0], cb[1], 52 * s, `${A.fin} stroke-dasharray="4 2.5"`));
    o.push(h.texte(cb[0] - 52 * s * 0.75 - 6, cb[1] - 52 * s * 0.75 - 2, 'B'));
    return o.join('\n');
  };
  const planRenvois = z => {
    const g = geoPlan(z), { P, C } = g;
    const ih = pile.map((p, i) => [etendue(p).y0, i]).sort((a, b) => a[0] - b[0])[0][1], eh = etendue(pile[ih]);
    const xh = (eh.x0 + eh.x1) / 2;
    return [
      { n: 1, rond: [P([-350, 0])[0], 12], cible: P([-350, -LA / 2 + 60]), texte: 'toile épaisse ou peau' },
      { n: 2, rond: [P([XR + 20, 0])[0], 12], cible: P([(XR + XB) / 2 - 4, -LA / 2 + 50]), texte: 'ourlet cousu à chaque bout' },
      { n: 3, rond: P([XB + 70, LB / 2 - 20]), cible: P([XB, LB / 2 - 12]), texte: 'bâton glissé dans l’ourlet : la poignée' },
      { n: 4, rond: [P([xh, 0])[0], 12], cible: P([xh, -long[ih] / 2 + decal[ih] + 50]), texte: 'la brassée, couchée parallèle aux bâtons' },
    ];
  };

  // ═══ Vue 2 : détail B — l'ourlet, en coupe ═════════════════════════════════════════════
  const geoOurlet = z => {
    const s = Math.min((z.l - 10) / 84, z.h / 64);
    const ox = z.l / 2 - 19 * s, oy = z.h / 2 - 1 * s;
    return { s, P: ([x, y]) => [ox + x * s, oy + y * s] };
  };
  const ourlet = z => {
    const { s, P } = geoOurlet(z), o = [];
    const t = 3, rc = RB + 1 + t / 2;              // épaisseur de toile, rayon du pli
    const yT = RB + 1 + t / 2;                       // la toile du dessous
    const yR = yT - t;                               // le rabat couché dessus
    const xFin = 62, xRabat = 50;
    const bande = (dd, epais) => [
      h.path(dd, `fill="none" stroke="#1A1A1A" stroke-width="${f1(epais * s + 2.6)}" stroke-linecap="butt" stroke-linejoin="round"`),
      h.path(dd, `fill="none" stroke="#FFFFFF" stroke-width="${f1(epais * s)}" stroke-linecap="butt" stroke-linejoin="round"`),
    ].join('\n');
    // le bâton
    o.push(h.cercle(...P([0, 0]), RB * s, h.a.hachure('bois', 'arete')));
    // la toile du dessous et le pli autour du bâton
    const dessous = [[xFin, yT], [0, yT], ...arcPts([0, 0], rc, 90, 270, 30).slice(1)];
    o.push(bande(d(dessous.map(P)), t));
    // le rabat : du dessus du bâton, il redescend se coucher sur la toile
    const rabat = [[0, -rc], [8, -rc + 0.8], [15, -rc + 7], [20, yR - 4], [26, yR - 0.3], [32, yR], [xRabat, yR]];
    o.push(bande(lisse(rabat.map(P)), t));
    // les bouts : le rabat coupé net, la toile qui continue (trait de rupture)
    o.push(h.ligne(...P([xRabat, yR - t / 2 - 0.4]), ...P([xRabat, yR + t / 2]), A.arete));
    const zz = [[xFin, yT - t / 2 - 2.6], [xFin + 1.4, yT - 0.4], [xFin - 1.2, yT + 0.8], [xFin + 0.2, yT + t / 2 + 2.6]];
    o.push(h.path(d(zz.map(P)), A.fin));
    // la couture en point avant : le fil passe dessus, traverse, passe dessous, remonte
    const x0 = 29, pas = 4.6, yH = yR - t / 2 - 0.9, yB = yT + t / 2 + 0.9;
    const fil = [[x0 - 1.5, yH]];
    for (let i = 0; i < 3; i++) {
      const xa = x0 + i * pas, haut = i % 2 === 0;
      fil.push([xa, haut ? yH : yB], [xa, haut ? yB : yH]);
    }
    fil.push([x0 + 3 * pas, yB], [x0 + 3 * pas + 1.5, yB + 0.2]);
    o.push(h.path(d(fil.map(P)), `fill="none" stroke="#1A1A1A" stroke-width="1.4" stroke-linejoin="round"`));
    return o.join('\n');
  };
  const ourletRenvois = z => {
    const { P } = geoOurlet(z);
    return [
      { n: 5, rond: P([-12, -33]), cible: P([-16.5, -6.5]), texte: 'toile repliée autour du bâton' },
      { n: 6, rond: P([44, -4]), cible: P([33.6, 15.8]), texte: 'couture à travers les deux épaisseurs' },
    ];
  };

  // ═══ Vue 3 : les poignées réunies — vu par le bout des bâtons ══════════════════════════
  // La brassée en paquet au fond du berceau ; repère au centre du paquet, y vers le bas.
  const RP = 158, DP = 280;          // rayon du fond du berceau, hauteur des bâtons au-dessus de son centre
  const RH = RB + 2.2;               // la toile autour du bâton
  const cA = [-RB - 2.4, -DP], cB = [RB + 2.4, -DP];
  // la tangente extérieure commune à deux cercles, du côté sg (−1 à gauche)
  const tangente = (c1, r1, c2, r2, sg) => {
    const v = [c2[0] - c1[0], c2[1] - c1[1]], L = Math.hypot(...v), av = Math.atan2(v[1], v[0]);
    const a = av + sg * -Math.acos((r1 - r2) / L);
    return a / Math.PI * 180;
  };
  const aG = tangente(cA, RH, [0, 0], RP, -1);
  const aD0 = tangente(cB, RH, [0, 0], RP, 1), aD = aD0 < aG ? aD0 : aD0 - 360;
  const toileLevee = [pol(cA, RH, aG), ...arcPts([0, 0], RP, aG, aD, 60), pol(cB, RH, aD)];
  const yTan = pol([0, 0], RP, aG)[1];
  // au-dessus des points de tangence, la bûche doit rester entre les deux pans de toile
  const cote = (a, b, q) => { const u = [b[0] - a[0], b[1] - a[1]], L = Math.hypot(...u); return ((q[0] - a[0]) * u[1] - (q[1] - a[1]) * u[0]) / L; };
  const dansLeBerceau = q => q[1] > yTan || (cote(pol(cA, RH, aG), pol([0, 0], RP, aG), q) > 3.5 && cote(pol(cB, RH, aD), pol([0, 0], RP, aD), q) < -3.5);
  const paquet = empile([
    { t: 'rond', c: [-30, -320], r: 55 },
    { t: 'quart', c: [40, -320], r: 86, a0: -20 },
    { t: 'rond', c: [-70, -320], r: 46 },
    { t: 'quart', c: [-30, -320], r: 80, a0: 180 },
    { t: 'demi', c: [50, -320], r: 52, a0: -120 },
    { t: 'rond', c: [0, -320], r: 50 },
  ], q => q[1] > yTan && Math.hypot(q[0], q[1]) > RP - 3.5, 90, pts => pts.every(dansLeBerceau));
  const geoLeve = z => {
    const s = Math.min((z.l - 20) / (2 * RP + 60), (z.h - 12) / (DP + RP + 150));
    const ox = z.l / 2, oy = z.h - 8 - (RP + 4) * s;
    return { s, P: ([x, y]) => [ox + x * s, oy + y * s] };
  };
  const leve = z => {
    const { s, P } = geoLeve(z), o = [];
    const rh = RH;
    // les bûches
    for (const p of paquet) o.push(bucheBout(p, P, s));
    // la toile : du bâton de gauche, autour du paquet, au bâton de droite
    o.push(h.path(d(toileLevee.map(P)), A.contour));
    // les ourlets : la toile fait le tour de chaque bâton ; les bâtons coupés
    for (const c of [cA, cB]) {
      o.push(h.cercle(...P(c), rh * s, W(A.arete)));
      o.push(h.cercle(...P(c), RB * s, h.a.hachure('bois', 'arete')));
    }
    // on lève : les deux poignées ensemble
    const q = P([0, -DP - rh - 12]);
    o.push(h.fleche(`M${f1(q[0])} ${f1(q[1])} L${f1(q[0])} ${f1(q[1] - 70 * s)}`, A.arete));
    return o.join('\n');
  };
  const leveRenvois = z => {
    const { P } = geoLeve(z);
    return [
      { n: 7, rond: P([-140, -DP - 30]), cible: P([-RB - 12, -DP - 10]), texte: 'les deux poignées réunies' },
    ];
  };

  // La main : modèle s11 (poing fermé, vu de la paume) retourné, l'avant-bras qui monte ; son
  // poignet (le milieu des bords en y = 150 du modèle) tombe sur celui du personnage, les deux
  // bâtons traversent le poing. SM : pixels du modèle → unités de vue ; G : le milieu des bâtons.
  const SMP = 1.4;
  const poing = (wr, e) => { const s = SMP * e; return [wr[0] - 19 * s, wr[1] + 108 * s + 3.5 * e]; };
  const mainPoing = (G, e) => F.modele('s11', { x: G[0], y: G[1] - 3.5 * e, ancre: [68, 42], angle: 180, echelle: SMP * e,
    masquer: [[0, 150, 140, 175]] });

  // ═══ Vue 4 : porté contre la jambe ═════════════════════════════════════════════════════
  const geoPorte = z => {
    const e = (z.h - 12) / 1800, x0 = z.l * 0.44, y0 = z.h - 6;
    return { e, x0, y0, T: ([x, y]) => [x0 + x * e, y0 + y * e] };
  };
  const porte = z => {
    const g = geoPorte(z), { e, T } = g, o = [];
    o.push(h.ligne(...T([-560, 0]), ...T([760, 0]), A.arete));
    const pers = F.personnage({ x: g.x0, y: g.y0, pose: 'debout', echelle: e, mains: { proche: T([30, -760]) } });
    o.push(pers);
    // la main qui tient les deux poignées : son poignet sur celui du personnage
    const G = poing(pers.poignets.proche, e);
    const Gm = [(G[0] - g.x0) / e, (G[1] - g.y0) / e];                   // en mm, repère du personnage
    const M = ([x, y]) => T([Gm[0] + x, Gm[1] + y]);
    const rh = RB + 2.2, bas = DP + RP + 3;
    // les bouts de bûches qui dépassent de la toile, devant et derrière (le plus loin d'abord)
    const L2 = LA / 2;
    const ord = paquet.map((p, i) => ({ p, i, e: etendue(p) })).sort((a, b) => b.e.x0 - a.e.x0);
    for (const { i, e: ex } of ord) {
      for (const sg of [-1, 1]) {
        const dx = (long[i] - LA) / 2 + sg * decal[i];
        const xa = sg * (L2 - 6), xb = sg * (L2 + dx);
        const ya = DP + ex.y0, yb = DP + ex.y1, hh = yb - ya;
        o.push(h.chemin([[xa, ya], [xb, ya + 1], [xb + sg * 2, ya + hh * 0.45], [xb - sg * 1, ya + hh * 0.75], [xb, yb], [xa, yb]].map(M), W(A.arete), true));
        o.push(h.path(lisse([[xa, ya + hh * 0.3], [(xa + xb) / 2, ya + hh * 0.34], [xb - sg * 4, ya + hh * 0.3]].map(M)), A.fin));
      }
    }
    // les deux bâtons : ils dépassent la toile de chaque côté ; celui du fond un peu plus haut
    for (const dy of [-7, 0]) {
      const a = M([-LB / 2, -RB + dy]);
      o.push(h.rect(a[0], a[1], LB * e, 2 * RB * e, W(A.arete)));
    }
    // la toile qui pend : l'ourlet autour du bâton en haut, le berceau plein en bas
    const haut = -rh;
    const toile = [[-L2 + 10, haut], [L2 - 10, haut], [L2, haut + 12], [L2 - 6, DP - RP * 0.9], [L2 + 4, DP - 6],
      [L2 - 8, bas - 26], [L2 - 48, bas - 2], [0, bas + 3], [-L2 + 48, bas - 2], [-L2 + 8, bas - 26], [-L2 - 4, DP - 6],
      [-L2 + 6, DP - RP * 0.9], [-L2, haut + 12]];
    o.push(h.path(lisse(toile.map(M), true), W(A.contour)));
    // la couture de l'ourlet, et les plis de la toile tendue sur la brassée
    o.push(h.ligne(...M([-L2 + 8, rh + 34]), ...M([L2 - 8, rh + 34]), `${A.fin} stroke-dasharray="3 2.4"`));
    o.push(h.path(lisse([[-L2 + 26, DP - RP * 0.45], [0, DP - RP * 0.58], [L2 - 26, DP - RP * 0.45]].map(M)), A.fin));
    o.push(h.path(lisse([[-L2 + 40, DP + RP * 0.62], [0, DP + RP * 0.74], [L2 - 40, DP + RP * 0.62]].map(M)), A.fin));
    o.push(h.path(lisse([[-100, rh + 58], [-78, DP - RP * 0.7]].map(M)), A.fin));
    o.push(h.path(lisse([[96, rh + 58], [74, DP - RP * 0.72]].map(M)), A.fin));
    // la main, par-dessus
    o.push(mainPoing(G, e));
    g.G = G;
    return o.join('\n');
  };
  const porteRenvois = z => {
    const g = geoPorte(z), { e, T } = g;
    const pers = F.personnage({ x: g.x0, y: g.y0, pose: 'debout', echelle: e, mains: { proche: T([30, -760]) } });
    const G = poing(pers.poignets.proche, e);
    return [
      { n: 8, rond: [G[0] + 150 * e + 40, G[1] - 40], cible: [G[0] + 30 * e, G[1] - 6], texte: 'une main, bras pendant, rien à serrer' },
      { n: 9, rond: [G[0] + 150 * e + 40, G[1] + (DP + 40) * e], cible: [G[0] + 120 * e, G[1] + (DP + 40) * e], texte: 'la charge pend contre la jambe' },
    ];
  };

  return {
    ref: '24-04',
    titre: 'Le porte-bûches',
    desc: 'Un rectangle de toile épaisse ou de peau, un bâton glissé dans un ourlet cousu à chaque bout. La brassée se couche dessus, parallèle aux bâtons ; on réunit les deux poignées d’une main et la charge pend contre la jambe, dans le berceau de la toile, sans que le bras ait à la serrer.',
    format: 'pleine',
    disposition: [['plan', 'ourlet'], ['leve', 'porte']],
    hauteurs: [1, 1.25],
    largeurs: [[3, 2], [1, 1]],
    vues: {
      plan: { titre: 'À plat, chargé : vu de dessus, et en coupe A–A', dessin: plan, renvois: planRenvois },
      ourlet: { titre: 'Détail B : l’ourlet, en coupe', dessin: ourlet, renvois: ourletRenvois },
      leve: { titre: 'Les poignées réunies, vu par le bout', dessin: leve, renvois: leveRenvois },
      porte: { titre: 'Porté contre la jambe', dessin: porte, renvois: porteRenvois },
    },
  };
};
