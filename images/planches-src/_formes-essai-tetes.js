// Feuille d'essai — les têtes et les bustes de la bibliothèque h.formes (formes.js).
// Pas une planche du livre : elle sert à juger les formes en grand avant de s'en servir.
module.exports = (h) => {
  const A = h.a, F = h.formes;
  return {
    ref: 'essai-t',
    titre: 'Les têtes et les bustes de la bibliothèque de formes',
    desc: 'Feuille d’essai : la tête de profil d’un adulte, d’un enfant de cinq ans et d’un bébé ; le buste, le bras qui rejoint la main.',
    fichier: '_formes-essai-tetes.svg',
    format: 'pleine',
    disposition: [['adulte', 'enfant', 'bebe'], ['longs', 'busteMain', 'busteEnfant']],
    vues: {
      adulte: { titre: 'Adulte', dessin: z => F.tete({ x: z.l * 0.45, y: z.h * 0.45, echelle: 0.75 }).toString() },
      enfant: { titre: 'Enfant de cinq ans', dessin: z => F.tete({ x: z.l * 0.45, y: z.h * 0.45, echelle: 0.75, age: 'enfant' }).toString() },
      bebe: { titre: 'Bébé', dessin: z => F.tete({ x: z.l * 0.45, y: z.h * 0.45, echelle: 0.75, age: 'bebe' }).toString() },
      longs: { titre: 'Cheveux longs, regard à gauche', dessin: z => F.tete({ x: z.l * 0.55, y: z.h * 0.42, echelle: 0.75, cheveux: 'longs', cote: 'gauche' }).toString() },
      busteMain: { titre: 'Le buste, la main sur un bâton', dessin: z => {
        const s = 0.36, b0 = { x: z.l * 0.36, y: z.h - 4, echelle: s };
        const m = { x: z.l * 0.80, y: z.h * 0.62, pose: 'prise', vue: 'profil', diametre: 30 * s };
        const b = F.buste(Object.assign({}, b0, { main: m }));
        const t = b.mains.proche.trou;
        return [h.ligne(t.x - 10, t.y - 90, t.x + 10, t.y + 120, A.contour), b.toString(), h.cercle(t.x, t.y, t.r, h.a.hachure('bois', 'contour'))].join('\n');
      } },
      busteEnfant: { titre: 'Le buste d’un enfant', dessin: z => F.buste({ x: z.l * 0.45, y: z.h - 4, echelle: 0.5, age: 'enfant' }).toString() },
    },
  };
};
