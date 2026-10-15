// Planche 05-01. La chaudière à bascule contre les souris (chapitre 5, §9, « Les rongeurs sans pièges et sans
// laine d'acier » : « La chaudière à bascule » et « Boucher »). Dessinée le 15 octobre 2026 (inventaire des
// planches, priorité moyenne).
// Tout vient du texte : chaudière de 20 L, broche raide tendue en travers du haut et fixée aux deux bords, canette
// vide enfilée sur la broche qui tourne librement, un doigt de gras ou de beurre d'arachide au milieu de la
// canette, planche du sol au rebord ; la chaudière reste sèche l'hiver ; le trou bouché d'un bout de conserve
// aplati cloué dessus. Aucune cote : le chapitre ne donne que les 20 L.
// Ce que la planche dessine en principe : la broche passée dans deux trous percés sous le rebord et tortillée
// dehors ; la broche par le milieu des deux bouts de la canette.
// La souris (refaite le 15 octobre : les premières, construites, étaient des gribouillis) : la silhouette de
// Peromyscus leucopus d'Edwin Price, PhyloPic, CC BY 4.0 (images/modeles/souris-peromyscus-phylopic.svg), posée
// au trait par _souris.js ; la même dans les deux vignettes. Le gras n'est dessiné que sur la vue montée.
// La charte : le cercle rouge, la canette qui doit tourner libre sur la broche (le point à contrôler).
module.exports = (h) => {
  const A = h.a;
  const f1 = v => Math.round(v * 10) / 10;
  const W = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const RAD = Math.PI / 180;
  const lisse = (pts, ferme = false) => {
    const n = pts.length, P = i => ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
    let d = `M${f1(pts[0][0])} ${f1(pts[0][1])}`;
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
      d += ` C${f1(p1[0] + (p2[0] - p0[0]) / 6)} ${f1(p1[1] + (p2[1] - p0[1]) / 6)} ${f1(p2[0] - (p3[0] - p1[0]) / 6)} ${f1(p2[1] - (p3[1] - p1[1]) / 6)} ${f1(p2[0])} ${f1(p2[1])}`;
    }
    return ferme ? d + ' Z' : d;
  };

  // La souris : la silhouette de Peromyscus leucopus (Edwin Price, PhyloPic, CC BY 4.0), au trait (_souris.js).
  const souris = require('./_souris')(h);

  // ─── Monté : la chaudière, la broche, la canette, la planche ─────────────────────────────────────
  const M = z => {
    const cx = 330, yR = 92, rx = 118, ry = 44, yB = z.h - 16, rbx = 102, rby = 30;
    const yW = yR;                                // la broche, juste sous le rebord
    const cl = 49, cr = 26;                           // la canette : demi-longueur, rayon
    return { cx, yR, rx, ry, yB, rbx, rby, yW, cl, cr };
  };
  const monte = z => {
    const g = M(z), o = [];
    const { cx, yR, rx, ry, yB, rbx, rby, yW, cl, cr } = g;
    // le sol
    o.push(h.ligne(0, yB + 2, z.l, yB + 2, A.arete));
    // l'intérieur de la chaudière (le dedans du rebord, loin) et l'arrière du rebord
    o.push(h.ellipse(cx, yR, rx, ry, A.loin));
    o.push(h.path(`M${cx - rx} ${yR} A${rx} ${ry} 0 0 1 ${cx + rx} ${yR}`, A.arete));
    // la broche, d'un bord à l'autre, et ses tortillons dehors
    o.push(h.ligne(cx - rx - 2, yW, cx + rx + 2, yW, A.arete));
    for (const s of [-1, 1]) {
      const x0 = cx + s * (rx + 2);
      o.push(h.path(`M${f1(x0)} ${yW} C${f1(x0 + s * 10)} ${yW - 2} ${f1(x0 + s * 10)} ${yW + 12} ${f1(x0 + s * 2)} ${yW + 10} C${f1(x0 - s * 4)} ${yW + 9} ${f1(x0 + s * 4)} ${yW + 20} ${f1(x0 + s * 12)} ${yW + 22}`, A.arete));
    }
    // la canette, couchée sur la broche : le bout gauche caché, le bout droit vu, la broche par son milieu
    const e = 8;
    o.push(h.path(`M${cx - cl} ${yW - cr} L${cx + cl} ${yW - cr} A${e} ${cr} 0 0 1 ${cx + cl} ${yW + cr} L${cx - cl} ${yW + cr} A${e} ${cr} 0 0 1 ${cx - cl} ${yW - cr} Z`, W(A.contour)));
    o.push(h.ellipse(cx + cl, yW, e, cr, W(A.arete)));
    o.push(h.ellipse(cx + cl, yW, e * 0.72, cr * 0.8, A.fin));
    o.push(h.path(`M${cx - cl + 9} ${yW - cr + 2} A${e} ${cr - 2} 0 0 0 ${cx - cl + 9} ${yW + cr - 2}`, A.fin));
    o.push(h.ligne(cx + cl, yW, cx + cl + 6, yW, A.arete));
    o.push(h.cercle(cx + cl, yW, 2.2, A.plein));
    // le gras au milieu, sur le dessus
    o.push(h.path(lisse([[cx - 16, yW - cr + 1], [cx - 8, yW - cr - 5], [cx + 4, yW - cr - 6], [cx + 15, yW - cr - 3], [cx + 18, yW - cr + 3], [cx + 4, yW - cr + 6], [cx - 12, yW - cr + 5]], true), A.hachure('terre', 'arete')));
    // la chaudière : la paroi d'avant passe devant le bas de la canette
    const corps = `M${cx - rx} ${yR} A${rx} ${ry} 0 0 0 ${cx + rx} ${yR} L${cx + rbx} ${yB - rby} A${rbx} ${rby} 0 0 1 ${cx - rbx} ${yB - rby} Z`;
    o.push(h.path(corps, W(A.contour)));
    // la face à l'ombre, à droite : entre deux génératrices, fermée en haut et en bas sur les deux ellipses
    const xo = 24, yoH = yR + ry * Math.sqrt(1 - ((rx - xo) / rx) ** 2), yoB = yB - rby + rby * Math.sqrt(1 - ((rbx - xo * rbx / rx) / rbx) ** 2);
    o.push(h.path(`M${f1(cx + rx - xo)} ${f1(yoH)} L${f1(cx + rbx - xo * rbx / rx)} ${f1(yoB)} A${rbx} ${rby} 0 0 0 ${cx + rbx} ${yB - rby} L${cx + rx} ${yR} A${rx} ${ry} 0 0 1 ${f1(cx + rx - xo)} ${f1(yoH)} Z`, A.ombre));
    o.push(h.path(corps, A.contour));
    // le rebord roulé, devant
    o.push(h.path(`M${cx - rx + 1} ${yR + 7} A${rx - 1} ${ry} 0 0 0 ${cx + rx - 1} ${yR + 7}`, A.detail));
    // les trous de la broche, sous le rebord
    for (const s of [-1, 1]) o.push(h.cercle(cx + s * (rx - 1), yW, 2.2, A.plein));
    // l'anse, couchée derrière
    // la planche, du sol au rebord gauche
    const p0 = [40, yB + 2], p1 = [cx - rx + 6, yR - 2];
    const u = [p1[0] - p0[0], p1[1] - p0[1]], L = Math.hypot(...u), n = [u[1] / L, -u[0] / L];
    const ep = 7, la = 14;
    const pl = [p0, p1, [p1[0] - n[0] * 0 + 0, p1[1]], p0];
    o.push(h.chemin([[p0[0], p0[1]], [p1[0], p1[1]], [p1[0] - la * 0.5, p1[1] - la * 0.6], [p0[0] - la * 0.5, p0[1] - la * 0.6]], W(A.arete), true));
    o.push(h.chemin([[p0[0], p0[1]], [p1[0], p1[1]], [p1[0] + n[0] * -ep, p1[1] + n[1] * -ep], [p0[0] + n[0] * -ep, p0[1] + n[1] * -ep]], A.ombre, true));
    o.push(h.chemin([[p0[0], p0[1]], [p1[0], p1[1]], [p1[0] + n[0] * -ep, p1[1] + n[1] * -ep], [p0[0] + n[0] * -ep, p0[1] + n[1] * -ep]], A.arete, true));
    return { svg: o.join('\n'), g, P: { planche: [p0[0] + u[0] * 0.72 + 3, p0[1] + u[1] * 0.72 - 5] } };
  };

  // ─── Avant, après : la chaudière en coupe, vue dans l'axe de la broche ───────────────────────────
  const C = z => ({ cx: z.l / 2, yR: 86, yB: z.h - 8, rT: 76, rB: 64, rc: 26 });
  const coupe = (z, apres) => {
    const g = C(z), o = [];
    const { cx, yR, yB, rT, rB, rc } = g;
    const ep = 2.6;
    o.push(h.chemin([[cx - rT, yR], [cx + rT, yR], [cx + rB, yB], [cx - rB, yB]], A.loin, true));
    for (const s of [-1, 1]) {
      o.push(h.chemin([[cx + s * rT, yR], [cx + s * (rT + ep), yR], [cx + s * (rB + ep), yB], [cx + s * rB, yB]], A.plein, true));
      o.push(h.chemin([[cx + s * (rT + ep), yR], [cx + s * (rT + ep + 5), yR + 2], [cx + s * (rT + ep + 5), yR + 9], [cx + s * (rT + ep), yR + 9]], A.plein, true));
    }
    o.push(h.rect(cx - rB - ep, yB, 2 * (rB + ep), ep, A.plein));
    // la broche (vue par le bout) et la canette
    const yC = yR + 8;
    o.push(h.cercle(cx, yC, rc, W(A.contour)));
    o.push(h.cercle(cx, yC, rc - 4, A.fin));
    o.push(h.cercle(cx, yC, 2.2, A.plein));
    if (!apres) {
      // tournée vers la gauche, les pattes sur le dessus de la canette ; la canette commence à tourner à droite
      o.push(souris({ x: cx + 2, y: yC - rc + 2, largeur: 62, angle: 12, miroir: true }));
      o.push(h.fleche(`M${f1(cx + rc + 10)} ${f1(yC + 2)} A${rc + 10} ${rc + 10} 0 0 1 ${f1(cx + 12)} ${f1(yC + rc + 8)}`, A.detail));
    } else {
      o.push(h.fleche(`M${f1(cx + rc + 10)} ${f1(yC + 2)} A${rc + 10} ${rc + 10} 0 0 1 ${f1(cx + 12)} ${f1(yC + rc + 8)}`, A.detail));
      o.push(h.fleche(`M${f1(cx + 46)} ${f1(yC + 20)} L${f1(cx + 46)} ${f1(yB - 56)}`, A.arete));
      o.push(souris({ x: cx - 4, y: yB - 9, largeur: 62, miroir: true }));
    }
    return { svg: o.join('\n'), g: { ...g, yC } };
  };

  // ─── Boucher : un bout de conserve aplati, cloué sur le trou ─────────────────────────────────────
  const boucher = z => {
    const o = [];
    const x0 = 10, x1 = z.l - 10, y0 = 14, y1 = z.h - 10;
    // le bas d'un mur de planches, le plancher
    o.push(h.rect(x0, y0, x1 - x0, y1 - y0 - 30, W(A.arete)));
    for (const y of [y0 + 52, y0 + 104, y0 + 156]) if (y < y1 - 34) o.push(h.ligne(x0, y, x1, y, A.arete));
    for (const [y, l] of [[y0 + 20, 60], [y0 + 36, 90], [y0 + 76, 50], [y0 + 128, 70], [y0 + 178, 40]]) if (y < y1 - 34) o.push(h.ligne(x0 + 30, y, x0 + 30 + l, y, A.fin));
    o.push(h.rect(x0, y1 - 30, x1 - x0, 30, A.hachure('bois', 'arete')));
    // le trou, au ras du plancher, caché sous la tôle (tireté)
    const cx = z.l / 2, yT = y1 - 30;
    // la tôle aplatie, ses côtes de boîte, et les clous
    const tx0 = cx - 50, tx1 = cx + 50, ty0 = yT - 74, ty1 = yT - 4;
    o.push(h.path(`M${tx0 + 6} ${ty0} L${tx1 - 4} ${ty0 + 2} Q${tx1} ${ty0 + 3} ${tx1} ${ty0 + 8} L${tx1 - 1} ${ty1 - 5} Q${tx1 - 1} ${ty1} ${tx1 - 6} ${ty1} L${tx0 + 4} ${ty1 - 1} Q${tx0} ${ty1 - 1} ${tx0} ${ty1 - 6} L${tx0 + 1} ${ty0 + 5} Q${tx0 + 1} ${ty0} ${tx0 + 6} ${ty0} Z`, `fill="#FFFFFF" stroke="#1A1A1A" stroke-width="2.4" stroke-linejoin="round"`));
    for (const y of [ty0 + 16, ty0 + 30, ty0 + 44, ty0 + 58]) o.push(h.ligne(tx0 + 6, y, tx1 - 6, y + 1, A.fin));
    o.push(h.path(`M${cx - 18} ${yT} Q${cx - 18} ${yT - 26} ${cx} ${yT - 28} Q${cx + 20} ${yT - 26} ${cx + 18} ${yT}`, A.cache));
    for (const [x, y] of [[tx0 + 8, ty0 + 8], [tx1 - 8, ty0 + 9], [tx0 + 8, ty1 - 8], [tx1 - 9, ty1 - 8], [cx, ty0 + 7], [cx, ty1 - 7]]) {
      o.push(h.cercle(x, y, 3.2, W(A.arete)), h.cercle(x, y, 0.9, A.plein));
    }
    return { svg: o.join('\n'), P: { tole: [tx1 - 14, ty0 + 24], trou: [cx + 12, yT - 18] } };
  };

  return {
    ref: '05-01',
    titre: 'La chaudière à bascule contre les souris',
    desc: 'En haut, la chaudière de 20 L posée au sol, vide et sèche. Une broche raide passe dans deux trous sous le rebord, d’un bord à l’autre, tortillée dehors ; une canette vide est enfilée sur la broche par le milieu de ses deux bouts, couchée en travers du haut de la chaudière ; un doigt de gras sur le dessus, au milieu. Le bout de la canette, où passe la broche, est cerclé de rouge : elle doit tourner libre. Une planche appuyée du sol au rebord ; une souris la monte. En bas, la chaudière coupée, vue dans l’axe de la broche : la souris sur la canette qui commence à tourner ; puis la canette tournée, le gras de côté, la souris au fond. À droite, le bas d’un mur de planches : un bout de conserve aplati cloué de six clous par-dessus un trou au ras du plancher, dessiné en tireté sous la tôle.',
    format: 'pleine',
    disposition: [['monte'], ['avant', 'apres', 'boucher']],
    hauteurs: [1.55, 1],
    vues: {
      monte: {
        titre: 'Montée',
        dessin: z => { const m = monte(z); const { cx, yW, cl } = m.g; return m.svg + '\n' + h.controle(cx + cl, yW, 13); },
        renvois: z => {
          const { g, P } = monte(z);
          const { cx, yR, rx, yB, yW, cl, cr } = g;
          return [
            { n: 1, rond: [z.l - 24, yB - 60], cible: [cx + 90, yB - 60], texte: 'chaudière de 20 L, sèche' },
            { n: 2, rond: [z.l - 24, yW + 30], cible: [cx + rx + 8, yW + 14], texte: 'broche raide, fixée aux deux bords' },
            { n: 3, rond: [cx + 120, 18], cible: [cx + cl + 6, yW - 14], texte: 'canette enfilée, qui tourne libre' },
            { n: 4, rond: [cx - 40, 16], cible: [cx - 8, yW - cr - 4], texte: 'gras ou beurre d’arachide, au milieu' },
            { n: 5, rond: [70, yR + 40], cible: P.planche, texte: 'planche du sol au rebord' },
          ];
        },
      },
      avant: {
        titre: 'Elle marche sur la canette',
        dessin: z => coupe(z, false).svg,
      },
      apres: {
        titre: 'La canette roule, elle tombe',
        dessin: z => coupe(z, true).svg,
      },
      boucher: {
        titre: 'Boucher le trou',
        dessin: z => boucher(z).svg,
        renvois: z => {
          const { P } = boucher(z);
          return [
            { n: 6, rond: [z.l - 20, 22], cible: P.tole, texte: 'bout de conserve aplati, cloué' },
            { n: 7, rond: [24, z.h - 52], cible: P.trou, texte: 'le trou, dessous' },
          ];
        },
      },
    },
  };
};
