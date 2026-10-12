export const meta = {
  name: 'nouveaux-chapitres-suite',
  description: "Leve les [A VERIFIER] des 10 chapitres ecrits le 27 septembre (recherche puis application), puis dessine leurs planches par lots de 10, sans relecture par agent",
  phases: [
    { title: 'Recherche', detail: 'un agent par groupe de chapitres, verdicts dans suivi/verifications' },
    { title: 'Application', detail: 'les verdicts appliques aux chapitres' },
    { title: 'Planches', detail: 'lots de 10 dessinateurs, un par planche (JP relit)' },
  ],
}

// JP, 27 septembre 2026 : levée des 47 [À VÉRIFIER] des chapitres 24, 28, 29, 34, 37, 38, 96 à 99, puis « les 91 » planches
// (89 : 98-11 va en photos, 38-03 la culasse est sautée). args = { groupes: [[fichier, …], …], planches: [{ ref, chapitre, profondeur }] }
const ROOT = 'C:\\Users\\jeanp\\New folder'
const FICHES = 'C:/Users/jeanp/AppData/Local/Temp/claude/C--Users-jeanp-New-folder/bed7cfe7-8639-429a-8cfe-5f58e5149259/scratchpad/fiches'
const BACK = 'C:\\Users\\jeanp\\AppData\\Local\\Temp\\claude\\C--Users-jeanp-New-folder\\bed7cfe7-8639-429a-8cfe-5f58e5149259\\scratchpad\\backup-test-mains'

const S_REC = { type: 'object', properties: { chapitres: { type: 'array', items: { type: 'object', properties: { fichier: { type: 'string' }, drapeaux: { type: 'number' }, leves: { type: 'number' }, corriges: { type: 'number' }, introuvables: { type: 'number' } }, required: ['fichier', 'drapeaux', 'leves', 'corriges', 'introuvables'] } } }, required: ['chapitres'] }
const S_APP = { type: 'object', properties: { chapitres: { type: 'array', items: { type: 'object', properties: { fichier: { type: 'string' }, appliques: { type: 'number' }, restants: { type: 'number' }, pourquoiRestants: { type: 'array', items: { type: 'string' } }, exemples: { type: 'array', items: { type: 'string' } } }, required: ['fichier', 'appliques', 'restants', 'pourquoiRestants', 'exemples'] } } }, required: ['chapitres'] }
const S1 = { type: 'object', properties: { fichiers: { type: 'array', items: { type: 'string' } }, ceQueJeVois: { type: 'string' }, cotes: { type: 'array', items: { type: 'string' } }, laisseDeCote: { type: 'array', items: { type: 'string' } } }, required: ['fichiers', 'ceQueJeVois', 'cotes', 'laisseDeCote'] }

const liste = g => g.map(f => '`chapitres/' + f + '`').join(', ')

const RECH = (g) => `Tu lèves les drapeaux \`[À VÉRIFIER]\` du « Grand Livre du Chalet », un manuel de survie pour une famille de la Côte-Nord. Projet : ${ROOT}. CLAUDE.md est dans ton contexte : la règle 1 (aucun chiffre inventé) est la tienne. Le livre est à JP, pour lui : **aucune relecture extérieure**, donc aucune recommandation « à faire vérifier par un spécialiste » — soit la source le dit, soit on le dit autrement, soit on coupe.

**Tes chapitres, écrits aujourd'hui :** ${liste(g)}. Leur fiche \`suivi/<NN>-redaction.md\` dit d'où vient chaque chiffre et donne souvent une piste pour chaque drapeau : lis-la d'abord.

**Tu ne modifies aucun chapitre.** Pour chaque chapitre, écris \`suivi/verifications/<NN>-verifications.md\` (NN = le numéro du chapitre), **au fur et à mesure** (une ligne ajoutée dès qu'un drapeau est réglé : une coupure ne doit coûter que le drapeau en cours), un tableau d'une ligne par drapeau :
- **où** : la section, et la phrase exacte qui porte le drapeau (assez de mots pour la retrouver) ;
- **verdict** : \`LEVÉ\` (la source confirme), \`CORRIGÉ\` (la source donne une autre valeur : les deux valeurs), ou \`INTROUVABLE\` ;
- **source** : le fichier que tu as enregistré dans sources/ (organisme, URL, consultée le 27 septembre 2026, extraits intégraux) — enregistre la page, pas juste le lien ;
- **à faire** : la phrase telle qu'elle doit devenir. Pour un INTROUVABLE : **dire la même chose sans le chiffre** quand le mécanisme suffit, ou **couper** la phrase si elle ne tient que par son chiffre. Pas de « à confirmer par un relecteur ».

Sources officielles d'abord (ministères, agences, OMS, universités), puis sources techniques sérieuses (manuels reconnus, revues). Pas de forum. Charge WebSearch et WebFetch avec ToolSearch (« select:WebSearch,WebFetch »). Regarde d'abord dans sources/ (préfixe du chapitre) : le rédacteur a déjà enregistré beaucoup de pages. Travaille économiquement.`

const APPL = (g) => `Tu travailles sur « Le Grand Livre du Chalet », un manuel de survie pour une famille de la Côte-Nord. Projet : ${ROOT}. **CLAUDE.md est dans ton contexte et prime sur tout** : aucune attribution de source dans le texte, aucun chiffre inventé, aucune mention de relecteur ou de relecture, ni loi ni municipalité, aucun numéro de téléphone ni service qui répond, un signe nommé s'explique en note de bas de page.

**Ta mission : appliquer aux chapitres les verdicts de la recherche à la source.** Le verdict de chaque drapeau \`[À VÉRIFIER]\` est dans \`suivi/verifications/<NN>-verifications.md\`. **Tes chapitres :** ${liste(g)}.

Pour chaque ligne :
- **LEVÉ** : retire le drapeau, garde la phrase.
- **CORRIGÉ** : mets la valeur de la source, ajuste la phrase au plus court ; vérifie qu'aucune autre phrase du chapitre ne s'appuyait sur l'ancienne valeur (un total, une conversion, un renvoi).
- **INTROUVABLE** : applique le « à faire ». Si la proposition retire quelque chose qui sauve une vie, garde le mécanisme et dis-le sans chiffre plutôt que de couper.

Marque chaque ligne appliquée au fur et à mesure (« ✔ appliqué » en fin de ligne, avec Edit) ; une ligne déjà marquée est faite. Corrige avec Edit, jamais en réécrivant le chapitre. Ne touche pas aux notes de bas de page sauf si la ligne le demande. Note la provenance à la fin de \`suivi/<NN>-redaction.md\`, section « Levée des [À VÉRIFIER] — 27 septembre 2026 ». Ne modifie aucun autre chapitre. À la fin, compte les \`[À VÉRIFIER]\` qui restent et dis pourquoi. Travaille économiquement (Grep puis Read avec offset/limit).`

const DESS = (p) => `Planche **${p.ref}** du « Grand Livre du Chalet », un manuel de survie pour une famille de la Côte-Nord (JP soude, câble du 12 V, abat un orignal, et va **bâtir ou faire** ce que montre la planche sans en avoir jamais vu). Projet : ${ROOT}. Chapitre : \`chapitres/${p.chapitre}\`. Fiche : \`${FICHES}/${p.ref}.md\`. Lis la tête de \`.claude/skills/planches/scripts/composer-planche.js\` (jusqu'à \`const fs = require('fs');\`), dans \`.claude/skills/planches/SKILL.md\` les sections « Avant tout » et « Le texte sur la planche », et **\`images/recommandations-planches.md\` en entier : ce sont les exigences de JP, elles priment**. Dans le chapitre, lis **seulement** les passages sur l'objet (Grep, puis Read avec offset/limit). Travaille économiquement : chaque tour relit tout ton contexte.

**Mains, personnages, corde et fil viennent de la bibliothèque** \`.claude/skills/planches/scripts/formes.js\` (sous \`h.formes\` : \`main\`, \`personnage\`, \`tete\`, \`buste\`, \`cordes\`, \`corde\`, \`aiguilleFilet\`, \`moule\`, \`maille\` ; lis les commentaires de tête de chaque fonction). Regarde sa feuille d'essai \`C:/Users/jeanp/AppData/Local/Temp/claude/C--Users-jeanp-New-folder/bed7cfe7-8639-429a-8cfe-5f58e5149259/scratchpad/_formes-essai-mains.png\` avant de dessiner une main. Ses points faibles : la prise vue de profil (un bloc) et la pince sur un fil ; préfère la prise vue de dos ou de la paume, et ne dessine à la main que les objets.

**Dessine-la.** Une planche montre comment fabriquer ou faire la chose. ${p.profondeur ? "C'est une construction ou une coupe : **en profondeur**, deux à quatre vues alignées entre elles comme un vrai dessin technique ; une coupe en couches se lit couche par couche ; deux pages (a et b) si une ne suffit pas." : 'Le format suit le contenu.'} **Cotes en mm sur ce qu'on construit**, seulement celles que le chapitre donne. Aucun chiffre qui ne soit pas dans le chapitre ; rien de marqué [À VÉRIFIER]. Six renvois au plus par vue ; aucun mot sur le dessin sauf une cote. Écris \`images/planches-src/${p.ref}.js\` (s'il existe déjà, copie-le d'abord dans \`${BACK}\\\`), compose avec \`--zones\` puis sans, **ouvre le PNG et regarde**, quatre fois au plus.

**Il n'y aura pas de relecteur après toi : JP relit lui-même.** Avant de rendre, vérifie que **le montage marcherait pour vrai** (suis l'eau, la chaleur, l'air, la corde, la charge), que chaque objet se reconnaît sans la légende, qu'un corps humain a des proportions justes et qu'un geste fin se suit sans ambiguïté. Ne touche qu'à ta description et au SVG qu'elle produit.`

// 1. Levée des [À VÉRIFIER] : recherche puis application, groupe par groupe, en pipeline.
phase('Recherche')
const levee = await pipeline(
  args.groupes,
  g => agent(RECH(g), { label: `recherche ${g.map(f => f.split('-')[0]).join(' ')}`, phase: 'Recherche', schema: S_REC }).then(r => ({ g, r })).catch(e => ({ g, r: { erreur: String(e) } })),
  x => agent(APPL(x.g), { label: `appliquer ${x.g.map(f => f.split('-')[0]).join(' ')}`, phase: 'Application', schema: S_APP }).then(a => ({ groupe: x.g, recherche: x.r, application: a })).catch(e => ({ groupe: x.g, recherche: x.r, erreur: String(e) }))
)

// 2. Les planches, une fois les chapitres corrigés, par lots de 10.
phase('Planches')
const LOT = 10
const res = []
for (let i = 0; i < args.planches.length; i += LOT) {
  const lot = args.planches.slice(i, i + LOT)
  const r = await parallel(lot.map(p => () =>
    agent(DESS(p), { label: `dessin ${p.ref}`, phase: 'Planches', schema: S1 })
      .then(d => d ? { ref: p.ref, ...d } : { ref: p.ref, erreur: 'dessin sans résultat' })
      .catch(e => ({ ref: p.ref, erreur: String(e) }))
  ))
  res.push(...r)
}
return { levee, planches: res }
