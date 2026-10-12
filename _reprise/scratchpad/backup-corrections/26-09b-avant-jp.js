// Planche 26-09b — Déplacer un blessé : la porte dégondée, le blessé sanglé dessus, la tête
// calée ; vue par la tête ; et l'ensemble roulé d'un bloc sur le côté.
module.exports = (h) => {
  const BL = h.a.blanc.split(' ')[0];
  const plein = t => t.replace('fill="none"', BL);
  const f = v => Math.round(v * 10) / 10;
  const pt = p => `${f(p[0])},${f(p[1])}`;

  const lisse = (P, ferme) => {
    const n = P.length, g = i => ferme ? P[(i + n) % n] : P[Math.max(0, Math.min(n - 1, i))];
    let d = `M${pt(P[0])}`;
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      d += ` C${pt([p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6])} ${pt([p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6])} ${pt(p2)}`;
    }
    return ferme ? d + ' Z' : d;
  };
  const forme = (P, a) => h.path(lisse(P, true), a);

  const spirale = (cx, cy, r0, r1, tours, fin, sens, a) => {
    const N = Math.round(tours * 40), P = [];
    for (let i = 0; i <= N; i++) {
      const t = i / N, ang = fin - sens * (1 - t) * tours * 2 * Math.PI, r = r0 + (r1 - r0) * t;
      P.push([f(cx + r * Math.cos(ang)), f(cy + r * Math.sin(ang))]);
    }
    return h.chemin(P, a);
  };

  // Corps couché sur le dos, vu de dessus, tête à gauche. x0 : sommet du crâne ; H : taille.
  const corpsDessus = (x0, cy, H, a) => {
    const D = [
      [0, 0], [0.012, 0.03], [0.055, 0.045], [0.105, 0.037], [0.13, 0.025], [0.155, 0.027],
      [0.172, 0.07], [0.19, 0.112], [0.22, 0.128], [0.30, 0.127], [0.37, 0.124], [0.46, 0.12],
      [0.53, 0.115], [0.575, 0.11], [0.60, 0.095], [0.585, 0.082], [0.62, 0.085], [0.75, 0.068],
      [0.85, 0.06], [0.93, 0.048], [0.955, 0.068], [0.99, 0.064], [1.0, 0.042], [0.985, 0.02],
      [0.94, 0.02], [0.75, 0.013], [0.60, 0.008], [0.545, 0],
    ];
    const P = [...D, ...D.slice(1, -1).reverse().map(([x, y]) => [x, -y])]
      .map(([x, y]) => [x0 + x * H, cy + y * H]);
    const ligne = pts => h.path(lisse(pts.map(([x, y]) => [x0 + x * H, cy + y * H]), false), h.a.detail);
    return [
      forme(P, a),
      ligne([[0.225, 0.093], [0.34, 0.09], [0.47, 0.088], [0.56, 0.09]]),
      ligne([[0.225, -0.093], [0.34, -0.09], [0.47, -0.088], [0.56, -0.09]]),
      ligne([[0.135, -0.018], [0.142, 0], [0.135, 0.018]]),
    ].join('\n');
  };

  // Un rouleau de linge vu de dessus : un cylindre couché, deux plis.
  const rouleauDessus = (x1, x2, y, r) => [
    h.path(`M${f(x1 + r * 0.5)},${f(y - r)} L${f(x2 - r * 0.5)},${f(y - r)} Q${f(x2 + r * 0.3)},${f(y)} ${f(x2 - r * 0.5)},${f(y + r)} L${f(x1 + r * 0.5)},${f(y + r)} Q${f(x1 - r * 0.3)},${f(y)} ${f(x1 + r * 0.5)},${f(y - r)} Z`, plein(h.a.arete)),
    h.path(`M${f(x1 + r)},${f(y - r * 0.35)} L${f(x2 - r)},${f(y - r * 0.45)}`, h.a.detail),
    h.path(`M${f(x1 + r * 1.6)},${f(y + r * 0.4)} L${f(x2 - r * 1.4)},${f(y + r * 0.3)}`, h.a.fin),
  ].join('\n');

  // ─── la porte vue de dessus ───
  const geoPorte = z => {
    const Ld = z.l - 56, Wd = Math.round(Ld * 0.4), x0 = 28, cy = Math.round(z.h / 2), y0 = cy - Wd / 2;
    const H = Ld * 0.86, xc = x0 + Ld * 0.045;          // taille du blessé ; sommet du crâne
    const X = fr => xc + fr * H;                       // position le long du corps
    const lb = H * 0.036;                              // largeur d'une sangle
    return { Ld, Wd, x0, y0, cy, H, xc, X, lb };
  };

  // ─── l'ensemble vu par la tête, repère local en cm : (0,0) = milieu de la face de la porte ───
  // T : point local (cm) → point de la vue ; tourne : l'ensemble couché sur la tranche.
  const ensemble = (k, T, tourne) => {
    const q = T;
    const out = [];
    // épaules et bras, derrière la tête
    out.push(forme([[-25, 0], [-26, -8], [-22, -17], [-12, -21], [0, -22], [12, -21], [22, -17], [26, -8], [25, 0]].map(([x, y]) => q(x, y)), plein(h.a.detail)));
    out.push(h.path(`M${pt(q(-19, 0))} Q${pt(q(-20, -9))} ${pt(q(-17, -15))}`, h.a.detail));
    out.push(h.path(`M${pt(q(19, 0))} Q${pt(q(20, -9))} ${pt(q(17, -15))}`, h.a.detail));
    // la porte, en travers
    out.push(h.chemin([q(-40.5, 0), q(40.5, 0), q(40.5, 4.5), q(-40.5, 4.5)].map(p => p.map(f)), h.a.hachure('bois', 'contour'), true));
    // la tête vue par le crâne : nez en haut, oreilles de côté
    out.push(forme([[-7.6, -9.5], [-6.8, -15.2], [-4, -18.4], [-1.4, -19.2], [0, -21.8], [1.4, -19.2], [4, -18.4], [6.8, -15.2], [7.6, -9.5], [8.4, -8], [7.2, -6.5], [6.6, -3], [3.5, -0.4], [0, 0], [-3.5, -0.4], [-6.6, -3], [-7.2, -6.5], [-8.4, -8]].map(([x, y]) => q(x, y)), plein(h.a.arete)));
    // les deux rouleaux serrés contre la tête
    for (const s of [-1, 1]) {
      const c = q(s * 13.4, -5.6);
      out.push(h.cercle(c[0], c[1], 5.6 * k, plein(h.a.arete)));
      out.push(spirale(c[0], c[1], 1.2 * k, 5.2 * k, 2.2, Math.PI / 2 + (tourne ? Math.PI / 2 : 0), s, h.a.detail));
    }
    // la bande : par-dessus le front et les rouleaux, autour de la porte
    const B = [[40.9, 1.2], [30, -4.6], [18.4, -10.2], [11, -15.6], [5, -18.5], [0, -19.4], [-5, -18.5], [-11, -15.6], [-18.4, -10.2], [-30, -4.6], [-40.9, 0.4], [-41.2, 4.8], [-38, 5.3], [0, 5.3], [38, 5.3], [41.2, 4.8]];
    out.push(h.path(lisse(B.map(([x, y]) => q(x, y)), true), h.a.contour));
    // le nœud, sur la tranche
    const n = q(-42.4, 2.2);
    out.push(h.ellipse(f(n[0]), f(n[1]), (tourne ? 2 : 1.6) * k, (tourne ? 1.6 : 2) * k, plein(h.a.arete)));
    out.push(h.path(`M${pt(q(-43.4, 3.6))} Q${pt(q(-45.5, 6))} ${pt(q(-45, 9.5))}`, h.a.arete));
    out.push(h.path(`M${pt(q(-42.2, 4))} Q${pt(q(-42.8, 7))} ${pt(q(-41.8, 10))}`, h.a.arete));
    return out.join('\n');
  };

  const geoTete = z => {
    const k = Math.min((z.l - 36) / 90, (z.h - 60) / 36), ox = Math.round(z.l / 2) - 3, oy = Math.round(z.h / 2 + 6 * k);
    return { k, ox, oy, T: (x, y) => [ox + x * k, oy + y * k] };
  };

  // Couché sur la tranche : rotation de 90° autour du coin bas droit de la porte.
  const geoRoule = z => {
    const k = Math.min((z.h - 34) / 84, (z.l - 40) / 110);
    const G = z.h - 14, px = z.l - 26 * k - 22;
    // point local (cm) → vue
    const v = (x, y) => { const dx = x * k - 40.5 * k, dy = y * k - 4.5 * k; return [px - dy, G + dx]; };
    return { k, G, px, v };
  };

  return {
    ref: '26-09b',
    titre: 'Déplacer un blessé : la porte dégondée, le blessé sanglé et calé',
    desc: 'Une porte dégondée sert de planche. Vue de dessus : le blessé couché sur le dos, sanglé en travers de la poitrine, du bassin et des cuisses, du linge roulé dans les vides le long des jambes, tenu par la sangle des cuisses, un rouleau de vêtements de chaque côté de la tête et une bande large en travers du front. Vue par la tête : les rouleaux serrés contre les tempes et la bande qui passe sur le front et fait le tour de la porte. Enfin, porte et blessé roulés ensemble sur la tranche, d’un bloc.',
    format: 'pleine',
    disposition: [['dessus'], ['tete', 'roule']],
    hauteurs: [1.15, 1],
    largeurs: [[1], [1, 1]],
    vues: {
      dessus: {
        titre: 'Vu de dessus',
        dessin: z => {
          const g = geoPorte(z), { Ld, Wd, x0, y0, cy, H, X, lb } = g, out = [];
          // la porte : panneaux, pentures, trou de la poignée
          out.push(h.rect(x0, y0, Ld, Wd, plein(h.a.contour)));
          for (const [a, b] of [[0.06, 0.2], [0.25, 0.7], [0.75, 0.94]]) for (const [c, d] of [[0.13, 0.47], [0.53, 0.87]]) {
            out.push(h.rect(f(x0 + a * Ld), f(y0 + c * Wd), f((b - a) * Ld), f((d - c) * Wd), h.a.detail));
            out.push(h.rect(f(x0 + a * Ld + 5), f(y0 + c * Wd + 5), f((b - a) * Ld - 10), f((d - c) * Wd - 10), h.a.fin));
          }
          for (const a of [0.12, 0.5, 0.88]) out.push(h.rect(f(x0 + a * Ld - 16), y0, 32, 6, h.a.hachure('metal', 'arete')));
          out.push(h.cercle(f(x0 + 0.555 * Ld), f(y0 + Wd - 17), 7, h.a.arete));
          out.push(h.rect(f(x0 + 0.555 * Ld - 7), f(y0 + Wd - 5), 14, 5, h.a.hachure('metal', 'arete')));
          // linge roulé le long des jambes, glissé contre elles : la cuisse le recouvre, la sangle
          // des cuisses le tient
          const rl = H * 0.03;
          for (const s of [-1, 1]) out.push(rouleauDessus(X(0.64), X(0.93), cy + s * H * 0.1, rl));
          // le blessé
          out.push(corpsDessus(g.xc, cy, H, plein(h.a.arete)));
          // les deux rouleaux contre la tête
          const rt = H * 0.03;
          for (const s of [-1, 1]) out.push(rouleauDessus(X(-0.01), X(0.14), cy + s * H * (0.046 + 0.03), rt));
          // les sangles, qui font le tour de la porte, et leur nœud sur la tranche
          for (const fr of [0.035, 0.3, 0.52, 0.665]) {
            const x = X(fr), l = fr === 0.035 ? lb * 1.25 : lb;
            out.push(h.rect(f(x - l / 2), y0 - 3, f(l), Wd + 6, plein(h.a.contour)));
          }
          return out.join('\n');
        },
        renvois: z => {
          const g = geoPorte(z), { Wd, y0, cy, H, X } = g, yh = y0 - 20, yb = y0 + Wd + 24;
          return [
            { n: 1, rond: [f(X(0.3) + 22), yh], cible: [f(X(0.3)), f(y0 + 10)], texte: 'sangle en travers de la poitrine' },
            { n: 2, rond: [f(X(0.52) + 22), yh], cible: [f(X(0.52)), f(y0 + 10)], texte: 'sangle en travers du bassin' },
            { n: 3, rond: [f(X(0.665) + 22), yh], cible: [f(X(0.665)), f(y0 + 10)], texte: 'sangle en travers des cuisses' },
            { n: 4, rond: [f(X(0.82)), yb], cible: [f(X(0.82)), f(cy + H * 0.1 + 3)], texte: 'linge roulé dans les vides' },
            { n: 5, rond: [f(X(0.2)), yb], cible: [f(X(0.1)), f(cy + H * 0.076 + 2)], texte: 'rouleaux de vêtements serrés contre la tête' },
            { n: 6, rond: [f(X(0.035) + 24), yh], cible: [f(X(0.035)), f(y0 + 10)], texte: 'bande large en travers du front' },
          ];
        },
      },
      tete: {
        titre: 'Vu par la tête',
        dessin: z => {
          const { k, T } = geoTete(z);
          return ensemble(k, T, false);
        },
        renvois: z => {
          const { k, ox, oy } = geoTete(z);
          return [
            { n: 7, rond: [f(ox + 30 * k), f(oy + 16 * k)], cible: [f(ox + 22 * k), f(oy + 5.3 * k)], texte: 'la bande fait le tour de la porte' },
          ];
        },
      },
      roule: {
        titre: 'Roulé d’un bloc sur le côté',
        dessin: z => {
          const g = geoRoule(z), { k, G, px, v } = g, out = [];
          out.push(h.rect(0, G, z.l, 6, h.a.hachure('neige', 'aucun')));
          out.push(h.ligne(0, G, z.l, G, h.a.arete));
          // la porte à plat, avant : en tireté
          out.push(h.rect(f(px - 81 * k), f(G - 4.5 * k), f(81 * k), f(4.5 * k), h.a.cache));
          // le mouvement : le bord gauche monte en arc autour du coin
          const R = 70 * k, a0 = Math.PI * 1.03, a1 = Math.PI * 1.44;
          out.push(h.fleche(`M${f(px + R * Math.cos(a0))},${f(G + R * Math.sin(a0) - 8)} A${f(R)} ${f(R)} 0 0 1 ${f(px + R * Math.cos(a1))},${f(G + R * Math.sin(a1))}`));
          out.push(ensemble(k, v, true));
          return out.join('\n');
        },
        renvois: z => {
          const g = geoRoule(z), { v, k, px, G } = g;
          return [
            { n: 8, rond: [f(px + 16 * k), f(G - 80 * k)], cible: v(-34, 0.6), texte: 'porte et blessé roulés ensemble, à deux' },
          ];
        },
      },
    },
    danger: 'Danger — attaché sur le dos, un blessé qui vomit s’étouffe avec. Les sangles le tiennent à la planche pour qu’on puisse, à deux, tout rouler d’un bloc sur le côté.',
  };
};
