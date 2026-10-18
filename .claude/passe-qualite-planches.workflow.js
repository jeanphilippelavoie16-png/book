export const meta = {
  name: 'passe-qualite-planches',
  description: "Juge la qualite visuelle de 100 % des planches (validees et a valider) contre les recommandations de JP, et donne la liste des modifications a faire, planche par planche",
  phases: [{ title: 'Examen', detail: 'un agent par lot de 12 planches ; rien n est redessine' }],
}

// JP, 28 septembre 2026 : « Lance l'agent qui valide la qualité visuelle des planches et donne une liste de modifs
// en fonction de la qualité (on passe 100 % des planches, validées et non validées). »
// args = lots de { f: chemin du PNG, statut } (scratchpad/lots-qualite.json). Aucune planche n'est modifiée ici.
const ROOT = 'C:\\Users\\jeanp\\New folder'
const LOTS = 'C:/Users/jeanp/AppData/Local/Temp/claude/C--Users-jeanp-New-folder/bed7cfe7-8639-429a-8cfe-5f58e5149259/scratchpad/lots-qualite.json'

const S = {
  type: 'object',
  properties: {
    planches: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          fichier: { type: 'string' },
          verdict: { type: 'string', enum: ['bonne', 'retouches', 'a-refaire'] },
          regles: { type: 'array', items: { type: 'string' }, description: 'regles de JP touchees : mains, geste-fin, mecanisme, couches, dessin-technique, cotes, lisibilite, texte, autre' },
          modifs: { type: 'array', items: { type: 'string' }, description: 'modifications precises a faire, une par ligne, dans l ordre d importance' },
        },
        required: ['fichier', 'verdict', 'regles', 'modifs'],
      },
    },
  },
  required: ['planches'],
}

const ouvre = s => s.startsWith('V:') ? { f: 'images/validees/planche-' + s.slice(2), statut: 'validée' } : { f: 'images/a-valider/planche-' + s.slice(2), statut: 'à valider' }

const P = (lot0, i) => { const lot = lot0.map(ouvre); return `Tu fais la **passe qualité** des planches du « Manuel du Nord », un manuel de survie imprimé (8 × 10 po, noir au trait) pour JP et sa famille, sur la Côte-Nord. Projet : ${ROOT}. JP va **bâtir ou faire** ce que montre chaque planche sans en avoir jamais vu ; une planche qu'il ne comprend pas au premier coup d'œil ne sert à rien.

**D'abord, lis en entier \`images/recommandations-planches.md\` : ce sont les exigences de JP, c'est ta grille.** En résumé : les gestes fins (couture, nœud, maille, laçage, ligature) extrêmement bien dessinés ou inutiles ; les mains et les personnages sont le point faible (simples et justes, ou pas de main du tout ; pas de « pince de homard », pas de bloc) ; un mécanisme ou un piège se lit au premier coup d'œil ; une coupe en couches se lit couche par couche ; un dessin technique est un vrai dessin technique (vues alignées, traits propres) ; des **cotes en mm sur ce qu'on construit**, jamais inventées, et pas sur le reste ; les flèches pointent dans le vrai sens du geste ; aucun mot sur le dessin sauf une cote ; les légendes numérotées correspondent à ce qu'elles désignent.

**Tes planches (lot ${i + 1}) :**
${lot.map(p => `- \`${p.f}\` (${p.statut})`).join('\n')}

**Pour chacune :** ouvre le PNG (Read) et regarde-le vraiment, de près : le tout, puis chaque vue. Si un détail t'échappe, lis les premières lignes de sa description \`images/planches-src/<ref>.js\` (le commentaire de tête dit ce qu'elle doit montrer) ; ne lis pas le chapitre sauf pour trancher un doute sur un mécanisme. Puis décide :
- **bonne** : rien à changer, ou un détail si mineur qu'il ne vaut pas le travail ;
- **retouches** : la planche se garde, avec des corrections précises (une main à reprendre, une flèche à retourner, une cote manquante sur une pièce construite, une vue à agrandir, des renvois qui se chevauchent) ;
- **a-refaire** : elle ne se comprend pas, ou elle est fausse, ou laide au point de nuire (comme les planches que JP a rejetées : mains en pince de homard, maille illisible, couches confuses).

Les **modifs** sont des consignes qu'un dessinateur peut suivre sans te relire : quoi, où (quelle vue, quel renvoi), et comment. Pas de compliments, pas de généralités (« améliorer la lisibilité » ne dit rien). Sois exigeant mais juste : une planche correcte et utile est **bonne**, même si elle n'est pas belle comme une gravure.

**Écris au fur et à mesure** dans \`images/passe-qualite/lot-${String(i + 1).padStart(2, '0')}.md\` (crée le dossier au besoin) : une section par planche, verdict en tête, puis les modifs. Si le fichier existe déjà, reprends après la dernière planche qu'il contient. Tu ne modifies **aucune** planche ni aucun autre fichier. Travaille économiquement : une planche à la fois, un regard attentif, puis la suivante.` }

return await parallel(args.map((lot, i) => () =>
  agent(P(lot, i), { label: `qualité lot ${i + 1}`, phase: 'Examen', schema: S })
    .catch(e => ({ lot: i + 1, erreur: String(e) }))))
