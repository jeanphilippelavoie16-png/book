// Planche 73-07 — la glacière de blocs de lac (chapitre 73, Le froid naturel ; ancien 68).
// Cotes tirées du chapitre : 30 cm d'isolant sec dessous, sur les côtés et dessus ; un cube
// d'environ 1,8 m de côté (la famille de ferme, 4,5 t). La coupe est à l'échelle de ces deux
// chiffres. Le lit de branches, le gravier et le drain n'ont pas de cote dans le chapitre :
// ils n'en ont pas ici.

const NOIR = '#1A1A1A';
const blanc = (a) => a.replace('fill="none"', 'fill="#FFFFFF"');
const corde = (d) => [
  `<path d="${d}" fill="none" stroke="${NOIR}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`,
  `<path d="${d}" fill="none" stroke="#FFFFFF" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>`,
].join('\n');
// une perche : un long rectangle blanc au trait d'arête, bouts arrondis
const perche = (x1, y1, x2, y2, r = 2.6) => {
  const L = Math.hypot(x2 - x1, y2 - y1), nx = -(y2 - y1) / L * r, ny = (x2 - x1) / L * r;
  const p = (x, y) => `${x.toFixed(1)} ${y.toFixed(1)}`;
  return `<path d="M ${p(x1 + nx, y1 + ny)} L ${p(x2 + nx, y2 + ny)} A ${r} ${r} 0 0 0 ${p(x2 - nx, y2 - ny)} L ${p(x1 - nx, y1 - ny)} A ${r} ${r} 0 0 0 ${p(x1 + nx, y1 + ny)} Z" fill="#FFFFFF" stroke="${NOIR}" stroke-width="1.4" stroke-linejoin="round"/>`;
};
const pts = (arr) => arr.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`);

module.exports = (h) => {
  // ── Géométrie de la coupe : tout en mètres × s ──
  const gc = (z) => {
    const s = Math.min(76, (z.h - 78) / 3.55);
    const yG = 66;                              // sol au bord de la fosse
    const xL = 92, W = 2.4 * s, xR = xL + W;    // parois de la fosse
    const e = 0.3 * s;                          // 30 cm d'isolant
    const yGlH = yG + e, yGlB = yG + 2.1 * s;   // haut et bas de la glace
    const yBr = yG + 2.4 * s, yGr = yG + 2.52 * s;   // dessus des branches, dessus du gravier
    const yFL = yG + 2.66 * s, yFR = yG + 2.86 * s;  // fond en pente vers la droite
    const d = 0.25 * s;                         // hauteur de la tranchée de drain
    const xT = xR + 70, yT = yG + 3;            // rebord de la pente
    const xB = Math.min(z.l - 30, xR + 250), yB = yFR + 0.9 * s;   // pied de la pente
    const pente = (x) => yT + (yB - yT) * (x - xT) / (xB - xT);
    const g = 0.13;                             // le drain descend vers la pente
    const drain = (x, dy = 0) => yFR - dy + g * (x - xR);
    const coupe = (dy) => {                     // où la ligne du drain perce la pente
      let a = xT, b = xB;
      for (let i = 0; i < 40; i++) { const m = (a + b) / 2; if (drain(m, dy) > pente(m)) a = m; else b = m; }   // encore sous terre : plus loin
      return [(a + b) / 2, pente((a + b) / 2)];
    };
    const sortB = coupe(0), sortH = coupe(d);
    return { s, yG, xL, W, xR, e, yGlH, yGlB, yBr, yGr, yFL, yFR, d, xT, yT, xB, yB, pente, drain, sortB, sortH };
  };

  // ── Projection oblique pour le lac et l'anse ──
  const obl = (ox, oy, k = 1) => (u, v, w = 0) => [ox + k * (u + v * 0.55), oy - k * (w + v * 0.38)];

  // ── Géométrie du lac ──
  const gl = (z) => {
    const k = Math.min(1, (z.l - 20) / 352, (z.h - 8) / 214);
    const bu = 58, bv = 50, t = 30, wE = -0.14 * t;
    const U0 = -24, U1 = 3 * bu + 22, V1 = 3 * bv + 14;
    const P = obl(12 + k * (70), z.h - 10 - k * 32, k);
    return { k, bu, bv, t, wE, U0, U1, V1, P };
  };

  // ── Géométrie de l'anse ──
  const ga = (z) => {
    const P = obl(4, z.h * 0.7, 1);
    const bl = { u: 64, v: 42, w: 30 };
    // élévation à droite : bord de la plaque, eau, bloc qui bascule
    const xe = z.l - 88, yEau = z.h - 64, T = 26;     // bord de la plaque, niveau d'eau, épaisseur
    const a = -28 * Math.PI / 180, bw = 60, bh = 27;
    const c0 = [xe + 2, yEau - 3];                      // arête avant basse posée sur le bord
    const B = (x, y) => [c0[0] - x * Math.cos(a) + y * Math.sin(a), c0[1] - x * Math.sin(a) - y * Math.cos(a)];
    const r2 = B(-4, bh + 1), tir = [z.l - 12, 16];
    const libre = (t) => [r2[0] + 10 + (tir[0] - 30 - r2[0]) * t, r2[1] - 8 + (tir[1] + 26 - r2[1]) * t];
    return { P, bl, xe, yEau, T, bw, bh, B, r2, tir, libre };
  };

  return {
    ref: '73-07',
    titre: 'La glacière de blocs de lac',
    desc: 'Glacière de blocs en coupe : fosse au bord d’une pente, lit de gravier et de branches, blocs de glace serrés dans 30 cm d’isolant sec partout, couvercle sur le dessus, drain qui sort plus bas que le fond. Dessous, la découpe des blocs sur le lac au trait de scie et à la tarière, et l’anse de corde gelée dans le bloc. L’encadré danger rappelle que la récolte affaiblit la glace où l’on se tient.',
    format: 'pleine',
    disposition: [['coupe'], ['lac', 'anse']],
    hauteurs: [1.5, 1],
    largeurs: [[1], [1.15, 1]],
    vues: {
      coupe: {
        titre: 'En coupe, au bord d’une pente',
        dessin: (z) => {
          const g = gc(z);
          const { s, yG, xL, W, xR, e, yGlH, yGlB, yBr, yGr, yFL, yFR, d, xT, yT, xB, yB, drain, sortB, sortH } = g;
          const L = z.l, H = z.h;
          const out = [];
          // terre : le sol plat, le rebord, la pente, le bas
          const sol = [[0, yG], [xL, yG], [xR, yG], [xT, yT], [xB, yB], [L, yB + 3]];
          out.push(h.chemin([...sol, [L, H], [0, H]], h.a.hachure('terre', 'aucun'), true));
          // fosse : on repeint l'intérieur
          out.push(h.chemin([[xL, yG], [xR, yG], [xR, yFR], [xL, yFL]], blanc(h.a.fin), true));
          // gravier du fond, pente vers le drain
          out.push(h.chemin([[xL, yGr], [xR, yGr], [xR, yFR], [xL, yFL]], h.a.hachure('gravier', 'aucun'), true));
          // tranchée du drain, pleine de gravier, jusqu'à la pente
          const tr = [[xR - 1, drain(xR, d)], sortH, sortB, [xR - 1, yFR]];
          out.push(h.chemin(tr, blanc(h.a.fin), true));
          out.push(h.chemin(tr, h.a.hachure('gravier', 'aucun'), true));
          out.push(h.chemin([[xR, drain(xR, d)], sortH], h.a.arete));
          out.push(h.chemin([[xL, yFL], [xR, yFR], sortB], h.a.contour));
          // lit de branches couchées en travers de la coupe
          out.push(h.rect(xL, yBr, W, yGr - yBr, h.a.blanc));
          const rb = (yGr - yBr) / 2;
          for (let x = xL + rb + 1, i = 0; x < xR - rb; x += 2 * rb + 1.2, i++) {
            const r = rb * (i % 3 === 1 ? 0.8 : i % 3 === 2 ? 0.92 : 1);
            out.push(h.cercle(x, yGr - r, r, blanc(h.a.detail)));
            out.push(h.cercle(x, yGr - r, r * 0.35, h.a.fin));
          }
          // isolant sec : dessous, côtés, chapeau
          out.push(h.rect(xL, yG, W, yBr - yG, h.a.hachure('isolant', 'aucun')));
          out.push(h.ligne(xL, yBr, xR, yBr, h.a.fin));
          // blocs serrés, quatre rangs, joints bourrés
          const xg0 = xL + e, xg1 = xR - e, jt = 3.4;
          const nr = 4, nc = 3, hr = (yGlB - yGlH) / nr, lc = (xg1 - xg0) / nc;
          const dec = [[0, 1.5, -1], [1, -1, 0.5], [-1, 0.5, 1], [0.5, 0, -1.5]];
          for (let r = 0; r < nr; r++) {
            for (let c = 0; c < nc; c++) {
              const x = xg0 + c * lc + (c ? jt / 2 : 0) + (c ? dec[r][c] : 0);
              const x2 = xg0 + (c + 1) * lc - (c < nc - 1 ? jt / 2 : 0) + (c < nc - 1 ? dec[r][c + 1] : 0);
              const y = yGlH + r * hr + (r ? jt / 2 : 0), y2 = yGlH + (r + 1) * hr - (r < nr - 1 ? jt / 2 : 0);
              out.push(h.rect(x, y, x2 - x, y2 - y, blanc(h.a.arete)));
            }
          }
          // parois de la fosse
          out.push(h.ligne(xL, yG, xL, yFL, h.a.contour));
          out.push(h.ligne(xR, yG, xR, drain(xR, d), h.a.contour));
          // sol de part et d'autre
          out.push(h.chemin([[0, yG], [xL - 20, yG]], h.a.contour));
          out.push(h.chemin([[xR + 20, yG], [xT, yT], [xB, yB], [L, yB + 3]], h.a.contour));
          // couvercle de planches jointives, débordant sur le sol, deux traverses dessus
          const n = 17, lp = (W + 40) / n;
          for (let i = 0; i < n; i++) out.push(h.rect(xL - 20 + i * lp, yG - 7, lp, 7, h.a.hachure('bois', 'detail')));
          out.push(h.rect(xL - 20, yG - 7, W + 40, 7, h.a.arete));
          for (const x of [xL - 14, xR + 4]) out.push(h.rect(x, yG - 12, 10, 5, blanc(h.a.arete)));
          // l'eau de fonte : à travers le fond, le long de la pente du fond, dans le drain, dehors
          const xm = xL + W * 0.34;
          const yM = (x) => yFL + (yFR - yFL) * (x - xL) / W - 5;
          out.push(h.fleche(`M ${xm} ${yGlB + 4} L ${xm} ${yM(xm) - 2} L ${xR - 2} ${yM(xR - 2)} L ${sortB[0] - 6} ${drain(sortB[0] - 6, d / 2)} L ${sortB[0] + 18} ${drain(sortB[0] - 6, d / 2) + 16}`, h.a.cache));
          out.push(h.fleche(`M ${xg1 + e / 2} ${yGlH + 30} L ${xg1 + e / 2} ${yGlB + 10}`, h.a.cache));
          // cotes : 30 cm et 1,8 m en travers, au-dessus du couvercle
          out.push(h.cote(xL, yG - 24, xg0, yG - 24, '30 cm'));
          out.push(h.cote(xg0, yG - 48, xg1, yG - 48, '1,8 m'));
          // cotes verticales, côté pente : chapeau, glace, dessous
          const xv = xR + 14;
          out.push(h.cote(xv, yG, xv, yGlH, '30 cm', { cote: 'droite' }));
          out.push(h.cote(xv, yGlH, xv, yGlB, '1,8 m', { cote: 'droite' }));
          out.push(h.cote(xv, yGlB, xv, yBr, '30 cm', { cote: 'droite' }));
          return out.join('\n');
        },
        renvois: (z) => {
          const { s, yG, xL, W, xR, e, yGlH, yGlB, yBr, yGr, yFL, yFR, sortB, xB, yB } = gc(z);
          const xg0 = xL + e, lc = (W - 2 * e) / 3;
          return [
            { n: 1, rond: [28, yG - 22], cible: [xL - 17, yG - 5], texte: 'couvercle : ouvrir par le haut' },
            { n: 2, rond: [28, yG + e / 2 + 4], cible: [xL + 14, yG + e / 2 + 4], texte: 'chapeau épais d’isolant sec' },
            { n: 3, rond: [28, yGlH + 1.35 * s], cible: [xg0 + lc, yGlH + 1.35 * s], texte: 'blocs serrés, vides bourrés' },
            { n: 4, rond: [28, yBr + 4], cible: [xL + 24, (yBr + yGr) / 2], texte: 'lit de branches sur le gravier' },
            { n: 5, rond: [28, yFL + 20], cible: [xL + W * 0.3, yFL + (yFR - yFL) * 0.3 + 1], texte: 'fond en pente vers le drain' },
            { n: 6, rond: [sortB[0] + 42, sortB[1] - 40], cible: [sortB[0] + 1, sortB[1] - 7], texte: 'drain : sortie sous le fond' },
          ];
        },
      },

      lac: {
        titre: 'Découper les blocs, vu de biais',
        dessin: (z) => {
          const { k, bu, bv, t, wE, U0, U1, V1, P } = gl(z);
          const out = [];
          // eau libre, là où les blocs précédents sont partis, et le trou du dernier
          const vf = -bv - 16;
          out.push(h.chemin([P(U0 - 10, vf, wE), P(U1, vf, wE), P(U1, 0, wE), P(bu, 0, wE), P(bu, bv, wE), P(0, bv, wE), P(0, 0, wE), P(U0 - 10, 0, wE)], h.a.hachure('eau', 'aucun'), true));
          // la plaque : dessus
          out.push(h.chemin([P(U0, 0), P(0, 0), P(0, bv), P(bu, bv), P(bu, 0), P(U1, 0), P(U1, V1), P(U0, V1)], blanc(h.a.fin), true));
          // chant avant, au-dessus de l'eau
          for (const [a, b] of [[U0, 0], [bu, U1]]) out.push(h.chemin([P(a, 0), P(b, 0), P(b, 0, wE), P(a, 0, wE)], blanc(h.a.arete), true));
          // parois du trou : le fond (face avant du bloc de derrière) et le côté gauche
          out.push(h.chemin([P(0, bv), P(bu, bv), P(bu, bv, wE), P(0, bv, wE)], blanc(h.a.arete), true));
          out.push(h.chemin([P(0, 0), P(0, bv), P(0, bv, wE), P(0, 0, wE)], blanc(h.a.arete), true));
          // bords du trou et bord avant, en trait fort
          out.push(h.chemin([P(U0, 0), P(0, 0), P(0, bv), P(bu, bv), P(bu, 0), P(U1, 0)], h.a.arete));
          // la plaque continue : bords arrière et côtés en trait fin
          out.push(h.chemin([P(U0, 0, wE), P(U0, 0), P(U0, V1), P(U1, V1), P(U1, 0), P(U1, 0, wE)], h.a.fin));
          // traits de scie parallèles, de bout en bout
          for (const u of [0, bu, 2 * bu, 3 * bu]) out.push(h.chemin([P(u, u < bu + 1 ? bv : 0), P(u, V1)], h.a.arete));
          for (const u of [2 * bu, 3 * bu]) out.push(h.ligne(...P(u, 0), ...P(u, 0, wE), h.a.arete));
          // travers à la scie, derrière le premier rang
          out.push(h.chemin([P(bu, bv), P(3 * bu, bv)], h.a.arete));
          // travers à la tarière : trous rapprochés
          for (let u = 4; u <= 3 * bu - 3; u += 9.3) out.push(h.ellipse(...P(u, 2 * bv), 3.3 * k, 1.9 * k, blanc(h.a.detail)));
          // le bloc libre, qui flotte devant
          const f0 = 6, f1 = bu - 6, g0 = vf + 8, g1 = -10, wt = 0;
          out.push(h.chemin([P(f0, g0, wt), P(f1, g0, wt), P(f1, g1, wt), P(f0, g1, wt)], blanc(h.a.arete), true));
          out.push(h.chemin([P(f0, g0, wt), P(f1, g0, wt), P(f1, g0, wE), P(f0, g0, wE)], blanc(h.a.arete), true));
          out.push(h.chemin([P(f1, g0, wt), P(f1, g1, wt), P(f1, g1, wE), P(f1, g0, wE)], blanc(h.a.arete), true));
          // le levier dans le trait de derrière, manche tiré vers l'arrière
          const tip = P(1.5 * bu, bv, 0), top = P(1.5 * bu, bv + 58, 96);
          out.push(perche(tip[0], tip[1], top[0], top[1]));
          const a1 = P(1.5 * bu + 8, bv + 52, 92), a2 = P(1.5 * bu + 8, bv + 84, 62);
          out.push(h.fleche(`M ${a1[0]} ${a1[1]} Q ${a2[0] + 2} ${a1[1] - 4} ${a2[0]} ${a2[1]}`, h.a.arete));
          // le bloc poussé vers l'eau
          const b1 = P(1.5 * bu + 4, 0.55 * bv, 2), b2 = P(1.5 * bu + 4, -0.3 * bv, 2);
          out.push(h.fleche(`M ${b1[0]} ${b1[1]} L ${b2[0]} ${b2[1]}`, h.a.arete));
          return out.join('\n');
        },
        renvois: (z) => {
          const { bu, bv, P, k } = gl(z);
          const c7 = P(3 * bu, 2.55 * bv), c8 = P(2.55 * bu, bv), c9 = P(1.5 * bu, bv + 30, 50), c10 = P(2.45 * bu, 2 * bv);
          return [
            { n: 7, rond: [z.l - 14, c7[1] - 26], cible: c7, texte: 'd’abord les traits parallèles' },
            { n: 8, rond: [z.l - 14, c8[1] + 14], cible: c8, texte: 'puis les travers' },
            { n: 9, rond: [c9[0] - 44, c9[1] - 6], cible: [c9[0] - 3, c9[1]], texte: 'levier dans le trait, on casse' },
            { n: 10, rond: [z.l - 14, c10[1] - 3], cible: c10, texte: 'sans scie : trous de tarière' },
          ];
        },
      },

      anse: {
        titre: 'L’anse de corde gelée',
        dessin: (z) => {
          const { P, bl, xe, yEau, T, bw, bh, B, r2, tir, libre } = ga(z);
          const out = [];
          const { u: U, v: V, w: Wb } = bl;
          // le bloc, vu de biais
          out.push(h.chemin([P(0, 0, 0), P(U, 0, 0), P(U, V, 0), P(0, V, 0)], blanc(h.a.arete), true));
          out.push(h.chemin([P(0, 0, 0), P(U, 0, 0), P(U, 0, -Wb), P(0, 0, -Wb)], blanc(h.a.arete), true));
          out.push(h.chemin([P(U, 0, 0), P(U, V, 0), P(U, V, -Wb), P(U, 0, -Wb)], blanc(h.a.arete), true));
          // la glace versée : une plaque mince qui couvre la boucle sur le dessus
          const gv = [P(15, 3, 0), P(49, 3, 0), P(51, 35, 0), P(13, 35, 0)];
          out.push(h.chemin(gv, h.a.fin, true));
          // la boucle : fermée derrière, pendue devant par-dessus le chant
          const b = [P(22, 0, 0), P(22, 29, 0), P(32, 34, 0), P(42, 29, 0), P(42, 0, 0)];
          const bas = P(32, 0, -23), g1 = P(22, 0, -12), d1 = P(42, 0, -12);
          out.push(corde(`M ${b[4][0]} ${b[4][1]} L ${b[3][0]} ${b[3][1]} Q ${b[2][0] + 6} ${b[2][1] - 4} ${b[2][0]} ${b[2][1]} Q ${b[2][0] - 8} ${b[2][1] + 1} ${b[1][0]} ${b[1][1]} L ${b[0][0]} ${b[0][1]} C ${g1[0] - 3} ${g1[1]} ${bas[0] - 12} ${bas[1] + 2} ${bas[0]} ${bas[1]} C ${bas[0] + 12} ${bas[1] - 2} ${d1[0] + 3} ${d1[1]} ${b[4][0]} ${b[4][1]}`));
          // la chaudière qui verse un filet d'eau sur la boucle
          const lv = P(20, 28, 58);
          const ang = 68 * Math.PI / 180, ca = Math.cos(ang), sa = Math.sin(ang);
          const R = (x, y) => [lv[0] + x * ca - y * sa, lv[1] + x * sa + y * ca];
          const Rs = (arr) => arr.map((p) => R(p[0], p[1]));
          // corps effilé vers le fond, bord roulé en ellipse ; repère : ouverture en y = 0, fond en y = 34
          out.push(h.path(`M ${pts(Rs([[-16, 0]]))} L ${pts(Rs([[-12, 34]]))} Q ${pts(Rs([[0, 38]]))} ${pts(Rs([[12, 34]]))} L ${pts(Rs([[16, 0]]))} Z`, blanc(h.a.arete)));
          out.push(h.path(`M ${pts(Rs([[-12, 34]]))} Q ${pts(Rs([[0, 30]]))} ${pts(Rs([[12, 34]]))}`, h.a.detail));
          const e0 = R(0, 0);
          out.push(h.chemin(Array.from({ length: 36 }, (_, i) => R(16 * Math.cos(i * Math.PI / 18), 4.5 * Math.sin(i * Math.PI / 18))), blanc(h.a.arete), true));
          const f0 = R(15, 2), cib = P(32, 19, 0);
          out.push(h.path(`M ${f0[0].toFixed(1)} ${f0[1].toFixed(1)} Q ${(f0[0] - 6).toFixed(1)} ${(f0[1] + 12).toFixed(1)} ${cib[0].toFixed(1)} ${cib[1].toFixed(1)}`, h.a.detail));
          // à droite : on tire le bloc hors de l'eau par l'anse, il bascule sur le bord
          const Lz = z.l;
          out.push(h.rect(xe, yEau - 3, Lz - xe, T, blanc(h.a.fin)));
          out.push(h.rect(xe, yEau - 3, Lz - xe, T, h.a.arete));
          out.push(h.rect(xe - 76, yEau, 76, z.h - yEau, h.a.hachure('eau', 'aucun')));
          out.push(h.rect(xe, yEau + T - 3, Lz - xe, z.h - yEau - T + 3, h.a.hachure('eau', 'aucun')));
          out.push(h.ligne(xe - 76, yEau, xe, yEau, h.a.detail));
          // bloc incliné : son coin avant sur le bord de la plaque
          // repère du bloc : x vers l'arrière (gauche), y vers le haut
          const q = [B(0, 0), B(bw, 0), B(bw, bh), B(0, bh)];
          out.push(h.chemin(q, blanc(h.a.arete), true));
          // la corde prise dans la glace du dessus, puis libre vers la main
          const r0 = B(bw - 12, bh + 2), r1 = B(3, bh + 2);
          out.push(h.path(`M ${B(bw - 16, bh)[0]} ${B(bw - 16, bh)[1]} Q ${B(bw / 2, bh + 6)[0]} ${B(bw / 2, bh + 6)[1]} ${B(0, bh)[0]} ${B(0, bh)[1]}`, blanc(h.a.fin)));
          const fin = libre(1);
          out.push(corde(`M ${r0[0]} ${r0[1]} L ${r1[0]} ${r1[1]} Q ${r2[0]} ${r2[1]} ${r2[0] + 10} ${r2[1] - 8} L ${fin[0]} ${fin[1]}`));
          const fa = libre(1.12), fb = libre(1.55);
          out.push(h.fleche(`M ${fa[0]} ${fa[1]} L ${fb[0]} ${fb[1]}`, h.a.arete));
          return out.join('\n');
        },
        renvois: (z) => {
          const { P, xe, yEau, libre } = ga(z);
          const c13 = libre(0.55);
          const c11b = P(32, 0, -23), c12 = P(30, 19, 20);
          return [
            { n: 11, rond: [c11b[0] - 26, z.h - 11], cible: [c11b[0] - 3, c11b[1] + 2], texte: 'boucle sur le bloc froid' },
            { n: 12, rond: [c12[0] + 40, c12[1] - 10], cible: [c12[0] + 1, c12[1]], texte: 'filet d’eau, on laisse prendre' },
            { n: 13, rond: [c13[0] - 40, c13[1] - 20], cible: c13, texte: 'on tire : l’anse tient' },
          ];
        },
      },
    },
    danger: 'Récolter la glace affaiblit celle où l’on se tient : l’ouverture coupe la plaque et l’eau libre remonte autour. On mesure l’épaisseur le jour même, on n’y va jamais seul, jamais sans corde ni perche, et personne ne circule sur le pourtour du chantier.',
  };
};
