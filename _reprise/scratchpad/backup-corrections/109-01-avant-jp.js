// Planche 109-01 — palan de corde à quatre brins, et la poulie qu'on fabrique (face + coupe A-A).
// Chapitre 109, § 9 (poulie de bois : joues de bois franc, réa de merisier ou de bouleau jaune,
// axe d'acier plein, gorge ≥ 6 × le diamètre du cordage) et tableau des contrôles (≥ 6 × d).
// Description reconstruite le 12 octobre 2026 (la source d'origine manquait), dessin repris du rendu validé.
module.exports = (h) => {
  const B = h.a.blanc.match(/fill="([^"]+)"/)[1];
  const blanc = t => h.a[t].replace('fill="none"', `fill="${B}"`);
  const mixte = h.a.detail + ' stroke-dasharray="14 3 2 3"';

  // ─── le palan ───
  const R = 24;
  const U1 = [100, 0], U2 = [196, 0], L1 = [52, 0], L2 = [148, 0];
  const palan = z => {
    const oy = 20;
    const yU = oy + 92, yL = oy + 214;            // centres des réas fixes et mobiles
    const out = [];
    // perche
    out.push(h.rect(-4, oy, 290, 20, h.a.hachure('bois', 'contour')));
    // estrope et œil du moufle fixe
    out.push(h.path(`M 116 ${oy + 20} L 120 ${oy + 46} M 128 ${oy + 20} L 124 ${oy + 46}`, h.a.arete));
    out.push(h.cercle(122, oy + 51, 6, h.a.arete));
    out.push(h.ligne(122, oy + 57, 122, oy + 62, h.a.arete));
    // moufle fixe
    out.push(h.path(`M 22 ${oy + 62} H 222 Q 234 ${oy + 62} 234 ${oy + 74} V ${oy + 112} Q 234 ${oy + 124} 222 ${oy + 124} H 22 Q 10 ${oy + 124} 10 ${oy + 112} V ${oy + 74} Q 10 ${oy + 62} 22 ${oy + 62} Z`, blanc('contour')));
    // moufle mobile
    out.push(h.path(`M 26 ${yL - 30} H 174 Q 186 ${yL - 30} 186 ${yL - 18} V ${yL + 18} Q 186 ${yL + 30} 174 ${yL + 30} H 26 Q 14 ${yL + 30} 14 ${yL + 18} V ${yL - 18} Q 14 ${yL - 30} 26 ${yL - 30} Z`, blanc('contour')));
    // réas
    for (const [x, y] of [[U1[0], yU], [U2[0], yU], [L1[0], yL], [L2[0], yL]]) {
      out.push(h.cercle(x, y, R + 3, blanc('contour')), h.cercle(x, y, R - 4, h.a.detail), h.cercle(x, y, 3.5, h.a.detail));
    }
    // ringot du bout mort, sous le moufle fixe
    out.push(h.ligne(28, oy + 124, 28, oy + 132, h.a.arete), h.cercle(28, oy + 137, 5, h.a.arete));
    // la corde : bout mort → sous L1 → sur U1 → sous L2 → sur U2 → brin menant
    const a = 60 * Math.PI / 180, tx = U2[0] + R * Math.cos(-Math.PI / 6), ty = yU + R * Math.sin(-Math.PI / 6);
    const fin = [tx + Math.cos(a) * 205, ty + Math.sin(a) * 205];
    const d = `M 28 ${oy + 142} L 28 ${yL} A ${R} ${R} 0 0 0 76 ${yL} L 76 ${yU} A ${R} ${R} 0 0 1 124 ${yU} L 124 ${yL} A ${R} ${R} 0 0 0 172 ${yL} L 172 ${yU} A ${R} ${R} 0 0 1 ${tx.toFixed(1)} ${ty.toFixed(1)} L ${fin[0].toFixed(1)} ${fin[1].toFixed(1)}`;
    out.push(h.path(d, h.a.contour));
    // œil du moufle mobile, élingue, bille
    const yB = yL + 62;
    out.push(h.ligne(100, yL + 30, 100, yL + 36, h.a.arete), h.cercle(100, yL + 41, 5, h.a.arete));
    out.push(h.path(`M 97 ${yL + 45} L 84 ${yB} M 103 ${yL + 45} L 116 ${yB}`, h.a.arete));
    out.push(h.path(`M -2 ${yB} H 228 A 9 22 0 0 1 228 ${yB + 44} H -2 A 9 22 0 0 1 -2 ${yB} Z`, blanc('contour')));
    out.push(h.ellipse(228, yB + 22, 9, 22, h.a.arete), h.ellipse(228, yB + 22, 4, 11, h.a.detail));
    out.push(h.path(`M 20 ${yB + 12} h 40 M 140 ${yB + 30} h 50 M 150 ${yB + 10} h 30`, h.a.fin));
    out.push(h.path(`M 84 ${yB} Q 80 ${yB + 22} 84 ${yB + 44} M 116 ${yB} Q 120 ${yB + 22} 116 ${yB + 44}`, h.a.arete));
    // la main qui tire, sur le brin menant
    const m = h.formes.main({ x: fin[0] - Math.cos(a) * 14, y: fin[1] - Math.sin(a) * 14, pose: 'prise', vue: 'dos', angle: -30, echelle: 0.42, diametre: 6 });
    out.push(m);
    // flèches du geste : on tire (parallèle au brin menant), la charge monte
    const nx = Math.sin(a) * 16, ny = -Math.cos(a) * 16;
    const p0 = [tx + Math.cos(a) * 70 + nx, ty + Math.sin(a) * 70 + ny], p1 = [tx + Math.cos(a) * 130 + nx, ty + Math.sin(a) * 130 + ny];
    out.push(h.fleche(`M ${p0[0].toFixed(1)} ${p0[1].toFixed(1)} L ${p1[0].toFixed(1)} ${p1[1].toFixed(1)}`, h.a.contour));
    out.push(h.fleche(`M -18 ${yB + 40} L -18 ${yB + 6}`, h.a.contour));
    return out.join('\n');
  };

  // ─── la poulie simple : face et coupe, même échelle, mêmes hauteurs ───
  const Y = { oeil: 34, haut: 56, axe: 150, bas: 236 };
  const RE = 44, RF = 37, dC = 12;                  // réa : rayon extérieur, rayon au fond de gorge ; corde
  const yReaH = Y.axe - RE, yReaB = Y.axe + RE;
  const rappels = (x0, x1) => [Y.haut, yReaH, Y.axe, yReaB].map(y => h.ligne(x0, y, x1, y, h.a.fin)).join('\n');

  const face = z => {
    const cx = z.l - 64, out = [];
    out.push(rappels(cx + 50, z.l));
    out.push(h.ligne(cx, Y.oeil + 8, cx, Y.haut, h.a.arete), h.cercle(cx, Y.oeil, 8, h.a.arete));
    out.push(h.path(`M ${cx - 46} ${Y.haut + 12} Q ${cx - 46} ${Y.haut} ${cx - 34} ${Y.haut} H ${cx + 34} Q ${cx + 46} ${Y.haut} ${cx + 46} ${Y.haut + 12} V ${Y.bas - 12} Q ${cx + 46} ${Y.bas} ${cx + 34} ${Y.bas} H ${cx - 34} Q ${cx - 46} ${Y.bas} ${cx - 46} ${Y.bas - 12} Z`, blanc('contour')));
    out.push(h.cercle(cx, Y.axe, RE, h.a.cache), h.cercle(cx, Y.axe, RF, h.a.cache));
    out.push(h.cercle(cx, Y.axe, 7, h.a.arete), h.cercle(cx, Y.haut + 12, 4, h.a.detail));
    // trait de coupe A-A
    out.push(h.ligne(cx, 12, cx, Y.bas + 22, mixte));
    out.push(h.ligne(cx, 12, cx, 20, h.a.contour), h.ligne(cx, Y.bas + 14, cx, Y.bas + 22, h.a.contour));
    out.push(h.texte(cx + 12, 22, 'A'), h.texte(cx + 12, Y.bas + 22, 'A'));
    return out.join('\n');
  };

  const coupe = z => {
    const cx = 82, e = 14, j = 2, wR = 30, out = [];
    out.push(rappels(-46, cx - wR / 2 - j - e - 28));
    const xg = cx - wR / 2 - j - e, xd = cx + wR / 2 + j;
    // œil vu par la tranche, entretoise du haut
    out.push(h.rect(cx - 3, Y.oeil - 8, 6, 16, h.a.arete), h.ligne(cx, Y.oeil + 8, cx, Y.haut, h.a.arete));
    out.push(h.rect(xg + e, Y.haut + 8, xd - xg - e, 8, h.a.hachure('metal', 'arete')));
    // joues
    out.push(h.rect(xg, Y.haut, e, Y.bas - Y.haut, h.a.hachure('bois', 'contour')));
    out.push(h.rect(xd, Y.haut, e, Y.bas - Y.haut, h.a.hachure('bois', 'contour')));
    // réa coupé, gorge ronde en haut et en bas
    const g = (wR / 2) - 0.5, rg = dC / 2 + 1, yh = yReaH, yb = yReaB, x0 = cx - wR / 2, x1 = cx + wR / 2;
    const yhG = Y.axe - RF, ybG = Y.axe + RF;
    out.push(h.path(`M ${x0} ${yh} H ${cx - rg} A ${rg} ${rg} 0 0 0 ${cx + rg} ${yh} H ${x1} V ${yb} H ${cx + rg} A ${rg} ${rg} 0 0 0 ${cx - rg} ${yb} H ${x0} Z`, h.a.hachure('bois', 'contour')));
    // corde logée dans la gorge du haut
    out.push(h.cercle(cx, yhG - dC / 2 + 1, dC / 2, h.a.plein));
    // axe d'acier : tête à gauche, écrou à droite
    out.push(h.rect(xg - 6, Y.axe - 7, xd + e + 12 - xg, 14, h.a.hachure('metal', 'arete')));
    out.push(h.rect(xg - 10, Y.axe - 12, 4, 24, h.a.arete), h.rect(xd + e + 6, Y.axe - 12, 4, 24, h.a.arete));
    // cotes
    out.push(h.cote(xd + e + 22, yhG, xd + e + 22, ybG, 'Ø ≥ 6 d', { cote: 'droite' }));
    out.push(h.ligne(cx + rg, yhG, xd + e + 26, yhG, h.a.fin), h.ligne(cx + rg, ybG, xd + e + 26, ybG, h.a.fin));
    // d : la corde, cotée à gauche de la joue, ses lignes d'attache traversant la joue en trait fin
    const yr0 = yhG - dC + 1, yr1 = yhG + 1;
    out.push(h.ligne(cx - dC / 2, yr0, xg - 18, yr0, h.a.fin), h.ligne(cx - dC / 2, yr1, xg - 18, yr1, h.a.fin));
    out.push(h.cote(xg - 14, yr0, xg - 14, yr1, 'd', { cote: 'gauche' }));
    out.__g = { xg, xd, e, cx, yb, ybG };
    return out.join('\n');
  };

  // mise à l'échelle des vues dessinées en unités propres
  const SP = 0.97, DXP = 150, SF = 1.05;
  const enG = (k, dx, dy, fn) => z => `<g transform="translate(${dx} ${dy}) scale(${k})">\n${fn({ l: z.l / k, h: z.h / k })}\n</g>`;
  const pts = (k, dx, dy, fn) => z => fn({ l: z.l / k, h: z.h / k }).map(r => ({ ...r, rond: [r.rond[0] * k + dx, r.rond[1] * k + dy], cible: [r.cible[0] * k + dx, r.cible[1] * k + dy] }));

  return {
    ref: '109-01',
    fichier: 'planche-109-01-mouflage.svg',
    titre: 'Palan de corde à quatre brins',
    desc: "Palan de corde fabriqué, quatre brins, pendu à une perche par une estrope. En haut, le moufle fixe : deux réas, un œil au-dessus et un ringot en dessous, à gauche, où le bout mort est frappé. En bas, le moufle mobile : deux réas, un œil en dessous qui porte une bille par une élingue. La corde part du ringot, passe sous le premier réa mobile, par-dessus le premier réa fixe, sous le second réa mobile, par-dessus le second réa fixe, et ressort en brin menant, en oblique jusqu'à la main qui tire. Une flèche le long du brin menant dit qu'on tire vers le bas à droite ; une flèche verticale à gauche de la bille dit que la charge monte. À droite, une poulie simple à fabriquer, en deux vues à la même échelle reliées par des traits de rappel : de face, les joues, l'œil en haut, l'axe, le réa en tireté derrière la joue avant, et un trait de coupe vertical A-A par l'axe ; puis la coupe A-A : deux joues de bois franc, le réa de merisier ou de bouleau jaune entre elles, l'axe d'acier qui traverse les trois, une gorge ronde en haut où loge la corde, cotée d, et une gorge vide en bas. Le diamètre du réa au fond de gorge est coté : au moins six fois d.",
    format: 'pleine',
    disposition: [['palan'], ['face', 'coupe']],
    hauteurs: [10, 9],
    vues: {
      palan: {
        dessin: enG(SP, DXP, 0, palan),
        renvois: pts(SP, DXP, 0, z => [
          { n: 1, rond: [0, 157], cible: [24, 157], texte: 'bout mort, frappé au moufle fixe' },
          { n: 2, rond: [0, 258], cible: [30, 244], texte: 'sous le premier réa mobile' },
          { n: 3, rond: [40, 34], cible: [80, 92], texte: 'par-dessus le premier réa fixe' },
          { n: 4, rond: [214, 270], cible: [168, 244], texte: 'sous le second réa mobile' },
          { n: 5, rond: [262, 64], cible: [212, 88], texte: 'par-dessus le second réa fixe' },
          { n: 6, rond: [312, 170], cible: [270, 190], texte: 'brin menant, on tire ici' },
        ]),
      },
      face: { titre: 'De face', dessin: enG(SF, 0, 0, face) },
      coupe: {
        titre: 'Coupe A-A',
        dessin: enG(SF, 0, 0, coupe),
        renvois: pts(SF, 0, 0, z => {
          const cx = 82, xg = cx - 15 - 2 - 14, xd = cx + 15 + 2;
          return [
            { n: 7, rond: [xg - 6, 252], cible: [xg + 7, 222], texte: 'joue de bois franc' },
            { n: 8, rond: [xd + 44, 66], cible: [cx + 7, 128], texte: 'réa de merisier ou de bouleau jaune' },
            { n: 9, rond: [xd + 40, 220], cible: [cx + 4, Y.axe + RF + 2], texte: 'gorge ronde, jamais à fond plat' },
            { n: 10, rond: [xd + 44, 112], cible: [xd + 20, Y.axe - 4], texte: "axe d'acier plein" },
          ];
        }),
      },
    },
  };
};
