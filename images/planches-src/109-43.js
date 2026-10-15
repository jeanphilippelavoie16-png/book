// Planche 109-43. Rouler une bille à la corde double.
// Chapitre 109, §9, « Rouler une bille à la corde double » (étapes 1 à 4) : deux madriers en rampe
// du sol au plancher de la boîte ; une corde par madrier, frappée en haut sur un point fixe,
// descendue sous la pièce, passée dessous et remontée par-devant ; on tire les deux bouts
// remontés, ensemble : la pièce roule sur elle-même en montant, deux fois moins vite qu'on tire.
// « La rampe » (même §9) : les madriers se clouent ou s'amarrent en haut.
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
  const CORDE = `fill="none" stroke="#1A1A1A" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"`;
  const arc = (c, r, a0, a1, n = 40) => { const P = []; for (let i = 0; i <= n; i++) { const a = (a0 + (a1 - a0) * i / n) * RAD; P.push([c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)]); } return P; };

  // ─── Vue 1 : de profil ──────────────────────────────────────────────────────────────────
  const Pr = z => {
    const k = 0.108, yg = z.h - 12, H = 860 * k, yP = yg - H, ang = 22 * RAD;
    const run = H / Math.tan(ang), x0 = 6, xE = x0 + run;              // pied et haut de la rampe
    const u = [Math.cos(ang), -Math.sin(ang)], n = [-Math.sin(ang), -Math.cos(ang)];   // le long de la rampe ; normale vers le haut
    const em = 60 * k, rr = 1.4;            // épaisseur du madrier, demi-épaisseur de la corde
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
    const rw = 360 * k, roue = [xE + 120 + rw * 0.2, yg - rw];
    out.push(h.cercle(roue[0], roue[1], rw, h.a.loin), h.cercle(roue[0], roue[1], rw, A.detail), h.cercle(roue[0], roue[1], rw * 0.5, A.detail));
    out.push(h.rect(xE - 3, yP + ep + 3, 16, 12, blanc('arete')));
    out.push(h.path(poly([[xE, yP], [xF, yP], [xF, yP + ep], [xE, yP + ep]]), A.hachure('metal', 'contour')));
    // le madrier en rampe, du sol au rebord du plancher
    const md = [bas, add(bas, n, em), add(haut, n, em), haut];
    out.push(h.path(poly(md), blanc('contour')));
    for (const [t0, t1, o] of [[0.08, 0.3, 0.5], [0.52, 0.7, 0.45], [0.8, 0.94, 0.55]]) out.push(h.ligne(...add(lerp(bas, haut, t0), n, em * o), ...add(lerp(bas, haut, t1), n, em * o), A.fin));
    // amarré en haut : deux tours de corde du bout du madrier au plancher
    const am = lerp(bas, haut, 0.93);
    out.push(h.path(`M ${pt(add(am, n, em + 1))} L ${pt([xE + 22, yP - 1])} M ${pt(add(am, n, -1))} L ${pt([xE + 22, yP + ep + 1])} M ${pt([xE + 22, yP - 1])} L ${pt([xE + 22, yP + ep + 1])}`, A.detail));
    // le point fixe : un anneau sur le plancher
    out.push(h.path(`M ${pt([ancre[0] - 6, yP])} C ${pt([ancre[0] - 6, yP - 11])} ${pt([ancre[0] + 6, yP - 11])} ${pt([ancre[0] + 6, yP])}`, `fill="none" stroke="#1A1A1A" stroke-width="2.4" stroke-linecap="round"`));
    // la corde. Le brin fixe : de l'anneau au haut de la rampe, puis sur le madrier jusque sous la bille
    const rc = R + rr;
    const sous = add(C, n, -rc), dessus = add(C, n, rc);
    const aSous = Math.atan2(-n[1], -n[0]) / RAD;
    const autour = arc(C, rc, aSous, aSous + 180, 48);              // par l'aval, du dessous au dessus
    const hautRampe = add(haut, n, em + rr);
    out.push(h.path(`M ${pt([ancre[0] - 4, yP - 6])} L ${pt(hautRampe)} L ${pt(sous)}`, CORDE));
    // la bille, coupée par le bout : cernes ; l'ombre en bas à droite
    out.push(h.cercle(C[0], C[1], R, A.blanc));
    out.push(h.path(poly(arc(C, R, -30, 150, 30)), A.ombre));
    out.push(h.cercle(C[0], C[1], R, A.contour));
    out.push(h.cercle(C[0], C[1], R * 0.62, A.fin), h.cercle(C[0], C[1], R * 0.28, A.fin));
    // le tour par l'aval, puis le bout remonté par-dessus, parallèle à la rampe, vers celui qui tire
    const passe = add(add(haut, n, em + 2 * rc + rr), u, 14);
    const fin = add(passe, u, z.l - 40 - passe[0]);
    out.push(h.path('M ' + autour.map(pt).join(' L ') + ` L ${pt(passe)} L ${pt(fin)}`, CORDE));
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
    const m = add(lerp(bas, haut, 0.18), n, em * 0.5);
    const rc = R + rr, aSous = Math.atan2(-n[1], -n[0]) / RAD;
    const aval = add(C, [Math.cos((aSous + 90) * RAD), Math.sin((aSous + 90) * RAD)], rc + 1);
    const brF = lerp(add(haut, n, em + rr), add(C, n, -rc), 0.5);
    return [
      { n: 1, rond: [m[0] + 34, m[1] + 18], cible: [m[0] + 6, m[1] + 2], texte: 'madrier en rampe, amarré en haut' },
      { n: 2, rond: [ancre[0] + 30, yP - 34], cible: [ancre[0] + 4, yP - 8], texte: 'corde frappée sur un point fixe' },
      { n: 3, rond: [brF[0] + 22, brF[1] + 32], cible: [brF[0] + 1, brF[1] + 3], texte: 'descendue sous la pièce' },
      { n: 4, rond: [aval[0] - 22, aval[1] - 44], cible: [aval[0] - 1, aval[1] - 3], texte: 'remontée par-devant' },
    ];
  };

  // ─── Vue 2 : de face, depuis le bas de la rampe ─────────────────────────────────────────
  const Fa = z => {
    const k = 0.07, yg = z.h - 12, yP = yg - 860 * k - 16, cx = z.l / 2;
    const ec = 1250 * k / 2, lm = 240 * k;            // demi-écart des madriers, largeur d'un madrier
    const Rb = 190 * k, yb = yg - 0.4 * (yg - yP) - Rb, Lb = 2300 * k;   // la bille, couchée en travers
    return { k, yg, yP, cx, ec, lm, yb, Rb, Lb };
  };
  const vueFace = z => {
    const q = Fa(z), { k, yg, yP, cx, ec, lm, yb, Rb, Lb } = q, out = [];
    out.push(h.rect(0, yg, z.l, z.h - yg - 1, A.hachure('terre', 'aucun')));
    out.push(h.ligne(0, yg, z.l, yg, A.arete));
    // le rebord du plancher, vu de l'arrière
    out.push(h.path(poly([[8, yP - 9], [z.l - 8, yP - 9], [z.l - 8, yP], [8, yP]]), A.hachure('metal', 'contour')));
    // les deux madriers, qui montent en fuite vers le plancher
    for (const s of [-1, 1]) {
      const x = cx + s * ec;
      out.push(h.path(poly([[x - lm / 2 - 4, yg], [x + lm / 2 + 4, yg], [x + lm / 2, yP], [x - lm / 2, yP]]), blanc('contour')));
    }
    // la bille, couchée en travers des madriers
    const x0 = cx - Lb / 2, x1 = cx + Lb / 2, ex = Rb * 0.32;
    const corps = `M ${pt([x0, yb - Rb])} L ${pt([x1, yb - Rb])} A ${f(ex)} ${f(Rb)} 0 0 1 ${pt([x1, yb + Rb])} L ${pt([x0, yb + Rb])} Z`;
    out.push(h.path(corps, A.blanc));
    out.push(h.path(poly([[x0, yb + Rb * 0.3], [x1, yb + Rb * 0.3], [x1 + ex * 0.8, yb + Rb * 0.55], [x1, yb + Rb], [x0, yb + Rb]]), A.ombre));
    out.push(h.path(`M ${pt([x0, yb - Rb])} L ${pt([x1, yb - Rb])} A ${f(ex)} ${f(Rb)} 0 0 1 ${pt([x1, yb + Rb])} L ${pt([x0, yb + Rb])}`, A.contour));
    out.push(h.ellipse(x0, yb, ex, Rb, blanc('contour')));
    out.push(h.ellipse(x0, yb, ex * 0.55, Rb * 0.55, A.fin));
    // une corde par madrier : le tour sur la bille, les deux brins qui remontent au plancher
    for (const s of [-1, 1]) {
      const x = cx + s * ec;
      out.push(h.rect(x - 3, yb - Rb - 1, 6, 2 * Rb + 2, blanc('arete')));
      out.push(h.ligne(x - 2.2, yb - Rb - 1, x - 2.6, yP + 1, CORDE), h.ligne(x + 2.2, yb - Rb - 1, x + 2.6, yP + 1, CORDE));
    }
    // on tire les deux ensemble
    for (const s of [-1, 1]) {
      const x = cx + s * (ec + 16);
      out.push(h.geste(`M ${pt([x, yb - Rb - 6])} L ${pt([x, yP + 12])}`));
    }
    return out.join('\n');
  };
  const renvoisFace = z => {
    const q = Fa(z), { cx, ec, yb, Rb, yP, lm } = q;
    return [
      { n: 5, rond: [cx - ec - 34, yb + Rb + 22], cible: [cx - ec - 3, yb + Rb - 4], texte: 'une corde par madrier' },
      { n: 6, rond: [cx, yP + 30], cible: [cx + ec + 12, yP + 26], texte: 'les deux tirées ensemble' },
    ];
  };

  return {
    ref: '109-43',
    titre: 'Rouler une bille à la corde double',
    desc: 'Monter une bille dans une boîte de camion sans la lever. De profil : un madrier en rampe du sol au plancher de la boîte, amarré en haut ; une corde frappée sur un point fixe du plancher descend le long de la rampe, passe sous la bille, fait le tour par le bas de la pente et remonte par-dessus ; on tire le bout remonté et la bille roule sur elle-même en montant, deux fois moins vite qu’on tire. De face, depuis le bas de la rampe : deux madriers, la bille couchée en travers, une corde par madrier, les deux tirées ensemble pour que la bille ne se mette pas en travers.',
    format: 'demi',
    disposition: [['profil', 'face']],
    largeurs: [[1.9, 1]],
    vues: {
      profil: { titre: 'De profil', dessin: vueProfil, renvois: renvoisProfil },
      face: { titre: 'De face, depuis le bas', dessin: vueFace, renvois: renvoisFace },
    },
  };
};
