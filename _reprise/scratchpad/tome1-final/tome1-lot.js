export const meta = {
  name: 'tome1-lot',
  description: 'Tome 1 au gabarit final, un lot de chapitres : rédacteur, vérificateur (le nouveau seulement), corrections, puis un éditeur pour le lot',
  phases: [
    { title: 'Rédiger', detail: 'refonte de chaque chapitre du lot' },
    { title: 'Vérifier', detail: 'le nouveau et ce qui change de sens seulement ; corrections' },
    { title: 'Éditer', detail: 'un éditeur pour les chapitres du lot' },
  ],
}

const CH = args
const BASE = `Tu travailles sur « Le Manuel du Nord », le livre de survie privé de JP, dépôt /home/user/book, en français
québécois. Ne commite rien, ne pousse rien : l'orchestrateur commite. JP a demandé : « Monte le reste du tome 1 final ».
Plusieurs agents travaillent en même temps sur d'autres chapitres : **ne modifie aucun fichier commun** (ni
design/epreuves-livre/placements-tome-1.json, ni plan/dangers-inventaire.md, ni dangers/*.md, ni images/credits.md, ni
un autre chapitre) : ce qu'il faudrait y changer, tu le rends dans ta réponse, et un dernier agent l'applique. Tes
fichiers à toi : le chapitre, sa fiche suivi/NN-*.md, ses sources nouvelles sources/NN-*.md, son logigramme
images/logigrammes/NN-*.json et ses rendus, ses photos images/extras/NN-*.

## Avant tout, lis au complet (dans cet ordre)
1. .claude/cadre-agents.md AU COMPLET. Tu rends sa liste de contrôle cochée ligne par ligne à la fin.
2. CLAUDE.md (il prime), puis .claude/skills/ecriture/SKILL.md au complet avec ses tableaux de corrections de JP.
3. gabarit-chapitre.md (sept sections, plus « En plus »), roles.md (ton rôle).
4. Les modèles finis : chapitres/04-retombees-radioactives.md et chapitres/12-la-tente-d-hiver.md, avec leurs fiches
   suivi/04-*.md et suivi/12-*.md (ce que le vérificateur et l'éditeur y ont trouvé : évite-le d'avance).
5. plan/dangers-inventaire.md : la section 1 (les ids des pictogrammes) et, section 3, le paragraphe de TON chapitre ;
   dangers/partie-1.md et dangers/partie-2.md (ce qui y est expliqué ne se redit pas dans le chapitre).
6. plan/premieres-minutes-inventaire.md (la ligne de ton chapitre, s'il en a une), suivi/plan-de-match.md section
   « PAUSE du 15 octobre » (les points qui touchent ton chapitre).`

const REFONTE = c => `${BASE}

## Ton sujet : refaire le chapitre ${c.n} (chapitres/${c.f}) au gabarit final, comme le 04 et le 12
- **Sept sections** : 1 En une ligne, 2 Quand l'utiliser, 3 Matériel, 4 Procédure, 5 Points de contrôle, 6 Signes
  d'échec, 7 Variante d'urgence ; puis la section non numérotée « En plus ». « Comment ça marche » / « Pourquoi ça
  marche » sort : ce qu'il apprenait va dans l'étape qu'il explique. La section Danger sort : chaque bloc va dans
  l'étape où le danger se présente, avec son pictogramme {!id} au début de la phrase (ids exacts de l'inventaire ; un
  ou deux par étape au plus), avec ce qui est propre au chapitre (la distance, l'épaisseur, la durée) ; il saute si la
  page du danger le dit déjà. Étapes numérotées d'un bout à l'autre, sans lettres. Rien sous le titre que la ligne de
  lieu. Section 2 : seulement quand l'utiliser. Un chapitre de référence (listes, tableaux) peut garder des tableaux à
  la place d'étapes, mais suit l'ordre des sections et pose ses pictogrammes là où le danger se présente.
- **Les séries orange** (si le chapitre a des gestes urgents, voir l'inventaire des premières minutes) : en tête de la
  procédure, juste après le logigramme ; une série, un sujet ; la pastille dit le temps qu'on a ({.orange 10 min}),
  sourcé ; la scène réelle d'abord ; tout le détail est dans l'orange, sans partie « le détail ».
- **Le logigramme** : s'il existe (images/logigrammes/${c.n}-*.json), mets-le d'accord avec le texte refait (phrases
  complètes, renvois aux nouvelles étapes, pastilles identiques à l'orange, aucun avertissement redit, colonnes de
  droite telles quelles), puis rends-le : env -u TMPDIR python3 design/outils/logigramme.py <json> et
  … --sans-entete --svg ; 0 erreur. S'il n'existe pas et que l'urgence du chapitre se décide en branches, fais-en un
  sur le modèle de images/logigrammes/04-retombees.json.
- **Les planches** : celles du chapitre (images/planches-src/${c.n}-*.js ; images/validees/ et images/a-valider/
  planche-${c.n}-*) sont chacune appelées là où elles servent, repère par repère (« (planche ${c.n}-03, repère 2) »).
  Ne redessine rien. Rends les ancres (le début exact et unique du paragraphe qui appelle chaque planche, photo et le
  logigramme) au lieu d'écrire placements-tome-1.json ; lis la clé "${c.n}" de ce fichier pour voir ce qui existe. Une
  planche que le texte appelle et qui n'existe pas, ou qui ne colle plus au texte : rends-la dans « planches ».
- **Les notes « En plus »** : 4 à 8 notes ### Titre, 30 à 80 mots, l'étape entre parenthèses ; trois genres seulement
  (la façon des Innus ou d'une autre nation du Nord, sourcée, avec pourquoi elle marche et ce qui la rend dangereuse si
  on change ses conditions ; un fait sourcé ; une photo pour reconnaître, ![légende](images/extras/${c.n}-….jpg), sous
  licence libre de Wikimedia Commons ou iNaturalist, ligne de crédit rendue). Jamais de planche ni de dessin, jamais une
  redite du chapitre.
- **Chiffres** : règle 1. Chaque chiffre a sa source dans /sources (voir la fiche suivi/${c.n}-redaction.md) ; un
  chiffre nouveau se cherche avant d'être écrit, la page s'enregistre dans sources/${c.n}-….md ; sinon [À VÉRIFIER].
  Les chiffres d'un danger concordent avec dangers/partie-*.md.
- Rien de la conformité ni de la sécurité domestique ordinaire. La variante d'urgence est le cœur : ne la raccourcis
  pas. Les rappels de sécurité du tableau de CLAUDE.md qui s'appliquent restent.
- Passe python3 .claude/skills/ecriture/scripts/controle.py chapitres/${c.f} --avant <copie d'avant>, et corrige.
- Garde les fins de ligne du fichier (LF ou CRLF).
- Dans suivi/${c.n}-redaction.md, une section « Refonte au gabarit final, 19 octobre 2026 » : ce qui a changé, où chaque
  bloc de l'ancien « Comment ça marche » et de l'ancien Danger est allé, pictogrammes (étape → id), séries orange et
  leurs sources, logigramme, chiffres nouveaux et leurs sources, [À VÉRIFIER], notes En plus et leur provenance,
  controle.py avant/après.`

const NOTES = c => `${BASE}

## Ton sujet : le chapitre ${c.n} (chapitres/${c.f}) est déjà refait au gabarit à sept sections ; il lui manque
les notes « En plus », et il doit suivre les règles ajoutées depuis (relis le cadre et le gabarit). Ajoute la section
non numérotée « En plus » : 4 à 8 notes ### Titre, 30 à 80 mots, l'étape entre parenthèses ; trois genres seulement (la
façon des Innus ou d'une autre nation du Nord, sourcée, avec pourquoi elle marche et ce qui la rend dangereuse si on
change ses conditions ; un fait sourcé ; une photo pour reconnaître, ![légende](images/extras/${c.n}-….jpg), licence
libre, ligne de crédit rendue). Jamais de planche ni de dessin, jamais une redite. Vérifie aussi que le chapitre suit
les règles du cadre ajoutées le 18 octobre (série orange en tête de la procédure juste après le logigramme si le
chapitre en a une ; pictogrammes ; planches appelées). Règle 1 pour chaque fait. Garde les fins de ligne. Note tout
dans suivi/${c.n}-redaction.md, section « Notes En plus, 19 octobre 2026 ».`

const ACHAT = c => `${BASE}

## Ton sujet : le chapitre d'achat, ${c.n} (chapitres/${c.f})
Il ne suit pas le gabarit (CLAUDE.md, « Le chapitre d'achat ») : quatre paliers, à acheter absolument, essentiel,
important, s'il reste du temps et de l'argent ; chaque ligne dit maison, chalet ou les deux ; c'est le seul inventaire
du livre. Fais-lui la passe d'écriture complète du skill ecriture (règle 0 à voix haute, pas de liste de noms à la place
d'un geste quand une phrase est nécessaire, pas de tiret, pas de « § », pas de mot banni, pas de numéro de norme, pas de
service qui répond, pas de sécurité domestique ordinaire), et vérifie qu'il couvre le matériel indispensable des
chapitres 01 à 18 tels qu'ils sont maintenant (lis la section 3 Matériel des chapitres déjà refaits : 04, 10, 12) ;
rends ce qui manque ou ne concorde pas au lieu d'inventer une ligne sans source. Règle 1 pour chaque chiffre et prix.
Garde les fins de ligne. Note tout dans suivi/${c.n}-redaction.md (crée-la si elle n'existe pas), section « Passe
finale, 19 octobre 2026 ».`

const SORTIE_R = { type: 'object', properties: {
  rapport: { type: 'string', description: "ce qui a changé, court" },
  ancres: { type: 'array', items: { type: 'object', properties: { fig: { type: 'string' }, apres: { type: 'string' } }, required: ['fig', 'apres'] } },
  inventaire: { type: 'string', description: "ce qu'il faut changer dans plan/dangers-inventaire.md et dangers/partie-*.md (Où il revient), mot pour mot" },
  credits: { type: 'array', items: { type: 'string' }, description: "lignes à ajouter à images/credits.md" },
  renvois: { type: 'array', items: { type: 'string' }, description: "renvois vers ce chapitre (étapes renumérotées) à corriger dans d'autres chapitres : fichier, ligne, avant → après" },
  planches: { type: 'array', items: { type: 'string' }, description: "planches manquantes ou qui ne collent plus au texte : numéro, ce qu'elle doit montrer, où elle est appelée" },
  jp: { type: 'array', items: { type: 'string' }, description: "questions que seul JP peut trancher" },
  liste: { type: 'string', description: "liste de contrôle du cadre cochée" } },
  required: ['rapport', 'ancres', 'inventaire', 'credits', 'renvois', 'planches', 'jp', 'liste'] }


const verif = (r, c) => agent(`Tu es le **vérificateur technique** (rôle 3 de /home/user/book/roles.md) du Manuel du Nord,
dépôt /home/user/book. Lis d'abord au complet .claude/cadre-agents.md (rends sa liste de contrôle cochée), CLAUDE.md, et
ta partie du skill ecriture. Tu n'as pas écrit ce chapitre et tu ne le réécris pas : tu signales. Chapitre :
chapitres/${c.f}. Le rédacteur vient de le refaire ; le texte d'avant est dans git (git -C /home/user/book diff --
chapitres/${c.f}, ou git show HEAD:chapitres/${c.f}). Il dit : ${r ? r.rapport : '(pas de rapport)'}

**Règle de JP (19 octobre 2026) : ne revérifie pas ce qui a déjà été vérifié** (« fuck les sources, on a pas déjà fait
ce travail-là ? »). Les chiffres et les faits du texte d'avant ont passé la vérification à la source : un chiffre qui
ne fait que changer de section ne se rouvre pas. Compare au texte d'avant et vérifie seulement :
- chaque chiffre ou fait NOUVEAU (absent du texte d'avant), dans sa source enregistrée dans /sources (ouvre-la à la
  page dite ; une source qu'on ne trouve pas, c'est une erreur) ;
- chaque phrase dont le SENS a changé (un chiffre modifié, une condition ajoutée ou perdue, un lien de cause nouveau) ;
- les notes « En plus » (chacune est nouvelle) et les séries orange réécrites ;
- chaque danger sorti de l'ancienne section Danger : a-t-il gardé son fait propre dans son étape ? le pictogramme
  est-il le bon (ids de plan/dangers-inventaire.md) ? un rappel de sécurité du tableau de CLAUDE.md a-t-il disparu ?
- une contradiction nouvelle avec un autre chapitre ou avec dangers/partie-*.md.
Ne relève pas le style (c'est l'éditeur). Rends chaque point : classe (erreur, à préciser), texte visé, problème,
correction mot pour mot, source.`, {
    label: `vérificateur ${c.n}`, phase: 'Vérifier',
    schema: { type: 'object', properties: { points: { type: 'array', items: { type: 'object', properties: {
      classe: { type: 'string' }, texte: { type: 'string' }, probleme: { type: 'string' }, correction: { type: 'string' } },
      required: ['classe', 'texte', 'probleme', 'correction'] } }, liste: { type: 'string' } }, required: ['points', 'liste'] } })

const res = await pipeline(CH,
  c => agent(c.t === 'refonte' ? REFONTE(c) : c.t === 'notes' ? NOTES(c) : ACHAT(c), {
    label: `rédacteur ${c.n}`, phase: 'Rédiger', schema: SORTIE_R }),
  (r, c) => verif(r, c).then(v => ({ r, v })),
  ({ r, v }, c) => (v && v.points && v.points.length ? agent(`${BASE}

Tu es le **rédacteur** du chapitre ${c.n} (chapitres/${c.f}). Le vérificateur technique a relu ta refonte et signale :
${JSON.stringify(v.points, null, 1)}
Applique chaque correction, ou écarte-la en disant pourquoi avec la source. Note-le dans suivi/${c.n}-redaction.md
(section « Corrections après la vérification technique, 19 octobre 2026 »), repasse controle.py. Rends le même genre de
sortie qu'avant (les ancres, l'inventaire, les crédits, les renvois, les planches et les questions de JP À JOUR, au
complet : elles remplacent celles d'avant), avec dans « rapport » ce que tu as appliqué et écarté.`, {
    label: `corrections ${c.n}`, phase: 'Vérifier', schema: SORTIE_R }) : Promise.resolve(r))
    .then(r2 => ({ c, r: r2 || r, v })),
)
const faits = res.filter(Boolean)
log(`${faits.length} chapitre(s) sur ${CH.length} rédigés et vérifiés`)

phase('Éditer')
const ed = await agent(`Tu es l'**éditeur** (rôle de /home/user/book/roles.md) du Manuel du Nord, dépôt /home/user/book.
Lis d'abord au complet .claude/cadre-agents.md (rends sa liste de contrôle cochée), CLAUDE.md et
.claude/skills/ecriture/SKILL.md avec ses tableaux. Tu n'as pas écrit ces chapitres, refaits aujourd'hui au gabarit
final : ${faits.map(x => `chapitres/${x.c.f}`).join(', ')}. Relis-les au complet, l'un après l'autre, phrase par phrase,
à voix haute (règle 0) : chaque phrase a un verbe qui dit le geste, on sait qui le fait, les mots de tous les jours ;
pas de liste de noms à la place d'une action, pas d'étiquette en raccourci, pas de tiret, pas de pronominal pour une
consigne, pas de « ceux qui », pas de chute en formule, pas de maxime, pas d'opposition fabriquée, pas d'image
poétique, pas de chose qui pense, pas de redite (un fait une fois par chapitre), un seul mot par chose. Corrige
toi-même la phrase sans toucher aux faits ni aux chiffres ; ce qui touche un fait, signale-le. Ne casse aucune ancre
de planche : voici celles que les rédacteurs ont rendues, ${JSON.stringify(faits.map(x => ({ ch: x.c.n, ancres: x.r ? x.r.ancres : [] })))} ;
si tu changes le début d'un paragraphe ancré, rends l'ancre nouvelle. Garde les fins de ligne de chaque fichier.
Repasse controle.py sur chacun. Note tes changements dans suivi/NN-edition.md de chaque chapitre.
Rends, par chapitre, ce que tu as changé, les ancres changées, les faits signalés ; et la liste de contrôle.`, {
  label: `éditeur ${CH.map(c => c.n).join('-')}`, phase: 'Éditer',
  schema: { type: 'object', properties: { chapitres: { type: 'array', items: { type: 'object', properties: {
    n: { type: 'string' }, rapport: { type: 'string' },
    ancres: { type: 'array', items: { type: 'object', properties: { fig: { type: 'string' }, apres: { type: 'string' } }, required: ['fig', 'apres'] } },
    faits: { type: 'array', items: { type: 'string' } } }, required: ['n', 'rapport', 'ancres', 'faits'] } },
    liste: { type: 'string' } }, required: ['chapitres', 'liste'] } })

return faits.map(x => {
  const e = ed ? (ed.chapitres || []).find(y => y.n === x.c.n) : null
  return { n: x.c.n, f: x.c.f, redaction: x.r, points_verif: x.v ? x.v.points : null, edition: e }
})
