// Planche 74-40 — sauver le congélateur l'hiver (ch. 74 : étapes 5, 10 à 12, 33 ; variante
// d'hiver de la section 9). Le chapitre ne donne aucune dimension du coffre, du bac, de la
// table ni de la chaudière : aucune cote de longueur. Le seul chiffre dessiné est le trait de
// 4 °C sur le cadran de la sonde, qui est ce qui sépare la pile B de la pile C.
module.exports = (h) => {
  const A = h.a;
  const r1 = n => Math.round(n * 10) / 10;
  const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const bA = blanc(A.arete), bC = blanc(A.contour), bD = blanc(A.detail);
  const sans = nom => A.hachure(nom, 'aucun');

  // rectangle aux coins arrondis
  const rr = (x, y, l, ht, r, at) => h.path(
    `M${r1(x + r)} ${r1(y)} H${r1(x + l - r)} Q${r1(x + l)} ${r1(y)} ${r1(x + l)} ${r1(y + r)} ` +
    `V${r1(y + ht - r)} Q${r1(x + l)} ${r1(y + ht)} ${r1(x + l - r)} ${r1(y + ht)} H${r1(x + r)} ` +
    `Q${r1(x)} ${r1(y + ht)} ${r1(x)} ${r1(y + ht - r)} V${r1(y + r)} Q${r1(x)} ${r1(y)} ${r1(x + r)} ${r1(y)} Z`, at);

  // ─── Vue 1 : le coffre débranché, sur la galerie côté nord, en coupe ──────────────────────
  const coffre = z => {
    const deckY = z.h - 26;                       // dessus du plancher de galerie
    const murX = 26;                              // face nord du mur
    const x0 = murX + 28, W = Math.min(300, z.l - x0 - 70);   // jeu derrière : le couvercle s'ouvre sans buter au mur
    const t = 13;                                 // épaisseur de paroi isolée
    const pied = 6, Hc = Math.min(132, z.h - 110);
    const yb1 = deckY - pied, yb0 = yb1 - Hc;     // bas et haut de la caisse
    const yl1 = yb0 - 2, yl0 = yl1 - 20;          // le couvercle
    const ix0 = x0 + t, ix1 = x0 + W - t, iy1 = yb1 - t;
    const out = [];

    // mur de la maison, coupé en haut
    out.push(h.chemin([[0, 12], [7, 7], [13, 15], [19, 6], [murX, 10], [murX, deckY + 9], [0, deckY + 9]], A.hachure('isolant', 'arete'), true));
    // plancher de galerie : planches en coupe sur une solive
    for (let x = murX + 2; x + 26 <= z.l - 4; x += 29) out.push(h.rect(x, deckY, 26, 8, A.hachure('bois', 'detail')));
    out.push(h.rect(murX, deckY + 8, z.l - 4 - murX, 13, bA));

    // pieds
    out.push(h.rect(x0 + 8, yb1, 12, pied, A.plein), h.rect(x0 + W - 20, yb1, 12, pied, A.plein));
    // caisse : parois isolées
    out.push(h.rect(x0, yb0, W, Hc, A.hachure('isolant', 'contour')));
    // la cavité, bourrée de neige tassée
    out.push(h.rect(ix0, yb0, ix1 - ix0, iy1 - yb0, A.blanc));
    out.push(h.rect(ix0, yb0, ix1 - ix0, iy1 - yb0, sans('neige')));
    // les paquets, encore durs, empilés ; la neige remplit les jours entre eux
    const rangs = [
      { y: iy1 - 4 - 28, ht: 28, l: [52, 70, 46, 60, 40] },
      { y: iy1 - 4 - 28 - 6 - 26, ht: 26, l: [64, 44, 58, 50, 50] },
      { y: iy1 - 4 - 28 - 6 - 26 - 6 - 24, ht: 24, l: [48, 62, 40, 70, 44] },
    ];
    rangs.forEach((rg, k) => {
      const somme = rg.l.reduce((s, v) => s + v, 0);
      const jeu = (ix1 - ix0 - 8 - somme) / (rg.l.length - 1);
      let x = ix0 + 4 + (k === 1 ? 2 : 0);
      rg.l.forEach((l, i) => {
        const dy = [0, 2, -1, 3, 1][(i + k) % 5];
        const ht = rg.ht - Math.abs(dy);
        out.push(rr(x, rg.y + Math.max(0, dy), l - (k === 1 && i === rg.l.length - 1 ? 2 : 0), ht, 4, bA));
        x += l + jeu;
      });
    });
    // doublure intérieure, en U ouvert sur le haut
    out.push(h.chemin([[ix0, yb0], [ix0, iy1], [ix1, iy1], [ix1, yb0]], A.detail));
    // joint, puis couvercle fermé
    out.push(h.rect(x0 + 2, yl1, t - 4, 2, A.plein), h.rect(x0 + W - t + 2, yl1, t - 4, 2, A.plein));
    out.push(h.rect(x0 - 2, yl0, W + 4, yl1 - yl0, A.hachure('isolant', 'contour')));
    // charnière côté mur, poignée côté galerie
    out.push(h.cercle(x0 - 2, yl1 - 3, 3.5, bA), h.cercle(x0 - 2, yl1 - 3, 1, A.plein));
    out.push(h.rect(x0 + W + 2, yl0 + 5, 5, 10, A.plein));

    return {
      svg: out.join('\n'),
      renvois: [
        { n: 1, rond: [z.l - 18, deckY - 36], cible: [x0 + W + 30, deckY + 4], texte: 'galerie côté nord, à l’ombre du bâtiment' },
        { n: 2, rond: [z.l - 18, yb0 + Hc * 0.55], cible: [x0 + W - 5, yb0 + Hc * 0.55], texte: 'coffre débranché, sorti de la maison chauffée' },
        { n: 3, rond: [x0 + W * 0.72, yl0 - 26], cible: [x0 + W * 0.72, yl0 + 6], texte: 'couvercle laissé fermé' },
        { n: 4, rond: [z.l - 18, yb0 - 4], cible: [ix1 - 18, yb0 + 7], texte: 'neige tassée dans tous les vides' },
      ],
    };
  };

  // ─── Vue 2 : le témoin, gobelet d'eau gelée et pièce de monnaie, en coupe ─────────────────
  const temoin = z => {
    const base = z.h * 0.66, Hg = Math.min(84, z.h * 0.4);
    const lh = 30, lb = 23;                       // demi-largeurs haut et bas
    const top = base - Hg, surf = base - Hg * 0.78;
    const cx = [z.l * 0.27, z.l * 0.73];
    const out = [];
    const gob = (c, fond) => {
      const xa = y => lb + (lh - lb) * (base - y) / Hg;   // demi-largeur à la hauteur y
      const e = 3;
      // la glace
      out.push(h.chemin([[c - xa(surf) + e, surf], [c + xa(surf) - e, surf], [c + lb - e, base - e], [c - lb + e, base - e]], sans('eau'), true));
      out.push(h.ligne(c - xa(surf) + e, surf, c + xa(surf) - e, surf, A.detail));
      // la pièce, vue sur la tranche
      const py = fond ? base - e - 3.5 : surf - 3.5;
      out.push(h.rect(c - 8, py, 16, 3.5, A.plein));
      // le gobelet
      out.push(h.chemin([[c - lh, top], [c - lb, base], [c + lb, base], [c + lh, top]], A.contour));
      out.push(h.ligne(c - lh - 8, base + 1.2, c + lh + 8, base + 1.2, A.detail));
    };
    gob(cx[0], false);
    gob(cx[1], true);
    return {
      svg: out.join('\n'),
      renvois: [
        { n: 5, rond: [cx[0], top - 30], cible: [cx[0] + 3, surf - 2], texte: 'pièce posée sur la glace : rien n’a bougé' },
        { n: 6, rond: [cx[1], base + 34], cible: [cx[1] + 3, base - 5], texte: 'pièce au fond : dégelé puis regelé' },
      ],
    };
  };

  // ─── Vue 3 : trois états d'un paquet sondé, et la pile où chacun s'en va ──────────────────
  const tri = z => {
    const cx = [z.l / 6, z.l / 2, 5 * z.l / 6];
    const dialY = 30, R = 13;
    const pY = 66, pH = 50, pL = 128;
    const sol = z.h - 16;
    const out = [];

    // sonde à cadran : trait de 4 °C en haut ; l'aiguille tourne dans le sens horaire
    const sonde = (c, basY, angle) => {
      out.push(h.rect(c - 1.6, dialY + R, 3.2, basY - dialY - R - 5, bD));
      out.push(h.chemin([[c - 1.6, basY - 5], [c, basY], [c + 1.6, basY - 5]], A.plein, true));
      out.push(h.cercle(c, dialY, R, bA), h.cercle(c, dialY, R - 3, A.fin));
      out.push(h.ligne(c, dialY - R + 3, c, dialY - R + 7, A.arete));
      out.push(h.texte(c, dialY - R - 5, '4 °C'));
      const a = angle * Math.PI / 180;           // 0 = midi, positif = sens horaire
      out.push(h.ligne(c, dialY, c + Math.sin(a) * (R - 5), dialY - Math.cos(a) * (R - 5), A.arete));
      out.push(h.cercle(c, dialY, 1.6, A.plein));
    };
    // le paquet en coupe : papier, puis la viande dessous
    const paquet = (c, dur) => {
      out.push(rr(c - pL / 2, pY, pL, pH, 8, bA));
      out.push(rr(c - pL / 2 + 4, pY + 4, pL - 8, pH - 8, 6, A.fin));
      if (dur) {
        out.push(rr(c - pL / 2 + 20, pY + 14, pL - 40, pH - 28, 8, A.hachure('grillage', 'detail')));
      }
    };
    paquet(cx[0], true); sonde(cx[0], pY + 14, -95);
    paquet(cx[1], false); sonde(cx[1], pY + pH / 2, -40);
    paquet(cx[2], false); sonde(cx[2], pY + pH / 2, 55);

    // chaque paquet descend à sa pile
    cx.forEach(c => out.push(h.fleche(`M${r1(c)} ${pY + pH + 8} L${r1(c)} ${pY + pH + 32}`)));

    // le sol de neige, dehors
    out.push(h.rect(0, sol, z.l, z.h - sol, sans('neige')), h.ligne(0, sol, z.l, sol, A.arete));

    // pile A : bac, paquets dedans, neige par-dessus
    {
      const c = cx[0], hb = 48, lh = 62, lb = 54, yt = sol - hb;
      out.push(h.path(`M${r1(c - lh)} ${r1(yt)} Q${r1(c - 30)} ${r1(yt - 26)} ${r1(c + 4)} ${r1(yt - 22)} Q${r1(c + 40)} ${r1(yt - 18)} ${r1(c + lh)} ${r1(yt)} L${r1(c + lb)} ${r1(sol)} L${r1(c - lb)} ${r1(sol)} Z`, blanc(A.fin)));
      out.push(h.path(`M${r1(c - lh)} ${r1(yt)} Q${r1(c - 30)} ${r1(yt - 26)} ${r1(c + 4)} ${r1(yt - 22)} Q${r1(c + 40)} ${r1(yt - 18)} ${r1(c + lh)} ${r1(yt)} L${r1(c + lb)} ${r1(sol)} L${r1(c - lb)} ${r1(sol)} Z`, sans('neige')));
      out.push(h.path(`M${r1(c - lh)} ${r1(yt)} Q${r1(c - 30)} ${r1(yt - 26)} ${r1(c + 4)} ${r1(yt - 22)} Q${r1(c + 40)} ${r1(yt - 18)} ${r1(c + lh)} ${r1(yt)}`, A.detail));
      [[-48, 30, 18], [-14, 36, 20], [26, 28, 18], [-36, 32, 14, 20], [2, 40, 14, 22]].forEach(([dx, l, ht, lev = 0]) =>
        out.push(rr(c + dx, sol - 4 - ht - lev, l, ht, 3, bA)));
      out.push(h.chemin([[c - lh - 3, yt], [c - lh, yt], [c - lb, sol], [c + lb, sol], [c + lh, yt], [c + lh + 3, yt]], A.contour));
    }
    // pile B : table dehors, paquets dessus
    const tb = { c: cx[1], haut: sol - 58 };
    {
      const c = tb.c, l = 146;
      out.push(h.rect(c - l / 2 + 10, tb.haut + 8, 7, sol - tb.haut - 8, bA), h.rect(c + l / 2 - 17, tb.haut + 8, 7, sol - tb.haut - 8, bA));
      out.push(h.rect(c - l / 2, tb.haut, l, 8, bA));
      [[-60, 34, 16], [-20, 42, 20], [28, 30, 14], [-44, 30, 12, 16]].forEach(([dx, lg, ht, lev = 0]) =>
        out.push(rr(c + dx, tb.haut - ht - lev, lg, ht, 3, bA)));
    }
    // pile C : chaudière fermée, anse, couvercle
    const ch = { c: cx[2], ht: 70, lh: 32, lb: 27 };
    {
      const c = ch.c, yt = sol - ch.ht;
      out.push(h.chemin([[c - ch.lh, yt], [c + ch.lh, yt], [c + ch.lb, sol], [c - ch.lb, sol]], bC, true));
      out.push(h.ligne(c - ch.lh + 1, yt + 9, c + ch.lh - 1, yt + 9, A.detail), h.ligne(c - ch.lh + 1.5, yt + 13, c + ch.lh - 1.5, yt + 13, A.detail));
      out.push(h.rect(c - ch.lh - 3, yt - 7, 2 * ch.lh + 6, 7, bA));
      out.push(h.path(`M${r1(c - ch.lh + 2)} ${r1(yt + 16)} C${r1(c - ch.lh - 6)} ${r1(yt - 18)} ${r1(c + ch.lh + 6)} ${r1(yt - 18)} ${r1(c + ch.lh - 2)} ${r1(yt + 16)}`, A.arete));
      out.push(h.cercle(c - ch.lh + 2, yt + 16, 2, A.plein), h.cercle(c + ch.lh - 2, yt + 16, 2, A.plein));
    }

    const ecart = z.l / 6;
    return {
      svg: out.join('\n'),
      renvois: [
        { n: 7, rond: [cx[0] + ecart * 0.78, dialY], cible: [cx[0] + 26, pY + pH / 2], texte: 'la sonde bute sur un cœur dur : pile A' },
        { n: 8, rond: [cx[1] + ecart * 0.78, dialY], cible: [cx[1] + 30, pY + pH / 2], texte: 'mou, 4 °C ou moins : pile B' },
        { n: 9, rond: [cx[2] + ecart * 0.78, dialY], cible: [cx[2] + 30, pY + pH / 2], texte: 'mou, plus de 4 °C : pile C' },
        { n: 10, rond: [cx[0] + ecart * 0.82, sol - 82], cible: [cx[0] + 30, sol - 58], texte: 'bac couvert de neige : recongeler' },
        { n: 11, rond: [cx[1] + ecart * 0.82, sol - 82], cible: [cx[1] + 58, tb.haut + 4], texte: 'table à l’ombre : transformer aujourd’hui' },
        { n: 12, rond: [cx[2] + ecart * 0.82, sol - 82], cible: [cx[2] + 22, sol - 36], texte: 'chaudière fermée, loin du bâtiment : jeter' },
      ],
    };
  };

  const vue = f => ({ dessin: z => f(z).svg, renvois: z => f(z).renvois });

  return {
    ref: '74-40',
    titre: 'Le congélateur en panne l’hiver : le coffre, le témoin, le tri',
    desc: 'En coupe, le coffre débranché posé sur la galerie côté nord, couvercle fermé, les vides entre les paquets bourrés de neige tassée. '
      + 'À côté, le témoin : deux gobelets d’eau gelée, la pièce de monnaie restée en surface dans l’un, tombée au fond dans l’autre. '
      + 'En bas, trois paquets coupés et sondés au cadran — cœur encore dur où la sonde bute, mou à 4 °C ou moins, mou au-dessus de 4 °C — '
      + 'et la pile où chacun descend : un bac couvert de neige, une table à l’ombre, une chaudière fermée.',
    format: 'pleine',
    disposition: [['coffre', 'temoin'], ['tri']],
    hauteurs: [1, 1.05],
    largeurs: [[5, 2], [1]],
    vues: {
      coffre: { titre: 'Le coffre sorti au froid, en coupe', ...vue(coffre) },
      temoin: { titre: 'Le témoin, dans le coffre', ...vue(temoin) },
      tri: { titre: 'Sonder dans le paquet, puis trier en trois piles', ...vue(tri) },
    },
    danger: 'Danger — une viande recongelée après avoir passé au-dessus de 4 °C garde tout ce qui a poussé pendant le dégel : le froid arrête les microbes, il ne les tue pas. Dans le doute, pile C.',
  };
};
