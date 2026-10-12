// Feuille d'essai 2/3 — les personnages de la bibliothèque h.formes (formes.js) : le pictogramme
// des cartes de sécurité d'avion (règle 8), dans toutes ses poses.
// Pas une planche du livre : elle sert à juger les formes en grand avant de s'en servir.
module.exports = (h) => {
  const A = h.a, F = h.formes;
  const sol = (z, y) => h.ligne(8, y, z.l - 8, y, A.arete);
  const S = 0.122;
  const v = (titre, pose, fx, extra = {}) => ({ titre, dessin: z => {
    const p = F.personnage(Object.assign({ x: z.l * fx, y: z.h - 8, pose, echelle: S }, extra));
    const out = [sol(z, z.h - 8)];
    if (p.siege) out.push(h.rect(p.siege[0] - 46, p.siege[1], 92, z.h - 8 - p.siege[1], h.a.hachure('bois', 'arete')));
    if (p.dos) out.push(h.rect(p.dos[0] - 52, p.dos[1] - 30, 54, 80, A.contour));
    out.push(p.toString());
    return out.join('\n');
  } });
  return {
    ref: 'essai-2',
    titre: 'Les personnages de la bibliothèque de formes',
    desc: 'Feuille d’essai : le pictogramme debout, penché, accroupi, assis, à genoux, un genou au sol, couché, en portage, et l’enfant à côté de l’adulte.',
    fichier: '_formes-essai-corps.svg',
    format: 'pleine',
    disposition: [['debout', 'penche', 'accroupi', 'portage'], ['assis', 'assisSol', 'genoux', 'genou'], ['couche', 'famille', 'prise', 'plein']],
    largeurs: [[1, 1.1, 1, 1], [1, 1.2, 1, 1], [1.3, 1.1, 1, 0.8]],
    vues: {
      debout: v('Debout', 'debout', 0.5),
      penche: v('Penché', 'penche', 0.4),
      accroupi: v('Accroupi', 'accroupi', 0.42),
      portage: v('Portage', 'portage', 0.55),
      assis: v('Assis', 'assis', 0.4),
      assisSol: v('Assis au sol', 'assis-sol', 0.3),
      genoux: v('À genoux', 'genoux', 0.62),
      genou: v('Un genou au sol', 'genou', 0.42),
      couche: v('Couché sur le dos', 'couche', 0.56),
      famille: { titre: 'Adulte, enfant de 5 ans', dessin: z => [sol(z, z.h - 8),
        F.personnage({ x: z.l * 0.3, y: z.h - 8, pose: 'debout', echelle: S }),
        F.personnage({ x: z.l * 0.7, y: z.h - 8, pose: 'debout', echelle: S, age: 'enfant', cote: 'gauche' })].join('\n') },
      prise: { titre: 'Une prise', dessin: z => {
        const y0 = z.h - 8, x0 = z.l * 0.32;
        const m = { x: x0 + 330 * S, y: y0 - 1080 * S, pose: 'prise', vue: 'dos', diametre: 34 * S };
        const p = F.personnage({ x: x0, y: y0, pose: 'debout', echelle: S, prises: { proche: m } });
        const t = p.mains.proche.trou, ax = t.axe;
        const manche = h.ligne(t.x - ax[0] * 110, t.y - ax[1] * 110, t.x + ax[0] * 70, t.y + ax[1] * 70, h.a.contour);
        return [sol(z, y0), manche, p.toString()].join('\n');
      } },
      plein: v('Aplat, enceinte', 'debout', 0.5, { rendu: 'plein', enceinte: true }),
    },
  };
};
