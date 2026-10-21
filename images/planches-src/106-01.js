// Planche 106-01 — La géométrie d'abattage.
// Chapitre 83, étapes 15, 16 et 17 (entaille de direction, trait d'abattage, charnière),
// et le tableau de contrôle (≥ 1/3 du diamètre, ≥ 45°, ≈ 1/10 du diamètre, ≥ 2,5 cm).

module.exports = (h) => {
  const f = (n) => Math.round(n * 10) / 10;
  const rad = (d) => d * Math.PI / 180;
  const tiretFin = h.a.fin + ' stroke-dasharray="3 3"';
  // Cote à traits obliques à 45° aux deux bouts, les mêmes pour les quatre cotes de la coupe.
  const cote45 = (x1, y1, x2, y2, s, o = {}) => {
    const horiz = Math.abs(x2 - x1) >= Math.abs(y2 - y1), k = 6;
    // (en <path> : le vérificateur prenait ces traits de cote à 45° pour des hachures à la main)
    const ob = (x, y) => h.path(`M${f(x - k)} ${f(y + k)} L${f(x + k)} ${f(y - k)}`, h.a.detail);
    const out = [h.ligne(x1, y1, x2, y2, h.a.detail), ob(x1, y1), ob(x2, y2)];
    if (horiz) out.push(h.texte((x1 + x2) / 2, (y1 + y2) / 2 + (o.cote === 'dessous' ? 16 : -6), s, { lisere: true }));
    else out.push(h.texte((x1 + x2) / 2 + 12, (y1 + y2) / 2 + 4, s, { lisere: true, ancre: 'start' }));
    return out.join('\n');
  };

  // Géométrie de la coupe, calculée d'après la taille de la vue. L'arbre tombe vers la gauche.
  const geoCoupe = (z) => {
    const D = Math.min(Math.round(z.l * 0.52), 220);
    const xL = Math.round((z.l - D) / 2) + 6, xR = xL + D;
    const yb = Math.round(z.h * 0.60);             // plancher de l'entaille
    const d3 = D / 3, xA = xL + d3;                 // pointe de l'entaille
    const xB = xA + D / 10;                         // bout du trait d'abattage
    const s = 18;                                   // marche : le trait est plus haut que le plancher
    const ang = 52;                                 // ouverture dessinée, un peu plus que le minimum
    const yH = yb - d3 * Math.tan(rad(ang));        // coin haut de l'entaille, sur l'écorce
    const yg = z.h - 20;                            // sol
    return { D, xL, xR, yb, xA, xB, s, ang, yH, yg };
  };

  // Géométrie du plan : la souche vue de dessus, même orientation (chute vers la gauche).
  const geoPlan = (z) => {
    const R = Math.round(Math.min(z.l * 0.34, z.h * 0.38));
    const cx = Math.round(z.l / 2) + 22, cy = Math.round(z.h / 2) - 4;
    const xA = cx - R + 2 * R / 3, xB = xA + 2 * R / 10;
    const yc = (x) => Math.sqrt(R * R - (x - cx) * (x - cx));
    return { R, cx, cy, xA, xB, yc };
  };

  return {
    ref: '106-01',
    titre: 'La géométrie d’abattage',
    desc: 'À gauche, le pied d’un arbre coupé dans l’axe de chute, l’arbre tombant vers la gauche : ' +
      'l’entaille de direction du côté de la chute, un trait horizontal et un trait oblique qui se ' +
      'rejoignent à la pointe, profonde d’au moins le tiers du diamètre et ouverte d’au moins 45 degrés ; ' +
      'du côté opposé, le trait d’abattage, horizontal, plus haut d’au moins 25 mm que le plancher de ' +
      'l’entaille, arrêté avant la pointe ; entre les deux, la charnière, environ un dixième du diamètre, ' +
      'hachurée. À droite, la souche vue de dessus au niveau des traits : la charnière est une bande de ' +
      'même épaisseur d’un bord à l’autre du tronc, et l’arbre tombe d’équerre avec elle, du côté de l’entaille.',
    format: 'demi',
    disposition: [['coupe', 'plan']],
    largeurs: [[2, 1]],
    vues: {
      coupe: {
        titre: 'En coupe, dans l’axe de chute',
        dessin: (z) => {
          const g = geoCoupe(z);
          const { D, xL, xR, yb, xA, xB, s, ang, yH, yg } = g;
          const out = [];
          const top = 8, ev = 6;                    // haut du tronc rompu, épaisseur d'écorce

          // Sol.
          out.push(h.rect(0, yg, z.l, z.h - yg, h.a.hachure('terre', 'aucun')));
          out.push(h.ligne(0, yg, xL - 24, yg, h.a.arete), h.ligne(xR + 24, yg, z.l, yg, h.a.arete));

          // Écorce, en trait fin à l'intérieur du contour.
          out.push(h.ligne(xL + ev, top + 4, xL + ev, yH + 6, h.a.fin));
          out.push(h.ligne(xL + ev, yb + 1, xL + ev, yg - 26, h.a.fin));
          out.push(h.ligne(xR - ev, top + 4, xR - ev, yb - s - 1, h.a.fin));
          out.push(h.ligne(xR - ev, yb - s + 1, xR - ev, yg - 26, h.a.fin));

          // La charnière : le bois qui reste entre la pointe de l'entaille et le bout du trait.
          out.push(h.rect(xA, yb - s, xB - xA, s, h.a.hachure('bois', 'aucun')));

          // Contour du tronc : rupture en haut, entaille à gauche, empattement au pied.
          const rupture = [];
          for (let i = 0; i <= 8; i++) rupture.push([xL + D * i / 8, top + (i % 2 ? -5 : 5)]);
          out.push(h.chemin(rupture, h.a.detail));
          out.push(h.path(
            `M${f(xL)} ${f(top + 5)} L${f(xL)} ${f(yH)} L${f(xA)} ${f(yb)} L${f(xL)} ${f(yb)} ` +
            `L${f(xL)} ${f(yg - 30)} Q${f(xL)} ${f(yg - 6)} ${f(xL - 24)} ${f(yg)}`, h.a.contour));
          out.push(h.path(
            `M${f(xR)} ${f(top + 5)} L${f(xR)} ${f(yg - 30)} Q${f(xR)} ${f(yg - 6)} ${f(xR + 24)} ${f(yg)}`, h.a.contour));

          // Le trait d'abattage : un trait de scie horizontal, arrêté au bout de la charnière.
          out.push(h.ligne(xR, yb - s, xB, yb - s, h.a.contour));

          // Le mouvement : le tronc bascule du côté de l'entaille.
          out.push(h.fleche(`M${f(xL - 8)} ${f(top + 12)} Q${f(xL - 44)} ${f(top + 14)} ${f(xL - 54)} ${f(top + 52)}`));

          // Cote d'ouverture : arc centré sur la pointe, entre le plancher et le trait oblique.
          const r = 36, a2 = rad(180 - ang);
          out.push(h.path(`M${f(xA - r)} ${f(yb)} A ${r} ${r} 0 0 1 ${f(xA + r * Math.cos(a2))} ${f(yb - r * Math.sin(a2))}`, h.a.detail));
          out.push(h.texte(xA - 60, yb - 15, '≥ 45°', { lisere: true }));

          // Cote de profondeur de l'entaille, et le diamètre.
          out.push(h.ligne(xA, yb + 3, xA, yb + 30, h.a.fin));
          out.push(cote45(xL, yb + 24, xA, yb + 24, '≥ 1/3', { cote: 'dessous' }));
          out.push(cote45(xL, top + 28, xR, top + 28, 'diamètre'));

          // Cote de la charnière.
          const yc = yb - s - 26;
          out.push(h.ligne(xA, yb - 3, xA, yc - 6, h.a.fin), h.ligne(xB, yb - s - 3, xB, yc - 6, h.a.fin));
          out.push(cote45(xA, yc, xB, yc, '≈ 1/10'));

          // Cote de la marche : plancher de l'entaille prolongé, trait d'abattage prolongé.
          out.push(h.ligne(xB + 3, yb, xR + 22, yb, tiretFin));
          out.push(h.ligne(xR + 3, yb - s, xR + 22, yb - s, h.a.fin));
          out.push(cote45(xR + 16, yb - s, xR + 16, yb, '≥ 25'));

          // charte : le point à vérifier, la charnière : c'est elle qui guide la chute
          out.push(h.controle((xA + xB) / 2, yb - s / 2, 17));

          return out.join('\n');
        },
        renvois: (z) => {
          const { xL, xR, yb, xA, xB, s, yH } = geoCoupe(z);
          const m = 0.55, ox = xA + (xL - xA) * m, oy = yb + (yH - yb) * m;
          return [
            { n: 1, rond: [xL - 40, yH + 26], cible: [ox - 3, oy - 1], texte: 'entaille de direction' },
            { n: 2, rond: [xL - 40, yb - 4], cible: [xA - 36 * Math.cos(rad(18)), yb - 36 * Math.sin(rad(18))], texte: 'ouverture de l’entaille' },
            { n: 3, rond: [xB + 36, yb + 32], cible: [(xA + xB) / 2, yb - s / 2], texte: 'charnière, d’un bord à l’autre' },
            { n: 4, rond: [xR + 30, yb - s - 46], cible: [xR - 26, yb - s], texte: 'trait d’abattage, plus haut que la pointe' },
          ];
        },
      },
      plan: {
        titre: 'De dessus, au niveau des traits',
        dessin: (z) => {
          const { R, cx, cy, xA, xB, yc } = geoPlan(z);
          const out = [];
          const hA = yc(xA), hB = yc(xB);
          // La charnière : bande entre la pointe de l'entaille et le bout du trait.
          out.push(h.path(
            `M${f(xA)} ${f(cy - hA)} A ${R} ${R} 0 0 1 ${f(xB)} ${f(cy - hB)} L${f(xB)} ${f(cy + hB)} ` +
            `A ${R} ${R} 0 0 1 ${f(xA)} ${f(cy + hA)} Z`, h.a.hachure('bois', 'aucun')));
          // Le tronc et son écorce.
          out.push(h.cercle(cx, cy, R, h.a.contour));
          out.push(h.cercle(cx, cy, R - 6, h.a.fin));
          // Pointe de l'entaille et bout du trait d'abattage.
          out.push(h.ligne(xA, cy - hA, xA, cy + hA, h.a.arete));
          out.push(h.ligne(xB, cy - hB, xB, cy + hB, h.a.arete));
          // Direction de chute, d'équerre avec la bande.
          out.push(h.fleche(`M${f(xA - 14)} ${f(cy)} L${f(cx - R - 44)} ${f(cy)}`, h.a.contour));
          return out.join('\n');
        },
        renvois: (z) => {
          const { R, cx, cy } = geoPlan(z);
          return [
            { n: 5, rond: [cx - R - 20, cy - 44], cible: [cx - R - 26, cy - 3], texte: 'direction de chute' },
          ];
        },
      },
    },
  };
};
