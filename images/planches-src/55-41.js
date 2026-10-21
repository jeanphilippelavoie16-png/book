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

  // ─── Les mesures du poste (mm, en proportion seulement : rien n'est coté sur la planche) ────────
  const RT = 150, ZT = 560;                 // le chicot : rayon, centre (profondeur depuis l'entrée)
  const ZF = ZT - RT;                        // la face du chicot, au fond du poste
  const XM = 108, DM = 36;                   // les deux murs : axe des piquets, diamètre des piquets
  const HM = Z => 300 + Z * 0.1;             // hauteur des piquets, qui monte vers le chicot
  const ZP = [20, 68, 116, 164, 212, 260, 308, 356, 400];
  const PLAQUES = [[-40, 170], [140, 320], [290, ZF + 30]];
  const yToit = Z => HM(Z) + 18;             // le dessous des plaques
  const HT = 660;                            // hauteur dessinée du chicot
  const geom = z => {
    const s = Math.min((z.h - 14) / (HT + 30), z.l / 780);
    return { s, yG: z.h - 10 };
  };

  // le chicot de côté ou de face : x0, x1 en unités de vue
  const chicot = (x0, x1, yG, s) => {
    const yH = yG - s * HT;
    const haut = [[x0, yG], [x0, yH + 14], [x0 + (x1 - x0) * 0.25, yH], [x0 + (x1 - x0) * 0.42, yH + 18], [x0 + (x1 - x0) * 0.7, yH + 4], [x1, yH + 16], [x1, yG]];
    const o = [h.chemin(haut, W(A.contour), true)];
    o.push(h.chemin([[x1 - (x1 - x0) * 0.2, yH + 10], [x1, yH + 16], [x1, yG], [x1 - (x1 - x0) * 0.2, yG]], A.ombre, true));
    o.push(h.chemin(haut, A.contour));
    for (const [f, a, b] of [[0.18, 0.12, 0.45], [0.36, 0.3, 0.7], [0.55, 0.08, 0.35], [0.62, 0.5, 0.85]]) {
      o.push(h.chemin([[x0 + f * (x1 - x0), yH + 30 + a * (yG - yH - 40)], [x0 + f * (x1 - x0) + 1, yH + 30 + b * (yG - yH - 40)]], A.detail));
    }
    return o.join('\n');
  };
  const appat = (x, yG, s) => h.path(lisse([[x - 40 * s, yG], [x - 30 * s, yG - 24 * s], [x + 12 * s, yG - 30 * s], [x + 40 * s, yG - 12 * s], [x + 32 * s, yG]], true), W(A.arete));

  // ─── Vue 1 : de côté, le mur de devant enlevé ────────────────────────────────────────────────
  const vueCote = {
    titre: 'De côté, sans le mur de devant',
    dessin: z => {
      const { s, yG } = geom(z);
      const ox = 30 + 40 * s;
      const P = ([Z, Y]) => [ox + s * Z, yG - s * Y];
      const o = [];
      o.push(h.chemin([[6, yG], [z.l - 6, yG]], A.arete));
      o.push(chicot(P([ZF, 0])[0], P([ZF + 2 * RT, 0])[0], yG, s));
      // les piquets du mur du fond, en gris derrière
      for (const Z of ZP) {
        const a = P([Z - DM / 2, 0]), b = P([Z + DM / 2, HM(Z)]);
        o.push(h.rect(a[0], b[1], b[0] - a[0], a[1] - b[1], A.loin), h.rect(a[0], b[1], b[0] - a[0], a[1] - b[1], A.fin));
      }
      // l'appât, au fond, contre le chicot
      o.push(appat(P([ZF - 40, 0])[0], yG, s));
      // le collet à l'entrée : la boucle debout, vue de chant
      const c = P([10, 120]);
      o.push(h.ellipse(c[0], c[1], 3.5, 55 * s, 'fill="none" stroke="#1A1A1A" stroke-width="1.4"'));
      // le toit : trois plaques d'écorce en bardeaux, de l'avant vers le chicot
      for (const [z0, z1] of PLAQUES) {
        const q = [[z0, yToit(z0)], [z1, yToit(z1)], [z1, yToit(z1) + 16], [z0, yToit(z0) + 16]].map(P);
        o.push(h.path(`M${f1(q[0][0])} ${f1(q[0][1])} L${f1(q[1][0])} ${f1(q[1][1])} L${f1(q[2][0])} ${f1(q[2][1])} L${f1(q[3][0])} ${f1(q[3][1])} Z`, W(A.contour)));
        o.push(h.chemin([P([z0 + 20, yToit(z0) + 10]), P([z1 - 20, yToit(z1) + 10])], A.fin));
      }
      // le moignon de branche au-dessus du poste, la plume pendue au fil
      const m0 = P([ZF + 30, 590]), m1 = P([240, 600]);
      o.push(baton(m0, m1, 5, 3.4, W(A.contour)));
      const xf = m1[0] + 8, yf = m1[1] + 1;
      o.push(h.chemin([[xf, yf], [xf, P([0, 450])[1]]], FIL));
      o.push(plume(xf, P([0, 450])[1], 0.95));
      return o.join('\n');
    },
    renvois: z => {
      const { s, yG } = geom(z);
      const ox = 30 + 40 * s;
      const P = ([Z, Y]) => [ox + s * Z, yG - s * Y];
      return [
        { n: 1, rond: [z.l - 14, P([0, 520])[1]], cible: P([ZF + 2 * RT, 500]), texte: 'un chicot' },
        { n: 2, rond: [16, P([0, 420])[1]], cible: P([-40, yToit(-40) + 16]), texte: 'écorce par-dessus, en bardeaux' },
        { n: 3, rond: [P([186, 0])[0], Math.min(z.h - 12, P([0, -30])[1])], cible: P([164, 60]), texte: 'bouts de bois plantés serrés' },
        { n: 4, rond: [P([ZF - 120, 0])[0], P([0, 190])[1]], cible: P([ZF - 50, 20]), texte: 'l’appât au fond' },
        { n: 5, rond: [P([90, 0])[0], 14], cible: [P([240, 0])[0] + 8, P([0, 470])[1]], texte: 'plume ou métal clair, au fil' },
      ];
    },
  };

  // ─── Vue 2 : de face, l'ouverture ────────────────────────────────────────────────────────────
  const vueFace = {
    titre: 'De face',
    dessin: z => {
      const { s, yG } = geom(z);
      const ox = z.l / 2;
      const P = ([X, Y]) => [ox + s * X, yG - s * Y];
      const o = [];
      o.push(h.chemin([[6, yG], [z.l - 6, yG]], A.arete));
      o.push(chicot(P([-RT, 0])[0], P([RT, 0])[0], yG, s));
      // le dedans du poste, dans l'ombre : la face du chicot au fond
      const yT = yToit(0);
      const dedans = [P([-XM + DM / 2, 0]), P([-XM + DM / 2, yT]), P([XM - DM / 2, yT]), P([XM - DM / 2, 0])];
      o.push(h.chemin(dedans, A.ombre, true));
      o.push(appat(P([0, 0])[0], yG, s * 0.8));
      // les deux murs vus du bout : le premier piquet, et ceux de derrière qui débordent un peu
      for (const k of [-1, 1]) {
        for (const [dx, Z] of [[16, 260], [-8, 116], [0, 20]]) {
          const X = k * (XM + dx), a = P([X - DM / 2, 0]), b = P([X + DM / 2, HM(Z)]);
          o.push(h.rect(a[0], b[1], b[0] - a[0], a[1] - b[1], W(Z === 20 ? A.contour : A.arete)));
        }
      }
      // le bout des plaques d'écorce : un arc, l'écorce qui roule un peu sur les bords
      const arc = [[-190, yT + 4], [-150, yT + 22], [0, yT + 30], [150, yT + 22], [190, yT + 4], [184, yT - 6], [150, yT + 10], [0, yT + 16], [-150, yT + 10], [-184, yT - 6]].map(P);
      o.push(h.path(lisse(arc, true), W(A.contour)));
      // le collet : la boucle debout dans l'ouverture, le fil ancré au piquet de droite,
      // une brindille fendue plantée à gauche qui la tient ouverte
      const c = P([0, 120]), r = 55 * s;
      o.push(baton(P([-62, 0]), P([-48, 108]), 1.6, 1.1));
      o.push(h.cercle(c[0], c[1], r, 'fill="none" stroke="#1A1A1A" stroke-width="1.4"'));
      const pq = P([XM - DM / 2, 230]);
      o.push(h.path(`M${f1(c[0] + r * 0.35)} ${f1(c[1] - r * 0.94)} Q${f1(c[0] + r * 0.9)} ${f1(pq[1] - 4)} ${f1(pq[0])} ${f1(pq[1])}`, 'fill="none" stroke="#1A1A1A" stroke-width="1.4" stroke-linecap="round"'));
      // le moignon de branche, vu du bout, et la plume pendue devant le chicot
      const m = P([0, 596]);
      o.push(h.ellipse(m[0], m[1], 6, 5, W(A.contour)));
      o.push(h.chemin([[m[0], m[1] + 5], [m[0], P([0, 450])[1]]], FIL));
      o.push(plume(m[0], P([0, 450])[1], 0.95));
      return o.join('\n');
    },
    renvois: z => {
      const { s, yG } = geom(z);
      const ox = z.l / 2;
      const P = ([X, Y]) => [ox + s * X, yG - s * Y];
      return [
        { n: 6, rond: [z.l - 14, P([0, 250])[1]], cible: P([XM - DM / 2 - 16, 262]), texte: 'une seule ouverture' },
        { n: 7, rond: [z.l - 14, P([0, 60])[1]], cible: P([55 * 0.7, 120 - 55 * 0.7]), texte: 'le collet, tenu ouvert' },
      ];
    },
  };

  return {
    ref: '55-41',
    titre: 'Le poste couvert contre un chicot',
    desc: 'Deux vues. De face : un chicot cassé en haut ; devant lui, une petite cabane de bouts de bois plantés serrés en demi-cercle, appuyés contre le tronc, couverte de plaques d’écorce jusque sur le chicot ; une seule ouverture basse au milieu, encadrée de deux bâtons et d’un linteau, l’intérieur dans l’ombre ; un collet tenu ouvert dans l’ouverture ; une plume pendue à un fil sous un moignon de branche du chicot. De dessus, le toit enlevé : le chicot, un fer à cheval de piquets qui part du tronc et s’ouvre devant, l’appât au fond contre le tronc, le collet à l’entrée, et la flèche du seul chemin par où la bête entre.',
    format: 'demi',
    disposition: [['cote', 'face']],
    largeurs: [[1.5, 1]],
    vues: { cote: vueCote, face: vueFace },
  };
};
