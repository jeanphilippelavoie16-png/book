# Reprise dans une nouvelle session — Le Manuel du Nord

Ce dossier est le projet de JP tel qu'il était le 29 septembre 2026, sorti de son ordinateur
(`C:\Users\jeanp\New folder`) pour être repris ailleurs. Lis dans cet ordre :

1. `CLAUDE.md` — les règles du livre. Elles priment sur tout.
2. `_reprise/memoire/` — la mémoire des sessions précédentes (`MEMORY.md` est l'index). À relire en
   entier : ce sont les préférences et les corrections de JP.
3. `suivi/plan-de-match.md` — le plan maître ; la section « ⏸ PAUSE du 28 septembre … COMMENT
   REPRENDRE » en tête dit où on en est.
4. `images/recommandations-planches.md` — les exigences de JP pour les planches (règles 1 à 8).

## Ce qui est fait

114 chapitres écrits et vérifiés, six tomes assemblés (332 / 416 / 334 / 298 / 438 / 200 pages),
couvertures faites, photos posées, passe qualité des planches faite (`images/passe-qualite.md`),
19 corrections de planches sur 50, planches documentées du ch. 62 (carte de la carcasse) faites et
texte aligné.

## Ce qui reste (coût indicatif en jetons)

1. **31 corrections de planches** sur les 50 demandées : liste `_reprise/scratchpad/args-corrections-reste.json`,
   consignes par planche dans `_reprise/scratchpad/args-corrections-50.json` ; workflow
   `.claude/corriger-planches.workflow.js`. ≈ 3,5 M.
2. **29-08 et 89-05b en pictogrammes** (règle 8) : script dans
   `_reprise/workflows-session/refaire-29-08-pictogrammes-wf_972130b5-acd.js` (le `resumeFromRunId` ne
   marche que dans la session d'origine : relancer à neuf). Si JP aime le style, l'étendre aux autres
   planches à corps entier (ch. 29, 24-01, 37-07, 38-01). ≈ 0,5 M, puis ≈ 1,5 M.
3. **Règle de la photo seule à côté d'une colonne vide** (`design/choix.md`, 29 sept.) à appliquer aux
   six tomes, en commençant par le pékan, page 51 du tome 3. ≈ 0,8 M.
4. **Les 220 retouches restantes de la passe qualité.** ≈ 20 M.
5. **Réassemblage final** des six tomes et des couvertures. ≈ 0,5 M.
   **Le tome 5 est à 438 pages sur 440.**

Deux questions ouvertes au ch. 62 : la palette reste en saumure (le ch. 69 s'en sert) — à faire
confirmer par JP ; le haut de surlonge (tableau, « salaison si le gras de couverture est laissé en
place ») n'a pas de grain établi à la source : proposition faite à JP de couper « ou salaison ».

Ce qui revient à JP : relire les planches dans les pages, valider les couvertures (nouvelles 4es des
tomes 1 à 4), une photo à lui du brout d'orignal, l'ISBN à l'envoi chez Blurb, et une épreuve papier
du tome 6 avant les six.

## Les chemins à traduire

Les workflows de `.claude/*.workflow.js` et les scripts du scratchpad portent les chemins de
l'ordinateur de JP. Dans cette copie :

| Chemin d'origine | Ici |
| --- | --- |
| `C:\Users\jeanp\New folder` (ROOT) | la racine de ce dossier |
| `C:/Users/jeanp/AppData/Local/Temp/claude/C--Users-jeanp-New-folder/bed7cfe7-8639-429a-8cfe-5f58e5149259/scratchpad` (SCR) | `_reprise/scratchpad` |
| `C:\Users\jeanp\.claude\projects\C--Users-jeanp-New-folder\memory` | `_reprise/memoire` |

**Le scratchpad a été vidé par le ménage du dossier temporaire de Windows** entre le 29 septembre et le
12 octobre : tous ses fichiers ont disparu (les sauvegardes des planches d'avant correction aussi). Ceux qui servent ont été
refaits le 12 octobre, avec le même calcul, à partir des journaux des workflows :

- `args-corrections-50.json` — les 50 planches les plus urgentes de la passe qualité, avec pour chacune
  `verdict`, `regles` et `modifs` (les consignes du dessinateur).
- `args-corrections-reste.json` — les 31 qui restent : 64-08 12-01b 84-02 24-03 12-06b 45-02 12-05a
  70-09 90-02b 10-02 45-01b 29-01 12-06a 59-08 75-40 89-01b 29-02 29-04 59-09 24-16 74-11 83-40 97-04
  111-40 27-01 13-40 60-10a 82-12b 95-10 76-03 88-05. (Faites : 29-05 29-07 45-01a 96-07 26-40 29-08
  50-10 60-40 37-07 89-03 89-05b 26-08 90-07b 37-01b 90-02a 12-03 90-03 30-40 97-02.)
- `passe-qualite-toutes.json` — les 270 planches de la passe qui ne sont pas « bonnes », triées par
  urgence (les 50 premières sont celles ci-dessus ; les 220 suivantes, le chantier 4).
- `rendre-corrigees.sh <refs>` — refait le PNG d'une planche corrigée dans `images/validees/` ou
  `images/a-valider/`, là où il était. À lancer depuis la racine.
- `_formes-essai-mains.png` (citée par le prompt de correction) est perdue : la refaire avec
  `images/planches-src/_formes-essai-mains.js`.

Les outils : Node (planches : `.claude/skills/planches/scripts/composer-planche.js`, rendu PNG par
`rendre-planche.js`, qui cherche Microsoft Edge en mode headless — remplacer par Chromium ailleurs),
Python 3 (assemblage : `python design/outils/assembler-tome.py N`, mise en page design C dans
`design/variantes-couleur/outils/`), polices dans `design/polices/`.

## Ce qui n'est pas dans le ZIP, parce que ça se régénère

- `livre/tome-N/interieur.pdf`, `apercus/` et `travail/` : `python design/outils/assembler-tome.py N`
  les refait (le `rapport.md` et la couverture de chaque tome sont gardés).
- Les vieilles épreuves de `design/epreuves-livre/` (C, 10, 13, 13-C et leurs PDF) ; les
  `placements*.json` sont gardés.
- **ZIP « essentiel » seulement** : aucune image matricielle ni PDF (photos, rendus PNG des planches,
  PDF des sources). Les SVG des planches, leurs descriptions `images/planches-src/*.js`, les registres
  et les sources en texte y sont. La liste des fichiers laissés de côté est dans
  `_reprise/fichiers-absents.txt`. Pour réassembler les tomes, il faut le ZIP « complet ».

## Les règles de travail avec JP (en plus de CLAUDE.md)

- Tout ce qui est refait s'envoie à JP en image (PNG/JPG) pour validation, au fur et à mesure.
- Donner le coût avant de lancer un gros chantier. JP met en pause quand il manque de jetons et dit
  « reprends » pour repartir.
- Planches : pas de relecture par agent, JP relit lui-même.
- Téléchargements d'images : seulement sous licence vérifiée à la source ; User-Agent
  `GrandLivreDuChalet/1.0 (livre personnel)` ; **aucune adresse courriel dans les en-têtes**.
- Il parle québécois, direct ; répondre en français, court.

## Le dépôt

Ce projet est le dépôt privé `jeanphilippelavoie16-png/book` depuis le 12 octobre 2026. Le dossier de
JP sur son PC (`C:\Users\jeanp\New folder`) en est une copie de travail. Ce qui se fait dans le cloud se
committe et se pousse sur une branche ; JP le ramène sur son PC avec un `git pull`. Les gros fichiers
qui se régénèrent sont exclus par `.gitignore`.
