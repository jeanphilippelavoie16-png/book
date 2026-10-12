// Planche 12-05b — la maison de blocs, en coupe (ch. 12, section I-3, points 7 à 9 ; trappe à froid,
// section 3). Même géométrie de voûte que 12-05a. Aucune cote : le chapitre ne donne ni diamètre, ni
// hauteur, ni profondeur de fosse ou de passage ; seules comptent les hauteurs relatives : passage plus
// bas que le plancher, porte plus basse que le banc, trou d'aération près du sommet.

module.exports = (h) => {
  // ─── La voûte : chaînette, en cm. Surface moyenne du mur, demi-largeur a au pied, hauteur hm.
  const a = 161, hm = 180, t = 22;
  let lo = 20, hi = 2000;
  for (let i = 0; i < 80; i++) { const m = (lo + hi) / 2; if (m * (Math.cosh(a / m) - 1) > hm) lo = m; else hi = m; }
  const A = (lo + hi) / 2, U = Math.sinh(a / A), ST = A * U;          // ST : longueur du méridien
  const mid = s => {
    const x = A * Math.asinh(U - s / A), c = Math.cosh(x / A);
    return { x, z: hm - A * (c - 1), nx: Math.tanh(x / A), nz: 1 / c };
  };
  // Un point du mur à l'abscisse s le long du méridien ; c = +1 face extérieure, -1 face intérieure.
  // Le pied du premier rang est posé à plat sur la neige ; les autres joints suivent la normale.
  const brut = (s, c) => { const m = mid(s); return [m.x + c * m.nx * t / 2, m.z + c * m.nz * t / 2]; };
  const surf = (s, c) => {             // sous 12 cm, on passe en douceur du lit plat au joint normal
    if (s >= 12) return brut(s, c);
    const p = brut(12, c), u = Math.max(s, 0) / 12;
    return [a + c * t / 2 + (p[0] - a - c * t / 2) * u, p[1] * u];
  };
  const SK = ST - 28;                     // bord du dernier trou, fermé par la clé
  const pas = (s1, s2, n) => Array.from({ length: n + 1 }, (_, i) => s1 + (s2 - s1) * i / n);
  const bloc = (s1, s2, sg) => {
    const n = Math.max(2, Math.ceil((s2 - s1) / 6));
    const ext = pas(s1, s2, n).map(s => surf(s, 1)), int = pas(s1, s2, n).map(s => surf(s, -1)).reverse();
    return ext.concat(int).map(([x, z]) => [sg * x, z]);
  };
  const courbe = (s1, s2, sg, c, n = 30) => pas(s1, s2, n).map(s => { const [x, z] = surf(s, c); return [sg * x, z]; });
  const cle = (dz = 0) => {
    const ext = courbe(SK, ST, -1, 1, 8).concat(courbe(ST, SK, 1, 1, 8).slice(1));
    const int = courbe(SK, ST, 1, -1, 8).concat(courbe(ST, SK, -1, -1, 8).slice(1));
    return ext.concat(int).map(([x, z]) => [x, z + dz]);
  };
  const neige = h.a.hachure('neige', 'aucun');
  const neigeB = h.a.hachure('neige', 'arete');
  const blanc = at => at.replace('fill="none"', 'fill="#ffffff"');

  const RANGS = [0, 60, 120, 180, SK];    // les rangs, le long du méridien
  const TA = [198, 208];                  // le trou d'aération, dans le dernier rang
  const zAt = (Z, c) => { let l = 0, r = ST; for (let i = 0; i < 40; i++) { const m = (l + r) / 2; if (surf(m, c)[1] < Z) l = m; else r = m; } return surf((l + r) / 2, c)[0]; };
  // Le passage : tranchée de 70 de large jusqu'à -95, blocs debout sur ses bords, toit en arc.
  const PB = 60, PI0 = 85, PE0 = 107;     // haut des blocs de côté, faîte de l'intrados, faîte de l'extrados

  // ─── Vue 1 : la coupe dans l'axe du passage.
  const kG = z => {
    const X0 = -200, X1 = 470, Z0 = -135, Z1 = hm + t / 2 + 16;
    const k = Math.min((z.l - 8) / (X1 - X0), (z.h - 8) / (Z1 - Z0));
    const ox = (z.l - k * (X1 - X0)) / 2 - k * X0, oy = (z.h - k * (Z1 - Z0)) / 2 + k * Z1;
    return { k, P: ([X, Z]) => [ox + k * X, oy - k * Z] };
  };
  // ─── Vue 2 : le passage coupé en travers.
  const pG = z => {
    const X0 = -120, X1 = 120, Z0 = -128, Z1 = PE0 + 6;
    const k = Math.min((z.l - 8) / (X1 - X0), (z.h - 8) / (Z1 - Z0));
    const ox = (z.l - k * (X1 - X0)) / 2 - k * X0, oy = (z.h - k * (Z1 - Z0)) / 2 + k * Z1;
    return { k, P: ([X, Z]) => [ox + k * X, oy - k * Z] };
  };
  const arc = (ri, rise, sg, n = 16) => pas(0, Math.PI / 2, n).map(u => [sg * ri * Math.cos(u), PB + rise * Math.sin(u)]);
  // Courbe lisse (Catmull-Rom) pour le trajet de l'air.
  const lisse = pts => {
    let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(i - 1, 0)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(i + 2, pts.length - 1)];
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C ${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
    }
    return d;
  };
  const tv = (TA[0] + TA[1]) / 2, ventI = surf(tv, -1), ventE = surf(tv, 1), mv = mid(tv);

  return {
    ref: '12-05b',
    titre: 'La maison de blocs, en coupe',
    desc: 'Maison de neige en blocs (iglou) finie, en deux coupes. Dans l’axe du passage : la voûte en arc, chaque rang penché un peu plus que le précédent, la clé au sommet ; le trou d’aération près du sommet ; la fosse devenue plancher ; d’un côté, le banc de neige laissée en place, couvert de sapinage en écailles et de peaux, plus haut que la porte ; la porte creusée sous le premier rang ; le passage couvert, creusé en tranchée plus bas que le plancher, où l’air froid reste ; l’air entre par le passage, au ras du sol, traverse la maison et sort par le trou d’aération. En travers du passage : la tranchée, les blocs posés debout sur ses deux bords et le toit en arc de deux blocs appuyés l’un sur l’autre. Encadré danger : aucune flamme dedans ; le passage et le trou d’aération dégagés après une poudrerie.',
    format: 'pleine',
    disposition: [['coupe'], ['passage']],
    hauteurs: [2.1, 1],
    vues: {
      coupe: {
        titre: 'Dans l’axe du passage',
        dessin: z => {
          const { P } = kG(z), Pp = pts => pts.map(P), out = [];
          // le manteau de neige coupé : banc laissé en place, fosse, marche, passage, rampe
          const profil = [[-200, 0], [-40, 0], [-40, -55], [150, -55], [150, -95], [370, -95], [430, 0], [470, 0]];
          out.push(h.chemin(Pp(profil.concat([[470, -135], [-200, -135]])), neige, true));
          out.push(h.chemin(Pp([[150, 0], [172, 0], [172, -20], [150, -20]]), neige, true));
          out.push(h.chemin(Pp(profil), h.a.contour));
          out.push(h.chemin(Pp([[150, 0], [150, -20], [172, -20], [172, 0]]), h.a.contour));
          // au-delà du plan de coupe : les blocs debout sur le bord de la tranchée, le bord lui-même
          out.push(h.chemin(Pp([[zAt(0, 1), 0], [250, 0], [250, PB], [zAt(PB, 1), PB]]), h.a.detail, true));
          out.push(h.chemin(Pp([[250, 0], [330, 0], [330, PB], [250, PB]]), h.a.detail, true));
          out.push(h.chemin(Pp([[330, 0], [430, 0]]), h.a.detail));
          // le dessous du toit en arc, vu au-delà : un joint, puis le bout du toit
          out.push(h.chemin(Pp([[250, PB], [250, PI0]]), h.a.detail), h.chemin(Pp([[330, PB], [330, PI0]]), h.a.detail));
          // les jambages de la porte, au-delà du plan de coupe
          out.push(h.chemin(Pp([[172, -95], [172, -20]]), h.a.detail), h.chemin(Pp([[150, -55], [150, -20]]), h.a.detail));
          // le toit en arc, coupé à son faîte
          out.push(h.chemin(Pp([[zAt(PI0, 1) - 2, PI0], [330, PI0], [330, PE0], [zAt(PE0, 1) - 2, PE0]]), neigeB, true));
          // la voûte, rang par rang, le trou d'aération et la clé
          for (const sg of [-1, 1]) for (let i = 0; i < 4; i++) {
            const s1 = RANGS[i], s2 = RANGS[i + 1];
            if (sg === 1 && i === 3) out.push(h.chemin(Pp(bloc(s1, TA[0], 1)), neigeB, true), h.chemin(Pp(bloc(TA[1], s2, 1)), neigeB, true));
            else out.push(h.chemin(Pp(bloc(s1, s2, sg)), neigeB, true));
          }
          out.push(h.chemin(Pp(cle()), neigeB, true));
          for (const c of [-1, 1]) {
            out.push(h.chemin(Pp(courbe(0, SK, -1, c)), h.a.contour));
            out.push(h.chemin(Pp(courbe(0, TA[0], 1, c)), h.a.contour), h.chemin(Pp(courbe(TA[1], SK, 1, c, 6)), h.a.contour));
            out.push(h.chemin(Pp(courbe(SK, ST, -1, c, 8).concat(courbe(ST, SK, 1, c, 8))), h.a.contour));
          }
          // le banc : sapinage en écailles, puis les peaux
          const x0 = -zAt(12, -1) + 2;
          for (let X = x0; X < -52; X += 7) out.push(h.chemin(Pp([[X, 1], [X + 12, 8]]), h.a.detail));
          out.push(h.chemin(Pp([[x0, 8], [-40, 8], [-40, 11.5], [x0, 11.5]]), h.a.plein, true));
          // l'air : entre par le passage, au ras du sol, et sort par le trou d'aération
          const air = [[452, 34], [426, 6], [398, -40], [372, -74], [330, -82], [250, -83], [184, -78], [164, -68], [146, -44], [122, -6], [86, 80],
            [ventI[0] - mv.nx * 8, ventI[1] - mv.nz * 8], [ventE[0] + mv.nx * 22, ventE[1] + mv.nz * 22]];
          out.push(h.fleche(lisse(Pp(air)), h.a.cache));
          // l'épaisseur du mur, au pied
          const [c1x, c1y] = P([-172, -12]), [c2x] = P([-150, -12]);
          out.push(h.cote(c1x, c1y, c2x, c1y, '20 à 25 cm', { cote: 'dessous' }));
          return out.join('\n');
        },
        renvois: z => {
          const { P } = kG(z);
          const m3 = mid(150), voute = P([-m3.x, m3.z]);
          const vent = P([mv.x, mv.z]);
          const banc = P([-95, -22]);
          const porte = P([161, -21]);
          const passage = P([290, -95]);
          return [
            { n: 1, rond: [voute[0] - 44, voute[1] - 34], cible: voute, texte: 'chaque rang penche un peu plus' },
            { n: 2, rond: [vent[0] + 70, vent[1] - 16], cible: vent, texte: 'trou d’aération, ouvert toute la nuit' },
            { n: 3, rond: [banc[0] - 30, banc[1] + 40], cible: banc, texte: 'banc plus haut que la porte' },
            { n: 4, rond: [porte[0] + 44, porte[1] - 10], cible: porte, texte: 'porte sous le premier rang' },
            { n: 5, rond: [passage[0] + 10, passage[1] + 26], cible: passage, texte: 'passage plus bas : le froid y reste' },
          ];
        },
      },
      passage: {
        titre: 'Le passage, en travers',
        dessin: z => {
          const { P } = pG(z), Pp = pts => pts.map(P), out = [];
          const profil = [[-120, 0], [-35, 0], [-35, -95], [35, -95], [35, 0], [120, 0]];
          out.push(h.chemin(Pp(profil.concat([[120, -128], [-120, -128]])), neige, true));
          out.push(h.chemin(Pp(profil), h.a.contour));
          // les blocs debout sur les bords de la tranchée
          for (const sg of [-1, 1]) out.push(h.chemin(Pp([[sg * 35, 0], [sg * 57, 0], [sg * 57, PB], [sg * 35, PB]]), neigeB, true));
          // le toit en arc : deux blocs appuyés l'un sur l'autre au faîte
          for (const sg of [-1, 1]) {
            const int = arc(35, PI0 - PB, sg), ext = arc(57, PE0 - PB, sg).reverse();
            out.push(h.chemin(Pp(int.concat(ext)), neigeB, true));
          }
          return out.join('\n');
        },
        renvois: z => {
          const { P } = pG(z);
          const bloc = P([-46, 30]), toit = P([30, PB + 30]);
          return [
            { n: 6, rond: [bloc[0] - 60, bloc[1] + 4], cible: bloc, texte: 'blocs posés le long de la tranchée' },
            { n: 7, rond: [toit[0] + 70, toit[1] + 8], cible: toit, texte: 'toit en arc' },
          ];
        },
      },
    },
    danger: 'Aucune flamme dans une maison de neige, éveillé ou non. Même sans flamme, une poudrerie qui bouche le passage et le trou d’aération vicie l’air du souffle de ceux qui dorment : on les dégage avant de se rendormir, et une pelle reste dedans.',
  };
};
