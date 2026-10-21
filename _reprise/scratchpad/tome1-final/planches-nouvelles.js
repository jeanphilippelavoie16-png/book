export const meta = {
  name: 'tome1-planches-nouvelles',
  description: 'Tome 1 : dessiner les planches nouvelles (01-02, 06-01, 18-01, 18-02) et refaire 13-40 et 13-09, avec second regard',
  phases: [
    { title: 'Dessiner', detail: 'une planche par agent' },
    { title: 'Regarder', detail: 'second regard jusqu\'au oui' },
  ],
}
const BASE = `Tu dessines une planche de « Le Manuel du Nord », dépôt /home/user/book. Lis d'abord AU COMPLET, dans cet ordre :
.claude/cadre-agents.md (tu rendras sa liste de contrôle « Les planches » cochée), .claude/skills/planches/references/brief-agent.md,
.claude/skills/planches/SKILL.md et ses références, les skills dessin-notice et encrage, images/recommandations-planches.md
(règles 1 à 12 et le tableau des planches signalées). Les outils sont obligatoires : composer-planche.js, verifier-planche.js
(0 erreur), rendre-planche.js, xmllint --noout ; les mains par h.formes.mainStock, les corps par h.formes.corps (de profil),
les têtes par h.formes.teteSimple : rien à la main. L'EAU EN BLEU : toute eau liquide passe par h.a.hachure('eau') (JP, 19 octobre :
« oublie pas de mettre toute l'eau en bleu sur les planches »). Pas de ligne « Planche NN. Titre. » dans le dessin. Pas de tiret
(— ou –) dans une légende. Les légendes parlent comme le texte : verbe à l'infinitif pour un geste, jamais au pronominal
quand quelqu'un fait le geste. Lis le passage du chapitre qui appelle la planche (chapitres/NN-*.md) et colle au texte, repère
par repère, dans l'ordre des gestes. Règle 1 : aucune mesure dessinée sans qu'elle soit dans le texte ou sourcée.
NE TOUCHE À AUCUN CHAPITRE, ni à design/epreuves-livre/placements-tome-1.json, ni à images/credits.md : un autre agent écrit
dedans en ce moment. Si le texte doit changer (un appel « (planche NN-NN) » à poser, des repères), rends-le dans ton résultat,
mot pour mot, avec le paragraphe visé. Ne commite rien. Ne touche qu'aux fichiers de ta planche. Le PNG va dans images/a-valider/
(jamais validees/). Regarde ton rendu (Read sur le PNG) à la taille d'impression et de près avant de rendre.`

const RES = { type: 'object', properties: {
  svg: { type: 'string' }, png: { type: 'string' }, source: { type: 'string' },
  texte: { type: 'array', items: { type: 'object', properties: { chapitre: { type: 'string' }, ou: { type: 'string' }, changement: { type: 'string' } }, required: ['chapitre', 'ou', 'changement'] } },
  ancre: { type: 'string', description: 'le début exact du paragraphe qui appelle la planche, pour placements-tome-1.json, et le format (pleine, demi, quart)' },
  mains: { type: 'string' }, rapport: { type: 'string' }, liste: { type: 'string' } },
  required: ['svg', 'png', 'source', 'texte', 'ancre', 'rapport', 'liste'] }
const VERDICT = { type: 'object', properties: { oui: { type: 'boolean' }, corrections: { type: 'array', items: { type: 'string' } } }, required: ['oui', 'corrections'] }

const ITEMS = [
  { id: '01-02', sujet: `NOUVELLE petite planche (format quart) 01-02, le verre témoin de dégel (oui de JP le 19 octobre). Trois verres côte à côte,
la pièce de monnaie sur la glace, à mi-hauteur, au fond, et ce que chacun veut dire selon le texte du ch. 1 (cherche « témoin »
dans chapitres/01-*.md ; voir aussi ch. 3, 5 et 9, et images/audit-planches/petites-planches.md). Rends l'appel à poser dans le
ch. 1 (le paragraphe et la phrase), et les autres chapitres qui pourraient renvoyer à la même planche.` },
  { id: '06-01', sujet: `NOUVELLE planche 06-01, Traîner au lieu de porter (demi-page ou pleine page selon le skill). Elle est appelée au ch. 6,
section 7, et le texte renvoie déjà aux repères 1 à 4, dans cet ordre. Repère 1, vue de dessus d'un capot d'auto ou d'une tôle
chargée : les deux cordes de tirage attachées aux deux coins avant ; à côté, une vignette ratée, marquée comme telle, où la corde
est au centre et la charge, en travers, verse. Repère 2 : les deux barres rigides (bouts de bois ou bâtons de ski) qui vont du
traîneau à la taille. Repère 3, vue de côté dans une descente : le traîneau pousse sur les barres et reste derrière les talons.
Repère 4 : la ceinture de tirage, une couverture pliée en bande, avec les cordes et les barres nouées dessus. Le corps de profil
par h.formes.corps, sans gros plan de main. Vérifie dans chapitres/06-*.md ce que disent les repères 1 à 4, mot pour mot.` },
  { id: '18-01', sujet: `NOUVELLE planche 18-01 (demi-page, oui de JP) : la crémaillère pour cuire dehors. Deux branches fourchues plantées, une
barre posée dessus, des crochets de branche pendus à différentes hauteurs, la marmite qu'on monte ou descend d'un cran au lieu de
la soulever, un feu bas sur des braises, le mur de neige tassée du côté du vent. Appelée au ch. 18 (chapitres/18-*.md), section 7,
« Cuire dehors, sans avertisseur » : l'appel « (planche 18-01) » y est déjà ; colle aux repères que le texte nomme.` },
  { id: '18-02', sujet: `NOUVELLE planche 18-02 (demi-page, oui de JP) : refroidir la marmite dans une auge de neige. L'auge creusée dans la neige
tassée ; des plats larges et plats couchés dedans (plat à rôtir, tôle, couvercle de chaudière) ; une couche mince de ragoût ; la
neige mouillée qu'on remplace par de la neige sèche ; un panneau lesté par-dessus contre les animaux. Appelée au ch. 18, section 7,
« Refroidir vingt litres sans réfrigérateur » : l'appel y est déjà ; colle aux repères et aux mesures du texte.` },
  { id: '13-40', sujet: `REFAIRE DEPUIS ZÉRO la planche 13-40, le ferrocérium, du tri du bois à la flamme (pleine page, appelée au ch. 13, étape 10 ;
source images/planches-src/13-40.js ; elle est au tableau des planches signalées : on la refait au complet, jamais par retouche ;
pause du 15 octobre, point 23 ; la flèche 9 était signalée). Elle montre les quatre tas (1 à 4), le tipi (5 et 6), le nid (7 et 8)
et l'étincelle (9 à 12 : la pointe tenue au-dessus du creux, à un doigt de l'amadou sans le toucher, le dos du couteau immobile, la
tige tirée vers soi). Viennent ensuite flamber (13 à 16) et glisser (17 et 18). Lis chapitres/13-*.md, étape 10 et ses sous-étapes,
et colle à chaque repère. Les mains : mainStock seulement (c'est sur cette planche qu'un agent avait dessiné des mains à la main).
Garde le même nom de fichier SVG et PNG (images/a-valider/planche-13-40-ferrocerium-tri-bois-flamme.png).` },
  { id: '13-09', sujet: `REFAIRE AU COMPLET la planche 13-09, le briquet à pierre (source images/planches-src/13-09.js ; signalée : l'avant-bras) avec
les repères 1 à 9 que le ch. 13 appelle (lis chapitres/13-*.md, la section du briquet à pierre, et colle à chaque repère). Le skill
dit : la pierre à feu dans le poing, par mainStock. Garde le même nom de fichier (images/a-valider/planche-13-09-briquet-pierre.png).` },
]

const resultats = await pipeline(ITEMS,
  it => agent(`${BASE}\n\nTA PLANCHE : ${it.sujet}\n\nRends le résultat demandé.`, { label: `dessin ${it.id}`, phase: 'Dessiner', schema: RES }),
  async (r, it) => {
    if (!r) return null
    let tour = 0, v = null, cur = r
    while (tour < 3) {
      v = await agent(`Tu es le relecteur d'une planche que tu n'as pas dessinée, pour « Le Manuel du Nord » (/home/user/book). Lis
.claude/skills/planches/references/brief-agent.md et la section « Les planches » de .claude/cadre-agents.md. Regarde le PNG
${cur.png} (Read) à la taille d'impression, puis de près (recadre-le avec python3 PIL dans le scratchpad si besoin) : mains, corps,
matières, feu, bâtons, eau en bleu, légendes. Compare au texte du chapitre qui l'appelle et au sujet demandé :\n${it.sujet}\nConsigne :
« les mains, corps et têtes viennent des moteurs validés ; une main dessinée à la main est un refus ; est-ce qu'un illustrateur
professionnel publierait ça, oui ou non, et quoi corriger ». Corrections précises et faisables, pas de goût vague. Ne modifie rien.`,
        { label: `regard ${it.id} #${tour + 1}`, phase: 'Regarder', schema: VERDICT })
      if (!v || v.oui) break
      const f = await agent(`${BASE}\n\nTA PLANCHE : ${it.sujet}\n\nTu as dessiné cette planche (source ${cur.source}, SVG ${cur.svg}, PNG ${cur.png}).
Le relecteur dit non. Corrige chaque point, rends à nouveau, regarde ton rendu :\n${JSON.stringify(v.corrections, null, 1)}\nRends le résultat
complet (avec les changements de texte et l'ancre, à jour).`, { label: `correction ${it.id} #${tour + 1}`, phase: 'Regarder', schema: RES })
      if (f) cur = f
      tour++
    }
    return { id: it.id, ...cur, regard: v }
  })
return resultats