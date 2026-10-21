// Modèle : main droite qui serre un manche vertical, vue du dos de la main.
// Pas une planche du livre. Reprise de priseDos2 (formes.js), corrigée point par point.
// dessiner(x, y, echelle, opt) rend le SVG ; à porter dans formes.js.
//
// Repère en mm d'adulte (échelle 1) : origine à la jointure du majeur ; x vers les doigts,
// y vers le bas. L'avant-bras arrive de la gauche, le pouce est en haut (côté radial).
//   poignet (pli) x = -100 ; jointure du majeur x = 0 ; bout du majeur tendu ≈ +90 → 190
//   manche Ø 32 : x = -4 … +28 (il passe sous les premières phalanges)
//   jointures : index (-4, -27) · majeur (0, -8) · annulaire (-3, 10.5) · auriculaire (-10, 27)
//   deuxièmes jointures (avant du poing) : index 38 · majeur 42 · annulaire 39.5 · auriculaire 31
//   pouce : bord radial du poignet → bosse de sa jointure (-44, -50) → passe derrière le manche →
//   le bout ressort à droite, couché sur la deuxième phalange de l'index (28 … 43, -51 … -31)

function dessiner(x, y, s, opt = {}) {
  const N = '#1A1A1A';
  const f = v => +v.toFixed(1);
  const P = p => `${f(x + p[0] * s)} ${f(y + p[1] * s)}`;
  const trait = ep => `fill="none" stroke="${N}" stroke-width="${ep}" stroke-linecap="round" stroke-linejoin="round"`;
  // Catmull-Rom : une suite de points devient une courbe qui passe par chacun
  const cr = (pts, debut = true) => {
    let d = debut ? `M${P(pts[0])}` : '';
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(i - 1, 0)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(i + 2, pts.length - 1)];
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C${P(c1)} ${P(c2)} ${P(p2)}`;
    }
    return d;
  };
  // plusieurs tronçons lisses bout à bout, cassés aux jonctions (les creux entre les doigts)
  const troncons = (...ts) => ts.map((t, i) => cr(t, i === 0)).join('');
  const out = [];

  // ── 1. le bout du pouce, derrière le manche et derrière l'index ──
  const pouce = [[16, -36], [17, -45], [22, -48.6], [30, -49.4], [36.4, -48], [41, -44.6], [43.6, -39.2], [44.2, -33], [43, -27.8], [39.8, -24], [35, -22.4]];
  out.push(`<path d="${cr(pouce)} L${P([30, -22])} L${P([16, -30])} Z" fill="#FFFFFF" stroke="none"/>`);
  out.push(`<path d="${cr(pouce)}" ${trait(1.4)}/>`);
  // l'ongle, vu de chant : il suit le dessus du bout
  out.push(`<path d="${cr([[40.4, -41.8], [41.8, -36.6], [41.6, -31.2]])}" ${trait(0.7)}/>`);

  // ── 2. le manche ──
  const [haut, bas] = opt.manche || [120, 120];
  const rect = `x="${f(x - 4 * s)}" y="${f(y - haut * s)}" width="${f(32 * s)}" height="${f((haut + bas) * s)}"`;
  out.push(`<rect ${rect} fill="#FFFFFF" stroke="none"/>`);   // la hachure seule laisse voir à travers
  out.push(`<rect ${rect} fill="url(#h-bois)" stroke="${N}" stroke-width="1.4"/>`);

  // ── 3. la main ──
  const cut = -150;
  // le haut : avant-bras, bord radial du poignet, base et jointure du pouce, jusqu'au manche
  const haut1 = [[cut, -31], [-130, -30.2], [-110, -28.4], [-100, -28.4], [-88, -31.6], [-74, -38.4], [-60, -45.2], [-48, -49.6], [-40, -51], [-30, -50.8], [-16, -49.6], [-4, -48.8]];
  // l'avant du poing : les deuxièmes jointures, l'une sous l'autre, le majeur le plus avancé
  const index = [[-4, -36.6], [6, -37.4], [18, -37.4], [28, -37], [33.4, -36], [36.6, -33], [37.8, -28], [37.6, -22.6], [35.8, -19], [33.2, -17.6]];
  const majeur = [[33.2, -17.6], [38.4, -16.8], [41.2, -13.4], [42.2, -8], [41.8, -2.4], [39.6, 0.6], [36.4, 1.4]];
  const annul = [[36.4, 1.4], [38.4, 3.6], [39.2, 8], [39, 13.4], [37, 17.4], [33.4, 19.2], [30, 19.4]];
  // l'auriculaire, puis le bord cubital jusqu'à l'avant-bras
  const auri = [[30, 19.4], [30.2, 23.6], [28.8, 29], [24.4, 33.2], [15, 35.2], [2, 35.8], [-12, 37.2], [-26, 38], [-46, 37.6], [-66, 35.6], [-84, 33], [-96, 32], [-104, 32.2], [-116, 32.8], [-134, 34], [cut, 35]];
  const bas1 = troncons(index, majeur, annul, auri);
  out.push(`<path d="${cr(haut1)} L${P([-4, -36.6])} ${bas1.replace(/^M[^C]*/, '')} Z" fill="#FFFFFF" stroke="none"/>`);
  out.push(`<path d="${cr(haut1)}" ${trait(1.4)}/>`);
  out.push(`<path d="${bas1}" ${trait(1.4)}/>`);
  out.push(`<path d="M${P([cut, -31])} L${P([cut, 35])}" ${trait(1.4)}/>`);   // l'avant-bras coupé net

  // ── 4. traits intérieurs ──
  const det = [
    // le bord de l'index qui sort de la commissure du pouce
    [[-64, -41.6], [-46, -39.8], [-26, -38.2], [-4, -37.2]],
    // les séparations des doigts, de la vallée entre jointures au creux de l'avant
    [[-2, -18.4], [11, -18.2], [23, -17.9], [33.2, -17.6]],
    [[1, 1.2], [14, 1.3], [26, 1.4], [36.4, 1.4]],
    [[-7, 19.4], [6, 19.6], [19, 19.6], [30, 19.4]],
  ];
  det.forEach(p => out.push(`<path d="${cr(p)}" ${trait(0.7)}/>`));
  const fin = [
    // les têtes des jointures : l'arc, l'index le plus haut, le majeur le plus avancé
    ...[[-6, -27, 5.6], [0, -8, 5.4], [-4, 10.5, 5], [-13, 27, 4.4]].map(([kx, ky, hh]) =>
      ['Q', [kx + 2.2, ky - hh], [kx - 1.4, ky], [kx + 2.2, ky + hh]]),
    // la peau qui plisse sur les deuxièmes jointures
    ['Q', [31, -30.4], [28.8, -26], [31, -21.6]],
    ['Q', [35, -11.4], [32.8, -7.4], [35, -3.4]],
    ['Q', [32.8, 6.2], [30.8, 10], [32.8, 13.8]],
    ['Q', [24, 23.8], [22.2, 26.8], [24, 29.8]],
    // le pli de la jointure du pouce
    [[-49.4, -48.6], [-47.6, -45.8], [-44.4, -44.4]],
    // les tendons de l'index et du majeur, à peine, en éventail depuis le poignet
    [[-52, -24.6], [-34, -26], [-14, -27.4]],
    [[-50, -8.2], [-30, -8.4], [-10, -8.4]],
  ];
  fin.forEach(p => out.push(`<path d="${p[0] === 'Q' ? `M${P(p[1])} Q${P(p[2])} ${P(p[3])}` : cr(p)}" ${trait(0.5)}/>`));
  return out.join('\n');
}

module.exports = (h) => ({
  ref: 'modele',
  titre: 'La prise, du dos de la main',
  desc: 'Modèle : main droite qui serre un manche vertical, vue du dos de la main.',
  fichier: '_modeles-prise-dos-reprise.svg',
  format: 'pleine',
  disposition: [['a']],
  vues: {
    a: {
      dessin: z => {
        const e = (z.l - 24) / 200, x0 = 12 + 150 * e, y0 = z.h * 0.5;
        return dessiner(x0, y0, e, { manche: [y0 / e - 2, (z.h - y0) / e - 2] });
      },
    },
  },
});
module.exports.dessiner = dessiner;
