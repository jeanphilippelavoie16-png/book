// 45-01b — L’arc de bille : égaliser les bras sur la perche à crans, câbler le dos (chapitre 45, §9)
// Aucun chiffre sur le dessin : le chapitre n’en donne ni pour la perche ni pour le câble,
// hormis les huit allers-retours et les deux tours, qui vont dans la légende.

const r1 = v => Math.round(v * 10) / 10;
const vague = (a, b, amp) => {
  const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L;
  const p1 = [a[0] + dx / 3 + nx * amp, a[1] + dy / 3 + ny * amp], p2 = [a[0] + 2 * dx / 3 - nx * amp, a[1] + 2 * dy / 3 - ny * amp];
  return `C${r1(p1[0])} ${r1(p1[1])} ${r1(p2[0])} ${r1(p2[1])} ${r1(b[0])} ${r1(b[1])}`;
};
const pts2d = pts => pts.map(p => `${r1(p[0])} ${r1(p[1])}`).join(' L');

// Un bras : le dos, point par point depuis le bout de la poignée ; k(s) = courbure.
const bras = (x0, y0, sg, L, k) => {
  const o = [{ x: x0, y: y0, phi: 0 }];
  let x = x0, y = y0, phi = 0;
  for (let s = 1; s <= L; s++) { const kk = k(s - 0.5); x += sg * Math.cos(phi + kk / 2); y += Math.sin(phi + kk / 2); phi += kk; o.push({ x, y, phi }); }
  return o;
};
const auVentre = (p, sg, t) => [p.x - sg * Math.sin(p.phi) * t, p.y + Math.cos(p.phi) * t];
const auDos = (p, sg, t) => [p.x + sg * Math.sin(p.phi) * t, p.y - Math.cos(p.phi) * t];
// Le contour d’un arc : bras gauche, poignée, bras droit.
const contourArc = (G, Dr, epG, epD) => [
  ...G.slice().reverse().map(p => [p.x, p.y]),
  ...Dr.map(p => [p.x, p.y]),
  ...Dr.map((p, s) => auVentre(p, 1, epD(s))).reverse(),
  ...G.map((p, s) => auVentre(p, -1, epG(s))),
];

// ── la perche ──
const repPerche = z => {
  const cx = z.l / 2, y0 = 30, hh = 14, L = 158, R = 260;
  const k2 = (L / R - 48 / R) / (L - 102);
  const G = bras(cx - hh, y0, -1, L, () => 1 / R);
  const Dr = bras(cx + hh, y0, 1, L, s => s < 48 ? 1 / R : s < 102 ? 0 : k2);
  const ep = s => s < 12 ? 12 - 3 * s / 12 : 9 - 3 * (s - 12) / (L - 12);
  const yN = y0 + 40 + 13 * 4, yF = z.h - 10;
  return { cx, y0, hh, L, G, Dr, ep, yN, yF };
};

// ── un cran, de côté ──
const repCran = z => {
  const xg = 44, xf = 80, yT = 12, yF = z.h - 12;
  const crans = [];
  for (let y = 36; y + 16 < yF - 10; y += 44) crans.push(y);
  const corde = [xf - 5.8, crans[1] + 4.8];
  return { xg, xf, yT, yF, crans, corde };
};

// ── le dos câblé ──
const repCable = z => {
  const cx = z.l / 2, y0 = 16, hh = 16, L = 264, R = 695;
  const G = bras(cx - hh, y0, -1, L, () => 1 / R), Dr = bras(cx + hh, y0, 1, L, () => 1 / R);
  const ep = s => s < 10 ? 10 - 2 * s / 10 : 8 - 3 * (s - 10) / (L - 10);
  const yp = z.h - 48;
  const la = s => 24 - 6 * s / L;       // s mesuré depuis le bout de la poignée
  return { cx, y0, hh, L, G, Dr, ep, yp, la };
};

// ── la torsion, en bout ──
const repTors = z => {
  const cxs = z.l * 0.38, yBot = z.h - 8, yS = yBot - 40, c = [cxs, yS - 17];
  const a = -25 * Math.PI / 180, dir = [Math.cos(a), Math.sin(a)];
  return { cxs, yBot, yS, c, dir };
};

// ── le bout câblé, vu du dos ──
const repBout = z => {
  const XT = z.l - 14, yc = 40, xn = XT - 28, xf = XT - 84;
  const demi = x => 22 - 2 * (x - 14) / (XT - 14);
  return { XT, yc, xn, xf, demi };
};

module.exports = (h) => {
  const BL = h.a.arete.replace('fill="none"', 'fill="#FFFFFF"');
  const BLC = h.a.contour.replace('fill="none"', 'fill="#FFFFFF"');

  // bord d’un arc vu du dos, avec les deux entailles
  const bordDos = (xs, yv, xns) => sg => {
    const pts = [];
    for (const xn of xns) {
      const [y, w] = yv(xn, sg);
      pts.push([xn - 4, y], [xn - 2, w], [xn + 2, w], [xn + 4, y]);
    }
    for (const x of xs) if (xns.every(xn => Math.abs(x - xn) > 4.5)) pts.push([x, yv(x, sg)[0]]);
    return pts.sort((p, q) => p[0] - q[0]);
  };
  // faisceau tordu : deux bords et des traits en biais, en un seul tracé
  const faisceau = (x1, x2, yc, a, pente) => {
    let d = '';
    for (let x = x1; x + Math.abs(pente) < x2; x += 4.5) d += `M${r1(x)} ${r1(yc - a)} L${r1(x + pente)} ${r1(yc + a)} `;
    return [h.path(d, h.a.fin), h.ligne(x1, yc - a, x2, yc - a, h.a.detail), h.ligne(x1, yc + a, x2, yc + a, h.a.detail)].join('\n');
  };
  const ligature = (x, y, l, ht) => {
    let d = '';
    for (let xi = x + 3; xi < x + l - 1; xi += 4) d += `M${r1(xi)} ${r1(y)} L${r1(xi)} ${r1(y + ht)} `;
    return h.rect(x, y, l, ht, BL) + '\n' + h.path(d, h.a.detail);
  };

  return {
    ref: '45-01b',
    titre: 'L’arc de bille : égaliser les bras, câbler le dos',
    desc: 'Deuxième page de l’arc de bille. En haut, la perche à crans : une perche, plantée ou accrochée au mur, des crans taillés en travers de sa face à quelques centimètres les uns des autres ; l’arc est posé par la poignée au sommet, le dos en haut, et la corde tirée vers le bas s’accroche dans un cran. Le bras gauche décrit un arc de cercle ; le bras droit garde un point plat, marqué d’un trait sous le ventre, là où on gratte, et en tireté la courbe qu’il devrait suivre, pareille à celle de l’autre bras. À côté, un cran vu de côté : sa lèvre du haut monte vers l’intérieur, la corde tire vers le haut et se loge au fond. Au milieu, l’arc bandé de côté, le câble de tendon sur le dos et la corde au ventre, puis vu du dos : le faisceau tordu d’une encoche à l’autre et la lanière de peau crue qui le ligature à la poignée. En bas, la torsion vue en bout de l’arc, le bâtonnet passé entre les brins au milieu et tourné ; et le bout de l’arc vu du dos, les brins qui tournent dans les deux encoches. Encadré danger : l’arc casse vers le visage ; jamais la corde lâchée sans flèche ; l’arc câblé ou réparé s’essaie sur la perche, de côté.',
    format: 'pleine',
    disposition: [['perche', 'cran'], ['cable'], ['torsion', 'bout']],
    hauteurs: [190, 188, 122],
    largeurs: [[7, 3], [1], [1, 1]],
    danger: 'Danger — un arc qui casse renvoie ses éclats et la corde au visage. Jamais la corde lâchée sans flèche : l’énergie reste dans le bois et le casse. Jamais la pleine allonge avant que la courbe soit égale. L’arc câblé ou réparé s’essaie sur la perche, de côté, jamais à la joue.',
    vues: {
      perche: {
        titre: 'Égaliser les bras sur la perche à crans',
        dessin: z => {
          const { cx, y0, hh, L, G, Dr, ep, yN, yF } = repPerche(z);
          const o = [];
          o.push(h.chemin(contourArc(G, Dr, ep, ep), BLC, true));
          // la courbe que le bras droit devrait suivre : celle du gauche
          o.push(h.chemin(G.slice(40).map(p => [2 * cx - p.x, p.y]), h.a.cache));
          // le point plat, là où on gratte le ventre
          const zone = Dr.slice(48, 103);
          o.push(h.chemin(zone.map((p, i) => auVentre(p, 1, ep(48 + i) + 5)), h.a.arete));
          for (const i of [0, zone.length - 1]) o.push(h.ligne(...auVentre(zone[i], 1, ep(48 + i) + 2), ...auVentre(zone[i], 1, ep(48 + i) + 8), h.a.arete));
          // la perche, devant la poignée
          o.push(h.path(`M${cx - 7} ${y0 + 6} L${cx + 7} ${y0 + 6} L${cx + 7} ${yF} ${vague([cx + 7, yF], [cx - 7, yF], 3)} Z`, BL));
          o.push(h.ligne(cx - 7, y0 + 12, cx + 7, y0 + 12, h.a.cache));
          let dC = '';
          for (let y = y0 + 40; y < yF - 6; y += 13) dC += `M${cx - 7} ${y} L${cx + 7} ${y} M${cx - 7} ${y + 2.5} L${cx + 7} ${y + 2.5} `;
          o.push(h.path(dC, h.a.detail));
          // la corde, tirée dans un cran
          const nG = auVentre(G[L - 4], -1, ep(L - 4)), nD = auVentre(Dr[L - 4], 1, ep(L - 4));
          o.push(h.chemin([nG, [cx - 7, yN + 1], [cx + 7, yN + 1], nD], h.a.arete));
          return o.join('\n');
        },
        renvois: z => {
          const { cx, y0, G, Dr, ep, yN } = repPerche(z);
          const g = G[100], m = auVentre(Dr[75], 1, ep(75) + 5);
          return [
            { n: 1, rond: [r1(cx - 50), 13], cible: [r1(cx - 10), r1(y0 + 3)], texte: 'la poignée posée au sommet' },
            { n: 2, rond: [r1(g.x - 4), 13], cible: [r1(g.x), r1(g.y)], texte: 'deux arcs de cercle égaux' },
            { n: 3, rond: [r1(cx - 52), r1(yN + 34)], cible: [r1(cx - 4), r1(yN + 1)], texte: 'la corde tirée d’un cran à la fois' },
            { n: 4, rond: [r1(cx + 114), r1(y0 + 48)], cible: [r1(m[0]), r1(m[1])], texte: 'point plat : on gratte le ventre là' },
          ];
        },
      },

      cran: {
        titre: 'Un cran, de côté',
        dessin: z => {
          const { xg, xf, yT, yF, crans, corde } = repCran(z);
          const face = [[xf, yT]];
          for (const y of crans) face.push([xf, y + 3], [xf - 18, y], [xf, y + 16]);
          face.push([xf, yF]);
          const o = [];
          o.push(h.path(`M${xg} ${yT} ${vague([xg, yT], [xf, yT], 3)} L${pts2d(face.slice(1))} ${vague([xf, yF], [xg, yF], 3)} Z`, BL));
          o.push(h.chemin(face, h.a.contour), h.ligne(xg, yT, xg, yF, h.a.contour));
          o.push(h.cercle(corde[0], corde[1], 3.4, h.a.plein));
          return o.join('\n');
        },
        renvois: z => {
          const { xf, crans, corde } = repCran(z);
          return [
            { n: 5, rond: [z.l - 22, r1(crans[1] - 26)], cible: [r1(corde[0] + 1), r1(corde[1] - 1)], texte: 'la corde se loge au fond du cran' },
            { n: 6, rond: [z.l - 22, r1(crans[2] + 34)], cible: [r1(xf - 4), r1(crans[2] + 12)], texte: 'des crans à quelques centimètres' },
          ];
        },
      },

      cable: {
        titre: 'Le dos câblé de tendon : l’arc bandé de côté, puis vu du dos',
        dessin: z => {
          const { cx, y0, hh, L, G, Dr, ep, yp, la } = repCable(z);
          const o = [];
          // de côté
          o.push(h.chemin(contourArc(G, Dr, ep, ep), BLC, true));
          const nG = auVentre(G[L - 8], -1, ep(L - 8)), nD = auVentre(Dr[L - 8], 1, ep(L - 8));
          o.push(h.ligne(...nG, ...nD, h.a.arete));
          const cable = [...G.slice(0, L - 4).reverse().map(p => auDos(p, -1, 2.6)), ...Dr.slice(0, L - 4).map(p => auDos(p, 1, 2.6))];
          o.push(h.chemin(cable, h.a.contour));
          for (const [B, sg] of [[G, -1], [Dr, 1]])
            o.push(h.ligne(...auDos(B[L - 5], sg, 2.6), ...auVentre(B[L - 10], sg, ep(L - 10) + 1), h.a.contour));
          o.push(ligature(cx - hh, y0 - 6, 2 * hh, 18));
          // vu du dos
          const xs = [...G.slice().reverse(), ...Dr].map(p => p.x);
          const sDe = x => Math.max(0, Math.abs(x - cx) - hh);
          const xnG = G[L - 8].x, xnD = Dr[L - 8].x;
          const yv = (x, sg) => [yp + sg * la(sDe(x)) / 2, yp + sg * (la(sDe(x)) / 2 - 5)];
          const bord = bordDos(xs, yv, [xnG, xnD]);
          o.push(h.chemin([...bord(-1), ...bord(1).reverse()], BLC, true));
          const xfG = G[L - 36].x, xfD = Dr[L - 36].x;
          o.push(faisceau(xfG, cx, yp, 5, 4), faisceau(cx, xfD, yp, 5, -4));
          for (const [xf, xn, sg] of [[xfG, xnG, -1], [xfD, xnD, 1]]) {
            const wn = la(sDe(xn)) / 2 - 5;
            let d = '';
            for (const a of [-4.5, -1.5, 1.5, 4.5]) {
              const yN = yp + Math.sign(a) * wn;
              d += `M${r1(xf)} ${r1(yp + a)} Q${r1(xf + (xn - xf) * 0.6)} ${r1(yp + a)} ${r1(xn - sg * 1)} ${r1(yN)} `;
            }
            o.push(h.path(d, h.a.detail));
          }
          o.push(ligature(cx - hh, yp - 14, 2 * hh, 28));
          o.push(h.cote(G[L].x, yp + 24, Dr[L].x, yp + 24, '1,2 à 1,8 m', { cote: 'dessous' }));
          return o.join('\n');
        },
        renvois: z => {
          const { cx, L, Dr, ep, yp } = repCable(z);
          const p = auDos(Dr[150], 1, 2.6), yR = r1((auVentre(Dr[L - 8], 1, ep(L - 8))[1] + yp - 12) / 2);
          return [
            { n: 7, rond: [r1(p[0] + 22), 12], cible: [r1(p[0]), r1(p[1])], texte: 'câble sur le dos, corde au ventre' },
            { n: 8, rond: [r1(cx - 176), yR], cible: [r1(cx - 150), r1(yp - 3)], texte: 'huit allers-retours d’un bout à l’autre' },
            { n: 9, rond: [r1(cx + 50), yR], cible: [r1(cx + 9), r1(yp - 9)], texte: 'lanière de peau crue à la poignée' },
          ];
        },
      },

      torsion: {
        titre: 'La torsion, au milieu, vue en bout',
        dessin: z => {
          const { cxs, yBot, yS, c, dir } = repTors(z);
          const o = [];
          const dos = Array.from({ length: 21 }, (_, i) => { const x = cxs - 30 + 3 * i; return [x, yS + 2.5 * ((x - cxs) / 30) ** 2]; });
          o.push(h.chemin([...dos, [cxs + 30, yBot], [cxs - 30, yBot]], h.a.hachure('bois', 'contour'), true));
          o.push(h.cercle(c[0], c[1], 7, BL));
          const n = [-dir[1], dir[0]], e = 2;
          const b = k => [c[0] + 14 * k * dir[0], c[1] + 14 * k * dir[1]];
          o.push(h.chemin([[b(1)[0] + e * n[0], b(1)[1] + e * n[1]], [b(1)[0] - e * n[0], b(1)[1] - e * n[1]], [b(-1)[0] - e * n[0], b(-1)[1] - e * n[1]], [b(-1)[0] + e * n[0], b(-1)[1] + e * n[1]]], h.a.plein, true));
          const a0 = -160 * Math.PI / 180, a1 = -20 * Math.PI / 180, r = 23;
          o.push(h.fleche(`M${r1(c[0] + r * Math.cos(a0))} ${r1(c[1] + r * Math.sin(a0))} A${r} ${r} 0 0 1 ${r1(c[0] + r * Math.cos(a1))} ${r1(c[1] + r * Math.sin(a1))}`));
          return o.join('\n');
        },
        renvois: z => {
          const { cxs, yS, c, dir } = repTors(z);
          return [
            { n: 10, rond: [r1(cxs + 88), r1(yS - 6)], cible: [r1(c[0] + 12 * dir[0]), r1(c[1] + 12 * dir[1])], texte: 'bâtonnet entre les brins : deux tours' },
          ];
        },
      },

      bout: {
        titre: 'Au bout, vu du dos',
        dessin: z => {
          const { XT, yc, xn, xf, demi } = repBout(z);
          const o = [];
          const xs = Array.from({ length: 60 }, (_, i) => 14 + (XT - 14) * i / 59);
          const bord = bordDos(xs, (x, sg) => [yc + sg * demi(x), yc + sg * (demi(x) - 6)], [xn]);
          const haut = bord(-1), bas = bord(1).reverse();
          o.push(h.path(`M${pts2d(haut)} L${pts2d(bas)} ${vague(bas[bas.length - 1], haut[0], 3)} Z`, BL));
          o.push(h.chemin(haut, h.a.contour), h.chemin(bas, h.a.contour), h.ligne(XT, yc - demi(XT), XT, yc + demi(XT), h.a.contour));
          o.push(faisceau(14, xf, yc, 6, 4));
          const wn = demi(xn) - 6;
          let d = '';
          for (const a of [-6, -3, 3, 6]) d += `M${r1(xf)} ${r1(yc + a)} Q${r1(xf + (xn - xf) * 0.6)} ${r1(yc + a)} ${r1(xn - 1 + Math.abs(a) / 3)} ${r1(yc + Math.sign(a) * wn)} `;
          o.push(h.path(d, h.a.arete));
          return o.join('\n');
        },
        renvois: z => {
          const { yc, xn, demi } = repBout(z);
          return [
            { n: 11, rond: [r1(xn - 60), z.h - 12], cible: [r1(xn - 3), r1(yc + demi(xn) - 7)], texte: 'un seul tendon, tourné dans les encoches' },
          ];
        },
      },
    },
  };
};
