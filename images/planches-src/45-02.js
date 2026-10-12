// 45-02 — La corde, la flèche mousse et la pointe large (ch. 45, §9 « La corde », « La flèche
// mousse », « La pointe large »).
// Cotes : seulement celles du chapitre — fût de 61 à 76 cm ; pointe de tôle de 7,6 cm sur
// 3,2 cm ; soie d'environ 2,5 cm sur 1 cm. Le diamètre du fût, la taille de la tête, des plumes,
// des boucles et du clou sont dessinés sans cote : le chapitre ne les donne pas.
// Le montage, suivi comme une charge :
// - la corde tire le bout de l'arc vers la poignée et vers le ventre ; la boucle passe sur le dos
//   près du bout et descend dans les deux encoches de côté, taillées en biais dans ce sens-là
//   (du dos près du bout vers le ventre, côté poignée) : la corde ne peut pas glisser vers le bout ;
// - la tête rapportée est tenue par le bout aminci enfoncé à la poix, et la ligature serre le
//   collet percé pour qu'il ne fende pas ; le clou entre par l'avant, dans l'axe, sans toucher
//   le bout du fût ;
// - la pointe de tôle : la soie est tout entière dans l'entaille (l'entaille est aussi profonde
//   que la soie est longue), le bout du fût arrive à la racine de la soie ; les ailettes pendent
//   de part et d'autre du fût, et le tendon qui serre le bout du fût passe dans leurs encoches,
//   limées sur le bord extérieur, près du bas : un tour posé là ne peut pas remonter le long du
//   bord incliné de l'ailette ;
// - le clou : la ligature est posée d'abord, le trou percé à travers elle, le clou y entre à la
//   poix.

module.exports = (h) => {
  const B = h.a.blanc;
  const r1 = v => Math.round(v * 10) / 10;
  const forme = (pts, t = h.a.arete) => h.chemin(pts, B, true) + '\n' + h.chemin(pts, t, true);
  const bloc = (d, t = h.a.arete) => h.path(d, B) + '\n' + h.path(d, t);

  // Bande autour d'une polyligne (une corde, un brin).
  function bande(pts, w) {
    const g = [], d = [];
    pts.forEach((p, i) => {
      const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
      const L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
      const nx = -(b[1] - a[1]) / L, ny = (b[0] - a[0]) / L;
      g.push([p[0] + nx * w / 2, p[1] + ny * w / 2]);
      d.push([p[0] - nx * w / 2, p[1] - ny * w / 2]);
    });
    return g.concat(d.reverse());
  }
  // Repère le long d'un segment : s le long, t en travers.
  function axe(p1, p2) {
    const dx = p2[0] - p1[0], dy = p2[1] - p1[1], L = Math.hypot(dx, dy);
    const u = [dx / L, dy / L], n = [-u[1], u[0]];
    return { L, u, n, q: (s, t) => [p1[0] + u[0] * s + n[0] * t, p1[1] + u[1] * s + n[1] * t] };
  }
  // Ligature de tendon sur un cylindre, de p1 à p2, diamètre w : tours serrés, un peu inclinés.
  function lig(p1, p2, w, pas = 2.4) {
    const { L, q } = axe(p1, p2);
    const o = [forme([q(0, -w / 2), q(L, -w / 2), q(L, w / 2), q(0, w / 2)], h.a.detail)];
    for (let s = pas * 0.6; s < L - pas * 0.3; s += pas) {
      const a = q(s - pas * 0.3, -w / 2), b = q(s + pas * 0.3, w / 2);
      o.push(h.ligne(a[0], a[1], b[0], b[1], h.a.fin));
    }
    return o.join('\n');
  }
  // Ligne de coupure à main levée.
  function zig(a, b, n = 4, amp = 2.5) {
    const o = [a];
    const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L;
    for (let i = 1; i < n; i++) {
      const t = i / n, s = (i % 2 ? 1 : -1) * amp;
      o.push([a[0] + dx * t + nx * s, a[1] + dy * t + ny * s]);
    }
    o.push(b);
    return h.chemin(o, h.a.detail);
  }
  // Hauteur d'un profil (polyligne en x croissants) à l'abscisse x.
  function yProf(pts, x) {
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i], b = pts[i + 1];
      if (x >= a[0] && x <= b[0]) return a[1] + (b[1] - a[1]) * (x - a[0]) / ((b[0] - a[0]) || 1);
    }
    return pts[pts.length - 1][1];
  }
  // Une plume posée : profil de la barbe (x croissants, de l'arrière vers l'avant), base à yb.
  function barbe(prof, yb, pas = 6.5, recul = 9) {
    const x0 = prof[0][0], x1 = prof[prof.length - 1][0];
    const pts = [[x0, yb], ...prof, [x1, yb]];
    const o = [forme(pts, h.a.arete)];
    let d = '';
    for (let x = x0 + recul + 3; x < x1 - 4; x += pas) {
      const xe = x - recul, ye = yProf(prof, xe);
      const k = 0.82;
      d += `M ${r1(x)} ${r1(yb)} L ${r1(x + (xe - x) * k)} ${r1(yb + (ye - yb) * k)} `;
    }
    if (d) o.push(h.path(d.trim(), h.a.fin));
    return o.join('\n');
  }

  return {
    ref: '45-02',
    titre: 'La corde, la flèche mousse et la pointe large',
    desc: 'La corde de peau crue ou de tendon tordue en contre-toron, sa boucle fixe ligaturée posée '
      + 'dans les deux encoches en biais du bout de l’arc, vue de côté et du ventre, et la ligature où '
      + 'la flèche s’appuie ; la flèche mousse entière, sa tête en œuf taillée dans la baguette ou '
      + 'rapportée (nœud, panache ou os percé, enfoncé à la poix, ligaturé, un clou dans la tête pour '
      + 'le poids), ses trois plumes ligaturées par les bouts de tuyau nus et son encoche en travers ; '
      + 'la pointe de tôle avec ses ailettes, ses encoches et sa soie, puis posée dans l’entaille du fût '
      + 'aminci en biseau, serrée au tendon croisé ; et le clou battu en ciseau, entré à la poix dans le '
      + 'bout du fût ligaturé puis percé.',
    format: 'pleine',
    disposition: [['bout', 'corde'], ['fleche'], ['taillee', 'rapportee', 'plumes'], ['tole', 'posee', 'clou']],
    hauteurs: [1.15, 0.5, 1.0, 1.55],
    largeurs: [[1, 1.4], [1], [0.85, 1.05, 1.3], [1, 1.15, 0.72]],
    vues: {
      // ───────────── La boucle sur le bout de l'arc : de côté, puis du ventre ─────────────
      bout: {
        titre: 'La boucle, sur le bout de l’arc',
        dessin: z => {
          const o = [];
          const yT = z.h - 8, top = 3;
          // De côté : le dos à gauche, le ventre à droite, le bout en bas.
          const cs = z.l * 0.25;
          const dos = y => cs - 9 - (yT - y) * 0.03;
          const ven = y => cs + 9 + (yT - y) * 0.03;
          o.push(bloc(`M ${r1(dos(top))} ${top} L ${r1(dos(yT - 6))} ${yT - 6} Q ${r1(cs)} ${yT + 3} ${r1(ven(yT - 6))} ${yT - 6} L ${r1(ven(top))} ${top}`, h.a.contour));
          o.push(zig([dos(top) - 3, top + 1], [ven(top) + 3, top + 1], 4, 2));
          // L'encoche : du dos, près du bout, vers le ventre, côté poignée.
          const g1 = [dos(yT - 16), yT - 16], g2 = [ven(yT - 36), yT - 36];
          const G = axe(g1, g2);
          const e1a = G.q(-1, -3.2), e1b = G.q(G.L + 1, -3.2), e2a = G.q(-1, 3.2), e2b = G.q(G.L + 1, 3.2);
          o.push(h.ligne(e1a[0], e1a[1], e1b[0], e1b[1], h.a.detail), h.ligne(e2a[0], e2a[1], e2b[0], e2b[1], h.a.detail));
          // La corde : dans l'encoche, puis le long du ventre en s'en écartant.
          const cordeCote = [g1, g2, [ven(yT - 50) + 1.5, yT - 50], [ven(top) + 7, top]];
          o.push(forme(bande(cordeCote, 4)));
          o.push(h.cercle(g1[0] - 0.5, g1[1], 2.4, B), h.cercle(g1[0] - 0.5, g1[1], 2.4, h.a.arete));
          // La ligature de la boucle.
          const lx = y => ven(yT - 50) + 1.5 + (ven(top) + 7 - ven(yT - 50) - 1.5) * (yT - 50 - y) / (yT - 50 - top);
          o.push(lig([lx(yT - 54), yT - 54], [lx(yT - 78), yT - 78], 8, 2.2));

          // Du ventre : les deux encoches, les deux jambes de la boucle, la ligature, la corde.
          const cb = z.l * 0.72;
          const hw = y => 13 + (yT - y) * 0.05;
          const yN = yT - 36;
          const d = [
            `M ${r1(cb - hw(top))} ${top}`,
            `L ${r1(cb - hw(yN - 4))} ${yN - 4}`, `L ${r1(cb - hw(yN) + 4)} ${yN}`, `L ${r1(cb - hw(yN + 4))} ${yN + 4}`,
            `L ${r1(cb - hw(yT - 6))} ${yT - 6}`, `Q ${r1(cb)} ${yT + 3} ${r1(cb + hw(yT - 6))} ${yT - 6}`,
            `L ${r1(cb + hw(yN + 4))} ${yN + 4}`, `L ${r1(cb + hw(yN) - 4)} ${yN}`, `L ${r1(cb + hw(yN - 4))} ${yN - 4}`,
            `L ${r1(cb + hw(top))} ${top}`,
          ].join(' ');
          o.push(bloc(d, h.a.contour));
          o.push(zig([cb - hw(top) - 3, top + 1], [cb + hw(top) + 3, top + 1], 4, 2));
          // La boucle passe sur le dos, derrière : trait caché.
          o.push(h.ligne(cb - hw(yT - 16) + 1, yT - 16, cb + hw(yT - 16) - 1, yT - 16, h.a.cache));
          o.push(h.ligne(cb - hw(yT - 16) + 2, yT - 16, cb - hw(yN) + 3, yN, h.a.cache));
          o.push(h.ligne(cb + hw(yT - 16) - 2, yT - 16, cb + hw(yN) - 3, yN, h.a.cache));
          const yL1 = yT - 58, yL2 = yT - 82;
          o.push(forme(bande([[cb - hw(yN) + 3, yN], [cb - 2, yL1 + 2]], 3.6)));
          o.push(forme(bande([[cb + hw(yN) - 3, yN], [cb + 2, yL1 + 2]], 3.6)));
          o.push(forme(bande([[cb, yL2], [cb, top]], 4)));
          o.push(lig([cb, yL1 + 3], [cb, yL2], 9, 2.2));
          return o.join('\n');
        },
        renvois: z => {
          const yT = z.h - 8, cs = z.l * 0.25, cb = z.l * 0.72;
          return [
            { n: 1, rond: [cb + 36, yT - 96], cible: [cb + 4, yT - 72], texte: 'boucle fixe, ligaturée' },
            { n: 2, rond: [cs - 34, yT - 62], cible: [cs - 1, yT - 26], texte: 'encoche taillée en biais' },
          ];
        },
      },

      // ───────────── La corde : deux brins, torsions contraires, et sa ligature ─────────────
      corde: {
        titre: 'La corde en contre-toron',
        dessin: z => {
          const o = [];
          const c = z.h * 0.54, x0 = z.l * 0.36, xe = z.l - 12, D = 16, xs1 = z.l * 0.66;
          // La corde commise : les brins apparaissent en « / ».
          o.push(h.rect(x0, c - D / 2, xe - x0, D, B));
          o.push(h.ligne(x0, c - D / 2, xe, c - D / 2, h.a.arete), h.ligne(x0, c + D / 2, xe, c + D / 2, h.a.arete));
          for (let x = x0; x < xs1 + 4; x += 11) {
            o.push(h.path(`M ${r1(x)} ${r1(c + D / 2)} Q ${r1(x + 2)} ${r1(c)} ${r1(x + 9)} ${r1(c - D / 2)}`, h.a.detail));
          }
          // Les deux brins, tordus chacun en « \ » avant d'être commis.
          const brin = (p1, p2, w) => {
            const A = axe(p1, p2), out = [forme([A.q(0, -w / 2), A.q(A.L, -w / 2), A.q(A.L, w / 2), A.q(0, w / 2)])];
            let fd = '';
            for (let s = 5; s < A.L - 3; s += 5.5) {
              const a = A.q(s + 2.2, w / 2 - 0.6), b = A.q(s - 2.2, -w / 2 + 0.6);
              fd += `M ${r1(a[0])} ${r1(a[1])} L ${r1(b[0])} ${r1(b[1])} `;
            }
            out.push(h.path(fd.trim(), h.a.fin));
            // Rotation du brin : l'arc passe devant, du haut vers le bas.
            const m = A.q(A.L * 0.42, 0), t1 = A.q(A.L * 0.42, -(w / 2 + 6)), t2 = A.q(A.L * 0.42, w / 2 + 6);
            const k = [m[0] + A.u[0] * 12, m[1] + A.u[1] * 12];
            out.push(h.fleche(`M ${r1(t1[0])} ${r1(t1[1])} Q ${r1(k[0])} ${r1(k[1])} ${r1(t2[0])} ${r1(t2[1])}`, h.a.detail));
            return out.join('\n');
          };
          o.push(brin([14, c - 32], [x0, c - 4.2], 9));
          o.push(brin([14, c + 32], [x0, c + 4.2], 9));
          // Rotation de la corde commise : dans l'autre sens.
          const xr = x0 + 44;
          o.push(h.fleche(`M ${r1(xr)} ${r1(c + D / 2 + 7)} Q ${r1(xr + 14)} ${r1(c)} ${r1(xr)} ${r1(c - D / 2 - 7)}`, h.a.detail));
          // La ligature où la flèche s'appuie.
          o.push(lig([xs1, c], [xe, c], D + 4, 2.4));
          o.push(zig([xe, c - D / 2 - 5], [xe, c + D / 2 + 5], 4, 2));
          return o.join('\n');
        },
        renvois: z => {
          const c = z.h * 0.54, x0 = z.l * 0.36, xs1 = z.l * 0.66;
          return [
            { n: 3, rond: [x0 - 40, c - 50], cible: [x0 - 30, c - 12], texte: 'contre-toron, deux brins' },
            { n: 4, rond: [xs1 + 44, c - 44], cible: [xs1 + 44, c - 10], texte: 'ligature sous la flèche' },
          ];
        },
      },

      // ───────────── La flèche mousse entière ─────────────
      fleche: {
        titre: 'La flèche mousse',
        dessin: z => {
          const o = [];
          const c = z.h * 0.36, xn = 24, xt = z.l - 24;
          o.push(forme([[xn, c - 3], [xt - 26, c - 3], [xt - 26, c + 3], [xn, c + 3], [xn, c + 1.2], [xn + 5, c + 1.2], [xn + 5, c - 1.2], [xn, c - 1.2]]));
          o.push(h.ellipse(xt - 15, c, 15, 8, B), h.ellipse(xt - 15, c, 15, 8, h.a.arete));
          const xa = xn + 22, xb = xn + 118;
          o.push(h.rect(xa - 8, c - 4.2, xb - xa + 16, 1.2, B));
          o.push(barbe([[xa, c - 11], [xa + 8, c - 14], [xa + 32, c - 13], [xb, c - 3.5]], c - 3.5, 10, 7));
          o.push(barbe([[xa, c + 7], [xa + 8, c + 8.5], [xa + 32, c + 8], [xb, c + 3.5]], c + 3.5, 10, 7));
          o.push(lig([xa - 9, c], [xa, c], 8, 2), lig([xb, c], [xb + 9, c], 8, 2));
          o.push(h.cote(xn, z.h - 8, xt, z.h - 8, '61 à 76 cm'));
          return o.join('\n');
        },
      },

      // ───────────── La tête taillée dans la baguette ─────────────
      taillee: {
        titre: 'La tête taillée',
        dessin: z => {
          const o = [];
          const c = z.h * 0.55, x0 = 10, xf = z.l - 14, xk = xf - 64, xb = xf - 50;
          // La baguette refendue, avec son épaisseur gardée au bout : trait caché.
          o.push(h.chemin([[x0, c - 9], [xk, c - 9], [xk + 10, c - 18], [xf + 2, c - 18], [xf + 2, c + 18], [xk + 10, c + 18], [xk, c + 9], [x0, c + 9]], h.a.cache));
          // Le fût arrondi et le bulbe.
          o.push(forme([[x0, c - 6], [xb + 4, c - 6], [xb + 4, c + 6], [x0, c + 6]]));
          o.push(bloc(`M ${r1(xb)} ${r1(c - 5.5)} C ${r1(xb + 8)} ${r1(c - 7)} ${r1(xb + 12)} ${r1(c - 16)} ${r1(xb + 28)} ${r1(c - 16)} C ${r1(xf - 4)} ${r1(c - 16)} ${r1(xf)} ${r1(c - 8)} ${r1(xf)} ${r1(c)} C ${r1(xf)} ${r1(c + 8)} ${r1(xf - 4)} ${r1(c + 16)} ${r1(xb + 28)} ${r1(c + 16)} C ${r1(xb + 12)} ${r1(c + 16)} ${r1(xb + 8)} ${r1(c + 7)} ${r1(xb)} ${r1(c + 5.5)} Z`));
          o.push(zig([x0, c - 12], [x0, c + 12], 4, 2));
          return o.join('\n');
        },
        renvois: z => {
          const c = z.h * 0.55, xf = z.l - 14, xb = xf - 50;
          return [
            { n: 5, rond: [34, c - 38], cible: [40, c - 9], texte: 'baguette refendue, arrondie' },
            { n: 6, rond: [xb + 28, c - 44], cible: [xb + 30, c - 8], texte: 'bulbe gardé au bout' },
          ];
        },
      },

      // ───────────── La tête rapportée : nœud, panache ou os percé ─────────────
      rapportee: {
        titre: 'La tête rapportée',
        dessin: z => {
          const o = [];
          const c = z.h * 0.55, x0 = 10, hx = z.l * 0.40, xf = hx + 80;
          // Le fût, jusqu'au collet.
          o.push(forme([[x0, c - 6], [hx - 16, c - 6], [hx - 2, c - 4.5], [hx - 2, c + 4.5], [hx - 16, c + 6], [x0, c + 6]]));
          o.push(zig([x0, c - 12], [x0, c + 12], 4, 2));
          // La tête : un collet percé et l'œuf.
          o.push(forme([[hx - 2, c - 9], [hx + 16, c - 9], [hx + 16, c + 9], [hx - 2, c + 9]]));
          o.push(h.ellipse(hx + 46, c, 34, 20, B), h.ellipse(hx + 46, c, 34, 20, h.a.arete));
          o.push(h.rect(hx + 10, c - 8.2, 8, 16.4, B));
          o.push(h.ligne(hx + 16, c - 9, hx + 16.8, c - 8.6, h.a.arete));
          // Caché : le trou, le bout aminci qui y entre à la poix, le clou dans l'axe.
          o.push(h.chemin([[hx - 2, c - 5.2], [hx + 40, c - 5.2], [hx + 40, c + 5.2], [hx - 2, c + 5.2]], h.a.cache));
          o.push(h.ligne(hx + 38, c - 4.2, hx + 38, c + 4.2, h.a.cache));
          o.push(h.chemin([[xf, c - 1.8], [xf - 28, c - 1.8], [xf - 31, c], [xf - 28, c + 1.8], [xf, c + 1.8]], h.a.cache));
          o.push(h.rect(xf - 0.6, c - 3.4, 2.4, 6.8, h.a.plein));
          // La ligature sur le collet et le fût.
          o.push(lig([hx - 12, c], [hx + 14, c], 21, 2.4));
          return o.join('\n');
        },
        renvois: z => {
          const c = z.h * 0.55, hx = z.l * 0.40, xf = hx + 80;
          return [
            { n: 7, rond: [hx + 56, 14], cible: [hx + 54, c - 14], texte: 'nœud, panache ou os percé' },
            { n: 8, rond: [hx + 20, z.h - 10], cible: [hx + 30, c + 5], texte: 'bout aminci, à la poix' },
            { n: 9, rond: [hx - 26, c - 34], cible: [hx - 2, c - 8], texte: 'ligature de tendon' },
            { n: 10, rond: [Math.min(xf + 8, z.l - 12), c + 36], cible: [xf - 14, c + 1], texte: 'clou : le poids au bout' },
          ];
        },
      },

      // ───────────── Les plumes et l'encoche ─────────────
      plumes: {
        titre: 'Les plumes et l’encoche',
        dessin: z => {
          const o = [];
          const c = z.h * 0.6, xn = 14, xe = z.l - 8, xa = 40, xb = Math.min(152, z.l - 70);
          o.push(forme([[xn, c - 5], [xe, c - 5], [xe, c + 5], [xn, c + 5], [xn, c + 2.2], [xn + 10, c + 2.2], [xn + 10, c - 2.2], [xn, c - 2.2]]));
          o.push(zig([xe, c - 9], [xe, c + 9], 4, 2));
          // Le demi-tuyau posé sur le fût, puis la barbe.
          o.push(forme([[xa - 12, c - 7], [xb + 12, c - 7], [xb + 12, c - 5], [xa - 12, c - 5]], h.a.detail));
          o.push(barbe([[xa, c - 22], [xa + 10, c - 28], [xa + 42, c - 27], [xb, c - 7]], c - 7, 8, 10));
          o.push(barbe([[xa, c + 13.5], [xa + 10, c + 16.5], [xa + 42, c + 16], [xb, c + 5]], c + 5, 8, 10));
          // Les bouts de tuyau nus, ligaturés.
          o.push(lig([xa - 12, c], [xa, c], 16, 2.2), lig([xb, c], [xb + 12, c], 16, 2.2));
          return o.join('\n');
        },
        renvois: z => {
          const c = z.h * 0.6, xa = 40, xb = Math.min(152, z.l - 70);
          return [
            { n: 11, rond: [xa + 76, 12], cible: [xa + 50, c - 20], texte: 'trois plumes à égal écart' },
            { n: 12, rond: [xb + 40, c - 34], cible: [xb + 7, c - 7], texte: 'bout de tuyau nu, ligaturé' },
            { n: 13, rond: [16, c - 34], cible: [19, c - 1], texte: 'encoche jamais fendue' },
          ];
        },
      },

      // ───────────── La pointe de tôle ─────────────
      tole: {
        titre: 'La pointe de tôle',
        dessin: z => {
          const o = [];
          const s = 14, cx = z.l * 0.56, y0 = 6;
          const L = 7.6 * s, W = 3.2 * s / 2, ts = 2.5 * s, tw = 1 * s / 2, yB = y0 + L, yR = yB - ts;
          const xc = tw + 0.42 * s;                         // pied de l'entaille, sur la base
          const bord = y => W * (y - y0) / L;              // demi-largeur au bord extérieur
          const yn = yB - 7;                                // encoche de l'ailette
          const pts = [
            [cx, y0],
            [cx + bord(yn - 2.6), yn - 2.6], [cx + bord(yn) - 3.4, yn], [cx + bord(yn + 2.6), yn + 2.6],
            [cx + W, yB], [cx + xc, yB], [cx + tw, yR], [cx + tw, yB], [cx - tw, yB], [cx - tw, yR], [cx - xc, yB], [cx - W, yB],
            [cx - bord(yn + 2.6), yn + 2.6], [cx - bord(yn) + 3.4, yn], [cx - bord(yn - 2.6), yn - 2.6],
          ];
          o.push(forme(pts, h.a.contour));
          // Le fil limé, dès la pointe : la limite du biseau.
          o.push(h.chemin([[cx, y0 + 7], [cx + bord(yn - 5) - 4, yn - 5]], h.a.fin));
          o.push(h.chemin([[cx, y0 + 7], [cx - bord(yn - 5) + 4, yn - 5]], h.a.fin));
          // Cotes.
          o.push(h.cote(cx - W - 12, y0, cx - W - 12, yB, '7,6 cm', { cote: 'gauche' }));
          o.push(h.cote(cx + W + 10, yR, cx + W + 10, yB, '2,5 cm', { cote: 'droite' }));
          o.push(h.cote(cx - tw, yB + 10, cx + tw, yB + 10, '1 cm', { cote: 'dessous' }));
          o.push(h.cote(cx - W, yB + 34, cx + W, yB + 34, '3,2 cm', { cote: 'dessous' }));
          return o.join('\n');
        },
        renvois: z => {
          const s = 14, cx = z.l * 0.56, y0 = 6, L = 7.6 * s, W = 3.2 * s / 2, yB = y0 + L;
          const bord = y => W * (y - y0) / L;
          return [
            { n: 14, rond: [cx + 46, y0 + 28], cible: [cx + 2, y0 + 62], texte: 'ressort recuit puis retrempé' },
            { n: 15, rond: [cx + 34, y0 + 6], cible: [cx + bord(y0 + 20) - 1, y0 + 20], texte: 'fil limé dès la pointe' },
            { n: 16, rond: [cx + W + 42, yB - 50], cible: [cx + bord(yB - 7) - 5, yB - 9], texte: 'ailette et son encoche' },
            { n: 17, rond: [cx + 40, yB + 20], cible: [cx + 9, yB - 3], texte: 'soie, entailles au ciseau' },
          ];
        },
      },

      // ───────────── La pointe posée : de face et de chant ─────────────
      posee: {
        titre: 'La pointe posée',
        dessin: z => {
          const o = [];
          const s = 12, y0 = 6, L = 7.6 * s, W = 3.2 * s / 2, ts = 2.5 * s, tw = 1 * s / 2, yB = y0 + L, yR = yB - ts;
          const xc = tw + 0.42 * s, bord = y => W * (y - y0) / L, yn = yB - 5.5;
          const f = 6.5;                                    // demi-largeur du fût
          const yBas = z.h - 4;
          // De face.
          const cx = z.l * 0.32;
          const pts = [
            [cx, y0],
            [cx + bord(yn - 2.2), yn - 2.2], [cx + bord(yn) - 2.8, yn], [cx + bord(yn + 2.2), yn + 2.2],
            [cx + W, yB], [cx + xc, yB], [cx + tw, yR], [cx + tw, yB], [cx - tw, yB], [cx - tw, yR], [cx - xc, yB], [cx - W, yB],
            [cx - bord(yn + 2.2), yn + 2.2], [cx - bord(yn) + 2.8, yn], [cx - bord(yn - 2.2), yn - 2.2],
          ];
          o.push(forme(pts, h.a.contour));
          o.push(h.chemin([[cx, y0 + 6], [cx + bord(yR - 6) - 3, yR - 6]], h.a.fin), h.chemin([[cx, y0 + 6], [cx - bord(yR - 6) + 3, yR - 6]], h.a.fin));
          // Le fût : son bout arrive à la racine de la soie.
          o.push(forme([[cx - f, yR], [cx + f, yR], [cx + f, yBas], [cx - f, yBas]]));
          o.push(zig([cx - f - 3, yBas], [cx + f + 3, yBas], 4, 2));
          // Caché : la soie dans l'entaille, et le fond de l'entaille.
          o.push(h.chemin([[cx - tw, yR + 1], [cx - tw, yB], [cx + tw, yB], [cx + tw, yR + 1]], h.a.cache));
          o.push(h.ligne(cx - f + 1, yB + 1.5, cx + f - 1, yB + 1.5, h.a.cache));
          // Le tendon : tour sur tour sur le bout du fût, et croisé dans les encoches des ailettes.
          o.push(lig([cx, yR + 1], [cx, yB + 1], 2 * f + 2, 2.3));
          const gN = [cx - bord(yn) + 2.8, yn], dN = [cx + bord(yn) - 2.8, yn];
          o.push(h.ligne(gN[0], gN[1] - 0.8, dN[0], dN[1] - 0.8, h.a.detail), h.ligne(gN[0], gN[1] + 0.8, dN[0], dN[1] + 0.8, h.a.detail));
          o.push(h.path(`M ${r1(gN[0])} ${r1(gN[1])} L ${r1(cx + f + 1)} ${r1(yR + 5)} M ${r1(dN[0])} ${r1(dN[1])} L ${r1(cx - f - 1)} ${r1(yR + 5)}`, h.a.detail));

          // De chant : la lame vue par la tranche, le bout du fût aminci jusqu'à ses faces.
          const ce = z.l * 0.74, e = 0.9;
          o.push(h.rect(ce - e, y0, 2 * e, yR - y0 + 1, h.a.plein));
          o.push(forme([[ce - e - 0.6, yR], [ce + e + 0.6, yR], [ce + f, yB + 1], [ce + f, yBas], [ce - f, yBas], [ce - f, yB + 1]]));
          o.push(zig([ce - f - 3, yBas], [ce + f + 3, yBas], 4, 2));
          o.push(h.ligne(ce, yR + 1, ce, yB, h.a.cache));
          for (let y = yR + 3; y < yB; y += 2.3) {
            const hwy = e + 0.6 + (f - e - 0.6) * (y - yR) / (yB + 1 - yR);
            o.push(h.ligne(ce - hwy, y - 0.7, ce + hwy, y + 0.7, h.a.fin));
          }
          return o.join('\n');
        },
        renvois: z => {
          const s = 12, y0 = 6, L = 7.6 * s, W = 3.2 * s / 2, ts = 2.5 * s, yB = y0 + L, yR = yB - ts;
          const cx = z.l * 0.32, ce = z.l * 0.74, f = 6.5, bord = y => W * (y - y0) / L;
          return [
            { n: 18, rond: [cx - 44, yB + 30], cible: [cx - 2, yB + 1.5], texte: 'entaille au plan de l’encoche' },
            { n: 19, rond: [ce + 34, yR - 16], cible: [ce + 3.5, yR + 12], texte: 'biseau jusqu’à la lame' },
            { n: 20, rond: [cx + 48, yR - 20], cible: [cx + bord(yB - 5.5) - 4, yB - 5.5], texte: 'tendon croisé aux encoches' },
          ];
        },
      },

      // ───────────── Le clou battu en ciseau ─────────────
      clou: {
        titre: 'Le clou',
        dessin: z => {
          const o = [];
          const cx = z.l * 0.42, yE = z.h * 0.42, f = 6.5, yBas = z.h - 4, r = 2.2;
          // Le fût, ligaturé au bout avant d'être percé.
          o.push(forme([[cx - f, yE], [cx + f, yE], [cx + f, yBas], [cx - f, yBas]]));
          o.push(zig([cx - f - 3, yBas], [cx + f + 3, yBas], 4, 2));
          o.push(h.chemin([[cx - r - 0.4, yE], [cx - r - 0.4, yE + 40], [cx + r + 0.4, yE + 40], [cx + r + 0.4, yE]], h.a.cache));
          o.push(lig([cx, yE + 0.5], [cx, yE + 28], 2 * f + 3, 2.3));
          // Le clou : la tige ronde, puis le bout battu en ciseau et limé.
          const yT = yE - 26, yA = yE - 52;
          o.push(forme([[cx - r, yE], [cx - r, yT], [cx - 7, yA + 3], [cx - 7, yA], [cx + 7, yA], [cx + 7, yA + 3], [cx + r, yT], [cx + r, yE]]));
          o.push(h.ligne(cx - 7, yA + 5, cx + 7, yA + 5, h.a.fin));
          return o.join('\n');
        },
        renvois: z => {
          const cx = z.l * 0.42, yE = z.h * 0.42;
          return [
            { n: 21, rond: [cx + 40, yE - 58], cible: [cx + 4, yE - 44], texte: 'clou battu en ciseau, limé' },
            { n: 22, rond: [cx + 40, yE + 14], cible: [cx + 8, yE + 14], texte: 'ligature avant de percer' },
            { n: 23, rond: [cx - 38, yE + 58], cible: [cx - 1, yE + 36], texte: 'trou du clou, à la poix' },
          ];
        },
      },
    },
  };
};
