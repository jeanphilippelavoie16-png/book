'use strict';
// Planche 96-12 — Le tas de compost isolé de paille et sa tige de fer (chapitre 96, « Faire la
// terre », étape 19 et note 4).
//
// Tout vient du passage : un tas d'environ un mètre de côté, au minimum (un petit tas mouillé gèle
// avant d'avoir chauffé) ; tas froid au cœur : l'agrandir, l'arroser en le retournant, l'isoler
// d'une couche de paille ou de foin. Note 4 : un piquet de métal ou une tige de fer enfoncé au cœur
// du tas et laissé une heure ressort chaud à la main quand le tas travaille, froid quand il dort.
//
// Seule cote : la largeur du tas, que le chapitre donne (environ 1 m, au minimum). Ni la hauteur
// du tas, ni l'épaisseur de paille, ni la longueur ou le diamètre de la tige : le chapitre ne les
// donne pas, le dessin les montre à l'œil, sans chiffre.
//
// Trois matières, trois trames qui ne se ressemblent pas : le tas en débris (feuilles, brindilles,
// grumeaux), la paille en brins couchés le long de la surface, la terre du sol en hachure oblique.
// 14 oct. : la main qui tient la tige retirée est une main simple (mains/moteur.js, prise-manche vue côté
// paume), à la taille de la vue, au lieu du calque s11 grossi avec la tige ; la tige y pèse (contour 2,4).

// Un hasard reproductible : la planche sort pareille à chaque composition.
const hasard = (graine) => {
  let s = graine >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
};

// Le profil du tas : flancs raides, dessus bombé. u de −1 à 1 d'un pied à l'autre.
const profil = u => Math.pow(Math.max(0, 1 - Math.pow(Math.abs(u), 3)), 0.45);

// La courbe du dessus d'un tas de largeur L et de hauteur Ht posé en (cx, yg), en points.
const courbe = (cx, yg, L, Ht, n = 160) => {
  const pts = [];
  for (let i = 0; i <= n; i++) {
    // plus de points près des pieds, où le flanc tourne vite
    const t = -1 + 2 * i / n, u = Math.sign(t) * (1 - Math.pow(1 - Math.abs(t), 1.6));
    pts.push([cx + u * L / 2, yg - Ht * profil(u)]);
  }
  return pts;
};

const f1 = v => Math.round(v * 10) / 10;

module.exports = (h) => ({
  ref: '96-12',
  titre: 'Le tas de compost isolé de paille, et la tige de fer au cœur',
  desc: 'En coupe, un tas de compost d’environ un mètre de côté posé sur la terre, couvert sur le dessus et les côtés d’une couche de paille ; une tige de fer enfoncée par le dessus descend jusqu’au cœur du tas. À droite, la tige retirée au bout d’une heure, tenue à pleine main par le bout qui était au cœur : chaude, le tas travaille ; froide, il dort.',
  format: 'demi',
  disposition: [['coupe', 'tige']],
  largeurs: [[3, 2]],
  vues: {
    coupe: {
      titre: 'En coupe',
      dessin: z => {
        const g = geo(z), o = [];
        const { cx, yg, W, H, t, xTige, yPointe, yTete, ec } = g;
        const aleat = hasard(9612);

        // ── le sol : un trait de terrain et une bande de terre dessous
        o.push(h.rect(4, yg, z.l - 8, 16, h.a.hachure('terre', 'fin')));
        o.push(h.ligne(4, yg, z.l - 4, yg, h.a.contour));

        // ── la paille : la forme extérieure, peinte en blanc, puis des brins couchés le long de
        // la surface, sur plusieurs rangs entre le tas et le bord extérieur
        const ext = courbe(cx, yg, W + 2 * t, H + t);
        o.push(h.chemin(ext, h.a.blanc, true));
        const rangs = 5;
        for (let k = 1; k <= rangs; k++) {
          const a = (k - 0.5) / rangs;
          const pts = courbe(cx, yg, W + 2 * t * a, H + t * a, 400);
          // longueurs cumulées, puis des brins de 9 à 20 séparés de 2 à 6
          const cum = [0];
          for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
          const total = cum[cum.length - 1];
          let s = aleat() * 8;
          while (s < total - 4) {
            const lg = 9 + aleat() * 11, fin = Math.min(total - 2, s + lg);
            // un brin un peu plus haut à un bout, un peu plus bas à l'autre : ils se croisent
            const d1 = (aleat() - 0.5) * 4, d2 = (aleat() - 0.5) * 4;
            const brin = [];
            for (let i = 0; i < pts.length; i++) {
              if (cum[i] < s || cum[i] > fin) continue;
              const d = d1 + (d2 - d1) * (cum[i] - s) / (fin - s || 1);
              const i2 = Math.min(pts.length - 1, i + 1), i0 = Math.max(0, i - 1);
              const tx = pts[i2][0] - pts[i0][0], ty = pts[i2][1] - pts[i0][1], n = Math.hypot(tx, ty) || 1;
              brin.push([f1(pts[i][0] + d * ty / n), f1(pts[i][1] - d * tx / n)]);
            }
            // pas de brin sous le sol ni à travers la tige
            const bon = brin.length > 1 && brin.every(p => p[1] < yg - 1.5 && Math.abs(p[0] - xTige) > ec + 2.5);
            if (bon) o.push(h.chemin(brin, h.a.fin));
            s = fin + 2 + aleat() * 4;
          }
        }
        o.push(h.chemin(ext, h.a.arete));

        // ── le tas : sa forme, puis ses débris (feuilles, brindilles, grumeaux) à l'intérieur
        const int = courbe(cx, yg, W, H);
        o.push(h.chemin(int, h.a.blanc, true));
        const dedans = (x, y, m) => {
          const u = (x - cx) / (W / 2);
          if (Math.abs(u) >= 1 || y > yg - m) return false;
          for (const du of [-m, 0, m]) {
            const uu = (x + du - cx) / (W / 2);
            if (Math.abs(uu) >= 1 || y < yg - H * profil(uu) + m) return false;
          }
          return true;
        };
        const pas = 11;
        for (let y = yg - H; y < yg; y += pas * 0.87) {
          for (let x = cx - W / 2; x < cx + W / 2; x += pas) {
            const px = x + (aleat() - 0.5) * pas * 0.9, py = y + (aleat() - 0.5) * pas * 0.8;
            if (!dedans(px, py, 5)) continue;
            if (Math.abs(px - xTige) < ec + 6 && py > yPointe - 8) continue;           // la tige
            const el = Math.hypot((px - cx) / (W * 0.2), (py - g.yCoeur) / (H * 0.19));
            if (Math.abs(el - 1) * H * 0.19 < 4) continue;                             // le trait du cœur
            const r = aleat(), ang = aleat() * 180;
            const rad = ang * Math.PI / 180, c = Math.cos(rad), sn = Math.sin(rad);
            const P = (a, b) => `${f1(px + a * c - b * sn)} ${f1(py + a * sn + b * c)}`;
            if (r < 0.42) {                                                       // une feuille
              o.push(h.path(`M ${P(-4, 0)} Q ${P(0, -2.6)} ${P(4, 0)} Q ${P(0, 2.6)} ${P(-4, 0)} Z M ${P(-4, 0)} L ${P(2.2, 0)}`, h.a.fin));
            } else if (r < 0.75) {                                                // une brindille
              const lg = 5 + aleat() * 5;
              o.push(h.path(`M ${P(-lg / 2, 0)} L ${P(0, 0.8)} L ${P(lg / 2, 0)} M ${P(0, 0.8)} L ${P(2, 3)}`, h.a.detail));
            } else {                                                              // un grumeau
              o.push(h.cercle(f1(px), f1(py), 1.1, h.a.plein));
            }
          }
        }
        o.push(h.chemin(int, h.a.contour));

        // ── le cœur : le milieu du tas, là où la pointe reste une heure
        o.push(h.ellipse(cx, g.yCoeur, W * 0.2, H * 0.19, h.a.cache));

        // ── la tige de fer : de la tête, au-dessus de la paille, à la pointe, au cœur
        const tige = [[xTige - ec, yTete], [xTige + ec, yTete], [xTige + ec, yPointe - 9],
          [xTige, yPointe], [xTige - ec, yPointe - 9]];
        o.push(h.chemin(tige, h.a.blanc, true));
        o.push(h.chemin(tige, h.a.arete, true));

        // ── la cote : la seule que donne le chapitre
        // deux lignes de rappel des pieds du tas (sous la paille), à travers la bande de sol
        o.push(h.ligne(cx - W / 2, yg + 1, cx - W / 2, yg + 34, h.a.fin));
        o.push(h.ligne(cx + W / 2, yg + 1, cx + W / 2, yg + 34, h.a.fin));
        o.push(h.cote(cx - W / 2, yg + 30, cx + W / 2, yg + 30, '≈ 1 000', { cote: 'dessous' }));
        return o.join('\n');
      },
      renvois: z => {
        const g = geo(z);
        const { cx, yg, W, H, t, xTige, yTete } = g;
        const xd = cx + W / 2 + t;
        return [
          { n: 1, rond: [xd + 26, yg - H * 0.25], cible: [cx + W * 0.36, yg - H * 0.25], texte: 'le tas, vert et brun mêlés : au moins 1 m de côté' },
          { n: 2, rond: [xd + 26, yg - H * 0.78], cible: [cx + W * 0.47, yg - H * 0.78], texte: 'paille ou foin, dessus et sur les côtés' },
          { n: 3, rond: [xTige + 44, yTete + 6], cible: [xTige + g.ec, yTete + 12], texte: 'tige de fer ou piquet de métal' },
          { n: 4, rond: [cx - W / 2 - t - 22, g.yCoeur - H * 0.35], cible: [cx - W * 0.17, g.yCoeur - H * 0.1], texte: 'le cœur : la pointe y reste une heure' },
        ];
      },
    },
    tige: {
      titre: 'Retirée au bout d’une heure',
      dessin: z => {
        const g = geoTige(z);
        const { x, yh, yp, ec, ym } = g;
        // le haut est rompu : la tige continue plus haut que la vue (elle traverse tout le tas)
        const tige = [[x - ec, yh + 4], [x - ec / 3, yh - 1], [x + ec / 3, yh + 6], [x + ec, yh + 1],
          [x + ec, yp - 13], [x, yp], [x - ec, yp - 13]];
        const objet = h.chemin(tige, h.a.blanc, true) + '\n' + h.chemin(tige, h.a.contour, true);   // la charte : l'objet pèse
        // la main simple (main gauche, prise-manche vue côté paume, penchée de 25°) fermée sur la tige : la
        // tige entre par le haut du poing et ressort par le bas, derrière les doigts ; l'avant-bras part à
        // gauche et sort de la vue. La main garde la taille de la vue (e), la prise se ferme sur la tige.
        const vers = [x - 600, ym], o = { x, y: ym, pose: 'prise-manche', vue: 'paume', cote: 'gauche', echelle: g.e, diametre: 2 * ec / g.e, rotation: [-25, 0, 0] };
        return h.formes.mainSimple({ ...o, angle: poser(h, o, 90, vers), objet, avantbras: { vers, bord: { x0: 0, y0: 0, x1: z.l, y1: z.h }, bras: { pli: 0 } } }).svg;
      },
      renvois: z => {
        const g = geoTige(z);
        return [
          { n: 5, rond: [g.x + 50, g.yp - 26], cible: [g.x + g.ec + 1, g.yp - 26], texte: 'le bout qui était au cœur : chaud, le tas travaille ; froid, il dort' },
        ];
      },
    },
  },
});

// La géométrie de la coupe, partagée par le dessin et les renvois.
function geo(z) {
  const yg = z.h - 40;                          // le sol : de la place dessous pour la cote
  const W = Math.min(z.l * 0.56, (yg - 50) / 0.795);  // largeur du tas, pied à pied
  const H = W * 0.72;                           // hauteur du tas
  const t = W * 0.075;                          // épaisseur de la paille, à l'œil
  const cx = z.l * 0.44;
  const yCoeur = yg - H * 0.44;
  const ec = 2.6;                               // demi-épaisseur de la tige
  return { yg, W, H, t, cx, yCoeur, ec, xTige: cx, yPointe: yCoeur + 4, yTete: yg - H - t - 38 };
}

// l'angle de la main simple qui met l'axe de sa prise sur `axe` (degrés à l'écran) et son avant-bras du
// côté de `vers` (le même outil que 104-40 et 50-40)
function poser(h, o, axe, vers) {
  const F = h.formes, base = Object.assign({}, o, { angle: 0, avantbras: { longueur: 100 } }); delete base.objet;
  const e0 = F.mainSimple(base); let best = null;
  for (const k of [0, 180]) {
    const a = axe - e0.prise.angle + k, m = F.mainSimple(Object.assign({}, base, { angle: a }));
    const d = [m.coude[0] - m.poignet[0], m.coude[1] - m.poignet[1]], v = [vers[0] - m.poignet[0], vers[1] - m.poignet[1]];
    const c = (d[0] * v[0] + d[1] * v[1]) / ((Math.hypot(d[0], d[1]) * Math.hypot(v[0], v[1])) || 1);
    if (!best || c > best.c) best = { a, c };
  }
  return best.a;
}

// La géométrie de la tige retirée.
function geoTige(z) {
  const e = 0.95;
  return { e, x: z.l * 0.62, yh: 12, yp: z.h - 16, ec: 10, ym: z.h - 16 - 100 };
}
