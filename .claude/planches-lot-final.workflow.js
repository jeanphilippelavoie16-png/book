export const meta = {
  name: 'planches-lot-final',
  description: "Finit la bibliotheque de mains, personnages et corde, puis dessine les planches manquantes par lots de 10, sans relecture par agent (JP relit)",
  phases: [
    { title: 'Bibliotheque', detail: 'un agent finit formes.js et sa feuille d essai' },
    { title: 'Planches', detail: 'lots de 10 dessinateurs, un par planche' },
  ],
}

// JP, 27 septembre 2026 : « lance tous les chapitres manquants et les planches manquantes, en lots de 10 agents ».
// JP relit lui-même (pas de relecture par agent). Ses exigences : images/recommandations-planches.md.
const ROOT = 'C:\\Users\\jeanp\\New folder'
const FICHES = 'C:/Users/jeanp/AppData/Local/Temp/claude/C--Users-jeanp-New-folder/bed7cfe7-8639-429a-8cfe-5f58e5149259/scratchpad/fiches'
const BACK = 'C:\\Users\\jeanp\\AppData\\Local\\Temp\\claude\\C--Users-jeanp-New-folder\\bed7cfe7-8639-429a-8cfe-5f58e5149259\\scratchpad\\backup-test-mains'

const S_BIB = { type: 'object', properties: { fonctions: { type: 'array', items: { type: 'string' } }, feuille: { type: 'string' }, regards: { type: 'number' }, limites: { type: 'array', items: { type: 'string' } } }, required: ['fonctions', 'feuille', 'regards', 'limites'] }
const S1 = { type: 'object', properties: { fichiers: { type: 'array', items: { type: 'string' } }, ceQueJeVois: { type: 'string' }, cotes: { type: 'array', items: { type: 'string' } }, laisseDeCote: { type: 'array', items: { type: 'string' } } }, required: ['fichiers', 'ceQueJeVois', 'cotes', 'laisseDeCote'] }

phase('Bibliotheque')
const bib = await agent(`Tu travailles sur les planches du « Grand Livre du Chalet », un manuel de survie imprimé (projet : ${ROOT}). Les planches sont des dessins au trait noir, composés en SVG par \`.claude/skills/planches/scripts/composer-planche.js\` à partir d'une description \`images/planches-src/NN-XX.js\`. Lis la tête du compositeur (jusqu'à \`const fs = require('fs');\`) et **\`images/recommandations-planches.md\` en entier** : ce sont les exigences de JP. Il a jugé ratées des mains en « pince de homard » et en « gant de boxe » (13-09), des mains et une tête maladroites (13-40), un nœud de maille illisible (60-10).

**Ta mission : finir la bibliothèque de formes réutilisables** \`.claude/skills/planches/scripts/formes.js\`, exposée aux descriptions sous \`h.formes\` (déjà branchée au compositeur par une ligne). **Un premier agent l'a commencée (environ 850 lignes) puis a été coupé** : lis-la, garde ce qui est bon, finis et corrige. Il faut :
1. **Des mains**, de côté et de face, gauche et droite : la prise autour d'un manche (diamètre réglable, pouce en face), la pince pouce-index (fil, amadou, aiguille), la paume à plat qui appuie, la main autour d'une pierre ou d'une boule. Position, échelle, angle, côté ; un « trou » où l'objet tenu se dessine. Proportions justes, trait continu et propre, pas de blocs, le minimum de traits.
2. **Des personnages** en silhouette au trait, bien proportionnés : tête de profil, buste de profil, corps debout, corps accroupi ou à genoux. Sobres, sans visage détaillé ni costume.
3. **La corde et le fil** en bande à deux bords parallèles, d'épaisseur réglable, avec des croisements dessus / dessous (le brin du dessous coupé net avec un petit blanc), bout libre et bout fixe distincts, flèche de sens facultative. Et les pièces d'un filet : l'aiguille à filet chargée, le moule, une maille.

**Méthode** : une feuille d'essai (\`images/planches-src/_formes-essai.js\`, composée en SVG et rendue en PNG par \`node .claude/skills/planches/scripts/rendre-planche.js\`) qui montre chaque forme en grand. **Ouvre le PNG, regarde de près, corrige, recommence, jusqu'à six fois.** Les mains d'abord : elles doivent se reconnaître comme de vraies mains au premier coup d'œil. Vérifie à la fin que deux planches existantes (\`images/planches-src/74-40.js\`, \`images/planches-src/86-04.js\`) se composent exactement comme avant (compare le SVG avant et après). Avant de modifier quoi que ce soit, copie formes.js dans \`${BACK}\\\`. Réponds avec la liste des fonctions (nom et paramètres), le chemin du PNG de la feuille d'essai, le nombre de regards et ce qui reste imparfait.`, { label: 'bibliothèque mains, personnages, corde', phase: 'Bibliotheque', schema: S_BIB }).catch(e => null)

const bibTexte = bib
  ? `**La bibliothèque est prête** : \`.claude/skills/planches/scripts/formes.js\`, exposée sous \`h.formes\`. Fonctions : ${bib.fonctions.join(' ; ')}. Feuille d'essai : \`${bib.feuille}\` (regarde-la avant de dessiner). **Chaque main, chaque personnage, chaque corde ou fil de ta planche vient de la bibliothèque** ; ne dessine à la main que les objets.`
  : `Une bibliothèque de mains, de personnages et de corde est dans \`.claude/skills/planches/scripts/formes.js\` (sous \`h.formes\`), mais elle n'est peut-être pas finie : lis-la, et sers-t'en si ses formes sont bonnes ; sinon, évite de montrer des mains (l'objet dans sa position et la flèche du geste suffisent).`

const dessiner = (p) => `Planche **${p.ref}** du « Grand Livre du Chalet », un manuel de survie pour une famille de la Côte-Nord (JP soude, câble du 12 V, abat un orignal, et va **bâtir ou faire** ce que montre la planche sans en avoir jamais vu). Projet : ${ROOT}. Chapitre : \`chapitres/${p.chapitre}\`. Fiche : \`${FICHES}/${p.ref}.md\`. Lis la tête de \`.claude/skills/planches/scripts/composer-planche.js\` (jusqu'à \`const fs = require('fs');\`), dans \`.claude/skills/planches/SKILL.md\` les sections « Avant tout » et « Le texte sur la planche », et **\`images/recommandations-planches.md\` en entier : ce sont les exigences de JP, elles priment**. Dans le chapitre, lis **seulement** les passages sur l'objet (Grep, puis Read avec offset/limit). Travaille économiquement : chaque tour relit tout ton contexte.

${bibTexte}

**Dessine-la.** Une planche montre comment fabriquer ou faire la chose. ${p.profondeur ? "C'est une construction : **en profondeur**, deux à quatre vues (coupe, vu de dessus, élévation, détail d'assemblage), des vues alignées entre elles comme un vrai dessin technique ; deux pages (a et b) si une ne suffit pas." : 'Le format suit le contenu.'} **Cotes en mm sur ce qu'on construit**, seulement celles que le chapitre donne. Aucun chiffre qui ne soit pas dans le chapitre ; rien de marqué [À VÉRIFIER] sur le dessin. Six renvois au plus par vue ; aucun mot sur le dessin sauf une cote. Écris \`images/planches-src/${p.ref}.js\` (s'il existe déjà, c'est l'ancienne version : copie-la d'abord dans \`${BACK}\\\`, puis refais-la), compose avec \`--zones\` puis sans, **ouvre le PNG et regarde**, quatre fois au plus.

**Il n'y aura pas de relecteur après toi : JP relit lui-même.** Avant de rendre, vérifie toi-même que **le montage marcherait pour vrai** (suis l'eau, la fumée, l'air, la corde, la charge : d'où ça vient, par où ça passe, où ça sort), que chaque objet se reconnaît sans la légende, qu'une coupe en couches se lit couche par couche et qu'un geste fin se suit sans ambiguïté. Ne touche qu'à ta description et au SVG qu'elle produit.`

phase('Planches')
const LOT = 10
const res = []
for (let i = 0; i < args.length; i += LOT) {
  const lot = args.slice(i, i + LOT)
  const r = await parallel(lot.map(p => () =>
    agent(dessiner(p), { label: `dessin ${p.ref}`, phase: 'Planches', schema: S1 })
      .then(d => d ? { ref: p.ref, ...d } : { ref: p.ref, erreur: 'dessin sans résultat' })
      .catch(e => ({ ref: p.ref, erreur: String(e) }))
  ))
  res.push(...r)
}
return { bibliotheque: bib, planches: res }
