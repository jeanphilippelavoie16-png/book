// Planche 12-01a — la tente à poêle montée (ch. 12, sections 5B, 5C, 5D, 5E).
// En travers, au poêle, en regardant vers la porte : le vent à gauche, le poêle à droite (sous le
// vent). Le poêle sur ses pieux jusqu'au sol, le lit de sable, la clé, la collerette dans le pan du
// toit, le tuyau plus haut que le faîte avec son pare-étincelles et ses haubans à des corps morts ;
// à gauche, l'entrée d'air basse, une boîte sous la jupe, jamais renchaussée.
// En long, par le faîte, la porte à gauche, le fond à droite : plancher foulé, lit de neige au fond
// avec sa perche, sapinage en écailles, rond de neige nue autour du poêle, faîte sur ses chevalets,
// renchaussement sur la jupe (au moins 0,5 m, seule cote : ch. 12, 5C point 6).
// Aucune autre dimension n'est dans le chapitre : les proportions sont celles d'une tente de
// prospecteur, sans cote.

module.exports = (h) => {
  const f = v => Math.round(v * 10) / 10;
  const blanc = a => a.replace('fill="none"', 'fill="#ffffff"');

  // ─── Géométrie commune, en mètres (y vers le haut depuis le plancher).
  const G = {
    W: 1.5,        // demi-largeur au mur
    He: 1.10,      // haut du mur, sur la traverse
    Hr: 2.26,      // dessus de la toile au faîte
    D: 0.45,       // neige sous le plancher, jusqu'au sol
    Sol: 0.15,     // bande de sol dessinée
    haut: 3.34,    // sommet du pare-étincelles
    rp: 0.06,      // rayon des perches
    tuyau: 0.13,   // diamètre du tuyau
    poele: { l0: 0.40, l1: 0.90, b: 0.30, t: 0.68 },   // en travers : du côté sous le vent
    lp: 0.65,      // position du tuyau (en travers)
    hb: 2.90,      // attache des haubans
  };
  const pente = (G.Hr - G.He) / (G.W - G.rp);          // pente du toit
  const toit = l => G.Hr - Math.abs(l) * pente;          // hauteur du toit à la distance l du milieu

  // Le sapinage en coupe : des branches couchées, bout coupé piqué, pointe dans le sens d.
  const sapinage = (x1, x2, yb, t, d) => {
    const w = 3.2 * t, p = 0.42 * w, out = [];
    const deb = d < 0 ? x2 : x1, fin = d < 0 ? x1 : x2;
    for (let xs = deb; d < 0 ? xs - w * 0.8 >= fin - 1 : xs + w * 0.8 <= fin + 1; xs += d * p) {
      const xe = xs + d * w;
      out.push(h.path(`M ${f(xs)} ${f(yb + 1.5)} C ${f(xs + d * w * 0.15)} ${f(yb - t * 1.25)} ${f(xs + d * w * 0.55)} ${f(yb - t * 1.15)} ${f(xe)} ${f(yb - t * 0.25)}`, h.a.detail));
      const ai = [0.3, 0.5, 0.7].map(u => {
        const x = xs + d * w * u, y = yb - t * (1.05 - 0.4 * Math.abs(u - 0.45));
        return `M ${f(x)} ${f(y)} l ${f(d * 3)} ${f(2.2)}`;
      });
      out.push(h.path(ai.join(' '), h.a.fin));
    }
    return out.join('\n');
  };

  // Le tuyau : rectangle blanc, joints, clé dans la première section.
  const tuyau = (xc, yBas, yHaut, k, joints) => {
    const r = G.tuyau / 2 * k, out = [h.rect(xc - r, yHaut, 2 * r, yBas - yHaut, blanc(h.a.arete))];
    for (const y of joints) out.push(h.ligne(xc - r - 1.2, y, xc + r + 1.2, y, h.a.detail));
    return out.join('\n');
  };
  const cle = (xc, y, k) => {
    const r = G.tuyau / 2 * k;
    return [
      h.path(`M ${f(xc - r + 1)} ${f(y + 2.5)} L ${f(xc + r - 1)} ${f(y - 2.5)}`, h.a.detail),
      h.ligne(xc + r, y, xc + r + 0.1 * k, y, h.a.arete),
      h.cercle(xc + r + 0.1 * k + 2, y, 2, blanc(h.a.detail)),
    ].join('\n');
  };
  // Le pare-étincelles : un manchon de treillis serré au fil sur le haut du tuyau.
  const pareEt = (xc, yBas, yHaut, k) => {
    const r = 0.1 * k, rt = G.tuyau / 2 * k;
    return [
      h.path(`M ${f(xc - r)} ${f(yBas)} L ${f(xc - r)} ${f(yHaut + 4)} Q ${f(xc)} ${f(yHaut - 3)} ${f(xc + r)} ${f(yHaut + 4)} L ${f(xc + r)} ${f(yBas)} Z`, h.a.hachure('grillage')),
      h.rect(xc - r - 0.5, yBas - 3, 2 * r + 1, 3, h.a.plein),
      h.ligne(xc - rt, yBas + 0.5, xc - r, yBas, h.a.detail),
      h.ligne(xc + rt, yBas + 0.5, xc + r, yBas, h.a.detail),
    ].join('\n');
  };
  // Le piquet fourchu en Y sous une traverse (au-delà de la coupe).
  const fourche = (x, yBas, yt, rp) => h.path(`M ${f(x)} ${f(yBas)} L ${f(x)} ${f(yt + rp + 3)} L ${f(x - rp - 1.5)} ${f(yt - 1)} M ${f(x)} ${f(yt + rp + 3)} L ${f(x + rp + 1.5)} ${f(yt - 1)}`, h.a.detail);
  // Un corps mort en coupe : bout de bois dans une petite fosse rebouchée de neige foulée.
  const corpsMort = (x, y, k) => {
    const r = G.rp * k, fl = 0.16 * k;
    return [
      h.path(`M ${f(x - fl)} ${f(y - 0.25 * k + 0.5)} L ${f(x - fl * 0.7)} ${f(y + r + 2)} L ${f(x + fl * 0.7)} ${f(y + r + 2)} L ${f(x + fl)} ${f(y - 0.25 * k + 0.5)}`, h.a.fin),
      h.cercle(x, y, r, h.a.hachure('bois')),
    ].join('\n');
  };

  // ─── En travers.
  const T = z => {
    const k = Math.min((z.h - 8) / (G.haut + 0.05 + G.D + G.Sol), (z.l - 12) / 6.8);
    const yf = 4 + (G.haut + 0.05) * k;
    const cx = z.l / 2 + 0.35 * k;
    return { k, yf, X: l => cx + l * k, Y: y => yf - y * k };
  };
  // Les deux haubans visibles en travers, et leurs corps morts.
  const HG = { l: -3.6, y: -0.25 }, HD = { l: 2.9, y: -0.25 };

  // ─── En long, par le faîte.
  const Lg = 4.2;                                          // longueur de la toile
  const P = { s0: 0.5, s1: 1.1, sp: 0.6 };                // poêle et tuyau, depuis le mur de la porte
  const rondNu = [0.35, 1.75];
  const Lo = z => {
    const k = Math.min((z.h - 8) / (G.haut + 0.05 + G.D + G.Sol), (z.l - 20) / 7.2);
    const yf = 4 + (G.haut + 0.05) * k;
    const sx0 = z.l / 2 - (Lg / 2) * k;
    return { k, yf, S: s => sx0 + s * k, Y: y => yf - y * k };
  };

  return {
    ref: '12-01a',
    titre: 'La tente à poêle montée',
    desc: 'Deux coupes de la tente de prospecteur montée sur la neige. En travers, au poêle, en regardant vers la porte : le vent arrive par la gauche et entre par une boîte de conserve glissée sous la jupe, au ras du plancher, à un endroit qu’on ne renchausse pas ; il traverse l’allée jusqu’au poêle, posé à droite sur quatre pieux verts plantés à travers la neige jusqu’au sol, avec un lit de sable au fond ; le tuyau a sa clé dans la première section, traverse le pan du toit dans une collerette de tôle cousue à la toile, monte plus haut que le faîte, porte un manchon de treillis en pare-étincelles et tient par des haubans de fil de fer amarrés à des corps morts. En long, par le faîte, la porte à gauche et le fond à droite : le plancher de neige foulée, le lit de neige à hauteur des genoux sur la moitié du fond avec une perche couchée à son bord, le sapinage en écailles sur le lit et dans l’allée, un rond de neige nue autour du poêle, le faîte plus long que la toile sur ses chevalets, et au pied du mur la jupe couchée à plat sous la neige pelletée, au moins un demi-mètre.',
    format: 'pleine',
    disposition: [['travers'], ['long']],
    hauteurs: [1.3, 1],
    vues: {
      travers: {
        titre: 'En travers, au poêle, vers la porte',
        dessin: z => {
          const { k, X, Y } = T(z), out = [];
          const po = G.poele, rp = G.rp * k;
          // Sol et neige.
          out.push(h.rect(2, Y(-G.D), z.l - 4, G.Sol * k, h.a.hachure('terre', 'aucun')));
          out.push(h.ligne(2, Y(-G.D), z.l - 2, Y(-G.D), h.a.arete));
          out.push(h.rect(2, Y(0), z.l - 4, G.D * k, h.a.hachure('neige', 'aucun')));
          out.push(h.ligne(2, Y(0), z.l - 2, Y(0), h.a.arete));
          // Renchaussement, côté sous le vent : la neige pelletée sur la jupe couchée à plat.
          out.push(h.path(`M ${f(X(G.W))} ${f(Y(0))} L ${f(X(G.W))} ${f(Y(0.55))} L ${f(X(G.W + 0.18))} ${f(Y(0.55))} Q ${f(X(G.W + 0.45))} ${f(Y(0.5))} ${f(X(G.W + 0.68))} ${f(Y(0))} Z`, h.a.hachure('neige')));
          out.push(h.ligne(X(G.W), Y(0) - 1, X(G.W + 0.42), Y(0) - 1, h.a.contour));
          // Côté du vent : pas de renchaussement ici. La jupe couchée sur la boîte de conserve.
          // La boîte, ouverte aux deux bouts, en coupe : la jupe couchée dessus s'arrête avant
          // la bouche, qui reste dégagée dehors.
          const c0 = -G.W - 0.3, c1 = -G.W + 0.08, cd = 0.15;
          out.push(h.rect(X(c0), Y(cd), (c1 - c0) * k, cd * k, h.a.blanc));
          out.push(h.ligne(X(c0), Y(cd), X(c1), Y(cd), h.a.arete));
          out.push(h.ligne(X(c0), Y(0) - 0.7, X(c1), Y(0) - 0.7, h.a.arete));
          out.push(h.ligne(X(-G.W), Y(cd) - 1.6, X(c0 + 0.1), Y(cd) - 1.6, h.a.contour));
          // La toile : murs, traverses, faîte.
          const u = [1 / Math.hypot(1, pente), -pente / Math.hypot(1, pente)];   // le long du pan droit, vers le bas
          const yc = toit(G.lp);
          const ouv = 0.13, pl = 0.30;                  // demi-ouverture de la toile, demi-plaque (le long du pan)
          const pt = t => [X(G.lp + t * u[0]), Y(yc + t * u[1])];
          const trEave = s => [X(s * (G.W - G.rp)), Y(G.He)];
          out.push(h.chemin([[X(-G.W), Y(cd) - 1.6], [X(-G.W), Y(G.He - G.rp)], trEave(-1), [X(0), Y(G.Hr)], pt(-ouv)], h.a.contour));
          out.push(h.chemin([pt(ouv), trEave(1), [X(G.W), Y(G.He - G.rp)], [X(G.W), Y(0)]], h.a.contour));
          out.push(h.cercle(X(0), Y(G.Hr - G.rp), rp, h.a.hachure('bois')));
          for (const s of [-1, 1]) out.push(h.cercle(X(s * (G.W - G.rp)), Y(G.He - G.rp), rp, h.a.hachure('bois')));
          // Le sapinage de l'allée, et le rond de neige nue autour du poêle.
          out.push(sapinage(X(-G.W + 0.18), X(0.05), Y(0), 0.085 * k, 1));
          // Les pieux, coupés : jusqu'au sol.
          for (const lx of [po.l0 + 0.06, po.l1 - 0.06]) out.push(h.rect(X(lx) - 0.04 * k, Y(po.b), 0.08 * k, (po.b + G.D + 0.04) * k, h.a.hachure('bois')));
          // Le poêle, coupé : lit de sable au fond, deux bûches.
          out.push(h.rect(X(po.l0), Y(po.t), (po.l1 - po.l0) * k, (po.t - po.b) * k, blanc(h.a.contour)));
          out.push(h.rect(X(po.l0) + 1.2, Y(po.b + 0.09), (po.l1 - po.l0) * k - 2.4, 0.09 * k - 1.2, h.a.hachure('gravier', 'aucun')));
          out.push(h.cercle(X(0.56), Y(po.b + 0.15), 0.055 * k, h.a.hachure('bois', 'detail')));
          out.push(h.cercle(X(0.72), Y(po.b + 0.16), 0.06 * k, h.a.hachure('bois', 'detail')));
          // Haubans (derrière le tuyau).
          const rt = G.tuyau / 2 * k;
          out.push(h.ligne(X(G.lp) - rt, Y(G.hb), X(HG.l), Y(HG.y), h.a.detail));
          out.push(h.ligne(X(G.lp) + rt, Y(G.hb), X(HD.l), Y(HD.y), h.a.detail));
          out.push(corpsMort(X(HG.l), Y(HG.y), k));
          out.push(corpsMort(X(HD.l), Y(HD.y), k));
          // Le tuyau, la clé, la collerette, le pare-étincelles.
          out.push(tuyau(X(G.lp), Y(po.t), Y(3.12), k, [Y(1.25), Y(2.05), Y(2.6)]));
          out.push(cle(X(G.lp), Y(0.92), k));
          // La plaque par-dessus la toile, trouée à peine plus grand que le tuyau ; les languettes
          // rabattues vers le haut, le long du tuyau.
          const th = (G.tuyau / 2 + 0.015) / u[0], no = [0.628 * 1.8, -0.779 * 1.8];
          const sh = p => [p[0] + no[0], p[1] + no[1]];
          const plaque = 'fill="none" stroke="#1A1A1A" stroke-width="2.4" stroke-linecap="butt"';
          out.push(h.chemin([sh(pt(-pl)), sh(pt(-th))], plaque));
          out.push(h.chemin([sh(pt(th)), sh(pt(pl))], plaque));
          for (const s of [-1, 1]) {
            const [x0, y0] = sh(pt(s * th));
            out.push(h.ligne(x0, y0, x0, y0 - 0.08 * k, h.a.arete));
          }
          out.push(pareEt(X(G.lp), Y(2.98), Y(G.haut), k));
          // Le vent, et l'air qui entre par la boîte jusqu'au poêle.
          out.push(h.fleche(`M ${f(X(-3.0))} ${f(Y(0.2))} L ${f(X(-2.1))} ${f(Y(0.2))}`));
          out.push(h.fleche(`M ${f(X(c0 - 0.05))} ${f(Y(cd / 2))} L ${f(X(-1.25))} ${f(Y(cd / 2))} Q ${f(X(-1.05))} ${f(Y(cd / 2))} ${f(X(-0.95))} ${f(Y(0.24))} L ${f(X(0.25))} ${f(Y(0.24))}`, h.a.cache));
          return out.join('\n');
        },
        renvois: z => {
          const { k, X, Y } = T(z), po = G.poele;
          const yc = toit(G.lp), u = [1 / Math.hypot(1, pente), -pente / Math.hypot(1, pente)];
          return [
            { n: 1, rond: [X(1.2), Y(-0.3)], cible: [X(po.l1 - 0.06) + 3, Y(-0.3)], texte: 'quatre pieux verts, plantés jusqu’au sol' },
            { n: 2, rond: [X(1.2), Y(0.36)], cible: [X(po.l1) - 5, Y(po.b + 0.05)], texte: 'lit de sable, épais d’une main' },
            { n: 3, rond: [X(1.15), Y(0.98)], cible: [X(G.lp + 0.065) + 0.1 * k + 4, Y(0.92)], texte: 'clé dans la première section' },
            { n: 4, rond: [X(0.12), Y(1.3)], cible: [X(G.lp - 0.24 * u[0]), Y(yc - 0.24 * u[1]) + 1], texte: 'collerette de tôle cousue dans la toile' },
            { n: 5, rond: [X(1.25), Y(3.1)], cible: [X(G.lp) + 0.1 * k + 1, Y(3.1)], texte: 'pare-étincelles, plus haut que le faîte' },
            { n: 6, rond: [X(-2.0), Y(0.7)], cible: [X(-1.72), Y(0.07)], texte: 'entrée d’air basse, au vent, sous la jupe' },
          ];
        },
      },
      long: {
        titre: 'En long, par le faîte : la porte à gauche, le fond à droite',
        dessin: z => {
          const { k, S, Y } = Lo(z), out = [], rp = G.rp * k;
          // Sol et neige.
          out.push(h.rect(2, Y(-G.D), z.l - 4, G.Sol * k, h.a.hachure('terre', 'aucun')));
          out.push(h.ligne(2, Y(-G.D), z.l - 2, Y(-G.D), h.a.arete));
          out.push(h.rect(2, Y(0), z.l - 4, G.D * k, h.a.hachure('neige', 'aucun')));
          out.push(h.ligne(2, Y(0), S(Lg / 2), Y(0), h.a.arete));
          out.push(h.ligne(S(Lg), Y(0), z.l - 2, Y(0), h.a.arete));
          // Le lit de neige, au fond, à hauteur des genoux ; la perche couchée à son bord.
          const hl = 0.5;
          out.push(h.path(`M ${f(S(Lg / 2))} ${f(Y(0))} L ${f(S(Lg / 2))} ${f(Y(hl))} L ${f(S(Lg))} ${f(Y(hl))} L ${f(S(Lg))} ${f(Y(0))} Z`, h.a.hachure('neige', 'aucun')));
          out.push(h.chemin([[S(Lg / 2), Y(0)], [S(Lg / 2), Y(hl)], [S(Lg), Y(hl)]], h.a.arete));
          // Renchaussement au fond : la jupe couchée à plat, la neige pelletée et tapée.
          out.push(h.path(`M ${f(S(Lg))} ${f(Y(0))} L ${f(S(Lg))} ${f(Y(0.55))} L ${f(S(Lg + 0.18))} ${f(Y(0.55))} Q ${f(S(Lg + 0.45))} ${f(Y(0.5))} ${f(S(Lg + 0.7))} ${f(Y(0))} Z`, h.a.hachure('neige')));
          out.push(h.ligne(S(Lg), Y(0) - 1, S(Lg + 0.42), Y(0) - 1, h.a.contour));
          out.push(h.cote(S(Lg + 0.95), Y(0), S(Lg + 0.95), Y(0.5), '0,5 m', { cote: 'droite' }));
          // Au-delà de la coupe : la traverse du côté sous le vent sur ses piquets fourchus.
          const yt = Y(G.He - G.rp);
          out.push(h.rect(S(0.03), yt - rp, (Lg - 0.06) * k, 2 * rp, blanc(h.a.detail)));
          for (const [s, y0] of [[0.22, 0], [Lg - 0.22, hl]]) {
            out.push(fourche(S(s), Y(y0), yt, rp));
          }
          // Au-delà : le poêle sur ses pieux (cachés dans la neige), le tuyau.
          const po = G.poele, rt = G.tuyau / 2 * k;
          for (const s of [P.s0 + 0.06, P.s1 - 0.06]) {
            out.push(h.rect(S(s) - 0.04 * k, Y(po.b), 0.08 * k, po.b * k, blanc(h.a.arete)));
            out.push(h.rect(S(s) - 0.04 * k, Y(0), 0.08 * k, (G.D + 0.04) * k, h.a.cache));
          }
          out.push(h.rect(S(P.s0), Y(po.t), (P.s1 - P.s0) * k, (po.t - po.b) * k, blanc(h.a.arete)));
          const yc = toit(G.lp);
          out.push(tuyau(S(P.sp), Y(po.t), Y(yc), k, [Y(1.25)]));
          out.push(cle(S(P.sp), Y(0.92), k));
          out.push(h.ellipse(S(P.sp), Y(yc), 0.17 * k, 0.1 * k, blanc(h.a.detail)));
          out.push(h.rect(S(P.sp) - rt, Y(yc) - 0.08 * k, 2 * rt, 0.08 * k, blanc(h.a.fin)));
          out.push(h.rect(S(P.sp) - rt, Y(G.Hr), 2 * rt, Y(yc) - Y(G.Hr) - 0.08 * k, h.a.cache));
          out.push(tuyau(S(P.sp), Y(G.Hr), Y(3.12), k, [Y(2.6)]));
          out.push(pareEt(S(P.sp), Y(2.98), Y(G.haut), k));
          // Le sapinage : du fond vers la porte, pointes vers la porte ; rien autour du poêle.
          out.push(sapinage(S(Lg / 2 + 0.16), S(Lg - 0.03), Y(hl), 0.085 * k, -1));
          out.push(sapinage(S(rondNu[1]), S(Lg / 2 - 0.03), Y(0), 0.085 * k, -1));
          out.push(sapinage(S(0.03), S(rondNu[0]), Y(0), 0.085 * k, -1));
          out.push(h.cercle(S(Lg / 2 + 0.07), Y(hl - 0.01), rp, h.a.hachure('bois')));
          // La coupe de la toile : les deux pignons, le faîte ; le faîte déborde sur les chevalets.
          for (const s of [-0.2, Lg + 0.2]) out.push(h.rect(S(s) - 0.04 * k, Y(G.Hr + 0.16), 0.08 * k, (G.Hr + 0.16) * k, blanc(h.a.arete)));
          out.push(h.rect(S(-0.3), Y(G.Hr - 0.01), (Lg + 0.6) * k, 2 * rp, h.a.hachure('bois')));
          out.push(h.chemin([[S(0), Y(0)], [S(0), Y(G.Hr)], [S(Lg), Y(G.Hr)], [S(Lg), Y(0)]], h.a.contour));
          return out.join('\n');
        },
        renvois: z => {
          const { k, S, Y } = Lo(z);
          return [
            { n: 7, rond: [S(2.55), Y(-0.33)], cible: [S(1.95), Y(-0.12)], texte: 'plancher foulé en bottes, égalisé en raquettes' },
            { n: 8, rond: [S(3.45), Y(-0.33)], cible: [S(3.3), Y(0.28)], texte: 'lit de neige à hauteur des genoux' },
            { n: 9, rond: [S(2.0), Y(1.0)], cible: [S(Lg / 2 + 0.07), Y(0.55)], texte: 'perche couchée au bord du lit' },
            { n: 10, rond: [S(3.4), Y(1.05)], cible: [S(3.4), Y(0.6)], texte: 'sapinage en écailles, du fond vers la porte' },
            { n: 11, rond: [S(1.45), Y(0.5)], cible: [S(1.45), Y(0.03)], texte: 'rond de neige nue autour du poêle' },
            { n: 12, rond: [S(Lg + 0.95), Y(1.05)], cible: [S(Lg + 0.3), Y(0.35)], texte: 'neige pelletée et tapée sur la jupe' },
          ];
        },
      },
    },
    danger: 'Danger — l’entrée d’air basse réduit le refoulement du tuyau quand le feu baisse, elle ne l’empêche pas. On ne s’endort jamais pendant que le feu meurt.',
  };
};
