// Planche 55-41. Le poste couvert contre un chicot (chapitre 55, §9, « Le poste couvert » et
// « L'appât qu'on ne paie pas »).
// Dessinée le 15 octobre 2026 (inventaire des planches, priorité moyenne).
//
// Tout vient du chapitre : une cabane montée en bouts de bois et en écorce contre un chicot ; une
// seule ouverture ; l'appât au fond, l'engin à l'entrée ; l'appât visuel (bout de métal clair, plume,
// os pâle) suspendu à un fil au-dessus du poste. L'engin dessiné est le collet du même §9 (boucle
// tenue ouverte, ancrée) : le chapitre dit « l'engin », sans choisir.
// Le tronc creux et la souche fendue, qui se trouvent tout faits, ne sont pas dessinés.
// Aucune cote : le chapitre ne donne aucune mesure du poste.
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
  const FIL = 'fill="none" stroke="#1A1A1A" stroke-width="0.7" stroke-linecap="round"';
  // un bout de bois : un quadrilatère effilé de a (bas, plus gros) à b (haut)
  const baton = (a, b, ra = 3.6, rb = 2.6, attrs = W(A.arete)) => {
    const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), n = [-dy / L, dx / L];
    return h.chemin([[a[0] + n[0] * ra, a[1] + n[1] * ra], [b[0] + n[0] * rb, b[1] + n[1] * rb], [b[0] - n[0] * rb, b[1] - n[1] * rb], [a[0] - n[0] * ra, a[1] - n[1] * ra]], attrs, true);
  };
  // une plume : le rachis et la vexille, pendue la pointe en bas
  const plume = (x, y, k = 1) => {
    const o = [];
    const bord = [[0, 0], [5, 6], [7, 18], [5, 32], [1, 42], [-4, 30], [-6, 16], [-4, 5]].map(([a, b]) => [x + a * k, y + b * k]);
    o.push(h.path(lisse(bord, true), W(A.arete)));
    o.push(h.chemin([[x, y - 3 * k], [x + 0.5 * k, y + 40 * k]], A.detail));
    for (const t of [10, 18, 26]) o.push(h.chemin([[x + 0.3 * k, y + t * k], [x + 5 * k, y + (t - 5) * k]], A.fin), h.chemin([[x + 0.3 * k, y + t * k], [x - 5 * k, y + (t - 5) * k]], A.fin));
    return o.join('\n');
  };

  // ─── Vue 1 : de face, l'ouverture vers soi ───────────────────────────────────────────────────
  const geomFace = z => {
    const yG = z.h - 12, cx = z.l * 0.5, rT = 30, hC = Math.min(96, z.h * 0.42);
    return { yG, cx, rT, hC };
  };
  const vueFace = {
    titre: 'De face',
    dessin: z => {
      const { yG, cx, rT, hC } = geomFace(z);
      const o = [];
      o.push(h.chemin([[6, yG], [z.l - 6, yG]], A.arete));
      // le chicot : tronc mort, écorce en lanières, cassé en haut ; un moignon de branche
      const yH = 4;
      o.push(h.chemin([[cx - rT, yG], [cx - rT + 2, yH + 10], [cx - 12, yH], [cx - 2, yH + 12], [cx + 9, yH + 2], [cx + rT - 1, yH + 14], [cx + rT, yG]], W(A.contour), true));
      for (const [x, a, b] of [[-18, 30, 120], [-6, 50, 170], [8, 24, 90], [18, 70, 160], [-12, 140, 200]]) if (b < yG - hC) o.push(h.chemin([[cx + x, a], [cx + x + 1, b]], A.detail));
      // le moignon de branche, à droite, d'où pend l'appât visuel
      o.push(baton([cx + rT - 2, 64], [cx + rT + 46, 50], 4.5, 3, W(A.contour)));
      const xf = cx + rT + 40, yf = 52;
      o.push(h.chemin([[xf, yf], [xf + 1, yf + 58]], FIL));
      o.push(plume(xf + 1, yf + 58, 0.9));
      // la cabane : des bouts de bois plantés serrés en demi-cercle devant le chicot, appuyés dessus
      const yTop = yG - hC;
      const pos = [-88, -76, -64, -52, -40, -30, 30, 40, 52, 64, 76, 88];
      for (const x of pos) {
        const xt = cx + x * 0.42, yt = yTop + Math.abs(x) * 0.18;
        o.push(baton([cx + x, yG], [xt, yt], 3.8, 2.8));
      }
      // l'ouverture : basse, au milieu ; le dedans dans l'ombre
      const porte = [[cx - 24, yG], [cx - 24, yG - 40], [cx - 16, yG - 54], [cx, yG - 58], [cx + 16, yG - 54], [cx + 24, yG - 40], [cx + 24, yG]];
      o.push(h.path(lisse(porte) + ' Z', A.ombre));
      for (const x of [-26, 26]) o.push(baton([cx + x, yG], [cx + x * 0.5, yG - 64], 4.2, 3.2, W(A.contour)));
      o.push(baton([cx - 32, yG - 60], [cx + 32, yG - 60], 3.6, 3.6, W(A.contour)));            // le linteau
      // le toit : des plaques d'écorce, du haut des bâtons jusque sur le chicot
      const plaque = (x0, x1, y0, cour) => {
        const pts = [[x0, y0], [(x0 + x1) / 2, y0 - cour], [x1, y0], [x1 - 4, y0 + 13], [(x0 + x1) / 2, y0 + 13 - cour], [x0 + 4, y0 + 13]];
        return [h.path(lisse(pts.slice(0, 3)) + ` L${f1(pts[3][0])} ${f1(pts[3][1])} ` + lisse(pts.slice(3)).replace(/^M[^C]*/, '') + ' Z', W(A.arete)),
          h.path(lisse([[x0 + 10, y0 + 5], [(x0 + x1) / 2, y0 + 5 - cour], [x1 - 12, y0 + 6]]), A.fin)].join('\n');
      };
      o.push(plaque(cx - 92, cx - 4, yTop + 18, 10), plaque(cx + 4, cx + 92, yTop + 18, 10), plaque(cx - 48, cx + 50, yTop + 2, 12));
      // le collet dans l'ouverture : la boucle tenue ouverte, le fil ancré au bâton de droite
      const rB = 15, cyB = yG - 26;
      o.push(h.cercle(cx, cyB, rB, 'fill="none" stroke="#1A1A1A" stroke-width="1.4"'));
      o.push(h.path(`M${f1(cx + 3)} ${f1(cyB - rB)} Q${f1(cx + 18)} ${f1(cyB - rB - 16)} ${f1(cx + 27)} ${f1(yG - 50)}`, 'fill="none" stroke="#1A1A1A" stroke-width="1.4" stroke-linecap="round"'));
      return o.join('\n');
    },
    renvois: z => {
      const { yG, cx, rT, hC } = geomFace(z);
      const yTop = yG - hC;
      return [
        { n: 1, rond: [cx - rT - 40, 22], cible: [cx - rT + 1, 60], texte: 'un chicot' },
        { n: 2, rond: [18, yG - 40], cible: [cx - 85, yG - 22], texte: 'bouts de bois plantés serrés' },
        { n: 3, rond: [20, yTop - 4], cible: [cx - 74, yTop + 22], texte: 'écorce par-dessus' },
        { n: 4, rond: [cx - 60, yG - 16 + 0], cible: [cx - 14, yG - 10], texte: 'une seule ouverture' },
        { n: 5, rond: [z.l - 16, 60], cible: [cx + rT + 46, 124], texte: 'plume, métal clair, au fil' },
      ];
    },
  };

  // ─── Vue 2 : vue de dessus, le toit enlevé ───────────────────────────────────────────────────
  const vuePlan = {
    titre: 'De dessus, sans le toit',
    dessin: z => {
      const o = [];
      const cx = z.l / 2, cy = 58, rT = 30;
      // le chicot, coupé : l'écorce et le bois
      o.push(h.cercle(cx, cy, rT, A.hachure('bois', 'contour')));
      // les bouts de bois : un fer à cheval de piquets, ouvert devant (en bas)
      const R = 84;
      for (let a = -12; a <= 192; a += 12.5) {
        const r = a * Math.PI / 180;
        const x = cx + R * Math.cos(r), y = cy + 18 + R * Math.sin(r) * 1.05;
        if (Math.abs(a - 90) < 16) continue;                                  // l'ouverture
        o.push(h.cercle(x, y, 4.2, W(A.arete)));
      }
      // les deux piquets de l'ouverture, plus gros
      for (const k of [-1, 1]) o.push(h.cercle(cx + k * 24, cy + 18 + R * 1.03, 5, W(A.contour)));
      // l'appât, au fond, contre le chicot
      o.push(h.path(lisse([[cx - 16, cy + 36], [cx - 4, cy + 32], [cx + 14, cy + 36], [cx + 16, cy + 46], [cx + 2, cy + 50], [cx - 14, cy + 46]], true), W(A.contour)));
      o.push(h.path(lisse([[cx - 8, cy + 40], [cx + 2, cy + 43], [cx + 9, cy + 40]]), A.detail));
      // le collet à l'entrée, vu de dessus : la boucle debout, de chant
      const yE = cy + 18 + R * 1.03;
      o.push(h.ellipse(cx, yE - 6, 15, 2.6, 'fill="none" stroke="#1A1A1A" stroke-width="1.4"'));
      // le chemin de la bête : elle n'entre que par là
      o.push(h.fleche(`M${f1(cx)} ${f1(z.h - 4)} L${f1(cx)} ${f1(yE + 8)}`, A.arete));
      return o.join('\n');
    },
    renvois: z => {
      const cx = z.l / 2, cy = 58, R = 84;
      const yE = cy + 18 + R * 1.03;
      return [
        { n: 6, rond: [z.l - 16, cy + 40], cible: [cx + 16, cy + 42], texte: 'l’appât au fond' },
        { n: 7, rond: [z.l - 16, yE + 12], cible: [cx + 15, yE - 6], texte: 'l’engin à l’entrée' },
      ];
    },
  };

  return {
    ref: '55-41',
    titre: 'Le poste couvert contre un chicot',
    desc: 'Deux vues. De face : un chicot cassé en haut ; devant lui, une petite cabane de bouts de bois plantés serrés en demi-cercle, appuyés contre le tronc, couverte de plaques d’écorce jusque sur le chicot ; une seule ouverture basse au milieu, encadrée de deux bâtons et d’un linteau, l’intérieur dans l’ombre ; un collet tenu ouvert dans l’ouverture ; une plume pendue à un fil sous un moignon de branche du chicot. De dessus, le toit enlevé : le chicot, un fer à cheval de piquets qui part du tronc et s’ouvre devant, l’appât au fond contre le tronc, le collet à l’entrée, et la flèche du seul chemin par où la bête entre.',
    format: 'demi',
    disposition: [['face', 'plan']],
    largeurs: [[1.45, 1]],
    vues: { face: vueFace, plan: vuePlan },
  };
};
