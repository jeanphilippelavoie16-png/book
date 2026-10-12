// Planche 12-01b — la tente à poêle : le plan, la collerette, la charpente (ch. 12, sections 5A
// point 4, 5C, 5D, 9).
// Vu de dessus : la porte à gauche, sous le vent ; l'entrée d'air dans le mur qui reçoit le vent,
// au ras du plancher de l'allée, là où le renchaussement s'interrompt ; les trois haubans du tuyau
// et les cordons des murs amarrés à des corps morts. Mêmes positions que sur 12-01a.
// La collerette : la plaque taillée à plat (étoile au ciseau à froid, rangée de trous au clou), puis
// en coupe dans le pan du toit, le tuyau passé, les languettes rabattues, la toile ouverte plus
// grand que le tuyau et plus petit que la plaque, cousue au fil de fer.
// La charpente vue du bout : le chevalet en X lié au croisement, le faîte dans la fourche, les
// traverses sur leurs piquets fourchus. Aucune cote : le chapitre n'en donne pas.

module.exports = (h) => {
  const f = v => Math.round(v * 10) / 10;
  const blanc = a => a.replace('fill="none"', 'fill="#ffffff"');
  const poly = (pts, at) => h.chemin(pts, at, true);

  // ─── Géométrie commune avec 12-01a, en mètres.
  const Lg = 4.2, W = 1.5, B = 0.68;                 // longueur, demi-largeur, pied du renchaussement
  const pipe = { s: 0.6, l: 0.65 };                  // tuyau : 0,6 m du mur de la porte, côté sous le vent
  const H = [{ s: -3.3, l: 2.9 }, { s: 4.5, l: 2.9 }, { s: 0.6, l: -3.6 }];   // ancrages des haubans
  const ent = { s0: 0.92, s1: 1.08 };                // la boîte de l'entrée d'air, côté du vent
  const cordons = [0.25, 2.1, 3.95];

  const Pl = z => {
    const k = Math.min((z.l - 10) / 8.8, (z.h - 8) / 7.1);
    return { k, S: s => z.l / 2 + (s - 0.75) * k, Yp: l => z.h / 2 - (l + 0.35) * k };
  };
  // Un corps mort vu de dessus : un bout de bois couché en travers du tirant.
  const barre = (S, Yp, k, s, l, ds, dl) => {
    const n = Math.hypot(ds, dl), us = ds / n, ul = dl / n;          // sens du tirant
    const ps = -ul, pl = us, a = 0.28, e = 0.05;                   // en travers, demi-longueur, demi-épaisseur
    const P = (x, y) => [S(s + x), Yp(l + y)];
    return poly([P(ps * a + us * e, pl * a + ul * e), P(-ps * a + us * e, -pl * a + ul * e), P(-ps * a - us * e, -pl * a - ul * e), P(ps * a - us * e, pl * a - ul * e)], h.a.hachure('bois'));
  };

  // ─── La collerette.
  const R = 0.285, trou = 0.085, rt = 0.065;         // plaque, étoile, tuyau (m)
  const th = Math.atan(0.806);                         // pente du toit (même que 12-01a)
  const Fa = z => ({ k: Math.min(z.l - 16, z.h - 14) / (2 * R + 0.06), cx: z.l / 2, cy: z.h / 2 + 2 });
  const Co = z => {
    const k = Math.min((z.l - 10) / 0.5, (z.h - 10) / 0.5);
    const cx = z.l / 2, cy = z.h / 2 + 0.02 * k;
    const u = [Math.cos(th), Math.sin(th)];          // le long du pan, vers le bas à droite (px)
    const n = [Math.sin(th), -Math.cos(th)];         // normale, vers le dehors (px)
    const P = (t, o = 0) => [cx + t * u[0] * k + o * n[0], cy + t * u[1] * k + o * n[1]];
    return { k, cx, cy, u, n, P, trouP: (rt + 0.015) / Math.cos(th), ouv: 0.18 };
  };

  // ─── La charpente vue du bout.
  const Ch = z => {
    const k = Math.min((z.l - 16) / 3.25, (z.h - 14) / 2.62);
    const yf = z.h - 6 - 0.14 * k;
    return { k, X: x => z.l / 2 + x * k, Y: y => yf - y * k };
  };
  const rc = 0.06, pente = 2.0;                       // rayon des perches ; pente des jambes du X
  const yx = 2.2 - rc / Math.sin(Math.atan(1 / pente));   // hauteur du croisement sous le faîte
  const perche = (X, Y, k, x1, y1, x2, y2, e = 0.04) => {
    const dx = x2 - x1, dy = y2 - y1, n = Math.hypot(dx, dy), px = -dy / n * e, py = dx / n * e;
    return poly([[X(x1 + px), Y(y1 + py)], [X(x2 + px), Y(y2 + py)], [X(x2 - px), Y(y2 - py)], [X(x1 - px), Y(y1 - py)]], blanc(h.a.arete));
  };

  return {
    ref: '12-01b',
    titre: 'La tente à poêle : plan, collerette et charpente',
    desc: 'Vu de dessus, la porte à gauche et le fond à droite : le vent dominant arrive de biais par l’arrière, du côté du bas ; la porte est sous le vent, et l’entrée d’air, une boîte de conserve, traverse au ras du plancher le mur qui reçoit le vent, là où le renchaussement s’interrompt ; le renchaussement fait le tour du reste de la tente. Le poêle est près de la porte, du côté sous le vent ; trois haubans de fil de fer partent du tuyau vers trois corps morts, et les cordons des murs vont chacun à un corps mort, un bout de bois couché en travers du tirant et enfoui dans la neige foulée. La plaque taillée : un couvercle de baril aplati, une étoile taillée au centre au ciseau à froid, une rangée de trous au clou sur le pourtour. La collerette en coupe dans le pan du toit : le tuyau vertical passe dans l’étoile, dont les languettes sont rabattues vers le haut le long du tuyau ; la toile est découpée plus grand que le tuyau et plus petit que la plaque, et la plaque y est cousue au fil de fer par ses trous ; la toile ne touche jamais le tuyau. La charpente vue du bout : deux perches croisées en X et liées au croisement, le faîte posé dans la fourche au-dessus, et de chaque côté une traverse posée dans un piquet fourchu planté dans la neige foulée.',
    format: 'pleine',
    disposition: [['plan'], ['face', 'coupe', 'charpente']],
    hauteurs: [1.3, 1],
    largeurs: [[1], [1, 1, 1.2]],
    vues: {
      plan: {
        titre: 'Vu de dessus, la porte à gauche',
        dessin: z => {
          const { k, S, Yp } = Pl(z), out = [];
          const R4 = (s0, s1, l0, l1, at) => h.rect(S(s0), Yp(l1), (s1 - s0) * k, (l1 - l0) * k, at);
          const neige = h.a.hachure('neige', 'detail');
          // Le renchaussement : tout le tour, sauf la porte et l'entrée d'air.
          out.push(R4(-B, Lg + B, W, W + B, neige));
          out.push(R4(Lg, Lg + B, -W, W, neige));
          out.push(R4(-B, ent.s0 - 0.05, -W - B, -W, neige));
          out.push(R4(ent.s1 + 0.05, Lg + B, -W - B, -W, neige));
          out.push(R4(-B, 0, 0.45, W, neige));
          out.push(R4(-B, 0, -W, -0.45, neige));
          // Les murs, la porte ouverte.
          out.push(h.chemin([[S(0), Yp(0.42)], [S(0), Yp(W)], [S(Lg), Yp(W)], [S(Lg), Yp(-W)], [S(0), Yp(-W)], [S(0), Yp(-0.42)]], h.a.contour));
          out.push(h.path(`M ${f(S(0))} ${f(Yp(0.42))} L ${f(S(-0.34))} ${f(Yp(0.6))} M ${f(S(0))} ${f(Yp(-0.42))} L ${f(S(-0.34))} ${f(Yp(-0.6))}`, h.a.arete));
          // L'entrée d'air : la boîte à travers le mur, au ras du plancher.
          out.push(R4(ent.s0, ent.s1, -W - 0.34, -W + 0.12, blanc(h.a.arete)));
          // Les cordons et leurs corps morts.
          for (const s of cordons) for (const g of [-1, 1]) {
            out.push(h.ligne(S(s), Yp(g * W), S(s), Yp(g * 2.55), h.a.detail));
            out.push(barre(S, Yp, k, s, g * 2.6, 0, g));
          }
          // Les haubans et leurs corps morts.
          for (const a of H) {
            out.push(h.ligne(S(pipe.s), Yp(pipe.l), S(a.s), Yp(a.l), h.a.detail));
            out.push(barre(S, Yp, k, a.s, a.l, a.s - pipe.s, a.l - pipe.l));
          }
          // Le poêle sur ses quatre pieux, le tuyau coiffé du pare-étincelles.
          out.push(R4(0.5, 1.1, 0.4, 0.9, blanc(h.a.arete)));
          for (const s of [0.56, 1.04]) for (const l of [0.46, 0.84]) out.push(h.cercle(S(s), Yp(l), 0.045 * k, h.a.plein));
          out.push(h.cercle(S(pipe.s), Yp(pipe.l), 0.1 * k, blanc(h.a.arete)));
          out.push(h.cercle(S(pipe.s), Yp(pipe.l), 0.1 * k, h.a.hachure('grillage', 'aucun')));
          // Le vent dominant, de biais par l'arrière, du côté du vent.
          out.push(h.fleche(`M ${f(S(5.0))} ${f(Yp(-3.45))} L ${f(S(3.75))} ${f(Yp(-2.9))}`));
          return out.join('\n');
        },
        renvois: z => {
          const { k, S, Yp } = Pl(z);
          const h2 = t => [S(pipe.s + t * (H[1].s - pipe.s)), Yp(pipe.l + t * (H[1].l - pipe.l))];
          return [
            { n: 1, rond: [S(5.3), Yp(-2.95)], cible: [S(5.0), Yp(-3.4)], texte: 'vent dominant' },
            { n: 2, rond: [S(-1.35), Yp(0)], cible: [S(-0.12), Yp(0)], texte: 'porte sous le vent' },
            { n: 3, rond: [S(1.75), Yp(-2.95)], cible: [S(1.0), Yp(-1.7)], texte: 'entrée d’air, du côté du vent' },
            { n: 4, rond: [S(5.35), Yp(0.6)], cible: [S(4.55), Yp(0.35)], texte: 'renchaussé, sauf à l’entrée' },
            { n: 5, rond: [h2(0.62)[0], h2(0.62)[1] - 0.72 * k], cible: h2(0.62), texte: 'trois haubans de fil de fer' },
            { n: 6, rond: [S(1.55), Yp(-3.6)], cible: [S(0.82), Yp(-3.6)], texte: 'corps mort, bois enfoui' },
          ];
        },
      },
      face: {
        titre: 'La plaque taillée',
        dessin: z => {
          const { k, cx, cy } = Fa(z), out = [];
          out.push(h.cercle(cx, cy, R * k, blanc(h.a.contour)));
          // L'étoile : huit coupes au ciseau à froid ; les plis des languettes en tireté.
          const n8 = [...Array(8)].map((_, i) => i * Math.PI / 4 + Math.PI / 8);
          out.push(h.path(n8.map(a => `M ${f(cx)} ${f(cy)} L ${f(cx + Math.cos(a) * trou * k)} ${f(cy + Math.sin(a) * trou * k)}`).join(' '), h.a.arete));
          out.push(h.chemin(n8.map(a => [cx + Math.cos(a) * trou * k, cy + Math.sin(a) * trou * k]), h.a.cache, true));
          // La rangée de trous au clou.
          for (let i = 0; i < 22; i++) {
            const a = i * 2 * Math.PI / 22;
            out.push(h.cercle(cx + Math.cos(a) * (R - 0.028) * k, cy + Math.sin(a) * (R - 0.028) * k, 1.6, blanc(h.a.detail)));
          }
          return out.join('\n');
        },
        renvois: z => {
          const { k, cx, cy } = Fa(z);
          const a2 = 5 * Math.PI / 8 + Math.PI / 8 - Math.PI / 8;   // une coupe de l'étoile
          const ah = 2 * Math.PI * 3 / 22;
          return [
            { n: 7, rond: [cx - R * k * 0.62, cy - R * k * 0.98], cible: [cx - R * k * 0.5, cy - R * k * 0.62], texte: 'couvercle de baril aplati' },
            { n: 8, rond: [cx + R * k * 0.1, cy + R * k * 0.55], cible: [cx + Math.cos(a2) * trou * k * 0.6, cy + Math.sin(a2) * trou * k * 0.6], texte: 'étoile au ciseau à froid' },
            { n: 9, rond: [cx + R * k * 1.05, cy + R * k * 0.95], cible: [cx + Math.cos(ah) * (R - 0.028) * k, cy + Math.sin(ah) * (R - 0.028) * k], texte: 'trous au clou tout autour' },
          ];
        },
      },
      coupe: {
        titre: 'Cousue dans le pan, en coupe',
        dessin: z => {
          const g = Co(z), { k, P, n, cx } = g, out = [];
          // Le tuyau, vertical, à travers le pan.
          out.push(h.rect(cx - rt * k, 4, 2 * rt * k, z.h - 8, blanc(h.a.arete)));
          // La toile, ouverte plus grand que le tuyau et plus petit que la plaque.
          const tm = (z.l / 2 - 3) / (k * Math.cos(th));
          out.push(h.chemin([P(-tm), P(-g.ouv)], h.a.arete));
          out.push(h.chemin([P(g.ouv), P(tm)], h.a.arete));
          // La plaque par-dessus, trouée à peine plus grand que le tuyau.
          for (const s of [-1, 1]) out.push(poly([P(s * g.trouP, 1.4), P(s * R, 1.4), P(s * R, 4.4), P(s * g.trouP, 4.4)], h.a.plein));
          // Les languettes rabattues vers le haut, le long du tuyau.
          for (const s of [-1, 1]) {
            const [x0, y0] = P(s * g.trouP, 2.9);
            out.push(h.ligne(x0 - s * 1.2, y0, x0 - s * 1.2, y0 - 0.07 * k, 'fill="none" stroke="#1A1A1A" stroke-width="2.4" stroke-linecap="butt"'));
          }
          // Les points de fil de fer, par les trous de la plaque et à travers la toile.
          for (const t of [-0.245, 0.245]) {
            const a = P(t - 0.012, -4), b = P(t - 0.012, 8), c = P(t + 0.012, 8), d = P(t + 0.012, -4);
            out.push(h.path(`M ${f(a[0])} ${f(a[1])} L ${f(b[0])} ${f(b[1])} L ${f(c[0])} ${f(c[1])} L ${f(d[0])} ${f(d[1])} Z`, h.a.detail));
          }
          return out.join('\n');
        },
        renvois: z => {
          const g = Co(z), { k, P, cx } = g;
          const [xl, yl] = P(-g.trouP, 2.9);
          return [
            { n: 10, rond: [cx - 0.17 * k, P(-0.1)[1] - 0.2 * k], cible: [xl + 1.2, yl - 0.05 * k], texte: 'languettes rabattues' },
            { n: 11, rond: [P(0.245)[0] + 0.02 * k, P(0.245)[1] - 0.16 * k], cible: P(0.257, 8), texte: 'cousue à la toile au fil de fer' },
            { n: 12, rond: [P(0.15)[0] + 0.02 * k, P(0.15)[1] + 0.2 * k], cible: P(g.ouv + 0.004, -1), texte: 'toile ouverte loin du tuyau' },
          ];
        },
      },
      charpente: {
        titre: 'La charpente, vue du bout',
        dessin: z => {
          const { k, X, Y } = Ch(z), out = [];
          // Le plancher de neige foulée.
          out.push(h.rect(2, Y(0), z.l - 4, 0.14 * k, h.a.hachure('neige', 'aucun')));
          out.push(h.ligne(2, Y(0), z.l - 2, Y(0), h.a.arete));
          // Les piquets fourchus et les traverses.
          for (const s of [-1, 1]) {
            const xt = s * (W - rc);
            out.push(h.rect(X(xt) - 0.035 * k, Y(0.93), 0.07 * k, 0.93 * k, blanc(h.a.arete)));
            out.push(h.rect(X(xt) - 0.035 * k, Y(0), 0.07 * k, 0.12 * k, h.a.cache));
            out.push(perche(X, Y, k, xt, 0.9, xt - 0.1, 1.1, 0.025));
            out.push(perche(X, Y, k, xt, 0.9, xt + 0.1, 1.1, 0.025));
            out.push(h.cercle(X(xt), Y(1.04), rc * k, h.a.hachure('bois')));
          }
          // Le chevalet : deux perches croisées en X, liées au croisement ; le faîte dans la fourche.
          const xs = yx / pente, xh = (2.42 - yx) / pente;
          out.push(perche(X, Y, k, -xs, -0.1, xh, 2.42));
          out.push(perche(X, Y, k, xs, -0.1, -xh, 2.42));
          out.push(h.rect(X(-0.06), Y(yx + 0.05), 0.12 * k, 0.1 * k, h.a.plein));
          out.push(h.cercle(X(0), Y(2.2), rc * k, h.a.hachure('bois')));
          return out.join('\n');
        },
        renvois: z => {
          const { k, X, Y } = Ch(z);
          return [
            { n: 13, rond: [X(-0.75), Y(2.2)], cible: [X(-0.07), Y(yx)], texte: 'deux perches liées en X' },
            { n: 14, rond: [X(0.7), Y(2.45)], cible: [X(0.05), Y(2.24)], texte: 'faîte posé dans la fourche' },
            { n: 15, rond: [X(-0.95), Y(1.45)], cible: [X(-1.44), Y(1.1)], texte: 'traverse sur piquet fourchu' },
          ];
        },
      },
    },
  };
};
