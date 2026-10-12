// 110-40 — Lire le fil du bois (ch. 110 : §3 le godet, §5.1 étape 1, §5.5 étape 19,
// §5.6 étape 25, §6 points de contrôle « pente du fil » et « cheville »).
// Aucune cote : le chapitre ne donne aucune mesure pour ce qui est dessiné ici. La pente du
// fil, le jeu du tenon et le vide sous le tenon sont exagérés pour se voir.

module.exports = (h) => {
  const f = n => Math.round(n * 10) / 10;
  const P = (x, y) => `${f(x)} ${f(y)}`;

  // Une ligne de fil, à peine ondulée.
  function fil(x1, y1, x2, y2, a = 1.2, at = h.a.detail) {
    const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1;
    const nx = -dy / L * a, ny = dx / L * a;
    return h.path(`M ${P(x1, y1)} C ${P(x1 + dx / 3 + nx, y1 + dy / 3 + ny)} ${P(x1 + 2 * dx / 3 - nx, y1 + 2 * dy / 3 - ny)} ${P(x2, y2)}`, at);
  }

  // Une goutte qui tombe, pointe en haut.
  function goutte(x, y, s = 3.2) {
    return h.path(`M ${P(x, y - 2.2 * s)} C ${P(x + 0.3 * s, y - 1.3 * s)} ${P(x + s, y - 0.5 * s)} ${P(x + s, y + 0.1 * s)} A ${f(s)} ${f(s)} 0 0 1 ${P(x - s, y + 0.1 * s)} C ${P(x - s, y - 0.5 * s)} ${P(x - 0.3 * s, y - 1.3 * s)} ${P(x, y - 2.2 * s)} Z`, h.a.plein);
  }

  // Cernes sur le bout d'une pièce : le bout est le parallélogramme (o, o + u·e1, o + u·e1 + v·e2).
  function cernes(ox, oy, e1, e2, uc, vc, W, rayons) {
    const o = [];
    rayons.forEach(r => {
      let run = [];
      const fin = () => { if (run.length > 2) o.push(h.chemin(run, h.a.fin)); run = []; };
      for (let i = 0; i <= 96; i++) {
        const t = (i / 96) * 2 * Math.PI;
        const u = uc + (r * Math.cos(t)) / W, v = vc + r * Math.sin(t);
        if (u < 0.04 || u > 0.96 || v < 0.04 || v > 0.96) { fin(); continue; }
        run.push([f(ox + u * e1[0] + v * e2[0]), f(oy + u * e1[1] + v * e2[1])]);
      }
      fin();
    });
    return o;
  }

  // Les fibres d'une face au fil en biais : chacune monte du chant du bas (ou du bout de gauche)
  // vers le chant du haut (ou le bout de droite). Écarts irréguliers, pour que ce soit du fil
  // et pas une hachure de coupe. sort : la fibre ressort par le chant du haut.
  const ECARTS = [34, 27, 41, 30, 37, 25, 39, 31, 35, 28, 40, 33];
  const RUN = 190;                                 // course d'une fibre sur la pièce au chauffage
  function fibresBiais(x0, y0, L, H, run) {
    const k = H / run, out = [];
    let s = x0 - run + 14, i = 0;
    while (s < x0 + L - 10) {
      const xa = Math.max(x0, s), xb = Math.min(x0 + L, s + run);
      out.push({ xa, ya: y0 + H - (xa - s) * k, xb, yb: y0 + H - (xb - s) * k, sort: s + run <= x0 + L - 14 });
      s += ECARTS[i++ % ECARTS.length];
    }
    return out;
  }

  // Une pièce équarrie en perspective cavalière : la face, le chant du dessus, le bout de droite.
  // biais = 0 : le fil court d'un bout à l'autre ; sinon, la course horizontale d'une fibre
  // qui monte du chant du bas au chant du haut.
  function piece(x0, y0, L, H, dx, dy, biais) {
    const o = [];
    const face = [[x0, y0], [x0 + L, y0], [x0 + L, y0 + H], [x0, y0 + H]];
    const dessus = [[x0, y0], [x0 + L, y0], [x0 + L + dx, y0 + dy], [x0 + dx, y0 + dy]];
    const bout = [[x0 + L, y0], [x0 + L + dx, y0 + dy], [x0 + L + dx, y0 + H + dy], [x0 + L, y0 + H]];
    [face, dessus, bout].forEach(p => o.push(h.chemin(p, h.a.blanc, true)));
    o.push(...cernes(x0 + L, y0, [dx, dy], [0, H], 0.42, 0.62, 0.62, [0.12, 0.3, 0.5, 0.72, 0.95]));
    if (!biais) {
      [0.2, 0.41, 0.6, 0.8].forEach((v, i) => o.push(fil(x0, y0 + v * H, x0 + L, y0 + v * H, i % 2 ? 1.4 : -1.2)));
      [0.35, 0.7].forEach(u => o.push(fil(x0 + u * dx, y0 + u * dy, x0 + L + u * dx, y0 + u * dy, 0.8)));
    } else {
      fibresBiais(x0, y0, L, H, biais).forEach(({ xa, ya, xb, yb, sort }, i) => {
        o.push(fil(xa, ya, xb, yb, i % 2 ? 2.2 : -1.8));
        // La fibre ressort par le chant et le traverse.
        if (sort) o.push(fil(xb, y0, xb + dx + 6, y0 + dy, 0.4));
      });
    }
    [dessus, bout].forEach(p => o.push(h.chemin(p, h.a.arete, true)));
    o.push(h.chemin([[x0, y0 + H], [x0, y0], [x0 + dx, y0 + dy], [x0 + L + dx, y0 + dy], [x0 + L + dx, y0 + H + dy], [x0 + L, y0 + H]], h.a.contour, true));
    return o.join('\n');
  }

  // Géométrie commune des deux vues de la pièce.
  const pc = z => {
    const L = Math.min(250, z.l - 70), H = 58, dx = 36, dy = -24;
    const x0 = (z.l - L - dx) / 2, y0 = (z.h - H + dy) / 2 - dy;
    return { L, H, dx, dy, x0, y0 };
  };

  // La cheville de profil : pointe courte à droite, bout franc à gauche.
  const T = 9;                                     // demi-épaisseur de la cheville au dessin
  const contourCheville = (a, b, y) =>
    [[a, y - T], [b - 13, y - T], [b, y - 4], [b, y + 4], [b - 13, y + T], [a, y + T]];

  // Géométrie commune des deux vues de la cheville.
  const cg = z => {
    const R = Math.min(52, z.h / 2 - 32);
    const by = z.h / 2 + 2, bx = 18 + R;
    const px0 = bx + R + 30, px1 = z.l - 16;
    return { R, by, bx, px0, px1 };
  };

  function buche(bx, by, R) {
    const o = [];
    const dir = a => [Math.cos(a), Math.sin(a)];
    for (let q = 0; q < 4; q++) {
      const a0 = (q * Math.PI) / 2, a1 = a0 + Math.PI / 2, am = a0 + Math.PI / 4;
      const c = [bx + 5 * Math.cos(am), by + 5 * Math.sin(am)];
      const pt = (r, a) => [c[0] + r * dir(a)[0], c[1] + r * dir(a)[1]];
      const sect = `M ${P(...c)} L ${P(...pt(R, a0))} A ${R} ${R} 0 0 1 ${P(...pt(R, a1))} Z`;
      o.push(h.path(sect, h.a.blanc));
      // Cernes.
      [0.28, 0.5, 0.7].forEach(fr => {
        const r = fr * R;
        o.push(h.path(`M ${P(...pt(r, a0 + 0.05))} A ${f(r)} ${f(r)} 0 0 1 ${P(...pt(r, a1 - 0.05))}`, h.a.fin));
      });
      // L'écorce.
      o.push(h.path(`M ${P(...pt(R - 5, a0 + 0.03))} A ${R - 5} ${R - 5} 0 0 1 ${P(...pt(R - 5, a1 - 0.03))}`, h.a.detail));
      // Le quartier refendu en baguettes : une fente sur le rayon, une le long d'un cerne.
      // Chaque fente est ouverte d'un jour blanc, bordé de deux traits, comme entre les quartiers.
      const fentes = `M ${P(...pt(0.2 * R, am))} L ${P(...pt(R + 1, am))} ` +
        `M ${P(...pt(0.5 * R, a0 - 0.02))} A ${f(0.5 * R)} ${f(0.5 * R)} 0 0 1 ${P(...pt(0.5 * R, a1 + 0.02))}`;
      o.push(h.path(sect, h.a.contour));
      o.push(`<path d="${fentes}" fill="none" stroke="#1A1A1A" stroke-width="5.8"/>`);
      o.push(`<path d="${fentes}" fill="none" stroke="#FFFFFF" stroke-width="3.8"/>`);
    }
    return o.join('\n');
  }

  // Coupe d'un poteau tenonné dans une lisse, le long de la lisse. perce : mortaise traversante.
  function joint(z, perce) {
    const cx = z.l / 2;
    const ys = Math.round(z.h * 0.5), HS = 72;     // dessus de la lisse, hauteur de la lisse
    const XL = 18, XR = z.l - 18, ym = ys + HS / 2;
    const PW = 36, TW = 13, J = 6, TL = 32;        // poteau, tenon, jeu de chaque côté, longueur
    const MD = perce ? HS : 50;                    // profondeur de la mortaise
    const yt = 30;                                 // coupe du haut du poteau
    const ml = cx - TW - J, mr = cx + TW + J;
    const o = [];
    const cassV = (x, sens) => sens > 0
      ? `V ${ym - 10} L ${x - 8} ${ym - 3} L ${x + 8} ${ym + 3} L ${x} ${ym + 10} V ${ys + HS}`
      : `V ${ym + 10} L ${x + 8} ${ym + 3} L ${x - 8} ${ym - 3} L ${x} ${ym - 10} V ${ys}`;
    // La lisse.
    let lisse;
    if (perce) {
      lisse = `M ${XL} ${ys} H ${ml} V ${ys + HS} H ${XL} ${cassV(XL, -1)} Z ` +
              `M ${mr} ${ys} H ${XR} ${cassV(XR, 1)} H ${mr} Z`;
    } else {
      lisse = `M ${XL} ${ys} H ${ml} V ${ys + MD} H ${mr} V ${ys} H ${XR} ${cassV(XR, 1)} H ${XL} ${cassV(XL, -1)} Z`;
    }
    o.push(h.path(lisse, h.a.blanc));
    [[ys + 13, 1], [ys + 28, -1], [ys + 45, 1], [ys + 60, -1]].forEach(([y, s]) => {
      if (y < ys + MD + 4) {
        o.push(fil(XL + 10, y, ml - 8, y, s));
        o.push(fil(mr + 8, y, XR - 12, y, -s));
      } else {
        o.push(fil(XL + 10, y, XR - 12, y, s * 1.5));
      }
    });
    // Mortaise traversante : au-delà du plan de coupe, on voit la joue du fond, fil continu.
    // L'eau restée au fond de la mortaise borgne.
    const yw = ys + TL - 7;
    if (!perce) {
      const eau = `M ${ml} ${yw} V ${ys + MD} H ${mr} V ${yw} H ${cx + TW} V ${ys + TL} H ${cx - TW} V ${yw} Z`;
      o.push(h.path(eau, h.a.hachure('eau', 'fin')));
      o.push(h.ligne(ml, yw, cx - TW, yw, h.a.detail));
      o.push(h.ligne(cx + TW, yw, mr, yw, h.a.detail));
    }
    // Le poteau et son tenon.
    const poteau = `M ${cx - PW} ${yt} V ${ys} H ${cx - TW} V ${ys + TL} H ${cx + TW} V ${ys} H ${cx + PW} V ${yt} ` +
                   `H ${cx + 10} L ${cx + 4} ${yt - 7} L ${cx - 4} ${yt + 7} L ${cx - 10} ${yt} Z`;
    o.push(h.path(poteau, h.a.blanc));
    [[cx - 25, yt + 12, ys - 6], [cx - 5, yt + 20, ys + TL - 5], [cx + 6, yt + 9, ys + TL - 8], [cx + 24, yt + 16, ys - 8]]
      .forEach(([x, a, b], i) => o.push(fil(x, a, x, b, i % 2 ? 1.2 : -1.2)));
    // Silhouettes.
    if (perce) {
      o.push(h.path(`M ${ml} ${ys + HS} H ${XL} M ${XL} ${ys} H ${ml} V ${ys + HS} M ${mr} ${ys + HS} V ${ys} H ${XR} M ${XR} ${ys + HS} H ${mr}`, h.a.contour));
    } else {
      o.push(h.path(`M ${XL} ${ys} H ${ml} V ${ys + MD} H ${mr} V ${ys} H ${XR} M ${XR} ${ys + HS} H ${XL}`, h.a.contour));
    }
    o.push(h.path(`M ${XL} ${ys} ${cassV(XL, 1)} M ${XR} ${ys} ${cassV(XR, 1)}`, h.a.arete));
    o.push(h.path(`M ${cx - PW} ${yt} V ${ys} H ${cx - TW} V ${ys + TL} H ${cx + TW} V ${ys} H ${cx + PW} V ${yt}`, h.a.contour));
    o.push(h.path(`M ${cx + PW} ${yt} H ${cx + 10} L ${cx + 4} ${yt - 7} L ${cx - 4} ${yt + 7} L ${cx - 10} ${yt} H ${cx - PW}`, h.a.arete));
    // La pluie, le ruissellement le long du poteau, l'eau qui descend dans le jeu du tenon.
    const xg = cx - PW - 16;
    [[xg - 12, yt - 12], [xg + 2, yt + 6], [xg - 8, yt + 26], [cx + PW + 20, yt - 4], [cx + PW + 30, yt + 20], [cx + PW + 14, yt + 40]]
      .forEach(([x, y]) => o.push(goutte(x, y)));
    [-1, 1].forEach(c => {
      // Une seule flèche par côté : le long du poteau, le long du joint épaulement-lisse, dans le jeu.
      const xj = cx + c * (TW + J / 2), xo = cx + c * (PW + 6), yj = ys + 4;
      const ch = `M ${xo} ${yt + 50} V ${yj - 4} Q ${xo} ${yj} ${xo - c * 4} ${yj} H ${xj + c * 4} Q ${xj} ${yj} ${xj} ${yj + 4}`;
      if (perce) {
        o.push(h.fleche(`${ch} V ${ys + HS + 8}`, h.a.cache));
        [[xj, ys + HS + 24], [xj + c, ys + HS + 42]].forEach(([x, y]) => o.push(goutte(x, y)));
      } else {
        o.push(h.fleche(`${ch} V ${yw + 6}`, h.a.cache));
      }
    });
    return o.join('\n');
  }

  return {
    ref: '110-40',
    titre: 'Lire le fil du bois',
    desc: 'Trois paires, bon à gauche, raté à droite. La pièce : le fil court d’un bout à l’autre, ou il monte en biais et ressort par le chant. La cheville : fendue d’une bûche de bouleau en quartiers puis en baguettes, le fil suit la cheville d’un bout à l’autre ; sciée dans une planche au fil en biais, le fil la traverse et elle casse net le long d’une fibre. Le joint, en coupe : la pluie ruisselle le long du poteau et descend dans le jeu du tenon ; dans une mortaise borgne ouverte vers le haut, l’eau reste au fond sous le tenon ; percée de part en part, elle s’égoutte par-dessous.',
    format: 'pleine',
    disposition: [['bouts', 'chant'], ['fendue', 'sciee'], ['godet', 'egoutte']],
    hauteurs: [2, 2.3, 3.2],
    vues: {
      bouts: {
        titre: 'La pièce à garder',
        dessin: z => { const g = pc(z); return piece(g.x0, g.y0, g.L, g.H, g.dx, g.dy, 0); },
        renvois: z => {
          const g = pc(z);
          return [
            { n: 1, rond: [g.x0 + g.L - 30, g.y0 + g.H + 16], cible: [g.x0 + g.L - 2, g.y0 + 0.6 * g.H], texte: 'fil d’un bout à l’autre' },
          ];
        },
      },
      chant: {
        titre: 'La pièce au chauffage',
        dessin: z => { const g = pc(z); return piece(g.x0, g.y0, g.L, g.H, g.dx, g.dy, RUN); },
        renvois: z => {
          const g = pc(z);
          const s = fibresBiais(g.x0, g.y0, g.L, g.H, RUN).filter(q => q.sort)
            .sort((p, q) => Math.abs(p.xb - g.x0 - 0.5 * g.L) - Math.abs(q.xb - g.x0 - 0.5 * g.L))[0];
          return [
            { n: 2, rond: [s.xb - 44, g.y0 + g.dy - 16], cible: [s.xb, g.y0], texte: 'fil qui ressort par le chant' },
          ];
        },
      },
      fendue: {
        titre: 'La cheville fendue',
        dessin: z => {
          const g = cg(z), o = [buche(g.bx, g.by, g.R)];
          const c = contourCheville(g.px0, g.px1, g.by);
          o.push(h.chemin(c, h.a.blanc, true));
          [-4.5, 0, 4.5].forEach((d, i) => {
            const xb = d === 0 ? g.px1 - 1 : g.px1 - 13 + Math.abs(d) * 0.4;
            o.push(fil(g.px0 + 1, g.by + d, xb, g.by + d * (d === 0 ? 1 : 0.9), i === 1 ? 0.6 : 0.9));
          });
          o.push(h.ligne(g.px1 - 13, g.by - T, g.px1 - 13, g.by + T, h.a.fin));
          o.push(h.chemin(c, h.a.contour, true));
          o.push(h.fleche(`M ${g.bx + g.R + 8} ${g.by} H ${g.px0 - 8}`, h.a.detail));
          return o.join('\n');
        },
        renvois: z => {
          const g = cg(z);
          const a = Math.PI / 4 + Math.PI / 2;                 // le quartier du bas à gauche
          return [
            { n: 3, rond: [14, z.h - 14], cible: [g.bx + 5 * Math.cos(a) + 0.78 * g.R * Math.cos(a), g.by + 5 * Math.sin(a) + 0.78 * g.R * Math.sin(a)], texte: 'quartiers, puis baguettes' },
            { n: 4, rond: [(g.px0 + g.px1) / 2 - 20, g.by - 40], cible: [(g.px0 + g.px1) / 2 - 20, g.by - 4.5], texte: 'fil sur toute la longueur' },
            { n: 5, rond: [g.px1 - 8, g.by + 40], cible: [g.px1 - 5, g.by + 6.5], texte: 'pointe courte' },
          ];
        },
      },
      sciee: {
        titre: 'La cheville sciée',
        dessin: z => {
          const g = cg(z), o = [];
          const K = 0.5;                                    // pente du fil de la planche
          // La planche au fil en biais, et les deux traits de scie parallèles à ses rives.
          const x0 = 14, W = g.px0 - 30 - x0, H0 = 2 * g.R - 14, y0 = g.by - H0 / 2 + 6, dx = 14, dy = -10;
          const face = [[x0, y0], [x0 + W, y0], [x0 + W, y0 + H0], [x0, y0 + H0]];
          const dessus = [[x0, y0], [x0 + W, y0], [x0 + W + dx, y0 + dy], [x0 + dx, y0 + dy]];
          const bout = [[x0 + W, y0], [x0 + W + dx, y0 + dy], [x0 + W + dx, y0 + H0 + dy], [x0 + W, y0 + H0]];
          [face, dessus, bout].forEach(p => o.push(h.chemin(p, h.a.blanc, true)));
          fibresBiais(x0, y0, W, H0, H0 / K).forEach(({ xa, ya, xb, yb }, i) => o.push(fil(xa, ya, xb, yb, i % 2 ? 1.6 : -1.3)));
          [g.by - T, g.by + T].forEach(y => o.push(h.ligne(x0 - 6, y, x0 + W + 6, y, h.a.cache)));
          [dessus, bout].forEach(p => o.push(h.chemin(p, h.a.arete, true)));
          o.push(h.chemin([[x0, y0 + H0], [x0, y0], [x0 + dx, y0 + dy], [x0 + W + dx, y0 + dy], [x0 + W + dx, y0 + H0 + dy], [x0 + W, y0 + H0]], h.a.contour, true));
          // La cheville tirée de ce trait de scie, cassée net le long d'une fibre : la cassure
          // part du chant du bas en xf et monte avec le fil jusqu'au chant du haut.
          const a = g.px0, b = g.px1, y = g.by, run2 = (2 * T) / K, xf = a + 0.3 * (b - a);
          const A = [[a, y - T], [xf + run2, y - T], [xf, y + T], [a, y + T]];
          const B = [[xf + run2, y - T], [b - 13, y - T], [b, y - 4], [b, y + 4], [b - 13, y + T], [xf, y + T]];
          const fibre = (s, x1, x2, i) => {
            const xa = Math.max(x1, s), xb = Math.min(x2, s + run2);
            return xb - xa > 3 ? fil(xa, y + T - (xa - s) * K, xb, y + T - (xb - s) * K, i % 2 ? 0.7 : -0.6) : '';
          };
          o.push(h.chemin(A, h.a.blanc, true));
          for (let s = xf - 19, i = 0; s > a - run2 + 3; s -= ECARTS[i] * 0.6, i++) o.push(fibre(s, a, b, i));
          o.push(h.chemin(A, h.a.contour, true));
          const g2 = [`<g transform="translate(12 3)">`];
          g2.push(h.chemin(B, h.a.blanc, true));
          for (let s = xf + 18, i = 3; s < b - 16; s += ECARTS[i] * 0.6, i++) g2.push(fibre(s, a, b - 13, i));
          g2.push(h.ligne(b - 13, y - T, b - 13, y + T, h.a.fin));
          g2.push(h.chemin(B, h.a.contour, true));
          g2.push('</g>');
          o.push(g2.join('\n'));
          return o.join('\n');
        },
        renvois: z => {
          const g = cg(z);
          const x0 = 14;
          const run2 = (2 * T) / 0.5, xf = g.px0 + 0.3 * (g.px1 - g.px0);
          return [
            { n: 6, rond: [14, z.h - 14], cible: [x0 + 30, g.by + T], texte: 'trait de scie, fil en biais' },
            { n: 7, rond: [xf + run2 / 2 - 30, g.by - 40], cible: [xf + run2 / 2 - 1, g.by - 1], texte: 'cassée net le long du fil' },
          ];
        },
      },
      godet: {
        titre: 'Mortaise borgne ouverte vers le haut',
        dessin: z => joint(z, false),
        renvois: z => {
          const cx = z.l / 2, ys = Math.round(z.h * 0.5);
          return [
            { n: 8, rond: [cx + 78, ys - 34], cible: [cx + 16, ys + 12], texte: 'jeu du tenon : l’eau descend' },
            { n: 9, rond: [cx + 70, ys + 104], cible: [cx + 12, ys + 44], texte: 'l’eau stagne : le joint pourrit' },
          ];
        },
      },
      egoutte: {
        titre: 'Percée de part en part',
        dessin: z => joint(z, true),
        renvois: z => {
          const cx = z.l / 2, ys = Math.round(z.h * 0.5);
          return [
            { n: 10, rond: [cx + 62, ys + 104], cible: [cx + 21, ys + 94], texte: 'l’eau s’égoutte par-dessous' },
          ];
        },
      },
    },
  };
};
