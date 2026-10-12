// Feuille d'essai 3/3 — le fil, la corde et les pièces du filet (formes.js).
// Pas une planche du livre : elle sert à juger les formes en grand avant de s'en servir.
module.exports = (h) => {
  const F = h.formes;
  // un nœud simple : le trèfle ouvert au sommet, deux queues ; z = -sin 3t donne dessus / dessous
  const noeud = (cx, cy, k) => {
    const pts = [[cx - 4.6 * k, cy - 4.2 * k, 0], [cx - 2.6 * k, cy - 3.6 * k, 0]];
    for (let t = Math.PI + 0.55; t <= 3 * Math.PI - 0.55 + 1e-9; t += (2 * Math.PI - 1.1) / 16) {
      pts.push([cx + k * (Math.sin(t) + 2 * Math.sin(2 * t)), cy + k * (Math.cos(t) - 2 * Math.cos(2 * t)), -Math.sin(3 * t)]);
    }
    pts.push([cx + 2.6 * k, cy - 3.6 * k, 0], [cx + 4.6 * k, cy - 4.2 * k, 0]);
    return pts;
  };
  return {
    ref: 'essai-3',
    titre: 'Le fil, la corde et le filet',
    desc: 'Feuille d’essai : une corde nouée avec ses croisements, deux fils croisés, l’aiguille à filet, le moule et la maille.',
    fichier: '_formes-essai-fil.svg',
    format: 'pleine',
    disposition: [['noeud', 'fils'], ['maille', 'aiguille']],
    largeurs: [[1.1, 1], [1.25, 1]],
    hauteurs: [1, 1.25],
    vues: {
      noeud: { titre: 'Une corde : croisements, bouts, sens', dessin: z => F.cordes([
        { pts: noeud(z.l * 0.5, z.h * 0.58, 26), ep: 12, torons: true, debut: 'fixe', fin: 'libre', fleche: { de: 0.9, a: 0.99, cote: 'droite' } },
      ]).toString() },
      fils: { titre: 'Deux fils qui se croisent', dessin: z => F.cordes([
        { pts: [[20, z.h * 0.3], [z.l * 0.45, z.h * 0.55], [z.l - 20, z.h * 0.45]], ep: 4, debut: 'fixe', fin: 'libre', passages: ['dessus', 'dessous'] },
        { pts: [[z.l * 0.3, 20], [z.l * 0.35, z.h * 0.6], [z.l * 0.7, z.h - 20]], ep: 4, debut: 'coupe', fin: 'libre' },
        { pts: [[z.l * 0.62, 18], [z.l * 0.66, z.h * 0.5], [z.l * 0.52, z.h - 16]], ep: 8, debut: 'fixe', fin: 'coupe', torons: true },
      ]).toString() },
      maille: { titre: 'La maille : le nœud desserré', dessin: z => F.maille({ x: z.l * 0.58, y: z.h * 0.5, echelle: Math.min(1.7, (z.h - 24) / 205), ep: 5 }).toString() },
      aiguille: { titre: 'L’aiguille, vide et chargée ; le moule', dessin: z => [
        F.aiguilleFilet({ x: z.l * 0.5, y: z.h * 0.2, longueur: z.l - 30, chargee: false }),
        F.aiguilleFilet({ x: z.l * 0.5, y: z.h * 0.48, longueur: z.l - 30 }),
        F.moule({ x: z.l * 0.5, y: z.h * 0.72, longueur: z.l - 30, largeur: 34 }),
      ].join('\n') },
    },
  };
};
