// Planche 36-01. Le coin de travail éclairé (chapitre 36, §9, « La lumière qu'on fabrique »).
// Dessinée le 15 octobre 2026 (inventaire des planches, priorité moyenne).
// Ce que dit le chapitre, et rien de plus : une flamme (chandelle de suif, ou lampe à graisse) ;
// 1. le réflecteur : tôle, fer-blanc d'une conserve ouverte et aplatie, ou écorce de bouleau polie
//    côté clair, courbée en gouttière et dressée derrière la flamme, côté mur ;
// 2. le condenseur : une bouteille ou un pot de verre rempli d'eau claire, entre la flamme et
//    l'ouvrage, à peu près à la hauteur de la mèche ; l'eau ramasse la lumière en une tache serrée ;
//    on déplace le pot, pas la chandelle ;
// 3. le fond pâle : une toile blanche, un drap ou une planche blanchie cloués au mur derrière la
//    place de travail.
// Deux vues alignées (règle 6) : l'élévation, vue de côté le long du mur, et le plan, vu de dessus,
// à la même échelle, les traits de rappel qui se correspondent.
// Aucune cote : le chapitre n'en donne pas. Les proportions sont un choix de dessin (repère en mm :
// le mur à x = 0, la chandelle à 95, le pot à 235, la tache à 470) ; la chandelle donne l'échelle.
// Ce que le texte ne dit pas et que la planche dessine en principe : le pot monté sur une cale pour
// que son milieu soit à la mèche ; la flamme un peu au-dessus du milieu du pot, ce qui fait tomber la
// tache plus bas, sur la table (une lentille renverse l'image). Les rayons sont qualitatifs.
// Charte : le mur et le dessus de table coupés, hachurés bois ; la face à l'ombre du réflecteur et de
// la cale en gris d'ombre. Rouge : le pot qu'on avance ou recule (le geste), et le cercle sur la tache.
module.exports = (h) => {
  const A = h.a;
  const f1 = v => Math.round(v * 10) / 10;
  const W = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const RAD = Math.PI / 180;

  // Repère commun aux deux vues : x en mm depuis la face du mur, même échelle k, même origine X0.
  const k = 0.98, X0 = 34;
  const X = mm => X0 + mm * k;
  // les pièces, en mm
  const M = {
    toile: 4, refDos: 26, refProf: 34, refH: 175, refL: 150,
    chX: 95, chR: 13, chH: 120, mecheH: 128, flH: 26,
    potX: 235, potR: 52, potCol: 22,
    oX0: 392, oX1: 538, tache: 462,
  };
  const cale = M.mecheH - M.potR;   // le milieu du pot à la mèche

  // ─── Élévation : vue de côté, le long du mur ────────────────────────────────────────────────
  const elevation = z => {
    const o = [], P = {};
    const yT = z.h - 44;                 // le dessus de la table
    const Y = mm => yT - mm * k;          // hauteur au-dessus de la table
    const epT = 16;
    // le mur, coupé ; la toile blanche clouée sur sa face
    o.push(h.rect(X0 - 18, 0, 18, z.h, A.hachure('bois', 'contour')));
    o.push(h.rect(X0, Y(M.refH + 40), M.toile * k, M.refH + 40 - 4, W(A.arete)));
    for (const y of [Y(M.refH + 30), Y(40)]) o.push(h.cercle(X0 + M.toile * k / 2, y, 1.4, A.plein));
    P.toile = [X0 + M.toile * k, Y(M.refH + 22)];
    // la table, coupée : le dessus et un pied
    const xF = z.l - 12;
    o.push(h.path(`M${f1(X0)} ${f1(yT)} L${f1(xF)} ${f1(yT)} L${f1(xF - 4)} ${f1(yT + 5)} L${f1(xF + 3)} ${f1(yT + 10)} L${f1(xF - 1)} ${f1(yT + epT)} L${f1(X0)} ${f1(yT + epT)} Z`, A.hachure('bois', 'contour')));
    // le réflecteur, vu par la tranche : la tôle debout, le bord du haut en courbe (on le voit un peu
    // d'en haut), la face creuse vers la flamme
    const rx0 = X(M.refDos), rx1 = X(M.refDos + M.refProf), ry = Y(M.refH), rb = 7;
    o.push(h.path(`M${f1(rx0)} ${f1(yT)} L${f1(rx0)} ${f1(ry)} Q${f1((rx0 + rx1) / 2)} ${f1(ry + 2 * rb)} ${f1(rx1)} ${f1(ry)} L${f1(rx1)} ${f1(yT)}`, W(A.contour)));
    o.push(h.path(`M${f1(rx0)} ${f1(ry)} Q${f1((rx0 + rx1) / 2)} ${f1(ry - 2 * rb)} ${f1(rx1)} ${f1(ry)}`, A.detail));
    o.push(h.path(`M${f1(rx0 + 4)} ${f1(yT - 2)} L${f1(rx0 + 4)} ${f1(ry + 6)} Q${f1(rx0 + (rx1 - rx0) * 0.3)} ${f1(ry + 1.6 * rb)} ${f1(rx0 + (rx1 - rx0) * 0.55)} ${f1(ry + 1.7 * rb)} L${f1(rx0 + (rx1 - rx0) * 0.55)} ${f1(yT - 2)} Z`, A.ombre));
    P.ref = [rx1, Y(M.refH * 0.75)];
    // la chandelle : le fût, la mèche, la flamme
    const cx = X(M.chX), cr = M.chR * k, cyH = Y(M.chH);
    o.push(h.path(`M${f1(cx - cr)} ${f1(yT)} L${f1(cx - cr)} ${f1(cyH + 3)} Q${f1(cx - cr)} ${f1(cyH)} ${f1(cx - cr + 4)} ${f1(cyH)} L${f1(cx + cr - 4)} ${f1(cyH)} Q${f1(cx + cr)} ${f1(cyH)} ${f1(cx + cr)} ${f1(cyH + 3)} L${f1(cx + cr)} ${f1(yT)}`, W(A.contour)));
    o.push(h.rect(cx + cr * 0.35, cyH + 3, cr * 0.6, yT - cyH - 4, A.ombre));
    const yM = Y(M.mecheH);
    o.push(h.ligne(cx, cyH, cx, yM, A.arete));
    const fb = yM + 2, ft = Y(M.mecheH + M.flH), fw = 6;
    o.push(h.path(`M${f1(cx)} ${f1(ft)} C${f1(cx + fw * 0.6)} ${f1(ft + 7)} ${f1(cx + fw * 1.1)} ${f1(fb - 8)} ${f1(cx + fw * 0.7)} ${f1(fb - 2)} Q${f1(cx)} ${f1(fb + 3)} ${f1(cx - fw * 0.7)} ${f1(fb - 2)} C${f1(cx - fw * 1.1)} ${f1(fb - 8)} ${f1(cx - fw * 0.6)} ${f1(ft + 7)} ${f1(cx)} ${f1(ft)} Z`, W(A.arete)));
    const flamme = [cx, Y(M.mecheH + M.flH * 0.4)];
    P.flamme = flamme;
    // la cale et le pot d'eau, le milieu du pot à la hauteur de la mèche
    const px = X(M.potX), pr = M.potR * k;
    const yc0 = Y(cale);
    o.push(h.rect(px - pr * 0.8, yc0, pr * 1.6, yT - yc0, W(A.contour)));
    o.push(h.rect(px + pr * 0.25, yc0 + 1.5, pr * 0.55 - 1.5, yT - yc0 - 3, A.ombre));
    const pc = [px, Y(M.mecheH)];
    const col = M.potCol * k, haut = pc[1] - pr;
    // le pot rond, le col, le bouchon ; l'eau jusqu'au col
    const potD = `M${f1(px - col)} ${f1(haut - 14)} L${f1(px - col)} ${f1(haut + 2)} A${f1(pr)} ${f1(pr)} 0 1 0 ${f1(px + col)} ${f1(haut + 2)} L${f1(px + col)} ${f1(haut - 14)} Z`;
    o.push(h.path(potD, A.hachure('eau', 'aucun')));
    o.push(h.path(potD, A.contour));
    o.push(h.rect(px - col - 2, haut - 22, 2 * col + 4, 9, W(A.arete)));
    o.push(h.path(`M${f1(px - pr * 0.62)} ${f1(pc[1] - pr * 0.45)} Q${f1(px - pr * 0.8)} ${f1(pc[1])} ${f1(px - pr * 0.6)} ${f1(pc[1] + pr * 0.5)}`, A.detail));
    P.pot = [px + pr * 0.7, pc[1] - pr * 0.7];
    P.cale = [px + pr * 0.8, (yc0 + yT) / 2];
    // l'ouvrage : un morceau de cuir posé sur la table, une aiguille et son fil
    const ox0 = X(M.oX0), ox1 = X(M.oX1);
    o.push(h.path(`M${f1(ox0)} ${f1(yT)} L${f1(ox0 + 3)} ${f1(yT - 5)} L${f1(ox1 - 4)} ${f1(yT - 5)} L${f1(ox1)} ${f1(yT)}`, W(A.arete)));
    // la tache, là où la lumière se ramasse
    const tx = X(M.tache), ty = yT - 5;
    P.tache = [tx, ty];
    // les rayons : de la flamme au pot, du pot à la tache ; un rayon renvoyé par le réflecteur
    const yh = pc[1] - pr * 0.72, yb = pc[1] + pr * 0.6;
    const entree = [[px - pr * 0.72, yh], [px - pr * 0.96, pc[1] + pr * 0.2], [px - pr * 0.8, yb]];
    const sortie = [[px + pr * 0.7, yh + 8], [px + pr * 0.95, pc[1] + pr * 0.28], [px + pr * 0.68, yb + 2]];
    entree.forEach((e, i) => {
      o.push(h.ligne(flamme[0] + 7, flamme[1] + (i - 1) * 3, e[0], e[1], A.cache));
      o.push(h.ligne(sortie[i][0], sortie[i][1], tx + (i - 1) * 2, ty - 1, A.cache));
    });
    // la tache : un petit éclat
    o.push(h.ellipse(tx, ty - 0.5, 7, 2, W(A.arete)));
    for (const a of [-160, -125, -90, -55, -20]) {
      const u = [Math.cos(a * RAD), Math.sin(a * RAD)];
      o.push(h.ligne(tx + u[0] * 10, ty + u[1] * 6, tx + u[0] * 17, ty + u[1] * 11, A.detail));
    }
    return { svg: o.join('\n'), P, yT };
  };

  // ─── Plan : vu de dessus ─────────────────────────────────────────────────────────────────────
  const plan = z => {
    const o = [], P = {};
    const yA = z.h * 0.5;                 // l'axe flamme, pot, tache
    const Yp = mm => yA + mm * k;
    // le mur, coupé, la toile sur sa face ; le bord de la table devant
    o.push(h.rect(X0 - 18, 0, 18, z.h, A.hachure('bois', 'contour')));
    o.push(h.rect(X0, 6, M.toile * k, z.h - 12, W(A.arete)));
    o.push(h.ligne(X0, z.h - 4, z.l - 12, z.h - 4, A.arete));
    o.push(h.ligne(X0, 4, z.l - 12, 4, A.detail));
    // le réflecteur, en gouttière autour de la flamme, le dos au mur
    const cx = X(M.chX);
    const R = (M.chX - M.refDos) * k, ep = 3;
    const arc = (r, a0, a1) => { const p = []; for (let a = a0; a <= a1 + 0.01; a += 5) p.push([cx - r * Math.cos(a * RAD), yA + r * Math.sin(a * RAD)]); return p; };
    const ext = arc(R, -62, 62), int = arc(R - ep, -62, 62).reverse();
    o.push(h.chemin(ext.concat(int), W(A.contour), true));
    P.ref = arc(R, 30, 30)[0];
    // la chandelle vue de dessus : le fût, la flamme au milieu
    o.push(h.cercle(cx, yA, M.chR * k, W(A.contour)));
    o.push(h.cercle(cx, yA, 3.2, A.plein));
    // le pot sur sa cale
    const px = X(M.potX), pr = M.potR * k;
    o.push(h.rect(px - pr * 0.8, yA - pr * 0.8, pr * 1.6, pr * 1.6, A.cache));
    o.push(h.cercle(px, yA, pr, W(A.contour)));
    o.push(h.cercle(px, yA, M.potCol * k, A.arete));
    o.push(h.cercle(px, yA, M.potCol * k - 4, A.detail));
    // l'ouvrage : le morceau de cuir, une couture, l'aiguille et le fil
    const ox0 = X(M.oX0), ox1 = X(M.oX1);
    const cuir = [[ox0, yA - 58], [ox0 + 40, yA - 66], [ox1 - 10, yA - 60], [ox1, yA - 20], [ox1 - 6, yA + 52], [ox0 + 60, yA + 64], [ox0 + 6, yA + 50]];
    o.push(h.chemin(cuir, W(A.arete), true));
    // la couture : des points en biais le long d'un bord replié, l'aiguille et son fil au bout
    o.push(h.path(`M${f1(ox0 + 14)} ${f1(yA + 40)} L${f1(ox1 - 16)} ${f1(yA + 36)}`, A.detail));
    for (let i = 0; i < 7; i++) { const x = ox0 + 22 + i * 13; o.push(h.ligne(x, yA + 33, x + 6, yA + 45, A.arete)); }
    const ax = ox0 + 22 + 7 * 13 + 6, ay = yA + 33;
    o.push(h.path(`M${f1(ax)} ${f1(ay)} C${f1(ax + 6)} ${f1(ay - 8)} ${f1(ax + 2)} ${f1(ay - 16)} ${f1(ax + 8)} ${f1(ay - 22)}`, A.detail));
    o.push(h.ligne(ax + 8, ay - 22, ax + 20, ay - 46, A.arete));
    // les rayons : la flamme éclaire dans tous les sens ; ce qui part vers le mur revient du réflecteur
    const tx = X(M.tache);
    for (const s of [-1, 1]) {
      // devant : de la flamme au bord du pot, puis vers la tache
      const e = [px - pr * 0.75, yA + s * pr * 0.62], so = [px + pr * 0.75, yA + s * pr * 0.55];
      o.push(h.ligne(cx + 8, yA + s * 4, e[0], e[1], A.cache), h.ligne(so[0], so[1], tx, yA + s * 2, A.cache));
      // derrière : vers le réflecteur, renvoyé vers l'avant
      const b = arc(R - ep, 40, 40)[0], bb = [b[0], yA + s * (b[1] - yA)];
      o.push(h.ligne(cx - 8, yA + s * 7, bb[0] + 1, bb[1], A.cache));
      o.push(h.ligne(bb[0] + 1, bb[1], px - pr * 0.4, yA + s * pr * 0.92, A.cache));
    }
    // la tache serrée sur le cuir
    o.push(h.ellipse(tx, yA, 7, 5, W(A.arete)));
    P.tache = [tx, yA];
    // le geste : on avance ou on recule le pot jusqu'à ce que la tache se serre
    const gy = yA - pr - 16;
    o.push(h.geste(`M${f1(px - 34)} ${f1(gy)} L${f1(px + 34)} ${f1(gy)}`, { double: true }));
    o.push(h.controle(tx, yA, 14));
    P.geste = [px + 20, gy];
    P.pot = [px, yA + pr];
    return { svg: o.join('\n'), P };
  };

  const memo = {};
  const G = (fn, z) => { const c = `${fn.name}-${z.l}-${z.h}`; return memo[c] || (memo[c] = fn(z)); };

  return {
    ref: '36-01',
    titre: 'Le coin de travail éclairé : réflecteur, pot d’eau, fond pâle',
    desc: 'Une table contre le mur, vue de côté puis de dessus, à la même échelle. Contre le mur, une toile blanche clouée. Sur la table, près du mur, un réflecteur de tôle courbé en gouttière, dressé derrière la chandelle. Entre la chandelle et l’ouvrage, un pot de verre plein d’eau, monté sur une cale pour que son milieu soit à la hauteur de la mèche. La lumière qui traverse le pot se ramasse en une tache serrée sur le morceau de cuir qu’on coud. Une double flèche rouge dit qu’on avance ou recule le pot, pas la chandelle.',
    format: 'pleine',
    disposition: [['elev'], ['plan']],
    hauteurs: [1, 0.92],
    vues: {
      elev: {
        titre: 'De côté, le long du mur',
        dessin: z => G(elevation, z).svg,
        renvois: z => {
          const P = G(elevation, z).P;
          return [
            { n: 1, rond: [P.toile[0] + 46, P.toile[1] - 26], cible: P.toile, texte: 'toile blanche clouée au mur' },
            { n: 2, rond: [P.ref[0] + 40, P.ref[1] - 86], cible: [P.ref[0] - 6, P.ref[1] - 40], texte: 'réflecteur en gouttière, côté mur' },
            { n: 3, rond: [P.pot[0] + 44, P.pot[1] - 30], cible: P.pot, texte: 'pot d’eau claire, à hauteur de mèche' },
            { n: 4, rond: [P.cale[0] + 44, P.cale[1] - 4], cible: P.cale, texte: 'une cale pour le monter' },
            { n: 5, rond: [P.tache[0] + 40, P.tache[1] - 52], cible: [P.tache[0] + 4, P.tache[1] - 10], texte: 'la tache serrée sur l’ouvrage' },
          ];
        },
      },
      plan: {
        titre: 'Vu de dessus',
        dessin: z => G(plan, z).svg,
        renvois: z => {
          const P = G(plan, z).P;
          return [
            { n: 6, rond: [P.geste[0] + 60, P.geste[1] - 18], cible: [P.geste[0] + 14, P.geste[1]], texte: 'on déplace le pot, pas la chandelle' },
          ];
        },
      },
    },
  };
};
