// Planche 38-04 — Prendre le pouls au poignet.
// Chapitre 38, section H, point 45 : « Le pouls se prend au poignet, sous la base du pouce, avec
// l'index et le majeur posés à plat, compté 15 secondes et multiplié par 4. Il ne vaut qu'au repos,
// assis depuis une dizaine de minutes. » Le même geste sert aux ch. 26 et 35 : la planche ne porte
// pas le seuil de 100 du ch. 38, seulement le geste.
// Aucune cote : c'est un geste, rien ne se construit.
//
// Les deux mains sont montées avec les pièces de la bibliothèque de formes (tube, plie, peindre),
// sur le modèle de la main à plat vue de dessus (appuiDos) :
//   · la main qu'on mesure est une main gauche, paume en haut, doigts vers la droite, pouce en
//     haut : même silhouette que la main droite vue du dos, mais sans ongles, avec les plis de la
//     paume, des doigts et du poignet ;
//   · la main qui mesure est une main droite vue du dos, arrivée du côté de l'auriculaire (en bas) :
//     l'index et le majeur tendus en travers du poignet, leur bout posé côté pouce ; l'annulaire et
//     l'auriculaire repliés ; le pouce libre, écarté. Les premières phalanges passent par-dessus le
//     rebord du poignet : elles sont raccourcies par la vue de dessus.
// Repère : le millimètre d'adulte, origine aux jointures de la main mesurée, y vers le bas.
module.exports = (h) => {
  const A = h.a, I = h.formes._interne;
  const RAD = Math.PI / 180;
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const mul = (a, k) => [a[0] * k, a[1] * k];
  const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  const dirA = d => [Math.cos(d * RAD), Math.sin(d * RAD)];

  // les phalanges (mm) et les épaisseurs aux jointures, celles de formes.js
  const DG = {
    index:       { ph: [43, 25, 21], ep: [19, 16.2, 14.2, 12.2] },
    majeur:      { ph: [46, 28, 22], ep: [19.5, 16.8, 14.8, 12.6] },
    annulaire:   { ph: [43, 27, 21], ep: [18, 15.6, 13.8, 11.8] },
    auriculaire: { ph: [34, 20, 19], ep: [16, 13.6, 12.2, 10.6] },
  };
  const gros = nom => ({ ...DG[nom], ep: DG[nom].ep.map(v => v * 1.07) });
  const faceW = ep => [[ep[0] / 2, ep[1] / 2], [ep[1] / 2, ep[2] / 2], [ep[2] / 2, ep[3] / 2]];
  const WX = -92;                          // le poignet
  const wP = [[13.5, 11.5], [11, 10.5], [10.5, 8.4]];
  const poucePts = (angles) => {
    const p = [[WX + 10, -21]];
    [44, 32, 26].forEach((l, i) => p.push(add(p[i], mul(dirA(angles[i]), l))));
    return p;
  };
  const face = (d, pts, o) => I.tube({ pts, dos: faceW(d.ep), ventre: faceW(d.ep), coussin: [-0.15, -0.1, 0.15],
    bosseDos: [-0.15, -0.1, 0.15], bout: 'rond', base: 16, ...o });
  const webEntre = (a, wa, b, wb, s) => {
    const pa = I.pointBord(a, wa, 1, -1, s), pb = I.pointBord(b, wb, 1, 1, s);
    const fond = lerp(I.pointBord(a, wa, 1, -1, s - 4), I.pointBord(b, wb, 1, 1, s - 4), 0.5);
    return [['M', pa], ['Q', fond, pb]];
  };

  // ── la main mesurée : main gauche, paume en haut ──────────────────────────────────────
  function paumeEnHaut(bras) {
    const cut = WX - bras, pieces = [];
    const doigts = [['index', [0, -27.5], -2.5], ['majeur', [4.5, -8.8], -0.3], ['annulaire', [1, 9.6], 2.2], ['auriculaire', [-9, 26.8], 5.5]]
      .map(([nom, P0, a]) => { const d = gros(nom); return { d, w: faceW(d.ep), pts: I.plie(P0, dirA(a), d.ph, [0, 1, 0.8], 1) }; });
    const ptsP = poucePts([-38, -24, -17]);
    const bP = s => I.pointBord(ptsP, wP, 1, 1, s), vP = s => I.pointBord(ptsP, wP, 1, -1, s);
    const bI = s => I.pointBord(doigts[0].pts, doigts[0].w, 1, 1, s);
    const vA = s => I.pointBord(doigts[3].pts, doigts[3].w, 1, -1, s);
    const sW = 21;
    const haut = I.lisse([[cut, -30.5], [WX - 8, -29.5], bP(0)]);
    const web1 = I.lisse([vP(58), [-2, -45], bI(5)]);
    const cubital = I.lisse([vA(8), [12, 37.5], [-20, 38.5], [-55, 35], [WX, 30], [cut, 31.5]]);
    const webs = [0, 1, 2].map(i => webEntre(doigts[i].pts, doigts[i].w, doigts[i + 1].pts, doigts[i + 1].w, sW));
    const remp = [...I.lisse([[cut, -30.5], [WX - 8, -29.5], bP(0), vP(40), vP(58), [-2, -45], bI(5), [30, -30], [40, 0], [30, 30],
      vA(8), [12, 37.5], [-20, 38.5], [-55, 35], [WX, 30], [cut, 31.5]]), ['Z']];
    pieces.push({ remp, trait: [haut, web1, cubital, ...webs], det: [] });
    // les doigts vus du côté de la paume : pas d'ongle, les plis de flexion aux jointures
    doigts.forEach((g, i) => pieces.push(face(g.d, g.pts, { ongle: null,
      rides: [{ j: 1, n: 2, l: 0.62 }, { j: 2, n: 1, l: 0.55 }],
      ouvre: { dos: i === 0 ? 5 : sW, ventre: i === 3 ? 8 : sW } })));
    pieces.push(I.tube({ pts: ptsP, sens: 1, dos: wP, ventre: wP, coussin: [0, -0.3, 0.3], bosseDos: [0, -0.3, 0.3],
      bout: 'rond', ongle: null, base: 0, rides: [{ j: 2, n: 1, l: 0.55 }], ouvre: { dos: 0, ventre: 58 } }));
    // les plis de la paume : celui qui fait le tour du gras du pouce, les deux plis en travers,
    // et le pli du poignet
    const plis = [
      I.lisse([[-10, -36], [-26, -25], [-46, -14], [-68, -9], [-87, -9]]),
      I.lisse([[-10, -36], [-22, -20], [-35, -2], [-47, 15]]),
      I.lisse([[-30, 36], [-21, 21], [-15, 6], [-9, -10]]),
      I.lisse([[WX + 3, -27], [WX + 1, -9], [WX + 1.5, 10], [WX + 3.5, 27]]),
    ];
    pieces.push({ remp: null, trait: [], det: plis, silhouette: false, epDet: 0.5 });
    return pieces;
  }

  // ── la main qui mesure : main droite vue du dos, deux doigts tendus ───────────────────
  // kI, kM : le raccourci de la première phalange de l'index et du majeur (elles montent sur le
  // rebord du poignet).
  function deuxDoigts(bras, kI, kM) {
    const cut = WX - bras, pieces = [];
    const dI = gros('index'), dM = gros('majeur'), wI = faceW(dI.ep), wM = faceW(dM.ep);
    const ptsI = I.plie([0, -27.5], dirA(1.5), [DG.index.ph[0] * kI, 25, 21], [0, 1, 0.8], 1);
    const ptsM = I.plie([4.5, -8.8], dirA(-1.5), [DG.majeur.ph[0] * kM, 28, 22], [0, 1, 0.8], 1);
    const ptsP = poucePts([-46, -32, -24]);
    const bP = s => I.pointBord(ptsP, wP, 1, 1, s), vP = s => I.pointBord(ptsP, wP, 1, -1, s);
    const bI = s => I.pointBord(ptsI, wI, 1, 1, s);
    const sW = 0.5 * Math.min(DG.index.ph[0] * kI, DG.majeur.ph[0] * kM) + 3;
    const bandes = [['auriculaire', [-9, 26.8], 12], ['annulaire', [1, 9.6], 14]];
    const lit = bandes[0][1], wA = gros('auriculaire').ep[0] / 2;
    const haut = I.lisse([[cut, -30.5], [WX - 8, -29.5], bP(0)]);
    const web1 = I.lisse([vP(58), [-2, -45], bI(5)]);
    const cubital = I.lisse([add(lit, [2, wA]), [-26, 37.5], [-56, 34], [WX, 30], [cut, 31.5]]);
    const web = webEntre(ptsI, wI, ptsM, wM, sW);
    const remp = [...I.lisse([[cut, -30.5], [WX - 8, -29.5], bP(0), vP(40), vP(58), [-2, -45], bI(5), [9, -30], [12, -9],
      [7, 9], [0, 27], add(lit, [2, wA]), [-26, 37.5], [-56, 34], [WX, 30], [cut, 31.5]]), ['Z']];
    pieces.push({ remp, trait: [haut, web1, cubital, web], det: [] });
    // l'annulaire et l'auriculaire repliés : on voit le dos de la première phalange, qui plonge
    const arcs = [];
    for (const [nom, a, L] of bandes) {
      const d = gros(nom), w = d.ep[0] / 2, w1 = d.ep[1] / 2 + 0.4;
      pieces.push(I.tube({ pts: [a, add(a, [L, 0.6])], dos: [[w, w1]], ventre: [[w, w1]], bout: 'phalange', base: 14,
        coussin: [0.4], bosseDos: [0.4], ouvre: nom === 'auriculaire' ? { ventre: 2 } : null }));
      arcs.push([['M', add(a, [3.5, -w * 0.5])], ['Q', add(a, [-1.2, 0]), add(a, [3.5, w * 0.5])]]);
    }
    pieces.push(face(dM, ptsM, { ongle: 'dessus', ouvre: { dos: sW, ventre: 4 } }));
    pieces.push(face(dI, ptsI, { ongle: 'dessus', ouvre: { dos: 5, ventre: sW } }));
    pieces.push(I.tube({ pts: ptsP, sens: 1, dos: wP, ventre: wP, coussin: [0, -0.3, 0.3], bosseDos: [0, -0.3, 0.3],
      bout: 'rond', ongle: 'dessus', base: 0, ouvre: { dos: 0, ventre: 58 } }));
    const nodes = [[ptsI[0], dI], [ptsM[0], dM]].map(([p, d]) => { const w = d.ep[0] * 0.28;
      return [['M', add(p, [-2, -w])], ['Q', add(p, [2.5, 0]), add(p, [-2, w])]]; });
    pieces.push({ remp: null, trait: [], det: [...nodes, ...arcs], silhouette: false, epDet: 0.5 });
    return pieces;
  }

  // ── mise en place ─────────────────────────────────────────────────────────────────────
  const BRAS = 100;                         // l'avant-bras mesuré dessiné, en mm
  const POULS = [-106, -15];                // sous la base du pouce, juste avant le pli du poignet
  // la main qui mesure : ses jointures en (OX, OY) du repère de la main mesurée, tournée de ANG
  // (les doigts vers le haut, le pouce à gauche) ; l'index et le majeur à cheval sur le pouls
  // ANG : l'avant-bras qui mesure arrive d'en bas à droite, comme quand on prend son propre pouls.
  // Q : le milieu des deux bouts de doigts dans le repère de la main qui mesure ; il tombe 6 mm
  // côté auriculaire du pouls, pour que la pulpe (le dessous du bout) soit dessus.
  const ANG = -105, Q = [63, -17.8];
  const cq = Math.cos(ANG * RAD), sq = Math.sin(ANG * RAD);
  const OX = POULS[0] - (Q[0] * cq - Q[1] * sq), OY = POULS[1] + 6 - (Q[0] * sq + Q[1] * cq);
  const S = 1.55;                           // px par mm, le même dans les deux vues
  const X0 = z => z.l / 2 + 42 * S;         // où tombe l'origine dans la vue
  const T = (z, y0) => I.repere({ x: X0(z), y: y0, echelle: S });
  const pt = (z, y0, p) => T(z, y0)(p).map(v => Math.round(v * 10) / 10);
  const Y1 = z => z.h / 2 + 19 * S, Y2 = z => z.h / 2 - 54 * S;

  const mesuree = (z, y0) => I.peindre(paumeEnHaut(BRAS), T(z, y0));
  const R = I.repere({ x: OX, y: OY, echelle: 1, angle: ANG });
  const mesurant = (z, y0) => { const T0 = T(z, y0); return I.peindre(deuxDoigts(45, 0.54, 0.44), p => T0(R(p))); };

  return {
    ref: '38-04',
    titre: 'Prendre le pouls au poignet',
    desc: 'Deux vues de dessus, à la même échelle, d’un avant-bras gauche posé paume en haut, la main à droite et le pouce en haut. '
      + 'En haut, le poignet seul : un cercle tireté marque l’endroit du pouls, sur le poignet, sous la base du pouce, juste avant le pli du poignet. '
      + 'En bas, la main droite de celui qui prend le pouls arrive du côté de l’auriculaire : l’index et le majeur, tendus côte à côte, '
      + 'passent en travers du poignet et se posent à plat sur cet endroit ; l’annulaire et l’auriculaire sont repliés, le pouce reste libre. '
      + 'On compte les battements 15 secondes, puis on multiplie par 4.',
    format: 'pleine',
    disposition: [['ou'], ['doigts']],
    hauteurs: [1, 2],
    vues: {
      ou: {
        titre: 'Au repos, assis depuis une dizaine de minutes',
        dessin: z => [
          mesuree(z, Y1(z)),
          (() => { const c = pt(z, Y1(z), POULS); return h.cercle(c[0], c[1], 9 * S, A.cache); })(),
        ].join('\n'),
        renvois: z => [
          { n: 1, rond: pt(z, Y1(z), [-178, -52]), cible: pt(z, Y1(z), [-160, 2]), texte: 'l’avant-bras posé, paume en haut' },
          { n: 2, rond: pt(z, Y1(z), [-128, -60]), cible: pt(z, Y1(z), [POULS[0] - 5, POULS[1] - 8]), texte: 'le pouls, sous la base du pouce' },
        ],
      },
      doigts: {
        titre: 'Deux doigts à plat, compter 15 secondes, multiplier par 4',
        dessin: z => [mesuree(z, Y2(z)), mesurant(z, Y2(z))].join('\n'),
        renvois: z => [
          { n: 3, rond: pt(z, Y2(z), [-165, -52]), cible: pt(z, Y2(z), R([40, -25])), texte: 'l’index et le majeur, à plat' },
        ],
      },
    },
  };
};
