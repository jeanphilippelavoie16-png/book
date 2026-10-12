export const meta = {
  name: 'photos-texte-assemblage',
  description: "Pose les nouvelles photos dans les pages, fait les petites corrections de texte, puis reassemble les six tomes et remet les couvertures au bon nombre de pages",
  phases: [
    { title: 'Photos et texte', detail: 'trois agents pour les photos (par paires de tomes), un pour le texte' },
    { title: 'Assemblage', detail: 'six tomes, controle des 440 pages, tranches et couvertures' },
  ],
}

// JP, 29 septembre 2026 : « Fait 2, 3, 4 » (plan de match : photos à poser, petites corrections de texte,
// réassemblage). Les corrections de planches restent en pause.
const ROOT = 'C:\\Users\\jeanp\\New folder'
const TETE = `Tu travailles sur « Le Grand Livre du Chalet », six tomes imprimés chez Blurb (8 × 10 po, 440 pages au plus par tome). Projet : ${ROOT}. **CLAUDE.md est dans ton contexte et prime** (aucune attribution de source dans le texte, aucun numéro de téléphone ni service qui répond, pas de crédits dans le livre). Lis \`design/choix.md\`. **Écris au fur et à mesure.** Travaille économiquement.`
const S = { type: 'object', properties: { fichiers: { type: 'array', items: { type: 'string' } }, fait: { type: 'string' }, reste: { type: 'array', items: { type: 'string' } }, pagesParTome: { type: 'object' }, apercus: { type: 'array', items: { type: 'string' } } }, required: ['fichiers', 'fait', 'reste'] }

const PHOTOS = (tomes) => `${TETE}

**Ta mission : poser dans les pages les photos nouvelles des tomes ${tomes.join(' et ')}.** Elles sont dans \`images/photos/tri/\` (registre \`images/photos/registre-tri.md\`) et \`images/photos/manquantes/\` (registre \`images/photos/registre-manquantes.md\`) ; le registre dit ce que chaque photo montre et pour quelle ligne ou quel chapitre elle a été cherchée. Les fichiers sont nommés par le numéro de chapitre **actuel** (tomes : 1 = 00 à 18, 2 = 19 à 40, 3 = 41 à 60, 4 = 61 à 81, 5 = 82 à 101, 6 = 102 à 112). Ne prends que celles de tes tomes.

Pour chacune : trouve dans le chapitre le paragraphe qui parle de ce qu'elle montre (Grep), et ajoute l'entrée dans \`design/epreuves-livre/placements-tome-N.json\` au format des photos déjà posées (lis quelques entrées et la clé \`_lisez-moi\` de \`placements.json\`) : fichier (chemin depuis la racine), « apres » (le début exact du paragraphe), taille \`quart\` ou \`demi\`, légende courte **sans attribution**. Une photo marquée « à défaut » dans le registre, ou qui n'apprend rien que la phrase ne dise déjà, **ne se pose pas** : dis-le dans « reste ». Vérifie que le JSON se lit et que chaque « apres » se retrouve mot pour mot.

**Le tome 5 est à 438 pages sur 440.** Pour le tome 5, seulement les photos qui servent à reconnaître quelque chose de dangereux ou de mangeable (le mildiou, l'ergot…), en \`quart\`, et note dans « reste » celles que tu as laissées de côté faute de place.`

const TEXTE = `${TETE}

**Ta mission : cinq petites corrections de texte**, avec Edit, sans réécrire les chapitres ; note chacune à la fin de \`suivi/NN-redaction.md\` (section « Corrections du 29 septembre 2026 »).
1. **Ch. 109** : un rappel cite l'Organisation mondiale de la santé. Retire l'attribution, garde le fait (CLAUDE.md : la provenance ne s'imprime pas).
2. **Ch. 101** : une citation est en anglais. Traduis-la en français québécois, ou dis la même chose sans citer.
3. **Ch. 62** : le texte renvoie aux planches 62-02, 62-03, 62-04, 62-21 et 62-23, qui n'existent pas (vérifie dans \`images/planche-62-*\`, \`images/validees/\`, \`images/a-valider/\`). Retire ces renvois ; si le texte dit « voir la planche » pour un geste que JP fait déjà (débiter un orignal), coupe la mention.
4. **Deux renvois vers un numéro de note** : le ch. 37 renvoie à « la note 5 du ch. 29 », le ch. 34 à « la note 4 du ch. 31 ». Remplace-les par un renvoi à la section qui porte la note (« ch. 29 §7 »), qui ne casse pas si les notes changent de numéro.
5. **La lame au rouge** : le ch. 29 §9-C passe au rouge la lame qui coupe le cordon (le rouge tue les spores), le ch. 34 §9 interdit le rouge pour la lame de l'abcès (le rouge détrempe le tranchant). Les deux raisons tiennent : ajoute à chacun une demi-phrase qui renvoie à l'autre et dit pourquoi la règle change (au cordon, la stérilité compte plus que le fil ; à l'abcès, il faut un tranchant qui coupe net).
Ne touche à rien d'autre.`

const ASSEMBLER = `${TETE}

**Ta mission : remonter les six tomes et remettre les couvertures au bon nombre de pages.** Des photos viennent d'être ajoutées aux \`design/epreuves-livre/placements-tome-N.json\` et le texte de quelques chapitres a changé.

1. \`python design/outils/assembler-tome.py N\` pour N = 1 à 6. Lis chaque \`livre/tome-N/rapport.md\` : pages, figures posées, figures manquantes, avertissements.
2. **Aucun tome ne dépasse 440 pages.** Si un tome dépasse (le tome 5 était à 438), retire des photos de ce tome, les moins utiles d'abord (celles qui ne servent ni à reconnaître un danger ni un aliment), en passant \`"poser": false\` dans son placements-tome-N.json, et réassemble, jusqu'à 440 ou moins. Ne touche pas au choix « chaque chapitre ouvre à droite ».
3. Regarde en PNG une ou deux pages de chaque tome où une photo nouvelle est posée : la photo est-elle nette, bien cadrée, à la bonne place ? Corrige un placement qui tombe mal. Mets ces aperçus dans \`livre/tome-N/apercus/\` (nom commençant par « photo- »).
4. **Couvertures** : mets les nouveaux nombres de pages dans PAGES de \`design/directions/1-manuel-de-terrain/outils/build_couvertures_6.py\`, reprends la largeur de tranche au tableau de Blurb de \`sources/blurb-specifications.md\`, relance \`outils/rendre_couvertures_6.sh\`, et vérifie que \`livre/tome-N/couverture.pdf\` suit.
5. Mets à jour les crédits hors du livre (\`livre/credits/\`), que l'assembleur réécrit.
Réponds avec pagesParTome, les tranches, les photos retirées faute de place, et les aperçus.`

phase('Photos et texte')
const [photos, texte] = await parallel([
  () => parallel([[1, 2], [3, 4], [5, 6]].map(t => () => agent(PHOTOS(t), { label: `photos tomes ${t.join(' et ')}`, phase: 'Photos et texte', schema: S }).catch(e => ({ tomes: t, erreur: String(e) })))),
  () => agent(TEXTE, { label: 'corrections de texte', phase: 'Photos et texte', schema: S }).catch(e => ({ erreur: String(e) })),
])
phase('Assemblage')
const assemblage = await agent(ASSEMBLER, { label: 'assemblage des six tomes et couvertures', phase: 'Assemblage', schema: S }).catch(e => ({ erreur: String(e) }))
return { photos, texte, assemblage }
