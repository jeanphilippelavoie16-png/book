// Planche 28-02 — rincer le nez d'un enfant de 4 ans (ch. 28, « La solution saline qu'on fabrique »).
//
// Ce que le chapitre dit, et rien de plus : couché sur le dos, la tête tournée sur le côté, 5 à
// 10 mL dans la narine du haut, à la seringue ou à la cuillère ; puis on tourne la tête de l'autre
// côté pour l'autre narine. Il se relève, crache, on lui essuie le nez. La seringue : orale,
// graduée, de 10 mL (tableau Matériel du chapitre).
//
// Les deux premières vues sont prises d'en haut, l'enfant couché en travers de la page, la tête à
// gauche : la tête tournée se voit de profil (bibliothèque). Le corps ne se dessine pas vu d'en
// haut (la bibliothèque n'a que des profils) : il est sous la couverture, remontée aux épaules,
// et c'est elle qui dit « couché ». La seringue n'est pas tenue : sa position et la flèche du
// piston suffisent (une main qui pince un piston est le point faible de la bibliothèque).
// Dernière vue : le pictogramme d'enfant de la bibliothèque (personnage, règle 8), assis sur un
// tabouret, penché sur un bol posé sur la table (JP, 12 octobre : le « petit bonhomme » refait).
//
// Aucune mesure de seringue ni de corps dans le chapitre : aucune cote.

'use strict';

module.exports = (h) => {
  const F = h.formes;
  const f = n => Math.round(n * 10) / 10;
  const NOIR = '#1A1A1A';
  const BT = ep => `fill="#FFFFFF" stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="round"`;
  const TR = ep => `fill="none" stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="round"`;
  const BLANC = 'fill="#FFFFFF" stroke="none"';
  const RAD = Math.PI / 180;

  // Catmull-Rom → Bézier : la courbe passe par chaque point
  const cr = (pts, ferme = false) => {
    const n = pts.length;
    const g = i => (ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))]);
    let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      d += ` C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
    }
    return d + (ferme ? ' Z' : '');
  };
  const ligneD = pts => pts.map((p, i) => `${i ? 'L' : 'M'}${f(p[0])} ${f(p[1])}`).join(' ');
  const clip = (id, x, y, l, ht, contenu) =>
    `<clipPath id="${id}"><rect x="${f(x)}" y="${f(y)}" width="${f(l)}" height="${f(ht)}"/></clipPath>\n<g clip-path="url(#${id})">\n${contenu}\n</g>`;

  // ─── la seringue orale de 10 mL ──────────────────────────────────────────────────────
  // En mm le long de l'axe, depuis le bout de l'embout : embout, épaule, corps gradué, ailettes,
  // tige du piston, poussoir. Le joint du piston est à JOINT : devant lui, la solution.
  const EMB = 8, EPA = 12, CORPS = 78, AIL = 81, JOINT = 50, TIGE = 95;
  const seringue = (P, u, s) => {
    const n = [-u[1], u[0]];
    const Q = (t, w) => [P[0] + (u[0] * t + n[0] * w) * s, P[1] + (u[1] * t + n[1] * w) * s];
    const boite = (t0, t1, w0, w1 = w0) => ligneD([Q(t0, -w0), Q(t1, -w1), Q(t1, w1), Q(t0, w0)]) + ' Z';
    const fin = JOINT + TIGE;                         // le poussoir
    const out = [];
    // la tige hors du corps, en croix : deux bords et l'arête du milieu
    out.push(h.path(boite(AIL, fin, 4.2), BT(1.4)));
    out.push(h.path(ligneD([Q(AIL, 0), Q(fin, 0)]), TR(0.5)));
    // le poussoir
    out.push(h.path(boite(fin, fin + 3.2, 11), BT(1.4)));
    // le corps : la solution devant le joint, le joint, la tige vue au travers
    out.push(h.path(ligneD([Q(EMB, -2.6), Q(EPA, -8.4), Q(CORPS, -8.4), Q(CORPS, 8.4), Q(EPA, 8.4), Q(EMB, 2.6)]) + ' Z', BT(1.4)));
    out.push(h.path(ligneD([Q(EPA + 0.8, -7.4), Q(JOINT, -7.4), Q(JOINT, 7.4), Q(EPA + 0.8, 7.4)]) + ' Z', `fill="url(#h-eau)" stroke="none"`));
    out.push(h.path(boite(JOINT, JOINT + 6, 8.4), `fill="${NOIR}" stroke="${NOIR}" stroke-width="0.7"`));
    out.push(h.path(ligneD([Q(JOINT + 6, -4.2), Q(CORPS, -4.2)]) + ' ' + ligneD([Q(JOINT + 6, 4.2), Q(CORPS, 4.2)]), TR(0.5)));
    // les ailettes, arrondies
    out.push(h.path(cr([Q(CORPS, 0), Q(CORPS - 0.4, -12), Q(CORPS + 1.5, -16.5), Q(AIL + 0.4, -12), Q(AIL, 0), Q(AIL + 0.4, 12), Q(CORPS + 1.5, 16.5), Q(CORPS - 0.4, 12)], true), BT(1.4)));
    // les graduations : dix traits d'un millilitre, un plus long à 5 et à 10
    for (let k = 0; k <= 10; k++) {
      const t = EPA + 2 + k * 6, l = k % 5 === 0 ? 6 : 3.5;
      out.push(h.path(ligneD([Q(t, -8.4), Q(t, -8.4 + l)]), TR(0.5)));
    }
    // l'embout
    out.push(h.path(boite(0, EMB, 1.9, 2.6), BT(1.4)));
    return { svg: out.join('\n'), dos: t => Q(fin + t, 0), Q };
  };

  // ─── la tête d'un enfant de 4 ans, de profil ─────────────────────────────────────────
  // Même repère que la bibliothèque (oreille en 0, 0, visage vers +x, haut vers −y), mais le crâne
  // rond et grand, le visage court, le nez court et retroussé, le petit menton, les cheveux courts.
  // M : local → page ; ep : échelle des traits.
  const ENF = {
    contour: [[-52, 58], [-84, 22], [-100, -40], [-86, -104], [-36, -142], [28, -142], [76, -114], [99, -68], [101, -34],
      [97, -14], [101, -2], [111, 10], [111, 17], [103, 21], [104, 29], [100, 35], [103, 41], [98, 51], [88, 63], [66, 72], [44, 77]],
    nuque: [-52, 58], gorge: [44, 77],
    narine: [103.5, 16.5],
  };
  const teteEnfant = (M, coup = 1) => {
    const out = [];
    const c = ENF.contour.map(M);
    const cou = [M(ENF.gorge), M([40, 140]), M([-46, 140]), M(ENF.nuque)];
    out.push(h.path(cr(c) + ' ' + ligneD(cou).replace('M', 'L') + ' Z', BLANC));
    out.push(h.path(cr(c), TR(2.4 * coup)));
    out.push(h.path(cr([M(ENF.gorge), M([42, 110]), M([40, 140])]), TR(1.4 * coup)));
    out.push(h.path(cr([M(ENF.nuque), M([-50, 100]), M([-46, 140])]), TR(1.4 * coup)));
    // la ligne des cheveux courts : en haut du front, la tempe, la patte devant l'oreille, puis
    // derrière l'oreille jusqu'à la nuque
    out.push(h.path(cr([[99, -70], [86, -76], [62, -74], [40, -62], [26, -44], [20, -26]].map(M)), TR(0.7 * coup)));
    out.push(h.path(cr([[-16, -22], [-30, -8], [-44, 20], [-52, 52]].map(M)), TR(0.7 * coup)));
    for (const m of [[[86, -76], [80, -86]], [[62, -74], [58, -84]], [[40, -62], [34, -72]]])
      out.push(h.path(ligneD(m.map(M)), TR(0.5 * coup)));
    // l'oreille
    out.push(h.path(cr([[4, -24], [-14, -28], [-20, 0], [-12, 18], [2, 20]].map(M)), TR(1.4 * coup)));
    out.push(h.path(cr([[-3, -12], [-10, -2], [-4, 8]].map(M)), TR(0.7 * coup)));
    // l'œil fermé (les cils vers la joue) et le sourcil
    out.push(h.path(cr([[64, -30], [72, -25], [82, -28]].map(M)), TR(1.4 * coup)));
    for (const [a, b] of [[[67, -27], [65, -22]], [[72, -25], [71, -20]], [[77, -26], [77, -21]]])
      out.push(h.path(ligneD([M(a), M(b)]), TR(0.5 * coup)));
    out.push(h.path(cr([[62, -46], [74, -50], [86, -46]].map(M)), TR(0.7 * coup)));
    // l'aile du nez et l'ouverture de la narine, sous le bout
    out.push(h.path(cr([[100, 4], [95, 10], [97, 17], [102, 19]].map(M)), TR(0.7 * coup)));
    const n0 = M([99.5, 17]), n1 = M([107.5, 16]);
    out.push(h.path(cr([M([99.5, 17]), M([103.5, 14.5]), M([107.5, 16]), M([103.5, 19]), M([99.5, 17])]), `fill="${NOIR}" stroke="${NOIR}" stroke-width="0.5"`));
    // la bouche, la joue
    out.push(h.path(cr([[100, 35], [94, 36], [90, 34]].map(M)), TR(0.7 * coup)));
    out.push(h.path(cr([[70, 10], [80, 22], [78, 36]].map(M)), TR(0.5 * coup)));
    return out.join('\n');
  };

  // ─── l'enfant couché, vu d'en haut ───────────────────────────────────────────────────
  // Repère de la tête (celui de la bibliothèque) : l'oreille en 0, 0 ; le visage vers +x ; le
  // haut du crâne en y = −124 ; le cou coupé vers y = 126 (nuque) et 155 (gorge). Sur la vue, ce
  // y file vers la droite (vers les pieds) et ce x vers le bas (s = +1, le visage tourné vers le
  // bas de la page) ou vers le haut (s = −1).
  const NARINE = [105, 16.5];                                    // l'embout entre dans l'ouverture de la narine
  const AXE = 66;                                   // la seringue part vers le menton et les pieds
  // la couverture : son bord remonté aux épaules, le revers, deux plis sur les bras
  const BORD = [[-320, 250], [-210, 204], [-130, 162], [-62, 126], [0, 130], [62, 152], [130, 184], [210, 226], [320, 266]];
  const REVERS = BORD.map(([x, y]) => [x, y + 40]);
  const PLIS = [
    [[-150, 262], [-160, 340], [-156, 460]],
    [[150, 272], [160, 350], [156, 460]],
    [[-40, 250], [-10, 330], [-30, 460]],
  ];
  // (ancienne tête ronde sans visage, rejetée par JP : « tête wtf » ; gardée hors usage)
  // visage et le cou en bande ; la narine est l'endroit du rond où l'embout entre.
  const TC = [5, -32], TR_ = 108;
  const teteRonde = (M) => {
    const ptsC = []; for (let k = 0; k < 36; k++) { const a = k * 10 * RAD; ptsC.push(M([TC[0] + Math.cos(a) * TR_, TC[1] + Math.sin(a) * TR_])); }
    const cou = [[-40, 40], [40, 40], [40, 150], [-40, 150]].map(M);
    // le nez en simple bosse (pas de visage) : il dit de quel côté la tête est tournée
    const P = (a, r) => M([TC[0] + Math.cos(a * RAD) * r, TC[1] + Math.sin(a * RAD) * r]);
    const pn = [P(8, TR_ - 4), P(16, TR_ + 14), P(24, TR_ + 12), P(30, TR_ - 4)];
    const nez = h.path(cr(pn) + ' Z', BLANC) + '\n' + h.path(cr(pn), TR(2.4));
    return h.path(ligneD(cou) + ' Z', BT(2.4)) + '\n' + h.path(cr(ptsC, true), BT(2.4));
  };
  const scene = (z, E, s, cx, cy, id, avecTour) => {
    const T = p => [cx + E * p[1], cy + s * E * p[0]];
    const out = [];
    // l'oreiller sous la tête : coins arrondis, deux plis
    const X0 = -128, X1 = 132, Y0 = -180, Y1 = 62, r = 30;
    const O = [[X0, Y0], [X1, Y0], [X1, Y1], [X0, Y1]];
    const oreil = [[X0 + r, Y0], [X1 - r, Y0], [X1, Y0 + r], [X1, Y1 - r], [X1 - r, Y1], [X0 + r, Y1], [X0, Y1 - r], [X0, Y0 + r]].map(T);
    const q = (a, c, b) => `L${f(a[0])} ${f(a[1])} Q${f(c[0])} ${f(c[1])} ${f(b[0])} ${f(b[1])}`;
    const C = O.map(T);
    const dO = `M${f(oreil[0][0])} ${f(oreil[0][1])} ` + q(oreil[1], C[1], oreil[2]) + ' ' + q(oreil[3], C[2], oreil[4]) + ' ' + q(oreil[5], C[3], oreil[6]) + ' ' + q(oreil[7], C[0], oreil[0]) + ' Z';
    out.push(h.path(dO, BT(1.4)));
    out.push(h.path(cr([[X0, 20], [X0 + 28, 12], [X0 + 46, 26]].map(T)), TR(0.7)));
    out.push(h.path(cr([[X1, -140], [X1 - 22, -130], [X1 - 36, -142]].map(T)), TR(0.7)));
    // la seringue, puis la tête par-dessus : l'embout disparaît dans la narine
    const P = T(NARINE);
    const u = [Math.sin(AXE * RAD), s * Math.cos(AXE * RAD)];
    const sg = seringue(P, u, E * 0.95);
    out.push(sg.svg);
    out.push(teteEnfant(T));
    // la couverture, par-dessus le cou coupé ; elle file hors de la vue
    const loin = 900;
    const couv = [];
    couv.push(h.path(cr(BORD.map(T)) + ' ' + ligneD([T([300, loin]), T([-300, loin])]).replace('M', 'L') + ' Z', BLANC));
    couv.push(h.path(cr(BORD.map(T)), TR(1.4)));
    couv.push(h.path(cr(REVERS.map(T)), TR(1.4)));
    for (const k of [1, 3, 5, 7]) couv.push(h.path(ligneD([T(BORD[k]), T(REVERS[k])]), TR(0.5)));
    for (const pl of PLIS) couv.push(h.path(cr(pl.map(T)), TR(0.5)));
    out.push(clip(id, 0, 0, z.l, z.h, couv.join('\n')));
    // la poussée du piston, dans l'axe, vers le nez
    const a = sg.dos(36), b = sg.dos(8);
    out.push(h.fleche(`M${f(a[0])} ${f(a[1])} L${f(b[0])} ${f(b[1])}`, h.a.arete));
    let tour = null;
    if (avecTour) {
      // un demi-cercle qui frôle le sommet du crâne : le nez passe d'un côté à l'autre
      const oc = T([0, -30]), R = 128 * E;
      const pts = [];
      for (let k = 0; k <= 24; k++) {
        const th = (100 + k * (160 / 24)) * RAD;
        pts.push([oc[0] + Math.cos(th) * R, oc[1] - s * Math.sin(th) * R]);
      }
      out.push(h.fleche(cr(pts), h.a.arete));
      tour = pts[12];
    }
    return { svg: out.join('\n'), T, P, sg, tour };
  };

  // ─── il crache : assis, penché sur le bol posé sur la table ──────────────────────────
  // Le pictogramme de la bibliothèque (règle 8), enfant de 5 ans, assis sur un tabouret, le tronc
  // penché au-dessus du bol, les deux mains posées au bord de la table. La table et le tabouret sont
  // à la taille d'un enfant ; la tête tombe au-dessus du bol.
  const crache = z => {
    const E = 0.27, solY = z.h - 14;
    const hx = 46;                                     // sous la hanche
    const mm = v => v * E;
    const tableY = solY - mm(420), tx0 = hx + mm(170);   // le dessus de la table, son bord proche
    const pose = { x: hx, y: solY, pose: 'assis', age: 'enfant', echelle: E, penche: 20, regard: 42,
      mains: { proche: [tx0 + 6, tableY - 9], loin: [tx0 + 1, tableY - 9] } };
    const p = F.personnage(pose);
    const rx = 25, bx = p.bouche[0] + 26, bord = tableY - 17;
    return { E, solY, hx, tableY, tx0, pose, p, bx, rx, bord, m: p.bouche };
  };
  return {
    ref: '28-02',
    titre: 'Rincer le nez d’un enfant de 4 ans',
    desc: 'Vu d’en haut, l’enfant couché sur le dos sous sa couverture, la tête tournée sur le côté : l’embout d’une seringue orale de 10 mL dans la narine du haut, le piston poussé vers le nez. Puis la tête tournée de l’autre côté, la seringue dans l’autre narine. Enfin l’enfant assis, penché sur un bol, qui crache.',
    format: 'pleine',
    disposition: [['un'], ['deux', 'trois']],
    hauteurs: [1.2, 1],
    largeurs: [[1], [1.3, 1]],
    vues: {
      un: {
        titre: 'Couché sur le dos, la tête tournée, vu d’en haut',
        dessin: z => scene(z, 0.64, 1, z.l * 0.3, z.h * 0.36, 'vue-un-couverture', false).svg,
        renvois: z => {
          const v = scene(z, 0.64, 1, z.l * 0.3, z.h * 0.36, 'vue-un-couverture', false);
          return [
            { n: 1, rond: [z.l * 0.12, 16], cible: v.T([-40, -60]), texte: 'sur le dos, tête tournée sur le côté' },
            { n: 2, rond: [z.l * 0.16, z.h - 16], cible: [v.P[0], v.P[1] + 1.5], texte: 'l’embout dans la narine du haut' },
            { n: 3, rond: [z.l * 0.64, z.h - 16], cible: v.sg.dos(22), texte: 'pousser 5 à 10 mL ; sinon, à la cuillère' },
          ];
        },
      },
      deux: {
        titre: 'Puis l’autre côté',
        dessin: z => scene(z, 0.64, -1, z.l * 0.44, z.h * 0.6, 'vue-deux-couverture', true).svg,
        renvois: z => {
          const v = scene(z, 0.64, -1, z.l * 0.44, z.h * 0.6, 'vue-deux-couverture', true);
          return [
            { n: 4, rond: [16, 18], cible: v.tour, texte: 'tourner la tête : l’autre narine en haut' },
          ];
        },
      },
      trois: {
        titre: 'Il se relève et crache',
        dessin: z => {
          const { E, solY, hx, tableY, tx0, p, bx, rx, bord, m } = crache(z);
          const out = [];
          const mm = v => v * E;
          // le sol
          out.push(h.ligne(4, solY, z.l - 4, solY, h.a.arete));
          // la table, sous les mains et au-dessus des cuisses ; elle sort de la vue à droite
          const tx1 = z.l + 4, epT = mm(30);
          out.push(h.rect(tx0, tableY, tx1 - tx0, epT, BT(1.4)));
          out.push(h.rect(tx0 + mm(330), tableY + epT, mm(45), solY - tableY - epT, BT(1.4)));
          // le tabouret sous la hanche
          const sy = solY - mm(292);
          out.push(h.rect(hx - mm(150), sy + mm(25), mm(36), solY - sy - mm(25), BT(1.4)));
          out.push(h.rect(hx + mm(80), sy + mm(25), mm(36), solY - sy - mm(25), BT(1.4)));
          out.push(h.rect(hx - mm(170), sy, mm(310), mm(25), BT(1.4)));
          // l'enfant
          out.push(p);
          // le bol sur la table, sous la bouche
          out.push(h.path(`M${f(bx - rx)} ${f(bord)} C${f(bx - rx + 2)} ${f(tableY - 4)} ${f(bx - 12)} ${f(tableY)} ${f(bx)} ${f(tableY)} C${f(bx + 12)} ${f(tableY)} ${f(bx + rx - 2)} ${f(tableY - 4)} ${f(bx + rx)} ${f(bord)} Z`, BT(1.4)));
          out.push(h.ellipse(bx, bord, rx, 5, BT(1.4)));
          // ce qu'il crache tombe dans le bol
          const goutte = (x, y, r) => h.path(`M${f(x)} ${f(y - 2.4 * r)} C${f(x + 0.4 * r)} ${f(y - 1.2 * r)} ${f(x + r)} ${f(y - 0.6 * r)} ${f(x + r)} ${f(y)} A${f(r)} ${f(r)} 0 0 1 ${f(x - r)} ${f(y)} C${f(x - r)} ${f(y - 0.6 * r)} ${f(x - 0.4 * r)} ${f(y - 1.2 * r)} ${f(x)} ${f(y - 2.4 * r)} Z`, BT(0.7));
          const y0 = m[1] + 8, y1 = bord - 1;
          [0.25, 0.85].forEach((t, i) => out.push(goutte(m[0] + 4 + 14 * t, y0 + (y1 - y0) * t, i ? 3 : 2.6)));
          return out.join('\n');
        },
        renvois: z => {
          const { bord, m } = crache(z);
          return [
            { n: 5, rond: [z.l - 16, 18], cible: [m[0] + 2, (m[1] + bord) / 2 + 4], texte: 'il crache ; on lui essuie le nez' },
          ];
        },
      },
    },
  };
};
