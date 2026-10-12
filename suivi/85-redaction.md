> **Renuméroté le 24 septembre 2026** (six tomes) : ancien chapitre 18. Plus bas, les numéros de chapitre sont **les anciens** (table : plan/renumerotation.json).

# Fiche de suivi — Chapitre 18, Éclairage

- **Tome :** 1 — Tenir
- **Fichier :** `chapitres/18-eclairage.md`
- **Statut :** RÉD (rédigé, aucune porte passée)
- **Date de rédaction :** 20 septembre 2026
- **Ampleur :** environ 5 700 mots utiles pour les sections 1 à 9, plus la section 10.
  **C'est au-dessus de la cible de 5 000.** Estimation de mise en pages : 8 pages en 8 × 10
  hors images. Voir la note à l'éditeur sur les coupes possibles.

---

## 1. Chiffres marqués `[À VÉRIFIER]`

| # | Valeur | Où | Pourquoi ce n'est pas sourcé | Qui peut trancher |
| --- | --- | --- | --- | --- |
| 1 | **15 à 16 h** de noirceur en décembre à la latitude de la Côte-Nord | Section 1 | Aucune table officielle de lever et coucher du soleil récupérée. L'outil du CNRC a répondu 404 à la consultation | À sourcer : table de lever/coucher du soleil pour Sept-Îles ou Baie-Comeau, décembre. **Ce chiffre ouvre le chapitre : il ne part pas à l'impression non sourcé** |
| 2 | Tension au repos par état de charge, **profondeur de décharge maximale**, température de congélation d'une batterie plomb-acide | Sections 3 et 6 | Volontairement non chiffré : les valeurs dépendent du modèle installé | **Personne ne les met dans le livre.** Le chapitre renvoie à la fiche du fabricant de la batterie du chalet. JP colle la fiche près du panneau |
| 3 | Refus de charge des batteries **lithium-fer-phosphate sous 0 °C** | Section 3 | Affirmation d'usage, non sourcée | Fiche du fabricant, ou à retirer si personne ne la confirme. **Ajout du 2026-09-24 (correction du ch. 18b) :** la source existe et **contredit le 0 °C**. `sources/18b-victron-lithium-smart-manuel.md` : charge permise de +5 à +50 °C, dommage permanent sous +5 °C, et c'est le **système de gestion** qui coupe, selon un seuil réglable. À harmoniser au ch. 18 : « ne doivent pas se charger sous le seuil de leur fiche, +5 °C pour celle qu'on a lue ; c'est leur système de gestion qui coupe, s'il a cette coupure (ch. 18b, §3) ». Le ch. 18b est corrigé ; le texte du ch. 18 n'a pas été touché |
| 4 | Potentiel photovoltaïque et rapport d'inclinaison hiver-été à cette latitude | Section 3 | Cartes de Ressources naturelles Canada non récupérées : les pages d'efficacité énergétique consultées ne mènent pas aux cartes | À récupérer chez RNCan. Le chapitre n'avance aucun chiffre en attendant |
| 5 | **20 minutes** d'adaptation à l'obscurité ; effet protecteur du mode rouge | Section 3 | Physiologie de manuel, aucune page officielle consultée | À sourcer ou à reformuler sans chiffre |
| 6 | Comportement des piles par grand froid | Sections 3, 7 | Constat d'usage. Le chapitre évite volontairement de dire « les piles au lithium durent X fois plus » | Essai au chalet, ou fiche de fabricant |
| 7 | **Points d'éclair** de l'essence, du naphte, du kérosène et de l'huile à lampe, et leur classement en « liquide inflammable » ou « liquide combustible » | Section 8 | La page du gouvernement du Québec donne les plafonds (30 L / 5 L) **sans classer les produits**. La recherche Reptox de la CNESST a échoué : URL de recherche en 404, numéros de fiche inconnus | **Fiches Reptox de la CNESST, une par produit.** C'est le trou de traçabilité le plus gênant du chapitre, parce que le lecteur doit savoir dans quelle catégorie tombe son bidon |
| 8 | Mécanisme et gravité de **l'ingestion d'huile à lampe** par un jeune enfant | Section 8 | Le site du Centre antipoison du Québec n'a pas pu être chargé (erreur de certificat à la consultation) | Centre antipoison du Québec, ou INSPQ. Enfants de 4 et 6 ans dans la pièce : ça ne s'imprime pas sans source |
| 9 | Délai et mécanisme de la **brûlure par pile bouton avalée** | Section 8 | Page de Santé Canada non trouvée : les URL essayées ont répondu 404 et la recherche interne de canada.ca n'a rien donné par WebFetch | Santé Canada, sécurité des produits de consommation |

**Aucun autre nombre du chapitre n'est sans source.** Tous les autres portent leur organisme
entre parenthèses dans le texte. Les calculs de la section 3 (W = V × A, Ah) sont de
l'arithmétique sur des valeurs que le lecteur mesure lui-même, pas des données.

---

## 2. Points de traçabilité à régler avant l'impression

| Problème | Détail | Gravité |
| --- | --- | --- |
| **Ce que le ministère dit vraiment des lampes à l'huile** | La page « Prévenir les intoxications au monoxyde de carbone » nomme « les barbecues, les lampes à l'huile ou les réchauds » dans une liste d'appareils d'extérieur produisant du CO. Elle **n'interdit pas nommément** d'éclairer une pièce à la lampe à l'huile | **Élevée.** Le chapitre doit continuer de distinguer ce qui est officiel (la lampe produit du CO) de ce qui est une écriture du rédacteur (les conditions pour la tolérer à l'intérieur). Ne pas « resserrer » en prêtant au ministère une interdiction qu'il n'a pas écrite |
| **Les conditions posées pour tolérer une flamme à l'intérieur** | Une seule flamme, quelqu'un d'éveillé, entrée d'air ouverte, avertisseur à affichage en ppm, 0 ppm, jamais pendant le sommeil. Section 8, partie 2 | **Élevée.** Écriture du rédacteur. À valider ou à réécrire par le relecteur en sécurité incendie |
| **L'emplacement de l'avertisseur de CO dans un chalet d'une pièce** | Les deux consignes officielles — pas à moins de 2 m d'un appareil de combustion, et un appareil dans chaque chambre où l'on dort porte fermée — désignent le même volume. Le chapitre tranche (côté couchage, jamais entre le poêle et la lampe) | **Moyenne.** Même arbitrage qu'au ch. 14. Les deux chapitres doivent trancher pareil, ou le livre se contredit |
| **Sens de la distance de 2 m** | Vérifié explicitement à la consultation : il s'agit d'une distance à **éviter**, pas d'une consigne de rapprochement. Le sens inverse aurait produit une erreur du type « 71 °C au lieu de 74 °C » | **Réglée.** Consignée dans `sources/18-quebec-avertisseurs-de-monoxyde-de-carbone.md` |
| **Aucune statistique d'incendie** | Rien sur la part des incendies attribuable aux chandelles sur les pages consultées. Le chapitre n'en avance aucune | **Faible.** À ajouter seulement si le rapport annuel du ministère de la Sécurité publique la donne |
| **Recherche Reptox de la CNESST infructueuse** | URL de recherche en 404 ; les numéros de fiche des produits d'éclairage sont inconnus. Les fiches propane (1651) et monoxyde de carbone (1172) utilisées au ch. 14 montrent que le format d'URL par `no_produit` fonctionne | **Moyenne.** Une seule consultation réussie règle le point 7 du tableau ci-dessus |

---

## 3. Rappels de sécurité de `CLAUDE.md` repris dans ce chapitre

Repris avec leur mécanisme, parce que quelqu'un ouvre le livre à cette page :

| Règle du tableau | Où elle est dans le chapitre |
| --- | --- |
| **Génératrice : jamais** dans un bâtiment, un garage ou sous un auvent | Section 2, section 5 (étape 27), section 8, encadré DANGER, partie 2 |
| **Viande maigre seule = mal de caribou, mortel en 2 à 3 semaines** | Section 9, « ce qu'on perd » — le gras brûlé pour éclairer est du gras qui n'est pas mangé. Renvoi aux ch. 24 et 26 |

**Écartés volontairement**, pour ne pas diluer l'encadré : cuisson du gibier à 74 °C,
cadmium des cervidés, trichinellose, tularémie, thuyone du cèdre, botulisme de type E. Aucun
ne porte sur le sujet du chapitre. Le chapitre 18 touche la graisse animale (section 9) mais
ne donne aucune consigne de consommation : tout est renvoyé aux ch. 41, 48, 52 et 67.

**Ajout propre au chapitre**, absent du tableau de `CLAUDE.md` et qui mériterait d'y entrer :
**aucune flamme ne dort dans un chalet**, et **une lampe à l'huile est un appareil de
combustion sans cheminée**. Ces deux formules servent aussi aux ch. 14, 15, 16 et 89.

---

## 4. Images requises

| # | Sujet | Cadrage | Format | Notes |
| --- | --- | --- | --- | --- |
| 18-1 | **Les trois étages de l'éclairage** | Coupe de la pièce unique : point 12 V au plafond au-dessus de la table, deux personnes portant une frontale, une seule lampe à flamme sur la table, avertisseur de CO du côté couchage. Les trois étages numérotés 1-2-3 sur le dessin | Demi-page | Planche dessinée. C'est le plan du chapitre en une image, à placer en ouverture |
| 18-2 | **Ce qu'une flamme rejette dans la pièce** | Deux moitiés côte à côte. À gauche, poêle à bois : cheminée, entrée d'air, flèches des gaz qui sortent. À droite, lampe à l'huile : aucune évacuation, flèches de vapeur d'eau, de suie et de CO qui restent dans le volume. CO représenté en gris uniforme dans toute la pièce, pas en nuage localisé | Demi-page | **La planche la plus importante du chapitre.** Elle porte à elle seule le mécanisme de l'encadré DANGER. À dessiner, jamais à photographier. Cohérente avec la planche 14-2 : même code de couleurs pour le CO |
| 18-3 | **Où poser l'avertisseur de CO dans un chalet d'une seule pièce** | Plan au sol vu de dessus : poêle, table à lampe, couchage. Cercle de 2 m tracé autour du poêle et autour de la table à lampe. Position retenue marquée du côté couchage, hors des deux cercles | Quart de page | Montre le conflit entre les deux consignes officielles au lieu de le taire. **Doit être identique au plan 14-3** ou le livre se contredit d'un chapitre à l'autre |
| 18-4 | **La lampe à graisse** | Gros plan trois quarts : écuelle de tôle, graisse figée d'un côté et fondue près de la flamme, mèche de coton posée sur le bord avec 5 à 8 mm de mèche sortie, flamme nette et stable. Fond sombre | Demi-page | **Photo de JP**, ou planche dessinée si la photo ne rend pas la mèche lisible. L'objet de l'image est la hauteur de mèche : c'est le seul réglage de la lampe |
| 18-5 | **Les deux mesures de la chandelle** | Deux vignettes. À gauche : mèche coupée, règle montrant 5 mm avant l'allumage. À droite : chandelle en fin de vie, règle montrant 5 cm, main qui l'éteint | Quart de page | Les deux chiffres du gouvernement du Québec, rendus visibles. Règle graduée obligatoire dans le cadre, sinon l'image ne prouve rien |
| 18-6 | **Le panneau en inclinaison hivernale** | Même panneau, deux photos : couvert de neige un matin de janvier, puis dégagé au balai. Cadrage large pour montrer l'inclinaison forte et le dégagement au sol | Quart de page | **Photo de JP, l'hiver.** Le point de l'image : un panneau enneigé produit zéro, pas « moins » |
| 18-7 | **Le tableau de bord 12 V** | Gros plan : afficheur de tension lisible, porte-fusibles étiquetés, cosses propres. Lumière rasante pour que les étiquettes se lisent | Quart de page | **Photo de JP.** Sert aussi au ch. 85. L'afficheur doit être net : le chapitre demande un relevé quotidien, l'image montre où on le lit |

**Rien ne se copie du web.** Les planches 18-1, 18-2 et 18-3 sont à dessiner. Les photos 18-4
à 18-7 sont des photos de JP. Voir `images/credits.md`.

---

## 5. Renvois vers d'autres chapitres

| Chapitre | Raison du renvoi |
| --- | --- |
| 3 — Le froid lui-même | La batterie déchargée qui gèle, le travail dehors à la frontale |
| 7 — Des enfants de 4 et 6 ans | Lampe attribuée à chaque enfant, exercice d'évacuation de jour, huile à lampe hors de portée |
| 8 — Le stock permanent du chalet | Piles, ampoules, mèches, verres de cheminée, combustible d'éclairage |
| 12 — Ce qui manque toujours | Seuil de ravitaillement des piles et du combustible |
| 14 — Sans propane | Le fanal et la lanterne au propane, et le trou que laisse leur perte. **Les deux chapitres doivent trancher pareil sur l'emplacement de l'avertisseur de CO** |
| 15 — Poêles à bois et rendement | Porte de poêle entrouverte pour l'éclat, tirage dérangé |
| 16 — Le feu au chalet | Départ d'incendie par flamme nue, évacuation |
| 17 — Feu sans allumettes | Allumer une lampe quand il n'y a plus d'allumettes ; écorce de bouleau |
| 20 — Se déplacer et le carburant | Génératrice de charge, réserve de carburant, regroupement des charges |
| 24 et 26 — Mal de caribou / Ce qu'un corps demande l'hiver | Le gras brûlé pour éclairer est du gras qui n'est pas mangé |
| 27 et 29 — Soigner quand il n'y a personne / Bâtir la pharmacie | Ce que la lumière de la variante d'urgence ne permet pas de faire |
| 32 — Tenir le moral tout un hiver | Quinze heures de noirceur par jour |
| 33 — Les enfants, la peur et la routine | Point lumineux fixe à heure fixe, veilleuse sans flamme |
| 41, 48, 52 — Abats et organes / Ours noir / Phoque | D'où vient la graisse de la lampe |
| 60 — Sève, gomme, écorces | Gomme d'épinette noire, écorce de bouleau |
| 67 — Pemmican et graisses | Fonte et conservation du gras à brûler |
| 85 — Le stock de pièces et de consommables | Fusibles, cosses, fils, batterie de remplacement |
| 89 — Savon et chandelles | Fabrication des chandelles de suif. **Le ch. 18 ne donne aucune méthode de fabrication, tout est délégué ici** |

Tous vérifiés contre la liste des 89 chapitres. Aucun renvoi inventé.

---

## 6. Relecteur humain requis

**Oui — pompier ou préventionniste en sécurité incendie.** Le même que pour les ch. 14 et 16 ;
les trois chapitres devraient voyager ensemble.

Trois passages le justifient :

1. **L'encadré DANGER de la section 8 en entier**, et surtout sa partie 2 : les conditions
   posées pour tolérer une flamme d'éclairage à l'intérieur d'un chalet fermé sont une
   écriture du rédacteur, pas une consigne officielle.
2. **L'emplacement des deux avertisseurs dans un chalet d'une seule pièce** (section 5,
   étape 7), où deux consignes officielles se contredisent et où le livre tranche.
3. **La règle des liquides inflammables** (section 8, partie 3) : les plafonds sont officiels,
   mais le classement des combustibles d'éclairage dans l'une ou l'autre catégorie ne l'est
   pas encore. Un préventionniste le dit en trente secondes.

Le chapitre 18 n'est pas dans la liste des relectures obligatoires de `CLAUDE.md`. **Il devrait
y être ajouté**, avec les ch. 14 et 16.

---

## 7. Notes pour l'éditeur

- **Le chapitre fait environ 5 700 mots utiles, soit 700 de trop.** Les coupes possibles, dans
  l'ordre où elles font le moins de dégât : le tableau « quel étage pour quelle tâche » de la
  section 2 (il double la section 5), le paragraphe sur la géométrie de la lumière en
  section 3, et deux ou trois lignes de la section 7. **Ne pas couper dans la section 8 ni
  dans la liste des pertes de la section 9** : ce sont les deux endroits où le chapitre change
  un comportement.
- **Le fait le plus contre-intuitif du chapitre, à ne pas perdre au resserrement :** le
  gouvernement du Québec range nommément « les lampes à l'huile » parmi les appareils qui
  dégagent du monoxyde de carbone, dans la même liste que le barbecue et le réchaud de camping.
  Personne n'y pense en allumant une lampe pour lire. C'est l'argument du chapitre.
- **Le contenu le plus spécifiquement Côte-Nord** est la lampe à graisse de la section 9, et le
  fait que le gras brûlé soit du gras qui n'est pas mangé. Si quelque chose doit gagner de la
  place, c'est ça.
- **Un seul encadré DANGER, en quatre parties.** Résister à la tentation d'en faire quatre : le
  chapitre en serait couvert et plus personne ne les lirait.
- **Chevauchement à arbitrer avec le ch. 14** sur le monoxyde de carbone et les avertisseurs.
  Le ch. 18 redonne le mécanisme et les deux valeurs de Santé Canada, mais laisse au ch. 14
  l'argument complet sur les seuils de déclenchement de la norme CAN/CSA-6.19. Vérifier que le
  ch. 14 ne renvoie pas en sens inverse, sinon l'information n'existe nulle part.
- **La section 9 ne doit pas se lire comme un mode de vie acceptable.** Les cinq pertes
  nommées, dont la perte des deux avertisseurs et la perte des calories, sont ce qui l'empêche.

## Notes retirées du chapitre — 23 septembre 2026

1. §3, paragraphe du soleil de décembre, phrase retirée telle quelle (note de rédaction, remplacée
   dans le chapitre par un simple drapeau `[À VÉRIFIER]`) : « Le potentiel photovoltaïque chiffré
   à cette latitude et les rapports d'inclinaison hiver-été demandent les cartes de Ressources
   naturelles Canada, non récupérées à la rédaction [À VÉRIFIER]. »

Provenance des attributions retirées du texte à la même date (pour qui vérifie) : MSSS /
gouvernement du Québec (« les barbecues, les lampes à l'huile ou les réchauds ») ; Santé Canada
(« appareils de combustion raccordés ou non », valeurs-guides 25 ppm sur 1 h et 10 ppm sur 24 h) ;
symptômes du CO (« maux de tête; fatigue; nausées; vomissements; étourdissements ») donnés comme
« officiels ».

## Passe « pas de code légal, signes en bas de page » — 23 septembre 2026

**Retiré (code légal).** Les plafonds d'entreposage de la section 8, partie 3 (30 L dont 5 L
d'inflammables dans un logement, 50 L dont 30 L dans un garage ou un cabanon) : ce sont des
maximums réglementaires (page Québec.ca, `18-quebec-produits-dangereux-entreposage.md`), pas un
mécanisme. Le drapeau `[À VÉRIFIER]` sur le classement des produits dans ces deux catégories est
parti avec eux. Gardé, dit comme un fait : la quantité entreposée est la taille du feu ; ce qui ne
sert pas sort du volume habité, l'essence et le naphte d'abord, parce qu'ils font un nuage à la
température de la pièce (mécanisme déjà écrit au même paragraphe). Les trois renvois « sous les
plafonds de la section 8 » (§4, étape 9, §6) disent maintenant « hors du volume habité sauf ce qui
sert ». Le drapeau `[À VÉRIFIER]` sur les points d'éclair reste.

**Note [^1] (§8, partie 4, « atteinte pulmonaire chimique »).** Signes : toux et étouffement au
moment d'avaler ; toux qui continue, respiration rapide, peau bleutée ; gêne respiratoire parfois
retardée de plusieurs heures. Source : Manuels Merck grand public, *Intoxication par les
hydrocarbures* (`18-merck-intoxication-hydrocarbures.md`), référence médicale et non
gouvernementale ; le mécanisme (liquide qui passe dans les poumons) est recoupé par Santé Canada,
*Mesures de sécurité pour les lampes à l'huile* (`18-sante-canada-lampes-a-l-huile.md`), qui ne
décrit aucun signe. Le drapeau `[À VÉRIFIER]` du paragraphe (mécanisme, Centre antipoison) est
laissé tel quel, selon la ligne 18 du fichier de doutes.

**Doutes de la passe paperasse (ch. 18).** Aucune des cinq lignes ne touche du légal, du
municipal ou un signe non expliqué : laissées telles quelles.

## Levée des [À VÉRIFIER] — 24 septembre 2026

Verdicts : `suivi/verifications/18-verifications.md` (11 drapeaux : 9 levés, 2 corrigés).

- **§1, quinze à seize heures de noirceur en décembre** — confirmé : 15 h 39 à 15 h 59 du coucher au lever à Sept-Îles. `sources/16c-sept-iles-lever-coucher-soleil-hiver.md`.
- **§3, valeurs de la batterie au plomb** — confirmées et insérées : 12,73 V pleine, 12,10 V à la moitié, gel vers -52 °C à 85 % et -27 °C à 62 %, lecture valable après 6 h de repos ; renvoi au tableau du ch. 18b §3. `sources/18b-trojan-batteries-plomb-froid-et-charge.md`, `sources/18b-trojan-entretien-batteries.md`, `sources/85-rolls-batterie-plomb-entreposage-gel.md`.
- **§3, lithium-fer-phosphate** — corrigé : 0 °C → 5 °C (la cellule chargée sous 5 °C s'abîme ; c'est le système de gestion qui coupe la charge, pas la chimie qui refuse). `sources/18b-victron-lithium-smart-manuel.md`.
- **§3, solaire en décembre** — valeurs insérées : 0,47 kWh/jour/kW à plat, environ 1,3 kWh à 60° et plus, près de trois fois ; en juin, le panneau à plat rend le plus. `sources/18b-pvgis-production-solaire-cote-nord.md`.
- **§3, adaptation à l'obscurité** — corrigé : une vingtaine de minutes → une demi-heure ; la seconde de lumière vive confirmée ; ajout de la parade de l'œil fermé. `sources/18-faa-vision-de-nuit-adaptation-lumiere-rouge.md`.
- **§3, mode rouge** — confirmé (n'abîme pas la vision de nuit) ; ajouté : fausse les couleurs. Même source.
- **§4 étape 14 et §6, lecture de tension** — la lecture passe du soir au matin, lumières éteintes depuis le coucher : la tension ne vaut qu'après 6 h de repos. Cible : 12,56 V ou plus l'hiver (85 %), jamais sous 12,10 V. Étape 14 alignée sur le §6 pour que le chapitre ne se contredise pas. `sources/18b-trojan-batteries-plomb-froid-et-charge.md`, `sources/18b-trojan-entretien-batteries.md`.
- **§7, frontale au froid** — confirmé : alcaline qui décroche vers -20 °C, revient au chaud ; AA au lithium jusqu'à -40 °C. `sources/18-energizer-piles-au-froid.md`.
- **§8 partie 3, points d'éclair** — valeurs insérées : essence -43 °C, naphte de camping sous -18 °C, kérosène 38 °C environ, huile à lampe paraffinique 97 °C. `sources/18-points-d-eclair-combustibles-eclairage.md`.
- **§8 partie 4, huile à lampe avalée** — mécanisme confirmé (aspiration pulmonaire, ne pas faire vomir) ; huile paraffinique claire comme de l'eau. `sources/18-sante-canada-lampes-a-l-huile.md` (+ `.html`), `sources/18-points-d-eclair-combustibles-eclairage.md`, `sources/18-merck-intoxication-hydrocarbures.md`.
- **§8 partie 4, pile bouton** — confirmé et précisé : brûlure en aussi peu que deux heures, même usée, enfant parfois sans signe ; miel en route. `sources/18-sante-canada-piles-bouton.md` (+ `sources/18-sante-canada-piles-bouton-avis.html`).
- **§9, mal de caribou** — « deux à trois semaines » → « quelques semaines » (décision prise pour tout le livre ; aucun chiffre).
- Compression §3 et §4 — 27 septembre 2026 : 2079 mots → 245 mots (§3 : 1026 → 121, cinq phrases ; §4 : 1053 → 124, tableau de 19 lignes → 6 items au format validé) ; matériel coupé : piles des avertisseurs (et la priorité au côté couchage), batterie de service et contrôleur (le voltmètre la porte ; batterie de démarrage et montage en parallèle coupés), piles de rechange et chargeur 12 V (format unique déjà en §7), points lumineux DEL, panneau et balai (§5 étape 6, §9), chandelier (déjà en §8 et §9), chandelles, ciseau à mèche, lampe à l'huile, verres et mèches de rechange (§9), huile à lampe et entonnoir (§5 étape 9, §8), réflecteurs (§5 étape 12, §9), fanal (déjà interdit à l'intérieur en §2), couverture de laine, quantités et paragraphe de renvoi au ch. 00b ; §3 : arithmétique des watts et ampères-heures (§5 étapes 3-4), valeurs de la batterie au plomb (§6, ch. 86), production solaire chiffrée de Sept-Îles, maison/chalet, piège du CO sans avantage au village, œil fermé, géométrie de l'éclairage, la lumière comme horaire des enfants (ch. 40, ch. 36) ; déplacé : lumière rouge qui fausse les couleurs (jamais pour lire une étiquette ni trier des médicaments) → §5 étape 13 ; gardés en §4 : « jamais un clou ni d'aluminium » pour les fusibles, sable sec plutôt que l'eau sur un combustible en feu.
