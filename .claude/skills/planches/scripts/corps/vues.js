// vues.js — les corps simples en vues FACE, DOS et DESSUS (le profil est dans moteur.js).
//
// moteur.corps({ vue: 'face' | 'dos' | 'dessus', … }) passe ici : corps(o, moteur) rend la vue avec
// les outils du moteur (Clipper, extrémités, proportions), dans le même style que le profil : une
// silhouette continue et lisse, blanche, trait ~1,5 ; les contours intérieurs à 0,7 là où une pièce
// passe devant une autre ; pas de boule aux articulations, pas de couture au col ni à la ceinture,
// pas de muscles, pas de visage. Les formes sont des millimètres réels (homme de 1750 mm).
//
// ─── Les poses dans ces vues ────────────────────────────────────────────────────────────────────
//
// Toutes les vues passent par un même squelette 3D (X vers l'avant du bassin, Y vers sa droite,
// Z vers le haut) : la profondeur (qui passe devant qui) et les raccourcis en sortent d'eux-mêmes.
// P = le côté DROIT du personnage, L = le gauche, dans toutes les vues (de profil, P est le côté
// vers l'œil quand il regarde vers +x : son côté droit). De face, P est à gauche de l'écran ; de
// dos, à droite ; de dessus (il regarde vers +x), P est en bas de l'écran (+y).
//
//   1. Une pose de PROFIL (poses.json sans vue, ou vue 'profil' ; les poses du moteur) se rend telle
//      quelle de face, de dos ou de dessus : ses angles sont les angles dans le plan sagittal. Les
//      genoux s'ouvrent d'eux-mêmes quand la cuisse se plie (accroupi), les bras s'écartent un peu.
//
//   2. Une pose de FACE ou de DOS : angles dans le plan de la vue, 0 = vers le bas, + = vers
//      l'extérieur du corps (bras, avant-bras, main, cuisse, jambe) ; tronc, cou, tête : 0 = droit,
//      + = penché vers SA droite. Hors du plan :
//        raccourcis : { avantbrasP: 0.3, cuisseP: 0.45, … }  longueur vue / vraie ; + = l'os part
//                     vers l'AVANT du corps (vers l'œil de face), − = vers l'arrière ;
//        penche     : le tronc penché vers l'avant, en degrés (accroupi : 30 à 50).
//
//   3. Une pose de DESSUS : chaque membre { az, el } ou [az, el] (azimut 0 = vers l'avant, + = vers
//      l'extérieur ; élévation −90 = pendant, 0 = à l'horizontale), ou un nombre = un angle de
//      profil. Le reste :
//        tourneBassin, tourneTronc, tourneTete : où regardent le bassin, les épaules, la tête
//                     (degrés, + = vers SA droite ; la tête suit le tronc, le tronc le bassin) ;
//        tronc      : penché vers l'avant (degrés, comme de profil) ;
//        tournePiedP, tournePiedL : où pointe le pied (degrés, + = vers l'extérieur) ;
//        pasP, pasL : [dx, dy] en mm, déplacement de la cheville au sol (un pas), dans le repère
//                     du bassin (dx vers l'avant, dy vers l'extérieur).
//      Les jambes debout ne se voient pas d'en haut (sous le corps) : seuls les pieds dépassent.
//
// corps(o) prend en plus : caches (dessus : ce qui est caché sous le corps, redessiné en tireté :
// 'pieds', 'bassin', ['pieds', 'bassin'] ou true = tout ; rien par défaut), fantome (true : la
// silhouette seule en tireté, sans fond, pour montrer une position d'avant ; 'pieds' : les pieds
// seulement), cheveux (true ; false = sans), oreilles (true), angle (dessus : rotation de toute la
// figure à l'écran, degrés).
//
// ─── Les données exportées (homme ; pour(age) pour les autres) ──────────────────────────────────
//
//   segments[vue][nom] = [[t, demiLargeurExt, demiLargeurInt], …]   vue : face · dos · dessus
//       nom : bras · avantbras · cuisse · jambe · cou ; t de 0 (épaule, coude, hanche, genou, base
//       du cou) à 1 ; la 2e colonne (« avant » du format commun) est le côté vers lequel tourne un
//       angle positif : l'EXTÉRIEUR. Bras pendant : le bord de l'épaule ; levé à 180° : vers la tête.
//   bouts[nom] = [proximal, distal] : longueur du bout fermé en part de la demi-largeur.
//   tronc[vue], bassin[vue], tete[vue], cheveux[vue], oreilles[vue], nez.dessus : contours fermés,
//       [[x, y], …] en mm, denses (à tracer en L). face/dos : origine au milieu des hanches, y vers
//       le bas ; tête : origine au pivot (haut du cou). dessus : x vers l'avant, y vers sa droite.
//   ancres[vue] : hanche, epaule, cou, pivot (côté P pour les points pairs).
//   troncFace(age, angleBrasP, angleBrasL) : le tronc dont les épaules suivent les bras levés.
//   troncDessus(age, penche) : les tranches du tronc projetées, à unir.

'use strict';

const RAD = Math.PI / 180;
const NOIR = '#1A1A1A', BLANC = '#FFFFFF', GRIS = '#E6E6E6';
const f1 = v => Math.round(v * 10) / 10;
const f2 = v => (Math.round(v * 100) / 100).toString();
const add = (a, b) => [a[0] + b[0], a[1] + b[1]], sub = (a, b) => [a[0] - b[0], a[1] - b[1]], mul = (a, k) => [a[0] * k, a[1] * k];
const lon = a => Math.hypot(a[0], a[1]);
const uni = a => { const l = lon(a) || 1; return [a[0] / l, a[1] / l]; };
const dot = (a, b) => a[0] * b[0] + a[1] * b[1];
const rot = (p, deg) => { const c = Math.cos(deg * RAD), s = Math.sin(deg * RAD); return [p[0] * c - p[1] * s, p[0] * s + p[1] * c]; };
const lisseEtape = (a, b, x) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
// 3D
const a3 = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]], m3 = (a, k) => [a[0] * k, a[1] * k, a[2] * k];
const n3 = a => { const l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; };
const rotZ = (p, deg) => { const c = Math.cos(deg * RAD), s = Math.sin(deg * RAD); return [p[0] * c - p[1] * s, p[0] * s + p[1] * c, p[2]]; };
const rotX = (p, deg) => { const c = Math.cos(deg * RAD), s = Math.sin(deg * RAD); return [p[0], p[1] * c - p[2] * s, p[1] * s + p[2] * c]; };
const rotY = (p, deg) => { const c = Math.cos(deg * RAD), s = Math.sin(deg * RAD); return [p[0] * c + p[2] * s, p[1], -p[0] * s + p[2] * c]; };

// ─── courbes ─────────────────────────────────────────────────────────────────────────────────────
// interpolation monotone d'une table [[t, v1, v2]] : pas de bosse parasite entre deux clés
function pchip(table, t, col) {
  const n = table.length;
  if (t <= table[0][0]) return table[0][col];
  if (t >= table[n - 1][0]) return table[n - 1][col];
  let i = 0;
  while (i < n - 2 && t > table[i + 1][0]) i++;
  const x = k => table[k][0], y = k => table[k][col];
  const dk = k => (y(k + 1) - y(k)) / (x(k + 1) - x(k));
  const tan = k => {
    if (k === 0) return dk(0);
    if (k === n - 1) return dk(n - 2);
    const a = dk(k - 1), b = dk(k);
    if (a * b <= 0) return 0;
    const w1 = 2 * (x(k + 1) - x(k)) + (x(k) - x(k - 1)), w2 = (x(k + 1) - x(k)) + 2 * (x(k) - x(k - 1));
    return (w1 + w2) / (w1 / a + w2 / b);
  };
  const h = x(i + 1) - x(i), s = (t - x(i)) / h;
  return (2 * s ** 3 - 3 * s ** 2 + 1) * y(i) + (s ** 3 - 2 * s ** 2 + s) * h * tan(i) + (-2 * s ** 3 + 3 * s ** 2) * y(i + 1) + (s ** 3 - s ** 2) * h * tan(i + 1);
}
// une suite de points → une courbe qui passe par chacun (Catmull-Rom centripète), échantillonnée
function courbe(pts, ferme = false, pas = 3) {
  const n = pts.length, out = [];
  const P = i => ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
  const lin = (a, b, ta, tb, t) => { const u = (t - ta) / (tb - ta || 1); return [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u]; };
  const fin = ferme ? n : n - 1;
  for (let i = 0; i < fin; i++) {
    const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
    const d = (a, b) => Math.max(1e-6, Math.sqrt(Math.hypot(b[0] - a[0], b[1] - a[1])));
    const t0 = 0, t1 = d(p0, p1), t2 = t1 + d(p1, p2), t3 = t2 + d(p2, p3);
    const k = Math.max(2, Math.ceil(Math.hypot(p2[0] - p1[0], p2[1] - p1[1]) / pas));
    for (let j = 0; j < k; j++) {
      const t = t1 + (t2 - t1) * j / k;
      const A1 = lin(p0, p1, t0, t1, t), A2 = lin(p1, p2, t1, t2, t), A3 = lin(p2, p3, t2, t3, t);
      out.push(lin(lin(A1, A2, t0, t2, t), lin(A2, A3, t1, t3, t), t1, t2, t));
    }
  }
  if (!ferme) out.push(pts[n - 1]);
  return out;
}
// deux demi-contours (côté x < 0, du haut de l'axe au bas) → un contour fermé ; le second est
// le demi-contour de l'autre côté, donné lui aussi pour x < 0 (il est retourné en miroir)
function deuxMoities(gauche, droite = gauche, pas = 3) {
  const g = courbe(gauche, false, pas), dr = courbe(droite, false, pas);
  return [...g, ...dr.slice(1, -1).reverse().map(([x, y]) => [-x, y])];
}
function superEllipse({ cx = 0, cy = 0, av, ar, w, n = 2.4, k = 72 }) {
  const out = [];
  for (let i = 0; i < k; i++) {
    const t = i / k * 2 * Math.PI, c = Math.cos(t), s = Math.sin(t);
    out.push([cx + (c >= 0 ? av : ar) * Math.sign(c) * Math.abs(c) ** (2 / n), cy + w * Math.sign(s) * Math.abs(s) ** (2 / n)]);
  }
  return out;
}
const d = (pts, ferme = true) => pts.map((p, i) => `${i ? 'L' : 'M'}${f1(p[0])} ${f1(p[1])}`).join(' ') + (ferme ? ' Z' : '');
const miroirX = pts => pts.map(([x, y]) => [-x, y]).reverse();
const miroirY = pts => pts.map(([x, y]) => [x, -y]).reverse();

// ─── les gabarits : ce qui fait chaque corps, en largeur ─────────────────────────────────────────
// x : demi-largeurs de face ; p : profondeurs vues d'en haut (avant / arrière de l'aplomb des
// hanches) ; dz : quelques hauteurs relatives (mm, rapportées à la stature) ; km : largeur des
// membres ; tete : largeur et longueur du crâne. Les hauteurs du squelette viennent du moteur
// (proportions.json) pour que face, dos et dessus tombent juste à côté d'un profil.
const GABARITS = {
  homme: {
    H: 1750,
    z: { cheville: 68, genou: 499, entrejambe: 845, hanche: 928, hanchesMax: 905, taille: 1095, aisselle: 1325,
      epaule: 1432, acromion: 1460, cou: 1481, pivot: 1565, menton: 1522, sommet: 1750 },
    x: { hanche: 90, hanches: 172, taille: 138, aisselle: 163, epaule: 175, acromion: 190, cou: 58 },
    tete: { larg: 155, long: 195, oreille: 13 },
    p: { poitrine: 122, dos: 112, taille: 104, tailleDos: 92, ventre: 100, fesses: 108, epauleAv: 62, epauleAr: 70 },
    l: { bras: 325, avantbras: 255, main: 189, pied: 266 },
    km: 1, kc: 1, pente: 0.3,
  },
  femme: {
    H: 1630,
    z: { cheville: 64, genou: 465, entrejambe: 785, hanche: 864, hanchesMax: 838, taille: 1025, aisselle: 1235,
      epaule: 1333, acromion: 1357, cou: 1379, pivot: 1456, menton: 1418, sommet: 1630 },
    x: { hanche: 86, hanches: 180, taille: 118, aisselle: 145, epaule: 158, acromion: 168, cou: 50 },
    tete: { larg: 148, long: 187, oreille: 12 },
    p: { poitrine: 112, dos: 100, taille: 92, tailleDos: 86, ventre: 96, fesses: 100, epauleAv: 55, epauleAr: 62 },
    l: { bras: 303, avantbras: 238, main: 176, pied: 248 },
    km: 0.88, kc: 0.86, pente: 0.42,
  },
  // l'enfant : une tête plus grosse, des épaules étroites, pas de taille, le ventre rond, des membres
  // plus pleins pour leur longueur
  enfant6: {
    H: 1150,
    z: { cheville: 42, genou: 307, entrejambe: 520, hanche: 570, hanchesMax: 556, taille: 690, aisselle: 845,
      epaule: 905, acromion: 920, cou: 942, pivot: 1000, menton: 966, sommet: 1150 },
    x: { hanche: 56, hanches: 108, taille: 104, aisselle: 107, epaule: 110, acromion: 118, cou: 38 },
    tete: { larg: 139, long: 175, oreille: 11 },
    p: { poitrine: 80, dos: 70, taille: 82, tailleDos: 64, ventre: 86, fesses: 68, epauleAv: 40, epauleAr: 46 },
    l: { bras: 211, avantbras: 165, main: 122, pied: 180 },
    km: 0.72, kc: 0.7, pente: 0.62,
  },
  enfant4: {
    H: 1030,
    z: { cheville: 37, genou: 270, entrejambe: 456, hanche: 502, hanchesMax: 490, taille: 612, aisselle: 748,
      epaule: 802, acromion: 816, cou: 835, pivot: 890, menton: 857, sommet: 1030 },
    x: { hanche: 52, hanches: 102, taille: 100, aisselle: 101, epaule: 103, acromion: 110, cou: 36 },
    tete: { larg: 139, long: 175, oreille: 11 },
    p: { poitrine: 76, dos: 66, taille: 80, tailleDos: 60, ventre: 86, fesses: 64, epauleAv: 38, epauleAr: 44 },
    l: { bras: 186, avantbras: 146, main: 108, pied: 157 },
    km: 0.68, kc: 0.66, pente: 0.66,
  },
};
const ALIAS = { adulte: 'homme', homme: 'homme', femme: 'femme', enfant: 'enfant6', enfant6: 'enfant6', enfant4: 'enfant4' };

// Recale les hauteurs d'un gabarit sur le squelette du moteur (Pr = moteur._interne.proportionsDe).
function recaler(g0, Pr) {
  if (!Pr || !Pr.taille) return g0;
  const g = JSON.parse(JSON.stringify(g0)), z = g.z, z0 = g0.z, s = Pr.taille / g0.H;
  z.cheville = Pr.cheville; z.genou = Pr.cheville + Pr.jambe; z.hanche = z.genou + Pr.cuisse;
  z.cou = z.hanche + Pr.tronc; z.epaule = z.hanche + Pr.epaule * Pr.tronc; z.pivot = z.cou + Pr.cou;
  z.sommet = Pr.taille; z.menton = z.pivot - 44 * Pr.tete;
  const rel = (k, a, b) => z[a] + (z0[k] - z0[a]) / (z0[b] - z0[a]) * (z[b] - z[a]);
  z.entrejambe = z.hanche - (z0.hanche - z0.entrejambe) * s;
  z.hanchesMax = z.hanche - (z0.hanche - z0.hanchesMax) * s;
  z.taille = rel('taille', 'hanche', 'epaule');
  z.aisselle = rel('aisselle', 'hanche', 'epaule');
  z.acromion = z.epaule + (z0.acromion - z0.epaule) * s;
  g.H = Pr.taille;
  g.l = { bras: Pr.bras, avantbras: Pr.avantbras, main: 190 * (Pr.main || 1), pied: 266 * (Pr.pied || 1) };
  return g;
}

// ─── les membres ─────────────────────────────────────────────────────────────────────────────────
// [t, extérieur, intérieur], demi-largeurs en mm (homme). Bras pendant, paume vers la cuisse.
const MEMBRES = {
  face: {
    bras: [[0, 41, 42], [0.13, 55, 41], [0.35, 47, 40], [0.65, 41, 38], [0.88, 38, 36], [1, 37, 35]],
    avantbras: [[0, 37, 35], [0.18, 40, 36], [0.45, 36, 32], [0.75, 30, 27], [1, 26, 24]],
    cuisse: [[0, 84, 72], [0.12, 82, 71], [0.4, 74, 63], [0.72, 64, 54], [0.92, 56, 50], [1, 54, 49]],
    jambe: [[0, 54, 49], [0.12, 52, 49], [0.3, 54, 54], [0.5, 48, 48], [0.75, 38, 37], [0.92, 33, 32], [1, 33, 32]],
    cou: [[0, 60, 60], [0.5, 56, 56], [1, 54, 54]],
  },
  dos: {
    bras: [[0, 41, 42], [0.13, 55, 41], [0.35, 47, 40], [0.65, 41, 38], [0.88, 38, 36], [1, 37, 35]],
    avantbras: [[0, 38, 36], [0.18, 40, 36], [0.45, 36, 32], [0.75, 30, 27], [1, 26, 24]],
    cuisse: [[0, 84, 72], [0.12, 82, 71], [0.4, 74, 63], [0.72, 64, 54], [0.92, 56, 50], [1, 54, 49]],
    jambe: [[0, 54, 49], [0.12, 53, 50], [0.3, 56, 56], [0.5, 49, 49], [0.75, 38, 37], [0.92, 33, 32], [1, 33, 32]],
    cou: [[0, 62, 62], [0.5, 57, 57], [1, 55, 55]],
  },
  // vu d'en haut, un membre à l'horizontale montre sa largeur de face ; vertical, il se réduit à son
  // bout (le bras pendant n'est plus que le rond de l'épaule)
  dessus: {
    bras: [[0, 50, 44], [0.12, 50, 42], [0.35, 46, 40], [0.65, 41, 38], [0.88, 38, 36], [1, 37, 35]],
    avantbras: [[0, 37, 35], [0.18, 40, 36], [0.45, 36, 33], [0.75, 31, 28], [1, 28, 26]],
    cuisse: [[0, 86, 74], [0.12, 84, 72], [0.4, 76, 64], [0.72, 65, 55], [0.92, 57, 51], [1, 55, 50]],
    jambe: [[0, 55, 50], [0.12, 53, 50], [0.3, 56, 55], [0.5, 49, 48], [0.75, 39, 37], [0.92, 34, 32], [1, 34, 32]],
    cou: [[0, 58, 58], [1, 54, 54]],
  },
};
const BOUTS = { bras: [0.35, 0.95], avantbras: [0.95, 0.9], cuisse: [0.9, 0.95], jambe: [0.95, 0.9], cou: [0.6, 0.6] };
// l'enfant : des membres plus pleins pour leur longueur, sans taille marquée (mollet, avant-bras)
function membresDe(g) {
  const out = {};
  for (const [vue, tab] of Object.entries(MEMBRES)) {
    out[vue] = {};
    for (const [nom, rangs] of Object.entries(tab)) {
      const k = nom === 'cou' ? g.kc : g.km;
      const plein = g.H < 1300 ? 0.35 : 0;          // rapproche les largeurs de leur moyenne
      const moy = rangs.reduce((s, r) => s + r[1] + r[2], 0) / (2 * rangs.length);
      out[vue][nom] = rangs.map(([t, a, b]) => [t, f1((a + (moy - a) * plein) * k), f1((b + (moy - b) * plein) * k)]);
    }
  }
  return out;
}

// ─── le tronc de face et de dos ──────────────────────────────────────────────────────────────────
// Du cou (caché dans le tube du cou) par le trapèze à l'acromion, l'épaule ronde (le bras pendant
// la recouvre bord à bord), l'aisselle, le flanc, la taille ; il descend sous la taille pour s'unir
// au bassin. Un bras levé efface l'épaule ronde (le bras la couvre) et monte un peu le trapèze.
function demiTronc(g, angleBras) {
  const Y = z => g.z.hanche - z;
  const x = g.x, z = g.z, H = g.H;
  const al = angleBras || 0;
  const yC = Y(z.cou + 0.018 * H), yA = Y(z.acromion), yE = Y(z.epaule), yS = Y(z.aisselle), yT = Y(z.taille);
  const w = lisseEtape(35, 100, al);                     // 0 : bras pendant ; 1 : bras levé
  const hausse = 0.014 * H * lisseEtape(40, 160, al);    // le trapèze monte avec le bras
  const bras = MEMBRES.face.bras, km = g.km;
  // l'épaule ronde : un quart d'ellipse du haut de l'épaule (un peu en dedans de l'acromion) au bord
  // du deltoïde, à l'aplomb du bord du bras pendant, qui s'y raccorde
  const xD = x.epaule + bras[1][1] * km + 1, x0 = x.acromion - 0.1 * (x.acromion - x.cou);
  const ea = xD - x0, eb = (yE - yA) + bras[1][0] * g.l.bras;
  const arc = th => [-(x0 + ea * Math.sin(th * RAD)), yA + eb * (1 - Math.cos(th * RAD))];
  // sous le bras pendant, le flanc s'écarte du bras dès l'aisselle (pas de double trait)
  const dz = z.epaule - z.aisselle, tA = Math.min(1, dz / g.l.bras);
  // sous le bras pendant, le flanc reste sous le bras : le bord intérieur du bras se voit en trait
  // fin depuis l'aisselle ; plus bas, le bras quitte la taille et la fenêtre s'ouvre
  const xS0 = Math.max(x.taille + 8, Math.min(x.aisselle - 2, x.epaule + dz * Math.sin(Math.max(0, Math.min(25, al)) * RAD) - pchip(bras, tA, 2) * km + 18));
  // sous le bras levé, le flanc monte dans le bord du bras
  const xL = x.epaule + bras[0][2] * km * 0.92;
  const L = (a, b) => a + (b - a) * w;
  const dxT = x.acromion - x.cou, dyT = (yA - hausse) - yC, p = g.pente;
  const xS = L(xS0, x.aisselle);
  return [
    [0, yC - 34], [-x.cou * 0.6, yC - 34], [-x.cou, yC - 28],
    [-x.cou - 4, yC - 5],
    // le trapèze : du cou au point de l'épaule où l'ellipse prend le relais (sa pente y est plus
    // forte que celle du trapèze : la ligne reste convexe, sans crochet)
    ...(() => { const E = arc(30), N = [-x.cou - 4, yC - 5], out = [];
      for (const f of [0.25, 0.55, 0.8]) out.push([N[0] + (E[0] - N[0]) * f, N[1] + (E[1] - hausse - N[1]) * f + 0.004 * H * p * Math.sin(f * Math.PI)]);
      return out; })(),
    ...[30, 55, 78, 98, 125].map(th => { const q = arc(th); return [L(q[0], -(x0 + (xL - x0) * th / 125)), L(q[1] - hausse * (1 - th / 125), yA - hausse + (yE - yA + hausse) * th / 125)]; }),
    [-L(xS + 0.55 * (xD - 8 - xS), xL - 4), L(yS - 0.42 * (yS - yE), yE + 0.3 * (yS - yE))],
    [-xS, yS],
    [-(xS - 0.1 * (xS - x.taille)), yS + 0.3 * (yT - yS)],
    [-(x.taille + 0.38 * (xS - x.taille)), yS + 0.64 * (yT - yS)],
    [-x.taille, yT],
    [-x.taille - 1, yT + 45], [-x.taille * 0.5, yT + 62], [0, yT + 62],
  ];
}
function troncFaceDe(g, aP = 0, aL = 0) { return deuxMoities(demiTronc(g, aP), demiTronc(g, aL)); }
// Le bassin : de la taille à l'entrejambe ; les cuisses recouvrent son bas ; l'entrejambe est un
// petit arc, pas une pointe.
function bassinFaceDe(g) {
  const Y = z => g.z.hanche - z;
  const x = g.x, z = g.z;
  const yT = Y(z.taille), yM = Y(z.hanchesMax), yJ = Y(z.entrejambe);
  const demi = [
    [0, yT - 50], [-x.taille * 0.6, yT - 50], [-x.taille + 1, yT - 40], [-x.taille, yT],
    [-(x.taille + 0.45 * (x.hanches - x.taille)), yT + 0.42 * (yM - yT)],
    [-(x.hanches - 2), yT + 0.8 * (yM - yT)], [-x.hanches, yM],
    [-(x.hanches - 6), yM + 0.5 * (yJ - yM)], [-(x.hanches - 30), yJ - 0.1 * (yJ - yM)],
    [-x.hanche * 0.9, yJ + 4], [-x.hanche * 0.4, yJ + 1], [-x.hanche * 0.12, yJ - 1], [0, yJ],
  ];
  return deuxMoities(demi);
}

// ─── la tête de face et de dos ───────────────────────────────────────────────────────────────────
// Un ovoïde un peu plus large aux tempes qu'à la mâchoire, le menton arrondi ; origine au pivot.
function teteFaceDe(g) {
  const hS = g.z.sommet - g.z.pivot, hM = g.z.pivot - g.z.menton, L = g.tete.larg / 2;
  const enfant = g.H < 1300, j = enfant ? 0.9 : 0.84;
  return deuxMoities([
    [0, -hS], [-L * 0.52, -hS * 0.97], [-L * 0.85, -hS * 0.86], [-L * 0.99, -hS * 0.68], [-L, -hS * 0.5],
    [-L * 0.97, -hS * 0.32], [-L * 0.93, -hS * 0.16], [-L * j, hM * (enfant ? 0.05 : -0.05)],
    [-L * (j - 0.18), hM * 0.52], [-L * 0.38, hM * 0.88], [-L * 0.14, hM * 1.0], [0, hM * 1.01],
  ], undefined, 2.5);
}
function oreillesFaceDe(g) {
  const hS = g.z.sommet - g.z.pivot, L = g.tete.larg / 2, o = g.tete.oreille;
  const yh = -hS * 0.47, yb = -hS * 0.16;
  const gauche = courbe([[-L + 6, yh + 2], [-L - o * 0.6, yh - 1], [-L - o, yh + (yb - yh) * 0.3], [-L - o * 0.75, yb - (yb - yh) * 0.25],
    [-L - o * 0.2, yb + 2], [-L + 6, yb]], true, 2);
  return [gauche, miroirX(gauche)];
}
// coupe le haut d'un contour de tête : bord = ses points au-dessus d'un seuil, dans l'ordre du
// contour ; ligne : de la tempe droite (x > 0) à la gauche, par le bas
function coupeHaut(bord, ligne) {
  const gauche = bord.filter(([x]) => x <= 0), droite = bord.filter(([x]) => x > 0);
  return [...droite, ...gauche, ...ligne.slice().reverse().slice(1, -1)];
}
// de face, une calotte : la ligne du front en arc, qui descend aux tempes. Une nuance seulement :
// elle dit « un front, donc un visage » sans en dessiner un.
function cheveuxFaceDe(g, tete) {
  const hS = g.z.sommet - g.z.pivot, L = g.tete.larg / 2;
  const front = -hS * 0.7, tempe = -hS * 0.48;
  const ligne = courbe([[L * 0.98, tempe], [L * 0.86, -hS * 0.62], [L * 0.45, front - 6], [0, front - 8],
    [-L * 0.45, front - 6], [-L * 0.86, -hS * 0.62], [-L * 0.98, tempe]], false, 2.5);
  return coupeHaut(tete.filter(([, y]) => y < tempe), ligne);
}
// de dos, la masse pleine jusqu'à la nuque : c'est elle qui dit « de dos »
function cheveuxDosDe(g, tete) {
  const hS = g.z.sommet - g.z.pivot, hM = g.z.pivot - g.z.menton, L = g.tete.larg / 2;
  const cote = -hS * 0.12, nuque = hM * 0.05;
  const ligne = courbe([[L * 0.93, cote], [L * 0.7, nuque - 4], [L * 0.3, nuque + 2], [0, nuque + 4],
    [-L * 0.3, nuque + 2], [-L * 0.7, nuque - 4], [-L * 0.93, cote]], false, 2.5);
  return coupeHaut(tete.filter(([, y]) => y < cote), ligne);
}

// ─── la vue de dessus ───────────────────────────────────────────────────────────────────────────
// Le tronc en tranches horizontales (super-ellipses) ; debout, le contour vu d'en haut est leur
// union ; penché, les tranches glissent vers l'avant et l'union montre le dos.
function sectionsDe(g) {
  const Z = z => z - g.z.hanche, x = g.x, p = g.p, z = g.z;
  const xD = x.epaule + MEMBRES.face.bras[1][1] * g.km;
  return [
    { z: Z(z.hanchesMax), w: x.hanches, av: p.ventre, ar: p.fesses, n: 2.3, bassin: true },
    { z: Z((z.hanchesMax + z.taille) / 2), w: (x.hanches + x.taille) / 2, av: (p.ventre + p.taille) / 2, ar: (p.fesses + p.tailleDos) / 2, n: 2.3, bassin: true },
    { z: Z(z.taille), w: x.taille, av: p.taille, ar: p.tailleDos, n: 2.3 },
    { z: Z((z.taille + z.aisselle) / 2), w: (x.taille + x.aisselle) / 2, av: (p.taille + p.poitrine) / 2, ar: (p.tailleDos + p.dos) / 2, n: 2.4 },
    { z: Z(z.aisselle), w: x.aisselle, av: p.poitrine, ar: p.dos, n: 2.9 },
    { z: Z((z.aisselle + z.epaule) / 2), w: (x.aisselle + x.epaule) / 2, av: p.poitrine * 0.92, ar: p.dos, n: 3.2 },
    // les épaules : l'enveloppe va jusqu'au bord du deltoïde ; l'avant et l'arrière restent presque
    // parallèles jusqu'au bout, qui s'arrondit (pas de citron) ; le bras pendant reste dedans
    { z: Z(z.epaule), w: x.epaule + 0.7 * (xD - x.epaule), av: p.poitrine * 0.8, ar: p.dos * 0.95, n: 4 },
    { z: Z(z.acromion), w: xD + 1, av: p.epauleAv * 1.15, ar: p.epauleAr * 1.12, n: 3.2 },
    { z: Z(z.cou + 0.02 * g.H), w: x.cou * 1.6, av: p.epauleAv * 0.75, ar: p.epauleAr * 0.95, n: 2.4 },
  ];
}
// L'union de super-ellipses centrées au même point : dans chaque direction, le plus grand rayon,
// adouci (log-somme-exp, tau en mm) : là où deux tranches se croisent, pas de coin rentrant.
function unionRadiale(formes, k = 180, tau = 4) {
  const out = [];
  for (let i = 0; i < k; i++) {
    const t = i / k * 2 * Math.PI, c = Math.cos(t), s = Math.sin(t);
    const R = formes.map(f => { const a = c >= 0 ? f.av : f.ar; return ((Math.abs(c) / a) ** f.n + (Math.abs(s) / f.w) ** f.n) ** (-1 / f.n); });
    const m = Math.max(...R), r = m + tau * Math.log(R.reduce((a, v) => a + Math.exp((v - m) / tau), 0));
    out.push([r * c, r * s]);
  }
  return out;
}
// penche : degrés vers l'avant ; rend des polygones à unir (debout, un seul : le contour exact)
// l'enveloppe convexe (Andrew), puis son rayon lissé autour du centre (gaussienne circulaire) : vu
// d'en haut, un tronc debout est presque convexe, de la poitrine au bout du deltoïde, sans pans
function enveloppeDouce(pts, sigma = 6, k = 240) {
  const P = pts.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const bas = [], haut = [];
  for (const p of P) { while (bas.length > 1 && cr(bas[bas.length - 2], bas[bas.length - 1], p) <= 0) bas.pop(); bas.push(p); }
  for (const p of P.slice().reverse()) { while (haut.length > 1 && cr(haut[haut.length - 2], haut[haut.length - 1], p) <= 0) haut.pop(); haut.push(p); }
  const H = bas.slice(0, -1).concat(haut.slice(0, -1));
  // le rayon de l'enveloppe dans chaque direction (depuis l'origine, qui est dedans)
  const R = [];
  for (let i = 0; i < k; i++) {
    const t = i / k * 2 * Math.PI, u = [Math.cos(t), Math.sin(t)];
    let r = 0;
    for (let j = 0; j < H.length; j++) {
      const a = H[j], b = H[(j + 1) % H.length], e = [b[0] - a[0], b[1] - a[1]];
      const den = u[0] * e[1] - u[1] * e[0];
      if (Math.abs(den) < 1e-9) continue;
      const tt = (a[0] * e[1] - a[1] * e[0]) / den, ss = (a[0] * u[1] - a[1] * u[0]) / den;
      if (tt > 0 && ss >= -1e-9 && ss <= 1 + 1e-9) r = Math.max(r, tt);
    }
    R.push(r);
  }
  const w = Math.ceil(3 * sigma * k / 360), G = [];
  for (let d = -w; d <= w; d++) G.push(Math.exp(-0.5 * (d * 360 / k / sigma) ** 2));
  const sG = G.reduce((a, v) => a + v, 0);
  return R.map((_, i) => {
    let r = 0; for (let d = -w; d <= w; d++) r += G[d + w] * R[(i + d + k) % k];
    r /= sG; const t = i / k * 2 * Math.PI; return [r * Math.cos(t), r * Math.sin(t)];
  });
}
function troncDessusDe(g, penche = 0) {
  const S = sectionsDe(g).filter(s => !s.bassin);
  if (Math.abs(penche) < 0.5) return [enveloppeDouce(unionRadiale(S))];
  const sp = Math.sin(penche * RAD), cp = Math.cos(penche * RAD), out = [];
  const zTot = S[S.length - 1].z - S[0].z;
  for (let i = 0; i < S.length - 1; i++) {
    const a = S[i], b = S[i + 1], m = Math.max(1, Math.round(24 * (b.z - a.z) / zTot));
    for (let j = 0; j <= m; j++) {
      const u = j / m, L = k => a[k] + (b[k] - a[k]) * u;
      // une tranche penchée : sa profondeur vue d'en haut est av·cos ; son épaisseur (la hauteur
      // de la tranche vue de biais) s'ajoute derrière quand le dos se voit
      out.push(superEllipse({ cx: L('z') * sp, av: Math.max(4, L('av') * cp), ar: Math.max(4, L('ar') * cp + 6 * sp), w: L('w'), n: L('n'), k: 64 }));
    }
  }
  return out;
}
const bassinDessusDe = g => unionRadiale(sectionsDe(g).filter(s => s.bassin));
// La tête vue d'en haut : un œuf, le bout étroit vers l'avant (le front) ; le nez pointe à peine,
// les oreilles en deux petites anses. Origine à l'aplomb du pivot ; le crâne un peu devant.
function teteDessusDe(g) {
  const L = g.tete.long, W = g.tete.larg, cx = L * 0.06, out = [];
  for (let i = 0; i < 120; i++) {
    const t = i / 120 * 2 * Math.PI, c = Math.cos(t), s = Math.sin(t);
    out.push([cx + L * 0.5 * c, (W / 2) * (1 - 0.1 * c) * s]);
  }
  return out;
}
function nezDessusDe(g) {
  const L = g.tete.long, cx = L * 0.06, av = L * 0.5;
  const b = L * (g.H < 1300 ? 0.05 : 0.075), l = g.tete.larg * 0.11;
  return courbe([[cx + av - 8, -l * 1.3], [cx + av + b * 0.6, -l * 0.7], [cx + av + b, 0], [cx + av + b * 0.6, l * 0.7], [cx + av - 8, l * 1.3], [cx + av - 14, 0]], true, 1.5);
}
function oreillesDessusDe(g) {
  const L = g.tete.long, W = g.tete.larg, cx = L * 0.06, o = g.tete.oreille;
  const x0 = cx - L * 0.06, l = L * 0.15, y0 = (W / 2) * 1.0 - 6;
  const droite = courbe([[x0 + l, y0], [x0 + l * 0.5, y0 + o * 0.9], [x0 - l * 0.4, y0 + o], [x0 - l, y0 + 2], [x0 - l * 0.2, y0 - 4]], true, 1.5);
  return [droite, miroirY(droite)];
}
// les cheveux d'en haut : tout le crâne derrière la ligne du front, un arc ouvert vers l'avant
function cheveuxDessusDe(g, tete) {
  const L = g.tete.long, W = g.tete.larg, cx = L * 0.06;
  const xm = cx + L * (g.H < 1300 ? 0.16 : 0.18), xt = cx - L * 0.04, yt = W * 0.49;
  const xh = y => xt + (xm - xt) * Math.max(0, 1 - (Math.abs(y) / yt) ** 2);
  const ligne = [];
  for (let i = 0; i <= 40; i++) { const y = yt - 2 * yt * i / 40; ligne.push([xh(y), y]); }
  return [...tete.filter(([x, y]) => x < xh(y) - 0.5), ...ligne.slice().reverse().slice(1, -1)];
}

// ─── le jeu de formes d'un corps ─────────────────────────────────────────────────────────────────
function construire(g) {
  const tF = teteFaceDe(g), tD = teteDessusDe(g);
  const Y = z => g.z.hanche - z;
  const af = { hanche: [-g.x.hanche, 0], epaule: [-g.x.epaule, Y(g.z.epaule)], cou: [0, Y(g.z.cou)], pivot: [0, Y(g.z.pivot)] };
  return {
    gabarit: g,
    segments: membresDe(g),
    bouts: BOUTS,
    tronc: { face: troncFaceDe(g), dos: troncFaceDe(g), dessus: troncDessusDe(g)[0] },
    bassin: { face: bassinFaceDe(g), dos: bassinFaceDe(g), dessus: bassinDessusDe(g) },
    tete: { face: tF, dos: tF, dessus: tD },
    nez: { dessus: nezDessusDe(g) },
    oreilles: { face: oreillesFaceDe(g), dos: oreillesFaceDe(g), dessus: oreillesDessusDe(g) },
    cheveux: { face: cheveuxFaceDe(g, tF), dos: cheveuxDosDe(g, tF), dessus: cheveuxDessusDe(g, tD) },
    ancres: { face: af, dos: af, dessus: { hanche: [0, g.x.hanche], epaule: [-g.p.epauleAr * 0.15, g.x.epaule], cou: [-g.p.epauleAr * 0.3, 0], pivot: [-g.p.epauleAr * 0.15, 0] } },
    sections: sectionsDe(g),
    longueurs: { ...g.l, cuisse: g.z.hanche - g.z.genou, jambe: g.z.genou - g.z.cheville, cou: g.z.pivot - g.z.cou, tronc: g.z.cou - g.z.hanche },
  };
}
const cache = {};
function pour(age = 'homme', Pr = null) {
  const cle = ALIAS[age] || age;
  if (!GABARITS[cle]) throw new Error(`vues : âge « ${age} » inconnu (connus : ${Object.keys(ALIAS).join(', ')})`);
  const id = cle + (Pr ? ':' + [Pr.taille, Pr.tronc, Pr.cuisse, Pr.jambe, Pr.cou, Pr.bras].map(v => f1(v || 0)).join(',') : '');
  return cache[id] || (cache[id] = construire(recaler(GABARITS[cle], Pr)));
}

// ─── les poses → un squelette 3D ─────────────────────────────────────────────────────────────────
// X vers l'avant du bassin, Y vers sa droite (côté P), Z vers le haut ; origine au milieu des
// hanches. Chaque os : un vecteur unitaire ; le squelette : les articulations en 3D.
const MEMBRES_NOMS = ['bras', 'avantbras', 'main', 'cuisse', 'jambe', 'pied'];
const sgn = c => (c === 'P' ? 1 : -1);
// une direction de profil (angle sagittal : 0 = vers le bas, + vers l'avant)
const sagittal = a => [Math.sin(a * RAD), 0, -Math.cos(a * RAD)];
// de face : angle dans le plan frontal (0 = bas, + extérieur), raccourci k (+ = vers l'avant)
function frontal(a, k, c) {
  const kk = k == null ? 1 : Math.max(-1, Math.min(1, k)), r = Math.abs(kk), avant = Math.sign(kk || 1) * Math.sqrt(Math.max(0, 1 - r * r));
  return [avant, sgn(c) * Math.sin(a * RAD) * r, -Math.cos(a * RAD) * r];
}
// de dessus : azimut (0 = avant, + extérieur), élévation (−90 = pendant)
function spherique(az, el, c) {
  return [Math.cos(el * RAD) * Math.cos(az * RAD), sgn(c) * Math.cos(el * RAD) * Math.sin(az * RAD), Math.sin(el * RAD)];
}
function lirePose(o, M) {
  // la pose : un objet, un id de poses.json (de la bonne vue d'abord), ou une pose du moteur
  let pd = typeof o.pose === 'object' && o.pose ? o.pose : null;
  const vue = o.vue;
  if (!pd) {
    const id = o.pose || 'debout';
    let liste = null;
    try {
      const fs = require('fs'), path = require('path'), f = path.join(__dirname, 'poses.json');
      if (fs.existsSync(f)) { const pj = JSON.parse(fs.readFileSync(f, 'utf8')); liste = Array.isArray(pj) ? pj : (pj.poses || Object.values(pj)); }
    } catch (e) { liste = null; }
    if (Array.isArray(liste)) pd = liste.find(q => q && q.id === id && q.vue === vue) || liste.find(q => q && q.id === id && (!q.vue || q.vue === 'profil')) || null;
    if (!pd && M && M.poses && M.poses[id]) pd = { ...M.poses[id], vue: 'profil' };
    if (!pd) pd = { vue: 'profil', angles: {} };
  }
  const A = Object.assign({}, pd.angles || {}, o.angles || {});
  const sorte = pd.vue && pd.vue !== 'profil' ? pd.vue : 'profil';
  const rac = Object.assign({}, pd.raccourcis || {}, o.raccourcis || {}, A.raccourcis || {});
  const elev = Object.assign({}, pd.elevations || {}, o.elevations || {});
  for (const T_ of [rac, elev]) for (const k of MEMBRES_NOMS) {
    if (T_[k] !== undefined) { if (T_[k + 'P'] === undefined) T_[k + 'P'] = T_[k]; if (T_[k + 'L'] === undefined) T_[k + 'L'] = T_[k]; }
  }
  for (const k of MEMBRES_NOMS) {
    if (A[k + 'P'] === undefined && A[k] !== undefined) A[k + 'P'] = A[k];
    if (A[k + 'L'] === undefined && A[k] !== undefined) A[k + 'L'] = A[k];
    if (A[k + 'P'] === undefined && A[k + 'L'] !== undefined) A[k + 'P'] = A[k + 'L'];
    if (A[k + 'L'] === undefined && A[k + 'P'] !== undefined) A[k + 'L'] = A[k + 'P'];
  }
  return { A, sorte, rac, elev, age: pd.age, appui: o.appui || pd.appui || 'pieds', mains: Object.assign({ P: 'ouverte', L: 'ouverte' }, pd.mains || {}, o.mains || {}), pieds: o.pieds || pd.pieds || 'botte', id: pd.id || o.pose };
}
function squelette3D(P, C) {
  const { A, sorte, rac } = P, g = C.gabarit, Lg = C.longueurs;
  const num = (v, d0 = 0) => (typeof v === 'number' ? v : d0);
  // le bassin et le tronc
  const azB = num(A.tourneBassin), azT = azB + num(A.tourneTronc), azH = azT + num(A.tourneTete);
  let penche, cote, neck = 0, nod = 0, coteCou = 0;
  if (sorte === 'profil' || sorte === 'dessus') { penche = num(A.tronc); neck = num(A.cou, 12) - penche; nod = num(A.tete) - num(A.cou, 12); cote = 0; }
  else { penche = num(A.penche); cote = num(A.tronc); coteCou = num(A.cou); nod = 0; neck = sorte === 'face' || sorte === 'dos' ? 10 : 0; }
  // le repère du tronc : penché vers l'avant (autour de Y), puis vers le côté (autour de X), puis tourné
  const RT = v => rotZ(rotX(rotY(v, penche), cote), azT);
  const RB = v => rotZ(v, azB);
  const B = [0, 0, 0];
  const anc = C.ancres.face;
  const hE = -anc.epaule[1], hC = -anc.cou[1];
  const J = { bassin: B };
  J.cou = RT([0, 0, hC]);
  const dCou = n3(rotZ(rotX(rotY([0, 0, 1], penche + neck), cote + coteCou), azT));
  J.pivot = a3(J.cou, m3(dCou, Lg.cou));
  J.teteRep = { penche: penche + neck + nod, cote: cote + coteCou + num(A.tete) * (sorte === 'face' || sorte === 'dos' ? 1 : 0), az: azH };
  const dir = {};
  for (const c of ['P', 'L']) {
    const s = sgn(c);
    J['epaule' + c] = RT([-g.p.epauleAr * 0.15 * 0, s * g.x.epaule, hE]);
    J['hanche' + c] = RB([0, s * g.x.hanche, 0]);
    for (const k of ['bras', 'avantbras', 'main', 'cuisse', 'jambe']) {
      const v = A[k + c];
      let u;
      if (Array.isArray(v) || (v && typeof v === 'object')) { const az = Array.isArray(v) ? v[0] : v.az, el = Array.isArray(v) ? v[1] : v.el; u = spherique(az, el, c); u = rotZ(u, ['cuisse', 'jambe'].includes(k) ? azB : azT); }
      else if (sorte === 'face' || sorte === 'dos') u = rotZ(frontal(num(v, k === 'main' ? num(A['avantbras' + c]) : 0), rac[k + c], c), ['cuisse', 'jambe'].includes(k) ? azB : azT);
      else if (sorte === 'dessus' && typeof v === 'number' && P.elev[k + c] != null) u = rotZ(spherique(v, P.elev[k + c], c), ['cuisse', 'jambe'].includes(k) ? azB : azT);
      else {
        // un angle de profil ; les bras s'écartent un peu, les genoux s'ouvrent quand la cuisse plie
        const a = num(v, k === 'main' ? num(A['avantbras' + c]) : 0);
        u = sagittal(a);
        if (k === 'bras' || k === 'avantbras' || k === 'main') u = rotX(u, s * (k === 'bras' ? 2 : 3) * Math.max(0, Math.cos(a * RAD)));
        u = rotZ(u, ['cuisse', 'jambe'].includes(k) ? azB : azT);
      }
      dir[k + c] = n3(u);
    }
    // les genoux qui s'ouvrent : toute la jambe tourne autour de la verticale de la hanche
    if (sorte === 'profil' || (sorte === 'dessus' && !Array.isArray(A['cuisse' + c]))) {
      const fl = Math.max(0, Math.sin(Math.min(150, Math.max(0, num(A['cuisse' + c]))) * RAD));
      const psi = s * (3 + 24 * fl * fl);
      dir['cuisse' + c] = rotZ(dir['cuisse' + c], psi); dir['jambe' + c] = rotZ(dir['jambe' + c], psi);
      dir['ouvre' + c] = psi;
    }
    J['coude' + c] = a3(J['epaule' + c], m3(dir['bras' + c], Lg.bras));
    J['poignet' + c] = a3(J['coude' + c], m3(dir['avantbras' + c], Lg.avantbras));
    J['genou' + c] = a3(J['hanche' + c], m3(dir['cuisse' + c], Lg.cuisse));
    J['cheville' + c] = a3(J['genou' + c], m3(dir['jambe' + c], Lg.jambe));
    // les pieds posés (dessus) : piedsAu { P: [x, y, az] } dans le repère de la figure
    const au = A.piedsAu && A.piedsAu[c];
    if (Array.isArray(au)) { J['cheville' + c] = [au[0], au[1], J['cheville' + c][2]]; J['genou' + c] = [(J['hanche' + c][0] + au[0]) / 2, (J['hanche' + c][1] + au[1]) / 2, J['genou' + c][2]]; }
    // un pas (dessus) : la cheville glisse au sol
    const pas = A['pas' + c];
    if (Array.isArray(pas)) { const dv = rotZ([pas[0], s * pas[1], 0], azB); J['cheville' + c] = a3(J['cheville' + c], dv); J['genou' + c] = a3(J['genou' + c], m3(dv, 0.5)); }
  }
  return { J, dir, azB, azT, azH, penche, cote };
}

// ─── extrémités : celles de l'agent 2 (extremites.js) si elles existent, sinon les provisoires ────
let EXT;
function extremites() {
  if (EXT !== undefined) return EXT;
  try { EXT = require('./extremites'); } catch (e) { EXT = null; }
  return EXT;
}
// provisoires, repère : main au poignet, +x vers les doigts ; pied à la cheville, jambe vers −y
const MAIN_PROV = {
  face: [[0, -24], [30, -29], [70, -29], [120, -26], [160, -18], [178, -6], [180, 4], [168, 16], [120, 26], [70, 28], [28, 26], [0, 23]],
  poing: [[0, -25], [30, -32], [64, -34], [86, -24], [92, 0], [84, 24], [60, 32], [28, 28], [0, 24]],
  dessus: [[0, -27], [34, -36], [84, -44], [130, -42], [166, -30], [182, -10], [180, 10], [164, 30], [120, 42], [72, 44], [30, 36], [0, 27]],
};
const PIED_PROV = {
  face: [[-44, -96], [-45, -40], [-50, 10], [-55, 40], [-56, 62], [-50, 72], [50, 72], [56, 62], [55, 40], [50, 10], [45, -40], [44, -96]],
  dos: [[-44, -96], [-45, -40], [-44, 10], [-45, 40], [-46, 62], [-41, 72], [41, 72], [46, 62], [45, 40], [44, 10], [45, -40], [44, -96]],
  dessus: [[-70, 0], [-64, 30], [-36, 41], [10, 43], [70, 50], [130, 54], [182, 46], [212, 24], [220, 0], [212, -22], [180, -42], [130, -50], [70, -44], [10, -40], [-36, -39], [-64, -29]],
};
function extremiteVue(M, sorte, type, vue, cote, opts = {}) {
  const E = extremites(), I = M._interne;
  if (E && typeof E[sorte] === 'function') {
    try {
      const r = E[sorte](type, vue, cote, opts);
      if (r && r.contour) {
        const polys = I.aplatir(r.contour).filter(q => q.length > 2);
        if (polys.length) return { contours: polys, details: (r.details || []).flatMap(dd => I.aplatir(dd).map(q => (q.ferme ? q.concat([q[0]]) : q))), prise: r.prise, attache: r.attache, ext: true };
      }
    } catch (e) { /* contrat pas encore tenu dans cette vue : les provisoires */ }
  }
  if (sorte === 'main') {
    const k = vue === 'dessus' ? 'dessus' : (type === 'prise' || type === 'poing' ? 'poing' : 'face');
    return { contours: [courbe(MAIN_PROV[k], true, 3)], details: [], prise: { x: k === 'poing' ? 50 : 110, y: 0, angle: 0 } };
  }
  return { contours: [courbe(PIED_PROV[vue] || PIED_PROV.face, true, 3)], details: [] };
}

// ─── le tube d'un os, dans le plan de la vue ─────────────────────────────────────────────────────
// p0, p1 : les articulations projetées ; n : la normale extérieure ; r : raccourci (1 à plat dans
// la vue, 0 vu en bout : le tube devient le rond de son bout)
function tube(p0, p1, table, n, bouts = [0.9, 0.9], r = 1, dirSecours = [0, 1]) {
  const dv = sub(p1, p0), L = lon(dv), dd = L > 0.5 ? uni(dv) : uni(dirSecours);
  if (!n) n = [-dd[1], dd[0]];
  const k0 = bouts[0] + (1 - bouts[0]) * (1 - r), k1 = bouts[1] + (1 - bouts[1]) * (1 - r);
  const N = Math.max(4, Math.ceil(L / 3)), P = t => add(p0, mul(dv, t));
  const wE = t => pchip(table, t, 1), wI = t => pchip(table, t, 2);
  const pos = [], neg = [];
  for (let i = 0; i <= N; i++) { const t = i / N; pos.push(add(P(t), mul(n, wE(t)))); neg.push(sub(P(t), mul(n, wI(t)))); }
  const cap = (t, k, a0, a1) => {
    const e = wE(t), w = wI(t), C = add(P(t), mul(n, (e - w) / 2)), a = (e + w) / 2, b = k * a, out = [];
    for (let j = 1; j < 18; j++) { const ph = a0 + (a1 - a0) * j / 18; out.push(add(C, add(mul(n, a * Math.cos(ph)), mul(dd, b * Math.sin(ph))))); }
    return out;
  };
  return [...pos, ...cap(1, k1, 0, Math.PI), ...neg.reverse(), ...cap(0, k0, Math.PI, 2 * Math.PI)];
}

// ─── le rendu ────────────────────────────────────────────────────────────────────────────────────
function corps(o = {}, M) {
  if (!M) M = require('./moteur');
  const I = M._interne;
  const vue = o.vue || 'face';
  if (!['face', 'dos', 'dessus'].includes(vue)) throw new Error(`vues.corps : vue « ${vue} » (face, dos, dessus)`);
  const age = o.age || 'adulte';
  let Pr = null; try { Pr = I.proportionsDe(age); } catch (e) { Pr = null; }
  const C = pour(age, Pr), g = C.gabarit, Lg = C.longueurs;
  const P = lirePose(o, M);
  if (!o.age && P.age) return corps({ ...o, age: P.age }, M);
  // couché, vu d'en haut : c'est la vue de face (sur le dos) ou de dos (sur le ventre) de la même
  // pose redressée, tournée d'un quart de tour, la tête vers où le tronc s'est couché
  if (vue === 'dessus' && P.sorte !== 'face' && P.sorte !== 'dos' && Math.abs(+P.A.tronc || 0) >= 60 && !o._couche) {
    const ph = +P.A.tronc, A2 = {};
    for (const [k, v] of Object.entries(P.A)) A2[k] = (typeof v === 'number' && /^(bras|avantbras|main|cuisse|jambe|pied)[PL]$/.test(k)) ? v + ph : v;
    A2.tronc = 0; A2.cou = (+P.A.cou || 0) + ph; A2.tete = (+P.A.tete || 0) + ph;
    return corps({ ...o, vue: ph < 0 ? 'face' : 'dos', pose: { vue: 'profil', id: P.id, angles: A2, mains: P.mains, pieds: P.pieds }, angles: {}, _couche: { dos: ph < 0, az: +P.A.tourneBassin || 0 } }, M);
  }
  const S = squelette3D(P, C), J = S.J;
  const SEG = C.segments[vue];
  // la projection : écran (mm, y vers le bas) et profondeur (+ vers l'œil)
  const proj = vue === 'face' ? p => [-p[1], -p[2]] : vue === 'dos' ? p => [p[1], -p[2]] : p => [p[0], p[1]];
  const prof = vue === 'face' ? p => p[0] : vue === 'dos' ? p => -p[0] : p => p[2];
  const pieces = [];
  const pc = (id, poly, z, extra = {}) => pieces.push({ id, poly, z, ...extra });
  const planaire = vue !== 'dessus';
  // ─ le tronc, le bassin, le cou, la tête
  if (planaire) {
    const kT = Math.cos(S.penche * RAD);
    const aBras = c => {                   // l'angle du bras par rapport au tronc, dans le plan de la vue
      const v = sub(proj(J['coude' + c]), proj(J['epaule' + c]));
      const tU = uni(sub(proj(J.cou), proj(J.bassin))), bas_ = mul(tU, -1);
      const gaucheE = (vue === 'face') === (c === 'P');
      const dehors = gaucheE ? [-bas_[1], bas_[0]] : [bas_[1], -bas_[0]];
      return Math.atan2(dot(v, dehors), dot(v, bas_)) / RAD;
    };
    const gaucheEcran = vue === 'face' ? 'P' : 'L';
    const tr = deuxMoities(demiTronc(g, aBras(gaucheEcran)), demiTronc(g, aBras(gaucheEcran === 'P' ? 'L' : 'P')));
    const Rt = q => { const v = rotZ(rotX(rotY([0, (vue === 'face' ? -1 : 1) * q[0], -q[1]], S.penche), S.cote), S.azT); return proj(v); };
    void kT;
    pc('tronc', tr.map(Rt), 0.01);
    const Rb = q => proj(rotZ([0, (vue === 'face' ? -1 : 1) * q[0], -q[1]], S.azB));
    pc('bassin', bassinFaceDe(g).map(Rb), 0, { voisins: [{ id: 'tronc', joint: Rb([0, -150]), R: 9999 }] });
    const c0 = proj(J.cou), c1 = proj(J.pivot), dC = sub(c1, c0);
    pc('cou', tube(c0, c1, SEG.cou, [-uni(dC)[1], uni(dC)[0]], BOUTS.cou, Math.max(0.2, lon(dC) / Lg.cou), [0, -1]), -1,
      { voisins: [{ id: 'tronc', joint: c0, R: 9999 }] });
    // la tête : tournée dans le plan de la vue ; penchée en avant, elle descend et passe devant
    const tr3 = J.teteRep;
    const Rh = q => {
      const v = rotZ(rotX(rotY([0, (vue === 'face' ? -1 : 1) * q[0], -q[1]], tr3.penche), tr3.cote), tr3.az);
      return add(proj(J.pivot), proj(v));
    };
    const zTete = prof(a3(J.pivot, rotY([60, 0, 80], tr3.penche))) + 40;
    const teteP = C.tete[vue].map(Rh);
    const ore = o.oreilles === false ? [] : C.oreilles[vue].map(r => r.map(Rh));
    const chev = o.cheveux === false ? null : C.cheveux[vue].map(Rh);
    pc('tete', teteP, zTete, { fusion: ore, cheveux: chev, voisins: [{ id: 'cou', joint: c1, R: vue === 'face' ? 0 : 9999 }, { id: 'tronc', joint: c0, R: vue === 'face' ? 0 : 9999 }] });
  } else {
    const sp = Math.sin(S.penche * RAD);
    const Rt = q => rot(q, S.azT), Rb = q => rot(q, S.azB);
    const zT = J.cou[2];
    pc('bassin', bassinDessusDe(g).map(Rb), 0, { cache: o.caches === true || o.caches === 'bassin' || (Array.isArray(o.caches) && o.caches.includes('bassin')), groupe: 'bassin' });
    pc('tronc', null, zT, { morceaux: troncDessusDe(g, S.penche).map(r => r.map(Rt)) });
    // la tête, à l'aplomb du pivot, tournée ; penchée, elle avance
    const piv = proj(J.pivot);
    const Rh = q => add(piv, rot([q[0] * Math.cos(Math.max(0, J.teteRep.penche - 20) * RAD * 0.5), q[1]], S.azH));
    const tt = C.tete.dessus.map(Rh);
    pc('tete', tt, J.pivot[2] + 300, {
      fusion: [C.nez.dessus.map(Rh), ...(o.oreilles === false ? [] : C.oreilles.dessus.map(r => r.map(Rh)))],
      cheveux: o.cheveux === false ? null : C.cheveux.dessus.map(Rh), groupe: 'tete',
    });
    void sp;
  }
  // ─ les membres
  const nExt = (c, dd, p0) => {
    if (vue === 'dessus') {
      // perpendiculaire à l'os, du côté opposé à l'axe du corps
      let n = [-dd[1], dd[0]]; const vers = sub(p0, proj([0, 0, 0]));
      const lat = rot([0, sgn(c)], S.azT);
      if (dot(n, lat) < 0) n = mul(n, -1);
      void vers;
      return n;
    }
    const ecranGauche = (vue === 'face') === (c === 'P');
    return ecranGauche ? [-dd[1], dd[0]] : [dd[1], -dd[0]];
  };
  const os = (id, a, b, table, bouts, L, z, extra = {}) => {
    const p0 = proj(a), p1 = proj(b), dv = sub(p1, p0), r = Math.min(1, lon(dv) / L);
    const dSec = vue === 'dessus' ? rot([1, 0], S.azT) : [0, 1];
    const dd = lon(dv) > 0.5 ? uni(dv) : dSec;
    pc(id, tube(p0, p1, table, nExt(id.slice(-1), dd, p0), bouts, r, dSec), z, { p0, p1, r, ...extra });
  };
  const zDe = (a, b) => (prof(a) + prof(b)) / 2;
  const biais = planaire ? 60 : 0;          // un membre de face passe devant le tronc à profondeur égale
  const geo = { mains: {}, pieds: {} };
  for (const c of ['P', 'L']) {
    const E = J['epaule' + c], El = J['coude' + c], W = J['poignet' + c], H = J['hanche' + c], K = J['genou' + c], A_ = J['cheville' + c];
    // les jambes
    const visJ = planaire || Math.hypot(...sub(proj(K), proj(A_))) > 0.3 * Lg.jambe;
    const visC = planaire || Math.hypot(...sub(proj(H), proj(K))) > 0.3 * Lg.cuisse;
    const grJ = planaire ? 'corps' : 'jambes';
    if (visC) os('cuisse' + c, H, K, SEG.cuisse, BOUTS.cuisse, Lg.cuisse, zDe(H, K) + biais, { groupe: grJ, voisins: [{ id: 'bassin', joint: proj(H), R: 1.35 * SEG.cuisse[0][1] }], cache: o.caches === true });
    if (visJ) os('jambe' + c, K, A_, SEG.jambe, BOUTS.jambe, Lg.jambe, zDe(K, A_) + biais + (planaire ? 1 : 0), { groupe: grJ, voisins: [{ id: 'cuisse' + c, joint: proj(K), R: 1.4 * SEG.jambe[0][1] }], cache: o.caches === true });
    // le bras
    const pend = !planaire && S.dir['bras' + c][2] < -0.85;
    // d'en haut, un bras qui pend presque droit reste dans l'enveloppe des épaules : on ne le
    // dessine pas (son rond déborderait en bosse)
    const brasCache = !planaire && S.dir['bras' + c][2] < -0.98;
    if (!brasCache) os('bras' + c, E, El, SEG.bras, BOUTS.bras, Lg.bras, planaire ? zDe(E, El) + biais : (pend ? J.cou[2] - 1 : zDe(E, El)), { groupe: 'corps', voisins: [{ id: 'tronc', joint: proj(E), R: planaire ? (g.z.epaule - g.z.aisselle) * 1.02 : (pend ? 1.7 : 0.7) * SEG.bras[0][1] }] });
    const avCache = !planaire && pend && (S.dir['avantbras' + c][2] < -0.85 || brasCache && S.dir['avantbras' + c][2] < -0.6);      // sous l'épaule, d'en haut
    if (!avCache) os('avantbras' + c, El, W, SEG.avantbras, BOUTS.avantbras, Lg.avantbras, planaire ? zDe(El, W) + biais : zDe(El, W) - (pend ? 2000 : 0), { groupe: 'corps', voisins: [{ id: 'bras' + c, joint: proj(El), R: 1.5 * SEG.avantbras[0][1] }] });
    // la main : la forme d'extrémité, le long de la direction de la main, raccourcie
    const dM = S.dir['main' + c], tm = (P.mains && P.mains[c]) || 'ouverte';
    const mainCachee = !planaire && pend && S.dir['avantbras' + c][2] < -0.85 && S.dir['main' + c][2] < -0.8;
    const km = Lg.main / 190;
    const em = extremiteVue(M, 'main', tm, vue, c, { poignet: (SEG.avantbras[SEG.avantbras.length - 1][1] + SEG.avantbras[SEG.avantbras.length - 1][2]) / km });
    const p0 = proj(W), dm2 = proj(a3(W, dM)), v2 = sub(dm2, p0), rM = Math.max(0.32, Math.min(1, lon(v2)));
    const angM = lon(v2) > 1e-3 ? Math.atan2(v2[1], v2[0]) / RAD : Math.atan2(...(() => { const q = sub(proj(W), proj(El)); return [q[1], q[0]]; })()) / RAD;
    const ecranGauche = (vue === 'face') === (c === 'P');
    // les mains de extremites.js portent déjà leur côté (le pouce) : pas de miroir
    const miroirM = em.ext ? false : (vue === 'dessus' ? c === 'L' : !ecranGauche);
    const TM = q => add(p0, rot([q[0] * km * rM, q[1] * km * (miroirM ? -1 : 1)], angM));
    const zM = planaire ? prof(W) + biais + 2 : (pend ? zDe(El, W) - 2000 : prof(W) + 1);
    if (!mainCachee) pc('main' + c, em.contours.map(q => q.map(TM))[0], zM, { fusion: em.contours.slice(1).map(q => q.map(TM)), details: em.details.map(q => q.map(TM)), groupe: 'corps', voisins: [{ id: 'avantbras' + c, joint: p0, R: 42 * km }] });
    geo.mains[c] = { poignet: p0, prise: em.prise ? TM([em.prise.x, em.prise.y]) : p0, angle: angM + (em.prise && em.prise.angle ? (miroirM ? -1 : 1) * em.prise.angle : 0), axe: angM, type: tm };
    // le pied
    const tp = (typeof P.pieds === 'string' ? P.pieds : (P.pieds && P.pieds[c])) || 'botte';
    const kp = Lg.pied / 266;
    const ef = extremiteVue(M, 'pied', tp, vue, c, { cheville: (SEG.jambe[SEG.jambe.length - 1][1] + SEG.jambe[SEG.jambe.length - 1][2]) / kp });
    const pa = proj(A_);
    let TP;
    if (planaire) {
      // de face, la botte reste debout sous la cheville ; elle suit la jambe quand celle-ci penche
      const dj = sub(proj(A_), proj(K)), aj = lon(dj) > 1 ? Math.atan2(dj[0], dj[1]) / RAD : 0;
      const ap = Math.max(-25, Math.min(25, -aj * 0.3));
      const mir = ef.ext ? false : !ecranGauche;
      TP = q => add(pa, rot([q[0] * kp * (mir ? -1 : 1), q[1] * kp], ap));
    } else {
      // l'azimut du pied : piedsAu (absolu), tournePied (sur le bassin), un nombre en pose de dessus
      // (absolu, 0 = droit devant, + vers l'extérieur), sinon l'ouverture naturelle
      const au = P.A.piedsAu && P.A.piedsAu[c];
      const azP = Array.isArray(au) && au.length > 2 ? au[2]
        : typeof P.A['tournePied' + c] === 'number' ? S.azB + sgn(c) * P.A['tournePied' + c]
        : (P.sorte === 'dessus' && typeof P.A['pied' + c] === 'number') ? sgn(c) * (P.A['pied' + c] + 7)
        : S.azB + (S.dir['ouvre' + c] || 0) + sgn(c) * 7;
      const dJ = S.dir['jambe' + c];
      const arriere = dJ[0] < -0.6 || (P.sorte !== 'dessus' && typeof P.A['pied' + c] === 'number' && P.A['pied' + c] < 0);   // à genoux : pointe en arrière
      TP = q => add(pa, rot([q[0] * kp, q[1] * kp * (ef.ext ? 1 : sgn(c))], azP + (arriere ? 180 : 0)));
    }
    pc('pied' + c, ef.contours.map(q => q.map(TP))[0], planaire ? prof(A_) + biais + 3 : A_[2] - 60,
      { fusion: ef.contours.slice(1).map(q => q.map(TP)), details: ef.details.map(q => q.map(TP)), groupe: planaire ? 'corps' : 'pied' + c, voisins: [{ id: 'jambe' + c, joint: pa, R: 9999 }], cache: !planaire && (o.caches === true || o.caches === 'pieds' || (Array.isArray(o.caches) && o.caches.includes('pieds'))) });
    geo.pieds[c] = { cheville: pa };
  }
  return peindre(o, M, C, P, S, J, pieces, geo, proj, vue);
}

function peindre(o, M, C, P, S, J, pieces, geo, proj, vue) {
  const I = M._interne, SC = I.SC, planaire = vue !== 'dessus';
  const cl = poly => I.union([poly]);
  // chaque pièce en Clipper (les fusions : nez, oreilles, morceaux de main)
  for (const p of pieces) {
    const polys = p.morceaux || [p.poly, ...(p.fusion || [])];
    p.CL = I.union(polys.filter(q => q && q.length > 2));
    p.groupe = p.groupe || (planaire ? 'corps' : 'corps');
  }
  // le placement
  let yMax = -Infinity, xMin = Infinity, xMax = -Infinity, yMin = Infinity;
  for (const p of pieces) for (const P_ of p.CL) for (const q of P_) { const x = q.X / SC, y = q.Y / SC; yMax = Math.max(yMax, y); yMin = Math.min(yMin, y); xMin = Math.min(xMin, x); xMax = Math.max(xMax, x); }
  const s = o.echelle || 0.2, m = o.cote === 'gauche' ? -1 : 1, X = o.x || 0, Y = o.y || 0;
  let T, x0 = 0, y0 = 0;
  if (planaire && o._couche) {
    // couché vu de dessus : le bassin au point (x, y) ; sur le dos (vue de face) la tête vers −x et
    // sa droite vers +y ; sur le ventre (vue de dos) la tête vers +x
    const B0 = proj(J.bassin), ang = (o.angle || 0) + o._couche.az;
    const quart = o._couche.dos ? q => [q[1], -q[0]] : q => [-q[1], q[0]];
    T = q => { const v = rot(quart([q[0] - B0[0], q[1] - B0[1]]), ang); return [X + s * m * v[0], Y + s * v[1]]; };
  } else if (planaire) {
    const appui = P.appui;
    const pP = geo.pieds.P.cheville, pL = geo.pieds.L.cheville;
    x0 = appui === 'pieds' ? (pP[0] + pL[0]) / 2 : proj(J.bassin)[0];
    y0 = yMax;
    const ang0 = o.angle || 0;
    T = ang0 ? q => { const v = rot([m * s * (q[0] - x0), s * (q[1] - y0)], ang0); return [X + v[0], Y + v[1]]; } : q => [X + m * s * (q[0] - x0), Y + s * (q[1] - y0)];
  } else {
    const ang = o.angle || 0;
    T = q => { const v = rot([q[0] * m, q[1]], ang); return [X + s * v[0], Y + s * v[1]]; };
  }
  const tr = o.trait === 'fort' ? { sil: 1.9, int: 1.0, det: 0.7 } : (typeof o.trait === 'number' ? { sil: o.trait, int: o.trait * 0.47, det: o.trait * 0.4 } : { sil: 1.5, int: 0.7, det: 0.6 });
  const tol = 0.06 / s, E = 1.0;
  const lg = l => { let t = 0; for (let i = 1; i < l.length; i++) t += lon(sub(l[i], l[i - 1])); return t; };
  const dFerme = paths => paths.map(Pp => { const q = I.allege(I.deCL(Pp), tol, true).map(T); return 'M' + q.map(p => `${f2(p[0])} ${f2(p[1])}`).join(' L') + ' Z'; }).join(' ');
  const dOuvert = (ls, min = 14) => ls.filter(l => lg(l) > min).map(l => { const q = I.allege(l, tol).map(T); return 'M' + q.map(p => `${f2(p[0])} ${f2(p[1])}`).join(' L'); }).join(' ');
  const plein = (paths, coul) => paths.length ? `<path d="${dFerme(paths)}" fill="${coul}" fill-rule="nonzero" stroke="none"/>` : '';
  const contour = (paths, ep, extra = '') => paths.length ? `<path d="${dFerme(paths)}" fill="none" stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round"${extra}/>` : '';
  const ligne = (ls, ep, extra = '', min) => { const dd = dOuvert(ls, min); return dd ? `<path d="${dd}" fill="none" stroke="${NOIR}" stroke-width="${ep}" stroke-linecap="round" stroke-linejoin="round"${extra}/>` : ''; };
  const disque = (c, r) => [I.versCL(Array.from({ length: 40 }, (_, k) => add(c, [r * Math.cos(k / 40 * 2 * Math.PI), r * Math.sin(k / 40 * 2 * Math.PI)])))];

  // les groupes, du plus bas (loin) au plus haut (près de l'œil)
  const G = {};
  for (const p of pieces) (G[p.groupe] = G[p.groupe] || { id: p.groupe, pieces: [] }).pieces.push(p);
  const CLmod = require('./clipper');
  for (const gr of Object.values(G)) {
    gr.z = Math.max(...gr.pieces.map(p => p.z));
    gr.CL = I.ferme(I.unionCL(gr.pieces.map(p => p.CL)), gr.id === 'tete' ? 2 : planaire ? 9 : 6);
    // un trou trop étroit pour être une fenêtre (le jour entre le bras et le flanc) se bouche ; son
    // bord reste, en trait intérieur
    gr.fentes = [];
    const garde = [];
    for (const P_ of gr.CL) {
      if (CLmod.Clipper.Orientation(P_)) { garde.push(P_); continue; }
      const plein_ = I.union([I.deCL(P_)]);
      if (!I.ouvre(plein_, 7).length) gr.fentes.push(I.deCL(P_).concat([I.deCL(P_)[0]]));
      else garde.push(P_);
    }
    gr.CL = garde;
  }
  const ordre = Object.values(G).sort((a, b) => a.z - b.z);
  // le fantôme : la silhouette seule, en tireté, sans fond (une position d'avant) ; 'pieds' : les
  // pieds seulement
  if (o.fantome) {
    const pris = o.fantome === 'pieds' ? pieces.filter(p => p.id.startsWith('pied')) : null;
    const CLs = pris ? pris.map(p => p.CL) : ordre.map(gr => gr.CL);
    const svgF = `<g data-corps="${P.id || 'pose'}" data-vue="${vue}" data-fantome="1">\n` + CLs.map(c => contour(c, tr.int, ' stroke-dasharray="3 2.2"')).join('\n') + '\n</g>';
    return Object.assign({ svg: svgF, toString() { return svgF; } }, geoVueF());
  }
  // l'objet tenu : objetP devant le tronc et derrière les bras ; objetL derrière tout
  const quoi = v => (typeof v === 'function' ? v(geoVue()) : (v || ''));
  const out = [`<g data-corps="${P.id || 'pose'}" data-vue="${vue}">`];
  if (o.objetL) out.push(quoi(o.objetL));
  const tirets = [];
  for (const gr of ordre) {
    const plus = ordre.filter(h => h.z > gr.z);
    if (!planaire && plus.length && (gr.id === 'bassin' || gr.id === 'jambes')) {
      // ce qui ne dépasse qu'en mince filet de ce qui est au-dessus ne se dessine pas (un double trait)
      const dessus_ = I.unionCL(plus.map(h => h.CL));
      const vis = I.ouvre(I.moins(gr.CL, dessus_), 9);
      gr.CL = vis.length ? I.inter(gr.CL, I.unionCL([I.decale(vis, 4), I.decale(dessus_, -2)])) : [];
      if (!gr.CL.length) { for (const p of gr.pieces) if (p.cache) tirets.push(...I.bordsDans(p.CL, I.decale(dessus_, -E))); continue; }
    }
    out.push(plein(gr.CL, BLANC));
    // les cheveux, gris, dans la tête (moins ce qui passe devant la tête)
    for (const p of gr.pieces) if (p.cheveux) {
      const devant = gr.pieces.filter(q => q.z > p.z);
      let ch = I.inter(cl(p.cheveux), p.CL);
      if (devant.length) ch = I.moins(ch, I.unionCL(devant.map(q => q.CL)));
      out.push(plein(ch, GRIS));
    }
    // les contours intérieurs : le bord d'une pièce qui tombe sur une pièce de derrière, hors des
    // joints avec ses voisines et hors de ce qui passe devant elle
    const lignes = [];
    for (const p of gr.pieces) {
      const derriere = gr.pieces.filter(q => q !== p && q.z < p.z);
      if (!derriere.length) continue;
      const devant = gr.pieces.filter(q => q !== p && q.z > p.z);
      const zones = [];
      let region = [];
      for (const q of derriere) {
        const v = (p.voisins || []).find(w => w.id === q.id) || (q.voisins || []).find(w => w.id === p.id);
        let rq = q.CL;
        if (v && v.R > 0) rq = I.moins(rq, disque(v.joint, Math.min(v.R, 4000)));
        region = I.unionCL([region, rq]);
        void zones;
      }
      if (devant.length) region = I.moins(region, I.unionCL(devant.map(q => q.CL)));
      lignes.push(...I.bordsDans(p.CL, I.decale(region, -E)));
    }
    out.push(ligne(lignes, tr.int), ligne(gr.fentes, tr.int, '', 4));
    for (const p of gr.pieces) if (p.details && p.details.length) out.push(ligne(p.details, tr.det, '', 4));
    out.push(contour(gr.CL, tr.sil));
    if (gr.id === 'corps' && o.objetP && !planaire) { /* dessus : l'objet après le corps */ }
    // ce que les groupes plus hauts cachent : en tireté
    if (plus.length) for (const p of gr.pieces) if (p.cache) tirets.push(...I.bordsDans(p.CL, I.decale(I.unionCL(plus.map(h => h.CL)), -E)));
  }
  if (tirets.length) out.push(ligne(tirets, tr.int, ' stroke-dasharray="3 2.2"', 6));
  // l'objet proche : peint par-dessus tout ce qui est derrière lui, puis les bras (et la tête de
  // dessus) repassent devant, avec leur bord
  if (o.objetP) {
    const devantIds = planaire ? ['bras', 'avantbras', 'main'] : ['bras', 'avantbras', 'main', 'tete', 'nez'];
    const devant = pieces.filter(p => devantIds.some(k => p.id.startsWith(k)));
    out.push(quoi(o.objetP));
    if (devant.length) {
      const D = I.ferme(I.unionCL(devant.map(p => p.CL)), 4);
      out.push(plein(D, BLANC));
      for (const p of devant) if (p.cheveux) out.push(plein(I.inter(cl(p.cheveux), p.CL), GRIS));
      const tout = G.corps ? G.corps.CL : D;
      // le bord des bras : à 1,5 hors du corps, à 0,7 sur le corps
      const corpsSans = I.unionCL(pieces.filter(p => !devant.includes(p) && p.groupe === 'corps').map(p => p.CL));
      out.push(ligne(I.bordsDans(D, I.moins(I.decale(I.unionCL([D, tout]), 4), I.decale(corpsSans, -E))), tr.sil));
      out.push(ligne(I.bordsDans(D, I.decale(corpsSans, -E)), tr.int));
      for (const p of devant) if (p.details && p.details.length) out.push(ligne(p.details, tr.det, '', 4));
    }
  }
  out.push('</g>');
  const svg = out.filter(Boolean).join('\n');
  function geoVue() {
    const gg = {};
    const art = {};
    for (const k of Object.keys(J)) if (Array.isArray(J[k])) art[k] = T(proj(J[k]));
    gg.articulations = art;
    gg.poignetP = T(geo.mains.P.poignet); gg.poignetL = T(geo.mains.L.poignet);
    for (const c of ['P', 'L']) {
      const mi = geo.mains[c], pr = T(mi.prise);
      const a = planaire ? (m > 0 ? mi.angle : 180 - mi.angle) : mi.angle * m + (o.angle || 0);
      gg['main' + c] = { x: pr[0], y: pr[1], angle: a, axe: planaire ? (m > 0 ? mi.axe : 180 - mi.axe) : mi.axe * m + (o.angle || 0), type: mi.type };
      gg.pieds = gg.pieds || {};
      gg.pieds[c] = { cheville: T(geo.pieds[c].cheville) };
    }
    const tc = T(proj(J.pivot));
    gg.tete = { x: tc[0], y: tc[1], haut: T(proj(a3(J.pivot, [0, 0, g().z.sommet - g().z.pivot]))), angle: 0 };
    const b0 = T([xMin, yMin]), b1 = T([xMax, yMax]);
    gg.boite = { x0: Math.min(b0[0], b1[0]), y0: Math.min(b0[1], b1[1]), x1: Math.max(b0[0], b1[0]), y1: Math.max(b0[1], b1[1]) };
    gg.sol = planaire && !o._couche ? Y : null;
    gg.echelle = s; gg.miroir = m < 0; gg.vue = vue;
    gg.versVue = q => T(proj(q));          // un point du squelette 3D (mm) → la vue
    return gg;
  }
  function g() { return C.gabarit; }
  function geoVueF() { return geoVue(); }
  return Object.assign({ svg, toString() { return svg; } }, geoVue());
}

// ─── exports ─────────────────────────────────────────────────────────────────────────────────────
const base = pour('homme');
const facteurs = {};
for (const [nom, gg] of Object.entries(GABARITS)) {
  const h = GABARITS.homme;
  facteurs[nom] = { stature: f2(gg.H / h.H), epaules: f2(gg.x.acromion / h.x.acromion), hanches: f2(gg.x.hanches / h.x.hanches), membres: gg.km, tete: f2((gg.z.sommet - gg.z.menton) / (h.z.sommet - h.z.menton)) };
}
module.exports = {
  corps,
  segments: base.segments,
  bouts: BOUTS,
  tronc: base.tronc,
  bassin: base.bassin,
  tete: base.tete,
  nez: base.nez,
  oreilles: base.oreilles,
  cheveux: base.cheveux,
  ancres: base.ancres,
  longueurs: base.longueurs,
  dessus: { sections: base.sections },
  troncFace: (age, aP, aL) => troncFaceDe(pour(age).gabarit, aP, aL),
  troncDessus: (age, penche) => troncDessusDe(pour(age).gabarit, penche),
  gabarits: GABARITS,
  facteurs,
  pour,
  _interne: { squelette3D, lirePose, tube, courbe, pchip, superEllipse, d },
};
