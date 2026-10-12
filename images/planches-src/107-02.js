// Planche 107-02 — Les trois joints en coupe (ch. 84, §3 et §5.3 point 18).
// Soudure bout à bout chanfreinée : les pièces fondent avec l'apport, un seul morceau.
// Brasage à recouvrement, fort ou tendre : un film d'apport mince entre deux pièces intactes.
// En coupe, fort et tendre sont le même objet (le chapitre exige le jeu serré pour tout
// brasage) ; la différence est la température de l'apport, qui reste dans le texte.
// À droite, le raté du point 18 : le brasage à gros jeu, joint de remplissage qui ne tient rien.
module.exports = (h) => {
  const M = 12; // marge latérale dans chaque vue

  // Ligne de cassure (zigzag) verticale en x, de ya à yb.
  const zig = (x, ya, yb, s = 1) => {
    const T = yb - ya;
    return [[x, ya], [x, ya + 0.38 * T], [x - 4 * s, ya + 0.46 * T], [x + 4 * s, ya + 0.54 * T], [x, ya + 0.62 * T], [x, yb]];
  };
  const P = (pts) => pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');

  // ─── Soudure bout à bout, chanfrein en V ───────────────────────────────────────────
  const geoSoudure = (z) => {
    const c = z.l / 2, x0 = M + 12, x1 = z.l - M;
    const t = Math.min(z.h * 0.38, 86); // même échelle que les recouvrements (tp)
    const ym = z.h / 2 + 6;
    const y0 = ym - t / 2, yB = y0 + t;
    const g = 2, a = 0.55 * t, f = 0.14 * t, w = 5;
    const hc = 0.2 * t, hr = 0.12 * t;
    return { c, x0, x1, t, y0, yB, g, a, f, w, hc, hr };
  };
  // Ligne de fusion : au-delà du chanfrein d'origine. Points de la courbe de Bézier.
  const fusionPts = (s, sg) => {
    const { c, t, y0, yB, g, a, w } = s;
    const X = (dx) => c + sg * dx;
    return [[X(g + a + w), y0], [X(g + a * 0.9 + w), y0 + t * 0.3], [X(g + 9), yB - t * 0.35], [X(g + 5), yB]];
  };
  const surBezier = ([p0, p1, p2, p3], u) => {
    const v = 1 - u, A = v * v * v, B = 3 * v * v * u, C = 3 * v * u * u, D = u * u * u;
    return [A * p0[0] + B * p1[0] + C * p2[0] + D * p3[0], A * p0[1] + B * p1[1] + C * p2[1] + D * p3[1]];
  };
  const soudure = (z) => {
    const s = geoSoudure(z);
    const { c, x0, x1, t, y0, yB, g, a, f, w, hc, hr } = s;
    const tl = c - g - a - w, tr = c + g + a + w;           // pieds du cordon
    const rl = c - g - 5, rr = c + g + 5;                   // pieds de la racine
    const gauche = zig(x0, y0, yB).reverse();               // de yB à y0
    const droite = zig(x1, y0, yB);                         // de y0 à yB
    const dessus = `M${x0},${y0} L${tl},${y0} Q${c},${y0 - 2 * hc} ${tr},${y0} L${x1},${y0}`;
    const dessous = `M${x1},${yB} L${rr},${yB} Q${c},${yB + 2 * hr} ${rl},${yB} L${x0},${yB}`;
    const forme = `${dessus} ${P(droite).replace('M', 'L')} ${dessous.replace(/^M[^L]*/, '')} ${P(gauche).replace('M', 'L')} Z`;
    const F = (sg) => fusionPts(s, sg).map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`);
    const fusion = (sg) => { const q = F(sg); return `M${q[0]} C${q[1]} ${q[2]} ${q[3]}`; };
    const [l0, l1, l2, l3] = F(-1), [r0, r1, r2, r3] = F(1);
    // La zone fondue, laissée en blanc : cordon, racine et le métal des pièces passé dans le bain.
    const zone = `M${l0} Q${c},${y0 - 2 * hc} ${r0} C${r1} ${r2} ${r3} Q${c},${yB + 2 * hr} ${l3} C${l2} ${l1} ${l0} Z`;
    const chanfrein = (sg) => [[c + sg * (g + a), y0], [c + sg * g, yB - f]];
    return [
      h.path(forme, h.a.hachure('metal')),
      h.path(zone, h.a.blanc),
      `<defs><pattern id="p-fondu-10702" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="0.5" fill="#000"/></pattern></defs>`,
      h.path(zone, 'fill="url(#p-fondu-10702)" stroke="none"'),
      h.chemin(chanfrein(-1), h.a.cache),
      h.chemin(chanfrein(1), h.a.cache),
      h.path(fusion(-1), h.a.arete),
      h.path(fusion(1), h.a.arete),
      h.path(dessus, h.a.contour),
      h.path(dessous, h.a.contour),
    ].join('\n');
  };

  // ─── Brasage à recouvrement ────────────────────────────────────────────────────────
  const geoRecouvrement = (z, e, r) => {
    const c = z.l / 2, x0 = M, x1 = z.l - M;
    const tp = Math.min(z.h * 0.27, 62);
    const Lo = 0.44 * z.l, xL = c - Lo / 2, xR = c + Lo / 2;
    const ym = z.h / 2 + 6;
    const yt = ym - (2 * tp + e) / 2;
    const yb = yt + tp + e;
    return { c, x0, x1, tp, Lo, xL, xR, yt, yb, e, r };
  };
  const recouvrement = (z, e, r) => {
    const { x0, x1, tp, Lo, xL, xR, yt, yb } = geoRecouvrement(z, e, r);
    const bas = [...zig(x0, yb, yb + tp).reverse(), [xR, yb], [xR, yb + tp]];
    const haut = [...zig(x1, yt, yt + tp), [xL, yt + tp], [xL, yt]];
    const k = 0.18;
    // Congé d'apport au pied de chaque bout de pièce.
    const congeG = `M${xL - r},${yb} Q${xL - k * r},${yb - k * r} ${xL},${yb - e - r} L${xL},${yb} Z`;
    const congeD = `M${xR + r},${yb - e} Q${xR + k * r},${yb - e + k * r} ${xR},${yb + r} L${xR},${yb - e} Z`;
    return [
      h.chemin(bas, h.a.hachure('metal'), true),
      h.chemin(haut, h.a.hachure('metal'), true),
      h.rect(xL, yb - e, Lo, e, h.a.plein),
      h.path(congeG, h.a.plein),
      h.path(congeD, h.a.plein),
      h.chemin([[x0, yb], [xR, yb], [xR, yb + tp], [x0, yb + tp]], h.a.contour),
      h.chemin([[x1, yt], [xL, yt], [xL, yt + tp], [x1, yt + tp]], h.a.contour),
    ].join('\n');
  };

  const SERRE = [4, 9], GROS = [14, 13];

  return {
    ref: '107-02',
    titre: 'Les trois joints en coupe',
    desc: 'Trois joints coupés en travers, côte à côte. À gauche, une soudure bout à bout sur deux plats chanfreinés en V : le cordon remplit le V, et la ligne de fusion passe au-delà des bords d’origine des pièces, qui ont fondu avec l’apport ; le contour extérieur court sans interruption d’une pièce à l’autre par-dessus le cordon, c’est un seul morceau. Au centre, un brasage à recouvrement, fort ou tendre : deux plats superposés, un film d’apport mince dans un jeu serré, un petit congé à chaque bout ; chaque pièce garde son contour entier et ses arêtes vives. À droite, le même recouvrement raté : les pièces laissées écartées, un film d’apport épais qui remplit le vide au lieu d’être tiré par capillarité, et qui ne tient rien.',
    format: 'demi',
    disposition: [['soudure', 'brasage', 'gros']],
    vues: {
      soudure: {
        titre: 'Soudure',
        dessin: z => soudure(z),
        renvois: z => {
          const s = geoSoudure(z);
          const { c, y0, yB, g, a, f, w } = s;
          const yc1 = (y0 + yB) / 2, u1 = (yc1 - y0) / (yB - f - y0);
          const cible1 = [c - g - a * (1 - u1), yc1]; // sur le tireté du chanfrein gauche
          const cible2 = surBezier(fusionPts(s, 1), 0.55);
          return [
            { n: 1, rond: [11, yc1], cible: cible1, texte: 'bord d’origine des pièces, fondu' },
            { n: 2, rond: [c + g + a + w + 22, yB + 30], cible: cible2, texte: 'ligne de fusion : un seul morceau' },
          ];
        },
      },
      brasage: {
        titre: 'Brasage, fort ou tendre',
        dessin: z => recouvrement(z, ...SERRE),
        renvois: z => {
          const { c, xL, yt, yb, e, tp } = geoRecouvrement(z, ...SERRE);
          return [
            { n: 3, rond: [c + 36, yt - 28], cible: [c + 12, yb - e / 2], texte: 'film d’apport mince, jeu serré' },
            { n: 4, rond: [xL - 30, yt + 2], cible: [xL, yt + tp * 0.5], texte: 'les pièces restent intactes, arêtes vives' },
          ];
        },
      },
      gros: {
        titre: 'Brasage à gros jeu : raté',
        dessin: z => recouvrement(z, ...GROS),
        renvois: z => {
          const { c, yt, yb, e } = geoRecouvrement(z, ...GROS);
          return [
            { n: 5, rond: [c + 36, yt - 28], cible: [c + 12, yb - e / 2], texte: 'joint de remplissage : il ne tient rien' },
          ];
        },
      },
    },
  };
};
