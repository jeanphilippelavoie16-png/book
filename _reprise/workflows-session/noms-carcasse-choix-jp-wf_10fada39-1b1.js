export const meta = {
  name: 'noms-carcasse-choix-jp',
  description: "Applique les choix de JP sur les noms des morceaux (ch. 62, 63, 64, glossaire, planches) et la salaison de l'exterieur de ronde, puis reassemble le tome 4",
  phases: [{ title: 'Choix de JP', detail: 'un agent' }],
}
const ROOT = 'C:\\Users\\jeanp\\New folder'
const S = { type: 'object', properties: { fichiers: { type: 'array', items: { type: 'string' } }, fait: { type: 'array', items: { type: 'string' } }, pagesTome4: { type: 'number' }, reste: { type: 'array', items: { type: 'string' } } }, required: ['fichiers', 'fait', 'reste'] }
phase('Choix de JP')
return await agent(`Tu travailles sur « Le Grand Livre du Chalet ». Projet : ${ROOT}. **CLAUDE.md prime.** Lis la fin de \`suivi/62-redaction.md\` (section « Alignement sur la documentation des planches — 29 septembre 2026 ») et \`suivi/62-documentation-planches.md\` §3.

**JP a tranché (29 septembre 2026) :**
1. **« Merlan » disparaît** : on dit **« chapeau de l'intérieur de ronde »** (gracilis ; avec son côté mou, sartorius et pectineus), le nom de l'ACIA et de l'OQLF. Partout : ch. 62, tout autre chapitre qui dit « merlan » pour ce morceau (Grep dans \`chapitres/\`), \`plan/glossaire.md\`, et la planche **62-08** (titre et renvois dans \`images/planches-src/62-08.js\`).
2. **« Haut de surlonge »** (gluteus medius), plus « haut de croupe » : retitre la planche **62-10**, corrige le renvoi de la **62-04**, le nom dans \`images/planches-src/_carcasse-orignal.js\` (fessierMoyen.nom), le glossaire, et vérifie le **ch. 63** (étape 9 appelle « la croupe » la pièce du gluteus medius : aligne).
3. **« Paleron » (derrière l'épine) et « palette » (devant)** sont gardés, comme au ch. 64 : refais les renvois 1 et 2 de la planche **62-16** (qui disent encore « palette, dessus / dessous »). Au ch. 64, « Paleron | La seule pièce à fibre courte du quartier » n'a pas de source : retire « la seule » ou la phrase.
4. **L'extérieur de ronde se fend en deux** avant le sel, le long de sa ligne centrale, pour donner deux pièces à un seul grain (il est bipenné) : écris-le au ch. 62 (§5.2 et §5.6, et que le §3 et le §6 disent pareil : « un seul muscle, un seul grain »). Applique la même logique, sans rien inventer, à l'intérieur de ronde (deux muscles : se séparent à leur couture avant le sel) et au gros chef du triceps. La **palette** : le ch. 64 dit qu'elle se sale bien, le ch. 62 l'envoie au braisé ; aligne les deux sur ce que la documentation établit (grain non établi → pas au sel à sec) et dis-le dans « reste ».

Corrige avec Edit. Compose de nouveau chaque planche touchée (\`node .claude/skills/planches/scripts/composer-planche.js\` comme le dit le SKILL, puis \`rendre-planche.js\` vers \`images/a-valider/\`) et **regarde le PNG** : le titre et les renvois doivent tenir sans chevauchement. Note tout dans \`suivi/62-redaction.md\` (et 63, 64), section « Choix de JP — 29 septembre 2026 ». Puis réassemble le tome 4 (\`python design/outils/assembler-tome.py 4\`) ; si la tranche change, mets le compte dans PAGES de \`design/directions/1-manuel-de-terrain/outils/build_couvertures_6.py\` et relance \`outils/rendre_couvertures_6.sh\`.`, { label: 'choix de JP : noms et salaison', phase: 'Choix de JP', schema: S })
