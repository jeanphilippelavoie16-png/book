// Planche 50-10 — Le collet de noyade du castor (chapitre 50, § 9 « Fabriquer l'engin : le collet
// de noyade »). Sans chiffre : le chapitre n'en donne aucun pour ce montage.
// Refaite au redessin du 14 octobre (groupe E, JP : « peu compréhensible ») : les deux coupes sont
// prises le long de la coulée, pour que le castor s'y voie de profil, et le plan suit.
// Armé : la perche plantée en biais, de l'arête de la rive au creux ; sous l'eau, une roche posée
// sur le rebord de la rive pend à un anneau lâche passé autour de la perche ; du haut de l'anneau,
// un câble court mène à la boucle, debout dans la coulée ; le castor y arrive en nageant, le museau
// devant la boucle.
// Pris : même cadrage. La roche a glissé le long de la perche jusqu'au creux et repose sur le fond ;
// le castor, la boucle serrée au cou, tire vers la surface au bout du câble tendu, plus court que la
// profondeur : il reste sous l'eau.
// Plan : la hutte sur la rive et sa sortie sous l'eau ; la coulée qui descend vers la réserve de
// branches ; la perche le long de la coulée, la roche au bout côté rive, la boucle en travers.
// Détails : l'anneau et la roche ceinturée ; la coulisse en rondelle pliée en S (inchangée).
module.exports = (h) => {
  const f = (v) => Math.round(v * 10) / 10;
  const NOIR = '#1A1A1A';
  const blanc = (a) => a.replace('fill="none"', 'fill="#FFFFFF"');
  const sans = (a) => a.replace(/stroke="[^"]*" stroke-width="[^"]*"/, 'stroke="none"');
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const mul = (a, k) => [a[0] * k, a[1] * k];
  const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  const pt = (p) => `${f(p[0])} ${f(p[1])}`;
  const RAD = Math.PI / 180;
  const T2 = `fill="none" stroke="${NOIR}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"`;
  const CABLE = T2.replace('"2"', '"1.6"');
  // Courbe lisse (Catmull-Rom) par une suite de points.
  const lisse = (pts, ferme = false) => {
    const n = pts.length;
    const P = (i) => (ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))]);
    let d = `M ${pt(pts[0])}`;
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
      d += ` C ${pt([p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6])} ${pt([p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6])} ${pt(p2)}`;
    }
    return d + (ferme ? ' Z' : '');
  };
  const poly = (pts, ferme = false) => pts.map((p, i) => `${i ? 'L' : 'M'} ${pt(p)}`).join(' ') + (ferme ? ' Z' : '');
  const surProfil = (G, x) => {
    for (let i = 1; i < G.length; i++) if (x <= G[i][0]) return G[i - 1][1] + (G[i][1] - G[i - 1][1]) * (x - G[i - 1][0]) / (G[i][0] - G[i - 1][0]);
    return G[G.length - 1][1];
  };
  const rnd = (i) => { const x = Math.sin(i * 12.9898) * 43758.5453; return x - Math.floor(x); };

  // ─── La roche : un galet bosselé, plus large que haut, assis sur son dessous ; la face de droite à
  // l'ombre (lumière en haut à gauche). c : le centre ; a, b : les demi-axes. ───
  const GALET = [[-1, 0.3], [-0.95, -0.24], [-0.7, -0.66], [-0.3, -0.9], [0.1, -0.84], [0.46, -0.96], [0.8, -0.7], [0.98, -0.2],
    [0.96, 0.36], [0.74, 0.76], [0.24, 0.9], [-0.36, 0.9], [-0.8, 0.72]];
  // La grosse roche du détail : un bloc irrégulier, le sommet décalé à gauche, le dessous assis.
  const BLOC = [[-1, 0.42], [-0.96, -0.14], [-0.74, -0.6], [-0.34, -0.94], [0.08, -0.98], [0.44, -0.8], [0.76, -0.5], [0.97, -0.06],
    [1, 0.44], [0.8, 0.82], [0.3, 0.94], [-0.34, 0.93], [-0.8, 0.8]];
  const bloc = (c, a, b) => {
    const q = ([x, y]) => [c[0] + x * a, c[1] + y * b];
    const C = BLOC.map(q);
    const out = [h.path(lisse(C, true), h.a.blanc)];
    out.push(h.path(lisse([[0.44, -0.8], [0.76, -0.5], [0.97, -0.06], [1, 0.44], [0.8, 0.82], [0.3, 0.94], [0.4, 0.5], [0.5, 0.06], [0.4, -0.42]].map(q), true), h.a.ombre));
    out.push(h.path(lisse(C, true), h.a.contour));
    // l'arête entre la face éclairée et la face à l'ombre, puis deux fissures
    out.push(h.path(lisse([[0.08, -0.98], [0.36, -0.5], [0.46, 0.04], [0.36, 0.56], [0.3, 0.94]].map(q)), h.a.arete));
    out.push(h.path(lisse([[-0.78, -0.3], [-0.5, -0.46], [-0.3, -0.72]].map(q)), h.a.detail));
    out.push(h.path(lisse([[-0.62, 0.62], [-0.36, 0.5]].map(q)), h.a.detail));
    return out.join('\n');
  };
  const roche = (c, a, b, o = {}) => {
    const q = ([x, y]) => [c[0] + x * a * (o.miroir ? -1 : 1), c[1] + y * b];
    const C = GALET.map(q);
    if (o.fantome) return h.path(lisse(C, true), h.a.cache);
    const out = [h.path(lisse(C, true), h.a.blanc)];
    const ombre = [[0.46, -0.96], [0.8, -0.7], [0.98, -0.2], [0.96, 0.36], [0.74, 0.76], [0.24, 0.9], [0.3, 0.5], [0.52, 0.02], [0.5, -0.5]].map(q);
    out.push(h.path(lisse(ombre, true), h.a.ombre));
    out.push(h.path(lisse(C, true), o.trait || h.a.contour));
    // deux facettes à peine marquées, du côté de la lumière
    out.push(h.path(lisse([[-0.72, -0.2], [-0.42, -0.5], [-0.08, -0.6]].map(q)), h.a.detail));
    if (!o.petite) out.push(h.path(lisse([[-0.62, 0.36], [-0.3, 0.2]].map(q)), h.a.detail));
    return out.join('\n');
  };

  // ─── Le castor de profil, qui nage. Repère local : museau en (0, 0), queue vers +x (bout à 100),
  // ventre vers +y. T : repère local → vue. Contour à 1,6 : il n'est pas l'objet du geste. ───
  const castor = (T, o = {}) => {
    const C = `fill="#FFFFFF" stroke="${NOIR}" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"`;
    const M = (pts) => pts.map(T);
    const out = [];
    // La queue : une palette plate, vue un peu de dessus pour qu'on voie sa face écailleuse.
    const queue = M([[69, -6.2], [74, -7.8], [82, -9], [90.5, -8.8], [96.6, -6.8], [99.8, -3.4], [99.3, 0.2], [96, 2.6], [88.5, 3.6], [80, 3], [74, 1.4], [69.5, 0.2]]);
    out.push(h.path(lisse(queue, true), C));
    out.push(h.path(lisse(queue, true), h.a.hachure('grillage', 'aucun')));
    out.push(h.path(lisse(queue, true), C.replace('#FFFFFF', 'none')));
    // Le corps et la tête, d'un seul contour.
    const corps = M([[0, 0], [0.6, -3], [2.6, -5.4], [6.5, -7.4], [11, -8.6], [16, -9.4], [21, -9.8], [28, -11.6], [36, -14.4], [45, -16.4], [54, -17],
      [62, -15.4], [67.4, -11.6], [70.4, -6.4], [70.2, -0.4], [67.6, 4.6], [62, 9.4], [53, 12.8], [43, 14], [33, 13.4], [26, 11.6], [19, 9.6],
      [13.6, 8.2], [8.4, 6.6], [4, 4.8], [1.2, 3.2], [0.1, 1.6]]);
    out.push(h.path(lisse(corps, true), C));
    // L'oreille, petite et ronde, derrière l'œil.
    out.push(h.path(lisse(M([[15.6, -8.4], [16, -11.2], [18.2, -12.2], [20, -10.6], [20.2, -9.2]])), C));
    // L'œil, haut sur la tête ; la narine ; les incisives sous la lèvre.
    const oe = T([8.4, -4.6]);
    out.push(h.cercle(oe[0], oe[1], 1.3, h.a.plein));
    out.push(h.path(lisse(M([[0.9, -1.6], [2.2, -2.6]])), h.a.detail));
    out.push(h.path(`M ${pt(T([1.4, 2.4]))} L ${pt(T([1.6, 5.4]))} L ${pt(T([4.2, 5.2]))} L ${pt(T([3.8, 3.2]))}`, `fill="#FFFFFF" stroke="${NOIR}" stroke-width="0.7" stroke-linejoin="round"`));
    // La patte avant, repliée contre la poitrine.
    out.push(h.path(lisse(M([[23.5, 10.8], [24.4, 13.6], [22.4, 15.8], [18.6, 16.4], [16.8, 15.6], [17.6, 14.4], [20.2, 13.6], [21.4, 11.4]]), true), C));
    // La cuisse, puis le pied arrière, grand et palmé, qui file derrière.
    out.push(h.path(lisse(M([[46, -3], [55, -1.6], [60.4, 3.8], [61.4, 9.4]])), h.a.detail));
    const pied = M([[59.4, 9.2], [64, 9.2], [72, 8.6], [79, 7.2], [84.6, 6], [86.8, 7.8], [85.4, 9.8], [87.8, 11.6], [86, 13.4], [87.6, 15.6], [84.6, 16.6],
      [78, 15], [70, 13.6], [63, 12.6], [59.4, 11.6]]);
    out.push(h.path(lisse(pied, true), C));
    out.push(h.path([[[79.6, 8.6], [84.4, 8.2]], [[79.8, 11.2], [85.6, 11.6]], [[79.4, 13.8], [85.4, 15]]]
      .map(([a, b]) => `M ${pt(T(a))} L ${pt(T(b))}`).join(' '), h.a.fin));
    // La boucle serrée au cou : un tour de câble de la nuque à la gorge.
    if (o.boucle) {
      const cou = [];
      for (let i = 0; i < 24; i++) { const t = (i / 24) * 2 * Math.PI; cou.push(T([20.4 + 1.8 * Math.cos(t), 0 + 10.2 * Math.sin(t)])); }
      out.push(h.path(lisse(cou, true), T2));
    }
    return out.join('\n');
  };
  // Le repère d'un castor : museau en m, tourné de ang degrés (0 : il regarde à gauche), échelle k.
  const repere = (m, ang, k) => {
    const c = Math.cos(ang * RAD), s = Math.sin(ang * RAD);
    return (p) => [m[0] + k * (p[0] * c - p[1] * s), m[1] + k * (p[0] * s + p[1] * c)];
  };
  // La coulisse vue de loin : un petit losange noir.
  const verrou = (l) => h.path(poly([[l[0] - 3, l[1] - 1.5], [l[0] + 2, l[1] - 3.5], [l[0] + 3.5, l[1] + 1.5], [l[0] - 1.5, l[1] + 3.5]], true), h.a.plein);

  const RA = 19, RB = 14;                                     // la roche des coupes
  // ─── Le site, le même pour « Armé » et « Pris » : une coupe le long de la coulée ───
  const KC = 1.12;                                            // l'échelle du castor
  const site = (z) => {
    const ys = 56;                                            // la surface de l'eau
    const ang = 50 * RAD;
    const u = [Math.cos(ang), Math.sin(ang)];                 // le long de la perche, vers le creux
    const nb = [-Math.sin(ang), Math.cos(ang)];               // de travers, côté dessous (la rive)
    const nh = [Math.sin(ang), -Math.cos(ang)];               // de travers, côté dessus (l'eau libre)
    const demi = 4;                                           // demi-épaisseur de la perche
    const crete = [30, 36];                                   // l'arête de la rive, où la perche s'appuie
    const E = add(crete, mul(nb, -demi));                     // l'axe de la perche au droit de l'arête
    const P = (s) => add(E, mul(u, s));
    const yb = z.h - 16;                                      // le fond du creux
    // La rive, creusée sous l'arête : un rebord sous l'eau où la roche est posée, puis le fond descend.
    const G = [[0, 36], [22, 36], [crete[0], crete[1] + 0.5], [29, 46], [26, ys], [20, 68], [14, 80], [12, 92], [14, 100], [40, 101], [62, 100.5],
      [66, 104], [72, 124], [82, 150], [98, 178], [120, 206], [146, 236], [170, 264], [190, yb - 10], [208, yb - 1], [230, yb],
      [262, yb + 0.5], [z.l, yb - 1]];
    let sV = 0;
    for (let s = 20; s < 800; s += 0.5) { const p = P(s); if (p[1] > surProfil(G, p[0])) { sV = s; break; } }
    // L'anneau autour de la perche : haut, côté eau libre (le câble) ; bas, côté rive (la roche).
    const anneau = (s) => ({ c: add(P(s), mul(nb, 7)), haut: add(P(s), mul(nh, demi)), bas: add(P(s), mul(nb, 18)) });
    const sA = 32;                                            // l'anneau armé, sous la surface
    const A = anneau(sA);
    const rocheA = [35, 101 - 0.9 * RB];                      // pendue à l'anneau, posée sur le rebord
    const boucle = { c: [148, 124], rx: 7, ry: 20 };
    const lock = [boucle.c[0], boucle.c[1] - boucle.ry];      // la coulisse, en haut de la boucle
    const Lc = Math.hypot(lock[0] - A.haut[0], lock[1] - A.haut[1]) * 1.05;   // la longueur du câble
    // Au creux : l'anneau arrêté au pied de la perche ; la roche couchée sur le fond, sous la perche.
    const sF = sV - 20;
    const F = anneau(sF);
    const xr = P(sV)[0] - 32;
    const rocheF = [xr, surProfil(G, xr) - 0.86 * RB];
    return { ys, u, nb, nh, demi, crete, E, P, G, yb, sV, anneau, sA, A, rocheA, boucle, lock, Lc, sF, F, rocheF };
  };
  // Le castor pris : il tire vers la surface, la gorge au bout du câble tendu.
  const GORGE = [20.4, 10.2], ANG_PRIS = 62;
  const castorPris = (S) => {
    const dir = [Math.sin(-4 * RAD), -Math.cos(-4 * RAD)];      // le câble tendu, presque droit vers le haut
    const gorge = add(S.F.haut, mul(dir, S.Lc));
    const T0 = repere([0, 0], ANG_PRIS, KC);
    const museau = sub(gorge, T0(GORGE));
    return { gorge, T: repere(museau, ANG_PRIS, KC) };
  };

  // La perche, avec ses deux bouts : le haut qui dépasse au-dessus de la rive, le pied planté (caché).
  const perche = (S) => {
    const out = [];
    const bord = (s, k) => add(S.P(s), mul(S.nb, S.demi * k));
    const s0 = -22, s1 = S.sV, s2 = S.sV + 18;
    out.push(h.chemin([bord(s0, -1), bord(s1, -1), bord(s1, 1), bord(s0, 1)], blanc(h.a.contour), true));
    out.push(h.chemin([bord(s1, -1), bord(s2, -1), bord(s2, 1), bord(s1, 1)], h.a.cache));
    out.push(h.path(poly([S.P(s0 + 6), S.P(s1 - 8)]), h.a.fin));
    return out.join('\n');
  };
  // L'anneau, vu de côté : une ellipse lâche autour de la perche. brin : 'derriere' ou 'devant'.
  const anneauCoupe = (S, s, brin, attr = T2) => {
    const a = S.anneau(s), pts = [];
    const t0 = brin === 'devant' ? -Math.PI / 2 : Math.PI / 2;
    for (let i = 0; i <= 24; i++) {
      const t = t0 + (i / 24) * Math.PI;
      pts.push(add(a.c, add(mul(S.nb, 11 * Math.sin(t)), mul(S.u, 4 * Math.cos(t)))));
    }
    return h.chemin(pts, attr);
  };
  // La roche pendue à l'anneau : deux tours autour de la roche, les bouts torsadés jusqu'à l'anneau.
    const rocheAttachee = (R, bas, o = {}) => {
    const out = [];
    const haut = [R[0] + 2, R[1] - RB * 0.86];
    if (o.fantome) {
      out.push(roche(R, RA, RB, { fantome: true }));
      out.push(h.path(poly([bas, haut]), h.a.cache));
      return out.join('\n');
    }
    out.push(roche(R, RA, RB, { petite: true, miroir: o.miroir }));
    [-0.02, 0.3].forEach((dy) => out.push(h.path(lisse([[R[0] - RA * 0.97, R[1] + RB * (dy - 0.2)], [R[0] - RA * 0.3, R[1] + RB * (dy + 0.12)], [R[0] + RA * 0.4, R[1] + RB * (dy + 0.1)], [R[0] + RA * 0.98, R[1] + RB * (dy - 0.24)]]), h.a.arete)));
    out.push(h.path(poly([bas, haut]), T2));
    return out.join('\n');
  };

  // Le décor : l'eau, puis la rive et le fond en coupe.
  const sol = (S, z) => {
    const out = [];
    const G = S.G;
    let x0 = 10;
    for (let i = 2; i < 8; i++) if ((G[i][1] - S.ys) * (G[i + 1][1] - S.ys) <= 0 && G[i + 1][1] !== G[i][1]) x0 = G[i][0] + (G[i + 1][0] - G[i][0]) * (S.ys - G[i][1]) / (G[i + 1][1] - G[i][1]);
    const sousEau = G.filter((p) => p[1] > S.ys);
    out.push(h.chemin([[x0, S.ys], [z.l, S.ys], ...sousEau.slice().reverse()], sans(h.a.hachure('eau')), true));
    out.push(h.chemin([...G, [z.l, z.h], [0, z.h]], sans(h.a.hachure('terre')), true));
    out.push(h.chemin(G, h.a.contour));
    out.push(h.ligne(x0, S.ys, z.l, S.ys, h.a.arete));
    return out.join('\n');
  };

  return {
    ref: '50-10',
    titre: 'Le collet de noyade du castor',
    desc: 'Deux coupes de l’étang prises le long de la coulée, au même cadrage. Armé : une perche plantée en biais, de l’arête de la rive au creux ; sous l’eau, une roche ceinturée de câble, posée sur le rebord de la rive, pend à un anneau lâche passé autour de la perche ; du haut de l’anneau, un câble court mène à la boucle, debout dans la coulée ; le castor arrive en nageant, le museau devant la boucle. Pris : la roche a glissé le long de la perche jusqu’au creux ; le castor, la boucle serrée au cou, tire vers la surface au bout du câble tendu, plus court que la profondeur, et reste sous l’eau. En plan, la hutte sur la rive et sa sortie sous l’eau, la coulée qui descend vers la réserve de branches, la perche couchée le long de la coulée avec la roche au bout côté rive, et la boucle en travers de la coulée. De près, la roche ceinturée de deux tours de câble, les bouts torsadés jusqu’à l’anneau lâche autour de la perche ; puis la coulisse : une rondelle pliée en S, le bout fixe serré dans le repli, le câble courant passé de biais par le trou.',
    format: 'pleine',
    disposition: [['arme', 'pris'], ['plan', 'ancrage', 'coulisse']],
    hauteurs: [11, 10],
    largeurs: [[1, 1], [226, 150, 180]],
    vues: {
      arme: {
        titre: 'Armé',
        dessin: (z) => {
          const S = site(z), out = [sol(S, z)];
          out.push(anneauCoupe(S, S.sA, 'derriere', h.a.cache));
          out.push(rocheAttachee(S.rocheA, S.A.bas));
          out.push(perche(S));
          out.push(anneauCoupe(S, S.sA, 'devant'));
          // Le câble, du haut de l'anneau à la coulisse de la boucle, un peu lâche.
          const c0 = S.A.haut, c1 = S.lock;
          out.push(h.path(`M ${pt(c0)} Q ${pt([(c0[0] + c1[0]) / 2, (c0[1] + c1[1]) / 2 + 8])} ${pt(c1)}`, CABLE));
          // Le castor qui arrive en nageant, le museau devant la boucle.
          const B = S.boucle;
          out.push(castor(repere([B.c[0] + 10, B.c[1] + 2], -3, KC)));
          // La boucle, debout dans la coulée : vue presque de chant, elle barre le chemin.
          out.push(h.ellipse(B.c[0], B.c[1], B.rx, B.ry, T2));
          out.push(verrou(S.lock));
          out.push(h.controle(B.c[0] + 3, B.c[1], 25));
          return out.join('\n');
        },
        renvois: (z) => {
          const S = site(z);
          const p1 = add(S.P(250), mul(S.nh, S.demi));
          const B = S.boucle;
          return [
            { n: 1, rond: [p1[0] + 34, p1[1] - 18], cible: p1, texte: 'perche plantée en biais' },
            { n: 2, rond: [14, 140], cible: [S.rocheA[0] - 10, S.rocheA[1] + 10], texte: 'roche pendue à l’anneau' },
            { n: 3, rond: [B.c[0] + 30, B.c[1] + 48], cible: [B.c[0] + 2, B.c[1] + B.ry], texte: 'boucle debout, face à la bête' },
          ];
        },
      },

      pris: {
        titre: 'Pris',
        dessin: (z) => {
          const S = site(z), out = [sol(S, z)];
          // Où elle était : la roche et l'anneau armés, en tireté.
          out.push(rocheAttachee(S.rocheA, S.A.bas, { fantome: true }));
          out.push(anneauCoupe(S, S.sA, 'devant', h.a.cache));
          // La roche arrivée au creux, posée sur le fond.
          out.push(anneauCoupe(S, S.sF, 'derriere', h.a.cache));
          out.push(rocheAttachee(S.rocheF, S.F.bas));
          out.push(perche(S));
          out.push(anneauCoupe(S, S.sF, 'devant'));
          // La roche a glissé le long de la perche.
          const f0 = add(S.P(S.sA + 26), mul(S.nh, 13)), f1 = add(S.P(S.sF - 24), mul(S.nh, 13));
          out.push(h.fleche(poly([f0, f1])));
          // Le castor, la boucle serrée au cou, tenu sous l'eau par le câble tendu.
          const { gorge, T } = castorPris(S);
          out.push(h.path(poly([S.F.haut, gorge]), CABLE));
          out.push(castor(T, { boucle: true }));
          out.push(verrou(gorge));
          return out.join('\n');
        },
        renvois: (z) => {
          const S = site(z), { gorge, T } = castorPris(S);
          const dos = T([50, -16.6]);
          const mc = lerp(S.F.haut, gorge, 0.42);
          return [
            { n: 4, rond: [S.rocheF[0] - 44, S.rocheF[1] + 4], cible: [S.rocheF[0] - RA + 1, S.rocheF[1] + 2], texte: 'roche glissée au creux' },
            { n: 5, rond: [Math.min(z.l - 12, dos[0] + 26), dos[1] - 30], cible: dos, texte: 'castor pris, tenu sous l’eau' },
            { n: 6, rond: [mc[0] + 36, mc[1] + 44], cible: [mc[0] + 1, mc[1] + 22], texte: 'câble plus court que le creux' },
          ];
        },
      },

      plan: {
        titre: 'L’étang, vu de dessus',
        dessin: (z) => {
          const out = [];
          const rive = [[30, 0], [26, 44], [32, 96], [27, 140], [33, 190], [28, 232], [31, z.h]];
          out.push(h.chemin([...rive, [z.l, z.h], [z.l, 0]], sans(h.a.hachure('eau')), true));
          out.push(h.chemin([...rive, [0, z.h], [0, 0]], sans(h.a.hachure('terre')), true));
          out.push(h.chemin(rive, h.a.contour));
          // La coulée, sous l'eau : de la sortie de la hutte, elle descend vers la réserve.
          const so = [98, 86];                                   // la sortie, dans le flanc côté étang
          const coulee = `M ${so[0] + 6} ${so[1] + 8} C 120 116 132 140 146 166 C 160 192 172 210 184 226`;
          out.push(h.path(coulee, h.a.cache));
          // La hutte, à cheval sur la rive : un dôme de bâtons.
          const hc = [60, 56], rx = 50, ry = 44;
          const bord = [];
          for (let i = 0; i < 24; i++) {
            const t = (i / 24) * 2 * Math.PI, k = [1, 0.96, 1.03, 0.97, 1.02, 0.95][i % 6];
            bord.push([hc[0] + rx * k * Math.cos(t), hc[1] + ry * k * Math.sin(t)]);
          }
          out.push(h.path(lisse(bord, true), blanc(h.a.contour)));
          const bat = [];
          let i = 0;
          for (let gy = -36; gy <= 36; gy += 8) {
            for (let gx = -44; gx <= 44; gx += 9) {
              i++;
              const cx = hc[0] + gx + (rnd(i) - 0.5) * 6, cy = hc[1] + gy + (rnd(i + 99) - 0.5) * 5;
              if (((cx - hc[0]) / (rx - 8)) ** 2 + ((cy - hc[1]) / (ry - 8)) ** 2 > 0.85) continue;
              if (Math.hypot(cx - so[0], cy - so[1]) < 18) continue;
              const a = rnd(i + 7) * Math.PI, L = 10 + rnd(i + 3) * 9;
              bat.push(`M ${f(cx - Math.cos(a) * L / 2)} ${f(cy - Math.sin(a) * L / 2)} l ${f(Math.cos(a) * L)} ${f(Math.sin(a) * L)}`);
            }
          }
          out.push(h.path(bat.join(' '), h.a.detail));
          out.push(h.path(`M ${so[0] - 13} ${so[1] + 6} Q ${so[0] - 9} ${so[1] - 12} ${so[0] + 7} ${so[1] - 10} Q ${so[0] + 10} ${so[1] + 2} ${so[0] + 2} ${so[1] + 11} Z`, h.a.plein));
          // La réserve de branches, dans l'eau profonde.
          const rv = [];
          for (let j = 0; j < 14; j++) {
            const x = 158 + (j * 37) % 50, y = 222 + (j * 23) % 40;
            const a = -0.9 + ((j * 0.47) % 1.8), L = 18 + (j % 3) * 6;
            const x2 = Math.min(z.l - 4, x + Math.cos(a) * L), y2 = Math.min(z.h - 4, y + Math.sin(a) * L * 0.6);
            rv.push(`M ${f(x)} ${f(y)} L ${f(x2)} ${f(y2)}`);
            const m = [(x + x2) / 2, (y + y2) / 2];
            rv.push(`M ${f(m[0])} ${f(m[1])} l ${f(Math.cos(a - 0.6) * 7)} ${f(Math.sin(a - 0.6) * 7)}`);
          }
          out.push(h.path(rv.join(' '), h.a.arete));
          // La perche, couchée le long de la coulée, de la rive vers le creux ; la roche au bout côté rive ;
          // le câble court ; la boucle debout en travers de la coulée, vue de dessus : de chant.
          const p0 = [14, 120], p1 = [170, 252];
          const up = [(p1[0] - p0[0]), (p1[1] - p0[1])], lp = Math.hypot(up[0], up[1]);
          const uu = [up[0] / lp, up[1] / lp], nn = [-uu[1], uu[0]];
          const e = 3.2;
          out.push(h.chemin([add(p0, mul(nn, e)), add(p1, mul(nn, e)), add(p1, mul(nn, -e)), add(p0, mul(nn, -e))], blanc(h.a.arete), true));
          const ra = add(p0, mul(uu, 30));                        // l'anneau, sous l'eau, près de la rive
          out.push(roche(add(ra, mul(nn, 9)), 9, 7, { k: 0.4, trait: h.a.arete }));
          out.push(h.ellipse(ra[0], ra[1], 5, 5, h.a.arete));
          const bc = [137.8, 150.6];                              // la boucle, sur la coulée, en travers
          out.push(h.path(`M ${pt(add(ra, mul(nn, -5)))} Q ${pt([(ra[0] + bc[0]) / 2 + 8, (ra[1] + bc[1]) / 2 - 10])} ${pt(add(bc, [-2, -6]))}`, h.a.arete));
          const ang = 62;                                         // la direction de la coulée à la boucle
          out.push(`<ellipse cx="${bc[0]}" cy="${bc[1]}" rx="2.6" ry="13" transform="rotate(${f(ang)} ${bc[0]} ${bc[1]})" fill="#FFFFFF" stroke="${NOIR}" stroke-width="2"/>`);
          return out.join('\n');
        },
        renvois: (z) => [
          { n: 7, rond: [146, 22], cible: [98, 40], texte: 'hutte' },
          { n: 8, rond: [156, 76], cible: [108, 84], texte: 'sortie de la hutte, sous l’eau' },
          { n: 9, rond: [z.l - 14, 200], cible: [z.l - 26, 226], texte: 'réserve de branches' },
          { n: 10, rond: [190, 140], cible: [148, 150], texte: 'coulée, la boucle en travers' },
        ],
      },

      ancrage: {
        titre: 'L’anneau, de près',
        dessin: (z) => {
          const out = [];
          const ang = 24 * RAD;
          const u = [Math.cos(ang), Math.sin(ang)], nb = [-Math.sin(ang), Math.cos(ang)];
          const O = [0, 30], C = (t) => add(O, mul(u, t));
          const e = 12;                                         // demi-épaisseur de la perche
          const bordP = (t, k) => add(C(t), mul(nb, e * k));
          const dist = (p) => (p[0] - O[0]) * nb[0] + (p[1] - O[1]) * nb[1];
          // L'anneau : un tour de câble bien plus grand que la perche ; il repose dessus et pend, avec du jeu.
          const tA = 76, Rr = 27, pr = 11;
          const cA = add(C(tA), mul(nb, Rr - e));
          const ring = (t) => add(cA, add(mul(nb, -Rr * Math.cos(t)), mul(u, pr * Math.sin(t))));
          const B = ring(Math.PI);                              // le bas de l'anneau, où ses bouts se torsadent
          const derr = [];
          for (let i = 0; i <= 40; i++) derr.push(ring(Math.PI + (i / 40) * Math.PI));
          const vu = derr.filter((p) => dist(p) >= e - 1);
          const cache = derr.filter((p) => dist(p) < e + 1);
          out.push(h.formes.corde(vu.filter((p, i) => i % 2 === 0 || i === vu.length - 1), { ep: 3.6, debut: 'ouvert', fin: 'ouvert' }));
          const casse = (t, s) => {
            const a = bordP(t, -1), b = bordP(t, 1), q = [];
            for (let i = 0; i <= 4; i++) { const k = i / 4, w = (i % 2 ? 3 : -3) * s; q.push(add(lerp(a, b, k), mul(u, w))); }
            return q;
          };
          const t0 = 4, t1 = (z.l + 8) / u[0];
          out.push(h.chemin([...casse(t0, 1), ...casse(t1, -1).reverse()], h.a.blanc, true));
          const lisiere = (t, sg) => add(lerp(bordP(t, -1), bordP(t, 1), 0.725), mul(u, 2.4 * sg));
          out.push(h.chemin([lisiere(t0, 1), casse(t0, 1)[3], casse(t0, 1)[4], casse(t1, -1)[4], casse(t1, -1)[3], lisiere(t1, -1)], h.a.ombre, true));
          out.push(h.chemin([...casse(t0, 1), ...casse(t1, -1).reverse()], h.a.arete, true));
          [-6, 0, 5].forEach((k, i) => out.push(h.path(poly([add(C(t0 + 10 + i * 7), mul(nb, k)), add(C(t1 - 12 - i * 6), mul(nb, k))]), h.a.fin)));
          out.push(h.path(poly(cache), h.a.cache));
          const devant = [];
          for (let i = 0; i <= 40; i++) devant.push(ring((i / 40) * Math.PI));
          out.push(h.formes.corde(devant.filter((p, i) => i % 2 === 0), { ep: 3.6, debut: 'ouvert', fin: 'ouvert' }));
          // Le câble vers la boucle part du haut de l'anneau, par-dessus la perche.
          const Ht = ring(0);
          out.push(h.formes.corde([Ht, [Ht[0] + 16, Ht[1] - 10], [Ht[0] + 46, Ht[1] - 20]], { ep: 3.4, debut: 'ouvert', fin: 'fixe', torons: true }));
          // La roche, ceinturée de deux tours de câble ; les deux bouts torsadés au-dessus, jusqu'à l'anneau.
          const rc = [72, 218], ra = 62, rb = 42;
          out.push(bloc(rc, ra, rb));
          const ceinture = (dy) => [[rc[0] - ra * 0.99, rc[1] + dy - 2], [rc[0] - ra * 0.55, rc[1] + dy + 10], [rc[0], rc[1] + dy + 13], [rc[0] + ra * 0.55, rc[1] + dy + 8], [rc[0] + ra * 0.98, rc[1] + dy - 4]];
          out.push(h.formes.corde(ceinture(-6), { ep: 3.6, debut: 'ouvert', fin: 'ouvert' }));
          out.push(h.formes.corde(ceinture(4), { ep: 3.6, debut: 'ouvert', fin: 'ouvert' }));
          const T0 = [B[0] + 3, rc[1] - rb - 10];
          out.push(h.formes.corde([[rc[0] - 13, rc[1] + 6], [rc[0] - 12, rc[1] - 20], [T0[0] - 3, T0[1] + 12], T0], { ep: 3.4, debut: 'ouvert', fin: 'ouvert' }));
          out.push(h.formes.corde([[rc[0] + 3, rc[1] + 7], [rc[0] + 1, rc[1] - 20], [T0[0] + 3, T0[1] + 12], T0], { ep: 3.4, debut: 'ouvert', fin: 'ouvert' }));
          out.push(h.formes.corde([T0, lerp(T0, B, 0.5), B], { ep: 6.5, debut: 'ouvert', fin: 'ouvert', torons: true }));
          // Le sens où tout glisse, quand la bête tire.
          const f0 = add(C(98), mul(nb, -26)), f1 = add(C(150), mul(nb, -26));
          out.push(h.fleche(poly([f0, f1])));
          return out.join('\n');
        },
        renvois: (z) => {
          const u = [Math.cos(24 * RAD), Math.sin(24 * RAD)], nb = [-u[1], u[0]];
          const cA = add(add([0, 30], mul(u, 76)), mul(nb, 15));
          const g = add(cA, mul(u, -11));
          return [
            { n: 11, rond: [14, 126], cible: [f(g[0] - 1), f(g[1] + 2)], texte: 'anneau lâche : du jeu' },
            { n: 12, rond: [z.l - 12, z.h - 12], cible: [122, 246], texte: 'roche ceinturée, deux tours' },
          ];
        },
      },

      coulisse: {
        titre: 'La coulisse',
        dessin: (z) => {
          const out = [];
          // La rondelle pliée en S, en perspective. X vers la droite, Y en fuite, Z vers le haut.
          const R = 52, a = 0.3, al = 58 * Math.PI / 180, O = [80, 50];
          const ey = [0.5, -0.36];
          const P3 = ([X, Y, Z]) => [O[0] + R * (X + ey[0] * Y), O[1] + R * (-Z + ey[1] * Y)];
          // Un point de la rondelle à plat (u en travers des plis, v le long) → l'espace, une fois pliée.
          const plie = (uu, v) => {
            if (uu <= -a) return [uu, v, 0];
            if (uu <= a) return [-a + (uu + a) * Math.cos(al), v, -(uu + a) * Math.sin(al)];
            return [-a + 2 * a * Math.cos(al) + (uu - a), v, -2 * a * Math.sin(al)];
          };
          const V = (uu, v) => P3(plie(uu, v));
          const bordV = (uu) => Math.sqrt(Math.max(0, 1 - uu * uu));
          const face = (u0, u1) => {
            const q = [], n = 24;
            for (let i = 0; i <= n; i++) { const uu = u0 + (u1 - u0) * i / n; q.push(V(uu, -bordV(uu))); }
            for (let i = n; i >= 0; i--) { const uu = u0 + (u1 - u0) * i / n; q.push(V(uu, bordV(uu))); }
            return q;
          };
          const ul = -0.84, vl = bordV(ul);                     // le repli, roulé le long du bord gauche
          const hc = plie(0, 0);                                // le centre du trou
          const trou = P3(hc);
          const sous = P3([hc[0] - 0.24, 0, hc[2] - 0.62]);     // le câble arrive par-dessous, de biais
          const sortie = P3([hc[0] + 0.4, 0, hc[2] + 0.06]);
          const r0 = V(ul, -vl), r1 = V(ul, vl);                // le repli, de l'avant à l'arrière
          const bas = z.h - 10;
          // Le collet : du repli, le câble descend, fait la boucle et remonte au trou.
          const boucle = [[r0[0] - 3, r0[1] + 22], [14, bas - 90], [20, bas - 20], [62, bas], [110, bas - 28], [122, bas - 96], [98, sous[1] + 36], [70, sous[1] + 12], sous, trou];
          out.push(h.formes.corde(boucle, { ep: 4.6, debut: 'ouvert', fin: 'ouvert', torons: true }));
          // Les trois faces : pli du haut, âme percée (tramée : elle est de biais), pli du bas.
          out.push(h.chemin(face(-a, a), blanc(h.a.arete), true));
          out.push(h.chemin(face(-a, a), h.a.ombre, true));
          out.push(h.chemin(face(-a, a), h.a.arete, true));
          out.push(h.chemin(face(a, 1), blanc(h.a.arete), true));
          out.push(h.chemin(face(ul, -a), blanc(h.a.arete), true));
          // L'épaisseur de la tôle, le long du bord avant.
          const rive = [];
          for (let i = 0; i <= 60; i++) { const uu = ul + (1 - ul) * i / 60; rive.push(V(uu, -bordV(uu))); }
          out.push(h.chemin([...rive, ...rive.slice().reverse().map((p) => [p[0], p[1] + 2.6])], blanc(h.a.arete), true));
          // Le câble caché derrière l'âme, jusqu'au trou ; le trou ; le câble qui en ressort par-dessus le pli du bas.
          out.push(h.path(poly([sous, trou]), h.a.cache));
          const tr = [];
          for (let i = 0; i < 36; i++) { const t = (i / 36) * 2 * Math.PI; tr.push(V(0.22 * Math.cos(t), 0.22 * Math.sin(t))); }
          out.push(h.chemin(tr, h.a.plein, true));
          out.push(h.formes.corde([trou, sortie, [z.l - 4, sortie[1] - 2]], { ep: 4.6, debut: 'ouvert', fin: 'fixe', torons: true }));
          // Le repli, roulé sur le bout fixe du câble : un petit tube le long du bord, le câble dedans.
          out.push(h.formes.corde([r1, r0], { ep: 10, debut: 'coupe', fin: 'ouvert' }));
          out.push(h.cercle(r0[0], r0[1], 5, blanc(h.a.arete)));
          out.push(h.formes.corde([r0, [r0[0] - 1, r0[1] + 10], [r0[0] - 3, r0[1] + 22]], { ep: 4.6, debut: 'ouvert', fin: 'ouvert', torons: true }));
          // Le sens où le câble file quand la bête tire.
          out.push(h.fleche(`M ${f(sortie[0] + 10)} ${f(sortie[1] - 16)} L ${f(z.l - 8)} ${f(sortie[1] - 16)}`));
          // le point qui décide : le câble de biais dans le trou, l'angle qui mord
          out.push(h.controle(trou[0], trou[1], 19));
          return out.join('\n');
        },
        renvois: (z) => [
          { n: 13, rond: [z.l - 14, 108], cible: [112, 84], texte: 'rondelle pliée en S' },
          { n: 14, rond: [12, 18], cible: [20, 52], texte: 'bout fixe, serré dans le repli' },
          { n: 15, rond: [46, 16], cible: [84, 58], texte: 'câble de biais dans le trou' },
        ],
      },
    },
  };
};
