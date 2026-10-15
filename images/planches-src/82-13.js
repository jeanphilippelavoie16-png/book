// Planche 82-13. L'alarme de chaleur au fil de coton (ch. 82, §9, « Détecter quand il n'y a plus
// d'avertisseur »).
// Le chapitre dit : une corde de coton ou une babiche fine, tendue à quelques centimètres du tuyau au
// point qui chauffe en premier (la traverse de mur ou la buse), qui retient un poids au-dessus d'un
// chaudron de métal ; le fil charbonne, casse, le poids tombe. Deux fils, deux chaudrons.
// Il ne dit pas comment le fil tient le poids : la planche le tranche par la géométrie, sans fait
// nouveau. À la traverse, le fil court le long du mur entre deux clous, à quelques centimètres
// au-dessus du tuyau (la chaleur monte), passe sur le second clou et descend au poids, loin du poêle.
// À la buse, rien ne tient un clou à cette hauteur : le fil pend d'un clou de la solive, d'aplomb, à
// quelques centimètres du tuyau, et le chaudron se pose sur le poêle, à côté de la buse.
// Aucune cote : le chapitre ne donne que « quelques centimètres », dit dans les renvois.
// Les deux vues sont des élévations de face, à la même échelle, plancher et plafond alignés. À la
// traverse, le tuyau est coupé au ras du mur (sa section hachurée) : le poêle et le coude, devant,
// sont enlevés par la coupe.
// La charte : le mur du fond en gris loin ; le fil, le poids et le chaudron au contour fort ; la face
// droite du chaudron et de la roche à l'ombre. Le rouge : le point à contrôler, l'écart entre le fil
// et le tuyau, une marque par vue.

module.exports = (h) => {
  const f = v => Math.round(v * 10) / 10;
  const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');

  // Le repère commun : centimètres du modèle, z vers le haut, plancher à 0, dessous de la solive à 235.
  const S = 2.04, Z0 = -8, Z1 = 252;
  const rep = (z, x0, x1) => {
    const ox = (z.l - (x1 - x0) * S) / 2, oy = (z.h - (Z1 - Z0) * S) / 2;
    const P = (x, y) => [f(ox + (x - x0) * S), f(oy + (Z1 - y) * S)];
    return P;
  };
  const PLAFOND = 235, SOL = 0;

  // Plancher et plafond en coupe, une bande hachurée de bois.
  const plancher = (P, x0, x1) => h.chemin([P(x0, SOL), P(x1, SOL), P(x1, -8), P(x0, -8)], h.a.hachure('bois', 'arete'), true);
  const plafond = (P, x0, x1) => h.chemin([P(x0, PLAFOND + 15), P(x1, PLAFOND + 15), P(x1, PLAFOND), P(x0, PLAFOND)], h.a.hachure('bois', 'arete'), true);
  // Le mur du fond, en gris loin, avec ses joints de planches.
  const mur = (P, x0, x1) => {
    const o = [h.chemin([P(x0, SOL), P(x1, SOL), P(x1, PLAFOND), P(x0, PLAFOND)], h.a.loin, true)];
    for (let y = 22; y < PLAFOND; y += 22) o.push(h.ligne(...P(x0, y), ...P(x1, y), h.a.fin));
    return o.join('\n');
  };
  // Le fil : un trait franc, avec un liseré blanc qui le détache du mur.
  const fil = d => [h.path(d, 'fill="none" stroke="#FFFFFF" stroke-width="4.2" stroke-linejoin="round" stroke-linecap="round"'), h.path(d, h.a.arete)].join('\n');
  // Un clou planté dans le mur, vu par la tête.
  const clou = (P, x, y) => [h.cercle(...P(x, y), 1.5 * S, blanc(h.a.arete)), h.cercle(...P(x, y), 0.45 * S, h.a.plein)].join('\n');

  // Une courbe fermée lisse qui passe par chaque point (Catmull-Rom).
  const ferme = pts => {
    const n = pts.length, Q = i => pts[(i + n) % n];
    let d = `M${pts[0].join(' ')}`;
    for (let i = 0; i < n; i++) {
      const p0 = Q(i - 1), p1 = Q(i), p2 = Q(i + 1), p3 = Q(i + 2);
      d += ` C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${p2[0]} ${p2[1]}`;
    }
    return d + ' Z';
  };
  // Une roche ficelée, centre (x, y), largeur l, hauteur ht.
  const roche = (P, x, y, l, ht) => {
    const pts = [[-0.5, 0.02], [-0.38, 0.38], [-0.06, 0.5], [0.3, 0.42], [0.5, 0.1], [0.42, -0.3], [0.12, -0.5], [-0.26, -0.44]]
      .map(([a, b]) => P(x + a * l, y + b * ht));
    const om = [[0.3, 0.42], [0.5, 0.1], [0.42, -0.3], [0.12, -0.5], [0.16, -0.12], [0.2, 0.2]].map(([a, b]) => P(x + a * l, y + b * ht));
    const contour = ferme(pts);
    return [
      h.path(contour, h.a.blanc),
      h.path(ferme(om), h.a.ombre),
      h.path(contour, h.a.contour),
      // la ganse : un tour en croix autour de la roche
      h.path(`M${P(x - 0.48 * l, y + 0.06 * ht).join(' ')} Q${P(x, y - 0.06 * ht).join(' ')} ${P(x + 0.5 * l, y + 0.08 * ht).join(' ')}`, h.a.arete),
      h.path(`M${P(x - 0.06 * l, y + 0.5 * ht).join(' ')} Q${P(x + 0.04 * l, y).join(' ')} ${P(x + 0.1 * l, y - 0.5 * ht).join(' ')}`, h.a.arete),
    ].join('\n');
  };

  // Un chaudron de métal vu de face : corps, bord en ellipse, anse. (x, y) : centre du fond.
  const chaudron = (P, x, y, r, ht) => {
    const e = 2.6;                                   // demi-hauteur de l'ellipse du bord, en cm
    const [xg, yb] = P(x - r, y), [xd] = P(x + r, y), [, yh] = P(x, y + ht);
    const ry = e * S, rx = r * S;
    const corps = `M${xg} ${yh} L${xg} ${f(yb - 3 * S)} Q${xg} ${yb} ${f(xg + 3 * S)} ${yb} L${f(xd - 3 * S)} ${yb} Q${xd} ${yb} ${xd} ${f(yb - 3 * S)} L${xd} ${yh} A${f(rx)} ${f(ry)} 0 0 1 ${xg} ${yh} Z`;
    const ombre = `M${f(xd - rx * 0.32)} ${f(yh + ry * 0.94)} L${f(xd - rx * 0.32)} ${yb} L${f(xd - 3 * S)} ${yb} Q${xd} ${yb} ${xd} ${f(yb - 3 * S)} L${xd} ${yh} A${f(rx)} ${f(ry)} 0 0 1 ${f(xd - rx * 0.32)} ${f(yh + ry * 0.94)} Z`;
    const [cx] = P(x, y);
    return [
      h.path(corps, h.a.blanc),
      h.path(ombre, h.a.ombre),
      h.ellipse(cx, yh, rx, ry, h.a.loin),
      h.path(corps, h.a.contour),
      h.ellipse(cx, yh, rx, ry, h.a.arete),
      // l'anse, rabattue derrière
      h.path(`M${f(xg + 0.5)} ${f(yh + 1)} C${f(xg - 4)} ${f(yh - r * S * 0.9)} ${f(xd + 4)} ${f(yh - r * S * 0.9)} ${f(xd - 0.5)} ${f(yh + 1)}`, h.a.detail),
    ].join('\n');
  };

  // Une clé à molette pendue par le trou du manche. (x, y) : le trou.
  const cle = (P, x, y) => {
    const w = 3.2, L = 19;
    const [a] = P(x - w / 2, y), [b] = P(x + w / 2, y), [, t] = P(x, y + 2.4), [, m] = P(x, y - L + 3);
    const [cx, cy] = P(x, y - L), R = 4.6 * S;
    const corps = `M${a} ${t} L${a} ${m} L${f(cx - R * 0.9)} ${f(cy - R * 0.2)} A${f(R)} ${f(R)} 0 0 0 ${f(cx - R * 0.5)} ${f(cy + R * 0.86)} L${f(cx - R * 0.22)} ${f(cy + R * 0.3)} L${f(cx + R * 0.22)} ${f(cy + R * 0.3)} L${f(cx + R * 0.5)} ${f(cy + R * 0.86)} A${f(R)} ${f(R)} 0 0 0 ${f(cx + R * 0.9)} ${f(cy - R * 0.2)} L${b} ${m} L${b} ${t} A${f(w * S / 2)} ${f(w * S / 2)} 0 0 0 ${a} ${t} Z`;
    const [hx, hy] = P(x, y);
    return [
      h.path(corps, blanc(h.a.contour)),
      h.ligne(f(cx - R * 0.6), f(cy - R * 0.05), f(cx + R * 0.6), f(cy - R * 0.05), h.a.detail),
      h.cercle(hx, hy, 0.8 * S, h.a.blanc), h.cercle(hx, hy, 0.8 * S, h.a.detail),
    ].join('\n');
  };

  // ─── Vue 1 : à la traverse de mur ───
  const TX = 105, TZ = 185, R = 7.5;          // centre du tuyau à la traverse, rayon
  const ZF = TZ + R + 11;                     // hauteur du fil : quelques centimètres au-dessus du tuyau
  const XA = 55, XB = 172;                     // clou d'ancrage, clou de renvoi
  const ZR = 52;                               // centre de la roche
  const vueTraverse = z => {
    const x0 = 30, x1 = 195, P = rep(z, x0, x1), o = [];
    o.push(mur(P, x0, x1), plancher(P, x0, x1), plafond(P, x0, x1));
    // la plaque de la traverse, ses quatre vis, le collet
    o.push(h.chemin([P(TX - 15, TZ - 15), P(TX + 15, TZ - 15), P(TX + 15, TZ + 15), P(TX - 15, TZ + 15)], blanc(h.a.arete), true));
    for (const [a, b] of [[-11.8, -11.8], [11.8, -11.8], [11.8, 11.8], [-11.8, 11.8]]) o.push(h.cercle(...P(TX + a, TZ + b), 1.1, h.a.detail));
    o.push(h.cercle(...P(TX, TZ), (R + 2) * S, h.a.arete));
    // le tuyau coupé au ras du mur : la paroi en noir, l'intérieur au fond
    o.push(h.cercle(...P(TX, TZ), R * S, h.a.plein));
    o.push(h.cercle(...P(TX, TZ), (R - 0.9) * S, h.a.loin));
    o.push(h.cercle(...P(TX, TZ), R * S, h.a.contour));
    // le fil : noué au clou d'ancrage, couché sur le clou de renvoi, descendu au poids
    const e = 1.5;                                                   // rayon du clou
    const [rbx, rby] = P(XB, ZF + e), [rcx, rcy] = P(XB + e, ZF);
    o.push(fil(`M${P(XA + 1.2, ZF + e).join(' ')} L${rbx} ${rby} A${f(e * S)} ${f(e * S)} 0 0 1 ${rcx} ${rcy} L${P(XB + e, ZR + 5.2).join(' ')}`));
    o.push(fil(`M${P(XA - 1.4, ZF + e - 0.3).join(' ')} Q${P(XA - 4, ZF - 1).join(' ')} ${P(XA - 4.5, ZF - 7).join(' ')}`));
    o.push(clou(P, XA, ZF), clou(P, XB, ZF));
    o.push(h.cercle(...P(XA, ZF), 2.6 * S, h.a.arete));
    // le poids et le chaudron dessous
    o.push(chaudron(P, XB + e, 0, 15, 24));
    o.push(roche(P, XB + e, ZR, 15, 12));
    // l'écart à contrôler entre le fil et le tuyau
    o.push(h.controle(...P(TX, (ZF + 1.5 + TZ + R) / 2), 14));
    return o.join('\n');
  };
  const renvoisTraverse = z => {
    const x0 = 30, x1 = 195, P = rep(z, x0, x1), e = 1.5;
    const [ax, ay] = P(XA, ZF), [bx, by] = P(XB, ZF), [fx, fy] = P(TX - 34, ZF + e + 0.6);
    const [rx, ry] = P(XB + e + 6.8, ZR), [cx, cy] = P(XB + e + 15, 12);
    return [
      { n: 1, rond: [ax - 6, ay - 50], cible: [ax - 1, ay - 3.5] , texte: 'clou d’ancrage' },
      { n: 2, rond: [fx - 8, fy - 50], cible: [fx, fy - 2], texte: 'fil de coton, à quelques centimètres' },
      { n: 3, rond: [bx + 8, by - 50], cible: [bx + 1, by - 3.5], texte: 'clou de renvoi' },
      { n: 4, rond: [Math.min(z.l - 12, rx + 30), ry - 26], cible: [rx, ry - 4], texte: 'poids : roche, clé, fer à cheval' },
      { n: 5, rond: [Math.min(z.l - 12, cx + 22), cy - 46], cible: [cx - 0.5, cy - 6], texte: 'chaudron de métal' },
    ];
  };

  // ─── Vue 2 : à la buse ───
  const BX = 92, BUSE = 75;                   // axe du tuyau, dessus du poêle
  const XF = BX - R - 6;                       // le fil d'aplomb, à quelques centimètres du tuyau
  const KX = 70, KR = 9;                       // le chaudron posé sur le poêle
  const ZC = 120;                              // le trou de la clé
  const vueBuse = z => {
    const x0 = 48, x1 = 136, P = rep(z, x0, x1), o = [];
    o.push(mur(P, x0, x1), plancher(P, x0, x1), plafond(P, x0, x1));
    // le poêle de face : pattes, caisse, porte, poignée
    for (const lx of [62, 116]) o.push(h.chemin([P(lx, 0), P(lx + 4, 0), P(lx + 4, 15), P(lx, 15)], blanc(h.a.arete), true));
    o.push(h.chemin([P(58, 15), P(124, 15), P(124, BUSE), P(58, BUSE)], blanc(h.a.contour), true));
    o.push(h.ligne(...P(58, BUSE - 3.5), ...P(124, BUSE - 3.5), h.a.detail));
    o.push(h.chemin([P(70, 26), P(112, 26), P(112, 60), P(70, 60)], h.a.arete, true));
    o.push(h.chemin([P(104, 41), P(109, 41), P(109, 45), P(104, 45)], h.a.detail, true));
    // la buse et le tuyau qui monte jusqu'au coude, tourné vers le mur
    o.push(h.chemin([P(BX - R - 1, BUSE), P(BX + R + 1, BUSE), P(BX + R + 1, BUSE + 7), P(BX - R - 1, BUSE + 7)], blanc(h.a.arete), true));
    const ZK = 178;
    const [xg, yk] = P(BX - R, ZK), [xd] = P(BX + R, ZK), [, yb] = P(BX, BUSE + 7);
    o.push(h.path(`M${xg} ${yb} L${xg} ${yk} A${f(R * S)} ${f(R * S)} 0 0 1 ${xd} ${yk} L${xd} ${yb} Z`, blanc(h.a.contour)));
    for (const dz of [-14, -7]) {
      const [, yy] = P(BX, ZK + dz);
      o.push(h.path(`M${xg} ${yy} Q${f((xg + xd) / 2)} ${f(yy + 4)} ${xd} ${yy}`, h.a.detail));
    }
    // le chaudron sur le poêle, la clé pendue au fil, le fil au clou de la solive
    o.push(chaudron(P, KX, BUSE, KR, 15));
    o.push(fil(`M${P(XF, PLAFOND - 3.5).join(' ')} L${P(XF, ZC + 0.8).join(' ')}`));
    o.push(h.chemin([P(XF - 0.4, PLAFOND), P(XF + 0.4, PLAFOND), P(XF + 0.4, PLAFOND - 4), P(XF - 0.4, PLAFOND - 4)], h.a.plein, true));
    o.push(cle(P, XF, ZC));
    o.push(h.controle(...P((XF + BX - R) / 2, 140), 9));
    return o.join('\n');
  };
  const renvoisBuse = z => {
    const x0 = 48, x1 = 136, P = rep(z, x0, x1);
    const [nx, ny] = P(XF, PLAFOND - 3), [fx, fy] = P(XF, 175), [kx, ky] = P(KX - KR, BUSE + 8);
    return [
      { n: 6, rond: [nx - 40, ny + 30], cible: [nx - 1, ny], texte: 'clou dans la solive' },
      { n: 7, rond: [fx - 40, fy + 10], cible: [fx - 2, fy], texte: 'fil à quelques centimètres de la buse' },
      { n: 8, rond: [kx - 26, ky - 44], cible: [kx + 2, ky - 4], texte: 'chaudron posé sur le poêle' },
    ];
  };

  return {
    ref: '82-13',
    titre: 'L’alarme de chaleur au fil de coton',
    desc: 'Deux montages vus de face, à la même échelle. À la traverse de mur : un fil de coton noué à un clou, tendu le long du mur à quelques centimètres au-dessus du tuyau, couché sur un second clou et descendu à une roche pendue au-dessus d’un chaudron de métal posé au sol. À la buse : un fil pendu d’aplomb à un clou de la solive, à quelques centimètres du tuyau, qui tient une clé à molette au-dessus d’un chaudron posé sur le poêle. Quand le tuyau chauffe trop, le fil charbonne et casse, le poids tombe dans le chaudron.',
    format: 'pleine',
    disposition: [['traverse', 'buse']],
    largeurs: [[1.4, 1]],
    vues: {
      traverse: { titre: 'À la traverse de mur, le tuyau coupé', dessin: vueTraverse, renvois: renvoisTraverse },
      buse: { titre: 'À la buse', dessin: vueBuse, renvois: renvoisBuse },
    },
    danger: 'Le fil ne sent ni la fumée ni le monoxyde, et il lâche tard : quand le poids tombe, le tuyau est déjà très chaud.',
  };
};
