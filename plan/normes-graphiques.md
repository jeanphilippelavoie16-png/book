# Normes graphiques — Le Manuel du Nord

Document de référence du **rôle 6, metteur en pages**. Il complète `roles.md`, qui nomme les
éléments, et `gabarit-chapitre.md`, qui fixe l'ordre des sections. Il ne les contredit nulle part.

**Statut :** applicable. Trois valeurs seulement restent ouvertes, toutes du côté de Blurb, et
elles sont marquées `[À VÉRIFIER]` avec la page exacte à enregistrer dans `/sources`. Tout le
reste se compose sans poser de question.

**Méthode.** Rien ici n'est repris d'un manuel de maquette. Chaque règle a été écrite contre ce
que les 89 chapitres contiennent réellement, mesuré fichier par fichier le 21 septembre 2026.
Les mesures sont données avec les règles, parce qu'une norme qu'on ne peut pas justifier se fait
contourner à la première difficulté.

---

## 0. Ce que ce document tranche

| Question | Réponse | Où |
| --- | --- | --- |
| Casse du titre de la section 8 | **`8. Danger`**, en bas de casse comme les neuf autres. La capitale est dans l'encadré, pas dans la table des matières | §3.1 |
| Les tableaux tiennent-ils dans une colonne ? | **Non. Tous les tableaux se composent en pleine justification**, sur les deux colonnes | §4.1 |
| L'encadré DANGER tient-il sur une page ? | **Non.** Médiane mesurée : 831 mots, soit 1,2 page. Il se coupe, et la coupe a sa règle | §3.4 |
| Le bandeau de relecture en tête de 28 chapitres | **Ne s'imprime pas.** C'est une note de production | §3.6 |
| Les renvois portent-ils un numéro de page ? | **Non.** Ils portent le numéro de chapitre, qui ne bouge pas | §6.4 |
| Le livre tient-il en 440 pages par tome ? | **Non, pas tel quel.** Tome 3 à 439 et tome 4 à 458 avant les pages liminaires | §8 |

Et ce qu'il ne tranche pas : la liste des parties (§6.1), le choix entre corps de texte et
nombre d'images (§8.3), les trois valeurs Blurb (§7). Ces quatre points sont regroupés au §9.

---

## 1. Format et grille

### 1.1 La page

| Élément | Valeur | Note |
| --- | --- | --- |
| Format rogné | **203,2 × 254 mm** (8 × 10 po) | `CLAUDE.md` |
| Fond perdu | **3,2 mm** (0,125 po) en tête, en pied et au petit fond | `[À VÉRIFIER]` — §7.1 |
| Page PDF exportée | **206,4 × 260,4 mm** (8,125 × 10,25 po) | `[À VÉRIFIER]` — §7.1 |
| Grand fond (intérieur, côté reliure) | **20 mm** | Dos collé à 440 pages : le pli avale 4 à 5 mm |
| Petit fond (extérieur) | **16 mm** | Porte l'onglet de partie (§6.1) et le folio (§6.3) |
| Tête | **20 mm** jusqu'à la première ligne de base | Le titre courant est à 12 mm du bord |
| Pied | **24,4 mm** sous la dernière ligne de base | Le folio est à 12 mm du bord |
| Empagement | **167,2 × 209,6 mm** | |

Contrôle : 16 + 167,2 + 20 = 203,2. 20 + 209,6 + 24,4 = 254. La maquette est juste ou elle ne
l'est pas ; ces deux additions le disent en trois secondes.

### 1.2 Les deux colonnes

| Élément | Valeur |
| --- | --- |
| Colonnes | **2** |
| Largeur de colonne | **80,6 mm** |
| Gouttière entre colonnes | **6 mm** |
| Justification | **Justifiée**, césure activée, dictionnaire **fr-CA** |
| Césure | 3 signes minimum avant et après, **2 lignes consécutives maximum**, jamais sur la dernière ligne d'un paragraphe ni en bas de colonne |

À 10 pt, une colonne de 80,6 mm porte **environ 52 signes**. C'est dans la fourchette qui se lit
sans effort (45 à 65). Une seule colonne pleine largeur en porterait 108 : illisible à la lampe
frontale, où l'œil perd la ligne suivante.

### 1.3 La ligne de base

| Élément | Valeur |
| --- | --- |
| Pas de la grille | **4,763 mm** (13,5 pt) |
| Première ligne de base | **20 mm** du bord de tête |
| Lignes par colonne | **45** (44 interlignes = 209,57 mm) |
| Lignes par page | **90** |

**Tout se pose sur cette grille.** Un bloc qui ne s'y pose pas naturellement — tableau, image,
légende, encadré — est calé à un **multiple entier de 4,763 mm**, blanc compris. Le texte de la
colonne voisine doit rester aligné au pied près : c'est le seul contrôle visuel qui attrape une
maquette qui dérive.

**Capacité mesurée de la page :** 90 lignes × 8,7 mots ≈ **780 mots**. La densité de 700 mots
utiles par page de `CLAUDE.md` est donc tenue avec une marge de 10 %, qui part en titres de
section et en blancs d'encadrés. La grille et la règle de densité se valident l'une l'autre.

---

## 2. Hiérarchie typographique

### 2.1 Les deux familles

| Usage | Police | Pourquoi |
| --- | --- | --- |
| Corps, encadrés, cellules de tableau | **Source Serif 4** | Empattements, grande hauteur d'x, chiffres elzéviriens **et** tabulaires, Latin étendu complet |
| Titres, en-têtes de tableau, légendes, folios, onglets, renvois | **Source Sans 3** | Même dessin, mêmes métriques, mêmes chasses de chiffres |

Les deux sont sous licence SIL OFL : elles s'intègrent au PDF sans question de droits, ce qui
compte pour un fichier envoyé à une imprimerie américaine.

**Substitution.** Une autre paire est acceptable seulement si elle remplit les quatre conditions :
hauteur d'x ≥ 0,50 du corps, chiffres tabulaires à chasse fixe, italique vraie (pas d'oblique
mécanique — 1 038 noms latins du livre sont en italique), et couverture complète du jeu de
caractères de l'annexe A. Une police qui rate un seul de ces points fait rater une page.

### 2.2 L'échelle

Tous les corps et interlignes sont en points typographiques. « LB » = lignes de base occupées.

| Niveau | Police et corps | Interligne | LB | Blanc avant | Blanc après |
| --- | --- | --- | --- | --- | --- |
| **Titre de chapitre** | Serif 4 Semibold **26 pt** | 27 pt | 2 | bloc d'ouverture fixe, §2.3 | — |
| **Surtitre « CHAPITRE NN »** | Sans 3 Semibold **11 pt**, capitales, interlettrage +100 | 13,5 pt | 1 | — | 1 LB |
| **Ligne de tome** | Serif 4 Italic **10 pt** | 13,5 pt | 1 | 1 LB | 1 LB |
| **Titre de section** (les dix) | Sans 3 Semibold **13 pt** | 13,5 pt | 1 | **2 LB** | **1 LB** |
| **Sous-titre** (niveau `###`) | Sans 3 Semibold **10,5 pt** | 13,5 pt | 1 | 1 LB | 0 |
| **Corps** | Serif 4 Regular **10 pt** | 13,5 pt | 1 | 0 | 0 |
| **Amorce en gras** | Serif 4 Bold 10 pt, dans le fil du paragraphe | — | — | — | — |
| **Liste à puces** | Serif 4 Regular 10 pt, retrait 4 mm, puce carrée 1,2 mm gris 60 % | 13,5 pt | 1 | 0,5 LB | 0,5 LB |
| **Liste numérotée** | numéro Sans 3 Semibold 10 pt aligné à droite sur deux chiffres, texte en retrait de 7 mm | 13,5 pt | 1 | 0,5 LB | 0,5 LB |
| **Cellule de tableau** | Serif 4 Regular **9 pt** | 11,9 pt | bloc calé, §4 | — | — |
| **En-tête de tableau** | Sans 3 Semibold **9 pt** | 11,9 pt | — | — | — |
| **Légende d'image** | Sans 3 Regular **8,5 pt** | 11,9 pt | bloc calé, §5.4 | — | — |
| **Crédit et licence** | Sans 3 Regular **8 pt**, gris 70 % | 11,9 pt | même bloc que la légende | — | — |
| **Note et source en fin de section** | Sans 3 Regular **8 pt**, gris 70 % | 11,9 pt | bloc calé | 1 LB | 1 LB |

**Le corps à 10 pt n'est pas négociable.** C'est un livre qu'on ouvre en panne, à -20 °C, avec
une lampe frontale et des gants. Une lampe frontale éclaire en tache dure, écrase le contraste
et fatigue vite. Descendre à 9 pt donne 20 pages de moins par tome (§8.3) et rend le livre moins
bon à l'endroit exact où il sert. Si la place manque, on coupe des images, pas des points.

Pour la même raison : **noir K100 pur sur blanc papier, jamais de gris pour du texte courant**,
jamais de texte en blanc sur noir sous 10 pt (§7.3).

### 2.3 L'ouverture de chapitre

Bloc fixe, identique aux 89 chapitres, sur les **11 premières lignes de base** de la page. Le
chapitre s'ouvre **toujours en page de droite** (recto) ; la page de gauche précédente reste
blanche si nécessaire.

| LB | Contenu | Alignement |
| --- | --- | --- |
| 1 | *(blanche)* | |
| 2 | `CHAPITRE 63` — surtitre | pleine largeur, à gauche |
| 3 | *(blanche)* | |
| 4-5 | **Salaison à sec** — titre, 26 pt, sur deux lignes de base | pleine largeur, à gauche |
| 6 | *(blanche)* | |
| 7 | *Tome 4 — Conserver et réparer* | pleine largeur, à gauche |
| 8 | *(blanche)* | |
| 9 | filet **1 pt** noir, pleine largeur (167,2 mm) | |
| 10 | *(blanche)* | |
| 11 | première ligne de texte, colonne de gauche | |

Un titre qui dépasse une ligne de base descend le bloc d'une ligne ; le filet reste en LB 9 et la
LB 10 saute. Le plus long du livre est « Chapitre 70 — Traiter le poisson à la sortie de l'eau » :
il tient sur une ligne à 26 pt en pleine largeur. Aucun titre ne s'abrège.

**Six chapitres — 3, 6, 25, 26, 29 et 60 — n'ont pas de ligne de tome dans leur fichier.** Le
rôle 6 la pose quand même, d'après `suivi/suivi-chapitres.md` : la maquette est uniforme, le
fichier source n'a pas à l'être.

### 2.4 Veuves et orphelines

C'est la seule intervention du rôle 6 sur le texte, et elle s'arrête là.

- Aucune ligne seule en tête ou en pied de colonne. Minimum **2 lignes** de part et d'autre.
- Aucun titre de section ni sous-titre sur les **3 dernières lignes de base** d'une colonne.
- Aucune ligne de fin de paragraphe de moins de **12 mm**.
- Un tableau ne se coupe jamais à moins de **2 lignes** de son en-tête (§4.5).
- Correction autorisée : chasse du paragraphe à **±0,5 %**, approche à ±2 millièmes de cadratin,
  sur le paragraphe entier. **Jamais sur une seule ligne**, jamais en modifiant le texte.
- Si ça ne suffit pas, la ligne de base de la colonne **ne bouge pas** : on laisse le blanc en
  pied et on le signale dans `suivi/NN-mep.md` pour le rôle 5.

---

## 3. Les encadrés

Le livre en compte trois : DANGER, variante d'urgence, et le bandeau de relecture qui ne
s'imprime pas. Il n'y en a pas d'autres, et on n'en crée pas.

### 3.1 Le titre de la section 8 — tranché

Le corpus écrit trois formes : **`8. Danger` (47 chapitres), `8. DANGER` (24), `8. ⚠ DANGER` (2)**.

**Forme unique retenue : `8. Danger`**, composée comme les neuf autres titres de section (Sans 3
Semibold 13 pt, bas de casse).

Pourquoi celle-là :

1. Les dix titres de section sont **un squelette de repérage**. Le lecteur qui cherche la section 8
   la trouve à sa place, pas à son volume typographique. Un titre qui crie dans une liste de dix
   titres calmes casse le rythme de lecture au lieu de le servir.
2. Ce titre part dans la **table des matières** et dans le **titre courant** (§6.2). Une capitale
   y traîne partout et se dilue — exactement ce que la section 8 du gabarit interdit : « si
   l'encadré est partout, personne ne le lit ».
3. Le cri appartient à **l'encadré**, qui suit immédiatement et qui, lui, porte `⚠ DANGER` en
   capitales rouges. Le danger ne perd rien ; il est signalé une fois, fort, au bon endroit.

**Le rôle 6 n'édite pas les fichiers.** La forme est imposée par le **style de paragraphe**
(casse forcée en bas de casse, symbole `⚠` retiré du fil du titre), donc elle s'applique aux 89
chapitres sans toucher une ligne de texte. Les 26 fichiers écrits autrement se composent
correctement sans être modifiés.

### 3.2 Couleurs

| Rôle | Valeur | Contrainte |
| --- | --- | --- |
| Texte courant, corps des encadrés, tableaux | **K100 seul** | Une seule encre. Un texte à 10 pt sur quatre plaques bouge au repérage |
| Rouge DANGER | **C0 M100 J90 N10** | Deux encres. Jamais sous 12 pt, jamais en filet sous 1 pt (§7.3) |
| Gris de la variante d'urgence | **N10** | Nominal. Jamais au-dessus de N12 après engraissement (§7.3) |
| Filets secondaires de tableau | **N40** | |
| Notes, crédits, licences | **N70** | Jamais pour du texte courant |

Aucune autre couleur dans la maquette. La couleur du livre est dans les planches, et nulle part
ailleurs.

### 3.3 L'encadré DANGER — construction exacte

**Largeur : pleine justification, 167,2 mm, sur les deux colonnes.** Jamais en colonne. À 831
mots de médiane, un encadré en colonne produirait un ruban de 2,4 pages de haut sur 80 mm de
large : illisible et impossible à caler.

De haut en bas, chaque élément sur une ligne de base :

| Ordre | Élément | Spécification |
| --- | --- | --- |
| 1 | Blanc avant | **2 LB** (9,53 mm) |
| 2 | **Filet de tête** | **1,5 pt** rouge, 167,2 mm |
| 3 | Blanc | 1 LB |
| 4 | **Symbole ⚠** | Tracé **vectoriel**, hauteur 4,8 mm, rouge, aligné sur la hauteur de capitale du titre. **Jamais un caractère de police** — voir annexe A |
| 5 | **Titre** | 3 mm après le symbole. `DANGER — SUJET` en Sans 3 Bold **12 pt**, capitales, interlettrage +60, rouge. 1 LB |
| 6 | Blanc | 1 LB |
| 7 | **Corps** | Serif 4 Regular **10/13,5 pt**, **noir K100**, pleine justification |
| 8 | Blanc | 1 LB |
| 9 | **Filet de pied** | **1,5 pt** rouge, 167,2 mm |
| 10 | Blanc après | **2 LB** |

**Pas de fond, pas de trame, pas de texte rouge dans le corps.** Un aplat sous 831 mots en
papier standard boit le noir et tue le contraste — précisément sous une lampe frontale. Les deux
filets et le titre rouge suffisent à faire voir l'encadré de l'autre bout de la page.

**Le sujet du titre.** 35 chapitres écrivent `⚠ DANGER — <sujet>`, 30 écrivent `⚠ DANGER` seul,
9 écrivent `DANGER — <sujet>`. Quand le fichier porte un sujet, il est repris tel quel après un
tiret cadratin. Quand il n'y en a pas, **le titre s'arrête à `DANGER`, sans tiret** : le rôle 6
n'invente pas de sujet.

**Les points numérotés.** 56 chapitres sur 89 découpent l'encadré en points numérotés (de 2 à 8,
médiane 5). Numéro en Sans 3 Bold 10 pt **rouge**, aligné à gauche, texte en retrait de 6 mm ;
l'énoncé du point en Serif 4 **Bold noir**, la suite en Regular ; 0,5 LB entre deux points. Les
**33 chapitres sans points numérotés** se composent en paragraphes suivis, mêmes règles, sans
numérotation ajoutée.

**Listes à puces dans l'encadré** (55 cas dans le corpus) : mêmes retraits qu'au §2.2, puce
rouge.

**Jamais de tableau dans un encadré DANGER.** Le corpus n'en contient aucun ; si un jour il en
arrive un, il sort de l'encadré et se compose au-dessus du filet de tête.

### 3.4 L'encadré DANGER coupé par une page

Mesuré : **médiane 831 mots**, moyenne 889, maximum 1 606. **86 encadrés sur 89 dépassent 500
mots**, 52 dépassent 800, 11 dépassent 1 200. À 780 mots la page, l'encadré médian fait 1,1 page
et le plus gros en fait 2,1. La coupe n'est pas une exception : c'est le cas normal.

**Règle de coupe :**

1. En bas de page, l'encadré **ne se ferme pas**. À la place du filet de pied : un filet
   **0,5 pt rouge pointillé** (tirets de 2 mm, blancs de 2 mm) et, sur la ligne de base
   au-dessus, la mention `suite page suivante` en Sans 3 Italic 8 pt rouge, alignée à droite.
2. En tête de la page suivante : filet **1,5 pt rouge**, puis `⚠ DANGER (suite)` en Sans 3 Bold
   **10 pt** (pas 12 : c'est un rappel, pas une deuxième alerte), puis le corps reprend.
3. **Coupes interdites :** à moins de 3 LB après le filet de tête · à moins de 3 LB avant le
   filet de pied · à moins de 2 LB après le début d'un point numéroté · entre un numéro de point
   et son énoncé en gras.
4. Un encadré DANGER **ne commence jamais** sur les 6 dernières lignes de base d'une page. S'il
   tombe là, il passe à la page suivante et la section 7 s'étire.
5. Le titre courant et le folio restent en place sur une page de suite. Un encadré n'efface pas
   la navigation.

### 3.5 L'encadré variante d'urgence — section 9

Mesuré : **médiane 543 mots**, maximum 786, **aucune** des 89 sections 9 n'est délimitée dans le
fichier source. C'est donc **la section 9 entière, titre compris, qui porte le fond**, du titre
`9. Variante d'urgence` jusqu'au titre `10. Sources`.

| Élément | Spécification |
| --- | --- |
| Fond | Aplat **N10**, sans filet |
| Largeur de l'aplat | Bloc de texte **+ 4 mm à gauche et à droite**. En pleine largeur : 175,2 mm. En colonne : 88,6 mm |
| Débord vertical | **1 LB** au-dessus de la ligne de base du titre, 1 LB sous la dernière ligne |
| Composition | **En 2 colonnes**, comme le texte courant. À 543 mots de médiane, la pleine largeur n'est pas nécessaire |
| Texte | Serif 4 Regular 10/13,5 pt, **noir K100**. Ni gris, ni italique, ni corps réduit : la variante d'urgence est la version qu'on lit quand ça va mal |
| Titre de section | Composé normalement (Sans 3 Semibold 13 pt), sur le fond |
| Tableau dans la section 9 | **6 chapitres sur 89.** Le tableau passe en pleine largeur (§4.1), et **l'aplat continue sous lui** |
| Coupe de page | L'aplat se ferme au pied du bloc de texte de la page et rouvre en tête de la page suivante. **Aucune mention de suite** : le fond gris se reconnaît tout seul |

**N10 et pas plus.** Sur papier standard, l'engraissement pousse un N10 vers N13 ou N14. Au-delà,
un texte de 10 pt perd le contraste dont il a besoin sous une lampe frontale. Si l'épreuve
imprimée montre plus de N12, **on descend la trame, on ne monte pas le corps du texte**.

### 3.6 Le bandeau de relecture — ne s'imprime pas

**28 chapitres** portent en tête, entre le titre et la section 1, un bandeau du type
`⚠ RELECTURE HUMAINE EXTERNE OBLIGATOIRE — <profil>`. Vérifié sur les 28 : ce sont des
**notes de production adressées à l'équipe**, pas au lecteur. Elles nomment un relecteur à
trouver, un budget de recherche épuisé, un bloc à couper si personne ne signe.

**Le rôle 6 les retire de la maquette** et consigne dans `suivi/NN-mep.md` : numéro du chapitre,
profil de relecteur demandé, et si le bandeau posait une condition de publication. **Le fichier
`.md` n'est pas modifié** — le bandeau est la mémoire du dossier.

**Un chapitre dont le bandeau pose une condition non levée ne part pas en épreuve.** La maquette
peut être faite ; l'envoi à Blurb, non. C'est au rôle 5 et à JP de lever la condition, pas au
metteur en pages.

---

## 4. Les tableaux

581 tableaux, **6,5 par chapitre en moyenne**, 21 474 cellules. C'est le poste le plus lourd du
livre après le texte courant : **à lui seul il occupe 87 pages au tome 1, 124 au tome 3 et 133 au
tome 4** (§8.1). Un tableau mal normé coûte plus cher que tout le reste réuni.

### 4.1 Pleine justification, sans exception

**Tout tableau se compose sur 167,2 mm, à cheval sur les deux colonnes.**

Les mesures qui ferment la question :

- **46 % des tableaux ont 4 colonnes ou plus** (238 à 4 colonnes, 22 à 5, 5 à 6 ou 7).
- **La cellule la plus longue d'un tableau fait 121 signes en médiane**, 216 au 9ᵉ décile, 465 au
  maximum.
- Dans une colonne de 80,6 mm, un tableau à 4 colonnes donne des colonnes de 18 mm. Une cellule
  de 121 signes y ferait **onze lignes de trois mots**.

Il n'y a pas d'arbitrage ici : ou les tableaux passent en pleine largeur, ou ils ne sont pas
lisibles. Le texte courant reprend en 2 colonnes sous le tableau.

### 4.2 Construction

| Élément | Spécification |
| --- | --- |
| Blanc avant | 1 LB |
| **Filet de tête** | **1 pt** noir, 167,2 mm |
| **Ligne d'en-tête** | Sans 3 Semibold 9 pt, bas de casse, aligné à gauche (ou à droite pour une colonne de nombres). Hauteur 2 LB, texte centré verticalement |
| **Filet sous l'en-tête** | **0,5 pt** noir |
| **Lignes** | Serif 4 Regular 9/11,9 pt. Blanc intérieur : 1,5 mm en tête et en pied de cellule |
| **Filets entre lignes** | **0,5 pt gris N40** |
| **Filets verticaux** | **Aucun.** La colonne se tient par l'alignement, pas par un trait |
| **Filet de pied** | **1 pt** noir |
| Blanc après | 1 LB |
| **Hauteur totale** | Calée à un **multiple entier de 4,763 mm**, blanc réparti en pied |
| Trame alternée | **Aucune.** Un N10 une ligne sur deux sur 6 577 lignes de tableau coûte du contraste partout et n'aide nulle part |

Le gras est très présent dans les cellules (**3 110 cellules en contiennent**) : c'est du sens,
pas de la décoration. Il se compose en Serif 4 Bold, jamais en couleur.

### 4.3 Les trois tableaux à structure fixe

Ce sont ceux du gabarit. Leurs largeurs de colonne sont fixées une fois pour le livre entier :
un lecteur qui a lu trois chapitres doit reconnaître la colonne sans lire l'en-tête.

**Section 4 — Matériel** (87 chapitres, en-tête relevé : `Item | Quantité | Substitution possible | Négociable`)

| Colonne | Largeur | Alignement |
| --- | --- | --- |
| Item | 38 % — 63,5 mm | gauche |
| Quantité | 12 % — 20,1 mm | gauche |
| Substitution possible | 30 % — 50,2 mm | gauche |
| Négociable | 20 % — 33,4 mm | gauche |

**Section 6 — Points de contrôle** (80 chapitres, `Moment | Ce qu'on vérifie | Cible chiffrée | Si c'est hors cible`)

| Colonne | Largeur | Alignement |
| --- | --- | --- |
| Moment | 22 % — 36,8 mm | gauche |
| Ce qu'on vérifie | 23 % — 38,5 mm | gauche |
| Cible chiffrée | 25 % — 41,8 mm | **gauche, nombres alignés sur le premier chiffre** |
| Si c'est hors cible | 30 % — 50,2 mm | gauche |

**Section 7 — Signes d'échec** (89 chapitres sur 89, `Observation | Diagnostic | Action`)

| Colonne | Largeur | Alignement |
| --- | --- | --- |
| Observation | 30 % — 50,2 mm | gauche |
| Diagnostic | 30 % — 50,2 mm | gauche |
| Action | 40 % — 66,9 mm | gauche |

**Les variantes d'en-tête ne se corrigent pas à la maquette.** Le relevé montre 9 tableaux de
points de contrôle avec un en-tête différent (`Hors cible → quoi faire`, `Cible`, `Hors cible`),
2 tableaux de signes d'échec en `Diagnostic probable`, 4 tableaux de matériel en `Substitution`.
Le rôle 6 **compose ce qui est écrit** et porte la liste dans `suivi/NN-mep.md` à l'intention du
rôle 5. Un metteur en pages qui harmonise du texte sort de son rôle.

Même chose pour la colonne « Négociable », qui porte tantôt `Oui` / `**Non**`, tantôt
`**NON**`, tantôt `**Non négociable**` : c'est une uniformisation de rédaction, pas de maquette.

### 4.4 Les nombres et les unités

Le livre est fait de chiffres : **2 705 températures en °C**, 572 pourcentages, 356 groupes de
milliers. Ils se composent tous pareil.

| Règle | Forme | Exemple |
| --- | --- | --- |
| Chiffres | **Tabulaires** dans les tableaux, elzéviriens dans le texte courant | |
| Alignement en colonne | Sur le **premier chiffre** quand la colonne mélange nombres et texte ; à droite quand elle ne porte que des nombres | |
| Décimale | **Virgule**, jamais de point | `1,7 °C` |
| Milliers | **Espace fine insécable**, jamais d'apostrophe ni de virgule | `1 800 463-5060` |
| Unité | **Espace fine insécable** entre le nombre et l'unité, toujours | `74 °C`, `6 %`, `100 ppm`, `250 g` |
| Intervalle | **Tiret demi-cadratin sans espace**, unité une seule fois, à la fin | `1,7–7,3 °C`, `0–4 °C` |
| Unité en en-tête | Quand toute la colonne porte la même unité, elle monte dans l'en-tête et sort des cellules | `Cible (°C)` |
| Impérial | Entre parenthèses, **seulement pour les dimensions de construction** (`CLAUDE.md`) | `50 mm (2 po)` |
| Signes de relation | Espace fine insécable de part et d'autre | `aw ≤ 0,85`, `pH < 5,0` |
| `[À VÉRIFIER]` | Sans 3 Regular 8,5 pt, **capitales, gris N70, entre crochets**, espace fine insécable avant. Ne casse jamais la ligne | `3 à 4 jours [À VÉRIFIER]` |

**Les 773 mentions `[À VÉRIFIER]` s'impriment.** Elles ne sont pas une note de production : elles
disent au lecteur qu'il est seul sur cette ligne. Elles se voient sans crier — pas de rouge, pas
de gras.

### 4.5 Tableaux longs

- Un tableau qui dépasse la page se coupe et **reprend son en-tête complet** en tête de page
  suivante, filet de tête compris, suivi de `(suite)` en Sans 3 Italic 8 pt gris N70.
- Coupe interdite à moins de **2 lignes** après l'en-tête ou avant le filet de pied.
- Une ligne de tableau **ne se coupe jamais** entre deux pages.
- Un tableau de plus de **2 pages** est signalé au rôle 5 dans `suivi/NN-mep.md` : au-delà, ce
  n'est plus un tableau, c'est une annexe, et ça se décide en rédaction.

---

## 5. Les images

802 images demandées, **aucune acquise**. Registre : `images/credits.md`. Répartition relevée :
**82 pleine page, 209 demi-page, 346 quart de page** dans les fiches de suivi ; le registre
compte 81 pleine page, 235 demi-page et 481 quart de page une fois les formats normalisés.

### 5.1 Les trois formats

| Format | Emploi (`roles.md`) | Dimensions | Lignes de base | Pixels à 300 ppp |
| --- | --- | --- | --- | --- |
| **Pleine page** | Planches et cartes | **206,4 × 260,4 mm** à fond perdu, ou **167,2 × 209,6 mm** dans l'empagement | page entière | **2 438 × 3 076** (fond perdu) · 1 975 × 2 476 (empagement) |
| **Demi-page** | Séquences | **167,2 × 104,8 mm**, pleine largeur | **22 LB** | **1 975 × 1 238** |
| **Quart de page, portrait** | Fiches d'espèce | **80,6 × 104,8 mm**, une colonne | **22 LB** | **952 × 1 238** |
| **Quart de page, bande** | Fiches d'espèce en format couché | **167,2 × 52,4 mm**, pleine largeur | **11 LB** | **1 975 × 619** |

Le format « quart de page » a deux variantes parce que 481 images le portent et qu'elles ne sont
pas toutes debout. **Le choix se fait sur le rapport de l'image**, pas sur le goût : plus haute
que large → portrait ; plus large que haute → bande.

**Hauteurs calées.** 104,8 mm = 22 lignes de base exactement, 52,4 mm = 11. Une image demi-page
ou quart de page laisse donc la colonne voisine alignée au pied, sans rattrapage.

### 5.2 Position dans la colonne

| Format | Position autorisée |
| --- | --- |
| **Pleine page** | Page entière, sans titre courant ni folio si elle est à fond perdu. **Toujours en regard du texte qu'elle sert**, jamais seule à tourner la page |
| **Demi-page** | **En tête ou en pied de page**, jamais au milieu : au milieu, elle coupe les deux colonnes en quatre morceaux et le lecteur perd le fil de la colonne de gauche |
| **Quart portrait** | **En tête ou en pied d'une colonne.** Le texte ne l'habille pas : il reprend sous elle, dans la même colonne |
| **Quart bande** | En tête ou en pied de page, pleine largeur |

**Aucun habillage de texte. Aucune image en biais. Aucune image qui déborde dans la gouttière
intérieure.**

### 5.3 L'ancrage — le vrai trou

**Sur 630 lignes d'image relevées dans les fiches de suivi, 115 seulement — 18 % — nomment la
section ou l'étape qu'elles servent.** Le texte des chapitres ne contient que **7 renvois à une
planche** sur 802 images. Autrement dit : pour 4 images sur 5, rien ne dit où elles vont.

Règle, dans cet ordre :

1. **La fiche nomme une section, une étape ou un point** (`§5 étape 12`, `porte le point 3 de
   l'encadré DANGER`) → l'image se pose sur la page où ce passage commence, ou sur la page
   suivante. Jamais avant.
2. **La fiche ne nomme rien** → l'image se pose dans la section que son sujet désigne, selon la
   table ci-dessous, et **le rôle 6 inscrit l'ancrage retenu dans `suivi/NN-mep.md`**. Cette
   liste devient l'ancrage officiel ; elle ne se refait pas à chaque épreuve.

| Sujet de l'image | Section d'ancrage |
| --- | --- |
| Planche anatomique, carte, schéma de principe, arbre de décision | 3 — Pourquoi ça marche |
| Outil, contenant, produit, étalage de matériel | 4 — Matériel |
| Séquence de gestes, vignettes numérotées, coupe en cours de procédé | 5 — Procédure, à l'étape nommée |
| Instrument de mesure, affichage, carnet, balance | 6 — Points de contrôle |
| Aliment avarié, comparaison sain/gâté, sosie toxique | 7 — Signes d'échec |
| Rangement d'un produit dangereux, équipement de protection | 8 — Danger, **hors de l'encadré**, au-dessus du filet de tête |
| Montage de fortune, installation dégradée | 9 — Variante d'urgence |

3. Une image **ne se pose jamais dans la section 1, 2 ou 10**.
4. Une image **ne se pose jamais à l'intérieur d'un encadré DANGER** (§3.3).

### 5.4 Légende, crédit, licence

Sous l'image, largeur de l'image, aligné sur son bord gauche, **1 LB de blanc entre l'image et la
première ligne de légende**. L'ensemble image + légende est calé à un multiple entier de lignes
de base.

Forme, en un seul bloc, sans retour à la ligne entre la légende et le crédit :

```
63-01  Coupe en travers d'une pièce salée à mi-parcours : l'anneau extérieur salé
est plus pâle et plus ferme que le centre encore rouge. Photo de JP Lavoie, 2026.
Tous droits réservés.
```

| Champ | Composition | Règle |
| --- | --- | --- |
| **Numéro** | Sans 3 Semibold 8,5 pt noir, `NN-NN` | Toujours présent. C'est la clé de `images/credits.md` |
| **Texte** | Sans 3 Regular 8,5 pt noir | Une à trois lignes. Dit ce que l'image montre, pas ce que le texte dit déjà |
| **Crédit** | Sans 3 Regular 8 pt gris N70 | `Photo de <auteur>, <année>.` ou `Dessin de <auteur>, <année>.` |
| **Licence** | Sans 3 Regular 8 pt gris N70 | La mention exacte exigée par la licence, **recopiée telle quelle** depuis `images/credits.md` |

**Aucune image ne se compose sans son crédit et sa licence, même les photos de JP.** Une image
dont la ligne de `credits.md` est vide **ne se maquette pas** : on laisse le cadre vide avec le
numéro, et on le porte dans `suivi/NN-mep.md`. C'est la seule façon de ne pas expédier à
l'impression une image dont personne ne sait d'où elle vient.

Pour une image versée, la mention porte **auteur, source et licence** : `Photo de <auteur>,
Wikimedia Commons. CC BY-SA 4.0.` Les licences non commerciales sont marquées `CC BY-NC` dans la
légende, sans commentaire : `CLAUDE.md` les accepte pour un usage privé, et la mention visible
est ce qui permettra de les repérer le jour où le livre se vend.

### 5.5 Contraintes de fabrication des planches

Tirées du cahier de commande (`images/liste-photos-octobre.md`), qui les impose déjà aux 77
planches des chapitres 36 à 42. Elles valent pour les 802.

1. **Toute planche se lit en niveaux de gris.** Deux aplats de couleur qui ne se distinguent pas
   une fois convertis en gris sont différenciés aussi par la **trame** ou par le **libellé**.
   La couleur ne porte jamais une information toute seule.
2. **Un dégradé continu se compose en 5 paliers** (carte thermique 37-23, décroissance 06-04). Un
   dégradé lisse moire sur papier standard.
3. **Conventions partagées entre planches** : mêmes hachures pour l'os, le muscle et le gras dans
   toute la série 37 ; même code de trame pour le gras entre les chapitres 37, 24 et 67 ; même
   symbole de ligature entre 36 et 37. Le rôle 6 tient la liste de ces conventions dans
   `suivi/mep-conventions-planches.md` et **refuse une planche qui en dévie**.
4. **Échelle visible** : toute planche anatomique ou de morceau porte une règle graduée en
   centimètres.
5. **Nom d'usage en gras, nom latin en italique dessous.** 1 038 noms latins dans le livre : la
   règle vaut aussi dans les légendes.
6. **Texte minimal dans une planche : 7 pt en Sans 3 Semibold.** En dessous, ça disparaît à
   l'impression. Une planche qui a besoin de plus petit a trop de texte : elle se redessine.
7. **Une planche détachable** (`37-06`, carte récapitulative à punaiser au mur) se compose en
   pleine page **recto seul**, avec **une page blanche au verso**, et se pose en fin de chapitre.
   Elle doit se lire seule, sans le texte.

---

## 6. Navigation

### 6.1 Onglet de partie

**Géométrie, applicable dès que la liste des parties est confirmée :**

| Élément | Spécification |
| --- | --- |
| Position | Petit fond (bord extérieur), **à fond perdu** |
| Dimensions | **12 mm de large** (dont 3,2 mm de fond perdu, donc 8,8 mm visibles après rognage) × **26 mm de haut** |
| Couleur | Aplat **N85**, texte en réserve blanche |
| Texte | Numéro de partie en chiffres romains, Sans 3 Bold **10 pt**, tourné à 90° (lecture de bas en haut) |
| Zone de sécurité | Aucun signe à moins de **6 mm** du bord rogné : le rognage varie |
| Échelonnement | La bande descend le long du bord extérieur, d'une **hauteur d'onglet plus 4 mm** par partie. La première partie du tome est en tête, la dernière en pied |
| Pages sans onglet | Ouverture de chapitre, pages liminaires, pages d'image à fond perdu |
| Verso | Onglet **en regard** sur les pages de gauche, même hauteur, bord extérieur gauche |

**Ce qui bloque : la liste des parties n'existe plus.** `plan/plan-maitre.md` manque
(`suivi/bilan-redaction.md` le confirme), et c'est lui qui la portait. Deux fichiers survivants
la mentionnent : `suivi/suivi-chapitres.md` (« Manquée, la **Partie IX** attend octobre 2027 »)
et `suivi/36-redaction.md`. L'échéance dont ils parlent est la séance photo du débitage, qui
couvre les **chapitres 36 à 42** (`images/liste-photos-octobre.md`).

**Donc : Partie IX = chapitres 36 à 42.** C'est le seul point d'appui du dossier, et il suffit à
reconstruire le reste. La découpe ci-dessous est la seule qui place le bloc 36-42 en neuvième
position tout en suivant les coupures thématiques des titres. **Elle attend la confirmation de
JP** (§9).

| Partie | Titre proposé | Ch. | Tome | Pages |
| --- | --- | --- | --- | --- |
| I | Lire la situation | 1–7 | 1 | 87 |
| II | Le stock et les listes | 8–12 | 1 | 67 |
| III | Eau, feu, chaleur, lumière | 13–18 | 1 | 80 |
| IV | Se déplacer, communiquer, s'organiser | 19–23 | 1 | 65 |
| V | Manger pour tenir | 24–26 | 2 | 42 |
| VI | Soigner | 27–31 | 2 | 92 |
| VII | Tenir la tête | 32–33 | 2 | 27 |
| VIII | Le territoire | 34–35 | 3 | 32 |
| **IX** | **Le gros gibier** | **36–42** | **3** | **110** |
| X | Les fiches d'espèce | 43–56 | 3 | 209 |
| XI | La cueillette | 57–60 | 3 | 88 |
| XII | Conserver la viande et le poisson | 61–73 | 4 | 196 |
| XIII | Faire pousser, élever, vêtir | 74–81 | 4 | 127 |
| XIV | Réparer | 82–89 | 4 | 136 |

**Page d'ouverture de partie :** recto, pleine page, verso blanc. Numéro romain en Serif 4
Semibold 60 pt, titre de partie en 26 pt, liste des chapitres de la partie en Sans 3 Regular
10/13,5 pt. Ni titre courant, ni folio, ni onglet. **Coût : 14 parties × 2 pages = 28 pages**,
déjà comptées au §8.2.

### 6.2 Titre courant

| | Verso (page paire, à gauche) | Recto (page impaire, à droite) |
| --- | --- | --- |
| Contenu | `Tome 4 — Conserver et réparer` | `63 · Salaison à sec` |
| Police | Sans 3 Regular **8,5 pt**, capitales, interlettrage **+80**, gris **N70** | idem |
| Alignement | bord extérieur (gauche) | bord extérieur (droite) |
| Ligne de base | 12 mm du bord de tête | 12 mm du bord de tête |
| Filet | aucun | aucun |

- Le titre de chapitre est repris **entier**. Le plus long fait 51 signes ; à 8,5 pt capitales sur
  167,2 mm, il en tient 95. **Aucune abréviation, aucune troncature.**
- Le numéro de chapitre précède le titre, séparé d'un point médian entouré d'espaces fines
  insécables.
- **Pas de titre courant** sur : l'ouverture de chapitre, l'ouverture de partie, les pages
  liminaires, les pages d'image à fond perdu.
- **Le titre courant reste** sur les pages de suite d'un encadré DANGER et sur les pages de
  tableau long.

### 6.3 Folio

| Élément | Spécification |
| --- | --- |
| Position | Coin **extérieur** en pied — à gauche sur le verso, à droite sur le recto |
| Ligne de base | 12 mm du bord de pied |
| Police | Sans 3 Regular **9 pt**, noir K100 |
| Numérotation | **Continue à l'intérieur d'un tome**, en chiffres arabes, à partir de 1 sur la première ouverture de chapitre (recto). Les pages liminaires sont en chiffres romains bas de casse |
| Pages sans folio | Ouverture de partie, pages d'image à fond perdu, pages blanches |
| Total | **Pair obligatoire** (§7.4). Le remplissage se fait en pages blanches en fin de tome, jamais entre deux chapitres |

Chaque tome se numérote **à part**. Un folio unique sur 4 tomes obligerait à tout recomposer dès
qu'un chapitre change de place, et rendrait le tome 4 illisible : personne ne cherche la page
1 246.

### 6.4 Renvois inter-chapitres

**2 201 renvois dans le livre.** Forme dominante relevée : `(ch. 63)`, avec `ch. 37 à 40`,
`ch. 61, 62 et 64`, `chapitre 63`. C'est la forme la plus courte et la plus dense ; elle est
retenue.

| Cas | Forme imprimée | Composition |
| --- | --- | --- |
| Un chapitre | `ch. 63` | `ch.` en Serif 4 Regular, **numéro en Sans 3 Semibold**, espace fine insécable entre les deux |
| Plusieurs | `ch. 61, 62 et 64` | idem, `et` avant le dernier |
| Suite | `ch. 37 à 40` | idem, `à` et non un tiret |
| Autre tome | `ch. 63, tome 4` | la mention de tome s'ajoute **seulement** quand le renvoi sort du tome courant |
| Dans une parenthèse | `(ch. 63)` | la parenthèse reste en Serif 4 Regular |
| Section interne | `§ 5` | `§` suivi d'une espace fine insécable, numéro en Serif 4 Regular. **913 occurrences** |
| Étape interne | `étape 12` | en toutes lettres, jamais abrégé |

**Aucun renvoi ne porte de numéro de page.** Trois raisons, et chacune suffit : un numéro de page
change à la moindre correction de veuve, ce qui mettrait 2 201 renvois à refaire à chaque
épreuve ; **57 % des renvois pointent vers un autre tome** — 1 869 mentions `ch. N` sur 3 262
comptées — donc vers un folio que le lecteur n'a pas sous la main ; et le numéro de chapitre est
déjà, dans ce livre, l'identifiant que le lecteur apprend par cœur.

**Un renvoi ne se coupe jamais** en fin de ligne, ni entre `ch.` et son numéro, ni entre deux
numéros d'une série.

**Table des matières,** en tête de chaque tome : les quatre tomes en entier, avec les chapitres
du tome courant foliotés et ceux des autres tomes sans folio, en gris N70. Le lecteur qui cherche
« Salaison à sec » a un tome sur quatre dans les mains ; la table doit lui dire lequel prendre.

---

## 7. Impression Blurb

`CLAUDE.md` fixe : Blurb photo book, 8 × 10 po, **440 pages maximum par tome**, papier standard
couleur.

### 7.1 Ce qui reste à vérifier — trois valeurs

Aucune de ces trois valeurs n'est inventée ici, et aucune n'est sourcée non plus. La page
officielle de Blurb répond **403** aux tentatives de capture automatique ; elle doit être ouverte
à la main, imprimée en PDF, et **enregistrée dans `/sources`** comme n'importe quelle source du
livre, avant la première épreuve.

| # | Valeur | Ce que le dossier porte aujourd'hui | Ce qu'il faut |
| --- | --- | --- | --- |
| 1 | **Page PDF avec fond perdu** pour un 8 × 10 portrait | **206,4 × 260,4 mm (8,125 × 10,25 po)**, fond perdu de **3,2 mm (0,125 po)** en tête, en pied et au petit fond `[À VÉRIFIER]` | Sortie du calculateur de format de Blurb pour le format et le papier retenus |
| 2 | **Profil ICC de destination** | **Inconnu.** Blurb publie un profil par presse et par papier | Le profil publié par Blurb pour le papier standard. **Ne pas exporter en sRGB non géré ni avec un CMYK générique** |
| 3 | **Résolution minimale acceptée** | Blurb demande des images **plafonnées à 300 ppp** ; le plancher accepté n'est pas connu `[À VÉRIFIER]` | La spécification à jour |

**Source consultée le 2026-09-21 :** `support.blurb.com/hc/en-us/articles/207792946` (403 à la
capture) et `blurb.com/make/pdf_to_book/booksize_calculator`, qui renvoie au calculateur sans
donner les valeurs. **Un point est confirmé et utilisable :** le PDF s'exporte en **pages
simples, jamais en planches doubles** — l'outil de téléversement assemble les doubles lui-même.

### 7.2 Résolution des images

| Format | Dimensions | Pixels à **300 ppp** | Plancher absolu à **240 ppp** |
| --- | --- | --- | --- |
| Pleine page à fond perdu | 206,4 × 260,4 mm | **2 438 × 3 076** | 1 950 × 2 461 |
| Pleine page dans l'empagement | 167,2 × 209,6 mm | **1 975 × 2 476** | 1 580 × 1 981 |
| Demi-page | 167,2 × 104,8 mm | **1 975 × 1 238** | 1 580 × 990 |
| Quart portrait | 80,6 × 104,8 mm | **952 × 1 238** | 762 × 990 |
| Quart bande | 167,2 × 52,4 mm | **1 975 × 619** | 1 580 × 495 |

- **Aucun agrandissement.** Une image de 900 px de large ne devient pas une demi-page. Elle
  descend d'un format ou elle se reprend.
- **Cible de prise de vue : 24 mégapixels minimum** pour toute photo destinée à une pleine page.
  La liste d'octobre en compte 12 sur 77 : il n'y a pas de deuxième séance avant octobre 2027.
- **JPEG en qualité maximale ou TIFF.** Pas de recompression, pas de capture d'écran, pas
  d'image tirée d'un PDF.
- Les planches se dessinent **en vectoriel** et s'exportent en **600 ppp** : le trait fin y gagne
  beaucoup plus que la photo.

### 7.3 Ce qui ne passe pas en papier standard

| Interdit | Minimum imposé | Pourquoi |
| --- | --- | --- |
| Filet sous **0,5 pt** | **0,5 pt** pour les filets de tableau, **1 pt** pour les filets noirs structurants, **1,5 pt** pour le filet DANGER | Un filet plus fin se rompt à l'impression |
| Filet rouge sous **1 pt** | 1 pt | Le rouge est sur deux plaques : un défaut de repérage se voit immédiatement sur un trait fin |
| Trame sous **N10** ou au-dessus de **N85** | N10 minimum, N85 maximum | En dessous, la trame disparaît ; au-dessus, elle se bouche |
| Texte en couleur sous **12 pt** | Le rouge DANGER ne descend jamais sous 12 pt | Repérage |
| Texte en réserve blanche sous **10 pt** | 10 pt, et en Sans 3 Semibold | L'encre se referme sur les déliés |
| **Texte noir en quadrichromie** | Tout texte est en **K100 seul** | Quatre plaques sous un corps de 10 pt : le texte devient flou |
| **Noir riche** sous du texte ou dans un petit aplat | Réservé aux aplats de plus de 40 × 40 mm | |
| **Dégradé continu** | 5 paliers (§5.5) | Moirage |
| Image traversant la **gouttière** | Interdit | Dos collé à 440 pages : le pli avale 4 à 5 mm et ne s'ouvre pas à plat |
| Signe à moins de **6 mm** d'un bord rogné | 6 mm | La variation de rognage |
| Police non incorporée | **Toutes les polices incorporées**, sous-ensembles inclus | Un PDF à police manquante se compose chez l'imprimeur avec autre chose |

### 7.4 Le fichier livré

| Point | Exigence |
| --- | --- |
| Format | PDF, **pages simples**, dans l'ordre, une page par page |
| Nombre de pages | **Pair**, et **≤ 440** par tome |
| Polices | Incorporées |
| Transparence | **Aplatie** |
| Repères | **Aucun** trait de coupe, aucune hirondelle, aucune gamme de contrôle : le fond perdu suffit |
| Couleur | Converti au profil de destination de Blurb `[À VÉRIFIER]`, aucun objet resté en RVB |
| Épreuve | **Une épreuve papier d'un tome complet avant les trois autres.** À contrôler dessus, dans l'ordre : le gris N10 de la section 9, le rouge des filets DANGER, le texte de 10 pt sous une lampe frontale, et deux planches en niveaux de gris |

---

## 8. Le budget de pages — le seul vrai problème

### 8.1 Ce que la grille donne

Simulation des 89 chapitres sur la grille définie ci-dessus : texte à 10/13,5 pt en 2 colonnes de
52 signes, 581 tableaux composés en pleine largeur à 9 pt avec leurs vraies longueurs de cellule,
images comptées à leur format déclaré dans `images/credits.md`.

| Tome | Texte | Tableaux | Images | **Total chapitres** | Plafond |
| --- | --- | --- | --- | --- | --- |
| 1 — Tenir | 155 | 87 | 61 | **300** | 440 |
| 2 — Le corps | 75 | 41 | 46 | **161** | 440 |
| 3 — Prélever | 198 | 124 | 121 | **439** | 440 |
| 4 — Conserver et réparer | 239 | 133 | 91 | **458** | 440 |

### 8.2 Ce qu'il faut ajouter

| Poste | Pages | Détail |
| --- | --- | --- |
| Pages liminaires | 8 | Faux-titre, titre, crédits, avertissement, table des matières |
| Ouvertures de partie | 6 à 8 | 2 pages par partie, 3 ou 4 parties par tome (§6.1) |
| Pages blanches de calage | 2 à 6 | Chaque chapitre ouvre en recto |
| **Total à ajouter par tome** | **16 à 22** | |

**Résultat réel : tome 3 à ~457, tome 4 à ~478. Le plafond de 440 est dépassé de 17 et de 38
pages.** Le `suivi/bilan-redaction.md` avait raison de le dire ; la mise en pages le chiffre.

### 8.3 Les leviers, chiffrés

Quatre manières de rentrer. Elles se combinent.

| Levier | Effet sur le tome 3 | Effet sur le tome 4 | Ce qu'on perd |
| --- | --- | --- | --- |
| **A. Corps à 9,5/12,7 pt**, tableaux à 8,5 pt | 439 → **418** | 458 → **433** | La lisibilité à la lampe frontale. C'est la fonction du livre |
| **B. Couper 25 % de la surface d'image** | 439 → **413** | 458 → **440** | Rien d'acquis : les 802 images sont décrites, aucune n'est prise |
| **A + B** | 439 → **387** | 458 → **410** | Les deux |
| **C. Sortir un bloc du tome 4** | — | 458 → **322** (sans 82-89) ou **330** (sans 74-81) | Rien, sinon un cinquième volume |

**Recommandation : B seul, et C si B ne suffit pas.** Le corps de 10 pt est une fonction du
livre, pas une préférence — il est là pour être lu en panne, avec des gants, à la lampe. La
surface d'image est la seule variable qui ne coûte encore rien : **aucune des 802 images n'est
acquise**, donc couper aujourd'hui ne gaspille aucune séance photo. Couper après octobre 2026
gaspille la fenêtre du débitage, qui ne revient qu'en octobre 2027.

**Où couper, par ordre de rendement — tome 3 :**

| Ch. | Titre | Pages | Images | Piste |
| --- | --- | --- | --- | --- |
| 58 | Plantes comestibles boréales | 28 | **12 p.** | Le plus cher du livre. Passer les vues simples en quart de page |
| 37 | Carte de la carcasse | 26 | **13 p.** | 6 planches pleine page. Les 37-04 et 37-15 (vues éclatées) justifient la pleine page ; les autres se discutent |
| 60 | Sève, gomme, écorces | 23 | **12 p.** | Même traitement que le 58 |
| 59 | Champignons | 20 | 7 p. | Les paires comestible/sosie restent en pleine page : c'est ce qui tue |
| 43–56 | Les fiches d'espèce | **210** | — | 14 chapitres à 15 pages. Le format « fiche » devrait être le plus court du livre |

**Tome 4 :** les 8 chapitres de réparation (82–89) pèsent **136 pages** et les 8 chapitres
74–81 en pèsent **127**. L'un ou l'autre en cinquième tome règle le problème d'un coup et laisse
de la place aux trois autres.

**Ce n'est pas une décision de maquette.** C'est §9.

---

## 9. Ce qui ne se tranche pas sans JP

| # | Question | Ce qui est prêt | Ce qu'il manque |
| --- | --- | --- | --- |
| 1 | **Comment rentrer dans 440 pages** | Les quatre leviers chiffrés (§8.3). Recommandation : couper 25 % de la surface d'image, et sortir un bloc du tome 4 si ça ne suffit pas | L'arbitrage entre corps de texte, nombre d'images et nombre de tomes. **Urgent : la fenêtre photo de mi-octobre ferme dans trois semaines** et on y commanderait des images qu'on couperait ensuite |
| 2 | **La liste des parties** | 14 parties reconstruites, vérifiées contre le seul point d'appui du dossier (Partie IX = ch. 36–42), et la géométrie complète de l'onglet (§6.1) | Confirmation des 14 titres et des 14 découpes, ou reconstruction de `plan/plan-maitre.md`. **Sans ça, l'onglet de partie ne se compose pas** |
| 3 | **Les trois valeurs Blurb** | Les valeurs probables, marquées `[À VÉRIFIER]`, et les pages à ouvrir (§7.1) | Ouvrir le calculateur de Blurb à la main, télécharger le profil ICC du papier standard, **enregistrer les deux dans `/sources`**. Trente minutes, et ça débloque l'export |
| 4 | **Les polices** | Source Serif 4 et Source Sans 3, libres, incorporables, couverture vérifiée, avec les quatre critères de substitution (§2.1) | Un oui, ou une autre paire qui passe les quatre critères |

Trois points qui ne sont pas des décisions mais des travaux, et qui appartiennent au **rôle 5**,
pas au rôle 6 :

- **Uniformiser les en-têtes de tableau** : 9 variantes en points de contrôle, 2 en signes
  d'échec, 4 en matériel (§4.3).
- **Uniformiser la colonne « Négociable »** : `Oui` / `Non` / `NON` / `Non négociable` coexistent.
- **Poser la ligne de tome** dans les 6 chapitres qui n'en ont pas (3, 6, 25, 26, 29, 60), ou
  laisser le rôle 6 la composer d'après `suivi-chapitres.md` (§2.3).

---

## 10. Liste de contrôle du rôle 6, par chapitre

À remplir dans `suivi/NN-mep.md`. Un chapitre n'est pas `MEP` tant que les quinze lignes ne sont
pas cochées.

| # | Contrôle |
| --- | --- |
| 1 | Ouverture en recto, bloc de titre sur 11 LB, ligne de tome présente |
| 2 | Bandeau de relecture **retiré** de la maquette et consigné (si le chapitre en a un) |
| 3 | Les dix titres de section présents, dans l'ordre, section 8 composée `8. Danger` |
| 4 | Encadré DANGER en pleine largeur, filets 1,5 pt rouge, corps en noir, coupes conformes |
| 5 | Section 9 entière sur aplat N10, débord de 4 mm, composée en 2 colonnes |
| 6 | Tous les tableaux en pleine largeur, filets et largeurs de colonne conformes |
| 7 | Les trois tableaux du gabarit aux largeurs fixes du §4.3 |
| 8 | Nombres, unités et intervalles conformes au §4.4 ; espaces fines insécables en place |
| 9 | Chaque image à son format, à sa position, calée sur la ligne de base |
| 10 | Chaque image porte numéro, légende, crédit et licence, recopiés de `credits.md` |
| 11 | Ancrage de chaque image consigné dans `suivi/NN-mep.md` |
| 12 | Titre courant et folio corrects sur toutes les pages, absents où ils doivent l'être |
| 13 | Renvois composés au §6.4, aucun coupé en fin de ligne |
| 14 | Aucune veuve, aucune orpheline, aucun titre en pied de colonne |
| 15 | Ligne de base respectée : les deux colonnes s'alignent au pied sur toutes les pages |

Et, une fois par tome :

| # | Contrôle |
| --- | --- |
| 16 | Nombre de pages **pair** et **≤ 440** |
| 17 | Toutes les polices incorporées, transparence aplatie, aucun objet en RVB |
| 18 | Aucun filet sous 0,5 pt, aucune trame sous N10 ni au-dessus de N85 |
| 19 | Aucun texte noir en quadrichromie |
| 20 | Épreuve papier contrôlée à la lampe frontale |

---

## Annexe A — Jeu de caractères

Relevé exhaustif des signes non ASCII des 89 chapitres, avec leur fréquence. **La police retenue
doit tous les porter**, sinon la composition produit des carrés vides sans prévenir.

`é` 50 939 · `à` 12 508 · `è` 10 162 · `ê` 4 452 · `—` 4 178 · `«` 3 353 · `»` 3 353 ·
`°` 2 791 · `É` 1 463 · `ô` 1 391 · `û` 1 300 · `À` 1 097 · `ç` 1 087 · `â` 1 046 · `§` 913 ·
`ù` 868 · `î` 807 · `œ` 800 · `·` 755 · `≥` 119 · `×` 114 · `≤` 106 · **`⚠` 105** · `…` 78 ·
`µ` 73 · `−` 70 · `ï` 69 · `²` 63 · `→` 58 · `Ç` 50 · `³` 41 · `–` 38 · `º` 30 · `÷` 27 ·
`≈` 26 · `Œ` 12 · `μ` 12 · `ᵉ` 11 · `±` 9 · `ë` 8 · `ä` 6 · `Î` 6 · `½` 5 · `₂` 5 · `Ê` 4

**Trois pièges, à traiter avant la première page :**

1. **`⚠` (U+26A0) n'est dans aucune police de texte courante.** Les 105 occurrences se tracent en
   **vectoriel**, jamais en caractère. Un symbole dessiné une fois, placé en bibliothèque, réutilisé
   partout : c'est aussi la seule façon d'avoir le même triangle dans les 89 chapitres.
2. **`µ` (U+00B5) et `μ` (U+03BC) sont deux caractères différents** et se composent différemment.
   Ils sont mélangés dans le corpus (73 contre 12). À unifier sur `µ` U+00B5 — travail du rôle 5.
3. **`−` (moins, U+2212), `–` (demi-cadratin), `—` (cadratin)** coexistent. Le moins sert aux
   températures négatives (`−35 °C`), le demi-cadratin aux intervalles (`1,7–7,3 °C`), le cadratin
   aux incises. Le style de caractère ne doit pas les confondre.

**Test à passer une seule fois, avant de composer quoi que ce soit :** cette liste collée dans un
bloc de texte à 10 pt, dans les deux familles, dans les quatre graisses, avec les chiffres
tabulaires et elzéviriens. Un seul carré vide, et la police change.

---

## Annexe B — Espaces insécables

**Le corpus ne contient aucune espace insécable : 0 occurrence de U+00A0, 0 de U+202F.** Elles
sont toutes à poser à la composition. Comptage sur les 89 chapitres :

| Contexte | Espace | Occurrences |
| --- | --- | --- |
| Avant `:` | insécable | 6 240 |
| Après `«` et avant `»` | insécable | 6 706 |
| Entre un nombre et `°C` | **fine** insécable | 2 705 |
| Avant `;` | **fine** insécable | 2 462 |
| Entre un nombre et `%` | **fine** insécable | 572 |
| Dans les groupes de milliers | **fine** insécable | 356 |
| Avant `?` | **fine** insécable | 142 |
| Avant `!` | **fine** insécable | 10 |
| Après `§` | **fine** insécable | 913 |
| Entre `ch.` et son numéro | **fine** insécable | 3 262 |

**Environ 23 400 espaces à poser.** Ça se fait par une recherche-remplacement paramétrée, une
fois, avant la composition — pas à la main et pas chapitre par chapitre. Le résultat se contrôle
sur une page au hasard de chaque tome : une espace insécable manquante se voit quand un `74` se
retrouve seul en fin de ligne et son `°C` au début de la suivante.

---

*Normes graphiques établies le 21 septembre 2026, contre l'état du corpus à cette date :
89 chapitres, 581 tableaux, 802 images, 2 201 renvois. Toute règle qui se révèle inapplicable
sur un chapitre réel se corrige ici, pas dans le chapitre.*
