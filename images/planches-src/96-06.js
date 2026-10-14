// Planche 96-06 — La charrue à rigoles (chapitre 96, étape 12 « Drainer avant d'engraisser » et
// « Les outils qu'on fait ») : « deux planches clouées en V, pointe en avant, lestées d'une roche ;
// tirée à la corde, elle ouvre la rigole qui vide le champ à la fonte ».
// Vue 1 : de côté. Vue 2 : de dessus, alignée sous la vue 1 (même échelle, mêmes x), la rigole qui
// reste derrière. Vue 3 : coupe A–A en travers, prise à la roche, regard vers la pointe. Vue 4 : la
// pointe grossie, de dessus : le joint en onglet, les clous croisés, le trou et la corde en double.
// Deux pièces que le chapitre ne nomme pas, parce que le montage n'en tient pas sans elles : la
// traverse clouée à l'arrière (elle tient l'ouverture du V et retient la roche) et le trou percé à la
// pointe où passe la corde. Aucune cote : le chapitre ne donne aucune mesure de la charrue. Les
// proportions (planches de 1100 × 180 × 25, demi-angle 14°) ne servent qu'au dessin.
// La charte : de côté, la face de droite de la roche à l'ombre (un croissant, lumière en haut à
// gauche) ; en coupe A–A, le dedans du V, vu vers la pointe, en gris loin. Le rouge : tirer la corde
// (le geste, de côté) et le chant du bas qui mord dans la terre (le point à vérifier, en coupe). De
// dessus, la flèche dit le sens où la charrue avance : elle reste noire.
module.exports = (h) => {
  const F = h.formes;
  const r1 = v => Math.round(v * 10) / 10;
  const lisse = (pts, ferme = false) => {
    const n = pts.length, get = i => (ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))]);
    let d = `M ${r1(pts[0][0])} ${r1(pts[0][1])}`;
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = get(i - 1), p1 = get(i), p2 = get(i + 1), p3 = get(i + 2);
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C ${r1(c1[0])} ${r1(c1[1])} ${r1(c2[0])} ${r1(c2[1])} ${r1(p2[0])} ${r1(p2[1])}`;
    }
    return d + (ferme ? ' Z' : '');
  };
  const blanc = (t = h.a.arete) => t.replace('fill="none"', 'fill="#fff"');
  // Un polygone aux coins arrondis : une roche, pas un sac.
  const arrondi = (pts, r = 0.22) => {
    const n = pts.length, mi = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
    let d = '';
    for (let i = 0; i < n; i++) {
      const a = pts[(i - 1 + n) % n], b = pts[i], c = pts[(i + 1) % n];
      const p = mi(b, a, r), q = mi(b, c, r);
      d += `${i ? ' L' : 'M'} ${r1(p[0])} ${r1(p[1])} Q ${r1(b[0])} ${r1(b[1])} ${r1(q[0])} ${r1(q[1])}`;
    }
    return d + ' Z';
  };

  // ── La géométrie, en mm. x vers l'avant (la pointe en x = 0), y en travers (plan) ou vers le bas
  //    (élévation, 0 au niveau du sol).
  const T = 25, HAUT = -120, BAS = 60;            // épaisseur ; chant du haut et du bas (le bas mord de 60)
  const th = 14 * Math.PI / 180, tn = Math.tan(th), sn = Math.sin(th), cs = Math.cos(th);
  const LX = 1100 * cs, W2 = 1100 * sn;           // longueur du V, demi-ouverture à l'arrière
  const TI = T / cs;                              // épaisseur mesurée en travers
  const yo = x => -x * tn, yi = x => -x * tn - TI;
  const APEX = -T / sn;                           // où les faces intérieures se rejoignent
  const TRAV = [-1045, -945], TRAV_Y = 320;       // la traverse
  const XA = -835;                                // la coupe A–A, au milieu de la roche
  const XMIN = -1440, XMAX = 560;                 // ce que montrent les vues 1 et 2
  const berme = x => (x >= 0 ? 0 : 120 * Math.pow(Math.min(1, -x / LX), 0.7));   // largeur de la terre repoussée
  const crete = x => (x >= 0 ? 0 : -50 * Math.pow(Math.min(1, -x / LX), 0.7));   // sa hauteur
  const bosse = (x, k) => 5 * Math.sin(x / 37 + k) + 3 * Math.sin(x / 13 + 2 * k);
  const pente = 17 * Math.PI / 180;               // la corde monte vers les mains
  const TROU = [-70, -30];                        // le trou : x, hauteur

  const echelle = z => {
    const s = (z.l - 12) / (XMAX - XMIN);
    return { s, ox: 6 - XMIN * s };
  };

  // ── Vue 1 : de côté
  const vueCote = z => {
    const { s, ox } = echelle(z);
    const oy = z.h - 110 * s - 4;
    const P = (x, y) => [r1(ox + x * s), r1(oy + y * s)];
    const Pl = pts => pts.map(p => P(...p));
    const out = [];
    // la roche, posée sur le chant ; sa partie basse, entre les planches, est cachée
    const roche = [[-944, -112], [-952, -178], [-926, -250], [-872, -304], [-800, -322], [-752, -300], [-724, -236], [-716, -170], [-724, -112]];
    {
      // la roche : fond blanc, croissant d'ombre à droite (le même contour décalé vers le haut à
      // gauche le découpe), puis le contour
      const dR = arrondi(Pl(roche)), dx = -48 * s, dy = -14 * s;
      const dRd = arrondi(Pl(roche).map(([u, v]) => [u + dx, v + dy]));
      out.push(h.path(dR, h.a.blanc));
      out.push(`<defs><clipPath id="k9606-roche"><path d="${dR}" fill="#FFFFFF" stroke="none"/></clipPath></defs>`
        + `<g clip-path="url(#k9606-roche)">${h.path(dR, h.a.ombre)}${h.path(dRd, h.a.blanc)}</g>`);
      out.push(h.path(dR, h.a.contour));
    }
    out.push(h.chemin(Pl([[-872, -304], [-850, -240], [-860, -170]]), h.a.fin));
    out.push(h.chemin(Pl([[-850, -240], [-752, -236]]), h.a.fin));
    // la planche proche (la lointaine est juste derrière, de même contour)
    out.push(h.chemin(Pl([[-LX, HAUT], [0, HAUT], [0, BAS], [-LX, BAS]]), blanc(h.a.contour), true));
    out.push(h.ligne(...P(-LX - T * sn, HAUT), ...P(-LX - T * sn, 0), h.a.fin));
    // la traverse, vue par son bout, clouée sur le chant du haut
    out.push(h.rect(...P(TRAV[0], HAUT - T), (TRAV[1] - TRAV[0]) * s, T * s, blanc(h.a.arete)));
    // les têtes de clou de la pointe, et le trou
    for (const y of [-100, -72]) out.push(h.cercle(...P(-92, y), 1.3, h.a.plein));
    // la terre : devant, le sol ; derrière la pointe, la terre repoussée monte contre la planche
    const surf = [];
    for (let x = XMIN; x <= XMAX; x += 20) {
      const c = x < 0 ? crete(x) + (x < -80 ? bosse(x, 0) * 0.45 : 0) : 0;
      surf.push([x, c]);
    }
    const fond = 108;
    const dSol = lisse(Pl(surf)) + ` L ${P(XMAX, fond).join(' ')} L ${P(XMIN, fond).join(' ')} Z`;
    out.push(h.path(dSol, h.a.blanc));
    out.push(h.path(dSol, h.a.hachure('terre', 'aucun')));
    out.push(h.path(lisse(Pl(surf)), h.a.arete));
    // sous la terre, caché : le chant du bas et le bout de la pointe
    out.push(h.chemin(Pl([[-LX, 30], [-LX, BAS], [0, BAS], [0, 0]]), h.a.cache));
    // la corde, en double : du trou à la pointe, puis vers les mains
    const cordeBout = [XMAX - 6, TROU[1] - (XMAX - 6) * Math.tan(pente)];
    const brin = dy => ({ pts: Pl([[TROU[0], TROU[1] + dy], [0, TROU[1] + dy - 2], [80, TROU[1] - 80 * Math.tan(pente) + dy], [cordeBout[0], cordeBout[1] + dy]]), ep: 3.4, debut: 'coupe', fin: 'fixe' });
    out.push(F.cordes([brin(-6), brin(6)], { trait: 'detail' }));
    out.push(h.cercle(...P(...TROU), 8 * s, h.a.detail));
    // le geste : tirer, dans l'axe de la corde
    const n = [Math.sin(pente), -Math.cos(pente)];
    const a0 = [180, TROU[1] - 180 * Math.tan(pente)], a1 = [440, TROU[1] - 440 * Math.tan(pente)];
    const d = 70;
    out.push(h.geste(`M ${P(a0[0] + n[0] * d, a0[1] + n[1] * d).join(' ')} L ${P(a1[0] + n[0] * d, a1[1] + n[1] * d).join(' ')}`));
    return { svg: out.join('\n'), P };
  };

  // ── Vue 2 : de dessus
  const vueDessus = z => {
    const { s, ox } = echelle(z);
    const oy = z.h / 2;
    const P = (x, y) => [r1(ox + x * s), r1(oy + y * s)];
    const Pl = pts => pts.map(p => P(...p));
    const out = [];
    // la terre repoussée, de chaque côté : contre la planche, puis au bord de la rigole
    for (const sg of [1, -1]) {
      const dedans = [], dehors = [];
      for (let x = 0; x >= XMIN; x -= 20) {
        const y0 = x > -LX ? yo(x) : W2;
        dedans.push([x, sg * y0]);
        dehors.push([x, sg * (y0 + berme(x) + (x < -60 ? bosse(x, sg) : 0) * Math.min(1, -x / 200))]);
      }
      const poly = [...dedans, ...dehors.slice().reverse()];
      out.push(h.path(lisse(Pl(poly), true), h.a.hachure('terre', 'aucun')));
      out.push(h.path(lisse(Pl(dehors)), h.a.detail));
      out.push(h.ligne(...P(-LX, sg * W2), ...P(XMIN, sg * W2), h.a.arete));
    }
    // le fond raclé de la rigole
    for (const [y, x0, x1] of [[-150, -1100, -1400], [-40, -1120, -1330], [70, -1090, -1420], [180, -1130, -1360]]) {
      out.push(h.ligne(...P(x0, y), ...P(x1, y), h.a.fin));
    }
    // les deux planches : le V, joint en onglet à la pointe
    const V = [[0, 0], [-LX, W2], [-LX - T * sn, W2 - T * cs], [APEX, 0], [-LX - T * sn, -(W2 - T * cs)], [-LX, -W2]];
    out.push(h.chemin(Pl(V), blanc(h.a.contour), true));
    out.push(h.ligne(...P(0, 0), ...P(APEX, 0), h.a.fin));
    // la traverse, clouée sur le chant des deux planches
    out.push(h.rect(...P(TRAV[0], -TRAV_Y), (TRAV[1] - TRAV[0]) * s, 2 * TRAV_Y * s, blanc(h.a.arete)));
    for (const sg of [1, -1]) {
      const yc = sg * (yo(-995) - TI / 2);
      for (const dx of [-25, 25]) out.push(h.cercle(...P(-995 + dx, yc), 1.3, h.a.plein));
    }
    // la roche, coincée devant la traverse, à cheval sur les deux chants
    const roche = [[-946, -70], [-936, -168], [-896, -214], [-836, -222], [-772, -204], [-732, -150], [-720, -60], [-728, 50], [-752, 140], [-796, 200], [-856, 220], [-912, 190], [-942, 120], [-948, 30]];
    out.push(h.path(arrondi(Pl(roche)), blanc(h.a.contour)));
    out.push(h.chemin(Pl([[-896, -214], [-860, -120], [-842, 0], [-880, 110], [-912, 190]]), h.a.fin));
    out.push(h.chemin(Pl([[-842, 0], [-752, 140]]), h.a.fin));
    out.push(h.chemin(Pl([[-860, -120], [-772, -204]]), h.a.fin));
    // la corde, en double, de la pointe vers l'avant
    const brin = sg => ({ pts: Pl([[TROU[0], sg * (yo(TROU[0]) + 5)], [-20, sg * 16], [40, sg * 14], [120, sg * 6], [XMAX - 6, sg * 6]]), ep: 3.4, debut: 'coupe', fin: 'fixe' });
    out.push(F.cordes([brin(1), brin(-1)], { trait: 'detail' }));
    // le sens de la marche
    out.push(h.fleche(`M ${P(200, -95).join(' ')} L ${P(470, -95).join(' ')}`, h.a.arete));
    // la coupe A–A
    const yA = 390;
    for (const sg of [1, -1]) {
      const q0 = P(XA, sg * (yA - 50)), q1 = P(XA, sg * yA);
      out.push(h.ligne(...q0, ...q1, h.a.contour));
      out.push(h.fleche(`M ${q1[0]} ${q1[1]} L ${r1(q1[0] + 16)} ${q1[1]}`, h.a.detail));
      out.push(h.texte(q1[0] - 9, q1[1] + (sg > 0 ? -2 : 10), 'A'));
    }
    return { svg: out.join('\n'), P };
  };

  // ── Vue 3 : coupe A–A, regard vers la pointe (y en travers, 0 au sol)
  const vueCoupe = z => {
    const s = Math.min((z.l - 12) / 760, (z.h - 8) / 440);
    const ox = z.l / 2, oy = z.h - 110 * s - 4;
    const P = (x, y) => [r1(ox + x * s), r1(oy + y * s)];
    const Pl = pts => pts.map(p => P(...p));
    const out = [];
    const YO = yo(XA), YI = yi(XA);
    const bord = 370;
    // le sol en place, avec la rigole creusée entre les planches
    // le fond raclé : légèrement irrégulier, comme le sol en place
    const fondR = [[-YI, BAS], [-YI * 0.55, BAS + 3], [-YI * 0.1, BAS - 2], [YI * 0.35, BAS + 2], [YI * 0.75, BAS - 1.5], [YI, BAS]];
    const sol = [[-bord, 0], [-YO, 0], [-YO, BAS], ...fondR, [YO, BAS], [YO, 0], [bord, 0], [bord, 108], [-bord, 108]];
    // le dedans du V, vu vers la pointe : les faces intérieures des planches, en gris loin
    out.push(h.chemin(Pl([[-YI, HAUT], [YI, HAUT], ...fondR.slice().reverse()]), h.a.loin, true));
    out.push(h.chemin(Pl(sol), h.a.hachure('terre', 'aucun'), true));
    out.push(h.chemin(Pl([[-bord, 0], [-YO, 0]]), h.a.arete), h.chemin(Pl([[YO, 0], [bord, 0]]), h.a.arete));
    // la terre repoussée contre chaque planche
    for (const sg of [1, -1]) {
      const toe = YO + berme(XA);
      const b = [[YO, 0], [YO, crete(XA)], [YO + 22, crete(XA) - 4], [YO + 50, crete(XA) + 6], [YO + 75, -20], [toe - 12, -6], [toe, 0]].map(([x, y]) => [sg * x, y]);
      out.push(h.path(lisse(Pl(b)) + ' Z', h.a.hachure('terre', 'aucun')));
      out.push(h.path(lisse(Pl(b.slice(1))), h.a.arete));
      out.push(h.ligne(...P(sg * YO, 0), ...P(sg * toe, 0), h.a.cache));
    }
    // les deux planches, coupées
    for (const sg of [1, -1]) {
      const x0 = sg > 0 ? YI : -YO;
      out.push(h.rect(...P(x0, HAUT), TI * s, (BAS - HAUT) * s, blanc(h.a.contour)));
      out.push(h.rect(...P(x0, HAUT), TI * s, (BAS - HAUT) * s, h.a.hachure('bois', 'contour')));
    }
    // la roche, coupée, posée sur les deux chants
    const roche = [[-YI - 4, HAUT + 4], [-110, -86], [-20, -78], [90, -84], [YI + 4, HAUT + 4], [214, -156], [220, -226], [170, -290], [60, -322], [-60, -316], [-150, -290], [-205, -236], [-218, -168]];
    out.push(h.path(arrondi(Pl(roche), 0.14), blanc(h.a.contour)));
    out.push(h.chemin(Pl([[-150, -290], [-96, -220], [-110, -150], [-60, -96]]), h.a.fin));
    out.push(h.chemin(Pl([[-96, -220], [40, -236], [60, -322]]), h.a.fin));
    out.push(h.chemin(Pl([[40, -236], [120, -180], [214, -156]]), h.a.fin));
    out.push(h.chemin(Pl([[120, -180], [100, -110]]), h.a.fin));
    // le fond de la rigole, après les planches pour qu'il passe dessous du même trait que le sol
    out.push(h.path(lisse(Pl(fondR)), h.a.arete));
    // le point à vérifier : le chant du bas, qui mord dans la terre
    out.push(h.controle(...P(YO - TI / 2, BAS), 10));
    return { svg: out.join('\n'), P, YO, YI };
  };

  // ── Vue 4 : la pointe grossie, de dessus
  const vuePointe = z => {
    const s = Math.min((z.l - 16) / 255, (z.h - 34) / 92);
    const ox = z.l / 2 + 12 * s, oy = z.h / 2;
    const P = (x, y) => [r1(ox + x * s), r1(oy + y * s)];
    const Pl = pts => pts.map(p => P(...p));
    const out = [];
    const xb = -140;
    // les deux planches, coupées à l'arrière par un trait de cassure
    const V = [[0, 0], [xb, yo(xb)], [xb, yi(xb)], [APEX, 0], [xb, -yi(xb)], [xb, -yo(xb)]];
    out.push(h.chemin(Pl(V), blanc(h.a.contour), true));
    for (const sg of [1, -1]) out.push(h.ligne(...P(xb, sg * yo(xb)), ...P(xb, sg * yi(xb)), `${h.a.blanc}`));
    for (const sg of [1, -1]) out.push(h.path(lisse(Pl([[xb, sg * (yo(xb) + 3)], [xb - 5, sg * (yo(xb) - 8)], [xb + 4, sg * (yi(xb) + 8)], [xb, sg * (yi(xb) - 3)]])), h.a.detail));
    // le joint en onglet
    out.push(h.ligne(...P(0, 0), ...P(APEX, 0), h.a.detail));
    // les clous, croisés à travers le joint
    const clou = (x0, sg) => {
      const a = [x0, sg * yo(x0)], b = [x0 - 40 * sn, sg * (yo(x0) - 40 * cs)];
      return h.ligne(...P(...a), ...P(...b), h.a.cache) + h.ligne(...P(a[0] - 3 * cs, a[1] - sg * 3 * sn), ...P(a[0] + 3 * cs, a[1] + sg * 3 * sn), h.a.arete);
    };
    out.push(clou(-88, 1), clou(-88, -1));
    // le trou, percé en travers de la pointe
    for (const dx of [-7, 7]) out.push(h.ligne(...P(TROU[0] + dx, yo(TROU[0] + dx)), ...P(TROU[0] + dx, -yo(TROU[0] + dx)), h.a.cache));
    // la corde : passée en double dans le trou, ses deux brins font le tour de la pointe vers l'avant
    const yT = yo(TROU[0]);
    const brin = sg => ({ pts: Pl([[TROU[0], sg * yT], [TROU[0] + 6 * sn, sg * (yT + 6 * cs)], [-56, sg * 27], [-20, sg * 25], [40, sg * 18], [115, sg * 10]]), ep: 9 * s, debut: 'coupe', fin: 'fixe' });
    out.push(F.cordes([brin(1), brin(-1)], { trait: 'arete' }));
    return { svg: out.join('\n'), P, yT };
  };

  const memo = {};
  const vue = (id, f) => z => { const k = `${id}:${z.l}x${z.h}`; if (!memo[k]) memo[k] = f(z); return memo[k]; };
  const cote = vue('cote', vueCote), dessus = vue('dessus', vueDessus), coupe = vue('coupe', vueCoupe), pointe = vue('pointe', vuePointe);

  return {
    ref: '96-06',
    titre: 'La charrue à rigoles',
    desc: 'La charrue à rigoles de côté, de dessus, en coupe et à la pointe : deux planches sur le chant clouées en V, pointe en avant, une roche posée dans le V sur les deux chants, une traverse clouée à l’arrière, la corde passée en double dans un trou à la pointe. Tirée, elle repousse la terre de chaque côté et laisse une rigole derrière elle.',
    format: 'pleine',
    disposition: [['cote'], ['dessus'], ['coupe', 'pointe']],
    hauteurs: [150, 247, 151],
    largeurs: [[1], [1], [1, 1]],
    vues: {
      cote: {
        titre: 'De côté',
        dessin: z => cote(z).svg,
        renvois: z => {
          const { P } = cote(z);
          return [
            { n: 1, rond: [P(-560, 0)[0], z.h - 12], cible: P(-560, -60) },
            { n: 2, rond: [P(-620, 0)[0], 14], cible: P(-770, -300) },
            { n: 3, rond: [P(330, 0)[0], z.h - 14], cible: P(300, TROU[1] - 300 * Math.tan(pente)) },
          ].map((r, i) => ({ ...r, texte: ['deux planches sur le chant, clouées en V', 'une roche posée sur les deux chants', 'la corde, en double, passée dans le trou'][i] }));
        },
      },
      dessus: {
        titre: 'De dessus',
        dessin: z => dessus(z).svg,
        renvois: z => {
          const { P } = dessus(z);
          return [
            { n: 4, rond: [P(-1200, 0)[0], 12], cible: P(-1030, -300) },
            { n: 5, rond: [P(-600, 0)[0], z.h - 12], cible: P(-560, 260) },
            { n: 6, rond: [P(-1330, 0)[0], z.h / 2 + 2], cible: P(-1250, 100) },
          ].map((r, i) => ({ ...r, texte: ['la traverse clouée, qui tient le V ouvert', 'la terre repoussée de chaque côté', 'la rigole qui reste derrière'][i] }));
        },
      },
      coupe: {
        titre: 'En coupe A–A',
        dessin: z => coupe(z).svg,
        renvois: z => {
          const { P, YO } = coupe(z);
          return [
            { n: 7, rond: [z.l - 14, P(0, 30)[1]], cible: P(YO - 12, BAS - 6), texte: 'le chant du bas mord dans la terre' },
          ];
        },
      },
      pointe: {
        titre: 'La pointe, de dessus',
        dessin: z => pointe(z).svg,
        renvois: z => {
          const { P, yT } = pointe(z);
          return [
            { n: 8, rond: [P(-88, 0)[0], 12], cible: P(-94, -12) },
            { n: 9, rond: [P(-40, 0)[0], z.h - 12], cible: P(TROU[0], 0) },
          ].map((r, i) => ({ ...r, texte: ['les clous, croisés à travers le joint', 'le trou, percé en travers de la pointe'][i] }));
        },
      },
    },
  };
};
