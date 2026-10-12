// Planche 28-06 — Laver un œil qui colle (ch. 28, étape 45, et « Laver un œil et une peau sans
// produit »). Le bol d'eau bouillie refroidie et les cotons ; puis le haut du visage vu de face,
// les deux yeux fermés et collés : un coton sur chaque œil, chacun passé du coin du nez vers le
// coin extérieur. Pas de main : le coton en place et la flèche du geste.
module.exports = (h) => {
  const f = (v) => Math.round(v * 10) / 10;

  // Une courbe lisse qui passe par chaque point (Catmull-Rom), en chaîne SVG.
  const lisse = (pts, ferme = false) => {
    const n = pts.length;
    const P = (i) => ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
    let d = `M ${f(pts[0][0])} ${f(pts[0][1])}`;
    const fin = ferme ? n : n - 1;
    for (let i = 0; i < fin; i++) {
      const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C ${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
    }
    return ferme ? d + ' Z' : d;
  };
  const blanc = (at) => at.replace('fill="none"', 'fill="#fff"');

  // Un coton en boule : un contour festonné, deux boucles de fibre dedans.
  const coton = (cx, cy, r) => {
    const n = 9, pts = [], ctl = [];
    const irr = [1, 0.93, 1.04, 0.95, 1.02, 0.9, 1.05, 0.96, 1];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * 2 * Math.PI - 0.3;
      const am = ((i + 0.5) / n) * 2 * Math.PI - 0.3;
      pts.push([cx + Math.cos(a) * r * 0.9 * irr[i], cy + Math.sin(a) * r * 0.9 * irr[i]]);
      ctl.push([cx + Math.cos(am) * r * 1.16, cy + Math.sin(am) * r * 1.16]);
    }
    let d = `M ${f(pts[0][0])} ${f(pts[0][1])}`;
    for (let i = 0; i < n; i++) {
      const q = ctl[i], p = pts[(i + 1) % n];
      d += ` Q ${f(q[0])} ${f(q[1])} ${f(p[0])} ${f(p[1])}`;
    }
    d += ' Z';
    const k = r / 10;
    return [
      h.path(d, blanc(h.a.arete)),
      h.path(`M ${f(cx - 5 * k)} ${f(cy + 1 * k)} q ${f(2 * k)} ${f(-4 * k)} ${f(5 * k)} ${f(-2 * k)}`, h.a.fin),
      h.path(`M ${f(cx + 0.5 * k)} ${f(cy + 4.5 * k)} q ${f(3 * k)} ${f(-1 * k)} ${f(4.5 * k)} ${f(-4 * k)}`, h.a.fin),
    ].join('\n');
  };

  // ─── Le visage, en mm, origine entre les deux yeux, x vers la droite de la page ───────────
  const HAUT = -50, BAS = 58;             // le haut du visage, coupé au front et sous le nez
  const geoV = (z) => {
    const s = Math.min(2.05, (z.h - 14) / (BAS - HAUT));
    const cx = z.l / 2, cy = 7 + -HAUT * s;
    const V = ([x, y]) => [cx + x * s, cy + y * s];
    return { s, cx, cy, V };
  };

  // Un côté du visage (sg = +1 à droite de la page, -1 à gauche), en mm.
  const miroir = (pts, sg) => pts.map(([x, y]) => [x * sg, y]);
  const cote = (sg) => {
    const joue = miroir([[69, HAUT], [73, -32], [75, -14], [74.5, 5], [72.5, 24], [69.5, 42], [66, BAS]], sg);
    const oreille = miroir([[72, -13], [77, -18.5], [83.5, -14], [86, -1], [85, 14], [82, 29], [78.5, 41], [74, 47], [70.5, 44]], sg);
    const conque = miroir([[75.5, -7], [80.5, -6], [81.5, 7], [79, 22], [76.5, 31]], sg);
    const sourcilBas = miroir([[13, -15.5], [22, -18.4], [33, -19.7], [44, -18.3], [52.5, -14]], sg);
    const sourcilHaut = miroir([[52.5, -14], [44, -20.3], [33, -22.6], [23, -22.4], [14, -19.8]], sg);
    const bord = miroir([[15.5, 0.2], [21, 3], [29, 4.4], [37, 3.4], [43, 0.8], [46.5, -1.8]], sg);   // bord de la paupière
    const pli = miroir([[17.5, -3.5], [24, -7], [32, -8.2], [40, -6.6], [45.5, -3.5]], sg);           // pli de la paupière du haut
    const dessous = miroir([[20, 7.5], [28, 9.2], [36, 8.8], [42, 6.5]], sg);                        // paupière du bas
    const aile = miroir([[9.5, 35], [14.5, 38.5], [16.5, 43], [14, 47.3], [9, 47.6]], sg);           // aile du nez
    return { joue, oreille, conque, sourcilBas, sourcilHaut, bord, pli, dessous, aile };
  };

  // Le point du bord de paupière à la fraction t (0 : coin du nez, 1 : coin extérieur).
  const surBord = (bord, t) => {
    const k = t * (bord.length - 1), i = Math.min(bord.length - 2, Math.floor(k)), u = k - i;
    return [bord[i][0] + (bord[i + 1][0] - bord[i][0]) * u, bord[i][1] + (bord[i + 1][1] - bord[i][1]) * u];
  };

  // Les cotons sur les yeux : le premier à mi-chemin, l'autre au coin du nez.
  const R_COTON = 8.5;                     // mm
  const cotonG = [-30, 1.5], cotonD = [18.5, 1];

  const visage = (z) => {
    const { s, V } = geoV(z);
    const W = (pts) => pts.map(V);
    const out = [];
    for (const sg of [-1, 1]) {
      const c = cote(sg);
      out.push(h.path(lisse(W(c.joue)), h.a.arete));
      out.push(h.path(lisse(W(c.oreille)), blanc(h.a.arete)));
      out.push(h.path(lisse(W(c.conque)), h.a.detail));
      // le sourcil : une forme effilée vers l'extérieur, pleine
      out.push(h.path(lisse(W([...c.sourcilBas, ...c.sourcilHaut.slice(1)]), true), h.a.plein));
      // l'œil fermé : pli du haut, bord de la paupière, cils, paupière du bas
      out.push(h.path(lisse(W(c.pli)), h.a.detail));
      out.push(h.path(lisse(W(c.bord)), h.a.arete));
      out.push(h.path(lisse(W(c.dessous)), h.a.fin));
      for (let i = 0; i < 9; i++) {
        const t = 0.14 + i * 0.1;
        const [bx, by] = surBord(c.bord, t);
        const lg = 2.6 + 0.8 * Math.sin(Math.PI * t);
        out.push(h.path(`M ${f(V([bx, by])[0])} ${f(V([bx, by])[1])} q ${f(sg * 0.6 * s)} ${f(lg * 0.6 * s)} ${f(sg * (0.8 + t * 1.6) * s)} ${f(lg * s)}`, h.a.detail));
      }
      // le nez : l'aile et la narine
      out.push(h.path(lisse(W(c.aile)), h.a.arete));
      const [nx, ny] = V([sg * 5.6, 46.3]);
      out.push(h.ellipse(nx, ny, 2.6 * s, 1.05 * s, h.a.plein));
    }
    // l'arête du nez, du côté de l'ombre, et le bout du nez
    out.push(h.path(lisse(W([[7.2, 12], [8.2, 22], [9.4, 31]])), h.a.detail));
    out.push(h.path(lisse(W([[-9, 47.6], [-4, 48.5], [0, 48.8], [4, 48.5], [9, 47.6]])), h.a.detail));

    // le passage de chaque coton : la flèche, du coin du nez vers le coin extérieur
    const flecheSous = (sg) => {
      const pts = miroir([[15, 14.5], [24, 16.8], [34, 16.4], [43, 13.2], [50.5, 8.5]], sg);
      return h.fleche(lisse(W(pts)), h.a.arete);
    };
    out.push(flecheSous(-1), flecheSous(1));
    out.push(coton(...V(cotonG), R_COTON * s));
    out.push(coton(...V(cotonD), R_COTON * s));
    return out.join('\n');
  };

  // ─── Le bol et les cotons ─────────────────────────────────────────────────────────────
  const geoB = (z) => {
    const bx = z.l / 2, by = z.h * 0.3, rx = Math.min(58, z.l / 2 - 16), ry = rx * 0.23;
    return { bx, by, rx, ry };
  };
  const bol = (z) => {
    const { bx, by, rx, ry } = geoB(z);
    const pied = rx * 0.38, haut = rx * 1.0;
    const corps = `M ${f(bx - rx)} ${f(by)} C ${f(bx - rx)} ${f(by + haut * 0.55)} ${f(bx - rx * 0.66)} ${f(by + haut * 0.9)} ${f(bx - pied)} ${f(by + haut * 0.94)}`
      + ` L ${f(bx - pied * 0.92)} ${f(by + haut * 1.05)} L ${f(bx + pied * 0.92)} ${f(by + haut * 1.05)} L ${f(bx + pied)} ${f(by + haut * 0.94)}`
      + ` C ${f(bx + rx * 0.66)} ${f(by + haut * 0.9)} ${f(bx + rx)} ${f(by + haut * 0.55)} ${f(bx + rx)} ${f(by)}`
      + ` A ${f(rx)} ${f(ry)} 0 0 1 ${f(bx - rx)} ${f(by)} Z`;
    const yc = by + haut * 1.05 + 40;
    return [
      h.ellipse(bx, by + ry * 0.55, rx * 0.85, ry * 0.78, h.a.hachure('eau', 'detail')),
      h.path(corps, blanc(h.a.arete)),
      h.ligne(bx - pied, by + haut * 0.94, bx + pied, by + haut * 0.94, h.a.detail),
      h.ellipse(bx, by, rx, ry, h.a.arete),
      h.ellipse(bx, by - ry * 0.02, rx * 0.93, ry * 0.86, h.a.fin),
      coton(bx - rx * 0.45, yc, 17),
      coton(bx + rx * 0.45, yc + 4, 17),
    ].join('\n');
  };

  return {
    ref: '28-06',
    titre: 'Laver un œil qui colle',
    desc: 'À gauche, un bol d’eau bouillie refroidie et deux boules de coton neuves, une par œil. À droite, le haut d’un visage vu de face, les deux yeux fermés. Sur l’œil de gauche, un premier coton a fait la moitié du chemin depuis le coin du nez ; sur l’œil de droite, un autre coton part du coin du nez. Sous chaque œil, une flèche va du coin du nez vers le coin extérieur.',
    fichier: 'planche-28-06-laver-un-oeil-qui-colle.svg',
    format: 'demi',
    disposition: [['bol', 'visage']],
    largeurs: [[2, 5]],
    vues: {
      bol: {
        dessin: bol,
        renvois: z => {
          const { bx, by, rx, ry } = geoB(z);
          const yc = by + rx * 1.05 + 40;
          return [
            { n: 1, rond: [bx - rx * 0.62, by - ry - 26], cible: [bx - rx * 0.25, by + ry * 0.2], texte: 'eau bouillie refroidie, ou solution à 9 g de sel par litre' },
            { n: 2, rond: [bx - rx * 0.55, yc + 42], cible: [bx - rx * 0.45, yc + 12], texte: 'coton neuf, ou carré de coton bouilli : un par œil' },
          ];
        },
      },
      visage: {
        dessin: visage,
        renvois: z => {
          const { V, s } = geoV(z);
          return [
            { n: 3, rond: V([-58, -40]), cible: [V(cotonG)[0] - R_COTON * s * 0.3, V(cotonG)[1] - R_COTON * s * 0.95], texte: 'trempé, passé du coin du nez vers le coin extérieur' },
            { n: 4, rond: V([-60, 33]), cible: V([-38, 16.6]), texte: 'toujours dans le même sens, sans frotter' },
            { n: 5, rond: V([40, -40]), cible: [V(cotonD)[0] + R_COTON * s * 0.2, V(cotonD)[1] - R_COTON * s * 0.95], texte: 'l’autre œil : un autre coton neuf' },
          ];
        },
      },
    },
  };
};
