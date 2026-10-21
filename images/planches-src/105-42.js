// Planche 105-42 — L'étau de souche (chapitre 105, §9, « Fabriquer l'étau de souche »).
// Tout vient du chapitre : un billot de bois franc planté droit, à hauteur du nombril ; fendu sur environ le
// tiers de sa longueur à la hache et au coin ; la fente écartée par un coin de bois ; la pièce (guide-chaîne,
// tête de hache, lame) glissée dedans ; le coin retiré : le billot se referme dessus ; deux tours de corde
// serrés au bâton (garrot espagnol) « juste sous la fente ».
// Séquence de trois vignettes cadrées pareil : le haut du billot de face, la fente vue par la tranche (on la
// voit s'ouvrir en V et se refermer) ; la pièce est une tête de hache, vue par le fil, le taillant en haut.
// Pas de main : l'outil seul.
// « Juste sous la fente » est lu comme : autour de la partie fendue, sous la pièce (un garrot sous le bout
// de la fente ne serrerait rien). Signalé [À VÉRIFIER] au rapport. La variante de la souche fraîche (le
// guide-chaîne planté pointe en bas) n'est pas dessinée.
// Aucune cote : le chapitre n'en donne aucune. Le dessin : billot de 300 mm, fente de 330 mm.
'use strict';

const f1 = v => Math.round(v * 10) / 10;

module.exports = (h) => {
  const A = h.a, NOIR = '#1A1A1A';
  const BL = w => `fill="#FFFFFF" stroke="${NOIR}" stroke-width="${w}" stroke-linejoin="round"`;

  // le billot, commun aux trois vignettes : vu de face, la fente vue par la tranche (on voit à travers)
  const geo = z => {
    const cx = z.l / 2, yT = 74, demi = 56;          // le dessus ; la demi-largeur du billot
    const yF = yT + 124;                             // le bout de la fente (environ le tiers)
    const bas = z.h - 4;
    return { cx, yT, demi, yF, bas };
  };
  // la tête de hache vue par le taillant : le profil de son épaisseur, du fil (en haut) au marteau (en bas)
  // [hauteur sous le fil, demi-épaisseur], en unités de vue
  const TETE = [[0, 0], [10, 2.2], [24, 4.2], [40, 6.6], [52, 9.5], [62, 10.5], [74, 10.5], [80, 9]];

  const billot = (z, { gap = 0, coin = null, piece = false, garrot = false }) => {
    const g = geo(z), { cx, yT, demi, yF, bas } = g, out = [];
    // la demi-ouverture de la fente à la hauteur y (0 au bout de la fente)
    const yP = yT - 30;                               // le fil de la hache, au-dessus du billot
    const ouv = y => {
      if (piece && gap === 0) {                       // refermé sur la tête : il ne reste que son épaisseur
        const d = y - yP;
        for (let i = 1; i < TETE.length; i++) if (d <= TETE[i][0]) { const [a, ea] = TETE[i - 1], [b, eb] = TETE[i]; return Math.max(0, ea + (eb - ea) * (d - a) / (b - a)) * Math.max(0, Math.min(1, (yF - y) / 40)); }
        return 0;
      }
      return Math.max(0, gap / 2 * (yF - y) / (yF - yT));
    };
    // les deux moitiés, chacune un contour fermé : le flanc, la face de la fente, le dessus
    for (const sg of [-1, 1]) {
      const fente = [];
      for (let i = 0; i <= 20; i++) { const y = yT + (yF - yT) * i / 20; fente.push([cx + sg * ouv(y), y]); }
      const o0 = ouv(yT);
      const x0 = cx + sg * demi + sg * o0 * 0.6;       // le flanc s'écarte un peu avec la moitié
      const poly = [[cx + sg * o0, yT], [x0, yT]].concat([[cx + sg * demi, yF], [cx + sg * demi, bas], [cx, bas]], [[cx, yF]], fente.slice().reverse());
      out.push(h.chemin(poly, A.blanc, true));
      out.push(h.chemin([[cx + sg * o0, yT], [x0, yT], [cx + sg * demi, yF], [cx + sg * demi, bas]], A.contour));
      out.push(h.chemin(fente, A.arete));
    }
    // la cassure en bas
    const casse = []; for (let i = 0; i <= 24; i++) { const t = i / 24; casse.push([cx - demi + 2 * demi * t, bas - 1 + Math.sin(t * 4 * Math.PI) * 2]); }
    out.push(h.chemin(casse, A.detail));
    // l'écorce
    [[-44, 30, 90], [-30, 100, 150], [-16, 140, 190], [16, 40, 96], [30, 120, 176], [44, 150, 196], [-40, 200, 212], [40, 70, 110]].forEach(([dx, a, b]) => {
      const y0 = yT + a, y1 = Math.min(yT + b, bas - 8), x = cx + dx;
      if (y1 > y0 + 8) out.push(h.path(`M${f1(x)} ${f1(y0)} Q${f1(x + 2)} ${f1((y0 + y1) / 2)} ${f1(x - 1)} ${f1(y1)}`, A.detail));
    });
    // la tête de hache, taillant en haut, vue par le fil
    if (piece) {
      const yb = yP + TETE[TETE.length - 1][0];
      const gch = TETE.map(([d, e]) => [cx - e, yP + d]), drt = TETE.map(([d, e]) => [cx + e, yP + d]).reverse();
      const tete = gch.concat(drt);
      // la partie dans la fente est cachée par rien : on voit à travers la fente
      out.push(h.chemin(tete, BL(2.4), true));
      // l'œil du manche, en caché
      out.push(h.chemin([[cx - 6, yP + 54], [cx + 6, yP + 54], [cx + 6, yP + 72], [cx - 6, yP + 72]], A.cache, true));
      out.push(h.ligne(cx, yP + 2, cx, yP + 24, A.detail));
    }
    // le coin de bois, enfoncé ou tiré
    if (coin) {
      // tiré : sorti de la fente, à côté de la pièce (il était plus loin dans la fente, derrière elle)
      const tire = coin === 'tire';
      const xc = tire ? cx + 46 : cx, yb = tire ? yT - 12 : yT + 36, yh = yb - 64;
      const c = [[xc - 1.5, yb], [xc - 11, yh], [xc + 11, yh], [xc + 1.5, yb]];
      out.push(h.chemin(c, BL(1.4), true));
      out.push(h.ligne(xc - 2, yh + 8, xc - 1, yb - 8, A.detail), h.ligne(xc + 3, yh + 14, xc + 1.5, yb - 12, A.detail));
      if (tire) out.push(h.geste(`M${f1(xc + 24)} ${f1(yb + 4)} L${f1(xc + 24)} ${f1(yh + 6)}`));
    }
    // le garrot : deux tours de corde autour de la partie fendue, sous la pièce, et le bâton qu'on tourne
    if (garrot) {
      const yG = yT + 70;
      // le bâton d'abord : il passe sous les tours de corde
      const b0 = [cx - 24, yG + 52], b1 = [cx + 30, yG - 46];
      const L = Math.hypot(b1[0] - b0[0], b1[1] - b0[1]), u = [(b1[0] - b0[0]) / L, (b1[1] - b0[1]) / L], n = [-u[1] * 4.5, u[0] * 4.5];
      out.push(h.chemin([[b0[0] + n[0], b0[1] + n[1]], [b1[0] + n[0], b1[1] + n[1]], [b1[0] - n[0], b1[1] - n[1]], [b0[0] - n[0], b0[1] - n[1]]], BL(2.4), true));
      for (const dy of [-6, 4]) {
        const p = [[cx - demi - 3, yG + dy], [cx + demi + 3, yG + dy + 3], [cx + demi + 3, yG + dy + 9], [cx - demi - 3, yG + dy + 6]];
        out.push(h.chemin(p, BL(1.4), true));
      }
      const c = [cx + 3, yG + 3], R = 46, a0 = -160, a1 = -100;
      const arc = []; for (let a = a0; a <= a1; a += 4) arc.push([c[0] + R * Math.cos(a * Math.PI / 180), c[1] + R * Math.sin(a * Math.PI / 180)]);
      out.push(h.geste('M' + arc.map(p => `${f1(p[0])} ${f1(p[1])}`).join(' L')));
    }
    return out.join('\n');
  };

  return {
    ref: '105-42',
    titre: 'L’étau de souche',
    desc: 'Trois vignettes du haut d’un billot planté, la fente vue par la tranche. 1 : le billot fendu, la fente ouverte par un coin de bois enfoncé sur le dessus. 2 : une tête de hache posée dans la fente, taillant en haut ; on tire le coin vers le haut. 3 : la fente refermée sur la tête de hache, deux tours de corde autour de la partie fendue, sous la pièce, serrés par un bâton qu’on tourne.',
    format: 'demi',
    disposition: [['v1', 'v2', 'v3']],
    vues: {
      v1: {
        titre: '1. Fendre, ouvrir au coin',
        dessin: z => billot(z, { gap: 26, coin: 'enfonce' }),
        renvois: z => {
          const g = geo(z);
          return [
            { n: 1, rond: [16, g.yF + 10], cible: [g.cx - 3, g.yF - 4], texte: 'billot planté, fendu au tiers' },
            { n: 2, rond: [z.l - 16, g.yT - 40], cible: [g.cx + 8, g.yT - 22], texte: 'un coin de bois écarte la fente' },
          ];
        },
      },
      v2: {
        titre: '2. La pièce, puis le coin',
        dessin: z => billot(z, { gap: 26, coin: 'tire', piece: true }),
        renvois: z => {
          const g = geo(z);
          return [
            { n: 3, rond: [16, g.yT - 46], cible: [g.cx - 5, g.yT - 18], texte: 'la pièce dans la fente, fil en haut' },
          ];
        },
      },
      v3: {
        titre: '3. Le garrot',
        dessin: z => billot(z, { gap: 0, piece: true, garrot: true }),
        renvois: z => {
          const g = geo(z);
          return [
            { n: 4, rond: [16, g.yT + 14], cible: [g.cx - 12, g.yT + 2], texte: 'le coin tiré, le billot se referme' },
            { n: 5, rond: [z.l - 14, g.yT + 128], cible: [g.cx + 12, g.yT + 100], texte: 'deux tours de corde serrés au bâton' },
          ];
        },
      },
    },
  };
};
