export const meta = {
  name: 'test-mains-fil',
  description: "Essai de la nouvelle approche des planches : une bibliotheque de mains, de personnages et de corde bien dessines, puis trois planches refaites avec (13-09, 13-40, 60-10)",
  phases: [
    { title: 'Bibliotheque', detail: 'un agent dessine une fois, avec soin, les mains, les personnages et la corde reutilisables' },
    { title: 'Planches', detail: 'trois planches refaites avec la bibliotheque' },
  ],
}

// JP, 24 septembre 2026 : « Test main et dessin pi fil, 3 dessins total. »
const ROOT = 'C:\\Users\\jeanp\\New folder'
const BACK = 'C:\\Users\\jeanp\\AppData\\Local\\Temp\\claude\\C--Users-jeanp-New-folder\\bed7cfe7-8639-429a-8cfe-5f58e5149259\\scratchpad\\backup-test-mains'
const CTX = `Tu travailles sur les planches du « Grand Livre du Chalet », un manuel de survie imprimé (projet : ${ROOT}). Les planches sont des dessins au trait noir, composés en SVG par \`.claude/skills/planches/scripts/composer-planche.js\` à partir d'une description \`images/planches-src/NN-XX.js\` ; lis la tête du compositeur (jusqu'à \`const fs = require('fs');\`) et, dans \`.claude/skills/planches/SKILL.md\`, « Avant tout » et « Le texte sur la planche ». **Lis aussi \`images/recommandations-planches.md\` en entier : ce sont les exigences de JP, et c'est ce que cet essai doit satisfaire.** JP a jugé plusieurs planches ratées : des mains en « pince de homard » et en « gant de boxe » (13-09), des mains et une tête maladroites (13-40), un nœud de maille illisible (60-10). Le problème vient de ce que chaque dessinateur improvise ses mains et ses cordes à main levée en coordonnées, planche par planche.`

const S_BIB = { type: 'object', properties: { fonctions: { type: 'array', items: { type: 'string' } }, feuille: { type: 'string' }, regards: { type: 'number' }, limites: { type: 'array', items: { type: 'string' } } }, required: ['fonctions', 'feuille', 'regards', 'limites'] }
const S_PL = { type: 'object', properties: { fichiers: { type: 'array', items: { type: 'string' } }, ceQuiAChange: { type: 'string' }, limites: { type: 'array', items: { type: 'string' } } }, required: ['fichiers', 'ceQuiAChange', 'limites'] }

phase('Bibliotheque')
const bib = await agent(`${CTX}

**Ta mission : fabriquer, une fois pour toutes et avec grand soin, une bibliothèque de formes réutilisables**, dans un fichier séparé \`.claude/skills/planches/scripts/formes.js\`, que le compositeur expose aux descriptions sous \`h.formes\` (ajoute une seule ligne au compositeur pour le brancher ; ne change rien d'autre à son comportement, et vérifie en recomposant deux planches existantes, par exemple \`images/planches-src/74-40.js\` et \`images/planches-src/86-04.js\`, que leur SVG ne change pas).

Ce qu'il faut :
1. **Des mains**, vues de côté et de face, gauche et droite, en quelques poses qui couvrent les planches : **la prise** (les doigts refermés autour d'un manche ou d'un objet cylindrique, le pouce en face, de diamètre réglable), **la pince** (pouce et index qui tiennent un objet mince : amadou, fil, aiguille), **la paume à plat qui appuie**, **la main qui tient une pierre ou une boule** (doigts courbés autour d'un volume). Chaque main se place par sa position, son échelle, son angle et le côté, et laisse un « trou » où l'objet tenu se dessine. Des proportions justes (la paume, quatre doigts de longueurs différentes avec leurs articulations, un pouce qui part du bas de la paume, le poignet), un trait continu et propre, pas de blocs. Inspire-toi du dessin technique et des manuels illustrés classiques : une main lisible, sans ombres, avec le minimum de traits.
2. **Des personnages** en silhouette au trait, bien proportionnés : une tête de profil, un buste de profil, un corps debout et un corps accroupi ou à genoux, de profil. Sobres, sans visage détaillé, sans costume.
3. **La corde et le fil** : une fonction qui dessine un fil ou une corde le long d'un chemin, en **bande à deux bords parallèles** d'épaisseur réglable, avec des **croisements dessus / dessous** (le brin qui passe dessous est coupé net de part et d'autre du brin du dessus, avec un petit blanc), un **bout libre** et un **bout fixe** qu'on distingue, et une flèche de sens facultative. Et les pièces d'un filet : l'aiguille à filet chargée, le moule, une maille.

**Méthode :** fais une **feuille d'essai** (\`images/planches-src/_formes-essai.js\` composée en SVG, rendue en PNG) qui montre chaque forme en grand, à l'échelle d'une planche pleine page. **Ouvre le PNG et regarde-le de près ; corrige ; recommence, jusqu'à six fois.** Les mains passent en premier : elles doivent se reconnaître comme de vraies mains au premier coup d'œil. Garde la feuille d'essai finale.

Avant de modifier le compositeur, copie-le dans \`${BACK}\\\`. Réponds avec la liste des fonctions (nom et paramètres), le chemin de la feuille d'essai en PNG, combien de regards tu as faits, et ce qui reste imparfait.`, { label: 'bibliothèque mains, personnages, corde', phase: 'Bibliotheque', schema: S_BIB })

if (!bib) return { erreur: 'la bibliothèque n’a pas abouti' }

phase('Planches')
const PLANCHES = [
  { ref: '13-09', ch: '13-feu-sans-allumettes.md', quoi: "le briquet à pierre : la main qui tient la pierre et l'amadou (pince du pouce sur l'amadou, doigts autour de la pierre), la main qui tient l'acier en U (prise, doigts dans le U), la frappe vers le bas en rasant l'arête ; l'acier, la pierre. JP : la main de la pierre ressemblait à une pince de homard, le poing de l'acier à un gant de boxe." },
  { ref: '13-40', ch: '13-feu-sans-allumettes.md', quoi: "le ferrocérium, du tas de bois à la flamme : trier le bois ; le geste (couteau tenu immobile d'une main, tige tirée vers soi de l'autre, gerbe dans le nid) ; refermer le nid dans la main et souffler (une tête de profil) ; glisser le nid sous le tipi. JP : « Tabarnak, ouff » — mains et couteau en blocs, tête en tuque maladroite." },
  { ref: '60-10', ch: '60-nasses-filets-verveux.md', quoi: "l'aiguille à filet, la maille et le ramendage : l'aiguille taillée dans un bardeau et chargée ; le moule ; le nœud de maille dessiné en gros plan, **une étape par vue**, le fil suivi sans ambiguïté (dessus / dessous à chaque croisement, bout libre et dormant distincts, sens de la boucle) ; puis un rang sur le moule ; puis le ramendage (le trou, recoupé jusqu'aux mailles entières, renoué). Deux pages si nécessaire. JP : illisible, « les dessins complexes comme la couture doivent être extrêmement bien faits, sinon inutiles »." },
]
const res = await parallel(PLANCHES.map(p => () => agent(`${CTX}

**La bibliothèque est prête** : \`.claude/skills/planches/scripts/formes.js\`, exposée sous \`h.formes\`. Fonctions : ${bib.fonctions.join(' ; ')}. Feuille d'essai : \`${bib.feuille}\` (regarde-la d'abord).

**Ta mission : refaire la planche ${p.ref}** — ${p.quoi} Chapitre : \`chapitres/${p.ch}\` (lis seulement les passages sur la chose, par Grep puis Read avec offset/limit). La description actuelle est \`images/planches-src/${p.ref}.js\` : copie-la d'abord, avec son SVG (\`images/planche-${p.ref}*.svg\`), dans \`${BACK}\\\`. **Utilise les mains, les personnages et la corde de la bibliothèque** au lieu de les dessiner à la main ; ne fais à la main que les objets. Garde ce qui était juste dans l'ancienne planche (le contenu, les renvois, l'encadré danger), refais ce qui était laid. Aucun chiffre qui ne soit pas dans le chapitre. Compose, **ouvre le PNG et regarde**, corrige, jusqu'à quatre fois. Vérifie toi-même que le geste montré marche pour vrai. Ne touche qu'à cette planche. Réponds avec les fichiers, ce qui a changé par rapport à l'ancienne version, et ce qui reste imparfait.`, { label: `planche ${p.ref}`, phase: 'Planches', schema: S_PL }).then(r => ({ ref: p.ref, ...(r || { erreur: 'sans résultat' }) })).catch(e => ({ ref: p.ref, erreur: String(e) }))))

return { bibliotheque: bib, planches: res }
