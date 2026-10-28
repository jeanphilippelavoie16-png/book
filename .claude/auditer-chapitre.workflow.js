export const meta = {
  name: 'auditer-chapitre',
  description: "Les auditeurs d'un chapitre : A0 passe controle.py, tempo.py et langue.py et rend ses signaux par paragraphe, puis A1 (l'oreille), A2 (le lecteur naif) et A3 (les consignes) lisent en meme temps ; rend les quatre rapports pour l'editeur",
  whenToUse: "Apres le verificateur technique et avant l'editeur, un chapitre a la fois. args = { chapitre: 'chapitres/NN-titre-court.md' }",
  phases: [
    { title: 'Scripts', detail: 'A0 : controle.py, tempo.py et langue.py, les signaux par paragraphe' },
    { title: 'Auditeurs', detail: "A1, A2 et A3 en meme temps, sans voir le travail des autres" },
  ],
}

// Les auditeurs (decisions 1 et 3 de JP, 28 octobre 2026, plan/decisions-jp.md, « Les bases de l'écriture, après
// l'audit »). Leurs fiches sont dans .claude/skills/ecriture/references/auditeurs.md, et la chaîne dans roles.md.
//
// A0 passe les scripts et ne juge rien. A1 et A3 lisent « Pour tout agent » et « Les auditeurs » du cadre, puis leur
// fiche, avec les signaux de A0. A2 part en agent Explore, qui ne reçoit pas CLAUDE.md : il n'a que sa fiche et le
// chapitre, sans les signaux de A0, pour rester naïf.
//
// FICHE_A2 est la copie exacte du bloc de la fiche A2 dans auditeurs.md. On change les deux ensemble.
//
// args = { chapitre: 'chapitres/NN-titre-court.md' } (une page des dangers, 'dangers/partie-N.md', marche aussi).
// Le workflow rend { chapitre, A0, A1, A2, A3 } ; l'orchestrateur colle les quatre rapports dans
// suivi/NN-auditeurs.md pour l'éditeur (roles.md, rôle 5).

const chapitre = (typeof args === 'string' ? args : (args && args.chapitre)) || ''
if (!/^(chapitres\/[0-9]{2,3}-[^/]+|dangers\/[^/]+)\.md$/.test(chapitre)) {
  throw new Error("args = { chapitre: 'chapitres/NN-titre-court.md' } ; reçu : " + JSON.stringify(args))
}
const nn = chapitre.startsWith('chapitres/') ? chapitre.split('/')[1].split('-')[0] : ''
const LOGIGRAMME = nn
  ? `Son logigramme, s'il existe, est images/logigrammes/${nn}-*.json (cherche-le avec Glob).`
  : "Une page des dangers n'a pas de logigramme."

const FICHE_A2 = `Vous êtes un parent de jeunes enfants. Vous savez souder, câbler du 12 V et abattre un orignal, mais vous n'avez
jamais fait ce que ce chapitre explique. Le chapitre vient d'un livre pratique pour une famille de la Côte-Nord, qui
doit se débrouiller seule après une catastrophe, sans personne à appeler. On veut savoir si vous le comprenez du
premier coup. On ne vous demande pas si vous l'aimez.

Ce que vous lisez. Lisez seulement le fichier du chapitre, une fois, du début à la fin et dans l'ordre. Lisez chaque
paragraphe en entier avant de juger une de ses phrases. N'ouvrez aucun autre fichier et ne cherchez rien ailleurs,
parce que la personne qui tient le livre n'a que la page devant elle.

Quelques marques du fichier ne sont pas du texte, alors ne les signalez pas. Un pictogramme comme {!co} est imprimé en
gros à cet endroit, et il renvoie à une page des dangers, au début du tome, que vous n'avez pas. « (planche 03-12) »
appelle un dessin imprimé à côté, que vous ne voyez pas ; supposez qu'il montre l'objet et le geste, et signalez
seulement ce que le texte vous laisse deviner. [^1] appelle une note en bas de page. Un titre qui finit par
{.orange 15 min} ouvre la série des premières minutes, imprimée en orange pour qu'on la trouve vite, et « 15 min » est
le temps qu'on a pour la faire.

Vos questions. Posez-les-vous en lisant.
1. Après chaque étape, qu'est-ce que vous feriez, dans l'ordre ?
2. Quel mot, quelle notion ou quel signe avez-vous dû deviner ?
3. Où avez-vous dû chercher de quoi parlent « il », « son » ou « ce » ?
4. Quelle chose préparée d'avance est utilisée sans être expliquée ?
5. Quelle phrase ne vous apprend rien que vous ne saviez déjà ?
6. Quelle phrase avez-vous relue deux fois ?
7. Quelle phrase pourriez-vous comprendre à l'envers, et qu'est-ce que vous auriez fait alors ?

La question 7 compte plus que les autres. Une phrase qu'on comprend du premier coup, mais à l'envers, est la pire,
parce qu'on agit dessus sans douter.

Ce que vous ne faites pas. Vous ne jugez ni le style ni les fautes, et vous ne corrigez rien. Vous n'ajoutez aucun
fait. Si vous doutez qu'un fait soit vrai, ne le vérifiez pas, et dites seulement ce que vous auriez fait en le
lisant.

Votre rapport. Pour chaque endroit où vous avez accroché, donnez :
- la ligne du fichier, ou la liste des lignes quand la même chose revient ;
- une citation de douze mots au plus ;
- le numéro de la question (1 à 7) ;
- ce qui vous a fait accrocher, en une phrase ;
- ce que vous auriez fait, ou compris, en lisant la phrase ;
- si vous en avez une, une façon de le dire que vous auriez comprise du premier coup.

Quand la même chose revient, dites-la une fois avec la liste des lignes. Rendez dix accrocs au plus, en commençant par
ceux qui vous auraient fait rater un geste, puis ceux qui vous ont fait relire. S'il y en a plus de dix, dites combien
vous en laissez. S'il y en a trois, rendez-en trois.`

// ------------------------------------------------------------------ les schémas

const ACCROC = {
  type: 'object',
  properties: {
    lignes: { type: 'array', items: { type: 'integer' }, minItems: 1, description: 'la ligne du fichier, ou toutes les lignes quand le même défaut revient' },
    citation: { type: 'string', description: 'douze mots au plus, tirés de la première ligne' },
    accroche: { type: 'string', description: 'ce qui accroche, en une phrase' },
    principe: { type: 'string', description: 'le numéro du principe du skill ecriture, P1 à P14 (« P5, P6 » ; ajouter « décision N » au besoin)' },
    proposition: { type: 'string', description: 'une façon de le dire en une phrase, ou une chaîne vide' },
  },
  required: ['lignes', 'citation', 'accroche', 'principe', 'proposition'],
}

const S_A0 = {
  type: 'object',
  properties: {
    bloquants: {
      type: 'array',
      description: 'ce qui fait finir controle.py avec le code 1 (tiret, mots bannis, normes, services, attributions, noms latins, forme du chapitre, ancres de planches…)',
      items: { type: 'object', properties: { ligne: { type: 'integer' }, quoi: { type: 'string' } }, required: ['ligne', 'quoi'] },
    },
    signaux: {
      type: 'array',
      description: 'seulement les paragraphes qui lèvent un signal (bases.md, section 6, colonne « Signal »), dans l’ordre du fichier',
      items: {
        type: 'object',
        properties: {
          ligne: { type: 'integer', description: 'la ligne où le paragraphe commence' },
          sorte: { type: 'string', enum: ['prose', 'etape', 'puce'] },
          debut: { type: 'string', description: 'ses douze premiers mots' },
          signaux: { type: 'array', items: { type: 'string' }, description: 'chaque signal avec sa mesure (« deux fait : conséquence de suite », « 5 phrases sans mot de liaison », « phrase de 46 mots »)' },
        },
        required: ['ligne', 'sorte', 'debut', 'signaux'],
      },
    },
    a_juger: { type: 'array', items: { type: 'string' }, description: 'ce que controle.py donne à juger : une entrée par catégorie, avec ses numéros de ligne' },
    langue: {
      type: 'array',
      items: { type: 'object', properties: { ou: { type: 'string', description: '« l. 42 », ou la case du logigramme' }, avis: { type: 'string' } }, required: ['ou', 'avis'] },
    },
    chapitre_entier: { type: 'string', description: 'les mesures de tempo.py sur le texte entier, prose, étapes et puces à part, et les signaux qui valent pour une section ou le chapitre' },
    notes: { type: 'string', description: 'ce qui n’a pas pu tourner (LanguageTool absent, script en erreur), ou une chaîne vide' },
  },
  required: ['bloquants', 'signaux', 'a_juger', 'langue', 'chapitre_entier', 'notes'],
}

const S_A1 = {
  type: 'object',
  properties: {
    accrocs: { type: 'array', maxItems: 10, items: ACCROC, description: 'dix au plus, les plus coûteux d’abord' },
    laisses: { type: 'integer', description: 'combien d’accrocs laissés au-delà de dix (0 sinon)' },
    liste_de_controle: { type: 'string', description: 'la liste de contrôle de la section « Les auditeurs » du cadre, cochée' },
  },
  required: ['accrocs', 'laisses', 'liste_de_controle'],
}

const S_A3 = {
  type: 'object',
  properties: {
    accrocs: { type: 'array', maxItems: 10, items: ACCROC, description: 'dix au plus, les plus coûteux d’abord' },
    laisses: { type: 'integer', description: 'combien d’accrocs laissés au-delà de dix (0 sinon)' },
    pour_le_verificateur: { type: 'array', items: { type: 'string' }, description: 'les doutes de fond, médicaux ou techniques, avec leur ligne ; jamais dans les accrocs' },
    liste_de_controle: { type: 'string', description: 'la liste de contrôle de la section « Les auditeurs » du cadre, cochée' },
  },
  required: ['accrocs', 'laisses', 'pour_le_verificateur', 'liste_de_controle'],
}

const S_A2 = {
  type: 'object',
  properties: {
    accrocs: {
      type: 'array',
      maxItems: 10,
      description: 'dix au plus, ceux qui feraient rater un geste d’abord',
      items: {
        type: 'object',
        properties: {
          lignes: { type: 'array', items: { type: 'integer' }, minItems: 1, description: 'la ligne du fichier, ou toutes les lignes quand la même chose revient' },
          citation: { type: 'string', description: 'douze mots au plus' },
          question: { type: 'integer', minimum: 1, maximum: 7, description: 'le numéro de la question de votre fiche' },
          accroche: { type: 'string', description: 'ce qui vous a fait accrocher, en une phrase' },
          ce_que_je_ferais: { type: 'string', description: 'ce que vous auriez fait, ou compris, en lisant la phrase' },
          proposition: { type: 'string', description: 'une façon de le dire que vous auriez comprise du premier coup, ou une chaîne vide' },
        },
        required: ['lignes', 'citation', 'question', 'accroche', 'ce_que_je_ferais', 'proposition'],
      },
    },
    laisses: { type: 'integer', description: 'combien d’accrocs laissés au-delà de dix (0 sinon)' },
  },
  required: ['accrocs', 'laisses'],
}

// ------------------------------------------------------------------ les prompts

const PROMPT_A0 = `Tu es A0, les scripts, sur « Le Manuel du Nord ». Tu travailles à la racine du dépôt.

Lis dans .claude/cadre-agents.md la partie « Pour tout agent », puis, dans .claude/skills/ecriture/references/auditeurs.md, la fiche « A0, les scripts ». Tu ne lis rien d'autre du skill.

Le texte est ${chapitre}. ${LOGIGRAMME}

Tu passes les trois scripts de ta fiche. Tu ne corriges rien, tu ne juges rien, et tu ne modifies aucun fichier du dépôt : ce que tu écris pour mesurer va dans ton répertoire temporaire.

1. python3 .claude/skills/ecriture/scripts/controle.py ${chapitre}
   Ce qu'il compte comme grave va dans « bloquants », avec la ligne. Ce qu'il donne à juger va dans « a_juger », une entrée par catégorie avec ses numéros de ligne.
2. python3 .claude/skills/ecriture/scripts/tempo.py ${chapitre}
   Il donne le tableau des mesures (le texte entier, puis la prose, les étapes et les puces à part), puis « paragraphes à relire d'abord », chacun avec sa ligne, ses premiers mots et ses signaux, puis les signaux de section et de chapitre. Les paragraphes vont dans « signaux », avec la sorte que le script leur donne (prose, etape ou puce, écrit sans accent). Le tableau et les signaux de section et de chapitre vont dans « chapitre_entier ». Les seuils sont ceux du script ; tu n'en ajoutes aucun.
3. python3 .claude/skills/langue/scripts/langue.py ${chapitre}, et sur le logigramme s'il existe, avec LanguageTool. S'il dit « LanguageTool absent », installe-le (pip install language-tool-python). Si ça ne marche toujours pas, relance avec --sans-lt et dis-le dans « notes ».

Coupe les sorties avec head ou grep, parce qu'un long journal reste dans ton contexte.`

function signauxPour(a0) {
  if (!a0) return "A0 n'a rien rendu. Lis le chapitre en entier, dans l'ordre."
  return JSON.stringify({ bloquants: a0.bloquants, signaux: a0.signaux, a_juger: a0.a_juger, chapitre_entier: a0.chapitre_entier }, null, 1)
}

const PROMPT_A1 = (a0) => `Tu es A1, l'oreille, sur « Le Manuel du Nord ». Tu n'as pas écrit ce texte, et tu ne le réécris pas : tu ne modifies aucun fichier.

Lis, dans cet ordre :
1. dans .claude/cadre-agents.md, la partie « Pour tout agent » et la section « Les auditeurs » ;
2. dans .claude/skills/ecriture/references/auditeurs.md, la section « Ce qui vaut pour tous » et ta fiche « A1, l'oreille » ;
3. la liste d'écoute, .claude/skills/ecriture/references/mots.md ;
4. le diapason, dans dangers/partie-1.md, la page « Monoxyde de carbone », le paragraphe « Ce qui arrive » ;
5. le texte, ${chapitre}, en commençant par les paragraphes que A0 désigne.

Les signaux de A0 disent où regarder d'abord, jamais quoi écrire :
${signauxPour(a0)}

Rends tes accrocs au format de ta fiche, dix au plus, les plus coûteux d'abord, et la liste de contrôle de la section « Les auditeurs » du cadre, cochée.`

const PROMPT_A3 = (a0) => `Tu es A3, les consignes, sur « Le Manuel du Nord ». Tu n'as pas écrit ce texte, et tu ne le réécris pas : tu ne modifies aucun fichier.

Lis, dans cet ordre :
1. dans .claude/cadre-agents.md, la partie « Pour tout agent » et la section « Les auditeurs » ;
2. dans .claude/skills/ecriture/references/auditeurs.md, la section « Ce qui vaut pour tous » et ta fiche « A3, les consignes » ;
3. le diapason, dans dangers/partie-1.md, la page « Monoxyde de carbone », le paragraphe « Ce qui arrive » ;
4. le texte, ${chapitre}, avec ses étapes, ses séries orange, son Matériel et ses tableaux. ${LOGIGRAMME}

Les signaux de A0 disent où regarder d'abord, jamais quoi écrire :
${signauxPour(a0)}

Rends tes accrocs au format de ta fiche, dix au plus, les plus coûteux d'abord. Tes doutes de fond, médicaux ou techniques, vont dans « pour_le_verificateur », jamais dans les accrocs. Rends aussi la liste de contrôle de la section « Les auditeurs » du cadre, cochée.`

const PROMPT_A2 = `${FICHE_A2}

Le chapitre est le fichier ${chapitre}. Lisez seulement ce fichier.`

// ------------------------------------------------------------------ la passe

phase('Scripts')
const a0 = await agent(PROMPT_A0, { label: 'A0 les scripts', phase: 'Scripts', schema: S_A0, effort: 'low' })
  .catch(e => { log('A0 en erreur : ' + String(e)); return null })
if (a0) {
  log(`A0 : ${a0.bloquants.length} bloquant(s), ${a0.signaux.length} paragraphe(s) à signal, ${a0.langue.length} avis de langue`)
  if (a0.bloquants.length) log("Le texte a encore des bloquants : le rédacteur devait le rendre sans bloquant. Les auditeurs lisent quand même.")
} else {
  log("A0 n'a rien rendu : A1 et A3 liront le texte en entier, sans signaux.")
}

phase('Auditeurs')
const [a1, a2, a3] = await parallel([
  () => agent(PROMPT_A1(a0), { label: 'A1 l oreille', phase: 'Auditeurs', schema: S_A1 }),
  () => agent(PROMPT_A2, { label: 'A2 lecteur naif', phase: 'Auditeurs', schema: S_A2, agentType: 'Explore' }),
  () => agent(PROMPT_A3(a0), { label: 'A3 les consignes', phase: 'Auditeurs', schema: S_A3 }),
])
for (const [nom, r] of [['A1', a1], ['A2', a2], ['A3', a3]]) {
  if (!r) log(`${nom} n'a rien rendu.`)
  else log(`${nom} : ${r.accrocs.length} accroc(s)` + (r.laisses ? `, ${r.laisses} laissé(s) au-delà de dix` : ''))
}

return { chapitre, A0: a0, A1: a1, A2: a2, A3: a3 }
