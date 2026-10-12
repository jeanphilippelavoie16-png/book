export const meta = {
  name: 'passe-telephone',
  description: 'Retire tout numero de telephone des chapitres (911, 811, antipoison, lignes de ministere) en gardant ce que la phrase disait de la gravite',
  phases: [{ title: 'Passe', detail: 'un agent par groupe de quatre chapitres' }],
}

const S = {
  type: 'object',
  properties: {
    chapitres: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          fichier: { type: 'string' },
          retires: { type: 'number' },
          exemples: { type: 'array', items: { type: 'string' }, description: 'deux ou trois avant -> apres' },
          doutes: { type: 'array', items: { type: 'string' } },
        },
        required: ['fichier', 'retires', 'exemples', 'doutes'],
      },
    },
  },
  required: ['chapitres'],
}

const P = (g) => `Tu travailles sur « Le Grand Livre du Chalet », un manuel de survie pour une famille de la Côte-Nord. Projet : C:\\Users\\jeanp\\New folder. **CLAUDE.md est dans ton contexte et prime sur tout.**

**JP a tranché : aucun numéro de téléphone dans le livre.** Ni 911 (ou 9-1-1), ni Info-Santé 811, ni Centre antipoison (1 800 463-5060), ni ligne d'un ministère ou d'Hydro, ni aucun autre. Le test « il n'y a personne à appeler » vaut partout, même pour une panne courte à la maison.

**Tes chapitres :** ${g.map(f => '`chapitres/' + f + '`').join(', ')}.

Comment couper :
- **Ce que la phrase disait de la gravité reste.** « Si l'enfant ne se réveille pas, 911 » devient « Si l'enfant ne se réveille pas, sa vie est en jeu » et la phrase enchaîne sur ce qu'on fait ici, avec ce qu'on a — ce que le chapitre dit déjà ailleurs, ou le renvoi au chapitre qui le dit (ch. 27, 31, 33…). N'invente aucun geste médical : si le chapitre ne dit pas quoi faire, la phrase dit la gravité et s'arrête.
- Si la route existe encore et que le texte le permet, « partir vers l'hôpital » reste une option dite comme un fait (le chapitre 2 et le 31 en parlent) — sans numéro, sans répartiteur.
- Une ligne de tableau, une puce ou un paragraphe qui n'existait que pour donner un numéro saute en entier. Une liste de « numéros à écrire » perd les numéros de services ; les proches et les voisins restent.
- Une phrase qui explique comment le 911 marche (sans forfait, position non transmise…) saute.
- Ne touche à rien d'autre : ni chiffre, ni note de bas de page, ni renvoi de planche. Corrige avec Edit.
- Copie d'abord chaque fichier dans \`C:\\Users\\jeanp\\AppData\\Local\\Temp\\claude\\C--Users-jeanp-New-folder\\bed7cfe7-8639-429a-8cfe-5f58e5149259\\scratchpad\\backup-telephone\\\`.
- À la fin, vérifie par Grep qu'il ne reste ni « 911 », ni « 9-1-1 », ni « 811 », ni « Info-Santé », ni « antipoison », ni numéro à dix chiffres dans tes chapitres.

Travaille économiquement : Grep d'abord, puis Read avec offset/limit autour de chaque passage.`

return await parallel(args.map(g => () =>
  agent(P(g), { label: `téléphone ${g.map(f => f.split('-')[0]).join(' ')}`, phase: 'Passe', schema: S })
    .catch(e => ({ erreur: String(e), groupe: g }))
))
