export const meta = {
  name: 'tome1-decisions-jp',
  description: 'Tome 1 : appliquer les douze décisions de JP dans le texte et les logigrammes, vérifier le nouveau, éditer',
  phases: [
    { title: 'Rédiger', detail: 'les décisions dans les chapitres, le 00b, le ch. 45, CLAUDE.md et les logigrammes' },
    { title: 'Vérifier', detail: 'le nouveau seulement' },
    { title: 'Éditer', detail: 'les phrases changées' },
  ],
}
const BASE = `Tu travailles sur « Le Manuel du Nord », dépôt /home/user/book, en français québécois. Lis d'abord au complet
.claude/cadre-agents.md (rends sa liste de contrôle cochée pour ta partie), CLAUDE.md et .claude/skills/ecriture/SKILL.md.
Ne commite rien. Des agents dessinent des planches en même temps : ne touche à aucun fichier de images/planches-src/ ni
aux PNG des planches. Garde les fins de ligne des fichiers.`
const DECISIONS = `Les décisions de JP du 19 octobre 2026 (la question, puis sa réponse) :
1. Sans avertisseur de CO qui répond, on ne brûle que le poêle raccordé (ch. 1, étape 2 ; ch. 3, étape 5), mais le ch. 3
   allume une lampe à graisse dans la pièce du poêle. → OUI, seule exception : la lampe à graisse, dans la pièce du poêle
   seulement, éteinte avant de dormir. L'écrire au ch. 1, étape 2, et au ch. 3, étape 5 ; la chaufferette et la chandelle
   restent exclues.
2. (planches : traité ailleurs.)
3. Les « quatre horloges » des ch. 1 et 2 ne sont pas les mêmes. → Garder les deux jeux ; seulement au ch. 2, les appeler
   « les quatre mesures » (une dizaine de phrases et le logigramme 02). Le ch. 1 ne change pas.
4. La réserve de trois mois (denrées sèches, gras, sel) : au chalet, comme le ch. 5. → Les lignes 1.D du ch. 00b passent à
   « Chalet » ; la maison garde la trousse de 72 h et le congélateur ; corriger le renvoi du ch. 65 (l. ~297) ; et dans
   CLAUDE.md, tableau « Les deux lieux », la case « Réserves » du chalet dit la réserve de trois mois (au lieu de « Le
   minimum »), avec une ligne qui date la décision.
5. Les calibres de la famille de JP (.308, 7 mm Rem. Mag., .303 British) au ch. 00b et au ch. 45 → généraliser : « au
   calibre de chaque carabine », en gardant l'avertissement qu'une cartouche d'un autre calibre peut entrer dans la
   chambre et faire céder l'arme ; la ligne entre au tableau G du 00b. Même chose pour les calculs « pour quatre
   personnes » s'ils supposent la famille de JP : les dire pour « une famille de quatre » comme exemple.
6. Le 00b n'a pas ce que d'autres chapitres disent d'acheter → ajouter : le godendard au palier 4 (il double la scie à
   chaîne), les lunettes de rechange en 1.E avec les ordonnances, le clapet antiretour et la batterie de secours de la
   pompe de puisard (Maison, palier 3), les électrodes au palier 4 avec le poste ; pas de ligne pour le poêle. Garder les
   paliers ajoutés le 19 octobre (sachets de réhydratation 1, trousse d'hiver de l'auto 1, tente d'hiver 2, réserve de
   200 L et râteau à feu 2, sel nitrité et balance au 0,1 g 2). Les renvois des ch. 3 (l. ~219-220), 9 (l. ~214), 78
   (l. ~429 : l'autoclave à soupape à masse) et 107 (l. ~56) pointent alors vers des lignes qui existent : vérifie-les.
7. Le SOS sans réponse (ch. 14 et 16, et ch. 8, l. ~185) → déclencher le SOS dès que la vie est en jeu, selon la définition
   du ch. 14 (étape 1) ; rester sur place seulement si une réponse confirme que des secours viennent, ou si on ne peut pas
   arriver avant la nuit (ch. 16, étape 14) ; sinon, sortir le blessé avec l'appareil allumé sur soi. Aligner le ch. 14,
   étape 3, le ch. 16, étape 5, et le ch. 8.
8. Ch. 17 : un adulte seul avec les enfants, un inconnu avec un signe du froid à la porte → si les comptes de l'étape 4
   concordent (une seule personne, aucune trace de plus), ouvrir et la traîner à l'intérieur sur une couverture ; sinon ne
   pas sortir, passer par la fenêtre un sac de couchage et une couverture, et dire comment se coucher dessus. Aligner les
   étapes 3 et 7, et le logigramme 17.
9. Ch. 17, étape 12 : « le lui donner, sans discuter ni résister » → GARDER.
10. Ch. 15 : une cinquième note En plus, la photo de la glace en chandelles du printemps (étape 42) → OUI : la télécharger
   (Wikimedia Commons ; vérifier la licence sur la page du fichier ; si Commons refuse, attendre et réessayer, ou prendre un
   autre fichier libre), la recadrer avec PIL dans images/extras/15-…, et rendre la ligne de crédit pour images/credits.md
   (que tu ajoutes toi-même, c'est le seul agent qui touche ce fichier aujourd'hui).
11. Deux phrases sans source → JP : « pas besoin de source ». Ch. 13, le feu par vent de plus de 20 km/h, étape 8 : COUPER
   la phrase (le chiffre n'a pas de source). Ch. 16, le travois de l'été (section 7) : GARDER le geste et retirer
   [À VÉRIFIER] ; s'il porte un chiffre sans source, enlever le chiffre et garder le geste.
12. (planches : traité ailleurs.)
Aussi, sur les logigrammes (texte seulement, puis rendu avec env -u TMPDIR python3 design/outils/logigramme.py <json> et
--sans-entete --svg ; 0 erreur) :
- 03-panne-hydro : en q1, « source » passe de « étape 6 » à « étape 7 » ; en fB, le renvoi devient « ch. 3, étape 7 » et la
  source « étape 7, « Sans poêle » » ; le message à un proche (étape 6) passe avant q1, commun aux deux branches ; au nœud
  « nuit », ajouter « Envoyer un message texte à un proche » avant la couverture et la tuque.
- 02-rester-ou-partir : en co4, retirer « temps » ([À VÉRIFIER]) comme dans le chapitre ; au nœud radio, « elle dit ce qu'on
  ne voit pas de la fenêtre » devient « on y apprend ce qu'on ne voit pas de la fenêtre » ; au nœud part, « garder des
  vêtements de rechange pour chacun à portée de main » devient « mettre des vêtements de rechange pour chacun dans un sac
  à part » (étape 16) ; et les « quatre mesures » (décision 3).
- 16-sortir-un-blesse : la boîte « marche » : « **Le faire marcher** sans rien porter, avec quelqu'un à côté de lui… » (sans
  participe) ; et la décision 7.
- 17-qui-cogne : « **Ne pas ouvrir**, mais faire savoir… » devient « **Répondre à travers la porte, sans ouvrir**… » ; et la
  décision 8.
- Photo 10-hutte-castor (design/epreuves-livre/placements-tome-1.json, clé "10") : la légende devient « Hutte de castor en
  hiver : un dôme de branches sous la neige. »`

phase('Rédiger')
const r = await agent(`${BASE}\n\nTu es le rédacteur. ${DECISIONS}\n\nApplique chaque décision là où elle va, avec les renvois, les ancres
(design/epreuves-livre/placements-tome-1.json : si tu changes le début d'un paragraphe ancré, change l'ancre avec) et
les fiches (suivi/NN-redaction.md de chaque chapitre touché, section « Décisions de JP, 19 octobre 2026 »). Règle 1 :
aucun chiffre nouveau sans source. Passe controle.py sur chaque chapitre touché. Rends ce que tu as changé, décision par
décision et fichier par fichier, et la liste de contrôle.`, { label: 'rédacteur', phase: 'Rédiger',
  schema: { type: 'object', properties: { rapport: { type: 'string' }, fichiers: { type: 'array', items: { type: 'string' } }, liste: { type: 'string' } }, required: ['rapport', 'fichiers', 'liste'] } })

phase('Vérifier')
const v = await agent(`${BASE}\n\nTu es le vérificateur technique (rôle 3 de roles.md) : tu signales, tu ne réécris pas. Le rédacteur vient
d'appliquer les décisions de JP :\n${DECISIONS}\nSon rapport : ${r ? r.rapport : ''}\nRegarde le diff (git -C /home/user/book
diff). Vérifie seulement le nouveau : chaque décision est-elle appliquée partout où elle va, sans contradiction qui reste
entre chapitres ? un fait ou un chiffre nouveau a-t-il sa source ? la photo a-t-elle sa licence vérifiée ? les
logigrammes rendus disent-ils la même chose que le texte ? Rends les points (classe, texte, problème, correction mot pour
mot).`, { label: 'vérificateur', phase: 'Vérifier',
  schema: { type: 'object', properties: { points: { type: 'array', items: { type: 'object', properties: { classe: { type: 'string' }, texte: { type: 'string' }, probleme: { type: 'string' }, correction: { type: 'string' } }, required: ['classe', 'texte', 'probleme', 'correction'] } } }, required: ['points'] } })

const c = (v && v.points.length) ? await agent(`${BASE}\n\nTu es le rédacteur. Le vérificateur signale sur tes changements :\n${JSON.stringify(v.points, null, 1)}\nApplique chaque correction ou écarte-la avec la raison ; note-le dans les fiches ; repasse controle.py. Rends ce que tu as fait.`,
  { label: 'corrections', phase: 'Vérifier' }) : null

phase('Éditer')
const e = await agent(`${BASE}\n\nTu es l'éditeur (rôle de roles.md). Relis seulement les phrases changées aujourd'hui par cette passe
(git -C /home/user/book diff ; les fichiers : ${r ? r.fichiers.join(', ') : ''}) : règle 0 à voix haute et toutes les
règles du skill ; corrige la phrase sans toucher aux faits ; ne casse aucune ancre (si tu changes le début d'un paragraphe
ancré, change l'ancre dans design/epreuves-livre/placements-tome-1.json). Note dans suivi/NN-edition.md. Rends ce que tu
as changé et la liste de contrôle.`, { label: 'éditeur', phase: 'Éditer' })
return { r, v, c, e }