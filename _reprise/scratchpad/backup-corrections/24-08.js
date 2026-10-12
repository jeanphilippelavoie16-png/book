// Planche 24-08 — L'attelle de genou : deux perches droites, une de chaque côté, de la mi-cuisse
// à au-dessus de la cheville, rembourrées là où elles touchent l'os, trois liens, la rotule libre.
// Ch. 24, section 9, « L'attelle de genou » ; les orteils sous l'attelle, tableau des signes.
//
// Jambe gauche, blessé couché sur le dos. Vue de côté prise du dehors (au-dessus) et vue de dessus
// (au-dessous), à la même échelle et alignées ; deux coupes, regardées vers le pied, au genou (A)
// et au lien sous le genou (B). Dans la vue de dessus, le dehors de la jambe est en haut ; dans les
// coupes, à gauche.
//
// Unités : millimètres de jambe d'adulte. x le long de la jambe (0 au milieu de la rotule, vers le
// pied positif) ; h la hauteur au-dessus du sol ; v vers le dehors (vue de dessus) ; u vers le
// dedans (coupes). Aucune cote : le chapitre ne donne aucune mesure.
module.exports = (h) => {
  const f = v => Math.round(v * 10) / 10;
  const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const noir = at => at.replace('fill="none"', 'fill="#1A1A1A"');
  const d = pts => pts.map((p, i) => `${i ? 'L' : 'M'}${f(p[0])} ${f(p[1])}`).join(' ');

  // Catmull-Rom échantillonné : une suite de points lisses, pour dessiner et pour découper.
  const lisse = (P, ferme = false, n = 8) => {
    const N = P.length, g = i => ferme ? P[(i + N) % N] : P[Math.max(0, Math.min(N - 1, i))];
    const out = [];
    for (let i = 0; i < (ferme ? N : N - 1); i++) {
      const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      for (let k = 0; k < n; k++) {
        const t = k / n, t2 = t * t, t3 = t2 * t;
        out.push([0, 1].map(j => 0.5 * ((2 * p1[j]) + (-p0[j] + p2[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t3)));
      }
    }
    if (!ferme) out.push(P[N - 1]);
    return out;
  };
  const interp = (T, x) => {
    if (x <= T[0][0]) return T[0][1];
    for (let i = 1; i < T.length; i++) if (x <= T[i][0]) { const [a, b] = [T[i - 1], T[i]]; return a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0]); }
    return T[T.length - 1][1];
  };

  // ─── La jambe ─────────────────────────────────────────────────────────────────────────
  // Demi-largeurs vues de dessus, dehors et dedans : le dedans du genou et du mollet plus plein,
  // la malléole du dehors plus basse, le pied qui s'évase jusqu'aux orteils.
  const WL = [[-300, 80], [-220, 75], [-150, 69], [-80, 61], [-35, 55], [0, 53], [35, 50], [70, 51], [120, 55], [170, 54], [230, 48], [290, 40], [340, 33], [385, 32], [418, 37], [445, 37], [470, 44], [495, 50], [512, 51]];
  const WM = [[-300, 80], [-220, 76], [-150, 71], [-80, 64], [-35, 58], [0, 55], [35, 51], [70, 52], [120, 57], [170, 55], [230, 48], [290, 39], [340, 33], [380, 33], [402, 38], [440, 37], [470, 47], [495, 53], [515, 54]];
  // Hauteurs vues de côté : le devant et l'arrière. La cuisse et le mollet portent au sol, le
  // creux du genou et le tendon d'Achille en l'air.
  const TOP = [[-300, 158], [-220, 152], [-150, 145], [-80, 135], [-35, 127], [-12, 131], [12, 131], [40, 121], [68, 122], [100, 118], [160, 113], [240, 108], [320, 103], [390, 100], [415, 100]];
  const BAS = [[-300, 2], [-200, 0], [-120, 3], [-60, 16], [-20, 28], [20, 30], [60, 18], [100, 4], [150, 0], [220, 2], [290, 14], [350, 28], [380, 33], [410, 36]];

  // ─── Les perches ──────────────────────────────────────────────────────────────────────
  const X0 = -220, X1 = 370, R = 20;            // de la mi-cuisse à au-dessus de la cheville
  // Chaque perche, droite, porte sur la cuisse et sur le mollet : sa face intérieure est la droite
  // qui part de la cuisse et effleure le mollet. Au genou et au bas de la jambe, elle passe à un
  // doigt de l'os : c'est là qu'elle est rembourrée.
  const faceInt = W => {
    const w0 = interp(W, X0);
    let b = -Infinity;
    for (let x = X0 + 10; x <= X1; x += 5) b = Math.max(b, (interp(W, x) - w0) / (x - X0));
    return x => w0 + b * (x - X0);
  };
  const EL = faceInt(WL), EM = faceInt(WM);
  // hauteur du centre des perches, vue de côté : à mi-épaisseur de la jambe, aux deux bouts
  const mi = x => (interp(TOP, x) + interp(BAS, x)) / 2;
  const PC = x => mi(X0) + (mi(X1) - mi(X0)) * (x - X0) / (X1 - X0);

  const LIENS = [-178, 100, 330];               // trois liens ; aucun sur la rotule
  const DL = 25;                                // demi-largeur d'un lien
  const MANCHONS = [[-75, 65], [250, 378]];     // le rembourrage roulé sur la perche : genou, cheville
  const EP = 12;                                // épaisseur du rembourrage

  // ─── Vue de côté et vue de dessus : même échelle, mêmes x ─────────────────────────────
  const echelle = z => (z.l - 16) / 900;
  const Xv = z => { const s = echelle(z); return x => 8 + (x + 320) * s; };

  const cote = {
    titre: 'De côté, jambe allongée',
    dessin: z => {
      const s = echelle(z), X = Xv(z), sol = z.h - 16, Y = hh => sol - hh * s;
      const P = (x, hh) => [X(x), Y(hh)];
      const out = [];
      out.push(h.rect(0, sol, z.l, 10, h.a.hachure('terre', 'aucun')), h.ligne(0, sol, z.l, sol, h.a.arete));
      // la jambe : le devant, le pied, la plante, l'arrière ; coupée en haut de la cuisse
      const devant = [...TOP, [430, 110], [450, 140], [478, 180], [505, 215], [530, 238], [550, 248], [563, 245], [566, 237]];
      const plante = [[562, 228], [548, 200], [536, 175], [515, 125], [495, 72], [482, 30], [470, 8], [452, 0], [435, 8], [425, 25], ...BAS.slice().reverse()];
      const tour = lisse([...devant, ...plante]).map(([x, hh]) => P(x, hh));
      const casse = [[X(-300) - 7, Y(55)], [X(-300) + 7, Y(105)], P(-300, 158)];
      out.push(h.path(`${d(tour)} ${d(casse).replace('M', 'L')} Z`, blanc(h.a.contour)));
      // la rotule sous la peau, la malléole, le petit orteil
      out.push(h.chemin(lisse([[-26, 124], [-8, 117], [12, 117], [28, 122]]).map(([x, y]) => P(x, y)), h.a.fin));
      out.push(h.chemin(lisse([[404, 50], [410, 62], [421, 66], [431, 59]]).map(([x, y]) => P(x, y)), h.a.detail));
      out.push(h.chemin(lisse([[533, 238], [546, 228], [560, 229]]).map(([x, y]) => P(x, y)), h.a.fin));
      // la perche du dehors (celle du dedans est cachée derrière la jambe), son écorce
      out.push(h.chemin([P(X0, PC(X0) + R), P(X1, PC(X1) + R), P(X1, PC(X1) - R), P(X0, PC(X0) - R)], blanc(h.a.contour), true));
      [[-200, -80, 0.4], [80, 240, -0.35], [-60, 20, 0.3]].forEach(([a, b, k]) =>
        out.push(h.chemin([P(a, PC(a) + k * R), P((a + b) / 2, PC((a + b) / 2) + k * R - 1.2), P(b, PC(b) + k * R)], h.a.fin)));
      out.push(h.ellipse(X(-120), Y(PC(-120) + 5), 6, 4, h.a.detail), h.ellipse(X(200), Y(PC(200) - 6), 6, 4, h.a.detail));
      // le rembourrage roulé autour de la perche, au genou et au bas de la jambe
      MANCHONS.forEach(([a, b]) => {
        const r = (R + EP) * s;
        const [x1, x2] = [X(a), X(b)], [yh1, yh2] = [Y(PC(a) + R + EP), Y(PC(b) + R + EP)], [yb1, yb2] = [Y(PC(a) - R - EP), Y(PC(b) - R - EP)];
        const k = r * 0.55;
        out.push(h.path(`M${f(x1 + k)} ${f(yh1)} L${f(x2 - k)} ${f(yh2)} C${f(x2 + 2)} ${f(yh2)} ${f(x2 + 2)} ${f(yb2)} ${f(x2 - k)} ${f(yb2)} L${f(x1 + k)} ${f(yb1)} C${f(x1 - 2)} ${f(yb1)} ${f(x1 - 2)} ${f(yh1)} ${f(x1 + k)} ${f(yh1)} Z`, blanc(h.a.arete)));
        for (let x = a + 12; x <= b - 18; x += 13) out.push(h.ligne(X(x), Y(PC(x) - R - EP + 3), X(x + 9), Y(PC(x) + R + EP - 3), h.a.fin));
      });
      // les trois liens, par-dessus, et le nœud plat sur la face du dehors de la perche
      LIENS.forEach(xl => {
        const pts = [];
        for (let x = xl - DL; x <= xl + DL + 0.1; x += 5) pts.push(P(x, interp(TOP, x) + 2));
        for (let x = xl + DL; x >= xl - DL - 0.1; x -= 5) pts.push(P(x, interp(BAS, x) - 1.5));
        out.push(h.chemin(pts, blanc(h.a.arete), true));
        out.push(h.ligne(X(xl - 11), Y(interp(TOP, xl - 11) + 1), X(xl - 11), Y(PC(xl) + 14), h.a.fin));
        out.push(h.ligne(X(xl + 12), Y(PC(xl) - 10), X(xl + 12), Y(interp(BAS, xl + 12) + 1), h.a.fin));
        // le nœud plat vu de face : deux boucles prises l'une dans l'autre, les bouts couchés
        // sur le lien, un vers le haut, un vers le bas
        const cx = X(xl), cy = Y(PC(xl)), k = s;
        const Q = (pts) => pts.map(([a, b]) => [cx + a * k, cy - b * k]);
        out.push(h.chemin(Q([[-15, 6], [-7, 26], [3, 26], [-3, 6]]), blanc(h.a.arete), true));
        out.push(h.chemin(Q([[15, -6], [7, -26], [-3, -26], [3, -6]]), blanc(h.a.arete), true));
        out.push(h.path(`M${d(Q([[-2, 10]])).slice(1)} C${d(Q([[-22, 10]])).slice(1)} ${d(Q([[-22, -10]])).slice(1)} ${d(Q([[4, -10]])).slice(1)}`, blanc(h.a.arete)));
        out.push(h.path(`M${d(Q([[2, -10]])).slice(1)} C${d(Q([[22, -10]])).slice(1)} ${d(Q([[22, 10]])).slice(1)} ${d(Q([[-4, 10]])).slice(1)}`, blanc(h.a.arete)));
      });
      return out.join('\n');
    },
    renvois: z => {
      const s = echelle(z), X = Xv(z), sol = z.h - 16, Y = hh => sol - hh * s;
      return [
        { n: 1, rond: [X(-150), Y(232)], cible: [X(-128), Y(PC(-128) + 8)], texte: 'perche droite : de la mi-cuisse à au-dessus de la cheville' },
        { n: 2, rond: [X(40), Y(222)], cible: [X(2), Y(130)], texte: 'rotule libre : jamais de lien dessus' },
        { n: 3, rond: [X(438), Y(205)], cible: [X(545), Y(234)], texte: 'orteils froids, pâles ou qui picotent : desserrer' },
      ];
    },
  };

  const dessus = {
    titre: 'De dessus',
    dessin: z => {
      const s = echelle(z), X = Xv(z), cy = z.h / 2, V = v => cy - v * s;
      const P = (x, v) => [X(x), V(v)];
      const out = [];
      // la jambe, le dehors en haut ; le pied pointe vers le haut, on le voit par-dessus
      // [bord dehors, bord dedans, bout] de chaque orteil, du petit au gros
      const orteils = [[51, 36, 530], [36, 20, 540], [20, 3, 548], [3, -16, 556], [-18, -54, 566]];
      const haut = lisse(WL).map(([x, w]) => P(x, w));
      let chemin = d(haut);
      orteils.forEach(([v1, v2, tip]) => {
        const b = tip - (v1 - v2 > 20 ? 18 : 12), m = (v1 + v2) / 2, k = (v1 - v2) * 0.3;
        const [a1, a2] = P(b, v1), [c1, c2] = P(tip, m), [e1, e2] = P(b, v2);
        chemin += ` L${f(a1)} ${f(a2)} C${f(X(tip - 2))} ${f(V(v1 - 0.5))} ${f(c1)} ${f(V(m + k))} ${f(c1)} ${f(c2)} C${f(c1)} ${f(V(m - k))} ${f(X(tip - 2))} ${f(V(v2 + 0.5))} ${f(e1)} ${f(e2)}`;
      });
      const bas = lisse(WM.map(([x, w]) => [x, -w]).reverse()).map(([x, v]) => P(x, v));
      chemin += ` ${d(bas).replace('M', 'L')} ${d([[X(-300) - 7, V(-30)], [X(-300) + 7, V(30)], P(-300, 80)]).replace('M', 'L')} Z`;
      out.push(h.path(chemin, blanc(h.a.contour)));
      // les ongles, les plis entre les orteils
      orteils.forEach(([v1, v2, tip], i) => {
        const m = (v1 + v2) / 2, w = (v1 - v2) * 0.28, lg = i === 4 ? 13 : 7;
        out.push(h.chemin(lisse([[tip - 3 - lg, m + w], [tip - 4, m + w * 0.9], [tip - 2.5, m], [tip - 4, m - w * 0.9], [tip - 3 - lg, m - w]]).map(([x, v]) => P(x, v)), h.a.fin));
        if (i < 4) out.push(h.ligne(X(tip - 10), V(v2 - (i === 3 ? 1 : 0)), X(tip - 18), V(v2 - 0.5), h.a.fin));
      });
      // la rotule, pointe vers le pied, et son tendon ; l'arête du tibia
      out.push(h.chemin(lisse([[-24, -15], [-26, 0], [-24, 15], [-12, 21], [4, 17], [18, 8], [25, 0], [18, -8], [4, -17], [-12, -21]], true).map(([x, v]) => P(x, v)), h.a.detail, true));
      out.push(h.chemin(lisse([[24, 5], [44, 7], [64, 7]]).map(([x, v]) => P(x, v)), h.a.fin));
      out.push(h.chemin(lisse([[24, -5], [44, -7], [64, -6]]).map(([x, v]) => P(x, v)), h.a.fin));
      out.push(h.chemin(lisse([[140, -3], [250, -6], [370, -8]]).map(([x, v]) => P(x, v)), h.a.fin));
      // les deux perches et leur écorce
      [[EL, 1], [EM, -1]].forEach(([E, sg]) => {
        const c = x => sg * (E(x) + R);
        out.push(h.chemin([P(X0, c(X0) + R), P(X1, c(X1) + R), P(X1, c(X1) - R), P(X0, c(X0) - R)], blanc(h.a.contour), true));
        [[-200, -90, 0.4], [80, 240, -0.3]].forEach(([a, b, k]) =>
          out.push(h.chemin([P(a, c(a) + k * R), P((a + b) / 2, c((a + b) / 2) + k * R + 1), P(b, c(b) + k * R)], h.a.fin)));
        out.push(h.ellipse(X(sg > 0 ? -120 : 180), V(c(sg > 0 ? -120 : 180) - 5), 6, 4, h.a.detail));
      });
      // le rembourrage roulé autour de chaque perche : il déborde vers l'os et s'écrase dessus
      MANCHONS.forEach(([a, b]) => {
        [[WL, EL, 1], [WM, EM, -1]].forEach(([W, E, sg]) => {
          const c = x => E(Math.min(x, X1)) + R;
          const dehors = [], dedans = [];
          for (let x = a; x <= b + 0.1; x += 8) { dehors.push([x, c(x) + R + EP]); dedans.push([x, Math.max(c(x) - R - EP, interp(W, x) + 0.8)]); }
          const bout1 = [a - 8, c(a)], bout2 = [b + 8, c(b)];
          const poly = lisse([bout1, ...dehors, bout2, ...dedans.reverse()], true, 4).map(([x, v]) => P(x, sg * v));
          out.push(h.chemin(poly, blanc(h.a.arete), true));
          for (let x = a + 10; x <= b - 16; x += 13) out.push(h.ligne(X(x), V(sg * (c(x) + R + EP - 3)), X(x + 9), V(sg * Math.max(c(x) - R - EP + 3, interp(W, x) + 3)), h.a.fin));
        });
      });
      // les liens, d'une perche à l'autre, et le nœud sur la face du dehors
      LIENS.forEach(xl => {
        const vh = EL(xl) + 2 * R + 2, vb = -(EM(xl) + 2 * R + 2);
        const [x1, x2] = [X(xl - DL), X(xl + DL)], [y1, y2] = [V(vh), V(vb)], r = 6 * s;
        out.push(h.path(`M${f(x1)} ${f(y1 + r)} Q${f(x1)} ${f(y1)} ${f(x1 + r)} ${f(y1)} L${f(x2 - r)} ${f(y1)} Q${f(x2)} ${f(y1)} ${f(x2)} ${f(y1 + r)} L${f(x2)} ${f(y2 - r)} Q${f(x2)} ${f(y2)} ${f(x2 - r)} ${f(y2)} L${f(x1 + r)} ${f(y2)} Q${f(x1)} ${f(y2)} ${f(x1)} ${f(y2 - r)} Z`, blanc(h.a.arete)));
        out.push(h.ligne(X(xl - 11), V(vh - 8), X(xl - 11), V(20), h.a.fin), h.ligne(X(xl + 12), V(-25), X(xl + 12), V(vb + 6), h.a.fin));
        const cx = X(xl), cyk = V(vh + 3);
        out.push(h.path(`M${f(cx - 7)} ${f(cyk + 3)} Q${f(cx - 7)} ${f(cyk - 5)} ${f(cx)} ${f(cyk - 5)} Q${f(cx + 7)} ${f(cyk - 5)} ${f(cx + 7)} ${f(cyk + 3)} Z`, blanc(h.a.arete)));
        out.push(h.ligne(cx - 2, cyk - 4, cx + 1, cyk + 2, h.a.fin));
      });
      // où sont prises les coupes : trait mixte, bouts épais, flèches vers le pied
      [[0, 'A'], [LIENS[1], 'B']].forEach(([xc, lettre]) => {
        const xa = X(xc), yh = V(EL(xc) + 2 * R + 26), yb = V(-(EM(xc) + 2 * R + 26));
        out.push(h.ligne(xa, yh, xa, yb, h.a.fin.replace('stroke-linecap="round"', 'stroke-dasharray="9 3 2 3"')));
        [yh, yb].forEach(y => {
          out.push(h.ligne(xa, y, xa, y + (y === yh ? 9 : -9), h.a.contour));
          out.push(h.fleche(`M${f(xa)} ${f(y)} L${f(xa + 16)} ${f(y)}`, h.a.detail));
        });
        out.push(h.texte(xa + 24, yh + 4, lettre, { ancre: 'start' }), h.texte(xa + 24, yb + 4, lettre, { ancre: 'start' }));
      });
      return out.join('\n');
    },
    renvois: z => {
      const s = echelle(z), X = Xv(z), cy = z.h / 2, V = v => cy - v * s;
      return [
        { n: 4, rond: [X(-110), V(128)], cible: [X(-178), V(40)], texte: 'trois liens au moins, autour des deux perches' },
        { n: 5, rond: [X(-150), V(-128)], cible: [X(-55), V(-(EM(-55) + 2 * R + EP - 5))], texte: 'rembourrage là où la perche touche l’os' },
      ];
    },
  };

  // ─── Les coupes, regardées vers le pied : le dehors à gauche ──────────────────────────
  // Au genou, à la rotule : l'os du genou à un doigt de la peau sur les côtés, la rotule devant,
  // le creux du genou en l'air.
  const GENOU = [[0, 131], [-20, 129], [-37, 121], [-48, 104], [-53, 82], [-50, 60], [-42, 44], [-28, 34], [-12, 30], [0, 32], [12, 30], [28, 34], [44, 44], [52, 60], [55, 82], [51, 104], [39, 121], [21, 129]];
  const FEMUR = [[-42, 82], [-39, 99], [-29, 108], [-12, 106], [0, 101], [12, 106], [30, 109], [41, 100], [44, 82], [41, 62], [31, 49], [19, 48], [10, 57], [0, 61], [-10, 57], [-18, 48], [-30, 49], [-40, 62]];
  const ROTULE = [[-22, 116], [-10, 111], [0, 109], [10, 111], [22, 116], [13, 124], [0, 127], [-13, 124]];
  // Sous le genou, au lien : le tibia à fleur de peau devant et en dedans, le péroné en dehors.
  const MOLLET = [[0, 118], [-18, 114], [-36, 102], [-49, 84], [-54, 64], [-51, 42], [-41, 22], [-24, 8], [0, 4], [24, 8], [42, 22], [53, 42], [56, 64], [51, 86], [37, 104], [18, 115]];
  const TIBIA = [[1, 110], [12, 103], [24, 93], [30, 86], [25, 78], [12, 74], [-4, 75], [-16, 80], [-22, 88], [-15, 99], [-6, 106]];
  const PERONE = [[-38, 71], [-30, 64], [-32, 54], [-41, 52], [-46, 61]];

  const coupe = (x, jambe, os, avecLien) => ({
    dessin: z => {
      const s = Math.min((z.l - 20) / 250, (z.h - 34) / 142), cx = z.l / 2, sol = z.h - 18;
      const P = (u, hh) => [cx + u * s, sol - hh * s];
      const out = [];
      const pc = PC(x), cl = -(EL(x) + R), cm = EM(x) + R;
      out.push(h.rect(0, sol, z.l, 10, h.a.hachure('terre', 'aucun')), h.ligne(0, sol, z.l, sol, h.a.arete));
      const peau = lisse(jambe, true);
      // la peau d'un côté, à une hauteur donnée (pour écraser le rembourrage dessus)
      const bord = (sg, hh) => {
        let best = null;
        for (let i = 0; i < peau.length; i++) {
          const a = peau[i], b = peau[(i + 1) % peau.length];
          if ((a[1] - hh) * (b[1] - hh) <= 0 && a[1] !== b[1]) {
            const u = a[0] + (b[0] - a[0]) * (hh - a[1]) / (b[1] - a[1]);
            if (Math.sign(u) === sg && (best === null || Math.abs(u) > Math.abs(best))) best = u;
          }
        }
        return best;
      };
      // le lien, en coupe : une bande qui fait le tour des deux perches et de la jambe
      if (avecLien) {
        const coque = off => {
          const pts = peau.map(([u, hh]) => { const dx = u, dy = hh - 64, l = Math.hypot(dx, dy); return [u + dx / l * off, hh + dy / l * off]; });
          for (let a = 0; a < 360; a += 6) { const c = Math.cos(a * Math.PI / 180), sn = Math.sin(a * Math.PI / 180); pts.push([cl + c * (R + off), pc + sn * (R + off)], [cm + c * (R + off), pc + sn * (R + off)]); }
          pts.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
          const cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
          const lo = [], hi = [];
          for (const p of pts) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], p) <= 0) lo.pop(); lo.push(p); }
          for (const p of pts.slice().reverse()) { while (hi.length >= 2 && cr(hi[hi.length - 2], hi[hi.length - 1], p) <= 0) hi.pop(); hi.push(p); }
          return [...lo.slice(0, -1), ...hi.slice(0, -1)].map(([u, hh]) => P(u, hh));
        };
        out.push(`<path d="${d(coque(4.5))} Z ${d(coque(1.2))} Z" fill="#1A1A1A" fill-rule="evenodd" stroke="none"/>`);
      }
      out.push(h.chemin(peau.map(([u, hh]) => P(u, hh)), blanc(h.a.contour), true));
      os.forEach(o => out.push(h.chemin(lisse(o, true).map(([u, hh]) => P(u, hh)), h.a.hachure('gravier', 'arete'), true)));
      // au genou, le rembourrage roulé autour de chaque perche, écrasé contre l'os
      if (!avecLien) {
        [[-1, cl], [1, cm]].forEach(([sg, c]) => {
          const pts = [];
          for (let a = 0; a < 360; a += 8) {
            const r = R + EP, u = c + Math.cos(a * Math.PI / 180) * r, hh = pc + Math.sin(a * Math.PI / 180) * r;
            const b = bord(sg, hh);
            pts.push([b !== null && sg * u < sg * b ? b - sg * 0.6 : u, hh]);
          }
          out.push(h.chemin(pts.map(([u, hh]) => P(u, hh)), h.a.hachure('isolant', 'arete'), true));
        });
      }
      // les deux perches en coupe : l'écorce et le bois
      [cl, cm].forEach(u => {
        const [px, py] = P(u, pc);
        out.push(h.cercle(px, py, R * s, h.a.hachure('bois', 'contour')));
        out.push(h.cercle(px, py, (R - 3) * s, h.a.detail));
      });
      // le nœud plat, sur la face du dehors de la perche du dehors ; les bouts pendent
      if (avecLien) {
        const [kx, ky] = P(cl - R - 9, pc);
        out.push(h.ellipse(kx, ky, 5.5 * s, 8 * s, h.a.plein));
        const bout = (dx, lg) => `<path d="M${f(kx - 2 * s)} ${f(ky + 4 * s)} Q${f(kx + dx * 0.4 * s)} ${f(ky + lg * 0.5 * s)} ${f(kx + dx * s)} ${f(ky + lg * s)} L${f(kx + (dx + 5) * s)} ${f(ky + (lg - 1) * s)} Q${f(kx + (dx * 0.4 + 5) * s)} ${f(ky + lg * 0.5 * s)} ${f(kx + 3 * s)} ${f(ky + 4 * s)} Z" fill="#1A1A1A" stroke="none"/>`;
        out.push(bout(-12, 26), bout(-3, 30));
      }
      return out.join('\n');
    },
  });

  const coupeA = Object.assign(coupe(0, GENOU, [FEMUR, ROTULE], false), { titre: 'Coupe A, au genou' });
  const coupeB = Object.assign(coupe(LIENS[1], MOLLET, [TIBIA, PERONE], true), { titre: 'Coupe B, au lien sous le genou' });

  return {
    ref: '24-08',
    titre: 'L’attelle de genou : deux perches, trois liens, la rotule libre',
    desc: 'Jambe gauche d’un blessé couché sur le dos, vue de côté et de dessus à la même échelle. Deux perches droites, une de chaque côté, vont de la mi-cuisse à au-dessus de la cheville ; droites, elles portent sur la cuisse et sur le mollet et passent à un doigt de l’os au genou et au bas de la jambe : là, elles sont rembourrées d’un linge roulé autour, qui s’écrase contre l’os. Trois liens font le tour des deux perches et de la jambe, noués sur la perche du dehors : un sur la cuisse, un sous le genou, un au-dessus de la cheville ; aucun sur la rotule. Les orteils restent à découvert. Coupe au genou : l’os à un doigt de la peau sur les côtés, le rembourrage entre lui et chaque perche, la rotule libre. Coupe au lien sous le genou : le lien fait le tour des perches et passe sous la jambe.',
    format: 'pleine',
    disposition: [['cote'], ['dessus'], ['coupeA', 'coupeB']],
    hauteurs: [1.06, 1.1, 0.9],
    vues: { cote, dessus, coupeA, coupeB },
  };
};
