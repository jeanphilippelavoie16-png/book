// Planche 26-09a — Déplacer un blessé : la bâche roulée sur deux perches, vue de dessus et en
// coupe, et la prise sous les aisselles pour trois mètres sans rien.
module.exports = (h) => {
  const BL = h.a.blanc.split(' ')[0];
  const plein = t => t.replace('fill="none"', BL);
  const f = v => Math.round(v * 10) / 10;
  const pt = p => `${f(p[0])},${f(p[1])}`;

  // Courbe lissée (Catmull-Rom) passant par les points.
  const lisse = (P, ferme) => {
    const n = P.length, g = i => ferme ? P[(i + n) % n] : P[Math.max(0, Math.min(n - 1, i))];
    let d = `M${pt(P[0])}`;
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      d += ` C${pt([p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6])} ${pt([p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6])} ${pt(p2)}`;
    }
    return ferme ? d + ' Z' : d;
  };
  const forme = (P, a) => h.path(lisse(P, true), a);

  // Un membre : articulations et largeurs, contour lissé, bouts arrondis.
  const membre = (P, W, a) => {
    const n = P.length, G = [], D = [];
    for (let i = 0; i < n; i++) {
      const p = P[Math.max(0, i - 1)], q = P[Math.min(n - 1, i + 1)];
      const dx = q[0] - p[0], dy = q[1] - p[1], L = Math.hypot(dx, dy), k = W[i] / 2;
      G.push([P[i][0] - dy / L * k, P[i][1] + dx / L * k]);
      D.push([P[i][0] + dy / L * k, P[i][1] - dx / L * k]);
    }
    const bout = (i, j) => {
      const dx = P[i][0] - P[j][0], dy = P[i][1] - P[j][1], L = Math.hypot(dx, dy);
      return [P[i][0] + dx / L * W[i] * 0.42, P[i][1] + dy / L * W[i] * 0.42];
    };
    return forme([...G, bout(n - 1, n - 2), ...D.reverse(), bout(0, 1)], a);
  };

  // Spirale : la bâche enroulée. Le dernier point est à l'angle `fin`, rayon r1 ;
  // sens = -1 : l'enroulement arrive à `fin` en tournant à rebours.
  const spirale = (cx, cy, r0, r1, tours, fin, sens, a) => {
    const N = Math.round(tours * 40), P = [];
    for (let i = 0; i <= N; i++) {
      const t = i / N, ang = fin - sens * (1 - t) * tours * 2 * Math.PI, r = r0 + (r1 - r0) * t;
      P.push([f(cx + r * Math.cos(ang)), f(cy + r * Math.sin(ang))]);
    }
    return h.chemin(P, a);
  };

  // Un corps couché sur le dos, vu de dessus, tête à gauche : le pictogramme de la règle 8
  // (tête ronde, bandes arrondies d'épaisseur égale), aux proportions de formes.js (mm d'adulte).
  // x0 : sommet du crâne ; H : la longueur dessinée du crâne aux talons (1700 mm).
  const capsule = (x1, y1, x2, y2, r, a) => {
    const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy * r, ny = ux * r;
    return h.path(`M${f(x1 + nx)},${f(y1 + ny)} L${f(x2 + nx)},${f(y2 + ny)} A${f(r)},${f(r)} 0 0 0 ${f(x2 - nx)},${f(y2 - ny)} L${f(x1 - nx)},${f(y1 - ny)} A${f(r)},${f(r)} 0 0 0 ${f(x1 + nx)},${f(y1 + ny)} Z`, a);
  };
  const corpsDessus = (x0, cy, H, a) => {
    const m = v => v * H / 1700, X = v => x0 + m(v), Y = v => cy + m(v), out = [];
    const rB = 46, rJ = 61;
    // les bras le long du corps, rentrés sous le bord du tronc
    for (const s of [-1, 1]) out.push(capsule(X(330), Y(s * 236), X(1010), Y(s * 250), m(rB), a));
    // les jambes, un peu écartées
    for (const s of [-1, 1]) out.push(capsule(X(830), Y(s * 84), X(1640), Y(s * 100), m(rJ), a));
    // le tronc : épaules rondes, un peu plus étroit à la ceinture
    out.push(h.path(lisse([[268, 0], [276, -150], [310, -212], [380, -224], [560, -205], [760, -180], [850, -150], [872, 0],
      [850, 150], [760, 180], [560, 205], [380, 224], [310, 212], [276, 150]].map(([x, y]) => [X(x), Y(y)]), true), a));
    // la tête ronde, un blanc pour le cou
    out.push(h.cercle(X(122), cy, m(122), a));
    return out.join('\n');
  };

  // ─── la prise sous les aisselles : deux pictogrammes de la bibliothèque ───
  // Le blessé assis au sol, le tronc renversé contre le porteur ; le porteur à demi accroupi
  // derrière lui, les bras passés sous ses aisselles, les mains croisées devant sa poitrine.
  const geoPrise = z => {
    const F = h.formes, e = Math.min(z.l / 2500, z.h / 2000), G = z.h - 40, rad = Math.PI / 180;
    // Le blessé est assis, soulevé par le haut du corps : les fesses décollent, les talons restent
    // au sol. On le dessine assis puis on le bascule autour du talon (rotation R, angle A).
    const A = 16, xh = z.l * 0.42, piv = [xh + 880 * e, G];
    const ca = Math.cos(A * rad), sa = Math.sin(A * rad);
    const R = p => [f(piv[0] + (p[0] - piv[0]) * ca - (p[1] - piv[1]) * sa), f(piv[1] + (p[0] - piv[0]) * sa + (p[1] - piv[1]) * ca)];
    const Ri = p => [piv[0] + (p[0] - piv[0]) * ca + (p[1] - piv[1]) * sa, piv[1] - (p[0] - piv[0]) * sa + (p[1] - piv[1]) * ca];
    const mat = `matrix(${[ca, sa, -sa, ca, piv[0] - piv[0] * ca + piv[1] * sa, piv[1] - piv[0] * sa - piv[1] * ca].map(v => Math.round(v * 10000) / 10000).join(' ')})`;
    const opt = { x: xh, y: G, pose: 'assis-sol', echelle: e, penche: -24, regard: -4 };
    const B0 = F.personnage(opt);
    const S0 = B0.epaules.proche, S = R(S0);
    // son bras proche ballant, tendu vers le sol (dans la vue), à côté de la cuisse
    const da = 18 * rad, dB = [Math.sin(da), Math.cos(da)];
    const Wv = [S[0] + dB[0] * 562 * e, S[1] + dB[1] * 562 * e];
    const W0 = Ri(Wv);
    const B = F.personnage(Object.assign({}, opt, { mains: { proche: W0, loin: [W0[0] - 14 * e, W0[1] - 10 * e] } }));
    const Bsvg = `<g transform="${mat}">\n${B}\n</g>`;
    // les mains du porteur, devant la poitrine du blessé, sous les aisselles
    const T = -24 + A, Fw = [Math.cos(T * rad), Math.sin(T * rad)], U = [Math.sin(T * rad), -Math.cos(T * rad)];
    const mainP = [f(S[0] + e * (Fw[0] * 300 - U[0] * 250)), f(S[1] + e * (Fw[1] * 300 - U[1] * 250))];
    const mainL = [f(mainP[0] - 10 * e), f(mainP[1] + 6 * e)];
    const P = F.personnage({ x: xh - 400 * e, y: G, pose: 'tire', penche: 34, regard: 16, echelle: e, mains: { proche: mainP, loin: mainL } });
    const out = [];
    out.push(h.rect(0, G, z.l, 7, h.a.hachure('neige', 'aucun')));
    out.push(h.ligne(0, G, z.l, G, h.a.arete));
    // le porteur derrière, le blessé devant ; puis repeints par-dessus : l'avant-bras du porteur,
    // qui passe devant la poitrine du blessé, et le bras proche du blessé, qui pend par-dessus
    out.push(P, Bsvg);
    const bande = (A1, A2, w) => { const d = [A2[0] - A1[0], A2[1] - A1[1]], L = Math.hypot(d[0], d[1]), u = [d[0] / L, d[1] / L], n = [-u[1] * w, u[0] * w];
      const a = [A1[0] - u[0] * w, A1[1] - u[1] * w], b = [A2[0] + u[0] * w, A2[1] + u[1] * w];
      return [[a[0] + n[0], a[1] + n[1]], [b[0] + n[0], b[1] + n[1]], [b[0] - n[0], b[1] - n[1]], [a[0] - n[0], a[1] - n[1]]].map(pt).join(' '); };
    const tip = [S[0] + dB[0] * 760 * e, S[1] + dB[1] * 760 * e];
    // le bras proche du porteur passe à côté de la tête du blessé, de notre côté, et entre dans
    // l'aisselle : on retrouve son coude (deux os de 300 et 255 mm, le coude vers l'arrière)
    const tcv = R([B.tete.x, B.tete.y]);
    const Sp = P.epaules.proche, Wp = P.poignets.proche, Mp = Array.isArray(P.mains.proche) ? P.mains.proche : [P.mains.proche.x, P.mains.proche.y];
    const l1 = 300 * e, l2 = 255 * e, dx = Wp[0] - Sp[0], dy = Wp[1] - Sp[1], d = Math.min(Math.hypot(dx, dy), l1 + l2 - 0.01);
    const aa = (l1 * l1 - l2 * l2 + d * d) / (2 * d), hh = Math.sqrt(Math.max(0, l1 * l1 - aa * aa));
    const ux = dx / Math.hypot(dx, dy), uy = dy / Math.hypot(dx, dy);
    const E1 = [Sp[0] + ux * aa - uy * hh, Sp[1] + uy * aa + ux * hh], E2 = [Sp[0] + ux * aa + uy * hh, Sp[1] + uy * aa - ux * hh];
    const Ep = E1[0] < E2[0] ? E1 : E2;
    const S40 = [Sp[0] + (Ep[0] - Sp[0]) * 0.45, Sp[1] + (Ep[1] - Sp[1]) * 0.45];
    out.push(`<defs><clipPath id="clip-prise-av"><polygon points="${bande(S40, Ep, 56 * e)}"/><polygon points="${bande(Ep, Mp, 56 * e)}"/></clipPath>` +
      `<clipPath id="clip-prise-tete"><circle cx="${tcv[0]}" cy="${tcv[1]}" r="${f(B.tete.r + 2.5)}"/></clipPath>` +
      `<clipPath id="clip-prise-bras"><polygon points="${bande([S[0] - dB[0] * 10 * e, S[1] - dB[1] * 10 * e], tip, 52 * e)}"/></clipPath></defs>`);
    out.push(`<g clip-path="url(#clip-prise-av)">\n${P}\n</g>`);
    out.push(`<g clip-path="url(#clip-prise-tete)">\n${Bsvg}\n</g>`);
    out.push(`<g clip-path="url(#clip-prise-bras)">\n${Bsvg}\n</g>`);
    // il recule
    const fl = [f(Math.max(P.tete.x - 20, 80)), f(P.tete.y - 34)];
    out.push(h.fleche(`M${fl[0]},${fl[1]} L${f(fl[0] - 50)},${fl[1]}`));
    const tc = R([B.tete.x, B.tete.y]);
    return { svg: out.join('\n'), mainP: [f(Mp[0] - 6), f(Mp[1])], teteB: { x: tc[0], y: tc[1], r: B.tete.r }, fl: [f(fl[0] - 25), fl[1]] };
  };

  return {
    ref: '26-09a',
    titre: 'Déplacer un blessé : la bâche sur deux perches, la prise sous les aisselles',
    desc: 'Une bâche dont les deux bords sont roulés autour de deux perches, vue de dessus avec le blessé couché dessus, puis en coupe : la bâche fait plusieurs tours sur chaque perche et creuse sous le corps. En bas, pour trois mètres sans rien : le porteur, penché, passe les bras sous les aisselles du blessé, la tête du blessé appuyée contre son ventre, et recule en le tirant, les fesses à peine décollées, les talons qui traînent au sol.',
    format: 'pleine',
    disposition: [['dessus'], ['coupe', 'prise']],
    hauteurs: [0.85, 1],
    largeurs: [[1], [2, 3]],
    vues: {
      dessus: {
        titre: 'Vu de dessus',
        dessin: z => {
          const sc = z.l / 600, cy = Math.round(z.h / 2), e = 78 * sc, xa = 96 * sc, xb = z.l - 96 * sc, rr = Math.max(7, 10 * sc);
          const out = [];
          // la bâche entre les deux roulés, œillets le long des bouts
          out.push(h.rect(xa, cy - e + rr - 1, xb - xa, 2 * (e - rr) + 2, plein(h.a.arete)));
          for (const x of [xa + 5, xb - 5]) out.push(h.ligne(x, cy - e + rr, x, cy + e - rr, h.a.fin));
          for (const x of [xa + 10, xb - 10]) for (const y of [-48, -16, 16, 48]) out.push(h.cercle(x, cy + y * sc, 2, h.a.detail));
          const S = v => f(v * sc);
          // le blessé couché au creux
          out.push(corpsDessus(xa + S(26), cy, xb - xa - S(60), plein(h.a.arete)));
          // les deux perches et leur roulé
          const pw = Math.max(3.6, 5 * sc);
          for (const s of [-1, 1]) {
            const y = cy + s * e;
            out.push(h.path(`M16,${f(y - pw)} L${z.l - 16},${f(y - pw * 0.8)} Q${z.l - 11},${f(y)} ${z.l - 16},${f(y + pw * 0.8)} L16,${f(y + pw)} Q10,${f(y)} 16,${f(y - pw)} Z`, plein(h.a.contour)));
            out.push(h.ligne(24, f(y - 1), 50, f(y - 1.3), h.a.detail));
            out.push(h.ligne(z.l - 48, f(y + 1), z.l - 24, f(y + 1.3), h.a.detail));
            out.push(h.ellipse(f(xa - 26), f(y + 1), 2.6, 1.4, h.a.detail));
            out.push(h.ellipse(f(xb + 22), f(y - 1), 2.6, 1.4, h.a.detail));
            out.push(h.path(`M${f(xa - 2)},${f(y - rr)} L${f(xb + 2)},${f(y - rr)} Q${f(xb + 6)},${f(y)} ${f(xb + 2)},${f(y + rr)} L${f(xa - 2)},${f(y + rr)} Q${f(xa - 6)},${f(y)} ${f(xa - 2)},${f(y - rr)} Z`, plein(h.a.contour)));
            out.push(h.ligne(f(xa + 2), f(y - s * rr * 0.45), f(xb - 2), f(y - s * rr * 0.45), h.a.detail));
          }
          return out.join('\n');
        },
        renvois: z => {
          const sc = z.l / 600, cy = Math.round(z.h / 2), e = 78 * sc;
          return [
            { n: 1, rond: [30, f(cy - e - 34)], cible: [36, f(cy - e + 2)], texte: 'perche, qui dépasse aux deux bouts' },
            { n: 2, rond: [z.l - 70, f(cy + e + 36)], cible: [z.l - 110, f(cy + e + 5)], texte: 'bord de la bâche roulé sur la perche' },
          ];
        },
      },
      coupe: {
        titre: 'En coupe',
        dessin: z => {
          const cx = Math.round(z.l / 2), cy = Math.round(z.h / 2 - 25), e = 76, rp = 8, r0 = 9.6, r1 = 18.4;
          const out = [];
          // la bâche qui creuse, d'un roulé à l'autre : elle quitte chaque roulé par son côté
          // intérieur, dans le fil de l'enroulement, tombe droit le long du bras et passe sous le corps
          const xs = -e + r1;
          const S = [[xs, 0], [xs, 26], [xs - 0.2, 52], [-54.2, 71.3], [-45, 74.6], [-26, 77.8], [0, 80.2]];
          const T = [...S, ...S.slice(0, -1).reverse().map(([x, y]) => [-x, y])].map(([x, y]) => [cx + x, cy + y]);
          out.push(h.path(lisse(T, false), h.a.arete));
          // le blessé en coupe : le tronc et les deux bras le long
          const cb = cy + 55;
          out.push(forme([[-44, 0], [-40, -14], [-26, -22], [0, -24], [26, -22], [40, -14], [44, 0], [38, 15], [20, 22], [0, 23], [-20, 22], [-38, 15]]
            .map(([x, y]) => [cx + x, cb + y]), plein(h.a.arete)));
          for (const s of [-1, 1]) out.push(h.ellipse(cx + s * 46.5, cb + 8, 9, 10, plein(h.a.arete)));
          // perches en bout et bâche enroulée dessus
          for (const s of [-1, 1]) {
            out.push(h.cercle(cx + s * e, cy, rp, h.a.hachure('bois', 'contour')));
            out.push(spirale(cx + s * e, cy, r0, r1, 2.5, s < 0 ? 0 : Math.PI, -s, h.a.arete));
          }
          return out.join('\n');
        },
        renvois: z => {
          const cx = Math.round(z.l / 2), cy = Math.round(z.h / 2 - 25), e = 76;
          return [
            { n: 3, rond: [cx, cy - 26], cible: [cx - e + 12, cy - 13], texte: 'plusieurs tours serrés sur la perche' },
          ];
        },
      },
      prise: {
        titre: 'Pour trois mètres, sans rien',
        dessin: z => geoPrise(z).svg,
        renvois: z => {
          const g = geoPrise(z);
          return [
            { n: 4, rond: [z.l - 40, f(g.mainP[1] - 70)], cible: g.mainP, texte: 'les bras passés sous les aisselles' },
            { n: 5, rond: [f(g.teteB.x - 20), f(g.teteB.y - 95)], cible: [f(g.teteB.x), f(g.teteB.y - g.teteB.r + 3)], texte: 'sa tête contre le ventre du porteur' },
            { n: 6, rond: [f(g.fl[0] - 14), f(g.fl[1] + 26)], cible: [f(g.fl[0] - 14), f(g.fl[1])], texte: 'le porteur recule' },
          ];
        },
      },
    },
  };
};
