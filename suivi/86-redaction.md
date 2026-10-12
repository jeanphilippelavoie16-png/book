> **Renuméroté le 24 septembre 2026** (six tomes) : ancien chapitre 18b. Plus bas, les numéros de chapitre sont **les anciens** (table : plan/renumerotation.json).

# Suivi de rédaction — Chapitre 18b, L'électricité du chalet et le froid mécanique

- **Tome :** 1 — Tenir (entre 18 et 19, comme le demande le plan maître, §4.11)
- **Fichier :** `chapitres/18b-l-electricite-du-chalet.md`
- **Lieu :** Chalet
- **Statut :** RÉD + VÉR (vérifications technique et sécurité faites, constats appliqués le
  24 septembre 2026 ; prochaine porte : éditeur)
- **Date de rédaction :** 23 septembre 2026 · **Correction :** 24 septembre 2026
- **Ampleur après correction :** environ 11 050 mots (tableaux et notes compris), dont 4 450
  pour la section 9, soit 40 % du chapitre. Environ 15 à 16 pages en 8 × 10 hors images. C'est
  plus long que les voisins (18 : 7 900 ; 69 : 8 200) : la correction a ajouté les montages et
  les mécanismes demandés par les deux vérificateurs, surtout en section 9. Voir les notes à
  l'éditeur.

---

## 1. Chiffres et énoncés marqués `[À VÉRIFIER]` dans le texte

| # | Énoncé | Où | Pourquoi | Où chercher |
| --- | --- | --- | --- | --- |
| 1 | L'étiquette canadienne (ÉnerGuide) est mesurée à 32 °C, comme l'essai américain | Section 3 | L'essai américain est sourcé (32,2 °C) ; l'équivalence canadienne est réputée, pas lue. La page de l'organisme de normalisation a refusé la consultation (HTTP 403). **Ajout du 24 septembre :** la page de RNCan sur le règlement des congélateurs (https://natural-resources.canada.ca/energy-efficiency/energy-efficiency-regulations/freezers) nomme la méthode d'essai canadienne mais pas la température ambiante. Le nom de la méthode reste ici, jamais dans le livre | Le texte réglementaire qui fixe la température d'essai. **L'ordre de grandeur du chapitre ne change pas** si l'essai diffère de quelques degrés |
| 2 | Plage de température basse d'un coffre ordinaire, non vendu « pour le garage » | Étape 7 | Aucune source générale ; chaque manuel donne la sienne | Le manuel du coffre de JP. Le chiffre s'écrit ensuite au feutre sur le coffre |
| 3 | Réveil du mode économie de l'onduleur par un compresseur à thermostat mécanique | Étape 4 | La fiche donne 1 W en mode économie, rien sur ce qui le réveille | Notice de l'onduleur de JP, ou essai : coffre branché, mode économie, attendre que le thermostat demande |
| 4 | Écart (différentiel) du thermostat extérieur qui fait du coffre un réfrigérateur | Étape 11 | Dépend de l'appareil | Lu sur le thermostat de JP ; sinon, le min-max le montre en une journée |
| 5 | Taille de la bouche d'aération pour un banc de plus de deux batteries | Étape 18 | La source ne donne que 2,5 cm pour deux batteries de 12 V | Une page officielle sur la ventilation d'un local de batteries ; le taux de la CCHST (1 % d'hydrogène) ne se calcule pas à la main |
| 6 | Sens de l'air dans le coffre à batteries quand le poêle met la pièce en dépression | Étape 18 | Mécanisme soulevé par la vérification sécurité, non sourcé | Essai décrit dans le texte (bande de papier au passage des câbles, poêle allumé), et une source sur la dépression créée par un poêle |
| 7 | Seuil de bascule d'un banc au lithium (tension ou état de charge) | Étape 31 | La courbe de tension du lithium n'est pas au dossier | Fiche de la batterie de JP |
| 8 | Rendement d'un chargeur de batteries de 120 V | Étape 32 | Aucune fiche de chargeur au dossier ; la vérification technique avançait 85 % sans source | Fiche du chargeur de JP |
| 9 | Alternateurs commandés par l'ordinateur du véhicule : lesquels, et comment les reconnaître | Section 9 B | Aucune source au dossier | Documentation d'un fabricant d'alternateurs |
| 10 | Courant de surcharge qu'un banc au plomb ouvert tolère en continu | Section 9 C (la nuit) | Le fabricant donne le courant de fin de charge (1 à 3 % de C20) pour une phase de quelques heures, pas pour une surcharge continue | Fabricant de batteries au plomb ouvert |
| 11 | Freinage d'un moteur à aimants par court-circuit de ses fils de sortie, et ce qu'il supporte | Section 9 D | Non sourcé au dossier | Guide d'une petite éolienne, ou documentation d'un moteur à aimants |
| 12 | Étapes d'un changement de compresseur (récupération, vide, recharge) | Section 9 E | La source dit seulement qu'on l'a déjà fait ; la vérification avançait « le gaz et la mise sous vide » sans source | Guide d'entretien d'un fabricant d'électroménagers |

**Levé le 24 septembre :** la compensation en température du **plomb ouvert** (ancien n° 3). La
page d'entretien du fabricant donne 0,005 V par élément et par degré pour tous les types :
`sources/18b-trojan-entretien-batteries.md`.

## 2. Points à recouper, qui ne portent pas de marqueur dans le texte

| Énoncé | Où | État |
| --- | --- | --- |
| « Chez un enfant, ça ressemble à de la fatigue ou à du mauvais caractère » | Section 8, point 1 | Formulation de `CLAUDE.md`, reprise du ch. 69. Aucune page officielle consultée ne nomme l'irritabilité ; la page du Québec nomme la fatigue. Point du livre entier |
| « Le botulisme ne change ni l'odeur, ni le goût, ni l'apparence » | Étape 11, section 8, point 3 | Règle du tableau de `CLAUDE.md`. Sa source officielle en une phrase manque pour **tout le livre** (voir `sources/12-quebec-poisson-fume-botulisme.md`) ; le ch. 70 cite Santé Canada sur le poisson fumé qui « ne montre aucun signe de détérioration » |
| La température d'une remise ombragée ≈ la moyenne quotidienne du mois | Étape 2 (tableau) | Approximation du rédacteur. Le chapitre le dit et fait mesurer (étape 3) |
| Sept-Îles pris comme référence pour toute la côte | Sections 2, 3, 5 | Le chalet de JP n'est pas localisé dans le dossier. Refaire la requête PVGIS et la normale climatique aux coordonnées du chalet |
| Capacité du plomb sous -18 °C | Section 3 (« moins encore plus bas ») | Le fabricant ne publie rien sous -18 °C. Le chapitre ne chiffre pas |
| Déclinaison magnétique ailleurs que Sept-Îles | Étape 12 (« environ 17° ») | Une requête par lieu |
| Gel à 40 % : -15 °C (livre blanc) contre -9 °C (page d'entretien du même fabricant) | Section 3 | Le chapitre garde le tableau du livre blanc, complet avec les densités. Le banc froid n'est jamais laissé sous 85 %, donc l'écart ne change aucune consigne |
| « Coudé vers le bas contre la pluie », « se détord à la main à chaque visite », « glace ou bouillie vue par un bouchon » | Étape 18, sections 9 A, 9 D | Gestes de montage et d'observation, sans chiffre, ajoutés à la correction ; aucune source ne les porte |

**Rayé le 24 septembre :** le rendement des roues à eau (tableau 5 du guide de RNCan). La mise en
page du PDF décale d'une ligne toutes les plages ; lues en tenant compte du décalage, elles
confirment ce qu'écrit le chapitre (fiche `sources/18b-rncan-microsystemes-hydroelectriques.md`).

## 3. Provenance de chaque chiffre du chapitre

| Chiffre | Où | Fiche |
| --- | --- | --- |
| Congélateur coffre moyen : 287,6 kWh/an (2019), arrondi à 288, soit 0,79 kWh/j | Étape 2 | `sources/18b-rncan-congelateurs-consommation.md` |
| Le coffre perd moins de froid à l'ouverture que le vertical | Section 3, Matériel | idem |
| Essai d'étiquette à 32,2 °C, porte fermée | Section 3, étape 2 | `sources/18b-temperature-essai-et-consommation-congelateurs.md` (ENERGY STAR) |
| Énergie proportionnelle à l'écart de température | Section 3, étapes 2, 11 | idem (Lawrence Berkeley National Laboratory) |
| Tableau mensuel du coffre (remise / chalet à 20 °C) | Étape 2 | **Calcul du rédacteur** : 0,79 kWh/j × (T + 18) ÷ 50, T = moyenne quotidienne du mois à Sept-Îles |
| Moyennes mensuelles de température, maximum de janvier -9,8 °C, neige de février 51 cm, **extrêmes de neige au sol 224 cm (janvier) et 216 cm (février)**, vent 14,2 km/h (15,3 en décembre, 12,1 en juillet), insolation maximale d'un jour de décembre 8,1 h | Sections 2, 3, étapes 2, 8, 14, 18, section 9 D | `sources/18b-eccc-normales-climatiques-sept-iles.md` ; les extrêmes de neige sont dans la page texte enregistrée, `sources/18b-eccc-normales-sept-iles-1981-2010-texte.txt`, ligne « Extrême quotidien couverture de neige » |
| Production solaire mensuelle par inclinaison ; 1,34 / 0,47 / 1,31 kWh/kWc/j en décembre ; 60° = -5 % sur l'année ; vertical = -25 % par rapport à 60° | Sections 3, étape 13, tableau de l'étape 2 | `sources/18b-pvgis-production-solaire-cote-nord.md`. La colonne du tableau de l'étape 2 est la sortie PVGIS (pertes du système de 14 %) **avant** les pertes du contrôleur et de la batterie : l'en-tête le dit maintenant |
| 1,05 (Baie-Comeau) à 1,70 (Havre-Saint-Pierre) en décembre à 60° | Section 3 | idem |
| Un jour de décembre sur trois sous 0,5 ; pire semaine 0,19 ; « le septième de la moyenne » | Sections 2, 3 | idem |
| 400 W à 60°, 2,4 kWh : batterie vide 23 % / 19 % des jours en déc. / janv. à 350 Wh/j ; 85 % en décembre et 10 % en juillet à 900 Wh/j | Section 2, étape 17 | idem (calculateur hors réseau) |
| Heures d'ensoleillement à 60° : 1,49 (déc.), 2,0 (nov.), 1,88 (janv.) | Étape 17 | idem |
| Formule du champ (× 0,77 ; +15 à 25 % sans suivi du point de puissance maximale) ; formule du banc (× 0,42 ; 3 jours) ; « environ le quart de moins » à la sortie de la batterie (1 − 0,77) | Étapes 2, 17, 20 | `sources/18b-rncan-systemes-photovoltaiques-guide.md` |
| Bouche d'aération d'au moins 2,5 cm pour deux batteries de 12 V ; contenant enfoui ; bord bas au-dessus de la **hauteur de neige maximale probable**, sans rebord ; sud vrai ; fumée de cheminée | Étapes 14, 15, 18 | idem |
| Tension à vide d'un module « 12 V » : autour de 20 V (19,8 V sur l'étiquette type de la source, qui ne s'imprime plus) | Section 9 A | idem |
| « Plus de 20 A » pour 400 W de panneaux branchés direct | Section 9 A | **Calcul du rédacteur** : 400 W ÷ 20 V (tension à vide, plus haute que la tension de travail) = 20 A, donc plus en charge |
| Capacité du plomb : 50 % à -18 °C ; plage d'utilisation -20 à +50 °C | Sections 2, 3 | `sources/18b-trojan-batteries-plomb-froid-et-charge.md` |
| Points de congélation selon l'état de charge : -69 / -52 / -27 / -15 / -7 °C, et **densités 1,280 / 1,250 / 1,200 / 1,150 / 1,100** | Section 3 (tableau), sections 6, 9 A | idem (tableau 1 du livre blanc) |
| Tensions à vide : 12,73 / 12,62 / 12,50 / 12,24 / 12,37 / 12,10 / 11,96 / 11,66 V | Section 3 (tableau), étape 31, section 6 | idem (tableau 2, × 6 éléments) |
| **12,56 V à 85 % et 12,27 V à 62 %** | Section 3 (tableau), étape 31, section 6 | **Interpolation linéaire du rédacteur** dans le tableau 2 (85 % entre 90 et 80 % ; 62 % entre 60 et 70 %) |
| Densité 1,172 à la moitié | Étape 31 | idem (tableau 2) |
| Six heures au moins sans charge ni décharge pour lire la tension au repos | Section 3, section 6 | idem, et `sources/18b-trojan-entretien-batteries.md` |
| Densité 1,277 plein ; toutes sous 1,235 = sous-chargé ; correction 0,004 par 5 °C sous 27 °C ; **écart de plus de 0,030 : égaliser, puis batterie finie si l'écart reste ; égalisation à 16,2 V jusqu'à ce que la densité cesse de monter, plomb ouvert seulement** ; densimètre rempli et vidé deux ou trois fois | Section 6, note 1 | `sources/18b-trojan-batteries-plomb-froid-et-charge.md` (guide d'utilisation, §4.4.3 et §8.3) |
| Absorption 14,1-14,7 V et maintien 13,5 V à 25 °C (plomb ouvert) ; **+0,005 V/élément/°C pour tous les types, plomb ouvert compris** → 0,03 V/°C en 12 V ; +0,75 V à 0 °C, +1,05 V à -10 °C | Étape 24, section 9 A | `sources/18b-trojan-entretien-batteries.md` ; les hausses sont un calcul du rédacteur |
| Courant de charge 10 à 13 % de la capacité (plomb ouvert) → 13 à 17 A pour 130 Ah, environ 180 à 250 W côté batterie (13 A × 14,1 V ; 17 A × 14,7 V) | Étape 28, section 9 A, B | idem (source) ; **calcul du rédacteur** pour les ampères et les watts |
| Jamais charger une batterie gelée ; AGM dégage moins de gaz que le plomb ouvert ; gel = dommage « d'ordinaire » irréparable | Sections 3, 5.4, 7, 8, 9 A, 9 G | idem, et `sources/15b-travail-securitaire-nb-batterie-gelee.md` (signes : renflement, craquèlement ; parois ondulées ou gonflées) |
| Outils isolés, aucun bijou ni objet métallique au banc ; ruban isolant sur la clé ; rien de métallique sur les bornes | Étape 23 | `sources/18b-trojan-batteries-plomb-froid-et-charge.md` (encadré du guide) et `sources/18b-victron-lithium-smart-manuel.md` |
| Lithium-fer-phosphate : charge de +5 à +50 °C, décharge de -20 à +50 °C ; rendement 92 % contre 80 % au plomb ; plomb à 50 % ou moins de rendement de charge au-dessus de 80 % ; système de gestion qui coupe la charge au froid | Sections 2, 3, 5.4, étapes 28, 32 | `sources/18b-victron-lithium-onduleur-cablage.md` |
| **Lithium : dommage permanent sous +5 °C ; le seuil du système de gestion se règle (-20 à +20 °C, +5 °C par défaut) ; gaz nocifs s'il est abîmé, surchargé ou rechargé après une décharge trop profonde** | Sections 2, 3, 7, étape 19 | `sources/18b-victron-lithium-smart-manuel.md` |
| Onduleur 800 VA : 6,5 W à vide ; 1 200 VA : 10 W ; mode économie 1 W ; rendement maximal 90 % ; 650 W continus → **environ 60 A** à 12 V (650 ÷ 12 ÷ 0,9) | Section 2, étapes 4, 21 | `sources/18b-victron-lithium-onduleur-cablage.md` ; les 60 A sont un calcul (la version d'avant disait 55) |
| Chute de tension visée 0,3 V en 12 V ; règle « ampères ÷ 3 » jusqu'à 5 m | Étape 21 | idem |
| Règle « ampères × longueur totale ÷ 15 » ; 25 à 35 mm² à 15 m, 6 mm² à 3 m pour une douzaine d'ampères ; 25 mm² pour 60 A | Étapes 16, 21 | **Calcul du rédacteur** sur la résistivité du cuivre et le tableau de la même fiche. La douzaine d'ampères est maintenant une hypothèse (« pour une douzaine d'ampères ») ; le courant d'un panneau se lit sur son étiquette |
| Branchement en diagonale ; batteries inégales en série | Étape 22 | idem |
| Fusible de lithium : pouvoir de coupure supérieur au courant de court-circuit | Étape 23 | idem |
| Pointe de démarrage : « typiquement » trois fois le courant de marche (le texte dit maintenant « souvent trois fois, parfois plus ») ; onde sinusoïdale pure ; compresseur 12 V sans onduleur ; conversion d'un réfrigérateur au compresseur c.c. déjà faite | Matériel, sections 7, 9 E | `sources/18b-sandia-refrigeration-hors-reseau.md` |
| Génératrice à onduleur 1 800 W : 3,6 L, 3,2 h à pleine charge, 8,1 h au quart → 1,6 et 1,0 kWh/L ; prise 12 V de 8,3 A | Sections 3, 5.5, 5.6, 9 A | `sources/18b-generatrice-consommation-fiche-technique.md` |
| 1,25 L par kWh manquant ; deux litres (1,54 kWh) ; près de huit litres (6,2 kWh) | Étape 32 | **Calcul du rédacteur** : 1 L/kWh au quart ÷ 0,80 (rendement du plomb). Les pertes du chargeur restent `[À VÉRIFIER]` |
| Coffres « garage » annoncés jusqu'à -17 °C ; coffre de 27 kg vide | Étapes 7, 8, Matériel | `sources/18b-congelateur-plage-de-temperature-remise.md` |
| Au ralenti : 1,8 L/h (moteur de 3 L), 3 L/h (5 L) ; quatre à sept fois la génératrice au quart | Section 9 A | `sources/18b-rncan-marche-au-ralenti.md` |
| Alternateur : rien sous ~1 000 tr/min, ralenti 1 500 à 2 000, plein courant à 6 000 ; pré-excitation ; « 14 V » ; plaque « 40-70 A » ; courroie en V ou à nervures selon la poulie | Section 9 A, B, C | `sources/18b-bosch-alternateurs-courbes.md` (et le PDF, §« Alternator Installation and Drive ») |
| Déclinaison -17,2° à Sept-Îles ; 197° au cadran | Étape 12 | `sources/18b-noaa-declinaison-magnetique-sept-iles.md` |
| Puissance d'un ruisseau : ≈ 5 × L/s × m ; exemples ; seuil 1 m et 0,6 L/s ; ruisseaux au plus bas au milieu de l'hiver dans le nord du Québec ; roues déconseillées l'hiver ; **roues pour les chutes de moins de 3 m** ; conduite sous la ligne de gel ; grille contre la glace ; perte de charge 5 à 10 % ; dynamo c.c. à aimants > 80 % **à pleine charge** ; charge de délestage ; « Régulateur de surcharge » **et** « Charge de délestage » (fig. 24) ; 9,8 kPa par mètre ; baril de 200 L ; **10 % du débit annuel moyen** laissé au poisson ; étude de cas de Lillooet (conduite enfouie, Pelton, 200 W, des mois sous zéro) | Section 2, section 9 C | `sources/18b-rncan-microsystemes-hydroelectriques.md` |
| Méthode du boyau (retrancher 2 à 5 cm par mesure) ; méthode du seau ; mesurer au débit le plus bas | Section 9 C | `sources/18b-doe-planifier-microhydro.md` |
| Environ 1 m par 10 kPa ; 0,7 m par psi | Section 9 C | **Calcul du rédacteur** : 10 ÷ 9,8 ; 6,895 kPa ÷ 9,8 kPa/m |
| Éolien : 15 km/h minimum ; +12 % de vent par doublement de hauteur (+40 % de puissance, calcul) ; puissance au cube ; diamètre × 2 → puissance × 4 ; +16 % à -20 °C ; arrêt de protection vers 70 km/h ; **tour basculante relevée au treuil ou au véhicule ; personne sous la tour ; une pale peut atteindre ; glace projetée loin ; la tour doit résister à la foudre** | Sections 2, 4, 9 D | `sources/18b-rncan-systemes-eoliens-autonomes.md` (et le PDF, sections « Tour », « Sécurité... ») |
| Isobutane et propane dans des congélateurs domestiques récents, gaz qui brûlent ; tuyaux marqués de rouge et avertissement ; outils anti-étincelles | Section 9 E | `sources/18b-epa-frigorigenes-inflammables-congelateurs.md` |
| Génératrice : 6 m, jamais à l'intérieur, échappement à l'opposé des ouvertures | Étape 25, sections 6, 8, 9 | `sources/18b-reprises-sources-deja-enregistrees.md` §1 |
| Garage en toile, tuyau d'échappement bouché par la neige, symptômes | Section 8, section 9 A | idem §2 |
| Hydrogène 4,1 % à 72 % ; pas de charge ni de manipulation près d'une source de chaleur, de flamme ou d'étincelle | Section 8, étape 18, section 9 A | idem §3 (CCHST) |
| Batterie gelée et survoltage : acide et plastique au visage d'un bûcheron | Section 8 | idem §4 |
| Congélateur plein : 48 h | Matériel, étape 8 | idem §5 |
| Botulisme de type E : 3 °C | Étape 11, sections 6, 7, 8 | idem §6 ; renvois vérifiés au ch. 70 (étape 29, §8) et au ch. 72 |
| Soleil à 16° à midi le 21 décembre ; ombre de 3,4 fois la hauteur ; **12° à deux heures de midi, à environ 28° du sud ; 6° à trois heures, à environ 41° du sud ; soleil sous l'horizon à quatre heures de midi (jour d'environ huit heures)** | Section 2, étape 15 | **Calcul du rédacteur** : sin h = sin φ sin δ + cos φ cos δ cos H, φ = 50,2°, δ = -23,44° ; azimut par cos A = (sin δ − sin h sin φ) ÷ (cos h cos φ) |
| Exemples de bilan : 60 Wh d'éclairage, 350 / 220 / 900 Wh par jour, 230 / 190 / 770 W de panneaux, 130 / 525 Ah, 6 h / 3 h / 1,3 h de génératrice pour un compresseur de 100 W | Étapes 5, 17, 20, 27 | **Calculs du rédacteur**. Le 100 W du compresseur et les 3 W par point lumineux sont des **hypothèses d'exemple** |
| Rapport de poulies 1,7 pour un moteur de 3 600 tr/min | Section 9 B | **Calcul** : 6 000 ÷ 3 600 ; plaque hypothétique |
| Moteur marqué 90 V à 5 000 tr/min → 9 V à 500 tr/min ; **plus de 800 tr/min pour dépasser l'absorption** | Sections 9 C, 9 D | **Calcul** : 14,7 V ÷ (90 ÷ 5 000) = 817 tr/min, avant la chute de la diode ; plaque hypothétique |
| Roue à 20 tr/min, dynamo à 800 → multiplier par 40 | Section 9 C | **Exemple hypothétique** présenté comme tel ; le lecteur compte les tours de sa roue |
| Ampoule de 55 W → un peu plus de 4 A (plafond) ; deux ou trois volts d'écart au camion | Section 9 A | **Calcul** : 55 ÷ 12 ; 14 V régulés moins 11 à 12 V d'une batterie basse |

**Aucun autre nombre du chapitre n'est sans source ou sans calcul nommé ici.**

## 4. Rappels de sécurité de `CLAUDE.md` repris dans ce chapitre

| Règle du tableau | Où | Avec quel mécanisme |
| --- | --- | --- |
| **Génératrice : jamais dans un bâtiment, un garage ou sous un auvent** | Étape 25, section 6, section 8 point 1, section 9 A, B, G | Étendue au camion et au petit moteur. CO sans odeur ni couleur ; signes confondus avec une semaine grise ; l'enfant « fatigué ou de mauvais caractère » ; l'abri de toile et le tuyau pris dans la neige. **Correction du 24 septembre :** en 9 C et 9 D, la machine du ruisseau s'appelle maintenant **la dynamo**, pour que « génératrice » ne désigne que la machine à essence et que « la génératrice dans un petit abri » ne se lise plus nulle part |
| **Botulisme de type E dès 3 °C** | **Étape 11** (le coffre en réfrigérateur : maximum sous 3 °C), section 6 (min-max chaque matin, toute l'année), section 7, section 8 point 3 | Le congélateur lâche sans bruit ; le sac de poisson fermé est sans oxygène ; un thermostat a un écart, c'est son haut qui compte |
| **Le botulisme ne change ni l'odeur, ni le goût, ni l'apparence** | Étape 11, section 8 point 3 | « On ne goûte pas pour décider » |

**Écartés volontairement**, pour ne pas diluer l'encadré : 74 °C, cadmium, trichinellose,
tularémie, thuyone, mal de caribou. Le chapitre ne traite ni la cuisson ni le tri de la viande.

**Ajouts propres au chapitre**, avec leur mécanisme : l'hydrogène de charge et ce qui l'allume
(interrupteurs, relais, clé ou bague en travers des bornes : rien de tout ça dans le coffre) ;
la batterie gelée qu'on ne charge pas, vérifiée avant toute méthode de la section 9 A ; la
batterie de 6 V seule sur un circuit de 12 V ; le fusible qui protège le câble et non les bornes ;
le frigorigène inflammable ; le mât qui tombe et la foudre.

## 5. Planches voulues

Ce qui se fabrique ou se monte, et qui se dessine (skill `planches`). Aucune ne montre une règle
ou une donnée ; les tableaux du chapitre restent des tableaux. **Mises à jour du 24 septembre
en gras.**

| # | Sujet | Ce que la planche montre |
| --- | --- | --- |
| 18b-1 | **Le coffre à batteries ventilé** | Coupe : batteries au plancher du coffre, couvercle à joint côté pièce, bouche haute qui traverse le mur vers dehors **et remonte au-dessus de la ligne de neige, coudée vers le bas**, fusible au positif près de la borne, sonde du contrôleur collée à une batterie. **Dans le coffre, seulement batteries, sonde et fusible ; l'onduleur vissé contre la paroi extérieure, le contrôleur et les interrupteurs dehors du coffre ; le passage des câbles bouché serré. Le coffre du côté opposé au couchage et loin du poêle** |
| 18b-2 | **Brancher un banc en parallèle** | Deux montages côte à côte : diagonale, et barres communes à câbles égaux. Le montage faux, en petit, barré |
| 18b-3 | **Le support de panneau à 60°** | Construction en bois en profondeur : pieds, contreventement, **bord bas au-dessus de la neige maximale probable et du tas qui se forme au pied**, aucun rebord en bas, angle de 60° coté. **L'horizon dégagé est un arc : 16° plein sud, 12° à une trentaine de degrés de part et d'autre, 6° à une quarantaine** |
| 18b-4 | **Le chargeur à essence** | Petit moteur et alternateur d'auto **à régulateur intégré** sur un même bâti, **courroie du même profil que la poulie de l'alternateur**, les deux poulies, fil d'excitation avec ampoule témoin et interrupteur, câbles vers la batterie, la machine à 6 m du bâtiment |
| 18b-5 | **Mesurer un ruisseau** | Séquence : la chaudière de 20 L sous la goulotte et la montre ; la méthode du boyau, tronçon par tronçon ; le manomètre au bas du boyau plein |
| 18b-6 | **La roue à augets sur le ruisseau** | Vue d'ensemble en profondeur : barrage, bassin, grille, conduite, roue à augets **d'environ un mètre** (cruches coupées sur disques de contreplaqué), **multiplicateur en plusieurs étages (vélo, puis courroies)**, dynamo, diode, **charge de délestage branchée côté roue, avant le fusible, ampoules dans un baril, douilles au sec** |
| 18b-7 | **La roue à cuillers, pour l'hiver** | Buse au bout du tuyau, jet tangent sur des cuillers boulonnées au bord d'un disque, sens de rotation, eau renvoyée vers l'arrière, poulie de la dynamo. **En deuxième vue : la conduite enfouie sous la ligne de gel, la prise sous la glace, la roue et sa dynamo dans un petit abri** |
| 18b-8 | **L'éolienne de fortune** | Tête pivotante sur le mât, queue en tôle, pales taillées dans un tuyau fendu, haubans, **câble laissé lâche en boucle sous la tête, mât basculant avec son treuil, interrupteur de freinage au pied du mât**, et le dispositif de repli ou d'attache des pales |
| 18b-9 | **Charger une batterie creuse avec une ampoule de phare en série** | Montage simple : source **de 12 V**, ampoule en série sur le positif **posée à l'écart, hors du coffre**, batterie, voltmètre ; deux états de l'ampoule (vive, pâle) |
| 18b-10 | **Le panneau branché direct, le lecteur comme contrôleur** | Panneau, interrupteur, diode antiretour, batterie, voltmètre |
| 18b-11 | **Trouver le sud à l'ombre du bâton** | Séquence : le bâton, les pierres aux quarts d'heure, la plus courte, la ligne nord-sud |
| **18b-12** | **Le chargeur refait avec les diodes d'un alternateur** | **Deux schémas côte à côte : secondaire à deux fils sur deux bornes de phase (pont de quatre diodes, plaques + et −) ; secondaire à trois fils, point milieu au négatif, plaque négative en l'air (deux diodes). Le voltmètre qui lit la tension à vide avant la batterie. Côté 120 V, le boîtier d'origine fermé et le fil de terre vissé au boîtier** |

## 6. Renvois vers d'autres chapitres (tous vérifiés contre le texte du chapitre visé)

| Chapitre | Ce que le ch. 18b y renvoie | Vérifié |
| --- | --- | --- |
| 2 — Rester ou partir | La bascule vers le chalet | Oui |
| 3 — Le froid lui-même | Le 1-10-1 de l'eau froide | Oui |
| 4 — Panne majeure d'Hydro | La génératrice au village ; la rotation au thermomètre (étape 18) ; les batteries des véhicules comme réserve (§9) | Oui |
| **15b — Ouvrir et fermer le chalet** | **La fermeture d'automne du banc (étape 24) ; la batterie trouvée à plat au retour d'hiver, qui dégèle dans la pièce avant qu'on la branche (§9) ; batterie bombée ou fendue (§7)** | **Oui, le 24 septembre.** Le 15b renvoie lui-même au 18b, §3, pour le lithium : la formulation corrigée du 18b (« si le système de gestion a cette coupure ») concorde avec celle du 15b (« s'il n'a pas cette coupure ») |
| 18 — Éclairage | Mesure des points lumineux ; balai ; rationnement (étape 25) ; batteries de démarrage ; batterie sulfatée | Oui. **Discordance à régler au ch. 18** : il dit que le lithium refuse la charge « sous 0 °C » `[À VÉRIFIER]` ; la source dit +5 °C et la coupure dépend du système de gestion. Noté dans `suivi/18-redaction.md`, n° 3 ; le texte du ch. 18 n'a pas été touché par cette correction |
| 19 — Communiquer et savoir | Le banc de communication séparé (étape 7) | Oui |
| 20 — Se déplacer et le carburant | Parts de carburant ; faire partir un moteur gelé | Oui |
| **54 — Pêche blanche** | **La glace mangée par un courant ou une source : secteur éliminé pour la saison (§2, §3, §7)** | **Oui, le 24 septembre** |
| 68 — Froid naturel | La cache d'hiver ; le gain solaire | Oui |
| 69 — Un congélateur plein qui dégèle | Le tri ; les Cas 1 et 2 ; les cruches (étape 32) ; le joint et le thermostat ponté (§9) ; la génératrice par blocs (§9) ; le gobelet et la pièce | Oui |
| **70 — Traiter le poisson à la sortie** | **Emballage qui respire (étape 29) ; la semaine pour le frais, 14 jours pour le fumé ; encadré du type E (§8)** | **Oui, le 24 septembre** |
| **72 — Fumer le poisson** | **Sortie froide sous 3 °C, un frigo à 4 °C ne convient pas** | **Oui, le 24 septembre** |
| 76 — Caveau à légumes | Le froid à 0-4 °C sans courant | Oui |
| 83 — Scie à chaîne et petits moteurs | L'entretien de la génératrice | Oui |
| 84 — Souder, braser | Souder avec des batteries | Oui |
| 85 — Le stock de pièces | Fusibles, cosses, pièces 12 V ; banc ventilé, jamais dans une pièce où l'on dort ; lithium gonflé ; **rinçage de l'acide d'au moins 30 minutes (§8)** | Oui |
| 00b — Acheter par priorité | Le banc, le contrôleur, les panneaux, le voltmètre (ligne « Batterie de service 12 V… »), les thermomètres min-max ; la génératrice, rangée **Maison** | Oui. **La phrase du 18b se limite maintenant à ce qui est au 00b.** Manquent au 00b, pour la chaîne du 00b : l'onduleur à onde pure, le chargeur de 120 V, le wattmètre de prise, le gros câble et ses cosses, le congélateur coffre de la remise du chalet, la génératrice au chalet (la ligne ne dit que Maison) |

## 7. Points de vérification à la source (remplace la section « Relecteur humain »)

`CLAUDE.md` : pas de relecture extérieure. La section qui demandait un électricien et un
préventionniste, « bloquant pour l'impression », est retirée. Ses cinq points sont tranchés
par la vérification du 24 septembre, ou reportés en `[À VÉRIFIER]` dans le texte (§1) :

1. **Le coffre à batteries dans un chalet d'une seule pièce** (étape 18) : corrigé selon les
   constats de sécurité (rien qui coupe le courant dans le coffre, couvercle ouvert avant de
   toucher une cosse, bouche au-dessus de la neige, loin du poêle). Restent `[À VÉRIFIER]` : la
   taille de bouche d'un gros banc et le sens de l'air poêle allumé (§1, n°s 5 et 6).
2. **Le chargeur refait** (section 9 A) : corrigé (deux fils ou trois fils, tension à vide lue
   avant, primaire isolé dans son boîtier, terre au boîtier).
3. **L'excitation par ampoule témoin et interrupteur** (section 9 B) : aucune objection de
   sécurité. Le choix de l'alternateur est ajouté ; les alternateurs commandés par ordinateur
   restent `[À VÉRIFIER]` (§1, n° 9).
4. **La charge de délestage** (section 9 C) : corrigée (côté roue, avant le fusible et le
   système de gestion ; régulation de nuit sans personne d'éveillé). Le courant de surcharge
   tolérable reste `[À VÉRIFIER]` (§1, n° 10).
5. **La règle « ÷ 3 » sous 5 m** (étape 21) : prudente pour l'échauffement, 25 mm² pour 60 A ;
   aucune objection.

## 8. Notes pour l'éditeur

- **L'argument du chapitre tient dans le tableau de l'étape 2** : le même coffre, remise ou
  cuisine. Si quelque chose doit être coupé, ce n'est pas lui.
- **La section 9 fait 40 % du chapitre, et c'est voulu.** Coupes possibles, dans l'ordre où
  elles font le moins de dégât : la section 9 D (le vent, faible en forêt), puis la section 9 F
  (le sud à l'ombre), qui pourrait vivre au ch. 19. **L'étape 11 (le coffre en réfrigérateur)
  ne se coupe plus sans son rappel du type E** : si elle part, le rappel part avec elle, pas
  l'inverse.
- **Le chapitre a grossi à la correction** (environ 11 050 mots). Ce qui a grossi est du
  mécanisme de sécurité et du montage : les deux vérifications de la section 9 A (gel, tension
  égale), le chargeur refait en deux cas, la régulation de nuit du ruisseau, l'étape 18.
- **Le mot « génératrice »** ne désigne plus que la machine à essence. Le moteur à aimants du
  ruisseau et de l'éolienne est « la dynamo ». À garder ainsi à la mise en pages.
- **Aucun nom de marque dans le texte.** « MPPT », « PWM », « pure sine wave » en note sont des
  mentions d'étiquette, pas des marques.
- **« Turbine Pelton »** est gardé : c'est un nom de type de turbine, pas une attribution.
- **Le chapitre ne donne aucun prix** et renvoie les rangs d'achat au 00b.
- **Trois notes de bas de page** (densimètre, contrôleur qui suit le point de puissance
  maximale, onde de l'onduleur) : des signes que le lecteur ne reconnaîtrait pas sans
  description.

## 9. Notes retirées du chapitre

Aucune. Le chapitre a été écrit et corrigé sans note interne.

## 10. Correction du 24 septembre 2026 — constats appliqués et écartés

**Appliqués : les 54 constats** (37 techniques, 17 de sécurité), dont les deux bloquants
(batterie de 6 V au camion ; « la génératrice dans un petit abri »), tous les importants et tous
les mineurs, qui avaient tous raison sur le fond. Cinq l'ont été en partie ou autrement ; le
détail est dans les sections ci-dessus et dans le texte.

**Parts écartées ou appliquées autrement :**

1. **Harmoniser le ch. 18 sur le lithium** (technique et sécurité) : appliqué au 18b seulement.
   Le texte du ch. 18 appartient à sa propre chaîne ; la correction à faire y est notée
   (`suivi/18-redaction.md`, n° 3).
2. **Ajouter au 00b les lignes manquantes** (technique) : option retenue, limiter la phrase du
   18b à ce qui est vraiment au 00b. Les lignes manquantes sont listées au §6 pour la chaîne du
   00b.
3. **Rendement d'un chargeur à « environ 85 % », courant réel de l'ampoule « 1,5 à 2 A »,
   « plusieurs dizaines » de multiplication, courant de 23 A du champ** (chiffres de calcul du
   vérificateur, non sourcés) : non imprimés tels quels. Le chargeur porte `[À VÉRIFIER]` ;
   l'ampoule dit « une fraction » et « des jours » ; la multiplication se donne par la méthode
   (compter les tours) avec un exemple hypothétique ; le champ « plus de 20 A » est tiré de la
   tension à vide du chapitre.
4. **Masse d'une paire de batteries de 6 V** (technique, bloquant) : le chapitre ne la donne
   nulle part et aucune source au dossier ne la porte ; le texte dit de porter la paire
   ensemble, restée câblée, sans chiffrer.
5. **« Court-circuit interne » d'un lithium chargé au froid** (sécurité) : absent du manuel du
   fabricant enregistré ; le texte dit « s'abîme pour de bon », qui est sourcé.

## Levée des [À VÉRIFIER] — 24 septembre 2026

Verdicts de `suivi/verifications/18b-verifications.md`, appliqués au texte. Une ligne par chiffre
ou énoncé confirmé, changé ou retiré.

| # | Chiffre ou énoncé | Où | Verdict appliqué | Fiche |
| --- | --- | --- | --- | --- |
| 1 | Étiquette mesurée à 32 °C, couvercle fermé ; ce 32 °C tient lieu d'une cuisine où l'on ouvre | Section 3 | Levé ; phrase ajoutée sur la cuisine où l'on ouvre | `sources/18b-essai-etiquette-canadienne-32-degres.md` (+ `18b-rncan-reglement-refrigerateurs-congelateurs.html`, `18b-doe-2017-rfi-essai-refrigerateurs.pdf`, `18b-cfr-430-annexe-b-essai-congelateurs.html`) ; `18b-temperature-essai-et-consommation-congelateurs.md` |
| 2 | Mode économie : l'onduleur dort sous un seuil de quelques watts, sonde sa sortie toutes les deux ou trois secondes (2,5 s), repart au-dessus du seuil | Étape 4 | Levé pour le mécanisme ; le compresseur n'est nommé par aucune source, l'essai au wattmètre tranche | `sources/18b-onduleur-mode-economie-reveil.md` (+ `18b-magnum-ms-onduleur-manuel.pdf`, `-texte.txt` ; `18b-victron-onduleur-phoenix-fiche.pdf`) |
| 3 | Plage basse d'un coffre ordinaire : comparaison « descend moins bas » retirée, aucun chiffre ; renvoi au manuel et essai au min-max ; étape 8 « à la limite de son manuel » | Étapes 7, 8 | Introuvable ; dit sans chiffre. Le -17 °C des coffres de garage reste | `sources/18b-congelateur-coffre-ordinaire-plage-basse.md` ; `sources/18b-congelateur-plage-de-temperature-remise.md` (-17 °C) |
| 4 | Écart du thermostat : « de quelques degrés » retiré ; écart propre à l'appareil, réglable au degré près en électronique (1 à 30 degrés sur la fiche lue), plus large en mécanique ; délai contre les redémarrages rapprochés | Étape 11 | Introuvable pour l'appareil de JP ; mécanisme sourcé, dit sans valeur | `sources/18b-johnson-controls-a419-thermostat.md` (+ `.pdf`, `-texte.txt`) |
| 5 | Bouche du coffre à batteries : 2,5 cm pour deux batteries chargées doucement (≈ 0,5 A) ; environ 9 cm² par ampère de fin de charge en 12 V, double en 24 V ; 40 % du courant maximal du chargeur faute de mieux ; 3,5 cm pour 1 A, 7 cm pour 4 A ; 9 cm (≈ 63 cm²) pour le chargeur de 17 A ; seconde bouche basse au-delà d'un petit banc | Étape 18 | Levé et chiffré. Diamètres et surfaces : **calcul du rédacteur** sur la formule de la fiche (d = √(4 × S ÷ π)) | `sources/18b-zvei-ventilation-local-batteries-plomb.md` (+ `.pdf`, `-texte.txt`) ; `sources/18b-rncan-systemes-photovoltaiques-guide.md` (2,5 cm) |
| 6 | Bas d'un bâtiment chauffé en dépression l'hiver (effet de tirage), creusée par le poêle ; le vent peut inverser l'air d'un conduit vers le dehors | Étape 18 | Levé (mécanisme, sans chiffre) | `sources/16c-rncan-refoulement-braise-effet-de-tirage.md` ; PDF intégral `sources/15b-rncan-guide-chauffage-bois-residentiel.pdf` |
| 7 | Lithium : état de charge non calculé par la batterie (moniteur ajouté) ; alerte du système de gestion à 3,10 V/élément (12,4 V) ; coupure des charges à 2,80 V/élément (11,2 V), au moins 30 s après | Étape 31 | Introuvable pour la batterie de JP ; règle écrite sur la batterie lue. 12,4 et 11,2 V : **calcul** × 4 éléments. La bascule « à la moitié » est un choix du livre, aligné sur le plomb au chaud | `sources/18b-victron-lithium-seuils-decharge.md` (PDF : `18b-victron-lithium-smart-manuel.pdf`) |
| 8 | Chargeur de 120 V : 93 % en 12 V → **1,35 L par kWh manquant** (était 1,25) ; remise : environ deux litres (2,07 L, inchangé) ; cuisine : **plus de huit litres** (8,3 L ; était « près de huit ») | Étape 32 | Levé et chiffré ; calcul refait : 1 ÷ 0,80 ÷ 0,93 = 1,34. Le chiffre 1,25 de la ligne « 1,25 L par kWh manquant » du §3 est remplacé par celui-ci | `sources/18b-victron-chargeur-120v-rendement.md` (+ `18b-victron-chargeur-blue-smart-ip22-fiche-fr.pdf`, `-texte.txt`) |
| 9 | Alternateur commandé par l'ordinateur : **monté seul, ne produit rien, ou part seul entre 13,5 et 15 V passé 3 000 à 4 000 tr/min** (était « ne produisent ni ne régulent rien ») ; bornes de commande C, COM, LIN, BSS, RC, SIG, RLO ; témoin L, D+, IND, 15, 61, R, 1 ; S = lecture de batterie ; DFM, FR, DF, M, LI renseignent seulement ; essai au voltmètre | Section 9 B | Corrigé | `sources/18b-alternateurs-commandes-par-calculateur.md` (+ `18b-nxp-an4289-regulateur-alternateur-lin.pdf`, `-texte.txt` ; `18b-pmm-bornes-regulateur-alternateur.html`) |
| 10 | Banc plein la nuit : dit par la **tension de maintien, 13,5 V à 25 °C**, corrigée pour le froid (étape 24), au lieu d'un courant de surcharge non publié ; essai au voltmètre le matin | Section 9 C | Introuvable comme courant ; dit par la tension, sourcée | `sources/18b-rolls-plomb-ouvert-fin-de-charge-et-maintien.md` (+ `18b-rolls-manuel-batteries.pdf`, `-texte.txt`) ; `sources/18b-trojan-entretien-batteries.md` (13,5 V) |
| 11 | Frein par court-circuit d'un moteur à aimants : s'arrête, ou tourne lentement par très grand vent ; interrupteur qui coupe la batterie avant de relier les fils ; arrêt long = mât couché ou pales attachées | Section 9 D | Levé, avec les deux conditions de la source. Ce que supporte un moteur de tapis roulant tenu en court-circuit reste non sourcé : le texte ne l'affirme pas | `sources/18b-primus-air-x-freinage-court-circuit.md` (+ `18b-primus-air-x-manuel.pdf`, `-texte.txt`) |
| 12 | Changement de compresseur : gaz vidé et récupéré, coupe-tube, aucune flamme sur un circuit chargé, purge à l'azote sec, filtre déshydrateur changé, **pas plus de 15 minutes ouvert** (« un quart d'heure »), tirage au vide, recharge du gaz et de la quantité de la plaque à la balance | Section 9 E | Levé, et étapes ajoutées d'après la source | `sources/18b-secop-changement-compresseur-etapes.md` (+ `18b-secop-reparation-systemes-hermetiques.pdf`, `-texte.txt`) |

Compression §3 et §4 — 27 septembre 2026 : 1349 mots → 255 mots (§3 : 749 → 118 ; §4 : 600 → 137) ; matériel coupé : congélateur coffre et ses substituts (coffre de la maison vidé ou glissé sur une planche, 48 h plein et fermé, vertical, coffre à compresseur 12 V), second thermomètre min-max de la remise, wattmètre de prise (et la mesure à la pince ampèremétrique sur un seul conducteur), panneaux et support à 60° (inclinaison et mur sud restent aux étapes 13 et 17), chargeur de 120 V et génératrice (→ §9), câble de cuivre et cosses serties (section à l'étape 21 ; substituts câbles de survoltage et câble de soudeuse perdus), paragraphe de fin (rangs d'achat au ch. 00b, fusibles et cosses au ch. 108). §3 : tableau état de charge / densité / tension / gel coupé (85 % et 62 % et les tensions au repos restent en §6 et à l'étape 31, 20 % → -7 °C en §9 A ; perdus : la ligne à 40 %, 12,27 V à 62 %, 1,280 et -69 °C à 100 %), chiffres du soleil de décembre (1,34 contre 0,47 kWh/kW/j, 1,31 à la verticale, 1,05 à 1,70 le long de la côte, un jour sur trois sous 0,5, pire semaine à 0,19), écarts de 50, 38, 15 et 8 °C, air froid qui reste au fond du coffre, essai du lithium un matin froid (reste en §7), rendements 80, 92, 50 et 10 % (étapes 4, 19, 28 et 32), plein de 3,6 L et durées de 3,2 h et 8,1 h de la génératrice. Déplacé : appel de la note [^1] (densimètre), de §3 à la ligne Voltmètre du §4. Renvois corrigés : §2, lithium (section 3 → section 7) ; étape 26 (« la machine de l'exemple » → « la génératrice à onduleur de 1 800 W prise en exemple », pour que §9 A garde « celle de l'exemple ») ; §9 A (« à -7 °C (section 3) » : renvoi retiré).
