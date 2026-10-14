// Planche 62-16 — Le paleron, la palette et l'épaule.
// Chapitre 62, tableau 5.4 (paleron = M. infraspinatus, derrière l'épine ; palette = M. supraspinatus,
// devant ; épaule = M. triceps brachii) et § 5.6 (le chef long du triceps va à la salaison). Documentation :
// suivi/62-documentation-planches.md, section 19 (ce qui est établi, vue par vue), section 2
// (conventions), section 3 (écart n° 3 : « dessus / dessous » ne correspondait à aucune position ;
// JP a gardé, le 29 septembre 2026, les noms du ch. 64 : paleron derrière l'épine, palette devant ;
// planche retitrée et renvois 1, 2 et 6 refaits), et la carcasse commune (_carcasse-orignal.js).
// Aucune cote : on ne construit rien.
//
// Vue 1 — où ils sont : l'avant de la carcasse commune, du garrot au coude, profil gauche ; l'épine
//   de l'omoplate en trait fort, l'olécrane repassé. Le supraspinatus DEVANT
//   l'épine de l'omoplate (hachures fines), l'infraspinatus DERRIÈRE (points), le triceps dans
//   l'angle du bord arrière de l'omoplate et de l'humérus, jusqu'à l'olécrane (traits
//   horizontaux) : SISSON fig. 304 (z, z', f, f'), GUELPH, CEE-ONU 9229 et 9231. Le deltoïde en
//   contour, sans renvoi (section 19).
// Vue 2 — le couteau suit les coutures, en gros plan sur l'omoplate : de chaque côté de l'épine (les deux muscles sortent de
//   leur fosse, IMPS 116B « natural seams »), le long du bord arrière de l'omoplate (entre
//   l'infraspinatus et le chef long, fig. 304), entre les chefs du triceps (« clearly divisible into
//   three heads », SISSON ; « coutures nettes », chapitre). Aucun sens de coupe n'est établi pour
//   ces coutures : pas de flèche (même règle qu'à la 62-06).
// Vue 3 — l'infraspinatus vu sur la tranche : la lame tendineuse dans son épaisseur, qui ne le
//   partage qu'en partie et sort au bout de l'épaule en tendon d'insertion (SISSON : « A thick
//   tendinous layer partially divides the muscle into two strata, and, coming to the surface at
//   the shoulder joint, constitutes the chief means of insertion ») ; la refente à plat le long de
//   la lame (IMPS 114D, « butterfly cut »), fléchée depuis le tendon, seul endroit où la lame se
//   voit ; puis les deux moitiés écartées, la lame retirée entre elles, le grain en arête de
//   poisson vers la lame (GUELPH, structure pennée).
// Vue 4 — le supraspinatus sorti, en cône (CEE-ONU 9229), sans flèche : grain non établi.
// Vue 5 — le triceps en trois chefs écartés à leurs coutures, dans leur position : le chef long,
//   le plus gros, avec ses flèches (fibres obliques ; obliquité recopiée sur les hachures de f,
//   fig. 304) ; le latéral et le médial sans flèche. Le médial, caché de profil, est posé à part :
//   chez le bœuf il va jusqu'au col de l'humérus (SISSON).
//
// Les contours du triceps sont redessinés ici, sur les os du module : le chef long du module est
// une bande étroite, alors que la fig. 304 et SISSON le montrent qui remplit tout l'angle entre le
// bord arrière de l'omoplate et l'humérus. À reporter dans le module si la correction est retenue.
//
// NON ÉTABLI, donc pas dessiné : le grain du supraspinatus et des chefs latéral et médial ; la
// place de l'intersection tendineuse du chef long ; toute valeur d'angle (les arêtes de
// l'infraspinatus sont un choix de dessin) ; toute dimension, toute épaisseur.
'use strict';
const C = require('./_carcasse-orignal');

module.exports = (h) => {
  const NOIR = '#1A1A1A', BLANC = '#FFFFFF';
  const f1 = v => Math.round(v * 10) / 10;
  const dd = (pts, ferme) => 'M' + pts.map(p => `${f1(p[0])} ${f1(p[1])}`).join(' L') + (ferme ? ' Z' : '');
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const unit = v => { const L = Math.hypot(v[0], v[1]) || 1; return [v[0] / L, v[1] / L]; };
  const trait = (ep, extra = '') => `fill="none" stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="round"${extra}`;
  const dedans = (q, poly) => {
    let c = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const a = poly[i], b = poly[j];
      if ((a[1] > q[1]) !== (b[1] > q[1]) && q[0] < (b[0] - a[0]) * (q[1] - a[1]) / (b[1] - a[1]) + a[0]) c = !c;
    }
    return c;
  };

  // ─── Géométrie, dans le repère U du module ──────────────────────────────────────────────
  const SUPRA = C.MUSCLES.susEpineux.pts;        // devant l'épine
  const INFRA = C.MUSCLES.sousEpineux.pts;       // derrière l'épine
  const DELTO = C.MUSCLES.deltoide.pts;          // en contour seulement
  // l'épine de l'omoplate (le module ne l'exporte pas ; mêmes points que son EPINE_OMOPLATE)
  const EPINE = [[740, 333], [726, 375], [710, 420], [694, 465], [682, 500], [674, 522]];
  // Bord arrière de l'infraspinatus = couture avec le chef long, le long du bord arrière de
  // l'omoplate (fig. 304 : z' et f se touchent sur ce bord).
  const BORD_ARRIERE = [[834, 382], [822, 392], [798, 404], [770, 432], [742, 462], [716, 496], [698, 524], [690, 544]];
  // Couture entre le chef long et le chef latéral : du col de l'omoplate à l'olécrane (fig. 304 : f / f').
  const COUTURE_CHEFS = [[694, 550], [704, 568], [716, 588], [730, 608], [746, 628], [762, 644], [776, 654]];
  // Chef long : tout l'angle entre le bord arrière de l'omoplate et l'humérus, jusqu'à l'olécrane ;
  // bord caudal bombé (fig. 304, f).
  const LONG = [[834, 382], [848, 404], [851, 442], [845, 486], [833, 534], [817, 582], [801, 620], [789, 642],
    ...COUTURE_CHEFS.slice().reverse().slice(1), ...BORD_ARRIERE.slice(1, -1).reverse()];
  // Chef latéral : sous le chef long, sur la face externe du bras, au-dessus du coude (fig. 304, f').
  const LAT = [...COUTURE_CHEFS, [772, 666], [756, 675], [736, 677], [718, 669], [704, 653], [692, 632], [685, 608], [683, 584], [687, 564]];
  // Chef médial (face interne, caché de profil) : le long de l'humérus, du col à l'olécrane
  // (SISSON, bœuf). Largeur : non établie, fuseau étroit.
  const MED_AXE = [[664, 566], [690, 598], [716, 626], [742, 648], [768, 664]];
  const MED_LARG = [6, 18, 24, 22, 8];
  const fuseau = (axe, larg) => {
    const g = [], d = [];
    const A = C.dense(axe, 2), n = A.length;
    const w = t => { const x = t * (larg.length - 1), i = Math.min(larg.length - 2, Math.floor(x)), u = x - i; return (larg[i] * (1 - u) + larg[i + 1] * u) / 2; };
    A.forEach((p, i) => {
      const t = unit(sub(A[Math.min(n - 1, i + 1)], A[Math.max(0, i - 1)])), e = w(i / (n - 1));
      g.push([p[0] + t[1] * e, p[1] - t[0] * e]); d.push([p[0] - t[1] * e, p[1] + t[0] * e]);
    });
    const t0 = unit(sub(A[0], A[3])), t1 = unit(sub(A[n - 1], A[n - 4]));
    return C.dense([...g, [A[n - 1][0] + t1[0] * 5, A[n - 1][1] + t1[1] * 5], ...d.reverse(), [A[0][0] + t0[0] * 5, A[0][1] + t0[1] * 5]], 2, true);
  };
  const MED = fuseau(MED_AXE, MED_LARG);

  // ─── Vues 1 et 2 : l'épaule sur la carcasse ─────────────────────────────────────────────
  // Vue 1 : tout l'avant de la carcasse, du garrot au coude, pour situer ; vue 2 : gros plan.
  const CADRE_SITU = [490, 130, 900, 760];
  const CADRE_GROS = [600, 280, 872, 700];
  const place = z => C.placer(z, { cadre: CADRE_SITU });
  const placeGros = z => C.placer(z, { cadre: CADRE_GROS });
  const lisse = (p, pts, ferme = false) => C.dense(pts, 3, ferme).map(p.T);
  const motifs = id => [
    `<pattern id="${id}-supra" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="3" stroke="${NOIR}" stroke-width="0.5"/></pattern>`,
    `<pattern id="${id}-infra" width="4" height="4" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="0.75" fill="${NOIR}" stroke="none"/><circle cx="3" cy="3" r="0.75" fill="${NOIR}" stroke="none"/></pattern>`,
    `<pattern id="${id}-tri" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(90)"><line x1="0" y1="0" x2="0" y2="4" stroke="${NOIR}" stroke-width="0.5"/></pattern>`,
  ].join('');
  const couture = pts => [
    `<path d="${dd(pts)}" fill="none" stroke="${BLANC}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`,
    `<path d="${dd(pts)}" ${trait(1.4, ' stroke-dasharray="5 3.5"')}/>`,
  ].join('\n');
  // décale une polyligne (en vue) de e pixels sur sa gauche, dans le sens de marche
  const aGauche = (pts, e) => pts.map((q, i) => {
    const t = unit(sub(pts[Math.min(pts.length - 1, i + 1)], pts[Math.max(0, i - 1)]));
    return [q[0] + t[1] * e, q[1] - t[0] * e];
  });

  const vueSituation = z => {
    const p = place(z);
    const S = lisse(p, SUPRA, true), I = lisse(p, INFRA, true), Lg = lisse(p, LONG, true), La = lisse(p, LAT, true);
    return [
      C.dessiner(h, p, {
        id: 'v1', loin: 'gris', fondOs: false,
        os: ['omoplate', 'cartilageOmoplate', 'humerus', 'radius', 'cubitus'],
        osForts: ['cubitus'],                   // l'olécrane ; l'épine est repassée en trait fort plus bas
      }),
      `<defs>${motifs('v1')}</defs>`,
      `<g clip-path="url(#v1-corps)">`,
      `<path d="${dd(S, true)}" fill="url(#v1-supra)" stroke="none"/>`,
      `<path d="${dd(I, true)}" fill="url(#v1-infra)" stroke="none"/>`,
      `<path d="${dd(Lg, true)}" fill="url(#v1-tri)" stroke="none"/>`,
      `<path d="${dd(La, true)}" fill="url(#v1-tri)" stroke="none"/>`,
      `<path d="${dd(lisse(p, DELTO, true), true)}" ${trait(0.7)}/>`,
      `<path d="${dd(S, true)}" ${trait(1.4)}/>`,
      `<path d="${dd(I, true)}" ${trait(1.4)}/>`,
      `<path d="${dd(Lg, true)}" ${trait(1.4)}/>`,
      `<path d="${dd(La, true)}" ${trait(1.4)}/>`,
      `<path d="${dd(lisse(p, EPINE), false)}" ${trait(1.4)}/>`,
      `</g>`,
    ].join('\n');
  };

  const vueCouteau = z => {
    const p = placeGros(z);
    const ep = lisse(p, EPINE);
    const k = p.k;
    return [
      C.dessiner(h, p, {
        id: 'v2', loin: 'gris', fondOs: false,
        os: ['omoplate', 'cartilageOmoplate', 'humerus', 'radius', 'cubitus'],
      }),
      `<g clip-path="url(#v2-corps)">`,
      ...[SUPRA, INFRA, LONG, LAT].map(m => `<path d="${dd(lisse(p, m, true), true)}" ${trait(0.7)}/>`),
      `<path d="${dd(lisse(p, DELTO, true), true)}" ${trait(0.5)}/>`,
      `<path d="${dd(ep)}" ${trait(1.4)}/>`,
      couture(aGauche(ep, 5).slice(2, -1)),
      couture(aGauche(ep, -5).slice(2, -1)),
      couture(lisse(p, BORD_ARRIERE)),
      couture(lisse(p, COUTURE_CHEFS)),
      `</g>`,
    ].join('\n');
  };

  // ─── Vues 3 à 5 : les morceaux sortis, à la même échelle ────────────────────────────────
  // L'infraspinatus sur la tranche, dans un repère local (x le long du muscle, du bout de
  // l'omoplate, 0, au bout de l'épaule, 216 ; y l'épaisseur, face externe en haut). Longueur prise
  // au contour du module ; épaisseur non établie : un choix de dessin, sans cote.
  const LI = 216;
  const HAUT = [[0, -4], [8, -13], [28, -19], [60, -23], [100, -24], [140, -23], [172, -19], [196, -14], [210, -8], [216, -3]];
  const BAS = [[216, 3], [210, 9], [196, 15], [172, 20], [140, 24], [100, 25], [60, 23], [28, 18], [8, 11], [0, 4]];
  const DEBUT_LAME = 48;                  // la lame ne partage le muscle qu'en partie (SISSON)
  const FIN_TENDON = 250;
  const LAME = [[DEBUT_LAME, 0], [DEBUT_LAME + 24, -2.2], [LI, -2.6], [FIN_TENDON - 6, -3.6], [FIN_TENDON, -2], [FIN_TENDON, 2],
    [FIN_TENDON - 6, 3.6], [LI, 2.6], [DEBUT_LAME + 24, 2.2]];
  const ECART = 13;                       // les deux moitiés écartées
  // les coins de la face coupée, au milieu de la liste : la spline fermée ne casse qu'aux coins intérieurs
  const moitieHaut = [...HAUT.slice(4, 9), [LI, 0, 'c'], [0, 0, 'c'], ...HAUT.slice(1, 4)];
  const moitieBas = [...BAS.slice(4, 9), [0, 0, 'c'], [LI, 0, 'c'], ...BAS.slice(1, 4)];
  const GAP_AB = 40;                       // entre la vue entière et la vue ouverte
  const Y_A = 0, Y_B = 25 + GAP_AB + 24 + ECART;   // axes des deux états
  const DIR_ARETE = 25 * Math.PI / 180;   // choix de dessin : aucune valeur d'angle n'est établie
  // une paire par rang, à la même abscisse : chaque paire fait un chevron, la pointe vers le tendon
  const aretesHaut = [48, 112, 176].map(x => [x, -12]);
  const aretesBas = [48, 112, 176].map(x => [x, 12]);
  const infraBoite = [0, -25, FIN_TENDON + 4, Y_B + ECART + 26];

  // Le supraspinatus et le triceps : dans leur position sur la carcasse (même orientation que la vue 1).
  const D_LAT = [-22, 30], D_MED = [-112, 30];   // chefs écartés à leurs coutures
  const bouge = (pts, d) => pts.map(q => [q[0] + d[0], q[1] + d[1]]);
  const LONG_S = C.dense(LONG, 2, true), LAT_S = bouge(C.dense(LAT, 2, true), D_LAT), MED_S = bouge(MED, D_MED);
  const SUPRA_S = C.dense(SUPRA, 2, true);
  const bb = pts => [Math.min(...pts.map(q => q[0])), Math.min(...pts.map(q => q[1])), Math.max(...pts.map(q => q[0])), Math.max(...pts.map(q => q[1]))];
  const triBoite = bb([...LONG_S, ...LAT_S, ...MED_S]);
  const supraBoite = bb(SUPRA_S);
  // Fibres du chef long : une famille parallèle, l'obliquité des hachures de f (fig. 304), qui
  // descendent du bord de l'omoplate vers l'olécrane.
  const DIR_LONG = unit([0.34, 0.94]);
  const GRAIN_LONG = [[812, 440], [786, 484], [827, 500], [758, 532], [800, 548], [772, 594]];

  // Une seule échelle pour les trois vignettes : la plus petite qui les fait tenir. Les trois
  // vues sont dans la même rangée : même hauteur, largeurs connues (règle du compositeur :
  // largeur utile 600, gouttière 22, partagée selon LARGEURS).
  const LARGEURS = { infra: 3.7, supra: 1.8, triceps: 4.5 };
  const SOMME_L = LARGEURS.infra + LARGEURS.supra + LARGEURS.triceps;
  const largeurVue = id => Math.floor((600 - 2 * 22) * LARGEURS[id] / SOMME_L);
  const marge = { infra: [30, 18], supra: [10, 12], triceps: [30, 16] };
  const BOITES = { infra: infraBoite, supra: supraBoite, triceps: triBoite };
  const echelle = hVue => Math.min(...Object.keys(BOITES).map(id => {
    const B = BOITES[id];
    return Math.min((largeurVue(id) - 2 * marge[id][0]) / (B[2] - B[0]), (hVue - 2 * marge[id][1]) / (B[3] - B[1]));
  }));
  const poseur = (id, B) => z => {
    const k = echelle(z.h);
    const cx = (B[0] + B[2]) / 2, cy = (B[1] + B[3]) / 2;
    return { k, T: q => [z.l / 2 + (q[0] - cx) * k, z.h / 2 + (q[1] - cy) * k] };
  };
  const poseInfra = poseur('infra', infraBoite), poseSupra = poseur('supra', supraBoite), poseTri = poseur('triceps', triBoite);

  // flèche de grain : double pointe, trait 0,7
  const grain = (c, dir, L) => {
    const a = [c[0] - dir[0] * L / 2, c[1] - dir[1] * L / 2], b = [c[0] + dir[0] * L / 2, c[1] + dir[1] * L / 2];
    return `<path d="${dd([a, b])}" fill="none" stroke="${NOIR}" stroke-width="0.7" stroke-linecap="round" marker-start="url(#fl)" marker-end="url(#fl)"/>`;
  };

  const vueInfra = z => {
    const P = poseInfra(z), k = P.k;
    const T = (pts, dy = 0, dx = 0) => pts.map(q => P.T([q[0] + dx, q[1] + dy]));
    const entier = C.dense([...HAUT, ...BAS], 2, true);
    const lame = C.dense(LAME, 1, true);
    const out = [];
    // A — entier, sur la tranche : la lame dans l'épaisseur, la refente fléchée le long
    out.push(`<path d="${dd(T(entier, Y_A), true)}" fill="${BLANC}" ${trait(2.4).replace('fill="none" ', '')}/>`);
    out.push(`<path d="${dd(T(lame, Y_A), true)}" fill="${NOIR}" stroke="${NOIR}" stroke-width="0.5"/>`);
    const fl = T([[LI + 14, -12], [DEBUT_LAME + 4, -12]], Y_A);
    out.push(h.geste(dd(fl)));   // la charte : la refente, le geste, en rouge
    // B — ouvert : les deux moitiés écartées, la lame retirée entre elles
    const yB = Y_B;
    out.push(`<path d="${dd(T(C.dense(moitieHaut, 2, true), yB - ECART), true)}" fill="${BLANC}" ${trait(2.4).replace('fill="none" ', '')}/>`);
    out.push(`<path d="${dd(T(C.dense(moitieBas, 2, true), yB + ECART), true)}" fill="${BLANC}" ${trait(2.4).replace('fill="none" ', '')}/>`);
    out.push(`<path d="${dd(T(lame, yB), true)}" fill="${NOIR}" stroke="${NOIR}" stroke-width="0.5"/>`);
    const Lg = 24 * k;
    const dH = [Math.cos(DIR_ARETE), Math.sin(DIR_ARETE)], dB = [Math.cos(DIR_ARETE), -Math.sin(DIR_ARETE)];
    aretesHaut.forEach(c => out.push(grain(P.T([c[0], c[1] + yB - ECART]), dH, Lg)));
    aretesBas.forEach(c => out.push(grain(P.T([c[0], c[1] + yB + ECART]), dB, Lg)));
    return out.join('\n');
  };

  const vueSupra = z => {
    const P = poseSupra(z);
    return `<path d="${dd(SUPRA_S.map(P.T), true)}" fill="${BLANC}" ${trait(2.4).replace('fill="none" ', '')}/>`;
  };

  const vueTriceps = z => {
    const P = poseTri(z), k = P.k;
    const Lg = 26 * k;
    return [
      `<path d="${dd(MED_S.map(P.T), true)}" fill="${BLANC}" ${trait(2.4).replace('fill="none" ', '')}/>`,
      `<path d="${dd(LAT_S.map(P.T), true)}" fill="${BLANC}" ${trait(2.4).replace('fill="none" ', '')}/>`,
      `<path d="${dd(LONG_S.map(P.T), true)}" fill="${BLANC}" ${trait(2.4).replace('fill="none" ', '')}/>`,
      ...GRAIN_LONG.map(c => grain(P.T(c), DIR_LONG, Lg)),
    ].join('\n');
  };

  return {
    ref: '62-16',
    titre: 'Le paleron, la palette et l’épaule',
    desc: "Cinq vues. En haut à gauche, l'avant de la carcasse d'orignal, profil gauche, du garrot au coude, l'épine "
      + "de l'omoplate en trait fort : devant l'épine, le supraspinatus (la palette) en hachures fines ; derrière l'épine, "
      + "l'infraspinatus (le paleron) en points ; dans l'angle entre le bord arrière de l'omoplate et l'humérus, "
      + "le triceps (épaule) en traits horizontaux, jusqu'à la pointe du coude ; le deltoïde en contour fin. En haut à "
      + "droite, les mêmes muscles et leurs coutures en tireté : une de chaque côté de l'épine, une le long du bord "
      + "arrière de l'omoplate, une entre les chefs du triceps. En bas, les morceaux sortis, à la même échelle : "
      + "l'infraspinatus vu sur la tranche, la lame de nerf en noir dans son épaisseur, qui sort au bout en tendon, et "
      + "une flèche le long de la lame depuis le tendon ; puis ses deux moitiés écartées, la lame retirée entre elles, "
      + "le grain en arête de poisson vers la lame. Le supraspinatus, en cône, sans flèche. Le triceps en trois chefs "
      + "écartés : le chef long, le plus gros, celui qui se sale, avec des flèches de grain obliques ; le latéral et le "
      + "médial, posé à part parce qu'il est sur la face interne, sans flèche.",
    format: 'pleine',
    disposition: [['situation', 'couteau'], ['infra', 'supra', 'triceps']],
    hauteurs: [1.35, 1],
    largeurs: [[1, 1], [LARGEURS.infra, LARGEURS.supra, LARGEURS.triceps]],
    vues: {
      situation: {
        titre: 'Où ils sont',
        dessin: vueSituation,
        renvois: z => {
          const p = place(z);
          return [
            { n: 1, texte: 'paleron, derrière l’épine — M. infraspinatus', rond: [z.l - 14, p.pt([0, 330])[1]], cible: p.pt([792, 390]) },
            { n: 2, texte: 'palette, devant l’épine — M. supraspinatus', rond: [14, p.pt([0, 400])[1]], cible: p.pt([688, 430]) },
            { n: 3, texte: 'épaule — M. triceps brachii', rond: [z.l - 14, p.pt([0, 520])[1]], cible: p.pt([815, 520]) },
            { n: 4, texte: 'pointe du coude, olécrane', rond: [z.l - 14, p.pt([0, 690])[1]], cible: p.pt('olecrane') },
          ];
        },
      },
      couteau: {
        titre: 'Le couteau suit les coutures',
        dessin: vueCouteau,
        renvois: z => {
          const p = placeGros(z);
          return [
            { n: 5, texte: 'le long de l’épine, des deux côtés', rond: [14, p.pt([0, 350])[1]], cible: p.pt([718, 400]) },
            { n: 6, texte: 'entre le paleron et le triceps', rond: [z.l - 14, p.pt([0, 360])[1]], cible: p.pt([798, 404]) },
            { n: 7, texte: 'entre les chefs du triceps', rond: [z.l - 14, p.pt([0, 600])[1]], cible: p.pt([746, 628]) },
          ];
        },
      },
      infra: {
        titre: 'Infraspinatus',
        dessin: vueInfra,
        renvois: z => {
          const P = poseInfra(z);
          const cL = P.T([140, Y_A]), cM = P.T([80, Y_B - ECART - 12]);
          return [
            { n: 8, texte: 'lame de nerf, refendue à plat puis retirée', rond: [cL[0], Math.max(12, P.T([0, -25])[1] - 16)], cible: cL },
            { n: 9, texte: 'deux moitiés, grain en arête vers la lame', rond: [12, cM[1]], cible: cM },
          ];
        },
      },
      supra: {
        titre: 'Supraspinatus',
        dessin: vueSupra,
        renvois: () => [],
      },
      triceps: {
        titre: 'Triceps, trois chefs',
        dessin: vueTriceps,
        renvois: z => {
          const P = poseTri(z);
          const cL = P.T([827, 470]), cA = P.T([720 + D_LAT[0], 640 + D_LAT[1]]), cM = P.T([700 + D_MED[0], 604 + D_MED[1]]);
          return [
            { n: 10, texte: 'chef long, à saler : grain oblique', rond: [z.l - 12, cL[1] - 30], cible: cL },
            { n: 11, texte: 'chef latéral', rond: [cA[0] - 10, z.h - 12], cible: cA },
            { n: 12, texte: 'chef médial, sur la face interne', rond: [12, cM[1] - 40], cible: cM },
          ];
        },
      },
    },
  };
};
