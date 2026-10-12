export const meta = {
  name: 'passe-services',
  description: 'Retire des chapitres les services qui repondent (sites a consulter, sante publique, autorites, pharmacien, pompiers) en gardant le mecanisme',
  phases: [{ title: 'Passe', detail: 'un agent par groupe de chapitres' }],
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

**JP a tranché : aucun service qui répond, dans tout le livre.** Les numéros de téléphone sont déjà partis. Il reste à couper tout service qu'on attend ou qu'on consulte : les sites (Info-pannes, Québec 511, la carte de la SOPFEU, Urgence Québec), « joindre la santé publique », « signaler aux autorités », « c'est le pharmacien qui tranche », « attendre les pompiers », et tout ce qui suppose que quelqu'un de l'extérieur répond, vient ou décide. **Hydro-Québec reste** quand c'est un fait sur le réseau ou la panne (« le réseau d'Hydro-Québec », « le camion qui ne viendra pas ») et saute quand c'est un service à joindre.

**Tes chapitres :** ${g.map(f => '`chapitres/' + f + '`').join(', ')}.

Comment couper :
- **Le mécanisme reste, dit comme un fait.** « La santé publique dira si l'eau est bonne » devient ce qu'on fait soi-même pour s'en garder (bouillir, et le chapitre qui le dit). « C'est le pharmacien qui tranche » devient la règle que le pharmacien aurait appliquée, si le chapitre ou une source enregistrée dans sources/ la donne ; sinon la phrase dit le risque et s'arrête. « Attendre les pompiers » devient ce qu'on fait sans eux.
- Une ligne de tableau, une puce ou un paragraphe qui n'existait que pour le service saute en entier. Si une étape numérotée disparaît, renumérote la suite et vérifie par Grep qu'aucun autre chapitre n'y renvoie par son numéro.
- N'invente aucun geste ni aucun chiffre. Ne touche ni aux notes de bas de page ni aux renvois de planches. Corrige avec Edit.
- Copie d'abord chaque fichier dans \`C:\\Users\\jeanp\\AppData\\Local\\Temp\\claude\\C--Users-jeanp-New-folder\\bed7cfe7-8639-429a-8cfe-5f58e5149259\\scratchpad\\backup-services\\\`.
- À la fin, Grep tes chapitres pour Info-pannes, 511, SOPFEU, Urgence Québec, santé publique, autorités, pharmacien, pompier : ce qui reste doit être un fait, pas un service.

Travaille économiquement : Grep d'abord, puis Read avec offset/limit autour de chaque passage.`

return await parallel(args.map(g => () =>
  agent(P(g), { label: `services ${g.map(f => f.split('-')[0]).join(' ')}`, phase: 'Passe', schema: S })
    .catch(e => ({ erreur: String(e), groupe: g }))
))
