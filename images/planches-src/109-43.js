// Planche 109-43. Rouler une bille à la corde double.
// Chapitre 109, §9, « Rouler une bille à la corde double » (étapes 1 à 4) : deux madriers en rampe
// du sol au plancher de la boîte ; une corde par madrier, frappée en haut sur un point fixe,
// descendue sous la pièce, passée dessous et remontée par-devant ; on tire les deux bouts
// remontés, ensemble : la pièce roule sur elle-même en montant, deux fois moins vite qu'on tire.
// La retenue en arrière n'est pas dessinée : le chapitre ne dit pas comment on la grée sur une
// pièce qui roule. Aucune cote : le chapitre n'en donne pas (madriers, bille et camion à vue).
// Vue de profil : la boîte en coupe dans son axe, pour voir le point fixe sur le plancher.
module.exports = (h) => {
  const A = h.a;
  const BL = '#FFFFFF';
  const blanc = t => A[t].replace('fill="none"', `fill="${BL}"`);
  const gris = t => A[t].replace('fill="none"', 'fill="#E6E6E6"');
  const f = v => Math.round(v * 100) / 100;
  const pt = p => `${f(p[0])} ${f(p[1])}`;
  const poly = (P, ferme = true) => 'M ' + P.map(pt).join(' L ') + (ferme ? ' Z' : '');
  const add = (a, b, k = 1) => [a[0] + b[0] * k, a[1] + b[1] * k];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const lon = v => Math.hypot(v[0], v[1]);
  const uni = v => { const l = lon(v) || 1; return [v[0] / l, v[1] / l]; };
  const nor = v => [-v[1], v[0]];
  const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  const RAD = Math.PI / 180;
  // la corde : un trait creux (bord noir, âme blanche), pour qu'elle se distingue des arêtes du bois
  const corde = d => [h.path(d, `fill="none" stroke="#1A1A1A" stroke-width="4.6" stroke-linecap="round" stroke-linejoin="round"`),
    h.path(d, `fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`)].join('\n');
  const arc = (c, r, a0, a1, n = 40) => { const P = []; for (let i = 0; i <= n; i++) { const a = (a0 + (a1 - a0) * i / n) * RAD; P.push([c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)]); } return P; };

  // ─── Vue 1 : de profil ──────────────────────────────────────────────────────────────────
  const Pr = z => {
    const k = 0.108, yg = z.h - 12, H = 860 * k, yP = yg - H, ang = 22 * RAD;
    const run = H / Math.tan(ang), x0 = 6, xE = x0 + run;              // pied et haut de la rampe
    const u = [Math.cos(ang), -Math.sin(ang)], n = [-Math.sin(ang), -Math.cos(ang)];   // le long de la rampe ; normale vers le haut
    const em = 60 * k, rr = 2.3;            // épaisseur du madrier, demi-épaisseur de la corde
    const bas = [x0, yg], haut = [xE, yP];
    const S = t => add(lerp(bas, haut, t), n, em);                     // le dessus du madrier
    const R = 190 * k, sb = 0.4;
    const C = add(S(sb), n, R + 2 * rr);
    const ancre = [xE + 330 * k, yP];
    return { k, yg, H, yP, ang, run, x0, xE, u, n, em, rr, bas, haut, S, R, C, ancre };
  };
  const vueProfil = z => {
    const q = Pr(z), { k, yg, yP, xE, x0, u, n, em, rr, bas, haut, S, R, C, ancre } = q, out = [];
    // le sol
    out.push(h.rect(0, yg, z.l, z.h - yg - 1, A.hachure('terre', 'aucun')));
    out.push(h.ligne(0, yg, z.l, yg, A.arete));
    // l'arrière du camion : la roue en gris, le plancher de la boîte coupé dans son axe, le pare-chocs
    const xF = z.l - 2, ep = 9;
    const rw = 360 * k, roue = [xE + 92, yg - rw];
    out.push(h.cercle(roue[0], roue[1], rw, h.a.loin), h.cercle(roue[0], roue[1], rw, A.detail), h.cercle(roue[0], roue[1], rw * 0.5, A.detail));
    out.push(h.path(poly([[xE, yP], [xF, yP], [xF, yP + ep], [xE, yP + ep]]), A.hachure('metal', 'contour')));
    // le madrier en rampe, du sol au rebord du plancher
    const md = [bas, add(bas, n, em), add(haut, n, em), haut];
    out.push(h.path(poly(md), blanc('contour')));
    for (const [t0, t1, o] of [[0.08, 0.3, 0.5], [0.52, 0.7, 0.45], [0.8, 0.94, 0.55]]) out.push(h.ligne(...add(lerp(bas, haut, t0), n, em * o), ...add(lerp(bas, haut, t1), n, em * o), A.fin));
    // le point fixe : un anneau sur le plancher
    out.push(h.path(`M ${pt([ancre[0] - 6, yP])} C ${pt([ancre[0] - 6, yP - 11])} ${pt([ancre[0] + 6, yP - 11])} ${pt([ancre[0] + 6, yP])}`, `fill="none" stroke="#1A1A1A" stroke-width="2.4" stroke-linecap="round"`));
    const rc = R + rr;
    const sous = add(C, n, -rc), dessus = add(C, n, rc);
    const aSous = Math.atan2(-n[1], -n[0]) / RAD;
    const autour = arc(C, rc, aSous, aSous + 180, 48);              // par l'aval, du dessous au dessus
    const hautRampe = add(haut, n, em + rr);
    // la bille, coupée par le bout : cernes ; l'ombre en bas à droite
    out.push(h.cercle(C[0], C[1], R, A.blanc));
    out.push(h.path(poly(arc(C, R, -30, 150, 30)), A.ombre));
    out.push(h.cercle(C[0], C[1], R, A.contour));
    out.push(h.cercle(C[0], C[1], R * 0.62, A.fin), h.cercle(C[0], C[1], R * 0.28, A.fin));
    // la corde, d'un seul tracé du point fixe au bout tiré : de l'anneau au haut de la rampe, sur le madrier jusque sous
    // la bille, le tour par l'aval, puis le bout remonté par-dessus, parallèle à la rampe, vers celui qui tire
    const passe = add(add(haut, n, em + 2 * rc + rr), u, 14);
    const fin = add(passe, u, (z.l - 60 - passe[0]) / u[0]);
    out.push(corde(`M ${pt([ancre[0] - 4, yP - 6])} L ${pt(hautRampe)} L ` + autour.map(pt).join(' L ') + ` L ${pt(passe)} L ${pt(fin)}`));
    // on tire : la flèche du geste sur le bout remonté
    const g0 = add(add(fin, u, -64), n, 11), g1 = add(add(fin, u, -18), n, 11);
    out.push(h.geste(`M ${pt(g0)} L ${pt(g1)}`));
    // la bille roule en montant
    const fr = arc(C, R + 12, 196, 268, 20);
    out.push(h.fleche('M ' + fr.map(pt).join(' L '), A.detail));
    return out.join('\n');
  };
  const renvoisProfil = z => {
    const q = Pr(z), { k, yg, yP, xE, x0, u, n, em, rr, bas, haut, S, R, C, ancre } = q;
    const m = lerp(bas, haut, 0.5);                    // le dessous du madrier, à mi-pente
    const passe = add(add(haut, n, em + 2 * (R + rr) + rr), u, 14);
    const fin = add(passe, u, (z.l - 60 - passe[0]) / u[0]);
    const gm = lerp(add(add(fin, u, -64), n, 11), add(add(fin, u, -18), n, 11), 0.5);
    const rc = R + rr, aSous = Math.atan2(-n[1], -n[0]) / RAD;
    // le repère 4 vient de la gauche, à peu près à la hauteur du centre de la bille : son rappel arrive en travers de la
    // corde qui fait le tour, et reste sous la queue de la flèche de rotation
    const yQ = C[1] + 6, aval = [C[0] - Math.sqrt((rc + rr) ** 2 - 36), yQ];
    const brF = lerp(add(haut, n, em + rr), add(C, n, -rc), 0.5);
    return [
      { n: 1, rond: [m[0] + 4, yg - 19], cible: [m[0] + 4, m[1] - 4 * Math.tan(q.ang) + 1.5], texte: 'madrier en rampe, du sol au plancher' },
      { n: 2, rond: [ancre[0] + 30, yP - 34], cible: [ancre[0] + 4, yP - 8], texte: 'corde frappée sur un point fixe' },
      { n: 3, rond: [brF[0] + 22, brF[1] + 32], cible: [brF[0] + 1, brF[1] + 3], texte: 'descendue sous la pièce' },
      { n: 4, rond: [aval[0] - 34, yQ], cible: [aval[0] - 0.4, yQ], texte: 'remontée par-devant' },
      { n: 5, rond: [gm[0] + n[0] * 30, gm[1] + n[1] * 30], cible: [gm[0] + n[0] * 3, gm[1] + n[1] * 3], texte: 'tirer le bout remonté' },
    ];
  };

  // ─── Vue 2 : vue de dessus ──────────────────────────────────────────────────────────────
  // La rampe monte vers la droite, comme dans la vue de profil. Les deux madriers, la bille
  // couchée en travers, une corde par madrier : le brin fixe, de l'anneau à la bille, passe sous
  // elle (caché, en tireté) ; le bout remonté repart par-dessus vers la droite.
  const Fa = z => {
    const k = 0.054, cy = z.h / 2 - 4, run = 2130 * k, x0 = 8, xE = x0 + run;   // assez petit pour laisser au bout de chaque corde la place de sa flèche
    const ec = 1250 * k / 2, lm = 240 * k;
    const Rb = 190 * k, xb = x0 + 0.42 * run, Lb = 2300 * k;
    return { k, cy, run, x0, xE, ec, lm, Rb, xb, Lb };
  };
  const vueFace = z => {
    const q = Fa(z), { k, cy, x0, xE, ec, lm, Rb, xb, Lb } = q, out = [];
    // le plancher de la boîte, à droite, entre ses deux côtés ; sans hachure : la vue n'est pas une coupe
    const lb = 1650 * k / 2;
    out.push(h.path(poly([[z.l - 2, cy - lb], [xE, cy - lb], [xE, cy + lb], [z.l - 2, cy + lb]], false), A.contour));
    // les madriers
    for (const s_ of [-1, 1]) out.push(h.rect(x0, cy + s_ * ec - lm / 2, xE + 8 - x0, lm, blanc('contour')));
    // le fil du bois : à gauche de la bille, près du bord du madrier et loin de la corde, pour ne pas la prolonger
    for (const s_ of [-1, 1]) for (const [a, b, o] of [[0.03, 0.2, 0.36], [0.6, 0.85, 0.2]]) out.push(h.ligne(x0 + a * (xE - x0), cy + s_ * ec + o * lm, x0 + b * (xE - x0), cy + s_ * ec + o * lm, A.fin));
    // les cordes : le brin fixe, de l'anneau jusque sous la bille
    const ax = xE + 330 * k;
    for (const s_ of [-1, 1]) {
      const y = cy + s_ * ec - 2.6;
      out.push(corde(`M ${pt([ax, y])} L ${pt([xb + Rb + 2, y])}`));
      out.push(h.path(`M ${pt([ax - 5, y - 6])} C ${pt([ax + 5, y - 7])} ${pt([ax + 5, y + 7])} ${pt([ax - 5, y + 6])}`, `fill="none" stroke="#1A1A1A" stroke-width="2.4" stroke-linecap="round"`));
    }
    // la bille, vue de dessus ; l'ombre sur sa face droite
    out.push(h.rect(xb - Rb, cy - Lb / 2, 2 * Rb, Lb, A.blanc));
    out.push(h.rect(xb + Rb * 0.35, cy - Lb / 2, Rb * 0.65, Lb, A.ombre));
    out.push(h.rect(xb - Rb, cy - Lb / 2, 2 * Rb, Lb, A.contour));
    // le brin fixe sous la bille, caché
    for (const s_ of [-1, 1]) out.push(h.ligne(xb + Rb - 1, cy + s_ * ec - 2.6, xb - Rb + 2, cy + s_ * ec - 2.6, A.cache));
    // le tour par l'aval et le bout remonté par-dessus, qui repart vers la droite, passe l'anneau et s'arrête
    const xBout = ax + 12;
    for (const s_ of [-1, 1]) {
      const y = cy + s_ * ec + 2.6;
      out.push(corde(`M ${pt([xb - Rb - 3, y - 5.2])} Q ${pt([xb - Rb - 7, y - 2.6])} ${pt([xb - Rb - 3, y])} L ${pt([xBout, y])}`));
    }
    // on tire les deux ensemble : chaque flèche dans l'axe de son bout tiré, juste après lui
    for (const s_ of [-1, 1]) {
      const y = cy + s_ * ec + 2.6;
      out.push(h.geste(`M ${pt([xBout + 5, y])} L ${pt([z.l - 6, y])}`));
    }
    return out.join('\n');
  };
  const renvoisFace = z => {
    const q = Fa(z), { k, cy, x0, xE, ec, lm, Rb, xb } = q;
    const xBout = xE + 330 * k + 12, xm = (xBout + 5 + z.l - 6) / 2 - 3, x6 = (xb + Rb + xE) / 2;
    return [
      // sur la corde du madrier du bas, entre la bille et le plancher
      { n: 6, rond: [x6, cy + 4], cible: [x6, cy + ec - 2.6 - 2.5], texte: 'une corde par madrier' },
      { n: 7, rond: [xm, cy + 2], cible: [xm, cy + ec + 2.6 - 2.2], texte: 'tirer les deux bouts ensemble' },
    ];
  };

  return {
    ref: '109-43',
    titre: 'Rouler une bille à la corde double',
    desc: 'Monter une bille dans une boîte de camion sans la lever. De profil : un madrier en rampe du sol au plancher de la boîte ; une corde frappée sur un point fixe du plancher descend le long de la rampe, passe sous la bille, fait le tour par le bas de la pente et remonte par-dessus ; on tire le bout remonté et la bille roule sur elle-même en montant, deux fois moins vite qu’on tire. Vu de dessus : deux madriers, la bille couchée en travers, une corde par madrier ; le brin fixe passe sous la bille, le bout remonté repart par-dessus ; les deux bouts se tirent ensemble pour que la bille ne se mette pas en travers.',
    format: 'demi',
    disposition: [['profil', 'face']],
    largeurs: [[1.9, 1]],
    vues: {
      profil: { titre: 'De profil', dessin: vueProfil, renvois: renvoisProfil },
      face: { titre: 'Vu de dessus', dessin: vueFace, renvois: renvoisFace },
    },
  };
};
