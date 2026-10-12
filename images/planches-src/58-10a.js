// Planche 58-10a — le ciseau à glace (ch. 58, section 9-A, points 1, 2 et 5).
// Aucune cote : ni le chapitre ni aucune source enregistrée ne chiffre la barre, le tuyau ou le biseau.
// Même orientation partout : pointe à droite, biseau dessus, face plate dessous.

module.exports = (h) => {
  const f = v => Math.round(v * 10) / 10;
  const P = pts => pts.map(([x, y]) => `${f(x)} ${f(y)}`).join(' L ');
  const blanc = (d, t = h.a.contour) => h.path(d, h.a.blanc) + '\n' + h.path(d, t);
  // ligne de rupture (la pièce continue hors du dessin), en trait fin, qui déborde un peu
  const rupture = (x, y1, y2) => {
    const m = (y1 + y2) / 2;
    return h.chemin([[x, y1 - 4], [x, m - 4], [x + 5, m - 1], [x - 5, m + 1], [x, m + 4], [x, y2 + 4]], h.a.fin);
  };
  // pièce coupée : pts commence et finit sur la rupture ; le contour reste ouvert de ce côté-là
  const piece = (pts, fond, trait) => [
    h.path(`M ${P(pts)} Z`, fond),
    h.path(`M ${P(pts)}`, trait),
  ].join('\n');

  // la dragonne : les deux brins sortent du trou, se nouent, et font la boucle
  const dragonne = (hx, cy, brinA, brinB) => {
    const kx = hx - 30, ky = cy - 4;
    return [
      h.path(`M ${f(brinA[0])} ${f(brinA[1])} Q ${f(hx - 14)} ${f(brinA[1] + 1)} ${f(kx + 2)} ${f(ky + 1)}`, h.a.arete),
      h.path(`M ${f(brinB[0])} ${f(brinB[1])} Q ${f(hx - 14)} ${f(brinB[1] - 3)} ${f(kx + 2)} ${f(ky - 1)}`, h.a.arete),
      h.path(`M ${f(kx)} ${f(ky)} C ${f(kx - 26)} ${f(cy - 38)} ${f(kx - 70)} ${f(cy - 30)} ${f(kx - 70)} ${f(cy - 2)} C ${f(kx - 70)} ${f(cy + 26)} ${f(kx - 26)} ${f(cy + 30)} ${f(kx)} ${f(ky + 2)}`, h.a.arete),
      h.cercle(kx, ky, 4, h.a.plein),
    ].join('\n');
  };

  // repères communs aux deux dessins de l'outil
  const X0 = 110, XM = 330, XB = 540, XT = 588, HX = X0 + 20;
  const R = 13;

  return {
    ref: '58-10a',
    titre: 'Le ciseau à glace',
    desc: 'Le ciseau à glace forgé dans une barre plate, vu de face et de chant : un bout de tuyau pour manche, la barre entrée dedans et soudée à la bouche, la dragonne passée dans un trou du manche, le bout écrasé en biseau d’un seul côté. Au milieu, le biseau qu’on forge à chaud sur l’enclume, face plate contre l’enclume, et la lime qui ne touche que le biseau. En bas, l’emmanchement en coupe et vu en bout.',
    format: 'pleine',
    disposition: [['outil'], ['forge', 'lime'], ['emmanchement']],
    hauteurs: [3.2, 3, 2.4],
    largeurs: [[1], [1, 1], [1]],
    vues: {
      outil: {
        titre: 'De face, puis de chant',
        dessin: z => {
          const cyF = f(z.h * 0.28), cyC = f(z.h * 0.74);
          const out = [];
          // ── de face : on regarde le côté du biseau
          const W = 9, WT = 13;
          out.push(blanc(`M ${P([[XM, cyF - W], [XB - 30, cyF - W], [XT, cyF - WT], [XT, cyF + WT], [XB - 30, cyF + W], [XM, cyF + W]])} Z`));
          out.push(h.path(`M ${f(XB)} ${f(cyF - 11)} Q ${f(XB + 3)} ${f(cyF)} ${f(XB)} ${f(cyF + 11)}`, h.a.arete));   // début du biseau
          out.push(h.chemin([[XM - 95, cyF - W], [XM, cyF - W]], h.a.cache));
          out.push(h.chemin([[XM - 95, cyF + W], [XM, cyF + W]], h.a.cache));
          out.push(h.chemin([[XM - 95, cyF - W], [XM - 95, cyF + W]], h.a.cache));
          out.push(h.rect(X0, cyF - R, XM - X0, 2 * R, h.a.contour));
          out.push(h.ligne(X0 + 6, cyF - 7, XM - 6, cyF - 7, h.a.fin));
          out.push(h.path(`M ${P([[XM, cyF - R], [XM + 11, cyF - W], [XM, cyF - W]])} Z`, h.a.plein));   // soudure
          out.push(h.path(`M ${P([[XM, cyF + R], [XM + 11, cyF + W], [XM, cyF + W]])} Z`, h.a.plein));
          out.push(h.cercle(HX, cyF, 3.2, h.a.arete));
          out.push(dragonne(HX, cyF, [HX, cyF], [HX, cyF - R]));
          // ── de chant : l'épaisseur de la barre, biseau dessus
          const T = 5;
          out.push(blanc(`M ${P([[XM, cyC - T], [XB, cyC - T], [XT, cyC + T - 1.2], [XT, cyC + T], [XM, cyC + T]])} Z`));
          out.push(h.chemin([[XM - 95, cyC - T], [XM, cyC - T]], h.a.cache));
          out.push(h.chemin([[XM - 95, cyC + T], [XM, cyC + T]], h.a.cache));
          out.push(h.chemin([[XM - 95, cyC - T], [XM - 95, cyC + T]], h.a.cache));
          out.push(h.rect(X0, cyC - R, XM - X0, 2 * R, h.a.contour));
          out.push(h.ligne(X0 + 6, cyC - 7, XM - 6, cyC - 7, h.a.fin));
          out.push(h.path(`M ${P([[XM, cyC - R], [XM + 12, cyC - T], [XM, cyC - T]])} Z`, h.a.plein));
          out.push(h.path(`M ${P([[XM, cyC + R], [XM + 12, cyC + T], [XM, cyC + T]])} Z`, h.a.plein));
          out.push(h.ligne(HX - 3, cyC - R, HX - 3, cyC + R, h.a.cache));   // le trou, traversant
          out.push(h.ligne(HX + 3, cyC - R, HX + 3, cyC + R, h.a.cache));
          out.push(dragonne(HX, cyC, [HX, cyC + R], [HX, cyC - R]));
          return out.join('\n');
        },
        renvois: z => {
          const cyF = f(z.h * 0.28), cyC = f(z.h * 0.74);
          return [
            { n: 1, rond: [460, cyF - 34], cible: [460, cyF - 9], texte: 'barre plate ou ressort' },
            { n: 2, rond: [230, cyF - 34], cible: [230, cyF - 13], texte: 'bout de tuyau pour manche' },
            { n: 3, rond: [360, cyF - 34], cible: [XM + 3, cyF - 11], texte: 'soudé ou fretté à chaud' },
            { n: 4, rond: [22, cyF - 36], cible: [36, cyF - 24], texte: 'dragonne passée au poignet' },
            { n: 5, rond: [XB + 4, cyC - 34], cible: [XB + 22, cyC - 1.5], texte: 'biseau d’un seul côté' },
            { n: 6, rond: [XT - 30, cyC + 34], cible: [XT - 30, cyC + 5], texte: 'face plate jusqu’au fil' },
          ];
        },
      },
      forge: {
        titre: 'Forger le biseau',
        dessin: z => {
          const AT = f(z.h * 0.64);
          const out = [];
          // l'enclume
          out.push(h.rect(70, AT, 190, z.h - AT - 4, h.a.hachure('metal')));
          out.push(h.ligne(70, AT, 260, AT, h.a.contour));
          // la barre, bout chauffé, écrasée dessus seulement
          out.push(piece([[10, AT - 14], [150, AT - 14], [208, AT - 2], [208, AT], [10, AT]], h.a.blanc, h.a.contour));
          out.push(rupture(10, AT - 14, AT));
          // le marteau, face parallèle au biseau, juste avant le coup
          const u = [58 / 59.2, 12 / 59.2], n = [12 / 59.2, -58 / 59.2];
          const c = [179 + n[0] * 44, AT - 8 + n[1] * 44];
          const pt = (a, b) => [c[0] + u[0] * a + n[0] * b, c[1] + u[1] * a + n[1] * b];
          out.push(blanc(`M ${P([pt(-12, -19), pt(12, -19), pt(12, 19), pt(-12, 19)])} Z`));
          out.push(blanc(`M ${P([pt(12, -4), pt(108, -3), pt(108, 5), pt(12, 6)])} Z`, h.a.arete));
          out.push(h.fleche(`M ${P([pt(-34, 26), pt(-34, -8)])}`));
          return out.join('\n');
        },
        renvois: z => {
          const AT = f(z.h * 0.64);
          return [
            { n: 7, rond: [118, 22], cible: [168, AT - 10.5], texte: 'bout chauffé, écrasé dessus' },
            { n: 8, rond: [34, AT + 34], cible: [90, AT], texte: 'dessous à plat sur l’enclume' },
          ];
        },
      },
      lime: {
        titre: 'Affûter sur la glace',
        dessin: z => {
          const BY = f(z.h * 0.66), TH = 30;
          const out = [];
          const B0 = [110, BY - TH], TIP = [226, BY - 3];
          out.push(piece([[12, BY - TH], B0, TIP, [226, BY], [12, BY]], h.a.blanc, h.a.contour));
          out.push(rupture(12, BY - TH, BY));
          // la lime couchée sur le biseau
          const L = Math.hypot(TIP[0] - B0[0], TIP[1] - B0[1]);
          const u = [(TIP[0] - B0[0]) / L, (TIP[1] - B0[1]) / L], n = [u[1], -u[0]];
          const pt = (s, o) => [B0[0] + u[0] * s + n[0] * o, B0[1] + u[1] * s + n[1] * o];
          out.push(blanc(`M ${P([pt(-70, 0), pt(160, 0), pt(160, 9), pt(-70, 9)])} Z`));
          out.push(blanc(`M ${P([pt(-70, 2.5), pt(-104, 3.5), pt(-104, 5.5), pt(-70, 6.5)])} Z`, h.a.arete));
          for (let s = -62; s < 156; s += 7) out.push(h.chemin([pt(s, 1), pt(s + 5, 8)], h.a.fin));
          out.push(h.fleche(`M ${P([pt(-20, 24), pt(70, 24)])}`));
          return out.join('\n');
        },
        renvois: z => {
          const BY = f(z.h * 0.66);
          return [
            { n: 9, rond: [262, 30], cible: [240, BY - 12], texte: 'lime sur le biseau seulement' },
            { n: 10, rond: [150, z.h - 12], cible: [150, BY], texte: 'face plate jamais limée' },
          ];
        },
      },
      emmanchement: {
        titre: 'L’emmanchement, en coupe et vu en bout',
        dessin: z => {
          const cy = f(z.h * 0.5), RO = 30, RI = 24, TB = 8, MX = 280;
          const out = [];
          // le tuyau coupé en long : deux parois
          out.push(piece([[24, cy - RO], [MX, cy - RO], [MX, cy - RI], [24, cy - RI]], h.a.hachure('metal', 'aucun'), h.a.arete));
          out.push(piece([[24, cy + RI], [MX, cy + RI], [MX, cy + RO], [24, cy + RO]], h.a.hachure('metal', 'aucun'), h.a.arete));
          out.push(rupture(24, cy - RO, cy + RO));
          // la barre, de chant, coupée elle aussi
          out.push(piece([[440, cy + TB], [130, cy + TB], [130, cy - TB], [440, cy - TB]], h.a.hachure('metal', 'aucun'), h.a.arete));
          out.push(rupture(440, cy - TB, cy + TB));
          // la soudure ferme la bouche, dessus et dessous
          out.push(h.path(`M ${P([[MX - 4, cy - RI], [MX, cy - RI], [MX, cy - RO + 1], [MX + 17, cy - TB], [MX - 4, cy - TB]])} Z`, h.a.plein));
          out.push(h.path(`M ${P([[MX - 4, cy + RI], [MX, cy + RI], [MX, cy + RO - 1], [MX + 17, cy + TB], [MX - 4, cy + TB]])} Z`, h.a.plein));
          // trait de coupe : où la vue en bout est prise, regard vers la droite
          const XC = 205, mixte = 'fill="none" stroke="#000" stroke-width="0.7" stroke-dasharray="14 3 2 3"';
          out.push(h.path(`M ${XC} ${f(cy - RO - 16)} L ${XC} ${f(cy + RO + 16)}`, mixte));
          for (const yy of [cy - RO - 16, cy + RO + 16]) {
            out.push(h.ligne(XC, yy - 3, XC, yy + 3, h.a.contour));
            out.push(h.fleche(`M ${XC} ${f(yy)} L ${XC + 20} ${f(yy)}`));
          }
          // vu en bout, juste en dedans de la bouche
          const cx = 530, hw = Math.sqrt(RI * RI - TB * TB);
          out.push(h.cercle(cx, cy, RO, h.a.hachure('metal')));
          out.push(h.cercle(cx, cy, RI, h.a.blanc));
          out.push(h.cercle(cx, cy, RI, h.a.arete));
          out.push(h.rect(cx - hw, cy - TB, 2 * hw, 2 * TB, h.a.hachure('metal')));
          return out.join('\n');
        },
        renvois: z => {
          const cy = f(z.h * 0.5);
          return [
            { n: 11, rond: [330, cy - 44], cible: [288, cy - 16], texte: 'soudure tout le tour' },
            { n: 12, rond: [590 - 14, cy - 44], cible: [530 + 21, cy - 8], texte: 'barre juste, coins à la paroi' },
          ];
        },
      },
    },
  };
};
