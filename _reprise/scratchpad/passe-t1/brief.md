# Brief commun : la grande passe sur le tome 1

Projet : « Le Grand Livre du Chalet », livre privé de JP, dépôt `/home/user/book`, branche
`claude/adoring-goldberg-jqjbx1`. Manuel de survie imprimé en 8 × 10 po. Écris en français québécois, court.

JP a relu le livre et a donné ses règles au fil de sa lecture du 15 octobre 2026. Deux chapitres ont servi de
modèles et il les a approuvés :
- **le chapitre 10** (`chapitres/10-eau-puiser-filtrer-desinfecter.md`), modèle de chapitre ordinaire (« le
  chapitre sur l'eau est bon ») ;
- **le chapitre 4** (`chapitres/04-retombees-radioactives.md`), modèle de chapitre d'urgence (« c'est presque
  parfait ») : trois séries orange en ouverture de procédure, un logigramme de décision en double page, les
  planches appelées dans le texte.

JP veut maintenant **la même passe sur tout le tome 1**, et seulement le tome 1, pour en refaire une relecture
de validation. Plusieurs agents se partagent les chapitres ; tu as les tiens dans ton message de lancement.

## À lire avant le premier chapitre

1. `CLAUDE.md`, en entier : toutes les règles de JP du 15 octobre y sont (« Pas de fils d'la AI », le livre
   ouvert, les premières minutes en orange, les planches appelées dans le texte).
2. Le skill `ecriture` (`.claude/skills/ecriture/SKILL.md`), en entier : la méthode, les tableaux de ce qui sort,
   le réel de l'urgence, la répétition, le script de contrôle. **C'est lui qui fait la passe.**
3. Les deux modèles, ch. 10 et ch. 4 : lis-les pour voir le niveau voulu. Lis aussi `suivi/04-redaction.md` pour
   voir comment les faits ajoutés ont été sourcés.
4. `plan/premieres-minutes-inventaire.md` : l'inventaire des gestes urgents. Pour chacun de tes chapitres, il dit
   si la série orange existe, ce qui lui manque et ce qu'il faut vérifier.
5. Pour le marqueur orange : `### Titre {.orange}` (voir les ch. 1, 3 et 4 ; la convention est en tête de
   l'inventaire).
6. Pour le logigramme : `design/outils/logigramme.py`, et l'exemple `images/logigrammes/04-retombees.json`.

## Pour chaque chapitre

1. **Garde l'original** : `git show HEAD:chapitres/NN-….md > <scratch>/NN-avant.md` (le scratch :
   `/tmp/claude-0/-home-user-book/80bb7558-6215-51c7-adfd-516cb7afea55/scratchpad/passe-t1/`).
2. **La passe du skill `ecriture`**, complète : phrases, mots, tirets, répétition, ce qui marche plutôt que ce qui
   ne marche pas, un avertissement une seule fois, le livre ouvert (ni « village », ni Baie-Comeau, ni JP, ni
   l'âge de ses enfants), le réel de l'urgence. Rien de technique ne disparaît.
3. **Si le chapitre a un geste urgent** (l'inventaire le dit) : la procédure s'ouvre sur sa série des premières
   minutes, marquée `{.orange}`, complétée selon l'inventaire. Ce qui manque s'écrit à partir des procédures
   reconnues (JP : « il existe déjà des procédures »), vérifiées à des sources solides (WebSearch, WebFetch ou
   curl : l'accès Internet est ouvert). **Le contenu des procédures, pas la forme des guides du gouvernement.**
   Chaque page qui sert s'enregistre dans `sources/` (même format que les fiches existantes) et la provenance se
   note dans `suivi/NN-redaction.md`. Aucun chiffre sans source ; `[À VÉRIFIER]` sinon.
4. **Si l'urgence se décide en branches** (où on est, qui est là, ce qu'on a, quand partir), fais son
   **logigramme en double page**, comme celui du ch. 4 : premier geste en deux questions au plus, renvois aux
   étapes du chapitre réécrit, rien d'inventé, `python3 design/outils/logigramme.py images/logigrammes/NN-….json`
   (plus `--sans-entete --svg` pour la version du livre, comme `04-retombees-livre.svg`). Regarde le PNG. Si
   l'urgence ne se décide pas en branches, pas de logigramme : dis-le.
5. **Les planches** : chaque planche du chapitre (`images/validees/planche-NN-*`, `images/a-valider/`, ancrages
   dans `design/epreuves-livre/placements-tome-1.json`) est appelée dans le texte, « (planche NN-NN) », dans le
   paragraphe d'ancrage. Si la passe coupe ou change une phrase d'ancrage, propose le nouvel ancrage.
6. **Le contrôle** : `python3 .claude/skills/ecriture/scripts/controle.py chapitres/NN-….md --avant <original>`.
   Tout ce qu'il signale se règle ou se justifie dans ton rapport.

## Les ancrages et les placements

N'édite PAS `design/epreuves-livre/placements-tome-1.json` : plusieurs agents travaillent en même temps. Écris tes
propositions dans `passe-t1/ancrages-<ton-lot>.json`, au format
`{"NN": {"planches": [{"id": "NN-NN", "apres": "…"}], "logigramme": {"fichier": "images/logigrammes/NN-…-livre.svg", "apres": "…", "orange": true}}}`
(ne mets que ce qui change ou s'ajoute). Le coordonnateur fusionne.

## Les règles

- Ne touche qu'à tes chapitres, à leurs logigrammes (`images/logigrammes/NN-*`), à `sources/` et à leurs fiches
  `suivi/NN-redaction.md`. Pas de script partagé, pas de CSS, pas d'assembleur, pas de planche.
- Ne remonte pas le tome.
- Pas de commit, pas de push.
- Garde les fins de ligne et les deux lignes techniques du haut (`# Chapitre NN — …` et `*Tome 1 — …*`).

## Ton rapport

Pour chaque chapitre :
- les mots et les tirets, avant et après ;
- la série orange (faite, complétée ou absente, et pourquoi) avec les faits ajoutés et leurs sources ;
- le logigramme (le chemin du PNG, ou pourquoi il n'y en a pas) ;
- les appels de planches ;
- ce que `controle.py` signale encore, et pourquoi c'est voulu ;
- les faits dont tu doutes.
