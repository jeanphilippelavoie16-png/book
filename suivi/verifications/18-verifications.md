> **Renuméroté le 24 septembre 2026** (six tomes) : ancien chapitre 23. Plus bas, les numéros de chapitre sont **les anciens** (table : plan/renumerotation.json).

# Chapitre 23 — S'organiser à plusieurs : levée des `[À VÉRIFIER]`

- **Passe du :** 24 septembre 2026 (reprise après la coupure du 23 ; aucune fiche 23 n'existait)
- **Fichier vérifié :** `chapitres/23-s-organiser-a-plusieurs.md` (lu, pas modifié)
- **Bilan :** 5 drapeaux — **4 LEVÉS**, **0 CORRIGÉ**, **1 INTROUVABLE**

« LEVÉ » couvre aussi les drapeaux où le texte n'avait **pas** de valeur et où la source en
fournit une : la colonne « à faire » donne alors la valeur à insérer.

| # | Où | Verdict | Source | À faire |
| --- | --- | --- | --- | --- |
| 1 | §3, « Ce qui ne se divise pas » : « Le volume total à puiser, tous usages confondus, est `[À VÉRIFIER]` et se fixe au chapitre 13 » | **LEVÉ** — valeur fournie : réserve « pour au moins trois jours (72 heures), soit : six litres d'eau par personne pour la consommation; six litres d'eau supplémentaires pour la préparation des aliments et l'hygiène personnelle » = **4 L par personne et par jour** (2 + 2) ; recoupé par « environ quatre litres, par personne et par jour » pour « boire, cuisiner et nettoyer » | `sources/23-quebec-reserve-eau-trois-jours.md` ; `sources/13-canada-trousse-urgence.md` (déjà au dossier) | « Le volume total à puiser, tous usages confondus, est d'au moins **4 litres par personne et par jour** — 2 pour boire, 2 pour la cuisine et l'hygiène —, soit **48 litres** pour douze (ch. 13). C'est le plancher d'une trousse de trois jours, pas un budget de camp : le lavage des mains de ce chapitre passe par-dessus. Ce qui compte ici, c'est qu'il se transporte… » (suite inchangée). Voir note A : le ch. 13 porte une erreur sur ce chiffre | ✔ appliqué
| 2 | §5, étape 15 : « pour descendre **le plus rapidement possible à 4 °C ou moins**. Profondeur maximale des contenants : `[À VÉRIFIER]`. » | **INTROUVABLE** — Santé Canada et le MAPAQ disent « shallow containers », « petits contenants », sans aucune profondeur ; Santé Canada ajoute « uncovered », et « Refrigerate once steaming stops » | `sources/23-sante-canada-restes-refroidissement.md` ; `sources/23-quebec-refroidir-rechauffer-decongeler.md` (déjà au dossier) | Couper la phrase et dire la même chose sans chiffre : « …contenants peu profonds, découverts ou couverts lâchement, au froid dès que la vapeur cesse, ou bain d'eau froide ou de neige, pour descendre le plus rapidement possible à 4 °C ou moins. Un chaudron de vingt litres se sépare en plusieurs plats avant de refroidir. » | ✔ appliqué
| 3 | §6, tableau Points de contrôle, ligne **Avant d'accepter le regroupement**, colonne Cible : « Au moins **2 L par personne par jour** pour la boisson seule, plus cuisine et lavage `[À VÉRIFIER]` » | **LEVÉ** — même source que la ligne 1 : 2 L de boisson + 2 L pour la préparation des aliments et l'hygiène = 4 L par personne et par jour | `sources/23-quebec-reserve-eau-trois-jours.md` ; `sources/13-canada-trousse-urgence.md` | « Au moins **4 L par personne par jour** : 2 L de boisson, 2 L de cuisine et d'hygiène — 48 L pour douze » | ✔ appliqué
| 4 | §8 DANGER, bloc 1 : « le type E produit sa toxine dès **3 °C** `[À VÉRIFIER]`, soit aux températures normales d'un réfrigérateur qui fonctionne » | **LEVÉ** — « Inhibition of growth of the non-proteolytic strains of C. botulinum (which includes type E) is accomplished by […] storage temperature to be kept at less than 3°C » | `sources/04-sante-canada-botulisme-type-e.md` (déjà au dossier ; même levée qu'au ch. 12, ligne 7) | Retirer le drapeau : « le type E produit sa toxine dès **3 °C**, soit aux températures normales d'un réfrigérateur qui fonctionne… » | ✔ appliqué
| 5 | §9, « Fondre la neige est la façon la plus chère d'avoir de l'eau » : « La neige est surtout de l'air : il en faut un grand volume pour un litre `[À VÉRIFIER]` » | **LEVÉ** — valeur fournie : la neige fraîche contient de 4 à 10 % d'eau (« a water-to-snow ratio of between 0.04 (4 percent) and 0.10 (10 percent) ») ; « An often-repeated assumption claims a ten-to-one ratio of snow to water, but that is not always accurate » | `sources/13-nsidc-neige-equivalent-en-eau.md` (déjà au dossier) | « La neige est surtout de l'air : il faut de **10 à 25 litres de neige fraîche pour un litre d'eau**, et ce volume se paie en bois, tous les jours, pour douze personnes. » (1 ÷ 0,10 = 10 ; 1 ÷ 0,04 = 25.) La suite sur la glace, plus dense, reste | ✔ appliqué

## Notes hors drapeau

**A — Le chapitre 13 a mal lu la page de Québec.ca.** La fiche
`sources/13-quebec-contamination-penurie-eau-potable.md` et le chapitre 13 (§5, étape 24 ; tableau
des points de contrôle, ligne « Avant l'hiver ») donnent « 6 L pour la consommation plus 6 L pour la
préparation des aliments et l'hygiène personnelle » **par personne et par jour**, soit 12 L, et en
tirent 48 L par jour pour quatre et environ 1 440 L pour un mois. La page dit « pour au moins trois
jours (72 heures) » : c'est **12 L pour trois jours**, donc **4 L par jour** — le même chiffre que
Sécurité publique Canada, et non un second chiffre plus élevé. Pour quatre personnes : 16 L par
jour, 48 L pour 72 heures, environ 480 L pour un mois. L'explication du ch. 13 sur « deux chiffres
officiels qui ne mesurent pas la même chose » tombe. Le ch. 23 renvoie au ch. 13 pour ce volume :
les deux doivent être corrigés ensemble. Détail dans `sources/23-quebec-reserve-eau-trois-jours.md`.

**B — Le « 6 litres par personne » de la trousse (§3).** La phrase « une trousse de 3 jours en
demande 6 litres par personne, soit le même chiffre » est juste pour la **boisson** seule ; la
page « Contamination ou pénurie d'eau potable » de Québec.ca ajoute 6 L pour la cuisine et
l'hygiène sur les mêmes trois jours. Si la phrase reste, elle doit dire
« 6 litres de boisson par personne ». ✔ appliqué
