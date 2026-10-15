// Planche 104-42 — Le serre-couture (chapitre 104, §9, « Les outils qu'on se fait », « Le serre-couture »).
// Ce que dit le chapitre : deux lattes de la longueur d'un bras, amincies au milieu pour qu'elles fassent
// ressort, liées ensemble au bas par une ligature de babiche et un coin de bois, tenues serrées entre les
// genoux ; l'ouvrage est pris dans les mâchoires du haut, les deux mains restent libres pour le point
// sellier à deux aiguilles (planche 104-02).
//
// Lecture du montage, faute de détail dans le chapitre : le coin est pris entre les pieds des deux lattes,
// gros bout en bas, et la ligature serre le paquet lattes-coin-lattes. Les lattes partent écartées du coin
// et se rejoignent aux mâchoires : c'est le montage de la pince de sellier (« stitching clam » : deux
// douelles réunies et tendues l'une contre l'autre à un bout, une pièce plus courte entre elles à
// l'autre ; tenue entre les genoux, ouverte à la main pour glisser l'ouvrage, elle se referme seule).
// Sources : sources/104-serre-couture.md. Aucune cote : le chapitre n'en donne aucune, sauf « la longueur
// d'un bras », qui reste en mots. Les proportions du dessin (lattes de 700 mm, 16 mm d'épaisseur aux
// bouts et 9 au milieu, coin de 110 mm) sont un dessin, pas une donnée.
//
// Trois vues : de côté, couché (le serre-couture entier, le pied à gauche) ; en usage, de profil (assis, le
// pied au sol, serré entre les genoux, une main de chaque côté de l'ouvrage) ; le pied en gros, debout comme
// en usage (le coin, la ligature).
'use strict';

const f1 = v => Math.round(v * 10) / 10;
const RAD = Math.PI / 180;

module.exports = (h) => {
  const A = h.a, F = h.formes;

  // ─── Le serre-couture en mm, repère local : x vers la droite, y vers le haut depuis le sol ─────────
  const LONG = 700;           // la longueur d'un bras (dessin)
  const COIN = 110;           // la hauteur du coin
  const C_BAS = 38, C_HAUT = 26;   // l'épaisseur du coin, gros bout en bas
  const LIG = [18, 92];       // la ligature, du bas vers le haut
  const MAC = 70;             // la hauteur des mâchoires
  const CUIR = 6;             // deux épaisseurs de cuir prises dans les mâchoires
  // l'épaisseur d'une latte à la hauteur y : 16 aux bouts, 9 au milieu, raccords doux
  const ep = y => {
    const t = (a, b, v) => Math.max(0, Math.min(1, (v - a) / (b - a)));
    const lis = s => s * s * (3 - 2 * s);
    const m = lis(t(150, 240, y)) * (1 - lis(t(470, 560, y)));
    return 16 - 7 * m;
  };
  // la face intérieure d'une latte (demi-écart au centre) : collée au coin en bas, puis droite jusqu'aux
  // mâchoires, où il ne reste que le cuir entre les deux
  const demiEcart = y => {
    if (y <= COIN) return (C_BAS + (C_HAUT - C_BAS) * y / COIN) / 2;
    const y1 = LONG - MAC;
    if (y >= y1) return CUIR / 2;
    return C_HAUT / 2 + (CUIR / 2 - C_HAUT / 2) * (y - COIN) / (y1 - COIN);
  };
  // contours d'une latte (côté +1 à droite, −1 à gauche) : face intérieure et face extérieure
  const latte = (cote, y0 = 0, y1 = LONG, pas = 4) => {
    const int = [], ext = [];
    for (let y = y0; y <= y1 + 0.01; y += pas) {
      const d = demiEcart(y);
      int.push([cote * d, y]);
      ext.push([cote * (d + ep(y)), y]);
    }
    return { int, ext };
  };

  // une ligne de cassure entre deux points (la pièce continue)
  const cassure = (a, b, amp = 2, n = 1) => {
    const pts = [];
    for (let i = 0; i <= 12 * n; i++) { const t = i / (12 * n); pts.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t + Math.sin(t * n * 2 * Math.PI) * amp]); }
    return pts;
  };
  // une bande fermée le long d'une ligne médiane (le bout de babiche)
  const bande = (m, e) => {
    const g = [], d = [];
    for (let i = 0; i < m.length; i++) {
      const a = m[Math.max(0, i - 1)], b = m[Math.min(m.length - 1, i + 1)];
      const dx = b[0] - a[0], dy = b[1] - a[1], n = Math.hypot(dx, dy) || 1, nx = -dy / n, ny = dx / n;
      g.push([m[i][0] + nx * e / 2, m[i][1] + ny * e / 2]); d.push([m[i][0] - nx * e / 2, m[i][1] - ny * e / 2]);
    }
    return g.concat(d.reverse());
  };
  // les deux lattes entre y0 et y1 (mm), dans le repère P ; cassure en haut et/ou en bas
  const lattes = (P, y0, y1, { casseBas = false, casseHaut = false, pas = 2 } = {}) => {
    const out = [];
    for (const c of [-1, 1]) {
      const L = latte(c, y0, y1, pas);
      const poly = L.int.concat(L.ext.slice().reverse()).map(P);
      out.push(h.chemin(poly, A.blanc, true));
      out.push(h.chemin(L.int.map(P), A.contour), h.chemin(L.ext.map(P), A.contour));
      const bout = (i, casse) => {
        const a = P(L.int[i]), b = P(L.ext[i]);
        out.push(casse ? h.chemin(cassure(a, b, 1.8), A.detail) : h.ligne(a[0], a[1], b[0], b[1], A.contour));
      };
      bout(0, casseBas); bout(L.int.length - 1, casseHaut);
    }
    return out.join('\n');
  };
  // la ligature : des tours jointifs, un peu en biais, et le bout passé sous les deux derniers tours
  const ligature = (P, s) => {
    const out = [], [l0, l1] = LIG, n = 11, hb = (l1 - l0) / n;
    for (let i = 0; i < n; i++) {
      const y = l0 + (l1 - l0) * (i + 0.5) / n, d = demiEcart(y) + ep(y) + 1;
      const q = [[-d, y - hb / 2 + 0.7], [d, y - hb / 2 + 2.1], [d, y + hb / 2 + 0.7], [-d, y + hb / 2 - 0.7]].map(P);
      const r = 0.9 * s;
      out.push(h.path(`M${f1(q[0][0])} ${f1(q[0][1])} L${f1(q[1][0])} ${f1(q[1][1])} Q${f1(q[1][0] + r)} ${f1((q[1][1] + q[2][1]) / 2)} ${f1(q[2][0])} ${f1(q[2][1])} L${f1(q[3][0])} ${f1(q[3][1])} Q${f1(q[3][0] - r)} ${f1((q[3][1] + q[0][1]) / 2)} ${f1(q[0][0])} ${f1(q[0][1])} Z`, `fill="#FFFFFF" stroke="#1A1A1A" stroke-width="1.4" stroke-linejoin="round"`));
    }
    const d1 = demiEcart(l1) + ep(l1) + 1;
    const e0 = P([d1 - 2, l1 - hb * 1.6]), e1 = P([d1 + 6, l1 + 2]), e2 = P([d1 + 9, l1 + 14]);
    const m = [];
    for (let i = 0; i <= 10; i++) { const t = i / 10, u = 1 - t; m.push([0, 1].map(j => u * u * e0[j] + 2 * u * t * e1[j] + t * t * e2[j])); }
    out.push(h.chemin(bande(m, hb * s * 0.8), `fill="#FFFFFF" stroke="#1A1A1A" stroke-width="1.4" stroke-linejoin="round"`, true));
    return out.join('\n');
  };
  const coinDe = P => [[-C_BAS / 2, 0], [-C_HAUT / 2, COIN], [C_HAUT / 2, COIN], [C_BAS / 2, 0]].map(P);

  // ─── En position : debout, le pied au sol, serré entre les genoux ──────────────────────────────────
  const GENOU = 470;          // la hauteur des genoux, assis (dessin)
  const geoPos = z => {
    const s = (z.h - 26) / (LONG + 70);
    const X = z.l / 2, Y = z.h - 8;
    const P = ([x, y]) => [X + x * s, Y - y * s];
    return { s, X, Y, P };
  };
  const dessinPos = z => {
    const g = geoPos(z), { P, s } = g, out = [];
    out.push(h.ligne(8, g.Y, z.l - 8, g.Y, A.arete));
    // l'ouvrage pris dans les mâchoires : deux épaisseurs qui dépassent
    const c1 = LONG + 62;
    const cuir = [[-CUIR / 2, LONG - MAC + 10], [-CUIR / 2, c1], [CUIR / 2, c1], [CUIR / 2, LONG - MAC + 10]].map(P);
    out.push(h.chemin(cuir, A.blanc, true), h.chemin(cuir, A.arete, true), h.ligne(...P([0, LONG]), ...P([0, c1]), A.detail));
    const coin = coinDe(P);
    out.push(h.chemin(coin, A.blanc, true), h.chemin(coin, A.arete, true));
    out.push(lattes(P, 0, LONG, { pas: 4 }));
    // la ligature, simplifiée à cette échelle
    for (let i = 0; i <= 7; i++) {
      const y = LIG[0] + (LIG[1] - LIG[0]) * i / 7, d = demiEcart(y) + ep(y) + 1;
      out.push(h.ligne(...P([-d, y - 2]), ...P([d, y + 2]), A.arete));
    }
    // les genoux serrent les deux lattes l'une contre l'autre
    const d = demiEcart(GENOU) + ep(GENOU);
    const yG = P([0, GENOU])[1];
    out.push(h.geste(`M${f1(P([-d, 0])[0] - 46)} ${f1(yG)} L${f1(P([-d, 0])[0] - 6)} ${f1(yG)}`));
    out.push(h.geste(`M${f1(P([d, 0])[0] + 46)} ${f1(yG)} L${f1(P([d, 0])[0] + 6)} ${f1(yG)}`));
    return out.join('\n');
  };

  // ─── En gros : les mâchoires en haut, le pied en bas ───────────────────────────────────────────────
  const geoGros = z => {
    // les mâchoires : de 600 à 770 mm ; le pied : de 0 à 170 mm
    const sM = Math.min(1.9, (z.h * 0.45) / 170), sP = Math.min(1.9, (z.h * 0.47) / 170);
    const Xm = z.l * 0.5, Xp = z.l * 0.5;
    const PM = ([x, y]) => [Xm + x * sM, 10 + (LONG + 66 - y) * sM];
    const PP = ([x, y]) => [Xp + x * sP, z.h - 6 - y * sP];
    return { sM, sP, PM, PP };
  };
  const aiguille = (a, b, L, ep2) => {
    // une aiguille de a (le chas) vers b (la pointe) ; L la longueur, ep2 la demi-épaisseur
    const u = [(b[0] - a[0]) / L, (b[1] - a[1]) / L], n = [-u[1], u[0]];
    const Q = (t, w) => [a[0] + u[0] * t + n[0] * w, a[1] + u[1] * t + n[1] * w];
    const corps = [Q(0, ep2 * 0.8), Q(L * 0.82, ep2), Q(L, 0), Q(L * 0.82, -ep2), Q(0, -ep2 * 0.8)];
    return [h.chemin(corps, A.blanc, true), h.chemin(corps, A.arete, true), h.ellipse(...Q(ep2 * 2.2, 0), ep2 * 1.2, ep2 * 0.35, A.detail)].join('\n');
  };
  const dessinGros = z => {
    const g = geoGros(z), { PM, PP, sM, sP } = g, out = [];
    // les mâchoires
    const c1 = LONG + 62, yT = LONG + 30;
    const cuir = [[-CUIR / 2, LONG - MAC + 10], [-CUIR / 2, c1], [CUIR / 2, c1], [CUIR / 2, LONG - MAC + 10]].map(PM);
    out.push(h.chemin(cuir, A.blanc, true), h.chemin(cuir, A.arete, true), h.ligne(...PM([0, LONG - MAC + 10]), ...PM([0, c1]), A.detail));
    out.push(lattes(PM, 610, LONG, { casseBas: true }));
    // le fil : deux brins qui sortent du même trou, un de chaque côté, jusqu'au chas de chaque aiguille
    const trou = PM([0, yT]);
    const chasG = [trou[0] - 132, trou[1] + 34], chasD = [trou[0] + 132, trou[1] + 22];
    out.push(h.path(`M${f1(trou[0] - CUIR / 2 * sM)} ${f1(trou[1])} Q${f1(trou[0] - 40)} ${f1(trou[1] + 34)} ${f1(chasG[0] + 4)} ${f1(chasG[1])}`, A.arete));
    out.push(h.path(`M${f1(trou[0] + CUIR / 2 * sM)} ${f1(trou[1] + 1)} Q${f1(trou[0] + 46)} ${f1(trou[1] + 30)} ${f1(chasD[0] - 4)} ${f1(chasD[1])}`, A.arete));
    // les deux aiguilles : celle de gauche entre par la gauche, celle de droite par la droite, dans le même trou
    out.push(aiguille([trou[0] - 120, trou[1] - 22], [trou[0] + 34, trou[1] - 4], 155, 2.6));
    out.push(aiguille([trou[0] + 120, trou[1] - 40], [trou[0] - 36, trou[1] - 10], 158, 2.6));
    // le pied
    out.push(h.ligne(8, PP([0, 0])[1], z.l - 8, PP([0, 0])[1], A.arete));
    const coin = coinDe(PP);
    out.push(h.chemin(coin, A.blanc, true), h.chemin(coin, A.contour, true));
    [-5, 4].forEach(dx => out.push(h.path(`M${f1(PP([dx, 6])[0])} ${f1(PP([dx, 6])[1])} Q${f1(PP([dx + 2, 55])[0])} ${f1(PP([dx + 2, 55])[1])} ${f1(PP([dx * 0.8, COIN - 6])[0])} ${f1(PP([dx * 0.8, COIN - 6])[1])}`, A.detail)));
    out.push(lattes(PP, 0, 168, { casseHaut: true }));
    out.push(ligature(PP, sP));
    return out.join('\n');
  };

  return {
    ref: '104-42',
    titre: 'Le serre-couture',
    desc: 'Le serre-couture debout, comme en usage : deux lattes plus minces au milieu, un coin de bois entre leurs pieds et une ligature de babiche autour du paquet ; elles se rejoignent en haut et pincent deux épaisseurs de cuir ; deux flèches à hauteur des genoux serrent les lattes l’une contre l’autre. En gros, en haut : les mâchoires, le cuir, et les deux aiguilles du point sellier qui passent dans le même trou, une de chaque côté. En gros, en bas : le coin, gros bout en bas, et les tours jointifs de la ligature.',
    format: 'pleine',
    disposition: [['pos', 'gros']],
    largeurs: [[1, 1.75]],
    vues: {
      pos: {
        titre: 'Debout, comme en usage',
        dessin: dessinPos,
        renvois: z => {
          const g = geoPos(z), P = g.P;
          const d = y => demiEcart(y) + ep(y);
          return [
            { n: 1, rond: [z.l - 14, P([0, 610])[1]], cible: P([d(610), 610]), texte: 'deux lattes de la longueur d’un bras' },
            { n: 2, rond: [z.l - 14, P([0, 330])[1]], cible: P([d(330), 330]), texte: 'amincies au milieu : elles font ressort' },
            { n: 3, rond: [16, P([0, GENOU + 70])[1]], cible: [P([-d(GENOU), 0])[0] - 26, P([0, GENOU])[1] - 2], texte: 'serré entre les genoux' },
          ];
        },
      },
      gros: {
        titre: 'En gros',
        dessin: dessinGros,
        renvois: z => {
          const g = geoGros(z), PM = g.PM, PP = g.PP;
          return [
            { n: 4, rond: [z.l - 16, 24], cible: PM([CUIR / 2, LONG + 52]), texte: 'l’ouvrage pris dans les mâchoires' },
            { n: 5, rond: [18, 24], cible: [PM([0, LONG + 30])[0] - 92, PM([0, LONG + 30])[1] - 15], texte: 'une aiguille de chaque côté, même trou' },
            { n: 6, rond: [18, PP([0, COIN + 40])[1]], cible: PP([-C_HAUT / 2 + 2, COIN - 4]), texte: 'coin de bois, gros bout en bas' },
            { n: 7, rond: [z.l - 16, PP([0, LIG[1] + 50])[1]], cible: PP([demiEcart(60) + ep(60) + 2, 60]), texte: 'ligature de babiche posée mouillée' },
          ];
        },
      },
    },
  };
};
