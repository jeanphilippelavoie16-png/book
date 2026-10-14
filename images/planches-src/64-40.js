// Planche 64-40 — démonter le quartier avant sans scie.
// Chapitre 64, § 3 « L'épaule n'est accrochée à rien », § 5 étape 3 (détacher le quartier : la
// patte écartée, la lame à plat entre l'omoplate et le gril costal, tranchant vers l'os plat, on
// suit les côtes, on finit au-dessus de la pointe de l'omoplate sous la bosse du garrot, aucun os
// coupé) et étape 6 (le jarret avant au coude : ouvrir la face arrière, plier pour faire bâiller
// le joint). Aucun chiffre : le chapitre n'en donne pas pour ce geste. La hanche n'est pas dans
// ce chapitre (quartier arrière, ch. 63) : elle n'est pas dessinée.
// La charte : la cage vidée en gris loin (pas de gris sur les os hachurés) ; le rouge sur la patte
// qu'on écarte, la lame qui descend le long de l'humérus, la patte qu'on plie, et le cercle du point
// où la coupe s'arrête, sous la bosse du garrot.
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
  // Vue A — l'épaule coupée en travers. Moitié droite du dessin en repère propre (x vers
  // l'extérieur, y vers le bas) ; la moitié gauche en est le miroir, en place ; la moitié
  // droite a la patte écartée (le quartier tourne autour de sa pointe, sous la bosse).
  // ════════════════════════════════════════════════════════════════════════════════════
  const RIB_O = [[20, 152], [40, 158], [62, 174], [82, 200], [96, 236], [103, 275], [102, 315], [94, 350], [78, 378], [52, 396], [24, 404], [0, 406]];
  const RIB_I = [[18, 164], [36, 170], [55, 185], [72, 208], [85, 240], [91, 276], [90, 313], [83, 344], [69, 368], [47, 384], [22, 392], [0, 394]];
  const SCAP = [[42, 112], [58, 138], [78, 168], [98, 203], [112, 240], [118, 276]];   // face interne de l'omoplate
  const QEXT = [[38, 100], [62, 106], [90, 126], [116, 156], [136, 194], [147, 236], [150, 278], [147, 318], [141, 350], [138, 385], [136, 420], [135, 452]];
  const JAMBE_INT = [[97, 452], [96, 420], [95, 395], [95, 368]];
  const QINT = [[95, 368], [97, 345], [104, 315], [110, 292], [118, 276]];
  const BOSSE = [[38, 100], [34, 72], [26, 47], [14, 32], [0, 28]];
  const POITRAIL = [[95, 368], [89, 386], [70, 406], [38, 421], [0, 426]];
  const PIV = [38, 100];
  const ECART = -22;          // la patte écartée : le quartier pivote sous la bosse
  const TC = 0.46;            // où en est la coupe le long de l'omoplate

  const ribO = dense(RIB_O), ribI = dense(RIB_I), scapI = dense(SCAP);
  const scapO0 = decale(scapI, 8);
  const ms = Math.round(scapO0.length * 0.42);
  const sd = unit(scapO0[ms - 1], scapO0[ms + 1]), sn = [sd[1], -sd[0]], sc = scapO0[ms];
  const scapO = [...scapO0.slice(0, ms),
    [sc[0] + sn[0] * 21 - sd[0] * 2.5, sc[1] + sn[1] * 21 - sd[1] * 2.5],
    [sc[0] + sn[0] * 25 - sd[0] * 4.2, sc[1] + sn[1] * 25 - sd[1] * 4.2],
    [sc[0] + sn[0] * 27, sc[1] + sn[1] * 27],
    [sc[0] + sn[0] * 25 + sd[0] * 4.2, sc[1] + sn[1] * 25 + sd[1] * 4.2],
    [sc[0] + sn[0] * 21 + sd[0] * 2.5, sc[1] + sn[1] * 21 + sd[1] * 2.5],
    ...scapO0.slice(ms + 1)];
  const scapPoly = [...scapI, ...scapO.slice().reverse()];
  const qext = dense(QEXT), jambe = dense(JAMBE_INT), qint = dense(QINT);

  // l'écharpe : fibres de la face interne de l'omoplate vers le gril costal
  const Lrib = longueurs(ribO), sr0 = Lrib[8] + 4, sr1 = Lrib[5 * 8 + 3];
  const fibres = Array.from({ length: 12 }, (_, i) => {
    const t = 0.05 + 0.86 * i / 11;
    return { t, s: auT(scapI, t).p, r: surLigne(ribO, sr0 + t * (sr1 - sr0)).p };
  });
  // les attaches du haut (entre la pointe de l'omoplate et les épines du dos)
  const hautes = [0, 1, 2, 3].map(i => ({ s: [41 + i * 1.2, 106 + i * 4], r: [4.2, 88 + i * 13] }));

  const vueA = z => {
    const s = Math.min(z.l / 400, z.h / 440);
    const cx = z.l / 2 - 36 * s, oy = (z.h - 440 * s) / 2 - 24 * s;
    const V = p => [cx + p[0] * s, oy + p[1] * s];
    const G = p => V([-p[0], p[1]]);                        // moitié gauche, en place
    const Dq = p => V(rot(p, PIV, ECART));                 // moitié droite, pièces du quartier
    const Dt = p => V(p);                                  // moitié droite, pièces du tronc
    const out = [];

    // le tronc : la bosse et le poitrail
    out.push(h.path(trace(dense([...BOSSE.map(p => [-p[0], p[1]]), ...BOSSE.slice(0, -1).reverse()]).map(V)), h.a.contour));
    out.push(h.path(trace(dense([...POITRAIL.map(p => [-p[0], p[1]]), ...POITRAIL.slice(0, -1).reverse()]).map(V)), h.a.contour));
    // à droite, l'aisselle ouverte : la tranche du poitrail contre les côtes
    out.push(h.path(trace([[95, 368], [96, 356], [95.5, 348]].map(Dt)), h.a.arete));

    // le gril costal (un U d'os coupé) et le sternum
    const riboL = ribO.map(p => [-p[0], p[1]]), ribiL = ribI.map(p => [-p[0], p[1]]);
    // la cage vidée, vue par la coupe : en gris loin, peinte avant les os (elle s'arrête sous la vertèbre)
    const sousVert = [[-16, 172], [-12, 181], [-5, 186], [5, 186], [12, 181], [16, 172]];
    out.push(h.path(trace([...ribI, ...ribiL.slice().reverse(), ...sousVert].map(V), true), h.a.loin));
    const bande = [...ribO, ...riboL.slice(0, -1).reverse(), ...ribiL, ...ribI.slice(0, -1).reverse()];
    out.push(h.path(trace(bande.map(V), true), h.a.hachure('bois')));
    // la vertèbre et son épine, qui fait la bosse
    const vert = [[-4.5, 142], [-4.6, 66], [-4, 59.5], [-2.5, 55.5], [0, 54.2], [2.5, 55.5], [4, 59.5], [4.6, 66], [4.5, 142], [10, 145], [15, 148], [20, 151], [20.5, 157], [16, 160], [14.5, 163],
      [16, 172], [12, 181], [5, 186], [-5, 186], [-12, 181], [-16, 172], [-14.5, 163], [-16, 160], [-20.5, 157], [-20, 151], [-15, 148], [-10, 145]];
    out.push(h.path(trace(vert.map(V), true), h.a.hachure('bois')));
    const cv = V([0, 154]);
    out.push(h.cercle(cv[0], cv[1], 5 * s, blanc('arete')));

    // l'écharpe à gauche : intacte
    fibres.forEach(F => out.push(h.path(trace([G(F.s), G(F.r)]), h.a.fin)));
    hautes.forEach(F => out.push(h.path(trace([G(F.s), G(F.r)]), h.a.fin)));
    // à droite : le haut tient encore, tendu ; le bas est tranché
    fibres.forEach(F => {
      const a = Dq(F.s), b = Dt(F.r);
      if (F.t < TC) out.push(h.path(trace([a, b]), h.a.fin));
      else {
        const d = unit(a, b), L = 6 * s;
        out.push(h.path(trace([a, [a[0] + d[0] * L, a[1] + d[1] * L]]), h.a.fin));
        out.push(h.path(trace([b, [b[0] - d[0] * L, b[1] - d[1] * L]]), h.a.fin));
      }
    });
    hautes.forEach(F => out.push(h.path(trace([Dq(F.s), Dt(F.r)]), h.a.fin)));

    // le quartier : la viande, l'omoplate, la patte
    const quartier = (M) => {
      const bas = cassure(M(qext[qext.length - 1]), M(jambe[0]), 4.5);
      const contour = [...qext.map(M), ...bas.slice(1, -1), ...jambe.map(M), ...qint.slice(1).map(M), ...scapI.slice().reverse().slice(1).map(M)];
      return [
        h.path(trace(contour, true), fond),
        h.path(trace(qext.map(M)), h.a.contour),
        h.path(trace(bas), h.a.detail),
        h.path(trace(jambe.map(M)), h.a.contour),
        h.path(trace(qint.map(M)), h.a.arete),
        h.path(trace(scapPoly.map(M), true), h.a.hachure('bois')),
        // l'humérus, coupé plus bas dans la masse du bras : il part avec le quartier
        h.path(trace(arcPts([121, 330], 1, 0, 360, 28).map(p => [121 + (p[0] - 121) * 10, 330 + (p[1] - 330) * 13]).map(M), true), h.a.hachure('bois')),
      ].join('\n');
    };
    out.push(quartier(G));
    out.push(quartier(Dq));

    // le couteau, à plat contre les côtes, le tranchant vers l'omoplate, la pointe au front de coupe
    const fr = surLigne(ribO, sr0 + TC * (sr1 - sr0) - 3);
    const nOut = [fr.t[1], -fr.t[0]];
    const tip = [fr.p[0] + nOut[0] * 4.5, fr.p[1] + nOut[1] * 4.5];
    const dir = unit(tip, surLigne(ribO, sr0 + TC * (sr1 - sr0) + 40).p.map((v, i) => v + nOut[i] * 9));
    const nK = [dir[1], -dir[0]], dos = (nK[0] * nOut[0] + nK[1] * nOut[1]) > 0 ? -1 : 1;   // le dos côté côtes
    out.push(couteau({ pointe: Dt(tip), dir, lame: 48 * s, larg: 8.5 * s, manche: 42 * s, epM: 10 * s, e: -1, dos }));

    // le chemin de la lame : on monte le long des côtes jusqu'au-dessus de la pointe de l'omoplate
    const chemin = [];
    const sTip = sr0 + TC * (sr1 - sr0) - 10;
    for (let x = sTip; x > 4; x -= 6) { const q = surLigne(ribO, x); chemin.push([q.p[0] + q.t[1] * 5, q.p[1] - q.t[0] * 5]); }
    chemin.push([33, 140], [34, 118], [37, 106]);
    out.push(h.fleche(trace(dense(chemin, 4).map(Dt)), h.a.cache));

    // la patte écartée : la flèche suit la rotation autour de la pointe de l'omoplate
    const pj = rot([136, 440], PIV, ECART), rr = Math.hypot(pj[0] - PIV[0], pj[1] - PIV[1]) + 18;
    const th = Math.atan2(pj[1] - PIV[1], pj[0] - PIV[0]) * 180 / Math.PI;
    out.push(h.geste(trace(arcPts(PIV, rr, th + 3, th - 9, 16).map(V))));
    // le point qui arrête la coupe : au-dessus de la pointe de l'omoplate, sous la bosse
    const fc = Dt([36, 106]);
    out.push(h.controle(fc[0], fc[1], 11));

    vueA.geo = { V, G, Dq, Dt, s, tip, dir, fin: [37, 106] };
    return out.join('\n');
  };

  const renvoisA = z => {
    vueA(z);
    const { V, G, Dq, Dt, s, tip, dir } = vueA.geo;
    const midScap = [(auT(scapI, 0.7).p[0] + auT(scapO0, 0.7).p[0]) / 2, (auT(scapI, 0.7).p[1] + auT(scapO0, 0.7).p[1]) / 2];
    const fib = fibres[7], mf = [(fib.s[0] + fib.r[0]) / 2, (fib.s[1] + fib.r[1]) / 2];
    const lameMil = Dt([tip[0] + dir[0] * 20, tip[1] + dir[1] * 20]);
    return [
      { n: 1, rond: V([-212, 205]), cible: G(midScap), texte: 'l’omoplate : aucun os ne la retient' },
      { n: 2, rond: V([-42, 222]), cible: G(mf), texte: 'l’écharpe de muscles, seule attache' },
      { n: 3, rond: V([-42, 296]), cible: G([97, 296]), texte: 'le gril costal' },
      { n: 4, rond: V([262, 300]), cible: Dq([138, 400]), texte: 'la patte écartée ouvre l’aisselle' },
      { n: 5, rond: V([45, 262]), cible: lameMil, texte: 'lame à plat, tranchant vers l’omoplate' },
      { n: 6, rond: V([96, 62]), cible: Dt([36, 108]), texte: 'fin de coupe, sous la bosse du garrot' },
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
    desc: 'L’épaule coupée en travers : l’omoplate n’est tenue au gril costal que par une écharpe de muscles ; '
      + 'la patte écartée ouvre l’aisselle, la lame à plat suit les côtes et finit sous la bosse du garrot, sans couper un os. '
      + 'Puis le coude vu de côté : la face arrière ouverte au couteau, la patte pliée, le joint bâille et le jarret avant se détache.',
    format: 'pleine',
    disposition: [['epaule'], ['coude', 'plie']],
    hauteurs: [1.15, 1],
    vues: {
      epaule: { titre: 'En travers de l’épaule : en place à gauche, la patte écartée à droite', dessin: vueA, renvois: renvoisA },
      coude: { titre: 'Le coude : ouvrir la face arrière', dessin: vueB, renvois: renvoisB },
      plie: { titre: 'Plier la patte : le joint bâille', dessin: vueC, renvois: renvoisC },
    },
  };
};
