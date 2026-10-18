# Vérification technique — Chapitre 10 : Eau, puiser, filtrer, désinfecter

- **Rôle :** 3, vérificateur technique (n'a pas rédigé le chapitre, ne le réécrit pas)
- **Date :** 18 octobre 2026
- **Texte vérifié :** `chapitres/10-eau-puiser-filtrer-desinfecter.md` tel qu'il est le 18 octobre 2026 (refonte à sept
  sections), contre `suivi/10-redaction.md` (section « Refonte au gabarit à sept sections ») et les fichiers de `sources/`.
- **Ancienne section Danger comparée :** `git show 49ad504:chapitres/10-eau-puiser-filtrer-desinfecter.md` (identique à
  `8f823ec`), section « 8. Danger ».
- **Planches regardées :** `images/a-valider/planche-10-01`, `-02`, `-03`, `-07`, `-08` (légendes des repères).
- **Logigramme :** `images/logigrammes/10-eau.json`.
- **Source nouvelle enregistrée :** `sources/10-epa-hypochlorite-calcium-et-redosage.md` (+ page entière
  `sources/10-epa-desinfection-urgence-2026-10-18.html`).
- Pages de Santé Canada (canada.ca) injoignables depuis le conteneur ce jour-là (délai dépassé) : rien n'a pu y être
  relu ; les fiches déjà enregistrées font foi.

**Bilan :** 18 écarts, 20 NON RETROUVÉ, 3 renvois faux (plus 2 remarques sur les planches), 5 noms latins manquants,
3 points sur les pictogrammes, 4 écarts dans le logigramme. Tout le reste, chiffre par chiffre, est retrouvé dans sa
source (liste à la fin).

---

## 1. Écarts entre le chapitre et la source

| # | Endroit | Ce que dit le chapitre | Ce que dit la source | Fichier source |
| --- | --- | --- | --- | --- |
| 1 | **Étape 26** ; Points de contrôle, ligne « Avant l'hiver » ; section 7, « Puiser un puits… » (« les 48 L d'une journée », « une vingtaine de voyages ») ; section 7, « Ce qu'on perd » (« les 48 L de la cible ») | 6 L pour boire + 6 L pour cuisiner et se laver **par personne et par jour**, soit 12 L ; 48 L par jour pour quatre, 144 L pour 72 h, 1 440 L pour un mois, 72 bidons | 6 L pour boire + 6 L pour les aliments et l'hygiène, par personne, **pour au moins 72 heures** (soit 4 L par jour). Le ch. 6 (l. 85 à 91) le lit juste : 48 L pour quatre **sur 72 heures**. **Erreur d'un facteur 3**, qui se propage au volume quotidien, au mois, aux bidons, aux voyages de buse et au bois | `09-quebec-eau-potable-urgence.md` ; `10-quebec-contamination-penurie-eau-potable.md` (« réserve d'au moins 3 jours ») ; `13-canada-trousse-urgence.md` (4 L/pers./jour) |
| 2 | Étape 11 ; étape 14, « Les cinq minutes » | « À 1 µm, il arrête … la plupart des bactéries » ; « un trou de 1 µm arrête la plupart des bactéries, pas toutes » | *E. coli* mesure 0,5 × 3 à 8 µm ; pores recommandés pour la retenir : **0,2 à 0,4 µm**. Un filtre à 1 µm est coté pour les protozoaires (*Cryptosporidium* : 1 µm), pas pour les bactéries | `13-inspq-sante-voyage-eau.md` (tableau des tailles) |
| 3 | Section 7, « Ce qui ne se remplace pas » | « Un filtre de terrain contre les virus : il n'en existe pas » | Virus (0,03 µm) « non retenu par les **filtres portatifs courants** ». La source ne dit pas qu'il n'en existe aucun | `13-inspq-sante-voyage-eau.md` |
| 4 | Étape 22 ; Points de contrôle, ligne « Chloration, au bout des 30 min » | Sans odeur : redoser une fois et attendre **encore 30 minutes** | « repeat the dosage and let stand for another **15 minutes** ». Le livre est plus prudent ; écart à trancher, pas un danger | `10-epa-hypochlorite-calcium-et-redosage.md` (nouvelle) ; `13-epa-desinfection-urgence-javel.md` |
| 5 | Étape 23 (iode) | « une femme enceinte n'en boit pas plus de **quelques jours** » | « should not use iodine … **for prolonged periods** » : aucune durée chiffrée pour la grossesse ; « quelques semaines » vaut pour tout le monde (OMS) | `13-cdc-yellow-book-desinfection-eau.md` |
| 6 | Étape 18, 2e puce | « Écrire la **date d'achat** sur le contenant … le temps passé en magasin compte » | La durée d'un an se compte **depuis la fabrication**, lue dans le code imprimé (2 chiffres de l'année, puis le jour de l'année). La phrase se contredit elle-même : c'est la date de fabrication qu'on écrit | `13-fabricant-javel-duree-de-conservation.md` |
| 7 | Étape 12 ; Points de contrôle, ligne « Avant le filtre à 1 µm » | Le filtre « donne son plein rendement, en moyenne 999 kystes retenus sur 1 000 », sous 0,3 UNT | Le 3 log à 0,3 UNT vient de la **filtration en usine** (filtration conventionnelle) ; la fiche ne le dit pas d'un filtre à cartouche de 1 µm. Portée transposée | `13-inspq-giardia-lamblia.md` ; `13-inspq-turbidite.md` |
| 8 | Section 7, « Le filtre à sable », puce « Le sable » ; planche 10-07, repère 7 (« recommencer jusqu'à l'eau claire ») | Laver le sable « jusqu'à ce que l'eau de rinçage sorte claire » | « **Do NOT wash the sand until the water in your container is clean.** This residual water should still be somewhat dirty » ; « Unlike the gravel, the water … should not run clear » (p. 23). Trop lavé, le sable fait couler l'eau trop vite et filtre mal (p. 51 : « the sand has been washed too much and needs to be replaced »). Seul le gravier se lave jusqu'à l'eau claire | `13-cawst-2009-biosand-filter-manual.pdf` (copie de `13-cawst-couche-biologique-filtre-a-sable.md`) |
| 9 | Section 7, « Le filtre à sable », puce « Quand le débit tombe » ; planche 10-07, repères 11 et 12 | « Gratter à plat les 2 ou 3 cm du dessus … sans le brasser » | Le manuel fait le « swirl & dump » : toucher à peine le dessus du sable de la paume, en rond, « be careful to not mix the top of the sand deeper », puis puiser l'eau sale (p. 56). La couche vivante est dans **le 1 à 2 cm du dessus** (p. 3) : gratter 2 à 3 cm l'enlève au complet. Le grattage est la méthode du filtre lent en usine, absente de la source | `13-cawst-2009-biosand-filter-manual.pdf` |
| 10 | Section 7, « Faire du chlore … », 2e puce | « le titre du produit et son vieillissement changent … **aucune recette ne tient** » | Recette publiée : 1 cuillère à thé comble (environ 7 g) de granules dans 2 gallons américains (7,6 L) → solution mère d'environ **500 mg/L** ; **1 volume pour 100** volumes d'eau à traiter. Le contrôle à la bandelette reste juste ; « aucune recette » ne l'est pas | `10-epa-hypochlorite-calcium-et-redosage.md` (nouvelle) |
| 11 | Section 7, électrolyse, dernière puce | « elle perd son chlore **en moins d'une journée** » | « should be **used within 24 hours** as the concentration of active chlorine will decline » : à utiliser dans la journée ; la source ne dit pas qu'elle est vide avant | `13-sswm-wata-electrolyse-saumure.md` |
| 12 | Section 7, « Ce qui ne se remplace pas » | Arsenic, uranium, nitrate, manganèse, plomb : « **aucun des cinq n'a de goût** » | Le manganèse a un objectif **esthétique** de 0,02 mg/L (couleur, taches) ; au-dessus, il colore l'eau et tache la lessive. Le chapitre s'en sert lui-même comme signe (section 6, deux lignes) | `13-sante-canada-tableau-sommaire-eau-potable.md` ; `13-quebec-manganese.md` |
| 13 | Points de contrôle, ligne « Manganèse » | Cible : 0,12 mg/L, **0,06 mg/L pour un nourrisson** ; action : « Au-dessus de **0,12** mg/L, aucune eau du puits pour un nourrisson » | Valeur guide pour le nourrisson nourri au biberon : **0,06 mg/L** (INSPQ) ; le ministère dit d'éviter l'eau pour les nourrissons au-dessus de 0,12. Les deux chiffres existent, mais la ligne donne 0,06 comme cible et 0,12 comme seuil d'action : à aligner | `13-quebec-manganese.md` |
| 14 | Section 3, Matériel (« Bandelettes de chlore libre, **0 à 200 mg/L** ») ; étape 28 et Points de contrôle (« **250 mg/L** dans un puits neuf … mesurer de nouveau ») | La bandelette est la seule à doser le choc du puits | La cible du puits neuf, 250 mg/L, est **au-dessus de l'échelle** de la bandelette demandée : elle ne peut pas confirmer la dose | `13-sante-canada-traitement-eau-puits.md` ; `10-melcc-desinfection-puits-procedure.md` |
| 15 | Étape 30, dernière puce | « **Arrondir le volume vers le bas** : une eau trop chlorée demande une purge plus longue » | 50 mg/L est la concentration recommandée « pour assurer une désinfection efficace », « en vérifiant bien la concentration ». Arrondir le volume vers le bas donne moins de javel, donc **moins que la cible** : le sens de l'arrondi va contre la source | `10-melcc-desinfection-puits-procedure.md` ; `13-melcc-qualite-eau-de-mon-puits.md` |
| 16 | Étape 20 ; Matériel (« tout embout convient une fois ses gouttes comptées au millilitre ») | « environ 2 gouttes (0,2 mL) … par litre, soit 20 gouttes ou 2 mL pour 10 L » | Santé Canada écrit bien « 2 gouttes (0,2 millilitre) », soit 0,1 mL la goutte. L'EPA met 8 gouttes dans un gallon et 16 gouttes dans 1/4 c. à thé (environ 1,2 mL), soit environ 0,08 mL la goutte. Un compte-gouttes courant donne environ 20 gouttes au millilitre : 2 de ses gouttes font 0,1 mL, pas 0,2. Écart hérité de la source ; avec le Matériel qui dit de compter les gouttes au millilitre, le lecteur tombe sur deux doses qui diffèrent du simple au double. À trancher : doser en millilitres | `13-sante-canada-salubrite-eau-urgence.md` ; `10-sante-canada-salubrite-urgence.md` ; `10-epa-desinfection-urgence-2026-10-18.html` (tableau) |
| 17 | Section 7, « L'alambic de fortune », dernier paragraphe | « Il laisse derrière lui **ce qui est plus lourd que l'eau** » | Ce qui reste dans la marmite, c'est ce qui **ne s'évapore pas** (« ces contaminants ne s'évaporent pas »), pas ce qui est plus lourd. La suite de la phrase (ce qui bout plus bas que l'eau passe) dit le bon mécanisme ; le début le contredit | `10-melccfp-ebullition-concentre-contaminants-chimiques.md` ; `13-usgs-chaleur-latente-eau.md` |
| 18 | Section 7, « L'alambic de fortune », 1re phrase | Enlève « l'arsenic, **l'uranium**, le nitrate et le manganèse » | La liste de la distillation : « bactéries, virus, protozoaires, nitrates, nitrites, arsenic, plomb, cuivre et manganèse ». **Pas d'uranium** (voir aussi NON RETROUVÉ) | `13-sante-canada-traitement-eau-puits.md` |

---

## 2. NON RETROUVÉ

Aucune source dans `sources/` ni dans la fiche `suivi/10-redaction.md` ; rien trouvé dans une source officielle publiée.

| # | Endroit | Chiffre ou fait |
| --- | --- | --- |
| 1 | Étape 4 ; logigramme, case p1 | Prendre l'eau à **20 ou 30 cm** sous la surface ; la surface concentre les pollens et les hydrocarbures |
| 2 | Étape 8 ; planche 10-01, repère 1 ; Points de contrôle (« Laisser reposer **12 h** de plus ») ; logigramme, case p2 | Décanter **12 à 24 h** ; le sable tombe en quelques minutes, l'argile en heures |
| 3 | Étape 9 | **Trois ou quatre** épaisseurs de coton |
| 4 | Étape 10 | Laisser les **2 ou 3 derniers centimètres** au fond |
| 5 | Étape 13 | L'UV en eau trouble : « rien ne le signale » ; « plus que le chlore et que le filtre » (la source donne bactéries, virus et protozoaires, sans comparaison) |
| 6 | Étape 17 | Transvaser **deux ou trois fois** l'eau bouillie (l'EPA dit de transvaser une eau qui goûte trop le chlore, sans nombre) |
| 7 | Étape 35 | Un puits qui redevient positif **deux fois de suite** a un défaut d'étanchéité ou une source voisine |
| 8 | Étape 40 | Manger la neige refroidit vers l'hypothermie (aucune source au dossier du ch. 10) |
| 9 | Étape 47 | La levée de l'avis : faire couler l'eau froide jusqu'à ce qu'elle sorte froide, jeter la glace, vider le bac, changer la cartouche (la source dit seulement qu'il n'est pas nécessaire de vidanger le chauffe-eau) |
| 10 | Étape 48 | « Une chasse d'eau, une douche ou un lave-vaisselle font la même purge » ; « soudures ou robinetterie au plomb » dans une maison d'une autre époque ; « les particules de plomb s'y accumulent » (la source donne la consigne de l'aérateur sans la raison) |
| 11 | Section 6, ligne « Coliformes totaux présents, *E. coli* absent » | Diagnostic « défaut d'étanchéité : de l'eau de surface entre dans le puits » |
| 12 | Section 6, ligne « Filtre qui coule beaucoup plus vite » | Céramique fêlée ou pli crevé, que seul le débit montre |
| 13 | Section 7, « Ce qu'on perd » | 16 L bouillis par jour = « **une bûche de plus** à fendre chaque jour » |
| 14 | Section 7, hypochlorite de calcium | « se garde **des années** » (déjà constaté introuvable au ch. 28, `28-cdc-chlore-solutions-et-stabilite.md`) ; piste : le catalogue de l'UNICEF donnerait environ **2 ans** en contenant fermé, page bloquée (Cloudflare), **non enregistrée** |
| 15 | Section 7, hypochlorite de calcium | « au contact de la matière organique, il peut prendre feu sans flamme » (l'EPA dit seulement : endroit aéré, protection des yeux) |
| 16 | Section 7, électrolyse | Le mécanisme (chlore à une électrode, hydrogène à l'autre) ; le carbone aux deux bornes ; l'acier ou le cuivre qui se dissout |
| 17 | Section 7, filtre à sable | La couche vivante meurt « hors gel » (le manuel parle de l'assèchement et des 48 h sans eau, pas du gel ; déjà noté non vérifié le 24 septembre) |
| 18 | Section 7, alambic | **Uranium** enlevé par la distillation ; « on récupère plus de vapeur » avec le serpentin |
| 19 | Section 7, « Le soleil, l'été » | Coucher la bouteille « sur une **surface sombre** » ; « Contre *Cryptosporidium*, il faut la marmite ou le filtre » |
| 20 | Section 7, buse ; planche 10-02 | Tuyau de **40 mm**, long de **1,5 à 2 m** : choix de construction, sans source. L'arithmétique qui suit est juste (1,26 L/m ; 2,5 L ; 48 ÷ 2,5 ≈ 19), mais elle porte sur les 48 L de l'écart 1 |

Gardés sans source et déjà déclarés dans la fiche : « feuilletée » (pierres chaudes, section 7).

---

## 3. Renvois faux

| # | Endroit | Renvoi | Ce qu'on trouve |
| --- | --- | --- | --- |
| 1 | Étape 14, « Les cinq minutes » | « Les ch. 48 (lièvre) et 50 (castor) appliquent la même durée » | Le **ch. 50** l'applique (l. 191 à 195, et la ligne de contrôle l. 232). Le **ch. 48** ne dit nulle part de faire bouillir l'eau 5 minutes : il parle de cuisson à cœur et d'eau bouillante sur les outils |
| 2 | Section 7, « Bouillir à la maison sans cuisinière » | « (rendements : ch. 87) » | Le ch. 87 ne donne aucun rendement ni aucune consommation pour faire bouillir de l'eau au barbecue ou au réchaud. Le ch. 83 (Poêles à bois et rendement) non plus. Le renvoi ne mène à rien |
| 3 | Section 7, « Le contenant d'écorce » | « Un contenant d'écorce de bouleau (ch. 94) » | Le ch. 94 donne la récolte de l'écorce (étapes 40 à 42) et renvoie lui-même au ch. 103 pour les contenants cousus ; le ch. 103 donne la racine d'épinette (étape 22), pas le contenant. Aucun chapitre ne dit comment plier ou coudre le contenant |

Tous les autres renvois tombent juste : ch. 2, 3 (eau, l. 87 et 287), 4 (l. 149), 6 (l. 85 et le réservoir d'eau chaude, l. 293), 15 (étapes 40 à 42 : mesurer, épaisseurs, endroits minces), 25, 26 (réhydratation, l. 463), 31 (fosse et bactéries, l. 62), 39 et 40 (déshydratation), 58 (percer), 111 (galvanisé) ; et tous les renvois internes (étapes, sections, « section 7, « … » ») tombent sur l'étape qui dit la chose.

**Repères des planches** : 10-01, repères 1 à 3 aux étapes 8 à 10, repère 4 à l'étape 14, repère 5 à l'étape 15 ; 10-08, repères 1 à 3 à l'étape 10 ; 10-02, repères 1 à 7 ; 10-07, repères 1 à 12 ; 10-03, repères 1 à 8 : chaque renvoi tombe sur la légende qui dit le geste. Deux remarques :
- **10-08** : le texte dit de descendre le bout bouché « sur le coton de la chaudière du bas » ; le dessin ne montre pas de coton sur le seau du bas. Le boyau du repère 1 repose sur le dépôt, alors que le texte dit « sans toucher le dépôt » (déjà signalé dans la fiche).
- **10-03**, repère 7 : la légende dit « au lieu de 2 et 3 » ; le texte dit « au lieu du couvercle à l'envers **et du bol dedans** », c'est-à-dire au lieu de 1, 2 et 3.

---

## 4. Noms latins manquants

| Nom dans le chapitre | Où | Nom latin à donner une fois |
| --- | --- | --- |
| Lièvre | Étape 14 | *Lepus americanus* |
| Bouleau (écorce de) | Section 7 | *Betula papyrifera* |
| *E. coli* | Points de contrôle, section 6 | jamais écrit en entier : *Escherichia coli* |
| Virus de l'hépatite A | Étape 14 | *Hepatovirus A* |
| *Cryptosporidium* | Partout | le genre seul ; aucune espèce nommée (à juger : le genre suffit-il ?) |

Portent leur nom latin : castor (*Castor canadensis*), rat musqué (*Ondatra zibethicus*), orignal (*Alces americanus*),
*Giardia lamblia*, *Francisella tularensis*.

**Contradiction à trancher par l'orchestrateur** : `roles.md` (rôle 3) demande un nom latin par espèce ; `.claude/cadre-agents.md`,
« La phrase », dit « pas de nom latin » dans les mots du texte. Le rapport relève les manques ; la décision n'est pas
du vérificateur.

---

## 5. Pictogrammes de danger

**Bien posés.** `selles` (étape 2, eau de surface ; étape 19, chlore et *Cryptosporidium*), `generatrice` (étape 6),
`chimie` (étape 20, mélanges ; électrolyse, chlore à la surface), `poison` (étape 27, nitrate et biberon), `glace`
(étape 36), `froid` (étape 40), `plomb` (étape 48), `co` (barbecue et réchaud, section 7), `pas-au-feu` (galvanisé,
section 7), `projection` (pierres, section 7), `vapeurs` (hydrogène, section 7). Tous les identifiants existent dans
`plan/dangers-inventaire.md`, section 1.

**Aucun danger mortel de l'ancienne section 8 n'est perdu** : génératrice → étape 6 ; barbecue et réchaud → section 7
(`co`) ; eau propre d'apparence, 10 kystes → étape 2 ; chlore et *Cryptosporidium* → étape 19 ; bouillir concentre,
nitrate, nourrisson, note [^1] → étape 27 ; plomb → étape 48 ; javel mélangée → étape 20 ; eau du fleuve → étape 1. Le
mécanisme du CO et l'atteinte des poumons 24 à 48 h après le chlore sont dans les pages `co` et `chimie` (inventaire,
sections 2.1 et 2.9, qui citent le ch. 10). La **pompe à essence** de l'ancien bloc n'est plus nommée dans le chapitre ;
la page `generatrice` (section 2.2) la nomme. À juger : la pompe à moteur au bord du lac est le cas du chalet.

**À juger.**
1. **Hypochlorite de calcium** (section 7) : le danger écrit est un départ de feu au contact de l'huile, des guenilles
   et du carburant. Le pictogramme posé est `chimie` (brûlure, gaz). `incendie` dit ce danger-là ; `chimie` reste
   juste pour la solution mère (l'EPA demande un endroit aéré et une protection des yeux).
2. **Alambic à serpentin** (section 7, repères 7 et 8) : la marmite est fermée par un joint et la vapeur sort par un
   tuyau enroulé dans la neige. Si le tuyau gèle et se bouche, la vapeur n'a plus de sortie. Aucun pictogramme ni
   aucune consigne ; `projection` ou `brulure` serait à l'étape. Pas de source au dossier : à chercher avant d'écrire.
3. `glace`, `froid`, `co`, `pas-au-feu`, `projection` et `vapeurs` ne sont toujours pas dans la colonne « Chapitres »
   de l'inventaire pour le ch. 10 (`co` et `generatrice` y sont).

---

## 6. Le logigramme (`images/logigrammes/10-eau.json`)

Chaque étape renvoyée existe. Quatre cases ne disent pas ce que dit le texte :

| Case | Ce que dit la case | Ce que dit le texte |
| --- | --- | --- |
| p2 | « **Si l'eau est trouble**, la laisser reposer de 12 à 24 h » | Étape 8 : on laisse reposer toute eau puisée, sans condition (section 1 : « on la laisse reposer, on la filtre, puis on la désinfecte ») |
| q5o | « Passer une eau de lac ou de neige au filtre à 1 µm, **s'il y en a un**, puis 2 gouttes de javel » | Étape 19 : une eau de lac ou de neige passe au filtre **ou** bout avant d'être chlorée ; le chlore seul ne fait presque rien contre *Cryptosporidium*. La case rend le filtre facultatif |
| q5o | « Froide ou colorée : 4 gouttes, et attendre plus longtemps » | Juste pour la dose (étapes 20 et 21), mais dans cette branche (pas de feu), le texte donne l'**iode** pour l'eau froide sans feu (étape 23), que le logigramme ne nomme nulle part |
| q2n | « Bouillir ne lui enlève pas le sel » | Exact (étape 1), mais c'est un avertissement redit dans le logigramme, ce que le cadre exclut |

---

## 7. Retrouvés dans leur source (pour mémoire)

27 à 29 g/L de sel (`13-universite-laval-…`) ; 10 kystes, 8 × 14 µm, CT < 12 à 25 °C et 65 à 360 à 3 à 5 °C, 3 à 25 jours
et médiane 7 à 10 jours (`13-inspq-giardia-lamblia.md`) ; 30 m, 15 m, 10 cm, 5 m (`13-rpep-article-17-…`) ; 6 m et
l'échappement (`10-sante-canada-generatrice-distance.md`) ; oocyste 4 à 6 µm, 73 °C une minute, CT 7 000
(`13-inspq-cryptosporidium.md`) ; virus 0,03 µm, iode 5 gouttes à 2 % et 30/60/120 min, javel 4 à 6 % et 30 min à plus
de 20 °C (`13-inspq-sante-voyage-eau.md`) ; 0,3 UNT, 5 UNT à l'œil, chlore huit fois moins efficace de 1 à 10 UNT
(`13-inspq-turbidite.md`) ; UV et particules (`13-sante-canada-traitement-eau-puits.md`) ; 1 minute, 65 °C, 85 °C
(`13-inspq-avis-ebullition.md`) ; 5 minutes en forêt (`46-quebec-tularemie.md`) ; 56 °C une minute, 94 °C 45 s, 90 jours
dans l'eau, viande gelée 3 ans (`13-tularemie-inactivation-thermique.md`) ; 2 gouttes (0,2 mL) et 30 min
(`13-sante-canada-salubrite-eau-urgence.md`) ; dose doublée en eau trouble, colorée ou très froide (`13-epa-…`) ; un an
de garde de la javel (`13-fabricant-…`, `13-epa-…`) ; contre-indications et durée de l'iode, iode et chlore contre
*Cryptosporidium*, soleil 6 h et 2 jours (`13-cdc-yellow-book-…`) ; 3 jours au réfrigérateur, 24 h à la température de
la pièce, avis de non-consommation (`10-quebec-contamination-…`, `09-quebec-eau-potable-urgence.md`) ; 4 L par personne
et par jour (`13-canada-trousse-urgence.md`) ; fréquence des analyses et liste des paramètres
(`13-quebec-analyse-eau-puits.md`) ; nitrate 10 et 45, nitrite 1 et 3, arsenic 0,010, uranium 0,02, fluorure 1,5,
plomb 0,005, baryum 2,0, *E. coli* aucun par 100 mL, manganèse 0,02 (`13-sante-canada-tableau-sommaire-…`) ; manganèse
0,12 et 0,06 (`13-quebec-manganese.md`) ; méthémoglobinémie avant 3 mois, note [^1] (`13-inspq-nitrates-…`, deux
fiches) ; bouillir concentre (`10-melccfp-ebullition-…`) ; 50 et 250 mg/L, 5,25 %, gestes et ordre de la désinfection,
24 h, analyses à 1 et 4 semaines, 540 mL pour 30 m dans 152 mm (`10-melcc-desinfection-puits-procedure.md`,
`13-melcc-qualite-…`) ; 7,9, 17,7 et 636 L/m, rayon² × 3,14 ÷ 10, 52 500 mg/L, 0,95 L par 1 000 L, 28 × 17,7 ≈ 495 L,
environ 0,5 L (arithmétique juste) ; 4 à 10 % d'eau dans la neige fraîche, 10 à 25 L (`13-nsidc-neige-…`) ; 80, 100 et
540 cal/g, près de deux fois et plus de six fois le bois (`13-usgs-chaleur-latente-eau.md`) ; mécanisme de la
conduite qui perd sa pression (`10-reseau-depressurise-…`) ; tableau de l'avis d'ébullition (`13-inspq-avis-ebullition.md`,
`10-quebec-contamination-…`) ; plomb : 1940 à 1955, jusqu'aux années 1970, moins de 8 logements, 5 µg/L, moins de 6 ans,
purge, eau froide, aérateur (`13-quebec-plomb-eau-potable.md`, `13-sante-canada-plomb-eau-chaude.md`) ; 180 à 280 L
(`10-chauffe-eau-residentiel-volume.md`) ; contenant d'écorce sur les braises, des heures, moins de bois que les
pierres, grand contenant qui plie (`13-speth-2015-…`) ; pierres mouillées ou poreuses, grès, calcaire
(`13-fm21-76-…`) ; saumure 25 g/L, solution 5 g/L (`13-sswm-wata-…`) ; couche vivante jusqu'à 30 jours, invisible,
48 h, 5 cm d'eau à la hauteur du boyau (`13-cawst-…`) ; charbon 2 à moins de 300 m²/g, 750 à 1 100 m²/g, plus de
800 °C, trois à cinq fois (`13-usfs-…`) ; glace qui rejette la saumure (`13-nsidc-glace-de-mer-saumure.md`).
