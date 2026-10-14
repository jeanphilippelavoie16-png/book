// Planche 89-01b — Le fût de la raquette, cintrer et fermer (ch. 89, étapes 7, 13 à 16, 19 à 22, §9)
// La charte : pas de gris (vues de dessus, coupes hachurées, bâton trop mince pour une ombre) ;
// les poids restent : le fût est une bande de 5 à 7 px, un contour fort le boucherait. Le rouge :
// ramener le côté au trait (le geste, sur le gabarit), écarter les bouts (le geste, aux
// traverses), la bande aussi large que le bois (le point à vérifier, étape 14) et, sur le raté,
// l'écharde qui lève (l'endroit où ça casse).
module.exports = (h) => ({
  ref: '89-01b',
  titre: 'Le fût de la raquette, cintrer et fermer',
  desc: 'En haut, vu de dessus, le gabarit : une planche où est tracé le contour intérieur d’une raquette queue de castor, pointe à gauche, avec des taquets cloués en dedans du trait ; le bâton est plié autour, le milieu au nez ; la pointe et le côté du haut sont finis et tenus par des taquets du dehors ; le côté du bas part encore tout droit de la pointe, et une flèche courbe le ramène vers le trait ; trois taquets du dehors attendent sur la planche, leurs clous déjà plantés. Cotes 107 cm de long, 30 cm de large. Au milieu à gauche, la pointe sur le gabarit, nez en haut, avec la sangle : une bande d’acier couchée sur la face extérieure du bâton tout autour du nez, serrée au bois par une ligature de chaque côté au-delà de la courbe, les taquets du dehors appuyés sur la bande ; à droite, en coupe, le bâton debout sur la planche entre un taquet du dedans et un du dehors, la bande aussi haute que lui, cote 27 mm. Au milieu à droite, la pointe pliée sans sangle, en grand : des échardes qui se détachent de la face extérieure et partent tout droit, la face intérieure plissée mais entière. En bas à gauche, le fût sec sorti du gabarit, les deux bouts de la queue écartés par deux flèches, la traverse avant déjà dans ses mortaises, la traverse arrière qui n’y est pas encore ; cote 38 à 41 cm entre les deux. En bas au milieu, en coupe, le bout d’une traverse entré dans une mortaise creusée dans la face intérieure du fût, cote 6 mm. En bas à droite, la queue fermée : vue de dessus, les deux bouts collés côte à côte et trois ligatures de babiche ; vue de côté, trois trous, le premier à 10 cm du bout, la babiche qui y passe.',
  format: 'pleine',
  disposition: [['gabarit'], ['sangle', 'sans'], ['traverses', 'mortaise', 'queue']],
  hauteurs: [2.5, 2, 2],
  largeurs: [[1], [3, 2], [2.5, 1.2, 1.8]],
  vues: {
    // ─── Sur le gabarit ───────────────────────────────────────────────────────────────
    gabarit: {
      titre: 'Sur le gabarit, vu de dessus',
      dessin: z => {
        const G = gabarit(z);
        return [
          h.path(G.planche, h.a.blanc),
          ...G.fil.map(f => h.path(f, h.a.fin)),
          h.path(G.planche, h.a.arete),
          h.path(G.trait, h.a.detail),
          ...G.taquets.map(t => h.chemin(t.pts, h.a.hachure('bois', 'arete'), true) + '\n' + h.cercle(t.c[0], t.c[1], 1.3, h.a.plein)),
          h.path(G.futH, h.a.blanc), h.path(G.futH, h.a.arete),
          h.path(G.futB, h.a.blanc), h.path(G.futB, h.a.arete),
          h.geste(G.flB),
          h.cote(G.T([0, -3])[0], G.T([0, -3])[1], G.T([107, -3])[0], G.T([107, -3])[1], '107 cm'),
          h.cote(G.T([38, -15])[0], G.T([38, -15])[1], G.T([38, 15])[0], G.T([38, 15])[1], '30 cm'),
        ].join('\n');
      },
      renvois: z => {
        const G = gabarit(z);
        return [
          { n: 1, rond: [G.pTaqIn[0] - 30, z.h - 12], cible: G.pTaqIn, texte: 'trait, taquets en dedans' },
          { n: 2, rond: [16, 20], cible: G.T([-0.3, -1.5]), texte: 'le milieu du bâton au nez' },
          { n: 3, rond: [z.l - 14, 16], cible: G.pLibre, texte: 'dehors : clous déjà plantés' },
          { n: 4, rond: [z.l - 14, G.pFl[1] + 4], cible: G.pFl, texte: 'un côté, puis l’autre' },
        ];
      },
    },

    // ─── La sangle ────────────────────────────────────────────────────────────────────
    sangle: {
      titre: 'La sangle, à la pointe',
      dessin: z => {
        const S = sangle(z, h);
        return [
          h.path(S.fut, h.a.blanc), h.path(S.fut, h.a.arete),
          h.path(S.bande, h.a.plein),
          ...S.taquets.map(t => h.chemin(t.pts, h.a.hachure('bois', 'arete'), true) + '\n' + h.cercle(t.c[0], t.c[1], 1.3, h.a.plein)),
          ...S.ligatures.map(l => l),
          // la coupe : le bâton debout sur la planche, entre ses taquets, la bande contre la face extérieure
          h.rect(S.cp.x0 - 8, S.cp.yP, S.cp.x1 - S.cp.x0 + 16, 10, h.a.hachure('bois', 'arete')),
          h.rect(S.cp.xTi, S.cp.yP - S.cp.hT, S.cp.lT, S.cp.hT, h.a.hachure('bois', 'arete')),
          h.rect(S.cp.xF, S.cp.yP - S.cp.hF, S.cp.lF, S.cp.hF, h.a.hachure('bois', 'contour')),
          h.rect(S.cp.xF + S.cp.lF, S.cp.yP - S.cp.hF, S.cp.lB, S.cp.hF, h.a.plein),
          h.rect(S.cp.xTe, S.cp.yP - S.cp.hT, S.cp.lT, S.cp.hT, h.a.hachure('bois', 'arete')),
          h.cote(S.cp.x0 - 18, S.cp.yP - S.cp.hF, S.cp.x0 - 18, S.cp.yP, '27 mm', { cote: 'gauche' }),
          // le point à vérifier : la bande arrive au ras du bois
          h.controle(S.cp.xF + S.cp.lF + S.cp.lB / 2, S.cp.yP - S.cp.hF, 10),
        ].join('\n');
      },
      renvois: z => {
        const S = sangle(z, h);
        return [
          { n: 5, rond: [S.cx - 70, 14], cible: S.pBande, texte: 'feuillard ou lame de scie' },
          { n: 6, rond: [16, z.h - 16], cible: S.pLig, texte: 'serrée au-delà de la courbe' },
          { n: 7, rond: [z.l - 14, 18], cible: [S.cp.xF + S.cp.lF + 1.5, S.cp.yP - S.cp.hF + 10], texte: 'aussi large que le bois' },
        ];
      },
    },

    // ─── Sans sangle ──────────────────────────────────────────────────────────────────
    sans: {
      titre: 'Sans sangle',
      dessin: z => {
        const X = sans(z);
        return [
          h.path(X.fut, h.a.blanc),
          ...X.fil.map(f => h.path(f, h.a.fin)),
          ...X.plis.map(p => h.chemin(p, h.a.fin)),
          h.path(X.fut, h.a.contour),
          ...X.echardes.map(e => h.chemin(e, h.a.blanc, true) + '\n' + h.chemin(e, h.a.arete, true)),
          // l'endroit où ça casse : l'écharde qui lève de la face extérieure
          h.controle((X.echardes[1][0][0] + X.echardes[1][3][0]) / 2, (X.echardes[1][0][1] + X.echardes[1][3][1]) / 2, 13),
        ].join('\n');
      },
      renvois: z => {
        const X = sans(z);
        return [
          { n: 8, rond: [z.l - 16, 18], cible: X.pEch, texte: 'écharde qui lève : arrêter' },
          { n: 9, rond: [z.l / 2, z.h - 14], cible: X.pPli, texte: 'face intérieure, comprimée' },
        ];
      },
    },

    // ─── Les traverses ────────────────────────────────────────────────────────────────
    traverses: {
      titre: 'Les traverses, avant de fermer',
      dessin: z => {
        const R = traverses(z);
        return [
          h.path(R.fut, h.a.blanc), h.path(R.fut, h.a.arete),
          ...R.trav.map(t => h.chemin(t, h.a.blanc, true) + '\n' + h.chemin(t, h.a.arete, true)),
          ...R.fleches.map(f => h.geste(f)),
          h.cote(R.xT[0], R.yCote, R.xT[1], R.yCote, '38 à 41 cm', { cote: 'dessous' }),
        ].join('\n');
      },
      renvois: z => {
        const R = traverses(z);
        return [
          { n: 10, rond: [z.l - 12, z.h - 44], cible: R.pFl, texte: 'corde ôtée, bouts écartés' },
          { n: 11, rond: [R.xT[0] - 26, 16], cible: R.pTrav, texte: 'traverse d’épinette sèche' },
        ];
      },
    },

    // ─── La mortaise ──────────────────────────────────────────────────────────────────
    mortaise: {
      titre: 'La mortaise',
      dessin: z => {
        const M = mortaise(z);
        return [
          h.path(M.fut, h.a.hachure('bois', 'arete')),
          h.path(M.trav, h.a.blanc),
          ...M.fil.map(f => h.path(f, h.a.fin)),
          h.path(M.trav, h.a.arete),
          h.cote(M.xFond, M.yCote, M.xFace, M.yCote, '6 mm'),
        ].join('\n');
      },
      renvois: z => {
        const M = mortaise(z);
        return [
          { n: 12, rond: [z.l - 16, z.h - 18], cible: [M.xFond + 3, M.yT1 - 2], texte: 'creusée du côté intérieur' },
        ];
      },
    },

    // ─── La queue fermée ──────────────────────────────────────────────────────────────
    queue: {
      titre: 'La queue fermée',
      dessin: z => {
        const Q = queue(z);
        return [
          // vue de dessus
          ...Q.bouts.map(b => h.path(b, h.a.blanc) + '\n' + h.path(b, h.a.arete)),
          ...Q.toursP.map(t => h.chemin(t, h.a.blanc, true) + '\n' + h.chemin(t, h.a.detail, true)),
          // vue de côté
          h.path(Q.elev, h.a.blanc),
          ...Q.filE.map(f => h.path(f, h.a.fin)),
          h.path(Q.elev, h.a.arete),
          ...Q.toursE.map(t => h.chemin(t, h.a.blanc, true) + '\n' + h.chemin(t, h.a.detail, true)),
          ...Q.trous.map(c => h.cercle(c[0], c[1], 2.4, h.a.plein)),
          h.cote(Q.xTrou1, Q.yCote, Q.xBout, Q.yCote, '10 cm', { cote: 'dessous' }),
        ].join('\n');
      },
      renvois: z => {
        const Q = queue(z);
        return [
          { n: 13, rond: [16, Q.yE - 16], cible: [Q.trous[2][0] - 1, Q.trous[2][1]], texte: 'deux bouts, trois trous' },
          { n: 14, rond: [z.l - 40, 14], cible: Q.pTourP, texte: 'babiche mouillée, sans vis' },
        ];
      },
    },
  },
});

// ─── Outils ──────────────────────────────────────────────────────────────────────────────
const r1 = v => Math.round(v * 10) / 10;
const P = pts => pts.map((p, i) => (i ? 'L' : 'M') + r1(p[0]) + ',' + r1(p[1])).join(' ');
const rad = d => d * Math.PI / 180;
const pas = (a, b, n) => Array.from({ length: n + 1 }, (_, i) => a + (b - a) * i / n);
const casse = (x, y0, y1, s = 1) => {
  const m = (y0 + y1) / 2, k = y1 > y0 ? 1 : -1;
  return [[x, y0], [x, m - 5 * k], [x + 4 * s, m - 2 * k], [x - 4 * s, m + 2 * k], [x, m + 5 * k], [x, y1]];
};
const casseV = (y, x0, x1, s = 1) => casse(y, x0, x1, s).map(([a, b]) => [b, a]);   // cassure horizontale

// Normales et bande autour d'une polyligne
function normales(pts) {
  return pts.map((p, i) => {
    const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
    return [-(b[1] - a[1]) / L, (b[0] - a[0]) / L];
  });
}
const decaler = (pts, d) => { const N = normales(pts); return pts.map((p, i) => [p[0] + N[i][0] * d, p[1] + N[i][1] * d]); };
const bande = (pts, w) => decaler(pts, w / 2).concat(decaler(pts, -w / 2).reverse());
const longueur = pts => pts.reduce((s, p, i) => i ? s + Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1]) : 0, 0);
// point, tangente à l'abscisse curviligne s
function aAbscisse(pts, s) {
  let acc = 0;
  for (let i = 1; i < pts.length; i++) {
    const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    if (acc + d >= s) {
      const t = (s - acc) / d;
      return { p: [pts[i - 1][0] + t * (pts[i][0] - pts[i - 1][0]), pts[i - 1][1] + t * (pts[i][1] - pts[i - 1][1])], u: [(pts[i][0] - pts[i - 1][0]) / d, (pts[i][1] - pts[i - 1][1]) / d], i };
    }
    acc += d;
  }
  const n = pts.length - 1, d = Math.hypot(pts[n][0] - pts[n - 1][0], pts[n][1] - pts[n - 1][1]);
  return { p: pts[n], u: [(pts[n][0] - pts[n - 1][0]) / d, (pts[n][1] - pts[n - 1][1]) / d], i: n };
}
// jusqu'à l'abscisse s
function jusqua(pts, s) {
  const { p, i } = aAbscisse(pts, s);
  return pts.slice(0, i).concat([p]);
}
// un taquet : rectangle posé le long de la tangente u, centré en c (cm), long l, large w
function taquet(c, u, l = 2.6, w = 1.4) {
  const n = [-u[1], u[0]];
  return [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([a, b]) => [c[0] + u[0] * a * l / 2 + n[0] * b * w / 2, c[1] + u[1] * a * l / 2 + n[1] * b * w / 2]);
}

// Demi-largeur de l'axe du fût d'une raquette queue de castor de 107 × 30 cm, en cm,
// à la distance x de la pointe : un nez en demi-ellipse, puis une queue qui se referme.
function demiLargeur(x) {
  if (x <= 38) return 15 * Math.sqrt(Math.max(0, 1 - ((38 - x) / 38) ** 2));
  const s = Math.min(1, (x - 38) / 57);
  return 0.7 + 14.3 * (1 - (3 * s * s - 2 * s * s * s));
}
// une moitié de l'axe, du nez à la queue ; c = -1 en haut, +1 en bas
const moitie = (c, n = 90, ecart = 0) => pas(0, 1, n).map(t => 107 * (1 - Math.cos(Math.PI * t)) / 2)
  .map(x => [x, c * (demiLargeur(x) + ecart * (x / 107) ** 2)]);
// normale vers le dedans de la raquette
const dedans = (c, u) => c < 0 ? [-u[1], u[0]] : [u[1], -u[0]];

const EP = 1.2;   // épaisseur du fût, en cm (11 à 14 mm)

// ─── Le gabarit ─────────────────────────────────────────────────────────────────────────
function gabarit(z) {
  const sc = 4.4, ox = 30 + 7 * sc, oy = 8 + 19.5 * sc;
  const T = ([x, y]) => [r1(ox + x * sc), r1(oy + y * sc)];
  const planche = P([[-7, -19.5], [116, -19.5], [116, 19.5], [-7, 19.5]].map(T)) + ' Z';
  const fil = [[-6.5, 97, 114], [-17.5, -5, 12], [17.5, -5, 14]]
    .map(([y, a, b]) => P([[a, y], [b, y]].map(T)));
  const H = moitie(-1), B = moitie(1);
  const demiL = longueur(H);
  // le trait : contour intérieur du fût
  const traitH = decaler(H, EP / 2), traitB = decaler(B, -EP / 2);
  const trait = P(traitH.concat(traitB.slice().reverse()).map(T)) + ' Z';
  // côté du haut : fini, jusqu'à la queue, et 2,5 cm de plus
  const fin = aAbscisse(H, demiL);
  const brancheH = H.concat([[fin.p[0] + 2.5 * fin.u[0], fin.p[1] + 2.5 * fin.u[1]]]);
  // côté du bas : plié jusqu'à la sortie de la pointe, puis tout droit
  // la pointe finie jusqu'au plus large (x = 36 cm), avec ses taquets du dehors
  const iS = B.findIndex(p => p[0] >= 36);
  const s0 = longueur(B.slice(0, iS + 1));
  const a = aAbscisse(B, s0);
  const reste = demiL + 2.5 - s0;
  const brancheB = jusqua(B, s0).concat(pas(0, 1, 6).slice(1).map(t => [a.p[0] + a.u[0] * reste * t, a.p[1] + a.u[1] * reste * t]));
  const futH = P(bande(brancheH, EP).map(T)) + ' Z';
  const futB = P(bande(brancheB, EP).map(T)) + ' Z';
  // les taquets
  const taq = [];
  const poser = (pts, c, s, cote) => {
    const { p, u } = aAbscisse(pts, s), n = dedans(c, u), d = cote * (EP / 2 + 0.75);
    taq.push({ pts: taquet([p[0] + n[0] * d, p[1] + n[1] * d], u).map(T), c: T([p[0] + n[0] * d, p[1] + n[1] * d]) });
  };
  for (let s = 0; s < 100; s += 10.5) { if (aAbscisse(H, s).p[0] < 84) poser(H, -1, s, 1); }
  const nH = taq.length;
  for (let s = 10.5; s < 100; s += 10.5) { if (aAbscisse(B, s).p[0] < 84) poser(B, 1, s, 1); }
  const basIn = taq.slice(nH);
  for (let s = 5; s < demiL - 6; s += 10.5) poser(H, -1, s, -1);
  for (let s = 5; s < s0; s += 10.5) poser(B, 1, s, -1);
  const pTaqIn = basIn.reduce((m, t) => Math.abs(t.c[0] - T([60, 0])[0]) < Math.abs(m.c[0] - T([60, 0])[0]) ? t : m).c;
  // trois taquets du dehors qui attendent, clous plantés
  const libres = [[99, -12, 15], [106, -15.5, -20], [111.5, -10.5, 5]].map(([x, y, ang]) => {
    const u = [Math.cos(rad(ang)), Math.sin(rad(ang))];
    return { pts: taquet([x, y], u).map(T), c: T([x, y]) };
  });
  const taquets = taq.concat(libres);
  const pLibre = libres[1].c;
  // la flèche : le côté du bas qu'on ramène au trait
  const x0 = 88, yDroit = a.p[1] + (x0 - a.p[0]) * a.u[1] / a.u[0];
  const pA = T([x0 + 2, yDroit - 1.8]), pZ = T([x0 + 2, demiLargeur(x0 + 2) + 2.4]);
  const flB = `M${pA[0]},${pA[1]} Q${pA[0] + 16},${(pA[1] + pZ[1]) / 2} ${pZ[0] + 2},${pZ[1]}`;
  const pFl = [r1(pA[0] + 9), r1((pA[1] + pZ[1]) / 2)];
  return { T, planche, fil, trait, futH, futB, taquets, flB, pFl, pTaqIn, pLibre };
}

// ─── La sangle ──────────────────────────────────────────────────────────────────────────
// Nez en haut : x (le long de la raquette) vers le bas, y en travers.
function sangle(z, h) {
  const sc = 5.5, cx = 94, top = 12;
  const T = ([x, y]) => [r1(cx + y * sc), r1(top + (x + 1.5) * sc)];
  const xMax = (z.h - top - 8) / sc - 1.5;
  const H = moitie(-1, 120).filter(p => p[0] <= xMax), B = moitie(1, 120).filter(p => p[0] <= xMax);
  const axe = H.slice().reverse().concat(B.slice(1));
  const fut = P(bande(axe, EP).map(T)) + ' Z';
  // la bande d'acier, sur la face extérieure, d'un côté à l'autre de la courbe
  const sB = 17;
  const Hs = jusqua(H, sB), Bs = jusqua(B, sB);
  const axeB = Hs.slice().reverse().concat(Bs.slice(1));
  const eB = 0.35;
  const bandePts = decaler(axeB, -(EP / 2)).concat(decaler(axeB, -(EP / 2 + eB)).reverse());
  // decaler vers l'extérieur : pour cet ordre (haut remonté puis bas descendu), la normale gauche pointe dehors
  const test = decaler(axeB, 1)[Math.floor(axeB.length / 2)];
  const sgn = test[0] < axeB[Math.floor(axeB.length / 2)][0] ? 1 : -1;
  const ext = d => decaler(axeB, sgn * d);
  const bandeP = ext(EP / 2).concat(ext(EP / 2 + eB).reverse());
  const bande_ = P(bandeP.map(T)) + ' Z';
  // les ligatures, au-delà de la courbe
  const ligatures = [];
  let pLig;
  [[H, -1], [B, 1]].forEach(([pts, c]) => {
    const { p, u } = aAbscisse(pts, sB - 1.6), n = dedans(c, u);
    const tours = [];
    for (let k = -3; k <= 3; k++) {
      const q = [p[0] + u[0] * k * 0.34, p[1] + u[1] * k * 0.34];
      const A = [q[0] + n[0] * (EP / 2 + 0.25), q[1] + n[1] * (EP / 2 + 0.25)];
      const Z = [q[0] - n[0] * (EP / 2 + eB + 0.25), q[1] - n[1] * (EP / 2 + eB + 0.25)];
      tours.push(h.ligne(...T(A), ...T(Z), h.a.arete));
    }
    ligatures.push(tours.join('\n'));
    if (c < 0) pLig = T([p[0] - n[0] * (EP / 2 + eB + 0.2), p[1] - n[1] * (EP / 2 + eB + 0.2)]);
  });
  // les taquets : du dedans au nez, du dehors par-dessus la bande
  const taquets = [];
  const poser = (pts, c, s, d) => {
    const { p, u } = aAbscisse(pts, s), n = dedans(c, u);
    const q = [p[0] + n[0] * d, p[1] + n[1] * d];
    taquets.push({ pts: taquet(q, u).map(T), c: T(q) });
  };
  [0].forEach(s => poser(H, -1, s, EP / 2 + 0.75));
  [9].forEach(s => { poser(H, -1, s, EP / 2 + 0.75); poser(B, 1, s, EP / 2 + 0.75); });
  [4.5, 13].forEach(s => { poser(H, -1, s, -(EP / 2 + eB + 0.75)); poser(B, 1, s, -(EP / 2 + eB + 0.75)); });
  const pBande = T(aAbscisse(H, 2).p.map((v, i) => v)).map((v, i) => v);
  const { p: pb, u: ub } = aAbscisse(H, 1.6), nb = dedans(-1, ub);
  const pBandeExt = T([pb[0] - nb[0] * (EP / 2 + eB / 2), pb[1] - nb[1] * (EP / 2 + eB / 2)]);
  // la coupe, à droite
  const k = 2.4;                                   // px par mm
  const x0 = z.l - 92, yP = z.h - 34;
  const cp = { x0, x1: x0 + (9 + 12 + 1.5 + 9) * k, yP, hT: 14 * k, lT: 9 * k, hF: 27 * k, lF: 12 * k, lB: 1.5 * k };
  cp.xTi = x0; cp.xF = x0 + cp.lT; cp.xTe = cp.xF + cp.lF + cp.lB;
  return { cx, fut, bande: bande_, ligatures, taquets, pBande: pBandeExt, pLig, cp };
}

// ─── Sans sangle ────────────────────────────────────────────────────────────────────────
function sans(z) {
  const k = 13.5, cx = z.l / 2 - 6, cy = z.h - 20;
  const Ri = 5.9 * k, Ro = (5.9 + EP) * k;
  const pt = (r, a) => [r1(cx + r * Math.cos(rad(a))), r1(cy + r * Math.sin(rad(a)))];
  const a0 = 196, a1 = 344;
  // la face extérieure, arrachée là où les échardes sont parties
  const ext = [];
  const arr = [[226, 244], [258, 276], [292, 310]];
  pas(a1, a0, 74).forEach(a => {
    const dans = arr.find(([u, v]) => a > u && a < v);
    const r = dans ? Ro - 3.2 - 1.2 * Math.sin(a * 3) : Ro;
    ext.push(pt(r, a));
  });
  const int = pas(a0, a1, 60).map(a => pt(Ri, a));
  const fut = P(int.concat(ext)) + ' Z';
  const fil = [0.3, 0.55, 0.78].map(f => P(pas(a0 + 2, a1 - 2, 50).map(a => pt(Ri + f * (Ro - Ri), a))));
  // plis de compression sur la face intérieure
  const plis = pas(206, 334, 20).map(a => [pt(Ri + 0.5, a), pt(Ri + 4, a + 1.2)]);
  // les échardes : attachées à un bout, elles partent tout droit, le long de la tangente
  const echardes = arr.map(([u, v]) => {
    const A = pt(Ro, u), B = pt(Ro - 3.4, u + 2);
    const t = [-Math.sin(rad(u)), Math.cos(rad(u))];        // tangente, sens des angles croissants
    const n = [Math.cos(rad(u)), Math.sin(rad(u))];          // vers l'extérieur
    const L = (v - u) * Math.PI / 180 * Ro * 1.25;
    const tip = [A[0] + t[0] * L + n[0] * 8, A[1] + t[1] * L + n[1] * 8];
    const dos = [A[0] + t[0] * L * 0.92 + n[0] * 11.5, A[1] + t[1] * L * 0.92 + n[1] * 11.5];
    return [A, dos, tip, B].map(p => p.map(r1));
  });
  const e = echardes[2];
  const pEch = [r1((e[1][0] + e[2][0]) / 2), r1((e[1][1] + e[2][1]) / 2)];
  const pPli = pt(Ri + 2, 270);
  return { fut, fil, plis, echardes, pEch, pPli };
}

// ─── Les traverses ──────────────────────────────────────────────────────────────────────
// Le fût sec, sorti du gabarit, pointe à gauche ; les deux bouts de la queue écartés.
function traverses(z) {
  const sc = 2.05, ox = 12, oy = 66, ecart = 6;
  const T = ([x, y]) => [r1(ox + x * sc), r1(oy + y * sc)];
  const H = moitie(-1, 90, ecart), B = moitie(1, 90, ecart);
  const brH = H.concat([[109.5, H[H.length - 1][1]]]), brB = B.concat([[109.5, B[B.length - 1][1]]]);
  const axe = brH.slice().reverse().concat(brB.slice(1));
  const fut = P(bande(axe, EP).map(T)) + ' Z';
  // traverses : longueur du fût fermé, bouts dans leur mortaise (6 mm)
  const xs = [33, 72];
  const trav = xs.map(x => {
    const w = demiLargeur(x);
    return [[x - 1, -w], [x + 1, -w], [x + 1, w], [x - 1, w]].map(T);
  });
  const xT = xs.map(x => T([x, 0])[0]);
  const yCote = T([0, 17])[1] + 8;
  const fleches = [-1, 1].map(c => {
    const a = T([103, c * (ecart + 2.4)]), b = T([103, c * (ecart + 12)]);
    return `M${a[0]},${a[1]} L${b[0]},${b[1]}`;
  });
  const pFl = T([103, ecart + 5]);
  const pTrav = T([33, -8]);
  return { fut, trav, xT, yCote, fleches, pFl, pTrav };
}

// ─── La mortaise ────────────────────────────────────────────────────────────────────────
// Coupe à mi-hauteur : le fût debout à gauche, la traverse qui entre par la droite.
function mortaise(z) {
  const k = 3.4, xG = 12, xFace = xG + 12 * k, xFond = xFace - 6 * k;
  const yT0 = r1(z.h / 2 - 10 * k + 8), yT1 = r1(z.h / 2 + 10 * k + 8);
  const g = casseV(6, xG, xFace, 1), d = casseV(z.h - 6, xFace, xG, 1);
  const fut = P([...g, [xFace, yT0], [xFond, yT0], [xFond, yT1], [xFace, yT1], ...d]) + ' Z';
  const cd = casse(z.l - 4, yT0, yT1, 1);
  const trav = P([[xFond, yT0], ...cd, [xFond, yT1]]) + ' Z';
  const fil = [yT0 + 16, yT0 + 34, yT0 + 50].map((y, i) => `M${xFond + 6 + i * 4},${y} L${z.l - 12},${y}`);
  return { fut, trav, fil, xFace, xFond, yCote: yT0 - 14, yT1 };
}

// ─── La queue ───────────────────────────────────────────────────────────────────────────
function queue(z) {
  const k = 6.4, xA = 83, xFin = 109.5, ox = 6 - xA * k;
  const X = x => r1(ox + x * k);
  // vue de dessus : les deux bouts côte à côte sur la fin, qui s'écartent avant
  const yP = 42, e = EP * k;
  const axeY = (x, c) => c * (EP / 2 + (x < 92 ? 0.055 * (92 - x) ** 2 : 0));
  const bouts = [-1, 1].map(c => {
    const pts = pas(xA, xFin, 40).map(x => [X(x), yP + axeY(x, c) * k]);
    const b = bande(pts, e);
    return P(b) + ' Z';
  });
  const xTrous = [99.5, 96.5, 93.5];
  const toursP = [];
  xTrous.forEach(x => [-0.9, 0.9].forEach(o => {
    const xx = X(x) + o * 2.2;
    toursP.push([[xx - 1, yP - e - 2], [xx + 1, yP - e - 2], [xx + 1, yP + e + 2], [xx - 1, yP + e + 2]]);
  }));
  const pTourP = [X(xTrous[1]), yP - e - 1];
  // vue de côté : la face extérieure d'un bout, 27 mm de haut
  const yE = 104, hE = 2.7 * k;
  const g = casse(X(xA), yE + hE, yE, 1);
  const elev = P([[X(xA), yE], [X(xFin), yE], [X(xFin), yE + hE], ...g.slice(0, -1)]) + ' Z';
  const filE = [yE + 5, yE + 11].map(y => `M${X(xA) + 5},${y} L${X(xFin) - 4},${y}`);
  const trous = xTrous.map(x => [X(x), r1(yE + hE / 2)]);
  const toursE = [];
  trous.forEach(([x, y]) => {
    toursE.push([[x - 1.6, yE - 2.5], [x + 1.6, yE - 2.5], [x + 1.6, yE + hE + 2.5], [x - 1.6, yE + hE + 2.5]]);
  });
  return { bouts, toursP, pTourP, elev, filE, trous, toursE, yE, xTrou1: X(xTrous[0]), xBout: X(xFin), yCote: r1(yE + hE + 12) };
}
