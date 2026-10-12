// Planche 24-01 — Lever près, lever sans tourner. Chapitre 24, « Le dos est un levier » et §B-8.
// De profil : la même caisse serrée contre le ventre (bon) et tenue à bout de bras (raté).
// Vu de dessus : pour changer de direction, les pieds tournent (bon) ; les pieds plantés et le
// tronc qui tourne sous la charge (raté).
module.exports = (h) => {
  const A = h.a, F = h.formes;
  const W = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const f1 = v => Math.round(v * 10) / 10;
  const pt = p => `${f1(p[0])},${f1(p[1])}`;
  const RAD = Math.PI / 180;
  const tourne = (p, a) => { const c = Math.cos(a * RAD), s = Math.sin(a * RAD); return [p[0] * c - p[1] * s, p[0] * s + p[1] * c]; };
  const milieu = (a, b, t = 0.5) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

  // courbe lisse par les points (Catmull-Rom → Bézier), fermée ou non
  const lisse = (P, ferme) => {
    const N = P.length, g = i => ferme ? P[(i + N) % N] : P[Math.max(0, Math.min(N - 1, i))];
    let d = `M${pt(P[0])}`;
    for (let i = 0; i < (ferme ? N : N - 1); i++) {
      const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C${pt(c1)} ${pt(c2)} ${pt(p2)}`;
    }
    return d + (ferme ? ' Z' : '');
  };

  // ─── De profil ─────────────────────────────────────────────────────────────────────────
  const E = 0.205;                        // unités de vue par mm, la même dans les deux vues de profil
  const mm = v => v * E;
  const sol = (x0, x1, y) => [h.rect(x0, y, x1 - x0, 8, A.hachure('terre', 'aucun')), h.ligne(x0, y, x1, y, A.arete)].join('\n');

  // la caisse de planches, vue de côté : deux montants aux bouts, trois planches à claire-voie
  const caisse = (x, y, l, ht) => {
    const out = [h.rect(x, y, l, ht, W(A.arete))];
    const m = mm(40), jeu = mm(14), pl = (ht - 2 * jeu) / 3;
    for (let i = 0; i < 3; i++) {
      const yy = y + i * (pl + jeu);
      if (i > 0) out.push(h.rect(x + m, yy - jeu, l - 2 * m, jeu, A.plein));
      for (const k of [0.3, 0.62]) out.push(h.ligne(x + m + 4, yy + pl * k, x + l - m - 4, yy + pl * k + (k > 0.5 ? 1 : -1), A.fin));
    }
    out.push(h.ligne(x + m, y, x + m, y + ht, A.detail), h.ligne(x + l - m, y, x + l - m, y + ht, A.detail));
    for (const cx of [x + m / 2, x + l - m / 2]) for (const cy of [y + mm(45), y + ht - mm(45)]) out.push(h.cercle(cx, cy, 0.9, A.plein));
    return out.join('\n');
  };

  // un homme debout qui porte la caisse sur ses paumes, les doigts à plat sous le fond ; la main
  // loin, pareille de l'autre côté de la caisse, est cachée derrière la proche
  const profil = (z, o) => {
    const G = z.h - 12, x0 = z.l * 0.34;
    const bl = mm(300), bh = mm(300);
    const bx = x0 + mm(o.arriere), by = G - mm(o.fond) - bh;
    const gx = x0 + mm(o.paume), gy = by + bh;              // le milieu de la paume, sous le fond
    const prise = d => ({ x: gx + d, y: gy, pose: 'appui', vue: 'profil', cote: 'gauche', angle: 180, bras: 70, trait: 'fort', echelle: E * 1.15, inclinaison: o.inc });
    const pers = F.personnage({ x: x0, y: G, pose: 'debout', echelle: E, penche: o.penche, regard: o.regard,
      prises: { proche: prise(0), loin: prise(-0.8) } });
    const main = [gx, gy + mm(12)];
    // fil à plomb : de la cheville à la hauteur des mains
    const plomb = h.ligne(x0, G - 2, x0, gy, A.fin + ' stroke-dasharray="3 2.5"');
    return { svg: [sol(4, z.l - 4, G), plomb, caisse(bx, by, bl, bh), pers].join('\n'), G, x0, bx, by, bl, bh, main, pers };
  };
  const V = {
    ventre: { arriere: 96, fond: 1040, paume: 225, penche: 2, regard: 6 },
    bras: { arriere: 440, fond: 1300, paume: 600, inc: -6, penche: -5, regard: 4 },
  };

  // ─── Vu de dessus ──────────────────────────────────────────────────────────────────────
  const S = 0.27;                         // unités de vue par mm, les deux vues de dessus
  const ici = (c, p, ang) => { const q = tourne(p, ang); return [c[0] + q[0] * S, c[1] + q[1] * S]; };
  const pol = (c, r, a) => ici(c, [0, -r], a);
  // la botte vue de dessus, pied droit, pointe vers le haut ; repère à la cheville
  const BOTTE = [[0, 68], [30, 60], [44, 30], [45, -30], [53, -110], [50, -165], [32, -205], [6, -220],
    [-20, -214], [-44, -188], [-53, -135], [-42, -70], [-37, -10], [-40, 35], [-26, 62]];
  const botte = (c, ang, droit, at) => {
    const T = p => { const q = tourne([droit ? p[0] : -p[0], p[1]], ang); return [c[0] + q[0] * S, c[1] + q[1] * S]; };
    return [h.path(lisse(BOTTE.map(T), true), at), h.path(lisse([[-39, 18], [0, 24], [42, 18]].map(T), false), A.fin)].join('\n');
  };
  // les deux bottes ; ang : où regardent les pieds (0 = vers le haut, 90 = vers la droite)
  const pieds = (c, ang, at) => [botte(ici(c, [112, 0], ang), ang + 8, true, at), botte(ici(c, [-112, 0], ang), ang - 8, false, at)].join('\n');
  // la caisse, les bras, les épaules et la tête vus de dessus, peints en blanc : ils cachent les
  // pieds ; ce qui dépasse se voit en trait plein, le reste se redessine en tireté par-dessus
  const corps = (c, ang, trait = A.fin) => {
    const T = p => ici(c, p, ang);
    const out = [];
    const bw = 170, b0 = -112, b1 = -412;
    out.push(h.chemin([[-bw, b0], [bw, b0], [bw, b1], [-bw, b1]].map(T), W(trait), true));
    for (const y of [-212, -312]) out.push(h.chemin([[-bw + 30, y], [bw - 30, y]].map(T), A.fin));
    for (const x of [-bw + 30, bw - 30]) out.push(h.chemin([[x, b0], [x, b1]].map(T), A.detail));
    // les avant-bras le long des côtés de la caisse, la main à plat sur le côté
    const BRAS = [[196, -96], [206, -180], [198, -248], [178, -266], [171, -300], [171, -382], [177, -396], [185, -384],
      [197, -300], [224, -262], [250, -180], [262, -96], [240, -40]];
    for (const sg of [-1, 1]) out.push(h.path(lisse(BRAS.map(p => T([sg * p[0], p[1]])), true), W(trait)));
    const ep = [];
    for (let k = 0; k < 36; k++) {
      const t = k / 36 * 2 * Math.PI, cs = Math.cos(t), sn = Math.sin(t), n = 2.6;
      ep.push([238 * Math.sign(cs) * Math.pow(Math.abs(cs), 2 / n), 10 + 118 * Math.sign(sn) * Math.pow(Math.abs(sn), 2 / n)]);
    }
    out.push(h.path(lisse(ep.map(T), true), W(trait)));
    const P = [];
    for (let k = 0; k < 28; k++) { const t = k / 28 * 2 * Math.PI; P.push([74 * Math.cos(t), -8 + 96 * Math.sin(t)]); }
    out.push(h.path(lisse([[-12, -100], [-3, -120], [3, -120], [12, -100]].map(T), false), W(trait)), h.path(lisse(P.map(T), true), W(trait)));
    return out.join('\n');
  };
  const POINTS = A.cache;   // la place des pieds avant le tour
  // un arc fléché autour de c, de a0 à a1 degrés (0 = vers le haut, sens horaire), rayon r en mm
  const arc = (c, r, a0, a1) => {
    const P = []; for (let k = 0; k <= 18; k++) P.push(pol(c, r, a0 + (a1 - a0) * k / 18));
    return h.fleche('M' + P.map(pt).join(' L'));
  };
  const centre = z => [z.l * 0.40, z.h * 0.60];
  const ARC_BON = [285, 18, 72], ARC_RATE = [460, -25, 52];

  return {
    ref: '24-01',
    titre: 'Lever près, lever sans tourner',
    desc: 'De profil, le même homme porte la même caisse sur ses deux paumes, les doigts à plat sous le fond : serrée contre le ventre, puis à bout de bras. Vu de dessus, pour porter la caisse de côté : les pieds tournent avec elle, pas à pas ; le raté garde les pieds plantés et tourne le tronc d’un quart de tour.',
    format: 'pleine',
    disposition: [['ventre', 'bras'], ['pieds', 'tronc']],
    hauteurs: [3, 2],
    vues: {
      ventre: {
        titre: 'Bon : contre le ventre',
        dessin: z => profil(z, V.ventre).svg,
        renvois: z => {
          const p = profil(z, V.ventre);
          return [
            { n: 1, rond: [p.bx + p.bl + 30, p.main[1] + 34], cible: p.main, texte: 'mains à 25 cm des chevilles' },
            { n: 2, rond: [p.x0 - mm(330), p.G - mm(1200)], cible: [p.x0 - mm(112), p.G - mm(1200)], texte: 'dos droit, ni cambré ni rond' },
          ];
        },
      },
      bras: {
        titre: 'Raté : à bout de bras',
        dessin: z => profil(z, V.bras).svg,
        renvois: z => {
          const p = profil(z, V.bras);
          return [
            { n: 3, rond: [Math.min(z.l - 14, p.bx + p.bl + 24), p.main[1] + 40], cible: p.main, texte: 'mains à 50 cm des chevilles' },
          ];
        },
      },
      pieds: {
        titre: 'Bon : les pieds tournent',
        dessin: z => {
          const c = centre(z);
          return [corps(c, 90), pieds(c, 0, POINTS), pieds(c, 90, A.arete), arc(c, ...ARC_BON)].join('\n');
        },
        renvois: z => {
          const c = centre(z);
          return [
            { n: 4, rond: ici(c, [-250, 250], 0), cible: ici(c, [-20, 157], 0), texte: 'les pieds tournent, pas à pas' },
            { n: 5, rond: ici(c, [-330, -60], 0), cible: ici(c, [-150, -150], 0), texte: 'les pieds avant le tour' },
          ];
        },
      },
      tronc: {
        titre: 'Raté : le tronc tourne',
        dessin: z => {
          const c = centre(z);
          return [corps(c, 90), pieds(c, 0, A.arete), arc(c, ...ARC_RATE)].join('\n');
        },
        renvois: z => {
          const c = centre(z);
          return [
            { n: 6, rond: ici(c, [-330, -60], 0), cible: ici(c, [-150, -150], 0), texte: 'les pieds plantés' },
            { n: 7, rond: pol(c, 470, -48), cible: pol(c, 460, -12), texte: 'le tronc tourne d’un quart de tour' },
          ];
        },
      },
    },
  };
};
