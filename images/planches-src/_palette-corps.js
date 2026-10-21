// Feuille d'essai — la palette des corps validés (corps/moteur.js, h.formes.corps, de profil ; JP 13 et 14 octobre 2026).
// Pas une planche du livre. PALETTE_PAGE=1, 2 ou 3 : vingt poses de corps/poses.json par feuille.
const POSES = require('../../.claude/skills/planches/scripts/corps/poses.json').poses;
module.exports = (h) => {
  const F = h.formes;
  const page = +(process.env.PALETTE_PAGE || 1);
  const ids = (Array.isArray(POSES) ? POSES.map(p => p.id) : Object.keys(POSES)).slice((page - 1) * 20, page * 20);
  const lettres = 'abcdefghijklmnopqrst'.split('');
  const vues = {};
  ids.forEach((id, i) => {
    vues[lettres[i]] = { titre: id, dessin: z => {
      try {
        const e = z.h * 0.78 / 1750;
        return String(F.corps({ x: z.l / 2, y: z.h * 0.95, pose: id, vue: 'profil', echelle: e, visage: true }));
      } catch (err) { return ''; }
    } };
  });
  const L = lettres.slice(0, ids.length), rangs = [];
  for (let i = 0; i < L.length; i += 4) rangs.push(L.slice(i, i + 4));
  return { ref: 'palette-corps-' + page, titre: 'La palette des corps', desc: 'Les poses de la bibliothèque des corps.',
    fichier: `_palette-corps-${page}.svg`, format: 'pleine', disposition: rangs, vues };
};
