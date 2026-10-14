// Planche 87-08a — La perche, les fourches et la crémaillère. Chapitre 14, « Dehors : le foyer
// et ce qui remplace le bouton » : feu long et bas, cuire sur les braises, mur de bûches vertes
// ou de neige tassée côté vent, crémaillère taillée dans une branche fourchue, écorcée, crans sur
// la face intérieure, pendue à une perche posée dans deux fourches plantées, bois vert seulement.
// La charte : la perche et la crémaillère au contour fort (le chaudron l'avait déjà) ; le mur de
// bûches derrière le feu et la fourche du fond en gris loin ; le flanc droit de chaque chaudron à
// l'ombre. Le rouge : soulever pour changer de cran (le geste), le dessus du cran qui porte sur la
// perche (le point à vérifier), les braises qu'on tire du bout (le geste, vu de dessus).
module.exports = (h) => {
  const W = t => t.replace('fill="none"', 'fill="#ffffff"');
  const GL = t => t.replace('fill="none"', 'fill="#E6E6E6"');
  // un bâton de (x1, y1) à (x2, y2), largeur w1 puis w2
  const baton = (x1, y1, x2, y2, w1, w2 = w1, tr = h.a.arete) => {
    const L = Math.hypot(x2 - x1, y2 - y1), nx = -(y2 - y1) / L, ny = (x2 - x1) / L;
    return h.chemin([[x1 + nx * w1 / 2, y1 + ny * w1 / 2], [x2 + nx * w2 / 2, y2 + ny * w2 / 2],
      [x2 - nx * w2 / 2, y2 - ny * w2 / 2], [x1 - nx * w1 / 2, y1 - ny * w1 / 2]], W(tr), true);
  };
  // une fourche plantée : pieu, deux bras, enfourchure en cy
  const fourche = (x, yb, yj, cy, yt, ecart, tr = h.a.arete, fond = W) => h.chemin([
    [x - 5.5, yb], [x - 5, yj], [x - ecart - 3.2, yt], [x - ecart + 3.2, yt], [x, cy],
    [x + ecart - 3.2, yt], [x + ecart + 3.2, yt], [x + 5, yj], [x + 5.5, yb]], fond(tr), true);
  // la crémaillère de profil : face droite en fx, crans (dessus à plat, dessous en biais)
  const cremaillere = (fx, w, yh, yb, crans, d, hb, fd, tr = h.a.arete) => {
    const pts = [[fx - w, yh], [fx, yh]];
    for (const yr of [...crans].sort((a, b) => a - b)) pts.push([fx, yr], [fx - d, yr], [fx - d, yr + hb], [fx, yr + hb + fd]);
    pts.push([fx, yb], [fx - w, yb]);
    return h.chemin(pts, W(tr), true);
  };
  const braises = (x0, x1, y, rangs = 2, s = 1) => {
    const out = [];
    for (let r = rangs - 1; r >= 0; r--) {
      let k = r * 3;
      for (let x = x0 + (r % 2) * 5 * s; x <= x1; x += 10 * s) {
        k++;
        const rx = (4 + (k * 7) % 3) * s, ry = (2.4 + ((k * 5) % 3) * 0.5) * s;
        out.push(h.ellipse(x, y - ry - r * 4.5 * s, rx, ry, W(h.a.detail)));
      }
    }
    return out.join('\n');
  };
  const flamme = (x, y, ht) => h.path(`M ${x} ${y} C ${x - ht * 0.35} ${y - ht * 0.3} ${x - ht * 0.1} ${y - ht * 0.7} ${x + ht * 0.05} ${y - ht} C ${x + ht * 0.12} ${y - ht * 0.6} ${x + ht * 0.38} ${y - ht * 0.35} ${x} ${y} Z`, W(h.a.detail));
  // un chaudron pendu : fond en yb, anse qui monte jusqu'en (hx, hy). L'anse passe en travers de
  // la fourche du crochet : quand on voit la fourche à plat, on voit l'anse par la tranche
  // (champ = true), une seule oreille devant et l'anse droite jusqu'au creux du crochet.
  const chaudron = (cx, yb, w, ht, hx, hy, champ = false) => {
    const yr = yb - ht, a = w / 2;
    const d = `M ${cx - a} ${yr} C ${cx - a - w * 0.06} ${yr + ht * 0.55} ${cx - w * 0.36} ${yb} ${cx} ${yb} C ${cx + w * 0.36} ${yb} ${cx + a + w * 0.06} ${yr + ht * 0.55} ${cx + a} ${yr} Z`;
    // le fond blanc, le flanc droit à l'ombre (lumière en haut à gauche), puis le contour par-dessus
    const ombre = h.path(`M ${cx + a} ${yr} C ${cx + a + w * 0.06} ${yr + ht * 0.55} ${cx + w * 0.36} ${yb} ${cx} ${yb} C ${cx + w * 0.24} ${yb - ht * 0.14} ${cx + a - w * 0.1} ${yr + ht * 0.5} ${cx + a - w * 0.1} ${yr} Z`, h.a.ombre);
    const corps = [h.path(d, h.a.blanc), ombre, h.path(d, h.a.contour)].join('\n');
    if (champ) return [corps, h.rect(cx - a - 3, yr - 4, w + 6, 4, W(h.a.arete)),
      h.ligne(cx, yr + 4, hx, hy, h.a.arete), h.cercle(cx, yr + 4, 2.2, W(h.a.detail))].join('\n');
    return [
      h.path(`M ${cx - a - 1} ${yr + 4} Q ${(cx - a + hx) / 2 - 4} ${(yr + hy) / 2} ${hx} ${hy} Q ${(cx + a + hx) / 2 + 4} ${(yr + hy) / 2} ${cx + a + 1} ${yr + 4}`, h.a.arete),
      corps,
      h.rect(cx - a - 3, yr - 4, w + 6, 4, W(h.a.arete)),
      h.cercle(cx - a - 1, yr + 4, 2.2, W(h.a.detail)), h.cercle(cx + a + 1, yr + 4, 2.2, W(h.a.detail)),
    ].join('\n');
  };
  const sol = (z, g) => [
    h.rect(0, g, z.l, z.h - g - 2, h.a.hachure('terre', 'aucun')),
    h.ligne(0, g, z.l, g, h.a.contour),
  ].join('\n');
  const pieuEnTerre = (x, g, p = 12) => h.chemin([[x - 5.5, g], [x - 5.5, g + p], [x, g + p + 6], [x + 5.5, g + p], [x + 5.5, g]], W(h.a.arete));

  const COUPE = `${h.a.arete} stroke-dasharray="4 3"`;
  const POT = 76, POTH = 46;           // le chaudron de fonte, même taille dans les deux vues
  const HAUT_CROCHET = 116;            // du sol au crochet de la crémaillère
  const FOND = 26;                     // du sol au fond du chaudron

  return {
    ref: '87-08a',
    titre: 'La perche, les fourches et la crémaillère',
    desc: 'Cuisine sur feu ouvert. De face : deux fourches plantées, une perche de bois vert posée dans leurs enfourchures, une crémaillère pendue par un cran et un crochet plus court, pendu par un seul cran, chaque chaudron pendu à son crochet au-dessus d’un feu long et bas, un mur de bûches derrière le feu. En travers, à la crémaillère : la perche assise dans un cran de la face intérieure, le crochet du bas qui ramène l’anse sous la perche, le mur de bûches côté vent. La crémaillère taillée : branche fourchue coupée sous la fourche, branche courte gardée pour le crochet, tête coupée, ébranchée ras, écorcée, crans du côté du crochet. Un cran grossi : dessus à plat qui porte sur la perche, dessous en biais. Vu de dessus : le mur sur toute la longueur du feu, les braises tirées du bout jusque sous les chaudrons.',
    format: 'pleine',
    disposition: [['elev', 'bout'], ['taille', 'cran', 'plan']],
    hauteurs: [4, 3],
    largeurs: [[23, 10], [5, 4, 6]],
    vues: {
      // ── De face ───────────────────────────────────────────────────────────────────────
      elev: {
        titre: 'De face, au-dessus du feu long',
        dessin: z => {
          const g = z.h - 24, yp = 72, xa = 34, xb = z.l - 34;
          const xc = Math.round(z.l * 0.34), hy = g - HAUT_CROCHET;
          const xk = Math.round(z.l * 0.63), hk = yp + 64;
          const out = [sol(z, g)];
          // le mur de bûches, derrière le feu
          const m0 = 66, m1 = z.l - 66;
          for (let i = 0; i < 3; i++) out.push(h.rect(m0 + (i % 2) * 6, g - 10 * (i + 1), m1 - m0 - 6, 10, GL(h.a.fin)));
          for (const x of [m0 + 10, (m0 + m1) / 2, m1 - 10]) out.push(h.rect(x - 2, g - 38, 4, 38, GL(h.a.fin)));
          // les fourches plantées
          for (const x of [xa, xb]) {
            out.push(pieuEnTerre(x, g));
            out.push(fourche(x, g, yp + 17, yp + 5, yp - 12, 7));
          }
          // la perche, et le bras avant de chaque fourche par-dessus
          out.push(h.rect(12, yp - 5, z.l - 24, 10, W(h.a.contour)));
          for (const x of [xa, xb]) out.push(baton(x, yp + 5, x + 7, yp - 12, 6));
          // le feu long et bas : braises, et le bout qui brûle encore
          out.push(braises(88, z.l - 124, g, 2));
          const b0 = z.l - 122, b1 = z.l - 66;
          out.push(h.rect(b0, g - 8, b1 - b0, 8, W(h.a.arete)), h.rect(b0 + 8, g - 15, b1 - b0 - 14, 7, W(h.a.arete)));
          [[b0 + 10, 14], [b0 + 24, 18], [b0 + 38, 13], [b0 + 50, 10]].forEach(([x, t]) => out.push(flamme(x, g - 15, t)));
          // la crémaillère, devant la perche ; ses crans et son crochet sont sur l'autre face,
          // tournés vers la perche : l'anse passe dans le creux du crochet, derrière la tige
          out.push(chaudron(xc, g - FOND, POT, POTH, xc, hy - 1));
          out.push(h.chemin([[xc - 4.5, yp - 58], [xc + 4.5, yp - 58], [xc + 4.5, hy + 10], [xc - 4.5, hy + 10]], W(h.a.contour), true));
          for (let y = yp - 28; y <= yp + 60; y += 22) out.push(h.ligne(xc - 4.5, y, xc + 4.5, y, h.a.cache));
          // le crochet fixe, plus court : un seul cran, sur l'autre face, pris sur la perche
          // (un ergot de branche en haut ouvrirait vers le haut, comme celui du bas : il ne pend à rien)
          out.push(chaudron(xk, hk + 64, 56, 36, xk, hk - 1));
          out.push(h.chemin([[xk - 4, yp - 20], [xk + 4, yp - 20], [xk + 4, hk + 8], [xk - 4, hk + 8]], W(h.a.arete), true));
          out.push(h.ligne(xk - 4, yp - 5, xk + 4, yp - 5, h.a.cache));
          return out.join('\n');
        },
        renvois: z => {
          const g = z.h - 24, yp = 72, xc = Math.round(z.l * 0.34), xk = Math.round(z.l * 0.63);
          return [
            { n: 1, rond: [64, g - 84], cible: [39, g - 84], texte: 'une fourche à chaque bout' },
            { n: 2, rond: [100, 34], cible: [100, yp - 5], texte: 'perche verte, jamais sèche' },
            { n: 3, rond: [xc - 36, yp + 40], cible: [xc - 5, yp + 40], texte: 'la crémaillère, bois vert' },
            { n: 4, rond: [xk + 36, yp + 34], cible: [xk + 5, yp + 34], texte: 'crochet court, moins de feu' },
            { n: 5, rond: [Math.round(z.l * 0.5) + 2, g - 54], cible: [Math.round(z.l * 0.5) + 2, g - 6], texte: 'on cuit sur les braises' },
          ];
        },
      },
      // ── En travers ────────────────────────────────────────────────────────────────────
      bout: {
        titre: 'En travers, à la crémaillère',
        dessin: z => {
          const g = z.h - 24, px = 64, py = 72, r = 6, hy = g - HAUT_CROCHET;
          const fx = px + 0.5, cr0 = py - r;
          const out = [sol(z, g)];
          // la fourche du fond, vue de face
          // la fourche du fond, derrière : gris loin
          out.push(pieuEnTerre(px, g).replace(h.a.arete.split(' ')[2], 'stroke-width="0.7"').replace('fill="#ffffff"', 'fill="#E6E6E6"'));
          out.push(fourche(px, g, py + 26, py + 14, py - 18, 20, h.a.detail, GL));
          // le mur de bûches côté vent, en coupe, tenu par deux piquets
          const wx = z.l - 42;
          for (const x of [wx - 9, wx + 9]) out.push(h.rect(x - 2, g - 38, 4, 46, W(h.a.arete)));
          for (let i = 0; i < 3; i++) out.push(h.cercle(wx, g - 5.5 - 11 * i, 5.5, h.a.hachure('bois')));
          [g - 12, g - 26].forEach(y => out.push(h.fleche(`M ${z.l - 4} ${y} L ${wx + 15} ${y}`)));
          // les braises
          out.push(braises(px - 32, px + 32, g, 2));
          // la crémaillère, de profil, la perche dans un cran
          const crans = [cr0 - 44, cr0 - 22, cr0, cr0 + 26, cr0 + 48, cr0 + 70];
          out.push(baton(fx - 3, hy + 8, fx + 9, hy - 8, 7));
          out.push(cremaillere(fx, 11, py - 58, hy + 12, crans, 6.5, 12, 5, h.a.contour));
          out.push(h.cercle(px, py, r, h.a.hachure('bois')));
          // l'anse, vue par la tranche, monte droit au creux du crochet, sous la perche
          out.push(chaudron(fx + 1.5, g - FOND, POT, POTH, fx + 1.5, hy - 1, true));
          return out.join('\n');
        },
        renvois: z => {
          const g = z.h - 24, px = 64, py = 72, hy = g - HAUT_CROCHET, wx = z.l - 42;
          return [
            { n: 6, rond: [px + 34, py + 30], cible: [px - 2, py + 26], texte: 'crans face à la perche' },
            { n: 7, rond: [px + 44, hy - 18], cible: [px + 8, hy - 5], texte: 'le crochet prend l’anse' },
            { n: 8, rond: [wx + 4, g - 66], cible: [wx, g - 27], texte: 'bûches vertes ou neige' },
          ];
        },
      },
      // ── La crémaillère taillée ────────────────────────────────────────────────────────
      taille: {
        titre: 'La crémaillère, où couper',
        dessin: z => {
          const out = [];
          const yJ = z.h - 46, yB = yJ + 12, yT = 26;
          const ang = 0.62, lb = 58;            // la branche courte, penchée vers la droite
          const ux = Math.sin(ang), uy = -Math.cos(ang);
          // la branche brute
          const x = 52;
          out.push(baton(x, yJ - 2, x + ux * lb, yJ + uy * lb - 2, 8, 5));
          [[x, 62, -1], [x, 104, 1], [x, 38, 1]].forEach(([bx, by, s]) => out.push(baton(bx + s * 3, by, bx + s * 14, by - 10, 3, 2)));
          out.push(baton(x, z.h - 6, x, 8, 12, 5));
          for (let y = 16, i = 0; y < z.h - 10; y += 11, i++) out.push(h.ligne(x + (i % 2 ? 0.5 : -3.5), y, x + (i % 2 ? 3.5 : -0.5), y, h.a.fin));
          // les traits de coupe
          out.push(h.ligne(x - 14, yB, x + 14, yB, COUPE));
          out.push(h.ligne(x - 13, yT, x + 13, yT, COUPE));
          const cx = x + ux * 20, cy = yJ - 2 + uy * 20;
          out.push(h.ligne(cx + uy * 13, cy - ux * 13, cx - uy * 13, cy + ux * 13, COUPE));
          // la crémaillère finie : écorcée, crans du côté du crochet
          const X = z.l - 58, fx = X + 5;
          out.push(baton(X, yJ - 2, X + ux * 20, yJ - 2 + uy * 20, 8, 7));
          out.push(cremaillere(fx, 10, yT, yB, [42, 64, 86, 108], 4.5, 8, 4, h.a.contour));
          for (const dx of [-7, -3]) out.push(h.ligne(fx + dx, yT + 4, fx + dx, yB - 4, h.a.fin));
          out.push(h.fleche(`M ${x + 22} ${z.h / 2 - 20} L ${X - 22} ${z.h / 2 - 20}`, h.a.detail));
          return out.join('\n');
        },
        renvois: z => {
          const yJ = z.h - 46, yB = yJ + 12, x = 52, X = z.l - 58;
          const cx = x + Math.sin(0.62) * 20, cy = yJ - 2 - Math.cos(0.62) * 20;
          return [
            { n: 9, rond: [20, yB + 14], cible: [x - 7, yB], texte: 'couper sous la fourche' },
            { n: 10, rond: [x + 50, yJ + 18], cible: [cx + 4, cy + 3], texte: 'branche courte : le crochet' },
            { n: 11, rond: [20, 30], cible: [x - 5, 26], texte: 'couper la tête, ébrancher ras' },
            { n: 12, rond: [z.l - 20, 60], cible: [X + 4, 70], texte: 'écorcer, crans côté crochet' },
          ];
        },
      },
      // ── Un cran, grossi ───────────────────────────────────────────────────────────────
      cran: {
        titre: 'Un cran, grossi',
        dessin: z => {
          const out = [];
          const fx = 70, w = 34, d = 16, r = 15, hb = 30, fd = 12;
          const yr = Math.round(z.h * 0.42), cx = fx - d + r, cy = yr + r;
          out.push(cremaillere(fx, w, 6, z.h - 6, [yr - 70, yr, yr + 72], d, hb, fd, h.a.contour));
          for (const dx of [-26, -17, -8]) out.push(h.ligne(fx + dx, 12, fx + dx, z.h - 12, h.a.fin));
          out.push(h.cercle(cx, cy, r, h.a.hachure('bois')));
          // le geste : soulever la crémaillère pour changer de cran
          out.push(h.geste(`M 16 ${yr + 40} L 16 ${yr - 14}`));
          // le point à vérifier : le dessus à plat qui porte sur la perche
          out.push(h.controle(fx - 8, yr, 12));
          return out.join('\n');
        },
        renvois: z => {
          const fx = 70, d = 16, hb = 30, fd = 12, yr = Math.round(z.h * 0.42);
          return [
            { n: 13, rond: [fx + 34, yr - 26], cible: [fx - 8, yr], texte: 'dessus à plat, sur la perche' },
            { n: 14, rond: [fx + 34, yr + 62], cible: [fx - 4, yr + hb + fd * 0.75], texte: 'dessous en biais' },
            { n: 15, rond: [16, yr - 42], cible: [16, yr - 16], texte: 'soulever, changer de cran' },
          ];
        },
      },
      // ── Vu de dessus ──────────────────────────────────────────────────────────────────
      plan: {
        titre: 'Vu de dessus',
        dessin: z => {
          const out = [];
          const yc = Math.round(z.h * 0.62), xa = 20, xb = z.l - 20;
          const xc = Math.round(z.l * 0.34), xk = Math.round(z.l * 0.63);
          // le mur, côté vent
          out.push(h.rect(34, yc - 38, z.l - 68, 9, W(h.a.arete)), h.ligne(38, yc - 33.5, z.l - 38, yc - 33.5, h.a.fin));
          for (const x of [44, z.l / 2, z.l - 44]) for (const y of [yc - 41, yc - 26]) out.push(h.cercle(x, y, 2.2, W(h.a.detail)));
          for (const x of [z.l * 0.25, z.l * 0.5, z.l * 0.75]) out.push(h.fleche(`M ${x} 10 L ${x} ${yc - 50}`));
          // le feu long : braises, et le bout qui brûle
          out.push(braises(46, z.l - 66, yc + 16, 5, 0.9));
          out.push(h.rect(z.l - 78, yc - 7, 36, 6, W(h.a.arete)), h.rect(z.l - 74, yc + 1, 34, 6, W(h.a.arete)));
          out.push(h.geste(`M ${z.l - 46} ${yc + 28} L ${xk - 12} ${yc + 28}`));
          // les chaudrons, sous la perche
          out.push(h.cercle(xc, yc, POT / 2 * 0.52, W(h.a.contour)), h.cercle(xc, yc, POT / 2 * 0.52 - 3, h.a.fin));
          out.push(h.cercle(xk, yc, 14, W(h.a.contour)), h.cercle(xk, yc, 11, h.a.fin));
          // les fourches, la perche, les deux crochets
          for (const x of [xa, xb]) out.push(h.rect(x - 2.5, yc - 10, 5, 20, W(h.a.arete)));
          out.push(h.rect(8, yc - 3.5, z.l - 16, 7, W(h.a.arete)));
          return out.join('\n');
        },
        renvois: z => {
          const yc = Math.round(z.h * 0.62);
          return [
            { n: 16, rond: [z.l - 20, yc - 62], cible: [z.l - 40, yc - 38], texte: 'mur sur toute la longueur' },
            { n: 17, rond: [z.l - 34, yc + 56], cible: [z.l - 54, yc + 28], texte: 'braises tirées du bout' },
          ];
        },
      },
    },
  };
};
