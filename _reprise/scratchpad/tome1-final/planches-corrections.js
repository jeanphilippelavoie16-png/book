export const meta = {
  name: 'tome1-planches-corrections',
  description: 'Tome 1 : corriger les planches existantes relevées au trancher et mettre toute l\'eau en bleu, avec second regard',
  phases: [
    { title: 'Corriger', detail: 'trois lots de corrections et l\'audit de l\'eau' },
    { title: 'Regarder', detail: 'second regard sur ce qui a changé au rendu' },
  ],
}
const BASE = `Tu corriges des planches de « Le Manuel du Nord », dépôt /home/user/book. Lis d'abord AU COMPLET : .claude/cadre-agents.md
(tu rendras sa liste « Les planches » cochée), .claude/skills/planches/references/brief-agent.md, .claude/skills/planches/SKILL.md,
images/recommandations-planches.md. Outils obligatoires : node .claude/skills/planches/scripts/composer-planche.js
images/planches-src/X.js, verifier-planche.js (0 erreur), rendre-planche.js, xmllint --noout ; mains par h.formes.mainStock,
corps par h.formes.corps, rien à la main. L'EAU EN BLEU (JP, 19 octobre : « oublie pas de mettre toute l'eau en bleu sur les
planches si c'est pas déjà fait ») : toute eau liquide dessinée (dans un seau, un tuyau, un lac, un trou dans la glace, un
filtre, une chaudière) passe par h.a.hachure('eau') (teinte #DCEAF2 et vaguelettes #4F7A93) ; la glace et la neige ne sont pas de
l'eau liquide, elles gardent leur traitement. Vérifie chaque planche que tu touches. Pas de ligne « Planche NN. Titre. » dans un
dessin. Pas de tiret (— ou –) dans une légende ni dans un desc. Les légendes : infinitif pour un geste, jamais au pronominal quand
quelqu'un fait le geste.
RANGEMENT : quand le rendu d'une planche change, le nouveau PNG va dans images/a-valider/ sous le même nom, et si une copie existe
dans images/validees/, retire-la (rm) : l'assembleur prend validees/ en premier, et JP doit revoir ce qui a changé. Quand seuls
un commentaire d'en-tête ou un champ desc changent (rien d'imprimé), recompose le SVG mais ne bouge pas le PNG.
NE TOUCHE À AUCUN CHAPITRE, ni à design/epreuves-livre/placements-tome-1.json, ni à images/credits.md : un autre agent y écrit en
ce moment. Si le texte doit changer (appels, numéros de repères, légende de photo), rends le changement mot pour mot avec le
paragraphe visé. Ne commite rien. Ne touche qu'aux fichiers de tes planches. Regarde chaque rendu (Read sur le PNG) avant de rendre.`

const RES = { type: 'object', properties: {
  planches: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, fait: { type: 'string' }, png: { type: 'string' }, rendu_change: { type: 'boolean' } }, required: ['id', 'fait', 'rendu_change'] } },
  texte: { type: 'array', items: { type: 'object', properties: { chapitre: { type: 'string' }, ou: { type: 'string' }, changement: { type: 'string' } }, required: ['chapitre', 'ou', 'changement'] } },
  rapport: { type: 'string' }, liste: { type: 'string' } }, required: ['planches', 'texte', 'rapport', 'liste'] }
const VERDICT = { type: 'object', properties: { oui: { type: 'boolean' }, corrections: { type: 'array', items: { type: 'string' } } }, required: ['oui', 'corrections'] }

const LOTS = [
  { id: 'ch3-5-7', sujet: `
1. 03-09 (abri, ch. 3, étape 10) : renuméroter les repères dans l'ordre des gestes du texte. Ancien → nouveau : 1→1, 2→2, 3→3, 8→4
   (cartons), 9→5 (sapin, matelas ou coussins), 10→6 (couverture sous le corps), 4→7 (une même couverture), 5→8 (le lit : la légende
   devient « le lit de coussins »), 6→9 (enfants au milieu, adulte aux bouts), 11→10, 7→11 (bouts fermés). La légende du nouveau 10
   devient « papier journal entre deux couvertures », sans « froissé » ; corriger aussi la desc (« journal froissé »). Le dessin peut
   rester. Le texte porte déjà la nouvelle numérotation (vérifie-le dans chapitres/03-*.md, étape 10).
2. 03-10 (vidange, ch. 3, étape 23 et section 7 ; OUI de JP) : ajouter le bouchon de nettoyage du siphon (vissé au bas du coude,
   sous l'évier, une chaudière dessous, l'eau qui coule en bleu). Ce repère passe avant la poire : bouchon 9, poire 10, chiffon et
   sac 11, huile 12. La légende du repère de l'huile, « ou une tasse d'huile de cuisson », devient « ou de l'huile de cuisson dans le
   coude » ; la tasse dessinée qui verse peut rester. Rends le changement de texte du ch. 3 (section 7, « Vidanger sans antigel »,
   qui passe à « repères 7 à 12 », et chaque renvoi de repère qui suit). Elle est dans validees/ : le nouveau PNG va dans a-valider/.
3. 05-01, la chaudière à bascule (images/planches-src/05-01.js) : (a) dans la vue « Montée », le dessus de la chaudière est une ellipse
   grise pleine qui se lit comme un couvercle fermé ; montrer l'ouverture (le rebord en anneau, la paroi intérieure plus foncée, et
   l'eau au fond en bleu si le texte du ch. 5 met de l'eau dans la chaudière) pour qu'on voie que la souris tombe dedans ; (b) retirer
   du dessin la ligne « Planche 05-01. La chaudière à bascule contre les souris. » ; (c) dans le commentaire de tête, « §9, « Les
   rongeurs sans pièges… » » devient « section 7, « Les souris, sans piège ni laine d'acier » ».
4. Photo images/photos/tri/05-boite-bombee.jpg (quart de page, ch. 5, étape 23) : on lit encore l'étiquette du hareng fermenté
   suédois. La recadrer avec PIL sur le couvercle bombé (garde l'original dans git ; écris par-dessus le même fichier) pour qu'aucun
   texte de l'étiquette ne se lise ; si c'est impossible, dis-le. Regarde le résultat. Rends la légende de l'éditeur (cherche-la dans
   design/epreuves-livre/placements-tome-1.json et suivi/05-edition.md), sans pronominal, pour que je l'applique.
5. 07-01, l'obturateur étayé (images/planches-src/07-01.js) : (a) le marteau pend à côté du haut du 2 × 4 sans le toucher : le
   montrer en train de frapper le haut du 2 × 4 vers l'aplomb (tête contre le bois, manche à peu près horizontal), ou ne garder que
   la flèche rouge ; (b) la légende 4 « étai : un 2 × 4 juste trop long » devient « un 2 × 4 à peine plus long que la hauteur » ;
   (c) retirer du dessin la ligne « Planche 07-01. … » ; (d) dans le commentaire de tête, « §9, « L'égout » » devient « section 7,
   « Boucher le drain de plancher sans obturateur » ». S'il y a de l'eau dans le drain, en bleu.` },
  { id: 'ch9-10-11-14', sujet: `
1. 09-08 (le joint de cuir gras et l'emporte-pièce de tuyau) : repère 5, la légende « cuir de botte, semelle ou chambre à air »
   (images/planches-src/09-08.js, l. ~111) devient « cuir de botte ou semelle de cuir ». Couper l'encadré danger (l. ~176) et
   mettre la desc (l. ~52) à jour de la même façon. Elle est dans validees/ : le nouveau PNG va dans a-valider/.
2. 11-04, la pièce d'air propre (pleine page, ch. 11, étape 35) : renuméroter les repères dans l'ordre des gestes de la section 7 :
   la pièce 1 et 2, le filtre seul 3 et 4, le cube 5 à 11 (vue de dessus comprise). Ancien → nouveau : 10→1, 11→2, 8→3, 9→4, 1→5,
   2→6, 3→7, 4→8, 5→9, 6→10, 7→11 (correspondance aussi notée dans suivi/11-redaction.md ; vérifie-la contre chapitres/11-*.md,
   section 7). Rends le changement de texte : chaque appel de repère du ch. 11 qui change, mot pour mot. Dans l'en-tête de
   11-04.js, « chapitre 11, section 9 » devient « section 7 ».
3. 11-05 : dans l'en-tête de images/planches-src/11-05.js, « section 9 » devient « section 7 » (rien d'imprimé).
4. 14-01, le poste à galène (validée) : enlever du dessin la ligne « Planche 14-01 — Le poste à galène. ». Dans l'en-tête de
   14-01.js, « chapitre 19, section 9 » devient « chapitre 14, section 7 », et les [À VÉRIFIER] des spires, du diamètre et de
   l'antenne sortent (sourcés depuis le 24 septembre). Le nouveau PNG va dans a-valider/, la copie de validees/ sort.
5. 10-07 (filtre à sable) : rien d'imprimé ; seuls le champ desc et l'en-tête de 10-07.js : « une main de grosse pierre » devient
   « une couche de grosses pierres » ; « seau » devient « chaudière » ; le sable se lave jusqu'à une eau « encore un peu sale » (pas
   « claire ») ; quand le débit tombe, frotter le dessus à peine, la paume à plat, en rond (pas « gratter à plat sur 20 à 30 mm ») ;
   plus d'« encadré danger ». Si l'eau de la 10-07 n'est pas en bleu, c'est un changement imprimé : rends-la en bleu.` },
  { id: 'ch15-16', sujet: `
1. 15-03 : le repère 4 (images/planches-src/15-03.js, l. ~247) dit « tirer pendant qu'il bat des jambes ». Écrire « tirer pendant
   qu'elle bat des jambes », comme l'étape 8 du ch. 15, puis refaire le rendu. Le commentaire d'en-tête (l. ~13, « qu'il », « le
   gardant ») suit.
2. 15-06 : dans le commentaire d'en-tête de 15-06.js, remplacer « le porte jusqu'à la rive » et « section 9 » par le texte actuel :
   section 7, « ligaturer une perche de bois vert sous le ski ».
3. 15-01, 15-02, 15-04, 15-05 : rien d'imprimé à changer, mais les en-têtes des sources et les fichiers -reperes.md citent
   l'ancienne numérotation (15-01 « étape 34 » au lieu des étapes 3 à 6 ; 15-02 « section 9 » au lieu de 7 ; 15-04 « section 8 »
   au lieu de 7 ; 15-05 « section 2 » et « étape 20 » au lieu de l'étape 40). Les corriger (vérifie contre chapitres/15-*.md).
4. 16-08 : le repère 5 dit « puis la couverture », alors que l'étape 6 du ch. 16 couche le blessé dans un sac de couchage fermé,
   entouré d'un pare-vapeur. Écrire « puis le sac de couchage », et dans desc, « la couverture autour du blessé » devient « le sac
   de couchage autour du blessé ». Elle est dans validees/ : le nouveau PNG va dans a-valider/.
5. L'eau des planches 15 (trou dans la glace, lac) : vérifie qu'elle est en bleu dans 15-01 à 15-06 ; si une ne l'est pas, c'est un
   changement imprimé.` },
  { id: 'eau', sujet: `
AUDIT DE L'EAU sur les autres planches du tome 1 : 03-08, 03-11, 03-12, 04-01a, 04-01b, 04-40, 04-41, 04-42, 10-01, 10-02, 10-03,
10-08, 11-03, 12-01a, 12-01b, 12-02, 12-03, 12-04, 12-05a, 12-05b, 12-06a, 12-06b, 13-01, 13-07, 13-08, 13-10, 13-11, 16-07, 17-06
(sources images/planches-src/NN-NN.js). Pour chacune : y a-t-il de l'eau liquide dessinée (même un fond de chaudière, une
casserole, un puits, un filet qui coule, un cours d'eau) ? Si oui, est-elle en h.a.hachure('eau') ? Sinon, la passer en bleu,
recomposer, vérifier, rendre, regarder. Rends un tableau planche par planche (eau : oui/non ; déjà bleue ; corrigée). 04-40 a
été validée hier par JP (« Oui-04-40 ») : si tu changes son eau, ne change rien d'autre.` },
]

const res = await pipeline(LOTS,
  l => agent(`${BASE}\n\nTON LOT (${l.id}) :${l.sujet}\n\nRends le résultat demandé.`, { label: `lot ${l.id}`, phase: 'Corriger', schema: RES }),
  async (r, l) => {
    if (!r) return null
    const vus = r.planches.filter(p => p.rendu_change && p.png)
    if (!vus.length) return { lot: l.id, ...r }
    let cur = r, v = null, tour = 0
    while (tour < 2) {
      v = await agent(`Tu es le relecteur de planches que tu n'as pas corrigées, pour « Le Manuel du Nord » (/home/user/book). Lis
.claude/skills/planches/references/brief-agent.md et la section « Les planches » de .claude/cadre-agents.md. Regarde chaque PNG
(Read), à la taille d'impression puis de près (recadre avec python3 PIL dans le scratchpad) : ${cur.planches.filter(p => p.rendu_change && p.png).map(p => p.png).join(', ')}.
Les corrections demandées étaient :${l.sujet}\nSont-elles faites, sans rien casser (légendes qui chevauchent, eau en bleu, trait,
mains du moteur) ? Un illustrateur professionnel publierait-il ça ? Corrections précises seulement. Ne modifie rien.`,
        { label: `regard ${l.id} #${tour + 1}`, phase: 'Regarder', schema: VERDICT })
      if (!v || v.oui) break
      const f = await agent(`${BASE}\n\nTON LOT (${l.id}) :${l.sujet}\n\nTu as déjà fait ce lot (rapport : ${cur.rapport}). Le relecteur dit non :
${JSON.stringify(v.corrections, null, 1)}\nCorrige, rends, regarde. Rends le résultat complet, à jour.`, { label: `correction ${l.id} #${tour + 1}`, phase: 'Regarder', schema: RES })
      if (f) cur = f
      tour++
    }
    return { lot: l.id, ...cur, regard: v }
  })
return res