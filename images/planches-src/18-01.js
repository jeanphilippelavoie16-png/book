// Planche 18-01. La crémaillère pour cuire dehors.
// Le texte : ch. 18, section 7, « Cuire dehors, sans avertisseur » : on cuisine dehors, sur un feu bas et des
// braises, derrière un mur de neige tassée du côté du vent. À douze, les marmites sont lourdes : on plante deux
// branches fourchues, on pose une barre dessus et on y pend des crochets de branche à différentes hauteurs. On monte
// ou on descend la marmite d'un cran au lieu de la soulever.
//
// Montage, vu de face. Les repères suivent l'ordre du texte. Aucune cote : le texte n'en donne pas, la marmite
// donne l'échelle. Aucune main ni aucun corps : rien n'est tenu, le geste est la flèche rouge (repère 6).
//
// La géométrie : la barre passe dans la fourche des piquets, devant la branche de derrière et derrière celle d'avant.
// Chaque crochet est une fourche de branche renversée qui enjambe la barre : la tige descend devant, la branche
// courte derrière, la barre coincée dans le creux. En bas de la tige, un chicot fait un second creux où l'anse se
// pose : la moitié gauche de l'anse passe devant la base du chicot et finit au fond du cran, la moitié droite repart
// derrière la tige. Les braises sont toutes noires, fendues de blanc, comme à la 88-02. Fourches et crochets sont tournés vers le spectateur pour qu'on les voie ouverts. Le mur de neige est vu de
// biais pour qu'on voie qu'il est long. La neige en pointillé ; en gris d'ombre, le flanc du mur tourné vers le feu,
// la face droite des piquets, le dessous de la barre et le côté droit de la marmite (lumière en haut à gauche). Un
// seul rouge : la flèche du geste, qui va de la hauteur du crochet court à celle du crochet long.
module.exports = (h) => {
  const f = v => Math.round(v * 10) / 10;
  const P = pts => pts.map(p => [f(p[0]), f(p[1])]);
  const RAD = Math.PI / 180;
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const mul = (a, k) => [a[0] * k, a[1] * k];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const uni = a => { const l = Math.hypot(a[0], a[1]) || 1; return [a[0] / l, a[1] / l]; };
  const inter = (p, d, q, e) => { const den = d[0] * e[1] - d[1] * e[0]; const t = ((q[0] - p[0]) * e[1] - (q[1] - p[1]) * e[0]) / den; return add(p, mul(d, t)); };
  const blancSans = 'fill="#FFFFFF" stroke="none"';
  const blancArete = h.a.arete.replace('fill="none"', 'fill="#FFFFFF"');
  const fente = 'fill="none" stroke="#FFFFFF" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round"';

  // ── Le repère de la scène ────────────────────────────────────────────────────────────
  const GY = 220;                 // le dessus de la neige
  const YB = 42, RB = 6.5;        // l'axe de la barre et son rayon
  const XB0 = 152, XB1 = 488;     // les bouts de la barre
  const FOURCHES = [180, 460];
  const CROCHETS = [{ x: 250, l: 46, e: 27 }, { x: 320, l: 65, e: 29 }, { x: 390, l: 84, e: 26 }];   // du court au long
  const RH = 3.4;                 // demi-épaisseur de la tige d'un crochet

  // ── Le sol de neige, vu en coupe à l'avant ───────────────────────────────────────────
  const sol = [
    h.rect(0, GY, 600, 20, h.a.hachure('neige', 'aucun')),
    h.ligne(0, GY, 600, GY, h.a.arete),
  ];

  // ── Le mur de neige tassée, du côté du vent : un profil au dessus arrondi, tiré vers le fond ──────────
  const recul = [62, -34];
  const mur = (() => {
    const prof = [[36, GY], [44, 160], [48, 126], [51, 116], [56, 110.5], [63, 108.5], [72, 108.5], [79, 110.5], [84, 116],
      [87, 126], [90, 160], [96, GY]];
    const fond = prof.map(p => add(p, recul));
    let premier = -1, dernier = -1, o0 = -1, o1 = -1;
    for (let i = 0; i < prof.length - 1; i++) {
      const a = prof[i], b = prof[i + 1];
      const nrm = uni([b[1] - a[1], -(b[0] - a[0])]);                 // normale vers l'extérieur du profil
      if (nrm[0] * recul[0] + nrm[1] * recul[1] > 0) {
        if (premier < 0) premier = i;
        dernier = i + 1;
        if (nrm[0] > 0.55) {                                          // une facette tournée vers la droite : à l'ombre
          if (o0 < 0) o0 = i;
          else if (i !== o1) throw new Error('18-01 : le flanc à l’ombre du mur n’est pas d’un seul tenant');
          o1 = i + 1;
        }
      }
    }
    const silhouette = [...prof.slice(0, premier + 1), ...fond.slice(premier, dernier + 1), prof[dernier]];
    // le flanc à l'ombre d'un seul polygone : des facettes posées bord à bord laissent des joints clairs à l'anticrénelage
    const flanc = [...prof.slice(o0, o1 + 1), ...fond.slice(o0, o1 + 1).reverse()];
    return [
      h.chemin(P(silhouette), blancSans, true),
      h.chemin(P(prof), blancSans, true),
      h.chemin(P(flanc), h.a.ombre, true),
      h.chemin(P(silhouette), h.a.hachure('neige', 'aucun'), true),
      h.chemin(P(prof), h.a.hachure('neige', 'aucun'), true),
      h.chemin(P(prof.slice(premier, dernier + 1)), h.a.arete),
      h.chemin(P([...prof.slice(0, premier + 1), ...fond.slice(premier, dernier + 1)]), h.a.contour),
      h.chemin(P([fond[dernier], prof[dernier]]), h.a.arete),
      h.chemin(P([prof[0], prof[prof.length - 1]]), h.a.contour),
    ];
  })();

  // ── Le vent, qui bute sur le mur ─────────────────────────────────────────────────────
  const vent = [
    h.fleche('M2 136 C12 133 22 138 34 135', h.a.arete),
    h.fleche('M2 170 C12 167 22 172 32 169', h.a.arete),
    h.fleche('M2 204 C11 201 20 206 28 203', h.a.arete),
  ];

  // ── Les braises et le feu bas ────────────────────────────────────────────────────────
  const formes = [
    [[-1, 0.3], [-0.8, -0.55], [0.05, -1], [0.85, -0.7], [1, 0.25], [0.45, 0.95], [-0.6, 1]],
    [[-1, -0.2], [-0.45, -1], [0.6, -0.9], [1, -0.1], [0.8, 0.8], [-0.15, 1], [-0.9, 0.7]],
    [[-1, 0.1], [-0.6, -0.85], [0.3, -1], [1, -0.45], [0.9, 0.6], [0.1, 1], [-0.75, 0.85]],
  ];
  // Une braise : un morceau noir, irrégulier, fendu de blanc (comme la 88-02). Un liseré blanc le détache du morceau
  // de derrière, sinon le lit se lit comme une seule tache noire.
  const morceau = (cx, cy, rx, ry, k) => {
    const pts = formes[k % 3].map(([u, v]) => [cx + u * rx, cy + v * ry]);
    const sens = k % 2 ? -1 : 1;
    return [
      h.chemin(P(pts), `fill="#1A1A1A" stroke="#FFFFFF" stroke-width="0.9" stroke-linejoin="round"`, true),
      h.path(`M${f(cx - rx * 0.6)} ${f(cy + sens * ry * 0.1)} L${f(cx - rx * 0.15)} ${f(cy - sens * ry * 0.3)} L${f(cx + rx * 0.25)} ${f(cy + sens * ry * 0.2)} L${f(cx + rx * 0.62)} ${f(cy - sens * ry * 0.25)}`, fente),
      h.path(`M${f(cx - rx * 0.15)} ${f(cy - sens * ry * 0.3)} L${f(cx - rx * 0.05)} ${f(cy - sens * ry * 0.75)}`, fente),
    ].join('\n');
  };
  const flamme = (x, yb, hf, w, pen = 0) => h.path(
    `M${f(x - w)} ${f(yb)} C${f(x - w - 1)} ${f(yb - hf * 0.5)} ${f(x + pen - 2)} ${f(yb - hf * 0.65)} ${f(x + pen)} ${f(yb - hf)} C${f(x + pen + 2)} ${f(yb - hf * 0.6)} ${f(x + w + 1)} ${f(yb - hf * 0.45)} ${f(x + w)} ${f(yb)} Z`,
    blancArete);
  const arriere = [[246, 211, 11, 6], [268, 210, 12, 6.5], [292, 211, 11, 6], [316, 209.5, 12, 7],
    [340, 211, 11, 6], [364, 210, 12, 6.5], [387, 211, 11, 6], [405, 212, 9, 5]];
  const avant = [[257, 215.5, 12, 5], [281, 215, 12, 5.5], [305, 215.5, 12, 5], [329, 215, 12, 5.5],
    [353, 215.5, 12, 5], [377, 215, 12, 5.5], [399, 215.5, 11, 5]];
  const feu = [
    ...arriere.map(([x, y, rx, ry], i) => morceau(x, y, rx, ry, i)),
    flamme(281, 209, 14, 4.5, -2), flamme(304, 208, 20, 5.5, 1), flamme(328, 209, 16, 5, 2), flamme(352, 209, 12, 4.5, -1),
    ...avant.map(([x, y, rx, ry], i) => morceau(x, y, rx, ry, i + 1)),
  ];

  // ── Les deux branches fourchues, plantées ────────────────────────────────────────────
  // La barre repose au fond de la fourche : le creux entre les deux branches est au ras du dessous de la barre.
  const fourche = (fx, gauche, droite, chicot) => {
    const wb = 6.6, wh = 5.2, wa = 4.3;
    const dG = [-Math.sin(gauche.a * RAD), -Math.cos(gauche.a * RAD)], dD = [Math.sin(droite.a * RAD), -Math.cos(droite.a * RAD)];
    const nGout = [dG[1], -dG[0]], nDout = [-dD[1], dD[0]];            // normales vers l'extérieur
    const creuxY = YB + RB;
    const ig = cy => inter(add([fx, cy], mul(nGout, -wa)), dG, add([fx, cy], mul(nDout, -wa)), dD);
    const cy = creuxY + (creuxY - ig(creuxY)[1]);
    const C = [fx, cy];
    const P5 = ig(cy);
    const bordG = [[fx - wb, GY], uni([wb - wh, cy - GY])], bordD = [[fx + wb, GY], uni([wh - wb, cy - GY])];
    const P2 = inter(add(C, mul(nGout, wa)), dG, ...bordG);
    const P8 = inter(add(C, mul(nDout, wa)), dD, ...bordD);
    const TG = add(C, mul(dG, gauche.l)), TD = add(C, mul(dD, droite.l));
    const P3 = add(TG, mul(nGout, wa)), P4 = add(TG, mul(nGout, -wa));
    const P6 = add(TD, mul(nDout, -wa)), P7 = add(TD, mul(nDout, wa));
    const tour = [[fx - wb, GY], P2, P3, P4, P5, P6, P7, P8, [fx + wb, GY]];
    const ombre = [[fx + 0.8, GY], [fx + 0.8, cy + 6], inter([fx, cy + 6], [1, 0], ...bordD), [fx + wb, GY]];
    // un chicot de branchette coupée, sur le côté de la tige
    const s = chicot.cote, yc = chicot.y, xe = fx + s * (wb - (wb - wh) * (GY - yc) / (GY - cy));
    const uc = uni([s * 0.75, -1]), nc = [-uc[1], uc[0]], hc = 2.2;
    const base = [fx + s * 1.5, yc + 3], bout = add([xe, yc], mul(uc, 9));
    const sortA = inter(add(base, mul(nc, hc)), uc, ...(s < 0 ? bordG : bordD));
    const sortB = inter(add(base, mul(nc, -hc)), uc, ...(s < 0 ? bordG : bordD));
    // le blanc du chicot mord de 1,5 dans la tige, juste assez pour couvrir le trait de la tige à la jonction
    const chic = [add(sortA, mul(uc, -1.5)), add(bout, mul(nc, hc)), add(bout, mul(nc, -hc)), add(sortB, mul(uc, -1.5))];
    const plante = h.path(`M${f(fx - wb)} ${GY} L${f(fx - wb)} ${GY + 11} L${fx} ${GY + 18} L${f(fx + wb)} ${GY + 11} L${f(fx + wb)} ${GY}`, h.a.cache);
    // la branche d'avant (à gauche), repeinte par-dessus la barre
    const avantG = [add(C, mul(nGout, wa)), P3, P4, add(C, mul(nGout, -wa))];
    return {
      dessous: [
        plante, h.chemin(P(tour), blancSans, true), h.chemin(P(ombre), h.a.ombre, true), h.chemin(P(tour), h.a.contour, true),
        h.chemin(P(chic), blancSans, true), h.chemin(P([sortA, add(bout, mul(nc, hc)), add(bout, mul(nc, -hc)), sortB]), h.a.arete),
      ],
      dessus: [h.chemin(P(avantG), blancSans, true), h.chemin(P([P2, P3, P4, P5]), h.a.contour)],
      pied: [fx + wb, GY - 18],
    };
  };
  const fG = fourche(FOURCHES[0], { a: 22, l: 40 }, { a: 27, l: 34 }, { cote: -1, y: 150 });
  const fD = fourche(FOURCHES[1], { a: 24, l: 36 }, { a: 25, l: 39 }, { cote: 1, y: 128 });

  // ── La barre ─────────────────────────────────────────────────────────────────────────
  const barre = [
    h.rect(XB0, YB - RB, XB1 - XB0, 2 * RB, blancSans),
    h.rect(XB0, YB + 0.6, XB1 - XB0, RB - 0.6, h.a.ombre),
    h.rect(XB0, YB - RB, XB1 - XB0, 2 * RB, h.a.contour),
  ];

  // ── Les crochets : une fourche de branche renversée sur la barre, un chicot en bas ───
  const crochet = ({ x, l, e }) => {
    const xs = x - 6;                                   // la tige, devant la barre
    const yT = YB + l + 6, yN = YB - 29;                // le bas de la tige, le bout coupé au-dessus de la fourche
    const Q = [xs, YB - 26];                            // le centre de la fourche, au-dessus de la barre
    const E = [xs + e, YB + RB + 5];                    // le bout de la branche courte, derrière la barre
    const d = uni(sub(E, Q)), n = [d[1], -d[0]], ha = 2.8;
    const D = [xs + RH, 0], V = [0, 1], G = [xs - RH, 0];
    const U = inter(add(Q, mul(n, ha)), d, D, V);       // où la branche courte quitte la tige, dessus
    const N = inter(add(Q, mul(n, -ha)), d, D, V);      // le creux de la fourche, où la barre se coince
    // le chicot du bas : il part de la tige vers le haut et vers l'avant ; l'anse se pose dans son creux
    const K = [xs, YB + l];
    const u = [-Math.sin(34 * RAD), -Math.cos(34 * RAD)], nu = [-u[1], u[0]], hc = 3;
    const bout = add(K, mul(u, 19));
    const creux = inter(add(K, mul(nu, hc)), u, G, V);
    const sortie = inter(add(K, mul(nu, -hc)), u, G, V);
    const tour = [[xs + RH, yT], N, add(E, mul(n, -ha)), add(E, mul(n, ha)), U, [xs + RH, yN], [xs - RH, yN],
      creux, add(bout, mul(nu, hc)), add(bout, mul(nu, -hc)), sortie, [xs - RH, yT]];
    return {
      creux,
      dessous: [h.chemin(P(tour), blancSans, true), h.chemin(P(tour), h.a.contour, true)],
      // la tige passe devant la barre : on la repeint par-dessus
      dessus: [
        h.rect(xs - RH, YB - RB - 1.5, 2 * RH, 2 * RB + 3, blancSans),
        h.ligne(xs - RH, YB - RB - 1.5, xs - RH, YB + RB + 1.5, h.a.contour),
        h.ligne(xs + RH, YB - RB - 1.5, xs + RH, YB + RB + 1.5, h.a.contour),
      ],
    };
  };
  const cr = CROCHETS.map(crochet);

  // ── La marmite, pendue par son anse au crochet du milieu ─────────────────────────────
  const R = 34, ry = 7, HM = 46;
  // le haut de l'anse est le creux même du chicot : le bout du fil se perd dans le coin du cran, sans le dépasser
  const pc = cr[1].creux[0], ya = cr[1].creux[1], rim = ya + 30, bas = rim + HM;
  const oreilleG = [pc - R * 0.72, rim + ry * 0.7], oreilleD = [pc + R * 0.72, rim - ry * 0.7];
  const marmite = [
    h.path(`M${f(pc - R)} ${f(rim)} L${f(pc - R)} ${f(bas)} A${R} ${ry} 0 0 0 ${f(pc + R)} ${f(bas)} L${f(pc + R)} ${f(rim)} A${R} ${ry} 0 0 0 ${f(pc - R)} ${f(rim)} Z`, blancSans),
    h.path(`M${f(pc + R * 0.5)} ${f(rim + ry * 0.87)} L${f(pc + R * 0.5)} ${f(bas + ry * 0.87)} A${R} ${ry} 0 0 0 ${f(pc + R)} ${f(bas)} L${f(pc + R)} ${f(rim)} A${R} ${ry} 0 0 1 ${f(pc + R * 0.5)} ${f(rim + ry * 0.87)} Z`, h.a.ombre),
    h.ellipse(pc, rim, R, ry, h.a.loin),
    h.ellipse(pc, rim, R - 3, ry - 1.6, h.a.detail),
    h.path(`M${f(pc - R)} ${f(rim)} L${f(pc - R)} ${f(bas)} A${R} ${ry} 0 0 0 ${f(pc + R)} ${f(bas)} L${f(pc + R)} ${f(rim)}`, h.a.contour),
    h.ellipse(pc, rim, R, ry, h.a.arete),
    // la moitié arrière de l'anse, du creux à l'oreille de droite : elle passe derrière la tige du crochet
    h.path(`M${f(pc)} ${f(ya)} C${f(pc + 12)} ${f(ya)} ${f(oreilleD[0] + 3)} ${f(ya + 8)} ${f(oreilleD[0])} ${f(oreilleD[1])}`, h.a.arete),
    h.cercle(oreilleD[0], oreilleD[1], 2.6, blancArete),
  ];
  // la moitié avant de l'anse, de l'oreille de gauche au creux : elle passe devant la base du chicot et se couche au
  // fond du cran ; on la peint après les crochets
  const anseAvant = [
    h.path(`M${f(oreilleG[0])} ${f(oreilleG[1])} C${f(oreilleG[0] - 4)} ${f(ya + 6)} ${f(pc - 12)} ${f(ya)} ${f(pc)} ${f(ya)}`, h.a.arete),
    h.cercle(oreilleG[0], oreilleG[1], 2.6, blancArete),
  ];

  // ── Le geste : monter ou descendre d'un cran, de la hauteur du crochet court à celle du crochet long ─────────
  const xg = pc - R - 12;
  const y1 = cr[0].creux[1] + 3, y3 = cr[2].creux[1] + 4;
  const geste = h.geste(`M${f(xg)} ${f(y1)} L${f(xg)} ${f(y3)}`, { double: true });

  return {
    ref: '18-01',
    titre: 'La crémaillère pour cuire dehors',
    desc: 'Vue de face, en hiver. À gauche, un long mur de neige tassée, au dessus arrondi, dressé du côté d’où vient le vent ; le vent bute dessus. À droite du mur, deux branches fourchues plantées dans la neige, une barre posée au fond des deux fourches. Trois crochets de branche, un court, un moyen, un long, enjambent la barre : chacun est une fourche renversée, la barre coincée dans le creux ; en bas, un chicot fait un second creux. La marmite pend par son anse au crochet du milieu, au-dessus d’un feu bas : un lit de braises et quelques petites flammes. Une flèche double à côté de la marmite : on la monte au crochet court ou on la descend au crochet long, sans la soulever. Aucune cote ; la marmite donne l’échelle.',
    format: 'demi',
    vues: {
      scene: {
        dessin: z => [
          ...sol, ...mur, ...vent, ...feu,
          ...fG.dessous, ...fD.dessous,
          ...marmite,
          ...cr.flatMap(c => c.dessous),
          ...anseAvant,
          ...barre,
          ...fG.dessus, ...fD.dessus,
          ...cr.flatMap(c => c.dessus),
          geste,
        ].join('\n'),
        renvois: z => [
          { n: 1, rond: [446, 186], cible: [401, 212], texte: 'cuire sur un feu bas et des braises' },
          { n: 2, rond: [22, 76], cible: [58, 110], texte: 'tasser la neige en mur du côté du vent' },
          { n: 3, rond: [520, 196], cible: [fD.pied[0] + 1.5, fD.pied[1]], texte: 'planter deux branches fourchues' },
          { n: 4, rond: [536, 42], cible: [XB1 + 1.5, YB], texte: 'poser une barre dans les fourches' },
          { n: 5, rond: [434, 100], cible: [CROCHETS[2].x - 6 + RH + 1, 104], texte: 'pendre des crochets à différentes hauteurs' },
          { n: 6, rond: [xg - 30, 150], cible: [xg - 2, (y1 + y3) / 2 + 10], texte: 'monter ou descendre la marmite d’un cran' },
        ],
      },
    },
  };
};
