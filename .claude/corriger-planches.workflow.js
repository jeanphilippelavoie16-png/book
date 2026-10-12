export const meta = {
  name: 'corriger-planches',
  description: "Corrige les planches selon la passe qualite (modifs precises par planche), par lots de 10, sans relecture par agent : JP relit",
  phases: [{ title: 'Corrections', detail: 'un dessinateur par planche, lots de 10' }],
}

// JP, 28 septembre 2026 : « Corrige 50 planches, on attaque le reste après. »
// args = [{ ref, chapitre }]. Les modifs de chaque planche sont dans le fichier LISTE (même ref),
// tirées de la passe qualité (images/passe-qualite.md).
const ROOT = 'C:\\Users\\jeanp\\New folder'
const SCR = 'C:/Users/jeanp/AppData/Local/Temp/claude/C--Users-jeanp-New-folder/bed7cfe7-8639-429a-8cfe-5f58e5149259/scratchpad'
const LISTE = SCR + '/args-corrections-50.json'
const BACK = SCR + '/backup-corrections'
const S = { type: 'object', properties: { ref: { type: 'string' }, fichiers: { type: 'array', items: { type: 'string' } }, faites: { type: 'array', items: { type: 'string' } }, pasFaites: { type: 'array', items: { type: 'string' }, description: 'modif non faite et pourquoi' }, ceQueJeVois: { type: 'string' } }, required: ['ref', 'fichiers', 'faites', 'pasFaites', 'ceQueJeVois'] }

const P = (p) => `Planche **${p.ref}** du « Grand Livre du Chalet », un manuel de survie imprimé pour JP et sa famille (Côte-Nord) ; JP va bâtir ou faire ce qu'elle montre sans l'avoir jamais vu. Projet : ${ROOT}. Chapitre : \`chapitres/${p.chapitre}\`.

**Ta mission : corriger cette planche selon la passe qualité.** Dans \`${LISTE}\`, trouve l'entrée dont \`ref\` vaut \`${p.ref}\` : son \`verdict\` (retouches ou a-refaire), les \`regles\` touchées et les \`modifs\`, dans l'ordre d'importance. Ce sont tes consignes. (Le détail de l'examen est aussi dans \`images/passe-qualite/lot-*.md\`.)

Lis la tête de \`.claude/skills/planches/scripts/composer-planche.js\` (jusqu'à \`const fs = require('fs');\`), dans \`.claude/skills/planches/SKILL.md\` les sections « Avant tout » et « Le texte sur la planche », et **\`images/recommandations-planches.md\` en entier : ce sont les exigences de JP**. Mains, personnages, corde et fil : la bibliothèque \`.claude/skills/planches/scripts/formes.js\` (sous \`h.formes\`) ; sa feuille d'essai \`${SCR}/_formes-essai-mains.png\`. Ses points faibles : la prise vue de profil et la pince sur un fil ; préfère la prise vue de dos ou de la paume ; un corps vu de dessus se lit mal.

**Méthode.** Trouve la description : \`images/planches-src/${p.ref}.js\` (ou, pour une page a/b, le fichier du même numéro sans la lettre). **Copie-la d'abord dans \`${BACK}/\`** (crée le dossier). Pour **retouches** : garde le dessin et applique chaque modif, sans rien casser d'autre. Pour **a-refaire** : refais les vues désignées (ou toute la planche si c'est dit), en gardant ce que la liste dit de garder. Aucun chiffre qui ne soit pas dans le chapitre ; **cotes en mm seulement sur ce qu'on construit** ; rien de marqué [À VÉRIFIER] ; aucun mot sur le dessin sauf une cote. Compose avec \`--zones\` puis sans, **ouvre le PNG et regarde**, quatre fois au plus. Le nom du fichier SVG produit doit rester le même qu'avant (des mises en page s'y réfèrent).

Il n'y a pas de relecteur après toi : JP relit. Avant de rendre, vérifie que chaque modif est faite (ou dis pourquoi non), que le montage marcherait pour vrai, que les flèches vont dans le sens du geste et qu'un geste fin se suit sans ambiguïté. Note en une ligne ce que tu as fait à la fin de \`images/passe-qualite/corrections.md\` (« ${p.ref} — … »). Ne touche qu'à ta description, au SVG qu'elle produit et à cette ligne.`

const LOT = 10
const res = []
for (let i = 0; i < args.length; i += LOT) {
  res.push(...await parallel(args.slice(i, i + LOT).map(p => () =>
    agent(P(p), { label: `corriger ${p.ref}`, phase: 'Corrections', schema: S })
      .catch(e => ({ ref: p.ref, erreur: String(e) })))))
}
return res
