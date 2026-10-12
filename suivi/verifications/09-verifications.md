> **Renuméroté le 24 septembre 2026** (six tomes) : ancien chapitre 12. Plus bas, les numéros de chapitre sont **les anciens** (table : plan/renumerotation.json).

# Chapitre 12 — Ce qui manque toujours : levée des `[À VÉRIFIER]`

- **Passe du :** 23 septembre 2026
- **Fichier vérifié :** `chapitres/12-ce-qui-manque-toujours.md` (lu, pas modifié)
- **Bilan :** 10 drapeaux — **6 LEVÉS**, **0 CORRIGÉ**, **4 INTROUVABLES**

« LEVÉ » couvre aussi les drapeaux où le texte n'avait **pas** de valeur et où la source en
fournit une : la colonne « à faire » donne alors la valeur à insérer.

| # | Où | Verdict | Source | À faire |
| --- | --- | --- | --- | --- |
| 1 | §5.4, tableau, ligne **Essence**, dernière colonne : « Durée de conservation `[À VÉRIFIER]` : aucune source ministérielle, les chiffres qui circulent sont commerciaux » | **LEVÉ** — valeur fournie par le fabricant : ennuis possibles **en moins de 30 jours** ; **stabilisant** si le bidon n'est pas vidé **dans les 3 mois** ; le stabilisant ne rattrape pas une essence vieillie. Chaleur, humidité, écarts de température et bidon à moitié plein accélèrent | `sources/12-honda-engines-essence-entreposage.md` | « Vider les bidons dans la machinerie au printemps, remplir frais à l'automne, avec du stabilisant mis au remplissage : un bidon qui attend plus de trois mois en a besoin, et le stabilisant ne rattrape pas une essence déjà vieillie. Les ennuis peuvent paraître en moins d'un mois ; la chaleur, l'humidité, les écarts de température et un bidon à moitié vide les accélèrent. » — La rotation automne-printemps dépasse trois mois : sans le stabilisant, elle ne tient pas | ✔ appliqué
| 2 | §5.4, tableau, ligne **Eau de Javel** : « Traiter la bouteille comme périmée à un an tant que le chiffre n'est pas validé `[À VÉRIFIER]` — ch. 13 » | **LEVÉ** — moins d'un an, **gardée à la température de la pièce** | `sources/12-epa-javel-desinfection-urgence.md` | « Date d'achat au marqueur sur la bouteille. Périmée à un an si elle a été gardée à la température de la pièce, plus tôt si elle a eu chaud — ch. 13. » | ✔ appliqué
| 3 | §5.4, tableau, ligne **Bouteille de propane**, fin de la dernière colonne : « Intervalle de requalification `[À VÉRIFIER]` » | **LEVÉ** — valeur fournie : **10 ans** ; interdit de remplir une bouteille périmée | `sources/12-technical-safety-bc-requalification-propane.md` (recoupé par `sources/85-transports-canada-requalification-bouteilles.md`, 10 ans pour la plupart des récipients à pression) | « Requalification aux 10 ans : dix ans après la dernière date estampée au collet, la bouteille ne se remplit plus tant qu'elle n'a pas été requalifiée. » | ✔ appliqué
| 4 | §6, tableau des points de contrôle, ligne **Septembre / Gras disponible pour l'hiver**, colonne cible : « Repère chiffré `[À VÉRIFIER]`, à établir aux ch. 24 et 67 » | **INTROUVABLE** — il n'existe pas de repère fixe : le ch. 24 (§6) le traite en calcul, « gras restant ÷ jours restants ≥ la ration quotidienne calculée » | Aucune nouvelle ; renvoi au ch. 24, §6 | Cible : « Gras en réserve ≥ ration quotidienne de gras de la maisonnée × jours jusqu'au dégel — calcul au ch. 24. » Dit la même chose sans chiffre inventé | ✔ appliqué
| 5 | §8 DANGER, « Un avertisseur silencieux ne prouve rien » : « faits pour ne pas sonner sur une concentration basse tenue longtemps — seuil et délai `[À VÉRIFIER]` — » | **LEVÉ** — à **30 ppm**, l'avertisseur ne doit pas sonner **avant 30 jours** | `sources/14-inspq-avertisseurs-co.md` (déjà au dossier) | « Ces appareils sont faits pour ne pas sonner sur une concentration basse tenue longtemps — à 30 ppm, pas d'alarme avant 30 jours —, et c'est exactement cette concentration-là qui… » (suite inchangée). Aucun numéro de norme | ✔ appliqué
| 6 | §8 DANGER, mal de caribou : « Nausées, diarrhée, faiblesse, puis mort — délai annoncé de 2 à 3 semaines `[À VÉRIFIER]`, voir le chapitre 24. » | **INTROUVABLE** — les trois articles du dossier nomment nausée, diarrhée et mort, **aucun ne donne de délai** ; Ben-Dor 2011 écrit même ne proposer aucune détérioration aiguë | `sources/24-ben-dor-2011-plafond-proteique.md`, `sources/24-bilsborough-mann-2006-plafond-prudent.md`, `sources/24-tushingham-2021-plafond-proteique.md` (déjà au dossier) | **Couper le délai** : « Nausées, diarrhée, faiblesse, puis mort. Voir le chapitre 24. » Le mécanisme porte l'avertissement sans chiffre | ✔ appliqué (« en quelques semaines », décision du 24 septembre)
| 7 | §8 DANGER, salaison sous-dosée : « Le type E, celui du poisson, produit sa toxine dès **3 °C** `[À VÉRIFIER]` » | **LEVÉ** — la croissance des souches non protéolytiques, type E compris, n'est arrêtée qu'**en dessous de 3 °C** | `sources/04-sante-canada-botulisme-type-e.md` ; 14 jours et 9 % : `sources/12-quebec-poisson-fume-botulisme.md` (déjà au dossier) | Retirer le drapeau : « Le type E, celui du poisson, produit sa toxine dès **3 °C** — c'est-à-dire **au réfrigérateur**… » Voir aussi la note A plus bas sur le 9 % de la même phrase | ✔ appliqué (note A comprise)
| 8 | §9.2, « Le sel, par évaporation d'eau du fleuve » : « La salinité au point de puisage est `[À VÉRIFIER]` et varie avec la marée, la crue et la distance au large » | **INTROUVABLE** — aucune page officielle obtenue qui chiffre la salinité de surface de l'estuaire maritime au droit de la Côte-Nord | Aucune | « La salinité au point de puisage varie avec la marée, la crue et la distance au large : on la mesure par évaporation d'un volume connu avant de planifier quoi que ce soit. » La méthode de mesure suffit, et le chiffre changerait d'un puisage à l'autre de toute façon | ✔ appliqué
| 9 | §9.2, « La vitamine C, dans les aiguilles » : « La teneur des aiguilles est `[À VÉRIFIER]` et varie avec l'espèce, la saison et la partie prélevée » | **LEVÉ** — valeur fournie : aiguilles et pousses fraîches de **sapin baumier, 270 mg aux 100 g** ; épinette rouge 169 mg. Aucune valeur pour les aiguilles d'épinette noire ou blanche, rien sur ce qui passe dans la tasse, **rien sur la saison** | `sources/25-durzan-annedda-coniferes.md` (article universitaire évalué par les pairs, déjà au dossier) | « Les aiguilles et pousses fraîches de sapin baumier en contiennent beaucoup, de l'ordre de 270 mg aux 100 g, mais on ne sait pas combien en passe dans la tasse, et la teneur change d'une espèce et d'une partie de l'arbre à l'autre : la dose bue n'est pas connue. » Retirer « la saison », qu'aucune source ne porte | ✔ appliqué
| 10 | §9.2, « La lime, dans le vinaigre » : « Durée du trempage `[À VÉRIFIER]` — à établir sur une vieille lime avant d'y passer la bonne. » | **INTROUVABLE** | Aucune | « Pas de durée fixe : on sort la lime, on la rince et on l'essaie sur un bout d'acier doux à intervalles, et on arrête dès qu'elle mord. Le premier essai se fait sur une vieille lime avant d'y passer la bonne. » Un critère d'arrêt qu'on voit remplace un chiffre qu'on n'a pas | ✔ appliqué

## Notes hors drapeau

**A — Le 9 % de sel du DANGER (ligne 7).** La même phrase dit « sauf au-delà de **9 %** de sel »,
et la phrase suivante que les pourcentages du livre se calculent **toujours sur le poids de la
viande**. Or le 9 % est une **teneur du produit fini** (`sources/12-quebec-poisson-fume-botulisme.md`,
section « Lecture du 9 % »), pas un dosage sur la viande crue. Collées, les deux phrases font
lire 9 % de sel ajouté au poids du poisson, ce qui n'est pas la même quantité. Proposition :
« sauf si le poisson fini contient au moins 9 % de sel — une teneur du produit fini, pas un
dosage sur la viande crue ».

**B — Le tableau de sécurité de `CLAUDE.md`** porte « mortel en 2 à 3 semaines » pour le mal de
caribou. Aucune source du dossier ne donne ce délai (ligne 6). Le chiffre se propage à partir
du tableau, pas d'une source.

**C — Le stabilisant à essence** (ligne 1) est un achat : s'il n'est pas déjà au chapitre
d'achat, il y manque.
