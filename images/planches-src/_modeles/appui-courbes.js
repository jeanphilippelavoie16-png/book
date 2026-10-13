// Modèle : main droite à plat qui appuie sur une planche — de profil (côté pouce) et vue du dos.
// Pas une planche du livre. dessiner(x, y, echelle, vue) est à porter dans formes.js.
//
// Repère en mm d'adulte, y vers le bas.
//   profil : origine au pli du poignet, sur le dessus de la planche ; x vers les doigts.
//   dos    : origine au milieu du pli du poignet ; x vers les doigts, y négatif côté pouce.
// Les courbes passent par des repères anatomiques posés à la main ; entre deux repères d'une
// même suite, les poignées sont tangentes (la courbe ne casse pas) ; une suite qui s'arrête fait
// un coin (fond d'une palmure, coupe de l'avant-bras).
//
// Repères, profil (y = hauteur au-dessus de la planche, en négatif) :
//   avant-bras coupé à x = -100, de -86 (dessus) à -36 (dessous) : 50 ; il monte à 24° environ
//   poignet : dessus (0, -47), un léger creux de la flexion dorsale ; dessous (-8, -8)
//   talon de la paume sur la planche de x = 2 à 40
//   dos de la main : bosse du carpe (22, -47), descend à la jointure de l'index (93, -31)
//   index : MCP 93 · IPP 140 · IPD 163 · bout 178 ; épaisseur 22 → 13 ; pulpes sur la planche
//   majeur derrière : son bout dépasse celui de l'index de 12 → 190
//   pouce, devant : base au poignet (10, -41) · MCP (52, -34) · IP (86, -28) · bout 119
//     épaisseur 20 → 16 ; dessous relevé de 6 à 7 mm au-dessus de la planche sous la pulpe
// Repères, dos (main posée, vue d'en haut) :
//   poignet : -29 … +29 (58) ; avant-bras coupé à x = -95 : -33 … +34
//   jointures MCP : index (92, -26) · majeur (97, -6) · annulaire (93, 13) · auriculaire (82, 30)
//   doigts (longueur dorsale depuis la MCP, axe, largeur) :
//     index 80, -7°, 20,6 → 16,6 · majeur 92, -1°, 21 → 17 · annulaire 86, +5°, 20 → 16
//     auriculaire 67, +10°, 17 → 14 ; bouts : index 171, majeur 189, annulaire 179, auriculaire 147
//   palmures dorsales à 21-22 mm au-delà des jointures, en U (poignées reculées de 3 mm)
//   pouce : base (8, -22), axe à -33°, MCP à 46 mm, IP à 78, bout à 103 ; largeur 22 → 18
//   palmure pouce-index : un U dont le fond est à (66, -34), au niveau de la MCP du pouce

function dessiner(x, y, s, vue = 'profil') {
  const N = '#000';
  const X = v => +(x + v * s).toFixed(1), Y = v => +(y + v * s).toFixed(1);
  const pt = p => `${X(p[0])} ${Y(p[1])}`;
  const trait = ep => `fill="none" stroke="${N}" stroke-width="${ep}" stroke-linecap="round" stroke-linejoin="round"`;
  // une suite de repères → courbes C tangentes ; k règle la tension (0 = droit, 1/6 = Catmull-Rom)
  const suite = (P, k = 1 / 6) => {
    let o = '';
    for (let i = 0; i < P.length - 1; i++) {
      const a = P[i - 1] || P[i], b = P[i], c = P[i + 1], e = P[i + 2] || P[i + 1];
      const c1 = [b[0] + (c[0] - a[0]) * k, b[1] + (c[1] - a[1]) * k];
      const c2 = [c[0] - (e[0] - b[0]) * k, c[1] - (e[1] - b[1]) * k];
      o += ` C${pt(c1)} ${pt(c2)} ${pt(c)}`;
    }
    return o;
  };
  // plusieurs suites bout à bout : coin entre elles
  // une chaîne dans la liste passe telle quelle (une courbe C écrite à la main entre deux suites)
  const trace = (...S) => `M${pt(S[0][0])}` + S.map(P => typeof P === 'string' ? P : suite(P)).join('');
  const out = [];
  const ep = { sil: 1.5, int: 0.9, det: 0.6, fin: 0.5 };

  if (vue === 'profil') {
    // ── la silhouette (dos de la main, majeur derrière l'index), ouverte à la coupe de l'avant-bras ──
    const dessus = [[-72, -74], [-40, -61.5], [-16, -51.5], [-3, -47.8], [10, -47.4], [26, -48], [46, -45.6],
      [68, -41.4], [86, -37.4], [96, -35], [104, -31.6], [114, -29], [126, -27.8], [138, -26.6], [146, -25.4],
      [156, -23], [166, -21], [176, -17.6], [183.4, -13.6]];
    const bout = [[183, -13.4], [188.6, -9.6], [190.6, -5], [189.4, -1.4], [186, 0]];
    const dessous = [[186, 0], [36, 0]];
    const talon = [[36, 0], [12, 0], [3, -1], [-3, -3.6], [-8, -8], [-20, -14.5], [-44, -22.6], [-72, -31]];
    const sil = trace(dessus, bout, dessous, talon);
    out.push(`<path d="${sil} Z" fill="#fff" stroke="none"/>`);
    out.push(`<path d="${sil}" ${trait(ep.sil)}/>`);

    // ── l'index devant le majeur : son bout, plus court de 12 ──
    // le dessus de l'index sort de derrière le pouce, juste sous celui du majeur, jusqu'au bout
    out.push(`<path d="${trace([[97.5, -34.6], [106, -30.4], [116, -27.6], [126, -25.8], [134, -24.6], [141, -23.6], [150, -21.8], [160, -20], [168, -18.2], [175, -14.6], [178.4, -9], [177.6, -3.6], [174.2, -0.5]])}" ${trait(ep.int)}/>`);

    // ── le pouce, devant tout : fond blanc fermé, contour ouvert (il naît dans le poignet) ──
    const pouceHaut = [[10, -40.6], [24, -36.8], [40, -34.6], [52, -33.8], [60, -32.6], [72, -30], [86, -27.8], [98, -26],
      [108, -24], [114.6, -20.4]];
    const pouceBout = [[114.6, -20.4], [118.6, -15.4], [119.4, -10], [117, -6.4], [111.6, -4.8]];
    const pouceBas = [[111.6, -4.8], [103, -4.8], [95, -6], [88, -7.6], [76, -8], [62, -7], [50, -4.8], [40, -1.8], [31, 0]];
    const pouce = trace(pouceHaut, pouceBout, pouceBas);
    out.push(`<path d="${pouce} L${pt([2, 0])} L${pt([2, -42])} Z" fill="#fff" stroke="none"/>`);
    out.push(`<path d="${pouce}" ${trait(ep.int)}/>`);

    const det = [
      // ongle du pouce, de chant sur le dessus de la dernière phalange
      trace([[101.8, -26], [101.4, -23.6], [103, -22.2]]),
      trace([[103, -22.2], [109, -21], [114, -18.2], [116.8, -14.2]]),
      // ongle de l'index
      trace([[165.4, -18.8], [165, -16], [166.4, -14.2], [171, -13.2], [175, -11.2], [177.2, -8.6]]),
      // ongle du majeur, qui dépasse
      trace([[183.2, -12.4], [186.2, -10.4], [188, -8]]),
    ];
    det.forEach(d => out.push(`<path d="${d}" ${trait(ep.det)}/>`));
    const fin = [
      // plis sur le côté de l'index : IPP (deux) et IPD
      trace([[137.4, -22.2], [136.4, -18], [137, -13.6]]),
      trace([[141.6, -21.8], [141, -18.4], [141.4, -15.4]]),
      trace([[161.4, -19.4], [160.6, -16], [161, -12.6]]),
      // pli de l'IP du pouce
      trace([[86.6, -27.6], [85.8, -25], [86.4, -22.8]]),
      // pli du poignet, en flexion dorsale
      trace([[-4.6, -47.4], [-2.6, -44], [-3, -40.6]]),
    ];
    fin.forEach(d => out.push(`<path d="${d}" ${trait(ep.fin)}/>`));
    return out.join('\n');
  }

  // ──────────────────────────── vue du dos ────────────────────────────
  const rad = Math.PI / 180;
  // repère local : u le long de l'axe, v en travers (v < 0 côté pouce)
  const local = (o, deg) => {
    const c = Math.cos(deg * rad), sn = Math.sin(deg * rad);
    return ([u, v]) => [o[0] + u * c - v * sn, o[1] + u * sn + v * c];
  };
  // un doigt, en repères : côté pouce (palmure → bout), bout, côté auriculaire (bout → palmure)
  const doigt = (o, deg, L, w0, w1, uw = 22) => {
    const T = local(o, deg);
    const h = u => (w0 + (w1 - w0) * u / L) / 2;
    const r = w1 / 2, uI = 0.47 * L, uD = 0.75 * L, uB = L - r * 1.1;
    const cote = sg => [[uw, sg * (h(uw) - 0.2)], [(uw + uI) / 2, sg * (h((uw + uI) / 2) - 0.2)],
      [uI, sg * (h(uI) + 0.5)], [(uI + uD) / 2, sg * (h((uI + uD) / 2) - 0.3)], [uD, sg * (h(uD) + 0.3)],
      [uB, sg * (r + 0.2)]];
    const a = cote(-1).map(T);
    const bout = [[uB, -r - 0.2], [L - r * 0.3, -r * 0.74], [L, 0], [L - r * 0.3, r * 0.74], [uB, r + 0.2]].map(T);
    const b = cote(1).reverse().map(T);
    return { a, bout, b, T, L, r, h };
  };
  const I = doigt([92, -26], -7, 80, 20.6, 16.6);
  const M = doigt([97, -5.5], -1, 92, 21.2, 17.2);
  const A = doigt([93, 14], 5, 86, 19.8, 16.2, 21);
  const P = doigt([83, 31.5], 10, 67, 17.2, 14.2, 21);
  // le pouce : base au poignet, axe à -30°
  const Tp = local([8, -22], -33);
  const pouceExt = [[46, -13.8], [58, -11.8], [70, -11.4], [80, -11.8], [90, -10.4]].map(Tp);
  const pouceBout = [[90, -10.4], [98.6, -7.6], [102.6, -1], [100, 6.4], [93, 9.4]].map(Tp);
  const pouceInt = [[93, 9.4], [80, 10.6], [70, 10.8], [62, 11.2]].map(Tp);
  // palmure entre deux doigts : un U arrondi, en retrait vers le poignet
  // palmure : un U, une seule courbe dont les poignées reculent de 3 mm dans l'axe des doigts
  const palm = (F, G, recul = 3) => {
    const p = F.b[F.b.length - 1], q = G.a[0];
    const ax = ([x0, y0], [x1, y1]) => { const n = Math.hypot(x1 - x0, y1 - y0); return [(x1 - x0) / n, (y1 - y0) / n]; };
    const tp = ax(F.b[F.b.length - 2], p), tq = ax(G.a[1], q);
    return [F.b, ` C${pt([p[0] + tp[0] * recul, p[1] + tp[1] * recul])} ${pt([q[0] + tq[0] * recul, q[1] + tq[1] * recul])} ${pt(q)}`, G.a];
  };
  const sil = trace(
    [[-70, -31.5], [-40, -30.6], [-16, -29], [-4, -29.4], [5, -32.4], [14, -38], [25, -46.4], ...pouceExt],
    pouceBout,
    [...pouceInt, [62.6, -40.4], [65.8, -34.6], [75, -31.6], [90, -33.4], [103, -36.8], ...I.a],
    I.bout, ...palm(I, M), M.bout, ...palm(M, A), A.bout, ...palm(A, P), P.bout,
    [...P.b.slice(0, -2), P.T([14, 9.4]), P.T([2, 9.8]), [66, 40.6], [40, 37.6], [16, 31.4], [2, 29.4], [-14, 29.2], [-40, 30.6], [-70, 32.5]],
  );
  out.push(`<path d="${sil} Z" fill="#fff" stroke="none"/>`);
  out.push(`<path d="${sil}" ${trait(ep.sil)}/>`);

  // ongles : un U ouvert vers le bout, sur la dernière phalange
  const ongle = (F, long) => {
    const T = F.T, L = F.L, wv = F.r * 0.6, u0 = L - long - 2.4;
    return trace([[L - 3.2, -wv * 0.95], [u0 + 3, -wv], [u0, -wv * 0.62], [u0 - 0.8, 0], [u0, wv * 0.62],
      [u0 + 3, wv], [L - 3.2, wv * 0.95]].map(T));
  };
  [[I, 11], [M, 12], [A, 11.5], [P, 9]].forEach(([F, l]) => out.push(`<path d="${ongle(F, l)}" ${trait(ep.det)}/>`));
  // ongle du pouce, de trois quarts : sur la moitié extérieure de la dernière phalange
  out.push(`<path d="${trace([[98, -6.4], [91, -6.8], [85, -5.8], [83.6, -2.4], [85, 0.8], [91, 1.8], [98.6, 0.6]].map(Tp))}" ${trait(ep.det)}/>`);

  const fin = [];
  // jointures MCP : un arc court sur la tête
  [I, M, A, P].forEach(F => fin.push(trace([[-0.4, -3.6], [0.4, -1.4], [0.4, 1.4], [-0.4, 3.6]].map(F.T))));
  // plis des IPP (deux) et des IPD (un)
  [I, M, A, P].forEach(F => {
    const uI = 0.47 * F.L, uD = 0.75 * F.L, w = F.h(uI) * 0.42, wd = F.h(uD) * 0.36;
    fin.push(trace([[uI - 1.4, -w], [uI - 0.4, 0], [uI - 1.4, w]].map(F.T)));
    fin.push(trace([[uI + 2.2, -w * 0.7], [uI + 2.9, 0], [uI + 2.2, w * 0.7]].map(F.T)));
    fin.push(trace([[uD, -wd], [uD + 0.7, 0], [uD, wd]].map(F.T)));
  });
  // pli de l'IP du pouce
  fin.push(trace([[78.4, -5.6], [77.6, 0], [78.4, 5.6]].map(Tp)));
  // tête du cubitus, côté auriculaire du poignet
  fin.push(trace([[-12, 23.4], [-5, 21.2], [2, 23.4]]));
  fin.forEach(d => out.push(`<path d="${d}" ${trait(ep.fin)}/>`));
  return out.join('\n');
}

module.exports = (h) => ({
  ref: 'modele',
  titre: 'La main à plat qui appuie',
  desc: 'Modèle : main droite à plat qui appuie sur une planche, de profil côté pouce et vue du dos.',
  fichier: '_modeles-appui-courbes.svg',
  format: 'pleine',
  disposition: [['profil'], ['dos']],
  hauteurs: [1, 1.15],
  vues: {
    profil: {
      titre: 'De profil, côté pouce',
      dessin: z => {
        const s = 2.1, x0 = 76 * s + 10, y0 = z.h * 0.78;
        return [h.rect(x0 - 76 * s, y0, 272 * s, 16 * s, h.a.hachure('bois', 'arete')), dessiner(x0, y0, s, 'profil')].join('\n');
      },
    },
    dos: {
      titre: 'Vue du dos',
      dessin: z => dessiner(72 * 2.1 + 10, z.h * 0.55, 2.1, 'dos'),
    },
  },
});
module.exports.dessiner = dessiner;
