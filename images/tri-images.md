# Tri des images à acquérir — planche, photo, ou rien

Fait le 24 septembre 2026, sans rien télécharger ni dessiner. Source : les **640 lignes « à acquérir »** de `images/credits.md`.
Chaque ligne a reçu un seul verdict, selon la règle de JP : « Ceux qui se font mieux en planche, on les fait en planche. Ceux que c'est mieux des belles photos, on met des belles photos. »

**Notation.** Une ligne s'écrit `NN·AA-n` : `NN` est le **nouveau** numéro de chapitre, `AA-n` le numéro de la ligne dans `credits.md` (ancien numéro de chapitre, rang de l'image). Exemple : `74·69-5` est la ligne 69-5 du registre, qui vit maintenant au chapitre 74. Les planches proposées portent le nouveau numéro ; les numéros en **-40 et plus** sont provisoires, choisis pour ne heurter ni les 110 validées ni les idées déjà numérotées.

**Ce qui a tranché.** PLANCHE : ce qu'on fabrique, monte ou fait de ses mains (critère de `.claude/skills/planches/SKILL.md`). PHOTO : ce qu'on reconnaît dans le réel. INUTILE : une donnée, une règle, un décor, un article acheté, ce que JP fait déjà (débiter un orignal, souder, câbler du 12 V, couper son bois), ou ce que le livre a coupé depuis (loi, permis, numéros à appeler, paperasse, sécurité domestique ordinaire). Les photos « de JP » n'existent pas : une PHOTO se cherche sous licence.

## 1. Résumé

| Verdict | Lignes |
| --- | --- |
| DÉJÀ COUVERTE | **117** |
| PLANCHE | **103** |
| PHOTO | **63** |
| INUTILE | **357** |
| **Total** | **640** |

### Par tome (nouveaux numéros)

| Tome | Chapitres | Lignes | Déjà couvertes | Planche | Photo | Inutile |
| --- | --- | --- | --- | --- | --- | --- |
| 1 — Tenir | 01 à 18 | 100 | 13 | 8 | 4 | 75 |
| 2 — Le corps | 19 à 40 | 103 | 17 | 17 | 9 | 60 |
| 3 — Prélever | 41 à 60 | 111 | 22 | 18 | 10 | 61 |
| 4 — De la bête au garde-manger | 61 à 80 | 146 | 27 | 22 | 14 | 83 |
| 5 — La forêt, le jardin et le chalet | 82 à 97 | 95 | 12 | 17 | 19 | 47 |
| 6 — L'atelier | 98 à 108 | 85 | 26 | 21 | 7 | 31 |

### Coût estimé

- **Planches : 45 planches** couvrent les 103 lignes PLANCHE. 37 sont nouvelles ; 8 sont des planches de la fouille (`fouille-planches-oubliees.md`) qui absorbent des lignes du registre.
  - Pages nouvelles : **27,5 pages**, plus **1,5 page** ajoutée à deux planches de la fouille (58-10, 91-11). Total **29 pages** ≈ **5 075 000 tokens** à 175 k la page.
  - Les six autres planches de la fouille (73-07, 95-10, 50-10, 108-10, 82-10, 100-15) prennent leurs lignes sans page de plus : leur coût est déjà dans les 39 pages de la fouille.
  - Pages par tome : tome 1 : 1,5, tome 2 : 5, tome 3 : 3, tome 4 : 8, tome 5 : 5, tome 6 : 6,5.
- **Photos : 63 lignes, 76 fichiers à trouver** (plusieurs lignes partagent le même fichier, certaines en demandent plusieurs) ≈ **608 000 tokens** à 8 k la photo. **29 fichiers sur 76 sont marqués « difficile »** (26 lignes) : ces sujets (états de viande, moisissures, buée) existent rarement sous licence libre. Ceux qu'on ne trouve pas basculent en vignette de planche ou tombent — à décider au retour de la recherche, pas avant.
- **Ensemble : ≈ 5 683 000 tokens.**

## 2. Les planches, de la plus utile à la moins utile pour survivre

Pages : 1 = pleine page, 0,5 = demi-page. « Fouille » = planche déjà listée dans `images/fouille-planches-oubliees.md` (numéro ancien entre parenthèses).

| Rang | Planche | Sujet | Lignes couvertes | Pages | Recoupements |
| --- | --- | --- | --- | --- | --- |
| 1 | **26-40** | La plaie : appuyer de tout son poids sur la cuisse, puis laver au jet de seringue | 26·27-3, 26·27-5 | 1 |  |
| 2 | **13-40** | Du ferrocérium à la flamme : l'échelle de bois (amadou, D2, D5), le grattoir immobile et la tige qu'on tire, le nid qu'on referme au souffle | 13·17-1, 13·17-2, 13·17-3 | 1 | Recoupe la fouille n° 16 (13-09, le briquet à pierre) : même sujet, les deux tiennent sur deux pages en regard. |
| 3 | **72-40** | Fondre le gras : cubes froids, petit feu, filtre de coton, pot coulé d'un coup ; ratés en vignette (eau au fond, cratère de retrait) | 52·48-3, 52·48-4, 56·52-4, 72·67-3, 72·67-5, 72·67-6 | 1 | Sert les ch. 52 (ours) et 56 (phoque) par renvoi. |
| 4 | **72-41** | Le pemmican : de la lanière sèche pilée au bloc coulé, et la coupe d'un bon bloc (pas de poche d'air) | 72·67-2, 72·67-8 | 1 |  |
| 5 | **74-40** | Sauver le congélateur l'hiver : le coffre sorti au nord, vides bourrés de neige ; les trois piles dehors ; le témoin gobelet et pièce ; les trois états d'un paquet, en coupe | 01·01-4, 73·68-6, 74·69-4, 74·69-5, 74·69-7 | 1 | Sert les ch. 01 et 73 par renvoi. |
| 6 | **71-40** | Les lanières : trancher à 6 mm dans le grain, étendre, et le test de la cassure (casse net / plie) | 71·66-3, 72·67-4 | 0,5 |  |
| 7 | **58-10** | Fouille n° 12 élargie : le ciseau à glace, le trou en entonnoir, la jauge crochetée qu'on lit au trou, le trou de puisage couvert d'un matelas de neige, l'écumoire de boîte de conserve | 10·13-4, 41·34-4, 42·35-6, 58·54-3, 58·54-7 | +0,5 | **Fouille n° 12** (ancien 54-10). Les cinq lignes s'y ajoutent : +0,5 page aux 2 pages déjà comptées dans la fouille. Sert les ch. 10, 41 et 42 par renvoi. |
| 8 | **30-40** | Le sas d'épidémie et la chambre du malade : galerie, tambour (crochets, bassin savonneux), chaudière à couvercle devant la porte | 30·05-2, 30·05-7 | 1 | Même geste de déshabillage que la 04-40 : dessiner la séquence une fois, renvoyer. |
| 9 | **25-40** | Réchauffer une gelure : le chaudron, le thermomètre dans l'eau, le membre qui ne touche pas le fond, l'eau chaude ajoutée loin du membre | 25·03-4 | 0,5 |  |
| 10 | **91-11** | Fouille n° 18 élargie : sécher les cueillettes — la claie en couche unique, le chapelet sur babiche, les bottes pendues tête en bas, la caisse près du poêle, et le test casse / plie | 33·30-65, 33·30-66, 33·30-68, 92·58-30, 92·58-31, 93·59-11, 93·59-12, 93·59-13 | +1 | **Fouille n° 18** (ancien 57-11). Huit lignes des ch. 33, 92 et 93 s'y rangent : +1 page. Les trois chapitres renvoient à la 91-11. |
| 11 | **73-07** | Fouille n° 19 : la glacière de blocs de lac — traits de scie, bloc sorti à la pince, empilage serré, vides bourrés, chapeau, drain | 73·68-4, 73·68-5 | 0 (fouille) | **Fouille n° 19** (ancien 68-07). Les deux lignes y sont déjà : aucun coût de plus. |
| 12 | **80-40** | Le baril de choucroute : chou tassé, 3 cm de saumure au-dessus, poids, joint d'eau (la vitamine C de l'hiver) | 20·25-5, 80·77-4 | 0,5 | Sert le ch. 20 (scorbut) par renvoi. |
| 13 | **51-40** | Le porc-épic : le retourner au bâton, la zone sans piquants (profil et dessous), ouvrir par le ventre, ôter un piquant dans l'axe | 51·47-1, 51·47-2, 51·47-3, 51·47-7 | 1 |  |
| 14 | **101-40** | Tenir l'angle et affûter sans pierre : le test du marqueur, le galet de grès mouillé, le fond non émaillé d'une tasse, la ceinture de cuir | 101·82-2, 101·82-8 | 1 |  |
| 15 | **107-40** | Tremper un outil : l'aimant qui décroche, l'entrée dans l'huile dans l'axe, la lime qui glisse, le revenu différentiel | 107·88-3, 107·88-4, 107·88-7, 107·88-8 | 1 |  |
| 16 | **99-40** | Le tendon et la babiche : défibrer au maillet, le poste de débourrage, les ratés de la lanière (tire-bouchon, cassante) | 99·80-3, 99·80-4, 99·80-6 | 1 | Nourrit la fouille n° 14 (45-02, la corde de tendon de l'arc). |
| 17 | **98-40** | Assouplir la peau : sur cadre, sur l'arête d'une planche, sur une corde tendue, à deux | 98·79-6 | 1 |  |
| 18 | **64-40** | Démonter sans scie : l'épaule qui se détache au couteau, la hanche qui se désarticule | 63·38-7, 64·39-2 | 1 | Même chapitre que la fouille n° 10 (64-08, sortir la viande du bois). |
| 19 | **22-40** | Le cœur, la langue, les joues : parer le cœur en croix, peler la langue pochée, lever les joues | 22·41-2, 22·41-3, 23·42-5 | 1 |  |
| 20 | **62-40** | Où est le gras sur l'orignal : les six sites, et comment lever le gras de rognon d'un bloc | 62·37-9 | 0,5 |  |
| 21 | **04-40** | Le sas au retour des retombées : ôter la couche du dehors en la roulant, l'ordre des gestes | 04·06-3 | 0,5 | Même séquence que la 30-40. |
| 22 | **105-40** | Lever et caler au fur et à mesure : le vérin, la pile de cales croisées qui suit la charge | 105·86-4 | 0,5 |  |
| 23 | **31-40** | Le puits absorbant des eaux grises, en coupe (suite de la 31-04) | 31·28-4 | 0,5 |  |
| 24 | **23-40** | Refroidir une grosse cuisson : partager en plats bas, dans la neige, découverts | 23·42-3 | 0,5 | Sert le ch. 18 par renvoi. |
| 25 | **96-40** | Les graines : fermenter la tomate en trois temps, le test de germination au coton roulé, le pot de garde en coupe | 09·12-2, 96·75-4, 96·75-6, 96·75-7 | 1 | Sert le ch. 09 par renvoi. |
| 26 | **95-40** | Monter le jardin : planche à plat, billon, bac ; le buttage en trois temps ; le composteur à deux bacs | 95·74-3, 95·74-4, 95·74-6 | 1 | Même chapitre que la fouille n° 25 (95-10) : à dessiner ensemble. |
| 27 | **95-10** | Fouille n° 25 : le tunnel de perches, la cloche, le bidon noirci — y ajouter la couverture antigel posée le soir | 95·74-8 | 0 (fouille) | **Fouille n° 25** (ancien 74-10). Aucun coût de plus. |
| 28 | **94-40** | La sève sans équipement : le chalumeau enfoncé au maillet de bois, la cryoconcentration (disque de glace retiré), le sucre pesé après évaporation | 94·60-17, 94·60-19, 94·60-21 | 1 |  |
| 29 | **50-40** | La queue et le gras du castor : la peau écailleuse qui se lève, la nappe de gras tirée à la main | 50·46-4, 50·46-5 | 0,5 | Même chapitre que la fouille n° 11. |
| 30 | **50-10** | Fouille n° 11 : le collet de noyade du castor, avec le plan de l'étang d'hiver (hutte, réserve immergée, coulée) | 50·46-8 | 0 (fouille) | **Fouille n° 11** (ancien 46-10). La coupe de l'étang y est déjà : aucun coût de plus. |
| 31 | **75-40** | Saigner et vider au bord de l'eau et sur la glace : l'arc branchial coupé, la pointe à l'anus lame vers le haut, le bloc sorti | 57·53-2, 58·54-5, 75·70-2, 75·70-3 | 1 | Sert les ch. 57 et 58 par renvoi. |
| 32 | **97-40** | Le cône d'abattage et la saignée de la volaille | 97·78-6 | 0,5 |  |
| 33 | **108-40** | Tremper les chandelles (bâton, deux mèches, support), regarnir le puits de retrait, le réflecteur de fer-blanc | 36·32-5, 108·89-5, 108·89-6 | 1 | Sert le ch. 36 par renvoi. |
| 34 | **108-10** | Fouille n° 20 : le baril à lessive et le savon mou — y ajouter la soude versée dans l'eau (jamais l'inverse) et la trace | 108·89-2, 108·89-4 | 0 (fouille) | **Fouille n° 20** (ancien 89-10). Aucun coût de plus. |
| 35 | **82-10** | Fouille n° 5 : le poêle qu'on répare — y ajouter le test du billet sur le joint de porte | 09·12-6 | 0 (fouille) | **Fouille n° 5** (anciens 16-10 et 16-11). Aucun coût de plus. |
| 36 | **100-15** | Fouille n° 22 : le mukluk et sa doublure — la coupe du système de chaussage y est déjà | 100·81-1 | 0 (fouille) | **Fouille n° 22** (ancien 81-15). Aucun coût de plus. |
| 37 | **78-40** | Remplir un pot : l'entonnoir, l'espace de tête, la spatule qui chasse les bulles | 78·73-3 | 0,5 |  |
| 38 | **79-40** | Les racines au sable humide, en couches, sans qu'elles se touchent | 79·76-5 | 0,5 |  |
| 39 | **83-40** | Allumer par le haut : le montage et les trois temps | 83·15-2 | 0,5 |  |
| 40 | **69-40** | Injecter la saumure le long de l'os | 69·64-5 | 0,5 |  |
| 41 | **100-40** | Réparer : l'alêne losange dans l'axe de la couture, la pièce intérieure à coins ronds | 100·81-5, 100·81-6 | 0,5 |  |
| 42 | **106-40** | Lire le fil : la cheville fendue contre sciée, le fil qui sort par le chant, le joint qui fait godet | 106·87-5, 106·87-6, 106·87-8 | 0,5 |  |
| 43 | **55-40** | La planche à tendre : le gabarit, la peau bien montée contre mal montée | 55·51-5 | 0,5 |  |
| 44 | **60-40** | Lever l'engin sans chavirer : à deux, du côté sous le vent, le poids près du plat-bord | 60·56-5 | 0,5 |  |
| 45 | **40-40** | Le tableau de cailloux et le calendrier à encoches des enfants | 40·33-2, 40·33-4 | 0,5 |  |

**Recoupements avec les 20 planches autochtones en cours (12-01 à 12-06, 89-01 à 89-07, 90-01 à 90-07).** Aucune ligne du registre ne tombe dans les chapitres 12, 89 ou 90 : ce sont des chapitres neufs, sans ligne à `credits.md`. Un seul contact : la ligne `94·60-30` (le test de la poix, déjà couvert par la 94-34) touche l'essai de la languette de gomme du canot (90, C4) — la 90 peut renvoyer à la 94-34 au lieu de redessiner la goutte.

**Autres recoupements avec la fouille, sans planche ici.** `02·02-6` (le chalet dans ses zones de protection contre le feu) est coupée : la fouille n° 13 (11-03, le chalet paré aux braises) fait mieux ce travail. `59·55-7` (la batture) reste une photo, mais la fouille n° 17 (59-09, la trappe de batture) est dans le même chapitre.

## 3. Les photos à chercher, par chapitre

Liste de recherche. Sources : Wikimedia Commons filtré par licence, iNaturalist, planches d'avant 1930, agences fédérales américaines, figures CC BY. « Même recherche » = ne rien chercher de plus, le fichier d'une autre ligne sert.

### Chapitre 04 — Retombées radioactives

| Ligne | Ce que la photo doit montrer | Cadrage | Fichiers | Trouvable |
| --- | --- | --- | --- | --- |
| 04·06-6 | Lichen des caribous (*Cladonia rangiferina*) en tapis. Le bolet et le bleuet sont déjà là (59-23c, 57-2a). | plongée, une main pour l'échelle | 1 | facile |

### Chapitre 05 — Le stock permanent du chalet

| Ligne | Ce que la photo doit montrer | Cadrage | Fichiers | Trouvable |
| --- | --- | --- | --- | --- |
| 05·08-4 | Boîte de conserve bombée, boîte rouillée au serti, boîte saine | trois boîtes alignées, lumière rasante sur le bombé | 2 | difficile |

### Chapitre 09 — Ce qui manque toujours

| Ligne | Ce que la photo doit montrer | Cadrage | Fichiers | Trouvable |
| --- | --- | --- | --- | --- |
| 09·12-4 | Essence fraîche (claire) contre essence vieillie, vernie (ambrée, dépôt) | deux bocaux à contre-jour, fond blanc | 1 | difficile |

### Chapitre 13 — Feu sans allumettes

| Ligne | Ce que la photo doit montrer | Cadrage | Fichiers | Trouvable |
| --- | --- | --- | --- | --- |
| 13·17-4 | Écorce externe de bouleau qui se détache en rubans sur du bois mort ; coulée de gomme d'épinette | deux gros plans | 2 | facile |

### Chapitre 22 — Abats et organes

| Ligne | Ce que la photo doit montrer | Cadrage | Fichiers | Trouvable |
| --- | --- | --- | --- | --- |
| 22·41-7 | Poisson ouvert : foie, rogue et laitance sortis à côté | plongée sur planche | 1 | moyen |

### Chapitre 23 — Ce que personne ne garde

| Ligne | Ce que la photo doit montrer | Cadrage | Fichiers | Trouvable |
| --- | --- | --- | --- | --- |
| 23·42-6 | Gras de rognon levé d'un bloc, rein à part : même fichier que 36-6 | — | 0 | même recherche que 36-6 |

### Chapitre 25 — Le froid lui-même

| Ligne | Ce que la photo doit montrer | Cadrage | Fichiers | Trouvable |
| --- | --- | --- | --- | --- |
| 25·03-6 | Gelure superficielle (blanche, cireuse, dure dessus, souple dessous) et gelure profonde (cloques, peau marbrée ou noire) | deux gros plans cliniques, main ou pied, lumière neutre | 2 | probable (images médicales sous licence libre) |

### Chapitre 26 — Soigner quand il n'y a personne

| Ligne | Ce que la photo doit montrer | Cadrage | Fichiers | Trouvable |
| --- | --- | --- | --- | --- |
| 26·27-6 | Rougeur cernée au crayon, puis la même qui déborde le trait le lendemain (infection qui avance) | gros plan de peau, deux temps | 2 | probable (images médicales) |

### Chapitre 33 — Plantes médicinales boréales

| Ligne | Ce que la photo doit montrer | Cadrage | Fichiers | Trouvable |
| --- | --- | --- | --- | --- |
| 33·30-16 | Saule en talle : plusieurs tiges d'une même souche | plante entière, recul | 1 | facile |
| 33·30-25 | Aralie à tige nue : rhizome déterré et nettoyé | à plat, fond neutre | 1 | moyen |
| 33·30-36 | Cicutaire maculée : racine tubéreuse coupée en long, chambres cloisonnées | coupe en gros plan | 1 | moyen (iNaturalist) |
| 33·30-70 | Buée à l'intérieur d'un bocal de séchage fermé | bocal à contre-jour | 1 | difficile |
| 33·30-71 | Moisissure sur une botte de plantes séchées : feutrage blanc, points noirs | gros plan | 1 | difficile |

### Chapitre 42 — Lire le territoire autour du chalet

| Ligne | Ce que la photo doit montrer | Cadrage | Fichiers | Trouvable |
| --- | --- | --- | --- | --- |
| 42·35-4 | Lisière franche : repousse de feuillus d'un côté, pessière fermée de l'autre, la ligne au centre | frontal, les deux unités à parts égales | 1 | moyen |

### Chapitre 48 — Lièvre d'Amérique

| Ligne | Ce que la photo doit montrer | Cadrage | Fichiers | Trouvable |
| --- | --- | --- | --- | --- |
| 48·44-6 | Broutage d'hiver du lièvre : tiges coupées net en biseau à hauteur de neige | gros plan, neige dans le cadre | 1 | moyen (iNaturalist, signes) |

### Chapitre 49 — Gélinotte huppée et tétras du Canada

| Ligne | Ce que la photo doit montrer | Cadrage | Fichiers | Trouvable |
| --- | --- | --- | --- | --- |
| 49·45-14 | Peau collante et luisante d'un oiseau gardé chaud dans un sac (raté) | gros plan | 1 | difficile |
| 49·45-15 | Pot de confit correct contre pot dont la graisse a crevé, viande à l'air | deux pots, même lumière | 1 | difficile |

### Chapitre 50 — Castor

| Ligne | Ce que la photo doit montrer | Cadrage | Fichiers | Trouvable |
| --- | --- | --- | --- | --- |
| 50·46-1 | Castor entier, à sa vraie taille : une belle photo, objet d'échelle si possible | plein cadre, de profil | 1 | facile |

### Chapitre 51 — Porc-épic

| Ligne | Ce que la photo doit montrer | Cadrage | Fichiers | Trouvable |
| --- | --- | --- | --- | --- |
| 51·47-4 | Pointe d'un piquant de porc-épic, barbelures visibles | macro | 1 | facile |
| 51·47-5 | Tronc de sapin ou d'épinette écorcé en hauteur par le porc-épic en hiver | tronc, recul | 1 | moyen |

### Chapitre 52 — Ours noir

| Ligne | Ce que la photo doit montrer | Cadrage | Fichiers | Trouvable |
| --- | --- | --- | --- | --- |
| 52·48-1 | Nappe de gras sous-cutané d'un ours d'automne, en une feuille | plongée, échelle | 1 | difficile |

### Chapitre 55 — Martre, vison, renard, lynx, loup

| Ligne | Ce que la photo doit montrer | Cadrage | Fichiers | Trouvable |
| --- | --- | --- | --- | --- |
| 55·51-1 | Martre, vison, renard roux, lynx du Canada, loup gris : cinq portraits | profil strict, même cadrage pour les cinq | 5 | facile |

### Chapitre 59 — Éperlan et poisson du fleuve

| Ligne | Ce que la photo doit montrer | Cadrage | Fichiers | Trouvable |
| --- | --- | --- | --- | --- |
| 59·55-7 | Batture à marée basse, chenaux qui se remplissent les premiers ; basse mer et mi-marée montante | point haut, même lieu deux fois | 2 | moyen |

### Chapitre 61 — Abattage, saignée, éviscération

| Ligne | Ce que la photo doit montrer | Cadrage | Fichiers | Trouvable |
| --- | --- | --- | --- | --- |
| 61·36-6 | Bloc de viscères d'orignal sorti, gras périrénal détaché à part | plongée à 45°, main gantée pour l'échelle | 1 | difficile |

### Chapitre 63 — Quartier arrière

| Ligne | Ce que la photo doit montrer | Cadrage | Fichiers | Trouvable |
| --- | --- | --- | --- | --- |
| 63·38-3 | Ganglion de la cuisse sorti avec son gras, puis paré | gros plan, lame pour l'échelle | 1 | difficile |

### Chapitre 69 — Saumure

| Ligne | Ce que la photo doit montrer | Cadrage | Fichiers | Trouvable |
| --- | --- | --- | --- | --- |
| 69·64-4 | Deux tranches d'une pièce saumurée : rose uniforme contre centre resté gris | plongée, même assiette | 1 | difficile |
| 69·64-7 | Saumure filante : le fil continu qui coule d'une cuillère | profil, contre-jour | 1 | difficile |

### Chapitre 70 — Fumage à froid

| Ligne | Ce que la photo doit montrer | Cadrage | Fichiers | Trouvable |
| --- | --- | --- | --- | --- |
| 70·65-2 | La pellicule : filet sec, collant, luisant contre filet humide et terne | deux filets côte à côte | 1 | difficile |
| 70·65-3 | Fumée mince, bleutée, du bois qui couve, contre fumée épaisse et blanche | même foyer, deux photos | 2 | moyen |
| 70·65-4 | Chair fumée à froid translucide et souple contre chair qui a blanchi et s'effeuille | gros plan | 1 | difficile |

### Chapitre 71 — Fumage à chaud et séchage

| Ligne | Ce que la photo doit montrer | Cadrage | Fichiers | Trouvable |
| --- | --- | --- | --- | --- |
| 71·66-4 | Buée dans un pot de viande séchée : même fichier que 30-70 | — | 0 | même recherche que 30-70 |

### Chapitre 72 — Pemmican et graisses

| Ligne | Ce que la photo doit montrer | Cadrage | Fichiers | Trouvable |
| --- | --- | --- | --- | --- |
| 72·67-1 | Trois gras d'orignal à froid : périrénal (dur, blanc), couverture (crème), mésentérique (mou, grisé) | trois assiettes blanches, plongée | 1 | difficile |

### Chapitre 76 — Saler et sécher la truite

| Ligne | Ce que la photo doit montrer | Cadrage | Fichiers | Trouvable |
| --- | --- | --- | --- | --- |
| 76·71-7 | Coupe d'une pièce de poisson croûtée (bord dur, cœur humide) contre une pièce séchée à cœur | deux coupes transversales | 1 | difficile |

### Chapitre 77 — Fumer le poisson

| Ligne | Ce que la photo doit montrer | Cadrage | Fichiers | Trouvable |
| --- | --- | --- | --- | --- |
| 77·72-4 | La pellicule : même fichier que 65-2 | — | 0 | même recherche que 65-2 |
| 77·72-8 | Chair fumée à froid : même fichier que 65-4 | — | 0 | même recherche que 65-4 |

### Chapitre 80 — Fermentation

| Ligne | Ce que la photo doit montrer | Cadrage | Fichiers | Trouvable |
| --- | --- | --- | --- | --- |
| 80·77-1 | Choucroute : jour 0, en pleine fermentation, finie | trois pots, même lumière | 1 | moyen |
| 80·77-6 | Voile de levures ou moisissure sur une choucroute mal lestée | gros plan | 1 | moyen |

### Chapitre 82 — Le feu au chalet

| Ligne | Ce que la photo doit montrer | Cadrage | Fichiers | Trouvable |
| --- | --- | --- | --- | --- |
| 82·16-2 | Suie poudreuse contre créosote luisante dans un tuyau : mêmes fichiers que la 15-5 | — | 0 | même recherche que 15-5 |

### Chapitre 83 — Poêles à bois et rendement

| Ligne | Ce que la photo doit montrer | Cadrage | Fichiers | Trouvable |
| --- | --- | --- | --- | --- |
| 83·15-5 | Les trois stades de dépôt dans un conduit : suie poudreuse brun clair, floconneux noir, vitrifié noir luisant | trois gros plans, même échelle | 3 | moyen |
| 83·15-9 | Épinette noire morte sur pied, écorce tombée, sèche (bon bois de chauffage), à côté d'un chicot pourri (bois mou, carpophores) | deux arbres en pied | 2 | moyen |

### Chapitre 91 — Petits fruits

| Ligne | Ce que la photo doit montrer | Cadrage | Fichiers | Trouvable |
| --- | --- | --- | --- | --- |
| 91·57-6 | Test de la buée, fruits séchés : même fichier que 30-70 | — | 0 | même recherche que 30-70 |

### Chapitre 92 — Plantes comestibles boréales

| Ligne | Ce que la photo doit montrer | Cadrage | Fichiers | Trouvable |
| --- | --- | --- | --- | --- |
| 92·58-2 | Pétiole de crosse de fougère-à-l'autruche coupé : sillon profond en U | macro de la coupe | 1 | moyen |
| 92·58-5 | Feuille de quenouille coupée : section en D (l'iris est plat) | macro de la coupe | 1 | difficile |
| 92·58-10 | Feuille de plantain déchirée en travers, fils des nervures | macro | 1 | moyen |
| 92·58-16 | Rhizome de cicutaire coupé en long : même fichier que 30-36 | — | 0 | même recherche que 30-36 |

### Chapitre 93 — Champignons

| Ligne | Ce que la photo doit montrer | Cadrage | Fichiers | Trouvable |
| --- | --- | --- | --- | --- |
| 93·59-3 | Amanite déterrée entière, volve à la base, contre un pied coupé au ras | deux photos, litière dégagée | 2 | vérifier d'abord 59-23e/f |
| 93·59-15 | Buée dans un pot de champignons secs : même fichier que 30-70 | — | 0 | même recherche que 30-70 |
| 93·59-16 | Moisissure sur des champignons secs, sans embellir | gros plan | 1 | difficile (un seul fichier peut servir 30-71) |
| 93·59-17 | Récolte de champignons fermentée au fond d'un sac de plastique | plongée dans le sac | 1 | difficile |

### Chapitre 94 — Sève, gomme, écorces

| Ligne | Ce que la photo doit montrer | Cadrage | Fichiers | Trouvable |
| --- | --- | --- | --- | --- |
| 94·60-11 | Couleur du liber frais : bouleau orange rougeâtre, épinette noire vert olive, et les autres de l'étape 45 | coupes fraîches, même lumière | 3 | difficile |
| 94·60-25 | Film blanchâtre de moisissure à la surface d'un sirop | gros plan | 1 | difficile |
| 94·60-26 | Sirop qui fermente : bulles, mousse | gros plan | 1 | difficile |
| 94·60-27 | Sève tournée : trouble laiteux, filaments | bocal à contre-jour | 1 | difficile |

### Chapitre 95 — Jardin nordique

| Ligne | Ce que la photo doit montrer | Cadrage | Fichiers | Trouvable |
| --- | --- | --- | --- | --- |
| 95·74-2 | Profil de podzol : litière, horizon cendreux, sable orangé | profil frontal, ruban pour l'échelle | 1 | facile |

### Chapitre 97 — Petit élevage

| Ligne | Ce que la photo doit montrer | Cadrage | Fichiers | Trouvable |
| --- | --- | --- | --- | --- |
| 97·78-2 | Poule qui a froid : plumes ébouriffées, posture raide, entassement | sujet entier | 1 | difficile |
| 97·78-3 | Engelure de crête : zone blanche cireuse, puis noircie | gros plan | 1 | moyen |

### Chapitre 98 — De la peau au cuir

| Ligne | Ce que la photo doit montrer | Cadrage | Fichiers | Trouvable |
| --- | --- | --- | --- | --- |
| 98·79-5 | Tranche d'une peau en cours de tannage : pénétrée à cœur contre cœur encore cru | macro de la tranche | 1 | difficile |
| 98·79-8 | Trois cuirs finis : tanné végétal (brun, ferme), chamoisé fumé (souple, ambré), mégissé (blanc) | même éclairage, côte à côte | 3 | moyen |

### Chapitre 104 — Le stock de pièces et de consommables

| Ligne | Ce que la photo doit montrer | Cadrage | Fichiers | Trouvable |
| --- | --- | --- | --- | --- |
| 104·85-4 | Essence séparée en deux phases, ligne visible | bocal à contre-jour | 1 | difficile (même recherche que 12-4) |
| 104·85-6 | Pile lithium-ion gonflée à côté d'une saine | gros plan | 1 | facile |

### Chapitre 105 — Leviers, poulies, treuils

| Ligne | Ce que la photo doit montrer | Cadrage | Fichiers | Trouvable |
| --- | --- | --- | --- | --- |
| 105·86-5 | Câble d'acier à rejeter : fils cassés, cage d'oiseau, coque, écrasement | quatre gros plans | 4 | moyen |

### Chapitre 107 — Trempe et travail du métal à chaud

| Ligne | Ce que la photo doit montrer | Cadrage | Fichiers | Trouvable |
| --- | --- | --- | --- | --- |
| 107·88-5 | Couleurs de revenu sur acier poli, de la paille au bleu | une bande ou une lame | 1 | facile |

### Chapitre 108 — Savon et chandelles

| Ligne | Ce que la photo doit montrer | Cadrage | Fichiers | Trouvable |
| --- | --- | --- | --- | --- |
| 108·89-9 | Suif d'orignal, gras d'ours, lard à la même température | trois pots identiques | 1 | difficile |

## 4. Déjà couvertes et inutiles

### Déjà couvertes (117)

| Ce qui les couvre | Lignes |
| --- | --- |
| planche 03-09 | 03·04-3 |
| planche 03-10 | 03·04-6 |
| planche 04-01a | 04·06-2 |
| planche 10-01 | 10·13-2 |
| planche 10-02 | 10·13-1 |
| planche 10-03 | 10·13-5 |
| planche 13-01 | 13·17-5 |
| planche 13-07 | 13·17-6 |
| planche 14-01 | 14·19-5, 14·19-7 |
| planche 15-01 | 25·03-2, 25·03-3, 15·20-7, 50·46-9, 57·53-5, 58·54-2 |
| planche 17-06 | 17·22-6 |
| planche 19-09 | 19·24-1, 19·24-4, 62·37-23, 22·41-4, 23·42-4 |
| planche 23-02 | 23·42-2 |
| planche 25-01 | 25·03-1 |
| planche 26-04 | 26·27-4 |
| planche 30-01 | 31·28-5 |
| planche 31-01 | 31·28-1 |
| planche 48-09 | 48·44-5 |
| planche 55-03 | 50·46-3, 53·49-4, 55·51-2, 55·51-3 |
| planche 56-02 | 56·52-2, 56·52-3 |
| planche 59-03 | 59·55-3 |
| planche 59-08 | 59·55-8, 71·66-5 |
| planche 60-01 | 60·56-1, 60·56-7 |
| planches 60-08a/b | 60·56-6 |
| planche 61-02 | 61·36-2 |
| planche 61-03 | 41·34-5, 61·36-3, 62·37-26, 63·38-8, 66·61-6, 105·86-6 |
| planches 61-03, 70-12 | 73·68-2 |
| planche 67-13 | 67·62-8 |
| planche 68-06 | 68·63-6 |
| planche 69-03 | 69·64-3 |
| planches 70-01, 70-01b | 70·65-1 |
| planche 70-09 | 70·65-9 |
| planche 71-02 | 71·66-2 |
| planches 73-01, 75-08 | 87·14-6 |
| planche 73-01 | 73·68-1 |
| planche 74-10 | 46·43-4, 66·61-5 |
| planches 75-04, 75-08 | 57·53-4 |
| planche 75-04 | 59·55-2, 75·70-4 |
| planche 76-03 | 75·70-7, 76·71-3 |
| planche 76-05 | 76·71-5 |
| planche 76-06 | 76·71-6 |
| planches 79-01a/b | 79·76-1 |
| planche 79-01a | 79·76-7 |
| planche 79-06 | 79·76-6 |
| planches 87-08a/b | 87·14-7 |
| planche 94-33a | 94·60-29 |
| planche 94-34, photo 30-72 | 33·30-73 |
| planche 94-34 | 94·60-30 |
| planche 96-05 | 96·75-5 |
| planche 97-01 | 97·78-1 |
| planche 97-07 | 97·78-7 |
| planche 98-02 | 55·51-4, 98·79-2, 98·79-3 |
| planche 98-07 | 98·79-7 |
| planche 99-05 | 99·80-5 |
| planche 99-07 | 99·80-7 |
| planche 99-10 | 99·80-8 |
| planche 99-11 | 99·80-9 |
| planche 100-02 | 100·81-2 |
| planche 100-04 | 36·32-4, 100·81-3, 100·81-4 |
| planche 101-01 | 101·82-1 |
| planche 101-03 | 101·82-3, 102·83-4 |
| planche 101-07 | 101·82-7 |
| planche 102-01 | 102·83-1 |
| planche 103-02 | 103·84-2 |
| planche 103-03 | 103·84-3 |
| planche 103-07 | 103·84-7 |
| planche 105-01 | 105·86-3 |
| planche 105-02 | 105·86-1 |
| planches 106-01a/b | 106·87-1 |
| planche 106-01a | 106·87-4 |
| planche 106-03 | 106·87-3 |
| planche 107-11 | 107·88-2 |
| planche 108-07 | 85·18-4, 108·89-7 |
| photo 30-2 (ch. 33) | 20·25-2 |
| photo 30-5 (ch. 33) | 92·58-8 |
| photo 30-58a (ch. 33) | 33·30-45, 92·58-20 |
| photos 30-59, 30-60 (ch. 33), 58-26 (ch. 92) | 20·25-1 |
| photo 35-5 (ch. 42) | 15·20-5, 58·54-1 |
| photos 41-1a à e (ch. 22) | 23·42-1 |
| photo 57-7 (ch. 91) | 93·59-18, 78·73-4 |
| photo 60-13 (ch. 94) | 94·60-12 |
| photos 70-5a à d (ch. 75) | 60·56-4 |
| photos d'arbres (ch. 33, 94) | 70·65-7, 71·66-8 |

### Inutiles (357)

| Pourquoi | Nombre | Lignes |
| --- | --- | --- |
| paperasse | 47 | 01·01-5, 02·02-4, 03·04-7, 30·05-4, 06·09-5, 07·10-4, 09·12-5, 14·19-3, 14·19-4, 16·21-1, 16·21-2, 16·21-3, 16·21-5, 17·22-5, 18·23-4, 19·24-8, 21·26-5, 26·27-1, 32·29-2, 33·30-67, 35·31-3, 35·31-4, 36·32-1, 41·34-2, 42·35-1, 42·35-7, 62·37-28, 63·38-5, 64·39-7, 65·40-8, 46·43-1, 46·43-9, 49·45-16, 52·48-7, 54·50-7, 93·59-6, 93·59-10, 93·59-14, 66·61-4, 68·63-2, 70·65-5, 71·66-7, 72·67-7, 77·72-5, 78·73-6, 97·78-5, 104·85-5 |
| chiffre, pas geste | 31 | 01·01-3, 30·05-5, 39·07-5, 07·10-3, 87·14-5, 18·23-5, 19·24-7, 61·36-4, 63·38-4, 64·39-4, 22·41-6, 46·43-3, 48·44-4, 49·45-13, 50·46-6, 52·48-2, 53·49-8, 54·50-5, 55·51-6, 56·52-5, 57·53-6, 58·54-8, 59·55-5, 59·55-6, 93·59-7, 68·63-5, 69·64-6, 71·66-1, 71·66-6, 74·69-8, 77·72-3 |
| donnée | 29 | 15·20-1, 19·24-2, 19·24-5, 20·25-3, 21·26-2, 21·26-3, 41·34-1, 42·35-3, 62·37-6, 62·37-10, 46·43-2, 46·43-5, 52·48-6, 92·58-28, 93·59-9, 66·61-1, 66·61-3, 67·62-3, 67·62-5, 68·63-3, 69·64-1, 73·68-3, 74·69-3, 76·71-2, 76·71-4, 77·72-7, 79·76-3, 80·77-2, 105·86-2 |
| article acheté | 25 | 01·01-6, 02·02-5, 03·04-4, 04·06-5, 82·16-3, 82·16-7, 21·26-4, 46·43-6, 53·49-7, 54·50-6, 56·52-6, 58·54-6, 67·62-1, 67·62-2, 68·63-4, 69·64-2, 70·65-8, 78·73-2, 96·75-8, 80·77-3, 98·79-4, 101·82-6, 102·83-6, 103·84-4, 108·89-3 |
| règle illustrée | 18 | 06·09-4, 18·23-3, 33·30-64, 22·41-8, 23·42-8, 49·45-6, 54·50-3, 54·50-4, 91·57-4, 92·58-29, 93·59-1, 67·62-7, 70·65-6, 75·70-6, 77·72-2, 77·72-6, 78·73-5, 78·73-7 |
| principe expliqué | 17 | 04·06-1, 39·07-8, 87·14-2, 83·15-1, 85·18-2, 14·19-2, 15·20-2, 15·20-6, 18·23-1, 48·44-7, 52·48-5, 66·61-7, 67·62-4, 68·63-1, 79·76-2, 106·87-2, 108·89-1 |
| schéma de règle | 15 | 02·02-1, 17·22-2, 35·31-2, 40·33-1, 41·34-3, 42·35-2, 74·69-1, 75·70-1, 76·71-1, 77·72-1, 78·73-1, 96·75-1, 98·79-1, 99·80-1, 107·88-1 |
| règle d'emplacement | 15 | 87·14-3, 83·15-8, 85·18-3, 17·22-1, 18·23-6, 58·54-4, 93·59-20, 93·59-21, 95·74-1, 101·82-4, 101·82-5, 102·83-3, 103·84-5, 104·85-2, 105·86-7 |
| déjà fait (débiter) | 15 | 62·37-1, 62·37-19, 62·37-24, 62·37-27, 62·37-29, 63·38-1, 63·38-6, 64·39-3, 65·40-3, 65·40-4, 65·40-5, 65·40-6, 50·46-7, 51·47-6, 53·49-6 |
| inventaire éparpillé | 13 | 02·02-3, 25·03-5, 06·09-1, 06·09-2, 08·11-2, 08·11-5, 82·16-1, 17·22-4, 18·23-7, 26·27-7, 35·31-6, 62·37-25, 48·44-2 |
| déjà connu | 11 | 87·14-4, 83·15-6, 16·21-6, 91·57-5, 93·59-8, 74·69-2, 74·69-6, 102·83-5, 102·83-8, 107·88-9, 107·88-10 |
| légal, coupé | 11 | 61·36-5, 61·36-8, 46·43-7, 46·43-8, 53·49-3, 55·51-7, 57·53-3, 59·55-4, 60·56-2, 60·56-3, 104·85-3 |
| rangement | 10 | 07·10-5, 15·20-8, 19·24-6, 32·29-1, 32·29-5, 33·30-69, 64·39-6, 93·59-2, 76·71-8, 104·85-1 |
| trop simple | 10 | 16·21-7, 20·25-4, 33·30-74, 33·30-75, 36·32-6, 64·39-5, 93·59-4, 94·60-16, 97·78-4, 100·81-8 |
| règle, pas geste | 7 | 01·01-2, 02·02-2, 03·04-2, 07·10-2, 08·11-3, 14·19-6, 102·83-7 |
| évidence parentale | 6 | 39·07-1, 39·07-2, 40·33-3, 40·33-5, 94·60-15, 100·81-7 |
| sécurité domestique | 6 | 39·07-4, 09·12-7, 83·15-7, 82·16-4, 82·16-5, 108·89-8 |
| décor | 5 | 03·04-1, 06·09-3, 36·32-2, 23·42-7, 93·59-5 |
| évidence | 5 | 09·12-3, 31·28-3, 32·29-3, 42·35-9, 95·74-7 |
| déjà fait (gibier) | 5 | 48·44-3, 49·45-7, 49·45-8, 49·45-11, 54·50-2 |
| courbe, donnée | 4 | 04·06-4, 18·23-2, 66·61-2, 80·77-5 |
| personne à appeler | 4 | 26·27-2, 35·31-1, 35·31-5, 36·32-3 |
| donnée d'appareil | 3 | 05·08-5, 32·29-4, 68·63-7 |
| dosage, une donnée | 2 | 30·05-3, 31·28-6 |
| coupé du livre | 2 | 39·07-3, 67·62-6 |
| geste trivial | 2 | 39·07-6, 49·45-12 |
| rangement, phrase suffit | 2 | 07·10-1, 08·11-4 |
| règle, une phrase | 2 | 08·11-6, 15·20-4 |
| déjà fait (bois) | 2 | 83·15-3, 102·83-2 |
| schéma de plan | 2 | 85·18-1, 14·19-1 |
| donnée mise en scène | 2 | 19·24-3, 21·26-1 |
| curiosité sans usage | 2 | 49·45-5, 49·45-10 |
| déjà fait (souder) | 2 | 103·84-1, 103·84-6 |
| donnée (bande de temps coupée) | 1 | 01·01-1 |
| décor, programme officiel | 1 | 02·02-6 |
| geste déjà connu | 1 | 03·04-5 |
| donnée, ligne de temps | 1 | 30·05-1 |
| image d'une règle | 1 | 30·05-6 |
| doublon de 03-6 | 1 | 39·07-7 |
| décor, inventaire | 1 | 05·08-1 |
| règle de rangement | 1 | 05·08-2 |
| rangement évident | 1 | 05·08-3 |
| pictogrammes sans geste | 1 | 08·11-1 |
| inventaire, décor | 1 | 09·12-1 |
| donnée, échelle coupée | 1 | 10·13-3 |
| paperasse, rangement | 1 | 10·13-6 |
| diagnostic en mots | 1 | 87·14-1 |
| mesure, paperasse | 1 | 83·15-4 |
| institution, évidence | 1 | 82·16-6 |
| consigne officielle | 1 | 85·18-5 |
| déjà connu (12 V) | 1 | 85·18-6 |
| déjà fait (12 V) | 1 | 85·18-7 |
| règle, distance | 1 | 15·20-3 |
| légal, décor | 1 | 16·21-4 |
| signes invisibles en photo | 1 | 17·22-3 |
| règle, distances | 1 | 31·28-2 |
| écarté par la fouille | 1 | 57·53-7 |
| sans objet | 1 | 74·69-9 |
