// Planche 78-41 — la grille de fond et le lève-pots (ch. 78, §9 « Ce qui se fabrique en une heure » ;
// §9 « Le bain d'eau bouillante, avec ce qui traîne » et §5.3, étapes 11, 12 et 14).
// Cotes : le chapitre n'en donne qu'une, et c'est une mesure de main : l'eau couvre les couvercles
// « d'au moins la hauteur d'une main ». Rien d'autre n'est coté (ni la marmite, ni les anneaux, ni le
// fil, ni les baguettes, « de l'épaisseur d'un doigt »). Les pots sont dessinés aux mesures d'un pot
// Mason de 500 mL, comme à la 78-40.
// Le lève-pots : le chapitre dit « un crochet plié dans du gros fil de fer, qui prend sous le col du
// pot ». Pour qu'un pot plein ne bascule pas, le crochet fait plus d'un demi-tour autour du col : un
// anneau ouvert d'un côté, qu'on glisse de côté sous la bague, le manche qui monte de l'autre côté.
// C'est la forme dessinée ; le chapitre ne la détaille pas plus.
// La pince de deux baguettes entaillées n'est pas dessinée : le chapitre n'en dit pas la forme, et deux
// baguettes droites qui se rejoignent dans la main ne passent pas sous la bague sans des mâchoires
// courbées qu'il faudrait inventer.
// La charte : en coupe, la marmite en tôle mince (aplat noir), l'eau en trait, la paroi d'en face en
// gris loin au-dessus de l'eau. Le rouge : la sortie du pot à la verticale (le geste) ; le dessous
// du pot, posé sur la grille et pas sur le fond (point à contrôler).
module.exports = (h) => {
  const A = h.a;
  const r1 = v => Math.round(v * 10) / 10;
  const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const P = pts => pts.map(p => `${r1(p[0])} ${r1(p[1])}`);
  const poly = pts => 'M' + P(pts).join(' L') + ' Z';
  const ligne = pts => 'M' + P(pts).join(' L');

  // ─── Le pot Mason de profil (mm × s) : corps, épaule, col, bague, couvercle ────────────────────
  // y mesuré du fond vers le haut. Rend le contour et la géométrie utile.
  const RB = 38, RN = 31, RBague = 35;
  const pot = (cx, yb, s, { coupeBague = false } = {}) => {
    const Y = yy => yb - yy * s, X = x => cx + x * s;
    const out = [];
    // le verre : corps droit, épaule ronde, col
    const d = `M${r1(X(-RB + 4))} ${r1(Y(0))} Q${r1(X(-RB))} ${r1(Y(0))} ${r1(X(-RB))} ${r1(Y(5))}`
      + ` L${r1(X(-RB))} ${r1(Y(92))} C${r1(X(-RB))} ${r1(Y(101))} ${r1(X(-RN))} ${r1(Y(100))} ${r1(X(-RN))} ${r1(Y(108))}`
      + ` L${r1(X(RN))} ${r1(Y(108))} C${r1(X(RN))} ${r1(Y(100))} ${r1(X(RB))} ${r1(Y(101))} ${r1(X(RB))} ${r1(Y(92))}`
      + ` L${r1(X(RB))} ${r1(Y(5))} Q${r1(X(RB))} ${r1(Y(0))} ${r1(X(RB - 4))} ${r1(Y(0))} Z`;
    out.push(h.path(d, blanc(A.arete)));
    // le col sous la bague
    out.push(h.ligne(X(-RN), Y(108), X(-RN), Y(111), A.arete), h.ligne(X(RN), Y(108), X(RN), Y(111), A.arete));
    // la bague vissée, et le couvercle plat dessus
    out.push(h.rect(X(-RBague), Y(126), 2 * RBague * s, 15 * s, blanc(A.arete)));
    [114, 118, 122].forEach(yy => out.push(h.ligne(X(-RBague) + 1, Y(yy), X(RBague) - 1, Y(yy), A.fin)));
    out.push(h.rect(X(-RBague + 1), Y(128), 2 * (RBague - 1) * s, 2 * s, blanc(A.detail)));
    return { svg: out.join('\n'), Y, X, yCol: Y(109.5), yHaut: Y(128), yBague: Y(111), yFond: Y(0) };
  };

  // ─── Vue 1 : la marmite en coupe ─────────────────────────────────────────────────────────────
  // Trois pots, un vide d'environ 25 mm entre eux et contre la paroi (dessiné, pas coté).
  const M = z => {
    const jeu = 26, n = 3;
    const Rmm = (n * 2 * RB + (n + 1) * jeu) / 2;      // rayon intérieur de la marmite, en mm
    const Hmm = 9 + 128 + 95 + 34;                      // grille, pot, une main d'eau, revanche
    const s = Math.min((z.h - 30) / Hmm, (z.l - 220) / (2 * Rmm));
    const cx = z.l / 2 - 30, yb = z.h - 4, e = 3;
    const R = Rmm * s + e, yT = yb - Hmm * s;
    const yG = yb - e - 9 * s, yCouv = yG - 128 * s, yE = yCouv - 95 * s;
    const xs = Array.from({ length: n }, (_, i) => cx - Rmm * s + (jeu + RB + i * (2 * RB + jeu)) * s);
    return { jeu, n, s, cx, yb, e, R, yT, yG, yCouv, yE, xs };
  };
  const marmite = z => {
    const m = M(z), out = [];
    const { s, cx, yb, e, R, yT, yG, yCouv, yE, xs } = m;
    // la paroi d'en face, au-dessus de l'eau, en gris loin
    out.push(h.rect(cx - R + e, yT, 2 * (R - e), yE - yT, A.loin));
    // l'eau, du fond jusqu'au niveau : elle passe sous les pots, entre les anneaux
    out.push(h.rect(cx - R + e, yE, 2 * (R - e), yb - e - yE, A.blanc), h.rect(cx - R + e, yE, 2 * (R - e), yb - e - yE, A.hachure('eau', 'aucun')));
    out.push(h.ligne(cx - R + e, yE, cx + R - e, yE, A.arete));
    // la grille d'anneaux, coupée : chaque anneau donne deux petites sections
    const rA = 34 * s;
    xs.forEach(x => [-1, 1].forEach(sg => out.push(h.rect(x + sg * rA - 2 * s, yG, 4 * s, 9 * s, A.plein))));
    // les pots, posés sur la grille, sans se toucher
    const pots = xs.map(x => { const p = pot(x, yG, s); out.push(p.svg); return p; });
    // la marmite : tôle mince coupée, couvercle posé
    out.push(h.path(poly([[cx - R, yT], [cx - R, yb], [cx + R, yb], [cx + R, yT], [cx + R - e, yT], [cx + R - e, yb - e], [cx - R + e, yb - e], [cx - R + e, yT]]), A.plein));
    const yC = yT - 3;
    out.push(h.path(`M${r1(cx - R - 6)} ${r1(yT)} L${r1(cx - R - 6)} ${r1(yC)} Q${r1(cx)} ${r1(yC - 14)} ${r1(cx + R + 6)} ${r1(yC)} L${r1(cx + R + 6)} ${r1(yT)} Z`, blanc(A.contour)));
    out.push(h.path(`M${r1(cx - 12)} ${r1(yC - 10)} q0 -8 12 -8 q12 0 12 8`, A.arete));
    // la cote : une main d'eau au-dessus des couvercles, tirée hors de la marmite, à droite
    const xq = cx + R + 22;
    out.push(h.ligne(pots[m.n - 1].X(RBague) + 2, yCouv, cx + R - e - 1, yCouv, A.fin), h.ligne(cx + R + 1, yCouv, xq + 6, yCouv, A.fin));
    out.push(h.ligne(cx + R + 1, yE, xq + 6, yE, A.fin));
    out.push(h.cote(xq, yE, xq, yCouv, 'une main au moins', { cote: 'droite' }));
    // le point à contrôler : le fond du pot sur la grille, pas sur la tôle
    out.push(h.controle(xs[0], yG, 11));
    return { svg: out.join('\n'), m, pots, rA, yC };
  };
  const marmiteRenvois = z => {
    const r = marmite(z), m = r.m;
    const xg = m.cx - m.R - 30;
    return [
      { n: 1, rond: [xg, m.yG + 2], cible: [m.xs[0] - r.rA - 2 * m.s - 1, m.yG + 4], texte: 'grille au fond : l’eau passe dessous' },
      { n: 2, rond: [xg, (m.yG + m.yCouv) / 2], cible: [r.pots[0].X(-RB) - 1, (m.yG + m.yCouv) / 2], texte: 'pots qui ne se touchent pas' },
      { n: 3, rond: [xg, r.yC - 8], cible: [m.cx - m.R - 5, r.yC + 1], texte: 'marmite couverte' },
    ];
  };

  // ─── Vue 2 : la grille d'anneaux, vue de dessus ──────────────────────────────────────────────
  const anneaux = z => {
    const out = [];
    const cx = z.l * 0.42, cy = z.h / 2;
    const Rm = Math.min(z.l / 2 - 10, z.h / 2 - 4);    // la marmite, vue de dessus
    const ra = Rm * 0.205, ri = ra * 0.82;              // un anneau : bord extérieur et intérieur
    out.push(h.cercle(cx, cy, Rm, A.contour), h.cercle(cx, cy, Rm - 3, A.detail));
    // anneaux en nid d'abeilles, qui se touchent
    const pas = 2 * ra, centres = [];
    for (let j = -4; j <= 4; j++) for (let i = -5; i <= 5; i++) {
      const x = cx + i * pas + (Math.abs(j) % 2 ? pas / 2 : 0), y = cy + j * pas * Math.sqrt(3) / 2;
      if (Math.hypot(x - cx, y - cy) + ra < Rm - 3) centres.push([x, y]);
    }
    centres.forEach(([x, y]) => out.push(h.cercle(x, y, ra, blanc(A.arete)), h.cercle(x, y, ri, A.detail)));
    // le fil de fer : un tour serré à chaque point de contact entre deux anneaux
    const liens = [];
    centres.forEach((a, i) => centres.forEach((b, j) => {
      if (j <= i) return;
      if (Math.abs(Math.hypot(a[0] - b[0], a[1] - b[1]) - pas) < 1) liens.push([(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, Math.atan2(b[1] - a[1], b[0] - a[0])]);
    }));
    liens.forEach(([x, y, t]) => {
      const ux = Math.cos(t), uy = Math.sin(t), nx = -uy, ny = ux, L = (ra - ri) * 2 + 9, w = 2.2;
      out.push(h.path(poly([[x - ux * w - nx * L / 2, y - uy * w - ny * L / 2], [x + ux * w - nx * L / 2, y + uy * w - ny * L / 2], [x + ux * w + nx * L / 2, y + uy * w + ny * L / 2], [x - ux * w + nx * L / 2, y - uy * w + ny * L / 2]]), A.plein));
    });
    return { svg: out.join('\n'), cx, cy, Rm, ra, centres, liens };
  };
  const anneauxRenvois = z => {
    const a = anneaux(z);
    const l = a.liens.reduce((m, q) => (q[0] - q[1] > m[0] - m[1] ? q : m));
    return [
      { n: 4, rond: [z.l - 14, 16], cible: [l[0] + 2, l[1] - 2], texte: 'anneaux de pots liés au fil de fer' },
    ];
  };

  // ─── Vue 3 : la claie de baguettes ───────────────────────────────────────────────────────────
  const claie = z => {
    const out = [];
    const cx = z.l * 0.42, cy = z.h / 2;
    const Rm = Math.min(z.l / 2 - 10, z.h / 2 - 4);
    out.push(h.cercle(cx, cy, Rm, A.contour), h.cercle(cx, cy, Rm - 3, A.detail));
    const d = 6, pos = [-0.54, -0.18, 0.18, 0.54].map(t => t * Rm);
    const L = t => Math.sqrt(Math.max(0, (Rm - 7) ** 2 - t * t));     // demi-longueur dans le cercle
    // le rang du dessous : baguettes verticales, coupées par celles du dessus
    pos.forEach(t => {
      const l = L(t) - 1, x = cx + t;
      const ys = [cy - l, ...pos.flatMap(u => [cy + u - d / 2 - 1.5, cy + u + d / 2 + 1.5]), cy + l];
      for (let k = 0; k < ys.length; k += 2) {
        if (ys[k + 1] - ys[k] < 1) continue;
        const bout0 = k === 0, bout1 = k === ys.length - 2;
        out.push(h.path(`M${r1(x - d / 2)} ${r1(ys[k])} L${r1(x - d / 2)} ${r1(ys[k + 1])} M${r1(x + d / 2)} ${r1(ys[k])} L${r1(x + d / 2)} ${r1(ys[k + 1])}`, A.arete));
        if (bout0) out.push(h.path(`M${r1(x - d / 2)} ${r1(ys[k])} Q${r1(x)} ${r1(ys[k] - 3)} ${r1(x + d / 2)} ${r1(ys[k])}`, A.arete));
        if (bout1) out.push(h.path(`M${r1(x - d / 2)} ${r1(ys[k + 1])} Q${r1(x)} ${r1(ys[k + 1] + 3)} ${r1(x + d / 2)} ${r1(ys[k + 1])}`, A.arete));
      }
    });
    // le rang du dessus : horizontales, entières
    pos.forEach(t => {
      const l = L(t) - 1, y = cy + t;
      out.push(h.path(`M${r1(cx - l)} ${r1(y - d / 2)} L${r1(cx + l)} ${r1(y - d / 2)} Q${r1(cx + l + 3)} ${r1(y)} ${r1(cx + l)} ${r1(y + d / 2)} L${r1(cx - l)} ${r1(y + d / 2)} Q${r1(cx - l - 3)} ${r1(y)} ${r1(cx - l)} ${r1(y - d / 2)} Z`, blanc(A.arete)));
    });
    // une ligature à chaque croisement : trois tours en biais par-dessus
    pos.forEach(a => pos.forEach(b => {
      const x = cx + a, y = cy + b;
      [-2, 0, 2].forEach(o => out.push(h.path(`M${r1(x - d / 2 - 1 + o)} ${r1(y - d / 2 - 1)} L${r1(x + d / 2 + 1 + o)} ${r1(y + d / 2 + 1)}`, A.detail)));
    }));
    return { svg: out.join('\n'), cx, cy, pos, Rm, d };
  };
  const claieRenvois = z => {
    const c = claie(z);
    return [
      { n: 5, rond: [z.l - 14, 16], cible: [c.cx + c.pos[3] + c.d / 2 + 2, c.cy + c.pos[0] - c.d / 2 - 2], texte: 'ou baguettes croisées, ligaturées' },
    ];
  };

  // ─── Vue 4 : le lève-pots de fil de fer ──────────────────────────────────────────────────────
  // De côté : le pot, l'anneau du crochet sous la bague, le manche qui monte et finit en boucle pour
  // la main. À droite : l'anneau vu de dessus autour du col, ouvert d'un côté.
  const leve = z => {
    const out = [];
    const s = Math.min((z.h - 84) / 128, (z.l - 40) / 90);
    const cx = z.l * 0.46, yb = z.h - 6;
    const p = pot(cx, yb, s);
    out.push(p.svg);
    const fil = 4;                                     // le gros fil de fer, dessiné
    const ry = 8, rx = (RN + 3) * s, yA = p.yCol + 1;
    // l'arrière de l'anneau, caché par le col
    out.push(h.path(`M${r1(cx - rx)} ${r1(yA)} A${r1(rx)} ${ry} 0 0 1 ${r1(cx + rx)} ${r1(yA)}`, A.cache));
    // le manche, de la gauche de l'anneau jusqu'à la boucle du haut, et le devant de l'anneau
    const xm = cx - rx, yM = 18;
    const t1 = 0.3 * Math.PI;                           // l'ouverture, à droite, vers l'avant
    const avant = [];
    for (let i = 0; i <= 16; i++) { const t = Math.PI - (Math.PI - t1) * i / 16; avant.push([cx + rx * Math.cos(t), yA + ry * Math.sin(t)]); }
    const brin = [[xm + 22, yM + 20], [xm + 26, yM + 8], [xm + 14, yM], [xm, yM + 8], [xm - 3, yM + 26], [xm - 3, yA - 30], [xm - 2, yA - 10], ...avant];
    out.push(h.formes.corde(brin, { ep: fil, debut: 'coupe', fin: 'coupe', trait: 'arete' }));
    // le geste : sortir le pot à la verticale
    out.push(h.geste(`M${r1(cx + rx + 30)} ${r1(p.yBague + 40)} L${r1(cx + rx + 30)} ${r1(p.yBague - 34)}`));

    return { svg: out.join('\n'), p, cx, rx, yA, xm, yM, s };
  };
  const leveDessus = z => {
    const out = [], fil = 4;
    // l'anneau vu de dessus, autour du col
    const ox = z.l * 0.5, oy = z.h * 0.42, Rc = 40, Ra = Rc + 6;
    out.push(h.cercle(ox, oy, Rc + 7, A.cache));       // la bague, plus large, au-dessus (cachée)
    out.push(h.cercle(ox, oy, Rc, blanc(A.arete)));    // le col
    const a0 = Math.PI * 0.28;                           // demi-ouverture, vers la droite
    const arc = [];
    for (let i = 0; i <= 40; i++) { const t = a0 + (2 * Math.PI - 2 * a0) * i / 40; arc.push([ox + Ra * Math.cos(t), oy + Ra * Math.sin(t)]); }
    out.push(h.formes.corde(arc, { ep: fil, debut: 'coupe', fin: 'coupe', trait: 'arete' }));
    out.push(h.cercle(ox - Ra, oy, fil / 2 + 0.8, A.plein));   // le manche qui monte, vu par le bout
    return { svg: out.join('\n'), ox, oy, Ra, Rc };
  };
  const leveRenvois = z => {
    const l = leve(z);
    return [
      { n: 6, rond: [l.xm + 58, l.yM + 6], cible: [l.xm + 28, l.yM + 12], texte: 'gros fil de fer plié' },
      { n: 7, rond: [l.cx - l.rx - 30, l.yA + 34], cible: [l.cx - l.rx * 0.45, l.yA + 6], texte: 'l’anneau prend sous le col' },
    ];
  };
  const leveDessusRenvois = z => {
    const l = leveDessus(z);
    return [
      { n: 8, rond: [l.ox, l.oy + l.Ra + 34], cible: [l.ox, l.oy + l.Ra + 3], texte: 'ouvert d’un côté, plus d’un demi-tour' },
    ];
  };

  return {
    ref: '78-41',
    titre: 'La grille de fond et le lève-pots',
    desc: 'En coupe, une marmite de bain d’eau bouillante : au fond, une grille d’anneaux de pots ; les pots posés dessus sans se toucher ; l’eau passe sous les pots '
      + 'et couvre les couvercles d’au moins une hauteur de main ; la marmite est couverte. À côté, la grille vue de dessus : des anneaux de pots en nid d’abeilles, '
      + 'liés au fil de fer à chaque contact ; puis l’autre grille : des baguettes croisées sur deux rangs, ligaturées à chaque croisement. '
      + 'En bas, le lève-pots plié dans du gros fil de fer : un anneau ouvert d’un côté, glissé sous la bague du pot, et un manche qui finit en crochet pour la main ; on sort le pot à la verticale. '
      + 'À côté, l’anneau vu de dessus autour du col : il en fait plus d’un demi-tour.',
    format: 'pleine',
    disposition: [['marmite'], ['anneaux', 'claie'], ['leve', 'leveDessus']],
    hauteurs: [1.1, 0.75, 1.25],
    largeurs: [[1], [1, 1], [1.2, 1]],
    vues: {
      marmite: { titre: 'Le bain, en coupe', dessin: z => marmite(z).svg, renvois: marmiteRenvois },
      anneaux: { titre: 'La grille d’anneaux, vue de dessus', dessin: z => anneaux(z).svg, renvois: anneauxRenvois },
      claie: { titre: 'Sans anneaux : la claie', dessin: z => claie(z).svg, renvois: claieRenvois },
      leve: { titre: 'Le lève-pots de fil de fer', dessin: z => leve(z).svg, renvois: leveRenvois },
      leveDessus: { titre: 'L’anneau, vu de dessus', dessin: z => leveDessus(z).svg, renvois: leveDessusRenvois },
    },
  };
};
