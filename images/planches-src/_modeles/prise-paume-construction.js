// Modèle : la main droite qui serre un manche vertical, vue côté paume (le devant du poing).
// Feuille de modèle, pas une planche du livre.
//
// Construction d'illustrateur (Loomis / Bridgman). Repère : échelle 1 = 1 mm, origine sur
// l'axe du manche au milieu de la prise, y vers le bas. Une main fait 190 du poignet au bout
// du majeur ; le manche fait 32 de diamètre.
//
//   1. Le manche, vertical. La paume fait face au lecteur, le manche passe DEVANT elle : les
//      doigts s'enroulent par-devant, on voit donc le dos de leurs deuxièmes phalanges (P2), qui
//      traversent le manche de gauche à droite ; la P1 fuit vers l'arrière (on n'en voit que le
//      coude de l'interphalangienne, à gauche du manche) ; la P3 replonge vers la paume à droite,
//      l'ongle vu par la tranche.
//   2. La paume en coin : le manche traverse la paume en oblique (base de l'index → éminence
//      hypothénar), donc l'axe de la main descend de ~11° vers le poignet et l'avant-bras.
//   3. Les doigts, de haut en bas index, majeur, annulaire, auriculaire. Rapports vrais des
//      phalanges (P1 : P2 : P3 ≈ 1 : 0,62 : 0,45) ; le majeur va le plus loin à gauche,
//      l'auriculaire est le plus court, le plus mince et le plus bas. Les doigts convergent vers
//      le scaphoïde : les bandes s'inclinent de plus en plus vers le haut à droite en descendant.
//   4. Le pouce part du trapèze (haut du poignet, côté radial), son métacarpien forme le bord
//      supérieur de la main ; il passe par-dessus le manche et se couche en travers des P2 de
//      l'index et du majeur, l'ongle vers le lecteur, la pulpe près du coude du majeur.
//   5. L'éminence thénar : le gras du pouce, à droite du manche, bordé par le pli thénar qui
//      descend vers le milieu du poignet. L'hypothénar fait le bord inférieur.
//   6. Le contour passe sur les volumes ; peint de l'arrière vers l'avant (avant-bras et paume,
//      manche, doigts du bas vers le haut, pouce). Silhouette 1,5, contours de recouvrement 1,0,
//      ongles 0,7, plis 0,5. Pas d'ombre, pas de gris.
//
// dessiner(x, y, echelle) rend le SVG : (x, y) est le centre de la prise sur l'axe du manche.
// Le manche est dessiné avec la main (il passe entre la paume et les doigts).

function dessiner(x, y, echelle = 1, options = {}) {
  const s = echelle;
  const f = v => Math.round(v * 100) / 100;
  const P = ([px, py]) => [x + px * s, y + py * s];
  const NOIR = '#000', BLANC = '#fff';
  const trait = ep => `fill="none" stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="round"`;
  const SIL = trait(1.5), RECOUV = trait(1.0), ONGLE = trait(0.7), PLI = trait(0.5);
  const PLEIN_BLANC = `fill="${BLANC}" stroke="none"`;

  // Courbe lisse (Catmull-Rom → Bézier) passant par les points ; tension 0,5 = 1/6.
  const lisse = (pts, ferme = false) => {
    const q = pts.map(P);
    const n = q.length;
    const at = i => ferme ? q[(i + n) % n] : q[Math.max(0, Math.min(n - 1, i))];
    let d = `M${f(q[0][0])},${f(q[0][1])}`;
    const fin = ferme ? n : n - 1;
    for (let i = 0; i < fin; i++) {
      const p0 = at(i - 1), p1 = at(i), p2 = at(i + 1), p3 = at(i + 2);
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C${f(c1[0])},${f(c1[1])} ${f(c2[0])},${f(c2[1])} ${f(p2[0])},${f(p2[1])}`;
    }
    return ferme ? d + 'Z' : d;
  };
  const path = (d, a) => `<path d="${d}" ${a}/>`;
  const out = [];

  // tronçon d'une courbe fermée, du point i au point j (en tournant), exactement sur le même
  // tracé que la forme pleine : la silhouette se repasse sans dédoubler le trait.
  const troncon = (pts, i, j) => {
    const q = pts.map(P), n = q.length, at = k => q[((k % n) + n) % n];
    let d = `M${f(at(i)[0])},${f(at(i)[1])}`;
    for (let k = i; k !== j; k = (k + 1) % n) {
      const p0 = at(k - 1), p1 = at(k), p2 = at(k + 1), p3 = at(k + 2);
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C${f(c1[0])},${f(c1[1])} ${f(c2[0])},${f(c2[1])} ${f(p2[0])},${f(p2[1])}`;
    }
    return d;
  };

  // ── 1. Avant-bras, poignet, paume : la masse du fond ─────────────────────────────────────
  // Le bord supérieur (métacarpien du pouce, styloïde radiale, avant-bras) se trace avec le pouce.
  const bordHaut = [[30, -50.5], [44, -45.5], [58, -38], [70, -30], [80, -24], [92, -20.5], [114, -15], [136, -9.5]];
  const bordBas = [[136, 55], [112, 49.5], [92, 45.5], [78, 44.5], [62, 44.5], [44, 43], [28, 39.5], [14, 34.5]];
  out.push(path(lisse([...bordHaut, ...bordBas, [4, 10], [6, -30], [18, -46]], true), PLEIN_BLANC));
  out.push(path(lisse(bordBas), SIL));

  // ── 2. Le manche, devant la paume et derrière les doigts ─────────────────────────────────
  const r = 16, hautM = -100, basM = 108;
  const coin = (a, b) => `${f(P([a, b])[0])},${f(P([a, b])[1])}`;
  out.push(path(`M${coin(-r, hautM)} L${coin(r, hautM)} L${coin(r, basM)} L${coin(-r, basM)}Z`, PLEIN_BLANC));
  for (const sx of [-r, r]) out.push(path(lisse([[sx, hautM], [sx, basM]]), SIL));
  out.push(path(lisse([[-r, hautM], [r, hautM]]), RECOUV));
  out.push(path(lisse([[-r, basM], [r, basM]]), RECOUV));
  out.push(path(lisse([[-6, hautM + 6], [-5, -62]]), PLI));
  out.push(path(lisse([[7, hautM + 14], [6, -70]]), PLI));
  out.push(path(lisse([[-4, 52], [-5, basM - 8]]), PLI));
  out.push(path(lisse([[8, 66], [7, basM - 16]]), PLI));

  // ── 3. Les doigts : K = coude de l'interphalangienne proximale (centre), D = coude distal ──
  // w = demi-largeur au coude, t = longueur vue de la P3 (elle replonge vers la paume).
  const doigts = [
    { K: [-18, 24], D: [2.5, 18.5], w: 7.6, t: 9 },       // auriculaire : court, mince, bas, incliné
    { K: [-25, 6.5], D: [5, 1.5], w: 9.0, t: 11.5 },     // annulaire
    { K: [-28, -11.5], D: [5.5, -14], w: 9.6, t: 12.5 }, // majeur : le plus long
    { K: [-24.5, -29.5], D: [5, -30.5], w: 9.2, t: 11.5 }, // index (le bout passe sous le pouce)
  ];
  doigts.forEach(({ K, D, w, t }, i) => {
    const dx = D[0] - K[0], dy = D[1] - K[1], L = Math.hypot(dx, dy);
    const u = [dx / L, dy / L], n = [-u[1], u[0]];   // n vers le bas (côté auriculaire)
    const loc = ([a, b]) => [K[0] + u[0] * a + n[0] * b, K[1] + u[1] * a + n[1] * b];
    // le coude proximal est carré (la tête de P1 sous la peau), la P2 s'amincit, le bout s'arrondit
    const tour = [
      [-0.98 * w, 0.0 * w], [-0.86 * w, -0.66 * w], [-0.4 * w, -0.98 * w], [0.2 * L, -0.97 * w],
      [0.6 * L, -0.83 * w], [L - 0.1 * t, -0.88 * w], [L + 0.55 * t, -0.78 * w], [L + 0.95 * t, -0.33 * w],
      [L + 1.0 * t, 0.2 * w], [L + 0.75 * t, 0.7 * w], [L + 0.2 * t, 0.88 * w], [0.55 * L, 0.87 * w],
      [0.1 * L, 0.98 * w], [-0.45 * w, 0.94 * w], [-0.86 * w, 0.64 * w],
    ].map(loc);
    out.push(path(lisse(tour, true), RECOUV.replace('fill="none"', `fill="${BLANC}"`)));
    // le coude gauche fait la silhouette du poing, et le bas de l'auriculaire : repassés à 1,5
    out.push(path(troncon(tour, i === 0 ? 10 : 13, 2), SIL));
    // l'ongle vu par la tranche, sur le bout qui replonge (celui de l'index est sous le pouce)
    if (i < 3) out.push(path(lisse([[L + 0.15 * t, -0.68 * w], [L + 0.6 * t, -0.6 * w], [L + 0.82 * t, -0.15 * w],
      [L + 0.7 * t, 0.4 * w], [L + 0.42 * t, 0.2 * w], [L + 0.3 * t, -0.3 * w]].map(loc), true), ONGLE));
    // plis à peine indiqués : rides du coude proximal, pli de l'articulation distale
    if (i === 3) return;   // l'index : ses plis passent sous le pouce
    out.push(path(lisse([[0.06 * L, -0.45 * w], [0.09 * L, 0], [0.06 * L, 0.4 * w]].map(loc)), PLI));
    out.push(path(lisse([[0.15 * L, -0.3 * w], [0.17 * L, 0.05 * w], [0.15 * L, 0.3 * w]].map(loc)), PLI));
    out.push(path(lisse([[0.93 * L, -0.5 * w], [0.95 * L, -0.1 * w]].map(loc)), PLI));
  });

  // ── 4. Le pouce, couché en travers de l'index et du majeur ──────────────────────────────
  const pouceHaut = [[-22, -26], [-19, -32.5], [-12.5, -38.5], [-3, -44.5], [9, -51], [21, -54], [30, -50.5]];
  const pouceBas = [[22, -30.5], [11, -26.5], [0, -22.5], [-9, -18], [-16, -16.5], [-21, -20]];
  out.push(path(lisse([...pouceHaut, [45, -44.5], [50, -30], [36, -30], ...pouceBas], true), PLEIN_BLANC));
  // une seule silhouette : dessous du pouce, pulpe, dos du pouce, métacarpien, avant-bras
  out.push(path(lisse([...pouceBas, ...pouceHaut, ...bordHaut.slice(1)]), SIL));
  // ongle du pouce, vers le lecteur
  out.push(path(lisse([[-6.5, -38], [-13.5, -34.5], [-18, -28.5], [-15.5, -23.5], [-9, -27], [-4.5, -33]], true), ONGLE));
  // plis de l'interphalangienne, renflement de la métacarpo-phalangienne
  out.push(path(lisse([[3.5, -45], [2, -39], [3, -33]]), PLI));
  out.push(path(lisse([[7, -46.5], [6, -41.5]]), PLI));
  out.push(path(lisse([[17, -51], [15.5, -45]]), PLI));

  // ── 5. La paume : thénar, poignet, hypothénar (plis à 0,5) ──────────────────────────────
  // pli thénar : il prolonge le dessous du pouce et descend vers le milieu du poignet
  out.push(path(lisse([[22, -30.5], [32, -22], [41, -9], [49, 6], [57, 19], [64, 27]]), PLI));
  out.push(path(lisse([[75, -14], [77, 0], [77.5, 14], [76.5, 28]]), PLI));
  out.push(path(lisse([[81, -8], [82.5, 6], [82.5, 20]]), PLI));
  // bord de l'éminence hypothénar, sous le bout de l'auriculaire
  out.push(path(lisse([[22, 22], [33, 27], [46, 31.5]]), PLI));
  
  // ── traits de construction (pour juger la feuille ; jamais imprimés dans le livre) ─────
  if (options.construction) {
    const C = `fill="none" stroke="${NOIR}" stroke-width="0.4" stroke-dasharray="2 2"`;
    const ligne = (a, b) => path(`M${f(P(a)[0])},${f(P(a)[1])} L${f(P(b)[0])},${f(P(b)[1])}`, C);
    out.push(ligne([0, -130], [0, 140]));                       // axe du manche
    out.push(ligne([-36, -13], [150, 23]));                      // axe de la main : coude du majeur → milieu du poignet
    out.push(ligne([76, -18], [20, -43]), ligne([20, -43], [2, -34]), ligne([2, -34], [-14, -26])); // pouce : trapèze, MCP, IP, bout
    for (const { K, D } of doigts) out.push(ligne(K, D));
    out.push(path(lisse([[-24.5, -29.5], [-28, -11.5], [-25, 6.5], [-18, 24]]), C)); // arc des coudes proximaux
  }
  return out.join('\n');
}

module.exports = (h) => ({
  ref: 'modele',
  titre: 'Modèle : la prise côté paume',
  desc: 'Feuille de modèle : la main droite qui serre un manche vertical, vue du côté de la paume.',
  fichier: '_modeles-prise-paume-construction.svg',
  format: 'pleine',
  disposition: [['a']],
  vues: {
    a: { dessin: z => dessiner(z.l * 0.5 - 53 * Math.min(z.l / 178, z.h / 214), z.h * 0.48, Math.min(z.l / 178, z.h / 214), { construction: !!process.env.CONSTRUCTION }) },
  },
});
module.exports.dessiner = dessiner;
