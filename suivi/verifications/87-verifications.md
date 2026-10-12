> **Renuméroté le 24 septembre 2026** (six tomes) : ancien chapitre 14. Plus bas, les numéros de chapitre sont **les anciens** (table : plan/renumerotation.json).

# Chapitre 14 — Sans propane : levée des `[À VÉRIFIER]`

- **Passe du :** 24 septembre 2026
- **Fichier vérifié :** `chapitres/14-sans-propane.md` (lu, pas modifié)
- **Drapeaux :** 5

« LEVÉ » couvre aussi les drapeaux où le texte n'avait **pas** de valeur et où la source en
fournit une : la colonne « à faire » donne alors la valeur à insérer. Les lignes sont écrites au
fil de la passe.

| # | Où | Verdict | Source | À faire |
| --- | --- | --- | --- | --- |
| 1 | §4, tableau Matériel, ligne **Thermomètre de réfrigérateur et de congélateur**, colonne Substitution : « un pot de saumure saturée, qui gèle bien plus bas que l'eau douce `[À VÉRIFIER — température de congélation d'une saumure saturée]` » | **LEVÉ** — valeur fournie : une saumure de sel ne reste pas liquide **sous -21 °C** (point eutectique, 23,3 % de sel) ; plus salée, elle ne fige pas plus haut, elle **dépose du sel** en refroidissant. **Conséquence pour la phrase :** un congélateur à -18 °C ne fige pas ce pot. Liquide ne veut donc pas dire « congélateur en panne » : seul « figé » dit quelque chose (on est passé sous -21 °C) | `sources/14-fhwa-saumure-point-eutectique.md` (+ copie HTML) | « Pour le congélateur, un pot de saumure saturée : elle ne fige que sous -21 °C. Figée, la caisse est descendue jusque-là ; liquide, on ne sait rien de plus que « au-dessus de -21 °C », puisqu'un congélateur en bon ordre, à -18 °C, la laisse liquide aussi. Le sel qui se dépose au fond en refroidissant n'est pas du gel. C'est un seuil, pas un thermomètre. » ✔ appliqué |
| 5 | §9, « Le froid et l'eau », « Le froid vient de dehors » : « une saumure saturée gèle à une température nettement inférieure à celle de l'eau douce `[À VÉRIFIER — point de congélation d'une saumure saturée]`. Deux pots donnent deux seuils. » | **LEVÉ** — même valeur : **-21 °C** ; en dessous, « only a mixture of ice and solid salt ». Une saumure moins salée fige plus haut (20 % de sel : -17,8 °C) | idem ligne 1 | « … dit si on est descendu sous -21 °C, parce qu'une saumure de sel ne peut pas rester liquide plus bas. Deux pots donnent deux seuils, 0 °C et -21 °C. » Dans une caisse à neige dehors, c'est le froid de l'air qui fige le second pot : il dit « il a fait sous -21 °C », pas « la viande est à -18 °C » ✔ appliqué |
| 3 | §8 DANGER, point 3 : « Le **botulisme de type E** produit sa toxine dès **3 °C** `[À VÉRIFIER — chiffre tiré du tableau de sécurité du projet, page officielle à enregistrer au ch. 72]` » | **LEVÉ** — la croissance des souches non protéolytiques, type E compris, n'est arrêtée que par un entreposage « gardé en deçà de 3 °C » ; le poisson fumé prêt à manger se garde à 4 °C ou moins, ce qui n'est pas sous 3 °C | `sources/42-sante-canada-poisson-fume-botulisme-type-e.md` (version française) ; `sources/04-sante-canada-botulisme-type-e.md` (déjà au dossier) | Retirer le drapeau et sa parenthèse : « Le **botulisme de type E** produit sa toxine dès **3 °C**, c'est-à-dire aux températures normales d'un réfrigérateur qui fonctionne. » Aucune page à enregistrer au ch. 72 : elle l'est déjà ✔ appliqué |
| 2 | §5, étape 6, « Peser ce qui reste » : « La masse à vide est estampée sur le collet de la bouteille, en général sous la mention `TW` `[À VÉRIFIER — abréviation à confirmer sur les bouteilles du chalet]` » | **LEVÉ** — « Tare weight shall be abbreviated "TW" » : masse de la bouteille **valve comprise**, bouchon amovible exclu, marquée à -3 %/+1 % près. Deux pièges à côté : **MW** (masse **sans** la valve) et **WC** (capacité en eau, **pas** une masse à vide) | `sources/14-ecfr-marquage-tw-bouteilles-propane.md` (+ copie HTML) — texte officiel américain, retenu pour le sens de l'abréviation seulement ; Transports Canada ne la décrit pas | « La masse à vide, valve comprise, est frappée sur le collet sous la mention `TW`. Ne pas la confondre avec `WC`, qui est la capacité en eau, ni avec `MW`, qui est la masse sans la valve. Masse actuelle moins masse à vide, pesées dans la même unité, égale propane restant (une livre = 0,454 kg). » La méthode qui suit (peser une fois pleine et vide) reste, et devient la vérification du marquage ✔ appliqué |
| 4 | §9, « Dehors : le foyer et ce qui remplace le bouton », « La cuisson à l'étouffée dans les braises » : « enfouis sous un lit de braises et de cendre, une à trois heures selon la pièce `[À VÉRIFIER]` » | **INTROUVABLE** — aucune source officielle ne chiffre une durée de cuisson sous la braise ; elle dépend de la pièce, de son épaisseur et de la chaleur du lit, qu'aucun chiffre général ne fixe | Aucune | Dire la même chose sans le chiffre, et donner le vrai critère : « … enfouis sous un lit de braises et de cendre, le temps qu'il faut selon la pièce et le feu : c'est la sonde plantée au cœur qui dit quand c'est cuit, 74 °C pour le gibier, 70 °C pour le poisson. C'est la méthode la plus économe en bois, et la moins contrôlable. » ✔ appliqué |

**Bilan : 5 drapeaux — 4 LEVÉS, 0 CORRIGÉ, 1 INTROUVABLE.**

## Notes hors drapeau

**A — Le pot de saumure du §4 et du §9 ne dit pas ce que le texte lui fait dire pour un
congélateur.** Liquide à -18 °C comme à -5 °C, il ne distingue pas un congélateur en bon ordre
d'un congélateur qui remonte. Il ne sert qu'à savoir qu'on est passé **sous -21 °C**. Si le
chapitre veut un seuil utile au congélateur, la source en donne un : une saumure à **20 %** de sel
fige vers **-17,8 °C** (`sources/14-fhwa-saumure-point-eutectique.md`, tableau 7). Mais un 20 %
se dose au poids, sur une balance, et le tableau est donné pour du sel commercial : c'est un
choix d'éditeur, pas une correction de drapeau.

**B — Le 70 °C du poisson** (ligne 4) vient de `sources/53-quebec-poisson-cru-congelation-parasites.md`
et de `sources/53-mapaq-thermoguideplus-poissons.md` : un poisson qui n'atteint pas 70 °C à cœur
compte comme cru.
