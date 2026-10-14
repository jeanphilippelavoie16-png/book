// Planche 48-09 — Le collet à ressort et son déclencheur (chapitre 44, § « Le collet à ressort »).
// Vue 1 : le montage vu dans l'axe de la piste, un lièvre de face pour l'échelle (la boucle laisse
// passer la tête, son bas à hauteur du menton : § 4 du chapitre, sans chiffre — les 10 à 13 cm
// sont [À VÉRIFIER]). Vue 2 : le crochet et le bâtonnet agrandis, là où tout se décide.
module.exports = (h) => {
  const blanc = (a) => a.replace('fill="none"', 'fill="#FFFFFF"');
  const neige = h.a.hachure('neige').replace(/stroke="[^"]*" stroke-width="[^"]*"/, 'stroke="none"');

  // Courbe de Bézier cubique, point et tangente.
  const bez = (P, t) => {
    const u = 1 - t;
    return [0, 1].map((k) => u * u * u * P[0][k] + 3 * u * u * t * P[1][k] + 3 * u * t * t * P[2][k] + t * t * t * P[3][k]);
  };
  const tan = (P, t) => {
    const u = 1 - t;
    const d = [0, 1].map((k) => 3 * u * u * (P[1][k] - P[0][k]) + 6 * u * t * (P[2][k] - P[1][k]) + 3 * t * t * (P[3][k] - P[2][k]));
    const n = Math.hypot(d[0], d[1]);
    return [d[0] / n, d[1] / n];
  };

  return {
    ref: '48-09',
    titre: 'Le collet à ressort et son déclencheur',
    desc: 'Un jeune bouleau plié au-dessus d’une piste de lièvre, retenu par un bâtonnet coincé sous le crochet taillé dans un piquet planté au bord de la piste ; la boucle du collet pend du bâtonnet, son bas à la hauteur du menton du lièvre. À droite, le crochet et le bâtonnet agrandis : le dessus du bâtonnet bute sous l’épaulement, son bout repose sur le pan incliné.',
    format: 'demi',
    disposition: [['monte', 'declencheur']],
    largeurs: [[3, 2]],
    vues: {
      monte: {
        titre: 'Monté, vu dans l’axe de la piste',
        dessin: (z) => {
          const sy = z.h - 30;          // surface de la neige
          const by = sy - 114;          // axe du bâtonnet
          const tc = 172;               // milieu de la piste
          const sx0 = 252, sx1 = 264;   // piquet
          const out = [];

          // La neige, et la piste tassée en creux.
          const surf = `M 8 ${sy} L ${tc - 58} ${sy} C ${tc - 44} ${sy} ${tc - 42} ${sy + 9} ${tc - 30} ${sy + 9} L ${tc + 30} ${sy + 9} C ${tc + 42} ${sy + 9} ${tc + 44} ${sy} ${tc + 58} ${sy} L ${z.l - 8} ${sy}`;
          out.push(h.path(`${surf} L ${z.l - 8} ${z.h - 6} L 8 ${z.h - 6} Z`, neige));
          out.push(h.path(surf, h.a.arete));

          // L'arbre plié : tronc effilé le long d'une courbe.
          const P = [[45, sy], [40, by - 40], [150, by - 85], [241, by - 34]];
          const larg = (t) => 14 * (1 - t) + 3 * t;
          const g = [], d = [];
          for (let i = 0; i <= 40; i++) {
            const t = i / 40, p = bez(P, t), T = tan(P, t), w = larg(t) / 2;
            g.push([p[0] + T[1] * w, p[1] - T[0] * w]);
            d.push([p[0] - T[1] * w, p[1] + T[0] * w]);
          }
          out.push(h.chemin([...g, ...d.reverse()], blanc(h.a.contour), true));
          // Lenticelles du bouleau.
          // Rameaux : deux sur l'arc, et la cime qui dépasse la corde.
          const rameau = (b, T, ang, L) => {
            const dir = [T[0] * Math.cos(ang) - T[1] * Math.sin(ang), T[0] * Math.sin(ang) + T[1] * Math.cos(ang)];
            const m = [b[0] + dir[0] * L * 0.55, b[1] + dir[1] * L * 0.55];
            return `M ${b[0]} ${b[1]} Q ${m[0] + dir[1] * 2} ${m[1] - dir[0] * 2} ${b[0] + dir[0] * L} ${b[1] + dir[1] * L}`;
          };
          const ram = [[0.4, -0.9, 20], [0.58, -0.75, 22], [0.76, -0.7, 17]].map(([t, ang, L]) => {
            const p = bez(P, t), T = tan(P, t), w = larg(t) / 2;
            const b = [p[0] + T[1] * w, p[1] - T[0] * w];
            const f = [b[0] + (T[0] * Math.cos(ang) - T[1] * Math.sin(ang)) * L * 0.5, b[1] + (T[0] * Math.sin(ang) + T[1] * Math.cos(ang)) * L * 0.5];
            return rameau(b, T, ang, L) + ' ' + rameau(f, T, ang * 0.3, L * 0.4);
          });
          const T1 = tan(P, 1);
          [-1.1, -0.7, -0.35, 0].forEach((ang, i) => ram.push(rameau(P[3], T1, ang, [12, 16, 15, 9][i])));
          out.push(h.path(ram.join(' '), h.a.detail));
          // Le redressement, au déclenchement.
          out.push(h.fleche(`M 272 ${by - 36} C 276 ${by - 50} 270 ${by - 60} 256 ${by - 64}`));

          // La corde du bout de l'arbre au bâtonnet.
          out.push(h.ligne(241, by - 34, 241, by - 3, h.a.arete));

          // Le lièvre d'Amérique, de face, accroupi sur la piste, pour l'échelle.
          const L = (pts) => pts.map(([x, y]) => [tc + x, sy + y]);
          const sym = (f) => [-1, 1].forEach(f);
          // Gros pieds de derrière, à plat sur la neige tassée.
          sym((s) => out.push(h.path(`M ${tc + s * 6} ${sy + 9} C ${tc + s * 8} ${sy + 3} ${tc + s * 22} ${sy + 2} ${tc + s * 36} ${sy + 4} C ${tc + s * 40} ${sy + 5} ${tc + s * 40} ${sy + 9} ${tc + s * 36} ${sy + 9} Z`, blanc(h.a.detail))));
          // Le corps ramassé : cuisses larges en bas, épaules étroites sous la tête.
          out.push(h.path(`M ${tc - 12} ${sy - 36} C ${tc - 24} ${sy - 30} ${tc - 32} ${sy - 12} ${tc - 30} ${sy + 4} L ${tc + 30} ${sy + 4} C ${tc + 32} ${sy - 12} ${tc + 24} ${sy - 30} ${tc + 12} ${sy - 36} Z`, blanc(h.a.detail)));
          // Le pli des cuisses.
          sym((s) => out.push(h.path(`M ${tc + s * 26} ${sy - 14} C ${tc + s * 19} ${sy - 10} ${tc + s * 16} ${sy - 3} ${tc + s * 16} ${sy + 4}`, h.a.fin)));
          // Pattes de devant, droites, posées entre les pieds.
          sym((s) => out.push(h.path(`M ${tc + s * 2} ${sy - 18} C ${tc + s * 1} ${sy - 8} ${tc + s * 2} ${sy - 1} ${tc + s * 2} ${sy + 3} C ${tc + s * 2} ${sy + 7} ${tc + s * 10} ${sy + 7} ${tc + s * 10} ${sy + 3} C ${tc + s * 10} ${sy - 3} ${tc + s * 11} ${sy - 10} ${tc + s * 12} ${sy - 16}`, blanc(h.a.detail))));
          // Oreilles : plus courtes que la tête, le bout noir.
          sym((s) => {
            out.push(h.path(`M ${tc + s * 4} ${sy - 58} C ${tc + s * 3} ${sy - 70} ${tc + s * 7} ${sy - 80} ${tc + s * 12} ${sy - 83} C ${tc + s * 17} ${sy - 79} ${tc + s * 16} ${sy - 68} ${tc + s * 12} ${sy - 57} Z`, blanc(h.a.detail)));
            out.push(h.path(`M ${tc + s * 6.6} ${sy - 77} C ${tc + s * 8.5} ${sy - 80.5} ${tc + s * 10} ${sy - 82} ${tc + s * 12} ${sy - 83} C ${tc + s * 14.5} ${sy - 81} ${tc + s * 15.6} ${sy - 79} ${tc + s * 15.8} ${sy - 77} Z`, h.a.plein));
          });
          // La tête : front étroit, joues larges et touffues, menton.
          out.push(h.path(`M ${tc} ${sy - 62} C ${tc + 9} ${sy - 62} ${tc + 14} ${sy - 56} ${tc + 15} ${sy - 49} L ${tc + 18} ${sy - 45} L ${tc + 15} ${sy - 43} L ${tc + 17} ${sy - 40} C ${tc + 13} ${sy - 35} ${tc + 6} ${sy - 33} ${tc} ${sy - 33} C ${tc - 6} ${sy - 33} ${tc - 13} ${sy - 35} ${tc - 17} ${sy - 40} L ${tc - 15} ${sy - 43} L ${tc - 18} ${sy - 45} L ${tc - 15} ${sy - 49} C ${tc - 14} ${sy - 56} ${tc - 9} ${sy - 62} ${tc} ${sy - 62} Z`, blanc(h.a.detail)));
          // Yeux sur les côtés de la tête, en amande.
          sym((s) => out.push(h.path(`M ${tc + s * 10} ${sy - 50} C ${tc + s * 11} ${sy - 53.5} ${tc + s * 13.5} ${sy - 54} ${tc + s * 14.5} ${sy - 51.5} C ${tc + s * 14} ${sy - 49} ${tc + s * 11.5} ${sy - 48.5} ${tc + s * 10} ${sy - 50} Z`, h.a.plein)));
          // Nez et bouche fendue.
          out.push(h.path(`M ${tc - 2.2} ${sy - 42} L ${tc + 2.2} ${sy - 42} L ${tc} ${sy - 39.5} Z`, h.a.plein));
          out.push(h.path(`M ${tc} ${sy - 39.5} L ${tc} ${sy - 37.5} M ${tc} ${sy - 37.5} C ${tc - 1.5} ${sy - 36} ${tc - 3.5} ${sy - 36} ${tc - 4.5} ${sy - 37} M ${tc} ${sy - 37.5} C ${tc + 1.5} ${sy - 36} ${tc + 3.5} ${sy - 36} ${tc + 4.5} ${sy - 37}`, h.a.fin));

          // La boucle : juste plus grande que la tête, son bas au menton, le fil monte au bâtonnet.
          out.push(h.cercle(tc, sy - 53, 21, h.a.arete));
          out.push(h.cercle(tc, sy - 76.5, 2.5, h.a.arete));
          out.push(h.ligne(tc, sy - 79, tc, by + 3, h.a.arete));

          // Le bâtonnet, son bout dans le crochet du piquet.
          out.push(h.rect(tc - 16, by - 3, sx0 + 4 - (tc - 16), 6, blanc(h.a.arete)));
          out.push(h.path([tc - 2, tc + 2, 239, 243].map((x) => `M ${x} ${by - 4.5} L ${x + 1.5} ${by + 4.5}`).join(' '), h.a.detail));

          // Le piquet, et sa partie plantée.
          out.push(h.chemin([[sx0, by - 22], [sx1, by - 22], [sx1, sy], [sx0, sy], [sx0, by + 12], [sx0 + 6.5, by - 3], [sx0, by - 3]], blanc(h.a.contour), true));
          out.push(h.chemin([[sx0, sy], [sx0, z.h - 22], [(sx0 + sx1) / 2, z.h - 12], [sx1, z.h - 22], [sx1, sy]], h.a.cache));

          return out.join('\n');
        },
        renvois: (z) => {
          const sy = z.h - 30, by = sy - 114, tc = 172;
          const P = [[45, sy], [40, by - 40], [150, by - 85], [241, by - 34]];
          const t = 0.2, p = bez(P, t), T = tan(P, t), w = (12 * (1 - t) + 3.5 * t) / 2;
          const cible = [p[0] + T[1] * w, p[1] - T[0] * w];
          return [
            { n: 1, rond: [20, cible[1] - 30], cible },
            { n: 2, rond: [z.l - 22, sy - 48], cible: [264, sy - 48] },
            { n: 5, rond: [tc - 62, sy - 70], cible: [tc - 21, sy - 53] },
          ].map((r, i) => ({ ...r, texte: ['jeune bouleau plié vers la piste', 'piquet fiché à côté de la piste', 'boucle du collet sur la piste'][i] }));
        },
      },
      declencheur: {
        titre: 'Le déclencheur, de près',
        dessin: (z) => {
          const byd = 110, e = 12, D = 62, x0 = 135, x1 = 185, xs = 162;   // épaulement : de x0 à xs, à byd - e
          const pente = (y) => xs - (xs - x0) * (y - (byd - e)) / D;
          const bout = pente(byd + e);
          const bas = z.h - 12;
          const out = [];

          // La corde, torse, qui tire vers le haut.
          out.push(h.ligne(57.5, 6, 57.5, byd - e, h.a.detail));
          out.push(h.ligne(62.5, 6, 62.5, byd - e, h.a.detail));
          const tors = [];
          for (let y = 10; y < byd - e - 4; y += 8) tors.push(`M 57.5 ${y + 5} C 59 ${y + 3} 61 ${y + 1.5} 62.5 ${y}`);
          out.push(h.path(tors.join(' '), h.a.detail));
          out.push(h.fleche(`M 36 ${byd - 40} L 36 ${byd - 95}`));

          // Le bâtonnet, cassé à gauche : il continue au-dessus de la piste.
          const baton = [[bout, byd - e], [14, byd - e], [8, byd - 6], [16, byd], [8, byd + 6], [14, byd + e], [bout, byd + e]];
          out.push(h.chemin(baton, h.a.blanc, true));
          // le dessous du bâtonnet, à l'ombre
          out.push(h.chemin([[10, byd + 4.5], [bout, byd + 4.5], [bout, byd + e], [14, byd + e], [8, byd + 6]], h.a.ombre, true));
          out.push(h.chemin(baton, h.a.contour, true));
          out.push(h.ligne(26, byd - 3, bout - 8, byd - 3, h.a.detail));
          out.push(h.ligne(20, byd + 6, bout - 30, byd + 6, h.a.detail));
          // La ligature de la corde.
          out.push(h.path([0, 1, 2].map((i) => `M ${52 + i * 7} ${byd - e - 2} L ${57 + i * 7} ${byd + e + 2}`).join(' '), h.a.arete));

          // Le piquet et son crochet : épaulement à plat, pan incliné dessous.
          const piquet = [[x0, 26], [x0 + 5, 20], [x1 - 5, 20], [x1, 26], [x1, bas], [172, bas - 5], [160, bas + 4], [147, bas - 4], [x0, bas + 1],
            [x0, byd - e + D], [xs, byd - e], [x0, byd - e]];
          out.push(h.chemin(piquet, h.a.blanc, true));
          // la face de droite du piquet, à l'ombre
          out.push(h.chemin([[171, 20], [x1 - 5, 20], [x1, 26], [x1, bas], [172, bas - 5]], h.a.ombre, true));
          out.push(h.chemin(piquet, h.a.contour, true));
          // Fil du bois.
          const sous = (x) => byd - e + (xs - x) / (xs - x0) * D;
          [[148, 30, byd - e - 6], [148, sous(148) + 6, bas - 10], [160, 30, byd - e - 6], [160, sous(160) + 6, bas - 10], [174, 30, bas - 10]].forEach(([x, y1, y2]) => {
            out.push(h.path(`M ${x} ${y1} C ${x - 2} ${(2 * y1 + y2) / 3} ${x + 2} ${(y1 + 2 * y2) / 3} ${x} ${y2}`, h.a.detail));
          });

          // le point qui décide, et qui gèle : le bâtonnet sous l'épaulement, son bout sur le pan
          out.push(h.controle((xs + bout) / 2, byd, 19));

          return out.join('\n');
        },
        renvois: (z) => [
          { n: 3, rond: [104, 186], cible: [143, 142], texte: "crochet taillé dans le piquet" },
          { n: 4, rond: [36, 170], cible: [42, 122], texte: "bâtonnet en travers, porte la tension" },
        ],
      },
    },
  };
};
