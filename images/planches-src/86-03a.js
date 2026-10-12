// 86-03a — L'éolienne de fortune, montée (chapitre 86, section D, « Bâtir », « Le mât »)
// Repères en unités de dessin, y vers le haut ; proportions seulement, aucune cote tirée de là.
// Le vent vient de la gauche : le rotor est devant le mât, la queue derrière.

const cadre = (z, bb, m = [16, 10, 16, 10]) => {
  const [x0, x1, y0, y1] = bb;
  const lu = z.l - m[0] - m[2], hu = z.h - m[1] - m[3];
  const s = Math.min(lu / (x1 - x0), hu / (y1 - y0));
  const ox = m[0] + (lu - (x1 - x0) * s) / 2, oy = m[1] + (hu - (y1 - y0) * s) / 2;
  const T = (x, y) => [ox + (x - x0) * s, oy + (y1 - y) * s];
  T.s = s;
  return T;
};

// ── ensemble : mât H, collier des haubans sous la portée des pales ──
const H = 10, R = 1.4, HUB = H + 0.27, XR = -1.0, HG = H - 1.9, GP = 3.6;
const repE = z => cadre(z, [-5.6, 5.2, -0.5, H + 1.85], [14, 8, 14, 6]);
// ── tête : unité = diamètre du mât ──
const repT = z => cadre(z, [-3.4, 6.8, -6.5, 4.3], [18, 6, 10, 6]);
// ── pales ──
const repP = z => cadre(z, [0, 30, -5.0, 5.0], [10, 8, 10, 8]);

module.exports = (h) => {
  const BLANC = h.a.arete.replace('fill="none"', 'fill="#FFFFFF"');
  const BLANCD = h.a.detail.replace('fill="none"', 'fill="#FFFFFF"');
  const AXE = h.a.fin + ' stroke-dasharray="8 3 1.5 3"';
  const f = n => n.toFixed(1);
  const pts = (T, l) => l.map(q => T(...q));
  const poly = (T, l, a, ferme = true) => h.chemin(pts(T, l), a, ferme);
  const rct = (T, x0, y0, x1, y1, a) => poly(T, [[x0, y0], [x1, y0], [x1, y1], [x0, y1]], a);
  const seg = (T, a, b, at = h.a.arete) => h.ligne(...T(...a), ...T(...b), at);
  const courbe = (T, fn, n, at) => { const o = []; for (let i = 0; i <= n; i++) o.push(T(...fn(i / n))); return h.chemin(o, at); };
  const brisure = (T, x0, x1, y, amp) => courbe(T, t => [x0 + (x1 - x0) * t, y + amp * Math.sin(2 * Math.PI * t)], 16, h.a.detail);
  // boucle de câble : une spire lâche, qui se croise
  const boucle = (xc, y0, L, r) => t => [xc + r * (1 - Math.cos(2 * Math.PI * t)), y0 - L * t - r * Math.sin(2 * Math.PI * t)];

  return {
    ref: '86-03a',
    titre: 'L’éolienne de fortune, montée',
    desc: 'Éolienne bâtie avec un moteur à aimants permanents. À gauche, l’ensemble de profil, vent de gauche : mât haubané, rotor devant le mât, queue derrière, haubans attachés sous la portée des pales, bras de levage couché au pied et lié à son ancrage, charnière au pied, interrupteur de freinage sur le mât, câble vers le chalet. À droite, la tête agrandie, mât et manchon en coupe : manchon coiffé posé sur le bout du mât, plaque, moteur bridé, moyeu sur l’arbre, pieds de pales boulonnés, queue en tôle boulonnée au bras, câble qui descend en boucle lâche avant d’être pris au mât. En bas, les pales : tuyau de plastique fendu en long en quatre bandes, une bande avec la pale tracée large au pied et fine au bout, et le rotor de face, trois pales boulonnées sur le moyeu. Encadré danger : une pale qui tourne frappe, et le givre qui s’en détache est projeté loin.',
    format: 'pleine',
    disposition: [['ensemble', 'tete'], ['pales']],
    hauteurs: [3, 2],
    largeurs: [[5, 6], [1]],
    vues: {
      ensemble: {
        titre: 'L’ensemble, de profil',
        dessin: z => {
          const E = repE(z), o = [];
          // sol
          o.push(rct(E, -5.6, -0.45, 5.2, 0, h.a.hachure('terre', 'fin')));
          o.push(seg(E, [-5.6, 0], [5.2, 0], h.a.arete));
          // semelle et charnière
          o.push(rct(E, -0.45, 0, 0.45, 0.2, BLANCD));
          o.push(poly(E, [[-0.16, 0.2], [0.16, 0.2], [0.12, 0.62], [-0.12, 0.62]], BLANCD));
          // bras de levage couché, lié à l'ancrage
          o.push(rct(E, 0.08, 0.36, GP, 0.5, BLANCD));
          o.push(seg(E, [GP, 0.43], [GP + 0.5, 0], h.a.detail));
          o.push(seg(E, [GP + 0.5, 0.12], [GP + 0.5, -0.4], h.a.arete));
          o.push(seg(E, [-5, 0.12], [-5, -0.4], h.a.arete));
          // haubans
          o.push(seg(E, [-0.08, HG], [-5, 0.1], h.a.detail));
          o.push(seg(E, [0.08, HG], [GP, 0.5], h.a.detail));
          // portée des pales (disque vu par la tranche)
          o.push(seg(E, [XR - 0.2, HUB - R], [XR - 0.2, HUB + R], h.a.cache));
          o.push(seg(E, [XR - 0.2, HUB - R], [-0.08, HUB - R], h.a.fin + ' stroke-dasharray="3 2"'));
          // mât
          o.push(rct(E, -0.08, 0.42, 0.08, H, BLANC));
          o.push(h.cercle(...E(0, 0.45), 1.6, h.a.plein));
          // collier des haubans
          o.push(rct(E, -0.14, HG - 0.08, 0.14, HG + 0.08, h.a.plein));
          // câble le long du mât jusqu'à l'interrupteur, puis vers le chalet
          o.push(h.chemin(pts(E, [[0.16, H - 1.25], [0.13, H - 1.5], [0.13, 1.7], [-0.2, 1.62]]), h.a.fin));
          o.push(rct(E, -0.5, 1.0, -0.08, 1.55, BLANCD));
          o.push(h.chemin(pts(E, [[-0.36, 1.0], [-0.36, 0.72], [-0.7, 0.62], [-1.2, 0.02], [-5.6, 0.02]]), h.a.fin));
          // tête
          o.push(rct(E, -0.13, H - 0.5, 0.13, H + 0.08, BLANCD));
          o.push(rct(E, -0.9, H + 0.08, 0.35, H + 0.14, BLANCD));
          o.push(rct(E, -0.8, H + 0.14, 0.05, H + 0.42, BLANCD));
          o.push(seg(E, [-0.8, HUB], [XR, HUB], h.a.arete));
          o.push(rct(E, XR - 0.05, HUB - 0.22, XR + 0.03, HUB + 0.22, BLANCD));
          o.push(poly(E, [[XR - 0.12, HUB], [XR - 0.05, HUB + R], [XR - 0.02, HUB + R], [XR - 0.02, HUB]], h.a.plein));
          o.push(poly(E, [[XR - 0.12, HUB], [XR - 0.05, HUB - 0.5 * R], [XR - 0.02, HUB - 0.5 * R], [XR - 0.02, HUB]], h.a.plein));
          o.push(rct(E, 0.1, H + 0.14, 2.45, H + 0.22, BLANCD));
          o.push(poly(E, [[1.75, H - 0.05], [2.6, H - 0.12], [2.6, H + 0.95], [1.95, H + 0.7]], BLANCD));
          // câble : sort du moteur, boucle lâche, pris au mât
          o.push(h.chemin(pts(E, [[0.05, H + 0.3], [0.3, H + 0.25], [0.3, H - 0.55]]), h.a.fin));
          o.push(courbe(E, boucle(0.3, H - 0.55, 0.6, 0.22), 40, h.a.fin));
          o.push(h.chemin(pts(E, [[0.3, H - 1.15], [0.16, H - 1.25]]), h.a.fin));
          // le vent
          o.push(h.fleche(`M ${E(-5.4, HUB + 0.9).map(f).join(' ')} L ${E(-3.6, HUB + 0.9).map(f).join(' ')}`));
          o.push(h.fleche(`M ${E(-5.4, HUB).map(f).join(' ')} L ${E(-3.6, HUB).map(f).join(' ')}`));
          return o.join('\n');
        },
        renvois: z => {
          const E = repE(z);
          const a = E(0.1, HG), b = E(2.2, 0.43), c = E(0, 0.45), d = E(-0.5, 1.28), e = E(XR - 0.2, HUB - R);
          return [
            { n: 1, rond: [e[0] - 30, e[1] + 6], cible: e, texte: 'portée des pales' },
            { n: 2, rond: [a[0] + 34, a[1] - 10], cible: a, texte: 'haubans pris sous les pales' },
            { n: 3, rond: [c[0] + 30, c[1] - 30], cible: c, texte: 'charnière : le mât se couche' },
            { n: 4, rond: [b[0] + 38, b[1] - 40], cible: b, texte: 'bras de levage, ancré' },
            { n: 5, rond: [d[0] - 40, d[1] - 40], cible: d, texte: 'interrupteur de freinage' },
          ];
        },
      },

      tete: {
        titre: 'La tête, mât et manchon en coupe',
        dessin: z => {
          const T = repT(z), o = [];
          const MET = h.a.hachure('metal', 'detail');
          // queue : tôle derrière le bras
          o.push(poly(T, [[4.2, -0.5], [6.6, -0.85], [6.6, 2.95], [4.6, 2.25]], BLANC));
          // mât en coupe
          o.push(rct(T, -0.5, -6.3, -0.42, 0, MET), rct(T, 0.42, -6.3, 0.5, 0, MET));
          o.push(brisure(T, -0.7, 0.7, -6.3, 0.12));
          // manchon coiffé en coupe
          o.push(rct(T, -0.68, -2.8, -0.58, 0.14, MET), rct(T, 0.58, -2.8, 0.68, 0.14, MET));
          o.push(rct(T, -0.68, 0, 0.68, 0.14, MET));
          // plaque et bras de queue
          o.push(rct(T, -2.3, 0.14, 0.8, 0.34, BLANC));
          o.push(rct(T, 0.4, 0.34, 6.4, 0.62, BLANC));
          for (const x of [4.9, 5.9]) o.push(h.cercle(...T(x, 0.48), 2.2, h.a.plein));
          // moteur bridé
          o.push(rct(T, -1.8, 0.34, 0.1, 1.74, BLANC));
          o.push(rct(T, -2.0, 0.46, -1.8, 1.62, BLANC), rct(T, 0.1, 0.46, 0.3, 1.62, BLANC));
          for (const x of [-1.5, -0.25]) o.push(rct(T, x, 0.34, x + 0.2, 1.8, BLANCD));
          for (const x of [-1.4, -0.15]) o.push(seg(T, [x, 0.14], [x, 0.04], h.a.contour));
          // arbre, moyeu, pieds de pales boulonnés
          o.push(rct(T, -2.5, 0.94, -2.0, 1.14, BLANCD));
          o.push(rct(T, -2.8, 0.1, -2.5, 1.98, BLANC));
          o.push(rct(T, -3.06, 1.22, -2.8, 4.0, BLANC));
          o.push(seg(T, [-2.92, 1.3], [-2.92, 3.9], h.a.fin));
          o.push(brisure(T, -3.2, -2.66, 4.0, 0.06));
          o.push(rct(T, -3.06, -1.5, -2.8, 0.86, BLANC));
          o.push(seg(T, [-2.92, 0.78], [-2.92, -1.4], h.a.fin));
          o.push(brisure(T, -3.2, -2.66, -1.5, 0.06));
          for (const y of [1.45, 1.8, 0.62, 0.28]) {
            o.push(rct(T, -3.14, y - 0.05, -2.42, y + 0.05, h.a.plein));
            o.push(rct(T, -2.46, y - 0.1, -2.38, y + 0.1, h.a.plein));
          }
          // câble : du moteur, derrière la plaque, le long du manchon, une boucle lâche, pris au mât
          o.push(h.path(`M ${T(0.3, 1.1).map(f).join(' ')} Q ${T(1.0, 1.1).map(f).join(' ')} ${T(1.0, 0.5).map(f).join(' ')} L ${T(0.95, -2.9).map(f).join(' ')}`, h.a.arete));
          o.push(courbe(T, boucle(0.95, -2.9, 1.8, 0.6), 80, h.a.arete));
          o.push(h.path(`M ${T(0.95, -4.7).map(f).join(' ')} Q ${T(0.95, -5.3).map(f).join(' ')} ${T(0.58, -5.5).map(f).join(' ')} L ${T(0.58, -6.3).map(f).join(' ')}`, h.a.arete));
          o.push(rct(T, 0.5, -5.72, 0.74, -5.52, h.a.plein));
          return o.join('\n');
        },
        renvois: z => {
          const T = repT(z);
          const a = T(-3.06, 3.2), b = T(-0.8, 1.74), c = T(0.3, 0.07), d = T(5.6, 2.2), e = T(2.15, -3.8), g = T(0.62, -5.62);
          return [
            { n: 6, rond: [a[0] + 24, a[1] - 14], cible: [a[0] + 8, a[1]], texte: 'pales boulonnées au moyeu' },
            { n: 7, rond: [b[0] + 26, b[1] - 30], cible: b, texte: 'moteur à aimants, bridé' },
            { n: 8, rond: [c[0] - 70, c[1] + 40], cible: c, texte: 'manchon coiffé, qui pivote' },
            { n: 9, rond: [d[0], d[1] - 40], cible: d, texte: 'queue en tôle, sous le vent' },
            { n: 10, rond: [e[0] + 36, e[1] + 4], cible: e, texte: 'câble lâche en boucle' },
            { n: 11, rond: [g[0] + 40, g[1] + 6], cible: g, texte: 'pris au mât sous la boucle' },
          ];
        },
      },

      pales: {
        titre: 'Les pales, dans un tuyau fendu en long',
        dessin: z => {
          const P = repP(z), s = P.s, o = [];
          // 1. le tuyau, en bout et de biais, fendu en quatre
          const cx = 1.8, cy = 0.4, r = 1.9, rx = 0.62 * r, L = 5.4;
          o.push(h.path(`M ${P(cx, cy + r).map(f).join(' ')} L ${P(cx + L, cy + r).map(f).join(' ')} A ${f(rx * s)} ${f(r * s)} 0 0 1 ${P(cx + L, cy - r).map(f).join(' ')} L ${P(cx, cy - r).map(f).join(' ')}`, BLANC));
          o.push(h.ellipse(...P(cx, cy), rx * s, r * s, BLANC));
          o.push(h.ellipse(...P(cx, cy), rx * s * 0.86, r * s * 0.86, h.a.detail));
          for (const t of [0, Math.PI / 2, Math.PI, 1.5 * Math.PI]) {
            const q1 = P(cx + 0.86 * rx * Math.cos(t), cy + 0.86 * r * Math.sin(t)), q2 = P(cx + rx * Math.cos(t), cy + r * Math.sin(t));
            o.push(h.ligne(...q1, ...q2, h.a.contour));
          }
          o.push(seg(P, [cx + rx, cy], [cx + L + rx, cy], h.a.arete));
          o.push(seg(P, [cx, cy + r], [cx + L, cy + r], h.a.arete));
          o.push(seg(P, [cx, cy - r], [cx + L, cy - r], h.a.arete));
          // 2. une bande, vue du creux, la pale tracée
          const bx = 9.4, bl = 10.6, by = 1.1, bw = 1.5, rac = 1.5;
          o.push(rct(P, bx, by - bw, bx + bl, by, h.a.detail));
          o.push(seg(P, [bx + 0.2, by - bw / 2], [bx + bl - 0.2, by - bw / 2], AXE));
          o.push(poly(P, [[bx, by], [bx + bl, by], [bx + bl, by - 0.3 * bw], [bx + rac, by - bw], [bx, by - bw]], h.a.contour));
          for (const x of [bx + 0.45, bx + 1.05]) o.push(h.cercle(...P(x, by - bw / 2), 2.2, h.a.plein));
          // 3. le rotor de face : trois pales boulonnées sur le moyeu
          const rcx = 25.4, rcy = 0.2, RR = 4.4, rho = 0.95, w = 0.8;
          o.push(rct(P, rcx - 0.35, -5.0, rcx + 0.35, rcy - 0.4, h.a.cache));
          for (let k = 0; k < 3; k++) {
            const th = Math.PI / 2 + k * 2 * Math.PI / 3, u = [Math.cos(th), Math.sin(th)], v = [-Math.sin(th), Math.cos(th)];
            const Q = (a, b) => [rcx + a * u[0] + b * v[0], rcy + a * u[1] + b * v[1]];
            o.push(poly(P, [Q(0.3, 0), Q(RR, 0), Q(RR, 0.3 * w), Q(0.3 + rac, w), Q(0.3, w)], BLANC));
            o.push(seg(P, Q(0.3 + rac + 0.2, w / 2), Q(RR - 0.2, 0.15 * w), h.a.fin));
          }
          o.push(h.cercle(...P(rcx, rcy), rho * s, BLANC));
          for (let k = 0; k < 3; k++) {
            const th = Math.PI / 2 + k * 2 * Math.PI / 3, u = [Math.cos(th), Math.sin(th)], v = [-Math.sin(th), Math.cos(th)];
            for (const a of [0.45, 0.8]) o.push(h.cercle(...P(rcx + a * u[0] + w / 2 * v[0], rcy + a * u[1] + w / 2 * v[1]), 2.2, h.a.plein));
          }
          o.push(h.cercle(...P(rcx, rcy), 0.2 * s, h.a.detail));
          return o.join('\n');
        },
        renvois: z => {
          const P = repP(z);
          const a = P(1.8 + 0.62 * 1.9 + 3.2, 0.4), b = P(15.4, 1.1 - 0.9), c = P(10.15, 0.35), d = P(25.4, 0.2 - 0.95 + 0.02), e = P(25.4 + 0.2, 0.2);
          return [
            { n: 12, rond: [a[0] + 12, a[1] + 58], cible: a, texte: 'tuyau fendu en long' },
            { n: 13, rond: [b[0] + 20, b[1] + 46], cible: b, texte: 'large au pied, fine au bout' },
            { n: 14, rond: [c[0] - 10, c[1] + 50], cible: c, texte: 'pied percé, deux boulons' },
            { n: 15, rond: [e[0] + 64, e[1] - 50], cible: e, texte: 'moyeu sur l’arbre du moteur' },
          ];
        },
      },
    },
    danger: 'Une pale qui tourne frappe : on arrête le rotor avant de s’approcher. Le givre qui se détache d’une pale est projeté loin.',
  };
};
