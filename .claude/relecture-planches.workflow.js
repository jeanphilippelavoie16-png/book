export const meta = {
  name: 'relecture-planches-vague-1',
  description: 'Huit relecteurs, trois ou quatre planches chacun : le montage marche-t-il, est-ce fidele au chapitre, corrige dans la description',
  phases: [{ title: 'Relecture', detail: 'un relecteur par groupe de planches, qui corrige lui-meme dans la description et recompose' }],
}

const FICHES = 'C:/Users/jeanp/AppData/Local/Temp/claude/C--Users-jeanp-New-folder/bed7cfe7-8639-429a-8cfe-5f58e5149259/scratchpad/fiches'

const SCHEMA = {
  type: 'object',
  properties: {
    planches: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          ref: { type: 'string' },
          verdict: { type: 'string', enum: ['bonne', 'corrigee', 'a_reprendre'] },
          defauts: { type: 'array', items: { type: 'string' } },
          corrections: { type: 'array', items: { type: 'string' } },
        },
        required: ['ref', 'verdict', 'defauts', 'corrections'],
      },
    },
  },
  required: ['planches'],
}

function prompt(g) {
  const liste = g.planches.map(p => `- **${p.ref}** — chapitre \`chapitres/${p.chapitre}\``).join('\n')
  return `Tu relis des planches du « Manuel du Nord », un manuel de survie personnel pour JP, qui soude, câble du 12 V, abat un orignal, et qui va **bâtir ou faire** ce que montrent ces planches sans en avoir jamais vu. Le projet est dans C:\\Users\\jeanp\\New folder. Tu n'as pas dessiné ces planches : c'est pour ça que tu les relis.

**Tes planches :**
${liste}

Pour chacune, les fichiers sont : la description \`images/planches-src/NN-NN*.js\` (une construction en deux pages a deux descriptions, a et b), le SVG \`images/planche-NN-NN*.svg\` que le compositeur en a tiré, et la fiche d'origine \`${FICHES}/NN-NN.md\`.

**Lis d'abord, une seule fois :** la tête de \`.claude/skills/planches/scripts/composer-planche.js\` jusqu'à \`const fs = require('fs');\` (le mode d'emploi du compositeur), et dans \`.claude/skills/planches/SKILL.md\` la section « Avant tout ».

**Pour chaque planche, dans cet ordre :**
1. Lis la description et la fiche. Dans le chapitre, lis **seulement** les passages sur l'objet : Grep, puis Read avec offset/limit.
2. Rends-la : \`node .claude/skills/planches/scripts/composer-planche.js images/planches-src/NN-NN.js\` (il recompose, vérifie et imprime le chemin du PNG). **Ouvre le PNG avec Read et regarde.**
3. Cherche, dans cet ordre d'importance :
   - **Le montage marcherait-il pour vrai ?** C'est la faute la plus grave, et le vérificateur ne la voit pas. Exemple réel : un siphon dessiné avec la sortie plus haute que la prise, qui se serait arrêté aux trois quarts. Suis l'eau, la fumée, l'air, la corde, le courant, la charge : d'où vient-elle, par où passe-t-elle, où sort-elle ? Une pente dans le mauvais sens, une fumée sans sortie, une corde qui tire du mauvais bord, un circuit qui ne se ferme pas, un poids qui ne porte sur rien, un nœud qui se défait.
   - **Fidèle au chapitre.** Chaque renvoi et chaque cote viennent du chapitre. Aucun chiffre inventé, aucune valeur marquée [À VÉRIFIER] sur le dessin. Si le chapitre décrit l'objet autrement que le dessin, c'est le chapitre qui a raison.
   - **Reconnaissable sans la légende.** Cache la légende : nommes-tu chaque objet ? Des rectangles et des traits qui ne disent rien, c'est à refaire.
   - **La composition.** Le dessin occupe-t-il sa vue ? Une pastille qui cache ce qu'elle désigne, une ligne de rappel qui arrive nulle part, un élément isolé loin du reste ?
   - **Les règles de JP.** Une planche montre comment fabriquer ou faire, jamais une règle ni une donnée. Ce qu'on trouve partout, pas ce qui s'achète. Aucun mot sur le dessin sauf une cote.
4. **Corrige toi-même**, dans la description, avec Edit. Recompose et regarde de nouveau. Deux regards au plus après correction. Si le défaut demande de tout redessiner, ne le fais pas : note-le « à reprendre » avec ce qu'il faut changer.

**Travaille économiquement :** chaque tour relit tout ton contexte. Pas d'exploration, pas de lecture des autres planches, pas de relecture complète d'un fichier déjà lu. Ne touche qu'aux descriptions de tes planches et aux SVG que le compositeur en tire.

Réponds avec, pour chaque planche : le verdict (bonne, corrigée, à reprendre), les défauts trouvés, et ce que tu as corrigé.`
}

return await parallel(args.map(g => () =>
  agent(prompt(g), { label: `relecture ${g.planches.map(p => p.ref).join(' ')}`, phase: 'Relecture', schema: SCHEMA })
    .catch(e => ({ erreur: String(e), groupe: g.planches.map(p => p.ref) }))
))
