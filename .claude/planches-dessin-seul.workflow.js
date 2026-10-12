export const meta = {
  name: 'planches-dessin-seul',
  description: 'Dessine des planches avec le compositeur, un agent par planche, sans relecture par agent : JP relit lui-meme',
  phases: [{ title: 'Dessin', detail: 'un agent par planche, brief ferme, trois regards au plus' }],
}

// JP, le 24 septembre 2026 : « les dessins, je veux pas de relecture, c'est trop coûteux — c'est moi la relecture ».
// Le dessinateur regarde son propre PNG (trois fois au plus) et vérifie le montage lui-même ; JP valide.
const FICHES = 'C:/Users/jeanp/AppData/Local/Temp/claude/C--Users-jeanp-New-folder/bed7cfe7-8639-429a-8cfe-5f58e5149259/scratchpad/fiches'
const S1 = { type: 'object', properties: { fichiers: { type: 'array', items: { type: 'string' } }, ceQueJeVois: { type: 'string' }, cotes: { type: 'array', items: { type: 'string' } }, laisseDeCote: { type: 'array', items: { type: 'string' } } }, required: ['fichiers', 'ceQueJeVois', 'cotes', 'laisseDeCote'] }

const dessiner = (p) => `Planche **${p.ref}** du « Grand Livre du Chalet », un manuel de survie pour une famille de la Côte-Nord (JP soude, câble du 12 V, abat un orignal, et va **bâtir ou faire** ce que montre la planche sans en avoir jamais vu). Projet : C:\\Users\\jeanp\\New folder. Chapitre : \`chapitres/${p.chapitre}\`. Fiche : \`${FICHES}/${p.ref}.md\`. Lis la tête de \`.claude/skills/planches/scripts/composer-planche.js\` (jusqu'à \`const fs = require('fs');\`) et, dans \`.claude/skills/planches/SKILL.md\`, les sections « Avant tout » et « Le texte sur la planche ». Dans le chapitre, lis **seulement** les passages sur l'objet (Grep, puis Read avec offset/limit). Travaille économiquement : chaque tour relit tout ton contexte.

**Dessine-la.** Une planche montre comment fabriquer ou faire la chose. ${p.profondeur ? "C'est une construction : **en profondeur**, deux à quatre vues (coupe, vu de dessus, élévation, détail d'assemblage), chaque vue montre ce que les autres ne montrent pas ; deux pages (a et b) si une ne suffit pas." : 'Le format suit le contenu.'} Ce qu'on trouve partout, pas ce qui s'achète. **Aucun chiffre qui ne soit pas dans le chapitre** ; rien de marqué [À VÉRIFIER] sur le dessin. Six renvois au plus par vue ; aucun mot sur le dessin sauf une cote. Écris \`images/planches-src/${p.ref}.js\` (si le fichier existe déjà, c'est une tentative coupée : pars de lui), compose avec \`--zones\` puis sans, **ouvre le PNG et regarde**, trois fois au plus.

**Il n'y aura pas de relecteur après toi : JP relit lui-même.** Avant de rendre, vérifie donc toi-même que **le montage marcherait pour vrai** : suis l'eau, la fumée, l'air, la corde, la charge — d'où ça vient, par où ça passe, où ça sort (un siphon dont la sortie est plus haute que la prise, un trou à feu ouvert qui tire droit en l'air, une charnière coincée : ces fautes-là sont déjà arrivées). Ne touche qu'à ta description et au SVG qu'elle produit.`

const res = await parallel(args.map(p => () =>
  agent(dessiner(p), { label: `dessin ${p.ref}`, phase: 'Dessin', schema: S1 })
    .then(d => d ? { ref: p.ref, ...d } : { ref: p.ref, erreur: 'dessin sans résultat' })
    .catch(e => ({ ref: p.ref, erreur: String(e) }))
))
return res
