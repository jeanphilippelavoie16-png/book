// Planche 26-09a — Déplacer un blessé : la bâche roulée sur deux perches, vue de dessus et en
// coupe, et la prise sous les aisselles pour trois mètres sans rien.
// Depuis le 13 octobre au soir, un corps ne se montre que de profil : vu de dessus, le blessé couché
// est retiré (la bâche et les perches restent) ; la coupe garde son corps en forme simple ; la prise
// est refaite avec deux corps simples. Rouge : le porteur qui recule (le geste).
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

  // ─── la prise sous les aisselles : deux corps simples, de profil ───
  // Le blessé assis au sol, les jambes allongées, le tronc renversé contre le porteur, son bras
  // replié sur la poitrine ; les fesses à peine décollées, les talons au sol. Le porteur, accroupi
  // derrière lui et penché, a passé les bras sous ses aisselles et tient à deux mains l'avant-bras
  // replié ; la tête du blessé repose contre son ventre. Les angles ont été cherchés une fois pour
  // que les deux mains du porteur tombent sur l'avant-bras du blessé (mm d'adulte, origine du
  // blessé ; le porteur a ses pieds 690 mm derrière).
  const ANG_B = { tronc: -40, cou: -30, tete: -14, brasP: 38, avantbrasP: 196, mainP: 196, brasL: 34, avantbrasL: 192, mainL: 192,
    cuisseP: 82, jambeP: 82, cuisseL: 82, jambeL: 82 };
  const ANG_P = { tronc: 38, cou: 30, tete: 24, cuisseP: 55, jambeP: -45, piedP: 90, cuisseL: 50, jambeL: -50, piedL: 90,
    brasP: -10, avantbrasP: 52.5, mainP: 52.5, brasL: 0, avantbrasL: 47.5, mainL: 47.5 };
  const geoPrise = z => {
    const F = h.formes, e = Math.min((z.l - 20) / 1850, (z.h - 60) / 1420), G = z.h - 40;
    const X = 12 + 820 * e;                                  // l'origine du blessé (sous ses fesses)
    const B = F.corps({ x: X, y: G, pose: 'assis-sol', echelle: e, trait: 'fort', angles: ANG_B });
    const P = F.corps({ x: X - 690 * e, y: G, pose: 'debout', echelle: e, trait: 'fort', angles: ANG_P, mains: { P: 'prise', L: 'prise' } });
    const mains = [(P.mainP.x + P.mainL.x) / 2, (P.mainP.y + P.mainL.y) / 2];
    const out = [];
    out.push(h.rect(0, G, z.l, 7, h.a.hachure('neige', 'aucun')));
    out.push(h.ligne(0, G, z.l, G, h.a.arete));
    // le porteur derrière, le blessé devant ; puis les mains du porteur, repeintes par-dessus :
    // elles tiennent l'avant-bras replié devant la poitrine du blessé
    out.push(P.svg, B.svg);
    // le bras du porteur, du côté qu'on voit, passe sous l'aisselle du blessé jusqu'à son avant-bras : on repeint
    // par-dessus le blessé une bande qui suit l'avant-bras, du coude à la main (JP, 26 octobre 2026 :
    // « manque des bras au bonhomme debout »)
    const J = P.articulations, mi = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
    const tracé = [mi(J.coudeP, J.poignetP, 0.1), J.poignetP, [P.mainP.x, P.mainP.y]], hw = 52 * e;
    const bande = [];
    for (let i = 0; i < tracé.length - 1; i++) {
      const [a0, a1] = [tracé[i], tracé[i + 1]], d = Math.hypot(a1[0] - a0[0], a1[1] - a0[1]) || 1;
      const nx = -(a1[1] - a0[1]) / d * hw, ny = (a1[0] - a0[0]) / d * hw;
      bande.push(`<polygon points="${[[a0[0] + nx, a0[1] + ny], [a1[0] + nx, a1[1] + ny], [a1[0] - nx, a1[1] - ny], [a0[0] - nx, a0[1] - ny]].map(q => q.map(f).join(',')).join(' ')}"/>`);
    }
    for (const q of tracé.slice(1)) bande.push(`<circle cx="${f(q[0])}" cy="${f(q[1])}" r="${f(hw)}"/>`);
    out.push(`<clipPath id="clip-prise-bras">${bande.join('')}</clipPath>`);
    out.push(`<g clip-path="url(#clip-prise-bras)">\n${P.svg}\n</g>`);
    out.push(`<clipPath id="clip-prise-mains"><circle cx="${f(mains[0])}" cy="${f(mains[1])}" r="${f(70 * e)}"/></clipPath>`);
    out.push(`<g clip-path="url(#clip-prise-mains)">\n${P.svg}\n</g>`);
    // le geste : il recule
    const fl = [f(P.tete.x - 40 * e), f(P.tete.haut[1] - 70 * e)];
    out.push(h.geste(`M${fl[0]},${fl[1]} L${f(fl[0] - 260 * e)},${fl[1]}`));
    return { svg: out.join('\n'), mainP: [f(mains[0] + 4), f(mains[1])], teteB: { x: B.tete.x, y: B.tete.y, r: 100 * e }, fl: [f(fl[0] - 130 * e), fl[1]], e };
  };

  return {
    ref: '26-09a',
    titre: 'Déplacer un blessé : la bâche sur deux perches, la prise sous les aisselles',
    desc: 'Une bâche dont les deux bords sont roulés autour de deux perches, vue de dessus, puis en coupe avec le blessé dessus : la bâche fait plusieurs tours sur chaque perche et creuse sous le corps. En bas, pour trois mètres sans rien, de profil : le porteur, accroupi et penché, passe les bras sous les aisselles du blessé et tient à deux mains son avant-bras replié sur la poitrine, la tête du blessé appuyée contre son ventre ; il recule en le tirant, les fesses à peine décollées, les talons qui traînent au sol.',
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
            { n: 4, rond: [f(g.mainP[0] + 260 * g.e), f(g.mainP[1] - 150 * g.e)], cible: g.mainP, texte: 'les bras passés sous les aisselles' },
            { n: 5, rond: [f(g.teteB.x + 330 * g.e), f(g.teteB.y - 300 * g.e)], cible: [f(g.teteB.x - 0.2 * g.teteB.r), f(g.teteB.y - 0.95 * g.teteB.r)], texte: 'sa tête contre le ventre du porteur' },
            { n: 6, rond: [f(g.fl[0]), f(g.fl[1] + 28)], cible: [f(g.fl[0]), f(g.fl[1] + 2)], texte: 'le porteur recule' },
          ];
        },
      },
    },
  };
};
