// 16-08a — Ramoner sans brosse : les écouvillons et le manche (ch. 16, « Ramoner sans brosse » ;
// ch. 15, « Le ramonage sans brosse »). Page b : les montages.
// Chaque vue a son repère en unités de modèle, mis à l'échelle de la vue par rep().
// Aucune cote : le chapitre ne donne aucune mesure de ces outils, seulement « au diamètre du
// tuyau » et « un peu plus large que le conduit », que le dessin montre au tireté.
// La charte : les perches du manche et le manchon, vus en élévation, ont leur dessous à l'ombre.
// Le rouge : les deux flèches du pli, les deux moitiés des brins rabattues d'un même geste (deux
// marques, une vue). Pas de point à contrôler : le chapitre n'en nomme pas.

const f = v => Math.round(v * 10) / 10;
const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');

function rep(z, Wm, Hm, m = 6) {
  const s = Math.min((z.l - 2 * m) / Wm, (z.h - 2 * m) / Hm);
  const ox = (z.l - Wm * s) / 2, oy = (z.h - Hm * s) / 2;
  const P = (x, y) => [ox + x * s, oy + y * s];
  P.s = s;
  return P;
}
const pt = (P, x, y) => P(x, y).map(f).join(' ');
// commandes : [['M', x, y], ['L', x, y], ['Q', cx, cy, x, y], ['C', …], ['Z']]
const trace = (P, cmds) => cmds.map(c => {
  const v = c.slice(1), o = [];
  for (let i = 0; i < v.length; i += 2) o.push(pt(P, v[i], v[i + 1]));
  return c[0] + (o.length ? ' ' + o.join(' ') : '');
}).join(' ');

// une corde droite : deux traits fins, et la torsion des torons
function corde(h, P, a, b, e = 2.1) {
  const [x1, y1] = a, [x2, y2] = b;
  const L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L, nx = -uy * e, ny = ux * e;
  const o = [h.chemin([P(x1 + nx, y1 + ny), P(x2 + nx, y2 + ny), P(x2 - nx, y2 - ny), P(x1 - nx, y1 - ny)], blanc(h.a.detail), true)];
  const tw = [];
  for (let t = 2; t < L - 3; t += 4.2)
    tw.push(`M${pt(P, x1 + ux * t - nx, y1 + uy * t - ny)} L${pt(P, x1 + ux * (t + 2.6) + nx, y1 + uy * (t + 2.6) + ny)}`);
  if (tw.length) o.push(h.path(tw.join(' '), h.a.fin));
  return o.join('\n');
}

// un bout de broche tordu : deux brins fins qui s'enroulent l'un sur l'autre, n tours
function torsade(h, P, a, b, amp = 1.3, n = 3.5) {
  // chaque demi-tour, un brin passe en biais par-dessus l'autre : 2n traits obliques jointifs
  const [x1, y1] = a, [x2, y2] = b, L = Math.hypot(x2 - x1, y2 - y1);
  const ux = (x2 - x1) / L, uy = (y2 - y1) / L, nx = -uy, ny = ux, k = Math.round(2 * n), d = L / k, o = [];
  for (let i = 0; i < k; i++) {
    const t0 = i * d, t1 = t0 + d * 1.25;
    o.push(`M${pt(P, x1 + ux * t0 + nx * amp, y1 + uy * t0 + ny * amp)} Q${pt(P, x1 + ux * (t0 + d * 0.9) + nx * amp, y1 + uy * (t0 + d * 0.9) + ny * amp)} ${pt(P, x1 + ux * t1 - nx * amp, y1 + uy * t1 - ny * amp)}`);
  }
  return h.path(o.join(' '), h.a.detail);
}

// un maillon de chaîne vu à plat ou de chant, orienté selon l'angle a
function maillon(h, P, cx, cy, a, rx, ry) {
  const pts = [];
  for (let i = 0; i < 20; i++) {
    const t = 2 * Math.PI * i / 20, x = rx * Math.cos(t), y = ry * Math.sin(t);
    pts.push(P(cx + x * Math.cos(a) - y * Math.sin(a), cy + x * Math.sin(a) + y * Math.cos(a)));
  }
  return h.chemin(pts, blanc(h.a.arete), true);
}

module.exports = (h) => {
  // ─── le goupillon ───
  const tige = (P, cx) => [
    h.ligne(...P(cx, 21), ...P(cx, 219), h.a.contour),
    h.cercle(...P(cx, 14), 7 * P.s, h.a.contour),
    h.cercle(...P(cx, 226), 7 * P.s, h.a.contour),
  ].join('\n');
  // les brins pliés à cheval sur la tige
  const plie = (P, cx, bas) => {
    const o = [];
    for (let i = 0; i < 6; i++) {
      const dx = 3.2 + i * 1.35, top = 93 - i * 1.4;
      const b1 = bas + (i * 7) % 5, b2 = bas + (i * 3) % 4;
      o.push(h.path(trace(P, [['M', cx - dx, b1], ['L', cx - dx, top + dx], ['Q', cx - dx, top, cx, top],
        ['Q', cx + dx, top, cx + dx, top + dx], ['L', cx + dx, b2]]), h.a.detail));
    }
    return o.join('\n');
  };
  // la boucle de broche serrée sur le pli
  const broche = (P, cx) => {
    const o = [h.rect(...P(cx - 11.5, 99), 23 * P.s, 16 * P.s, h.a.blanc)];
    for (let k = 0; k < 4; k++) {
      const y = 99.5 + k * 4;
      o.push(h.path(trace(P, [['M', cx - 11.5, y], ['L', cx + 11.5, y + 2.6]]), h.a.arete));
    }
    o.push(torsade(h, P, [cx + 11.5, 107.5], [cx + 26, 109], 1.6));
    return o.join('\n');
  };
  const C1 = 55, C2 = 168, C3 = 278, R = 50, RC = 44;

  // ─── le manche ───
  // une perche écorcée, un peu effilée, le contour pas tout à fait droit
  const perche = (P, x0, x1, yc, r0, r1, graine) => {
    const n = 14, haut = [], bas = [];
    for (let i = 0; i <= n; i++) {
      const x = x0 + (x1 - x0) * i / n, r = r0 + (r1 - r0) * i / n;
      const w = Math.sin(i * 1.7 + graine) * 0.7;
      haut.push(P(x, yc - r + w)); bas.push(P(x, yc + r + w * 0.6));
    }
    // le dessous de la perche, à l'ombre : du tiers bas jusqu'au contour
    const mi = [];
    for (let i = 0; i <= n; i++) {
      const x = x0 + (x1 - x0) * i / n, r = r0 + (r1 - r0) * i / n;
      mi.push(P(x, yc + r * 0.38 + Math.sin(i * 1.7 + graine) * 0.4));
    }
    const sil = haut.concat(bas.slice().reverse());
    const o = [h.chemin(sil, h.a.blanc, true), h.chemin(mi.concat(bas.slice().reverse()), h.a.ombre, true), h.chemin(sil, h.a.contour, true)];
    o.push(h.path(trace(P, [['M', x0 + 12, yc - 4], ['Q', (x0 + x1) / 2, yc - 7, x1 - 14, yc - 3]]), h.a.fin));
    o.push(h.path(trace(P, [['M', x0 + 30, yc + 6], ['Q', (x0 + x1) / 2, yc + 4, x1 - 30, yc + 7]]), h.a.fin));
    return o.join('\n');
  };
  const noeud = (P, x, y) => h.ellipse(...P(x, y), 3.2 * P.s, 2 * P.s, h.a.detail);
  const bout = (P, x, yc, r) => h.ellipse(...P(x, yc), 3.5 * P.s, r * P.s, blanc(h.a.arete));

  return {
    ref: '82-08a',
    titre: 'Ramoner sans brosse : les écouvillons et le manche',
    desc: 'Le goupillon de broche en trois temps, sur une tige qui porte un œil à chaque bout : des brins de fil de clôture posés en travers à mi-longueur, puis pliés en deux à cheval sur la tige et serrés sur le pli par une boucle de broche, puis ouverts en jupe, un peu plus large que le conduit dessiné au tireté ; vu du bout, les brins rayonnent au-delà du cercle du conduit. À côté, les deux autres écouvillons : un fagot de branches de sapin baumier ou d’épinette serrées au diamètre du tuyau sur une corde qui le traverse, et une chaîne dans une poche de jute, montrée par une déchirure, ficelée au goulot sur la corde. Dessous, le manche : deux perches d’épinette écorcées bout à bout dans un manchon de tuyau, boulonné de chaque côté du joint, ou fendu, serré à la broche. Encadré danger : la chaîne raye et perce l’inox mince ; aucun écouvillon n’enlève la créosote vitrifiée.',
    format: 'pleine',
    disposition: [['goupillon', 'bout'], ['variantes', 'manchon']],
    hauteurs: [1.1, 1],
    largeurs: [[2.35, 1], [1, 1.45]],
    vues: {
      goupillon: {
        titre: 'Le goupillon : poser, plier et serrer, ouvrir',
        dessin: z => {
          const P = rep(z, 330, 240), o = [];
          // 1. poser les brins en travers
          o.push(tige(P, C1));
          for (let i = 0; i < 6; i++) {
            const y = 94 + i * 2.8;
            o.push(h.chemin([P(C1 - 46, y + (i - 2.5) * 0.9), P(C1 + 46, y - (i - 2.5) * 0.6)], h.a.detail));
          }
          o.push(h.geste(trace(P, [['M', C1 - 50, 116], ['Q', C1 - 50, 150, C1 - 22, 160]])));
          o.push(h.geste(trace(P, [['M', C1 + 50, 116], ['Q', C1 + 50, 150, C1 + 22, 160]])));
          // 2. pliés en deux autour de la tige, serrés sur le pli
          o.push(tige(P, C2), plie(P, C2, 139), broche(P, C2));
          // 3. ouverts en goupillon, un peu plus large que le conduit (tireté)
          o.push(h.ligne(...P(C3 - RC, 62), ...P(C3 - RC, 204), h.a.cache));
          o.push(h.ligne(...P(C3 + RC, 62), ...P(C3 + RC, 204), h.a.cache));
          o.push(tige(P, C3), plie(P, C3, 115));
          for (let k = 0; k < 18; k++) {
            const t = (k / 18) * 2 * Math.PI + 0.13, c = Math.cos(t), s = Math.sin(t);
            o.push(h.path(trace(P, [['M', C3 + 5 * c, 114], ['Q', C3 + 9 * c, 148 + 9 * s, C3 + R * c, 150 + 9 * s]]), h.a.detail));
          }
          o.push(broche(P, C3));
          return o.join('\n');
        },
        renvois: z => {
          const P = rep(z, 330, 240);
          return [
            { n: 1, rond: P(24, 16), cible: P(C1 - 7, 14), texte: 'tige, un œil à chaque bout' },
            { n: 2, rond: P(104, 72), cible: P(C1 + 38, 95), texte: 'brins de fil de clôture' },
            { n: 3, rond: P(206, 64), cible: P(C2 + 4, 87), texte: 'pliés à cheval sur la tige' },
            { n: 4, rond: P(212, 132), cible: P(C2 + 11, 111), texte: 'boucle de broche sur le pli' },
            { n: 5, rond: P(306, 212), cible: P(C3 + 28, 160), texte: 'ouverts en goupillon' },
          ];
        },
      },
      bout: {
        titre: 'Vu du bout',
        dessin: z => {
          const P = rep(z, 140, 140, 4), o = [];
          o.push(h.cercle(...P(70, 70), 50 * P.s, h.a.cache));
          for (let k = 0; k < 18; k++) {
            const t = (k / 18) * 2 * Math.PI + 0.13 + Math.sin(k * 2.3) * 0.06;
            const r1 = 55 + Math.sin(k * 1.9) * 1.5;
            o.push(h.path(trace(P, [['M', 70 + 7 * Math.cos(t), 70 + 7 * Math.sin(t)],
              ['Q', 70 + 32 * Math.cos(t + 0.05), 70 + 32 * Math.sin(t + 0.05), 70 + r1 * Math.cos(t + 0.02), 70 + r1 * Math.sin(t + 0.02)]]), h.a.detail));
          }
          o.push(h.cercle(...P(70, 70), 9 * P.s, blanc(h.a.arete)));
          o.push(h.cercle(...P(70, 70), 3.5 * P.s, h.a.plein));
          return o.join('\n');
        },
        renvois: z => {
          const P = rep(z, 140, 140, 4), t = -0.72;
          return [
            { n: 6, rond: P(128, 8), cible: P(70 + 50 * Math.cos(t), 70 + 50 * Math.sin(t)), texte: 'plus large que le conduit' },
          ];
        },
      },
      variantes: {
        titre: 'Le fagot, la chaîne en sac',
        dessin: z => {
          const P = rep(z, 220, 260), o = [];
          // le fagot : trois lits de branches serrés sur la corde qui le traverse
          const FX = 58;
          o.push(h.ligne(...P(FX - 36, 36), ...P(FX - 36, 222), h.a.cache));
          o.push(h.ligne(...P(FX + 36, 36), ...P(FX + 36, 222), h.a.cache));
          o.push(corde(h, P, [FX, 0], [FX, 260]));
          const lit = yb => {
            const l = [h.chemin([P(FX - 4, yb - 3), P(FX - 33, yb + 44), P(FX, yb + 58), P(FX + 33, yb + 44), P(FX + 4, yb - 3)], h.a.blanc, true)];
            for (let i = 0; i < 7; i++) {
              const a = -0.56 + i * (1.12 / 6), len = 50 + (i % 2) * 6;
              const sx = Math.sin(a), cy = Math.cos(a);
              const xb = FX + sx * 4, x1 = xb + sx * len, y1 = yb + cy * len;
              const cmds = [`M${pt(P, xb, yb)} L${pt(P, x1, y1)}`];
              for (let t = 8; t < len - 2; t += 3.4) {
                const px = xb + sx * t, py = yb + cy * t;
                cmds.push(`M${pt(P, px, py)} L${pt(P, px + cy * 3.2 + sx * 2, py - sx * 3.2 + cy * 2)}`);
                cmds.push(`M${pt(P, px, py)} L${pt(P, px - cy * 3.2 + sx * 2, py + sx * 3.2 + cy * 2)}`);
              }
              l.push(h.path(cmds[0], h.a.arete), h.path(cmds.slice(1).join(' '), h.a.fin));
            }
            return l.join('\n');
          };
          // la ligature : les talons serrés contre la corde, quatre tours de ficelle en biais, un nœud
          const ligature = yb => {
            const l = [h.rect(...P(FX - 6, yb - 10), 12 * P.s, 21 * P.s, h.a.blanc)];
            for (const dx of [-5, -3.2, -1.4, 1.4, 3.2, 5]) l.push(h.ligne(...P(FX + dx * 0.9, yb - 10), ...P(FX + dx, yb + 11), h.a.detail));
            l.push(h.ligne(...P(FX - 6.2, yb - 10), ...P(FX + 6.2, yb - 10), h.a.fin));
            for (let k = 0; k < 4; k++) {
              const y = yb - 4 + k * 3.4;
              l.push(h.path(trace(P, [['M', FX - 6.4, y], ['L', FX + 6.4, y + 1.6]]), h.a.arete));
            }
            l.push(h.cercle(...P(FX + 7.6, yb + 4.6), 1.6 * P.s, h.a.plein));
            l.push(h.path(trace(P, [['M', FX + 8.6, yb + 4.6], ['L', FX + 13, yb + 3], ['M', FX + 8.4, yb + 5.6], ['L', FX + 12, yb + 10]]), h.a.detail));
            return l.join('\n');
          };
          o.push(lit(168), lit(106), lit(44), ligature(168), ligature(106), ligature(44));
          // la chaîne dans une poche de jute
          const SX = 165;
          o.push(corde(h, P, [SX, 0], [SX, 62]));
          const sac = trace(P, [['M', SX - 5, 74], ['C', SX - 12, 84, SX - 26, 96, SX - 29, 124], ['C', SX - 32, 150, SX - 38, 180, SX - 36, 200],
            ['Q', SX - 38, 212, SX - 30, 214], ['Q', SX - 24, 219, SX, 219], ['Q', SX + 24, 219, SX + 31, 213], ['Q', SX + 39, 211, SX + 37, 199],
            ['C', SX + 38, 180, SX + 32, 150, SX + 29, 124], ['C', SX + 26, 96, SX + 12, 84, SX + 5, 74], ['Z']]);
          o.push(h.path(sac, h.a.hachure('grillage', 'contour')));
          o.push(h.chemin([[SX - 6, 64], [SX - 13, 52], [SX - 6, 56], [SX - 3, 48], [SX, 55], [SX + 4, 47], [SX + 6, 55], [SX + 13, 50], [SX + 6, 64]].map(q => P(...q)), blanc(h.a.detail), true));
          o.push(h.path(trace(P, [['M', SX - 3, 76], ['Q', SX - 12, 104, SX - 18, 140]]), h.a.detail));
          o.push(h.path(trace(P, [['M', SX + 1, 77], ['Q', SX + 2, 100, SX - 1, 132]]), h.a.detail));
          o.push(h.path(trace(P, [['M', SX + 4, 76], ['Q', SX + 12, 100, SX + 17, 136]]), h.a.detail));
          for (let k = 0; k < 3; k++)
            o.push(h.path(trace(P, [['M', SX - 8, 64 + k * 3.2], ['L', SX + 8, 65.8 + k * 3.2]]), h.a.arete));
          // la déchirure qui montre la chaîne
          const trou = [[SX - 26, 150], [SX - 14, 141], [SX - 2, 147], [SX + 12, 139], [SX + 27, 146], [SX + 29, 172], [SX + 26, 206], [SX + 8, 210], [SX - 12, 207], [SX - 27, 201], [SX - 29, 176]];
          o.push(h.chemin(trou.map(q => P(...q)), blanc(h.a.detail), true));
          const fil = [[SX - 20, 200], [SX + 18, 200], [SX + 20, 188], [SX - 18, 184], [SX - 16, 170], [SX + 19, 168], [SX + 17, 155], [SX - 10, 154]];
          let pas = 0;
          for (let i = 0; i < fil.length - 1; i++) {
            const [ax, ay] = fil[i], [bx, by] = fil[i + 1], L = Math.hypot(bx - ax, by - ay), a = Math.atan2(by - ay, bx - ax);
            for (let t = 3; t < L - 1; t += 6.4) {
              o.push(maillon(h, P, ax + (bx - ax) * t / L, ay + (by - ay) * t / L, a, 4.6, pas % 2 ? 1.2 : 2.8));
              pas++;
            }
          }
          return o.join('\n');
        },
        renvois: z => {
          const P = rep(z, 220, 260), FX = 58;
          return [
            { n: 7, rond: P(112, 122), cible: P(85, 145), texte: 'branches de sapin baumier' },
            { n: 8, rond: P(18, 26), cible: P(FX - 5, 42.5), texte: 'ligaturées sur la corde' },
            { n: 9, rond: P(214, 132), cible: P(183, 168), texte: 'chaîne dans un sac de jute' },
            { n: 10, rond: P(206, 40), cible: P(172, 68), texte: 'goulot ficelé sur la corde' },
          ];
        },
      },
      manchon: {
        titre: 'Le manche : perches bout à bout',
        dessin: z => {
          const P = rep(z, 360, 210), o = [];
          for (const [yc, broches] of [[52, false], [158, true]]) {
            o.push(perche(P, 8, 176, yc, 15, 14, yc), perche(P, 176, 352, yc, 14, 12.5, yc + 2));
            o.push(bout(P, 8, yc, 15), bout(P, 352, yc + 0.5, 12.5));
            o.push(noeud(P, 62, yc - 3), noeud(P, 300, yc + 4));
            o.push(h.rect(...P(128, yc - 18), 94 * P.s, 36 * P.s, h.a.blanc));
            o.push(h.rect(...P(128, yc + 6), 94 * P.s, 12 * P.s, h.a.ombre));   // le dessous du manchon, à l'ombre
            o.push(h.rect(...P(128, yc - 18), 94 * P.s, 36 * P.s, h.a.contour));
            o.push(h.ligne(...P(128, yc - 14.5), ...P(222, yc - 14.5), h.a.cache));
            o.push(h.ligne(...P(128, yc + 14), ...P(222, yc + 14), h.a.cache));
            o.push(h.ligne(...P(176, yc - 14.5), ...P(176, yc + 14), h.a.cache));
            if (!broches) {
              for (const bx of [150, 202]) {
                o.push(h.ligne(...P(bx, yc - 18), ...P(bx, yc + 18), h.a.cache));
                o.push(h.rect(...P(bx - 6, yc - 23), 12 * P.s, 5 * P.s, blanc(h.a.arete)));
                o.push(h.rect(...P(bx - 6, yc + 18), 12 * P.s, 5 * P.s, blanc(h.a.arete)));
                o.push(h.rect(...P(bx - 2.2, yc + 23), 4.4 * P.s, 4 * P.s, blanc(h.a.detail)));
              }
            } else {
              o.push(h.ligne(...P(128, yc - 7), ...P(222, yc - 7), h.a.detail));
              o.push(h.ligne(...P(128, yc - 5.4), ...P(222, yc - 5.4), h.a.detail));
              for (const x0 of [135, 199]) {
                for (let k = 0; k < 4; k++)
                  o.push(h.path(trace(P, [['M', x0 + k * 3.6, yc - 18.5], ['L', x0 + 3 + k * 3.6, yc + 18.5]]), h.a.arete));
                o.push(torsade(h, P, [x0 + 6, yc - 18.5], [x0 + 7, yc - 33], 1.6));
              }
            }
          }
          return o.join('\n');
        },
        renvois: z => {
          const P = rep(z, 360, 210);
          return [
            { n: 11, rond: P(64, 14), cible: P(64, 38), texte: 'perches d’épinette écorcées' },
            { n: 12, rond: P(250, 14), cible: P(214, 35), texte: 'manchon : un bout de tuyau' },
            { n: 13, rond: P(252, 102), cible: P(206, 75), texte: 'un boulon de chaque côté' },
            { n: 14, rond: P(104, 112), cible: P(140, 142), texte: 'ou fendu et serré à la broche' },
          ];
        },
      },
    },
    danger: 'La chaîne raye et peut percer un conduit d’acier inoxydable mince : sur une cheminée à double ou triple paroi, c’est le fagot, le goupillon, ou rien. Aucun des trois n’enlève la créosote vitrifiée.',
  };
};
