// Modèle — la main droite qui tient une pierre ronde de 70 mm par-dessous, de profil côté pouce.
// Pas une planche du livre : une feuille de modèle, à juger avant de porter dessiner() dans formes.js.
//
// Construction (Loomis/Bridgman), en mm, à l'échelle 1 ; origine au centre de la pierre, y vers le
// bas. La main est paume en l'air, l'avant-bras arrive de la gauche, le dos de la main en bas.
// La pierre s'enfonce dans le creux de la paume (le bord de la paume côté pouce passe devant son
// bas) ; le majeur et l'index remontent sur son flanc droit, l'index devant (plus près de l'œil, il
// s'enroule sur un cercle plus petit en projection) ; le pouce part du trapèze au poignet et se
// couche sur le dessus. Les volumes sont posés d'abord ; seul le contour s'imprime.
// MODELE_CONSTRUCTION=1 montre la construction en trait tireté.
//
// Longueurs : main 190 du pli du poignet au bout du majeur (paume ~97 au centre de l'articulation
// du majeur, majeur 45 · 27 · 22) ; index 38 · 22 · 19 ; pouce 41 · 34 · 26 depuis le trapèze.

const NOIR = '#1A1A1A', BLANC = '#FFFFFF';
const trait = (ep, cap = 'round') => `fill="none" stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="${cap}"`;
const FOND = `fill="${BLANC}" stroke="none"`;

function lisse(P, ferme = false) {
  const n = P.length, f = v => Math.round(v * 10) / 10;
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

// ─── la construction ────────────────────────────────────────────────────────────────────
const R_BOULE = 35;
const C = {
  poignet: [-84, 41],                                  // centre du poignet, sous le pli
  // pouce : trapèze → articulation de base → articulation du bout → bout de l'os (46 · 32 · 27)
  Tc: [-78, 27], Tm: [-53, -11], Ti: [-27, -29], Tt: [-3, -39],
  // majeur : tête du métacarpe → trois phalanges 44 · 27 · 21
  Mm: [10, 50], Mp: [46, 24], Md: [49, -3], Mt: [38, -21],
  // index, devant : 40 · 21 · 18
  Im: [6, 46], Ip: [34, 18], Id: [35, -3], It: [24, -17],
};

const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
const mul = (a, k) => [a[0] * k, a[1] * k];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const uni = a => { const l = Math.hypot(a[0], a[1]); return [a[0] / l, a[1] / l]; };
const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

// Un doigt construit sur sa chaîne d'os J (base, deux articulations, bout de l'os) : chaque
// phalange est un tube droit ; le dos (côté s) s'écarte de l'os de dos[k], le ventre de ventre[k].
// Aux articulations, le dos fait la bosse de la jointure, le ventre le pli ; entre deux, le ventre
// bombe un peu (le coussinet). Le bout : l'ongle à plat sur le dos, la pulpe qui dépasse l'os.
function doigt(J, dos, ventre, s = 1) {
  const u = [0, 1, 2].map(i => uni(sub(J[i + 1], J[i])));
  const nor = v => s > 0 ? [-v[1], v[0]] : [v[1], -v[0]];
  const nj = k => uni(nor(k === 0 ? u[0] : k === 3 ? u[2] : add(u[k - 1], u[k])));
  const le = (i, t, cote, w) => add(lerp(J[i], J[i + 1], t), mul(nor(u[i]), cote * w));
  const D = [add(J[0], mul(nj(0), dos[0]))], V = [sub(J[0], mul(nj(0), ventre[0]))];
  for (let i = 0; i < 3; i++) {
    const wd = t => dos[i] + (dos[i + 1] - dos[i]) * t, wv = t => ventre[i] + (ventre[i + 1] - ventre[i]) * t;
    if (i < 2) {
      D.push(le(i, 0.2, 1, wd(0.2)), le(i, 0.8, 1, wd(0.8)));
      D.push(add(J[i + 1], mul(nj(i + 1), dos[i + 1] * 1.04)));
      V.push(le(i, 0.3, -1, wv(0.3)), le(i, 0.6, -1, wv(0.6) * 1.03), le(i, 0.85, -1, wv(0.85)));
      V.push(sub(J[i + 1], mul(nj(i + 1), ventre[i + 1] * 0.99)));
    } else {
      D.push(le(i, 0.25, 1, wd(0.25)), le(i, 0.75, 1, wd(0.75) * 0.97));
      V.push(le(i, 0.35, -1, wv(0.35) * 1.04), le(i, 0.75, -1, wv(0.75) * 1.1));
    }
  }
  const ut = u[2], nt = nor(u[2]), T = J[3];
  const bout = [add(add(T, mul(nt, dos[3] * 0.62)), mul(ut, 2.2)), add(add(T, mul(nt, dos[3] * 0.05)), mul(ut, 3.6)),
                add(sub(T, mul(nt, ventre[3] * 0.7)), mul(ut, 2))];
  const ongle = [le(2, 0.45, 1, dos[3] * 0.82), le(2, 0.8, 1, dos[3] * 0.72), add(add(T, mul(nt, dos[3] * 0.5)), mul(ut, 1.8))];
  return { D, V, bout, ongle, nj, contour: [...D, ...bout, ...V.slice().reverse()] };
}

function dessiner(x, y, echelle = 1, { construction = false } = {}) {
  const T = ([u, v]) => [x + u * echelle, y + v * echelle];
  const tr = (pts, ferme) => lisse(pts.map(T), ferme);
  const pieces = [];
  const piece = (p) => { pieces.push({ sil: [], rec: [], det: [], ...p }); };

  const maj = doigt([C.Mm, C.Mp, C.Md, C.Mt], [13, 9.5, 8, 6.5], [8.5, 8.5, 7.5, 6.5], 1);
  const ind = doigt([C.Im, C.Ip, C.Id, C.It], [10, 9, 7.5, 6.2], [8, 8, 7, 6.2], 1);
  const pou = doigt([C.Tc, C.Tm, C.Ti, C.Tt], [8, 8, 7.5, 7], [10, 8.5, 8, 7], -1);

  // 1. Avant-bras, paume, dos de la main : le dos de la main file droit jusqu'à la jointure du majeur.
  const dosMain = [[-125, 66], [-112, 64], [-84, 59.5], [-56, 60], [-30, 61], [-10, 61.4]];
  // la palmure et le bord de la paume côté pouce : du pouce à la base de l'index, devant le bas de la pierre
  const palmure = [[-31, -6], [-27, 4], [-20.5, 12.5], [-11, 19.5], [2, 23.5], [15, 24.2]];
  piece({
    fond: [[-200, 11], [-150, 15], [-110, 19.5], [-84, 22], [-60, 14], [-44, -8], ...palmure.slice(1), [22, 34], [22, 52],
           ...dosMain.slice().reverse(), [-200, 76]],
    det: [[[-64, 21], [-54, 23.5], [-46, 27]]],                                       // le gras du pouce
  });

  // 2. Le majeur : il sort de la jointure et remonte le flanc de la pierre.
  piece({
    fond: [...dosMain, ...maj.contour, [-10, 44], [-150, 50]],
    sil: [[...dosMain, ...maj.D, ...maj.bout]],
    rec: [[maj.bout[2], ...maj.V.slice(-3).reverse()]],
    det: [maj.ongle,
          [add(ind.D[0], [-1, 0.6]), [0, 54], [-14, 53.4], [-30, 52.6]],              // le métacarpe de l'index, sous la peau
          [add(maj.D[3], mul(maj.nj(1), -1.6)), add(maj.D[3], mul(maj.nj(1), -4.2))],   // plis de la jointure du milieu
          [add(maj.D[6], mul(maj.nj(2), -1.4)), add(maj.D[6], mul(maj.nj(2), -3.4))]],
    epDet: [0.7, 0.5],
  });

  // 3. L'index, devant le majeur et devant la pierre.
  piece({
    fond: [...ind.contour, [6, 34]],
    rec: [[...ind.D, ...ind.bout, ...ind.V.slice(2).reverse(), [15, 24.4]]],
    det: [ind.ongle,
          [add(ind.D[3], mul(ind.nj(1), -1.6)), add(ind.D[3], mul(ind.nj(1), -4))],
          [add(ind.V[4], mul(ind.nj(1), 0.6)), add(ind.V[4], mul(ind.nj(1), 3))],
          [add(ind.V[8], mul(ind.nj(2), 0.6)), add(ind.V[8], mul(ind.nj(2), 2.6))]],
    epDet: [0.7],
  });

  // 4. Le pouce : du trapèze au poignet, couché sur le dessus de la pierre ; son ventre rejoint la
  //    palmure au milieu de la première phalange.
  const pDos = [[-125, 17.8], [-110, 19.5], [-91, 18.6], ...pou.D.slice(1)];
  // le ventre du pouce s'aplatit sur la pierre : il la suit, 2,5 en dedans de son bord (le pouce est devant)
  const arc = (r, a) => [r * Math.cos(a * Math.PI / 180), r * Math.sin(a * Math.PI / 180)];
  const pVentre = [-100, -114, -128, -142, -155].map(a => arc(32.5, a));
  piece({
    fond: [...pDos, ...pou.bout, ...pVentre, ...palmure.slice(0, 2), [-46, 6], [-60, 16], [-100, 26], [-150, 26]],
    sil: [[...pDos, ...pou.bout]],
    rec: [[pou.bout[2], ...pVentre, ...palmure]],
    det: [pou.ongle,
          [arc(33, -127), arc(36, -129)],                                            // pli de l'articulation du bout
          [add(pou.D[6], mul(pou.nj(2), -1.6)), add(pou.D[6], mul(pou.nj(2), -4))]],
    epDet: [0.7],
  });

  const out = [];
  const [cx, cy] = T([0, 0]);
  out.push(`<circle cx="${cx}" cy="${cy}" r="${R_BOULE * echelle}" fill="${BLANC}" stroke="none"/>`);
  out.push(`<circle cx="${cx}" cy="${cy}" r="${R_BOULE * echelle}" fill="url(#h-pierre)" stroke="${NOIR}" stroke-width="1.4"/>`);
  for (const p of pieces) for (const t of p.sil) out.push(`<path d="${tr(t)}" ${trait(2.4, 'butt')}/>`);
  for (const p of pieces) {
    out.push(`<path d="${tr(p.fond, true)}" ${FOND}/>`);
    for (const t of p.sil) out.push(`<path d="${tr(t)}" ${trait(0.7)}/>`);
    for (const t of p.rec) out.push(`<path d="${tr(t)}" ${trait(1.2)}/>`);
    p.det.forEach((t, i) => out.push(`<path d="${tr(t)}" ${trait((p.epDet || [])[i] || 0.5)}/>`));
  }

  if (construction) {
    const L = (a, b) => { const [p, q] = [T(a), T(b)]; out.push(`<line x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}" stroke="${NOIR}" stroke-width="0.5" stroke-dasharray="3 2"/>`); };
    const O = a => { const p = T(a); out.push(`<circle cx="${p[0]}" cy="${p[1]}" r="${2 * echelle}" fill="none" stroke="${NOIR}" stroke-width="0.5"/>`); };
    [['poignet', 'Mm'], ['Mm', 'Mp'], ['Mp', 'Md'], ['Md', 'Mt'], ['poignet', 'Im'], ['Im', 'Ip'], ['Ip', 'Id'], ['Id', 'It'],
     ['Tc', 'Tm'], ['Tm', 'Ti'], ['Ti', 'Tt']].forEach(([a, b]) => L(C[a], C[b]));
    Object.values(C).forEach(O);
  }
  return out.join('\n');
}

module.exports = (h) => ({
  ref: 'modele',
  titre: 'La boule, de profil côté pouce',
  desc: 'Modèle : la main droite tient une pierre ronde par-dessous ; la pierre dans le creux de la paume, les doigts sur le flanc, le pouce sur le dessus.',
  fichier: '_modeles-boule-construction.svg',
  format: 'pleine',
  disposition: [['a']],
  vues: {
    a: { dessin: z => dessiner(z.l / 2 + 31.5 * 3.2, z.h / 2, 3.2, { construction: !!process.env.MODELE_CONSTRUCTION }) },
  },
});
module.exports.dessiner = dessiner;
