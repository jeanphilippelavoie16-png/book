export const meta = {
  name: 'planches-reste',
  description: "Dessine toutes les planches qui restent (fin du lot final + planches des nouveaux chapitres) en trois groupes paralleles, chacun par lots de 10, sans relecture par agent (JP relit)",
  phases: [{ title: 'Planches', detail: 'trois groupes en parallele, lots de 10 dessinateurs, un par planche' }],
}

// JP, 27 septembre 2026, après la pause : « split-le en plusieurs groupes de 10 agents, tout ce qui reste ».
// args = [{ ref, chapitre, profondeur }] (scratchpad/args-reste.json). Fiches : scratchpad/fiches/<ref>.md.
const ROOT = 'C:\\Users\\jeanp\\New folder'
const FICHES = 'C:/Users/jeanp/AppData/Local/Temp/claude/C--Users-jeanp-New-folder/bed7cfe7-8639-429a-8cfe-5f58e5149259/scratchpad/fiches'
const BACK = 'C:\\Users\\jeanp\\AppData\\Local\\Temp\\claude\\C--Users-jeanp-New-folder\\bed7cfe7-8639-429a-8cfe-5f58e5149259\\scratchpad\\backup-test-mains'
const S1 = { type: 'object', properties: { fichiers: { type: 'array', items: { type: 'string' } }, ceQueJeVois: { type: 'string' }, cotes: { type: 'array', items: { type: 'string' } }, laisseDeCote: { type: 'array', items: { type: 'string' } } }, required: ['fichiers', 'ceQueJeVois', 'cotes', 'laisseDeCote'] }

const DESS = (p) => `Planche **${p.ref}** du « Grand Livre du Chalet », un manuel de survie pour une famille de la Côte-Nord (JP soude, câble du 12 V, abat un orignal, et va **bâtir ou faire** ce que montre la planche sans en avoir jamais vu). Projet : ${ROOT}. Chapitre : \`chapitres/${p.chapitre}\`. Fiche : \`${FICHES}/${p.ref}.md\`. Lis la tête de \`.claude/skills/planches/scripts/composer-planche.js\` (jusqu'à \`const fs = require('fs');\`), dans \`.claude/skills/planches/SKILL.md\` les sections « Avant tout » et « Le texte sur la planche », et **\`images/recommandations-planches.md\` en entier : ce sont les exigences de JP, elles priment**. Dans le chapitre, lis **seulement** les passages sur l'objet (Grep, puis Read avec offset/limit). Travaille économiquement : chaque tour relit tout ton contexte.

**Reprise.** Un premier passage a été arrêté net : si \`images/planches-src/${p.ref}.js\` ou un SVG \`images/planche-${p.ref}*\` existe déjà, c'est un travail interrompu. Regarde-le : s'il est complet et bon, garde-le et finis-le ; sinon, copie-le dans \`${BACK}\\\` et refais-le.

**Mains, personnages, corde et fil viennent de la bibliothèque** \`.claude/skills/planches/scripts/formes.js\` (sous \`h.formes\` : \`main\`, \`personnage\`, \`tete\`, \`buste\`, \`cordes\`, \`corde\`, \`aiguilleFilet\`, \`moule\`, \`maille\` ; lis les commentaires de tête de chaque fonction). Regarde sa feuille d'essai \`C:/Users/jeanp/AppData/Local/Temp/claude/C--Users-jeanp-New-folder/bed7cfe7-8639-429a-8cfe-5f58e5149259/scratchpad/_formes-essai-mains.png\` avant de dessiner une main. Ses points faibles : la prise vue de profil (un bloc) et la pince sur un fil ; préfère la prise vue de dos ou de la paume, et ne dessine à la main que les objets. **Un corps vu de dessus se lit mal** (des taches) : montre plutôt les pieds seuls, en empreintes, avec une flèche.

**Dessine-la.** Une planche montre comment fabriquer ou faire la chose. ${p.profondeur ? "C'est une construction ou une coupe : **en profondeur**, deux à quatre vues alignées entre elles comme un vrai dessin technique ; une coupe en couches se lit couche par couche ; deux pages (a et b) si une ne suffit pas." : 'Le format suit le contenu.'} **Cotes en mm sur ce qu'on construit**, seulement celles que le chapitre donne. Aucun chiffre qui ne soit pas dans le chapitre ; rien de marqué [À VÉRIFIER]. Six renvois au plus par vue ; aucun mot sur le dessin sauf une cote. Écris \`images/planches-src/${p.ref}.js\`, compose avec \`--zones\` puis sans, **ouvre le PNG et regarde**, quatre fois au plus.

**Il n'y aura pas de relecteur après toi : JP relit lui-même.** Avant de rendre, vérifie que **le montage marcherait pour vrai** (suis l'eau, la chaleur, l'air, la corde, la charge), que chaque objet se reconnaît sans la légende, qu'un corps humain a des proportions justes, qu'une flèche pointe dans le vrai sens du geste et qu'un geste fin se suit sans ambiguïté. Ne touche qu'à ta description et au SVG qu'elle produit.`

const dessiner = p => agent(DESS(p), { label: `dessin ${p.ref}`, phase: 'Planches', schema: S1 })
  .then(d => d ? { ref: p.ref, ...d } : { ref: p.ref, erreur: 'dessin sans résultat' })
  .catch(e => ({ ref: p.ref, erreur: String(e) }))

// Trois groupes en parallèle ; dans chaque groupe, des lots de 10 l'un après l'autre.
phase('Planches')
const GROUPES = 3, LOT = 10
const taille = Math.ceil(args.length / GROUPES)
const groupes = Array.from({ length: GROUPES }, (_, g) => args.slice(g * taille, (g + 1) * taille)).filter(g => g.length)
const parGroupe = await parallel(groupes.map(g => async () => {
  const res = []
  for (let i = 0; i < g.length; i += LOT) res.push(...await parallel(g.slice(i, i + LOT).map(p => () => dessiner(p))))
  return res
}))
return { planches: parGroupe.flat() }
