// Planche 89-09. La boîte à vapeur en tuyau de poêle (ch. 89, §9, « Cintrer sans chaudron, sans boîte,
// sans gabarit »).
// Le chapitre : une longueur de tuyau de poêle bouchée aux deux bouts de chiffons, en légère pente au-dessus
// d'une bouilloire dont le bec entre par le bas ; un trou au point bas laisse sortir l'eau qui se condense,
// sinon elle descend noyer le bec ; pas d'eau dans le tuyau, pas de pression. Variante pour un bout de
// pièce : le tuyau debout dans le chaudron d'eau qui bout, un chiffon en haut, le condensat retombe dans le
// chaudron. Sources déjà au dossier : sources/20b-boite-a-vapeur-tuyau-de-poele.md.
// Le bec dépasse un peu dans le tuyau, près du bout bas, et le trou de purge est au point le plus bas,
// entre le bec et le chiffon : l'eau qui descend sort avant d'atteindre le bec (c'est ce que dit « sans lui,
// elle descend noyer le bec »). Ce sur quoi le tuyau repose, le chapitre ne le dit pas : deux piquets
// fourchus, sans renvoi.
// Aucune cote : le chapitre n'en donne pas (15 à 20 minutes est un temps, il reste au texte).
// La charte : le tuyau et la pièce au contour fort ; l'intérieur du tuyau, vu par la coupe, en gris loin ;
// la vapeur et l'eau qui coule en flèches noires ; pas de rouge : aucun geste, aucun point de contrôle
// qui ne soit déjà le trou de purge, nommé.

module.exports = (h) => {
  const f = v => Math.round(v * 10) / 10;
  const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const S = 2.85;
  const M = (P, x, y) => P(x, y).join(' ');

  // Une goutte, pointe en haut, centre du rond en (x, y), rayon r (unités de vue).
  const goutte = (x, y, r) => h.path(`M${f(x)} ${f(y - 2.6 * r)} C${f(x + 0.4 * r)} ${f(y - 1.4 * r)} ${f(x + r)} ${f(y - 0.7 * r)} ${f(x + r)} ${f(y)} A${f(r)} ${f(r)} 0 0 1 ${f(x - r)} ${f(y)} C${f(x - r)} ${f(y - 0.7 * r)} ${f(x - 0.4 * r)} ${f(y - 1.4 * r)} ${f(x)} ${f(y - 2.6 * r)} Z`, blanc(h.a.detail));
  // Un chiffon bourré : une masse ronde et ses plis.
  const chiffon = (P, x0, x1, yb, yh, sens) => {
    const xm = (x0 + x1) / 2, ym = (yb + yh) / 2;
    const d = `M${M(P, x0, yb + 0.6)} Q${M(P, xm, yb - 0.6)} ${M(P, x1, yb + 1)} Q${M(P, x1 + 2.4 * sens, ym)} ${M(P, x1, yh - 1)} Q${M(P, xm, yh + 0.6)} ${M(P, x0, yh - 0.6)} Q${M(P, x0 - 2.6 * sens, ym)} ${M(P, x0, yb + 0.6)} Z`;
    return [h.path(d, blanc(h.a.arete)),
      h.path(`M${M(P, x0 + 1.5, ym + 3)} Q${M(P, xm, ym + 1)} ${M(P, x1 - 1, ym + 4)} M${M(P, x0 + 2, ym - 3)} Q${M(P, xm + 1, ym - 1)} ${M(P, x1 - 1.5, ym - 4.5)} M${M(P, xm - 1, yb + 2)} Q${M(P, xm + 1.5, ym)} ${M(P, xm, yh - 2.5)}`, h.a.fin)].join('\n');
  };
  // La flamme d'un petit feu, base en (x, y), hauteur ht (unités de vue).
  const flamme = (x, y, ht) => {
    const l = ht * 0.34;
    return h.path(`M${f(x - l)} ${f(y)} C${f(x - l * 1.2)} ${f(y - ht * 0.45)} ${f(x - l * 0.2)} ${f(y - ht * 0.6)} ${f(x)} ${f(y - ht)} C${f(x + l * 0.3)} ${f(y - ht * 0.6)} ${f(x + l * 1.2)} ${f(y - ht * 0.45)} ${f(x + l)} ${f(y)} Z`, blanc(h.a.arete));
  };

  // ─── Vue 1 : couchée sur la bouilloire, en coupe ───
  // cm ; x le long du sol, y vers le haut ; le tuyau monte de gauche à droite
  const S1 = 3.05, PENTE = 0.07, D = 15, XB = -8, XH = 92, YB0 = 29.1;
  const bas = x => YB0 + (x - XB) * PENTE;            // dessous du tuyau
  const XBEC = 12, XPURGE = 2;
  const rep1 = z => {
    const ox = (z.l - 114 * S1) / 2 + 13 * S1, oy = z.h - (z.h - 57 * S1) / 2 - 4 * S1;
    return (x, y) => [f(ox + x * S1), f(oy - y * S1)];
  };
  // une pierre ronde et lisse posée au sol, centre x, largeur l, hauteur ht
  const pierre = (P, x, l, ht) => {
    const q = [[-0.5, 0], [-0.47, 0.5], [-0.3, 0.9], [0, 1], [0.32, 0.88], [0.5, 0.45], [0.5, 0]].map(([a, b]) => P(x + a * l, b * ht));
    let d = `M${q[0].join(' ')}`;
    for (let i = 1; i < q.length; i++) {
      const p0 = q[Math.max(0, i - 2)], p1 = q[i - 1], p2 = q[i], p3 = q[Math.min(q.length - 1, i + 1)];
      d += ` C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${p2[0]} ${p2[1]}`;
    }
    return d + ' Z';
  };
  const vueCouche = z => {
    const P = rep1(z), o = [];
    // le sol
    o.push(h.chemin([P(-13, 0), P(101, 0), P(101, -3.5), P(-13, -3.5)], h.a.hachure('terre', 'aucun'), true));
    o.push(h.ligne(...P(-13, 0), ...P(101, 0), h.a.arete));
    // les deux piquets fourchus
    for (const x of [-4, 88]) {
      const yt = bas(x) - 0.3;
      o.push(h.chemin([P(x - 1, 0), P(x + 1, 0), P(x + 1, yt - 5), P(x - 1, yt - 5)], blanc(h.a.arete), true));
      o.push(h.path(`M${M(P, x - 1, yt - 5)} L${M(P, x - 4, yt + 1.5)} M${M(P, x + 1, yt - 5)} L${M(P, x + 4, yt + 1.5)}`, h.a.arete));
    }
    // le feu entre deux pierres, la bouilloire posée dessus
    for (const [x, l, ht] of [[19, 11, 7.6], [41, 11, 7.6]]) {
      const d = pierre(P, x, l, ht);
      o.push(h.path(d, h.a.blanc));
      o.push(h.path(pierre(P, x + l * 0.22, l * 0.5, ht * 0.86), h.a.ombre));
      o.push(h.path(d, h.a.arete));
    }
    o.push(flamme(...P(27.8, 0.4), 6.2 * S1), flamme(...P(32.4, 0.4), 7.2 * S1));
    const kb = 7.8, kh = 20.5, kx0 = 17, kx1 = 43;
    const corps = `M${M(P, kx0 + 2, kb)} L${M(P, kx1 - 2, kb)} Q${M(P, kx1, kb)} ${M(P, kx1 - 0.3, kb + 2.5)} L${M(P, kx1 - 3.5, kh)} L${M(P, kx0 + 3.5, kh)} L${M(P, kx0 + 0.3, kb + 2.5)} Q${M(P, kx0, kb)} ${M(P, kx0 + 2, kb)} Z`;
    const couvercle = `M${M(P, kx0 + 5, kh)} Q${M(P, (kx0 + kx1) / 2, kh + 6.5)} ${M(P, kx1 - 5, kh)} Z`;
    // le bec : du flanc bas de la bouilloire au dessous du tuyau, où il entre
    const yIn = bas(XBEC) + 1.6, a0 = [kx0 + 1.2, kb + 3.2], a1 = [kx0 + 2.6, kb + 8.5];
    const bec = `M${M(P, ...a0)} L${M(P, XBEC - 1.3, yIn - 5)} L${M(P, XBEC - 1.1, yIn)} L${M(P, XBEC + 1.1, yIn)} L${M(P, XBEC + 1.4, yIn - 4.2)} L${M(P, ...a1)} Z`;
    o.push(h.path(bec, blanc(h.a.contour)));
    o.push(h.path(corps, h.a.blanc));
    o.push(h.path(`M${M(P, kx1 - 7, kb)} L${M(P, kx1 - 2, kb)} Q${M(P, kx1, kb)} ${M(P, kx1 - 0.3, kb + 2.5)} L${M(P, kx1 - 3.5, kh)} L${M(P, kx1 - 8.5, kh)} Z`, h.a.ombre));
    o.push(h.path(corps, h.a.contour));
    o.push(h.path(couvercle, blanc(h.a.arete)));
    o.push(h.chemin([P(29, kh + 3.2), P(31, kh + 3.2), P(31, kh + 5.2), P(29, kh + 5.2)], blanc(h.a.arete), true));
    // le tuyau en coupe : l'intérieur au fond, les deux parois, la pièce dedans
    const haut = x => bas(x) + D;
    o.push(h.chemin([P(XB, bas(XB)), P(XH, bas(XH)), P(XH, haut(XH)), P(XB, haut(XB))], h.a.loin, true));
    o.push(h.chemin([P(23, bas(23) + 1.2), P(81, bas(81) + 1.2), P(81, bas(81) + 4.4), P(23, bas(23) + 4.4)], h.a.hachure('bois', 'contour'), true));
    // la paroi du dessous percée deux fois : le trou de purge, le trou du bec
    const paroi = (x0, x1, y) => h.path(`M${M(P, x0, y(x0))} L${M(P, x1, y(x1))}`, h.a.contour);
    o.push(paroi(XB, XPURGE - 1, bas), paroi(XPURGE + 1, XBEC - 1.2, bas), paroi(XBEC + 1.2, XH, bas), paroi(XB, XH, haut));
    // les chiffons
    o.push(chiffon(P, XB + 0.6, XB + 7, bas(XB) + 0.6, haut(XB) - 0.6, -1), chiffon(P, XH - 7, XH - 0.6, bas(XH) + 0.6, haut(XH) - 0.6, 1));
    // la vapeur qui monte le long du tuyau
    for (const [xa, xb, dy] of [[14, 42, 10.5], [24, 54, 7.5], [47, 74, 11.5]]) {
      const ya = bas(xa) + dy, yb = bas(xb) + dy;
      o.push(h.fleche(`M${M(P, xa, ya)} C${M(P, xa + 6, ya + 2.2)} ${M(P, (xa + xb) / 2 - 3, yb - 2.2)} ${M(P, (xa + xb) / 2, (ya + yb) / 2)} S${M(P, xb - 5, yb + 2)} ${M(P, xb, yb)}`, h.a.detail));
    }
    // l'eau qui descend le long du fond, sort au trou de purge et goutte dehors
    o.push(h.fleche(`M${M(P, 21, bas(21) + 0.8)} L${M(P, 15, bas(15) + 0.8)}`, h.a.detail));
    o.push(h.fleche(`M${M(P, 9.4, bas(9.4) + 0.8)} L${M(P, XPURGE + 2.2, bas(XPURGE + 2.2) + 0.8)}`, h.a.detail));
    const [gx, gy] = P(XPURGE, bas(XPURGE) - 3.4);
    o.push(goutte(gx, gy, 2.3), goutte(gx, gy + 13, 2.3));
    return o.join('\n');
  };
  const renvoisCouche = z => {
    const P = rep1(z);
    const [tx, ty] = P(58, bas(58) + D), [cx, cy] = P(XH - 4, bas(XH) + D - 3), [bx, by] = P(XBEC + 0.2, bas(XBEC) - 3);
    const [px, py] = P(XPURGE, bas(XPURGE)), [qx, qy] = P(66, bas(66) + 2.8);
    return [
      { n: 1, rond: [tx - 20, ty - 26], cible: [tx, ty - 1.4], texte: 'tuyau de poêle, en légère pente' },
      { n: 2, rond: [Math.min(z.l - 12, cx + 22), Math.max(12, cy - 32)], cible: [cx + 1, cy - 1], texte: 'chiffons aux deux bouts' },
      { n: 3, rond: [bx - 4, 14], cible: [bx - 0.2, by + 6.5], texte: 'bec qui entre par le dessous' },
      { n: 4, rond: [P(8.6, 9)[0], P(8.6, 9)[1]], cible: [px + 1.2, py + 2.6], texte: 'trou de purge au point bas' },
      { n: 5, rond: [qx + 8, qy + 44], cible: [qx, qy + 4], texte: 'la pièce à cintrer' },
    ];
  };

  // ─── Vue 2 : debout dans le chaudron ───
  const rep2 = z => {
    const ox = z.l / 2, oy = z.h - (z.h - 79 * S) / 2 - 5 * S;
    return (x, y) => [f(ox + x * S), f(oy - y * S)];
  };
  const vueDebout = z => {
    const P = rep2(z), o = [];
    // le dessus du poêle, en coupe
    o.push(h.chemin([P(-27, 0), P(27, 0), P(27, -5), P(-27, -5)], h.a.hachure('metal', 'arete'), true));
    // le chaudron en coupe : l'eau, les deux parois
    const r = 17, ht = 21, eau = 14;
    o.push(h.chemin([P(-r, 0), P(r, 0), P(r, eau), P(-r, eau)], h.a.hachure('eau', 'aucun'), true));
    o.push(h.path(`M${M(P, -r, ht)} L${M(P, -r, 1.5)} Q${M(P, -r, 0)} ${M(P, -r + 1.5, 0)} L${M(P, r - 1.5, 0)} Q${M(P, r, 0)} ${M(P, r, 1.5)} L${M(P, r, ht)}`, h.a.contour));
    o.push(h.ligne(...P(-r, eau), ...P(r, eau), h.a.detail));
    // le tuyau debout, posé au fond : l'intérieur au-dessus de l'eau en gris loin
    const R = 7.5, top = 58;
    o.push(h.chemin([P(-R, eau), P(R, eau), P(R, top), P(-R, top)], h.a.loin, true));
    o.push(h.path(`M${M(P, -R, 0)} L${M(P, -R, top)} M${M(P, R, 0)} L${M(P, R, top)}`, h.a.contour));
    // le chiffon bourré en haut, la pièce qui passe au travers et plonge son bout dans la vapeur
    o.push(chiffon(P, -R + 0.5, R - 0.5, top - 7, top + 1.5, 1));
    o.push(h.chemin([P(-2.2, 30), P(2.2, 30), P(2.2, 73), P(-2.2, 73)], h.a.hachure('bois', 'contour'), true));
    // la vapeur monte, l'eau condensée retombe
    o.push(h.fleche(`M${M(P, -4.8, eau + 3)} C${M(P, -3.2, eau + 8)} ${M(P, -6, eau + 12)} ${M(P, -4.8, eau + 18)}`, h.a.detail));
    o.push(h.fleche(`M${M(P, 4.8, eau + 9)} C${M(P, 6.2, eau + 14)} ${M(P, 3.4, eau + 18)} ${M(P, 4.8, eau + 24)}`, h.a.detail));
    const [gx, gy] = P(-5, eau + 30), [g2x, g2y] = P(4.6, eau + 31);
    o.push(goutte(gx, gy, 2.2), goutte(g2x, g2y, 2.2));
    o.push(h.fleche(`M${M(P, -5, eau + 26)} L${M(P, -5, eau + 22)}`, h.a.detail));
    return o.join('\n');
  };
  const renvoisDebout = z => {
    const P = rep2(z);
    const [tx, ty] = P(7.5, 36), [cx, cy] = P(-5, 56);
    return [
      { n: 6, rond: [tx + 46, ty + 22], cible: [tx + 1, ty], texte: 'tuyau debout dans l’eau qui bout' },
      { n: 7, rond: [cx - 44, cy - 30], cible: [cx - 1, cy - 1], texte: 'chiffon en haut, la pièce au travers' },
    ];
  };

  return {
    ref: '89-09',
    titre: 'La boîte à vapeur en tuyau de poêle',
    desc: 'En coupe, une longueur de tuyau de poêle couchée en légère pente sur deux piquets fourchus, bouchée de chiffons aux deux bouts, la pièce à cintrer dedans ; sous le bout bas, une bouilloire sur un petit feu dont le bec entre dans le tuyau par le dessous ; la vapeur monte le long du tuyau, l’eau condensée redescend et sort par un trou au point bas, avant le bec. À côté, la variante pour un bout de pièce : le tuyau debout dans un chaudron d’eau qui bout, un chiffon en haut que la pièce traverse, l’eau condensée qui retombe dans le chaudron.',
    format: 'demi',
    disposition: [['couche', 'debout']],
    largeurs: [[2, 1]],
    vues: {
      couche: { titre: 'Couchée sur la bouilloire, en coupe', dessin: vueCouche, renvois: renvoisCouche },
      debout: { titre: 'Debout dans le chaudron', dessin: vueDebout, renvois: renvoisDebout },
    },
  };
};
