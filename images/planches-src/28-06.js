// Planche 28-06 — Laver un œil qui colle (ch. 28, étape 45, et « Laver un œil et une peau sans
// produit »). Le bol d'eau bouillie refroidie et les cotons ; puis le haut du visage vu de face,
// les deux yeux fermés et collés : un coton sur chaque œil, chacun passé du coin du nez vers le
// coin extérieur. Pas de main : le coton en place et la flèche du geste.
//
// La charte : le bol pèse (contour fort) et sa face de droite est à l'ombre. Rien de gris sur le
// visage, qui est un corps (dessiné à la main, laissé tel quel). Le rouge : le passage du coton,
// du coin du nez vers le coin extérieur, une flèche sous chaque œil.
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

  // ─── Le visage, de profil (JP, 14 octobre : « passe-les de profil ») ────────────────────
  // La tête de la bibliothèque, regard vers la droite, repère à l'oreille, en mm. Un seul œil :
  // le coton posé dessus, la flèche du geste sous l'œil, du coin du nez (devant) vers le coin
  // extérieur (vers l'oreille). L'autre œil passe par le renvoi 5, sur le second coton du bol.
  // Un gros plan : la vue coupe la tête au front, derrière l'oreille et sous la bouche, comme
  // l'ancienne vue de face coupait le visage.
  const R_COTON = 9;                       // mm
  const FEN = [-62, -112, 178, 36];         // la fenêtre, en mm de tête : de l'oreille au nez, du front à la bouche
  const geoV = (z) => {
    const e = Math.min(z.l / (FEN[2] - FEN[0]), z.h / (FEN[3] - FEN[1]));
    const x = (z.l - e * (FEN[2] - FEN[0])) / 2 - FEN[0] * e, y = (z.h - e * (FEN[3] - FEN[1])) / 2 - FEN[1] * e;
    return { e, x, y, V: ([u, v]) => [x + u * e, y + v * e] };
  };
  const COTON = [79, -23];                 // sur l'œil (l'œil de la tête est en [80, -24])
  const GESTE = [[95, -10], [86, -5], [74, -4.5], [62, -8.5]];   // sous l'œil, du devant vers l'oreille

  const visage = (z) => {
    const { e, x, y, V } = geoV(z);
    const out = [];
    out.push(`<clipPath id="vue-2806-visage"><rect x="0" y="0" width="${f(z.l)}" height="${f(z.h)}" fill="#FFFFFF"/></clipPath>`);
    out.push(`<g clip-path="url(#vue-2806-visage)">${h.formes.tete({ x, y, echelle: e, age: 'adulte' })}</g>`);
    out.push(coton(...V(COTON), R_COTON * e));
    out.push(h.geste(lisse(GESTE.map(V))));
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
      // la face de droite du bol, à l'ombre, découpée par le bol lui-même
      `<clipPath id="ombre-bol-2806"><path d="${corps}" fill="#FFFFFF"/></clipPath>`,
      `<g clip-path="url(#ombre-bol-2806)">${h.rect(bx + rx * 0.4, by, rx * 0.7, haut * 1.1, h.a.ombre)}</g>`,
      h.path(corps, h.a.contour),
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
            { n: 5, rond: [bx + rx * 0.62, yc + 46], cible: [bx + rx * 0.5, yc + 16], texte: 'l’autre œil : un autre coton neuf' },
          ];
        },
      },
      visage: {
        dessin: visage,
        renvois: z => {
          const { V, e } = geoV(z);
          const c = V(COTON);
          return [
            { n: 3, rond: V([150, -82]), cible: [c[0] + R_COTON * e * 0.6, c[1] - R_COTON * e * 0.75], texte: 'trempé, passé du coin du nez vers le coin extérieur' },
            { n: 4, rond: V([150, 4]), cible: V(GESTE[1]), texte: 'toujours dans le même sens, sans frotter' },
          ];
        },
      },
    },
  };
};
