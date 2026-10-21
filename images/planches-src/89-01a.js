// Planche 89-01a — Le fût de la raquette, fendre et assouplir (ch. 89, étapes 2 à 6 et 9 à 11)
// La charte : le bâton qu'on assouplit et les deux bouts de l'enture au contour fort ; le flanc
// droit du chaudron à l'ombre. Pas de gris sur le bout de la bille ni sur la coupe (les cernes
// disent déjà la matière). Le rouge : le cœur, à laisser hors du fût (le point qui casse), et le
// va-et-vient (le geste). La flèche de l'éclaté reste noire : c'est la pièce qui se déplace.
// En passant : le manche de la petite brosse sortait de sa vue et entrait dans celle de la coupe ;
// il est raccourci. La flèche du va-et-vient touchait le titre de la vue : elle passe sous le bâton.
// La pastille 11 était assise sur le bâton : elle descend dessous.
module.exports = (h) => ({
  ref: '89-01a',
  titre: 'Le fût de la raquette, fendre et assouplir',
  desc: 'En haut à gauche, le bout d’une bille de bouleau fendue en quatre, un coin de bois enfoncé dans la fente du haut ; dans le quart du haut à droite, tout près de l’écorce, la section d’une baguette tracée le long des cernes, sa face qui regarde le cœur marquée d’un trait épais, et en tireté les fentes qui la détachent. En haut à droite, la section du bâton en grand : plus haut qu’épais, la face du cœur à gauche, les cernes qui courent le long des deux grandes faces, une encoche en V sur le dessus, le dessous arrondi et un peu plus large ; cotes 27 mm de haut, 11 à 14 mm d’épais. Au milieu, le bâton tenu au-dessus d’un chaudron qui bout sur le poêle (dessus en fonte, caisse du foyer avec sa porte et le feu), le milieu du bâton mouillé, une petite brosse qui le frotte, une double flèche pour le va-et-vient ; à droite, la brosse en grand : les deux mâchoires du bâton fendu montent de part et d’autre du chiffon et le pincent, le chiffon plié passe entre elles et retombe en deux lobes, la fente descend sous le chiffon. En bas, le fût en deux pièces : à gauche les deux bouts entaillés chacun à mi-épaisseur sur une longue longueur, l’un au-dessus de l’autre, une flèche qui les réunit ; au milieu les deux bouts réunis sous une ligature serrée de babiche ; à droite, une petite raquette vue de dessus, pointe en haut, l’enture marquée sur un côté entre les deux traverses.',
  format: 'pleine',
  disposition: [['bille', 'coupe'], ['eponger'], ['enture']],
  hauteurs: [3, 2.1, 1.5],
  largeurs: [[3, 2], [1], [1]],
  vues: {
    // ─── La bille, en bout ────────────────────────────────────────────────────────────
    bille: {
      titre: 'La bille, en bout',
      dessin: z => {
        const B = bille(z);
        const out = [];
        B.quarts.forEach(q => {
          out.push(h.path(P(q.secteur) + ' Z', h.a.blanc));
          q.cernes.forEach(c => out.push(h.path(P(c), h.a.fin)));
          out.push(h.path(P(q.ecorce), h.a.detail));
          q.stries.forEach(s => out.push(h.chemin(s, h.a.fin)));
          out.push(h.path(P(q.secteur) + ' Z', h.a.contour));
          out.push(h.cercle(q.moelle[0], q.moelle[1], 2.2, h.a.plein));
        });
        // la baguette, dans le quart du haut à droite, et les fentes qui la détachent
        out.push(h.path(P(B.fenteT), h.a.cache));
        B.fentesR.forEach(f => out.push(h.chemin(f, h.a.cache)));
        out.push(h.path(P(B.baguette) + ' Z', h.a.arete));
        out.push(h.path(P(B.faceCoeur), h.a.contour));
        // le coin, dans la fente du haut
        out.push(h.chemin(B.coin, h.a.blanc, true));
        out.push(h.chemin(B.coin, h.a.hachure('bois', 'arete'), true));
        // le point qui casse : le cœur, qui ne va jamais dans un fût
        out.push(h.controle(B.cx, B.cy, 13));
        return out.join('\n');
      },
      renvois: z => {
        const B = bille(z);
        return [
          { n: 1, rond: [z.l - 34, B.cy + 62], cible: B.quarts[1].moelle, texte: 'le cœur : jamais dans un fût' },
          { n: 2, rond: [B.cx - 74, 18], cible: [B.cx - 5, B.cy - B.R - 4], texte: 'fendue aux coins, en quarts' },
          { n: 3, rond: [z.l - 34, 26], cible: B.pBag(B.ro - 3, -40), texte: 'baguette tirée loin du cœur' },
          { n: 4, rond: [z.l - 34, B.cy - 22], cible: B.pBag(B.ri, -38), texte: 'face qui regardait le cœur' },
        ];
      },
    },

    // ─── Le bâton, en coupe ───────────────────────────────────────────────────────────
    coupe: {
      titre: 'Le bâton, en coupe',
      dessin: z => {
        const C = coupe(z);
        const d = C.forme();
        const cernes = C.cernes().map(c => h.path(P(c), h.a.detail)).join('\n');
        return [
          h.path(d, h.a.blanc),
          `<clipPath id="cp-89-01a-coupe"><path d="${d}" fill="none"/></clipPath>`,
          `<g clip-path="url(#cp-89-01a-coupe)">${cernes}</g>`,
          h.path(d, h.a.contour),
          h.cote(C.x0 + C.W + 18, C.y0, C.x0 + C.W + 18, C.y0 + C.H, '27 mm'),
          h.cote(C.x0, C.y0 + C.H + 18, C.x0 + C.W, C.y0 + C.H + 18, '11 à 14 mm', { cote: 'dessous' }),
        ].join('\n');
      },
      renvois: z => {
        const C = coupe(z);
        return [
          { n: 5, rond: [20, C.y0 + 44], cible: C.pt(0.55, 9), texte: 'face du cœur, côté intérieur' },
          { n: 6, rond: [20, C.y0 + 112], cible: C.pt(6.9, 16), texte: 'cernes le long des faces' },
          { n: 7, rond: [34, 14], cible: C.pt(6.25, 0.9), texte: 'encoche : le dessus' },
          { n: 8, rond: [20, C.y0 + C.H + 8], cible: C.pt(3, 26.2), texte: 'dessous rond et plus large' },
        ];
      },
    },

    // ─── Assouplir à l'eau bouillante ─────────────────────────────────────────────────
    eponger: {
      titre: 'Assouplir à l’eau bouillante',
      dessin: z => {
        const E = eponger(z, h);
        return [
          // poêle : caisse du foyer avec sa porte, dessus en fonte ; coupé au bas de la vue
          h.path(`M${E.poele.x0 + 8},${z.h} L${E.poele.x0 + 8},${E.poele.y + 10} L${E.poele.x1 - 8},${E.poele.y + 10} L${E.poele.x1 - 8},${z.h}`, h.a.blanc),
          h.path(`M${E.poele.x0 + 8},${z.h} L${E.poele.x0 + 8},${E.poele.y + 10} L${E.poele.x1 - 8},${E.poele.y + 10} L${E.poele.x1 - 8},${z.h}`, h.a.contour),
          h.rect(E.porte.x, E.porte.y, E.porte.l, E.porte.h, h.a.arete),
          h.rect(E.porte.x + 5, E.porte.y + 5, E.porte.l - 10, E.porte.h - 10, h.a.fin),
          h.rect(E.porte.x + E.porte.l - 16, E.porte.y + E.porte.h / 2 - 3, 12, 6, h.a.plein),
          ...E.flammes.map(f => h.path(f, h.a.fin)),
          h.rect(E.poele.x0, E.poele.y, E.poele.x1 - E.poele.x0, 10, h.a.hachure('metal', 'arete')),
          h.path(E.chaudron, h.a.blanc),
          h.path(E.ombre, h.a.ombre),
          h.path(E.chaudron, h.a.contour),
          h.ligne(E.cx - 62, E.yBord + 5, E.cx + 62, E.yBord + 5, h.a.detail),
          ...E.vapeur.map(v => h.path(v, h.a.fin)),
          // le bâton : les deux bouts continuent
          h.path(E.baton, h.a.blanc),
          ...E.fil.map(f => h.ligne(f[0], f[1], f[2], f[1], h.a.fin)),
          h.rect(E.zone[0], E.yB, E.zone[1] - E.zone[0], E.hB, h.a.hachure('eau', 'aucun')),
          h.path(E.baton, h.a.contour),
          // la brosse sur le bâton
          ...E.petite,
          // le va-et-vient : le geste
          h.geste(`M${E.fl[0]},${E.fl[2]} L${E.fl[1]},${E.fl[2]}`, { double: true }),
          // la brosse, en grand
          ...E.brosse.map(b => b),
        ].join('\n');
      },
      renvois: z => {
        const E = eponger(z, h);
        return [
          { n: 9, rond: [E.bx - 62, 18], cible: [E.bx - 20, E.yb - 6], texte: 'bâton fendu, chiffon coincé' },
          { n: 10, rond: [E.poele.x0 - 24, E.yBord + 24], cible: [E.cx - 58, E.yBord + 26], texte: 'eau qui bout, sur le poêle' },
          { n: 11, rond: [E.cx - 78, E.yB + E.hB + 22], cible: [E.cx - 38, E.yB + 6], texte: 'milieu du bâton : la pointe' },
          { n: 12, rond: [E.cx + 112, E.yB + E.hB + 22], cible: [E.cx + 36, E.yB + E.hB + 3], texte: 'les deux faces, sans arrêt' },
        ];
      },
    },

    // ─── Fût en deux pièces ──────────────────────────────────────────────────────────
    enture: {
      titre: 'Fût en deux pièces',
      dessin: z => {
        const N = enture(z);
        return [
          // éclaté : le bout de droite au-dessus, le bout de gauche en dessous
          h.path(N.hautEc, h.a.blanc), ...N.filHautEc.map(f => h.path(f, h.a.fin)), h.path(N.hautEc, h.a.contour),
          h.path(N.basEc, h.a.blanc), ...N.filBasEc.map(f => h.path(f, h.a.fin)), h.path(N.basEc, h.a.contour),
          h.fleche(N.flEc),
          // réuni et ligaturé
          h.path(N.ass, h.a.blanc), ...N.filAss.map(f => h.path(f, h.a.fin)),
          h.path(N.joint, h.a.cache),
          h.path(N.epaulements, h.a.arete),
          ...N.tours.map(t => h.chemin(t, h.a.blanc, true) + '\n' + h.chemin(t, h.a.detail, true)),
          h.path(N.ass, h.a.contour),
          // où va l'enture
          h.path(N.mini, h.a.arete),
          ...N.miniTrav.map(t => h.ligne(t[0], t[1], t[2], t[3], h.a.arete)),
          h.chemin(N.miniEnture, h.a.plein, true),
        ].join('\n');
      },
      renvois: z => {
        const N = enture(z);
        return [
          { n: 13, rond: [N.xE0 + 10, z.h - 12], cible: [N.xE0 + 96, N.yEb + N.hB * 0.75], texte: 'longue entaille à mi-bois' },
          { n: 14, rond: [N.xA0 + 150, z.h - 12], cible: [N.xA0 + 108, N.yA + N.hB + 2], texte: 'babiche mouillée, qui serre' },
          { n: 15, rond: [N.xM - 44, z.h - 14], cible: N.pMiniEnture, texte: 'sur un côté, entre traverses' },
        ];
      },
    },
  },
});

// ─── Outils ──────────────────────────────────────────────────────────────────────────────
const r1 = v => Math.round(v * 10) / 10;
const P = pts => pts.map((p, i) => (i ? 'L' : 'M') + r1(p[0]) + ',' + r1(p[1])).join(' ');
const rad = d => d * Math.PI / 180;
const pas = (a, b, n) => Array.from({ length: n + 1 }, (_, i) => a + (b - a) * i / n);
const arc = (cx, cy, r, a0, a1, n = 30) => pas(a0, a1, n).map(a => [cx + r * Math.cos(rad(a)), cy + r * Math.sin(rad(a))]);
const casse = (x, y0, y1, s = 1) => {
  const m = (y0 + y1) / 2;
  return [[x, y0], [x, m - 5], [x + 4 * s, m - 2], [x - 4 * s, m + 2], [x, m + 5], [x, y1]];
};

// Demi-largeur de l'axe du fût d'une raquette queue de castor de 107 × 30 cm, en cm,
// à la distance x de la pointe : un nez en demi-ellipse, puis une queue qui se referme.
function demiLargeur(x) {
  if (x <= 38) return 15 * Math.sqrt(Math.max(0, 1 - ((38 - x) / 38) ** 2));
  const s = Math.min(1, (x - 38) / 57);
  return 0.7 + 14.3 * (1 - (3 * s * s - 2 * s * s * s));
}
function contourRaquette(n = 60) {
  const xs = pas(0, 1, n).map(t => 107 * (1 - Math.cos(Math.PI * t)) / 2);
  const haut = xs.map(x => [x, -demiLargeur(x)]);
  const bas = xs.slice().reverse().map(x => [x, demiLargeur(x)]);
  return haut.concat(bas);
}

// ─── La bille ────────────────────────────────────────────────────────────────────────────
function bille(z) {
  const cx = 150, cy = r1(z.h / 2 + 10), R = 100, g = 4;
  const k = R / 60;                      // px par mm : une bille d'environ 12 cm
  const quarts = [0, 1, 2, 3].map(q => {
    const a0 = -90 + 90 * q, a1 = a0 + 90, m = a0 + 45;
    const dx = g * Math.cos(rad(m)), dy = g * Math.sin(rad(m));
    const T = p => [p[0] + dx, p[1] + dy];
    const secteur = [[cx, cy], ...arc(cx, cy, R, a0, a1, 36)].map(T);
    const cernes = [];
    for (let r = 10; r < R - 9; r += 8.5) {
      cernes.push(pas(a0 + 1.5, a1 - 1.5, 30).map(a => {
        const rr = r + 1.3 * Math.sin(rad(3 * a) + r / 9);
        return T([cx + rr * Math.cos(rad(a)), cy + rr * Math.sin(rad(a))]);
      }));
    }
    const ecorce = arc(cx, cy, R - 6, a0, a1, 36).map(T);
    const stries = pas(a0 + 4, a1 - 4, 11).map(a => [
      T([cx + (R - 5) * Math.cos(rad(a)), cy + (R - 5) * Math.sin(rad(a))]),
      T([cx + (R - 1) * Math.cos(rad(a + 1.5)), cy + (R - 1) * Math.sin(rad(a + 1.5))]),
    ]);
    return { secteur, cernes, ecorce, stries, moelle: T([cx, cy]).map(r1), T };
  });
  // la baguette : 27 mm le long des cernes, environ 13 mm vers le cœur, juste sous l'écorce
  const T0 = quarts[0].T;
  const ro = R - 9, ri = ro - 13 * k, rm = (ro + ri) / 2;
  const da = (27 * k / 2) / ro * 180 / Math.PI;   // 27 mm mesurés sur l'arc extérieur : secteur plus court, proportions de la coupe
  const b0 = -45 - da, b1 = -45 + da;
  const baguette = arc(cx, cy, ro, b0, b1, 12).concat(arc(cx, cy, ri, b1, b0, 12)).map(T0);
  const faceCoeur = arc(cx, cy, ri, b0, b1, 12).map(T0);
  const fenteT = arc(cx, cy, ri, -86, -4, 30).map(T0);
  const fentesR = [b0, b1].map(a => [T0([cx + ri * Math.cos(rad(a)), cy + ri * Math.sin(rad(a))]),
    T0([cx + (R + 2) * Math.cos(rad(a)), cy + (R + 2) * Math.sin(rad(a))])]);
  const pBag = (r, a) => T0([cx + r * Math.cos(rad(a)), cy + r * Math.sin(rad(a))]).map(r1);
  // le coin, enfoncé depuis l'écorce dans la fente du haut
  const yT = cy - R - 14;
  const coin = [[cx - 8, yT], [cx + 8, yT], [cx + 1.2, cy - R + 34], [cx - 1.2, cy - R + 34]];
  return { cx, cy, R, quarts, baguette, faceCoeur, fenteT, fentesR, coin, pBag, ro, ri };
}

// ─── La coupe du bâton ──────────────────────────────────────────────────────────────────
// Repère en mm : x de 0 (face du cœur) à 12,5 ; y de 0 (dessus) à 27 (dessous).
function coupe(z) {
  const s = 6, W = 12.5 * s, H = 27 * s;
  const x0 = r1(z.l / 2 - W / 2 - 8), y0 = r1((z.h - H) / 2 - 12);
  const pt = (x, y) => [r1(x0 + x * s), r1(y0 + y * s)];
  const Q = (x, y) => pt(x, y).join(',');
  const forme = () => `M${Q(2, 0)} L${Q(5.2, 0)} L${Q(6.25, 1.7)} L${Q(7.3, 0)} L${Q(10.4, 0)} Q${Q(11.2, 0)} ${Q(11.3, 0.8)} `
    + `L${Q(12.5, 19)} C${Q(12.5, 24.6)} ${Q(9.6, 27)} ${Q(6.25, 27)} C${Q(2.9, 27)} ${Q(0, 24.6)} ${Q(0, 19)} `
    + `L${Q(1.2, 0.8)} Q${Q(1.3, 0)} ${Q(2, 0)} Z`;
  // cernes : arcs centrés sur le cœur, loin à gauche ; ils courent le long des deux grandes faces
  const cxC = -44, cyC = 13.5;
  const cernes = () => {
    const out = [];
    for (let r = 44.8; r < 57.5; r += 1.55) {
      const a = Math.asin(16 / r) * 180 / Math.PI;
      out.push(pas(-a, a, 24).map(t => pt(cxC + r * Math.cos(rad(t)), cyC + r * Math.sin(rad(t)))));
    }
    return out;
  };
  return { x0, y0, W, H, pt, forme, cernes };
}

// ─── Assouplir ──────────────────────────────────────────────────────────────────────────
function eponger(z, h) {
  const cx = 250;                                  // le chaudron, sous le milieu du bâton
  const yP = z.h - 62;                             // dessus du poêle
  const poele = { x0: cx - 125, x1: cx + 125, y: yP };
  const porte = { x: cx - 50, y: yP + 20, l: 100, h: 38 };
  const flammes = [-24, 0, 24].map(o => `M${cx + o - 7},${yP + 54} C${cx + o - 9},${yP + 44} ${cx + o + 2},${yP + 42} ${cx + o},${yP + 31} C${cx + o + 8},${yP + 40} ${cx + o + 9},${yP + 48} ${cx + o + 7},${yP + 54}`);
  const yBord = yP - 58, yFond = yP;
  const chaudron = `M${cx - 64},${yBord} L${cx + 64},${yBord} L${cx + 64},${yBord + 6} L${cx + 60},${yBord + 8} `
    + `L${cx + 58},${yFond - 10} Q${cx + 58},${yFond} ${cx + 48},${yFond} L${cx - 48},${yFond} Q${cx - 58},${yFond} ${cx - 58},${yFond - 10} `
    + `L${cx - 60},${yBord + 8} L${cx - 64},${yBord + 6} Z`;
  // le flanc droit du chaudron, à l'ombre (lumière en haut à gauche)
  const ombre = `M${cx + 24},${yBord + 8} L${cx + 60},${yBord + 8} L${cx + 58},${yFond - 10} Q${cx + 58},${yFond} ${cx + 48},${yFond} L${cx + 24},${yFond} Z`;

  // le bâton, 27 mm de haut, vu de côté ; ses deux bouts continuent hors du dessin
  const yB = yBord - 44, hB = 15, xB0 = 22, xB1 = 452;
  const batonD = P([[xB0, yB], ...casse(xB1, yB, yB + hB, -1), ...casse(xB0, yB, yB + hB, 1).reverse()]) + ' Z';
  const fil = [[xB0 + 8, yB + 4, 0], [xB0 + 30, yB + 8, 0], [xB0 + 14, yB + 11, 0]].map(([a, y]) => [a, y, xB1 - 8]);
  const zone = [cx - 62, cx + 62];
  const vapeur = [-36, -8, 22, 46].map((o, i) => {
    const x = cx + o, y = yBord - 4;
    return `M${x},${y} C${x - 6},${y - 8} ${x + 6},${y - 14} ${x},${y - 22}`;
  });
  // la petite brosse : même forme, la tête contre la face du bâton, le manche vers le haut à droite
  const px = cx + 30, py = yB + hB / 2;
  const petite = brosseDessin(h, px, py - 2, -128, 0.42, 90);   // le manche reste hors de la vue voisine
  const fl = [xB0 + 40, xB0 + 130, yB + hB + 12];   // sous le bâton : au-dessus, elle touchait le titre de la vue
  // la brosse en grand, à droite
  const bx = z.l - 60, yb = 36;
  const brosse = brosseDessin(h, bx, yb, 0, 1, z.h - 4 - yb);
  return { cx, poele, porte, flammes, yBord, chaudron, ombre, baton: batonD, yB, hB, fil, zone, vapeur, petite, fl, bx, yb, brosse };
}

// La brosse : un bâton fendu dont les deux mâchoires montent de part et d'autre du chiffon
// et le pincent ; le chiffon plié passe entre elles et retombe en deux lobes. Repère local :
// (0,0) au haut des mâchoires, le manche vers +y sur la longueur L ; ang en degrés, s l'échelle.
function brosseDessin(h, ox, oy, ang, s, L) {
  const c = Math.cos(rad(ang)), sn = Math.sin(rad(ang));
  const M = (x, y) => r1(ox + s * (x * c - y * sn)) + ',' + r1(oy + s * (x * sn + y * c));
  const d = (...seg) => seg.map(t => typeof t === 'string' ? t : M(t[0], t[1])).join(' ');
  const Ls = L / s;
  const out = [];
  // le chiffon, derrière : la boucle du pli au-dessus des mâchoires et les deux lobes qui retombent
  const chiffon = d('M', [-2, 30], 'L', [-2, -6], 'C', [-6, -22], [-32, -20], [-32, -4],
    'C', [-34, 12], [-28, 30], [-18, 36], 'C', [-14, 30], [-14, 14], [-13, 6], 'L', [-13, -2],
    'L', [13, -2], 'L', [13, 6], 'C', [14, 14], [15, 24], [18, 36],
    'C', [28, 30], [34, 12], [32, -4], 'C', [32, -20], [6, -22], [2, -6], 'L', [2, 30], 'Z');
  // les deux mâchoires, qui s'écartent un peu vers le haut ; la fente descend jusqu'à y = 74
  const jaw = sg => d('M', [sg * 1.8, 0], 'L', [sg * 12, 0], 'L', [sg * 9, 58], 'L', [sg * 8, Ls], 'L', [0, Ls], 'L', [0, 74], 'L', [sg * 1.8, 0], 'Z');
  out.push(h.path(chiffon, h.a.blanc), h.path(chiffon, h.a.arete));
  out.push(h.path(d('M', [-12, -12], 'Q', [-20, 0], [-18, 16], 'M', [12, -12], 'Q', [20, 0], [18, 16]), h.a.fin));
  [-1, 1].forEach(sg => {
    out.push(h.path(jaw(sg), h.a.blanc));
    out.push(h.path(d('M', [sg * 8, Ls], 'L', [sg * 9, 58], 'L', [sg * 12, 0], 'L', [sg * 1.8, 0]), h.a.arete));
  });
  // la fente, et le chiffon qui la traverse entre les mâchoires
  out.push(h.path(d('M', [0, 80], 'L', [-1.8, 30], 'L', [1.8, 30], 'Z'), h.a.plein));
  out.push(h.path(d('M', [-1.8, 0], 'L', [-1.8, 30], 'M', [1.8, 0], 'L', [1.8, 30]), h.a.fin));
  return out;
}

// ─── L'enture ───────────────────────────────────────────────────────────────────────────
function enture(z) {
  const hB = 22, m = hB / 2, Lap = 120;
  // éclaté
  const xE0 = 30, yEh = 12, yEb = 58;            // bout de droite en haut, bout de gauche en bas
  const xL0 = xE0 + 60, xL1 = xL0 + Lap;          // zone de l'entaille
  const cg = casse(xE0, yEb + hB, yEb, 1);
  const basEc = 'M' + [[xE0, yEb], [xL0, yEb], [xL0, yEb + m], [xL1, yEb + m], [xL1, yEb + hB], ...cg.slice(0, -1)].map(p => p.join(',')).join(' L') + ' Z';
  const cd = casse(xL1 + 60, yEh, yEh + hB, 1);
  const hautEc = 'M' + [[xL0, yEh], ...cd, [xL1, yEh + hB], [xL1, yEh + m], [xL0, yEh + m]].map(p => p.join(',')).join(' L') + ' Z';
  const filBasEc = [`M${xE0 + 6},${yEb + 5} L${xL0 - 4},${yEb + 5}`, `M${xE0 + 10},${yEb + 15} L${xL1 - 6},${yEb + 15}`];
  const filHautEc = [`M${xL0 + 6},${yEh + 5} L${xL1 + 52},${yEh + 5}`, `M${xL1 + 6},${yEh + 16} L${xL1 + 54},${yEh + 16}`];
  const flEc = `M${xL0 + Lap / 2},${yEh + m + 6} L${xL0 + Lap / 2},${yEb + m - 6}`;
  // réuni
  const xA0 = 296, yA = 34, xa0 = xA0 + 40, xa1 = xa0 + Lap, xA1 = xa1 + 40;
  const ga = casse(xA0, yA + hB, yA, 1), da = casse(xA1, yA, yA + hB, 1);
  const ass = 'M' + [[xA0, yA], ...da, ...ga.slice(0, -1)].map(p => p.join(',')).join(' L') + ' Z';
  const filAss = [`M${xA0 + 8},${yA + 6} L${xA1 - 8},${yA + 6}`, `M${xA0 + 12},${yA + 16} L${xA1 - 8},${yA + 16}`];
  const joint = `M${xa0},${yA + m} L${xa1},${yA + m}`;
  const epaulements = `M${xa0},${yA} L${xa0},${yA + m} M${xa1},${yA + m} L${xa1},${yA + hB}`;
  const tours = [];
  for (let x = xa0 + 8; x < xa1 - 10; x += 4.6) tours.push([[x, yA - 2.5], [x + 3.4, yA - 2.5], [x + 7.4, yA + hB + 2.5], [x + 4, yA + hB + 2.5]]);
  // la raquette en petit, pointe en haut
  const xM = z.l - 30, yM = 6, sc = (z.h - 12) / 107;
  const T = ([x, y]) => [r1(xM + y * sc), r1(yM + x * sc)];
  const mini = P(contourRaquette(60).map(T)) + ' Z';
  const miniTrav = [33, 72].map(x => { const w = demiLargeur(x); return [...T([x, -w]), ...T([x, w])]; });
  const cot = pas(42, 64, 12).map(x => T([x, demiLargeur(x)]));
  const miniEnture = cot.map(p => [p[0] - 1.6, p[1]]).concat(cot.slice().reverse().map(p => [p[0] + 1.6, p[1]]));
  const pMiniEnture = T([53, demiLargeur(53)]);
  return { hB, xE0, yEb, yEh, xL0, basEc, hautEc, filBasEc, filHautEc, flEc, xA0, yA, ass, filAss, joint, epaulements, tours, mini, miniTrav, miniEnture, pMiniEnture, xM, yM };
}
