// Planche 60-41. La nasse d'éclisses et la bourolle (chapitre 60, §5 étapes 1 et 2, §9 « La nasse,
// quand il n'y a plus de grillage »).
// Dessinée le 15 octobre 2026 (inventaire des planches, priorité haute).
//
// Tout vient du chapitre. La nasse d'éclisses : éclisses de la largeur d'un doigt, espacées d'un
// travers de doigt, ligaturées à la racine d'épinette sur deux cerceaux de saule ou d'aulne vert ;
// le cône d'entrée tressé à part, en éclisses plus minces, qui dépasse franchement à l'intérieur ;
// le fond fermé par un bouchon tressé, retenu par une cheville. La bourolle de treillis : un cylindre
// d'environ 60 cm sur 25 cm, deux cônes engagés pointe vers l'intérieur, la plus petite ouverture à
// 2,5 cm, une porte de flanc fermée par un crochet de laiton. La bourolle de bouteille : le haut
// coupé et renversé dans le corps. La pose : entrée face au courant, lestée d'une pierre, cordage
// court attaché à une branche visible de la rive.
// Cotes : 60 cm, 25 cm, 2,5 cm (bourolle). La nasse d'éclisses n'a aucune cote au chapitre : ses
// proportions sont celles d'un cylindre deux fois et demie plus long que large, sans chiffre.
// Ce que le chapitre ne dit pas et que la planche dessine en principe : comment le bouchon tient
// (un disque tressé dans le cerceau du fond, la cheville passée en travers derrière lui, au travers
// des éclisses) ; comment le haut de la bouteille tient dans le corps (enfoncé serré, sans attache).
module.exports = (h) => {
  const A = h.a;
  const f1 = v => Math.round(v * 10) / 10;
  const W = at => at.replace('fill="none"', 'fill="#FFFFFF"');
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
  const map = (T, pts) => pts.map(T);
  const LIGNE = 'fill="none" stroke="#1A1A1A" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"';
  // un petit poisson de profil, tourné vers +x (mm), 120 de long
  const POISSON = [[60, 0], [52, -8], [30, -15], [0, -15], [-30, -10], [-46, -4], [-60, -14], [-56, 0], [-60, 14], [-46, 4], [-30, 10], [0, 14], [30, 13], [52, 7]];
  const poisson = (T) => [h.path(lisse(map(T, POISSON), true), W(A.arete)), h.cercle(...T([42, -4]), 1.2, A.plein)].join('\n');

  // ─── Vue 1 : la nasse d'éclisses, coupée dans l'axe ──────────────────────────────────────────
  // mm : x de 0 (l'entrée, premier cerceau) à L (le fond) ; y vers le bas, axe en y = 0
  const L = 820, R = 165, XC = 330, RC = 34;   // longueur, rayon, pointe du cône d'entrée, son ouverture
  const geomNasse = z => {
    const s = Math.min((z.l - 70) / (L + 70), (z.h - 30) / (2 * R + 40));
    const ox = 22, oy = z.h / 2 + 6;
    return { s, T: p => [ox + s * p[0], oy + s * p[1]] };
  };
  const vueNasse = {
    titre: 'La nasse d’éclisses, coupée dans l’axe',
    dessin: z => {
      const { s, T } = geomNasse(z);
      const o = [];
      // le fond de la nasse (la moitié loin) : les éclisses en long, larges d'un doigt, un doigt de jour entre deux
      o.push(h.chemin(map(T, [[0, -R], [L, -R], [L, R], [0, R]]), A.loin, true));
      for (let y = -R + 14; y + 18 < R - 4; y += 36) o.push(h.chemin(map(T, [[0, y], [L, y], [L, y + 18], [0, y + 18]]), W(A.fin), true));
      // le cône d'entrée : tressé à part, en éclisses minces ; sa moitié loin en blanc
      o.push(h.chemin(map(T, [[0, -R], [XC, -RC], [XC, RC], [0, R]]), A.blanc, true));
      for (const k of [-0.7, -0.35, 0, 0.35, 0.7]) o.push(h.chemin(map(T, [[0, k * R], [XC, k * RC]]), A.detail));
      o.push(h.chemin(map(T, [[0, -R], [XC, -RC]]), A.contour), h.chemin(map(T, [[0, R], [XC, RC]]), A.contour));
      o.push(h.ellipse(...T([XC, 0]), 5 * s + 2, RC * s, W(A.arete)));
      // les deux cerceaux : leur moitié loin en trait, coupés en haut et en bas (deux ronds noirs)
      for (const x of [0, L - 40]) o.push(h.chemin(map(T, [[x, -R], [x, R]]), A.arete));
      // les éclisses coupées, en haut et en bas : le contour
      o.push(h.chemin(map(T, [[0, -R], [L, -R]]), A.contour), h.chemin(map(T, [[0, R], [L, R]]), A.contour));
      // les cerceaux coupés : un rond noir en haut et en bas
      for (const x of [0, L - 40]) for (const y of [-R, R]) {
        const [cx, cy] = T([x, y]);
        o.push(h.cercle(cx, cy, 9 * s + 1.5, A.plein));
      }
      // le bouchon tressé dans le cerceau du fond, et la cheville en travers derrière lui
      o.push(h.chemin(map(T, [[L - 34, -R + 6], [L - 6, -R + 6], [L - 6, R - 6], [L - 34, R - 6]]), A.hachure('paille', 'arete'), true));
      o.push(h.chemin(map(T, [[L + 4, -R - 22], [L + 4, R + 22]]), W(A.contour)));
      o.push(h.chemin(map(T, [[L - 2, -R - 22], [L + 10, -R - 22], [L + 10, R + 22], [L - 2, R + 22]]), W(A.arete), true));
      // un poisson entré, et son chemin par le cône
      o.push(h.path(lisse(map(T, [[-60, 60], [80, 40], [XC + 10, 4], [XC + 140, 30], [XC + 230, 90]])), A.cache));
      o.push(poisson(p => T([XC + 300 + p[0] * 0.9, 96 + p[1] * 0.9])));
      return o.join('\n');
    },
    renvois: z => {
      const { s, T } = geomNasse(z);
      return [
        { n: 1, rond: [T([L - 40, 0])[0] - 30, 12], cible: T([L - 40, -R - 9]), texte: 'deux cerceaux de saule vert' },
        { n: 2, rond: [T([180, 0])[0], 12], cible: T([180, -R]), texte: 'éclisses liées à la racine' },
        { n: 3, rond: [T([XC, 0])[0] + 34, z.h - 12], cible: T([XC, RC]), texte: 'le cône dépasse loin dedans' },
        { n: 4, rond: [z.l - 14, 14], cible: T([L + 10, -R - 10]), texte: 'bouchon tressé, tenu d’une cheville' },
      ];
    },
  };

  // ─── Vue 2 : les éclisses sur le cerceau, de près ────────────────────────────────────────────
  const vueLiens = {
    titre: 'Sur le cerceau',
    dessin: z => {
      const o = [];
      const s = Math.min(z.l / 120, z.h / 120);
      const cx = z.l / 2, cy = z.h / 2;
      const T = p => [cx + s * p[0], cy + s * p[1]];
      // le cerceau : une baguette ronde, un peu courbe, en travers
      const haut = [[-60, -6], [0, -9], [60, -6]], bas = [[60, 6], [0, 3], [-60, 6]];
      o.push(h.path(lisse(map(T, haut)) + ' L' + T(bas[0]).map(f1).join(' ') + lisse(map(T, bas)).replace(/^M[^C]*/, ' ') + ' Z', W(A.contour)));
      o.push(h.chemin(map(T, [[-60, -6], [-62, 0], [-60, 6]]), A.detail), h.chemin(map(T, [[60, -6], [62, 0], [60, 6]]), A.detail));
      // trois éclisses, larges d'un doigt (18 mm), espacées d'un doigt
      for (const x of [-38, 0, 38]) {
        const e = [[x - 9, -55], [x + 9, -55], [x + 9, 55], [x - 9, 55]];
        o.push(h.chemin(map(T, e), W(A.arete), true));
        o.push(h.chemin(map(T, [[x - 3, -50], [x - 2, -16]]), A.fin), h.chemin(map(T, [[x + 4, 18], [x + 3, 50]]), A.fin));
        // la racine en croix, par-dessus l'éclisse et sous le cerceau
        for (const d of [-1, 1]) o.push(h.chemin(map(T, [[x - 12, -10 * d], [x + 12, 10 * d]]), 'fill="none" stroke="#1A1A1A" stroke-width="2.4" stroke-linecap="round"'));
      }
      // la cassure des éclisses en haut et en bas
      return o.join('\n');
    },
    renvois: z => {
      const s = Math.min(z.l / 120, z.h / 120), cx = z.l / 2, cy = z.h / 2;
      const T = p => [cx + s * p[0], cy + s * p[1]];
      return [
        { n: 5, rond: [z.l - 14, 14], cible: T([19, -40]), texte: 'un travers de doigt entre deux' },
      ];
    },
  };

  // ─── Vue 3 : la bourolle de treillis, coupée dans l'axe ──────────────────────────────────────
  const BL = 600, BR = 125, BO = 12.5, BC = 230;   // 60 cm, 25 cm, ouverture 2,5 cm, profondeur d'un cône
  const geomBourolle = z => {
    const s = Math.min((z.l - 80) / BL, (z.h - 50) / (2 * BR));
    return { s, T: p => [24 + s * p[0], z.h / 2 - 6 + s * p[1]] };
  };
  const vueBourolle = {
    titre: 'La bourolle de treillis, coupée dans l’axe',
    dessin: z => {
      const { s, T } = geomBourolle(z);
      const o = [];
      o.push(h.chemin(map(T, [[0, -BR], [BL, -BR], [BL, BR], [0, BR]]), A.hachure('grillage', 'aucun'), true));
      // les deux cônes, pointe vers l'intérieur : leur dedans en blanc, leur paroi loin en treillis
      for (const [x0, x1] of [[0, BC], [BL, BL - BC]]) {
        o.push(h.chemin(map(T, [[x0, -BR], [x1, -BO], [x1, BO], [x0, BR]]), A.blanc, true));
        o.push(h.chemin(map(T, [[x0, -BR], [x1, -BO], [x1, BO], [x0, BR]]), A.hachure('grillage', 'aucun'), true));
        o.push(h.chemin(map(T, [[x0, -BR], [x1, -BO]]), A.contour), h.chemin(map(T, [[x0, BR], [x1, BO]]), A.contour));
        o.push(h.ellipse(...T([x1, 0]), 2.5, BO * s, W(A.arete)));
      }
      o.push(h.chemin(map(T, [[0, -BR], [BL, -BR]]), A.contour), h.chemin(map(T, [[0, BR], [BL, BR]]), A.contour));
      o.push(h.chemin(map(T, [[0, -BR], [0, BR]]), A.arete), h.chemin(map(T, [[BL, -BR], [BL, BR]]), A.arete));
      // la porte de flanc, sur le dessus, et son crochet
      const pa = 250, pb = 350;
      o.push(h.chemin(map(T, [[pa, -BR], [pa + 8, -BR - 26], [pb - 8, -BR - 26], [pb, -BR]]), W(A.arete), true));
      o.push(h.chemin(map(T, [[pa + 8, -BR - 26], [pb - 8, -BR - 26]]), A.contour));
      const [kx, ky] = T([pb - 4, -BR - 13]);
      o.push(h.path(`M${f1(kx - 2)} ${f1(ky - 10)} C${f1(kx + 8)} ${f1(ky - 12)} ${f1(kx + 8)} ${f1(ky)} ${f1(kx + 2)} ${f1(ky + 2)} C${f1(kx - 4)} ${f1(ky + 4)} ${f1(kx - 2)} ${f1(ky + 12)} ${f1(kx + 6)} ${f1(ky + 12)}`, 'fill="none" stroke="#1A1A1A" stroke-width="1.4" stroke-linecap="round"'));
      // les cotes
      o.push(h.cote(T([0, 0])[0], T([0, BR])[1] + 18, T([BL, 0])[0], T([0, BR])[1] + 18, '60 cm', { cote: 'dessous' }));
      const xr = T([BL, 0])[0] + 16;
      o.push(h.cote(xr, T([0, -BR])[1], xr, T([0, BR])[1], '25 cm'));
      const xo = T([BC, 0])[0];
      o.push(h.ligne(xo - 3, T([0, -BO])[1], xo - 34, T([0, -BO])[1], A.fin), h.ligne(xo - 3, T([0, BO])[1], xo - 34, T([0, BO])[1], A.fin));
      o.push(h.cote(xo - 30, T([0, -BO])[1], xo - 30, T([0, BO])[1], '2,5 cm', { cote: 'gauche' }));
      return o.join('\n');
    },
    renvois: z => {
      const { s, T } = geomBourolle(z);
      return [
        { n: 6, rond: [T([90, 0])[0], 12], cible: T([90, -BR + 90 * (BR - BO) / BC]), texte: 'deux cônes, pointe en dedans' },
        { n: 7, rond: [T([300, 0])[0] + 60, 12], cible: T([342, -BR - 20]), texte: 'porte de flanc, crochet de laiton' },
      ];
    },
  };

  // ─── Vue 4 : la bourolle de bouteille ────────────────────────────────────────────────────────
  const vueBouteille = {
    titre: 'La bourolle de bouteille',
    dessin: z => {
      const o = [];
      const s = Math.min((z.l - 30) / 320, (z.h - 40) / 120);
      const T = p => [z.l / 2 - 150 * s + s * p[0], z.h / 2 - 4 + s * p[1]];
      // le corps : coupé à gauche, le fond bombé à droite (coupe dans l'axe)
      const corps = [[0, -50], [270, -50], [292, -44], [300, -24], [300, 24], [292, 44], [270, 50], [0, 50]];
      o.push(h.path(lisse(map(T, corps)), W(A.contour)));
      o.push(h.chemin(map(T, [[0, -50], [0, -44]]), A.contour), h.chemin(map(T, [[0, 50], [0, 44]]), A.contour));
      // le haut coupé, renversé dedans : l'épaule contre la coupe, le goulot vers le fond
      const haut = [[-4, -50], [14, -48], [60, -30], [92, -13], [130, -13], [130, 13], [92, 13], [60, 30], [14, 48], [-4, 50]];
      o.push(h.path(lisse(map(T, haut.slice(0, 5))), A.contour), h.path(lisse(map(T, haut.slice(5))), A.contour));
      o.push(h.chemin(map(T, [[130, -13], [130, 13]]), A.arete));
      o.push(h.chemin(map(T, [[118, -15], [118, 15]]), A.detail), h.chemin(map(T, [[110, -15], [110, 15]]), A.detail));
      o.push(poisson(p => T([210 + p[0] * 0.55, 20 + p[1] * 0.55])));
      return o.join('\n');
    },
    renvois: z => {
      const s = Math.min((z.l - 30) / 320, (z.h - 40) / 120);
      const T = p => [z.l / 2 - 150 * s + s * p[0], z.h / 2 - 4 + s * p[1]];
      return [{ n: 8, rond: [20, z.h - 14], cible: T([60, 30]), texte: 'le haut coupé, renversé dedans' }];
    },
  };

  // ─── Vue 5 : posée, vue de dessus ─────────────────────────────────────────────────────────────
  const geomPose = z => {
    const yR = 40, s = 0.24, cx = z.l * 0.58, cy = yR + 70;
    return { yR, s, T: p => [cx + s * (p[0] - 300), cy + s * p[1]], b1: [z.l * 0.47, yR + 22] };
  };
  const vuePose = {
    titre: 'Posée, vue de dessus',
    dessin: z => {
      const { yR, s, T, b1 } = geomPose(z);
      const o = [];
      // la rive : de la terre, le bord en ligne souple
      const bord = [[4, yR + 4], [120, yR - 2], [260, yR + 6], [420, yR - 4], [z.l - 4, yR + 2]];
      o.push(h.path(`M4 4 L${z.l - 4} 4 L${z.l - 4} ${yR + 2} ` + lisse(bord.slice().reverse()).replace(/^M/, 'L') + ' Z', A.hachure('terre', 'aucun')));
      o.push(h.path(lisse(bord), A.contour));
      // l'eau : le courant, de droite à gauche
      for (const [x, y] of [[z.l - 30, yR + 40], [130, z.h - 28], [110, yR + 36]]) {
        o.push(h.fleche(`M${f1(x)} ${f1(y)} L${f1(x - 56)} ${f1(y)}`, A.arete));
      }
      // la branche qui dépasse de la rive : une baguette effilée
      const b0 = [z.l * 0.43, yR - 22];
      const dx = b1[0] - b0[0], dy = b1[1] - b0[1], Lb = Math.hypot(dx, dy), n = [-dy / Lb, dx / Lb];
      o.push(h.chemin([[b0[0] + n[0] * 3.2, b0[1] + n[1] * 3.2], [b1[0] + n[0] * 1.4, b1[1] + n[1] * 1.4], [b1[0] - n[0] * 1.4, b1[1] - n[1] * 1.4], [b0[0] - n[0] * 3.2, b0[1] - n[1] * 3.2]], W(A.contour), true));
      o.push(h.path(lisse([[b0[0] + dx * 0.6, b0[1] + dy * 0.6], [b0[0] + dx * 0.6 + 14, b0[1] + dy * 0.6 - 6], [b0[0] + dx * 0.6 + 24, b0[1] + dy * 0.6 - 2]]), A.arete));
      // la bourolle, couchée dans le courant, entrée vers l'amont (à droite), une pierre dessus
      o.push(h.chemin(map(T, [[0, -BR], [BL, -BR], [BL, BR], [0, BR]]), A.hachure('grillage', 'arete'), true));
      for (const x of [0, BL]) o.push(h.ellipse(...T([x, 0]), 3, BR * s, W(A.arete)));
      o.push(h.ellipse(...T([BL, 0]), 1.6, BO * s * 1.6, A.plein));
      const P = [[230, -80], [300, -104], [372, -86], [392, -14], [356, 64], [270, 76], [214, 22]];
      o.push(h.path(lisse(map(T, P), true), A.hachure('pierre', 'contour')));
      // le cordage court, de la bourolle à la branche
      o.push(h.path(lisse([T([BL - 20, -BR]), [T([BL - 20, -BR])[0] - 20, T([0, -BR])[1] - 24], b1]), LIGNE));
      return o.join('\n');
    },
    renvois: z => {
      const { yR, s, T, b1 } = geomPose(z);
      return [
        { n: 9, rond: [z.l - 14, z.h - 14], cible: T([BL + 3, 30]), texte: 'entrée face au courant' },
        { n: 10, rond: [T([300, 0])[0] - 80, z.h - 14], cible: T([250, 60]), texte: 'lestée d’une pierre' },
        { n: 11, rond: [b1[0] + 80, 16], cible: [b1[0] + 1, b1[1] - 2], texte: 'cordage court, branche visible' },
      ];
    },
  };

  return {
    ref: '60-41',
    titre: 'La nasse d’éclisses et la bourolle',
    desc: 'En haut, la nasse d’éclisses coupée dans l’axe : un cylindre d’éclisses en long, tenues par deux cerceaux ; à l’entrée, un cône tressé à part qui s’enfonce loin à l’intérieur jusqu’à une petite ouverture ; au fond, un bouchon tressé dans le dernier cerceau, retenu par une cheville passée en travers derrière lui ; un poisson entré par le cône et resté dedans. À côté, de près, trois éclisses larges d’un doigt, espacées d’un doigt, liées sur le cerceau par une racine passée en croix. Au milieu, la bourolle de treillis coupée dans l’axe : un cylindre de 60 cm sur 25 cm, deux cônes de treillis entrés par chaque bout, pointe vers l’intérieur, la plus petite ouverture de 2,5 cm ; sur le dessus, une porte de flanc fermée d’un crochet. À côté, la bourolle de bouteille : le haut coupé, renversé et enfoncé dans le corps, le goulot vers le fond, un méné dedans. En bas, la bourolle posée, vue de dessus : couchée au fond près de la rive, l’entrée tournée vers l’amont, face au courant, une pierre posée dessus, et un cordage court attaché à une branche qui dépasse de la rive.',
    format: 'pleine',
    disposition: [['nasse', 'liens'], ['bourolle', 'bouteille'], ['pose']],
    hauteurs: [1.25, 1.1, 0.95],
    largeurs: [[1.75, 0.7], [1.45, 0.9], [1]],
    vues: { nasse: vueNasse, liens: vueLiens, bourolle: vueBourolle, bouteille: vueBouteille, pose: vuePose },
  };
};
