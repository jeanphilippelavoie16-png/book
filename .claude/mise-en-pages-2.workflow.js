export const meta = {
  name: 'mise-en-pages-2',
  description: "Applique les choix de JP a la mise en pages (couleur du tome 6, ouvertures a droite, 00 en tete, planches a valider posees), corrige l'outil, assemble les six tomes, puis refait couvertures et tranches aux vrais comptes",
  phases: [
    { title: 'Planches', detail: 'les 22 planches qui restent, trois groupes en parallele, lots de 10' },
    { title: 'Outil et tomes', detail: 'corrections, puis assemblage des six tomes' },
    { title: 'Couvertures', detail: 'tome 6 en fonte, tranches aux vrais comptes' },
  ],
}

// JP, 27 septembre 2026 : tome 5 écorce, tome 6 FONTE ; chaque chapitre ouvre à droite ; le 00 avant tout au
// tome 1 ; les planches à valider sont posées ; le 00 en double page et le 00b à cocher sont gardés.
const ROOT = 'C:\\Users\\jeanp\\New folder'
const TETE = `Tu travailles sur « Le Manuel du Nord », six tomes imprimés chez Blurb (livre photo 8 × 10 po). Projet : ${ROOT}. CLAUDE.md prime. Lis \`design/choix.md\`, \`sources/blurb-specifications.md\` et \`livre/tome-6/rapport.md\`. **Écris au fur et à mesure.** Ne modifie aucun chapitre sauf ce qui est demandé ici.`
const FICHES = 'C:/Users/jeanp/AppData/Local/Temp/claude/C--Users-jeanp-New-folder/bed7cfe7-8639-429a-8cfe-5f58e5149259/scratchpad/fiches'
const BACK = 'C:/Users/jeanp/AppData/Local/Temp/claude/C--Users-jeanp-New-folder/bed7cfe7-8639-429a-8cfe-5f58e5149259/scratchpad/backup-test-mains'
const S1 = { type: 'object', properties: { fichiers: { type: 'array', items: { type: 'string' } }, ceQueJeVois: { type: 'string' }, cotes: { type: 'array', items: { type: 'string' } }, laisseDeCote: { type: 'array', items: { type: 'string' } } }, required: ['fichiers', 'ceQueJeVois', 'cotes', 'laisseDeCote'] }
const DESS = (p) => `Planche **${p.ref}** du « Manuel du Nord », un manuel de survie pour une famille de la Côte-Nord (JP soude, câble du 12 V, abat un orignal, et va **bâtir ou faire** ce que montre la planche sans en avoir jamais vu). Projet : ${ROOT}. Chapitre : \`chapitres/${p.chapitre}\`. Fiche : \`${FICHES}/${p.ref}.md\`. Lis la tête de \`.claude/skills/planches/scripts/composer-planche.js\` (jusqu'à \`const fs = require('fs');\`), dans \`.claude/skills/planches/SKILL.md\` les sections « Avant tout » et « Le texte sur la planche », et **\`images/recommandations-planches.md\` en entier : ce sont les exigences de JP, elles priment**. Dans le chapitre, lis **seulement** les passages sur l'objet (Grep, puis Read avec offset/limit). Travaille économiquement : chaque tour relit tout ton contexte.

**Reprise.** Un premier passage a été arrêté net : si \`images/planches-src/${p.ref}.js\` ou un SVG \`images/planche-${p.ref}*\` existe déjà, c'est un travail interrompu. Regarde-le : s'il est complet et bon, garde-le et finis-le ; sinon, copie-le dans \`${BACK}\\\` et refais-le.

**Mains, personnages, corde et fil viennent de la bibliothèque** \`.claude/skills/planches/scripts/formes.js\` (sous \`h.formes\` : \`main\`, \`personnage\`, \`tete\`, \`buste\`, \`cordes\`, \`corde\`, \`aiguilleFilet\`, \`moule\`, \`maille\` ; lis les commentaires de tête de chaque fonction). Regarde sa feuille d'essai \`C:/Users/jeanp/AppData/Local/Temp/claude/C--Users-jeanp-New-folder/bed7cfe7-8639-429a-8cfe-5f58e5149259/scratchpad/_formes-essai-mains.png\` avant de dessiner une main. Ses points faibles : la prise vue de profil (un bloc) et la pince sur un fil ; préfère la prise vue de dos ou de la paume, et ne dessine à la main que les objets. **Un corps vu de dessus se lit mal** (des taches) : montre plutôt les pieds seuls, en empreintes, avec une flèche.

**Dessine-la.** Une planche montre comment fabriquer ou faire la chose. ${p.profondeur ? "C'est une construction ou une coupe : **en profondeur**, deux à quatre vues alignées entre elles comme un vrai dessin technique ; une coupe en couches se lit couche par couche ; deux pages (a et b) si une ne suffit pas." : 'Le format suit le contenu.'} **Cotes en mm sur ce qu'on construit**, seulement celles que le chapitre donne. Aucun chiffre qui ne soit pas dans le chapitre ; rien de marqué [À VÉRIFIER]. Six renvois au plus par vue ; aucun mot sur le dessin sauf une cote. Écris \`images/planches-src/${p.ref}.js\`, compose avec \`--zones\` puis sans, **ouvre le PNG et regarde**, quatre fois au plus.

**Il n'y aura pas de relecteur après toi : JP relit lui-même.** Avant de rendre, vérifie que **le montage marcherait pour vrai** (suis l'eau, la chaleur, l'air, la corde, la charge), que chaque objet se reconnaît sans la légende, qu'un corps humain a des proportions justes, qu'une flèche pointe dans le vrai sens du geste et qu'un geste fin se suit sans ambiguïté. Ne touche qu'à ta description et au SVG qu'elle produit.`

const dessiner = p => agent(DESS(p), { label: `dessin ${p.ref}`, phase: 'Planches', schema: S1 })
  .then(d => d ? { ref: p.ref, ...d } : { ref: p.ref, erreur: 'dessin sans résultat' })
  .catch(e => ({ ref: p.ref, erreur: String(e) }))


const S = { type: 'object', properties: { fichiers: { type: 'array', items: { type: 'string' } }, apercus: { type: 'array', items: { type: 'string' } }, pagesParTome: { type: 'object' }, fait: { type: 'string' }, reste: { type: 'array', items: { type: 'string' } } }, required: ['fichiers', 'apercus', 'fait', 'reste'] }

const OUTIL = `${TETE}

**Ta mission : appliquer les choix de JP à l'outil \`design/outils/assembler-tome.py\` et aux gabarits, puis assembler les six tomes.**

1. **Couleur du tome 6 : fonte** (#363432, encre pâle #EEEBE6), à la place de la rouille (#7A4424). Mets-la partout où la couleur du tome 6 est définie pour l'intérieur (\`design/variantes-couleur/outils/\` — couleur.css et le reste —, \`design/outils/rendre-chapitre.js\`, l'assembleur), avec des teintes pâles dérivées comme pour les autres tomes (en-têtes de tableau, encadrés). Tome 5 : écorce, déjà en place, ne change rien.
2. **Chaque chapitre ouvre sur une page de droite** (pages blanches au besoin) : c'est le choix de JP, garde-le par défaut.
3. **Tome 1 : le chapitre 00 vient avant tout**, première page du livre, avant la page de titre et le sommaire (il se trouve sans chercher). Le sommaire le mentionne quand même.
4. **Les planches de \`images/a-valider/\` sont posées** comme les validées (JP les relit dans les pages). Utilise les placements \`design/epreuves-livre/placements-tome-N.json\` (prioritaires) et \`placements.json\`.
5. **Corrections repérées au premier essai** : (a) les caractères ≥ ≤ ≈ → ₂ ᵉ ⚠ tombent dans Georgia ou Times : charge une police qui les a, dans le même esprit que IBM Plex, pour que tout le livre soit homogène ; (b) \`build_chapitre.danger_story\` numérote chaque paragraphe qui commence en gras (au ch. 102 §8, les points font 1, 2, 3, 2) : corrige le moteur pour ne numéroter que les vrais points ; (c) l'onglet de tranche à 12 pt pour 100 à 112 : reporte-le dans couleur.css pour que les rendus de chapitre seuls fassent pareil.
6. **Le 00 en double page** (validé par JP) rend deux phrases du chapitre fausses : « Le dernier bloc, Quand il n'y a rien » et « Voici les onze mêmes blocs » (\`chapitres/00-le-chapitre-principal.md\`). Réécris-les au plus court pour qu'elles décrivent la double page, avec Edit, et note-le à la fin de \`suivi/00-redaction.md\`. Puis refais le rendu du 00 et du 00b (\`rendre_c.py 00 00b\`).
7. **Pas de pages de crédits dans le livre** (JP, 28 septembre 2026 : « enlève les pages crédit photo, garde les backup quelque part mais pas dans le livre »). Retire les crédits de l'intérieur assemblé. L'assembleur les écrit à la place **hors du livre**, tome par tome, dans \`livre/credits/tome-N-credits.md\` (et un PDF de même contenu à côté, pour les garder lisibles) : auteur, licence, lien, fichier, page où l'image se trouve. \`images/credits.md\` et les registres restent tels quels. Le sommaire ne mentionne plus de crédits.
8. **Assemble les six tomes** : \`python design/outils/assembler-tome.py N\` pour N = 1 à 6 (\`livre/tome-N/interieur.pdf\` et \`rapport.md\`). Toutes les planches sont dessinées au moment où tu travailles. Regarde pour chaque tome la page de titre, le sommaire, deux ou trois pages au hasard, et corrige ce qui déborde. Mets 4 aperçus par tome dans \`livre/tome-N/apercus/\`.
9. Consigne tout dans \`design/choix.md\` (section « Décisions des 27 et 28 septembre 2026 ») : couleurs 5 et 6, ouvertures à droite, 00 en tête, 00 et 00b (outils ancrage.*), planches à valider posées, crédits hors du livre.

Réponds avec le nombre de pages de chaque tome (pagesParTome) et ce qui reste.`

const COUV = (pages) => `${TETE}

**Ta mission : les couvertures au propre.** JP a choisi : **tome 5 écorce** (#4B3A28), **tome 6 fonte** (#363432, encre #EEEBE6) — la variante que tu trouveras dans \`design/directions/1-manuel-de-terrain/couvertures-nordique-6.html\` et \`outils/build_couvertures_6.py\`. Fais-en la version principale du tome 6 et retire les variantes non choisies (mousse, rouille) du fichier final (garde-les dans un fichier d'archives à côté).

Les vrais nombres de pages des tomes viennent d'être mesurés : ${JSON.stringify(pages)} (sinon, lis \`livre/tome-N/rapport.md\`). Mets-les dans PAGES, prends la largeur de tranche **au tableau de Blurb** de \`sources/blurb-specifications.md\` (paliers, couverture souple), et refais les six couvertures complètes : les quatrièmes des tomes 1 à 4 au format six tomes (leur sommaire et un dessin, comme les tomes 5 et 6), et les tranches. Sortie : un PDF de couverture par tome aux dimensions exactes de Blurb (\`livre/tome-N/couverture.pdf\`), et les aperçus \`apercu-nordique-couvertures-6-avants.png\` et \`apercu-nordique-tablette-6-tomes.png\` refaits. Regarde chaque PNG avant de rendre. Consigne dans \`design/choix.md\`.`

// 1. Les planches qui restent (args = scratchpad/args-reste-2.json), trois groupes en parallèle, lots de 10.
phase('Planches')
const liste = Array.isArray(args) ? args : []
const G = 3, LOT = 10, taille = Math.ceil(liste.length / G) || 1
const groupes = Array.from({ length: G }, (_, g) => liste.slice(g * taille, (g + 1) * taille)).filter(g => g.length)
const planches = (await parallel(groupes.map(g => async () => {
  const res = []
  for (let i = 0; i < g.length; i += LOT) res.push(...await parallel(g.slice(i, i + LOT).map(p => () => dessiner(p))))
  return res
}))).flat()

// 2. L'outil, les choix de JP et les six tomes, une fois toutes les planches là.
phase('Outil et tomes')
const outil = await agent(OUTIL, { label: 'outil, choix de JP, six tomes', phase: 'Outil et tomes', schema: S }).catch(e => ({ erreur: String(e) }))
phase('Couvertures')
const couv = await agent(COUV((outil && outil.pagesParTome) || {}), { label: 'couvertures et tranches', phase: 'Couvertures', schema: S }).catch(e => ({ erreur: String(e) }))
return { planches, outil, couv }
