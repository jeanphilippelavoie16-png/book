// Planche 10-01 (demi-page). La chaîne de l'eau en trois temps : décanter, passer au tissu, bouillir.
// Le texte : ch. 10, étapes 7 à 9 (laisser reposer de 12 à 24 h ; siphonner par-dessus le dépôt, sans le remettre en
// suspension ; préfiltrer à travers trois ou quatre épaisseurs de coton serré), étapes 12 et 13 (gros bouillons,
// chronométrés à partir du moment où toute la surface roule ; couvrir pendant l'ébullition), et la variante d'urgence
// « La chaîne complète, version dégradée » (deux chaudières, quatre épaisseurs de coton, bouillir, refroidir couvert).
//
// Refaite le 18 octobre 2026 au composeur (l'ancienne était un SVG écrit à la main : eau en tirets gris, pied
// « Planche 10-01 — » dans le dessin, quatre repères sans légende).
//
// Deux vues : « Décanter, puis passer au tissu » (la première chaudière sur un billot, le boyau qui prend l'eau
// au-dessus du dépôt, la seconde chaudière plus bas, coiffée d'une taie d'oreiller pliée en deux, soit quatre
// épaisseurs, attachée sous le bord) et « Bouillir » (la marmite couverte sur deux pierres, au-dessus du feu).
// Aucune cote : ce sont des gestes, pas une construction (règle 4) ; la hauteur à laisser au fond est dans la légende,
// d'après l'étape 8 (« les deux ou trois derniers centimètres »).
// Aucune main : le boyau repose sur le bord et la taie est attachée ; rien n'est tenu.
// Le rouge : le bout du boyau au-dessus du dépôt (repère 3) ; la surface qui roule (repère 4).

module.exports = (h) => {
  const A = h.a;
  const f = v => Math.round(v * 10) / 10;
  const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');

  // hasard reproductible et point dans un polygone, pour le pointillé du dépôt
  const alea = graine => {
    let s = graine >>> 0;
    return () => {
      s = (s + 0x6D2B79F5) >>> 0;
      let t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };
  const dedans = ([x, y], poly) => {
    let c = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const [xi, yi] = poly[i], [xj, yj] = poly[j];
      if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
    }
    return c;
  };
  const pointille = (poly, graine, pas) => {
    const r = alea(graine), out = [];
    const xs = poly.map(p => p[0]), ys = poly.map(p => p[1]);
    const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
    const n = Math.round(((x1 - x0) * (y1 - y0)) / pas);
    for (let i = 0; i < n; i++) {
      const p = [x0 + r() * (x1 - x0), y0 + r() * (y1 - y0)];
      if (dedans(p, poly)) out.push(h.cercle(p[0], p[1], 0.75, A.plein));
    }
    return out;
  };
  // une chaudière évasée : le fond (xb0..xb1, yb), le bord (xt0..xt1, yt) ; x à la hauteur y, côté gauche ou droit
  const paroi = (c, y, cote) => {
    const t = (c.yb - y) / (c.yb - c.yt);
    return cote === 'g' ? c.xb0 + (c.xt0 - c.xb0) * t : c.xb1 + (c.xt1 - c.xb1) * t;
  };
  const chaudiere = c => {
    const out = [];
    out.push(h.chemin([[c.xt0, c.yt], [c.xb0, c.yb], [c.xb1, c.yb], [c.xt1, c.yt]], A.contour));
    // le bourrelet du bord
    out.push(h.ligne(c.xt0 - 3, c.yt, c.xt0 + 3, c.yt, A.contour), h.ligne(c.xt1 - 3, c.yt, c.xt1 + 3, c.yt, A.contour));
    return out;
  };
  // l'eau dans une chaudière, du niveau y au fond (ou jusqu'à yBas)
  const eau = (c, y, yBas = c.yb) => {
    const pts = [[paroi(c, y, 'g') + 1.2, y], [paroi(c, y, 'd') - 1.2, y], [paroi(c, yBas, 'd') - 1.2, yBas], [paroi(c, yBas, 'g') + 1.2, yBas]];
    return [h.chemin(pts, A.hachure('eau', 'aucun'), true), h.ligne(pts[0][0], y, pts[1][0], y, A.arete)];
  };
  // un boyau : un trait noir épais, le cœur blanc
  const boyau = d => [
    h.path(d, 'fill="none" stroke="#1A1A1A" stroke-width="7" stroke-linecap="butt" stroke-linejoin="round"'),
    h.path(d, 'fill="none" stroke="#FFFFFF" stroke-width="3.8" stroke-linecap="butt" stroke-linejoin="round"'),
  ];
  const goutte = (x, y) => h.path(`M${f(x)},${f(y - 3.2)} C${f(x + 0.6)},${f(y - 1.6)} ${f(x + 1.9)},${f(y - 0.4)} ${f(x + 1.9)},${f(y + 0.9)} A1.9,1.9 0 0 1 ${f(x - 1.9)},${f(y + 0.9)} C${f(x - 1.9)},${f(y - 0.4)} ${f(x - 0.6)},${f(y - 1.6)} ${f(x)},${f(y - 3.2)} Z`, A.plein);

  // ── Décanter, puis passer au tissu ─────────────────────────────────────────
  const geoA = z => {
    const yS = z.h - 8;                                      // le sol
    const bil = { x0: 26, x1: 150, y0: yS - 84 };            // le billot
    const c1 = { xt0: 22, xt1: 154, yt: 34, xb0: 34, xb1: 142, yb: bil.y0 };   // la première chaudière
    const yEau1 = c1.yt + 22, yDep = c1.yb - 13;             // le niveau de l'eau, le dessus du dépôt
    const c2 = { xt0: z.l - 150, xt1: z.l - 26, yt: yS - 112, xb0: z.l - 140, xb1: z.l - 36, yb: yS };
    const xIn = 72, yIn = yDep - 13;                          // le bout du boyau, au-dessus du dépôt
    const yTaie = c2.yt + 44;                                 // le creux de la taie
    const xOut = (c2.xt0 + c2.xt1) / 2 - 6;
    return { yS, bil, c1, yEau1, yDep, c2, xIn, yIn, yTaie, xOut };
  };

  const vueA = z => {
    const g = geoA(z), { c1, c2, bil } = g, out = [];
    // le sol
    out.push(h.rect(0, g.yS, z.l, 8, A.hachure('terre', 'aucun')), h.ligne(0, g.yS, z.l, g.yS, A.arete));
    // le billot : une bûche debout, la face de droite à l'ombre, le dessus en bois de bout
    out.push(h.rect(bil.x0, bil.y0, bil.x1 - bil.x0, g.yS - bil.y0, blanc(A.arete)));
    out.push(h.rect(bil.x1 - 18, bil.y0, 18, g.yS - bil.y0, A.ombre));
    out.push(h.ligne(bil.x0 + 30, bil.y0 + 10, bil.x0 + 30, g.yS - 12, A.detail));
    out.push(h.ligne(bil.x0 + 74, bil.y0 + 22, bil.x0 + 74, g.yS - 4, A.detail));
    out.push(h.rect(bil.x0, bil.y0, bil.x1 - bil.x0, g.yS - bil.y0, A.contour));
    // la première chaudière : l'eau reposée, le dépôt au fond
    out.push(...eau(c1, g.yEau1, g.yDep));
    const dep = [[paroi(c1, g.yDep, 'g') + 1.2, g.yDep], [paroi(c1, g.yDep, 'd') - 1.2, g.yDep], [c1.xb1 - 1.2, c1.yb - 1], [c1.xb0 + 1.2, c1.yb - 1]];
    out.push(h.chemin(dep, A.hachure('eau', 'aucun'), true));
    out.push(...pointille(dep, 11, 7));
    out.push(h.path(`M${f(dep[0][0])},${f(g.yDep)} Q${f(70)},${f(g.yDep - 2)} ${f(90)},${f(g.yDep)} T${f(dep[1][0])},${f(g.yDep)}`, A.detail));
    out.push(...chaudiere(c1));
    // la seconde chaudière, au sol : l'eau passée qui s'y ramasse
    out.push(...eau(c2, c2.yb - 30));
    out.push(...chaudiere(c2));
    // la taie d'oreiller pliée en deux sur la seconde chaudière : les pans pendent dehors, le creux dedans
    const xg = c2.xt0, xd = c2.xt1, yt = c2.yt;
    const taie = `M${f(xg - 7)},${f(yt + 26)} L${f(xg - 7)},${f(yt - 2)} Q${f(xg - 7)},${f(yt - 6)} ${f(xg + 2)},${f(yt - 5)} `
      + `C${f(xg + 26)},${f(yt + 4)} ${f(g.xOut - 30)},${f(g.yTaie)} ${f(g.xOut + 6)},${f(g.yTaie)} `
      + `C${f(g.xOut + 40)},${f(g.yTaie)} ${f(xd - 26)},${f(yt + 4)} ${f(xd - 2)},${f(yt - 5)} `
      + `Q${f(xd + 7)},${f(yt - 6)} ${f(xd + 7)},${f(yt - 2)} L${f(xd + 7)},${f(yt + 26)} L${f(xd + 2)},${f(yt + 26)} L${f(xd + 2)},${f(yt + 2)} `
      + `C${f(xd - 22)},${f(yt + 8)} ${f(g.xOut + 40)},${f(g.yTaie + 6)} ${f(g.xOut + 6)},${f(g.yTaie + 6)} `
      + `C${f(g.xOut - 30)},${f(g.yTaie + 6)} ${f(xg + 22)},${f(yt + 8)} ${f(xg - 2)},${f(yt + 2)} L${f(xg - 2)},${f(yt + 26)} Z`;
    out.push(h.path(taie, blanc(A.arete)));
    // la corde nouée sous le bord
    out.push(h.rect(xg - 10, yt + 12, 6, 4, A.plein), h.rect(xd + 4, yt + 12, 6, 4, A.plein));
    out.push(h.path(`M${f(xd + 10)},${f(yt + 14)} q6,2 8,10 M${f(xd + 10)},${f(yt + 14)} q9,-1 12,6`, A.arete));
    // les gouttes qui passent le tissu
    out.push(goutte(g.xOut + 6, g.yTaie + 18), goutte(g.xOut + 6, g.yTaie + 34));
    // le boyau : le bout au-dessus du dépôt, par-dessus le bord, puis en descendant jusqu'au creux de la taie
    const d = `M${f(g.xIn)},${f(g.yIn)} L${f(g.xIn)},${f(c1.yt - 2)} Q${f(g.xIn)},${f(c1.yt - 26)} ${f(g.xIn + 26)},${f(c1.yt - 26)} `
      + `Q${f(c1.xt1 + 10)},${f(c1.yt - 26)} ${f(c1.xt1 + 34)},${f(c1.yt + 6)} `
      + `C${f(c1.xt1 + 70)},${f(c1.yt + 50)} ${f(g.xOut - 14)},${f(g.yTaie - 60)} ${f(g.xOut)},${f(g.yTaie - 8)}`;
    out.push(...boyau(d));
    // l'eau qui monte dans le boyau
    out.push(h.fleche(`M${f(g.xIn + 12)},${f(g.yIn + 4)} L${f(g.xIn + 12)},${f(g.yIn - 34)}`, A.detail));
    // le point à contrôler : le bout du boyau, au-dessus du dépôt
    out.push(h.controle(g.xIn, g.yIn + 4, 11));
    return out.join('\n');
  };

  // ── Bouillir ───────────────────────────────────────────────────────────────
  const geoB = z => {
    const yS = z.h - 8, cx = z.l / 2;
    const m = { x0: cx - 66, x1: cx + 66, yb: yS - 58, yt: yS - 168 };   // la marmite
    const ySurf = m.yt + 34;                                                  // la surface qui roule
    return { yS, cx, m, ySurf };
  };
  const vueB = z => {
    const g = geoB(z), { m, cx } = g, out = [];
    out.push(h.rect(0, g.yS, z.l, 8, A.hachure('terre', 'aucun')), h.ligne(0, g.yS, z.l, g.yS, A.arete));
    // le feu : trois bûches et des flammes entre deux pierres
    const pierre = s => `M${f(cx + s * 76)},${f(g.yS)} Q${f(cx + s * 82)},${f(m.yb + 18)} ${f(cx + s * 72)},${f(m.yb + 1)} L${f(cx + s * 46)},${f(m.yb)} Q${f(cx + s * 38)},${f(m.yb + 20)} ${f(cx + s * 43)},${f(g.yS)} Z`;
    [[-14, 0], [0, -6], [14, 0]].forEach(([dx, dy]) => {
      const x = cx + dx, yb = g.yS - 18, top = m.yb + 14 + dy, w = 6;
      out.push(h.path(`M${f(x - w)},${f(yb)} C${f(x - w - 1)},${f(yb - 10)} ${f(x - 2)},${f(top + 7)} ${f(x)},${f(top)} C${f(x + 2)},${f(top + 8)} ${f(x + w + 1)},${f(yb - 9)} ${f(x + w)},${f(yb)}`, blanc(A.arete)));
    });
    [[-17, 9], [17, 9], [0, 9]].forEach(([dx, r], i) => {
      const y = i === 2 ? g.yS - 2 * r + 1 : g.yS - r;
      out.push(h.cercle(cx + dx, y, r, A.blanc), h.cercle(cx + dx, y, r, A.hachure('bois')));
    });
    out.push(h.path(pierre(-1), A.hachure('pierre')), h.path(pierre(1), A.hachure('pierre')));
    // l'eau qui bout : la surface en dômes, des bulles qui montent en grossissant
    const dome = [];
    const n = 6, lg = (m.x1 - m.x0 - 2.4) / n;
    let dS = `M${f(m.x0 + 1.2)},${f(g.ySurf)}`;
    for (let i = 0; i < n; i++) {
      const xa = m.x0 + 1.2 + i * lg, hb = i % 2 ? 7 : 10;
      dS += ` Q${f(xa + lg / 2)},${f(g.ySurf - hb)} ${f(xa + lg)},${f(g.ySurf)}`;
    }
    dome.push(dS);
    out.push(h.path(`${dS} L${f(m.x1 - 1.2)},${f(m.yb)} L${f(m.x0 + 1.2)},${f(m.yb)} Z`, A.hachure('eau', 'aucun')));
    out.push(h.path(dS, A.arete));
    [-40, -4, 32].forEach((dx, k) => {
      [[m.yb - 12, 2], [m.yb - 34, 3], [m.yb - 58, 4], [g.ySurf + 14, 5.2]].forEach(([y, r], j) => {
        const x = cx + dx + ((j + k) % 2 ? 4 : -3);
        out.push(h.cercle(x, y, r, blanc(A.detail)));
      });
    });
    // la marmite, ses poignées et son couvercle
    out.push(h.chemin([[m.x0, m.yt], [m.x0, m.yb], [m.x1, m.yb], [m.x1, m.yt]], A.contour));
    out.push(h.path(`M${f(m.x0)},${f(m.yt + 12)} L${f(m.x0 - 9)},${f(m.yt + 12)} Q${f(m.x0 - 14)},${f(m.yt + 12)} ${f(m.x0 - 14)},${f(m.yt + 17)} Q${f(m.x0 - 14)},${f(m.yt + 22)} ${f(m.x0 - 9)},${f(m.yt + 22)} L${f(m.x0)},${f(m.yt + 22)}`, A.arete));
    out.push(h.path(`M${f(m.x1)},${f(m.yt + 12)} L${f(m.x1 + 9)},${f(m.yt + 12)} Q${f(m.x1 + 14)},${f(m.yt + 12)} ${f(m.x1 + 14)},${f(m.yt + 17)} Q${f(m.x1 + 14)},${f(m.yt + 22)} ${f(m.x1 + 9)},${f(m.yt + 22)} L${f(m.x1)},${f(m.yt + 22)}`, A.arete));
    out.push(h.path(`M${f(m.x0 - 6)},${f(m.yt)} Q${f(cx)},${f(m.yt - 22)} ${f(m.x1 + 6)},${f(m.yt)} Z`, blanc(A.contour)));
    out.push(h.path(`M${f(cx - 9)},${f(m.yt - 11)} L${f(cx - 7)},${f(m.yt - 20)} L${f(cx + 7)},${f(m.yt - 20)} L${f(cx + 9)},${f(m.yt - 11)}`, blanc(A.arete)));
    // le point à contrôler : toute la surface roule
    out.push(h.controle(cx + 26, g.ySurf - 3, 13));
    return out.join('\n');
  };

  return {
    ref: '10-01',
    fichier: 'planche-10-01-trois-temps-eau.svg',
    titre: 'Décanter, passer au tissu, bouillir',
    desc: 'Deux vues côte à côte, en coupe, sur le même sol. À gauche, une chaudière d’eau posée sur un billot : l’eau a reposé, la boue fait un dépôt au fond, et un boyau prend l’eau juste au-dessus du dépôt, passe par-dessus le bord et descend jusqu’à une seconde chaudière posée au sol, plus bas. Cette seconde chaudière est coiffée d’une taie d’oreiller pliée en deux, soit quatre épaisseurs de coton, attachée sous le bord ; le bout du boyau se vide dans le creux du tissu et l’eau passée goutte au fond. À droite, la marmite couverte, posée sur deux pierres au-dessus d’un feu : toute la surface de l’eau roule en dômes et des bulles montent du fond.',
    format: 'demi',
    disposition: [['a', 'b']],
    largeurs: [[2.05, 1]],
    vues: {
      a: {
        titre: 'Décanter, puis passer au tissu',
        dessin: vueA,
        renvois: z => {
          const g = geoA(z), { c1, c2 } = g;
          return [
            { n: 1, rond: [c1.xt1 + 22, g.yDep + 2], cible: [c1.xb1 - 14, g.yDep + 6], texte: 'laisser reposer de 12 à 24 h' },
            { n: 2, rond: [c2.xt0 - 30, c2.yt + 40], cible: [c2.xt0 - 7, c2.yt + 20], texte: 'attacher une taie pliée en deux' },
            { n: 3, rond: [c1.xt1 + 22, g.yIn - 34], cible: [g.xIn + 11, g.yIn + 2], texte: 'tenir le bout au-dessus du dépôt' },
          ];
        },
      },
      b: {
        titre: 'Bouillir',
        dessin: vueB,
        renvois: z => {
          const g = geoB(z), { m, cx } = g;
          return [
            { n: 4, rond: [z.l - 12, g.ySurf + 30], cible: [cx + 38, g.ySurf + 2], texte: 'chronométrer quand toute la surface roule' },
            { n: 5, rond: [z.l - 12, m.yt - 34], cible: [cx + 34, m.yt - 10], texte: 'couvrir, et laisser refroidir couvert' },
          ];
        },
      },
    },
  };
};
