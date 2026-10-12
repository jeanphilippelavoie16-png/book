// Planche 23-40 — refroidir une grosse cuisson : partager en plats bas, les enfoncer dans la
// neige, à demi couverts (chapitre 23, section 8 « Le bouillon, et son refroidissement » ;
// section 9 « Le froid dehors est le réfrigérateur » ; tableau du matériel, ligne des
// contenants larges et peu profonds).
//
// Le chapitre ne donne aucune mesure de contenant ni de trou : aucune cote. Les proportions
// suivent ce qu'il dit : un chaudron profond contre des plats larges et bas, un trou « gros
// comme un bac à vaisselle », la neige tassée « jusqu'au bord ».
module.exports = (h) => {
  const F = h.formes;
  const f = n => (+n).toFixed(1);
  const P = (pts, ferme) => 'M ' + pts.map(p => f(p[0]) + ' ' + f(p[1])).join(' L ') + (ferme ? ' Z' : '');
  const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  const arc = (cx, cy, rx, ry, a0, a1, n = 20) => Array.from({ length: n + 1 }, (_, i) => {
    const a = (a0 + (a1 - a0) * i / n) * Math.PI / 180;
    return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)];
  });

  // Les deux vues de la comparaison et la vue du sac partagent la même échelle.
  const E = 0.42;                // unités de vue par mm
  const mm = v => v * E;

  // ── la neige en coupe ──────────────────────────────────────────────────────────────────
  const neige = (x0, x1, ys, yb) => h.rect(x0, ys, x1 - x0, yb - ys, h.a.hachure('neige', 'aucun'));

  // ── un contenant en coupe : bord à yb - ht, fond à yb, largeur w au bord, wb au fond ──────
  const contenant = (cx, yb, w, wb, ht, niveau) => {
    const TL = [cx - w / 2, yb - ht], TR = [cx + w / 2, yb - ht];
    const BL = [cx - wb / 2, yb], BR = [cx + wb / 2, yb];
    const lv = 3.5;
    const out = [h.path(P([TL, BL, BR, TR], true), h.a.blanc)];
    const t = 1 - niveau;
    const gL = lerp(TL, BL, t), gR = lerp(TR, BR, t);
    out.push(h.path(P([gL, BL, BR, gR], true), h.a.hachure('eau', 'aucun')));
    out.push(h.ligne(gL[0], gL[1], gR[0], gR[1], h.a.arete));
    out.push(h.path(P([[TL[0] - lv, TL[1] + 0.5], TL, BL, BR, TR, [TR[0] + lv, TR[1] + 0.5]]), h.a.contour));
    return { svg: out.join('\n'), TL, TR, BL, BR, gL, gR, cx };
  };

  // Couvercle posé à plat sur le bord, de xa à xb, avec sa petite poignée.
  const couvercle = (xa, xb, y) => {
    const xm = (xa + xb) / 2;
    return [
      h.path(P([[xm - 6, y - 1.5], [xm - 5, y - 6], [xm + 5, y - 6], [xm + 6, y - 1.5]]), h.a.arete),
      h.ligne(xa, y - 1.3, xb, y - 1.3, h.a.contour),
    ].join('\n');
  };

  // ── le chaudron en coupe ───────────────────────────────────────────────────────────────
  const chaudron = (cx, yb, w, ht, niveau, couvert) => {
    const x0 = cx - w / 2, x1 = cx + w / 2, yt = yb - ht, rc = w * 0.09;
    const fond = [...arc(x0 + rc, yb - rc, rc, rc, 180, 90, 8), ...arc(x1 - rc, yb - rc, rc, rc, 90, 0, 8)];
    const interieur = [[x0, yt], ...fond, [x1, yt]];
    const yl = yb - ht * niveau;
    const out = [h.path(P(interieur, true), h.a.blanc)];
    out.push(h.path(P([[x0, yl], ...fond, [x1, yl]], true), h.a.hachure('eau', 'aucun')));
    out.push(h.ligne(x0, yl, x1, yl, h.a.arete));
    // les anses, en boucle de chaque côté
    out.push(h.path(P(arc(x0, yt + 16, 10, 8, 90, 270, 14)), h.a.arete));
    out.push(h.path(P(arc(x1, yt + 16, 10, 8, -90, 90, 14)), h.a.arete));
    out.push(h.path(P([[x0 - 4, yt + 0.5], [x0, yt], ...fond, [x1, yt], [x1 + 4, yt + 0.5]]), h.a.contour));
    if (couvert) {
      out.push(h.path(P(arc(cx, yt - 1, w / 2 + 3, 13, 180, 360, 28)) + ` L ${f(x0 - 3)} ${f(yt - 1)}`, h.a.blanc));
      out.push(h.path(P(arc(cx, yt - 1, w / 2 + 3, 13, 180, 360, 28), true), h.a.contour));
      out.push(h.path(P([[cx - 9, yt - 13], [cx - 7, yt - 21], [cx + 7, yt - 21], [cx + 9, yt - 13]]), h.a.arete));
    }
    return { svg: out.join('\n'), x0, x1, yt, yl, yb };
  };

  // ════════════════════════════════════════════════════════════════════════════════════════
  // 1. Partager : de la louche, du chaudron aux plats bas
  // ════════════════════════════════════════════════════════════════════════════════════════
  const e1 = 0.4;
  const verserGeo = z => {
    const yT = z.h - 12;
    const xCh = z.l * 0.8, xMoule = z.l * 0.24, xPlat = z.l * 0.46;
    const rimPlat = yT - 62 * e1;
    const A = [xPlat + 6, rimPlat - 20];                    // le bord du bol côté manche
    const u = [-Math.cos(58 * Math.PI / 180), -Math.sin(58 * Math.PI / 180)];
    const Lm = 225 * e1;
    return { yT, xCh, xMoule, xPlat, rimPlat, A, u, Lm };
  };
  const verser = {
    titre: 'Partager tout de suite, à la louche, en plats bas',
    dessin: z => {
      const { yT, xCh, xMoule, xPlat, A, u, Lm } = verserGeo(z);
      const out = [];
      out.push(h.rect(6, yT, z.l - 12, 9, h.a.hachure('bois', 'arete')));
      // le chaudron, à droite, entamé
      const ch = chaudron(xCh, yT, 300 * e1, 260 * e1, 0.62, false);
      out.push(ch.svg);
      // le moule à pain, déjà rempli, et le plat à rôtir qu'on remplit
      const moule = contenant(xMoule, yT, 250 * e1, 232 * e1, 70 * e1, 0.5);
      const plat = contenant(xPlat, yT, 330 * e1, 300 * e1, 62 * e1, 0.4);
      out.push(moule.svg, plat.svg);

      // la louche : le bol au-dessus du plat, versé par la lèvre de droite
      const rb = 46 * e1;
      const incl = 24 * Math.PI / 180;                     // le bord penche vers la droite
      const B = [A[0] + 2 * rb * Math.cos(incl), A[1] + 2 * rb * Math.sin(incl)];
      const M = lerp(A, B, 0.5);
      const bol = arc(M[0], M[1], rb, rb, incl * 180 / Math.PI, incl * 180 / Math.PI + 180, 24);
      // le bouillon dans le bol, sous l'horizontale de la lèvre
      const liq = arc(M[0], M[1], rb, rb, incl * 180 / Math.PI, 180 - incl * 180 / Math.PI, 18);
      // le manche : il monte du bord du bol vers la main, en haut à gauche
      const wm = 7;
      const c1 = [A[0] + u[0] * 9 - 2, A[1] + u[1] * 9];
      const bout = [c1[0] + u[0] * Lm, c1[1] + u[1] * Lm];
      const nrm = [-u[1], u[0]], an = Math.atan2(nrm[1], nrm[0]) * 180 / Math.PI;
      const manche = [
        [c1[0] + nrm[0] * wm / 2, c1[1] + nrm[1] * wm / 2],
        [bout[0] + nrm[0] * wm / 2, bout[1] + nrm[1] * wm / 2],
        ...arc(bout[0], bout[1], wm / 2, wm / 2, an, an + 180, 8),
        [c1[0] - nrm[0] * wm / 2, c1[1] - nrm[1] * wm / 2],
      ];
      const plein = a => 'fill="#FFFFFF" ' + a.replace('fill="none" ', '');
      const louche = [
        h.path(P(manche, true), plein(h.a.arete)),
        h.path(P([A, c1]), h.a.arete),
        h.path(P(bol, true), h.a.blanc),
        h.path(P(liq, true), h.a.hachure('eau', 'aucun')),
        h.ligne(liq[0][0], liq[0][1], liq[liq.length - 1][0], liq[liq.length - 1][1], h.a.detail),
        h.path(P(bol), h.a.contour),
      ].join('\n');
      // la main tient le manche vers son bout
      const pm = [c1[0] + u[0] * Lm * 0.64, c1[1] + u[1] * Lm * 0.64];
      out.push(F.main({ x: pm[0], y: pm[1], pose: 'prise', vue: 'dos', angle: 148, diametre: wm + 1, echelle: 0.54, bras: 34, objet: louche }));

      // le filet de bouillon, de la lèvre au plat
      const yS = plat.gL[1];
      out.push(h.path(P([[B[0] - 1, B[1] + 1], [B[0] + 2.5, B[1] + 9], [B[0] + 3, yS], [B[0] + 7, yS], [B[0] + 6.5, B[1] + 8], [B[0] + 2, B[1]]], true), h.a.hachure('eau', 'detail')));
      out.push(h.path(P(arc(B[0] + 5, yS, 9, 2.5, 180, 360, 10)), h.a.fin));

      // le trajet de la louche : du chaudron au plat
      const x0 = ch.x0 + 48, y0 = ch.yl - 4;
      out.push(h.fleche(`M ${f(x0)} ${f(y0)} C ${f(x0 + 2)} ${f(y0 - 95)}, ${f(B[0] + 80)} ${f(A[1] - 60)}, ${f(B[0] + 26)} ${f(A[1] - 8)}`, h.a.cache));
      return out.join('\n');
    },
    renvois: z => {
      const { yT, xCh, xMoule, xPlat, A, u, Lm } = verserGeo(z);
      const hm = [A[0] + u[0] * Lm * 0.4, A[1] + u[1] * Lm * 0.4];
      return [
        { n: 1, rond: [xCh + 90, yT - 110], cible: [xCh + 30, yT - 40], texte: 'le bouillon filtré, encore chaud' },
        { n: 2, rond: [hm[0] - 40, hm[1] + 6], cible: hm, texte: 'la louche, sans attendre qu’il tiédisse' },
        { n: 3, rond: [xMoule - 72, yT - 50], cible: [xMoule - 22, yT - 7], texte: 'plats larges et bas : une couche mince' },
      ];
    },
  };

  // ════════════════════════════════════════════════════════════════════════════════════════
  // 2. Raté : le chaudron plein, couvert, posé sur la croûte
  // ════════════════════════════════════════════════════════════════════════════════════════
  const ySurf = z => z.h - 40;
  const croute = {
    titre: 'Raté : le chaudron posé sur la croûte',
    dessin: z => {
      const ys = ySurf(z);
      const ch = chaudron(z.l / 2, ys, mm(300), mm(250), 0.86, true);
      return [
        neige(4, z.l - 4, ys, z.h - 4),
        h.ligne(4, ys, z.l - 4, ys, h.a.contour),
        ch.svg,
      ].join('\n');
    },
    renvois: z => {
      const ys = ySurf(z);
      return [
        { n: 4, rond: [z.l - 18, ys - mm(250) - 10], cible: [z.l / 2 + mm(150) - 12, ys - mm(250) * 0.5], texte: 'plein, couvert, posé : le fond seul touche' },
      ];
    },
  };

  // ════════════════════════════════════════════════════════════════════════════════════════
  // 3. Juste : les plats bas enfoncés dans la neige, tassée jusqu'au bord
  // ════════════════════════════════════════════════════════════════════════════════════════
  const troueGeo = z => {
    const ys = ySurf(z);
    const cx = z.l * 0.44;
    const prof = mm(70);
    return {
      ys, cx, prof,
      trouH: [[cx - mm(310), ys], [cx - mm(295), ys + prof], [cx + mm(295), ys + prof], [cx + mm(310), ys]],
      plat: { cx: cx - mm(115), w: mm(320), wb: mm(292), ht: prof },
      moule: { cx: cx + mm(165), w: mm(130), wb: mm(112), ht: prof },
    };
  };
  const enneige = {
    titre: 'Juste : les plats bas enfoncés dans la neige',
    dessin: z => {
      const g = troueGeo(z), ys = g.ys;
      const out = [neige(4, z.l - 4, ys, z.h - 4)];
      // le trou taillé : son pourtour, rempli de neige tassée
      out.push(h.path(P(g.trouH), h.a.cache));
      const plat = contenant(g.plat.cx, ys + g.prof, g.plat.w, g.plat.wb, g.plat.ht, 0.5);
      const moule = contenant(g.moule.cx, ys + g.prof, g.moule.w, g.moule.wb, g.moule.ht, 0.55);
      out.push(plat.svg, moule.svg);
      // la surface : la neige arasée au bord des plats, de chaque côté
      out.push(h.ligne(4, ys, plat.TL[0] - 3.5, ys, h.a.arete));
      out.push(h.ligne(plat.TR[0] + 3.5, ys, moule.TL[0] - 3.5, ys, h.a.arete));
      out.push(h.ligne(moule.TR[0] + 3.5, ys, z.l - 4, ys, h.a.arete));
      // couvercles à demi : la moitié gauche couverte, la droite ouverte
      out.push(couvercle(plat.TL[0] - 8, plat.cx, ys));
      out.push(couvercle(moule.TL[0] - 6, moule.cx, ys));
      // la main qui tasse la neige entre le moule et le bord du trou
      const xg = moule.TR[0] + (g.cx + mm(310) - moule.TR[0]) / 2;
      out.push(F.main({ x: xg + 36, y: ys, pose: 'appui', vue: 'profil', cote: 'gauche', echelle: E, bras: 46, inclinaison: 55 }));
      out.push(h.fleche(`M ${f(xg + 30)} ${f(ys - 46)} L ${f(xg + 30)} ${f(ys - 24)}`, h.a.arete));
      // tasser aussi dans les deux autres joints
      const xa = (g.cx - mm(310) + plat.TL[0]) / 2, xb = (plat.TR[0] + moule.TL[0]) / 2;
      for (const x of [xa, xb]) out.push(h.fleche(`M ${f(x)} ${f(ys - 30)} L ${f(x)} ${f(ys - 6)}`, h.a.arete));
      return out.join('\n');
    },
    renvois: z => {
      const g = troueGeo(z), ys = g.ys;
      return [
        { n: 5, rond: [13, z.h - 11], cible: [g.cx - mm(300), ys + g.prof * 0.3], texte: 'un trou gros comme un bac à vaisselle' },
        { n: 6, rond: [g.plat.cx + 50, z.h - 11], cible: [g.plat.cx + 18, ys + g.prof], texte: 'les plats assis au fond, côte à côte' },
        { n: 7, rond: [g.plat.cx - 40, ys - 40], cible: [g.plat.cx - 60, ys - 2], texte: 'couvercle à demi, l’autre moitié ouverte' },
        { n: 8, rond: [(g.plat.cx + g.moule.cx) / 2 - 30, ys - 44], cible: [(g.plat.cx + mm(160) + g.moule.cx - mm(65)) / 2, ys + 14], texte: 'neige tassée tout autour, jusqu’au bord' },
      ];
    },
  };

  // ════════════════════════════════════════════════════════════════════════════════════════
  // 4. À défaut de plat : la tôle repliée aux quatre coins
  // ════════════════════════════════════════════════════════════════════════════════════════
  const toleGeo = z => {
    const L0 = 118, W0 = 74, m0 = 24, c0 = 2.3 * m0, kp = 0.5;   // le patron, plus petit que le bac
    const largeurTot = (L0 + 2 * m0) * kp + c0 + (L0 + W0 * 0.5);
    const s = Math.min((z.l - 28 - 3 * 22) / largeurTot, (z.h - 22) / (W0 * 0.34 + m0 + W0 * 0.2 + 30));
    const L = L0 * s, W = W0 * s, m = m0 * s, c = c0 * s;
    const Lp = L * kp, Wp = W * kp, mp = m * kp;
    const px = 28, py = (z.h - (Wp + 2 * mp)) / 2;
    const cx = px + Lp + 2 * mp + 22 + m * 1.0, cy = z.h - 34;
    const ox = px + Lp + 2 * mp + 22 + c + 22, oy = z.h - 14;
    return { L, W, m, s, px, py, cx, cy, ox, oy, Lp, Wp, mp };
  };
  const tole = {
    titre: 'À défaut : la tôle repliée aux quatre coins',
    dessin: z => {
      const { L, W, m, px, py, cx, cy, ox, oy, Lp, Wp, mp } = toleGeo(z);
      const out = [];
      // le patron, vu de dessus : les plis en tireté
      const X = [px, px + mp, px + mp + Lp, px + 2 * mp + Lp], Y = [py, py + mp, py + mp + Wp, py + 2 * mp + Wp];
      out.push(h.rect(px, py, Lp + 2 * mp, Wp + 2 * mp, `fill="#FFFFFF" ${h.a.arete.replace('fill="none" ', '')}`));
      for (const x of [X[1], X[2]]) out.push(h.ligne(x, Y[0], x, Y[3], h.a.cache));
      for (const y of [Y[1], Y[2]]) out.push(h.ligne(X[0], y, X[3], y, h.a.cache));
      out.push(h.ligne(X[0], Y[0], X[1], Y[1], h.a.cache), h.ligne(X[3], Y[0], X[2], Y[1], h.a.cache));
      out.push(h.ligne(X[0], Y[3], X[1], Y[2], h.a.cache), h.ligne(X[3], Y[3], X[2], Y[2], h.a.cache));

      // un coin à mi-pliage : les deux côtés relevés, le carré du coin pincé en triangle
      const C = (x, y, zz) => [cx + x + y * 0.5, cy - y * 0.34 - zz];
      const blanc = `fill="#FFFFFF" ${h.a.arete.replace('fill="none" ', '')}`;
      const fc = pts => h.path(P(pts.map(p => C(...p)), true), blanc);
      const a = 1.2 * m, d = m / Math.SQRT2;
      out.push(fc([[0, 0, 0], [a, 0, 0], [a, a, 0], [0, a, 0]]));            // un bout du fond
      out.push(fc([[0, 0, 0], [0, a, 0], [0, a, m], [0, 0, m]]));            // le petit côté, relevé
      out.push(fc([[0, 0, 0], [a, 0, 0], [a, 0, m], [0, 0, m]]));            // le grand côté, relevé
      const tip = [-d, -d, m];
      out.push(fc([[0, 0, 0], [0, 0, m], tip]));                             // l'oreille, pincée
      out.push(h.path(P([C(0, 0, 0), C(...tip)]), h.a.cache));               // sa diagonale, le pli
      const T = C(...tip), D = C(a * 0.7, 0, m * 0.55);
      out.push(h.fleche(`M ${f(T[0] - 2)} ${f(T[1] - 4)} C ${f(T[0] + 6)} ${f(T[1] - 30)}, ${f(D[0] + 4)} ${f(D[1] - 34)}, ${f(D[0])} ${f(D[1] - 4)}`, h.a.arete));

      // le bac plié, en perspective cavalière
      const Q = (x, y, zz) => [ox + x + y * 0.5, oy - y * 0.34 - zz];
      const face = pts => h.path(P(pts.map(p => Q(...p)), true), `fill="#FFFFFF" ${h.a.arete.replace('fill="none" ', '')}`);
      out.push(face([[0, 0, 0], [L, 0, 0], [L, W, 0], [0, W, 0]]));          // le fond
      out.push(face([[0, W, 0], [L, W, 0], [L, W, m], [0, W, m]]));          // le côté du fond, dedans
      out.push(face([[0, 0, 0], [0, W, 0], [0, W, m], [0, 0, m]]));          // le bout gauche, dedans
      out.push(face([[L, 0, 0], [L, W, 0], [L, W, m], [L, 0, m]]));          // le bout droit, dehors
      out.push(face([[0, 0, 0], [L, 0, 0], [L, 0, m], [0, 0, m]]));          // le côté avant, dehors
      // coin droit : l'oreille déjà rabattue à plat contre le côté avant
      out.push(face([[L, 0, 0], [L, 0, m], [L - m, 0, m]]));
      // coin gauche : même oreille, rabattue de l'autre sens
      out.push(face([[0, 0, 0], [0, 0, m], [m, 0, m]]));
      // le rebord du bac, plus fort
      out.push(h.path(P([Q(0, 0, m), Q(L, 0, m), Q(L, W, m), Q(0, W, m)], true), h.a.contour));
      return out.join('\n');
    },
    renvois: z => {
      const { L, W, m, px, py, cx, cy, ox, oy, Lp, Wp, mp } = toleGeo(z);
      return [
        { n: 9, rond: [11, py + mp + Wp * 0.2], cible: [px + mp, py + mp + Wp * 0.6], texte: 'tôle pliée sur les tiretés' },
        { n: 10, rond: [cx - m * 1.0, z.h - 12], cible: [cx - m * 0.35, cy - m * 0.5], texte: 'coin pincé en oreille, rabattu au côté' },
        { n: 11, rond: [z.l - 14, 14], cible: [ox + L - m / 3, oy - m * 0.6], texte: 'le bac plié, les oreilles à plat' },
      ];
    },
  };

  // ════════════════════════════════════════════════════════════════════════════════════════
  // 5. À défaut de contenant : le creux dans la neige tassée, doublé d'un sac
  // ════════════════════════════════════════════════════════════════════════════════════════
  const sacGeo = z => {
    const ys = z.h - 44, cx = z.l / 2, demi = Math.min(mm(230), z.l / 2 - 50), pr = mm(55);
    return { ys, cx, demi, pr };
  };
  const sac = {
    titre: 'À défaut : un creux doublé d’un sac',
    dessin: z => {
      const { ys, cx, demi, pr } = sacGeo(z);
      // le creux : un fond plat aux bords arrondis
      const creux = [
        [cx - demi, ys], ...arc(cx - demi + pr, ys, pr, pr, 180, 90, 10).slice(1),
        ...arc(cx + demi - pr, ys, pr, pr, 90, 0, 10),
      ];
      const neigeCreusee = [[4, ys], ...creux, [z.l - 4, ys], [z.l - 4, z.h - 4], [4, z.h - 4]];
      const out = [h.path(P(neigeCreusee, true), h.a.hachure('neige', 'aucun'))];
      // le bouillon, en couche mince
      const yl = ys + pr * 0.45;
      const dedans = creux.filter(p => p[1] >= yl);
      const xg = cx - demi + pr - Math.sqrt(pr * pr - (yl - ys) * (yl - ys));
      const xd = cx + demi - pr + Math.sqrt(pr * pr - (yl - ys) * (yl - ys));
      out.push(h.path(P([[xg, yl], ...dedans, [xd, yl]], true), h.a.hachure('eau', 'aucun')));
      out.push(h.ligne(xg + 1, yl, xd - 1, yl, h.a.arete));
      // la surface de la neige
      out.push(h.ligne(4, ys, cx - demi, ys, h.a.arete), h.ligne(cx + demi, ys, z.l - 4, ys, h.a.arete));
      // le bord du creux taillé, en trait fin
      out.push(h.path(P(creux), h.a.fin));
      // le sac : il épouse le creux juste en dedans et déborde à plat sur la neige
      const deb = 36, ep = 2.6;
      const sacPts = [
        [cx - demi - deb, ys - 1.4], [cx - demi - 1, ys - 1.4],
        ...arc(cx - demi + pr, ys, pr - ep, pr - ep, 180, 90, 10),
        ...arc(cx + demi - pr, ys, pr - ep, pr - ep, 90, 0, 10),
        [cx + demi + 1, ys - 1.4], [cx + demi + deb, ys - 1.4],
      ];
      out.push(h.path(P(sacPts), h.a.contour));
      // le bout du sac replié dessous, de chaque côté
      for (const s of [-1, 1]) {
        const xb = cx + s * (demi + deb);
        out.push(h.path(P(arc(xb, ys - 0.2, 1.2, 1.2, s < 0 ? 270 : -90, s < 0 ? 90 : 90, 6)), h.a.arete));
      }
      return out.join('\n');
    },
    renvois: z => {
      const { ys, cx, demi, pr } = sacGeo(z);
      return [
        { n: 12, rond: [cx + demi + 10, ys - 30], cible: [cx + demi - pr * 0.3, ys + pr * 0.1], texte: 'creux dans la neige, doublé d’un sac' },
      ];
    },
  };

  return {
    ref: '23-40',
    titre: 'Refroidir le bouillon : en plats bas, dans la neige',
    desc: 'Le bouillon chaud se partage tout de suite à la louche en plats larges et bas. '
      + 'Comparaison : le chaudron plein et couvert posé sur la croûte ne touche la neige que par le fond ; '
      + 'les plats bas assis dans un trou gros comme un bac à vaisselle, à demi couverts, la neige tassée à la main jusqu’au bord. '
      + 'À défaut de plats : une tôle pliée en bac, les coins repliés en oreille ; un creux dans la neige tassée et doublé d’un sac. '
      + 'Encadré danger : le chaudron plein laissé refroidir seul se jette au matin.',
    format: 'pleine',
    disposition: [['verser'], ['croute', 'enneige'], ['tole', 'sac']],
    hauteurs: [1.0, 1.15, 0.95],
    largeurs: [[1], [2, 3], [2.1, 1]],
    vues: { verser, croute, enneige, tole, sac },
    danger: 'Un chaudron plein laissé refroidir seul passe la nuit entre 4 et 60 °C : il se jette au matin. '
      + 'La cuisson du lendemain ne détruit pas toutes les toxines déjà produites.',
  };
};
