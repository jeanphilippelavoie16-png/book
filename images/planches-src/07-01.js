// Planche 07-01. L'obturateur de drain, étayé contre la solive (chapitre 7, section 7, « Boucher le drain de plancher
// sans obturateur »).
// Dessinée le 15 octobre 2026 (inventaire des planches, priorité moyenne).
// Le texte : un bouchon de bois enveloppé d'un chiffon, enfoncé dans le renvoi ; un 2 × 4 coupé à peine plus
// long que la hauteur, coincé en force entre le bouchon et la solive du plafond ; le refoulement pousse vers le haut.
// Aucune cote : le chapitre n'en donne pas. Le sous-sol est dessiné à ses proportions ordinaires (environ 2,2 m du
// plancher de béton au dessous des solives, un 2 × 4 pour l'étai, une solive de 2 × 8), sans les chiffrer.
// Ce que la planche tranche par la géométrie : une pièce plus longue que l'écart ne passe que penchée ; posée sur
// le bouchon, le haut contre la solive, on frappe le haut le long de la solive jusqu'à l'aplomb, et elle se coince.
// Le bouchon dépasse un peu du plancher : sinon l'étai porte sur le béton et non sur le bouchon.
// Pas de main : à l'échelle de la scène, la main ferait un centimètre ; le marteau seul et la flèche rouge.
// 19 octobre 2026 : le marteau pendait à côté du haut de l'étai sans le toucher. Il frappe : la panne contre le
// chant de l'étai, le manche qui descend en biais vers la droite (la tête est perpendiculaire au manche ; pour un coup
// vers la gauche, le manche ne peut pas être horizontal dans cette vue). Le marteau est à l'échelle de la scène.
// Le marteau (refait le 15 octobre : un rectangle et un bâton) : un marteau de charpentier de côté, construit sur ses
// proportions (tête, panne, pied-de-biche recourbé, manche galbé). Le chiffon se lit en coupe : une bande tissée
// entre le bois du bouchon et la fonte du drain.
// Le raté du texte (le sac de sable posé dessus) n'est pas dessiné : la planche montre ce qui tient.
// Règle 11 (19 octobre) : le cercle rouge sur le bouchon a son repère (1) : le bouchon dépasse, l'étai porte dessus.
module.exports = (h) => {
  const A = h.a;
  const f1 = v => Math.round(v * 10) / 10;
  const W = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const RAD = Math.PI / 180;
  // Le chiffon en coupe : une trame tissée (des chevrons), distincte du bois hachuré à côté.
  const TISSU = `<defs><pattern id="vue-tissu" width="6" height="4.5" patternUnits="userSpaceOnUse"><path d="M0 1 L3 3.5 L6 1" fill="none" stroke="#1A1A1A" stroke-width="0.5"/></pattern></defs>`;
  const tissu = 'fill="url(#vue-tissu)" stroke="#1A1A1A" stroke-width="1.4" stroke-linejoin="round"';

  // ─── Le détail : le bouchon dans le renvoi, le pied de l'étai dessus (1 unité par mm) ─────────
  const D = z => {
    const cx = z.l / 2, yF = 300, ep = 100;           // plancher de béton : dessus à yF, 10 cm d'épaisseur
    const rG = 70, rT = 38, rP = 51;                   // demi-largeurs : la cuvette au plancher, la gorge, le tuyau
    const yB = yF - 14;                                // le dessus du bouchon dépasse du plancher
    return { cx, yF, ep, rG, rT, rP, yB, yS: yF + ep };
  };
  const detail = z => {
    const g = D(z), o = [];
    const { cx, yF, ep, rG, rT, rP, yB, yS } = g;
    // sous la dalle : le remblai, de part et d'autre du tuyau
    o.push(h.rect(0, yS, cx - rT - 5, z.h - yS, A.hachure('gravier', 'aucun')));
    o.push(h.rect(cx + rT + 5, yS, z.l - cx - rT - 5, z.h - yS, A.hachure('gravier', 'aucun')));
    // la dalle, coupée, de part et d'autre de la cuvette
    const yC = yF + 26;                                // le fond de la cuvette, où commence la gorge
    o.push(h.chemin([[0, yF], [cx - rG, yF], [cx - rT - 6, yC], [cx - rT - 6, yS], [0, yS]], A.hachure('pierre', 'arete'), true));
    o.push(h.chemin([[z.l, yF], [cx + rG, yF], [cx + rT + 6, yC], [cx + rT + 6, yS], [z.l, yS]], A.hachure('pierre', 'arete'), true));
    // le corps du drain : la cuvette et la gorge en fonte (plein), puis le tuyau qui descend et le siphon
    for (const s of [-1, 1]) {
      o.push(h.chemin([[cx + s * rG, yF], [cx + s * (rG - 8), yF], [cx + s * rT, yC], [cx + s * rT, yS + 8], [cx + s * (rT + 6), yS + 8], [cx + s * (rT + 6), yC], [cx + s * (rG - 2), yF + 1]], A.plein, true));
    }
    // le tuyau qui descend, en coupe (parois en plein), plein de l'eau qui refoule ; il sort de la vue en bas
    const yT = yS + 8, gIn = cx - rT, dIn = cx + rT, paroi = 5;
    o.push(h.rect(gIn, yB + 118, 2 * rT, z.h - yB - 118, A.blanc));
    o.push(h.rect(gIn, yB + 118, 2 * rT, z.h - yB - 118, A.hachure('eau', 'aucun')));
    for (const s of [-1, 1]) o.push(h.rect(s < 0 ? gIn - paroi : dIn, yT, paroi, z.h - yT, A.plein));
    // la poussée de l'eau, sous le bouchon
    o.push(h.fleche(`M${cx} ${yB + 200} L${cx} ${yB + 132}`, A.arete));
    o.push(h.fleche(`M${cx - 20} ${yB + 196} L${cx - 20} ${yB + 140}`, A.detail));
    o.push(h.fleche(`M${cx + 20} ${yB + 196} L${cx + 20} ${yB + 140}`, A.detail));
    // le bouchon de bois, effilé, enveloppé du chiffon, enfoncé dans la gorge : en coupe, le chiffon est la bande
    // tissée entre le bois et la fonte ; il serre à l'entrée de la gorge
    const yBb = yB + 110, wT = rT + 3, wB = rT - 10, c = 6;
    const w = y => wT + (wB - wT) * (y - yB) / (yBb - yB);
    const yc0 = yB + 7;
    // le bord du chiffon : à c du bois, écrasé contre la fonte dans la gorge
    const bord = [];
    for (let y = yc0; y <= yBb + 0.1; y += 5) bord.push([y >= yC ? Math.min(w(y) + c, rT) : w(y) + c, y]);
    const gauche = bord.map(([x, y]) => [cx - x, y]), droite = bord.map(([x, y]) => [cx + x, y]).reverse();
    o.push(TISSU);
    o.push(h.path(`M${f1(cx - w(yc0))} ${f1(yc0 - 3)} ` + gauche.map(p => `L${f1(p[0])} ${f1(p[1])}`).join(' ')
      + ` Q${f1(cx - wB - c)} ${f1(yBb + c)} ${f1(cx - wB)} ${f1(yBb + c)} L${f1(cx + wB)} ${f1(yBb + c)} Q${f1(cx + wB + c)} ${f1(yBb + c)} ${f1(droite[0][0])} ${f1(droite[0][1])} `
      + droite.map(p => `L${f1(p[0])} ${f1(p[1])}`).join(' ') + ` L${f1(cx + w(yc0))} ${f1(yc0 - 3)} Z`, tissu));
    const bouchon = [[cx - wT, yB], [cx + wT, yB], [cx + wB, yBb], [cx - wB, yBb]];
    o.push(h.chemin(bouchon, A.blanc, true), h.chemin(bouchon, A.hachure('bois', 'contour'), true));
    // le pied de l'étai, posé sur le bouchon ; il monte et sort de la vue (cassure en haut)
    const rE = 44;
    const yH = 28;
    o.push(h.path(`M${f1(cx - rE)} ${yB} L${f1(cx - rE)} ${yH} L${f1(cx - rE / 3)} ${yH - 8} L${f1(cx + rE / 3)} ${yH + 6} L${f1(cx + rE)} ${yH - 4} L${f1(cx + rE)} ${yB}`, W(A.contour)));
    for (const dx of [-24, -6, 14, 30]) o.push(h.ligne(cx + dx, yH + 22, cx + dx + 1, yB - 18, A.detail));
    o.push(h.controle(cx, yB, 10));
    return { svg: o.join('\n'), g: { ...g, yBb, yC, wB, c } };
  };

  // ─── Le marteau de charpentier, de côté : la tête à l'horizontale, la panne (le côté qui frappe) vers la
  // gauche, le pied-de-biche recourbé à droite, le manche galbé qui descend. Construit en mm sur les proportions
  // d'un marteau de 16 oz : tête de 125 mm, manche de 330 mm. (xF, yA) : le centre de la panne.
  const lisse = (pts, ferme = false) => {
    const n = pts.length, P = i => ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
    let d = `M${f1(pts[0][0])} ${f1(pts[0][1])}`;
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
      d += ` C${f1(p1[0] + (p2[0] - p0[0]) / 6)} ${f1(p1[1] + (p2[1] - p0[1]) / 6)} ${f1(p2[0] - (p3[0] - p1[0]) / 6)} ${f1(p2[1] - (p3[1] - p1[1]) / 6)} ${f1(p2[0])} ${f1(p2[1])}`;
    }
    return ferme ? d + ' Z' : d;
  };
  const marteau = (xF, yA, k, a = 0) => {
    // u : de la panne vers le pied-de-biche ; v : vers le bas ; a : tourné de a degrés (négatif : le manche part à droite)
    const ca = Math.cos(a * RAD), sa = Math.sin(a * RAD);
    const T = ([u, v]) => [xF + (u * ca - v * sa) * k, yA + (u * sa + v * ca) * k];
    const o = [];
    // le manche : il part de l'œil, s'amincit, puis s'élargit dans la main et finit arrondi
    const g = [[42, 12], [43, 70], [44, 150], [43, 230], [41, 292], [44, 318]], dr = [[58, 12], [57, 70], [56, 150], [59, 230], [63, 292], [60, 318]];
    o.push(h.path(lisse(g.map(T)) + ` Q${T([52, 330]).map(f1).join(' ')} ${T(dr[5]).map(f1).join(' ')}` + lisse(dr.slice().reverse().map(T)).replace(/^M[^C]*/, ' L' + T(dr[5]).map(f1).join(' ')), W(A.arete)));
    // la tête : la panne, le col, l'œil, le pied-de-biche recourbé vers le bas
    const tete = [[0, -12], [9, -12], [12, -9], [26, -9], [32, -13], [64, -13], [86, -10], [104, -3], [118, 8], [124, 20],
      [116, 14], [102, 7], [86, 5], [70, 9], [64, 13], [32, 13], [26, 9], [12, 9], [9, 12], [0, 12]];
    o.push(h.chemin(tete.map(T), W(A.contour).replace('stroke-width="2.4"', 'stroke-width="1.6"'), true));
    o.push(h.ligne(...T([9, -12]), ...T([9, 12]), A.detail));                 // le bord de la panne
    o.push(h.path(lisse([[70, 1], [88, -1], [106, 4], [118, 14]].map(T)), A.fin));   // la fente du pied-de-biche
    return { svg: o.join('\n'), manche: T([56, 200]), coin: T([0, -12]), dessus: T([64, -13]) };
  };

  // ─── La scène : le sous-sol, la solive vue de côté (0,24 unité par mm) ─────────────────────────
  const s = 0.24;
  const S = z => {
    const yP = 8, yJ = yP + 19 * s + 6, yJb = yJ + 184 * s;   // le plancher du dessus, la solive de 2 × 8
    const yF = yJb + 2200 * s, xD = 70;                       // le plancher de béton ; le drain
    return { yP, yJ, yJb, yF, xD, eE: 89 * s };
  };
  const scene = (z, penche) => {
    const g = S(z), o = [];
    const { yJ, yJb, yF, xD, eE } = g;
    // le plancher du dessus et la solive, vue de côté
    o.push(h.rect(0, yJ - 6, z.l, 6, A.hachure('bois', 'arete')));
    o.push(h.rect(0, yJ, z.l, yJb - yJ, W(A.arete)));
    for (const k of [0.3, 0.62]) o.push(h.ligne(6, yJ + k * (yJb - yJ), z.l - 6, yJ + k * (yJb - yJ) + 1, A.fin));
    // le plancher de béton, le drain dans le plancher, le bouchon qui dépasse
    o.push(h.rect(0, yF, z.l, 24, A.hachure('pierre', 'aucun')));
    o.push(h.ligne(0, yF, xD - 17, yF, A.contour), h.ligne(xD + 17, yF, z.l, yF, A.contour));
    o.push(h.chemin([[xD - 17, yF], [xD - 10, yF + 7], [xD + 10, yF + 7], [xD + 17, yF]], A.arete));
    const yBo = yF - 14 * s;
    o.push(h.chemin([[xD - 12, yBo], [xD + 12, yBo], [xD + 9, yF + 10], [xD - 9, yF + 10]], A.hachure('bois', 'arete'), true));
    // l'étai : le pied sur le bouchon ; penché, le haut contre la solive, décalé ; d'aplomb, droit
    const H = yBo - yJb, L = H + 3;                     // juste trop long : 3 unités, environ 12 mm
    const d = penche ? Math.sqrt(L * L - H * H) : 0;    // le décalage du haut quand il touche la solive
    const top = [xD + d, yJb], pied = [xD, yBo];
    const u = [(top[0] - pied[0]), (top[1] - pied[1])], n = Math.hypot(...u), nn = [-u[1] / n * eE / 2, u[0] / n * eE / 2];
    const etai = [[pied[0] + nn[0], pied[1] + nn[1]], [top[0] + nn[0], top[1] + nn[1]], [top[0] - nn[0], top[1] - nn[1]], [pied[0] - nn[0], pied[1] - nn[1]]];
    o.push(h.chemin(etai, W(A.contour), true));
    // le fil du bois de l'étai
    for (const t of [-0.25, 0.25]) {
      const a = [pied[0] + nn[0] * t * 2 + u[0] * 0.08, pied[1] + nn[1] * t * 2 + u[1] * 0.08];
      const b = [pied[0] + nn[0] * t * 2 + u[0] * 0.92, pied[1] + nn[1] * t * 2 + u[1] * 0.92];
      o.push(h.ligne(a[0], a[1], b[0], b[1], A.fin));
    }
    const P = { top, pied, etaiMilieu: [pied[0] + u[0] * 0.5 + nn[0], pied[1] + u[1] * 0.5 + nn[1]] };
    if (penche) {
      // le marteau frappe le haut de l'étai vers l'aplomb : le coin du haut de la panne posé sur le chant droit de
      // l'étai (les deux traits se touchent) ; la flèche rouge du coup, au-dessus de la tête
      const bord = y => top[0] + nn[0] - (y - top[1] - nn[1]) * d / H;     // le chant droit de l'étai à la hauteur y
      const k = 0.24, a = -20, yM = yJb + 34;
      const essai = marteau(0, yM, k, a), c0 = essai.coin;
      const xM = bord(c0[1]) + 1.6 - c0[0];
      const mt = marteau(xM, yM, k, a);
      o.push(mt.svg);
      const yG = mt.dessus[1] - 9;
      o.push(h.geste(`M${f1(bord(yG) + 34)} ${f1(yG)} L${f1(bord(yG) + 5)} ${f1(yG)}`));
      P.marteau = mt.manche;
    } else {
      o.push(h.controle(top[0], yJb + 1, 11));
    }
    return { svg: o.join('\n'), g, P };
  };

  return {
    ref: '07-01',
    titre: 'L’obturateur de drain, étayé contre la solive',
    desc: 'À gauche, en coupe, le drain de plancher : la grille ôtée, un bouchon de bois effilé enveloppé d’un chiffon est enfoncé dans la gorge du drain et dépasse un peu du plancher de béton ; sous lui, dans le tuyau et le siphon, l’eau qui refoule pousse vers le haut (flèches noires). Le pied d’une pièce de bois est posé sur le bouchon, cerclé de rouge. Au milieu, le sous-sol en entier : l’étai, un 2 × 4 coupé à peine plus long que la hauteur, est posé sur le bouchon et penché, le haut contre le dessous de la solive ; un marteau, la panne contre le chant de l’étai et le manche qui descend en biais, frappe le haut vers l’aplomb (flèche rouge). À droite, l’étai d’aplomb, coincé en force entre le bouchon et la solive ; le contact sous la solive est cerclé de rouge.',
    format: 'pleine',
    disposition: [['detail', 'biais', 'aplomb']],
    largeurs: [[1.2, 1, 1]],
    vues: {
      detail: {
        titre: 'Le bouchon, en coupe',
        dessin: z => detail(z).svg,
        renvois: z => {
          const { g } = detail(z);
          const { cx, yB, rT, yF, yBb } = g;
          return [
            { n: 1, rond: [z.l - 14, yF - 60], cible: [cx + 9, yB - 4], texte: 'bouchon enfoncé, qui dépasse du plancher' },
            { n: 2, rond: [14, yF + 150], cible: [cx - g.wB - g.c / 2 - 6, yBb - 22], texte: 'chiffon autour du bouchon' },
            { n: 3, rond: [14, yB + 240], cible: [cx - 20, yB + 196], texte: 'le refoulement pousse par en dessous' },
          ];
        },
      },
      biais: {
        titre: 'Poser en biais, frapper',
        dessin: z => scene(z, true).svg,
        renvois: z => {
          const { g, P } = scene(z, true);
          return [
            { n: 4, rond: [z.l - 30, 330], cible: P.etaiMilieu, texte: 'un 2 × 4 à peine plus long que la hauteur' },
            { n: 5, rond: [z.l - 14, g.yJb + 130], cible: P.marteau, texte: 'frapper le haut vers l’aplomb' },
          ];
        },
      },
      aplomb: {
        titre: 'D’aplomb, coincé',
        dessin: z => scene(z, false).svg,
        renvois: z => {
          const { g, P } = scene(z, false);
          return [
            { n: 6, rond: [z.l - 26, g.yJb + 60], cible: [P.top[0] + 13, g.yJb + 2], texte: 'il porte sous la solive' },
          ];
        },
      },
    },
  };
};
