export const meta = {
  name: 'idees-the-knowledge',
  description: 'Trois chercheurs etudient The Knowledge de Lewis Dartnell par theme, puis un quatrieme compare aux 89 chapitres et dit quoi en prendre',
  phases: [
    { title: 'Recherche', detail: 'trois chercheurs, un bloc de themes chacun' },
    { title: 'Synthese', detail: 'comparaison avec le Grand Livre du Chalet, idees a prendre et a laisser' },
  ],
}

const SCHEMA_R = {
  type: 'object',
  properties: {
    idees: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          theme: { type: 'string' },
          idee: { type: 'string', description: 'l idee en tes propres mots, deux ou trois phrases' },
          pourLaCoteNord: { type: 'string', description: 'ce que ca donnerait pour une famille de la Cote-Nord, maison et chalet' },
          ouLaTrouver: { type: 'string', description: 'la page web qui en parle' },
        },
        required: ['theme', 'idee', 'pourLaCoteNord', 'ouLaTrouver'],
      },
    },
    approche: { type: 'string', description: 'ce qui fait la facon du livre, pas son contenu' },
  },
  required: ['idees', 'approche'],
}

const SCHEMA_S = {
  type: 'object',
  properties: {
    rapport: { type: 'string', description: 'chemin du rapport ecrit' },
    aPrendre: { type: 'number' },
    nouveauxChapitres: { type: 'array', items: { type: 'string' } },
    resume: { type: 'string' },
  },
  required: ['rapport', 'aPrendre', 'nouveauxChapitres', 'resume'],
}

const BASE = `Tu étudies le livre **The Knowledge: How to Rebuild Our World from Scratch** (Lewis Dartnell, 2014) pour en tirer des idées pour un autre livre : « Le Grand Livre du Chalet », un manuel de survie et d'autonomie en français québécois, en quatre tomes et 89 chapitres, pour une famille de la Côte-Nord (JP, sa conjointe, deux enfants de 4 et 6 ans ; une maison au village sur le réseau, un chalet hors réseau avec bois, eau et territoire de chasse et pêche). Le projet est dans C:\\Users\\jeanp\\New folder ; CLAUDE.md, dans ton contexte, dit ce que ce livre est : de la débrouille quand on n'a rien, pas un manuel de la CNESST.

**Où chercher.** Charge WebSearch et WebFetch avec ToolSearch (« select:WebSearch,WebFetch »). Le site de l'auteur (the-knowledge.org), ses entrevues et conférences, les recensions sérieuses, la table des matières publiée par l'éditeur. **Tu n'as pas le livre** : tu travailles à partir de ce qui en est publié.

**Droit d'auteur.** Tu ne recopies pas le livre. Chaque idée est dite **dans tes mots**. Au plus une citation courte (moins de quinze mots) dans tout ton travail.

**Ce qu'on cherche** : des idées, pas un résumé. Un procédé, une façon de penser, un sujet que le Grand Livre n'a peut-être pas. Pour chacune, ce qu'elle deviendrait pour cette famille-là, à la maison ou au chalet, sur la Côte-Nord. Laisse de côté ce qui ne sert qu'à rebâtir une civilisation (une aciérie, une centrale) : JP veut de quoi survivre et s'adapter, avec ses mains, à l'échelle d'une famille et d'un voisinage. Travaille économiquement.`

const BLOCS = [
  { nom: 'approche et vivres', texte: `**Ton bloc :** la façon du livre — la « période de grâce » après l'effondrement, la récupération dans ce qui reste, repartir des principes plutôt que des recettes, l'ordre dans lequel on rebâtit — puis l'agriculture, la conservation des aliments, l'eau.` },
  { nom: 'matieres et chimie', texte: `**Ton bloc :** les matières et la chimie de base — chaux, potasse et soude, savon, charbon de bois, goudron, verre, céramique et four, métaux et forge, papier, textiles et fibres, colles, et tout ce qu'on fabrique à partir du bois, des cendres et de la terre.` },
  { nom: 'sante energie et savoir', texte: `**Ton bloc :** la santé et les médicaments, l'énergie (bois, vent, eau, électricité rudimentaire), le transport, les communications (radio), mesurer le temps et s'orienter, et comment garder et transmettre le savoir aux enfants.` },
]

const recherches = await parallel(BLOCS.map(b => () =>
  agent(BASE + '\n\n' + b.texte, { label: `The Knowledge : ${b.nom}`, phase: 'Recherche', schema: SCHEMA_R })
    .then(r => ({ bloc: b.nom, ...r }))
    .catch(e => ({ bloc: b.nom, erreur: String(e), idees: [] }))
))

const synthese = await agent(`Trois chercheurs ont étudié **The Knowledge** (Lewis Dartnell) pour en tirer des idées pour « Le Grand Livre du Chalet ». Le projet est dans C:\\Users\\jeanp\\New folder ; CLAUDE.md est dans ton contexte.

Voici leur travail :
${JSON.stringify(recherches, null, 1)}

**Ta tâche :** comparer ces idées au Grand Livre tel qu'il est. Lis \`plan/plan-maitre.md\` et la liste des chapitres (\`chapitres/\`, les titres suffisent ; ouvre un chapitre seulement pour vérifier qu'un sujet y est ou n'y est pas, avec Grep). Puis écris \`suivi/idees-the-knowledge.md\` :
1. **Ce qu'on prend**, classé par ce qui rapporte le plus à cette famille-là : pour chaque idée, où elle irait (chapitre existant à compléter, ou chapitre nouveau), en deux ou trois lignes.
2. **Les chapitres nouveaux** que ça justifierait, s'il y en a, avec le tome où ils iraient.
3. **La façon du livre** qu'on pourrait reprendre, si elle éclaire la nôtre (par exemple : partir des principes pour que le lecteur retrouve la recette).
4. **Ce qu'on laisse**, en une ligne chacun, et pourquoi.
Pas de résumé du livre, pas de citation longue : des idées dans nos mots. Le rapport se lit en cinq minutes.`,
  { label: 'synthese The Knowledge', phase: 'Synthese', schema: SCHEMA_S })

return { synthese, recherches: recherches.map(r => ({ bloc: r.bloc, n: (r.idees || []).length, erreur: r.erreur })) }
