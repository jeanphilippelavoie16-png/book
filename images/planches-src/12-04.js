// Planche 12-04. Le cône de deux bâches (ch. 12, section 5H).
// Côté porte : la bâche du bas autour de la base, la bâche du haut par-dessus, la porte lestée
// d'une bille, les perches cachées sous la toile. En coupe dans l'axe du vent : la base renchaussée
// côté vent, l'air qui entre en bas côté porte, le feu sur ses billes vertes, la fumée qui sort par
// le sommet ouvert, le dormeur les pieds au feu sur le sapinage qui s'arrête avant le foyer.
// Le sommet : le trépied lié, les autres perches dans la fourche, l'ouverture de 30 à 50 cm.
// Le joint : le haut par-dessus, l'eau coule dehors ; dans l'autre ordre, il verse dans la tente.
// Seule cote : 30 à 50 cm (5H, point 5). Proportions du cône : perches de 3,5 à 4,5 m (point 1),
// base au plus large des anciennes tentes (point 3), pour qu'un adulte s'y couche.
// L'eau liquide en bleu, h.a.hachure('eau') : la pluie et les gouttes qui tombent dans la tente (JP, 19 octobre 2026).

module.exports = (h) => {
  const f = v => Math.round(v * 10) / 10;
  const rad = d => d * Math.PI / 180;
  const noir = ep => `fill="none" stroke="#1A1A1A" stroke-width="${ep}" stroke-linecap="round" stroke-linejoin="round"`;
  const blancT = ep => `fill="none" stroke="#ffffff" stroke-width="${ep}" stroke-linecap="round" stroke-linejoin="round"`;

  // ─── Le dormeur dans son sac : le corps simple couché sur le dos (la pose sert de gabarit), et le
  // sac autour : le contour du corps rendu, uni, dilaté et lissé par Clipper (celui des corps simples),
  // le visage à découvert dans l'ouverture du capuchon.
  const CL = require(require('path').join(__dirname, '../../.claude/skills/planches/scripts/corps/clipper.js'));
  const sac = (c, { marge = 55, lisse = 150, trait = 1.4 } = {}) => {
    const SC = 100, k = c.echelle, polys = [];
    for (const m of String(c.svg).matchAll(/<path d="([^"]+)" fill="#(?:FFFFFF|E6E6E6)"/g))
      for (const sub of m[1].split('Z')) {
        const n = sub.match(/-?[\d.]+/g); if (!n || n.length < 6) continue;
        const P = []; for (let i = 0; i + 1 < n.length; i += 2) P.push({ X: Math.round(+n[i] * SC), Y: Math.round(+n[i + 1] * SC) });
        polys.push(P);
      }
    const op = (t, a, b) => { const x = new CL.Clipper(); x.AddPaths(a, CL.PolyType.ptSubject, true); if (b) x.AddPaths(b, CL.PolyType.ptClip, true); const r = new CL.Paths(); x.Execute(t, r, CL.PolyFillType.pftNonZero, CL.PolyFillType.pftNonZero); return r; };
    const off = (p, d) => { const o = new CL.ClipperOffset(2, 0.05 * SC); o.AddPaths(p, CL.JoinType.jtRound, CL.EndType.etClosedPolygon); const r = new CL.Paths(); o.Execute(r, d * SC); return r; };
    let env = off(off(op(CL.ClipType.ctUnion, polys), (marge + lisse) * k), -lisse * k);
    const t = c.tete, hx = t.haut[0] - t.x, hy = t.haut[1] - t.y, L = Math.hypot(hx, hy) || 1, mi = c.miroir ? -1 : 1;
    const fx = -hy / L * mi, fy = hx / L * mi, r = 100 * k, D = [];
    for (let i = 0; i < 48; i++) { const a = i / 48 * 2 * Math.PI; D.push({ X: Math.round((t.x + fx * 0.6 * r + 0.78 * r * Math.cos(a)) * SC), Y: Math.round((t.y + fy * 0.6 * r + 0.78 * r * Math.sin(a)) * SC) }); }
    env = op(CL.ClipType.ctDifference, env, [D]);
    const d = env.map(P => 'M' + P.map(q => `${f(q.X / SC)} ${f(q.Y / SC)}`).join(' L') + ' Z').join(' ');
    return `<path d="${d}" fill="#FFFFFF" stroke="#1A1A1A" stroke-width="${trait}" stroke-linejoin="round"/>`;
  };

  // ─── Le cône, en mètres.
  const R = 2.75, H = 3.0, LP = Math.hypot(R, H), TA = R / H;
  const T_TIP = 1 + 0.4 / LP;           // bout des perches, au-delà du croisement
  const RO = 0.2;                        // rayon de l'ouverture du sommet
  const T_O = 1 - RO / R;                // bord haut de la bâche du haut
  const T_B1 = 0.5, T_B2 = 0.42;         // haut de la bâche du bas, bas de la bâche du haut
  const T_P = 0.1;                       // bas de la porte : la base respire de ce côté
  const K = 0.17;                        // vue un peu plongeante : ellipse = K × rayon
  const TRIPODE = [15, 140, 250], AUTRES = [64, 116, 195, 222, 290, 325];
  const PERCHES = [...TRIPODE, ...AUTRES];
  const SIL = Math.asin(K * TA) * 180 / Math.PI;     // génératrices de la silhouette
  const tR = -SIL, tL = 180 + SIL;
  const arc = (F, t, a, b, n = 40) => { const o = []; for (let i = 0; i <= n; i++) o.push(F(a + (b - a) * i / n, t)); return o; };

  // ─── Côté porte.
  const elev = z => {
    const Rp = 100, s = Rp / R, Hp = H * s, cx = Math.round(z.l / 2), yg = z.h - 50;
    const E = (th, t) => [cx + Rp * (1 - t) * Math.cos(rad(th)), yg - Hp * t + K * Rp * (1 - t) * Math.sin(rad(th))];
    return { Rp, s, Hp, cx, yg, E };
  };

  // ─── En coupe : la gauche est au vent, la porte à droite.
  const coupe = z => {
    const Rp = Math.floor((z.l - 60 - 38) / 2), cx = 60 + Rp, s = Rp / R, Hp = H * s;
    const yg = z.h - 36, ya = yg - Hp, L = Math.hypot(Rp, Hp);
    const nL = [-Hp / L, -Rp / L], nR = [Hp / L, -Rp / L];
    const WL = (t, o) => [cx - Rp + t * Rp + o * nL[0], yg - t * Hp + o * nL[1]];
    const WR = (t, o) => [cx + Rp - t * Rp + o * nR[0], yg - t * Hp + o * nR[1]];
    // Les perches de la porte sont de part et d'autre du plan de coupe : on les voit au-delà.
    const kP = Math.cos(rad(26));
    const PR = t => [cx + kP * Rp * (1 - t), yg - t * Hp];
    return { Rp, cx, s, Hp, yg, ya, WL, WR, PR };
  };

  // Le dormeur de la coupe : le corps simple couché sur le dos, à l'échelle de la coupe (s unités par
  // mètre), le bout du sac (marge M mm autour du corps) à 0,33 m du pied du mur, sur le sapinage, les
  // genoux un peu levés : il reste un écart entre le pied du sac et le feu (le test de la main, point 3).
  const dormeurDe = z => {
    const { Rp, cx, s, yg } = coupe(z), xL = cx - Rp, k = s / 1000, M = 55, yb = yg - 6;
    const dormeur = h.formes.corps({ pose: 'couche-dos', x: xL + (0.33 * 1000 + M + 822) * k, y: yb - M * k, echelle: k,
      angles: { cuisseP: 114, jambeP: 66, cuisseL: 112, jambeL: 68, piedP: 160, piedL: 160 } });
    return { dormeur, M, k, piedSac: dormeur.boite.x1 + M * k };
  };

  // ─── Le sommet, de près.
  const sommet = z => {
    const sd = 270, cx = Math.round(z.l / 2), yQ = Math.round(z.h / 2 - 30);
    const dO = RO / TA * sd, dB = Math.floor((z.l / 2 - 14) / TA), dT = -0.4 * (H / LP) * sd, dL = 11;
    // Q : croisement des perches du dessus, sur lesquelles pose la toile ; le trépied lié croise dL plus bas.
    const S = (th, d, dy = 0) => [cx + (d - dy) * TA * Math.cos(rad(th)), yQ + d + K * (d - dy) * TA * Math.sin(rad(th))];
    return { sd, cx, yQ, dO, dB, dT, dL, S };
  };

  // ─── Le joint, en coupe dans le mur de gauche : dehors en haut à gauche, dedans en bas à droite.
  const joint = z => {
    const al = Math.atan(TA), u = [Math.sin(al), -Math.cos(al)], n = [-Math.cos(al), -Math.sin(al)];
    const k = 1.6, Ls = Math.min((z.l - 50) / u[0], (z.h - 40) / -u[1]);
    const C = [z.l / 2 + 4, z.h / 2 + 4];
    const Pt = (s, o) => [C[0] + (s - Ls / 2) * u[0] + o * n[0], C[1] + (s - Ls / 2) * u[1] + o * n[1]];
    const JW = 0.22 * 222 * k;
    return { Ls, Pt, JB: Ls / 2 - JW / 2, JH: Ls / 2 + JW / 2, W: 6 * k, O1: 6 * k + 1.5, T: 4.5, O2: 6 * k + 9, D: 7, k };
  };
  const goutte = (x, y) => h.path(`M ${f(x)} ${f(y - 5)} Q ${f(x + 3)} ${f(y + 1)} ${f(x)} ${f(y + 2.2)} Q ${f(x - 3)} ${f(y + 1)} ${f(x)} ${f(y - 5)} Z`, h.a.hachure('eau', 'fin'));
  // Brisure : le dessin est coupé là, perche et bâches comprises.
  const brisure = (g, s, o0, o1) => { const o = []; const N = 8; for (let i = 0; i <= N; i++) o.push(g.Pt(s + (i % 2 ? 3 : -3), o0 + (o1 - o0) * i / N)); return o; };
  const perchePleine = (g) => {
    const { Pt, Ls, W } = g;
    return [
      h.chemin([Pt(0, -W), Pt(Ls, -W), Pt(Ls, W), Pt(0, W)], h.a.hachure('bois', 'aucun'), true),
      h.chemin([Pt(0, -W), Pt(Ls, -W)], h.a.arete),
      h.chemin([Pt(0, W), Pt(Ls, W)], h.a.arete),
    ].join('\n');
  };
  const bris = g => [h.chemin(brisure(g, 0, -g.W - 2, g.O2 + g.T + 2), h.a.detail), h.chemin(brisure(g, g.Ls, -g.W - 2, g.O2 + g.T + 2), h.a.detail)].join('\n');
  // Une bâche : deux traits d'épaisseur ; pointillé léger si c'est celle du haut.
  const bache = (g, pts, haut) => {
    const A = pts.map(([s, o]) => g.Pt(s, o)), B = pts.map(([s, o]) => g.Pt(s, o + g.T)).reverse();
    const out = [h.chemin([...A, ...B], 'fill="#ffffff" stroke="none"', true), h.chemin(A, h.a.arete), h.chemin([...B].reverse(), h.a.arete)];
    if (haut) out.push(h.chemin(pts.map(([s, o]) => g.Pt(s, o + g.T / 2)), 'fill="none" stroke="#1A1A1A" stroke-width="0.7" stroke-dasharray="0.8 2.6" stroke-linecap="round"'));
    const [sl, ol] = pts[pts.length - 1];
    out.push(h.chemin([g.Pt(sl, ol), g.Pt(sl, ol + g.T)], h.a.arete));
    return out.join('\n');
  };
  const pluie = g => {
    const { Pt, Ls } = g;
    return [[0.66, 46], [0.78, 62], [0.9, 44], [0.56, 62]].map(([a, o]) => goutte(...Pt(a * Ls, o))).join('\n');
  };

  return {
    ref: '12-04',
    titre: 'Le cône de deux bâches',
    desc: 'Côté porte : des perches en cône, cachées sous la toile ; la bâche du bas fait le tour de la base, la bâche du haut la recouvre par-dessus et s’arrête sous le croisement des perches, laissant le sommet ouvert ; la porte est un pan de bâche attaché en haut aux perches et lesté en bas d’une petite bille. En coupe dans l’axe du vent : la base renchaussée de neige du côté du vent ; de l’autre côté, sous la porte, l’air entre par le bas, va au feu, et la fumée monte au centre et sort par le sommet ouvert ; le feu est dans un rond de pierres sèches posé sur des billes vertes ; le sapinage fait le tour sans aller jusqu’au foyer ; un dormeur est couché les pieds vers le feu. Le sommet : trois perches liées ensemble en trépied, les autres appuyées dans la fourche, et l’ouverture de 30 à 50 cm entre les perches. Le joint des deux bâches : quand celle du haut recouvre celle du bas par l’extérieur, l’eau coule par-dessus le joint et reste dehors ; posées dans l’autre ordre, le joint recueille l’eau et la verse dans la tente.',
    format: 'pleine',
    disposition: [['sommet', 'coupe'], ['elev', 'bon', 'rate']],
    hauteurs: [1.2, 1],
    largeurs: [[1.25, 2.4], [1.2, 1, 1]],
    vues: {
      // ─────────────────────────────────────────────────────────────────────────────────
      elev: {
        titre: 'Côté porte',
        dessin: z => {
          const g = elev(z), { E, cx, yg, Rp } = g, out = [];
          out.push(h.rect(4, yg - 10, z.l - 8, z.h - 4 - (yg - 10), h.a.hachure('neige', 'aucun')));
          // La bâche du bas, puis la porte, puis la bâche du haut par-dessus.
          out.push(h.chemin([...arc(E, 0, tR, tL), ...arc(E, T_B2, tL, tR)], h.a.blanc, true));
          out.push(h.chemin([...arc(E, T_P, 58, 122, 16), ...arc(E, T_B2, 122, 58, 16)], h.a.blanc, true));
          out.push(h.chemin([...arc(E, T_B2, tR, tL), ...arc(E, T_O, tL, tR + 360)], h.a.blanc, true));
          // Les perches, sous la toile, côté vu.
          for (const th of PERCHES) if (Math.sin(rad(th)) > 0.2) out.push(h.ligne(...E(th, 0.012), ...E(th, T_O), h.a.cache));
          // L'ouverture de la porte, sous le pan : les bouts de la bâche du bas.
          for (const th of [64, 116]) out.push(h.ligne(...E(th, 0), ...E(th, T_P + 0.01), h.a.detail));
          // Le pan de porte.
          out.push(h.chemin(arc(E, T_P, 58, 122, 16), h.a.arete));
          out.push(h.ligne(...E(58, T_P), ...E(58, T_B2), h.a.arete));
          out.push(h.ligne(...E(122, T_P), ...E(122, T_B2), h.a.arete));
          for (const th of [64, 116]) out.push(h.cercle(...E(th, T_B2 - 0.035), 1.8, h.a.plein));
          // La bille qui leste le bas.
          const bille = [...arc(E, T_P, 52, 128, 16).map(([x, y]) => [x, y - 2]), ...arc(E, T_P, 128, 52, 16).map(([x, y]) => [x, y + 4])];
          out.push(h.chemin(bille, h.a.arete.replace('fill="none"', 'fill="#ffffff"'), true));
          for (const th of [52, 128]) { const [x, y] = E(th, T_P); out.push(h.ellipse(x, y + 1, 1.8, 3, h.a.detail)); }
          // Les bords.
          out.push(h.chemin(arc(E, 0, tR, 64, 20), h.a.arete), h.chemin(arc(E, 0, 116, tL, 20), h.a.arete));
          out.push(h.chemin(arc(E, T_B2, tR, tL), h.a.arete));
          out.push(h.chemin(arc(E, T_O, 0, 360, 30), h.a.arete));
          out.push(h.ligne(...E(tL, 0), ...E(tL, T_O), h.a.contour), h.ligne(...E(tR, 0), ...E(tR, T_O), h.a.contour));
          // Les perches au-dessus de l'ouverture.
          for (const th of PERCHES) out.push(h.ligne(...E(th, T_O), ...E(th, T_TIP), h.a.arete));
          return out.join('\n');
        },
        renvois: z => {
          const { E, yg, cx } = elev(z);
          return [
            { n: 9, rond: [22, yg - 66], cible: E(158, 0.22), texte: 'bâche du bas, posée en premier' },
            { n: 10, rond: [z.l - 22, yg - 104], cible: E(24, 0.64), texte: 'bâche du haut, posée en dernier, par-dessus' },
            { n: 11, rond: [cx + 56, yg + 34], cible: E(98, T_P), texte: 'porte : pan de bâche lesté d’une bille' },
          ];
        },
      },
      // ─────────────────────────────────────────────────────────────────────────────────
      coupe: {
        titre: 'En coupe, dans l’axe du vent',
        dessin: z => {
          const g = coupe(z), { Rp, cx, s, Hp, yg, ya, WL, WR, PR } = g, out = [];
          const xL = cx - Rp, xR = cx + Rp;
          // La neige, dedans et dehors.
          out.push(h.rect(4, yg, z.l - 8, z.h - 4 - yg, h.a.hachure('neige', 'aucun')));
          out.push(h.ligne(4, yg, z.l - 4, yg, h.a.detail));
          // La base renchaussée, côté vent.
          const [bx, by] = WL(0.2, 3.2), x0 = xL - 0.95 * s;
          const talus = `M ${f(x0)} ${yg} Q ${f(bx - 16)} ${f(by + 1)} ${f(bx)} ${f(by)} L ${f(WL(0, 3.2)[0])} ${yg} Z`;
          out.push(h.path(talus, h.a.blanc), h.path(talus, h.a.hachure('neige', 'aucun')));
          out.push(h.path(`M ${f(x0)} ${yg} Q ${f(bx - 16)} ${f(by + 1)} ${f(bx)} ${f(by)}`, h.a.detail));
          // Le vent.
          for (const dy of [44, 60]) {
            const y = yg - dy, xm = xL + dy * Rp / Hp - 14;
            out.push(h.fleche(`M 6 ${y} L ${f(xm)} ${y}`));
          }
          // Le sapinage, jamais jusqu'au foyer.
          const sap = (x0, x1) => { const o = []; for (let x = x0; x <= x1 - 4; x += 3.4) o.push([x, yg], [x + 3.4, yg - 6]); return h.chemin(o, h.a.fin); };
          out.push(sap(xL + 5, cx - 0.45 * s), sap(cx + 0.45 * s, xR - 0.14 * Rp));
          // Le foyer : billes vertes en deux couches, pierres sèches, petite flamme.
          const blancA = h.a.arete.replace('fill="none"', 'fill="#ffffff"');
          for (let i = -2; i <= 2; i++) { out.push(h.cercle(cx + i * 8, yg - 4, 4, blancA)); out.push(h.cercle(cx + i * 8, yg - 4, 2.6, h.a.fin)); }
          // Le lit de cailloux arrondis, au contour irrégulier, posé sur les billes.
          const caillou = (x, y, rx, ry, k) => { const o = []; for (let i = 0; i < 12; i++) { const a = i / 12 * 2 * Math.PI, r = 1 + 0.12 * Math.sin(3 * a + k); o.push([x + rx * r * Math.cos(a), y + ry * r * Math.sin(a)]); }
            return h.chemin(o, blancA, true); };
          [[-17, 3.6, 2.6, 0], [-9.5, 3.2, 2.4, 1], [-2.5, 3.6, 2.5, 2], [4.5, 3.3, 2.6, 3], [11.5, 3.7, 2.4, 4], [18, 3.2, 2.5, 5]].forEach(([dx, rx, ry, k]) => out.push(caillou(cx + dx, yg - 10.5, rx, ry, k)));
          [[-13, 2.8, 2, 6], [13, 2.8, 2, 7]].forEach(([dx, rx, ry, k]) => out.push(caillou(cx + dx, yg - 14.2, rx, ry, k)));
          // Deux bûches vues du bout, de part et d'autre de la flamme.
          for (const sx of [-12, 12]) { out.push(h.cercle(cx + sx, yg - 19.5, 4.6, blancA)); out.push(h.cercle(cx + sx, yg - 19.5, 3, h.a.fin)); }
          const flamme = (x, hf, w) => h.path(`M ${f(x - w)} ${f(yg - 16)} Q ${f(x - w)} ${f(yg - 16 - hf * 0.55)} ${f(x)} ${f(yg - 16 - hf)} Q ${f(x + w)} ${f(yg - 16 - hf * 0.55)} ${f(x + w)} ${f(yg - 16)} Z`, h.a.arete.replace('fill="none"', 'fill="#ffffff"'));
          out.push(flamme(cx - 3, 12, 3.5), flamme(cx + 3, 11, 3.2), flamme(cx, 17, 4));
          // Le dormeur, dans son sac, la tête au mur et les pieds au feu : le corps simple à l'échelle
          // de la coupe (s unités par mètre), le bout du sac à 0,36 m du pied du mur, couché sur le sapinage.
          const { dormeur, M, k, piedSac } = dormeurDe(z);
          out.push(dormeur.toString(), sac(dormeur, { marge: M }));
          // à contrôler : l'écart entre le pied du sac et le feu (le test de la main)
          out.push(h.controle((piedSac + cx - 21) / 2, yg - 9));
          // Les perches : celle du vent dans le plan, celles de la porte au-delà.
          out.push(h.ligne(...PR(0), ...PR(T_TIP), h.a.arete));
          out.push(h.ligne(...WL(0, 0), ...WL(T_TIP, 0), h.a.contour));
          // Côté vent : la bâche du bas, puis celle du haut par-dessus le joint.
          out.push(h.ligne(...WL(0, 3.2), ...WL(T_B1, 3.2), h.a.arete));
          out.push(h.chemin([WL(T_B2, 6.4), WL(T_B1, 6.4), WL(T_B1 + 0.025, 3.2), WL(T_O, 3.2)], h.a.arete));
          // Côté porte : le pan de porte et sa bille, la bâche du haut par-dessus.
          out.push(h.ligne(...WR(T_P, 3.2), ...WR(T_B1, 3.2), h.a.arete));
          out.push(h.chemin([WR(T_B2, 6.4), WR(T_B1, 6.4), WR(T_B1 + 0.025, 3.2), WR(T_O, 3.2)], h.a.arete));
          out.push(h.cercle(...WR(T_P - 0.01, 6.8), 3.6, h.a.arete.replace('fill="none"', 'fill="#ffffff"')));
          // L'air entre en bas côté porte, va au feu ; la fumée monte et sort par le sommet ouvert.
          out.push(h.fleche(`M ${z.l - 6} ${yg - 5} L ${f(xR - 6)} ${yg - 5} Q ${f(xR - 14)} ${yg - 11} ${f(xR - 24)} ${yg - 11} L ${f(cx + 34)} ${yg - 11} Q ${f(cx + 24)} ${yg - 11} ${f(cx + 21)} ${yg - 24}`, h.a.cache));
          out.push(h.fleche(`M ${cx} ${f(yg - 36)} L ${cx} ${f(ya + 24)} Q ${cx} ${f(ya - 8)} ${f(cx + 20)} ${f(ya - 30)}`, h.a.cache));
          return out.join('\n');
        },
        renvois: z => {
          const { Rp, cx, s, Hp, yg, ya } = coupe(z), xL = cx - Rp, xR = cx + Rp;
          const { dormeur, M, k } = dormeurDe(z), pied = [dormeur.boite.x1 - 1, dormeur.boite.y0 - M * k];
          return [
            { n: 3, rond: [cx - 4, yg + 24], cible: [cx - 9, yg - 9], texte: 'foyer : pierres sèches sur billes vertes' },
            { n: 4, rond: [cx + 62, yg + 20], cible: [cx + 50, yg - 3], texte: 'sapinage, jamais jusqu’au foyer' },
            { n: 5, rond: [pied[0] - 22, yg - 58], cible: pied, texte: 'couché les pieds vers le feu' },
            { n: 6, rond: [xL - 34, yg + 20], cible: [xL - 16, yg - 8], texte: 'base renchaussée de neige, côté vent' },
            { n: 7, rond: [z.l - 18, yg - 34], cible: [z.l - 16, yg - 6], texte: 'l’air entre par le bas, côté porte' },
            { n: 8, rond: [cx - 34, ya - 26], cible: [cx + 1, ya - 12], texte: 'la fumée sort par le sommet ouvert' },
          ];
        },
      },
      // ─────────────────────────────────────────────────────────────────────────────────
      sommet: {
        titre: 'Le sommet',
        dessin: z => {
          const g = sommet(z), { cx, yQ, dO, dB, dT, dL, S } = g, out = [];
          const rim = th => S(th, dO);
          // La cassure du bas : une ligne ondulée qui suit l'avant du cône.
          const casse = [];
          for (let i = 0; i <= 24; i++) {
            const th = tL - (tL - tR) * i / 24, p = S(th, dB);
            casse.push([p[0], p[1] + 3 * Math.sin(i * 1.3)]);
          }
          const bande = [S(tL, dO), ...casse, S(tR, dO), ...arc((th) => rim(th), 0, tR + 360, tL, 30)];
          out.push(h.chemin(bande, h.a.blanc, true));
          // Les perches sous la toile, côté vu.
          for (const th of AUTRES) if (Math.sin(rad(th)) > 0.2) out.push(h.ligne(...S(th, dO + 3), ...S(th, dB), h.a.cache));
          for (const th of TRIPODE) if (Math.sin(rad(th)) > 0.2) out.push(h.ligne(...S(th, dO + 3, dL), ...S(th, dB, dL), h.a.cache));
          out.push(h.chemin(casse, h.a.detail));
          out.push(h.ligne(...S(tL, dO), ...S(tL, dB), h.a.contour), h.ligne(...S(tR, dO), ...S(tR, dB), h.a.contour));
          out.push(h.chemin(arc((th) => rim(th), 0, 0, 360, 40), h.a.arete, true));
          // Au-dessus de la toile : le trépied lié, et les autres perches dans sa fourche.
          for (const th of AUTRES) out.push(h.ligne(...S(th, dO), ...S(th, dT), h.a.arete));
          for (const th of TRIPODE) out.push(h.ligne(...S(th, dO, dL), ...S(th, dT + dL, dL), h.a.contour));
          const yL = yQ + dL;
          out.push(h.rect(cx - 6, yL - 5, 12, 10, h.a.arete.replace('fill="none"', 'fill="#ffffff"')));
          for (const dy of [-2.5, 0, 2.5]) out.push(h.ligne(cx - 6, yL + dy, cx + 6, yL + dy, h.a.detail));
          // L'ouverture.
          const rx = dO * TA, yE = yQ + dO, yc = Math.max(...casse.map(p => p[1])) + 14;
          for (const sx of [-1, 1]) out.push(h.ligne(cx + sx * rx, yE + 3, cx + sx * rx, yc + 6, h.a.detail));
          out.push(h.rect(cx - rx - 4, yc - 4, 2 * rx + 8, 24, 'fill="#ffffff" stroke="none"'));
          out.push(h.cote(cx - rx, yc, cx + rx, yc, '30 à 50 cm', { cote: 'dessous' }));
          return out.join('\n');
        },
        renvois: z => {
          const { cx, yQ, dL } = sommet(z);
          return [
            { n: 1, rond: [22, yQ + dL + 4], cible: [cx - 7, yQ + dL], texte: 'trois perches liées à un bout, en trépied' },
            { n: 2, rond: [z.l - 22, yQ - 30], cible: [cx + 2, yQ - 3], texte: 'cinq ou six perches appuyées dans la fourche' },
          ];
        },
      },
      // ─────────────────────────────────────────────────────────────────────────────────
      bon: {
        titre: 'Le haut par-dessus',
        dessin: z => {
          const g = joint(z), { Pt, Ls, JB, JH, W, O1, O2, D } = g, out = [];
          out.push(perchePleine(g));
          const T = g.T, c = 0.5 * (JB + JH);
          // Le cordon : une boucle qui traverse la bâche du bas et fait le tour de la perche ; derrière en tireté.
          out.push(h.chemin([Pt(c + 4, O1 + T), Pt(c + 10, -W - 2)], 'fill="none" stroke="#1A1A1A" stroke-width="1.1" stroke-dasharray="3 2.2" stroke-linecap="round"'));
          out.push(bache(g, [[0, O1], [JH, O1]], false));
          out.push(h.chemin([Pt(c + 4, O1 + T), Pt(c - 4, O1 + T), Pt(c + 2, -W - 2)], 'fill="none" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"'));
          // Le nœud, côté intérieur, et ses deux bouts.
          out.push(h.cercle(...Pt(c + 6, -W - 3.5), 3.2, h.a.plein));
          out.push(h.chemin([Pt(c + 5, -W - 5), Pt(c, -W - 13)], h.a.arete), h.chemin([Pt(c + 7, -W - 5), Pt(c + 13, -W - 12)], h.a.arete));
          // La bâche du haut par-dessus : elle couvre le trou du cordon.
          out.push(bache(g, [[Ls, O1], [JH + 10, O1], [JH, O2], [JB, O2]], true));
          out.push(bris(g));
          // L'eau coule sur la bâche du haut, saute le joint et continue dehors.
          out.push(pluie(g));
          out.push(h.fleche(`M ${Pt(Ls - 18, O1 + D).map(f).join(' ')} L ${Pt(JH + 8, O1 + D).map(f).join(' ')} L ${Pt(JH, O2 + D).map(f).join(' ')} L ${Pt(JB + 2, O2 + D).map(f).join(' ')} L ${Pt(JB - 8, O1 + D).map(f).join(' ')} L ${Pt(14, O1 + D).map(f).join(' ')}`, h.a.cache));
          return out.join('\n');
        },
        renvois: z => {
          const { Pt, JB, JH, W } = joint(z), c = 0.5 * (JB + JH) + 6;
          return [
            { n: 12, rond: Pt(c - 30, -W - 40).map(Math.round), cible: Pt(c, -W - 3.5), texte: 'cordon noué en dedans, autour de la perche' },
          ];
        },
      },
      rate: {
        titre: 'Dans l’autre ordre',
        dessin: z => {
          const g = joint(z), { Pt, Ls, JB, JH, W, O1, O2, D, T } = g, out = [];
          out.push(perchePleine(g));
          // La bâche du haut contre la perche ; celle du bas par-dessus : son bord fait une lèvre.
          out.push(bache(g, [[0, O1], [JB - 10, O1], [JB, O2], [JH, O2]], false));
          out.push(bache(g, [[Ls, O1], [JB, O1]], true));
          out.push(bris(g));
          // L'eau entre dans le joint, descend entre les deux bâches et tombe dans la tente.
          out.push(pluie(g));
          out.push(h.fleche(`M ${Pt(Ls - 18, O1 + D).map(f).join(' ')} L ${Pt(JH + 8, O1 + D).map(f).join(' ')} L ${Pt(JH - 2, O1 + T + 1.8).map(f).join(' ')} L ${Pt(JB + 4, O1 + T + 1.8).map(f).join(' ')}`, h.a.cache));
          const [gx, gy] = Pt(JB - 4, -W - 1);
          for (const dy of [12, 25, 38]) out.push(goutte(gx, gy + dy));
          // là où ça casse : le joint ouvert vers le haut, qui recueille l'eau
          out.push(h.controle(...Pt(JH - 3, O1 + T / 2), 9));
          return out.join('\n');
        },
        renvois: () => [],
      },
    },
    danger: 'Sommet grand ouvert, flamme claire et quelqu’un d’éveillé toute la nuit. Qu’il en manque un, et c’est un abri fermé avec un feu dedans.',
  };
};
