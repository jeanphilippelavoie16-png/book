// Planche 104-41 — Les outils de couture qu'on fabrique (chapitre 104, §9, « Les outils qu'on se fait »).
// Tout vient du chapitre : l'aiguille de clou (corps limé rond, pointe en trois faces sur la longueur d'un
// ongle, chas percé dans le talon aplati au rouge, ou gorge limée autour du talon, fil noué dedans) ;
// l'alêne (clou de 3 po martelé à froid sur ses deux faces, limé en losange plus mince que large, arêtes
// polies, emmanché dans un bloc de bois franc fendu et ligaturé de babiche mouillée) ; le poinçon (douille
// de cartouche ou bout de tuyau d'acier, bouche limée en biseau par l'intérieur pour que le tranchant
// tombe sur le bord extérieur, frappé au maillet sur du bois de bout) ; la pince à tirer (deux tasseaux
// de bois franc entaillés en V l'un contre l'autre, serrés par un tour de babiche).
// La paume de sellier n'est pas dessinée : elle ne se lit que portée, sur une main, et la main ne serait
// pas assez nette (brief, « le niveau de qualité »).
// Aucune cote : le chapitre ne donne que « 3 po » pour le clou de l'alêne, dit dans le renvoi. Les
// proportions du dessin (aiguille de 64 mm, Ø 2 ; alêne : manche de 100 mm, lame de 40) sont un dessin.
'use strict';

const f1 = v => Math.round(v * 10) / 10;

module.exports = (h) => {
  const A = h.a;
  const NOIR = '#1A1A1A';
  const D = pts => 'M' + pts.map(p => `${f1(p[0])} ${f1(p[1])}`).join(' L');
  const cassureV = (x, y0, y1, amp = 2) => { const o = []; for (let i = 0; i <= 12; i++) { const t = i / 12; o.push([x + Math.sin(t * 2 * Math.PI) * amp, y0 + (y1 - y0) * t]); } return o; };

  // ─── L'aiguille de clou ──────────────────────────────────────────────────────────────────────────
  // repère : l'axe à y0 ; le talon à gauche, la pointe à droite
  const geoAig = z => {
    const y0 = 62, x0 = 30, L = 330, r = 6;     // longueur et rayon du corps (dessin)
    const xp = x0 + L - 62;                      // début des trois faces
    return { y0, x0, L, r, xp, xt: x0 + L };
  };
  const dessinAig = z => {
    const g = geoAig(z), { y0, x0, r, xp, xt } = g, out = [];
    // le talon aplati : une palette plus large que le corps, le chas en long
    const tal = 46, lt = 11;
    const contour = [
      [x0 + 4, y0 - lt], [x0 + tal - 10, y0 - lt], [x0 + tal + 6, y0 - r], [xp, y0 - r], [xt, y0],
      [xp, y0 + r], [x0 + tal + 6, y0 + r], [x0 + tal - 10, y0 + lt], [x0 + 4, y0 + lt],
    ];
    const pts = contour.slice(0, 4).concat([[xt, y0]], contour.slice(5));
    out.push(h.path(`M${f1(x0 + 4)} ${f1(y0 - lt)} L${f1(x0 + tal - 10)} ${f1(y0 - lt)} Q${f1(x0 + tal)} ${f1(y0 - lt)} ${f1(x0 + tal + 6)} ${f1(y0 - r)} L${f1(xp)} ${f1(y0 - r)} L${f1(xt)} ${f1(y0)} L${f1(xp)} ${f1(y0 + r)} L${f1(x0 + tal + 6)} ${f1(y0 + r)} Q${f1(x0 + tal)} ${f1(y0 + lt)} ${f1(x0 + tal - 10)} ${f1(y0 + lt)} L${f1(x0 + 4)} ${f1(y0 + lt)} Q${f1(x0 - 4)} ${f1(y0)} ${f1(x0 + 4)} ${f1(y0 - lt)} Z`, `fill="#FFFFFF" stroke="${NOIR}" stroke-width="2.4" stroke-linejoin="round"`));
    // le chas : une fente arrondie dans la palette
    out.push(h.path(`M${f1(x0 + 10)} ${f1(y0 - 2.6)} L${f1(x0 + 30)} ${f1(y0 - 2.6)} Q${f1(x0 + 33)} ${f1(y0)} ${f1(x0 + 30)} ${f1(y0 + 2.6)} L${f1(x0 + 10)} ${f1(y0 + 2.6)} Q${f1(x0 + 7)} ${f1(y0)} ${f1(x0 + 10)} ${f1(y0 - 2.6)} Z`, `fill="#FFFFFF" stroke="${NOIR}" stroke-width="1.4" stroke-linejoin="round"`));
    // la pointe en trois faces : l'arête du milieu, vue de face
    out.push(h.ligne(xp, y0, xt - 2, y0, A.arete));
    out.push(h.ligne(xp, y0 - r, xp, y0 + r, A.detail));
    // la coupe de la pointe, rabattue à côté, plus grande : un triangle, trois arêtes
    const cx = xt + 74, R = 20;
    const tri = [0, 1, 2].map(k => [cx + R * Math.cos((-90 + 120 * k) * Math.PI / 180), y0 + 4 + R * Math.sin((-90 + 120 * k) * Math.PI / 180)]);
    out.push(h.chemin(tri, A.hachure('metal', 'contour'), true));
    out.push(h.ligne(xp + 30, y0 - r - 9, xp + 30, y0 - r - 2, A.arete), h.ligne(xp + 30, y0 + r + 2, xp + 30, y0 + r + 9, A.arete));
    // la variante : la gorge limée autour du talon, le fil noué dedans, ciré
    const gx = 520, gr = r;
    const g0 = gx - 34;
    out.push(h.path(`M${f1(g0)} ${f1(y0 - gr)} L${f1(gx - 8)} ${f1(y0 - gr)} L${f1(gx - 5)} ${f1(y0 - gr + 3.6)} L${f1(gx + 3)} ${f1(y0 - gr + 3.6)} L${f1(gx + 6)} ${f1(y0 - gr)} L${f1(gx + 16)} ${f1(y0 - gr)} Q${f1(gx + 22)} ${f1(y0)} ${f1(gx + 16)} ${f1(y0 + gr)} L${f1(gx + 6)} ${f1(y0 + gr)} L${f1(gx + 3)} ${f1(y0 + gr - 3.6)} L${f1(gx - 5)} ${f1(y0 + gr - 3.6)} L${f1(gx - 8)} ${f1(y0 + gr)} L${f1(g0)} ${f1(y0 + gr)}`, `fill="#FFFFFF" stroke="${NOIR}" stroke-width="2.4" stroke-linejoin="round"`));
    out.push(h.chemin(cassureV(g0, y0 - gr - 1, y0 + gr + 1, 1.6), A.detail));
    // le nœud dans la gorge, et le fil qui part en arrière, vers le haut
    out.push(h.ellipse(gx - 1, y0 - gr - 1, 7, 4.5, A.plein));
    out.push(h.path(`M${f1(gx - 1)} ${f1(y0 - gr - 4)} Q${f1(gx + 10)} ${f1(y0 - 26)} ${f1(gx + 40)} ${f1(y0 - 40)}`, `fill="none" stroke="${NOIR}" stroke-width="2.4" stroke-linecap="round"`));
    out.push(h.path(`M${f1(gx - 1)} ${f1(y0 + gr - 1)} L${f1(gx - 1)} ${f1(y0 + gr + 1)}`, A.arete));
    return out.join('\n');
  };

  // ─── L'alêne de clou ─────────────────────────────────────────────────────────────────────────────
  const geoAl = z => {
    const y0 = 70, x0 = 28, xm = 330, R = 34;   // le manche de x0 à xm ; son demi-diamètre
    const xb = xm + 140, w = 8;                  // la pointe de la lame ; la demi-largeur de la lame au manche
    return { y0, x0, xm, R, xb, w };
  };
  const dessinAl = z => {
    const g = geoAl(z), { y0, x0, xm, R, xb, w } = g, out = [];
    // le manche : un rondin un peu renflé, fendu depuis le bout de la lame
    const haut = [], bas = [];
    for (let i = 0; i <= 20; i++) {
      const t = i / 20, x = x0 + (xm - x0) * t, rr = R * (0.86 + 0.14 * Math.sin(Math.PI * Math.min(1, t * 1.15)));
      haut.push([x, y0 - rr]); bas.push([x, y0 + rr]);
    }
    const bout = `M${f1(haut[0][0])} ${f1(haut[0][1])} Q${f1(x0 - 12)} ${f1(y0)} ${f1(bas[0][0])} ${f1(bas[0][1])}`;
    out.push(h.path(`${bout} L${bas.slice(1).map(p => `${f1(p[0])} ${f1(p[1])}`).join(' L')} L${f1(haut[20][0])} ${f1(haut[20][1])} L${haut.slice(0, 20).reverse().map(p => `${f1(p[0])} ${f1(p[1])}`).join(' L')} Z`, `fill="#FFFFFF" stroke="${NOIR}" stroke-width="2.4" stroke-linejoin="round"`));
    // la fente du manche, et le clou caché dedans (sa tête au fond)
    out.push(h.ligne(xm, y0, x0 + 130, y0, A.arete));
    out.push(h.chemin([[xm, y0 - 3], [x0 + 170, y0 - 3], [x0 + 170, y0 - 8], [x0 + 162, y0 - 8], [x0 + 162, y0 + 8], [x0 + 170, y0 + 8], [x0 + 170, y0 + 3], [xm, y0 + 3]], A.cache));
    // fil du bois
    [[60, -18, 150], [80, 16, 120], [150, 22, 250], [190, -20, 280]].forEach(([x, dy, x2]) => out.push(h.path(`M${x} ${y0 + dy} Q${(x + x2) / 2} ${y0 + dy * 1.12} ${x2} ${y0 + dy * 0.96}`, A.detail)));
    // la ligature de babiche, au bout du manche, sur la fente
    const l0 = xm - 70, n = 9, pas = 62 / n;
    for (let i = 0; i < n; i++) {
      const xa = l0 + i * pas, rr = R * 0.96 + 3;
      out.push(h.path(`M${f1(xa)} ${f1(y0 - rr)} L${f1(xa + pas)} ${f1(y0 - rr)} L${f1(xa + pas + 3)} ${f1(y0 + rr)} L${f1(xa + 3)} ${f1(y0 + rr)} Z`, `fill="#FFFFFF" stroke="${NOIR}" stroke-width="1.4" stroke-linejoin="round"`));
    }
    // la lame : martelée plate, limée en losange ; l'arête du milieu
    out.push(h.chemin([[xm, y0 - w], [xb - 30, y0 - w * 0.55], [xb, y0], [xb - 30, y0 + w * 0.55], [xm, y0 + w]], `fill="#FFFFFF" stroke="${NOIR}" stroke-width="2.4" stroke-linejoin="round"`, true));
    out.push(h.ligne(xm + 2, y0, xb - 3, y0, A.arete));
    // la coupe de la lame, rabattue, plus grande : un losange plus large qu'épais
    const cx = xb + 76, a = 30, b = 13;
    out.push(h.chemin([[cx - a, y0], [cx, y0 - b], [cx + a, y0], [cx, y0 + b]], A.hachure('metal', 'contour'), true));
    out.push(h.ligne(xm + 70, y0 - w - 12, xm + 70, y0 - w - 3, A.arete), h.ligne(xm + 70, y0 + w + 3, xm + 70, y0 + w + 12, A.arete));
    return out.join('\n');
  };

  // ─── Le poinçon de douille, en coupe ─────────────────────────────────────────────────────────────
  const geoPo = z => {
    const cx = z.l * 0.46, rE = 26, e = 6;       // rayon extérieur, épaisseur de paroi (dessin)
    const yT = 66, yB = 166;                     // haut de la douille, sa bouche
    const cuir = 12, yBois = yB + cuir;
    return { cx, rE, e, yT, yB, cuir, yBois };
  };
  const dessinPo = z => {
    const g = geoPo(z), { cx, rE, e, yT, yB, cuir, yBois } = g, out = [];
    // le bois de bout, dessous
    const bx0 = cx - 110, bx1 = cx + 110;
    out.push(h.rect(bx0, yBois, bx1 - bx0, z.h - yBois - 4, A.blanc));
    out.push(h.ligne(bx0, yBois, bx1, yBois, A.contour), h.ligne(bx0, yBois, bx0, z.h - 4, A.contour), h.ligne(bx1, yBois, bx1, z.h - 4, A.contour));
    // le bois de bout : les cernes vus par la tranche (arcs)
    [0, 1, 2, 3].forEach(k => out.push(h.path(`M${f1(bx0 + 20 + k * 6)} ${f1(z.h - 4)} Q${f1(cx)} ${f1(yBois + 14 + k * 9)} ${f1(bx1 - 20 - k * 6)} ${f1(z.h - 4)}`, A.detail)));
    // le cuir, percé : la rondelle est montée dans la douille
    out.push(h.rect(bx0 + 10, yB, cx - rE - bx0 - 10, cuir, `fill="#FFFFFF" stroke="${NOIR}" stroke-width="1.4"`));
    out.push(h.rect(cx + rE, yB, bx1 - 10 - cx - rE, cuir, `fill="#FFFFFF" stroke="${NOIR}" stroke-width="1.4"`));
    out.push(h.rect(cx - rE + e + 1, yB - cuir - 30, 2 * (rE - e) - 2, cuir, `fill="#FFFFFF" stroke="${NOIR}" stroke-width="1.4"`));
    // la douille en coupe : deux parois, la bouche biseautée par l'intérieur, le culot en haut
    const paroi = s => {
      const xo = cx + s * rE, xi = cx + s * (rE - e);
      return [[xo, yT + 10], [xo, yB], [xi, yB - 16], [xi, yT + 10]];
    };
    [-1, 1].forEach(s => out.push(h.chemin(paroi(s), A.hachure('metal', 'contour'), true)));
    // le culot : un fond plein avec son rebord
    out.push(h.chemin([[cx - rE - 6, yT], [cx + rE + 6, yT], [cx + rE + 6, yT + 10], [cx - rE - 6, yT + 10]], A.hachure('metal', 'contour'), true));
    // le maillet, coupé : il frappe le culot
    // le maillet : une tête de bois ronde vue de côté, le manche qui part vers la droite
    const mh0 = yT - 50, mh1 = yT - 4, mx0 = cx - 56, mx1 = cx + 56;
    out.push(h.chemin([[mx1 - 2, (mh0 + mh1) / 2 - 7], [z.l - 4, (mh0 + mh1) / 2 - 11], [z.l - 4, (mh0 + mh1) / 2 + 3], [mx1 - 2, (mh0 + mh1) / 2 + 7]], A.blanc, true));
    out.push(h.ligne(mx1 - 2, (mh0 + mh1) / 2 - 7, z.l - 4, (mh0 + mh1) / 2 - 11, A.arete), h.ligne(mx1 - 2, (mh0 + mh1) / 2 + 7, z.l - 4, (mh0 + mh1) / 2 + 3, A.arete));
    out.push(h.path(`M${f1(mx0 + 6)} ${f1(mh0)} L${f1(mx1 - 6)} ${f1(mh0)} Q${f1(mx1 + 2)} ${f1((mh0 + mh1) / 2)} ${f1(mx1 - 6)} ${f1(mh1)} L${f1(mx0 + 6)} ${f1(mh1)} Q${f1(mx0 - 2)} ${f1((mh0 + mh1) / 2)} ${f1(mx0 + 6)} ${f1(mh0)} Z`, `fill="#FFFFFF" stroke="${NOIR}" stroke-width="2.4" stroke-linejoin="round"`));
    [-30, 0, 30].forEach(dx => out.push(h.path(`M${f1(cx + dx - 4)} ${f1(mh0 + 8)} Q${f1(cx + dx + 2)} ${f1((mh0 + mh1) / 2)} ${f1(cx + dx - 3)} ${f1(mh1 - 8)}`, A.detail)));
    out.push(h.geste(`M${f1(mx0 - 22)} ${f1(mh0 - 6)} L${f1(mx0 - 22)} ${f1(mh1 + 2)}`));
    return out.join('\n');
  };

  // ─── La pince à tirer ────────────────────────────────────────────────────────────────────────────
  const geoPi = z => {
    const cx = z.l * 0.5, yA = 74;               // l'axe de l'aiguille, vue de côté
    const lb = 150, hb = 26;                     // longueur et épaisseur d'un tasseau
    const ce = [z.l * 0.5, 178];                 // la coupe, en dessous
    return { cx, yA, lb, hb, ce };
  };
  const dessinPi = z => {
    const g = geoPi(z), { cx, yA, lb, hb, ce } = g, out = [];
    // l'aiguille, qui dépasse des deux côtés
    out.push(h.chemin([[cx - lb / 2 - 50, yA - 3], [cx + lb / 2 + 40, yA - 3], [cx + lb / 2 + 62, yA], [cx + lb / 2 + 40, yA + 3], [cx - lb / 2 - 50, yA + 3]], `fill="#FFFFFF" stroke="${NOIR}" stroke-width="1.4" stroke-linejoin="round"`, true));
    // les deux tasseaux, l'un sur l'autre, de côté ; la rainure en V cachée
    [-1, 1].forEach(s => {
      const y = s < 0 ? yA - hb - 1 : yA + 1;
      out.push(h.rect(cx - lb / 2, y, lb, hb, A.blanc), h.rect(cx - lb / 2, y, lb, hb, A.contour));
    });
    out.push(h.ligne(cx - lb / 2, yA - 5, cx + lb / 2, yA - 5, A.cache), h.ligne(cx - lb / 2, yA + 5, cx + lb / 2, yA + 5, A.cache));
    // le tour de babiche, au milieu
    const bx = cx + 30;
    out.push(h.chemin([[bx - 7, yA - hb - 4], [bx + 7, yA - hb - 4], [bx + 11, yA + hb + 4], [bx - 3, yA + hb + 4]], `fill="#FFFFFF" stroke="${NOIR}" stroke-width="1.4" stroke-linejoin="round"`, true));
    // la coupe : deux tasseaux entaillés en V, l'aiguille prise dans le losange
    const lc = 74, hc = 26;
    const vh = 9, vw = 12;
    const haut = [[ce[0] - lc / 2, ce[1] - hc - 1], [ce[0] + lc / 2, ce[1] - hc - 1], [ce[0] + lc / 2, ce[1] - 1], [ce[0] + vw, ce[1] - 1], [ce[0], ce[1] - 1 - vh], [ce[0] - vw, ce[1] - 1], [ce[0] - lc / 2, ce[1] - 1]];
    const bas = haut.map(([x, y]) => [x, 2 * ce[1] - y]);
    out.push(h.chemin(haut, A.hachure('bois', 'contour'), true), h.chemin(bas, A.hachure('bois', 'contour'), true));
    out.push(h.cercle(ce[0], ce[1], 5.6, A.hachure('metal', 'arete')));
    return out.join('\n');
  };

  return {
    ref: '104-41',
    titre: 'Les outils de couture qu’on fabrique',
    desc: 'Quatre outils faits de clous, d’une douille et de bois. L’aiguille de clou : le talon aplati et percé d’un chas en long, le corps rond, la pointe en trois faces, avec sa coupe en triangle ; à côté, la variante à gorge, le fil noué dans la gorge. L’alêne : un clou martelé et limé en losange, pris dans un manche de bois franc fendu et ligaturé de babiche, avec la coupe en losange plus large qu’épaisse. Le poinçon de douille en coupe : la bouche limée en biseau par l’intérieur, le tranchant sur le bord extérieur, frappé au maillet sur du bois de bout ; la rondelle de cuir monte dans la douille. La pince à tirer : deux tasseaux entaillés en V serrés par un tour de babiche, l’aiguille prise entre eux, et leur coupe.',
    format: 'pleine',
    disposition: [['aig'], ['alene'], ['poincon', 'pince']],
    hauteurs: [1, 1, 1.45],
    vues: {
      aig: {
        titre: 'L’aiguille de clou',
        dessin: dessinAig,
        renvois: z => {
          const g = geoAig(z);
          return [
            { n: 1, rond: [g.x0 + 20, 128], cible: [g.x0 + 20, g.y0 + 11], texte: 'talon aplati au rouge, percé d’un clou fin' },
            { n: 2, rond: [g.xp + 4, 128], cible: [g.xp + 26, g.y0 + 4], texte: 'pointe en trois faces, la longueur d’un ongle' },
            { n: 3, rond: [g.xt + 74, 128], cible: [g.xt + 74, g.y0 + 16], texte: 'trois arêtes qui tranchent le cuir' },
            { n: 4, rond: [z.l - 14, 128], cible: [520 - 1, g.y0 + 5], texte: 'ou une gorge, le fil noué dedans, ciré' },
          ];
        },
      },
      alene: {
        titre: 'L’alêne de clou',
        dessin: dessinAl,
        renvois: z => {
          const g = geoAl(z);
          return [
            { n: 5, rond: [g.xm - 34, 138], cible: [g.xm - 34, g.y0 + g.R * 0.96 + 3], texte: 'bois franc fendu, ligaturé de babiche mouillée' },
            { n: 6, rond: [g.xm + 90, 138], cible: [g.xm + 90, g.y0 + 6], texte: 'clou de 3 po martelé, limé en losange' },
            { n: 7, rond: [g.xb + 76, 138], cible: [g.xb + 76, g.y0 + 13], texte: 'plus mince que large, arêtes polies' },
          ];
        },
      },
      poincon: {
        titre: 'Le poinçon de douille, en coupe',
        dessin: dessinPo,
        renvois: z => {
          const g = geoPo(z);
          return [
            { n: 8, rond: [z.l - 16, g.yB - 50], cible: [g.cx + g.rE - g.e / 2 - 1, g.yB - 8], texte: 'bouche limée en biseau par l’intérieur' },
            { n: 9, rond: [16, g.yBois + 22], cible: [g.cx - 80, g.yBois + 16], texte: 'frappé sur du bois de bout' },
          ];
        },
      },
      pince: {
        titre: 'La pince à tirer',
        dessin: dessinPi,
        renvois: z => {
          const g = geoPi(z);
          return [
            { n: 10, rond: [24, g.ce[1] - 30], cible: [g.ce[0] - 30, g.ce[1] - 14], texte: 'deux tasseaux entaillés en V' },
            { n: 11, rond: [z.l - 18, 20], cible: [g.cx + 36, g.yA - g.hb - 4], texte: 'un tour de babiche les serre' },
          ];
        },
      },
    },
  };
};
