> **Renuméroté le 24 septembre 2026** (six tomes) : ancien chapitre 26. Plus bas, les numéros de chapitre sont **les anciens** (table : plan/renumerotation.json).

# Suivi de rédaction — Chapitre 26, Ce qu'un corps demande l'hiver

- **Fichier :** `chapitres/26-ce-qu-un-corps-demande-l-hiver.md`
- **Tome :** 2 — Le corps
- **Rédigé le :** 2026-09-20
- **Longueur :** environ **5 450 mots utiles** pour les sections 1 à 9, plus environ 890 mots
  d'appareil de sources (section 10). Environ 9 pages en 8 × 10 sans les images.
- **Statut :** RÉD. À envoyer en parallèle au vérificateur technique (rôle 3) et au vérificateur
  sécurité (rôle 4).
- **⚠ RELECTURE HUMAINE EXTERNE OBLIGATOIRE** — marquée en tête du fichier chapitre et détaillée
  à la section 10.

**Note de densité à l'éditeur :** le chapitre dépasse d'environ 10 % la cible haute de 5 000 mots
utiles. Le dépassement est assumé : ce chapitre porte la colonne vertébrale chiffrée de tout le
livre (énergie, macronutriments, eau, micronutriments) **et** six mécanismes de danger que
`CLAUDE.md` exige de répéter ici. La duplication interne a été coupée au deuxième jet. S'il faut
encore couper, les sections 5.5 (eau) et 5.7 (enfants) sont les seules dont le contenu est repris
ailleurs — respectivement aux chapitres 13 et 7. **Ne pas couper dans les sections 5.3, 8 ni 10.**

---

## 1. Chiffres marqués `[À VÉRIFIER]` ou à confirmer

| # | Valeur | Où | Pourquoi ça bloque |
| --- | --- | --- | --- |
| 1 | **Majoration calorique pour le froid lui-même**, par-dessus l'activité physique | 5.2 | **Aucune** des sources officielles consultées n'en donne : ni les ANREF (le mot « froid » est absent des formules du BÉE et des notes), ni la CNESST (*Travailler au froid !* recommande une composition de repas, jamais une quantité), ni le MSSS. Le livre ne peut donc pas écrire « + X % pour le froid ». Première question au relecteur, et question ouverte du tome 2 |
| 2 | **Poids et tailles de référence** : 70 kg / 1,77 m (homme), 57 kg / 1,63 m (femme) | 5.2 | **Rétro-déduits** ici pour montrer que la formule de Santé Canada reproduit bien les valeurs du MSSS. Ce ne sont pas des données publiées. Le texte les marque comme valeurs d'exemple à remplacer, mais le total de 9 500 kcal/jour en dépend |
| 3 | **Teneur de la viande de gibier maigre : 22 g de protéines et 1,5 g de gras par 100 g** | 5.3 | Fichier canadien sur les éléments nutritifs, **non consulté**. Toute l'arithmétique qui suit en dépend : les 1,4 kg de viande maigre au plafond de protéines, les 1 430 kcal qu'elle apporte, les 220 g de gras qui manquent. C'est le chiffre le plus structurant du chapitre après les kcal |
| 4 | Conversion entre kcal de déficit et kg de tissu perdu | 5.2 | Le 9 kcal/g des ANREF vaut pour le gras pur, pas pour le tissu adipeux. La perte réelle est plus grande que les 2,8 à 5,3 kg annoncés, et le chapitre le dit sans donner le facteur |
| 5 | Teneur en glucides de la farine et des pommes de terre | 5.4 | Nécessaire pour convertir les 52 kg de glucides sur 100 jours en kilogrammes de stock au chapitre 8 |
| 6 | Rendement en calcium des arêtes de petit poisson attendries | 5.6 et 9 | Aucune source trouvée. C'est la substitution la plus importante de la variante d'urgence et la seule qui n'a aucun appui |
| 7 | Teneur en sel d'une viande salée finie | 5.6 | Dépend du rendement de salaison du ch. 63. Le chapitre donne la constante de conversion (1 g de sel = 393 mg de sodium) et les plafonds (5,8 g de sel/jour adulte, 4,8 g enfant), mais pas ce que titre une cuisse salée |
| 8 | Teneur en rétinol du foie d'ours noir et de phoque | 8 (encadré DANGER) | L'AMT de 3 000 µg ÉAR (adulte) et de 900 µg (enfant 4-8 ans) est sourcé aux ANREF. Le facteur de dépassement ne l'est pas. L'encadré dit « plusieurs fois » avec la mention `[À VÉRIFIER]`, il ne donne pas de multiple |
| 9 | Format et posologie des gouttes de vitamine D en stock | 4 (matériel) | Le tableau du matériel dit « 2 flacons par hiver » avec la mention. À faire fixer par le relecteur, avec une consigne distincte enfants / adultes |

Tous les autres chiffres du chapitre portent leur source entre parenthèses dans le texte et sont
reproduits verbatim dans `/sources`.

### Avertissement de captation à transmettre au vérificateur technique

Les tableaux des ANREF sont mis en page en colonnes décalées. **Deux extractions automatiques
successives de la même page ont donné des valeurs de vitamine D différentes et fausses** — jusqu'à
3 000 UI/jour présentés comme l'apport recommandé d'un homme adulte, au lieu de 600 UI. Les
valeurs écrites dans le chapitre viennent du texte brut du PDF français extrait avec
`pdftotext -layout`, ligne par ligne, recoupé avec la page HTML anglaise de Santé Canada. **Toute
vérification se refait sur le PDF, jamais sur un résumé.** C'est noté dans les trois fichiers
`sources/26-sante-canada-anref-*.md`.

## 2. Validation demandée : les kcal du chapitre 8

C'était la tâche jointe à ce chapitre. Résultat.

**Ce qui tient.** Les valeurs de base du chapitre 8 — 3 000 kcal pour l'homme, 2 350 pour la
femme, 1 700-1 800 et 1 500-1 650 pour les enfants, 8 550 à 8 800 pour la famille — sont exactes
au niveau d'activité « actif » du MSSS. Vérification faite : ces deux valeurs adultes se
reconstruisent à la décimale près avec la formule du BÉE de Santé Canada et le coefficient
d'activité « actif » (calcul reproduit dans `sources/26-msss-besoins-energetiques.md`). Le
chapitre 8 n'a pas d'erreur de transcription.

**Ce qui ne tient pas.** Le niveau « actif » du MSSS, c'est 30 minutes d'activité modérée par
jour pour un adulte, en plus des activités quotidiennes typiques. Un hiver de bois, de pelle, de
raquette et de trapline est « très actif » au sens du même barème de Santé Canada. En changeant
le seul coefficient prévu par le ministère :

| | Actif | Très actif | Écart |
| --- | --- | --- | --- |
| Homme (CA 1,25 → 1,48) | 2 962 kcal | 3 438 kcal | + 476, soit + 16 % |
| Femme (CA 1,27 → 1,45) | 2 327 kcal | 2 636 kcal | + 309, soit + 13 % |
| Enfants | inchangés | inchangés | — |
| **Famille** | 8 550 à 8 800 | **9 280 à 9 530** | — |

**Recommandation formelle au chapitre 8 : porter le chiffre de planification de 9 000 à
9 500 kcal/jour**, sous réserve de la signature du relecteur nutritionniste.

**Ce que coûte de ne pas le faire :** 280 à 530 kcal/jour de déficit, soit 25 000 à 48 000 kcal
sur 90 jours de travail dur, soit l'équivalent de 2,8 à 5,3 kg de gras pur qui sortiront des
quatre corps plutôt que du garde-manger — et davantage en tissu réel (`[À VÉRIFIER]` n° 4).

**Ce qui reste ouvert :** la majoration pour le froid lui-même, par-dessus l'activité (`[À
VÉRIFIER]` n° 1). Le 9 500 kcal/jour ne la contient pas. Il est donc lui aussi un plancher.

**Action demandée à l'éditeur :** le chapitre 8, section 5.1, porte déjà la mention
`[À VÉRIFIER]` et le renvoi au chapitre 26 sur cette question. La ligne du tableau de suivi du
chapitre 8 (« Majoration calorique pour le froid et le travail d'hiver ») reste ouverte : **elle
est partiellement répondue** — la part « travail d'hiver » est chiffrée, la part « froid » ne
l'est pas.

## 3. Sources enregistrées

| Fichier | Organisme | URL | Consultée |
| --- | --- | --- | --- |
| `sources/26-sante-canada-anref-energie-et-macronutriments.md` | Santé Canada, ANREF, tableaux, rév. nov. 2010 | https://www.canada.ca/content/dam/hc-sc/migration/hc-sc/fn-an/alt_formats/hpfb-dgpsa/pdf/nutrition/dri_tables-fra.pdf | 2026-09-20 |
| `sources/26-sante-canada-anref-vitamines.md` | Santé Canada, ANREF, vitamines | https://www.canada.ca/en/health-canada/services/food-nutrition/healthy-eating/dietary-reference-intakes/tables/reference-values-vitamins.html | 2026-09-20 |
| `sources/26-sante-canada-anref-elements.md` | Santé Canada, ANREF, éléments | https://www.canada.ca/en/health-canada/services/food-nutrition/healthy-eating/dietary-reference-intakes/tables/reference-values-elements.html | 2026-09-20 |
| `sources/26-msss-besoins-energetiques.md` | MSSS, guide d'application de la Politique-cadre, ch. 3 (2008) | https://publications.msss.gouv.qc.ca/msss/fichiers/2008/chapitre3.pdf | 2026-09-20, **captation du ch. 8 reprise, page vive non refetchée** |
| `sources/26-cnesst-alimentation-et-boissons-au-froid.md` | CSST / CNESST, *Travailler au froid !*, 3e éd. 2011 | https://www.foretprivee.ca/wp-content/uploads/2014/01/Travailler-au-froid-CSST.pdf | 2026-09-20 |
| `sources/26-quebec-gibier-sauvage-chasseurs.md` | Gouvernement du Québec (MAPAQ), avis aux chasseurs | https://www.quebec.ca/sante/alimentation/salubrite-aliments-prevention-risques/salubrite-aliments-domicile/preparation-aliments-cuisson-securitaires/precautions-manipule-aliments/viande-gibier-sauvage-chasseurs | 2026-09-20 |
| `sources/26-acia-trichinose.md` | ACIA, fiche de renseignements sur la trichinose | https://inspection.canada.ca/sante-des-animaux/animaux-terrestres/maladies/declaration-obligatoire/trichinose/fiche-de-renseignements/fra/1330023015817/1330023110684 | 2026-09-20, **captation du ch. 5 reprise, page vive non refetchée** |
| `sources/26-sante-canada-poisson-fume-botulisme.md` | Santé Canada, lignes directrices sur le poisson fumé prêt-à-manger | https://www.canada.ca/en/health-canada/services/food-nutrition/legislation-guidelines/guidance-documents/smoked-fish.html | 2026-09-20, **captation du ch. 7 reprise, page vive non refetchée** |

Chaque fichier contient l'URL, la date de consultation et l'extrait intégral qui porte le chiffre.

**Trois captations à refaire à la source** avant impression : MSSS, ACIA, Santé Canada poisson
fumé. Elles reprennent des fichiers déjà enregistrés pour d'autres chapitres, ce qui est indiqué
en tête de chaque fichier. Le contenu n'est pas en doute ; c'est la traçabilité qui doit être
propre.

**Une source non consultée qui manque au chapitre :** le **Fichier canadien sur les éléments
nutritifs** de Santé Canada. Il porte le chiffre n° 3 de la liste `[À VÉRIFIER]` — la composition
de la viande de gibier — dont dépend toute l'arithmétique de la section 5.3. À faire par le
vérificateur technique.

**Deux pages officielles cherchées et non trouvées :** le guide de consommation du poisson de
pêche sportive du Québec (mercure) et la page de Santé Canada sur le sodium (valeurs de référence
pour la réduction du risque chronique). Les URL connues ont retourné 404 le 2026-09-20. Ni l'un
ni l'autre ne bloque ce chapitre — le mercure appartient aux chapitres 53, 55 et 70, le sodium à
jour au chapitre 62 — mais les deux devront être retrouvés pour ces chapitres-là.

## 4. Images requises

| # | Description | Cadrage voulu | Format |
| --- | --- | --- | --- |
| 1 | **La journée de 9 500 kcal, en aliments réels, à plat.** Ce que quatre personnes mangent en une journée d'hiver : la viande, le gras rendu, la farine, l'avoine, les patates, les fruits séchés, le lait en poudre, les bouteilles d'eau. Tout étalé en même temps, séparé en quatre portions inégales — celle de l'homme, celle de la femme, celle du 6 ans, celle du 4 ans | Photo à plat, vue de dessus, fond de bois, lumière égale. Les quatre portions alignées de la plus grosse à la plus petite, avec un carton de kcal posé devant chacune. **L'image doit faire voir que c'est beaucoup** : c'est tout l'argument du chapitre | **Pleine page** |
| 2 | **Le plafond et le plancher des protéines.** Une colonne par personne (homme, femme, 6 ans, 4 ans), hauteur proportionnelle aux kcal du jour. Dans chaque colonne : une bande basse = plancher de protéines (56, 46, 19, 19 g), une ligne haute = plafond (300, 230, 135, 124 g), et la zone entre les deux hachurée. Une flèche marque où tombe « 1,4 kg de viande maigre » sur la colonne de l'homme | Diagramme au trait, deux valeurs de gris seulement, pas de couleur. Étiquettes en bout de ligne de rappel. Le mot **mal de caribou** écrit au-dessus de la ligne du plafond, avec le renvoi au ch. 24 | **Demi-page** |
| 3 | **L'assiette d'orignal maigre, et ce qui lui manque.** Deux assiettes côte à côte. À gauche : 1,4 kg de viande maigre seule, avec l'étiquette « plafond de protéines atteint — 1 430 kcal ». À droite : la même viande réduite de moitié, plus un bloc de graisse rendue, plus une galette et des patates, avec l'étiquette « 3 440 kcal » | Photo, deux assiettes identiques, même hauteur d'œil, même éclairage. L'assiette de gauche doit paraître pleine et l'assiette de droite doit paraître raisonnable : c'est le contre-intuitif du chapitre | **Demi-page** |
| 4 | **Les deux sels.** Le sac de gros sel de salaison et la boîte de sel iodé de table, côte à côte, avec leurs étiquettes lisibles | Photo, cadrage serré, fond neutre. La mention « iodé » de la boîte doit être lisible à l'échelle de la page | **Quart de page** |
| 5 | **Le carnet de poids.** Une page de carnet ouverte, quatre colonnes, une ligne par dimanche, écrite à la main, avec le pèse-personne mécanique en arrière-plan flou | Photo, lumière de fenêtre de chalet. Les chiffres doivent être plausibles et stables, pas dramatiques | **Quart de page** |

Aucune image du chapitre ne demande de licence externe : les cinq se photographient ou se
dessinent au chalet. Rien à inscrire dans `images/credits.md` tant qu'on ne va pas chercher de
planche extérieure.

## 5. Renvois vers d'autres chapitres

| Chapitre | Raison du renvoi |
| --- | --- |
| 2 — Rester ou partir | La date à laquelle le plancher de glucides ne se comble plus décide du départ |
| 3 — Le froid lui-même | Le frisson brûle du glycogène ; on ne nourrit pas une hypothermie modérée |
| 7 — Des enfants de 4 et 6 ans | Rythme de rentrée qui justifie de garder les enfants au niveau « actif » |
| 8 — Le stock permanent du chalet | **Renvoi principal.** Le 9 500 kcal/jour, le lait en poudre, les glucides. Voir la section 2 de cette fiche |
| 9 et 11 — Liste de 72 heures, listes par scénario | Mêmes chiffres, horizon plus court |
| 13 et 15 — Eau, poêles à bois | Faire fondre les 9,8 L/jour coûte du bois |
| 19 — Communiquer et savoir | Évacuation en cas de botulisme |
| **24 — Le mal de caribou** | **Renvoi de sécurité obligatoire.** Le ch. 26 donne le plafond en grammes, le ch. 24 donne la maladie et le traitement. Les deux doivent être cohérents |
| **25 — Le scorbut et l'arbre de vie** | Vitamine C, et la règle du thuya contre le sapin baumier |
| 27, 29, 31 — Soigner, pharmacie, ce qu'on ne peut pas soigner | Suites des carences et des intoxications de la section 8 |
| 28 — Hygiène et eaux usées | Constipation par absence de fibres |
| 30 — Plantes médicinales boréales | Thuyone du cèdre, deuxième porteur de la règle |
| 32 et 33 — Moral, enfants et routine | Le refus de manger n'est pas un problème de calories |
| 34 — Calendrier annuel de prélèvement | La priorité au gras change l'ordre du calendrier |
| **41 — Abats et organes** | **Renvoi de sécurité obligatoire.** Foie et reins de cervidés, cadmium. Le ch. 26 recommande les abats pour le fer et doit porter l'exclusion sur place |
| 46, 48, 52, 53, 55 — Castor, ours, phoque, truite, éperlan | Sources de gras et de vitamine D |
| 57 — Petits fruits | Vitamine C et glucides |
| 62, 63, 64 — Sel, salaison à sec, saumure | Charge de sodium, dessalage, rendement de salaison |
| 65, 70, 71, 72 — Fumage à froid et poisson | Botulisme de type E |
| 67 — Pemmican et graisses | La graisse rendue, seule réponse simultanée aux calories et au plafond de protéines |
| 73 — Conserves et marinades | Arêtes attendries pour le calcium |
| 74 et 76 — Jardin nordique, caveau à légumes | Glucides et fibres de fin d'hiver |

Les 37 renvois ont été vérifiés un à un contre la liste des 89 chapitres. **Aucun renvoi à un
chapitre inexistant.**

## 6. Rappels de sécurité de `CLAUDE.md` repris dans ce chapitre

Le tableau de `CLAUDE.md` compte neuf règles. Sept s'appliquent à ce chapitre et sont **toutes**
reprises dans l'encadré DANGER (section 8) ou dans le tableau des signes d'échec (section 7),
même quand elles sont déjà ailleurs dans le livre.

| Règle de `CLAUDE.md` | Où elle est reprise au ch. 26 |
| --- | --- |
| Cuisson du gibier sauvage à **74 °C** à cœur (MAPAQ) | Section 8, encadré DANGER ; section 6, points de contrôle ; section 9 |
| **Jamais le foie ni les reins de cervidés** — cadmium | Section 8, encadré DANGER, avec le mécanisme d'accumulation rénale ; section 5.6, à l'endroit où le fer est recommandé |
| Trichinellose : ni le sel, ni le fumage, ni le gel domestique ne la détruisent | Section 8, encadré DANGER, citation ACIA intégrale |
| **Thuyone du cèdre toxique** — sapin baumier ou épinette pour la vitamine C | Section 8, encadré DANGER ; section 7 ; section 9 |
| Botulisme de type E : produit sa toxine dès **3 °C**, donc au frigo | Section 8, encadré DANGER, avec les 3 à 10 °C d'un vestibule de chalet en redoux |
| Le botulisme ne change ni l'odeur, ni le goût, ni l'apparence | Section 8, en toutes lettres |
| Viande maigre seule = mal de caribou, mortel en 2 à 3 semaines | Section 8, premier élément de l'encadré, avec le mécanisme hépato-rénal et le plafond de 35 % ; sections 3, 5.3, 5.7, 7 |

Deux règles du tableau ne s'appliquent pas à ce chapitre et n'y sont pas reprises : la tularémie
du lièvre (manipulation, pas nutrition — ch. 44) et la génératrice (ch. 8, 20).

**Un élément de l'encadré DANGER ne vient pas du tableau de `CLAUDE.md` :** l'hypervitaminose A
du foie d'ours et de phoque. Elle y entre parce que le chapitre recommande les abats et le gras
d'ours et de phoque, et que l'AMT en vitamine A préformée d'un enfant de 4 à 8 ans (900 µg ÉAR)
est plus de trois fois plus bas que celui d'un adulte. **À faire ajouter au tableau de
`CLAUDE.md` par l'éditeur**, avec la mention « Ours, phoque, abats, enfants ».

## 7. Relecteur humain requis

**Diététiste-nutritionniste membre de l'Ordre professionnel des diététistes-nutritionnistes du
Québec (OPDQ)**, de préférence avec une pratique documentée en nutrition des populations
nordiques, isolées ou en insécurité alimentaire.

Sept points doivent porter sa signature, listés à la section 10 du chapitre :

1. le chiffre de planification de **9 500 kcal/jour** et la révision du chapitre 8 ;
2. la **majoration pour le froid lui-même**, s'il en existe une et une source pour la porter ;
3. le **plafond de protéines en grammes** (300, 230, 135, 124 g) et son usage comme limite de
   sécurité, en cohérence avec le chapitre 24 ;
4. la **décision de retenir le plafond de protéines de l'ÉVAM sans retenir ses bornes de glucides
   et de lipides**, qu'un menu de gibier ne peut pas atteindre ;
5. toute la **section 5.7**, les enfants de 4 et 6 ans ;
6. la **posologie de vitamine D** en stock, adultes et enfants, et ce qu'on fait quand le flacon
   est fini en février ;
7. le **tableau des signes d'échec** de la section 7, dont plusieurs lignes sont des tableaux
   cliniques et non des observations de cuisine.

Ce chapitre figure nommément dans la liste des relectures humaines obligatoires de `CLAUDE.md`.
Il ne part pas à l'impression sans cette signature.

## 8. Note du rédacteur au vérificateur technique

Deux choses à regarder en priorité, parce qu'elles sont le genre d'erreur que la leçon du pilote
décrit.

**La vitamine D.** Deux extractions automatiques successives de la page de Santé Canada ont
produit deux jeux de valeurs différents, tous deux faux, et tous deux plausibles. Si le chapitre
avait été écrit à partir de l'une ou de l'autre, il aurait donné 3 000 UI/jour comme apport
recommandé à un adulte — cinq fois la vraie valeur, et au-dessus de l'AMT d'un enfant de 4 ans.
C'est un 71 °C contre 74 °C de la même famille, en pire. Vérifier sur le PDF.

**Le 74 °C contre le 71 °C.** L'ACIA écrit 71 °C, le gouvernement du Québec écrit 74 °C pour le
gibier. Le chapitre écrit 74 °C et les deux fichiers de sources expliquent pourquoi : c'est la
plus haute des deux, elle satisfait les deux documents, et c'est celle de la page qui s'adresse
aux chasseurs québécois. Si le vérificateur tranche autrement, il faut le trancher pour tout le
livre d'un coup, pas chapitre par chapitre.

## Notes retirées du chapitre — 23 septembre 2026

> ## ⚠ RELECTURE HUMAINE EXTERNE OBLIGATOIRE
>
> **Ce chapitre ne part pas à l'impression sans la signature d'une diététiste-nutritionniste
> membre de l'Ordre professionnel des diététistes-nutritionnistes du Québec**, de préférence avec
> une pratique documentée en nutrition des populations nordiques, isolées ou en insécurité
> alimentaire. Motif : le chapitre fixe des quantités de nourriture pour deux adultes et deux
> enfants de 4 et 6 ans sur un hiver entier, il calcule un plafond de protéines au-delà duquel
> une personne meurt, et il donne des chiffres qui commandent le stock du chapitre 8. Une erreur
> ici ne se voit pas en une semaine ; elle se voit en mars. Doivent porter sa signature : le
> chiffre de planification de 9 500 kcal/jour et la révision qu'il commande au chapitre 8, la
> majoration calorique pour le froid lui-même s'il en existe une et une source pour la porter, le
> plafond de protéines en grammes et son usage comme limite de sécurité, la décision de retenir ce
> plafond sans retenir les bornes de glucides et de lipides de la même ÉVAM, toute la section 5.7
> sur les enfants, la posologie de vitamine D adultes et enfants, et le tableau des signes d'échec
> de la section 7. Doivent aussi porter sa signature, dans la section 9 : la quantité d'algues
> brunes servie à un enfant de 4 ans, dont l'apport maximal tolérable en iode est presque quatre
> fois plus bas que celui d'un adulte, et la manière de rendre l'huile de foie de poisson à chaud
> plutôt qu'à froid.

Section 5.2 :

> **Recommandation au chapitre 8 : porter le chiffre de planification de 9 000 à
> 9 500 kcal/jour**, sous réserve de la signature du relecteur.

> Et il reste une inconnue franche : **aucune source officielle canadienne ou québécoise consultée
> ne donne de majoration calorique pour le froid lui-même**, par-dessus l'activité. Ni les ANREF,
> ni la CNESST, ni le MSSS. Le coût du frisson, celui du poids des vêtements, celui de respirer de
> l'air à -35 °C ne sont chiffrés nulle part dans ces documents. `[À VÉRIFIER]` — c'est la première
> question à poser au relecteur.

Section 5.3 :

> Deux réserves, qui appartiennent au relecteur.

> [...] et laisse au relecteur le sort des deux autres bornes.

Section 9 :

> Le seuil chiffré du tour de bras appartient au relecteur

Provenances retirées du texte (le fait reste imprimé, la source vit ici) :

- Taux de conversion 4 / 4 / 9 kcal/g ; formules du BÉE et absence de majoration climatique ; ÉVAM et « il faut parfois ajuster ces valeurs » ; note « toutes ces valeurs tiennent compte d'une exposition insuffisante au soleil » ; poids corporel comme meilleur indicateur ; eau totale : Santé Canada (ANREF).
- Besoins énergétiques niveau « actif » et définition de « actif » (30 min) : guide d'application de la Politique-cadre du MSSS, appuyé sur les ANREF. Coefficients d'activité physique : ANREF.
- Alimentation riche en gras et en hydrates de carbone, boissons chaudes et sucrées, soupes chaudes, déficience alimentaire comme facteur de risque : CNESST.
- 74 °C, jeter l'aliment altéré, cadmium du foie et des reins de cervidés (cent fois la quantité tolérée par l'Organisation mondiale de la santé) : gouvernement du Québec, avis aux chasseurs.

## Passe légal et signes — 23 septembre 2026

### Légal

Rien trouvé : aucune phrase sur une loi, un règlement, un code, un permis ou une municipalité.
« Abats permis » (tableau 5.6) veut dire « permis à table », pas un permis.

### Notes de bas de page ajoutées

- [^1] « hypothermie modérée » (section 2) : confusion, manque de coordination ; apathie,
  irritabilité, mauvaises décisions ; le frisson cesse à mesure que ça s'aggrave. Sources déjà
  enregistrées pour le chapitre 3 : `sources/03-quebec-hypothermie.md` (Québec.ca, degrés et
  signes : « Confusion », « Manque de coordination ») et `sources/03-wms-hypothermie.md`
  (Wilderness Medical Society 2019 : « Shivering ceases at and below a core temperature of
  approximately 30 °C », irritabilité, confusion, apathie, mauvaises décisions). La page de
  Québec place l'arrêt des frissons au stade grave, la WMS vers 30 °C, dans la zone modérée :
  la note dit seulement que le frisson cesse à mesure que ça s'aggrave, ce que les deux
  soutiennent.
- [^2] « pâleur des paupières » (section 7) : tirer la paupière du bas, bord normalement rouge
  vif contre la partie profonde couleur chair ; tout pâle d'un bout à l'autre = signe le plus
  parlant d'anémie ; une paupière rouge n'exclut rien. Source :
  `sources/26-mcgee-paleur-conjonctivale-anemie.md` (McGee, *Evidence-Based Physical
  Diagnosis*, 4e éd., 2018, ch. 10). **Pas une source officielle** : les pages du Manuel MSD sur
  l'anémie ferriprive et l'évaluation de l'anémie nomment la pâleur sans dire où regarder.
  À remplacer si le relecteur connaît une page officielle.
- [^3] « pression intracrânienne » (section 8) : somnolence, irritabilité, mal de tête, nausées,
  vomissements dans les heures qui suivent, parfois une peau qui pèle ; plus fort chez l'enfant.
  Source : `sources/26-msd-exces-vitamine-a.md` (Manuels MSD grand public, août 2024). Pas une
  source gouvernementale.
- [^4] aspect de la moelle (section 9) : saine = ferme, blanche, cireuse ; bête affamée = rouge
  ou jaune, gélatineuse, presque liquide, sans gras. Source :
  `sources/26-adfg-moelle-osseuse-famine.md` (Alaska Department of Fish and Game).
  **Ce même fait est `[À VÉRIFIER]` aux chapitres 24 et 42** (suivi/42-redaction.md, trou n° 4) :
  la page trouvée ici en ferme l'aspect, pas le rendement. Signalé, non reporté dans ces
  chapitres (hors de cette passe).

### Correction repérée, non faite

L'incohérence déjà notée dans `doutes-passe-paperasse.md` (« actif » = 60 min en section 3,
30 min en section 5.1) reste ouverte : ce n'est ni du légal ni un signe.

## Levée des [À VÉRIFIER] — 24 septembre 2026

Verdicts de `suivi/verifications/26-verifications.md`, appliqués au chapitre. Une ligne par
chiffre changé ou confirmé.

- **Vitamine D, posologie (§4 Matériel, §5.6)** — CORRIGÉ : 1 000 UI par goutte → **400 UI (10 µg)
  par jour, de 2 à 50 ans**, une goutte par personne, enfants compris. Marge : 3 000 ÷ 400 = 7,5
  gouttes pour le plafond d'un enfant de 4 ans (division du livre). Source :
  `sources/26-sante-canada-vitamine-d-supplement-400-ui.md` ; plafonds :
  `sources/26-sante-canada-anref-vitamines.md`.
- **Déficit en kg perdus (§5.2)** — LEVÉ : tissu adipeux à **87 %** de gras, **≈ 7 700 kcal par
  kilo** (32,2 MJ/kg) ; masse maigre 7,6 MJ/kg (« cinq fois moins »). 25 000 à 48 000 kcal ÷
  7 700 = **3,2 à 6,2 kg** (division du livre). Source : `sources/26-hall-2008-deficit-energetique-par-kg.md`.
- **Majoration pour le froid (§5.2)** — INTROUVABLE : phrase refaite sans majoration chiffrée ;
  seul chiffre gardé, **5 000 à 7 000 kcal/jour** chez des soldats en opération d'hiver (un total).
  « Respirer de l'air à -35 °C » coupé. Source : `sources/08-margolis-pasiakos-2023-energie-au-froid.md`.
- **Orignal cru (§5.3)** — CORRIGÉ : protéines **22,0 g** (confirmé), gras **1,5 → 3,0 g**,
  **124 kcal** aux 100 g. Suites recalculées (divisions du livre) : 1,4 kg → **≈ 1 700 kcal**
  (au lieu de 1 430) ; manque **≈ 1 750 kcal** (au lieu de 2 000) ; **≈ 195 g de gras** (au lieu
  de 220) ; la viande couvre **la moitié** du jour (au lieu de 40 %). Répercuté au §9, « La règle
  de pouce » : 220 → **195 g**, et la règle de pouce **150 → 140 g de gras par kg de viande
  maigre** (195 ÷ 1,4 = 139). Source : `sources/26-sante-canada-fcen-orignal-farine-pomme-de-terre-aretes.md`
  (+ `sources/26-sante-canada-fcen-donnees-2026-09-24.json`).
- **Farine et pomme de terre (§5.4)** — LEVÉ : farine tout usage **≈ 72 g** de glucides aux
  100 g, pomme de terre crue **17,5 g**. 130 g/jour → ≈ 180 g de farine ou 740 g de pommes de
  terre ; 52 kg → ≈ 72 kg de farine ou 300 kg de pommes de terre (divisions du livre). Source :
  même fiche FCÉN.
- **Calcium des arêtes en conserve (§5.6)** — LEVÉ : saumon rose en conserve avec arêtes
  **213 mg**/100 g, sans os **60 mg** ; sardine avec arêtes **382 mg**. 1 000 ÷ 213 ≈ 470 g
  (« près d'un demi-kilo », division du livre). Source : même fiche FCÉN.
- **Sel de la viande salée (§5.6)** — INTROUVABLE pour la teneur finie ; chiffre gardé : **6 kg de
  sel pour 100 kg** de viande à la salaison à sec du ch. 63 (6 g contre 5,8 g de plafond adulte,
  comparaison du livre). Source : `sources/63-acia-trichinella-salaison-sechage-fumage.md`.
- **Rétinol du foie (§8 DANGER)** — LEVÉ pour le phoque annelé : **3 710 µg**/100 g (FCÉN ;
  USDA 4 880 µg ÉAR) ; 1,2 fois le plafond adulte, 4,1 fois celui de l'enfant de 4 à 8 ans.
  INTROUVABLE pour l'ours noir (dit tel quel). Sources : fiche FCÉN ci-dessus ;
  `sources/41-usda-fdc-composition-abats.md`.
- **Graisse d'os (§9)** — INTROUVABLE pour le rendement : drapeau retiré, la phrase disait déjà
  « qu'on ne connaît pas d'avance ». Ajout sourcé : le tissu spongieux des os est très probablement
  un gras qu'une bête amaigrie ne perd pas. Source : `sources/26-kindler-2025-graisse-d-os.md`.
- **Rhizome de quenouille (§9)** — LEVÉ (ordre de grandeur) : rhizome entier séché et moulu =
  **11 % du poids frais** (donnée sur *Typha angustifolia* ; le chapitre nomme *T. latifolia*).
  Source : `sources/26-fruet-2012-farine-rhizome-quenouille.md`.
- **Sève (§9)** — LEVÉ : érable à sucre **≈ 43 L** de sève pour 1 L de sirop ; bouleau **110 L ou
  plus**. Sources : `sources/60-osu-erables-teneur-sucre-seve.md`, `sources/60-uaf-entaillage-bouleau.md`.
- **Toxine botulique et chaleur (§9, huile de foie)** — LEVÉ : toxine détruite à **plus de 85 °C
  pendant au moins 5 minutes** ; spores résistantes. La procédure qui précède (« chaleur douce »)
  finit maintenant par cinq minutes au petit bouillon, pour que la phrase tienne (note C de la
  vérification). Source : `sources/26-oms-botulisme-toxine-detruite-85-c.md`.
- **Iode des algues (§9)** — LEVÉ : laminaire sucrée séchée **36 à 6 396 µg/g, moyenne 3 407** ;
  ascophylle 148 à 1 770, moyenne 682 (« cinq fois moins ») ; ébullition **≈ 58 %** d'iode perdu
  (écrit « un peu plus de la moitié »). Plafonds 300 µg (4-8 ans) et 1 100 µg (adulte) :
  0,09 g et 0,32 g de laminaire moyenne (divisions du livre). Aucune teneur mesurée au
  Saint-Laurent. Sources : `sources/58-anses-iode-algues.md`, `sources/58-sante-canada-anref-iode.md`.
- **Calcium du bouillon d'os (§9)** — LEVÉ : **≈ 15 à 40 mg** par portion de 500 g (moins de 5 %
  de l'apport de référence) ; le vinaigre en extrait **10 à 20 fois plus**. Source :
  `sources/26-hsu-2017-calcium-bouillon-d-os.md`.
- **Arête mijotée à l'acide (§9)** — INTROUVABLE : dit sans chiffre, renvoi à la conserve (§5.6).
- **Tour de bras (§9)** — LEVÉ pour les enfants : 6 à 59 mois **< 125 mm** aiguë, **< 115 mm**
  grave ; 5 à 9 ans **< 145 mm** et **< 140 mm**. INTROUVABLE pour l'adulte (dit tel quel).
  Source : `sources/26-tour-de-bras-seuils-muac.md`.
- **Temps d'ébullition selon l'épaisseur (§9)** — INTROUVABLE : remplacé par une méthode (mesurer
  une fois au thermomètre, jusqu'à 74 °C à cœur). Aucune source.
- **Mal de caribou, délai (§3 et §8)** — décision éditoriale : « deux à trois semaines » →
  **« quelques semaines »**, faute de source (vérification du ch. 12, ligne 6).
- Compression §3 et §4 — 27 septembre 2026 : 1 093 mots → 214 mots, titres compris (§3 : 650 → 125 ; §4 : 443 → 89) ; matériel coupé : balance de cuisine, ruban à mesurer, chiffres recopiés au mur, paragraphe d'introduction (pèse-personne), paragraphe provisions (multivitamine, lait en poudre → ch. 00b), paragraphe « Le sel iodé mérite sa ligne » (condensé dans la ligne Sel iodé ; §5.6 le redit).
