// 65-12 — La cage à viande grillagée (ch. 65, § 9 ; aussi 63, 66, 67, 68)
// Aucune cote : le chapitre ne donne aucune mesure de la cage. Ce qu'il donne, et que la planche
// montre : vieille moustiquaire de fenêtre découpée ; la pièce pendue à l'air, au froid et au noir ;
// bâtons de bois franc écorcés ; aucune pièce ne touche sa voisine ni la paroi ; une planchette par
// pièce, pendue à la même broche ; caisse enfoncée dans un banc de neige du côté nord, couverte
// d'écorce et lestée de pierres. Le reste (lattes, tourniquet, lanières de cuir) est ce qui traîne.

module.exports = (h) => {
  const bl = t => t.replace('fill="none"', h.a.blanc.split(' ')[0]);
  const f = v => v.toFixed(1);
  const poly = (pts, a) => h.chemin(pts, a, true);
  const RH = 1.25, RD = 0.7;   // hauteur et profondeur de la cage, en largeurs : une proportion, pas une mesure

  // une pièce plate (poitrine, lard), trouée en haut
  const plaque = (cx, top, w, ht) => {
    const x1 = cx - w / 2, x2 = cx + w / 2;
    return [
      h.path(`M${f(x1 + 3)} ${f(top)} L${f(x2 - 3)} ${f(top)} Q${f(x2)} ${f(top)} ${f(x2)} ${f(top + 4)} `
        + `L${f(x2 - 1)} ${f(top + ht * 0.78)} Q${f(x2 - 3)} ${f(top + ht)} ${f(cx)} ${f(top + ht)} `
        + `Q${f(x1 + 2)} ${f(top + ht)} ${f(x1)} ${f(top + ht * 0.76)} L${f(x1)} ${f(top + 4)} Q${f(x1)} ${f(top)} ${f(x1 + 3)} ${f(top)} Z`, bl(h.a.arete)),
      h.path(`M${f(x1 + 1)} ${f(top + ht * 0.2)} Q${f(cx)} ${f(top + ht * 0.25)} ${f(x2 - 1)} ${f(top + ht * 0.18)}`, h.a.detail),
      h.cercle(cx, top + 5, 1.6, h.a.detail),
    ].join('\n');
  };
  // une saucisse sèche, pendue par son nœud
  const saucisse = (cx, top, w, ht) => [
    h.path(`M${f(cx - w / 2)} ${f(top + 3)} Q${f(cx - w / 2 - 3)} ${f(top + ht * 0.5)} ${f(cx - w / 2 + 1)} ${f(top + ht - 3)} `
      + `Q${f(cx + 1)} ${f(top + ht + 3)} ${f(cx + w / 2 + 1)} ${f(top + ht - 4)} `
      + `Q${f(cx + w / 2 + 3)} ${f(top + ht * 0.5)} ${f(cx + w / 2)} ${f(top + 3)} Q${f(cx)} ${f(top - 1)} ${f(cx - w / 2)} ${f(top + 3)} Z`, bl(h.a.arete)),
    h.ligne(cx - w / 2 + 1, top + 5, cx + w / 2 - 1, top + 5, h.a.detail),
  ].join('\n');
  // la ficelle : une boucle par-dessus le bâton, puis droit à la pièce
  const ficelle = (cx, yc, r, yp) => [
    h.path(`M${f(cx - 3)} ${f(yc + r)} C${f(cx - 6)} ${f(yc - r - 5)} ${f(cx + 6)} ${f(yc - r - 5)} ${f(cx + 3)} ${f(yc + r)}`, h.a.detail),
    h.chemin([[cx - 3, yc + r], [cx, yp], [cx + 3, yc + r]], h.a.detail),
  ].join('\n');

  // ─── vue d'ensemble, en perspective cavalière ───
  const GA = z => {
    const kx = 0.433, ky = 0.25;
    const W = Math.min((z.l - 80) / (1 + kx * RD), (z.h - 30) / (RH + 0.05 + ky * RD + ky * 0.97));
    const D = W * RD, Hf = W * RH, p = Math.max(8, W * 0.06), tb = Math.max(7, W * 0.045), o = 5, Wd = W - 6;
    const totW = W + kx * (D + o), totH = Hf + tb + ky * (D + o) + ky * Wd;
    const x0 = (z.l - totW) / 2;
    const y0 = (z.h - totH) / 2 + Hf + tb + ky * (D + o);
    const Pt = (x, y, d) => [x0 + x + kx * d, y0 - y - ky * d];
    const Pd = (s, y) => [x0 + W - kx * s, y0 - y + ky * s];   // la porte, ouverte d'équerre sur la charnière de droite
    const yt = Hf - p - W * 0.2, ds = [D * 0.36, D * 0.7], nd = 6, nw = 4, r = 3.2, hT = W * 0.05, tt = Math.max(6, W * 0.035);
    const q = Math.max(7, W * 0.05);
    return { kx, ky, W, D, Hf, p, tb, o, Wd, x0, y0, Pt, Pd, yt, ds, nd, nw, r, hT, q, tt };
  };

  // ─── coupe par le bâton ───
  const GB = z => {
    const Wb = Math.min(z.l - 76, (z.h - 20) / (RH + 0.06));
    const Hb = Wb * RH, p = Math.max(7, Wb * 0.06), tb = Math.max(6, Wb * 0.045), o = 5;
    const xL = (z.l - Wb) / 2, xR = xL + Wb;
    const yT = (z.h - Hb - tb) / 2 + tb, yB = yT + Hb;
    const r = 4, yc = yT + p + Hb * 0.07;
    const Wi = Wb - 2 * p, xi = xL + p;
    const P1 = { cx: xi + Wi * 0.2, w: Wb * 0.2, top: yc + r + 16, ht: Hb * 0.48 };
    const P2 = { cx: xi + Wi * 0.5, w: 9, top: yc + r + 10, ht: Hb * 0.6 };
    const P3 = { cx: xi + Wi * 0.79, w: Wb * 0.19, top: yc + r + 14, ht: Hb * 0.38 };
    const Tg = { x: P1.cx - 6, y: P1.top + P1.ht * 0.3, l: 12, h: 17 };   // d'aplomb sous le trou de la pièce 1, devant elle
    return { Wb, Hb, p, tb, o, xL, xR, yT, yB, r, yc, P1, P2, P3, Tg };
  };

  // ─── un coin, vu de dessus en coupe ───
  const GC = z => {
    const S = Math.min(z.l, z.h) * 0.34, Lt = S * 0.22;
    const px = z.l * 0.42, py = z.h * 0.27;
    const dx0 = px - 6 - Lt, dx1 = px + S * 1.3, dy0 = py + S, dy1 = dy0 + S * 0.42;
    return { S, Lt, px, py, dx0, dx1, dy0, dy1 };
  };

  // ─── la caisse dans un banc de neige ───
  const GD = z => {
    const yg = z.h - 18, xw = z.l - 34;
    const bw = (z.h - 30) * 0.34, bh = bw * RH, tb = 5, p = 6;
    const xc = xw * 0.44, bx = xc - bw / 2, by = yg - bh - 14;
    const A = [4, by + 0.45 * (yg - by)], B = [bx - 30, by], C = [bx + bw + 30, by], E = [xw, by - 0.33 * by];
    const pl1 = [bx - 22, bx + bw * 0.62], pl2 = [bx + bw * 0.38, bx + bw + 22], bump = 5;
    const ytop = (pl, x, lift = 0) => { const t = (x - pl[0]) / (pl[1] - pl[0]); return by - 3 - lift - 4 * bump * t * (1 - t); };
    const S1 = { x: bx + bw * 0.16, rx: 11, ry: 7 }, S2 = { x: bx + bw * 0.86, rx: 13, ry: 8 };
    S1.y = ytop(pl1, S1.x) - S1.ry + 2; S2.y = ytop(pl2, S2.x, 3) - S2.ry + 2;
    return { yg, xw, bw, bh, tb, p, bx, by, A, B, C, E, pl1, pl2, bump, ytop, S1, S2 };
  };

  return {
    ref: '70-12',
    titre: 'La cage à viande grillagée',
    desc: 'Cage de lattes clouées, tendue de vieille moustiquaire de fenêtre, pour tenir une pièce pendue à l\'air, '
      + 'au froid et au noir, loin des mouches. Vue d\'ensemble, porte ouverte : le cadre, la moustiquaire sur les côtés, '
      + 'le fond et la porte, le dessus et le fond de planches pleins, la porte ouverte d\'équerre sur deux lanières de cuir '
      + 'clouées à l\'extérieur, de la face de la porte au côté de la cage, un tourniquet de bois sur l\'autre montant, et à l\'intérieur un tasseau à encoches de chaque côté. En coupe par le bâton : un bâton de bois franc '
      + 'écorcé posé dans les encoches, trois pièces pendues à des ficelles sans toucher ni leur voisine ni la paroi, '
      + 'et une planchette d\'étiquette pendue d\'aplomb à la même ficelle qu\'une pièce, devant elle. Le coin de la charnière, vu de dessus : la moustiquaire '
      + 'rabattue en double et agrafée au montant, pincée sous une latte clouée ; la porte en applique qui ferme à plat '
      + 'sur le montant ; la lanière de cuir clouée sur la face de la porte, qui passe le coin et se cloue sur la latte du côté. Dans un banc de neige au pied du mur nord : '
      + 'la caisse enfoncée, le dessus à ras, couverte de plaques d\'écorce et lestée de pierres.',
    format: 'pleine',
    disposition: [['ens', 'coupe'], ['coin', 'neige']],
    hauteurs: [5, 4],
    largeurs: [[3, 2], [2, 3]],
    vues: {
      ens: {
        titre: 'Vue d\'ensemble, porte ouverte',
        dessin: z => {
          const g = GA(z), { W, D, Hf, p, tb, o, Wd, Pt, Pd, yt, ds, nd, nw, r, hT, q, tt } = g;
          const o_ = [];
          // le fond, vu par l'ouverture
          o_.push(poly([Pt(p, p, D), Pt(W - p, p, D), Pt(W - p, Hf - p, D), Pt(p, Hf - p, D)], h.a.hachure('grillage', 'arete')));
          // le fond de planches
          o_.push(poly([Pt(p, p, 0), Pt(W - p, p, 0), Pt(W - p, p, D), Pt(p, p, D)], bl(h.a.arete)));
          [D / 3, 2 * D / 3].forEach(d => o_.push(h.chemin([Pt(p, p, d), Pt(W - p, p, d)], h.a.detail)));
          // le côté gauche, vu de l'intérieur
          const cg = [Pt(p, p, 0), Pt(p, p, D), Pt(p, Hf - p, D), Pt(p, Hf - p, 0)];
          o_.push(poly(cg, bl(h.a.arete)), poly(cg, h.a.hachure('grillage', 'arete')));
          o_.push(poly([Pt(p, p, D - p), Pt(p, p, D), Pt(p, Hf - p, D), Pt(p, Hf - p, D - p)], bl(h.a.arete)));
          // le tasseau à encoches
          // une latte épaisse clouée sur la paroi : le dessus (entre la paroi et sa face) et sa face, creusés de deux encoches en U
          const xi = p + tt, bornes = [0, ...ds.flatMap(d => [d - nw, d + nw]), D - p];
          for (let i = 0; i < bornes.length; i += 2)
            o_.push(poly([Pt(p, yt, bornes[i]), Pt(p, yt, bornes[i + 1]), Pt(xi, yt, bornes[i + 1]), Pt(xi, yt, bornes[i])], bl(h.a.arete)));
          const haut = [Pt(xi, yt, 0)];
          ds.forEach(d => haut.push(Pt(xi, yt, d - nw), Pt(xi, yt - nd, d - nw), Pt(xi, yt - nd, d + nw), Pt(xi, yt, d + nw)));
          haut.push(Pt(xi, yt, D - p));
          o_.push(poly([...haut, Pt(xi, yt - hT, D - p), Pt(xi, yt - hT, 0)], bl(h.a.arete)));
          ds.forEach(d => o_.push(poly([Pt(p, yt - nd, d - nw), Pt(xi, yt - nd, d - nw), Pt(xi, yt - nd, d + nw), Pt(p, yt - nd, d + nw)], bl(h.a.detail))));
          // les bâtons, posés dans les encoches
          [...ds].reverse().forEach(d => {
            const yc = yt - nd + r, a = Pt(p, yc, d), b = Pt(W - p, yc, d);
            o_.push(poly([[a[0], a[1] - r], [b[0], b[1] - r], [b[0], b[1] + r], [a[0], a[1] + r]], bl(h.a.arete)));
            o_.push(h.ellipse(a[0], a[1], 1.8, r, bl(h.a.detail)));
          });
          // la face avant du cadre
          const R = (x, y, l, ht, a) => { const c = Pt(x, y + ht, 0); return h.rect(c[0], c[1], l, ht, a); };
          o_.push(R(0, 0, p, Hf, bl(h.a.arete)), R(W - p, 0, p, Hf, bl(h.a.arete)),
            R(p, Hf - p, W - 2 * p, p, bl(h.a.arete)), R(p, 0, W - 2 * p, p, bl(h.a.arete)));
          // le côté droit, vu du dehors
          const S = (d1, d2, y1, y2) => [Pt(W, y1, d1), Pt(W, y1, d2), Pt(W, y2, d2), Pt(W, y2, d1)];
          o_.push(poly(S(0, D, 0, Hf), bl(h.a.arete)));
          o_.push(poly(S(p, D - p, p, Hf - p), h.a.hachure('grillage', 'arete')));
          o_.push(poly(S(0, p, 0, Hf), h.a.arete), poly(S(D - p, D, 0, Hf), h.a.arete));
          // le dessus de planches
          o_.push(poly([Pt(-o, Hf + tb, -o), Pt(W + o, Hf + tb, -o), Pt(W + o, Hf + tb, D + o), Pt(-o, Hf + tb, D + o)], bl(h.a.arete)));
          const jd = [1, 2].map(i => -o + (D + 2 * o) * i / 3);
          jd.forEach(d => o_.push(h.chemin([Pt(-o, Hf + tb, d), Pt(W + o, Hf + tb, d)], h.a.detail)));
          o_.push(poly([Pt(-o, Hf, -o), Pt(W + o, Hf, -o), Pt(W + o, Hf + tb, -o), Pt(-o, Hf + tb, -o)], bl(h.a.arete)));
          o_.push(poly([Pt(W + o, Hf, -o), Pt(W + o, Hf, D + o), Pt(W + o, Hf + tb, D + o), Pt(W + o, Hf + tb, -o)], bl(h.a.arete)));
          jd.forEach(d => o_.push(h.chemin([Pt(W + o, Hf, d), Pt(W + o, Hf + tb, d)], h.a.detail)));
          // le tourniquet
          const tq = Pt(p * 0.4, Hf * 0.5, 0);
          o_.push(h.rect(tq[0] - 2.4, tq[1] - 11, 4.8, 22, bl(h.a.arete)), h.cercle(tq[0], tq[1], 1.2, h.a.plein));
          // la porte, ouverte
          const Dp = (s1, s2, y1, y2) => [Pd(s1, y1), Pd(s2, y1), Pd(s2, y2), Pd(s1, y2)];
          const ym = Hf / 2;
          o_.push(poly(Dp(0, Wd, 0, Hf), bl(h.a.arete)));
          o_.push(poly(Dp(q, Wd - q, q, ym - q / 2), h.a.hachure('grillage', 'arete')));
          o_.push(poly(Dp(q, Wd - q, ym + q / 2, Hf - q), h.a.hachure('grillage', 'arete')));
          // les deux lanières de cuir
          // une seule bande de cuir, sur la face extérieure : de la porte, elle passe la charnière et se cloue sur le côté
          [Hf * 0.18, Hf * 0.82].forEach(y => {
            o_.push(poly([Pd(q * 1.7, y - 3), Pt(W, y - 3, q * 1.7), Pt(W, y + 3, q * 1.7), Pd(q * 1.7, y + 3)], h.a.plein));
          });
          return o_.join('\n');
        },
        renvois: z => {
          const g = GA(z), { W, D, Hf, p, tb, o, Wd, x0, y0, Pt, Pd, yt, ds, q } = g;
          const xd = Pt(W, 0, D + o)[0] + 18;
          const tq = Pt(p * 0.4, Hf * 0.5, 0);
          return [
            { n: 1, rond: [xd, Pt(W, Hf * 0.72, D)[1]], cible: Pt(W, Hf * 0.72, D - p / 2), texte: 'cadre de lattes clouées' },
            { n: 2, rond: [xd, Pt(W, Hf * 0.32, D)[1]], cible: Pt(W, Hf * 0.32, D * 0.55), texte: 'vieille moustiquaire tendue' },
            { n: 3, rond: [xd, Pt(W, Hf + tb, D + o)[1] + 2], cible: Pt(W * 0.62, Hf + tb, D * 0.55), texte: 'dessus et fond pleins' },
            { n: 4, rond: [x0 + W + 16, y0 + 22], cible: Pd(q * 0.85, Hf * 0.18), texte: 'porte sur lanières de cuir' },
            { n: 5, rond: [tq[0] - 2, y0 + 24], cible: [tq[0], tq[1] + 9], texte: 'tourniquet de bois cloué' },
            { n: 6, rond: [x0 - 22, Pt(p, yt - g.hT / 2, D * 0.15)[1]], cible: Pt(p + g.tt, yt - g.hT / 2, D * 0.15), texte: 'tasseau à encoches' },
          ];
        },
      },
      coupe: {
        titre: 'En coupe, par le bâton',
        dessin: z => {
          const g = GB(z), { Wb, Hb, p, tb, o, xL, xR, yT, yB, r, yc, P1, P2, P3, Tg } = g;
          const o_ = [];
          // les montants du fond, au-delà de la coupe
          o_.push(h.rect(xL, yT + p, p, Hb - 2 * p - tb, h.a.arete), h.rect(xR - p, yT + p, p, Hb - 2 * p - tb, h.a.arete));
          // la moustiquaire des côtés, sur la face extérieure
          o_.push(h.ligne(xL - 1, yT, xL - 1, yB - tb, h.a.detail), h.ligne(xR + 1, yT, xR + 1, yB - tb, h.a.detail));
          // dessus, fond, traverses coupées
          o_.push(h.rect(xL - o, yT - tb, Wb + 2 * o, tb, h.a.hachure('bois')));
          o_.push(h.rect(xL, yB - tb, Wb, tb, h.a.hachure('bois')));
          [[xL, yT], [xR - p, yT], [xL, yB - tb - p], [xR - p, yB - tb - p]].forEach(([x, y]) => o_.push(h.rect(x, y, p, p, h.a.hachure('bois'))));
          // les tasseaux coupés à l'encoche, et le bâton dedans
          o_.push(h.rect(xL + p, yc + r, 6, 10, h.a.hachure('bois')), h.rect(xR - p - 6, yc + r, 6, 10, h.a.hachure('bois')));
          o_.push(h.rect(xL + p, yc - r, Wb - 2 * p, 2 * r, h.a.hachure('bois')));
          // les pièces
          o_.push(plaque(P1.cx, P1.top, P1.w, P1.ht), ficelle(P1.cx, yc, r, P1.top + 5));
          o_.push(saucisse(P2.cx, P2.top, P2.w, P2.ht), ficelle(P2.cx, yc, r, P2.top + 1));
          o_.push(plaque(P3.cx, P3.top, P3.w, P3.ht), ficelle(P3.cx, yc, r, P3.top + 5));
          // la planchette, pendue à la même broche que la pièce 1
          o_.push(h.ligne(P1.cx, P1.top + 5, P1.cx, Tg.y + 3, h.a.detail));
          o_.push(h.rect(Tg.x, Tg.y, Tg.l, Tg.h, bl(h.a.arete)), h.cercle(Tg.x + Tg.l / 2, Tg.y + 3, 1.1, h.a.detail));
          [7, 10].forEach(dy => o_.push(h.ligne(Tg.x + 2.5, Tg.y + dy, Tg.x + Tg.l - 2.5, Tg.y + dy, h.a.fin)));
          return o_.join('\n');
        },
        renvois: z => {
          const g = GB(z), { Wb, Hb, p, tb, xL, xR, yB, r, yc, P1, P3, Tg } = g;
          return [
            { n: 7, rond: [xL - 22, yc - 18], cible: [xL + p + 9, yc], texte: 'bâton de bois franc écorcé' },
            { n: 8, rond: [xR + 22, P3.top + P3.ht * 0.55], cible: [P3.cx + P3.w * 0.2, P3.top + P3.ht * 0.55], texte: 'ne touche ni voisine ni paroi' },
            { n: 9, rond: [xL - 22, Tg.y + Tg.h - 3], cible: [Tg.x + 3, Tg.y + Tg.h - 3], texte: 'planchette, même broche' },
          ];
        },
      },
      coin: {
        titre: 'Coin de la charnière, vu de dessus',
        dessin: z => {
          const g = GC(z), { S, Lt, px, py, dx0, dx1, dy0, dy1 } = g;
          const o_ = [];
          // le montant et la porte, coupés
          // trois hachures : le montant et la porte croisées (le groupe est en miroir), les lattes serrées
          const pat = (id, w, rot) => `<pattern id="${id}" width="${w}" height="${w}" patternUnits="userSpaceOnUse" patternTransform="rotate(${rot})"><line x1="0" y1="0" x2="0" y2="${w}" stroke="#1A1A1A" stroke-width="0.7"/></pattern>`;
          o_.push(`<defs>${pat('h7012-mont', 6, -45)}${pat('h7012-porte', 6, 45)}${pat('h7012-latte', 3, 45)}</defs>`);
          const hh = id => `fill="url(#${id})" stroke="#1A1A1A" stroke-width="1.4" stroke-linejoin="round"`;
          o_.push(h.rect(px, py, S, S, hh('h7012-mont')));
          o_.push(h.rect(dx0, dy0, dx1 - dx0, dy1 - dy0, hh('h7012-porte')));
          // la paroi qui continue, rompue
          const yr = py - 40;
          o_.push(h.chemin([[px - 5, yr + 3], [px - 3, yr - 1], [px + 1, yr + 4], [px + 3, yr]], h.a.detail));
          // la moustiquaire du côté : tendue le long du montant, rabattue en double au bout, les deux épaisseurs à 4
          o_.push(h.path(`M${f(px - 1)} ${f(yr + 2)} L${f(px - 1)} ${f(py + S - 3)} A2 2 0 0 1 ${f(px - 5)} ${f(py + S - 3)} L${f(px - 5)} ${f(py + S * 0.4)}`, h.a.detail));
          // la latte qui la pince
          o_.push(h.rect(dx0, py + S * 0.1, Lt, S * 0.8, hh('h7012-latte')));
          // une agrafe en U de 8 qui traverse les deux épaisseurs, un clou
          const ya = py + S * 0.66;
          o_.push(h.chemin([[px + 6, ya - 4], [px - 5.6, ya - 4], [px - 5.6, ya + 4], [px + 6, ya + 4]], h.a.arete));
          const yn = py + S * 0.3;
          o_.push(h.rect(dx0 - 3, yn - 1, px + S * 0.45 - dx0 + 3, 2, h.a.plein), h.rect(dx0 - 5, yn - 3.2, 2, 6.4, h.a.plein));
          // la moustiquaire de la porte, sur sa face extérieure, pincée sous sa latte
          const xf = dx1 - S * 0.72;
          o_.push(h.path(`M${f(dx1)} ${f(dy1 + 1)} L${f(xf + 3)} ${f(dy1 + 1)} A2 2 0 0 0 ${f(xf + 3)} ${f(dy1 + 5)} L${f(dx1 - S * 0.25)} ${f(dy1 + 5)}`, h.a.detail));
          o_.push(h.rect(dx1 - S * 0.8, dy1 + 6, S * 0.8, Lt, hh('h7012-latte')));
          const xg = dx1 - S * 0.16;
          o_.push(h.chemin([[xg - 4, dy1 - 6], [xg - 4, dy1 + 5.6], [xg + 4, dy1 + 5.6], [xg + 4, dy1 - 6]], h.a.arete));
          const xn = dx1 - S * 0.5;
          o_.push(h.rect(xn - 1, dy1 - S * 0.3, 2, S * 0.3 + 6 + Lt + 1, h.a.plein), h.rect(xn - 3.2, dy1 + 6 + Lt + 1, 6.4, 2, h.a.plein));
          // la lanière de cuir : clouée sur la porte, elle tourne le coin et remonte sur la latte du côté
          const xs = dx0 + S * 0.5;
          o_.push(poly([[xs, dy1], [xs, dy1 + 3], [dx0 - 3, dy1 + 3], [dx0 - 3, py + S * 0.12], [dx0, py + S * 0.12], [dx0, dy1]], h.a.plein));
          const xc = dx0 + S * 0.3;
          o_.push(h.rect(xc - 1, dy1 - S * 0.28, 2, S * 0.28 + 4, h.a.plein), h.rect(xc - 3.2, dy1 + 3, 6.4, 2, h.a.plein));
          // l'arc de la porte, centré sur le cuir : elle s'ouvre vers le dehors, d'équerre
          const cx0 = dx0 - 1.5, cy0 = dy1 + 1.5, Rr = dx1 - cx0;
          const ymax = z.h - 4, aMax = Math.min(Math.PI / 2, Math.asin(Math.min(1, (ymax - cy0) / Rr)));
          o_.push(h.path(`M${f(cx0 + Rr)} ${f(cy0)} A${f(Rr)} ${f(Rr)} 0 0 1 ${f(cx0 + Rr * Math.cos(aMax))} ${f(cy0 + Rr * Math.sin(aMax))}`, h.a.cache));
          // en miroir : le coin de la charnière est à droite, comme dans la vue d'ensemble
          const M_ = `<g transform="matrix(-1 0 0 1 ${f(z.l)} 0)">\n${o_.join('\n')}\n</g>`;
          // le petit plan de la cage vue de dessus, porte ouverte d'équerre, le coin cerclé
          const kx = 6, ky = 6, cw = 40, cd = 26, xr = kx + cw, yf = ky + cd;
          const plan = [
            h.rect(kx, ky, cw, cd, h.a.detail),
            h.ligne(xr, yf, xr, yf + cw - 6, h.a.arete),
            h.path(`M${kx + 2} ${yf} A${cw - 2} ${cw - 2} 0 0 0 ${xr} ${yf + cw - 2}`, h.a.cache),
            h.cercle(xr, yf, 6, h.a.fin),
          ];
          return M_ + '\n' + plan.join('\n');
        },
        renvois: z => {
          const g = GC(z), { S, Lt, px, py, dx0, dx1, dy0, dy1 } = g;
          const M = ([x, y]) => [z.l - x, y];
          return [
            { n: 10, rond: M([dx0 - 28, py + S + 2]), cible: M([px - 2.5, py + S - 3]), texte: 'moustiquaire pliée, agrafée' },
            { n: 11, rond: M([dx0 - 28, py + S * 0.3 - 26]), cible: M([dx0 + Lt / 2, py + S * 0.2]), texte: 'latte clouée par-dessus' },
            { n: 12, rond: M([px + S * 1.45, py + S * 0.4]), cible: M([px + S * 0.75, dy0]), texte: 'porte à plat sur le montant' },
            { n: 13, rond: M([dx0 - 24, dy1 + 26]), cible: M([dx0 - 1.5, dy1 + 1.5]), texte: 'cuir cloué des deux côtés' },
          ];
        },
      },
      neige: {
        titre: 'Dans un banc de neige, au nord',
        dessin: z => {
          const g = GD(z), { yg, xw, bw, bh, tb, p, bx, by, A, B, C, E, pl1, pl2, bump, S1, S2 } = g;
          const o_ = [];
          // le sol et le mur nord
          o_.push(h.rect(4, yg, z.l - 8, 14, h.a.hachure('terre', 'aucun')), h.ligne(4, yg, z.l - 4, yg, h.a.contour));
          o_.push(h.rect(xw, 4, 16, yg - 4, h.a.hachure('bois')));
          // le banc de neige
          const surf = `M${f(A[0])} ${f(A[1])} Q${f((A[0] + B[0]) / 2)} ${f(B[1] + 4)} ${f(B[0])} ${f(B[1])} L${f(C[0])} ${f(C[1])} `
            + `Q${f((C[0] + E[0]) / 2)} ${f(C[1] - 2)} ${f(E[0])} ${f(E[1])}`;
          o_.push(h.path(`${surf} L${f(xw)} ${f(yg)} L4 ${f(yg)} Z`, h.a.hachure('neige', 'aucun')));
          o_.push(h.path(surf, h.a.arete));
          // la caisse enfoncée, en coupe
          o_.push(h.rect(bx, by, bw, bh, bl(h.a.arete)));
          o_.push(h.rect(bx - 2, by, bw + 4, tb, h.a.hachure('bois')), h.rect(bx, by + bh - tb, bw, tb, h.a.hachure('bois')));
          [[bx, by + tb], [bx + bw - p, by + tb], [bx, by + bh - tb - p], [bx + bw - p, by + bh - tb - p]].forEach(([x, y]) => o_.push(h.rect(x, y, p, p, h.a.hachure('bois'))));
          const yc = by + tb + p + 7, r = 3;
          // les montants du fond et les tasseaux : le bâton porte sur quelque chose
          o_.push(h.rect(bx, by + tb + p, p, bh - 2 * tb - 2 * p, h.a.arete), h.rect(bx + bw - p, by + tb + p, p, bh - 2 * tb - 2 * p, h.a.arete));
          o_.push(h.rect(bx + p, yc + r, 5, 8, h.a.hachure('bois')), h.rect(bx + bw - p - 5, yc + r, 5, 8, h.a.hachure('bois')));
          o_.push(h.rect(bx + p, yc - r, bw - 2 * p, 2 * r, h.a.hachure('bois')));
          o_.push(plaque(bx + bw * 0.32, yc + r + 12, bw * 0.24, bh * 0.42), ficelle(bx + bw * 0.32, yc, r, yc + r + 17));
          o_.push(plaque(bx + bw * 0.7, yc + r + 10, bw * 0.2, bh * 0.34), ficelle(bx + bw * 0.7, yc, r, yc + r + 15));
          // les plaques d'écorce
          const plaqueE = (pl, lift) => {
            const [xa, xb] = pl, xm = (xa + xb) / 2, y0 = by - 3 - lift;
            return [
              h.path(`M${f(xa)} ${f(y0)} Q${f(xm)} ${f(y0 - 2 * bump)} ${f(xb)} ${f(y0)} L${f(xb)} ${f(y0 + 3)} Q${f(xm)} ${f(y0 + 3 - 2 * bump)} ${f(xa)} ${f(y0 + 3)} Z`, bl(h.a.arete)),
              ...[0.25, 0.5, 0.75].map(t => { const x = xa + (xb - xa) * t, y = y0 - 4 * bump * t * (1 - t); return h.ligne(x - 4, y + 1.5, x + 4, y + 1.5, h.a.fin); }),
            ].join('\n');
          };
          o_.push(plaqueE(pl1, 0), plaqueE(pl2, 3));
          // les pierres
          [S1, S2].forEach(s => o_.push(h.ellipse(s.x, s.y, s.rx, s.ry, h.a.hachure('pierre'))));
          return o_.join('\n');
        },
        renvois: z => {
          const g = GD(z), { yg, bw, bh, bx, by, A, S2, pl1 } = g;
          return [
            { n: 14, rond: [bx * 0.45, by - 6], cible: [bx * 0.45, yg - 22], texte: 'banc de neige, mur nord' },
            { n: 15, rond: [bx - 30, by + bh * 0.62], cible: [bx + 3, by + bh * 0.62], texte: 'caisse enfoncée à ras' },
            { n: 16, rond: [bx - 30, by - 34], cible: [pl1[0] + 10, by - 4], texte: 'plaques d\'écorce' },
            { n: 17, rond: [S2.x + 30, S2.y - 30], cible: [S2.x + 4, S2.y - 3], texte: 'pierres de lest' },
          ];
        },
      },
    },
  };
};
