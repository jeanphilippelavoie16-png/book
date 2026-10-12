// Planche 69-40 — injecter la saumure le long de l'os (ch. 69 : étape 9 de la procédure ;
// variante « La pièce épaisse sans seringue », points 2 et 3).
// Le chapitre ne donne aucune dimension de la pièce, de l'aiguille ni de la seringue : aucune
// cote. Les proportions (cuissot d'orignal et son fémur, aiguille, seringue) sont tracées en mm
// dans un repère propre à chaque vue, sans aucun chiffre sur le dessin.
module.exports = (h) => {
  const A = h.a, F = h.formes, I = F._interne;
  const r1 = n => Math.round(n * 10) / 10;
  const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const bC = blanc(A.contour), bA = blanc(A.arete), bD = blanc(A.detail), bF = blanc(A.fin);
  const mixte = A.fin + ' stroke-dasharray="10 3 2 3"';
  const Tr = (ox, oy, s) => p => [ox + p[0] * s, oy + p[1] * s];
  const lisseD = (pts, tr, ferme = true) => I.ser(I.lisse(pts, ferme), tr);

  // ─── géométrie commune ────────────────────────────────────────────────────────────────
  // points d'une courbe lissée, pour trouver les bords et tester l'intérieur
  const echant = (pts, ferme = true, n = 10) => {
    const cmds = I.lisse(pts, ferme), out = [cmds[0][1]];
    let p = cmds[0][1];
    for (const c of cmds) {
      if (c[0] !== 'C') continue;
      for (let k = 1; k <= n; k++) {
        const t = k / n, m = 1 - t;
        out.push([0, 1].map(i => m * m * m * p[i] + 3 * m * m * t * c[1][i] + 3 * m * t * t * c[2][i] + t * t * t * c[3][i]));
      }
      p = c[3];
    }
    return out;
  };
  const coupeV = (poly, x) => {                       // les y où la verticale x coupe le contour
    const ys = [];
    for (let i = 0; i < poly.length; i++) {
      const a = poly[i], b = poly[(i + 1) % poly.length];
      if ((a[0] - x) * (b[0] - x) <= 0 && a[0] !== b[0]) ys.push(a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0]));
    }
    return ys.sort((u, v) => u - v);
  };
  const dedans = (poly, p) => {
    let c = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const a = poly[i], b = poly[j];
      if ((a[1] > p[1]) !== (b[1] > p[1]) && p[0] < (b[0] - a[0]) * (p[1] - a[1]) / (b[1] - a[1]) + a[0]) c = !c;
    }
    return c;
  };
  const hache = (i, j) => { const v = Math.sin(i * 127.1 + j * 311.7) * 43758.5453; return v - Math.floor(v); };

  // La saumure dans la chair : un semis de points le long d'un trajet d'aiguille (a → b),
  // demi-largeur w, bord irrégulier, seulement dans la pièce.
  const semis = (a, b, w, tr, poly, pas = 5, r = 0.8) => {
    const d = [b[0] - a[0], b[1] - a[1]], L = Math.hypot(d[0], d[1]) || 1e-6;
    const u = [d[0] / L, d[1] / L], n = [-u[1], u[0]];
    const out = [];
    const ki = Math.ceil(w / pas) + 1;
    for (let i = -ki; i <= Math.ceil(L / pas) + ki; i++) {
      for (let j = -ki; j <= ki; j++) {
        const t = i * pas + (hache(i, j) - 0.5) * pas * 0.7;
        const v = j * pas * 0.87 + (i % 2 ? pas * 0.43 : 0) + (hache(j, i) - 0.5) * pas * 0.5;
        const tt = Math.max(0, Math.min(L, t));
        const dist = Math.hypot(t - tt, v);
        if (dist > w * (0.72 + 0.28 * hache(i + 7, j + 3))) continue;
        const q = [a[0] + u[0] * t + n[0] * v, a[1] + u[1] * t + n[1] * v];
        if (poly && !dedans(poly, q)) continue;
        const Q = tr(q);
        out.push(h.cercle(Q[0], Q[1], r, A.plein));
      }
    }
    return out.join('\n');
  };

  // Le cuissot d'orignal vu de côté, en mm : la hanche à gauche (face de coupe à l'articulation),
  // le genou à droite, le bout du tibia scié qui dépasse.
  const CUI = [[22, 52], [70, 22], [150, 8], [235, 12], [315, 34], [390, 64], [455, 92], [510, 112], [552, 130],
    [584, 148], [593, 170], [581, 192], [545, 207], [470, 222], [395, 244], [310, 270], [215, 287], [130, 284],
    [66, 262], [24, 222], [8, 170], [8, 110]];
  const polyCui = echant(CUI);
  // le fémur : tête à la hanche, col, trochanter, fût, condyles au genou
  const FEM = [[9, 124], [15, 111], [28, 105], [44, 107], [57, 114], [72, 101], [90, 95], [106, 103], [135, 114],
    [220, 122], [320, 130], [420, 139], [468, 141], [502, 132], [530, 135], [546, 150], [548, 170], [538, 188],
    [512, 194], [484, 186], [440, 171], [330, 161], [220, 153], [130, 149], [92, 150], [66, 146], [52, 149],
    [36, 151], [20, 147], [11, 137]];
  const polyFem = echant(FEM);
  const CANAL = [[140, 122], [280, 131], [430, 147], [446, 155], [430, 162], [280, 153], [140, 142], [126, 132]];
  // le tibia scié : plateau contre les condyles, fût, bout scié droit
  const tibia = (tr, at, bout = false) => {
    const q = p => tr(p).map(r1).join(' ');
    const d = `M${q([650, 161])} L${q([594, 160])} C${q([580, 159])} ${q([574, 147])} ${q([562, 147])} Q${q([552, 147])} ${q([552, 157])} ` +
      `L${q([552, 183])} Q${q([552, 193])} ${q([562, 193])} C${q([574, 193])} ${q([580, 182])} ${q([594, 181])} L${q([650, 181])} Z`;
    const out = [h.path(d, at)];
    if (bout) {                                    // le bout scié, vu un peu de biais : l'os et sa moelle
      const c = tr([650, 171]), s = (tr([1, 0])[0] - tr([0, 0])[0]);
      out.push(h.ellipse(c[0], c[1], 4 * s, 10 * s, bA), h.ellipse(c[0], c[1], 2 * s, 5 * s, A.detail));
    }
    return out.join('\n');
  };
  const seams = (tr) => [
    [[30, 70], [120, 56], [230, 68], [340, 94], [450, 124]],
    [[62, 196], [170, 188], [290, 198], [410, 218]],
    [[150, 152], [165, 214], [150, 282]],
    [[352, 170], [372, 214], [350, 262]],
  ].map(p => h.path(lisseD(p, tr, false), A.detail)).join('\n');

  // ─── Vue 1 : à l'injecteur, le cuissot en coupe dans le plan de l'os ───────────────────
  const seringue = z => {
    const W = 834, H = 292;
    const s = Math.min((z.l - 8) / W, (z.h - 8) / H);
    const ox = 4, oy = (z.h - H * s) / 2 - 4 * s;
    const tr = Tr(ox, oy, s), P = p => tr(p);
    const out = [];
    const y0 = 127;                  // l'axe de l'aiguille, juste au-dessus du fût
    const xFond = 395, xBout = 447;  // le fond du trajet ; le bout de l'aiguille, en train de sortir
    const xMoyeu = 578;

    // la chair, en coupe
    out.push(h.path(lisseD(CUI, tr), bC));
    out.push(seams(tr));
    // la saumure déjà en place : par l'autre bout de l'os, et dans les masses épaisses
    out.push(semis([14, 78], [170, 95], 9, tr, polyCui));
    out.push(semis([186, 283], [187, 168], 9, tr, polyCui));
    out.push(semis([302, 268], [303, 175], 9, tr, polyCui));
    out.push(semis([252, 16], [253, 106], 9, tr, polyCui));
    // le trajet en cours : la saumure reste derrière le bout de l'aiguille
    out.push(semis([xFond, y0], [xBout + 6, y0], 9, tr, polyCui));
    // les os, en coupe
    out.push(tibia(tr, bA));
    out.push(h.path(`M${P([584, 165]).map(r1).join(' ')} L${P([650, 166]).map(r1).join(' ')} M${P([584, 178]).map(r1).join(' ')} L${P([650, 175]).map(r1).join(' ')}`, A.detail));
    out.push(h.path(lisseD(FEM, tr), bA));
    out.push(h.path(lisseD(CANAL, tr), A.detail));
    {
      const c = P([29, 128]);
      out.push(h.cercle(c[0], c[1], 13 * s, A.hachure('gravier', 'aucun')));
      const k = P([516, 164]);
      out.push(h.ellipse(k[0], k[1], 20 * s, 17 * s, A.hachure('gravier', 'aucun')));
    }

    // l'aiguille à trous, le moyeu
    const ya = 2.3;
    out.push(h.chemin([[xBout, y0], [xBout + 7, y0 - ya], [xMoyeu, y0 - ya], [xMoyeu, y0 + ya], [xBout + 7, y0 + ya]].map(P), bA, true));
    for (let x = xBout + 14; x < xBout + 70; x += 14) { const q = P([x, y0]); out.push(h.cercle(q[0], q[1], 0.9, A.plein)); }
    out.push(h.chemin([[xMoyeu, y0 - 6], [xMoyeu + 14, y0 - 6], [xMoyeu + 14, y0 + 6], [xMoyeu, y0 + 6]].map(P), bA, true));
    out.push(h.ligne(...P([xMoyeu + 5, y0 - 6]), ...P([xMoyeu + 5, y0 + 6]), A.fin), h.ligne(...P([xMoyeu + 9, y0 - 6]), ...P([xMoyeu + 9, y0 + 6]), A.fin));
    // le corps de l'injecteur : bague avant, cylindre, bague arrière, anneaux des doigts
    const xb0 = 592, xb1 = 744;
    for (const dy of [-1, 1]) {
      const c = P([748, y0 + dy * 25]);
      out.push(h.cercle(c[0], c[1], 11 * s, bA), h.cercle(c[0], c[1], 6.5 * s, bA));
    }
    out.push(h.chemin([[xb0, y0 - 16], [xb0 + 9, y0 - 16], [xb0 + 9, y0 + 16], [xb0, y0 + 16]].map(P), bA, true));
    out.push(h.chemin([[xb0 + 9, y0 - 14], [xb1, y0 - 14], [xb1, y0 + 14], [xb0 + 9, y0 + 14]].map(P), bA, true));
    out.push(h.ligne(...P([xb0 + 14, y0 - 8]), ...P([xb1 - 6, y0 - 8]), A.fin));
    out.push(h.chemin([[xb1, y0 - 16], [xb1 + 8, y0 - 16], [xb1 + 8, y0 + 16], [xb1, y0 + 16]].map(P), bA, true));
    // la tige du piston et l'anneau du pouce
    out.push(h.chemin([[xb1 + 8, y0 - 3.5], [796, y0 - 3.5], [796, y0 + 3.5], [xb1 + 8, y0 + 3.5]].map(P), bA, true));
    { const c = P([808, y0]); out.push(h.cercle(c[0], c[1], 12 * s, bA), h.cercle(c[0], c[1], 7 * s, bA)); }

    // les deux mouvements : le piston entre, l'aiguille sort
    const f1 = P([612, 96]), f2 = P([694, 96]);
    out.push(h.fleche(`M${r1(f1[0])} ${r1(f1[1])} L${r1(f2[0])} ${r1(f2[1])}`));
    const g1 = P([834, 150]), g2 = P([786, 150]);
    out.push(h.fleche(`M${r1(g1[0])} ${r1(g1[1])} L${r1(g2[0])} ${r1(g2[1])}`));

    const Q = p => P(p).map(r1);
    return {
      svg: out.join('\n'),
      renvois: [
        { n: 1, rond: Q([330, 36]), cible: Q([300, 142]), texte: 'le fémur : l’aigreur part de l’os' },
        { n: 2, rond: Q([480, 50]), cible: Q([500, y0]), texte: 'aiguille à trous, poussée le long de l’os' },
        { n: 3, rond: Q([653, 44]), cible: Q([653, 96]), texte: 'retirer lentement en poussant le piston' },
        { n: 4, rond: [14, 12], cible: Q([60, 84]), texte: 'même chose par l’autre bout de l’os' },
        { n: 5, rond: Q([420, 282]), cible: Q([306, 238]), texte: 'petites doses dans les masses épaisses' },
      ],
    };
  };

  // ─── Rangée 2 : même échelle, mêmes hauteurs, pour que les deux vues se correspondent ──
  const Y_HAUT = -118, Y_BAS = 300;                     // en mm : du manche du couteau au dessous
  const LARGEURS2 = [2.6, 0.9, 1.1];
  const FENTE_L = Math.floor((600 - 2 * 22) * LARGEURS2[0] / LARGEURS2.reduce((a, b) => a + b, 0));
  const echelle2 = z => Math.min((z.h - 8) / (Y_BAS - Y_HAUT), (FENTE_L - 6) / 636);
  const oy2 = (z, s) => 6 - Y_HAUT * s;

  // ─── Vue 2 : sans injecteur, la fente au couteau le long de l'os (vue de côté) ─────────
  const fente = z => {
    const s = echelle2(z);
    const ox = 3, oy = oy2(z, s);
    const tr = Tr(ox, oy, s), P = p => tr(p);
    const out = [];

    // le tibia qui dépasse, puis la pièce par-dessus
    out.push(tibia(tr, bA, true));
    out.push(h.path(lisseD(CUI, tr), bC));
    // le fémur, caché dans la pièce
    out.push(h.path(lisseD(FEM, tr), A.cache));

    // la coupe en travers : prise derrière le couteau, là où la fente est déjà faite
    const xs = 362;                                       // dans la fente : entre l'entrée du couteau et le bout de la flèche
    const c1 = P([xs, -16]), c2 = P([xs, 304]);
    out.push(h.ligne(c1[0], c1[1], c2[0], c2[1], mixte));
    for (const c of [c1, c2]) {
      out.push(h.ligne(c[0], c[1] - 5, c[0], c[1] + 5, A.arete));
      out.push(h.fleche(`M${r1(c[0])} ${r1(c[1])} L${r1(c[0] + 13)} ${r1(c[1])}`, A.detail));
    }

    // le couteau mince, penché, la pointe sur le dessus du fût
    const pointe = [262, 124];
    const th = 35 * Math.PI / 180;
    const u = [Math.sin(th), -Math.cos(th)];             // de la pointe vers le manche
    const n = [-u[1], u[0]];                              // vers le tranchant (en bas à droite)
    const at = (t, v) => [pointe[0] + u[0] * t + n[0] * v, pointe[1] + u[1] * t + n[1] * v];
    const Lb = 150, lb = 14, Lm = 104, lm = 12;
    // la lame : le dos droit, le tranchant qui remonte vers la pointe
    const dos = [at(0, 0), at(Lb, -2)];
    const tranch = [at(Lb, lb - 2), at(40, lb - 3), at(16, lb - 7), at(0, 0)];
    const lame = [dos[0], dos[1], ...tranch];
    // la partie de lame dans la chair, en caché ; celle qui dépasse, pleine
    const tSurf = 112;                                    // où le dos de la lame sort de la pièce
    out.push(h.chemin(lame.map(P), A.cache, true));
    const vis = [at(tSurf - 6, -2), at(Lb, -2), at(Lb, lb - 2), at(tSurf + 8, lb - 2.5)];
    out.push(h.chemin(vis.map(P), bA, true));
    out.push(h.path(lisseD(CUI, tr), A.contour));
    // le manche et la main qui le tient
    const cm = at(Lb + Lm / 2, lb / 2 - 1);
    out.push(h.chemin([at(Lb, -3), at(Lb + Lm, -3), at(Lb + Lm + 4, lb / 2 - 1), at(Lb + Lm, lb + 1), at(Lb, lb + 1)].map(P), bA, true));
    const C = P(cm);
    out.push(F.main({ x: C[0], y: C[1], pose: 'prise', vue: 'dos', angle: 215, diametre: (lm + 6) * s, echelle: s, bras: 50 }));

    // le couteau avance le long du fût
    const f1 = P([292, 76]), f2 = P([392, 86]);
    out.push(h.fleche(`M${r1(f1[0])} ${r1(f1[1])} L${r1(f2[0])} ${r1(f2[1])}`));

    const Q = p => P(p).map(r1);
    return {
      svg: out.join('\n'),
      renvois: [
        { n: 6, rond: Q([200, -80]), cible: Q(at(tSurf + 16, 5)), texte: 'couteau mince, la pointe jusqu’à l’os' },
        { n: 7, rond: Q([560, 262]), cible: Q([330, 80]), texte: 'la fente suit l’os sur sa longueur' },
      ],
    };
  };

  // ─── Vue 3 : la même pièce en travers, la fente bourrée de sel ─────────────────────────
  const travers = z => {
    const s = echelle2(z);
    const cx = z.l / 2 / s;
    const tr = Tr(z.l / 2, oy2(z, s), s), P = p => tr(p);
    const out = [];
    const SEC = [[-6, 9], [40, 16], [80, 42], [104, 95], [110, 165], [98, 228], [64, 272], [12, 288], [-44, 280],
      [-86, 246], [-106, 186], [-104, 112], [-84, 52], [-48, 18]];
    out.push(h.path(lisseD(SEC, tr), bC));
    out.push([[[-96, 80], [-40, 70], [10, 96], [60, 70], [100, 64]], [[-100, 200], [-40, 186], [20, 196], [104, 190]],
      [[40, 186], [50, 240], [30, 284]]].map(p => h.path(lisseD(p, tr, false), A.detail)).join('\n'));
    // l'os en travers : l'anneau et la moelle
    const ob = P([-8, 136]);
    out.push(h.cercle(ob[0], ob[1], 17 * s, bA), h.cercle(ob[0], ob[1], 9 * s, bD));
    // la fente, de la surface jusqu'à l'os, ouverte et bourrée de sel
    const xf = -8, yh = 6, yb = 119;
    const fen = [[xf - 11, yh - 2], [xf + 11, yh - 2], [xf + 1.8, yb], [xf - 1.8, yb]];
    out.push(h.chemin(fen.map(P), A.blanc, true));
    // le sel : des grains cubiques serrés jusqu'au fond, un peu en bosse sur le dessus
    for (let y = yb - 4, k = 0; y > yh - 12; y -= 6.4, k++) {
      const demi = (y >= yh ? 1.8 + (11 - 1.8) * (yb - y) / (yb - yh) : 11 - (yh - y) * 0.9) - 3;
      const nb = Math.max(1, Math.round(demi * 2 / 6.6) + 1);
      for (let i = 0; i < nb; i++) {
        const x = nb === 1 ? xf : xf - demi + (2 * demi) * i / (nb - 1);
        const a = (hache(i, k) - 0.5) * 60;
        const q = P([x + (hache(k, i) - 0.5) * 1.5, y]);
        const c = 2.7 * s;
        const pts = [[-c, -c], [c, -c], [c, c], [-c, c]].map(([dx, dy]) => {
          const r = a * Math.PI / 180;
          return [q[0] + dx * Math.cos(r) - dy * Math.sin(r), q[1] + dx * Math.sin(r) + dy * Math.cos(r)];
        });
        out.push(h.chemin(pts, bF, true));
      }
    }
    out.push(h.chemin([fen[0], fen[3]].map(P), A.arete), h.chemin([fen[1], fen[2]].map(P), A.arete));
    const Q = p => P(p).map(r1);
    return {
      svg: out.join('\n'),
      renvois: [
        { n: 8, rond: Q([70, -60]), cible: Q([xf + 4, 40]), texte: 'sel sec bourré jusqu’à l’os, puis immerger' },
      ],
    };
  };

  // ─── Vue 4 : la seringue de fortune, sur une palette désossée ──────────────────────────
  const fortune = z => {
    const X0 = -88, X1 = 88, YH = -178, YB = 132;
    const s = Math.min((z.l - 8) / (X1 - X0), (z.h - 6) / (YB - YH));
    const tr = Tr(z.l / 2 - (X0 + X1) / 2 * s, 6 - YH * s, s), P = p => tr(p);
    const out = [];
    // la palette en travers, coupée des deux côtés par un trait de coupure : elle continue
    const dessus = [[-80, 3], [-40, 0], [0, 0], [40, -2], [80, 2]];
    const cassD = [[80, 2], [86, 22], [76, 43], [86, 64], [80, 85]];
    const dessous = [[80, 85], [40, 87], [0, 86], [-40, 88], [-80, 85]];
    const cassG = [[-80, 85], [-86, 64], [-76, 43], [-86, 22], [-80, 3]];
    const polyDal = [dessus, cassD, dessous, cassG].flatMap(p => echant(p, false).slice(1));
    out.push(h.chemin(polyDal.map(P), A.blanc, true));
    out.push(h.path(lisseD(dessus, tr, false), A.contour), h.path(lisseD(dessous, tr, false), A.contour));
    out.push(h.path(lisseD(cassD, tr, false), A.arete), h.path(lisseD(cassG, tr, false), A.arete));
    out.push([[[-80, 36], [-40, 42], [-12, 56], [40, 50], [80, 40]], [[-62, 70], [0, 74], [62, 66]]]
      .map(p => h.path(lisseD(p, tr, false), A.detail)).join('\n'));
    // la fente de couteau, et la saumure qui n'avance que de quelques centimètres autour du fond
    const yf = 38;
    out.push(semis([0, yf], [0, yf + 1], 30, tr, polyDal));
    const fV = [[-13, 0], [13, 0], [1.2, yf], [-1.2, yf]];       // la fente en V, ouverte dans le dessus
    out.push(h.chemin(fV.map(P), A.blanc, true));
    out.push(h.chemin([fV[0], fV[3], fV[2], fV[1]].map(P), A.arete));
    // la seringue, verticale : l'embout conique au fond de la fente
    const bx = 17, yBas = -3, yHaut = -112;
    out.push(h.chemin([[-4.5, yBas], [4.5, yBas], [1, yf - 1], [-1, yf - 1]].map(P), bA, true));
    out.push(h.path(`M${Q2(P([-bx, yHaut]))} L${Q2(P([-bx, yBas - 6]))} Q${Q2(P([-bx, yBas]))} ${Q2(P([-bx + 7, yBas]))} L${Q2(P([bx - 7, yBas]))} Q${Q2(P([bx, yBas]))} ${Q2(P([bx, yBas - 6]))} L${Q2(P([bx, yHaut]))} Z`, bA));
    // la saumure dans le cylindre, sous le joint du piston
    const yj = -62;
    out.push(h.rect(...P([-bx + 1.2, yj + 8]), (2 * bx - 2.4) * s, (yBas - 1.5 - yj - 8) * s, A.hachure('eau', 'aucun')));
    out.push(h.rect(...P([-bx + 0.8, yj]), (2 * bx - 1.6) * s, 8 * s, A.plein));
    out.push(h.chemin([[-5, yj], [-5, yHaut - 6], [5, yHaut - 6], [5, yj]].map(P), A.detail));
    // graduations
    for (let y = yBas - 12, k = 0; y > yHaut + 8; y -= 10, k++) {
      out.push(h.ligne(...P([-bx, y]), ...P([-bx + (k % 5 === 0 ? 9 : 5), y]), A.fin));
    }
    // collerette, tige, poussoir
    out.push(h.chemin([[-34, yHaut - 6], [34, yHaut - 6], [34, yHaut], [-34, yHaut]].map(P), bA, true));
    out.push(h.chemin([[-5, yHaut - 6], [-5, -150], [5, -150], [5, yHaut - 6]].map(P), bA, true));
    out.push(h.ligne(...P([0, yHaut - 8]), ...P([0, -148]), A.fin));
    out.push(h.chemin([[-20, -150], [20, -150], [20, -157], [-20, -157]].map(P), bA, true));
    // le poussoir descend
    const g1 = P([34, -176]), g2 = P([34, -136]);
    out.push(h.fleche(`M${r1(g1[0])} ${r1(g1[1])} L${r1(g2[0])} ${r1(g2[1])}`));

    const Q = p => P(p).map(r1);
    return {
      svg: out.join('\n'),
      renvois: [
        { n: 9, rond: Q([-68, -100]), cible: Q([-bx, -86]), texte: 'grosse seringue sans aiguille' },
        { n: 10, rond: Q([-68, -36]), cible: Q([-1.6, yf - 1]), texte: 'le bout au fond d’une fente de couteau' },
        { n: 11, rond: Q([64, 118]), cible: Q([22, 52]), texte: 'saumure : quelques centimètres, pas plus' },
      ],
    };
  };
  const Q2 = p => p.map(r1).join(' ');

  return {
    ref: '69-40',
    titre: 'Injecter la saumure le long de l’os',
    desc: 'En haut, un cuissot d’orignal coupé dans le plan du fémur : l’aiguille à trous d’un injecteur est poussée le long du fût, puis retirée lentement en poussant le piston ; la saumure reste le long de chaque trajet, par les deux bouts de l’os et en petites doses dans les masses épaisses. En bas, sans injecteur : un couteau mince ouvre une fente le long de l’os jusqu’à le toucher, et la coupe en travers montre la fente bourrée de sel sec ; à droite, une grosse seringue sans aiguille poussée au fond d’une fente dans une palette, la saumure n’avançant que de quelques centimètres.',
    format: 'pleine',
    disposition: [['seringue'], ['fente', 'travers', 'fortune']],
    hauteurs: [1.05, 1],
    largeurs: [[1], LARGEURS2],
    vues: {
      seringue: { titre: 'À l’injecteur, le long de l’os', dessin: z => seringue(z).svg, renvois: z => seringue(z).renvois },
      fente: { titre: 'Sans injecteur : fendre jusqu’à l’os', dessin: z => fente(z).svg, renvois: z => fente(z).renvois },
      travers: { titre: 'En travers', dessin: z => travers(z).svg, renvois: z => travers(z).renvois },
      fortune: { titre: 'Sur une palette', dessin: z => fortune(z).svg, renvois: z => fortune(z).renvois },
    },
    danger: 'Danger — avec du nitrite, une saumure d’injection est beaucoup plus concentrée qu’une saumure d’immersion : jamais dans le même seau, jamais le même jour sans étiquette.',
  };
};
