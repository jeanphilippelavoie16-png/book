// Planche 56-09 — Les lames de fortune (ch. 52 §9-B ; aussi ch. 47 §7, ch. 49, ch. 53)
module.exports = (h) => ({
  ref: '56-09',
  titre: 'Les lames de fortune',
  desc: 'En haut, une section de lame d’égoïne serrée entre deux billots empilés, le bout qui dépasse plié net vers le bas ; une coupe agrandie de la lame posée sur une pierre plate, émoulue d’un seul côté en biseau long, et une boîte d’eau où on la trempe ; une lame vue à plat, bleuie au fil. Au milieu, la lame vue de chant devant un manche de bois franc fendu, puis emmanchée, vue à plat, la soie cachée dans la fente et la ligature par-dessus. En bas, un couvercle de conserve et ses deux lignes de pli, le même replié en dos et emmailloté d’écorce, et sa coupe ; une boîte de conserve où on a découpé une bande, la bande à plat puis pliée en deux sur la longueur.',
  format: 'pleine',
  disposition: [['casser', 'emoudre', 'bleui'], ['manche'], ['couvercle', 'ferblanc']],
  hauteurs: [3, 2.2, 2.6],
  largeurs: [[5, 5, 3], [1], [3, 2]],
  vues: {
    casser: {
      titre: 'Casser la section',
      dessin: z => casser(h),
      renvois: z => [
        { n: 1, rond: [16, 90], cible: [22, J], texte: 'serrée entre deux billots' },
        { n: 2, rond: [196, 66], cible: [141, 129], texte: 'pliée net : l’acier casse droit' },
      ],
    },
    emoudre: {
      titre: 'Émoudre un seul côté',
      dessin: z => emoudre(h),
      renvois: z => [
        { n: 3, rond: [128, 114], cible: [110, 147.5], texte: 'biseau long, d’un seul côté' },
        { n: 4, rond: [44, 102], cible: [60, 135], texte: 'l’autre face reste plate' },
        { n: 5, rond: [203, 60], cible: [182, 88], texte: 'tremper à l’eau souvent' },
      ],
    },
    bleui: {
      titre: 'Raté',
      dessin: z => bleui(h),
      renvois: z => [
        { n: 6, rond: [20, 70], cible: [73, 118], texte: 'bleui : le fil ne tiendra plus' },
      ],
    },
    manche: {
      titre: 'Emmancher',
      dessin: z => manche(h),
      renvois: z => [
        { n: 7, rond: [458, 76], cible: [452, 40], texte: 'bout de bois franc fendu' },
        { n: 8, rond: [412, 76], cible: [397, 110], texte: 'la soie dans la fente' },
        { n: 9, rond: [300, 141], cible: [357, 122], texte: 'babiche mouillée, fil de fer' },
      ],
    },
    couvercle: {
      titre: 'Couvercle de conserve',
      dessin: z => couvercle(h),
      renvois: z => [
        { n: 10, rond: [334, 36], cible: [310, 76], texte: 'bord replié deux fois : le dos' },
        { n: 11, rond: [258, 160], cible: [223, 129], texte: 'bord opposé affûté' },
        { n: 12, rond: [140, 28], cible: [166, 70], texte: 'écorce de bouleau côté main' },
      ],
    },
    ferblanc: {
      titre: 'Fer-blanc plié',
      dessin: z => ferblanc(h),
      renvois: z => [
        { n: 13, rond: [22, 146], cible: [43, 92], texte: 'bande de boîte de conserve' },
        { n: 14, rond: [150, 80], cible: [150, 100], texte: 'pliée en long, le pli au dos' },
      ],
    },
  },
});

const f = n => +n.toFixed(1);
const pts = a => a.map(p => p.map(f).join(',')).join(' L');
// Dents de scie le long d'un segment, pointées vers le lecteur (vers le bas de la page).
function dents(x1, y1, x2, y2, pas = 5, haut = 2.6) {
  const L = Math.hypot(x2 - x1, y2 - y1), n = Math.floor(L / pas), d = [];
  for (let i = 0; i <= n; i++) {
    const t = (i * pas) / L;
    d.push([x1 + t * (x2 - x1), y1 + t * (y2 - y1) + (i % 2 ? haut : 0)]);
  }
  return 'M' + pts(d);
}

// ─── Casser la section entre deux billots ────────────────────────────────────────────────
const CX = 85, RB = 48, RY = 13, J = 124, TOPU = 58, BOT = 188;
function casser(h) {
  const xl = CX - RB, xr = CX + RB, g = [];
  const arcY = (y0, x) => y0 + RY * Math.sqrt(Math.max(0, 1 - ((x - CX) / RB) ** 2));
  // billot du bas
  const bas = `M${xl},${J} L${xl},${BOT} A${RB},${RY} 0 0 0 ${xr},${BOT} L${xr},${J} A${RB},${RY} 0 0 1 ${xl},${J} Z`;
  // la face de droite d'un billot, à l'ombre : de x0 au bord, entre deux arcs de face
  const flanc = (yH, yB) => { const q = []; for (let x = CX + RB * 0.45; x <= xr + 0.01; x += RB * 0.55 / 8) q.push([x, arcY(yH, x)]);
    for (let x = xr; x >= CX + RB * 0.45 - 0.01; x -= RB * 0.55 / 8) q.push([x, arcY(yB, x)]); return 'M' + pts(q) + ' Z'; };
  g.push(h.path(bas, h.a.blanc), h.path(flanc(J, BOT), h.a.ombre), h.path(bas, h.a.contour));
  // billot du dessus, posé sur la lame
  const haut = `M${xl},${TOPU} L${xl},${J} A${RB},${RY} 0 0 0 ${xr},${J} L${xr},${TOPU} Z`;
  g.push(h.path(haut, h.a.blanc), h.path(flanc(TOPU, J), h.a.ombre), h.path(haut, h.a.contour));
  g.push(h.ellipse(CX, TOPU, RB, RY, h.a.blanc), h.ellipse(CX, TOPU, RB, RY, h.a.contour));
  g.push(h.ellipse(CX, TOPU, 31, 8.4, h.a.fin), h.ellipse(CX, TOPU, 16, 4.3, h.a.fin), h.ellipse(CX, TOPU, 4, 1.1, h.a.fin));
  g.push(h.path(`M${CX + 4},${TOPU + 0.6} L${CX + 42},${TOPU + 5.5}`, h.a.detail));
  // écorce
  for (const x of [xl + 8, xl + 21, CX - 8, CX + 9, CX + 25, xr - 9]) {
    for (const [a, b] of [[arcY(TOPU, x) + 4, arcY(J, x) - 4], [arcY(J, x) + 4, arcY(BOT, x) - 4]]) {
      g.push(h.path(`M${f(x)},${f(a)} Q${f(x + 2.5)},${f((a + b) / 2)} ${f(x)},${f(b)}`, h.a.fin));
    }
  }
  // la lame : le reste de l'égoïne à gauche, rompu
  g.push(h.path(`M6,${J - 4} L${xl},${J - 4} L${xl},${J + 4} L6,${J + 4} L8,${J + 1} L4,${J - 1} Z`, h.a.blanc));
  g.push(h.path(`M6,${J + 4} L${xl},${J + 4} M${xl},${J - 4} L6,${J - 4}`, h.a.arete));
  g.push(h.path(`M6,${J - 4} L8,${J + 1} L4,${J - 1} L6,${J + 4}`, h.a.detail));
  g.push(h.path(dents(6, J + 4, xl, J + 4), h.a.detail));
  // position de départ, à plat
  g.push(h.rect(xr, J - 4, 56, 8, h.a.cache));
  // le bout plié net vers le bas, sur l'arête du billot
  const L = 56, c = Math.cos(38 * Math.PI / 180), s = Math.sin(38 * Math.PI / 180);
  const B1 = [xr + L * c, J - 4 + L * s], F1 = [xr + L * c, J + 4 + L * s];
  const plie = 'M' + pts([[xr, J - 4], B1, F1, [xr, J + 4]]) + ' Z';
  g.push(h.path(plie, h.a.blanc), h.path(plie, h.a.arete));
  g.push(h.path(dents(xr, J + 4, F1[0], F1[1]), h.a.detail));
  // le geste : plier net vers le bas
  const r = 66, a0 = -8 * Math.PI / 180, a1 = 50 * Math.PI / 180;
  g.push(h.geste(`M${f(xr + r * Math.cos(a0))},${f(J + r * Math.sin(a0))} A${r},${r} 0 0 1 ${f(xr + r * Math.cos(a1))},${f(J + r * Math.sin(a1))}`));
  return g.join('\n');
}

// ─── Émoudre : coupe agrandie sur la pierre, et la boîte d'eau ───────────────────────────
function emoudre(h) {
  const g = [];
  // pierre plate de rivière
  const pierre = 'M20,150 L196,150 Q208,152 206,166 Q203,182 188,183 L26,183 Q10,182 9,166 Q9,152 20,150 Z';
  g.push(h.path(pierre, h.a.hachure('pierre', 'detail')), h.path(pierre, h.a.arete));
  // coupe de la lame : face plate en haut jusqu'au fil, biseau long dessous, couché sur la pierre
  const W = 120, E = 14, BV = 70;
  const al = Math.atan2(E, BV), ca = Math.cos(al), sa = Math.sin(al);
  const P = ([u, v]) => { const dx = u - (W - BV), dy = v - E; return [72 + dx * ca - dy * sa, 150 + dx * sa + dy * ca]; };
  const coupe = 'M' + pts([[0, 0], [W, 0], [W - BV, E], [0, E]].map(P)) + ' Z';
  g.push(h.path(coupe, h.a.blanc), h.path(coupe, h.a.hachure('metal', 'detail')), h.path(coupe, h.a.contour));
  // la boîte d'eau, en coupe, la lame trempée
  // la lame entre par le haut de la boîte, sans toucher les parois
  const A = [145, 4], D = [0.342, 0.9397], N = [-0.9397, 0.342];
  const Q = (s, t) => [A[0] + s * D[0] + t * N[0], A[1] + s * D[1] + t * N[1]];
  const lame = 'M' + pts([Q(0, -7), Q(83, -7), Q(83, 7), Q(0, 7)]) + ' Z';
  g.push(h.path(lame, h.a.blanc), h.path(lame, h.a.arete));
  g.push(h.path('M' + pts([Q(0, 4), Q(83, 4)]), h.a.detail));
  g.push(h.rect(136, 44, 52, 52, h.a.hachure('eau', 'aucun')));
  g.push(h.ligne(136, 44, 188, 44, h.a.detail));
  g.push(h.path('M136,18 L136,96 L188,96 L188,18', h.a.contour));
  // le geste : tremper la lame, souvent
  g.push(h.geste('M' + pts([Q(5, -15), Q(32, -15)])));
  return g.join('\n');
}

// ─── Raté : l'acier bleui au fil ─────────────────────────────────────────────────────────
function bleui(h) {
  const g = [];
  const lame = 'M42,8 Q52,4 63,8 T84,8 L84,204 L42,204 Z';
  g.push(h.path(lame, h.a.blanc), h.path(lame, h.a.contour));
  g.push(h.ligne(74, 10, 74, 204, h.a.detail));
  g.push(h.path('M84,84 C72,90 61,103 60,117 C59,131 70,144 84,152', h.a.fin));
  const m = 'M84,95 C76,100 68,108 67,118 C66,128 74,136 84,141 Z';
  g.push(h.path(m, h.a.hachure('grillage', 'detail')), h.path(m, h.a.detail));
  g.push(h.path('M84,105 C79,108 75,113 75,118 C75,123 79,127 84,130 Z', h.a.plein));
  // là où ça casse : le fil bleui
  g.push(h.controle(78, 118, 32));
  return g.join('\n');
}

// ─── Emmancher : vue de chant, éclatée ; puis à plat, montée ─────────────────────────────
function manche(h) {
  const g = [];
  // vue de chant : la lame n'est qu'un trait, le manche montre sa fente ouverte
  g.push(h.rect(16, 38.5, 284, 3, h.a.plein));
  g.push(h.fleche('M252,24 L320,24'));
  const bout = 'M575,25 L430,25 L335,19.5 L335,35.5 L430,40 L335,44.5 L335,60.5 L430,55 L575,55 Q584,40 575,25 Z';
  g.push(h.path(bout, h.a.blanc), h.path(bout, h.a.contour));
  g.push(h.ligne(430, 40, 470, 40, h.a.detail));
  for (const [y1, y2] of [[24.5, 30], [30.5, 35], [55.5, 50], [50.5, 45]]) {
    g.push(h.path(`M340,${y1} L430,${y2} L566,${y2}`, h.a.fin));
  }
  // vue à plat : lame, soie cachée dans le manche, ligature par-dessus
  const lame = 'M106,99 L330,99 L330,121 L106,121 Z';
  g.push(h.path(lame, h.a.blanc), h.path(lame, h.a.contour));
  g.push(h.ligne(106, 115.5, 330, 115.5, h.a.detail));
  const mch = 'M330,95 L575,95 Q584,110 575,125 L330,125 Z';
  // le dessous du manche, à l'ombre
  g.push(h.path(mch, h.a.blanc), h.path('M330,117 L578.5,117 L577.3,120.5 L575,125 L330,125 Z', h.a.ombre), h.path(mch, h.a.contour));
  for (const y of [101, 107, 113, 119]) g.push(h.path(`M406,${y} Q480,${y + 1.5} 566,${y}`, h.a.fin));
  g.push(h.path('M330,99 L404,99 L404,121 L330,121', h.a.cache));
  for (let k = 0; k < 8; k++) {
    const x = 333 + 5 * k;
    const b = 'M' + pts([[x, 94], [x + 4.6, 94], [x + 10.6, 126], [x + 6, 126]]) + ' Z';
    g.push(h.path(b, h.a.blanc), h.path(b, h.a.detail));
  }
  return g.join('\n');
}

// ─── Couvercle de conserve : les plis, la lame emmaillotée, sa coupe ─────────────────────
function couvercle(h) {
  const g = [];
  // à plat, avec ses deux lignes de pli
  g.push(h.cercle(62, 96, 50, h.a.blanc), h.cercle(62, 96, 50, h.a.contour), h.cercle(62, 96, 44, h.a.detail));
  g.push(h.ligne(30.7, 57, 93.3, 57, h.a.cache), h.ligne(20.6, 68, 103.4, 68, h.a.cache));
  // le geste : replier le bord
  g.push(h.geste('M102,46 C122,46 125,68 113,77'));
  // replié, emmailloté d'écorce côté dos, fil affûté sur le pourtour
  const D = 'M148.6,68 L231.4,68 A50,50 0 1 1 148.6,68 Z';
  g.push(h.path(D, h.a.blanc), h.path(D, h.a.contour));
  g.push(h.path('M234,97 A44,44 0 0 1 146,97', h.a.detail));
  const ecorce = 'M139,60 Q190,55 241,60 L243,92 Q190,97 137,92 Z';
  g.push(h.path(ecorce, h.a.blanc), h.path(ecorce, h.a.arete));
  g.push(h.path('M214,58 Q217,76 213,95', h.a.detail));
  for (const [x, y, l] of [[150, 68, 9], [172, 74, 7], [196, 66, 10], [224, 72, 7], [158, 85, 8], [190, 86, 6], [229, 84, 8], [178, 64, 5]]) {
    g.push(h.ligne(x, y, x + l, y, h.a.detail));
  }
  // en coupe : le dos roulé dans l'écorce, le fil en bas
  // l'écorce serre le dos et se referme sur la tôle en dessous
  const anneau = 'M298,100 C290,94 287,82 287,70 Q287,55 304,55 Q321,55 321,70 C321,84 310,94 298,100 Z ' +
    'M298,94 C294,89 292,80 292,70 Q292,60 304,60 Q316,60 316,70 C316,82 308,90 298,94 Z';
  g.push(h.path(anneau, h.a.hachure('bois', 'detail') + ' fill-rule="evenodd"'));
  g.push(h.path(anneau, h.a.detail));
  g.push(h.path('M298,138 L298,70 A6,6 0 0 1 310,70 L310,82 A3,3 0 0 1 304,82 L304,72', h.a.contour));
  g.push(h.path('M296.8,137 L299.2,137 L298,150 Z', h.a.plein));
  return g.join('\n');
}

// ─── Fer-blanc : la bande découpée, à plat, puis pliée en long ───────────────────────────
function ferblanc(h) {
  const g = [], C = 44, R = 28, RYc = 7, T = 20, B = 104;
  const arcY = (y0, x) => y0 + RYc * Math.sqrt(Math.max(0, 1 - ((x - C) / R) ** 2));
  const seg = (y0, x1, x2) => { const p = []; for (let x = x1; x <= x2 + 0.01; x += (x2 - x1) / 12) p.push([x, arcY(y0, x)]); return 'M' + pts(p); };
  const s1 = 32, s2 = 56;
  // la boîte, une bande enlevée dans sa paroi
  const corps = `M${C - R},${T} L${C - R},${B} A${R},${RYc} 0 0 0 ${C + R},${B} L${C + R},${T} Z`;
  g.push(h.path(corps, h.a.blanc));
  // la face de droite de la boîte, à l'ombre
  { const q = []; for (let x = C + R * 0.5; x <= C + R + 0.01; x += R * 0.5 / 8) q.push([x, arcY(T, x)]);
    for (let x = C + R; x >= C + R * 0.5 - 0.01; x -= R * 0.5 / 8) q.push([x, arcY(B, x)]);
    g.push(h.path('M' + pts(q) + ' Z', h.a.ombre)); }
  g.push(h.path(`M${C - R},${T} A${R},${RYc} 0 0 1 ${C + R},${T}`, h.a.contour));
  g.push(h.path(`M${C - R},${T} L${C - R},${B} M${C + R},${T} L${C + R},${B}`, h.a.contour));
  g.push(h.path(seg(T, C - R, s1) + ' ' + seg(T, s2, C + R), h.a.contour));
  g.push(h.path(seg(B, C - R, s1) + ' ' + seg(B, s2, C + R), h.a.contour));
  g.push(h.path(`M${s1},${f(arcY(T, s1))} L${s1},${f(arcY(B, s1))} M${s2},${f(arcY(T, s2))} L${s2},${f(arcY(B, s2))}`, h.a.arete));
  g.push(h.path(`M${s1},${f(arcY(B, s1) - 14)} L${s2},${f(arcY(B, s2) - 14)}`, h.a.fin));
  for (const y of [42, 60, 78]) g.push(h.path(seg(y, C - R + 2, s1) + ' ' + seg(y, s2, C + R - 2), h.a.fin));
  // la bande à plat, sa ligne de pli
  g.push(h.rect(92, 22, 114, 36, h.a.blanc), h.rect(92, 22, 114, 36, h.a.arete));
  g.push(h.ligne(92, 40, 206, 40, h.a.cache));
  // le geste : plier en long
  g.push(h.geste('M211,54 C225,52 225,30 211,27'));
  // la bande pliée : le pli fait le dos, en haut ; sa coupe au bout
  g.push(h.rect(92, 100, 114, 18, h.a.blanc), h.rect(92, 100, 114, 18, h.a.arete));
  g.push(h.ligne(92, 100, 206, 100, h.a.contour));
  g.push(h.path('M214,118 L214,103 A3,3 0 0 1 220,103 L220,118', h.a.arete));
  return g.join('\n');
}
