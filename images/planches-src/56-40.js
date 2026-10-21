// Planche 56-40. Le harpon à tête basculante, et le grappin (chapitre 56, §9-A, étapes 1 et 2).
// Dessinée le 15 octobre 2026 (inventaire des planches, priorité haute).
//
// Ce que le chapitre dit et que la planche montre : la tête est un gros clou limé en pointe, une
// gorge limée en son milieu où se noue la ligne ; elle se pose libre sur le manche taillé en
// cheville et tient par frottement ; quand la bête tourne, le manche se déchausse et flotte, la
// tête reste dedans et se met en travers sous la peau ; la ligne est attachée à la tête, pas au
// manche, son autre bout à l'embarcation ou au poignet. Le grappin : trois clous ou fers à béton
// pliés en crochet à chaud, tiges liées au fil de fer, pointes écartées, une pierre attachée
// dessous ; lancé au-delà de la bête, il coule, et on drague en revenant ; il tient dans la peau,
// une nageoire ou la mâchoire.
// Ce que le chapitre ne dit pas et que la planche dessine en principe, sans cote :
//   - comment le clou tient sur la cheville : le bout du clou (sa tête gardée) se loge dans un trou
//     court percé au bout de la cheville (l'équivalent, retourné, de la douille d'une tête de harpon
//     à bascule). [À VÉRIFIER : le chapitre dit seulement « posée libre sur un manche taillé en
//     cheville, elle tient par frottement ».]
//   - l'épaisseur de lard, la longueur du clou, l'angle du coup : en proportion, sans chiffre.
//   - où la pierre s'attache sous le grappin : sous la couronne des crochets.
module.exports = (h) => {
  const A = h.a;
  const f1 = v => Math.round(v * 10) / 10;
  const W = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const RAD = Math.PI / 180;
  const lisse = (pts, ferme = false) => {
    const n = pts.length, P = i => ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
    let d = `M${f1(pts[0][0])} ${f1(pts[0][1])}`;
    const fin = ferme ? n : n - 1;
    for (let i = 0; i < fin; i++) {
      const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C${f1(c1[0])} ${f1(c1[1])} ${f1(c2[0])} ${f1(c2[1])} ${f1(p2[0])} ${f1(p2[1])}`;
    }
    return ferme ? d + ' Z' : d;
  };
  const map = (T, pts) => pts.map(T);
  // repère : (x, y) en mm → vue ; origine o, axe x tourné de ang degrés, échelle s
  const rep = (o, s, ang) => {
    const c = Math.cos(ang * RAD), si = Math.sin(ang * RAD);
    return p => [o[0] + s * (p[0] * c - p[1] * si), o[1] + s * (p[0] * si + p[1] * c)];
  };
  const LIGNE = 'fill="none" stroke="#1A1A1A" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"';
  // une tige ronde le long d'une courbe (en unités de vue) : contour fermé de demi-épaisseur r
  const tige = (pts, r) => {
    const n = pts.length, P = i => pts[Math.max(0, Math.min(n - 1, i))], ech = [];
    for (let i = 0; i < n - 1; i++) {
      const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
      for (let j = 0; j < 10; j++) {
        const t = j / 10, t2 = t * t, t3 = t2 * t;
        ech.push([0, 1].map(k => 0.5 * (2 * p1[k] + (-p0[k] + p2[k]) * t + (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * t2 + (-p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k]) * t3)));
      }
    }
    ech.push(pts[n - 1]);
    const g = [], d = [];
    ech.forEach((p, i) => {
      const a = ech[Math.max(0, i - 1)], b = ech[Math.min(ech.length - 1, i + 1)];
      const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1;
      g.push([p[0] - r * dy / L, p[1] + r * dx / L]); d.push([p[0] + r * dy / L, p[1] - r * dx / L]);
    });
    const f = ech[ech.length - 1], u = ech[ech.length - 2], e = ech[0], v = ech[1];
    const bout = (c, q, sens) => { const dx = c[0] - q[0], dy = c[1] - q[1], L = Math.hypot(dx, dy) || 1; return [c[0] + sens * r * 0.9 * dx / L, c[1] + sens * r * 0.9 * dy / L]; };
    return [...g, bout(f, u, 1), ...d.reverse(), bout(e, v, 1)];
  };

  // ─── Le clou (la tête du harpon), en mm : x de 0 (le bout, sa tête de clou) à 130 (la pointe) ───
  const LC = 130, RC = 3, XG = 66;
  const clou = (T) => {
    const o = [];
    // la tige, la gorge au milieu (un étranglement), la pointe limée
    const haut = [[3, -RC], [XG - 5, -RC], [XG - 1.5, -1.6], [XG + 1.5, -1.6], [XG + 5, -RC], [104, -RC], [LC, 0]];
    const bas = [[LC, 0], [104, RC], [XG + 5, RC], [XG + 1.5, 1.6], [XG - 1.5, 1.6], [XG - 5, RC], [3, RC]];
    o.push(h.chemin(map(T, [...haut, ...bas]), W(A.contour), true));
    o.push(h.chemin(map(T, [[104, -RC], [104, RC]]), A.fin));                  // où la lime commence
    // la tête du clou, gardée
    o.push(h.chemin(map(T, [[0, -6.5], [3, -6.5], [3, 6.5], [0, 6.5]]), W(A.arete), true));
    return o.join('\n');
  };
  // le nœud dans la gorge : deux tours serrés, le brin qui part
  const noeud = (T, dir = 1) => [
    h.chemin(map(T, [[XG - 2.4, -4.2], [XG - 0.4, 4.2]]), A.contour),
    h.chemin(map(T, [[XG + 0.6, -4.2], [XG + 2.6, 4.2]]), A.contour),
  ].join('\n');

  // ─── Le manche, taillé en cheville au bout, en mm : x = 0 au bout de la cheville, x < 0 vers l'arrière
  const RMan = 15;
  const manche = (T, longueur, { trou = true, cassure = true } = {}) => {
    const o = [];
    const cont = [[-longueur, -RMan], [-62, -RMan], [-30, -12], [0, -8], [0, 8], [-30, 12], [-62, RMan], [-longueur, RMan]];
    o.push(h.chemin(map(T, cont), A.blanc, true));
    o.push(h.path(lisse(map(T, [[-longueur, -RMan], [-62, -RMan], [-30, -12], [0, -8]])), A.contour));
    o.push(h.path(lisse(map(T, [[-longueur, RMan], [-62, RMan], [-30, 12], [0, 8]])), A.contour));
    o.push(h.chemin(map(T, [[0, -8], [0, 8]]), A.arete));
    // le fil du bois
    for (const [y, a, b] of [[-6, -longueur + 20, -80], [5, -longueur + 60, -70], [0, -60, -12]]) if (a < b) o.push(h.chemin(map(T, [[a, y], [b, y * 0.9]]), A.detail));
    if (trou) o.push(h.chemin(map(T, [[0, -6.8], [-22, -6.8], [-22, 6.8], [0, 6.8]]), A.cache));
    if (cassure) o.push(h.chemin(map(T, [[-longueur, -RMan], [-longueur - 4, -5], [-longueur + 3, 4], [-longueur, RMan]]), A.detail));
    return o.join('\n');
  };

  // ─── Vue 1 : armé ─────────────────────────────────────────────────────────────────────────────
  const geomArme = z => {
    const s = Math.min((z.l - 40) / 420, (z.h - 30) / 60);
    const o = [z.l - 40 - 130 * s, z.h * 0.42];
    return { s, T: rep(o, s, 0), o };
  };
  const vueArme = {
    titre: 'Armé : la tête libre sur la cheville',
    dessin: z => {
      const { s, T } = geomArme(z);
      const out = [];
      const L = (T([0, 0])[0] - 6) / s;
      out.push(manche(T, L));
      // le clou, son bout logé dans le trou de la cheville (caché), le reste dehors
      const Tc = p => T([p[0] - 20, p[1]]);
      out.push(clou(Tc));
      out.push(manche(T, L, { trou: false, cassure: false }).split('\n').filter(l => /fill="#FFFFFF" stroke="none"/.test(l) && false).join(''));
      // la partie du clou dans la cheville : repeindre la cheville par-dessus, puis le clou caché
      out.push(h.chemin(map(T, [[-30, -12], [0, -8], [0, 8], [-30, 12]]), A.blanc, true));
      out.push(h.path(lisse(map(T, [[-62, -RMan], [-30, -12], [0, -8]])), A.contour), h.path(lisse(map(T, [[-62, RMan], [-30, 12], [0, 8]])), A.contour));
      out.push(h.chemin(map(T, [[0, -8], [0, 8]]), A.arete));
      out.push(h.chemin(map(T, [[0, -6.8], [-22, -6.8], [-22, 6.8], [0, 6.8]]), A.cache));
      out.push(h.chemin(map(Tc, [[0, -6.5], [3, -6.5], [3, -RC], [20, -RC]]), A.cache), h.chemin(map(Tc, [[0, 6.5], [3, 6.5], [3, RC], [20, RC]]), A.cache));
      // le nœud dans la gorge, et la ligne qui part en arrière, libre, sous le manche
      out.push(noeud(Tc));
      const g = Tc([XG + 0.5, 4.5]);
      const ligne = [[XG + 0.5, 4.5], [XG - 10, 16], [XG - 40, 30], [-20, 34], [-120, 30], [-240, 38], [-L + 40, 32], [-L + 26, 30]].map(Tc);
      out.push(h.path(lisse(ligne), LIGNE));
      out.push(h.controle(g[0], g[1] - 4.5 * s, 8 + 4 * s));
      return out.join('\n');
    },
    renvois: z => {
      const { s, T } = geomArme(z);
      const Tc = p => T([p[0] - 20, p[1]]);
      return [
        { n: 1, rond: [z.l - 14, 14], cible: Tc([118, -1.8]), texte: 'gros clou limé en pointe' },
        { n: 2, rond: [Tc([XG, 0])[0] + 30, 14], cible: Tc([XG + 2, -4.4]), texte: 'la ligne nouée dans la gorge' },
        { n: 3, rond: [T([-10, 0])[0] - 40, 14], cible: T([-14, -10]), texte: 'tête libre sur la cheville' },
        { n: 4, rond: [24, z.h - 14], cible: Tc([-120, 30]), texte: 'vers l’embarcation ou le poignet' },
      ];
    },
  };

  // ─── Vues 2 à 4 : dans la bête, en coupe (peau, lard) ─────────────────────────────────────────
  // repère de la bête : x le long de la peau, y vers l'intérieur ; la peau en y = 0
  const LARD = 48, PEAU = 5;
  const ANGC = 58;                       // angle du coup, depuis la peau
  const geomBete = z => {
    const s = 0.62;
    const yS = z.h * 0.55, xE = z.l * 0.42;
    return { s, yS, xE, B: p => [xE + s * p[0], yS + s * p[1]] };
  };
  const coupeBete = (z, B, s, xE) => {
    const o = [];
    const x0 = (4 - xE) / s, x1 = (z.l - 4 - xE) / s;
    const yC = Math.min(LARD + 110, (z.h - 4 - B([0, 0])[1]) / s);
    o.push(h.chemin(map(B, [[x0, LARD], [x1, LARD], [x1, yC], [x0, yC]]), A.loin, true));
    o.push(h.chemin(map(B, [[x0, PEAU], [x1, PEAU], [x1, LARD], [x0, LARD]]), A.hachure('isolant', 'aucun'), true));
    o.push(h.chemin(map(B, [[x0, 0], [x1, 0], [x1, PEAU], [x0, PEAU]]), A.blanc, true));
    o.push(h.chemin(map(B, [[x0, 0], [x1, 0]]), A.contour), h.chemin(map(B, [[x0, PEAU], [x1, PEAU]]), A.detail), h.chemin(map(B, [[x0, LARD], [x1, LARD]]), A.arete));
    for (let x = x0 + 4; x < x1 - 6; x += 9) o.push(h.chemin(map(B, [[x, -0.5], [x + 5, -3.5]]), A.fin));
    return o.join('\n');
  };
  // le trou d'entrée dans la peau
  const trou = (B) => h.chemin(map(B, [[-3.5, -0.2], [3.5, -0.2], [3.5, PEAU + 0.2], [-3.5, PEAU + 0.2]]), A.blanc, true);
  const temps = (k) => ({
    titre: { 1: 'Le coup', 2: 'La bête tourne', 3: 'La ligne tire' }[k],
    dessin: z => {
      const { s, B, xE } = geomBete(z);
      const o = [coupeBete(z, B, s, xE)];
      // le clou dans le corps : son axe part du trou d'entrée (0, 0) vers l'intérieur
      const dir = [Math.cos(ANGC * RAD), Math.sin(ANGC * RAD)];
      if (k === 1 || k === 2) {
        // la pointe à 110 mm de l'entrée ; le bout (la tête du clou) à 20 mm dehors
        const Tc = p => { const t = p[0] - 20; return B([t * dir[0] - p[1] * dir[1], t * dir[1] + p[1] * dir[0]]); };
        // bout du clou : à x = 0 du clou ; le trou d'entrée à x = 20
        o.push(trou(B));
        o.push(clou(Tc));
        // le clou dans la bête : sous la peau, il est caché : on repeint la coupe par-dessus en pointillé
        o.push(noeud(Tc));
        // la ligne, du nœud vers le trou puis dehors
        const sortie = k === 1 ? [[-14, -14], [-40, -22], [-80, -26], [-118, -24]] : [[-6, -24], [-14, -60], [-40, -96], [-80, -120], [-118, -130]];
        const nd = Tc([XG + 0.5, -4.5]);
        o.push(h.path(lisse([nd, B([-1, 1]), ...sortie.map(B)]), LIGNE));
        // le manche : en place (le coup), puis déchaussé, qui flotte
        if (k === 1) {
          const Tm = p => { const t = p[0] - 0; return B([t * dir[0] - p[1] * dir[1], t * dir[1] + p[1] * dir[0]]); };
          o.push(manche(Tm, 150, { trou: false }));
          const g = B([-20, -150]);
          o.push(h.geste(`M${f1(g[0])} ${f1(g[1])} L${f1(g[0] + 44 * s * dir[0])} ${f1(g[1] + 44 * s * dir[1])}`));
        } else {
          const ang2 = ANGC - 18;
          const d2 = [Math.cos(ang2 * RAD), Math.sin(ang2 * RAD)];
          const base = [-30, -58];
          const Tm = p => B([base[0] + p[0] * d2[0] - p[1] * d2[1], base[1] + p[0] * d2[1] + p[1] * d2[0]]);
          o.push(manche(Tm, 110, { trou: true }));
          const a = B([-10, -104]), b = B([-50, -136]);
          o.push(h.fleche(`M${f1(a[0])} ${f1(a[1])} L${f1(b[0])} ${f1(b[1])}`));
        }
      } else {
        // la tête en travers, à plat sous la peau ; la ligne tendue sort par le trou
        const yT = PEAU + 9;
        const Tc = p => B([p[0] - XG, yT + p[1]]);
        o.push(trou(B));
        o.push(clou(Tc), noeud(Tc));
        const nd = Tc([XG + 0.5, -4.5]);
        o.push(h.path(lisse([nd, B([0, 2]), B([-14, -26]), B([-34, -66]), B([-50, -98])]), LIGNE));
        const g0 = B([-30, -84]), g1 = B([-52, -124]);
        o.push(h.geste(`M${f1(g0[0] + 12)} ${f1(g0[1])} L${f1(g1[0] + 12)} ${f1(g1[1])}`));
        o.push(h.controle(...B([0, yT]), 22 + 0 * s));
      }
      return o.join('\n');
    },
    renvois: z => {
      const { s, B } = geomBete(z);
      if (k === 2) return [{ n: 5, rond: [z.l - 16, 16], cible: B([-30, -90]), texte: 'le manche se déchausse et flotte' }];
      if (k === 3) return [{ n: 6, rond: [z.l - 16, z.h - 14], cible: B([40, PEAU + 12]), texte: 'la tête en travers sous la peau' }];
      return [];
    },
  });

  // ─── Vue 5 : le grappin ───────────────────────────────────────────────────────────────────────
  // en mm : x horizontal, y vers le bas ; la couronne (le bas des crochets) en y = 0
  // un crochet : la tige, le coude en bas, le bras qui remonte en s'écartant ; ecart : 1 dans le plan, 0 vers l'œil
  const RT = 4.5;                                            // demi-épaisseur d'un clou de charpente, grossi
  const crochetPts = (k, e = 1) => [[k * 4, -150], [k * 4, -30], [k * 4 + k * 8 * e, -4], [k * 4 + k * 26 * e, 0], [k * 4 + k * 48 * e, -14], [k * 4 + k * 58 * e, -40], [k * 4 + k * 57 * e, -62]];
  const grappin = (T, s, { pierre = true } = {}) => {
    const o = [];
    // le troisième crochet, derrière (gris), pointe vers l'arrière : on n'en voit que le bras
    o.push(h.path(lisse(tige(map(T, [[0, -40], [0, -6], [-8, 2], [-20, -6], [-26, -30], [-24, -50]]), RT * s), true), A.loin.replace('stroke="none"', 'stroke="#1A1A1A" stroke-width="0.7"')));
    for (const k of [-1, 1]) {
      const pts = map(T, crochetPts(k));
      o.push(h.path(lisse(tige(pts, RT * s), true), W(A.arete)));
      // la pointe limée
      const q = T([k * 4 + k * 57, -62]), r = T([k * 4 + k * 56, -74]);
      o.push(h.chemin([[q[0] - RT * s, q[1]], r, [q[0] + RT * s, q[1]]], W(A.arete), true));
    }
    // les tiges liées au fil de fer : des tours serrés, en deux endroits
    for (const [a, b] of [[-140, -116], [-74, -52]]) {
      o.push(h.chemin(map(T, [[-11, a], [11, a], [11, b], [-11, b]]), W(A.arete), true));
      for (let y = a + 3.4; y < b - 1; y += 3.4) o.push(h.chemin(map(T, [[-11, y], [11, y + 1.2]]), A.detail));
    }
    // l'œil en haut, pour la ligne : le bout d'une tige recourbé
    o.push(h.path(lisse(tige(map(T, [[4, -150], [6, -160], [0, -170], [-7, -162], [-4, -150]]), 2.2 * s), true), W(A.arete)));
    if (pierre) {
      o.push(h.chemin(map(T, [[0, 0], [0, 24]]), A.arete));
      const P = [[-26, 34], [-14, 24], [8, 22], [24, 30], [28, 46], [16, 58], [-8, 60], [-24, 52]];
      o.push(h.path(lisse(map(T, P), true), W(A.contour)));
      o.push(h.path(lisse(map(T, [[-20, 32], [0, 40], [22, 34]])), A.detail));
    }
    return o.join('\n');
  };
  const geomGrappin = z => {
    const s = Math.min((z.l - 40) / 140, (z.h - 20) / 250);
    return { s, T: p => [z.l * 0.46 + s * p[0], z.h * 0.68 + s * p[1]] };
  };
  const vueGrappin = {
    titre: 'Le grappin',
    dessin: z => {
      const { s, T } = geomGrappin(z);
      const o = [grappin(T, s)];
      o.push(h.path(lisse(map(T, [[0, -172], [4, -190], [-2, -210], [6, -226]])), LIGNE));
      return o.join('\n');
    },
    renvois: z => {
      const { s, T } = geomGrappin(z);
      return [
        { n: 7, rond: [z.l - 14, T([0, -40])[1]], cible: T([66.5, -40]), texte: 'trois clous pliés à chaud' },
        { n: 8, rond: [z.l - 14, T([0, -128])[1]], cible: T([11, -128]), texte: 'tiges liées au fil de fer' },
        { n: 9, rond: [16, T([0, 40])[1]], cible: T([-25, 42]), texte: 'une pierre dessous' },
      ];
    },
  };

  // ─── Vue 6 : lancer au-delà, draguer en revenant ─────────────────────────────────────────────
  // Le phoque coulé, de profil, couché sur le ventre au fond (mm) : 1500 de long, la tête à gauche.
  const PHOQUE = [[-760, -70], [-745, -105], [-705, -150], [-650, -178], [-590, -184], [-540, -180], [-420, -250],
    [-200, -318], [0, -328], [200, -300], [400, -232], [560, -152], [660, -94], [720, -72], [800, -122], [836, -112],
    [802, -64], [842, -22], [812, -4], [730, -22], [620, -8], [400, 0], [0, 4], [-300, 0], [-520, -10], [-620, -30],
    [-700, -46], [-745, -56]];
  const NAGEOIRE = [[-470, -124], [-446, -62], [-404, -10], [-372, -18], [-408, -72], [-432, -124]];
  const geomDrague = z => {
    const s = 0.158;
    const yF = z.h - 18, yS = z.h * 0.3, xB = 46;
    return { s, yF, yS, xB, P: p => [xB + 24 + 770 * s + s * p[0], yF + s * p[1]], gx: z.l - 18 };
  };
  const vueDrague = {
    titre: 'Lancé au-delà, dragué en revenant',
    dessin: z => {
      const { s, yF, yS, xB, P, gx } = geomDrague(z);
      const o = [];
      // l'eau, le bord de glace à gauche, le fond de gravier
      o.push(h.rect(xB, yS, z.l - xB - 4, yF - yS, A.hachure('eau', 'aucun')));
      o.push(h.chemin([[xB, yS], [z.l - 4, yS]], A.arete));
      o.push(h.chemin([[4, yS - 8], [xB, yS - 8], [xB + 4, yS + 10], [4, yS + 10]], A.hachure('neige', 'contour'), true));
      // le phoque, couché sur le fond
      o.push(h.path(lisse(map(P, PHOQUE), true), W(A.contour)));
      o.push(h.path(lisse(map(P, NAGEOIRE)), A.arete));
      o.push(h.cercle(...P([-670, -138]), 2, A.plein));
      // le grappin au fond, au-delà de la bête, l'œil vers soi ; un crochet mord le gravier
      const sg = 0.3;
      o.push(grappin(p => [gx + sg * p[1], yF - 5 + sg * p[0]], sg, { pierre: false }));
      o.push(h.rect(xB, yF, z.l - xB - 4, 16, A.blanc));
      o.push(h.rect(xB, yF, z.l - xB - 4, 16, A.hachure('gravier', 'aucun')));
      o.push(h.chemin([[xB, yF], [z.l - 4, yF]], A.contour));
      // la trajectoire du lancer, au-dessus de la bête, puis le grappin qui coule
      const g0 = [xB - 6, yS - 16];
      o.push(h.path(`M${f1(g0[0])} ${f1(g0[1])} Q${f1((g0[0] + gx) / 2)} ${f1(yS - 82)} ${f1(gx - 26)} ${f1(yS - 2)}`, A.cache));
      o.push(h.chemin([[gx - 26, yS + 6], [gx - 26, yF - 34]], A.cache));
      // la ligne : de l'œil du grappin, au-dessus de la bête, jusqu'au bord
      const oeil = [gx - 170 * sg, yF - 5];
      o.push(h.path(lisse([oeil, [oeil[0] - 24, yF - 14], P([500, -300]), P([-100, -420]), [xB + 30, yS + 26], [xB + 6, yS + 4], [xB - 20, yS - 10]]), LIGNE));
      // le geste : on tire vers soi, le grappin racle le fond jusqu'à la bête
      const ya = yF - 30;
      o.push(h.geste(`M${f1(gx - 30)} ${f1(ya - 22)} L${f1(P([700, 0])[0] + 6)} ${f1(ya - 22)}`));
      return o.join('\n');
    },
    renvois: z => {
      const { s, yF, yS, xB, P, gx } = geomDrague(z);
      return [
        { n: 10, rond: [gx - 110, 12], cible: [gx - 62, yS - 32], texte: 'lancé au-delà de la bête' },
        { n: 11, rond: [gx - 4, yS + 22], cible: [gx - 26, yS + 46], texte: 'il coule, on drague en revenant' },
        { n: 12, rond: [P([-440, 0])[0] - 34, yS + 20], cible: P([-420, -60]), texte: 'il prend la peau ou une nageoire' },
      ];
    },
  };

  return {
    ref: '56-40',
    titre: 'Le harpon à tête basculante, et le grappin',
    desc: 'En haut, le harpon armé, de côté : le bout du manche taillé en cheville ; un gros clou limé en pointe, son bout logé libre dans un trou court au bout de la cheville ; au milieu du clou, une gorge limée où la ligne est nouée ; la ligne part de là, libre, sous le manche, vers l’embarcation ou le poignet. Au milieu, en trois temps, la bête coupée sous la peau, le lard dessous : le coup enfonce le clou en biais à travers la peau ; la bête tourne, le manche se déchausse de la tête et flotte, la tête reste dedans ; la ligne tire sur le milieu du clou, qui se met en travers à plat sous la peau et ne ressort plus par le trou. En bas, le grappin : trois clous pliés en crochet, tiges liées au fil de fer en deux endroits, pointes écartées, un œil en haut pour la ligne, une pierre attachée sous la couronne. À côté, le phoque coulé sur le fond, la glace du bord à gauche : le grappin lancé au-delà de la bête, coulé au fond, et la ligne qu’on ramène vers soi, le grappin qui racle le fond sous la bête et la prend par la peau ou une nageoire.',
    format: 'pleine',
    disposition: [['arme'], ['t1', 't2', 't3'], ['grappin', 'drague']],
    hauteurs: [0.8, 1.25, 1.2],
    largeurs: [[1], [1, 1, 1], [0.6, 1.6]],
    vues: { arme: vueArme, t1: temps(1), t2: temps(2), t3: temps(3), grappin: vueGrappin, drague: vueDrague },
  };
};
