> **Renuméroté le 24 septembre 2026** (six tomes) : ancien chapitre 62. Plus bas, les numéros de chapitre sont **les anciens** (table : plan/renumerotation.json).

# Chapitre 62 — Le sel : levée des `[À VÉRIFIER]`

- **Passe du :** 24 septembre 2026
- **Fichier vérifié :** `chapitres/62-le-sel.md` (lu, pas modifié)
- **Drapeaux :** 4

« LEVÉ » couvre aussi les drapeaux où le texte n'avait **pas** de valeur et où la source en
fournit une : la colonne « à faire » donne alors la valeur à insérer. Les lignes sont écrites au
fil de la passe.

| # | Où | Verdict | Source | À faire |
| --- | --- | --- | --- | --- |
| 1 | Bloc D, étape 21 : « Avec une teneur déclarée de 6,25 % `[À VÉRIFIER — la teneur se lit sur le sac ; le livre ne la pose pas comme une constante]`, la formule donne 20 ÷ 6,25 = **3,2 g** » | **LEVÉ** — la « Poudre de Prague » est un mélange préparé à **6,25 % de nitrite de sodium**. Calcul refait : 200 ppm × 1 kg ÷ (10 × 6,25) = 3,2 g par kilogramme de viande, juste | `sources/61-acia-nitrites-salpetre.md` (même page ACIA que `62-acia-nitrites-saumurage.md`, déjà au dossier) | « Avec la poudre de Prague, qui contient 6,25 % de nitrite de sodium, la formule donne 20 ÷ 6,25 = **3,2 g de mélange par kilogramme de viande**. Un autre mélange a une autre teneur, et elle se lit sur le sac. **C'est la formule qui est la règle, pas le 3,2.** » ✔ appliqué |
| 3 | §9, « Tirer du sel du fleuve », « Premier étage : le gel » : « Il y a une limite basse au-delà de laquelle le sel se met à geler avec l'eau au lieu de rester dans la saumure `[À VÉRIFIER — la température où ça se produit]` » | **LEVÉ** — valeur fournie : **vers -21 °C** (point eutectique du sel, 23,3 %) ; en dessous, « only a mixture of ice and solid salt ». Valeur du chlorure de sodium pur : l'eau de mer porte d'autres sels, l'ordre de grandeur vaut, pas la décimale. **Et le même tableau donne ce que la phrase ne dit pas** : à chaque température, la saumure ne peut pas devenir plus salée que celle qui gèle à cette température — 10 % de sel à -6,7 °C, 15 % à -11,1 °C, 20 % à -17,8 °C | `sources/14-fhwa-saumure-point-eutectique.md` (+ copie HTML) | « Il y a une limite basse : vers -21 °C, le sel gèle avec l'eau au lieu de rester dans la saumure. Avant elle, c'est le froid qui fixe jusqu'où on peut concentrer : la saumure qui reste liquide à -11 °C porte environ 15 % de sel, à -18 °C environ 20 %, et pas plus. Plus le froid est franc, plus le bac travaille. En pratique, on arrête de gagner quand la croûte devient franchement salée au goût. » ✔ appliqué |
| 2 | Bloc E, étape 26 : « Faute de calcul, la fourchette du chapitre d'achat […] : **5 à 10 kg pour la famille** `[À VÉRIFIER]` » | **INTROUVABLE** — aucune source ne donne une quantité de sel « par famille » ; la quantité dépend de la viande et du poisson traités, et c'est précisément ce que l'étape 25 calcule | Aucune | **Couper l'étape 26** et renuméroter, ou la réduire à : « Faute de calcul, on n'a pas de chiffre : le calcul de l'étape 25 se fait avant l'achat, sur la plus grosse année de prélèvement qu'on prévoit. » La même fourchette porte le même drapeau au chapitre d'achat (`00b-acheter-par-priorite.md`, ligne « Sel sans additif ») : elle y sort aussi, et la ligne garde la formule qu'elle donne déjà (« le poids de viande à traiter × le pourcentage de la méthode, doublé ») ✔ appliqué (étape 26 réduite, pas de renumérotation ; `00b` hors de cette passe) |
| 4 | §9, « Récupérer et réparer au lieu de racheter », « La balance se répare » : « une balance qui lit hors de sa plage de température `[À VÉRIFIER — la plage de fonctionnement des balances domestiques]` : on la rentre une heure au chaud avant de la condamner » | **INTROUVABLE** — aucune fiche de fabricant de balance de cuisine n'a pu être obtenue (pages produits d'Escali, My Weigh, OXO, Ohaus, Taylor, Etekcity : 403 ou 404 le 24 septembre 2026) | Aucune | Dire la même chose sans la plage : « Et une balance qu'on croit folle par grand froid est souvent seulement une balance trop froide : on la rentre une heure au chaud avant de la condamner. » Le geste suffit ; la plage exacte se lit dans le feuillet de la balance qu'on a, s'il existe encore ✔ appliqué |

**Bilan : 4 drapeaux — 2 LEVÉS, 0 CORRIGÉ, 2 INTROUVABLES.**

## Note hors drapeau

**A — Le rendement du sel du fleuve.** Le chapitre d'achat (ligne « Sel sans additif ») et le
ch. 63 (§9.5) disent que le livre n'a « aucune valeur de salinité pour l'estuaire ». Elle existe
au dossier : **27 g/L** de sels dissous en face de Pointe-au-Père, **29 g/L** dans le golfe
(`sources/13-universite-laval-salinite-saint-laurent.md`). Le ch. 62 porte la même phrase,
sans drapeau, au §9, « Ce qui ne se remplace pas, dit net » (« le livre n'a aucune valeur de salinité pour l'estuaire au large de la
Côte-Nord ») : elle se corrige de la même façon (voir `53-verifications.md`, ligne 11, et
`63-verifications.md`). ✔ appliqué (§9, « Le bois, si on évapore au feu seul » : 27 à 29 g/L,
bien plus de 35 L par kilo ; chapitre d'achat hors de cette passe)
