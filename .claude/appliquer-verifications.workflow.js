export const meta = {
  name: 'appliquer-verifications',
  description: 'Applique aux chapitres les verdicts de suivi/verifications (leve, corrige, introuvable) : un agent par groupe de chapitres',
  phases: [{ title: 'Application', detail: 'un agent par groupe, chaque ligne marquee appliquee au fur et a mesure' }],
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
          appliques: { type: 'number' },
          restants: { type: 'number', description: '[À VÉRIFIER] encore dans le chapitre apres application' },
          pourquoiRestants: { type: 'array', items: { type: 'string' } },
          exemples: { type: 'array', items: { type: 'string' }, description: 'deux ou trois avant -> apres parlants' },
        },
        required: ['fichier', 'appliques', 'restants', 'pourquoiRestants', 'exemples'],
      },
    },
  },
  required: ['chapitres'],
}

const P = (g) => `Tu travailles sur « Le Grand Livre du Chalet », un manuel de survie pour une famille de la Côte-Nord. Projet : C:\\Users\\jeanp\\New folder. **CLAUDE.md est dans ton contexte et prime sur tout** : aucune attribution de source dans le texte, aucun chiffre inventé, aucune mention de relecteur ou de relecture, ni loi ni municipalité, un signe nommé s'explique en note de bas de page.

**Ta mission : appliquer aux chapitres les verdicts de la recherche à la source.** Chaque drapeau \`[À VÉRIFIER]\` des chapitres a été cherché, et le verdict est dans \`suivi/verifications/<NN>-verifications.md\` (NN = le numéro du chapitre), une ligne par drapeau avec la phrase, le verdict, la source et « à faire ».

**Tes chapitres :** ${g.map(f => '`chapitres/' + f + '`').join(', ')}.

Pour chaque ligne du fichier de vérifications :
- **LEVÉ** : la source confirme. Retire le drapeau, garde la phrase.
- **CORRIGÉ** : la source donne une autre valeur. Mets la valeur de la source et ajuste la phrase au plus court ; vérifie qu'aucune autre phrase du même chapitre ne s'appuyait sur l'ancienne valeur (un total, une conversion, un renvoi).
- **INTROUVABLE** : applique le « à faire » : la même chose dite sans le chiffre, ou la phrase coupée. Si la proposition te semble fausse ou retirer quelque chose qui sauve une vie, garde le mécanisme et dis-le sans chiffre plutôt que de couper.

Règles :
- **Marque chaque ligne appliquée au fur et à mesure** dans le fichier de vérifications (ajoute « ✔ appliqué » en fin de ligne, avec Edit). Si une ligne porte déjà « ✔ appliqué », elle est faite : passe. Une coupure ne doit coûter que la ligne en cours.
- Corrige avec Edit, jamais en réécrivant le chapitre. Ne touche ni aux notes de bas de page (\`[^n]\`) ni aux renvois de planches, sauf si la ligne le demande.
- Note la provenance à la fin de \`suivi/<NN>-redaction.md\`, dans une section « Levée des [À VÉRIFIER] — 24 septembre 2026 » : une ligne par chiffre changé ou confirmé, avec le fichier de sources/.
- Deux décisions déjà prises, à appliquer partout où elles se présentent dans tes chapitres : le **mal de caribou** tue « en quelques semaines » (pas « 2 à 3 semaines ») ; l'**essai de la gomme d'épinette** suit le ch. 20c (la languette fend → trop cassante, ajouter du gras ; elle colle → ajouter de la gomme ou recuire).
- Ne modifie aucun autre chapitre que les tiens : ce qui cloche ailleurs va dans ta réponse.
- À la fin, compte les \`[À VÉRIFIER]\` qui restent dans chaque chapitre et dis pourquoi ils restent (le verdict n'en parlait pas, drapeau ajouté après la recherche, etc.).

Travaille économiquement : lis le fichier de vérifications en entier, puis dans le chapitre seulement les passages visés (Grep puis Read avec offset/limit).`

return await parallel(args.map(g => () =>
  agent(P(g), { label: `appliquer ${g.map(f => f.split('-')[0]).join(' ')}`, phase: 'Application', schema: S })
    .catch(e => ({ erreur: String(e), groupe: g }))
))
