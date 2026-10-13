# Inventaire des corps dans les planches

Agent 4 de la bibliothèque de corps simples, 13 octobre 2026 (tour 2 : corrections de l’agent 5 reprises, G1, G6, G7, G19). Relevé fait sur les 365 sources `images/planches-src/*.js`
et leurs PNG rendus (`images/validees/`, `images/a-valider/`). Les poses sont dans `poses.json`, les longueurs dans
`proportions.json`, le contrôle géométrique dans le scratch `agent4/squelettes.png` (fil de fer, `squelettes.py`).

## Source des proportions

- **Adultes** : Drillis R., Contini R. (1966), *Body Segment Parameters*, rapport 1166-03, New York University, en
  fractions de la taille H, telles que reproduites dans Winter D.A. (2009), *Biomechanics and Motor Control of Human*
  *Movement*, 4e éd., fig. 4.1. Homme 1750 mm, femme 1630 mm (le modèle n’est pas sexué : la femme est l’homme à
  1630 ; l’écart épaules-bassin reste au dessin des contours, `[À VÉRIFIER]`).
- **Enfants 6 ans (1150) et 4 ans (1030)** : les mêmes fractions, corrigées par (1) le canon tête/taille de Domljan,
  Iliev et Jurčević Lulić (2024), *Applied Sciences* 14:7185 (5,59 à 5,72 têtes à 2 ans, 7,50 à 7,60 à 15 ans,
  interpolé : 5,95 têtes à 4 ans, 6,24 à 6 ans) ; (2) le rapport segment supérieur/inférieur de Turan et coll. (2005),
  *Acta Paediatrica* (1,108 à 3 ans → 0,984 à 10 ans, 0,922 au plus bas) pour la longueur des jambes ; (3) l’écart
  envergure − taille d’Engelbach (−3,0 cm à 4 ans, ~0 vers 8-9 ans) pour les bras ; (4) la largeur d’épaules que
  Drillis-Contini surestime de ~16 % chez l’enfant (Wisner et coll., ISBS) ; (5) le pied de 6 ans (NCHS série 11 :
  90 % des garçons entre 16,2 et 19,9 cm).
- **Limite** : le réseau de la session ne joignait ni Winter, ni UMTRI (Snyder 1975/1977), ni PMC : les fractions
  Drillis-Contini sont relevées de la figure de Winter (0,186/0,146/0,108 et 0,870 recoupés par recherche), les valeurs
  enfant viennent des résumés trouvés en recherche, aucune page n’a pu être enregistrée. La largeur et la profondeur de
  la tête adulte (155/195, 148/187 mm) et le bassin de l’enfant portent `[À VÉRIFIER]` dans le fichier. Ces chiffres
  servent au dessin, rien ne s’imprime.

## Vocabulaire

- **vue** : `profil` (le personnage regarde vers +x ; `cote: gauche` = miroir), `face`, `dos`, `dessus`. Un couché sur le
  dos *vu d’en haut* est la vue de face couchée par la planche (`couche-face`). « bout » = vu par la tête, dans l’axe
  du corps : pas une vue de la bibliothèque.
- **mains** (celles du moteur) : `ouverte` · `plat` (à plat, appui) · `prise` (autour d’un manche ; diamètre en mm dans
  `prise` ; un poing fermé = une prise de ~10 mm) · `porte` (paume en l’air sous la charge) · `pointe` · `pince`. Le côté
  vu de la prise (dos / paume / profil) reste à la planche.
- **appui** : le point posé au sol (`pieds`, `genouP`, `genoux`, `fesses`, `dos`, `ventre`) ; `avantbras` : aucun sol, le
  corps pend dans l’eau, les avant-bras sur la glace (15-01). Assis sur un siège, l’appui est aux pieds et `siege` donne
  la hauteur du siège.

## Les planches (55 planches à corps entier ou buste, 88 vues)

| Planche | Vue de la planche | Vue du corps | Âge | Pose (`poses.json`) | Mains | Appui | Objet, remarque |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 03-09 L’abri dans la pièce : la tente de table et le lit en couches | En coupe, en travers de l’abri | bout | 2 adultes + 2 enfants | — (hors) | — | dos | quatre couchés vus par la tête, sous une même couverture |
| 03-09 L’abri dans la pièce : la tente de table et le lit en couches | Vu de dessus, la table en pointillé | face (couché) | 2 adultes + enfant 6 + enfant 4 | `couche-face` | ouvertes, le long du corps | dos | les enfants au milieu |
| 03-09 L’abri dans la pièce : la tente de table et le lit en couches | Moins chaud / Plus chaud | profil | adulte | `couche-dos` | ouvertes | dos | sous la couverture, genoux à peine fléchis |
| 04-01a La pièce d’abri chargée | En coupe, le chalet sans sous-sol | profil | adulte | `couche-dos` | ouvertes | dos | sous la table chargée (petit) |
| 04-01a La pièce d’abri chargée | Ou les portes appuyées au mur | profil | adulte | `assis-sol` | sur les cuisses | fesses | dos au mur, jambes allongées |
| 04-01b La pompe à carton | En coupe | profil (cote gauche) | adulte | `assis-tire-corde` | P prise (corde ~4 mm, vue de dos) · L ouverte | pieds (siège bas) | tire la corde de la pompe vers la poitrine |
| 04-40 Le sas au retour : ôter la couche du dehors | Le costume de sortie | face | adulte | `debout-face` | ouvertes | pieds | poncho, lunettes, bottes : habillé (hors V1) |
| 04-40 Le sas au retour : ôter la couche du dehors | Dans le sas : ôter sans secouer | profil | adulte | `debout-bras-tendus` | L pince (profil) · P prise (dos, haut du sac) | pieds | le sac de costume tenu à bout de bras |
| 102-02 La poutre à écharner et l’angle du couteau | Le poste, de côté | profil | adulte | `penche-pousse` | deux prises (poignées du couteau ~30 mm) | pieds | ventre sur le bout de la poutre, poussée vers le bas |
| 102-40 Assouplir la peau : cadre, arête, câble, à deux | Le cadre, de côté | profil | adulte | `fente-pousse` | deux prises (bâton ~40 mm) | pieds | pousse le bâton contre la peau lacée |
| 102-40 Assouplir la peau : cadre, arête, câble, à deux | Le câble, vu du bout | profil | adulte | `cable-tire` | deux prises (la peau) | pieds | la peau à cheval sur le câble à hauteur de tête |
| 102-40 Assouplir la peau : cadre, arête, câble, à deux | L’arête d’une planche | profil | adulte | `tire-arriere` | deux prises (la peau) | pieds | racle la peau sur l’arête |
| 102-40 Assouplir la peau : cadre, arête, câble, à deux | À deux | profil ×2 (une en cote gauche) | adulte | `tire-arriere` | deux prises (la peau) | pieds | deux personnes face à face, la peau entre elles |
| 103-40 Défibrer le tendon, débourrer la peau, sécher la babiche | Le poste de débourrage | profil | adulte | `penche-pousse (tronc 44)` | deux prises (racloir ~25 mm, profil) | pieds | ventre sur le bout de la bille |
| 109-08 Le vindas, treuil de bois à deux barres | La manœuvre, vue du bout | profil | adulte | `vindas` | deux prises (barre ~50 mm) | pieds | pousse la barre vers le bas |
| 109-40 Lever et caler au fur et à mesure | Sans vérin : au levier et aux cales | profil (cote gauche) | adulte | `levier` | deux prises (perche ~70 mm) | pieds | pèse sur le bout du levier |
| 12-03 Le shaputuan | En travers | face | adulte | `debout-face` | ouvertes | pieds | pour l’échelle (dessiné à la main) |
| 12-04 Le cône de deux bâches | En coupe, dans l’axe du vent | profil | adulte | `couche-dos` | — (dans le sac) | dos | dans un sac de couchage (petit) |
| 12-06a Le quinzhee | Creusé, en coupe | profil | adulte | `couche-dos` | — (dans le sac) | dos | sur le banc, dans un sac |
| 12-06b La tranchée bâchée | En travers | bout | adulte + enfant | — (hors) | — | dos | deux couchés vus par la tête |
| 12-06b La tranchée bâchée | En long | profil (cote gauche) | adulte | `couche-dos` | — (dans le sac) | dos | dans un sac, genoux à peine pliés |
| 13-40 Le ferrocérium, du tas de bois à la flamme | Refermer et souffler | profil (buste) | adulte | `buste-main-bouche` | P boule (nid de fibre ~60 mm, serré lâche) | — (buste) | souffle dans le nid tenu devant la bouche |
| 15-01 Sortir d’un trou dans la glace | Les pics, faits maison | face (buste) | adulte | `debout-face` | ouvertes | — (buste) | le cordon des pics par-dessus la tête |
| 15-01 Sortir d’un trou dans la glace | Se retourner | profil (cote gauche) | adulte | `eau-avantbras` | deux prises (pics ~30 mm) | avantbras (aucun sol : dans l’eau, les avant-bras sur la glace) | avant-bras à plat sur la glace |
| 15-01 Sortir d’un trou dans la glace | Se hisser | profil (cote gauche) | adulte | `ventre-hisse` | deux prises (pics plantés) | ventre | à plat ventre sur le bord, jambes dans l’eau |
| 15-01 Sortir d’un trou dans la glace | Rouler, vu de dessus | face (couché) | adulte | `couche-face` | ouvertes | dos | roule sur la glace |
| 16-08 Le traîneau-civière de perches | Le cadre, vu de dessus | face (couché) | adulte | `couche-face` | — | dos | le blessé en pointillé |
| 16-08 Le traîneau-civière de perches | En descente (devant) | profil (cote gauche) | adulte | `retient-derriere` | deux prises (brancards ~40 mm) derrière soi | pieds | marche en retenant |
| 16-08 Le traîneau-civière de perches | En descente (derrière) | profil (cote gauche) | adulte | `tire-arriere` | deux prises (corde de frein) | pieds | retient à la corde, la pente |
| 16-08 Le traîneau-civière de perches | En descente (le blessé) | profil | adulte | `couche-dos` | — | dos | enveloppé, sanglé sur le traîneau en pente |
| 24-01 Lever près, lever sans tourner | Bon : contre le ventre | profil | adulte | `debout-charge-ventre` | deux en porte sous la caisse | pieds | caisse contre le ventre, mains à 25 cm des chevilles |
| 24-01 Lever près, lever sans tourner | Raté : à bout de bras | profil | adulte | `debout-bras-tendus` | deux en porte sous la caisse | pieds | mains à 50 cm des chevilles |
| 24-01 Lever près, lever sans tourner | Bon : les pieds tournent / Raté : le tronc tourne | dessus | adulte | `debout-dessus` | devant (la caisse) | pieds | les bottes et le contour du corps vus d’en haut |
| 24-02 Fendre sur le billot | À l’impact, et vu de dessus | profil | adulte | `fendre` | P prise dos · L prise paume (manche ~32 mm) | pieds | le manche à l’horizontale à l’impact |
| 24-03 Le chevalet de sciage | Du bout, à la même échelle | profil | adulte | `scier-debout` | P prise (poignée de sciotte ~38 mm) · L ouverte | pieds | la bille sur le chevalet, à hauteur de hanche |
| 24-04 Le porte-bûches | Porté contre la jambe | face | adulte | `debout-face-charge-main` | P prise (deux poignées ~25 mm) · L ouverte | pieds | la charge pend contre la jambe |
| 24-05 Porter à la courroie de front | Épaules haussées / relâchées | profil (buste ×2) | adulte | `courroie-front` | non dessinées | — (buste) | courroie au front, charge au creux des reins |
| 24-06a La béquille de fourche, en place | De côté | profil | adulte | `debout-bequille` | P prise (traverse ~30 mm) | pieds (le pied sain) | la fourche sous l’aisselle |
| 24-06a La béquille de fourche, en place | De face, sous l’aisselle | face (buste) | adulte | `debout-face` | — | — (buste) | buste calqué (clavicules) : à refaire sans |
| 24-13 La planche d’équilibre sur demi-bûche | D’abord au sol / Puis sur une couverture / Puis sur la planche | profil ×3 | adulte | `un-pied-mur` | P à plat au mur · L ouverte | pieds (un seul) | debout sur le pied blessé, sur la planche qui bascule |
| 24-16 La genouillère de peau nouée | Un genou au sol | profil | adulte | `genou` | L posée sur le genou levé | genouP | la genouillère sous le genou proche |
| 25-01 L’enveloppe croisée, avec deux couvertures et une bâche | Étendre, coucher au milieu | face (couché) | adulte | `couche-face` | ouvertes | dos | habillé, tuque (dessiné à la main) |
| 26-08 L’attelle d’écorce moulée, et l’écharpe au pan de chemise | L’écharpe | face (buste) | adulte | `echarpe-face` | P dans l’écharpe · L ouverte | — (buste) | en chemise (vêtements hors V1) |
| 26-09a Déplacer un blessé : la bâche sur deux perches, la prise sous les aisselles | Vu de dessus | face (couché) | adulte | `couche-face` | ouvertes | dos | sur la bâche entre deux perches |
| 26-09a Déplacer un blessé : la bâche sur deux perches, la prise sous les aisselles | Pour trois mètres, sans rien | profil ×2 emboîtés | adulte | — (hors) | les bras passés sous les aisselles du blessé | pieds + fesses | prise de Rautek : deux corps qui se tiennent |
| 26-09b Déplacer un blessé : la porte dégondée, le blessé sanglé et calé | Vu de dessus | face (couché) | adulte | `couche-face` | ouvertes | dos | sanglé sur la porte |
| 26-09b Déplacer un blessé : la porte dégondée, le blessé sanglé et calé | Vu par la tête / Roulé d’un bloc sur le côté | bout | adulte | — (hors) | — | dos / côté | tête et épaules vues par le bout |
| 26-40 Appuyer sur la plaie, puis la laver | Appuyer (vignette) | profil ×2 | adulte | `genoux-appuie + couche-dos` | deux à plat, l’une sur l’autre | genoux / dos | à genoux à côté du blessé couché |
| 26-40 Appuyer sur la plaie, puis la laver | Plaie profonde (vignette) | profil | adulte | `couche-dos` | — | dos | petit |
| 27-05 La brosse de branche | Casser, sentir / Mâcher un bout | profil (buste ×2) | adulte | `buste-main-bouche` | P prise (rameau ~7 mm, dos) | — (buste) | le rameau sous le nez, puis entre les dents |
| 28-02 Rincer le nez d’un enfant de 4 ans | Il se relève et crache | profil | enfant 4 ans | `assis-penche-bol` | avant-bras à plat sur la table | pieds (tabouret) | la tête au-dessus du bol |
| 28-04 La compresse chaude qui garde sa chaleur | Couché, la compresse sur la cuisse | profil | adulte | `couche-dos` | ouvertes | dos |  |
| 29-04 Faire durcir l’utérus après la naissance | Utérus mou / Ça saigne encore | profil (recadré) | femme | `couche-genoux` | gros plans de mains calquées | dos | le bassin et les cuisses seulement |
| 29-04 Faire durcir l’utérus après la naissance | Toujours rien : comprimer l’aorte | profil ×2 | adulte + femme | `genoux-poing + couche-genoux` | P poing (prise ~10 mm, sur le ventre) · L à plat (l’aine) | genoux / dos | aidant en rendu plein |
| 29-08 Les épaules qui bloquent : les deux premiers essais | 1. À quatre pattes | profil | femme (enceinte) | `quatre-pattes` | deux à plat au sol | genoux (+ mains) | la tête du bébé qui sort |
| 29-08 Les épaules qui bloquent : les deux premiers essais | 2. Sur le dos, au bord du lit, les genoux vers les épaules | profil | femme (enceinte) | `couche-replie` | deux prises sous les genoux | dos | les mains de l’aidant au-dessus du pubis : gros plan à part |
| 34-01 Ouvrir un abcès mûr | Où l’on n’ouvre pas | face + dos | adulte | `debout-face-bras-ecartes + debout-dos-bras-ecartes` | ouvertes, paumes devant | pieds | carte du corps, zones grisées |
| 37-04 Trier et éprouver les pierres du sauna | L’épreuve au feu, dehors | profil | adulte | `debout-perche-devant` | deux prises (perche ~30 mm) | pieds | la louche au bout de la perche |
| 37-07 Trois étirements du soir, muscles chauds | L’arrière de la cuisse | profil | adulte | `ischios` | deux prises (vers la cheville) | pieds (le banc sous la fesse) | une jambe allongée sur le banc |
| 37-07 Trois étirements du soir, muscles chauds | L’avant de la cuisse | profil | adulte | `quadriceps` | P à plat au mur · L prise (cheville ~70 mm) | pieds (un seul) | le talon vers la fesse |
| 37-07 Trois étirements du soir, muscles chauds | Le bas du dos | profil | adulte | `couche-genoux-poitrine` | deux prises (tibias ~90 mm) | dos | les deux genoux sur la poitrine |
| 38-01 Les trois gestes de l’enfant si l’adulte ne se relève pas | On sort sans s’habiller | profil ×2 | enfant 6 + enfant 4 | `marche-brassee` | bras en berceau | pieds | le sac de couchage dans les bras |
| 38-01 Les trois gestes de l’enfant si l’adulte ne se relève pas | Dans l’abri, on attend | profil ×2 | enfant 6 + enfant 4 | `assis-sifflet` | P prise (sifflet ~10 mm) à la bouche | pieds (caisse) | habillés (habit de neige) |
| 38-01 Les trois gestes de l’enfant si l’adulte ne se relève pas | 2 · Réveiller | profil ×2 | enfant 6 + adulte | `debout-penche-lit + couche-dos` | deux à plat sur l’épaule de l’adulte | pieds / dos | l’adulte au lit, sous la couverture |
| 38-01 Les trois gestes de l’enfant si l’adulte ne se relève pas | Dedans, ensemble | profil ×2 | enfant 6 + enfant 4 | `assis-sol` | dans les sacs | fesses | l’un contre l’autre sur le lit |
| 47-01 Le bâton de jet et ses deux lancers | Sa longueur | profil | adulte | `debout` | ouvertes | pieds | le bâton mesuré du bout des doigts à l’épaule |
| 47-01 Le bâton de jet et ses deux lancers | De côté, sur ce qui est au sol | profil | adulte | `lance-bas` | P prise (bâton ~30 mm, profil) | pieds | fente très basse |
| 47-01 Le bâton de jet et ses deux lancers | Par-dessus l’épaule, sur ce qui est perché | profil | adulte | `lance-haut` | P prise (bâton, dos) · L pointe vers le tétras | pieds |  |
| 47-02 L’affût et les appelants | De côté, le vent dans le dos | face (buste) | adulte | `debout-face` | — | — (dans le canot) | la tête et les épaules dépassent du canot (petit) |
| 60-40 Lever le verveux à deux, du côté sous le vent | Vu de l’arrière | dos ×2 | adulte | `genoux-dos-penche` | deux prises (cerceau ~20 mm) | genoux | deux à genoux au fond du bateau, l’un devant l’autre ; jambes cachées par le bordé (masquer) |
| 64-08 Sortir le quartier avant du bois | Porté, de profil | profil | adulte | `debout` | ouvertes | pieds | le cadre de portage au dos (dessiné à la main) |
| 74-11 La tente à boucane | En coupe | face | adulte | `debout-face` | ouvertes | pieds | pour l’échelle, la claie à hauteur de poitrine (dessiné à la main) |
| 84-02 La perche à chapeau | Du bout du versant, côté pignon | profil | adulte | `perche-levee` | deux prises (perche ~30 mm) | pieds | sur le banc de neige, la perche levée à 45° |
| 84-03 L’essai de tirage à la torche | Un adulte au poêle, l’autre dehors au chapeau | profil ×2 (cote gauche) | adulte | `genou-torche + debout (tete -25)` | P prise (torche ~25 mm) | genouP / pieds | petits |
| 84-04 La pièce de la première nuit | En coupe, face au mur du poêle | profil ×2 | adulte + enfant 4 | `debout + couche-dos` | ouvertes | pieds / dos | l’enfant dans un sac sur les caisses |
| 86-05 Mesurer un ruisseau | La hauteur de chute, au boyau : un tronçon | profil (cote gauche) | adulte | `bras-leve` | P prise (boyau ~20 mm) | pieds | le boyau levé au-dessus de la tête |
| 88-05 La pierre dormante, la molette et le tamis | Le va-et-vient, à genoux au bout de la pierre | profil | adulte | `genoux-molette` | deux à plat sur la molette | genoux | grand, corps entier |
| 88-05 La pierre dormante, la molette et le tamis | Vu de dessus : les deux mains sur la molette | dessus | adulte | — (gros plan de mains) | deux à plat | — | avant-bras et mains de dessus, épaules en pointillé |
| 89-05b Tirer les planches, cintrer la tête | Sur le genou, lentement | profil | adulte | `assis-penche` | P prise (pince ~20 mm) · L à plat sur la planche | pieds (bloc) | la planche cintrée sur le genou |
| 89-05b Tirer les planches, cintrer la tête | La tête, à genoux dessus | profil (cote gauche) | adulte | `genou-tire` | deux prises (bouts de planche ~26 mm) | genouP | tire les bouts vers le haut |
| 90-03 Le portage | Seul, la traverse du centre sur la nuque | profil | adulte | `portage-canot` | deux prises (plats-bords ~33 mm) derrière soi | pieds | marche, canot renversé sur les épaules ; ch. 90 étape 23 : les mains lancées vers l’arrière tiennent le bout qui cherche le sol (la planche actuelle les met devant : à redessiner) |
| 90-03 Le portage | Épaules haussées / relâchées | face (buste ×2) | adulte | `debout-face` | — | — (buste) | la tête dans le canot, courroie de front |
| 98-01b Le fléau : battre sur la toile | De côté, dans l’axe des rangées | profil | adulte | `fleau` | deux prises (manche ~35 mm) | pieds | le battoir tombe à plat |
| 98-05 Semer le grain à la volée | Le geste | profil | adulte | `semer` | P ouverte (lance le grain) · L : la chaudière à l’avant-bras | pieds |  |
| 98-05 Semer le grain à la volée | Première moitié / Seconde moitié | dessus | adulte | `debout-dessus` | P balaie | pieds | tout petit, en marche |
| 98-08 Vanner et tamiser le grain | Vanner au vent | profil | adulte | `vanner` | P prise (anse ~10 mm) · L à plat sous le fond | pieds | le grain versé de la hauteur de l’épaule |
| 99-04 La sonde du fenil | Enfoncer au cœur du tas | profil | adulte | `sonde` | deux prises (tige ~14 mm) | pieds | sur une planche au sommet du tas (petit) |
| 99-05 Faucher à la faux, et aiguiser à la pierre | Réglée sur soi | profil | adulte | `faucher` | deux prises (poignées ~30 mm) | pieds | la lame à plat au sol |

PNG relevés : `images/validees/planche-03-09-abri-dans-piece-tente.png`, `images/validees/planche-04-01a-piece-abri-chargee.png`, `images/validees/planche-04-01b-pompe-carton.png`, `images/a-valider/planche-04-40-sas-retour-oter-couche.png`, `images/a-valider/planche-12-03-shaputuan.png`, `images/a-valider/planche-12-04-cone-deux-baches.png`, `images/a-valider/planche-12-06a-quinzhee.png`, `images/a-valider/planche-12-06b-tranchee-bachee.png`, `images/a-valider/planche-13-40-ferrocerium-tas-bois-flamme.png`, `images/validees/planche-15-01-sortir-trou-dans-glace.png`, `images/validees/planche-16-08-traineau-civiere-perches.png`, `images/a-valider/planche-24-01-lever-pres-lever-sans.png`, `images/a-valider/planche-24-02-fendre-billot.png`, `images/a-valider/planche-24-03-chevalet-sciage.png`, `images/a-valider/planche-24-04-porte-buches.png`, `images/a-valider/planche-24-05-porter-courroie-front.png`, `images/a-valider/planche-24-06a-bequille-fourche-place.png`, `images/a-valider/planche-24-13-planche-equilibre-demi-buche.png`, `images/a-valider/planche-24-16-genouillere-peau-nouee.png`, `images/validees/planche-25-01-enveloppe-croisee-avec-deux.png`, `images/validees/planche-26-08-attelle-ecorce-moulee-echarpe.png`, `images/validees/planche-26-09a-deplacer-blesse-bache-deux.png`, `images/validees/planche-26-09b-deplacer-blesse-porte-degondee.png`, `images/a-valider/planche-26-40-appuyer-plaie-puis-laver.png`, `images/a-valider/planche-27-05-brosse-branche.png`, `images/a-valider/planche-28-02-rincer-nez-enfant-4.png`, `images/a-valider/planche-28-04-compresse-chaude-qui-garde.png`, `images/a-valider/planche-29-04-faire-durcir-uterus-apres.png`, `images/a-valider/planche-29-08-epaules-qui-bloquent-deux.png`, `images/a-valider/planche-34-01-ouvrir-abces-mur.png`, `images/a-valider/planche-37-04-trier-eprouver-pierres-sauna.png`, `images/a-valider/planche-37-07-trois-etirements-soir-muscles.png`, `images/a-valider/planche-38-01-trois-gestes-enfant-si.png`, `images/a-valider/planche-47-01-baton-jet-ses-deux.png`, `images/a-valider/planche-47-02-affut-appelants.png`, `images/a-valider/planche-60-40-lever-verveux-deux-cote.png`, `images/a-valider/planche-64-08-sortir-quartier-avant-bois.png`, `images/validees/planche-74-11-tente-boucane.png`, `images/a-valider/planche-84-02-perche-chapeau.png`, `images/a-valider/planche-84-03-essai-tirage-torche.png`, `images/a-valider/planche-84-04-piece-premiere-nuit.png`, `images/a-valider/planche-86-05-mesurer-ruisseau.png`, `images/a-valider/planche-88-05-pierre-dormante-molette-tamis.png`, `images/a-valider/planche-89-05b-tirer-planches-cintrer-tete.png`, `images/a-valider/planche-90-03-portage.png`, `images/a-valider/planche-98-01b-fleau-battre-toile.png`, `images/a-valider/planche-98-05-semer-grain-volee.png`, `images/a-valider/planche-98-08-vanner-tamiser-grain.png`, `images/a-valider/planche-99-04-sonde-fenil.png`, `images/a-valider/planche-99-05-faucher-faux-aiguiser-pierre.png`, `images/validees/planche-102-02-poutre-echarner-angle-couteau.png`, `images/a-valider/planche-102-40-assouplir-peau-cadre-arete.png`, `images/a-valider/planche-103-40-defibrer-tendon-debourrer-peau.png`, `images/validees/planche-109-08-vindas-treuil-bois-deux.png`, `images/a-valider/planche-109-40-lever-caler-fur-mesure.png`.

**Têtes seules, gros plans (hors corps, `formes.tete()` / calques)** : 27-03 « Mordre un linge plié » (tête de profil, gros plan) ; 28-02 « Couché sur le dos, la tête tournée, vu d’en haut » (tête d’enfant de dessus, gros plan (×2)) ; 28-06 « Laver un œil » (visage de face, gros plan) ; 29-05 « Ventiler un nouveau-né » (tête de nouveau-né de profil et de face) ; 29-06 « Mettre au sein » (tête et épaule de bébé contre le sein, main de la mère) ; 34-01 « Le visage » (tête de face (zones)).

**Pas de corps** : les ~300 autres planches montrent des mains seules (calquées, à garder : 13-01, 13-09, 22-40, 23-02,
28-05, 34-04, 38-04, 44-01, 47-05, 50-40, 69-40, 78-40, 96-07, 98-09, 99-11…), des membres isolés (24-07 à 24-12,
24-14, 24-15, 26-04, 26-08 « Mouler », 30-01, 89-04, 89-06…), des animaux, des objets et des montages.

## Les poses nécessaires, par fréquence

Une occurrence = une vue de planche (une vignette « ×3 » compte une fois). Les poses à 0 sont des bases (une pose
neutre dont les variantes dérivent) ou des variantes relevées dans une planche qu’on ne dessine pas encore en corps.

| Pose | Vue | Âge par défaut | Occurrences | Planches |
| --- | --- | --- | --- | --- |
| `couche-dos` | profil | adulte | 11 | 03-09, 04-01a, 12-04, 12-06a, 12-06b, 16-08, 26-40, 28-04, 38-01, 84-04 |
| `debout-face` | face | adulte | 7 | 04-40, 12-03, 15-01, 24-06a, 47-02, 74-11, 90-03 |
| `couche-face` | face | adulte | 6 | 03-09, 15-01, 16-08, 25-01, 26-09a, 26-09b |
| `debout` | profil | adulte | 4 | 47-01, 64-08, 84-03, 84-04 |
| `tire-arriere` | profil | adulte | 3 | 102-40, 16-08 |
| `assis-sol` | profil | adulte | 2 | 04-01a, 38-01 |
| `buste-main-bouche` | profil | adulte | 2 | 13-40, 27-05 |
| `couche-genoux` | profil | femme | 2 | 29-04 |
| `debout-bras-tendus` | profil | adulte | 2 | 04-40, 24-01 |
| `debout-dessus` | dessus | adulte | 2 | 24-01, 98-05 |
| `penche-pousse` | profil | adulte | 2 | 102-02, 103-40 |
| `assis-penche` | profil | adulte | 1 | 89-05b |
| `assis-penche-bol` | profil | enfant4 | 1 | 28-02 |
| `assis-sifflet` | profil | enfant6 | 1 | 38-01 |
| `assis-tire-corde` | profil | adulte | 1 | 04-01b |
| `bras-leve` | profil | adulte | 1 | 86-05 |
| `cable-tire` | profil | adulte | 1 | 102-40 |
| `couche-genoux-poitrine` | profil | adulte | 1 | 37-07 |
| `couche-replie` | profil | femme | 1 | 29-08 |
| `courroie-front` | profil | adulte | 1 | 24-05 |
| `debout-bequille` | profil | adulte | 1 | 24-06a |
| `debout-charge-ventre` | profil | adulte | 1 | 24-01 |
| `debout-dos-bras-ecartes` | dos | adulte | 1 | 34-01 |
| `debout-face-bras-ecartes` | face | adulte | 1 | 34-01 |
| `debout-face-charge-main` | face | adulte | 1 | 24-04 |
| `debout-penche-lit` | profil | enfant6 | 1 | 38-01 |
| `debout-perche-devant` | profil | adulte | 1 | 37-04 |
| `eau-avantbras` | profil | adulte | 1 | 15-01 |
| `echarpe-face` | face | adulte | 1 | 26-08 |
| `faucher` | profil | adulte | 1 | 99-05 |
| `fendre` | profil | adulte | 1 | 24-02 |
| `fente-pousse` | profil | adulte | 1 | 102-40 |
| `fleau` | profil | adulte | 1 | 98-01b |
| `genou` | profil | adulte | 1 | 24-16 |
| `genou-tire` | profil | adulte | 1 | 89-05b |
| `genou-torche` | profil | adulte | 1 | 84-03 |
| `genoux-appuie` | profil | adulte | 1 | 26-40 |
| `genoux-dos-penche` | dos | adulte | 1 | 60-40 |
| `genoux-molette` | profil | adulte | 1 | 88-05 |
| `genoux-poing` | profil | adulte | 1 | 29-04 |
| `ischios` | profil | adulte | 1 | 37-07 |
| `lance-bas` | profil | adulte | 1 | 47-01 |
| `lance-haut` | profil | adulte | 1 | 47-01 |
| `levier` | profil | adulte | 1 | 109-40 |
| `marche-brassee` | profil | enfant6 | 1 | 38-01 |
| `perche-levee` | profil | adulte | 1 | 84-02 |
| `portage-canot` | profil | adulte | 1 | 90-03 |
| `quadriceps` | profil | adulte | 1 | 37-07 |
| `quatre-pattes` | profil | femme | 1 | 29-08 |
| `retient-derriere` | profil | adulte | 1 | 16-08 |
| `scier-debout` | profil | adulte | 1 | 24-03 |
| `semer` | profil | adulte | 1 | 98-05 |
| `sonde` | profil | adulte | 1 | 99-04 |
| `un-pied-mur` | profil | adulte | 1 | 24-13 |
| `vanner` | profil | adulte | 1 | 98-08 |
| `ventre-hisse` | profil | adulte | 1 | 15-01 |
| `vindas` | profil | adulte | 1 | 109-08 |
| `assis` | profil | adulte | 0 | — |
| `genoux` | profil | adulte | 0 | — |
| `marche` | profil | adulte | 0 | — |

60 poses au total : 52 de profil, 5 de face, 2 de dos, 1 de dessus.

## Hors de portée d’une bibliothèque de corps simples

- **Deux corps qui se tiennent** : 26-09a « Pour trois mètres, sans rien » (prise de Rautek : les bras du porteur
  passés sous les aisselles du blessé, la tête contre son ventre, les jambes emmêlées). Deux poses côte à côte ne la
  font pas : il faut un dessin d’ensemble. Le contact par la main seule (38-01 « Réveiller », 29-04 le poing sur le
  ventre, 102-40 « À deux » par la peau) reste faisable : deux corps séparés, la main posée.
- **L’accouchement** : 29-08 et 29-04 — la tête du bébé qui sort, les mains de l’aidant au pubis, au vagin. Le corps
  de la mère est une pose (`quatre-pattes`, `couche-replie`, `couche-genoux`, option enceinte du moteur) ; le reste
  est un gros plan à part.
- **Les bébés** (29-05, 29-06) : pas d’âge nourrisson dans `proportions.json` ; ce sont des gros plans de tête.
- **Les vues « par le bout »** des couchés (03-09 « En travers », 12-06b « En travers », 26-09b « Vu par la tête », « Roulé
  sur le côté ») et la coupe transversale du corps dans l’enveloppe (25-01 « En coupe ») : une tête ronde sur la bosse
  des épaules, à dessiner comme une forme simple dans la planche, pas une vue de la bibliothèque.
- **Les corps dans un sac ou sous une couverture** (03-09, 12-04, 12-06a/b, 16-08, 84-04, 38-01) : la pose sert de
  gabarit, mais le contour visible est celui du sac ou de la couverture, dessiné par la planche.
- **Les vêtements** (04-40 le poncho, 26-08 la chemise de l’écharpe, 38-01 les habits de neige, 25-01 la tuque) : hors
  V1 par le brief.
- **Les épaules haussées** (24-05, 90-03) : pas un angle de segment ; le moteur le fait par `angles.hausse` (mm).
- **À genoux vu de dos ou de face** (60-40) : le tibia vient vers l’œil, aucun angle dans le plan ne le raccourcit ; en
  60-40 les jambes sont cachées par le bordé (`masquer`), ailleurs il faudrait un raccourci dans `vues.js`.
- **Le corps sous l’eau** (15-01) : la pose existe (`eau-avantbras`, appui `avantbras` ; `ventre-hisse`), mais la coupe
  par la ligne d’eau et le recalage par les coudes (le moteur pose les pieds en y) sont à la planche.
- **Les gros plans de membres** (jambe attelée 24-08, cheville 24-11, poignet 24-12, cuisses 26-04, bras 26-08, pied
  sur la pédale 30-01) : ce ne sont pas des corps entiers ; une jambe ou un bras isolé de la bibliothèque pourrait les
  servir plus tard, mais rien dans cet inventaire ne le demande.
