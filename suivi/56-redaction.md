> **Renuméroté le 24 septembre 2026** (six tomes) : ancien chapitre 52. Plus bas, les numéros de chapitre sont **les anciens** (table : plan/renumerotation.json).

# Suivi de rédaction — Chapitre 52 : Phoque du Saint-Laurent

- **Tome :** 3 — Prélever
- **Fichier :** `chapitres/52-phoque-du-saint-laurent.md`
- **Rôle :** 2 — Rédacteur
- **Date :** 2026-09-20
- **Longueur :** environ 4 950 mots utiles (7 519 mots bruts, syntaxe de tableau incluse)
- **État :** premier jet complet, prêt pour les rôles 3 (vérification technique) et
  4 (vérification sécurité)
- **⚠ RELECTURE HUMAINE EXTERNE OBLIGATOIRE** — chapitre nommé dans la liste de `CLAUDE.md`
  (« Phoque »). L'avis est en tête du fichier de chapitre, avant la section 1.

---

## 0. Contrainte de session à signaler à l'éditeur

Le budget de **recherche par mots-clés était épuisé** au moment de la rédaction. Toutes les
sources ont été obtenues par **adresse directe** sur les sites officiels. Ça trouve ce qui est
à l'adresse prévisible et ça rate le reste — c'est la cause principale des trous listés en
section 1. Une session disposant d'un moteur de recherche doit reprendre
`sources/52-NON-OBTENUES-pages-cherchees-sans-succes.md` avant l'impression. Ce chapitre est
plus troué que le chapitre 41 pour cette raison, et non parce que le sujet est plus mince.

## 1. Chiffres et affirmations marqués [À VÉRIFIER]

| # | Valeur | Où | Pourquoi ce n'est pas réglé |
| --- | --- | --- | --- |
| 1 | ***Trichinella* chez le phoque** | §3, §8, §5-A champ 6 | **Priorité 1 du vérificateur technique.** La page de l'ACIA nomme **l'ours et le morse**, pas le phoque. Le tableau de `CLAUDE.md` associe pourtant la règle à « ours, phoque ». Le chapitre applique la consigne, donne le mécanisme et **dit que la source ne nomme pas l'espèce**. Pistes : ASPC, RRSSS du Nunavik (dépistage de la trichinellose du morse), gouvernement du Nunavut, Canadian Wildlife Health Cooperative, Institut Maurice-Lamontagne. Si une source sort, ce paragraphe raccourcit |
| 2 | **4 880 µg ÉAR de vitamine A / 100 g de foie** | §5-I étape 33, §8 | Valeur USDA pour le **phoque annelé** (*Pusa hispida*), espèce **arctique**. Aucune entrée pour les espèces du Saint-Laurent. Même chiffre, même faiblesse qu'au chapitre 41 — les deux chapitres doivent être corrigés ensemble. Les rapports **1,6** et **5,4** sont des divisions du livre (4 880 ÷ 3 000 et 4 880 ÷ 900), pas des valeurs publiées |
| 3 | **Masses, longueurs, aires de répartition** | §5-A champs 2 et 4, §5-B | La fiche chiffrée du MPO n'a pas livré son tableau. **Aucune masse et aucune longueur n'est imprimée nulle part dans le chapitre** : c'est une décision, pas un oubli |
| 4 | **Tableau d'identification 5-B au complet** | §5-B | Les caractères (profil de tête, narines en V contre parallèles, pelage) viennent de la différenciation d'usage, **d'aucune page officielle**. Le tableau porte la mention en clair. À faire confirmer par le relecteur externe, sinon à retirer |
| 5 | **Rendements : poids vif, carcasse, viande désossée, lard, huile** | §5-A champ 4 | Aucune source. Le chapitre ne donne **aucun** rendement et renvoie au carnet |
| 6 | **Teneur en gras et composition de la viande** | §5-A champ 5, §3 | Récolte USDA interrompue par `OVER_RATE_LIMIT` sur la clé publique partagée. Seules valeurs obtenues pour « Seal, ringed, meat » : protéines 28,4 g et sodium 110 mg / 100 g — **non utilisées dans le texte**, faute d'être complètes et faute de porter sur la bonne espèce. Le FCÉN de Santé Canada n'a pas répondu, comme aux ch. 24 et 41 |
| 7 | **Contaminants (mercure, organochlorés)** | §5-A champ 6 | Les deux pages de Santé Canada sur le mercure répondent et **ne mentionnent ni le phoque ni les mammifères marins**. Le chapitre refuse de transposer les limites de l'espadon, exactement comme le ch. 43 a refusé de les transposer à l'omble. C'est le trou le plus gênant du chapitre : une famille avec deux jeunes enfants mange du gras de mammifère marin sans qu'aucune limite ne soit disponible |
| 8 | **Durée de conservation de l'huile de phoque** | §1, §5-G étape 28 | Aucune source. Le chapitre donne un critère sensoriel de rancissement et **précise que ce critère ne vaut pas pour le botulisme** |
| 9 | **Noms latins des quatre espèces du Saint-Laurent** | §5-A champ 1 | Pris dans l'article du CDC (2024), pas dans la liste officielle des espèces fauniques du Québec. Même réserve qu'au ch. 43 pour l'orignal, le vison et le tétras |
| 10 | **Corde de 10 m** | §4, matériel | Ordre de grandeur non sourcé. À remplacer par un critère fonctionnel ou à mesurer au chalet |
| 11 | **Numéro de signalement d'un mammifère marin échoué** | §7 | Page du MPO en **HTTP 404**, page mère sans coordonnées. **Aucun numéro n'est imprimé.** Le numéro provincial de la faune (1 877 346-6763) vise les oiseaux sauvages et n'est pas transposé. À obtenir et à placer au ch. 19 |
| 12 | **Conditions du permis de pêche au phoque à usage personnel au Québec** | §5-A champ 3, §5-C | Le règlement établit que le permis existe et son droit (5 $). Les conditions régionales n'ont pas été retrouvées. Conforme à la règle du livre : on nomme l'autorité et la rubrique, pas la démarche |

**Tous les autres chiffres du chapitre portent leur source entre parenthèses dans le texte et
leur extrait intégral dans `/sources`** : 74 °C, 82 °C, 70 °C, 71 °C (écart de l'ACIA signalé
et tranché), 7 °C en 24 h, 0 à 4 °C, -18 °C, seuil de 3 °C et 4 °C du botulisme de type E,
AMT de 3 000 et 900 µg, 1 800 pi/s, 1 100 pi-lb, calibre 20, gourdin de 60 cm à 1 m, hakapik
340 g et 105-153 cm, 1 minute de saignée, 200 m de distance d'approche, interdiction des
blanchons depuis 1987, 55 échouages, 3,7 fois la moyenne, 15 sur 27, 5 à 15 jours
d'incubation.

Le droit de permis de **5 $** figure au fichier de source (règlement, art. 4, tableau) mais
**pas dans le chapitre** : un montant réglementaire imprimé dans un livre vieillit comme une
date de saison.

## 2. Rappels de sécurité de `CLAUDE.md` repris dans ce chapitre

| Règle du tableau | Reprise ici |
| --- | --- |
| **Cuisson du gibier sauvage à 74 °C à cœur (MAPAQ)** | §1, §2 (mauvais choix), §5-A champ 9, §5-J (quatre lignes du tableau), §6 (deux lignes), §7, §8 point 2, §9 point 6 et liste finale. L'écart avec les 71 °C de l'ACIA est écrit et tranché en faveur de 74 °C. Le piège propre à l'espèce est nommé : **ce n'est pas 70 °C**, le phoque est un mammifère et non un poisson |
| **Trichinellose : ni le sel, ni le fumage, ni le gel domestique ne la détruisent** | §3, §5-A champ 10, §5-J (lignes congélateur, salaison, séchage-fumage), §7, §8 point 2, §9. Avec l'honnêteté documentaire du point 1 de la section 1 ci-dessus |
| **Botulisme de type E : produit sa toxine dès 3 °C, donc au frigo** | §5-A champ 6, §5-J (ligne conserve), §8 point 3. C'est ici la **seule page fédérale du dossier qui nomme le phoque** en toutes lettres |
| **Le botulisme ne change ni l'odeur, ni le goût, ni l'apparence** | §5-G étape 28 (en opposition explicite au critère du rancissement), §7 (ligne dédiée), §8 point 3, en toutes lettres |
| **Viande maigre seule = mal de caribou, mortel en 2 à 3 semaines** | §2 (premier point des bons choix), §3, renvoi au ch. 24 et au ch. 67. Le chapitre 52 est le **chapitre-solution** de cette règle : c'est son argument central |
| **Jamais le foie ni les reins de cervidés — cadmium (MAPAQ)** | Repris **une seule fois, en contraste**, à l'étape 34 et dans l'encadré point 4. Motif : le chapitre refuse le foie de phoque pour une raison **différente** (vitamine A). Sans ce rappel, un lecteur confondrait les deux interdits et appliquerait le mauvais mécanisme à la mauvaise espèce |

**Règles du tableau volontairement non reprises**, et pourquoi : tularémie (lièvre, castor,
rat musqué — aucun point d'application) ; thuyone du cèdre (aucune infusion dans ce chapitre) ;
génératrice et monoxyde (aucun moteur en bâtiment ici — mais **si l'éditeur ajoute une chambre
froide à génératrice ou un fumoir motorisé, la règle doit entrer avec**). Le froid et
l'hypothermie **sont** repris, sous l'angle de l'immersion, parce que c'est le risque de mort
réel de cette espèce.

## 3. Dangers de l'encadré, avec leur mécanisme

Six entrées. Chacune porte un mécanisme, aucune ne se contente de « attention ».

1. **Immersion en eau froide** — choc hypothermique de la première minute (inspiration réflexe
   sous l'eau), perte de la force des mains en une dizaine de minutes, bien avant la baisse de
   la température centrale. Explique pourquoi le VFI sert à garder la tête hors de l'eau et
   non à nager.
2. **Trichinellose** — larves enkystées dans le muscle ; sel, séchage, fumage et congélation
   conservent sans stériliser ; seule la chaleur mesurée agit ; symptômes 5 à 15 jours plus
   tard, donc aucun lien fait avec le repas. **Avec la réserve documentaire écrite dans
   l'encadré même.**
3. **Botulisme** — production de toxine en anaérobiose, souches non protéolytiques inhibées
   seulement sous 3 °C, donc « au froid » n'est pas une protection ; aucune trace sensorielle.
   Le phoque est **nommé** par l'ASPC. Les gestes qui produisent le risque sont ceux qui ont
   l'air les plus soignés : c'est ce qui rend le point indispensable.
4. **Vitamine A du foie** — rétinol liposoluble, non éliminé par l'urine, accumulé dans le
   foie du mangeur, stable à la cuisson, sans signe d'alerte. Chiffré contre l'AMT, avec la
   règle pratique pour les enfants de 4 et 6 ans. **Distingué explicitement du cadmium des
   cervidés.**
5. **Bête malade ou échouée (H5N1)** — contamination par les mains, les yeux et les voies
   respiratoires **pendant la manipulation**, pas par l'assiette. Chiffré avec l'épisode de
   2022 dans l'estuaire.
6. **Confirmation de la mort** — le « réflexe de la nage » survient après la mort ; le
   mouvement n'est donc pas une information et l'immobilité non plus ; seule la palpation du
   crâne tranche. Double enjeu : morsure grave loin des soins, et article de règlement.

**Écartés de l'encadré pour ne pas le diluer**, et renvoyés ailleurs : coupures à l'écorchage
(§7, ch. 27) ; rancissement de l'huile (§7, ce n'est pas un risque d'intoxication grave) ;
refus qui attirent l'ours (§5-I étape 36, ch. 48) ; mal de caribou (§2 et §3, ch. 24) ;
cadmium des cervidés (traité en contraste, son chapitre d'origine est le 41).

**À surveiller par le vérificateur sécurité :** le point 2 est le seul de l'encadré dont
l'application à l'espèce repose sur la règle du projet plutôt que sur une source nommant
l'espèce. Il ne faut **ni le retirer, ni effacer la réserve** qui l'accompagne. Le point 4
transpose une valeur d'espèce arctique : même consigne.

## 4. Images requises

| # | Description | Cadrage | Format |
| --- | --- | --- | --- |
| 1 | Planche comparative : phoque commun (*Phoca vitulina*) et phoque gris (*Halichoerus grypus*), **têtes de profil et de face côte à côte**, avec le détail des narines — en V chez le commun, parallèles chez le gris. Légendes pointant le museau, le front et le pelage | Planche redessinée au trait, fond neutre, les quatre vues à la même échelle. **La différence de narines doit être lisible à la taille imprimée** : c'est le seul caractère qui ne dépend pas de l'angle | Demi-page |
| 2 | Coupe schématique de la paroi d'un phoque : peau, couche de lard continue, muscle. Le trait du couteau indiqué en pointillé aux deux endroits utiles — entre peau et muscle (étape 14) puis entre lard et peau (étape 15) | Schéma au trait, pas une photo. C'est le dessin qui explique tout le chapitre : **sans lui, la section 5-E ne se comprend pas à la première lecture** | Quart de page |
| 3 | Séquence de l'écharnage du lard à plat, en trois vignettes : peau posée lard vers le haut, lame longue en action à angle faible, peau nettoyée | Photos de JP, plan serré, mains gantées visibles, surface dure et claire | Demi-page |
| 4 | La fonte : lard en dés dans la marmite de fonte, puis filtration à chaud dans un linge, puis huile décantée en contenant opaque identifié à la date | Trois vignettes en bande. La dernière doit montrer **l'étiquette lisible** — espèce, date, usage (table ou lampe) | Quart de page |
| 5 | Thermomètre à sonde planté dans l'épaisseur d'une pièce de phoque en cuisson, affichage **74 °C** lisible | Photo, macro sur l'afficheur, sonde visible dans la chair et non contre l'os. **Même cadrage que la photo équivalente des chapitres 41 et 48** : la répétition visuelle est le but | Quart de page |
| 6 | La sortie : embarcation, VFI portés, VHF visible, traîne et corde. Photo documentaire, pas une photo d'ambiance | Plan large. Sert le premier point de l'encadré DANGER sans l'illustrer directement | Quart de page |

Aucune image de l'encadré DANGER, aucune image d'abattage. L'encadré se lit, il ne s'illustre
pas ; et une planche de mise à mort dans un livre que des enfants de 4 et 6 ans feuilletteront
n'apporte rien que le texte ne donne mieux.

## 5. Renvois vers d'autres chapitres

| Chapitre | Raison |
| --- | --- |
| 3 — Le froid lui-même | Immersion, choc hypothermique, travail des mains au froid |
| 7 — Des enfants de 4 et 6 ans | La règle du foie, et les seuils d'AMT par âge |
| 18 — Éclairage | L'huile de lampe, et la priorité de la lumière sur la table en urgence |
| 19 — Communiquer et savoir | VHF, plan de navigation, numéros à obtenir et à imprimer là |
| 20 — Se déplacer et le carburant | Glace, embarcation, eau froide |
| 21 — Le voisinage et le groupe de chasse | Ne pas sortir seul, surveillance mutuelle entre équipages |
| 24 — Le mal de caribou | Le problème que ce chapitre résout |
| 26 — Ce qu'un corps demande l'hiver | Densité énergétique du gras |
| 27 — Soigner quand il n'y a personne | Coupures à l'écorchage, morsure, tétanos |
| 31 — Ce qu'on ne peut pas soigner | Morsure grave loin des soins |
| 34 — Calendrier annuel de prélèvement | Où tombe le phoque dans l'année |
| 41 — Abats et organes | Foie, vitamine A, cadmium des cervidés — les deux chapitres partagent le chiffre faible |
| 42 — Ce que personne ne garde | Refus, organes anormaux, disposition |
| 43 — Comment lire une fiche d'espèce | Les douze champs, le socle chiffré |
| 48 — Ours noir | L'autre espèce à trichinelle, et les refus qui l'attirent |
| 61 — Pourquoi la viande pourrit | Décision sur une pièce mal refroidie |
| 62 — Le sel | Pourcentages sur le poids de la viande ; salpêtre et sa forme moderne |
| 63, 64 — Salaison à sec, saumure | Ce qui conserve sans protéger |
| 65, 66 — Fumage à froid, fumage à chaud et séchage | Idem, avec la perte d'intérêt du fumé à froid sur cette espèce |
| 67 — Pemmican et graisses | La fonte du lard, cœur du chapitre |
| 68 — Froid naturel | La variante d'urgence |
| 69 — Un congélateur plein qui dégèle | Viande dégelée |
| 72 — Fumer le poisson | Botulisme de type E |
| 73 — Conserves et marinades | Pourquoi aucune conserve de phoque |
| 79 — De la peau au cuir | Écharnage, salage temporaire, tannage |
| 80 — Babiche, tendons, cordage | Tendons |
| 81 — Coudre et chausser | Cuir imperméable |
| 82 — Affûter, limer, aiguiser | Le lard émousse vite |
| 86 — Leviers, poulies, treuils | Sortir la bête de l'eau ou de la glace |
| 89 — Savon et chandelles | Usages du gras |

Les 32 numéros ont été vérifiés contre la liste des 89 chapitres. **Aucun renvoi vers un
chapitre inexistant.**

## 6. Relecteur humain requis

Chapitre **nommé dans la liste de relecture humaine obligatoire** de `CLAUDE.md` (« Phoque »).
L'avis est en tête du fichier de chapitre, dans un encadré, avant la section 1.

- **Relecteur principal : un chasseur de phoque d'expérience détenteur d'un permis du MPO** —
  Basse-Côte-Nord, Îles-de-la-Madeleine ou Nunavik. Sections 5, 6 et 7. Ce qu'on lui demande
  précisément : (a) le tableau d'identification 5-B, qui n'a aucune source officielle ;
  (b) l'ordre des gestes de la section 5-E, en particulier dépouiller en laissant le lard sur
  la peau puis l'écharner à plat, contre la pratique inverse ; (c) le délai réel avant que le
  lard commence à nuire à la viande ; (d) la conduite de la fonte, la température et la durée ;
  (e) ce que le chapitre oublie et qu'un praticien nommerait en trente secondes.
- **Second avis : salubrité des aliments ou santé de la faune marine** (MAPAQ, ACIA, INSPQ,
  ou vétérinaire de la faune marine). Encadré DANGER, points 2, 3 et 4 seulement. Ce qu'on lui
  demande : l'application de la règle sur la trichinelle à une espèce que l'ACIA ne nomme pas ;
  la transposition de la valeur de vitamine A du phoque annelé aux espèces du Saint-Laurent ;
  et l'existence éventuelle d'un avis de consommation québécois ou fédéral sur la chair et le
  gras de phoque, que la rédaction n'a pas trouvé.

## 7. Notes pour l'éditeur

- **La planche 2 (coupe peau-lard-muscle) et la section 5-E doivent tomber sur la même double
  page.** C'est le seul endroit du chapitre où le texte seul ne suffit pas.
- **Ne pas fusionner les points 2 et 3 de l'encadré DANGER.** La trichinelle se règle par la
  chaleur, le botulisme se règle par le froid et par l'oxygène. Les confondre produirait la
  conclusion la plus dangereuse possible : « bien cuire suffit », ce qui est faux pour la
  toxine botulique, laquelle est déjà dans l'aliment avant la cuisson.
- **Ne pas retirer la réserve documentaire du point 2** (« l'ACIA nomme l'ours et le morse »).
  Elle a l'air d'un aveu de faiblesse ; c'est en réalité ce qui rend le reste du livre
  crédible, et la conduite prescrite ne change pas d'un iota.
- **Ne pas supprimer la mention « ce n'est pas 70 °C ».** La confusion phoque/poisson est
  prévisible chez un lecteur qui prend la bête depuis une embarcation, et elle coûterait 4 °C
  exactement là où ces 4 °C sont la seule barrière.
- Le chapitre ne donne **aucune date de saison, aucun quota, aucune zone**. Il nomme
  l'autorité fédérale et la rubrique, conformément à la règle du livre.
- **Sel et salpêtre :** le chapitre rappelle que les pourcentages se calculent toujours sur le
  poids de la viande et qu'ils sont au ch. 62 ; le salpêtre est nommé sans aucune quantité,
  avec sa forme moderne équivalente (sel nitrité de salaison) et le renvoi au ch. 62.
- **Noms latins présents :** *Phoca vitulina*, *Halichoerus grypus*, *Pagophilus
  groenlandicus*, *Cystophora cristata*, *Pusa hispida*, *Trichinella*, *Clostridium
  botulinum*. Le morse (*Odobenus rosmarus*) est nommé sans son nom latin dans le chapitre ;
  il figure dans le fichier de source. À trancher au glossaire.
- **Vocabulaire juridique à ne pas corriger :** le règlement fédéral dit qu'on **pêche** un
  mammifère marin et délivre un **permis de pêche**. Un éditeur qui « corrige » en « chasse »
  et « permis de chasse » envoie le lecteur chercher au mauvais endroit, au mauvais ministère.
  La phrase du chapitre qui le signale doit rester.
- Le chapitre 43 annonce le phoque au chapitre 52 et lui applique le socle chiffré : les deux
  textes concordent. Le chapitre 41 partage avec celui-ci la valeur de vitamine A : **si elle
  est corrigée, elle doit l'être aux deux endroits le même jour.**

## 8. Ce qui reste faible

- **Les contaminants.** C'est le trou le plus sérieux. Une famille de quatre, dont deux
  enfants de 4 et 6 ans, mangerait régulièrement la chair et surtout le **gras** d'un
  prédateur marin, et le livre n'a aucune limite de consommation à offrir. Le gras est
  précisément le tissu où s'accumulent les organochlorés. Si une source sort, elle ne
  s'ajoutera pas en note : elle changera la section 2 et possiblement l'encadré.
- **Les rendements et la teneur en gras.** Le chapitre affirme que le phoque est l'animal gras
  de la côte — c'est sa thèse — et il ne peut pas la chiffrer. L'affirmation reste défendable
  par le mécanisme (couche de lard continue, huile riche en oméga-3 selon le MPO), mais un
  lecteur qui veut planifier un hiver en kilogrammes n'a rien.
- **La section 5-B (identification).** Aucune source officielle. C'est le seul tableau du
  chapitre qui pourrait devoir être retiré en bloc si le relecteur ne le confirme pas.
- **La conservation de l'huile.** Aucune durée. Le chapitre s'en tire par un critère
  sensoriel, honnête mais imprécis, et il doit préciser à chaque fois que ce critère ne dit
  rien du botulisme.
- **Le transport et le partage de la viande.** Le règlement encadre la vente pour les cétacés
  et les morses, pas pour le phoque, et la rédaction n'a rien trouvé sur le partage entre
  voisins. Le ch. 21 traite le partage du gibier terrestre ; il faudra vérifier que rien ne
  diffère pour un mammifère marin.
- **La variante d'urgence est courte, et c'est voulu**, mais elle aboutit à un aveu : sans
  thermomètre, l'espèce sort du menu. Un lecteur en situation d'urgence lira ça comme un mur.
  Il n'y a pas de meilleure réponse honnête, et c'est peut-être l'argument le plus fort du
  livre pour garder deux thermomètres en stock (ch. 85).

## Notes retirées du chapitre — 23 septembre 2026

> ### ⚠ RELECTURE HUMAINE EXTERNE OBLIGATOIRE
>
> Ce chapitre ne part pas à l'impression sans avoir été lu par une personne compétente
> extérieure au projet. Relecteur requis : **un chasseur de phoque d'expérience détenteur d'un
> permis du MPO** — Basse-Côte-Nord, Îles-de-la-Madeleine ou Nunavik — pour les sections 5, 6
> et 7, et un **second avis en salubrité des aliments ou en santé de la faune marine** pour
> l'encadré DANGER. Motif : le chapitre décrit un abattage encadré par un règlement fédéral et
> une viande dont la seule barrière sanitaire est une température mesurée. La liste de
> relecture humaine obligatoire de `CLAUDE.md` nomme ce chapitre («Phoque »).

Section 5-B, après le tableau :

> la fiche chiffrée du MPO n'a pas été obtenue et le livre n'invente pas de dimensions. Les caractères ci-dessus viennent de la
> différenciation d'usage et non d'une page officielle : **l'ensemble du tableau porte
> `[À VÉRIFIER]`** et doit être confirmé par le relecteur externe.

Encadré DANGER, trichinellose :

> Le livre écrit **74 °C** là où l'ACIA écrit 71 °C, parce que le chiffre
> le plus haut couvre les deux.

> **Honnêteté du dossier :** la page de l'ACIA nomme l'ours et le morse ; elle ne nomme
> pas le phoque. La règle du projet l'applique aux deux, le morse est un pinnipède comme le
> phoque, et le coût d'appliquer la règle pour rien est nul. La preuve documentaire propre au
> phoque reste `[À VÉRIFIER]`. **La conduite, elle, ne change pas.**

Provenances retirées du texte (le fait reste imprimé, la source vit ici) :

- H5N1 dans l'estuaire (55 phoques en 2022, 3,7 fois la moyenne, 15 des 27 nécropsiés) : CDC, *Emerging Infectious Diseases*, 2024.
- Noms latins des quatre phoques du Saint-Laurent : CDC 2024, à confirmer contre la liste officielle des espèces fauniques.
- Six espèces de phoques au Canada, huile source d'oméga-3, interdiction du blanchon et du dos bleu depuis 1987, « réflexe de la nage » : MPO. Masses et longueurs absentes parce que la fiche détaillée du MPO n'a pas été obtenue.
- Phoque nommé parmi les viandes de mammifères marins associées au botulisme : Agence de la santé publique du Canada.
- Type E inhibé sous 3 °C, fumé réfrigéré à 4 °C ou moins ; AMT vitamine A 3 000 / 900 µg : Santé Canada.
- Citations sur *Trichinella* (salaison, séchage, fumage, micro-ondes ; congélation) : ACIA.

## Passe légal et signes — 23 septembre 2026

### Légal retiré du chapitre (texte d'origine, pour mémoire)

- Section 2, « C'est le bon choix » : « saison fermée, » retiré de la liste des raisons pour
  lesquelles le gros gibier n'est pas accessible.
- Section 2, blanchon et dos bleu : « et sa prise est interdite au Canada depuis 1987 » retiré.
  Reste le mécanisme : « C'est la bête qui fait les suivantes. »
- Section 2, paragraphe entier retiré : « Une seule chose est à savoir côté papier, parce
  qu'elle surprend : le phoque ne relève pas du secteur Faune du Québec mais du fédéral, et le
  texte parle de le **pêcher**, pas de le chasser. Qui cherche « chasse au phoque » du côté
  provincial ne trouve rien et conclut à tort que c'est libre. Ni date, ni quota, ni zone dans
  ce livre. »
- Section 5-A, champ 3 retiré en entier : « | 3 | **De qui ça relève** | **Du fédéral, pas du
  Québec** — et le texte dit *pêcher* un mammifère marin, pas le chasser. C'est la seule raison
  d'imprimer la ligne : on cherche au mauvais endroit et on conclut que c'est libre. Aucune
  date, aucun quota, aucune zone dans ce livre | ». Le titre passe de « La fiche d'espèce — les
  douze champs (ch. 43) » à « La fiche d'espèce (ch. 43) ». Les autres champs gardent leur
  numéro (1, 2, 4 à 12) pour rester alignés sur le chapitre 43, qui prévoit déjà que « le
  champ 3 devient muet et la fiche se lit sans lui ». **À coordonner :** le chapitre 43 définit
  encore le champ 3 comme « Statut réglementaire » ; si ce champ saute là aussi, la
  numérotation des fiches 44 à 60 est à revoir d'un seul coup.

Gardé, avec hésitation : « Une baleine, un marsouin, un dauphin, un morse : ça ne se prélève
pas ici » (section 2) et « un cétacé ou un morse ne se prélève pas ici » (5-B). Ça peut se lire
comme une interdiction légale ; le chapitre le justifie par le danger d'approcher un cétacé et
par un débitage différent. Laissé à JP.

### Note de bas de page ajoutée

- [^1] sur « désorientée » (section 2, bête malade) : ce qu'on a vu chez les phoques H5N1 de
  l'estuaire en 2022 — abattement profond, faiblesse, respiration difficile, signes nerveux.
  Source : CDC, *Emerging Infectious Diseases*, vol. 30, n° 6, juin 2024 —
  `sources/52-cdc-eid-h5n1-signes-cliniques-phoques.md`. La forme des signes nerveux n'est pas
  décrite par l'article : `[À VÉRIFIER]` dans la note. La dernière phrase de la note (un phoque
  qui reste sur la grève à l'approche n'est pas calme) reprend la conduite déjà écrite au
  chapitre (« Une bête qui se laisse approcher n'est pas une chance, c'est un signe »).
- Pas de note pour le « réflexe de la nage » : le texte dit déjà ce que c'est (la bête bouge
  après la mort) et ce qui tranche (la palpation du crâne).

## Levée des [À VÉRIFIER] — 24 septembre 2026

Verdicts : `suivi/verifications/52-verifications.md`.

- §1 **conservation de l'huile** (INTROUVABLE) : « des mois » coupé ; remplacé par le critère
  du point 28 (tant qu'il ne sent pas le rance). Absence vérifiée :
  `sources/52-alaska-dph-botulisme-ebullition-10-min.md`, `sources/52-mpo-phoques-especes-produits-securite.md`.
- §2 et §9-A, **bête maigre qui coule plus vite** (LEVÉ pour le mécanisme, INTROUVABLE pour la
  saison) : « de fin d'hiver » retiré, « c'est le lard qui la porte » ajouté. Provenance :
  `sources/52-biuw-2003-lard-et-flottabilite.md` (+ `52-pubmed-biuw-2003-lard-et-flottabilite.txt`).
- §2 note [^1], **signes chez le phoque malade** (LEVÉ, forme ajoutée) : toux, nez et yeux qui
  coulent, bête qui ne réagit plus, convulsions ; « de l'estuaire » retiré (les signes viennent
  des phoques du Maine, 2022, même virus). La description des convulsions est la définition du
  mot, pas la source. Provenance : `sources/52-noaa-h5n1-signes-chez-le-phoque-vivant.md`
  (+ `52-noaa-ume-phoques-maine-2022-2023.html`, `52-cdc-eid-2023-h5n1-phoques-nouvelle-angleterre.html`).
- §5-A champ 1, **noms latins** (LEVÉ) : les quatre confirmés. Provenance :
  `sources/52-noaa-quatre-phoques-fiches-especes.md` ; `sources/05-cdc-eid-h5n1-phoques-saint-laurent.md`.
- §5-A champ 4, **poids vif** (LEVÉ, valeurs ajoutées ; rendement INTROUVABLE) : phoque commun
  80 à 130 kg (source 82 à 129), Groenland 120 à 135 kg (118 à 136), capuchon 145 à 350 kg, gris
  250 kg la femelle, 400 kg le mâle. Provenance : `sources/52-noaa-quatre-phoques-fiches-especes.md`.
  Conséquence dans le même chapitre : champ 2 (« aucune masse ni longueur n'est imprimée »)
  devient « Poids au champ 4 ; aucune longueur n'est imprimée », et la phrase « Aucune masse,
  aucune longueur n'est donnée » sous le tableau 5-B est coupée.
- §5-A champ 5, **teneur en gras** (INTROUVABLE) : « la saison » retirée ; « une bête maigre en a
  peu ». Provenance : `sources/52-biuw-2003-lard-et-flottabilite.md`, `sources/52-noaa-quatre-phoques-fiches-especes.md`.
- §5-A champ 6, **contaminants** (LEVÉ sans chiffre) : accumulés dans le lard, le sang et les
  organes, foie compris ; aucune limite chiffrée. Provenance : `sources/52-noaa-quatre-phoques-fiches-especes.md`.
- §5-B **tableau d'identification** (LEVÉ pour profil, taille, pelage ; INTROUVABLE pour les
  narines) : ligne « Narines » coupée, ligne « Pelage » réécrite selon la source, phrase
  « L'ensemble du tableau porte [À VÉRIFIER] » retirée. Provenance : `sources/52-noaa-quatre-phoques-fiches-especes.md`.
- §5-G point 28, **pas de durée pour l'huile** (INTROUVABLE, ce qui confirme la phrase) :
  drapeau retiré, phrase gardée. Même provenance que §1.
- §5-I point 33 et §8 DANGER, **vitamine A du foie de phoque annelé** (CORRIGÉ) : 4 880 µg ÉAR
  (valeur calculée par l'USDA à 7,5 UI/µg) devient la mesure elle-même, **36 600 UI, environ
  11 000 µg par 100 g** (facteur 3,33 UI/µg pour la vitamine A préformée) ; les rapports passent
  de 1,6 et 5,4 fois à **près de 4 fois** l'AMT adulte et **12 fois** celui de l'enfant de 4 à
  8 ans (divisions du livre). Provenance : `sources/52-usda-fdc-foie-phoque-annele-vitamine-a.md`
  (+ `52-usda-fdc-168026-foie-phoque-annele.json`) ; facteur : `sources/26-sante-canada-anref-vitamines.md`.
- §8 DANGER, **trichinellose chez le phoque** (LEVÉ) : phrase ajoutée — trouvée chez le phoque
  lui-même, rarement, y compris chez le phoque gris ; *T. nativa* résiste au gel. Provenance :
  `sources/52-pubmed-trichinella-et-doigt-du-phoque.md` (+ `52-pubmed-trichinella-phoques-resumes.txt`).
- §8 DANGER, **infection après morsure** (LEVÉ pour la gravité, INTROUVABLE pour la vitesse) :
  « n'attend pas » remplacé par le « doigt du phoque » (morsure ou coupure, même sur une bête
  morte ; pénicillines inefficaces, tétracycline efficace). Provenance :
  `sources/52-pubmed-trichinella-et-doigt-du-phoque.md` (+ `52-pubmed-doigt-du-phoque-resumes.txt`).
- §9-F point 23, **durée d'ébullition** (INTROUVABLE selon l'épaisseur) : plancher ajouté,
  jamais moins de 10 minutes une fois le bouillon reparti, pour la toxine botulique ; présenté
  comme tel, pas comme preuve des 74 °C à cœur. Provenance :
  `sources/52-alaska-dph-botulisme-ebullition-10-min.md` (+ `52-alaska-dph-botulisme-education.html`).

Compression §3 et §4 — 27 septembre 2026 : 1176 mots → 222 mots (§3 418 → 111, §4 758 → 111) ; matériel coupé : compas et carte, personne à terre (reste à l'étape 4 et au §6), couteaux (→ §9-B), fusil à aiguiser (→ §9-B, point 8), gants, corde et traîne (→ §9-A), bassines, marmite (→ étape 24 et §9-C), contenants à huile (→ étape 26 et §9-D), sel, second thermomètre (étape 3 passée au singulier). Déplacé : le cap relevé à l'aller contre la brume, dans l'étape 6.
