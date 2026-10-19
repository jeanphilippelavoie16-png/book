// Planche 80-41 — le banc à chou (ch. 80, §9 « Fabriquer le banc à chou »).
// Cotes du chapitre seulement : la planche de 20 à 25 cm de large et de 80 cm à 1 m de long, la fente
// en travers aux deux tiers de la longueur, la lame qui dépasse de la face de 3 à 5 mm. Rien d'autre
// n'est coté : ni l'épaisseur de la planche, ni la largeur de la fente, ni la hauteur des tasseaux,
// ni la longueur exacte de la fente (« un peu plus longue que la largeur d'un demi-chou »).
// La planche est dessinée à 900 × 225 mm, au milieu des deux plages du chapitre.
// La lame : posée sur le rebord aval de la fente, biseau en haut, sur une cale qui monte son fil à
// 3 à 5 mm au-dessus de la face où glisse le chou ; le chou arrive par le long côté (les deux tiers).
// La charte : le bois coupé en hachure, sans gris ; la tranche du dessus de la planche à l'ombre dans
// la vue en place ; la paroi d'en face de la cuve en gris loin. Le rouge : la poussée du chou (le
// geste, dans la vue en place, repère 10), et le dépassement de la lame, le seul réglage de l'outil (point
// à contrôler, repère 7). Dans la coupe, le chou qui avance est une flèche noire : chaque rouge a son repère.
module.exports = (h) => {
  const A = h.a;
  const r1 = v => Math.round(v * 10) / 10;
  const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const P = pts => pts.map(p => `${r1(p[0])} ${r1(p[1])}`);
  const poly = pts => 'M' + P(pts).join(' L') + ' Z';
  const alea = graine => { let s = graine; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; };
  const tasChou = require('./_chou-tranche.js')(h);

  // ─── Vue 1 : vu de dessus ────────────────────────────────────────────────────────────────────
  const G = z => {
    const Lmm = 900, Wmm = 225;
    const k = Math.min((z.l - 160) / Lmm, (z.h - 60) / Wmm);   // 22 en haut pour la cote des deux tiers, 38 en bas pour celle de la longueur
    const L = Lmm * k, W = Wmm * k;
    const x0 = 100, y0 = 22;
    const xF = x0 + L * 2 / 3;                    // la fente, aux deux tiers
    const fl = 24 * k;                             // largeur de la fente (le long de la planche)
    const tw = 16 * k;                             // largeur d'un tasseau
    const sl = 160 * k;                            // longueur de la fente, en travers
    const ym = y0 + W / 2;
    const bl = 186 * k, bw = 30 * k;               // la lame : longueur, largeur (entre les tasseaux)
    return { k, L, W, x0, y0, xF, fl, tw, sl, ym, bl, bw };
  };
  const dessus = z => {
    const g = G(z), out = [];
    const { x0, y0, L, W, xF, fl, tw, sl, ym, bl, bw } = g;
    // la planche, le fil du bois
    out.push(h.rect(x0, y0, L, W, blanc(A.contour)));
    const r = alea(4);
    for (let i = 1; i < 6; i++) {
      const y = y0 + W * i / 6 + (r() - 0.5) * 4;
      if (Math.abs(y - (y0 + tw)) < 4 || Math.abs(y - (y0 + W - tw)) < 4) continue;
      const xa = x0 + 8 + r() * 30;
      let xb = x0 + L * 0.62 - r() * 40;
      // le fil qui passerait sous la pastille 2 (fente en travers) s'arrête avant elle
      if (Math.abs(y - (ym + 2)) < 14) xb = Math.min(xb, xF - 70 - 16);
      out.push(h.path(`M${r1(xa)} ${r1(y)} C${r1(xa + (xb - xa) * 0.35)} ${r1(y - 2)} ${r1(xa + (xb - xa) * 0.7)} ${r1(y + 3)} ${r1(xb)} ${r1(y + 1)}`, A.fin));
    }
    // la fente : on voit le vide (en noir, c'est un trou)
    out.push(h.rect(xF - fl / 2, ym - sl / 2, fl, sl, A.plein));
    // la lame en travers, sur le rebord aval de la fente, le fil au-dessus du vide
    const xl = xF - fl / 2 + 10 * g.k;              // le fil, en porte-à-faux sur la fente
    out.push(h.rect(xl, ym - bl / 2, bw, bl, blanc(A.arete)));
    out.push(h.ligne(xl + 7 * g.k, ym - bl / 2, xl + 7 * g.k, ym + bl / 2, A.detail));    // le biseau
    // deux vis par bout
    [-1, 1].forEach(s => [0.3, 0.7].forEach(t => {
      const x = xl + bw * t, y = ym + s * (bl / 2 - 8 * g.k);
      out.push(h.cercle(x, y, 2.6, blanc(A.detail)), h.ligne(x - 1.8, y, x + 1.8, y, A.detail));
    }));
    // les deux tasseaux, cloués le long des bords : le chemin du chou
    [y0, y0 + W - tw].forEach(y => {
      out.push(h.rect(x0, y, L, tw, blanc(A.arete)));
      [0.06, 0.3, 0.55, 0.8, 0.95].forEach(t => out.push(h.cercle(x0 + L * t, y + tw / 2, 1.3, A.plein)));
    });
    // les cotes
    out.push(h.cote(x0, y0 + W + 22, x0 + L, y0 + W + 22, '800 à 1 000 mm', { cote: 'dessous' }));
    out.push(h.ligne(x0, y0 + W + 4, x0, y0 + W + 28, A.fin), h.ligne(x0 + L, y0 + W + 4, x0 + L, y0 + W + 28, A.fin));
    out.push(h.cote(x0 - 22, y0, x0 - 22, y0 + W, '200 à 250 mm', { cote: 'gauche' }));
    out.push(h.ligne(x0 - 28, y0, x0 - 4, y0, A.fin), h.ligne(x0 - 28, y0 + W, x0 - 4, y0 + W, A.fin));
    out.push(h.cote(x0, y0 - 12, xF, y0 - 12, 'deux tiers de la longueur'));
    out.push(h.ligne(xF, y0 - 18, xF, ym - sl / 2 - 2, A.fin), h.ligne(x0, y0 - 18, x0, y0 - 2, A.fin));
    return { svg: out.join('\n'), g, xl };
  };
  const dessusRenvois = z => {
    const d = dessus(z), g = d.g;
    const xr = g.x0 + g.L + 26;
    return [
      { n: 1, rond: [xr, (g.ym - 14 + g.y0 + g.W - 6) / 2], cible: [g.x0 + g.L + 1, (g.ym - 14 + g.y0 + g.W - 6) / 2], texte: 'planche de bois franc' },
      { n: 2, rond: [g.xF - 70, g.ym + 2], cible: [g.xF - g.fl / 2 - 1, g.ym + 2], texte: 'fente en travers' },
      { n: 3, rond: [xr, g.ym - 14], cible: [d.xl + g.bw + 1, g.ym - 14], texte: 'lame en travers, biseau en haut' },
      { n: 4, rond: [g.xF + 64, g.y0 - 12], cible: [d.xl + g.bw * 0.7 + 2, g.ym - g.bl / 2 + 8 * g.k - 2], texte: 'lame vissée ou rivée aux deux bouts' },
      { n: 5, rond: [xr, g.y0 + g.W - 6], cible: [g.x0 + g.L + 1, g.y0 + g.W - g.tw / 2], texte: 'deux tasseaux cloués guident le chou' },
    ];
  };

  // ─── Vue 2 : en coupe, à la lame, grossi ─────────────────────────────────────────────────────
  // Coupe en long par le milieu de la fente, au voisinage de la lame. Échelle : q unités par mm. Le
  // chou, bien plus gros que ce qui est dessiné, sort de la vue en haut à gauche.
  const C = z => {
    const q = 5.2;
    const yS = z.h * 0.5;                          // la face du dessus, où glisse le chou
    const ep = 20 * q;                             // épaisseur de planche (dessinée, pas cotée)
    const xF = z.l * 0.62, fl = 16 * q;            // la fente
    const xA = xF - fl / 2, xB = xF + fl / 2;      // rebord amont, rebord aval
    const cale = 4 * q;                            // la cale : le fil à 4 mm de la face (3 à 5)
    const eL = 1.6 * q;                            // épaisseur de la lame
    const xFil = xA + 6 * q;                       // le fil, en porte-à-faux sur la fente
    return { q, yS, ep, xF, fl, xA, xB, cale, eL, xFil };
  };
  const coupe = z => {
    const c = C(z), out = [];
    const { q, yS, ep, xA, xB, cale, eL, xFil } = c;
    const yb = yS + ep;
    // la planche coupée : amont et aval de la fente, arrachées aux bords de la vue
    out.push(h.path(`M4 ${r1(yS)} L${r1(xA)} ${r1(yS)} L${r1(xA)} ${r1(yb)} L4 ${r1(yb)} Z`, A.hachure('bois', 'contour')));
    out.push(h.path(`M${r1(xB)} ${r1(yS)} L${r1(z.l - 4)} ${r1(yS)} L${r1(z.l - 4)} ${r1(yb)} L${r1(xB)} ${r1(yb)} Z`, A.hachure('bois', 'contour')));
    // la cale, sur le rebord aval, sous la lame
    const yC = yS - cale;                          // dessus de la cale = dessous de la lame = hauteur du fil
    out.push(h.rect(xB + 3 * q, yC, z.l - 4 - xB - 3 * q, cale, A.hachure('bois', 'arete')));
    // la lame : dessous plat (le fil au niveau du dessous), biseau sur le dessus, vers le fil
    const yLh = yC - eL;
    out.push(h.path(poly([[xFil, yC], [xFil + 6 * q, yLh], [z.l - 4, yLh], [z.l - 4, yC]]), A.hachure('metal', 'arete')));
    // la vis : tête bombée sur la lame, corps dans la cale et la planche
    const xv = xB + 22 * q;
    if (xv + 4 * q < z.l - 6) {
      out.push(h.rect(xv - 1.5 * q, yC, 3 * q, cale + 12 * q, A.plein));
      out.push(h.path(`M${r1(xv - 3.4 * q)} ${r1(yLh)} Q${r1(xv)} ${r1(yLh - 2.8 * q)} ${r1(xv + 3.4 * q)} ${r1(yLh)} Z`, A.plein));
    }
    // le chou : un quartier qui glisse sur la face amont, coupé par le bord de la vue. Sous le fil, il
    // n'a pas de contour : sa couche du bas continue en tranche, sous la lame.
    const front = `M${r1(xFil)} ${r1(yC)}`
      + ` C${r1(xFil + 4 * q)} ${r1(yC - 3)} ${r1(xFil + 7 * q)} ${r1(yC - 18)} ${r1(xFil + 7 * q)} ${r1(yC - 40)}`
      + ` C${r1(xFil + 7 * q)} ${r1(yC - 80)} ${r1(xFil - 20)} ${r1(yS - 150)} ${r1(xFil - 60)} 0`;
    const dChou = `M0 ${r1(yS)} L${r1(xFil)} ${r1(yS)} L` + front.slice(1) + ' L0 0 Z';
    // les feuilles serrées du chou coupé, découpées par le contour du chou : aucune ne sort dans le blanc
    const clip = `vue-80-41-chou`;
    out.push(h.path(dChou, A.blanc));
    out.push(`<clipPath id="${clip}">${h.path(dChou, A.blanc)}</clipPath>`);
    out.push(`<g clip-path="url(#${clip})">`);
    [0, 1, 2, 3, 4].forEach(i => out.push(h.path(`M0 ${r1(yS - 18 - i * 24)} C${r1(xA * 0.5)} ${r1(yS - 22 - i * 26)} ${r1(xFil - 20 + i * 4)} ${r1(yS - 30 - i * 30)} ${r1(xFil - 40 + i * 2)} ${r1(yS - 80 - i * 40)}`, A.fin)));
    out.push('</g>');
    out.push(h.path(front, A.contour));
    // la tranche : elle naît au fil, sa face du haut au fil, sa face du bas dans le plan de la face où glisse
    // le chou ; elle passe sous la lame, puis se courbe dans la fente. On suit son axe et on l'épaissit.
    const t = yS - yC, yc0 = (yS + yC) / 2, Lh = 1.6 * q, Rm = 3.4 * q;
    const axeT = [];
    for (let i = 0; i <= 4; i++) axeT.push([xFil + Lh * i / 4, yc0, 1, 0]);
    for (let i = 1; i <= 18; i++) { const a = Math.PI / 2 * i / 18; axeT.push([xFil + Lh + Rm * Math.sin(a), yc0 + Rm - Rm * Math.cos(a), Math.cos(a), Math.sin(a)]); }
    const xv0 = xFil + Lh + Rm, yv0 = yc0 + Rm;
    for (let i = 1; i <= 16; i++) { const s_ = 9 * q * i / 16; axeT.push([xv0 - 0.006 * s_ * s_, yv0 + s_, -0.012 * s_, 1]); }
    const bordT = sg => axeT.map(([x, y, tx, ty]) => { const l = Math.hypot(tx, ty); return [x + sg * (ty / l) * t / 2, y - sg * (tx / l) * t / 2]; });
    const hautT = bordT(1), basT = bordT(-1);
    out.push(h.path(poly([...hautT, ...basT.slice().reverse()]), A.blanc));
    const ligneT = P_ => 'M' + P(P_).join(' L');
    out.push(h.path(ligneT(hautT), A.arete));
    out.push(h.path(ligneT([[xA, yS], ...basT]), A.arete));
    out.push(h.path(ligneT([hautT[hautT.length - 1], basT[basT.length - 1]]), A.arete));
    // le chou qui avance vers la lame : une flèche noire ; le geste en rouge est dans la vue en place (repère 10)
    out.push(h.fleche(`M${r1(14)} ${r1(yS - 34)} L${r1(xFil - 46)} ${r1(yS - 34)}`, A.arete));
    // la cote : du dessus de la face amont au fil, prise à gauche de la fente, sous le chou
    out.push(h.ligne(xFil - 2, yC, xA - 58, yC, A.fin));
    out.push(h.cote(xA - 50, yC, xA - 50, yS, '3 à 5 mm', { cote: 'gauche' }));
    out.push(h.controle(xFil, yC + cale / 2, 13));
    const finT = [(hautT[hautT.length - 1][0] + basT[basT.length - 1][0]) / 2, (hautT[hautT.length - 1][1] + basT[basT.length - 1][1]) / 2];
    return { svg: out.join('\n'), c, yC, yb, finT, basT };
  };
  const coupeRenvois = z => {
    const d = coupe(z), c = d.c;
    return [
      { n: 6, rond: [z.l - 30, d.yC - 50], cible: [z.l - 40, d.yC + c.cale / 2], texte: 'cale sous la lame' },
      { n: 7, rond: [c.xFil + 52, d.yC - 30], cible: [c.xFil + 10, d.yC + 2], texte: 'le dépassement fixe l’épaisseur de la tranche' },
      { n: 8, rond: [d.finT[0] - 2, d.finT[1] + 26], cible: [d.finT[0], d.finT[1] + 2], texte: 'la tranche passe sous le fil' },
    ];
  };

  // ─── Vue 3 : en place, en travers de la cuve ─────────────────────────────────────────────────
  const place = z => {
    const out = [];
    const cx = z.l * 0.55, yb = z.h - 8;
    const R = Math.min(z.l * 0.3, 90), Hc = Math.min(z.h - 150, 230);
    const yr = yb - Hc;                            // le bord de la cuve
    const e = 8;
    // la cuve en coupe : la paroi d'en face en gris loin, le chou tranché en tas au fond
    out.push(h.rect(cx - R + e, yr, 2 * (R - e), Hc - e, A.loin));
    // le chou tranché, au fond : des lanières plates en arc simple, couchées en rangs à peu près horizontaux, le dessus
    // tassé presque plat (module _chou-tranche.js, retenu sur la feuille d'essai _essai-chou-tranche.js)
    const yTas = yb - e - 56;
    out.push(tasChou({ x0: cx - R + e, x1: cx + R - e, yHaut: yTas, yBas: yb - e, id: 'vue-80-41-tas' }));
    out.push(h.path(poly([[cx - R, yr], [cx - R, yb], [cx + R, yb], [cx + R, yr], [cx + R - e, yr], [cx + R - e, yb - e], [cx - R + e, yb - e], [cx - R + e, yr]]), A.hachure('bois', 'contour')));
    // la planche en travers, posée sur les deux bords ; la fente au-dessus de l'ouverture
    const ep = 9, tH = 8;
    const L = 2 * R * 1.5, xF = cx + R * 0.45;     // la fente, aux deux tiers depuis le bout de gauche
    const xg = xF - L * 2 / 3, xd = xg + L;
    const yP = yr - ep;
    out.push(h.rect(xg, yP, xF - 5 - xg, ep, A.hachure('bois', 'arete')));
    out.push(h.rect(xF + 5, yP, xd - xF - 5, ep, A.hachure('bois', 'arete')));
    // le tasseau du côté d'en face, vu par-dessus la planche : sa face à l'ombre
    out.push(h.rect(xg, yP - tH, L, tH, A.ombre), h.rect(xg, yP - tH, L, tH, A.arete));
    // la lame et sa cale, sur le rebord aval
    out.push(h.rect(xF + 4, yP - 2.4, 26, 2.4, A.plein), h.rect(xF + 1, yP - 4, 30, 1.6, A.plein));
    // des tranches qui tombent par la fente
    [[0, 20], [4, 44], [-3, 70]].forEach(([dx, dy]) => out.push(h.path(`M${r1(xF - 6 + dx)} ${r1(yr + dy)} q8 3 6 14 l-3 -1 q1 -9 -5 -11 Z`, blanc(A.detail))));
    // le chou en quartier, couché sur une face coupée ; l'autre face coupée, debout, va vers la lame.
    // On voit de côté les feuilles serrées en couches autour du cœur.
    const xc = xF - 30, Rq = 62, yq = yP;            // le cœur du chou : le coin du quartier
    const ch = `M${r1(xc)} ${r1(yq)} L${r1(xc)} ${r1(yq - Rq)} A${Rq} ${Rq} 0 0 0 ${r1(xc - Rq)} ${r1(yq)} Z`;
    out.push(h.path(ch, blanc(A.contour)));
    [0.3, 0.52, 0.72, 0.88].forEach(t => out.push(h.path(`M${r1(xc)} ${r1(yq - Rq * t)} A${r1(Rq * t)} ${r1(Rq * t)} 0 0 0 ${r1(xc - Rq * t)} ${r1(yq)}`, A.fin)));
    out.push(h.path(`M${r1(xc)} ${r1(yq)} L${r1(xc - 16)} ${r1(yq - 10)}`, A.detail));   // le trognon
    // on pousse le quartier par le dos, à mi-hauteur, vers la lame
    const yG_ = yq - Rq * 0.5, xDos = xc - Rq * Math.cos(Math.PI / 6);
    const g0 = [xDos - 48, yG_], g1 = [xDos - 5, yG_];
    out.push(h.geste(`M${r1(g0[0])} ${r1(g0[1])} L${r1(g1[0])} ${r1(g1[1])}`));
    return { svg: out.join('\n'), cx, R, yr, yb, xg, xd, yP, xF, xc, g0, g1 };
  };
  const placeRenvois = z => {
    const p = place(z);
    return [
      { n: 9, rond: [p.xd - 10, p.yP + 40], cible: [p.xd - 16, p.yP + 4.5], texte: 'planche posée en travers de la cuve' },
      { n: 10, rond: [p.g0[0] + 4, p.g0[1] - 38], cible: [p.g0[0] + 20, p.g0[1] - 2.5], texte: 'pousser le quartier de chou vers la lame' },
    ];
  };

  return {
    ref: '80-41',
    titre: 'Le banc à chou',
    desc: 'Vu de dessus, une planche de bois franc de 200 à 250 mm de large et de 800 à 1 000 mm de long. Aux deux tiers de la longueur, une fente '
      + 'en travers ; une lame vissée en travers de la fente, biseau en haut ; deux tasseaux cloués le long des bords font le chemin du chou. '
      + 'En coupe, grossie : la lame posée sur une cale, sur le rebord aval de la fente, son fil 3 à 5 mm au-dessus de la face où glisse le chou ; '
      + 'le quartier de chou arrive par le long côté, son bas passe sous le fil et la tranche tombe par la fente. '
      + 'En place : la planche posée en travers de la cuve, la fente au-dessus de l’ouverture ; le quartier de chou poussé vers la lame, les tranches tombent dans la cuve.',
    format: 'pleine',
    disposition: [['dessus'], ['coupe', 'place']],
    hauteurs: [192, 462],                         // la vue de dessus au plus juste : pas de blanc sous sa cote
    largeurs: [[1], [1, 1.05]],
    vues: {
      dessus: { titre: 'Vu de dessus', dessin: z => dessus(z).svg, renvois: dessusRenvois },
      coupe: { titre: 'En coupe, à la lame', dessin: z => coupe(z).svg, renvois: coupeRenvois },
      place: { titre: 'En place, sur la cuve', dessin: z => place(z).svg, renvois: placeRenvois },
    },
  };
};
