module.exports = (h) => {
  // Les porteurs de la descente, en pictogramme (règle 8), à l'échelle du blessé (1,75 m ≈ 119).
  // Devant : face à l'aval, entre les brancards, il se penche en arrière contre la charge ; bras
  // tendus le long du corps, il serre le bout des brancards comme les mancherons d'une brouette.
  // La main se pose là où le bras tendu tombe d'équerre sur le brancard (cercle de Thalès entre
  // l'épaule et le pied du brancard). Derrière : face au traîneau, penché vers l'amont, la corde
  // dans les deux poings.
  const E_P = 0.068;
  const geoDescente = z => {
    const pente = (z.h - 17 - 148) / z.l, ys = x => z.h - 17 - pente * x;
    const th = Math.atan(pente), c = Math.cos(th), s = Math.sin(th);
    const x0 = 148, y0 = ys(148);
    const T = (a, n) => [x0 + a * c - n * s, y0 - a * s - n * c];
    const b0 = T(47, 3);
    const av = { x: 34, y: ys(34), pose: 'portage', echelle: E_P, cote: 'gauche', angle: -th / Math.PI * 180, penche: -36, regard: -6 };
    const S = h.formes.personnage(av).epaules.proche;
    const C = [(S[0] + b0[0]) / 2, (S[1] + b0[1]) / 2], R = Math.hypot(b0[0] - S[0], b0[1] - S[1]) / 2;
    const aD = Math.atan2(b0[1] - S[1], b0[0] - S[0]), al = Math.acos(42 / (2 * R));
    const main = [S[0] + 42 * Math.cos(aD + al), S[1] + 42 * Math.sin(aD + al)];
    return { pente, ys, th, T, b0, av, main, r0: T(165, 4) };
  };
  const W = at => at.replace('fill="none"', 'fill="#ffffff"');
  const f = v => v.toFixed(1);
  const P = pts => pts.map(p => `${f(p[0])},${f(p[1])}`);
  const halo = 'fill="none" stroke="#ffffff" stroke-width="6" stroke-linecap="round"';

  // Barre effilée de (x1, y1) à (x2, y2), épaisseur e1 au départ, e2 à l'arrivée.
  const barre = (x1, y1, x2, y2, e1, e2, at) => {
    const L = Math.hypot(x2 - x1, y2 - y1), nx = -(y2 - y1) / L, ny = (x2 - x1) / L;
    return h.chemin([[x1 + nx * e1 / 2, y1 + ny * e1 / 2], [x2 + nx * e2 / 2, y2 + ny * e2 / 2],
      [x2 - nx * e2 / 2, y2 - ny * e2 / 2], [x1 - nx * e1 / 2, y1 - ny * e1 / 2]], at, true);
  };

  // Silhouette au trait : des gélules unies, le contour d'abord, le blanc par-dessus.
  const gelule = (p, q, r) => {
    const L = Math.hypot(q[0] - p[0], q[1] - p[1]) || 0.01;
    const nx = -(q[1] - p[1]) / L * r, ny = (q[0] - p[0]) / L * r;
    return `M${f(p[0] + nx)},${f(p[1] + ny)} L${f(q[0] + nx)},${f(q[1] + ny)} A${r},${r} 0 0 0 ${f(q[0] - nx)},${f(q[1] - ny)} L${f(p[0] - nx)},${f(p[1] - ny)} A${r},${r} 0 0 0 ${f(p[0] + nx)},${f(p[1] + ny)} Z`;
  };
  const silhouette = (membres, tete) => {
    const d = [];
    for (const [pts, r] of membres) for (let i = 0; i < pts.length - 1; i++) d.push(gelule(pts[i], pts[i + 1], r));
    const tt = `M${f(tete[0] - tete[2])},${f(tete[1])} a${tete[2]},${tete[2]} 0 1 0 ${f(2 * tete[2])},0 a${tete[2]},${tete[2]} 0 1 0 ${f(-2 * tete[2])},0 Z`;
    d.push(tt);
    return [h.path(d.join(' '), h.a.contour), h.path(d.join(' '), h.a.blanc)].join('\n');
  };

  // Lissage d'une polyligne par les milieux.
  const lisse = pts => {
    let d = `M${P([pts[0]])}`;
    for (let i = 1; i < pts.length - 1; i++) {
      const m = [(pts[i][0] + pts[i + 1][0]) / 2, (pts[i][1] + pts[i + 1][1]) / 2];
      d += ` Q${P([pts[i]])} ${P([m])}`;
    }
    return d + ` L${P([pts[pts.length - 1]])}`;
  };

  return {
    ref: '16-08',
    titre: 'Le traîneau-civière de perches',
    desc: 'Deux perches d’épinette plus longues qu’un homme couché, quatre traverses posées dessus et ligaturées à chaque croisée, un brancard lié le long de chaque perche à l’avant, puis couché par-dessus le bout de la première traverse, qui le relève vers les mains du porteur. En coupe à la poitrine : les perches sur la neige, une traverse, trois couches de sapin croisées, la couverture autour du blessé, une sangle par-dessus qui fait le tour des perches. En détail, une croisée ligaturée en babiche, et la même au fil de fer, bouts tordus en queue de cochon. En descente, un homme devant tient les brancards à bout de bras et se retient, un deuxième derrière freine à la corde ; le blessé est sanglé à la poitrine, au bassin et aux cuisses. En variante, un capot de véhicule retourné, bombé, ses bords relevés.',
    format: 'pleine',
    disposition: [['plan'], ['coupe', 'ligature'], ['descente', 'capot']],
    hauteurs: [2, 2, 3],
    largeurs: [[1], [1, 1], [3, 1]],
    vues: {
      // ─── Le cadre vu de dessus : l'avant (brancards) à gauche, la tête à droite ───
      plan: {
        titre: 'Le cadre, vu de dessus',
        dessin: z => {
          const o = [], cy = z.h / 2;
          const yA = cy - 44, yB = cy + 44, x0 = 214, x1 = 574;
          const TR = [240, 348, 458, 562];
          // perches : plus grosses au pied, à l'avant
          for (const y of [yA, yB]) {
            o.push(barre(x0, y, x1, y, 13, 10, W(h.a.contour)));
            o.push(h.ligne(x0 + 20, y + 1.5, x0 + 150, y + 1.5, h.a.fin), h.ligne(x0 + 190, y - 1.5, x1 - 30, y - 1.5, h.a.fin));
          }
          // traverses, posées sur les perches ; la première déborde sous les brancards
          TR.forEach((x, i) => {
            const d = i === 0 ? 60 : 52;
            o.push(barre(x, cy - d, x, cy + d, 9, 9, W(h.a.arete)));
            // babiche de chaque croisée : trois tours sur la traverse, de part et d'autre de la perche
            for (const y of [yA, yB]) for (const sg of [-1, 1]) {
              const yy = y + sg * 8.5;
              o.push(h.rect(x - 6, yy - 2, 12, 4, W(h.a.detail)));
            }
          });
          // brancards : couchés le long de chaque perche à l'arrière, ils montent par-dessus le bout
          // de la première traverse, qui les soulève vers les mains ; un peu resserrés devant
          const yBr = x => 48 + 7.5 * (x - 4) / 312;
          for (const sg of [-1, 1]) {
            o.push(barre(4, cy + sg * 48, 316, cy + sg * 55.5, 7, 9, W(h.a.arete)));
            o.push(h.ligne(20, cy + sg * 48.4, 150, cy + sg * 51.5, h.a.fin));
            // ligature sur le bout de la traverse : tours sur le brancard, de part et d'autre
            for (const dx of [-8.5, 8.5]) o.push(h.rect(TR[0] + dx - 2, cy + sg * yBr(TR[0]) - 6, 4, 12, W(h.a.detail)));
            // ligature brancard-perche, derrière
            const yb = cy + sg * yBr(302), yp = cy + sg * 44;
            o.push(h.rect(298, Math.min(yb, yp) - 10, 9, Math.abs(yb - yp) + 20, W(h.a.arete)));
            o.push(h.ligne(301, Math.min(yb, yp) - 10, 301, Math.max(yb, yp) + 10, h.a.detail));
            o.push(h.ligne(304, Math.min(yb, yp) - 10, 304, Math.max(yb, yp) + 10, h.a.detail));
          }
          // l'homme couché, en tireté : les perches le dépassent aux deux bouts
          const hom = [[534, cy - 15], [528, cy - 33], [436, cy - 33], [430, cy - 27], [418, cy - 23], [306, cy - 15],
            [277, cy - 15], [277, cy - 2], [415, cy], [277, cy + 2], [277, cy + 15], [306, cy + 15], [418, cy + 23],
            [430, cy + 27], [436, cy + 33], [528, cy + 33], [534, cy + 15]];
          o.push(h.chemin(hom, h.a.cache, true));
          o.push(h.cercle(549, cy, 15, h.a.cache));
          return o.join('\n');
        },
        renvois: z => [
          { n: 1, rond: [588, z.h / 2], cible: [571, z.h / 2 - 44], texte: 'perches plus longues que lui' },
          { n: 2, rond: [178, z.h / 2], cible: [236, z.h / 2 - 14], texte: 'traverses : large avant tout' },
          { n: 3, rond: [100, z.h / 2], cible: [100, z.h / 2 - 50.5], texte: 'brancard lié à chaque perche' },
        ],
      },

      // ─── En coupe à la poitrine, regardé depuis les pieds ───
      coupe: {
        titre: 'En coupe, à la poitrine',
        dessin: z => {
          const o = [], cx = z.l / 2, ys = z.h - 18;
          const yp = ys - 5;
          // neige
          o.push(h.rect(0, ys, z.l, z.h - ys, h.a.hachure('neige', 'aucun')));
          o.push(h.ligne(0, ys, z.l, ys, h.a.arete));
          // traverse coupée dans sa longueur, posée sur les deux perches
          o.push(h.rect(cx - 96, yp - 19, 192, 10, h.a.hachure('bois', 'arete')));
          // perches coupées en travers
          for (const x of [cx - 80, cx + 80]) o.push(h.cercle(x, yp, 9, h.a.blanc), h.cercle(x, yp, 9, h.a.hachure('bois', 'contour')));
          // sapin : une couche en travers, une en long (bouts coupés), une en travers
          const aiguilles = (y0, x0, x1) => {
            let d = `M${f(x0)},${f(y0)} L${f(x1)},${f(y0)}`;
            for (let x = x0 + 2; x < x1 - 3; x += 5) d += ` M${f(x)},${f(y0)} l5,-3.5 M${f(x)},${f(y0)} l5,3.5`;
            return h.path(d, h.a.fin);
          };
          o.push(aiguilles(yp - 24, cx - 88, cx + 88));
          let d = '';
          for (let x = cx - 84; x <= cx + 84; x += 12) {
            const y = yp - 34;
            d += ` M${f(x + 2)},${f(y)} a2,2 0 1 0 -4,0 a2,2 0 1 0 4,0`;
            d += ` M${f(x + 2.5)},${f(y - 1.5)} l3.5,-2.5 M${f(x - 2.5)},${f(y - 1.5)} l-3.5,-2.5 M${f(x + 2.5)},${f(y + 1.5)} l3.5,2.5 M${f(x - 2.5)},${f(y + 1.5)} l-3.5,2.5`;
          }
          o.push(h.path(d.trim(), h.a.fin));
          o.push(aiguilles(yp - 44, cx - 86, cx + 86));
          // couverture : dessous et autour du blessé
          const yc = yp - 50;
          o.push(h.path(`M${f(cx - 72)},${f(yc)} C${f(cx - 72)},${f(yc - 40)} ${f(cx - 40)},${f(yc - 48)} ${f(cx)},${f(yc - 48)} C${f(cx + 40)},${f(yc - 48)} ${f(cx + 72)},${f(yc - 40)} ${f(cx + 72)},${f(yc)} Z`, h.a.hachure('isolant', 'arete')));
          // le blessé : torse et bras
          o.push(h.ellipse(cx, yc - 22, 38, 16, W(h.a.arete)));
          for (const sg of [-1, 1]) o.push(h.cercle(cx + sg * 52, yc - 16, 9, W(h.a.arete)));
          // sangle : par-dessus la couverture, puis autour de chaque perche
          const sangle = `M${f(cx - 70.9)},${f(yp + 5.25)} A10.5,10.5 0 0 1 ${f(cx - 90.5)},${f(yp)} L${f(cx - 75)},${f(yc)} C${f(cx - 75)},${f(yc - 43)} ${f(cx - 41)},${f(yc - 51)} ${f(cx)},${f(yc - 51)} C${f(cx + 41)},${f(yc - 51)} ${f(cx + 75)},${f(yc - 43)} ${f(cx + 75)},${f(yc)} L${f(cx + 90.5)},${f(yp)} A10.5,10.5 0 0 1 ${f(cx + 70.9)},${f(yp + 5.25)}`;
          o.push(h.path(sangle, halo), h.path(sangle, h.a.contour));
          return o.join('\n');
        },
        renvois: z => {
          const cx = z.l / 2, yp = z.h - 23, yc = yp - 50;
          return [
            { n: 4, rond: [18, yp - 44], cible: [cx - 82, yp - 34] },
            { n: 5, rond: [22, 22], cible: [cx - 66, yc - 8] },
            { n: 6, rond: [z.l - 18, yc - 20], cible: [cx + 83.5, yc + 25] },
          ].map((r, i) => ({ ...r, texte: ['sapin en couches croisées', 'puis la couverture', 'sangle autour des perches'][i] }));
        },
      },

      // ─── Une croisée perche-traverse, vue de dessus ───
      ligature: {
        titre: 'Une croisée, vue de dessus',
        dessin: z => {
          const o = [];
          const croisee = (cx, cy) => {
            // perche dessous, traverse dessus
            o.push(h.rect(cx - 70, cy - 15, 140, 30, W(h.a.contour)));
            o.push(h.ligne(cx - 64, cy - 5, cx - 20, cy - 5, h.a.fin), h.ligne(cx + 18, cy + 6, cx + 64, cy + 6, h.a.fin));
            o.push(h.rect(cx - 13, cy - 60, 26, 120, W(h.a.contour)));
            o.push(h.ligne(cx - 4, cy - 54, cx - 4, cy - 24, h.a.fin), h.ligne(cx + 5, cy + 24, cx + 5, cy + 54, h.a.fin));
          };
          // babiche, à gauche
          const bx = 72, by = 64;
          croisee(bx, by);
          const hautY = [by - 31, by - 26, by - 21], basY = [by + 17, by + 22, by + 27];
          const gX = [bx - 30, bx - 25, bx - 20], dX = [bx + 16, bx + 21, bx + 26];
          // tours sous la perche, de part et d'autre de la traverse (cachés)
          for (const x of gX.concat(dX)) o.push(h.rect(x, by - 15, 4, 30, h.a.cache));
          // passages en biais dans les coins, puis tours sur la traverse
          const coin = (xs, ys, dir) => xs.forEach((x, i) => {
            const y = ys[i];
            const xe = dir[0] > 0 ? bx + 15 : bx - 15;
            const yv = dir[1] > 0 ? by + 15 : by - 15;
            const yb = dir[1] > 0 ? y : y + 4;
            o.push(h.chemin([[xe, yb], [xe, yb + (dir[1] > 0 ? 4 : -4)], [x + (dir[0] > 0 ? 4 : 0), yv], [x + (dir[0] > 0 ? 0 : 4), yv]], W(h.a.detail), true));
          });
          coin([dX[2], dX[1], dX[0]], hautY, [1, -1]);
          coin([gX[0], gX[1], gX[2]], hautY, [-1, -1]);
          coin([dX[0], dX[1], dX[2]], basY, [1, 1]);
          coin([gX[2], gX[1], gX[0]], basY, [-1, 1]);
          for (const y of hautY.concat(basY)) o.push(h.rect(bx - 15, y, 30, 4, W(h.a.detail)));

          // fil de fer, à droite
          const fx = z.l - 74, fy = 64;
          croisee(fx, fy);
          let dc = '';
          for (const x of [fx - 21, fx - 17, fx + 17, fx + 21]) dc += ` M${x},${fy - 15} L${x},${fy + 15}`;
          o.push(h.path(dc.trim(), h.a.cache));
          let dv = '';
          for (const [y, x] of [[fy - 24, 21], [fy - 20, 17], [fy + 20, 17], [fy + 24, 21]]) {
            dv += ` M${fx - x},${fy + (y < fy ? -15 : 15)} L${fx - 13},${y} L${fx + 13},${y} L${fx + x},${fy + (y < fy ? -15 : 15)}`;
          }
          o.push(h.path(dv.trim(), h.a.arete));
          // les deux bouts tordus ensemble à la pince, en queue de cochon
          const t0 = [fx + 21, fy - 15], t1 = [fx + 44, fy - 42];
          const L = Math.hypot(t1[0] - t0[0], t1[1] - t0[1]), ux = (t1[0] - t0[0]) / L, uy = (t1[1] - t0[1]) / L;
          const brin = sg => {
            const p = [];
            for (let s = 0; s <= L; s += 1) {
              const a = sg * 2.6 * Math.sin(2 * Math.PI * s / 7);
              p.push([t0[0] + ux * s - uy * a, t0[1] + uy * s + ux * a]);
            }
            return h.chemin(p, h.a.arete);
          };
          o.push(brin(1), brin(-1));
          return o.join('\n');
        },
        renvois: z => [
          { n: 7, rond: [22, 20], cible: [66, 36], texte: 'babiche mouillée, lâche' },
          { n: 8, rond: [z.l - 12, 34], cible: [z.l - 43, 34], texte: 'ou fil de fer tordu à la pince' },
        ],
      },

      // ─── En descente : un homme aux brancards devant, un frein à la corde derrière ───
      descente: {
        titre: 'En descente',
        dessin: z => {
          const o = [];
          const pente = (z.h - 17 - 148) / z.l;
          const ys = x => z.h - 17 - pente * x;
          const th = Math.atan(pente), c = Math.cos(th), s = Math.sin(th);
          const x0 = 148, y0 = ys(148);
          const T = (a, n) => [x0 + a * c - n * s, y0 - a * s - n * c];
          // les deux porteurs en pictogramme, à la même échelle que le blessé (1,75 m ≈ 119)
          const G = geoDescente(z), main = G.main;
          // neige
          o.push(h.chemin([[0, ys(0)], [z.l, ys(z.l)], [z.l, z.h], [0, z.h]], h.a.hachure('neige', 'aucun'), true));
          o.push(h.ligne(0, ys(0), z.l, ys(z.l), h.a.arete));

          // le traîneau
          o.push(h.chemin([T(0, 0), T(165, 0), T(165, 7), T(0, 7)], W(h.a.contour), true));
          o.push(h.chemin([T(20, 3), T(90, 3)], h.a.fin), h.chemin([T(110, 4), T(155, 4)], h.a.fin));
          for (const a of [12, 62, 112, 158]) o.push(h.cercle(...T(a, 11), 4, W(h.a.arete)));
          // sapin
          let d = '';
          for (let a = 4; a < 162; a += 4) d += ` M${P([T(a, 15)])} L${P([T(a + 3, 24)])}`;
          o.push(h.path(d.trim(), h.a.fin));
          o.push(h.chemin([T(3, 15), T(163, 15)], h.a.detail));
          // le blessé dans sa couverture, les pieds à l'avant
          const prof = [[8, 24], [9, 33], [20, 35], [40, 33], [56, 37], [72, 37], [86, 40], [104, 41], [120, 45], [134, 44], [140, 38], [141, 24]];
          o.push(h.path(lisse(prof.map(([a, n]) => T(a, n))) + ' Z', h.a.hachure('isolant', 'arete')));
          o.push(h.cercle(...T(149, 32.5), 8.5, W(h.a.arete)));
          const haut = a => { for (let i = 0; i < prof.length - 1; i++) if (a >= prof[i][0] && a <= prof[i + 1][0]) return prof[i][1] + (prof[i + 1][1] - prof[i][1]) * (a - prof[i][0]) / (prof[i + 1][0] - prof[i][0]); return 30; };
          // trois sangles : cuisses, bassin, poitrine
          for (const a of [58, 84, 118]) {
            const t = haut(a) + 1.5;
            o.push(h.chemin([T(a - 2, -1), T(a + 2, -1), T(a + 2, t), T(a - 2, t)], h.a.plein, true));
          }
          // brancard : lié le long de la perche, couché par-dessus le bout de la première traverse
          // qui le relève vers la main (il passe à n ≈ 17,7 en a = 12, sur le dessus de la traverse)
          const b0 = T(47, 3);
          const L = Math.hypot(main[0] - b0[0], main[1] - b0[1]);
          const bout = [main[0] + (main[0] - b0[0]) / L * 10, main[1] + (main[1] - b0[1]) / L * 10];
          o.push(barre(b0[0], b0[1], bout[0], bout[1], 5.5, 4.5, W(h.a.arete)));
          for (const [a, n0, n1] of [[12, 6.5, 21], [40, -0.5, 9.5]]) {
            o.push(h.chemin([T(a - 2, n0), T(a + 2, n0), T(a + 2, n1), T(a - 2, n1)], W(h.a.detail), true));
            o.push(h.chemin([T(a, n0), T(a, n1)], h.a.detail));
          }
          // homme devant, entre les brancards, les poings fermés sur leur bout
          const angB = Math.atan2(main[1] - b0[1], main[0] - b0[0]) / Math.PI * 180 + 90;
          const prise = dx => ({ x: main[0] + dx, y: main[1], pose: 'prise', vue: 'dos', diametre: 5.5, angle: angB });
          o.push(String(h.formes.personnage(Object.assign({}, G.av, { prises: { proche: prise(0), loin: prise(1.5) } }))));

          // homme derrière, face au traîneau, penché vers l'amont : la corde dans les deux poings
          const r0 = G.r0;
          const arr = { x: 412, y: ys(412), pose: 'portage', echelle: E_P, cote: 'gauche', angle: -th / Math.PI * 180, penche: -42, regard: 10 };
          // la corde monte droit du traîneau aux poings, devant la poitrine ; elle passe dans les
          // deux poings serrés l'un derrière l'autre, le bout libre pend derrière
          const Sa = h.formes.personnage(arr).epaules.proche;
          const dC = [Sa[0] - r0[0], Sa[1] - r0[1]], lC = Math.hypot(...dC), ua = [dC[0] / lC, dC[1] / lC];
          const angP = Math.atan2(ua[1], ua[0]) / Math.PI * 180 + 90;
          const tp = [Sa[0] - ua[0] * 34, Sa[1] - ua[1] * 34 + 6], tl = [tp[0] + ua[0] * 9, tp[1] + ua[1] * 9];
          const pp = { pose: 'prise', vue: 'dos', diametre: 2.6, angle: angP };
          const pF = h.formes.personnage(Object.assign({}, arr, { prises: { proche: Object.assign({ x: tp[0], y: tp[1] }, pp), loin: Object.assign({ x: tl[0], y: tl[1] }, pp) } }));
          const sor = [tl[0] + ua[0] * 7, tl[1] + ua[1] * 7];
          const mil = [(r0[0] + tp[0]) / 2 + 3, (r0[1] + tp[1]) / 2 + 5];
          o.push(h.path(`M${P([r0])} Q${P([mil])} ${P([tp])} L${P([sor])} Q${P([[sor[0] + ua[0] * 6, sor[1] + ua[1] * 6]])} ${P([[sor[0] + 6, sor[1] + 4]])} T${P([[sor[0] + 8, sor[1] + 24]])}`, h.a.contour));
          o.push(String(pF));
          return o.join('\n');
        },
        renvois: z => {
          const G = geoDescente(z), T = G.T, b0 = G.b0, main = G.main, u = 0.5;
          const r0 = G.r0, mainF = [376, 104];
          return [
            { n: 9, rond: [250, 88], cible: T(118, 46), texte: 'poitrine, bassin, cuisses' },
            { n: 10, rond: [118, 118], cible: [b0[0] + (main[0] - b0[0]) * u, b0[1] + (main[1] - b0[1]) * u], texte: 'brancards : ils retiennent' },
            { n: 11, rond: [322, 70], cible: [(r0[0] + mainF[0]) / 2 + 2, (r0[1] + mainF[1]) / 2 + 8], texte: 'derrière, à la corde : le frein' },
          ];
        },
      },

      // ─── Ce qui glisse déjà : le capot retourné ───
      capot: {
        titre: 'Le capot retourné',
        dessin: z => {
          const o = [], m = z.l / 2;
          // en travers, avec le blessé
          const yn = 88;
          o.push(h.rect(0, yn, z.l, 18, h.a.hachure('neige', 'aucun')));
          o.push(h.ligne(0, yn, z.l, yn, h.a.arete));
          const coque = `M${f(m - 62)},${yn - 34} L${f(m - 58)},${yn - 18} Q${f(m)},${yn + 14} ${f(m + 58)},${yn - 18} L${f(m + 62)},${yn - 34}`;
          const qy = x => { const t = (x - (m - 58)) / 116; return (1 - t) * (1 - t) * (yn - 18) + 2 * t * (1 - t) * (yn + 14) + t * t * (yn - 18); };
          let d = '';
          for (let x = m - 50; x <= m + 50; x += 4) d += ` M${f(x)},${f(qy(x) - 2)} L${f(x + 3)},${yn - 20}`;
          o.push(h.path(d.trim(), h.a.fin));
          o.push(h.path(`M${f(m - 26)},${yn - 20} C${f(m - 26)},${yn - 38} ${f(m - 14)},${yn - 42} ${f(m)},${yn - 42} C${f(m + 14)},${yn - 42} ${f(m + 26)},${yn - 38} ${f(m + 26)},${yn - 20} Z`, h.a.hachure('isolant', 'arete')));
          o.push(h.ellipse(m, yn - 27, 15, 6, W(h.a.arete)));
          o.push(h.path(coque, h.a.contour));
          // de profil, tiré vers la gauche : le bord avant relevé passe par-dessus
          const yp = 222;
          o.push(h.rect(0, yp, z.l, z.h - yp, h.a.hachure('neige', 'aucun')));
          o.push(h.ligne(0, yp, z.l, yp, h.a.arete));
          o.push(h.path(`M${z.l - 6},${yp - 16} L${z.l - 10},${yp - 5} Q${f(m + 10)},${yp + 3} ${f(m - 24)},${yp - 2} Q${f(m - 40)},${yp - 5} ${f(m - 46)},${yp - 22}`, h.a.contour));
          o.push(h.path(`M${f(m - 44)},${yp - 17} Q${f(m - 60)},${yp - 20} 0,${yp - 36}`, h.a.arete));
          return o.join('\n');
        },
        renvois: z => [
          { n: 12, rond: [z.l - 16, 18], cible: [z.l / 2 + 30, 82], texte: 'capot retourné, bombé' },
          { n: 13, rond: [z.l / 2 - 24, 160], cible: [z.l / 2 - 45, 201], texte: 'ses bords ne pellettent pas' },
        ],
      },
    },
  };
};
