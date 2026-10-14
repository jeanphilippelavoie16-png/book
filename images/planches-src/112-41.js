// Planche 112-41 — la lessive de soude et la trace (ch. 112 : §5-C, étapes 17 et 18 ; §5-D,
// étapes 24 à 27). Complète la 112-10, qui montre la lessive de cendre et le savon mou.
// Le chapitre ne donne aucune dimension du chaudron, de la cuillère ni du contenant : aucune cote.
// Pas de main : l'étape 14 veut des gants, et les mains de la bibliothèque sont nues ; l'objet dans
// sa position et la flèche du geste disent le geste. Pas de personnage dans le raté : les gouttes
// qui montent plus haut que le contenant disent la hauteur du visage.
module.exports = (h) => {
  const A = h.a, F = h.formes;
  const RAD = Math.PI / 180;
  const r1 = n => Math.round(n * 10) / 10;
  const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const bA = blanc(A.arete), bD = blanc(A.detail);
  const pt = p => `${r1(p[0])} ${r1(p[1])}`;
  // rotation d'un point local p (repère de l'objet) de deg degrés, sens horaire, puis translation en o
  const place = (p, o, deg) => { const c = Math.cos(deg * RAD), s = Math.sin(deg * RAD); return [o[0] + p[0] * c - p[1] * s, o[1] + p[0] * s + p[1] * c]; };
  // une ellipse tournée, en chemin (pas de transform : le vérificateur y lirait du texte pivoté)
  const ellipseTournee = (C, rx, ry, ang, at) => {
    const e1 = place([-rx, 0], C, ang), e2 = place([rx, 0], C, ang);
    return h.path(`M${pt(e1)} A${rx} ${ry} ${r1(ang)} 0 1 ${pt(e2)} A${rx} ${ry} ${r1(ang)} 0 1 ${pt(e1)} Z`, at);
  };
  // Un jet, un filet, une coulée : une bande le long d'une cubique P0…P3, large de w0 au départ et w1
  // à l'arrivée, fond blanc, trait fin.
  const bande = (P0, P1, P2, P3, w0, w1, at = bD) => {
    const B = t => { const m = 1 - t; return [0, 1].map(k => m * m * m * P0[k] + 3 * m * m * t * P1[k] + 3 * m * t * t * P2[k] + t * t * t * P3[k]); };
    const g = [], d = [];
    for (let i = 0; i <= 16; i++) {
      const t = i / 16, a = B(Math.max(0, t - 0.01)), b = B(Math.min(1, t + 0.01)), p = B(t);
      const L = Math.hypot(b[0] - a[0], b[1] - a[1]), n = [-(b[1] - a[1]) / L, (b[0] - a[0]) / L], w = (w0 + (w1 - w0) * t) / 2;
      g.push([p[0] + n[0] * w, p[1] + n[1] * w]); d.unshift([p[0] - n[0] * w, p[1] - n[1] * w]);
    }
    return h.chemin(g.concat(d), at, true);
  };
  const NL = String.fromCharCode(10);
  const halo = d => `<path d="${d}" fill="none" stroke="#FFFFFF" stroke-width="4"/>`;

  // ─── pièces communes ─────────────────────────────────────────────────────────────────
  // Le chaudron d'inox en coupe : parois et fond en noir, deux oreilles.
  const chaudron = (cx, sol, W, Hp) => {
    const e = 3, top = sol - Hp;
    const out = [h.rect(cx - W / 2, top, e, Hp, A.plein), h.rect(cx + W / 2 - e, top, e, Hp, A.plein), h.rect(cx - W / 2, sol - e, W, e, A.plein)];
    [-1, 1].forEach(s => out.push(h.path(`M${r1(cx + s * W / 2)} ${r1(top + 7)} C${r1(cx + s * (W / 2 + 12))} ${r1(top + 5)} ${r1(cx + s * (W / 2 + 12))} ${r1(top + 21)} ${r1(cx + s * W / 2)} ${r1(top + 21)}`, A.arete)));
    return { svg: out.join('\n'), top, xi0: cx - W / 2 + e, xi1: cx + W / 2 - e, yi1: sol - e };
  };

  // La cuillère d'inox : le cuilleron centré en B, le manche vers T.
  const cuillere = (B, T, rx = 9, ry = 4.5) => {
    const d = [T[0] - B[0], T[1] - B[1]], L = Math.hypot(d[0], d[1]), u = [d[0] / L, d[1] / L], n = [-u[1], u[0]];
    const a0 = [B[0] + u[0] * rx * 0.85, B[1] + u[1] * rx * 0.85], wm = 1.7, wt = 2.3;
    const manche = [[a0[0] + n[0] * wm, a0[1] + n[1] * wm], [T[0] + n[0] * wt, T[1] + n[1] * wt], [T[0] - n[0] * wt, T[1] - n[1] * wt], [a0[0] - n[0] * wm, a0[1] - n[1] * wm]];
    const ang = Math.atan2(u[1], u[0]) / RAD;
    return {
      svg: [h.chemin(manche, bA, true), ellipseTournee(B, rx, ry, ang, bA)].join('\n'),
      bout: [B[0] - u[0] * rx, B[1] - u[1] * rx],       // la pointe du cuilleron
      sur: y => [B[0] + u[0] * (y - B[1]) / u[1], y],     // le manche à la hauteur y
    };
  };

  // La flèche du brassage : un tour autour du manche, à la surface. L'arrière passe derrière le
  // manche (peint avant la cuillère), l'avant passe devant (peint après).
  const brasse = (c, rx, ry) => {
    const p = t => [c[0] + rx * Math.cos(t * RAD), c[1] + ry * Math.sin(t * RAD)];
    const a = p(200), m = p(360), b = p(468);
    const dAv = `M${pt(m)} A${rx} ${ry} 0 0 1 ${pt(b)}`;
    // la charte : brasser est le geste de la vue, en rouge, devant et derrière le manche
    return {
      arriere: h.path(`M${pt(a)} A${rx} ${ry} 0 0 1 ${pt(m)}`, A.geste),
      avant: [halo(dAv), h.geste(dAv)].join('\n'),
      milieu: p(90), p,
    };
  };

  // Le gobelet, vu de côté, penché de deg degrés (sens horaire) ; o : le milieu de l'ouverture.
  // Rend la lèvre la plus basse, d'où tombe ce qu'il verse.
  const gobelet = (o, deg) => {
    const q = p => place(p, o, deg);
    const corps = `M${pt(q([-13, 0]))} L${pt(q([-10, 25]))} Q${pt(q([0, 28.5]))} ${pt(q([10, 25]))} L${pt(q([13, 0]))} Z`;
    return { svg: [h.path(corps, bA), ellipseTournee(o, 13, 3.4, deg, bA)].join(NL), levre: q([13, 0]), corps: q([0, 14]) };
  };

  // Le petit chaudron de lessive, vu de côté, penché ; o : la lèvre qui verse (coin droit du bord).
  const chaudronPenche = (o, deg, W = 46, H = 34) => {
    const q = p => place(p, o, deg);
    const corps = `M${pt(q([-W, 0]))} L${pt(q([-W, H - 6]))} Q${pt(q([-W, H]))} ${pt(q([-W + 6, H]))} L${pt(q([-6, H]))} Q${pt(q([0, H]))} ${pt(q([0, H - 6]))} L${pt(q([0, 0]))} Z`;
    const out = [h.path(corps, bA), h.ligne(...q([-W, 3]), ...q([0, 3]), A.fin)];
    [[-W, -1], [0, 1]].forEach(([x, s]) => out.push(h.path(`M${pt(q([x, 6]))} C${pt(q([x + s * 10, 5]))} ${pt(q([x + s * 10, 18]))} ${pt(q([x, 18]))}`, A.arete)));
    return { svg: out.join('\n'), levre: o, centre: q([-W / 2, H / 2]) };
  };

  // Une pastille de soude.
  const pastille = (x, y, r = 1.8) => h.cercle(x, y, r, bD);

  // ─── Vue 1 : la soude dans l'eau ─────────────────────────────────────────────────────
  const soude = z => {
    const sol = z.h - 4, W = 104, Hp = 74, cx = z.l / 2 + 4;
    const c = chaudron(cx, sol, W, Hp), top = c.top, yL = top + 20;
    const out = [];
    // l'eau
    out.push(h.rect(c.xi0, yL, c.xi1 - c.xi0, c.yi1 - yL, A.hachure('eau', 'aucun')));
    out.push(h.ligne(c.xi0, yL, c.xi1, yL, A.detail));
    // quelques pastilles qui descendent en se dissolvant
    [[-24, 10, 1.6], [-19, 20, 1.3], [-27, 31, 1.1], [-21, 40, 0.8]].forEach(([dx, dy, r]) => out.push(pastille(cx + dx, yL + dy, r)));
    out.push(c.svg);
    // la cuillère et le brassage
    const cu = cuillere([cx + 14, c.yi1 - 11], [cx + 48, top - 50]);
    const br = brasse(cu.sur(yL), 16, 4.5);
    out.push(br.arriere, cu.svg, br.avant);
    // le gobelet de soude pesée, penché ; les pastilles tombent de la lèvre en un mince filet
    const g = gobelet([cx - 30, top - 44], 105);
    out.push(g.svg);
    const lx = g.levre[0], ly = g.levre[1];
    for (let y = ly + 4, i = 0; y < yL - 2; y += 6, i++) out.push(pastille(lx + (i % 2 ? 0.8 : -0.6), y));
    // le sens du versement
    out.push(h.fleche(`M${r1(lx - 11)} ${r1(ly + 6)} V${r1(top - 4)}`));
    return {
      svg: out.join('\n'),
      renvois: [
        { n: 1, rond: [12, 14], cible: [g.corps[0] - 4, g.corps[1] - 4], texte: 'soude pesée à part' },
        { n: 2, rond: [12, yL + 34], cible: [c.xi0 + 12, yL + 34], texte: 'eau pesée d’abord, chaudron d’inox' },
        { n: 3, rond: [80, 104], cible: [lx + 2, 118], texte: 'verser lentement, en brassant' },
      ],
    };
  };

  // ─── Vue 2 : jamais l'eau sur la soude ───────────────────────────────────────────────
  // La croix barre la vue d'un coin à l'autre ; le gobelet se loge dans le coin gauche de la
  // croix, les gouttes et leurs flèches dans le coin du haut, pour que rien ne s'emmêle aux barres.
  const inverse = z => {
    const sol = z.h - 4, W = 80, Hp = 54, cx = z.l / 2;
    const c = chaudron(cx, sol, W, Hp), top = c.top;
    const out = [];
    // le tas de soude sèche au fond
    for (let k = 0; k < 5; k++) {
      const nb = 11 - 2 * k, y = c.yi1 - 2.2 - k * 3.6;
      for (let i = 0; i < nb; i++) out.push(pastille(cx + (i - (nb - 1) / 2) * 4.1 + (k % 2 ? 0.6 : 0), y, 2));
    }
    const pic = [cx, c.yi1 - 2.2 - 4 * 3.6 - 2.5];
    out.push(c.svg);
    // l'eau versée d'en haut, en un jet, sur le tas
    const g = gobelet([40.4, 99.4], 105);
    const lv = g.levre;
    out.push(bande([lv[0] - 0.5, lv[1] + 0.5], [lv[0] + 8, lv[1] + 8], [pic[0] - 1, pic[1] - 36], [pic[0] - 1, pic[1] - 3], 3.4, 3.8), g.svg);
    // au contact : ça bout d'un coup
    [-170, -145, -122, -60, -35, -10].forEach(a => {
      const u = [Math.cos(a * RAD), Math.sin(a * RAD)];
      out.push(h.ligne(pic[0] + u[0] * 6, pic[1] + u[1] * 6, pic[0] + u[0] * 11, pic[1] + u[1] * 11, A.detail));
    });
    // les gouttes caustiques projetées, plus haut que le gobelet
    [[64, 166], [56, 158], [67, 147], [60, 136], [71, 126], [53, 118], [63, 112], [58, 92], [66, 80],
      [30, 40], [44, 16], [60, 34], [74, 14], [94, 34], [100, 46], [48, 52], [78, 56]]
      .forEach(([x, y]) => out.push(h.cercle(x, y, 1.5, A.plein)));
    out.push(h.fleche(`M54 74 Q47 50 36 26`), h.fleche(`M66 74 Q74 50 86 26`));
    // la charte : le point qui rate, le contact de l'eau sur la soude sèche
    out.push(h.controle(pic[0], pic[1] - 2, 13));
    // barrée
    out.push(h.ligne(6, 8, z.l - 6, z.h - 4, A.arete), h.ligne(z.l - 6, 8, 6, z.h - 4, A.arete));
    return {
      svg: out.join(NL),
      renvois: [
        { n: 4, rond: [12, 140], cible: [pic[0] - 8, pic[1] - 5], texte: 'l’eau bout au contact de la soude' },
        { n: 5, rond: [z.l - 12, 64], cible: [100, 46], texte: 'projette à la hauteur du visage' },
      ],
    };
  };

  // ─── Vue 3 : la lessive dans le gras ─────────────────────────────────────────────────
  const melange = z => {
    const sol = z.h - 4, W = 104, Hp = 74, cx = z.l / 2 + 4;
    const c = chaudron(cx, sol, W, Hp), top = c.top, yL = top + 22;
    const out = [];
    // le gras fondu : traits horizontaux
    for (let y = yL + 4.5; y < c.yi1 - 1; y += 4.5) out.push(h.ligne(c.xi0 + 1, y, c.xi1 - 1, y, A.fin));
    out.push(h.ligne(c.xi0, yL, c.xi1, yL, A.detail));
    out.push(c.svg);
    // la cuillère et le brassage
    const cu = cuillere([cx + 14, c.yi1 - 11], [cx + 48, top - 50]);
    const br = brasse(cu.sur(yL), 16, 4.5);
    out.push(br.arriere, cu.svg, br.avant);
    // le chaudron de lessive, penché : un filet part de la lèvre
    const lv = [cx - 24, top - 48];
    const cp = chaudronPenche(lv, 72);
    const filet = `M${r1(lv[0] - 1)} ${r1(lv[1] + 1)} C${r1(lv[0] + 1)} ${r1(lv[1] + 12)} ${r1(lv[0] + 2)} ${r1(yL - 20)} ${r1(lv[0] + 2)} ${r1(yL)} L${r1(lv[0] + 3.6)} ${r1(yL)} C${r1(lv[0] + 3.6)} ${r1(yL - 20)} ${r1(lv[0] + 2.8)} ${r1(lv[1] + 12)} ${r1(lv[0] + 1.2)} ${r1(lv[1] + 0.5)} Z`;
    out.push(h.path(filet, bD), cp.svg);
    return {
      svg: out.join('\n'),
      renvois: [
        { n: 6, rond: [12, yL + 34], cible: [c.xi0 + 12, yL + 34], texte: 'gras tout juste liquide' },
        { n: 7, rond: [12, 14], cible: [cp.centre[0] - 4, cp.centre[1] - 6], texte: 'lessive à la même température' },
        { n: 8, rond: [cx - 2, top - 10], cible: [lv[0] + 3, top - 16], texte: 'en un filet, jamais d’un coup' },
        { n: 9, rond: [z.l - 12, top - 20], cible: br.p(32), texte: 'brasser sans arrêt' },
      ],
    };
  };

  // ─── Vue 4 : la trace ────────────────────────────────────────────────────────────────
  const trace = z => {
    const rx = 44, ry = 16, cx = z.l / 2, Hc = 44;
    const yb = z.h - 4 - ry, yr = yb - Hc;
    const out = [];
    const clip = 'k112-41-surface';
    // le chaudron en perspective, vu d'un peu haut
    const flanc = `M${r1(cx - rx)} ${r1(yr)} L${r1(cx - rx)} ${r1(yb)} A${rx} ${ry} 0 0 0 ${r1(cx + rx)} ${r1(yb)} L${r1(cx + rx)} ${r1(yr)} Z`;
    out.push(h.path(flanc, bA));
    // la charte : le flanc droit à l'ombre (lumière en haut à gauche)
    {
      const k = 0.45, us = Array.from({ length: 13 }, (_, i) => k + (1 - k) * i / 12), sq = u => ry * Math.sqrt(1 - u * u);
      out.push(h.chemin([...us.map(u => [cx + u * rx, yr + sq(u)]), ...us.slice().reverse().map(u => [cx + u * rx, yb + sq(u)])], A.ombre, true));
      out.push(h.path(flanc, A.contour));   // la charte : le chaudron, objet de la vue, au contour fort
    }
    [-1, 1].forEach(s => out.push(h.path(`M${r1(cx + s * rx)} ${r1(yr + 6)} C${r1(cx + s * (rx + 11))} ${r1(yr + 4)} ${r1(cx + s * (rx + 11))} ${r1(yr + 20)} ${r1(cx + s * rx)} ${r1(yr + 20)}`, A.arete)));
    out.push(h.ellipse(cx, yr, rx, ry, blanc(A.contour)));
    out.push(`<defs><clipPath id="${clip}"><ellipse cx="${r1(cx)}" cy="${r1(yr)}" rx="${rx - 2.5}" ry="${ry - 1.5}"/></clipPath></defs>`);
    // la charte : la paroi du fond, vue par l'ouverture au-dessus du mélange, au gris loin
    out.push(h.ellipse(cx, yr, rx - 2.5, ry - 1.5, A.loin));
    out.push(h.ellipse(cx, yr, rx - 2.5, ry - 1.5, A.fin));
    // la surface du mélange épaissi, et le sillon en relief qu'a laissé la coulée
    const ys = yr + 7;
    const sillon = [[20, -3], [12, -8], [2, -8], [-6, -4], [-4, 2], [-12, 5], [-22, 3], [-28, -2]].map(([u, v]) => [cx + u, ys + v]);
    out.push(`<g clip-path="url(#${clip})">`,
      h.ellipse(cx, ys, rx - 2.5, ry - 1.5, A.blanc),
      h.ellipse(cx, ys, rx - 2.5, ry - 1.5, A.hachure('neige', 'detail')),
      h.path(`M${sillon.map(p => pt([p[0] + 0.5, p[1] + 2.9])).join(' L')}`, A.fin),
      F.corde(sillon, { ep: 4.2, debut: 'ouvert', fin: 'ouvert', trait: 'detail' }),
      '</g>');
    // la cuillère levée, et la coulée qui en retombe sur le bout du sillon
    const cu = cuillere([cx + 22, yr - 46], [cx + 50, 10], 10, 5);
    const bo = cu.bout, fin = sillon[0];
    out.push(bande([bo[0], bo[1] - 1], [bo[0] - 1, bo[1] + 14], [fin[0], fin[1] - 20], [fin[0], fin[1] + 0.5], 4.6, 3), cu.svg);
    out.push(h.fleche(`M${r1(cx + 32)} ${r1(yr - 36)} V${r1(yr - 22)}`));
    // la charte : le point à contrôler, le sillon qui tient à la surface
    out.push(h.controle(cx - 4, ys - 2, 13));
    return {
      svg: out.join(NL),
      renvois: [
        { n: 10, rond: [42, 96], cible: [fin[0] - 2, yr - 20], texte: 'la coulée retombe de la cuillère' },
        { n: 11, rond: [12, yr - 26], cible: [cx - 12, ys + 5], texte: 'le sillon tient une seconde' },
      ],
    };
  };

  const vue = f => ({ dessin: z => f(z).svg, renvois: z => f(z).renvois });

  return {
    ref: '112-41',
    titre: 'La lessive de soude et la trace',
    desc: 'Quatre vignettes côte à côte. D’abord, un chaudron d’inox en coupe, rempli d’eau : un gobelet penché au-dessus laisse tomber la soude pesée à part en un mince filet de pastilles, qui descendent en se dissolvant ; une cuillère d’inox brasse, une flèche tourne autour de son manche. '
      + 'À côté, en plus petit et barré d’une croix : l’inverse, un jet d’eau versé sur un tas de soude sèche au fond du chaudron ; au point de contact ça bout d’un coup, et des gouttes partent en gerbe plus haut que le gobelet qui verse. '
      + 'Ensuite, le gras fondu dans le chaudron en coupe : le deuxième chaudron d’inox, penché, y verse la lessive en un filet pendant que la cuillère brasse sans arrêt. '
      + 'Enfin, la trace, le chaudron vu d’un peu haut : la cuillère levée au-dessus du mélange épaissi, une coulée en retombe et laisse à la surface un sillon en lacet, en relief.',
    format: 'demi',
    disposition: [['soude', 'inverse', 'melange', 'trace']],
    largeurs: [[5, 4, 5, 4]],
    vues: {
      soude: { titre: 'La soude dans l’eau', ...vue(soude) },
      inverse: { titre: 'Jamais l’inverse', ...vue(inverse) },
      melange: { titre: 'La lessive dans le gras', ...vue(melange) },
      trace: { titre: 'La trace', ...vue(trace) },
    },
  };
};
