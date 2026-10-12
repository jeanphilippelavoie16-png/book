export const meta = {
  name: 'refaire-29-08-pictogrammes',
  description: "Refait la planche 29-08 (les epaules qui bloquent) en pictogrammes de carte de securite, sans silhouette realiste",
  phases: [{ title: 'Planche', detail: 'un dessinateur' }],
}
const ROOT = 'C:\\Users\\jeanp\\New folder'
const SCR = 'C:/Users/jeanp/AppData/Local/Temp/claude/C--Users-jeanp-New-folder/bed7cfe7-8639-429a-8cfe-5f58e5149259/scratchpad'
const S = { type: 'object', properties: { fichiers: { type: 'array', items: { type: 'string' } }, ceQueJeVois: { type: 'string' } }, required: ['fichiers', 'ceQueJeVois'] }
phase('Planche')
return await agent(`Planche **29-08** du « Grand Livre du Chalet » (manuel de survie imprimé, noir au trait) : « Les épaules qui bloquent : les deux premiers essais ». Projet : ${ROOT}. Chapitre : \`chapitres/29-la-sante-des-femmes.md\` (Grep « épaules », puis Read avec offset/limit). Description actuelle : \`images/planches-src/29-08.js\` ; copie-la d'abord dans \`${SCR}/backup-corrections/29-08-avant-pictogrammes.js\`.

**JP a regardé la version actuelle : « la femme enceinte est laide en tabarnak ».** Mannequin chauve, ventre énorme, bras et jambes mal proportionnés. Lis \`images/recommandations-planches.md\` en entier, surtout la **règle 8, nouvelle** : un corps entier dans une position se dessine en **pictogramme de carte de sécurité d'avion** — formes pleines ou au trait épais, géométriques, tête ronde sans visage, membres en bandes arrondies d'épaisseur égale, articulations nettes, aucune anatomie, aucun sein, ventre arrondi simple — ou pas du tout (gros plan sur la seule région qui compte).

**Refais la planche en entier dans ce style**, en gardant ce qu'elle doit apprendre (les renvois actuels et le chapitre) : (1) à quatre pattes, la tête du bébé tenue et la traction droite et douce dans l'axe ; (2) sur le dos, fesses au bord du lit, genoux ramenés vers les épaules, l'aide qui appuie juste au-dessus de l'os du pubis (pas sur le ventre), la traction. Les positions doivent être justes et se lire d'un coup d'œil : proportions d'adulte (tête ≈ 1/7 de la hauteur), cuisses et bras de longueur correcte. La tête du bébé : un simple rond, à sa place. Une aide (autre pictogramme, d'une autre valeur de gris ou au trait) seulement si le chapitre en parle. Aucun chiffre qui ne soit pas dans le chapitre ; aucun mot sur le dessin sauf les renvois. Garde le même nom de fichier SVG (\`images/planche-29-08-epaules-qui-bloquent-deux.svg\`).

Lis la tête de \`.claude/skills/planches/scripts/composer-planche.js\` (jusqu'à \`const fs = require('fs');\`) pour la syntaxe. Compose avec \`--zones\` puis sans, **ouvre le PNG et regarde**, cinq fois au plus : il faut que ce soit propre et juste, pas seulement « moins laid ». Ajoute une ligne à \`images/passe-qualite/corrections.md\` (« 29-08 — refaite en pictogrammes (règle 8) »). Ne touche à rien d'autre.`, { label: 'refaire 29-08 en pictogrammes', phase: 'Planche', schema: S })
