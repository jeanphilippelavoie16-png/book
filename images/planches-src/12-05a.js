// Planche 12-05a — la maison de blocs : tailler et monter (ch. 12, section I-3, points 1 à 6).
// Trois vues, dans l'ordre du chantier :
//   tailler  — le bloc scié à la profondeur de la lame dans la paroi de la fosse, le fond tranché ;
//   spirale  — le premier rang en cercle autour de la fosse, le premier bloc en biseau (rampe), le
//              bloc suivant, plus long, posé sur la pente, et le deuxième rang qui continue, joints
//              croisés, chaque rang penché un peu plus ;
//   cle      — le dernier trou et le bloc taillé à sa forme, descendu de dehors.
// La coupe de la maison finie est sur 12-05b. Cotes : seulement celles du chapitre (bloc de 20 à
// 25 cm d'épaisseur, environ 60 cm de haut une fois debout). La voûte est une chaînette ; ses
// proportions ne sont pas cotées, le chapitre n'en donne pas. Même géométrie que 12-05b.
//
// La charte : la paroi de la fosse, derrière le bloc qu'on taille, en gris loin ; dans la
// spirale, les faces intérieures des blocs (vues par-dessus le rang) en gris loin et les faces
// extérieures du côté droit à l'ombre, la silhouette de l'anneau au trait fort. Le rouge : le
// sens de la pose de la spirale ; le joint du deuxième rang qui tombe au milieu d'un bloc du
// premier, cerclé ; la clé qu'on descend de dehors (une flèche ; la deuxième, symétrique, ôtée).

module.exports = (h) => {
  // ─── La voûte : chaînette, en cm. Surface moyenne du mur, demi-largeur a au pied, hauteur hm.
  const a = 161, hm = 180, t = 22;
  let lo = 20, hi = 2000;
  for (let i = 0; i < 80; i++) { const m = (lo + hi) / 2; if (m * (Math.cosh(a / m) - 1) > hm) lo = m; else hi = m; }
  const A = (lo + hi) / 2, U = Math.sinh(a / A), ST = A * U;          // ST : longueur du méridien
  const mid = s => {
    const x = A * Math.asinh(U - s / A), c = Math.cosh(x / A);
    return { x, z: hm - A * (c - 1), nx: Math.tanh(x / A), nz: 1 / c };
  };
  // Un point du mur à l'abscisse s le long du méridien ; c = +1 face extérieure, -1 face intérieure.
  // Le pied du premier rang est posé à plat sur la neige ; les autres joints suivent la normale.
  const brut = (s, c) => { const m = mid(s); return [m.x + c * m.nx * t / 2, m.z + c * m.nz * t / 2]; };
  const surf = (s, c) => {             // sous 12 cm, on passe en douceur du lit plat au joint normal
    if (s >= 12) return brut(s, c);
    const p = brut(12, c), u = Math.max(s, 0) / 12;
    return [a + c * t / 2 + (p[0] - a - c * t / 2) * u, p[1] * u];
  };
  const SK = ST - 28;                     // bord du dernier trou, fermé par la clé
  const pas = (s1, s2, n) => Array.from({ length: n + 1 }, (_, i) => s1 + (s2 - s1) * i / n);
  const bloc = (s1, s2, sg) => {
    const n = Math.max(2, Math.ceil((s2 - s1) / 6));
    const ext = pas(s1, s2, n).map(s => surf(s, 1)), int = pas(s1, s2, n).map(s => surf(s, -1)).reverse();
    return ext.concat(int).map(([x, z]) => [sg * x, z]);
  };
  const courbe = (s1, s2, sg, c, n = 30) => pas(s1, s2, n).map(s => { const [x, z] = surf(s, c); return [sg * x, z]; });
  const cle = (dz = 0) => {
    const ext = courbe(SK, ST, -1, 1, 8).concat(courbe(ST, SK, 1, 1, 8).slice(1));
    const int = courbe(SK, ST, 1, -1, 8).concat(courbe(ST, SK, -1, -1, 8).slice(1));
    return ext.concat(int).map(([x, z]) => [x, z + dz]);
  };
  const neige = h.a.hachure('neige', 'aucun');
  const neigeB = h.a.hachure('neige', 'arete');
  const blanc = at => at.replace('fill="none"', 'fill="#ffffff"');
  const gris = (at, g) => at.replace('fill="none"', g.split(' ')[0]);

  // ─── Vue 1 : tailler les blocs. Perspective cavalière : X épaisseur, Y fuyant vers le haut à gauche.
  const tG = z => {
    const c = 0.433, s2 = 0.25, X0 = -84, X1 = 100, Y0 = -48, Y1 = 98;
    const k = Math.min((z.l - 8) / (X1 - X0), (z.h - 70) / (Y1 - Y0));
    const ox = (z.l - k * (X1 - X0)) / 2 - k * X0, oy = (z.h - k * (Y1 - Y0)) / 2 - k * Y0;
    const P = (X, Y, Z) => [ox + k * (X - Y * c), oy - k * (Z + Y * s2)];
    return { k, P, L: 70, DY: 85 };
  };

  // L'égoïne, dans le plan du trait du bout (Y = L), vue à plat. Repère de la scie : u le long de
  // la lame, du talon (0) vers la pointe ; v en travers, des dents (0) vers le dos. La lame fait
  // 64 de long, 12 de large au talon et 5 à la pointe ; la poignée fermée est du côté u < 0.
  // Debout, pointe en bas : X = XD + v, Z = ZT - u. Le talon est à ZT au-dessus de la neige.
  const XD = 2, ZT = 15, LAME = 64;
  const larg = u => 12 - 7 * u / LAME;
  const bez = (p0, p1, p2, p3, n = 10) => Array.from({ length: n }, (_, i) => {
    const t = i / n, s = 1 - t;
    return [0, 1].map(j => s * s * s * p0[j] + 3 * s * s * t * p1[j] + 3 * s * t * t * p2[j] + t * t * t * p3[j]);
  });
  const courbeBez = (dep, segs) => {
    const pts = []; let p = dep;
    for (const [c1, c2, q] of segs) { pts.push(...bez(p, c1, c2, q)); p = q; }
    pts.push(p);
    return pts;
  };
  const egoine = (P, L) => {
    const S = ([u, v]) => P(XD + v, L, ZT - u);
    // la poignée fermée, en crosse de pistolet : la corne en haut, la prise qui file vers l'arrière
    const poignee = courbeBez([2, 12], [
      [[0, 13.5], [-2, 15.5], [-4.5, 17]],
      [[-6, 18], [-7.6, 18.8], [-8.6, 18]],
      [[-9.6, 17.2], [-10, 15.6], [-10.5, 14]],
      [[-12, 9.5], [-14, 4.5], [-16, 0.5]],
      [[-17.2, -1.5], [-17, -3.6], [-15, -4]],
      [[-12, -4.4], [-9, -2.6], [-6, -1.3]],
      [[-3, -0.3], [0, 0], [2, 0]],
      [[3.4, 3], [3.4, 9], [2, 12]],
    ]).map(S);
    // le trou de la main, parallèle à la prise
    const A = [-7.2, 13], B = [-11.3, 3], rr = 1.9;
    const ax = B[0] - A[0], ay = B[1] - A[1], al = Math.hypot(ax, ay), nx = -ay / al, ny = ax / al;
    const ang0 = Math.atan2(ny, nx);
    const demi = (c, a0) => Array.from({ length: 13 }, (_, i) => { const a = a0 + Math.PI * i / 12; return [c[0] + rr * Math.cos(a), c[1] + rr * Math.sin(a)]; });
    const trou = demi(B, ang0).concat(demi(A, ang0 + Math.PI)).map(S);
    // la lame hors de la neige : le dos, puis les dents de la neige jusqu'à la poignée
    const uN = ZT;                                     // u où la lame entre dans la neige
    const dos = pas(1, uN, 6).map(u => [u, larg(u)]);
    const dents = [];
    for (let u = uN; u > 2.6; u -= 2.4) { dents.push([u, 0]); if (u - 1.2 > 2.6) dents.push([u - 1.2, -1.1]); }
    dents.push([2.2, 0]);
    const lame = dos.concat(dents).map(S);
    // la lame dans la neige, cachée, jusqu'à la pointe
    const cachee = [[uN, larg(uN)], [LAME, larg(LAME)], [LAME, 0], [uN, 0]].map(S);
    // le va-et-vient de la scie, à côté du dos
    const va = [[-2, 22], [uN - 2, 22]].map(S).map(p => p.map(c => +c.toFixed(1)));
    return { poignee, trou, lame, dents: dents.map(S), cachee, va };
  };

  // ─── Vue 2 : le premier rang et le départ de la spirale, vus de trois quarts.
  const N = 13, D = 2 * Math.PI / N, TH0 = Math.PI / 2 + 0.9 * D, E = 0.5, HT = 180 * E * 2 + 140;
  const sG = z => {
    const k = Math.min((z.l - 16) / (2 * 180), (z.h - 40) / HT);
    const cx = z.l / 2, cy = (z.h - k * HT) / 2 + k * (180 * E + 140);
    const Pr = (r, th, zz) => [cx + k * r * Math.cos(th), cy + k * (E * r * Math.sin(th) - zz)];
    const P3 = (phi, s, c) => { const [r, zz] = surf(s, c); return Pr(r, TH0 - phi, zz); };
    return { k, Pr, P3 };
  };
  const plat = v => () => v;
  const rampe = p => 60 * Math.min(Math.max(p / D, 0), 1);
  const BLOCS = [];
  BLOCS.push({ rang: 1, pa: 0, pb: D, sb: plat(0), st: rampe, couvert: true });              // le biseau, sa pente cachée sous le suivant
  for (let i = 1; i < N; i++) BLOCS.push({ rang: 1, pa: i * D, pb: (i + 1) * D, sb: plat(0), st: plat(60) });
  BLOCS.push({ rang: 2, pa: 0, pb: 1.5 * D, sb: rampe, st: p => rampe(p) + 60 });            // plus long, sur la pente
  for (let j = 1; j <= 2; j++) BLOCS.push({ rang: 2, pa: (j + 0.5) * D, pb: (j + 1.5) * D, sb: plat(60), st: plat(120), fin: j === 2 });
  const vis = (th, s, kind) => {           // normale · direction de vue (0, 1, E)
    const m = mid(Math.max(s, 1));
    if (kind === 'ext') return m.nx * Math.sin(th) + E * m.nz;
    if (kind === 'int') return -(m.nx * Math.sin(th) + E * m.nz);
    if (kind === 'dessus') return -m.nz * Math.sin(th) + E * m.nx;
    return -Math.cos(th);                  // le bout libre, à pb
  };
  const dessinBloc = (g, b) => {
    const ph = pas(b.pa, b.pb, 30), inv = ph.slice().reverse(), pm = (b.pa + b.pb) / 2;
    const face = c => ph.map(p => g.P3(p, b.sb(p), c))
      .concat(pas(b.sb(b.pb), b.st(b.pb), 4).map(s => g.P3(b.pb, s, c)))
      .concat(inv.map(p => g.P3(p, b.st(p), c)))
      .concat(pas(b.st(b.pa), b.sb(b.pa), 4).map(s => g.P3(b.pa, s, c)));
    const th = TH0 - pm, sm = (b.sb(pm) + b.st(pm)) / 2;
    const faces = [
      { d: vis(th, sm, 'ext'), p: face(1), sorte: Math.cos(th) > 0.3 ? 'ombre' : 'blanc' },
      { d: vis(th, sm, 'int'), p: face(-1), sorte: 'loin' },
      { d: vis(th, b.st(pm), 'dessus'), p: ph.map(p => g.P3(p, b.st(p), 1)).concat(inv.map(p => g.P3(p, b.st(p), -1))), sorte: 'blanc' },
    ];
    if (b.couvert) faces.pop();
    if (b.fin) faces.push({ d: vis(TH0 - b.pb, 0, 'bout'),
      p: pas(b.sb(b.pb), b.st(b.pb), 4).map(s => g.P3(b.pb, s, 1)).concat(pas(b.st(b.pb), b.sb(b.pb), 4).map(s => g.P3(b.pb, s, -1))), sorte: 'blanc' });
    return faces;
  };

  // ─── Vue 3 : la clé, en coupe.
  const LEVE = 34;                         // la clé tenue au-dessus de son trou
  const cG = z => {
    const X0 = -112, X1 = 112, Z0 = 122, Z1 = hm + t / 2 + LEVE + 8;
    const k = Math.min((z.l - 8) / (X1 - X0), (z.h - 8) / (Z1 - Z0));
    const ox = (z.l - k * (X1 - X0)) / 2 - k * X0, oy = (z.h - k * (Z1 - Z0)) / 2 + k * Z1;
    return { k, P: ([X, Z]) => [ox + k * X, oy - k * Z] };
  };

  return {
    ref: '12-05a',
    titre: 'La maison de blocs : tailler et monter',
    desc: 'Maison de neige en blocs (iglou), trois vues du chantier. Tailler : dans la paroi de la fosse, le bloc scié à la profondeur de la lame, 20 à 25 cm d’épaisseur, environ 60 cm de haut, le fond tranché net avant de le soulever ; la fosse d’où sortent les blocs devient le plancher. Le premier rang posé en cercle autour de la fosse, chaque bloc penché vers l’intérieur ; le premier bloc taillé en biseau comme une rampe ; le bloc suivant, plus long, posé sur la pente, et le rang qui continue en spirale, joints croisés, chaque bloc appuyé sur les deux du dessous. La clé : le dernier trou au sommet fermé d’un bloc taillé à sa forme, plus large en haut qu’en bas, descendu de dehors ; les joints colmatés de neige écrasée.',
    format: 'pleine',
    disposition: [['tailler', 'spirale'], ['cle']],
    hauteurs: [1.08, 1],
    largeurs: [[1, 1.55], [1]],
    vues: {
      tailler: {
        titre: 'Tailler les blocs',
        dessin: z => {
          const { P, L, DY } = tG(z), out = [];
          // le manteau coupé au premier plan
          out.push(h.chemin([P(0, 0, 0), P(100, 0, 0), P(100, 0, -95), P(-45, 0, -95), P(-45, 0, -60), P(0, 0, -60)], neige, true));
          // la paroi de la fosse, au-delà du bloc : derrière
          out.push(h.chemin([P(0, L, 0), P(0, DY, 0), P(0, DY, -60), P(0, L, -60)], h.a.loin, true));
          // le dessus de la neige, la paroi de la fosse, le plancher de la fosse (en fuyante)
          out.push(h.chemin([P(100, 0, 0), P(100, DY, 0), P(0, DY, 0)], h.a.fin));
          out.push(h.chemin([P(0, 0, 0), P(0, DY, 0)], h.a.detail));
          out.push(h.chemin([P(0, L, -60), P(0, DY, -60)], h.a.detail));
          out.push(h.chemin([P(0, 0, 0), P(0, L, 0)], h.a.arete));
          out.push(h.chemin([P(0, 0, -60), P(0, L, -60)], h.a.arete));
          out.push(h.chemin([P(0, DY, 0), P(0, DY, -60)], h.a.fin));
          out.push(h.chemin([P(-45, 0, -60), P(-45, DY, -60), P(0, DY, -60)], h.a.fin));
          // le profil coupé
          out.push(h.chemin([P(-45, 0, -60), P(0, 0, -60), P(0, 0, 0), P(100, 0, 0)], h.a.contour));
          // les traits de scie du bloc : derrière, au bout, et le fond tranché
          out.push(h.chemin([P(22, 0, 0), P(22, L, 0), P(0, L, 0)], h.a.arete));
          out.push(h.chemin([P(22, 0, 0), P(22, 0, -60), P(0, 0, -60)], h.a.arete));
          out.push(h.chemin([P(0, L, 0), P(0, L, -60)], h.a.arete));
          // l'égoïne, debout dans le trait du bout, en haut de sa course : la poignée fermée, la
          // lame qui s'effile vers la pointe, les dents à l'entrée dans la neige, le reste en tireté
          const eg = egoine(P, L);
          out.push(h.chemin(eg.cachee, h.a.cache));
          out.push(h.chemin(eg.lame, blanc(h.a.arete), true));
          out.push(h.chemin(eg.dents, h.a.arete));
          out.push(h.chemin([P(22, L, 0), P(0, L, 0)], h.a.arete));
          out.push(h.chemin(eg.poignee, blanc(h.a.arete), true));
          out.push(h.chemin(eg.trou, h.a.arete, true));
          out.push(h.geste(`M ${eg.va[0].join(' ')} L ${eg.va[1].join(' ')}`, { double: true }));
          // cotes
          const [ax, ay] = P(0, 0, -74), [bx] = P(22, 0, -74);
          out.push(h.cote(ax, ay, bx, ay, '20 à 25 cm', { cote: 'dessous' }));
          const [vx, vy1] = P(36, 0, 0), [, vy2] = P(36, 0, -60);
          out.push(h.cote(vx, vy1, vx, vy2, 'env. 60 cm'));
          return out.join('\n');
        },
        renvois: z => {
          const { P, L } = tG(z);
          const lame = P(9.5, L, -30), fond = P(0, 28, -60), fosse = P(-26, 72, -60);
          return [
            { n: 1, rond: [lame[0] - 40, lame[1] - 12], cible: lame, texte: 'scier à la profondeur de la lame' },
            { n: 2, rond: [fond[0] - 22, fond[1] + 58], cible: fond, texte: 'trancher le fond net, puis soulever' },
            { n: 3, rond: [fosse[0] - 20, fosse[1] + 36], cible: fosse, texte: 'la fosse devient le plancher' },
          ];
        },
      },
      spirale: {
        titre: 'Le premier rang et la spirale',
        dessin: z => {
          const g = sG(z), out = [];
          // la fosse : le plancher, puis sa paroi du fond sous le premier rang
          // la fosse, vue par-dessus son bord : le plancher, puis sa paroi du fond
          const bord = pas(0, 2 * Math.PI, 48).map(th => g.Pr(150, th, 0));
          out.push('<clipPath id="fosse-rebord"><path fill="none" d="' + bord.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ') + ' Z"/></clipPath>');
          out.push('<g clip-path="url(#fosse-rebord)">');
          out.push(h.chemin(pas(0, 2 * Math.PI, 48).map(th => g.Pr(150, th, -55)), blanc(h.a.detail), true));
          const paroi = pas(Math.PI, 2 * Math.PI, 24).map(th => g.Pr(150, th, 0))
            .concat(pas(2 * Math.PI, Math.PI, 24).map(th => g.Pr(150, th, -55)));
          out.push(h.chemin(paroi, blanc(h.a.detail), true));
          out.push('</g>');
          // les faces cachées d'abord, puis les faces vues, chacune du fond vers l'avant
          const faces = [];
          for (const b of BLOCS) {
            const key = Math.sin(TH0 - (b.pa + b.pb) / 2) * 10 + b.rang * 0.01;
            for (const fc of dessinBloc(g, b)) faces.push({ ...fc, key });
          }
          faces.sort((u, v) => ((u.d > 0) - (v.d > 0)) || (u.key - v.key) || (u.d - v.d));
          // La silhouette de l'anneau au trait fort : le pied devant, les flancs là où la face
          // extérieure tourne, le dessus du premier rang derrière. Tracée sous les faces : leur
          // blanc en couvre le dedans, il n'en reste que le bord, et rien ne passe sur un bloc.
          const bascule = s => { const m = mid(Math.max(s, 1)); return Math.asin(Math.min(1, E * m.nz / m.nx)); };
          const P3s = (th, s) => { const [r, zz] = surf(s, 1); return g.Pr(r, th, zz); };
          const sil = pas(-bascule(0), Math.PI + bascule(0), 64).map(th => P3s(th, 0))
            .concat(pas(0, 60, 12).map(s => P3s(Math.PI + bascule(s), s)))
            .concat(pas(Math.PI + bascule(60), 2 * Math.PI - bascule(60), 64).map(th => P3s(th, 60)))
            .concat(pas(60, 0, 12).map(s => P3s(-bascule(s), s)));
          out.push(h.chemin(sil, h.a.contour, true));
          const remplir = { blanc: blanc(h.a.arete), loin: gris(h.a.arete, h.a.loin), ombre: gris(h.a.arete, h.a.ombre) };
          for (const fc of faces) out.push(h.chemin(fc.p, remplir[fc.sorte], true));
          // le joint du deuxième rang tombe au milieu d'un bloc du premier
          out.push(h.controle(...g.P3(2.5 * D, 60, 1), 13));
          // la suite de la spirale : les blocs suivants se posent par là, sur le premier rang
          const suite = pas(3.75 * D, 5.6 * D, 16).map(p => { const [r, zz] = surf(60, 1); return g.Pr(r - 4, TH0 - p, zz + 16); });
          out.push(h.geste(suite.map((p, i) => (i ? 'L' : 'M') + ' ' + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ')));
          return out.join('\n');
        },
        renvois: z => {
          const g = sG(z);
          const r1 = g.P3(9.5 * D, 30, -1), rp = g.P3(0.72 * D, 16, 1), lg = g.P3(0.95 * D, 90, 1), jt = g.P3(2.5 * D, 92, 1);
          return [
            { n: 4, rond: [r1[0] - 10, r1[1] - 50], cible: r1, texte: 'premier rang penché vers l’intérieur' },
            { n: 5, rond: [rp[0] - 66, rp[1] + 16], cible: rp, texte: 'premier bloc taillé en biseau, en rampe' },
            { n: 6, rond: [lg[0] - 50, lg[1] - 46], cible: lg, texte: 'bloc suivant, plus long, posé sur la pente' },
            { n: 7, rond: [jt[0] + 40, jt[1] + 40], cible: jt, texte: 'joints croisés : chaque bloc sur deux' },
          ];
        },
      },
      cle: {
        titre: 'La clé, en coupe',
        dessin: z => {
          const { P } = cG(z), Pp = pts => pts.map(P), out = [];
          for (const sg of [-1, 1]) {
            out.push(h.chemin(Pp(bloc(140, 180, sg)), neige, true), h.chemin(Pp(bloc(180, SK, sg)), neige, true));
            for (const c of [-1, 1]) out.push(h.chemin(Pp(courbe(140, SK, sg, c)), h.a.contour));
            for (const s of [180, SK]) out.push(h.chemin(Pp([surf(s, -1), surf(s, 1)].map(([x, zz]) => [sg * x, zz])), h.a.arete));
            // la coupure du dessin, en bas
            const [p1, p2] = [surf(140, -1), surf(140, 1)].map(([x, zz]) => [sg * x, zz]);
            const m = [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
            out.push(h.chemin(Pp([p1, p2]), h.a.fin)); void m;
          }
          // la clé, tenue au-dessus de son trou
          out.push(h.chemin(Pp(cle(LEVE)), neigeB, true));
          out.push(h.chemin(Pp(courbe(SK, ST, -1, 1, 8).concat(courbe(ST, SK, 1, 1, 8)).map(([x, zz]) => [x, zz + LEVE])), h.a.contour));
          // elle descend dans le trou
          const e = surf(SK, 1);
          const x = e[0] + 14;
          out.push(h.geste(`M ${P([x, e[1] + LEVE + 4]).join(' ')} L ${P([x, e[1] + 8]).join(' ')}`));
          return out.join('\n');
        },
        renvois: z => {
          const { P } = cG(z), e = surf(SK, 1);
          const c = P([-10, hm + LEVE - 2]);
          const fl = P([e[0] + 14, e[1] + 22]);
          const j = [surf(180, -1), surf(180, 1)].map(([x, zz]) => [-x, zz]);
          const jm = P([(j[0][0] + j[1][0]) / 2, (j[0][1] + j[1][1]) / 2]);
          return [
            { n: 8, rond: [c[0] - 120, c[1] - 20], cible: c, texte: 'clé taillée à la forme du trou' },
            { n: 9, rond: [fl[0] + 110, fl[1] - 20], cible: fl, texte: 'posée de dehors, par un deuxième adulte' },
            { n: 10, rond: [jm[0] - 70, jm[1] + 20], cible: jm, texte: 'joints colmatés de neige écrasée' },
          ];
        },
      },
    },
  };
};
