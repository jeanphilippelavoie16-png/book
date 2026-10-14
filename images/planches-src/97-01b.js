// Planche 97-01b — La couche chaude au fumier, le chargement (chapitre 97, §5-B, étapes 7 et 10).
// Trois temps vus en profondeur, la couche coupée par le milieu, sud à gauche comme la coupe de la
// 97-01a, la moitié ouest restée en place : à l'automne, la fosse creusée, le gravier au fond, la
// fosse couverte de planches et de feuilles pour l'hiver ; au printemps, le fumier pelleté par lits,
// secoué à la fourche, chaque lit tassé avant le suivant ; puis le coffre posé sur le lit, du fumier
// remis dedans, et le rechaussage tout autour jusqu'en haut.
// Même géométrie que la 97-01a, en cm. Aucune cote ici : elles sont toutes sur la 97-01a.
// Le tassage est montré par une botte qui foule le lit : le chapitre dit « tassé », sans dire avec quoi.
module.exports = (h) => {
  const A = h.a;
  const PW = 273, PD = 46, GR = 10, BT = 32;
  const CX0 = 45, CX1 = 228, EP = 5, FT = 62, BK = 77, FI = 44, RF = 15, RB = 258;
  const H = 90.5, HC = 45.5, HR = 75.5;             // demi-largeurs est-ouest : fosse, coffre, rechaussage
  const XL = -12, XR = 288, YD = 100, ZB = -54;      // le bloc de terre
  const KC = 0.5 * Math.cos(Math.PI / 6), KS = 0.5 * Math.sin(Math.PI / 6);
  const LARG = XR + KC * YD - XL;
  const SMAX = 1.3;
  const ETENDUE = { automne: [44, -68], lits: [92, -58], coffre: [100, -58] };

  const blanc = (a) => a.replace('fill="none"', 'fill="#FFFFFF"');
  const rep = (z, id) => {
    const S = Math.min((z.l - 40) / LARG, SMAX);
    const [zs, zb] = ETENDUE[id];
    const ox = (z.l - S * LARG) / 2 - S * XL;
    const oy = (z.h - (zs - zb) * S) / 2 + zs * S;
    const P = (x, y, zz) => [ox + S * (x + KC * y), oy - S * (zz + KS * y)];
    return { S, P };
  };
  // une face : fond blanc puis trame, pour cacher ce qui est derrière
  const face = (P, pts, trame, trait = 'detail') => {
    const q = pts.map(v => P(...v));
    const o = [h.chemin(q, blanc(A[trait]), true)];
    if (trame) o.push(h.chemin(q, A.hachure(trame, trait), true));
    return o.join('\n');
  };
  const glace = (x) => FT + (BK - FT) * (x - CX0) / (CX1 - CX0);   // dessus des côtés du coffre
  // La charte : une face en aplat gris (loin ou ombre), puis son trait par-dessus
  const aplat = (P, pts, gris, trame = null, trait = 'detail') => {
    const q = pts.map(v => P(...v));
    const o = [h.chemin(q, gris, true)];
    o.push(h.chemin(q, trame ? A.hachure(trame, trait) : A[trait], true));
    return o.join('\n');
  };
  // La charte : le contour de la couche elle-même (la fosse, et le fumier monté au-dessus du sol)
  // pèse 2,4, comme sur la 97-01a ; le bloc de terre autour reste à 1,4.
  const fosse = (P) => h.chemin([P(0, 0, 0), P(0, 0, -PD), P(PW, 0, -PD), P(PW, 0, 0)], A.contour);

  // le bloc de terre, la fosse ouverte dedans ; fond = niveau de ce qui remplit la fosse
  const terrain = (P, fond, trame) => {
    const o = [];
    // La charte : les parois de la fosse, vues par l'ouverture, en gris loin
    o.push(aplat(P, [[0, H, fond], [PW, H, fond], [PW, H, 0], [0, H, 0]], A.loin));         // paroi du fond
    o.push(aplat(P, [[0, 0, fond], [0, H, fond], [0, H, 0], [0, 0, 0]], A.loin));           // paroi sud
    if (trame) o.push(face(P, [[0, 0, fond], [PW, 0, fond], [PW, H, fond], [0, H, fond]], trame));
    o.push(face(P, [[XL, 0, 0], [0, 0, 0], [0, H, 0], [PW, H, 0], [PW, 0, 0], [XR, 0, 0], [XR, YD, 0], [XL, YD, 0]], null, 'arete'));
    o.push(face(P, [[XR, 0, 0], [XR, YD, 0], [XR, YD, ZB], [XR, 0, ZB]], 'terre', 'arete'));
    return o.join('\n');
  };
  // la terre coupée, devant
  const terreCoupee = (P) => face(P, [[XL, 0, 0], [0, 0, 0], [0, 0, -PD], [PW, 0, -PD], [PW, 0, 0], [XR, 0, 0], [XR, 0, ZB], [XL, 0, ZB]], 'terre', 'arete');
  const gravierCoupe = (P) => face(P, [[0, 0, -PD], [PW, 0, -PD], [PW, 0, -PD + GR], [0, 0, -PD + GR]], 'gravier');
  const lit = (P, x0, x1, zz) => {
    const pts = [];
    for (let x = x0; x <= x1 + 0.01; x += 6) pts.push(P(x, 0, zz + 0.9 * Math.sin(x / 7)));
    return h.chemin(pts, A.detail);
  };

  // une feuille morte à plat sur un plan horizontal, vue en biais
  const feuille = (P, x, y, zz, ang, t = 5) => {
    const c = Math.cos(ang), s = Math.sin(ang);
    const pt = (u, v) => P(x + u * c - v * s, y + u * s + v * c, zz);
    const a = pt(-t, 0), b = pt(t, 0), m1 = pt(0, t * 0.55), m2 = pt(0, -t * 0.55);
    return [
      h.path(`M${a[0]} ${a[1]} Q${m1[0]} ${m1[1]} ${b[0]} ${b[1]} Q${m2[0]} ${m2[1]} ${a[0]} ${a[1]} Z`, blanc(A.detail)),
      h.ligne(...a, ...b, A.fin),
    ].join('\n');
  };

  // une botte de caoutchouc vue de côté, la pointe vers la droite ; b = milieu du dessous
  const botte = (S, b) => {
    const pt = ([u, v]) => [b[0] + (u - 15) * S, b[1] - v * S];
    const tour = [[0, 0], [8, 0], [9, 0.9], [13, 0.9], [14, 0], [27, 0], [30.5, 1.5], [31, 4.5], [29, 7.5], [23, 9.6],
      [16.5, 11.5], [13.8, 14.5], [13.6, 36], [12.6, 37], [1, 37], [0, 36], [-0.4, 12], [-0.9, 5], [-0.6, 2]].map(pt);
    return [
      h.chemin(tour, blanc(A.arete), true),
      h.chemin([pt([-0.6, 2.4]), pt([30.8, 2.4])], A.detail),
      h.chemin([pt([0, 32.5]), pt([13.6, 32.5])], A.detail),
    ].join('\n');
  };

  const automne = (z) => {
    const { S, P } = rep(z, 'automne');
    const o = [];
    const fond = -PD + GR;
    o.push(terrain(P, fond, 'gravier'));
    o.push(terreCoupee(P), gravierCoupe(P));
    // les planches, en travers de la fosse, qui portent sur la terre des deux côtés
    const e = 2.5, X0 = -6, X1 = 279, n = 14, lp = (X1 - X0) / n, Y1 = H + 7;
    for (let i = 0; i < n; i++) {
      const a = X0 + i * lp, b = a + lp;
      o.push(face(P, [[a, 0, e], [b, 0, e], [b, Y1, e], [a, Y1, e]], null));
    }
    o.push(face(P, [[X1, 0, 0], [X1, Y1, 0], [X1, Y1, e], [X1, 0, e]], null));
    // les feuilles par-dessus, étendues de l'arrière vers l'avant : les planches restent à voir devant
    const F = 11, fx0 = X0 + 3, fx1 = X1 - 3, LY0 = 36, Y2 = Y1 - 3;
    // La charte : le flanc droit de la couche de feuilles, à l'ombre
    o.push(aplat(P, [[fx1, LY0, e], [fx1, Y2, e], [fx1, Y2, F], [fx1, LY0, F]], A.ombre));
    o.push(face(P, [[fx0, LY0, F], [fx1, LY0, F], [fx1, Y2, F], [fx0, Y2, F]], null));
    for (let i = 0; i < 30; i++) {
      const x = fx0 + 9 + ((i * 37) % 97) / 97 * (fx1 - fx0 - 18), y = LY0 + 8 + ((i * 53) % 89) / 89 * (Y2 - LY0 - 14);
      o.push(feuille(P, x, y, F, i * 1.3, 8));
    }
    const bord = [];
    for (let x = fx0; x <= fx1 + 0.01; x += 5) bord.push([x, LY0, F + 1.2 * Math.sin(x / 9) + 0.7 * Math.sin(x / 3.7)]);
    o.push(face(P, [[fx0, LY0, e], [fx1, LY0, e], ...bord.slice().reverse()], null));
    for (let x = fx0 + 5, k = 0; x < fx1 - 4; x += 9, k++) {
      const dz = (k % 3) * 1.8, a = P(x - 3.5, LY0, e + 2.2 + dz), b = P(x + 3.5, LY0, e + 3 + dz), m = P(x, LY0, e + 4.4 + dz);
      o.push(h.path(`M${a[0]} ${a[1]} Q${m[0]} ${m[1]} ${b[0]} ${b[1]}`, A.detail));
    }
    // les bouts des planches, coupés devant
    for (let i = 0; i < n; i++) {
      const a = X0 + i * lp;
      o.push(face(P, [[a, 0, 0], [a + lp, 0, 0], [a + lp, 0, e], [a, 0, e]], 'bois', 'arete'));
    }
    o.push(fosse(P));
    return o.join('\n');
  };

  const lits = (z) => {
    const { S, P } = rep(z, 'lits');
    const o = [];
    const fond = -6;
    o.push(terrain(P, fond, 'isolant'));
    // le lit suivant qu'on commence : des fourchées secouées, pas encore étendues
    const motte = (x, y, r) => {
      const g = P(x - 1.25 * r, y, fond), d = P(x + 1.25 * r, y, fond), t = P(x, y, fond + 0.95 * r);
      const dd = `M${g[0]} ${g[1]} C${g[0] + 0.1 * S * r} ${t[1]} ${d[0] - 0.4 * S * r} ${t[1] - 0.2 * S * r} ${d[0]} ${d[1]} Z`;
      return h.path(dd, blanc(A.detail)) + '\n' + h.path(dd, A.hachure('isolant', 'detail'));
    };
    for (const [x, y, r] of [[40, 62, 7], [26, 30, 6.5], [64, 44, 8], [92, 64, 6.5], [98, 26, 7]]) o.push(motte(x, y, r));
    // la coupe devant : terre, gravier, deux lits déjà tassés
    o.push(terreCoupee(P), gravierCoupe(P));
    o.push(face(P, [[0, 0, -PD + GR], [PW, 0, -PD + GR], [PW, 0, fond], [0, 0, fond]], 'isolant'));
    o.push(lit(P, 1, PW - 1, -21));
    o.push(fosse(P));
    // la botte qui foule le lit, de bout en bout, avant le suivant
    o.push(botte(S, P(196, 44, fond + 5)));
    const bf = P(196, 44, fond + 5);
    // La charte : le geste, tasser le lit
    o.push(h.geste(`M${bf[0] + 40 * S} ${bf[1] - 30 * S} L${bf[0] + 40 * S} ${bf[1] + 2 * S}`));
    // la fourche, vue d'en haut : le manche monte vers la droite, les dents chargées au-dessus du lit
    const F = P(104, 40, 34);
    const ang = -22 * Math.PI / 180, dm = [Math.cos(ang), Math.sin(ang)], nm = [-dm[1], dm[0]];
    const pt = (a, b) => [F[0] + dm[0] * a * S + nm[0] * b * S, F[1] + dm[1] * a * S + nm[1] * b * S];
    const m0 = pt(9, 0), m1 = pt(122, 0);
    o.push(h.ligne(...m0, ...m1, 'fill="none" stroke="#1A1A1A" stroke-width="4.2" stroke-linecap="round"'));
    o.push(h.ligne(...m0, ...m1, 'fill="none" stroke="#FFFFFF" stroke-width="1.6" stroke-linecap="round"'));
    o.push(h.chemin([pt(0, -2.4), pt(11, -1.4), pt(11, 1.4), pt(0, 2.4)], A.plein, true));
    const dents = [];
    for (const b of [-12, -4, 4, 12]) {
      const r0 = pt(0, b * 0.92), r1 = pt(-22, b), r2 = pt(-37, b);
      dents.push(h.path(`M${r0[0]} ${r0[1]} Q${r1[0]} ${r1[1]} ${r2[0]} ${r2[1] + 3 * S}`, 'fill="none" stroke="#1A1A1A" stroke-width="1.8" stroke-linecap="round"'));
    }
    o.push(...dents);
    const e0 = pt(0.5, -13.2), e1 = pt(0.5, 13.2), ec = pt(4, 0);
    o.push(h.path(`M${e0[0]} ${e0[1]} Q${ec[0]} ${ec[1]} ${e1[0]} ${e1[1]}`, A.contour));
    // la fourchée sur les dents
    const charge = [];
    for (let k = 0; k < 18; k++) {
      const a = 2 * Math.PI * k / 18, r = 1 + 0.07 * Math.sin(k * 2.3) + 0.04 * Math.cos(k * 4.1);
      charge.push(pt(-17 + Math.cos(a) * 7.5 * r, Math.sin(a) * 10.5 * r));
    }
    o.push(h.chemin(charge, blanc(A.detail), true), h.chemin(charge, A.hachure('isolant', 'detail'), true));
    // ce qui tombe, et où ça va
    // des brins qui tombent du bout des dents jusqu'au lit, et une flèche fine qui suit la chute
    const chute = 24 * S;                                  // du bout des dents à la surface du lit, à l’écran
    for (const [b, d] of [[-12, 0.3], [-4, 0.62], [4, 0.42], [12, 0.78]]) {
      const c = pt(-37, b), y = c[1] + 3 * S + d * (chute - 6 * S), x = c[0] + 2 * S * Math.sin(b);
      o.push(h.path(`M${x - 3} ${y} q2 -3 4 0 t4 1`, A.detail));
    }
    const t0 = pt(-37, 0);
    o.push(h.fleche(`M${t0[0] + 6} ${t0[1] + 5 * S} Q${t0[0] + 12} ${t0[1] + 20 * S} ${t0[0] + 8} ${t0[1] + chute - 2 * S}`, A.detail));
    return o.join('\n');
  };

  const coffre = (z) => {
    const { S, P } = rep(z, 'coffre');
    const o = [];
    o.push(terrain(P, 0));
    // le talus nord, puis le dessus du rechaussage tout autour
    // La charte : le talus nord du rechaussage fait face à droite, à l'ombre
    o.push(aplat(P, [[RB, 0, BK], [RB, HR, BK], [PW, H, 0], [PW, 0, 0]], A.ombre, 'isolant'));
    o.push(face(P, [[RF, 0, FT], [RF, HR, FT], [CX0, HR, FT], [CX1, HR, BK], [RB, HR, BK], [RB, 0, BK]], 'isolant'));
    // le coffre : l'intérieur du côté est, du devant, le fumier remis dedans
    const I0 = CX0 + EP, I1 = CX1 - EP, YI = HC - EP;
    // La charte : l'intérieur du coffre, vu par l'ouverture, en gris loin
    o.push(aplat(P, [[I0, YI, FI], [I1, YI, FI], [I1, YI, glace(I1)], [I0, YI, glace(I0)]], A.loin, null, 'arete'));
    // les joints des madriers sur la face intérieure du côté ouest
    for (const zj of [52, 60, 68]) {
      const xs = Math.max(I0, CX0 + (zj - FT) * (CX1 - CX0) / (BK - FT) + 2);
      o.push(h.chemin([P(xs, YI, zj), P(I1, YI, zj)], A.detail));
    }
    o.push(aplat(P, [[I0, 0, FI], [I0, YI, FI], [I0, YI, glace(I0)], [I0, 0, FT]], A.loin, null, 'arete'));
    o.push(face(P, [[I0, 0, FI], [I1, 0, FI], [I1, YI, FI], [I0, YI, FI]], 'isolant'));
    // les poteaux de coin, côté est
    const PP = 7;
    for (const x of [I0, I1 - PP]) {
      const t0 = glace(x) - 0.5, y0 = YI - PP;
      o.push(face(P, [[x, y0, FI], [x + PP, y0, FI], [x + PP, y0, t0], [x, y0, t0]], null, 'arete'));
      if (x === I0) o.push(face(P, [[x + PP, y0, FI], [x + PP, YI, FI], [x + PP, YI, t0], [x + PP, y0, t0]], null, 'arete'));
      o.push(face(P, [[x, y0, t0], [x + PP, y0, t0], [x + PP, YI, t0], [x, YI, t0]], null, 'arete'));
    }
    // le dessus des madriers
    o.push(face(P, [[CX0, 0, FT], [I0, 0, FT], [I0, HC, FT], [CX0, HC, FT]], null, 'arete'));
    o.push(face(P, [[I1, 0, BK], [CX1, 0, BK], [CX1, HC, BK], [I1, HC, BK]], null, 'arete'));
    o.push(face(P, [[CX0, YI, FT], [CX1, YI, BK], [CX1, HC, BK], [CX0, HC, FT]], null, 'arete'));
    // la coupe devant
    o.push(terreCoupee(P), gravierCoupe(P));
    o.push(face(P, [[0, 0, -PD + GR], [0, 0, 0], [RF, 0, FT], [CX0, 0, FT], [CX0, 0, BT], [CX1, 0, BT], [CX1, 0, BK], [RB, 0, BK], [PW, 0, 0], [PW, 0, -PD + GR]], 'isolant', 'arete'));
    for (const zz of [-19, -2]) o.push(lit(P, 1, PW - 1, zz));
    o.push(lit(P, RF * 15 / FT + 1, PW - (PW - RB) * 15 / BK - 1, 15));
    o.push(h.chemin([P(RF * BT / FT, 0, BT), P(CX0, 0, BT)], A.detail), h.chemin([P(CX1, 0, BT), P(PW - (PW - RB) * BT / BK, 0, BT)], A.detail));
    o.push(face(P, [[I0, 0, BT], [I1, 0, BT], [I1, 0, FI], [I0, 0, FI]], 'isolant'));
    o.push(face(P, [[CX0, 0, BT], [I0, 0, BT], [I0, 0, FT], [CX0, 0, FT]], 'bois', 'contour'));
    o.push(face(P, [[I1, 0, BT], [CX1, 0, BT], [CX1, 0, BK], [I1, 0, BK]], 'bois', 'contour'));
    o.push(fosse(P));
    o.push(h.chemin([P(0, 0, 0), P(RF, 0, FT), P(CX0, 0, FT)], A.contour), h.chemin([P(CX1, 0, BK), P(RB, 0, BK), P(PW, 0, 0)], A.contour));
    // La charte : le point à contrôler, le rechaussage monté jusqu'en haut du coffre
    o.push(h.controle(...P(CX0, 0, FT), 10));
    return o.join('\n');
  };

  return {
    ref: '97-01b',
    titre: 'La couche chaude au fumier, le chargement',
    desc: 'La même couche que la 97-01a, coupée par le milieu et vue en biais, en trois temps, le sud à gauche. À l’automne : la fosse creusée dans la terre, le gros gravier au fond, des planches posées en travers qui portent sur la terre des deux côtés, et une couche de feuilles mortes par-dessus pour l’hiver. Au printemps, la fosse déneigée : deux lits de fumier déjà chargés, une botte qui foule le dernier d’un bout à l’autre, une flèche vers le bas, et une fourche chargée qui secoue le fumier sur le lit suivant. Enfin, le lit monté au-dessus du sol, le coffre de madriers posé dessus avec un poteau dans chaque coin, du fumier remis dedans, et le rechaussage de fumier empilé contre le coffre jusqu’en haut, tout autour, qui descend en talus jusqu’au bord de la fosse.',
    format: 'pleine',
    disposition: [['automne'], ['lits'], ['coffre']],
    hauteurs: Object.values(ETENDUE).map(([a, b]) => a - b),
    vues: {
      automne: {
        titre: 'À l’automne : la fosse, le gravier, la couverture',
        dessin: automne,
        renvois: z => {
          const { P } = rep(z, 'automne');
          return [
            { n: 1, rond: P(40, 0, -60), cible: P(40, 0, -41) },
            { n: 2, rond: P(-4, 0, 30), cible: P(10, 0, 1.2) },
            { n: 3, rond: P(40, 0, 30), cible: P(130, 68, 11) },
          ].map((r, i) => ({ ...r, texte: ['gros gravier au fond de la fosse', 'planches en travers de la fosse', 'feuilles par-dessus, pour l’hiver'][i] }));
        },
      },
      lits: {
        titre: 'Au printemps : le fumier par lits',
        dessin: lits,
        renvois: z => {
          const { S, P } = rep(z, 'lits');
          const F = P(104, 40, 34), ang = -22 * Math.PI / 180, dm = [Math.cos(ang), Math.sin(ang)], nm = [-dm[1], dm[0]];
          const charge = [F[0] + (-17 * dm[0]) * S, F[1] + (-17 * dm[1]) * S];
          const b = P(196, 44, -1);
          return [
            { n: 4, rond: [charge[0] - 80, charge[1] - 20], cible: charge },
            { n: 5, rond: [b[0] + 72 * S, b[1] - 22 * S], cible: [b[0] + 40 * S, b[1] + 1 * S] },
          ].map((r, i) => ({ ...r, texte: ['fumier chaud, secoué à la fourche', 'chaque lit tassé avant le suivant'][i] }));
        },
      },
      coffre: {
        titre: 'Le coffre posé sur le lit, rechaussé tout autour',
        dessin: coffre,
        renvois: z => {
          const { P } = rep(z, 'coffre');
          return [
            { n: 6, rond: P(120, 0, 94), cible: P(120, HC - 2.5, glace(120)) },
            { n: 7, rond: P(160, 0, 94), cible: P(160, 20, FI) },
            { n: 8, rond: P(-6, 0, 70), cible: P(RF + 10, 20, FT) },
          ].map((r, i) => ({ ...r, texte: ['coffre de madriers, posé sur le lit', 'fumier tassé dans le coffre', 'rechaussage, jusqu’en haut, tout autour'][i] }));
        },
      },
    },
  };
};
