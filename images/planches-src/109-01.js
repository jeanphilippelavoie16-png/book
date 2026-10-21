// Planche 109-01 — palan de corde à quatre brins, et la poulie qu'on fabrique (face + coupe A-A).
// Chapitre 109, § 9 (poulie de bois : joues de bois franc, réa de merisier ou de bouleau jaune,
// axe d'acier plein, gorge ≥ 6 × le diamètre du cordage) et tableau des contrôles (≥ 6 × d).
// Description reconstruite le 12 octobre 2026 (la source d'origine manquait), dessin repris du rendu validé.
// 14 oct. : la main du brin menant est la main simple (mains/moteur.js), le poing sur la corde vu côté paume.
// La charte : la face du dessous de la perche et de la bille à l'ombre ; le rouge sur le geste (on tire).
module.exports = (h) => {
  const B = h.a.blanc.match(/fill="([^"]+)"/)[1];
  const blanc = t => h.a[t].replace('fill="none"', `fill="${B}"`);
  const mixte = h.a.detail + ' stroke-dasharray="14 3 2 3"';
  // l'angle d'une main simple qui met l'axe de sa prise sur axe (degrés écran) et son avant-bras vers vers [x, y]
  const poser = (o, axe, vers) => {
    const base = Object.assign({}, o, { angle: 0, avantbras: { longueur: 100 } }); delete base.objet;
    const e0 = h.formes.mainSimple(base); let best = null;
    for (const k of [0, 180]) {
      const a = axe - e0.prise.angle + k, m = h.formes.mainSimple(Object.assign({}, base, { angle: a }));
      const d = [m.coude[0] - m.poignet[0], m.coude[1] - m.poignet[1]], v = [vers[0] - m.poignet[0], vers[1] - m.poignet[1]];
      const c = (d[0] * v[0] + d[1] * v[1]) / ((Math.hypot(d[0], d[1]) * Math.hypot(v[0], v[1])) || 1);
      if (!best || c > best.c) best = { a, c };
    }
    return best.a;
  };
  const MAIN = { ech: 0.5, rot: [-25, 0, 0], vers: [560, 270], ab: 95 };

  // ─── le palan ───
  // Deux moufles de bois (joues de bois franc, réas sur leur axe), la corde en bande, la main qui
  // tient le brin menant. Repère propre : la perche en haut, la bille en bas.
  const R = 24, RJ = 30, EP = 7;                    // corde : rayon de passage ; joue du réa ; épaisseur
  const yU = 100, yL = 208, yB = 276;               // axes des réas fixes, des réas mobiles ; haut de la bille
  const U1 = [100, yU], U2 = [196, yU], L1 = [52, yL], L2 = [148, yL];
  const xMen = U2[0] + R, yMain = yL + 40;          // le brin menant, vertical ; la main
  const BECKET = [28, yU + 22];
  // un moufle : la joue de bois (stadium), sa langue percée, ses réas
  const moufle = (x0, x1, yc, langue) => {
    const h0 = 36, r = 30, out = [];
    const t = langue.y < yc ? -1 : 1, lx = langue.x, ly = langue.y;
    const bord = yc + t * h0;
    const tongue = `M ${lx - 22} ${bord} L ${lx - 14} ${ly} Q ${lx} ${ly + t * 14} ${lx + 14} ${ly} L ${lx + 22} ${bord} Z`;
    out.push(h.path(tongue, h.a.blanc), h.path(tongue, h.a.hachure('bois', 'contour')));
    const joue = `M ${x0 + r} ${yc - h0} H ${x1 - r} Q ${x1} ${yc - h0} ${x1} ${yc - h0 + r} V ${yc + h0 - r} Q ${x1} ${yc + h0} ${x1 - r} ${yc + h0} H ${x0 + r} Q ${x0} ${yc + h0} ${x0} ${yc + h0 - r} V ${yc - h0 + r} Q ${x0} ${yc - h0} ${x0 + r} ${yc - h0} Z`;
    out.push(h.path(joue, h.a.blanc), h.path(joue, h.a.hachure('bois', 'contour')));
    out.push(h.ligne(lx - 21, bord, lx + 21, bord, `fill="none" stroke="${B}" stroke-width="2"`));
    out.push(h.cercle(lx, ly + t * 2, 6, h.a.plein));
    return out.join('\n');
  };
  const rea = (x, y) => [h.cercle(x, y, RJ, blanc('contour')), h.cercle(x, y, R - 4, h.a.detail),
    h.cercle(x, y, 8, h.a.arete), h.cercle(x, y, 3, h.a.plein)].join('\n');
  // la corde, échantillonnée serrée : droites et demi-tours autour des réas
  const droite = (p, q, out) => { const n = Math.max(2, Math.ceil(Math.hypot(q[0] - p[0], q[1] - p[1]) / 8)); for (let i = 1; i <= n; i++) out.push([p[0] + (q[0] - p[0]) * i / n, p[1] + (q[1] - p[1]) * i / n]); };
  const arc = (c, a0, a1, out) => { const n = Math.ceil(Math.abs(a1 - a0) / 10); for (let i = 1; i <= n; i++) { const t = (a0 + (a1 - a0) * i / n) * Math.PI / 180; out.push([c[0] + R * Math.cos(t), c[1] + R * Math.sin(t)]); } };
  const palan = z => {
    const out = [];
    // perche : un rondin vu de côté, le bout coupé à droite
    out.push(h.path(`M -6 10 H 282 A 6 12 0 0 1 282 34 H -6 A 6 12 0 0 1 -6 10 Z`, h.a.blanc));
    out.push(h.path(`M -6 27 H 282 A 6 12 0 0 1 282 34 H -6 A 6 12 0 0 0 -6 27 Z`, h.a.ombre));   // le dessous, à l'ombre
    out.push(h.path(`M -6 10 H 282 A 6 12 0 0 1 282 34 H -6 A 6 12 0 0 1 -6 10 Z`, h.a.contour));
    out.push(h.ellipse(282, 22, 6, 12, h.a.arete), h.path('M 20 17 h 60 M 150 27 h 70 M 230 16 h 30', h.a.fin));
    // moufles et réas
    out.push(moufle(8, 234, yU, { x: 148, y: yU - 58 }));
    out.push(moufle(16, 184, yL, { x: 100, y: yL + 58 }));
    // estrope : la boucle de corde passée sur la perche, ses deux bouts dans le trou de la langue
    out.push(h.formes.cordes([
      { pts: [[146, 40], [138, 28], [134, 14], [140, 5], [148, 3], [156, 5], [162, 14], [158, 28], [150, 40]], ep: 6, debut: 'ouvert', fin: 'ouvert' },
    ], { trait: 'arete' }));
    out.push(h.cercle(BECKET[0], BECKET[1], 6, h.a.plein));
    for (const c of [U1, U2, L1, L2]) out.push(rea(c[0], c[1]));
    // la bille et son élingue
    out.push(h.path(`M 0 ${yB} H 182 A 9 22 0 0 1 182 ${yB + 44} H 0 A 9 22 0 0 1 0 ${yB} Z`, h.a.blanc));
    out.push(h.path(`M 0 ${yB + 30} H 182 A 9 22 0 0 1 182 ${yB + 44} H 0 A 9 22 0 0 0 0 ${yB + 30} Z`, h.a.ombre));   // le dessous, à l'ombre
    out.push(h.path(`M 0 ${yB} H 182 A 9 22 0 0 1 182 ${yB + 44} H 0 A 9 22 0 0 1 0 ${yB} Z`, h.a.contour));
    out.push(h.ellipse(182, yB + 22, 9, 22, h.a.arete), h.ellipse(182, yB + 22, 4, 11, h.a.detail));
    out.push(h.path(`M 18 ${yB + 12} h 30 M 136 ${yB + 31} h 30 M 140 ${yB + 11} h 22`, h.a.fin));
    out.push(h.formes.cordes([
      { pts: [[98, yL + 62], [86, yL + 72], [78, yB], [74, yB + 22], [78, yB + 44]], ep: 6, debut: 'ouvert', fin: 'ouvert' },
      { pts: [[102, yL + 62], [114, yL + 72], [122, yB], [126, yB + 22], [122, yB + 44]], ep: 6, debut: 'ouvert', fin: 'ouvert' },
    ], { trait: 'arete' }));
    // la corde : ringot → sous L1 → sur U1 → sous L2 → sur U2 → brin menant → la main → le bout libre
    const P = [[BECKET[0], BECKET[1] + 8]];
    droite(P[0], [L1[0] - R, yL], P); arc(L1, 180, 0, P);
    droite([L1[0] + R, yL], [U1[0] - R, yU], P); arc(U1, 180, 360, P);
    droite([U1[0] + R, yU], [L2[0] - R, yL], P); arc(L2, 180, 0, P);
    droite([L2[0] + R, yL], [U2[0] - R, yU], P); arc(U2, 180, 360, P);
    droite([xMen, yU], [xMen, yMain + 40], P);
    P.push([xMen - 2, yMain + 58], [xMen - 10, yMain + 72], [xMen - 22, yMain + 80]);
    out.push(h.formes.corde(P, { ep: EP, debut: 'coupe', fin: 'libre', trait: 'arete' }));
    // le nœud d'arrêt du bout mort, au-dessus du ringot
    out.push(h.path(`M ${BECKET[0] - 6} ${BECKET[1] - 4} Q ${BECKET[0] - 9} ${BECKET[1] - 18} ${BECKET[0]} ${BECKET[1] - 19} Q ${BECKET[0] + 9} ${BECKET[1] - 18} ${BECKET[0] + 6} ${BECKET[1] - 4} Z`, blanc('arete')));
    out.push(h.path(`M ${BECKET[0] - 5} ${BECKET[1] - 12} Q ${BECKET[0]} ${BECKET[1] - 8} ${BECKET[0] + 5} ${BECKET[1] - 13}`, h.a.detail));
    out.push(h.rect(BECKET[0] - EP / 2, BECKET[1] - 4, EP, 12, blanc('arete')));
    // la main droite qui tient le brin menant : la main simple, le poing sur la corde vu côté paume, le pouce en
    // haut, l'avant-bras vers la droite ; la corde entre par le haut du poing et ressort par le bas
    const brin = h.formes.corde([[xMen, yMain - 46], [xMen, yMain], [xMen, yMain + 40]], { ep: EP, debut: 'ouvert', fin: 'ouvert', trait: 'arete' });
    const oM = { x: xMen, y: yMain, pose: 'prise-corde', vue: 'paume', cote: 'droite', echelle: MAIN.ech, diametre: EP / MAIN.ech, ...(MAIN.rot ? { rotation: MAIN.rot } : {}) };
    out.push(h.formes.mainSimple({ ...oM, angle: poser(oM, 90, MAIN.vers), objet: brin, avantbras: { vers: MAIN.vers, longueur: MAIN.ab } }).svg);
    // flèches : on tire vers le bas (le geste), la charge monte
    out.push(h.geste(`M ${xMen + 22} ${yU + 50} L ${xMen + 22} ${yU + 96}`));
    out.push(h.fleche(`M -18 ${yB + 40} L -18 ${yB + 4}`, h.a.contour));
    return out.join('\n');
  };

  // ─── la poulie simple : face et coupe, même échelle, mêmes hauteurs ───
  const Y = { oeil: 34, haut: 56, axe: 150, bas: 236 };
  const RE = 44, RF = 37, dC = 12;                  // réa : rayon extérieur, rayon au fond de gorge ; corde
  const yReaH = Y.axe - RE, yReaB = Y.axe + RE;
  const rappels = (x0, x1) => [Y.haut, yReaH, Y.axe, yReaB].map(y => h.ligne(x0, y, x1, y, h.a.fin)).join('\n');

  const face = z => {
    const cx = z.l - 68, W = 60, rc = 34, out = [];
    out.push(rappels(cx + W + 4, z.l));
    // les deux brins de la corde, qui sortent par le bas entre les joues
    const xr = RF + dC / 2;
    out.push(h.formes.cordes([
      { pts: [[cx - xr, Y.bas - 30], [cx - xr, Y.bas + 8], [cx - xr, Y.bas + 30]], ep: dC, debut: 'ouvert', fin: 'fixe' },
      { pts: [[cx + xr, Y.bas - 30], [cx + xr, Y.bas + 8], [cx + xr, Y.bas + 30]], ep: dC, debut: 'ouvert', fin: 'fixe' },
    ], { trait: 'arete' }));
    // l'œil forgé et sa tige
    out.push(h.cercle(cx, Y.oeil, 8, h.a.arete), h.rect(cx - 3, Y.oeil + 8, 6, Y.haut - Y.oeil - 8, blanc('arete')));
    // la joue avant
    out.push(h.path(`M ${cx - W} ${Y.haut + rc} Q ${cx - W} ${Y.haut} ${cx - W + rc} ${Y.haut} H ${cx + W - rc} Q ${cx + W} ${Y.haut} ${cx + W} ${Y.haut + rc} V ${Y.bas - rc} Q ${cx + W} ${Y.bas} ${cx + W - rc} ${Y.bas} H ${cx - W + rc} Q ${cx - W} ${Y.bas} ${cx - W} ${Y.bas - rc} Z`, blanc('contour')));
    // derrière la joue : l'entretoise du haut, la tige de l'œil et son écrou, le réa, la corde dans la gorge
    out.push(h.rect(cx - W + 24, Y.haut + 2, 2 * W - 48, 20, h.a.cache));
    out.push(h.path(`M ${cx - 3} ${Y.haut} V ${Y.haut + 28} M ${cx + 3} ${Y.haut} V ${Y.haut + 28} M ${cx - 7} ${Y.haut + 28} H ${cx + 7} V ${Y.haut + 34} H ${cx - 7} Z`, h.a.cache));
    out.push(h.cercle(cx, Y.axe, RE, h.a.cache));
    const ro = xr + dC / 2, ri = xr - dC / 2;
    out.push(h.path(`M ${cx - ro} ${Y.bas} V ${Y.axe} A ${ro} ${ro} 0 0 1 ${cx + ro} ${Y.axe} V ${Y.bas} M ${cx - ri} ${Y.bas} V ${Y.axe} M ${cx + ri} ${Y.bas} V ${Y.axe}`, h.a.cache));
    // la tête de l'axe d'acier, sur la joue
    out.push(h.cercle(cx, Y.axe, 9, h.a.arete), h.cercle(cx, Y.axe, 4, h.a.detail));
    // trait de coupe A-A
    out.push(h.ligne(cx, 12, cx, Y.bas + 22, mixte));
    out.push(h.ligne(cx, 12, cx, 20, h.a.contour), h.ligne(cx, Y.bas + 14, cx, Y.bas + 22, h.a.contour));
    out.push(h.texte(cx + 12, 22, 'A'), h.texte(cx + 12, Y.bas + 22, 'A'));
    return out.join('\n');
  };

  const coupe = z => {
    const cx = 82, e = 14, j = 2, wR = 30, out = [];
    out.push(rappels(-46, cx - wR / 2 - j - e - 28));
    const xg = cx - wR / 2 - j - e, xd = cx + wR / 2 + j;
    // l'œil vu par la tranche, sa tige à travers l'entretoise de bois, l'écrou dessous
    out.push(h.rect(cx - 3, Y.oeil - 8, 6, 16, h.a.arete));
    out.push(h.rect(xg + e, Y.haut, xd - xg - e, 22, h.a.hachure('bois', 'arete')));
    out.push(h.rect(cx - 3, Y.oeil + 8, 6, Y.haut + 28 - Y.oeil - 8, h.a.hachure('metal', 'arete')));
    out.push(h.rect(cx - 8, Y.haut + 28, 16, 6, h.a.hachure('metal', 'arete')));
    // joues
    out.push(h.rect(xg, Y.haut, e, Y.bas - Y.haut, h.a.hachure('bois', 'contour')));
    out.push(h.rect(xd, Y.haut, e, Y.bas - Y.haut, h.a.hachure('bois', 'contour')));
    // réa coupé, gorge ronde en haut et en bas
    const rg = dC / 2 + 1, yh = yReaH, yb = yReaB, x0 = cx - wR / 2, x1 = cx + wR / 2;
    const yhG = Y.axe - RF, ybG = Y.axe + RF;
    out.push(h.path(`M ${x0} ${yh} H ${cx - rg} A ${rg} ${rg} 0 0 0 ${cx + rg} ${yh} H ${x1} V ${yb} H ${cx + rg} A ${rg} ${rg} 0 0 0 ${cx - rg} ${yb} H ${x0} Z`, h.a.hachure('bois', 'contour')));
    // corde logée dans la gorge du haut
    out.push(h.cercle(cx, yhG - dC / 2 + 1, dC / 2, h.a.plein));
    // axe d'acier : tête à gauche, écrou à droite
    out.push(h.rect(xg - 6, Y.axe - 7, xd + e + 12 - xg, 14, h.a.hachure('metal', 'arete')));
    out.push(h.rect(xg - 10, Y.axe - 12, 4, 24, h.a.arete), h.rect(xd + e + 6, Y.axe - 12, 4, 24, h.a.arete));
    // cotes
    out.push(h.cote(xd + e + 22, yhG, xd + e + 22, ybG, 'Ø ≥ 6 d', { cote: 'droite' }));
    out.push(h.ligne(cx + rg, yhG, xd + e + 26, yhG, h.a.fin), h.ligne(cx + rg, ybG, xd + e + 26, ybG, h.a.fin));
    // d : la corde, cotée à gauche de la joue, ses lignes d'attache traversant la joue en trait fin
    const yr0 = yhG - dC + 1, yr1 = yhG + 1;
    out.push(h.ligne(cx - dC / 2, yr0, xg - 18, yr0, h.a.fin), h.ligne(cx - dC / 2, yr1, xg - 18, yr1, h.a.fin));
    out.push(h.cote(xg - 14, yr0, xg - 14, yr1, 'd', { cote: 'gauche' }));
    out.__g = { xg, xd, e, cx, yb, ybG };
    return out.join('\n');
  };

  // mise à l'échelle des vues dessinées en unités propres
  const SP = 0.97, DXP = 140, SF = 1.05;
  const enG = (k, dx, dy, fn) => z => `<g transform="translate(${dx} ${dy}) scale(${k})">\n${fn({ l: z.l / k, h: z.h / k })}\n</g>`;
  const pts = (k, dx, dy, fn) => z => fn({ l: z.l / k, h: z.h / k }).map(r => ({ ...r, rond: [r.rond[0] * k + dx, r.rond[1] * k + dy], cible: [r.cible[0] * k + dx, r.cible[1] * k + dy] }));

  return {
    ref: '109-01',
    fichier: 'planche-109-01-mouflage.svg',
    titre: 'Palan de corde à quatre brins',
    desc: "Palan de corde fabriqué, quatre brins, pendu à un rondin par une estrope de corde passée dans le trou de la langue du moufle fixe. Chaque moufle est une joue de bois franc arrondie qui porte deux réas sur leur axe. En haut, le moufle fixe, avec un ringot à gauche où le bout mort est arrêté par un nœud. En bas, le moufle mobile, sa langue percée en dessous où passe l'élingue qui serre la bille. La corde, dessinée en bande, part du ringot, passe sous le premier réa mobile, par-dessus le premier réa fixe, sous le second réa mobile, par-dessus le second réa fixe, et descend en brin menant, tout droit, jusqu'à la main : une main gauche vue du dos, les doigts refermés autour de la corde, le pouce par-dessus, l'avant-bras qui part vers la droite ; sous le poing, le bout libre pend. Une flèche le long du brin menant dit qu'on tire vers le bas ; une flèche verticale à gauche de la bille dit que la charge monte. Sous le palan, une poulie simple à fabriquer, en deux vues à la même échelle reliées par des traits de rappel : de face, la joue avant arrondie, l'œil forgé en haut et sa tige, la tête de l'axe au centre, et en tireté derrière la joue l'entretoise du haut, l'écrou de la tige, le réa et la corde qui passe par-dessus et ressort en deux brins par le bas ; un trait de coupe vertical A-A par l'axe ; puis la coupe A-A : deux joues de bois franc, l'entretoise de bois entre elles en haut, traversée par la tige de l'œil, le réa de merisier ou de bouleau jaune, l'axe d'acier qui traverse les trois, une gorge ronde en haut où loge la corde, cotée d, et une gorge vide en bas. Le diamètre du réa au fond de gorge est coté : au moins six fois d.",
    format: 'pleine',
    disposition: [['palan'], ['face', 'coupe']],
    hauteurs: [10, 9],
    vues: {
      palan: {
        dessin: enG(SP, DXP, 0, palan),
        renvois: pts(SP, DXP, 0, z => [
          { n: 1, rond: [-24, 124], cible: [22, 112], texte: 'bout mort, arrêté au ringot du moufle fixe' },
          { n: 2, rond: [-12, 250], cible: [44, 230], texte: 'sous le premier réa mobile' },
          { n: 3, rond: [48, 56], cible: [90, 78], texte: 'par-dessus le premier réa fixe' },
          { n: 4, rond: [168, 256], cible: [152, 232], texte: 'sous le second réa mobile' },
          { n: 5, rond: [262, 56], cible: [210, 80], texte: 'par-dessus le second réa fixe' },
          { n: 6, rond: [290, 196], cible: [223, 212], texte: 'brin menant, on tire ici' },
        ]),
      },
      face: { titre: 'De face', dessin: enG(SF, 0, 0, face) },
      coupe: {
        titre: 'Coupe A-A',
        dessin: enG(SF, 0, 0, coupe),
        renvois: pts(SF, 0, 0, z => {
          const cx = 82, xg = cx - 15 - 2 - 14, xd = cx + 15 + 2;
          return [
            { n: 7, rond: [xg - 6, 252], cible: [xg + 7, 222], texte: 'joue de bois franc' },
            { n: 8, rond: [xd + 44, 66], cible: [cx + 7, 128], texte: 'réa de merisier ou de bouleau jaune' },
            { n: 9, rond: [xd + 40, 220], cible: [cx + 4, Y.axe + RF + 2], texte: 'gorge ronde, jamais à fond plat' },
            { n: 10, rond: [xd + 44, 112], cible: [xd + 20, Y.axe - 4], texte: "axe d'acier plein" },
          ];
        }),
      },
    },
  };
};
