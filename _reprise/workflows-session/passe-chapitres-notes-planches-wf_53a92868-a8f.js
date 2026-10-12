export const meta = {
  name: 'passe-chapitres-notes-planches',
  description: 'Complete cinq chapitres a la source sur les trous trouves par les relecteurs de planches, puis retouche les planches touchees',
  phases: [
    { title: 'Chapitre', detail: 'recherche a la source, correction du chapitre, provenance au suivi' },
    { title: 'Planche', detail: 'retouche de la planche si le chapitre a change ce qu elle doit montrer' },
  ],
}

const SCHEMA_CH = {
  type: 'object',
  properties: {
    chapitreModifie: { type: 'boolean' },
    ceQuiAChange: { type: 'array', items: { type: 'string' }, description: 'chaque ajout ou retouche, avec la phrase ecrite' },
    sources: { type: 'array', items: { type: 'string' }, description: 'fichiers enregistres dans sources/ et leur URL' },
    aVerifier: { type: 'array', items: { type: 'string' }, description: 'ce qui reste marque [A VERIFIER] et pourquoi' },
    plancheAChanger: { type: 'boolean' },
    briefPlanche: { type: 'string', description: 'si la planche doit changer : quoi exactement, vue par vue, renvois compris' },
  },
  required: ['chapitreModifie', 'ceQuiAChange', 'sources', 'aVerifier', 'plancheAChanger', 'briefPlanche'],
}

const SCHEMA_PL = {
  type: 'object',
  properties: {
    fichiers: { type: 'array', items: { type: 'string' } },
    changements: { type: 'array', items: { type: 'string' } },
    regards: { type: 'number' },
  },
  required: ['fichiers', 'changements', 'regards'],
}

function promptChapitre(p) {
  return `Tu fais une retouche ciblée dans un chapitre du « Grand Livre du Chalet », un manuel de survie personnel en français québécois. Le projet est dans C:\\Users\\jeanp\\New folder ; ses règles sont dans CLAUDE.md, déjà dans ton contexte. Elles ne se discutent pas : **aucun chiffre inventé**, aucune attribution de source dans le texte, aucun numéro de norme, aucune évidence, et la débrouille avec ce qu'on trouve partout passe avant l'article du commerce.

**Le chapitre :** \`chapitres/${p.chapitre}\`. **La planche liée :** ${p.ref}.

**Le problème**, trouvé par un relecteur qui vérifiait que le montage dessiné marcherait pour vrai :
${p.probleme}

**La méthode :**
1. Lis seulement le passage concerné : Grep, puis Read avec offset/limit. Pas le chapitre en entier.
2. **Cherche à la source avant d'écrire.** Charge les outils avec ToolSearch (« select:WebSearch,WebFetch »). Les sources officielles passent d'abord ; pour un fait technique qu'aucun ministère ne couvre (électricité, piégeage, outillage), une source technique sérieuse : guide d'une fédération de trappeurs, fabricant, manuel reconnu. Pas un forum. Enregistre chaque page qui sert dans \`sources/${p.chapitre.slice(0, 2)}-<court>.md\`, au format des autres fiches du dossier (regarde-en une) : titre, organisme, URL, « Consultée le : 23 septembre 2026 », « Sert dans », extraits intégraux entre guillemets.
3. **Corrige le chapitre** avec Edit, au bon endroit, dans le ton du livre : direct, dense, sans tutoiement du lecteur. Dis ce qui se fait et pourquoi, avec ce qu'on a sous la main. Un chiffre qu'aucune source ne donne ne s'écrit pas, ou porte [À VÉRIFIER]. Pas de parenthèse de provenance.
4. **Note la provenance** à la fin de \`suivi/${p.chapitre.slice(0, 2)}-redaction.md\`, dans une section « Passe des planches — 23 septembre 2026 » : ce qui a changé, et d'où vient chaque fait.
5. **Dis si la planche ${p.ref} doit changer** pour suivre le chapitre corrigé, et si oui, écris le brief du dessinateur : quoi ajouter ou changer, vue par vue, renvois compris. Si la planche est déjà juste, dis-le.

Travaille économiquement : chaque tour relit tout ton contexte. Ne touche qu'au chapitre, à son suivi et aux fiches de source que tu crées.`
}

function promptPlanche(p, r) {
  return `Tu retouches une planche du « Grand Livre du Chalet », la **${p.ref}**, parce que son chapitre vient d'être complété. Le projet est dans C:\\Users\\jeanp\\New folder.

**Le brief, écrit par celui qui a corrigé le chapitre :**
${r.briefPlanche}

**Ce qui a changé dans le chapitre :**
${r.ceQuiAChange.map(x => '- ' + x).join('\n')}

**Les fichiers :** la description \`images/planches-src/${p.ref}.js\` et le SVG \`images/planche-${p.ref}-*.svg\` que le compositeur en tire. Lis la tête de \`.claude/skills/planches/scripts/composer-planche.js\` jusqu'à \`const fs = require('fs');\` : c'est le mode d'emploi. Lis la description existante, puis dans \`chapitres/${p.chapitre}\` seulement le passage corrigé.

Modifie la description avec Edit — ne la réécris pas —, recompose avec \`node .claude/skills/planches/scripts/composer-planche.js images/planches-src/${p.ref}.js\`, **ouvre le PNG avec Read et regarde**. Trois regards au plus. Le montage doit marcher pour vrai ; aucun chiffre qui ne soit pas dans le chapitre ; six renvois au plus par vue ; aucun mot sur le dessin sauf une cote. Ne touche qu'à cette description et au SVG qu'elle produit.`
}

const res = await pipeline(
  args,
  p => agent(promptChapitre(p), { label: `chapitre ${p.chapitre.slice(0, 2)}`, phase: 'Chapitre', schema: SCHEMA_CH })
    .then(r => ({ p, r }))
    .catch(e => ({ p, erreur: String(e) })),
  x => (x.r && x.r.plancheAChanger)
    ? agent(promptPlanche(x.p, x.r), { label: `planche ${x.p.ref}`, phase: 'Planche', schema: SCHEMA_PL })
        .then(pl => ({ ref: x.p.ref, chapitre: x.r, planche: pl }))
        .catch(e => ({ ref: x.p.ref, chapitre: x.r, erreurPlanche: String(e) }))
    : { ref: x.p.ref, chapitre: x.r, erreur: x.erreur }
)
return res
