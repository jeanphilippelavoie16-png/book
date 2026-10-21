// Planche 64-40 — démonter le quartier avant sans scie.
// Chapitre 64, § 3 « L'épaule n'est accrochée à rien », § 5 étape 3 (détacher le quartier : la
// patte écartée, la lame à plat entre l'omoplate et le gril costal, tranchant vers l'os plat, on
// suit les côtes, on finit au-dessus de la pointe de l'omoplate sous la bosse du garrot, aucun os
// coupé) et étape 6 (le jarret avant au coude : ouvrir la face arrière, plier pour faire bâiller
// le joint). Aucun chiffre : le chapitre n'en donne pas pour ce geste.
// Vue A refaite au redessin du 14 octobre (groupe E : la coupe en travers de l'épaule était de
// l'anatomie sans modèle réel) : l'épaule vue de côté sur la carcasse commune des planches du
// ch. 62 (images/planches-src/_carcasse-orignal.js : silhouette NIH de l'orignal, os et dentelé
// ventral d'Ellenberger recalés), avec le pourtour de l'épaule, l'omoplate et son cartilage sur
// les côtes, le chemin de la lame et le point où elle s'arrête. Les vues du coude ne bougent pas.
// La charte : la patte du côté opposé en gris loin ; le rouge sur le chemin de la lame, la patte
// qu'on écarte, la lame qui descend le long de l'humérus, la patte qu'on plie, et le cercle du
// point où la coupe s'arrête, sous la bosse du garrot.
module.exports = (h) => {
  const B = h.a.blanc.match(/fill="([^"]+)"/)[1];
  const blanc = t => h.a[t].replace('fill="none"', `fill="${B}"`);
  const fond = `fill="${B}" stroke="none"`;
  const f = v => Math.round(v * 100) / 100;
  const pt = p => `${f(p[0])} ${f(p[1])}`;
  const trace = (pts, ferme = false) => 'M ' + pts.map(pt).join(' L ') + (ferme ? ' Z' : '');

  // Une courbe qui passe par tous les points (Catmull-Rom), rendue en points serrés.
  const dense = (pts, k = 8) => {
    const n = pts.length, out = [];
    const g = i => pts[Math.max(0, Math.min(n - 1, i))];
    for (let i = 0; i < n - 1; i++) {
      const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      for (let j = 0; j < k; j++) {
        const t = j / k, t2 = t * t, t3 = t2 * t;
        out.push([0, 1].map(c => 0.5 * (2 * p1[c] + (-p0[c] + p2[c]) * t
          + (2 * p0[c] - 5 * p1[c] + 4 * p2[c] - p3[c]) * t2 + (-p0[c] + 3 * p1[c] - 3 * p2[c] + p3[c]) * t3)));
      }
    }
    out.push(pts[n - 1]);
    return out;
  };
  const unit = (a, b) => { const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1; return [dx / L, dy / L]; };
  const rot = (p, c, deg) => {
    const a = deg * Math.PI / 180, x = p[0] - c[0], y = p[1] - c[1];
    return [c[0] + x * Math.cos(a) - y * Math.sin(a), c[1] + x * Math.sin(a) + y * Math.cos(a)];
  };
  // décalage d'une polyligne : + à gauche du sens de marche vu à l'écran (y vers le bas)
  const decale = (pts, e) => pts.map((p, i) => {
    const d = unit(pts[Math.max(0, i - 1)], pts[Math.min(pts.length - 1, i + 1)]);
    return [p[0] + e * d[1], p[1] - e * d[0]];
  });
  const longueurs = pts => { const L = [0]; for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1])); return L; };
  const surLigne = (pts, s) => {
    const L = longueurs(pts); s = Math.max(0, Math.min(L[L.length - 1], s));
    let i = 1; while (i < L.length - 1 && L[i] < s) i++;
    const u = (s - L[i - 1]) / ((L[i] - L[i - 1]) || 1), a = pts[i - 1], b = pts[i];
    return { p: [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u], t: unit(a, b) };
  };
  const auT = (pts, t) => surLigne(pts, t * longueurs(pts).slice(-1)[0]);
  // le trait de cassure : une droite avec un petit Z au milieu (en coordonnées de vue)
  const cassure = (a, b, e = 4.5) => {
    const d = unit(a, b), n = [-d[1], d[0]], m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    return [a, [m[0] - d[0] * e * 0.7, m[1] - d[1] * e * 0.7], [m[0] - d[0] * e * 0.2 + n[0] * e, m[1] - d[1] * e * 0.2 + n[1] * e],
      [m[0] + d[0] * e * 0.2 - n[0] * e, m[1] + d[1] * e * 0.2 - n[1] * e], [m[0] + d[0] * e * 0.7, m[1] + d[1] * e * 0.7], b];
  };
  const arcPts = (c, r, a0, a1, n = 24) => Array.from({ length: n + 1 }, (_, i) => {
    const a = (a0 + (a1 - a0) * i / n) * Math.PI / 180; return [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)];
  });

  // Le couteau, vu de côté : la pointe en `pointe`, `dir` va de la pointe vers le manche.
  // e = +1 : le tranchant du côté gauche du sens (y vers le bas), -1 : à droite.
  const couteau = ({ pointe, dir, lame, larg, manche, epM, e = 1, dos = 0 }) => {
    const n = [-dir[1] * e, dir[0] * e];
    const P = (u, v) => [pointe[0] + dir[0] * u + n[0] * v, pointe[1] + dir[1] * u + n[1] * v];
    const L = lame, w = larg;
    const lameD = `M ${pt(P(0, -0.22 * w))} Q ${pt(P(0.14 * L, -0.5 * w))} ${pt(P(0.32 * L, -0.5 * w))} L ${pt(P(L, -0.5 * w))}`
      + ` L ${pt(P(L, 0.5 * w))} L ${pt(P(0.42 * L, 0.5 * w))} Q ${pt(P(0.1 * L, 0.5 * w))} ${pt(P(0, -0.22 * w))} Z`;
    const b0 = L, b1 = L + Math.max(2, 0.06 * manche), m1 = b1 + manche, r = epM / 2;
    const garde = trace([P(b0, -0.62 * epM), P(b1, -0.62 * epM), P(b1, 0.62 * epM), P(b0, 0.62 * epM)], true);
    const mancheD = `M ${pt(P(b1, -r * 0.9))} L ${pt(P(m1 - r, -r))} Q ${pt(P(m1, -r))} ${pt(P(m1, 0))} Q ${pt(P(m1, r))} ${pt(P(m1 - r, r))}`
      + ` L ${pt(P(b1, r * 0.9))} Z`;
    const rivets = [0.3, 0.72].map(t => { const c = P(b1 + manche * t, 0); return h.cercle(c[0], c[1], Math.max(0.9, epM * 0.11), h.a.fin); });
    const fv = dos ? -dos * 0.2 * w : 0.22 * w;
    const fil = h.path(`M ${pt(P(0.3 * L, fv))} L ${pt(P(L, fv))}`, h.a.fin);
    const dosL = dos ? h.path(`M ${pt(P(0.2 * L, dos * 0.5 * w))} L ${pt(P(L, dos * 0.5 * w))}`, h.a.contour) : '';
    return [h.path(mancheD, blanc('arete')), ...rivets, h.path(garde, blanc('arete')), h.path(lameD, blanc('arete')), fil, dosL].join('\n');
  };

  // ════════════════════════════════════════════════════════════════════════════════════
  // Vue A — sur la bête, de côté. La carcasse commune des planches du ch. 62 (_carcasse-orignal.js :
  // silhouette NIH de l'orignal, os d'Ellenberger recalés), cadrée sur l'épaule : l'omoplate et son
  // cartilage en trait fort, posés sur les côtes ; l'humérus, le coude ; l'écharpe (dentelé ventral)
  // en tireté. La lame entre par l'aisselle, monte à plat sous l'omoplate le long des côtes et
  // s'arrête au-dessus du cartilage, sous la bosse du garrot.
  // ════════════════════════════════════════════════════════════════════════════════════
  const CARC = require('./_carcasse-orignal');
  const CADRE_A = [480, 126, 945, 766];
  const repA = z => CARC.placer(z, { cadre: CADRE_A });
  // dans le repère de la carcasse (U)
  const ENTREE = [800, 606];            // l'aisselle, derrière le coude, sous le triceps
  const FIN = [756, 286];               // au-dessus du cartilage de l'omoplate, sous la bosse
  const vueA = z => {
    const p = repA(z), T = p.T, k = p.k;
    const out = [];
    out.push(CARC.dessiner(h, p, {
      id: 'a', os: ['cotes', 'omoplate', 'cartilageOmoplate', 'humerus', 'radius', 'cubitus'],
      osForts: ['omoplate', 'cartilageOmoplate'], loin: 'gris',
    }));
    // ce qu'on voit sur la bête : le pourtour de l'épaule, là où le quartier se sépare du tronc
    out.push(h.path(trace(dense(CARC.LIMITES.epaule.map(q => [q[0], q[1]]), 6).map(T)), h.a.arete));
    // l'écharpe : le dentelé ventral, sous l'omoplate, en tireté
    out.push(h.path(trace(dense(CARC.MUSCLES.dentelVentral.pts.map(q => [q[0], q[1]]).concat([CARC.MUSCLES.dentelVentral.pts[0]]), 6).map(T)), h.a.cache));
    // le couteau : manche dehors, sous l'aisselle ; la lame, sous la viande, en tireté
    const dir = unit(T(FIN), T(ENTREE));                    // de la pointe vers le manche
    const pointe = T([786, 540]);
    const Lb = 70 * k, wb = 14 * k;
    const n = [-dir[1], dir[0]];
    const P = (u, v) => [pointe[0] + dir[0] * u + n[0] * v, pointe[1] + dir[1] * u + n[1] * v];
    out.push(h.path(trace([P(0, 0), P(0.3 * Lb, -0.5 * wb), P(Lb, -0.5 * wb), P(Lb, 0.5 * wb), P(0.3 * Lb, 0.45 * wb)], true), h.a.cache));
    out.push(couteau({ pointe: P(Lb, 0), dir, lame: 0.001, larg: wb, manche: 54 * k, epM: 15 * k, e: 1 }));
    // le chemin de la lame : de l'aisselle, à plat le long des côtes, jusque sous la bosse
    const chemin = [[812, 520], [818, 470], [812, 420], [796, 372], [776, 330], [764, 304]];
    out.push(h.geste(trace(dense(chemin, 6).map(T))));
    // la patte qu'on écarte : elle pivote à l'épaule, vers l'avant et loin du corps
    const piv = [650, 548], rP = 206;
    const arcP = Array.from({ length: 13 }, (_, i) => { const a = (72 + 26 * i / 12) * Math.PI / 180; return [piv[0] + rP * Math.cos(a), piv[1] + rP * Math.sin(a)]; });
    out.push(h.geste(trace(arcP.map(T))));
    // le point où la coupe s'arrête
    const fc = T(FIN);
    out.push(h.controle(fc[0], fc[1], 9));
    return out.join('\n');
  };
  const renvoisA = z => {
    const p = repA(z), T = p.T;
    const r = q => T(q).map(v => Math.round(v * 10) / 10);
    const cx = T([700, 0])[0];
    return [
      { n: 1, rond: [r([700, 0])[0] - 150, r([0, 430])[1]], cible: r([690, 430]), texte: 'l’omoplate : aucun os ne la retient' },
      { n: 2, rond: [r([960, 0])[0] + 46, r([0, 520])[1]], cible: r([895, 530]), texte: 'l’écharpe de muscles, seule attache' },
      { n: 3, rond: [r([960, 0])[0] + 46, r([0, 400])[1]], cible: r([905, 420]), texte: 'le gril costal' },
      { n: 4, rond: [r([960, 0])[0] + 46, r([0, 690])[1]], cible: r([740, 728]), texte: 'la patte écartée ouvre l’aisselle' },
      { n: 5, rond: [r([700, 0])[0] - 150, r([0, 600])[1]], cible: r([790, 566]), texte: 'lame à plat, tranchant vers l’omoplate' },
      { n: 6, rond: [r([700, 0])[0] - 150, r([0, 250])[1]], cible: r([748, 287]), texte: 'fin de coupe, sous la bosse du garrot' },
    ];
  };

  // ════════════════════════════════════════════════════════════════════════════════════
  // Vues B et C — le coude, de côté, os vus au travers de la viande. L'avant de la patte à
  // gauche. Repère : J au centre du condyle de l'humérus, unités ≈ mm.
  // ════════════════════════════════════════════════════════════════════════════════════
  const J = [0, 0], RC = 30;
  const u = [-0.5, -0.866], nn = [0.866, -0.5];
  const Hf = s => [s * u[0] - 16 * nn[0], s * u[1] - 16 * nn[1]];
  const Hb = s => [s * u[0] + 16 * nn[0], s * u[1] + 16 * nn[1]];
  const humerus = [Hf(165), Hf(100), Hf(55), [-36, -24], ...arcPts(J, RC, 160, -70, 23), [4, -40], [-5, -58], Hb(80), Hb(120), Hb(165)];
  const jarretOs = [[-26, 22], [-24, 45], [-21, 100], [-20, 190], [24, 190], [25, 150], [28, 80], [34, 40], [42, 5], [48, -35], [53, -76],
    [54, -96], [46, -110], [30, -112], [18, -102], [13, -80], [12, -52], ...arcPts(J, RC + 0.8, -55, 125, 24)];
  const viandeAv = [[-117.1, -122.9], [-92, -84], [-72, -48], [-56, -10]];                 // devant du bras
  const jarretAv = [[-56, -10], [-48, 30], [-43, 90], [-40, 190]];                          // devant du jarret
  const viandeArr = [[17.1, -200.4], [62, -172], [88, -140], [84, -124], [68, -114]];       // le triceps, jusqu'à la pointe du coude
  const jarretArr = [[68, -114], [66, -96], [62, -60], [56, -20], [48, 30], [42, 110], [36, 190]];
  const entaille = [[68, -114], [44, -124], [22, -120], [11, -100], [8, -76], [7, -52], [8, -36]];
  const FP = [29.5 * Math.cos(125 * Math.PI / 180), 29.5 * Math.sin(125 * Math.PI / 180)];  // le devant du joint, qui reste en appui
  const PLI = 30;
  const plie = p => rot(p, FP, PLI);

  const repereCoude = z => {
    const k = Math.min(z.l / 266, z.h / 430);
    const ox = z.l / 2 - (-125 + 140) / 2 * k, oy = z.h / 2 - (-206 + 224) / 2 * k;
    return { k, M: p => [ox + p[0] * k, oy + p[1] * k] };
  };

  const humerusPath = M => {
    const pts = humerus.map(M), a = pts[pts.length - 1], b = pts[0];
    return h.path(trace([...pts, ...cassure(a, b, 3.5).slice(1, -1)], true), blanc('arete'));
  };
  const jarretPath = (M, P = p => p) => {
    const pts = jarretOs.map(p => M(P(p)));
    const a = pts[3], b = pts[4];
    const ligne = [...pts.slice(0, 4), ...cassure(a, b, 3.5).slice(1, -1), ...pts.slice(4)];
    return [h.path(trace(ligne, true), blanc('arete')),
      h.path(trace([[9, 48], [10, 120], [11, 182]].map(p => M(P(p)))), h.a.fin)].join('\n');
  };

  const vueB = z => {
    const { k, M } = repereCoude(z);
    const out = [];
    const av = dense([...viandeAv, ...jarretAv.slice(1)]), arr = dense([...viandeArr, ...jarretArr.slice(1)]);
    const haut = cassure(M(viandeAv[0]), M(viandeArr[0]), 5), bas = cassure(M(jarretArr[jarretArr.length - 1]), M(jarretAv[jarretAv.length - 1]), 5);
    const tour = [...arr.map(M), ...bas.slice(1, -1), ...av.slice().reverse().map(M), ...haut.slice(1, -1)];
    out.push(h.path(trace(tour, true), fond));
    out.push(h.path(trace(av.map(M)), h.a.contour), h.path(trace(arr.map(M)), h.a.contour));
    out.push(h.path(trace(haut), h.a.detail), h.path(trace(bas), h.a.detail));
    out.push(humerusPath(M), jarretPath(M));
    // la lame entre à la pointe du coude, au-dessus de l'olécrâne ; la flèche : on descend jusqu'au joint
    const tipL = [16, -126];
    out.push(couteau({ pointe: M(tipL), dir: unit(tipL, [68, -114]), lame: 64 * k, larg: 13 * k, manche: 46 * k, epM: 15 * k, e: 1 }));
    out.push(h.geste(trace(dense([[13, -114], [10, -98], [8, -76], [7, -56], [8, -40]], 4).map(M))));
    vueB.geo = { M, k };
    return out.join('\n');
  };
  const renvoisB = z => {
    vueB(z); const { M } = vueB.geo;
    return [
      { n: 7, rond: M([-108, -18]), cible: M(Hf(120).map((v, i) => (v + Hb(120)[i]) / 2)), texte: 'l’humérus : le bras' },
      { n: 8, rond: M([-98, 130]), cible: M([0, 130]), texte: 'radius et cubitus : le jarret avant' },
      { n: 9, rond: M([112, -60]), cible: M([44, -120]), texte: 'la face arrière, ouverte au couteau' },
    ];
  };

  const vueC = z => {
    const { k, M } = repereCoude(z);
    const out = [];
    const ent = dense(entaille, 5);
    // le bras, immobile
    const brasAv = dense(viandeAv), brasArr = dense(viandeArr);
    const haut = cassure(M(viandeAv[0]), M(viandeArr[0]), 5);
    const brasTour = [...brasArr.map(M), ...ent.slice(1).map(M), M([-20, -30]), ...brasAv.slice().reverse().map(M), ...haut.slice(1, -1)];
    out.push(h.path(trace(brasTour, true), fond));
    out.push(h.path(trace(brasAv.map(M)), h.a.contour), h.path(trace(brasArr.map(M)), h.a.contour));
    out.push(h.path(trace(haut), h.a.detail));
    // le jarret, plié autour du devant du joint
    const jAv = dense(jarretAv), jArr = dense(jarretArr);
    const P = p => M(plie(p));
    const bas = cassure(P(jarretArr[jarretArr.length - 1]), P(jarretAv[jarretAv.length - 1]), 5);
    const jTour = [...jArr.map(P), ...bas.slice(1, -1), ...jAv.slice().reverse().map(P), P([-20, -30]), ...ent.slice().reverse().map(P)];
    out.push(h.path(trace(jTour, true), fond));
    const pliAv = [M(viandeAv[viandeAv.length - 1]), ...jAv.slice(6).map(P)];
    out.push(h.path(trace(pliAv), h.a.contour), h.path(trace(jArr.map(P)), h.a.contour));
    out.push(h.path(trace(ent.map(P)), h.a.arete), h.path(trace(bas), h.a.detail));
    // les os
    out.push(humerusPath(M), jarretPath(M, plie));
    // la lame descend dans le joint ouvert
    const tipL = [24, -16];
    out.push(couteau({ pointe: M(tipL), dir: [0.45, -0.893], lame: 60 * k, larg: 13 * k, manche: 42 * k, epM: 15 * k, e: 1 }));
    // la flèche du pli
    const bout = [0, 190], rr = Math.hypot(bout[0] - FP[0], bout[1] - FP[1]) + 26;
    const a0 = Math.atan2(bout[1] - FP[1], bout[0] - FP[0]) * 180 / Math.PI;
    out.push(h.geste(trace(arcPts(FP, rr, a0 + 4, a0 + PLI - 4, 18).map(M))));
    vueC.geo = { M, k };
    return out.join('\n');
  };
  const renvoisC = z => {
    vueC(z); const { M } = vueC.geo;
    return [
      { n: 10, rond: M([108, 62]), cible: M([24, 30]), texte: 'le joint bâille : la pointe y tranche' },
    ];
  };

  return {
    ref: '64-40',
    titre: 'Démonter le quartier avant sans scie',
    desc: 'L’épaule de l’orignal vue de côté, sur la carcasse écorchée : le pourtour de l’épaule sur le tronc ; dessous, l’omoplate et son cartilage posés sur les côtes, tenus seulement par une écharpe de muscles (en tireté) ; '
      + 'la patte qu’on écarte vers l’avant ouvre l’aisselle ; le couteau y entre, la lame à plat sous l’omoplate, et monte le long des côtes jusqu’au-dessus du cartilage, sous la bosse du garrot, sans couper un os. '
      + 'Puis le coude vu de côté : la face arrière ouverte au couteau, la patte pliée, le joint bâille et le jarret avant se détache.',
    format: 'pleine',
    disposition: [['epaule'], ['coude', 'plie']],
    hauteurs: [1.6, 1],
    vues: {
      epaule: { titre: 'Sur la bête, de côté : la lame monte sous l’omoplate, le long des côtes', dessin: vueA, renvois: renvoisA },
      coude: { titre: 'Le coude : ouvrir la face arrière', dessin: vueB, renvois: renvoisB },
      plie: { titre: 'Plier la patte : le joint bâille', dessin: vueC, renvois: renvoisC },
    },
  };
};
