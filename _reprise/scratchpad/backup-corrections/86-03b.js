// 86-03b — L'éolienne de fortune : lever le mât, freiner le rotor (chapitre 86, section D)
// Repères en unités de dessin, y vers le haut ; proportions seulement, aucune cote tirée de là.
// Mêmes proportions qu'en 86-03a : mât 10, collier des haubans à 8,1, bras de levage 3,6.

const cadre = (z, bb, m = [16, 10, 16, 10]) => {
  const [x0, x1, y0, y1] = bb;
  const lu = z.l - m[0] - m[2], hu = z.h - m[1] - m[3];
  const s = Math.min(lu / (x1 - x0), hu / (y1 - y0));
  const ox = m[0] + (lu - (x1 - x0) * s) / 2, oy = m[1] + (hu - (y1 - y0) * s) / 2;
  const T = (x, y) => [ox + (x - x0) * s, oy + (y1 - y) * s];
  T.s = s;
  return T;
};

// ── levée : charnière au pied, mât couché le bout sur un chevalet ──
const HC = [0, 0.55], AL = Math.atan2(1.05, 10), U = [-Math.cos(AL), Math.sin(AL)], N = [Math.sin(AL), Math.cos(AL)];
const M = d => [HC[0] + d * U[0], HC[1] + d * U[1]];
const GP = 3.6, HG = 8.1, RR = 1.4;
const GT = [HC[0] + GP * N[0], HC[1] + GP * N[1]];
const WX = 7.0, AX = -5.0;
const repL = z => cadre(z, [-11.8, 7.8, -0.5, 10.9], [12, 6, 12, 4]);
const repPl = z => cadre(z, [-10.8, 7.6, -5.6, 5.6], [10, 8, 10, 8]);
const repPi = z => cadre(z, [-2.4, 5.4, -1.5, 6.6], [12, 8, 8, 8]);
const repF = z => cadre(z, [-0.2, 11.2, -1.4, 9.6], [8, 6, 8, 6]);

module.exports = (h) => {
  const BLANC = h.a.arete.replace('fill="none"', 'fill="#FFFFFF"');
  const BLANCD = h.a.detail.replace('fill="none"', 'fill="#FFFFFF"');
  const AXE = h.a.fin + ' stroke-dasharray="8 3 1.5 3"';
  const f = n => n.toFixed(1);
  const pts = (T, l) => l.map(q => T(...q));
  const poly = (T, l, a, ferme = true) => h.chemin(pts(T, l), a, ferme);
  const rct = (T, x0, y0, x1, y1, a) => poly(T, [[x0, y0], [x1, y0], [x1, y1], [x0, y1]], a);
  const seg = (T, a, b, at = h.a.arete) => h.ligne(...T(...a), ...T(...b), at);
  const d = (T, l) => 'M ' + l.map(q => T(...q).map(f).join(' ')).join(' L ');
  const arc = (c, r, a0, a1, n = 40) => { const o = []; for (let i = 0; i <= n; i++) { const a = a0 + (a1 - a0) * i / n; o.push([c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)]); } return o; };
  const brisure = (T, a, b, amp) => {
    const o = [];
    for (let i = 0; i <= 16; i++) { const t = i / 16, w = amp * Math.sin(2 * Math.PI * t); o.push([a[0] + (b[0] - a[0]) * t + w, a[1] + (b[1] - a[1]) * t + w]); }
    return poly(T, o, h.a.detail, false);
  };
  // une barre d'épaisseur e de a à b
  const barre = (T, a, b, e, at) => {
    const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), nx = -dy / L * e / 2, ny = dx / L * e / 2;
    return poly(T, [[a[0] + nx, a[1] + ny], [b[0] + nx, b[1] + ny], [b[0] - nx, b[1] - ny], [a[0] - nx, a[1] - ny]], at);
  };

  return {
    ref: '86-03b',
    titre: 'L’éolienne de fortune : lever le mât, freiner le rotor',
    desc: 'Suite de la 86-03a. En haut, la levée de profil : mât couché, le bout posé sur un chevalet, tête et pales montées au sol ; bras de levage fixé d’équerre au pied du mât, câble du bout du bras au collier des haubans, corde du bout du bras au treuil ancré ; hauban arrière attaché d’avance et lâche au sol. En tireté, le mât debout : le bras est couché, le hauban arrière tendu l’arrête à la verticale. En bas à gauche, les ancrages vus de dessus : les haubans de côté sont ancrés sur l’axe de la charnière, ce qui les garde tendus toute la levée. Au milieu, la charnière au pied : deux oreilles de plat d’acier boulonnées de part et d’autre d’une semelle de bois, boulon de charnière au-dessus du bout du mât, bras de levage soudé au mât avec un gousset. À droite, l’interrupteur de freinage fait sur une planche : une lame pivote sur un boulon, relie le fil du moteur au plot de la ligne en marche, et au plot du pont en frein ; les deux plots étant opposés, la lame quitte la ligne avant de toucher le pont. Encadré danger : un mât qui bascule tombe sur toute sa hauteur, et un interrupteur qui relierait les fils avant de couper la batterie met la batterie en court-circuit.',
    format: 'pleine',
    disposition: [['lever'], ['plan', 'pied', 'frein']],
    hauteurs: [3, 2],
    largeurs: [[1], [6, 4, 5]],
    vues: {
      lever: {
        titre: 'Lever le mât sans grimper',
        dessin: z => {
          const T = repL(z), o = [];
          o.push(rct(T, -11.8, -0.45, 7.8, 0, h.a.hachure('terre', 'fin')));
          o.push(seg(T, [-11.8, 0], [7.8, 0], h.a.arete));
          // ancrages
          for (const x of [AX, GP + 0.5]) o.push(seg(T, [x, 0.12], [x, -0.4], h.a.arete));
          // le mât debout, en tireté
          o.push(rct(T, -0.08, 0.55, 0.08, 10.55, h.a.cache));
          o.push(rct(T, 0.08, 0.48, GP, 0.62, h.a.cache));
          o.push(seg(T, [GP, 0.62], [0.08, HG + 0.55], h.a.cache));
          o.push(seg(T, [-0.08, HG + 0.55], [AX, 0.1], h.a.cache));
          // semelle et charnière
          o.push(rct(T, -0.5, 0, 0.5, 0.22, BLANCD));
          o.push(poly(T, [[-0.18, 0.22], [0.18, 0.22], [0.14, 0.75], [-0.14, 0.75]], BLANCD));
          // chevalet sous le mât
          const cv = M(8.95);
          o.push(h.chemin(pts(T, [[cv[0] - 0.4, 0], [cv[0], cv[1] - 0.08], [cv[0] + 0.4, 0]]), h.a.arete));
          o.push(seg(T, [cv[0] - 0.24, 0.55], [cv[0] + 0.24, 0.55], h.a.detail));
          // hauban arrière, attaché d'avance, lâche au sol
          const col = M(HG);
          const lache = [col, [col[0] + 0.3, 0.5], [col[0] + 0.45, 0.06]];
          for (let i = 1; i <= 12; i++) lache.push([col[0] + 0.45 + (AX - col[0] - 0.45) * i / 12, 0.06 + (i % 2 ? 0.16 : 0)]);
          o.push(poly(T, lache, h.a.fin, false));
          // mât couché
          o.push(barre(T, HC, M(10), 0.16, BLANC));
          o.push(barre(T, M(HG - 0.08), M(HG + 0.08), 0.28, h.a.plein));
          // bras de levage d'équerre au pied
          o.push(barre(T, HC, GT, 0.14, BLANC));
          o.push(h.cercle(...T(...HC), 1.8, h.a.plein));
          // câble du bras au collier, corde du bras au treuil
          o.push(seg(T, GT, col, h.a.detail));
          o.push(seg(T, GT, [WX - 0.2, 0.62], h.a.detail));
          // treuil sur son pieu
          o.push(seg(T, [WX, 0.9], [WX, -0.4], h.a.arete));
          o.push(h.cercle(...T(WX, 0.55), 0.26 * T.s, BLANC));
          o.push(h.chemin(pts(T, [[WX, 0.55], [WX + 0.45, 0.85], [WX + 0.45, 1.05]]), h.a.arete));
          // tête au bout du mât : manchon, moteur vu en bout, rotor de face, pales liées
          const tp = M(10), hb = M(10.27);
          o.push(barre(T, M(9.5), M(10.08), 0.26, BLANCD));
          o.push(h.cercle(...T(...hb), 0.22 * T.s, BLANC));
          for (let k = 0; k < 3; k++) {
            const th = Math.PI - AL + k * 2 * Math.PI / 3, u = [Math.cos(th), Math.sin(th)], v = [-Math.sin(th), Math.cos(th)];
            const Q = (a, b) => [hb[0] + a * u[0] + b * v[0], hb[1] + a * u[1] + b * v[1]];
            o.push(poly(T, [Q(0.1, 0), Q(RR, 0), Q(RR, 0.07), Q(0.45, 0.22), Q(0.1, 0.22)], BLANCD));
          }
          o.push(h.cercle(...T(...hb), 0.12 * T.s, BLANCD));
          // le mouvement
          o.push(h.fleche(d(T, arc(HC, 9.3, Math.PI - 0.2, Math.PI / 2 + 0.2)), h.a.arete));
          void tp;
          return o.join('\n');
        },
        renvois: z => {
          const T = repL(z), col = T(...M(HG)), g = M(GP * 0.55);
          const a = T(...M(9.7)), b = T(HC[0] + GP * 0.6 * N[0], HC[1] + GP * 0.6 * N[1]);
          const c = T(GT[0] + (M(HG)[0] - GT[0]) * 0.45, GT[1] + (M(HG)[1] - GT[1]) * 0.45);
          const w = T(WX, 0.55), e = T(-6.2, 0.14);
          void g;
          return [
            { n: 1, rond: [a[0] - 6, a[1] - 60], cible: a, texte: 'tête montée, mât couché' },
            { n: 2, rond: [b[0] + 44, b[1] - 10], cible: b, texte: 'bras de levage d’équerre' },
            { n: 3, rond: [c[0] + 10, c[1] - 44], cible: c, texte: 'câble du bras au collier' },
            { n: 4, rond: [w[0] + 6, w[1] - 50], cible: w, texte: 'treuil ou véhicule, ancré' },
            { n: 5, rond: [e[0] + 20, e[1] - 50], cible: e, texte: 'hauban arrière, déjà attaché' },
          ];
        },
      },

      plan: {
        titre: 'Les ancrages, vus de dessus',
        dessin: z => {
          const P = repPl(z), o = [];
          o.push(seg(P, [0, -5.6], [0, 5.6], AXE));
          o.push(seg(P, [-8.1, 0], [0, 4.9], h.a.detail), seg(P, [-8.1, 0], [0, -4.9], h.a.detail));
          o.push(seg(P, [0.3, 0], [WX, 0], h.a.detail));
          o.push(rct(P, -10, -0.14, 0, 0.14, BLANC));
          o.push(rct(P, -10.6, -0.3, -9.7, 0.3, BLANCD));
          o.push(rct(P, -0.2, -0.3, 0.45, 0.3, BLANCD));
          for (const q of [[0, 5], [0, -5], [AX, 0], [GP + 0.5, 0], [WX, 0]]) o.push(h.cercle(...P(...q), 3, h.a.plein));
          return o.join('\n');
        },
        renvois: z => {
          const P = repPl(z), a = P(0, -3.2), b = P(-4.05, 2.45);
          return [
            { n: 6, rond: [a[0] + 30, a[1] + 6], cible: a, texte: 'axe de la charnière' },
            { n: 7, rond: [b[0] - 10, b[1] - 30], cible: b, texte: 'haubans de côté sur cet axe' },
          ];
        },
      },

      pied: {
        titre: 'La charnière au pied',
        dessin: z => {
          const P = repPi(z), o = [];
          o.push(rct(P, -2.4, -1.5, 5.4, -0.55, h.a.hachure('terre', 'fin')));
          o.push(seg(P, [-2.4, -0.55], [5.4, -0.55], h.a.arete));
          o.push(rct(P, -2.3, -1.05, 3.2, 0, BLANC));
          for (const y of [-0.3, -0.7]) o.push(h.path(d(P, [[-2.1, y], [-0.9, y + 0.06], [1.2, y - 0.05], [3.0, y + 0.03]]), h.a.fin));
          // mât
          o.push(rct(P, -0.5, 0.6, 0.5, 6.4, BLANC));
          o.push(brisure(P, [-0.7, 6.4], [0.7, 6.4], 0.08));
          // bras de levage et gousset
          o.push(rct(P, 0.5, 2.6, 5.2, 3.4, BLANC));
          o.push(brisure(P, [5.2, 2.4], [5.2, 3.6], 0.08));
          o.push(poly(P, [[0.5, 3.4], [0.5, 4.9], [2.0, 3.4]], BLANC));
          // oreille de devant : plat boulonné contre la semelle, arrondi autour du boulon
          const oreille = [[-0.9, -0.95], [0.9, -0.95], ...arc([0, 1.6], 0.9, 0, Math.PI, 24), [-0.9, -0.95]];
          o.push(poly(P, oreille, BLANC));
          o.push(seg(P, [-0.5, 0.6], [-0.5, 2.5], h.a.cache), seg(P, [0.5, 0.6], [0.5, 2.5], h.a.cache), seg(P, [-0.5, 0.6], [0.5, 0.6], h.a.cache));
          for (const x of [-0.5, 0.5]) o.push(h.cercle(...P(x, -0.5), 0.14 * P.s, h.a.plein));
          const hex = []; for (let i = 0; i < 6; i++) hex.push([0.3 * Math.cos(i * Math.PI / 3), 1.6 + 0.3 * Math.sin(i * Math.PI / 3)]);
          o.push(poly(P, hex, BLANC));
          o.push(h.cercle(...P(0, 1.6), 0.12 * P.s, h.a.plein));
          return o.join('\n');
        },
        renvois: z => {
          const P = repPi(z), a = P(-0.7, 0.4), b = P(0.2, 1.75), c = P(1.0, 3.9);
          return [
            { n: 8, rond: [a[0] - 20, a[1] - 60], cible: a, texte: 'deux oreilles, boulonnées' },
            { n: 9, rond: [b[0] + 60, b[1] + 6], cible: b, texte: 'boulon de charnière' },
            { n: 10, rond: [c[0] + 40, c[1] - 26], cible: c, texte: 'bras soudé, avec gousset' },
          ];
        },
      },

      frein: {
        titre: 'L’interrupteur de freinage',
        dessin: z => {
          const F = repF(z), o = [];
          const PV = [5.5, 5], L = [2.6, 5], R = [8.4, 5], TB = [10.3, 6.6];
          // planche
          o.push(rct(F, 0, 0, 11, 8, BLANC));
          for (const y of [1.4, 2.9, 6.9]) o.push(h.path(d(F, [[0.4, y], [4, y + 0.12], [7.5, y - 0.1], [10.6, y + 0.05]]), h.a.fin));
          for (const q of [[0.4, 0.4], [10.6, 0.4], [0.4, 7.6], [10.6, 7.6]]) o.push(h.cercle(...F(...q), 1.8, h.a.plein));
          // câble du mât : les deux fils du moteur
          o.push(seg(F, [5.5, 9.6], [5.5, 8.8], h.a.contour));
          o.push(h.path(d(F, [[5.4, 8.8], [4.6, 8.0], [4.6, 6.1], [5.5, 5.3]]), h.a.arete));
          o.push(h.path(d(F, [[5.6, 8.8], [6.4, 8.0], [6.4, 7.3], [TB[0], 7.3], [TB[0], TB[1]]]), h.a.arete));
          // pont : du fil d'en face au plot du frein
          o.push(barre(F, TB, [R[0] + 0.15, R[1] + 0.2], 0.22, h.a.plein));
          // lignes vers le chalet
          o.push(h.path(d(F, [[L[0], L[1]], [1.6, 4.2], [1.6, 0], [1.6, -1.2]]), h.a.arete));
          o.push(h.path(d(F, [[TB[0], TB[1]], [10.6, 6.2], [10.6, 0], [10.6, -1.2]]), h.a.arete));
          // plots
          for (const q of [L, R]) { o.push(h.cercle(...F(...q), 0.42 * F.s, BLANC)); o.push(h.cercle(...F(...q), 0.14 * F.s, h.a.plein)); }
          o.push(h.cercle(...F(...TB), 0.26 * F.s, BLANC));
          // la lame en frein, en tireté
          o.push(barre(F, PV, [R[0] + 0.3, R[1]], 0.36, h.a.cache));
          o.push(rct(F, R[0] + 0.3, 4.72, 10.0, 5.28, h.a.cache));
          // la lame en marche, sa poignée de bois
          o.push(barre(F, PV, [L[0] - 0.3, L[1]], 0.36, BLANC));
          o.push(rct(F, 1.0, 4.72, L[0] - 0.3, 5.28, h.a.hachure('bois', 'detail')));
          o.push(h.cercle(...F(...PV), 0.3 * F.s, BLANC), h.cercle(...F(...PV), 0.1 * F.s, h.a.plein));
          // le mouvement : par le bas, d'un plot à l'autre
          o.push(h.fleche(d(F, arc(PV, 2.2, Math.PI + 0.35, 2 * Math.PI - 0.35)), h.a.arete));
          return o.join('\n');
        },
        renvois: z => {
          const F = repF(z);
          const a = F(5.5, 9.3), b = F(4.2, 5.12), c = F(5.5, 2.8), e = F(9.4, 5.9), g = F(1.6, 5.0), k = F(1.6, -0.8);
          return [
            { n: 11, rond: [a[0] - 40, a[1] + 2], cible: a, texte: 'les deux fils du moteur' },
            { n: 12, rond: [b[0] - 4, b[1] - 34], cible: b, texte: 'lame sur un boulon' },
            { n: 13, rond: [c[0], c[1] + 30], cible: c, texte: 'quitte la ligne avant le pont' },
            { n: 14, rond: [e[0] + 6, e[1] - 34], cible: e, texte: 'pont entre les deux fils' },
            { n: 15, rond: [g[0] - 2, g[1] - 44], cible: g, texte: 'poignée de bois' },
            { n: 16, rond: [k[0] + 36, k[1] + 4], cible: k, texte: 'vers diode et délestage' },
          ];
        },
      },
    },
    danger: 'Un mât qu’on lève ou qu’on couche tombe sur toute sa hauteur : personne dans cette longueur, du côté où il penche. Un interrupteur qui relierait les fils avant de couper la batterie met la batterie en court-circuit.',
  };
};
