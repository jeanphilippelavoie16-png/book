// Planche 62-13 — Le filet, la hampe et l'onglet, vus de l'intérieur.
// Chapitre 62, tableau 5.3 (filet ; hampe et onglet) et § 9, étape 4 (« le filet est de l'autre côté
// des vertèbres, dans la cavité »). Documentation : suivi/62-documentation-planches.md, section 16
// (ce qui est établi, vue par vue), section 2 (conventions) et « Base commune » (la carcasse du
// module images/planches-src/_carcasse-orignal.js). Aucune cote, aucune barre d'échelle : on ne
// construit rien et aucune dimension d'orignal n'est établie.
//
// Vue A — la carcasse commune, de profil gauche, os en transparence. Le filet (M. psoas major, avec
//   le M. iliacus au bout) sous les vertèbres lombaires, des dernières côtes au bassin (ACIA 28,
//   CEE-ONU 9201, SISSON). La couture qu'on ouvre suit le dessous des vertèbres puis l'ilium
//   (CEE-ONU 9201 : « from the last ribs to the hip along the line between the ventral surface of
//   the lumbar vertebrae and the lateral surface of the ilium ») ; la lame va des côtes vers la
//   hanche. L'attache du diaphragme sur les côtes (SISSON, bœuf) : de la dernière côte, un peu
//   au-dessus de son milieu, presque en ligne droite jusqu'à la jonction de la 8e côte et de son
//   cartilage, puis le long de ce cartilage jusqu'au sternum.
// Vue B — de la cavité, organes retirés, le regard vers l'avant et un peu vers le haut : la vue du
//   diaphragme de Sisson (fig. 275, cheval, face abdominale), inclinée de 30° pour découvrir le
//   plafond. En haut, le dos coupé à la 6e lombaire : longe au-dessus des apophyses transverses,
//   filet en dessous, petit psoas contre le corps de la vertèbre (ACIA 29). Les deux filets suivent
//   le plafond jusqu'à l'arcade du diaphragme, qui passe dessous (arc lombo-costal, SISSON). Les
//   piliers (onglet) montent le long des vertèbres ; le droit est le gros, fendu autour de
//   l'œsophage, le gauche est petit (SISSON, bœuf) ; le droit tient plus loin sur les lombaires que
//   le gauche (SISSON, cheval). Le rebord charnu (hampe) court le long des côtes, ses fibres du
//   rebord vers le centre (SISSON) ; le centre tendineux au milieu, en trois feuilles comme sur la
//   fig. 275 (sa forme chez le bœuf ou l'orignal n'est pas décrite). Projection orthogonale d'un
//   modèle simple : longueurs et hauteurs du repère U du module, largeur prise à la vue de dessus
//   du bœuf (Ellenberger, t13), faute de vue de dessus d'un cervidé.
// Vue C — le filet sorti d'une pièce, le bout épais côté hanche, l'iliacus collé. Aucune flèche de
//   grain : le grain du filet n'est pas établi.
// Vue D — l'onglet, muscle elliptique : le trait qui l'ouvre en portefeuille, puis ouvert, le tissu
//   épais du centre à retirer (IMPS 140). La hampe en bande (OQLF), fibres en travers : du rebord
//   vers le centre (SISSON). Aucun grain sur l'onglet : pas établi.
//
// Pas de rein ni de gras de rognon (NON ÉTABLI dans ces lignes du tableau), pas de ganglion, pas de
// main, pas de chiffre.
'use strict';
const C = require('./_carcasse-orignal');

module.exports = (h) => {
  const NOIR = '#1A1A1A', BLANC = '#FFFFFF';
  const f1 = v => Math.round(v * 10) / 10;
  const dD = (pts, ferme) => 'M' + pts.map(p => `${f1(p[0])} ${f1(p[1])}`).join(' L') + (ferme ? ' Z' : '');
  const trait = (ep, extra = '') => `fill="none" stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="round"${extra}`;
  const plein = (fond, ep, extra = '') => `fill="${fond}" stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round"${extra}`;
  const halo = ep => `fill="none" stroke="${BLANC}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="round"`;
  const POINTILLE = ' stroke-dasharray="0.1 3.4"';            // une couture qu'on ouvre : des points
  const rev = a => a.slice().reverse();
  const miroir = pts => pts.map(q => [-q[0], q[1], q[2]].filter(v => v !== undefined));
  const lisse = (pts, ferme = false, pas = 1.5) => C.dense(pts, pas, ferme);

  // Les trames : la même pour un même morceau d'une vue à l'autre.
  //   filet : traits serrés à 45° (la trame « gris » du module) ; onglet : points.
  const motifs = id => [
    `<pattern id="${id}-filet" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="3" stroke="${NOIR}" stroke-width="0.5"/></pattern>`,
    `<pattern id="${id}-onglet" width="4" height="4" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="0.75" fill="${NOIR}" stroke="none"/><circle cx="3" cy="3" r="0.75" fill="${NOIR}" stroke="none"/></pattern>`,
  ].join('');
  const trameFilet = id => `fill="url(#${id}-filet)" stroke="none"`;
  const trameOnglet = id => `fill="url(#${id}-onglet)" stroke="none"`;

  // ═══ Vue A : de profil ══════════════════════════════════════════════════════════════════════
  const CADRE_A = [786, 170, 1480, 900];
  const placeA = z => C.placer(z, { cadre: CADRE_A });
  // la couture du filet : le dessus du filet, contre le dessous des vertèbres puis de l'ilium
  const COUTURE_FILET = lisse([[962, 385], [1000, 383], [1060, 381], [1120, 382], [1180, 385], [1230, 394], [1272, 412], [1296, 428]]);
  // l'attache du diaphragme sur les côtes (SISSON) : dernière côte un peu au-dessus de son milieu,
  // ligne presque droite jusqu'à la jonction de la 8e côte et de son cartilage, puis ce cartilage
  const ATTACHE_A = lisse([[995, 422], [931, 518], [867, 613, 'c'], [832, 637], [798, 655]]);

  // ═══ Vue B : de la cavité ═══════════════════════════════════════════════════════════════════
  // Modèle en x, y du repère U (x vers la queue, y vers le bas) et z (largeur, + vers la droite de
  // la bête, qui est à droite du regard quand on regarde vers l'avant).
  const TH = 30 * Math.PI / 180, CO = Math.cos(TH), SI = Math.sin(TH);
  const P = (x, y, z) => [z, y * CO - x * SI];
  const XS = 1190;                                        // plan de coupe du dos, à la 6e lombaire
  const S = q => P(XS, q[1], q[0]);                       // un point (z, y) de la face coupée
  const W = 150;                                          // demi-largeur de la cage (vue de dessus du bœuf)
  const zMur = y => y < 500 ? 14 + (W - 14) * Math.sin((y - 380) / 120 * Math.PI / 2)
    : 15 + (W - 15) * Math.cos((y - 500) / 160 * Math.PI / 2);

  // l'attache costale du diaphragme, côté droit, de la dernière côte au sternum
  const ATT_R = (() => {
    const a = [997, 425], b = [867, 613], out = [];
    for (let i = 0; i <= 12; i++) { const t = i / 12, x = a[0] + (b[0] - a[0]) * t, y = a[1] + (b[1] - a[1]) * t; out.push(P(x, y, zMur(y))); }
    [[850, 624, 60], [830, 636, 40], [812, 647, 22], [796, 656, 0]].forEach(([x, y, z]) => out.push(P(x, y, z)));
    return out;
  })();
  const A_R = ATT_R[0];                                   // l'attache sur la dernière côte
  // l'arcade lombo-costale : du pilier, contre la vertèbre, par-dessous le filet, à la dernière côte
  const ARC_R = [P(1000, 395, 12), P(998, 404, 30), P(996, 411, 50), P(996, 418, 70), A_R];
  // le diaphragme entier (sa face du côté du ventre), dans le sens des aiguilles d'une montre
  const DIAPH = [...ARC_R, ...ATT_R.slice(1), ...rev(miroir(ATT_R)).slice(1), ...rev(miroir(ARC_R)).slice(1)];
  const DIAPH_L = [...lisse(ARC_R), ...lisse(ATT_R).slice(1), ...lisse(rev(miroir(ATT_R))).slice(1), ...lisse(rev(miroir(ARC_R))).slice(1)];

  // le pourtour de la vue : le dos coupé, les flancs, puis l'attache jusqu'au sternum
  const DOS_R = [[0, 290], [20, 291], [45, 296], [70, 306], [92, 322], [106, 342], [112, 365], [122, 395], [136, 430], [146, 465], [150, 500]];
  const POURTOUR_R = [...DOS_R.map(S), P(1068, 522, 150), ...ATT_R.slice(6)];
  const POURTOUR = lisse([...POURTOUR_R.slice(0, -1), [0, POURTOUR_R[POURTOUR_R.length - 1][1], 'c'], ...rev(miroir(POURTOUR_R)).slice(1, -1)], true);
  // le bas de la face coupée (où la coupe rencontre l'intérieur de la paroi)
  const PLI_PAROI_R = [[138, 500], [136, 470], [128, 438], [116, 405], [104, 384], [92, 384]].map(S);
  const FACE_R = [...DOS_R.map(S), ...rev(PLI_PAROI_R), ...[[60, 377], [30, 376], [12, 376]].map(S)];

  // la vertèbre coupée (L6)
  const ARC_VERT = [[-9, 358], [-10, 346], [-7, 338], [-3.5, 333], [-3.5, 312], [0, 305], [3.5, 312], [3.5, 333], [7, 338], [10, 346], [9, 358]].map(S);
  const TRANSV_R = [[11, 362], [40, 362], [70, 364], [80, 366], [82, 369], [80, 372], [70, 373], [40, 371], [11, 371]].map(S);
  // la longe coupée, au-dessus de l'apophyse transverse
  const LONGE_R = [[10, 300], [20, 291], [45, 296], [70, 306], [92, 322], [106, 342], [108, 356], [96, 360], [70, 361], [40, 360], [14, 358], [10, 340]].map(S);
  // le petit psoas : coupé contre le corps de la vertèbre, puis le long du plafond jusqu'à l'arcade
  const MINEUR_R = [P(XS, 390, 10), P(XS, 390, 29), P(990, 398, 23.5), P(990, 398, 9)];
  // le filet : sa face coupée, puis sa face du côté du ventre qui file vers l'avant sous l'arcade
  const zLat = x => 42 + 45 * (x - 975) / 215, zMed = x => 23.5 + 5.5 * (x - 975) / 215;
  const FILET_R = [
    ...[[29, 388], [30, 377], [52, 373], [76, 375], [88, 382], [87, 392]].map(S),
    ...[1178, 1140, 1100, 1060, 1020, 990, 975].map(x => P(x, 394 + 3 * (1190 - x) / 215, zLat(x))),
    P(972, 398, 33),
    ...[975, 990, 1020, 1060, 1100, 1140, 1178].map(x => P(x, 401 - 3 * (1190 - x) / 215, zMed(x))),
    P(XS, 401, 29),
  ];
  const PLI_FILET_R = [[87, 392], [72, 403], [50, 406], [32, 401], [29, 396]].map(S);
  const COUTURE_B_R = [1186, 1140, 1100, 1060, 1020, 994].map(x => P(x, 401 - 3 * (1190 - x) / 215, zMed(x)));
  // les corps des lombaires, sous le plafond, de L1 à la coupe
  const CORPS_L = C.VERT ? ['L1', 'L2', 'L3', 'L4', 'L5', 'L6'].map(n => {
    const x = C.VERT[n][0], x0 = x - 16, x1 = Math.min(x + 16, XS);
    return [P(x0, 378, -12), P(x0, 378, 12), P(x1, 378, 12), P(x1, 378, -12)];
  }) : [];
  // les piliers (onglet), dessinés à même la projection : le droit tient de L4 à la dernière
  // dorsale, le gauche de L2 ; tous deux quittent la colonne à la dernière dorsale et descendent
  // au centre tendineux ; le droit se fend autour de l'œsophage.
  const yCol = x => P(x, 381, 0)[1];
  const PILIER_D = lisse([[1.5, yCol(1111), 'c'], [8, yCol(1111), 'c'], [9, yCol(1060)], [10.5, -168], [18, -152], [28, -138], [36, -120], [40, -100],
    [38, -80], [30, -62], [18, -52], [6, -50], [-4, -54], [-7, -66], [-6, -90], [-3, -120], [0, -145], [1, -170]], true);
  const PILIER_G = lisse([[-1.5, yCol(1037), 'c'], [-6, yCol(1037), 'c'], [-7, -172], [-10, -156], [-18, -142], [-26, -124], [-30, -104], [-28, -84],
    [-20, -68], [-12, -60], [-9, -70], [-9, -100], [-6, -130], [-3, -155], [-2, -175]], true);
  const HIATUS = [16, -84, 6, 11];
  // trois feuilles, comme la fig. 275 : une de chaque côté des piliers, une vers le sternum
  const CENTRE_R = [[8, -58], [28, -70], [48, -94], [66, -108], [82, -104], [88, -86], [80, -62], [66, -40], [58, -20], [62, 2], [66, 28], [56, 54], [36, 74], [14, 86], [0, 88]];
  const CENTRE = lisse([...CENTRE_R, ...rev(miroir(CENTRE_R)).slice(1)], true);
  // les fibres du rebord charnu : du rebord vers le centre (SISSON)
  const FIBRES = (() => {
    const bord = lisse(DIAPH, true, 1);
    const F = [0, -30], out = [];
    let acc = 0;
    for (let i = 1; i < bord.length; i++) {
      acc += Math.hypot(bord[i][0] - bord[i - 1][0], bord[i][1] - bord[i - 1][1]);
      if (acc < 5.5) continue;
      acc = 0;
      const q = bord[i], L = Math.hypot(F[0] - q[0], F[1] - q[1]);
      out.push([q, [q[0] + (F[0] - q[0]) / L * 90, q[1] + (F[1] - q[1]) / L * 90]]);
    }
    return out;
  })();

  // cadrage de la vue B
  const BOITE_B = (() => {
    const xs = POURTOUR.map(q => q[0]), ys = POURTOUR.map(q => q[1]);
    return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
  })();
  const placeB = z => {
    const [x0, y0, x1, y1] = BOITE_B, k = Math.min((z.l - 64) / (x1 - x0), (z.h - 16) / (y1 - y0));
    const dx = (z.l - (x1 - x0) * k) / 2 - x0 * k, dy = (z.h - (y1 - y0) * k) / 2 - y0 * k;
    const T = q => [q[0] * k + dx, q[1] * k + dy];
    return { k, T, pts: a => a.map(T) };
  };

  // ═══ Vue C : le filet sorti ═════════════════════════════════════════════════════════════════
  // le bout mince à gauche (côté des côtes), le bout épais à droite (côté hanche), comme en place
  const FILET_SORTI = lisse([[0, 0], [6, -3.5], [24, -6], [60, -9.5], [110, -13], [160, -16.5], [210, -20], [250, -23], [282, -27], [306, -32], [326, -31],
    [340, -22], [346, -6], [343, 9], [332, 20], [312, 26], [282, 26], [250, 24], [210, 21], [160, 16.5], [110, 12], [60, 8.5], [24, 5.5], [6, 3.5]], true);
  const ILIAQUE = lisse([[262, -23], [284, -12], [310, -6], [330, -6], [345, -9]]);
  const placeLocal = (z, boite, marge = 16) => {
    const [x0, y0, x1, y1] = boite, k = Math.min((z.l - 2 * marge) / (x1 - x0), (z.h - 2 * marge) / (y1 - y0));
    const dx = (z.l - (x1 - x0) * k) / 2 - x0 * k, dy = (z.h - (y1 - y0) * k) / 2 - y0 * k;
    const T = q => [q[0] * k + dx, q[1] * k + dy];
    return { k, T, pts: a => a.map(T) };
  };

  // ═══ Vue D : l'onglet et la hampe ══════════════════════════════════════════════════════════
  const ovale = (cx, cy, rx, ry, n = 72) => Array.from({ length: n }, (_, i) => {
    const t = i / n * 2 * Math.PI; return [cx + rx * Math.cos(t), cy + ry * Math.sin(t) * (1 - 0.1 * Math.cos(t))];
  });
  const ONGLET_ENTIER = ovale(70, 42, 62, 21);
  const TRAIT_ONGLET = [[14, 42], [126, 42]];
  const LAME_ONGLET = [[24, 33], [112, 33]];
  const ONGLET_OUVERT = lisse([[184, 42, 'c'], [174, 33], [180, 19], [197, 9], [222, 4], [248, 4], [273, 9], [290, 19], [296, 33], [288, 42, 'c'],
    [296, 51], [290, 65], [273, 75], [248, 80], [222, 80], [197, 75], [180, 65], [174, 51]], true);
  const TISSU = (() => {
    const haut = [], bas = [];
    for (let i = 0; i <= 24; i++) { const x = 184 + 104 * i / 24, w = 6.5 * Math.sin(Math.PI * i / 24); haut.push([x, 42 - w]); bas.push([x, 42 + w]); }
    return [...haut, ...rev(bas).slice(1, -1)];
  })();
  const HAMPE = (() => {
    const med = [], g = [], d = [], fibres = [];
    for (let i = 0; i <= 60; i++) { const x = 18 + 290 * i / 60; med.push([x, 124 - 12 * Math.sin(Math.PI * i / 60)]); }
    med.forEach((q, i) => {
      const a = med[Math.max(0, i - 1)], b = med[Math.min(med.length - 1, i + 1)];
      const L = Math.hypot(b[0] - a[0], b[1] - a[1]), n = [-(b[1] - a[1]) / L, (b[0] - a[0]) / L];
      const w = 8 + 5 * Math.sin(Math.PI * i / 60);
      g.push([q[0] + n[0] * w, q[1] + n[1] * w]); d.push([q[0] - n[0] * w, q[1] - n[1] * w]);
      if (i % 1 === 0 && i > 0 && i < 60) fibres.push([[q[0] + n[0] * 16, q[1] + n[1] * 16], [q[0] - n[0] * 16, q[1] - n[1] * 16]]);
    });
    const bout = (i, j, s) => { const a = med[i], c = med[j], L = Math.hypot(a[0] - c[0], a[1] - c[1]);
      return [a[0] + (a[0] - c[0]) / L * s, a[1] + (a[1] - c[1]) / L * s]; };
    return { forme: lisse([...g, bout(60, 59, 5), ...rev(d), bout(0, 1, 5)], true), fibres, med };
  })();
  const BOITE_D = [0, 2, 322, 140];

  return {
    ref: '62-13',
    titre: 'Le filet, la hampe et l’onglet, vus de l’intérieur',
    desc: "Quatre vues. En haut à gauche, la carcasse d'orignal sans la tête, de profil gauche, os en transparence : "
      + "le filet en trame sous les vertèbres lombaires, des dernières côtes au bassin, avec le bout épais contre l'ilium ; "
      + "la couture en pointillé suit le dessous des vertèbres puis l'ilium, la lame fléchée va des côtes vers la hanche ; "
      + "une autre ligne en pointillé suit l'attache du diaphragme sur les côtes, de la dernière côte à la huitième, puis "
      + "au sternum. En haut à droite, la cavité vue de l'intérieur, organes retirés, en regardant vers l'avant : en haut le "
      + "dos coupé, la longe au-dessus des apophyses, le filet en dessous et le petit psoas contre la vertèbre ; les deux "
      + "filets filent le long du plafond jusqu'au bord du diaphragme ; les piliers (onglet), en points, montent le long des "
      + "vertèbres, le droit gros et fendu autour du trou de l'œsophage, le gauche petit ; le rebord charnu (hampe) fait le "
      + "tour le long des côtes, ses fibres dirigées vers le centre tendineux, blanc, au milieu. En bas à gauche, le filet "
      + "sorti d'une pièce, mince côté côtes, épais côté hanche. En bas à droite, l'onglet entier avec le trait qui "
      + "l'ouvre en portefeuille, puis ouvert, le tissu épais du centre à retirer ; et la hampe sortie en bande, fibres en travers.",
    format: 'pleine',
    disposition: [['profil', 'cavite'], ['filet', 'onglet']],
    hauteurs: [2.3, 1],
    largeurs: [[1.1, 1], [0.8, 1.2]],
    vues: {
      // ── Vue A : où ils sont, et le trait du filet ──────────────────────────────────────────
      profil: {
        titre: 'De profil, en transparence',
        dessin: z => {
          const p = placeA(z), T = q => q.map(p.T);
          return [
            C.dessiner(h, p, {
              id: 'a', loin: 'fin', fondOs: false,
              os: ['T8', 'T9', 'T10', 'T11', 'T12', 'T13', 'L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'sacrum',
                'cote8', 'cote9', 'cote10', 'cote11', 'cote12', 'cote13', 'sternum', 'bassin', 'femur', 'rotule'],
              osForts: ['cote13', 'bassin'],
              muscles: ['filet'],
              valeur: { muscles: ['filet'], trame: 'gris' },
            }),
            `<path d="${dD(T(ATTACHE_A), false)}" ${halo(3.4)}/>`,
            `<path d="${dD(T(ATTACHE_A), false)}" ${trait(1.4, POINTILLE)}/>`,
            `<path d="${dD(T(COUTURE_FILET), false)}" ${halo(3.4)}/>`,
            h.fleche(dD(T(COUTURE_FILET), false), trait(1.4, POINTILLE)),   // la couture, fléchée des côtes vers la hanche
          ].join('\n');
        },
        renvois: z => {
          const p = placeA(z);
          return [
            { n: 1, texte: 'filet — M. psoas major et M. iliacus', rond: p.pt([1150, 820]), cible: p.pt([1120, 397]) },
            { n: 2, texte: 'trait du couteau, des côtes vers la hanche', rond: p.pt([1240, 200]), cible: p.pt([1205, 389]) },
            { n: 3, texte: 'vertèbres lombaires', rond: p.pt([1060, 200]), cible: p.pt([1074, 366]) },
            { n: 4, texte: 'dernière côte', rond: p.pt([1020, 820]), cible: p.pt([1024, 444]) },
            { n: 5, texte: 'attache du diaphragme le long des côtes', rond: p.pt([890, 820]), cible: p.pt([931, 518]) },
          ];
        },
      },
      // ── Vue B : de la cavité ─────────────────────────────────────────────────────────────
      cavite: {
        titre: 'De la cavité, organes retirés',
        dessin: z => {
          const b = placeB(z), T = b.pts;
          const dbl = (f, poly) => [f(poly), f(miroir(poly))];
          const out = [];
          out.push(`<defs>${motifs('b')}<clipPath id="b-diaph"><path d="${dD(T(DIAPH_L), true)}" fill="${BLANC}"/></clipPath></defs>`);
          // le fond
          out.push(`<path d="${dD(T(POURTOUR), true)}" fill="${BLANC}" stroke="none"/>`);
          // le plafond : corps des lombaires, petits psoas, filets
          CORPS_L.forEach(c => out.push(`<path d="${dD(T(c), true)}" ${plein(BLANC, 0.7)}/>`));
          dbl(q => out.push(`<path d="${dD(T(q), true)}" ${plein(BLANC, 0.7)}/>`), MINEUR_R);
          dbl(q => {
            out.push(`<path d="${dD(T(q), true)}" fill="${BLANC}" stroke="none"/>`);
            out.push(`<path d="${dD(T(q), true)}" ${trameFilet('b')}/>`);
            out.push(`<path d="${dD(T(q), true)}" ${trait(1.4)}/>`);
          }, lisse(FILET_R, true, 1));
          dbl(q => out.push(`<path d="${dD(T(q), false)}" ${trait(0.7)}/>`), lisse(PLI_FILET_R));
          // le diaphragme : fibres du rebord, centre tendineux, piliers
          out.push(`<g clip-path="url(#b-diaph)">`);
          out.push(`<path d="${dD(T(DIAPH_L), true)}" fill="${BLANC}" stroke="none"/>`);
          out.push(`<path d="${FIBRES.map(([a, c]) => { const [p1, p2] = T([a, c]); return `M${f1(p1[0])} ${f1(p1[1])} L${f1(p2[0])} ${f1(p2[1])}`; }).join(' ')}" ${trait(0.5)}/>`);
          out.push('</g>');
          out.push(`<path d="${dD(T(CENTRE), true)}" ${plein(BLANC, 1.4)}/>`);
          [PILIER_D, PILIER_G].forEach(q => {
            out.push(`<path d="${dD(T(q), true)}" fill="${BLANC}" stroke="none"/>`);
            out.push(`<path d="${dD(T(q), true)}" ${trameOnglet('b')}/>`);
            out.push(`<path d="${dD(T(q), true)}" ${trait(1.4)}/>`);
          });
          { const [cx, cy] = b.T([HIATUS[0], HIATUS[1]]); out.push(h.ellipse(cx, cy, HIATUS[2] * b.k, HIATUS[3] * b.k, plein(BLANC, 0.7))); }
          out.push(`<path d="${dD(T(DIAPH_L), true)}" ${trait(1.4)}/>`);
          // la face coupée du dos : fond, longe, vertèbre
          out.push(`<path d="${dD(T(lisse([...FACE_R, ...rev(miroir(FACE_R))], true, 1)), true)}" fill="${BLANC}" stroke="none"/>`);
          dbl(q => out.push(`<path d="${dD(T(lisse(q, true, 1)), true)}" ${plein(BLANC, 0.7)}/>`), LONGE_R);
          dbl(q => out.push(`<path d="${dD(T(lisse(q, true, 1)), true)}" ${plein(BLANC, 1.4)}/>`), TRANSV_R);
          dbl(q => out.push(`<path d="${dD(T(q), false)}" ${trait(0.7)}/>`), lisse(PLI_PAROI_R));
          out.push(`<path d="${dD(T(lisse(ARC_VERT, true, 1)), true)}" ${plein(BLANC, 1.4)}/>`);
          { const [cx, cy] = b.T(S([0, 346])); out.push(h.ellipse(cx, cy, 5.5 * b.k, 5.5 * CO * b.k, plein(BLANC, 0.7))); }
          { const [cx, cy] = b.T(S([0, 367])); out.push(h.ellipse(cx, cy, 13 * b.k, 11 * CO * b.k, plein(BLANC, 1.4))); }
          [-19, 19].forEach(zz => { const [cx, cy] = b.T(S([zz, 383])); out.push(h.ellipse(cx, cy, 9 * b.k, 7 * CO * b.k, plein(BLANC, 0.7))); });
          // la face coupée du filet, par-dessus la face coupée (trame du filet)
          dbl(q => {
            out.push(`<path d="${dD(T(q), true)}" fill="${BLANC}" stroke="none"/>`);
            out.push(`<path d="${dD(T(q), true)}" ${trameFilet('b')}/>`);
            out.push(`<path d="${dD(T(q), true)}" ${trait(1.4)}/>`);
          }, lisse([...[[29, 388], [30, 377], [52, 373], [76, 375], [88, 382], [87, 392]].map(S), ...PLI_FILET_R.slice(1)], true, 1));
          // la couture du filet, contre le petit psoas
          dbl(q => {
            out.push(`<path d="${dD(T(q), false)}" ${halo(3.4)}/>`);
            out.push(`<path d="${dD(T(q), false)}" ${trait(1.4, POINTILLE)}/>`);
          }, lisse(COUTURE_B_R));
          // le pourtour
          out.push(`<path d="${dD(T(POURTOUR), true)}" ${trait(2.4)}/>`);
          return out.join('\n');
        },
        renvois: z => {
          const b = placeB(z);
          const bord = x => x < 0 ? 12 : z.l - 12;
          const r = (n, texte, rz, ry, cible) => ({ n, texte, rond: [rz, ry], cible: b.T(cible) });
          return [
            r(6, 'petit psoas — M. psoas minor', bord(-1), b.T([0, -236])[1], [-18, -236]),
            r(7, 'onglet — piliers du diaphragme, crura', bord(1), b.T([0, -140])[1], [30, -118]),
            r(8, 'hampe — rebord charnu, pars costalis', bord(-1), b.T([0, 60])[1], [-84, 70]),
            r(9, 'centre tendineux', bord(1), b.T([0, 60])[1], [34, 40]),
          ];
        },
      },
      // ── Vue C : le filet sorti ───────────────────────────────────────────────────────────
      filet: {
        titre: 'Le filet sorti d’une pièce',
        dessin: z => {
          const b = placeLocal(z, [0, -34, 346, 28]), T = b.pts;
          return [
            `<defs>${motifs('c')}</defs>`,
            `<path d="${dD(T(FILET_SORTI), true)}" fill="${BLANC}" stroke="none"/>`,
            `<path d="${dD(T(FILET_SORTI), true)}" ${trameFilet('c')}/>`,
            `<path d="${dD(T(ILIAQUE), false)}" ${halo(2.5)}/>`,
            `<path d="${dD(T(ILIAQUE), false)}" ${trait(0.7)}/>`,
            `<path d="${dD(T(FILET_SORTI), true)}" ${trait(2.4)}/>`,
          ].join('\n');
        },
        renvois: () => [],
      },
      // ── Vue D : l'onglet et la hampe sortis ──────────────────────────────────────────────
      onglet: {
        titre: 'L’onglet et la hampe sortis',
        dessin: z => {
          const b = placeLocal(z, BOITE_D, 18), T = b.pts;
          const out = [`<defs>${motifs('d')}<clipPath id="d-hampe"><path d="${dD(T(HAMPE.forme), true)}" fill="${BLANC}"/></clipPath></defs>`];
          // l'onglet entier, et le trait qui l'ouvre
          out.push(`<path d="${dD(T(ONGLET_ENTIER), true)}" fill="${BLANC}" stroke="none"/>`);
          out.push(`<path d="${dD(T(ONGLET_ENTIER), true)}" ${trameOnglet('d')}/>`);
          out.push(`<path d="${dD(T(ONGLET_ENTIER), true)}" ${trait(2.4)}/>`);
          out.push(`<path d="${dD(T(TRAIT_ONGLET), false)}" ${halo(3.4)}/>`);
          out.push(`<path d="${dD(T(TRAIT_ONGLET), false)}" ${trait(1.4, POINTILLE)}/>`);
          out.push(`<path d="${dD(T(LAME_ONGLET), false)}" ${halo(4)}/>`);
          out.push(h.fleche(dD(T(LAME_ONGLET), false), trait(1.4)));
          // l'onglet ouvert, le tissu du centre
          out.push(`<path d="${dD(T(ONGLET_OUVERT), true)}" fill="${BLANC}" stroke="none"/>`);
          out.push(`<path d="${dD(T(ONGLET_OUVERT), true)}" ${trameOnglet('d')}/>`);
          out.push(`<path d="${dD(T(ONGLET_OUVERT), true)}" ${trait(2.4)}/>`);
          out.push(`<path d="${dD(T(TISSU), true)}" fill="${BLANC}" stroke="none"/>`);
          out.push(`<path d="${dD(T(TISSU), true)}" ${trait(1.4, POINTILLE)}/>`);
          // la hampe en bande, fibres en travers
          out.push(`<path d="${dD(T(HAMPE.forme), true)}" fill="${BLANC}" stroke="none"/>`);
          out.push(`<g clip-path="url(#d-hampe)"><path d="${HAMPE.fibres.map(([a, c]) => { const [p1, p2] = T([a, c]); return `M${f1(p1[0])} ${f1(p1[1])} L${f1(p2[0])} ${f1(p2[1])}`; }).join(' ')}" ${trait(0.5)}/></g>`);
          out.push(`<path d="${dD(T(HAMPE.forme), true)}" ${trait(2.4)}/>`);
          return out.join('\n');
        },
        renvois: z => {
          const b = placeLocal(z, BOITE_D, 18);
          return [
            { n: 10, texte: 'onglet : trait en portefeuille', rond: b.T([40, 82]), cible: b.T([70, 42]) },
            { n: 11, texte: 'tissu épais du centre, à retirer', rond: b.T([318, 42]), cible: b.T([270, 42]) },
            { n: 12, texte: 'hampe en bande, fibres en travers', rond: b.T([318, 98]), cible: b.T([280, 118]) },
          ];
        },
      },
    },
  };
};
