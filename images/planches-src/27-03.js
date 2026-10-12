// Planche 27-03 — Replanter une dent permanente.
// Chapitre 27, section 3 (la racine porte les cellules vivantes du ligament) et étapes 37 à 40 :
// la ramasser par la couronne, la partie blanche, jamais par la racine ; sale, la tremper
// quelques secondes dans le lait ou dans la salive crachée dans une tasse, sans frotter ; la
// remettre dans son trou tout de suite, face avant vers l'avant (la comparer à sa jumelle),
// pousser doucement avec un léger va-et-vient tournant jusqu'à ce que le bord arrive au niveau
// des voisines ; la tenir 5 minutes avec les doigts, puis faire mordre un linge propre plié.
// Étapes 34 et 47-48 pour l'encadré : la dent de lait ne se remet jamais.
// Rien ne se construit : aucune cote. Les dents sont dessinées en mm d'adulte (incisive
// centrale du haut), mis à l'échelle k (unités de vue par mm) dans chaque vue.
module.exports = (h) => {
  const A = h.a, F = h.formes;
  const f = v => (Math.round(v * 10) / 10).toString();
  const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const bA = blanc(A.arete), bC = blanc(A.contour);
  const deux = d => `<path d="${d}" ${A.arete} marker-start="url(#fl)" marker-end="url(#fl)"/>`;

  // courbe lisse (Catmull-Rom) par des points ; ferme = forme close
  const lisse = (P, ferme = false) => {
    const n = P.length, g = i => ferme ? P[(i + n) % n] : P[Math.max(0, Math.min(n - 1, i))];
    let d = `M${f(P[0][0])} ${f(P[0][1])}`;
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      d += ` C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
    }
    return d + (ferme ? ' Z' : '');
  };
  const dedans = (p, P) => {
    let c = false;
    for (let i = 0, j = P.length - 1; i < P.length; j = i++)
      if ((P[i][1] > p[1]) !== (P[j][1] > p[1]) && p[0] < (P[j][0] - P[i][0]) * (p[1] - P[i][1]) / (P[j][1] - P[i][1]) + P[i][0]) c = !c;
    return c;
  };
  // repère : point local (mm) -> vue, centre (x, y), échelle k, rotation deg (horaire)
  const rep = (x, y, k, deg = 0, px = 0, py = 0) => {
    const c = Math.cos(deg * Math.PI / 180), s = Math.sin(deg * Math.PI / 180);
    return p => { const u = p[0] - px, v = p[1] - py; return [x + k * (u * c - v * s), y + k * (u * s + v * c)]; };
  };

  // ─── L'incisive centrale du haut, vue de face. Origine au milieu du bord, y vers le haut négatif.
  // Couronne : 10,5 de haut, 8,5 de large ; racine conique jusqu'à l'apex.
  const DENT = [[-3.3, -10.2], [-3.75, -8.4], [-4.15, -6], [-4.35, -3.2], [-4.35, -1.1], [-4.12, -0.18], [-2, 0.06], [0, 0.1], [2, 0],
    [3.6, -0.35], [4.15, -1.2], [4.3, -3.2], [4.1, -6], [3.7, -8.4], [3.3, -10.2],
    [3.25, -12.5], [3.0, -15.5], [2.5, -18.5], [1.8, -21], [1.0, -22.9], [0.2, -23.6], [-0.6, -23.1], [-1.6, -21.2], [-2.4, -18.5], [-2.95, -15.5], [-3.2, -12.5]];
  const COLLET = [[-3.3, -10.2], [-1.8, -11.15], [0, -11.55], [1.8, -11.15], [3.3, -10.2]];
  const RACINE = [...DENT.slice(14), DENT[0], ...COLLET.slice(1, 4).reverse()];
  const COURONNE = [[-3.25, -12.5], ...DENT.slice(0, 15), [3.25, -12.5]];
  // la racine, piquée de points : c'est la surface vivante qu'on ne touche pas
  const points = (T, k) => {
    const pas = 4.4 / k, out = [];
    let i = 0;
    for (let y = -23.5; y < -10; y += pas * 0.87)
      for (let x = -3.4 + ((i++ % 2) ? pas / 2 : 0); x < 3.4; x += pas) {
        const j = [(Math.sin(x * 12.9 + y * 7.1) * 0.22) * pas, (Math.cos(x * 5.3 - y * 11.7) * 0.22) * pas];
        const p = [x + j[0], y + j[1]], r = 1.9 / k;
        if ([[0, 0], [r, 0], [-r, 0], [0, r], [0, -r]].every(d => dedans([p[0] + d[0], p[1] + d[1]], RACINE))) {
          const q = T(p);
          out.push(`<circle cx="${f(q[0])}" cy="${f(q[1])}" r="0.65" fill="#1A1A1A"/>`);
        }
      }
    return out.join('');
  };
  const dent = (T, k, at = bA) => [h.path(lisse(DENT.map(T), true), at), h.path(lisse(COLLET.map(T)), A.detail), points(T, k)].join('\n');

  // ─── Les six dents du devant, en haut, vues de face, la lèvre relevée.
  // Repère de rangée : x depuis le milieu (vers la droite du lecteur), y = 0 au bord des centrales.
  const LATERALE = COURONNE.map(([x, y]) => [x * 0.7, y * 0.88 - 0.8]);
  const CANINE = [[-2.1, -12.5], [-2.35, -9], [-2.5, -5.5], [-2.2, -3.6], [-1.2, -1.7], [-0.15, -0.3], [0.45, -0.35], [1.5, -1.9], [2.35, -4.2],
    [2.55, -6.5], [2.4, -9.5], [2.2, -12.5]];
  const PLACES = [['canine', 16.9], ['laterale', 11.5], ['centrale', 4.25]];
  const FORMES = { canine: CANINE.map(([x, y]) => [x, y - 0.3]), laterale: LATERALE, centrale: COURONNE };
  // la gencive : un feston par dent, pointe (papille) entre deux dents
  const PAP = [[-19.4, -7.8], [-14.5, -7.1], [-8.5, -6.7], [0, -6.5], [8.5, -6.7], [14.5, -7.1], [19.4, -7.8]];
  const ZEN = [-17.1, -11.7, -4.5, 4.5, 11.7, 17.1].map((x, i) => [x, [-10.4, -9.3, -10.0, -10.0, -9.3, -10.4][i]]);
  const MARGE = (() => {
    const out = [PAP[0]];
    for (let i = 0; i < ZEN.length; i++) {
      const a = PAP[i], b = PAP[i + 1], z = ZEN[i];
      for (let t = 0.125; t <= 1; t += 0.125) out.push([a[0] + (z[0] - a[0]) * t, a[1] + (z[1] - a[1]) * Math.sin(t * Math.PI / 2)]);
      for (let t = 0.125; t <= 1; t += 0.125) out.push([z[0] + (b[0] - z[0]) * t, z[1] + (b[1] - z[1]) * (1 - Math.cos(t * Math.PI / 2))]);
    }
    return out;
  })();
  const HAUT_GENCIVE = [[19.4, -7.8], [20.5, -10.6], [20.4, -14.6], [17.2, -18.2], [10, -20.2], [0, -20.8], [-10, -20.2], [-17.2, -18.2], [-20.4, -14.6], [-20.5, -10.6], [-19.4, -7.8]];
  const gencive = T => {
    const bas = MARGE.map(T).map(p => `L${f(p[0])} ${f(p[1])}`).join(' ').replace(/^L/, 'M');
    const haut = lisse(HAUT_GENCIVE.map(T)).replace(/^M[^C]*/, '');
    return [h.path(`${bas} ${haut} Z`, bA),
      h.path(`M${T([0, -20.8]).map(f).join(' ')} Q${T([0.5, -18.6]).map(f).join(' ')} ${T([0, -16.6]).map(f).join(' ')}`, A.detail)].join('\n');
  };
  // le dessous de la gencive : ce qu'on voit de la dent qui entre
  const sousGencive = (T, id) => {
    const P = [T([-19.4, -30]), ...MARGE.map(T), T([19.4, -30]), T([30, -30]), T([30, 40]), T([-30, 40]), T([-30, -30])];
    return `<clipPath id="${id}"><path fill="none" d="M${P.map(p => `${f(p[0])} ${f(p[1])}`).join(' L')} Z"/></clipPath>`;
  };
  const rangee = (T, sauf) => {
    const out = [];
    for (const [nom, cx] of PLACES)
      for (const s of [-1, 1]) {
        if (nom === 'centrale' && s === 1 && sauf) continue;
        out.push(h.path(lisse(FORMES[nom].map(([x, y]) => T([s * x + s * cx, y])), true), bA));
      }
    return out.join('\n');
  };

  // ─── Géométrie des vues ───────────────────────────────────────────────────────────────────
  // Vue 1 : la dent seule, en grand.
  const g1 = z => {
    const k = Math.min((z.h - 16) / 24.4, 10.5);
    const T = rep(z.l * 0.5, z.h - 10 - 0.4 * k, k);
    return { k, T };
  };
  // Vue 2 : la dent, racine en bas, trempée dans la tasse (en coupe). Pas de main : le bout des doigts
  // cacherait la couronne ; les deux flèches de la vue 1 disent où la tenir.
  const g2 = z => {
    const e = Math.min((z.h - 10) / 102, (z.l - 90) / 84);
    const bas = z.h - 6, Hc = 70, rim = bas - Hc * e;
    const Ro = 42 * e, Rb = 33 * e, ep = 4.5 * e, fd = 6 * e;
    const cx = z.l * 0.46;
    const yl = rim + 12 * e;                      // la surface du lait
    const T = rep(cx, yl + 9 * e, e, 180, 0, -23.6);   // la dent debout, l'apex 9 mm sous la surface
    return { e, cx, bas, rim, yl, Ro, Rb, ep, fd, T };
  };
  // Vues 3 et 4 : la rangée du haut, au même endroit dans les deux vues.
  const gR = z => {
    const k = Math.min((z.l - 14) / 42, 5.6);
    const T = rep(z.l * 0.5, 22 + 20.8 * k, k);
    return { k, T, d: 8 };                        // d : la dent qui entre, 8 mm plus bas que sa place
  };
  // Vue 5 : le bas du visage de profil (nez, lèvres, menton), recadré pour que le linge se lise.
  // Repère local en mm : x vers l'avant (la droite), y vers le bas, origine au milieu de la bouche.
  const g5 = z => {
    const e = Math.min((z.h - 40) / 92, (z.l - 14) / 98);
    return { e, T: rep(z.l - 10 - 36 * e, 6 + 50 * e, e) };
  };
  return {
    ref: '27-03',
    titre: 'Replanter une dent permanente',
    desc: 'La dent permanente arrachée : la prendre par la couronne, jamais par la racine ; sale, la tremper quelques secondes dans le lait ou la salive ; la repousser dans son trou, face avant comme sa jumelle, avec un léger va-et-vient tournant, jusqu’à ce que le bord arrive au niveau des voisines ; puis faire mordre un linge plié.',
    format: 'pleine',
    disposition: [['dent', 'tremper'], ['remettre', 'niveau', 'linge']],
    hauteurs: [1.25, 1],
    largeurs: [[1, 1.15], [1, 1, 0.92]],
    vues: {
      dent: {
        titre: 'La dent',
        dessin: z => {
          const { k, T } = g1(z);
          const [xg, y] = T([-4.4, -4.5]), [xd] = T([4.35, -4.5]);
          return [dent(T, k, bC), h.fleche(`M${f(xg - 7 * k)} ${f(y)} L${f(xg - 1.2 * k)} ${f(y)}`), h.fleche(`M${f(xd + 7 * k)} ${f(y)} L${f(xd + 1.2 * k)} ${f(y)}`)].join('\n');
        },
        renvois: z => {
          const { T } = g1(z);
          const c = T([1.5, -1.8]), r = T([1.2, -17]);
          return [
            { n: 1, rond: [z.l - 14, c[1] + 4], cible: c, texte: 'la couronne, la partie blanche : la tenir là' },
            { n: 2, rond: [z.l - 14, r[1] - 22], cible: r, texte: 'la racine : ne jamais y toucher' },
          ];
        },
      },
      tremper: {
        titre: 'Sale : quelques secondes dans le lait',
        dessin: z => {
          const g = g2(z), { cx, bas, rim, yl, e, Ro, Rb, ep, fd, T } = g;
          const out = [];
          // la tasse en coupe : paroi et fond coupés en noir, l'anse de côté
          const Ri = Ro - ep, Rbi = Rb - ep;
          out.push(h.path(`M${f(cx - Ro)} ${f(rim)} L${f(cx - Rb)} ${f(bas)} L${f(cx + Rb)} ${f(bas)} L${f(cx + Ro)} ${f(rim)} ` +
            `L${f(cx + Ri)} ${f(rim)} L${f(cx + Rbi)} ${f(bas - fd)} L${f(cx - Rbi)} ${f(bas - fd)} L${f(cx - Ri)} ${f(rim)} Z`, A.plein));
          const ya = rim + 12 * e, yb = rim + 48 * e;
          const xa = cx + Ro - (Ro - Rb) * (ya - rim) / (bas - rim), xb = cx + Ro - (Ro - Rb) * (yb - rim) / (bas - rim);
          out.push(h.path(`M${f(xa)} ${f(ya)} C${f(xa + 30 * e)} ${f(ya - 4 * e)} ${f(xb + 30 * e)} ${f(yb + 2 * e)} ${f(xb)} ${f(yb)}`, A.contour));
          out.push(h.path(`M${f(xa)} ${f(ya + 6 * e)} C${f(xa + 21 * e)} ${f(ya + 3 * e)} ${f(xb + 20 * e)} ${f(yb - 3 * e)} ${f(xb)} ${f(yb - 6 * e)}`, A.arete));
          // la dent, la racine dans le lait
          out.push(dent(T, e));
          const xl0 = cx - Ri + (Ri - Rbi) * (yl - rim) / (bas - fd - rim), xl1 = 2 * cx - xl0;
          out.push(h.path(`M${f(xl0)} ${f(yl)} L${f(xl1)} ${f(yl)} L${f(cx + Rbi)} ${f(bas - fd)} L${f(cx - Rbi)} ${f(bas - fd)} Z`, A.hachure('eau', 'aucun')));
          out.push(h.ligne(xl0, yl, xl1, yl, A.detail));
          // tremper, ressortir
          const [, yb0] = T([0, 0.1]);
          out.push(deux(`M${f(cx)} ${f(yb0 - 26 * e)} L${f(cx)} ${f(yb0 - 5 * e)}`));
          return out.join('\n');
        },
        renvois: z => {
          const g = g2(z);
          return [{ n: 3, rond: [z.l - 14, g.bas - 30], cible: [g.cx + 22 * g.e, g.yl + 36 * g.e], texte: 'lait, ou salive crachée dans une tasse' }];
        },
      },
      remettre: {
        titre: 'Dans son trou, tout de suite',
        dessin: z => {
          const { k, T, d } = gR(z);
          const Td = p => T([p[0] + 4.25, p[1] + d]);
          const out = [rangee(T, true), gencive(T), sousGencive(T, 'trou-27-03')];
          // le trou, sombre sous le feston ; la racine y entre
          out.push('<g clip-path="url(#trou-27-03)">',
            h.ellipse(...T([4.25, -9.6]), 4.4 * k, 2.8 * k, A.plein),
            dent(Td, k), '</g>');
          // léger va-et-vient tournant autour de l'axe de la dent, en poussant vers le haut
          const [ax, ay] = T([4.25, d + 2.8]), rx = 5.2 * k, ry = 1.7 * k;
          const p = t => [ax + rx * Math.cos(t * Math.PI / 180), ay + ry * Math.sin(t * Math.PI / 180)];
          const [p0, p1] = [p(160), p(20)];
          out.push(deux(`M${f(p0[0])} ${f(p0[1])} A${f(rx)} ${f(ry)} 0 0 0 ${f(p1[0])} ${f(p1[1])}`));
          out.push(h.fleche(`M${f(ax)} ${f(ay + ry + 9 * k)} L${f(ax)} ${f(ay + ry + 1.5 * k)}`));
          return out.join('\n');
        },
        renvois: z => {
          const { k, T, d } = gR(z);
          const j = T([-4.6, -3.5]), a = T([4.25 + 5.2 * Math.cos(Math.PI / 4), d + 2.8 + 1.7 * Math.sin(Math.PI / 4)]);
          return [
            { n: 4, rond: [14, j[1] + 3.5 * k + 34], cible: j, texte: 'face avant comme sa jumelle' },
            { n: 5, rond: [z.l - 14, a[1] + 30], cible: a, texte: 'pousser doucement, léger va-et-vient tournant' },
          ];
        },
      },
      niveau: {
        titre: 'Le bord au niveau des voisines',
        dessin: z => {
          const { k, T } = gR(z);
          const Td = p => T([p[0] + 4.25, p[1]]);
          const out = [rangee(T, true), h.path(lisse(COURONNE.map(Td), true), bA), gencive(T)];
          const [x0, y0] = T([-22, 0.1]), [x1] = T([22, 0.1]);
          out.push(h.ligne(x0, y0, x1, y0, A.cache));
          return out.join('\n');
        },
        renvois: z => {
          const { k, T } = gR(z);
          const c = T([21, 0.1]);
          return [{ n: 6, rond: [z.l - 14, c[1] + 40], cible: c, texte: 'bord au niveau des voisines ; tenir 5 minutes' }];
        },
      },
      linge: {
        titre: 'Mordre un linge plié',
        dessin: z => {
          const { e, T } = g5(z);
          const P = L => L.map(T);
          const out = [];
          const Q = (c, p) => ` Q${T(c).map(f).join(' ')} ${T(p).map(f).join(' ')}`;
          // le linge : un carré plié en trois, aplati, pincé entre les incisives ; le bord replié en avant,
          // trois épaisseurs empilées
          out.push(h.path(lisse(P([[-9, -4.4], [2, -5], [7, -8.4], [12, -9.6], [31, -9.6]])) + Q([36, -9.6], [36, -6.4]) + Q([36, -3.2], [32, -3.2]) +
            Q([36.5, -3.2], [36.5, 0]) + Q([36.5, 3.2], [32, 3.2]) + Q([36, 3.2], [36, 6.4]) + Q([36, 9.6], [31, 9.6]) +
            lisse(P([[31, 9.6], [12, 9.6], [7, 8.4], [2, 5], [-9, 4.4]])).replace(/^M[^C]*/, '') + ' Z', bA));
          for (const s of [-1, 1]) out.push(h.path(lisse(P([[9, 2.2 * s], [16, 3.2 * s], [32, 3.2 * s]])), A.fin));
          // le visage : nez, lèvre du haut, bouche entrouverte, lèvre du bas, menton, mâchoire jusque sous l'oreille
          const haut = P([[-18, -50], [-6, -38], [3, -28], [5, -24], [1, -21], [-5, -20.5], [-6, -16], [-2, -13], [5, -10], [5.5, -7], [-3, -5.4]]);
          const bas = P([[-3, 5.4], [5, 6.6], [5.5, 10.5], [-1, 15.5], [-6, 18.5], [-4, 24], [1, 31], [0, 38], [-9, 43], [-28, 42], [-44, 35], [-56, 24], [-62, 10], [-64, -4]]);
          out.push(h.path(lisse(haut), A.contour), h.path(lisse(bas), A.contour));
          // les incisives du haut et du bas, qui pincent le linge
          out.push(h.path(lisse(P([[-9, -10], [-8.4, -4.2], [-2.2, -4.4], [-1.6, -10]])), bA));
          out.push(h.path(lisse(P([[-10, 10], [-9.4, 4.2], [-3.6, 4.4], [-3, 10]])), bA));
          out.push(h.path(lisse(haut), A.contour), h.path(lisse(P([[-3, 5.4], [5, 6.6], [5.5, 10.5], [-1, 15.5]])), A.contour));
          // l'aile du nez, le pli de la joue
          out.push(h.path(lisse(P([[-5, -20.8], [-11, -23], [-12, -28], [-7, -30]])), A.detail));
          out.push(h.path(lisse(P([[-13, 9], [-20, 20], [-30, 27]])), A.fin));
          return out.join('\n');
        },
        renvois: z => {
          const { e, T } = g5(z);
          const c = T([24, 9]);
          return [{ n: 7, rond: [Math.min(z.l - 14, c[0]), c[1] + 20 * e + 14], cible: c, texte: 'un linge propre plié, mordu' }];
        },
      },
    },
    danger: 'Danger — une dent de lait ne se remet jamais : elle appuie sur la dent permanente qui pousse dessous, et peut partir vers les poumons. À 4 ans, toutes les dents sont des dents de lait. Faire mordre un linge plié, c’est tout.',
  };
};
