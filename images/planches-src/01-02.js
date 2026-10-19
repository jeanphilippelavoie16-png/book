// Planche 01-02 (petite planche, une colonne). Le témoin de dégel : un verre d'eau gelée, une pièce de monnaie
// posée sur la glace, et ce que dit la pièce au retour. Planche neuve, 19 octobre 2026 (oui de JP le 19 octobre).
//
// Le texte : ch. 1, étape 15 : « poser un témoin de dégel dans le congélateur : un verre d'eau gelée, avec une pièce
// de monnaie posée sur la glace. […] Au retour, si la pièce est restée en surface, rien n'a dégelé ; si elle est au
// fond, tout a dégelé puis regelé ; à mi-hauteur, le dégel a été partiel. » Le même témoin : ch. 3 (« Le verre à la
// pièce de monnaie »), ch. 5 (« Le témoin de gel »), ch. 7, ch. 9 (« L'enregistreur de température »), ch. 41, 59,
// 73, 74, 75.
//
// Deux vues au même cadrage de verre.
//   En partant : le verre d'eau (bleu, h.a.hachure('eau')), puis le même verre gelé, la pièce au-dessus de la glace
//                et la flèche rouge du geste qui la pose. L'ordre compte : on fait geler d'abord, on pose la pièce
//                ensuite ; mise dans l'eau, elle coulerait au fond et le témoin ne dirait rien.
//   Au retour  : trois verres pareils, alignés sur ceux du haut, la pièce en surface, à mi-hauteur, au fond ; un
//                cercle rouge couché autour de chaque pièce, avec son repère, et la légende dit ce que chacune veut
//                dire, avec les mots du texte.
// Seule l'eau liquide est bleue (h.a.hachure('eau')). La glace est un bloc en gris clair (#E6E6E6) : blanche, elle se
// lisait comme un verre vide, et la pièce prise à mi-hauteur avait l'air de flotter dans l'air (essais du 19 octobre).
// La pièce : la face blanche, la tranche en gris d'ombre, sans anneau intérieur (il la faisait lire comme une rondelle).
// Aucune main : poser une pièce ne demande aucune prise ; l'objet en place et la flèche du geste suffisent.
// Aucune cote, aucun chiffre : le texte n'en donne pas (règle 1). Seule proportion : la pièce fait un peu plus du
// tiers du diamètre du verre (une pièce de 25 cents dans un verre ordinaire) ; c'est elle qui donne l'échelle.

module.exports = (h) => {
  const A = h.a;
  const f = v => Math.round(v * 10) / 10;
  const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const K = 0.32;                 // un cercle couché, vu d'un peu au-dessus

  // ── le verre ──────────────────────────────────────────────────────────────────────────────────────────────
  // cx : l'axe ; yb : le bas du pied ; Wt, Wb : le diamètre en haut et en bas ; Ht : la hauteur.
  const geoVerre = (cx, yb, Wt, Wb, Ht) => {
    const yt = yb - Ht, paroi = 2.6, fond = 7;
    const r = y => Wb / 2 + (Wt - Wb) / 2 * (yb - y) / Ht;          // rayon extérieur à la hauteur y
    const ri = y => r(y) - paroi;                                      // rayon intérieur
    const yf = yb - fond;                                              // le dessus du fond épais (le plancher)
    const yc = yt + Ht * 0.28;                                         // le niveau de l'eau ou de la glace
    return { cx, yb, yt, Wt, Wb, Ht, r, ri, yf, yc, paroi };
  };
  // le contenu (eau ou glace) : la surface en ellipse, les parois, l'arc avant du plancher
  const contenu = (g, attrs) => {
    const a = g.ri(g.yc), b = g.ri(g.yf);
    return h.path(`M ${f(g.cx - a)} ${f(g.yc)} L ${f(g.cx - b)} ${f(g.yf)} A ${f(b)} ${f(b * K)} 0 0 0 ${f(g.cx + b)} ${f(g.yf)} `
      + `L ${f(g.cx + a)} ${f(g.yc)} A ${f(a)} ${f(a * K)} 0 0 0 ${f(g.cx - a)} ${f(g.yc)} Z`, attrs);
  };
  const surface = (g, at = A.arete) => h.ellipse(g.cx, g.yc, g.ri(g.yc), g.ri(g.yc) * K, at);
  // le verre lui-même, transparent : le contour, le bord en ellipse, le plancher du fond épais, un reflet
  const verre = g => {
    const { cx, yb, yt, Wt, Wb } = g, out = [];
    out.push(h.path(`M ${f(cx - Wt / 2)} ${f(yt)} L ${f(cx - Wb / 2)} ${f(yb)} A ${f(Wb / 2)} ${f(Wb / 2 * K)} 0 0 0 ${f(cx + Wb / 2)} ${f(yb)} `
      + `L ${f(cx + Wt / 2)} ${f(yt)}`, A.contour));
    out.push(h.ellipse(cx, yt, Wt / 2, Wt / 2 * K, A.arete));
    const b = g.ri(g.yf);
    out.push(h.path(`M ${f(cx - b)} ${f(g.yf)} A ${f(b)} ${f(b * K)} 0 0 0 ${f(cx + b)} ${f(g.yf)}`, A.detail));
    // le reflet du verre : un trait fin le long de la paroi de gauche
    const y1 = g.yc + g.ri(g.yc) * K + 5, y2 = yb - g.Ht * 0.2, d = 5.5;
    out.push(h.ligne(cx - g.r(y1) + d, y1, cx - g.r(y2) + d, y2, A.detail));
    return out.join('\n');
  };
  // la glace : un bloc en gris clair (le blanc se lirait comme un verre vide) ; deux reflets courts à droite
  const glace = g => {
    const out = [contenu(g, A.loin)];
    // les reflets, contre la paroi de droite, sous la surface : hors des places de la pièce et de ses cercles
    const y = g.yc + g.ri(g.yc) * K + 2.5, x = g.cx + g.ri(y) - 7;
    // un seul chemin : ce sont deux reflets, pas une hachure
    out.push(h.path(`M ${f(x - 3)} ${f(y + 7)} L ${f(x + 1.5)} ${f(y + 1)} M ${f(x + 0.5)} ${f(y + 9)} L ${f(x + 4)} ${f(y + 4.5)}`, A.detail));
    return out.join('\n');
  };
  const eau = g => contenu(g, A.hachure('eau', 'aucun'));

  // ── la pièce de monnaie, couchée : la face du dessus blanche, la tranche en gris d'ombre ──
  const piece = (cx, cy, d) => {
    const rx = d / 2, ry = rx * K, t = 2.2, out = [];
    out.push(h.path(`M ${f(cx - rx)} ${f(cy)} L ${f(cx - rx)} ${f(cy + t)} A ${f(rx)} ${f(ry)} 0 0 0 ${f(cx + rx)} ${f(cy + t)} L ${f(cx + rx)} ${f(cy)} Z`,
      A.ombre.replace('stroke="none"', 'stroke="#1A1A1A" stroke-width="1.4" stroke-linejoin="round"')));
    out.push(h.ellipse(cx, cy, rx, ry, blanc(A.arete)));
    return out.join('\n');
  };
  const T_PIECE = 2.2;

  // ── En partant ──
  const WT = 54, WB = 43, HT = 72;
  const COL = l => [53, l / 2 + 12, l - 30];   // les trois colonnes des verres
  const geoPartant = z => {
    const yb = z.h - 4, c = COL(z.l);
    const g1 = geoVerre(c[0], yb, WT, WB, HT);       // aligné sur le premier verre du retour
    const g2 = geoVerre(c[2], yb, WT, WB, HT);       // aligné sur le troisième
    const dP = WT * 0.38;
    const yP = g2.yt - 18;                      // la pièce, au-dessus du verre gelé
    return { g1, g2, dP, yP };
  };
  // ── Au retour ──
  const geoRetour = z => {
    const yb = z.h - 4, c = COL(z.l);
    const gs = [0, 1, 2].map(i => geoVerre(c[i], yb, WT, WB, HT));
    const d = WT * 0.38;
    // les trois places de la pièce : posée sur la glace ; prise au milieu du bloc ; couchée sur le plancher
    const ys = [gs[0].yc - T_PIECE, gs[1].yc + (gs[1].yf - gs[1].yc) * 0.55 - T_PIECE / 2, gs[2].yf - T_PIECE];
    return { gs, d, ys };
  };

  return {
    ref: '01-02',
    titre: 'Le témoin de dégel',
    desc: 'En haut, en partant : un verre d’eau, puis le même verre gelé ; une pièce de monnaie, au-dessus de la glace, '
      + 'et une flèche rouge qui la pose sur la glace. En bas, au retour : trois verres de glace pareils. Dans le premier, '
      + 'la pièce est restée sur la glace : rien n’a dégelé. Dans le deuxième, elle est prise à mi-hauteur dans la glace : '
      + 'le dégel a été partiel. Dans le troisième, elle est couchée au fond : tout a dégelé puis regelé. Un cercle rouge '
      + 'entoure chaque pièce.',
    format: 'quart',
    disposition: [['partant'], ['retour']],
    hauteurs: [130, 108],
    vues: {
      partant: {
        titre: 'En partant',
        dessin: z => {
          const g = geoPartant(z), out = [];
          out.push(eau(g.g1), surface(g.g1), verre(g.g1));
          out.push(glace(g.g2), surface(g.g2), verre(g.g2));
          // de l'un à l'autre : le temps de geler
          const ym = g.g1.yt + HT * 0.55, xa = g.g1.cx + WT / 2 + 12, xb = g.g2.cx - WT / 2 - 12;
          out.push(h.fleche(`M ${f(xa)} ${f(ym)} L ${f(xb)} ${f(ym)}`, A.arete));
          // la pièce au-dessus de la glace, et le geste qui la pose
          out.push(piece(g.g2.cx, g.yP, g.dP));
          out.push(h.geste(`M ${f(g.g2.cx)} ${f(g.yP + T_PIECE + g.dP / 2 * K + 3)} L ${f(g.g2.cx)} ${f(g.g2.yc - 1.5)}`));
          return out.join('\n');
        },
        renvois: z => {
          const g = geoPartant(z);
          return [
            { n: 1, rond: [g.g1.cx - WT / 2 - 14, g.g1.yt + 6], cible: [g.g1.cx - g.g1.ri(g.g1.yc) * 0.5, g.g1.yc + 16], texte: 'faire geler un verre d’eau' },
            { n: 2, rond: [g.g2.cx - g.dP / 2 - 24, g.yP - 4], cible: [g.g2.cx - g.dP / 2 - 1, g.yP + 1], texte: 'puis poser une pièce sur la glace' },
          ];
        },
      },
      retour: {
        titre: 'Au retour',
        dessin: z => {
          const g = geoRetour(z), out = [];
          g.gs.forEach((v, i) => {
            out.push(glace(v), surface(v), verre(v), piece(v.cx, g.ys[i], g.d));
            // le cercle rouge du point à regarder, couché comme la pièce
            out.push(h.ellipse(v.cx, g.ys[i] + 1, g.d / 2 + 5, (g.d / 2 + 5) * 0.6, A.controle));
          });
          return out.join('\n');
        },
        renvois: z => {
          const g = geoRetour(z);
          const textes = ['en surface : rien n’a dégelé', 'à mi-hauteur : le dégel a été partiel', 'au fond : tout a dégelé puis regelé'];
          return g.gs.map((v, i) => {
            const r = g.d / 2 + 5, cy = g.ys[i] + 1;
            const yr = Math.max(11, Math.min(z.h - 11, cy - 6));
            return { n: 3 + i, rond: [v.cx - WT / 2 - 14, yr], cible: [v.cx - r, cy], texte: textes[i] };
          });
        },
      },
    },
  };
};
