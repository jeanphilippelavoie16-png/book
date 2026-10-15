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
// La pince : « deux baguettes de bois franc entaillées en pince et serrées d'une main » : les deux
// entailles se font face et prennent la bague par-dessous. Sans main : le renvoi dit la prise.
// La charte : en coupe, la marmite en tôle mince (aplat noir), l'eau en trait, la paroi d'en face en
// gris loin au-dessus de l'eau. Le rouge : la sortie du pot à la verticale (le geste) ; le dessous
// du pot, posé sur la grille et pas sur le fond (point à contrôler) ; les deux baguettes qu'on serre.
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
  const marmite = z => {
    const out = [];
    const s = Math.min((z.h - 40) / 230, (z.l - 110) / 290);
    const cx = z.l / 2 - 14, yb = z.h - 6;
    const R = 140 * s, H = 220 * s, e = 3;            // la marmite, dessinée, pas cotée
    const yT = yb - H;
    const hG = 9 * s;                                  // hauteur de la grille d'anneaux
    const yG = yb - e - hG;                            // dessus de la grille : là où posent les pots
    const ypot = 128;                                  // hauteur du pot, en mm
    const yCouv = yG - ypot * s;                        // dessus des couvercles
    const main = 95 * s;                                // une hauteur de main, dessinée
    const yE = yCouv - main;                            // le niveau de l'eau
    // la paroi d'en face, au-dessus de l'eau, en gris loin
    out.push(h.rect(cx - R + e, yT, 2 * (R - e), yE - yT, A.loin));
    // l'eau, du fond jusqu'au niveau : elle passe sous les pots, entre les anneaux
    out.push(h.rect(cx - R + e, yE, 2 * (R - e), yb - e - yE, A.blanc), h.rect(cx - R + e, yE, 2 * (R - e), yb - e - yE, A.hachure('eau', 'aucun')));
    out.push(h.ligne(cx - R + e, yE, cx + R - e, yE, A.detail));
    // la grille d'anneaux, coupée : chaque anneau donne deux petites sections ; le fil qui les lie
    const xs = [], pas = 72 * s, rA = 34 * s;
    for (let x = cx - R + e + rA + 2; x + rA < cx + R - e; x += pas) xs.push(x);
    const dx = (cx - (xs[0] + xs[xs.length - 1]) / 2);
    xs.forEach(x0 => {
      const x = x0 + dx;
      [-1, 1].forEach(sg => out.push(h.rect(x + sg * rA - 2 * s, yG, 4 * s, hG, A.plein)));
    });
    // les pots, posés sur la grille, sans se toucher
    const pots = [];
    const n = xs.length;
    xs.forEach((x0, i) => {
      const p = pot(x0 + dx, yG, s);
      pots.push(p); out.push(p.svg);
    });
    // la marmite : tôle mince coupée, poignées, couvercle posé
    out.push(h.path(poly([[cx - R, yT], [cx - R, yb], [cx + R, yb], [cx + R, yT], [cx + R - e, yT], [cx + R - e, yb - e], [cx - R + e, yb - e], [cx - R + e, yT]]), A.plein));
    [-1, 1].forEach(sg => out.push(h.path(`M${r1(cx + sg * R)} ${r1(yT + 14)} q${r1(sg * 14)} 0 ${r1(sg * 14)} 10 q0 10 ${r1(-sg * 14)} 10`, A.arete)));
    const yC = yT - 4;
    out.push(h.path(`M${r1(cx - R - 6)} ${r1(yT)} L${r1(cx - R - 6)} ${r1(yC)} Q${r1(cx)} ${r1(yC - 16)} ${r1(cx + R + 6)} ${r1(yC)} L${r1(cx + R + 6)} ${r1(yT)} Z`, blanc(A.contour)));
    out.push(h.path(`M${r1(cx - 12)} ${r1(yC - 13)} q0 -9 12 -9 q12 0 12 9`, A.arete));
    // la cote : une main d'eau au-dessus des couvercles, prise à droite des pots
    const xq = cx + R - e - 14;
    out.push(h.ligne(pots[n - 1].X(RBague) + 2, yCouv, xq + 4, yCouv, A.fin));
    out.push(h.cote(xq, yE, xq, yCouv, 'une main au moins', { cote: 'droite' }));
    // le point à contrôler : le fond du pot sur la grille, pas sur la tôle
    out.push(h.controle(pots[0].X(0), yG, 12));
    return { svg: out.join('\n'), cx, R, yT, yb, yG, yE, yC, pots, rA, xs: xs.map(x => x + dx), s, e };
  };
  const marmiteRenvois = z => {
    const m = marmite(z);
    return [
      { n: 1, rond: [m.cx - m.R - 26, m.yG - 6], cible: [m.xs[0] - m.rA - 2 * m.s - 1, m.yG + 4], texte: 'grille au fond : l’eau passe dessous' },
      { n: 2, rond: [m.cx - m.R - 26, m.yG - 70], cible: [m.pots[0].X(-RB) - 1, m.yG - 70], texte: 'pots qui ne se touchent pas' },
      { n: 3, rond: [m.cx - m.R - 26, m.yC - 14], cible: [m.cx - m.R - 4, m.yC - 3], texte: 'marmite couverte' },
    ];
  };

  // ─── Vue 2 : la grille d'anneaux, vue de dessus ──────────────────────────────────────────────
  const anneaux = z => {
    const out = [];
    const cx = z.l / 2, cy = z.h / 2 + 2;
    const Rm = Math.min(z.l / 2 - 10, z.h / 2 - 8);    // la marmite, vue de dessus
    const ra = Rm * 0.235, ri = ra * 0.84;              // un anneau : bord extérieur et intérieur
    out.push(h.cercle(cx, cy, Rm, A.contour), h.cercle(cx, cy, Rm - 3, A.detail));
    // anneaux en nid d'abeilles, qui se touchent
    const pas = 2 * ra, centres = [];
    for (let j = -2; j <= 2; j++) for (let i = -3; i <= 3; i++) {
      const x = cx + i * pas + (j % 2 ? pas / 2 : 0), y = cy + j * pas * Math.sqrt(3) / 2;
      if (Math.hypot(x - cx, y - cy) + ra < Rm - 4) centres.push([x, y]);
    }
    centres.forEach(([x, y]) => {
      out.push(h.cercle(x, y, ra, blanc(A.arete)), h.cercle(x, y, ri, A.detail));
    });
    // le fil de fer : un tour serré à chaque point de contact entre deux anneaux
    const liens = [];
    centres.forEach((a, i) => centres.forEach((b, j) => {
      if (j <= i) return;
      if (Math.abs(Math.hypot(a[0] - b[0], a[1] - b[1]) - pas) < 1) liens.push([(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, Math.atan2(b[1] - a[1], b[0] - a[0])]);
    }));
    liens.forEach(([x, y, t]) => {
      const ux = Math.cos(t), uy = Math.sin(t), nx = -uy, ny = ux, L = ra * 0.42, w = 2.4;
      out.push(h.path(poly([[x - ux * w - nx * L / 2, y - uy * w - ny * L / 2], [x + ux * w - nx * L / 2, y + uy * w - ny * L / 2], [x + ux * w + nx * L / 2, y + uy * w + ny * L / 2], [x - ux * w + nx * L / 2, y - uy * w + ny * L / 2]]), A.plein));
    });
    return { svg: out.join('\n'), cx, cy, Rm, ra, centres, liens };
  };
  const anneauxRenvois = z => {
    const a = anneaux(z);
    const c = a.centres[0], l = a.liens.reduce((m, q) => (q[1] < m[1] ? q : m));
    return [
      { n: 4, rond: [z.l - 12, 14], cible: [l[0] + 3, l[1] - 2], texte: 'anneaux de pots liés au fil de fer' },
    ];
  };

  // ─── Vue 3 : la claie de baguettes ───────────────────────────────────────────────────────────
  const claie = z => {
    const out = [];
    const cx = z.l / 2, cy = z.h / 2 + 2;
    const Rm = Math.min(z.l / 2 - 10, z.h / 2 - 8);
    out.push(h.cercle(cx, cy, Rm, A.contour), h.cercle(cx, cy, Rm - 3, A.detail));
    const d = 7, n = 5, pas = (2 * Rm * 0.62) / (n - 1);
    const pos = Array.from({ length: n }, (_, i) => -Rm * 0.62 + i * pas);
    const L = t => Math.sqrt(Math.max(0, (Rm - 8) ** 2 - t * t));     // demi-longueur dans le cercle
    // le rang du dessous : baguettes verticales ; le rang du dessus : horizontales
    pos.forEach(t => { const l = L(t) - 2; out.push(h.rect(cx + t - d / 2, cy - l, d, 2 * l, blanc(A.arete))); });
    pos.forEach(t => {
      const l = L(t) - 2;
      out.push(h.rect(cx - l, cy + t - d / 2, 2 * l, d, blanc(A.arete)));
      out.push(h.path(`M${r1(cx - l + 6)} ${r1(cy + t)} L${r1(cx + l - 6)} ${r1(cy + t + 0.5)}`, A.fin));
    });
    // une ligature en croix à chaque croisement
    pos.forEach(a => pos.forEach(b => {
      const x = cx + a, y = cy + b;
      if (Math.hypot(a, b) > Rm - 14) return;
      out.push(h.path(`M${r1(x - 5)} ${r1(y - 5)} L${r1(x + 5)} ${r1(y + 5)} M${r1(x + 5)} ${r1(y - 5)} L${r1(x - 5)} ${r1(y + 5)}`, A.detail));
    }));
    return { svg: out.join('\n'), cx, cy, pos, Rm };
  };
  const claieRenvois = z => {
    const c = claie(z);
    return [
      { n: 5, rond: [z.l - 12, 14], cible: [c.cx + c.pos[3] + 5, c.cy + c.pos[0] - 5], texte: 'ou baguettes croisées, ligaturées' },
    ];
  };

  // ─── Vue 4 : le lève-pots de fil de fer ──────────────────────────────────────────────────────
  // De côté : le pot sorti de l'eau, l'anneau du crochet sous la bague, le manche qui monte et finit
  // en boucle pour la main. Au-dessus, en petit : l'anneau vu de dessus, ouvert d'un côté.
  const leve = z => {
    const out = [];
    const s = Math.min((z.h - 84) / 128, (z.l - 40) / 90);
    const cx = z.l * 0.42, yb = z.h - 6;
    const p = pot(cx, yb, s);
    out.push(p.svg);
    // l'anneau, presque de chant : la moitié de devant passe devant le col, celle de derrière derrière
    const ry = 4, rx = (RN + 2.2) * s, yA = p.yCol + 1;
    const fil = 2.4;                                   // diamètre du fil, dessiné
    // le manche : il part de l'arrière de l'anneau, à gauche, monte, et finit en boucle
    const xm = cx - rx - 1, yM = 22;
    const manche = `M${r1(xm)} ${r1(yA)} L${r1(xm - 4)} ${r1(yA - 18)} L${r1(xm - 4)} ${r1(yM + 22)} C${r1(xm - 4)} ${r1(yM + 4)} ${r1(xm + 24)} ${r1(yM)} ${r1(xm + 24)} ${r1(yM + 14)} C${r1(xm + 24)} ${r1(yM + 26)} ${r1(xm + 4)} ${r1(yM + 26)} ${r1(xm - 3)} ${r1(yM + 22)}`;
    out.push(h.path(manche, `fill="none" stroke="#1A1A1A" stroke-width="${fil + 1.4}" stroke-linecap="round" stroke-linejoin="round"`));
    out.push(h.path(manche, `fill="none" stroke="#FFFFFF" stroke-width="${fil - 0.6}" stroke-linecap="round" stroke-linejoin="round"`));
    // l'arrière de l'anneau, caché par le col : en tireté
    out.push(h.path(`M${r1(cx - rx)} ${r1(yA)} A${r1(rx)} ${ry} 0 0 1 ${r1(cx + rx)} ${r1(yA)}`, A.cache));
    // le devant de l'anneau, du côté gauche jusqu'à l'ouverture, un peu à droite du milieu
    const t1 = 0.25 * Math.PI;                           // l'ouverture, côté droit, vers l'avant
    const xo = cx + rx * Math.cos(t1), yo = yA + ry * Math.sin(t1);
    const avant = `M${r1(cx - rx)} ${r1(yA)} A${r1(rx)} ${ry} 0 0 0 ${r1(xo)} ${r1(yo)}`;
    out.push(h.path(avant, `fill="none" stroke="#1A1A1A" stroke-width="${fil + 1.4}" stroke-linecap="round"`));
    out.push(h.path(avant, `fill="none" stroke="#FFFFFF" stroke-width="${fil - 0.6}" stroke-linecap="round"`));
    // le geste : sortir le pot à la verticale
    out.push(h.geste(`M${r1(cx + rx + 26)} ${r1(p.yBague + 30)} L${r1(cx + rx + 26)} ${r1(p.yBague - 40)}`));

    // l'anneau vu de dessus, en petit, à droite en haut : le col en rond, l'anneau ouvert
    const ox = z.l - 44, oy = 56, Rc = 17, Ra = Rc + 3;
    out.push(h.cercle(ox, oy, Rc + 6, A.cache));      // la bague, plus large, au-dessus (cachée)
    out.push(h.cercle(ox, oy, Rc, blanc(A.arete)));   // le col
    const a0 = -0.55 * Math.PI + Math.PI / 2, a1 = 0.55 * Math.PI + Math.PI / 2; // ouvert vers la droite
    const arc = [];
    for (let i = 0; i <= 40; i++) { const t = a1 + (2 * Math.PI - (a1 - a0)) * i / 40; arc.push([ox + Ra * Math.cos(t), oy + Ra * Math.sin(t)]); }
    // l'anneau : de l'ouverture du bas, par la gauche, jusqu'à l'ouverture du haut ; le manche part à gauche
    const dArc = ligne(arc);
    out.push(h.path(dArc, `fill="none" stroke="#1A1A1A" stroke-width="${fil + 1.4}" stroke-linecap="round"`));
    out.push(h.path(dArc, `fill="none" stroke="#FFFFFF" stroke-width="${fil - 0.6}" stroke-linecap="round"`));
    out.push(h.cercle(ox - Ra, oy, fil / 2 + 1.2, A.plein));   // le manche qui monte, vu par le bout
    return { svg: out.join('\n'), p, cx, rx, yA, xm, yM, ox, oy, Ra, s };
  };
  const leveRenvois = z => {
    const l = leve(z);
    return [
      { n: 6, rond: [l.xm + 52, l.yM + 4], cible: [l.xm + 25, l.yM + 12], texte: 'gros fil de fer plié' },
      { n: 7, rond: [l.cx - l.rx - 34, l.yA + 30], cible: [l.cx - l.rx * 0.5, l.yA + 4], texte: 'l’anneau prend sous le col' },
      { n: 8, rond: [l.ox - l.Ra - 2, l.oy + l.Ra + 26], cible: [l.ox + 4, l.oy + l.Ra + 1], texte: 'ouvert d’un côté, plus d’un demi-tour' },
    ];
  };

  // ─── Vue 5 : la pince de deux baguettes ──────────────────────────────────────────────────────
  const pince = z => {
    const out = [];
    const s = Math.min((z.h - 40) / 150, (z.l - 30) / 100);
    const cx = z.l / 2, yb = z.h + 40 * s;            // le pot coupé par le bas de la vue
    const p = pot(cx, yb, s);
    const clip = 'vue-78-41-pince';
    out.push(`<clipPath id="${clip}"><rect x="0" y="0" width="${r1(z.l)}" height="${r1(z.h - 2)}"/></clipPath>`);
    out.push(`<g clip-path="url(#${clip})">${p.svg}</g>`);
    // les deux baguettes, de part et d'autre de la bague, chacune entaillée en face du col
    const d = 9 * s, top = 10, yE = p.yCol;            // épaisseur des baguettes ; l'entaille, au col
    [-1, 1].forEach(sg => {
      const xi = cx + sg * (RN + 0.5) * s;            // la face intérieure, au fond de l'entaille
      const xf = cx + sg * (RBague + 1) * s;          // la face intérieure, hors de l'entaille
      const xe = xf + sg * d;                          // la face extérieure
      const ye0 = yE + 2.5 * s, ye1 = yE - 4 * s;      // l'entaille : son bas, son haut (contre la bague)
      const ybas = yE + 22 * s;
      const pts = [[xe, top], [xe, ybas], [xi, ybas - 4 * s], [xi, ye0], [xf, ye1], [xf, top]];
      out.push(h.path(poly(pts), blanc(A.contour)));
      out.push(h.path(`M${r1(xe - sg * d * 0.45)} ${r1(top + 6)} L${r1(xe - sg * d * 0.5)} ${r1(ye1 - 10)}`, A.fin));
    });
    // le geste : serrer les deux baguettes l'une contre l'autre
    const yG = top + 34;
    [-1, 1].forEach(sg => {
      const x0 = cx + sg * ((RBague + 1) * s + d + 30), x1 = cx + sg * ((RBague + 1) * s + d + 5);
      out.push(h.geste(`M${r1(x0)} ${r1(yG)} L${r1(x1)} ${r1(yG)}`));
    });
    return { svg: out.join('\n'), p, cx, d, yE, s, top, yG };
  };
  const pinceRenvois = z => {
    const q = pince(z);
    const xg = q.cx - (RBague + 1) * q.s - q.d;
    return [
      { n: 9, rond: [16, q.yE + 46], cible: [q.cx - (RN + 0.5) * q.s - 1, q.yE + 2], texte: 'deux baguettes entaillées' },
      { n: 10, rond: [16, q.top + 8], cible: [xg - 1, q.top + 14], texte: 'serrées d’une main' },
    ];
  };

  return {
    ref: '78-41',
    titre: 'La grille de fond et le lève-pots',
    desc: 'En coupe, une marmite de bain d’eau bouillante : au fond, une grille d’anneaux de pots ; les pots posés dessus sans se toucher ; l’eau passe sous les pots '
      + 'et couvre les couvercles d’au moins une hauteur de main ; la marmite est couverte. À côté, la grille vue de dessus : des anneaux de pots en nid d’abeilles, '
      + 'liés au fil de fer à chaque contact ; puis l’autre grille : des baguettes croisées sur deux rangs, ligaturées à chaque croisement. '
      + 'En bas, le lève-pots plié dans du gros fil de fer : un anneau ouvert d’un côté, glissé sous la bague du pot, et un manche qui finit en boucle ; on sort le pot à la verticale. '
      + 'Enfin, la pince de deux baguettes de bois franc, entaillées en face l’une de l’autre, qui prennent la bague par-dessous et qu’on serre d’une main.',
    format: 'pleine',
    disposition: [['marmite'], ['anneaux', 'claie'], ['leve', 'pince']],
    hauteurs: [1.1, 0.75, 1.25],
    largeurs: [[1], [1, 1], [1.25, 1]],
    vues: {
      marmite: { titre: 'Le bain, en coupe', dessin: z => marmite(z).svg, renvois: marmiteRenvois },
      anneaux: { titre: 'La grille d’anneaux, vue de dessus', dessin: z => anneaux(z).svg, renvois: anneauxRenvois },
      claie: { titre: 'Sans anneaux : la claie', dessin: z => claie(z).svg, renvois: claieRenvois },
      leve: { titre: 'Le lève-pots de fil de fer', dessin: z => leve(z).svg, renvois: leveRenvois },
      pince: { titre: 'La pince de baguettes', dessin: z => pince(z).svg, renvois: pinceRenvois },
    },
  };
};
