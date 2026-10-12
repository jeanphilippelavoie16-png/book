// Planche 112-10b — Éprouver la lessive, cuire le savon mou (ch. 108, §9 A et D).
// Le chapitre : la lessive est assez forte quand un œuf frais y flotte ; la fournée d'essai à la
// cuillerée : une cuillerée de gras fondu dans une boîte de conserve, quelques gouttes de
// lessive, brassées au bâton sur le coin du poêle ; si ça épaissit et vient en pâte, la lessive
// travaille ; si ça reste deux liquides, elle est trop faible et retourne aux cendres.
// La cuisson sans table (§9 D, fin) : cuire le gras avec la lessive, en ajouter par petites
// quantités jusqu'à ce que le mélange vienne en pâte (§5-E : translucide et élastique, comme
// de la purée épaisse qu'on plie). Étape 26 : la lessive dans le gras, en filet, en brassant ;
// jamais l'inverse. Chaudron de fonte : le fer tient devant la lessive (tableau du matériel).
// Aucune cote : le chapitre ne donne aucune dimension.

module.exports = (h) => {
  const f = (n) => Math.round(n * 10) / 10;
  const blanc = (t) => h.a[t].replace('fill="none"', 'fill="#ffffff"');
  const P = (pts) => pts.map(([x, y]) => [f(x), f(y)]);
  const goutte = (x, y, k = 1) =>
    h.path(`M ${f(x)} ${f(y - 4 * k)} C ${f(x + 2.6 * k)} ${f(y)} ${f(x + 2.6 * k)} ${f(y + 3 * k)} ${f(x)} ${f(y + 3 * k)} C ${f(x - 2.6 * k)} ${f(y + 3 * k)} ${f(x - 2.6 * k)} ${f(y)} ${f(x)} ${f(y - 4 * k)} Z`, blanc('detail'));

  // Un œuf, gros bout à droite, penché de ang degrés autour de son centre.
  const oeuf = (cx, cy, rx, ry, ang) => {
    const c = Math.cos(ang * Math.PI / 180), s = Math.sin(ang * Math.PI / 180);
    const pts = [];
    for (let i = 0; i < 48; i++) {
      const t = i / 48 * 2 * Math.PI;
      const u = rx * Math.cos(t), v = ry * Math.sin(t) * (1 + 0.14 * Math.cos(t));
      pts.push([cx + u * c - v * s, cy + u * s + v * c]);
    }
    return P(pts);
  };

  // Un pot en coupe, parois minces : bord (x0, x1) en haut à yH, fond à yB, liquide à yL.
  const pot = (x0, x1, yH, yB, yL, motif = 'eau') => {
    const e = 3;
    const liq = motif ? h.chemin(P([[x0 + e + 0.7, yL], [x0 + e + 1.5, yB - e], [x1 - e - 1.5, yB - e], [x1 - e - 0.7, yL]]), h.a.hachure(motif, 'aucun'), true) : '';
    return [
      liq,
      motif ? h.ligne(f(x0 + e + 0.7), f(yL), f(x1 - e - 0.7), f(yL), h.a.detail) : '',
      h.chemin(P([[x0, yH], [x0 + 1.5, yB], [x1 - 1.5, yB], [x1, yH], [x1 - e, yH], [x1 - e - 1.5, yB - e], [x0 + e + 1.5, yB - e], [x0 + e, yH]]), h.a.hachure('metal', 'arete'), true),
    ].join('\n');
  };

  // ── L'œuf ──────────────────────────────────────────────────────────────────────────
  const geoO = (z) => {
    const w = 66, gap = 36, x0 = (z.l - 2 * w - gap) / 2;
    const yB = z.h - 16, yH = yB - 92, yL = yH + 18;
    return { w, gap, a0: x0, a1: x0 + w, b0: x0 + w + gap, b1: x0 + 2 * w + gap, yB, yH, yL };
  };

  // ── La fournée d'essai ─────────────────────────────────────────────────────────────
  const geoE = (z) => {
    const yP = z.h - 60;                    // dessus de la plaque du poêle
    const xc = 140;                         // coin du poêle
    const bw = 54;                          // les trois boîtes, même taille
    const b1 = xc - 9, b0 = b1 - bw, bH = yP - 60;  // la boîte d'essai, contre le bord de la plaque
    const yM = bH + 34;                     // niveau du mélange
    const rw = bw, r2x0 = z.l - 4 - rw, r1x0 = r2x0 - rw - 10, rB = z.h - 20, rH = rB - 66, rL = rH + 22;
    return { yP, xc, b0, b1, bH, yM, r1x0, r2x0, rw, rB, rH, rL };
  };

  // ── La cuisson ─────────────────────────────────────────────────────────────────────
  const geoC = (z) => {
    const yP = z.h - 96;                    // dessus de la plaque
    const s0 = 30, s1 = z.l - 40;           // le poêle
    const c0 = 70, c1 = 250, cH = yP - 104; // le chaudron
    const ep = 9;                           // paroi de fonte
    const yPate = cH + 38;                  // dessus du mélange
    return { yP, s0, s1, c0, c1, cH, ep, yPate };
  };

  // ── La pâte venue ──────────────────────────────────────────────────────────────────
  const geoV = (z) => {
    const yR = z.h - 150;                   // bord du chaudron
    const yp = yR + 58;                     // dessus de la pâte
    const c0 = 30, c1 = z.l - 30, cx = z.l / 2;
    const yb = 70;                          // bout du bâton
    return { yR, yp, c0, c1, cx, yb };
  };

  return {
    ref: '112-10b',
    titre: 'Éprouver la lessive, cuire le savon mou',
    desc: 'L’œuf frais qui flotte dans une lessive assez forte et coule dans une trop faible ; la fournée d’essai à la cuillerée dans une boîte de conserve au coin du poêle, et ses deux issues, la pâte ou deux liquides ; la cuisson au chaudron de fonte, la lessive versée en filet dans le gras en brassant ; la pâte venue, qui se plie. L’encadré danger rappelle que la lessive projette à gros bouillon.',
    format: 'pleine',
    disposition: [['oeuf', 'essai'], ['cuisson', 'venue']],
    hauteurs: [2, 3],
    largeurs: [[2, 3], [3, 2]],
    vues: {
      oeuf: {
        titre: 'L’œuf',
        dessin: z => {
          const g = geoO(z);
          const out = [];
          out.push(h.ligne(0, g.yB, z.l, g.yB, h.a.arete));
          out.push(pot(g.a0, g.a1, g.yH, g.yB, g.yL));
          out.push(pot(g.b0, g.b1, g.yH, g.yB, g.yL));
          // à gauche : il coule, couché au fond
          out.push(h.chemin(oeuf((g.a0 + g.a1) / 2, g.yB - 3 - 12, 17, 12, 0), blanc('arete'), true));
          // à droite : il flotte, penché, un bout de coquille hors de l'eau
          out.push(h.chemin(oeuf((g.b0 + g.b1) / 2, g.yL + 5, 17, 12, -35), blanc('arete'), true));
          out.push(h.ligne(f(g.b0 + 4), f(g.yL), f((g.b0 + g.b1) / 2 - 14), f(g.yL), h.a.detail));
          return out.join('\n');
        },
        renvois: z => {
          const g = geoO(z);
          return [
            { n: 1, rond: [g.b1 - 4, 16], cible: [(g.b0 + g.b1) / 2 + 8, g.yL - 7], texte: 'l’œuf frais flotte : assez forte' },
            { n: 2, rond: [14, g.yB - 44], cible: [(g.a0 + g.a1) / 2 - 8, g.yB - 17], texte: 'il coule : pas assez forte' },
          ];
        },
      },

      essai: {
        titre: 'La fournée d’essai',
        dessin: z => {
          const g = geoE(z);
          const out = [];
          // le poêle : plaque de dessus, coin arrondi, flanc qui descend
          out.push(h.path(`M 0 ${g.yP} L ${g.xc - 8} ${g.yP} Q ${g.xc} ${g.yP} ${g.xc} ${g.yP + 8} L ${g.xc} ${g.yP + 12} L 0 ${g.yP + 12} Z`, h.a.hachure('metal', 'arete')));
          out.push(h.path(`M ${g.xc - 6} ${g.yP + 12} L ${g.xc - 6} ${z.h - 4} M 0 ${z.h - 4} L ${g.xc - 6} ${z.h - 4}`, h.a.arete));
          out.push(h.path(`M 22 ${g.yP + 24} L ${g.xc - 30} ${g.yP + 24} L ${g.xc - 30} ${z.h - 12} L 22 ${z.h - 12} Z`, h.a.detail));
          // la boîte d'essai, au coin
          out.push(pot(g.b0, g.b1, g.bH, g.yP, g.yM, 'isolant'));
          // le bâton qui brasse
          out.push(h.chemin(P([[g.b0 + 6, g.yP - 8], [g.b0 + 2, g.yP - 11], [g.b0 - 26, 14], [g.b0 - 22, 12], [g.b0 + 9, g.yP - 9]]), blanc('arete'), true));
          out.push(h.fleche(`M ${f(g.b0 + 8)} ${f(g.yM + 6)} A 18 5 0 1 0 ${f(g.b1 - 8)} ${f(g.yM + 6)}`, h.a.detail));
          // les gouttes de lessive, d'une cuillère
          const sx = g.b1 + 6, sy = g.bH - 26;
          out.push(h.path(`M ${sx - 14} ${sy - 3} C ${sx - 14} ${sy + 7} ${sx + 2} ${sy + 7} ${sx + 4} ${sy} Z`, blanc('arete')));
          out.push(h.path(`M ${sx + 4} ${sy - 1} L ${sx + 44} ${sy - 18} L ${sx + 45} ${sy - 15} L ${sx + 4} ${sy + 1}`, blanc('arete')));
          out.push(goutte(sx - 14, sy + 10, 0.8), goutte(sx - 15, sy + 22, 0.8));
          // les deux issues, en coupe
          const r1c = g.r1x0 + g.rw / 2;
          out.push(h.ligne(g.r1x0 - 14, g.rB, z.l, g.rB, h.a.arete));
          out.push(pot(g.r1x0, g.r1x0 + g.rw, g.rH, g.rB, g.rL, 'isolant'));
          out.push(h.path(`M ${g.r1x0 + 4} ${g.rL} Q ${r1c - 8} ${g.rL - 10} ${r1c} ${g.rL - 6} Q ${r1c + 8} ${g.rL - 12} ${g.r1x0 + g.rw - 4} ${g.rL}`, h.a.arete));
          out.push(pot(g.r2x0, g.r2x0 + g.rw, g.rH, g.rB, g.rL + 20, 'eau'));
          // la couche de gras du dessus : même trame que la pâte de la boîte 7
          out.push(h.rect(g.r2x0 + 3.7, g.rL, g.rw - 7.4, 20, h.a.hachure('isolant', 'aucun')));
          out.push(h.ligne(g.r2x0 + 3.7, g.rL, g.r2x0 + g.rw - 3.7, g.rL, h.a.detail));
          out.push(h.ligne(g.r2x0 + 3.2, g.rL + 20, g.r2x0 + g.rw - 3.2, g.rL + 20, h.a.arete));
          // second fil du renvoi 8, vers la lessive dessous
          const p8 = [g.r2x0 + g.rw - 12, g.rH - 22], c8 = [g.r2x0 + g.rw / 2 + 10, g.rL + 34];
          out.push(`<line x1="${f(p8[0])}" y1="${f(p8[1])}" x2="${f(c8[0])}" y2="${f(c8[1])}" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>`);
          out.push(`<line x1="${f(p8[0])}" y1="${f(p8[1])}" x2="${f(c8[0])}" y2="${f(c8[1])}" fill="none" stroke="#1a1a1a" stroke-width="0.5" stroke-dasharray="3 2.5"/>`);
          out.push(`<circle cx="${f(c8[0])}" cy="${f(c8[1])}" r="1.8" fill="#1a1a1a" stroke="#ffffff" stroke-width="0.7"/>`);
          return out.join('\n');
        },
        renvois: z => {
          const g = geoE(z);
          const sx = g.b1 + 6, sy = g.bH - 26;
          return [
            { n: 3, rond: [g.b1 + 30, g.yP + 34], cible: [g.b1 - 1, g.yP - 8], texte: 'une boîte, au coin du poêle' },
            { n: 4, rond: [g.b1 + 30, g.yP - 12], cible: [g.b1 - 8, g.yM + 8], texte: 'une cuillerée de gras fondu' },
            { n: 5, rond: [sx + 18, sy + 20], cible: [sx - 13, sy + 22], texte: 'quelques gouttes de lessive' },
            { n: 6, rond: [22, 30], cible: [g.b0 - 20, 22], texte: 'brassé au bâton' },
            { n: 7, rond: [g.r1x0 + 6, g.rH - 22], cible: [g.r1x0 + g.rw / 2, g.rL + 4], texte: 'en pâte : la lessive travaille' },
            { n: 8, rond: [g.r2x0 + g.rw - 12, g.rH - 22], cible: [g.r2x0 + g.rw / 2 - 10, g.rL + 10], texte: 'deux liquides : trop faible' },
          ];
        },
      },

      cuisson: {
        titre: 'La cuisson',
        dessin: z => {
          const g = geoC(z);
          const out = [];
          // le poêle, de face : plaque, caisse, porte
          out.push(h.rect(g.s0 - 6, g.yP, g.s1 - g.s0 + 12, 10, h.a.hachure('metal', 'arete')));
          out.push(h.rect(g.s0, g.yP + 10, g.s1 - g.s0, z.h - g.yP - 22, blanc('contour')));
          out.push(h.rect(g.s0 + 40, g.yP + 26, 120, z.h - g.yP - 50, h.a.arete));
          out.push(h.rect(g.s0 + 150, g.yP + 48, 16, 6, h.a.detail));
          out.push(h.ligne(0, z.h - 12, z.l, z.h - 12, h.a.arete));
          // le chaudron de fonte en coupe
          const { c0, c1, cH, ep, yP } = g;
          const paroi = P([[c0, cH], [c0, yP - 16], [c0 + 16, yP], [c1 - 16, yP], [c1, yP - 16], [c1, cH], [c1 - ep, cH], [c1 - ep, yP - 19], [c1 - 19, yP - ep], [c0 + 19, yP - ep], [c0 + ep, yP - 19], [c0 + ep, cH]]);
          const pate = P([[c0 + ep, g.yPate], [c0 + ep, yP - 19], [c0 + 19, yP - ep], [c1 - 19, yP - ep], [c1 - ep, yP - 19], [c1 - ep, g.yPate]]);
          out.push(h.chemin(pate, h.a.hachure('isolant', 'aucun'), true));
          out.push(h.path(`M ${c0 + ep} ${g.yPate} Q ${c0 + 50} ${g.yPate - 6} ${(c0 + c1) / 2} ${g.yPate + 2} Q ${c1 - 50} ${g.yPate + 8} ${c1 - ep} ${g.yPate}`, h.a.arete));
          out.push(h.chemin(paroi, h.a.hachure('metal', 'contour'), true));
          // oreilles du chaudron
          out.push(h.path(`M ${c0} ${cH + 12} L ${c0 - 12} ${cH + 10} L ${c0 - 12} ${cH + 20} L ${c0} ${cH + 22}`, h.a.arete));
          out.push(h.path(`M ${c1} ${cH + 12} L ${c1 + 12} ${cH + 10} L ${c1 + 12} ${cH + 20} L ${c1} ${cH + 22}`, h.a.arete));
          // le bâton qui brasse, et son mouvement
          const bx = c0 + 60;
          out.push(h.chemin(P([[bx, yP - 22], [bx - 5, yP - 22], [bx - 44, 10], [bx - 39, 8]]), blanc('arete'), true));
          out.push(h.fleche(`M ${f(bx - 24)} ${f(g.yPate + 12)} A 30 7 0 1 0 ${f(bx + 22)} ${f(g.yPate + 10)}`, h.a.detail));
          // la louche qui verse la lessive en filet
          const lx = c1 - 58, ly = cH - 40;
          out.push(h.path(`M ${lx - 22} ${ly - 8} C ${lx - 22} ${ly + 16} ${lx + 12} ${ly + 16} ${lx + 14} ${ly - 4} Z`, blanc('arete')));
          out.push(h.path(`M ${lx - 22} ${ly - 8} C ${lx - 10} ${ly - 1} ${lx + 4} ${ly - 1} ${lx + 14} ${ly - 4}`, h.a.hachure('eau', 'aucun')));
          out.push(h.path(`M ${lx + 12} ${ly - 5} L ${lx + 80} ${ly - 40} L ${lx + 82} ${ly - 36} L ${lx + 14} ${ly - 1}`, blanc('arete')));
          out.push(h.path(`M ${lx - 22} ${ly - 7} C ${lx - 26} ${ly + 6} ${lx - 24} ${g.yPate - 20} ${lx - 24} ${g.yPate + 4}`, h.a.detail));
          out.push(h.path(`M ${lx - 21} ${ly - 5} C ${lx - 24} ${ly + 8} ${lx - 22} ${g.yPate - 20} ${lx - 22} ${g.yPate + 4}`, h.a.fin));
          return out.join('\n');
        },
        renvois: z => {
          const g = geoC(z);
          const lx = g.c1 - 58, ly = g.cH - 40;
          return [
            { n: 9, rond: [g.c1 + 40, g.yP - 30], cible: [g.c1 - 4, g.yP - 30], texte: 'chaudron de fonte, feu doux' },
            { n: 10, rond: [16, g.yPate + 30], cible: [g.c0 + 22, g.yPate + 30], texte: 'le gras d’abord, fondu' },
            { n: 11, rond: [lx - 50, ly - 10], cible: [lx - 23, ly + 22], texte: 'la lessive en filet, peu à peu' },
            { n: 12, rond: [16, 40], cible: [g.c0 + 60 - 36, 28], texte: 'brasser entre chaque ajout' },
          ];
        },
      },

      venue: {
        titre: 'Quand ça vient en pâte',
        dessin: z => {
          const g = geoV(z);
          const out = [];
          const e = 9, cx = g.cx, yp = g.yp, yF = z.h - 14;
          // la pâte : le bâton la pousse, elle monte devant lui et se replie par-dessus
          const surf = `M ${g.c0 + e} ${yp} L ${cx - 62} ${yp} C ${cx - 48} ${yp} ${cx - 40} ${yp + 14} ${cx - 28} ${yp + 14} C ${cx - 16} ${yp + 14} ${cx - 12} ${yp - 6} ${cx - 6} ${yp - 22} C ${cx} ${yp - 38} ${cx + 10} ${yp - 46} ${cx + 24} ${yp - 44} C ${cx + 40} ${yp - 42} ${cx + 52} ${yp - 30} ${cx + 48} ${yp - 18} C ${cx + 46} ${yp - 10} ${cx + 36} ${yp - 8} ${cx + 30} ${yp - 13} C ${cx + 34} ${yp - 4} ${cx + 40} ${yp} ${cx + 50} ${yp} L ${g.c1 - e} ${yp}`;
          out.push(h.path(`${surf} L ${g.c1 - e} ${yF - e - 19} L ${g.c1 - 19} ${yF - e} L ${g.c0 + 19} ${yF - e} L ${g.c0 + e} ${yF - e - 19} Z`, h.a.hachure('isolant', 'aucun')));
          out.push(h.path(surf, h.a.arete));
          // le pli : la pâte qui s'enroule sur elle-même
          out.push(h.path(`M ${cx + 30} ${yp - 13} C ${cx + 18} ${yp - 20} ${cx + 18} ${yp - 34} ${cx + 30} ${yp - 34} C ${cx + 38} ${yp - 34} ${cx + 42} ${yp - 26} ${cx + 38} ${yp - 20}`, h.a.detail));
          // le chaudron coupé, parois de fonte
          out.push(h.chemin(P([[g.c0, g.yR], [g.c0, yF - 16], [g.c0 + 16, yF], [g.c1 - 16, yF], [g.c1, yF - 16], [g.c1, g.yR], [g.c1 - e, g.yR], [g.c1 - e, yF - e - 19], [g.c1 - 19, yF - e], [g.c0 + 19, yF - e], [g.c0 + e, yF - e - 19], [g.c0 + e, g.yR]]), h.a.hachure('metal', 'contour'), true));
          // le bâton, le bout dans le creux qu'il laisse derrière lui
          out.push(h.chemin(P([[cx - 96, 28], [cx - 90, 26], [cx - 22, yp + 10], [cx - 28, yp + 12]]), blanc('arete'), true));
          out.push(h.fleche(`M ${cx - 6} ${yp - 70} L ${cx + 44} ${yp - 70}`));
          return out.join('\n');
        },
        renvois: z => {
          const g = geoV(z);
          return [
            { n: 13, rond: [z.l - 16, g.yp - 70], cible: [g.cx + 16, g.yp - 30], texte: 'translucide et élastique' },
            { n: 14, rond: [z.l - 16, g.yp - 30], cible: [g.cx + 45, g.yp - 16], texte: 'se plie comme une purée' },
          ];
        },
      },
    },
    danger: 'À gros bouillon, la lessive projette, et ce qu’elle projette brûle la peau et rend aveugle : feu doux, lunettes, gants, eau de rinçage à un pas.',
  };
};
