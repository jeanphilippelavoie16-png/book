// Modèle — la main droite qui pince une aiguille entre le pouce et l'index, de profil côté pouce.
// Pas une planche du livre : une feuille de modèle, à juger avant de porter dessiner() dans formes.js.
//
// Construction (Loomis/Bridgman), en mm d'adulte à l'échelle 1 (main de 190 du poignet au bout du
// majeur tendu). Origine au milieu du pli du poignet, x vers les doigts, y vers le bas, dos de la
// main en haut. On pose d'abord le squelette : la paume en coin, les métacarpes, chaque doigt en
// trois phalanges aux rapports vrais, le pouce qui part du trapèze ; les volumes (épaisseurs aux
// articulations, bosses des jointures, pulpes) s'en déduisent ; seul le contour s'imprime.
// MODELE_CONSTRUCTION=1 montre le squelette en tireté par-dessus.
// Reprise « final » : corrections 2 à 8 du juge appliquées. La correction 1 (calque sur un vrai
// modèle, règle 2) n'est PAS faite : Wikimedia Commons injoignable depuis la session.
// Original : _reprise/scratchpad/modeles/pince-construction.png.

const NOIR = '#1A1A1A', BLANC = '#FFFFFF';
const trait = ep => `fill="none" stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="round"`;
const FOND = `fill="${BLANC}" stroke="none"`;
const SIL = 1.6, REC = 1.05, DET = 0.7, FIN = 0.5;

// ─── géométrie ─────────────────────────────────────────────────────────────────────────
const rad = d => d * Math.PI / 180;
const dir = a => [Math.cos(rad(a)), Math.sin(rad(a))];
const add = (p, q, k = 1) => [p[0] + q[0] * k, p[1] + q[1] * k];
const lerp = (p, q, t) => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t];
// normale côté paume d'un segment d'angle a (la flexion tourne dans le sens +)
const paumeN = a => [-Math.sin(rad(a)), Math.cos(rad(a))];
// une chaîne d'os : départ, puis [longueur, angle] pour chaque phalange
function chaine(p0, os) {
  const J = [p0]; let p = p0;
  for (const [l, a] of os) { p = add(p, dir(a), l); J.push(p); }
  return J;
}

// Catmull-Rom → Bézier : une courbe lisse qui passe par chaque point.
function lisse(P, ferme = false) {
  const n = P.length, f = v => Math.round(v * 100) / 100;
  const g = i => ferme ? P[(i + n) % n] : P[Math.max(0, Math.min(n - 1, i))];
  let d = `M${f(P[0][0])} ${f(P[0][1])}`;
  const fin = ferme ? n : n - 1;
  for (let i = 0; i < fin; i++) {
    const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d + (ferme ? ' Z' : '');
}

// Le volume d'un doigt autour de son squelette. J : articulations (base … bout), os : angles des
// phalanges, w : épaisseur à chaque articulation et au bout. Rend le dos (base → bout), le bout
// arrondi et la face palmaire (bout → base) : bosse de jointure au dos, pli côté paume, pulpe.
function volume(J, angles, w, { bosse = 1.6, pli = 1.2, pulpe = 1.4, bout = 1.0, sens = 1 } = {}) {
  const n = angles.length, dos = [], paume = [];
  const paumeN = a => { const v = [-Math.sin(rad(a)), Math.cos(rad(a))]; return [v[0] * sens, v[1] * sens]; };
  for (let i = 0; i < n; i++) {
    const a = angles[i], N = paumeN(a), A = J[i], B = J[i + 1];
    // à l'articulation : la bissectrice entre la phalange d'avant et celle-ci
    let Nj = N, fl = 0;
    if (i > 0) { const N0 = paumeN(angles[i - 1]); Nj = [(N0[0] + N[0]) / 2, (N0[1] + N[1]) / 2]; const l = Math.hypot(...Nj); Nj = [Nj[0] / l, Nj[1] / l]; fl = Math.min(1, Math.abs(a - angles[i - 1]) / 50); }
    const hj = w[i] / 2;
    if (i > 0 && fl > 0.25) {
      // jointure pliée : un coin arrondi, pas une pointe
      const r = hj * 0.62 * fl, Np = paumeN(angles[i - 1]);
      dos.push(add(add(A, dir(angles[i - 1]), -r), Np, -hj));
      dos.push(add(A, Nj, -(hj + bosse * fl)));
      dos.push(add(add(A, dir(a), r), N, -hj));
    } else dos.push(add(A, Nj, -(hj + (i ? bosse * fl : 0))));
    if (i > 0 || true) paume.push(add(A, Nj, hj - (i ? pli * fl : 0)));
    const dern = i === n - 1;
    // le long de la phalange
    const ts = dern ? [0.35, 0.68] : [0.5];
    for (const t of ts) {
      const C = lerp(A, B, t), hh = (w[i] + (w[i + 1] - w[i]) * t) / 2;
      dos.push(add(C, N, -hh * (dern ? 0.94 : 1)));
      paume.push(add(C, N, hh + (dern ? pulpe * (t > 0.5 ? 1.25 : 0.8) : pulpe * 0.5)));
    }
    if (dern) {
      // le bout : l'ongle file droit, la pulpe tourne plein vers l'avant
      const D = dir(a), h = w[n] / 2;
      const cap = [
        add(add(B, D, -1.8), N, -h * 0.85),
        add(add(B, D, bout), N, -h * 0.2),
        add(add(B, D, bout * 0.6), N, h * 0.45),
        add(add(B, D, -2.4), N, h * 1.02),
      ];
      return { dos, cap, paume: paume.reverse(), tout: [...dos, ...cap, ...paume.slice().reverse().reverse()] };
    }
  }
}

// ─── la construction ────────────────────────────────────────────────────────────────────
// Ce que la vue de profil montre vraiment : le pouce, tourné en opposition, est le plus près de
// l'œil ; sa pulpe se pose sur celle de l'index en profondeur, donc le bout du pouce passe DEVANT
// la pulpe de l'index, et l'aiguille, prise entre les deux, sort en haut dans le O et en bas en
// avant des bouts. L'index tombe en arc. Le majeur et l'annulaire, derrière lui et de plus en plus
// repliés, se voient par le O en arcs emboîtés ; l'auriculaire, le plus replié, sort sous le pouce.
//
// Squelette (mm, échelle 1) : paume en coin, 93 du pli du poignet à la jointure de l'index ;
// index 40 · 23 · 18 ; pouce 46 · 32 · 25 depuis le trapèze. Le contour est posé sur ce
// squelette (MODELE_CONSTRUCTION=1 le montre).
const SQ = {
  poignet: [0, 0],
  index: [[92, 10], [120.3, 38.3], [121.3, 60.3], [116.9, 76.7]],     // jointure, IPP, IPD, bout : 40 · 22 · 17 ; flexion 35° · 42° · 18°
  majeur: [[93, 16], [111.5, 47.5], [96, 63]],                       // recalés sur le contour corrigé
  annulaire: [[88, 22], [100, 55.5], [82, 68]],
  pouce: [[24, 26], [55, 56.5], [86.5, 66.5], [111, 68.5]],           // trapèze, MCP, IP, bout
};

function dessiner(x, y, echelle = 1, { construction = false } = {}) {
  const T = ([u, v]) => [x + u * echelle, y + v * echelle];
  const tr = (pts, ferme) => lisse(pts.map(T), ferme);
  const out = [];
  const fond = pts => out.push(`<path d="${tr(pts, true)}" ${FOND}/>`);
  const ligne = (pts, ep) => out.push(`<path d="${tr(pts)}" ${trait(ep)}/>`);

  // 1. Derrière l'index, vus par le O : le majeur, puis l'annulaire plus replié ; et l'auriculaire,
  //    replié serré, dont l'articulation sort sous le pouce.
  const majeur = [[80, 24.4], [88.6, 31], [94.6, 39.6], [98.8, 46.4], [101, 51.2], [101, 54.4], [98.8, 56.4], [95, 57], [91.6, 59.4]];
  const annulaire = [[71.6, 30.4], [79.5, 37.6], [85.4, 44.6], [88.6, 50], [88.8, 54], [86.6, 57.2], [82.4, 58.6], [78, 57]];
  fond([...majeur, [118, 62], [118, 25]]);
  ligne(majeur, REC);
  ligne([[99.6, 51], [102.2, 52.2]], FIN); ligne([[87.8, 49.2], [90.4, 50.6]], FIN);   // plis des articulations du milieu
  ligne(annulaire, REC);
  const auriculaire = [[63, 72], [65.2, 77.6], [70, 83], [76, 84], [81.4, 82.2], [84.6, 79.4], [86, 76]];
  fond([...auriculaire, [86, 72], [70, 70]]);
  ligne(auriculaire, REC);
  ligne([[70.2, 79.8], [70.8, 82.2]], FIN);                    // le pli de l'articulation

  // 2. L'avant-bras, la paume et le dos de la main ; côté paume, le blanc s'arrête à la palmure.
  const dosMain = [[-10, -22.9], [-4, -22.2], [10, -20.5], [34, -14.6], [58, -8.2], [76, -3.4], [85, -1.4]];
  const palmure = [[66.5, 51.4], [62.4, 48], [62.6, 41.4], [66.6, 34.6], [73, 28.4], [80.6, 23.8], [88, 21]];   // la peau entre pouce et index, du pouce vers l'index
  const dessous = [[-10, 21.4], [-4, 23.8], [4, 27]];
  fond([...dosMain, [95, 8], ...palmure.slice().reverse(), [40, 50], ...dessous.slice().reverse()]);

  // 3. L'index : la jointure, puis l'arc doux jusqu'à la pulpe, qui regarde le pouce.
  const indexDos = [[85, -1.4], [91, -1], [97.5, 1.2], [105, 6.6], [112, 14.4], [119, 22.4], [125, 29.4],
                    [128.6, 35.4], [129.9, 42], [129.4, 49], [128.9, 56], [129.6, 61.4], [127.6, 67.6], [123.4, 73.8],
                    [119.6, 79], [115.6, 81.4], [112.2, 80.4]];
  const indexPaume = [[112.2, 80.4], [110.2, 76], [110.4, 70.3], [111.8, 64.2], [112.6, 60.6], [111.6, 55.5], [111.4, 49.5],
                      [112.6, 44], [110.8, 40.5], [105.5, 34.5], [98, 27.5], [91, 22], [88, 21]];
  fond([...indexDos, ...indexPaume.slice(1), [84, 10]]);
  ligne([...dosMain, ...indexDos.slice(1), ...indexPaume.slice(1)], SIL);   // le dos de la main et l'index : un seul trait
  ligne([[128.6, 63.8], [126.6, 65.6], [124.6, 70.6], [121.4, 75.6], [119, 78.9]], DET);   // l'ongle, de côté
  ligne([[127.4, 34.6], [124.6, 35.6]], FIN); ligne([[128.6, 37.6], [126, 38.6]], FIN);     // plis sur l'articulation du milieu
  ligne([[130, 61.8], [128, 62]], FIN);                                                 // pli sur l'articulation du bout
  ligne([[113.6, 46.6], [116.4, 45.8]], FIN);                                                 // pli de flexion, côté paume

  // 4. L'aiguille, entre les pulpes : le chas dans le O, en haut ; la pointe sort en bas, en avant.
  // Ø 1,2, 62 de long : un fuseau noir, le chas évidé en blanc, la pointe effilée.
  const Dn = dir(73), Nn = [-Dn[1], Dn[0]], Pc = [113, 68.5], r = 0.62;
  const Q = (t, e) => add(add(Pc, Dn, t), Nn, e);
  out.push(`<path d="${tr([Q(-28.6, 0), Q(-28.2, r * 1.15), Q(-24, r * 1.1), Q(-16, r), Q(26, r), Q(31, r * 0.55), Q(34, 0.08),
                            Q(34, -0.08), Q(31, -r * 0.55), Q(26, -r), Q(-16, -r), Q(-24, -r * 1.1), Q(-28.2, -r * 1.15)], true)}" fill="${NOIR}" stroke="none"/>`);
  out.push(`<path d="${tr([Q(-26.4, 0), Q(-24.2, 0), Q(-21.6, 0)])}" fill="none" stroke="${BLANC}" stroke-width="1.4" stroke-linecap="round"/>`);

  // 5. Le pouce, le plus près de l'œil : du talon, au poignet, jusque devant la pulpe de l'index.
  const pouceHaut = [[66.5, 51.4], [71, 53], [77, 55.4], [83.5, 58.9], [89, 59.9], [96, 57.8], [103.5, 56.6],
                     [110.5, 58.4], [116, 62.8], [118.8, 67.6], [117.8, 72.6], [114, 76.2]];
  const pouceBas = [[114, 76.2], [107, 78.8], [99, 78.8], [92, 78.4], [86, 77.6], [79, 76.8], [70, 74.6],
                    [61, 72.4], [51, 67.6], [37.8, 61], [25.8, 49.6], [14.6, 37.4], [4, 27]];
  fond([...palmure.slice().reverse().slice(0, 2), ...pouceHaut, ...pouceBas.slice(1), [-8, 23], [40, 30]]);
  ligne([...pouceHaut, ...pouceBas.slice(1), ...dessous.slice().reverse().slice(1)], SIL);
  ligne(palmure, SIL);
  // l'ongle du pouce, presque de face : le pouce est tourné vers l'index
  ligne([[105.2, 64.4], [109.6, 63.4], [114, 64.2], [116.6, 66.6], [116.8, 69.8], [114.6, 71.6], [108, 71.5], [105, 69.6], [104.6, 66.6], [105.2, 64.4]], DET);
  ligne([[106.6, 65], [105.6, 67.4], [106.4, 70]], FIN);                 // la lunule
  ligne([[86.4, 61.6], [85.4, 64.6]], FIN); ligne([[87, 75.6], [86, 72.8]], FIN);   // plis de l'articulation

  if (construction) {
    const L = (a, b) => { const [p, q] = [T(a), T(b)]; out.push(`<line x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}" stroke="#C00" stroke-width="0.5" stroke-dasharray="3 2"/>`); };
    const O = a => { const p = T(a); out.push(`<circle cx="${p[0]}" cy="${p[1]}" r="${1.6 * echelle}" fill="none" stroke="#C00" stroke-width="0.5"/>`); };
    for (const k of ['index', 'majeur', 'annulaire', 'pouce']) { const J = SQ[k]; L(SQ.poignet, J[0]); for (let i = 0; i < J.length - 1; i++) L(J[i], J[i + 1]); J.forEach(O); }
    O(SQ.poignet);
  }
  return out.join('\n');
}

// Le dessin occupe, à l'échelle 1, de x = -10 à 131 et de y = -24 à 101 : centre (60,5, 38).
module.exports = (h) => ({
  ref: 'modele',
  titre: 'La pince, de profil côté pouce',
  desc: 'Modèle : la main droite pince une aiguille entre la pulpe du pouce et celle de l’index.',
  fichier: '_modeles-pince-final.svg',
  format: 'pleine',
  disposition: [['a']],
  vues: {
    a: { dessin: z => { const s = Math.min(z.l / 150, z.h / 134); return dessiner(z.l / 2 - 60.5 * s, z.h / 2 - 38 * s, s, { construction: !!process.env.MODELE_CONSTRUCTION }); } },
  },
});
module.exports.dessiner = dessiner;
