// Planche 104-04 — le patron du mocassin d'une pièce à couture froncée (ch. 81, §5-F, étapes 31 à 35).
// Trois vues : le patron à plat (ce qu'on coupe), le bout froncé en cours de couture (le geste),
// le mocassin monté vu de côté (ce que ça donne). Aucune cote : le chapitre n'en donne pas ; le
// tracé du pied, dans le patron, donne l'échelle.

// ── Outils de géométrie ────────────────────────────────────────────────────────────────────
// Catmull-Rom échantillonnée : une courbe douce qui passe par chaque point.
function cr(pts, ferme = false, n = 14) {
  const N = pts.length, out = [];
  const g = i => ferme ? pts[(i + N) % N] : pts[Math.max(0, Math.min(N - 1, i))];
  const segs = ferme ? N : N - 1;
  for (let i = 0; i < segs; i++) {
    const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
    for (let k = 0; k < n; k++) {
      const t = k / n, t2 = t * t, t3 = t2 * t;
      const f = j => 0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2
        + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t3);
      out.push([f(0), f(1)]);
    }
  }
  if (!ferme) out.push(pts[N - 1]);
  return out;
}
// Points également espacés le long d'une polyligne, avec leur tangente unitaire.
function equi(poly, nSeg) {
  const L = [0];
  for (let i = 1; i < poly.length; i++) L.push(L[i - 1] + Math.hypot(poly[i][0] - poly[i - 1][0], poly[i][1] - poly[i - 1][1]));
  const tot = L[L.length - 1], out = [];
  for (let k = 0; k <= nSeg; k++) {
    const d = tot * k / nSeg;
    let i = 1; while (i < L.length - 1 && L[i] < d) i++;
    const a = poly[i - 1], b = poly[i], u = (d - L[i - 1]) / ((L[i] - L[i - 1]) || 1);
    const dx = b[0] - a[0], dy = b[1] - a[1], m = Math.hypot(dx, dy) || 1;
    out.push({ p: [a[0] + dx * u, a[1] + dy * u], t: [dx / m, dy / m] });
  }
  return out;
}
const pl = (p, t, a, b) => [p[0] + t[0] * a + t[1] * b, p[1] + t[1] * a - t[0] * b]; // a le long, b en travers (vers la gauche de la marche, à l'écran)
const trait = (a, b) => `M${a[0].toFixed(1)},${a[1].toFixed(1)} L${b[0].toFixed(1)},${b[1].toFixed(1)}`; // un pli ou un point : pas une hachure

// ── Vue 1 : le patron à plat ───────────────────────────────────────────────────────────────
// Repère local : talon à l'origine, bout vers la droite, gros orteil vers le haut.
const PIED = [[0, 2], [4, -16], [18, -27], [45, -30], [90, -27], [130, -34], [165, -42], [192, -43], [212, -41],
  [226, -36], [234, -26], [235, -16], [231, -8], [224, -4], [218, -2], [224, 2], [224, 8], [218, 11], [213, 11],
  [217, 16], [215, 21], [210, 23], [205, 22], [208, 27], [204, 32], [198, 33], [194, 32], [195, 37], [190, 42],
  [180, 46], [168, 48], [130, 44], [80, 36], [40, 31], [14, 24]];
// Pièce de dessous : de l'angle haut du talon, autour du bout, jusqu'à l'angle bas ; le talon est coupé droit.
const DESSOUS = [[-16, -84], [40, -88], [92, -92], [140, -97], [196, -98], [244, -80], [274, -46], [285, -2],
  [276, 42], [250, 78], [204, 100], [140, 104], [82, 98], [26, 92], [-16, 88]];
const I_A = 3, I_B = 11; // les deux coins de l'empeigne : entre eux, le bord long qui se fronce
// Empeigne : bord arrière droit (au cou-de-pied), bout arrondi.
const EMPEIGNE = [[0, -42], [40, -44], [78, -38], [104, -22], [116, 0], [104, 22], [78, 38], [40, 44], [0, 42]];
const NSEG = 8; // même nombre d'intervalles sur les deux bords

function patron(z) {
  const s = 1.12;
  const ox = 44 + 16 * s, oy = z.h / 2 - 3 * s;
  const ex = ox + 285 * s + 52, ey = oy + 3 * s;
  const T = ([x, y]) => [ox + x * s, oy + y * s];
  const E = ([x, y]) => [ex + x * s, ey + y * s];
  const n = 14;
  const dessous = cr(DESSOUS, false, n).map(T);
  const bordLong = dessous.slice(I_A * n, I_B * n + 1);
  const pied = cr(PIED, true, 10).map(T);
  const emp = cr(EMPEIGNE, false, n).map(E);
  return { s, ox, oy, ex, ey, T, E, dessous, bordLong, pied, emp,
    repL: equi(bordLong, NSEG), repC: equi(emp, NSEG) };
}

// ── Vue 2 : le bout, froncé et cousu, vu de dessus ────────────────────────────────────────────
// Repère local : centre du U de l'empeigne, bout vers le haut.
const U = [[-48, 100], [-49, 40], [-45, -6], [-30, -40], [0, -56], [30, -40], [45, -6], [49, 40], [48, 100]];
const MUR = [[-84, 100], [-86, 36], [-80, -18], [-56, -70], [0, -92], [56, -70], [80, -18], [86, 36], [84, 100]];
const NPLI = 26, COUSU = 19; // plis sur toute la ligne visible ; les 19 premiers sont cousus

function fronces(z) {
  const ox = z.l / 2, oy = z.h / 2 - 2;
  const T = ([x, y]) => [ox + x, oy + y];
  const u = cr(U, false, 16).map(T);
  const mur = cr(MUR, false, 16).map(T);
  const pts = equi(u, NPLI);      // marche de gauche à droite en passant par le bout : la droite de la marche est dehors
  return { ox, oy, T, u, mur, pts };
}

// ── Vue 3 : monté, vu de côté ───────────────────────────────────────────────────────────────
// Repère local : dessous du talon à l'origine, bout vers la droite, y vers le haut négatif.
const TALON = [[16, -78], [7, -62], [2, -38], [4, -14], [12, -3], [26, 0]];
const BOUT = [[212, 0], [236, -3], [254, -13], [260, -28], [253, -43], [236, -52]];
const DESSUS = [[236, -52], [208, -60], [180, -70], [156, -80]];
const COL = [[146, -68], [112, -69], [72, -70], [38, -72], [16, -78]];
const COUTURE = [[146, -68], [174, -56], [204, -46], [230, -38], [250, -31], [259, -28]];
const TROUS = [34, 62, 90, 118];

function monte(z) {
  const s = (z.l - 44) / 262;
  const ox = 30, oy = z.h * 0.68;
  const T = ([x, y]) => [ox + x * s, oy + y * s];
  const talon = cr(TALON, false, 10);
  const silhouette = [...talon, ...cr(BOUT, false, 10), ...cr(DESSUS, false, 10), [146, -68],
    ...cr(COL, false, 10).slice(1, -1)].map(T);
  const couture = cr(COUTURE, false, 12).map(T);
  const colY = x => { const c = cr(COL, false, 20); let b = c[0]; for (const p of c) if (Math.abs(p[0] - x) < Math.abs(b[0] - x)) b = p; return b[1]; };
  const trous = TROUS.map(x => T([x, colY(x) + 7]));
  return { s, ox, oy, T, talon: talon.map(T), silhouette, couture, trous };
}

module.exports = (h) => ({
  ref: '104-04',
  titre: 'Le patron du mocassin d’une pièce',
  desc: 'À plat : la pièce de dessous, tracée autour du pied avec un rabat de montée tout autour, et '
    + 'l’empeigne en U ; le bord de la pièce de dessous qui va du coin gauche au coin droit de '
    + 'l’empeigne en passant par le bout est nettement plus long que le bord arrondi de l’empeigne, '
    + 'et les deux bords portent le même nombre de repères. Au bout, vu de dessus : l’excédent '
    + 'forme de petits plis réguliers, un pli pris à chaque point de surjet. Monté, vu de côté : '
    + 'aucune couture sous le pied, le talon fermé d’une couture droite, les trous de cordon.',
  format: 'pleine',
  disposition: [['patron'], ['fronces', 'monte']],
  hauteurs: [5, 4],
  largeurs: [[1], [4, 5]],
  vues: {
    patron: {
      titre: 'Le patron, à plat',
      dessin: z => {
        const g = patron(z);
        const out = [];
        out.push(h.chemin(g.dessous, h.a.contour, true));
        out.push(h.chemin(g.pied, h.a.cache, true));
        out.push(h.chemin(g.emp, h.a.contour, true));
        // repères : même nombre d'intervalles sur le bord long et sur le bord de l'empeigne
        // Aux deux coins de l'empeigne, un repère perpendiculaire se confondrait avec le bord
        // arrière droit : il passe en biais sur le coin, pour qu'on compte neuf et neuf.
        const reps = [...g.repL, ...g.repC];
        reps.forEach((r, i) => {
          const k = i - g.repL.length;
          let a, b;
          if (k === 0 || k === NSEG) {
            const sy = k === 0 ? -1 : 1, o = 4.5 / g.s;
            a = g.E([-o, sy * (42 + o)]); b = g.E([o, sy * (42 - o)]);
          } else { a = pl(r.p, r.t, 0, -6); b = pl(r.p, r.t, 0, 6); }
          out.push(h.ligne(a[0], a[1], b[0], b[1], h.a.arete));
        });
        return out.join('\n');
      },
      renvois: z => {
        const g = patron(z);
        const pied = g.T([45, -30]);
        const dessous = g.T([60, 91]);
        const empB = g.E([60, 42]);
        const long = g.repL[2].p;
        const rep = g.repC[2].p;
        return [
          { n: 1, rond: g.T([52, -62]), cible: [pied[0], pied[1] - 2], texte: 'tracé du pied, pris debout' },
          { n: 2, rond: [dessous[0] - 30, dessous[1] + 34], cible: [dessous[0] - 3, dessous[1] + 3], texte: 'pièce de dessous, rabat tout autour' },
          { n: 3, rond: [empB[0] + 6, empB[1] + 40], cible: [empB[0], empB[1] + 3], texte: 'empeigne, le dessus du pied' },
          { n: 4, rond: [long[0] + 26, long[1] - 34], cible: [long[0] + 3, long[1] - 3], texte: 'bord long : l’excédent se fronce' },
          { n: 5, rond: [rep[0] + 6, rep[1] - 38], cible: [rep[0] + 1, rep[1] - 8], texte: 'même nombre de repères par bord' },
        ];
      },
    },
    fronces: {
      titre: 'Froncer et coudre',
      dessin: z => {
        const g = fronces(z);
        const out = [];
        // mur de la pièce de dessous, vu de dessus, coupé en bas par un trait de rupture
        out.push(h.chemin(g.mur, h.a.contour));
        out.push(h.chemin(g.u, h.a.arete));
        const pts = g.pts;
        // partie cousue : festons de la pièce de dessous, plis, points de surjet
        let d = '';
        for (let i = 0; i < COUSU; i++) {
          const A = pts[i], B = pts[i + 1];
          const a = pl(A.p, A.t, 0, 1.5), b = pl(B.p, B.t, 0, 1.5);
          const m = pl([(A.p[0] + B.p[0]) / 2, (A.p[1] + B.p[1]) / 2], A.t, 0, 7);
          d += (i === 0 ? `M${a[0].toFixed(1)},${a[1].toFixed(1)}` : '') + ` Q${m[0].toFixed(1)},${m[1].toFixed(1)} ${b[0].toFixed(1)},${b[1].toFixed(1)}`;
        }
        out.push(h.path(d, h.a.arete));
        let plis = '', points = '';
        for (let i = 0; i <= COUSU; i++) {
          const P = pts[i];
          plis += trait(pl(P.p, P.t, 0, 2.5), pl(P.p, P.t, 0, i % 2 ? 12 : 16)) + ' ';
          points += trait(pl(P.p, P.t, -3.5, -5), pl(P.p, P.t, 3.5, 8)) + ' ';
        }
        out.push(h.path(plis, h.a.detail));
        out.push(h.path(points, h.a.arete));
        // partie pas encore cousue : le bord de la pièce de dessous, lâche, écarté de l'empeigne
        const lache = [];
        for (let i = COUSU; i <= NPLI; i++) {
          const P = pts[i];
          lache.push(pl(P.p, P.t, 0, 9 + ((i - COUSU) % 2 ? 3 : 0)));
        }
        out.push(h.chemin(cr(lache, false, 8), h.a.arete));
        // l'aiguille, pointe dans le bord de l'empeigne, et le fil qui revient du dernier point
        const P = pts[COUSU + 1];
        const pointe = pl(P.p, P.t, 0, -4), queue = pl(P.p, P.t, 22, 52);
        const dx = queue[0] - pointe[0], dy = queue[1] - pointe[1], m = Math.hypot(dx, dy);
        const nx = -dy / m * 1.6, ny = dx / m * 1.6;
        out.push(h.path(`M${pointe[0]},${pointe[1]} L${queue[0] + nx},${queue[1] + ny} L${queue[0] - nx},${queue[1] - ny} Z`, h.a.detail));
        const oeil = [pointe[0] + dx * 0.9, pointe[1] + dy * 0.9];
        const dernier = pl(pts[COUSU].p, pts[COUSU].t, 3.5, 8);
        const c1 = pl(pts[COUSU].p, pts[COUSU].t, 6, 34);
        out.push(h.path(`M${dernier[0]},${dernier[1]} Q${c1[0]},${c1[1]} ${oeil[0]},${oeil[1]}`, h.a.detail));
        // trait de rupture en bas
        const yb = g.oy + 100;
        out.push(h.path(`M${g.ox - 90},${yb} q10,-5 20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0`, h.a.detail));
        return out.join('\n');
      },
      renvois: z => {
        const g = fronces(z);
        const pli = g.pts[5], pt = g.pts[11];
        const f = pl(pli.p, pli.t, 0, 12);
        const st = pl(pt.p, pt.t, 0, -4);
        return [
          { n: 6, rond: [f[0] - 42, f[1] - 12], cible: [f[0] - 1, f[1]], texte: 'un pli pris à chaque point' },
          { n: 7, rond: [g.ox + 6, g.oy + 10], cible: [st[0] - 2, st[1] + 3], texte: 'surjet par-dessus les deux bords' },
        ];
      },
    },
    monte: {
      titre: 'Monté',
      dessin: z => {
        const g = monte(z);
        const out = [];
        out.push(h.chemin(g.silhouette, h.a.contour, true));
        out.push(h.chemin(g.couture, h.a.arete));
        // plis sous la couture, sur toute la ligne
        const pts = equi(g.couture, 16);
        let plis = '', points = '';
        for (let i = 1; i < pts.length - 1; i++) {
          const P = pts[i];
          plis += trait(pl(P.p, P.t, 0, -2.5), pl(P.p, P.t, 0, i % 2 ? -8 : -11)) + ' ';
          points += trait(pl(P.p, P.t, -2, 3), pl(P.p, P.t, 2, -3)) + ' ';
        }
        out.push(h.path(plis, h.a.detail));
        out.push(h.path(points, h.a.arete));
        // couture droite du talon : points en travers de la silhouette
        const tal = equi(g.talon.slice(0, -8), 8);
        out.push(h.path(tal.map(P => trait(pl(P.p, P.t, 0, -4), pl(P.p, P.t, 0, 4))).join(' '), h.a.arete));
        // trous de cordon et cordon
        for (const t of g.trous) out.push(h.cercle(t[0], t[1], 2.8, h.a.arete));
        const [t0, t1, t2, t3] = g.trous;
        out.push(h.ligne(t0[0] + 3, t0[1], t1[0] - 3, t1[1], h.a.arete));
        out.push(h.ligne(t2[0] + 3, t2[1], t3[0] - 3, t3[1], h.a.arete));
        const nd = [t3[0] + 10, t3[1] + 2];
        out.push(h.path(`M${t3[0] + 3},${t3[1]} L${nd[0]},${nd[1]} q4,10 -2,22 M${nd[0]},${nd[1]} q9,8 8,20`, h.a.arete));
        out.push(h.cercle(nd[0], nd[1], 2.4, h.a.plein));
        return out.join('\n');
      },
      renvois: z => {
        const g = monte(z);
        const talon = g.T([3, -32]);
        const trou = g.trous[1];
        return [
          { n: 8, rond: [talon[0] - 18, talon[1] - 34], cible: [talon[0] - 5, talon[1] - 2], texte: 'talon fermé d’une couture droite' },
          { n: 9, rond: [trou[0] + 4, trou[1] - 44], cible: [trou[0] + 0.5, trou[1] - 4], texte: 'trou de cordon percé au poinçon' },
        ];
      },
    },
  },
});
