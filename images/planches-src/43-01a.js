// Planche 43-01a — l'orignal, sabot grandeur nature (ch. 43, §5-B ; « Les gabarits à l'échelle », §9).
//
// Les cinq pages de la 43-01 (a orignal, b caribou, c loup, d ours avant, e ours arrière) sont
// des gabarits à l'échelle 1:1 : on pose le livre ouvert à côté de l'empreinte et on compare.
// Chaque empreinte des grands prend une page à elle seule : 18 cm d'orignal, c'est 732 unités
// sur 826.
//
// L'ÉCHELLE. La planche pleine page s'imprime sur la largeur de l'empagement : 680 unités =
// 167,2 mm (plan/normes-graphiques.md, §5.1). Donc K = 680 / 167,2 = 4,067 unités par mm. La
// règle de 10 cm imprimée sur chaque page vérifie l'échelle à l'impression : si elle ne mesure
// pas 10 cm, la page a été agrandie ou réduite et le gabarit ne vaut plus.
//
// LES MESURES, toutes du chapitre (§5-B), rien d'autre :
//   orignal avant 11 à 18 cm de long sur 9,5 à 15 cm ; arrière 10,5 à 16,5 sur 9 à 12.
//   Trait plein : le plus grand avant (180 × 150 mm). Tireté : le plus petit arrière (105 × 90).
// Longueur mesurée comme au §5-A, étape 6 : ce que le pied a touché, de la pointe au talon.
// Les ergots ne sont pas dessinés : le chapitre ne dit pas à quelle distance ils marquent, et il
// n'y a pas la place sous un sabot de 18 cm.
//
// Ce fichier porte aussi la géométrie commune aux cinq pages (module.exports.pistes).

const K = 680 / 167.2;                 // unités par mm, à l'impression sur 167,2 mm de large
const f = v => Math.round(v * 10) / 10;

function pistes(h) {
  // Repère d'une empreinte : mm → unités de la page. Origine au bout du doigt le plus avancé,
  // sur l'axe du pied ; y vers le talon. a en degrés, positif = sens horaire à l'écran.
  const repere = ({ x0, y0, a = 0, miroir = false }) => {
    const c = Math.cos(a * Math.PI / 180), s = Math.sin(a * Math.PI / 180);
    return ([x, y]) => { const xx = miroir ? -x : x; return [x0 + K * (xx * c - y * s), y0 + K * (xx * s + y * c)]; };
  };

  // Courbe lisse par les points (Catmull-Rom en Bézier). Un point [x, y, 'v'] est un angle vif.
  const courbe = (pts, T, ferme = true) => {
    const P = pts.map(p => T(p)), vif = pts.map(p => p[2] === 'v'), n = P.length;
    const g = i => ferme ? P[(i + n) % n] : P[Math.max(0, Math.min(n - 1, i))];
    let d = `M${f(P[0][0])} ${f(P[0][1])}`;
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      let c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      let c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      if (vif[i % n]) c1 = [p1[0] + (p2[0] - p1[0]) / 4, p1[1] + (p2[1] - p1[1]) / 4];
      if (vif[(i + 1) % n]) c2 = [p2[0] + (p1[0] - p2[0]) / 4, p2[1] + (p1[1] - p2[1]) / 4];
      d += ` C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
    }
    return ferme ? d + ' Z' : d;
  };
  // Un ovale en mm (centre, demi-axes, rotation en degrés), en points pour courbe().
  const ovale = (cx, cy, rx, ry, rot = 0, n = 16) => {
    const r = rot * Math.PI / 180, out = [];
    for (let i = 0; i < n; i++) {
      const t = 2 * Math.PI * i / n, x = rx * Math.sin(t), y = -ry * Math.cos(t);
      out.push([cx + x * Math.cos(r) - y * Math.sin(r), cy + x * Math.sin(r) + y * Math.cos(r)]);
    }
    return out;
  };
  // Une griffe : une marque pointue, de la base (au bout du doigt) vers la pointe.
  const griffe = (base, pointe, larg, T) => {
    const dx = pointe[0] - base[0], dy = pointe[1] - base[1], L = Math.hypot(dx, dy), nx = -dy / L * larg / 2, ny = dx / L * larg / 2;
    return courbe([[base[0] + nx, base[1] + ny], [pointe[0], pointe[1], 'v'], [base[0] - nx, base[1] - ny], [base[0] - dx * 0.12, base[1] - dy * 0.12]], T);
  };
  const miroir = pts => pts.map(p => [-p[0], p[1], p[2]]).reverse();
  const norm = (pts, L, W) => pts.map(p => [p[0] * W, p[1] * L, p[2]]);

  const A = {
    plein: h.a.contour,
    pleinBlanc: h.a.contour.replace('fill="none"', 'fill="#FFFFFF"'),
    tirete: h.a.arete.replace('stroke-linecap="round"', 'stroke-linecap="butt"') + ' stroke-dasharray="7 4.5"',
    tireteFin: h.a.detail + ' stroke-dasharray="4 3"',
    noir: h.a.plein,
  };

  // La règle de 10 cm. 'v' : le zéro en haut, graduations à droite ; 'h' : le zéro à gauche,
  // graduations au-dessus. Traits au millimètre, plus longs aux 5 mm, chiffres au centimètre.
  const regle = (x, y, sens = 'v') => {
    const o = [], L = 100 * K;
    if (sens === 'v') {
      o.push(h.ligne(x, y, x, y + L, h.a.detail));
      for (let mm = 0; mm <= 100; mm++) {
        const l = mm % 10 === 0 ? 12 : mm % 5 === 0 ? 8 : 4.5;
        o.push(h.ligne(x, y + mm * K, x + l, y + mm * K, mm % 5 === 0 ? h.a.detail : h.a.fin));
      }
      for (let c = 0; c <= 10; c++) o.push(h.texte(x + 16, y + c * 10 * K + 4, c === 10 ? '10 cm' : String(c), { ancre: 'start' }));
    } else {
      o.push(h.ligne(x, y, x + L, y, h.a.detail));
      for (let mm = 0; mm <= 100; mm++) {
        const l = mm % 10 === 0 ? 12 : mm % 5 === 0 ? 8 : 4.5;
        o.push(h.ligne(x + mm * K, y, x + mm * K, y - l, mm % 5 === 0 ? h.a.detail : h.a.fin));
      }
      for (let c = 0; c <= 10; c++) o.push(h.texte(x + c * 10 * K, y - 17, String(c)));
      o.push(h.texte(x + L + 8, y + 4, 'cm', { ancre: 'start' }));
    }
    return o.join('\n');
  };

  // Le sens de la marche : une flèche vers le haut de la page.
  const marche = (x, yBas, yHaut) => h.fleche(`M${f(x)} ${f(yBas)} L${f(x)} ${f(yHaut)}`, h.a.arete);

  // Tout se dessine en coordonnées de la page : la vue unique commence à (40, 24).
  const vue = parts => `<g transform="translate(-40 -24)">\n${parts.join('\n')}\n</g>`;
  const renvoi = (n, rond, cible, texte) => ({ n, rond: [f(rond[0] - 40), f(rond[1] - 24)], cible: [f(cible[0] - 40), f(cible[1] - 24)], texte });

  // ─── Les sabots des cervidés : la moitié droite, en fractions de la largeur et de la longueur.
  // Orignal : un cœur long et pointu ; chaque moitié, un croissant allongé à pointe vive, le
  // bord intérieur presque droit, le talon rond ; le plus large aux deux tiers vers l'arrière.
  const orignalDroit = [
    [0.03, 0.0, 'v'], [0.14, 0.065], [0.265, 0.19], [0.375, 0.36], [0.46, 0.54], [0.5, 0.70],
    [0.47, 0.85], [0.39, 0.955], [0.27, 0.998], [0.15, 0.975], [0.075, 0.915],
    [0.05, 0.78], [0.045, 0.50], [0.037, 0.22],
  ];
  // Le bourrelet du talon : la ligne où la corne finit et où le coussinet mou commence.
  const orignalTalon = [[0.055, 0.66], [0.2, 0.615], [0.35, 0.625], [0.475, 0.69]];

  // Caribou : plus large que long ; chaque moitié, une demi-lune creuse, le bord extérieur
  // rond, le bord intérieur rentrant, les deux moitiés très écartées.
  const caribouDroit = [
    [0.06, 0.075], [0.12, 0.018], [0.22, 0.0], [0.33, 0.03], [0.42, 0.12], [0.48, 0.28], [0.50, 0.47],
    [0.48, 0.66], [0.42, 0.82], [0.32, 0.94], [0.20, 0.998], [0.11, 0.985], [0.07, 0.93],
    [0.09, 0.80], [0.13, 0.62], [0.14, 0.47], [0.125, 0.30], [0.085, 0.16],
  ];
  // Le rebord de corne : le sabot est creux, c'est le bord qui marque.
  const caribouRebord = [[0.13, 0.085], [0.22, 0.07], [0.32, 0.10], [0.39, 0.18], [0.435, 0.31], [0.45, 0.47], [0.435, 0.64], [0.385, 0.78], [0.30, 0.885], [0.195, 0.93], [0.125, 0.915]];

  const sabot = (moitie, L, W, T, at, ligneInt, atInt) => {
    const d = norm(moitie, L, W);
    const o = [h.path(courbe(d, T), at), h.path(courbe(miroir(d), T), at)];
    if (ligneInt) {
      const li = norm(ligneInt, L, W);
      o.push(h.path(courbe(li, T, false), atInt), h.path(courbe(li.map(p => [-p[0], p[1]]), T, false), atInt));
    }
    return o.join('\n');
  };

  return { K, f, repere, courbe, ovale, griffe, miroir, norm, A, regle, marche, vue, renvoi, sabot, orignalDroit, orignalTalon, caribouDroit, caribouRebord };
}

module.exports = (h) => {
  const P = pistes(h);
  const { K, A } = P;
  // Le grand sabot : 180 × 150 mm ; le petit, centré dans le grand : 105 × 90 mm.
  const cx = 362, y0 = 8;
  const grand = P.repere({ x0: cx, y0 });
  const petit = P.repere({ x0: cx, y0: y0 + (180 - 105) / 2 * K });
  const G = ([x, y]) => grand([x * 150, y * 180]);

  return {
    ref: '43-01a',
    titre: 'L’orignal, sabot grandeur nature',
    desc: 'Gabarit à l’échelle 1:1 d’une empreinte d’orignal : en trait plein, le plus grand sabot avant (18 cm de long sur 15 de large), deux croissants allongés et pointus en cœur, le bourrelet du talon marqué ; en tireté, centré dedans, le plus petit sabot arrière (10,5 sur 9 cm). Une flèche donne le sens de la marche, pointes en avant. Règle de 10 cm dans la marge : la page n’est à l’échelle que si elle mesure 10 cm une fois imprimée.',
    format: 'pleine',
    vues: {
      sabot: {
        dessin: z => P.vue([
          P.sabot(P.orignalDroit, 105, 90, petit, A.tirete),
          P.sabot(P.orignalDroit, 180, 150, grand, A.plein, P.orignalTalon, h.a.detail),
          P.regle(14, 30, 'v'),
          P.marche(648, 250, 150),
        ]),
        renvois: z => [
          P.renvoi(1, [598, 132], G([0.35, 0.30]), 'le plus grand sabot avant'),
          P.renvoi(2, [150, 300], petit([-0.40 * 90, 0.45 * 105]), 'le plus petit sabot arrière'),
        ],
      },
    },
  };
};
module.exports.pistes = pistes;
module.exports.K = K;
