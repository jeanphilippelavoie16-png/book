// Planche 24-08 — L'attelle de genou : deux perches droites, une de chaque côté, de la mi-cuisse
// à au-dessus de la cheville, rembourrées là où elles touchent l'os, trois liens, la rotule libre.
// Ch. 24, section 9, « L'attelle de genou » ; les orteils sous l'attelle, tableau des signes.
//
// Un blessé couché sur le dos, vu de côté, du dehors : la jambe proche est le corps simple de la
// bibliothèque (h.formes.corps, couche-dos, pied nu), à grande échelle, la cuisse coupée par le bord
// de la vue (redessin du 14 octobre : la jambe et le pied dessinés à la main sont partis, et avec
// eux la vue de dessus — un corps ne se montre que de profil). Les deux coupes, regardées vers le
// pied, au genou (A) et au lien sous le genou (B), sont marquées sur la vue de côté ; dans les
// coupes, le dehors est à gauche. Elles montrent les deux perches que la vue de côté ne montre pas.
//
// Unités : millimètres de jambe d'adulte. u le long de la jambe (0 au milieu du genou, vers le
// pied positif) ; hh la hauteur au-dessus du sol ; u vers le dedans dans les coupes. Aucune cote :
// le chapitre ne donne aucune mesure.
//
// La charte : les perches sont l'objet, contour fort et face du dessous à l'ombre (lumière en haut
// à gauche) ; rien de gris sur la jambe, ni sur les coupes hachurées. Deux cercles de contrôle dans
// la vue de côté : la rotule libre, et les orteils qu'on surveille.
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

  // ─── La jambe : le corps simple, couché sur le dos, à grande échelle ────────────────────
  // h.formes.corps (couche-dos, pied nu), la jambe proche seule : les bras et la jambe loin sont
  // masqués, et la vue coupe la cuisse à gauche. On lit son contour dans le SVG du moteur (le
  // blanc du corps proche), en millimètres, pour poser la perche et les liens dessus.
  const MASQUE = ['brasP', 'brasL', 'jambeL'];
  const OPT = { pose: 'couche-dos', pieds: 'nu', masquer: MASQUE };
  const C1 = h.formes.corps(Object.assign({ x: 0, y: 0, echelle: 1 }, OPT));
  const KX = C1.articulations.genouP[0];                    // le genou ; u = 0 au milieu du genou
  const polys = (C1.svg.match(/<path d="([^"]+)" fill="#FFFFFF"/)[1].split('Z')).map(sp =>
    (sp.match(/-?\d*\.?\d+/g) || []).map(Number).reduce((a, v, i, t) => (i % 2 ? a : a.concat([[t[i] - KX, -t[i + 1]]])), [])).filter(q => q.length > 2);
  // la hauteur du dessus et du dessous de la jambe à la distance u du genou (mm au-dessus du sol)
  const coupeV = u => {
    const ys = [];
    polys.forEach(q => q.forEach((a, i) => { const b = q[(i + 1) % q.length]; if ((a[0] - u) * (b[0] - u) <= 0 && a[0] !== b[0]) ys.push(a[1] + (b[1] - a[1]) * (u - a[0]) / (b[0] - a[0])); }));
    return [Math.max(...ys), Math.min(...ys)];
  };
  const TOP = u => coupeV(u)[0], BAS = u => coupeV(u)[1];
  const PIED = { pointe: [C1.pieds.P.pointe[0] - KX, -C1.pieds.P.pointe[1]] };

  // ─── Les perches ──────────────────────────────────────────────────────────────────────
  const X0 = -220, X1 = 370, R = 20;            // de la mi-cuisse à au-dessus de la cheville
  // hauteur du centre de la perche, vue de côté : à mi-épaisseur de la jambe, aux deux bouts
  const mi = x => (TOP(x) + BAS(x)) / 2;
  const PC = x => mi(X0) + (mi(X1) - mi(X0)) * (x - X0) / (X1 - X0);

  const LIENS = [-178, 100, 330];               // trois liens ; aucun sur la rotule
  const DL = 25;                                // demi-largeur d'un lien
  const MANCHONS = [[-75, 65], [250, 378]];     // le rembourrage roulé sur la perche : genou, cheville
  const EP = 12;                                // épaisseur du rembourrage

  // ─── Vue de côté : la jambe coupée à gauche par le bord de la vue ─────────────────────
  const U0 = -262, U1 = 532;                    // ce que la vue montre, du haut de la cuisse au bout du pied
  const geo = z => {
    const s = (z.l - 4) / (U1 - U0), sol = z.h - 14;
    const X = u => (u - U0) * s, Y = hh => sol - hh * s;
    return { s, sol, X, Y, P: (u, hh) => [X(u), Y(hh)] };
  };

  const cote = {
    titre: 'De côté, jambe allongée',
    dessin: z => {
      const { s, sol, X, Y, P } = geo(z);
      const out = [];
      out.push(h.rect(0, sol, z.l, 10, h.a.hachure('terre', 'aucun')), h.ligne(0, sol, z.l, sol, h.a.arete));
      // la jambe : le corps simple, coupé par le bord de la vue
      const jambe = h.formes.corps(Object.assign({ x: X(-KX), y: sol, echelle: s }, OPT));
      out.push(`<clipPath id="jambe-2408"><rect x="0" y="0" width="${f(z.l)}" height="${f(sol + 1)}"/></clipPath>`,
        `<g clip-path="url(#jambe-2408)">`, String(jambe), '</g>');
      // la rotule sous la peau, un trait fin
      out.push(h.chemin(lisse([[-22, TOP(-22) - 12], [-9, TOP(-9) - 7], [9, TOP(9) - 7], [22, TOP(22) - 12]]).map(([u, hh]) => P(u, hh)), h.a.detail));
      // la perche du dehors (celle du dedans est cachée derrière la jambe), son écorce
      const perche = [P(X0, PC(X0) + R), P(X1, PC(X1) + R), P(X1, PC(X1) - R), P(X0, PC(X0) - R)];
      out.push(h.chemin(perche, h.a.blanc, true));
      out.push(h.chemin([P(X0, PC(X0) - 0.3 * R), P(X1, PC(X1) - 0.3 * R), P(X1, PC(X1) - R), P(X0, PC(X0) - R)], h.a.ombre, true));   // le dessous, à l'ombre
      out.push(h.chemin(perche, h.a.contour, true));
      [[-200, -80, 0.4], [80, 240, -0.35], [-60, 20, 0.3]].forEach(([a, b, k]) =>
        out.push(h.chemin([P(a, PC(a) + k * R), P((a + b) / 2, PC((a + b) / 2) + k * R - 1.2), P(b, PC(b) + k * R)], h.a.fin)));
      out.push(h.ellipse(X(-120), Y(PC(-120) + 5), 6 * s, 4 * s, h.a.detail), h.ellipse(X(200), Y(PC(200) - 6), 6 * s, 4 * s, h.a.detail));
      // le rembourrage roulé autour de la perche, au genou et au bas de la jambe
      MANCHONS.forEach(([a, b]) => {
        const [x1, x2] = [X(a), X(b)], [yh1, yh2] = [Y(PC(a) + R + EP), Y(PC(b) + R + EP)], [yb1, yb2] = [Y(PC(a) - R - EP), Y(PC(b) - R - EP)];
        const k = (R + EP) * s * 0.55;
        out.push(h.path(`M${f(x1 + k)} ${f(yh1)} L${f(x2 - k)} ${f(yh2)} C${f(x2 + 2)} ${f(yh2)} ${f(x2 + 2)} ${f(yb2)} ${f(x2 - k)} ${f(yb2)} L${f(x1 + k)} ${f(yb1)} C${f(x1 - 2)} ${f(yb1)} ${f(x1 - 2)} ${f(yh1)} ${f(x1 + k)} ${f(yh1)} Z`, blanc(h.a.arete)));
        for (let x = a + 12; x <= b - 18; x += 13) out.push(h.ligne(X(x), Y(PC(x) - R - EP + 3), X(x + 9), Y(PC(x) + R + EP - 3), h.a.fin));
      });
      // les trois liens, par-dessus : une bande qui épouse la jambe, et le nœud plat sur la perche
      LIENS.forEach(xl => {
        const pts = [];
        for (let x = xl - DL; x <= xl + DL + 0.1; x += 5) pts.push(P(x, TOP(x) + 2));
        for (let x = xl + DL; x >= xl - DL - 0.1; x -= 5) pts.push(P(x, BAS(x) - 1));
        out.push(h.chemin(pts, blanc(h.a.arete), true));
        out.push(h.ligne(X(xl - 11), Y(TOP(xl - 11) + 1), X(xl - 11), Y(PC(xl) + 14), h.a.fin));
        out.push(h.ligne(X(xl + 12), Y(PC(xl) - 10), X(xl + 12), Y(BAS(xl + 12)), h.a.fin));
        const kx = X(xl), ky = Y(PC(xl) + 4);
        out.push(h.ellipse(kx, ky, 7 * s, 9 * s, h.a.plein));
        const bout = (dx, lg) => `<path d="M${f(kx - 3 * s)} ${f(ky + 5 * s)} Q${f(kx + dx * 0.4 * s)} ${f(ky + lg * 0.5 * s)} ${f(kx + dx * s)} ${f(ky + lg * s)} L${f(kx + (dx + 6) * s)} ${f(ky + (lg - 1) * s)} Q${f(kx + (dx * 0.4 + 6) * s)} ${f(ky + lg * 0.5 * s)} ${f(kx + 3 * s)} ${f(ky + 5 * s)} Z" fill="#1A1A1A" stroke="none"/>`;
        out.push(bout(-14, 30), bout(-2, 34));
      });
      // où sont prises les coupes : trait mixte, bout épais en haut, flèche vers le pied
      [[0, 'A'], [LIENS[1], 'B']].forEach(([uc, lettre]) => {
        const xa = X(uc), yh = Y(TOP(uc) + 70);
        out.push(h.ligne(xa, yh, xa, sol, h.a.fin.replace('stroke-linecap="round"', 'stroke-dasharray="9 3 2 3"')));
        out.push(h.ligne(xa, yh, xa, yh + 9, h.a.contour));
        out.push(h.fleche(`M${f(xa)} ${f(yh)} L${f(xa + 16)} ${f(yh)}`, h.a.detail));
        out.push(h.texte(xa + 24, yh + 4, lettre, { ancre: 'start' }));
      });
      // ce qu'on vérifie : la rotule, libre de tout lien ; les orteils, à découvert
      out.push(h.controle(X(0), Y(TOP(0) - 4), 15), h.controle(X(PIED.pointe[0] - 4), Y(PIED.pointe[1] - 14), 17));
      return out.join('\n');
    },
    renvois: z => {
      const { X, Y } = geo(z);
      return [
        { n: 1, rond: [X(-150), Y(TOP(-150) + 60)], cible: [X(-128), Y(PC(-128) + 8)], texte: 'perche droite : de la mi-cuisse à au-dessus de la cheville' },
        { n: 2, rond: [X(-60), Y(TOP(0) + 62)], cible: [X(-4), Y(TOP(0) - 2)], texte: 'rotule libre : jamais de lien dessus' },
        { n: 3, rond: [X(400), Y(PIED.pointe[1] - 10)], cible: [X(PIED.pointe[0] - 14), Y(PIED.pointe[1] - 14)], texte: 'orteils froids, pâles ou qui picotent : desserrer' },
        { n: 4, rond: [X(230), Y(TOP(230) + 62)], cible: [X(LIENS[2] - 8), Y(TOP(LIENS[2] - 8) - 4)], texte: 'trois liens au moins, autour des deux perches' },
      ];
    },
  };

  // ─── Les coupes, regardées vers le pied : le dehors à gauche ──────────────────────────
  // Leur géométrie est celle d'avant (validée) : les demi-largeurs de la jambe vue de dessus, dehors
  // et dedans, placent les deux perches ; les hauteurs de côté placent leur centre.
  const WL = [[-300, 80], [-220, 75], [-150, 69], [-80, 61], [-35, 55], [0, 53], [35, 50], [70, 51], [120, 55], [170, 54], [230, 48], [290, 40], [340, 33], [385, 32]];
  const WM = [[-300, 80], [-220, 76], [-150, 71], [-80, 64], [-35, 58], [0, 55], [35, 51], [70, 52], [120, 57], [170, 55], [230, 48], [290, 39], [340, 33], [380, 33]];
  const TOP0 = [[-300, 158], [-220, 152], [-150, 145], [-80, 135], [-35, 127], [-12, 131], [12, 131], [40, 121], [68, 122], [100, 118], [160, 113], [240, 108], [320, 103], [390, 100], [415, 100]];
  const BAS0 = [[-300, 2], [-200, 0], [-120, 3], [-60, 9], [-20, 13], [20, 14], [60, 10], [100, 4], [150, 0], [220, 2], [290, 14], [350, 28], [380, 33], [410, 36]];
  // la face intérieure de chaque perche : la droite qui part de la cuisse et effleure le mollet
  const faceInt = W => {
    const w0 = interp(W, X0);
    let b = -Infinity;
    for (let x = X0 + 10; x <= X1; x += 5) b = Math.max(b, (interp(W, x) - w0) / (x - X0));
    return x => w0 + b * (x - X0);
  };
  const EL = faceInt(WL), EM = faceInt(WM);
  const mi0 = x => (interp(TOP0, x) + interp(BAS0, x)) / 2;
  const PC0 = x => mi0(X0) + (mi0(X1) - mi0(X0)) * (x - X0) / (X1 - X0);
  // Au genou, à la rotule : l'os du genou à un doigt de la peau sur les côtés, la rotule devant,
  // le creux du genou en l'air.
  const GENOU = [[0, 131], [-20, 129], [-37, 121], [-48, 104], [-53, 82], [-50, 60], [-42, 44], [-28, 34], [-12, 30], [0, 32], [12, 30], [28, 34], [44, 44], [52, 60], [55, 82], [51, 104], [39, 121], [21, 129]];
  const FEMUR = [[-42, 82], [-39, 99], [-29, 108], [-12, 106], [0, 101], [12, 106], [30, 109], [41, 100], [44, 82], [41, 62], [31, 49], [19, 48], [10, 57], [0, 61], [-10, 57], [-18, 48], [-30, 49], [-40, 62]];
  const ROTULE = [[-22, 116], [-10, 111], [0, 109], [10, 111], [22, 116], [13, 124], [0, 127], [-13, 124]];
  // Sous le genou, au lien : le tibia à fleur de peau devant et en dedans, le péroné en dehors.
  const MOLLET = [[0, 118], [-18, 114], [-36, 102], [-49, 84], [-54, 64], [-51, 42], [-41, 22], [-24, 8], [0, 4], [24, 8], [42, 22], [53, 42], [56, 64], [51, 86], [37, 104], [18, 115]];
  const TIBIA = [[1, 110], [12, 103], [24, 93], [30, 86], [25, 78], [12, 74], [-4, 75], [-16, 80], [-22, 88], [-15, 99], [-6, 106]];
  const PERONE = [[-38, 71], [-30, 64], [-32, 54], [-41, 52], [-46, 61]];

  // l'échelle des coupes, et leur sol : le dessin centré dans sa vue
  // (le dessin d'une coupe fait 232 mm de large ; B, avec son nœud, est décalée vers le dehors)
  const geoCoupe = (z, uc = 0) => {
    const s = Math.min((z.l - 12) / 232, (z.h - 34) / 142), cx = z.l / 2 - uc * s, sol = Math.min(z.h - 18, (z.h + 125 * s) / 2 - 10);
    return { s, cx, sol, P: (u, hh) => [cx + u * s, sol - hh * s] };
  };
  const coupe = (x, jambe0, os0, avecLien, dh = 0, uc = 0) => {
  const jambe = jambe0.map(([u, hh]) => [u, hh + dh]), os = os0.map(o => o.map(([u, hh]) => [u, hh + dh]));
  return {
    dessin: z => {
      const { s, cx, sol, P } = geoCoupe(z, uc);
      const out = [];
      const pc = PC0(x) + dh, cl = -(EL(x) + R), cm = EM(x) + R;
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
          const pts = peau.map(([u, hh]) => { const dx = u, dy = hh - 64 - dh, l = Math.hypot(dx, dy); return [u + dx / l * off, hh + dy / l * off]; });
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
  };
  };

  const coupeA = Object.assign(coupe(0, GENOU, [FEMUR, ROTULE], false, -17), {
    titre: 'Coupe A, au genou',
    // le rembourrage entre la perche du dehors et l'os du genou
    renvois: z => {
      const { P } = geoCoupe(z);
      const cl = -(EL(0) + R), pc = PC0(0) - 17;
      return [{ n: 5, rond: P(cl - 10, pc + R + EP + 34), cible: P(cl - 0.62 * (R + EP / 2), pc + 0.78 * (R + EP / 2)), texte: 'rembourrage là où la perche touche l’os' }];
    },
  });
  const coupeB = Object.assign(coupe(LIENS[1], MOLLET, [TIBIA, PERONE], true, 0, -10.5), { titre: 'Coupe B, au lien sous le genou' });

  return {
    ref: '24-08',
    titre: 'L’attelle de genou : deux perches, trois liens, la rotule libre',
    desc: 'Jambe d’un blessé couché sur le dos, vue de côté, du dehors : la cuisse coupée par le bord de la vue, le pied nu. Deux perches droites, une de chaque côté, vont de la mi-cuisse à au-dessus de la cheville ; droites, elles portent sur la cuisse et sur le mollet et passent à un doigt de l’os au genou et au bas de la jambe : là, elles sont rembourrées d’un linge roulé autour, qui s’écrase contre l’os. Trois liens font le tour des deux perches et de la jambe, noués sur la perche du dehors : un sur la cuisse, un sous le genou, un au-dessus de la cheville ; aucun sur la rotule. Les orteils restent à découvert. Coupe au genou : l’os à un doigt de la peau sur les côtés, le rembourrage entre lui et chaque perche, la rotule libre. Coupe au lien sous le genou : le lien fait le tour des deux perches et passe sous la jambe.',
    format: 'pleine',
    disposition: [['cote'], ['coupeA', 'coupeB']],
    hauteurs: [1, 1],
    vues: { cote, coupeA, coupeB },
  };
};
