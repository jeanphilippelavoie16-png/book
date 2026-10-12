> **Renuméroté le 24 septembre 2026** (six tomes) : ancien chapitre 67. Plus bas, les numéros de chapitre sont **les anciens** (table : plan/renumerotation.json).

# Chapitre 67 — Pemmican et graisses : levée des `[À VÉRIFIER]`

- **Passe du :** 24 septembre 2026 (reprise après la coupure du 23 ; les fiches `67-*` du 23 au
  soir sont reprises telles quelles)
- **Fichier vérifié :** `chapitres/67-pemmican-et-graisses.md` (lu, pas modifié)
- **Bilan :** 10 drapeaux — **5 LEVÉS** (lignes 3, 6, 8, 9, 10), **0 CORRIGÉ**, **5 INTROUVABLES** (lignes 1, 2, 4, 5, 7)

Numérotation : ordre d'apparition des dix drapeaux dans le fichier. « LEVÉ » couvre aussi les
drapeaux où le texte disait « pas chiffré » et où la source fournit la valeur ou confirme
l'absence d'équivalence : la colonne « à faire » donne alors la phrase à mettre.

| # | Où | Verdict | Source | À faire |
| --- | --- | --- | --- | --- |
| 1 | §1 En une ligne : « …pour une durée que borne le rancissement du gras et que ce livre ne chiffre pas (`[À VÉRIFIER]`). » | **INTROUVABLE** — aucune source officielle ne donne de durée de garde pour un gras fondu ou un pemmican à la température ambiante (ni la page « Durée de conservation des aliments », retrouvée à sa nouvelle adresse, ni l'outil Thermoguide+ du MAPAQ, ni l'ACIA, ni l'Encyclopédie canadienne). Le **mécanisme** est sourcé : ce qui accélère le rancissement, c'est **la lumière, la chaleur et l'oxygène** ; plus un aliment sec est gras, plus il rancit ; contenant hermétique et opaque | `sources/67-mapaq-thermoguide-plus-rancissement.md` (+ la page et les données du Thermoguide+ enregistrées) ; `sources/67-quebec-entreposage-securitaire-des-aliments.md` | Dire la même chose sans chiffre et avec le mécanisme : « …se gardent sans froid, sans électricité et sans contenant spécialisé, aussi longtemps que le gras ne rancit pas — et ce sont la lumière, la chaleur et l'air qui le font rancir. » Retirer le drapeau ✔ appliqué |
| 2 | §5 étape 5 « Fondre à feu doux » : « Le point de fumée du suif d'orignal et du gras d'ours n'est pas chiffré ici (`[À VÉRIFIER]`). » | **INTROUVABLE** — aucune source officielle ni technique sérieuse obtenue ne donne le point de fumée du suif d'orignal ni du gras d'ours ; le tableau de la Sécurité incendie du Québec ne contient aucun gras animal fondu. (Pour le suif de bœuf, les valeurs qui circulent viennent de sites commerciaux et d'une encyclopédie en ligne sans référence : non retenues.) Le **130 °C du beurre** est confirmé et reste la borne prudente | `sources/67-quebec-securite-incendie-feu-dhuile.md` (130 °C, tableau sans gras animal) | Couper la phrase qui porte le drapeau ; le signal suffit : « **La borne n'est pas un chiffre, c'est un signal : dès qu'un gras fume, il est au-dessus de son point de fumée.** Le gras le plus fragile, le beurre, fume à **130 °C** : conduire la fonte comme si le gras d'orignal fumait au même endroit, quitte à ce que ce soit prudent pour rien. » ✔ appliqué |
| 3 | §5 étape 16, « Le test de la cassure en est un substitut d'usage, **pas un équivalent mesuré** (`[À VÉRIFIER]`). » | **LEVÉ** — le seuil **a\_w ≤ 0,85** est confirmé (produit de viande séché, peu importe le pH). Aucune source ne relie un test de pliage à une valeur d'a\_w : le critère de fin de séchage recommandé pour la maison est lui-même un critère de pliage (« craque sans casser »), sans a\_w. La phrase du livre dit donc exactement l'état des connaissances | `sources/67-acia-viandes-fermentees-et-sechees.md` (0,85) ; `sources/67-nchfp-test-de-la-cassure.md` (critère de pliage, aucune a\_w) | Retirer le drapeau : « Le seuil réel, **a\_w ≤ 0,85**, ne se mesure pas au chalet. Le test de la cassure le remplace à l'usage sans lui être équivalent : c'est pour ça qu'on casse une bande du **centre**, et que dans le doute tout le lot retourne au séchoir. » ✔ appliqué |
| 4 | §5 étape 19 « Lier » : « Le rapport en poids entre la viande séchée et le gras n'est pas chiffré ici (`[À VÉRIFIER]`) : c'est ce critère-là qui décide. » | **INTROUVABLE** pour un rapport **en poids**. Le pemmican de la traite se faisait à **parts égales** de viande en poudre et de gras fondu (« an equal amount » en anglais), sans que la source dise si c'est au poids ou au volume. Le critère du livre est confirmé par une recette traditionnelle crow : on verse le gras « jusqu'à ce qu'il y en ait assez pour former une boule », et « ces ingrédients ne se mesurent pas » | `sources/67-encyclopedie-canadienne-pemmican.md` (+ version anglaise enregistrée `67-encyclopedie-canadienne-pemmican-en.html`) ; `sources/67-montana-recettes-traditionnelles-pemmican.md` (+ le PDF) | « Le pemmican de la traite se faisait à parts égales de viande en poudre et de gras ; c'est un point de départ, pas une mesure. C'est le critère d'arrêt qui décide — la recette crow ne mesure rien non plus : on verse jusqu'à ce que la masse tienne en boule. » Retirer le drapeau ✔ appliqué |
| 5 | §6 tableau, ligne « Fonte, en continu », cible : « la seule valeur de repère disponible est le point de fumée du beurre, **130 °C** ; celui du suif d'orignal est `[À VÉRIFIER]` » | **INTROUVABLE** — comme la ligne 2 | Comme la ligne 2 | Cible : « **Aucune** fumée. Repère : le beurre fume à 130 °C ; conduire le gras d'orignal comme s'il fumait au même endroit » ✔ appliqué |
| 6 | §6 tableau, ligne « Fin de séchage, par claie » : « **Casse net**, ne plie pas. Équivalent visé : **a\_w ≤ 0,85**, non mesurable ici `[À VÉRIFIER]` » | **LEVÉ** — même constat que la ligne 3 | Mêmes fiches que la ligne 3 | Cible : « **Casse net**, ne plie pas. Vise a\_w ≤ 0,85, qui ne se mesure pas ici : la cassure en tient lieu, sans équivalence » ✔ appliqué |
| 7 | §8 DANGER, point 1 (feu de gras) : « pour mémoire, le beurre fume à **130 °C**, et le point de fumée du suif d'orignal n'est pas chiffré ici (`[À VÉRIFIER]`). » | **INTROUVABLE** — comme la ligne 2. Voir aussi la note B sur la phrase qui précède | Comme la ligne 2 | « …pour mémoire, le beurre fume dès **130 °C**. Couvercle et extincteur à portée du bras avant d'allumer, pas après (ch. 7, 15, 16). » — couper la mention du suif ✔ appliqué |
| 8 | §8 DANGER, point 4 : « **la toxine botulique ne change ni l'odeur, ni le goût, ni l'apparence de l'aliment** `[À VÉRIFIER]` » | **LEVÉ** — « Le botulisme n'altère pas la couleur, l'odeur ou le goût des aliments. » La couleur est la part de l'apparence que la page nomme | `sources/67-sante-canada-botulisme-odeur-gout.md` (reconsultée le 23 ; même phrase que `64-sante-canada-conserves-botulisme.md`) | Retirer le drapeau, phrase inchangée ✔ appliqué |
| 9 | §9, « Ce qui ne se remplace vraiment pas », puce « La mesure de l'activité de l'eau » : « Le test de la cassure est un substitut d'usage, pas un équivalent mesuré (`[À VÉRIFIER]`). » | **LEVÉ** — même constat que la ligne 3 | Mêmes fiches que la ligne 3 | Retirer le drapeau, phrase inchangée : « Le test de la cassure est un substitut d'usage, pas un équivalent mesuré. Dans le doute, la bande retourne au séchoir… » ✔ appliqué |
| 10 | §9, puce « Le gras » : « Le délai avant que ça tourne mal n'est pas chiffré ici (`[À VÉRIFIER]`, ch. 24) — ce n'est pas une raison de le croire long. » | **LEVÉ** — valeur fournie, avec sa nature : récits de première main de l'explorateur Stefansson, dont une expérience sous supervision médicale (hôpital Bellevue, 1928), pas une observation clinique moderne. Sur du caribou qui gardait un peu de gras (derrière les yeux, dans la moelle) : malades **pendant la deuxième ou troisième semaine**. Sur une viande **vraiment maigre** : malade **le deuxième jour**. Ailleurs : **diarrhée en une semaine à dix jours**, qui ne cède qu'au gras ; **mort après plusieurs semaines**. Le gras a guéri en deux ou trois jours. Le « 2 à 3 semaines » qui circule est donc le délai **avant de tomber malade**, pas avant de mourir | `sources/24-stefansson-1936-delais-mal-de-caribou.md` (+ `24-stefansson-1936-adventures-in-diet.html`) ; `sources/21-speth-spielmann-1983-stefansson-mal-de-caribou.md` (déjà au dossier) | « Plus la viande est maigre, plus ça va vite : sur du caribou qui gardait un peu de gras, on tombe malade au bout de deux ou trois semaines ; sur de la viande vraiment maigre, dès le deuxième jour. La diarrhée ne cède qu'au gras, et sans gras la mort suit en quelques semaines. » ✔ appliqué |

## Notes hors drapeau

**A — Le gras ranci n'est pas dangereux, selon le MAPAQ.** Le chapitre traite le gras ranci comme
immangeable (§7 : « Le gras n'est plus un aliment » ; §9 : « Il ne se rattrape pas » ; même
consigne au ch. 42, §7). Le Thermoguide+ du MAPAQ dit l'inverse sur le risque : un aliment rance
« peut entraîner des symptômes digestifs mineurs, mais ne présente aucun risque pour la santé »
(`sources/67-mapaq-thermoguide-plus-rancissement.md`). Dans un livre où **le manque de gras tue**
(mal de caribou, §9 puce « Le gras »), jeter un gras ranci quand il n'y en a pas d'autre est la
mauvaise décision. Proposition pour la §7 : « Le gras rance a mauvais goût et peut déranger
l'estomac, mais il ne rend pas malade. S'il y a d'autre gras, il va au savon et aux chandelles
(ch. 89) ; s'il n'y en a pas, il se mange. » Même correction au ch. 42, §7, ligne « Gras jauni,
cassant ». Ne vise pas la ligne « Pemmican devenu brun foncé ou noir », qui peut aussi être un
gras surchauffé.

**B — « Le gras s'enflamme tout seul au-delà de son point de fumée » (§8 point 1).** Le point de
fumée n'est pas le point où le gras s'enflamme : c'est là qu'il commence à se décomposer, et il
doit encore chauffer avant de prendre feu. La fiche `67-quebec-securite-incendie-feu-dhuile.md`
le dit ainsi : un gras qui fume est « sur le chemin de l'auto-inflammation ». Aucune température
d'auto-inflammation n'a été trouvée. Proposition sans chiffre : « Un gras qui fume continue de
chauffer, et il finit par s'enflammer tout seul, sans étincelle ni flamme au contact. »

**C — Ganglions dans le gras de cervidé.** La vérification du ch. 42 (ligne 5) établit que les
ganglions qui restent après le désossage sont dans le tissu adipeux et que la consigne MDC les
vise (`sources/42-sac-mdc-aliments-traditionnels.md`). Le §5 étapes 1 à 3 (parage du gras de
rognon d'orignal) devrait porter la même phrase : le gras de cervidé se pare de ses ganglions avant
d'aller au chaudron.

**D — Le délai du mal de caribou (ligne 10) touche aussi le tableau de `CLAUDE.md`**, qui porte
« mortel en 2 à 3 semaines » : selon Stefansson, deux ou trois semaines, c'est le délai **avant
de tomber malade** sur du caribou un peu gras, pas le délai avant la mort
(`sources/24-stefansson-1936-delais-mal-de-caribou.md`). Même constat que la note B de
`12-verifications.md`.
