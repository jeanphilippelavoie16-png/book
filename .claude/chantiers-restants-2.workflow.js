export const meta = {
  name: 'chantiers-restants-2',
  description: "Deuxieme vague de chantiers : planches encore oubliees de la fouille et du tri, le 00 et le 00b mis a jour pour les 10 nouveaux chapitres, verification de leurs renvois, index et glossaire par tome",
  phases: [
    { title: 'Inventaire', detail: 'ce qui reste de la fouille et du tri' },
    { title: 'Planches', detail: 'lots de 10 dessinateurs (JP relit)' },
    { title: 'Texte', detail: '00 et 00b, renvois des nouveaux chapitres' },
    { title: 'Index', detail: 'index et glossaire par tome' },
  ],
}

// JP, 27 septembre 2026 : « go lance les autres chantiers qu'on peut ».
const ROOT = 'C:\\Users\\jeanp\\New folder'
const SCR = 'C:/Users/jeanp/AppData/Local/Temp/claude/C--Users-jeanp-New-folder/bed7cfe7-8639-429a-8cfe-5f58e5149259/scratchpad'
const FICHES = SCR + '/fiches'
const BACK = 'C:\\Users\\jeanp\\AppData\\Local\\Temp\\claude\\C--Users-jeanp-New-folder\\bed7cfe7-8639-429a-8cfe-5f58e5149259\\scratchpad\\backup-test-mains'
const NOUVEAUX = ['24-le-corps-qui-travaille.md', '28-les-maladies-ordinaires.md', '29-la-sante-des-femmes.md', '34-soigner-avec-la-foret.md', '37-le-sauna-et-le-bien-etre.md', '38-le-deuil-le-choc-et-la-peur.md', '96-faire-la-terre.md', '97-allonger-la-saison.md', '98-ce-qui-nourrit-un-hiver.md', '99-les-facons-d-autrefois.md']
const TETE = `Tu travailles sur « Le Manuel du Nord », un manuel de survie imprimé à usage privé, pour JP, sa conjointe et leurs deux enfants (4 et 6 ans), sur la Côte-Nord. Projet : ${ROOT}. **CLAUDE.md est dans ton contexte et prime sur tout.** Six tomes, 114 chapitres ; table des matières \`plan/tomes-6-proposition.md\`, correspondance des numéros \`plan/renumerotation.json\` (les vieilles fiches et listes citent souvent les **anciens** numéros). **Écris au fur et à mesure** : une coupure ne doit coûter que la pièce en cours. Travaille économiquement (Grep puis Read avec offset/limit ; un script vaut mieux que cent appels).`

const S_INV = { type: 'object', properties: { planches: { type: 'array', items: { type: 'object', properties: { ref: { type: 'string' }, chapitre: { type: 'string' }, profondeur: { type: 'boolean' }, quoi: { type: 'string' } }, required: ['ref', 'chapitre', 'profondeur', 'quoi'] } }, dejaFaites: { type: 'number' }, laisseesDeCote: { type: 'array', items: { type: 'string' } } }, required: ['planches', 'dejaFaites', 'laisseesDeCote'] }
const S1 = { type: 'object', properties: { fichiers: { type: 'array', items: { type: 'string' } }, ceQueJeVois: { type: 'string' }, cotes: { type: 'array', items: { type: 'string' } }, laisseDeCote: { type: 'array', items: { type: 'string' } } }, required: ['fichiers', 'ceQueJeVois', 'cotes', 'laisseDeCote'] }
const S_TXT = { type: 'object', properties: { fichiers: { type: 'array', items: { type: 'string' } }, changements: { type: 'array', items: { type: 'string' } }, aTrancherParJP: { type: 'array', items: { type: 'string' } } }, required: ['fichiers', 'changements', 'aTrancherParJP'] }

const INVENTAIRE = `${TETE}

**Ta mission : trouver les planches qui restent à dessiner de deux listes, et en écrire les fiches.** Rien à dessiner toi-même.

- \`images/fouille-planches-oubliees.md\` (25 planches, **anciens numéros**) et la section 2 de \`images/tri-images.md\` (les planches du tri, numéros du 24 septembre).
- Une planche est **faite** si son sujet a déjà un dessin : cherche par numéro **actuel** (convertis avec \`plan/renumerotation.json\`, puis la deuxième renumérotation \`plan/renumerotation-2.json\` pour les numéros 96 et plus) **et par sujet** dans \`images/validees/\`, \`images/a-valider/\`, \`images/planche-*.svg\`, \`images/planches-src/*.js\` (commentaires de tête), et dans les fiches \`${FICHES}/*.md\` (planches en cours de dessin en ce moment).
- Pour chaque planche **pas faite** : vérifie que le chapitre actuel décrit encore la chose (Grep) ; si le texte l'a coupée, laisse-la de côté. Donne-lui un numéro **libre** \`NN-4K\` (NN = chapitre actuel ; le premier 4K libre à partir de 41, en vérifiant qu'aucun fichier ne le porte déjà), et écris sa fiche \`${FICHES}/<ref>.md\` sur le modèle d'une fiche existante (par exemple \`${FICHES}/80-40.md\`) : chapitre, ce que la planche montre (repris de la liste, en numéros actuels), forme (en profondeur ou non), règles.
- N'invente aucune planche : seulement ce que les deux listes demandent. Laisse de côté ce que JP sait déjà faire (débiter un orignal, souder, câbler du 12 V, couper son bois).

Réponds avec la liste des planches à dessiner (ref, fichier du chapitre, profondeur, ce qu'elle montre en une ligne), dans l'ordre d'utilité des listes.`

const DESS = (p) => `Planche **${p.ref}** du « Manuel du Nord », un manuel de survie pour une famille de la Côte-Nord (JP soude, câble du 12 V, abat un orignal, et va **bâtir ou faire** ce que montre la planche sans en avoir jamais vu). Projet : ${ROOT}. Chapitre : \`chapitres/${p.chapitre}\`. Fiche : \`${FICHES}/${p.ref}.md\`. Lis la tête de \`.claude/skills/planches/scripts/composer-planche.js\` (jusqu'à \`const fs = require('fs');\`), dans \`.claude/skills/planches/SKILL.md\` les sections « Avant tout » et « Le texte sur la planche », et **\`images/recommandations-planches.md\` en entier : ce sont les exigences de JP, elles priment**. Dans le chapitre, lis **seulement** les passages sur l'objet (Grep, puis Read avec offset/limit). Travaille économiquement : chaque tour relit tout ton contexte.

**Mains, personnages, corde et fil viennent de la bibliothèque** \`.claude/skills/planches/scripts/formes.js\` (sous \`h.formes\` : \`main\`, \`personnage\`, \`tete\`, \`buste\`, \`cordes\`, \`corde\`, \`aiguilleFilet\`, \`moule\`, \`maille\` ; lis les commentaires de tête de chaque fonction). Regarde sa feuille d'essai \`${SCR}/_formes-essai-mains.png\` avant de dessiner une main. Ses points faibles : la prise vue de profil (un bloc) et la pince sur un fil ; préfère la prise vue de dos ou de la paume, et ne dessine à la main que les objets. **Un corps vu de dessus se lit mal** : montre plutôt les pieds seuls, en empreintes, avec une flèche.

**Dessine-la.** Une planche montre comment fabriquer ou faire la chose. ${p.profondeur ? "C'est une construction ou une coupe : **en profondeur**, deux à quatre vues alignées entre elles comme un vrai dessin technique ; une coupe en couches se lit couche par couche ; deux pages (a et b) si une ne suffit pas." : 'Le format suit le contenu.'} **Cotes en mm sur ce qu'on construit**, seulement celles que le chapitre donne. Aucun chiffre qui ne soit pas dans le chapitre ; rien de marqué [À VÉRIFIER]. Six renvois au plus par vue ; aucun mot sur le dessin sauf une cote. Écris \`images/planches-src/${p.ref}.js\` (s'il existe déjà, copie-le d'abord dans \`${BACK}\\\`), compose avec \`--zones\` puis sans, **ouvre le PNG et regarde**, quatre fois au plus.

**Il n'y aura pas de relecteur après toi : JP relit lui-même.** Avant de rendre, vérifie que **le montage marcherait pour vrai** (suis l'eau, la chaleur, l'air, la corde, la charge), que chaque objet se reconnaît sans la légende, qu'un corps humain a des proportions justes, qu'une flèche pointe dans le vrai sens du geste et qu'un geste fin se suit sans ambiguïté. Ne touche qu'à ta description et au SVG qu'elle produit.`

const ANCRAGE = `${TETE}

**Ta mission : mettre le chapitre 00 (le chapitre principal) et le 00b (acheter par priorité) à jour pour les 10 chapitres écrits le 27 septembre** : ${NOUVEAUX.map(f => '`chapitres/' + f + '`').join(', ')}. Lis dans CLAUDE.md « Les deux chapitres d'ancrage » et « Pas d'inventaire éparpillé ».

- **00b** : le tableau Matériel et la variante d'urgence de chaque nouveau chapitre nomment ce qu'il faut avoir. Ce qui s'achète et qui n'est pas déjà au 00b (cherche par sujet, pas seulement par mot) y entre, **au bon palier** (à acheter absolument, essentiel, important, s'il reste du temps et de l'argent), avec maison, chalet ou les deux, et le renvoi au chapitre. Pas de doublon ; ce qui se fabrique ne s'achète pas ; rien pour un bébé (JP a tranché : ses enfants ont 4 et 6 ans). Les chiffres viennent des chapitres, jamais d'ailleurs.
- **00** : là où une catastrophe du 00 se prolonge dans un nouveau chapitre (épidémie ou maladie qui dure → 28 ; blessure au travail → 24 ; accouchement ou grossesse → 29 ; plantes quand la pharmacie est vide → 34 ; deuil, choc → 38 ; l'événement qui dure en années → 96 à 99), ajoute le renvoi, en gros, sans ajouter de texte qu'on ne lit pas en panique.
- Corrige avec Edit, jamais en réécrivant le chapitre. Note chaque changement à la fin de \`suivi/00-redaction.md\` et \`suivi/00b-redaction.md\` (section « Mise à jour — nouveaux chapitres, 27 septembre 2026 »). Un autre agent travaille en ce moment la **mise en page** du 00 et du 00b sans toucher au texte : ne touche à rien dans \`design/\`.`

const RENVOIS = `${TETE}

**Ta mission : vérifier les renvois des 10 chapitres écrits le 27 septembre** (${NOUVEAUX.map(f => '`chapitres/' + f + '`').join(', ')}), écrits pendant qu'on renumérotait le livre. Pour chaque « ch. NN », « chapitre NN » ou « §NN » : le chapitre NN actuel (liste de \`chapitres/\`) traite-t-il vraiment ce que la phrase lui attribue ? Vérifie par Grep dans le chapitre visé. Un mauvais numéro (souvent l'ancien) se corrige avec Edit ; un renvoi vers une chose que le livre ne traite nulle part se coupe (ou pointe vers le chapitre le plus proche qui la traite). Vérifie aussi l'inverse : les chapitres voisins qui devraient maintenant renvoyer vers un nouveau (par exemple le 95, jardin, vers 96 à 99 ; le 26, soigner, vers 24 et 28 ; le 33, plantes, vers 34 ; le 36, le moral, vers 37 et 38 ; le 88, le pain, vers 98) : ajoute le renvoi en une demi-phrase, au bon endroit. Note tout dans \`suivi/renvois-nouveaux-chapitres.md\`.`

const INDEX = `${TETE}

**Ta mission : l'index et le glossaire, tome par tome.** Il n'y a pas encore de numéros de page (l'assemblage des tomes se construit en ce moment dans \`design/outils/assembler-tome.py\`) : tu prépares **les entrées et leurs ancres**, l'assembleur mettra les pages.

- Pour chaque tome, \`livre/index/tome-N.json\` : les entrées qu'un lecteur cherche vraiment dans ce tome, à la lampe frontale — espèces (nom courant québécois, puis latin entre parenthèses s'il est au glossaire), dangers (botulisme, monoxyde, trichinellose, thuyone…), gestes et fabrications, maladies et signes, aliments et méthodes. Chaque entrée : le terme, ses renvois (« voir aussi »), et ses ancres : chapitre et titre de section ou d'étape exacts (tels qu'écrits dans le Markdown, pour qu'un script les retrouve). Pas de mot trop courant (« eau », « bois » seuls), pas plus de six ancres par entrée ; les plus utiles d'abord.
- \`livre/index/general.json\` : l'index des six tomes réunis, pour une **table générale** qui ira au début de chaque tome (le lecteur tient le tome 3 et cherche le botulisme : il doit voir en une ligne que c'est au tome 4).
- Le glossaire existant est dans \`plan/\` (cherche-le) : ajoute-y les termes des 10 chapitres du 27 septembre (${NOUVEAUX.join(', ')}) qui n'y sont pas, dans son format.
- Un court \`livre/index/lisez-moi.md\` dit à l'assembleur comment lire tes fichiers.`

// Trois branches en parallèle : les planches (inventaire puis dessin), le texte, l'index.
const [planches, texte, index] = await parallel([
  async () => {
    phase('Inventaire')
    const inv = await agent(INVENTAIRE, { label: 'inventaire fouille et tri', phase: 'Inventaire', schema: S_INV }).catch(e => ({ erreur: String(e), planches: [] }))
    const liste = (inv.planches || []).filter(p => p && p.ref && p.chapitre)
    phase('Planches')
    const res = []
    for (let i = 0; i < liste.length; i += 10) {
      res.push(...await parallel(liste.slice(i, i + 10).map(p => () =>
        agent(DESS(p), { label: `dessin ${p.ref}`, phase: 'Planches', schema: S1 })
          .then(d => d ? { ref: p.ref, ...d } : { ref: p.ref, erreur: 'dessin sans résultat' })
          .catch(e => ({ ref: p.ref, erreur: String(e) })))))
    }
    return { inventaire: inv, dessins: res }
  },
  () => parallel([
    () => agent(ANCRAGE, { label: '00 et 00b : les nouveaux chapitres', phase: 'Texte', schema: S_TXT }).catch(e => ({ erreur: String(e) })),
    () => agent(RENVOIS, { label: 'renvois des nouveaux chapitres', phase: 'Texte', schema: S_TXT }).catch(e => ({ erreur: String(e) })),
  ]),
  () => agent(INDEX, { label: 'index et glossaire', phase: 'Index', schema: S_TXT }).catch(e => ({ erreur: String(e) })),
])
return { planches, texte, index }
