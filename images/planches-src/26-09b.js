// Planche 26-09b — Déplacer un blessé : la porte dégondée, le blessé sanglé dessus, la tête
// calée ; vue par la tête ; et l'ensemble roulé d'un bloc sur le côté.
// Lot 3 (13 octobre au soir, JP : « élimine toutes les vues de face et de haut ») : la vue de dessus
// et son corps vu d'en haut sortent. À leur place, la même porte de côté, posée sur la neige, le
// blessé en corps simple couché sur le dos (couche-dos) : les sangles passent par-dessus lui et
// sous la porte, la bande sur le front, le rouleau de vêtements contre la tête et le linge roulé
// contre les jambes (celui du côté de l'œil, devant le corps ; l'autre est caché derrière). Les
// vues par la tête restent : une tête ronde sur la bosse des épaules, en forme simple.
// Charte : la porte, les sangles et la bande à 2,4, le corps à 1,5 ; gris ombre sous les rouleaux ;
// rouge : le geste qui roule tout d'un bloc.
module.exports = (h) => {
  const F = h.formes;
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

  // ─── vu par la tête : une tête ronde sur la bosse des épaules, en forme simple. Toutes les
  // silhouettes à 2,4 dessous, puis chaque pièce son blanc et son trait 1,4.
  const NOIR = '#1A1A1A';
  const rond = (c, r) => `M${f(c[0] - r)},${f(c[1])} A${f(r)} ${f(r)} 0 1 0 ${f(c[0] + r)},${f(c[1])} A${f(r)} ${f(r)} 0 1 0 ${f(c[0] - r)},${f(c[1])} Z`;
  const picto = D => [
    ...D.map(d => `<path d="${d}" fill="none" stroke="${NOIR}" stroke-width="2.4" stroke-linejoin="round"/>`),
    ...D.map(d => `<path d="${d}" fill="#FFFFFF" stroke="${NOIR}" stroke-width="1.4" stroke-linejoin="round"/>`),
  ].join('\n');

  // ─── la porte de côté, le blessé couché dessus ───
  // Les y où une verticale x coupe les contours d'un SVG fait de polylignes (le corps simple).
  const coupesX = (svg, x) => {
    const ys = [];
    for (const m of String(svg).matchAll(/ d="([^"]+)"/g)) {
      const n = m[1].match(/-?\d+(\.\d+)?/g).map(Number);
      for (let i = 0; i + 3 < n.length; i += 2) {
        const [x0, y0, x1, y1] = [n[i], n[i + 1], n[i + 2], n[i + 3]];
        if (x0 !== x1 && (x0 - x) * (x1 - x) <= 0) ys.push(y0 + (y1 - y0) * (x - x0) / (x1 - x0));
      }
    }
    return ys;
  };
  const memo = {};
  // mm réels : la porte 2030 × 45, le blessé de 1750 (couche-dos) ; les sangles aux mêmes places
  // que sur la vue de dessus d'avant, en part de la taille depuis le sommet du crâne.
  const LP = 2030, EP = 45, TAILLE = 1750;
  const geoCote = z => {
    const cle = [z.l, z.h].join(',');
    if (memo[cle]) return memo[cle];
    const e = (z.l - 56) / LP, x0 = 28, G = Math.round(z.h * 0.5 + 52 * e * 2.4), yp = G - EP * e;   // G : sous la porte, sur la neige
    const c = F.corps({ x: 0, y: yp, pose: 'couche-dos', echelle: e });
    const dx = x0 + 70 * e - c.boite.x0, corps = `<g transform="translate(${f(dx)} 0)">\n${c}\n</g>`;
    const X = fr => x0 + 70 * e + fr * TAILLE * e;             // depuis le sommet du crâne
    const haut = x => { const ys = coupesX(c, x - dx); return ys.length ? Math.min(...ys) : yp; };
    return (memo[cle] = { e, x0, G, yp, X, haut, corps, Ld: LP * e });
  };
  // Un rouleau de linge vu de côté, couché sur la porte : un cylindre, sa face de dessous à l'ombre.
  const rouleauCote = (x1, x2, yb, r) => {
    const yc = yb - r;
    const d = `M${f(x1 + r * 0.4)},${f(yc - r)} L${f(x2 - r * 0.4)},${f(yc - r)} Q${f(x2 + r * 0.25)},${f(yc)} ${f(x2 - r * 0.4)},${f(yc + r)} L${f(x1 + r * 0.4)},${f(yc + r)} Q${f(x1 - r * 0.25)},${f(yc)} ${f(x1 + r * 0.4)},${f(yc - r)} Z`;
    const ombre = `M${f(x1 + r * 0.2)},${f(yc + r * 0.45)} L${f(x2 - r * 0.2)},${f(yc + r * 0.45)} Q${f(x2 - r * 0.1)},${f(yc + r * 0.8)} ${f(x2 - r * 0.4)},${f(yc + r)} L${f(x1 + r * 0.4)},${f(yc + r)} Q${f(x1 + r * 0.1)},${f(yc + r * 0.8)} ${f(x1 + r * 0.2)},${f(yc + r * 0.45)} Z`;
    return [h.path(d, h.a.blanc), h.path(ombre, h.a.ombre), h.path(d, h.a.arete),
      h.path(`M${f(x1 + r * 1.2)},${f(yc - r * 0.35)} L${f(x2 - r * 1.4)},${f(yc - r * 0.3)}`, h.a.detail)].join('\n');
  };
  // Une sangle vue de côté : par-dessus le corps (elle en suit le dessus) et sous la porte.
  const sangle = (g, x, l) => {
    const P = [];
    for (let k = 0; k <= 8; k++) { const xx = x - l / 2 + l * k / 8; P.push([xx, g.haut(xx) - 1]); }
    return h.chemin([[x - l / 2, g.G + 1.5], ...P, [x + l / 2, g.G + 1.5]], plein(h.a.arete), true);
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
    desc: 'Une porte dégondée sert de planche. De côté, la porte posée sur la neige, les pentures dans son chant : le blessé couché sur le dos, sanglé en travers de la poitrine, du bassin et des cuisses, chaque sangle passant par-dessus lui et sous la porte ; du linge roulé contre les jambes, un rouleau de vêtements contre la tête et une bande large en travers du front. Vue par la tête : les rouleaux serrés contre les tempes et la bande qui passe sur le front et fait le tour de la porte. Enfin, porte et blessé roulés ensemble sur la tranche, d’un bloc, une flèche rouge pour le mouvement.',
    format: 'pleine',
    disposition: [['cote'], ['tete', 'roule']],
    hauteurs: [0.68, 1],
    largeurs: [[1], [1, 1]],
    vues: {
      cote: {
        titre: 'De côté',
        dessin: z => {
          const g = geoCote(z), { e, x0, G, yp, X, Ld } = g, out = [];
          out.push(h.rect(0, G, z.l, 6, h.a.hachure('neige', 'aucun')), h.ligne(0, G, z.l, G, h.a.arete));
          // la porte sur sa tranche : les pentures encastrées dans le chant
          out.push(h.rect(x0, yp, Ld, EP * e, plein(h.a.contour)));
          for (const a of [0.12, 0.5, 0.88]) out.push(h.rect(f(x0 + a * Ld - 45 * e), f(yp + 4 * e), f(90 * e), f(EP * e - 8 * e), h.a.hachure('metal', 'detail')));
          // le blessé
          out.push(g.corps);
          // le rouleau de vêtements contre la tête, le linge roulé contre les jambes (côté de l'œil)
          out.push(rouleauCote(X(-0.01), X(0.14), yp, 56 * e));
          out.push(rouleauCote(X(0.62), X(0.93), yp, 60 * e));
          // les sangles, et la bande en travers du front
          for (const fr of [0.066, 0.3, 0.52, 0.665]) out.push(sangle(g, X(fr), (fr === 0.066 ? 1.25 : 1) * 0.036 * TAILLE * e));
          return out.join('\n');
        },
        renvois: z => {
          const g = geoCote(z), { e, yp, X } = g, yh = Math.min(...[0.066, 0.3, 0.52, 0.665].map(fr => g.haut(X(fr)))) - 34, yb = g.G + 26;
          const sur = fr => [f(X(fr)), f(g.haut(X(fr)) - 1)];
          return [
            { n: 1, rond: [f(X(0.3) + 24), yh], cible: sur(0.3), texte: 'sangle en travers de la poitrine' },
            { n: 2, rond: [f(X(0.52) + 24), yh], cible: sur(0.52), texte: 'sangle en travers du bassin' },
            { n: 3, rond: [f(X(0.665) + 24), yh], cible: sur(0.665), texte: 'sangle en travers des cuisses' },
            { n: 4, rond: [f(X(0.82)), yb], cible: [f(X(0.82)), f(yp - 4 * e)], texte: 'linge roulé dans les vides' },
            { n: 5, rond: [f(X(0.2)), yb], cible: [f(X(0.11)), f(yp - 10 * e)], texte: 'rouleaux de vêtements serrés contre la tête' },
            { n: 6, rond: [f(X(0.066) + 26), yh], cible: sur(0.066), texte: 'bande large en travers du front' },
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
          out.push(h.geste(`M${f(px + R * Math.cos(a0))},${f(G + R * Math.sin(a0) - 8)} A${f(R)} ${f(R)} 0 0 1 ${f(px + R * Math.cos(a1))},${f(G + R * Math.sin(a1))}`));
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
