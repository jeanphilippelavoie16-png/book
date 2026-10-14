// Planche 27-02 — L'attelle de cire. De face : le boudin avant pressé sur cinq dents du haut, au
// ras de la gencive, la dent replantée au milieu, la cire poussée entre les dents. En coupe entre
// la dent replantée et sa voisine : les deux boudins et le pont de cire qui les joint en passant
// entre les dents, poussé à la pointe mousse. La coupe est agrandie, aussi grande que sa vue le
// permet ; elle n'est plus à l'échelle de la vue de face.
//
// La coupe a été redessinée le 14 octobre 2026 : elle était petite, la cire s'y lisait comme une
// seule saucisse et la dent comme un croc. Elle prend maintenant la moitié de la largeur (la vue de
// face passe de 7,55 à 6,6 px par mm), la pointe mousse est plus courte ; les deux boudins sont
// ronds et plus gros, leur rond se lit en trait fin à travers la cire, le pont est plus mince ; le
// contour entier de l'incisive, derrière la gencive et la cire, est en tireté sur un liseré blanc.
// Aucune cote : le chapitre n'en donne pas (des boudins « minces », « cinq dents »).
//
// La charte : la cire garde son contour fort. Le gris loin : les deux dents hors de l'attelle, de
// face, et la dent vue derrière le plan de coupe ; le dessous de la pointe mousse à l'ombre. Le
// rouge : la poussée de la pointe mousse, et le cercle sur le pont de cire, ce qui tient la dent.
module.exports = (h) => {
  const BL = h.a.blanc.split(' ')[0];                 // fill="#FFFFFF"
  const plein = t => t.replace('fill="none"', BL);   // trait + fond blanc
  const f = v => Math.round(v * 10) / 10;
  const mixte = 'fill="none" stroke="#1A1A1A" stroke-width="0.7" stroke-linecap="round" stroke-dasharray="14 3 2 3"';
  const cire = h.a.hachure('neige', 'contour');       // la cire : pointillé, trait fort (c'est ce qu'on fait)
  const gencive = h.a.hachure('metal', 'arete');      // la gencive coupée : hachure à 45°
  const S = 6.6;                                      // px par mm, la vue de face

  // Une ligne de cassure ondulée, de p à q (points écran).
  const cassure = (p, q, amp, n) => {
    const pts = [], dx = q[0] - p[0], dy = q[1] - p[1], L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L;
    for (let i = 0; i <= n * 8; i++) {
      const t = i / (n * 8), a = amp * Math.sin(t * n * Math.PI * 2);
      pts.push([p[0] + dx * t + nx * a, p[1] + dy * t + ny * a]);
    }
    return pts;
  };
  // Même repère vertical pour les deux vues : Y (face) = u (coupe), en mm, vers le bas.
  const Y0 = -7.4, Y1 = 15.2;
  const oyDe = z => (z.h - (Y1 - Y0) * S) / 2 - Y0 * S;

  // ─── Vue de face : sept dents du haut ; X vers la droite ──────────────────────────────
  // Les cinq de l'attelle vont de latD à canG ; la replantée est cenG, au milieu.
  const DENTS = [
    { id: 'canD', w: 5.4, ym: 0.0, yi: 10.2, type: 'can', mes: 'd' },
    { id: 'latD', w: 6.0, ym: 0.8, yi: 9.8, type: 'lat', mes: 'd' },
    { id: 'cenD', w: 8.5, ym: 0.0, yi: 10.5, type: 'cen', mes: 'd' },
    { id: 'cenG', w: 8.5, ym: 0.0, yi: 10.5, type: 'cen', mes: 'g' },
    { id: 'latG', w: 6.0, ym: 0.8, yi: 9.8, type: 'lat', mes: 'g' },
    { id: 'canG', w: 4.5, ym: 0.3, yi: 10.2, type: 'can', mes: 'g' },
    { id: 'pm', w: 4.8, ym: 0.6, yi: 8.9, type: 'pm', mes: 'g' },
  ];
  let xx = 0;
  DENTS.forEach(d => { d.x0 = xx; d.x1 = xx + d.w; d.xc = xx + d.w / 2; xx += d.w; });
  const LARG = xx, YP = 3.6;                          // YP : pointe des papilles
  const D = id => DENTS.find(d => d.id === id);
  const marge = X => {                                // le feston de la gencive
    const d = DENTS.find(t => X >= t.x0 - 1e-6 && X <= t.x1 + 1e-6) || (X < 0 ? DENTS[0] : DENTS[DENTS.length - 1]);
    const t = (X - d.xc) / (d.w / 2);
    return d.ym + (YP - d.ym) * t * t;
  };
  const repFace = z => {
    const ox = (z.l - LARG * S) / 2, oy = oyDe(z);
    const P = (X, Y) => [ox + X * S, oy + Y * S];
    const Ps = (X, Y) => { const [a, b] = P(X, Y); return `${f(a)},${f(b)}`; };
    return { P, Ps };
  };

  const dent = (g, d) => {
    const fond = (d.id === 'canD' || d.id === 'pm') ? h.a.arete.replace('fill="none"', 'fill="#E6E6E6"') : plein(h.a.arete);   // hors de l'attelle : recule
    const { Ps } = g, x0 = d.x0, x1 = d.x1, w = d.w, haut = d.ym - 1.2;
    if (d.type === 'can') {                         // canine : épaules, deux pentes droites, pointe mousse
      const tipX = x0 + w * (d.mes === 'g' ? 0.45 : 0.55), ys = d.yi - 3.2;
      return h.path(`M${Ps(x0 + 0.15, haut)} L${Ps(x0 + 0.15, YP)} Q${Ps(x0 - 0.15, (YP + ys) / 2)} ${Ps(x0 + 0.1, ys)} L${Ps(tipX - 0.7, d.yi - 0.35)} Q${Ps(tipX, d.yi + 0.15)} ${Ps(tipX + 0.7, d.yi - 0.35)} L${Ps(x1 - 0.1, ys)} Q${Ps(x1 + 0.15, (YP + ys) / 2)} ${Ps(x1 - 0.15, YP)} L${Ps(x1 - 0.15, haut)} Z`, fond);
    }
    if (d.type === 'pm') {                          // prémolaire : une cuspide basse et ronde, pentes douces
      const tipX = x0 + w * 0.5, ys = d.yi - 2.0;
      return h.path(`M${Ps(x0 + 0.15, haut)} L${Ps(x0 + 0.15, YP)} Q${Ps(x0 - 0.1, (YP + ys) / 2)} ${Ps(x0 + 0.1, ys)} Q${Ps(x0 + 0.9, d.yi - 0.9)} ${Ps(tipX - 1.0, d.yi - 0.25)} Q${Ps(tipX, d.yi + 0.25)} ${Ps(tipX + 1.0, d.yi - 0.25)} Q${Ps(x1 - 0.9, d.yi - 0.9)} ${Ps(x1 - 0.1, ys)} Q${Ps(x1 + 0.1, (YP + ys) / 2)} ${Ps(x1 - 0.15, YP)} L${Ps(x1 - 0.15, haut)} Z`, fond);
    }
    const rm = d.type === 'cen' ? 0.55 : 1.1, rd = d.type === 'cen' ? 1.4 : 2.0, monte = d.type === 'lat' ? 0.5 : 0.15;
    const rg = d.mes === 'g' ? rm : rd, rr = d.mes === 'g' ? rd : rm;
    const yg = d.yi - (d.mes === 'g' ? 0 : monte), yd = d.yi - (d.mes === 'g' ? monte : 0);
    return h.path(`M${Ps(x0 + 0.15, haut)} L${Ps(x0 + 0.15, YP)} Q${Ps(x0 - 0.12, (YP + yg) / 2)} ${Ps(x0, yg - rg)} Q${Ps(x0, yg)} ${Ps(x0 + rg, yg)} L${Ps(x1 - rr, yd)} Q${Ps(x1, yd)} ${Ps(x1, yd - rr)} Q${Ps(x1 + 0.12, (YP + yd) / 2)} ${Ps(x1 - 0.15, YP)} L${Ps(x1 - 0.15, haut)} Z`, fond);
  };
  // deux sillons légers au bas des incisives centrales : ce qui fait lire une dent de devant
  const sillons = (g, d) => [0.36, 0.64].map(k => {
    const a = g.P(d.x0 + d.w * k, d.yi - 1.3), b = g.P(d.x0 + d.w * k, d.yi - 3.9);
    return h.ligne(f(a[0]), f(a[1]), f(b[0]), f(b[1]), h.a.fin);
  }).join('\n');

  // Le boudin avant pressé : un ruban mince qui suit le feston, collé à la gencive.
  const EP = 2.9, CAP = 2.1;
  const XA = D('latD').x0 + 0.5, XB = D('canG').x1 - 0.3;
  const hautBrut = X => Math.min(marge(X) + 0.1, CAP);
  const hautCire = X => {                              // adouci : la cire ne fait pas d'angle
    let s = 0, n = 0;
    for (let k = -4; k <= 4; k++) { s += hautBrut(X + k * 0.2); n++; }
    return s / n;                                   // passe par-dessus la pointe des papilles
  };
  const basCire = X => hautCire(X) + EP;
  const bandeAvant = g => {
    const { P } = g, r = 1.3, pts = [];
    for (let X = XA + r; X <= XB - r + 1e-6; X += 0.2) pts.push(P(X, hautCire(X)));
    const capD = XB - r, tD = hautCire(capD), bD = basCire(capD);
    for (let i = 0; i <= 14; i++) { const a = -Math.PI / 2 + Math.PI * i / 14; pts.push(P(capD + r * Math.cos(a), (tD + bD) / 2 + (bD - tD) / 2 * Math.sin(a))); }
    for (let X = XB - r; X >= XA + r - 1e-6; X -= 0.2) pts.push(P(X, basCire(X)));
    const capG = XA + r, tG = hautCire(capG), bG = basCire(capG);
    for (let i = 0; i <= 14; i++) { const a = Math.PI / 2 + Math.PI * i / 14; pts.push(P(capG + r * Math.cos(a), (tG + bG) / 2 + (bG - tG) / 2 * Math.sin(a))); }
    return [h.chemin(pts, h.a.blanc, true), h.chemin(pts, cire, true)].join('\n');
  };
  const JOINTS = ['latD', 'cenD', 'cenG', 'latG'].map(id => D(id).x1);
  const fossettes = g => JOINTS.map(X => {
    const yc = (hautCire(X) + basCire(X)) / 2, [cx, cy] = g.P(X, yc), rx = 0.6 * S, ry = 0.85 * S;
    return [
      h.ellipse(f(cx), f(cy), f(rx), f(ry), plein(h.a.detail)),
      h.path(`M${f(cx - rx * 0.5)},${f(cy - ry * 0.6)} Q${f(cx - rx * 0.95)},${f(cy)} ${f(cx - rx * 0.5)},${f(cy + ry * 0.6)}`, h.a.fin),
    ].join('\n');
  }).join('\n');

  const gencive2D = g => {
    const { P } = g, ytop = -3.4;
    const haut = cassure(P(-0.05, ytop), P(LARG + 0.05, ytop), 0.16 * S, 5);
    const droite = cassure(P(LARG + 0.05, ytop), P(LARG + 0.05, YP), 0.1 * S, 1);
    const feston = [];
    for (let X = LARG; X >= -1e-6; X -= 0.1) feston.push(P(X, marge(X)));
    const gauche = cassure(P(-0.05, YP), P(-0.05, ytop), 0.1 * S, 1);
    return [
      h.chemin([...haut, ...droite, ...feston, ...gauche], h.a.blanc, true),
      h.chemin(feston, h.a.arete),
      h.chemin(haut, h.a.fin), h.chemin(droite, h.a.fin), h.chemin(gauche, h.a.fin),
    ].join('\n');
  };

  // Le trait de coupe, entre la dent replantée et sa voisine ; les flèches regardent la replantée.
  const XCOUPE = D('cenG').x1, YC0 = -4.9, YC1 = 12.2;
  const traitCoupe = g => {
    const [x, ya] = g.P(XCOUPE, YC0), [, yb] = g.P(XCOUPE, YC1), L = 2.6 * S, k = 3.6;
    const bout = y => [
      h.ligne(f(x), f(y), f(x - L + 5), f(y), h.a.arete),
      h.path(`M${f(x - L)},${f(y)} L${f(x - L + 2.2 * k)},${f(y - k)} L${f(x - L + 2.2 * k)},${f(y + k)} Z`, h.a.plein),
    ].join('\n');
    return [h.ligne(f(x), f(ya), f(x), f(yb), mixte), bout(ya), bout(yb)].join('\n');
  };

  // ─── Coupe : la dent replantée vue de côté, derrière le plan de coupe ────────────────
  // u : du collet vers le bord (vers le bas) ; v : de la lèvre (−, à gauche) au palais (+).
  const LABIAL = [[-3.4, -3.0], [-2, -3.15], [0, -3.3], [1.5, -3.35], [3, -3.3], [5, -3.2], [7, -3.1], [9, -2.9], [10.1, -2.75]];
  const BORD = [[10.5, -2.6], [10.55, -1.8]];          // bord tranchant mince
  const PALAT = [[10.2, -1.5], [9, -1.0], [7.5, -0.4], [6, 0.4], [4.6, 1.5], [3.4, 2.9], [2.4, 3.7], [1.4, 3.85], [0.5, 3.6], [0, 3.4], [-2, 3.2], [-3.4, 3.0]];  // face arrière creuse, cingulum en haut
  const PAPILLE = [[1.3, -4.05], [2.4, -3.4], [3.05, -2.3], [3.3, -0.9], [3.25, 0.6], [3.05, 2.0], [2.5, 3.3], [1.4, 4.2]];
  const GENC_LAB = [[-3.4, -4.85], [-1, -4.7], [0, -4.55], [0.7, -4.45], [1.05, -4.28]];
  const GENC_PAL = [[0.7, 4.6], [0, 4.85], [-1.2, 5.3], [-2.4, 6.1], [-3.4, 7.1]];
  const ell = (c, ru, rv, a0, a1, n) => {
    const out = [];
    for (let i = 0; i <= n; i++) { const a = a0 + (a1 - a0) * i / n; out.push([c[0] + ru * Math.cos(a), c[1] + rv * Math.sin(a)]); }
    return out;
  };
  const C1 = [3.0, -5.9], C2 = [3.0, 5.5], RB = 2.6;  // le boudin avant, le boudin arrière, leur rayon
  const CIRE = [
    [1.25, -4.4],
    ...ell(C1, RB, RB, 0.93 * Math.PI, 2 * Math.PI + 0.42, 36),
    [4.15, -2.8], [4.05, -1.4], [4.0, 0], [4.05, 1.4], [4.15, 2.6],   // le pont, mince
    ...ell(C2, RB, RB, -0.42, 1.1 * Math.PI, 36),
    ...PAPILLE.slice().reverse(),
  ];
  const OUTIL = { u: 3.6, r: 1.0, v0: -13.6, v1: -8.4 }; // la pointe mousse, dans l'axe de la poussée
  const FL = { u: 6.2, v0: -11.6, v1: -8.0 };
  const V0 = -14.2, V1 = 9.4, U0 = -4.4, U1 = 11.4;     // étendue de la coupe, pastilles comprises
  const repCoupe = z => {
    const SC = Math.min(z.l / (V1 - V0), z.h / (U1 - U0));   // la coupe, aussi grande que sa vue le permet
    const ox = (z.l - (V1 - V0) * SC) / 2 - V0 * SC, oy = (z.h - (U1 - U0) * SC) / 2 - U0 * SC;
    return (u, v) => [ox + v * SC, oy + u * SC];
  };

  return {
    ref: '27-02',
    titre: 'L’attelle de cire',
    desc: 'De face : un boudin de cire d’abeille pressé contre la face avant de cinq dents du haut, au ras de la gencive, la dent replantée au milieu, et la cire poussée entre chaque paire de dents ; un trait de coupe passe entre la dent replantée et sa voisine. En coupe à cet endroit : la dent vue de côté, le boudin avant côté lèvre, le boudin arrière côté palais au même niveau, et le pont de cire qui les joint en passant entre les dents, poussé avec une pointe mousse.',
    format: 'demi',
    disposition: [['face', 'coupe']],
    largeurs: [[1, 1]],
    vues: {
      face: {
        titre: 'De face',
        dessin: z => {
          const g = repFace(z);
          return [
            ...DENTS.map(d => dent(g, d)),
            sillons(g, D('cenD')), sillons(g, D('cenG')),
            gencive2D(g),
            bandeAvant(g),
            fossettes(g),
            traitCoupe(g),
          ].join('\n');
        },
        renvois: z => {
          const g = repFace(z), cg = D('cenG'), ld = D('latD'), jd = D('cenD').x1;
          return [
            { n: 1, rond: g.P(cg.x0 + 1.6, 13.9), cible: g.P(cg.xc - 0.6, 7.4), texte: 'dent replantée, deux voisines de chaque côté' },
            { n: 2, rond: [11, g.P(0, 3.3)[1]], cible: g.P(ld.x0 + 1.6, (hautCire(ld.x0 + 1.6) + basCire(ld.x0 + 1.6)) / 2), texte: 'boudin avant, au ras de la gencive' },
            { n: 3, rond: g.P(jd, -6.1), cible: g.P(jd, 2.6), texte: 'cire poussée entre chaque paire de dents' },
          ];
        },
      },
      coupe: {
        titre: 'Coupe entre deux dents',
        dessin: z => {
          const T = repCoupe(z);
          const pts = L => L.map(([u, v]) => T(u, v));
          const dentPts = pts([...LABIAL.filter(p => p[0] >= 0), ...BORD, ...PALAT.filter(p => p[0] >= 0)]);
          const haut = cassure(T(-3.4, 7.1), T(-3.4, -4.85), 0.16 * S, 4);
          const genc = [...pts(GENC_LAB), ...pts(PAPILLE), ...pts(GENC_PAL), ...haut];
          const ciré = pts(CIRE);
          // la pointe mousse : un bâton rond, le bout arrondi contre le boudin avant
          const o = OUTIL, tip = [T(o.u - o.r, o.v0), T(o.u - o.r, o.v1 - o.r)];
          for (let i = 1; i < 12; i++) { const a = Math.PI + Math.PI * i / 12; tip.push(T(o.u + o.r * Math.cos(a), o.v1 - o.r - o.r * Math.sin(a))); }
          tip.push(T(o.u + o.r, o.v1 - o.r), T(o.u + o.r, o.v0));
          const fib = [[o.u - 0.35, o.v0 + 0.8, o.v0 + 3.0], [o.u + 0.4, o.v0 + 1.8, o.v0 + 3.9]].map(([u, a, c]) => {
            const p = T(u, a), q = T(u, c);
            return h.ligne(f(p[0]), f(p[1]), f(q[0]), f(q[1]), h.a.fin);
          });
          const bout = cassure(T(o.u - o.r, o.v0), T(o.u + o.r, o.v0), 0.1 * S, 1);
          const fa = T(FL.u, FL.v0), fb = T(FL.u, FL.v1);
          return [
            h.chemin(dentPts, h.a.fin.replace('fill="none"', 'fill="#E6E6E6"'), true),   // derrière le plan de coupe
            h.chemin(genc, h.a.blanc, true),
            h.chemin(genc, gencive, true),
            h.chemin(ciré, h.a.blanc, true),
            h.chemin(ciré, cire, true),
            // le rond de chaque boudin, en trait fin à travers la cire : deux boudins et un pont
            `<clipPath id="pont-cire"><path d="M${ciré.map(p => `${f(p[0])},${f(p[1])}`).join(' L')} Z" fill="none"/></clipPath>`,
            `<g clip-path="url(#pont-cire)">`,
            h.chemin(pts(ell(C1, RB, RB, 0.42, 0.93 * Math.PI, 16)), h.a.detail),
            h.chemin(pts(ell(C2, RB, RB, 1.1 * Math.PI, 2 * Math.PI - 0.42, 16)), h.a.detail),
            `</g>`,
            // la dent, derrière la gencive et la cire : tout son contour en tireté, sur un liseré
            // blanc, pour qu'on lise une incisive entière que les deux boudins enserrent
            `<clipPath id="dent-cachee"><path d="M${ciré.map(p => `${f(p[0])},${f(p[1])}`).join(' L')} Z" fill="none"/><path d="M${genc.map(p => `${f(p[0])},${f(p[1])}`).join(' L')} Z" fill="none"/></clipPath>`,
            `<g clip-path="url(#dent-cachee)">`,
            h.chemin(pts([...LABIAL, ...BORD, ...PALAT]), 'fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linejoin="round"'),
            h.chemin(pts([...LABIAL, ...BORD, ...PALAT]), h.a.cache),
            `</g>`,
            h.chemin(tip, h.a.blanc, true),
            (() => {                                  // le dessous de la pointe, à l'ombre
              const k = 0.35, a0 = 2 * Math.PI - Math.acos(k), arc = [];
              for (let i = 0; i <= 8; i++) { const a = a0 + (2 * Math.PI - a0) * i / 8; arc.push(T(o.u + o.r * Math.cos(a), o.v1 - o.r - o.r * Math.sin(a))); }
              return h.chemin([T(o.u + k * o.r, o.v0), ...arc, T(o.u + o.r, o.v0)], h.a.ombre, true);
            })(),
            h.chemin(tip, h.a.arete, false),
            h.chemin(bout, h.a.fin),
            ...fib,
            h.geste(`M${f(fa[0])},${f(fa[1])} L${f(fb[0])},${f(fb[1])}`),
            (() => { const c = T(4.3, 0); return h.controle(c[0], c[1], 15); })(),   // le pont qui tient la dent
          ].join('\n');
        },
        renvois: z => {
          const T = repCoupe(z);
          return [
            { n: 4, rond: T(-2.4, -10.6), cible: T(2.2, -7.0), texte: 'boudin avant, côté lèvre' },
            { n: 5, rond: T(8.6, 7.4), cible: T(4.2, 6.6), texte: 'boudin arrière, côté palais, au même niveau' },
            { n: 6, rond: T(9.6, 3.6), cible: T(3.7, 1.0), texte: 'le pont de cire tient la dent' },
            { n: 7, rond: T(8.8, -13.3), cible: T(4.2, -12.6), texte: 'pointe mousse : pousser jusqu’au boudin arrière' },
          ];
        },
      },
    },
  };
};
