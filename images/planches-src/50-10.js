// Planche 50-10 — Le collet de noyade du castor (chapitre 50, § 9 « Fabriquer l'engin : le collet
// de noyade »). Sans chiffre : le chapitre n'en donne aucun pour ce montage.
// Refaite à la passe qualité (lot 11) : la coupe devient deux vues au même cadrage, « Armé » et
// « Pris », recadrées de la rive au creux ; le castor (environ 1 m, queue comprise) donne l'échelle.
// Armé : la perche plantée dans la vase du creux, appuyée en biais sur l'arête de la rive ; la roche
// pend à un anneau lâche autour de la perche, posée sous le rebord de la rive ; de l'anneau, le câble
// mène à la boucle, debout dans la coulée, juste sous la surface, face à l'axe de nage (on la voit
// donc de face).
// Pris : la roche a glissé le long de la perche jusqu'au creux ; le câble, plus court que la
// profondeur, tient la bête par le cou sous l'eau.
// Plan : la hutte et sa sortie sous l'eau, la coulée jusqu'à la réserve, la perche qui la croise,
// la boucle debout en travers. Détails : l'anneau et la roche ceinturée ; la coulisse en rondelle
// pliée en S, en perspective.
module.exports = (h) => {
  const f = (v) => Math.round(v * 10) / 10;
  const blanc = (a) => a.replace('fill="none"', 'fill="#FFFFFF"');
  const sans = (a) => a.replace(/stroke="[^"]*" stroke-width="[^"]*"/, 'stroke="none"');
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const mul = (a, k) => [a[0] * k, a[1] * k];
  const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  const pt = (p) => `${f(p[0])} ${f(p[1])}`;
  // Courbe lisse (Catmull-Rom) par une suite de points.
  const lisse = (pts, ferme = false) => {
    const n = pts.length;
    const P = (i) => (ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))]);
    let d = `M ${pt(pts[0])}`;
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
      d += ` C ${pt([p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6])} ${pt([p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6])} ${pt(p2)}`;
    }
    return d + (ferme ? ' Z' : '');
  };
  const poly = (pts, ferme = false) => pts.map((p, i) => `${i ? 'L' : 'M'} ${pt(p)}`).join(' ') + (ferme ? ' Z' : '');
  // Hauteur d'un profil (polyligne) à l'abscisse x.
  const surProfil = (G, x) => {
    for (let i = 1; i < G.length; i++) if (x <= G[i][0]) return G[i - 1][1] + (G[i][1] - G[i - 1][1]) * (x - G[i - 1][0]) / (G[i][0] - G[i - 1][0]);
    return G[G.length - 1][1];
  };
  // Une roche : polygone irrégulier (demi-axes a, b) et trois arêtes de face qui partent d'un sommet.
  const FORME_ROCHE = [[-1, 0.3], [-0.97, -0.14], [-0.8, -0.56], [-0.5, -0.86], [-0.08, -1], [0.3, -0.94], [0.66, -0.74], [0.92, -0.4],
    [1, 0.04], [0.94, 0.5], [0.7, 0.84], [0.28, 1], [-0.24, 1], [-0.64, 0.9], [-0.9, 0.66]];
  const roche = (c, a, b, attr = blanc(h.a.contour), aretes = true) => {
    const q = (x, y) => [c[0] + x * a, c[1] + y * b];
    const out = [h.chemin(FORME_ROCHE.map(([x, y]) => q(x, y)), attr, true)];
    if (aretes) {
      const s = q(0.06, -0.3);
      out.push(h.path(`M ${pt(q(-0.5, -0.86))} L ${pt(s)} L ${pt(q(0.7, 0.84))} M ${pt(s)} L ${pt(q(0.92, -0.4))} M ${pt(s)} L ${pt(q(-0.64, 0.9))}`, h.a.detail));
    }
    return out.join('\n');
  };

  // ─── Les deux coupes « Armé » et « Pris » : un seul site, même cadrage ───
  const site = (z) => {
    const ys = 60;                                            // surface de l'eau
    const ang = 50 * Math.PI / 180;
    const u = [Math.cos(ang), Math.sin(ang)];                 // le long de la perche, vers le creux
    const nb = [-Math.sin(ang), Math.cos(ang)];               // de travers, côté dessous (vers le fond)
    const nh = [Math.sin(ang), -Math.cos(ang)];               // de travers, côté dessus (vers la surface)
    const demi = 4;                                           // demi-épaisseur de la perche
    const crete = [28, 41];                                   // l'arête de la rive, où la perche s'appuie
    const E = add(crete, mul(nb, -demi));                     // l'axe de la perche au droit de l'arête
    const P = (s) => [E[0] + u[0] * s, E[1] + u[1] * s];
    const yb = z.h - 30;                                      // fond du creux
    const G = [[0, 40], [18, 40], [24, 40.4], [crete[0], crete[1]],
      [25, 47], [20, 58], [16, 74], [14, 94], [14, 110],      // la berge, un peu creusée sous l'arête
      [36, 110.5], [56, 111],                                  // le replat où la roche est posée
      [60, 118], [62, 136], [70, 155], [96, 174], [126, 191], [152, 212], [176, 234], [196, 254], [212, 270],
      [226, yb - 2], [242, yb], [256, yb + 1], [268, yb - 4], [280, yb - 16], [z.l, yb - 36]];
    // La perche entre dans la vase où son axe passe sous le profil.
    let sV = 0;
    for (let s = 20; s < 600; s += 0.5) { const p = P(s); if (p[1] > surProfil(G, p[0])) { sV = s; break; } }
    const anneau = (s) => ({ c: add(P(s), mul(nb, 7)), haut: add(P(s), mul(nh, demi)), bas: add(P(s), mul(nb, 18)) });
    const sA = 26;                                            // l'anneau armé, au ras de l'eau
    const A = anneau(sA);
    const rocheA = [36, 96];                                  // pendue sous l'anneau, posée sur le replat
    const boucle = { c: [114, 90], r: 16 };
    const coul = [boucle.c[0] - 9, boucle.c[1] - 13];         // la coulisse, en haut de la boucle
    const Lc = Math.hypot(coul[0] - A.haut[0], coul[1] - A.haut[1]) * 1.06;   // longueur du câble
    // Au creux : l'anneau arrêté près du pied, la roche sur le fond, derrière la perche.
    const sF = sV - 18;
    const F = anneau(sF);
    const pV = P(sV);
    const rocheF = [pV[0] + 2, surProfil(G, pV[0] + 2) - 13];
    const gorge = add(F.haut, [-3, -Lc]);                     // le câble tendu monte droit à la gorge
    return { ys, u, nb, nh, demi, crete, E, P, yb, G, sV, anneau, sA, A, rocheA, boucle, coul, Lc, sF, F, rocheF, gorge };
  };
  // Le repère du castor pris : la gorge au bout du câble, le corps à 45°, la queue vers la surface.
  const K = 1.45, GORGE = [21, 9];
  const repereBete = (S) => {
    const a = -135 * Math.PI / 180;
    // ax : du museau vers la queue ; ay2 : vers le ventre (côté fond).
    const ax = [Math.cos(a), Math.sin(a)], ay2 = [ax[1], -ax[0]];
    const N = add(S.gorge, mul(add(mul(ax, GORGE[0]), mul(ay2, GORGE[1])), -K));
    return (p) => add(N, mul(add(mul(ax, p[0]), mul(ay2, p[1])), K));
  };

  // Le castor, de profil, en unités où le museau est à 0 et le bout de la queue à 100.
  // T : repère local → vue. x vers la queue, y vers le ventre.
  const castor = (T) => {
    const M = (pts) => pts.map(T);
    const out = [];
    const trait = h.a.arete;
    // La queue en palette, vue un peu de biais pour qu'on voie sa face : écailles en quadrillage.
    const queue = M([[70.5, -6.5], [75, -10], [82, -12.5], [90, -13], [96.5, -10.5], [100, -5.5], [99.5, -0.5], [96, 3.5], [89, 5.5], [81, 5], [75, 2.5], [71, 0.5]]);
    out.push(h.path(lisse(queue, true), blanc(trait)));
    out.push(h.path(lisse(queue, true), h.a.hachure('grillage', 'arete')));
    // L'oreille, derrière la tête : le corps en cache la base.
    out.push(h.path(lisse(M([[15, -9.5], [15.4, -13], [18, -14.4], [20.4, -12.6], [20.8, -9.6]])), blanc(trait)));
    // Le corps et la tête.
    const corps = M([[0, 0.5], [0.5, -3], [4, -6], [9, -8.8], [15, -10.6], [22, -12], [30, -15], [40, -18], [50, -19.5], [58, -18.5], [64, -15],
      [69, -10], [72, -5.5], [72.5, -1], [70, 4], [65, 9.5], [56, 13.5], [46, 15], [36, 14], [28, 11.5], [21, 9], [14, 7.5], [8, 6.8], [3.5, 5.2], [0.8, 3.4]]);
    out.push(h.path(lisse(corps, true), blanc(trait)));
    // Les incisives sous la lèvre.
    out.push(h.path(poly(M([[1.4, 3.4], [1.4, 7.6], [4.4, 7.6], [4.4, 4.8]])), blanc(h.a.detail)));
    // L'œil, la narine, la joue, le poil.
    const oeil = T([9.4, -4.4]);
    out.push(h.cercle(oeil[0], oeil[1], 1.6, h.a.plein));
    out.push(h.path(lisse(M([[1.2, -1.2], [2.6, -2.4], [3.8, -2.2]])), h.a.detail));
    out.push(h.path(lisse(M([[11, 1.2], [14.6, 3.2], [16.4, 6.6]])), h.a.fin));
    out.push(h.path([[32, -12], [39, -14.5], [46, -15.6], [53, -15.2]].map((q) => `M ${pt(T(q))} L ${pt(T([q[0] + 3, q[1] + 1.6]))}`).join(' '), h.a.fin));
    // La patte avant, repliée contre la poitrine.
    out.push(h.path(lisse(M([[26.5, 10], [24.6, 13.6], [21.6, 16.2], [18.4, 17.4], [17.6, 19.4], [19.4, 20.6], [23, 19.8], [27, 17.4], [30, 13.6], [30.6, 10.6]]), true), blanc(trait)));
    out.push(h.path(poly(M([[18.2, 18.2], [16.4, 18.6]])) + ' ' + poly(M([[18.4, 19.8], [16.8, 21]])) + ' ' + poly(M([[20.2, 20.6], [19.2, 22.2]])), h.a.detail));
    // La cuisse, puis la patte arrière, grande et palmée, qui traîne derrière.
    out.push(h.path(lisse(M([[47, -5], [55, -3.5], [60.5, 3], [61.5, 10]])), h.a.detail));
    const pied = M([[59, 10], [64, 12.2], [71, 12.8], [78, 12.2], [84.5, 11.4], [84.2, 13.6], [87.2, 14.8], [85.8, 16.8], [88, 18.6], [86.2, 20.4],
      [87.6, 22.6], [85, 23.8], [85.2, 26.2], [78.5, 24.2], [71.5, 21.6], [65, 19.2], [60.5, 16.4], [58, 13]]);
    out.push(h.path(lisse(pied, true), blanc(trait)));
    // Les bouts des orteils, séparés par la palmure.
    out.push(h.path([[[80, 12.6], [84, 12.2]], [[80.6, 15], [86.2, 15.3]], [[80.8, 17.5], [87, 18.7]], [[80.4, 19.9], [86.6, 22.4]], [[79.6, 22.2], [84.4, 25.2]]]
      .map(([a, b]) => `M ${pt(T(a))} L ${pt(T(b))}`).join(' '), h.a.fin));
    return out.join('\n');
  };

  // La perche, avec ses deux bouts : le haut qui dépasse au-dessus de la rive, le pied planté (caché).
  const perche = (S) => {
    const out = [];
    const bord = (s, k) => add(S.P(s), mul(S.nb, S.demi * k));
    const s0 = -30, s1 = S.sV, s2 = S.sV + 22;
    out.push(h.chemin([bord(s0, -1), bord(s1, -1), bord(s1, 1), bord(s0, 1)], blanc(h.a.arete), true));
    out.push(h.chemin([bord(s1, -1), bord(s2, -1), bord(s2, 1), bord(s1, 1)], h.a.cache));
    out.push(h.path(poly([S.P(s0 + 6), S.P(s1 - 8)]), h.a.fin));
    return out.join('\n');
  };
  // L'anneau, vu de côté : une ellipse autour de la perche. brin : 'derriere' ou 'devant'.
  const anneauCoupe = (S, s, brin, attr = h.a.arete) => {
    const a = S.anneau(s), pts = [];
    const t0 = brin === 'devant' ? -Math.PI / 2 : Math.PI / 2;
    for (let i = 0; i <= 24; i++) {
      const t = t0 + (i / 24) * Math.PI;
      pts.push(add(a.c, add(mul(S.nb, 11 * Math.sin(t)), mul(S.u, 4.2 * Math.cos(t)))));
    }
    return h.chemin(pts, attr);
  };
  const sol = (S, z) => {
    const out = [];
    const G = S.G;
    // L'eau, tramée de la surface au fond ; la surface coupe la berge en x0.
    let x0 = 10;
    for (let i = 4; i < 9; i++) if ((G[i][1] - S.ys) * (G[i + 1][1] - S.ys) <= 0) x0 = G[i][0] + (G[i + 1][0] - G[i][0]) * (S.ys - G[i][1]) / (G[i + 1][1] - G[i][1]);
    const sousEau = G.slice(5).filter((p) => p[1] >= S.ys);
    out.push(h.chemin([[x0, S.ys], [z.l, S.ys], ...sousEau.slice().reverse()], sans(h.a.hachure('eau')), true));
    // La terre et la vase, en hachure oblique.
    out.push(h.chemin([...G, [z.l, z.h], [0, z.h]], sans(h.a.hachure('terre')), true));
    out.push(h.chemin(G, h.a.contour));
    out.push(h.ligne(x0, S.ys, z.l, S.ys, h.a.arete));
    return out.join('\n');
  };

  return {
    ref: '50-10',
    titre: 'Le collet de noyade du castor',
    desc: 'Deux coupes de la rive au même cadrage. Armé : une perche plantée dans la vase du creux, appuyée en biais sur l’arête de la rive ; en haut, au ras de la rive, une roche pend à un anneau de câble lâche passé autour de la perche ; de l’anneau, le câble mène à la boucle, debout dans la coulée juste sous la surface, face à la bête qui nage. Pris : le castor a la boucle serrée au cou ; la roche a glissé le long de la perche jusqu’au pied, dans le creux ; le câble tendu, plus court que la profondeur, tient la tête sous l’eau. En plan, la hutte et sa sortie sous l’eau, la coulée jusqu’à la réserve de branches, la perche qui la croise et la boucle debout en travers. De près, la roche ceinturée de deux tours de câble torsadés au-dessus, l’anneau lâche autour de la perche ; puis la coulisse : une rondelle pliée en S, le bout fixe serré dans le repli, le câble courant passé de biais par le trou.',
    format: 'pleine',
    disposition: [['arme', 'pris'], ['plan', 'ancrage', 'coulisse']],
    hauteurs: [11, 10],
    largeurs: [[1, 1], [226, 150, 180]],
    vues: {
      arme: {
        titre: 'Armé',
        dessin: (z) => {
          const S = site(z), out = [sol(S, z)];
          // La roche, pendue à l'anneau par ses brins torsadés, posée sur le replat sous le rebord.
          const R = S.rocheA;
          out.push(h.path(poly([S.A.bas, [R[0] + 1, R[1] - 14]]), h.a.arete));
          out.push(roche(R, 19, 14));
          out.push(anneauCoupe(S, S.sA, 'derriere', h.a.cache));
          out.push(perche(S));
          out.push(anneauCoupe(S, S.sA, 'devant'));
          // Le câble, de l'anneau à la coulisse de la boucle.
          const c0 = S.A.haut, c1 = S.coul;
          out.push(h.path(`M ${pt(c0)} Q ${pt([(c0[0] + c1[0]) / 2 - 2, (c0[1] + c1[1]) / 2 + 9])} ${pt(c1)}`, h.a.arete));
          // La boucle, de face : la bête y entre en nageant vers nous.
          out.push(h.cercle(S.boucle.c[0], S.boucle.c[1], S.boucle.r, h.a.arete));
          out.push(h.path(poly([[c1[0] - 3, c1[1] - 1.5], [c1[0] + 2, c1[1] - 3.5], [c1[0] + 3.5, c1[1] + 1.5], [c1[0] - 1.5, c1[1] + 3.5]], true), h.a.plein));
          return out.join('\n');
        },
        renvois: (z) => {
          const S = site(z);
          const p1 = add(S.P(170), mul(S.nh, S.demi));
          return [
            { n: 1, rond: [p1[0] + 40, p1[1] - 26], cible: p1, texte: 'perche plantée en biais' },
            { n: 2, rond: [12, 150], cible: [S.rocheA[0] - 12, S.rocheA[1] + 9], texte: 'roche pendue à l’anneau' },
            { n: 3, rond: [190, 104], cible: [S.boucle.c[0] + S.boucle.r, S.boucle.c[1] + 3], texte: 'boucle debout, face à la bête' },
          ];
        },
      },

      pris: {
        titre: 'Pris',
        dessin: (z) => {
          const S = site(z), out = [sol(S, z)];
          // Où elle était : la roche et l'anneau armés, en tireté.
          const R0 = S.rocheA;
          out.push(roche(R0, 19, 14, blanc(h.a.cache), false));
          out.push(h.path(poly([S.A.bas, [R0[0] + 1, R0[1] - 14]]), h.a.cache));
          // La roche arrivée au creux, derrière la perche.
          out.push(roche(S.rocheF, 19, 14));
          out.push(h.path(poly([S.F.bas, [S.rocheF[0] - 4, S.rocheF[1] - 13]]), h.a.arete));
          out.push(anneauCoupe(S, S.sF, 'derriere', h.a.cache));
          out.push(perche(S));
          out.push(anneauCoupe(S, S.sA, 'devant', h.a.cache));
          out.push(anneauCoupe(S, S.sF, 'devant'));
          // La roche a glissé le long de la perche.
          const f0 = add(S.P(S.sA + 44), mul(S.nb, 13)), f1 = add(S.P(S.sA + 150), mul(S.nb, 13));
          out.push(h.fleche(poly([f0, f1])));
          // Le castor, la boucle serrée au cou, tenu sous l'eau par le câble tendu.
          const T = repereBete(S);
          out.push(h.path(poly([S.F.haut, S.gorge]), h.a.arete));
          out.push(castor(T));
          out.push(h.path(lisse([T([22.8, -12]), T([24, -1.5]), T([21.8, 8.6])]), h.a.arete));
          const g = S.gorge;
          out.push(h.path(poly([[g[0] - 3, g[1] - 2], [g[0] + 2.5, g[1] - 3.5], [g[0] + 3.5, g[1] + 2], [g[0] - 2, g[1] + 3.5]], true), h.a.plein));
          return out.join('\n');
        },
        renvois: (z) => {
          const S = site(z), T = repereBete(S);
          const dos = T([46, -19]);
          const mc = lerp(S.F.haut, S.gorge, 0.5);
          return [
            { n: 4, rond: [z.l - 12, z.h - 12], cible: [S.rocheF[0] + 17, S.rocheF[1] + 4], texte: 'roche glissée au creux' },
            { n: 5, rond: [dos[0] + 36, dos[1] - 22], cible: dos, texte: 'castor pris, tenu sous l’eau' },
            { n: 6, rond: [mc[0] + 28, mc[1] + 6], cible: [mc[0] + 1, mc[1]], texte: 'câble plus court que le creux' },
          ];
        },
      },

      plan: {
        titre: 'L’étang, vu de dessus',
        dessin: (z) => {
          const out = [];
          const rive = [[34, 0], [30, 44], [36, 96], [31, 140], [37, 190], [32, 232], [35, z.h]];
          // L'eau, tramée ; la terre ferme, hachurée.
          out.push(h.chemin([...rive, [z.l, z.h], [z.l, 0]], sans(h.a.hachure('eau')), true));
          out.push(h.chemin([...rive, [0, z.h], [0, 0]], sans(h.a.hachure('terre')), true));
          out.push(h.chemin(rive, h.a.contour));

          // La coulée, sous l'eau, de la sortie de la hutte à la réserve.
          const yp = 172;                                        // la perche
          const xB = 120;                                        // où la coulée croise la perche
          const coulee = `M 110 104 C 118 124 122 146 ${xB} ${yp + 4} C ${xB - 1} ${yp + 22} 126 ${yp + 36} 142 ${yp + 52} C 150 ${yp + 60} 158 ${yp + 64} 166 ${yp + 66}`;
          out.push(h.path(coulee, h.a.cache));

          // La hutte, à cheval sur la rive : un dôme de bâtons.
          const hc = [64, 62], rx = 56, ry = 48;
          const bord = [];
          for (let i = 0; i < 24; i++) {
            const t = (i / 24) * 2 * Math.PI, k = [1, 0.96, 1.03, 0.97, 1.02, 0.95][i % 6];
            bord.push([hc[0] + rx * k * Math.cos(t), hc[1] + ry * k * Math.sin(t)]);
          }
          out.push(h.path(lisse(bord, true), blanc(h.a.contour)));
          const rnd = (i) => { const x = Math.sin(i * 12.9898) * 43758.5453; return x - Math.floor(x); };
          const so = [106, 94];                                  // la sortie, dans le flanc côté étang
          const bat = [];
          let i = 0;
          for (let gy = -40; gy <= 40; gy += 8) {
            for (let gx = -50; gx <= 50; gx += 9) {
              i++;
              const cx = hc[0] + gx + (rnd(i) - 0.5) * 6, cy = hc[1] + gy + (rnd(i + 99) - 0.5) * 5;
              if (((cx - hc[0]) / (rx - 8)) ** 2 + ((cy - hc[1]) / (ry - 8)) ** 2 > 0.85) continue;
              if (Math.hypot(cx - so[0], cy - so[1]) < 18) continue;
              const a = rnd(i + 7) * Math.PI, L = 10 + rnd(i + 3) * 9;
              bat.push(`M ${f(cx - Math.cos(a) * L / 2)} ${f(cy - Math.sin(a) * L / 2)} l ${f(Math.cos(a) * L)} ${f(Math.sin(a) * L)}`);
            }
          }
          out.push(h.path(bat.join(' '), h.a.detail));
          // La sortie : une ouverture dans le flanc, côté étang, sous l'eau.
          out.push(h.path(`M ${so[0] - 13} ${so[1] + 6} Q ${so[0] - 9} ${so[1] - 12} ${so[0] + 7} ${so[1] - 10} Q ${so[0] + 10} ${so[1] + 2} ${so[0] + 2} ${so[1] + 11} Z`, h.a.plein));

          // La réserve de branches, dans l'eau profonde.
          const rv = [];
          for (let j = 0; j < 14; j++) {
            const x = 158 + (j * 37) % 50, y = 226 + (j * 23) % 38;
            const a = -0.9 + ((j * 0.47) % 1.8), L = 18 + (j % 3) * 6;
            const x2 = Math.min(z.l - 4, x + Math.cos(a) * L), y2 = y + Math.sin(a) * L * 0.6;
            rv.push(`M ${f(x)} ${f(y)} L ${f(x2)} ${f(y2)}`);
            const m = [(x + x2) / 2, (y + y2) / 2];
            rv.push(`M ${f(m[0])} ${f(m[1])} l ${f(Math.cos(a - 0.6) * 7)} ${f(Math.sin(a - 0.6) * 7)}`);
          }
          out.push(h.path(rv.join(' '), h.a.arete));

          // La perche, de la rive au creux ; la roche sous la perche, au bord ; le câble ; la boucle debout
          // en travers de la coulée, vue de dessus : de chant.
          out.push(roche([52, yp + 1], 11, 8));
          out.push(h.rect(12, yp - 3, 180, 6, blanc(h.a.arete)));
          out.push(h.path(`M 58 ${yp + 5} Q 84 ${yp + 13} ${xB - 12} ${yp + 11}`, h.a.arete));
          out.push(h.ellipse(xB, yp + 11, 12, 2.6, blanc(h.a.contour)));
          return out.join('\n');
        },
        renvois: (z) => [
          { n: 7, rond: [146, 22], cible: [100, 40], texte: 'hutte' },
          { n: 8, rond: [156, 80], cible: [110, 90], texte: 'sortie de la hutte, sous l’eau' },
          { n: 9, rond: [z.l - 14, 208], cible: [z.l - 28, 234], texte: 'réserve de branches' },
          { n: 10, rond: [170, 146], cible: [132, 182], texte: 'coulée, la boucle en travers' },
        ],
      },

      ancrage: {
        titre: 'L’anneau, de près',
        dessin: (z) => {
          const out = [];
          const ang = 24 * Math.PI / 180;
          const u = [Math.cos(ang), Math.sin(ang)], nb = [-Math.sin(ang), Math.cos(ang)];
          const O = [0, 30], C = (t) => add(O, mul(u, t));
          const e = 12;                                         // demi-épaisseur de la perche
          const bordP = (t, k) => add(C(t), mul(nb, e * k));
          const dist = (p) => (p[0] - O[0]) * nb[0] + (p[1] - O[1]) * nb[1];
          // L'anneau : un tour de câble bien plus grand que la perche ; il repose dessus et pend, avec du jeu.
          const tA = 76, Rr = 27, pr = 11;
          const cA = add(C(tA), mul(nb, Rr - e));
          const ring = (t) => add(cA, add(mul(nb, -Rr * Math.cos(t)), mul(u, pr * Math.sin(t))));
          const B = ring(Math.PI);                              // le bas de l'anneau, où ses bouts se torsadent
          // Le brin de derrière : vu sous la perche, caché (tireté) derrière elle.
          const derr = [];
          for (let i = 0; i <= 40; i++) derr.push(ring(Math.PI + (i / 40) * Math.PI));
          const vu = derr.filter((p) => dist(p) >= e - 1);
          const cache = derr.filter((p) => dist(p) < e + 1);
          out.push(h.formes.corde(vu.filter((p, i) => i % 2 === 0 || i === vu.length - 1), { ep: 3.6, debut: 'ouvert', fin: 'ouvert' }));
          // La perche, cassée aux deux bouts.
          const casse = (t, s) => {
            const a = bordP(t, -1), b = bordP(t, 1), q = [];
            for (let i = 0; i <= 4; i++) { const k = i / 4, w = (i % 2 ? 3 : -3) * s; q.push(add(lerp(a, b, k), mul(u, w))); }
            return q;
          };
          const t0 = 4, t1 = (z.l + 8) / u[0];
          out.push(h.chemin([...casse(t0, 1), ...casse(t1, -1).reverse()], blanc(h.a.arete), true));
          [-6, 0, 5].forEach((k, i) => out.push(h.path(poly([add(C(t0 + 10 + i * 7), mul(nb, k)), add(C(t1 - 12 - i * 6), mul(nb, k))]), h.a.fin)));
          out.push(h.path(poly(cache), h.a.cache));
          // Le brin de devant, par-dessus la perche.
          const devant = [];
          for (let i = 0; i <= 40; i++) devant.push(ring((i / 40) * Math.PI));
          out.push(h.formes.corde(devant.filter((p, i) => i % 2 === 0), { ep: 3.6, debut: 'ouvert', fin: 'ouvert' }));
          // Le câble vers la boucle part du bas de l'anneau.
          out.push(h.formes.corde([B, [B[0] + 18, B[1] + 9], [B[0] + 44, B[1] + 12]], { ep: 3.4, debut: 'ouvert', fin: 'fixe', torons: true }));
          // La roche, ceinturée de deux tours de câble ; les deux bouts torsadés au-dessus, jusqu'à l'anneau.
          const rc = [72, 208], ra = 62, rb = 48;
          const q = (x, y) => [rc[0] + x * ra, rc[1] + y * rb];
          const pierre = [[-1, 0.28], [-0.86, -0.4], [-0.42, -0.88], [0.16, -1], [0.7, -0.74], [1, -0.08], [0.9, 0.58], [0.36, 0.98], [-0.48, 0.92]].map(([x, y]) => q(x, y));
          const s1 = q(0.08, -0.22), s2 = q(-0.3, 0.3);
          out.push(h.chemin(pierre, blanc(h.a.contour), true));
          out.push(h.chemin([s1, pierre[5], pierre[6], pierre[7], s2], sans(h.a.hachure('bois', 'fin')), true));
          out.push(h.path(`M ${pt(pierre[2])} L ${pt(s1)} L ${pt(pierre[5])} M ${pt(s1)} L ${pt(s2)} L ${pt(pierre[0])} M ${pt(s2)} L ${pt(pierre[7])}`, h.a.detail));
          out.push(h.chemin(pierre, h.a.contour, true));
          const ceinture = (dy) => [[rc[0] - ra * 0.9, rc[1] + dy - 8], [rc[0] - ra * 0.6, rc[1] + dy + 5], [rc[0] - 4, rc[1] + dy + 10], [rc[0] + ra * 0.58, rc[1] + dy + 2], [rc[0] + ra * 0.9, rc[1] + dy - 10]];
          out.push(h.formes.corde(ceinture(-4), { ep: 3.6, debut: 'ouvert', fin: 'ouvert' }));
          out.push(h.formes.corde(ceinture(3), { ep: 3.6, debut: 'ouvert', fin: 'ouvert' }));
          const T0 = [B[0] + 3, rc[1] - rb - 8];
          out.push(h.formes.corde([[rc[0] - 13, rc[1] + 3], [rc[0] - 12, rc[1] - 22], [T0[0] - 3, T0[1] + 12], T0], { ep: 3.4, debut: 'ouvert', fin: 'ouvert' }));
          out.push(h.formes.corde([[rc[0] + 3, rc[1] + 4], [rc[0] + 1, rc[1] - 22], [T0[0] + 3, T0[1] + 12], T0], { ep: 3.4, debut: 'ouvert', fin: 'ouvert' }));
          out.push(h.formes.corde([T0, lerp(T0, B, 0.5), B], { ep: 6.5, debut: 'ouvert', fin: 'ouvert', torons: true }));
          // Le sens où tout glisse, quand la bête tire.
          const f0 = add(C(98), mul(nb, -26)), f1 = add(C(150), mul(nb, -26));
          out.push(h.fleche(poly([f0, f1])));
          return out.join('\n');
        },
        renvois: (z) => {
          const u = [Math.cos(24 * Math.PI / 180), Math.sin(24 * Math.PI / 180)], nb = [-u[1], u[0]];
          const cA = add(add([0, 30], mul(u, 76)), mul(nb, 15));
          const g = add(cA, mul(u, -11));
          return [
            { n: 11, rond: [14, 126], cible: [f(g[0] - 1), f(g[1] + 2)], texte: 'anneau lâche : du jeu' },
            { n: 12, rond: [132, 268], cible: [118, 238], texte: 'roche ceinturée, deux tours' },
          ];
        },
      },

      coulisse: {
        titre: 'La coulisse',
        dessin: (z) => {
          const out = [];
          // La rondelle pliée en S, en perspective. X vers la droite, Y en fuite, Z vers le haut.
          const R = 52, a = 0.3, al = 58 * Math.PI / 180, O = [80, 50];
          const ey = [0.5, -0.36];
          const P3 = ([X, Y, Z]) => [O[0] + R * (X + ey[0] * Y), O[1] + R * (-Z + ey[1] * Y)];
          // Un point de la rondelle à plat (u en travers des plis, v le long) → l'espace, une fois pliée.
          const plie = (uu, v) => {
            if (uu <= -a) return [uu, v, 0];
            if (uu <= a) return [-a + (uu + a) * Math.cos(al), v, -(uu + a) * Math.sin(al)];
            return [-a + 2 * a * Math.cos(al) + (uu - a), v, -2 * a * Math.sin(al)];
          };
          const V = (uu, v) => P3(plie(uu, v));
          const bordV = (uu) => Math.sqrt(Math.max(0, 1 - uu * uu));
          const face = (u0, u1) => {
            const q = [], n = 24;
            for (let i = 0; i <= n; i++) { const uu = u0 + (u1 - u0) * i / n; q.push(V(uu, -bordV(uu))); }
            for (let i = n; i >= 0; i--) { const uu = u0 + (u1 - u0) * i / n; q.push(V(uu, bordV(uu))); }
            return q;
          };
          const ul = -0.84, vl = bordV(ul);                     // le repli, roulé le long du bord gauche
          const hc = plie(0, 0);                                // le centre du trou
          const trou = P3(hc);
          const sous = P3([hc[0] - 0.24, 0, hc[2] - 0.62]);     // le câble arrive par-dessous, de biais
          const sortie = P3([hc[0] + 0.4, 0, hc[2] + 0.06]);
          const r0 = V(ul, -vl), r1 = V(ul, vl);                // le repli, de l'avant à l'arrière
          const bas = z.h - 10;
          // Le collet : du repli, le câble descend, fait la boucle et remonte au trou.
          const boucle = [[r0[0] - 3, r0[1] + 22], [14, bas - 90], [20, bas - 20], [62, bas], [110, bas - 28], [122, bas - 96], [98, sous[1] + 36], [70, sous[1] + 12], sous, trou];
          out.push(h.formes.corde(boucle, { ep: 4.6, debut: 'ouvert', fin: 'ouvert', torons: true }));
          // Les trois faces : pli du haut, âme percée (tramée : elle est de biais), pli du bas.
          out.push(h.chemin(face(-a, a), blanc(h.a.arete), true));
          out.push(h.chemin(face(-a, a), h.a.hachure('metal', 'arete'), true));
          out.push(h.chemin(face(a, 1), blanc(h.a.arete), true));
          out.push(h.chemin(face(ul, -a), blanc(h.a.arete), true));
          // L'épaisseur de la tôle, le long du bord avant.
          const rive = [];
          for (let i = 0; i <= 60; i++) { const uu = ul + (1 - ul) * i / 60; rive.push(V(uu, -bordV(uu))); }
          out.push(h.chemin([...rive, ...rive.slice().reverse().map((p) => [p[0], p[1] + 2.6])], blanc(h.a.arete), true));
          // Le câble caché derrière l'âme, jusqu'au trou ; le trou ; le câble qui en ressort par-dessus le pli du bas.
          out.push(h.path(poly([sous, trou]), h.a.cache));
          const tr = [];
          for (let i = 0; i < 36; i++) { const t = (i / 36) * 2 * Math.PI; tr.push(V(0.22 * Math.cos(t), 0.22 * Math.sin(t))); }
          out.push(h.chemin(tr, h.a.plein, true));
          out.push(h.formes.corde([trou, sortie, [z.l - 4, sortie[1] - 2]], { ep: 4.6, debut: 'ouvert', fin: 'fixe', torons: true }));
          // Le repli, roulé sur le bout fixe du câble : un petit tube le long du bord, le câble dedans.
          out.push(h.formes.corde([r1, r0], { ep: 10, debut: 'coupe', fin: 'ouvert' }));
          out.push(h.cercle(r0[0], r0[1], 5, blanc(h.a.arete)));
          out.push(h.formes.corde([r0, [r0[0] - 1, r0[1] + 10], [r0[0] - 3, r0[1] + 22]], { ep: 4.6, debut: 'ouvert', fin: 'ouvert', torons: true }));
          // Le sens où le câble file quand la bête tire.
          out.push(h.fleche(`M ${f(sortie[0] + 10)} ${f(sortie[1] - 16)} L ${f(z.l - 8)} ${f(sortie[1] - 16)}`));
          return out.join('\n');
        },
        renvois: (z) => [
          { n: 13, rond: [z.l - 14, 108], cible: [112, 84], texte: 'rondelle pliée en S' },
          { n: 14, rond: [12, 18], cible: [20, 52], texte: 'bout fixe, serré dans le repli' },
          { n: 15, rond: [46, 16], cible: [84, 58], texte: 'câble de biais dans le trou' },
        ],
      },
    },
  };
};
