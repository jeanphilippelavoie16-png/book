// Planche 04-40 — Le sas au retour : ôter la couche du dehors (chapitre 4, étape 8, étape 16 et
// variante « Sans eau chaude ni savon »).
// Cotes : aucune (le chapitre ne donne aucune mesure du sas, des bâches ni du costume).
// Ce que le chapitre dit et que la planche montre : deux bâches accrochées en chicane dans
// l'entrée, deux portes qui ne s'ouvrent jamais en même temps, un bac à vêtements entre les deux ;
// le costume taillé dans un sac à ordures (poncho fendu, capuchon, poignets et chevilles rubanés
// serré, bottes de caoutchouc, lunettes de ski) qui s'essuie, se rince et ne franchit pas la
// deuxième bâche ; les vêtements retirés lentement, sans secouer, sans toucher au visage, enfermés
// dans un sac fermé ; les bottes qui ne franchissent pas la porte ; mains et visage lavés en rentrant.
module.exports = (h) => {
  const A = h.a;
  const F = h.formes;
  const f1 = v => Math.round(v * 10) / 10;
  const W = at => at.replace('fill="none"', 'fill="#FFFFFF"');

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

  // Repère d'un personnage : millimètres depuis le point au sol, vers la vue.
  const repere = (x0, y0, e) => ([mx, my]) => [x0 + mx * e, y0 + my * e];
  // Le bras proche d'un personnage, repeint seul par-dessus ce qu'on a mis devant le corps
  // (le poncho) : ses deux silhouettes, puis son bras, son avant-bras et sa main.
  const brasProche = pers => {
    const L = String(pers).split('\n');
    const i0 = L.findIndex(l => l.includes('stroke="none"'));
    const sil = L.slice(i0 - 2, i0);
    const d = sil[0].match(/d="([^"]+)"/)[1];
    const j = L.findIndex(l => l.includes(`d="${d}"`) && l.includes('stroke="none"'));
    return [...sil, ...L.slice(j, L.length - 1)].join('\n');
  };
  // Les lunettes de ski sur la tête ronde du pictogramme : c le centre, r le rayon, g la hauteur
  // (fraction du rayon, - vers le haut), t l'inclinaison de la tête (degrés) ; sangle : la bande qui
  // fait le tour de la tête, à la même hauteur.
  const lunettes = (c, r, g, t, sangle) => {
    const o = [], rd = t * Math.PI / 180;
    const u = [Math.cos(rd), Math.sin(rd)], n = [-u[1], u[0]];
    const p = (f, k) => [c[0] + u[0] * f * r + n[0] * (g + k) * r, c[1] + u[1] * f * r + n[1] * (g + k) * r];
    const xf = Math.sqrt(Math.max(0, 1 - g * g));
    if (sangle) o.push(h.path(lisse([p(xf * 0.8, -0.13), p(0, -0.14), p(-xf * 0.98, -0.1), p(-xf * 1.02, 0), p(-xf * 0.98, 0.12), p(0, 0.14), p(xf * 0.8, 0.13)], true), W(A.detail)));
    o.push(h.path(lisse([p(xf - 0.12, -0.26), p(xf + 0.1, -0.27), p(xf + 0.2, -0.14), p(xf + 0.22, 0), p(xf + 0.2, 0.14), p(xf + 0.1, 0.27), p(xf - 0.12, 0.26), p(xf - 0.16, 0)], true), W(A.arete)));
    o.push(h.path(lisse([p(xf + 0.12, -0.18), p(xf + 0.15, 0), p(xf + 0.12, 0.18)]), A.fin));
    return o.join('\n');
  };
  // La botte de caoutchouc, de profil, pointe vers +x (mm, depuis la cheville du pied proche).
  const botte = (T, dx) => {
    const B = [[-62, -330], [-66, -200], [-68, -90], [-66, -26], [-56, -2], [60, -2], [172, -2], [208, -6], [215, -24],
      [205, -48], [170, -68], [110, -88], [72, -120], [56, -175], [58, -250], [60, -330]].map(([x, y]) => T([x + dx, y]));
    return [h.path(lisse(B, true), W(A.arete)),
      h.path(lisse([[-66, -16], [60, -14], [172, -14], [212, -14]].map(([x, y]) => T([x + dx, y]))), A.detail)].join('\n');
  };
  // Une bande de ruban serrée : un anneau vu de côté, deux tours marqués.
  const ruban = (c, u, lg, la) => {
    const v = [-u[1], u[0]];
    const p = (a, b) => [c[0] + u[0] * a + v[0] * b, c[1] + u[1] * a + v[1] * b];
    return [h.chemin([p(-lg / 2, -la / 2), p(lg / 2, -la / 2), p(lg / 2, la / 2), p(-lg / 2, la / 2)], W(A.detail), true),
      h.chemin([p(-lg / 2, -la * 0.1), p(lg / 2, la * 0.2)], A.fin),
      h.chemin([p(-lg / 2, la * 0.3), p(lg / 6, la / 2)], A.fin)].join('\n');
  };

  // ── Le sas vu de dessus : l'ordre du retour ─────────────────────────────────────────
  const plan = z => {
    const o = [];
    const t = 11, y1 = 25, y2 = z.h - 25;              // faces intérieures des murs
    const s = (y2 - y1) / 1200;                          // l'entrée fait 1,2 m de large
    const xe = 104, xi = xe + t;                         // mur extérieur
    const dw = 800 * s, yp = y1 + 6;                     // la porte
    const xb1 = xi + dw + 34, xb2 = xb1 + 1500 * s;      // les deux bâches
    const xf = z.l - 16;                                  // la maison continue
    // murs
    o.push(h.rect(xe, 12, xf - xe, t + 2, A.hachure('bois')));
    o.push(h.rect(xe, y2, xf - xe, t + 2, A.hachure('bois')));
    o.push(h.rect(xe, 12, t, yp - 12, A.hachure('bois')));
    o.push(h.rect(xe, yp + dw, t, y2 + t + 2 - (yp + dw), A.hachure('bois')));
    // coupures à droite : la maison continue
    for (const [ya, yb] of [[12, y1 + 2], [y2, y2 + t + 2]]) {
      o.push(h.rect(xf - 4, ya - 2, 12, yb - ya + 4, A.blanc));
      o.push(h.chemin([[xf - 3, ya - 3], [xf - 3, (ya + yb) / 2 - 2], [xf + 2, (ya + yb) / 2 - 4], [xf - 3, (ya + yb) / 2 + 3], [xf - 3, yb + 3]], A.detail));
    }
    // la porte extérieure, ouverte vers l'intérieur, et son débattement
    o.push(h.rect(xi, yp, dw, 4, W(A.detail)));
    o.push(h.path(`M${f1(xi + dw)} ${f1(yp + 2)} A${f1(dw)} ${f1(dw)} 0 0 1 ${f1(xi)} ${f1(yp + dw)}`, A.fin));
    // les bâches en chicane : bâche 1 fixée au mur du haut, bord libre rabattu sur le mur du bas ;
    // bâche 2 à l'inverse. On passe par le bord libre.
    const bache = (x, haut) => {
      const ya = haut ? y1 : y2, yb = haut ? y2 - 5 : y1 + 5, sens = haut ? -1 : 1;
      const pts = onde(x, ya, x, yb);
      const rabat = [[x + 4, yb - sens * 1], [x + 12, yb - sens * 2.5], [x + 22, yb - sens * 1.5], [x + 30, yb - sens * 3]];
      return [h.path(lisse([...pts, ...rabat]), A.arete),
        h.rect(x - 4, haut ? ya - 1 : ya - 5, 8, 6, A.plein)].join('\n');
    };
    o.push(bache(xb1, true), bache(xb2, false));
    const iChemin = o.length;   // le chemin passe sous le bac et les bottes
    // le bac à vêtements, contre le mur du haut, et le sac fermé dedans
    const bx = xb1 + 26, bl = 600 * s, bh = 400 * s, by = y1 + 5;
    o.push(h.rect(bx, by, bl, bh, W(A.arete) + ' rx="4"'), h.rect(bx + 5, by + 5, bl - 10, bh - 10, A.detail + ' rx="3"'));
    const sc = [bx + bl / 2, by + bh / 2];
    // le sac fermé : son bord rabattu sur le bord du bac, le col froncé en plis vers le nœud
    o.push(h.path(lisse([[bx - 3, by - 2], [bx + bl * 0.3, by - 4], [bx + bl * 0.7, by - 2], [bx + bl + 3, by - 3], [bx + bl + 4, by + bh * 0.5],
      [bx + bl + 3, by + bh + 3], [bx + bl * 0.5, by + bh + 4], [bx - 3, by + bh + 2], [bx - 4, by + bh * 0.5]], true), W(A.detail)));
    o.push(h.rect(bx + 6, by + 6, bl - 12, bh - 12, A.fin + ' rx="3"'));
    for (const [dx, dy] of [[-0.42, -0.36], [0, -0.4], [0.42, -0.36], [0.44, 0.34], [0, 0.4], [-0.44, 0.34], [-0.46, 0], [0.46, 0]])
      o.push(h.path(lisse([[sc[0] + bl * dx, sc[1] + bh * dy], [sc[0] + bl * dx * 0.5 + 2 * Math.sign(dy || 1), sc[1] + bh * dy * 0.45 + 1.5 * Math.sign(dx || 1)], [sc[0] + bl * dx * 0.12, sc[1] + bh * dy * 0.12]]), A.fin));
    o.push(h.cercle(sc[0], sc[1], 3.6, W(A.detail)));
    o.push(h.path(lisse([[sc[0] + 3, sc[1] - 1], [sc[0] + 10, sc[1] - 6], [sc[0] + 16, sc[1] - 5]]), A.detail));
    o.push(h.path(lisse([[sc[0] + 3, sc[1] + 2], [sc[0] + 11, sc[1] + 4], [sc[0] + 15, sc[1] + 9]]), A.detail));
    // les bottes laissées au pied du bac, tiges ouvertes vers le haut
    const bottePlan = (cx, cy) => [
      h.path(lisse([[cx - 7, cy + 20], [cx - 8, cy], [cx - 6, cy - 18], [cx, cy - 25], [cx + 6, cy - 18], [cx + 8, cy], [cx + 7, cy + 20], [cx, cy + 24]], true), W(A.arete)),
      h.ellipse(cx, cy + 11, 5.2, 8, A.detail)].join('\n');
    const bxB = bx + bl * 0.5, byB = by + bh + 38;
    o.push(bottePlan(bxB - 10, byB), bottePlan(bxB + 10, byB));
    // le seau pour rincer, dehors ; le bassin pour les mains et le visage, en entrant
    const seau = [xe - 52, y2 - 40];
    const rs = 150 * s;
    o.push(h.path(`M${f1(seau[0] - rs - 3)} ${f1(seau[1])} A${f1(rs + 3)} ${f1(rs * 1.9)} 0 0 1 ${f1(seau[0] + rs + 3)} ${f1(seau[1])}`, A.detail));
    o.push(h.cercle(seau[0], seau[1], rs, W(A.arete)), h.cercle(seau[0], seau[1], rs - 4, A.detail));
    for (const dy of [-6, 0, 6]) o.push(h.path(lisse(onde(seau[0] - rs * 0.62, seau[1] + dy, seau[0] + rs * 0.62, seau[1] + dy, 1.2, 5)), A.fin));
    o.push(h.cercle(seau[0] - rs - 3, seau[1], 2, A.plein), h.cercle(seau[0] + rs + 3, seau[1], 2, A.plein));
    // le linge sur le bord
    o.push(h.path(lisse([[seau[0] + rs * 0.35, seau[1] + rs * 0.7], [seau[0] + rs * 0.9, seau[1] + rs * 0.2], [seau[0] + rs + 9, seau[1] + rs * 0.55], [seau[0] + rs * 0.8, seau[1] + rs + 6], [seau[0] + rs * 0.3, seau[1] + rs + 2]], true), W(A.detail)));
    o.push(h.ligne(seau[0] + rs * 0.6, seau[1] + rs * 0.6, seau[0] + rs + 2, seau[1] + rs * 0.7, A.fin));
    const bas = [xb2 + 62, y2 - 42];
    o.push(h.ellipse(bas[0], bas[1], 190 * s, 150 * s, W(A.arete)), h.ellipse(bas[0], bas[1], 190 * s - 5, 150 * s - 5, A.hachure('eau', 'detail')));
    // le chemin : dehors, porte, bord libre de la bâche 1, le bac, bord libre de la bâche 2, la maison
    const ch = [[20, y1 + 38], [xe - 14, yp + dw * 0.55], [xb1 - 24, y2 - 22], [xb1 + 14, y2 - 16], [bxB - 2, byB + 10], [bxB + 40, byB - 16],
      [xb2 - 18, y1 + 18], [xb2 + 16, y1 + 20], [xf - 30, y1 + 50]];
    o.splice(iChemin, 0, h.fleche(lisse(ch), A.cache));
    return {
      svg: o.join('\n'),
      r: [
        { n: 1, rond: [seau[0] + 4, y1 + 2], cible: [seau[0], seau[1] - 150 * s], texte: 'dehors : le costume s’essuie et se rince' },
        { n: 2, rond: [xb1 - 40, y2 - 40], cible: [xb1 - 2, y2 - 62], texte: 'première bâche, refermée avant la deuxième' },
        { n: 3, rond: [bx + bl + 24, by + 8], cible: [bx + bl - 3, by + bh * 0.5], texte: 'le costume ôté, fermé dans un sac, au bac' },
        { n: 4, rond: [bxB - 36, byB - 22], cible: [bxB - 16, byB - 6], texte: 'les bottes restent dans le sas' },
        { n: 5, rond: [xb2 + 30, y2 - 14], cible: [xb2 + 2, y2 - 48], texte: 'deuxième bâche : le costume ne la passe pas' },
        { n: 6, rond: [bas[0] + 60, bas[1] - 18], cible: [bas[0] + 190 * s, bas[1] - 6], texte: 'mains et visage lavés en rentrant' },
      ],
    };
  };

  // ── Le costume de sortie, porté ─────────────────────────────────────────────────────
  const costume = z => {
    const o = [];
    const e = (z.h - 30) / 1790, x0 = z.l * 0.44, y0 = z.h - 12;
    const T = repere(x0, y0, e);
    // le bras proche sort de la fente et pend, le poing fermé
    const opts = { x: x0, y: y0, pose: 'debout', echelle: e,
      prises: { proche: { x: x0 + 60 * e, y: y0 - 790 * e, pose: 'prise', vue: 'dos', diametre: 12 * e, echelle: 1.3 * e } } };
    const pers = F.personnage(opts);
    o.push(h.ligne(x0 - 330 * e, y0, x0 + 330 * e, y0, A.arete));
    o.push(pers);
    // bottes et ruban aux chevilles : la jambe du fond d'abord
    o.push(botte(T, -50), ruban(T([-52, -332]), [0, 1], 38 * e, 132 * e));
    o.push(botte(T, 50), ruban(T([48, -332]), [0, 1], 38 * e, 132 * e));
    // le poncho et son capuchon, d'une pièce
    const tc = [pers.tete.x, pers.tete.y], r = pers.tete.r;
    const H = (f, g) => [tc[0] + f * r, tc[1] + g * r];
    const corps = [[168, -1360], [180, -1100], [188, -820], [196, -600], [100, -588], [0, -598], [-100, -586], [-184, -598],
      [-176, -860], [-166, -1100], [-150, -1330]].map(T);
    const capuchon = [H(-1.2, 1.2), H(-1.34, 0.2), H(-1.08, -0.86), H(-0.2, -1.36), H(0.7, -1.2), H(1.12, -0.6), H(1.14, 0.3), H(0.86, 1.06), H(0.5, 1.4)];
    o.push(h.path(lisse([...capuchon, ...corps], true), W(A.arete)));
    // le visage dans l'ouverture du capuchon
    o.push(h.ellipse(tc[0] + 0.26 * r, tc[1] + 0.06 * r, 0.76 * r, 0.9 * r, W(A.detail)));
    // les plis du plastique
    o.push(h.path(lisse([[120, -1380], [134, -1050], [150, -615]].map(T)), A.fin));
    o.push(h.path(lisse([[-80, -1400], [-100, -1040], [-118, -605]].map(T)), A.fin));
    o.push(h.path(lisse([[-130, -1180], [-146, -900], [-160, -615]].map(T)), A.fin));
    o.push(h.path(lisse([H(0.3, -1.2), H(-0.5, -0.9), H(-0.9, 0.1)]), A.fin));
    // la fente du bras
    const ep = pers.epaules.proche;
    o.push(h.path(lisse([[ep[0] - 56 * e, ep[1] + 70 * e], [ep[0] - 44 * e, ep[1] - 30 * e], [ep[0] + 4 * e, ep[1] - 62 * e], [ep[0] + 52 * e, ep[1] - 30 * e], [ep[0] + 60 * e, ep[1] + 70 * e]]), A.detail));
    // le bras qui sort de la fente, le ruban au poignet
    o.push(brasProche(F.personnage(opts)));
    const m = pers.mains.proche, pw = m.poignet, pb = m.bras;
    const L = Math.hypot(pw[0] - pb[0], pw[1] - pb[1]), u = [(pw[0] - pb[0]) / L, (pw[1] - pb[1]) / L];
    o.push(ruban([pw[0] - u[0] * 22 * e, pw[1] - u[1] * 22 * e], u, 40 * e, 80 * e));
    // les lunettes, la sangle sous le capuchon
    o.push(lunettes([tc[0] + 0.26 * r, tc[1]], r * 0.8, -0.05, 0, false));
    const P = T;
    return {
      svg: o.join('\n'),
      r: [
        { n: 7, rond: P([330, -1680]), cible: [tc[0] + 1.25 * r, tc[1] - 0.1 * r], texte: 'lunettes de ski' },
        { n: 8, rond: P([330, -1200]), cible: P([178, -1200]), texte: 'poncho à capuchon taillé dans un sac à ordures' },
        { n: 9, rond: P([-250, -900]), cible: [pw[0] - u[0] * 22 * e - 18 * e, pw[1] - u[1] * 22 * e], texte: 'poignets rubanés serré' },
        { n: 10, rond: P([-250, -420]), cible: P([-110, -335]), texte: 'chevilles rubanées serré' },
        { n: 11, rond: P([330, -250]), cible: P([140, -110]), texte: 'bottes de caoutchouc' },
      ],
    };
  };

  // ── Dans le sas, en coupe : ôter sans secouer ───────────────────────────────────────
  const geste = z => {
    const o = [];
    const yF = z.h - 22;
    const e = (yF - 12) / 1880, x0 = z.l * 0.27;
    const T = repere(x0, yF, e);
    // le plancher
    o.push(h.rect(0, yF, z.l, 10, A.hachure('bois')));
    // les deux bâches, qui descendent du plafond (hors cadre) et traînent un peu au sol
    const bache = (x, sens) => {
      const pts = onde(x, 0, x, yF - 6, 2.4, 12);
      pts.push([x + sens * 5, yF - 1], [x + sens * 16, yF - 1.5]);
      return h.path(lisse(pts), A.arete);
    };
    o.push(bache(16, 1), bache(z.l - 16, -1));
    // le personnage droit, tête relevée, bottes aux pieds, lunettes au front ; les deux mains
    // pincent le costume aux épaules et le tiennent à bout de bras, loin du corps
    const pinP = T([650, -1250]), pinL = T([700, -1290]);
    const ec = 1.3 * e, dP = 30 * ec;
    // le col du costume ramassé dans le poing, une touffe qui dépasse au-dessus, le reste qui pend
    const neck = [[pinP[0] - dP * 0.4, pinP[1] - 32 * ec], [pinP[0] - dP * 0.7, pinP[1] - 60 * ec], [pinP[0] - dP * 0.1, pinP[1] - 50 * ec], [pinP[0] + dP * 0.3, pinP[1] - 72 * ec],
      [pinP[0] + dP * 0.7, pinP[1] - 44 * ec], [pinP[0] + dP * 0.45, pinP[1] - 30 * ec]];
    const cost = [...neck, [pinP[0] + dP * 0.5, pinP[1] + 30 * ec], ...[[780, -1080], [830, -760], [820, -300]].map(T),
      ...[[510, -300], [540, -720], [610, -1090]].map(T), [pinP[0] - dP * 0.5, pinP[1] + 30 * ec]];
    const costSvg = [h.path(lisse(cost, true), W(A.arete)),
      ...[[-0.3, T([560, -360])], [0, T([650, -360])], [0.3, T([750, -380])], [-0.1, T([600, -760])]]
        .map(([f, b]) => { const a = [pinP[0] + f * dP, pinP[1] + 34 * ec]; return h.path(lisse([a, [(a[0] + b[0]) / 2 + 3, (a[1] + b[1]) / 2], b]), A.fin); })].join('\n');
    const pers = F.personnage({ x: x0, y: yF, pose: 'debout', echelle: e, penche: 4, regard: -20,
      prises: { loin: { x: pinL[0], y: pinL[1], pose: 'pince', vue: 'profil', echelle: ec },
        proche: { x: pinP[0], y: pinP[1], pose: 'prise', vue: 'dos', diametre: dP, echelle: ec, objet: costSvg } } });
    const hx = pinP[0], hy = pinP[1];
    o.push(pers);
    o.push(botte(T, -50), botte(T, 50));
    o.push(lunettes([pers.tete.x, pers.tete.y], pers.tete.r, -0.5, -20, true));
    const bacG = 420, bacD = 980, bacH = 350;
    // le bac, et le sac rabattu sur son bord
    const bac = [[bacG + 20, 0], [bacD - 20, 0], [bacD, -bacH], [bacG, -bacH]].map(T);
    o.push(h.chemin(bac, W(A.arete), true));
    o.push(h.path(lisse([[bacG - 14, -bacH - 8], [bacD + 14, -bacH - 8], [bacD + 12, -bacH + 50], [bacD - 60, -bacH + 76], [bacD - 180, -bacH + 58],
      [bacD - 300, -bacH + 80], [bacG + 120, -bacH + 60], [bacG - 12, -bacH + 72]].map(T), true), W(A.detail)));
    for (const x of [bacG + 60, bacG + 210, bacD - 120]) o.push(h.ligne(...T([x, -bacH - 6]), ...T([x + 10, -bacH + 58]), A.fin));
    // lentement, vers le bas
    const fx = T([880, 0])[0];
    o.push(h.fleche(`M${f1(fx)} ${f1(hy + 4)} L${f1(fx)} ${f1(T([0, -bacH - 40])[1])}`, A.arete));
    return {
      svg: o.join('\n'),
      r: [
        { n: 12, rond: [fx + 6, hy - 26], cible: T([640, -700]), texte: 'lentement, sans secouer, loin du visage' },
      ],
    };
  };

  const cache = {};
  const vue = (nom, titre, fn) => ({
    titre,
    dessin: z => { const k = `${nom} ${z.l} ${z.h}`; return (cache[k] = cache[k] || fn(z)).svg; },
    renvois: z => { const k = `${nom} ${z.l} ${z.h}`; return (cache[k] = cache[k] || fn(z)).r; },
  });

  return {
    ref: '04-40',
    titre: 'Le sas au retour : ôter la couche du dehors',
    desc: 'Encadré danger : le costume n’arrête que la poussière. En haut, le sas vu de dessus : l’entrée de la maison, la porte extérieure, deux bâches accrochées en chicane, la première fixée au mur du haut, la deuxième au mur du bas, de sorte qu’on passe chacune par son bord libre, du côté opposé ; le chemin en tireté va du seau de rinçage dehors, par la porte, par le bord libre de la première bâche, jusqu’au bac à vêtements où le costume est fermé dans un sac, laisse les bottes au pied du bac, passe la deuxième bâche et arrive au bassin où l’on se lave mains et visage. En bas à gauche, le costume de sortie porté : poncho fendu taillé dans un sac à ordures avec son capuchon, lunettes de ski, poignets et chevilles rubanés serré, bottes de caoutchouc. En bas à droite, le sas en coupe : une personne debout, tête relevée, entre les deux bâches descend lentement le costume, tenu à bout de bras, dans un sac ouvert rabattu sur le bord du bac.',
    format: 'pleine',
    disposition: [['plan'], ['costume', 'geste']],
    hauteurs: [1.85, 3.4],
    largeurs: [[1], [1, 1.12]],
    vues: {
      plan: vue('plan', 'Le sas, vu de dessus : l’ordre du retour', plan),
      costume: vue('costume', 'Le costume de sortie', costume),
      geste: vue('geste', 'Dans le sas : ôter sans secouer', geste),
    },
    danger: 'Le costume arrête la poussière et rien d’autre : le gamma traverse un sac à ordures comme s’il n’était pas là. Il ne rallonge pas d’une minute le temps qu’on peut passer dehors ; il empêche seulement de rentrer le dépôt dans la maison.',
  };
};
