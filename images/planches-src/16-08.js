module.exports = (h) => {
  // Les porteurs de la descente, en corps simples (13 oct.), à l'échelle du blessé (1750 mm ≈ 119 :
  // 0,068 par mm). Devant (retient-derriere) : face à l'aval, entre les brancards, il les tient
  // derrière lui à bout de bras, poings fermés sur leur bout. Derrière (tire-arriere) : face au
  // traîneau, penché vers l'amont, la corde dans les deux poings, les avant-bras d'équerre avec la
  // corde. Sur la pente, la jambe d'amont est plus pliée : les deux pieds touchent la neige.
  const E_P = 0.068;
  const geoDescente = z => {
    const pente = (z.h - 17 - 148) / z.l, ys = x => z.h - 17 - pente * x;
    const th = Math.atan(pente), c = Math.cos(th), s = Math.sin(th);
    const x0 = 148, y0 = ys(148);
    const T = (a, n) => [x0 + a * c - n * s, y0 - a * s - n * c];
    const b0 = T(47, 3), r0 = T(165, 4);
    const av = { pose: 'retient-derriere', x: 40, y: ys(23.6), cote: 'gauche', echelle: E_P, ancrer: false, prise: { P: 40, L: 40 },
      angles: { jambeL: -44, cuisseL: -8, mainP: 9.5, mainL: 9.5 } };
    const arr = { pose: 'tire-arriere', x: 412, y: ys(389.2) - 0.5, cote: 'gauche', echelle: E_P, ancrer: false, prise: { P: 10, L: 10 },
      angles: { jambeP: 20, jambeL: -55, cuisseL: 0, brasP: 34, avantbrasP: 122, mainP: 129, brasL: 30, avantbrasL: 118, mainL: 129 } };
    return { pente, ys, th, x0, y0, T, b0, r0, av, arr };
  };
  // ─── L'enveloppe d'un corps simple (sac de couchage, couverture roulée) : la pose sert de gabarit,
  // le contour visible est celui de l'enveloppe. C'est le contour du corps rendu, uni, dilaté de
  // « marge » mm et lissé par Clipper (celui des corps simples) ; le visage reste à découvert dans
  // l'ouverture du capuchon ; « cloisons » : des coutures du duvet en travers, en part de la longueur ;
  // « garder » [x0, y0, x1, y1] : ne garder que ce rectangle (une couverture : du cou aux pieds, sur le lit).
  const CL = require(require('path').join(__dirname, '../../.claude/skills/planches/scripts/corps/clipper.js'));
  const sac = (c, { marge = 55, lisse = 150, trait = 1.4, visage = true, cloisons = [], garder = null, avec = [], motif = null } = {}) => {
    const SC = 100, k = c.echelle, polys = [], r1 = v => Math.round(v * 10) / 10;
    for (const m of String(c.svg).matchAll(/<path d="([^"]+)" fill="#(?:FFFFFF|E6E6E6)"/g))
      for (const sub of m[1].split('Z')) {
        const n = sub.match(/-?[\d.]+/g); if (!n || n.length < 6) continue;
        const P = []; for (let i = 0; i + 1 < n.length; i += 2) P.push({ X: Math.round(+n[i] * SC), Y: Math.round(+n[i + 1] * SC) });
        polys.push(P);
      }
    const op = (t, a, b, ouvert = false) => {
      const x = new CL.Clipper(); x.AddPaths(a, CL.PolyType.ptSubject, !ouvert); if (b) x.AddPaths(b, CL.PolyType.ptClip, true);
      if (ouvert) { const tr = new CL.PolyTree(); x.Execute(t, tr, CL.PolyFillType.pftNonZero, CL.PolyFillType.pftNonZero); return CL.Clipper.OpenPathsFromPolyTree(tr); }
      const r = new CL.Paths(); x.Execute(t, r, CL.PolyFillType.pftNonZero, CL.PolyFillType.pftNonZero); return r;
    };
    const off = (p, d) => { const o = new CL.ClipperOffset(2, 0.05 * SC); o.AddPaths(p, CL.JoinType.jtRound, CL.EndType.etClosedPolygon); const r = new CL.Paths(); o.Execute(r, d * SC); return r; };
    // « avec » : des rectangles [x0, y0, x1, y1] unis au corps (le lit sous une couverture, qu'elle y retombe)
    for (const [a, b, cc, d] of avec) polys.push([[a, b], [cc, b], [cc, d], [a, d]].map(([x, y]) => ({ X: Math.round(x * SC), Y: Math.round(y * SC) })));
    let env = off(off(op(CL.ClipType.ctUnion, polys), (marge + lisse) * k), -lisse * k);
    if (garder) {
      const [a, b, cc, d] = garder.map(v => Math.round(v * SC)), R = 30 * k;
      env = off(off(op(CL.ClipType.ctIntersection, env, [[{ X: a, Y: b }, { X: cc, Y: b }, { X: cc, Y: d }, { X: a, Y: d }]]), -R), R);
    }
    if (visage) {
      const t = c.tete, hx = t.haut[0] - t.x, hy = t.haut[1] - t.y, L = Math.hypot(hx, hy) || 1, mi = c.miroir ? -1 : 1;
      const fx = -hy / L * mi, fy = hx / L * mi, r = 100 * k, D = [];
      for (let i = 0; i < 48; i++) { const a = i / 48 * 2 * Math.PI; D.push({ X: Math.round((t.x + fx * 0.6 * r + 0.78 * r * Math.cos(a)) * SC), Y: Math.round((t.y + fy * 0.6 * r + 0.78 * r * Math.sin(a)) * SC) }); }
      env = op(CL.ClipType.ctDifference, env, [D]);
    }
    const dP = P => 'M' + P.map(q => `${r1(q.X / SC)} ${r1(q.Y / SC)}`).join(' L');
    const dEnv = env.map(P => dP(P) + ' Z').join(' ');
    const out = [`<path d="${dEnv}" fill="#FFFFFF" stroke="#1A1A1A" stroke-width="${trait}" stroke-linejoin="round"/>`];
    if (motif) out.push(`<path d="${dEnv}" ${motif}/>`);
    if (cloisons.length) {
      const b = c.boite, x0 = b.x0 - marge * k, x1 = b.x1 + marge * k, dedans = off(env, -2.2);
      const lignes = cloisons.map(t => { const x = Math.round((x0 + (x1 - x0) * t) * SC); return [{ X: x, Y: Math.round((b.y0 - 400 * k) * SC) }, { X: x, Y: Math.round((b.y1 + 400 * k) * SC) }]; });
      const cl = op(CL.ClipType.ctIntersection, lignes, dedans, true);
      if (cl.length) out.push(`<path d="${cl.map(dP).join(' ')}" fill="none" stroke="#1A1A1A" stroke-width="0.5" stroke-linecap="round"/>`);
    }
    // le dessus de l'enveloppe à l'abscisse x (le plus petit y de ses bords qui croisent x)
    const haut = x => { let y = Infinity; for (const P of env) for (let i = 0; i < P.length; i++) { const a = P[i], b = P[(i + 1) % P.length], xa = a.X / SC, xb = b.X / SC;
      if ((xa - x) * (xb - x) <= 0 && xa !== xb) y = Math.min(y, (a.Y + (b.Y - a.Y) * (x - xa) / (xb - xa)) / SC); } return y; };
    return Object.assign(new String(out.join('\n')), { haut });
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
          const G = geoDescente(z), { ys, th, x0, y0, T, b0, r0 } = G;
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
          // le blessé dans sa couverture, les pieds à l'avant, sanglé à la poitrine, au bassin et aux
          // cuisses : le corps simple couché sur le dos sert de gabarit à la couverture (hachure d'isolant,
          // comme dans la coupe). Dessiné dans le repère du traîneau (a le long de la pente, y = −n), puis
          // tourné de la pente.
          const bl = h.formes.corps({ pose: 'couche-dos', cote: 'gauche', echelle: E_P, x: 154 - 877 * E_P, y: -24 - 55 * E_P,
            angles: { cuisseP: 86, jambeP: 94, cuisseL: 86, jambeL: 94 } });
          const env = sac(bl, { marge: 55, lisse: 150, motif: h.a.hachure('isolant', 'arete') });
          const ar = bl.articulations;
          const sangles = [ar.epauleP[0] + 0.3 * (ar.hancheP[0] - ar.epauleP[0]), ar.hancheP[0] + 2, (ar.hancheP[0] + ar.genouP[0]) / 2]
            .map(x => { const t = env.haut(x) - 1.5; return h.chemin([[x - 2, 1], [x + 2, 1], [x + 2, t], [x - 2, t]], h.a.plein, true); });
          o.push(`<g transform="translate(${f(x0)} ${f(y0)}) rotate(${f(-th * 180 / Math.PI)})">\n${bl}\n${env}\n${sangles.join('\n')}\n</g>`);

          // l'homme de devant : le brancard part de la perche (lié, couché sur le bout de la première
          // traverse) et monte dans ses poings ; il passe devant le corps, derrière le bras proche
          let brancard = null;
          const devant = h.formes.corps(Object.assign({}, G.av, { objetP: g => {
            const m = [g.mainP.x, g.mainP.y], L = Math.hypot(m[0] - b0[0], m[1] - b0[1]);
            const bout = [m[0] + (m[0] - b0[0]) / L * 9, m[1] + (m[1] - b0[1]) / L * 9];
            brancard = { m, u: [(b0[0] - m[0]) / L, (b0[1] - m[1]) / L], L };
            return barre(b0[0], b0[1], bout[0], bout[1], 5.5, 4.5, W(h.a.arete));
          } }));
          o.push(String(devant));
          for (const [a, n0, n1] of [[12, 6.5, 21], [40, -0.5, 9.5]]) {
            o.push(h.chemin([T(a - 2, n0), T(a + 2, n0), T(a + 2, n1), T(a - 2, n1)], W(h.a.detail), true));
            o.push(h.chemin([T(a, n0), T(a, n1)], h.a.detail));
          }
          // le geste : il retient, les brancards poussent le traîneau vers l'amont
          { const { m, u } = brancard, nn = [-u[1], u[0]], o1 = 9;
            const g0 = [m[0] + u[0] * 16 + nn[0] * o1, m[1] + u[1] * 16 + nn[1] * o1], g1 = [m[0] + u[0] * 46 + nn[0] * o1, m[1] + u[1] * 46 + nn[1] * o1];
            o.push(h.geste(`M${P([g0])} L${P([g1])}`)); }

          // l'homme de derrière : la corde monte tendue du traîneau aux poings ; elle s'interrompt dans le
          // poing le plus bas, finit dans le plus haut
          const derriere = h.formes.corps(Object.assign({}, G.arr, { objetP: g => {
            const mains = [[g.mainP.x, g.mainP.y], [g.mainL.x, g.mainL.y]].sort((p, q) => Math.hypot(p[0] - r0[0], p[1] - r0[1]) - Math.hypot(q[0] - r0[0], q[1] - r0[1]));
            const [bas, haut] = mains, L = Math.hypot(haut[0] - r0[0], haut[1] - r0[1]), e = [(haut[0] - r0[0]) / L, (haut[1] - r0[1]) / L];
            const t = (bas[0] - r0[0]) * e[0] + (bas[1] - r0[1]) * e[1], q = k => [r0[0] + e[0] * k, r0[1] + e[1] * k];
            return [h.chemin([r0, q(t - 5.5)], h.a.arete), h.chemin([q(t + 5.5), haut], h.a.arete)].join('\n');
          } }));
          o.push(String(derriere));
          // le geste : le frein, il tire la corde vers l'amont
          { const m = [derriere.mainP.x, derriere.mainP.y], L = Math.hypot(m[0] - r0[0], m[1] - r0[1]), e = [(m[0] - r0[0]) / L, (m[1] - r0[1]) / L], nn = [e[1], -e[0]];
            const g0 = [r0[0] + e[0] * L * 0.42 + nn[0] * 10, r0[1] + e[1] * L * 0.42 + nn[1] * 10], g1 = [r0[0] + e[0] * L * 0.74 + nn[0] * 10, r0[1] + e[1] * L * 0.74 + nn[1] * 10];
            o.push(h.geste(`M${P([g0])} L${P([g1])}`)); }
          return o.join('\n');
        },
        renvois: z => {
          const G = geoDescente(z), T = G.T, b0 = G.b0, r0 = G.r0;
          const dv = h.formes.corps(G.av), dr = h.formes.corps(G.arr);
          const m = [dv.mainP.x, dv.mainP.y], mF = [dr.mainP.x, dr.mainP.y], u = 0.62;
          return [
            { n: 9, rond: [250, 84], cible: T(116, 40), texte: 'poitrine, bassin, cuisses' },
            { n: 10, rond: [104, 112], cible: [m[0] + (b0[0] - m[0]) * u, m[1] + (b0[1] - m[1]) * u - 3], texte: 'brancards : ils retiennent' },
            { n: 11, rond: [300, 62], cible: [r0[0] + (mF[0] - r0[0]) * 0.25, r0[1] + (mF[1] - r0[1]) * 0.25], texte: 'derrière, à la corde : le frein' },
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
