// Planche 112-42. La chandelle de jonc.
// Chapitre 112, §9-H : le jonc épars, cueilli en été, jeté à l'eau dès qu'il est coupé ; on pèle
// l'écorce verte en laissant une seule bande sur toute la longueur, pour tenir la moelle droite ;
// sécher, puis tremper la moelle dans le gras fondu ; ça se brûle presque couché, pincé dans un
// bâton fendu ; un jonc de 70 cm brûle près d'une heure, d'une lumière claire, à condition de ne
// laisser qu'une bande : deux bandes font durer, mais éclairent mal.
// Source : Gilbert White, lettre XXVI (sources/89-gilbert-white-selborne-chandelles-de-jonc.md) :
// « one regular, narrow, even rib from top to bottom that may support the pith » ; les veilleuses
// à deux côtes éclairent mal. La seule cote est celle du chapitre (70 cm), écrite en mm (700 mm), comme toutes les cotes du livre.
// Le jonc est grossi dans les deux premières rangées ; il est à l'échelle dans la dernière.
module.exports = (h) => {
  const A = h.a;
  const BL = '#FFFFFF';
  const blanc = t => A[t].replace('fill="none"', `fill="${BL}"`);
  const f = v => Math.round(v * 100) / 100;
  const pt = p => `${f(p[0])} ${f(p[1])}`;
  const poly = (P, ferme = true) => 'M ' + P.map(pt).join(' L ') + (ferme ? ' Z' : '');
  const add = (a, b, k = 1) => [a[0] + b[0] * k, a[1] + b[1] * k];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const uni = v => { const l = Math.hypot(v[0], v[1]) || 1; return [v[0] / l, v[1] / l]; };
  const nor = v => [-v[1], v[0]];
  const RAD = Math.PI / 180;
  // la moelle : blanche, spongieuse (un pointillé fin)
  const MOELLE = A.hachure('neige', 'aucun');

  // ─── Vue 1 : peler, en gardant une bande ────────────────────────────────────────────────
  // Un bout de jonc grossi, couché. À gauche, l'écorce encore entière ; au milieu, deux lanières
  // qui se détachent ; à droite, la moelle nue, tenue par une seule bande d'écorce sur le dessus.
  const P1 = z => ({ y: z.h / 2 + 6, r: 20, x0: 8, xa: z.l * 0.34, xb: z.l * 0.56, x1: z.l - 8, e: 4 });
  const vuePeler = z => {
    const q = P1(z), { y, r, x0, xa, xb, x1, e } = q, out = [];
    // la moelle nue, de xa au bout
    out.push(h.rect(xa, y - r + e, x1 - xa, 2 * r - e, A.blanc));
    out.push(h.rect(xa, y - r + e, x1 - xa, 2 * r - e, MOELLE));
    out.push(h.path(`M ${pt([xa, y + r])} L ${pt([x1, y + r])} M ${pt([x1, y - r])} L ${pt([x1, y + r])}`, A.contour));
    // la bande d'écorce gardée, sur le dessus, de bout en bout
    out.push(h.rect(xa - 4, y - r, x1 - xa + 4, e + 1, blanc('arete')));
    for (const x of [xa + 30, xa + 110, xa + 190, xa + 270]) if (x < x1 - 20) out.push(h.ligne(x, y - r + 2.5, x + 50, y - r + 2.5, A.fin));
    out.push(h.ligne(xa - 4, y - r, x1, y - r, A.contour));
    // deux lanières qui se détachent vers le bas et vers l'avant, entre xa et xb
    // une lanière : un ruban qui part du bord de l'écorce, retombe et s'amincit au bout
    // une lanière : un ruban dont le bord du haut part du bord du bas de la moelle (là où était l'écorce),
    // retombe et s'amincit au bout
    const lan = (l, chute, w = 6.5) => {
      const P = [];
      for (let i = 0; i <= 60; i++) {
        const t = i / 60, x = xa + (l + 2) * t, ww = w * (1 - 0.8 * Math.exp(-t / 0.06)) * (1 - 0.55 * t), yy = y + r + ww / 2 + chute * t * t;
        P.push([x, yy, ww]);
      }
      const haut = P.map(p => [p[0], p[1] - p[2] / 2]), bas = P.map(p => [p[0], p[1] + p[2] / 2]).reverse();
      // le bout attaché n'a pas de trait : la lanière sort du bord du bas de la moelle
      return [h.path(poly([...haut, ...bas]), A.blanc), h.path(poly([...haut, ...bas], false), A.arete)].join('\n');
    };
    out.push(lan(xb - xa + 40, 50), lan(xb - xa - 40, 20));
    // l'écorce entière, à gauche : un tube vert, ses fibres en long
    out.push(h.path(poly([[x0, y - r], [xa, y - r], [xa, y + r], [x0, y + r]]), A.blanc));
    out.push(h.path(poly([[x0, y + r * 0.35], [xa, y + r * 0.35], [xa, y + r], [x0, y + r]]), A.ombre));
    out.push(h.path(`M ${pt([x0, y - r])} L ${pt([xa, y - r])} M ${pt([x0, y + r])} L ${pt([xa, y + r])} M ${pt([xa, y - r])} L ${pt([xa, y + r])}`, A.contour));
    for (const [yy, a, b] of [[-10, 20, 120], [-2, 70, 170], [6, 30, 140], [12, 110, 190]]) out.push(h.ligne(x0 + a, y + yy, Math.min(x0 + b, xa - 6), y + yy, A.fin));
    // le bout coupé, à gauche : rompu
    out.push(h.path(`M ${pt([x0, y - r])} L ${pt([x0 + 5, y - 6])} L ${pt([x0 - 3, y + 4])} L ${pt([x0, y + r])}`, A.arete));
    return out.join('\n');
  };
  const renvoisPeler = z => {
    const q = P1(z), { y, r, xa, xb, x1, e } = q;
    return [
      { n: 1, rond: [xa + (xb - xa + 42) * 0.72 - 34, z.h - 14], cible: [xa + (xb - xa + 42) * 0.72, y + r + 50 * 0.5184 + 6.5 * (1 - 0.55 * 0.72) + 1], texte: 'peler l’écorce verte en lanières' },
      { n: 2, rond: [x1 - 90, y - r - 26], cible: [x1 - 110, y - r + 1], texte: 'une seule bande, d’un bout à l’autre' },
      { n: 3, rond: [x1 - 40, y + r + 28], cible: [x1 - 60, y + 6], texte: 'la moelle sert de mèche' },
    ];
  };

  // ─── Vues 2 et 3 : en coupe, une bande, deux bandes ─────────────────────────────────────
  const coupe = (z, bandes) => {
    const c = [z.l / 2, z.h / 2], r = Math.min(z.l, z.h) * 0.3, out = [];
    out.push(h.cercle(c[0], c[1], r, A.blanc), h.cercle(c[0], c[1], r, MOELLE), h.cercle(c[0], c[1], r, A.arete));
    for (const a of bandes) {
      const a0 = (a - 22) * RAD, a1 = (a + 22) * RAD, R2 = r + 5;
      const P = [];
      for (let i = 0; i <= 12; i++) { const t = a0 + (a1 - a0) * i / 12; P.push([c[0] + R2 * Math.cos(t), c[1] + R2 * Math.sin(t)]); }
      for (let i = 12; i >= 0; i--) { const t = a0 + (a1 - a0) * i / 12; P.push([c[0] + (r - 0.5) * Math.cos(t), c[1] + (r - 0.5) * Math.sin(t)]); }
      out.push(h.path(poly(P), A.plein));
    }
    return out.join('\n');
  };

  // ─── Vue 4 : tremper ────────────────────────────────────────────────────────────────────
  const T4 = z => {
    const y0 = z.h * 0.42, y1 = z.h - 18, x0 = 16, x1 = z.l - 16, yG = y0 + 12;
    const a = [x0 - 8, y0 - 12], b = [x1 - 26, y1 - 14], u = uni(sub(b, a)), n = nor(u);
    // la flèche du geste : parallèle au jonc, au-dessus de sa partie qui sort, vers le gras
    const g0 = add(add(a, u, 12), n, -12), g1 = add(add(a, u, 54), n, -12);
    return { y0, y1, x0, x1, yG, a, b, u, n, g0, g1 };
  };
  const vueTremper = z => {
    const { y0, y1, x0, x1, yG, a, b, n, g0, g1 } = T4(z), out = [];
    // le jonc d'abord : la trame du gras passe par-dessus sa partie trempée. Son contour est plein au-dessus de la
    // surface, fin dessous.
    const J = [add(a, n, 2.5), add(b, n, 2.5), add(b, n, -2.5), add(a, n, -2.5)];
    out.push(h.path(poly(J), A.blanc));
    const coupe = (p, q_) => { const t = (yG - p[1]) / (q_[1] - p[1]); return [p[0] + (q_[0] - p[0]) * t, yG]; };
    const s1 = coupe(J[0], J[1]), s2 = coupe(J[3], J[2]);
    out.push(h.path(`M ${pt(s1)} L ${pt(J[0])} L ${pt(J[3])} L ${pt(s2)}`, A.arete));
    out.push(h.path(`M ${pt(s1)} L ${pt(J[1])} L ${pt(J[2])} L ${pt(s2)}`, A.detail));
    // le gras fondu, en coupe : il garde sa trame de liquide en traits noirs, le bleu est réservé à l'eau (JP,
    // 19 octobre 2026 : « toute l'eau en bleu sur les planches » ; le gras n'en est pas)
    out.push(`<defs><pattern id="h-gras-112-42" width="16" height="7" patternUnits="userSpaceOnUse"><line x1="1" y1="2" x2="8" y2="2" stroke="#1A1A1A" stroke-width="0.5"/><line x1="9" y1="5.5" x2="15" y2="5.5" stroke="#1A1A1A" stroke-width="0.5"/></pattern></defs>`);
    out.push(h.rect(x0 + 6, yG, x1 - x0 - 12, y1 - yG - 6, 'fill="url(#h-gras-112-42)" stroke="none"'));
    out.push(h.ligne(x0 + 6, yG, x1 - 6, yG, A.detail));
    // le plat long, en coupe
    out.push(h.path(poly([[x0, y0], [x0 + 6, y0], [x0 + 6, y1 - 6], [x1 - 6, y1 - 6], [x1 - 6, y0], [x1, y0], [x1, y1], [x0, y1]]), A.hachure('metal', 'contour')));
    out.push(h.geste(`M ${pt(g0)} L ${pt(g1)}`));
    return out.join('\n');
  };
  const renvoisTremper = z => {
    const { n, g0, g1 } = T4(z), m = [(g0[0] + g1[0]) / 2, (g0[1] + g1[1]) / 2];
    return [{ n: 4, rond: [m[0] - n[0] * 30 + 14, m[1] - n[1] * 30], cible: [m[0] - n[0] * 3, m[1] - n[1] * 3], texte: 'tremper le jonc dans le gras fondu' }];
  };

  // ─── Vue 5 : brûler, presque couché ─────────────────────────────────────────────────────
  // À l'échelle : un jonc de 70 cm, pincé à un bout dans la fente d'un bâton planté dans une bûche.
  const P5 = z => {
    const k = 0.45, yg = z.h - 14, xb = 150, hb = 100 * k, wb = 160 * k, hs = 150 * k;
    const tete = [xb, yg - hb - hs + 10];                     // où la fente pince le jonc
    const ang = 8 * RAD, u = [Math.cos(ang), -Math.sin(ang)];
    const debut = add(tete, u, -50 * k), fin = add(debut, u, 700 * k);
    return { k, yg, xb, hb, wb, hs, tete, ang, u, debut, fin };
  };
  const vueBruler = z => {
    const q = P5(z), { k, yg, xb, hb, wb, hs, tete, u, debut, fin } = q, out = [];
    out.push(h.ligne(0, yg, z.l, yg, A.arete));
    // la bûche, debout, son ombre à droite
    out.push(h.rect(xb - wb / 2, yg - hb, wb, hb, A.blanc));
    out.push(h.rect(xb + wb * 0.18, yg - hb, wb * 0.32, hb, A.ombre));
    out.push(h.rect(xb - wb / 2, yg - hb, wb, hb, A.contour));
    out.push(h.ellipse(xb, yg - hb, wb / 2, 6, blanc('contour')));
    out.push(h.ellipse(xb, yg - hb, wb * 0.3, 3.5, A.fin));
    // le jonc d'abord : le bâton passe par-dessus, et on le voit dans le jour de la fente
    const n = nor(u), e = 2.6;
    out.push(h.path(poly([add(debut, n, e), add(fin, n, e), add(fin, n, -e), add(debut, n, -e)]), blanc('arete')));
    // le bâton planté dans la bûche, fendu du haut jusque sous le jonc : la fente s'ouvre en un jour étroit, de la
    // largeur du jonc qu'elle pince ; ses deux moitiés tiennent le jonc de part et d'autre
    const w = 44 * k, yH = tete[1] - 16, gs = 6, yFd = tete[1] + e + 9, yBas = yg - hb + 3;
    const baton = [[xb - w / 2, yBas], [xb - w / 2, yH + 1.5], [xb - w / 2 + 1.5, yH], [xb - gs / 2, yH], [xb - gs / 2, yFd],
      [xb, yFd + 4], [xb + gs / 2, yFd], [xb + gs / 2, yH], [xb + w / 2 - 1.5, yH], [xb + w / 2, yH + 1.5], [xb + w / 2, yBas]];
    out.push(h.path(poly(baton), A.blanc));
    out.push(h.path(poly(baton.slice(0, 4), false) + ' ' + poly(baton.slice(7), false).replace('M', 'M'), A.contour));
    out.push(h.path(poly(baton.slice(3, 8), false), A.arete));
    out.push(h.ligne(xb - w / 2, yBas, xb + w / 2, yBas, A.contour));
    out.push(h.ligne(xb - 5, tete[1] + 30, xb - 5, yg - hb - 4, A.fin));
    // la flamme, debout au bout du jonc
    const fl = add(fin, u, -3);
    const F = (x, y) => [fl[0] + x, fl[1] + y];
    out.push(h.path(`M ${pt(F(-6, 2))} C ${pt(F(-10, -10))} ${pt(F(-2, -18))} ${pt(F(3, -32))} C ${pt(F(9, -18))} ${pt(F(11, -7))} ${pt(F(6, 3))} C ${pt(F(3, 6))} ${pt(F(-3, 6))} ${pt(F(-6, 2))} Z`, blanc('arete')));
    out.push(h.path(`M ${pt(F(-2, 0))} C ${pt(F(-4, -7))} ${pt(F(0, -11))} ${pt(F(2.5, -18))} C ${pt(F(5, -10))} ${pt(F(5, -4))} ${pt(F(3, 0))}`, A.detail));
    // la cote : la longueur du jonc, sous lui
    const c0 = add(debut, n, 18), c1 = add(fin, n, 18);
    out.push(h.ligne(...c0, ...c1, A.detail));
    for (const p of [c0, c1]) out.push(h.ligne(...add(p, n, -6), ...add(p, n, 6), A.detail));
    const m = add([(c0[0] + c1[0]) / 2, (c0[1] + c1[1]) / 2], n, 14);
    out.push(h.texte(m[0] + 40, m[1] + 4, '700 mm', { lisere: true }));
    return out.join('\n');
  };
  const renvoisBruler = z => {
    const q = P5(z), { xb, hb, hs, yg, tete, u, debut, fin } = q;
    const mi = add(debut, u, 230);
    const w = 44 * q.k, xc = xb - w / 2 - 4;
    return [
      // sur le bord du haut du jonc, juste avant qu'il entre dans la fente
      { n: 5, rond: [xb - 70, tete[1] - 22], cible: [xc, tete[1] + (xb - xc) * Math.tan(q.ang) - 3.2], texte: 'pincer le jonc dans un bâton fendu' },
      { n: 6, rond: [mi[0] + 14, mi[1] - 36], cible: [mi[0], mi[1] - 4], texte: 'brûler le jonc presque couché' },
    ];
  };

  return {
    ref: '112-42',
    titre: 'La chandelle de jonc',
    desc: 'La chandelle de jonc, en trois temps. Peler : sur un bout de jonc grossi, l’écorce verte se détache en lanières et il ne reste qu’une seule bande, sur le dessus, d’un bout à l’autre ; elle tient droite la moelle blanche, qui fait la mèche. En coupe, la moelle avec une bande, et avec deux bandes, qui font durer mais éclairent mal. Tremper : le jonc sec couché dans un plat de gras fondu, la plus grande partie sous la surface, un bout qui dépasse par-dessus le bord ; on l’enfonce dans le gras. Brûler : un jonc de 700 mm pincé à un bout dans la fente d’un bâton planté dans une bûche, presque couché, la flamme au bout libre.',
    format: 'pleine',
    disposition: [['peler'], ['une', 'deux', 'tremper'], ['bruler']],
    hauteurs: [0.95, 0.85, 1.1],
    largeurs: [[1], [1, 1, 1.5], [1]],
    vues: {
      peler: { titre: 'Peler, en gardant une bande (grossi)', dessin: vuePeler, renvois: renvoisPeler },
      une: { titre: 'Une bande : éclaire bien', dessin: z => coupe(z, [-90]), renvois: [] },
      deux: { titre: 'Deux bandes : éclaire mal', dessin: z => coupe(z, [-90, 90]), renvois: [] },
      tremper: { titre: 'Tremper, une fois sec', dessin: vueTremper, renvois: renvoisTremper },
      bruler: { titre: 'Brûler, presque couché', dessin: vueBruler, renvois: renvoisBruler },
    },
  };
};
