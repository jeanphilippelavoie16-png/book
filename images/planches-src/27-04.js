// Planche 27-04 — Le ciment temporaire (ch. 27, section 5-D, étapes 22 à 24).
// Six temps : la poudre et les gouttes sur la vitre ; la poudre tirée vers le liquide ; la
// boulette qui roule entre les doigts, et celle qui colle ; le ciment pressé dans le trou (les
// parois, puis le centre, l'excédent le long de la gencive) ; la morsure, comme avant ou trop
// haute. Les dents sont en coupe : l'os en trame de gravier, la gencive au trait, la dent en
// blanc avec la ligne de l'émail et la pulpe, le ciment en trame de terre (la même que la pâte).
// Mains simples et charte (14 octobre) : les deux bouts de doigts calqués (s09) deviennent une main entière qui
// pince (mainSimple, pince-fine de profil côté pouce), la boulette et la pâte peintes entre les pulpes. Rouge : le
// geste de rouler, le ciment pressé contre les parois (un éventail de trois flèches : un seul geste), puis au centre.
// La poudre tirée vers le liquide reste en noir (c'est la poudre qui se déplace). Pas de gris : la tranche de la
// vitre est trop mince pour une ombre.
module.exports = (h) => {
  const A = h.a, F = h.formes;
  const BL = A.blanc.split(' ')[0];
  const blanc = t => t.replace('fill="none"', BL);          // trait + fond blanc qui cache
  const r1 = v => Math.round(v * 10) / 10;
  const d = pts => pts.map((p, i) => `${i ? 'L' : 'M'}${r1(p[0])},${r1(p[1])}`).join(' ');
  const ferme = (pts, at) => h.path(d(pts) + ' Z', at);
  const ouvert = (pts, at) => h.path(d(pts), at);
  const fl = (pts) => h.fleche(d(pts));
  const geste = (pts) => h.geste(d(pts));                     // la charte : la flèche du geste, en rouge

  // Catmull-Rom → polyligne lisse
  const lisse = (P, boucle = false, n = 10) => {
    const N = P.length, out = [];
    const g = i => boucle ? P[(i + N) % N] : P[Math.max(0, Math.min(N - 1, i))];
    const m = boucle ? N : N - 1;
    for (let i = 0; i < m; i++) {
      const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      for (let k = 0; k < n; k++) {
        const t = k / n, u = 1 - t;
        out.push([u * u * u * p1[0] + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * p2[0],
          u * u * u * p1[1] + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * p2[1]]);
      }
    }
    if (!boucle) out.push(P[N - 1]);
    return out;
  };
  // tourner (degrés, sens horaire à l'écran), mettre à l'échelle k, puis poser en (tx, ty)
  const pose = (pts, ang, k, tx, ty) => {
    const c = Math.cos(ang * Math.PI / 180), s = Math.sin(ang * Math.PI / 180);
    return pts.map(([x, y]) => [tx + k * (x * c - y * s), ty + k * (x * s + y * c)]);
  };
  // rectangle aux coins arrondis, en points
  const rrect = (x0, y0, x1, y1, r) => {
    const out = [], q = (cx, cy, a0) => { for (let i = 0; i <= 4; i++) { const a = (a0 + i * 22.5) * Math.PI / 180; out.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); } };
    q(x1 - r, y0 + r, 270); q(x1 - r, y1 - r, 0); q(x0 + r, y1 - r, 90); q(x0 + r, y0 + r, 180);
    return out;
  };

  // ═══ la vitre, le tas, les gouttes, le flacon, la palette ═══════════════════════════════
  // perspective cavalière : u le long de la vitre, v vers le fond
  const scene = z => {
    const x0 = 8, y0 = z.h - 12, Lg = z.l - 84, Dg = 170;
    const P = (u, v) => [x0 + u + 0.36 * v, y0 - 0.4 * v];
    return { P, Lg, Dg, tas: P(62, 92), flaque: P(Lg - 58, 88) };
  };
  const vitre = S => {
    const { P, Lg, Dg } = S, ep = 4;
    const a = P(0, 0), b = P(Lg, 0), c = P(Lg, Dg), e = P(0, Dg);
    const out = [
      ferme([a, b, [b[0], b[1] + ep], [a[0], a[1] + ep]], blanc(A.arete)),     // la tranche avant
      ferme([b, c, [c[0], c[1] + ep], [b[0], b[1] + ep]], blanc(A.arete)),     // la tranche de droite
      ferme([a, b, c, e], blanc(A.contour)),
    ];
    for (const [u, v, l] of [[14, 150, 22], [24, 146, 36], [38, 150, 18]])     // les reflets du verre
      out.push(ouvert([P(u, v), P(u + l * 0.9, v - l)], A.fin));
    return out.join('\n');
  };
  // un tas de poudre : la base (demi-ellipse avant) et le dôme ; entame : le flanc droit raclé
  const tas = ([cx, cy], r, H, entame = false) => {
    const rx = r * 1.1, ry = r * 0.42, base = [];
    for (let t = 0; t <= 180; t += 10) base.push([cx - rx * Math.cos(t * Math.PI / 180), cy + ry * Math.sin(t * Math.PI / 180)]);
    const dessus = entame
      ? lisse([[cx + rx, cy], [cx + rx * 0.72, cy - H * 0.12], [cx + rx * 0.42, cy - H * 0.5], [cx + rx * 0.1, cy - H * 0.86], [cx - rx * 0.22, cy - H * 0.95], [cx - rx * 0.64, cy - H * 0.55], [cx - rx, cy]], false, 6)
      : lisse([[cx + rx, cy], [cx + rx * 0.62, cy - H * 0.55], [cx + rx * 0.08, cy - H], [cx - rx * 0.12, cy - H], [cx - rx * 0.62, cy - H * 0.55], [cx - rx, cy]], false, 6);
    const pts = [...base, ...dessus.slice(1)];
    return [ferme(pts, A.blanc), ferme(pts, A.hachure('neige', 'arete'))].join('\n');
  };
  // une goutte posée : une lentille bombée, avec son reflet
  const goutte = (cx, cy, r) => {
    const pts = lisse([[cx - r, cy], [cx - r * 0.7, cy - r * 0.62], [cx, cy - r * 0.8], [cx + r * 0.7, cy - r * 0.62], [cx + r, cy], [cx, cy + r * 0.38]], true, 6);
    return [ferme(pts, blanc(A.arete)),
      ouvert(lisse([[cx - r * 0.5, cy - r * 0.25], [cx - r * 0.3, cy - r * 0.55], [cx + r * 0.05, cy - r * 0.62]], false, 4), A.fin)].join('\n');
  };
  // la goutte qui tombe : une larme, la pointe en haut
  const larme = (cx, cy, r) => ferme(lisse([[cx, cy - r * 2.3], [cx + r * 0.8, cy - r * 0.4], [cx, cy + r], [cx - r * 0.8, cy - r * 0.4]], true, 6), blanc(A.arete));
  // le flacon compte-gouttes : (bx, by) le bout du bec, ang l'inclinaison, k l'échelle
  const flacon = (bx, by, ang, k) => {
    const T = pts => pose(pts, ang, k, bx, by);
    return [
      ferme(T(rrect(-13, -78, 13, -22, 5)), blanc(A.contour)),                  // le corps
      ferme(T([[-7, -22], [7, -22], [7, -14], [-7, -14]]), blanc(A.arete)),       // le bouchon
      ferme(T([[-4.5, -14], [4.5, -14], [1.6, -1.2], [0, 0], [-1.6, -1.2]]), blanc(A.arete)),   // le bec
      ouvert(T([[-13, -66], [13, -66]]), A.detail), ouvert(T([[-13, -36], [13, -36]]), A.detail),   // l'étiquette
    ].join('\n');
  };
  // la palette de bois : le bout arrondi posé en (x, y), le manche vers ang
  const palette = (x, y, ang, L, w) => {
    const pts = [];
    for (let a = -90; a <= 90; a += 22.5) pts.push([L - w / 2 + (w / 2) * Math.cos(a * Math.PI / 180), (w / 2) * Math.sin(a * Math.PI / 180)]);
    for (let a = 90; a <= 270; a += 22.5) pts.push([w / 2 + (w / 2) * Math.cos(a * Math.PI / 180), (w / 2) * Math.sin(a * Math.PI / 180)]);
    const T = p => pose(p, ang, 1, x, y);
    return [ferme(T(pts), blanc(A.contour)),
      ouvert(T([[20, -1.5], [60, -2]]), A.fin), ouvert(T([[46, 2], [96, 2.5]]), A.fin)].join('\n');
  };
  // la pâte : une flaque épaisse aux bords mous
  const pate = ([cx, cy], rx, ry) => {
    const P = [];
    for (let i = 0; i < 12; i++) {
      const t = i / 12 * 2 * Math.PI, k = 1 + 0.07 * Math.sin(3 * t) + 0.05 * Math.cos(5 * t);
      P.push([cx + rx * k * Math.cos(t), cy + ry * k * Math.sin(t)]);
    }
    const pts = lisse(P, true, 6);
    return [ferme(pts, A.blanc), ferme(pts, A.hachure('terre', 'arete'))].join('\n');
  };

  // ═══ les boulettes ══════════════════════════════════════════════════════════════════════
  const boulette = (x, y, r) => [
    h.cercle(x, y, r, blanc(A.arete)),
    ouvert(lisse([[x - r * 0.6, y + r * 0.05], [x - r * 0.45, y - r * 0.45], [x - r * 0.05, y - r * 0.62]], false, 4), A.fin),
  ].join('\n');
  // la pâte qui colle : une galette écrasée sur le bout des doigts, qui file en dessous
  const collante = (x, y, r) => {
    const P = [];
    for (let i = 0; i < 12; i++) {
      const t = i / 12 * 2 * Math.PI, k = 1 + 0.09 * Math.sin(3 * t + 0.5) + 0.05 * Math.cos(5 * t);
      P.push([x + r * 1.45 * k * Math.cos(t), y + r * 0.95 * k * Math.sin(t)]);
    }
    // un filet de pâte qui pend : une bande qui s'amincit, une goutte au bout
    const fil = (x0, x1, y1) => {
      const w0 = r * 0.22, w1 = r * 0.07, ym = (y + y1) / 2;
      const g = lisse([[x0 - w0, y + r * 0.5], [(x0 + x1) / 2 - w1 + 1, ym], [x1 - w1, y1]], false, 5);
      const dr = lisse([[x1 + w1, y1], [(x0 + x1) / 2 + w1 + 1, ym], [x0 + w0, y + r * 0.5]], false, 5);
      return [ferme([...g, ...dr], blanc(A.detail)), h.cercle(x1, y1 + r * 0.2, r * 0.24, blanc(A.detail))].join('\n');
    };
    return [
      fil(x - r * 0.5, x - r * 0.75, y + r * 2.5), fil(x + r * 0.55, x + r * 0.7, y + r * 1.9),
      ferme(lisse(P, true, 5), blanc(A.arete)),
      ouvert(lisse([[x - r * 0.7, y - r * 0.1], [x - r * 0.3, y - r * 0.45], [x + r * 0.3, y - r * 0.5]], false, 4), A.fin),
    ].join('\n');
  };

  // ═══ les dents ══════════════════════════════════════════════════════════════════════════
  // La molaire du bas, repère local : les pointes des cuspides à y = 0, le collet à y = 72,
  // les racines jusqu'à 170. E1 (indice 2) et E2 (indice 9) : les bords du trou.
  const MOL = [[-47, 12], [-30, 0], [-17, 6.5], [0, 15], [17, 6.5], [30, 0], [47, 12],
    [53, 30], [50, 48], [46, 62], [41, 72],
    [42, 105], [37, 145], [29, 170], [21, 166], [18, 132], [10, 104], [0, 98],
    [-10, 104], [-18, 132], [-21, 166], [-29, 170], [-37, 145], [-42, 105],
    [-41, 72], [-46, 62], [-50, 48], [-53, 30]];
  const NS = 10, E1 = 2, E2 = 9;
  const molPts = lisse(MOL, true, NS);                  // le point i de MOL est molPts[i * NS]
  const OCC = molPts.slice(0, 6 * NS + 1);               // la surface qui mâche, de gauche à droite
  // le plancher du trou : la paroi de gauche, le fond, la paroi de droite, la marche au collet
  const PLANCHER = lisse([MOL[E1], [-19, 20], [-12, 31], [8, 34], [25, 36], [33, 47], [36, 59], MOL[E2]], false, 8);
  const EMAIL = lisse([[-41, 71], [-46, 54], [-47, 32], [-41, 19], [-29, 11], [-15, 17], [0, 24], [15, 17], [29, 11], [41, 19], [47, 32], [46, 54], [41, 71]], false, 8);
  const PULPE = lisse([[-21, 44], [-11, 52], [0, 54], [11, 52], [21, 44], [25, 60], [22, 84], [27, 118], [28, 158],
    [26, 159], [23, 120], [13, 94], [0, 88], [-13, 94], [-23, 120], [-26, 159], [-28, 158], [-27, 118], [-22, 84], [-25, 60]], true, 6);
  // la dent du haut : ses côtés et ses racines sont ceux du bas retournés autour de y = 12,
  // sa surface qui mâche est celle du bas : les cuspides de l'une entrent dans les creux de l'autre
  const MIR = ([x, y]) => [x, 24 - y];
  const HAUT = [...OCC, ...molPts.slice(6 * NS + 1).map(MIR)];
  const EMAIL_H = lisse([[-41, -47], [-46, -30], [-47, -8], [-41, 3], [-30, -9], [-17, -2.5], [0, 6], [17, -2.5], [30, -9], [41, 3], [47, -8], [46, -30], [41, -47]], false, 8);
  const PULPE_H = PULPE.map(MIR);

  // la dent creusée : le contour suit le plancher du trou entre E1 et E2
  const creusee = [...molPts.slice(E2 * NS), ...molPts.slice(0, E1 * NS + 1), ...PLANCHER.slice(1)];
  // l'émail de la dent creusée : les morceaux qui restent hors du trou
  const emailCreuse = () => {
    const garde = ([x, y]) => !(x > -19 && y < 60), runs = [[]];
    for (const p of EMAIL) { if (garde(p)) runs[runs.length - 1].push(p); else if (runs[runs.length - 1].length) runs.push([]); }
    return runs.filter(r => r.length > 1);
  };
  // le ciment : du plancher jusqu'à la surface d'origine ; bosse : de combien il dépasse au centre
  const ciment = (bosse = 0) => {
    const surf = molPts.slice(E1 * NS, E2 * NS + 1).map(([x, y]) => {
      const b = bosse * Math.max(0, 1 - ((x - 10) / 17) ** 2);
      return [x, y - b];
    });
    return [...PLANCHER, ...surf.reverse()];
  };
  // le premier temps : une couche de ciment contre les parois, le plancher décalé vers le trou
  const doublure = ep => {
    const P = PLANCHER, off = [];
    for (let i = 0; i < P.length; i++) {
      const a = P[Math.max(0, i - 1)], b = P[Math.min(P.length - 1, i + 1)];
      const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1;
      off.push([P[i][0] + ep * dy / L, P[i][1] - ep * dx / L]);
    }
    return [...P, ...off.reverse()];
  };

  // l'os et la gencive d'une mâchoire, dans le repère de la dent du bas. Pas de trait sur les
  // côtés : la mâchoire continue au-delà de la vue. haut : retournée (y → 24 − y).
  const vague = (W, yC) => { const v = [], n = Math.round(W / 2); for (let i = 0; i <= n; i++) { const x = -W + 2 * W * i / n; v.push([x, yC + 2.4 * Math.sin(x / 7)]); } return v; };
  const machoire = (T, W, yC, haut = false) => {
    const M = haut ? p => T(MIR(p)) : T;
    const tr = pts => pts.map(M);
    const surfD = lisse([[46, 61], [51, 64], [57, 71], [65, 77], [W, 80]], false, 6);
    const surfG = surfD.map(([x, y]) => [-x, y]).reverse();
    const cassure = vague(W, yC);
    return [
      ferme(tr([[-W, 90], [W, 90], ...cassure.slice().reverse()]), A.hachure('gravier', 'aucun')),   // l'os
      ferme(tr([...surfG, ...surfD, [W, 92], [-W, 92]]), A.blanc),                                   // la gencive
      ouvert(tr(surfG), A.arete), ouvert(tr(surfD), A.arete),
      ouvert(tr([[-W, 92], [-50, 90], [-44, 84]]), A.detail), ouvert(tr([[W, 92], [50, 90], [44, 84]]), A.detail),   // l'os sous la gencive
      ouvert(tr(cassure), A.arete),
    ].join('\n');
  };

  // la vue du ciment posé : repère et largeur de mâchoire qui remplit la vue
  const YP = 138;
  const geoPose = z => {
    const s = Math.min((z.h - 3) / (YP + 3 + 14), (z.l - 6) / 110);
    return { s, W: z.l / 2 / s - 0.3, T: ([x, y]) => [z.l / 2 + s * x, z.h - 1 - s * (YP + 3 - y)] };
  };
  // la dent creusée dans sa mâchoire, les racines coupées au trait de cassure ; dessus : ce qui
  // se peint par-dessus (le ciment, les flèches)
  const dentPose = (T, W, id, dessus) => {
    const clip = `<clipPath id="${id}"><path fill="none" stroke="none" d="${d([[-W, -60], [W, -60], ...vague(W, YP).reverse()].map(T))} Z"/></clipPath>`;
    return `${clip}\n<g clip-path="url(#${id})">\n` + [
      machoire(T, W, YP),
      ferme(creusee.map(T), blanc(A.contour)),
      ...emailCreuse().map(r => ouvert(r.map(T), A.detail)),
      ferme(PULPE.map(T), A.detail),
      dessus,
    ].join('\n') + '\n</g>';
  };

  // la morsure : la molaire du bas réparée, celle du haut qui se referme ; jeu : de combien le
  // ciment trop haut tient la mâchoire du haut ouverte
  const YC = 96;
  // les deux morsures au même cadrage, assez haut pour la dent relevée de 30 du « Trop haut » (sans quoi elle
  // sortait de sa vue et cachait son titre)
  const geoMorsure = z => {
    const haut = 24 - YC - 8 - 30, bas = YC + 3;
    const s = Math.min((z.h - 2) / (bas - haut), (z.l - 6) / 110);
    return { s, W: z.l / 2 / s - 0.3, T: ([x, y]) => [z.l / 2 + s * x, z.h - 1 - s * (bas - y)] };
  };
  const morsure = (z, jeu, id) => {
    const { T, W } = geoMorsure(z), Tj = ([x, y]) => T([x, y - jeu]);
    const bas = vague(W, YC), haut = vague(W, YC).map(MIR).map(([x, y]) => [x, y - jeu]);
    const clip = `<clipPath id="${id}"><path fill="none" stroke="none" d="${d([...bas, ...haut.reverse()].map(T))} Z"/></clipPath>`;
    const contenu = [
      machoire(T, W, YC), machoire(Tj, W, YC, true),
      ferme(molPts.map(T), blanc(A.contour)), ouvert(EMAIL.map(T), A.detail), ferme(PULPE.map(T), A.detail),
      ferme(ciment(jeu).map(T), A.hachure('terre', 'arete')),
      ferme(HAUT.map(Tj), blanc(A.contour)), ouvert(EMAIL_H.map(Tj), A.detail), ferme(PULPE_H.map(Tj), A.detail),
    ].join('\n');
    return `${clip}\n<g clip-path="url(#${id})">\n${contenu}\n</g>`;
  };

  // ═══ les bouts de doigts ═══════════════════════════════════════════════════════════════
  // Gros plan de côté : l'index dessus (l'ongle en haut), le pouce dessous (l'ongle en bas),
  // les pulpes face à face. Doigt local : le bout à (0, 0), le doigt vers -x, le dos à -w/2,
  // la pulpe à +w/2 ; son point le plus bombé de pulpe : PB.
  const doigt = (w, L) => {
    const C = lisse([[-L, -w * 0.5], [-w * 1.6, -w * 0.52], [-w * 0.7, -w * 0.46], [-w * 0.18, -w * 0.26], [0, w * 0.06],
      [-w * 0.2, w * 0.42], [-w * 0.75, w * 0.58], [-w * 1.5, w * 0.52], [-L, w * 0.5]], false, 8);
    const ongle = lisse([[-w * 1.15, -w * 0.5], [-w * 1.05, -w * 0.34], [-w * 0.55, -w * 0.3], [-w * 0.2, -w * 0.24]], false, 6);
    const lunule = lisse([[-w * 1.06, -w * 0.47], [-w * 0.93, -w * 0.38], [-w * 0.86, -w * 0.48]], false, 4);
    const pliP = lisse([[-w * 1.95, w * 0.52], [-w * 1.85, w * 0.3], [-w * 1.88, w * 0.12]], false, 4);
    const pliP2 = lisse([[-w * 2.1, w * 0.51], [-w * 2.02, w * 0.36]], false, 2);
    const pliD = lisse([[-w * 2.0, -w * 0.5], [-w * 1.9, -w * 0.4], [-w * 1.8, -w * 0.5]], false, 4);
    const pliD2 = lisse([[-w * 2.15, -w * 0.5], [-w * 2.05, -w * 0.42], [-w * 1.95, -w * 0.49]], false, 4);
    return { C, traits: [[ongle, A.arete], [lunule, A.fin], [pliP, A.detail], [pliP2, A.fin], [pliD, A.fin], [pliD2, A.fin]], PB: [-w * 0.45, w * 0.53] };
  };
  // pose un doigt : dessous = pouce (retourné), ang en degrés, son point de pulpe PB en (px, py)
  const poseDoigt = (D, dessous, ang, px, py) => {
    const fy = dessous ? ([x, y]) => [x, -y] : (p => p);
    const [qx, qy] = pose([fy(D.PB)], ang, 1, 0, 0)[0];
    const T = pts => pose(pts.map(fy), ang, 1, px - qx, py - qy);
    return [ferme(T(D.C), A.blanc), ouvert(T(D.C), A.contour), ...D.traits.map(([t, st]) => ouvert(T(t), st))].join('\n');
  };
  const geoDoigts = z => {
    const w = Math.min(z.h * 0.24, z.l * 0.2), R = w * 0.36;
    return { w, R, L: z.l * 0.7, bx: z.l * 0.66, by: z.h * 0.52 };
  };
  const paire = (z, ecart) => {
    const { w, L, bx, by } = geoDoigts(z), D = doigt(w, L);
    const id = 'doigts-' + Math.round(ecart * 10);
    return `<clipPath id="${id}"><rect x="0" y="0" width="${r1(z.l)}" height="${r1(z.h)}"/></clipPath>\n<g clip-path="url(#${id})">\n` +
      [poseDoigt(D, false, 9, bx + 2, by - ecart), poseDoigt(D, true, -9, bx + 2, by + ecart)].join('\n') + '\n</g>';
  };

  // La main qui pince (main simple, pince-fine de profil côté pouce, main droite) : l'index dessus, le pouce dessous,
  // les trois autres doigts repliés derrière ; la pince tombe en (bx, by), l'avant-bras sort de la vue. Les pulpes
  // sont écartées de la largeur de la boulette (10 mm, le haut de la table de pince-fine). La boulette et la pâte
  // se peignent par-dessus la main, entre les deux bouts de doigts : de profil, le pouce la cacherait.
  // r : le rayon de la boulette, à l'échelle de la main.
  const EMAIN = 1.2, D_BOUL = 10;
  const GM = z => { const bx = z.l * 0.62, by = z.h * 0.42; return { s: EMAIN, bx, by, r: 6 * EMAIN }; };
  const mainPince = z => {
    const { bx, by } = GM(z);
    return F.mainSimple({ x: bx, y: by, pose: 'pince-fine', vue: 'pouce', cote: 'droite', echelle: EMAIN, diametre: D_BOUL, angle: 25,
      avantbras: { bord: { x0: 0, y0: 0, x1: z.l, y1: z.h }, bras: { pli: 0 } } });
  };
  const dansVue = (z, id, contenu) => `<clipPath id="${id}"><rect x="0" y="0" width="${r1(z.l)}" height="${r1(z.h)}"/></clipPath>\n<g clip-path="url(#${id})">\n${contenu}\n</g>`;

  return {
    ref: '27-04',
    titre: 'Le ciment temporaire',
    desc: 'Six temps. Sur une vitre propre, un tas de poudre d’oxyde de zinc et quelques gouttes d’eugénol tombées du flacon ; la poudre tirée vers le liquide avec une palette, un peu à la fois, jusqu’à une pâte épaisse ; une boulette roulée entre le pouce et l’index, qui ne colle pas quand la pâte est prête et qui colle et file quand il manque de la poudre ; en coupe d’une molaire, le ciment pressé contre les parois du trou, puis au centre, et l’excédent enlevé le long de la gencive ; la dent du haut qui se referme sur le ciment et rencontre la dent du bas comme avant, ou qui frappe d’abord sur un ciment trop haut.',
    format: 'pleine',
    disposition: [['vitre', 'tirer'], ['bonne', 'colle'], ['parois', 'centre', 'avant', 'haut']],
    hauteurs: [1.2, 1.45, 1.75],
    vues: {
      vitre: {
        titre: 'Sur une vitre propre',
        dessin: z => {
          const S = scene(z), [gx, gy] = S.flaque;
          return [
            vitre(S), tas(S.tas, 30, 36),
            goutte(gx - 9, gy + 1, 9), goutte(gx + 8, gy - 3, 8), goutte(gx + 2, gy + 7, 7),
            larme(gx + 3, gy - 24, 3.4), flacon(gx + 9, gy - 38, 32, 0.62),
          ].join('\n');
        },
        renvois: z => {
          const S = scene(z), [tx, ty] = S.tas, [gx, gy] = S.flaque;
          return [
            { n: 1, rond: [tx - 44, ty - 44], cible: [tx - 8, ty - 16], texte: 'poudre d’oxyde de zinc' },
            { n: 2, rond: [gx - 50, gy - 38], cible: [gx - 10, gy - 3], texte: 'gouttes d’eugénol' },
            { n: 3, rond: [z.l - 12, z.h - 42], cible: S.P(S.Lg - 14, 30), texte: 'une vitre propre' },
          ];
        },
      },
      tirer: {
        titre: 'Tirer la poudre vers le liquide',
        dessin: z => {
          const S = scene(z), [tx, ty] = S.tas, [gx, gy] = S.flaque;
          const [px, py] = S.P(126, 90);
          const part = lisse([[px - 11, py + 3], [px - 7, py - 4], [px + 2, py - 5], [px + 7, py + 1], [px + 1, py + 5]], true, 5);
          return [
            vitre(S), tas([tx - 3, ty], 27, 32, true), pate([gx + 2, gy + 1], 24, 10),
            ferme(part, A.blanc), ferme(part, A.hachure('neige', 'arete')),
            palette(px + 9, py - 2, -52, 118, 13),
            fl(lisse([[tx + 22, ty - 30], [(tx + gx) / 2 - 6, ty - 46], [gx - 20, gy - 18]], false, 8)),
          ].join('\n');
        },
        renvois: z => {
          const S = scene(z), [px, py] = S.P(126, 90), [gx, gy] = S.flaque;
          return [
            { n: 4, rond: [px - 40, py + 24], cible: [px - 5, py + 2], texte: 'un peu de poudre à la fois' },
            { n: 5, rond: [z.l - 12, gy + 24], cible: [gx + 14, gy + 4], texte: 'jusqu’à une pâte épaisse' },
          ];
        },
      },
      bonne: {
        titre: 'Rouler une boulette',
        dessin: z => {
          const { bx, by, r } = GM(z), k = r * 3.2;
          const m = mainPince(z), c = [m.prise.x, m.prise.y];
          const arc = [];
          for (let a = -45; a <= 45; a += 5) arc.push([c[0] + k * Math.cos(a * Math.PI / 180), c[1] + k * Math.sin(a * Math.PI / 180)]);
          return [m.svg, boulette(c[0], c[1], r), geste(arc)].join('\n');
        },
        renvois: z => {
          const { r } = GM(z), m = mainPince(z), [bx, by] = [m.prise.x, m.prise.y];
          return [{ n: 6, rond: [z.l - 14, by - r - 44], cible: [bx + r * 0.6, by - r * 0.4], texte: 'roule sans coller : prête' }];
        },
      },
      colle: {
        titre: 'Elle colle',
        dessin: z => {
          const { r } = GM(z);
          const m = mainPince(z);
          return [m.svg, collante(m.prise.x, m.prise.y, r)].join('\n');
        },
        renvois: z => {
          const { r } = GM(z), m = mainPince(z), [bx, by] = [m.prise.x, m.prise.y];
          return [{ n: 7, rond: [z.l - 14, by + 4], cible: [bx + r * 1.4, by], texte: 'colle : ajouter de la poudre' }];
        },
      },
      parois: {
        titre: 'Presser : les parois',
        dessin: z => {
          const { T, W } = geoPose(z);
          return dentPose(T, W, 'pose-parois', [
            ferme(doublure(8).map(T), A.hachure('terre', 'arete')),
            geste([[5, 16], [-7, 19]].map(T)), geste([[12, 12], [12, 22]].map(T)), geste([[19, 15], [25, 26]].map(T)),
          ].join('\n'));
        },
        renvois: z => {
          const { T } = geoPose(z);
          return [{ n: 8, rond: T([-44, -8]), cible: T([-13, 24]), texte: 'trou sec, les parois d’abord' }];
        },
      },
      centre: {
        titre: 'Puis le centre',
        dessin: z => {
          const { T, W } = geoPose(z);
          const exces = lisse([[50, 45], [55, 52], [57, 61], [55, 68], [50, 67], [46, 62]], false, 6);
          return dentPose(T, W, 'pose-centre', [
            ferme(ciment(0).map(T), A.hachure('terre', 'arete')),
            ferme([...molPts.slice(8 * NS, E2 * NS + 1), ...exces.slice().reverse()].map(T), A.blanc),
            ferme([...molPts.slice(8 * NS, E2 * NS + 1), ...exces.slice().reverse()].map(T), A.hachure('terre', 'arete')),
            geste([[10, -12], [10, 12]].map(T)),
          ].join('\n'));
        },
        renvois: z => {
          const { T } = geoPose(z);
          return [{ n: 9, rond: T([46, 108]), cible: T([55, 62]), texte: 'enlever l’excédent à la gencive' }];
        },
      },
      avant: {
        titre: 'Refermer doucement',
        dessin: z => morsure(z, 0, 'morsure-avant'),
        renvois: z => {
          const { T } = geoMorsure(z);
          return [{ n: 10, rond: T([-40, -34]), cible: T([-30, 1]), texte: 'les dents se rencontrent' }];
        },
      },
      haut: {
        titre: 'Trop haut',
        dessin: z => morsure(z, 30, 'morsure-trop-haut'),
        renvois: z => {
          const { T } = geoMorsure(z);
          return [{ n: 11, rond: T([-40, -40]), cible: T([12, -14]), texte: 'gratter avant qu’il durcisse' }];
        },
      },
    },
    danger: 'Danger — pas de ciment sur une dent qui fait un abcès (mal tout le temps, mal au tapotement) : il enferme la pression, et le pus cherche une sortie par l’os.',
  };
};
