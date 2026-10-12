export const meta = {
  name: 'compresser-3-4',
  description: "Compresse les sections 3 (Pourquoi ca marche) et 4 (Materiel) de chaque chapitre : seulement l'indispensable, explique en une ligne",
  phases: [{ title: 'Compression', detail: 'un agent par chapitre, lots de 10' }],
}

// JP, 27 septembre 2026 : « Liste de matériel à chaque chapitre pas essentielle : on garde seulement ce qui
// est absolument nécessaire et on explique c'est quoi. Pourquoi ça marche, je veux ça compressé. C'est long
// pour rien. » args = [fichier de chapitre, …]
const ROOT = 'C:\\Users\\jeanp\\New folder'
const S = { type: 'object', properties: { fichier: { type: 'string' }, motsAvant: { type: 'number' }, motsApres: { type: 'number' }, materielGarde: { type: 'array', items: { type: 'string' } }, materielCoupe: { type: 'array', items: { type: 'string' } }, deplace: { type: 'array', items: { type: 'string' }, description: 'ce qui a ete deplace ailleurs dans le chapitre plutot que coupe, et ou' } }, required: ['fichier', 'motsAvant', 'motsApres', 'materielGarde', 'materielCoupe', 'deplace'] }

const P = (f) => `Tu travailles sur « Le Grand Livre du Chalet », un manuel de survie imprimé pour JP et sa famille (Côte-Nord). Projet : ${ROOT}. **CLAUDE.md est dans ton contexte et prime.** Ton chapitre : \`chapitres/${f}\`.

**JP, aujourd'hui :** « La liste de matériel à chaque chapitre, pas essentielle : on garde seulement ce qui est absolument nécessaire et on explique c'est quoi. Pourquoi ça marche, je veux ça compressé. C'est long pour rien. »

**Ta mission : réécrire deux sections, et seulement elles.**

**§3 Pourquoi ça marche → trois à cinq phrases, 120 mots au plus.** Le principe qui permet d'improviser quand il manque quelque chose : le mécanisme, pas son histoire. Coupe les exemples, les chiffres qui sont déjà dans la procédure, ce que §5, §8 ou §9 redisent, les nuances de spécialiste. Une phrase par idée. Si le chapitre est un chapitre de référence sans §3, ne crée rien.

**§4 Matériel → seulement l'indispensable, une ligne par item, 15 à 20 mots.** Un item reste seulement si, sans lui, la procédure **échoue ou devient dangereuse**. Tout le reste sort : gants, étiquettes, ficelle, crochets, contenants ordinaires, ce que tout le monde a dans une cuisine ou un atelier, et les doublons. Chaque item gardé tient sur **une seule ligne** : son nom en gras, un tiret, puis ce qu'il fait ou ce que c'est (si le nom ne le dit pas à quelqu'un qui n'en a jamais vu) — la raison, pas la description. Un substitut seulement s'il est vital, sinon « (→ §9) » quand la variante d'urgence le fabrique. JP a validé exactement ce format :

\`\`\`
## 4. Matériel

- **Balance au gramme** — tout se dose en % du poids de la viande (→ §9 : balance à fléau).
- **Thermomètre à sonde** — porte les 74 °C à cœur. Ne se fabrique pas.
- **Thermomètre min-max** — dit si la chambre a passé 15,6 °C la nuit.
- **Sel sans additif** — 6 % du poids de la viande. Jamais de sel de déglaçage.
- **Sel nitrité** — sel + nitrite de sodium, 2e barrière contre le botulisme. Dosé selon l'emballage.
- **Contenant qui égoutte** — plastique, inox ou grès ; ni alu, ni galvanisé, ni cuivre.
\`\`\`

Pas de tableau, pas de colonnes, pas de paragraphe d'introduction ni de fin (pas même « Le reste : ch. 00b »). Habituellement 2 à 6 items. **Si la section a déjà été compressée une première fois** (liste à puces, ligne « Compression §3 et §4 » dans le suivi), resserre-la à ce format.

**Ce qui ne se perd pas.** Un fait qui sauve une vie (les rappels de sécurité du tableau de CLAUDE.md, un « jamais ceci » qui évite un empoisonnement ou une blessure) ne disparaît pas du chapitre : s'il n'est dit **que** dans §3 ou §4, déplace-le en une phrase dans §8 (Danger) ou à l'étape de §5 qui s'en sert. Une note de bas de page dont l'appel disparaît : supprime aussi sa définition ; une note gardée reste. Un renvoi ailleurs dans le chapitre vers un élément que tu coupes (« voir §4 », « la balance du tableau ») : corrige-le. Garde, quand tu le peux, les **premiers mots** des paragraphes que tu conserves (des figures s'y accrochent dans \`design/epreuves-livre/placements*.json\`).

Corrige avec Edit (ou Write pour une section entière, en relisant le fichier avant). Ne touche à aucune autre section ni à aucun autre fichier, sauf une ligne à la fin de \`suivi/NN-redaction.md\` : « Compression §3 et §4 — 27 septembre 2026 : N mots → M mots ; matériel coupé : … ». Ne cherche rien sur le web : tu ne fais que resserrer ce qui est écrit, sans ajouter de chiffre. Travaille économiquement : lis §3 et §4 (Grep des titres puis Read avec offset/limit), puis Grep dans le reste du chapitre ce dont tu as besoin pour vérifier.`

const LOT = 10
const res = []
for (let i = 0; i < args.length; i += LOT) {
  res.push(...await parallel(args.slice(i, i + LOT).map(f => () =>
    agent(P(f), { label: `compresser ${f.split('-')[0]}`, phase: 'Compression', schema: S })
      .catch(e => ({ fichier: f, erreur: String(e) })))))
}
return res
