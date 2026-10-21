export const meta = {
  name: 'carte-carcasse-62',
  description: "Documente a la source puis dessine les planches de la carte de la carcasse de l'orignal (ch. 62) : repères osseux, regions, et chaque morceau de 62-04 a 62-19",
  phases: [
    { title: 'Documentation', detail: 'sources d anatomie et de decoupe enregistrees, fiches par planche' },
    { title: 'Base', detail: 'la silhouette commune de la carcasse et la carte d ensemble 62-02' },
    { title: 'Morceaux', detail: 'une planche par morceau, lots de 10' },
    { title: 'Chapitre', detail: 'renvois et placements' },
  ],
}

// JP, 29 septembre 2026, sur la colonne « Planche » du ch. 62 : « Fais les planches, prends le temps de les
// faire comme il faut, je veux que ça soit bien documenté. »
const ROOT = 'C:\\Users\\jeanp\\New folder'
const SCR = 'C:/Users/jeanp/AppData/Local/Temp/claude/C--Users-jeanp-New-folder/bed7cfe7-8639-429a-8cfe-5f58e5149259/scratchpad'
const DOC = 'suivi/62-documentation-planches.md'
const TETE = `Tu travailles sur « Le Manuel du Nord », un manuel de survie imprimé pour JP et sa famille (Côte-Nord). Projet : ${ROOT}. **CLAUDE.md est dans ton contexte et prime** (règle 1 : aucun chiffre inventé, la source est enregistrée dans \`sources/\` avant d'écrire). Chapitre visé : \`chapitres/62-carte-de-la-carcasse.md\` (la carte de la carcasse de l'orignal : régions, morceaux, muscles, grain, destination). **Écris au fur et à mesure.**`
const S_DOC = { type: 'object', properties: { planches: { type: 'array', items: { type: 'object', properties: { ref: { type: 'string' }, titre: { type: 'string' }, profondeur: { type: 'boolean' } }, required: ['ref', 'titre', 'profondeur'] } }, sources: { type: 'array', items: { type: 'string' } }, references: { type: 'array', items: { type: 'string' } }, limites: { type: 'array', items: { type: 'string' } } }, required: ['planches', 'sources', 'references', 'limites'] }
const S1 = { type: 'object', properties: { fichiers: { type: 'array', items: { type: 'string' } }, ceQueJeVois: { type: 'string' }, sourcesUtilisees: { type: 'array', items: { type: 'string' } }, laisseDeCote: { type: 'array', items: { type: 'string' } } }, required: ['fichiers', 'ceQueJeVois', 'sourcesUtilisees', 'laisseDeCote'] }
const S_CH = { type: 'object', properties: { fichiers: { type: 'array', items: { type: 'string' } }, fait: { type: 'string' }, pagesTome4: { type: 'number' } }, required: ['fichiers', 'fait'] }

const DOCUMENTER = `${TETE}

**Ta mission : documenter à la source, avant tout dessin, les planches de la carte de la carcasse.** JP les veut « bien documentées » : les dessinateurs ne dessineront que ce que tu auras établi et enregistré.

1. **Lis le ch. 62 en entier** et \`suivi/62-redaction.md\` (surtout la section « Corrections du 29 septembre 2026 » : des renvois aux planches 62-02, 62-03, 62-04, 62-21 et 62-23 ont été retirés parce qu'elles n'existaient pas ; dis pour chacune si elle mérite d'être faite). La colonne « Planche » des tableaux 5.1 à 5.4 renvoie à 62-04 à 62-19 : une planche par morceau.
2. **Cherche et enregistre les sources** (WebSearch et WebFetch, chargés par ToolSearch « select:WebSearch,WebFetch ») : guides de découpe de l'orignal, du cerf et du caribou d'organismes publics et d'universités (services de vulgarisation d'Alaska, du Wyoming, du Colorado, du Québec, fédérations de chasseurs), cartes des coupes du bœuf avec les noms des muscles (USDA et universités ; le bœuf est la référence la mieux documentée, et la position des muscles est la même chez les ruminants), atlas d'anatomie vétérinaire du domaine public (Sisson, *The Anatomy of the Domestic Animals*, 1910-1914, planches du bœuf). Enregistre chaque page dans \`sources/62-*.md\` (organisme, URL, date, extraits intégraux). **Aucune adresse courriel dans les requêtes.**
3. **Images de référence pour les dessinateurs** : télécharge, sous licence vérifiée (domaine public, CC, agences américaines ; règles de CLAUDE.md, section Les images), les figures qui montrent le squelette d'un ruminant de profil, les muscles superficiels et profonds du membre postérieur et antérieur, et les coupes de découpe. Range-les dans \`images/references/62/\` avec un \`registre.md\` (source, licence, ce que montre chaque figure). Elles ne vont pas dans le livre : elles servent à dessiner juste.
4. **Écris \`${DOC}\`** : pour chaque planche à faire, ce qu'elle doit montrer — les repères osseux qui bornent la région, la position du ou des muscles sur la carcasse (vue de côté et, au besoin, de l'intérieur), les **coutures** (membranes) que le couteau suit pour sortir le morceau entier, la forme du morceau une fois sorti et le **sens du grain**, ce que le chapitre en dit — avec la source de chaque affirmation et la figure de référence à regarder. Ce qui n'est pas établi à la source est marqué comme tel et **ne se dessine pas**.
5. **Écris une fiche par planche** dans \`${SCR}/fiches/62-XX.md\` (modèle : \`${SCR}/fiches/80-40.md\`), qui renvoie à la section de \`${DOC}\`. Prévois une **carte d'ensemble 62-02** (la carcasse de profil, les cinq régions du tableau 5.1, les repères osseux), puis les morceaux 62-04 à 62-19, et 62-03, 62-21, 62-23 seulement si le chapitre en a besoin.

Ne dessine rien. Réponds avec la liste des planches (ref, titre, profondeur), les sources, les références téléchargées et ce qui n'a pas pu être établi.`

const BASE = `${TETE}

**Ta mission : la base commune des planches de la carcasse, puis la carte d'ensemble 62-02.** Lis \`${DOC}\` en entier, regarde les figures de \`images/references/62/\`, et la fiche \`${SCR}/fiches/62-02.md\`. Lis la tête de \`.claude/skills/planches/scripts/composer-planche.js\` (jusqu'à \`const fs = require('fs');\`), dans \`.claude/skills/planches/SKILL.md\` « Avant tout » et « Le texte sur la planche », et **\`images/recommandations-planches.md\` en entier** (les exigences de JP).

1. **Une silhouette commune** de la carcasse d'orignal, de profil, dans \`images/planches-src/_carcasse-orignal.js\` : un module que les planches des morceaux importeront (\`require('./_carcasse-orignal')\`) pour que toutes aient **la même carcasse, à la même échelle** : contour, os repères (bassin, fémur, rotule, tibia, jarret ; omoplate, humérus, coude ; colonne, côtes, sternum), et les contours des régions et des muscles établis dans la documentation, chacun exposé par son nom pour être mis en valeur (trame ou gris) sur une planche. Proportions d'orignal justes, d'après les références.
2. **La planche 62-02**, la carte d'ensemble : la carcasse de profil, les cinq régions du tableau 5.1 numérotées dans l'ordre du chapitre, les repères osseux qui les bornent. Propre, lisible d'un coup d'œil ; aucune cote (on ne construit rien).
Compose avec \`--zones\` puis sans, **ouvre le PNG et regarde**, cinq fois au plus. Note dans \`${DOC}\` (section « Base commune ») comment utiliser le module.`

const MORCEAU = (p) => `${TETE}

**Planche ${p.ref} — ${p.titre}.** Lis \`${DOC}\` (la section de ta planche et la « Base commune »), ta fiche \`${SCR}/fiches/${p.ref}.md\`, et regarde les figures de référence qu'elle nomme dans \`images/references/62/\`. Lis la tête de \`.claude/skills/planches/scripts/composer-planche.js\` (jusqu'à \`const fs = require('fs');\`), dans \`.claude/skills/planches/SKILL.md\` « Avant tout » et « Le texte sur la planche », et **\`images/recommandations-planches.md\` en entier**. Regarde la carte d'ensemble déjà faite (\`images/planche-62-02*.svg\` rendu en PNG) pour garder le même style.

**Dessine-la en partant de la silhouette commune** (\`require('./_carcasse-orignal')\` dans \`images/planches-src/${p.ref}.js\`) : (1) où est le morceau sur la carcasse, mis en valeur, avec les repères osseux ; (2) le chemin du couteau le long des coutures, avec une flèche dans le sens du geste ; (3) le morceau une fois sorti, avec le sens du grain et, s'il y en a, le nerf ou la lame à retirer. **Rien qui ne soit établi dans la documentation** : si un détail n'y est pas, il ne se dessine pas (dis-le dans « laisseDeCote »). Aucune cote : on ne construit rien. Six renvois au plus par vue ; aucun mot sur le dessin. Compose avec \`--zones\` puis sans, **ouvre le PNG et regarde**, quatre fois au plus. Il n'y a pas de relecteur après toi : JP relit. Ne touche qu'à ta description et à son SVG.`

const CHAP = (refs) => `${TETE}

**Ta mission : relier les planches nouvelles au chapitre.** Planches faites : ${refs.join(', ')} (\`images/planche-62-*.svg\`).
1. Dans le ch. 62, les renvois de la colonne « Planche » doivent correspondre aux planches faites ; un renvoi vers une planche qui n'existe pas se retire. Remets les renvois retirés le 29 septembre (\`suivi/62-redaction.md\`) si la planche existe maintenant (62-02 : « Les repères osseux qui bornent ces régions sont à la planche 62-02 »). Avec Edit.
2. Pose chaque planche dans \`design/epreuves-livre/placements-tome-4.json\` (clé « 62 », format des autres chapitres ; « apres » = début exact du paragraphe ou de la ligne de tableau qui en parle ; pour un tableau, le paragraphe qui le précède ou le suit). Vérifie que le JSON se lit et que chaque « apres » se retrouve mot pour mot.
3. Réassemble le tome 4 (\`python design/outils/assembler-tome.py 4\`), vérifie qu'il reste sous 440 pages, remets le compte dans PAGES de \`design/directions/1-manuel-de-terrain/outils/build_couvertures_6.py\` et relance \`outils/rendre_couvertures_6.sh\` si la tranche change (tableau de \`sources/blurb-specifications.md\`).
4. Note tout à la fin de \`suivi/62-redaction.md\`.`

phase('Documentation')
const doc = await agent(DOCUMENTER, { label: 'documentation de la carcasse', phase: 'Documentation', schema: S_DOC })
const planches = (doc && doc.planches || []).filter(p => p.ref && p.ref !== '62-02')

phase('Base')
const base = await agent(BASE, { label: 'base commune et carte 62-02', phase: 'Base', schema: S1 }).catch(e => ({ erreur: String(e) }))

phase('Morceaux')
const res = []
for (let i = 0; i < planches.length; i += 10) {
  res.push(...await parallel(planches.slice(i, i + 10).map(p => () =>
    agent(MORCEAU(p), { label: `dessin ${p.ref}`, phase: 'Morceaux', schema: S1 })
      .then(d => ({ ref: p.ref, ...d })).catch(e => ({ ref: p.ref, erreur: String(e) })))))
}

phase('Chapitre')
const faites = ['62-02', ...res.filter(r => !r.erreur).map(r => r.ref)]
const chap = await agent(CHAP(faites), { label: 'chapitre 62 et tome 4', phase: 'Chapitre', schema: S_CH }).catch(e => ({ erreur: String(e) }))
return { doc, base, morceaux: res, chap }
