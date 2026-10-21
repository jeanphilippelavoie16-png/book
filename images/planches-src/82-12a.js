// Planche 82-12a — L'abri ouvert, le feu long et le mur réflecteur (chapitre 16, « Sortir et
// tenir la nuit » ; aussi ch. 22). Suite en 16-12b : le plancher et les roches chaudes.
// Aucune cote : le chapitre ne donne aucune dimension. L'échelle est portée par les objets
// connus (les sacs de couchage, les billes).
//
// Repère des deux vues, en cm de modèle (jamais imprimés), à la même échelle ECH :
//   x : de l'arrière de la tranchée (0) vers le feu ; le mur de billes s'appuie à x = 380
//   coupe : y vers le haut, sol à 0, dessus de la neige à 100
//   plan  : y le long du feu, la tranchée de 0 à 300 (plus large que longue)
//
// La charte : en coupe, le bout de la tranchée, vu par la coupe, en gris loin : les sacs, les
// billes et le plancher restent blancs devant. Le plan reste sans gris. Pas de rouge : aucun geste
// ni point à contrôler (les flèches de chaleur restent noires).

const ECH = 1.1;   // px par cm de modèle, commun à la coupe et au plan

module.exports = (h) => {
  const W = t => h.a[t].replace('fill="none"', 'fill="#ffffff"');   // trait sur aplat blanc
  const f = v => +v.toFixed(1);

  // ── courbes : quadratique, dérivée, aiguilles de sapin le long d'une tige
  const q = (a, b, c, t) => [(1 - t) * (1 - t) * a[0] + 2 * (1 - t) * t * b[0] + t * t * c[0],
    (1 - t) * (1 - t) * a[1] + 2 * (1 - t) * t * b[1] + t * t * c[1]];
  const dq = (a, b, c, t) => [2 * (1 - t) * (b[0] - a[0]) + 2 * t * (c[0] - b[0]),
    2 * (1 - t) * (b[1] - a[1]) + 2 * t * (c[1] - b[1])];
  const aiguilles = (a, b, c, lg, n, bombe = false) => {
    let d = '';
    for (let i = 1; i < n; i++) {
      const t = i / n, p = q(a, b, c, t), v = dq(a, b, c, t), L = Math.hypot(v[0], v[1]);
      const ux = v[0] / L, uy = v[1] / L, nx = -uy, ny = ux;
      const l = bombe ? lg * (0.35 + 2.6 * t * (1 - t)) : lg;
      d += `M${f(p[0])} ${f(p[1])}l${f((ux * 0.55 + nx * 0.85) * l)} ${f((uy * 0.55 + ny * 0.85) * l)}`;
      d += `M${f(p[0])} ${f(p[1])}l${f((ux * 0.55 - nx * 0.85) * l)} ${f((uy * 0.55 - ny * 0.85) * l)}`;
    }
    return h.path(d, h.a.fin);
  };
  // branche de sapin vue de côté, posée courbe vers le haut : pied B, pointe T, bosse r (px)
  const brancheCote = (B, T, r, ep, trait = 'arete') => {
    const C = [(B[0] + T[0]) / 2 - (T[0] - B[0]) * 0.06, Math.min(B[1], T[1]) - 2 * r];
    const Cu = [C[0], C[1] - ep], Cl = [C[0], C[1] + ep];
    return [
      h.path(`M${f(B[0])} ${f(B[1])}Q${f(Cu[0])} ${f(Cu[1])} ${f(T[0])} ${f(T[1])}`
        + `Q${f(Cl[0])} ${f(Cl[1])} ${f(B[0])} ${f(B[1])}Z`, W(trait)),
      h.path(`M${f(B[0])} ${f(B[1])}Q${f(C[0])} ${f(C[1])} ${f(T[0])} ${f(T[1])}`, h.a.detail),
      aiguilles(B, C, T, ep * 0.42, 9),
    ].join('\n');
  };
  // branche de sapin vue de dessus : pied B, pointe T, demi-largeur w (px). Une tige, trois paires
  // de rameaux, des aiguilles ; l'aplat blanc dessous cache le rang d'en dessous.
  const brancheDessus = (B, T, w, trait = 'detail') => {
    const dx = T[0] - B[0], dy = T[1] - B[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux;
    const M = [(B[0] + T[0]) / 2, (B[1] + T[1]) / 2];
    const out = [h.path(`M${f(B[0])} ${f(B[1])}Q${f(M[0] + nx * 2.1 * w)} ${f(M[1] + ny * 2.1 * w)} ${f(T[0])} ${f(T[1])}`
      + `Q${f(M[0] - nx * 2.1 * w)} ${f(M[1] - ny * 2.1 * w)} ${f(B[0])} ${f(B[1])}Z`, h.a.blanc)];
    let d = `M${f(B[0])} ${f(B[1])}L${f(T[0])} ${f(T[1])}`;
    const aig = [];
    [0.14, 0.28, 0.42, 0.56, 0.7].forEach(t => [1, -1].forEach(sg => {
      const p = [B[0] + dx * t, B[1] + dy * t], l = w * 1.35 * (1 - t * 0.6);
      const e = [p[0] + (ux * 0.72 + sg * nx * 0.7) * l, p[1] + (uy * 0.72 + sg * ny * 0.7) * l];
      d += `M${f(p[0])} ${f(p[1])}L${f(e[0])} ${f(e[1])}`;
      aig.push(aiguilles(p, [(p[0] + e[0]) / 2, (p[1] + e[1]) / 2], e, w * 0.3, 6));
    }));
    out.push(h.path(d, h.a[trait]));
    out.push(aiguilles(B, M, T, w * 0.34, 18));
    return out.concat(aig).join('\n');
  };
  // flamme : base au centre cx, largeur l, hauteur ht (px, y vers le bas)
  const flamme = (cx, yb, l, ht, pen = 0.15) => h.path(
    `M${f(cx - l / 2)} ${f(yb)}C${f(cx - l / 2)} ${f(yb - ht * 0.5)} ${f(cx - l * pen)} ${f(yb - ht * 0.7)} `
    + `${f(cx + l * pen)} ${f(yb - ht)}C${f(cx + l * 0.05)} ${f(yb - ht * 0.6)} ${f(cx + l / 2)} ${f(yb - ht * 0.45)} `
    + `${f(cx + l / 2)} ${f(yb)}`, h.a.detail);
  // bout de bille coupé : cercle, cerne, cœur
  const bout = (cx, cy, r) => [
    h.cercle(cx, cy, r, W('arete')),
    h.cercle(cx, cy, r * 0.6, h.a.fin),
    h.cercle(cx, cy, Math.max(r * 0.12, 0.8), h.a.plein),
  ].join('\n');
  // rectangle arrondi (sac de couchage vu de dessus)
  const arrondi = (x, y, l, ht, r, at) => h.path(
    `M${f(x + r)} ${f(y)}H${f(x + l - r)}Q${f(x + l)} ${f(y)} ${f(x + l)} ${f(y + r)}V${f(y + ht - r)}`
    + `Q${f(x + l)} ${f(y + ht)} ${f(x + l - r)} ${f(y + ht)}H${f(x + r)}Q${f(x)} ${f(y + ht)} ${f(x)} ${f(y + ht - r)}`
    + `V${f(y + r)}Q${f(x)} ${f(y)} ${f(x + r)} ${f(y)}Z`, at);

  // ── repères : la coupe et le plan à la même échelle, le plan sous la coupe
  const S = z => Math.min(ECH, (z.l - 16) / 490);
  const gCoupe = z => {
    const s = Math.min(S(z), (z.h - 50) / 143);
    const x0 = (z.l - 490 * s) / 2 + 50 * s, yT = 28 + ((z.h - 50) - 143 * s) / 2;
    return { s, X: x => x0 + x * s, Y: y => yT + (125 - y) * s };
  };
  const gPlan = z => {
    const s = Math.min(S(z), (z.h - 8) / 348);
    const x0 = (z.l - 490 * s) / 2 + 50 * s, y0 = (z.h - 348 * s) / 2 + 24 * s;
    return { s, X: x => x0 + x * s, Y: y => y0 + y * s };
  };

  // perches du toit, en travers : x
  const perchesX = Array.from({ length: 12 }, (_, i) => -8 + 20 * i);
  // fin des perches dans le plan, là où le toit est arraché
  const finPerche = [128, 136, 131, 140, 126, 134, 129, 138, 132, 127, 137, 130];

  return {
    ref: '82-12a',
    titre: 'L’abri ouvert, le feu long et le mur réflecteur',
    desc: 'En coupe, une tranchée creusée dans la neige jusqu’au sol, couverte de perches en travers, '
      + 'de branches et d’une bâche ; sur le sol, un plancher de branches de sapin baumier sous quatre sacs '
      + 'de couchage. Devant le côté ouvert, le feu long ; derrière le feu, un mur de billes vertes empilées '
      + 'contre la neige renvoie la chaleur vers l’abri. Vu de dessus, à la même échelle, les perches posées '
      + 'd’un bout à l’autre de la tranchée, les sacs couchés le long du feu, les billes du feu bout à bout '
      + 'sur toute l’ouverture.',
    format: 'pleine',
    disposition: [['coupe'], ['plan']],
    hauteurs: [1, 1.84],
    vues: {
      coupe: {
        titre: 'En coupe, en travers du feu',
        dessin: z => {
          const { s, X, Y } = gCoupe(z);
          const R = (x1, y1, x2, y2, a) => h.rect(X(x1), Y(y2), (x2 - x1) * s, (y2 - y1) * s, a);
          const out = [
            R(-50, -18, 440, 0, h.a.hachure('terre', 'aucun')),
            R(-50, 0, 0, 100, h.a.hachure('neige', 'aucun')),
            // le fond de la tranchée taillé en pente : les billes s'y couchent au lieu de rouler au feu
            h.chemin([[X(380), Y(0)], [X(440), Y(0)], [X(440), Y(100)], [X(394), Y(100)]],
              h.a.hachure('neige', 'aucun'), true),
            // le bout de la tranchée, la neige d'en face, vu par la coupe
            h.chemin([[X(0), Y(0)], [X(380), Y(0)], [X(394), Y(100)], [X(0), Y(100)]], h.a.loin, true),
          ];
          // le plancher de branches, posé de l'avant vers l'arrière
          for (let xb = 190; xb >= 0; xb -= 19) {
            out.push(brancheCote([X(xb), Y(1)], [X(xb + 42), Y(3)], 8 * s, 5 * s, 'detail'));
          }
          // les sacs de couchage, coupés en travers
          [[33, 28, 15], [92, 20, 12], [140, 20, 12], [198, 28, 15]].forEach(([cx, rx, ry]) => {
            out.push(h.ellipse(X(cx), Y(17 + ry), rx * s, ry * s, W('arete')));
            out.push(h.ellipse(X(cx), Y(17 + ry), rx * s * 0.55, ry * s * 0.45, h.a.fin));
          });
          // le toit : perches en travers, branches, bâche
          for (let xb = 200; xb >= -22; xb -= 22) {
            out.push(brancheCote([X(xb), Y(110)], [X(xb + 44), Y(111)], 3.2 * s, 3.6 * s, 'detail'));
          }
          perchesX.forEach(x => out.push(h.cercle(X(x), Y(105), 5 * s, W('arete'))));
          out.push(h.chemin([[X(-46), Y(100.6)], [X(-24), Y(121)], [X(234), Y(121.5)], [X(239), Y(108)]], h.a.arete));
          // profil de coupe de la neige et du sol
          out.push(h.chemin([[X(-50), Y(100)], [X(0), Y(100)], [X(0), Y(0)], [X(380), Y(0)], [X(394), Y(100)],
            [X(440), Y(100)]], h.a.contour));
          // le feu long, billes coupées en travers
          out.push(flamme(X(281), Y(30), 16 * s, 26 * s));
          out.push(flamme(X(296), Y(33), 20 * s, 34 * s, -0.12));
          out.push(flamme(X(309), Y(30), 14 * s, 22 * s));
          out.push(bout(X(282), Y(9), 9 * s));
          out.push(bout(X(301), Y(9), 9 * s));
          out.push(bout(X(291.5), Y(25), 9 * s));
          // le mur de billes vertes, couchées contre la neige en pente : chacune pousse vers le mur
          [11, 33, 55, 77, 99].forEach(y => out.push(bout(X(369 + 0.14 * y), Y(y), 11 * s)));
          // la chaleur : directe, et renvoyée par le mur
          out.push(h.fleche(`M${f(X(270))} ${f(Y(44))}L${f(X(229))} ${f(Y(60))}`));
          out.push(h.fleche(`M${f(X(318))} ${f(Y(46))}L${f(X(350))} ${f(Y(58))}`));
          out.push(h.fleche(`M${f(X(352))} ${f(Y(80))}Q${f(X(296))} ${f(Y(98))} ${f(X(232))} ${f(Y(82))}`));
          return out.join('\n');
        },
        renvois: z => {
          const { X, Y } = gCoupe(z);
          return [
            { n: 1, rond: [X(-28), Y(58)], cible: [X(0), Y(58)], texte: 'tranchée creusée jusqu’au sol' },
            { n: 2, rond: [X(110), 12], cible: [X(110), Y(119)], texte: 'perches en travers, branches, bâche' },
            { n: 3, rond: [X(66), z.h - 11], cible: [X(66), Y(7)], texte: 'plancher de sapin baumier serré' },
            { n: 4, rond: [X(296), 12], cible: [X(296), Y(64)], texte: 'feu long, devant le côté ouvert' },
            { n: 5, rond: [X(405), 12], cible: [X(379), Y(105)], texte: 'mur de billes vertes ou de neige tassée' },
          ];
        },
      },

      plan: {
        titre: 'Vu de dessus, le toit arraché',
        dessin: z => {
          const { s, X, Y } = gPlan(z);
          const R = (x1, y1, x2, y2, a) => h.rect(X(x1), Y(y1), (x2 - x1) * s, (y2 - y1) * s, a);
          // écorce d'une bille vue de dessus : des traits courts, décalés, dans le sens du bois
          const ecorce = (x1, y1, x2, y2) => {
            let d = '';
            const lg = x2 - x1;
            for (let k = 0, y = y1 + lg * 0.6; y < y2 - lg * 0.8; k++, y += 9 + (k * 5) % 7) {
              const x = x1 + lg * (0.25 + 0.5 * (((k * 3) % 5) / 4));
              d += 'M' + f(X(x)) + ' ' + f(Y(y)) + 'v' + f((6 + (k * 7) % 5) * s);
            }
            return h.path(d, h.a.fin);
          };
          const out = [
            R(-50, -24, 440, 324, h.a.hachure('neige', 'aucun')),
            R(0, 0, 394, 300, h.a.blanc),
          ];
          // le plancher de branches, rangs posés de l'avant vers l'arrière
          for (let xb = 182; xb >= 0; xb -= 26) {
            for (let yc = 8; yc <= 292; yc += 18) {
              const d = ((xb * 7 + yc * 3) % 9) - 4;
              out.push(brancheDessus([X(xb), Y(yc)], [X(xb + 48), Y(yc + d)], 8.5 * s, 'fin'));
            }
          }
          // les sacs, couchés le long du feu, la tête vers le bas
          [[7, 52, 40, 262], [73, 38, 70, 232], [121, 38, 70, 232], [172, 52, 40, 262]].forEach(([x, l, y1, y2]) => {
            out.push(arrondi(X(x), Y(y1), l * s, (y2 - y1) * s, 12 * s, W('arete')));
            out.push(h.ellipse(X(x + l / 2), Y(y2 - 20), l * s * 0.28, 9 * s, h.a.detail));
          });
          // les perches du toit, posées sur les deux bouts de la tranchée, arrachées
          perchesX.forEach((x, i) => {
            out.push(R(x - 5, -16, x + 5, finPerche[i], W('arete')));
            out.push(h.chemin([[X(x - 5), Y(finPerche[i])], [X(x - 1.5), Y(finPerche[i] + 3)],
              [X(x + 1.5), Y(finPerche[i] - 3)], [X(x + 5), Y(finPerche[i])]], h.a.fin));
          });
          // le feu long : deux rangs de billes bout à bout, un troisième par-dessus
          [[276, 292, [[6, 100], [103, 197], [200, 294]]],
            [295, 311, [[14, 108], [111, 205], [208, 292]]],
            [285.5, 301.5, [[30, 142], [146, 268]]]].forEach(([x1, x2, billes]) => {
            billes.forEach(([y1, y2]) => {
              out.push(arrondi(X(x1), Y(y1), (x2 - x1) * s, (y2 - y1) * s, (x2 - x1) * s / 2, W('arete')));
              out.push(ecorce(x1, y1, x2, y2));
            });
          });
          // le mur réflecteur : les billes couchées en pente, chaque rang un peu en retrait du dessous
          [11, 33, 55, 77, 99].forEach((yc, k) => {
            const x1 = 358 + 0.14 * yc;
            [[2, 150], [150, 298]].forEach(([y1, y2]) => {
              out.push(arrondi(X(x1), Y(y1), 22 * s, (y2 - y1) * s, 11 * s, W('arete')));
              if (k === 4) out.push(ecorce(x1, y1, x1 + 22, y2));
            });
          });
          out.push(R(0, 0, 394, 300, h.a.contour));
          return out.join('\n');
        },
        renvois: z => {
          const { X, Y } = gPlan(z);
          return [
            { n: 6, rond: [X(-30), Y(-8)], cible: [X(-8), Y(-8)], texte: 'perches posées sur les deux bouts' },
            { n: 7, rond: [X(-30), Y(205)], cible: [X(24), Y(205)], texte: 'sacs couchés le long du feu' },
            { n: 8, rond: [X(293), Y(313)], cible: [X(293), Y(286)], texte: 'billes bout à bout sur toute l’ouverture' },
          ];
        },
      },
    },
  };
};
