// Planche 25-42. Des mitaines dans une manche de chandail (chapitre 25, §9, « Des mitaines dans
// une manche de chandail »).
// Dessinée le 15 octobre 2026 (inventaire des planches, priorité moyenne).
// Ce que dit le chapitre : une manche de chandail de laine coupée au coude, le poignet gardé côté
// poignet, le bout cousu, le pouce taillé dans le reste du chandail (ch. 104) ; quatre doigts
// ensemble se partagent leur chaleur.
// Ce que le chapitre ne dit pas et que la planche dessine en principe, sans cote : la main posée à
// plat sur la manche sert de mesure (le poignet au poignet de la manche, le bout cousu passé le
// bout des doigts) ; le pouce passe par une fente dans le pli de la manche, à la base du pouce ; la
// pièce du pouce est un rectangle plié en deux, cousu sur le long et arrondi au bout, en tube fermé,
// puis cousu tout autour de la fente. Construction de couture courante, non sourcée ici : voir le
// rapport de la planche [À VÉRIFIER].
// Aucune cote : le chapitre n'en donne pas ; la main donne l'échelle.
// Charte : la manche et la pièce du pouce pèsent (contour), le chandail entier est fin. Pas de rouge
// de geste : rien ne bouge ; le cercle rouge marque la fente, l'endroit qu'on rate.
module.exports = (h) => {
  const A = h.a, F = h.formes;
  const f1 = v => Math.round(v * 10) / 10;
  const W = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const RAD = Math.PI / 180;
  const lisse = (pts, ferme = false) => {
    const n = pts.length, P = i => ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
    let d = `M${f1(pts[0][0])} ${f1(pts[0][1])}`;
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
      d += ` C${f1(p1[0] + (p2[0] - p0[0]) / 6)} ${f1(p1[1] + (p2[1] - p0[1]) / 6)} ${f1(p2[0] - (p3[0] - p1[0]) / 6)} ${f1(p2[1] - (p3[1] - p1[1]) / 6)} ${f1(p2[0])} ${f1(p2[1])}`;
    }
    return ferme ? d + ' Z' : d;
  };
  // des points de couture le long d'une polyligne : petits traits en travers
  const points = (pts, pas = 7, l = 3.2) => {
    const o = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i], b = pts[i + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]), u = [(b[0] - a[0]) / L, (b[1] - a[1]) / L];
      for (let t = pas / 2; t < L; t += pas) { const p = [a[0] + u[0] * t, a[1] + u[1] * t]; o.push(h.ligne(p[0] - u[0] * l / 2, p[1] - u[1] * l / 2, p[0] + u[0] * l / 2, p[1] + u[1] * l / 2, A.arete)); }
    }
    return o.join('\n');
  };
  // les côtes d'un poignet de tricot : traits fins parallèles à l'axe de la manche
  const cotes = (x0, x1, y0, y1, pas = 4) => {
    const o = [];
    for (let y = y0 + pas; y < y1 - 1; y += pas) o.push(h.ligne(x0 + 1, y, x1 - 1, y, A.fin));
    return o.join('\n');
  };

  // ─── 1. Le chandail, à plat : où couper ─────────────────────────────────────────────────────
  const chandail = z => {
    const o = [], P = {};
    const cx = z.l * 0.5, top = 22, bas = z.h - 8;
    const lc = 74;                              // demi-largeur du corps
    const ep = [cx - lc, top + 12], epD = [cx + lc, top + 12];
    // la manche gauche du dessin (celle qu'on coupe) : de l'épaule au poignet, en biais vers le bas
    const ang = 28 * RAD, Lm = 210, wm0 = 52, wm1 = 30;
    const manche = (s) => {
      const E = s < 0 ? ep : epD, u = [s * Math.cos(ang), Math.sin(ang)], n = [-u[1] * s, u[0] * s];
      const haut0 = E, bas0 = [E[0], E[1] + wm0 * 1.25];
      const haut1 = [E[0] + u[0] * Lm, E[1] + u[1] * Lm], bas1 = [haut1[0] - n[0] * wm1 * s * -1, haut1[1] + n[1] * 0 + wm1 * Math.cos(ang)];
      return { haut0, bas0, haut1, bas1, u };
    };
    const g = manche(-1), d = manche(1);
    // le corps et les deux manches, d'un seul contour
    const corps = [g.haut1, g.haut0, [cx - 26, top], [cx + 26, top], d.haut0, d.haut1, d.bas1, d.bas0, [cx + lc, bas], [cx - lc, bas], g.bas0, g.bas1];
    o.push(h.chemin(corps, W(A.arete), true));
    // l'encolure, les côtes du bas et des poignets
    o.push(h.path(`M${f1(cx - 26)} ${f1(top)} Q${f1(cx)} ${f1(top + 26)} ${f1(cx + 26)} ${f1(top)}`, A.arete));
    o.push(h.path(`M${f1(cx - 32)} ${f1(top - 1)} Q${f1(cx)} ${f1(top + 34)} ${f1(cx + 32)} ${f1(top - 1)}`, A.detail));
    o.push(h.ligne(cx - lc, bas - 16, cx + lc, bas - 16, A.detail));
    for (let x = cx - lc + 6; x < cx + lc - 2; x += 6) o.push(h.ligne(x, bas - 15, x, bas - 1, A.fin));
    for (const m of [g, d]) {
      const t = 16, a = [m.haut1[0] - m.u[0] * t, m.haut1[1] - m.u[1] * t], b = [m.bas1[0] - m.u[0] * t, m.bas1[1] - m.u[1] * t];
      o.push(h.ligne(a[0], a[1], b[0], b[1], A.detail));
      for (let k = 1; k < 5; k++) { const p = [a[0] + (b[0] - a[0]) * k / 5, a[1] + (b[1] - a[1]) * k / 5]; o.push(h.ligne(p[0], p[1], p[0] + m.u[0] * t, p[1] + m.u[1] * t, A.fin)); }
    }
    // la coupe au coude : à mi-manche, en travers
    const tc = 0.5, c0 = [g.haut0[0] + (g.haut1[0] - g.haut0[0]) * tc, g.haut0[1] + (g.haut1[1] - g.haut0[1]) * tc];
    const c1 = [g.bas0[0] + (g.bas1[0] - g.bas0[0]) * tc, g.bas0[1] + (g.bas1[1] - g.bas0[1]) * tc];
    const ext = 10, du = [(c1[0] - c0[0]), (c1[1] - c0[1])], L = Math.hypot(du[0], du[1]), uu = [du[0] / L, du[1] / L];
    o.push(h.ligne(c0[0] - uu[0] * ext, c0[1] - uu[1] * ext, c1[0] + uu[0] * ext, c1[1] + uu[1] * ext, `fill="none" stroke="#1A1A1A" stroke-width="1.4" stroke-dasharray="7 3 1.5 3"`));
    P.coupe = [c0[0] - uu[0] * ext, c0[1] - uu[1] * ext];
    // la pièce du pouce, dans le bas du dos : un rectangle tracé au crayon
    const rx = cx + 14, ry = bas - 70, rw = 40, rh = 46;
    o.push(h.rect(rx, ry, rw, rh, `fill="none" stroke="#1A1A1A" stroke-width="1.4" stroke-dasharray="7 3 1.5 3"`));
    P.pouce = [rx + rw, ry + 10];
    return { svg: o.join('\n'), P };
  };

  // ─── 2. La main pour mesure ─────────────────────────────────────────────────────────────────
  // La manche coupée, à plat, le poignet de tricot à gauche ; la main posée dessus, le poignet au
  // poignet, le pouce qui sort par le pli du haut.
  const E2 = 1.05;
  const mesure = z => {
    const o = [], P = {};
    const y0 = z.h * 0.5 - 52, y1 = z.h * 0.5 + 62;           // le pli du haut, le pli du bas
    const xC0 = 70, xC1 = xC0 + 56, xB = xC0 + 56 + 300;        // le poignet de tricot, le bout
    // la manche : un tube aplati qui s'élargit un peu vers le coude
    const contour = [[xC0, y0 + 6], [xB, y0 - 6], [xB, y1 + 6], [xC0, y1 - 6]];
    o.push(h.chemin(contour, W(A.contour), true));
    o.push(h.ligne(xC1, y0 + 4, xC1, y1 - 4, A.arete));
    o.push(cotes(xC0, xC1, y0 + 6, y1 - 6, 5));
    // le bout cousu : la couture en travers, les coins arrondis
    const xs = xB - 12;
    const bout = [[xs - 22, y0 - 1], [xs - 4, y0 + 2], [xs, y0 + 18], [xs, y1 - 18], [xs - 4, y1 - 2], [xs - 22, y1 + 1]];
    o.push(h.path(lisse(bout), A.cache));
    o.push(points([[xs, y0 + 22], [xs, y1 - 22]], 8, 4));
    P.bout = [xs, z.h * 0.5 + 8];
    // la main, à plat dessus, le poignet au poignet de la manche
    const main = F.mainSimple({ x: xC1 - 4, y: z.h * 0.5 + 18, pose: 'ouverte', vue: 'dos', echelle: E2, angle: 0, ancre: 'poignet',
      doigts: { index: { ecart: 0 }, majeur: { ecart: 0 }, annulaire: { ecart: 0 }, auriculaire: { ecart: 0 } }, avantbras: { longueur: 80 } });
    o.push(String(main));
    // la fente, dans le pli du haut, à la base du pouce
    const pc = main.articulations['pouce.mcp'] || main.pouce;
    const xf0 = xC1 + 10, xf1 = Math.max(xf0 + 40, pc[0] + 6);
    o.push(h.ligne(xf0, y0 + 6 - (xf0 - xC0) * 12 / (xB - xC0), xf1, y0 + 6 - (xf1 - xC0) * 12 / (xB - xC0), `fill="none" stroke="#1A1A1A" stroke-width="2.4" stroke-linecap="round"`));
    const fm = [(xf0 + xf1) / 2, y0 + 6 - ((xf0 + xf1) / 2 - xC0) * 12 / (xB - xC0)];
    P.fente = fm; P.fenteL = (xf1 - xf0);
    P.poignet = [xC0 + 20, y1 - 10];
    return { svg: o.join('\n') + '\n' + h.controle(fm[0], fm[1], (xf1 - xf0) / 2 + 8), P };
  };

  // ─── 3. Le pouce, cousu en tube ─────────────────────────────────────────────────────────────
  const pouce = z => {
    const o = [], P = {};
    const cx = z.l * 0.5, cy = z.h * 0.5;
    const w = 46, L = 110;                       // le rectangle plié en deux : demi-largeur, longueur
    const x0 = cx - w / 2, yb = cy + L / 2, yt = cy - L / 2;
    // la pièce pliée : le pli à gauche, la couture à droite et au bout, arrondie
    const forme = [[x0, yb], [x0, yt + 10], [x0 + 4, yt + 2], [x0 + w * 0.5, yt], [x0 + w - 4, yt + 4], [x0 + w, yt + 16], [x0 + w, yb]];
    o.push(h.path(lisse(forme) + ' Z', W(A.contour)));
    o.push(h.ligne(x0 + 6, yb - 2, x0 + 6, yt + 16, A.fin));
    const couture = [[x0 + w - 7, yb - 4], [x0 + w - 7, yt + 18], [x0 + w - 12, yt + 9], [x0 + w * 0.5, yt + 6]];
    o.push(points(couture, 7, 3.6));
    P.couture = [x0 + w - 7, cy];
    P.pli = [x0, cy + 20];
    return { svg: o.join('\n'), P };
  };

  // ─── 4. La mitaine finie ───────────────────────────────────────────────────────────────────
  const fini = z => {
    const o = [], P = {};
    const cy = z.h * 0.58, x0 = 18, xC = x0 + 40, xB = z.l - 14, hw = 40;
    const y0 = cy - hw, y1 = cy + hw;
    // le pouce, sous la manche (peint d'abord) : le tube qui sort de la fente, vers le haut
    const bx = xC + 34, bw = 30;
    const tube = [[bx, y0 + 4], [bx + 6, y0 - 36], [bx + 16, y0 - 62], [bx + 30, y0 - 66], [bx + 40, y0 - 56], [bx + bw + 8, y0 - 24], [bx + bw + 16, y0 + 4]];
    o.push(h.path(lisse(tube), W(A.contour)));
    // la manche : le poignet de tricot à gauche, le bout cousu à droite, arrondi
    const corps = [[x0, y0 + 2], [xB - 26, y0 - 2], [xB - 6, y0 + 6], [xB, cy], [xB - 6, y1 - 6], [xB - 26, y1 + 2], [x0, y1 - 2]];
    o.push(h.path(`M${f1(x0)} ${f1(y0 + 2)} L${f1(xB - 26)} ${f1(y0 - 2)} Q${f1(xB)} ${f1(y0)} ${f1(xB)} ${f1(cy)} Q${f1(xB)} ${f1(y1)} ${f1(xB - 26)} ${f1(y1 + 2)} L${f1(x0)} ${f1(y1 - 2)} Z`, W(A.contour)));
    o.push(h.ligne(xC, y0 + 1, xC, y1 - 1, A.arete));
    o.push(cotes(x0, xC, y0 + 2, y1 - 2, 5));
    // la couture tout autour de la base du pouce, sur le pli
    const base = [[bx - 2, y0 + 3], [bx + (bw + 18) * 0.5, y0 - 6], [bx + bw + 18, y0 + 3]];
    o.push(points([[bx + 2, y0 + 1], [bx + 12, y0 - 4], [bx + bw + 4, y0 - 4], [bx + bw + 14, y0 + 1]], 6, 3.4));
    P.base = [bx + (bw + 16) * 0.5, y0 - 4];
    P.poignet = [x0 + 14, y1 - 6];
    return { svg: o.join('\n'), P };
  };

  const memo = {};
  const G = (fn, z) => { const c = `${fn.name}-${z.l}-${z.h}`; return memo[c] || (memo[c] = fn(z)); };

  return {
    ref: '25-42',
    titre: 'Des mitaines dans une manche de chandail',
    desc: 'Un chandail de laine à plat : la manche se coupe au coude, la pièce du pouce se taille dans le bas du chandail. La manche coupée, à plat, la main posée dessus : le poignet de la manche au poignet, le bout cousu passé le bout des doigts, une fente dans le pli du haut à la base du pouce. La pièce du pouce pliée en deux et cousue en tube fermé au bout. La mitaine finie : le pouce cousu tout autour de la fente.',
    format: 'pleine',
    disposition: [['chandail'], ['mesure'], ['pouce', 'fini']],
    hauteurs: [1, 1.05, 0.9],
    largeurs: [[1], [1], [1, 2.2]],
    vues: {
      chandail: {
        titre: '1. Ce qu’on coupe',
        dessin: z => G(chandail, z).svg,
        renvois: z => {
          const P = G(chandail, z).P;
          return [
            { n: 1, rond: [P.coupe[0] - 30, P.coupe[1] - 14], cible: P.coupe, texte: 'la manche, coupée au coude' },
            { n: 2, rond: [P.pouce[0] + 50, P.pouce[1] - 6], cible: P.pouce, texte: 'le pouce, dans le reste du chandail' },
          ];
        },
      },
      mesure: {
        titre: '2. La main pour mesure',
        dessin: z => G(mesure, z).svg,
        renvois: z => {
          const P = G(mesure, z).P;
          return [
            { n: 3, rond: [P.poignet[0] - 30, P.poignet[1] + 30], cible: P.poignet, texte: 'le poignet de la manche au poignet' },
            { n: 4, rond: [P.bout[0] + 34, P.bout[1] + 50], cible: P.bout, texte: 'le bout cousu' },
            { n: 5, rond: [P.fente[0] - 70, P.fente[1] - 26], cible: [P.fente[0] - P.fenteL / 2 - 8, P.fente[1]], texte: 'une fente à la base du pouce' },
          ];
        },
      },
      pouce: {
        titre: '3. Le pouce',
        dessin: z => G(pouce, z).svg,
        renvois: z => {
          const P = G(pouce, z).P;
          return [
            { n: 6, rond: [P.couture[0] + 40, P.couture[1] - 30], cible: [P.couture[0] + 2, P.couture[1]], texte: 'plié, cousu en tube fermé' },
          ];
        },
      },
      fini: {
        titre: '4. Cousu autour de la fente',
        dessin: z => G(fini, z).svg,
        renvois: z => {
          const P = G(fini, z).P;
          return [
            { n: 7, rond: [P.base[0] + 80, P.base[1] - 30], cible: [P.base[0] + 14, P.base[1] + 2], texte: 'cousu tout autour de la fente' },
          ];
        },
      },
    },
  };
};
