// Planche 13-01 — l'arc à feu : monté, la planchette vue de dessus, le palier en coupe.
// Aucune cote : les dimensions du chapitre portent [À VÉRIFIER].
// Le palier (repris trois fois le 14 octobre) : il est montré seul, sans main, avec la flèche rouge de la poussée
// vers le bas ; le renvoi dit la prise. La pose coiffe sortait en griffe, la main à plat avait l'air posée, la main
// en creux faisait bizarre sur la couverture du tome 1.
// La charte : le va-et-vient de l'arc et la poussée sur le palier en rouge (le geste), la pointe de l'encoche
// au centre de la cavité cerclée de rouge (le point à contrôler).

module.exports = (h) => {
  const blanc = a => a.replace('fill="none"', 'fill="#ffffff"');
  const axe = `${h.a.fin} stroke-dasharray="9 3 2 3"`;
  const f = v => Math.round(v * 10) / 10;

  // Courbe lisse (Catmull-Rom) passant par chaque point.
  const lisse = (pts, ferme) => {
    const n = pts.length;
    const p = i => ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
    let d = `M ${f(pts[0][0])} ${f(pts[0][1])}`;
    const segs = ferme ? n : n - 1;
    for (let i = 0; i < segs; i++) {
      const p0 = p(i - 1), p1 = p(i), p2 = p(i + 1), p3 = p(i + 2);
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C ${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
    }
    return ferme ? d + ' Z' : d;
  };
  const dep = (x, y, pts) => pts.map(([u, v]) => [x + u, y + v]);

  // Graine fixe pour la poussière : le dessin est le même à chaque composition.
  let graine = 11;
  const hasard = () => (graine = (graine * 16807) % 2147483647) / 2147483647;

  // Géométrie de la vue « monté », partagée par le dessin et les renvois.
  const monte = z => {
    const G = z.h - 30, ep = 16, top = G - ep;
    const F = z.l - 370;
    const L = Math.min(230, top - 115);
    const fTop = top - L, P = fTop - 14;
    const yb = top - Math.round(0.45 * L);
    const xl = F - 55, xr = F + 330, B = 30;
    return { G, ep, top, F, L, fTop, P, yb, xl, xr, B, x0: F - 150, x1: F + 170, ox: 30, oy: -13 };
  };

  // Géométrie de la vue de dessus.
  const dessus = z => {
    const r = 30;
    const yE = z.h - 58;
    const D = Math.min(120, yE - 22);
    const yT = yE - D;
    const cx = Math.round(z.l * 0.5), cy = yE - r - 14;
    const t = Math.tan(22.5 * Math.PI / 180);
    const hw = (yE - cy) * t;
    return { r, yE, yT, cx, cy, hw };
  };

  // Géométrie du palier en coupe.
  const palier = z => {
    const px = Math.round(z.l / 2), pc = 74, yc = pc + 32;   // yc : bas du nœud, centre du creux
    const fb = z.h - 16;
    return { px, pc, yc, fb, rc: 22, rf: 19, yArr: Math.round((yc + fb) / 2) + 14 };
  };

  return {
    ref: '13-01',
    titre: 'L’arc à feu',
    desc: 'L’arc à feu monté : la planchette au sol, le foret debout dans la cavité, la corde de l’arc enroulée d’un tour autour du foret, le palier sur le haut du foret, que la paume presse : une flèche rouge vers le bas, la poussée ; une double flèche rouge, le va-et-vient de l’arc. La planchette vue de dessus : la cavité, et l’encoche taillée en pointe jusqu’au centre de la cavité, où s’amasse la poussière noire ; la pointe de l’encoche, au centre de la cavité, est cerclée de rouge. Le palier en coupe : un nœud de bois dur creusé, le creux graissé où tourne le haut du foret ; une flèche rouge, la poussée de la main.',
    format: 'pleine',
    disposition: [['monte'], ['dessus', 'palier']],
    hauteurs: [3.3, 2],
    largeurs: [[1], [3, 2]],
    vues: {
      monte: {
        titre: 'Monté, vu du côté de l’encoche',
        dessin: z => {
          const g = monte(z);
          const { G, ep, top, F, fTop, P, yb, xl, xr, B, x0, x1, ox, oy } = g;
          const out = [];

          // Le sol.
          out.push(h.rect(16, G, z.l - 32, 10, h.a.hachure('terre', 'aucun')));
          out.push(h.ligne(16, G, z.l - 16, G, h.a.arete));

          // La planchette : dessus (en fuite), bout, puis face avant avec l'encoche.
          out.push(h.chemin([[x0, top], [x1, top], [x1 + ox, top + oy], [x0 + ox, top + oy]], blanc(h.a.contour), true));
          out.push(h.chemin([[x1, top], [x1 + ox, top + oy], [x1 + ox, G + oy], [x1, G]], h.a.hachure('bois', 'contour'), true));
          // fil du bois sur le dessus, interrompu au foret
          for (const k of [0.4, 0.72]) {
            const y = top + oy * k, dx = ox * k;
            out.push(h.ligne(x0 + dx + 14, y, F - 16, y, h.a.detail));
            out.push(h.ligne(F + 16, y, x1 + dx - 12, y, h.a.detail));
          }

          // L'arc : la baguette passe derrière le foret.
          const xm = (xl + xr) / 2;
          out.push(h.path(`M ${xl} ${yb - 2.5} Q ${xm} ${yb - 2 * B - 5} ${xr} ${yb - 2.5} A 2.5 2.5 0 0 1 ${xr} ${yb + 2.5} Q ${xm} ${yb - 2 * B + 5} ${xl} ${yb + 2.5} A 2.5 2.5 0 0 1 ${xl} ${yb - 2.5} Z`, blanc(h.a.contour)));
          // ligatures de la corde aux deux bouts
          for (const x of [xl + 6, xl + 10, xr - 10, xr - 6]) out.push(h.ligne(x, yb - 4, x, yb + 4, h.a.detail));
          // les deux brins de la corde
          out.push(h.ligne(xl + 3, yb + 1, F - 9, yb - 4, h.a.arete));
          out.push(h.ligne(F + 9, yb + 8, xr - 3, yb + 1, h.a.arete));

          // Le foret, du palier jusque dans la cavité.
          out.push(h.rect(F - 9, fTop, 18, top + 6 - fTop, blanc(h.a.contour)));
          out.push(h.ligne(F + 3, fTop + 26, F + 3, yb - 26, h.a.detail));
          out.push(h.ligne(F + 3, yb + 18, F + 3, top - 22, h.a.detail));
          // le tour de corde qui passe devant le foret
          out.push(h.ligne(F + 9, yb - 2, F - 9, yb + 6, h.a.arete));

          // Face avant de la planchette, fendue par l'encoche.
          out.push(h.rect(x0, top, F - 8 - x0, ep, blanc(h.a.contour)));
          out.push(h.rect(F + 8, top, x1 - F - 8, ep, blanc(h.a.contour)));
          for (const y of [top + 6, top + 11]) {
            out.push(h.ligne(x0 + 10, y, F - 18, y, h.a.detail));
            out.push(h.ligne(F + 18, y, x1 - 10, y, h.a.detail));
          }
          // la poussière noire dans l'encoche et à sa bouche
          out.push(h.path(`M ${F - 8} ${top + 7} L ${F + 8} ${top + 7} L ${F + 8} ${G - 2} Q ${F + 16} ${G - 1} ${F + 20} ${G + 3} L ${F - 20} ${G + 3} Q ${F - 16} ${G - 1} ${F - 8} ${G - 2} Z`, h.a.plein));

          // Le palier : un nœud de bois dur, rond dans la main.
          const RP = 21;
          const palierSvg = h.path(lisse(dep(F, P, [[-21, 1], [-18, -11], [-8, -20], [4, -21], [15, -15], [21, -4], [20, 8], [14, 16], [3, 21], [-9, 19], [-18, 12]]), true), blanc(h.a.contour));
          // le haut du foret, caché dans le creux
          const cacheSvg = h.path(`M ${F - 9} ${P + 21} L ${F - 9} ${P + 8} Q ${F - 9} ${P - 1} ${F} ${P - 1} Q ${F + 9} ${P - 1} ${F + 9} ${P + 8} L ${F + 9} ${P + 21}`, h.a.cache);

          // Le palier seul, sans main : la flèche rouge dit la poussée, le renvoi dit la prise (la paume pèse
          // dessus). Les mains essayées dessus (à plat, en creux) se lisaient mal à la taille de la couverture.
          out.push(palierSvg, cacheSvg);
          out.push(h.geste(`M ${F} ${P - 90} L ${F} ${P - 30}`));

          // Le va-et-vient de l'arc.
          const ya = yb - 55;
          out.push(h.geste(`M ${F + 175} ${ya} L ${F + 305} ${ya}`, { double: true }));

          return out.join('\n');
        },
        renvois: z => {
          const { top, F, P, yb } = monte(z);
          return [
            { n: 1, rond: [F + 200, top - 38], cible: [F + 186, top - 13], texte: 'planchette de bois tendre sec' },
            { n: 2, rond: [F - 62, yb + 55], cible: [F - 9, yb + 55], texte: 'foret de la même essence' },
            { n: 3, rond: [F + 90, yb + 40], cible: [F + 90, yb + 8], texte: 'corde qui mord : lacet de coton' },
            { n: 4, rond: [F + 75, P + 40], cible: [F + 17, P + 14], texte: 'palier : la paume pèse dessus' },
          ];
        },
      },

      dessus: {
        titre: 'La planchette, vue de dessus',
        dessin: z => {
          const { r, yE, yT, cx, cy, hw } = dessus(z);
          const out = [];
          const xg = 16, xd = z.l - 16, ym = (yT + yE) / 2;
          const pt = (rr, deg) => [cx + rr * Math.cos(deg * Math.PI / 180), cy + rr * Math.sin(deg * Math.PI / 180)];

          // fil du bois, interrompu autour de la cavité et des pastilles
          const pastilles = [[cx + 82, cy - 42], [cx - r - 48, cy + 24]];
          const fil = (xa, xb, y) => {
            const trous = pastilles.filter(([, py]) => Math.abs(py - y) < 13).map(([px]) => [px - 15, px + 15]);
            let x = xa;
            for (const [ta, tb] of trous.sort((m, n) => m[0] - n[0])) {
              if (tb < x || ta > xb) continue;
              if (ta > x) out.push(h.ligne(x, y, ta, y, h.a.detail));
              x = Math.max(x, tb);
            }
            if (x < xb) out.push(h.ligne(x, y, xb, y, h.a.detail));
          };
          for (const y of [yT + 16, yT + 34, yT + 56, yE - 14]) {
            const dy = Math.abs(y - cy);
            if (dy < r + 6) {
              const g = Math.sqrt((r + 6) ** 2 - dy ** 2);
              fil(xg + 14, cx - g, y);
              fil(cx + g, xd - 14, y);
            } else {
              fil(xg + 14, cx - 40, y);
              fil(cx - 30, xd - 14, y);
            }
          }

          // bords de la planchette, coupures aux deux bouts
          out.push(h.ligne(xg, yT, xd, yT, h.a.contour));
          out.push(h.ligne(xg, yE, cx - hw, yE, h.a.contour));
          out.push(h.ligne(cx + hw, yE, xd, yE, h.a.contour));
          for (const x of [xg, xd]) out.push(h.chemin([[x, yT], [x, ym - 9], [x - 6, ym - 3], [x + 6, ym + 3], [x, ym + 9], [x, yE]], h.a.arete));

          // la cavité, entamée par l'encoche
          const [a1, a2] = [pt(r, 112.5), pt(r, 67.5)];
          out.push(h.path(`M ${f(a1[0])} ${f(a1[1])} A ${r} ${r} 0 1 1 ${f(a2[0])} ${f(a2[1])}`, h.a.arete));
          const ri = r * 0.55, [b1, b2] = [pt(ri, 112.5), pt(ri, 67.5)];
          out.push(h.path(`M ${f(b1[0])} ${f(b1[1])} A ${f(ri)} ${f(ri)} 0 1 1 ${f(b2[0])} ${f(b2[1])}`, h.a.detail));

          // l'encoche : deux flancs qui se rejoignent au centre
          out.push(h.chemin([[cx - hw, yE], [cx, cy], [cx + hw, yE]], h.a.contour));

          // axes de la cavité : la pointe de l'encoche tombe à leur croisement
          out.push(h.ligne(cx - r - 16, cy, cx + r + 16, cy, axe));
          out.push(h.ligne(cx, cy - r - 16, cx, cy + 4, axe));
          // le point à contrôler : la pointe de l'encoche au centre de la cavité
          out.push(h.controle(cx, cy, 7));

          // la poussière noire, dans l'encoche et à sa bouche
          const pts = [];
          while (pts.length < 34) {
            const y = cy + 0.5 * r + hasard() * (yE - cy - 0.5 * r);
            const w = (y - cy) * Math.tan(22.5 * Math.PI / 180) - 2.5;
            if (w > 1) pts.push([cx + (2 * hasard() - 1) * w, y]);
          }
          while (pts.length < 100) {
            const u = 2 * hasard() - 1, v = hasard();
            if (u * u + v * v < 0.92) pts.push([cx + u * 30, yE + 2 + v * 20]);
          }
          for (const [x, y] of pts) out.push(h.cercle(f(x), f(y), 1.4, h.a.plein));
          out.push(h.path(`M ${cx - 32} ${yE} A 32 23 0 0 0 ${cx + 32} ${yE}`, h.a.detail));

          return out.join('\n');
        },
        renvois: z => {
          const { r, yE, cx, cy } = dessus(z);
          const s = 0.8 * r, a = 112.5 * Math.PI / 180;
          return [
            { n: 5, rond: [cx + 82, cy - 42], cible: [cx + r * Math.cos(-0.7), cy + r * Math.sin(-0.7)], texte: 'cavité où tourne le foret' },
            { n: 6, rond: [cx - r - 48, cy + 24], cible: [cx + s * Math.cos(a), cy + s * Math.sin(a)], texte: 'encoche taillée jusqu’au centre' },
            { n: 7, rond: [cx - 74, yE + 22], cible: [cx + 32 * Math.cos(2.62), yE + 23 * Math.sin(2.62)], texte: 'poussière noire : elle fume seule' },
          ];
        },
      },

      palier: {
        titre: 'Le palier, en coupe',
        dessin: z => {
          const { px, pc, yc, fb, rc, rf, yArr } = palier(z);
          const out = [];

          // la poussée de la main
          out.push(h.geste(`M ${px} 6 L ${px} ${pc - 42}`));

          // le nœud de bois dur, en coupe
          out.push(h.path(lisse(dep(px, pc, [[-75, 6], [-70, -16], [-50, -32], [-18, -36], [16, -35], [48, -30], [70, -16], [76, 4], [66, 24], [40, 31], [rc, 32], [-rc, 32], [-40, 31], [-64, 24]]), true), h.a.hachure('bois', 'contour')));
          out.push(h.path(`M ${px - rc} ${yc + 1} A ${rc} ${rc} 0 0 1 ${px + rc} ${yc + 1} Z`, h.a.blanc));

          // le foret qui monte dans le creux
          out.push(h.path(`M ${px - rf} ${fb} L ${px - rf} ${yc} A ${rf} ${rf} 0 0 1 ${px + rf} ${yc} L ${px + rf} ${fb}`, blanc(h.a.contour)));
          out.push(h.ligne(px - 7, yc + 10, px - 7, fb - 10, h.a.detail));
          out.push(h.ligne(px + 8, yc + 18, px + 8, fb - 8, h.a.detail));
          out.push(h.chemin([[px - rf, fb], [px - 6, fb - 5], [px + 6, fb + 5], [px + rf, fb]], h.a.arete));
          // il tourne
          out.push(h.path(`M ${px - rf - 8} ${yArr} A ${rf + 8} 7 0 0 0 ${px + rf + 8} ${yArr}`, h.a.fin));
          out.push(h.fleche(`M ${px + rf + 2} ${yArr + 5} L ${px + rf + 9} ${yArr - 1}`, h.a.fin));

          out.push(h.path(`M ${px - rc} ${yc} A ${rc} ${rc} 0 0 1 ${px + rc} ${yc}`, h.a.contour));
          // la graisse entre le creux et le haut du foret
          out.push(h.path(`M ${px - rc} ${yc} A ${rc} ${rc} 0 0 1 ${px + rc} ${yc} L ${px + rf} ${yc} A ${rf} ${rf} 0 0 0 ${px - rf} ${yc} Z`, h.a.plein));

          return out.join('\n');
        },
        renvois: z => {
          const { px, pc, yc, rf } = palier(z);
          return [
            { n: 8, rond: [px + 82, 20], cible: [px + 48, pc - 30], texte: 'nœud de bois dur, galet ou os' },
            { n: 9, rond: [px + 76, yc + 30], cible: [px + 21, yc + 1], texte: 'creux graissé : suif ou gomme' },
            { n: 10, rond: [px - 70, yc + 26], cible: [px - rf, yc + 26], texte: 'haut du foret : tourne sans chauffer' },
          ];
        },
      },
    },
  };
};
