// Feuille d'essai de la bibliothèque h.formes (.claude/skills/planches/scripts/formes.js).
// Pas une planche du livre : elle montre chaque forme, avec l'objet qu'elle tient, pour juger
// d'un coup d'œil. En plus grand : _formes-essai-mains.js, _formes-essai-corps.js,
// _formes-essai-fil.js.
module.exports = (h) => {
  const A = h.a, F = h.formes;
  const sol = (z, y) => h.ligne(4, y, z.l - 4, y, A.arete);
  // un manche droit dans l'axe du trou (prise vue du dos ou côté paume), dessiné AVANT la main
  const manche = (m, haut, bas) => {
    const [ax, ay] = m.trou.axe, r = m.trou.r;
    const p = (s, t) => [m.trou.x + ax * s - ay * t, m.trou.y + ay * s + ax * t];
    return h.chemin([p(haut, -r), p(-bas, -r), p(-bas, r), p(haut, r)], A.hachure('bois', 'contour'), true);
  };
  // le bout d'un manche vu en face : il vient vers l'œil, il se dessine APRÈS la main
  const bout = (m, motif = 'bois') => h.cercle(m.trou.x, m.trou.y, m.trou.r, A.hachure(motif, 'contour'));
  const vue = (titre, dessin) => ({ titre, dessin });
  return {
    ref: 'essai',
    titre: 'La bibliothèque de formes : mains, corps, fil et filet',
    desc: 'Feuille d’essai : chaque forme de la bibliothèque, avec l’objet qu’elle tient.',
    fichier: '_formes-essai.svg',
    format: 'pleine',
    disposition: [['prise', 'pince', 'boule'], ['appuiP', 'appuiD', 'priseD', 'priseM'], ['tete', 'debout', 'accroupi', 'genoux', 'genou'], ['maille', 'corde', 'filet']],
    hauteurs: [1, 1.05, 1.3, 1.35],
    largeurs: [[1, 1.05, 1], [1.25, 1.2, 0.8, 0.8], [0.8, 0.55, 1, 1, 1], [1, 1, 1.1]],
    vues: {
      prise: vue('Prise, de profil', z => {
        const m = F.main({ x: z.l * 0.62, y: z.h * 0.5, pose: 'prise', vue: 'profil', diametre: 32 * 1.05, echelle: 1.05, bras: 30 });
        return [m, bout(m)].join('\n');
      }),
      pince: vue('Pince, de profil', z => {
        const x = z.l * 0.66, y = z.h * 0.66;
        const fil = h.chemin([[x - 120, y + 34], [x + 50, y - 16]], A.arete);
        return F.main({ x, y, pose: 'pince', vue: 'profil', echelle: 0.82, bras: 30, objet: fil }).toString();
      }),
      boule: vue('Boule, de profil', z => {
        const x = z.l * 0.6, y = z.h * 0.52;
        const m = F.main({ x, y, pose: 'boule', vue: 'profil', diametre: 64 * 0.72, echelle: 0.72, bras: 30 });
        return [h.cercle(x, y, m.trou.r, A.hachure('pierre', 'contour')), m].join('\n');
      }),
      appuiP: vue('Appui, de profil', z => {
        const y = z.h - 14;
        return [h.rect(4, y, z.l - 8, 10, A.hachure('bois', 'contour')),
          F.main({ x: z.l * 0.42, y, pose: 'appui', vue: 'profil', echelle: 0.58, bras: 50 })].join('\n');
      }),
      appuiD: vue('Appui, vu du dos', z => F.main({ x: z.l * 0.55, y: z.h * 0.55, pose: 'appui', vue: 'dos', echelle: 0.55, bras: 25 }).toString()),
      priseD: vue('Prise, dos', z => {
        const m = F.main({ x: z.l * 0.6, y: z.h * 0.5, pose: 'prise', vue: 'dos', diametre: 18, echelle: 0.55, bras: 15 });
        return [manche(m, z.h * 0.5 - 2, z.h * 0.5 - 2), m].join('\n');
      }),
      priseM: vue('Prise, paume', z => {
        const m = F.main({ x: z.l * 0.6, y: z.h * 0.5, pose: 'prise', vue: 'paume', diametre: 18, echelle: 0.55, bras: 15 });
        return [manche(m, z.h * 0.5 - 2, z.h * 0.5 - 2), m].join('\n');
      }),
      tete: vue('Tête, buste', z => [F.tete({ x: z.l * 0.4, y: z.h * 0.22, echelle: 0.3 }),
        F.buste({ x: z.l * 0.5, y: z.h - 2, echelle: 0.15 })].join('\n')),
      debout: vue('Debout', z => [sol(z, z.h - 4), F.personnage({ x: z.l * 0.45, y: z.h - 4, pose: 'debout', echelle: (z.h - 10) / 1780 })].join('\n')),
      accroupi: vue('Accroupi', z => [sol(z, z.h - 4), F.personnage({ x: z.l * 0.36, y: z.h - 4, pose: 'accroupi', echelle: 0.135 })].join('\n')),
      genoux: vue('À genoux', z => [sol(z, z.h - 4), F.personnage({ x: z.l * 0.6, y: z.h - 4, pose: 'genoux', echelle: 0.135 })].join('\n')),
      genou: vue('Un genou au sol', z => [sol(z, z.h - 4), F.personnage({ x: z.l * 0.5, y: z.h - 4, pose: 'genou', echelle: 0.135 })].join('\n')),
      maille: vue('La maille : nœud d’écoute', z => F.maille({ x: z.l * 0.5, y: z.h * 0.49, echelle: (z.h - 8) / 240, ep: 4 }).toString()),
      corde: vue('Corde : dessus, dessous, bouts', z => {
        const k = z.h / 10.5, cx = z.l * 0.5, cy = z.h * 0.56;
        const pts = [[cx - 4.6 * k, cy - 4.2 * k, 0], [cx - 2.6 * k, cy - 3.6 * k, 0]];
        for (let t = Math.PI + 0.55; t <= 3 * Math.PI - 0.55 + 1e-9; t += (2 * Math.PI - 1.1) / 16)
          pts.push([cx + k * (Math.sin(t) + 2 * Math.sin(2 * t)), cy + k * (Math.cos(t) - 2 * Math.cos(2 * t)), -Math.sin(3 * t)]);
        pts.push([cx + 2.6 * k, cy - 3.6 * k, 0], [cx + 4.6 * k, cy - 4.2 * k, 0]);
        return F.cordes([{ pts, ep: 8, torons: true, debut: 'fixe', fin: 'libre', fleche: { de: 0.9, a: 0.99, cote: 'droite' } }]).toString();
      }),
      filet: vue('Aiguille chargée, moule', z => [
        F.aiguilleFilet({ x: z.l * 0.5, y: z.h * 0.3, longueur: z.l - 12 }),
        F.moule({ x: z.l * 0.5, y: z.h * 0.62, longueur: z.l - 12, largeur: 26 })].join('\n')),
    },
  };
};
