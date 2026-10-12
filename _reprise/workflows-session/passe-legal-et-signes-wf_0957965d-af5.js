export const meta = {
  name: 'passe-legal-et-signes',
  description: 'Retire municipalite et code legal, explique en note de bas de page chaque signe nomme mais jamais decrit, et regle les hesitations de la passe paperasse',
  phases: [{ title: 'Chapitres', detail: 'un agent par groupe de chapitres' }],
}

const S = { type: 'object', properties: { chapitres: { type: 'array', items: { type: 'object', properties: { fichier: { type: 'string' }, legalRetire: { type: 'array', items: { type: 'string' } }, notesAjoutees: { type: 'array', items: { type: 'string' }, description: 'le signe et la note, en quelques mots' }, doutesRegles: { type: 'number' }, sources: { type: 'array', items: { type: 'string' } } }, required: ['fichier', 'legalRetire', 'notesAjoutees', 'doutesRegles', 'sources'] } } }, required: ['chapitres'] }

const P = (g) => `Tu fais une passe sur ${g.length > 1 ? 'des chapitres' : 'un chapitre'} du « Grand Livre du Chalet », un manuel de survie pour une famille de la Côte-Nord. Projet : C:\\Users\\jeanp\\New folder. CLAUDE.md est dans ton contexte ; il vient de gagner des règles dans « Ce qui ne s'imprime pas » : lis-les. **Tes chapitres :** ${g.map(f => '`chapitres/' + f + '`').join(', ')}. Ne touche à aucun autre chapitre.

**1. Pas de municipalité, pas de code légal.** JP : « je veux pas de phrase de municipalité, de code légal ». Retire toute phrase sur un règlement municipal, une loi, un code (du bâtiment, criminel, civil…), une norme de construction, un permis, une obligation légale, une amende, ce que « la réglementation exige » ou « interdit ». Si la règle protégeait un **mécanisme** réel (un dégagement autour d'un poêle, parce que le mur prend feu), garde le mécanisme, dit comme un fait, sans la règle. Un **service qu'on appelle vraiment** (le 911, la ligne de pannes, le Centre antipoison) n'est pas du code légal : il reste.

**2. Un signe nommé s'explique en bas de page.** JP : « si un signe est mentionné, il faut l'expliquer en bas de page si on l'a jamais nommé ». Quand le texte nomme un signe, un symptôme, un repère ou un état que le lecteur ne peut pas reconnaître sans description (« signe du pli cutané », « muqueuses cyanosées », « viande poisseuse », « glace pourrie », « tirage inversé »…), et que le chapitre ne l'a pas décrit avant, ajoute une **note de bas de page** Markdown : \`[^n]\` dans le texte, \`[^n]: …\` en fin de section. La note dit à quoi ça ressemble, comment on le voit, le sent ou le teste, en une ou deux phrases. **Elle se source** comme tout le reste : cherche (ToolSearch « select:WebSearch,WebFetch »), enregistre la page dans sources/, note la provenance à la fin de suivi/NN-redaction.md ; ce qui ne se trouve pas porte [À VÉRIFIER]. Pas de note pour ce qu'un homme qui chasse, soude et élève deux enfants reconnaît déjà (une fièvre, une brûlure, de la fumée).

**3. Les hésitations de la passe paperasse.** Dans \`suivi/doutes-passe-paperasse.md\`, les lignes qui commencent par le numéro de tes chapitres : applique les points 1 et 2 à celles qui concernent du légal, du municipal ou un signe non expliqué ; laisse les autres telles quelles.

Corrige avec Edit, sans réécrire le chapitre. Aucun chiffre inventé, aucune attribution de source dans le texte, ton du livre. Travaille économiquement : lis chaque chapitre une fois, repère tout, puis corrige.`

return await parallel(args.map(g => () =>
  agent(P(g), { label: `légal et signes ${g.map(f => f.slice(0, 3).replace('-', '')).join(' ')}`, phase: 'Chapitres', schema: S })
    .catch(e => ({ erreur: String(e), groupe: g }))
))
