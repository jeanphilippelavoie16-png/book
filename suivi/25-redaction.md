> **Renuméroté le 24 septembre 2026** (six tomes) : ancien chapitre 03. Plus bas, les numéros de chapitre sont **les anciens** (table : plan/renumerotation.json).

# Suivi de rédaction — Chapitre 3, Le froid lui-même

- **Fichier :** `chapitres/03-le-froid-lui-meme.md`
- **Tome :** 1 — Tenir
- **Rédigé le :** 2026-09-20
- **Longueur :** environ 4 830 mots utiles pour les sections 1 à 9, plus 560 mots d'appareil
  de sources (section 10). Environ 7 pages en 8 × 10 sans les images.
- **Statut :** RÉD. À envoyer en parallèle au vérificateur technique (rôle 3) et au
  vérificateur sécurité (rôle 4).
- **⚠ RELECTURE HUMAINE EXTERNE OBLIGATOIRE** — marquée en tête du fichier chapitre et
  détaillée à la section 10.

---

## 1. Chiffres marqués `[À VÉRIFIER]` ou à confirmer

| # | Valeur | Où | Pourquoi ça bloque |
| --- | --- | --- | --- |
| 1 | Déshabillage paradoxal en hypothermie avancée | Section 7, tableau des signes d'échec | Seul élément du chapitre portant la mention `[À VÉRIFIER]` dans le corps du texte. Phénomène décrit dans la littérature médicale, non retrouvé dans les sources officielles consultées (CCHST, CSST, Quebec.ca, WMS 2019). Le garder ou le couper est une décision du relecteur médical |
| 2 | Bain de réchauffement à **37-39 °C**, environ **30 minutes**, seuil de **2 h** de distance des soins | Étapes 18 à 21 | Vient de la Wilderness Medical Society, pas d'une source gouvernementale canadienne. Le texte intégral 2011 a été lu ; la mise à jour 2024 n'a pas pu être téléchargée (HTTP 403 chez SAGE). Les valeurs sont identiques dans le résumé 2024. À confirmer sur le texte 2024 et à contresigner par le relecteur médical |
| 3 | **Ibuprofène 12 mg/kg/jour en 2 prises, max 2 400 mg/jour** | Étape 21 | Dose adulte des lignes directrices WMS. **Aucune dose pédiatrique n'est donnée dans le chapitre** — le texte renvoie au ch. 29. À faire valider par un pharmacien avant que le ch. 29 sorte, parce que les enfants de 4 et 6 ans sont le public du livre |
| 4 | **40 % et plus** de perte de chaleur par la tête (CSST 2011, p. 8) | **Non repris** dans le chapitre | Chiffre contesté dans la littérature physiologique récente. Le chapitre dit de couvrir la tête sans donner de pourcentage. Si le vérificateur technique veut le réintroduire, il faut une source plus récente qu'une brochure de 2011 |
| 5 | « L'eau soutire la chaleur **25 fois** plus vite que l'air » | **Non repris** dans le chapitre | Chiffre très répandu, absent du TP 511 de Transports Canada (recherche plein texte du PDF). Le mécanisme est décrit sans chiffre, avec la conduction du CCHST. Si quelqu'un veut le chiffre, il faut trouver l'étude d'origine |
| 6 | Seuil d'avertissement de froid extrême **pour la Côte-Nord** | **Non repris** dans le chapitre | ECCC donne « environ -45 » pour la majeure partie du Canada et « -50 environ » pour le nord du Québec, sans nommer la Côte-Nord. La page générale des avertissements ne donne aucun chiffre régional. À demander directement à ECCC, ou à laisser tomber |
| 7 | Régime travail-réchauffement et seuils d'habillement (16, 4, 2, -1, -7, -17,5, -24 °C ; tableau des pauses) | Section 5, tableaux du froid | Tirés de la **3e édition (2011)** de *Travailler au froid !*. La CNESST annonce une **4e édition (2024, DC200-16182-9)** avec « un nouveau tableau indiquant les dangers du refroidissement éolien ». Le PDF de la 4e édition n'était pas téléchargeable le 2026-09-20 (404). **À comparer avant impression** |

Tous les autres chiffres du chapitre portent leur source entre parenthèses dans le texte et sont
reproduits verbatim dans `/sources`.

## 2. Sources enregistrées

| Fichier | Organisme | URL | Consultée |
| --- | --- | --- | --- |
| `sources/03-environnement-canada-refroidissement-eolien.md` | Environnement et Changement climatique Canada | https://www.canada.ca/fr/services/environnement/meteo/conditionsdangereuses/indice-refroidissement-eolien.html | 2026-09-20 |
| `sources/03-cnesst-travail-au-froid.md` | CSST / CNESST, *Travailler au froid !*, 3e éd. 2011 | https://www.foretprivee.ca/wp-content/uploads/2014/01/Travailler-au-froid-CSST.pdf | 2026-09-20 |
| `sources/03-cchst-effets-du-froid-premiers-soins.md` | CCHST (fédéral), fiche modifiée 2025-01-19 | https://www.cchst.ca/oshanswers/phys_agents/cold/cold_health.html | 2026-09-20 |
| `sources/03-quebec-hypothermie.md` | Gouvernement du Québec | https://www.quebec.ca/sante/problemes-de-sante/a-z/hypothermie | 2026-09-20 |
| `sources/03-quebec-monoxyde-de-carbone.md` | Gouvernement du Québec | https://www.quebec.ca/sante/conseils-et-prevention/sante-et-environnement/prevenir-les-intoxications-au-monoxyde-de-carbone | 2026-09-20 |
| `sources/03-transports-canada-eau-froide.md` | Transports Canada, TP 511, éd. 2026 | https://tc.canada.ca/sites/default/files/2026-07/tp-511-guide-nautique-2026-FR-acc.pdf | 2026-09-20 |
| `sources/03-wms-gelures.md` | Wilderness Medical Society (2011, mise à jour 2024) | https://www.wildmedcenter.com/uploads/5/9/8/2/5982510/wms_frostbite.pdf | 2026-09-20 |
| `sources/03-wms-hypothermie.md` | Wilderness Medical Society (2019) | https://www.wildmedcenter.com/uploads/5/9/8/2/5982510/wms_hypothermia_2019.pdf | 2026-09-20 |

Chaque fichier contient l'URL, la date de consultation et l'extrait intégral qui porte le
chiffre, pas seulement le lien.

## 3. Images requises

| # | Description | Cadrage voulu | Format |
| --- | --- | --- | --- |
| 1 | **Planche de l'enveloppe hypothermique.** Les cinq couches, numérotées comme les étapes 7 et 8 : matelas isolant au sol, sac de couchage fermé, bouteilles d'eau chaude aux aisselles / poitrine / haut du dos, pare-vapeur, tuque avec visage dégagé | Dessin au trait, coupe latérale d'une personne couchée, vue de dessus en médaillon. Étiquettes courtes en bout de ligne de rappel. Les bras montrés **hors** des zones chauffées, pour que l'interdit se voie | Pleine page |
| 2 | **Séquence du 1-10-1.** Trois cases : 1 min, tête hors de l'eau, respiration qu'on ralentit ; 10 min, mains qui ne ferment plus ; 1 h, position fœtale | Dessin au trait, personnage en plan taille dans l'eau, ligne d'eau constante d'une case à l'autre, chronomètre en coin | Demi-page |
| 3 | **Séquence du sauvetage sur glace.** Trois cases : la personne ressort par où elle est entrée ; elle progresse couchée ; le sauveteur reste couché en retrait et tend une perche | Dessin au trait, vue de trois quarts arrière, le trou toujours au même endroit dans les trois cases | Demi-page |
| 4 | **Séquence du bain de gelure.** Trois photos : thermomètre de cuisson dans l'eau du chaudron ; une main immergée qui ne touche pas les parois ; le pansement fini avec gaze entre les doigts | Photo, lumière du chalet, cadrage serré sur le chaudron et la main, thermomètre lisible à l'échelle de la page. **Mise en scène, pas de vraie gelure** | Demi-page |
| 5 | **La trousse froid du chalet, à plat.** Bâche pliée, sac de couchage, deux bouteilles à large goulot, thermomètre de cuisson, détecteur de CO, jeu de vêtements secs en sac étanche, gaze | Photo à plat, éclairage égal, fond de bois, objets alignés dans l'ordre du tableau de la section 4 | Quart de page |
| 6 | **Gelure superficielle vs gelure profonde.** Deux vues côte à côte : peau pâle, dure en surface et molle dessous ; peau blanche cireuse dure en profondeur | Photo médicale ou planche dessinée. **Licence à vérifier** — viser Wikimedia Commons filtré par licence, planche du domaine public d'avant 1930, ou agence fédérale américaine. Inscrire auteur, licence et lien dans `images/credits.md` | Quart de page |

## 4. Renvois vers d'autres chapitres

| Chapitre | Raison du renvoi |
| --- | --- |
| 2 — Rester ou partir | La décision d'évacuer commande l'étape 18 (dégeler ou garder gelé) |
| 4 — Panne majeure d'Hydro en janvier | Cas d'usage principal du chapitre : le chalet qui refroidit avec quatre personnes dedans |
| 7 — Des enfants de 4 et 6 ans | Séquence F ; rythme de rentrée forcée |
| 14, 15, 16, 18 — Sans propane, poêles, feu, éclairage | Sources de CO nommées dans l'encadré danger |
| 19 — Communiquer et savoir | Appel satellite : c'est ce qui définit « à plus de deux heures des soins » |
| 20 — Se déplacer et le carburant | Moteur au ralenti pour se réchauffer, échappement bloqué par la neige |
| 24 — Le mal de caribou | Rappel obligatoire : viande maigre seule, mortel en 2 à 3 semaines |
| 25 et 30 — Scorbut, plantes médicinales | Thuyone du cèdre : boisson chaude au sapin baumier ou à l'épinette, jamais au thuya |
| 26 et 67 — Ce qu'un corps demande l'hiver, pemmican et graisses | Le frisson brûle du glycogène ; c'est le gras qui tient l'hiver |
| 27 — Soigner quand il n'y a personne | Cadre général des soins sans secours |
| 29 — Bâtir la pharmacie | Ibuprofène et dose pédiatrique |
| 31 — Ce qu'on ne peut pas soigner | Nécrose installée, perte de tissu, amputation |
| 54 — Pêche blanche | Glace, trou, perche et corde au bord de la talle |
| 81 — Coudre et chausser | Bottes, bas, semelles de feutre, prévention du pied d'immersion |

Tous vérifiés contre la liste des 89 chapitres. Aucun renvoi à un chapitre inexistant.

## 5. Relecteur humain requis

**Médecin d'urgence ou paramédic en soins primaires avec pratique documentée en milieu isolé**
(médecine de région éloignée, sauvetage en milieu sauvage, ou service préhospitalier de la
Côte-Nord).

Doivent être signés nommément :

1. la classification clinique de l'étape 3 et ses bornes de température ;
2. les deux encadrés DANGER de la section 8 ;
3. le protocole de bain à 37-39 °C des étapes 19 à 21 ;
4. la règle du regel de l'étape 18, y compris le choix d'accepter une perte de tissu ;
5. la conduite de réanimation de l'étape 14 ;
6. la variante d'urgence de la section 9, qui est la partie la plus éloignée des protocoles
   hospitaliers.

## 6. Notes pour l'éditeur et le metteur en pages

- **Tension assumée entre deux familles de sources.** Le CCHST et la CSST écrivent pour un
  milieu de travail où l'ambulance vient : « ne pas réchauffer sur place », « consulter un
  médecin ». La WMS écrit pour un patient qu'on ne peut pas évacuer. Le chapitre suit la
  logique canadienne officielle pour l'hypothermie et la logique de milieu isolé pour la
  gelure, et il le dit ouvertement à la section 10. Ne pas lisser cette tension sans l'avis du
  relecteur médical : c'est la seule partie du chapitre où deux autorités ne disent pas la même
  chose.
- **Deux encadrés DANGER, pas trois.** Le regel d'une gelure et le pied d'immersion coûtent des
  tissus, pas la vie : ils sont traités dans la procédure avec leur mécanisme, hors encadré.
  Seuls le réchauffement brutal d'une hypothermie et le monoxyde de carbone ont leur encadré.
- **Le chapitre porte trois rappels du tableau de sécurité de CLAUDE.md** : génératrice jamais
  dans un bâtiment, un garage ou sous un auvent (encadré CO) ; viande maigre seule = mal de
  caribou, mortel en 2 à 3 semaines (section 5) ; thuyone du cèdre toxique, sapin baumier ou
  épinette pour les infusions (section 5). Ne pas les couper sous prétexte qu'ils sont déjà
  ailleurs dans le livre.
- **Trois tableaux longs** dans la section 5 (refroidissement éolien, travail-réchauffement,
  seuils de température). En grille 2 colonnes, ils vont probablement demander une pleine
  largeur. Le tableau du refroidissement éolien est le plus consulté des trois : candidat à
  reprendre en annexe ou en 4e de couverture intérieure.
- **Redites à surveiller** quand les chapitres 4, 14, 16 et 20 seront écrits : le paragraphe sur
  le monoxyde de carbone va se recouper avec eux. Décision proposée : le mécanisme complet
  reste ici, parce que c'est ici qu'on décrit la confusion entre CO et hypothermie ; les autres
  chapitres renvoient au ch. 3 et gardent seulement la consigne.
- **Espèces nommées avec leur nom latin** : sapin baumier (*Abies balsamea*), épinette noire
  (*Picea mariana*), thuya occidental (*Thuja occidentalis*).
- **Aucune date de saison ni limite de prise** n'apparaît dans le chapitre.

## Notes retirées du chapitre — 23 septembre 2026

Encadré d'ouverture, retiré tel quel du chapitre :

> ## ⚠ RELECTURE HUMAINE EXTERNE OBLIGATOIRE
>
> **Ce chapitre ne part pas à l'impression sans la signature d'un médecin d'urgence ou d'un
> paramédic en soins primaires ayant une pratique documentée en milieu isolé** (médecine de
> région éloignée, sauvetage en milieu sauvage, service préhospitalier de la Côte-Nord).
> Motif : le chapitre donne des gestes de premiers soins pour des situations où l'ambulance
> n'arrive pas, dont un protocole de réchauffement actif d'une gelure. Une erreur ici coûte des
> doigts ou une vie. À signer nommément : la grille de classement de l'étape 3, la conduite sans
> signe de vie de l'étape 14, la décision de dégeler ou de garder gelé de l'étape 18, le bain de
> l'étape 19 et la dose d'ibuprofène de l'étape 21.

## Passe « légal et signes » — 23 septembre 2026

**Légal, municipal :** rien à retirer. Aucune phrase de loi, de règlement, de code, de permis
ni d'obligation légale dans le chapitre.

**Notes de bas de page ajoutées, et leur provenance :**

- [^1] étape 14, « pouls carotidien » : où poser les doigts. Source :
  sources/03-ccdmd-pouls-carotidien.md (CCDMD, « C - circulation »). La fiche dit de palper
  « pas plus de 10 s » ; la note ne reprend aucune durée, le chapitre garde la minute complète
  de la WMS pour l'hypothermie.
- [^2] étape 14, « pupilles fixes et dilatées » : grande, ne rapetisse pas à la lumière.
  Sources : sources/03-pupilles-fixes-dilatees.md (Manuels MSD grand public, et All About Vision
  pour la définition de « fixe »). Pas de page gouvernementale trouvée.
- [^3] étape 22, « ampoules hémorragiques » : liquide rouge ou taché de sang plutôt que clair.
  Source : sources/03-msd-gelure-cloques.md (Manuels MSD grand public, « Gelure »).

Les mêmes termes reviennent au §7 et dans l'encadré DANGER du §8 : pas de nouvelle note, la
première mention porte l'explication.

**Doutes de la passe paperasse :** aucune ligne de suivi/doutes-passe-paperasse.md ne commence
par « 03 ».

## Levée des [À VÉRIFIER] — 24 septembre 2026

Verdicts : `suivi/verifications/03-verifications.md`. Trois drapeaux, trois appliqués.

- §5 étape 21, ibuprofène chez l'enfant : **150 mg à 4-5 ans (16 à 21,9 kg), 200 mg à 6-8 ans (22 à 26,9 kg), matin et soir ; au plus 10 mg/kg par prise, 4 prises et 40 mg/kg par jour**. Confirmé (le texte n'avait pas de valeur). Le 12 mg/kg/jour en deux prises est donné au poids, sans le réserver à l'adulte ; le plafond de 2 400 mg/jour reste à l'adulte. Deux prises de la dose d'étiquette couvrent les 12 mg/kg/jour (au plus lourd de chaque tranche : 300 mg ÷ 21,9 kg = 13,7 ; 400 mg ÷ 26,9 kg = 14,9). Le tableau Matériel du §4 renvoie maintenant aux « doses adulte et enfant : étape 21 ». `sources/03-motrin-enfants-monographie-ibuprofene.md` (+ `.pdf`, `-texte.txt`) ; `sources/03-wms-gelures.md`
- §6, bain de gelure : « encore dur après 45 min » introuvable ; remplacé par la demi-heure de la source (« approximately 30 minutes ») et le critère de souplesse : continuer le bain à 37-39 °C, un dégel qui s'étire annonce une gelure étendue ou profonde. `sources/03-wms-gelures.md`
- §7, déshabillage paradoxal : confirmé (hypothermie grave, sensation soudaine de chaleur, perte de conscience peu après ; victimes souvent cachées ; cas au-dessus de 0 °C). Note de bas de page **[^4]** ajoutée sous le tableau du §7. `sources/03-deshabillage-paradoxal-hypothermie.md`
- §5, « Nourrir le poêle intérieur » : « la viande maigre seule tue en 2 à 3 semaines » → **« en quelques semaines »** (décision du livre ; aucune fiche ne porte 2 à 3 semaines). `sources/09-hektoen-mal-de-caribou-delais.md` (« after several weeks »)

Compression §3 et §4 — 27 septembre 2026 : 1 289 mots → 213 mots ; matériel coupé : bouteilles d'eau chaude, thermomètre de cuisson pour le bain, chaudron ou bac, gaze et pansements, ibuprofène, sucre et bouillon, moyen d'appel satellite (et l'heure de rappel convenue avec le village, à reprendre au ch. 14), paragraphe du thermomètre clinique et tympanique, paragraphe du double du matériel ; §3 : indice éolien, chiffres du frisson, afterdrop et 28 °C (déjà au §8), mécanisme détaillé de la gelure. Déplacé : nœuds d'une brassée et bidon flotteur de la corde → étape 26.
