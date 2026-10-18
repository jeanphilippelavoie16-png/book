export const meta = {
  name: 'chantiers-restants',
  description: "Les chantiers qui restent hors planches : photos (tri et manquantes), placements des figures par tome, assemblage des tomes pour Blurb, couvertures des tomes 5 et 6, mise en page du 00 et du 00b",
  phases: [
    { title: 'Photos', detail: 'un agent a la fois (Wikimedia refuse les telechargements simultanes)' },
    { title: 'Placements', detail: 'un agent par tome, un fichier par tome' },
    { title: 'Mise en pages', detail: 'assemblage des tomes, couvertures 5 et 6, 00 et 00b' },
  ],
}

// JP, 27 septembre 2026 : « lance d'autres agents pour attaquer les autres chantiers qui nous restent ».
// Suite de suivi/plan-de-match.md, points 3 (photos) et 5 (mise en pages). La passe finale des planches
// (point 4) attend que toutes les planches soient dessinées.
const ROOT = 'C:\\Users\\jeanp\\New folder'
const SCR = 'C:/Users/jeanp/AppData/Local/Temp/claude/C--Users-jeanp-New-folder/bed7cfe7-8639-429a-8cfe-5f58e5149259/scratchpad'
const TETE = `Tu travailles sur « Le Manuel du Nord », un manuel de survie imprimé à usage privé, pour JP, sa conjointe et leurs deux enfants (4 et 6 ans), sur la Côte-Nord. Projet : ${ROOT}. **CLAUDE.md est dans ton contexte et prime sur tout.** Six tomes, 114 chapitres ; table des matières \`plan/tomes-6-proposition.md\`, correspondance des numéros \`plan/renumerotation.json\` (les photos et les vieilles fiches citent souvent les **anciens** numéros). Impression chez Blurb, livre photo 20 × 25 cm (8 × 10 po), 440 pages au plus par tome. Le design retenu est la « variante C » (\`design/choix.md\` : lis-le). **Écris au fur et à mesure** : une coupure ne doit coûter que la pièce en cours. Travaille économiquement : un script vaut mieux que cent appels à la main.`

const S_PHOTO = { type: 'object', properties: { dossier: { type: 'string' }, registre: { type: 'string' }, telechargees: { type: 'number' }, introuvables: { type: 'array', items: { type: 'string' } } }, required: ['dossier', 'registre', 'telechargees', 'introuvables'] }
const S_PLAC = { type: 'object', properties: { fichier: { type: 'string' }, planches: { type: 'number' }, photos: { type: 'number' }, sansPlace: { type: 'array', items: { type: 'string' } } }, required: ['fichier', 'planches', 'photos', 'sansPlace'] }
const S_MEP = { type: 'object', properties: { fichiers: { type: 'array', items: { type: 'string' } }, apercus: { type: 'array', items: { type: 'string' }, description: 'PNG a montrer a JP' }, fait: { type: 'string' }, reste: { type: 'array', items: { type: 'string' } } }, required: ['fichiers', 'apercus', 'fait', 'reste'] }

const PHOTO_REGLES = `**Règles des images (CLAUDE.md, section Les images).** Sources permises : Wikimedia Commons filtré par licence, iNaturalist (photo avec \`license_code\` seulement), agences fédérales américaines, planches du domaine public d'avant 1930, figures de revues sous CC BY ; les licences non commerciales sont acceptées (usage privé). **Vérifie la licence à la source au moment du téléchargement.** Wikimedia : API \`action=query&prop=imageinfo&iiprop=url|size|extmetadata&iiurlwidth=1920\` (largeurs servies : 500, 960, 1280, 1920, 3840 ; la plus grande qui ne dépasse pas l'original ; sur un 429, attends et réessaie une fois). Télécharge avec curl, un fichier à la fois, \`-A "GrandLivreDuChalet/1.0 (livre personnel)"\`, une seconde de pause entre deux ; **aucune adresse courriel** dans les en-têtes. Vérifie que le fichier est une vraie image (en-tête JPEG ou PNG). JP veut **de belles photos** : nettes, en haute résolution, le sujet bien visible ; entre deux candidates, la plus belle. Ne valide aucune identification d'espèce : recopie ce que la source affirme. Charge WebSearch et WebFetch avec ToolSearch (« select:WebSearch,WebFetch »).`

const PHOTO_TRI = (moitie) => `${TETE}

**Ta mission : trouver et télécharger les photos de la liste PHOTO de \`images/tri-images.md\`, ${moitie}.** Ce tri date du 24 septembre (numéros de chapitre de cette date ; \`plan/renumerotation.json\` donne les actuels). Un premier agent avait monté des planches-contact de candidates dans \`${SCR}/tri/cand/\` sans rien télécharger : regarde-les d'abord, elles t'épargnent des recherches.

${PHOTO_REGLES}

Range les fichiers dans \`images/photos/tri/\`, nommés \`<numéro de chapitre ACTUEL>-<sujet-court>.<ext>\`. Inscris chaque fichier, au fur et à mesure, dans \`images/photos/registre-tri.md\` (fichier, ligne du tri visée, chapitre actuel, ce qu'il montre selon la source, auteur, licence vérifiée, URL de la page, date, dimensions). Si le fichier ou le registre existent déjà, un autre agent y a travaillé : ajoute, ne réécris pas, et ne refais pas ce qui y est. Ce qui est introuvable sous licence (les sujets « difficile » : états de viande, moisissures, buée) : note-le dans ta réponse, avec une ligne sur ce qui le remplacerait (vignette de planche, ou rien).`

const PHOTO_MANQ = `${TETE}

**Ta mission : les photos que les chapitres demandent et qui n'ont jamais été trouvées.** Au moins : le ch. 10 (l'eau) en voulait six ; le **mildiou et l'alternariose de la pomme de terre** (ch. 98 : la tache qui passe les nervures, le feutrage blanc dessous, la tache à cercles concentriques ; le rédacteur l'avait demandé en planche 98-11, elle se fait en photos) ; le **trou de plongeon du renard dans la neige** (ch. 43). Cherche les autres : les fiches \`suivi/NN-redaction.md\` et les chapitres qui annoncent une photo (« photo », « voir la photo ») sans fichier correspondant dans \`images/credits.md\` ou les registres \`images/photos/registre-*.md\`. Donne la priorité à ce qui sert à reconnaître quelque chose de dangereux ou de mangeable.

${PHOTO_REGLES}

Range les fichiers dans \`images/photos/manquantes/\`, nommés \`<numéro de chapitre actuel>-<sujet-court>.<ext>\`, et inscris-les au fur et à mesure dans \`images/photos/registre-manquantes.md\` (mêmes colonnes que les autres registres).

**Reprise.** Un premier passage a été arrêté (manque de jetons, 27 septembre) après une dizaine de fichiers. Liste d'abord le dossier et le registre : ce qui y est et qui est valide ne se refait pas ; un fichier présent mais absent du registre se vérifie (licence à la source) et s'inscrit ; un fichier vide ou HTML s'efface. Reprends aux sujets suivants.`

const PLAC = (t) => `${TETE}

**Ta mission : dire où chaque planche et chaque photo se pose dans les chapitres du tome ${t.no} (${t.titre}, ch. ${t.plage}).** Le constructeur de pages \`design/directions/1-manuel-de-terrain/outils/build_chapitre.py\` lit \`design/epreuves-livre/placements.json\` : lis sa clé \`_lisez-moi\` et quelques entrées existantes pour le format exact (« apres » = le début du paragraphe Markdown après lequel la figure vient ; photos : fichier, apres, taille quart ou demi, légende), et lis dans build_chapitre.py comment il s'en sert.

**N'écris pas dans placements.json** (six agents travaillent en même temps) : écris **\`design/epreuves-livre/placements-tome-${t.no}.json\`**, au même format, une clé par chapitre, et reprends-y telles quelles les entrées que placements.json a déjà pour tes chapitres.

- **Planches** : celles de \`images/validees/\`, \`images/a-valider/\` et \`images/planche-*.svg\` dont le numéro est dans ta plage, **plus celles qui se dessinent en ce moment** (liste : \`${SCR}/args-reste.json\` ; ce qu'elles montrent : \`${SCR}/fiches/<ref>.md\`). Une planche a et b fait deux entrées. Pose chacune après le paragraphe qui décrit ce qu'elle montre, le plus près possible de la procédure qu'elle sert.
- **Photos** : \`images/credits.md\` et les registres \`images/photos/registre-*.md\` (numéros **anciens** pour les photos d'avant le 24 septembre). Pose une photo près de ce qu'elle aide à reconnaître ; \`quart\` pour une identification, \`demi\` pour ce qui demande du détail. Légende courte, sans attribution (les crédits vont en fin de tome).
- Ce qui n'a pas de place claire, ou une figure qui ne sert à rien dans son chapitre : liste-le dans ta réponse au lieu de le forcer.

Vérifie à la fin que ton JSON se lit (node -e "JSON.parse(...)") et que chaque « apres » se retrouve mot pour mot dans le chapitre.`

const TOMES = [
  { no: 1, titre: 'Tenir', plage: '00, 00b, 1 à 18' },
  { no: 2, titre: 'Le corps', plage: '19 à 40' },
  { no: 3, titre: 'Prélever', plage: '41 à 60' },
  { no: 4, titre: 'De la bête au garde-manger', plage: '61 à 81' },
  { no: 5, titre: 'La forêt, le jardin et le chalet', plage: '82 à 101' },
  { no: 6, titre: "L'atelier", plage: '102 à 112' },
]

const ASSEMBLER = `${TETE}

**Ta mission : l'outil qui assemble un tome entier en PDF prêt pour Blurb**, et un premier essai sur le **tome 6** (le plus court).

1. **Les exigences de Blurb, à la source.** Livre photo « 20 × 25 cm » (8 × 10 po, portrait), envoyé par « PDF to Book » dans le navigateur. Cherche sur blurb.com / blurb.ca la page des spécifications PDF et enregistre-la dans \`sources/blurb-specifications.md\` (extraits intégraux, URL, date) : dimensions exactes de la page avec fond perdu, marge de sécurité, nombre de pages minimum et maximum, multiple exigé, profil de couleur et noir, polices incorporées, PDF/X, et **le calcul de la largeur de tranche** selon le papier et le nombre de pages, avec les dimensions du PDF de couverture. Aucun chiffre de mémoire.
2. **L'outil** \`design/outils/assembler-tome.py <no>\` : il monte chaque chapitre du tome dans le design C (voir \`design/variantes-couleur/outils/variante.py\` et \`rendre_c.py\`, et \`build_chapitre.py\` ; le tome vient de \`plan/renumerotation.json\`), avec les placements (\`design/epreuves-livre/placements.json\`, et \`placements-tome-N.json\` s'il existe, qui a priorité), puis ajoute : une page de titre du tome, le **sommaire du tome** (chapitres et numéros de page), la **numérotation continue** des pages du tome, les **crédits des images** du tome en fin de volume (tirés de \`images/credits.md\` et des registres \`images/photos/registre-*.md\` : auteur, licence, lien — c'est le seul endroit du livre où une source s'imprime), et des pages blanches pour arriver au multiple exigé. Sortie : \`livre/tome-N/interieur.pdf\` aux dimensions exactes de Blurb, plus un rapport \`livre/tome-N/rapport.md\` (pages par chapitre, total, figures posées, figures manquantes, avertissements du paginateur).
3. **L'essai sur le tome 6** : lance-le, ouvre le PDF, regarde quelques pages en PNG (la page de titre, le sommaire, une ouverture de chapitre, une page avec planche, les crédits), corrige. Mets ces PNG dans \`livre/tome-6/apercus/\` pour JP.

Ne modifie aucun chapitre ni aucune planche. Si un outil existant doit changer, garde son comportement pour les appels actuels (vérifie qu'un chapitre déjà rendu, le 96 par exemple, sort pareil).`

const COUV = `${TETE}

**Ta mission : les couvertures des tomes 5 et 6, et les six tranches pour la tablette.** Les couvertures des tomes 1 à 4 sont dans \`design/directions/1-manuel-de-terrain/couvertures-nordique.html\` (PDF à côté, aperçus \`apercu-nordique-*.png\`). \`design/choix.md\` propose pour le tome 5 **écorce** (#4B3A28 / #F2EBDF) et pour le tome 6 **rouille** (#7A4424 / #F5ECE2) ; ces couleurs sont déjà dans les pages intérieures (\`design/epreuves-livre/C/96\`). JP ne les a pas encore validées : fais-les dans ces couleurs, et fais **une variante de chaque** dans une autre teinte de la même famille nordique, pour qu'il choisisse.

- Titre des tomes : \`plan/tomes-6-proposition.md\`. Même composition que les tomes 1 à 4, même typographie, même grille ; le dos et la quatrième comme les autres.
- **Tranche** : la largeur dépend du nombre de pages et du papier ; si \`sources/blurb-specifications.md\` existe, prends-y la formule, sinon laisse la largeur en variable et dis-le. Refais l'aperçu des **six tomes côte à côte sur la tablette** (comme \`apercu-nordique-tablette.png\`).
- Sorties : ajoute les tomes 5 et 6 à \`couvertures-nordique.html\` (ou un fichier voisin), PDF, et des aperçus PNG : \`apercu-nordique-couvertures-5-6.png\`, \`apercu-nordique-couvertures-5-6-variantes.png\`, \`apercu-nordique-tablette-6-tomes.png\`. Regarde chaque PNG avant de rendre.`

const ZERO = `${TETE}

**Ta mission : la mise en page à part du chapitre 00 (le chapitre principal) et du 00b (acheter par priorité).** Ils ne suivent pas le gabarit (CLAUDE.md, « Les deux chapitres d'ancrage ») : le 00 est **la page qu'on ouvre en panique, à la lampe frontale, avec un enfant qui pleure** — les catastrophes par probabilité, quelques points majeurs **en gros** pour chacune, chaque point renvoyant au chapitre qui développe ; le 00b est **l'inventaire en quatre paliers**, chaque ligne marquée maison, chalet ou les deux. Le design C (\`design/choix.md\`, \`design/variantes-couleur/\`) donne la couleur du tome 1, la typographie et les pictos (maison, chalet, les deux).

- **00** : une catastrophe par page ou par double page, repérable d'un coup d'œil (onglet ou bande de couleur sur la tranche, très gros titre), les gestes des premières heures lisibles à un mètre, le renvoi au chapitre bien visible. Rien de plus que ce que le chapitre dit.
- **00b** : des tableaux qu'on coche au crayon, par palier, avec les pictos maison / chalet / les deux, lisibles en magasin ; les en-têtes de palier bien distincts.
- Fais-le comme des modèles que \`build_chapitre.py\` / \`variante.py\` peuvent appeler pour ces deux numéros (un gabarit HTML et CSS à part, pas une copie figée), sans rien changer au rendu des autres chapitres (vérifie le 96 avant et après).
- Sorties : \`design/epreuves-livre/C/00/\` et \`design/epreuves-livre/C/00b/\` (PDF et une PNG par page). Regarde les pages et corrige avant de rendre. Ne modifie pas le texte des chapitres ; si une phrase empêche la mise en page (trop longue pour un point « en gros »), dis-le dans ta réponse.`

// Trois branches en parallèle. Photos : un agent après l'autre (Wikimedia). Placements : six en même temps.
const [photos, placements, mep] = await parallel([
  async () => {
    phase('Photos')
    const r = []
    r.push(await agent(PHOTO_TRI('**la première moitié** (tomes 1, 2 et 3, dans les numéros de chapitre du tri : jusqu\'au 60 inclus)'), { label: 'photos du tri, tomes 1 à 3', phase: 'Photos', schema: S_PHOTO }).catch(e => ({ erreur: String(e) })))
    r.push(await agent(PHOTO_TRI('**la seconde moitié** (tomes 4, 5 et 6, dans les numéros de chapitre du tri : à partir du 61)'), { label: 'photos du tri, tomes 4 à 6', phase: 'Photos', schema: S_PHOTO }).catch(e => ({ erreur: String(e) })))
    r.push(await agent(PHOTO_MANQ, { label: 'photos manquantes', phase: 'Photos', schema: S_PHOTO }).catch(e => ({ erreur: String(e) })))
    return r
  },
  () => parallel(TOMES.map(t => () => agent(PLAC(t), { label: `placements tome ${t.no}`, phase: 'Placements', schema: S_PLAC }).catch(e => ({ tome: t.no, erreur: String(e) })))),
  () => parallel([
    () => agent(ASSEMBLER, { label: 'assemblage des tomes (Blurb)', phase: 'Mise en pages', schema: S_MEP }).catch(e => ({ erreur: String(e) })),
    () => agent(COUV, { label: 'couvertures 5 et 6, tranches', phase: 'Mise en pages', schema: S_MEP }).catch(e => ({ erreur: String(e) })),
    () => agent(ZERO, { label: 'mise en page du 00 et du 00b', phase: 'Mise en pages', schema: S_MEP }).catch(e => ({ erreur: String(e) })),
  ]),
])
return { photos, placements, mep }
