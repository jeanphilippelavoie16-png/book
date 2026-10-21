// Planche 58-10b — le trou à la main (ch. 58, sections 5-B point 7, 9-A points 3, 6, 7, 9-G).
// Aucune cote : les seuils d'épaisseur sont une règle, pas une construction ; ils restent au texte.
// Glace en blanc cernée, eau en hachure ; dans le trou percé, l'eau monte presque au ras de la glace.

module.exports = (h) => {
  const f = v => Math.round(v * 10) / 10;
  const P = pts => pts.map(([x, y]) => `${f(x)} ${f(y)}`).join(' L ');
  const blanc = (d, t = h.a.contour) => h.path(d, h.a.blanc) + '\n' + h.path(d, t);
  const add = (a, b, k = 1) => [a[0] + b[0] * k, a[1] + b[1] * k];
  const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  // rupture posée en travers d'une pièce, de p1 à p2, en trait fin qui déborde
  const rupture = (p1, p2) => {
    const L = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]);
    const u = [(p2[0] - p1[0]) / L, (p2[1] - p1[1]) / L], n = [-u[1], u[0]];
    const m = lerp(p1, p2, 0.5);
    return h.chemin([add(p1, u, -4), add(m, u, -4), add(add(m, u, -1), n, 5), add(add(m, u, 1), n, -5), add(m, u, 4), add(p2, u, 4)], h.a.fin);
  };
  // la glace coupée, percée en entonnoir : ht = bord haut, hb = bord bas du trou (demi-largeurs)
  const glace = (z, cx, iceTop, iceBot, ht, hb, fond = iceBot) => {
    const out = [];
    out.push(h.rect(0, iceBot, z.l, z.h - iceBot, h.a.hachure('eau', 'aucun')));
    if (fond < iceBot) out.push(h.rect(cx - hb, fond, 2 * hb, iceBot - fond, h.a.blanc));
    out.push(h.chemin([[0, iceTop], [cx - ht, iceTop], [cx - hb, fond], [cx + hb, fond], [cx + ht, iceTop], [z.l, iceTop]], h.a.arete));
    out.push(h.ligne(0, iceBot, fond < iceBot ? z.l : cx - hb, iceBot, h.a.arete));
    if (fond >= iceBot) out.push(h.ligne(cx + hb, iceBot, z.l, iceBot, h.a.arete));
    return out.join('\n');
  };
  // l'eau monte dans le trou percé jusqu'à wl
  const eauDuTrou = (cx, iceTop, iceBot, ht, hb, wl) => {
    const t = (wl - iceTop) / (iceBot - iceTop);
    const w = ht + (hb - ht) * t;
    return h.path(`M ${P([[cx - w, wl], [cx + w, wl], [cx + hb, iceBot], [cx - hb, iceBot]])} Z`, h.a.hachure('eau', 'aucun')) + '\n' +
      h.ligne(cx - w, wl, cx + w, wl, h.a.detail);
  };
  // une branche de sapin vue de côté : la tige et ses aiguilles
  const sapin = (p1, p2, pas = 6, lg = 5) => {
    const L = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]);
    const u = [(p2[0] - p1[0]) / L, (p2[1] - p1[1]) / L], n = [-u[1], u[0]];
    const out = [h.chemin([p1, p2], h.a.arete)];
    for (let s = pas; s < L - 2; s += pas) {
      const b = add(p1, u, s);
      out.push(h.chemin([b, add(add(b, u, lg * 0.7), n, lg)], h.a.fin));
      out.push(h.chemin([b, add(add(b, u, lg * 0.7), n, -lg)], h.a.fin));
    }
    return out.join('\n');
  };

  const geoTrou = z => {
    const cx = f(z.l * 0.52), iceTop = f(z.h * 0.34), iceBot = f(z.h * 0.8);
    const ht = 92, hb = 22, fond = iceBot - 10;
    // le ciseau, face plate couchée sur la paroi gauche, biseau vers le centre
    const bas = [cx - hb, fond], haut = [cx - ht, iceTop];
    const L = Math.hypot(haut[0] - bas[0], haut[1] - bas[1]);
    const w = [(haut[0] - bas[0]) / L, (haut[1] - bas[1]) / L];   // vers le haut, le long de la paroi
    const n = [-w[1], w[0]];                                        // vers le centre du trou
    const tip = add(bas, w, -5);
    return { cx, iceTop, iceBot, ht, hb, fond, w, n, tip };
  };
  const geoJauge = z => {
    const cx = f(z.l * 0.42), iceTop = f(z.h * 0.34), iceBot = f(z.h * 0.8);
    const ht = 58, hb = 16, wl = iceTop + (iceBot - iceTop) * 0.1;
    const xj = cx + 8, pied = cx + hb + 26;
    return { cx, iceTop, iceBot, ht, hb, wl, xj, pied };
  };
  const geoCouvert = z => {
    const cx = f(z.l * 0.45), iceTop = f(z.h * 0.5), iceBot = f(z.h * 0.86);
    const ht = 52, hb = 16, wl = iceTop + (iceBot - iceTop) * 0.1;
    return { cx, iceTop, iceBot, ht, hb, wl };
  };
  const geoEcumoire = z => {
    const cx = 92, ct = f(z.h * 0.42), cb = f(z.h * 0.42) + 84, r = 36;
    return { cx, ct, cb, r };
  };

  return {
    ref: '58-10b',
    titre: 'Le trou à la main',
    desc: 'Quatre coupes du trou ouvert au ciseau. Le trou se creuse en entonnoir, large en haut, étroit en bas ; le ciseau descend face plate contre la paroi, et son biseau chasse la glace vers le centre. La jauge est une broche pliée en L : passée dans le trou, tirée, son pied crochète le dessous de la dalle et on lit l’entaille au ras du dessus de la glace. Le trou qu’on veut retrouver ouvert se couvre de branches de sapin et d’une motte de neige tassée, une branche plantée dessus pour le marquer : au matin, il reste une croûte à casser. L’écumoire est une boîte de conserve au fond percé au clou, clouée sur un manche.',
    format: 'pleine',
    disposition: [['trou', 'jauge'], ['couvert', 'ecumoire']],
    hauteurs: [1.15, 1],
    largeurs: [[3, 2], [3, 2]],
    vues: {
      trou: {
        titre: 'Ouvrir en entonnoir',
        dessin: z => {
          const g = geoTrou(z), { cx, iceTop, iceBot, ht, hb, fond, w, n, tip } = g;
          const out = [glace(z, cx, iceTop, iceBot, ht, hb, fond)];
          // éclats chassés vers le centre, au fond
          [[cx - 4, fond - 3, 5], [cx + 6, fond - 2.5, 4], [cx + 13, fond - 3.5, 3.5], [cx - 12, fond - 2, 3]].forEach(([x, y, r]) =>
            out.push(blanc(`M ${P([[x - r, y + 2.5], [x - r * 0.3, y - r * 0.6], [x + r, y - 0.5], [x + r * 0.6, y + 2.5]])} Z`, h.a.detail)));
          // le ciseau
          const t = 9, lg = Math.min((tip[1] - 8) / -w[1], 300);
          const A = tip, B = add(tip, w, lg), C = add(B, n, t), D = add(add(tip, w, 24), n, t), E = add(tip, n, 1.2);
          out.push(h.path(`M ${P([B, A, E, D, C])} Z`, h.a.blanc));
          out.push(h.path(`M ${P([B, A, E, D, C])}`, h.a.contour));
          out.push(rupture(B, C));
          // le geste : le coup, le long de l'outil
          out.push(h.geste(`M ${P([add(add(tip, w, 150), n, 30), add(add(tip, w, 85), n, 30)])}`));
          // la glace chassée vers le centre
          out.push(h.fleche(`M ${P([add(add(tip, w, 14), n, 16), [cx + 4, fond - 18]])}`, h.a.detail));
          return out.join('\n');
        },
        renvois: z => {
          const { cx, iceTop, iceBot, ht, hb, fond, w, n, tip } = geoTrou(z);
          return [
            { n: 1, rond: [cx + ht + 34, iceTop - 34], cible: [cx + ht - 6, iceTop + 9], texte: 'large en haut, étroit en bas' },
            { n: 2, rond: [26, iceTop + 34], cible: add(add(tip, w, 70), n, 0), texte: 'face plate contre la paroi' },
            { n: 3, rond: [cx + 56, fond - 30], cible: [cx + 9, fond - 5], texte: 'glace chassée vers le centre' },
            { n: 4, rond: [cx + 50, iceBot + 30], cible: [cx + 12, fond + 6], texte: 'finir à petits coups obliques' },
          ];
        },
      },
      jauge: {
        titre: 'Mesurer à la jauge',
        dessin: z => {
          const { cx, iceTop, iceBot, ht, hb, wl, xj, pied } = geoJauge(z);
          const out = [glace(z, cx, iceTop, iceBot, ht, hb), eauDuTrou(cx, iceTop, iceBot, ht, hb, wl)];
          const yp = iceBot + 1.5, top = 14;
          // la broche, pied en L crocheté sous la dalle
          out.push(h.chemin([[xj, top], [xj, yp], [pied, yp]], h.a.contour));
          // entailles
          for (let y = yp - 12; y > top + 6; y -= 12) out.push(h.ligne(xj - 3.5, y, xj + 3.5, y, h.a.detail));
          // on lit au ras du dessus de la glace
          out.push(h.ligne(cx + ht, iceTop, xj + 2, iceTop, h.a.fin));
          // le geste : tirer la broche jusqu'à ce que le pied croche
          out.push(h.geste(`M ${P([[xj - 14, iceTop - 22], [xj - 14, iceTop - 58]])}`));
          // le point qu'on lit : l'entaille au ras du dessus de la glace
          out.push(h.controle(xj, iceTop, 10));
          return out.join('\n');
        },
        renvois: z => {
          const { cx, iceTop, iceBot, ht, hb, xj, pied } = geoJauge(z);
          return [
            { n: 5, rond: [pied + 18, iceBot + 30], cible: [pied - 4, iceBot + 1.5], texte: 'broche pliée en L au bout' },
            { n: 6, rond: [cx - 44, iceBot + 30], cible: [xj, iceBot - 4], texte: 'tirée, le pied sous la dalle' },
            { n: 7, rond: [xj + 34, 26], cible: [xj + 3, 29.5], texte: 'entailles au couteau' },
            { n: 8, rond: [cx + ht + 20, iceTop - 30], cible: [cx + ht - 14, iceTop], texte: 'on lit au ras du dessus' },
          ];
        },
      },
      couvert: {
        titre: 'Garder le trou pour le lendemain',
        dessin: z => {
          const { cx, iceTop, iceBot, ht, hb, wl } = geoCouvert(z);
          const out = [glace(z, cx, iceTop, iceBot, ht, hb), eauDuTrou(cx, iceTop, iceBot, ht, hb, wl)];
          // la croûte de la nuit, sur l'eau du trou
          const tw = (wl - iceTop) / (iceBot - iceTop), wd = ht + (hb - ht) * tw;
          const t2 = (wl + 5 - iceTop) / (iceBot - iceTop), wd2 = ht + (hb - ht) * t2;
          out.push(blanc(`M ${P([[cx - wd, wl], [cx + wd, wl], [cx + wd2, wl + 5], [cx - wd2, wl + 5]])} Z`, h.a.arete));
          // la motte de neige tassée, par-dessus les branches
          const bt = iceTop - 17;
          const dome = `M ${f(cx - 118)} ${f(iceTop)} C ${f(cx - 80)} ${f(iceTop - 66)} ${f(cx + 80)} ${f(iceTop - 66)} ${f(cx + 118)} ${f(iceTop)}`;
          out.push(h.path(dome + ' Z', h.a.hachure('neige', 'aucun')));
          // sous les branches, au-dessus du trou : de l'air, la neige ne tombe pas dedans
          out.push(h.rect(cx - 94, bt, 188, iceTop - bt, h.a.blanc));
          out.push(h.ligne(cx - 94, bt, cx + 94, bt, h.a.detail));
          out.push(h.path(dome, h.a.arete));
          // la brassée de sapin couchée en travers, portée par la glace de part et d'autre
          out.push(sapin([cx - 92, iceTop - 4], [cx + 88, iceTop - 5], 9, 3.5));
          out.push(sapin([cx - 84, iceTop - 12.5], [cx + 92, iceTop - 11.5], 9, 3.5));
          // la branche plantée qui marque le trou
          out.push(sapin([cx + 22, iceTop - 30], [cx + 30, 10], 8, 7));
          return out.join('\n');
        },
        renvois: z => {
          const { cx, iceTop, iceBot, ht, wl } = geoCouvert(z);
          return [
            { n: 9, rond: [cx - 140, iceTop - 40], cible: [cx - 70, iceTop - 4], texte: 'sapin en travers, ou jute' },
            { n: 10, rond: [cx - 70, 22], cible: [cx - 50, iceTop - 30], texte: 'motte de neige tassée' },
            { n: 11, rond: [cx + 110, iceBot + 22], cible: [cx + 30, wl + 3], texte: 'au matin, croûte à casser' },
            { n: 12, rond: [cx + 90, 26], cible: [cx + 28, 34], texte: 'une branche le marque' },
          ];
        },
      },
      ecumoire: {
        titre: 'L’écumoire, en coupe et dessous',
        dessin: z => {
          const { cx, ct, cb, r } = geoEcumoire(z);
          const out = [];
          // le manche, coupé en long, le long de la paroi
          const mx0 = cx - r - 16, mx1 = cx - r;
          out.push(h.path(`M ${P([[mx0, 12], [mx0, cb - 4], [mx1, cb - 4], [mx1, 12]])}`, h.a.arete));
          out.push(h.rect(mx0, 12, mx1 - mx0, cb - 4 - 12, h.a.hachure('bois', 'aucun')));
          out.push(rupture([mx0, 12], [mx1, 12]));
          // la boîte : l'intérieur, vu par la coupe, en gris loin ; paroi, rebord, fond percé
          out.push(h.rect(cx - r, ct, 2 * r, cb - ct, h.a.loin));
          out.push(h.chemin([[cx - r, ct], [cx - r, cb], [cx + r, cb], [cx + r, ct]], h.a.contour));
          out.push(h.cercle(cx - r, ct, 2.2, h.a.plein));
          out.push(h.cercle(cx + r, ct, 2.2, h.a.plein));
          // trous percés au clou, de dedans : la bavure pointe dehors
          [-24, -8, 8, 24].forEach(dx => {
            out.push(h.rect(cx + dx - 1.5, cb - 2, 3, 4, h.a.blanc));
            out.push(h.ligne(cx + dx - 1.5, cb, cx + dx - 1, cb + 4, h.a.detail));
            out.push(h.ligne(cx + dx + 1.5, cb, cx + dx + 1, cb + 4, h.a.detail));
          });
          // deux clous, tête dans la boîte, pointe dans le manche
          [ct + 22, ct + 58].forEach(y => {
            out.push(h.rect(cx - r + 1.2, y - 4, 2, 8, h.a.plein));
            out.push(h.rect(cx - r - 12, y - 0.8, 13, 1.6, h.a.plein));
          });
          // le fond vu de dessous
          const dx = z.l - 40, dy = cb - 36;
          out.push(h.cercle(dx, dy, r, h.a.contour));
          [[0, 0], [-15, -9], [15, -9], [-15, 9], [15, 9], [0, -20], [0, 20], [-24, 0], [24, 0]].forEach(([a, b]) => out.push(h.cercle(dx + a, dy + b, 1.8, h.a.plein)));
          return out.join('\n');
        },
        renvois: z => {
          const { cx, ct, cb, r } = geoEcumoire(z);
          return [
            { n: 13, rond: [z.l - 18, cb + 24], cible: [z.l - 40 + 15, cb - 36 + 9], texte: 'boîte au fond percé au clou' },
            { n: 14, rond: [cx + 10, ct - 34], cible: [cx - r - 6, ct + 22], texte: 'clouée sur un manche' },
          ];
        },
      },
    },
  };
};
