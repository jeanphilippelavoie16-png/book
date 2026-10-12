export const meta = {
  name: 'images-tri-et-recherche',
  description: 'Trie les 802 images par faisabilite sans photo de JP, et cherche sous licence les 168 images botaniques et fauniques',
  phases: [
    { title: 'Tri', detail: 'neuf agents classent les 802 images : a couper, a dessiner, trouvable sous licence, remplacable par une planche' },
    { title: 'Recherche', detail: 'six agents cherchent les images des chapitres 30, 57, 58, 59, 60 sur Wikimedia et iNaturalist' },
  ],
}

const CONTEXTE = `Tu travailles sur "Le Grand Livre du Chalet". CLAUDE.md t'est deja injecte : il prime sur tout.

FAIT NOUVEAU ET DECISIF : **JP ne fournira AUCUNE photo.** Le plan d'images supposait 160 photos prises par
lui — sa bete ouverte, sa carcasse suspendue, son atelier, sa generatrice dans la neige, sa reserve, son quai.
Ces photos n'existeront pas. La seance de debitage de la mi-octobre n'aura pas lieu.

Ce qui reste possible, et rien d'autre :
- Ce qui se TROUVE sous licence. CLAUDE.md fixe les sources acceptables : Wikimedia Commons filtre par licence,
  iNaturalist, planches du domaine public d'avant 1930, agences federales americaines. Les licences non
  commerciales sont correctes pour un usage prive et a remplacer si le livre se vend un jour.
- Ce qui se DESSINE. Une planche se commande a un illustrateur, a partir de references anatomiques reelles.
- Rien d'autre. Personne ne peut generer ces images.

Le registre complet des 802 images est dans images/credits.md : une ligne par image, avec son chapitre, son
numero, son format et son sujet. Les fiches suivi/NN-redaction.md donnent le cadrage detaille de chacune.
Le budget de pages est dans plan/budget-pages.md : les 802 images pesent 381 pages, 28 % du livre, et
causent le depassement du tome 4.`

const LOTS = [
  { id: 1, de: '01', a: '14', k: 87 },
  { id: 2, de: '15', a: '27', k: 91 },
  { id: 3, de: '28', a: '31', k: 92 },
  { id: 4, de: '32', a: '41', k: 94 },
  { id: 5, de: '42', a: '52', k: 91 },
  { id: 6, de: '53', a: '59', k: 92 },
  { id: 7, de: '60', a: '68', k: 91 },
  { id: 8, de: '69', a: '80', k: 92 },
  { id: 9, de: '81', a: '89', k: 72 },
]

const CHASSES = [
  { id: '30a', ch: '30', t: 'Plantes medicinales boreales', portee: 'les images 1 a 25 du chapitre 30' },
  { id: '30b', ch: '30', t: 'Plantes medicinales boreales', portee: 'les images 26 a 50 du chapitre 30' },
  { id: '30c', ch: '30', t: 'Plantes medicinales boreales', portee: 'les images 51 a 75 du chapitre 30' },
  { id: '57-59', ch: '57 et 59', t: 'Petits fruits et Champignons', portee: 'toutes les images des chapitres 57 (8 images) et 59 (23 images)' },
  { id: '58', ch: '58', t: 'Plantes comestibles boreales', portee: 'toutes les images du chapitre 58 (31 images)' },
  { id: '60', ch: '60', t: 'Seve, gomme, ecorces', portee: 'toutes les images du chapitre 60 (31 images)' },
]

const SCHEMA_TRI = {
  type: 'object',
  properties: {
    fichier: { type: 'string' },
    total: { type: 'number', description: 'nombre d images classees' },
    couper: { type: 'number' },
    planche: { type: 'number' },
    trouvable: { type: 'number' },
    remplacable: { type: 'number' },
    pagesRecuperees: { type: 'number', description: 'pages liberees par les images coupees, au format declare' },
    chapitresVides: { type: 'array', items: { type: 'string' }, description: 'chapitres qui perdent TOUTES leurs images' },
    constats: { type: 'array', items: { type: 'string' }, description: 'ce que le tri revele, en clair' },
  },
  required: ['fichier', 'total', 'couper', 'planche', 'trouvable', 'remplacable'],
}

const SCHEMA_CHASSE = {
  type: 'object',
  properties: {
    fichier: { type: 'string' },
    imagesVisees: { type: 'number' },
    candidatesTrouvees: { type: 'number', description: 'images pour lesquelles au moins une candidate existe' },
    sansCandidate: { type: 'array', items: { type: 'string' }, description: 'images pour lesquelles tu n as rien trouve' },
    licences: { type: 'array', items: { type: 'string' }, description: 'repartition des licences rencontrees' },
    nonCommerciales: { type: 'number', description: 'candidates sous licence non commerciale, a remplacer si le livre se vend' },
    identificationsARisque: { type: 'array', items: { type: 'string' }, description: 'especes ou une erreur d identification peut tuer, et qui exigent le specialiste' },
    constats: { type: 'array', items: { type: 'string' } },
  },
  required: ['fichier', 'imagesVisees', 'candidatesTrouvees'],
}

phase('Tri')
log(`9 agents trient les 802 images. 6 autres cherchent les 168 images botaniques et fauniques sous licence.`)

const tris = LOTS.map(l => () =>
  agent(
    `${CONTEXTE}

=== TA MISSION : TRIER ===
Tu classes les images des chapitres ${l.de} a ${l.a} (environ ${l.k} images). Tu ne touches a AUCUN chapitre
et tu ne cherches AUCUNE image : tu classes. Un autre agent s'occupe de chacun des autres lots.

Lis images/credits.md et filtre les lignes de tes chapitres. Va lire les fiches suivi/NN-redaction.md de
tes chapitres pour le cadrage detaille : c'est la que se trouve la mention "Photo de JP" et la description
precise du sujet.

Pour CHAQUE image, une categorie et une seule :

**COUPER** — photo documentaire qui n'existe que si JP la prend. Sa bete, sa carcasse, son geste, son atelier,
son chalet, sa reserve, son quai, sa generatrice. Aucun substitut : une photo de carcasse d'orignal trouvee
sur le web ne montre pas SON debitage, et une photo de generatrice quelconque ne montre pas la distance aux
fenetres de SON chalet. Sois franc : si ca n'existe que chez lui, ca se coupe.

**PLANCHE** — dessin, schema, coupe anatomique, silhouette, vue eclatee, carte. Ce ne fut jamais une photo.
Ca se commande a un illustrateur. Note le niveau de difficulte : simple (schema geometrique, carte),
moyen (sequence de gestes), eleve (anatomie qui exige une reference veterinaire).

**TROUVABLE** — le sujet est generique et existe sous licence : une espece, une plante, un champignon, un
animal, un outil du commerce, un phenomene naturel. Dis ou chercher : Wikimedia Commons, iNaturalist,
planche d'avant 1930, agence federale americaine.

**REMPLACABLE** — le sujet exige une photo impossible, MAIS une planche dessinee ferait le travail aussi bien
ou mieux. C'est le cas le plus utile de ce tri. Une coupe au trait montre la couture entre deux muscles mieux
qu'une photo, parce qu'elle enleve le sang, l'ombre et le desordre. Chaque fois que tu peux sauver une image
en la faisant passer de photo a planche, fais-le, et dis pourquoi le dessin est superieur.

Pour chaque image : chapitre, numero, sujet abrege, categorie, une phrase de justification, et le format
declare. Calcule les pages recuperees par les COUPER, en comptant une pleine page pour 1 page, une demi-page
pour 0,5 et un quart de page pour 0,25.

Signale en clair tout chapitre qui perd TOUTES ses images : un chapitre d'identification sans image n'est
plus un chapitre d'identification, et c'est une decision de fond, pas de mise en pages.

Ecris dans images/tri-lot-${l.id}.md avec l'outil Write. Ce fichier est a toi seul.`,
    { label: `tri ch.${l.de}-${l.a}`, phase: 'Tri', schema: SCHEMA_TRI }
  )
)

const chasses = CHASSES.map(c => () =>
  agent(
    `${CONTEXTE}

=== TA MISSION : CHERCHER POUR DE VRAI ===
Tu cherches des images reelles, sous licence verifiee, pour ${c.portee} — chapitre ${c.ch}, ${c.t}.

Lis d'abord images/credits.md pour tes lignes, et la fiche suivi/${c.ch.split(' ')[0]}-redaction.md pour le
cadrage voulu de chaque image. Lis aussi le chapitre lui-meme : il nomme les especes avec leur nom latin,
et c'est le nom latin qui sert a chercher.

POUR CHAQUE IMAGE VISEE :
1. Cherche une candidate sur Wikimedia Commons en priorite (les modeles de licence y sont explicites et
   lisibles), puis iNaturalist, puis les planches botaniques du domaine public d'avant 1930, puis les
   agences federales americaines (USDA, USFWS, NPS, USGS).
2. RELEVE EXACTEMENT, sans approximer : le titre du fichier, l'URL de la PAGE DE FICHIER (pas l'image seule),
   le nom de l'auteur tel qu'il est ecrit, la licence exacte avec sa version (CC BY-SA 4.0, CC0, domaine
   public, CC BY-NC 2.0...), et la date si elle est donnee.
3. Si la licence est NON COMMERCIALE, prends-la quand meme mais marque-la : CLAUDE.md dit que c'est correct
   pour un usage prive et a remplacer si le livre se vend un jour.
4. Donne deux candidates quand tu peux, pour que l'editeur choisisse.
5. Si tu ne trouves rien de convenable, dis-le. Une case vide honnete vaut mieux qu'une image approximative.

=== LA REGLE QUI PRIME SUR TOUT LE RESTE ===
**Tu ne valides AUCUNE identification d'espece.** Tu releves ce que la source AFFIRME, et c'est tout.

Ces chapitres sont ceux ou une erreur tue. Le suivi du projet dit "sosies toxiques nommes dans chaque fiche"
pour le 58, et "mycologue, ou couper la section" pour le 59. Publier une photo trouvee sur iNaturalist et
etiquetee par un inconnu, c'est publier l'identification de cet inconnu comme si c'etait la notre. Le probleme
n'est pas la licence : c'est qui repond de l'identification.

Donc chaque ligne que tu ecris porte la mention "identification a valider par le specialiste", et tu nommes
lequel : mycologue pour le 59, botaniste ou biologiste en flore boreale pour le 30, 57, 58 et 60.
Quand une espece a un sosie toxique, NOMME LE SOSIE dans ta ligne, avec son nom latin. C'est l'information
qui protege, pas la photo.

N'ecris jamais qu'une espece est comestible, medicinale ou sans danger. Ce n'est pas ta phrase a ecrire.

Ecris dans images/candidats-${c.id}.md avec l'outil Write. Ce fichier est a toi seul.
Structure : une section par image, avec le sujet voulu, la ou les candidates et leur provenance complete,
le sosie toxique s'il y en a un, et le relecteur requis.`,
    { label: `recherche ch.${c.ch}${c.id.match(/[abc]$/) ? ' (' + c.id.slice(-1) + ')' : ''}`, phase: 'Recherche', schema: SCHEMA_CHASSE }
  )
)

const results = await parallel([...tris, ...chasses])

const tri = results.slice(0, LOTS.length).filter(Boolean)
const chasse = results.slice(LOTS.length).filter(Boolean)
log(`${tri.length}/${LOTS.length} lots tries, ${chasse.length}/${CHASSES.length} recherches terminees`)

return {
  tri: LOTS.map((l, i) => ({ lot: l.id, portee: `ch. ${l.de}-${l.a}`, r: results[i] || null })),
  chasse: CHASSES.map((c, i) => ({ id: c.id, chapitre: c.ch, r: results[LOTS.length + i] || null })),
}
