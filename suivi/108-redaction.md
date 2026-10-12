> **Renuméroté une deuxième fois le 27 septembre 2026** (agriculture au tome 5) : chapitre 104 avant cette date. Table : plan/renumerotation-2.json.

> **Renuméroté le 24 septembre 2026** (six tomes) : ancien chapitre 85. Plus bas, les numéros de chapitre sont **les anciens** (table : plan/renumerotation.json).

# Suivi de rédaction — Chapitre 85, Le stock de pièces et de consommables

- **Tome :** 4 — Conserver et réparer
- **Fichier :** `chapitres/85-le-stock-de-pieces-et-de.md`
- **Poste :** rédacteur (rôle 2)
- **Date de la fiche :** 2026-09-20
- **Ampleur :** **6 138 mots** au compte du script (marquage, `code` et URL retirés), dont
  **5 501** dans les sections 1 à 9 et environ 640 dans la section 10. **C'est au-dessus de la
  fourchette de commande (2 500 à 5 000 mots utiles).** Une part importante du compte est en
  cellules de tableau, où un « mot » vaut une demi-idée : le chapitre compte **six tableaux de
  référence** (matériel, consommables datés, pièces par système, quincaillerie, lieux de
  rangement, points de contrôle) plus le tableau des signes d'échec. Candidats à la coupe si
  l'éditeur veut rentrer sous 5 000 : le tableau §5.4 (quincaillerie), qui est le moins dense en
  information non déductible, et les deux dernières lignes de §5.3.
- **Gabarit :** les dix points de `gabarit-chapitre.md`, dans l'ordre, avec les titres du gabarit.
  Chapitre de **référence** : la procédure numérotée de la section 5 est remplacée par des
  tableaux, comme le gabarit l'autorise. L'ordre général et l'encadré danger sont conservés.
- **Relecture humaine :** **non obligatoire** selon la liste de `CLAUDE.md`. Une relecture par un
  préventionniste en sécurité incendie est **recommandée** et déclarée en section 10 du chapitre.

---

## 1. Ce que le chapitre refuse de publier, et qui est une décision

C'est le point le plus important de cette fiche. Un chapitre de stock attire les quantités rondes.
Le chapitre n'en publie aucune.

1. **Aucune quantité de pièces.** Ni « trois bougies », ni « deux courroies », ni « cinq litres ».
   La section 5.1 explique pourquoi et publie une **méthode de dimensionnement** à trois questions
   plus la règle « consommation de la saison précédente relevée au registre, doublée la première
   année ». Un vérificateur qui cherche des quantités n'en trouvera pas : ce n'est pas un oubli.
2. **Aucune durée de conservation de carburant.** Le mécanisme de séparation de phase est publié,
   la durée ne l'est pas — aucune source officielle canadienne n'en donne.
3. **Aucune méthode de purge d'une bouteille sous pression** périmée ou endommagée.
4. **Aucune conversion de la DL50 de l'éthylène glycol en millilitres pour un enfant.** Motif écrit
   dans le chapitre et dans `sources/85-sante-canada-ethylene-glycol.md` : une dose létale médiane
   est une moyenne de population, pas un seuil individuel, et la convertir fabriquerait un faux
   seuil rassurant. La consigne est binaire — toute ingestion soupçonnée, on appelle.
5. **Aucune méthode d'extinction d'un feu de pile au lithium.** Le CCHST n'en donne pas.
6. **Aucune durée d'aération** d'un bâtiment infesté avant d'y entrer.

---

## 2. Les chiffres `[À VÉRIFIER]`

| # | Valeur ou affirmation | Où | Marqué dans le texte | Ce que le chapitre fait | Qui doit trancher |
| --- | --- | --- | --- | --- | --- |
| 1 | **Numéro du Centre antipoison, 1 800 463-5060** | §8, encadré antigel | Non — publié comme donnée ferme | Publié sur la foi de la fiche INSPQ *Mieux vivre*. Le site du Centre antipoison (CIUSSS de la Capitale-Nationale) n'a **pas** pu être capté : erreur de certificat TLS le 2026-09-20 | **Éditeur, avant impression.** Un mauvais numéro dans un encadré DANGER est pire que pas de numéro |
| 2 | **Goût sucré de l'éthylène glycol** | §8 | **Oui**, en ligne | Mentionné parce qu'il explique le volume ingéré par un enfant; ne porte aucune conclusion seul | Vérificateur sécurité |
| 3 | **Durée de conservation de l'essence / essence oxygénée** | §5.2, §7 | **Oui**, en ligne dans le tableau | Publie le mécanisme (l'éthanol capte l'eau, la phase alcool-eau descend au fond, le tuyau d'aspiration prend le fond), aucune durée | Vérificateur technique |
| 4 | **Durée de vie des piles alcalines** | §5.2 | **Oui**, en ligne | Renvoie à la date de l'emballage, reportée au registre | Vérificateur technique |
| 5 | **Température de gel d'une batterie au plomb** selon l'état de charge | §5.2, §7 | **Oui**, en ligne | Publie la règle qualitative (déchargée = gèle bien plus haut; gelée = rebut), aucune température | Vérificateur technique |
| 6 | **Durée d'entreposage des électrodes, scellants, colles, époxys** | §5.2 | **Oui**, en ligne | Renvoie à la date du fabricant | Éditeur, avec le chapitre 84 |
| 7 | **Critères visuels de rancart d'une bouteille sous pression** (rouille de pied, bosses, collerette tordue) | §7 | **Oui**, en ligne | Renvoie au distributeur; interdit la purge maison | Vérificateur sécurité |
| 8 | **Durée de vie et entretien d'un extincteur portatif résidentiel** | §4, §6 | Non — le chapitre ne publie simplement aucune fréquence | La fiche française de Québec.ca a retourné **HTTP 404** sur deux URL reconstruites; seule la version anglaise existe dans les résultats de recherche | Éditeur : retrouver l'URL française |
| 9 | **Durée d'aération avant d'entrer** dans un bâtiment infesté | §8 | Non | « ouvrir portes et fenêtres et sortir le temps que l'air se fasse », sans chiffre | Vérificateur sécurité |

**Les chiffres les plus exposés ne sont pas dans ce tableau.** Ce sont les chiffres **sourcés**, donc
ceux qu'une erreur de recopie abîmerait sans bruit. À recompter un par un contre les fiches de
`sources/` :

| Chiffre | Valeur publiée | Fiche source |
| --- | --- | --- |
| Liquides inflammables, logement | 30 L dont 5 L d'inflammables | `85-quebec-produits-dangereux-entreposage.md` |
| Liquides inflammables, garage ou cabanon | 50 L dont 30 L d'inflammables | idem |
| Distance génératrice | au moins 6 m (20 pi) | `85-sante-canada-generatrice-monoxyde.md` |
| Séparation oxygène / gaz inflammables | 6,1 m (20 pi), ou mur de 1,5 m résistant ½ h | `85-cchst-bouteilles-gaz-comprime.md` |
| Température maximale, local à bouteilles | 50 °C (RBQ) / 51,7 °C (CCHST) | `85-rbq-propane-interieur-batiment.md`, `85-cchst-bouteilles-gaz-comprime.md` |
| Propane à l'intérieur d'un bâtiment | 5 lb (environ 2,3 kg) | `85-rbq-propane-interieur-batiment.md` |
| Exception sous le niveau du sol | 2,5 m de hauteur, 240 m²/kg | idem |
| Requalification des bouteilles | 10 ans, installation inscrite auprès de TC | `85-transports-canada-requalification-bouteilles.md` |
| Avertisseur de fumée | 10 ans depuis la **date de fabrication** | `85-quebec-avertisseurs-fumee-et-monoxyde.md` |
| Piles au lithium d'avertisseur de CO | 10 ans; appareil remplacé selon le fabricant | idem |
| Hydrogène, limites d'explosion | 4,1 % à 72 % | `85-cchst-chargement-accumulateurs-plomb.md` |
| Rinçage acide sulfurique | au moins 30 min | idem |
| Rinçage produit chimique générique | au moins 15 min | `85-inspq-premiers-soins-intoxication.md` |
| Entreposage lithium-ion | 30 à 50 % de charge; pas de charge sous 0 °C | `85-cchst-piles-lithium-ion.md` |
| Éthylène glycol, DL50 | 1 570 mg/kg p.c. (humain), catégorie 4 | `85-sante-canada-ethylene-glycol.md` |
| Javel, hantavirus | 1 partie de javel pour 9 parties d'eau, 10 min | `85-aspc-hantavirus-nettoyage.md` |

---

## 3. Écarts entre autorités, laissés visibles dans le chapitre

1. **Rinçage : 15 min (INSPQ) contre 30 min (CCHST).** Les deux pages ne couvrent pas le même
   produit. Le chapitre applique la plus longue quand on ne sait pas à quoi on a affaire, et le
   dit.
2. **50 °C (RBQ) contre 51,7 °C (CCHST).** Même 125 °F arrondi autrement. Le chapitre retient
   50 °C et nomme l'écart, pour qu'un lecteur qui trouve l'autre chiffre ailleurs ne croie pas à
   une erreur.
3. **Génératrice : 6 m (Santé Canada) contre 3 m (fiches provinciales et municipales).** Le
   chapitre retient 6 m. **Note pour l'éditeur :** le chapitre 8 publie les deux valeurs
   différemment (3 m tiré de Québec.ca, 6 m de Santé Canada). **Les deux chapitres doivent dire la
   même chose.** C'est une incohérence de livre à régler à l'édition, pas dans un seul chapitre.

---

## 4. Les rappels de sécurité de `CLAUDE.md` repris ici

| Règle du tableau | Reprise dans ce chapitre |
| --- | --- |
| Génératrice : jamais dans un bâtiment, un garage ou sous un auvent — *s'applique à « stock, carburant, électricité »* | **Oui**, §8, premier encadré, avec le mécanisme du CO (fixation sur l'hémoglobine, symptômes qui arrivent après la montée, la personne qui dort ne se réveille pas) et la distance de 6 m |
| Le botulisme ne change ni l'odeur, ni le goût, ni l'apparence — *s'applique à « salaison, conserves, poisson »* | **Oui**, §5.2, en note sous le tableau des consommables datés, parce que le tableau contient les couvercles de conserverie à usage unique. Renvoi au chapitre 73 pour la procédure |

Les autres lignes du tableau (cuisson à 74 °C, foie et reins de cervidés, trichinellose, tularémie,
thuyone du cèdre, botulisme de type E à 3 °C, mal de caribou) ne s'appliquent pas à un chapitre de
stock de pièces et n'ont **pas** été insérées. Les diluer ici les affaiblirait là où elles
comptent.

---

## 5. Les encadrés DANGER, et pourquoi il y en a quatre

Le gabarit interdit la dilution. Quatre encadrés, c'est beaucoup. Chacun porte un risque de **mort
ou d'intoxication grave** et un **mécanisme** distinct :

1. **Vapeurs de carburant et moteur qui tourne** — vapeurs plus lourdes que l'air qui rampent
   jusqu'à une source d'allumage à plusieurs mètres; monoxyde de carbone qui prend la place de
   l'oxygène sur l'hémoglobine.
2. **Antigel et produits transvidés** — l'éthylène glycol n'est pas toxique en soi, ce sont ses
   métabolites acides qui détruisent les reins, d'où le délai entre l'ingestion et
   l'effondrement. Le vrai vecteur, dans un cabanon, est le **transvidage** dans un contenant
   alimentaire.
3. **Ouvrir un bâtiment de rangement au printemps** — le hantavirus se **respire**, et c'est le
   balai qui le met en suspension.
4. **Ce qui est sous pression dans un cabanon fermé** — paroi mince et forte énergie; l'oxygène
   comburant qui enflamme une graisse sans étincelle; l'hydrogène de charge explosif de 4,1 % à
   72 %.

**Si l'éditeur veut n'en garder que trois**, le candidat à la fusion est le quatrième, dont la
partie batteries peut descendre en §5.5 et en §7 sans perdre le mécanisme. La partie oxygène
comburant, elle, ne peut pas quitter l'encadré : c'est le seul endroit du livre où un geste
ordinaire — graisser un raccord — allume un feu sans étincelle.

---

## 6. Images requises

| # | Sujet | Cadrage | Format |
| --- | --- | --- | --- |
| 1 | Le mur de rangement par système : bacs opaques étiquetés, liste collée sous le couvercle, registre accroché au bout | Frontal, à hauteur de poitrine, lumière rasante pour que les étiquettes restent lisibles à l'impression. Aucune marque de commerce lisible | Demi-page |
| 2 | Plan d'implantation du site extérieur : bouteilles de propane debout et attachées, oxygène et acétylène séparés de 6,1 m ou par un mur, génératrice à 6 m du bâtiment, sens de l'échappement fléché | **Schéma coté**, vu de dessus, cotes en mètres, nord et bâtiment repérés. Pas une photo | Demi-page |
| 3 | La collerette d'une bouteille de propane, date de fabrication ou de requalification gravée | Macro, éclairage oblique pour faire ressortir la gravure, format année/mois lisible | Quart de page |
| 4 | Essence séparée en deux phases dans un contenant de verre transparent, ligne de séparation visible | Contre-jour, fond neutre. **À photographier dehors, loin de toute source d'allumage**, en petite quantité | Quart de page |
| 5 | Une page du registre manuscrit : pièce, date d'entrée, date de sortie, plus les quatre lignes d'échéances en tête | Vue de dessus, crayon de plomb posé, écriture réelle et non calligraphiée | Quart de page |
| 6 | Pile au lithium-ion gonflée à côté d'une pile saine du même modèle | Fond neutre, éclairage égal, prises de vue de profil pour que le gonflement se voie | Quart de page |

Aucune image ne doit montrer une bouteille de propane couchée, un bidon non étiqueté ou une
génératrice sous un auvent, même en exemple négatif : à l'impression, une photo se retient mieux
qu'une légende.

---

## 7. Renvois posés dans le chapitre

| Chapitre | Raison |
| --- | --- |
| 60 | Gomme d'épinette et résines comme scellant de remplacement (§9) |
| 65 | Bois de fumage, consommable du fumoir (§5.3) |
| 71 | Sel de salaison, consommable de conservation (§5.2, §5.3) |
| 73 | Couvercles à usage unique et rappel botulisme (§5.2, §5.3) |
| 75 | Semences, consommable daté à tester (§5.2) |
| 77 | Sel et bocaux de fermentation (§5.2, §5.3) |
| 79 | Cuir, rondelles et lanières de remplacement (§5.3, §9) |
| 80 | Cordage et babiche, en stock et en substitution (§5.3, §9) |
| 81 | Fil ciré, aiguilles, rivets (§5.3, §9) |
| 82 | Limes, meules, abrasifs; essai sonore d'une meule fissurée (§2, §5.3, §7) |
| 83 | Pièces d'usure des petits moteurs et de la scie à chaîne (§2, §5.3, §7) |
| 84 | Électrodes, disques, gaz; fabriquer la pièce manquante (§2, §5.3, §9) |
| 86 | Câbles, manilles, poulies — la famille où rien ne s'improvise (§5.3, §7, §9) |
| 87 | Assemblages bois-bois quand la quincaillerie manque (§5.3, §9) |
| 88 | Forge et reprise de pièce (§2, §5.3, §9) |
| 89 | Suif, cire, mèches : lubrifiant et éclairage de remplacement (§5.3, §9) |

Tous les numéros ont été vérifiés contre la liste des 89 chapitres fournie au rédacteur. **Aucun
renvoi vers un chapitre inventé.** Le chapitre 8 (stock permanent du chalet) est le voisin naturel
de celui-ci mais n'est **pas** renvoyé, faute de figurer dans la liste de travail transmise :
l'éditeur voudra probablement ajouter ce renvoi, il est légitime.

---

## 8. Ce que le vérificateur technique devrait attaquer en premier

1. **Le 5 lb de la RBQ.** La directive vise l'usage du propane à l'intérieur d'un bâtiment, dans
   les cas où il est permis. Le chapitre l'a transposée à l'**entreposage** au chalet. La
   transposition est prudente (elle interdit plus qu'elle ne permet), mais c'est une transposition
   du rédacteur, pas une citation. À valider.
2. **La règle « une batterie gelée se met au rebut ».** Aucune source officielle au dossier. Elle
   est publiée comme règle de prudence du livre.
3. **Le mécanisme de la séparation de phase de l'essence oxygénée.** Le mécanisme est une
   affirmation du livre appuyée sur la chimie générale, pas sur une page captée.
4. **La transposition du 51,7 °C et du 50 °C à un cabanon de tôle au soleil.** Les deux valeurs
   viennent de milieux de travail. Le raisonnement « un cabanon fermé en juillet y arrive » n'est
   pas sourcé.
5. **L'extension du protocole hantavirus aux rongeurs morts et aux pièges.** Nommée dans le
   chapitre comme raisonnement du livre. À confirmer.

---

## Levée des [À VÉRIFIER] — 24 septembre 2026

Verdicts de `suivi/verifications/85-verifications.md`, appliqués au chapitre. Plus aucun
`[À VÉRIFIER]` dans le chapitre.

- **Essence (§5.2)** — confirmé et chiffré : dégradation dès 30 jours, jusqu'à 24 mois avec
  stabilisant versé avant le remplissage. `sources/85-briggs-stratton-essence-et-stabilisant.md`
- **Piles alcalines (§5.2)** — corrigé : 5 à 10 ans à 21 °C, moins au chaud ; fuite dans l'appareil
  qui ne coupe pas tout à fait le courant. `sources/85-energizer-duracell-piles-alcalines-duree-et-fuite.md`,
  `sources/85-energizer-e91-fiche-technique.md`
- **Batterie au plomb, gel (§5.2)** — confirmé et chiffré : -57 °C pleine, -20 °C à 50 %, -7 °C à
  plat ; autodécharge 10 à 12 %/mois à 25 °C, recharge aux 3 mois. `sources/85-rolls-batterie-plomb-entreposage-gel.md`
- **Batterie qui a gelé (§5.2 et §7)** — corrigé : « ne se répare pas » remplacé par « jamais
  chargée gelée ; boîtier affaibli qui fend, parfois plus tard ». `sources/85-rolls-manuel-batterie-gelee.md`
- **Électrodes, recuisson (§5.2)** — corrigé : 6010 et 6011 ne se recuisent pas ; 6013, 7014, 7018 se
  resèchent. `sources/85-lincoln-stockage-et-sechage-electrodes.md`
- **Scellant (§5.2 et §7)** — confirmé « hors gel » ; durée ~12 mois (acrylique au latex) ; pose
  au-dessus de 4 °C ; « après un cycle de gel » remplacé par « avec l'âge ou après des gels
  répétés » (passe 5 cycles à l'essai). `sources/85-dap-alex-plus-scellant-acrylique.md`
- **Bouteilles sous pression (§7)** — confirmé et complété : fissure, bombement, bosse, entaille,
  corrosion, feu, robinet ou soupape qui fuit. `sources/85-ecfr-bouteilles-inspection-visuelle.md`,
  `sources/85-cchst-bouteilles-gaz-comprime.md`
- **Antigel, goût sucré (§8)** — confirmé : sans odeur, goût sucré, couleur vive.
  `sources/85-atsdr-ethylene-glycol-gout-sucre.md`
- **Séchage des électrodes (§9)** — corrigé et chiffré : 30 à 45 min à 90-110 °C puis 20 à 30 min
  à 150-180 °C (6013, 7014) ; 7018 : 340 à 400 °C, 1 h ; 6010/6011 : jamais.
  `sources/85-lincoln-stockage-et-sechage-electrodes.md`
- **Écartement de bougie (§9)** — confirmé propre au modèle ; repli 0,76 mm (0,030 po) ; le calibre
  accroche légèrement. `sources/85-briggs-stratton-bougie.md`
- **Précontrainte du lanceur (§9)** — introuvable : dit sans chiffre, par l'essai (poignée plaquée,
  ressort pas à bout). Aucune source.
- **Dessiccant, température (§9)** — introuvable : repère sensoriel seul (« jusqu'à ce qu'il
  crépite »). Aucune source.
- **Gomme d'épinette (§9)** — confirmé : trois ingrédients, aucune proportion publiée, essai de la
  languette, nettoyage à l'eau bouillante, gomme dure mâchée en dépannage.
  `sources/85-adney-chapelle-nps-gomme-d-epinette.md`. Le sens de la correction suit le ch. 20c
  (fend → gras ; colle → gomme ou recuire), décision éditoriale prise ; le sens imprimé par la
  source (inverse) n'est pas repris.

Compression §3 et §4 — 27 septembre 2026 : 941 mots → 227 mots ; matériel coupé : bacs opaques par système, étiquettes-marqueur-ruban (crayon de plomb à -35 °C), laine d'acier-tôle-mousse contre les rongeurs, dessiccant (fabriqué en §9), gants-javel du printemps (protocole en §8), avertisseur de CO (règle et emplacements en §8), site à piquets pour le propane fondu dans la chaîne, armoire à inflammables fusionnée avec l'abri à carburant, fiches de données de sécurité du cartable, paragraphe d'introduction et paragraphe « non négociables ».
