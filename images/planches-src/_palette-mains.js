// Feuille d'essai — la palette des mains validées (mains/moteur.js, h.formes.mainSimple, JP 14 octobre 2026).
// Pas une planche du livre : chaque prise de mains/poses.json, dans sa première bonne vue, pour choisir d'un coup d'œil.
const POSES = require('../../.claude/skills/planches/scripts/mains/poses.json').poses;
module.exports = (h) => {
  const F = h.formes;
  const ids = POSES.map(p => p.id);
  const lettres = 'abcdefghijklmnopqrstuvwx'.split('');
  const vues = {};
  ids.forEach((id, i) => {
    const p = POSES[i], vue = (p.vues && p.vues.bonnes && p.vues.bonnes[0]) || 'dos';
    vues[lettres[i]] = { titre: `${id} · ${vue}`, dessin: z => {
      const e = Math.min(z.l, z.h) * 0.8 / 190;
      try {
        return String(F.mainSimple({ x: z.l / 2, y: z.h * 0.42, pose: id, vue, echelle: e, angle: -90,
          ancre: 'prise', avantbras: { longueur: 45 } }));
      } catch (err) { return h.texte ? '' : ''; }
    } };
  });
  const L = lettres.slice(0, ids.length), rangs = [];
  for (let i = 0; i < L.length; i += 4) rangs.push(L.slice(i, i + 4));
  return { ref: 'palette-mains', titre: 'La palette des mains', desc: 'Les prises de la bibliothèque de mains validée.',
    fichier: '_palette-mains.svg', format: 'pleine', disposition: rangs, vues };
};
