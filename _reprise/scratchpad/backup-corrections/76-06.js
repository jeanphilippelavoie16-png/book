// Planche 76-06 — Le séchoir à truite (ch. 71, section G et section 9).
// Aucune dimension du séchoir n'est donnée au chapitre : pas de cote. L'échelle est portée
// par la truite ouverte, objet connu, et par le rapport claie / poisson du tableau Matériel.
module.exports = (h) => {
  // Trois claies, même hauteur en élévation et en coupe.
  const NIV = [100, 160, 220];
  const HAUT = 36, BAS = 262;           // lisse du haut (36-46), lisse du bas (262-272)

  const sol = z => {
    const y = z.h - 16;
    return [
      h.rect(18, y, z.l - 36, 7, h.a.hachure('terre', 'detail')),
      h.ligne(18, y, z.l - 18, y, h.a.arete),
    ].join('\n');
  };

  // Une truite en portefeuille vue de bout : deux filets joints par le dos.
  const bout = (c, L) =>
    `M ${c - 14},${L} C ${c - 14},${L - 4} ${c - 9},${L - 6} ${c - 3},${L - 5} ` +
    `Q ${c},${L - 3} ${c + 3},${L - 5} C ${c + 9},${L - 6} ${c + 14},${L - 4} ${c + 14},${L} Z`;

  // La même, vue de dessus, chair en dessus, queue gardée.
  const dessus = (c, y0, Lf, w) => {
    const d =
      `M ${c - w * 0.8},${y0} Q ${c},${y0 - 4} ${c + w * 0.8},${y0} ` +
      `C ${c + w * 1.08},${y0 + 30} ${c + w},${y0 + 72} ${c + w * 0.32},${y0 + Lf - 24} ` +
      `L ${c + w * 0.2},${y0 + Lf - 18} L ${c + w * 0.85},${y0 + Lf} ` +
      `Q ${c},${y0 + Lf - 9} ${c - w * 0.85},${y0 + Lf} L ${c - w * 0.2},${y0 + Lf - 18} ` +
      `L ${c - w * 0.32},${y0 + Lf - 24} C ${c - w},${y0 + 72} ${c - w * 1.08},${y0 + 30} ${c - w * 0.8},${y0} Z`;
    const traits = [];
    for (let i = 0; i < 5; i++) {
      const y = y0 + 14 + i * 19;
      const f = i < 3 ? 0.8 : 0.8 - (i - 2) * 0.18;
      traits.push(h.path(`M ${c - 2},${y} Q ${c - w * 0.45},${y + 7} ${c - w * f},${y + 3}`, h.a.detail));
      traits.push(h.path(`M ${c + 2},${y} Q ${c + w * 0.45},${y + 7} ${c + w * f},${y + 3}`, h.a.detail));
    }
    return [
      h.path(d, h.a.blanc), h.path(d, h.a.arete),
      h.ligne(c, y0 - 1, c, y0 + Lf - 20, h.a.detail),
      ...traits,
    ].join('\n');
  };

  return {
    ref: '76-06',
    titre: 'Le séchoir à truite',
    desc: 'Un séchoir de perches fermé de toile sur toutes ses faces, trois claies de baguettes '
      + 'posées sur tasseaux, les truites ouvertes en portefeuille sans se toucher, et l’air lent '
      + 'qui entre par une face, passe entre les claies et ressort par l’autre. En élévation avec '
      + 'la toile de la porte arrachée, en coupe, une claie vue de dessus et la ligature à la babiche.',
    format: 'pleine',
    disposition: [['elevation', 'coupe'], ['claie', 'ligature']],
    hauteurs: [3, 2],
    largeurs: [[1, 1], [3, 2]],
    vues: {
      // ── Élévation : la porte fermée, sa toile arrachée à droite pour montrer les claies ──
      elevation: {
        titre: 'En élévation, toile de la porte arrachée',
        dessin: z => {
          const cx = z.l / 2, X0 = cx - 95, X1 = cx + 95, yg = z.h - 16;
          const out = [];
          // intérieur : claies de face, truites de bout
          for (const L of NIV) {
            out.push(h.rect(cx - 85, L, 170, 4, h.a.blanc), h.rect(cx - 85, L, 170, 4, h.a.arete));
            for (let i = 0; i < 5; i++) {
              const c = cx - 85 + 17 + i * 34;
              out.push(h.path(bout(c, L), h.a.blanc), h.path(bout(c, L), h.a.arete),
                h.ligne(c - 14, L, c + 14, L, h.a.contour));
            }
          }
          // thermomètre min-max en U, pendu à la lisse du haut
          const tx = cx + 42;
          out.push(
            h.ligne(tx, 46, tx, 54, h.a.detail),
            h.rect(tx - 7, 54, 14, 32, h.a.blanc), h.rect(tx - 7, 54, 14, 32, h.a.arete),
            h.path(`M ${tx - 3},59 L ${tx - 3},79 Q ${tx},84 ${tx + 3},79 L ${tx + 3},59`, h.a.detail),
            h.cercle(tx - 3, 59, 1.8, h.a.detail), h.cercle(tx + 3, 59, 1.8, h.a.detail),
          );
          // toile de la porte, arrachée le long d'une déchirure
          const dech = [[cx - 5, 55], [cx - 12, 72], [cx - 6, 90], [cx - 16, 112], [cx - 10, 135],
            [cx - 22, 158], [cx - 15, 180], [cx - 27, 204], [cx - 20, 226], [cx - 35, 253]];
          const toile = [[cx - 76, 55], ...dech, [cx - 76, 253]];
          out.push(
            h.chemin(toile, h.a.blanc, true),
            h.chemin(toile, h.a.hachure('grillage', 'detail'), true),
            h.chemin(dech, h.a.detail),
          );
          // cadre de la porte (battants de 6)
          const cadre = `M ${cx - 82},49 H ${cx + 82} V 259 H ${cx - 82} Z ` +
            `M ${cx - 76},55 V 253 H ${cx + 76} V 55 Z`;
          out.push(h.path(cadre, h.a.blanc), h.path(cadre, h.a.arete));
          // ossature : poteaux jusqu'au sol, lisses haut et bas
          out.push(
            h.rect(X0, HAUT, 10, yg - HAUT, h.a.blanc), h.rect(X0, HAUT, 10, yg - HAUT, h.a.contour),
            h.rect(X1 - 10, HAUT, 10, yg - HAUT, h.a.blanc), h.rect(X1 - 10, HAUT, 10, yg - HAUT, h.a.contour),
            h.rect(X0 + 10, HAUT, 170, 10, h.a.blanc), h.rect(X0 + 10, HAUT, 170, 10, h.a.contour),
            h.rect(X0 + 10, BAS, 170, 10, h.a.blanc), h.rect(X0 + 10, BAS, 170, 10, h.a.contour),
            h.ligne(X0 + 3, HAUT + 4, X0 + 3, yg - 4, h.a.detail),
            h.ligne(X1 - 7, HAUT + 4, X1 - 7, yg - 4, h.a.detail),
          );
          // pentures à gauche, tourniquet à droite
          for (const y of [70, 238]) {
            out.push(h.rect(X0 + 4, y - 4, 16, 8, h.a.blanc), h.rect(X0 + 4, y - 4, 16, 8, h.a.arete));
          }
          out.push(
            h.chemin([[X1 - 8, 146], [X1 - 2, 146], [X1 - 2, 164], [X1 - 8, 164]], h.a.blanc, true),
            h.chemin([[X1 - 14, 150], [X1 + 2, 150], [X1 + 2, 160], [X1 - 14, 160]], h.a.blanc, true),
            h.chemin([[X1 - 14, 150], [X1 + 2, 150], [X1 + 2, 160], [X1 - 14, 160]], h.a.arete, true),
            h.cercle(X1 - 5, 155, 1.5, h.a.plein),
            sol(z),
          );
          return out.join('\n');
        },
        renvois: z => {
          const cx = z.l / 2, X0 = cx - 95;
          return [
            { n: 1, rond: [22, 300], cible: [X0, 300], texte: 'ossature de perches' },
            { n: 2, rond: [22, 170], cible: [cx - 52, 172], texte: 'toile tendue sur cadre' },
            { n: 3, rond: [22, 64], cible: [X0 + 4, 67], texte: 'la face avant ouvre en porte' },
            { n: 4, rond: [z.l - 22, 240], cible: [cx + 58, 224], texte: 'claies qui se retirent' },
            { n: 5, rond: [z.l - 22, 64], cible: [cx + 49, 68], texte: 'thermomètre min-max' },
          ];
        },
      },

      // ── Coupe : de la face avant à la face arrière, le trajet de l'air ──
      coupe: {
        titre: 'En coupe : le trajet de l’air',
        dessin: z => {
          const cx = z.l / 2, yg = z.h - 16;
          const out = [];
          // poteaux avant et arrière, au-delà du plan de coupe
          for (const x of [cx - 69.5, cx + 59.5]) {
            out.push(h.rect(x, HAUT, 10, yg - HAUT, h.a.blanc), h.rect(x, HAUT, 10, yg - HAUT, h.a.contour));
          }
          out.push(
            h.rect(cx - 59.5, HAUT, 119, 10, h.a.arete),
            h.rect(cx - 59.5, BAS, 119, 10, h.a.arete),
          );
          // les claies : tasseau, longeron, baguettes coupées, truite couchée peau en dessous
          for (const L of NIV) {
            out.push(
              h.rect(cx - 59.5, L + 3, 119, 6, h.a.hachure('bois', 'detail')),
              h.rect(cx - 59.5, L + 3, 119, 6, h.a.arete),
            );
            for (let k = 0; k < 14; k++) {
              out.push(h.cercle(cx - 54 + k * 8.3, L - 1, 2.3, h.a.blanc), h.cercle(cx - 54 + k * 8.3, L - 1, 2.3, h.a.arete));
            }
            const xa = cx - 48.5, xb = cx + 48.5, S = L - 3.5;
            const chair = `M ${xa},${S} L ${xa},${S - 8} Q ${xa + 30},${S - 10} ${xa + 72},${S - 3} ` +
              `L ${xa + 84},${S - 1.5} L ${xb},${S - 1.5} L ${xb},${S} Z`;
            out.push(h.path(chair, h.a.blanc), h.path(chair, h.a.arete), h.ligne(xa, S, xb, S, h.a.contour));
          }
          // la toile, coupée, sur les quatre faces
          const bandes = [[cx - 73, HAUT - 3, 3, BAS + 13 - HAUT], [cx + 70, HAUT - 3, 3, BAS + 13 - HAUT],
            [cx - 73, HAUT - 3, 146, 3], [cx - 73, BAS + 10, 146, 3]];
          for (const [x, y, l, ht] of bandes) out.push(h.rect(x, y, l, ht, h.a.blanc), h.rect(x, y, l, ht, h.a.detail));
          // l'air : entre par l'avant, passe au-dessus et au-dessous de chaque claie, sort à l'arrière
          for (const y0 of [70, 130, 190, 247]) {
            const d = `M 12,${y0} C 40,${y0} ${cx - 60},${y0 - 5} ${cx - 25},${y0 - 3} ` +
              `S ${cx + 30},${y0 + 5} ${cx + 62},${y0} L ${z.l - 12},${y0}`;
            out.push(h.fleche(d, h.a.cache));
          }
          out.push(sol(z));
          return out.join('\n');
        },
        renvois: z => {
          const cx = z.l / 2;
          return [
            { n: 6, rond: [22, 100], cible: [34, 129], texte: 'air lent qui entre' },
            { n: 7, rond: [cx, 302], cible: [cx + 1, 252], texte: 'passe entre les claies' },
            { n: 8, rond: [z.l - 22, 100], cible: [z.l - 34, 129], texte: 'ressort par la face opposée' },
            { n: 9, rond: [z.l - 22, 212], cible: [cx + 73, 212], texte: 'toile écartée de la chair' },
            { n: 10, rond: [22, 218], cible: [cx - 48, 216], texte: 'peau sur baguettes rondes' },
          ];
        },
      },

      // ── Une claie chargée, vue de dessus ──
      claie: {
        titre: 'Une claie chargée, vue de dessus',
        dessin: z => {
          const out = [];
          // longerons, celui de gauche entaillé : une encoche par jour
          const g = [[48, 14], [56, 14], [56, 196], [48, 196]];
          for (const yc of [67.5, 55.5, 43.5, 31.5]) g.push([48, yc + 3], [52.5, yc], [48, yc - 3]);
          out.push(h.chemin(g, h.a.blanc, true), h.chemin(g, h.a.contour, true));
          out.push(h.rect(301, 14, 8, 182, h.a.blanc), h.rect(301, 14, 8, 182, h.a.contour));
          // baguettes posées sur les longerons (la ligature est au détail)
          for (let j = 0; j < 14; j++) {
            const y = 24 + j * 12;
            out.push(h.rect(42, y, 273, 3, h.a.blanc), h.rect(42, y, 273, 3, h.a.arete));
          }
          // cinq truites, un vide entre chacune
          for (let i = 0; i < 5; i++) out.push(dessus(56 + 24.5 + i * 49, 30, 144, 19));
          return out.join('\n');
        },
        renvois: z => [
          { n: 11, rond: [328, 50], cible: [296, 64], texte: 'truite en portefeuille' },
          { n: 12, rond: [253, 212], cible: [252, 99], texte: 'un vide entre chaque pièce' },
          { n: 13, rond: [328, 150], cible: [309, 150], texte: 'claie : deux fois le poisson' },
          { n: 14, rond: [22, 49], cible: [51.5, 55.5], texte: 'encoches au lieu du carnet' },
        ],
      },

      // ── Détail : une baguette liée au longeron, à la babiche ──
      ligature: {
        titre: 'Détail : la ligature',
        dessin: z => {
          const cx = z.l / 2, cy = 105, out = [];
          // longeron
          // un bois de brin : bord un peu irrégulier, chicots de branches rasées au couteau
          const brin = `M ${cx - 15},14 L ${cx + 15},14 C ${cx + 13},70 ${cx + 17},140 ${cx + 15},200 ` +
            `L ${cx - 15},200 C ${cx - 13},140 ${cx - 17},70 ${cx - 15},14 Z`;
          const brin2 = `M 20,${cy - 9} C 80,${cy - 11} 150,${cy - 7} 210,${cy - 9} L 210,${cy + 9} ` +
            `C 150,${cy + 7} 80,${cy + 11} 20,${cy + 9} Z`;
          const chicots = [[[cx + 15, 50], [cx + 20, 46], [cx + 22, 49], [cx + 15, 58]],
            [[cx - 15, 160], [cx - 21, 164], [cx - 19, 167], [cx - 15, 168]],
            [[172, cy - 8], [176, cy - 14], [179, cy - 13], [180, cy - 8]]];
          out.push(
            ...chicots.map(p => h.chemin(p, h.a.arete)),
            h.path(brin, h.a.blanc), h.path(brin, h.a.contour),
            h.ligne(cx + 8, 16, cx + 8, 198, h.a.detail),
            h.ellipse(cx, 200, 15, 5, h.a.blanc), h.ellipse(cx, 200, 15, 5, h.a.hachure('bois', 'detail')),
            h.ellipse(cx, 200, 15, 5, h.a.contour),
          );
          // baguette posée dessus
          out.push(
            h.path(brin2, h.a.blanc), h.path(brin2, h.a.contour),
            h.ligne(22, cy + 4, 208, cy + 4, h.a.detail),
            h.ellipse(20, cy, 4, 9, h.a.blanc), h.ellipse(20, cy, 4, 9, h.a.hachure('bois', 'detail')),
            h.ellipse(20, cy, 4, 9, h.a.contour),
          );
          // babiche en croix : trois tours dans un sens, trois dans l'autre
          const r = Math.SQRT1_2;
          const lanière = (ux, uy, o, demi) => {
            const px = -uy, py = ux;               // perpendiculaire
            const mx = cx + px * o, my = cy + py * o;
            return [[mx - ux * demi - px * 2.5, my - uy * demi - py * 2.5],
              [mx + ux * demi - px * 2.5, my + uy * demi - py * 2.5],
              [mx + ux * demi + px * 2.5, my + uy * demi + py * 2.5],
              [mx - ux * demi + px * 2.5, my - uy * demi + py * 2.5]];
          };
          for (const [ux, uy] of [[r, -r], [r, r]]) {
            for (const o of [-5, 0, 5]) {
              const p = lanière(ux, uy, o, 21);
              out.push(h.chemin(p, h.a.blanc, true), h.chemin(p, h.a.arete, true));
            }
          }
          // le bout de la babiche, arrêté sous le dernier tour
          const bt = [[cx + 12, cy + 16], [cx + 17, cy + 12], [cx + 40, cy + 43], [cx + 35, cy + 46]];
          out.push(h.chemin(bt, h.a.blanc, true), h.chemin(bt, h.a.arete, true));
          return out.join('\n');
        },
        renvois: z => {
          const cx = z.l / 2;
          return [
            { n: 15, rond: [z.l - 28, 50], cible: [z.l - 40, 96], texte: 'aulne, bouleau ou saule' },
            { n: 16, rond: [z.l - 28, 175], cible: [cx + 40, 147], texte: 'babiche : serre en séchant' },
          ];
        },
      },
    },
  };
};
