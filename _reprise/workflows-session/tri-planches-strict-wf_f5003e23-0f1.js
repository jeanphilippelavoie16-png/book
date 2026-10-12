export const meta = {
  name: 'tri-planches-strict',
  description: 'Passe les 802 images du livre au test strict du skill planches : une phrase suffit-elle, et est-ce un objet ou une donnee',
  phases: [
    { title: 'Tri', detail: 'huit agents, chacun un bloc de chapitres, verdict par image' },
  ],
}

const L = args

const SCHEMA = {
  type: 'object',
  properties: {
    fichier: { type: 'string' },
    imagesExaminees: { type: 'number' },
    garder: { type: 'number' },
    texte: { type: 'number' },
    commande: { type: 'number' },
    fusionner: { type: 'number' },
    lesGardees: {
      type: 'array',
      description: 'une entree par planche retenue, dans l ordre d utilite',
      items: {
        type: 'object',
        properties: {
          ref: { type: 'string', description: 'chapitre et numero, ex 86-01' },
          sujet: { type: 'string' },
          justification: { type: 'string', description: 'topologie, cache, forme a egaler, gabarit ou comparaison' },
          pourquoiPasUnePhrase: { type: 'string', description: 'la phrase que tu as essayee, et ce qui lui manque' },
          type: { type: 'string' },
          format: { type: 'string' },
          renvoisPrevus: { type: 'number', description: 'six au maximum' },
        },
        required: ['ref', 'sujet', 'justification', 'pourquoiPasUnePhrase', 'type'],
      },
    },
    phrasesQuiRemplacent: {
      type: 'array',
      description: 'pour les images devenues du texte : la phrase exacte a mettre dans le chapitre',
      items: {
        type: 'object',
        properties: { ref: { type: 'string' }, phrase: { type: 'string' } },
        required: ['ref', 'phrase'],
      },
    },
    constats: { type: 'array', items: { type: 'string' } },
  },
  required: ['fichier', 'imagesExaminees', 'garder', 'texte', 'commande', 'fusionner', 'lesGardees'],
}

phase('Tri')
log(`${L.length} lots. Le test : une planche montre un objet ou un geste, jamais une donnee — et si une phrase suffit, il n'y a pas de planche.`)

const results = await parallel(
  L.map(l => () =>
    agent(
      `Tu tries des images du "Grand Livre du Chalet" pour decider lesquelles meritent d'etre dessinees.
CLAUDE.md t'est deja injecte.

=== LIS LE SKILL D'ABORD ===
.claude/skills/planches/SKILL.md — en entier. Les deux premieres sections portent tout le
travail que tu fais aujourd'hui.

=== TON LOT ===
Chapitres ${l.de} a ${l.a}. Les images voulues sont decrites dans images/credits.md et,
en detail, dans les fiches suivi/NN-redaction.md. Lis aussi les chapitres eux-memes quand
le doute porte sur ce que l'image devrait montrer.

=== LE TEST, DANS CET ORDRE ===

**1. Une planche montre un objet ou un geste. Jamais une donnee.**
Demande-toi : est-ce que je pourrais le fabriquer, le tenir dans mes mains, ou le faire
avec mon corps ? Un fumoir, oui. Un mouflage, oui. Un angle de lime, oui. Une echelle de
tailles, une courbe, un classement, une frise de durees : non — personne ne tient un
micrometre. Ca se met en tableau ou en phrase.

**2. Ecris la phrase que la planche remplacerait.**
Si la phrase suffit, il n'y a pas de planche. Une distance, un degagement, un seuil, une
duree, une regle, un interdit : tout ca s'ecrit. « La generatrice va dehors, a 6 m des
ouvertures, jamais sous un auvent » est complet, et le dessin qui l'illustre vole une
demi-page.
Quand tu tranches pour le texte, DONNE LA PHRASE. Elle ira dans le chapitre.

**3. Ai-je le droit de dessiner ca ?**
Geometrie, logique, convention : oui. Observation du reel que personne n'a faite —
anatomie, espece, nervation, lames de champignon, grain d'ecorce : non. Ces images-la ne
se coupent pas, elles se COMMANDENT a un illustrateur.

**4. Est-ce que six renvois suffisent ?**
Passe six, la legende devient un paragraphe et le lecteur doit lire un pave pour decoder
l'image. Si le sujet en demande douze, soit tu scindes en deux planches, soit c'etait du
texte depuis le debut. Dis-le.

**5. Est-ce que ca fait doublon ?**
Le meme thermometre a 74 °C, la meme generatrice, le meme etalement a plat reviennent
dans plusieurs chapitres. Une planche mere sert partout. Signale les fusions.

=== CE QU'ON ATTEND DE TOI ===
Sois DUR. Le lot precedent a perdu trois planches sur dix a ce test, et elles avaient ete
choisies par quelqu'un qui croyait bien faire. Une planche qui survit doit avoir une
raison qu'on peut dire en une phrase, et cette raison ne peut pas etre « ca illustre bien
le chapitre ».

Le lecteur est un homme qui sait souder, cabler du 12 V et abattre un orignal. Lui dessiner
ce qu'il devine lui dit qu'on le prend pour un imbecile, et il cesse de regarder les
planches — y compris celles dont il aurait eu besoin. C'est le vrai cout d'une planche
inutile : pas la demi-page, la credibilite.

Ecris ton rapport dans ${l.out}, avec quatre sections : les planches gardees (dans l'ordre
d'utilite, avec pour chacune le type, le format, le nombre de renvois prevus et la raison),
les images devenues du texte avec leur phrase de remplacement, les images a commander a un
illustrateur, et les fusions proposees.`,
      { label: `tri ch.${l.de}-${l.a}`, phase: 'Tri', schema: SCHEMA }
    )
  )
)

const ok = results.filter(Boolean).length
log(`${ok}/${L.length} lots tries`)

return L.map((l, i) => ({ lot: `${l.de}-${l.a}`, r: results[i] || null }))
