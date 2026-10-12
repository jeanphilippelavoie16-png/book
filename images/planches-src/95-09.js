// Planche 95-09 — Le châssis froid (chapitre 74, § « Voler des degrés aux deux bouts »).
// Le chapitre dit : un cadre de planches plus haut au nord qu'au sud, une vieille fenêtre posée
// dessus en couvercle, ouverte le matin, fermée avant le coucher du soleil. Il ne donne aucune
// mesure : aucune cote. Le dessin compte en largeurs de planche : deux au sud, trois au nord,
// le haut de chaque côté scié en biais. Charnière de cuir, poteaux de coin et cale : ce qui
// traîne partout, pour que la fenêtre tienne et s'ouvre.
module.exports = (h) => {
  const blanc = (a) => a.replace('fill="none"', 'fill="#FFFFFF"');
  const E = 0.14, P = 0.36, W = 7, D = 4.2, HS = 2, HN = 3, T = 0.3, F = 0.5, M = 0.16;
  const L = Math.hypot(D, HN - HS);
  const haut = (y) => HS + (HN - HS) * y / D;            // dessus d'un côté, du sud au nord
  const poly = (pts, a) => h.chemin(pts, a, true);

  // ─── La vue d'ensemble : projection oblique, sud devant, est à droite ───
  const kc = 0.5 * Math.cos(35 * Math.PI / 180), ks = 0.5 * Math.sin(35 * Math.PI / 180);
  const C = 0.6;                                          // levée du bord sud, cale sur le chant
  const th1 = Math.asin((HN - HS - C) / L);
  const u1 = [-Math.cos(th1), -Math.sin(th1)], n1 = [-Math.sin(th1), Math.cos(th1)];
  const repP = (z) => {
    const ext = [8.9, 4.7];
    const s = Math.min((z.l - 150) / ext[0], (z.h - 26) / ext[1]);
    const ox = 75 + (z.l - 150 - s * ext[0]) / 2 + s * 0.15, oy = z.h - 12;
    const p = (x, y, zz) => [ox + s * (x + y * kc), oy - s * (zz + y * ks)];
    const fen = (x, r, k) => {                            // r : du bord sud (0) au bord nord (L)
      const d = L - r;
      return p(x, D + u1[0] * d + n1[0] * T * k, HN + u1[1] * d + n1[1] * T * k);
    };
    return { s, p, fen };
  };

  // ─── La coupe nord-sud, fenêtre fermée, regard vers l'ouest : sud à gauche ───
  const th0 = Math.atan((HN - HS) / D);
  const u0 = [-Math.cos(th0), -Math.sin(th0)], n0 = [-Math.sin(th0), Math.cos(th0)];
  const wp = (r, k) => [D + u0[0] * (L - r) + n0[0] * T * k, HN + u0[1] * (L - r) + n0[1] * T * k];
  const repC = (z) => {
    const ext = [5.7, 4.3];
    const s = Math.min((z.l - 70) / ext[0], (z.h - 14) / ext[1]);
    const ox = 20 + (z.l - 70 - s * ext[0]) / 2 + s * 1.2, oy = 7 + s * 3.75;
    const q = (y, zz) => [ox + s * y, oy - s * zz];
    return { s, q };
  };
  const RAYONS = [1.0, 1.8, 2.8];
  const dirS = [Math.cos(20 * Math.PI / 180), -Math.sin(20 * Math.PI / 180)];

  // ─── Le coin coupé à plat : u vers l'est (0 à la face est), v vers le nord (0 à la face sud) ───
  const repK = (z) => {
    const s = Math.min((z.l - 16) / 1.27, (z.h - 16) / 1.05);
    const X0 = z.l - 8 - s * 0.3, Y0 = z.h - 8 - s * 0.06;
    const k = (u, v) => [X0 + s * u, Y0 - s * v];
    return { s, k };
  };

  // ─── La cale : coupe au coin sud, trois fois ───
  const CALES = [[0.6, 0.3], [0.3, 0.6], [0.6, 1.1]];     // largeur nord-sud, hauteur
  const repL = (z) => {
    const s = Math.min((z.l - 20) / (3 * 2.8), (z.h - 10) / 2.05);
    const z0 = 0.45;
    const pos = CALES.map((_, i) => {
      const cx = z.l * (i + 0.5) / 3 - s * 0.4;
      return (y, zz) => [cx + s * y, z.h - 5 - s * zz];
    });
    return { s, pos, z0 };
  };
  const fenL = (th, r, k) => {                             // fenêtre ouverte, penchée de th
    const u = [-Math.cos(th), -Math.sin(th)], n = [-Math.sin(th), Math.cos(th)];
    const d = L - r;
    return [D + u[0] * d + n[0] * T * k, HN + u[1] * d + n[1] * T * k];
  };

  return {
    ref: '95-09',
    titre: 'Le châssis froid',
    desc: 'Un cadre de planches sans fond, deux planches de haut au sud et trois au nord ; le haut de chaque côté est une planche sciée en long, en biais, une moitié par côté. Une vieille fenêtre le couvre, retenue au bord nord par deux bandes de cuir clouées qui font charnière ; le matin, son bord sud se lève sur une cale posée sur chaque coin sud. En coupe nord-sud, fenêtre fermée : le soleil bas entre par la vitre, les plants poussent à même la terre, un poteau carré tient chaque coin. Un coin coupé à plat : la planche du sud couvre le bout de la planche de côté, et chacune est clouée dans le poteau. La cale : le même bloc de bois à plat, sur le chant ou debout donne trois ouvertures.',
    format: 'pleine',
    disposition: [['monte'], ['coupe', 'coin'], ['cale']],
    hauteurs: [1.2, 1.1, 0.85],
    largeurs: [[1], [1.6, 1], [1]],
    vues: {
      monte: {
        titre: 'Monté, ouvert le matin',
        dessin: (z) => {
          const { s, p, fen } = repP(z);
          const out = [];
          // Face est du cadre, puis face sud.
          out.push(poly([p(W, 0, 0), p(W, D, 0), p(W, D, HN), p(W, 0, HS)], blanc(h.a.contour)));
          out.push(poly([p(0, 0, 0), p(W, 0, 0), p(W, 0, HS), p(0, 0, HS)], blanc(h.a.contour)));
          // Joints de planches.
          out.push(h.chemin([p(0, 0, 1), p(W, 0, 1), p(W, D, 1)], h.a.detail));
          out.push(h.chemin([p(W, 0, HS), p(W, D, HS)], h.a.detail));
          // Bouts des planches sud et nord, vus sur la face est.
          out.push(h.chemin([p(W, E, 0), p(W, E, haut(E))], h.a.detail));
          out.push(h.chemin([p(W, D - E, 0), p(W, D - E, haut(D - E))], h.a.detail));
          // Clous : ils trahissent les poteaux de coin.
          const clou = (pt) => h.cercle(pt[0], pt[1], 1.5, h.a.plein);
          [E + P / 2, W - E - P / 2].forEach((x) => [0.3, 0.7, 1.3, 1.7].forEach((zz) => out.push(clou(p(x, 0, zz)))));
          [E + P / 2, D - E - P / 2].forEach((y) => [0.3, 0.7, 1.3, 1.7].forEach((zz) => out.push(clou(p(W, y, zz)))));
          [2.3, 2.6].forEach((zz) => out.push(clou(p(W, D - E - P / 2, zz))));
          // L'ouverture : le dedans, dans l'ombre, sous le bord levé.
          const ombre = [];
          for (let zz = HS + 0.07; zz < HS + C - 0.05; zz += 0.075) ombre.push(`M ${p(1.2, 0, zz).join(' ')} L ${p(W - 1.2, 0, zz).join(' ')}`);
          for (let zz = HS + 0.07; zz < HN - 0.03; zz += 0.075) {
            const ya = (zz - HS) * D / (HN - HS), yb = Math.max(0.33, D - (HN - zz) / Math.tan(th1));
            if (ya - yb > 0.05) ombre.push(`M ${p(W, yb, zz).join(' ')} L ${p(W, ya, zz).join(' ')}`);
          }
          out.push(h.path(ombre.join(' '), h.a.fin));
          // Les deux cales, sur le chant, sur les coins sud.
          [[0.1, 1.2], [W - 1.2, W - 0.1]].forEach(([x0, x1]) => {
            out.push(poly([p(x1, 0.02, HS), p(x1, 0.32, HS), p(x1, 0.32, HS + C), p(x1, 0.02, HS + C)], blanc(h.a.arete)));
            out.push(poly([p(x0, 0.02, HS), p(x1, 0.02, HS), p(x1, 0.02, HS + C), p(x0, 0.02, HS + C)], blanc(h.a.arete)));
            const fil = [0.2, 0.4].map((f) => `M ${p(x0 + 0.1, 0.02, HS + C * f).join(' ')} L ${p(x1 - 0.1, 0.02, HS + C * f).join(' ')}`).join(' ');
            out.push(h.path(fil, h.a.fin));
          });
          // La fenêtre : bout est, rive sud, dessus.
          out.push(poly([fen(W, 0, 0), fen(W, L, 0), fen(W, L, 1), fen(W, 0, 1)], blanc(h.a.contour)));
          out.push(poly([fen(0, 0, 0), fen(W, 0, 0), fen(W, 0, 1), fen(0, 0, 1)], blanc(h.a.contour)));
          out.push(poly([fen(0, 0, 1), fen(W, 0, 1), fen(W, L, 1), fen(0, L, 1)], blanc(h.a.contour)));
          // Les carreaux, trois sur deux.
          const pw = (W - 2 * F - 2 * M) / 3, ph = (L - 2 * F - M) / 2;
          for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) {
            const x0 = F + i * (pw + M), r0 = F + j * (ph + M);
            out.push(poly([fen(x0, r0, 1), fen(x0 + pw, r0, 1), fen(x0 + pw, r0 + ph, 1), fen(x0, r0 + ph, 1)], h.a.arete));
            const a = fen(x0 + pw * 0.55, r0 + ph * 0.25, 1), b = fen(x0 + pw * 0.8, r0 + ph * 0.6, 1);
            const c = fen(x0 + pw * 0.66, r0 + ph * 0.22, 1), d = fen(x0 + pw * 0.88, r0 + ph * 0.48, 1);
            out.push(h.path(`M ${a.join(' ')} L ${b.join(' ')} M ${c.join(' ')} L ${d.join(' ')}`, h.a.fin));
          }
          // Les bandes de cuir au bord nord.
          [[1.2, 1.75], [W - 1.75, W - 1.2]].forEach(([x0, x1]) => {
            out.push(poly([fen(x0, L - F + 0.04, 1), fen(x1, L - F + 0.04, 1), fen(x1, L, 1), fen(x0, L, 1)], h.a.plein));
          });
          return out.join('\n');
        },
        renvois: (z) => {
          const { p, fen } = repP(z);
          const g = (pt, dx = 0, dy = 0) => [pt[0] + dx, pt[1] + dy];
          return [
            { n: 1, rond: [22, p(0, 0, 3.6)[1]], cible: fen(1.4, 1.1, 1), texte: 'vieille fenêtre en couvercle' },
            { n: 2, rond: g(p(W, D, HN), 42, -10), cible: p(W, D - E / 2, 2.6), texte: 'nord : trois planches de haut' },
            { n: 3, rond: [22, p(0, 0, 0.8)[1]], cible: p(2.2, 0, 0.5), texte: 'sud : deux planches de haut' },
            { n: 4, rond: g(p(W, D, 1.9), 42, 0), cible: p(W, D * 0.72, 2.4), texte: 'demi-planche sciée en biais' },
            { n: 5, rond: [22, p(0, 0, 2.3)[1]], cible: p(0.45, 0.02, 2.3), texte: 'cale sous chaque coin sud' },
          ];
        },
      },
      coupe: {
        titre: 'En coupe nord-sud, fermé',
        dessin: (z) => {
          const { s, q } = repC(z);
          const out = [];
          const Q = (pts) => pts.map(([y, zz]) => q(y, zz));
          // La terre.
          out.push(h.rect(q(-1.2, 0)[0], q(0, 0)[1], s * (D + 1.55), s * 0.5, h.a.hachure('terre', 'aucun')));
          out.push(h.chemin(Q([[-1.2, 0], [D + 0.35, 0]]), h.a.arete));
          // Le côté ouest, vu au fond : ses planches et ses deux poteaux.
          out.push(h.chemin(Q([[E, 0], [E, haut(E)], [D - E, haut(D - E)], [D - E, 0]]), h.a.arete));
          out.push(h.chemin(Q([[E, 1], [D - E, 1]]), h.a.detail));
          out.push(h.chemin(Q([[E, 2], [D - E, 2]]), h.a.detail));
          out.push(poly(Q([[E, 0], [E + P, 0], [E + P, haut(E + P)], [E, haut(E)]]), blanc(h.a.arete)));
          out.push(poly(Q([[D - E - P, 0], [D - E, 0], [D - E, haut(D - E)], [D - E - P, haut(D - E - P)]]), blanc(h.a.arete)));
          // Les plants.
          [[1.25, 0.75], [2.2, 0.9], [3.1, 0.8]].forEach(([y, ht]) => {
            const [bx, by] = q(y, 0), tx = by - s * ht;
            out.push(h.path(`M ${bx} ${by} C ${bx - 2} ${by - s * ht * 0.4} ${bx + 2} ${by - s * ht * 0.7} ${bx} ${tx}`, h.a.arete));
            const feuille = (sx, ty) => `M ${bx} ${ty} Q ${bx + sx * 5} ${ty - 9} ${bx + sx * 17} ${ty - 7} Q ${bx + sx * 10} ${ty + 3} ${bx} ${ty} Z M ${bx + sx * 2} ${ty - 1} L ${bx + sx * 13} ${ty - 6}`;
            out.push(h.path(feuille(-1, tx + 5), blanc(h.a.detail)));
            out.push(h.path(feuille(1, tx + 1), blanc(h.a.detail)));
          });
          // Les murs sud et nord, coupés, planche par planche.
          [0, 1].forEach((i) => out.push(poly(Q([[0, i], [E, i], [E, i + 1], [0, i + 1]]), h.a.hachure('bois'))));
          [0, 1, 2].forEach((i) => out.push(poly(Q([[D - E, i], [D, i], [D, i + 1], [D - E, i + 1]]), h.a.hachure('bois'))));
          // La fenêtre coupée : traverses, petit-bois, vitre.
          out.push(poly(Q([wp(0, 0), wp(F, 0), wp(F, 1), wp(0, 1)]), h.a.hachure('bois')));
          out.push(poly(Q([wp(L - F, 0), wp(L, 0), wp(L, 1), wp(L - F, 1)]), h.a.hachure('bois')));
          out.push(poly(Q([wp(L / 2 - M / 2, 0.3), wp(L / 2 + M / 2, 0.3), wp(L / 2 + M / 2, 1), wp(L / 2 - M / 2, 1)]), h.a.hachure('bois')));
          out.push(h.chemin(Q([wp(F, 0.72), wp(L / 2 - M / 2, 0.72)]), h.a.arete));
          out.push(h.chemin(Q([wp(L / 2 + M / 2, 0.72), wp(L - F, 0.72)]), h.a.arete));
          // La bande de cuir, par-dessus le bord nord, clouée à la traverse et au mur.
          const g = 0.035, nb = [-u0[0], -u0[1]];
          const add = (pt, ...vs) => vs.reduce((a, v) => [a[0] + v[0] * g, a[1] + v[1] * g], pt);
          out.push(h.chemin(Q([add(wp(L - F + 0.03, 1), n0), add(wp(L, 1), n0, nb), add([D, HN], [1, 0.4]), add([D, HN - 0.7], [1, 0])]), h.a.contour));
          [L - 0.36, L - 0.14].forEach((r) => {
            out.push(h.chemin(Q([wp(r, 1 + 2 * g / T), wp(r, 0.3)]), h.a.arete));
            out.push(h.chemin(Q([add(wp(r - 0.07, 1), n0, n0), add(wp(r + 0.07, 1), n0, n0)]), h.a.contour));
          });
          [HN - 0.22, HN - 0.52].forEach((zz) => {
            out.push(h.chemin(Q([[D + 2 * g, zz], [D - E + 0.02, zz]]), h.a.arete));
            out.push(h.chemin(Q([[D + 2 * g, zz - 0.07], [D + 2 * g, zz + 0.07]]), h.a.contour));
          });
          // Le soleil bas, du sud, qui passe la vitre.
          RAYONS.forEach((r) => {
            const G = wp(r, 0.72);
            const a = [G[0] - dirS[0] * 2.0, G[1] - dirS[1] * 2.0], b = [G[0] + dirS[0] * 0.55, G[1] + dirS[1] * 0.55];
            out.push(h.fleche(`M ${q(...a).join(' ')} L ${q(...b).join(' ')}`, h.a.detail));
          });
          return out.join('\n');
        },
        renvois: (z) => {
          const { s, q } = repC(z);
          const G = wp(RAYONS[0], 0.72);
          const a = [G[0] - dirS[0] * 1.6, G[1] - dirS[1] * 1.6];
          return [
            { n: 6, rond: q(-0.85, 1.85), cible: q(...a), texte: 'soleil bas, du sud' },
            { n: 7, rond: [z.l - 18, q(D, HN + 0.55)[1]], cible: q(D + 0.07, HN - 0.35), texte: 'charnière : bande de cuir' },
            { n: 8, rond: [z.l - 18, q(D, 1.2)[1]], cible: q(D - E - P / 2, 1.2), texte: 'poteau carré à chaque coin' },
            { n: 9, rond: [z.l - 18, q(D, -0.35)[1]], cible: q(D - 1.2, -0.3), texte: 'sans fond, à même la terre' },
          ];
        },
      },
      coin: {
        titre: 'Un coin, coupé à plat',
        dessin: (z) => {
          const { s, k } = repK(z);
          const out = [];
          const K = (pts) => pts.map(([u, v]) => k(u, v));
          out.push(poly(K([[-0.93, 0], [0, 0], [0, E], [-0.93, E]]), h.a.hachure('bois')));
          out.push(poly(K([[-E, E], [0, E], [0, 0.93], [-E, 0.93]]), h.a.hachure('bois')));
          out.push(poly(K([[-E - P, E], [-E, E], [-E, E + P], [-E - P, E + P]]), blanc(h.a.contour)));
          const [pcx, pcy] = k(-E - P / 2 - 0.03, E + P / 2 - 0.02);
          [0.06, 0.11, 0.16].forEach((r) => out.push(h.cercle(pcx, pcy, s * r, h.a.fin)));
          out.push(h.chemin([[pcx, pcy], k(-E - P + 0.02, E + P * 0.8)], h.a.fin));
          // Clous : tige en aplat, tête à plat sur la face.
          const clou = (u0c, v0c, u1c, v1c) => {
            const horiz = v0c === v1c;
            const tw = 0.022, hw = 0.06, he = 0.022;
            out.push(horiz
              ? h.rect(k(Math.max(u0c, u1c), 0)[0] - s * Math.abs(u1c - u0c), k(0, v0c + tw / 2)[1], s * Math.abs(u1c - u0c), s * tw, h.a.plein)
              : h.rect(k(u0c - tw / 2, 0)[0], k(0, Math.max(v0c, v1c))[1], s * tw, s * Math.abs(v1c - v0c), h.a.plein));
            out.push(horiz
              ? h.rect(k(u0c, 0)[0], k(0, v0c + hw / 2)[1], s * he, s * hw, h.a.plein)
              : h.rect(k(u0c - hw / 2, 0)[0], k(0, v0c)[1], s * hw, s * he, h.a.plein));
          };
          clou(-E - P * 0.35, -0.022, -E - P * 0.35, E + 0.2);
          clou(-E / 2, -0.022, -E / 2, E + 0.2);
          clou(0.022, E + P * 0.72, -E - 0.2, E + P * 0.72);
          return out.join('\n');
        },
        renvois: (z) => {
          const { k } = repK(z);
          return [
            { n: 10, rond: k(-0.72, 0.72), cible: k(-E - P * 0.72, E + P * 0.62), texte: 'planches clouées au poteau' },
            { n: 11, rond: k(0.2, 0.34), cible: k(-0.01, E * 0.55), texte: 'le sud couvre le bout du côté' },
          ];
        },
      },
      cale: {
        titre: 'La cale : un bloc, trois ouvertures',
        dessin: (z) => {
          const { s, pos, z0 } = repL(z);
          const out = [];
          CALES.forEach(([lc, hc], i) => {
            const q = pos[i];
            const Q = (pts) => pts.map(([y, zz]) => q(y, zz));
            // Le mur sud et le poteau, coupés, avec un trait de rupture en bas.
            out.push(poly(Q([[0, 0], [E, 0], [E, z0], [0, z0]]), h.a.hachure('bois')));
            out.push(poly(Q([[E, 0], [E + P, 0], [E + P, z0], [E, z0]]), h.a.hachure('bois')));
            // Le bloc.
            const yc = (E + P) / 2;
            out.push(poly(Q([[yc - lc / 2, z0], [yc + lc / 2, z0], [yc + lc / 2, z0 + hc], [yc - lc / 2, z0 + hc]]), blanc(h.a.contour)));
            if (i < 2) {                                   // bout du bloc : les cernes
              const [cx, cy] = q(yc + lc * 0.3, z0 + hc * 0.15);
              [0.08, 0.16, 0.24].forEach((r) => {
                const rr = s * r;
                out.push(h.path(`M ${cx - rr} ${cy} A ${rr} ${rr} 0 0 1 ${cx} ${cy - rr}`, h.a.fin));
              });
            } else {                                       // debout : le fil monte
              [0.3, 0.55].forEach((f) => out.push(h.chemin(Q([[yc - lc / 2 + lc * f, z0 + 0.12], [yc - lc / 2 + lc * f + 0.03, z0 + hc - 0.12]]), h.a.fin)));
            }
            // La fenêtre levée : traverse du sud, vitre qui file au nord.
            const th = Math.atan((HN - HS - hc) / (D - (yc - lc / 2))), dz = z0 - HS;   // posée sur l'arête sud du bloc
            const tr = (pt) => [pt[0], pt[1] + dz];
            out.push(poly(Q([fenL(th, 0, 0), fenL(th, F, 0), fenL(th, F, 1), fenL(th, 0, 1)].map(tr)), h.a.hachure('bois')));
            out.push(h.chemin(Q([fenL(th, F, 0.72), fenL(th, F + 1.05, 0.72)].map(tr)), h.a.arete));
          });
          return out.join('\n');
        },
        renvois: (z) => {
          const { s, pos, z0 } = repL(z);
          const t = ['à plat : entrouvert', 'sur le chant : à demi', 'debout : grand ouvert'];
          return CALES.map(([lc, hc], i) => ({
            n: 12 + i,
            rond: pos[i](-0.75, z0 + hc / 2 + 0.1),
            cible: pos[i]((E + P) / 2 - lc / 2 + 0.04, z0 + hc / 2),
            texte: t[i],
          }));
        },
      },
    },
  };
};
