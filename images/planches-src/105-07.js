// Planche 105-07 — Limer le biseau de la hache, bombé contre creusé à la meule
module.exports = (h) => ({
  ref: '105-07',
  titre: 'Le biseau de hache, limé bombé',
  desc: 'À gauche, une tête de hache vue de flanc, une lime bâtarde posée sur le biseau, poussée par petits cercles le long du tranchant. À droite, deux coupes du taillant à la même échelle, plantées dans une bille : le biseau bombé, en pente continue, ressort du bois ; le biseau creusé à la meule, avec son épaule, reste coincé et son fil mince s’écaille.',
  format: 'demi',
  disposition: [['limer', 'bombe', 'creux']],
  largeurs: [[3, 2, 2]],
  vues: {
    limer: {
      titre: 'À la lime bâtarde',
      dessin: z => [
        // manche, rompu en bas, qui traverse l'œil
        h.path(R('M-50,41 L99,41 M-50,63 L98,63'), h.a.arete),
        h.path(R('M-50,41 C-54,47 -46,53 -50,57 C-53,60 -49,62 -50,63'), h.a.detail),
        h.path(R('M-44,50 C0,48 40,53 96,51'), h.a.detail),
        // tête vue de flanc, tranchant à droite
        h.path(R(TETE), h.a.blanc),
        h.path(R(TETE), h.a.contour),
        h.path(R('M100,41 L147,41 M99,63 L148,63'), h.a.cache),
        // petits cercles le long du tranchant
        h.fleche(R(boucles().d)),
        // la lime, poussée vers l'œil
        h.chemin(LIME.map(Rp), h.a.blanc, true),
        h.chemin(LIME.map(Rp), h.a.arete, true),
        dents(h),
        h.chemin(MANCHE_LIME.map(Rp), h.a.blanc, true),
        h.chemin(MANCHE_LIME.map(Rp), h.a.arete, true),
        h.chemin([Rp(P(126, -9)), Rp(P(126, 9))], h.a.detail),
        h.fleche(R(`M${P(150, 26).join(',')} L${P(95, 26).join(',')}`)),
      ].join('\n'),
      renvois: z => [
        { n: 1, rond: [200, 110], cible: Rp(P(85, -7.2)), texte: 'lime poussée, sans pression au retour' },
        { n: 2, rond: [160, 152], cible: proche(boucles().pts.slice(200, 280).map(Rp), [160, 152]), texte: 'petits cercles, d’un coin à l’autre' },
      ],
    },
    bombe: {
      titre: 'Bombé',
      dessin: z => [
        fibres('cb', BOIS_B),
        h.path('M6,110 L50,110 L74,134 M84,134 L108,110 L152,110', h.a.arete),
        h.path('M77,142 L79,170 L81,142', h.a.arete),
        h.path(BOMBE, h.a.blanc),
        h.path(BOMBE, h.a.hachure('metal')),
        h.path(BOMBE, h.a.contour),
        h.path(RUPTURE, h.a.blanc),
        h.path(VAGUE, h.a.arete),
        h.fleche('M40,100 L40,45'),
      ].join('\n'),
      renvois: z => [
        { n: 3, rond: [138, 40], cible: [97.5, 74.6], texte: 'pente continue, sans épaule' },
        { n: 4, rond: [138, 95], cible: [96, 122], texte: 'le bois s’ouvre, la hache ressort' },
      ],
    },
    creux: {
      titre: 'Creusé à la meule',
      dessin: z => [
        fibres('cc', 'M6,102 L152,102 L152,204 L6,204 Z'),
        h.path('M6,102 L152,102', h.a.arete),
        h.ellipse(79, 167, 15, 9, h.a.blanc),
        h.ellipse(79, 167, 15, 9, h.a.arete),
        h.ellipse(79, 167, 9, 5, h.a.detail),
        h.ellipse(79, 167, 3.5, 2, h.a.detail),
        h.path(CREUX, h.a.blanc),
        h.path(CREUX, h.a.hachure('metal')),
        h.path(CREUX, h.a.contour),
        h.path(RUPTURE, h.a.blanc),
        h.path(VAGUE, h.a.arete),
      ].join('\n'),
      renvois: z => [
        { n: 5, rond: [138, 50], cible: [93.5, 96], texte: 'épaule : la hache se coince' },
        { n: 6, rond: [138, 130], cible: [81, 154.5], texte: 'fil mince, écaillé au premier nœud' },
      ],
    },
  },
});

// ─── Géométrie ───────────────────────────────────────────────────────────────────────────
// Tête de hache vue de flanc : talon en haut, taillant évasé, tranchant bombé en bas.
const TETE = 'M100,22 L146,22 L148,70 L143,100 Q148,165 196,192 Q122,228 48,192 Q96,165 102,100 L98,70 Z';

// Dessinée tranchant en bas, puis tournée d'un quart de tour (tranchant à droite) et réduite.
const K = 0.75;
const Rp = ([x, y]) => [+(K * (y - 12) + 6).toFixed(1), +(K * (202 - x) + 14).toFixed(1)];
const R = d => d.replace(/(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/g, (m, x, y) => Rp([+x, +y]).join(','));
const proche = (pts, c) => pts.reduce((a, b) => (Math.hypot(b[0] - c[0], b[1] - c[1]) < Math.hypot(a[0] - c[0], a[1] - c[1]) ? b : a));

// Lime : axe de la pointe T vers le talon, u le long, n en travers.
const T = [135, 150], U = [0.1500, 0.9887], N = [0.9887, -0.1500];
const P = (s, t) => [+(T[0] + s * U[0] + t * N[0]).toFixed(1), +(T[1] + s * U[1] + t * N[1]).toFixed(1)];
const demi = s => 5 + 3 * s / 113;
const LIME = [P(0, -5), P(0, 5), P(113, demi(113)), P(121, 3), P(121, -3), P(113, -demi(113))];
const MANCHE_LIME = [P(121, -8), P(121, 8), P(160, 9.5), P(164, 6), P(164, -6), P(160, -9.5)];
function dents(h) {
  const out = [];
  // Denture simple, comme le demande le chapitre : une seule série de tailles parallèles.
  for (let s = 5; s < 109; s += 4) {
    const w = demi(s) - 1;
    out.push(`M${P(s, -w).join(',')} L${P(s + 4, w).join(',')}`);
  }
  return h.path(R(out.join(' ')), h.a.detail);
}

// Trajet de la lime : boucles le long d'une bande parallèle au tranchant.
function boucles() {
  const bande = t => [
    (1 - t) ** 2 * 80 + 2 * t * (1 - t) * 122 + t * t * 186,
    (1 - t) ** 2 * 187 + 2 * t * (1 - t) * 208 + t * t * 179,
  ];
  const n = 360, tours = 8, r = 6.5;
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const [bx, by] = bande(0.07 + 0.86 * (1 - i / n));
    const th = Math.PI / 2 + 2 * Math.PI * tours * (1 - i / n);
    pts.push([+(bx + r * Math.cos(th)).toFixed(1), +(by + r * Math.sin(th)).toFixed(1)]);
  }
  return { d: 'M' + pts.map(p => p.join(',')).join(' L'), pts };
}

// Coupes du taillant, même échelle : haut rompu, tranchant en bas.
const BOMBE = 'M58,4 L100,4 L100,14 C100,70 96,112 79,142 C62,112 58,70 58,14 Z';
const CREUX = 'M58,4 L100,4 L100,14 L93,96 Q84,110 83,150 L81,154.5 L79.5,152 L77.5,155 L76,150 Q75,110 65,96 L58,14 Z';
const RUPTURE = 'M53,14 C62,8 70,20 79,14 C88,8 96,20 105,14 L105,0 L53,0 Z';
const VAGUE = 'M55,14 C62,8 70,20 79,14 C88,8 96,20 103,14';

// Bois en coupe : fibres verticales ondulées (la fente suit le fil), autres que l'acier à 45°.
const BOIS_B = 'M6,110 L50,110 L74,134 L77,142 L79,170 L81,142 L84,134 L108,110 L152,110 L152,204 L6,204 Z';
function fibres(id, d) {
  let f = '';
  for (let x = 9; x < 152; x += 6) f += `M${x},96 C${x + 2},130 ${x - 2},165 ${x},206 `;
  return `<defs><clipPath id="${id}"><path d="${d}" fill="none"/></clipPath></defs><path d="${f}" fill="none" stroke="#1A1A1A" stroke-width="0.6" clip-path="url(#${id})"/>`;
}
