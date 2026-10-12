// 55-08 — Le séchoir à poisson, à l'air libre (ch. 55, section D, points 16, 19 et 21)
// Aucune cote chiffrée : le chapitre ne donne qu'une hauteur, « hors d'atteinte d'un chien
// debout ». Le chien sert donc d'échelle.

module.exports = (h) => {
  // ── le séchoir, en unités de dessin (repère X long, Y profondeur, Z haut) ──
  const L = 280, D = 120, Hc = 150, Hf = 272, Hb = 297, g = 0.88;
  const pente = (Hb - Hf) / D;
  const kx = 0.42, ky = 0.45;              // oblique : la profondeur monte vers la droite
  const rP = 5;                            // demi-largeur des perches plantées
  const yTr = 9.5;                         // traverses liées à l'extérieur des perches
  const Zp0 = Hc + 4.5, Zp1 = Hc + 10.5;   // perches à claire-voie, dessous et dessus
  const Zf = Zp1;                          // poissons posés dessus
  const Zb = (Y) => Hf + 12 + pente * Y;   // dessous du toit
  const Zt = (Y) => Zb(Y) + 6;             // dessus du toit
  const rangs = [22, 60, 98];
  const colonnes = [22, 86, 150, 214];
  const poisson = [[0, 0], [3, -7], [11, -12.5], [24, -14], [35, -11], [42, -5.5], [44, -2.5], [52, -9], [49, 0],
    [52, 9], [44, 2.5], [42, 5.5], [35, 11], [24, 14], [11, 12.5], [3, 7]];
  const f = (n) => Math.round(n * 10) / 10;
  const forme = (pts, trait) => h.chemin(pts, h.a.blanc, true) + '\n' + h.chemin(pts, trait, true);

  const G = (z) => {
    const ox = 176, oy = z.h - 12;
    const P = (X, Y, Z) => [f(ox + g * (X + Y * kx)), f(oy - g * (Z + Y * ky))];
    return { ox, oy, P };
  };

  // ── la coupe ──
  const s = 0.65;
  const C0 = (z) => {
    const gy = z.h - 14, x0 = f((z.l - (D + 32) * s) / 2 + 18 * s);
    const C = (Y, Z) => [f(x0 + Y * s), f(gy - Z * s)];
    return { gy, x0, C };
  };

  // ── le capelan ──
  const K0 = (z) => ({ cx: f(z.l / 2), py: 60 });

  return {
    ref: '59-08',
    titre: 'Le séchoir à poisson, à l’air libre',
    desc: 'Quatre perches plantées, deux traverses liées, des perches à claire-voie où les poissons ouverts sèchent en une seule couche, sous un toit d’écorce en pente ouvert des quatre côtés, plus haut qu’un chien debout. En coupe, un voile posé sur des arceaux de branche verte et refermé sous la claie ne touche pas la chair, et le vent passe sous la claie comme dessus. Le capelan sèche entier, deux poissons liés par la queue, à cheval sur une perche.',
    format: 'pleine',
    disposition: [['ensemble'], ['coupe', 'capelan']],
    hauteurs: [3, 2],
    largeurs: [[1], [3, 2]],
    vues: {
      ensemble: {
        titre: 'Le séchoir monté',
        dessin: z => {
          const { ox, oy, P } = G(z);
          const out = [];
          // le sol, au pied de chaque perche
          for (const [X, Y] of [[0, D], [L, D], [0, 0], [L, 0]]) {
            const [x, y] = P(X, Y, 0);
            out.push(h.ligne(x - 15, y, x + 15, y, h.a.detail));
            out.push(h.ligne(x - 11, y, x - 14, y - 5, h.a.detail));
            out.push(h.ligne(x + 10, y, x + 13, y - 6, h.a.detail));
          }
          const traverse = (Y) => {
            const [xa, ya] = P(-22, Y, Hc + 4.5), [xb, yb] = P(L + 22, Y, Hc - 4.5);
            return forme([[xa, ya], [xb, ya], [xb, yb], [xa, yb]], h.a.arete) + '\n' +
              h.ellipse(xb, f((ya + yb) / 2), 2.2, 4.5, h.a.detail);
          };
          const perche = (X, Y, top) => {
            const [x, yb] = P(X, Y, 0), [, yt] = P(X, Y, top);
            return forme([[x - rP, yb], [x + rP, yb], [x + rP, yt], [x - rP, yt]], h.a.contour);
          };
          out.push(traverse(D + yTr));
          out.push(perche(0, D, Hb + 6), perche(L, D, Hb + 6));
          // les perches à claire-voie, en travers des deux traverses
          for (let X = 14; X <= L - 14; X += 21) {
            out.push(forme([P(X, -16, Zp1), P(X, D + 16, Zp1), P(X, D + 16, Zp0), P(X, -16, Zp0)], h.a.arete));
          }
          // les poissons ouverts, une seule couche, espacés
          rangs.forEach((Y0, i) => colonnes.forEach((X0, j) => {
            if (i === 0 && j === 3) return;
            out.push(forme(poisson.map(([u, v]) => P(X0 + u, Y0 + v, Zf)), h.a.arete));
            out.push(h.chemin([P(X0 + 3, Y0, Zf), P(X0 + 43, Y0, Zf)], h.a.detail));
          }));
          out.push(perche(0, 0, Hf + 6), perche(L, 0, Hf + 6));
          out.push(traverse(-yTr));
          // la ligature de la traverse avant sur chaque perche
          for (const X of [0, L]) {
            const [x, y] = P(X, -yTr, Hc);
            out.push(h.chemin([[x - 9, y - 5], [x - 3, y + 5], [x - 3, y - 5], [x + 3, y + 5], [x + 3, y - 5], [x + 9, y + 5]], h.a.detail));
          }
          // le toit d'écorce
          const a = -18, b = L + 18, c = -18, d = D + 14;
          out.push(forme([P(a, c, Zt(c)), P(a, d, Zt(d)), P(b, d, Zt(d)), P(b, c, Zt(c))], h.a.arete));
          out.push(forme([P(a, c, Zt(c)), P(b, c, Zt(c)), P(b, c, Zb(c)), P(a, c, Zb(c))], h.a.arete));
          out.push(forme([P(b, c, Zt(c)), P(b, d, Zt(d)), P(b, d, Zb(d)), P(b, c, Zb(c))], h.a.arete));
          for (const X of [10, 41, 69, 101, 129, 160, 192, 221, 251, 282]) {
            out.push(h.chemin([P(X, c, Zt(c)), P(X + 3, (c + d) / 2, Zt((c + d) / 2)), P(X - 1, d, Zt(d))], h.a.detail));
          }
          out.push(h.chemin([P(a, c, Zb(c)), P(a, c, Zt(c)), P(a, d, Zt(d)), P(b, d, Zt(d)), P(b, d, Zb(d)), P(b, c, Zb(c))], h.a.contour, true));
          // le chien debout, pattes sur la perche : l'échelle
          const k = 0.8 * g, bx = ox - 5 - 54 * k, by = oy + g * 12 * ky;
          const chien = [[14, 0], [12, 5], [6, 8], [8, 24], [14, 40], [16, 52], [20, 72], [26, 90], [30, 98],
            [44, 106], [52, 110], [54, 116], [48, 118], [34, 112], [32, 118], [36, 128], [44, 134], [56, 138],
            [57, 142], [46, 146], [38, 150], [32, 153], [30, 162], [24, 152], [20, 146], [14, 128], [6, 104],
            [-2, 78], [-6, 58], [-10, 50], [-26, 34], [-30, 24], [-22, 30], [-10, 42], [-12, 32], [-10, 18],
            [-8, 6], [-8, 0]];
          out.push(forme(chien.map(([u, v]) => [f(bx + u * k), f(by - v * k)]), h.a.arete));
          out.push(h.cercle(f(bx + 42 * k), f(by - 145 * k), 1.4, h.a.plein));
          out.push(h.ligne(f(bx - 24), f(by), f(bx + 24), f(by), h.a.detail));
          return out.join('\n');
        },
        renvois: z => {
          const { oy, P } = G(z);
          const [xp] = P(L, 0, 0), [xq] = P(L, D, 0);
          const tr = P(L + 16, -yTr, Hc - 4.5);
          const yGap = f((P(0, -18, Zb(-18))[1] + P(0, D + 16, Zp1)[1]) / 2);
          return [
            { n: 1, rond: [z.l - 42, oy - 15], cible: [xp + rP, oy - 15], texte: 'perche plantée, fourche en tête' },
            { n: 2, rond: [f((xp + xq) / 2), tr[1] + 32], cible: tr, texte: 'traverse liée, hors d’atteinte du chien' },
            { n: 3, rond: [262, yGap], cible: P(56, D + 16, Zp1), texte: 'perches à claire-voie, en travers' },
            { n: 4, rond: [125, 45], cible: P(-18, 60, Zt(60)), texte: 'toit d’écorce en pente, côtés ouverts' },
            { n: 5, rond: [350, yGap], cible: P(150 + 26, 98 + 14, Zf), texte: 'poissons ouverts, une seule couche' },
          ];
        },
      },
      coupe: {
        titre: 'En coupe, le voile sur arceaux',
        dessin: z => {
          const { gy, C } = C0(z);
          const out = [];
          out.push(h.rect(12, gy, z.l - 24, 9, h.a.hachure('terre', 'fin')));
          out.push(h.ligne(12, gy, z.l - 12, gy, h.a.arete));
          const perche = (Yp, T) => forme([[Yp - 5, -8], [Yp - 5, T - 3], [Yp - 11, T + 9], [Yp - 7, T + 11],
            [Yp, T + 1], [Yp + 7, T + 11], [Yp + 11, T + 9], [Yp + 5, T - 3], [Yp + 5, -8]].map(([Y, Z]) => C(Y, Z)), h.a.contour);
          out.push(perche(0, Hf), perche(D, Hb));
          // les deux sablières dans les fourches, le toit dessus
          for (const [Yp, T] of [[0, Hf], [D, Hb]]) {
            const [x, y] = C(Yp, T + 7);
            out.push(h.cercle(x, y, f(5 * s), h.a.blanc), h.cercle(x, y, f(5 * s), h.a.arete));
          }
          out.push(h.chemin([C(-18, Zb(-18)), C(D + 14, Zb(D + 14)), C(D + 14, Zt(D + 14)), C(-18, Zt(-18))], h.a.hachure('bois', 'contour'), true));
          // les traverses et la perche de claie
          for (const Y of [-yTr, D + yTr]) {
            const [x, y] = C(Y, Hc);
            out.push(h.cercle(x, y, f(4.5 * s), h.a.blanc), h.cercle(x, y, f(4.5 * s), h.a.arete));
          }
          out.push(forme([C(-16, Zp0), C(D + 16, Zp0), C(D + 16, Zp1), C(-16, Zp1)], h.a.arete));
          // les poissons en travers, une seule couche
          for (const Y of rangs) {
            out.push(h.chemin([C(Y - 14, Zf), C(Y + 14, Zf), C(Y + 13, Zf + 3.5), C(Y + 3, Zf + 6), C(Y - 8, Zf + 5.5), C(Y - 14, Zf + 2)], h.a.plein, true));
          }
          // l'arceau vu au-delà, le voile coupé entre deux arceaux
          const [a0, a1] = C(-yTr, Zp0), [ac0, ac1] = C(D / 2, Hc + 85), [a2, a3] = C(D + yTr, Zp0);
          out.push(h.path(`M ${a0} ${a1} Q ${ac0} ${ac1} ${a2} ${a3}`, h.a.arete));
          // le voile descend en dehors des bouts de perches et se referme sous les traverses :
          // ouvert dessous, la mouche monterait entre les perches de la claie
          const v = [C(-21, Hc - 10), C(-21, Hc + 10), C(D / 2, Hc + 72), C(D + 21, Hc + 10), C(D + 21, Hc - 10)];
          out.push(h.path(`M ${v[0][0]} ${v[0][1]} L ${v[1][0]} ${v[1][1]} Q ${v[2][0]} ${v[2][1]} ${v[3][0]} ${v[3][1]} L ${v[4][0]} ${v[4][1]} Z`, h.a.detail));
          // le vent : dessous comme dessus
          const yb = C(0, 85)[1], yh = C(0, 222)[1];
          out.push(h.fleche(`M 16 ${yb} L ${z.l - 16} ${yb}`, h.a.cache));
          out.push(h.fleche(`M 16 ${yh} L ${z.l - 16} ${yh}`, h.a.cache));
          return out.join('\n');
        },
        renvois: z => {
          const { C } = C0(z);
          const t = 0.55, Ya = -yTr * (1 - t) ** 2 + 2 * (D / 2) * t * (1 - t) + (D + yTr) * t * t;
          const Za = Zp0 * (1 - t) ** 2 + 2 * (Hc + 85) * t * (1 - t) + Zp0 * t * t;
          const yb = C(0, 85)[1];
          return [
            { n: 6, rond: [195, 48], cible: C(Ya, Za), texte: 'arceau de branche verte pliée' },
            { n: 7, rond: [70, 150], cible: C(-21, Hc - 3), texte: 'voile tendu, sans toucher la chair' },
            { n: 8, rond: [178, 193], cible: [178, yb + 1], texte: 'le vent passe aussi dessous' },
          ];
        },
      },
      capelan: {
        titre: 'Le capelan, entier',
        dessin: z => {
          const { cx, py } = K0(z);
          const out = [];
          const M = (sg) => ([x, y]) => [f(cx + sg * x), f(py + y)];
          // la perche, vue par le bout
          out.push(h.cercle(cx, py, 13, h.a.hachure('bois')));
          const xL = 17;                     // axe du poisson, depuis l'axe de la perche
          const larg = [[0, 3], [18, 6], [45, 10], [75, 11], [105, 9.5], [130, 6], [143, 3], [150, 0]];
          for (const sg of [-1, 1]) {
            const m = M(sg);
            const dehors = [[-3, -21], [-9, -20.5], [-14.5, -17], [-18.5, -11], [-20, -3], [-20, 8]];
            const corps1 = larg.map(([ly, w]) => [-(xL + w), 8 + ly]);
            const corps2 = larg.slice().reverse().map(([ly, w]) => [-(xL - w), 8 + ly]);
            const dedans = [[-14, 8], [-14, -1], [-12.5, -7.5], [-9, -12], [-3, -15]];
            out.push(forme([...dehors, ...corps1, ...corps2, ...dedans].map(m), h.a.arete));
            // la nageoire du dos, l'œil, l'ouïe, la ligne latérale
            out.push(forme([[-(xL + 10.5), 55], [-(xL + 17), 64], [-(xL + 11), 76]].map(m), h.a.detail));
            out.push(h.cercle(...m([-xL, 140]), 2.2, h.a.plein));
            out.push(h.path(`M ${m([-(xL + 8), 124]).join(' ')} Q ${m([-xL, 130]).join(' ')} ${m([-(xL - 8), 124]).join(' ')}`, h.a.detail));
            out.push(h.chemin([m([-xL, 20]), m([-xL, 118])], h.a.detail));
            // la queue, qui dépasse du lien
            out.push(forme([[-1, -22], [-4, -23], [-13, -41], [-7.5, -36], [-2, -44], [0, -23]].map(m), h.a.arete));
          }
          // le lien : trois tours de ficelle sur les deux queues
          for (const dy of [-27, -23.5, -20]) out.push(h.rect(cx - 5.5, py + dy, 11, 2.2, h.a.plein));
          return out.join('\n');
        },
        renvois: z => {
          const { cx, py } = K0(z);
          return [
            { n: 9, rond: [cx + 50, py - 30], cible: [cx + 6, py - 24], texte: 'paire liée par la queue' },
          ];
        },
      },
    },
  };
};
