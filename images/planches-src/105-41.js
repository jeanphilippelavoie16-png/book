// Planche 105-41 — Le manche de lime (chapitre 105, §9, « Fabriquer le manche de lime »).
// Tout vient du chapitre : rondin de bouleau sec fendu et non scié, renflé au milieu ; la bague posée
// avant de percer (bout de tuyau de cuivre, douille, virole de boîte de conserve) ; le trou brûlé au clou
// rouge, par passes courtes, un peu plus petit que la soie, ses parois carbonisées ; la soie enfoncée
// froide en frappant le talon du manche sur un billot, jamais la lime.
// Deux vues : le manche en coupe, la soie alignée devant son trou (on voit qu'elle est plus large que le
// trou) ; l'enfoncement, debout sur le billot, la flèche du coup. Pas de main : l'outil seul.
// Aucune cote : le chapitre dit « la grosseur d'un manche de marteau », dit dans le renvoi. Les
// proportions du dessin (manche de 120 mm, Ø 34 ; soie de 40 mm) sont un dessin.
'use strict';

const f1 = v => Math.round(v * 10) / 10;

module.exports = (h) => {
  const A = h.a, NOIR = '#1A1A1A';
  const BLANC_C = w => `fill="#FFFFFF" stroke="${NOIR}" stroke-width="${w}" stroke-linejoin="round"`;
  const cassureV = (x, y0, y1, amp = 1.8) => { const o = []; for (let i = 0; i <= 12; i++) { const t = i / 12; o.push([x + Math.sin(t * 2 * Math.PI) * amp, y0 + (y1 - y0) * t]); } return o; };

  // Le manche, en mm, repère : u le long de l'axe depuis le bout de la bague (0) vers le talon (LM), v radial
  const LM = 120, RM = 17, BAG = 12;
  const rayon = u => RM * (0.84 + 0.16 * Math.sin(Math.PI * Math.min(1, Math.max(0, u / LM))));
  // le trou brûlé : 50 mm de profond, plus étroit que la soie partout
  const PROF = 50, T0 = 2.3, T1 = 1.0;          // demi-largeur du trou à l'entrée et au fond
  const SOIE = 42, S0 = 3.2, S1 = 1.2;          // la soie : longueur, demi-largeur à l'épaulement et au bout
  const LIME = 18 / 2;                          // demi-largeur de la lime

  // ─── En coupe ──────────────────────────────────────────────────────────────────────────────────
  const geoCoupe = z => {
    const s = 2.05, y0 = z.h / 2 + 6;
    const xm = z.l - 8 - LM * s;                // le bout du manche (côté bague)
    const P = (u, v) => [xm + u * s, y0 + v * s];
    const xs = xm - 10;                          // le bout de la soie, juste devant le trou
    const Q = (u, v) => [xs - u * s, y0 + v * s];  // u le long de la soie, depuis son bout, vers la lime
    return { s, y0, xm, P, xs, Q };
  };
  const dessinCoupe = z => {
    const g = geoCoupe(z), { P, Q, s } = g, out = [];
    // le manche coupé dans sa longueur : une demi-coupe au-dessus du trou, une en dessous
    for (const sg of [-1, 1]) {
      const ext = [], int = [];
      for (let i = 0; i <= 24; i++) { const u = LM * i / 24; ext.push(P(u, sg * rayon(u))); }
      for (let i = 0; i <= 12; i++) { const u = PROF * i / 12; int.push(P(u, sg * (T0 + (T1 - T0) * u / PROF))); }
      const fond = P(PROF, 0);
      const poly = [P(0, sg * (T0))].concat([P(0, sg * rayon(0))], ext.slice(1), [P(LM, 0), fond], int.slice().reverse());
      out.push(h.chemin(poly, A.hachure('bois', 'aucun'), true));
      out.push(h.chemin([P(0, sg * T0), P(0, sg * rayon(0))].concat(ext.slice(1)), A.contour));
      // la paroi brûlée : un liseré noir le long du trou
      out.push(h.chemin(int, `fill="none" stroke="${NOIR}" stroke-width="2.4" stroke-linejoin="round"`));
    }
    out.push(h.ligne(...P(LM, -rayon(LM)), ...P(LM, rayon(LM)), A.contour));
    // la bague, posée avant de percer : un anneau de métal autour du bout
    for (const sg of [-1, 1]) {
      const a = P(0, sg * rayon(0)), b = P(BAG, sg * rayon(BAG));
      const e = 3.4 * s * sg;
      out.push(h.chemin([a, b, [b[0], b[1] + e], [a[0], a[1] + e]], A.hachure('metal', 'arete'), true));
    }
    // la soie, alignée devant son trou : plus large que le trou à chaque profondeur
    const soie = [Q(0, -S1), Q(SOIE, -S0), Q(SOIE, S0), Q(0, S1)];
    out.push(h.chemin(soie, BLANC_C(2.4), true));
    // l'épaulement et le corps de la lime, coupé
    const L1 = SOIE + 4, L2 = SOIE + 20;
    const corps = [Q(SOIE, -S0), Q(L1, -LIME), Q(L2, -LIME), Q(L2, LIME), Q(L1, LIME), Q(SOIE, S0)];
    out.push(h.chemin(corps, BLANC_C(2.4), false));
    const cx = Q(L2, 0)[0];
    out.push(h.chemin(cassureV(cx, Q(L2, -LIME)[1], Q(L2, LIME)[1]), A.detail));
    // la taille de la lime : traits en biais
    for (let k = 0; k < 9; k++) {
      const u = L1 + 3 + k * 3.6;
      if (u > L2 - 2) break;
      out.push(h.ligne(...Q(u, -LIME + 1.2), ...Q(u + 3, LIME - 1.2), A.detail));
    }
    // l'axe commun
    out.push(h.ligne(Q(0, 0)[0] + 2, g.y0, P(0, 0)[0] - 2, g.y0, A.fin));
    return out.join('\n');
  };

  // ─── Enfoncer : debout sur le billot, on frappe le talon ─────────────────────────────────────────
  const geoEnf = z => {
    const s = 0.8, cx = z.l / 2 - 8;
    const yB = z.h - 34;                        // le dessus du billot
    const P = (u, v) => [cx + v * s, yB - (LM - u) * s];   // le manche debout, talon sur le billot
    return { s, cx, yB, P };
  };
  const dessinEnf = z => {
    const g = geoEnf(z), { P, s, cx, yB } = g, out = [];
    // le billot
    out.push(h.chemin([[8, z.h - 2], [8, yB], [z.l - 8, yB], [z.l - 8, z.h - 2]], A.contour));
    [30, 58, 104, 140].forEach(x => out.push(h.path(`M${x} ${yB + 6} Q${x + 2} ${yB + 18} ${x - 1} ${z.h - 4}`, A.detail)));
    // la lime, debout, la soie entrée à moitié dans le manche
    const haut = 26, yE = P(0, 0)[1] - 12 * s;  // l'épaulement, 12 mm au-dessus du bout du manche
    out.push(h.chemin([[cx - 3.4 * s, yE], [cx - LIME * s, yE - 4 * s], [cx - LIME * s, haut], [cx + LIME * s, haut], [cx + LIME * s, yE - 4 * s], [cx + 3.4 * s, yE]], BLANC_C(2.4)));
    out.push(h.chemin(cassureV(cx, haut, haut, 0).slice(0, 1).concat([[cx + LIME * s, haut]]), A.detail));
    for (let k = 0; k < 14; k++) { const y = haut + 6 + k * 6.2; if (y > yE - 6) break; out.push(h.ligne(cx - LIME * s + 1, y, cx + LIME * s - 1, y + 3, A.detail)); }
    // la soie : la partie hors du manche, puis cachée dedans
    out.push(h.chemin([[cx - 3.4 * s, yE], [cx - 3 * s, P(0, 0)[1]], [cx + 3 * s, P(0, 0)[1]], [cx + 3.4 * s, yE]], BLANC_C(1.4), true));
    out.push(h.chemin([[cx - 3 * s, P(0, 0)[1]], [cx - 1.2 * s, P(30, 0)[1]], [cx + 1.2 * s, P(30, 0)[1]], [cx + 3 * s, P(0, 0)[1]]], A.cache));
    // le manche, avec sa bague
    const g1 = [], d1 = [];
    for (let i = 0; i <= 20; i++) { const u = LM * i / 20; g1.push(P(u, -rayon(u))); d1.push(P(u, rayon(u))); }
    out.push(h.chemin(g1.concat(d1.slice().reverse()), BLANC_C(2.4), true));
    out.push(h.chemin([P(0, -rayon(0) - 2), P(BAG, -rayon(BAG) - 2), P(BAG, rayon(BAG) + 2), P(0, rayon(0) + 2)], A.hachure('metal', 'arete'), true));
    [-8, 6].forEach(v => out.push(h.path(`M${f1(P(BAG + 8, v)[0])} ${f1(P(BAG + 8, v)[1])} Q${f1(P(60, v * 1.15)[0])} ${f1(P(60, v * 1.15)[1])} ${f1(P(LM - 8, v)[0])} ${f1(P(LM - 8, v)[1])}`, A.detail)));
    // le geste : tout l'outil descend, le talon frappe le billot
    out.push(h.geste(`M${f1(cx + RM * s + 26)} ${f1(P(10, 0)[1])} L${f1(cx + RM * s + 26)} ${f1(yB - 14)}`));
    return out.join('\n');
  };

  return {
    ref: '105-41',
    titre: 'Le manche de lime',
    desc: 'En coupe : un manche de bouleau fendu, renflé au milieu, une bague de métal au bout, un trou brûlé dans l’axe aux parois noircies ; devant lui, la soie de la lime, alignée, plus large que le trou à chaque profondeur. À droite : la lime debout, la soie entrée dans le manche, le talon du manche qui frappe un billot.',
    format: 'demi',
    disposition: [['coupe', 'enf']],
    largeurs: [[2.3, 1]],
    vues: {
      coupe: {
        titre: 'Avant d’enfoncer, en coupe',
        dessin: dessinCoupe,
        renvois: z => {
          const g = geoCoupe(z), P = g.P;
          return [
            { n: 1, rond: [P(BAG / 2, 0)[0] - 4, 18], cible: P(BAG / 2, -rayon(BAG / 2) - 3.4), texte: 'la bague, posée avant de percer' },
            { n: 2, rond: [P(PROF * 0.6, 0)[0], z.h - 14], cible: P(PROF * 0.55, 1.6), texte: 'trou brûlé, plus petit que la soie' },
            { n: 3, rond: [P(LM - 20, 0)[0], 18], cible: P(LM - 22, -rayon(LM - 22) + 3), texte: 'bouleau sec, fendu et non scié' },
          ];
        },
      },
      enf: {
        titre: 'Enfoncer',
        dessin: dessinEnf,
        renvois: z => {
          const g = geoEnf(z);
          return [
            { n: 4, rond: [z.l - 18, 40], cible: [g.cx + 3 * g.s + 1, g.P(0, 0)[1] - 5], texte: 'la soie froide' },
            { n: 5, rond: [22, g.yB - 50], cible: [g.cx - 8, g.yB - 2], texte: 'frapper le talon, jamais la lime' },
          ];
        },
      },
    },
  };
};
