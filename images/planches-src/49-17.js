// Planche 49-17 — La perche à collet (chapitre 49, « Prendre l'oiseau sans tirer »).
// Vue 1 : le bout de la perche, fendu sur la longueur d'un doigt, le fil coincé dans la fente,
// la boucle coulissante pendue sous le bout. Vue 2 : de côté, le tétras perché sur une branche
// basse, tourné vers le chasseur ; la boucle pend devant sa tête, un peu basse, et la traction
// sèche va vers l'arrière et le haut. Vue 3 : de dessus, la perche arrive du sud-ouest, de côté,
// en travers devant la tête, et la boucle glisse par-dessus jusqu'au cou.
// Orientation : l'oiseau tourné vers l'ouest (à gauche), l'épinette derrière lui, le chasseur au
// sud-ouest. La boucle pend dans le plan vertical qui contient la perche.
// L'oiseau (JP, 12 octobre : « forme oiseau ressemble pas a une gelinotte ») : une vraie silhouette
// de tétras — tête petite, cou court et épais, poitrine pleine, plastron noir du mâle barré de blanc,
// sourcil nu, aile ronde, queue large en éventail tenue vers le bas avec sa bande au bout, pattes
// emplumées.
module.exports = (h) => {
  const blanc = (a) => a.replace('fill="none"', 'fill="#FFFFFF"');
  const fond = h.a.blanc;
  const P = (p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;

  // Une perche vue de côté, du bout tenu S au bout fendu T, rayon r, fente de longueur lf.
  // ombre : la face de dessous (côté +n), à l'ombre, peinte avant le trait.
  const perche = (S, T, r, lf, trait, fente = true, ombre = false) => {
    const L = Math.hypot(T[0] - S[0], T[1] - S[1]);
    const u = [(T[0] - S[0]) / L, (T[1] - S[1]) / L];
    const n = [-u[1], u[0]];
    const at = (b, s, t) => [b[0] + u[0] * s + n[0] * t, b[1] + u[1] * s + n[1] * t];
    const out = [];
    const F = at(T, -lf, 0);
    if (fente) {
      const o = r * 0.16;                  // les deux moitiés s'écartent un peu au bout
      out.push(h.chemin([at(S, 0, -r), at(F, 0, -r), at(T, 0, -r - o), at(T, 0, -o), F, at(T, 0, o), at(T, 0, r + o), at(F, 0, r), at(S, 0, r)], fond, true));
      if (ombre) out.push(h.chemin([at(S, 0, r * 0.45), at(F, 0, r * 0.45), at(T, 0, r * 0.45 + o), at(T, 0, r + o), at(F, 0, r), at(S, 0, r)], h.a.ombre, true));
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

  // Le tétras du Canada de profil, tourné vers la gauche, les pieds en (x0, y0), à l'échelle k.
  // Une poule de bois : tête petite et ronde, bec court, cou court, poitrine pleine, dos qui
  // descend vers une queue large tenue vers le bas, terminée par une bande claire ; pattes
  // emplumées jusqu'aux doigts ; le sourcil nu au-dessus de l'œil.
  const tetrasProfil = (x0, y0, k) => {
    const q = (x, y) => `${(x0 + k * x).toFixed(1)} ${(y0 + k * y).toFixed(1)}`;
    const d = (s) => s.replace(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g, (_, x, y) => q(+x, +y));
    return {
      queue: [
        h.path(d('M 42 -44 L 92 14 Q 84 38 60 42 L 26 -14 Z'), blanc(h.a.arete)),
        h.path(d('M 86 8 Q 80 30 58 34'), h.a.detail),
        h.path(d('M 48 -32 L 86 18 M 40 -24 L 76 30 M 32 -16 L 64 36'), h.a.fin),
      ].join('\n'),
      corps: [
        // Les pattes emplumées, courtes, sous le ventre.
        h.path(d('M -9 -10 C -11 -5 -9 -1 -7 0 L 1 0 C 2 -4 2 -7 1 -10 Z'), blanc(h.a.detail)),
        h.path(d('M 3 -10 C 2 -6 4 -2 5 0 L 11 0 C 12 -4 11 -7 10 -10 Z'), blanc(h.a.detail)),
        // La silhouette : front plat, nuque, cou court, dos long qui descend, croupion, ventre, poitrine.
        h.path(d('M -56 -84 C -55 -91 -50 -95 -43 -95 C -36 -95 -31 -91 -28 -84 C -24 -76 -14 -70 2 -66 C 22 -62 38 -54 46 -42 C 50 -36 50 -30 46 -24 C 40 -14 28 -6 14 -4 C -4 -2 -24 -6 -38 -18 C -50 -30 -56 -46 -55 -60 C -54 -68 -55 -74 -57 -78 Z'), blanc(h.a.arete)),
        // Le bec court, un peu crochu.
        h.path(d('M -56 -84 Q -62 -84 -64 -79 Q -60 -77 -57 -78 Z'), h.a.plein),
        // L'œil, et le sourcil nu en croissant au-dessus.
        h.cercle(x0 - 47 * k, y0 - 86 * k, 1.7 * k, h.a.plein),
        h.path(d('M -52 -89 Q -47 -94 -41 -90 Q -47 -91.5 -52 -89 Z'), h.a.plein),
        // L'aile repliée sur le flanc, les primaires qui croisent sur la base de la queue.
        h.path(d('M -18 -58 C 0 -60 20 -52 32 -38 C 38 -30 42 -24 46 -16 C 30 -17 10 -22 -4 -30 C -14 -36 -18 -46 -18 -58 Z'), blanc(h.a.detail)),
        h.path(d('M 10 -28 L 44 -17 M 18 -36 L 44 -19 M 25 -43 L 43 -21'), h.a.fin),
        // Le plastron noir du mâle, de la gorge à la poitrine, barré de blanc.
        h.path(d('M -57 -78 C -55 -74 -54 -68 -55 -60 C -56 -46 -50 -30 -40 -20 C -36 -26 -32 -34 -32 -44 C -32 -58 -38 -70 -46 -78 C -50 -80 -54 -79 -57 -78 Z'), h.a.plein),
        h.path([[-50, -60], [-44, -54], [-51, -48], [-41, -44], [-48, -38], [-38, -34], [-44, -28]]
          .map(([x, y]) => d(`M ${x - 3} ${y} Q ${x} ${y + 3} ${x + 3} ${y}`)).join(' '), 'fill="none" stroke="#FFFFFF" stroke-width="0.8" stroke-linecap="round"'),
        // Le reste du dessous, barré.
        h.path([[-28, -26], [-20, -18], [-30, -14], [-10, -12]]
          .map(([x, y]) => d(`M ${x - 3} ${y} Q ${x} ${y + 3} ${x + 3} ${y}`)).join(' '), h.a.fin),
        // Les doigts qui serrent la branche, trois devant, un derrière.
        h.path(d('M -6 0 Q -11 1 -15 4 M -4 0 Q -7 3 -10 6 M 6 0 Q 2 2 0 6 M 9 0 Q 13 2 15 5'), h.a.detail),
      ].join('\n'),
      tete: [x0 - 46 * k, y0 - 86 * k],
      bec: [x0 - 67 * k, y0 - 92 * k],
      poitrine: [x0 - 50 * k, y0 - 40 * k],
    };
  };

  // Le même oiseau vu de dessus, tourné vers la gauche (l'ouest), centré en (xc, yc), échelle k.
  const tetrasDessus = (xc, yc, k) => {
    const q = (x, y) => `${(xc + k * x).toFixed(1)} ${(yc + k * y).toFixed(1)}`;
    const d = (s) => s.replace(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g, (_, x, y) => q(+x, +y));
    return [
      // La queue en éventail, avec sa bande claire au bout.
      h.path(d('M 34 -9 L 64 -31 Q 96 0 64 31 L 34 9 Z'), blanc(h.a.arete)),
      h.path(d('M 60 -25 Q 85 0 60 25'), h.a.detail),
      h.path(d('M 40 -6 L 70 -20 M 40 0 L 76 0 M 40 6 L 70 20'), h.a.fin),
      // Le corps, large à la poitrine, qui s'amincit vers la queue.
      h.path(d('M -34 -7 C -30 -18 -14 -24 4 -24 C 24 -24 38 -16 44 -6 L 44 6 C 38 16 24 24 4 24 C -14 24 -30 18 -34 7 Z'), blanc(h.a.arete)),
      // Les deux ailes repliées sur le dos, les pointes qui se rejoignent au croupion.
      h.path(d('M -22 -18 C -6 -24 18 -22 34 -12 C 42 -7 48 -3 54 -1 C 40 -2 24 -4 8 -8 C -6 -11 -18 -12 -22 -18 Z'), blanc(h.a.detail)),
      h.path(d('M -22 18 C -6 24 18 22 34 12 C 42 7 48 3 54 1 C 40 2 24 4 8 8 C -6 11 -18 12 -22 18 Z'), blanc(h.a.detail)),
      h.path(d('M 22 -8 L 50 -2 M 22 8 L 50 2'), h.a.fin),
      h.path([[-20, 0], [-8, 0], [4, 0]].map(([x, y]) => d(`M ${x - 3} ${y - 3} Q ${x + 1} ${y} ${x - 3} ${y + 3}`)).join(' '), h.a.fin),
      // La tête ronde, le bec, les sourcils de chaque côté.
      h.cercle(xc - 40 * k, yc, 8.5 * k, blanc(h.a.arete)),
      h.path(d('M -48 -3 L -55 0 L -48 3 Z'), h.a.plein),
      h.path(d('M -45 -6.5 Q -41 -9 -37 -7 M -45 6.5 Q -41 9 -37 7'), h.a.arete),
    ].join('\n');
  };

  // Une ellipse quelconque, tournée de l'angle a, comme un chemin fermé.
  const ellipseTournee = (c, rx, ry, a, at) => {
    const pts = [];
    for (let i = 0; i < 48; i++) {
      const t = (i / 48) * 2 * Math.PI, x = rx * Math.cos(t), y = ry * Math.sin(t);
      pts.push([c[0] + x * Math.cos(a) - y * Math.sin(a), c[1] + x * Math.sin(a) + y * Math.cos(a)]);
    }
    return h.chemin(pts, at, true);
  };

  // ── Vue 1 : le bout de la perche ──
  const V1 = { yc: 104, r: 16, lf: 80, xt: 150, R: 54 };
  V1.E = [V1.xt + 64, V1.yc + 40];       // l'œil, en haut de la boucle, au-delà du bout

  // ── Vue 2 : de côté, l'oiseau tourné vers le chasseur ──
  const V2 = { x0: 172, yb: 256, k: 1.1, R: 15, rx: 9 };
  V2.L = [V2.x0 - 82 * V2.k, V2.yb - 75 * V2.k];   // centre de la boucle : devant le bec, un peu bas
  V2.E = [V2.L[0], V2.L[1] - V2.R];
  V2.T = [V2.E[0] - 30, V2.E[1] - 20];  // bout de la perche
  V2.S = [2, V2.T[1] + 40];

  // ── Vue 3 : de dessus ──
  const V3 = { xb: 360, yb: 96, k: 1.15, R: 17, a: -Math.PI / 6 };
  V3.u = [Math.cos(V3.a), Math.sin(V3.a)];
  V3.C = [V3.xb - 70 * V3.k, V3.yb];      // la boucle, devant le bec
  V3.T = [V3.C[0] - V3.u[0] * (V3.R + 7), V3.C[1] - V3.u[1] * (V3.R + 7)];
  V3.xtr = V3.xb - 2;                      // la branche, nord-sud, sous les pieds

  return {
    ref: '49-17',
    titre: 'La perche à collet',
    desc: 'Le bout d’une hampe de bouleau fendu sur la longueur d’un doigt : le fil du collet est coincé à plat dans la fente, sort au bout, descend à un petit œil et forme la boucle coulissante qui pend sous le bout. De côté, le tétras du Canada perché sur une branche basse, la tête haute, tourné vers le chasseur : petite tête, poitrine pleine au plastron noir, queue large en éventail tenue vers le bas ; la boucle pend devant sa tête, un peu basse, et une flèche montre la traction sèche vers l’arrière et vers le haut. De dessus, l’oiseau tourné vers l’ouest, la perche arrive du sud-ouest, de côté, et passe en travers devant la tête sans être pointée sur l’oiseau ; la boucle glisse par-dessus la tête jusqu’au cou. L’encadré danger dit à quoi se reconnaît l’oiseau malade, qui ne se prend pas.',
    format: 'pleine',
    disposition: [['bout', 'face'], ['dessus']],
    hauteurs: [3, 2],
    largeurs: [[1, 1], [1]],
    vues: {
      bout: {
        titre: 'Le bout de la perche',
        dessin: (z) => {
          const { yc, r, lf, xt, R, E } = V1;
          const out = [];
          const p = perche([14, yc], [xt, yc], r, lf, h.a.contour, true, true);
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
            { n: 3, rond: [E[0] + 46, E[1] - 26], cible: [E[0] + 4, E[1] - 2] },
            { n: 4, rond: [E[0] + R * Math.cos(a) + 20, E[1] + R + R * Math.sin(a) + 26], cible: [E[0] + R * Math.cos(a), E[1] + R + R * Math.sin(a)] },
          ].map((x, i) => ({ ...x, texte: ['hampe sèche, bouleau ou aulne', 'fente, le fil coincé dedans', 'œil où le fil coulisse', 'boucle de fil métallique fin'][i] }));
        },
      },

      face: {
        titre: 'De côté : la boucle devant la tête',
        dessin: (z) => {
          const { x0, yb, k, R, rx, L, E, T, S } = V2;
          const out = [];
          const xtr = z.l - 24;            // le tronc, derrière
          // le tronc est derrière l'oiseau : il recule en gris
          out.push(h.rect(xtr, 0, 18, z.h, h.a.loin), h.rect(xtr, 0, 18, z.h, h.a.arete));
          out.push(h.path([[4, 20, 14], [11, 70, 18], [6, 128, 12], [12, 190, 16], [5, 262, 14], [10, 296, 12]].map(([dx, y, l]) => `M ${xtr + dx} ${y} l 0.8 ${l}`).join(' '), h.a.fin));
          out.push(rameau([xtr, 40], [150, 70], 7, 2));
          const o = tetrasProfil(x0, yb, k);
          // La queue pend derrière la branche basse ; l'oiseau est perché dessus.
          out.push(o.queue);
          out.push(rameau([xtr, yb + 2], [x0 - 70, yb + 8], 10, 4));
          out.push(o.corps);
          // La perche, qui arrive de la gauche, et le collet.
          const p = perche(S, T, 8, 36, h.a.contour);
          out.push(p.svg);
          out.push(h.path(`M ${P(T)} L ${T[0] + 14} ${T[1] - 2} C ${E[0] - 4} ${T[1] - 3} ${E[0]} ${T[1] + 6} ${E[0]} ${E[1] - 2.5}`, h.a.arete));
          out.push(h.ellipse(L[0], L[1], rx, R, h.a.arete));
          out.push(h.cercle(E[0], E[1], 2.5, blanc(h.a.arete)));
          // Le geste : tirer sec, vers l'arrière et vers le haut.
          out.push(h.geste(`M ${T[0] + 6} ${T[1] - 14} C ${T[0] + 2} ${T[1] - 26} ${T[0] - 6} ${T[1] - 40} ${T[0] - 16} ${T[1] - 56}`));
          return out.join('\n');
        },
        renvois: (z) => {
          const { L, R, rx, T, x0, yb, k } = V2;
          const o = { poitrine: [x0 - 50 * k, yb - 40 * k] };
          return [
            { n: 5, rond: [60, 284], cible: [o.poitrine[0] + 8, o.poitrine[1] + 16] },
            { n: 6, rond: [22, L[1] + 50], cible: [L[0] - rx * 0.7, L[1] + R * 0.7] },
            { n: 7, rond: [T[0] + 46, T[1] - 52], cible: [T[0] - 4, T[1] - 34] },
          ].map((x, i) => ({ ...x, texte: ['oiseau sain, la tête haute', 'boucle devant, un peu en dessous', 'tirer sec, en arrière et en haut'][i] }));
        },
      },

      dessus: {
        titre: 'Vu de dessus : la perche arrive de côté',
        dessin: (z) => {
          const { xb, yb, k, R, a, u, C, T, xtr } = V3;
          const out = [];
          // L'épinette au nord : le tronc et ses branches ; la branche basse descend sous l'oiseau.
          [[-1, 0.05, 110], [1, 0.3, 140], [-0.5, -1, 30], [0.6, -1, 30]].forEach(([dx, dy, Lg]) => {
            const kk = Math.hypot(dx, dy);
            out.push(rameau([xtr, 16], [xtr + dx / kk * Lg, 16 + dy / kk * Lg], 6, 2));
          });
          out.push(rameau([xtr, 16], [xtr + 4, z.h - 6], 9, 3));
          out.push(h.cercle(xtr, 16, 10, blanc(h.a.arete)));
          out.push(tetrasDessus(xb, yb, k));
          // Où finit la boucle : serrée autour du cou.
          out.push(h.ellipse(xb - 32 * k, yb, 4, 12, h.a.cache));
          // La boucle, pendue sous la perche, en travers devant le bec.
          out.push(ellipseTournee(C, R, 5, a, h.a.arete));
          out.push(h.ligne(T[0], T[1], C[0] - u[0] * R, C[1] - u[1] * R, h.a.arete));
          // La perche, qui vient du sud-ouest, de côté, sans être pointée sur l'oiseau.
          const Lp = (z.h - 4 - T[1]) / -u[1];
          const S = [T[0] - u[0] * Lp, T[1] - u[1] * Lp];
          const n = [-u[1] * 4.5, u[0] * 4.5];
          out.push(h.chemin([[S[0] + n[0], S[1] + n[1]], [T[0] + n[0], T[1] + n[1]], [T[0] - n[0], T[1] - n[1]], [S[0] - n[0], S[1] - n[1]]], blanc(h.a.contour), true));
          out.push(h.path(`M ${P([S[0] + n[0], S[1] + n[1]])} C ${P([S[0] + n[0] * 0.3 + 3, S[1]])} ${P([S[0] - n[0] * 0.3 - 3, S[1]])} ${P([S[0] - n[0], S[1] - n[1]])}`, h.a.detail));
          // Le geste : la perche glisse, la boucle passe par-dessus la tête jusqu'au cou.
          out.push(h.geste(`M ${C[0] + 2} ${C[1] - 16} Q ${xb - 52 * k} ${yb - 30} ${xb - 33 * k} ${yb - 20}`));
          return out.join('\n');
        },
        renvois: () => {
          const { u, C, T, xb, yb, k } = V3;
          const Lp = (203 - 4 - T[1]) / -u[1];
          const mil = [T[0] - u[0] * Lp * 0.5, T[1] - u[1] * Lp * 0.5];
          return [
            { n: 8, rond: [mil[0] + u[1] * -40 + 0, mil[1] + u[0] * 40], cible: [mil[0] - u[1] * -4.5, mil[1] + u[0] * 4.5] },
            { n: 9, rond: [C[0] - 30, yb - 54], cible: [xb - 48 * k, yb - 26] },
          ].map((x, i) => ({ ...x, texte: ['perche de côté, jamais pointée', 'boucle glissée par-dessus la tête'][i] }));
        },
      },
    },
    danger: 'L’oiseau au sol, plumage gonflé, yeux fermés ou enflés, qui ne suit rien des yeux, est malade : il ne se prend pas, ne se touche pas et ne se mange pas.',
  };
};
