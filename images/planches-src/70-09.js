// 65-09 — Le fumoir de fortune, à la pelle et à la hache (ch. 65, § 9, variante d'urgence)
// Cotes : seulement celles que le chapitre donne pour bâtir — trou « large comme une chaudière,
// profond jusqu'au genou » ; tranchée « large et profonde comme un avant-bras ». La longueur
// de 3 à 4 m est [À VÉRIFIER] dans le chapitre : elle ne va pas sur la planche.

module.exports = (h) => {
  const blanc = t => t.replace('fill="none"', h.a.blanc.split(' ')[0]);
  const P = (x, y) => `${x.toFixed(1)} ${y.toFixed(1)}`;

  // poisson pendu par la queue, tête en bas
  const poisson = (x, t, len, w) => {
    const ts = len * 0.15;
    return [
      h.path(`M${P(x - ts, t)} L${P(x, t + ts * 0.8)} L${P(x + ts, t)} L${P(x + ts * 0.3, t + ts * 1.8)} ` +
        `C${P(x + w / 2 + 1, t + 0.4 * len)} ${P(x + w / 2, t + 0.8 * len)} ${P(x, t + len)} ` +
        `C${P(x - w / 2, t + 0.8 * len)} ${P(x - w / 2 - 1, t + 0.4 * len)} ${P(x - ts * 0.3, t + ts * 1.8)} Z`, blanc(h.a.arete)),
      h.path(`M${P(x - w * 0.34, t + 0.74 * len)} Q${P(x, t + 0.69 * len)} ${P(x + w * 0.34, t + 0.74 * len)}`, h.a.detail),
      h.cercle(x + w * 0.14, t + len * 0.87, Math.max(1, w * 0.06), h.a.plein),
    ].join('\n');
  };
  const pendu = (x, yb, t, len, w) => [h.ligne(x, yb, x, t + len * 0.2, h.a.detail), poisson(x, t, len, w)].join('\n');

  // ─── géométrie de la coupe ───
  const G = z => {
    const L = z.l, H = z.h, k = 0.06, base = H - 84;
    const S = x => base - k * x;
    const pL = 118, pR = 176, yb = S(pL) + 54;
    const xT = L - 122, R = 78;
    const Sb = S(xT), yA = 36;
    const A = [xT, yA];
    const B1 = [xT - R, S(xT - R)], B2 = [xT + R, S(xT + R)];
    const along = (B, t) => [B[0] + (A[0] - B[0]) * t, B[1] + (A[1] - B[1]) * t];
    const T1 = along(B1, 0.8), T2 = along(B2, 0.8);
    const hw = y => R * (y - yA) / (Sb - yA);
    const y1 = Sb - 64, y2 = Sb - 118;
    const pY = T1[1] - 3;
    const xF = Math.round(pR + (xT - pR) * 0.45);
    return { L, H, S, pL, pR, yb, xT, R, Sb, yA, A, B1, B2, along, T1, T2, hw, y1, y2, pY, xF };
  };

  // ─── géométrie de la traverse liée ───
  const Lz = z => {
    const Pb = [z.l * 0.72, z.h], Pt = [z.l * 0.58, 0];
    const dx = Pt[0] - Pb[0], dy = Pt[1] - Pb[1], n = Math.hypot(dx, dy);
    const u = [dx / n, dy / n];
    const yb = Math.round(z.h * 0.3);
    const xc = Pb[0] + (yb - Pb[1]) * (u[0] / u[1]);
    const d1 = (() => { const a = u[0] + 1, b = u[1], m = Math.hypot(a, b); return [a / m, b / m]; })();
    const d2 = (() => { const a = u[0] - 1, b = u[1], m = Math.hypot(a, b); return [a / m, b / m]; })();
    return { Pb, Pt, u, yb, xc, d1, d2 };
  };

  // ─── géométrie de la tranchée en travers ───
  const Tz = z => {
    const cx = Math.round(z.l * 0.36), gy = Math.round(z.h * 0.3), W = 62, D = 62;
    return { cx, gy, W, D };
  };

  return {
    ref: '70-09',
    titre: 'Le fumoir de fortune, à la pelle et à la hache',
    desc: 'Fumoir à froid sans matériel. En coupe sur la longueur : un trou à feu couvert d\'une plaque, '
      + 'avec une amorce d\'entrée d\'air du côté du vent ; une tranchée en pente montante, couverte de plaques '
      + 'et de terre, qui mène la fumée jusqu\'au centre d\'un tipi de perches habillé de toile ; dans le tipi, '
      + 'des poissons pendus à des bâtons ; en haut, un couvercle de tôle glissé sur la sortie fait le registre. '
      + 'La tranchée en travers montre les plaques posées à cheval et la terre tassée par-dessus. '
      + 'Le détail montre un bâton lié à une perche du tipi par des tours de babiche croisés. Encadré danger : le monoxyde de carbone.',
    format: 'pleine',
    disposition: [['coupe'], ['travers', 'lien']],
    hauteurs: [3, 2],
    largeurs: [[1], [1, 1]],
    vues: {
      coupe: {
        titre: 'En coupe, sur la longueur',
        dessin: z => {
          const g = G(z), { L, H, S, pL, pR, yb, xT, Sb, yA, A, B1, B2, along, T1, T2, hw, y1, y2, pY, xF } = g;
          const o = [];
          // le sol
          o.push(h.chemin([[4, S(4)], [L - 4, S(L - 4)], [L - 4, H - 4], [4, H - 4]], h.a.hachure('terre', 'aucun'), true));
          // le vide creusé : amorce d'air, trou à feu, tranchée, sortie
          const vide = [
            [pL - 26, S(pL - 26)], [pL, S(pL) + 18], [pL, yb - 8], [pL + 7, yb], [pR - 7, yb], [pR, yb - 8],
            [pR, S(pR) + 26], [xT - 26, S(xT - 26) + 26], [xT - 8, S(xT - 8) + 22], [xT + 5, S(xT + 5) + 12], [xT + 12, S(xT + 12)],
          ];
          o.push(h.chemin(vide, h.a.blanc, true));
          o.push(h.chemin(vide, h.a.contour));
          // la surface, de part et d'autre
          o.push(h.chemin([[4, S(4)], [pL - 26, S(pL - 26)]], h.a.contour));
          o.push(h.chemin([[xT + 12, S(xT + 12)], [L - 4, S(L - 4)]], h.a.contour));
          // la terre tassée sur le conduit
          const m0 = pR + 2, m1 = g.B1[0] + 3;   // la terre monte jusqu'au pied de la toile et le chausse
          o.push(h.path(`M${P(m0, S(m0) - 5)} Q${P(m0 + 18, S(m0 + 18) - 19)} ${P(m0 + 40, S(m0 + 40) - 18)} `
            + `L${P(m1 - 34, S(m1 - 34) - 18)} Q${P(m1 - 14, S(m1 - 14) - 18)} ${P(m1, S(m1) - 5)} Z`, h.a.hachure('terre')));
          // les plaques : une sur le trou, puis bout à bout sur la tranchée
          const plaque = (x1, x2) => h.chemin([[x1, S(x1) - 5], [x2, S(x2) - 5], [x2, S(x2)], [x1, S(x1)]], blanc(h.a.arete), true);
          o.push(plaque(pL - 8, pR + 10));
          const nb = Math.max(3, Math.round((xT - 16 - (pR + 10)) / 44));
          const pas = (xT - 16 - (pR + 10)) / nb;
          for (let i = 0; i < nb; i++) o.push(plaque(pR + 10 + i * pas, pR + 10 + (i + 1) * pas));
          // le feu
          [pL + 15, pL + 29, pL + 43].forEach(x => o.push(h.cercle(x, yb - 6.5, 6, h.a.hachure('bois'))));
          [[pL + 20, 16], [pL + 30, 22], [pL + 40, 15]].forEach(([x, f]) => o.push(
            h.path(`M${P(x - 5, yb - 13)} Q${P(x - 6, yb - 13 - f * 0.6)} ${P(x, yb - 13 - f)} Q${P(x + 1, yb - 13 - f * 0.5)} ${P(x + 5, yb - 13)}`, h.a.detail)));
          // le tipi : perches de fond, bâtons, pièces
          [[xT - 36, 1.1], [xT + 28, 1.1]].forEach(([x, t]) => {
            const b = [x, S(x) - 1];
            o.push(h.ligne(b[0], b[1], b[0] + (A[0] - b[0]) * t, b[1] + (A[1] - b[1]) * t, h.a.detail));
          });
          const baton = y => h.rect(xT - hw(y) + 2, y, 2 * hw(y) - 4, 5, blanc(h.a.arete));
          o.push(baton(y1), baton(y2));
          const w1 = hw(y1), w2 = hw(y2);
          [-0.74, -0.4, 0.4, 0.74].forEach(f => o.push(pendu(xT + f * w1, y1 + 5, y1 + 11, 42, 12)));
          [-0.5, 0.5].forEach(f => o.push(pendu(xT + f * w2, y2 + 5, y2 + 11, 32, 10)));
          // la fumée
          o.push(h.fleche(`M${P(pL + 30, yb - 36)} Q${P(pL + 46, S(pR) + 13)} ${P(pR + 18, S(pR + 18) + 13)} `
            + `L${P(xT - 36, S(xT - 36) + 13)} Q${P(xT - 2, S(xT) + 13)} ${P(xT, Sb - 18)} L${P(xT, y2 + 14)} L${P(xT - 8, pY - 8)}`, h.a.cache));
          // la toile et les perches de devant
          o.push(h.chemin([B1, T1], h.a.contour), h.chemin([B2, T2], h.a.contour));
          const E1 = along(B1, 1.17), E2 = along(B2, 1.17);
          o.push(h.chemin([B1, E1], h.a.arete), h.chemin([B2, E2], h.a.arete));
          [-3.5, 0, 3.5].forEach(d => o.push(h.ligne(A[0] - 5, A[1] + d, A[0] + 5, A[1] + d, h.a.detail)));
          // le registre : couvercle de tôle couché sur les perches, qui bouche la moitié de la sortie
          const nO = (() => { const vx = A[0] - B2[0], vy = A[1] - B2[1], n = Math.hypot(vx, vy); return [-vy / n, vx / n]; })();
          const L1 = along(B2, 0.78), L2 = along(B2, 0.95), sh = (p, s) => [p[0] + nO[0] * s, p[1] + nO[1] * s];
          o.push(h.chemin([sh(L1, 1.2), sh(L2, 1.2), sh(L2, 4.6), sh(L1, 4.6)], h.a.plein, true));
          // un filet de fumée qui fuit du couvert
          const yF = S(xF) - 19;
          o.push(h.path(`M${P(xF, yF)} c-6 -6 6 -12 0 -18 c-6 -6 6 -12 0 -18`, h.a.detail));
          o.push(h.path(`M${P(xF + 7, yF + 1)} c-5 -5 5 -10 0 -15 c-5 -5 5 -10 0 -12`, h.a.detail));
          // cotes du trou
          o.push(h.cote(pL, yb + 11, pR, yb + 11, 'une chaudière', { cote: 'dessous' }));
          o.push(h.ligne(pL, yb - 6, pL, yb + 17, h.a.fin), h.ligne(pR, yb - 6, pR, yb + 17, h.a.fin));
          o.push(h.cote(40, S(pL), 40, yb, 'au genou'));
          o.push(h.ligne(34, yb, pL + 3, yb, h.a.fin));
          return o.join('\n');
        },
        renvois: z => {
          const g = G(z), { S, pL, pR, yb, xT, A, along, B2, pY, xF } = g;
          const p4 = along(B2, 0.4);
          const vx = A[0] - B2[0], vy = A[1] - B2[1], nn = Math.hypot(vx, vy), lc = along(B2, 0.87);
          const c5 = [lc[0] - vy / nn * 5, lc[1] + vx / nn * 5];
          return [
            { n: 1, rond: [pR + 26, S(pR) + 42], cible: [pR + 1.5, S(pR) + 42], texte: 'trou à feu dans le sol' },
            { n: 2, rond: [52, S(pL) - 52], cible: [pL - 21, S(pL) + 2.5], texte: 'amorce d’air, côté du vent dominant' },
            { n: 3, rond: [pR + 90, S(pR + 90) + 50], cible: [pR + 90, S(pR + 90) + 27.5], texte: 'tranchée couverte, en pente montante' },
            { n: 4, rond: [p4[0] + 36, p4[1]], cible: [p4[0] + 3, p4[1]], texte: 'tipi de perches habillé de toile' },
            { n: 5, rond: [xT + 58, pY - 26], cible: c5, texte: 'couvercle de tôle glissé : le registre' },
            { n: 6, rond: [xF + 34, S(xF) - 72], cible: [xF + 3, S(xF) - 56], texte: 'filet de fumée : rajouter de la terre' },
          ];
        },
      },
      travers: {
        titre: 'La tranchée en travers',
        dessin: z => {
          const { cx, gy, W, D } = Tz(z), o = [];
          const x0 = 10, x1 = z.l - 10;
          o.push(h.rect(x0, gy, x1 - x0, D + 20, h.a.hachure('terre', 'aucun')));
          o.push(h.chemin([[cx - W / 2, gy], [cx - W / 2 + 3, gy + D], [cx + W / 2 - 3, gy + D], [cx + W / 2, gy]], h.a.blanc, true));
          o.push(h.chemin([[cx - W / 2, gy], [cx - W / 2 + 3, gy + D], [cx + W / 2 - 3, gy + D], [cx + W / 2, gy]], h.a.contour));
          o.push(h.ligne(x0, gy, cx - W / 2, gy, h.a.contour), h.ligne(cx + W / 2, gy, x1, gy, h.a.contour));
          // la terre tassée
          o.push(h.path(`M${P(cx - 86, gy)} Q${P(cx - 60, gy - 38)} ${P(cx, gy - 36)} Q${P(cx + 60, gy - 38)} ${P(cx + 86, gy)} Z`, h.a.hachure('terre')));
          // la plaque, à cheval sur la tranchée
          o.push(h.chemin([[cx - 52, gy], [cx - 50, gy - 9], [cx - 18, gy - 12], [cx + 28, gy - 11], [cx + 50, gy - 8], [cx + 52, gy]], h.a.hachure('pierre'), true));
          // cotes : large et profonde comme un avant-bras
          const yc = gy + D + 30;
          o.push(h.ligne(cx - W / 2 + 3, gy + D + 3, cx - W / 2 + 3, yc + 6, h.a.fin), h.ligne(cx + W / 2 - 3, gy + D + 3, cx + W / 2 - 3, yc + 6, h.a.fin));
          o.push(h.cote(cx - W / 2 + 3, yc, cx + W / 2 - 3, yc, 'un avant-bras', { cote: 'dessous' }));
          const xv = cx + W / 2 + 22;
          o.push(h.ligne(cx + W / 2, gy + D, xv + 6, gy + D, h.a.fin));
          o.push(h.cote(xv, gy, xv, gy + D, 'un avant-bras'));
          return o.join('\n');
        },
        renvois: z => {
          const { cx, gy } = Tz(z);
          return [
            { n: 7, rond: [cx - 88, gy - 34], cible: [cx - 45, gy - 11], texte: 'écorce, pierre plate ou tôle' },
            { n: 8, rond: [cx + 92, gy - 40], cible: [cx + 53, gy - 29], texte: 'terre tassée : elle scelle et refroidit' },
          ];
        },
      },
      lien: {
        titre: 'Le bâton lié à la perche',
        dessin: z => {
          const { Pb, Pt, u, yb, xc, d1, d2 } = Lz(z), o = [];
          const nrm = [-u[1], u[0]], r = 8;
          const off = (p, s) => [p[0] + nrm[0] * s, p[1] + nrm[1] * s];
          // la perche
          o.push(h.chemin([off(Pb, -r), off(Pt, -r), off(Pt, r), off(Pb, r)], h.a.blanc, true));
          o.push(h.chemin([off(Pb, -r), off(Pt, -r)], h.a.contour), h.chemin([off(Pb, r), off(Pt, r)], h.a.contour));
          const lg = (a, b, s) => h.chemin([off([Pb[0] + (Pt[0] - Pb[0]) * a, Pb[1] + (Pt[1] - Pb[1]) * a], s),
            off([Pb[0] + (Pt[0] - Pb[0]) * b, Pb[1] + (Pt[1] - Pb[1]) * b], s)], h.a.detail);
          o.push(lg(0.05, 0.4, -3), lg(0.55, 0.62, -3), lg(0.2, 0.58, 3.5), lg(0.8, 0.97, 2));
          // les pièces pendues
          [z.l * 0.14, z.l * 0.3, z.l * 0.46].forEach(x => o.push(pendu(x, yb + 6.5, yb + 16, Math.min(92, z.h - yb - 22), 22)));
          // le bâton écorcé, devant la perche
          const x0 = 22, x1 = xc + 26, rb = 6.5;
          o.push(h.rect(x0, yb - rb, x1 - x0, 2 * rb, h.a.blanc));
          o.push(h.ligne(x0, yb - rb, x1, yb - rb, h.a.contour), h.ligne(x0, yb + rb, x1, yb + rb, h.a.contour));
          o.push(h.ellipse(x0, yb, 3.2, rb, blanc(h.a.contour)), h.ellipse(x0, yb, 1.3, 2.6, h.a.detail));
          o.push(h.path(`M${P(x1, yb - rb)} Q${P(x1 + 4, yb)} ${P(x1, yb + rb)}`, h.a.contour));
          o.push(h.ligne(x0 + 14, yb - 1.5, x0 + 60, yb - 1.5, h.a.detail), h.ligne(x0 + 80, yb + 2, x0 + 130, yb + 2, h.a.detail));
          // la babiche : tours croisés
          const bande = (d, s) => {
            const p = [-d[1], d[0]], c = [xc + p[0] * s, yb + p[1] * s], l = 19, w = 2.2;
            const a = [c[0] - d[0] * l, c[1] - d[1] * l], b = [c[0] + d[0] * l, c[1] + d[1] * l];
            return h.chemin([[a[0] + p[0] * w, a[1] + p[1] * w], [b[0] + p[0] * w, b[1] + p[1] * w], [b[0] - p[0] * w, b[1] - p[1] * w], [a[0] - p[0] * w, a[1] - p[1] * w]], blanc(h.a.arete), true);
          };
          [-5.5, 0, 5.5].forEach(s => o.push(bande(d1, s)));
          [-5.5, 0, 5.5].forEach(s => o.push(bande(d2, s)));
          return o.join('\n');
        },
        renvois: z => {
          const { yb, xc, d1 } = Lz(z);
          const e = [xc + d1[0] * 21, yb + d1[1] * 21];
          return [
            { n: 9, rond: [44, yb - 34], cible: [52, yb - 8], texte: 'bâton de bois franc écorcé' },
            { n: 10, rond: [e[0] + 34, e[1] - 20], cible: [e[0] + 2, e[1] - 1], texte: 'babiche posée mouillée, serre en séchant' },
          ];
        },
      },
    },
    danger: 'Danger — la fumée pique les yeux, le monoxyde ne pique pas : il ne se voit pas et ne se sent pas. On n’entre pas respirer dans le tipi pour voir si ça fume. Jamais adossé au chalet, jamais sous un auvent fermé.',
  };
};
