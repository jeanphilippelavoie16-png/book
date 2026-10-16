# Brief commun : les planches qui manquent au livre

Projet : « Le Grand Livre du Chalet », livre privé de JP, dépôt `/home/user/book`, branche
`claude/adoring-goldberg-jqjbx1`. Manuel de survie imprimé en 8 × 10 po. Écris en français québécois, court.

Le 15 octobre 2026, un inventaire de tout le livre a relevé les choses que le texte apprend à fabriquer,
monter, réparer ou manier et qu'aucune planche ne montre. Il a aussi relevé des planches existantes qui ne
montrent pas l'essentiel. JP a dit go pour les priorités haute et moyenne et pour les planches à refaire.
Neuf agents se partagent la liste, par chapitres. Tu as la tienne dans ton message de lancement.

## Le cadre obligatoire

Lis d'abord `.claude/skills/planches/references/brief-agent.md` et applique-le : les mains, corps et têtes
viennent des moteurs validés, jamais d'un dessin à la main ; second regard avant de livrer.

## À lire avant la première planche

1. `CLAUDE.md`, en entier.
2. Le skill `planches` (`.claude/skills/planches/SKILL.md`), en entier : le critère, la charte, la
   méthode, la composition.
3. Le skill `dessin-notice` (`.claude/skills/dessin-notice/SKILL.md`) dès qu'il y a un corps, une main
   ou une tête. **Une main laide ne s'imprime pas.**
4. Le skill `ecriture` (`.claude/skills/ecriture/SKILL.md`) pour tout texte de planche : renvois,
   légende, encadré. Aucun tiret, rien d'évident, ce qui marche plutôt que ce qui ne marche pas.
5. `images/recommandations-planches.md` : les remarques de JP sur les planches.
6. Les lignes de ta liste dans `images/audit-planches/tomes-*.md`. Chaque ligne dit où est le texte, ce
   que la planche doit montrer et pourquoi le texte ne suffit pas. Les planches à refaire sont dans la
   section « … à refaire … » du même fichier.

## Pour chaque planche

1. **Lis le passage du chapitre**, en entier. Le chapitre est la seule source du geste, des mesures et
   des cotes. Une cote qui n'est pas dans le chapitre ne s'invente pas : dessine sans cote et note-le.
   Si un fait manque pour dessiner juste (par exemple la forme exacte d'un montage), cherche-le dans une
   source solide (WebSearch, WebFetch : l'accès Internet est ouvert), enregistre la page dans `sources/`
   et note la provenance dans `suivi/NN-redaction.md`. Sinon `[À VÉRIFIER]` dans ton rapport, pas dans
   le dessin.
2. **Une planche neuve** prend le prochain numéro libre du chapitre (regarde `images/planches-src/`,
   `images/validees/`, `images/a-valider/`). **Une planche à refaire** garde son numéro.
3. Écris la source `images/planches-src/<ref>.js` et compose :
   `node .claude/skills/planches/scripts/composer-planche.js images/planches-src/<ref>.js`
   (si le rendu PNG échoue à cause de `TMPDIR`, lance-le avec `env -u TMPDIR`). Un « dur » du vérificateur
   se corrige toujours. Vérifie aussi `xmllint --noout` sur le SVG. Les ids commencent par `vue-`.
4. **Regarde le PNG** à la taille de la page, puis en gros plan (PIL ×2). La planche doit se lire au
   premier coup d'œil par quelqu'un qui n'a pas lu le chapitre. Quatre tours au plus.
5. **Range** le PNG dans `images/a-valider/` sous son nom. Pour une planche refaite, fais `git rm` de
   l'ancien PNG dans `images/validees/` (ce seul fichier), sinon l'ancienne gagne au montage.
6. **L'appel dans le texte** : dans le chapitre, ajoute « (planche NN-NN) » dans le paragraphe où la
   planche sert, et rien d'autre. Ne réécris pas le chapitre.
7. **L'ancrage** : n'édite PAS `design/epreuves-livre/placements-tome-*.json` (plusieurs agents en
   même temps). Écris ta proposition dans
   `/tmp/claude-0/-home-user-book/80bb7558-6215-51c7-adfd-516cb7afea55/scratchpad/planches-lot/ancrages-<ton-lot>.json`,
   au format `{"NN": [{"id": "NN-NN", "apres": "début exact du paragraphe qui appelle la planche"}]}`.
   Le paragraphe d'ancrage est celui de l'appel : la planche doit s'imprimer près de son appel.

## Les règles

- Ne touche qu'aux chapitres de ta liste (l'appel seulement), à leurs planches, à `sources/` et à `suivi/`
  pour ce qui sert à tes planches. Pas de script partagé (`.claude/skills/planches/scripts/`, `design/`).
- Ne remonte aucun tome.
- Pas de commit, pas de push (le coordonnateur commite).
- Garde les fins de ligne des fichiers.

## Ton rapport

Pour chaque planche : le chemin du PNG, ce qu'elle montre en deux lignes, ce que tu as dû laisser sans cote
ou à vérifier, la source ajoutée s'il y en a. À la fin : ce qui reste faible, honnêtement.

## Le niveau de qualité (JP, 15 octobre 2026, après le premier lot)

Sur la 04-42, les deux mains qui tiennent le sable et l'argile : « c'est butcher, ça. Faisons les choses comme il
faut. » Le niveau voulu est celui d'une notice de montage professionnelle : chaque trait est sûr, chaque vignette
se lit seule, rien n'est approximatif.

- **Une main ou un corps qui n'est pas net ne s'imprime pas.** Avant d'en dessiner un, demande-toi si la vignette
  en a besoin. Souvent, l'objet seul suffit : le boudin d'argile posé sur la planche, entier ou cassé ; l'outil dans
  sa position, avec un renvoi qui dit la prise. Sinon, suis `dessin-notice` à la lettre (modèles décalqués), et
  préfère le gros plan des doigts au corps entier.
- **Mieux vaut trois vignettes impeccables que six approximatives.** Une vignette faible fait paraître toute la
  planche amateur.
- **Avant de ranger une planche dans `a-valider/`**, regarde chaque vignette à 100 %, puis en gros plan ×2, et pose
  la question : un illustrateur technique professionnel signerait-il ça ? Si non, refais-la ou enlève-la.
- **Repasse aussi ce que tu as déjà rangé** avec cet œil-là, et refais ce qui ne passe pas.
