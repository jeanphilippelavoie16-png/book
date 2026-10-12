// Planche 58-07 — La brimbale de bois (ch. 54, section 9-C, point 17)
module.exports = (h) => {
  const rad = d => d * Math.PI / 180;
  const f = n => Math.round(n * 10) / 10;
  const pieces = (a) => a.join('\n');
  const tiret = h.a.fin + ' stroke-dasharray="4 3"';

  // Géométrie commune de la vue principale, calculée d'après la taille de la vue.
  const geo = z => {
    const W = z.l, H = z.h;
    const g = {
      W, H,
      px: W * 0.60, py: H * 0.20,          // pivot, près du trou : le bras du fanion est le long bras
      hc: W * 0.82,                        // axe du trou et de la ligne
      iceTop: H * 0.60,
      Lf: 0, Ll: 0, hw: 4.5,
      repos: 0, touche: 6,                 // angle du bras de ligne (degrés, sens horaire)
    };
    g.iceBot = g.iceTop + H * 0.11;
    g.wl = g.iceTop + 6;                   // niveau d'eau dans le trou
    // Au repos, le long bras (plus lourd que le bras de ligne chargé) descend jusqu'à poser
    // son bout sur la glace, à gauche : c'est la butée. La touche le relève.
    const fx = 40, fy = g.iceTop - g.hw;
    g.repos = -Math.atan2(fy - g.py, g.px - fx) * 180 / Math.PI;
    g.Lf = Math.hypot(g.px - fx, fy - g.py);
    g.Ll = (g.hc - g.px) / Math.cos(rad(-g.repos));
    g.pt = (a, L) => [g.px + L * Math.cos(rad(a)), g.py + L * Math.sin(rad(a))];
    g.hl = g.hc - 24; g.hr = g.hc + 24;
    return g;
  };

  // La bascule : une bande de bois passant par le pivot, bras de ligne à l'angle a.
  const bascule = (g, a, attrs) => {
    const E1 = g.pt(a + 180, g.Lf), E2 = g.pt(a, g.Ll);
    const nx = -Math.sin(rad(a)) * g.hw, ny = Math.cos(rad(a)) * g.hw;
    return h.chemin([[E1[0] + nx, E1[1] + ny], [E2[0] + nx, E2[1] + ny], [E2[0] - nx, E2[1] - ny], [E1[0] - nx, E1[1] - ny]], attrs, true);
  };
  // Le fanion : bande de toile nouée au bout du bras, qui pend.
  const fanion = (F, attrs) => {
    const p = (dx, dy) => `${f(F[0] + dx)} ${f(F[1] + dy)}`;
    return h.path(`M${p(-3.5, 2)} L ${p(3.5, 2)} Q ${p(6, 20)} ${p(2, 40)} L ${p(-2, 34)} L ${p(-6, 40)} Q ${p(-9, 20)} ${p(-3.5, 2)} Z`, attrs);
  };
  // Le bâton fendu qui pend au bout du bras de ligne.
  const baton = (T, attrs) => h.chemin([[T[0] - 3.5, T[1]], [T[0] + 3.5, T[1]], [T[0] + 3.5, T[1] + 38], [T[0] - 3.5, T[1] + 38]], attrs, true);

  const blancArete = h.a.contour.replace('fill="none"', 'fill="#fff"');

  return {
    ref: '58-07',
    titre: 'La brimbale de bois',
    desc: 'Brimbale de deux bouts de bois en croix, plantée au bord du trou, vue de côté avec la glace en coupe : la bascule sur son clou, près du trou, le long bras plus lourd que le bras de ligne chargé : au repos, son bout pose sur la glace, fanion couché ; le bâton fendu qui porte la ligne pend au bout du bras court, toute la mécanique bien au-dessus du niveau d’eau du trou. En tireté, la bascule à la touche : le bras de ligne descend, le fanion monte. À droite, le bâton fendu en détail.',
    format: 'demi',
    disposition: [['elevation', 'baton']],
    largeurs: [[3, 1]],
    vues: {
      elevation: {
        dessin: z => {
          const g = geo(z);
          const { W, H, px, py, hc, iceTop, iceBot, wl, hl, hr } = g;
          const out = [];
          // eau sous la glace et dans le trou
          out.push(h.rect(0, iceBot, W, H - iceBot, h.a.hachure('eau', 'aucun')));
          out.push(h.rect(hl, wl, hr - hl, iceBot - wl, h.a.hachure('eau', 'aucun')));
          // glace en coupe
          out.push(h.chemin([[0, iceTop], [hl, iceTop], [hl, iceBot], [0, iceBot]], h.a.arete));
          out.push(h.chemin([[W, iceTop], [hr, iceTop], [hr, iceBot], [W, iceBot]], h.a.arete));
          out.push(h.ligne(hl, wl, hr, wl, h.a.arete));
          // niveau du trou, tracé sous toute la mécanique
          out.push(h.ligne(px - 60, wl, hl, wl, tiret));
          // bancs de neige de part et d'autre, zone dégagée entre les deux
          out.push(h.path(`M${f(hr + 24)} ${f(iceTop)} Q ${f(hr + 40)} ${f(iceTop - 12)} ${f(W)} ${f(iceTop - 13)} L ${f(W)} ${f(iceTop)} Z`, h.a.hachure('neige')));
          // montant, planté dans la neige tassée
          const top = py - 12, pied = iceTop - 18;
          out.push(h.chemin([[px - 5, pied], [px - 5, top], [px + 5, top], [px + 5, pied]], h.a.contour));
          out.push(h.chemin([[px + 5, py + 58], [px + 12, py + 50], [px + 13, py + 54], [px + 5, py + 64]], h.a.arete));
          out.push(h.ligne(px - 1, top + 30, px - 1, top + 60, h.a.detail));
          out.push(h.path(`M${f(px - 30)} ${f(iceTop)} Q ${f(px)} ${f(iceTop - 28)} ${f(px + 30)} ${f(iceTop)} Z`, h.a.hachure('neige')));
          // bascule à la touche (tireté), derrière
          const Tg = g.pt(g.touche, g.Ll), Fg = g.pt(g.touche + 180, g.Lf);
          out.push(bascule(g, g.touche, h.a.cache));
          out.push(baton(Tg, h.a.cache));
          out.push(fanion(Fg, h.a.cache));
          // bascule au repos
          const T = g.pt(g.repos, g.Ll), F = g.pt(g.repos + 180, g.Lf);
          out.push(bascule(g, g.repos, blancArete));
          {
            const ux = Math.cos(rad(g.repos)), uy = Math.sin(rad(g.repos)), nx = -uy * g.hw, ny = ux * g.hw;
            [6, 9].forEach((d) => out.push(h.ligne(F[0] + ux * d + nx, F[1] + uy * d + ny, F[0] + ux * d - nx, F[1] + uy * d - ny, h.a.detail)));
          }
          // au repos, le fanion est couché sur la glace
          out.push(h.path(`M${f(F[0] - 2)} ${f(iceTop - 5)} L ${f(F[0] - 32)} ${f(iceTop - 5)} L ${f(F[0] - 26)} ${f(iceTop - 2.5)} L ${f(F[0] - 32)} ${f(iceTop)} L ${f(F[0] - 2)} ${f(iceTop)} Z`, h.a.plein));
          // clou de l'axe
          out.push(h.cercle(px, py, 5.5, blancArete.replace('stroke-width="2.4"', 'stroke-width="1.4"')));
          out.push(h.cercle(px, py, 2.2, h.a.plein));
          // bâton fendu et ligature au bout du bras de ligne
          out.push(baton(T, blancArete.replace('stroke-width="2.4"', 'stroke-width="1.4"')));
          out.push(h.ligne(T[0] - 5, T[1] - 4, T[0] + 5, T[1] + 4, h.a.detail));
          out.push(h.ligne(T[0] - 5, T[1] + 4, T[0] + 5, T[1] - 4, h.a.detail));
          for (let y = T[1] + 12; y < T[1] + 28; y += 3) out.push(h.ligne(T[0] - 3.5, y + 2, T[0] + 3.5, y - 1, h.a.detail));
          // la ligne, le plomb (un écrou), l'hameçon appâté
          const yPlomb = H - 36;
          out.push(h.ligne(hc, T[1] + 38, hc, yPlomb - 5, h.a.detail));
          const aretePleine = h.a.arete.replace('fill="none"', 'fill="#fff"');
          const crochet = `M${f(hc)} ${f(yPlomb + 14)} L ${f(hc)} ${f(yPlomb + 24)} Q ${f(hc)} ${f(yPlomb + 30)} ${f(hc + 5)} ${f(yPlomb + 30)} Q ${f(hc + 9)} ${f(yPlomb + 30)} ${f(hc + 9)} ${f(yPlomb + 24)} L ${f(hc + 7)} ${f(yPlomb + 21)}`;
          out.push(h.chemin([[hc - 6, yPlomb - 5], [hc + 6, yPlomb - 5], [hc + 8, yPlomb], [hc + 6, yPlomb + 5], [hc - 6, yPlomb + 5], [hc - 8, yPlomb]], aretePleine, true));
          out.push(h.ligne(hc, yPlomb + 5, hc, yPlomb + 14, h.a.detail));
          out.push(h.path(crochet, 'fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"'));
          out.push(h.path(crochet, h.a.arete));
          // la bascule tourne : le bras de ligne descend
          const R = g.Ll * 0.62, A1 = g.pt(-16, R), A2 = g.pt(0, R);
          out.push(h.fleche(`M${f(A1[0])} ${f(A1[1])} A ${f(R)} ${f(R)} 0 0 1 ${f(A2[0])} ${f(A2[1])}`));
          return pieces(out);
        },
        renvois: z => {
          const g = geo(z);
          const { px, py, iceTop, wl, hl } = g;
          const F = g.pt(g.repos + 180, g.Lf), Fg = g.pt(g.touche + 180, g.Lf);
          return [
            { n: 1, rond: [px - 42, py + 80], cible: [px - 5, py + 72] },
            { n: 2, rond: [px - 40, py - 34], cible: [px - 4, py - 4] },
            { n: 3, rond: [F[0] + 4, F[1] - 44], cible: [F[0] - 16, iceTop - 3] },
            { n: 6, rond: [hl - 32, wl - 34], cible: [hl + 6, wl] },
            { n: 7, rond: [px - 110, iceTop - 30], cible: [px - 110, iceTop] },
            { n: 8, rond: [Fg[0] + 34, Fg[1] + 34], cible: [Fg[0] + 4.8, Fg[1] + 24] },
          ].map((r, i) => ({ ...r, texte: [
            'montant et bascule en croix',
            'clou ou cheville, graissé au suif',
            'fanion de toile rouge ou fer-blanc',
            'mécanique au-dessus du niveau du trou',
            'neige dégagée dessous à chaque ronde',
            'à la touche, le fanion monte',
          ][i] }));
        },
      },
      baton: {
        titre: 'Le bâton fendu',
        dessin: z => {
          const cx = z.l * 0.5, top = 34, bas = z.h - 44;
          const out = [];
          // bout du bras de ligne, en travers, avec sa ligature
          out.push(h.chemin([[cx - 46, top - 14], [cx + 12, top - 14], [cx + 12, top - 2], [cx - 46, top - 2]], h.a.hachure('bois', 'arete'), true));
          out.push(h.chemin([[cx - 46, top - 14], [cx - 42, top - 10], [cx - 48, top - 6], [cx - 46, top - 2]], h.a.arete));
          // le bâton
          out.push(h.chemin([[cx - 8, top - 6], [cx + 8, top - 6], [cx + 8, bas], [cx + 2, bas], [cx, bas - 52], [cx - 2, bas], [cx - 8, bas]], blancArete, true));
          for (const dy of [-10, -4, 2]) out.push(h.ligne(cx - 10, top + dy + 6, cx + 10, top + dy - 2, h.a.detail));
          // la ligne enroulée
          const e1 = top + 50, e2 = top + 112;
          out.push(h.rect(cx - 13, e1, 26, e2 - e1, blancArete.replace('stroke-width="2.4"', 'stroke-width="1.4"')));
          for (let y = e1 + 4; y < e2; y += 4.5) out.push(h.ligne(cx - 13, y + 3, cx + 13, y - 3, h.a.detail));
          // la ligne descend, entre dans la fente, sort par le bout
          out.push(h.chemin([[cx + 13, e2 - 3], [cx + 12, bas - 42], [cx + 1, bas - 32], [cx, bas], [cx, z.h - 6]], h.a.arete));
          return pieces(out);
        },
        renvois: z => {
          const cx = z.l * 0.5, top = 34, bas = z.h - 44;
          return [
            { n: 4, rond: [cx + 40, top + 66], cible: [cx + 13, top + 78], texte: 'ligne enroulée sur un bâton fendu' },
            { n: 5, rond: [cx - 42, bas - 18], cible: [cx - 3, bas - 18], texte: 'ligne coincée dans la fente' },
          ];
        },
      },
    },
  };
};
