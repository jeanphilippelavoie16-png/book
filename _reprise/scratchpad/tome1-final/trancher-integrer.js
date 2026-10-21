export const meta = {
  name: 'tome1-trancher-integrer',
  description: 'Tome 1 : trancher les points soulevés par les éditeurs et les rédacteurs (ce qui se règle par les règles et les sources), puis intégrer les fichiers communs',
  phases: [
    { title: 'Trancher', detail: 'un rédacteur par lot règle ce qui se règle, garde pour JP ce qui est à lui' },
    { title: 'Intégrer', detail: 'ancres, inventaire des dangers, pages des dangers, crédits, renvois et contradictions entre chapitres' },
  ],
}
const R = '/home/user/book/_reprise/scratchpad/tome1-final'
const LOTS = [
  { f: 'lot-01-02-03.json', ch: ['01', '02', '03'] },
  { f: 'lot-05-06-07.json', ch: ['05', '06', '07'] },
  { f: 'lot-08-09-00b.json', ch: ['08', '09', '00b'] },
  { f: 'lot-11-13-14.json', ch: ['11', '13', '14'] },
  { f: 'lot-15-16-17.json', ch: ['15', '16', '17'] },
  { f: 'lot-18-10.json', ch: ['18', '10'] },
]
const BASE = `Tu travailles sur « Le Manuel du Nord », dépôt /home/user/book, en français québécois. Lis d'abord au complet
.claude/cadre-agents.md (rends sa liste de contrôle cochée pour ta partie), CLAUDE.md et .claude/skills/ecriture/SKILL.md.
Ne commite rien. JP a demandé « monte le reste du tome 1 final » ; les chapitres 00b, 01 à 18 viennent d'être refaits au
gabarit final par lots (rédacteur, vérificateur, corrections, éditeur). Règle de JP pour cette passe : ne pas revérifier
à la source ce qui l'a déjà été (« on a pas déjà fait ce travail-là ? ») ; ouvrir une source seulement pour trancher un
point neuf.`

phase('Trancher')
const tr = await parallel(LOTS.map(l => () => agent(`${BASE}

Tu es le rédacteur des chapitres ${l.ch.join(', ')}. Leurs sorties de la chaîne sont dans ${R}/${l.f} (un tableau, un
élément par chapitre : redaction.jp = les questions que le rédacteur laissait à JP ; edition.faits = ce que l'éditeur a
signalé sans le changer, parce que ça touche un fait ; redaction.planches = les remarques sur les planches). Lis ce
fichier.

Ta tâche : régler tout ce qui peut se régler sans JP, dans TES chapitres seulement (chapitres/NN-*.md de ton lot) :
- une contradiction interne, une redite, un renvoi faible, un mot de métier, un chiffre qui diffère d'un chapitre à
  l'autre quand une source au dossier ou les pages des dangers (dangers/partie-*.md) tranchent ;
- une question dont la réponse découle d'une règle de CLAUDE.md, du cadre ou d'une décision déjà prise par JP (cherche
  dans suivi/plan-de-match.md et dans les fiches suivi/) : applique la règle et dis laquelle ;
- une phrase sans source : coupe-la si la consigne tient sans elle (JP l'a fait pour le ch. 10), sinon garde-la pour JP.
Ne garde pour JP que ce qui est vraiment à lui (un choix de contenu, de goût ou de famille, une contradiction entre deux
chapitres que rien ne tranche), formulé en une question courte, avec ta recommandation. Une contradiction avec un
chapitre qui n'est pas de ton lot : rends-la (« contradictions »), avec la correction proposée et sa source ; l'agent
suivant la règle. Garde les fins de ligne des fichiers. Note tout dans suivi/NN-redaction.md (section « Points réglés
après l'édition, 19 octobre 2026 »). Passe controle.py sur chaque chapitre touché. Ne touche pas aux planches : rends
seulement, pour chacune, ce qu'il faut dessiner ou corriger (« planches », une ligne par planche, avec son numéro).
Si un changement de texte déplace le début d'un paragraphe qui porte une ancre de planche (clé du chapitre dans
design/epreuves-livre/placements-tome-1.json ou ancres rendues dans le JSON du lot), rends l'ancre nouvelle.`, {
  label: `trancher ${l.ch.join('-')}`, phase: 'Trancher',
  schema: { type: 'object', properties: {
    regles: { type: 'array', items: { type: 'string' }, description: 'chaque point réglé : chapitre, ce qui a changé, la règle ou la source' },
    jp: { type: 'array', items: { type: 'object', properties: { ch: { type: 'string' }, question: { type: 'string' }, recommandation: { type: 'string' } }, required: ['ch', 'question', 'recommandation'] } },
    contradictions: { type: 'array', items: { type: 'string' } },
    planches: { type: 'array', items: { type: 'string' } },
    ancres: { type: 'array', items: { type: 'object', properties: { ch: { type: 'string' }, fig: { type: 'string' }, apres: { type: 'string' } }, required: ['ch', 'fig', 'apres'] } },
    liste: { type: 'string' } },
    required: ['regles', 'jp', 'contradictions', 'planches', 'ancres', 'liste'] } }).then(x => x ? { ...x, lot: l } : null)))
const ok = tr.filter(Boolean)
log(`${ok.length} lot(s) tranché(s) sur ${LOTS.length}`)

phase('Intégrer')
const integ = await agent(`${BASE}

Tu es l'intégrateur. Aucun agent n'a touché aux fichiers communs ; c'est toi qui les mets à jour. Les sorties de la chaîne
sont dans ${R}/lot-*.json (pour chaque chapitre : redaction.ancres, redaction.inventaire, redaction.credits,
redaction.renvois ; edition.ancres). La passe qui vient de trancher les points rend en plus :
${JSON.stringify(ok.map(x => ({ lot: x.lot.ch, ancres: x.ancres, contradictions: x.contradictions })), null, 1)}

1. design/epreuves-livre/placements-tome-1.json : pour chaque chapitre, les ancres (l'éditeur remplace le rédacteur ; la
   passe « trancher » remplace les deux). Garde le format exact du fichier (lis-le, et la clé "04" comme modèle). Vérifie
   chaque ancre dans le texte actuel du chapitre : elle doit s'y trouver une fois, telle quelle ; sinon corrige-la sur le
   texte réel. Une planche appelée dans le texte et qui n'a pas d'ancre : ajoute-la.
2. plan/dangers-inventaire.md : section 1 (colonne « Chapitres »), section 3 (le paragraphe de chaque chapitre) et section
   5, d'après ce que chaque chapitre a rendu. Plusieurs lots touchent les mêmes lignes : fais l'union, pas l'écrasement.
3. dangers/partie-1.md et dangers/partie-2.md, « Où il revient » et les petites corrections rendues : applique-les, puis
   vérifie au montage que chaque page des dangers tient encore sur sa page (env -u TMPDIR python3
   design/outils/assembler-tome.py 1 --chapitres 04 --hors-ligne --sortie livre/apercus-ch04 monte aussi les pages des
   dangers ; regarde-les à l'image). Si une page déborde, resserre sans perdre de fait.
4. images/credits.md : les lignes rendues, dans le format du fichier, sans doublon.
5. Les renvois entre chapitres : corrige chaque renvoi signalé, dans le chapitre qui le porte (n'importe quel tome) ;
   cherche aussi « ch. NN, étape » vers les chapitres refaits ; vérifie chaque fois que l'étape visée dit bien ce que le
   renvoi promet.
6. Les contradictions entre chapitres rendues par la passe « trancher » : règle chacune dans le chapitre qui a tort,
   avec la source ; ce que rien ne tranche, rends-le pour JP.
Garde les fins de ligne. Rends ce que tu as fait, fichier par fichier, ce qui reste pour JP, et la liste de contrôle.`, {
  label: 'intégrateur', phase: 'Intégrer',
  schema: { type: 'object', properties: { rapport: { type: 'string' }, jp: { type: 'array', items: { type: 'string' } }, reste: { type: 'string' }, liste: { type: 'string' } },
    required: ['rapport', 'jp', 'reste', 'liste'] } })

return { trancher: ok.map(x => ({ lot: x.lot.ch, regles: x.regles.length, jp: x.jp, planches: x.planches })), integ }