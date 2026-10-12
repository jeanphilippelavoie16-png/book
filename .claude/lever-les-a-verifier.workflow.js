export const meta = {
  name: 'lever-les-a-verifier',
  description: 'Recherche a la source de chaque [A VERIFIER] des chapitres existants ; resultats par chapitre dans suivi/verifications, sans toucher aux chapitres',
  phases: [{ title: 'Recherche', detail: 'un agent par groupe de chapitres, recherche seulement' }],
}
const S = { type: 'object', properties: { chapitres: { type: 'array', items: { type: 'object', properties: { fichier: { type: 'string' }, rapport: { type: 'string' }, drapeaux: { type: 'number' }, leves: { type: 'number' }, corriges: { type: 'number', description: 'la source donne une autre valeur que le texte' }, introuvables: { type: 'number' } }, required: ['fichier', 'rapport', 'drapeaux', 'leves', 'corriges', 'introuvables'] } } }, required: ['chapitres'] }

const P = (g) => `Tu lèves les drapeaux \`[À VÉRIFIER]\` du « Grand Livre du Chalet », un manuel de survie pour une famille de la Côte-Nord. Projet : C:\\Users\\jeanp\\New folder. CLAUDE.md est dans ton contexte : la règle 1 (aucun chiffre inventé) est la tienne. Le livre est à JP, pour lui : **aucune relecture extérieure**, donc aucune recommandation « à faire vérifier par un spécialiste » — soit la source le dit, soit on le dit autrement, soit on coupe.

**Tes chapitres :** ${g.map(f => '`chapitres/' + f + '`').join(', ')}.

**Reprise après une coupure.** Un premier passage, hier soir, a été coupé net : presque tout son travail est perdu parce qu'il n'écrivait qu'à la fin. Deux conséquences :
- **Écris au fur et à mesure.** Crée le fichier du chapitre dès son premier drapeau réglé, et ajoute-lui une ligne chaque fois que tu en règles une (Edit ou Write). Une coupure ne doit coûter que le drapeau en cours.
- **Ne refais pas ce qui existe.** Si \`suivi/verifications/<NN>-verifications.md\` existe déjà, lis-le : les drapeaux qui y sont sont faits, reprends aux suivants. Et avant de chercher sur le web, regarde dans sources/ (les fiches récentes, par numéro de chapitre) : le premier passage en a enregistré.

**Tu ne modifies aucun chapitre.** Tes résultats seront appliqués ensuite. Pour chaque chapitre, écris \`suivi/verifications/<NN>-verifications.md\` (NN = le numéro du chapitre), un tableau d'une ligne par drapeau :
- **où** : la section, et la phrase exacte qui porte le drapeau (assez de mots pour la retrouver) ;
- **verdict** : \`LEVÉ\` (la source confirme la valeur du texte), \`CORRIGÉ\` (la source donne une autre valeur : les deux valeurs), ou \`INTROUVABLE\` ;
- **source** : le fichier que tu as enregistré dans sources/ (au format des autres fiches : organisme, URL, consultée le 24 septembre 2026, extraits intégraux) — enregistre la page, pas juste le lien ;
- **à faire** : la phrase telle qu'elle doit devenir. Pour un INTROUVABLE, propose soit de **dire la même chose sans le chiffre** (« quelques heures » au lieu de « 6 à 8 h » quand le mécanisme suffit), soit de **couper** la phrase si elle ne tient que par son chiffre. Pas de « à confirmer par un relecteur ».

Cherche d'abord les sources officielles (ministères, agences, universités, fabricants pour un appareil), puis les sources techniques sérieuses (fédérations, manuels reconnus). Pas de forum. Charge WebSearch et WebFetch avec ToolSearch (« select:WebSearch,WebFetch »). Beaucoup de drapeaux se ressemblent d'un chapitre à l'autre : une source trouvée sert plusieurs lignes. Travaille économiquement.`

return await parallel(args.map(g => () =>
  agent(P(g), { label: `vérif ${g.map(f => f.split('-')[0]).join(' ')}`, phase: 'Recherche', schema: S }).catch(e => ({ erreur: String(e), groupe: g }))
))
