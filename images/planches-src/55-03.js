// 51-03 — Le tracé des coupes : en fourreau (martre) et à plat (loup), et le retournement.
// Chaque bête est dessinée dans un repère normalisé (x centré, y vers le bas), puis ajustée
// à sa vue. Silhouette : tracé épais puis aplat blanc par-dessus, pour ne garder que le
// contour de l'ensemble. Coupes : trait fort tireté.

module.exports = (h) => {
  const COUPE = h.a.contour + ' stroke-dasharray="7 5"';

  // ─── géométrie ────────────────────────────────────────────────────────────────────
  const cr = (p0, p1, p2, p3, t) => {
    const t2 = t * t, t3 = t2 * t;
    return [0, 1].map(k => 0.5 * (2 * p1[k] + (-p0[k] + p2[k]) * t
      + (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * t2
      + (-p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k]) * t3));
  };
  const lisse = (pts, ferme = false, m = 8) => {
    const n = pts.length, out = [];
    const g = i => ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
    const segs = ferme ? n : n - 1;
    for (let i = 0; i < segs; i++)
      for (let j = 0; j < m; j++) out.push(cr(g(i - 1), g(i), g(i + 1), g(i + 2), j / m));
    if (!ferme) out.push(pts[n - 1]);
    return out;
  };
  // bord en touffes : zigzag vers la droite du sens de parcours
  const touffes = (pts, amp, pas) => {
    const out = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const [x1, y1] = pts[i], [x2, y2] = pts[i + 1];
      const L = Math.hypot(x2 - x1, y2 - y1) || 1, k = Math.max(1, Math.round(L / pas));
      const nx = (y2 - y1) / L, ny = -(x2 - x1) / L;
      for (let j = 0; j < k; j++) {
        const t = j / k, o = (out.length % 2) ? amp : 0;
        out.push([x1 + (x2 - x1) * t + nx * o, y1 + (y2 - y1) * t + ny * o]);
      }
    }
    out.push(pts[pts.length - 1]);
    return out;
  };
  const miroir = pts => pts.map(([x, y]) => [-x, y]);
  // forme symétrique : demi-contour droit, du haut au bas de l'axe
  const sym = (demi, poil = 0) => {
    let d = lisse(demi);
    if (poil) d = touffes(d, poil, 5);
    return d.concat(miroir(d.slice(1, -1)).reverse());
  };
  // membre : ligne médiane et demi-largeurs ; renvoie le contour et les repères
  const membre = (c, w) => {
    const n = c.length, dir = [], nor = [];
    for (let i = 0; i < n; i++) {
      const a = c[Math.max(0, i - 1)], b = c[Math.min(n - 1, i + 1)];
      const L = Math.hypot(b[0] - a[0], b[1] - a[1]);
      dir.push([(b[0] - a[0]) / L, (b[1] - a[1]) / L]);
      nor.push([-(b[1] - a[1]) / L, (b[0] - a[0]) / L]);
    }
    const A = c.map((p, i) => [p[0] + nor[i][0] * w[i], p[1] + nor[i][1] * w[i]]);
    const B = c.map((p, i) => [p[0] - nor[i][0] * w[i], p[1] - nor[i][1] * w[i]]);
    const e = n - 1, bout = [c[e][0] + dir[e][0] * w[e], c[e][1] + dir[e][1] * w[e]];
    return { contour: lisse(A.concat([bout], B.reverse()), true), c, w, dir, nor, bout };
  };
  const mm = m => ({ ...m, contour: miroir(m.contour), c: miroir(m.c),
    dir: m.dir.map(([x, y]) => [-x, y]), nor: m.nor.map(([x, y]) => [-x, y]), bout: [-m.bout[0], m.bout[1]] });

  const cadre = (z, bb) => {
    const s = Math.min(z.l / (bb[2] - bb[0]), z.h / (bb[3] - bb[1]));
    const ox = z.l / 2 - s * (bb[0] + bb[2]) / 2, oy = z.h / 2 - s * (bb[1] + bb[3]) / 2;
    const T = ([x, y]) => [ox + s * x, oy + s * y];
    return { s, T, P: pts => pts.map(T) };
  };
  const d = pts => pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' L');
  const chemin = pts => 'M' + d(pts);

  // silhouette : tracés épais, puis aplats blancs, puis ce qui se dessine dessus
  const silhouette = (P, formes) => [
    ...formes.map(f => h.chemin(P(f), h.a.contour, true)),
    ...formes.map(f => h.chemin(P(f), h.a.blanc, true)),
  ];
  const doigts = (P, m) => {
    const e = m.c.length - 1, w = m.w[e], out = [];
    for (const k of [-0.4, 0, 0.4]) {
      const b = [m.bout[0] + m.nor[e][0] * w * k, m.bout[1] + m.nor[e][1] * w * k];
      const a = [b[0] - m.dir[e][0] * w * 0.7, b[1] - m.dir[e][1] * w * 0.7];
      out.push(h.chemin(P([a, b]), h.a.detail));
    }
    return out;
  };

  // ─── la martre, sur le dos ─────────────────────────────────────────────────────────
  const martre = () => {
    const tete = sym([[0, 0], [6, 4], [11, 14], [15, 26], [20, 38], [24, 50], [24, 62], [18, 72], [0, 76]]);
    const oreille = lisse([[20, 42], [29, 35], [37, 40], [35, 51], [26, 57]], true);
    const tronc = sym([[0, 64], [16, 68], [20, 80], [24, 96], [28, 116], [30, 150], [30, 190],
      [29, 230], [29, 265], [28, 295], [22, 316], [12, 328], [0, 332]]);
    const av = membre([[22, 110], [40, 103], [56, 94], [66, 87]], [10, 7.5, 6, 7]);
    const ar = membre([[22, 298], [38, 310], [52, 323], [60, 341]], [12, 8, 5.5, 7]);
    const queue = sym([[0, 326], [11, 331], [17, 348], [20, 372], [19, 398], [13, 420], [0, 440]], 2.2);
    const machoire = lisse([[5, 6], [7, 16], [4, 24], [0, 27]]);
    return { tete, oreilles: [oreille, miroir(oreille)], tronc, av: [av, mm(av)], ar: [ar, mm(ar)], queue, machoire };
  };

  // ─── le loup, sur le dos ───────────────────────────────────────────────────────────
  const loup = () => {
    const tete = sym([[0, 0], [7, 4], [12, 16], [15, 30], [19, 44], [26, 56], [30, 68], [28, 80], [0, 86]]);
    const oreille = [[24, 52], [48, 42], [31, 70]];
    const tronc = sym([[0, 74], [24, 78], [28, 92], [34, 112], [42, 135], [45, 165], [44, 195],
      [39, 222], [34, 245], [34, 265], [31, 284], [18, 298], [0, 302]], 1.6);
    const av = membre([[32, 122], [60, 112], [90, 100], [106, 93]], [15, 10, 7, 9]);
    const ar = membre([[30, 272], [56, 290], [76, 316], [88, 346]], [17, 12, 7, 9]);
    const queue = sym([[0, 296], [13, 302], [20, 326], [22, 354], [17, 384], [8, 404], [0, 416]], 2.6);
    const machoire = lisse([[7, 8], [10, 22], [7, 36], [0, 40]]);
    return { tete, oreilles: [oreille, miroir(oreille)], tronc, av: [av, mm(av)], ar: [ar, mm(ar)], queue, machoire };
  };

  const bete = (P, b) => [
    ...silhouette(P, [b.queue, ...b.ar.map(m => m.contour), ...b.av.map(m => m.contour),
      b.tronc, ...b.oreilles, b.tete]),
    ...[...b.av, ...b.ar].flatMap(m => doigts(P, m)),
    h.chemin(P(miroir(b.machoire).concat(b.machoire.slice(0, -1).reverse())), h.a.detail),
    h.chemin(P([[0, 0], [3, 1.5], [2.5, 4.5], [0, 5], [-2.5, 4.5], [-3, 1.5]]), h.a.plein, true),
  ];

  // ─── les vues ─────────────────────────────────────────────────────────────────────
  const BB_M = [-84, -4, 84, 444];
  const BB_L = [-124, -4, 124, 420];
  const BB_R = [-74, -74, 74, 484];

  return {
    ref: '55-03',
    titre: 'Le tracé des coupes, en fourreau et à plat',
    desc: 'Trois vues. Une martre sur le dos, avec le tracé du dépouillement en fourreau : chaque talon arrière cerné, un trait de chaque talon à l’anus par la face interne de la patte, l’anus et ses deux glandes à musc cernés large, le ventre fermé. La même bête pendue la tête en bas par un bâton passé dans les jarrets, la peau retournée vers la tête comme un bas, cuir dehors. Un loup sur le dos, avec le tracé à plat : du menton à l’anus, et le long de la face interne des quatre membres. Encadré danger : les œufs d’Echinococcus autour de l’anus.',
    format: 'pleine',
    disposition: [['fourreau', 'retour', 'aplat']],
    largeurs: [[1, 0.9, 1.25]],
    vues: {
      fourreau: {
        titre: 'En fourreau',
        dessin: z => {
          const { P, T } = cadre(z, BB_M), b = martre(), ar = b.ar[0];
          const ring = m => {
            const i = 2, c = m.c[i], n = m.nor[i], w = m.w[i] + 1.5, dr = m.dir[i];
            const a = [c[0] + n[0] * w, c[1] + n[1] * w], bb = [c[0] - n[0] * w, c[1] - n[1] * w];
            const q = [c[0] + dr[0] * w * 0.6, c[1] + dr[1] * w * 0.6];
            return `M${d(P([a]))} Q${d(P([q]))} ${d(P([bb]))}`;
          };
          const trait = s => lisse([[s * 52, 323], [s * 38, 310], [s * 26, 309], [s * 15, 316]]);
          return [
            ...bete(P, b),
            h.ellipse(...T([0, 320]), 3.2, 2.4, h.a.arete),
            h.ellipse(...T([7.5, 321.5]), 2.6, 2, h.a.plein),
            h.ellipse(...T([-7.5, 321.5]), 2.6, 2, h.a.plein),
            h.path(ring(ar), COUPE), h.path(ring(b.ar[1]), COUPE),
            h.chemin(P(trait(1)), COUPE), h.chemin(P(trait(-1)), COUPE),
            h.ellipse(...T([0, 320]), 15 * cadre(z, BB_M).s, 11 * cadre(z, BB_M).s, COUPE),
          ].join('\n');
        },
        renvois: z => {
          const { T } = cadre(z, BB_M);
          return [
            { n: 1, rond: T([74, 300]), cible: T([55, 325]), texte: 'cerner chaque talon arrière' },
            { n: 2, rond: T([-72, 288]), cible: T([-38, 310]), texte: 'du talon à l’anus, face interne' },
            { n: 3, rond: T([42, 364]), cible: T([8.5, 323]), texte: 'glande à musc, de chaque côté' },
            { n: 4, rond: T([-44, 364]), cible: T([-15, 322]), texte: 'cerner large : glandes à la carcasse' },
            { n: 5, rond: T([66, 205]), cible: T([14, 205]), texte: 'ventre fermé : la peau sort en tube' },
          ];
        },
      },
      retour: {
        titre: 'Retourner comme un bas',
        dessin: z => {
          const { P, T, s } = cadre(z, BB_R);
          const pied = membre([[34, 14], [35, -8], [36, -28]], [5, 5, 7]);
          const cuisse = membre([[34, 14], [29, 44], [20, 72]], [5, 10, 15]);
          const tronc = sym([[0, 58], [18, 62], [23, 80], [24, 120], [23, 170], [22, 210], [22, 236], [0, 240]]);
          const fourreau = sym([[0, 221], [27, 220], [32, 232], [34, 280], [34, 330], [32, 368], [0, 372]]);
          const rabat = membre([[21, 364], [23, 400], [22, 434]], [9, 6, 3]);
          const queue = sym([[0, 358], [9, 364], [14, 388], [15, 418], [12, 448], [6, 468], [0, 480]], 2.2);
          const fleche = sx => `M${d(P([[sx * 48, 250]]))} L${d(P([[sx * 48, 336]]))}`;
          const r = 5 * s;
          const baton = `M${d(P([[-66, -5]]))} L${d(P([[66, -5]]))} A${r.toFixed(1)},${r.toFixed(1)} 0 0 1 ${d(P([[66, 5]]))} L${d(P([[-66, 5]]))} A${r.toFixed(1)},${r.toFixed(1)} 0 0 1 ${d(P([[-66, -5]]))} Z`;
          return [
            h.chemin(P([[0, -74], [0, -5]]), h.a.arete),
            ...silhouette(P, [queue, pied.contour, miroir(pied.contour), cuisse.contour, miroir(cuisse.contour),
              tronc, rabat.contour, miroir(rabat.contour), fourreau]),
            ...doigts(P, pied), ...doigts(P, mm(pied)),
            // limite du poil au talon
            h.chemin(P([[29, 16], [39, 15]]), h.a.arete), h.chemin(P([[-29, 16], [-39, 15]]), h.a.arete),
            // muscles à nu
            h.chemin(P(lisse([[31, 26], [26, 48], [16, 68]])), h.a.detail),
            h.chemin(P(lisse([[-31, 26], [-26, 48], [-16, 68]])), h.a.detail),
            h.chemin(P([[0, 78], [0, 214]]), h.a.detail),
            h.chemin(P(lisse([[4, 84], [14, 120], [12, 180]])), h.a.detail),
            h.chemin(P(lisse([[-4, 84], [-14, 120], [-12, 180]])), h.a.detail),
            // le repli : la peau tourne sur elle-même
            h.ellipse(...T([0, 226]), 30 * s, 5 * s, h.a.arete),
            // cuir
            ...[[[-24, 242], [-13, 247], [-4, 243]], [[6, 245], [16, 249], [25, 244]],
              [[-25, 286], [-18, 297], [-21, 310]], [[17, 276], [23, 289], [20, 301]],
              [[-8, 326], [0, 334], [7, 330]], [[-20, 350], [-12, 356]], [[14, 348], [22, 354]]]
              .map(l => h.chemin(P(lisse(l)), h.a.detail)),
            h.path(baton, h.a.blanc), h.path(baton, h.a.arete),
            h.fleche(fleche(1)), h.fleche(fleche(-1)),
          ].join('\n');
        },
        renvois: z => {
          const { T } = cadre(z, BB_R);
          return [
            { n: 6, rond: T([60, -40]), cible: T([54, -5]), texte: 'bâton entre le tendon et l’os' },
            { n: 7, rond: T([60, 200]), cible: T([29, 224]), texte: 'couteau seulement là où ça résiste' },
            { n: 8, rond: T([-66, 262]), cible: T([-48, 292]), texte: 'tirer à deux mains, vers la tête' },
            { n: 9, rond: T([62, 360]), cible: T([33, 340]), texte: 'cuir dehors, poil dedans' },
          ];
        },
      },
      aplat: {
        titre: 'À plat',
        dessin: z => {
          const { P } = cadre(z, BB_L), b = loup();
          const bras = s => lisse([[s * 90, 100], [s * 60, 112], [s * 30, 124], [0, 132]]);
          const jambe = s => lisse([[s * 76, 316], [s * 56, 290], [s * 30, 281], [s * 8, 286], [0, 289]]);
          const rabat = s => `M${d(P([[s * 7, 204]]))} Q${d(P([[s * 22, 196]]))} ${d(P([[s * 36, 202]]))}`;
          return [
            ...bete(P, b),
            h.ellipse(...P([[0, 294]])[0], 3.5, 2.6, h.a.arete),
            h.chemin(P([[0, 14], [0, 289]]), COUPE),
            h.chemin(P(bras(1)), COUPE), h.chemin(P(bras(-1)), COUPE),
            h.chemin(P(jambe(1)), COUPE), h.chemin(P(jambe(-1)), COUPE),
            h.fleche(rabat(1)), h.fleche(rabat(-1)),
          ].join('\n');
        },
        renvois: z => {
          const { T } = cadre(z, BB_L);
          return [
            { n: 10, rond: T([-78, 190]), cible: T([-1.5, 180]), texte: 'du menton à l’anus' },
            { n: 11, rond: T([76, 150]), cible: T([62, 114]), texte: 'face interne des quatre membres' },
            { n: 12, rond: T([78, 222]), cible: T([20, 198.5]), texte: 'la peau se rabat de chaque côté' },
          ];
        },
      },
    },
    danger: 'Les œufs d’Echinococcus se ramassent autour de l’anus et sur le poil du bassin : des gants pendant, du savon et de l’eau après.',
  };
};
