// Feuille d'essai 2/3 — les personnages de la bibliothèque h.formes (formes.js).
// Pas une planche du livre : elle sert à juger les formes en grand avant de s'en servir.
module.exports = (h) => {
  const A = h.a, F = h.formes;
  const sol = (z, y) => h.ligne(8, y, z.l - 8, y, A.arete);
  return {
    ref: 'essai-2',
    titre: 'Les personnages de la bibliothèque de formes',
    desc: 'Feuille d’essai : la tête, le buste et le corps de profil, debout, accroupi, à genoux.',
    fichier: '_formes-essai-corps.svg',
    format: 'pleine',
    disposition: [['tete', 'buste', 'debout'], ['accroupi', 'genoux', 'genou']],
    largeurs: [[1, 1, 0.8], [1, 1.15, 1.1]],
    vues: {
      tete: { titre: 'La tête de profil', dessin: z => F.tete({ x: z.l * 0.42, y: z.h * 0.42, echelle: 0.85 }).toString() },
      buste: { titre: 'Le buste', dessin: z => F.buste({ x: z.l * 0.5, y: z.h - 6, echelle: 0.36 }).toString() },
      debout: { titre: 'Debout', dessin: z => [sol(z, z.h - 6), F.personnage({ x: z.l * 0.45, y: z.h - 6, pose: 'debout', echelle: (z.h - 16) / 1760 })].join('\n') },
      accroupi: { titre: 'Accroupi', dessin: z => [sol(z, z.h - 6), F.personnage({ x: z.l * 0.4, y: z.h - 6, pose: 'accroupi', echelle: 0.2 })].join('\n') },
      genoux: { titre: 'À genoux', dessin: z => [sol(z, z.h - 6), F.personnage({ x: z.l * 0.62, y: z.h - 6, pose: 'genoux', echelle: 0.2 })].join('\n') },
      genou: { titre: 'Un genou au sol', dessin: z => [sol(z, z.h - 6), F.personnage({ x: z.l * 0.42, y: z.h - 6, pose: 'genou', echelle: 0.2 })].join('\n') },
    },
  };
};
