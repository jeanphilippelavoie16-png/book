// Planche 49-17 — La perche à collet (chapitre 49, « Prendre l'oiseau sans tirer »).
// Vue 1 : le bout de la perche, fendu sur la longueur d'un doigt, le fil coincé dans la fente,
// la boucle coulissante pendue sous le bout. Vue 2 : de face, la boucle devant la tête, un peu
// basse, et la traction sèche vers l'arrière et le haut. Vue 3 : de dessus, la perche arrive de
// côté, en travers devant la tête, et la boucle glisse par-dessus jusqu'au cou.
// Même orientation partout : le chasseur à l'ouest (à gauche), l'oiseau face au sud, l'épinette
// à l'est. La boucle pend dans le plan vertical qui contient la perche ; la fente est à plat,
// vue par la tranche. L'oiseau n'est qu'une silhouette, sans plumage ni détail d'espèce.
module.exports = (h) => {
  const blanc = (a) => a.replace('fill="none"', 'fill="#FFFFFF"');
  const fond = h.a.blanc;
  const P = (p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;

  // Une perche vue de côté, du bout tenu S au bout fendu T, rayon r, fente de longueur lf.
  const perche = (S, T, r, lf, trait, fente = true) => {
    const L = Math.hypot(T[0] - S[0], T[1] - S[1]);
    const u = [(T[0] - S[0]) / L, (T[1] - S[1]) / L];
    const n = [-u[1], u[0]];
    const at = (b, s, t) => [b[0] + u[0] * s + n[0] * t, b[1] + u[1] * s + n[1] * t];
    const out = [];
    const F = at(T, -lf, 0);
    if (fente) {
      const o = r * 0.16;                  // les deux moitiés s'écartent un peu au bout
      out.push(h.chemin([at(S, 0, -r), at(F, 0, -r), at(T, 0, -r - o), at(T, 0, -o), F, at(T, 0, o), at(T, 0, r + o), at(F, 0, r), at(S, 0, r)], fond, true));
      out.push(h.chemin([at(S, 0, -r), at(F, 0, -r), at(T, 0, -r - o), at(T, 0, -o)], trait));
      out.push(h.chemin([at(T, 0, o), at(T, 0, r + o), at(F, 0, r), at(S, 0, r)], trait));
      out.push(h.chemin([at(T, 0, -o), F, at(T, 0, o)], h.a.detail));
    } else {
      out.push(h.chemin([at(S, 0, -r), at(T, 0, -r), at(T, 0, r), at(S, 0, r)], fond, true));
      out.push(h.chemin([at(S, 0, -r), at(T, 0, -r), at(T, 0, r), at(S, 0, r)], trait));
    }
    // Arrachement au bout tenu.
    out.push(h.path(`M ${P(at(S, 0, -r))} C ${P(at(S, r * 0.6, -r * 0.4))} ${P(at(S, -r * 0.6, r * 0.4))} ${P(at(S, 0, r))}`, h.a.detail));
    return { svg: out.join('\n'), u, n, at, F };
  };

  // Un rameau d'épinette : l'axe, effilé, et des aiguilles courtes des deux côtés.
  const rameau = (A, B, e0, e1, pas = 7, lg = 6) => {
    const L = Math.hypot(B[0] - A[0], B[1] - A[1]);
    const u = [(B[0] - A[0]) / L, (B[1] - A[1]) / L], n = [-u[1], u[0]];
    const pt = (s, t) => [A[0] + u[0] * s + n[0] * t, A[1] + u[1] * s + n[1] * t];
    const w = (s) => (e0 * (1 - s / L) + e1 * (s / L)) / 2;
    const out = [h.chemin([pt(0, -w(0)), pt(L, -w(L)), pt(L, w(L)), pt(0, w(0))], blanc(h.a.detail), true)];
    const ai = [];
    for (let s = pas; s < L - 2; s += pas) {
      [-1, 1].forEach((c) => {
        const a = pt(s, c * w(s)), b = pt(s + lg * 0.7, c * (w(s) + lg * 0.7));
        ai.push(`M ${P(a)} L ${P(b)}`);
      });
    }
    out.push(h.path(ai.join(' '), h.a.fin));
    return out.join('\n');
  };

  // Un bras vu de dessus : un tube de largeur l, arrondi aux deux bouts.
  const tube = (A, B, l) => {
    const L = Math.hypot(B[0] - A[0], B[1] - A[1]), r = l / 2;
    const n = [-(B[1] - A[1]) / L * r, (B[0] - A[0]) / L * r];
    return h.path(`M ${P([A[0] + n[0], A[1] + n[1]])} L ${P([B[0] + n[0], B[1] + n[1]])} A ${r} ${r} 0 0 0 ${P([B[0] - n[0], B[1] - n[1]])} L ${P([A[0] - n[0], A[1] - n[1]])} A ${r} ${r} 0 0 0 ${P([A[0] + n[0], A[1] + n[1]])} Z`, blanc(h.a.detail));
  };

  // ── Vue 1 : le bout de la perche ──
  const V1 = { yc: 104, r: 16, lf: 80, xt: 170, R: 62 };
  V1.E = [V1.xt + 78, V1.yc + 40];       // l'œil, en haut de la boucle, au-delà du bout

  // ── Vue 2 : de face ──
  const V2 = { xc: 106, yb: 252, yt: 138, R: 32 };
  V2.yl = V2.yt + 9;                     // centre de la boucle, un peu sous la tête
  V2.E = [V2.xc, V2.yl - V2.R];
  V2.T = [V2.xc - 40, V2.E[1] - 21];     // bout de la perche
  V2.S = [4, V2.T[1] + 22];

  // ── Vue 3 : de dessus ──
  const V3 = { yP: 126, xb: 432, xT: 560, yT: 74, R: 17 };
  V3.xt = V3.xb - V3.R - 4;              // bout de la perche

  return {
    ref: '49-17',
    titre: 'La perche à collet',
    desc: 'Le bout d’une hampe de bouleau fendu sur la longueur d’un doigt : le fil du collet est coincé à plat dans la fente, sort au bout, descend à un petit œil et forme la boucle coulissante qui pend sous le bout. De face, le tétras perché sur une branche basse, la tête haute ; la boucle pend devant sa tête, un peu basse, et une flèche montre la traction sèche vers l’arrière et vers le haut. De dessus, le chasseur à l’ouest de l’oiseau : la perche arrive de côté et passe en travers devant la tête sans être pointée sur l’oiseau ; la boucle glisse par-dessus la tête jusqu’au cou. L’encadré danger dit à quoi se reconnaît l’oiseau malade, qui ne se prend pas.',
    format: 'pleine',
    disposition: [['bout', 'face'], ['dessus']],
    hauteurs: [3, 2],
    largeurs: [[3, 2], [1]],
    vues: {
      bout: {
        titre: 'Le bout de la perche',
        dessin: (z) => {
          const { yc, r, lf, xt, R, E } = V1;
          const out = [];
          const p = perche([14, yc], [xt, yc], r, lf, h.a.contour);
          out.push(p.svg);
          // Le fil : couché à plat dans la fente, il sort au bout et descend à l'œil.
          out.push(h.ligne(xt - lf + 10, yc, xt, yc, h.a.arete));
          out.push(h.path(`M ${xt} ${yc} L ${xt + 46} ${yc} C ${E[0] - 8} ${yc} ${E[0]} ${yc + 12} ${E[0]} ${E[1] - 4.5}`, h.a.arete));
          // La boucle, et l'œil où le fil coulisse.
          out.push(h.cercle(E[0], E[1] + R, R, h.a.arete));
          out.push(h.cercle(E[0], E[1], 4.5, blanc(h.a.arete)));
          out.push(h.ligne(E[0], E[1] - 4.5, E[0], E[1] + 4.5, h.a.arete));
          // La fente : la longueur d'un doigt.
          out.push(h.cote(xt - lf, yc - r - 20, xt, yc - r - 20, 'un doigt', { cote: 'dessus' }));
          return out.join('\n');
        },
        renvois: () => {
          const { yc, r, lf, xt, R, E } = V1;
          const a = Math.PI / 4;
          return [
            { n: 1, rond: [44, yc + r + 58], cible: [62, yc + r] },
            { n: 2, rond: [xt - lf - 36, yc - r - 24], cible: [xt - 40, yc] },
            { n: 3, rond: [E[0] + 52, E[1] - 26], cible: [E[0] + 4, E[1] - 2] },
            { n: 4, rond: [E[0] + R * Math.cos(a) + 28, E[1] + R + R * Math.sin(a) + 30], cible: [E[0] + R * Math.cos(a), E[1] + R + R * Math.sin(a)] },
          ].map((x, i) => ({ ...x, texte: ['hampe sèche, bouleau ou aulne', 'fente, le fil coincé dedans', 'œil où le fil coulisse', 'boucle de fil métallique fin'][i] }));
        },
      },

      face: {
        titre: 'Vu de face : la boucle devant la tête',
        dessin: (z) => {
          const { xc, yb, yt, yl, R, E, T, S } = V2;
          const out = [];
          const xtr = z.l - 34;            // le tronc
          // L'épinette : le tronc, un rameau au-dessus, la branche basse où l'oiseau est perché.
          out.push(h.rect(xtr, 0, 18, z.h, blanc(h.a.arete)));
          out.push(h.path([[4, 20, 14], [11, 70, 18], [6, 128, 12], [12, 190, 16], [5, 262, 14], [10, 296, 12]].map(([dx, y, l]) => `M ${xtr + dx} ${y} l 0.8 ${l}`).join(' '), h.a.fin));
          out.push(rameau([xtr, 34], [128, 58], 7, 2));
          // La queue, derrière la branche.
          out.push(h.path(`M ${xc - 15} ${yb - 6} L ${xc - 26} ${yb + 40} Q ${xc} ${yb + 48} ${xc + 26} ${yb + 40} L ${xc + 15} ${yb - 6} Z`, blanc(h.a.arete)));
          out.push(rameau([xtr, yb], [4, yb + 10], 11, 3));
          // Le corps, du cou aux flancs, posé sur la branche.
          out.push(h.path(`M ${xc - 9} ${yt + 8} C ${xc - 22} ${yt + 16} ${xc - 40} ${yt + 34} ${xc - 41} ${yb - 50} C ${xc - 42} ${yb - 22} ${xc - 34} ${yb - 2} ${xc - 20} ${yb + 2} L ${xc + 20} ${yb + 2} C ${xc + 34} ${yb - 2} ${xc + 42} ${yb - 22} ${xc + 41} ${yb - 50} C ${xc + 40} ${yt + 34} ${xc + 22} ${yt + 16} ${xc + 9} ${yt + 8} Z`, blanc(h.a.arete)));
          // Les ailes repliées.
          out.push(h.path(`M ${xc - 30} ${yt + 36} C ${xc - 34} ${yb - 60} ${xc - 34} ${yb - 30} ${xc - 26} ${yb - 6} M ${xc + 30} ${yt + 36} C ${xc + 34} ${yb - 60} ${xc + 34} ${yb - 30} ${xc + 26} ${yb - 6}`, h.a.detail));
          // Les doigts sur la branche.
          out.push(h.path([-13, 13].map((dx) => [-4, 0, 4].map((d) => `M ${xc + dx + d} ${yb - 2} q ${d * 0.3} 5 ${d * 0.2 - 1.5} 8`).join(' ')).join(' '), h.a.detail));
          // La tête haute : les yeux, le bec.
          out.push(h.cercle(xc, yt, 13, blanc(h.a.arete)));
          out.push(h.cercle(xc - 5.5, yt - 2, 1.2, h.a.plein));
          out.push(h.cercle(xc + 5.5, yt - 2, 1.2, h.a.plein));
          out.push(h.path(`M ${xc - 2.5} ${yt + 2} L ${xc + 2.5} ${yt + 2} L ${xc} ${yt + 7} Z`, h.a.plein));
          // La perche, qui arrive de la gauche, et le collet.
          const p = perche(S, T, 9, 40, h.a.contour);
          out.push(p.svg);
          out.push(h.path(`M ${P(T)} L ${T[0] + 24} ${T[1] - 4} C ${E[0] - 4} ${T[1] - 5} ${E[0]} ${T[1] + 6} ${E[0]} ${E[1] - 2.5}`, h.a.arete));
          out.push(h.cercle(xc, yl, R, h.a.arete));
          out.push(h.cercle(E[0], E[1], 2.5, blanc(h.a.arete)));
          // Tirer sec : vers l'arrière et vers le haut.
          out.push(h.fleche(`M ${T[0] + 2} ${T[1] - 16} C ${T[0] - 12} ${T[1] - 22} ${T[0] - 28} ${T[1] - 32} ${T[0] - 42} ${T[1] - 46}`));
          return out.join('\n');
        },
        renvois: (z) => {
          const { xc, yb, yl, R, T } = V2;
          const a = Math.PI * 0.28;
          return [
            { n: 5, rond: [22, yb - 62], cible: [xc - 40, yb - 50] },
            { n: 6, rond: [z.l - 58, yl + 48], cible: [xc + R * Math.cos(a), yl + R * Math.sin(a)] },
            { n: 7, rond: [T[0] + 28, T[1] - 48], cible: [T[0] - 16, T[1] - 26] },
          ].map((x, i) => ({ ...x, texte: ['oiseau sain, la tête haute', 'boucle devant, un peu en dessous', 'tirer sec, en arrière et en haut'][i] }));
        },
      },

      dessus: {
        titre: 'Vu de dessus : la perche arrive de côté',
        dessin: (z) => {
          const { yP, xb, xT, yT, R, xt } = V3;
          const out = [];
          // L'épinette vue d'en haut : le tronc et ses branches basses.
          [[-0.8, -0.6, 86], [0.1, -1, 58], [1, -0.25, 32], [0.6, 0.8, 44], [-0.55, 0.83, 40]].forEach(([dx, dy, L]) => {
            const k = Math.hypot(dx, dy);
            out.push(rameau([xT, yT], [xT + dx / k * L, yT + dy / k * L], 6, 2));
          });
          out.push(rameau([xT, yT], [xb - 70, yT + 4], 8, 2.5));
          out.push(h.cercle(xT, yT, 10, blanc(h.a.arete)));
          // Le tétras, face au sud : la queue, le corps, les ailes, la tête et le bec.
          out.push(h.path(`M ${xb - 8} ${yT - 22} L ${xb - 21} ${yT - 52} Q ${xb} ${yT - 64} ${xb + 21} ${yT - 52} L ${xb + 8} ${yT - 22} Z`, blanc(h.a.arete)));
          out.push(h.ellipse(xb, yT, 20, 29, blanc(h.a.arete)));
          out.push(h.path(`M ${xb - 13} ${yT - 18} C ${xb - 19} ${yT - 4} ${xb - 18} ${yT + 12} ${xb - 12} ${yT + 22} M ${xb + 13} ${yT - 18} C ${xb + 19} ${yT - 4} ${xb + 18} ${yT + 12} ${xb + 12} ${yT + 22}`, h.a.detail));
          const yh = yP - 22;
          out.push(h.cercle(xb, yh, 7.5, blanc(h.a.arete)));
          out.push(h.path(`M ${xb - 3} ${yh + 6} L ${xb + 3} ${yh + 6} L ${xb} ${yh + 11} Z`, h.a.plein));
          // Où finit la boucle : autour du cou.
          out.push(h.ellipse(xb, yh - 7, R, 6, h.a.cache));
          // Le chasseur, à l'ouest, face à l'est : épaules, bras, tête.
          const xh = 58;
          out.push(h.ellipse(xh, yP, 26, 50, blanc(h.a.detail)));
          out.push(tube([xh + 4, yP - 38], [xh + 78, yP - 3], 14));
          out.push(tube([xh + 4, yP + 38], [xh + 44, yP + 3], 14));
          out.push(h.cercle(xh + 2, yP, 16, blanc(h.a.detail)));
          out.push(h.path(`M ${xh + 17} ${yP - 5} L ${xh + 23} ${yP} L ${xh + 17} ${yP + 5}`, h.a.detail));
          // La boucle, pendue sous la perche, en travers devant le bec.
          out.push(h.ellipse(xb, yP, R, 6, h.a.arete));
          // Le fil, du bout de la perche à l'œil, au-dessus de la boucle.
          out.push(h.ligne(xt, yP, xb, yP, h.a.arete));
          // La perche, rompue : sa longueur est celle qu'il faut pour ne pas avancer d'un pas.
          const xr = 250;
          out.push(h.rect(xh + 30, yP - 4.5, xr - 4 - (xh + 30), 9, blanc(h.a.arete)));
          out.push(h.rect(xr + 4, yP - 4.5, xt - xr - 4, 9, blanc(h.a.arete)));
          [xr - 4, xr + 4].forEach((x) => out.push(h.path(`M ${x} ${yP - 4.5} C ${x + 3} ${yP - 1.5} ${x - 3} ${yP + 1.5} ${x} ${yP + 4.5}`, h.a.detail)));
          // Les mains sur la perche.
          out.push(h.ellipse(xh + 44, yP, 7, 6, blanc(h.a.detail)));
          out.push(h.ellipse(xh + 78, yP, 7, 6, blanc(h.a.detail)));
          // La perche glisse vers le nord : la boucle passe par-dessus la tête.
          out.push(h.fleche(`M ${xb + R + 8} ${yP + 3} C ${xb + R + 16} ${yP - 4} ${xb + R + 16} ${yP - 16} ${xb + R + 8} ${yP - 25}`));
          return out.join('\n');
        },
        renvois: () => {
          const { yP, xb, R } = V3;
          return [
            { n: 8, rond: [330, yP + 42], cible: [330, yP + 4.5] },
            { n: 9, rond: [xb + R + 52, yP + 18], cible: [xb + R + 14, yP - 11] },
          ].map((x, i) => ({ ...x, texte: ['perche de côté, jamais pointée', 'boucle glissée par-dessus la tête'][i] }));
        },
      },
    },
    danger: 'L’oiseau au sol, plumage gonflé, yeux fermés ou enflés, qui ne suit rien des yeux, est malade : il ne se prend pas, ne se touche pas et ne se mange pas.',
  };
};
