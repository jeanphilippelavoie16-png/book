// Modèle : main droite qui serre un manche vertical, vue côté paume.
// Pas une planche du livre. Version finale de prise-paume-reprise.js (8 corrections du juge).
// dessiner(x, y, echelle, opt) rend le SVG ; à porter dans formes.js.
//
// Ce que prisePaume2 ratait, et ce qui change ici :
//   - les doigts étaient quatre boudins égaux posés à plat, bouts vers l'extérieur (la « pince de
//     homard ») : ici ils s'enroulent DEVANT le manche, on voit le dos de leurs phalanges moyennes,
//     les ongles, et les bouts reviennent se loger contre le gras de la paume ;
//   - longueurs : le majeur dépasse le plus, l'auriculaire est le plus court et le plus bas ;
//   - le pouce était un cinquième boudin couché sous les doigts : ici il part de l'éminence
//     thénar, saille à sa jointure et croise DEVANT l'index, le bout sur le majeur ;
//   - la paume était vide : éminence thénar (bord radial bombé, pli qui la borne), hypothénar
//     (le talon côté auriculaire), plis du poignet ;
//   - le pouce en haut (la main tournée de 180° par rapport à prisePaume2 : poignet à droite),
//     comme on tient vraiment un manche debout ; l'auriculaire est donc en bas.
//
// Repère en mm d'adulte (échelle 1) : origine au centre du manche, à la limite majeur/annulaire ;
// x vers le poignet (à droite), y vers le bas. Manche Ø 32 : x -16 … +16.
//   pli du poignet x ≈ 102 (largeur 61) ; avant-bras coupé à x 150
//   jointures moyennes (bord gauche du poing) : index -33.5 · majeur -37 · annulaire -35 · auriculaire -29
//   bandes des doigts : index -41/-21 · majeur -21/-1.5 · annulaire -1.5/17.5 · auriculaire 17.5/34
//   bouts des doigts contre la paume : majeur 21 · annulaire 20 · auriculaire 15 (l'index, sous le pouce)
//   pouce : jointure de la base (33, -54) → jointure (0, -36) → bout (-29, -29), posé sur le majeur
//   du bout du majeur replié au poignet ≈ 140 ; main ouverte ≈ 190

function dessiner(x, y, s = 1, opt = {}) {
  const N = '#1A1A1A';
  const f = v => +v.toFixed(2);
  const P = p => `${f(x + p[0] * s)} ${f(y + p[1] * s)}`;
  const trait = ep => `fill="none" stroke="${N}" stroke-width="${ep}" stroke-linecap="round" stroke-linejoin="round"`;
  const blanc = `fill="#FFFFFF" stroke="none"`;
  // Catmull-Rom : passe par chaque point. ferme : boucle. [a, b] : seulement les segments a → b
  const cr = (pts, { ferme = false, de = 0, a = null } = {}) => {
    const n = pts.length, Q = i => ferme ? pts[((i % n) + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
    const fin = a === null ? (ferme ? n : n - 1) : a;
    let d = `M${P(Q(de))}`;
    for (let i = de; i < fin; i++) {
      const p0 = Q(i - 1), p1 = Q(i), p2 = Q(i + 1), p3 = Q(i + 2);
      d += ` C${P([p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6])} ${P([p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6])} ${P(p2)}`;
    }
    return a === null && ferme ? d + ' Z' : d;
  };
  const out = [];
  const chemin = (pts, ep, o) => out.push(`<path d="${cr(pts, o)}" ${trait(ep)}/>`);
  const plein = (pts, o = {}) => out.push(`<path d="${cr(pts, { ...o, ferme: true })}" ${blanc}/>`);

  // ── 1. la paume et l'avant-bras (derrière tout, sauf le vide) ──
  const haut = [[125, -33.6], [106, -31.8], [88, -30.6], [72, -39.5], [54, -48], [40, -50.8], [30, -54]];
  const bas = [[13, 27.5], [18, 31], [28, 37], [44, 40.2], [60, 39.6], [76, 34.4], [88, 29.4], [106, 30], [125, 32]];
  plein([...haut, [12, -48], [-14, -40], [-14, 30], ...bas]);
  chemin(bas, 1.5);
  // le pli qui borne l'éminence thénar : il prolonge le dessous du pouce et descend au poignet
  chemin([[21, -26.8], [26.6, -21.4], [33, -12.6], [43, -5.6], [57, -2], [71, -1.8], [85, -0.5]], 0.5);
  // le talon de la main côté auriculaire : un pli court qui le détache du creux de la paume
  chemin([[27, 29.6], [40, 30.8], [53, 28.8]], 0.5);
  // les plis du poignet
  chemin([[91, -13], [89.6, -6], [89.4, 2], [90.4, 9]], 0.5);
  chemin([[96.6, -4], [96, 0.6], [96.4, 5]], 0.5);

  // ── 2. le manche : il passe devant la paume, derrière les doigts ──
  const [mh, mb] = opt.manche || [110, 110];
  const bois = opt.bois || `fill="url(#h-bois)" stroke="${N}" stroke-width="1.4" stroke-linejoin="round"`;
  for (const [y0, y1] of [[-mh, -36], [22, mb]]) {
    const r = `x="${f(x - 16 * s)}" y="${f(y + y0 * s)}" width="${f(32 * s)}" height="${f((y1 - y0) * s)}"`;
    out.push(`<rect ${r} ${blanc}/>`, `<rect ${r} ${bois}/>`);
  }

  // ── 3. les doigts, de l'auriculaire à l'index ──
  // Chaque doigt, en projection : du dos de la jointure moyenne (à gauche, pliée à angle droit
  // contre le bord du manche) au bout replié contre la paume (à droite). On voit le dos de la
  // phalange moyenne et de la dernière, avec l'ongle. xg bord gauche, xb bout, yg/yb le milieu
  // aux deux bouts, h0 demi-largeur à la jointure, h1 au bout.
  const doigt = (xg, yg, xb, yb, h0, h1, recouvre = 2.4) => {
    const L = Math.hypot(xb - xg, yb - yg), u = [(xb - xg) / L, (yb - yg) / L], n = [-u[1], u[0]];
    const at = (q, t) => [xg + u[0] * q + n[0] * t, yg + u[1] * q + n[1] * t];   // t > 0 : vers le bas
    const sD = L * 0.8;   // la jointure du bout : la dernière phalange replonge vers la paume, en raccourci
    // le profil : [q, demi-largeur] ; la jointure moyenne la plus large, la phalange moyenne qui
    // s'affine, la jointure du bout qui renfle à peine, la dernière phalange qui s'effile
    const prof = [[4, h0 * 0.97], [9, h0], [16, h0 * 0.93], [sD - 6, h0 * 0.88], [sD, h0 * 0.87], [sD + (L - h1 * 0.95 - sD) * 0.5, (h0 * 0.87 + h1) * 0.5], [L - h1 * 0.95, h1]];
    // recouvre : le bord du dessous descend sur le doigt voisin, peint avant, pour qu'un seul trait les sépare
    const dessus = prof.map(([q, w]) => at(q, -w)), dessous = prof.slice().reverse().map(([q, w], i, A) => at(q, w + recouvre * Math.min(1, (L - q) / 14)));
    const c = L - h1 * 0.95;
    const bout = [-50, -22, 0, 22, 50].map(d => { const r = d * Math.PI / 180; return at(c + h1 * 0.95 * Math.cos(r), h1 * Math.sin(r)); });
    // la jointure pliée : un bout presque carré, aux coins arrondis
    const jointure = [at(1.8, h0 * 0.78 + recouvre * 0.35), at(0.2, h0 * 0.34), at(0, -h0 * 0.16), at(1.1, -h0 * 0.68)];
    const pts = [...dessus, ...bout, ...dessous, ...jointure];   // dessus 0-6 · bout 7-11 · dessous 12-18 · jointure 19-22
    return { pts, at, L, sD, h0, h1, c };
  };
  const D = {
    auriculaire: doigt(-28.5, 25.8, 16.2, 21.2, 8.3, 6.2, 0),
    annulaire: doigt(-34.5, 8, 16.8, 6, 9.5, 7.1),
    majeur: doigt(-36, -11.4, 17.5, -12.4, 9.8, 7.4),
    index: doigt(-33, -31, 4, -30.6, 9.8, 7.2),
  };
  for (const nom of ['auriculaire', 'annulaire', 'majeur', 'index']) {
    const d = D[nom], n = d.pts.length, at = d.at;
    plein(d.pts);
    chemin(d.pts, 0.7, { ferme: true });
    // la silhouette : le dos de la jointure moyenne, à gauche ; l'auriculaire aussi par-dessous,
    // l'index par-dessus
    chemin(d.pts, 1.5, { ferme: true, de: nom === 'auriculaire' ? 11 : 17, a: nom === 'index' ? n + 5 : n + 1 });
    // l'ongle, vu de dos, sur la dernière phalange ; son bord libre reste en deçà du bout
    // (celui de l'index est sous le pouce)
    if (nom !== 'index') {
    const w = d.h1 * 0.7, rf = d.h1 - 1.5, qf = c => d.c + 0.95 * Math.sqrt(Math.max(0, rf * rf - c * c));
    const q0 = Math.max(d.sD + 1.2, qf(0) - 7);   // la lunule : 7 mm en deçà du bord libre
    const libre = [-1, -0.6, 0, 0.6, 1].map(k => at(qf(k * w), k * w));   // le bord libre, convexe vers le bout
    chemin([at(q0 + 1.4, -w), at(q0 + 0.3, -w * 0.55), at(q0, 0), at(q0 + 0.3, w * 0.55), at(q0 + 1.4, w), ...libre.slice().reverse()], 0.5, { ferme: true });
    }
    // les plis, à peine : un sur le dos de la jointure moyenne, un sur celle du bout
    const pli = (q, k, b = 0.5) => chemin([at(q - b, -d.h0 * k), at(q + b * 0.5, -d.h0 * k * 0.5), at(q + b, 0), at(q + b * 0.5, d.h0 * k * 0.5), at(q - b, d.h0 * k)], 0.5);
    if (nom !== 'index') { pli(8.5, 0.40); pli(d.sD, 0.28); }
  }

  // ── 4. le pouce, par-dessus : de l'éminence thénar, en travers devant l'index ──
  const pouceHaut = [[40, -50.8], [30, -54], [22, -54.2], [13, -51.8], [9, -48], [2, -44.6], [-6, -40], [-13, -35.8], [-17.6, -31.4]];
  const pouceBout = [[-19.6, -26], [-17.8, -20.8], [-12.6, -17.6]];
  const pouceBas = [[-5, -18.4], [4, -21.6], [13, -25.4], [20, -27.2], [25, -26.8]];
  const pouce = [...pouceHaut, ...pouceBout, ...pouceBas];
  plein([...pouce, [32, -32], [46, -44]]);
  // la silhouette du dessus en un seul chemin : du poignet, le bord de la paume, puis le dessus du pouce
  const tour = [...haut, ...pouceHaut.slice(2), ...pouceBout];
  chemin([...tour, pouceBas[0]], 1.5);
  chemin(pouce, 1.0, { de: pouceHaut.length + pouceBout.length - 1 });
  // l'ongle du pouce, vu de trois quarts : décalé vers le dessus. Repère le long de la dernière
  // phalange : s depuis la jointure (0, -35) vers le bout, t vers le haut.
  const u = [-0.929, 0.374], at = (q, t) => [4 + u[0] * q - 0.374 * t, -33 + u[1] * q - 0.929 * t];
  chemin([at(21.2, 5.4), at(13.6, 6.2), at(11, 4.2), at(10.2, 1), at(11, -2.2), at(13.6, -3.6), at(21, -3)], 0.5);
  // les plis du dos de la jointure du pouce, et la jointure de sa base
  chemin([[5.2, -42.4], [4.2, -40.2], [4.4, -38]], 0.5);
  chemin([[1.6, -41], [0.9, -39.4], [1, -37.8]], 0.5);
  chemin([[30.6, -52.4], [29, -49], [28.8, -45.6]], 0.5);
  return out.join('\n');
}

module.exports = (h) => ({
  ref: 'modele',
  titre: 'La prise, côté paume',
  desc: 'Modèle : main droite qui serre un manche vertical, vue côté paume.',
  fichier: '_modeles-prise-paume-final.svg',
  format: 'pleine',
  disposition: [['a']],
  vues: {
    a: {
      dessin: z => {
        const e = (z.l - 30) / 165, x0 = 15 + 38 * e, y0 = z.h * 0.5;
        return dessiner(x0, y0, e, { manche: [y0 / e - 2, (z.h - y0) / e - 2], bois: h.a.hachure('bois', 'arete') });
      },
    },
  },
});
module.exports.dessiner = dessiner;
