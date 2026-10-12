// 90-03 — Le portage (ch. 90, §5-D étapes 23 à 26 ; §9 « Porter sans courroie ni joug » et
// « La courroie de front se taille dans une peau »).
// Cotes, en mm, seulement celles du chapitre — une trentaine de centimètres entre les pagaies
// (≈ 300 mm), 5 à 10 cm de l'épaulement au plat-bord (50 à 100 mm), pièce du front d'environ
// 10 × 46 cm (≈ 100 × 460 mm), courroies de 5 à 6,4 cm (50 à 64 mm) sur environ 3 m
// (≈ 3000 mm). La longueur du canot, son creux, l'écart des traverses, la longueur des cordons
// et la hauteur du haussement d'épaules sont dessinés sans cote : le chapitre ne les donne pas.
// Passe qualité (lot 20) : courroie en bande plate et écorce en feuille sous elle (vues de
// face) ; loupe ×3 sur le bout de la traverse ; cote de largeur de courroie sortie du cuir ;
// bras du porteur en tube à bouts ronds, poing recourbé sur le plat-bord ; cotes en mm.
// Le montage, suivi comme une charge : le canot pend par deux cordons noués près des bouts de
// la traverse du centre ; les cordons montent aux tempes et passent sur le front. Épaules
// haussées, la traverse porte sur les épaules et les cordons se relâchent ; épaules relâchées,
// la traverse quitte les épaules et le canot pend au front par les cordons tendus.

module.exports = (h) => {
  const r1 = v => Math.round(v * 10) / 10;
  const pt = p => `${r1(p[0])} ${r1(p[1])}`;
  const aBlanc = h.a.blanc;

  // Courbe lisse (Catmull-Rom) par des points déjà mis à l'écran.
  function cr(pts, ferme = false) {
    const n = pts.length;
    const P = i => (ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))]);
    let d = `M ${pt(pts[0])}`;
    const fin = ferme ? n : n - 1;
    for (let i = 0; i < fin; i++) {
      const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C ${pt(c1)} ${pt(c2)} ${pt(p2)}`;
    }
    return d + (ferme ? ' Z' : '');
  }
  // Échantillonne une courbe Catmull-Rom ouverte en polyligne.
  function lisse(pts, pas = 6) {
    const n = pts.length, o = [];
    const P = i => pts[Math.max(0, Math.min(n - 1, i))];
    for (let i = 0; i < n - 1; i++) {
      const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
      for (let k = 0; k < pas; k++) {
        const t = k / pas, t2 = t * t, t3 = t2 * t;
        const c = (a, b, c_, d) => 0.5 * (2 * b + (-a + c_) * t + (2 * a - 5 * b + 4 * c_ - d) * t2 + (-a + 3 * b - 3 * c_ + d) * t3);
        o.push([c(p0[0], p1[0], p2[0], p3[0]), c(p0[1], p1[1], p2[1], p3[1])]);
      }
    }
    o.push(pts[n - 1]);
    return o;
  }
  // Un membre ou une lanière : polygone autour d'une ligne médiane, largeur par point.
  function membre(pts, ws) {
    const g = [], d = [];
    pts.forEach((p, i) => {
      const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
      const L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
      const nx = -(b[1] - a[1]) / L, ny = (b[0] - a[0]) / L;
      const w = (Array.isArray(ws) ? ws[i] : ws) / 2;
      g.push([p[0] + nx * w, p[1] + ny * w]);
      d.push([p[0] - nx * w, p[1] - ny * w]);
    });
    return g.concat(d.reverse());
  }
  // Ligne de coupure à main levée entre deux points.
  function zig(a, b, n, amp) {
    const o = [a];
    const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L;
    for (let i = 1; i < n; i++) {
      const t = i / n, s = (i % 2 ? 1 : -1) * amp;
      o.push([a[0] + dx * t + nx * s, a[1] + dy * t + ny * s]);
    }
    o.push(b);
    return o;
  }
  const forme = (pts, trait = h.a.arete) => h.path(cr(pts, true), aBlanc) + '\n' + h.path(cr(pts, true), trait);
  const poly = (pts, trait = h.a.arete) => h.chemin(pts, aBlanc, true) + '\n' + h.chemin(pts, trait, true);

  // ───────────────────────── Vue 1 : le porteur de profil ─────────────────────────
  // Monde en cm, y vers le haut, sol à 0. Le canot est décrit dans son repère (u le long,
  // v vers le haut depuis le dessous du plat-bord), pivot à la traverse du centre, nez levé.
  const TH = 4 * Math.PI / 180, XT = -9.5, YG = 144.5;
  function geomPorte(z) {
    const s = Math.min((z.l - 24) / 492, (z.h - 6) / 212);
    const ox = z.l / 2 + 9.5 * s, oy = z.h - 5;
    const P = (x, y) => [ox + x * s, oy - y * s];
    const W = (u, v) => [XT + u * Math.cos(TH) - v * Math.sin(TH), YG + u * Math.sin(TH) + v * Math.cos(TH)];
    const C = (u, v) => P(...W(u, v));
    return { s, P, W, C };
  }
  const vQuille = u => 35 - 5 * (u / 212) ** 2;
  const vBord = u => -15 * (Math.abs(u) / 241) ** 2.2;       // dessous du plat-bord
  const vBordHaut = u => vBord(u) + 3.3;                      // dessus du plat-bord
  function bez(p0, p1, p2, p3, n = 14) {
    const o = [];
    for (let i = 0; i <= n; i++) {
      const t = i / n, m = 1 - t;
      o.push([m * m * m * p0[0] + 3 * m * m * t * p1[0] + 3 * m * t * t * p2[0] + t * t * t * p3[0],
        m * m * m * p0[1] + 3 * m * m * t * p1[1] + 3 * m * t * t * p2[1] + t * t * t * p3[1]]);
    }
    return o;
  }
  const etrave = sg => bez([212 * sg, 30], [236 * sg, 29.5], [249 * sg, 8], [241 * sg, -15]);
  const echant = (f, a, b, n) => Array.from({ length: n + 1 }, (_, i) => { const u = a + (b - a) * i / n; return [u, f(u)]; });
  const FEN = [-5, 29];          // la fenêtre ouverte dans le flanc proche
  const ENC = [-6, 5.5];         // l'entaille dans le plat-bord proche, qui montre la traverse

  // Le porteur : le pictogramme de la bibliothèque (règle 8), en marche, face au nez du canot.
  // Sa main proche saisit le plat-bord proche, derrière lui, sur le bout qui baisse.
  const MAIN = [-24, 143.4];
  const XPERS = -14;                // le sol sous le porteur, entre les pieds (cm)
  function porteur(z) {
    const { s, P, C } = geomPorte(z);
    const m = P(...MAIN);
    return h.formes.personnage({ x: P(XPERS, 0)[0], y: P(XPERS, 0)[1], pose: 'portage', penche: 6, regard: -6, echelle: s / 10,
      prises: { proche: { x: m[0], y: m[1], pose: 'prise', vue: 'dos', angle: -104, diametre: 3.3 * s },
        loin: { x: m[0] + 3 * s, y: m[1] - 0.6 * s, pose: 'prise', vue: 'dos', angle: -104, diametre: 3.3 * s } } });
  }
  function porte(z) {
    const { P, C } = geomPorte(z);
    const o = [];
    const Pm = pts => pts.map(p => P(...p));
    const Cm = pts => pts.map(p => C(...p));
    o.push(h.ligne(...P(-60, 0), ...P(60, 0), h.a.fin));
    // Le porteur, puis la courroie sur son front et le cordon noué à la traverse du centre.
    const pers = porteur(z), t = pers.tete;
    o.push(pers.toString());
    // La courroie : une bande noire qui couvre le front et file sur la tempe ; le cordon part de son
    // bout, devant l'oreille, et descend à la traverse.
    const sur = (deg, k = 1) => [t.x + t.r * k * Math.cos(deg * Math.PI / 180), t.y + t.r * k * Math.sin(deg * Math.PI / 180)];
    const haut = [-46, -38, -30, -22, -14].map(d => sur(d, 1.07));
    const bt = [t.x - 0.02 * t.r, t.y - 0.42 * t.r], hw = 0.17 * t.r;
    o.push(h.path(`M ${pt(sur(-46, 1.07))} ${cr(haut).replace(/^M [^C]*/, '')} L ${pt(sur(-14, 0.95))} L ${pt([bt[0], bt[1] + hw])} A ${r1(hw)} ${r1(hw)} 0 0 1 ${pt([bt[0], bt[1] - hw])} L ${pt(sur(-46, 0.95))} Z`, h.a.plein));
    o.push(h.path(`M ${pt(bt)} Q ${pt([bt[0] - 0.6 * t.r, bt[1] + 0.9 * t.r])} ${pt(C(0.4, 3.3))}`, h.a.arete));
    // La traverse du centre, vue en bout.
    o.push(h.chemin(Cm([[-3.25, 0.8], [3.25, 0.8], [3.25, 3.3], [-3.25, 3.3]]), h.a.plein, true));
    // Le flanc proche, ouvert d'une fenêtre sur la tête.
    const quilleA = echant(vQuille, -212, FEN[0], 30), quilleB = echant(vQuille, FEN[1], 212, 30);
    const hautA = echant(vBordHaut, -240, FEN[0], 30), hautB = echant(vBordHaut, FEN[1], 240, 30);
    // De la pointe arrière par l'étrave, la quille, la coupe, puis le haut du plat-bord.
    const flA = [[-242, vBordHaut(-240)], ...etrave(-1).slice().reverse().filter(p => p[1] > vBordHaut(-240)),
      ...quilleA, ...lisse(zig([FEN[0] - 1, vQuille(FEN[0])], [FEN[0], vBordHaut(FEN[0])], 3, 1.6), 5).slice(1),
      ...hautA.slice().reverse()];
    const flB = [...lisse(zig([FEN[1], vBordHaut(FEN[1])], [FEN[1] + 0.5, vQuille(FEN[1])], 3, 1.6), 5), ...quilleB.slice(1),
      ...etrave(1).filter(p => p[1] > vBordHaut(240)), [242, vBordHaut(240)], ...hautB.slice().reverse()];
    o.push(h.chemin(Cm(flA), aBlanc, true));
    o.push(h.chemin(Cm(flB), aBlanc, true));
    // Le plat-bord proche, en deux morceaux de part et d'autre de l'entaille.
    const bordA = echant(vBord, -241, ENC[0], 40), bordB = echant(vBord, ENC[1], 241, 40);
    const hA = echant(vBordHaut, -240, ENC[0], 40), hB = echant(vBordHaut, ENC[1], 240, 40);
    const entA = zig([ENC[0], vBord(ENC[0])], [ENC[0], vBordHaut(ENC[0])], 3, 0.6);
    const entB = zig([ENC[1], vBordHaut(ENC[1])], [ENC[1], vBord(ENC[1])], 3, 0.6);
    o.push(h.chemin(Cm([...bordA, ...entA.slice(1, -1), ...hA.slice().reverse()]), aBlanc, true));
    o.push(h.chemin(Cm([...hB, ...entB.slice(1, -1), ...bordB.slice().reverse()]), aBlanc, true));
    // Les traits du canot.
    o.push(h.chemin(Cm([...etrave(-1).slice().reverse(), ...echant(vQuille, -212, 212, 80), ...etrave(1)]), h.a.contour));
    o.push(h.chemin(Cm(bordA), h.a.contour));
    o.push(h.chemin(Cm(bordB), h.a.contour));
    o.push(h.chemin(Cm([...echant(vBordHaut, -240, ENC[0], 40)]), h.a.arete));
    o.push(h.chemin(Cm([...echant(vBordHaut, ENC[1], 240, 40)]), h.a.arete));
    o.push(h.path(cr(Cm(zig([FEN[0], vBordHaut(FEN[0])], [FEN[0] - 1, vQuille(FEN[0])], 3, 1.6))), h.a.detail));
    o.push(h.path(cr(Cm(zig([FEN[1] + 0.5, vQuille(FEN[1])], [FEN[1], vBordHaut(FEN[1])], 3, 1.6))), h.a.detail));
    o.push(h.chemin(Cm(entA), h.a.detail));
    o.push(h.chemin(Cm(entB), h.a.detail));
    // La main proche, par-dessus le plat-bord qu'elle serre : le porteur une seconde fois, découpé
    // autour de la main, au-dessus du dessous du plat-bord.
    const m = P(...MAIN), yb = C(MAIN[0] - XT, vBord(MAIN[0] - XT))[1] + 0.6;
    o.push(`<clipPath id="main-90-03"><rect x="${r1(m[0] - 20)}" y="${r1(m[1] - 20)}" width="34" height="${r1(yb - m[1] + 20)}"/></clipPath>`);
    o.push(`<g clip-path="url(#main-90-03)">${pers.toString()}</g>`);
    return o.join('\n');
  }

  // ───────────────────────── Vues 2 et 3 : de face, coupé devant le visage ─────────────────────────
  // Monde en cm, x en travers (0 au milieu), y vers le haut comme en vue 1. La coupe passe dans le
  // canot devant le visage : les plats-bords sont coupés (hachurés), la traverse du centre est
  // derrière la nuque, vue de face.
  function geomFace(z) {
    const s = Math.min((z.l - 6) / 100, (z.h - 6) / 66);
    const ox = z.l / 2, oy = z.h - 3;
    const P = (x, y) => [ox + x * s, oy - (y - 117.5) * s];
    return { s, P };
  }
  // Le porteur de face : le pictogramme de la règle 8 (tête ronde sans visage, cou court, tronc en
  // bloc arrondi, bras en bandes d'épaisseur égale), aux mesures de h.formes.personnage (tête de
  // 24,5 cm, bras de 9,2 cm de large). Haussées, le haut des épaules touche le dessous de la
  // traverse ; relâchées, il descend sous elle.
  const TETE_R = 12.25, TETE_Y = 163.5;
  const EPAULE = { hausse: 145.3, relache: 140.8 };
  function paramsFace(mode) {
    const R = mode === 'relache';
    const yG = 144.5 + (R ? -1.5 : 0);        // relâchées, le canot descend jusqu'à ce que les cordons se tendent
    const tb = yG + 0.8, tt = yG + 3.3;
    const depart = x => [x * 11.05, 168.85];
    const arrivee = x => [x * 35.5, tt + 0.3];
    const creux = 4;
    const milieu = x => { const a = depart(x), b = arrivee(x); return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2 - (R ? 0 : creux)]; };
    return { R, yG, tb, tt, depart, arrivee, milieu };
  }
  function face(z, mode) {
    const { P, s } = geomFace(z);
    const { R, yG, tb, tt, depart, arrivee, milieu } = paramsFace(mode);
    const Pm = pts => pts.map(p => P(...p));
    const o = [];
    const miroir = pts => pts.map(([x, y]) => [-x, y]);
    // La coque en coupe : l'écorce (trait fort), une membrure derrière (trait fin).
    const coque = sg => [[44 * sg, yG + 1], [46 * sg, yG + 6], [47 * sg, yG + 12], [46.2 * sg, yG + 19], [42.8 * sg, yG + 26.5], [35 * sg, yG + 32.6], [20 * sg, yG + 35.4]];
    const membr = sg => [[42.2 * sg, yG + 3.4], [44.2 * sg, yG + 7.5], [45.2 * sg, yG + 12.5], [44.5 * sg, yG + 19], [41.2 * sg, yG + 25.8], [34 * sg, yG + 31.2], [20 * sg, yG + 33.8]];
    o.push(h.path(cr(Pm([...membr(-1), [0, yG + 34.1], ...membr(1).reverse()])), h.a.detail));
    o.push(h.path(cr(Pm([...coque(-1), [0, yG + 35.8], ...coque(1).reverse()])), h.a.contour));
    // La traverse du centre, posée derrière la nuque.
    o.push(poly(Pm([[-40.6, tb], [40.6, tb], [40.6, tt], [-40.6, tt]])));
    // Le porteur, coupé sous la poitrine : le tronc, les bras qui pendent de chaque côté, le cou
    // court devant la traverse, puis la tête ronde, sans visage.
    const yS = EPAULE[mode], yC = 118.5, rB = 4.6, xB = 19;
    // une seule silhouette : du cou, l'épaule ronde, puis le dehors du bras jusqu'à la coupe ; le
    // dessous du bras (l'aisselle) se dit par un trait qui descend du creux de l'épaule
    const dehors = [[0, yS + 0.5], [5.4, yS + 0.4], [11, yS + 0.1], [16.5, yS - 0.4], [20.6, yS - 1.6], [23, yS - 4.2], [23.7, yS - 9], [23.8, yS - 16], [23.6, yC]];
    const tour = [...dehors.slice(1).map(([x, y]) => [-x, y]).reverse(), ...dehors];
    o.push(h.path(cr(Pm(tour)) + ' Z', aBlanc));
    o.push(h.path(cr(Pm(tour)), h.a.arete));
    [1, -1].forEach(sg => o.push(h.path(cr(Pm([[sg * 14.6, yS - 6.5], [sg * 14.3, yS - 10], [sg * 14.4, yS - 18], [sg * 14.6, yC]])), h.a.arete)));
    const basP = Pm(zig([24.4, yC], [-24.4, yC], 8, 0.9));
    o.push(h.chemin([...basP, [basP[basP.length - 1][0], basP[0][1] + 9], [basP[0][0], basP[0][1] + 9]], aBlanc, true));
    o.push(h.chemin(basP, h.a.detail));
    const yCou = TETE_Y - TETE_R + 1.2;
    o.push(h.chemin(Pm([[-5.2, yS - 1.2], [-5, yCou], [5, yCou], [5.2, yS - 1.2]]), aBlanc, true));
    o.push(h.ligne(...P(-5.2, yS - 0.6), ...P(-5, yCou), h.a.arete));
    o.push(h.ligne(...P(5.2, yS - 0.6), ...P(5, yCou), h.a.arete));
    o.push(h.cercle(...P(0, TETE_Y), TETE_R * s, aBlanc));
    o.push(h.cercle(...P(0, TETE_Y), TETE_R * s, h.a.arete));
    // L'écorce de bouleau : une feuille mince posée sur le front, qui dépasse un peu au-dessus et
    // au-dessous de la courroie. Puis la courroie par-dessus : une bande plate de largeur
    // constante, sur le haut du front, dont les bouts suivent le tour de la tête jusqu'aux tempes.
    const ecorce = [[-6, 165.6], [0, 165.3], [6, 165.6], [6.3, 166.3], [6.3, 172.1], [5.8, 172.8], [0, 172.6], [-5.8, 172.8], [-6.3, 172.1], [-6.3, 166.3]];
    o.push(h.chemin(Pm(ecorce), aBlanc, true));
    o.push(h.chemin(Pm(ecorce), h.a.detail, true));
    // la bande suit le tour de la tête d'une tempe à l'autre
    const yH = 171.3, yL = 166.4, bordX = y => Math.sqrt(TETE_R * TETE_R - (y - TETE_Y) ** 2);
    const ys = [yH, 170.1, 168.85, 167.6, yL];
    const ks = [-1, -0.5, 0, 0.5, 1];
    const bande = [...ks.map(k => [k * bordX(yH), yH]), ...ys.slice(1, -1).map(y => [bordX(y), y]),
      ...ks.slice().reverse().map(k => [k * bordX(yL), yL]), ...ys.slice(1, -1).reverse().map(y => [-bordX(y), y])];
    o.push(h.chemin(Pm(bande), aBlanc, true));
    o.push(h.chemin(Pm(bande), h.a.arete, true));
    // Les cordons : des tempes jusqu'à la traverse, près du plat-bord, où ils sont noués.
    [1, -1].forEach(sg => {
      const a = depart(sg), b = arrivee(sg);
      if (R) o.push(h.ligne(...P(...a), ...P(...b), h.a.arete));
      else {
        const m = milieu(sg);
        const c = [2 * m[0] - (a[0] + b[0]) / 2, 2 * m[1] - (a[1] + b[1]) / 2];
        o.push(h.path(`M ${pt(P(...a))} Q ${pt(P(...c))} ${pt(P(...b))}`, h.a.arete));
      }
      [-0.5, 0.5].forEach(k => o.push(h.ligne(...P(sg * (35.5 + k * 1.3) - 0.4, tb - 0.4), ...P(sg * (35.5 + k * 1.3) + 0.4, tt + 0.4), h.a.arete)));
    });
    // Les plats-bords coupés : lisse intérieure et lisse extérieure, l'écorce entre les deux.
    [1, -1].forEach(sg => {
      const lx = sg > 0 ? 40.6 : -43.7, ex = sg > 0 ? 44.3 : -46.4;
      o.push(h.rect(...P(lx, yG + 3.3), 3.1 * s, 3.3 * s, h.a.hachure('bois')));
      o.push(h.rect(...P(ex, yG + 3.0), 2.1 * s, 2.7 * s, h.a.hachure('bois')));
    });
    // Le geste des épaules.
    o.push(h.fleche(R ? `M ${pt(P(-30, 137))} L ${pt(P(-30, 125))}` : `M ${pt(P(-30, 125))} L ${pt(P(-30, 137))}`));
    return o.join('\n');
  }

  // ───────────────────────── Vue 4 : deux pagaies liées, vu de dessus, et le bout de près ─────────────────────────
  // Monde en cm, x en travers, y le long du canot (négatif vers le nez, en haut de la vue).
  // Le canot est à l'endroit, pagaies liées ; retourné, elles passent sous les traverses et
  // leurs manches se posent sur les épaules, la boucle pend jusqu'au front.
  // À gauche le plan, à droite une loupe ×3 sur le bout droit de la traverse du centre.
  const Y_AV = -54, Y_AR = 50, X_G = -63;
  function geomPlan(z) {
    const s = (z.h - 6) / (Y_AR - Y_AV + 18);
    const ox = 3 - X_G * s, oy = 3 - (Y_AV - 2) * s;
    const P = (x, y) => [ox + x * s, oy + y * s];
    return { s, P };
  }
  const LC = [29.5, 0.5], GROS = 3, R_LOUPE = 70;
  function geomLoupe(z) {
    const { s, P } = geomPlan(z);
    const r = R_LOUPE, sl = GROS * s, R = r / sl;
    const c = [z.l - 25 - r, z.h / 2];
    const Q = (x, y) => [c[0] + (x - LC[0]) * sl, c[1] + (y - LC[1]) * sl];
    return { s, P, Q, c, r, R, sl };
  }
  const bi = y => 42.5 - 0.0004 * y * y;          // bord intérieur du plat-bord
  const XE = 35, TL = 3.5, TE = 1.8;               // l'épaulement ; demi-largeurs de la traverse
  const LW = 1.5;                                   // largeur de la lanière
  // Le tour : la lanière passe par-dessus (X_TOUR), redescend en biais sous la traverse, ressort
  // du côté du nez contre l'épaulement (X_SORT) et file vers la pagaie.
  const X_TOUR = 39.1, X_SORT = 36.3;
  // La moitié droite de la boucle, du tour jusqu'au milieu (vers le nez).
  const BOUCLE_D = [[X_TOUR, -2.2], [39.3, -5], [38.2, -9.5], [34.3, -14.5], [28, -18.5], [17, -22.5], [0, -25]];
  const BOUCLE = [...BOUCLE_D.map(([x, y]) => [-x, y]), ...BOUCLE_D.slice(0, -1).reverse()];
  // Le bout qui ressort de sous la traverse, puis file sur elle jusque sous la pagaie.
  const BOUT_D = [[X_SORT, -2.25], [X_SORT, -1.1], [35.9, 0.05], [35, 0.55], [33.5, 0.6], [24, 0.6], [18, 0.6], [13.5, 0.6]];
  function pagaie(c) {
    const g = [[-4, 47.5], [-4.6, 45.5], [-3.4, 42.5], [-1.7, 40], [-1.7, -28], [-3.4, -35], [-6.3, -41], [-7.5, -47], [-7.5, -56]];
    const d = g.map(([x, y]) => [-x, y]).reverse();
    return [...g, ...d].map(([x, y]) => [c + x, y]);
  }
  // La ligature en croix sur la pagaie : la lanière en noir ; le second brin, qui passe
  // par-dessus, est détouré de blanc pour qu'on voie le croisement.
  const croix = (c, w, Tm) => [
    h.chemin(Tm(membre([[c - 3.2, -4.6], [c + 3.2, 4.6]], w)), h.a.plein, true),
    h.chemin(Tm(membre([[c + 3.5, -5], [c - 3.5, 5]], w * 1.6)), aBlanc, true),
    h.chemin(Tm(membre([[c + 3.2, -4.6], [c - 3.2, 4.6]], w)), h.a.plein, true),
  ];
  const traverseCentre = x0 => [[-x0, -TE], [-XE, -TE], [-XE, -TL], [XE, -TL], [XE, -TE], [x0, -TE], [x0, TE], [XE, TE], [XE, TL], [-XE, TL], [-XE, TE], [-x0, TE]];
  const bandeLisse = (pts, w, pas = 6) => membre(lisse(pts, pas), w);
  // Un ruban lissé dont le début est arrondi : la lanière qui tourne sur le bord de la traverse.
  function ruban(pts0, w) {
    const pts = lisse(pts0, 8), n = pts.length, hw = w / 2;
    const nor = i => {
      const a = pts[Math.max(0, i - 1)], b = pts[Math.min(n - 1, i + 1)], L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
      return [-(b[1] - a[1]) / L, (b[0] - a[0]) / L];
    };
    const g = pts.map((p, i) => { const [nx, ny] = nor(i); return [p[0] + nx * hw, p[1] + ny * hw]; });
    const d = pts.map((p, i) => { const [nx, ny] = nor(i); return [p[0] - nx * hw, p[1] - ny * hw]; });
    const [nx, ny] = nor(0), u = [ny, -nx], p0 = pts[0], cap = [];
    for (let k = 1; k < 8; k++) {
      const t = Math.PI * k / 8;
      cap.push([p0[0] + hw * (-Math.cos(t) * nx - Math.sin(t) * u[0]), p0[1] + hw * (-Math.cos(t) * ny - Math.sin(t) * u[1])]);
    }
    return [...g, ...d.reverse(), ...cap];
  }
  function plan(z) {
    const { P, s } = geomPlan(z);
    const L = geomLoupe(z);
    const Pm = pts => pts.map(p => P(...p));
    const o = [];
    const ys = echant(y => y, Y_AV - 3, Y_AR + 3, 30).map(p => p[0]);
    // La boucle de la lanière, couchée au fond (retourné, elle pend sur le front).
    o.push(h.chemin(Pm(bandeLisse(BOUCLE, 1.7)), h.a.plein, true));
    // Les traverses : celle du centre, avec son épaulement de chaque côté, et ses deux voisines.
    o.push(poly(Pm(traverseCentre(bi(0) + 0.5))));
    [-40, 40].forEach(y => { const c = bi(y) + 0.5; o.push(poly(Pm([[-c, y - 2.5], [c, y - 2.5], [c, y + 2.5], [-c, y + 2.5]]))); });
    // Les plats-bords : lisse intérieure, lisse extérieure.
    [1, -1].forEach(sg => {
      const int = ys.map(y => [sg * bi(y), y]), ext = ys.map(y => [sg * (bi(y) + 4.6), y]);
      o.push(h.chemin(Pm([...int, ...ext.slice().reverse()]), aBlanc, true));
      o.push(h.chemin(Pm(int), h.a.arete));
      o.push(h.chemin(Pm(ys.map(y => [sg * (bi(y) + 2.7), y])), h.a.fin));
      o.push(h.chemin(Pm(ext), h.a.contour));
    });
    // La lanière : un tour sur le bout de la traverse, contre l'épaulement ; son bout file sur la
    // traverse jusqu'à la pagaie.
    [1, -1].forEach(sg => {
      o.push(h.chemin(Pm(bandeLisse(BOUT_D.map(([x, y]) => [sg * x, y]), 1.3)), h.a.plein, true));
      o.push(h.chemin(Pm(membre([[sg * X_TOUR, -2.2], [sg * X_TOUR, 2.2]], 1.3)), h.a.plein, true));
    });
    // Les pagaies, par-dessus les trois traverses, liées en croix sur celle du centre.
    [-15, 15].forEach(c => {
      o.push(forme(Pm(pagaie(c))));
      o.push(h.ligne(...P(c, -36), ...P(c, -56), h.a.fin));
      croix(c, 1.3, Pm).forEach(t => o.push(t));
    });
    // Coupures du canot, devant et derrière : ce qui dépasse est masqué jusqu'au bord de la vue.
    [[Y_AV, 0], [Y_AR, z.h]].forEach(([y, bordY]) => {
      const l = Pm(zig([-51, y], [51, y], 12, 1.1));
      o.push(h.chemin([...l, [l[l.length - 1][0], bordY], [l[0][0], bordY]], aBlanc, true));
      o.push(h.chemin(l, h.a.detail));
    });
    // Cote entre les pagaies.
    [-15, 15].forEach(c => o.push(h.ligne(...P(c, 48.5), ...P(c, 59), h.a.fin)));
    o.push(h.cote(...P(-15, 57), ...P(15, 57), '≈ 300 mm', { cote: 'dessous' }));
    // Le cercle d'appel sur le plan, et le trait qui le relie à la loupe.
    const ca = P(...LC), ra = L.R * s;
    o.push(h.cercle(...ca, ra, h.a.detail));
    const dx = L.c[0] - ca[0], dy = L.c[1] - ca[1], dl = Math.hypot(dx, dy);
    o.push(h.ligne(ca[0] + dx / dl * ra, ca[1] + dy / dl * ra, L.c[0] - dx / dl * L.r, L.c[1] - dy / dl * L.r, h.a.fin));
    o.push(loupe(z));
    return o.join('\n');
  }
  // La loupe : le bout droit de la traverse du centre, grossi trois fois. On y voit l'épaulement
  // (la marche taillée dans la traverse), le tour complet de la lanière derrière lui (dessus en
  // plein, dessous en tireté), la boucle qui part vers le nez, et le bout qui file sur la
  // traverse jusqu'à la ligature en croix de la pagaie.
  function loupe(z) {
    const { Q, c, r, R } = geomLoupe(z);
    const Qm = pts => pts.map(p => Q(...p));
    const id = 'loupe-90-03';
    const o = [];
    const x0 = LC[0] - R - 2, y0 = LC[1] - R - 2, y1 = LC[1] + R + 2;
    o.push(h.cercle(...c, r, aBlanc));
    // La traverse : pleine largeur jusqu'à l'épaulement, puis amincie jusque sous le plat-bord.
    const trav = [[x0, -TL], [XE, -TL], [XE, -TE], [bi(0) + 0.5, -TE], [bi(0) + 0.5, TE], [XE, TE], [XE, TL], [x0, TL]];
    o.push(poly(Qm(trav)));
    // Le dessous du tour, caché par la traverse : de l'arrière au nez, en biais, en tireté.
    const dessous = membre([[X_TOUR, 1.8], [X_SORT, -1.8]], LW);
    o.push(h.chemin(Qm([dessous[0], dessous[1]]), h.a.cache));
    o.push(h.chemin(Qm([dessous[3], dessous[2]]), h.a.cache));
    // Le bout qui ressort au bord de la traverse, contre l'épaulement, et file sur elle jusque
    // sous la pagaie.
    o.push(h.chemin(Qm(ruban(BOUT_D, LW)), h.a.plein, true));
    // La pagaie, couchée sur la traverse.
    o.push(poly(Qm([[13.3, y0], [16.7, y0], [16.7, y1], [13.3, y1]])));
    // La ligature en croix, par-dessus le manche et la traverse.
    croix(15, LW, Qm).forEach(t => o.push(t));
    // Le tour par-dessus la traverse, qui monte en boucle vers le nez.
    o.push(h.chemin(Qm(ruban([[X_TOUR, 2.25], [X_TOUR, 0], ...BOUCLE_D], LW)), h.a.plein, true));
    // Le plat-bord : lisse intérieure (sur le bout de la traverse), lisse extérieure.
    const ys = echant(y => y, y0, y1, 12).map(p => p[0]);
    const int = ys.map(y => [bi(y), y]), ext = ys.map(y => [bi(y) + 4.6, y]);
    o.push(h.chemin(Qm([...int, ...ext.slice().reverse()]), aBlanc, true));
    o.push(h.chemin(Qm(int), h.a.arete));
    o.push(h.chemin(Qm(ys.map(y => [bi(y) + 2.7, y])), h.a.fin));
    o.push(h.chemin(Qm(ext), h.a.contour));
    // Cote : de l'épaulement au plat-bord. Trait de rappel sous l'épaulement ; l'autre bout
    // s'arrête sur le bord du plat-bord. Le chiffre sous la ligne de cote.
    const yc = 7;
    o.push(h.ligne(...Q(XE, TL + 0.8), ...Q(XE, yc + 1.2), h.a.fin));
    const [ca, cy] = Q(XE, yc), [cb] = Q(bi(yc), yc);
    o.push(h.ligne(ca, cy, cb, cy, h.a.detail));
    o.push(h.ligne(ca, cy - 6, ca, cy + 6, h.a.detail));
    o.push(h.ligne(cb, cy - 6, cb, cy + 6, h.a.detail));
    o.push(h.texte(Q(41.4, 0)[0], cy + 15, '50 à 100 mm', { ancre: 'end', lisere: true }));
    return [`<clipPath id="${id}"><circle cx="${r1(c[0])}" cy="${r1(c[1])}" r="${r1(r)}"/></clipPath>`,
      `<g clip-path="url(#${id})">`, ...o, '</g>', h.cercle(...c, r, h.a.detail)].join('\n');
  }

  // ───────────────────────── Vue 5 : la courroie de front, à plat ─────────────────────────
  // Les courroies sont coupées pour la longueur : on n'en voit que le bout cousu et le bout libre.
  const XG_GAB = -58, XD_GAB = 42;
  function geomGab(z) {
    const s = Math.min((z.l - 8) / (XD_GAB - XG_GAB), (z.h - 6) / 30);
    const ox = 4 - XG_GAB * s, oy = z.h / 2;
    const P = (x, y) => [ox + x * s, oy + y * s];
    return { s, P };
  }
  const demi = x => 3.4 + 1.6 * (1 - (x / 23) ** 2);
  const W_C = 2.85;
  function gabarit(z) {
    const { P } = geomGab(z);
    const Pm = pts => pts.map(p => P(...p));
    const o = [];
    // La pièce du front.
    const xs = echant(x => x, -23, 23, 30).map(p => p[0]);
    const piece = [...xs.map(x => [x, -demi(x)]), ...xs.slice().reverse().map(x => [x, demi(x)])];
    o.push(poly(Pm(piece), h.a.contour));
    // Les deux courroies, cousues sur les bouts.
    [1, -1].forEach(sg => {
      const w = W_C;
      o.push(poly(Pm([[17 * sg, -w], [28 * sg, -w], [28 * sg, w], [17 * sg, w]]), h.a.arete));
      const q = [[30.5 * sg, -w], [33 * sg, -w], [36.5 * sg, -2.1], [38.6 * sg, -0.9], [39.5 * sg, 0], [38.6 * sg, 0.9], [36.5 * sg, 2.1], [33 * sg, w], [30.5 * sg, w]];
      o.push(h.chemin(Pm(q), aBlanc, true));
      o.push(h.chemin(Pm(q), h.a.arete));
      [28, 30.5].forEach(x => o.push(h.chemin(Pm(zig([x * sg, -w - 1.2], [x * sg, w + 1.2], 4, 0.5)), h.a.detail)));
      // La couture au point sellier.
      o.push(h.chemin(Pm([[17.7 * sg, -2.05], [22.3 * sg, -2.05], [22.3 * sg, 2.05], [17.7 * sg, 2.05]]), h.a.cache, true));
    });
    // Longueur de la pièce, au-dessus.
    o.push(h.ligne(...P(-23, -3.8), ...P(-23, -9.6), h.a.fin));
    o.push(h.ligne(...P(23, -3.8), ...P(23, -9.6), h.a.fin));
    o.push(h.cote(...P(-23, -8.6), ...P(23, -8.6), '≈ 460 mm'));
    // Largeur de la pièce, au milieu : la ligne de cote s'interrompt pour le chiffre.
    const [xm, ym] = P(0, 0), [, yh] = P(0, -demi(0)), [, yb] = P(0, demi(0));
    o.push(h.ligne(xm, yh, xm, ym - 7, h.a.detail), h.ligne(xm, ym + 6, xm, yb, h.a.detail));
    o.push(h.ligne(xm - 6, yh, xm + 6, yh, h.a.detail), h.ligne(xm - 6, yb, xm + 6, yb, h.a.detail));
    o.push(h.texte(xm, ym + 4, '≈ 100 mm'));
    // Longueur de la courroie, du bout cousu au bout libre, dessous à droite.
    o.push(h.ligne(...P(17, 3.4), ...P(17, 8.2), h.a.fin));
    o.push(h.ligne(...P(39.5, 1), ...P(39.5, 8.2), h.a.fin));
    o.push(h.cote(...P(17, 7.2), ...P(39.5, 7.2), '≈ 3000 mm', { cote: 'dessous' }));
    // Largeur de la courroie, hors du cuir : les bords du bout libre prolongés vers la gauche, la
    // ligne de cote entre eux au-delà de la pointe, le chiffre dessous.
    const XR = -44.3;
    [-W_C, W_C].forEach(y => o.push(h.ligne(...P(-35, y), ...P(XR - 1.4, y), h.a.fin)));
    const [xr, ya] = P(XR, -W_C), [, yr] = P(XR, W_C);
    o.push(h.ligne(xr, ya, xr, yr, h.a.detail));
    o.push(h.texte(xr, yr + 15, '50 à 64 mm'));
    return o.join('\n');
  }

  return {
    ref: '90-03',
    titre: 'Le portage',
    desc: 'Un porteur marche seul, le canot retourné sur les épaules, nez levé, la traverse du centre contre la nuque et les mains lancées vers l’arrière sur le plat-bord ; une fenêtre dans le flanc montre la courroie passée sur le front et son cordon noué à la traverse. De face, coupé devant le visage : épaules haussées, la traverse repose sur les épaules et les cordons pendent, lâches ; épaules relâchées, la traverse quitte les épaules et le canot pend au front par les cordons tendus. De l’écorce de bouleau est glissée sous la courroie. Sans courroie : deux pagaies couchées sur trois traverses, à environ 300 mm l’une de l’autre, liées en croix sur celle du centre ; la boucle de la lanière passera sur le front. Une loupe grossit trois fois le bout de la traverse du centre : la marche de l’épaulement, à 50 à 100 mm du plat-bord ; la lanière qui en fait un tour complet derrière lui (dessus en plein, dessous en tireté) et monte en boucle vers le nez ; son bout qui file sur la traverse jusqu’à la ligature en croix de la pagaie. La courroie à plat : une pièce de cuir épais d’environ 100 × 460 mm, amincie vers les bouts, et deux courroies souples de 50 à 64 mm de large sur environ 3000 mm, cousues au point sellier.',
    format: 'pleine',
    disposition: [['porte'], ['hausse', 'relache'], ['pagaies', 'gabarit']],
    hauteurs: [1.45, 1.0, 0.9],
    largeurs: [[1], [1, 1], [321, 257]],
    vues: {
      porte: {
        titre: 'Seul, la traverse du centre sur la nuque',
        dessin: z => porte(z),
        renvois: z => {
          const { P, C } = geomPorte(z);
          const t = porteur(z).tete;
          return [
            { n: 1, rond: P(-40, 196), cible: C(-1.5, 2), texte: 'traverse du centre' },
            { n: 2, rond: P(28, 199), cible: [t.x + 0.55 * t.r, t.y - 0.45 * t.r], texte: 'courroie de front' },
            { n: 3, rond: P(-75, 118), cible: P(...MAIN), texte: 'mains sur le bout qui baisse' },
          ];
        },
      },
      hausse: {
        titre: 'Épaules haussées : elles portent le canot',
        dessin: z => face(z, 'hausse'),
        renvois: z => {
          const { P } = geomFace(z);
          const { tb, milieu } = paramsFace('hausse');
          const m = milieu(1);
          return [
            { n: 4, rond: P(-25, 172), cible: P(-3.4, 172.05), texte: 'écorce de bouleau' },
            { n: 5, rond: P(31, 169), cible: [P(...m)[0], P(...m)[1] + 2], texte: 'cordon lâche' },
            { n: 6, rond: P(36, 130), cible: P(27, tb + 1.2), texte: 'traverse sur les épaules' },
          ];
        },
      },
      relache: {
        titre: 'Épaules relâchées : le canot pend au front',
        dessin: z => face(z, 'relache'),
        renvois: z => {
          const { P } = geomFace(z);
          const { tb, milieu } = paramsFace('relache');
          const m = milieu(1);
          return [
            { n: 7, rond: P(31, 169), cible: P(...m), texte: 'cordon tendu, coupé au cou' },
            { n: 8, rond: P(36, 130), cible: P(36.8, tb + 1.2), texte: 'cordon noué à la traverse' },
          ];
        },
      },
      pagaies: {
        titre: 'Sans courroie : deux pagaies liées',
        dessin: z => plan(z),
        renvois: z => {
          const { P } = geomPlan(z);
          const { Q, c, r } = geomLoupe(z);
          const xr = c[0] + r + 13;
          return [
            { n: 9, rond: P(-56, -30), cible: P(-30.9, -16.5), texte: 'boucle, sur le front' },
            { n: 10, rond: P(-56, 8), cible: P(-16.8, 2.5), texte: 'bouts liant les pagaies' },
            { n: 11, rond: P(-56, 37), cible: P(-15.5, 33), texte: 'manches sur les épaules' },
            { n: 12, rond: [xr, c[1] - 24], cible: Q(X_TOUR, 0.6), texte: 'un tour, contre l’épaulement' },
            { n: 13, rond: [xr, c[1] + 24], cible: Q(XE, 2.65), texte: 'épaulement, sinon encoche' },
          ];
        },
      },
      gabarit: {
        titre: 'La courroie de front, taillée dans une peau',
        dessin: z => gabarit(z),
        renvois: z => {
          const { P } = geomGab(z);
          return [
            { n: 14, rond: P(8, 12.4), cible: P(8, 4.4), texte: 'cuir épais, ne roule pas' },
            { n: 15, rond: P(-29.5, -10.5), cible: P(-32, -1.2), texte: 'courroie souple, amincie' },
            { n: 16, rond: P(-10, 12.4), cible: P(-19.5, 2.05), texte: 'couture au point sellier' },
          ];
        },
      },
    },
  };
};
