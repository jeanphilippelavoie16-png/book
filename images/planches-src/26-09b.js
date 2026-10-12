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

  // ─── le pictogramme (règle 8) : tête ronde sans visage, membres en bandes d'épaisseur égale ───
  // Les mêmes proportions que h.formes.personnage (adulte de 1750 mm : tête 245, bras 92, jambe 122),
  // vu de dessus puisque la bibliothèque ne dessine que de profil. Toutes les silhouettes à 2,4
  // dessous, puis chaque pièce son blanc et son trait 1,4 : le contour sort net, les pièces qui se
  // chevauchent se lisent.
  const NOIR = '#1A1A1A';
  const capsule = (P, Q, r) => {
    const dx = Q[0] - P[0], dy = Q[1] - P[1], L = Math.hypot(dx, dy) || 1, u = [dx / L, dy / L], n = [-u[1], u[0]];
    const pts = [];
    for (let i = 0; i <= 12; i++) { const a = Math.PI / 2 - i * Math.PI / 12; pts.push([Q[0] + r * (u[0] * Math.cos(a) + n[0] * Math.sin(a)), Q[1] + r * (u[1] * Math.cos(a) + n[1] * Math.sin(a))]); }
    for (let i = 0; i <= 12; i++) { const a = Math.PI / 2 - i * Math.PI / 12; pts.push([P[0] - r * (u[0] * Math.cos(a) + n[0] * Math.sin(a)), P[1] - r * (u[1] * Math.cos(a) + n[1] * Math.sin(a))]); }
    return 'M' + pts.map(pt).join(' L') + ' Z';
  };
  const rond = (c, r) => `M${f(c[0] - r)},${f(c[1])} A${f(r)} ${f(r)} 0 1 0 ${f(c[0] + r)},${f(c[1])} A${f(r)} ${f(r)} 0 1 0 ${f(c[0] - r)},${f(c[1])} Z`;
  const picto = D => [
    ...D.map(d => `<path d="${d}" fill="none" stroke="${NOIR}" stroke-width="2.4" stroke-linejoin="round"/>`),
    ...D.map(d => `<path d="${d}" fill="#FFFFFF" stroke="${NOIR}" stroke-width="1.4" stroke-linejoin="round"/>`),
  ].join('\n');

  // Couché sur le dos, vu de dessus, tête à gauche. x0 : sommet du crâne ; s : unités de vue par mm.
  const corpsDessus = (x0, cy, s) => {
    const q = (x, y) => [x0 + x * s, cy + y * s];
    const D = [];
    for (const k of [-1, 1]) {
      // la jambe : cuisse, jambe, le pied qui tombe un peu en dehors
      D.push(capsule(q(1290, k * 108), q(1650, k * 112), 54 * s));
      D.push(capsule(q(1662, k * 116), q(1702, k * 136), 46 * s));
      D.push(capsule(q(880, k * 98), q(1290, k * 108), 61 * s));
    }
    // le tronc : épaules rondes, taille un peu rentrée, bassin
    const tr = [[262, 0], [270, -150], [300, -200], [380, -206], [560, -178], [700, -172], [860, -176], [925, -146], [956, -80], [964, 0]];
    D.push(lisse([...tr, ...tr.slice(1, -1).reverse().map(([x, y]) => [x, -y])].map(([x, y]) => q(x, y)), true));
    for (const k of [-1, 1]) {
      // le bras le long du corps : bras, avant-bras, la main posée à plat
      D.push(capsule(q(610, k * 252), q(1010, k * 258), 44 * s));
      D.push(capsule(q(320, k * 246), q(610, k * 252), 46 * s));
    }
    D.push(rond(q(116, 0), 114 * s));
    return picto(D);
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
    // le tronc derrière la tête et les bras le long du corps : un seul bloc du pictogramme
    out.push(picto([
      lisse([[-31, 0], [-31.8, -6.5], [-29.4, -12.4], [-21, -18.4], [-10, -21.4], [0, -22], [10, -21.4], [21, -18.4], [29.4, -12.4], [31.8, -6.5], [31, 0]].map(([x, y]) => q(x, y)), true),
    ]));
    // le pli entre le bras et la poitrine
    for (const s of [-1, 1]) out.push(h.path(`M${pt(q(s * 23.4, -16.6))} Q${pt(q(s * 22, -8))} ${pt(q(s * 22.6, 0))}`, h.a.detail));
    // la porte, en travers
    out.push(h.chemin([q(-40.5, 0), q(40.5, 0), q(40.5, 4.5), q(-40.5, 4.5)].map(p => p.map(f)), h.a.hachure('bois', 'contour'), true));
    // la tête vue par le crâne : le rond du pictogramme, posé sur la porte
    out.push(picto([rond(q(0, -11.4), 11.4 * k)]));
    // les deux rouleaux serrés contre la tête
    for (const s of [-1, 1]) {
      const c = q(s * 16.8, -5.6);
      out.push(h.cercle(c[0], c[1], 5.6 * k, plein(h.a.arete)));
      out.push(spirale(c[0], c[1], 1.2 * k, 5.2 * k, 2.2, Math.PI / 2 + (tourne ? Math.PI / 2 : 0), s, h.a.detail));
    }
    // la bande : par-dessus le front et les rouleaux, autour de la porte
    const B = [[40.9, 1.2], [30, -6], [22, -10], [16, -12.6], [9.4, -18.4], [4.4, -21.6], [0, -22.4], [-4.4, -21.6], [-9.4, -18.4], [-16, -12.6], [-22, -10], [-30, -6], [-40.9, 0.4], [-41.2, 4.8], [-38, 5.3], [0, 5.3], [38, 5.3], [41.2, 4.8]];
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
          const rl = H * 0.034;
          for (const s of [-1, 1]) out.push(rouleauDessus(X(0.62), X(0.93), cy + s * H * 0.133, rl));
          // le blessé
          out.push(corpsDessus(g.xc, cy, H / 1750));
          // les deux rouleaux contre la tête
          const rt = H * 0.03;
          for (const s of [-1, 1]) out.push(rouleauDessus(X(0.0), X(0.135), cy + s * H * 0.096, rt));
          // les sangles, qui font le tour de la porte, et leur nœud sur la tranche
          for (const fr of [0.066, 0.3, 0.52, 0.665]) {
            const x = X(fr), l = fr === 0.066 ? lb * 1.25 : lb;
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
            { n: 4, rond: [f(X(0.82)), yb], cible: [f(X(0.82)), f(cy + H * 0.133 + 3)], texte: 'linge roulé dans les vides' },
            { n: 5, rond: [f(X(0.2)), yb], cible: [f(X(0.1)), f(cy + H * 0.096 + 2)], texte: 'rouleaux de vêtements serrés contre la tête' },
            { n: 6, rond: [f(X(0.066) + 24), yh], cible: [f(X(0.066)), f(y0 + 10)], texte: 'bande large en travers du front' },
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
