export const meta = {
  name: 'planches-40-dessin-relecture',
  description: 'Dessine 40 planches nouvelles avec le compositeur puis les fait relire une a une par un autre agent, montage verifie',
  phases: [
    { title: 'Dessin', detail: 'un agent par planche, brief ferme, trois regards au plus' },
    { title: 'Relecture', detail: 'un autre agent verifie que le montage marche et corrige dans la description' },
  ],
}

const FICHES = 'C:/Users/jeanp/AppData/Local/Temp/claude/C--Users-jeanp-New-folder/bed7cfe7-8639-429a-8cfe-5f58e5149259/scratchpad/fiches'
const S1 = { type: 'object', properties: { fichiers: { type: 'array', items: { type: 'string' } }, ceQueJeVois: { type: 'string' }, cotes: { type: 'array', items: { type: 'string' } }, laisseDeCote: { type: 'array', items: { type: 'string' } } }, required: ['fichiers', 'ceQueJeVois', 'cotes', 'laisseDeCote'] }
const S2 = { type: 'object', properties: { verdict: { type: 'string', enum: ['bonne', 'corrigee', 'a_reprendre'] }, defauts: { type: 'array', items: { type: 'string' } }, corrections: { type: 'array', items: { type: 'string' } } }, required: ['verdict', 'defauts', 'corrections'] }

const commun = (p) => `Planche **${p.ref}** du « Manuel du Nord », un manuel de survie pour une famille de la Côte-Nord (JP soude, câble du 12 V, abat un orignal, et va **bâtir ou faire** ce que montre la planche sans en avoir jamais vu). Projet : C:\\Users\\jeanp\\New folder. Chapitre : \`chapitres/${p.chapitre}\`. Fiche : \`${FICHES}/${p.ref}.md\`. Lis la tête de \`.claude/skills/planches/scripts/composer-planche.js\` (jusqu'à \`const fs = require('fs');\`) et, dans \`.claude/skills/planches/SKILL.md\`, les sections « Avant tout » et « Le texte sur la planche ». Dans le chapitre, lis **seulement** les passages sur l'objet (Grep, puis Read avec offset/limit). Travaille économiquement : chaque tour relit tout ton contexte.`

const dessiner = (p) => `${commun(p)}

**Dessine-la.** Une planche montre comment fabriquer ou faire la chose. ${p.profondeur ? "C'est une construction : **en profondeur**, deux à quatre vues (coupe, vu de dessus, élévation, détail d'assemblage), chaque vue montre ce que les autres ne montrent pas ; deux pages (a et b) si une ne suffit pas." : 'Le format suit le contenu.'} Ce qu'on trouve partout, pas ce qui s'achète. **Aucun chiffre qui ne soit pas dans le chapitre** ; rien de marqué [À VÉRIFIER] sur le dessin. Six renvois au plus par vue ; aucun mot sur le dessin sauf une cote. Écris \`images/planches-src/${p.ref}.js\`, compose avec \`--zones\` puis sans, **ouvre le PNG et regarde**, trois fois au plus. Ne touche qu'à ta description et au SVG qu'elle produit.${p.note ? '\n\n' + p.note : ''}`

const relire = (p) => `${commun(p)}

**Tu relis cette planche, que tu n'as pas dessinée.** Fichiers : \`images/planches-src/${p.ref}*.js\` et le SVG qui en sort. Recompose (\`node .claude/skills/planches/scripts/composer-planche.js images/planches-src/${p.ref}.js\`) et **ouvre le PNG**. Cherche dans cet ordre : **le montage marcherait-il pour vrai ?** (suis l'eau, la fumée, l'air, la corde, le courant, la charge : d'où ça vient, par où ça passe, où ça sort — c'est la faute que le vérificateur ne voit pas : un siphon dont la sortie est plus haute que la prise, une brimbale qui ne s'arme pas, un trou à feu ouvert qui tire droit en l'air) ; fidèle au chapitre (aucun chiffre inventé, aucun [À VÉRIFIER] dessiné) ; reconnaissable sans la légende ; la composition. **Corrige toi-même** dans la description avec Edit, recompose, regarde ; deux regards au plus après correction. Si c'est à redessiner au complet, dis « à reprendre » avec ce qu'il faut changer.`

const res = await pipeline(
  args,
  // p.dessine : la planche est déjà dessinée (reprise après coupure), on passe direct à la relecture
  p => p.dessine ? Promise.resolve({ p, d: { fichiers: [] } }) :
    agent(dessiner(p), { label: `dessin ${p.ref}`, phase: 'Dessin', schema: S1 })
      .then(d => d ? { p, d } : { p, erreur: 'dessin sans résultat' }).catch(e => ({ p, erreur: String(e) })),
  x => x.erreur ? { ref: x.p.ref, erreur: x.erreur } :
    agent(relire(x.p), { label: `relecture ${x.p.ref}`, phase: 'Relecture', schema: S2 })
      .then(r => r ? ({ ref: x.p.ref, fichiers: x.d.fichiers, verdict: r.verdict, defauts: r.defauts, corrections: r.corrections })
                   : ({ ref: x.p.ref, erreurRelecture: 'relecture sans résultat' }))
      .catch(e => ({ ref: x.p.ref, fichiers: x.d.fichiers, erreurRelecture: String(e) }))
)
return res
