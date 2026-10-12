export const meta = {
  name: 'telechargement-photos',
  description: 'Telecharge en resolution d impression les images sous licence deja reperees, licence verifiee a la source, registre de credits par lot',
  phases: [{ title: 'Telechargement', detail: 'un agent par registre de candidates' }],
}

const SCHEMA = {
  type: 'object',
  properties: {
    dossier: { type: 'string' },
    registre: { type: 'string' },
    telechargees: { type: 'number' },
    ecartees: { type: 'array', items: { type: 'string' }, description: 'candidate ecartee et pourquoi (licence qui ne correspond pas, fichier disparu, trop petite)' },
    megaoctets: { type: 'number' },
  },
  required: ['dossier', 'registre', 'telechargees', 'ecartees', 'megaoctets'],
}

const P = (f) => `Tu télécharges des images pour « Le Grand Livre du Chalet », un livre imprimé de survie à usage privé. Le projet est dans C:\\Users\\jeanp\\New folder. JP, l'auteur, a autorisé le téléchargement des images sous licence repérées par la recherche.

**Ton registre de candidates :** \`images/${f}.md\`. Il liste, image visée par image visée, une à trois candidates avec l'URL de la page, l'auteur et la licence déclarée.

**Pour chaque image visée :**
1. Prends la **meilleure candidate** que le registre recommande (ou la première qui convient). Si le registre dit qu'aucune ne convient, passe.
2. **Vérifie la licence à la source, au moment du téléchargement** — pas celle écrite dans le registre :
   - Wikimedia Commons : \`https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=url|size|extmetadata&iiurlwidth=2400&titles=File:NOM\`. La licence est dans \`extmetadata.LicenseShortName\`, l'auteur dans \`Artist\`. Prends \`thumburl\` (2400 px de large, assez pour une demi-page imprimée à 300 ppp) et non l'original.
   - iNaturalist : \`https://api.inaturalist.org/v1/photos/ID\` (ou l'observation) donne \`license_code\` et \`attribution\` ; prends la taille \`large\` ou \`original\`. Une photo sans \`license_code\` est « tous droits réservés » : écarte-la.
   - Agences fédérales américaines et planches d'avant 1930 : note la mention de domaine public de la page.
   Si la licence vérifiée diffère du registre, ou si le fichier n'existe plus, écarte la candidate et essaie la suivante.
3. Télécharge avec curl, **un fichier à la fois**, avec \`-A "GrandLivreDuChalet/1.0 (livre personnel)"\` et une pause d'une seconde entre deux fichiers (Wikimedia l'exige). N'envoie aucune adresse courriel.
4. Range le fichier dans \`images/photos/${f.replace('candidats-', '')}/\`, nommé \`<numéro de l'image visée>-<sujet-court>.<ext>\`. Vérifie que c'est bien une image (taille non nulle, en-tête JPEG ou PNG) ; une page HTML téléchargée par erreur s'efface.
5. Inscris-le dans \`images/photos/registre-${f.replace('candidats-', '')}.md\` : fichier, image visée, ce qu'il montre selon la source, auteur, licence vérifiée, URL de la page, date (23 septembre 2026), dimensions.

**Ne valide aucune identification d'espèce** : le registre recopie ce que la source affirme. Ne touche ni à \`images/credits.md\` ni aux autres registres, ni à rien hors de ton dossier et de ton registre. Travaille économiquement : un script bash ou node qui boucle sur la liste vaut mieux que cent appels à la main.`

const FICHIERS = (typeof args !== 'undefined' && Array.isArray(args) && args.length) ? args : ['candidats-30a', 'candidats-30b', 'candidats-30c', 'candidats-57-59', 'candidats-58', 'candidats-60']

// Un lot à la fois : Wikimedia refuse (429) quand plusieurs agents téléchargent en même temps.
const REPRISE = `\n\n**Reprise après une coupure.** Un premier passage a été coupé en plein travail : des fichiers sont peut-être déjà dans le dossier du lot, et le registre est peut-être absent ou incomplet. Liste le dossier d'abord. Un fichier déjà là et valide (vraie image, bonne taille) ne se retélécharge pas : vérifie seulement sa licence à la source et inscris-le au registre. Un fichier vide ou HTML s'efface. Wikimedia sert seulement ses largeurs standard (500, 960, 1280, 1920, 3840) : prends la plus grande qui ne dépasse pas l'original, et sur un 429, attends et réessaie une fois.`
const res = []
for (const f of FICHIERS) {
  res.push(await agent(P(f) + REPRISE, { label: `photos ${f.replace('candidats-', '')}`, phase: 'Telechargement', schema: SCHEMA })
    .then(r => ({ lot: f, ...r }))
    .catch(e => ({ lot: f, erreur: String(e) })))
}
return res
