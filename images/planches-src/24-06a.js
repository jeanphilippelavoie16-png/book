// Planche 24-06a — La béquille de fourche, en place (chapitre 24, section 9 « La béquille de
// fourche » ; tableau des contrôles, ligne « Béquille » ; signes d'échec, « Aisselle engourdie »).
// La planche 24-06b montre la béquille elle-même et ses pièces.
// Ce que dit le chapitre, et rien de plus : la fourche part un peu sous la hauteur de la main ; les
// deux branches montent de chaque côté du bras et se referment à l'aisselle ; une traverse liée
// entre les deux branches, à l'endroit où tombe la main, sert de poignée. Longueur : la taille
// moins 40 cm jusqu'à l'appui, qui s'arrête à environ 5 cm, deux ou trois doigts, sous le creux de
// l'aisselle. Le poids va dans les mains, coudes tendus, jamais dans l'aisselle ; le haut se serre
// contre les côtes, il ne porte pas. Une béquille seule se tient sous le bras du côté sain : on
// avance la béquille et le pied blessé ensemble, puis le bon pied passe devant ; on tourne en
// pivotant sur le bon pied.
// Cotes : « taille » (le blessé debout) et « 50 mm » (sous le creux). La longueur, taille moins
// 400 mm, est cotée sur la 24-06b.
// Le blessé : le personnage de formes.js (1750 ; épaule à 1420, creux de l'aisselle à 1325), vu de
// son côté droit ; le côté sain est le droit, la cheville blessée la gauche. De face, un buste
// dessiné ici aux mêmes proportions (tête 230, épaules 490 hors tout, poitrine 320 sous
// l'aisselle, bras de 88), coupé au-dessus des coudes.
// Géométrie de dessin, jamais imprimée (mm) : béquille de 32 au pied, branches de 22 à 20, 190
// hors tout à la poignée ; le bout posé 330 devant le pied du personnage, 300 devant l’aisselle ; rembourrage de 82 sur 80, 44 d’épais vu de
// face ; empreintes de semelle de 270 × 100, pas de 300.
// Repère de la béquille : u le long de la perche, du bout (0) vers le haut (L) ; v en travers,
// dans le plan de la fourche (+ vers l'avant du blessé).
module.exports = (h) => {
  const A = h.a, F = h.formes;
  const f = v => Math.round(v * 10) / 10;
  const BLANC = '#FFFFFF';
  const blanc = at => at.replace('fill="none"', `fill="${BLANC}"`);
  const rappel = A.fin + ' stroke-dasharray="2 3"';
  const NL = String.fromCharCode(10);
  const dP = (pts, ferme) => pts.map((p, i) => `${i ? 'L' : 'M'}${f(p[0])} ${f(p[1])}`).join(' ') + (ferme ? ' Z' : '');
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]], sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const mul = (a, k) => [a[0] * k, a[1] * k], nrm = a => Math.hypot(a[0], a[1]);
  const uni = a => mul(a, 1 / nrm(a));
  const tourne = (p, c, deg) => { const t = deg * Math.PI / 180, d = sub(p, c);
    return [c[0] + d[0] * Math.cos(t) - d[1] * Math.sin(t), c[1] + d[0] * Math.sin(t) + d[1] * Math.cos(t)]; };
  let nClip = 0;
  // découpe : ne garde que l'intérieur des polygones, ou tout sauf eux (hors = true, dans le cadre)
  const decoupe = (svg, polys, hors, cadre) => {
    const id = `p2406a-${++nClip}`;
    const d = (hors ? dP(cadre, true) + ' ' : '') + polys.map(p => dP(p, true)).join(' ');
    return `<clipPath id="${id}"><path d="${d}" clip-rule="evenodd" fill="none"/></clipPath>${NL}<g clip-path="url(#${id})">${NL}${svg}${NL}</g>`;
  };
  // Catmull-Rom : une suite de points lisses (ferme : la courbe se referme)
  const lisse = (P, n = 8, ferme = false) => {
    const N = P.length, g = i => ferme ? P[(i + N) % N] : P[Math.max(0, Math.min(N - 1, i))], out = [];
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
  const miroir = pts => pts.map(p => [p[0], -p[1]]);

  // ── le blessé et la béquille en place (mm, repère du personnage : sol en y = 0, face vers +x) ──
  const S = [8.4, -1420];                    // l'épaule proche (la droite)
  const T = [330, 0], P = [30, -1275];       // le bout, un peu devant le pied ; le haut, 50 sous le creux
  const L = nrm(sub(P, T));
  const ax = uni(sub(P, T)), bx = [-ax[1], ax[0]];
  const enPlace = (u, v) => add(add(T, mul(ax, u)), mul(bx, v));
  const THETA = Math.atan2(bx[0], -bx[1]) * 180 / Math.PI + 5;
  const DIAM = 22;
  // la traverse tombe là où arrive la main, le bras tendu
  const poignetA = u => F.main({ x: enPlace(u, 0)[0], y: enPlace(u, 0)[1], pose: 'prise', vue: 'dos', angle: THETA, diametre: DIAM, echelle: 1 }).poignet;
  let lo = 600, hi = 950;
  for (let i = 0; i < 40; i++) { const m = (lo + hi) / 2; if (nrm(sub(poignetA(m), S)) > 552) lo = m; else hi = m; }
  const uC = (lo + hi) / 2, uF = uC - 170, uR = 60;

  // la béquille dans son repère (u, v)
  const bordExt = [[0, 16], [200, 15.6], [uF - 120, 14.8], [uF - 40, 15], [uF + 5, 19], [uF + 45, 34], [uF + 100, 55], [uC, 76],
    [uC + 90, 92], [uC + 220, 96], [L - 230, 86], [L - 150, 60], [L - 95, 30], [L - 60, 21], [L - 27, 20]];
  const bordInt = [[uF, 0], [uF + 30, 6], [uF + 100, 33], [uC, 54], [uC + 90, 70], [uC + 220, 74], [L - 230, 64], [L - 150, 38],
    [L - 95, 9], [L - 60, 0.5], [L - 27, 0]];
  const ext = lisse(bordExt), int = lisse(bordInt);
  const silhouette = [...miroir(ext), ...miroir(int).reverse(), ...int, ...ext.slice().reverse()];
  const coussinPts = lisse([[L - 82, -30], [L - 76, -29], [L - 70, -27], [L - 56, -38], [L - 32, -40], [L - 10, -30], [L, 0],
    [L - 10, 30], [L - 32, 40], [L - 56, 38], [L - 70, 27], [L - 76, 29], [L - 82, 30]]);

  function bequille(M, o = {}) {
    const at = o.trait || A.arete, det = A.detail;
    const Mp = pts => pts.map(p => M(p[0], p[1]));
    const out = [];
    if (o.cache) {
      out.push(h.path(dP(Mp(silhouette), true), A.cache));
      out.push(h.path(dP(Mp(coussinPts), false), A.cache));
      return out.join(NL);
    }
    out.push(h.path(dP(Mp(silhouette), true), blanc(at)));
    out.push(h.path(dP(Mp([[0, -16], [0, 16]])), at));
    // l'anneau à neige, par la tranche
    out.push(h.path(dP(Mp([[uR - 6, -80], [uR + 6, -80], [uR + 6, 80], [uR - 6, 80]]), true), blanc(at)));
    // la traverse
    out.push(h.path(dP(Mp([[uC - 11, -100], [uC + 11, -100], [uC + 11, 100], [uC - 11, 100]]), true), blanc(at)));
    for (const s of [1, -1]) {
      const vm = s * 65, du = 14, dv = 15;
      out.push(h.path(dP(Mp([[uC - du, vm - dv], [uC + du, vm - dv], [uC + du, vm + dv], [uC - du, vm + dv]]), true), blanc(det)));
      out.push(h.path(dP(Mp([[uC - du, vm - dv + 4], [uC + du, vm + dv - 4]])), det), h.path(dP(Mp([[uC - du, vm + dv - 4], [uC + du, vm - dv + 4]])), det));
    }
    // le rembourrage
    out.push(h.path(dP(Mp(coussinPts), true), blanc(at)));
    out.push(h.path(dP(Mp([[L - 72.5, -29], [L - 67.5, -29], [L - 67.5, 29], [L - 72.5, 29]]), true), blanc(det)));
    return out.join(NL);
  }

  const C = enPlace(uC, 0);
  const W = F.main({ x: C[0], y: C[1], pose: 'prise', vue: 'dos', angle: THETA, diametre: DIAM, echelle: 1, bras: 30 }).poignet;
  const dirBras = uni(sub(W, S)), nBras = [-dirBras[1], dirBras[0]];
  const E = add(S, mul(dirBras, 300));       // le coude

  // ── le buste de face (x vers la gauche du blessé, d sous le sommet du crâne ; mm) ──
  // Le côté de la béquille (le droit du blessé) est à gauche du dessin : σ = −1.
  const J = [185, 345];                                    // l'articulation de l'épaule, côté +
  const flanc = [[158, 430], [150, 480], [140, 550], [128, 632]];
  const flancX = d => { for (let i = 0; i < flanc.length - 1; i++) { const a = flanc[i], b = flanc[i + 1];
    if (d <= b[1]) return a[0] + (b[0] - a[0]) * (d - a[1]) / (b[1] - a[1]); } return flanc[flanc.length - 1][0]; };
  const DCOUPE = 632;
  const brasFace = alpha => {
    const t = alpha * Math.PI / 180, dir = [Math.sin(t), Math.cos(t)], n = [Math.cos(t), -Math.sin(t)];
    const larg = u => u < 300 ? 44 - 4 * u / 300 : 40;
    const bord = (u, s) => add(add(J, mul(dir, u)), mul(n, s * larg(u)));
    const tFin = (DCOUPE - J[1]) / dir[1];
    // le creux : là où le dedans du bras quitte le flanc
    let t0 = 20;
    while (t0 < 300 && bord(t0, -1)[0] < flancX(bord(t0, -1)[1])) t0 += 1;
    const dehors = [[182, 307], [212, 317], [233, 335], [244, 368], ...[80, 160, 240].map(u => bord(u, 1)), [bord(tFin, 1)[0], DCOUPE]];
    const dedans = [...[t0, t0 + 50, 150, 220].filter((u, i, a) => i === 0 || u > a[i - 1] + 20).map(u => bord(u, -1)), [bord(tFin, -1)[0], DCOUPE]];
    return { dehors: lisse(dehors), dedans: lisse(dedans), creux: bord(t0, -1), dir };
  };
  const ALPHA_B = 13, ALPHA_A = 7;
  const brasB = brasFace(ALPHA_B), brasA = brasFace(ALPHA_A);
  const creux = brasB.creux;                               // le creux de l'aisselle, côté béquille
  const dHaut = creux[1] + 50;                             // le haut du rembourrage : 50 sous le creux
  const xT = flancX(dHaut + 35) + 22 - 2;                  // l'axe de la béquille : le rembourrage touche les côtes
  const INCL = 10;                                         // la béquille penche un peu vers le dehors, vers la main

  // ── les empreintes (mm, vues de dessus, la marche vers le haut) ──
  const semelle = lisse([[0, 128], [30, 122], [42, 100], [44, 60], [44, 20], [48, -30], [52, -70], [50, -100], [38, -122], [15, -134],
    [-12, -135], [-36, -124], [-48, -100], [-48, -60], [-38, -15], [-32, 25], [-34, 70], [-38, 100], [-30, 122]], 6, true);

  return {
    ref: '24-06a',
    titre: 'La béquille de fourche, en place',
    desc: 'Un blessé debout, vu de côté, tient une béquille faite d’un jeune arbre fourchu sous le bras du côté sain : la perche part du sol un peu devant le pied, fourche un peu sous la main, et ses deux branches passent de chaque côté du bras avant de se rejoindre sous l’aisselle, derrière le bras (en tireté). La main serre une traverse liée entre les branches, le bras tendu. La taille du blessé est cotée. De face, le haut rembourré de la béquille est serré contre les côtes, entre le bras et le flanc, et s’arrête 50 mm, deux ou trois doigts, sous le creux de l’aisselle. En bas, trois temps vus de dessus avec des empreintes de semelle : la béquille et le pied blessé (hachuré) avancent ensemble ; le bon pied passe devant ; on tourne en pivotant sur le bon pied.',
    format: 'pleine',
    disposition: [['place', 'face'], ['pas']],
    hauteurs: [3, 1.05],
    largeurs: [[1, 1.05], [1]],
    vues: {
      // ─── le blessé debout, de côté ───
      place: (() => {
        const geo = z => {
          const s = (z.h - 14) / 1765, g = z.h - 6;
          const x0 = (z.l - 740 * s) / 2 + 150 * s;
          const V = p => [x0 + s * p[0], g + s * p[1]];
          return { s, g, x0, V };
        };
        return {
          titre: 'De côté',
          dessin: z => {
            const { s, g, x0, V } = geo(z);
            const cadre = [[0, 0], [z.l, 0], [z.l, z.h], [0, z.h]];
            const out = [];
            out.push(h.rect(4, g, z.l - 8, 5, A.hachure('terre', 'aucun')));
            out.push(h.ligne(4, g, z.l - 4, g, A.arete));
            // le blessé ; sa main pendante est effacée, la main de formes.js la remplace sur la traverse
            const pers = F.personnage({ x: x0, y: g, echelle: s, mains: { proche: V(W) } });
            const dMain = uni(sub(W, E)), nM = [-dMain[1], dMain[0]];
            const effaceMain = [add(add(W, mul(dMain, 22)), mul(nM, 40)), add(add(W, mul(dMain, 230)), mul(nM, 40)),
              add(add(W, mul(dMain, 230)), mul(nM, -40)), add(add(W, mul(dMain, 22)), mul(nM, -40))].map(V);
            out.push(decoupe(String(pers), [effaceMain], true, cadre));
            // la béquille : pleine hors du bras, en tireté derrière lui
            const bras = [add(S, mul(nBras, -52)), add(E, mul(nBras, -41)), add(W, mul(nBras, -25)), add(W, mul(nBras, 26)),
              add(E, mul(nBras, 42)), add(S, mul(nBras, 52)), add(S, mul(dirBras, -60))].map(V);
            const Mb = (u, v) => V(enPlace(u, v));
            out.push(decoupe(bequille(Mb), [bras], true, cadre));
            const c = V(C);
            out.push(String(F.main({ x: c[0], y: c[1], pose: 'prise', vue: 'dos', angle: THETA, diametre: DIAM * s, echelle: s, bras: 30 })));
            // la taille
            const xc = V([500, 0])[0], yt = V([0, -1748])[1];
            out.push(h.ligne(V([60, -1748])[0], yt, xc + 5, yt, rappel));
            out.push(h.cote(xc, g, xc, yt, 'taille', { cote: 'droite' }));
            return out.join(NL);
          },
          renvois: z => {
            const { V } = geo(z);
            const tr = V(enPlace(uC, -90)), coude = V(add(E, mul(nBras, 38))), perche = V(enPlace(330, -15));
            return [
              { n: 1, rond: [14, Math.round(coude[1]) - 40], cible: coude, texte: 'coude tendu : le poids dans les mains' },
              { n: 2, rond: [14, Math.round(tr[1])], cible: tr, texte: 'traverse-poignée : là où tombe la main' },
              { n: 3, rond: [14, Math.round(perche[1]) + 20], cible: perche, texte: 'sous le bras du côté sain' },
            ];
          },
        };
      })(),

      // ─── de face : le haut de la béquille sous l'aisselle ───
      face: (() => {
        const geo = z => {
          const s = Math.min((z.l - 16) / 560, (z.h - 30) / DCOUPE);
          const cx = z.l / 2 + 16 * s, top = 8;
          const V = p => [cx + s * p[0], top + s * p[1]];
          return { s, cx, top, V };
        };
        const cote = (σ, pts) => pts.map(p => [σ * p[0], p[1]]);
        return {
          titre: 'De face, sous l’aisselle',
          dessin: z => {
            const { s, V } = geo(z);
            const Vp = pts => pts.map(V);
            const out = [];
            // le tronc
            const tronc1 = [[56, 262], [100, 283], [145, 297], [182, 307], [205, 340], [195, 390], ...flanc];
            const tronc = [...cote(-1, tronc1), ...cote(1, tronc1).reverse()];
            out.push(h.path(dP(Vp(tronc), true), A.blanc));
            for (const σ of [-1, 1]) {
              out.push(h.path(dP(Vp(cote(σ, lisse([[56, 262], [100, 283], [145, 297], [182, 307]])))), A.contour));
              const cr = (σ < 0 ? brasB : brasA).creux;
              out.push(h.path(dP(Vp(cote(σ, lisse([cr, ...flanc.filter(p => p[1] > cr[1] + 25)])))), A.contour));
              // clavicule et bord du pectoral, au trait fin
              out.push(h.path(dP(Vp(cote(σ, lisse([[22, 292], [80, 298], [140, 294], [172, 304]])))), A.detail));
              out.push(h.path(dP(Vp(cote(σ, lisse([add(cr, [-3, 6]), [118, 494], [72, 506], [32, 502]])))), A.detail));
            }
            // le cou et la tête
            const tete = lisse([[0, 0], [48, 12], [70, 50], [76, 100], [72, 145], [60, 185], [40, 215], [18, 229], [0, 232],
              [-18, 229], [-40, 215], [-60, 185], [-72, 145], [-76, 100], [-70, 50], [-48, 12]], 8, true);
            const cou = [[-52, 205], [-56, 262], [56, 262], [52, 205]];
            out.push(h.path(dP(Vp(cou), true), A.blanc));
            for (const σ of [-1, 1]) {
              out.push(h.path(dP(Vp(cote(σ, lisse([[52, 200], [54, 235], [57, 262], [64, 268]])))), A.contour));
              out.push(h.path(dP(Vp(cote(σ, lisse([[73, 96], [84, 104], [87, 128], [80, 152], [70, 160]], 6)))), blanc(A.contour)));
            }
            out.push(h.path(dP(Vp(tete), true), blanc(A.contour)));
            // les bras
            for (const [σ, b] of [[1, brasA], [-1, brasB]]) {
              const fond = [...b.dehors, ...b.dedans.slice().reverse(), [J[0] - 30, J[1]]];
              out.push(h.path(dP(Vp(cote(σ, fond)), true), A.blanc));
              out.push(h.path(dP(Vp(cote(σ, b.dehors))), A.contour));
              out.push(h.path(dP(Vp(cote(σ, b.dedans))), A.contour));
            }
            // la béquille par la tranche : la perche, puis le rembourrage serré entre le bras et les côtes
            const c0 = [-xT, dHaut + 50];
            const R = p => tourne([-xT + p[0], dHaut + p[1]], c0, INCL);
            const perche = [[-10, 82], [10, 82], [11 + 0, DCOUPE - dHaut + 40], [-10, DCOUPE - dHaut + 40]].map(R);
            out.push(decoupe(h.path(dP(Vp(perche), true), blanc(A.arete)), [[[-1000, 0], [1000, 0], [1000, DCOUPE], [-1000, DCOUPE]].map(V)], false));
            const tampon = lisse([[-15, 85], [-13, 77], [-11, 70], [-21, 56], [-22, 28], [-14, 7], [0, 0], [14, 7], [22, 28], [21, 56],
              [11, 70], [13, 77], [15, 85]]).map(R);
            out.push(h.path(dP(Vp(tampon), true), blanc(A.arete)));
            out.push(h.path(dP(Vp(lisse([[-11, 62], [-14, 36], [-6, 12]], 6).map(R))), A.fin));
            out.push(h.path(dP(Vp(lisse([[10, 62], [13, 38], [6, 14]], 6).map(R))), A.fin));
            out.push(h.path(dP(Vp([[-12, 67.5], [12, 67.5], [12, 72.5], [-12, 72.5]].map(R)), true), blanc(A.detail)));
            // la cote : du creux au haut du rembourrage
            const top = R([0, 0]);
            const xq = V([-30, 0])[0];
            out.push(h.ligne(V(creux.map((v, i) => i ? v : -v))[0] + 3, V(creux)[1], xq + 5, V(creux)[1], rappel));
            out.push(h.ligne(V(top)[0] + 3, V(top)[1], xq + 5, V(top)[1], rappel));
            out.push(h.cote(xq, V(creux)[1], xq, V(top)[1], '50 mm', { cote: 'droite' }));
            return out.join(NL);
          },
          renvois: z => {
            const { V } = geo(z);
            const c0 = [-xT, dHaut + 50];
            const R = p => tourne([-xT + p[0], dHaut + p[1]], c0, INCL);
            const creuxV = V([-creux[0] - 4, creux[1] + 22]), cotes = V(R([21, 45]));
            return [
              { n: 4, rond: [14, Math.round(creuxV[1]) - 70], cible: creuxV, texte: 'deux ou trois doigts sous le creux' },
              { n: 5, rond: [Math.round(V([60, 0])[0]), Math.round(cotes[1]) + 60], cible: cotes, texte: 'serré contre les côtes, sans porter' },
            ];
          },
        };
      })(),

      // ─── le pas, vu de dessus ───
      pas: (() => {
        const geo = z => {
          const s = (z.h - 12) / 890;
          const cy = z.h - 6 - 140 * s;
          const xs = [z.l * 0.17, z.l * 0.5, z.l * 0.83];
          return { s, cy, xs };
        };
        return {
          titre: 'Le pas, vu de dessus',
          dessin: z => {
            const { s, cy, xs } = geo(z);
            const out = [];
            const pied = (x0, [px, py], cote, o = {}) => {
              const ang = o.angle || 0, piv = o.pivot || [0, 0];
              const pts = semelle.map(p => [cote * p[0], p[1]]).map(p => tourne(p, piv, ang)).map(p => [x0 + s * (px + p[0]), cy + s * (py + p[1])]);
              const talon = [[-34, 58], [44, 58]].map(p => [cote * p[0], p[1]]).map(p => tourne(p, piv, ang)).map(p => [x0 + s * (px + p[0]), cy + s * (py + p[1])]);
              if (o.fantome) return [h.path(dP(pts, true), A.cache), h.path(dP(talon), A.cache)].join(NL);
              return [h.path(dP(pts, true), o.blesse ? A.hachure('bois', 'arete') : blanc(A.arete)), h.path(dP(talon), A.detail)].join(NL);
            };
            const anneau = (x0, [px, py], fantome) => {
              const c = [x0 + s * px, cy + s * py], r = 80 * s;
              if (fantome) return h.cercle(c[0], c[1], r, A.cache);
              return [h.cercle(c[0], c[1], r, blanc(A.arete)), h.ligne(c[0] - r, c[1], c[0] + r, c[1], A.fin), h.ligne(c[0], c[1] - r, c[0], c[1] + r, A.fin),
                h.cercle(c[0], c[1], 16 * s, A.hachure('bois', 'detail'))].join(NL);
            };
            const fl = (x0, a, b) => h.fleche(`M${f(x0 + s * a[0])} ${f(cy + s * a[1])} L${f(x0 + s * b[0])} ${f(cy + s * b[1])}`);
            // 1 : la béquille et le pied blessé avancent ensemble
            let x = xs[0];
            out.push(pied(x, [-75, 0], -1, { fantome: true }), anneau(x, [235, -40], true));
            out.push(pied(x, [75, 0], 1), pied(x, [-75, -300], -1, { blesse: true }), anneau(x, [235, -340]));
            out.push(fl(x, [-150, -10], [-150, -300]), fl(x, [335, -50], [335, -330]));
            // 2 : le bon pied passe devant
            x = xs[1];
            out.push(pied(x, [75, 0], 1, { fantome: true }));
            out.push(pied(x, [-75, -300], -1, { blesse: true }), anneau(x, [235, -340]), pied(x, [75, -600], 1));
            out.push(fl(x, [75, -150], [75, -455]));
            // 3 : on tourne en pivotant sur le bon pied
            x = xs[2];
            const piv = [0, -80];
            out.push(pied(x, [0, -300], 1, { fantome: true }), pied(x, [0, -300], 1, { angle: 55, pivot: piv }));
            const cp = [0, -380], r = 150;
            const arc = [];
            for (let k = 0; k <= 16; k++) { const a = (-100 + 62 * k / 16) * Math.PI / 180; arc.push([x + s * (cp[0] + r * Math.cos(a)), cy + s * (cp[1] + r * Math.sin(a))]); }
            out.push(h.fleche(dP(arc)));
            return out.join(NL);
          },
          renvois: z => {
            const { s, cy, xs } = geo(z);
            return [
              { n: 6, rond: [Math.round(xs[0] - s * 330), Math.round(cy - s * 330)], cible: [xs[0] - s * 95, cy - s * 330], texte: 'pied blessé et béquille avancent ensemble' },
              { n: 7, rond: [Math.round(xs[1] - s * 300), Math.round(cy - s * 600)], cible: [xs[1] + s * 40, cy - s * 600], texte: 'puis le bon pied passe devant' },
              { n: 8, rond: [Math.round(xs[2] - s * 300), Math.round(cy - s * 380)], cible: [xs[2] - s * 45, cy - s * 380], texte: 'on tourne en pivotant sur le bon pied' },
            ];
          },
        };
      })(),
    },
  };
};
