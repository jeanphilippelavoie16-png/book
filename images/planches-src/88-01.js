// Planche 88-01 — la bannique dans le sable (chapitre 88, 9-C « Plus de four »).
// Quatre vues de côté, dans l'ordre du geste : le feu sur le sable, la braise écartée et
// la galette posée, la cuisson en coupe (sable chauffé dessous, galette, couche de sable,
// braise ramenée), la galette cuite soulevée au bâton.
// Aucune cote : le chapitre ne donne aucune dimension pour cette façon de faire.

module.exports = (h) => {
  const f = v => Math.round(v * 10) / 10;
  const NOIR = '#1A1A1A';
  const blancTrait = 'fill="none" stroke="#ffffff" stroke-width="1.1" stroke-linecap="round"';
  const blancArete = h.a.arete.replace('fill="none"', 'fill="#ffffff"');
  const blancContour = h.a.contour.replace('fill="none"', 'fill="#ffffff"');
  const halo = 'fill="none" stroke="#ffffff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"';

  // Graine fixe : le sable et la braise sont les mêmes à chaque composition.
  let graine = 88;
  const hasard = () => (graine = (graine * 16807) % 2147483647) / 2147483647;

  const dedans = (poly, x, y) => {
    let c = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const [xi, yi] = poly[i], [xj, yj] = poly[j];
      if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c;
    }
    return c;
  };
  const tourne = (pts, ang, px, py) => {
    const c = Math.cos(ang), s = Math.sin(ang);
    return pts.map(([x, y]) => [px + (x - px) * c - (y - py) * s, py + (x - px) * s + (y - py) * c]);
  };
  const bezier = (p0, p1, p2, p3, n = 14) => {
    const out = [];
    for (let i = 1; i <= n; i++) {
      const t = i / n, u = 1 - t;
      out.push([0, 1].map(k => u * u * u * p0[k] + 3 * u * u * t * p1[k] + 3 * u * t * t * p2[k] + t * t * t * p3[k]));
    }
    return out;
  };

  // Sable : un semis de grains sur une grille secouée, dans un polygone, hors des trous.
  const sable = (poly, trous = [], pas = 5.2) => {
    const xs = poly.map(p => p[0]), ys = poly.map(p => p[1]);
    const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
    let d = '';
    for (let y = y0 + pas / 2; y < y1; y += pas) {
      for (let x = x0 + pas / 2; x < x1; x += pas) {
        const px = x + (hasard() - 0.5) * pas * 0.9, py = y + (hasard() - 0.5) * pas * 0.9;
        if (!dedans(poly, px, py) || trous.some(t => dedans(t, px, py))) continue;
        d += `M${f(px)} ${f(py)}h0.01`;
      }
    }
    return `<path d="${d}" fill="none" stroke="${NOIR}" stroke-width="1.4" stroke-linecap="round"/>`;
  };

  // Une braise : un morceau noir, fendu de blanc.
  const braise = (cx, cy, rx, ry) => {
    const pts = [[-1, 0.1], [-0.8, -0.6], [-0.3, -0.95], [0.25, -0.85], [0.75, -0.7], [1, -0.05], [0.8, 0.6], [0.2, 0.95], [-0.5, 0.85]]
      .map(([u, v]) => [cx + u * rx, cy + v * ry]);
    return [
      h.chemin(pts, h.a.plein, true),
      h.path(`M ${f(cx - rx * 0.55)} ${f(cy)} L ${f(cx - rx * 0.1)} ${f(cy + ry * 0.2)} L ${f(cx + rx * 0.45)} ${f(cy - ry * 0.25)}`, blancTrait),
    ].join('\n');
  };
  // Un lit de braise posé sur une courbe y = sol(x), de xa à xb ; le pas suit la pente.
  const litBraise = (xa, xb, sol, rangs = 1, taille = 1) => {
    const out = [];
    for (let r = 0; r < rangs; r++) {
      let x = xa + (r ? 5 * taille : 0);
      while (x < xb) {
        const rx = (5 + hasard() * 3) * taille, ry = (3.4 + hasard() * 1.6) * taille;
        const y = sol(x) - ry * 0.85 - r * 6.5 * taille;
        out.push(braise(x, y, rx, ry));
        const pente = (sol(x + 1) - sol(x - 1)) / 2;
        x += (rx * 1.75 + hasard() * 2) / Math.sqrt(1 + pente * pente);
      }
    }
    return out.join('\n');
  };
  // Un tas de braise écartée.
  const tas = (cx, yG, l, ht, taille = 1) => {
    const bosse = x => yG - ht * Math.max(0, 1 - Math.pow((x - cx) / (l / 2), 2));
    return [litBraise(cx - l / 2 + 4, cx + l / 2 - 4, () => yG, 1, taille),
      litBraise(cx - l * 0.32, cx + l * 0.3, x => bosse(x) + ht * 0.25, 1, taille),
      litBraise(cx - l * 0.15, cx + l * 0.14, x => bosse(x) + 2, 1, taille)].join('\n');
  };

  // La galette en coupe : un disque épais, dessous plat, bords arrondis (superellipse).
  const galettePoly = (cx, yb, W, H, marge = 0) => {
    const a = W / 2 + marge, b = H / 2 + marge, yc = yb - H / 2, n = 4, pts = [];
    for (let i = 0; i < 72; i++) {
      const t = i / 72 * 2 * Math.PI, c = Math.cos(t), s = Math.sin(t);
      pts.push([cx + a * Math.sign(c) * Math.pow(Math.abs(c), 2 / n), yc + b * Math.sign(s) * Math.pow(Math.abs(s), 2 / n)]);
    }
    return pts;
  };
  const galetteCoupe = (cx, yb, W, H) => {
    const out = [h.chemin(galettePoly(cx, yb, W, H), blancContour, true)];
    out.push(h.chemin(galettePoly(cx, yb, W, H, -3.2), h.a.fin, true));     // la farine, dessus et dessous
    [[-0.3, 0.45, 5, 2.4], [-0.05, 0.6, 4, 2], [0.22, 0.42, 5.5, 2.6], [0.36, 0.62, 3.5, 1.8], [-0.38, 0.66, 3, 1.6], [0.06, 0.36, 3, 1.6]]
      .forEach(([u, v, rx, ry]) => out.push(h.ellipse(cx + u * W, yb - v * H, rx * W / 150, ry * H / 34, h.a.fin)));
    return out.join('\n');
  };

  // La galette vue de côté, un peu d'en haut : une miche plate, bombée, aux épaules rondes,
  // le dessus poudré de farine. ang et (px, py) la font basculer.
  const miche = (cx, yb, a, ep, ang = 0, px = cx, py = yb) => {
    const b = a * 0.3;
    const dessous = [];
    for (let i = 0; i <= 24; i++) { const t = Math.PI - i / 24 * Math.PI; dessous.push([cx + a * Math.cos(t), yb + b * Math.sin(t)]); }
    const sommet = [cx, yb - b - ep];
    const epD = bezier([cx + a, yb], [cx + a + 3, yb - ep * 0.95], [cx + a * 0.6, yb - b - ep], sommet);
    const epG = bezier(sommet, [cx - a * 0.6, yb - b - ep], [cx - a - 3, yb - ep * 0.95], [cx - a, yb]);
    const contour = [...dessous, ...epD, ...epG];
    const rebord = [];
    for (let i = 0; i <= 20; i++) { const t = Math.PI * 0.94 - i / 20 * Math.PI * 0.88; rebord.push([cx + a * 0.9 * Math.cos(t), yb - ep * 0.62 + b * 0.8 * Math.sin(t)]); }
    const farine = [[-0.5, -0.1], [-0.3, 0.2], [-0.1, -0.3], [0.1, 0.1], [0.3, -0.2], [0.45, 0.15], [-0.2, -0.05], [0.2, 0.35], [-0.4, 0.35], [0.05, -0.45], [0.55, -0.05], [-0.6, 0.1]]
      .map(([u, v]) => [cx + u * a, yb - ep * 0.62 - b * 0.35 + v * b * 1.1]);
    const T = p => tourne(p, ang, px, py);
    return [
      h.chemin(T(contour), blancContour, true),
      h.chemin(T(rebord), h.a.fin),
      ...T(farine).map(([x, y]) => h.cercle(x, y, 0.9, h.a.plein)),
    ].join('\n');
  };

  // Un bâton : un rondin mince hachuré, avec le moignon d'une branche ; (x2, y2) est le bout.
  const baton = (x1, y1, x2, y2, ep = 7) => {
    const L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L, px = -uy * ep / 2, py = ux * ep / 2;
    const corps = [[x1 + px, y1 + py], [x2 + px * 0.8, y2 + py * 0.8], [x2 - px * 0.8, y2 - py * 0.8], [x1 - px, y1 - py]];
    const bx = x1 + ux * L * 0.3, by = y1 + uy * L * 0.3;
    const moignon = [[bx - px, by - py], [bx - px * 2.6 + ux * 9, by - py * 2.6 + uy * 9], [bx - px * 1.6 + ux * 13, by - py * 1.6 + uy * 13], [bx - px + ux * 8, by - py + uy * 8]];
    return [
      h.chemin(moignon, blancArete, true),
      h.chemin(corps, h.a.blanc, true),
      h.chemin(corps, h.a.hachure('bois', 'arete'), true),
      h.ellipse(x2, y2, ep * 0.3, ep * 0.4, h.a.detail),
    ].join('\n');
  };
  // Une bûche vue de côté, de (x1, y1) à (x2, y2), le bout coupé visible en (x2, y2).
  const buche = (x1, y1, x2, y2, r) => {
    const L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L, px = -uy * r, py = ux * r;
    const corps = [[x1 + px, y1 + py], [x2 + px, y2 + py], [x2 - px, y2 - py], [x1 - px, y1 - py]];
    const bout = [];
    for (let i = 0; i < 24; i++) { const t = i / 24 * 2 * Math.PI; bout.push([x2 + ux * r * 0.45 * Math.cos(t) + (px / r) * r * Math.sin(t), y2 + uy * r * 0.45 * Math.cos(t) + (py / r) * r * Math.sin(t)]); }
    return [
      h.chemin(corps, h.a.blanc, true),
      h.chemin(corps, h.a.hachure('bois', 'arete'), true),
      h.chemin(bout, blancArete, true),
      h.chemin(bout.map(([x, y]) => [x2 + (x - x2) * 0.4, y2 + (y - y2) * 0.4]), h.a.fin, true),
    ].join('\n');
  };

  // Une flèche de chaleur : tiretée, sur un liseré blanc pour se lire sur le sable.
  const chaleur = d => [h.path(d, halo), h.fleche(d, h.a.cache)].join('\n');

  // Le sol de sable coupé : de yG jusqu'au bas de la vue.
  const sol = (z, yG) => [[4, yG], [z.l - 4, yG], [z.l - 4, z.h - 4], [4, z.h - 4]];
  // Le sable chauffé par le feu : une lentille tiretée sous l'emplacement du feu.
  const lentille = (cx, yG, rx, ry) => `M ${f(cx - rx)} ${f(yG)} C ${f(cx - rx)} ${f(yG + ry * 0.9)} ${f(cx - rx * 0.5)} ${f(yG + ry)} ${f(cx)} ${f(yG + ry)} C ${f(cx + rx * 0.5)} ${f(yG + ry)} ${f(cx + rx)} ${f(yG + ry * 0.9)} ${f(cx + rx)} ${f(yG)}`;

  // ─── Géométries partagées par le dessin et les renvois ────────────────────────────
  const gFeu = z => {
    const yG = Math.round(z.h * 0.56), cx = Math.round(z.l * 0.46);
    return { yG, cx, rx: Math.round(z.l * 0.3), ry: Math.round(Math.min(z.h - yG - 14, 64)), r: Math.round(z.h * 0.04) };
  };
  const gEcart = z => {
    const yG = Math.round(z.h * 0.6), cx = Math.round(z.l * 0.5);
    return { yG, cx, a: Math.round(z.l * 0.2), rx: Math.round(z.l * 0.3), ry: Math.round(Math.min(z.h - yG - 12, 60)),
      xTg: Math.round(z.l * 0.13), xTd: Math.round(z.l * 0.87), yGal: Math.round(z.h * 0.24) };
  };
  const gCoupe = z => {
    const yG = Math.round(z.h * 0.42), cx = Math.round(z.l * 0.45);
    const W = Math.round(z.l * 0.44), H = Math.round(W * 0.24), t = 20;
    const demi = W / 2 + t + 34, p = (W / 2 + t * 0.6) / demi, hm = H + t;
    const monte = x => {
      const u = Math.abs(x - cx) / demi;
      if (u >= 1) return yG;
      const s = u <= p ? 1 : 0.5 + 0.5 * Math.cos(Math.PI * (u - p) / (1 - p));
      return yG - hm * s;
    };
    return { yG, cx, W, H, t, demi, monte, hm, rx: Math.round(demi * 0.95), ry: Math.round(Math.min(z.h - yG - 22, 96)) };
  };
  const gDeg = z => {
    const yG = Math.round(z.h * 0.56), a = Math.round(z.l * 0.3), cx = Math.round(z.l * 0.58);
    const ep = Math.round(a * 0.3), ang = 0.38, b = a * 0.3;      // la miche bascule sur son bord droit
    // on la pose pour que le point le plus bas du dessous basculé touche le sable
    const px = cx + a, dessous = [];
    for (let i = 0; i <= 24; i++) { const u = -1 + i / 12; dessous.push([cx + u * a, yG + b * Math.sqrt(Math.max(0, 1 - u * u))]); }
    const bas = Math.max(...tourne(dessous, ang, px, yG).map(p => p[1]));
    const yb = yG - (bas - yG) - 1, py = yb;
    // le bout du bâton, glissé loin sous la miche : caché derrière le bord du dessous
    const [bx, by] = tourne([[cx - a * 0.2, yb + b * Math.sqrt(1 - 0.04)]], ang, px, py)[0];
    return { yG, a, b, cx, ep, ang, px, py, yb, bx, by: by - 8 };
  };

  return {
    ref: '88-01',
    titre: 'La bannique dans le sable',
    desc: 'Quatre vues de côté, dans l’ordre du geste. Un bon feu de bûches fait directement sur le sable sec, qui chauffe le sable dessous. Le feu tombé en braise, la braise écartée au bâton de part et d’autre, et la galette ronde et épaisse, farinée dessus et dessous, qu’on pose à même le sable chaud. En coupe, pendant la cuisson, de haut en bas : la braise ramenée par-dessus, une couche de sable chaud, la galette, et le sable chauffé par le feu ; la chaleur y entre par le dessus et par le dessous. À la fin, la galette soulevée au bâton glissé dessous, puis secouée et brossée.',
    format: 'pleine',
    disposition: [['feu', 'ecart'], ['coupe', 'deg']],
    hauteurs: [5, 6],
    largeurs: [[1, 1], [3, 2]],
    vues: {
      feu: {
        titre: 'Le feu sur le sable, jusqu’à la braise',
        dessin: z => {
          const g = gFeu(z), out = [], r = g.r;
          out.push(sable(sol(z, g.yG)));
          out.push(h.ligne(4, g.yG, z.l - 4, g.yG, h.a.arete));
          out.push(h.path(lentille(g.cx, g.yG, g.rx, g.ry), h.a.cache));
          // les flammes, qui montent d'entre les bûches
          const yb = g.yG - r * 3;
          const flamme = (x, ht, w) => h.path(`M ${f(x - w)} ${f(yb)} C ${f(x - w - 3)} ${f(yb - ht * 0.45)} ${f(x - 3)} ${f(yb - ht * 0.7)} ${f(x + 2)} ${f(yb - ht)} C ${f(x + 5)} ${f(yb - ht * 0.62)} ${f(x + w + 3)} ${f(yb - ht * 0.42)} ${f(x + w)} ${f(yb)} Z`, blancArete);
          out.push(flamme(g.cx - r * 3, r * 6, r * 1.8), flamme(g.cx + r * 2.8, r * 5.4, r * 1.7), flamme(g.cx, r * 8.5, r * 2.2));
          // les bûches croisées, couchées sur le sable
          const L = g.rx * 0.95;
          out.push(buche(g.cx + L * 0.55, g.yG - r, g.cx - L * 0.5, g.yG - r * 5.2, r));
          out.push(buche(g.cx - L * 0.6, g.yG - r, g.cx + L * 0.5, g.yG - r * 4.6, r * 1.1));
          // la braise au pied du feu
          out.push(litBraise(g.cx - g.rx * 0.75, g.cx + g.rx * 0.75, () => g.yG, 1, 0.9));
          // la chaleur qui descend dans le sable
          [-0.5, 0, 0.5].forEach(u => {
            const x = g.cx + u * g.rx;
            out.push(chaleur(`M ${f(x)} ${f(g.yG + 9)} L ${f(x)} ${f(g.yG + g.ry * 0.74)}`));
          });
          return out.join('\n');
        },
        renvois: z => {
          const g = gFeu(z), r = g.r;
          return [
            { n: 1, rond: [g.cx + g.rx + 24, g.yG - r * 8], cible: [g.cx + g.rx * 0.5, g.yG - r * 4.4], texte: 'bon feu, directement sur le sable sec' },
            { n: 2, rond: [g.cx + g.rx + 24, g.yG + g.ry * 0.55], cible: [g.cx + g.rx * 0.8, g.yG + g.ry * 0.42], texte: 'le sable chauffe sous le feu' },
          ];
        },
      },

      ecart: {
        titre: 'La braise écartée, la galette posée',
        dessin: z => {
          const g = gEcart(z), out = [];
          out.push(sable(sol(z, g.yG)));
          out.push(h.ligne(4, g.yG, z.l - 4, g.yG, h.a.arete));
          out.push(h.path(lentille(g.cx, g.yG, g.rx, g.ry), h.a.cache));
          // les deux tas de braise écartée
          out.push(tas(g.xTg, g.yG, z.l * 0.18, 16, 0.9), tas(g.xTd, g.yG, z.l * 0.18, 16, 0.9));
          // le bâton, tenu d'en haut à gauche, qui tire la braise vers la gauche
          const bout = [g.xTg + z.l * 0.1, g.yG - 6];
          out.push(baton(6, g.yG - 92, bout[0], bout[1], 6.5));
          out.push(h.fleche(`M ${f(g.cx - z.l * 0.1)} ${f(g.yG - 16)} L ${f(bout[0] + 12)} ${f(g.yG - 16)}`));
          out.push(h.fleche(`M ${f(g.cx + z.l * 0.1)} ${f(g.yG - 16)} L ${f(g.xTd - z.l * 0.12)} ${f(g.yG - 16)}`));
          // la galette, qui descend se poser à même le sable chaud
          out.push(miche(g.cx, g.yGal, g.a, g.a * 0.3));
          out.push(h.fleche(`M ${f(g.cx)} ${f(g.yGal + g.a * 0.3 + 10)} L ${f(g.cx)} ${f(g.yG - 26)}`));
          return out.join('\n');
        },
        renvois: z => {
          const g = gEcart(z);
          return [
            { n: 3, rond: [g.xTd, g.yG - 46], cible: [g.xTd - 2, g.yG - 12], texte: 'braise écartée au bâton' },
            { n: 4, rond: [g.cx + g.a + 32, g.yGal - g.a * 0.45], cible: [g.cx + g.a * 0.55, g.yGal - g.a * 0.42], texte: 'galette épaisse, farinée dessus et dessous' },
          ];
        },
      },

      coupe: {
        titre: 'En coupe, pendant la cuisson',
        dessin: z => {
          const g = gCoupe(z), out = [];
          // le sol et la couche de sable, d'un seul tenant : la butte suit monte(x)
          const bord = [];
          for (let x = 4; x <= z.l - 4; x += 3) bord.push([x, g.monte(x)]);
          const poly = [...bord, [z.l - 4, z.h - 4], [4, z.h - 4]];
          out.push(sable(poly, [galettePoly(g.cx, g.yG, g.W, g.H, 3)]));
          out.push(h.chemin(bord, h.a.arete));
          out.push(h.path(lentille(g.cx, g.yG, g.rx, g.ry), h.a.cache));
          out.push(galetteCoupe(g.cx, g.yG, g.W, g.H));
          // la braise ramenée par-dessus toute la butte, deux épaisseurs au sommet
          out.push(litBraise(g.cx - g.demi + 4, g.cx + g.demi - 4, g.monte, 1, 1.05));
          out.push(litBraise(g.cx - g.W * 0.45, g.cx + g.W * 0.45, g.monte, 2, 1.05));
          // la chaleur : par le dessus, à travers la couche de sable ; par le dessous
          [-0.28, 0, 0.28].forEach(u => {
            const x = g.cx + u * g.W;
            out.push(chaleur(`M ${f(x)} ${f(g.yG - g.hm + 4)} L ${f(x)} ${f(g.yG - g.H - 3)}`));
            out.push(chaleur(`M ${f(x)} ${f(g.yG + g.ry * 0.72)} L ${f(x)} ${f(g.yG + 5)}`));
          });
          return out.join('\n');
        },
        renvois: z => {
          const g = gCoupe(z), xr = z.l - 22;
          const xs = g.cx + g.W / 2 + 14;
          return [
            { n: 5, rond: [xr, g.yG - g.hm - 34], cible: [g.cx + g.W * 0.36, g.yG - g.hm - 10], texte: 'braise ramenée par-dessus' },
            { n: 6, rond: [xr, g.yG - g.hm + 6], cible: [xs + 4, g.monte(xs + 4) + 10], texte: 'couche de sable chaud' },
            { n: 7, rond: [xr, g.yG - g.H * 0.5 + 14], cible: [g.cx + g.W * 0.44, g.yG - g.H * 0.5], texte: 'galette, à même le sable chaud' },
            { n: 8, rond: [xr, g.yG + g.ry * 0.6], cible: [g.cx + g.rx * 0.8, g.yG + g.ry * 0.45], texte: 'sable chauffé par le feu' },
          ];
        },
      },

      deg: {
        titre: 'Cuite, soulevée au bâton',
        dessin: z => {
          const g = gDeg(z), out = [];
          out.push(sable(sol(z, g.yG)));
          out.push(h.ligne(4, g.yG, z.l - 4, g.yG, h.a.arete));
          // la braise repoussée à gauche, hors du chemin
          out.push(tas(z.l * 0.1, g.yG, z.l * 0.17, 11, 0.8));
          // le bâton glissé sous le bord gauche : on le lève, la miche bascule sur son bord droit
          const phi = 0.3, L = Math.min(z.l * 0.7, (g.bx - 10) / Math.cos(phi));
          out.push(baton(g.bx - L * Math.cos(phi), g.by - L * Math.sin(phi), g.bx, g.by, 6.5));
          out.push(miche(g.cx, g.yb, g.a, g.ep, g.ang, g.px, g.py));
          // le sable qui tombe du dessous
          [[-0.55, 10], [-0.35, 18], [-0.15, 9], [0.05, 15], [-0.45, 28], [-0.2, 24], [0.2, 8]].forEach(([u, dy]) => {
            const [x, y] = tourne([[g.cx + u * g.a, g.yb + g.b * Math.sqrt(1 - u * u)]], g.ang, g.px, g.py)[0];
            if (y + dy < g.yG - 3) out.push(h.cercle(x, y + dy, 1, h.a.plein));
          });
          // le geste : le bâton se lève
          const [xl, yl] = tourne([[g.cx - g.a, g.yb]], g.ang, g.px, g.py)[0];
          out.push(h.fleche(`M ${f(xl - 14)} ${f(yl + 20)} Q ${f(xl - 22)} ${f(yl - 8)} ${f(xl - 6)} ${f(yl - 30)}`));
          return out.join('\n');
        },
        renvois: z => {
          const g = gDeg(z);
          const [xh, yh] = tourne([[g.cx + g.a * 0.3, g.yb - g.ep - g.b]], g.ang, g.px, g.py)[0];
          return [
            { n: 9, rond: [z.l - 18, yh - 40], cible: [xh + 4, yh + 6], texte: 'soulevée au bâton, secouée, brossée' },
          ];
        },
      },
    },
  };
};
