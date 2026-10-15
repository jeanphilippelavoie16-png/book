// Planche 04-40. Le sas : monter l'entrée, puis l'ordre du retour (chapitre 4, étapes 5, 10 et 16 ;
// variante « Sans eau chaude ni savon » : l'entrée en chicane et le costume de sortie ; §7 : les traces).
// Refaite le 15 octobre 2026 (JP : « mieux faite, c'est une partie importante »).
// Cotes : aucune. Le chapitre ne donne aucune mesure de l'entrée, des bâches, du bac ni du costume.
// Ce que le chapitre dit et que la planche montre :
//   - l'entrée montée avec deux bâches ou deux couvertures accrochées en chicane, un bac à vêtements
//     entre les deux (§9) ; trois zones : dehors, la zone entre les bâches (sale), l'abri (propre) ;
//   - le costume de sortie taillé dans un sac à ordures : poncho fendu, capuchon, poignets et chevilles
//     rubanés serré, bottes de caoutchouc, lunettes de ski ; il s'essuie et se rince dehors, il ne
//     franchit pas la deuxième bâche (§9) ;
//   - le déshabillage lentement, sans secouer, sans toucher au visage, dans un sac fermé (étape 5) ;
//     la couche du dessus, puis les bottes (étapes 5 et 16) ;
//   - se laver les mains et le visage avant d'entrer dans l'abri (étapes 10 et 16) ;
//   - des traces de pas poudreuses dans l'abri : le dépôt est entré (§7).
// Ce que la planche ajoute sans chiffre : le poncho roulé sur lui-même, l'extérieur en dedans (une façon
// de l'ôter sans secouer) ; la façon d'accrocher les bâches n'est pas dite : elles pendent du plafond,
// fixées d'un bord au mur, sans détail de fixation.
// Mise en page : le plan en haut, le chemin numéroté de 1 à 6 ; dessous, les six temps dans l'ordre,
// de profil, la caméra qui suit le chemin de gauche à droite (dehors, entre les bâches, l'abri). Les
// numéros du chemin sont ceux des vignettes. Les trois zones portent les deux gris de la charte :
// dehors #CFCFCF, entre les bâches #E6E6E6, l'abri en blanc.
module.exports = (h) => {
  const A = h.a;
  const F = h.formes;
  const f1 = v => Math.round(v * 10) / 10;
  const W = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const GRIS_DEHORS = '#CFCFCF', GRIS_SALE = '#E6E6E6';
  const aplat = c => `fill="${c}" stroke="none"`;
  const solA = c => `fill="${c}" stroke="#1A1A1A" stroke-width="1.4" stroke-linejoin="round"`;

  // Courbe lisse (Catmull-Rom) par des points ; ferme = true pour une forme.
  const lisse = (pts, ferme = false) => {
    const n = pts.length, P = i => ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
    let d = `M${f1(pts[0][0])} ${f1(pts[0][1])}`;
    const fin = ferme ? n : n - 1;
    for (let i = 0; i < fin; i++) {
      const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C${f1(c1[0])} ${f1(c1[1])} ${f1(c2[0])} ${f1(c2[1])} ${f1(p2[0])} ${f1(p2[1])}`;
    }
    return ferme ? d + ' Z' : d;
  };
  // Une bâche vue par la tranche : une ligne qui ondule.
  const onde = (x1, y1, x2, y2, amp = 2.6, pas = 11) => {
    const L = Math.hypot(x2 - x1, y2 - y1), n = Math.max(2, Math.round(L / pas));
    const ux = (x2 - x1) / L, uy = (y2 - y1) / L;
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const t = i / n, s = (i === 0 || i === n) ? 0 : (i % 2 ? amp : -amp);
      pts.push([x1 + (x2 - x1) * t - uy * s, y1 + (y2 - y1) * t + ux * s]);
    }
    return pts;
  };
  // Une pastille numérotée posée sur le chemin du plan (les mêmes numéros que les vignettes).
  const etape = (x, y, n) => [h.cercle(x, y, 9, 'fill="#FFFFFF" stroke="#1A1A1A" stroke-width="1.4"'),
    h.texte(x, y + 4, String(n))].join('\n');

  // ─── L'enveloppe d'un corps simple (le poncho) : le contour du corps rendu, uni, dilaté de « marge » mm
  // et lissé (Clipper, celui des corps simples) ; le visage reste à découvert dans l'ouverture du capuchon ;
  // « garder » [x0, y0, x1, y1] : ne garder que ce rectangle (le poncho : du sommet aux genoux).
  const CL = require(require('path').join(__dirname, '../../.claude/skills/planches/scripts/corps/clipper.js'));
  const sac = (c, { marge = 55, lisse: L0 = 150, trait = 1.4, visage = true, garder = null } = {}) => {
    const SC = 100, k = c.echelle, polys = [], r1 = v => Math.round(v * 10) / 10;
    for (const m of String(c.svg).matchAll(/<path d="([^"]+)" fill="#(?:FFFFFF|E6E6E6)"/g))
      for (const sub of m[1].split('Z')) {
        const n = sub.match(/-?[\d.]+/g); if (!n || n.length < 6) continue;
        const P = []; for (let i = 0; i + 1 < n.length; i += 2) P.push({ X: Math.round(+n[i] * SC), Y: Math.round(+n[i + 1] * SC) });
        polys.push(P);
      }
    const op = (t, a, b) => {
      const x = new CL.Clipper(); x.AddPaths(a, CL.PolyType.ptSubject, true); if (b) x.AddPaths(b, CL.PolyType.ptClip, true);
      const r = new CL.Paths(); x.Execute(t, r, CL.PolyFillType.pftNonZero, CL.PolyFillType.pftNonZero); return r;
    };
    const off = (p, d) => { const o = new CL.ClipperOffset(2, 0.05 * SC); o.AddPaths(p, CL.JoinType.jtRound, CL.EndType.etClosedPolygon); const r = new CL.Paths(); o.Execute(r, d * SC); return r; };
    let env = off(off(op(CL.ClipType.ctUnion, polys), (marge + L0) * k), -L0 * k);
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
    const avant = y => { let x = -Infinity; for (const P of env) for (let i = 0; i < P.length; i++) { const a = P[i], b = P[(i + 1) % P.length], ya = a.Y / SC, yb = b.Y / SC;
      if ((ya - y) * (yb - y) <= 0 && ya !== yb) x = Math.max(x, (a.X + (b.X - a.X) * (y - ya) / (yb - ya)) / SC); } return x; };
    const arriere = y => { let x = Infinity; for (const P of env) for (let i = 0; i < P.length; i++) { const a = P[i], b = P[(i + 1) % P.length], ya = a.Y / SC, yb = b.Y / SC;
      if ((ya - y) * (yb - y) <= 0 && ya !== yb) x = Math.min(x, (a.X + (b.X - a.X) * (y - ya) / (yb - ya)) / SC); } return x; };
    return Object.assign(new String(`<path d="${dEnv}" fill="#FFFFFF" stroke="#1A1A1A" stroke-width="${trait}" stroke-linejoin="round"/>`), { avant, arriere });
  };

  // Repère d'un personnage : millimètres depuis un point au sol, vers la vue.
  const repere = (x0, y0, e) => ([mx, my]) => [x0 + mx * e, y0 + my * e];
  // Les lunettes de ski sur la tête ronde du pictogramme : c le centre, r le rayon, g la hauteur
  // (fraction du rayon, - vers le haut), t l'inclinaison de la tête (degrés).
  const lunettes = (c, r, g, t) => {
    const rd = t * Math.PI / 180, u = [Math.cos(rd), Math.sin(rd)], n = [-u[1], u[0]];
    const p = (f, k) => [c[0] + u[0] * f * r + n[0] * (g + k) * r, c[1] + u[1] * f * r + n[1] * (g + k) * r];
    const xf = Math.sqrt(Math.max(0, 1 - g * g));
    return [h.path(lisse([p(xf - 0.12, -0.26), p(xf + 0.1, -0.27), p(xf + 0.2, -0.14), p(xf + 0.22, 0), p(xf + 0.2, 0.14), p(xf + 0.1, 0.27), p(xf - 0.12, 0.26), p(xf - 0.16, 0)], true), W(A.arete)),
      h.path(lisse([p(xf + 0.12, -0.18), p(xf + 0.15, 0), p(xf + 0.12, 0.18)]), A.fin)].join('\n');
  };
  // La botte de caoutchouc, de profil, pointe vers +x (mm, depuis la cheville, au sol).
  const BOTTE = [[-62, -330], [-66, -200], [-68, -90], [-66, -26], [-56, -2], [60, -2], [172, -2], [208, -6], [215, -24],
    [205, -48], [170, -68], [110, -88], [72, -120], [56, -175], [58, -250], [60, -330]];
  const botte = (T, dx, gris = false) => {
    const B = BOTTE.map(([x, y]) => T([x + dx, y]));
    const out = [h.path(lisse(B, true), gris ? 'fill="#E6E6E6" stroke="#1A1A1A" stroke-width="1.4" stroke-linejoin="round"' : W(A.arete)),
      h.path(lisse([[-66, -16], [60, -14], [172, -14], [212, -14]].map(([x, y]) => T([x + dx, y]))), A.detail)];
    return out.join('\n');
  };
  // La botte vide : l'ouverture de la tige se voit (une ellipse à plat, vue un peu de haut).
  const botteVide = (T, dx, gris = false) => [botte(T, dx, gris),
    h.ellipse(...T([dx - 1, -330]), 61 * Math.abs(T([1, 0])[0] - T([0, 0])[0]), 3.2, gris ? 'fill="#E6E6E6" stroke="#1A1A1A" stroke-width="0.7"' : W(A.detail))].join('\n');
  // Une bande de ruban serrée : un anneau vu de côté, deux tours marqués.
  const ruban = (c, u, lg, la) => {
    const v = [-u[1], u[0]];
    const p = (a, b) => [c[0] + u[0] * a + v[0] * b, c[1] + u[1] * a + v[1] * b];
    return [h.chemin([p(-lg / 2, -la / 2), p(lg / 2, -la / 2), p(lg / 2, la / 2), p(-lg / 2, la / 2)], W(A.detail), true),
      h.chemin([p(-lg / 2, -la * 0.1), p(lg / 2, la * 0.2)], A.fin)].join('\n');
  };

  // ─── Le cadre des vignettes : de profil, la caméra suit le chemin du plan ─────────────────────
  const E = 0.094;                       // unités de vue par mm : un adulte de 1750 mm fait 165
  const solY = z => z.h - 12;
  // plafond, plancher (gris de la zone), bâches vues par la tranche, accrochées au plafond
  const cadre = (z, { plafond = true, sol = [[0, z.l, GRIS_SALE]], baches = [] } = {}) => {
    const o = [], yF = solY(z);
    for (const [x0, x1, c] of sol) o.push(h.rect(x0, yF, x1 - x0, 8, aplat(c)));
    o.push(h.ligne(0, yF, z.l, yF, A.arete), h.ligne(0, yF + 8, z.l, yF + 8, A.detail));
    if (plafond) o.push(h.rect(0, 0, z.l, 7, A.hachure('bois', 'detail')), h.ligne(0, 7, z.l, 7, A.arete));
    for (const [x, sens] of baches) {
      const pts = onde(x, 9, x, yF - 7, 2.4, 12);
      pts.push([x + sens * 5, yF - 1.2], [x + sens * 15, yF - 1.4]);
      o.push(h.path(lisse(pts), A.arete), h.rect(x - 4, 7, 8, 4, A.plein));
    }
    return o.join('\n');
  };

  // Le bac et son sac, de profil : rabattu sur le bord, ouvert ou fermé d'un nœud.
  const bacProfil = (x0, x1, yF, ht, ferme) => {
    const o = [];
    o.push(h.chemin([[x0 + 3, yF], [x1 - 3, yF], [x1, yF - ht], [x0, yF - ht]], W(A.arete), true));
    o.push(h.ligne(x0 + 1, yF - ht + 7, x1 - 1, yF - ht + 7, A.detail));
    if (ferme) {
      // le sac fermé dépasse en col froncé, noué
      const cx = (x0 + x1) / 2;
      o.push(h.path(lisse([[x0 + 4, yF - ht], [x0 + 8, yF - ht - 9], [cx - 6, yF - ht - 14], [cx - 2, yF - ht - 19], [cx + 2, yF - ht - 19],
        [cx + 6, yF - ht - 14], [x1 - 8, yF - ht - 9], [x1 - 4, yF - ht]]), W(A.detail)));
      o.push(h.path(lisse([[cx - 3, yF - ht - 19], [cx - 7, yF - ht - 25], [cx - 3, yF - ht - 28]]), A.detail));
      o.push(h.path(lisse([[cx + 3, yF - ht - 19], [cx + 8, yF - ht - 24], [cx + 6, yF - ht - 28]]), A.detail));
    } else {
      // le sac ouvert, rabattu sur le bord
      o.push(h.path(lisse([[x0 - 3, yF - ht - 1], [x1 + 3, yF - ht - 1], [x1 + 2, yF - ht + 9], [x1 - 10, yF - ht + 12], [(x0 + x1) / 2, yF - ht + 9],
        [x0 + 9, yF - ht + 12], [x0 - 2, yF - ht + 10]], true), W(A.detail)));
      for (const f of [0.22, 0.55, 0.8]) o.push(h.ligne(x0 + (x1 - x0) * f, yF - ht + 1, x0 + (x1 - x0) * f + 2, yF - ht + 10, A.fin));
    }
    return o.join('\n');
  };

  // ─── Le plan : l'entrée vue de dessus, les trois zones, le chemin ─────────────────────────────
  const plan = z => {
    const o = [];
    const t = 11, yH = 6, y1 = yH + t, y2 = z.h - 6 - t, yB = z.h - 6;   // murs du haut et du bas
    const xe = 88, xi = xe + t;                                       // mur extérieur
    const yp1 = y1 + 14, dw = 70;                                     // la porte
    const xb1 = 190, xb2 = 468, xf = z.l - 6;                          // les deux bâches ; la maison continue
    // les zones
    o.push(h.rect(0, 0, xe, z.h, aplat(GRIS_DEHORS)));
    o.push(h.rect(xi, y1, xb2 - xi, y2 - y1, aplat(GRIS_SALE)), h.rect(xe, yp1, t, dw, aplat(GRIS_SALE)));
    // murs
    o.push(h.rect(xe, yH, xf - xe, t, A.hachure('bois')));
    o.push(h.rect(xe, y2, xf - xe, t, A.hachure('bois')));
    o.push(h.rect(xe, yH, t, yp1 - yH, A.hachure('bois')));
    o.push(h.rect(xe, yp1 + dw, t, yB - yp1 - dw, A.hachure('bois')));
    // la maison continue à droite
    for (const [ya, yb] of [[yH, y1], [y2, yB]]) {
      o.push(h.rect(xf - 3, ya - 1, 9, yb - ya + 2, A.blanc));
      o.push(h.chemin([[xf - 2, ya - 3], [xf - 2, (ya + yb) / 2 - 2], [xf + 3, (ya + yb) / 2 - 4], [xf - 2, (ya + yb) / 2 + 3], [xf - 2, yb + 3]], A.detail));
    }
    // la porte, ouverte vers l'intérieur, et son débattement
    o.push(h.rect(xi, yp1, dw, 3.5, W(A.detail)));
    o.push(h.path(`M${f1(xi + dw)} ${f1(yp1 + 2)} A${dw} ${dw} 0 0 1 ${f1(xi)} ${f1(yp1 + dw)}`, A.fin));
    // les bâches en chicane : la première accrochée au mur du haut, son bord libre retombe contre le mur
    // du bas ; la deuxième à l'inverse. On passe chacune par son bord libre.
    const bache = (x, haut) => {
      const ya = haut ? y1 : y2, yb = haut ? y2 - 9 : y1 + 9, s = haut ? 1 : -1;
      const pts = onde(x, ya, x, yb, 2.6, 11);
      pts.push([x + 4, yb + s * 4.5], [x + 13, yb + s * 6.5], [x + 26, yb + s * 6.8]);
      return [h.path(lisse(pts), 'fill="none" stroke="#1A1A1A" stroke-width="1.9" stroke-linejoin="round" stroke-linecap="round"'),
        h.rect(x - 4.5, haut ? ya : ya - 5, 9, 5, A.plein)].join('\n');
    };
    o.push(bache(xb1, true), bache(xb2, false));
    // le seau, dehors, et son linge
    const sx = 44, sy = y2 - 18, rs = 12;
    o.push(h.path(`M${f1(sx - rs - 3)} ${f1(sy)} A${rs + 3} ${f1(rs * 1.7)} 0 0 1 ${f1(sx + rs + 3)} ${f1(sy)}`, A.detail));
    o.push(h.cercle(sx, sy, rs, W(A.arete)), h.cercle(sx, sy, rs - 3, A.hachure('eau', 'detail')));
    o.push(h.path(lisse([[sx + 5, sy + 9], [sx + 12, sy + 4], [sx + rs + 8, sy + 9], [sx + 13, sy + rs + 6], [sx + 6, sy + rs + 3]], true), W(A.detail)));
    // le bac contre le mur du bas, le sac ouvert dedans, et les bottes à côté
    const bx = 282, bl = 58, bh = 34, by = y2 - bh - 2;
    o.push(h.rect(bx, by, bl, bh, W(A.arete) + ' rx="4"'));
    o.push(h.path(lisse([[bx - 3, by - 2], [bx + bl * 0.5, by - 4], [bx + bl + 3, by - 2], [bx + bl + 4, by + bh * 0.5], [bx + bl + 3, by + bh + 2],
      [bx + bl * 0.5, by + bh + 3], [bx - 3, by + bh + 2], [bx - 4, by + bh * 0.5]], true), W(A.detail)));
    o.push(h.rect(bx + 6, by + 6, bl - 12, bh - 12, A.detail + ' rx="3"'));
    const sc = [bx + bl / 2, by + bh / 2];
    for (const [dx, dy] of [[-0.36, -0.3], [0, -0.32], [0.36, -0.3], [0.36, 0.3], [0, 0.32], [-0.36, 0.3]])
      o.push(h.ligne(sc[0] + bl * dx, sc[1] + bh * dy, sc[0] + bl * dx * 0.3, sc[1] + bh * dy * 0.3, A.fin));
    const bottePlan = (cx, cy) => [
      h.path(lisse([[cx - 6, cy + 17], [cx - 7, cy], [cx - 5, cy - 15], [cx, cy - 21], [cx + 5, cy - 15], [cx + 7, cy], [cx + 6, cy + 17], [cx, cy + 20]], true), W(A.arete)),
      h.ellipse(cx, cy + 9, 4.4, 6.6, A.detail)].join('\n');
    const bxB = bx + bl + 24, byB = y2 - 26;
    o.push(bottePlan(bxB - 8, byB), bottePlan(bxB + 8, byB));
    // le bassin, sur une caisse contre le mur du haut, juste avant la deuxième bâche
    const cxB = 424, cyB = y1 + 22;
    o.push(h.rect(cxB - 26, y1 + 1, 52, 40, W(A.arete)));
    o.push(h.ellipse(cxB, cyB, 19, 15, W(A.arete)), h.ellipse(cxB, cyB, 15.5, 11.5, A.hachure('eau', 'detail')));
    // le chemin : dehors, la porte, le bord libre de la bâche 1, le bac, les bottes, le bassin, le bord
    // libre de la bâche 2, l'abri
    const S = [[sx + 2, sy - 30], [236, y2 - 30], [bx + bl / 2, by - 24], [bxB, byB - 34], [cxB, cyB + 34], [536, y1 + 46]];
    const ch = [[12, y2 + 4], [22, sy - 14], S[0], [xe - 8, yp1 + dw * 0.55], [xb1 - 22, y2 - 18], [xb1 + 16, y2 - 16], S[1], S[2], S[3], S[4],
      [xb2 - 16, y1 + 20], [xb2 + 18, y1 + 22], S[5], [z.l - 22, y2 - 30]];
    o.push(h.fleche(lisse(ch), A.cache));
    S.forEach(([x, y], i) => o.push(etape(x, y, i + 1)));
    // les noms des zones
    const nom = (x, y, s) => h.texte(x, y, s, { italique: true, lisere: true });
    o.push(nom(xe / 2, y1 + 10, 'dehors'), nom(338, y1 + 24, 'zone sale'), nom(540, y2 - 12, 'zone propre'));
    return {
      svg: o.join('\n'),
      r: [
        { n: 7, rond: [150, y1 + 46], cible: [xb1 - 2, y1 + 46], texte: 'bâche ouverte d’un seul côté' },
        { n: 8, rond: [258, y2 - 10], cible: [bx - 4, y2 - 12], texte: 'bac à vêtements, sac ouvert dedans' },
      ],
    };
  };

  // ─── 1. Dehors : le costume s'essuie et se rince ─────────────────────────────────────────────
  const v1 = z => {
    const o = [], yF = solY(z), e = E, x0 = 64;
    const T = repere(x0, yF, e);
    o.push(cadre(z, { plafond: false, sol: [[0, z.l, GRIS_DEHORS]] }));
    const base = { x: x0, y: yF, pose: 'debout', echelle: e, mains: { P: 'prise', L: 'ouverte' }, prise: { P: 22 },
      angles: { brasP: 20, avantbrasP: 112, mainP: 140 } };
    const sansBras = F.corps(Object.assign({}, base, { masquer: ['brasP', 'brasL'] }));
    const yGenou = sansBras.articulations.genouP[1] + 40 * e;
    const poncho = sac(sansBras, { marge: 45, lisse: 220, garder: [0, 0, z.l, yGenou] });
    // le linge mouillé pend du poing, devant le poncho, derrière le bras proche
    const linge = g => { const m = g.mainP;
      return [h.path(lisse([[m.x - 4, m.y - 1], [m.x + 4, m.y - 1], [m.x + 6, m.y + 14], [m.x + 7, m.y + 30], [m.x + 3, m.y + 34], [m.x - 1, m.y + 31], [m.x - 4, m.y + 33], [m.x - 6, m.y + 16]], true), W(A.arete)),
        h.ligne(m.x + 1, m.y + 6, m.x + 3, m.y + 30, A.fin), h.ligne(m.x - 3, m.y + 8, m.x - 3, m.y + 28, A.fin)].join('\n'); };
    const pers = F.corps(Object.assign({}, base, { objetP: g => String(poncho) + '\n' + linge(g) }));
    o.push(String(pers));
    // les plis du plastique
    o.push(h.path(lisse([[-60, -1330], [-74, -1000], [-90, -640]].map(T)), A.fin));
    o.push(h.path(lisse([[60, -1200], [66, -980], [70, -640]].map(T)), A.fin));
    // les bottes de caoutchouc, le ruban au haut de la tige
    const ch = pers.pieds.P.cheville, TB = repere(ch[0], yF, e);
    o.push(botte(TB, -14, true), botte(TB, 0), ruban(TB([0, -332]), [0, 1], 38 * e, 140 * e));
    // le ruban au poignet, serré sur la manche
    const pw = pers.poignetP, pc = pers.articulations.coudeP;
    const L = Math.hypot(pw[0] - pc[0], pw[1] - pc[1]), u = [(pw[0] - pc[0]) / L, (pw[1] - pc[1]) / L];
    const cR = [pw[0] - u[0] * 22 * e, pw[1] - u[1] * 22 * e];
    o.push(ruban(cR, u, 40 * e, 82 * e));
    // les lunettes, sur les yeux
    const tc = [pers.tete.x, pers.tete.y], r = 100 * e;
    o.push(lunettes([tc[0] - 0.05 * r, tc[1] + 0.05 * r], r, 0.05, 0));
    // le geste : du haut vers le bas, devant le linge
    const m = pers.mainP, xg = m.x + 12;
    o.push(h.geste(`M${f1(xg)} ${f1(m.y + 2)} L${f1(xg)} ${f1(m.y + 56)}`));
    // le seau d'eau, devant les pieds
    const sx0 = 132, sx1 = 166, sH = 34;
    o.push(h.path(`M${f1(sx0 + 2)} ${f1(yF - sH)} C${f1(sx0 + 4)} ${f1(yF - sH - 26)} ${f1(sx1 - 4)} ${f1(yF - sH - 26)} ${f1(sx1 - 2)} ${f1(yF - sH)}`, A.detail));
    o.push(h.chemin([[sx0 + 4, yF], [sx1 - 4, yF], [sx1, yF - sH], [sx0, yF - sH]], W(A.arete), true));
    o.push(h.path(lisse(onde(sx0 + 3, yF - sH + 7, sx1 - 3, yF - sH + 7, 1.1, 5)), A.detail));
    const yP = T([0, -1150])[1];
    return {
      svg: o.join('\n'),
      r: [
        { n: 1, rond: [170, 112], cible: [149, 141], texte: 'dehors : essuyer et rincer le costume' },
        { n: 9, rond: [154, 18], cible: [tc[0] + 1.18 * r, tc[1] + 0.05 * r], texte: 'lunettes de ski' },
        { n: 10, rond: [16, 96], cible: [poncho.arriere(yP) - 1, yP], texte: 'poncho à capuchon, un sac à ordures' },
        { n: 11, rond: [16, 140], cible: TB([-70, -335]), texte: 'poignets et chevilles rubanés serré' },
        { n: 12, rond: [16, 178], cible: TB([-66, -90]), texte: 'bottes de caoutchouc' },
      ],
    };
  };

  // ─── 2. Entre les bâches : le poncho roulé sur lui-même, l'extérieur en dedans ───────────────
  const v2 = z => {
    const o = [], yF = solY(z), e = E, x0 = 62, R = 11;
    o.push(cadre(z, { baches: [[6, 1]] }));
    let c = null;
    // le rouleau, vu par le bout, dans les mains ; le reste du poncho pend dessous (peint derrière le bras proche)
    const rouleau = g => {
      c = [g.mainP.x + 6, g.mainP.y + 3];
      const spir = [];
      for (let a = 0; a <= 2.6 * 2 * Math.PI; a += 0.25) { const rr = 2 + (R - 2) * a / (2.6 * 2 * Math.PI); spir.push([c[0] + rr * Math.cos(a), c[1] + rr * Math.sin(a)]); }
      const nappe = [[c[0] + R, c[1] + 1], [c[0] + R + 2, c[1] + 40], [c[0] + R + 6, c[1] + 74], [c[0] - 6, c[1] + 80], [c[0] - 8, c[1] + 44], [c[0] - R + 1, c[1] + 4]];
      return [h.path(lisse(nappe, true), W(A.arete)),
        h.path(lisse([[c[0] + 4, c[1] + 14], [c[0] + 6, c[1] + 46], [c[0] + 8, c[1] + 76]]), A.fin),
        h.path(lisse([[c[0] - 3, c[1] + 18], [c[0] - 4, c[1] + 50], [c[0] - 2, c[1] + 78]]), A.fin),
        h.cercle(c[0], c[1], R, W(A.arete)), h.path(lisse(spir), A.detail)].join('\n');
    };
    const pers = F.corps({ x: x0, y: yF, pose: 'debout-bras-tendus', echelle: e, mains: { P: 'prise', L: 'prise' }, prise: { P: 30, L: 30 },
      angles: { tronc: 3, cou: 8, tete: 16, brasP: 34, avantbrasP: 64, mainP: 78, brasL: 30, avantbrasL: 60, mainL: 74 }, objetP: rouleau });
    const ch = pers.pieds.P.cheville, TB = repere(ch[0], yF, e);
    o.push(String(pers), botte(TB, -14, true), botte(TB, 0));
    // le geste : rouler vers soi, par-dessus
    const aR = R + 8;
    o.push(h.geste(`M${f1(c[0] + aR * Math.cos(-0.2))} ${f1(c[1] + aR * Math.sin(-0.2))} A${aR} ${aR} 0 0 0 ${f1(c[0] + aR * Math.cos(-2.3))} ${f1(c[1] + aR * Math.sin(-2.3))}`));
    return { svg: o.join('\n'), r: [{ n: 2, rond: [166, 128], cible: [c[0] + R + 4, c[1] + 56], texte: 'rouler le poncho à l’envers, sans secouer' }] };
  };

  // ─── 3. Dans le sac, au bac ───────────────────────────────────────────────────────────────────
  const v3 = z => {
    const o = [], yF = solY(z), e = E, x0 = 52, R = 9;
    o.push(cadre(z));
    const bx0 = 104, bx1 = 160, bH = 42;
    o.push(bacProfil(bx0, bx1, yF, bH, false));
    let c = null;
    const rouleau = g => {
      c = [g.mainP.x + 5, g.mainP.y + 4];
      const spir = [];
      for (let a = 0; a <= 2.2 * 2 * Math.PI; a += 0.25) { const rr = 1.5 + (R - 2) * a / (2.2 * 2 * Math.PI); spir.push([c[0] + rr * Math.cos(a), c[1] + rr * Math.sin(a)]); }
      return [h.cercle(c[0], c[1], R, W(A.arete)), h.path(lisse(spir), A.detail)].join('\n');
    };
    const pers = F.corps({ x: x0, y: yF, pose: 'debout-penche-lit', echelle: e, mains: { P: 'prise', L: 'prise' }, prise: { P: 30, L: 30 },
      angles: { tronc: 22, cou: 24, tete: 34, brasP: 62, avantbrasP: 74, mainP: 84, brasL: 58, avantbrasL: 70, mainL: 80 }, objetP: rouleau });
    const ch = pers.pieds.P.cheville, TB = repere(ch[0], yF, e);
    o.push(String(pers), botte(TB, -14, true), botte(TB, 0));
    const xg = c[0];
    o.push(h.geste(`M${f1(xg)} ${f1(c[1] + R + 4)} L${f1(xg)} ${f1(yF - bH + 14)}`));
    return { svg: o.join('\n'), r: [{ n: 3, rond: [172, 110], cible: [bx1 + 2, yF - bH - 1], texte: 'dans le sac du bac, puis le fermer' }] };
  };

  // ─── 4. Sortir des bottes, les laisser au bac ─────────────────────────────────────────────────
  const v4 = z => {
    const o = [], yF = solY(z), e = E, x0 = 84;
    o.push(cadre(z));
    o.push(bacProfil(4, 52, yF, 42, true));
    const pers = F.corps({ x: x0, y: yF, pose: 'debout', echelle: e, mains: { P: 'ouverte', L: 'ouverte' }, pieds: 'nu', ancrer: false,
      angles: { tronc: 2, tete: 18, brasP: 16, avantbrasP: 34, mainP: 34, brasL: -8, avantbrasL: 4, mainL: 4, cuisseP: 80, jambeP: -6, piedP: 80 } });
    // la botte du pied loin, déjà vide, derrière ; la botte du pied proche, restée au sol sous le pied levé
    const chL = pers.pieds.L.cheville, chP = pers.pieds.P.cheville;
    const TL = repere(62, yF, e), TP = repere(chP[0] - 10 * e, yF, e);
    o.push(botteVide(TL, 0, true));
    o.push(String(pers));
    o.push(botteVide(TP, 0));
    // le geste : le pied sort par la tige
    const xg = TP([0, 0])[0];
    o.push(h.geste(`M${f1(xg)} ${f1(yF - 14)} L${f1(xg)} ${f1(pers.pieds.P.bas[1] + 1)}`));
    return { svg: o.join('\n'), r: [{ n: 4, rond: [168, 150], cible: TP([196, -44]), texte: 'sortir des bottes, les laisser au bac' }] };
  };

  // ─── 5. Se laver les mains et le visage, avant la deuxième bâche ──────────────────────────────
  const v5 = z => {
    const o = [], yF = solY(z), e = E, x0 = 40;
    o.push(cadre(z, { baches: [[z.l - 6, -1]] }));
    // la caisse et le bassin
    const cx0 = 80, cx1 = 136, cH = 58;
    o.push(h.rect(cx0, yF - cH, cx1 - cx0, cH, W(A.arete)), h.ligne(cx0 + 5, yF - cH + 8, cx1 - 5, yF - cH + 8, A.fin));
    const by = yF - cH;
    o.push(h.chemin([[cx0 + 6, by], [cx1 - 6, by], [cx1 - 1, by - 13], [cx0 + 1, by - 13]], W(A.arete), true));
    o.push(h.path(lisse(onde(cx0 + 3, by - 9, cx1 - 3, by - 9, 1.1, 6)), A.detail));
    const pers = F.corps({ x: x0, y: yF, pose: 'debout-penche-lit', echelle: e, mains: { P: 'plat', L: 'plat' }, pieds: 'nu',
      angles: { tronc: 44, cou: 46, tete: 58, brasP: 52, avantbrasP: 150, mainP: 170, brasL: 48, avantbrasL: 146, mainL: 166 } });
    o.push(String(pers));
    // les gouttes qui retombent dans le bassin
    const m = pers.mainP;
    for (const [dx, dy] of [[4, 14], [9, 24], [2, 30]]) o.push(h.path(`M${f1(m.x + dx)} ${f1(m.y + dy)} q1.6 3 0 4.2 q-1.6 -1.2 0 -4.2 Z`, A.detail));
    return { svg: o.join('\n'), r: [{ n: 5, rond: [158, 76], cible: [cx1 - 1, by - 13], texte: 'se laver les mains et le visage' }] };
  };

  // ─── 6. L'abri : passé la deuxième bâche, le sol reste propre ─────────────────────────────────
  const v6 = z => {
    const o = [], yF = solY(z), e = E, xb = 30;
    o.push(cadre(z, { sol: [[0, xb, GRIS_SALE], [xb, z.l, '#FFFFFF']], baches: [[xb, -1]] }));
    const pers = F.corps({ x: 116, y: yF, pose: 'marche', echelle: e, mains: { P: 'ouverte', L: 'ouverte' }, pieds: 'nu' });
    o.push(String(pers));
    o.push(h.controle(xb + 34, yF - 5, 12));
    return { svg: o.join('\n'), r: [{ n: 6, rond: [xb + 52, yF - 46], cible: [xb + 40, yF - 16], texte: 'passer la bâche : sol sans poussière' }] };
  };

  const cache = {};
  const vue = (nom, titre, fn) => ({
    titre,
    dessin: z => { const k = `${nom} ${z.l} ${z.h}`; return (cache[k] = cache[k] || fn(z)).svg; },
    renvois: z => { const k = `${nom} ${z.l} ${z.h}`; return (cache[k] = cache[k] || fn(z)).r; },
  });

  return {
    ref: '04-40',
    titre: 'Le sas : l’entrée en chicane et l’ordre du retour',
    desc: 'En haut, l’entrée vue de dessus : dehors en gris foncé, avec un seau et un linge ; le mur et la porte ; entre la porte et la deuxième bâche, la zone sale en gris clair ; deux bâches accrochées en chicane, la première fixée au mur du haut, son bord libre contre le mur du bas, la deuxième à l’inverse ; dans la zone sale, un bac avec un sac ouvert et deux bottes contre le mur du bas, une caisse et un bassin contre le mur du haut ; après la deuxième bâche, l’abri en blanc. Un chemin en tireté numéroté de 1 à 6 va du seau au bac, aux bottes, au bassin, puis passe le bord libre de la deuxième bâche. Dessous, six vignettes de profil, dans l’ordre : 1, dehors, une personne en costume de sortie (poncho à capuchon taillé dans un sac à ordures, lunettes de ski, poignets et chevilles rubanés, bottes de caoutchouc) s’essuie de haut en bas avec un linge mouillé, un seau à ses pieds ; 2, entre les bâches, elle roule le poncho sur lui-même, à bout de bras ; 3, penchée, elle met le rouleau dans le sac ouvert du bac ; 4, elle sort le pied de la botte, qui reste au sol près du bac fermé ; 5, en chaussettes, penchée sur un bassin posé sur une caisse, elle se lave le visage ; 6, passée la deuxième bâche, elle marche dans l’abri, et un cercle rouge marque le sol propre juste après la bâche.',
    format: 'pleine',
    disposition: [['plan'], ['v1', 'v2', 'v3'], ['v4', 'v5', 'v6']],
    hauteurs: [0.9, 1, 1],
    vues: {
      plan: vue('plan', 'Vu de dessus : le chemin du retour', plan),
      v1: vue('v1', null, v1), v2: vue('v2', null, v2), v3: vue('v3', null, v3),
      v4: vue('v4', null, v4), v5: vue('v5', null, v5), v6: vue('v6', null, v6),
    },
  };
};
